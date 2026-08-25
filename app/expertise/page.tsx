import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { InternalPageHero } from "@/components/sections/InternalPageHero";
import { ConditionalLink } from "@/components/ui/ConditionalLink";
import { ButtonVisual } from "@/components/ui/Button";

export const metadata: Metadata = { title: "What we do", description: "Intelligence, strategy, institutional understanding and delivery for complex markets." };

const PRACTICES = [
  { number: "01", title: "Intelligence", copy: "See the signals, constraints and opportunities that matter before you commit.", href: "/expertise/intelligence", image: "/images/services/sovran photo - Intelligence.avif" },
  { number: "02", title: "Strategy", copy: "Choose a route to market, investment or growth that fits the situation.", href: "/expertise/strategy", image: "/images/services/sovran photo - comms and stakeholder eng.avif" },
  { number: "03", title: "Institutions", copy: "Work with the regulators, partners and public systems that shape the outcome.", href: "/expertise/institutions", image: "/images/services/sovran photo - policy and govt relations.avif" },
  { number: "04", title: "Delivery", copy: "Turn decisions into coordinated programmes, operating models and measurable progress.", href: "/expertise/delivery", image: "/images/services/sovran photo - digital and tech advisory 2.avif" },
];

export default function ExpertisePage() {
  return <>
    <Navbar theme="light" />
    <main>
      <InternalPageHero eyebrow="What we do" title="From the first signal to the work on the ground." intro="Complex decisions rarely sit in one discipline. We bring together intelligence, strategy, institutional understanding and delivery around the question that matters." />
      <section className="mx-auto w-full max-w-400 px-12 pb-24 max-md:px-6 max-md:pb-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-16 max-lg:grid-cols-1">
          {PRACTICES.map((practice) => <ConditionalLink key={practice.href} href={practice.href} className="group flex min-w-0 flex-col gap-5">
            <div className="relative aspect-16/10 overflow-hidden rounded-xs bg-bg-quaternary">
              <Image src={practice.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none" />
            </div>
            <div className="grid grid-cols-[3rem_1fr] gap-4">
              <p className="pt-1 text-sm tabular-nums text-text-quaternary">{practice.number}</p>
              <div className="flex flex-col items-start gap-2">
                <h2 className="text-2xl font-medium leading-8 tracking-tight text-text-primary">{practice.title}</h2>
                <p className="max-w-xl text-base leading-6 text-text-tertiary">{practice.copy}</p>
                <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-text-tertiary group-hover:text-text-brand-secondary"><ButtonVisual size="sm">Explore {practice.title}</ButtonVisual></span>
              </div>
            </div>
          </ConditionalLink>)}
        </div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
