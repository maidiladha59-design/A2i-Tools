"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Download,
  FileText,
  LockKeyhole,
  RefreshCw,
  ShieldAlert,
  Target,
  X,
} from "lucide-react";
import { Dropzone } from "@/components/ui/Dropzone";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buttonClass } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { usePdfErrorMessage } from "@/components/tools/pdf/usePdfErrorMessage";
import { useHandoff } from "@/lib/tools/handoff";
import {
  isCancelledError,
  reducePdfToTarget,
  validatePdfFile,
  type PdfErrorCode,
} from "@/lib/pdf/client";
import { formatBytes, parseSizeToBytes, savingsPercent, type SizeUnit } from "@/lib/size";
import { downloadBlob } from "@/lib/utils";
import { PDF_ACCEPT } from "@/lib/config";
import { cn } from "@/lib/utils";

const PDF_PRESETS = [
  { label: "100 KB", bytes: 100 * 1024 },
  { label: "200 KB", bytes: 200 * 1024 },
  { label: "500 KB", bytes: 500 * 1024 },
  { label: "1 MB", bytes: 1024 * 1024 },
  { label: "2 MB", bytes: 2 * 1024 * 1024 },
] as const;

type ReduceResult = {
  blob: Blob;
  pageCount: number;
  targetBytes: number;
  targetMet: boolean;
  attempts: number;
  originalSize: number;
};

