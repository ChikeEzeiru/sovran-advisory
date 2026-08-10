"use client";

import { Button } from "@/components/ui/Button";
import { SpinningNumber } from "@/components/ui/SpinningNumber";

const STATS = [
  {
    numeric: 11,
    suffix: " Years",
    label: "in continuous practice\nacross African markets",
  },
  {
    numeric: 20,
    suffix: "+ Markets",
    label: "active engagements, not\njust registered presence",
  },
  {
    numeric: 450,
    suffix: "+ Staff",
    label: "across six\nregional offices",
  },
];

export function AboutSection() {
  return (
    <section className="flex flex-col items-center gap-16 px-4 py-24">
      {/* Badge + body copy */}
      <div className="flex flex-col items-center gap-3 max-w-200 w-full px-8">
        <div className="self-center border border-[#d0d6d8] rounded-[10px] px-3 py-1">
          <span className="text-base font-normal leading-6 text-[#67787c] whitespace-nowrap">
            About Sovran
          </span>
        </div>
        <p className="text-2xl font-medium leading-8 text-[#394447] text-center">
          We work with governments and companies across Africa. We advise on
          policy, strategy, technology, and communications. We know the people
          in the room, and we know the methods that work.
        </p>
      </div>

      {/* Stats grid */}
      <div className="flex justify-center w-full px-8">
        <div className="grid grid-cols-3 gap-6 max-w-200 w-full text-center">
          {STATS.map((stat) => (
            <div
              key={stat.numeric}
              className="flex flex-col gap-3 items-center"
            >
              {/* Accessible label — screen readers get the full string */}
              <p className="sr-only">
                {stat.numeric}
                {stat.suffix}
              </p>
              {/* Visual reel — inherits text styles, hidden from a11y tree */}
              <div
                aria-hidden
                className="flex items-center justify-center text-4xl font-medium tracking-tight text-[#394447] w-full"
              >
                <SpinningNumber value={stat.numeric} />
                <span>{stat.suffix}</span>
              </div>
              <p className="text-xl font-normal leading-normal text-[#67787c] w-full whitespace-pre-line">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Button variant="primary" size="md" href="/about">
        Read our Story
      </Button>
    </section>
  );
}
