import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Check, LockKeyhole, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ToolCard } from "@/components/tools/ToolCard";
import { RelatedArticles } from "@/components/tools/RelatedArticles";
import { AdSlot } from "@/components/ads/AdSlot";
import { JsonLd } from "@/components/seo/JsonLd";
import { Link } from "@/i18n/navigation";
import {
  TOOL_CONTENT,
  pickLocale,
  type FaqEntry,
} from "@/content/faqs";
import { TOOL_GUIDES } from "@/content/tool-guides";
import { getTool, relatedTools, type ToolId } from "@/lib/tools/registry";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  toolJsonLd,
} from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

function mergeFaq(base: FaqEntry[], extra: FaqEntry[]): FaqEntry[] {
  const normalize = (value: string) => value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
  const seen = new Set<string>();
  return [...base, ...extra].filter((item) => {
    const key = normalize(item.q);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

type ToolPageProps = {
  locale: Locale;
  toolId: ToolId;
  title: string;
  subtitle: string;
  children: ReactNode;
};

export async function ToolPage({
  locale,
  toolId,
  title,
  subtitle,
  children,
}: ToolPageProps) {
  const t = await getTranslations({ locale, namespace: "toolPage" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tTools = await getTranslations({ locale, namespace: "tools" });
  const tool = getTool(toolId);
  const content = pickLocale(TOOL_CONTENT[toolId], locale);
  const guide = pickLocale(TOOL_GUIDES[toolId], locale);
  const faqItems = mergeFaq(content.faq, guide.extraFaq).slice(0, 6);
  const crumbs: BreadcrumbItem[] = [
    { label: t("breadcrumbHome"), href: "/" },
    { label: tTools(`${toolId}.name`) },
  ];
  const related = relatedTools(toolId);

  return (
    <>
      <JsonLd
        data={toolJsonLd({
          locale,
          name: tTools(`${toolId}.name`),
          description: tTools(`${toolId}.description`),
          path: tool.href,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: t("breadcrumbHome"), path: "/" },
          { name: tTools(`${toolId}.name`), path: tool.href },
        ])}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      <section className="relative overflow-hidden border-b border-line">
        <div className="pattern-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-page relative py-8 sm:py-12">
          <Breadcrumbs items={crumbs} label={tCommon("breadcrumb")} />
          <div className="mt-5 max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/5 px-3 py-1.5 text-[11px] font-bold text-success">
              <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
              {tCommon("privacyBadge")}
            </p>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] text-ink sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {subtitle}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-muted">
              <span className="pill border border-line bg-surface">
                <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                {tCommon("privacyShort")}
              </span>
              <span className="pill border border-line bg-surface">
                <Zap className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                {tCommon("free")}
              </span>
              <span className="pill border border-line bg-surface">
                <Sparkles className="h-3.5 w-3.5 text-accent-strong" aria-hidden="true" />
                {tCommon("noAccount")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-8 sm:py-10">
        <div className="animate-fade-in">{children}</div>

        <div className="mt-8 grid gap-4 rounded-3xl border border-success/20 bg-success/5 p-5 sm:grid-cols-[auto_1fr] sm:p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-success/10 text-success">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-display text-base font-extrabold text-ink">
              {t("privacyTitle")}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {t("privacyBody")}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <AdSlot variant="inline" className="mx-auto max-w-3xl" />
        </div>

        <section className="mt-12" aria-labelledby="steps-heading">
          <h2 id="steps-heading" className="text-2xl font-extrabold text-ink sm:text-3xl">
            {t("stepsTitle")}
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {content.steps.map((step, index) => (
              <div key={step.title} className="card-surface p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-extrabold text-canvas">
                  {index + 1}
                </span>
                <h3 className="mt-3 text-base font-bold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-line bg-surface-2/60 p-4 text-sm text-muted">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" aria-hidden="true" />
            <p>
              <strong className="text-ink">{t("tipTitle")}: </strong>
              {content.tip}
            </p>
          </div>
        </section>

        <div className="mt-12">
          <p className="max-w-3xl text-base leading-relaxed text-muted">
            {guide.lead}
          </p>
          {guide.sections.map((section) => (
            <section key={section.heading} className="mt-8 max-w-3xl">
              <h2 className="text-xl font-extrabold text-ink sm:text-2xl">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-sm leading-relaxed text-muted sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets?.length ? (
                <ul className="mt-3 space-y-2">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2 text-sm leading-relaxed text-muted"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <section className="mt-12" aria-labelledby="faq-heading">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 id="faq-heading" className="text-2xl font-extrabold text-ink sm:text-3xl">
              {t("faqTitle")}
            </h2>
            <p className="text-sm text-muted">
              {t("faqMore")}{" "}
              <Link href="/contact" className="font-semibold text-brand underline-offset-4 hover:underline">
                {t("faqContact")}
              </Link>
            </p>
          </div>
          <FaqAccordion items={faqItems} className="mt-5" />
        </section>

        <section className="mt-14" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-2xl font-extrabold text-ink sm:text-3xl">
            {t("relatedTitle")}
          </h2>
          <p className="mt-1 text-sm text-muted">{t("relatedDesc")}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((entry) => (
              <ToolCard key={entry.id} tool={entry} compact />
            ))}
          </div>
        </section>

        <RelatedArticles locale={locale} toolId={toolId} />
      </section>
    </>
  );
}
