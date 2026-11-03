"use client";

import { useCallback, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Download,
  FileText,
  LockKeyhole,
  RefreshCw,
  X,
} from "lucide-react";
import { Dropzone } from "@/components/ui/Dropzone";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buttonClass } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import {
  docxToPdf,
  isDocxFile,
  validateDocxFile,
  type DocxRenderResult,
} from "@/lib/convert/client";
import { isCancelledError } from "@/lib/pdf/client";
import { formatBytes } from "@/lib/size";
import { downloadBlob, safeFileName } from "@/lib/utils";
import { DOCX_ACCEPT, MAX_DOCX_BYTES } from "@/lib/config";

type ErrorKey =
  | "emptyFile"
  | "docxOnly"
  | "docxTooLarge"
  | "docxInvalid"
  | "processFailed";

function errorKey(code: string | null | undefined): ErrorKey {
  if (code === "EMPTY") return "emptyFile";
  if (code === "UNSUPPORTED") return "docxOnly";
  if (code === "TOO_LARGE") return "docxTooLarge";
  if (code === "INVALID") return "docxInvalid";
  return "processFailed";
}

export function DocxToPdf() {
  const t = useTranslations("docxToPdf");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");
  const tToast = useTranslations("toast");
  const locale = useLocale();
  const { toast } = useToast();

  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(
    null
  );
  const [result, setResult] = useState<DocxRenderResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cancelRequested = useRef(false);

  const handleFile = useCallback(
    (files: File[]) => {
      const selected = files[0];
      if (!selected || converting) return;

      setResult(null);
      setProgress(null);

      const validation = validateDocxFile(selected);
      if (validation || !isDocxFile(selected)) {
        setFile(null);
        const message = tErrors(errorKey(validation));
        setError(message);
        toast({
          title: t("invalidFile", { name: selected.name, reason: message }),
          variant: "error",
        });
        return;
      }

      setError(null);
      setFile(selected);
    },
    [converting, t, tErrors, toast]
  );

  const start = useCallback(async () => {
    if (!file || converting) return;
    setError(null);
    setResult(null);
    cancelRequested.current = false;
    setConverting(true);
    setProgress(null);

    try {
      const output = await docxToPdf(file, {
        shouldCancel: () => cancelRequested.current,
        onPage: (current, total) => setProgress({ current, total }),
      });
      setResult(output);
      toast({ title: tToast("pdfReady"), variant: "success" });
    } catch (caught) {
      if (isCancelledError(caught) || cancelRequested.current) {
        toast({ title: tToast("cancelled"), variant: "info" });
      } else {
        setError(tErrors(errorKey((caught as { code?: string })?.code)));
      }
    } finally {
      setConverting(false);
      setProgress(null);
    }
  }, [converting, file, tErrors, tToast, toast]);

  const download = () => {
    if (!file || !result) return;
    const base = safeFileName(file.name.replace(/\.docx$/i, ""), "document");
    downloadBlob(result.blob, `${base}.pdf`);
  };

  const reset = () => {
    if (converting) return;
    setFile(null);
    setResult(null);
    setProgress(null);
    setError(null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        {!file ? (
          <Dropzone
            accept={DOCX_ACCEPT}
            onFiles={handleFile}
            title={t("dropTitle")}
            hint={t("dropHint")}
            buttonLabel={t("chooseDocx")}
            disabled={converting}
            icon={FileText}
          />
        ) : (
          <div className="card-surface flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-ink" title={file.name}>
                  {file.name}
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  {formatBytes(file.size, locale)}
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

        {!file && !error ? (
          <div className="card-surface flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-2 text-muted">
              <FileText className="h-6 w-6" aria-hidden="true" />
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
                  pages: result.pageCount,
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
              disabled={!file}
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
          <p className="text-[11px] leading-relaxed text-muted">
            {t("limitHint", { size: formatBytes(MAX_DOCX_BYTES, locale) })}
          </p>
        </div>
      </aside>
    </div>
  );
}
