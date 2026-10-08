import type { Locale } from "@/lib/i18n/locales";

export type CustomerReview = {
  id: string;
  reviewer: string;
  rating: 1 | 2 | 3 | 4 | 5;
  // Exact Norwegian source; the English text is an explicitly labeled translation.
  text: string;
  translation: string;
  date: string;
  service: Record<Locale, string>;
  language: Locale;
  sourceUrl: string;
};

// Owner-approved summary, confirmed against the public profile on 2026-10-08.
// Maintain this locally; no scraping or external requests occur for visitors.
export const reviewSummary = {
  rating: 5,
  count: 5,
  source: "Mittanbud",
  profileUrl: "https://mittanbud.no/bedrift/9727626",
} as const;

// Authentic reviews supplied by the owner from Mittanbud. Preserve source text.
export const customerReviews: readonly CustomerReview[] = [
  {
    id: "unnur-2026-09-11", reviewer: "Unnur", rating: 5, date: "2026-09-11",
    service: { nb: "Rengjøringstjenester – 140 m²", en: "Cleaning services – 140 m²" },
    text: "Veldig fornøyd med jobben. Marta hjalp til med både vasking og litt rydding, og gjorde akkurat det vi hadde avtalt. Pålitelig og effektiv. Jeg hadde gjerne valgt henne igjen og kan absolutt anbefale henne.",
    translation: "Very happy with the work. Marta helped with both cleaning and a little tidying, and did exactly what we had agreed. Reliable and efficient. I would gladly choose her again and can definitely recommend her.",
    language: "nb", sourceUrl: reviewSummary.profileUrl,
  },
  {
    id: "james-2026-09-02", reviewer: "James", rating: 5, date: "2026-09-02",
    service: { nb: "Flyttevask – 30 m²", en: "Move-out cleaning – 30 m²" },
    text: "Det ble vasket veldig godt. Kommunikasjonen var god. Punktlig og presist.",
    translation: "The cleaning was done very well. Communication was good. Punctual and precise.",
    language: "nb", sourceUrl: reviewSummary.profileUrl,
  },
  {
    id: "bjorn-aron-2026-08-31", reviewer: "Bjørn Aron", rating: 5, date: "2026-08-31",
    service: { nb: "Flyttevask – 60 m²", en: "Move-out cleaning – 60 m²" },
    text: "Utførte god vask, som ble godkjent av utleier på første forsøk. Fleksibel og god kommunikasjon om både overlevering av nøkler og hva som måtte vaskes. Anbefales til andre",
    translation: "Did a good clean, which was approved by the landlord on the first attempt. Flexible, with good communication about both handing over the keys and what needed cleaning. Recommended to others",
    language: "nb", sourceUrl: reviewSummary.profileUrl,
  },
  {
    id: "tord-2026-08-06", reviewer: "Tord", rating: 5, date: "2026-08-06",
    service: { nb: "Rengjøringstjenester – 103 m²", en: "Cleaning services – 103 m²" },
    text: "Hyggelig, hjelpsom og godt vasket!",
    translation: "Friendly, helpful, and a good clean!",
    language: "nb", sourceUrl: reviewSummary.profileUrl,
  },
  {
    id: "bjorn-olav-2026-07-27", reviewer: "Bjørn Olav", rating: 5, date: "2026-07-27",
    service: { nb: "Rengjøringstjenester – 120 m²", en: "Cleaning services – 120 m²" },
    text: "Enkel å kommunisere med, bra kvalitet på arbeid, og fleksibel. Tusen takk!",
    translation: "Easy to communicate with, good quality work, and flexible. Thank you very much!",
    language: "nb", sourceUrl: reviewSummary.profileUrl,
  },
];
