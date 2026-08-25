import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { InternalPageHero } from "@/components/sections/InternalPageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Events",
  description: "Sovran roundtables, briefings and working sessions for leaders making decisions across complex markets.",
};

const PAST_EVENTS = [
  {
    title: "What changes when digital infrastructure becomes a public system?",
    format: "Roundtable",
    date: "18 June 2026",
    location: "Lagos · Conceptual event",
    description: "A closed working session on identity, payments and the institutional decisions that determine whether shared digital systems earn trust.",
    image: "/images/sovran photo - events & convening.avif",
  },
  {
    title: "From regional ambition to a workable market-entry sequence",
    format: "Executive briefing",
    date: "27 March 2026",
    location: "Nairobi · Conceptual event",
    description: "A practical discussion for operators and investors on sequencing regulation, partnerships, product adaptation and local authority.",
    image: "/images/intelligence/Blog thumbnail-Market entry.avif",
  },
];

export default function EventsPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <InternalPageHero
          eyebrow="Events & convening"
          title="Useful conversations around decisions in motion."
          intro="Sovran convenes small roundtables, executive briefings and working sessions where market evidence, institutional perspectives and practical experience can be examined together."
          image="/images/sovran photo - events & convening.avif"
          imageAlt="People gathered for a focused working session."
        />

        <section className="mx-auto w-full max-w-400 px-12 pb-24 max-md:px-6 max-md:pb-16">
          <div className="flex flex-col gap-8">
            <div><p className="text-sm font-medium uppercase tracking-wider text-text-quaternary">Upcoming events</p><h2 className="mt-3 text-3xl font-medium leading-9 tracking-tight text-text-primary">The next room is still being shaped.</h2></div>
            <div className="grid min-h-96 place-items-center rounded-xs border border-border-secondary bg-bg-primary px-8 py-16 text-center">
              <div className="flex max-w-xl flex-col items-center">
                <div className="flex size-14 items-center justify-center rounded-xs border border-border-primary bg-bg-secondary text-xl text-text-brand-tertiary shadow-xs" aria-hidden="true">→</div>
                <h3 className="mt-6 text-2xl font-medium leading-8 text-text-primary">No upcoming events are currently published.</h3>
                <p className="mt-3 text-base leading-6 text-text-tertiary">We announce small roundtables and briefings when there is a clear question worth bringing people together around.</p>
                <div className="mt-6"><Button href="/contact" variant="primary-alt" size="lg">Register your interest</Button></div>
                <p className="mt-4 text-xs leading-4.5 text-text-quaternary">Conceptual event programme. No registration is submitted.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-utility-neutral-100">
          <div className="mx-auto flex w-full max-w-400 flex-col gap-10 px-12 py-24 max-md:px-6 max-md:py-16">
            <div><p className="text-sm font-medium uppercase tracking-wider text-text-quaternary">Past events</p><h2 className="mt-3 text-3xl font-medium leading-9 tracking-tight text-text-primary">Recent questions we have convened around.</h2></div>
            <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
              {PAST_EVENTS.map((event) => (
                <article key={event.title} className="flex min-w-0 flex-col gap-5">
                  <div className="relative aspect-16/10 overflow-hidden rounded-xs bg-bg-quaternary">
                    <Image src={event.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                    <span aria-hidden="true" className="absolute inset-0 bg-black/15" />
                  </div>
                  <div>
                    <p className="text-sm text-text-quaternary">{event.format} · {event.date}</p>
                    <h3 className="mt-2 max-w-2xl text-2xl font-medium leading-8 tracking-tight text-text-secondary">{event.title}</h3>
                    <p className="mt-3 max-w-2xl text-base leading-6 text-text-tertiary">{event.description}</p>
                    <p className="mt-4 text-sm text-text-quaternary">{event.location}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-400 grid-cols-12 gap-8 px-12 py-24 max-lg:grid-cols-1 max-md:px-6 max-md:py-16">
          <div className="col-span-4"><p className="text-sm font-medium uppercase tracking-wider text-text-quaternary">How we convene</p></div>
          <div className="col-span-8 grid grid-cols-2 gap-8 max-md:grid-cols-1">
            {[['Small enough for useful exchange', 'We favour focused rooms where participants can test assumptions and speak from direct experience.'], ['Structured around a decision', 'Each session begins with a practical question and ends with implications participants can take back into their work.'], ['Clear about the format', 'Public briefings, closed roundtables and working sessions have different expectations. We state those boundaries upfront.'], ['Evidence before performance', 'The purpose is to improve understanding, not to create a stage or fill a calendar.']].map(([title, copy]) => <div key={title} className="border-t border-border-primary pt-5"><h3 className="text-xl font-medium text-text-secondary">{title}</h3><p className="mt-2 text-base leading-6 text-text-tertiary">{copy}</p></div>)}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
