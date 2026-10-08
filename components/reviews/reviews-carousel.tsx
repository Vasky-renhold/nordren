"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { CustomerReview } from "@/content/reviews";
import type { ReviewsContent } from "@/content/types";
import type { Locale } from "@/lib/i18n/locales";
import { ReviewStars } from "./review-stars";
import styles from "./reviews.module.css";

export function ReviewsCarousel({ reviews, content, locale }: { reviews: readonly CustomerReview[]; content: ReviewsContent; locale: Locale }) {
  const listId = useId();
  const listRef = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState({ first: 1, last: 1, previous: false, next: false });

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    function updatePosition() {
      if (!list) return;
      const viewport = list.getBoundingClientRect();
      const visible = Array.from(list.children).flatMap((card, index) => {
        const rect = card.getBoundingClientRect();
        return rect.right > viewport.left + 1 && rect.left < viewport.right - 1 ? [index + 1] : [];
      });
      setPosition({
        first: visible[0] ?? 1,
        last: visible.at(-1) ?? 1,
        previous: list.scrollLeft > 1,
        next: list.scrollLeft + list.clientWidth < list.scrollWidth - 1,
      });
    }
    updatePosition();
    const observer = new ResizeObserver(updatePosition);
    observer.observe(list);
    list.addEventListener("scroll", updatePosition, { passive: true });
    return () => {
      observer.disconnect();
      list.removeEventListener("scroll", updatePosition);
    };
  }, [reviews]);

  function move(direction: number) {
    const list = listRef.current;
    const first = list?.children[0];
    const second = list?.children[1];
    if (!list || !first) return;
    const distance = second
      ? second.getBoundingClientRect().left - first.getBoundingClientRect().left
      : first.getBoundingClientRect().width;
    list.scrollBy({ left: direction * distance, behavior: "instant" });
  }

  const range = content.rangeLabel
    .replace("{first}", String(position.first))
    .replace("{last}", String(position.last))
    .replace("{total}", String(reviews.length));

  return (
    <div className={styles.carousel}>
      <ul id={listId} ref={listRef} className={styles.track} tabIndex={0} aria-label={content.carouselLabel} role="list"
        onKeyDown={event => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}>
        {reviews.map(review => (
          <li key={review.id} className={styles.card}>
            <figure>
              <p>
                <ReviewStars rating={review.rating} />
                <span className={styles.srOnly}>{content.ratingLabel.replace("{rating}", String(review.rating))}</span>
              </p>
              <blockquote lang={locale === "en" ? "en" : review.language} cite={review.sourceUrl}>
                <p>{locale === "en" ? review.translation : review.text}</p>
              </blockquote>
              <figcaption>
                <span className={styles.reviewer}>{review.reviewer}</span>
                <span>{review.service[locale]}</span>
                <time dateTime={review.date}>{new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${review.date}T00:00:00Z`))}</time>
                {locale === "en" && <span className={styles.translation}>{content.translationLabel}</span>}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className={styles.controls}>
        <p className={styles.count} role="status" aria-live="polite" aria-atomic="true">{range}</p>
        <div className={styles.buttons}>
          <button type="button" aria-label={content.previous} aria-controls={listId} disabled={!position.previous} onClick={() => move(-1)}><span aria-hidden="true">←</span></button>
          <button type="button" aria-label={content.next} aria-controls={listId} disabled={!position.next} onClick={() => move(1)}><span aria-hidden="true">→</span></button>
        </div>
      </div>
    </div>
  );
}
