import { Navbar } from "@/components/sections/Navbar"
import { SiteFooter } from "@/components/sections/SiteFooter"
import { InternalPageHero } from "@/components/sections/InternalPageHero"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "How Sovran Advisory collects, uses and protects information submitted through this website.",
  path: "/privacy",
})

export default function PrivacyPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <InternalPageHero
          eyebrow="Legal"
          title="Privacy Policy"
          meta="Last updated: July 2026"
        />

        <section className="mx-auto w-full max-w-400 px-12 pb-32 max-md:px-4 max-md:pb-16">
          <div className="flex max-w-3xl flex-col gap-10 max-md:gap-8">
            {[
              {
                heading: "1. Who we are",
                body: "Sovran Advisory is an advisory firm with offices in Lagos, Kigali, Accra and Nairobi. This policy explains how we collect, use and protect personal information.",
              },
              {
                heading: "2. What we collect",
                body: "We collect information you provide directly — such as your name, email address and organisation — when you contact us through our website or otherwise engage with us.",
              },
              {
                heading: "3. How we use it",
                body: "We use the information we collect to respond to your enquiry, provide advisory services and send relevant updates where you have indicated interest. We do not sell personal information to third parties.",
              },
              {
                heading: "4. How we protect it",
                body: "We take reasonable technical and organisational measures to protect personal information against loss, misuse and unauthorised access.",
              },
              {
                heading: "5. Your rights",
                body: "Depending on your location, you may have rights to access, correct or delete personal information we hold about you. To exercise these rights, please contact us at privacy@sovranadvisory.com.",
              },
              {
                heading: "6. Contact",
                body: "If you have questions about this policy, please write to us at privacy@sovranadvisory.com.",
              },
            ].map((section) => (
              <div key={section.heading} className="flex flex-col gap-3">
                <h2 className="text-xl max-md:text-lg max-md:leading-7 font-semibold text-text-primary ">{section.heading}</h2>
                <p className="text-base max-md:text-sm max-md:leading-5 font-normal leading-7 text-text-tertiary ">{section.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
