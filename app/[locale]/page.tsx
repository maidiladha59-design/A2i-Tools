import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Download,
  FileArchive,
  FileCheck2,
  Gauge,
  ImageDown,
  Layers,
  LockKeyhole,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonClass } from "@/components/ui/Button";
import { ToolCard } from "@/components/tools/ToolCard";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { QuickStart } from "@/components/home/QuickStart";
import { AdSlot } from "@/components/ads/AdSlot";
import { JsonLd } from "@/components/seo/JsonLd";
import { HOME_FAQ, pickLocale } from "@/content/faqs";
import { BLOG_POSTS } from "@/content/blog";
import { IMAGE_TOOLS, PDF_TOOLS } from "@/lib/tools/registry";
import { buildMetadata, faqJsonLd, toolJsonLd } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return buildMetadata({
    locale,
    path: "/",
    title: t("title"),
    description: t("description"),
  });
}

const FEATURES = [
  {
    icon: ShieldCheck,
    titleKey: "featurePrivacyTitle",
    bodyKey: "featurePrivacyDesc",
    tone: "success" as const,
  },
  {
    icon: Target,
    titleKey: "featureTargetTitle",
    bodyKey: "featureTargetDesc",
    tone: "brand" as const,
  },
  {
    icon: Layers,
    titleKey: "featureBulkTitle",
    bodyKey: "featureBulkDesc",
    tone: "accent" as const,
  },
  {
    icon: FileCheck2,
    titleKey: "featurePdfTitle",
    bodyKey: "featurePdfDesc",
    tone: "brand" as const,
  },
  {
    icon: Zap,
    titleKey: "featureFastTitle",
    bodyKey: "featureFastDesc",
    tone: "accent" as const,
  },
  {
    icon: BadgeCheck,
    titleKey: "featureFreeTitle",
    bodyKey: "featureFreeDesc",
    tone: "success" as const,
  },
];

const STEPS = [
  { icon: Download, titleKey: "how1Title", bodyKey: "how1Desc" },
  { icon: Settings2, titleKey: "how2Title", bodyKey: "how2Desc" },
  { icon: Sparkles, titleKey: "how3Title", bodyKey: "how3Desc" },
];

