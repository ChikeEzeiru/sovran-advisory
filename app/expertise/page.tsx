import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Sovran's practice areas span policy and government relations, market strategy, digital advisory, and stakeholder communications across African markets.",
}
import { Navbar } from "@/components/sections/Navbar"
import { SiteFooter } from "@/components/sections/SiteFooter"

const PRACTICES = [
  {
    title: "Policy & Government Relations",
    description: "We help clients navigate complex regulatory and political environments across African markets — from licensing approvals to multilateral negotiations.",
    href: "/expertise/policy",
  },
  {
    title: "Market & Corporate Strategy",
    description: "We advise on market entry, competitive positioning, and corporate strategy in markets where standard frameworks do not apply.",
    href: "/expertise/strategy",
  },
  {
    title: "Digital & Technology Advisory",
    description: "We support digital market entry, technology regulation, and data governance for organisations operating at the frontier of Africa&apos;s digital economy.",
    href: "/expertise/technology",
  },
  {
    title: "Communications & Stakeholder Engagement",
    description: "We design and execute stakeholder engagement programmes for complex transactions, regulatory processes, and multi-party negotiations.",
    href: "/expertise/communications",
  },
]

export default function ExpertisePage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="px-12 pt-40 pb-24 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="self-start border border-border-primary rounded-[10px] px-3 py-1">
              <span className="text-base font-normal leading-6 text-text-quaternary">Expertise</span>
            </div>
            <h1 className="text-5xl font-medium leading-tight tracking-tight text-text-primary">
              Where we focus.
            </h1>
            <p className="text-xl font-normal leading-8 text-text-tertiary max-w-2xl">
              Our practice areas reflect the areas where we have consistently delivered outcomes for clients operating in Africa&apos;s most demanding markets.
            </p>
          </div>
        </section>

        <section className="px-12 pb-32 max-w-[1600px] mx-auto w-full">
          <div className="grid grid-cols-2 gap-4">
            {PRACTICES.map((practice) => (
              <Link
                key={practice.href}
                href={practice.href}
                className="group flex flex-col gap-4 p-8 rounded-[2px] bg-bg-quaternary hover:bg-border-primary transition-colors duration-200"
              >
                <h2 className="text-xl font-semibold text-text-primary">{practice.title}</h2>
                <p className="text-base font-normal leading-6 text-text-tertiary" dangerouslySetInnerHTML={{ __html: practice.description }} />
                <span className="text-sm font-medium text-text-brand-secondary group-hover:underline mt-auto">Learn more →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
