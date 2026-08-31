import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Sovran",
  description:
    "Built for decisions that cannot be separated from their context.",
};

const STEPS = [
  [
    "01",
    "Frame the decision",
    "Agree what must be decided, by whom and by when.",
  ],
  [
    "02",
    "Build the right picture",
    "Gather market, commercial, institutional and operational evidence.",
  ],
  [
    "03",
    "Make choices visible",
    "Set out options, trade-offs and conditions for success.",
  ],
  [
    "04",
    "Work alongside the team",
    "Move from recommendation to delivery with clear ownership.",
  ],
];

export default function AboutPage() {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="px-12 pt-26 pb-16 max-md:px-6 max-md:pt-26 max-md:pb-12">
          <div
            data-theme="dark"
            className="relative mx-auto flex min-h-[calc(100svh-11.5rem)] w-full items-end overflow-hidden rounded-xs bg-bg-quaternary py-8 max-md:min-h-[70svh]"
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

            <div className="relative mx-auto w-full max-w-400 px-8 max-md:px-6">
              <div className="flex max-w-214 flex-col items-start gap-2 text-white">
                <div className="rounded-xs border border-fg-brand-primary-alt px-3 py-1">
                  <p className="whitespace-nowrap text-base leading-6">
                    About Us
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <h1 className="text-5xl font-medium leading-15 tracking-tight max-md:text-4xl max-md:leading-11">
                    We advise organisations making high-stakes decisions in
                    complex markets.
                  </h1>
                  <p className="text-xl leading-7.5">
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

        <section className="grid w-full grid-cols-2 gap-16 px-12 py-16 max-lg:grid-cols-1 max-lg:gap-10">
          <div className="flex flex-col gap-6 max-w-336">
            <h2 className="text-4xl font-medium leading-11 tracking-tight text-text-primary">
              Our story{" "}
              <span className="text-text-quaternary">
                started with market intelligence
              </span>
            </h2>
            <p className="text-xl leading-7.5 text-text-tertiary">
              Sovran began as a small market-intelligence practice. Our early
              work focused on helping clients understand new markets before
              committing capital, entering partnerships or expanding operations.
            </p>
          </div>

          <div className="flex flex-col gap-5 text-xl leading-7.5 text-text-tertiary">
            <p>
              But the questions rarely ended with the research. Clients needed
              to know what to do next, how to enter, who to work with, which
              institutions mattered and how to carry a decision through. So our
              work expanded with them.
            </p>
            <p>
              Today, that experience shapes how we approach every engagement:
              understand the market, make the right choices, navigate the
              institutions involved and support implementation.
            </p>
          </div>
        </section>

        <section className="bg-bg-primary">
          <div className="mx-auto grid w-full max-w-400 grid-cols-2 gap-6 px-12 py-24 max-lg:grid-cols-1 max-md:px-6 max-md:py-16">
            <div className="relative min-h-160 overflow-hidden rounded-xs bg-bg-quaternary max-lg:min-h-112">
              <Image
                src="/images/sovran photo - partners & intitutional rshps.avif"
                alt="A city district shaped by transport, civic and commercial infrastructure."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between gap-12 px-6 py-4 max-md:px-0">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-text-quaternary">
                  How we work
                </p>
                <h2 className="mt-3 text-3xl font-medium leading-9 tracking-tight text-text-primary">
                  Clear decisions, made useful.
                </h2>
              </div>
              <ol className="border-t border-border-primary">
                {STEPS.map(([number, title, copy]) => (
                  <li
                    key={number}
                    className="grid grid-cols-[3rem_1fr] gap-4 border-b border-border-primary py-5"
                  >
                    <span className="text-sm text-text-quaternary">
                      {number}
                    </span>
                    <div>
                      <h3 className="text-xl font-medium text-text-secondary">
                        {title}
                      </h3>
                      <p className="mt-1 text-base leading-6 text-text-tertiary">
                        {copy}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-400 items-end justify-between gap-8 px-12 py-24 max-md:flex-col max-md:items-start max-md:px-6 max-md:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-text-quaternary">
              Leadership
            </p>
            <h2 className="mt-3 text-3xl font-medium leading-9 tracking-tight text-text-primary">
              Experience across markets, institutions and delivery.
            </h2>
          </div>
          <Button href="/leadership" variant="secondary" size="lg">
            Meet the leadership team
          </Button>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
