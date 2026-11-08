"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Download,
  ImagePlus,
  LockKeyhole,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { Dropzone } from "@/components/ui/Dropzone";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusPill, type StatusKind } from "@/components/ui/StatusPill";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { buttonClass } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useHandoff } from "@/lib/tools/handoff";
import {
  useUploadFeedback,
  type RejectedUpload,
} from "@/components/tools/useUploadFeedback";
import {
  cancelImageJobs,
  compressImage,
  ImageWorkerError,
  isImageWorkerSupported,
  outputFileName,
  readImageDimensions,
  validateImageFile,
  type ImageJobOptions,
  type ImageOutputFormat,
  type ImageProgress,
  type ImageJobResult,
} from "@/lib/image/client";
import {
  formatBytes,
  parseSizeToBytes,
  savingsPercent,
  SIZE_PRESETS,
  type SizeUnit,
} from "@/lib/size";
import { createId, downloadBlob, uniqueName } from "@/lib/utils";
import { IMAGE_ACCEPT, MAX_IMAGE_FILES } from "@/lib/config";
import { cn } from "@/lib/utils";

type CompressionMode = "auto" | "manual" | "target";
type ItemStatus = "queued" | "processing" | "done" | "error" | "cancelled";

type CompressorItem = {
  id: string;
  file: File;
  previewUrl: string;
  status: ItemStatus;
  progress?: ImageProgress;
  result?: ImageJobResult;
  resultUrl?: string;
  errorCode?: string;
};

type InitialConfig = {
  mode?: CompressionMode;
  targetValue?: number;
  targetUnit?: SizeUnit;
  format?: ImageOutputFormat;
};

const STATUS_MAP: Record<ItemStatus, StatusKind> = {
  queued: "queued",
  processing: "processing",
  done: "done",
  error: "error",
  cancelled: "cancelled",
};

const TARGET_UNITS: SizeUnit[] = ["KB", "MB"];

