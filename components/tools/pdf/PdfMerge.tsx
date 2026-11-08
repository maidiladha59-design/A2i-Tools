"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
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
  LockKeyhole,
  Merge,
  RefreshCw,
  Target,
  Trash2,
  X,
} from "lucide-react";
import { Dropzone } from "@/components/ui/Dropzone";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buttonClass } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { usePdfErrorMessage } from "@/components/tools/pdf/usePdfErrorMessage";
import {
  useUploadFeedback,
  type RejectedUpload,
} from "@/components/tools/useUploadFeedback";
import { useHandoff } from "@/lib/tools/handoff";
import {
  isCancelledError,
  mergePdfs,
  validatePdfFile,
  type PdfErrorCode,
} from "@/lib/pdf/client";
import { formatBytes } from "@/lib/size";
import { createId, downloadBlob, moveItem } from "@/lib/utils";
import { PDF_ACCEPT, MAX_PDF_FILES } from "@/lib/config";
import { cn } from "@/lib/utils";

type MergeItem = {
  id: string;
  file: File;
  status: "reading" | "ready" | "error";
  pageCount?: number;
  errorCode?: PdfErrorCode | string;
};

type MergeResult = {
  blob: Blob;
  pageCount: number;
};

function SortableMergeRow({
  item,
  index,
  count,
  disabled,
  onMoveUp,
  onMoveDown,
  onRemove,
}: {
  item: MergeItem;
  index: number;
  count: number;
  disabled: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}) {
  const t = useTranslations("pdfMerge");
  const locale = useLocale();
  const errorText = usePdfErrorMessage();
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

      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-danger/10 text-danger">
        <FileText className="h-5 w-5" aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-ink" title={item.file.name}>
          {item.file.name}
        </p>
        <p className="mt-0.5 text-xs text-muted">
          {formatBytes(item.file.size, locale)}
          {item.status === "reading" ? ` · ${t("reading")}` : ""}
          {item.pageCount ? ` · ${t("pageCount", { count: item.pageCount })}` : ""}
        </p>
        {item.status === "error" ? (
          <p className="mt-1 text-[11px] font-medium text-danger">
            {errorText(item.errorCode)}
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

export function PdfMerge() {
  const t = useTranslations("pdfMerge");
  const tCommon = useTranslations("common");
  const tToast = useTranslations("toast");
  const locale = useLocale();
  const { toast } = useToast();
  const { launch } = useHandoff();
  const errorText = usePdfErrorMessage();
  const upload = useUploadFeedback();

  const [items, setItems] = useState<MergeItem[]>([]);
  const itemsRef = useRef<MergeItem[]>([]);
  const [merging, setMerging] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const [result, setResult] = useState<MergeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cancelRequested = useRef(false);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const updateItem = useCallback((id: string, patch: Partial<MergeItem>) => {
    setItems((previous) =>
      previous.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  }, []);

  const addFiles = useCallback(
    async (files: File[]) => {
      if (merging) return;
      const current = itemsRef.current;
      const tooManyReason = t("tooMany", { count: MAX_PDF_FILES });
      if (current.length >= MAX_PDF_FILES) {
        upload.reportRejected(
          files.map((file) => ({ name: file.name, reason: tooManyReason }))
        );
        return;
      }

      const capacity = MAX_PDF_FILES - current.length;
      const selected = files.slice(0, Math.max(0, capacity));
      const rejected: RejectedUpload[] = files
        .slice(selected.length)
        .map((file) => ({ name: file.name, reason: tooManyReason }));

      const rows: MergeItem[] = [];
      for (const file of selected) {
        const duplicate = [...current, ...rows].some(
          (item) => item.file.name === file.name && item.file.size === file.size
        );
        if (duplicate) {
          rejected.push({ name: file.name, reason: t("duplicate") });
          continue;
        }
        rows.push({ id: createId(), file, status: "reading" });
      }

      if (!rows.length) {
        upload.reportRejected(rejected);
        return;
      }
      setItems((previous) => [...previous, ...rows]);
      setResult(null);

      for (const row of rows) {
        const validation = await validatePdfFile(row.file);
        if (validation.ok) {
          updateItem(row.id, { status: "ready", pageCount: validation.pageCount });
        } else {
          updateItem(row.id, { status: "error", errorCode: validation.code });
          rejected.push({ name: row.file.name, reason: errorText(validation.code) });
        }
      }

      upload.reportAddedWithRejected(rows.length, rejected);
      upload.flashNewItems(rows.length);
      upload.revealUploadTarget();
    },
    [errorText, merging, t, upload, updateItem]
  );

  const removeItem = (id: string) => {
    if (merging) return;
    setItems((previous) => previous.filter((item) => item.id !== id));
    setResult(null);
    toast({ title: tToast("removed"), variant: "info" });
  };

  const move = (index: number, offset: number) => {
    if (merging) return;
    setItems((previous) => moveItem(previous, index, index + offset));
    setResult(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (merging) return;
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
  const totalPages = validItems.reduce((sum, item) => sum + (item.pageCount || 0), 0);
  const totalBytes = validItems.reduce((sum, item) => sum + item.file.size, 0);
  const queueBytes = items.reduce((sum, item) => sum + item.file.size, 0);
  const reading = items.some((item) => item.status === "reading");

  const merge = useCallback(async () => {
    if (merging || validItems.length < 2) return;
    setError(null);
    setResult(null);
    cancelRequested.current = false;
    setMerging(true);
    setProgress({ current: 0, total: validItems.length });

    try {
      const payload: Array<{ bytes: Uint8Array; name: string }> = [];
      for (let index = 0; index < validItems.length; index += 1) {
        const item = validItems[index];
        if (!item) continue;
        if (cancelRequested.current) {
          toast({ title: tToast("cancelled"), variant: "info" });
          return;
        }
        setProgress({ current: index + 1, total: validItems.length });
        const bytes = new Uint8Array(await item.file.arrayBuffer());
        payload.push({ bytes, name: item.file.name });
      }

      const output = await mergePdfs(payload, {
        shouldCancel: () => cancelRequested.current,
        onPage: (current, total) => {
          setProgress({ current, total });
        },
      });

      setResult({ blob: output.blob, pageCount: output.pageCount });
      toast({
        title: tToast("mergeReady", { pages: output.pageCount }),
        variant: "success",
      });
    } catch (caught) {
      if (isCancelledError(caught) || cancelRequested.current) {
        toast({ title: tToast("cancelled"), variant: "info" });
      } else {
        setError(errorText((caught as { code?: string })?.code));
      }
    } finally {
      setMerging(false);
      setProgress(null);
    }
  }, [errorText, merging, tToast, toast, validItems]);

  const download = () => {
    if (!result) return;
    downloadBlob(result.blob, "ai2-merged.pdf");
  };

  const shrink = () => {
    if (!result) return;
    const mergedFile = new File([result.blob], "merged.pdf", {
      type: "application/pdf",
    });
    launch("/pdf/reduce", [mergedFile]);
  };

  const reset = () => {
    if (merging) return;
    setItems([]);
    setResult(null);
    setError(null);
    setProgress(null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-4">
        <Dropzone
          accept={PDF_ACCEPT}
          onFiles={(files) => void addFiles(files)}
          title={t("dropTitle")}
          hint={t("dropHint")}
          buttonLabel={t("addMore")}
          multiple
          disabled={merging}
          icon={Merge}
          fileCount={items.length}
          readySummary={
            items.length
              ? upload.readySummary("readyMerge", items.length, queueBytes)
              : undefined
          }
          readyActionLabel={t("addMore")}
        />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-lg font-extrabold text-ink">
            {t("filesTitle")}
          </h2>
          {items.length ? (
            <p className="text-xs font-medium text-muted">
              {t("total", {
                files: validItems.length,
                pages: totalPages,
                size: formatBytes(totalBytes, locale),
              })}
            </p>
          ) : null}
        </div>

        {!items.length ? (
          <div className="card-surface flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-2 text-muted">
              <Merge className="h-6 w-6" aria-hidden="true" />
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
                <ul className="space-y-2.5" data-upload-list>
                  {items.map((item, index) => (
                    <SortableMergeRow
                      key={item.id}
                      item={item}
                      index={index}
                      count={items.length}
                      disabled={merging}
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
        <div className="card-surface space-y-3 p-5 lg:sticky lg:top-[88px]">
          {merging ? (
            <>
              <ProgressBar
                value={
                  progress && progress.total
                    ? (progress.current / progress.total) * 100
                    : 0
                }
                label={
                  progress
                    ? t("progressFile", {
                        current: progress.current,
                        total: progress.total,
                      })
                    : t("merging")
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
              onClick={() => void merge()}
              disabled={validItems.length < 2 || reading}
              className={buttonClass("primary", "md", "w-full")}
            >
              <Merge className="h-4 w-4" aria-hidden="true" />
              {validItems.length > 2
                ? t("mergeWithCount", { count: validItems.length })
                : t("merge")}
            </button>
          )}

          {validItems.length < 2 ? (
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
              <dl className="grid grid-cols-2 gap-2 border-t border-line pt-3 text-xs">
                <div>
                  <dt className="text-muted">{t("summaryBefore")}</dt>
                  <dd className="font-mono font-semibold text-ink">
                    {formatBytes(totalBytes, locale)}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">{t("summaryAfter")}</dt>
                  <dd className="font-mono font-semibold text-ink">
                    {formatBytes(result.blob.size, locale)}
                  </dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={download}
                className={buttonClass("primary", "md", "w-full")}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {t("download")}
              </button>
              <button
                type="button"
                onClick={shrink}
                className={buttonClass("accent", "sm", "w-full")}
              >
                <Target className="h-4 w-4" aria-hidden="true" />
                {t("shrink")}
              </button>
            </div>
          ) : null}

          {items.length ? (
            <button
              type="button"
              onClick={reset}
              disabled={merging}
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
        </div>
      </aside>
    </div>
  );
}
