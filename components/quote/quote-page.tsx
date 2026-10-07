import { ButtonLink } from "@/components/button";
import { PageIntroduction } from "@/components/page-introduction";
import { SiteShell } from "@/components/site-shell";
import shared from "@/components/home/home.module.css";
import editorial from "@/components/about/about.module.css";
import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n/locales";
import { routes } from "@/lib/i18n/routes";
import { QuoteForm } from "./quote-form";
import styles from "./quote.module.css";

export function QuotePage({ locale }: { locale: Locale }) {
  const content = getDictionary(locale).quote;
  return (
    <SiteShell locale={locale} page="quote">
      <div className={shared.home}>
        <PageIntroduction page="quote" headingId="quote-page-heading" imageAlt={content.imageAlt}>
          <p className={shared.eyebrow}>{content.intro.eyebrow}</p>
          <h1 id="quote-page-heading" className={editorial.heading}>{content.intro.heading}</h1>
          <p className={editorial.introText}>{content.intro.description}</p>
        </PageIntroduction>
        <QuoteForm content={content.form} locale={locale} />
        <section className={styles.help} aria-labelledby="help-heading">
          <h2 id="help-heading">{content.help.heading}</h2>
          <div className={editorial.actions}>
            <ButtonLink href={routes.contact[locale]} variant="text">{content.help.contact}</ButtonLink>
            <ButtonLink href={routes.services[locale]} variant="text">{content.help.services}</ButtonLink>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
