import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { InternalPageHero } from "@/components/sections/InternalPageHero";
import { ExpertiseWhyUsSection } from "@/components/sections/ExpertiseWhyUsSection";
import { ConditionalLink } from "@/components/ui/ConditionalLink";
import { ButtonVisual } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Strategy, policy, technology and communications expertise for consequential decisions in complex markets.",
};

const PRACTICES = [
  {
    title: "Intelligence",
    copy: "See the signals, constraints and opportunities that matter before you commit.",
    href: "/expertise/intelligence",
    image: "/images/services/sovran photo - Intelligence.avif",
  },
  {
    title: "Strategy",
    copy: "Choose a route to market, investment or growth that fits the situation.",
    href: "/expertise/strategy",
    image: "/images/services/sovran photo - comms and stakeholder eng.avif",
  },
  {
    title: "Institutions",
    copy: "Work with the regulators, partners and public systems that shape the outcome.",
    href: "/expertise/institutions",
    image: "/images/services/sovran photo - policy and govt relations.avif",
  },
  {
    title: "Delivery",
    copy: "Turn decisions into coordinated programmes, operating models and measurable progress.",
    href: "/expertise/delivery",
    image: "/images/services/sovran photo - digital and tech advisory 2.avif",
  },
];

const WORKING_PRINCIPLES = [
  {
    title: "See the whole picture",
    copy: "We always look beyond the immediate brief to understand what is shaping the decision.",
  },
  {
    title: "Bring the right disciplines together",
    copy: "Teams are built around the problem, rather than working within fixed departmental boundaries.",
  },
  {
    title: "Stay close to the work",
    copy: "Our advice is designed to help clients act, not simply describe what should change.",
  },
];

const CASE_STUDIES = [
  {
    title:
      "Building a smarter route into three fast-moving payments markets for Asterpay",
    href: "/case-studies/payments-entry",
    image: "/images/case-studies/Case-study_Asterpay.avif",
    logo: "/logos/case_study_logos/Asterpay Logo.svg",
    logoAlt: "Asterpay",
    metric: "42",
    outcome: "regulators, industry bodies and potential partners mapped",
  },
  {
    title:
      "Testing an infrastructure opportunity against freight corridor constraints",
    href: "/case-studies/infrastructure-investment",
    image: "/images/case-studies/case-study-card-texture.png",
    logo: "/logos/case_study_logos/Northline logo.svg",
    logoAlt: "Northline Capital",
    metric: "2",
    outcome: "linked assets prioritised for initial investment",
  },
  {
    title:
      "Launching two regional hubs through one coordinated delivery programme",
    href: "/case-studies/logistics-expansion",
    image: "/images/case-studies/case-study-card-texture.png",
    logo: "/logos/case_study_logos/Axis logo.svg",
    logoAlt: "Axis Freight",
    metric: "2",
    outcome: "new hubs launched with one delivery programme",
  },
];

