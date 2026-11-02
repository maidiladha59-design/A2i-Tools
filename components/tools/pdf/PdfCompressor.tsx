"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Download,
  FileArchive,
  FileText,
  LockKeyhole,
  ShieldAlert,
  Trash2,
  X,
} from "lucide-react";
import { Dropzone } from "@/components/ui/Dropzone";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusPill, type StatusKind } from "@/components/ui/StatusPill";
import { buttonClass } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { usePdfErrorMessage } from "@/components/tools/pdf/usePdfErrorMessage";
import {
  compressPdf,
  isCancelledError,
  validatePdfFile,
  type PdfErrorCode,
} from "@/lib/pdf/client";
import { formatBytes, savingsPercent } from "@/lib/size";
import { createId, downloadBlob, uniqueName } from "@/lib/utils";
import { PDF_ACCEPT, MAX_PDF_FILES } from "@/lib/config";
import { cn } from "@/lib/utils";

type LevelId = "low" | "medium" | "high";
type ItemStatus = "reading" | "queued" | "processing" | "done" | "error" | "cancelled";

type CompressorItem = {
  id: string;
  file: File;
  status: ItemStatus;
  pageCount?: number;
  progress?: { page: number; total: number };
  result?: { blob: Blob; pageCount: number };
  errorCode?: PdfErrorCode | string;
};

const LEVELS: Array<{
  id: LevelId;
  nameKey: string;
  descKey: string;
  scale: number;
  quality: number;
}> = [
  { id: "low", nameKey: "levelLow", descKey: "levelLowDesc", scale: 2, quality: 0.85 },
  {
    id: "medium",
    nameKey: "levelMedium",
    descKey: "levelMediumDesc",
    scale: 1.5,
    quality: 0.65,
  },
  {
    id: "high",
    nameKey: "levelHigh",
    descKey: "levelHighDesc",
    scale: 1.1,
    quality: 0.45,
  },
];

const STATUS_MAP: Record<ItemStatus, StatusKind> = {
  reading: "processing",
  queued: "queued",
  processing: "processing",
  done: "done",
  error: "error",
  cancelled: "cancelled",
};

