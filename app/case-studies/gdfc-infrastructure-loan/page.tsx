import { Navbar } from "@/components/sections/Navbar"
import { SiteFooter } from "@/components/sections/SiteFooter"

export default function GDFCCaseStudyPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="px-12 pt-40 pb-24 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="border border-border-primary rounded-[10px] px-3 py-1">
                <span className="text-base font-normal leading-6 text-text-quaternary">Case Study</span>
              </div>
              <div className="border border-border-primary rounded-[10px] px-3 py-1">
                <span className="text-base font-normal leading-6 text-text-quaternary">Development Finance</span>
              </div>
            </div>
            <h1 className="text-5xl font-medium leading-tight tracking-tight text-text-primary">
              Political economy risk assessment cleared a $200M infrastructure loan for disbursement on schedule.
            </h1>
          </div>
        </section>

        <section className="px-12 pb-32 max-w-[1600px] mx-auto w-full">
          <div className="flex gap-16 items-start">
            <div className="flex-1 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-text-primary">The situation</h2>
                <p className="text-lg font-normal leading-7 text-text-tertiary">
                  Placeholder copy. A development finance institution faced significant uncertainty around the political and regulatory environment in the target market. Previous assessments had flagged risks without providing actionable analysis that the credit committee could act on.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-text-primary">What we did</h2>
                <p className="text-lg font-normal leading-7 text-text-tertiary">
                  Placeholder copy. We conducted a structured political economy assessment over six weeks, mapping the key stakeholders with influence over the project, their interests, and the conditions under which the project would or would not proceed. We then worked with the client to design mitigations and a stakeholder engagement programme.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-text-primary">The outcome</h2>
                <p className="text-lg font-normal leading-7 text-text-tertiary">
                  Placeholder copy. The credit committee approved disbursement. The loan closed on schedule, with the stakeholder engagement programme already underway.
                </p>
              </div>
            </div>
            <div className="w-72 shrink-0 flex flex-col gap-6 p-8 rounded-xl bg-bg-quaternary">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium uppercase tracking-wide text-text-quaternary">Client</p>
                <p className="text-base font-normal text-text-primary">GDFC</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium uppercase tracking-wide text-text-quaternary">Sector</p>
                <p className="text-base font-normal text-text-primary">Development Finance</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium uppercase tracking-wide text-text-quaternary">Practice</p>
                <p className="text-base font-normal text-text-primary">Policy & Government Relations</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
