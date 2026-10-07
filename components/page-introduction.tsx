import type { ReactNode } from "react";
import type { PageId } from "@/lib/i18n/routes";
import { PagePhotograph } from "@/components/page-photograph";
import styles from "./page-introduction.module.css";

export function PageIntroduction({
  page,
  headingId,
  imageAlt,
  children,
}: {
  page: Exclude<PageId, "home" | "privacy">;
  headingId: string;
  imageAlt: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.introduction} aria-labelledby={headingId}>
      <div className={styles.text}>{children}</div>
      <div className={styles.photograph}>
        <PagePhotograph page={page} alt={imageAlt} />
      </div>
    </section>
  );
}
