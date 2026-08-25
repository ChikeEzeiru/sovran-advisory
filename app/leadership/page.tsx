import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { InternalPageHero } from "@/components/sections/InternalPageHero";

export const metadata: Metadata = { title: "Leadership", description: "The fictional leadership team behind Sovran’s conceptual advisory practice." };

const LEADERS = [
  ["Amara Okafor", "Co-Founder & Managing Partner", "Amara leads Sovran’s strategy and market advisory work. Her career spans corporate strategy, market intelligence and transformation work for organisations operating across emerging economies."],
  ["Daniel Mensah", "Co-Founder & Partner, Institutional Advisory", "Daniel leads work involving public institutions, regulatory environments and multi-party programmes. His background spans policy, economic development and stakeholder strategy."],
  ["Lina Adeyemi", "Partner, Intelligence", "Lina leads market and investment analysis. She helps clients turn fragmented commercial, competitor and policy information into decisions that can be tested."],
  ["Kofi Asare", "Partner, Delivery", "Kofi leads implementation and operating-model work. He works with client teams to turn approved plans into coordinated programmes with visible accountability."],
];

export default function LeadershipPage() {
  return <><Navbar theme="light" /><main>
    <InternalPageHero eyebrow="Leadership" title="The people behind the work." intro="The profiles below are fictional and created for this conceptual project." image="/images/sovran photo - leadership & team.avif" imageAlt="Professionals moving through a contemporary urban workplace." />
    <section className="mx-auto grid w-full max-w-400 grid-cols-2 gap-x-12 px-12 pb-24 max-lg:grid-cols-1 max-md:px-6 max-md:pb-16">
      {LEADERS.map(([name, title, bio], index) => <article key={name} className="flex min-h-80 flex-col justify-between border-t border-border-primary py-6 last:border-b">
        <div className="flex items-start justify-between gap-6"><div><h2 className="text-2xl font-medium text-text-primary">{name}</h2><p className="mt-1 text-sm text-text-quaternary">{title}</p></div><span className="text-sm tabular-nums text-text-quaternary">{String(index + 1).padStart(2, "0")}</span></div>
        <p className="max-w-xl text-lg leading-7 text-text-tertiary">{bio}</p>
        <p className="text-sm text-text-quaternary">Fictional identity · Conceptual profile</p>
      </article>)}
    </section>
  </main><SiteFooter /></>;
}
