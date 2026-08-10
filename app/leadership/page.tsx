import type { Metadata } from "next"
import { Navbar } from "@/components/sections/Navbar"

export const metadata: Metadata = {
  title: "Leadership & Team",
  description:
    "Meet the people who lead Sovran's practice areas and run our client engagements across Africa.",
}
import { Footer } from "@/components/sections/Footer"

const TEAM = [
  {
    name: "Placeholder Name",
    title: "Managing Partner",
    bio: "Placeholder bio. This team member leads the firm's advisory practice across East Africa with a background in public policy and development finance.",
  },
  {
    name: "Placeholder Name",
    title: "Partner, West Africa",
    bio: "Placeholder bio. Based in Accra, this partner oversees the firm's engagements in Ghana, Nigeria, and the broader ECOWAS region.",
  },
  {
    name: "Placeholder Name",
    title: "Partner, Digital & Technology",
    bio: "Placeholder bio. This partner leads the firm's digital advisory practice, advising governments and corporates on technology regulation and digital market entry.",
  },
  {
    name: "Placeholder Name",
    title: "Director, Policy & Government Relations",
    bio: "Placeholder bio. Fifteen years of experience working at the intersection of government and business in Sub-Saharan Africa.",
  },
  {
    name: "Placeholder Name",
    title: "Director, Communications",
    bio: "Placeholder bio. Specialist in stakeholder engagement and communications strategy for complex multi-party transactions.",
  },
  {
    name: "Placeholder Name",
    title: "Associate, Strategy",
    bio: "Placeholder bio. Supports the firm's market and corporate strategy practice across the continent.",
  },
]

export default function LeadershipPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="px-12 pt-40 pb-24 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="self-start border border-[#d0d6d8] rounded-[10px] px-3 py-1">
              <span className="text-base font-normal leading-6 text-[#67787c]">Leadership & Team</span>
            </div>
            <h1 className="text-5xl font-medium leading-tight tracking-tight text-[#161b1d]">
              The people behind the work.
            </h1>
            <p className="text-xl font-normal leading-8 text-[#4b585b] max-w-2xl">
              Our team brings together decades of experience in policy, finance, and markets across the African continent.
            </p>
          </div>
        </section>

        <section className="px-12 pb-32 max-w-[1600px] mx-auto w-full">
          <div className="grid grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div key={member.name + member.title} className="flex flex-col gap-4 p-8 rounded-xl bg-[#e3e7e8]">
                <div className="w-16 h-16 rounded-full bg-[#d0d6d8]" aria-hidden />
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-medium text-[#161b1d]">{member.name}</p>
                  <p className="text-sm font-normal text-[#67787c]">{member.title}</p>
                </div>
                <p className="text-base font-normal leading-6 text-[#4b585b]">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
