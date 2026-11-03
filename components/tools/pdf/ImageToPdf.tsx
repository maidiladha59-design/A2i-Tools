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
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ArrowDown,
  ArrowUp,
  Download,
  FileText,
  GripVertical,
  ImagePlus,
  LockKeyhole,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";
import { Dropzone } from "@/components/ui/Dropzone";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buttonClass } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { readImageDimensions, validateImageFile } from "@/lib/image/client";
import {
  imagesToPdf,
  isCancelledError,
  type ImagePdfPageSize,
} from "@/lib/pdf/client";
import { formatBytes } from "@/lib/size";
import { createId, downloadBlob, moveItem } from "@/lib/utils";
import {
  IMAGE_PDF_ACCEPT,
  MAX_IMAGE_BYTES,
  MAX_IMAGE_FILES,
} from "@/lib/config";
import { cn } from "@/lib/utils";

const SUPPORTED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);
const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

function isSupportedImage(file: File): boolean {
  if (SUPPORTED_MIME.has(file.type.toLowerCase())) return true;
  const name = file.name.toLowerCase();
  return SUPPORTED_EXTENSIONS.some((extension) => name.endsWith(extension));
}

type ImageValidationKey =
  | "emptyFile"
  | "imageTooLarge"
  | "imageDecode"
  | "imagePdfOnly";

function validationMessageKey(code: string | null): ImageValidationKey {
  if (code === "empty") return "emptyFile";
  if (code === "too-large") return "imageTooLarge";
  if (code === "decode") return "imageDecode";
  return "imagePdfOnly";
}

type ImageItem = {
  id: string;
  file: File;
  previewUrl: string;
  status: "reading" | "ready" | "error";
  width?: number;
  height?: number;
  errorMessage?: string;
};

type PdfResult = {
  blob: Blob;
  pageCount: number;
};

