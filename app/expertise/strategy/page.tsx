import type { Metadata } from "next"
import { Navbar } from "@/components/sections/Navbar"

export const metadata: Metadata = {
  title: "Market & Corporate Strategy",
  description:
    "We advise corporates and investors on market entry, competitive positioning, and corporate strategy in African markets where standard frameworks do not apply.",
}
import { SiteFooter } from "@/components/sections/SiteFooter"
import { Button } from "@/components/ui/Button"

export default function StrategyExpertisePage() {
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
              Market & Corporate Strategy
            </h1>
            <p className="text-xl font-normal leading-8 text-text-tertiary max-w-2xl">
              We advise on market entry, competitive positioning, and corporate strategy in markets where standard frameworks do not apply.
            </p>
          </div>
        </section>

        <section className="px-12 pb-32 max-w-[1600px] mx-auto w-full">
          <div className="flex gap-16 items-start">
            <div className="flex-1 flex flex-col gap-8">
              <p className="text-lg font-normal leading-7 text-text-tertiary">
                Placeholder copy. Standard market entry playbooks often fail in African markets because they are built for contexts with stable regulatory environments, predictable competitive dynamics, and reliable data. Most of our clients are operating in conditions where none of those assumptions hold.
              </p>
              <p className="text-lg font-normal leading-7 text-text-tertiary">
                Our market and corporate strategy practice is grounded in primary research, local market intelligence, and an honest assessment of the conditions our clients will actually face.
              </p>
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-text-primary">What this covers</h2>
                <ul className="flex flex-col gap-3">
                  {["Market entry strategy and feasibility", "Competitive landscape analysis", "Partnership and joint venture structuring", "Portfolio and investment strategy", "Organisational design for new markets"].map((item) => (
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
              <p className="text-sm font-medium uppercase tracking-wide text-text-quaternary">Related case studies</p>
              <a href="/case-studies/meridian-capital-licensing" className="text-base font-normal leading-6 text-text-brand-secondary hover:underline">
                Meridian Capital — Market licensing
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
