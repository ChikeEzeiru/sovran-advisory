import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ConditionalLink } from "@/components/ui/ConditionalLink";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const FEATURED_STUDY = {
  title:
    "Building a smarter route into three fast-moving payments markets for Asterpay",
  image: "/images/case-studies/Case-study_Asterpay.avif",
  logo: "/logos/case_study_logos/Asterpay Logo.svg",
  logoAlt: "Asterpay",
  href: "/case-studies",
  metrics: [
    {
      value: "42",
      label: "regulators, industry bodies and potential partners mapped",
    },
    {
      value: "3",
      label:
        "simultaneous launches replaced by a controlled two-stage programme",
    },
  ],
};

const SUPPORTING_STUDIES = [
  {
    title:
      "Testing an infrastructure opportunity against freight corridor constraints",
    logo: "/logos/case_study_logos/Northline logo.svg",
    logoAlt: "Northline",
    href: "/case-studies",
    metrics: [
      { value: "2", label: "linked assets prioritised for initial investment" },
    ],
  },
  {
    title:
      "Launching two regional hubs through one coordinated delivery programme",
    logo: "/logos/case_study_logos/Axis logo.svg",
    logoAlt: "Axis",
    href: "/case-studies",
    metrics: [
      { value: "2", label: "new hubs launched with one delivery" },
      { value: "12 mo.", label: "regional transformation programme" },
    ],
  },
];

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <p className="flex items-baseline gap-1 text-base leading-6">
      <span className="shrink-0 font-semibold text-text-secondary">
        {value}
      </span>
      <span className="text-text-tertiary">{label}</span>
    </p>
  );
}

export function CaseStudiesSection() {
  return (
    <section
      aria-labelledby="case-studies-heading"
      className="bg-utility-neutral-100 py-20 max-md:py-12"
    >
      <div className="mx-auto flex w-full max-w-400 flex-col gap-16 px-12 max-md:gap-12 max-md:px-4">
        <div className="grid grid-cols-2 items-start gap-4 max-md:grid-cols-1 max-md:gap-3">
          <div className="flex min-w-0 flex-col items-start gap-2 max-md:gap-1.5">
            <SectionEyebrow>Case Studies</SectionEyebrow>
            <h2
              id="case-studies-heading"
              className="max-w-xl text-4xl font-medium leading-11 tracking-tight text-text-secondary"
            >
              Practical outcomes for complex challenges.
            </h2>
          </div>

          <div className="flex min-w-0 flex-col items-start gap-5 max-md:gap-4">
            <p className="max-w-2xl text-xl font-normal leading-7.5 text-text-tertiary">
              From entering new markets to delivering complex programmes, our
              work brings together the expertise each challenge requires.
            </p>
            <Button href="/case-studies" variant="primary" size="lg">
              View all Case Studies
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          <article className="col-span-2 flex min-w-0 flex-col gap-2 max-md:col-span-1">
            <ConditionalLink
              href={FEATURED_STUDY.href}
              className="group/featured flex min-w-0 items-center gap-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              <span className="relative h-9 w-10.5 shrink-0 overflow-hidden rounded-xs">
                <Image
                  src={FEATURED_STUDY.logo}
                  alt={FEATURED_STUDY.logoAlt}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </span>
              <h3 className="text-xl font-medium leading-7.5 tracking-tight text-text-secondary group-hover/featured:text-text-brand-secondary max-md:leading-7">
                {FEATURED_STUDY.title}
              </h3>
            </ConditionalLink>

            <ConditionalLink
              href={FEATURED_STUDY.href}
              aria-label={FEATURED_STUDY.title}
              className="relative aspect-10/3 w-full overflow-hidden rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current max-md:aspect-auto max-md:h-[286px]"
            >
              <Image
                src={FEATURED_STUDY.image}
                alt=""
                fill
                unoptimized
                sizes="(min-width: 1600px) 1504px, (min-width: 768px) calc(100vw - 96px), calc(100vw - 48px)"
                className="object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-black/20"
              />
            </ConditionalLink>

            <div className="flex items-start justify-between gap-8 px-2 pt-3 pb-5 max-md:flex-col max-md:gap-2 max-md:pt-2 max-md:pb-4">
              {FEATURED_STUDY.metrics.map((metric) => (
                <Metric key={metric.label} {...metric} />
              ))}
            </div>
          </article>

          {SUPPORTING_STUDIES.map((study) => (
            <article
              key={study.logoAlt}
              className="flex min-w-0 flex-col gap-2"
            >
              <ConditionalLink
                href={study.href}
                className="group/supporting relative flex h-64 flex-col overflow-hidden rounded-xs p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
              >
                <Image
                  src="/images/case-studies/case-study-card-texture.png"
                  alt=""
                  fill
                  unoptimized
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover opacity-80"
                />
                <div className="relative z-10 flex min-w-0 items-start gap-3 py-2">
                  <span className="relative h-10 w-12 shrink-0 overflow-hidden rounded-xs">
                    <Image
                      src={study.logo}
                      alt={study.logoAlt}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </span>
                  <h3 className="text-xl font-medium leading-7.5 tracking-tight text-text-primary-on-brand">
                    {study.title}
                  </h3>
                </div>
              </ConditionalLink>

              <div className="flex items-start justify-between gap-6 px-2 pt-3 pb-5 max-lg:flex-col max-lg:gap-2 max-md:pt-2 max-md:pb-4">
                {study.metrics.map((metric) => (
                  <Metric key={metric.label} {...metric} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
