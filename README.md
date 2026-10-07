# Vasky

Vasky's bilingual cleaning-company website uses Next.js App Router, React, TypeScript, and Tailwind CSS. The fourteen public routes cover home, services, pricing, about, contact, quotes, and privacy information.

## Development and checks

```sh
npm run dev
npm run lint
npx next typegen
npx tsc --noEmit
npm run build
node --test tests/*.test.mjs
git diff --check
```

Generate route types before standalone TypeScript checking on a fresh checkout. A fresh build may need network access for the existing Geist font download; fonts are self-hosted to visitors. Tests use Node's existing runner and TypeScript transpilation, without new packages or real email calls.

## Bilingual architecture

| Page | Norwegian | English |
| --- | --- | --- |
| Home | / | /en |
| Services | /tjenester | /en/services |
| Pricing | /priser | /en/pricing |
| About | /om-oss | /en/about |
| Contact | /kontakt | /en/contact |
| Quote | /tilbud | /en/quote |
| Privacy | /personvern | /en/privacy |

Norwegian Bokmål (`nb`) is the default and English (`en`) is secondary. Separate localized root layouts reuse `components/document.tsx`. `lib/i18n/routes.ts` maps equivalent pages; ordinary language-switch links load a new document without preserving form state. There is no language cookie or automatic browser-language redirect.

Route files select a page ID and locale and render shared page components. Dictionaries in `content/nb.ts` and `content/en.ts` hold page content and metadata under the typed `content/types.ts` contract. The client quote form receives only localized form content. The unused foundation component and placeholder entries are legacy infrastructure, not public pages.

## Production URLs and indexing

`lib/site-config.ts` centralizes URL validation and indexing. `SITE_URL` is the sole source of emitted absolute URLs. Set it to `https://vasky-renhold.no` in production and, when production canonical metadata is desired, previews. A final `/` is accepted. Other origins, credentials, paths, queries, and fragments fail explicitly. No localhost or preview-host canonicals are emitted. If unset, absolute metadata and business JSON-LD are omitted and indexing stays off.

Indexing requires **all** of the following:

```text
SITE_URL=https://vasky-renhold.no
SITE_DEPLOYMENT_ENV=production
SITE_INDEXING_ENABLED=true
NODE_ENV=production
```

Next.js supplies `NODE_ENV=production` for a production build; that alone never enables indexing. Set `SITE_DEPLOYMENT_ENV=preview` or leave it unset for non-production deployments. Keep `SITE_INDEXING_ENABLED=false` or unset throughout pre-launch verification, including on production. Non-production Vercel `VERCEL_ENV` and Netlify `CONTEXT` values veto indexing even if production flags leaked. Scope production flags to the actual production deployment. Other platforms must set the correct deployment designation explicitly. Do not commit environment files.

When indexing is disabled, pages emit `noindex, follow`, the sitemap is empty, and robots does not advertise it. Robots allows public HTML and rendering assets so crawlers can see noindex, and disallows `/api/`. A blanket robots block would hide the noindex directive. Indexing controls are not access controls; private previews need hosting authentication separately.

When enabled, pages emit `index, follow`, robots advertises `https://vasky-renhold.no/sitemap.xml`, and the sitemap contains exactly fourteen canonical public URLs with language alternates. No fabricated last-modified dates, priorities, or change frequencies are emitted.

Metadata, sitemap, robots, and JSON-LD are produced by the build. **Rebuild after changing these settings.** Do not reuse an indexing-enabled artifact on a preview: runtime environment changes do not regenerate static metadata. Hosting robots headers can impose additional restrictions and must be verified live.

## Search, sharing, and structured data

`lib/metadata.ts` supplies unique bilingual titles/descriptions, self canonicals, reciprocal `nb`/`en` alternates, and `x-default` pointing to the Norwegian equivalent. Canonicals use no trailing slash, including the root origin, matching Next.js output; visiting `/` is the same root URL. Open Graph uses `nb_NO`/`en_US`, reciprocal alternate locale, type `website`, and Vasky site name. Generic Twitter cards use `summary_large_image`; no X account is claimed. Pricing descriptions derive rates from shared pricing data.

`lib/structured-data.ts` emits `LocalBusiness` JSON-LD on both homepages, with a shared identity, the three localized services, verified contact details, organisation identifier, public postal code/locality/country, and service-area text. No street address, coordinates, hours, price range, ratings, reviews, or social identity is invented. Script serialization escapes `<`. Partial public address information may not qualify for every Google rich-result feature; do not publish private information to satisfy a validator.

`lib/social-image.ts` references the approved existing services photograph unchanged (1672 × 941). An approved dedicated 1200 × 630 Vasky image with the brand and tagline remains an asset handoff item. The default framework favicon was removed. Supply a suitable approved square Vasky favicon as `app/favicon.ico` or `app/icon.png` (48 × 48 or larger recommended), plus an Apple touch icon if desired. The wide wordmark was not distorted into an icon. No manifest is currently supplied.

## Presentation and business facts

The shared shell retains the approved skip link, header, native mobile disclosure, main landmark, footer, spacing, typography, and focus treatment. Local Next/Image assets retain descriptive localized alt text, responsive sizes, and reserved dimensions/aspect ratios; the hero is preloaded and below-fold images are lazy-loaded.

Services remain home cleaning, move-out cleaning, and window cleaning. Business enquiries are individually assessed, not a fourth standardized service. Existing services → pricing → quote paths and footer links expose the public routes without extra SEO links. The quote form sends server-validated enquiries through Resend and links to bilingual privacy information. No analytics or consent banner is installed.

Confirmed prices remain 499 kr/hour for home cleaning, 500 kr/hour for window cleaning, and the existing move-out bands, including VAT. Public contact is `post@vasky-renhold.no`; `website@vasky-renhold.no` remains the internal transactional sender. The internal npm package name `nordren` is not customer-facing branding.

## Checks after deployment

While indexing remains off, verify HTTPS, preferred-hostname redirects, all fourteen pages, canonical/language tags, response headers, sitemap, robots, JSON-LD, and social images. Check provider-added behavior and complete the approved icon/social asset handoff. Confirm canonical social identity URLs before considering `sameAs`.

Only after live verification should production indexing be explicitly enabled and the site rebuilt. Verify the new output before submitting the sitemap to Search Console. Use Google's Rich Results Test and Schema Markup Validator without inventing missing facts. Check live Core Web Vitals and social previews. These instructions do not perform deployment or activate indexing.
