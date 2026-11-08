"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type PercentCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Crop as CropIcon,
  Download,
  Image as ImageIcon,
  LockKeyhole,
  RefreshCw,
  RotateCcw,
} from "lucide-react";
import { Dropzone } from "@/components/ui/Dropzone";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buttonClass } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { UploadStatus } from "@/components/ui/UploadStatus";
import { useUploadFeedback } from "@/components/tools/useUploadFeedback";
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

type AspectId = "free" | "square" | "portrait" | "formal" | "landscape" | "wide";

const ASPECTS: Array<{ id: AspectId; key: string; value?: number }> = [
  { id: "free", key: "aspectFree" },
  { id: "square", key: "aspectSquare", value: 1 },
  { id: "portrait", key: "aspectPortrait", value: 3 / 4 },
  { id: "formal", key: "aspectFormal", value: 4 / 6 },
  { id: "landscape", key: "aspectLandscape", value: 4 / 3 },
  { id: "wide", key: "aspectWide", value: 16 / 9 },
];

export function ImageCropper() {
  const t = useTranslations("imageCropper");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");
  const locale = useLocale();
  const { toast } = useToast();
  const upload = useUploadFeedback();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [natural, setNatural] = useState<{ width: number; height: number } | null>(null);
  const [aspectId, setAspectId] = useState<AspectId>("free");
  const [crop, setCrop] = useState<PercentCrop | undefined>();
  const [completed, setCompleted] = useState<PercentCrop | undefined>();
  const [format, setFormat] = useState<ImageOutputFormat>("auto");
  const [quality, setQuality] = useState(90);
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

  const aspectValue = ASPECTS.find((entry) => entry.id === aspectId)?.value;

  const initialCrop = useCallback(
    (width: number, height: number, aspect?: number): PercentCrop => {
      if (aspect) {
        return centerCrop(
          makeAspectCrop({ unit: "%", width: 80 }, aspect, width, height),
          width,
          height
        );
      }
      return { unit: "%", x: 10, y: 10, width: 80, height: 80 };
    },
    []
  );

  const handleFile = useCallback(
    async (files: File[]) => {
      const next = files[0];
      if (!next) return;
      const problem = validateImageFile(next);
      if (problem) {
        upload.reportRejected([
          {
            name: next.name,
            reason: tErrors(
              problem === "empty"
                ? "emptyFile"
                : problem === "too-large"
                  ? "imageTooLarge"
                  : "unsupportedImage"
            ),
          },
        ]);
        return;
      }

      const dimensions = await readImageDimensions(next);
      if (!dimensions) {
        upload.reportRejected([{ name: next.name, reason: tErrors("imageDecode") }]);
        return;
      }

      setFile(next);
      setNatural(dimensions);
      setPreviewUrl(URL.createObjectURL(next));
      setAspectId("free");
      setCrop(initialCrop(dimensions.width, dimensions.height));
      setCompleted(undefined);
      setResult(null);
      setResultUrl(null);
      setError(null);
      upload.reportAdded(1);
      upload.revealUploadTarget();
    },
    [initialCrop, tErrors, upload]
  );

  const changeAspect = (id: AspectId) => {
    setAspectId(id);
    if (!natural) return;
    const value = ASPECTS.find((entry) => entry.id === id)?.value;
    const next = initialCrop(natural.width, natural.height, value);
    setCrop(next);
    setCompleted(next);
  };

  const activePercentCrop = completed || crop;

  const pixelCrop = (() => {
    if (!activePercentCrop || !natural) return null;
    return {
      x: Math.round((activePercentCrop.x / 100) * natural.width),
      y: Math.round((activePercentCrop.y / 100) * natural.height),
      width: Math.max(1, Math.round((activePercentCrop.width / 100) * natural.width)),
      height: Math.max(1, Math.round((activePercentCrop.height / 100) * natural.height)),
    };
  })();

  const cropImage = useCallback(async () => {
    if (!file || processing || !pixelCrop) return;
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
        format,
        quality: format === "image/png" ? undefined : quality / 100,
        crop: pixelCrop,
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
  }, [file, format, pixelCrop, processing, quality, t, tErrors, toast]);

  const cancel = () => {
    cancelRequested.current = true;
    cancelImageJobs();
    setProcessing(false);
  };

  const reset = () => {
    if (processing) cancel();
    setFile(null);
    setPreviewUrl(null);
    setNatural(null);
    setCrop(undefined);
    setCompleted(undefined);
    setResult(null);
    setResultUrl(null);
    setError(null);
  };

  const resetSelection = () => {
    if (!natural) return;
    const next = initialCrop(natural.width, natural.height, aspectValue);
    setCrop(next);
    setCompleted(next);
  };

  const download = () => {
    if (!file || !result) return;
    downloadBlob(result.blob, outputFileName(file.name, result.blob.type, "crop"));
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <Dropzone
          accept={IMAGE_ACCEPT}
          onFiles={(files) => void handleFile(files)}
          title={t("uploadTitle")}
          hint={t("uploadHint")}
          buttonLabel={tCommon("seeAll")}
          icon={CropIcon}
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="card-surface space-y-4 p-4 sm:p-5" data-upload-action>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-ink" title={file.name}>
                  {file.name}
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  {natural ? `${natural.width} × ${natural.height} px · ` : ""}
                  {formatBytes(file.size, locale)}
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

            <UploadStatus summary={upload.readySummary("readyCrop", 1, file.size)} />

            <div className="flex justify-center overflow-hidden rounded-2xl border border-line bg-surface-2 p-3">
              {previewUrl ? (
                <ReactCrop
                  crop={crop}
                  aspect={aspectValue}
                  onChange={(_pixel, percent) => setCrop(percent)}
                  onComplete={(_pixel, percent) => setCompleted(percent)}
                  keepSelection
                  minWidth={16}
                  minHeight={16}
                  className="max-h-[460px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt={file.name}
                    className="max-h-[440px] w-auto"
                  />
                </ReactCrop>
              ) : null}
            </div>
            <p className="text-xs text-muted">{t("instruction")}</p>
            {pixelCrop ? (
              <p className="text-xs font-semibold text-ink">
                {t("selection", {
                  width: pixelCrop.width,
                  height: pixelCrop.height,
                })}
              </p>
            ) : null}

            {result ? (
              <div className="rounded-2xl border border-success/25 bg-success/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-ink">{t("resultTitle")}</p>
                    <p className="mt-1 text-xs text-muted">
                      {result.width} × {result.height} px ·{" "}
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
              <p className="field-label">{t("aspectLabel")}</p>
              <div className="flex flex-wrap gap-1.5">
                {ASPECTS.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => changeAspect(entry.id)}
                    disabled={processing}
                    aria-pressed={aspectId === entry.id}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50",
                      aspectId === entry.id
                        ? "border-brand bg-brand text-white dark:text-[#0d1015]"
                        : "border-line bg-surface text-muted hover:border-brand/40 hover:text-ink"
                    )}
                  >
                    {t(entry.key)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="crop-format" className="field-label">
                {t("formatLabel")}
              </label>
              <select
                id="crop-format"
                value={format}
                onChange={(event) => setFormat(event.target.value as ImageOutputFormat)}
                disabled={processing}
                className="field-select"
              >
                <option value="auto">{t("formatOriginal")}</option>
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>

            {format !== "image/png" ? (
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="crop-quality" className="field-label mb-0">
                    {t("qualityLabel")}
                  </label>
                  <span className="text-sm font-bold text-brand">{quality}%</span>
                </div>
                <input
                  id="crop-quality"
                  type="range"
                  min={5}
                  max={100}
                  value={quality}
                  onChange={(event) => setQuality(Number(event.target.value))}
                  disabled={processing}
                  className="range mt-3"
                  style={{ "--range-progress": `${quality}%` } as CSSProperties}
                />
              </div>
            ) : null}

            <button
              type="button"
              onClick={resetSelection}
              disabled={processing}
              className={buttonClass("secondary", "sm", "w-full")}
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              {t("resetSelection")}
            </button>

            {error ? (
              <p className="rounded-xl bg-danger/10 p-3 text-sm text-danger" role="alert">
                {error}
              </p>
            ) : null}

            {processing ? (
              <div className="space-y-2">
                <ProgressBar value={0} indeterminate label={t("cropping")} />
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
                onClick={() => void cropImage()}
                disabled={!pixelCrop}
                className={buttonClass("primary", "md", "w-full")}
              >
                <CropIcon className="h-4 w-4" aria-hidden="true" />
                {t("crop")}
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
