"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Squircle } from "@squircle-js/react";
import { PauseCircle, PlayCircle } from "@untitledui/icons";
import { Button } from "@/components/ui/Button";

const EASE = "cubic-bezier(0.65,0,0.35,1)";

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
    description: "Advising multilateral and development institutions on African markets.",
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
    <section data-theme="dark" className="relative w-full h-screen min-h-160 flex flex-col overflow-hidden">
      {/* Background video */}
      <video
        ref={videoRef}
        src="/videos/sovran-hero.mp4"
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
      <div className="relative z-10 flex flex-col h-full gap-16 justify-end pb-16 pt-24 px-4">
        {/* Link cards — upper right */}
        <div className="flex justify-end w-full max-w-[1600px] mx-auto px-8 self-center">
          <div className="flex flex-col gap-3 w-79.5">
            {CARDS.map((card) => {
              const isOpen = openCard === card.id;
              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  className={`w-full text-left rounded-2xl border border-[rgba(255,255,255,0.29)] overflow-hidden cursor-pointer transition-colors duration-300 ${
                    isOpen ? "bg-white" : "bg-[rgba(255,255,255,0.12)]"
                  }`}
                >
                  {/* Header row */}
                  <div className="flex items-center gap-4 pt-4 pb-2 px-4">
                    <span
                      className={`flex items-center justify-center p-1.5 rounded-full shrink-0 transition-colors duration-300 ${
                        isOpen ? "bg-[#090b0c]" : "bg-white"
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
                        isOpen ? "text-[#394447]" : "text-white"
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
                        <p className="text-base font-normal leading-6 text-[#67787c]">
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
        <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto px-8">
          {/* Headline */}
          <div className="flex flex-col gap-3">
            <div className="self-start border border-[#d0d6d8] rounded-[10px] px-3 py-1">
              <span className="text-base font-normal leading-6 text-white whitespace-nowrap">
                Policy · Strategy · Technology · Communications
              </span>
            </div>
            <h1 className="text-[56px] font-medium leading-16 tracking-[-1.68px] text-white">
              Delivering outcomes few can match, <br />
              for political and industry leaders
            </h1>
          </div>

          {/* CTA row */}
          <div className="flex items-center justify-between w-full">
            {/* Left buttons */}
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="xl" href="/contact">Contact Us</Button>
              <Button variant="tertiary" size="xl" href="/case-studies" showIcon={false}>See Case Studies</Button>
            </div>

            {/* Pause / Play — icon only */}
            <Squircle asChild cornerRadius={16} cornerSmoothing={0.6}>
              <button
                onClick={toggleVideo}
                aria-label={playing ? "Pause video" : "Play video"}
                className="relative inline-flex items-center justify-center p-2 border border-[#d4d4d4] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden cursor-pointer select-none text-[#f1f3f3]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[rgba(255,255,255,0.22)] pointer-events-none rounded-[inherit]"
                />
                <span className="relative">
                  {playing ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_1px_rgba(0,0,0,0.18),inset_0px_-2px_0px_0px_rgba(0,0,0,0.05)]"
                />
              </button>
            </Squircle>
          </div>
        </div>
      </div>
    </section>
  );
}
