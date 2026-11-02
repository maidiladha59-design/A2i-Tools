import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ToolPage } from "@/components/tools/ToolPage";
import { ImageCompressor } from "@/components/tools/image/ImageCompressor";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.imageCompress" });
  return buildMetadata({
    locale,
    path: "/image/compress",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ImageCompressPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "imageCompressor" });

  return (
    <ToolPage
      locale={locale}
      toolId="imageCompress"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <ImageCompressor />
    </ToolPage>
  );
}
