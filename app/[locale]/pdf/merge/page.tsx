import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ToolPage } from "@/components/tools/ToolPage";
import { PdfMerge } from "@/components/tools/pdf/PdfMerge";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.pdfMerge" });
  return buildMetadata({
    locale,
    path: "/pdf/merge",
    title: t("title"),
    description: t("description"),
  });
}

export default async function PdfMergePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pdfMerge" });

  return (
    <ToolPage
      locale={locale}
      toolId="pdfMerge"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <PdfMerge />
    </ToolPage>
  );
}
