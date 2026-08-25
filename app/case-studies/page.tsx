import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { InternalPageHero } from "@/components/sections/InternalPageHero";
import { ConditionalLink } from "@/components/ui/ConditionalLink";
import { CASE_STUDIES } from "@/lib/case-studies";

export const metadata: Metadata = { title: "Case studies", description: "Conceptual examples of Sovran’s work across markets, institutions and delivery." };

export default function CaseStudiesPage() {
  return <>
    <Navbar theme="light" />
    <main>
      <InternalPageHero eyebrow="Case studies" title="Work grounded in the conditions on the ground." intro="Five conceptual engagements show how different kinds of expertise come together around a practical outcome." />
      <section className="mx-auto w-full max-w-400 px-12 pb-24 max-md:px-6 max-md:pb-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-16 max-lg:grid-cols-1">
          {CASE_STUDIES.map((study, index) => <ConditionalLink key={study.slug} href={`/case-studies/${study.slug}`} className={`group flex min-w-0 flex-col gap-5 ${index === 0 ? "col-span-2 max-lg:col-span-1" : ""}`}>
            <div className={`relative overflow-hidden rounded-xs bg-bg-quaternary ${index === 0 ? "aspect-[10/3] max-lg:aspect-16/9" : "aspect-16/10"}`}>
              <Image src={study.image} alt="" fill sizes={index === 0 ? "(min-width: 1600px) 1600px, 100vw" : "(min-width: 1024px) 50vw, 100vw"} className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none" />
              <span aria-hidden="true" className="absolute inset-0 bg-black/10" />
            </div>
            <div className="grid grid-cols-[3rem_1fr] gap-4">
              <span className="pt-1 text-sm tabular-nums text-text-quaternary">{String(index + 1).padStart(2, "0")}</span>
              <div><p className="text-sm text-text-quaternary">Conceptual case study · {study.sector} · {study.market}</p><h2 className="mt-2 max-w-4xl text-2xl font-medium leading-8 tracking-tight text-text-secondary group-hover:text-text-brand-secondary">{study.title}</h2><p className="mt-3 text-base text-text-tertiary">{study.practices}</p></div>
            </div>
          </ConditionalLink>)}
        </div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
