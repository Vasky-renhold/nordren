// SITE_URL remains the sole source of emitted absolute URLs. This constant only
// validates the owner-approved origin; it is never used as an unset-env fallback.
const approvedOrigin = "https://vasky-renhold.no";

export function getSiteUrl(): URL | undefined {
  const value = process.env.SITE_URL?.trim();
  if (!value) return undefined;

  const url = new URL(value);
  if (
    url.origin !== approvedOrigin || url.username || url.password ||
    url.pathname !== "/" || url.search || url.hash
  ) {
    throw new Error("SITE_URL must be https://vasky-renhold.no, optionally ending in /, without credentials, a path, query, or fragment.");
  }
  return url;
}

export function isSiteIndexingEnabled(): boolean {
  const siteUrl = getSiteUrl();
  // Production builds are also used for previews. Require an explicit deployment
  // designation and veto known preview contexts even if production flags leaked.
  return Boolean(siteUrl) && process.env.NODE_ENV === "production" &&
    process.env.SITE_DEPLOYMENT_ENV === "production" &&
    process.env.SITE_INDEXING_ENABLED === "true" &&
    (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production") &&
    (!process.env.CONTEXT || process.env.CONTEXT === "production");
}

export function absoluteSiteUrl(path: string): string | undefined {
  // Accept site paths only; never let a protocol-relative path escape the origin.
  if (!path.startsWith("/") || path.startsWith("//") || /[\\?#]/.test(path)) {
    throw new Error("Expected an absolute site path without a query, fragment, or backslash.");
  }
  const siteUrl = getSiteUrl();
  if (!siteUrl) return undefined;
  const url = new URL(path, siteUrl);
  if (url.origin !== siteUrl.origin) throw new Error("Site URL escaped the configured origin.");
  // Next.js normalizes an origin-only canonical/OG URL without a final slash.
  // Match that output in sitemaps and JSON-LD rather than emitting two spellings.
  return url.pathname === "/" ? url.origin : url.href;
}