export function ImageCompressor({
  initialConfig,
}: {
  initialConfig?: InitialConfig;
}) {
  const t = useTranslations("imageCompressor");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");
  const tToast = useTranslations("toast");
  const locale = useLocale();
  const { toast } = useToast();
  const { take } = useHandoff();
  const upload = useUploadFeedback();

  const [items, setItems] = useState<CompressorItem[]>([]);
  const itemsRef = useRef<CompressorItem[]>([]);
  const [mode, setMode] = useState<CompressionMode>(initialConfig?.mode || "auto");
  const [quality, setQuality] = useState(80);
  const [targetValue, setTargetValue] = useState(
    initialConfig?.targetValue ? String(initialConfig.targetValue) : "100"
  );
  const [targetUnit, setTargetUnit] = useState<SizeUnit>(
    initialConfig?.targetUnit || "KB"
  );
  const [format, setFormat] = useState<ImageOutputFormat>(
    initialConfig?.format || "auto"
  );
  const [resizeEnabled, setResizeEnabled] = useState(false);
  const [resizeWidth, setResizeWidth] = useState("");
  const [resizeHeight, setResizeHeight] = useState("");
  const [lockRatio, setLockRatio] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const naturalSize = useRef<{ width: number; height: number } | null>(null);
  const cancelRequested = useRef(false);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const deleteItemUrls = useCallback((item: CompressorItem) => {
    URL.revokeObjectURL(item.previewUrl);
    if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);
  }, []);

  useEffect(() => {
    return () => {
      cancelImageJobs();
      itemsRef.current.forEach(deleteItemUrls);
    };
  }, [deleteItemUrls]);

  const addFiles = useCallback(
    (files: File[]) => {
      if (isProcessing) {
        toast({ title: t("addDisabled"), variant: "info" });
        return;
      }

      const current = itemsRef.current;
      if (current.length >= MAX_IMAGE_FILES) {
        upload.reportRejected(
          files.map((file) => ({ name: file.name, reason: tErrors("maxFiles") }))
        );
        return;
      }

      const accepted: File[] = [];
      const rejected: RejectedUpload[] = [];

      for (const file of files) {
        if (current.length + accepted.length >= MAX_IMAGE_FILES) {
          rejected.push({ name: file.name, reason: tErrors("maxFiles") });
          continue;
        }
        const problem = validateImageFile(file);
        if (problem) {
          rejected.push({
            name: file.name,
            reason: tErrors(
              problem === "empty"
                ? "emptyFile"
                : problem === "too-large"
                  ? "imageTooLarge"
                  : "unsupportedImage"
            ),
          });
          continue;
        }
        accepted.push(file);
      }

      if (!accepted.length) {
        upload.reportRejected(rejected);
        return;
      }

      const newItems: CompressorItem[] = accepted.map((file) => ({
        id: createId(),
        file,
        previewUrl: URL.createObjectURL(file),
        status: "queued",
      }));

      setItems((previous) => [...previous, ...newItems]);
      setSelectedPreview(null);

      if (!naturalSize.current) {
        void readImageDimensions(accepted[0] as File).then((size) => {
          if (size) {
            naturalSize.current = size;
          }
        });
      }

      upload.reportAddedWithRejected(newItems.length, rejected);
      upload.flashNewItems(newItems.length);
      upload.revealUploadTarget();
    },
    [isProcessing, t, tErrors, toast, upload]
  );

  useEffect(() => {
    const pending = take("/image/compress");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- consumes a cross-route handoff once
    if (pending?.length) addFiles(pending);
    // The handoff is consumed once on mount; addFiles intentionally is not a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeItem = useCallback(
    (id: string) => {
      setItems((previous) => {
        const target = previous.find((item) => item.id === id);
        if (target) deleteItemUrls(target);
        return previous.filter((item) => item.id !== id);
      });
      setSelectedPreview((current) => (current === id ? null : current));
    },
    [deleteItemUrls]
  );

  const clearAll = useCallback(() => {
    if (isProcessing) return;
    if (!window.confirm(t("clearConfirm"))) return;
    itemsRef.current.forEach(deleteItemUrls);
    setItems([]);
    setSelectedPreview(null);
  }, [deleteItemUrls, isProcessing, t]);

  const cancelRun = useCallback(() => {
    cancelRequested.current = true;
    cancelImageJobs();
  }, []);

  const updateItem = useCallback((id: string, patch: Partial<CompressorItem>) => {
    setItems((previous) =>
      previous.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  }, []);

  const startCompression = useCallback(async () => {
    if (isProcessing || !itemsRef.current.length) return;

    if (!isImageWorkerSupported()) {
      toast({ title: t("unsupportedBrowser"), variant: "error" });
      return;
    }

    let targetBytes: number | null = null;
    if (mode === "target") {
      const parsed = parseSizeToBytes(targetValue, targetUnit);
      if (!parsed || parsed > 50 * 1024 * 1024) {
        toast({ title: t("targetInvalid"), variant: "error" });
        return;
      }
      targetBytes = parsed;
    }

    const maxWidth = resizeWidth.trim() ? Number(resizeWidth) : null;
    const maxHeight = resizeHeight.trim() ? Number(resizeHeight) : null;
    if (resizeEnabled) {
      if (
        (!maxWidth && !maxHeight) ||
        (maxWidth !== null && (!Number.isFinite(maxWidth) || maxWidth < 16)) ||
        (maxHeight !== null && (!Number.isFinite(maxHeight) || maxHeight < 16))
      ) {
        toast({ title: t("resizeInvalid"), variant: "error" });
        return;
      }
    }

    const options: ImageJobOptions = {
      format,
      quality: mode === "manual" ? quality / 100 : undefined,
      targetBytes,
      maxWidth: resizeEnabled ? maxWidth : null,
      maxHeight: resizeEnabled ? maxHeight : null,
    };

    cancelRequested.current = false;
    setIsProcessing(true);
    setSelectedPreview(null);
    const queue = itemsRef.current.slice();

    for (const item of queue) {
      updateItem(item.id, {
        status: "processing",
        progress: { stage: "decode" },
        result: undefined,
        errorCode: undefined,
      });
    }

    let successCount = 0;
    let cancelled = false;

    for (const item of queue) {
      if (cancelRequested.current) {
        cancelled = true;
        updateItem(item.id, { status: "cancelled", progress: undefined });
        continue;
      }

      updateItem(item.id, {
        status: "processing",
        progress: { stage: "decode" },
      });

      try {
        const result = await compressImage(item.file, options, (progress) => {
          updateItem(item.id, { progress });
        });
        const resultUrl = URL.createObjectURL(result.blob);
        const existing = itemsRef.current.find((entry) => entry.id === item.id);
        if (existing?.resultUrl) URL.revokeObjectURL(existing.resultUrl);
        updateItem(item.id, {
          status: "done",
          result,
          resultUrl,
          progress: undefined,
        });
        successCount += 1;
      } catch (error) {
        if (error instanceof ImageWorkerError && error.code === "CANCELLED") {
          cancelled = true;
          updateItem(item.id, { status: "cancelled", progress: undefined });
        } else {
          updateItem(item.id, {
            status: "error",
            progress: undefined,
            errorCode:
              error instanceof ImageWorkerError ? error.code : "PROCESS_FAILED",
          });
        }
      }
    }

    setIsProcessing(false);
    if (cancelled) {
      toast({ title: tToast("cancelled"), variant: "info" });
    } else if (successCount > 0) {
      toast({ title: tToast("compressed"), variant: "success" });
    }
  }, [
    format,
    isProcessing,
    mode,
    quality,
    resizeEnabled,
    resizeHeight,
    resizeWidth,
    t,
    tToast,
    targetUnit,
    targetValue,
    toast,
    updateItem,
  ]);

  const downloadItem = useCallback(
    (item: CompressorItem) => {
      if (!item.result) return;
      downloadBlob(
        item.result.blob,
        outputFileName(item.file.name, item.result.blob.type)
      );
    },
    []
  );

  const downloadAll = useCallback(async () => {
    const done = itemsRef.current.filter((item) => item.result);
    if (!done.length) return;
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    const used = new Set<string>();

    done.forEach((item) => {
      if (!item.result) return;
      const name = uniqueName(
        outputFileName(item.file.name, item.result.blob.type),
        used
      );
      zip.file(name, item.result.blob);
    });

    const blob = await zip.generateAsync({ type: "blob", compression: "STORE" });
    downloadBlob(blob, "ai2-all-compress-images.zip");
    toast({ title: tToast("zipReady", { count: done.length }), variant: "success" });
  }, [tToast, toast]);

  const doneItems = useMemo(
    () => items.filter((item) => item.status === "done" && item.result),
    [items]
  );
  const processedCount = useMemo(
    () =>
      items.filter((item) =>
        ["done", "error", "cancelled"].includes(item.status)
      ).length,
    [items]
  );
  const totalBefore = doneItems.reduce(
    (sum, item) => sum + (item.result?.originalSize || 0),
    0
  );
  const totalAfter = doneItems.reduce(
    (sum, item) => sum + (item.result?.blob.size || 0),
    0
  );
  const totalSaved = Math.max(0, totalBefore - totalAfter);
  const previewItem = items.find(
    (item) => item.id === selectedPreview && item.result && item.resultUrl
  );

  const errorText = (code?: string) => {
    switch (code) {
      case "IMAGE_DECODE":
        return tErrors("imageDecode");
      case "UNSUPPORTED_BROWSER":
        return tErrors("unsupportedBrowser");
      case "UNSUPPORTED_FORMAT":
        return tErrors("unsupportedFormat");
      case "CANVAS_FAILED":
        return tErrors("canvasFailed");
      case "ENCODE_FAILED":
        return tErrors("encodeFailed");
      default:
        return tErrors("processFailed");
    }
  };

  const stageLabel = (progress?: ImageProgress) => {
    if (!progress) return t("statusProcessing");
    if (progress.stage === "decode") return t("stageDecode");
    if (progress.stage === "encode") return t("stageEncode");
    return t("stageSearch", { attempt: progress.attempt || 1 });
  };

  const statusLabel = (status: ItemStatus) => {
    switch (status) {
      case "queued":
        return t("statusQueued");
      case "processing":
        return t("statusProcessing");
      case "done":
        return t("statusDone");
      case "error":
        return t("statusError");
      default:
        return t("statusCancelled");
    }
  };

  const targetPresetsId = useMemo(() => createId(), []);
  const queueBytes = items.reduce((sum, item) => sum + item.file.size, 0);
  const hasPng = items.some((item) => item.file.type === "image/png");
  const hasHeic = items.some(
    (item) =>
      item.file.type === "image/heic" ||
      item.file.type === "image/heif" ||
      /\.hei[cf]$/i.test(item.file.name)
  );

  return (
    <div className="space-y-6">
      <Dropzone
        accept={IMAGE_ACCEPT}
        onFiles={addFiles}
        title={t("dropTitle")}
        hint={t("dropHint")}
        buttonLabel={t("addMore")}
        activeLabel={t("dropActive")}
        pasteHint={t("pasteHint")}
        multiple
        enablePaste
        disabled={isProcessing}
        icon={ImagePlus}
        fileCount={items.length}
        readySummary={
          items.length
            ? upload.readySummary("readyCompress", items.length, queueBytes)
            : undefined
        }
        readyActionLabel={t("addMore")}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <aside className="order-1 space-y-4 lg:order-2">
          <div className="card-surface p-5 lg:sticky lg:top-[88px]">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-brand" aria-hidden="true" />
              <h2 className="font-display text-lg font-extrabold text-ink">
                {t("settingsTitle")}
              </h2>
            </div>

            <fieldset disabled={isProcessing} className="mt-4 space-y-4">
              <legend className="sr-only">{t("modeLabel")}</legend>
              <div>
                <p className="field-label">{t("modeLabel")}</p>
                <div className="grid gap-2">
                  {(
                    [
                      ["auto", t("modeAuto"), t("modeAutoDesc")],
                      ["manual", t("modeManual"), t("modeManualDesc")],
                      ["target", t("modeTarget"), t("modeTargetDesc")],
                    ] as Array<[CompressionMode, string, string]>
                  ).map(([value, label, description]) => (
                    <label
                      key={value}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition",
                        mode === value
                          ? "border-brand bg-brand-soft/50"
                          : "border-line bg-surface hover:border-brand/30",
                        isProcessing && "cursor-not-allowed opacity-70"
                      )}
                    >
                      <input
                        type="radio"
                        name="compression-mode"
                        value={value}
                        checked={mode === value}
                        onChange={() => setMode(value)}
                        className="radio mt-1"
                      />
                      <span>
                        <span className="block text-sm font-bold text-ink">
                          {label}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted">
                          {description}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {mode === "auto" ? (
                <p className="rounded-2xl bg-surface-2/70 p-3 text-xs leading-relaxed text-muted">
                  {t("qualityAutoNote")}
                </p>
              ) : null}

              {mode === "manual" ? (
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="quality" className="field-label mb-0">
                      {t("qualityLabel")}
                    </label>
                    <span className="text-sm font-bold text-brand">
                      {t("qualityValue", { value: quality })}
                    </span>
                  </div>
                  <input
                    id="quality"
                    type="range"
                    min={5}
                    max={100}
                    step={1}
                    value={quality}
                    onChange={(event) => setQuality(Number(event.target.value))}
                    className="range mt-3"
                    style={{ "--range-progress": `${quality}%` } as CSSProperties}
                  />
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {t("qualityHint")}
                  </p>
                </div>
              ) : null}

              {mode === "target" ? (
                <div className="space-y-3">
                  <div>
                    <label htmlFor="target-size" className="field-label">
                      {t("targetLabel")}
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="target-size"
                        type="number"
                        inputMode="decimal"
                        min={1}
                        step="any"
                        value={targetValue}
                        onChange={(event) => setTargetValue(event.target.value)}
                        placeholder={t("targetPlaceholder")}
                        className="field-input"
                      />
                      <div className="inline-flex shrink-0 rounded-2xl border border-line bg-surface p-1">
                        {TARGET_UNITS.map((unit) => (
                          <button
                            key={unit}
                            type="button"
                            onClick={() => setTargetUnit(unit)}
                            aria-pressed={targetUnit === unit}
                            className={cn(
                              "min-h-[40px] min-w-[48px] rounded-xl px-2 text-xs font-bold transition",
                              targetUnit === unit
                                ? "bg-ink text-canvas"
                                : "text-muted hover:bg-surface-2"
                            )}
                          >
                            {unit}
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      {t("targetHint")}
                    </p>
                    <div className="mt-3">
                      <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-muted" id={targetPresetsId}>
                        {t("targetPresetLabel")}
                      </p>
                      <div className="flex flex-wrap gap-1.5" role="group" aria-labelledby={targetPresetsId}>
                        {SIZE_PRESETS.map((preset) => {
                          const active =
                            parseSizeToBytes(targetValue, targetUnit) === preset.bytes;
                          return (
                            <button
                              key={preset.label}
                              type="button"
                              onClick={() => {
                                setTargetUnit("KB");
                                setTargetValue(String(preset.bytes / 1024));
                                setMode("target");
                              }}
                              className={cn(
                                "rounded-full border px-2.5 py-1.5 text-xs font-semibold transition",
                                active
                                  ? "border-brand bg-brand text-white dark:text-[#0d1015]"
                                  : "border-line bg-surface text-muted hover:border-brand/40 hover:text-ink"
                              )}
                            >
                              {preset.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <div>
                <label htmlFor="output-format" className="field-label">
                  {t("formatLabel")}
                </label>
                <select
                  id="output-format"
                  value={format}
                  onChange={(event) =>
                    setFormat(event.target.value as ImageOutputFormat)
                  }
                  className="field-select"
                >
                  <option value="auto">{t("formatAuto")}</option>
                  <option value="image/jpeg">{t("formatJpeg")}</option>
                  <option value="image/png">{t("formatPng")}</option>
                  <option value="image/webp">{t("formatWebp")}</option>
                </select>
              </div>

              <div className="rounded-2xl border border-line p-3">
                <label className="flex min-h-[28px] cursor-pointer items-center gap-2 text-sm font-semibold text-ink">
                  <input
                    type="checkbox"
                    className="checkbox h-4 w-4"
                    checked={resizeEnabled}
                    onChange={(event) => {
                      const enabled = event.target.checked;
                      setResizeEnabled(enabled);
                      if (enabled && !resizeWidth && !resizeHeight && naturalSize.current) {
                        setResizeWidth(String(naturalSize.current.width));
                        setResizeHeight(String(naturalSize.current.height));
                      }
                    }}
                  />
                  {t("resizeLabel")}
                  <span className="text-xs font-normal text-muted">
                    ({tCommon("optional")})
                  </span>
                </label>
                {resizeEnabled ? (
                  <div className="mt-3 space-y-3">
                    <p className="text-xs leading-relaxed text-muted">
                      {t("resizeHint")}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="resize-width" className="mb-1 block text-xs font-semibold text-muted">
                          {t("resizeWidth")}
                        </label>
                        <input
                          id="resize-width"
                          type="number"
                          min={16}
                          inputMode="numeric"
                          value={resizeWidth}
                          onChange={(event) => {
                            const value = event.target.value;
                            setResizeWidth(value);
                            if (
                              lockRatio &&
                              naturalSize.current &&
                              value &&
                              Number(value) >= 16
                            ) {
                              setResizeHeight(
                                String(
                                  Math.round(
                                    Number(value) /
                                      (naturalSize.current.width /
                                        naturalSize.current.height)
                                  )
                                )
                              );
                            }
                          }}
                          className="field-input"
                        />
                      </div>
                      <div>
                        <label htmlFor="resize-height" className="mb-1 block text-xs font-semibold text-muted">
                          {t("resizeHeight")}
                        </label>
                        <input
                          id="resize-height"
                          type="number"
                          min={16}
                          inputMode="numeric"
                          value={resizeHeight}
                          onChange={(event) => {
                            const value = event.target.value;
                            setResizeHeight(value);
                            if (
                              lockRatio &&
                              naturalSize.current &&
                              value &&
                              Number(value) >= 16
                            ) {
                              setResizeWidth(
                                String(
                                  Math.round(
                                    Number(value) *
                                      (naturalSize.current.width /
                                        naturalSize.current.height)
                                  )
                                )
                              );
                            }
                          }}
                          className="field-input"
                        />
                      </div>
                    </div>
                    <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-muted">
                      <input
                        type="checkbox"
                        className="checkbox h-4 w-4"
                        checked={lockRatio}
                        onChange={(event) => setLockRatio(event.target.checked)}
                      />
                      {t("lockRatio")}
                    </label>
                  </div>
                ) : null}
              </div>

              <div className="rounded-2xl bg-surface-2/70 p-3">
                <label className="flex cursor-not-allowed items-center gap-2 text-sm font-semibold text-ink">
                  <input
                    type="checkbox"
                    className="checkbox h-4 w-4"
                    checked
                    disabled
                    readOnly
                  />
                  {t("stripExif")}
                  <LockKeyhole className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                </label>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {t("stripExifHint")}
                </p>
              </div>
            </fieldset>

            <div className="mt-5 space-y-2">
              {isProcessing ? (
                <button
                  type="button"
                  onClick={cancelRun}
                  className={buttonClass("danger", "md", "w-full")}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                  {t("cancel")}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void startCompression()}
                  disabled={!items.length}
                  className={buttonClass("primary", "md", "w-full")}
                >
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  {items.length
                    ? t("startBulk", { count: items.length })
                    : t("start")}
                </button>
              )}
              {isProcessing ? (
                <ProgressBar
                  value={(processedCount / Math.max(1, items.length)) * 100}
                  label={t("queueCount", {
                    done: processedCount,
                    total: items.length,
                  })}
                />
              ) : null}
              <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted">
                <LockKeyhole className="h-3 w-3 text-success" aria-hidden="true" />
                {tCommon("privacyShort")}
              </p>
            </div>

            {doneItems.length ? (
              <div className="mt-5 rounded-2xl border border-line bg-surface-2/50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                  {t("summaryTitle")}
                </p>
                <dl className="mt-2 space-y-1.5 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted">{t("summaryBefore")}</dt>
                    <dd className="font-mono font-semibold text-ink">
                      {formatBytes(totalBefore, locale)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted">{t("summaryAfter")}</dt>
                    <dd className="font-mono font-semibold text-ink">
                      {formatBytes(totalAfter, locale)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3 border-t border-line pt-1.5">
                    <dt className="text-muted">{t("summarySaved")}</dt>
                    <dd className="font-mono font-semibold text-success">
                      {formatBytes(totalSaved, locale)}
                    </dd>
                  </div>
                </dl>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => void downloadAll()}
                    className={buttonClass("accent", "sm", "w-full")}
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    ZIP
                  </button>
                  <button
                    type="button"
                    onClick={clearAll}
                    disabled={isProcessing}
                    className={buttonClass("secondary", "sm", "w-full")}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    {t("clear")}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </aside>

        <div className="order-2 min-w-0 space-y-4 lg:order-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-lg font-extrabold text-ink">
              {t("queueTitle")}
            </h2>
            {items.length ? (
              <p className="text-xs font-medium text-muted">
                {t("queueCount", {
                  done: processedCount,
                  total: items.length,
                })}
              </p>
            ) : null}
          </div>

          {!items.length ? (
            <div className="card-surface flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-2 text-muted">
                <ImagePlus className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="font-bold text-ink">{t("emptyTitle")}</p>
              <p className="text-sm text-muted">{t("emptyBody")}</p>
            </div>
          ) : (
            <ul className="space-y-3" data-upload-list>
              {items.map((item) => {
                const result = item.result;
                const percent = result
                  ? savingsPercent(result.originalSize, result.blob.size)
                  : 0;
                const grew = result ? result.blob.size > result.originalSize : false;
                const same = result ? result.blob.size === result.originalSize : false;
                const targetBigger =
                  result?.targetBytes != null &&
                  result.targetBytes >= result.originalSize;

                return (
                  <li key={item.id} className="card-surface overflow-hidden">
                    <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.previewUrl}
                          alt={t("previewAlt", { name: item.file.name })}
                          className="h-14 w-14 shrink-0 rounded-xl border border-line bg-surface-2 object-cover"
                          loading="lazy"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-ink" title={item.file.name}>
                            {item.file.name}
                          </p>
                          <p className="mt-0.5 text-xs text-muted">
                            {formatBytes(item.file.size, locale)}
                            {result ? (
                              <>
                                {" → "}
                                <span className={grew ? "font-semibold text-danger" : "font-semibold text-success"}>
                                  {formatBytes(result.blob.size, locale)}
                                </span>
                                {result.targetBytes != null
                                  ? ` · ${t("perFileTarget", {
                                      target: formatBytes(result.targetBytes, locale),
                                    })}`
                                  : ""}
                              </>
                            ) : null}
                          </p>
                          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                            <StatusPill
                              status={STATUS_MAP[item.status]}
                              label={
                                item.status === "processing"
                                  ? stageLabel(item.progress)
                                  : statusLabel(item.status)
                              }
                            />
                            {result && !same ? (
                              <span
                                className={cn(
                                  "pill",
                                  grew
                                    ? "bg-danger/10 text-danger"
                                    : "bg-success/10 text-success"
                                )}
                              >
                                {grew ? (
                                  <TrendingUp className="h-3 w-3" aria-hidden="true" />
                                ) : (
                                  <TrendingDown className="h-3 w-3" aria-hidden="true" />
                                )}
                                {grew
                                  ? t("statusGrew", { percent: Math.abs(percent) })
                                  : t("statusSaved", { percent })}
                              </span>
                            ) : null}
                            {result ? (
                              <span className="text-[11px] text-muted">
                                {t("dimsMeta", {
                                  width: result.width,
                                  height: result.height,
                                })}
                                {result.quality
                                  ? ` · ${t("qualityMeta", {
                                      value: Math.round(result.quality * 100),
                                    })}`
                                  : ""}
                              </span>
                            ) : null}
                          </div>
                          {result?.targetBytes != null ? (
                            <p
                              className={cn(
                                "mt-1 text-[11px] font-semibold",
                                result.targetMet ? "text-success" : "text-danger"
                              )}
                            >
                              {result.targetMet ? t("targetMet") : t("targetMissed")}
                              {targetBigger ? ` · ${t("targetBiggerHint")}` : ""}
                            </p>
                          ) : null}
                          {result?.targetMet === false ? (
                            <p className="mt-1 text-[11px] leading-relaxed text-muted">
                              {t("targetMissedHint", {
                                size: formatBytes(result.blob.size, locale),
                                width: result.width,
                                height: result.height,
                              })}
                            </p>
                          ) : null}
                          {result && same ? (
                            <p className="mt-1 text-[11px] text-muted">
                              {t("noSavingsHint")}
                            </p>
                          ) : null}
                          {result && grew ? (
                            <p className="mt-1 text-[11px] text-muted">
                              {t("noSavingsHint")}
                            </p>
                          ) : null}
                          {item.status === "error" ? (
                            <p className="mt-1 text-[11px] text-danger">
                              {errorText(item.errorCode)}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-1.5 self-end sm:self-center">
                        {result && item.resultUrl ? (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedPreview((current) =>
                                  current === item.id ? null : item.id
                                )
                              }
                              className={buttonClass("secondary", "sm")}
                            >
                              {t("previewButton")}
                            </button>
                            <button
                              type="button"
                              onClick={() => downloadItem(item)}
                              className={buttonClass("ghost", "sm", "px-3")}
                              aria-label={t("download")}
                              title={t("download")}
                            >
                              <Download className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          disabled={isProcessing}
                          className={buttonClass("ghost", "sm", "px-3 text-muted")}
                          aria-label={t("remove")}
                          title={t("remove")}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    {item.status === "processing" ? (
                      <div className="px-4 pb-4">
                        <ProgressBar value={0} indeterminate label={stageLabel(item.progress)} />
                      </div>
                    ) : null}

                    {previewItem?.id === item.id &&
                    item.resultUrl &&
                    item.result ? (
                      <div className="border-t border-line bg-surface-2/40 p-4">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-bold text-ink">{t("previewTitle")}</p>
                            <p className="text-xs text-muted">{t("previewHint")}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedPreview(null)}
                            className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-ink"
                            aria-label={tCommon("close")}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <BeforeAfter
                          beforeSrc={item.previewUrl}
                          afterSrc={item.resultUrl}
                          beforeAlt={`${tCommon("before")}: ${item.file.name}`}
                          afterAlt={`${tCommon("after")}: ${item.file.name}`}
                          beforeLabel={tCommon("before")}
                          afterLabel={tCommon("after")}
                          sliderLabel={t("previewHint")}
                        />
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}

          {hasPng ? (
            <p className="rounded-2xl border border-line bg-surface-2/50 p-3 text-xs leading-relaxed text-muted">
              {t("pngNote")}
            </p>
          ) : null}
          {hasHeic ? (
            <p className="rounded-2xl border border-line bg-surface-2/50 p-3 text-xs leading-relaxed text-muted">
              {t("heicNote")}
            </p>
          ) : null}
          <p className="flex items-center gap-2 text-xs text-muted">
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            {tCommon("privacyBadge")}
          </p>
        </div>
      </div>
    </div>
  );
}
