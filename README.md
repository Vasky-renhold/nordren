# Vasky

Vasky's bilingual cleaning-company website uses Next.js App Router, React, TypeScript, and Tailwind CSS. The fourteen public routes cover home, services, pricing, about, contact, quotes, and privacy information.

- Production: [vasky-renhold.no](https://vasky-renhold.no)
- Hosting: Netlify
- Source: [Vasky-renhold/nordren](https://github.com/Vasky-renhold/nordren)
- Languages: Norwegian Bokmål (`nb`, default) and English (`en`)

Production indexing is intended to be enabled. The corrected production deployment and sitemap have **not yet been verified live**.

## Development and checks

Clone the repository and install the locked dependencies:

```sh
git clone https://github.com/Vasky-renhold/nordren.git
cd nordren
npm ci
npm run dev
```

Use `.env.local` for local configuration; environment files are ignored by Git. Never commit secrets. Run the following checks before review or deployment:

```sh
npm run lint
npx next typegen
npx tsc --noEmit
npm run build
node --test tests/*.test.mjs
git diff --check
```

Generate route types before standalone TypeScript checking on a fresh checkout. A fresh build may need network access for the existing Geist font download; fonts are self-hosted to visitors. Tests use Node's existing runner and TypeScript transpilation, without new packages or real email calls.

`npm run start` serves a completed production build locally. SEO tests cover all 14 URLs, indexing contexts, canonicals, language alternates, social metadata, and JSON-LD. Quote-delivery tests mock Resend and cover validation, email construction, rejected requests, and provider failures. Tests do not load environment files.

## Bilingual architecture

| Page | Norwegian | English |
| --- | --- | --- |
| Home | `/` | `/en` |
| Services | `/tjenester` | `/en/services` |
| Pricing | `/priser` | `/en/pricing` |
| About | `/om-oss` | `/en/about` |
| Contact | `/kontakt` | `/en/contact` |
| Quote | `/tilbud` | `/en/quote` |
| Privacy | `/personvern` | `/en/privacy` |

Norwegian Bokmål (`nb`) is the default and English (`en`) is secondary. Separate localized root layouts reuse `components/document.tsx`. `lib/i18n/routes.ts` maps equivalent pages; ordinary language-switch links load a new document without preserving form state. There is no language cookie or automatic browser-language redirect.

Route files select a page ID and locale, supply metadata, and render shared page components. Dictionaries in `content/nb.ts` and `content/en.ts` hold page content and metadata under the typed `content/types.ts` contract. The client quote form receives localized form content and its locale.

## Environment configuration

| Variable | Purpose | Configuration |
| --- | --- | --- |
| `SITE_URL` | Absolute metadata, sitemap, and JSON-LD URLs | `https://vasky-renhold.no`; available during builds |
| `SITE_INDEXING_ENABLED` | Explicit indexing opt-in | Exact value `true` for production indexing; available during builds |
| `RESEND_API_KEY` | Server-side quote email delivery | Secret; available to the deployed server function and locally for real delivery |
| `NODE_ENV` | Next.js execution mode | Next.js uses `production` for production builds |
| `NETLIFY` | Netlify build identity | Automatically supplied by Netlify as `true` |
| `CONTEXT` | Netlify deployment context | Automatically supplied by Netlify for each build |

Configure user variables in Netlify project settings. Do not manually override Netlify's read-only variables or expose the email key through a `NEXT_PUBLIC_` variable.

## Production URLs and indexing

`lib/site-config.ts` centralizes URL validation and indexing. `SITE_URL` is the sole source of emitted absolute URLs. Set it to `https://vasky-renhold.no` in production and, when production canonical metadata is desired, previews. A final `/` is accepted. Other origins, credentials, paths, queries, and fragments fail explicitly. No localhost or preview-host canonicals are emitted. If unset, absolute metadata and business JSON-LD are omitted and indexing stays off.

Indexing requires **all** of the following:

```text
SITE_URL=https://vasky-renhold.no
SITE_INDEXING_ENABLED=true
NODE_ENV=production
NETLIFY=true
CONTEXT=production
```

Netlify's [read-only build variables](https://docs.netlify.com/build/configure-builds/environment-variables/#build-metadata) identify the platform and deployment context. Only `CONTEXT=production` satisfies the context check; `deploy-preview`, `branch-deploy`, `dev`, unknown or missing contexts remain noindex, even when user variables are shared across every context on the Free plan. Ordinary local builds and other hosts remain noindex unless these platform conditions are explicitly simulated for testing. `SITE_DEPLOYMENT_ENV` and `VERCEL_ENV` are not used by the current indexing logic. Set `SITE_INDEXING_ENABLED=false` or leave it unset when intentionally disabling indexing.

When indexing is disabled, pages emit `noindex, follow`, the sitemap is empty, and robots does not advertise it. Robots allows public HTML and rendering assets so crawlers can see noindex, and disallows `/api/`. A blanket robots block would hide the noindex directive. Indexing controls are not access controls; private previews need hosting authentication separately.

When enabled, pages emit `index, follow`, robots advertises `https://vasky-renhold.no/sitemap.xml`, and the sitemap contains exactly fourteen canonical public URLs with language alternates. No fabricated last-modified dates, priorities, or change frequencies are emitted.

Metadata, sitemap, robots, and JSON-LD are produced by the build. **Rebuild after changing these settings.** Do not reuse an indexing-enabled artifact on a preview: runtime environment changes do not regenerate static metadata. Hosting robots headers can impose additional restrictions and must be verified live.

## Search, sharing, and structured data

`lib/metadata.ts` supplies unique bilingual titles/descriptions, self canonicals, reciprocal `nb`/`en` alternates, and `x-default` pointing to the Norwegian equivalent. Canonicals use no trailing slash, including the root origin, matching Next.js output; visiting `/` is the same root URL. Open Graph uses `nb_NO`/`en_US`, reciprocal alternate locale, type `website`, and Vasky site name. Generic Twitter cards use `summary_large_image`; no X account is claimed. Pricing descriptions derive rates from shared pricing data.

`lib/structured-data.ts` emits `LocalBusiness` JSON-LD on both homepages, with a shared identity, logo, three localized services, contact details, organisation identifier, public postal code/locality/country, and service-area text. The schema contains no street address, coordinates, hours, price range, ratings, reviews, or `sameAs` claims. Script serialization escapes `<`. Add business facts only when confirmed.

`lib/social-image.ts` references the existing services photograph (1672 × 941). A dedicated approved sharing image remains a future asset update. `app/icon.png` supplies the site icon. No web manifest is present.

## Presentation and business facts

The shared shell contains a skip link, header, native mobile disclosure, main landmark, and footer. Local Next/Image assets use localized alt text, responsive sizes, and reserved dimensions/aspect ratios; the hero is preloaded and shared page photographs are lazy-loaded.

Services remain home cleaning, move-out cleaning, and window cleaning. Business enquiries are individually assessed. Existing services → pricing → quote paths and footer links expose the public routes. No analytics or consent banner is installed.

The JavaScript quote form posts to `/api/quote/validate`, using shared browser/server validation. The endpoint checks JSON input, limits request bodies to 32 KiB, rejects the honeypot, and validates the locale and submission ID before calling Resend. Submission IDs provide provider idempotency keys for unchanged retries. Success appears only after the server receives a provider email ID; delivery failures return a generic error. The form links to localized privacy information. Application-level rate limiting is not currently implemented. The contact page uses phone/email links and a quote link rather than a separate contact form.

Confirmed prices remain 499 kr/hour for home cleaning, 500 kr/hour for window cleaning, and the existing move-out bands, including VAT. Public contact is `post@vasky-renhold.no`; `website@vasky-renhold.no` remains the internal transactional sender. The internal npm package name `nordren` is not customer-facing branding.

Maintain business identity and public contacts in `content/business.ts`, shared rates in `content/pricing-data.ts`, and localized descriptions in both dictionaries. Quote emails go to the public inbox with the customer's email as Reply-To.

## GitHub and Netlify deployment

1. Create a focused branch in `Vasky-renhold/nordren`, make changes, and run the checks above. Review the diff for unintended changes and secrets.
2. When authorized to publish source changes, push the branch and open a GitHub pull request. Review its Netlify Deploy Preview if configured, including mobile layout, keyboard navigation, and localized form states.
3. Before an approved production merge or deploy, confirm Netlify is linked to the repository and check its configured production branch. There is no `netlify.toml` in the repository; hosting settings are managed in Netlify.
4. Use `npm run build` with Netlify's Next.js integration. Confirm required build variables and the server-function email key are available. Keep server support enabled for the quote endpoint; the application is not a static export.
5. Deploy the approved revision through the configured Git integration or trigger a production rebuild in Netlify. Confirm the deployed commit and successful build logs. Rebuild after environment changes.
6. Complete the checklist below. If a release fails verification, restore a known-good deployment and investigate before republishing.

The Netlify badge is disabled in Netlify project settings, as supplied by the project owner. This setting is managed outside the repository; keep it disabled when maintaining hosting configuration.

## Production SEO verification

The corrected production release remains pending live verification. After deploying it, check:

- [ ] HTTPS works at `https://vasky-renhold.no`. HTTP and alternate hostnames redirect to the preferred HTTPS origin without loops. Check redirects in Netlify; `next.config.ts` defines none.
- [ ] All 14 routes in the table return the intended pages successfully.
- [ ] `/robots.txt` returns `User-Agent: *`, `Allow: /`, `Disallow: /api/`, and `Sitemap: https://vasky-renhold.no/sitemap.xml`.
- [ ] `/sitemap.xml` returns valid XML with exactly 14 unique canonical `<loc>` URLs and reciprocal language alternates, with no API or preview URLs.
- [ ] Production source contains `index, follow`; response headers contain no conflicting `X-Robots-Tag: noindex`. Preview and branch pages must be noindex, their sitemap empty, and their robots file must omit the sitemap reference.
- [ ] Each page has its own canonical URL on the production origin. Preview canonicals still point to production when `SITE_URL` is configured.
- [ ] Language pairs have reciprocal `nb`/`en` hreflang links and `x-default` to the Norwegian page. Document language is `nb` or `en` as appropriate.
- [ ] Both homepages contain valid business JSON-LD. Validate with Google's Rich Results Test and Schema Markup Validator. Check the site icon and social image.
- [ ] Verify ownership of the production domain in Google Search Console. Once the live sitemap passes these checks, submit `/sitemap.xml`, inspect representative Norwegian and English URLs, and monitor indexing reports. Submission does not guarantee indexing.

If the production sitemap is empty, inspect the deployed revision and all five indexing conditions in the **build** environment. Confirm that a fresh production build was published; runtime changes do not regenerate existing static artifacts.
