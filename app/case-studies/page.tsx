import type { Metadata } from "next";
import Image from "next/image";
import {
  CaseStudiesIndex,
  type CaseStudyIndexItem,
} from "@/components/sections/CaseStudiesIndex";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { getCaseStudies } from "@/lib/cms-content";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "See how Sovran helps businesses, investors and institutions make clearer choices and turn them into action.",
};

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();
  const indexItems: CaseStudyIndexItem[] = studies.map(
    ({
      slug,
      client,
      sector,
      market,
      practices,
      title,
      image,
      imageAlt,
      logo,
      logoAlt,
      metric,
    }) => ({
      slug,
      client,
      sector,
      market,
      practices,
      title,
      image,
      imageAlt,
      logo,
      logoAlt,
      metric,
    })
  );

  return (
    <>
      <Navbar theme="dark" />
      <main>
        <section
          className="relative flex min-h-148 items-end overflow-hidden bg-neutral-900 py-16 max-md:min-h-128 max-md:py-12"
          data-theme="dark"
          aria-labelledby="case-studies-heading"
        >
          <Image
            src="/images/case-studies/sovran-case-study-hero.avif"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-b from-black/35 via-black/45 to-black/75"
          />

          <div className="relative z-10 mx-auto flex w-full max-w-400 flex-col items-start gap-2 px-12 max-md:px-6">
            <SectionEyebrow surface="raised">Case Studies</SectionEyebrow>
            <div className="flex max-w-4xl flex-col gap-2">
              <h1
                id="case-studies-heading"
                className="text-6xl font-medium leading-16 tracking-tight text-text-primary max-md:text-4xl max-md:leading-11"
              >
                Work shaped by real decisions.
              </h1>
              <p className="max-w-4xl text-xl leading-7.5 text-text-secondary">
                See how we help businesses, investors and institutions
                understand complex environments, make clearer choices and turn
                those choices into action.
              </p>
            </div>
          </div>
        </section>

        <CaseStudiesIndex studies={indexItems} />
      </main>
      <SiteFooter />
    </>
  );
}
