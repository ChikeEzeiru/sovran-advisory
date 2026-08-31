import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { PerspectivesIndex } from "@/components/sections/PerspectivesIndex";

export const metadata: Metadata = {
  title: "Perspectives",
  description:
    "Short, useful analysis for people making decisions across changing markets.",
};

export default function PerspectivesPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="mx-auto w-full max-w-400 px-12 pt-24 pb-16 max-md:px-6 max-md:pt-20">
          <div className="flex max-w-3xl flex-col items-start gap-4">
            <div className="rounded-xs border border-border-secondary bg-bg-secondary px-3 py-1">
              <p className="text-base leading-6 text-text-tertiary">
                Perspectives
              </p>
            </div>
            <div>
              <h1 className="text-5xl font-medium leading-15 tracking-tight text-text-primary max-md:text-4xl max-md:leading-11 text-balance">
                Understanding what is changing, and what it means.
              </h1>
              <p className="mt-4 text-xl leading-7.5 text-text-tertiary text-balance">
                Analysis and perspectives on the market, regulatory,
                infrastructure and competitive shifts affecting businesses,
                investors and public institutions.
              </p>
            </div>
          </div>
        </section>
        <PerspectivesIndex />
      </main>
      <SiteFooter />
    </>
  );
}
