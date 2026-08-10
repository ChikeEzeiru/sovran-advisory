"use client";

import { useEffect, useId, useRef } from "react";

const CELL_PX = 44;
const SPINS = 2;
const DUR_MS = 1400;
const STAGGER_MS = 90;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const MAX_BLUR = 3;

// (SPINS+1)*10 rows: first SPINS*10 are the spin, last 10 are the landing zone
const STRIP = Array.from({ length: (SPINS + 1) * 10 }, (_, i) => i % 10);

const COL_STYLE: React.CSSProperties = {
  position: "relative",
  height: CELL_PX,
  overflow: "hidden",
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%)",
  maskImage:
    "linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%)",
};

interface Props {
  value: number;
}

export function SpinningNumber({ value }: Props) {
  const rawId = useId();
  // useId can contain colons which are fine in SVG id attrs and url(#…) inline styles
  const uid = rawId;

  const digits = String(value).split("").map(Number);

  const rootRef = useRef<HTMLDivElement>(null);
  const stripRefs = useRef<(HTMLDivElement | null)[]>([]);
  const blurRefs = useRef<(SVGFEGaussianBlurElement | null)[]>([]);
  const rafIds = useRef<number[]>([]);
  const fired = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          io.disconnect();
          trigger();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      rafIds.current.forEach(cancelAnimationFrame);
    };
  }, []);

  function trigger() {
    digits.forEach((digit, col) => {
      const strip = stripRefs.current[col];
      const blurEl = blurRefs.current[col];
      if (!strip) return;

      const cells = SPINS * 10 + digit;
      const delay = col * STAGGER_MS;

      // Kick off CSS transform after column's stagger delay
      setTimeout(() => {
        strip.style.transition = `transform ${DUR_MS}ms ${EASE}`;
        strip.style.transform = `translateY(-${cells * CELL_PX}px)`;
      }, delay);

      // Decay vertical blur from MAX_BLUR → 0 via rAF, respecting the same stagger
      if (!blurEl) return;
      const t0 = performance.now() + delay;
      const t1 = t0 + DUR_MS;

      function decay(now: number) {
        if (now < t0) {
          rafIds.current[col] = requestAnimationFrame(decay);
          return;
        }
        const progress = Math.min((now - t0) / (t1 - t0), 1);
        blurEl!.setAttribute(
          "stdDeviation",
          `0 ${(MAX_BLUR * (1 - progress)).toFixed(2)}`
        );
        if (progress < 1) rafIds.current[col] = requestAnimationFrame(decay);
      }
      rafIds.current[col] = requestAnimationFrame(decay);
    });
  }

  return (
    <>
      {/* SVG filter defs — zero-size, off-screen; one vertical blur filter per digit column */}
      <svg
        aria-hidden
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          {digits.map((_, col) => (
            <filter key={col} id={`rb${uid}${col}`}>
              <feGaussianBlur
                ref={(el) => {
                  blurRefs.current[col] = el;
                }}
                stdDeviation={`0 ${MAX_BLUR}`}
              />
            </filter>
          ))}
        </defs>
      </svg>

      <div
        ref={rootRef}
        className="inline-flex items-center"
        style={{ height: CELL_PX, fontVariantNumeric: "tabular-nums" }}
      >
        {digits.map((_, col) => (
          <div key={col} style={COL_STYLE}>
            <div
              ref={(el) => {
                stripRefs.current[col] = el;
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                willChange: "transform",
                filter: `url(#rb${uid}${col})`,
              }}
            >
              {STRIP.map((d, row) => (
                <div
                  key={row}
                  style={{
                    height: CELL_PX,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {d}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
