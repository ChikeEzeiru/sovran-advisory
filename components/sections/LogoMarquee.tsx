"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

const EASE = "cubic-bezier(0.65,0,0.35,1)";
const NORMAL_SPEED = 0.05; // px per ms
const HOVER_SPEED = 0.015; // px per ms — slows on hover

const LOGOS = [
  {
    name: "U.S. Chamber of Commerce",
    src: "/logos/us_chamber_logo.svg",
    hoverSrc: "/logos/us_chamber_logo hovered.svg",
  },
  {
    name: "UK Chamber of Shipping",
    src: "/logos/uk_chamber_of_shipping_logo.svg",
    hoverSrc: "/logos/uk_chamber_of_shipping_logo hovered.svg",
  },
  {
    name: "Meridian Capital",
    src: "/logos/Meridian Capital logo.svg",
    hoverSrc: "/logos/Meridian Capital logo hovered.svg",
  },
  {
    name: "MTN Group",
    src: "/logos/mtn_group_logo.svg",
    hoverSrc: "/logos/mtn_group_logo hovered.svg",
  },
  {
    name: "African Union",
    src: "/logos/African union logo.svg",
    hoverSrc: "/logos/African union logo hovered.svg",
  },
  {
    name: "NESG",
    src: "/logos/NESG logo.svg",
    hoverSrc: "/logos/NESG logo hovered.svg",
  },
  {
    name: "ACET",
    src: "/logos/ACET logo.svg",
    hoverSrc: "/logos/ACET logo hovered.svg",
  },
  {
    name: "GDFC",
    src: "/logos/GDFC logo.svg",
    hoverSrc: "/logos/GDFC logo hovered.svg",
  },
];

function LogoItem({ logo }: { logo: (typeof LOGOS)[0] }) {
  return (
    <div className="group/logo shrink-0 cursor-pointer">
      {/* overflow-hidden clips to one logo height — mirrors rt-client-v1-card-logo-wrap */}
      <div className="overflow-hidden h-9">
        {/* rt-one: default logo — exits upward on hover */}
        <div
          className="transition-transform duration-380 motion-reduce:transition-none group-hover/logo:-translate-y-full"
          style={{ transitionTimingFunction: EASE }}
        >
          <Image src={logo.src} alt={logo.name} width={200} height={36} unoptimized className="h-9 w-auto block" />
        </div>
        {/* rt-two: hover logo — naturally below rt-one in flow; both translate -100% so this enters from below */}
        <div
          className="transition-transform duration-380 motion-reduce:transition-none group-hover/logo:-translate-y-full"
          style={{ transitionTimingFunction: EASE }}
        >
          <Image src={logo.hoverSrc} alt="" aria-hidden width={200} height={36} unoptimized className="h-9 w-auto block" />
        </div>
      </div>
    </div>
  );
}

export function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const speedRef = useRef(NORMAL_SPEED);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function tick(time: number) {
      if (lastTimeRef.current !== null) {
        const delta = time - lastTimeRef.current;
        posRef.current += speedRef.current * delta;

        // Seamless loop: reset when one full set (half total width) has scrolled past
        const halfWidth = track!.scrollWidth / 2;
        if (posRef.current >= halfWidth) posRef.current -= halfWidth;

        track!.style.transform = `translateX(-${posRef.current}px)`;
      }
      lastTimeRef.current = time;
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section className="flex flex-row justify-center py-12">
      <div
        className="relative overflow-hidden max-w-400"
        onMouseEnter={() => {
          speedRef.current = HOVER_SPEED;
        }}
        onMouseLeave={() => {
          speedRef.current = NORMAL_SPEED;
        }}
      >
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-linear-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-linear-to-l from-background to-transparent" />

        {/* Track — two copies for seamless loop, driven by RAF not CSS keyframes */}
        <div
          ref={trackRef}
          className="flex items-center gap-24 w-max will-change-transform"
        >
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
