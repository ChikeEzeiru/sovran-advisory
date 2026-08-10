import { Navbar } from "@/components/sections/Navbar"
import { Footer } from "@/components/sections/Footer"

export default function MeridianCaseStudyPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="px-12 pt-40 pb-24 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="border border-[#d0d6d8] rounded-[10px] px-3 py-1">
                <span className="text-base font-normal leading-6 text-[#67787c]">Case Study</span>
              </div>
              <div className="border border-[#d0d6d8] rounded-[10px] px-3 py-1">
                <span className="text-base font-normal leading-6 text-[#67787c]">Financial Services</span>
              </div>
            </div>
            <h1 className="text-5xl font-medium leading-tight tracking-tight text-[#161b1d]">
              Licensed in two markets within an eighteen-month window their own regulatory counsel called &ldquo;aggressive but not impossible.&rdquo;
            </h1>
          </div>
        </section>

        <section className="px-12 pb-32 max-w-[1600px] mx-auto w-full">
          <div className="flex gap-16 items-start">
            <div className="flex-1 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-medium text-[#161b1d]">The situation</h2>
                <p className="text-lg font-normal leading-7 text-[#4b585b]">
                  Placeholder copy. A financial services institution needed to obtain regulatory licences in two African markets within an aggressive timeline set by a board mandate. Their internal legal team had estimated the process would take three to four years. The board wanted it done in eighteen months.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-medium text-[#161b1d]">What we did</h2>
                <p className="text-lg font-normal leading-7 text-[#4b585b]">
                  Placeholder copy. We mapped the regulatory approval process in both markets, identified the informal and formal requirements, and structured a concurrent approach to both licensing processes. We managed all regulator relationships directly and coordinated with the client&apos;s legal teams throughout.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-medium text-[#161b1d]">The outcome</h2>
                <p className="text-lg font-normal leading-7 text-[#4b585b]">
                  Placeholder copy. Both licences were obtained within the eighteen-month window. The client was operational in both markets ahead of schedule.
                </p>
              </div>
            </div>
            <div className="w-72 shrink-0 flex flex-col gap-6 p-8 rounded-xl bg-[#e3e7e8]">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium uppercase tracking-wide text-[#67787c]">Client</p>
                <p className="text-base font-normal text-[#161b1d]">Meridian Capital</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium uppercase tracking-wide text-[#67787c]">Sector</p>
                <p className="text-base font-normal text-[#161b1d]">Financial Services</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium uppercase tracking-wide text-[#67787c]">Practice</p>
                <p className="text-base font-normal text-[#161b1d]">Policy & Government Relations</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
