import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SpinningNumber } from "@/components/ui/SpinningNumber";

type Metric = {
  value: string;
  label: string;
};

type ContextualMetric = Metric & {
  context: string;
};

type Capability = {
  title: string;
  body: string;
};

export type PracticePageData = {
  name: string;
  hero: {
    title: string;
    body: string;
    image: string;
    imageAlt: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    body: string;
    metrics: [ContextualMetric, ContextualMetric, ContextualMetric];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    body: string;
    items: Capability[];
  };
  caseStudy: {
    eyebrow: string;
    title: string;
    body: string;
    href: string;
    image?: string;
    imageAlt?: string;
    logo: string;
    logoAlt: string;
    cta: string;
    metrics: [Metric, Metric];
  };
};

export function PracticePage({ data }: { data: PracticePageData }) {
  return (
    <>
      <Navbar theme="dark" />
      <main>
        <section
          className="bg-neutral-900 pt-40 pb-16 max-md:pt-32 max-md:pb-12"
          data-theme="dark"
          aria-labelledby="practice-page-heading"
        >
          <div className="mx-auto flex w-full max-w-400 flex-col gap-10 px-12 max-md:gap-8 max-md:px-6">
            <div className="flex max-w-3xl flex-col items-start gap-3">
              <SectionEyebrow surface="raised">{data.name}</SectionEyebrow>
              <h1
                id="practice-page-heading"
                className="text-5xl font-medium text-balance leading-tight tracking-tight text-text-primary max-md:text-4xl max-md:leading-11"
              >
                {data.hero.title}
              </h1>
              <p className="max-w-3xl text-xl leading-7.5 text-text-tertiary">
                {data.hero.body}
              </p>
            </div>

            <div className="relative h-80 min-h-80 overflow-hidden rounded-xs bg-bg-quaternary max-md:h-64 max-md:min-h-64">
              <Image
                src={data.hero.image}
                alt={data.hero.imageAlt}
                fill
                priority
                sizes="(min-width: 1600px) 1504px, (min-width: 768px) calc(100vw - 96px), calc(100vw - 48px)"
                className="object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-black/10"
              />
            </div>
          </div>
        </section>

        <section
          className="bg-bg-secondary-alt-2 py-24 max-md:py-20"
          aria-labelledby="practice-intro-heading"
        >
          <div className="mx-auto flex w-full max-w-400 flex-col items-center gap-14 px-12 max-md:gap-10 max-md:px-6">
            <div className="flex max-w-3xl flex-col items-center gap-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <SectionEyebrow>{data.intro.eyebrow}</SectionEyebrow>
                <h2
                  id="practice-intro-heading"
                  className="text-4xl font-medium leading-11 tracking-tight text-balance text-text-primary max-md:text-3xl max-md:leading-9"
                >
                  {data.intro.title}
                </h2>
              </div>
              <p className="text-xl leading-7.5 text-text-tertiary">
                {data.intro.body}
              </p>
            </div>

            <dl className="grid w-full max-w-4xl grid-cols-3 max-md:grid-cols-1 max-md:divide-y max-md:divide-border-secondary-alt">
              {data.intro.metrics.map((metric, index) => (
                <div
                  key={`${metric.value}-${metric.label}`}
                  className={`flex min-w-0 flex-col items-center gap-2 px-8 text-center max-md:py-6 ${
                    index > 0
                      ? "border-l border-border-secondary-alt max-md:border-l-0"
                      : ""
                  }`}
                >
                  <dd className="text-7xl font-medium leading-none tracking-tight text-text-secondary max-lg:text-6xl max-md:text-5xl">
                    <span className="sr-only">{metric.value}</span>
                    <span aria-hidden="true">
                      <SpinningNumber value={metric.value} size="display" />
                    </span>
                  </dd>
                  <dt className="text-xl leading-7.5 text-text-tertiary">
                    {metric.label}
                  </dt>
                  <dd className="text-sm leading-5 text-text-quaternary">
                    {metric.context}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          className="bg-bg-secondary-alt-2 py-20"
          aria-labelledby="practice-capabilities-heading"
        >
          <div className="mx-auto grid w-full max-w-400 grid-cols-2 gap-16 px-12 max-lg:grid-cols-1 max-lg:gap-10 max-md:px-6">
            <div className="flex max-w-xl flex-col items-start gap-5">
              <div className="flex flex-col items-start gap-2">
                <SectionEyebrow>{data.capabilities.eyebrow}</SectionEyebrow>
                <h2
                  id="practice-capabilities-heading"
                  className="text-4xl font-medium leading-11 tracking-tight text-text-secondary max-md:text-3xl max-md:leading-9"
                >
                  {data.capabilities.title}
                </h2>
              </div>
              <p className="text-xl leading-7.5 text-text-tertiary">
                {data.capabilities.body}
              </p>
            </div>

            <ul className="flex min-w-0 flex-col gap-4">
              {data.capabilities.items.map((item) => (
                <li
                  key={item.title}
                  className="rounded-xs border border-border-secondary bg-bg-primary p-4"
                >
                  <h3 className="text-base font-semibold leading-6 text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base leading-6 text-text-tertiary">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="py-16 bg-bg-quaternary"
          aria-labelledby="practice-case-study-heading"
        >
          <div className="mx-auto grid w-full max-w-400 grid-cols-2 items-start gap-16 px-12 max-lg:grid-cols-1 max-lg:gap-10 max-md:px-6">
            <div className="flex max-w-xl flex-col items-start gap-5">
              <div className="flex flex-col items-start gap-2">
                <SectionEyebrow>{data.caseStudy.eyebrow}</SectionEyebrow>
                <h2
                  id="practice-case-study-heading"
                  className="text-4xl font-medium leading-11 tracking-tight text-text-secondary max-md:text-3xl max-md:leading-9"
                >
                  {data.caseStudy.title}
                </h2>
              </div>
              <p className="line-clamp-3 text-xl leading-7.5 text-text-tertiary">
                {data.caseStudy.body}
              </p>
              <Button href={data.caseStudy.href} variant="primary" size="md">
                {data.caseStudy.cta}
              </Button>
            </div>

            <div className="flex min-w-0 flex-col pt-10">
              <div className="flex flex-col min-w-0 overflow-hidden rounded-xs gap-6">
                <div className="relative h-80 overflow-hidden bg-bg-quaternary max-md:h-64">
                  <Image
                    src={
                      data.caseStudy.image ??
                      "/images/case-studies/case-study-card-texture.png"
                    }
                    alt={data.caseStudy.imageAlt ?? ""}
                    fill
                    sizes="(min-width: 1024px) 48vw, calc(100vw - 48px)"
                    className="object-cover"
                  />
                  <Image
                    src={data.caseStudy.logo}
                    alt={data.caseStudy.logoAlt}
                    width={40}
                    height={32}
                    unoptimized
                    className="absolute top-4 left-4 z-10 h-8 w-10 object-contain object-top-left"
                  />
                </div>

                <dl className="grid grid-cols-2 divide-x divide-border-secondary gap-6 max-sm:grid-cols-1 max-sm:divide-x-0 max-sm:divide-y">
                  {data.caseStudy.metrics.map((metric) => (
                    <div
                      key={`${metric.value}-${metric.label}`}
                      className="p-4 bg-bg-tertiary"
                    >
                      <dd className="mt-1 text-xl font-semibold leading-7.5 text-text-secondary">
                        {metric.value}
                      </dd>
                      <dt className="text-sm leading-5 text-text-quaternary">
                        {metric.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
