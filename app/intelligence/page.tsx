import type { Metadata } from "next"
import { Navbar } from "@/components/sections/Navbar"

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Sovran's Insights series draws on active engagements and primary research to surface what is actually happening in the markets we cover.",
}
import { Footer } from "@/components/sections/Footer"

const ARTICLES = [
  {
    category: "Policy",
    date: "July 2026",
    title: "The regulatory outlook for pan-African financial services in 2026",
    excerpt: "A synthesis of regulatory signals across twelve markets, and what they mean for institutions seeking to scale.",
  },
  {
    category: "Digital",
    date: "June 2026",
    title: "Data localisation mandates: mapping the compliance landscape",
    excerpt: "An operational guide to data sovereignty requirements across East and West Africa.",
  },
  {
    category: "Markets",
    date: "May 2026",
    title: "Infrastructure capital flows: where the gaps are and why",
    excerpt: "An analysis of the structural barriers preventing private capital from reaching infrastructure projects at scale.",
  },
  {
    category: "Policy",
    date: "April 2026",
    title: "Customs harmonisation and the political economy of regional trade",
    excerpt: "A frank assessment of what it takes to align standards across borders — and the obstacles that persist.",
  },
  {
    category: "Digital",
    date: "March 2026",
    title: "Licensing timelines: the hidden cost of market entry",
    excerpt: "Data from twenty-four licensing processes across eight markets, with lessons for how to move faster.",
  },
  {
    category: "Markets",
    date: "February 2026",
    title: "What political transitions mean for foreign-invested projects",
    excerpt: "A framework for assessing continuity risk and structuring engagements that survive changes in government.",
  },
]

export default function IntelligencePage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="px-12 pt-40 pb-24 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="self-start border border-[#d0d6d8] rounded-[10px] px-3 py-1">
              <span className="text-base font-normal leading-6 text-[#67787c]">Insights</span>
            </div>
            <h1 className="text-5xl font-medium leading-tight tracking-tight text-[#161b1d]">
              Research and analysis from the field.
            </h1>
            <p className="text-xl font-normal leading-8 text-[#4b585b] max-w-2xl">
              Our Insights series draws on active engagements and primary research to surface what is actually happening in the markets we cover.
            </p>
          </div>
        </section>

        <section className="px-12 pb-32 max-w-[1600px] mx-auto w-full">
          <div className="grid grid-cols-2 gap-6">
            {ARTICLES.map((article) => (
              <div key={article.title} className="flex flex-col gap-4 p-8 rounded-xl border border-[#d0d6d8]">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-normal text-[#67787c]">{article.category}</span>
                  <span className="text-[#d0d6d8]">·</span>
                  <span className="text-sm font-normal text-[#67787c]">{article.date}</span>
                </div>
                <h2 className="text-xl font-medium leading-7 text-[#161b1d]">{article.title}</h2>
                <p className="text-base font-normal leading-6 text-[#4b585b]">{article.excerpt}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
