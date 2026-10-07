import type { MetadataRoute } from "next";
import { absoluteSiteUrl, isSiteIndexingEnabled } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    // Crawlers must reach public HTML to read noindex during pre-launch. Blocking
    // everything here would hide that directive and can leave URLs indexed.
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    ...(isSiteIndexingEnabled() ? { sitemap: absoluteSiteUrl("/sitemap.xml") } : {}),
  };
}
