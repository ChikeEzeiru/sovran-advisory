"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ConditionalLink } from "@/components/ui/ConditionalLink";
import { isValidEmail } from "@/lib/email-address";
import {
  AssuranceMark,
  type AssuranceKind,
} from "@/components/ui/AssuranceMark";

const EASE = "cubic-bezier(0.65,0,0.35,1)";

const NAV_COLUMNS = [
  {
    heading: "Expertise",
    links: [
      { label: "Intelligence", href: "/expertise/intelligence" },
      { label: "Strategy", href: "/expertise/strategy" },
      { label: "Institutions", href: "/expertise/institutions" },
      {
        label: "Delivery",
        href: "/expertise/delivery",
      },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Leadership & Team", href: "/leadership" },
      { label: "Partners & Relationships", href: "/partnerships" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Perspectives", href: "/perspectives" },
      { label: "Events", href: "/events" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "Get in Touch", href: "/contact" },
      { label: "Lagos, Nigeria", href: "/contact" },
      { label: "Kigali, Rwanda", href: "/contact" },
      { label: "Accra, Ghana", href: "/contact" },
      { label: "Nairobi, Kenya", href: "/contact" },
    ],
  },
];

const ASSURANCE_MARKS: Array<{
  acronym: string;
  label: string;
  kind: AssuranceKind;
}> = [
  {
    acronym: "SIA",
    label: "Secure Information",
    kind: "information",
  },
  {
    acronym: "PDA",
    label: "Privacy & Data",
    kind: "privacy",
  },
  {
    acronym: "EIA",
    label: "Ethical Integrity",
    kind: "integrity",
  },
  {
    acronym: "QDA",
    label: "Quality Delivery",
    kind: "quality",
  },
];

function FooterNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <ConditionalLink
      href={href}
      className="group/link relative inline-flex overflow-hidden text-base max-md:text-sm max-md:leading-5 leading-6 text-text-tertiary transition-colors duration-380 hover:text-text-primary"
      style={{ transitionTimingFunction: EASE }}
    >
      <span
        className="transition-transform duration-380 group-hover/link:-translate-y-full motion-reduce:transition-none"
        style={{ transitionTimingFunction: EASE }}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute top-full left-0 transition-transform duration-380 group-hover/link:-translate-y-full motion-reduce:transition-none"
        style={{ transitionTimingFunction: EASE }}
      >
        {children}
      </span>
    </ConditionalLink>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [newsletterError, setNewsletterError] = useState("");

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();

    if (!isValidEmail(email)) {
      setNewsletterStatus("error");
      setNewsletterError("Enter a valid email address.");
      const emailInput = form.elements.namedItem("email");
      if (emailInput instanceof HTMLElement) emailInput.focus();
      return;
    }

    setNewsletterStatus("submitting");
    setNewsletterError("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = (await response.json()) as {error?: string};
      if (!response.ok) throw new Error(result.error || "Unable to subscribe.");

      form.reset();
      setNewsletterStatus("success");
    } catch (error) {
      setNewsletterStatus("error");
      setNewsletterError(
        error instanceof Error ? error.message : "Unable to subscribe. Please try again.",
      );
    }
  };

  useEffect(() => {
    const mark = markRef.current;
    const footer = footerRef.current;
    if (!mark || !footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        mark.style.animation =
          "sovran-rotate-once 3.8s cubic-bezier(0.33,0,0.2,1) forwards";
        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative flex min-h-190 flex-col items-center gap-8 overflow-hidden bg-neutral-950 pt-12 pb-16 text-text-secondary max-md:min-h-[1274px] max-md:gap-6 max-md:pb-13"
      data-theme="dark"
    >
      <div className="relative z-10 w-full border-t border-border-secondary" />

      <div className="relative z-10 flex w-full max-w-[1600px] items-start justify-between px-12 max-lg:flex-col max-lg:gap-8 max-md:gap-5 max-md:px-4">
        <div className="flex w-108 shrink-0 flex-col items-start gap-2 max-md:w-full">
          <h2 className="text-xl max-md:text-lg max-md:leading-7 font-semibold leading-7 text-text-primary">
            Stay ahead of changing markets
          </h2>
          <p className="text-base max-md:text-sm max-md:leading-5 leading-6 text-text-tertiary ">
            Get Sovran&apos;s latest analysis on markets, policy, investment and
            institutions across Africa.
          </p>
        </div>

        <form
          className="flex max-w-127 shrink-0 flex-col items-start gap-2 w-full"
          onSubmit={handleNewsletterSubmit}
          noValidate
        >
          <div className="flex w-full items-center gap-2 rounded-xs border border-border-primary bg-white/80 p-1.5 shadow-xs">
            <label htmlFor="footer-email" className="sr-only">
              Work email
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={254}
              required
              aria-invalid={newsletterStatus === "error"}
              aria-describedby="footer-newsletter-message"
              placeholder="name@company.com"
              className="min-w-0 flex-1 bg-transparent pr-3 pl-4 text-base max-md:text-sm max-md:leading-5 leading-6 text-text-primary outline-none placeholder:text-text-placeholder"
            />
            <Button
              type="submit"
              variant="secondary"
              size="md"
              showIcon
              className="shrink-0"
              disabled={newsletterStatus === "submitting"}
            >
              {newsletterStatus === "submitting" ? "Sending…" : "Subscribe"}
            </Button>
          </div>
          <label className="sr-only" aria-hidden="true">
            Website
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
          <p
            id="footer-newsletter-message"
            role={newsletterStatus === "error" ? "alert" : "status"}
            className={`text-xs leading-4.5 ${
              newsletterStatus === "error" ? "text-text-error-primary" : "text-text-tertiary"
            }`}
          >
            {newsletterStatus === "success"
              ? "Check your inbox to confirm your subscription."
              : newsletterStatus === "error"
                ? newsletterError
                : "Occasional insights from Sovran. Unsubscribe at any time."}
          </p>
        </form>
      </div>

      <div className="relative z-10 w-full border-t border-border-secondary" />

      <div className="relative z-10 flex w-full max-w-[1600px] items-start justify-between px-12 max-lg:flex-col max-lg:gap-12 max-md:gap-6 max-md:px-4">
        <div className="flex w-108 shrink-0 flex-col items-start gap-8 max-md:w-full">
          <ConditionalLink
            href="/"
            aria-label="Sovran Advisory home"
            className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
          >
            <div ref={markRef} className="size-16">
              <Image
                src="/sovran-footer-mark.svg"
                alt=""
                width={65}
                height={64}
                className="size-full"
              />
            </div>
          </ConditionalLink>

          <div className="flex w-full flex-col gap-3 text-base max-md:text-sm max-md:leading-5 leading-6">
            <p>
              We are an African advisory firm helping leaders navigate markets,
              policy and institutional complexity.
            </p>
          </div>

          <div
            className="grid w-full grid-cols-2 gap-x-6 gap-y-3 py-2 max-md:gap-y-6"
            aria-label="Sovran assurance standards"
          >
            {ASSURANCE_MARKS.map(({ acronym, label, kind }) => (
              <div key={acronym} className="flex min-w-0 items-center gap-2.5">
                <span className="flex size-10 shrink-0 items-center justify-center text-fg-brand-primary-alt max-md:size-8">
                  <AssuranceMark kind={kind} className="size-full" />
                </span>
                <span className="min-w-0 leading-none">
                  <span className="block text-xs font-semibold tracking-[0.14em] text-text-secondary">
                    {acronym}
                  </span>
                  <span className="mt-1 block text-xs leading-4 text-text-tertiary">
                    {label}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <nav
          aria-label="Footer"
          className="flex w-193.5 shrink-0 items-start gap-6 max-lg:w-full max-md:grid max-md:grid-cols-2 max-md:[&>*:last-child]:col-span-2"
        >
          {NAV_COLUMNS.map((column) => (
            <div
              key={column.heading}
              className="flex min-w-0 flex-1 flex-col items-start gap-4 overflow-hidden py-2"
            >
              <p className="text-sm max-md:text-xs max-md:leading-4 font-medium uppercase text-text-placeholder">
                {column.heading}
              </p>
              <div
                className={`flex w-full flex-col items-start gap-3 ${
                  column.heading === "Company" ? "max-md:gap-1.5" : ""
                }`}
              >
                {column.links.map((link) => (
                  <FooterNavLink
                    key={`${link.href}-${link.label}`}
                    href={link.href}
                  >
                    {link.label}
                  </FooterNavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="relative z-10 w-full border-t border-border-secondary" />

      <div className="relative z-10 flex w-full max-w-[1600px] items-start justify-between px-12 text-base max-md:text-sm max-md:leading-5 leading-6 max-md:flex-col max-md:items-center max-md:gap-3 max-md:px-4 max-md:text-center ">
        <p>© 2026 Sovran Advisory. All rights reserved</p>
        <div className="flex max-w-127 w-full min-w-0 items-start justify-end self-end gap-3 max-md:justify-center max-md:self-center">
          <FooterNavLink href="/legal">Legal</FooterNavLink>
          <span className="text-xl max-md:text-lg max-md:leading-7 font-medium leading-7.5">・</span>
          <FooterNavLink href="/privacy">Privacy Policy</FooterNavLink>
          <span className="text-xl max-md:text-lg max-md:leading-7 font-medium leading-7.5">・</span>
          <FooterNavLink href="/terms">Terms of Use</FooterNavLink>
        </div>
      </div>

      <Image
        src="/sovran-footer-wordmark.svg"
        alt=""
        width={1440}
        height={188}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 left-1/2 h-auto w-[calc(100%_-_6rem)] max-w-400 -translate-x-1/2 object-contain object-bottom opacity-75 max-md:bottom-0 max-md:w-full"
      />
    </footer>
  );
}
