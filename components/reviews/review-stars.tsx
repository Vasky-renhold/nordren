import styles from "./reviews.module.css";

export function ReviewStars({ rating }: { rating: number }) {
  return (
    <span className={styles.stars} aria-hidden="true">
      {[1, 2, 3, 4, 5].map(star => (
        <svg key={star} width="18" height="18" viewBox="0 0 24 24" fill={star <= rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.25" focusable="false">
          <path d="m12 3 2.78 5.63L21 9.54l-4.5 4.39 1.06 6.2L12 17.2l-5.56 2.93 1.06-6.2L3 9.54l6.22-.91L12 3Z" />
        </svg>
      ))}
    </span>
  );
}