export function PdfReducer({
  initialTarget,
}: {
  initialTarget?: { value: number; unit: SizeUnit };
} = {}) {
  const t = useTranslations("pdfReducer");
  const tCommon = useTranslations("common");
  const tToast = useTranslations("toast");
  const locale = useLocale();
  const { toast } = useToast();
  const { take } = useHandoff();
  const errorText = usePdfErrorMessage();

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [reading, setReading] = useState(false);
  const [targetValue, setTargetValue] = useState(
    initialTarget ? String(initialTarget.value) : "500"
  );
  const [targetUnit, setTargetUnit] = useState<SizeUnit>(
    initialTarget?.unit || "KB"
  );
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState<{
    attempt: number;
    totalAttempts: number;
    page: number;
    pages: number;
  } | null>(null);
  const [result, setResult] = useState<ReduceResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cancelRequested = useRef(false);

  const loadFile = useCallback(
    async (next: File) => {
      setReading(true);
      setResult(null);
      setError(null);
      const validation = await validatePdfFile(next);
      setReading(false);
      if (!validation.ok) {
        setFile(null);
        setPageCount(null);
        toast({
          title: errorText(validation.code as PdfErrorCode),
          variant: "error",
        });
        return;
      }
      setFile(next);
      setPageCount(validation.pageCount);
      setResult(null);
      setError(null);
    },
    [errorText, toast]
  );

  useEffect(() => {
    const pending = take("/pdf/reduce");
    const next = pending?.[0];
    // eslint-disable-next-line react-hooks/set-state-in-effect -- consumes a cross-route handoff once
    if (next) void loadFile(next);
  }, [loadFile, take]);

  const reset = () => {
    if (processing) {
      cancelRequested.current = true;
    }
    setFile(null);
    setPageCount(null);
    setResult(null);
    setError(null);
    setProgress(null);
  };

  const start = useCallback(async () => {
    if (!file || processing) return;
    const targetBytes = parseSizeToBytes(targetValue, targetUnit);
    if (!targetBytes || targetBytes > 100 * 1024 * 1024 || targetBytes < 1024) {
      setError(t("targetInvalid"));
      return;
    }

    setError(null);
    setResult(null);
    cancelRequested.current = false;

    if (targetBytes >= file.size) {
      setResult({
        blob: file,
        pageCount: pageCount || 0,
        targetBytes,
        targetMet: true,
        attempts: 0,
        originalSize: file.size,
      });
      toast({ title: t("targetMet"), variant: "success" });
      return;
    }

    setProcessing(true);
    setProgress(null);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const output = await reducePdfToTarget(bytes, targetBytes, {
        shouldCancel: () => cancelRequested.current,
        onPage: (page, pages) => {
          setProgress((current) => ({
            attempt: current?.attempt || 1,
            totalAttempts: current?.totalAttempts || 7,
            page,
            pages,
          }));
        },
        onAttempt: (attempt, totalAttempts) => {
          setProgress({
            attempt,
            totalAttempts,
            page: 0,
            pages: pageCount || 0,
          });
        },
      });
      setResult({
        blob: output.blob,
        pageCount: output.pageCount,
        targetBytes,
        targetMet: output.targetMet,
        attempts: output.attempts,
        originalSize: file.size,
      });
      toast({
        title: output.targetMet ? t("targetMet") : t("bestEffort"),
        variant: output.targetMet ? "success" : "info",
      });
    } catch (caught) {
      if (isCancelledError(caught) || cancelRequested.current) {
        toast({ title: tToast("cancelled"), variant: "info" });
      } else {
        setError(errorText((caught as { code?: string })?.code));
      }
    } finally {
      setProcessing(false);
      setProgress(null);
    }
  }, [
    errorText,
    file,
    pageCount,
    processing,
    t,
    tToast,
    targetUnit,
    targetValue,
    toast,
  ]);

  const download = () => {
    if (!file || !result) return;
    const base = file.name.replace(/\.pdf$/i, "");
    downloadBlob(result.blob, `${base}-${Math.round(result.targetBytes / 1024)}kb.pdf`);
  };

  const percent = result
    ? savingsPercent(result.originalSize, result.blob.size)
    : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_370px]">
      <div className="min-w-0 space-y-4">
        {!file ? (
          <Dropzone
            accept={PDF_ACCEPT}
            onFiles={(files) => {
              const next = files[0];
              if (next) void loadFile(next);
            }}
            title={t("uploadTitle")}
            hint={t("uploadHint")}
            buttonLabel={tCommon("seeAll")}
            disabled={reading}
            icon={Target}
          />
        ) : (
          <div className="card-surface space-y-4 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-danger/10 text-danger">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-ink" title={file.name}>
                    {file.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {formatBytes(file.size, locale)}
                    {pageCount ? ` · ${pageCount} ${tCommon("pages")}` : ""}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={reset}
                disabled={processing}
                className={buttonClass("secondary", "sm", "shrink-0")}
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                {t("replace")}
              </button>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-4">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-ink" aria-hidden="true" />
              <div>
                <p className="text-sm font-bold text-ink">{t("warningTitle")}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {t("warningBody")}
                </p>
              </div>
            </div>

            {result ? (
              <div
                className={cn(
                  "space-y-3 rounded-2xl border p-4",
                  result.targetMet
                    ? "border-success/25 bg-success/5"
                    : "border-accent/30 bg-accent/10"
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-ink">{t("resultTitle")}</p>
                    <p className="mt-1 text-xs font-semibold text-success">
                      {result.targetMet ? t("targetMet") : t("bestEffort")}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {t("resultMeta", {
                        pages: result.pageCount,
                        size: formatBytes(result.blob.size, locale),
                      })}
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
                <dl className="grid grid-cols-2 gap-2 border-t border-line pt-3 text-sm">
                  <div>
                    <dt className="text-xs text-muted">{t("beforeSize")}</dt>
                    <dd className="font-mono font-semibold text-ink">
                      {formatBytes(result.originalSize, locale)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">{t("afterSize")}</dt>
                    <dd className="font-mono font-semibold text-ink">
                      {formatBytes(result.blob.size, locale)}
                      {percent > 0 ? (
                        <span className="ml-1 text-success">−{percent}%</span>
                      ) : null}
                    </dd>
                  </div>
                </dl>
                {!result.targetMet ? (
                  <p className="text-xs leading-relaxed text-muted">
                    {t("targetMissedBody", {
                      target: formatBytes(result.targetBytes, locale),
                      size: formatBytes(result.blob.size, locale),
                    })}
                  </p>
                ) : null}
              </div>
            ) : null}

            {processing ? (
              <ProgressBar
                value={
                  progress && progress.totalAttempts
                    ? ((progress.attempt - 1 + (progress.pages ? progress.page / progress.pages : 0)) /
                        progress.totalAttempts) *
                      100
                    : 0
                }
                label={
                  progress
                    ? t("attemptProgress", {
                        attempt: progress.attempt,
                        total: progress.totalAttempts,
                        page: Math.max(1, progress.page),
                        pages: progress.pages,
                      })
                    : t("processing")
                }
              />
            ) : null}

            {error ? (
              <p className="rounded-xl bg-danger/10 p-3 text-sm text-danger" role="alert">
                {error}
              </p>
            ) : null}

            <p className="text-xs leading-relaxed text-muted">{t("note")}</p>
          </div>
        )}

        {!file && reading ? (
          <ProgressBar value={0} indeterminate label={t("processing")} />
        ) : null}
      </div>

      <aside className="space-y-4">
        <div className="card-surface p-5 lg:sticky lg:top-[88px]">
          <label htmlFor="pdf-target" className="field-label">
            {t("targetLabel")}
          </label>
          <div className="flex gap-2">
            <input
              id="pdf-target"
              type="number"
              min={1}
              step="any"
              inputMode="decimal"
              value={targetValue}
              onChange={(event) => setTargetValue(event.target.value)}
              placeholder={t("targetPlaceholder")}
              disabled={processing}
              className="field-input"
            />
            <div className="inline-flex shrink-0 rounded-2xl border border-line bg-surface p-1">
              {(["KB", "MB"] as SizeUnit[]).map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => setTargetUnit(unit)}
                  aria-pressed={targetUnit === unit}
                  disabled={processing}
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
          <p className="mt-2 text-xs leading-relaxed text-muted">{t("targetHint")}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {PDF_PRESETS.map((preset) => {
              const active = parseSizeToBytes(targetValue, targetUnit) === preset.bytes;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setTargetUnit("KB");
                    setTargetValue(String(preset.bytes / 1024));
                  }}
                  disabled={processing}
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

          <div className="mt-5 space-y-2">
            {processing ? (
              <button
                type="button"
                onClick={() => {
                  cancelRequested.current = true;
                }}
                className={buttonClass("danger", "md", "w-full")}
              >
                <X className="h-4 w-4" aria-hidden="true" />
                {t("cancel")}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void start()}
                disabled={!file || reading}
                className={buttonClass("primary", "md", "w-full")}
              >
                <Target className="h-4 w-4" aria-hidden="true" />
                {t("start")}
              </button>
            )}
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted">
              <LockKeyhole className="h-3 w-3 text-success" aria-hidden="true" />
              {tCommon("privacyShort")}
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
