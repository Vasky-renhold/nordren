import { getDictionary } from "@/content";
import { businessDetails, publicEmail } from "@/content/business";
import type { Locale } from "@/lib/i18n/locales";
import { routes } from "@/lib/i18n/routes";
import { absoluteSiteUrl } from "@/lib/site-config";

export function getBusinessStructuredData(locale: Locale) {
  const url = absoluteSiteUrl("/");
  if (!url) return undefined;
  const content = getDictionary(locale);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}/#business`,
    name: businessDetails.name,
    url,
    email: publicEmail,
    telephone: businessDetails.phone,
    logo: absoluteSiteUrl("/brand/vasky-logo.png"),
    identifier: {
      "@type": "PropertyValue",
      propertyID: "Norwegian organisation number",
      value: businessDetails.organizationNumber.replace(/\s/g, ""),
    },
    address: {
      "@type": "PostalAddress",
      postalCode: "1350",
      addressLocality: "Lommedalen",
      addressCountry: "NO",
    },
    areaServed: content.business.serviceArea,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: content.shell.navigation.services,
      itemListElement: content.services.items.map(service => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: `${absoluteSiteUrl(routes.services[locale])}#service-${service.id}`,
        },
      })),
    },
  };
}

export function serializeStructuredData(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
