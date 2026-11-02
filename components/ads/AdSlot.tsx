"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { ADSENSE_CLIENT } from "@/lib/config";
import { useConsent } from "@/components/ui/Consent";
import { cn } from "@/lib/utils";

type AdVariant = "header" | "inline" | "sidebar" | "footer";

const sizes: Record<AdVariant, string> = {
  header: "min-h-[90px]",
  inline: "min-h-[140px]",
  sidebar: "min-h-[250px]",
  footer: "min-h-[90px]",
};

export function AdSenseScript() {
  const { status } = useConsent();
  if (!ADSENSE_CLIENT || status !== "accepted") return null;

  return (
    <Script
      id="adsbygoogle-init"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
    />
  );
}

export function AdSlot({
  variant = "inline",
  slotId = "auto",
  className,
}: {
  variant?: AdVariant;
  slotId?: string;
  className?: string;
}) {
  const t = useTranslations("ads");
  const { status } = useConsent();
  const enabled = Boolean(ADSENSE_CLIENT) && status === "accepted";

  useEffect(() => {
    if (!enabled) return;
    try {
      const adsWindow = window as Window & { adsbygoogle?: unknown[] };
      adsWindow.adsbygoogle = adsWindow.adsbygoogle || [];
      adsWindow.adsbygoogle.push({});
    } catch {
      // Ad blockers may block the script; the slot simply stays empty.
    }
  }, [enabled]);

  if (!enabled) return null;

  return (
    <aside
      className={cn("w-full", className)}
      aria-label={t("label")}
    >
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted/70">
        {t("label")}
      </p>
      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-line/60 bg-surface-2/40",
          sizes[variant]
        )}
      >
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
