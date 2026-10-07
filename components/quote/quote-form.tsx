"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { Button } from "@/components/button";
import type { QuoteContent } from "@/content/types";
import type { Locale } from "@/lib/i18n/locales";
import { routes } from "@/lib/i18n/routes";
import { fieldLimits, frequencyOptions, quoteFields, serviceOptions, validateQuote, type QuoteErrors, type QuoteField, type QuoteValues } from "@/lib/quote-validation";
import styles from "./quote.module.css";

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function QuoteForm({ content, locale }: { content: QuoteContent["form"]; locale: Locale }) {
  // Keep submission disabled until JavaScript can intercept it; never fall back to a GET with personal data.
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [notice, setNotice] = useState("");
  const [attempt, setAttempt] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);
  const submitting = useRef(false);
  const submission = useRef({ payload: "", id: "" });
  useEffect(() => { if (attempt) resultRef.current?.focus(); }, [attempt]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(quoteFields.map(field => [field, String(data.get(field) ?? "")])) as QuoteValues;
    const localErrors = validateQuote(values);
    setErrors(localErrors);
    setNotice("");
    if (Object.keys(localErrors).length) { setAttempt(value => value + 1); return; }
    submitting.current = true;
    setPending(true);
    try {
      const payload = JSON.stringify({ ...values, locale, website: String(data.get("website") ?? "") });
      // Reuse the ID on unchanged retries if the provider accepted a request whose response was lost.
      if (submission.current.payload !== payload) submission.current = { payload, id: crypto.randomUUID() };
      const response = await fetch("/api/quote/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...JSON.parse(payload), submissionId: submission.current.id }),
        signal: AbortSignal.timeout(15000),
      });
      const result: unknown = await response.json();
      if (response.ok && result && typeof result === "object" && "status" in result && result.status === "sent") {
        setNotice(content.success);
        form.reset();
        submission.current = { payload: "", id: "" };
      } else if (response.status === 422 && result && typeof result === "object" && "errors" in result && result.errors && typeof result.errors === "object") {
        const serverErrors: QuoteErrors = {};
        for (const name of quoteFields) {
          const error = (result.errors as Record<string, unknown>)[name];
          if (error === "required" || error === "email" || error === "phone" || error === "number" || error === "choice" || error === "tooLong") serverErrors[name] = error;
        }
        if (Object.keys(serverErrors).length) setErrors(serverErrors);
        else setNotice(content.failure);
      } else {
        setNotice(content.failure);
      }
    } catch {
      setNotice(content.failure);
    } finally {
      submitting.current = false;
      setPending(false);
      setAttempt(value => value + 1);
    }
  }

  function field(name: QuoteField, type = "text", autoComplete?: string) {
    const required = ["name", "email", "service"].includes(name);
    const helper = name === "details" || name === "timing" ? content.helpers[name] : undefined;
    const error = errors[name];
    const props = {
      id: `quote-${name}`, name, required,
      "aria-invalid": error ? true as const : undefined,
      "aria-describedby": [helper ? `quote-${name}-help` : "", error ? `quote-${name}-error` : ""].filter(Boolean).join(" ") || undefined,
    };
    return (
      <div className={styles.field}>
        <label htmlFor={props.id}>{content.labels[name]}{required ? " *" : ` (${content.optional})`}</label>
        {helper && <p id={`quote-${name}-help`} className={styles.helper}>{helper}</p>}
        {name === "service" || name === "frequency" ? (
          <select {...props} defaultValue="">
            <option value="">{content.choose}</option>
            {name === "service"
              ? serviceOptions.map(value => <option key={value} value={value}>{content.serviceOptions[value]}</option>)
              : frequencyOptions.map(value => <option key={value} value={value}>{content.frequencyOptions[value]}</option>)}
          </select>
        ) : name === "details" ? <textarea {...props} rows={6} maxLength={fieldLimits[name]} />
          : <input {...props} type={type} autoComplete={autoComplete} maxLength={fieldLimits[name]} inputMode={name === "size" ? "decimal" : name === "rooms" ? "numeric" : undefined} />}
        {error && <p id={`quote-${name}-error`} className={styles.error}>{content.errors[error]}</p>}
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit} noValidate aria-labelledby="form-heading">
      <h2 id="form-heading">{content.heading}</h2>
      <p className={styles.helper}>{content.requiredNote}</p>
      <noscript><p className={styles.development}>{content.noScript}</p></noscript>
      <div hidden aria-hidden="true">
        <label htmlFor="quote-website">{content.honeypot}</label>
        <input id="quote-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {(Object.keys(errors).length > 0 || notice) && (
        <div ref={resultRef} tabIndex={-1} className={styles.result}>
          {Object.keys(errors).length > 0 ? <>
            <h3>{content.errorHeading}</h3>
            <ul>{quoteFields.filter(name => errors[name]).map(name => (
              <li key={name}><a href={`#quote-${name}`} onClick={() => document.getElementById(`quote-${name}`)?.focus()}>{content.labels[name]}: {content.errors[errors[name]!]}</a></li>
            ))}</ul>
          </> : <p>{notice}</p>}
        </div>
      )}
      <fieldset disabled={pending}>
        <legend>{content.groups.contact}</legend>
        <div className={styles.grid}>{field("name", "text", "name")}{field("email", "email", "email")}{field("phone", "tel", "tel")}</div>
      </fieldset>
      <fieldset disabled={pending}>
        <legend>{content.groups.job}</legend>
        <div className={styles.grid}>
          {field("service")}{field("property")}{field("size")}{field("rooms")}{field("location")}{field("frequency")}{field("timing")}
        </div>
      </fieldset>
      <fieldset disabled={pending}>
        <legend>{content.groups.details}</legend>
        {field("details")}
      </fieldset>
      <p className={styles.helper}>{content.expectation}</p>
      <p className={styles.helper}>
        {content.privacyNotice}{" "}
        <a className={styles.privacyLink} href={routes.privacy[locale]}>{content.privacyLink}</a>
      </p>
      <div><Button type="submit" disabled={!ready || pending}>{pending ? content.pending : content.submit}</Button></div>
      <p role="status" className={styles.helper}>{pending ? content.pending : ""}</p>
    </form>
  );
}
