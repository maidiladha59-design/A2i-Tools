import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ToolPage } from "@/components/tools/ToolPage";
import { PdfOrganizer } from "@/components/tools/pdf/PdfOrganizer";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.pdfOrganize" });
  return buildMetadata({
    locale,
    path: "/pdf/organize",
    title: t("title"),
    description: t("description"),
  });
}

export default async function PdfOrganizePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pdfOrganizer" });

  return (
    <ToolPage
      locale={locale}
      toolId="pdfOrganize"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <PdfOrganizer />
    </ToolPage>
  );
}
