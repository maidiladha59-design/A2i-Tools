import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Loader2,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusKind = "queued" | "processing" | "done" | "error" | "cancelled";

const styles: Record<StatusKind, string> = {
  queued: "bg-surface-2 text-muted",
  processing: "bg-brand-soft text-brand",
  done: "bg-success/10 text-success",
  error: "bg-danger/10 text-danger",
  cancelled: "bg-surface-2 text-muted",
};

export function StatusPill({
  status,
  label,
  className,
}: {
  status: StatusKind;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold",
        styles[status],
        className
      )}
    >
      {status === "processing" ? (
        <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
      ) : null}
      {status === "done" ? (
        <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
      ) : null}
      {status === "error" ? (
        <AlertCircle className="h-3 w-3" aria-hidden="true" />
      ) : null}
      {status === "queued" ? (
        <Clock3 className="h-3 w-3" aria-hidden="true" />
      ) : null}
      {status === "cancelled" ? (
        <XCircle className="h-3 w-3" aria-hidden="true" />
      ) : null}
      {label}
    </span>
  );
}
