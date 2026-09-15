"use client";

import Image from "next/image";
import { useState } from "react";

const CLIENT_REASONS = [
  {
    title: ["Entering a", "new market"],
    copy: "Understanding the opportunity, the institutions and the path in.",
    image: "/images/expertise/why us 1.avif",
  },
  {
    title: ["Responding to", "policy change"],
    copy: "Working out what has changed, what it means and what to do next.",
    image: "/images/expertise/why us 2.avif",
  },
  {
    title: ["Setting a", "new direction"],
    copy: "Assembling judgement and evidence around a well-defined plan of action.",
    image: "/images/expertise/why us 3.avif",
  },
  {
    title: ["Managing", "transformation"],
    copy: "Connecting strategy, technology and organisational realities.",
    image: "/images/expertise/why us 4.avif",
  },
  {
    title: ["Navigating a", "sensitive issue"],
    copy: "Understanding the stakeholders, risks and communications around it.",
    image: "/images/expertise/why us 5.avif",
  },
];

const CARD_TRANSITION =
  "transition-[flex-grow,opacity] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none";

export function ExpertiseWhyUsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="client-reasons-heading"
      className="bg-neutral-900 py-20"
      data-theme="dark"
    >
      <div className="mx-auto flex w-full max-w-400 flex-col gap-16 px-12 max-md:gap-10 max-md:px-6">
        <div className="flex max-w-3xl flex-col gap-4">
          <h2
            id="client-reasons-heading"
            className="text-4xl font-medium leading-11 tracking-tight text-text-primary max-md:text-3xl max-md:leading-9"
          >
            Why Clients come to us
          </h2>
          <p className="text-xl leading-7.5 text-text-tertiary">
            Clients usually come to us when the answer is not obvious, the
            environment is changing or a decision carries consequences beyond
            the immediate problem.
          </p>
        </div>

        <div
          className="@container relative"
          onPointerLeave={() => setActiveIndex(null)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setActiveIndex(null);
            }
          }}
        >
          <ul
            className="flex gap-0.5 overflow-x-auto pb-2 xl:h-80 xl:overflow-hidden xl:pb-0"
            style={{ scrollbarWidth: "none" }}
          >
            {CLIENT_REASONS.map((reason, index) => {
              const isActive = activeIndex === index;
              const isInactive = activeIndex !== null && !isActive;
              const title = reason.title.join(" ");

              return (
                <li
                  key={title}
                  className={`relative aspect-5/6 min-w-60 flex-none overflow-hidden rounded-xs xl:aspect-auto xl:h-full xl:min-w-0 motion-reduce:xl:flex-1 ${CARD_TRANSITION} ${
                    isActive ? "xl:flex-[2_1_0%]" : "xl:flex-1"
                  } ${isInactive ? "xl:opacity-65" : "opacity-100"}`}
                >
                  <div className="absolute inset-y-0 left-1/2 h-full w-full -translate-x-1/2 xl:w-[33.333cqw]">
                    <Image
                      src={reason.image}
                      alt=""
                      fill
                      unoptimized
                      sizes="(min-width: 1600px) 501px, (min-width: 1280px) 34vw, 240px"
                      className="object-cover grayscale"
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/10"
                  />

                  <div className="absolute right-4 bottom-4 left-4 w-auto xl:right-auto xl:w-[calc(33.333cqw-2rem)]">
                    <h3
                      className={`text-xl font-semibold leading-7.5 text-text-primary ${
                        isActive ? "whitespace-nowrap" : ""
                      }`}
                    >
                      {isActive
                        ? title
                        : reason.title.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                    </h3>
                    <div
                      className={`grid transition-[grid-template-rows,opacity,transform] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:grid-rows-[1fr] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                        isActive
                          ? "xl:pointer-fine:grid-rows-[1fr] xl:pointer-fine:translate-y-0 xl:pointer-fine:opacity-100"
                          : "xl:pointer-fine:grid-rows-[0fr] xl:pointer-fine:translate-y-2 xl:pointer-fine:opacity-0"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p className="pt-2 text-base leading-6 text-text-tertiary">
                          {reason.copy}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div
            aria-label="Why clients come to Sovran"
            className="absolute inset-0 z-10 hidden grid-cols-5 gap-0.5 xl:pointer-fine:grid"
          >
            {CLIENT_REASONS.map((reason, index) => {
              const title = reason.title.join(" ");

              return (
                <button
                  key={title}
                  type="button"
                  aria-label={`Show details: ${title}`}
                  onPointerEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className="rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
