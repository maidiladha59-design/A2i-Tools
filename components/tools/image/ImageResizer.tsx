"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Download,
  Image as ImageIcon,
  LockKeyhole,
  Maximize2,
  RefreshCw,
  Scaling,
} from "lucide-react";
import { Dropzone } from "@/components/ui/Dropzone";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buttonClass } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import {
  cancelImageJobs,
  compressImage,
  isImageWorkerSupported,
  outputFileName,
  readImageDimensions,
  validateImageFile,
  type ImageJobResult,
  type ImageOutputFormat,
} from "@/lib/image/client";
import { formatBytes, savingsPercent } from "@/lib/size";
import { downloadBlob } from "@/lib/utils";
import { IMAGE_ACCEPT } from "@/lib/config";
import { cn } from "@/lib/utils";

type PresetId = "original" | "fullHd" | "square" | "portrait" | "story" | "half";

const PRESETS: Array<{ id: PresetId; key: string }> = [
  { id: "original", key: "presetOriginal" },
  { id: "fullHd", key: "presetFullHd" },
  { id: "square", key: "presetSquare" },
  { id: "portrait", key: "presetPortrait" },
  { id: "story", key: "presetStory" },
  { id: "half", key: "presetHalf" },
];

export function ImageResizer() {
  const t = useTranslations("imageResizer");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");
  const locale = useLocale();
  const { toast } = useToast();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [natural, setNatural] = useState<{ width: number; height: number } | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [keepRatio, setKeepRatio] = useState(true);
  const [format, setFormat] = useState<ImageOutputFormat>("auto");
  const [quality, setQuality] = useState(85);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<ImageJobResult | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [preset, setPreset] = useState<PresetId | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cancelRequested = useRef(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

  useEffect(() => {
    return () => cancelImageJobs();
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setResultUrl(null);
    setError(null);
  }, []);

  const handleFile = useCallback(
    async (files: File[]) => {
      const next = files[0];
      if (!next) return;
      const problem = validateImageFile(next);
      if (problem) {
        toast({
          title: tErrors(
            problem === "empty"
              ? "emptyFile"
              : problem === "too-large"
                ? "imageTooLarge"
                : "unsupportedImage"
          ),
          variant: "error",
        });
        return;
      }

      const dimensions = await readImageDimensions(next);
      if (!dimensions) {
        toast({ title: tErrors("imageDecode"), variant: "error" });
        return;
      }

      setFile(next);
      setNatural(dimensions);
      setWidth(String(dimensions.width));
      setHeight(String(dimensions.height));
      setPreset("original");
      setPreviewUrl(URL.createObjectURL(next));
      setResult(null);
      setResultUrl(null);
      setError(null);
    },
    [tErrors, toast]
  );

  const applyPreset = (id: PresetId) => {
    if (!natural) return;
    setPreset(id);
    const ratio = natural.width / natural.height;
    let nextWidth = natural.width;
    let nextHeight = natural.height;
    switch (id) {
      case "fullHd":
        nextWidth = 1920;
        nextHeight = 1080;
        break;
      case "square":
        nextWidth = 1080;
        nextHeight = 1080;
        break;
      case "portrait":
        nextWidth = 1080;
        nextHeight = 1350;
        break;
      case "story":
        nextWidth = 1080;
        nextHeight = 1920;
        break;
      case "half":
        nextWidth = Math.max(16, Math.round(natural.width / 2));
        nextHeight = Math.max(16, Math.round(natural.height / 2));
        break;
      default:
        nextWidth = natural.width;
        nextHeight = natural.height;
    }
    const keepsAspect = id === "original" || id === "half";
    if (keepsAspect) {
      nextHeight = Math.max(16, Math.round(nextWidth / ratio));
    }
    setKeepRatio(keepsAspect);
    setWidth(String(nextWidth));
    setHeight(String(nextHeight));
  };

  const updateWidth = (value: string) => {
    setWidth(value);
    setPreset(null);
    if (keepRatio && natural && value && Number(value) >= 16) {
      setHeight(
        String(Math.max(16, Math.round(Number(value) / (natural.width / natural.height))))
      );
    }
  };

  const updateHeight = (value: string) => {
    setHeight(value);
    setPreset(null);
    if (keepRatio && natural && value && Number(value) >= 16) {
      setWidth(
        String(Math.max(16, Math.round(Number(value) * (natural.width / natural.height))))
      );
    }
  };

  const resize = useCallback(async () => {
    if (!file || processing) return;
    clearResult();

    const numericWidth = Number(width);
    const numericHeight = Number(height);
    if (
      !Number.isFinite(numericWidth) ||
      !Number.isFinite(numericHeight) ||
      numericWidth < 16 ||
      numericHeight < 16 ||
      numericWidth > 8000 ||
      numericHeight > 8000
    ) {
      setError(t("invalidDims"));
      return;
    }

    if (!isImageWorkerSupported()) {
      setError(tErrors("unsupportedBrowser"));
      return;
    }

    cancelRequested.current = false;
    setProcessing(true);
    try {
      const output = await compressImage(file, {
        format,
        quality: format === "image/png" ? undefined : quality / 100,
        width: Math.round(numericWidth),
        height: Math.round(numericHeight),
      });
      if (cancelRequested.current) {
        toast({ title: tErrors("cancelled"), variant: "info" });
        return;
      }
      setResult(output);
      setResultUrl(URL.createObjectURL(output.blob));
      toast({ title: t("resultTitle"), variant: "success" });
    } catch {
      if (!cancelRequested.current) setError(tErrors("processFailed"));
    } finally {
      setProcessing(false);
    }
  }, [clearResult, file, format, processing, quality, t, tErrors, toast, width, height]);

  const cancel = () => {
    cancelRequested.current = true;
    cancelImageJobs();
    setProcessing(false);
  };

  const reset = () => {
    if (processing) cancel();
    setFile(null);
    setNatural(null);
    setWidth("");
    setHeight("");
    setPreset(null);
    setError(null);
    setResult(null);
    setResultUrl(null);
    setPreviewUrl(null);
  };

  const download = () => {
    if (!file || !result) return;
    downloadBlob(result.blob, outputFileName(file.name, result.blob.type, "resized"));
  };

  const ratio = natural ? natural.width / natural.height : 1;

  return (
    <div className="space-y-6">
      {!file ? (
        <Dropzone
          accept={IMAGE_ACCEPT}
          onFiles={(files) => void handleFile(files)}
          title={t("uploadTitle")}
          hint={t("uploadHint")}
          buttonLabel={tCommon("seeAll")}
          icon={Scaling}
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="card-surface space-y-4 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-ink" title={file.name}>
                  {file.name}
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  {formatBytes(file.size, locale)}
                  {natural ? ` · ${t("originalDims", {
                    width: natural.width,
                    height: natural.height,
                  })}` : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                className={buttonClass("secondary", "sm", "shrink-0")}
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                {t("replace")}
              </button>
            </div>

            <div className="relative flex max-h-[420px] min-h-[240px] items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface-2">
              {resultUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={resultUrl}
                  alt={t("resultTitle")}
                  className="max-h-[420px] w-auto max-w-full object-contain"
                />
              ) : previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt={file.name}
                  className="max-h-[420px] w-auto max-w-full object-contain"
                />
              ) : null}
            </div>

            {result ? (
              <div className="rounded-2xl border border-success/25 bg-success/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-bold text-ink">
                      <Maximize2 className="h-4 w-4 text-success" aria-hidden="true" />
                      {t("resultTitle")}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {t("newDims", { width: result.width, height: result.height })}
                      {" · "}
                      {formatBytes(result.originalSize, locale)} →{" "}
                      <span
                        className={
                          result.blob.size <= result.originalSize
                            ? "font-semibold text-success"
                            : "font-semibold text-danger"
                        }
                      >
                        {formatBytes(result.blob.size, locale)}
                      </span>
                      {result.blob.size <= result.originalSize
                        ? ` (${savingsPercent(result.originalSize, result.blob.size)}%)`
                        : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={download}
                    className={buttonClass("primary", "md")}
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    {t("download")}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <aside className="card-surface space-y-4 p-5">
            <div>
              <p className="field-label">{t("presets")}</p>
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => applyPreset(entry.id)}
                    disabled={!natural || processing}
                    aria-pressed={preset === entry.id}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50",
                      preset === entry.id
                        ? "border-brand bg-brand text-white dark:text-[#0d1015]"
                        : "border-line bg-surface text-muted hover:border-brand/40 hover:text-ink"
                    )}
                  >
                    {t(entry.key)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="resize-w" className="field-label">
                  {t("widthLabel")}
                </label>
                <input
                  id="resize-w"
                  type="number"
                  inputMode="numeric"
                  min={16}
                  max={8000}
                  value={width}
                  onChange={(event) => updateWidth(event.target.value)}
                  disabled={processing}
                  className="field-input"
                />
              </div>
              <div>
                <label htmlFor="resize-h" className="field-label">
                  {t("heightLabel")}
                </label>
                <input
                  id="resize-h"
                  type="number"
                  inputMode="numeric"
                  min={16}
                  max={8000}
                  value={height}
                  onChange={(event) => updateHeight(event.target.value)}
                  disabled={processing}
                  className="field-input"
                />
              </div>
            </div>
            <p className="text-xs text-muted">
              {keepRatio ? `≈ ${ratio.toFixed(2)} : 1` : t("note")}
            </p>

            <label className="flex min-h-[28px] cursor-pointer items-center gap-2 text-sm font-medium text-ink">
              <input
                type="checkbox"
                className="checkbox h-4 w-4"
                checked={keepRatio}
                onChange={(event) => setKeepRatio(event.target.checked)}
                disabled={processing}
              />
              {t("keepRatio")}
            </label>

            <div>
              <label htmlFor="resize-format" className="field-label">
                {t("formatLabel")}
              </label>
              <select
                id="resize-format"
                value={format}
                onChange={(event) => setFormat(event.target.value as ImageOutputFormat)}
                disabled={processing}
                className="field-select"
              >
                <option value="auto">JPG / PNG / WebP (asli)</option>
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>

            {format !== "image/png" ? (
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="resize-quality" className="field-label mb-0">
                    {t("qualityLabel")}
                  </label>
                  <span className="text-sm font-bold text-brand">{quality}%</span>
                </div>
                <input
                  id="resize-quality"
                  type="range"
                  min={5}
                  max={100}
                  value={quality}
                  onChange={(event) => setQuality(Number(event.target.value))}
                  disabled={processing}
                  className="range mt-3"
                  style={{ "--range-progress": `${quality}%` } as CSSProperties}
                />
                <p className="mt-1 text-xs text-muted">{t("qualityNote")}</p>
              </div>
            ) : null}

            {error ? (
              <p className="rounded-xl bg-danger/10 p-3 text-sm text-danger" role="alert">
                {error}
              </p>
            ) : null}

            {processing ? (
              <div className="space-y-2">
                <ProgressBar value={0} indeterminate label={t("resizing")} />
                <button
                  type="button"
                  onClick={cancel}
                  className={buttonClass("danger", "md", "w-full")}
                >
                  {t("cancel")}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => void resize()}
                className={buttonClass("primary", "md", "w-full")}
              >
                <Scaling className="h-4 w-4" aria-hidden="true" />
                {t("resize")}
              </button>
            )}

            <p className="flex items-start gap-2 text-xs leading-relaxed text-muted">
              <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
              {t("note")}
            </p>
          </aside>
        </div>
      )}

      {!file ? (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-line bg-surface-2/40 px-6 py-10 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface text-muted">
            <ImageIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="text-sm font-semibold text-ink">{tCommon("privacyBadge")}</p>
          <p className="text-xs text-muted">{tCommon("privacyShort")}</p>
        </div>
      ) : null}
    </div>
  );
}
