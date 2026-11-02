"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRightLeft,
  Download,
  Image as ImageIcon,
  LockKeyhole,
  RefreshCw,
} from "lucide-react";
import { Dropzone } from "@/components/ui/Dropzone";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buttonClass } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import {
  cancelImageJobs,
  compressImage,
  extensionForMime,
  isImageWorkerSupported,
  outputFileName,
  validateImageFile,
  type ImageJobResult,
} from "@/lib/image/client";
import { formatBytes, savingsPercent } from "@/lib/size";
import { downloadBlob } from "@/lib/utils";
import { IMAGE_ACCEPT } from "@/lib/config";
import { cn } from "@/lib/utils";

type TargetFormat = "image/jpeg" | "image/png" | "image/webp";

const FORMATS: Array<{ value: TargetFormat; label: string }> = [
  { value: "image/jpeg", label: "JPG" },
  { value: "image/png", label: "PNG" },
  { value: "image/webp", label: "WebP" },
];

function sourceLabel(file: File): string {
  if (file.type === "image/jpeg") return "JPG";
  if (file.type === "image/png") return "PNG";
  if (file.type === "image/webp") return "WebP";
  const extension = file.name.split(".").pop();
  return extension ? extension.toUpperCase() : "—";
}

export function ImageConverter() {
  const t = useTranslations("imageConverter");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");
  const locale = useLocale();
  const { toast } = useToast();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [target, setTarget] = useState<TargetFormat>("image/jpeg");
  const [quality, setQuality] = useState(88);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<ImageJobResult | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
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

  const handleFile = useCallback(
    (files: File[]) => {
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
      setFile(next);
      setPreviewUrl(URL.createObjectURL(next));
      setTarget(next.type === "image/png" ? "image/webp" : "image/jpeg");
      setResult(null);
      setResultUrl(null);
      setError(null);
    },
    [tErrors, toast]
  );

  const convert = useCallback(async () => {
    if (!file || processing) return;
    setError(null);
    setResult(null);
    setResultUrl(null);

    if (!isImageWorkerSupported()) {
      setError(tErrors("unsupportedBrowser"));
      return;
    }

    cancelRequested.current = false;
    setProcessing(true);
    try {
      const output = await compressImage(file, {
        format: target,
        quality: target === "image/png" ? undefined : quality / 100,
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
  }, [file, processing, quality, t, tErrors, target, toast]);

  const cancel = () => {
    cancelRequested.current = true;
    cancelImageJobs();
    setProcessing(false);
  };

  const reset = () => {
    if (processing) cancel();
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setResultUrl(null);
    setError(null);
  };

  const download = () => {
    if (!file || !result) return;
    downloadBlob(result.blob, outputFileName(file.name, result.blob.type, "converted"));
  };

  const sameFormat = file?.type === target;
  const note =
    target === "image/png"
      ? t("notePng")
      : target === "image/webp"
        ? t("noteWebp")
        : t("noteJpeg");

  return (
    <div className="space-y-6">
      {!file ? (
        <Dropzone
          accept={IMAGE_ACCEPT}
          onFiles={handleFile}
          title={t("uploadTitle")}
          hint={t("uploadHint")}
          buttonLabel={tCommon("seeAll")}
          icon={ArrowRightLeft}
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
                  {sourceLabel(file)} · {formatBytes(file.size, locale)}
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resultUrl || previewUrl || ""}
                alt={result ? t("resultTitle") : file.name}
                className="max-h-[420px] w-auto max-w-full object-contain"
              />
            </div>

            {result ? (
              <div className="rounded-2xl border border-success/25 bg-success/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-ink">{t("resultTitle")}</p>
                    <p className="mt-1 text-xs text-muted">
                      {sourceLabel(file)} → {extensionForMime(result.blob.type).toUpperCase()}
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
            <fieldset disabled={processing} className="space-y-4">
              <legend className="field-label">{t("targetFormat")}</legend>
              <div className="grid grid-cols-3 gap-2">
                {FORMATS.map((entry) => (
                  <label
                    key={entry.value}
                    className={cn(
                      "flex min-h-[56px] cursor-pointer flex-col items-center justify-center gap-0.5 rounded-2xl border text-sm font-bold transition",
                      target === entry.value
                        ? "border-brand bg-brand-soft/60 text-ink"
                        : "border-line bg-surface text-muted hover:border-brand/40"
                    )}
                  >
                    <input
                      type="radio"
                      name="target-format"
                      value={entry.value}
                      checked={target === entry.value}
                      onChange={() => setTarget(entry.value)}
                      className="sr-only"
                    />
                    {entry.label}
                    <span className="text-[10px] font-medium text-muted">
                      {entry.value === "image/jpeg" ? "lossy" : entry.value === "image/webp" ? "modern" : "lossless"}
                    </span>
                  </label>
                ))}
              </div>

              {sameFormat ? (
                <p className="rounded-xl border border-accent/30 bg-accent/10 p-3 text-xs text-ink" role="status">
                  {t("sameFormat")}
                </p>
              ) : null}

              {target !== "image/png" ? (
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="convert-quality" className="field-label mb-0">
                      {t("qualityLabel")}
                    </label>
                    <span className="text-sm font-bold text-brand">{quality}%</span>
                  </div>
                  <input
                    id="convert-quality"
                    type="range"
                    min={5}
                    max={100}
                    value={quality}
                    onChange={(event) => setQuality(Number(event.target.value))}
                    className="range mt-3"
                    style={{ "--range-progress": `${quality}%` } as CSSProperties}
                  />
                  <p className="mt-1 text-xs text-muted">{t("qualityNote")}</p>
                </div>
              ) : null}
            </fieldset>

            <p className="rounded-2xl bg-surface-2/70 p-3 text-xs leading-relaxed text-muted">
              {note}
            </p>

            {error ? (
              <p className="rounded-xl bg-danger/10 p-3 text-sm text-danger" role="alert">
                {error}
              </p>
            ) : null}

            {processing ? (
              <div className="space-y-2">
                <ProgressBar value={0} indeterminate label={t("converting")} />
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
                onClick={() => void convert()}
                className={buttonClass("primary", "md", "w-full")}
              >
                <ArrowRightLeft className="h-4 w-4" aria-hidden="true" />
                {t("convert")}
              </button>
            )}

            <p className="flex items-start gap-2 text-xs leading-relaxed text-muted">
              <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
              {tCommon("privacyBadge")}
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
