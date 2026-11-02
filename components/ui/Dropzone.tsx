"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
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
          "group relative flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-line bg-surface/70 text-center transition duration-200",
          compact ? "px-5 py-6" : "px-6 py-12 sm:py-16",
          active && "border-brand bg-brand-soft/60",
          !disabled && "hover:border-brand/60 hover:bg-surface",
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
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand transition group-hover:scale-105",
            compact ? "h-11 w-11" : "h-14 w-14"
          )}
          aria-hidden="true"
        >
          <Icon className={compact ? "h-5 w-5" : "h-6 w-6"} />
        </span>
        <span className="space-y-1">
          <span className="block text-base font-bold text-ink sm:text-lg">
            {active ? activeLabel || title : title}
          </span>
          <span className="block text-sm text-muted">{hint}</span>
        </span>
        <span className={buttonClass("secondary", "sm", "pointer-events-none mt-1")}>
          {buttonLabel}
        </span>
        {pasteHint ? (
          <span className="text-xs text-muted">{pasteHint}</span>
        ) : null}
      </label>
    </div>
  );
}
