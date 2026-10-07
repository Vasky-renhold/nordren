import { ButtonLink } from "@/components/button";
import { PageIntroduction } from "@/components/page-introduction";
import sharedStyles from "@/components/home/home.module.css";
import { SiteShell } from "@/components/site-shell";
import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n/locales";
import { routes } from "@/lib/i18n/routes";
import styles from "./services.module.css";

export function ServicesPage({ locale }: { locale: Locale }) {
  const { services: content, business } = getDictionary(locale);

  return (
    <SiteShell locale={locale} page="services">
      <div className={sharedStyles.home}>
        <PageIntroduction page="services" headingId="services-heading" imageAlt={content.imageAlt}>
          <p className={sharedStyles.eyebrow}>{content.intro.eyebrow}</p>
          <h1 id="services-heading" className={styles.heading}>{content.intro.heading}</h1>
          <p className={styles.introLead}>{content.intro.description}</p>
        </PageIntroduction>

        <div className={styles.overview}>
          {content.items.map((service, index) => (
            <section key={service.id} className={styles.service} aria-labelledby={`service-${service.id}`}>
              <div>
                <p className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</p>
                <h2 id={`service-${service.id}`}>{service.title}</h2>
              </div>
              <div className={styles.details}>
                <p>{service.description}</p>
                <ul className={styles.scope}>
                  {service.scope.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <div className={styles.actions}>
                  <ButtonLink href={routes.quote[locale]} variant="text">{service.action}</ButtonLink>
                  <ButtonLink href={`${routes.pricing[locale]}#${service.id}`} variant="text">{content.pricingAction}</ButtonLink>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className={styles.choosing} aria-labelledby="choosing-heading">
          <h2 id="choosing-heading">{content.choosing.heading}</h2>
          <div>
            <p className={styles.lead}>{content.choosing.description}</p>
            <div className={styles.actions}>
              <ButtonLink href={routes.quote[locale]} variant="secondary">{content.choosing.action}</ButtonLink>
            </div>
          </div>
        </section>
        <section className={styles.intro} aria-labelledby="commercial-heading">
          <h2 id="commercial-heading">{business.commercial.heading}</h2>
          <div>
            <p className={styles.lead}>{business.commercial.description}</p>
            <div className={styles.actions}>
              <ButtonLink href={routes.contact[locale]} variant="text">{business.commercial.action}</ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
