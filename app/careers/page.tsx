import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { InternalPageHero } from "@/components/sections/InternalPageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Careers", description: "Do work that has to hold up in the real world." };
const ROLES = [["Associate, Market Intelligence", "Lagos", "Support market, competitor and policy analysis across client decisions."], ["Engagement Manager, Strategy", "Nairobi", "Lead focused strategy engagements from evidence through to practical choices."], ["Programme Lead, Delivery", "Accra", "Help client teams turn approved plans into coordinated programmes."]];

export default function CareersPage() {
  return <><Navbar theme="light" /><main>
    <InternalPageHero eyebrow="Careers" title="Do work that has to hold up in the real world." intro="We bring together people who ask better questions, work across different perspectives and stay close to the practical work after a decision is made." image="/images/sovran photo - events & convening.avif" imageAlt="People gathered for a working session in a contemporary venue." />
    <section className="mx-auto grid w-full max-w-400 grid-cols-12 gap-8 px-12 pb-24 max-lg:grid-cols-1 max-md:px-6 max-md:pb-16">
      <div className="col-span-4"><p className="text-sm font-medium uppercase tracking-wider text-text-quaternary">Open roles</p><h2 className="mt-3 max-w-sm text-3xl font-medium leading-9 text-text-primary">Find the next question worth working on.</h2></div>
      <div className="col-span-8 border-t border-border-primary">{ROLES.map(([title, location, copy]) => <article key={title} className="grid grid-cols-[1fr_auto] gap-8 border-b border-border-primary py-6 max-sm:grid-cols-1"><div><p className="text-sm text-text-quaternary">{location} · Full-time · Conceptual role</p><h3 className="mt-2 text-2xl font-medium text-text-secondary">{title}</h3><p className="mt-3 max-w-xl text-base leading-6 text-text-tertiary">{copy}</p></div><Button href="/contact" variant="secondary" size="md">View role details</Button></article>)}</div>
      <p className="col-span-8 col-start-5 mt-8 text-sm leading-5 text-text-quaternary max-lg:col-span-1">Tell us what you have worked on, what you learned and where you want to grow. This is a fictional recruitment experience created for a conceptual project.</p>
    </section>
  </main><SiteFooter /></>;
}
