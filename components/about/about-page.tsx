import { ButtonLink } from "@/components/button";
import { PageIntroduction } from "@/components/page-introduction";
import { QuoteCTA } from "@/components/home/quote-cta";
import sharedStyles from "@/components/home/home.module.css";
import { SiteShell } from "@/components/site-shell";
import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n/locales";
import { routes } from "@/lib/i18n/routes";
import styles from "./about.module.css";

export function AboutPage({ locale }: { locale: Locale }) {
  const { about: content, business } = getDictionary(locale);

  return (
    <SiteShell locale={locale} page="about">
      <div className={sharedStyles.home}>
        <PageIntroduction page="about" headingId="about-heading" imageAlt={content.imageAlt}>
          <p className={sharedStyles.eyebrow}>{content.intro.eyebrow}</p>
          <h1 id="about-heading" className={styles.heading}>{content.intro.heading}</h1>
          <p className={styles.introText}>{content.intro.description}</p>
          <p className={styles.notice}>{business.serviceArea}</p>
          <div className={styles.actions}>
            <ButtonLink href={routes.services[locale]} variant="text">{content.intro.secondaryAction}</ButtonLink>
          </div>
        </PageIntroduction>

        <section className={styles.editorial} aria-labelledby="principles-heading">
          <div>
            <p className={sharedStyles.eyebrow}>{content.principles.eyebrow}</p>
            <h2 id="principles-heading">{content.principles.heading}</h2>
            <p className={sharedStyles.description}>{content.principles.description}</p>
          </div>
          <dl className={styles.principles}>
            {content.principles.items.map((item) => (
              <div key={item.id}>
                <dt>{item.title}</dt>
                <dd>{item.description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <QuoteCTA content={content.quote} locale={locale} />
      </div>
    </SiteShell>
  );
}
