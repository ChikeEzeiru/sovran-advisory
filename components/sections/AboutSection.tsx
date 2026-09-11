"use client";

import Image from "next/image";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SpinningNumber } from "@/components/ui/SpinningNumber";

type GridItem =
  | {
      type: "stat";
      value: number;
      suffix: string;
      label: string;
    }
  | {
      type: "image";
      src: string;
    };

const GRID_ITEMS: GridItem[] = [
  {
    type: "stat",
    value: 12,
    suffix: "+ years",
    label: "advising across\ncomplex markets",
  },
  { type: "image", src: "/images/about-us/Grid-img_1.avif" },
  {
    type: "stat",
    value: 450,
    suffix: "+ staff",
    label: "across our teams and\nspecialist network",
  },
  { type: "image", src: "/images/about-us/Grid-img_2.avif" },
  { type: "image", src: "/images/about-us/Grid-img_3.avif" },
  {
    type: "stat",
    value: 20,
    suffix: "+ markets",
    label: "supported across\nthe continent",
  },
  { type: "image", src: "/images/about-us/Grid-img_4.avif" },
  {
    type: "stat",
    value: 96,
    suffix: "% repeat",
    label: "or referred engagements",
  },
];

export function AboutSection() {
  return (
    <section
      aria-labelledby="about-heading"
      className="flex flex-col gap-16 py-20"
    >
      <div className="flex w-full flex-col items-center gap-2 px-12 text-center max-md:px-6">
        <SectionEyebrow>About Sovran</SectionEyebrow>
        <h2
          id="about-heading"
          className="text-4xl font-medium leading-11 tracking-tight text-text-primary"
        >
          Behind decisions that shape markets.
        </h2>
      </div>

      <div className="mx-auto grid w-full max-w-400 grid-cols-4 gap-6 px-12 max-md:grid-cols-2 max-md:gap-3 max-md:px-6">
        {GRID_ITEMS.map((item, index) => {
          if (item.type === "image") {
            return (
              <div
                key={item.src}
                className="relative min-h-80 overflow-hidden rounded-xs bg-bg-quaternary max-md:min-h-56"
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            );
          }

          return (
            <div
              key={`${item.value}-${index}`}
              className="flex min-h-80 flex-col items-center justify-center gap-3 p-6 text-center max-md:min-h-56 max-sm:px-2"
            >
              <p className="sr-only">
                {item.value}
                {item.suffix}
              </p>
              <div
                aria-hidden="true"
                className="flex w-full items-center justify-center text-4xl font-medium leading-12 tracking-tight text-text-secondary"
              >
                <SpinningNumber value={item.value} />
                <span>{item.suffix}</span>
              </div>
              <p className="w-full whitespace-pre-line text-xl font-normal leading-7.5 text-text-quaternary">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
