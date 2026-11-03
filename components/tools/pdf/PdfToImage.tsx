"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Download,
  FileImage,
  ImageDown,
  LockKeyhole,
  Package,
  RefreshCw,
  X,
} from "lucide-react";
import { Dropzone } from "@/components/ui/Dropzone";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buttonClass } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { usePdfErrorMessage } from "@/components/tools/pdf/usePdfErrorMessage";
import {
  isCancelledError,
  pdfToImages,
  validatePdfFile,
  type PdfImageFormat,
} from "@/lib/pdf/client";
import { formatBytes } from "@/lib/size";
import {
  downloadBlob,
  safeFileName,
  uniqueName,
} from "@/lib/utils";
import { PDF_ACCEPT } from "@/lib/config";

const DPI_OPTIONS = [72, 150, 300] as const;
type DpiOption = (typeof DPI_OPTIONS)[number];

type RenderedPage = {
  pageNumber: number;
  blob: Blob;
  url: string;
  width: number;
  height: number;
};

export function PdfToImage({
  initialFormat = "image/jpeg",
}: {
  initialFormat?: PdfImageFormat;
}) {
  const t = useTranslations("pdfToImage");
  const tCommon = useTranslations("common");
  const tToast = useTranslations("toast");
  const locale = useLocale();
  const { toast } = useToast();
  const errorText = usePdfErrorMessage();

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [reading, setReading] = useState(false);
  const [format, setFormat] = useState<PdfImageFormat>(initialFormat);
  const [dpi, setDpi] = useState<DpiOption>(150);
  const [quality, setQuality] = useState(88);
  const [processing, setProcessing] = useState(false);
  const [zipping, setZipping] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(
    null
  );
  const [pages, setPages] = useState<RenderedPage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const pagesRef = useRef<RenderedPage[]>([]);
  const cancelRequested = useRef(false);

  useEffect(() => {
    pagesRef.current = pages;
  }, [pages]);

  useEffect(() => {
    return () => {
      pagesRef.current.forEach((page) => URL.revokeObjectURL(page.url));
    };
  }, []);

  const clearPages = useCallback(() => {
    pagesRef.current.forEach((page) => URL.revokeObjectURL(page.url));
    setPages([]);
  }, []);

  const handleFile = useCallback(
    async (files: File[]) => {
      const selected = files[0];
      if (!selected || processing) return;

      clearPages();
      setFile(null);
      setPageCount(0);
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
    [clearPages, errorText, processing]
  );

  const start = useCallback(async () => {
    if (!file || processing) return;
    setError(null);
    clearPages();
    cancelRequested.current = false;
    setProcessing(true);
    setProgress({ current: 0, total: pageCount || 1 });

    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const output = await pdfToImages(
        bytes,
        {
          format,
          scale: dpi / 72,
          quality: quality / 100,
        },
        {
          shouldCancel: () => cancelRequested.current,
          onPage: (current, total) => {
            setProgress({ current, total });
          },
        }
      );

      const rendered: RenderedPage[] = output.pages.map((page) => ({
        pageNumber: page.pageNumber,
        blob: page.blob,
        url: URL.createObjectURL(page.blob),
        width: page.width,
        height: page.height,
      }));
      setPages(rendered);
      toast({
        title: t("resultToast", { count: rendered.length }),
        variant: "success",
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
    clearPages,
    dpi,
    errorText,
    file,
    format,
    pageCount,
    processing,
    quality,
    t,
    tToast,
    toast,
  ]);

  const cancel = () => {
    cancelRequested.current = true;
  };

  const reset = () => {
    if (processing) {
      cancel();
      return;
    }
    clearPages();
    setFile(null);
    setPageCount(0);
    setReading(false);
    setError(null);
    setProgress(null);
  };

  const extension = format === "image/png" ? "png" : "jpg";
  const baseName = file
    ? safeFileName(file.name.replace(/\.pdf$/i, ""), "document")
    : "document";

  const downloadPage = (page: RenderedPage) => {
    downloadBlob(
      page.blob,
      `${baseName}-page-${String(page.pageNumber).padStart(2, "0")}.${extension}`
    );
  };

  const downloadAll = async () => {
    if (!pages.length || zipping) return;
    setZipping(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      const used = new Set<string>();
      for (const page of pages) {
        const name = uniqueName(
          `${baseName}-page-${String(page.pageNumber).padStart(2, "0")}.${extension}`,
          used
        );
        zip.file(name, page.blob);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      downloadBlob(blob, `${baseName}-images.zip`);
      toast({
        title: tToast("zipReady", { count: pages.length }),
        variant: "success",
      });
    } catch {
      toast({ title: t("zipFailed"), variant: "error" });
    } finally {
      setZipping(false);
    }
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
            disabled={processing || reading}
            icon={FileImage}
          />
        ) : (
          <div className="card-surface flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-danger/10 text-danger">
                <FileImage className="h-5 w-5" aria-hidden="true" />
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
              disabled={processing}
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

        {processing ? (
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
                  : t("processing")
              }
            />
            <p className="text-xs leading-relaxed text-muted">{t("processingHint")}</p>
          </div>
        ) : null}

        {!file && !reading ? (
          <div className="card-surface flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-2 text-muted">
              <ImageDown className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="font-bold text-ink">{t("emptyTitle")}</p>
            <p className="text-sm text-muted">{t("emptyBody")}</p>
          </div>
        ) : null}

        {pages.length ? (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-lg font-extrabold text-ink">
                {t("resultTitle")}
              </h2>
              <p className="text-xs font-medium text-muted">
                {t("resultMeta", {
                  count: pages.length,
                  size: formatBytes(
                    pages.reduce((sum, page) => sum + page.blob.size, 0),
                    locale
                  ),
                })}
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {pages.map((page) => (
                <li key={page.pageNumber} className="card-surface overflow-hidden">
                  <div className="flex h-44 items-center justify-center border-b border-line bg-surface-2 p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={page.url}
                      alt={t("pageLabel", { page: page.pageNumber })}
                      className="max-h-full w-auto max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-2 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold text-ink">
                        {t("pageLabel", { page: page.pageNumber })}
                      </p>
                      <p className="text-xs text-muted">
                        {formatBytes(page.blob.size, locale)}
                      </p>
                    </div>
                    <p className="text-[11px] text-muted">
                      {t("dimsMeta", { width: page.width, height: page.height })}
                    </p>
                    <button
                      type="button"
                      onClick={() => downloadPage(page)}
                      className={buttonClass("secondary", "sm", "w-full")}
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      {t("downloadPage")}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {file ? (
          <p className="rounded-2xl border border-line bg-surface-2/50 p-3 text-xs leading-relaxed text-muted">
            {t("note")}
          </p>
        ) : null}
      </div>

      <aside className="space-y-4">
        <div className="card-surface space-y-4 p-5 lg:sticky lg:top-[88px]">
          <div>
            <label htmlFor="pdf-image-format" className="field-label">
              {t("formatLabel")}
            </label>
            <select
              id="pdf-image-format"
              value={format}
              onChange={(event) => {
                setFormat(event.target.value as PdfImageFormat);
                clearPages();
              }}
              disabled={processing}
              className="field-select"
            >
              <option value="image/jpeg">{t("formatJpg")}</option>
              <option value="image/png">{t("formatPng")}</option>
            </select>
          </div>

          <div>
            <label htmlFor="pdf-image-dpi" className="field-label">
              {t("resolutionLabel")}
            </label>
            <select
              id="pdf-image-dpi"
              value={dpi}
              onChange={(event) => {
                setDpi(Number(event.target.value) as DpiOption);
                clearPages();
              }}
              disabled={processing}
              className="field-select"
            >
              {DPI_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {t("resolutionValue", { dpi: option })}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {t("resolutionHint")}
            </p>
          </div>

          {format === "image/jpeg" ? (
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="pdf-image-quality" className="field-label mb-0">
                  {t("qualityLabel")}
                </label>
                <span className="text-sm font-bold text-brand">{quality}%</span>
              </div>
              <input
                id="pdf-image-quality"
                type="range"
                min={40}
                max={100}
                value={quality}
                onChange={(event) => {
                  setQuality(Number(event.target.value));
                  clearPages();
                }}
                disabled={processing}
                className="range mt-3"
                style={{ "--range-progress": `${quality}%` } as CSSProperties}
              />
              <p className="mt-1 text-xs text-muted">{t("qualityHint")}</p>
            </div>
          ) : (
            <p className="rounded-2xl border border-line bg-surface-2/60 p-3 text-xs leading-relaxed text-muted">
              {t("pngNote")}
            </p>
          )}

          {processing ? (
            <button
              type="button"
              onClick={cancel}
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
              <ImageDown className="h-4 w-4" aria-hidden="true" />
              {t("start")}
            </button>
          )}

          {pages.length ? (
            <button
              type="button"
              onClick={() => void downloadAll()}
              disabled={zipping || processing}
              className={buttonClass("accent", "md", "w-full")}
            >
              <Package className="h-4 w-4" aria-hidden="true" />
              {zipping ? t("zipping") : t("downloadAll")}
            </button>
          ) : null}

          <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted">
            <LockKeyhole className="h-3 w-3 text-success" aria-hidden="true" />
            {tCommon("privacyBadge")}
          </p>
        </div>
      </aside>
    </div>
  );
}
