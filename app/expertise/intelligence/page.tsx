import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";

export const metadata: Metadata = {
  title: "Policy & Government Relations",
  description:
    "We help clients navigate complex regulatory and political environments across African markets — from licensing approvals to multilateral negotiations.",
};
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Button } from "@/components/ui/Button";

export default function PolicyExpertisePage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="px-12 pt-40 pb-24 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="border border-border-primary rounded-[10px] px-3 py-1">
                <span className="text-base font-normal leading-6 text-text-quaternary">
                  Expertise
                </span>
              </div>
            </div>
            <h1 className="text-5xl font-medium leading-tight tracking-tight text-text-primary">
              Policy & Government Relations
            </h1>
            <p className="text-xl font-normal leading-8 text-text-tertiary max-w-2xl">
              We help clients navigate complex regulatory and political
              environments across African markets — from licensing approvals to
              multilateral negotiations.
            </p>
          </div>
        </section>

        <section className="px-12 pb-32 max-w-[1600px] mx-auto w-full">
          <div className="flex gap-16 items-start">
            <div className="flex-1 flex flex-col gap-8">
              <p className="text-lg font-normal leading-7 text-text-tertiary">
                Placeholder copy. Regulatory and political environments in
                African markets are often more nuanced than standard frameworks
                account for. Formal processes interact with informal systems of
                influence. Decisions that look technical are frequently
                political. Timelines that appear fixed are often negotiable —
                and vice versa.
              </p>
              <p className="text-lg font-normal leading-7 text-text-tertiary">
                Our policy and government relations practice is built around
                understanding this complexity, and helping clients work within
                it rather than around it.
              </p>
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-text-primary">
                  What this covers
                </h2>
                <ul className="flex flex-col gap-3">
                  {[
                    "Regulatory mapping and licensing strategy",
                    "Government relations and stakeholder engagement",
                    "Political economy assessments",
                    "Multilateral and regional negotiations",
                    "Compliance and risk advisory",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-base font-normal leading-6 text-text-tertiary"
                    >
                      <span className="text-text-brand-secondary mt-0.5">
                        —
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <Button href="/contact" variant="primary" size="lg">
                  Discuss an engagement
                </Button>
              </div>
            </div>
            <div className="w-72 shrink-0 flex flex-col gap-4 p-8 rounded-xs bg-bg-quaternary">
              <p className="text-sm font-medium uppercase tracking-wide text-text-quaternary">
                Related case studies
              </p>
              <a
                href="/case-studies/gdfc-infrastructure-loan"
                className="text-base font-normal leading-6 text-text-brand-secondary hover:underline"
              >
                GDFC — $200M infrastructure loan
              </a>
              <a
                href="/case-studies/eagla-customs-standard"
                className="text-base font-normal leading-6 text-text-brand-secondary hover:underline"
              >
                EAGLA — Customs harmonisation
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
