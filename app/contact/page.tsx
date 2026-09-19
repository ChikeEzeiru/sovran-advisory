import { Globe05 } from "@untitledui/icons";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/sections/Footer";
import { InternalPageHero } from "@/components/sections/InternalPageHero";
import { Navbar } from "@/components/sections/Navbar";
import { FeaturedIcon } from "@/components/ui/FeaturedIcon";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact Our Advisory Team",
  description:
    "Contact Sovran about a market decision, investment, institutional challenge or delivery programme in Africa. Our team responds within two business days.",
  path: "/contact",
});

const NEXT_STEPS = [
  "We review your enquiry and route it to the most relevant team.",
  "A member of our team responds within two business days.",
  "The initial conversation is confidential and carries no obligation.",
];

export default function ContactPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <InternalPageHero
          eyebrow="Contact Us"
          title="Start a conversation with Sovran."
          intro="Tell us about the decision or programme, the market involved and where you need support. A member of our team will respond within two business days."
          align="center"
          spacing="compact"
        />

        <section className="px-12 pb-24 max-md:px-4 max-md:pb-16">
          <div className="mx-auto flex w-full max-w-295 items-start gap-16 max-lg:flex-col-reverse max-lg:gap-12">
            <aside className="w-96 shrink-0 max-lg:w-full">
              <div className="border-t border-border-secondary pt-8">
                <h2 className="text-2xl font-medium leading-8 tracking-tight text-text-primary">
                  What happens next
                </h2>
                <ol className="mt-4 flex flex-col gap-3">
                  {NEXT_STEPS.map((step, index) => (
                    <li key={step} className="grid grid-cols-[auto_1fr] gap-2">
                      <span className="text-base leading-6 text-text-secondary">
                        {index + 1}.
                      </span>
                      <p className="text-base leading-6 text-text-tertiary">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-8 border-t border-border-secondary pt-8">
                <div className="rounded-xs border border-border-secondary bg-bg-secondary p-6 shadow-xs">
                  <FeaturedIcon className="max-md:size-8">
                    <Globe05 aria-hidden="true" className="size-6 max-md:size-4" />
                  </FeaturedIcon>
                  <h3 className="mt-3 text-xl font-medium leading-7.5 tracking-tight text-text-primary max-md:text-base max-md:leading-6">
                    Where we work
                  </h3>
                  <p className="mt-3 text-base leading-6 text-text-tertiary max-md:text-sm max-md:leading-5">
                    Lagos <span className="mx-2 text-text-quaternary">·</span>
                    Kigali <span className="mx-2 text-text-quaternary">·</span>
                    Accra <span className="mx-2 text-text-quaternary">·</span>
                    Nairobi
                  </p>
                </div>
              </div>
            </aside>

            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
