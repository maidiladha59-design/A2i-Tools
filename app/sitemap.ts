import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/content/blog";
import { LANDINGS } from "@/content/landings";
import { SITE_URL } from "@/lib/config";
import { TOOLS } from "@/lib/tools/registry";
import { routing } from "@/i18n/routing";

const STATIC_PATHS = [
  "/",
  "/about",
  "/contact",
  "/blog",
  "/privacy",
  "/terms",
  "/disclaimer",
  ...TOOLS.map((tool) => tool.href),
  ...LANDINGS.map((landing) => `/${landing.slug}`),
  ...BLOG_POSTS.map((post) => `/blog/${post.slug}`),
];

const LAST_UPDATED = new Date("2026-11-02T00:00:00.000Z");

function url(locale: string, path: string): string {
  return `${SITE_URL}/${locale}${path === "/" ? "" : path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, url(locale, path)])
    );
    languages["x-default"] = url(routing.defaultLocale, path);

    const post = path.startsWith("/blog/")
      ? BLOG_POSTS.find((entry) => path === `/blog/${entry.slug}`)
      : undefined;

    for (const locale of routing.locales) {
      entries.push({
        url: url(locale, path),
        lastModified: post ? new Date(post.updatedAt) : LAST_UPDATED,
        changeFrequency: path === "/" || path === "/blog" ? "weekly" : "monthly",
        priority:
          path === "/"
            ? 1
            : path.startsWith("/blog/")
              ? 0.6
              : path === "/blog"
                ? 0.7
                : 0.8,
        alternates: { languages },
      });
    }
  }

  return entries;
}
