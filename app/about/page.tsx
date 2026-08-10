import type { Metadata } from "next"
import { Navbar } from "@/components/sections/Navbar"

export const metadata: Metadata = {
  title: "About the Firm",
  description:
    "Sovran is an Africa-focused advisory firm. Learn about who we are, how we work, and where we operate.",
}
import { Footer } from "@/components/sections/Footer"

export default function AboutPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="px-12 pt-40 pb-24 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="self-start border border-[#d0d6d8] rounded-[10px] px-3 py-1">
              <span className="text-base font-normal leading-6 text-[#67787c]">About</span>
            </div>
            <h1 className="text-5xl font-medium leading-tight tracking-tight text-[#161b1d]">
              Built for the complexity of African markets.
            </h1>
            <p className="text-xl font-normal leading-8 text-[#4b585b] max-w-2xl">
              Sovran Advisory was founded on a simple premise: that organisations operating in Africa&apos;s most consequential markets deserve counsel that is rigorous, contextual, and genuinely accountable to results.
            </p>
          </div>
        </section>

        <section className="px-12 pb-24 max-w-[1600px] mx-auto w-full">
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-medium tracking-tight text-[#161b1d]">Our approach</h2>
              <p className="text-lg font-normal leading-7 text-[#4b585b]">
                We combine deep political economy expertise with sector-specific knowledge across financial services, infrastructure, digital, and public policy. Our engagements are designed to move governments, regulators, and markets — not just advise them.
              </p>
              <p className="text-lg font-normal leading-7 text-[#4b585b]">
                Every mandate begins with a clear thesis: what outcome is achievable, what stands in the way, and who has the power to change it. We test that thesis constantly as we work.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-medium tracking-tight text-[#161b1d]">Where we operate</h2>
              <p className="text-lg font-normal leading-7 text-[#4b585b]">
                Our primary markets span East, West, and Southern Africa, with offices in Kigali, Accra, and Nairobi. We work across the continent where our clients need us.
              </p>
              <p className="text-lg font-normal leading-7 text-[#4b585b]">
                Our relationships with policymakers, regulators, and institutional investors are built over years — not assembled for a single engagement.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
