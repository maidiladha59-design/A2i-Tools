import type { ToolId } from "@/lib/tools/registry";
import type { Bilingual, ContentSection } from "@/content/types";
import type { ImageOutputFormat } from "@/lib/image/client";
import type { SizeUnit } from "@/lib/size";

export type LandingImageConfig = {
  mode: "auto" | "manual" | "target";
  targetValue?: number;
  targetUnit?: SizeUnit;
  format?: ImageOutputFormat;
};

export type LandingToolConfig = {
  image?: LandingImageConfig;
  pdfTarget?: { value: number; unit: SizeUnit };
  imagePdf?: { pageSize?: "auto" | "a4" };
  pdfImage?: { format?: "image/jpeg" | "image/png" };
};

export type LandingDefinition = {
  slug: string;
  toolId: ToolId;
  config?: LandingToolConfig;
  title: Bilingual<string>;
  description: Bilingual<string>;
  h1: Bilingual<string>;
  intro: Bilingual<string[]>;
  bullets: Bilingual<string[]>;
  sections: Bilingual<ContentSection[]>;
  faq: Bilingual<Array<{ q: string; a: string }>>;
  relatedTools: ToolId[];
};
