import type { Metadata } from "next"
import { Navbar } from "@/components/sections/Navbar"

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join a team working on Africa's most consequential advisory mandates. Explore open roles at Sovran.",
}
import { SiteFooter } from "@/components/sections/SiteFooter"
import { Button } from "@/components/ui/Button"

const ROLES = [
  {
    title: "Senior Associate, Policy & Government Relations",
    location: "Nairobi · Full-time",
    description: "We are looking for a senior associate to support client engagements in East Africa, with a focus on regulatory strategy and government relations.",
  },
  {
    title: "Associate, Digital & Technology Advisory",
    location: "Accra · Full-time",
    description: "This role will support our growing digital advisory practice across West Africa, working with clients on market entry, licensing, and technology policy.",
  },
  {
    title: "Analyst, Research & Intelligence",
    location: "Kigali · Full-time",
    description: "We are looking for a rigorous researcher to support our intelligence practice, producing analysis on political economy, regulation, and markets across Africa.",
  },
]

export default function CareersPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="px-12 pt-40 pb-24 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="self-start border border-border-primary rounded-[10px] px-3 py-1">
              <span className="text-base font-normal leading-6 text-text-quaternary">Careers</span>
            </div>
            <h1 className="text-5xl font-medium leading-tight tracking-tight text-text-primary">
              Join the team.
            </h1>
            <p className="text-xl font-normal leading-8 text-text-tertiary max-w-2xl">
              We are always looking for exceptional people who combine analytical rigour with a genuine understanding of how power works in African markets.
            </p>
          </div>
        </section>

        <section className="px-12 pb-32 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col gap-4">
            {ROLES.map((role) => (
              <div key={role.title} className="flex items-start justify-between gap-12 p-8 rounded-[2px] border border-border-primary">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold text-text-primary">{role.title}</h2>
                  <p className="text-sm font-normal text-text-quaternary">{role.location}</p>
                  <p className="text-base font-normal leading-6 text-text-tertiary mt-2">{role.description}</p>
                </div>
                <Button href="/contact" variant="secondary" size="md" showIcon={false} className="shrink-0">
                  Apply
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-[2px] bg-bg-quaternary">
            <div className="flex flex-col gap-3 max-w-xl">
              <h2 className="text-2xl font-semibold text-text-primary">Don&apos;t see the right role?</h2>
              <p className="text-base font-normal leading-6 text-text-tertiary">
                We recruit selectively and often ahead of need. If you believe you are a strong fit for the firm, send us a note.
              </p>
              <div className="mt-2">
                <Button href="/contact" variant="primary" size="md">Get in Touch</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
