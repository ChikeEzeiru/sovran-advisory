import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { InternalPageHero } from "@/components/sections/InternalPageHero";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export const metadata: Metadata = {
  title: "Partners & Institutional Relationships",
  description: "How Sovran works with specialist partners, institutions and regional networks around complex decisions.",
};

const PARTNER_TYPES = [
  { number: "01", title: "Specialist expertise", copy: "Independent experts and technical teams who deepen the evidence around a sector, system or operating question." },
  { number: "02", title: "Institutional relationships", copy: "Public bodies, industry organisations and regional institutions whose mandates shape how work can move forward." },
  { number: "03", title: "Delivery networks", copy: "Local operators and programme partners able to turn a regional direction into accountable work on the ground." },
];

const PRINCIPLES = [
  ["Start with the decision", "We assemble relationships around the question to be resolved, not around a fixed roster of names."],
  ["Make roles explicit", "Every partner should understand the contribution, decision rights, evidence standard and responsibility for delivery."],
  ["Keep local judgement close", "People working in the market need enough authority to respond when conditions differ from the original plan."],
  ["Protect independence", "Access is useful only when it supports better evidence and responsible engagement. It does not replace judgement."],
];

export default function PartnershipsPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <InternalPageHero
          eyebrow="Partners & institutional relationships"
          title="The right relationship can change what is possible."
          intro="Complex work often depends on expertise, authority and delivery capacity that sit across several organisations. We bring those contributions together around a clear decision and defined responsibilities."
          image="/images/sovran photo - partners & intitutional rshps.avif"
          imageAlt="A working city district shaped by public, commercial and transport infrastructure."
        />

        <section className="border-y border-border-secondary-alt bg-bg-primary">
          <div className="mx-auto grid w-full max-w-400 grid-cols-12 gap-8 px-12 py-24 max-lg:grid-cols-1 max-md:px-6 max-md:py-16">
            <div className="col-span-4">
              <SectionEyebrow>Why partnerships matter</SectionEyebrow>
              <h2 className="mt-3 max-w-sm text-3xl font-medium leading-9 tracking-tight text-text-primary">Built around the work, not displayed for effect.</h2>
            </div>
            <div className="col-span-8 flex max-w-4xl flex-col gap-6 text-xl leading-8 text-text-tertiary">
              <p>No single firm holds every form of market knowledge, institutional authority or specialist capability a complex programme may require. The useful question is not how large a network appears, but whether the right people can contribute at the right moment.</p>
              <p>Sovran defines the decision first, identifies the capabilities and relationships that matter, and gives each participant a clear role. This keeps collaboration focused and makes accountability visible to the client.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-400 flex-col gap-10 px-12 py-24 max-md:px-6 max-md:py-16">
          <div><SectionEyebrow>Our partnership model</SectionEyebrow><h2 className="mt-3 text-3xl font-medium leading-9 tracking-tight text-text-primary">Different relationships for different conditions.</h2></div>
          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
            {PARTNER_TYPES.map((item) => (
              <article key={item.number} className="flex min-h-88 flex-col justify-between rounded-xs bg-bg-quaternary p-8 max-md:min-h-72 max-md:p-6">
                <span className="text-sm tabular-nums text-text-quaternary">{item.number}</span>
                <div><h3 className="text-2xl font-medium leading-8 text-text-secondary">{item.title}</h3><p className="mt-3 text-base leading-6 text-text-tertiary">{item.copy}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-utility-neutral-100">
          <div className="mx-auto grid w-full max-w-400 grid-cols-2 items-stretch gap-6 px-12 py-24 max-lg:grid-cols-1 max-md:px-6 max-md:py-16">
            <div className="relative min-h-160 overflow-hidden rounded-xs bg-bg-quaternary max-lg:min-h-112">
              <Image src="/images/about-us/Grid-img_3.avif" alt="Infrastructure connecting institutions, markets and communities." fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-between gap-12 rounded-xs bg-bg-primary p-8 max-md:p-6">
              <div><SectionEyebrow>How we work together</SectionEyebrow><h2 className="mt-3 text-3xl font-medium leading-9 tracking-tight text-text-primary">Clear roles protect the quality of the work.</h2></div>
              <ol className="border-t border-border-primary">
                {PRINCIPLES.map(([title, copy], index) => (
                  <li key={title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-border-primary py-5">
                    <span className="text-sm tabular-nums text-text-quaternary">{String(index + 1).padStart(2, "0")}</span>
                    <div><h3 className="text-lg font-medium text-text-secondary">{title}</h3><p className="mt-1 text-base leading-6 text-text-tertiary">{copy}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-400 items-end justify-between gap-8 px-12 py-24 max-md:flex-col max-md:items-start max-md:px-6 max-md:py-16">
          <div className="max-w-2xl"><SectionEyebrow>Work with Sovran</SectionEyebrow><h2 className="mt-3 text-3xl font-medium leading-9 tracking-tight text-text-primary">Bring a capability or institutional perspective to the right question.</h2><p className="mt-4 text-base leading-6 text-text-tertiary">All relationships described on this conceptual site are fictional and shown for demonstration purposes.</p></div>
          <Button href="/contact" variant="secondary" size="lg">Start a conversation</Button>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
