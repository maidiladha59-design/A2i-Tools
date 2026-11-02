import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  label?: string;
  className?: string;
  indeterminate?: boolean;
  size?: "sm" | "md";
};

export function ProgressBar({
  value,
  label,
  className,
  indeterminate = false,
  size = "md",
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-muted">
          <span>{label}</span>
          {!indeterminate ? <span>{clamped}%</span> : null}
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={indeterminate ? undefined : clamped}
        aria-label={label || undefined}
        className={cn(
          "relative overflow-hidden rounded-full bg-line/70",
          size === "sm" ? "h-1.5" : "h-2.5"
        )}
      >
        <div
          className={cn(
            "h-full rounded-full bg-brand transition-[width] duration-300 ease-out",
            indeterminate &&
              "w-1/3 animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-r from-brand via-accent to-brand"
          )}
          style={indeterminate ? undefined : { width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
