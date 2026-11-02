import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ToolPage } from "@/components/tools/ToolPage";
import { PdfReducer } from "@/components/tools/pdf/PdfReducer";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.pdfReduce" });
  return buildMetadata({
    locale,
    path: "/pdf/reduce",
    title: t("title"),
    description: t("description"),
  });
}

export default async function PdfReducePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pdfReducer" });

  return (
    <ToolPage
      locale={locale}
      toolId="pdfReduce"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <PdfReducer />
    </ToolPage>
  );
}
