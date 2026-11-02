import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ToolPage } from "@/components/tools/ToolPage";
import { ImageCropper } from "@/components/tools/image/ImageCropper";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.imageCrop" });
  return buildMetadata({
    locale,
    path: "/image/crop",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ImageCropPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "imageCropper" });

  return (
    <ToolPage
      locale={locale}
      toolId="imageCrop"
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <ImageCropper />
    </ToolPage>
  );
}