export default function ExpertisePage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <InternalPageHero
          eyebrow="Our Expertise"
          title="Advice built around the decisions that matter."
          intro="We work across strategy, policy, technology and communications to help leaders understand complex environments, make informed choices and move with confidence."
          align="center"
        />

        <section aria-labelledby="disciplines-heading" className="py-20 max-md:py-16">
          <div className="mx-auto flex w-full max-w-400 flex-col gap-16 px-12 max-md:gap-10 max-md:px-4">
            <div className="flex max-w-3xl flex-col gap-4">
              <h2
                id="disciplines-heading"
                className="text-4xl font-medium leading-11 tracking-tight text-text-secondary max-md:text-3xl max-md:leading-9"
              >
                Different disciplines, one view of the problem.
              </h2>
              <p className="text-xl leading-7.5 text-text-tertiary max-md:text-base max-md:leading-6">
                Clients rarely come to us with problems that fit neatly into one
                category. We bring together strategy, policy, technology and
                communications to address each challenge in context.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 max-lg:grid-cols-1">
              {PRACTICES.map((practice) => (
                <ConditionalLink
                  key={practice.href}
                  href={practice.href}
                  className="group/service-card flex min-w-0 flex-col gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
                >
                  <div className="relative h-95 overflow-hidden rounded-xs bg-bg-quaternary max-sm:h-64">
                    <Image
                      src={practice.image}
                      alt=""
                      fill
                      unoptimized
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover/service-card:scale-105 motion-reduce:transition-none"
                    />
                  </div>
                  <div className="flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start max-sm:gap-3">
                    <div className="flex max-w-108 min-w-0 flex-col gap-2">
                      <h3 className="text-2xl font-medium leading-8 tracking-tight text-text-secondary">
                        {practice.title}
                      </h3>
                      <p className="text-lg leading-7 text-text-secondary max-md:text-base max-md:leading-6">
                        {practice.copy}
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 text-base font-semibold leading-6 text-text-brand-tertiary transition-colors duration-150 group-hover/service-card:text-text-brand-secondary">
                      <ButtonVisual size="lg" interaction="service-card">
                        Explore {practice.title}
                      </ButtonVisual>
                    </span>
                  </div>
                </ConditionalLink>
              ))}
            </div>
          </div>
        </section>

        <ExpertiseWhyUsSection />

        <section
          aria-labelledby="how-we-work-heading"
          className="bg-utility-neutral-100 py-20 max-md:py-16"
        >
          <div className="mx-auto flex w-full max-w-400 flex-col gap-16 px-12 max-md:gap-10 max-md:px-4">
            <div className="flex max-w-225 flex-col items-start gap-6">
              <div className="flex flex-col items-start gap-2">
                <SectionEyebrow>How We Work</SectionEyebrow>
                <h2
                  id="how-we-work-heading"
                  className="text-4xl font-medium leading-11 tracking-tight text-text-secondary max-md:text-3xl max-md:leading-9"
                >
                  Working through complexity
                </h2>
              </div>
              <p className="text-xl leading-7.5 text-text-tertiary max-md:text-base max-md:leading-6">
                We start by studying the environment around the question: the
                market, institutions, stakeholders and constraints. From there,
                we work with clients to determine what matters, what is possible
                and what should happen next.
              </p>
            </div>

            <div className="relative aspect-56/13 overflow-hidden rounded-xs bg-bg-quaternary max-sm:aspect-video">
              <Image
                src="/images/expertise/expertise how we work.avif"
                alt="A multidisciplinary team working together around a table."
                fill
                unoptimized
                sizes="(min-width: 1600px) 1504px, (min-width: 768px) calc(100vw - 96px), calc(100vw - 48px)"
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-3 max-md:grid-cols-1 max-md:gap-6">
              {WORKING_PRINCIPLES.map((principle) => (
                <div
                  key={principle.title}
                  className="flex flex-col items-center gap-1 border-t-4 border-border-tertiary px-4 pt-6 text-center max-md:items-start max-md:text-left"
                >
                  <h3 className="text-lg font-semibold leading-7 text-text-secondary">
                    {principle.title}
                  </h3>
                  <p className="max-w-sm text-base leading-6 text-text-tertiary">
                    {principle.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="expertise-cases-heading"
          className="bg-utility-neutral-100 py-20 max-md:py-16"
        >
          <div className="mx-auto flex w-full max-w-400 flex-col gap-16 px-12 max-md:gap-10 max-md:px-4">
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <div className="flex flex-col items-start gap-2">
                <SectionEyebrow>Case Studies</SectionEyebrow>
                <h2
                  id="expertise-cases-heading"
                  className="text-4xl font-medium leading-11 tracking-tight text-text-secondary max-md:text-3xl max-md:leading-9"
                >
                  What our work looks like in practice
                </h2>
              </div>
              <p className="max-w-2xl text-xl leading-7.5 text-text-tertiary max-md:text-base max-md:leading-6 md:self-end">
                From entering new markets to delivering complex programmes, our
                work brings together the expertise each challenge requires.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
              {CASE_STUDIES.map((study) => (
                <ConditionalLink
                  key={study.href}
                  href={study.href}
                  className="group/case flex min-w-0 flex-col gap-2 rounded-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
                >
                  <div className="relative h-86 overflow-hidden rounded-xs bg-bg-quaternary p-4">
                    <Image
                      src={study.image}
                      alt=""
                      fill
                      unoptimized
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover/case:scale-105 motion-reduce:transition-none"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-black/25"
                    />
                    <div className="relative z-10 flex items-start gap-3 py-2">
                      <span className="relative h-9 w-11 shrink-0 overflow-hidden rounded-xs">
                        <Image
                          src={study.logo}
                          alt={study.logoAlt}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </span>
                      <h3 className="text-xl font-medium leading-7.5 tracking-tight text-white">
                        {study.title}
                      </h3>
                    </div>
                  </div>
                  <p className="flex items-baseline gap-1 px-2 pt-3 pb-5 text-base leading-6">
                    <span className="shrink-0 font-semibold text-text-secondary">
                      {study.metric}
                    </span>
                    <span className="text-text-quaternary">
                      {study.outcome}
                    </span>
                  </p>
                </ConditionalLink>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
