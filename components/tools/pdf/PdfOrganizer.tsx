"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  GripVertical,
  LayoutGrid,
  LockKeyhole,
  RefreshCw,
  RotateCw,
  ShieldAlert,
  Trash2,
  X,
} from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buttonClass } from "@/components/ui/Button";
import { Dropzone } from "@/components/ui/Dropzone";
import { useToast } from "@/components/ui/Toast";
import { UploadStatus } from "@/components/ui/UploadStatus";
import { useUploadFeedback } from "@/components/tools/useUploadFeedback";
import { usePdfErrorMessage } from "@/components/tools/pdf/usePdfErrorMessage";
import {
  isCancelledError,
  renderPdfThumbnails,
  rewritePdfPages,
  validatePdfFile,
  type PdfThumbnail,
} from "@/lib/pdf/client";
import { formatBytes, savingsPercent } from "@/lib/size";
import { downloadBlob, moveItem } from "@/lib/utils";
import { PDF_ACCEPT } from "@/lib/config";
import { cn } from "@/lib/utils";

type QualityMode = "keep" | "high" | "balanced" | "small";

type PageItem = {
  uid: string;
  sourceIndex: number;
  rotation: number;
  thumbnail: PdfThumbnail | null;
};

type OrganizerResult = {
  blob: Blob;
  pageCount: number;
  originalSize: number;
};

const QUALITY_MODES: Array<{ id: QualityMode; labelKey: string; descKey: string }> = [
  { id: "keep", labelKey: "qualityKeep", descKey: "qualityKeepDesc" },
  { id: "high", labelKey: "qualityHigh", descKey: "qualityHighDesc" },
  { id: "balanced", labelKey: "qualityBalanced", descKey: "qualityBalancedDesc" },
  { id: "small", labelKey: "qualitySmall", descKey: "qualitySmallDesc" },
];

const RASTER_OPTIONS: Record<
  Exclude<QualityMode, "keep">,
  { scale: number; quality: number }
> = {
  high: { scale: 2, quality: 0.8 },
  balanced: { scale: 1.5, quality: 0.65 },
  small: { scale: 1.1, quality: 0.45 },
};

function SortablePageCard({
  page,
  index,
  count,
  disabled,
  onRotate,
  onDelete,
  onMoveLeft,
  onMoveRight,
}: {
  page: PageItem;
  index: number;
  count: number;
  disabled: boolean;
  onRotate: () => void;
  onDelete: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
}) {
  const t = useTranslations("pdfOrganizer");
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: page.uid, disabled });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : undefined,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative rounded-2xl border border-line bg-surface p-2 shadow-card",
        isDragging && "opacity-90 shadow-lift ring-2 ring-brand/50"
      )}
    >
      <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl border border-line bg-white">
        {page.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={page.thumbnail.dataUrl}
            alt={t("pageLabel", { number: index + 1 })}
            className="max-h-full max-w-full object-contain transition-transform duration-200"
            style={{ transform: `rotate(${page.rotation}deg)` }}
            draggable={false}
          />
        ) : (
          <span className="animate-pulse-soft text-xs text-muted">
            {t("pageLabel", { number: index + 1 })}
          </span>
        )}
        <span className="absolute left-1.5 top-1.5 rounded-md bg-ink/85 px-1.5 py-0.5 text-[10px] font-bold text-canvas">
          {index + 1}
        </span>
        <button
          type="button"
          {...attributes}
          {...listeners}
          disabled={disabled}
          aria-label={t("dragAria", { number: index + 1 })}
          className="absolute right-1.5 top-1.5 flex h-8 w-8 cursor-grab touch-none items-center justify-center rounded-lg bg-surface/90 text-muted shadow-sm transition hover:text-ink active:cursor-grabbing disabled:cursor-not-allowed"
        >
          <GripVertical className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-2 flex items-center justify-between gap-1">
        <div className="flex gap-0.5">
          <button
            type="button"
            onClick={onMoveLeft}
            disabled={disabled || index === 0}
            aria-label={t("moveLeftAria", { number: index + 1 })}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-ink disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onMoveRight}
            disabled={disabled || index === count - 1}
            aria-label={t("moveRightAria", { number: index + 1 })}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-ink disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="flex gap-0.5">
          <button
            type="button"
            onClick={onRotate}
            disabled={disabled}
            aria-label={t("rotateAria", { number: index + 1 })}
            title={t("rotate")}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-ink disabled:opacity-30"
          >
            <RotateCw className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={disabled}
            aria-label={t("deleteAria", { number: index + 1 })}
            title={t("delete")}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-danger/10 hover:text-danger disabled:opacity-30"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </li>
  );
}

