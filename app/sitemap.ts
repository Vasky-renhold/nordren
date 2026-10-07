import type { MetadataRoute } from "next";
import { routes } from "@/lib/i18n/routes";
import { locales } from "@/lib/i18n/locales";
import { absoluteSiteUrl, isSiteIndexingEnabled } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isSiteIndexingEnabled()) return [];

  return Object.values(routes).flatMap(pair => locales.map(locale => ({
    url: absoluteSiteUrl(pair[locale])!,
    alternates: {
      languages: {
        nb: absoluteSiteUrl(pair.nb)!,
        en: absoluteSiteUrl(pair.en)!,
        "x-default": absoluteSiteUrl(pair.nb)!,
      },
    },
  })));
}
