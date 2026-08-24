"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

export function FooterCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasEnteredRef = useRef(false);
  const revealTimerRef = useRef<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const clearRevealTimer = () => {
      if (revealTimerRef.current === null) return;
      window.clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    };

    const applyMotionPreference = () => {
      clearRevealTimer();

      if (reducedMotion.matches) {
        video.pause();
        setIsRevealed(false);
        return;
      }

      if (!hasEnteredRef.current) return;

      void video.play().catch(() => {
        // The dark base and overlay remain a complete fallback if playback is blocked.
      });
      revealTimerRef.current = window.setTimeout(() => {
        setIsRevealed(true);
        revealTimerRef.current = null;
      }, 650);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        hasEnteredRef.current = true;
        applyMotionPreference();
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    reducedMotion.addEventListener("change", applyMotionPreference);
    observer.observe(section);

    return () => {
      clearRevealTimer();
      observer.disconnect();
      reducedMotion.removeEventListener("change", applyMotionPreference);
      video.pause();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="footer-cta-heading"
      className="relative flex min-h-140 items-end justify-center overflow-hidden bg-brand-950 px-6 pt-16 pb-24"
      data-theme="dark"
    >
      <video
        ref={videoRef}
        src="/videos/sovran-CTA-section-vid_720p.mp4"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full object-cover"
        style={{ objectPosition: "center 42%" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-neutral-950/50 to-neutral-950"
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-linear-to-b from-neutral-950/60 to-transparent transition-opacity duration-1000 ease-out motion-reduce:transition-none ${
          isRevealed ? "opacity-0" : "opacity-100"
        }`}
      />

      <div className="relative z-10 flex max-w-2xl flex-col items-center gap-5 text-center">
        <div className="flex flex-col gap-2">
          <h2
            id="footer-cta-heading"
            className="text-3xl font-medium leading-10 text-text-primary"
          >
            Have a decision to work through?
          </h2>
          <p className="text-base leading-6 text-text-quaternary">
            Tell us what is changing, what is at stake, and where you need
            clarity.
          </p>
        </div>
        <Button href="/contact" variant="primary" size="lg">
          Start a conversation
        </Button>
      </div>
    </section>
  );
}
