import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { test } from "node:test";
import ts from "typescript";

// Exercise the real TypeScript helpers in isolated environments. Never load .env
// or mutate the test runner's environment; no provider calls are possible here.
function harness(overrides = {}) {
  const env = {
    NODE_ENV: "production", SITE_URL: "https://vasky-renhold.no",
    NETLIFY: "true", CONTEXT: "production",
    SITE_DEPLOYMENT_ENV: "production", SITE_INDEXING_ENABLED: "true", ...overrides,
  };
  const cache = new Map();
  function load(filename) {
    if (cache.has(filename)) return cache.get(filename).exports;
    const loaded = { exports: {} };
    cache.set(filename, loaded);
    const compiled = ts.transpileModule(readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    const requireModule = specifier => {
      const base = specifier.startsWith("@/") ? path.resolve(specifier.slice(2)) : path.resolve(path.dirname(filename), specifier);
      const resolved = [base + ".ts", path.join(base, "index.ts")].find(existsSync);
      if (!resolved) throw new Error(`Unexpected SEO test import: ${specifier}`);
      return load(resolved);
    };
    vm.runInNewContext(compiled, {
      module: loaded, exports: loaded.exports, require: requireModule, process: { env }, URL,
    }, { filename });
    return loaded.exports;
  }
  return {
    config: load(path.resolve("lib/site-config.ts")),
    metadata: load(path.resolve("lib/metadata.ts")),
    structured: load(path.resolve("lib/structured-data.ts")),
    sitemap: load(path.resolve("app/sitemap.ts")).default,
    robots: load(path.resolve("app/robots.ts")).default,
  };
}

const pairs = [
  ["home", "/", "/en"], ["services", "/tjenester", "/en/services"],
  ["pricing", "/priser", "/en/pricing"], ["about", "/om-oss", "/en/about"],
  ["contact", "/kontakt", "/en/contact"], ["quote", "/tilbud", "/en/quote"],
  ["privacy", "/personvern", "/en/privacy"],
];
const origin = "https://vasky-renhold.no";
const absolute = route => origin + (route === "/" ? "" : route);
const plain = value => JSON.parse(JSON.stringify(value));

test("all 14 routes have unique metadata, self canonicals and reciprocal language alternates", () => {
  const { metadata } = harness();
  const titles = new Set();
  const descriptions = new Set();
  for (const [page, nb, en] of pairs) for (const [locale, route] of [["nb", nb], ["en", en]]) {
    const result = metadata.getPageMetadata(page, locale);
    assert.ok(result.title.includes("Vasky"));
    assert.ok(result.description.length > 30);
    titles.add(result.title);
    descriptions.add(result.description);
    assert.equal(result.alternates.canonical, absolute(route));
    assert.deepEqual(plain(result.alternates.languages), { nb: absolute(nb), en: absolute(en), "x-default": absolute(nb) });
    assert.deepEqual(plain(result.robots), { index: true, follow: true });
    const routeFile = locale === "nb"
      ? path.join("app/(norwegian)", route.slice(1), "page.tsx")
      : path.join("app/(english)", route.slice(1), "page.tsx");
    assert.ok(readFileSync(routeFile, "utf8").includes(`getPageMetadata("${page}", "${locale}")`));
  }
  assert.equal(titles.size, 14);
  assert.equal(descriptions.size, 14);
});

test("indexing is opt-in and development, previews and missing production settings stay noindex", () => {
  for (const env of [
    { SITE_INDEXING_ENABLED: undefined }, { SITE_INDEXING_ENABLED: "false" },
    { SITE_INDEXING_ENABLED: "TRUE" }, { SITE_URL: undefined },
    { NODE_ENV: "development" }, { NODE_ENV: "test" },
    { NETLIFY: undefined }, { NETLIFY: "false" },
    { CONTEXT: undefined }, { CONTEXT: "" }, { CONTEXT: "dev" }, { CONTEXT: "unknown" },
    { CONTEXT: "deploy-preview" }, { CONTEXT: "branch-deploy" },
    { VERCEL_ENV: "production", CONTEXT: "deploy-preview" },
  ]) {
    const h = harness(env);
    assert.equal(h.config.isSiteIndexingEnabled(), false);
    for (const [page] of pairs) for (const locale of ["nb", "en"]) {
      assert.deepEqual(plain(h.metadata.getPageMetadata(page, locale).robots), { index: false, follow: true });
    }
    assert.equal(h.sitemap().length, 0);
    assert.equal(h.robots().sitemap, undefined);
    assert.equal(h.robots().rules.allow, "/");
  }
});

test("Netlify production context is authoritative despite shared or stale platform flags", () => {
  for (const env of [
    {}, { SITE_DEPLOYMENT_ENV: undefined }, { SITE_DEPLOYMENT_ENV: "preview" },
    { VERCEL_ENV: "preview" }, { VERCEL_ENV: "development" },
  ]) {
    const h = harness(env);
    assert.equal(h.config.isSiteIndexingEnabled(), true);
    assert.equal(h.sitemap().length, 14);
    assert.equal(h.robots().sitemap, absolute("/sitemap.xml"));
    for (const [page] of pairs) for (const locale of ["nb", "en"]) {
      assert.equal(h.metadata.getPageMetadata(page, locale).robots.index, true);
    }
  }
});

test("previews preserve production canonicals, hreflang and structured identity while noindex", () => {
  for (const CONTEXT of ["deploy-preview", "branch-deploy"]) {
    const h = harness({ CONTEXT });
    for (const [page, nb, en] of pairs) for (const [locale, route] of [["nb", nb], ["en", en]]) {
      const metadata = h.metadata.getPageMetadata(page, locale);
      assert.equal(metadata.robots.index, false);
      assert.equal(metadata.alternates.canonical, absolute(route));
      assert.deepEqual(plain(metadata.alternates.languages), { nb: absolute(nb), en: absolute(en), "x-default": absolute(nb) });
    }
    assert.deepEqual(plain(h.structured.getBusinessStructuredData("nb")), plain(harness().structured.getBusinessStructuredData("nb")));
  }
});

test("SITE_URL normalizes the approved origin and rejects preview origins and malformed configuration", () => {
  for (const value of [origin, origin + "/", " " + origin + "/ "]) {
    assert.equal(harness({ SITE_URL: value }).config.absoluteSiteUrl("/priser"), absolute("/priser"));
  }
  for (const value of [
    "http://vasky-renhold.no", "http://localhost:3000", "https://example.netlify.app",
    "https://vasky-renhold.no/en", "https://vasky-renhold.no/?preview=1",
    "https://vasky-renhold.no/#fragment", "https://user:password@vasky-renhold.no",
    "https://vasky-renhold.no.evil.example", "not a URL",
  ]) assert.throws(() => harness({ SITE_URL: value }).config.getSiteUrl());
  const unset = harness({ SITE_URL: undefined });
  assert.equal(unset.metadata.getPageMetadata("home", "nb").alternates, undefined);
  assert.equal(unset.metadata.getPageMetadata("home", "nb").openGraph.url, undefined);
  assert.equal(unset.metadata.getPageMetadata("home", "nb").openGraph.images.length, 0);
  assert.equal(unset.structured.getBusinessStructuredData("nb"), undefined);
  for (const unsafe of ["//evil.example", "https://evil.example", "/\\evil.example", "/page?q=1", "/page#fragment"]) {
    assert.throws(() => harness().config.absoluteSiteUrl(unsafe));
  }
});

test("enabled sitemap contains exactly 14 public URLs with alternates and no invented dates", () => {
  const { sitemap, robots } = harness();
  const entries = plain(sitemap());
  assert.equal(entries.length, 14);
  assert.deepEqual(entries.map(entry => entry.url).sort(), pairs.flatMap(([, nb, en]) => [absolute(nb), absolute(en)]).sort());
  for (const entry of entries) {
    assert.ok(!entry.url.includes("/api/"));
    assert.equal(entry.lastModified, undefined);
    assert.equal(entry.changeFrequency, undefined);
    assert.equal(entry.priority, undefined);
    assert.ok(entries.some(other => other.url === entry.alternates.languages.nb));
    assert.ok(entries.some(other => other.url === entry.alternates.languages.en));
  }
  assert.equal(robots().sitemap, absolute("/sitemap.xml"));
  assert.deepEqual(plain(robots().rules), { userAgent: "*", allow: "/", disallow: "/api/" });
});

test("social metadata uses real asset dimensions and no invented X identity", () => {
  const { metadata } = harness();
  for (const [page] of pairs) for (const locale of ["nb", "en"]) {
    const result = metadata.getPageMetadata(page, locale);
    assert.equal(result.openGraph.title, result.title);
    assert.equal(result.openGraph.description, result.description);
    assert.equal(result.openGraph.siteName, "Vasky");
    assert.equal(result.openGraph.type, "website");
    assert.equal(result.openGraph.url, result.alternates.canonical);
    assert.equal(result.openGraph.locale, locale === "nb" ? "nb_NO" : "en_US");
    assert.equal(result.openGraph.alternateLocale, locale === "nb" ? "en_US" : "nb_NO");
    assert.equal(result.twitter.card, "summary_large_image");
    assert.equal(result.twitter.site, undefined);
    assert.equal(result.twitter.creator, undefined);
    const image = result.openGraph.images[0];
    const imageFile = new URL(image.url).pathname.slice(1);
    const png = readFileSync(path.join("public", imageFile));
    assert.equal(png.readUInt32BE(16), image.width);
    assert.equal(png.readUInt32BE(20), image.height);
    assert.ok(png.length < 5 * 1024 * 1024);
    assert.equal(result.twitter.images[0].url, image.url);
  }
});

test("business schema uses verified identity and three services without private or invented facts", () => {
  const { structured } = harness();
  let identity;
  for (const locale of ["nb", "en"]) {
    const data = plain(structured.getBusinessStructuredData(locale));
    identity ??= data["@id"];
    assert.equal(data["@id"], identity);
    assert.equal(data["@type"], "LocalBusiness");
    assert.equal(data.name, "Vasky");
    assert.equal(data.url, absolute("/"));
    assert.equal(data.email, "post@vasky-renhold.no");
    assert.equal(data.telephone, "+47 966 77 843");
    assert.equal(data.identifier.value, "937944632");
    assert.deepEqual(data.address, { "@type": "PostalAddress", postalCode: "1350", addressLocality: "Lommedalen", addressCountry: "NO" });
    assert.equal(data.areaServed, locale === "nb" ? "Oslo og nærliggende områder" : "Oslo and nearby areas");
    assert.deepEqual(data.hasOfferCatalog.itemListElement.map(offer => offer.itemOffered.name),
      locale === "nb" ? ["Husvask", "Flyttevask", "Vindusvask"] : ["Home cleaning", "Move-out cleaning", "Window cleaning"]);
    const forbidden = new Set(["streetAddress", "geo", "latitude", "longitude", "openingHours", "openingHoursSpecification", "priceRange", "aggregateRating", "review", "sameAs", "foundingDate", "numberOfEmployees", "award"]);
    function inspect(value) {
      assert.notEqual(value, null);
      assert.notEqual(value, undefined);
      if (value && typeof value === "object") for (const [key, child] of Object.entries(value)) {
        assert.ok(!forbidden.has(key), `Unexpected schema property ${key}`);
        inspect(child);
      }
    }
    inspect(data);
  }
  const hostile = { name: "</script><script>alert(1)</script>" };
  const serialized = structured.serializeStructuredData(hostile);
  assert.ok(!serialized.includes("<"));
  assert.deepEqual(JSON.parse(serialized), hostile);
});

test("price descriptions derive confirmed rates and preserve the VAT disclosure", () => {
  const { metadata } = harness();
  const nb = metadata.getPageMetadata("pricing", "nb").description;
  const en = metadata.getPageMetadata("pricing", "en").description;
  assert.ok(nb.includes("Husvask 499 kr/time") && nb.includes("vindusvask 500 kr/time") && nb.includes("inkl. MVA"));
  assert.ok(en.includes("Home cleaning 499 NOK/hour") && en.includes("window cleaning 500 NOK/hour") && en.includes("include VAT"));
});
