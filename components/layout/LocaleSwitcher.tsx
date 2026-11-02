"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const OPTIONS: Array<{ code: Locale; short: string; key: "id" | "en" }> = [
  { code: "id", short: "ID", key: "id" },
  { code: "en", short: "EN", key: "en" },
];

export function LocaleSwitcher({
  variant = "compact",
  className,
}: {
  variant?: "compact" | "full";
  className?: string;
}) {
  const t = useTranslations("language");
  const tNav = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const changeLocale = (next: Locale) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-surface p-1",
        pending && "opacity-60",
        className
      )}
      role="group"
      aria-label={tNav("languageLabel")}
    >
      {OPTIONS.map((option) => {
        const active = locale === option.code;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => changeLocale(option.code)}
            aria-pressed={active}
            aria-label={t("switchTo", { language: t(option.key) })}
            className={cn(
              "min-h-[36px] min-w-[44px] rounded-full px-3 text-xs font-bold transition",
              active
                ? "bg-ink text-canvas"
                : "text-muted hover:bg-surface-2 hover:text-ink"
            )}
          >
            {variant === "full" ? t(option.key) : option.short}
          </button>
        );
      })}
    </div>
  );
}
