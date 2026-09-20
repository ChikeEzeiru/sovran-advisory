import { Navbar } from "@/components/sections/Navbar"
import { SiteFooter } from "@/components/sections/SiteFooter"
import { InternalPageHero } from "@/components/sections/InternalPageHero"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Terms of Use",
  description: "The terms governing access to and use of the Sovran Advisory website and its published content.",
  path: "/terms",
})

export default function TermsPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <InternalPageHero
          eyebrow="Legal"
          title="Terms of Use"
          meta="Last updated: July 2026"
        />

        <section className="mx-auto w-full max-w-400 px-12 pb-32 max-md:px-4 max-md:pb-16">
          <div className="flex max-w-3xl flex-col gap-10 max-md:gap-8">
            {[
              {
                heading: "1. Use of this website",
                body: "By using this website, you agree to these terms. If you do not agree, please do not use the website.",
              },
              {
                heading: "2. Intellectual property",
                body: "The content on this website — including text, graphics and logos — is owned by Sovran Advisory and is protected by applicable intellectual property laws. You may not reproduce or distribute it without our permission.",
              },
              {
                heading: "3. No advisory relationship",
                body: "The content on this website is for informational purposes only and does not constitute professional advice. No advisory relationship is formed by your use of this website.",
              },
              {
                heading: "4. Limitation of liability",
                body: "Sovran Advisory is not liable for any loss or damage arising from your use of this website or reliance on its content.",
              },
              {
                heading: "5. Links to third-party sites",
                body: "This website may contain links to external websites. We are not responsible for the content or practices of those sites.",
              },
              {
                heading: "6. Changes to these terms",
                body: "We may update these terms from time to time. Continued use of the website constitutes acceptance of the updated terms.",
              },
              {
                heading: "7. Contact",
                body: "If you have questions about these terms, please contact us at legal@sovranadvisory.com.",
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
