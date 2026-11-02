import type { ToolId } from "@/lib/tools/registry";
import type { Bilingual, ContentSection } from "@/content/types";

export type BlogCategory = "guide" | "tips" | "format" | "privacy";

export type BlogPost = {
  slug: string;
  category: BlogCategory;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  relatedTools: ToolId[];
  title: Bilingual<string>;
  description: Bilingual<string>;
  intro: Bilingual<string[]>;
  sections: Bilingual<ContentSection[]>;
  conclusion: Bilingual<string[]>;
};
