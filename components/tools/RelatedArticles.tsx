import { ArrowUpRight, BookOpen } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { postsForTool } from "@/content/blog";
import { pickLocale } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import type { ToolId } from "@/lib/tools/registry";

export async function RelatedArticles({
  locale,
  toolId,
  limit = 2,
}: {
  locale: Locale;
  toolId: ToolId;
  limit?: number;
}) {
  const posts = postsForTool(toolId, limit);
  if (posts.length === 0) return null;
  const t = await getTranslations({ locale, namespace: "toolPage" });

  return (
    <section className="mt-12" aria-labelledby="articles-heading">
      <h2
        id="articles-heading"
        className="flex items-center gap-2 text-2xl font-extrabold text-ink sm:text-3xl"
      >
        <BookOpen className="h-5 w-5 text-brand" aria-hidden="true" />
        {t("articlesTitle")}
      </h2>
      <p className="mt-1 text-sm text-muted">{t("articlesDesc")}</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card-surface card-hover flex flex-col p-5"
          >
            <h3 className="font-display text-base font-extrabold leading-snug text-ink">
              {pickLocale(post.title, locale)}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {pickLocale(post.description, locale)}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand">
              {t("articlesCta")}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
