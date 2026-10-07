import { SiteShell } from "@/components/site-shell";
import { getDictionary } from "@/content";
import { businessDetails, publicEmail } from "@/content/business";
import type { Locale } from "@/lib/i18n/locales";
import styles from "./privacy.module.css";

export function PrivacyPage({ locale }: { locale: Locale }) {
  const { privacy: content, business } = getDictionary(locale);

  return (
    <SiteShell locale={locale} page="privacy">
      <article className={styles.content} aria-labelledby="privacy-heading">
        <h1 id="privacy-heading">{content.heading}</h1>
        {content.sections.map(section => (
          <section key={section.id} aria-labelledby={`privacy-${section.id}`}>
            <h2 id={`privacy-${section.id}`}>{section.heading}</h2>
            {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            {section.items && <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul>}
            {section.note && <p>{section.note}</p>}
            {section.id === "rights" && (
              <p><a href="https://www.datatilsynet.no/rettigheter-og-plikter/den-registrertes-rettigheter/">{content.authorityLink}</a></p>
            )}
            {section.id === "contact" && (
              <address>
                {businessDetails.name}<br />
                {businessDetails.location}<br />
                {business.organizationLabel} {businessDetails.organizationNumber}<br />
                <a href={`mailto:${publicEmail}`}>{publicEmail}</a>
              </address>
            )}
          </section>
        ))}
      </article>
    </SiteShell>
  );
}
