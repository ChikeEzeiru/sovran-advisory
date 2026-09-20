"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const NORMAL_SPEED = 0.045;
const HOVER_SPEED = 0.014;

const LOGOS = [
  { name: "U.S. Chamber of Commerce", src: "/logos/us_chamber_logo.svg", hoverSrc: "/logos/us_chamber_logo hovered.svg" },
  { name: "UK Chamber of Shipping", src: "/logos/uk_chamber_of_shipping_logo.svg", hoverSrc: "/logos/uk_chamber_of_shipping_logo hovered.svg" },
  { name: "Meridian Capital", src: "/logos/Meridian Capital logo.svg", hoverSrc: "/logos/Meridian Capital logo hovered.svg" },
  { name: "MTN Group", src: "/logos/mtn_group_logo.svg", hoverSrc: "/logos/mtn_group_logo hovered.svg" },
  { name: "African Union", src: "/logos/African union logo.svg", hoverSrc: "/logos/African union logo hovered.svg" },
  { name: "NESG", src: "/logos/NESG logo.svg", hoverSrc: "/logos/NESG logo hovered.svg" },
  { name: "ACET", src: "/logos/ACET logo.svg", hoverSrc: "/logos/ACET logo hovered.svg" },
  { name: "GDFC", src: "/logos/GDFC logo.svg", hoverSrc: "/logos/GDFC logo hovered.svg" },
];

function LogoImage({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="relative mx-auto block h-10 w-full max-w-48">
      <Image src={src} alt={alt} fill unoptimized sizes="(max-width: 639px) calc(50vw - 32px), 192px" className="object-contain" />
    </span>
  );
}

function LogoItem({ logo, slotWidth }: { logo: (typeof LOGOS)[number]; slotWidth: string }) {
  return (
    <div className="group/logo flex h-full shrink-0 items-center justify-center overflow-hidden border-r border-border-secondary-alt px-4" style={{ width: slotWidth }}>
      <div className="h-10 w-full overflow-hidden">
        <div className="transition-transform duration-380 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/logo:-translate-y-full motion-reduce:transition-none motion-reduce:transform-none">
          <LogoImage src={logo.src} alt={logo.name} />
        </div>
        <div className="transition-transform duration-380 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/logo:-translate-y-full motion-reduce:hidden">
          <LogoImage src={logo.hoverSrc} alt="" />
        </div>
      </div>
    </div>
  );
}

export function LogoMarquee() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const currentSpeedRef = useRef(NORMAL_SPEED);
  const targetSpeedRef = useRef(NORMAL_SPEED);
  const lastTimeRef = useRef<number | null>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function setSlotWidth() {
      const visibleSlots = window.innerWidth >= 1024 ? 5 : 3;
      viewport!.style.setProperty("--proof-slot-width", `${viewport!.clientWidth / visibleSlots}px`);
    }

    const resizeObserver = new ResizeObserver(setSlotWidth);
    resizeObserver.observe(viewport);
    setSlotWidth();

    function tick(time: number) {
      if (lastTimeRef.current !== null && !reducedMotion.matches) {
        const delta = Math.min(time - lastTimeRef.current, 32);
        currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * Math.min(delta / 180, 1);
        positionRef.current += currentSpeedRef.current * delta;

        const setWidth = track!.scrollWidth / 2;
        if (positionRef.current >= setWidth) positionRef.current -= setWidth;
        track!.style.transform = `translate3d(-${positionRef.current}px, 0, 0)`;
      } else if (reducedMotion.matches) {
        track!.style.transform = "translate3d(0, 0, 0)";
      }

      lastTimeRef.current = time;
      frameRef.current = requestAnimationFrame(tick);
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section aria-label="Selected organisations" className="flex h-28 justify-center border-b border-border-secondary-alt px-4 max-md:h-26">
      <div
        ref={viewportRef}
        className="h-full w-full max-w-336 overflow-hidden"
        onMouseEnter={() => { targetSpeedRef.current = HOVER_SPEED; }}
        onMouseLeave={() => { targetSpeedRef.current = NORMAL_SPEED; }}
      >
        <div ref={trackRef} className="flex h-full w-max items-center will-change-transform motion-reduce:will-change-auto">
          {[...LOGOS, ...LOGOS].map((logo, index) => (
            <LogoItem key={`${logo.name}-${index}`} logo={logo} slotWidth="var(--proof-slot-width, 268.8px)" />
          ))}
        </div>
      </div>
    </section>
  );
}
