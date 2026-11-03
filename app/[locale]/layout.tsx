import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "../globals.css";

import { routing } from "@/i18n/routing";
import { ADSENSE_CLIENT, SITE_NAME, SITE_URL } from "@/lib/config";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { ConsentProvider } from "@/components/ui/Consent";
import { ToolHandoffProvider } from "@/lib/tools/handoff";
import { AdSenseScript } from "@/components/ads/AdSlot";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1015" },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta.home" });

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title: {
      default: t("title"),
      template: "%s",
    },
    description: t("description"),
    verification: {
  google: "jdCdifSniUsVWBxN61HDDFZp3X14hySzl4jKqrJgOI0",
},
    manifest: "/manifest.webmanifest",
    icons: {
      icon: "/icon.svg",
      apple: "/icon.svg",
    },
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },
    appleWebApp: {
      capable: true,
      title: SITE_NAME,
      statusBarStyle: "default",
    },
    ...(ADSENSE_CLIENT
      ? { other: { "google-adsense-account": ADSENSE_CLIENT } }
      : {}),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable}`}
    >
      <body className="min-h-dvh bg-canvas font-sans text-ink antialiased">
        <ThemeProvider>
          <NextIntlClientProvider>
            <ToastProvider>
              <ConsentProvider>
                <ToolHandoffProvider>
                  <a
                    href="#main-content"
                    className="sr-only z-[200] rounded-full bg-ink px-4 py-2 text-sm font-bold text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
                  >
                    {t("skipToContent")}
                  </a>
                  <AdSenseScript />
                  <div className="flex min-h-dvh flex-col">
                    <Header />
                    <main id="main-content" className="flex-1">
                      {children}
                    </main>
                    <Footer />
                  </div>
                </ToolHandoffProvider>
              </ConsentProvider>
            </ToastProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