export function PdfOrganizer() {
  const t = useTranslations("pdfOrganizer");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");
  const tToast = useTranslations("toast");
  const locale = useLocale();
  const { toast } = useToast();
  const upload = useUploadFeedback();
  const errorText = usePdfErrorMessage();

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState<"read" | "thumbs" | null>(null);
  const [thumbProgress, setThumbProgress] = useState({ current: 0, total: 0 });
  const [qualityMode, setQualityMode] = useState<QualityMode>("keep");
  const [grayscale, setGrayscale] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState<{ page: number; total: number } | null>(null);
  const [result, setResult] = useState<OrganizerResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const bytesRef = useRef<Uint8Array | null>(null);
  const cancelRequested = useRef(false);
  const generation = useRef(0);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    return () => {
      generation.current += 1;
    };
  }, []);

  const loadFile = useCallback(
    async (next: File) => {
      const currentGeneration = generation.current + 1;
      generation.current = currentGeneration;
      setFile(null);
      setPages([]);
      setPageCount(0);
      setResult(null);
      setError(null);
      setLoading("read");
      bytesRef.current = null;

      const validation = await validatePdfFile(next);
      if (generation.current !== currentGeneration) return;

      if (!validation.ok) {
        setLoading(null);
        upload.reportRejected([
          { name: next.name, reason: errorText(validation.code) },
        ]);
        return;
      }

      setFile(next);
      setPageCount(validation.pageCount);
      upload.reportAdded(1);
      upload.revealUploadTarget();

      const bytes = new Uint8Array(await next.arrayBuffer());
      if (generation.current !== currentGeneration) return;
      bytesRef.current = bytes;

      const initialPages: PageItem[] = Array.from(
        { length: validation.pageCount },
        (_, index) => ({
          uid: `page-${index}`,
          sourceIndex: index,
          rotation: 0,
          thumbnail: null,
        })
      );
      setPages(initialPages);
      setLoading("thumbs");
      setThumbProgress({ current: 0, total: validation.pageCount });

      try {
        const rendered = await renderPdfThumbnails(bytes, {
          shouldCancel: () => generation.current !== currentGeneration,
          onPage: (current, total) => {
            if (generation.current !== currentGeneration) return;
            setThumbProgress({ current, total });
          },
        });
        if (generation.current !== currentGeneration) return;
        const map = new Map(rendered.thumbnails.map((thumb) => [thumb.sourceIndex, thumb]));
        setPages((current) =>
          current.map((page) => ({
            ...page,
            thumbnail: map.get(page.sourceIndex) || page.thumbnail,
          }))
        );
      } catch {
        if (generation.current === currentGeneration) {
          toast({ title: tToast("thumbnailsFailed"), variant: "info" });
        }
      } finally {
        if (generation.current === currentGeneration) setLoading(null);
      }
    },
    [errorText, tToast, toast, upload]
  );

  const reset = () => {
    generation.current += 1;
    cancelRequested.current = true;
    setFile(null);
    setPages([]);
    setPageCount(0);
    setResult(null);
    setError(null);
    setLoading(null);
    setProcessing(false);
    bytesRef.current = null;
  };

  const mutatePages = (updater: (current: PageItem[]) => PageItem[]) => {
    setResult(null);
    setPages(updater);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    mutatePages((current) => {
      const from = current.findIndex((page) => page.uid === active.id);
      const to = current.findIndex((page) => page.uid === over.id);
      if (from < 0 || to < 0) return current;
      return arrayMove(current, from, to);
    });
  };

  const rotatePage = (uid: string) => {
    mutatePages((current) =>
      current.map((page) =>
        page.uid === uid
          ? { ...page, rotation: (page.rotation + 90) % 360 }
          : page
      )
    );
  };

  const deletePage = (uid: string) => {
    if (pages.length <= 1) {
      toast({ title: t("minPage"), variant: "info" });
      return;
    }
    mutatePages((current) => current.filter((page) => page.uid !== uid));
  };

  const movePage = (index: number, offset: number) => {
    mutatePages((current) => moveItem(current, index, index + offset));
  };

  const resetOrder = () => {
    mutatePages((current) =>
      [...current].sort((first, second) => first.sourceIndex - second.sourceIndex)
    );
    toast({ title: tToast("reset"), variant: "info" });
  };

  const apply = useCallback(async () => {
    if (!file || !pages.length || processing || loading) return;
    setError(null);
    setResult(null);

    const bytes = bytesRef.current;
    if (!bytes) {
      setError(tErrors("readFailed"));
      return;
    }

    cancelRequested.current = false;
    setProcessing(true);
    setProgress({ page: 0, total: pages.length });

    try {
      const specs = pages.map((page) => ({
        sourceIndex: page.sourceIndex,
        rotation: page.rotation,
      }));
      const options =
        qualityMode === "keep"
          ? ({ rasterize: false } as const)
          : ({
              rasterize: true,
              rasterOptions: {
                ...RASTER_OPTIONS[qualityMode],
                grayscale,
              },
            } as const);

      const output = await rewritePdfPages(bytes, specs, options, {
        shouldCancel: () => cancelRequested.current,
        onPage: (page, total) => setProgress({ page, total }),
      });

      setResult({
        blob: output.blob,
        pageCount: output.pageCount,
        originalSize: file.size,
      });
      toast({ title: tToast("pdfReady"), variant: "success" });
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
    grayscale,
    loading,
    pages,
    processing,
    qualityMode,
    tErrors,
    tToast,
    toast,
  ]);

  const download = () => {
    if (!file || !result) return;
    const base = file.name.replace(/\.pdf$/i, "");
    downloadBlob(result.blob, `${base}-organized.pdf`);
  };

  const percent = result
    ? savingsPercent(result.originalSize, result.blob.size)
    : 0;
  const isRaster = qualityMode !== "keep";

  return (
    <div className="space-y-6">
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
          disabled={loading !== null}
          icon={LayoutGrid}
        />
      ) : (
        <div className="space-y-5" data-upload-action>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-danger/10 text-danger">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-ink" title={file.name}>
                  {file.name}
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  {formatBytes(file.size, locale)} · {t("pageCount", { count: pageCount })}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={resetOrder}
                disabled={processing || loading !== null}
                className={buttonClass("secondary", "sm")}
              >
                {t("resetOrder")}
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={processing}
                className={buttonClass("secondary", "sm")}
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                {t("another")}
              </button>
            </div>
          </div>

          <UploadStatus
            summary={upload.t("readyOrganize", {
              count: pageCount,
              size: formatBytes(file.size, locale),
            })}
          />

          <div className="flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-4">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-ink" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold text-ink">{t("warningTitle")}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{t("warningBody")}</p>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-lg font-extrabold text-ink">
                {t("pagesTitle")}
              </h2>
              <p className="text-xs font-medium text-muted">
                {t("selectionMeta", { count: pages.length })} · {t("pageCount", { count: pageCount })}
              </p>
            </div>
            <p className="mt-1 text-xs text-muted">{t("dragHint")}</p>

            {loading === "read" ? (
              <ProgressBar value={0} indeterminate label={tCommon("loading")} className="mt-4" />
            ) : loading === "thumbs" ? (
              <ProgressBar
                value={
                  thumbProgress.total
                    ? (thumbProgress.current / thumbProgress.total) * 100
                    : 0
                }
                label={t("thumbLoading", {
                  current: thumbProgress.current,
                  total: thumbProgress.total,
                })}
                className="mt-4"
              />
            ) : null}

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={pages.map((page) => page.uid)}
                strategy={rectSortingStrategy}
              >
                <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                  {pages.map((page, index) => (
                    <SortablePageCard
                      key={page.uid}
                      page={page}
                      index={index}
                      count={pages.length}
                      disabled={processing}
                      onRotate={() => rotatePage(page.uid)}
                      onDelete={() => deletePage(page.uid)}
                      onMoveLeft={() => movePage(index, -1)}
                      onMoveRight={() => movePage(index, 1)}
                    />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>

            {pages.length === 1 ? (
              <p className="mt-3 text-xs text-muted">{t("removeAllButOne")}</p>
            ) : null}
            <p className="mt-3 text-xs text-muted">{t("reorderedNote")}</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
            <fieldset className="card-surface p-5" disabled={processing}>
              <legend className="font-display text-lg font-extrabold text-ink">
                {t("optimizeTitle")}
              </legend>
              <p className="field-label mt-3">{t("optimizationLabel")}</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {QUALITY_MODES.map((mode) => (
                  <label
                    key={mode.id}
                    className={cn(
                      "flex cursor-pointer items-start gap-2.5 rounded-2xl border p-3 transition",
                      qualityMode === mode.id
                        ? "border-brand bg-brand-soft/50"
                        : "border-line bg-surface hover:border-brand/30",
                      processing && "cursor-not-allowed opacity-70"
                    )}
                  >
                    <input
                      type="radio"
                      name="organizer-quality"
                      value={mode.id}
                      checked={qualityMode === mode.id}
                      onChange={() => {
                        setQualityMode(mode.id);
                        setResult(null);
                      }}
                      className="radio mt-0.5"
                    />
                    <span>
                      <span className="block text-sm font-bold text-ink">
                        {t(mode.labelKey)}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                        {t(mode.descKey)}
                      </span>
                    </span>
                  </label>
                ))}
              </div>

              <label
                className={cn(
                  "mt-4 flex items-start gap-2.5 rounded-2xl border border-line p-3",
                  isRaster ? "cursor-pointer" : "cursor-not-allowed opacity-60"
                )}
              >
                <input
                  type="checkbox"
                  className="checkbox mt-0.5 h-4 w-4"
                  checked={grayscale}
                  disabled={!isRaster || processing}
                  onChange={(event) => {
                    setGrayscale(event.target.checked);
                    setResult(null);
                  }}
                />
                <span>
                  <span className="block text-sm font-bold text-ink">{t("grayscale")}</span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {t("grayscaleDesc")}
                  </span>
                </span>
              </label>

              {error ? (
                <p className="mt-3 rounded-xl bg-danger/10 p-3 text-sm text-danger" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="mt-4 space-y-2">
                {processing ? (
                  <>
                    <ProgressBar
                      value={
                        progress && progress.total
                          ? (progress.page / progress.total) * 100
                          : 0
                      }
                      label={
                        progress
                          ? t("applyProgress", {
                              page: progress.page,
                              total: progress.total,
                            })
                          : t("generating")
                      }
                    />
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
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => void apply()}
                    disabled={loading !== null || !pages.length}
                    className={buttonClass("primary", "md", "w-full")}
                  >
                    <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                    {t("apply")}
                  </button>
                )}
                <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted">
                  <LockKeyhole className="h-3 w-3 text-success" aria-hidden="true" />
                  {tCommon("privacyShort")}
                </p>
              </div>
            </fieldset>

            <aside className="space-y-4">
              {result ? (
                <div className="card-surface space-y-3 p-5">
                  <p className="text-sm font-bold text-ink">{t("resultTitle")}</p>
                  <p className="text-xs text-muted">
                    {t("resultMeta", {
                      pages: result.pageCount,
                      size: formatBytes(result.blob.size, locale),
                    })}
                  </p>
                  <p className="text-xs text-muted">
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
                    {percent > 0 ? (
                      <span className="ml-1 font-semibold text-success">−{percent}%</span>
                    ) : null}
                  </p>
                  <button
                    type="button"
                    onClick={download}
                    className={buttonClass("primary", "md", "w-full")}
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    {t("download")}
                  </button>
                </div>
              ) : (
                <div className="card-surface p-5">
                  <p className="text-sm font-bold text-ink">{t("optimizeTitle")}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {qualityMode === "keep" ? t("qualityKeepDesc") : t("warningBody")}
                  </p>
                </div>
              )}
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
