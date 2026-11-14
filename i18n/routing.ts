import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["id", "en"],
  defaultLocale: "id",
  localePrefix: "always",
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
  },
  // Hreflang is emitted per page with a canonical x-default (/id) via
  // buildMetadata. The middleware header pointed x-default at "/", which
  // redirects, so it is disabled to avoid conflicting signals.
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
