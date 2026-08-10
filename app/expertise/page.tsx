import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Sovran's practice areas span policy and government relations, market strategy, digital advisory, and stakeholder communications across African markets.",
}
import { Navbar } from "@/components/sections/Navbar"
import { Footer } from "@/components/sections/Footer"

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
            <div className="self-start border border-[#d0d6d8] rounded-[10px] px-3 py-1">
              <span className="text-base font-normal leading-6 text-[#67787c]">Expertise</span>
            </div>
            <h1 className="text-5xl font-medium leading-tight tracking-tight text-[#161b1d]">
              Where we focus.
            </h1>
            <p className="text-xl font-normal leading-8 text-[#4b585b] max-w-2xl">
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
                className="group flex flex-col gap-4 p-8 rounded-xl bg-[#e3e7e8] hover:bg-[#d8dede] transition-colors duration-200"
              >
                <h2 className="text-xl font-medium text-[#161b1d]">{practice.title}</h2>
                <p className="text-base font-normal leading-6 text-[#4b585b]" dangerouslySetInnerHTML={{ __html: practice.description }} />
                <span className="text-sm font-medium text-[#1a3d2e] group-hover:underline mt-auto">Learn more →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
