import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { InternalPageHero } from "@/components/sections/InternalPageHero";
import { ConditionalLink } from "@/components/ui/ConditionalLink";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Legal",
  description: "Sovran Advisory legal information, privacy policy and terms of use.",
  path: "/legal",
});

const DOCUMENTS = [
  {
    title: "Privacy Policy",
    description: "How information submitted through this conceptual website is described and handled.",
    href: "/privacy",
  },
  {
    title: "Terms of Use",
    description: "The terms that govern access to and use of the Sovran Advisory website.",
    href: "/terms",
  },
];

export default function LegalPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <InternalPageHero
          eyebrow="Legal"
          title="Legal information and policies."
          intro="Review the policies that govern this conceptual website and explain how information is treated."
        />
        <section className="mx-auto grid w-full max-w-400 grid-cols-2 gap-6 px-12 pb-24 max-md:grid-cols-1 max-md:px-4 max-md:pb-16">
          {DOCUMENTS.map((document) => (
            <ConditionalLink
              key={document.href}
              href={document.href}
              className="group flex min-h-72 flex-col justify-between rounded-xs border border-border-primary bg-bg-primary p-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current max-md:min-h-56 max-md:p-6"
            >
              <p className="text-sm max-md:text-xs max-md:leading-4 font-medium uppercase tracking-wider text-text-quaternary">Policy</p>
              <div>
                <h2 className="text-2xl max-md:text-xl max-md:leading-7.5 font-medium leading-8 tracking-tight text-text-secondary group-hover:text-text-brand-secondary">{document.title}</h2>
                <p className="mt-3 max-w-xl text-base max-md:text-sm max-md:leading-5 leading-6 text-text-tertiary">{document.description}</p>
              </div>
              <p className="text-sm max-md:text-xs max-md:leading-4 font-medium text-text-tertiary group-hover:text-text-brand-secondary">Read {document.title}</p>
            </ConditionalLink>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
