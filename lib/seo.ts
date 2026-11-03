import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/config";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localePath(locale: string, path: string): string {
  return `${SITE_URL}/${locale}${path === "/" ? "" : path}`;
}

export function languageAlternates(path: string): Record<string, string> {
  return {
    id: localePath("id", path),
    en: localePath("en", path),
    "x-default": localePath("id", path),
  };
}

type BuildMetadataInput = {
  locale: string;
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const canonical = localePath(locale, path);
  const image = absoluteUrl("/og.png");

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      type,
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      locale: locale === "en" ? "en_US" : "id_ID",
      alternateLocale: locale === "en" ? ["id_ID"] : ["en_US"],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — compress files locally`,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export type JsonLdObject = Record<string, unknown>;

export function breadcrumbJsonLd(
  locale: string,
  items: Array<{ name: string; path?: string }>
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: localePath(locale, item.path) } : {}),
    })),
  };
}

export function faqJsonLd(items: Array<{ q: string; a: string }>): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function toolJsonLd(input: {
  locale: string;
  name: string;
  description: string;
  path: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "WebApplication"],
    name: input.name,
    description: input.description,
    url: localePath(input.locale, input.path),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript, Web Workers, and canvas support",
    isAccessibleForFree: true,
    inLanguage: input.locale === "en" ? "en" : "id",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function articleJsonLd(input: {
  locale: string;
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    inLanguage: input.locale === "en" ? "en" : "id",
    mainEntityOfPage: localePath(input.locale, input.path),
    author: {
      "@type": "Organization",
      name: `${SITE_NAME} Team`,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    image: absoluteUrl("/og.png"),
  };
}
