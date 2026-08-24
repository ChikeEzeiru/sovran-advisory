import type { Metadata } from "next"
import { Navbar } from "@/components/sections/Navbar"

export const metadata: Metadata = {
  title: "Digital & Technology Advisory",
  description:
    "We support digital market entry, technology regulation, and data governance for organisations operating at the frontier of Africa's digital economy.",
}
import { SiteFooter } from "@/components/sections/SiteFooter"
import { Button } from "@/components/ui/Button"

export default function TechnologyExpertisePage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="px-12 pt-40 pb-24 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="border border-border-primary rounded-[10px] px-3 py-1 self-start">
              <span className="text-base font-normal leading-6 text-text-quaternary">Expertise</span>
            </div>
            <h1 className="text-5xl font-medium leading-tight tracking-tight text-text-primary">
              Digital & Technology Advisory
            </h1>
            <p className="text-xl font-normal leading-8 text-text-tertiary max-w-2xl">
              We support digital market entry, technology regulation, and data governance for organisations operating at the frontier of Africa&apos;s digital economy.
            </p>
          </div>
        </section>

        <section className="px-12 pb-32 max-w-[1600px] mx-auto w-full">
          <div className="flex gap-16 items-start">
            <div className="flex-1 flex flex-col gap-8">
              <p className="text-lg font-normal leading-7 text-text-tertiary">
                Placeholder copy. Africa&apos;s digital regulatory landscape is among the fastest-evolving in the world. Data localisation requirements, digital finance regulations, and platform licensing regimes are shifting in ways that create both risk and opportunity for organisations that know how to read them.
              </p>
              <p className="text-lg font-normal leading-7 text-text-tertiary">
                We advise technology companies, financial institutions, and governments on the regulatory dimensions of digital strategy — combining policy expertise with an understanding of how technology markets actually work.
              </p>
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-text-primary">What this covers</h2>
                <ul className="flex flex-col gap-3">
                  {["Digital market entry and licensing", "Data governance and localisation compliance", "Fintech and digital payments regulation", "Technology policy engagement", "Cybersecurity and critical infrastructure advisory"].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base font-normal leading-6 text-text-tertiary">
                      <span className="text-text-brand-secondary mt-0.5">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <Button href="/contact" variant="primary" size="lg">Discuss an engagement</Button>
              </div>
            </div>
            <div className="w-72 shrink-0 flex flex-col gap-4 p-8 rounded-[2px] bg-bg-quaternary">
              <p className="text-sm font-medium uppercase tracking-wide text-text-quaternary">From our perspectives</p>
              <a href="/perspectives" className="text-base font-normal leading-6 text-text-brand-secondary hover:underline">
                Data localisation mandates: mapping the compliance landscape
              </a>
              <a href="/perspectives" className="text-base font-normal leading-6 text-text-brand-secondary hover:underline">
                Licensing timelines: the hidden cost of market entry
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
