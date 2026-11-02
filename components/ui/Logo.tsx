import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
  wordmark?: boolean;
  href?: string;
};

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={cn("h-10 w-10 shrink-0", className)}
    >
      <rect width="40" height="40" rx="12" fill="rgb(var(--brand))" />
      <path
        d="M11 15.5 20 20.5l9-5"
        fill="none"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 24.5 20 19.5l9 5"
        fill="none"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.65"
      />
      <circle cx="29.5" cy="29.5" r="3" fill="rgb(var(--accent))" />
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  wordmark = true,
  href = "/",
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-2xl focus-visible:outline-offset-4",
        className
      )}
      aria-label="Ai2 All Compress"
    >
      <LogoMark className={markClassName} />
      {wordmark ? (
        <span className="font-display text-[17px] font-extrabold tracking-tight text-ink">
          Ai2{" "}
          <span className="font-semibold text-muted">All Compress</span>
        </span>
      ) : null}
    </Link>
  );
}
