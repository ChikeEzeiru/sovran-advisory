import { Navbar } from "@/components/sections/Navbar"
import { SiteFooter } from "@/components/sections/SiteFooter"

export default function EaglaCaseStudyPage() {
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
                <span className="text-base font-normal leading-6 text-text-quaternary">Public Sector</span>
              </div>
            </div>
            <h1 className="text-5xl font-medium leading-tight tracking-tight text-text-primary">
              Three customs authorities aligned on a shared standard in ten months, against a multilateral estimate of three to five years.
            </h1>
          </div>
        </section>

        <section className="px-12 pb-32 max-w-[1600px] mx-auto w-full">
          <div className="flex gap-16 items-start">
            <div className="flex-1 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-text-primary">The situation</h2>
                <p className="text-lg font-normal leading-7 text-text-tertiary">
                  Placeholder copy. Three customs authorities in the region had been attempting to align on a shared digital standard for years. Multilateral estimates put full alignment at three to five years away. A regional integration body retained us to assess whether the timeline could be compressed.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-text-primary">What we did</h2>
                <p className="text-lg font-normal leading-7 text-text-tertiary">
                  Placeholder copy. We diagnosed the underlying political obstacles — which had been misidentified as technical disagreements — and restructured the negotiation process. We facilitated a series of working sessions among the three authorities and their ministers, and helped design a standard that addressed each party&apos;s core concerns.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-text-primary">The outcome</h2>
                <p className="text-lg font-normal leading-7 text-text-tertiary">
                  Placeholder copy. All three authorities formally adopted the shared standard in ten months. Implementation is now underway.
                </p>
              </div>
            </div>
            <div className="w-72 shrink-0 flex flex-col gap-6 p-8 rounded-xl bg-bg-quaternary">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium uppercase tracking-wide text-text-quaternary">Client</p>
                <p className="text-base font-normal text-text-primary">EAGLA</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium uppercase tracking-wide text-text-quaternary">Sector</p>
                <p className="text-base font-normal text-text-primary">Public Sector</p>
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
