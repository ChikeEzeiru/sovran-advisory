"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { XClose } from "@untitledui/icons";
import { Button } from "@/components/ui/Button";
import { isValidEmail } from "@/lib/email-address";
import { SOVRAN_MARKETS } from "@/lib/markets";

type FieldErrors = Partial<
  Record<"name" | "organisation" | "email" | "markets" | "message" | "phone", string>
>;

const inputClass =
  "w-full rounded-xs border border-border-primary bg-bg-primary px-3.5 py-2.5 text-base max-md:text-sm max-md:leading-5 text-text-primary shadow-xs outline-none placeholder:text-text-placeholder focus:border-border-brand focus:ring-2 focus:ring-border-brand/20 aria-invalid:border-border-error aria-invalid:ring-2 aria-invalid:ring-border-error/20";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <span id={id} className="text-sm max-md:text-xs max-md:leading-4 leading-5 text-text-error-primary">
      {message}
    </span>
  );
}

export function ContactForm() {
  const [contactMethod, setContactMethod] = useState("email");
  const [markets, setMarkets] = useState<string[]>([]);
  const [marketDraft, setMarketDraft] = useState("");
  const [marketsOpen, setMarketsOpen] = useState(false);
  const [activeMarketIndex, setActiveMarketIndex] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const validate = (formData: FormData) => {
    const errors: FieldErrors = {};
    const name = String(formData.get("name") ?? "").trim();
    const organisation = String(formData.get("organisation") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const markets = String(formData.get("markets") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();

    if (!name) errors.name = "Enter your name.";
    if (!organisation) errors.organisation = "Enter your organisation.";
    if (!isValidEmail(email)) errors.email = "Enter a valid work email.";
    if (!markets) errors.markets = "Tell us which market or markets are involved.";
    if (message.length < 20) errors.message = "Please provide a little more detail.";
    if (contactMethod === "phone" && !phone) errors.phone = "Enter the best number to reach you.";

    return errors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("markets", markets.join(", "));
    const errors = validate(formData);
    setFormError("");

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("idle");
      const firstInvalidField = Object.keys(errors)[0] as keyof FieldErrors;
      const target =
        firstInvalidField === "markets"
          ? form.querySelector<HTMLElement>("#contact-markets")
          : form.elements.namedItem(firstInvalidField);

      if (target instanceof HTMLElement) {
        window.requestAnimationFrame(() => target.focus());
      }
      return;
    }

    setFieldErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to send your enquiry.");

      form.reset();
      setContactMethod("email");
      setMarkets([]);
      setMarketDraft("");
      setMarketsOpen(false);
      setStatus("success");
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Unable to send your enquiry. Please try again.",
      );
      setStatus("error");
    }
  };

  const availableMarkets = SOVRAN_MARKETS.filter(
    (market) =>
      !markets.includes(market) &&
      market.toLocaleLowerCase().includes(marketDraft.trim().toLocaleLowerCase()),
  );

  const addMarket = (market: string) => {
    if (!SOVRAN_MARKETS.some((approvedMarket) => approvedMarket === market)) return;

    setMarkets((current) =>
      current.includes(market) || current.length >= 12 ? current : [...current, market],
    );
    setMarketDraft("");
    setMarketsOpen(false);
    setActiveMarketIndex(0);
    setFieldErrors((current) => ({ ...current, markets: undefined }));
  };

  const handleMarketKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setMarketsOpen(true);
      setActiveMarketIndex((current) =>
        availableMarkets.length === 0 ? 0 : (current + 1) % availableMarkets.length,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setMarketsOpen(true);
      setActiveMarketIndex((current) =>
        availableMarkets.length === 0
          ? 0
          : (current - 1 + availableMarkets.length) % availableMarkets.length,
      );
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (marketDraft.trim() && availableMarkets.length > 0) {
        addMarket(availableMarkets[activeMarketIndex] ?? availableMarkets[0]);
      }
      return;
    }

    if (event.key === ",") {
      event.preventDefault();
      return;
    }

    if (event.key === "Escape") {
      setMarketsOpen(false);
      return;
    }

    if (event.key === "Backspace" && !marketDraft && markets.length > 0) {
      setMarkets((current) => current.slice(0, -1));
    }
  };

  if (status === "success") {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="min-w-0 flex-1 border-t border-border-secondary pt-8 outline-none"
      >
        <p className="text-sm max-md:text-xs max-md:leading-4 font-semibold text-text-brand-tertiary">Enquiry received</p>
        <h2 className="mt-3 text-3xl max-md:text-2xl max-md:leading-8 font-medium leading-9.5 tracking-tight text-text-primary">
          Thank you for getting in touch.
        </h2>
        <p className="mt-4 max-w-xl text-lg max-md:text-base max-md:leading-6 leading-7 text-text-tertiary">
          A member of our team will review your enquiry and respond within two business days.
        </p>
        <Button variant="secondary" className="mt-8" onClick={() => setStatus("idle")}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      className="grid min-w-0 flex-1 grid-cols-2 gap-x-8 gap-y-5 max-md:w-full max-md:grid-cols-1"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="flex flex-col gap-1.5">
        <span className="text-sm max-md:text-xs max-md:leading-4 font-medium text-text-secondary">Name</span>
        <input
          name="name"
          type="text"
          autoComplete="name"
          maxLength={100}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          className={inputClass}
          placeholder="Your full name"
        />
        <FieldError id="contact-name-error" message={fieldErrors.name} />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm max-md:text-xs max-md:leading-4 font-medium text-text-secondary">Organisation</span>
        <input
          name="organisation"
          type="text"
          autoComplete="organization"
          maxLength={160}
          aria-invalid={Boolean(fieldErrors.organisation)}
          aria-describedby={fieldErrors.organisation ? "contact-organisation-error" : undefined}
          className={inputClass}
          placeholder="Your organisation"
        />
        <FieldError id="contact-organisation-error" message={fieldErrors.organisation} />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm max-md:text-xs max-md:leading-4 font-medium text-text-secondary">Work email</span>
        <input
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
          className={inputClass}
          placeholder="you@organisation.com"
        />
        <FieldError id="contact-email-error" message={fieldErrors.email} />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm max-md:text-xs max-md:leading-4 font-medium text-text-secondary">When do you need support?</span>
        <select name="timeframe" className={inputClass} defaultValue="">
          <option value="">Select a timeframe (optional)</option>
          <option value="Immediately">Immediately</option>
          <option value="Within one month">Within one month</option>
          <option value="Within three months">Within three months</option>
          <option value="Exploratory">Exploratory</option>
        </select>
      </label>

      <div className="col-span-2 flex flex-col gap-1.5 max-md:col-span-1">
        <label htmlFor="contact-markets" className="text-sm max-md:text-xs max-md:leading-4 font-medium text-text-secondary">
          Market(s) involved
        </label>
        <p id="contact-markets-help" className="text-sm max-md:text-xs max-md:leading-4 leading-5 text-text-quaternary">
          Select one or more markets where Sovran has established experience.
        </p>
        <div className="relative">
          <div
            className={`flex min-h-11 w-full flex-wrap items-center gap-1.5 rounded-xs border bg-bg-primary py-2 pr-3.5 pl-2.5 text-text-primary shadow-xs focus-within:ring-2 ${
              fieldErrors.markets
                ? "border-border-error ring-border-error/20"
                : "border-border-primary focus-within:border-border-brand focus-within:ring-border-brand/20"
            }`}
          >
            {markets.map((market) => (
              <span
                key={market}
                className="inline-flex items-center gap-0.5 rounded-xs border border-border-primary bg-bg-primary py-0.5 pr-1 pl-2.5 text-sm max-md:text-xs max-md:leading-4 font-medium leading-5 text-text-secondary"
              >
                {market}
                <button
                  type="button"
                  aria-label={`Remove ${market}`}
                  className="flex size-4 cursor-pointer items-center justify-center rounded-[3px] text-fg-quaternary transition-colors hover:bg-bg-primary-hover hover:text-fg-secondary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-current"
                  onClick={() =>
                    setMarkets((current) => current.filter((item) => item !== market))
                  }
                >
                  <XClose aria-hidden="true" className="size-3" />
                </button>
              </span>
            ))}
            <input name="markets" type="hidden" value={markets.join(", ")} />
            <input
              id="contact-markets"
              type="text"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={marketsOpen}
              aria-controls="contact-markets-list"
              aria-activedescendant={
                marketsOpen && availableMarkets.length > 0
                  ? `contact-market-option-${activeMarketIndex}`
                  : undefined
              }
              aria-invalid={Boolean(fieldErrors.markets)}
              aria-describedby={`contact-markets-help${
                fieldErrors.markets ? " contact-markets-error" : ""
              }`}
              maxLength={80}
              value={marketDraft}
              onFocus={() => setMarketsOpen(true)}
              onBlur={() => setMarketsOpen(false)}
              onChange={(event) => {
                setMarketDraft(event.target.value);
                setMarketsOpen(true);
                setActiveMarketIndex(0);
              }}
              onKeyDown={handleMarketKeyDown}
              className="min-w-36 flex-1 bg-transparent px-1 text-base max-md:text-sm max-md:leading-5 leading-6 text-text-primary outline-none placeholder:text-text-placeholder"
              placeholder={markets.length === 0 ? "Search markets" : "Add another market"}
            />
          </div>

          {marketsOpen && (
            <div
              id="contact-markets-list"
              role="listbox"
              aria-label="Available markets"
              className="absolute top-full right-0 left-0 z-20 mt-1 max-h-60 overflow-y-auto rounded-xs border border-border-secondary bg-bg-primary p-1 shadow-xs"
            >
              {availableMarkets.length > 0 ? (
                availableMarkets.map((market, index) => (
                  <button
                    key={market}
                    id={`contact-market-option-${index}`}
                    type="button"
                    role="option"
                    aria-selected="false"
                    className={`flex w-full cursor-pointer rounded-xs px-3 py-2 text-left text-sm leading-5 text-text-secondary transition-colors max-md:text-xs max-md:leading-4 ${
                      index === activeMarketIndex ? "bg-bg-primary-hover" : "hover:bg-bg-primary-hover"
                    }`}
                    onPointerDown={(event) => event.preventDefault()}
                    onPointerEnter={() => setActiveMarketIndex(index)}
                    onClick={() => addMarket(market)}
                  >
                    {market}
                  </button>
                ))
              ) : (
                <p className="px-3 py-2 text-sm max-md:text-xs max-md:leading-4 leading-5 text-text-quaternary">
                  No covered markets match your search.
                </p>
              )}
            </div>
          )}
        </div>
        <FieldError id="contact-markets-error" message={fieldErrors.markets} />
      </div>

      <label className="col-span-2 flex flex-col gap-1.5 max-md:col-span-1">
        <span className="text-sm max-md:text-xs max-md:leading-4 font-medium text-text-secondary">
          What are you working through?
          <span aria-hidden="true" className="text-text-brand-tertiary">
            *
          </span>
        </span>
        <textarea
          name="message"
          rows={5}
          maxLength={3000}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          className={`${inputClass} resize-y`}
          placeholder="Tell us the decision, what’s at stake, and where you need clarity"
        />
        <FieldError id="contact-message-error" message={fieldErrors.message} />
      </label>

      <label className="col-span-2 flex flex-col gap-1.5 max-md:col-span-1">
        <span className="text-sm max-md:text-xs max-md:leading-4 font-medium text-text-secondary">Preferred contact method</span>
        <select
          name="contactMethod"
          className={inputClass}
          value={contactMethod}
          onChange={(event) => setContactMethod(event.target.value)}
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="video">Video call</option>
        </select>
      </label>

      {contactMethod === "phone" && (
        <label className="flex flex-col gap-1.5">
          <span className="text-sm max-md:text-xs max-md:leading-4 font-medium text-text-secondary">Phone number</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={40}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
            className={inputClass}
            placeholder="Include country code"
          />
          <FieldError id="contact-phone-error" message={fieldErrors.phone} />
        </label>
      )}

      <label className="sr-only" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="col-span-2 max-md:col-span-1">
        {formError && (
          <p role="alert" className="mb-4 text-sm max-md:text-xs max-md:leading-4 leading-5 text-text-error-primary">
            {formError}
          </p>
        )}
        <p className="sr-only" aria-live="polite">
          {status === "submitting" ? "Sending your enquiry." : ""}
        </p>
        <Button type="submit" variant="primary" size="md" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending enquiry…" : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}
