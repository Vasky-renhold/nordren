import Image from "next/image";
import styles from "./page-photograph.module.css";

const photographs = {
  services: "/images/vasky-tjenester.png",
  about: "/images/vasky-om-oss.png",
  pricing: "/images/vasky-priser.png",
  contact: "/images/vasky-kontakt.png",
  quote: "/images/vasky-tilbud.png",
} as const;

export function PagePhotograph({
  page,
  alt,
}: {
  page: keyof typeof photographs;
  alt: string;
}) {
  return (
    <Image
      src={photographs[page]}
      alt={alt}
      width={1672}
      height={941}
      sizes="(min-width: 75rem) 500px, (min-width: 56rem) 43vw, (min-width: 44rem) 640px, 92vw"
      loading="lazy"
      className={styles.photograph}
    />
  );
}
