"use client";

import { useTranslations } from "next-intl";
import { Mail, Settings2, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { useConsent } from "@/components/ui/Consent";
import { CONTACT_EMAIL } from "@/lib/config";
import { IMAGE_TOOLS, PDF_TOOLS } from "@/lib/tools/registry";

export function Footer() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const tTools = useTranslations("tools");
  const { openBanner } = useConsent();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-surface/50">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo markClassName="h-10 w-10" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {t("tagline")}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/5 px-3 py-1.5 text-[11px] font-semibold text-success">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              {tCommon("privacyBadge")}
            </p>
            <div className="mt-6 rounded-2xl border border-line bg-surface p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                {t("contactTitle")}
              </p>
              <p className="mt-1 text-xs text-muted">{t("contactBody")}</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-2 inline-flex items-center gap-2 break-all text-sm font-bold text-brand underline-offset-4 hover:underline"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
              <p className="mt-1.5 text-[11px] text-muted">{t("responseTime")}</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              {tCommon("imageTools")}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {IMAGE_TOOLS.map((tool) => (
                <li key={tool.id}>
                  <Link
                    href={tool.href}
                    className="text-sm text-muted transition hover:text-ink"
                  >
                    {tTools(`${tool.id}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              {tCommon("pdfTools")}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {PDF_TOOLS.map((tool) => (
                <li key={tool.id}>
                  <Link
                    href={tool.href}
                    className="text-sm text-muted transition hover:text-ink"
                  >
                    {tTools(`${tool.id}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              {t("companyTitle")}
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/blog" className="text-sm text-muted transition hover:text-ink">
                  {tCommon("blog")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted transition hover:text-ink">
                  {tCommon("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted transition hover:text-ink">
                  {tCommon("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              {t("legalTitle")}
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/privacy" className="text-sm text-muted transition hover:text-ink">
                  {tCommon("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted transition hover:text-ink">
                  {tCommon("terms")}
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm text-muted transition hover:text-ink">
                  {tCommon("disclaimer")}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openBanner}
                  className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-ink"
                >
                  <Settings2 className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("manageCookies")}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p>{t("copyright", { year })}</p>
            <p>{t("privacyFootnote")}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="hidden sm:inline">{t("languageTitle")}</span>
            <LocaleSwitcher variant="full" />
          </div>
        </div>
      </div>
    </footer>
  );
}
