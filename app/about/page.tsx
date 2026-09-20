import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { AboutCareersSection } from "@/components/sections/AboutCareersSection";
import { AboutLeadershipSection } from "@/components/sections/AboutLeadershipSection";
import { AboutRegionalPresenceSection } from "@/components/sections/AboutRegionalPresenceSection";
import { AboutEvolutionSection } from "@/components/sections/AboutEvolutionSection";
import { AboutPointOfViewSection } from "@/components/sections/AboutPointOfViewSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Our African Advisory Firm",
  description:
    "Learn how Sovran combines local market knowledge, regional perspective and senior advisory experience across business and public institutions in Africa.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="px-12 pt-26 pb-16 max-md:px-4 max-md:pt-22 max-md:pb-12">
          <div
            data-theme="dark"
            className="relative mx-auto flex min-h-[calc(100svh-11.5rem)] w-full items-end overflow-hidden rounded-xs bg-bg-quaternary py-8 max-md:min-h-[70svh] max-md:py-6"
          >
            <Image
              src="/images/sovran photo - our storyII.avif"
              alt="A working city and its infrastructure seen from above."
              fill
              priority
              sizes="calc(100vw - 48px)"
              className="object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-b from-black/10 to-black/60"
            />

            <div className="relative mx-auto w-full max-w-400 px-8 max-md:px-4">
              <div className="flex max-w-214 flex-col items-start gap-2 text-white">
                <div className="rounded-xs border border-fg-brand-primary-alt px-3 py-1">
                  <p className="whitespace-nowrap text-base max-md:text-sm max-md:leading-5 leading-6">
                    About Us
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <h1 className="text-5xl max-md:text-4xl max-md:leading-11 font-medium leading-15 tracking-tight ">
                    We advise organisations making high-stakes decisions in
                    complex markets.
                  </h1>
                  <p className="text-xl max-md:text-lg max-md:leading-7 leading-7.5 ">
                    Since 2012, we have helped businesses, investors and public
                    institutions understand unfamiliar markets, make sound
                    strategic choices and turn those choices into practical
                    plans.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center">
          <div className="grid w-full max-w-400 grid-cols-2 gap-16 px-12 py-16 max-lg:grid-cols-1 max-lg:gap-10 max-md:px-4 max-md:py-12">
            <div className="flex flex-col gap-6 max-w-336">
              <h2 className="text-4xl max-md:text-3xl max-md:leading-9.5 font-medium leading-11 tracking-tight text-text-primary ">
                Our story{" "}
                <span className="text-text-quaternary">
                  started with market intelligence
                </span>
              </h2>
              <p className="text-xl max-md:text-lg max-md:leading-7 leading-7.5 text-text-tertiary ">
                Sovran began as a small market-intelligence practice. Our early
                work focused on helping clients understand new markets before
                committing capital, entering partnerships or expanding
                operations.
              </p>
            </div>

            <div className="flex flex-col gap-5 text-xl max-md:text-lg max-md:leading-7 leading-7.5 text-text-tertiary ">
              <p>
                But the questions rarely ended with the research. Clients needed
                to know what to do next, how to enter, who to work with, which
                institutions mattered and how to carry a decision through. So
                our work expanded with them.
              </p>
              <p>
                Today, that experience shapes how we approach every engagement:
                understand the market, make the right choices, navigate the
                institutions involved and support implementation.
              </p>
            </div>
          </div>
        </section>

        <AboutEvolutionSection />

        <AboutPointOfViewSection />

        <AboutLeadershipSection />

        <AboutRegionalPresenceSection />

        <AboutCareersSection />
      </main>
      <SiteFooter />
    </>
  );
}
