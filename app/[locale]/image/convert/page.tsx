import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ToolPage } from "@/components/tools/ToolPage";
import { ImageConverter } from "@/components/tools/image/ImageConverter";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.imageConvert" });
  return buildMetadata({
    locale,
    path: "/image/convert",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ImageConvertPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "imageConverter" });

  return (
    <ToolPage
      locale={locale}
      toolId="imageConvert"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <ImageConverter />
    </ToolPage>
  );
}
