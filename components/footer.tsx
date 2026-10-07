import Image from "next/image";
import { getDictionary } from "@/content";
import { businessDetails, publicEmail } from "@/content/business";
import type { Locale } from "@/lib/i18n/locales";
import { routes, type PageId } from "@/lib/i18n/routes";

const footerPages = ["home", "services", "pricing", "about", "contact", "quote"] as const satisfies readonly PageId[];

export function Footer({ locale, page }: { locale: Locale; page: PageId }) {
  const { shell: content, business, home } = getDictionary(locale);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-columns">
          <div className="footer-brand">
            <a className="brand-link" href={routes.home[locale]} aria-label={content.homeLabel}>
              <Image
                src="/brand/vasky-logo.png"
                alt="Vasky"
                width={1774}
                height={887}
                sizes="7rem"
                className="brand-logo"
              />
            </a>
            <p className="footer-tagline">{home.hero.heading}</p>
          </div>
          <div className="footer-contact">
            <h2 className="footer-heading">{content.navigation.contact}</h2>
            <p><a href={businessDetails.phoneUri}>{businessDetails.phone}</a></p>
            <p><a href={`mailto:${publicEmail}`}>{publicEmail}</a></p>
            <p>{businessDetails.location}</p>
            <p>{business.organizationLabel} {businessDetails.organizationNumber}</p>
          </div>
          <nav aria-labelledby="footer-navigation-heading">
            <h2 id="footer-navigation-heading" className="footer-heading">{content.footer.quickLinksHeading}</h2>
            <ul className="footer-navigation">
              {footerPages.map((destination) => (
                <li key={destination}>
                  <a href={routes[destination][locale]} aria-current={destination === page ? "page" : undefined}>
                    {destination === "home" ? content.footer.homeLabel : content.navigation[destination]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© 2026 {businessDetails.name}</p>
          <ul className="footer-profiles">
            {businessDetails.profiles.map((profile) => (
              <li key={profile.label}><a href={profile.href}>{profile.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
