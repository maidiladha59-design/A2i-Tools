import type { Locale } from "@/i18n/routing";

export type Bilingual<T> = { id: T; en: T };

export function pickLocale<T>(value: Bilingual<T>, locale: string): T {
  return locale === "en" ? value.en : value.id;
}

export type ContentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ContentLocale = Locale;
