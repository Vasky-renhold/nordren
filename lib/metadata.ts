import type { Metadata } from "next";
import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n/locales";
import { routes, type PageId } from "@/lib/i18n/routes";
import { absoluteSiteUrl, getSiteUrl, isSiteIndexingEnabled } from "@/lib/site-config";
import { socialImage } from "@/lib/social-image";

export function getLanguageAlternates(page: PageId) {
  const nb = absoluteSiteUrl(routes[page].nb);
  const en = absoluteSiteUrl(routes[page].en);
  if (!nb || !en) return undefined;
  return {
    nb,
    en,
    "x-default": nb,
  };
}

export function getPageMetadata(page: PageId, locale: Locale): Metadata {
  const { title, description } = getDictionary(locale).pages[page];
  const siteUrl = getSiteUrl();
  const canonical = absoluteSiteUrl(routes[page][locale]);
  const imageUrl = absoluteSiteUrl(socialImage.path);
  const images = imageUrl ? [{
    url: imageUrl,
    width: socialImage.width,
    height: socialImage.height,
    alt: socialImage.alt[locale],
  }] : [];

  return {
    title,
    description,
    robots: { index: isSiteIndexingEnabled(), follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Vasky",
      locale: locale === "nb" ? "nb_NO" : "en_US",
      alternateLocale: locale === "nb" ? "en_US" : "nb_NO",
      ...(canonical ? { url: canonical } : {}),
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map(image => ({ url: image.url, alt: image.alt })),
    },
    // Never let Next.js infer localhost or a preview host as the canonical domain.
    ...(siteUrl ? {
      metadataBase: siteUrl,
      alternates: {
        canonical,
        languages: getLanguageAlternates(page),
      },
    } : {}),
  };
}
