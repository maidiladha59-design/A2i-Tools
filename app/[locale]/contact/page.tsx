import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Clock,
  Lightbulb,
  Mail,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm, CopyEmailButton } from "@/components/pages/ContactForm";
import { CONTACT_CONTENT } from "@/content/contact";
import { pickLocale } from "@/content/types";
import { CONTACT_EMAIL } from "@/lib/config";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return buildMetadata({
    locale,
    path: "/contact",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contact" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const asideItems = [t("aside1"), t("aside2"), t("aside3")];
  const contactLead = pickLocale(CONTACT_CONTENT.lead, locale);
  const contactSections = pickLocale(CONTACT_CONTENT.sections, locale);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: tCommon("home"), path: "/" },
          { name: t("title"), path: "/contact" },
        ])}
      />

      <section className="relative overflow-hidden border-b border-line">
        <div className="pattern-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-page relative py-8 sm:py-12">
          <Breadcrumbs
            items={[
              { label: tCommon("home"), href: "/" },
              { label: t("title") },
            ]}
            label={tCommon("breadcrumb")}
          />
          <div className="mt-5 max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/5 px-3 py-1.5 text-[11px] font-bold text-success">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              {tCommon("privacyBadge")}
            </p>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] text-ink sm:text-4xl lg:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {t("subtitle")}
            </p>
          </div>

          <div className="mt-6 inline-flex max-w-full flex-col gap-3 rounded-3xl border border-line bg-surface p-4 shadow-card sm:flex-row sm:items-center sm:gap-4 sm:p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                {t("emailTitle")}
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-0.5 inline-flex min-h-[44px] items-center break-all text-base font-extrabold text-ink underline-offset-4 hover:text-brand hover:underline sm:text-lg"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="text-xs text-muted">{t("emailBody")}</p>
            </div>
            <CopyEmailButton />
          </div>
        </div>
      </section>

      <section className="container-page py-10 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="card-surface p-5 sm:p-6">
            <h2 className="font-display text-xl font-extrabold text-ink">
              {t("formTitle")}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {t("formSubtitle")}
            </p>
            <div className="mt-5">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-line bg-surface p-5 shadow-card">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/20 text-accent-strong">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-3 font-display text-lg font-extrabold text-ink">
                {t("responseTitle")}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {t("responseBody")}
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-surface-2/60 p-5">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-brand" aria-hidden="true" />
                <h2 className="text-sm font-bold text-ink">{t("asideTitle")}</h2>
              </div>
              <ul className="mt-3 space-y-2.5">
                {asideItems.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-start gap-2.5 rounded-3xl border border-danger/20 bg-danger/5 p-4 text-sm leading-relaxed text-muted">
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
              <p>{t("privacyNote")}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-surface/40">
        <div className="container-page py-10 sm:py-12">
          <div className="mx-auto max-w-3xl">
            <p className="text-base leading-relaxed text-muted">{contactLead}</p>
            <div className="mt-7 space-y-7">
              {contactSections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-xl font-extrabold text-ink sm:text-2xl">
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)} className="text-sm leading-relaxed text-muted sm:text-base">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets?.length ? (
                    <ul className="mt-3 space-y-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-muted">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
