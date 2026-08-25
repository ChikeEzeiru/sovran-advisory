import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { InternalPageHero } from "@/components/sections/InternalPageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "About Sovran", description: "Built for decisions that cannot be separated from their context." };

const STEPS = [
  ["01", "Frame the decision", "Agree what must be decided, by whom and by when."],
  ["02", "Build the right picture", "Gather market, commercial, institutional and operational evidence."],
  ["03", "Make choices visible", "Set out options, trade-offs and conditions for success."],
  ["04", "Work alongside the team", "Move from recommendation to delivery with clear ownership."],
];

export default function AboutPage() {
  return <>
    <Navbar theme="light" />
    <main>
      <InternalPageHero eyebrow="About Sovran" title="Built for decisions that cannot be separated from their context." intro="We bring intelligence, strategy, institutional understanding and delivery together because complex decisions rarely sit in one department or one market." image="/images/sovran photo - our story.avif" imageAlt="A working city and its infrastructure seen from above." />

      <section className="mx-auto grid w-full max-w-400 grid-cols-12 gap-8 px-12 py-24 max-lg:grid-cols-1 max-md:px-6 max-md:py-16">
        <div className="col-span-4"><p className="text-sm font-medium uppercase tracking-wider text-text-quaternary">Our story</p></div>
        <div className="col-span-8 flex max-w-4xl flex-col gap-6 text-xl leading-8 text-text-tertiary">
          <p>Sovran started in 2012 as a small market-intelligence practice supporting organisations entering unfamiliar markets. Clients soon needed more than a report: they needed a route to market, a clear understanding of institutions and support turning decisions into work.</p>
          <p>That evolution shaped Sovran today. We work with business leaders, investors and public institutions when the stakes are high and the conditions are changing.</p>
        </div>
      </section>

      <section className="bg-bg-primary">
        <div className="mx-auto grid w-full max-w-400 grid-cols-2 gap-6 px-12 py-24 max-lg:grid-cols-1 max-md:px-6 max-md:py-16">
          <div className="relative min-h-160 overflow-hidden rounded-xs bg-bg-quaternary max-lg:min-h-112">
            <Image src="/images/sovran photo - partners & intitutional rshps.avif" alt="A city district shaped by transport, civic and commercial infrastructure." fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-between gap-12 px-6 py-4 max-md:px-0">
            <div><p className="text-sm font-medium uppercase tracking-wider text-text-quaternary">How we work</p><h2 className="mt-3 text-3xl font-medium leading-9 tracking-tight text-text-primary">Clear decisions, made useful.</h2></div>
            <ol className="border-t border-border-primary">{STEPS.map(([number, title, copy]) => <li key={number} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-border-primary py-5"><span className="text-sm text-text-quaternary">{number}</span><div><h3 className="text-xl font-medium text-text-secondary">{title}</h3><p className="mt-1 text-base leading-6 text-text-tertiary">{copy}</p></div></li>)}</ol>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-400 items-end justify-between gap-8 px-12 py-24 max-md:flex-col max-md:items-start max-md:px-6 max-md:py-16">
        <div className="max-w-2xl"><p className="text-sm font-medium uppercase tracking-wider text-text-quaternary">Leadership</p><h2 className="mt-3 text-3xl font-medium leading-9 tracking-tight text-text-primary">Experience across markets, institutions and delivery.</h2></div>
        <Button href="/leadership" variant="secondary" size="lg">Meet the leadership team</Button>
      </section>
    </main>
    <SiteFooter />
  </>;
}
