import type { Locale } from "@/lib/i18n/locales";
import type { PageId } from "@/lib/i18n/routes";
import type { QuoteField, QuoteError, serviceOptions, frequencyOptions } from "@/lib/quote-validation";

export type PageContent = {
  heading: string;
  title: string;
  description: string;
};

type HomepageItem = {
  id: string;
  title: string;
  description: string;
};

type PageIntro = {
  eyebrow: string;
  heading: string;
  description: string;
};

type WorkingPrinciples = PageIntro & { items: readonly HomepageItem[] };

export type ReviewsContent = {
  heading: string;
  countLabel: string;
  profileLink: string;
  newTab: string;
  previous: string;
  next: string;
  carouselLabel: string;
  rangeLabel: string;
  ratingLabel: string;
  translationLabel: string;
};

export type HomeContent = {
  reviews: ReviewsContent;
  hero: {
    eyebrow: string;
    heading: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
    imageAlt: string;
  };
  services: {
    eyebrow: string;
    heading: string;
    description: string;
    items: readonly (Omit<HomepageItem, "id"> & {
      id: "home" | "move-out" | "window";
      imageAlt: string;
    })[];
  };
  process: {
    eyebrow: string;
    heading: string;
    steps: readonly [HomepageItem, HomepageItem, HomepageItem];
  };
  quote: {
    eyebrow: string;
    heading: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
  };
};

export type ServiceScope = {
  heading: string;
  description: string;
  groups: readonly { heading: string; items: readonly string[] }[];
};

export type ServicesContent = {
  imageAlt: string;
  intro: PageIntro;
  pricingAction: string;
  items: readonly {
    id: "home" | "move-out" | "window";
    title: string;
    description: string;
    scope: readonly string[];
    action: string;
  }[];
  choosing: { heading: string; description: string; action: string };
};

export type AboutContent = {
  imageAlt: string;
  intro: PageIntro & { secondaryAction: string };
  principles: WorkingPrinciples;
  quote: HomeContent["quote"];
};

export type PricingContent = {
  imageAlt: string;
  intro: PageIntro & { primaryAction: string };
  vatNote: string;
  hourlyUnit: string;
  home: {
    heading: string;
    scope: ServiceScope;
    timeHeading: string;
    timeNote: string;
    estimates: readonly { home: string; area: string; time: string }[];
  };
  moveOut: {
    heading: string;
    description: string;
    tableCaption: string;
    areaLabel: string;
    priceLabel: string;
    upTo: string;
    scope: ServiceScope;
    extrasHeading: string;
    extraLabels: Record<typeof import("./pricing-data").pricingRates.extras[number]["id"], string>;
    units: Record<"each" | "squareMetre" | "window", string>;
    furnishedLabel: string;
    furnishedSuffix: string;
    parkingHeading: string;
    parkingNote: string;
  };
  window: { heading: string; description: string; items: readonly string[] };
  quote: HomeContent["quote"];
};

export type ContactContent = {
  imageAlt: string;
  intro: PageIntro;
  quote: { heading: string; description: string; action: string };
};

export type QuoteContent = {
  imageAlt: string;
  intro: { eyebrow: string; heading: string; description: string };
  form: {
    heading: string;
    requiredNote: string;
    optional: string;
    groups: { contact: string; job: string; details: string };
    labels: Record<QuoteField, string>;
    serviceOptions: Record<typeof serviceOptions[number], string>;
    frequencyOptions: Record<typeof frequencyOptions[number], string>;
    choose: string;
    helpers: { details: string; timing: string };
    expectation: string;
    privacyNotice: string;
    privacyLink: string;
    honeypot: string;
    noScript: string;
    submit: string;
    pending: string;
    errorHeading: string;
    errors: Record<QuoteError, string>;
    success: string;
    failure: string;
  };
  help: { heading: string; contact: string; services: string };
};

export type PrivacyContent = {
  heading: string;
  authorityLink: string;
  sections: readonly {
    id: "privacy" | "information" | "purpose" | "delivery" | "retention" | "cookies" | "links" | "rights" | "contact" | "updates";
    heading: string;
    paragraphs: readonly string[];
    items?: readonly string[];
    note?: string;
  }[];
};

export type Dictionary = {
  business: {
    organizationLabel: string;
    phoneLabel: string;
    emailLabel: string;
    areaLabel: string;
    serviceArea: string;
    commercial: { heading: string; description: string; action: string };
  };
  quote: QuoteContent;
  privacy: PrivacyContent;
  contact: ContactContent;
  pricing: PricingContent;
  about: AboutContent;
  services: ServicesContent;
  home: HomeContent;
  placeholder: string;
  shell: {
    skipToContent: string;
    homeLabel: string;
    primaryNavigation: string;
    footerNavigation: string;
    footer: { homeLabel: string; quickLinksHeading: string };
    menu: string;
    navigation: Record<PageId, string>;
  };
  languageSwitcher: {
    label: string;
    languages: Record<Locale, { shortLabel: string; accessibleLabel: string }>;
  };
  pages: Record<PageId, PageContent>;
};