export function PdfCompressor() {
  const t = useTranslations("pdfCompressor");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");
  const tToast = useTranslations("toast");
  const locale = useLocale();
  const { toast } = useToast();
  const errorText = usePdfErrorMessage();

  const [items, setItems] = useState<CompressorItem[]>([]);
  const itemsRef = useRef<CompressorItem[]>([]);
  const [level, setLevel] = useState<LevelId>("medium");
  const [processing, setProcessing] = useState(false);
  const cancelRequested = useRef(false);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const updateItem = useCallback((id: string, patch: Partial<CompressorItem>) => {
    setItems((previous) =>
      previous.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  }, []);

  const addFiles = useCallback(
    async (files: File[]) => {
      if (processing) return;
      const currentCount = itemsRef.current.length;
      if (currentCount >= MAX_PDF_FILES) {
        toast({ title: tErrors("maxFiles"), variant: "error" });
        return;
      }

      const accepted = files.slice(0, Math.max(0, MAX_PDF_FILES - currentCount));
      if (accepted.length < files.length) {
        toast({ title: tErrors("maxFiles"), variant: "error" });
      }

      const rows: CompressorItem[] = accepted.map((file) => ({
        id: createId(),
        file,
        status: "reading",
      }));
      setItems((previous) => [...previous, ...rows]);

      for (const row of rows) {
        const validation = await validatePdfFile(row.file);
        if (validation.ok) {
          updateItem(row.id, { status: "queued", pageCount: validation.pageCount });
        } else {
          updateItem(row.id, { status: "error", errorCode: validation.code });
          toast({
            title: `${row.file.name}: ${errorText(validation.code)}`,
            variant: "error",
          });
        }
      }
    },
    [errorText, processing, tErrors, toast, updateItem]
  );

  const removeItem = useCallback(
    (id: string) => {
      if (processing) return;
      setItems((previous) => previous.filter((item) => item.id !== id));
    },
    [processing]
  );

  const clearAll = useCallback(() => {
    if (processing) return;
    if (!window.confirm(t("clearConfirm"))) return;
    setItems([]);
  }, [processing, t]);

  const startCompression = useCallback(async () => {
    if (processing) return;
    const queue = itemsRef.current.filter(
      (item) => item.status !== "error" && item.pageCount
    );
    if (!queue.length) {
      toast({ title: tErrors("noFiles"), variant: "error" });
      return;
    }

    const config = LEVELS.find((entry) => entry.id === level) ?? LEVELS[1];
    if (!config) return;

    cancelRequested.current = false;
    setProcessing(true);

    for (const item of queue) {
      updateItem(item.id, {
        status: "queued",
        progress: undefined,
        result: undefined,
        errorCode: undefined,
      });
    }

    let completed = 0;
    let cancelled = false;

    for (const item of queue) {
      if (cancelRequested.current) {
        cancelled = true;
        updateItem(item.id, { status: "cancelled" });
        continue;
      }

      updateItem(item.id, { status: "processing", progress: { page: 0, total: item.pageCount || 0 } });
      try {
        const bytes = new Uint8Array(await item.file.arrayBuffer());
        const result = await compressPdf(
          bytes,
          { scale: config.scale, quality: config.quality },
          {
            shouldCancel: () => cancelRequested.current,
            onPage: (page, total) => {
              updateItem(item.id, { progress: { page, total } });
            },
          }
        );
        updateItem(item.id, {
          status: "done",
          progress: undefined,
          result: { blob: result.blob, pageCount: result.pageCount },
        });
        completed += 1;
      } catch (error) {
        if (isCancelledError(error) || cancelRequested.current) {
          cancelled = true;
          updateItem(item.id, { status: "cancelled", progress: undefined });
        } else {
          updateItem(item.id, {
            status: "error",
            progress: undefined,
            errorCode: error instanceof Error ? (error as { code?: string }).code : "PROCESS_FAILED",
          });
        }
      }
    }

    setProcessing(false);
    if (cancelled) {
      toast({ title: tToast("cancelled"), variant: "info" });
    } else if (completed > 0) {
      toast({ title: tToast("pdfReady"), variant: "success" });
    }
  }, [level, processing, tErrors, tToast, toast, updateItem]);

  const cancelRun = () => {
    cancelRequested.current = true;
  };

  const downloadItem = (item: CompressorItem) => {
    if (!item.result) return;
    const base = item.file.name.replace(/\.pdf$/i, "");
    downloadBlob(item.result.blob, `${base}-compressed.pdf`);
  };

  const downloadAll = useCallback(async () => {
    const done = itemsRef.current.filter((item) => item.result);
    if (!done.length) return;
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    const used = new Set<string>();
    done.forEach((item) => {
      if (!item.result) return;
      const base = item.file.name.replace(/\.pdf$/i, "");
      zip.file(uniqueName(`${base}-compressed.pdf`, used), item.result.blob);
    });
    const blob = await zip.generateAsync({ type: "blob", compression: "STORE" });
    downloadBlob(blob, "ai2-all-compress-pdfs.zip");
    toast({ title: tToast("zipReady", { count: done.length }), variant: "success" });
  }, [tToast, toast]);

  const doneItems = useMemo(
    () => items.filter((item) => item.status === "done" && item.result),
    [items]
  );
  const validItems = useMemo(
    () => items.filter((item) => item.status !== "error" && item.pageCount),
    [items]
  );
  const processedCount = items.filter((item) =>
    ["done", "error", "cancelled"].includes(item.status)
  ).length;

  const totalBefore = doneItems.reduce((sum, item) => sum + item.file.size, 0);
  const totalAfter = doneItems.reduce(
    (sum, item) => sum + (item.result?.blob.size || 0),
    0
  );
  const totalSaved = Math.max(0, totalBefore - totalAfter);

  const statusLabel = (item: CompressorItem) => {
    switch (item.status) {
      case "reading":
        return t("statusReading");
      case "queued":
        return t("statusQueued");
      case "processing":
        return item.progress
          ? t("pageProgress", {
              page: Math.min(item.progress.page + (item.progress.page === 0 ? 1 : 0), item.progress.total),
              total: item.progress.total,
            })
          : t("statusProcessing");
      case "done":
        return t("statusDone");
      case "error":
        return t("statusError");
      default:
        return t("statusCancelled");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-4">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-ink" aria-hidden="true" />
        <div>
          <p className="text-sm font-bold text-ink">{t("warningTitle")}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">{t("warningBody")}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-4">
          <Dropzone
            accept={PDF_ACCEPT}
            onFiles={(files) => void addFiles(files)}
            title={t("dropTitle")}
            hint={t("dropHint")}
            buttonLabel={t("addMore")}
            multiple
            disabled={processing}
            icon={FileArchive}
          />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-lg font-extrabold text-ink">
              {t("queueTitle")}
            </h2>
            {items.length ? (
              <p className="text-xs font-medium text-muted">
                {t("queueCount", { done: processedCount, total: items.length })}
              </p>
            ) : null}
          </div>

          {!items.length ? (
            <div className="card-surface flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-2 text-muted">
                <FileText className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="font-bold text-ink">{t("emptyTitle")}</p>
              <p className="text-sm text-muted">{t("emptyBody")}</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => {
                const result = item.result;
                const percent = result
                  ? savingsPercent(item.file.size, result.blob.size)
                  : 0;
                return (
                  <li key={item.id} className="card-surface overflow-hidden">
                    <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-danger/10 text-danger">
                          <FileText className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-ink" title={item.file.name}>
                            {item.file.name}
                          </p>
                          <p className="mt-0.5 text-xs text-muted">
                            {formatBytes(item.file.size, locale)}
                            {item.pageCount ? ` · ${item.pageCount} ${tCommon("pages")}` : ""}
                          </p>
                          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                            <StatusPill
                              status={STATUS_MAP[item.status]}
                              label={statusLabel(item)}
                            />
                            {result ? (
                              <span className="text-[11px] font-semibold text-success">
                                {t("savedPercent", { percent })}
                              </span>
                            ) : null}
                          </div>
                          {result ? (
                            <p className="mt-1 text-xs text-muted">
                              {formatBytes(item.file.size, locale)} →{" "}
                              <span className="font-semibold text-success">
                                {formatBytes(result.blob.size, locale)}
                              </span>
                              {result.blob.size >= item.file.size ? (
                                <span className="ml-1 text-danger">{t("noGain")}</span>
                              ) : null}
                            </p>
                          ) : null}
                          {item.status === "error" && item.errorCode ? (
                            <p className="mt-1 text-[11px] text-danger">
                              {errorText(item.errorCode)}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-1.5 self-end sm:self-center">
                        {result ? (
                          <button
                            type="button"
                            onClick={() => downloadItem(item)}
                            className={buttonClass("secondary", "sm")}
                          >
                            <Download className="h-4 w-4" aria-hidden="true" />
                            {t("download")}
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          disabled={processing}
                          className={buttonClass("ghost", "sm", "px-3 text-muted")}
                          aria-label={`${t("remove")}: ${item.file.name}`}
                          title={t("remove")}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    {item.status === "processing" ? (
                      <div className="px-4 pb-4">
                        <ProgressBar
                          value={
                            item.progress && item.progress.total
                              ? (item.progress.page / item.progress.total) * 100
                              : 0
                          }
                          label={
                            item.progress && item.progress.total
                              ? t("pageProgress", {
                                  page: item.progress.page,
                                  total: item.progress.total,
                                })
                              : t("processing")
                          }
                        />
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <aside className="space-y-4">
          <div className="card-surface p-5 lg:sticky lg:top-[88px]">
            <h2 className="font-display text-lg font-extrabold text-ink">
              {t("levelLabel")}
            </h2>
            <fieldset disabled={processing} className="mt-4 space-y-2">
              <legend className="sr-only">{t("levelLabel")}</legend>
              {LEVELS.map((entry) => (
                <label
                  key={entry.id}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition",
                    level === entry.id
                      ? "border-brand bg-brand-soft/50"
                      : "border-line bg-surface hover:border-brand/30",
                    processing && "cursor-not-allowed opacity-70"
                  )}
                >
                  <input
                    type="radio"
                    name="pdf-level"
                    value={entry.id}
                    checked={level === entry.id}
                    onChange={() => setLevel(entry.id)}
                    className="radio mt-1"
                  />
                  <span>
                    <span className="block text-sm font-bold text-ink">
                      {t(entry.nameKey)}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted">
                      {t(entry.descKey)}
                    </span>
                  </span>
                </label>
              ))}
            </fieldset>

            <div className="mt-5 space-y-2">
              {processing ? (
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
                  disabled={!validItems.length}
                  className={buttonClass("primary", "md", "w-full")}
                >
                  {validItems.length > 1
                    ? t("startBulk", { count: validItems.length })
                    : t("start")}
                </button>
              )}
              {processing ? (
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
                    {t("downloadAll")}
                  </button>
                  <button
                    type="button"
                    onClick={clearAll}
                    disabled={processing}
                    className={buttonClass("secondary", "sm", "w-full")}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    {t("clear")}
                  </button>
                </div>
              </div>
            ) : null}

            <p className="mt-4 text-xs leading-relaxed text-muted">{t("note")}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
