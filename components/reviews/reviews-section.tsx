import type { Locale } from "@/lib/i18n/locales";
import type { ReviewsContent } from "@/content/types";
import { customerReviews, reviewSummary } from "@/content/reviews";
import { ReviewStars } from "./review-stars";
import { ReviewsCarousel } from "./reviews-carousel";
import styles from "./reviews.module.css";

export function ReviewsSection({ content, locale }: { content: ReviewsContent; locale: Locale }) {
  const rating = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(reviewSummary.rating);

  return (
    <section className={styles.section} aria-labelledby="reviews-heading">
      <div className={styles.summary}>
        <h2 id="reviews-heading">{content.heading}</h2>
        <div className={styles.ratingSummary}>
          <p className={styles.rating}><strong>{rating}</strong><span> / 5</span></p>
          <div>
            <ReviewStars rating={reviewSummary.rating} />
            <p className={styles.count}>{content.countLabel.replace("{count}", String(reviewSummary.count))}</p>
          </div>
        </div>
      </div>
      {customerReviews.length > 0 && <ReviewsCarousel reviews={customerReviews} content={content} locale={locale} />}
      <a className={styles.profileLink} href={reviewSummary.profileUrl} target="_blank" rel="noopener noreferrer">
        {content.profileLink}
        <span className={styles.srOnly}> ({content.newTab})</span>
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
