import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ToolPage } from "@/components/tools/ToolPage";
import { PdfCompressor } from "@/components/tools/pdf/PdfCompressor";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.pdfCompress" });
  return buildMetadata({
    locale,
    path: "/pdf/compress",
    title: t("title"),
    description: t("description"),
  });
}

export default async function PdfCompressPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pdfCompressor" });

  return (
    <ToolPage
      locale={locale}
      toolId="pdfCompress"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <PdfCompressor />
    </ToolPage>
  );
}
