import type { Locale } from "./locales";

export type PageId = "home" | "services" | "pricing" | "about" | "contact" | "quote" | "privacy";

export const routes = {
  home: { nb: "/", en: "/en" },
  services: { nb: "/tjenester", en: "/en/services" },
  pricing: { nb: "/priser", en: "/en/pricing" },
  about: { nb: "/om-oss", en: "/en/about" },
  contact: { nb: "/kontakt", en: "/en/contact" },
  quote: { nb: "/tilbud", en: "/en/quote" },
  privacy: { nb: "/personvern", en: "/en/privacy" },
} as const satisfies Record<PageId, Record<Locale, string>>;
