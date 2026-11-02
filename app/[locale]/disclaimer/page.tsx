import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/pages/LegalPage";
import { DISCLAIMER } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.disclaimer" });
  return buildMetadata({
    locale,
    path: "/disclaimer",
    title: t("title"),
    description: t("description"),
  });
}

export default async function DisclaimerPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage locale={locale} doc={DISCLAIMER} path="/disclaimer" />;
}
