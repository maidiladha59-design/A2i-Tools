"use client";

import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Compact "file ready" line used by single-file tools once a file is loaded. */
export function UploadStatus({
  summary,
  className,
}: {
  summary: string;
  className?: string;
}) {
  return (
    <p
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-start gap-2 rounded-xl bg-success/10 px-3 py-2 text-xs font-semibold text-success",
        className
      )}
    >
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="min-w-0 break-words">{summary}</span>
    </p>
  );
}
