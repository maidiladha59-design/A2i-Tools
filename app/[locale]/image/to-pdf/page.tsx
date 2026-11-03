import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ToolPage } from "@/components/tools/ToolPage";
import { ImageToPdf } from "@/components/tools/pdf/ImageToPdf";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.imageToPdf" });
  return buildMetadata({
    locale,
    path: "/image/to-pdf",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ImageToPdfPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "imageToPdf" });

  return (
    <ToolPage
      locale={locale}
      toolId="imageToPdf"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <ImageToPdf />
    </ToolPage>
  );
}
