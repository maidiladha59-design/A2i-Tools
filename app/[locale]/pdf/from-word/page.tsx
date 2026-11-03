import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ToolPage } from "@/components/tools/ToolPage";
import { DocxToPdf } from "@/components/tools/pdf/DocxToPdf";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.docxToPdf" });
  return buildMetadata({
    locale,
    path: "/pdf/from-word",
    title: t("title"),
    description: t("description"),
  });
}

export default async function DocxToPdfPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "docxToPdf" });

  return (
    <ToolPage
      locale={locale}
      toolId="docxToPdf"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <DocxToPdf />
    </ToolPage>
  );
}
