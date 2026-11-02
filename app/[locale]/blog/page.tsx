import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, BookOpen, CalendarDays, Clock } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { buttonClass } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { BLOG_POSTS } from "@/content/blog";
import { pickLocale } from "@/content/types";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import type { BlogCategory } from "@/content/blog/types";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.blog" });
  return buildMetadata({
    locale,
    path: "/blog",
    title: t("title"),
    description: t("description"),
  });
}

const CATEGORY_KEYS: Record<BlogCategory, string> = {
  guide: "categoryGuide",
  tips: "categoryTips",
  format: "categoryFormat",
  privacy: "categoryPrivacy",
};

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const dateFormatter = new Intl.DateTimeFormat(
    locale === "en" ? "en-GB" : "id-ID",
    { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: tCommon("home"), path: "/" },
          { name: tCommon("blog"), path: "/blog" },
        ])}
      />

      <section className="border-b border-line bg-surface/40">
        <div className="container-page py-8 sm:py-12">
          <Breadcrumbs
            items={[
              { label: tCommon("home"), href: "/" },
              { label: tCommon("blog") },
            ]}
            label={tCommon("breadcrumb")}
          />
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-soft/60 px-3 py-1.5 text-[11px] font-bold text-brand">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            {BLOG_POSTS.length} {locale === "en" ? "articles" : "artikel"}
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-[1.08] text-ink sm:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {BLOG_POSTS.map((post) => {
            const title = pickLocale(post.title, locale);
            const description = pickLocale(post.description, locale);
            return (
              <article key={post.slug} className="card-surface card-hover flex h-full flex-col p-5">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
                  <span className="rounded-full bg-brand-soft px-2.5 py-1 text-brand">
                    {t(CATEGORY_KEYS[post.category])}
                  </span>
                  <span className="inline-flex items-center gap-1 text-muted">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    {dateFormatter.format(new Date(post.publishedAt))}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-lg font-extrabold leading-snug text-ink">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="underline-offset-4 hover:text-brand hover:underline"
                  >
                    {title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{description}</p>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {t("minRead", { count: post.readingMinutes })}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex min-h-[44px] items-center gap-1 text-sm font-bold text-brand hover:underline"
                  >
                    {t("readMore")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-line bg-surface-2/60 p-6 sm:flex-row">
          <div>
            <h2 className="font-display text-lg font-extrabold text-ink">
              {t("ctaTitle")}
            </h2>
            <p className="mt-1 text-sm text-muted">{t("ctaDesc")}</p>
          </div>
          <Link href="/image/compress" className={buttonClass("primary", "md")}>
            {tCommon("openTool")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
