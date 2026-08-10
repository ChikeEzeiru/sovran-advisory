import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Selected engagements across our markets — from infrastructure finance and regulatory licensing to customs harmonisation and stakeholder strategy.",
}
import { Navbar } from "@/components/sections/Navbar"
import { Footer } from "@/components/sections/Footer"

const CASES = [
  {
    category: "Development Finance",
    client: "GDFC",
    title: "Political economy risk assessment cleared a $200M infrastructure loan for disbursement on schedule.",
    href: "/case-studies/gdfc-infrastructure-loan",
  },
  {
    category: "Financial Services",
    client: "Meridian Capital",
    title: 'Licensed in two markets within an eighteen-month window their own regulatory counsel called “agressive but not impossible.”',
    href: "/case-studies/meridian-capital-licensing",
  },
  {
    category: "Public Sector",
    client: "EAGLA",
    title: "Three customs authorities aligned on a shared standard in ten months, against a multilateral estimate of three to five years.",
    href: "/case-studies/eagla-customs-standard",
  },
]

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="px-12 pt-40 pb-24 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="self-start border border-[#d0d6d8] rounded-[10px] px-3 py-1">
              <span className="text-base font-normal leading-6 text-[#67787c]">Case Studies</span>
            </div>
            <h1 className="text-5xl font-medium leading-tight tracking-tight text-[#161b1d]">
              Selected engagements across our markets.
            </h1>
            <p className="text-xl font-normal leading-8 text-[#4b585b] max-w-2xl">
              A record of what we have helped our clients achieve.
            </p>
          </div>
        </section>

        <section className="px-12 pb-32 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col gap-4">
            {CASES.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group flex items-start justify-between gap-12 p-8 rounded-xl bg-[#e3e7e8] hover:bg-[#d8dede] transition-colors duration-200"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-normal text-[#67787c]">{c.category}</span>
                    <span className="text-[#d0d6d8]">·</span>
                    <span className="text-sm font-normal text-[#67787c]">{c.client}</span>
                  </div>
                  <p className="text-xl font-normal leading-7 text-[#4b585b]">{c.title}</p>
                </div>
                <span className="shrink-0 text-[#1a3d2e] font-medium text-sm mt-1 group-hover:underline">Read more →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
