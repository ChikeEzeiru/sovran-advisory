import { Navbar } from "@/components/sections/Navbar"
import { Footer } from "@/components/sections/Footer"

export default function TermsPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="px-12 pt-40 pb-24 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="self-start border border-[#d0d6d8] rounded-[10px] px-3 py-1">
              <span className="text-base font-normal leading-6 text-[#67787c]">Legal</span>
            </div>
            <h1 className="text-5xl font-medium leading-tight tracking-tight text-[#161b1d]">
              Terms of Use
            </h1>
            <p className="text-base font-normal leading-6 text-[#67787c]">Last updated: July 2026</p>
          </div>
        </section>

        <section className="px-12 pb-32 max-w-[1600px] mx-auto w-full">
          <div className="max-w-3xl flex flex-col gap-10">
            {[
              {
                heading: "1. Use of this website",
                body: "Placeholder copy. By using this website, you agree to these terms. If you do not agree, please do not use the website.",
              },
              {
                heading: "2. Intellectual property",
                body: "Placeholder copy. The content on this website — including text, graphics, and logos — is owned by Sovran Advisory and is protected by applicable intellectual property laws. You may not reproduce or distribute it without our permission.",
              },
              {
                heading: "3. No advisory relationship",
                body: "Placeholder copy. The content on this website is for informational purposes only and does not constitute professional advice. No advisory relationship is formed by your use of this website.",
              },
              {
                heading: "4. Limitation of liability",
                body: "Placeholder copy. Sovran Advisory is not liable for any loss or damage arising from your use of this website or reliance on its content.",
              },
              {
                heading: "5. Links to third-party sites",
                body: "Placeholder copy. This website may contain links to external websites. We are not responsible for the content or practices of those sites.",
              },
              {
                heading: "6. Changes to these terms",
                body: "Placeholder copy. We may update these terms from time to time. Continued use of the website constitutes acceptance of the updated terms.",
              },
              {
                heading: "7. Contact",
                body: "Placeholder copy. If you have questions about these terms, please contact us at legal@sovranadvisory.com.",
              },
            ].map((section) => (
              <div key={section.heading} className="flex flex-col gap-3">
                <h2 className="text-xl font-medium text-[#161b1d]">{section.heading}</h2>
                <p className="text-base font-normal leading-7 text-[#4b585b]">{section.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
