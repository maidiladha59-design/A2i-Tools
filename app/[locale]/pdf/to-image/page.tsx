import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ToolPage } from "@/components/tools/ToolPage";
import { PdfToImage } from "@/components/tools/pdf/PdfToImage";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.pdfToImage" });
  return buildMetadata({
    locale,
    path: "/pdf/to-image",
    title: t("title"),
    description: t("description"),
  });
}

export default async function PdfToImagePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pdfToImage" });

  return (
    <ToolPage
      locale={locale}
      toolId="pdfToImage"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <PdfToImage />
    </ToolPage>
  );
}
