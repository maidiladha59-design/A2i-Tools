"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CheckCircle2, UploadCloud } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type DropzoneProps = {
  accept: string;
  onFiles: (files: File[]) => void;
  title: string;
  hint: string;
  buttonLabel: string;
  activeLabel?: string;
  pasteHint?: string;
  disabled?: boolean;
  multiple?: boolean;
  enablePaste?: boolean;
  compact?: boolean;
  icon?: LucideIcon;
  className?: string;
  /** Number of files already queued; shows the compact "ready" state when > 0. */
  fileCount?: number;
  /** Summary shown in the ready state, e.g. "3 files ready to compress (2.4 MB)". */
  readySummary?: string;
  /** Label of the action shown in the ready state, e.g. "Add more". */
  readyActionLabel?: string;
};

export function Dropzone({
  accept,
  onFiles,
  title,
  hint,
  buttonLabel,
  activeLabel,
  pasteHint,
  disabled = false,
  multiple = false,
  enablePaste = false,
  compact = false,
  icon: Icon = UploadCloud,
  className,
  fileCount = 0,
  readySummary,
  readyActionLabel,
}: DropzoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);
  const [active, setActive] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (disabled || !files || files.length === 0) return;
      onFiles(Array.from(files));
      if (inputRef.current) inputRef.current.value = "";
    },
    [disabled, onFiles]
  );

  useEffect(() => {
    if (!enablePaste || disabled) return;

    const handlePaste = (event: ClipboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) {
        return;
      }
      const items = event.clipboardData?.items;
      if (!items) return;
      const files: File[] = [];
      for (const item of Array.from(items)) {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file) files.push(file);
        }
      }
      if (files.length) {
        event.preventDefault();
        if (multiple) {
          onFiles(files);
        } else {
          const first = files[0];
          if (first) onFiles([first]);
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [disabled, enablePaste, multiple, onFiles]);

  const showReady = Boolean(readySummary) && fileCount > 0;
  const dropLabel = activeLabel || title;

  return (
    <div className={cn("w-full", className)}>
      <label
        htmlFor={inputId}
        aria-disabled={disabled}
        onDragEnter={(event) => {
          event.preventDefault();
          if (disabled) return;
          dragDepth.current += 1;
          setActive(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          dragDepth.current = Math.max(0, dragDepth.current - 1);
          if (dragDepth.current === 0) setActive(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          dragDepth.current = 0;
          setActive(false);
          handleFiles(event.dataTransfer.files);
        }}
        className={cn(
          "group relative flex w-full cursor-pointer items-center gap-3 border-2 border-dashed transition duration-200",
          showReady
            ? "flex-row flex-wrap justify-start rounded-2xl px-4 py-3 text-left"
            : "flex-col justify-center rounded-3xl text-center",
          showReady
            ? active
              ? "border-brand bg-brand-soft/70 ring-4 ring-brand/15"
              : "border-success/40 bg-success/5"
            : "border-line bg-surface/70",
          !showReady && (compact ? "px-5 py-6" : "px-6 py-12 sm:py-16"),
          !showReady && active && "border-brand bg-brand-soft/60 ring-4 ring-brand/15",
          !disabled && !showReady && "hover:border-brand/60 hover:bg-surface",
          disabled && "cursor-not-allowed opacity-60",
          "focus-within:ring-4 focus-within:ring-brand/15"
        )}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          onChange={(event) => handleFiles(event.target.files)}
        />
        {showReady ? (
          <>
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success/10 text-success"
              aria-hidden="true"
            >
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1 space-y-0.5">
              <span
                className="block break-words text-sm font-bold text-ink"
                role="status"
                aria-live="polite"
              >
                {active ? dropLabel : readySummary}
              </span>
              {active ? null : (
                <span className="block text-xs text-muted">{title}</span>
              )}
            </span>
            <span
              className={buttonClass(
                "secondary",
                "sm",
                "w-full justify-center sm:w-auto sm:shrink-0"
              )}
            >
              {readyActionLabel || buttonLabel}
            </span>
          </>
        ) : (
          <>
            <span
              className={cn(
                "flex shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand transition group-hover:scale-105",
                compact ? "h-11 w-11" : "h-14 w-14",
                active && "scale-105"
              )}
              aria-hidden="true"
            >
              <Icon className={compact ? "h-5 w-5" : "h-6 w-6"} />
            </span>
            <span className="space-y-1">
              <span className="block text-base font-bold text-ink sm:text-lg">
                {active ? dropLabel : title}
              </span>
              <span className="block text-sm text-muted">{hint}</span>
            </span>
            <span className={buttonClass("secondary", "sm", "pointer-events-none mt-1")}>
              {buttonLabel}
            </span>
            {pasteHint ? (
              <span className="text-xs text-muted">{pasteHint}</span>
            ) : null}
          </>
        )}
      </label>
    </div>
  );
}
