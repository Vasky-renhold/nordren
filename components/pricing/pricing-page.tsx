import { ButtonLink } from "@/components/button";
import { PageIntroduction } from "@/components/page-introduction";
import { QuoteCTA } from "@/components/home/quote-cta";
import sharedStyles from "@/components/home/home.module.css";
import editorialStyles from "@/components/about/about.module.css";
import { SiteShell } from "@/components/site-shell";
import { getDictionary } from "@/content";
import { pricingRates } from "@/content/pricing-data";
import type { ServiceScope } from "@/content/types";
import type { Locale } from "@/lib/i18n/locales";
import { routes } from "@/lib/i18n/routes";
import styles from "./pricing.module.css";

const kroner = (amount: number) => `${new Intl.NumberFormat("nb-NO").format(amount)} kr`;

function Scope({ content }: { content: ServiceScope }) {
  return (
    <div className={styles.scope}>
      <h3>{content.heading}</h3>
      <p className={styles.note}>{content.description}</p>
      <div className={styles.scopeGroups}>
        {content.groups.map((group) => (
          <div key={group.heading}>
            {content.groups.length > 1 && <h4>{group.heading}</h4>}
            <ul className={styles.list}>
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PricingPage({ locale }: { locale: Locale }) {
  const content = getDictionary(locale).pricing;
  const moveOut = content.moveOut;

  return (
    <SiteShell locale={locale} page="pricing">
      <div className={sharedStyles.home}>
        <PageIntroduction page="pricing" headingId="pricing-heading" imageAlt={content.imageAlt}>
          <p className={sharedStyles.eyebrow}>{content.intro.eyebrow}</p>
          <h1 id="pricing-heading" className={editorialStyles.heading}>{content.intro.heading}</h1>
          <p className={editorialStyles.introText}>{content.intro.description}</p>
          <p className={styles.note}>{content.vatNote}</p>
          <div className={editorialStyles.actions}>
            <ButtonLink href={routes.quote[locale]}>{content.intro.primaryAction}</ButtonLink>
          </div>
        </PageIntroduction>

        <section id="home" className={styles.section} aria-labelledby="home-price-heading">
          <div>
            <h2 id="home-price-heading">{content.home.heading}</h2>
            <p className={styles.rate}>{pricingRates.homeHourly} <span>{locale === "nb" ? "kr/time" : "NOK/hour"}</span></p>
          </div>
          <div className={styles.details}>
            <Scope content={content.home.scope} />
            <div>
              <h3>{content.home.timeHeading}</h3>
              <dl className={styles.estimates}>
                {content.home.estimates.map((estimate) => (
                  <div key={estimate.home}>
                    <dt>{estimate.home}</dt>
                    <dd><span>{estimate.area}</span><span>{estimate.time}</span></dd>
                  </div>
                ))}
              </dl>
              <p className={styles.note}>{content.home.timeNote}</p>
            </div>
          </div>
        </section>

        <section id="move-out" className={styles.section} aria-labelledby="move-out-price-heading">
          <div>
            <h2 id="move-out-price-heading">{moveOut.heading}</h2>
            <p className={styles.note}>{moveOut.description}</p>
          </div>
          <div className={styles.details}>
            <table className={styles.priceTable}>
              <caption>{moveOut.tableCaption}</caption>
              <thead>
                <tr><th scope="col">{moveOut.areaLabel}</th><th scope="col">{moveOut.priceLabel}</th></tr>
              </thead>
              <tbody>
                {pricingRates.moveOut.map((band) => (
                  <tr key={band.max}>
                    <th scope="row">{band.min === null ? `${moveOut.upTo} ${band.max}` : `${band.min}–${band.max}`} m²</th>
                    <td>{kroner(band.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Scope content={moveOut.scope} />
            <div>
              <h3>{moveOut.extrasHeading}</h3>
              <dl className={styles.extras}>
                {pricingRates.extras.map((extra) => (
                  <div key={extra.id}>
                    <dt>{moveOut.extraLabels[extra.id]}</dt>
                    <dd>{kroner(extra.price)} <span>{moveOut.units[extra.unit]}</span></dd>
                  </div>
                ))}
                <div>
                  <dt>{moveOut.furnishedLabel}</dt>
                  <dd>+{pricingRates.furnishedPercent}% <span>{moveOut.furnishedSuffix}</span></dd>
                </div>
              </dl>
            </div>
            <div className={styles.parking}>
              <h3>{moveOut.parkingHeading}</h3>
              <p className={styles.note}>{moveOut.parkingNote}</p>
            </div>
          </div>
        </section>

        <section id="window" className={styles.section} aria-labelledby="window-price-heading">
          <div>
            <h2 id="window-price-heading">{content.window.heading}</h2>
            <p className={styles.rate}>{kroner(pricingRates.windowHourly)} <span>{content.hourlyUnit}</span></p>
          </div>
          <div>
            <p>{content.window.description}</p>
            <ul className={styles.list}>
              {content.window.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>

        <QuoteCTA content={content.quote} locale={locale} />
      </div>
    </SiteShell>
  );
}
