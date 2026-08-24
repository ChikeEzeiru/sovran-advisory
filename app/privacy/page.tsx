import { Navbar } from "@/components/sections/Navbar"
import { SiteFooter } from "@/components/sections/SiteFooter"

export default function PrivacyPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="px-12 pt-40 pb-24 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="self-start border border-border-primary rounded-[10px] px-3 py-1">
              <span className="text-base font-normal leading-6 text-text-quaternary">Legal</span>
            </div>
            <h1 className="text-5xl font-medium leading-tight tracking-tight text-text-primary">
              Privacy Policy
            </h1>
            <p className="text-base font-normal leading-6 text-text-quaternary">Last updated: July 2026</p>
          </div>
        </section>

        <section className="px-12 pb-32 max-w-[1600px] mx-auto w-full">
          <div className="max-w-3xl flex flex-col gap-10">
            {[
              {
                heading: "1. Who we are",
                body: "Placeholder copy. Sovran Advisory is an advisory firm with offices in Kigali, Accra, and Nairobi. This policy explains how we collect, use, and protect personal information.",
              },
              {
                heading: "2. What we collect",
                body: "Placeholder copy. We collect information you provide directly — such as your name, email address, and organisation — when you contact us through our website or otherwise engage with us.",
              },
              {
                heading: "3. How we use it",
                body: "Placeholder copy. We use the information we collect to respond to your enquiry, to provide advisory services, and to send relevant updates where you have indicated interest. We do not sell personal information to third parties.",
              },
              {
                heading: "4. How we protect it",
                body: "Placeholder copy. We take reasonable technical and organisational measures to protect personal information against loss, misuse, and unauthorised access.",
              },
              {
                heading: "5. Your rights",
                body: "Placeholder copy. Depending on your location, you may have rights to access, correct, or delete personal information we hold about you. To exercise these rights, please contact us at privacy@sovranadvisory.com.",
              },
              {
                heading: "6. Contact",
                body: "Placeholder copy. If you have questions about this policy, please write to us at privacy@sovranadvisory.com.",
              },
            ].map((section) => (
              <div key={section.heading} className="flex flex-col gap-3">
                <h2 className="text-xl font-semibold text-text-primary">{section.heading}</h2>
                <p className="text-base font-normal leading-7 text-text-tertiary">{section.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
