import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "accent" | "secondary" | "inverse" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white shadow-[0_10px_24px_-12px_rgb(var(--brand)/0.65)] hover:bg-brand-strong dark:text-[#0d1015]",
  accent:
    "bg-accent text-[#14171c] shadow-[0_10px_24px_-14px_rgb(var(--accent)/0.8)] hover:bg-accent-strong",
  secondary:
    "border border-muted/80 bg-surface text-ink hover:border-brand hover:bg-surface-2",
  inverse:
    "border border-canvas/50 bg-canvas/10 text-canvas hover:border-canvas/70 hover:bg-canvas/20 focus-visible:outline-canvas disabled:!opacity-100 disabled:border-canvas/30 disabled:bg-transparent disabled:text-canvas/65",
  ghost: "text-ink hover:bg-surface-2",
  danger:
    "border border-danger/30 bg-danger/5 text-danger hover:bg-danger/10",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string
): string {
  return cn(
    "inline-flex min-h-[44px] select-none items-center justify-center gap-2 rounded-full font-semibold transition duration-200 disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className
  );
}
