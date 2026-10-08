import { getDictionary } from "@/content";
import { SiteShell } from "@/components/site-shell";
import type { Locale } from "@/lib/i18n/locales";
import { getBusinessStructuredData, serializeStructuredData } from "@/lib/structured-data";
import { Hero } from "./hero";
import { ServicesIntro } from "./services-intro";
import { Process } from "./process";
import { QuoteCTA } from "./quote-cta";
import { ReviewsSection } from "@/components/reviews/reviews-section";
import styles from "./home.module.css";

export function HomePage({ locale }: { locale: Locale }) {
  const content = getDictionary(locale).home;
  const businessData = getBusinessStructuredData(locale);

  return (
    <SiteShell locale={locale} page="home">
      {businessData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(businessData) }} />}
      <div className={styles.home}>
        <Hero content={content.hero} locale={locale} />
        <ServicesIntro content={content.services} locale={locale} />
        <Process content={content.process} />
        <ReviewsSection content={content.reviews} locale={locale} />
        <QuoteCTA content={content.quote} locale={locale} />
      </div>
    </SiteShell>
  );
}
