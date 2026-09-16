"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const EASE = "cubic-bezier(0.65,0,0.35,1)";

function PlayIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true">
      <path d="M5.75 4.6a1 1 0 0 1 1.54-.84l8.1 5.4a1 1 0 0 1 0 1.68l-8.1 5.4a1 1 0 0 1-1.54-.84V4.6Z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true">
      <rect x="5" y="4" width="3.5" height="12" rx="0.75" fill="currentColor" />
      <rect x="11.5" y="4" width="3.5" height="12" rx="0.75" fill="currentColor" />
    </svg>
  );
}

type CardId = "africa" | "international";

const CARDS = [
  {
    id: "africa" as CardId,
    label: "Africa",
    description: "Advisory across 20+ markets, from policy to delivery.",
    icon: "/icon-globe-africa.svg",
    // This icon is drawn for dark bg (open state) — invert it on white bg (closed)
    invertWhenOpen: false,
    href: "#",
  },
  {
    id: "international" as CardId,
    label: "International",
    description:
      "Advising multilateral and development institutions on African markets.",
    icon: "/icon-globe.svg",
    // This icon is drawn for white bg (closed state) — invert it on dark bg (open)
    invertWhenOpen: true,
    href: "#",
  },
];

export function HomeHero() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [openCard, setOpenCard] = useState<CardId>("africa");

  function toggleVideo() {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.play().catch(() => {});
      setPlaying(true);
    }
  }

  function handleCardClick(card: (typeof CARDS)[0]) {
    if (openCard === card.id) {
      // Already open — navigate
      router.push(card.href);
    } else {
      setOpenCard(card.id);
    }
  }

  return (
    <section
      data-theme="dark"
      className="relative flex h-[87.5svh] w-full flex-col overflow-hidden max-md:h-[810px]"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        src="/videos/sovran-new-hero-810p.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay 1: flat 50% black */}
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />
      {/* Overlay 2: gradient — transparent at 10% from top, solid black at bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end gap-16 px-4 pt-24 pb-16 max-md:gap-8">
        {/* Link cards — upper right */}
        <div className="flex w-full max-w-[1600px] justify-end self-center px-8 max-md:hidden">
          <div className="flex flex-col gap-3 w-79.5">
            {CARDS.map((card) => {
              const isOpen = openCard === card.id;
              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  data-theme={isOpen ? "light" : undefined}
                  className={`w-full text-left rounded-xs border border-[rgba(255,255,255,0.29)] overflow-hidden cursor-pointer transition-colors duration-300 ${
                    isOpen ? "bg-bg-primary" : "bg-[rgba(255,255,255,0.12)]"
                  }`}
                >
                  {/* Header row */}
                  <div className="flex items-center gap-4 pt-4 pb-2 px-4">
                    <span
                      className={`flex items-center justify-center p-1.5 rounded-full shrink-0 transition-colors duration-300 ${
                        isOpen ? "bg-bg-primary-solid" : "bg-white"
                      }`}
                    >
                      <Image
                        src={card.icon}
                        alt=""
                        width={20}
                        height={20}
                        className={`block transition-[filter] duration-300 ${
                          isOpen
                            ? card.invertWhenOpen
                              ? "invert"
                              : ""
                            : !card.invertWhenOpen
                              ? "invert"
                              : ""
                        }`}
                      />
                    </span>
                    <span
                      className={`text-xl font-medium leading-7.5 whitespace-nowrap transition-colors duration-300 ${
                        isOpen ? "text-text-secondary" : "text-white"
                      }`}
                    >
                      {card.label}
                    </span>
                  </div>

                  {/* Description — slides open */}
                  {card.description && (
                    <div
                      className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                        isOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                      }`}
                      style={{ transitionTimingFunction: EASE }}
                    >
                      <div className="pb-2 pl-16 pr-4">
                        <p className="text-base font-normal leading-6 text-text-quaternary">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Bottom padding */}
                  <div className={isOpen ? "h-1.5" : "h-1"} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Hero copy + buttons */}
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-8 max-md:px-2">
          {/* Headline */}
          <div className="flex flex-col gap-3">
            <div className="self-start border border-border-primary rounded-xs px-3 py-1">
              <span className="text-base font-normal leading-6 text-white whitespace-nowrap max-md:text-sm max-md:leading-5">
                Pan-African Strategic Advisory
              </span>
            </div>
            <h1 className="text-[56px] font-medium leading-16 tracking-[-1.68px] text-white max-md:text-4xl max-md:leading-11 max-md:tracking-[-1.44px]">
              <span className="max-md:hidden">
                Delivering outcomes few can match, <br />
                for business and institutional leaders
              </span>
              <span className="hidden max-md:inline">
                Delivering outcomes
                <br />
                few can match,
                <br />
                for business and
                <br />
                institutional leaders
              </span>
            </h1>
          </div>

          {/* CTA row */}
          <div className="flex w-full items-center justify-between">
            {/* Left buttons */}
            <div className="flex items-center gap-2 max-md:w-full max-md:flex-col">
              <span className="hidden md:contents">
                <Button variant="primary" size="xl" href="/contact">
                  Talk to Us
                </Button>
              </span>
              <span data-theme="light" className="w-full md:hidden">
                <Button
                  variant="secondary"
                  size="xl"
                  href="/contact"
                  className="w-full justify-center"
                >
                  Talk to Us
                </Button>
              </span>
              <Button
                variant="tertiary"
                size="xl"
                href="/case-studies"
                showIcon={false}
                className="max-md:w-full max-md:justify-center max-md:bg-white/25 max-md:text-white max-md:ring-1 max-md:ring-white/15 max-md:ring-inset"
              >
                See Case Studies
              </Button>
            </div>

            {/* Pause / Play — icon only */}
            <button
              onClick={toggleVideo}
              aria-label={playing ? "Pause video" : "Play video"}
              className="relative inline-flex cursor-pointer select-none items-center justify-center overflow-hidden rounded-xs border border-[#d4d4d4] p-2 text-[#f1f3f3] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] max-md:absolute max-md:top-24 max-md:right-4"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[rgba(255,255,255,0.22)]"
              />
              <span className="relative">
                {playing ? (
                  <PauseIcon />
                ) : (
                  <PlayIcon />
                )}
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_0px_1px_rgba(0,0,0,0.18),inset_0px_-2px_0px_0px_rgba(0,0,0,0.05)]"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