function SortableImageRow({
  item,
  index,
  count,
  disabled,
  onMoveUp,
  onMoveDown,
  onRemove,
  readingLabel,
}: {
  item: ImageItem;
  index: number;
  count: number;
  disabled: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  readingLabel: string;
}) {
  const t = useTranslations("imageToPdf");
  const locale = useLocale();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, disabled });

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
        "flex items-center gap-2 rounded-2xl border border-line bg-surface p-3 shadow-card sm:gap-3",
        isDragging && "opacity-90 ring-2 ring-brand/50"
      )}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        disabled={disabled}
        aria-label={t("dragAria", { name: item.file.name })}
        className="flex h-10 w-7 shrink-0 cursor-grab touch-none items-center justify-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-ink active:cursor-grabbing disabled:cursor-not-allowed"
      >
        <GripVertical className="h-4 w-4" aria-hidden="true" />
      </button>

      <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-surface-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.previewUrl}
          alt={t("previewAlt", { name: item.file.name })}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-ink" title={item.file.name}>
          {item.file.name}
        </p>
        <p className="mt-0.5 text-xs text-muted">
          {formatBytes(item.file.size, locale)}
          {item.status === "reading" ? ` · ${readingLabel}` : ""}
          {item.width && item.height
            ? ` · ${t("dimsMeta", { width: item.width, height: item.height })}`
            : ""}
        </p>
        {item.errorMessage ? (
          <p className="mt-1 text-[11px] font-medium text-danger">
            {item.errorMessage}
          </p>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-0.5">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={disabled || index === 0}
          aria-label={t("moveUp", { name: item.file.name })}
          title={t("moveUp", { name: item.file.name })}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-ink disabled:opacity-30 sm:h-10 sm:w-10"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={disabled || index === count - 1}
          aria-label={t("moveDown", { name: item.file.name })}
          title={t("moveDown", { name: item.file.name })}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-ink disabled:opacity-30 sm:h-10 sm:w-10"
        >
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          aria-label={t("remove", { name: item.file.name })}
          title={t("remove", { name: item.file.name })}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-danger/10 hover:text-danger disabled:opacity-30 sm:h-10 sm:w-10"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}

export function ImageToPdf({
  initialPageSize = "auto",
}: {
  initialPageSize?: ImagePdfPageSize;
}) {
  const t = useTranslations("imageToPdf");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");
  const tToast = useTranslations("toast");
  const locale = useLocale();
  const { toast } = useToast();

  const [items, setItems] = useState<ImageItem[]>([]);
  const itemsRef = useRef<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<ImagePdfPageSize>(initialPageSize);
  const [building, setBuilding] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(
    null
  );
  const [result, setResult] = useState<PdfResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cancelRequested = useRef(false);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    };
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const updateItem = useCallback((id: string, patch: Partial<ImageItem>) => {
    setItems((previous) =>
      previous.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  }, []);

  const addFiles = useCallback(
    async (files: File[]) => {
      if (building) return;
      const current = itemsRef.current;
      if (current.length >= MAX_IMAGE_FILES) {
        toast({ title: t("tooMany", { count: MAX_IMAGE_FILES }), variant: "error" });
        return;
      }

      const capacity = MAX_IMAGE_FILES - current.length;
      const selected = files.slice(0, Math.max(0, capacity));
      if (selected.length < files.length) {
        toast({ title: t("tooMany", { count: MAX_IMAGE_FILES }), variant: "error" });
      }

      const rows: ImageItem[] = [];
      for (const file of selected) {
        const duplicate = [...current, ...rows].some(
          (item) => item.file.name === file.name && item.file.size === file.size
        );
        if (duplicate) {
          toast({ title: t("duplicate"), variant: "info" });
          continue;
        }

        const basicError = validateImageFile(file);
        const row: ImageItem = {
          id: createId(),
          file,
          previewUrl: URL.createObjectURL(file),
          status: "reading",
        };

        if (basicError || !isSupportedImage(file)) {
          const message = tErrors(validationMessageKey(basicError));
          row.status = "error";
          row.errorMessage = message;
          toast({
            title: t("invalidFile", {
              name: file.name,
              reason: message,
            }),
            variant: "error",
          });
        }

        rows.push(row);
      }

      if (!rows.length) return;
      setItems((previous) => [...previous, ...rows]);
      setResult(null);

      for (const row of rows) {
        if (row.status === "error") continue;
        const dimensions = await readImageDimensions(row.file);
        if (dimensions) {
          updateItem(row.id, {
            status: "ready",
            width: dimensions.width,
            height: dimensions.height,
          });
        } else {
          const message = tErrors("imageDecode");
          updateItem(row.id, {
            status: "error",
            errorMessage: message,
          });
          toast({
            title: t("invalidFile", {
              name: row.file.name,
              reason: message,
            }),
            variant: "error",
          });
        }
      }
    },
    [building, t, tErrors, toast, updateItem]
  );

  const removeItem = (id: string) => {
    if (building) return;
    const target = itemsRef.current.find((item) => item.id === id);
    if (target) URL.revokeObjectURL(target.previewUrl);
    setItems((previous) => previous.filter((item) => item.id !== id));
    setResult(null);
    toast({ title: tToast("removed"), variant: "info" });
  };

  const move = (index: number, offset: number) => {
    if (building) return;
    setItems((previous) => moveItem(previous, index, index + offset));
    setResult(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (building) return;
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setItems((current) => {
      const from = current.findIndex((item) => item.id === active.id);
      const to = current.findIndex((item) => item.id === over.id);
      if (from < 0 || to < 0) return current;
      return arrayMove(current, from, to);
    });
    setResult(null);
  };

  const validItems = useMemo(
    () => items.filter((item) => item.status === "ready"),
    [items]
  );
  const reading = items.some((item) => item.status === "reading");
  const totalBytes = validItems.reduce((sum, item) => sum + item.file.size, 0);

  const create = useCallback(async () => {
    if (building || validItems.length < 1) return;
    setError(null);
    setResult(null);
    cancelRequested.current = false;
    setBuilding(true);
    setProgress({ current: 0, total: validItems.length });

    try {
      const output = await imagesToPdf(
        validItems.map((item) => item.file),
        { pageSize },
        {
          shouldCancel: () => cancelRequested.current,
          onPage: (current, total) => {
            setProgress({ current, total });
          },
        }
      );

      setResult({ blob: output.blob, pageCount: output.pageCount });
      toast({ title: tToast("pdfReady"), variant: "success" });
    } catch (caught) {
      if (isCancelledError(caught) || cancelRequested.current) {
        toast({ title: tToast("cancelled"), variant: "info" });
      } else {
        const code = (caught as { code?: string })?.code;
        setError(
          code === "UNSUPPORTED"
            ? tErrors("imageDecode")
            : tErrors("processFailed")
        );
      }
    } finally {
      setBuilding(false);
      setProgress(null);
    }
  }, [building, pageSize, tErrors, tToast, toast, validItems]);

  const download = () => {
    if (!result) return;
    downloadBlob(result.blob, "ai2-images.pdf");
  };

  const changePageSize = (size: ImagePdfPageSize) => {
    if (size === pageSize) return;
    setPageSize(size);
    setResult(null);
  };

  const reset = () => {
    if (building) return;
    itemsRef.current.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setItems([]);
    setResult(null);
    setError(null);
    setProgress(null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <Dropzone
          accept={IMAGE_PDF_ACCEPT}
          onFiles={(files) => void addFiles(files)}
          title={t("dropTitle")}
          hint={t("dropHint")}
          buttonLabel={t("addMore")}
          multiple
          disabled={building}
          icon={ImagePlus}
        />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-lg font-extrabold text-ink">
            {t("queueTitle")}
          </h2>
          {items.length ? (
            <p className="text-xs font-medium text-muted">
              {t("total", {
                files: validItems.length,
                size: formatBytes(totalBytes, locale),
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
          <>
            <p className="text-xs text-muted">{t("orderHint")}</p>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <ul className="space-y-2.5">
                  {items.map((item, index) => (
                    <SortableImageRow
                      key={item.id}
                      item={item}
                      index={index}
                      count={items.length}
                      disabled={building}
                      readingLabel={t("reading")}
                      onMoveUp={() => move(index, -1)}
                      onMoveDown={() => move(index, 1)}
                      onRemove={() => removeItem(item.id)}
                    />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          </>
        )}

        {items.length ? (
          <p className="rounded-2xl border border-line bg-surface-2/50 p-3 text-xs leading-relaxed text-muted">
            {t("note")}
          </p>
        ) : null}

        {error ? (
          <p className="rounded-xl bg-danger/10 p-3 text-sm text-danger" role="alert">
            {error}
          </p>
        ) : null}
      </div>

      <aside className="space-y-4">
        <div className="card-surface space-y-4 p-5 lg:sticky lg:top-[88px]">
          <fieldset disabled={building} className="space-y-2">
            <legend className="text-sm font-bold text-ink">{t("pageSizeLabel")}</legend>
            <label
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition",
                pageSize === "auto"
                  ? "border-brand bg-brand-soft/50"
                  : "border-line bg-surface hover:border-brand/40"
              )}
            >
              <input
                type="radio"
                name="pdf-page-size"
                value="auto"
                checked={pageSize === "auto"}
                onChange={() => changePageSize("auto")}
                className="mt-0.5 h-4 w-4 accent-[rgb(var(--brand))]"
              />
              <span>
                <span className="block text-sm font-bold text-ink">
                  {t("pageSizeAuto")}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                  {t("pageSizeAutoDesc")}
                </span>
              </span>
            </label>
            <label
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition",
                pageSize === "a4"
                  ? "border-brand bg-brand-soft/50"
                  : "border-line bg-surface hover:border-brand/40"
              )}
            >
              <input
                type="radio"
                name="pdf-page-size"
                value="a4"
                checked={pageSize === "a4"}
                onChange={() => changePageSize("a4")}
                className="mt-0.5 h-4 w-4 accent-[rgb(var(--brand))]"
              />
              <span>
                <span className="block text-sm font-bold text-ink">
                  {t("pageSizeA4")}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                  {t("pageSizeA4Desc")}
                </span>
              </span>
            </label>
          </fieldset>

          {building ? (
            <>
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
                    : t("creating")
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
              onClick={() => void create()}
              disabled={validItems.length < 1 || reading}
              className={buttonClass("primary", "md", "w-full")}
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              {validItems.length > 1
                ? t("createWithCount", { count: validItems.length })
                : t("create")}
            </button>
          )}

          {!validItems.length ? (
            <p className="text-xs leading-relaxed text-muted">{t("minFiles")}</p>
          ) : null}

          {result ? (
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
                className={buttonClass("primary", "md", "w-full")}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {t("download")}
              </button>
            </div>
          ) : null}

          {items.length ? (
            <button
              type="button"
              onClick={reset}
              disabled={building}
              className={buttonClass("secondary", "sm", "w-full")}
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              {t("another")}
            </button>
          ) : null}

          <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted">
            <LockKeyhole className="h-3 w-3 text-success" aria-hidden="true" />
            {tCommon("privacyBadge")}
          </p>
          <p className="text-[11px] leading-relaxed text-muted">
            {t("limitHint", {
              size: formatBytes(MAX_IMAGE_BYTES, locale),
              count: MAX_IMAGE_FILES,
            })}
          </p>
        </div>
      </aside>
    </div>
  );
}
