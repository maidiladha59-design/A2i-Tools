import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ToolPage } from "@/components/tools/ToolPage";
import { ImageResizer } from "@/components/tools/image/ImageResizer";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.imageResize" });
  return buildMetadata({
    locale,
    path: "/image/resize",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ImageResizePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "imageResizer" });

  return (
    <ToolPage
      locale={locale}
      toolId="imageResize"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <ImageResizer />
    </ToolPage>
  );
}
