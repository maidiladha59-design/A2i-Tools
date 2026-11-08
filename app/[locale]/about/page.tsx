import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  FileText,
  ImagePlus,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { buttonClass } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { ABOUT_CONTENT } from "@/content/about";
import { pickLocale } from "@/content/types";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/config";
import { TOOLS } from "@/lib/tools/registry";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return buildMetadata({
    locale,
    path: "/about",
    title: t("title"),
    description: t("description"),
  });
}

const VALUE_ICONS = [ShieldCheck, Target, Sparkles, LockKeyhole];

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "about" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tTools = await getTranslations({ locale, namespace: "tools" });
  const intro = pickLocale(ABOUT_CONTENT.intro, locale);
  const values = pickLocale(ABOUT_CONTENT.values, locale);
  const sections = pickLocale(ABOUT_CONTENT.sections, locale);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: tCommon("home"), path: "/" },
          { name: t("title"), path: "/about" },
        ])}
      />

      <section className="relative overflow-hidden border-b border-line">
        <div className="pattern-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
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
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/5 px-3 py-1.5 text-[11px] font-bold text-success">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                {tCommon("privacyBadge")}
              </p>
              <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] text-ink sm:text-4xl lg:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {t("subtitle")}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/image/compress" className={buttonClass("primary", "md")}>
                  {tCommon("tryNow")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/contact" className={buttonClass("secondary", "md")}>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {t("contactCta")}
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-surface p-5 shadow-card sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                {tCommon("appName")}
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { value: String(TOOLS.length), label: tCommon("allTools"), icon: Sparkles },
                  { value: "2", label: t("languages"), icon: FileText },
                  { value: "0", label: tCommon("noUpload"), icon: ShieldCheck },
                  { value: "100%", label: tCommon("privacyShort"), icon: LockKeyhole },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-line bg-surface-2/60 p-3.5"
                  >
                    <item.icon className="h-4 w-4 text-brand" aria-hidden="true" />
                    <dt className="mt-2 font-display text-xl font-extrabold text-ink">
                      {item.value}
                    </dt>
                    <dd className="mt-0.5 text-[11px] font-medium leading-snug text-muted">
                      {item.label}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex items-center gap-2 rounded-2xl bg-brand-soft/60 p-3 text-xs font-medium text-ink">
                <ImagePlus className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                {tCommon("tagline")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-10 sm:py-12">
        <div className="mx-auto max-w-3xl space-y-4">
          {intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-muted sm:text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = VALUE_ICONS[index % VALUE_ICONS.length] ?? Sparkles;
            return (
              <div key={value.title} className="card-surface p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-3 text-base font-bold text-ink">{value.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted">{value.body}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="min-w-0">
            {sections.map((section) => (
              <section
                key={section.heading}
                className="border-b border-line py-6 first:pt-0 last:border-0"
              >
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
          </article>

          <aside className="space-y-4 lg:sticky lg:top-[88px] lg:self-start">
            <div className="rounded-3xl border border-line bg-surface p-5 shadow-card">
              <h2 className="font-display text-lg font-extrabold text-ink">
                {t("ctaTitle")}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">{t("ctaDesc")}</p>
              <Link
                href="/image/compress"
                className={buttonClass("primary", "md", "mt-4 w-full")}
              >
                {tCommon("openTool")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/pdf/compress"
                className={buttonClass("secondary", "md", "mt-2 w-full")}
              >
                {tTools("pdfCompress.name")}
              </Link>
            </div>
            <div className="rounded-3xl border border-line bg-surface-2/60 p-5">
              <h2 className="text-sm font-bold text-ink">{t("contactCta")}</h2>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-2 inline-flex min-h-[44px] items-center gap-2 break-all text-sm font-semibold text-brand hover:underline"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
              <p className="mt-2 text-xs text-muted">{SITE_NAME}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
