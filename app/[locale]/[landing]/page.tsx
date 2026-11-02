import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Check, LockKeyhole, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { buttonClass } from "@/components/ui/Button";
import { ToolCard } from "@/components/tools/ToolCard";
import { ImageCompressor } from "@/components/tools/image/ImageCompressor";
import { PdfReducer } from "@/components/tools/pdf/PdfReducer";
import { PdfMerge } from "@/components/tools/pdf/PdfMerge";
import { AdSlot } from "@/components/ads/AdSlot";
import { Link } from "@/i18n/navigation";
import { LANDINGS, getLanding } from "@/content/landings";
import { pickLocale } from "@/content/types";
import { getTool } from "@/lib/tools/registry";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, toolJsonLd } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import type { LandingDefinition } from "@/content/landing-types";

type PageProps = {
  params: Promise<{ locale: Locale; landing: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return LANDINGS.map((landing) => ({ landing: landing.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, landing: slug } = await params;
  const landing = getLanding(slug);
  if (!landing) return {};
  return buildMetadata({
    locale,
    path: `/${landing.slug}`,
    title: pickLocale(landing.title, locale),
    description: pickLocale(landing.description, locale),
  });
}

function LandingTool({ landing }: { landing: LandingDefinition }) {
  switch (landing.toolId) {
    case "pdfReduce":
      return <PdfReducer initialTarget={landing.config?.pdfTarget} />;
    case "pdfMerge":
      return <PdfMerge />;
    default:
      return <ImageCompressor initialConfig={landing.config?.image} />;
  }
}

export default async function LandingPage({ params }: PageProps) {
  const { locale, landing: slug } = await params;
  const landing = getLanding(slug);
  if (!landing) notFound();
  setRequestLocale(locale);

  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tTools = await getTranslations({ locale, namespace: "tools" });
  const tPage = await getTranslations({ locale, namespace: "toolPage" });

  const h1 = pickLocale(landing.h1, locale);
  const description = pickLocale(landing.description, locale);
  const intro = pickLocale(landing.intro, locale);
  const bullets = pickLocale(landing.bullets, locale);
  const sections = pickLocale(landing.sections, locale);
  const faq = pickLocale(landing.faq, locale);
  const tool = getTool(landing.toolId);
  const related = landing.relatedTools
    .map((id) => getTool(id))
    .filter((entry) => entry.id !== landing.toolId);

  return (
    <>
      <JsonLd
        data={toolJsonLd({
          locale,
          name: h1,
          description,
          path: `/${landing.slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: tCommon("home"), path: "/" },
          { name: h1, path: `/${landing.slug}` },
        ])}
      />
      <JsonLd data={faqJsonLd(faq)} />

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
              { label: h1 },
            ]}
            label={tCommon("breadcrumb")}
          />
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/5 px-3 py-1.5 text-[11px] font-bold text-success">
                <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
                {tCommon("privacyBadge")}
              </p>
              <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] text-ink sm:text-4xl lg:text-5xl">
                {h1}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-muted">
                <span className="pill border border-line bg-surface">
                  <Sparkles className="h-3.5 w-3.5 text-accent-strong" aria-hidden="true" />
                  {tCommon("free")}
                </span>
                <span className="pill border border-line bg-surface">
                  <LockKeyhole className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                  {tCommon("privacyShort")}
                </span>
                <span className="pill border border-line bg-surface">
                  <Check className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                  {tCommon("noAccount")}
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-surface p-5 shadow-card">
              <ul className="space-y-2.5">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <Link
                href={tool.href}
                className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-brand hover:underline"
              >
                {tTools(`${tool.id}.name`)}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-8 sm:py-10">
        <div className="mx-auto max-w-3xl space-y-3">
          {intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 animate-fade-in">
          <LandingTool landing={landing} />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
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
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
          <aside className="lg:sticky lg:top-[88px] lg:self-start">
            <AdSlot variant="sidebar" />
          </aside>
        </div>

        <section className="mt-10" aria-labelledby="landing-faq">
          <h2 id="landing-faq" className="text-2xl font-extrabold text-ink sm:text-3xl">
            {tPage("faqTitle")}
          </h2>
          <FaqAccordion items={faq} className="mt-4" />
        </section>

        <section className="mt-12" aria-labelledby="landing-related">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="landing-related" className="text-2xl font-extrabold text-ink sm:text-3xl">
                {tPage("relatedTitle")}
              </h2>
              <p className="mt-1 text-sm text-muted">{tPage("relatedDesc")}</p>
            </div>
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-brand hover:underline"
            >
              {tCommon("allTools")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((entry) => (
              <ToolCard key={entry.id} tool={entry} compact />
            ))}
          </div>
        </section>

        <div className="mt-10 rounded-3xl border border-brand/20 bg-brand-soft/40 p-6 text-center">
          <h2 className="font-display text-xl font-extrabold text-ink">
            {tPage("privacyTitle")}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {tPage("privacyBody")}
          </p>
          <Link href={tool.href} className={buttonClass("primary", "md", "mt-4")}>
            {tCommon("tryNow")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
