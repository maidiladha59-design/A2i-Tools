import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  UserRound,
} from "lucide-react";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { buttonClass } from "@/components/ui/Button";
import { ToolCard } from "@/components/tools/ToolCard";
import { Link } from "@/i18n/navigation";
import { BLOG_POSTS, getPost } from "@/content/blog";
import { pickLocale } from "@/content/types";
import { getTool } from "@/lib/tools/registry";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import type { BlogCategory } from "@/content/blog/types";

type PageProps = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    locale,
    path: `/blog/${post.slug}`,
    title: pickLocale(post.title, locale),
    description: pickLocale(post.description, locale),
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

const CATEGORY_KEYS: Record<BlogCategory, string> = {
  guide: "categoryGuide",
  tips: "categoryTips",
  format: "categoryFormat",
  privacy: "categoryPrivacy",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tTools = await getTranslations({ locale, namespace: "tools" });
  const title = pickLocale(post.title, locale);
  const description = pickLocale(post.description, locale);
  const intro = pickLocale(post.intro, locale);
  const sections = pickLocale(post.sections, locale);
  const conclusion = pickLocale(post.conclusion, locale);
  const path = `/blog/${post.slug}`;
  const dateFormatter = new Intl.DateTimeFormat(
    locale === "en" ? "en-GB" : "id-ID",
    { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }
  );
  const relatedTools = post.relatedTools
    .map((id) => getTool(id))
    .filter((tool, index, list) => list.findIndex((entry) => entry.id === tool.id) === index);
  const morePosts = BLOG_POSTS.filter((entry) => entry.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          locale,
          title,
          description,
          path,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: tCommon("home"), path: "/" },
          { name: tCommon("blog"), path: "/blog" },
          { name: title, path },
        ])}
      />

      <section className="border-b border-line bg-surface/40">
        <div className="container-page py-8 sm:py-10">
          <Breadcrumbs
            items={[
              { label: tCommon("home"), href: "/" },
              { label: tCommon("blog"), href: "/blog" },
              { label: title },
            ]}
            label={tCommon("breadcrumb")}
          />
          <div className="mt-5 max-w-4xl">
            <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-bold text-brand">
              {t(CATEGORY_KEYS[post.category])}
            </span>
            <h1 className="mt-3 text-3xl font-extrabold leading-[1.1] text-ink sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
              {description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-muted">
              <span className="inline-flex items-center gap-1.5">
                <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
                {t("by")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                {dateFormatter.format(new Date(post.publishedAt))}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {t("minRead", { count: post.readingMinutes })}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="min-w-0">
            <div className="space-y-3">
              {intro.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-muted sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {sections.map((section) => (
              <section
                key={section.heading}
                id={slugify(section.heading)}
                className="mt-8 scroll-mt-24"
              >
                <h2 className="text-xl font-extrabold text-ink sm:text-2xl">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-muted">
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

            <div className="mt-8 rounded-3xl border border-brand/20 bg-brand-soft/40 p-5">
              {conclusion.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-ink [&+&]:mt-3">
                  {paragraph}
                </p>
              ))}
            </div>

            <Link
              href="/blog"
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-brand hover:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t("backToBlog")}
            </Link>
          </article>

          <aside className="space-y-4 lg:sticky lg:top-[88px] lg:self-start">
            <nav
              aria-label={t("contents")}
              className="rounded-2xl border border-line bg-surface p-4"
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                {t("contents")}
              </p>
              <ul className="mt-2 space-y-1.5">
                {sections.map((section) => (
                  <li key={`toc-${section.heading}`}>
                    <a
                      href={`#${slugify(section.heading)}`}
                      className="block rounded py-1 text-sm text-muted transition hover:text-ink"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="rounded-2xl border border-line bg-surface-2/60 p-4">
              <p className="text-sm font-bold text-ink">{t("relatedTools")}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {t("relatedToolsDesc")}
              </p>
              <div className="mt-3 grid gap-2">
                {relatedTools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="flex min-h-[44px] items-center justify-between gap-2 rounded-xl border border-line bg-surface px-3 text-sm font-semibold text-ink transition hover:border-brand/40"
                  >
                    {tTools(`${tool.id}.name`)}
                    <ArrowRight className="h-4 w-4 text-brand" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-12" aria-labelledby="more-posts">
          <h2 id="more-posts" className="text-2xl font-extrabold text-ink sm:text-3xl">
            {t("moreArticles")}
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {morePosts.map((entry) => (
              <Link
                key={entry.slug}
                href={`/blog/${entry.slug}`}
                className="card-surface card-hover flex flex-col p-5"
              >
                <span className="text-[11px] font-bold text-brand">
                  {t(CATEGORY_KEYS[entry.category])}
                </span>
                <h3 className="mt-2 font-display text-base font-extrabold leading-snug text-ink">
                  {pickLocale(entry.title, locale)}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {pickLocale(entry.description, locale)}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand">
                  {t("readMore")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-line bg-surface-2/60 p-6 sm:flex-row">
          <div>
            <h2 className="font-display text-lg font-extrabold text-ink">{t("ctaTitle")}</h2>
            <p className="mt-1 text-sm text-muted">{t("ctaDesc")}</p>
          </div>
          <Link href="/image/compress" className={buttonClass("primary", "md")}>
            {tCommon("openTool")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedTools.map((tool) => (
            <ToolCard key={`related-card-${tool.id}`} tool={tool} compact />
          ))}
        </div>
      </section>
    </>
  );
}