const TARGETS = [
  { href: "/compress-image-100kb", key: "targetImage100", icon: ImageDown },
  { href: "/compress-image-200kb", key: "targetImage200", icon: ImageDown },
  { href: "/compress-pdf-1mb", key: "targetPdf1", icon: FileArchive },
  { href: "/compress-jpg", key: "targetJpg", icon: FileCheck2 },
  { href: "/compress-png", key: "targetPng", icon: Gauge },
  { href: "/merge-pdf", key: "targetMerge", icon: Layers },
];

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tBlog = await getTranslations({ locale, namespace: "blog" });
  const tMeta = await getTranslations({ locale, namespace: "meta.home" });
  const faq = pickLocale(HOME_FAQ, locale);
  const latestPosts = BLOG_POSTS.slice(0, 3);
  const dateFormatter = new Intl.DateTimeFormat(
    locale === "en" ? "en-GB" : "id-ID",
    { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }
  );

  const toneClasses = {
    brand: "bg-brand-soft text-brand",
    accent: "bg-accent/20 text-accent-strong",
    success: "bg-success/10 text-success",
  };

  return (
    <>
      <JsonLd
        data={toolJsonLd({
          locale,
          name: SITE_NAME,
          description: tMeta("description"),
          path: "/",
        })}
      />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: `${SITE_URL}/${locale}`,
          inLanguage: locale,
          description: tMeta("description"),
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
        }}
      />

      <section className="relative overflow-hidden border-b border-line">
        <div className="pattern-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand/15 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-page relative grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:py-20">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/5 px-3 py-1.5 text-[11px] font-bold text-success">
              <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
              {tCommon("privacyBadge")}
            </p>
            <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {t("heroTitleBefore")}{" "}
              <span className="relative inline-block text-brand">
                {t("heroTitleAccent")}
                <svg
                  className="absolute -bottom-1 left-0 h-2 w-full text-accent"
                  viewBox="0 0 200 10"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 7C55 2 145 2 198 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>{" "}
              {t("heroTitleAfter")}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {t("heroText")}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link href="/image/compress" className={buttonClass("primary", "lg")}>
                <ImageDown className="h-5 w-5" aria-hidden="true" />
                {t("ctaButton")}
              </Link>
              <Link href="/pdf/merge" className={buttonClass("secondary", "lg")}>
                <Layers className="h-5 w-5" aria-hidden="true" />
                {t("ctaSecondary")}
              </Link>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-muted">
              <li className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-success" aria-hidden="true" />
                {tCommon("noUpload")}
              </li>
              <li className="inline-flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-brand" aria-hidden="true" />
                {tCommon("free")}
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-accent-strong" aria-hidden="true" />
                {tCommon("noAccount")}
              </li>
            </ul>
          </div>

          <div className="animate-fade-up lg:pl-4 [animation-delay:120ms]">
            <QuickStart />
          </div>
        </div>

        <div className="container-page relative pb-10">
          <dl className="grid grid-cols-2 gap-3 rounded-3xl border border-line bg-surface/80 p-4 backdrop-blur sm:grid-cols-4 sm:p-5">
            {[
              [t("statsLocal"), t("statsLocalLabel")],
              [t("statsUpload"), t("statsUploadLabel")],
              [t("statsTools"), t("statsToolsLabel")],
              [t("statsPrice"), t("statsPriceLabel")],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col rounded-2xl bg-surface-2/60 px-3 py-3 text-center sm:px-4">
                <dt className="order-2 mt-0.5 text-[11px] font-medium text-muted">{label}</dt>
                <dd className="order-1 font-display text-xl font-extrabold text-ink sm:text-2xl">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16" aria-labelledby="tools-heading">
        <div className="max-w-2xl">
          <h2 id="tools-heading" className="text-3xl font-extrabold text-ink sm:text-4xl">
            {t("toolsTitle")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">{t("toolsDesc")}</p>
        </div>

        <div className="mt-9 grid gap-8 lg:grid-cols-2">
          <div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="flex items-center gap-2 font-display text-lg font-extrabold text-ink">
                  <ImageDown className="h-5 w-5 text-brand" aria-hidden="true" />
                  {t("imageSectionTitle")}
                </h3>
                <p className="mt-1 text-sm text-muted">{t("imageSectionDesc")}</p>
              </div>
              <span className="pill bg-brand-soft text-brand">{IMAGE_TOOLS.length}</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {IMAGE_TOOLS.map((tool) => (
                <ToolCard key={tool.id} tool={tool} compact />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="flex items-center gap-2 font-display text-lg font-extrabold text-ink">
                  <FileArchive className="h-5 w-5 text-accent-strong" aria-hidden="true" />
                  {t("pdfSectionTitle")}
                </h3>
                <p className="mt-1 text-sm text-muted">{t("pdfSectionDesc")}</p>
              </div>
              <span className="pill bg-accent/20 text-accent-strong">{PDF_TOOLS.length}</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {PDF_TOOLS.map((tool) => (
                <ToolCard key={tool.id} tool={tool} compact />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface/50 py-12" aria-labelledby="targets-heading">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <h2 id="targets-heading" className="text-2xl font-extrabold text-ink sm:text-3xl">
                {t("targetTitle")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t("targetDesc")}</p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"
            >
              {t("blogCta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {TARGETS.map((entry) => {
              const Icon = entry.icon;
              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className="group flex min-h-[56px] items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-4 py-3 transition hover:border-brand/40 hover:bg-surface-2"
                >
                  <span className="flex items-center gap-2.5 text-sm font-bold text-ink">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-soft text-brand">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {t(entry.key)}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16" aria-labelledby="why-heading">
        <div className="max-w-2xl">
          <h2 id="why-heading" className="text-3xl font-extrabold text-ink sm:text-4xl">
            {t("whyTitle")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">{t("whyDesc")}</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.titleKey} className="card-surface p-5">
                <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${toneClasses[feature.tone]}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-bold text-ink">{t(feature.titleKey)}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{t(feature.bodyKey)}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-page py-4" aria-label={tCommon("relatedTools")}>
        <AdSlot variant="inline" className="mx-auto max-w-3xl" />
      </section>

      <section className="border-y border-line bg-surface/50 py-14" aria-labelledby="how-heading">
        <div className="container-page">
          <div className="max-w-xl">
            <h2 id="how-heading" className="text-3xl font-extrabold text-ink sm:text-4xl">
              {t("howTitle")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">{t("howDesc")}</p>
          </div>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.titleKey} className="card-surface relative p-5">
                  <span
                    className="absolute right-4 top-4 font-display text-4xl font-extrabold text-muted/70"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-canvas">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-base font-bold text-ink">{t(step.titleKey)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{t(step.bodyKey)}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16" aria-labelledby="demo-heading">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 id="demo-heading" className="text-3xl font-extrabold text-ink sm:text-4xl">
              {t("demoTitle")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">{t("demoDesc")}</p>
            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
              {t("demoCaption")}
            </p>
          </div>
          <BeforeAfter
            beforeSrc="/demo/before.jpg"
            afterSrc="/demo/after.jpg"
            beforeAlt={tCommon("before")}
            afterAlt={tCommon("after")}
            beforeLabel={tCommon("before")}
            afterLabel={tCommon("after")}
            sliderLabel={t("demoDesc")}
            hint={t("demoCaption")}
          />
        </div>
      </section>

      <section className="border-y border-line bg-surface/50 py-14" aria-labelledby="blog-heading">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <h2 id="blog-heading" className="flex items-center gap-2 text-3xl font-extrabold text-ink sm:text-4xl">
                <BookOpen className="h-7 w-7 text-brand" aria-hidden="true" />
                {tBlog("title")}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">{tBlog("subtitle")}</p>
            </div>
            <Link
              href="/blog"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-brand hover:underline"
            >
              {t("blogCta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card-surface card-hover flex flex-col p-5"
              >
                <span className="text-[11px] font-semibold text-muted">
                  {dateFormatter.format(new Date(post.publishedAt))}
                </span>
                <h3 className="mt-1.5 font-display text-base font-extrabold leading-snug text-ink">
                  {pickLocale(post.title, locale)}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {pickLocale(post.description, locale)}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand">
                  {tBlog("readMore")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16" aria-labelledby="faq-heading">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 id="faq-heading" className="text-3xl font-extrabold text-ink sm:text-4xl">
              {t("faqTitle")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">{t("faqSubtitle")}</p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"
            >
              {tCommon("contact")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <FaqAccordion items={faq} />
        </div>
      </section>

      <section className="container-page pb-6 pt-4">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-ink px-6 py-10 text-canvas sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-brand/30 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-2xl font-extrabold sm:text-3xl">{t("ctaTitle")}</h2>
              <p className="mt-2 text-sm leading-relaxed text-canvas/70">{t("ctaDesc")}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/image/compress" className={buttonClass("accent", "lg")}>
                <ImageDown className="h-5 w-5" aria-hidden="true" />
                {t("ctaButton")}
              </Link>
              <Link
                href="/pdf/compress"
                className={buttonClass("secondary", "lg", "border-white/20 bg-white/10 text-canvas hover:bg-white/15")}
              >
                <FileArchive className="h-5 w-5" aria-hidden="true" />
                {t("quickPdfs")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
