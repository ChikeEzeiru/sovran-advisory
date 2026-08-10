import type { Metadata } from "next"
import { Navbar } from "@/components/sections/Navbar"

export const metadata: Metadata = {
  title: "Communications & Stakeholder Engagement",
  description:
    "We design and execute stakeholder engagement programmes for complex transactions, regulatory processes, and multi-party negotiations across Africa.",
}
import { Footer } from "@/components/sections/Footer"
import { Button } from "@/components/ui/Button"

export default function CommunicationsExpertisePage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="px-12 pt-40 pb-24 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="border border-[#d0d6d8] rounded-[10px] px-3 py-1 self-start">
              <span className="text-base font-normal leading-6 text-[#67787c]">Expertise</span>
            </div>
            <h1 className="text-5xl font-medium leading-tight tracking-tight text-[#161b1d]">
              Communications & Stakeholder Engagement
            </h1>
            <p className="text-xl font-normal leading-8 text-[#4b585b] max-w-2xl">
              We design and execute stakeholder engagement programmes for complex transactions, regulatory processes, and multi-party negotiations.
            </p>
          </div>
        </section>

        <section className="px-12 pb-32 max-w-[1600px] mx-auto w-full">
          <div className="flex gap-16 items-start">
            <div className="flex-1 flex flex-col gap-8">
              <p className="text-lg font-normal leading-7 text-[#4b585b]">
                Placeholder copy. The most technically sound proposals fail when they cannot build the coalitions needed to move forward. Stakeholder engagement is not a communications exercise — it is a strategic one. It requires a clear thesis about who has the power to help or block, what each of them needs, and how to sequence the engagement.
              </p>
              <p className="text-lg font-normal leading-7 text-[#4b585b]">
                Our communications and stakeholder engagement practice is designed for exactly these situations: transactions, regulatory processes, and negotiations where the outcome depends on managing a complex web of interests.
              </p>
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-medium text-[#161b1d]">What this covers</h2>
                <ul className="flex flex-col gap-3">
                  {["Stakeholder mapping and analysis", "Engagement strategy and execution", "Public affairs and media relations", "Crisis communications", "Narrative development and messaging"].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base font-normal leading-6 text-[#4b585b]">
                      <span className="text-[#1a3d2e] mt-0.5">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <Button href="/contact" variant="primary" size="lg">Discuss an engagement</Button>
              </div>
            </div>
            <div className="w-72 shrink-0 flex flex-col gap-4 p-8 rounded-xl bg-[#e3e7e8]">
              <p className="text-sm font-medium uppercase tracking-wide text-[#67787c]">Related case studies</p>
              <a href="/case-studies/eagla-customs-standard" className="text-base font-normal leading-6 text-[#1a3d2e] hover:underline">
                EAGLA — Customs harmonisation across three authorities
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
