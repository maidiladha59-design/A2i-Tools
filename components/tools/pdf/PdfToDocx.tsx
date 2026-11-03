"use client";

import { useCallback, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Download,
  FileDown,
  FileText,
  LockKeyhole,
  RefreshCw,
  X,
} from "lucide-react";
import { Dropzone } from "@/components/ui/Dropzone";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buttonClass } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { usePdfErrorMessage } from "@/components/tools/pdf/usePdfErrorMessage";
import { pdfToDocx, type PdfToDocxResult } from "@/lib/convert/client";
import {
  isCancelledError,
  validatePdfFile,
} from "@/lib/pdf/client";
import { formatBytes } from "@/lib/size";
import { downloadBlob, safeFileName } from "@/lib/utils";
import { PDF_ACCEPT } from "@/lib/config";

export function PdfToDocx() {
  const t = useTranslations("pdfToDocx");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");
  const tToast = useTranslations("toast");
  const locale = useLocale();
  const { toast } = useToast();
  const errorText = usePdfErrorMessage();

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [reading, setReading] = useState(false);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(
    null
  );
  const [result, setResult] = useState<PdfToDocxResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cancelRequested = useRef(false);

  const handleFile = useCallback(
    async (files: File[]) => {
      const selected = files[0];
      if (!selected || converting) return;

      setFile(null);
      setPageCount(0);
      setResult(null);
      setProgress(null);
      setError(null);
      setReading(true);

      const validation = await validatePdfFile(selected);
      setReading(false);

      if (!validation.ok) {
        setError(errorText(validation.code));
        return;
      }

      setFile(selected);
      setPageCount(validation.pageCount);
    },
    [converting, errorText]
  );

  const start = useCallback(async () => {
    if (!file || converting) return;
    setError(null);
    setResult(null);
    cancelRequested.current = false;
    setConverting(true);
    setProgress({ current: 0, total: pageCount || 1 });

    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const output = await pdfToDocx(bytes, {
        shouldCancel: () => cancelRequested.current,
        onPage: (current, total) => setProgress({ current, total }),
      });
      setResult(output);
      toast({
        title: tToast("docxReady", { count: output.pageCount }),
        variant: "success",
      });
    } catch (caught) {
      if (isCancelledError(caught) || cancelRequested.current) {
        toast({ title: tToast("cancelled"), variant: "info" });
      } else {
        const code = (caught as { code?: string })?.code;
        setError(code === "NO_TEXT" ? tErrors("pdfNoText") : errorText(code));
      }
    } finally {
      setConverting(false);
      setProgress(null);
    }
  }, [converting, errorText, file, pageCount, tErrors, tToast, toast]);

  const download = () => {
    if (!file || !result) return;
    const base = safeFileName(file.name.replace(/\.pdf$/i, ""), "document");
    downloadBlob(result.blob, `${base}.docx`);
  };

  const reset = () => {
    if (converting) return;
    setFile(null);
    setPageCount(0);
    setReading(false);
    setResult(null);
    setProgress(null);
    setError(null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        {!file ? (
          <Dropzone
            accept={PDF_ACCEPT}
            onFiles={(files) => void handleFile(files)}
            title={t("dropTitle")}
            hint={t("dropHint")}
            buttonLabel={t("choosePdf")}
            disabled={converting || reading}
            icon={FileDown}
          />
        ) : (
          <div className="card-surface flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-danger/10 text-danger">
                <FileDown className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-ink" title={file.name}>
                  {file.name}
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  {formatBytes(file.size, locale)}
                  {pageCount ? ` · ${t("pageCount", { count: pageCount })}` : ""}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={reset}
              disabled={converting}
              className={buttonClass("secondary", "sm", "shrink-0")}
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              {t("replace")}
            </button>
          </div>
        )}

        {reading ? (
          <ProgressBar value={0} indeterminate label={t("reading")} />
        ) : null}

        {error ? (
          <p className="rounded-xl bg-danger/10 p-3 text-sm text-danger" role="alert">
            {error}
          </p>
        ) : null}

        {converting ? (
          <div className="card-surface space-y-3 p-5">
            <ProgressBar
              value={
                progress && progress.total
                  ? (progress.current / progress.total) * 100
                  : 0
              }
              label={
                progress
                  ? t("progressPage", {
                      current: progress.current,
                      total: progress.total,
                    })
                  : t("converting")
              }
            />
            <p className="text-xs leading-relaxed text-muted">{t("convertingHint")}</p>
          </div>
        ) : null}

        {!file && !reading && !error ? (
          <div className="card-surface flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-2 text-muted">
              <FileDown className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="font-bold text-ink">{t("emptyTitle")}</p>
            <p className="text-sm text-muted">{t("emptyBody")}</p>
          </div>
        ) : null}

        {file ? (
          <p className="rounded-2xl border border-line bg-surface-2/50 p-3 text-xs leading-relaxed text-muted">
            {t("caveat")}
          </p>
        ) : null}

        {result && file ? (
          <div className="space-y-3 rounded-2xl border border-success/25 bg-success/5 p-4">
            <div>
              <p className="text-sm font-bold text-ink">{t("resultTitle")}</p>
              <p className="mt-1 text-xs text-muted">
                {t("resultMeta", {
                  pages: result.textPages,
                  size: formatBytes(result.blob.size, locale),
                })}
              </p>
            </div>
            <button
              type="button"
              onClick={download}
              className={buttonClass("primary", "md", "w-full sm:w-auto")}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {t("download")}
            </button>
          </div>
        ) : null}
      </div>

      <aside className="space-y-4">
        <div className="card-surface space-y-4 p-5 lg:sticky lg:top-[88px]">
          <div>
            <p className="text-sm font-bold text-ink">{t("formatLabel")}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{t("formatHint")}</p>
          </div>

          {converting ? (
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
              <FileText className="h-4 w-4" aria-hidden="true" />
              {t("start")}
            </button>
          )}

          <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted">
            <LockKeyhole className="h-3 w-3 text-success" aria-hidden="true" />
            {tCommon("privacyBadge")}
          </p>
        </div>
      </aside>
    </div>
  );
}
