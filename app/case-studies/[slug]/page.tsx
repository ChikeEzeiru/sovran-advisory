import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { stegaClean } from "next-sanity";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Button } from "@/components/ui/Button";
import { ContentBadge } from "@/components/ui/ContentBadge";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import {
  getCaseStudies,
  getCaseStudyBySlug,
  getCaseStudySlugs,
} from "@/lib/cms-content";

export async function generateStaticParams() {
  return getCaseStudySlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  return study
    ? {
        title: stegaClean(study.seoTitle ?? study.title),
        description: stegaClean(study.seoDescription ?? study.summary),
      }
    : {};
}

function MetadataItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-sm font-semibold leading-5 text-text-brand-tertiary">
        {label}
      </p>
      <p className="mt-2 text-lg font-medium leading-7 text-text-primary">
        {value}
      </p>
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const studies = await getCaseStudies();
  const studyIndex = studies.findIndex((item) => item.slug === slug);

  if (studyIndex === -1) notFound();

  const study = studies[studyIndex];
  const nextStudy = studies[(studyIndex + 1) % studies.length];
  const perspective = study.relatedPerspective;
  const practices = study.practices.split(" + ");

  return (
    <>
      <Navbar theme="light" />
      <main>
        <article>
          <header className="mx-auto w-full max-w-320 px-8 pt-40 pb-16 max-md:px-6 max-md:pt-32 max-md:pb-12">
            <div className="max-w-3xl">
              <Image
                src={study.logo}
                alt={study.logoAlt}
                width={study.logoWidth}
                height={44}
                unoptimized
                className="h-11 w-auto object-contain object-left"
              />
              <h1 className="mt-4 text-5xl font-medium leading-15 tracking-tight text-text-primary max-md:text-4xl max-md:leading-11">
                {study.title}
              </h1>
              <p className="mt-6 text-xl leading-7.5 text-text-tertiary">
                {study.summary}
              </p>
            </div>
          </header>

          <section className="mx-auto w-full max-w-320 px-8 max-md:px-6">
            <div className="relative h-100 overflow-hidden rounded-xs bg-bg-quaternary max-md:h-72">
              <Image
                src={study.image}
                alt={study.imageAlt}
                fill
                priority
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-black/10"
              />
            </div>

            <div className="flex flex-wrap items-start justify-between gap-y-6 py-8">
              <div className="flex shrink-0 items-start gap-12 max-md:w-full max-md:grid max-md:grid-cols-2 max-sm:grid-cols-1">
                <MetadataItem label="Client" value={study.client} />
                <MetadataItem label="Sector" value={study.sector} />
              </div>

              <div className="flex shrink-0 items-start gap-12 max-md:w-full max-md:grid max-md:grid-cols-2 max-sm:grid-cols-1">
                <MetadataItem label="Market" value={study.market} />
                <div>
                  <p className="text-sm font-semibold leading-5 text-text-brand-tertiary">
                    Practices
                  </p>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {practices.map((practice) => (
                      <span
                        key={practice}
                        className="rounded-xs border border-border-secondary bg-bg-secondary-alt px-3 py-1.5 text-xs font-medium leading-4.5 text-text-brand-secondary"
                      >
                        {practice}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto w-full max-w-320 px-8 pt-8 pb-24 max-md:px-6 max-md:pb-16">
            <div className="border-t border-border-primary pt-10">
              <p className="max-w-5xl text-xl leading-7.5 text-text-tertiary">
                {study.challenge}
              </p>
            </div>

            <div className="mt-10 border-t border-border-primary pt-10">
              <h2 className="text-3xl font-semibold leading-9.5 tracking-tight text-text-primary">
                The challenge
              </h2>
              <div className="mt-5 max-w-5xl space-y-5 text-lg leading-7 text-text-tertiary">
                {study.challengeDetails.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <blockquote className="my-12 max-w-5xl border-l-2 border-border-brand pl-5 py-2">
              <p className="text-2xl font-medium italic leading-8 tracking-tight text-text-primary max-md:text-xl max-md:leading-7.5">
                “{study.pullQuote}”
              </p>
              <footer className="mt-6 text-sm font-semibold text-text-brand-tertiary">
                Sovran engagement team
              </footer>
            </blockquote>

            <div className="max-w-5xl">
              <h2 className="text-3xl font-semibold leading-9.5 tracking-tight text-text-primary">
                How we approached the work
              </h2>
              <p className="mt-5 text-lg leading-7 text-text-tertiary">
                {study.work}
              </p>
              <ul className="mt-5 list-disc space-y-3 pl-6 text-lg leading-7 text-text-tertiary marker:text-text-brand-tertiary">
                {study.workstreams.map((workstream) => (
                  <li key={workstream.title} className="pl-1">
                    <span className="font-semibold text-text-primary">
                      {workstream.title}:
                    </span>{" "}
                    {workstream.body}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 max-w-5xl">
              <h3 className="text-xl font-semibold leading-7.5 text-text-primary">
                What we delivered
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-7 text-text-tertiary marker:text-text-brand-tertiary">
                {study.deliverables.map((deliverable) => (
                  <li key={deliverable} className="pl-1">{deliverable}</li>
                ))}
              </ul>
            </div>

            <div className="mt-12 max-w-5xl">
              <h2 className="text-3xl font-semibold leading-9.5 tracking-tight text-text-primary">
                What changed
              </h2>
              <p className="mt-5 text-xl font-medium leading-7.5 text-text-primary">
                {study.outcome}
              </p>
              <div className="mt-5 space-y-5 text-lg leading-7 text-text-tertiary">
                {study.outcomeDetails.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <aside className="mt-12 max-w-5xl bg-bg-primary p-8 max-md:p-6">
              <p className="text-sm font-semibold text-text-brand-tertiary">
                The wider lesson
              </p>
              <h2 className="mt-3 text-2xl font-medium leading-8 text-text-primary">
                {study.insight.title}
              </h2>
              <p className="mt-3 max-w-3xl text-lg leading-7 text-text-tertiary">
                {study.insight.body}
              </p>
            </aside>

            {study.conceptWork && (
              <div className="mt-12">
                <ContentBadge label="Concept work" />
              </div>
            )}
          </section>

          {perspective && (
            <section className="border-y border-border-primary bg-bg-primary">
              <div className="mx-auto grid w-full max-w-320 grid-cols-[1fr_auto] items-end gap-12 px-8 py-16 max-md:grid-cols-1 max-md:px-6 max-md:py-12">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold text-text-brand-tertiary">
                    Related Perspective
                  </p>
                  <h2 className="mt-3 text-3xl font-medium leading-9.5 tracking-tight text-text-primary">
                    {perspective.title}
                  </h2>
                  <p className="mt-4 text-lg leading-7 text-text-tertiary">
                    {perspective.summary}
                  </p>
                </div>
                <Button
                  href={`/perspectives/${perspective.slug}`}
                  variant="link"
                >
                  Read perspective
                </Button>
              </div>
            </section>
          )}

          <section className="bg-bg-quaternary px-12 pt-24 pb-16 max-md:px-6 max-md:py-16">
            <div className="mx-auto grid w-full max-w-336 grid-cols-2 items-start gap-16 max-lg:grid-cols-1">
              <div className="flex w-full max-w-160 flex-col items-start gap-8">
                <div>
                  <SectionEyebrow>Next Case Study</SectionEyebrow>
                  <h2 className="mt-2 text-4xl font-medium leading-11 tracking-tight text-text-primary">
                    {nextStudy.title}
                  </h2>
                  <p className="mt-4 line-clamp-3 text-xl leading-7.5 text-text-tertiary">
                    {nextStudy.summary}
                  </p>
                </div>
                <Button
                  href={`/case-studies/${nextStudy.slug}`}
                  variant="primary"
                >
                  View Case Study
                </Button>
              </div>

              <div className="flex flex-col gap-4 pt-10 max-lg:pt-0">
                <div className="relative h-70 shrink-0 overflow-hidden rounded-xs bg-bg-primary max-lg:h-80 max-md:h-64">
                  <Image
                    src={nextStudy.image}
                    alt={nextStudy.imageAlt}
                    fill
                    loading="eager"
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                  {[nextStudy.metric, nextStudy.secondaryMetric].map(
                    (metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xs bg-bg-tertiary p-4"
                      >
                        <p className="text-xl leading-7.5 text-text-tertiary">
                          {metric.value} {metric.label}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
