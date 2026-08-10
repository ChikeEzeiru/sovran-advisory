"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { Badge } from "@/components/base/badges/badges";

// ─── Brand colour for card overlay — update here to change across all cards ───
const CARD_COLOR = "#161B1D";

const CASES = [
  {
    category: "Development Finance",
    body: "Political economy risk assessment cleared a $200M infrastructure loan for disbursement on schedule.",
    logo: { src: "/logos/GDFC logo.svg", alt: "GDFC", width: 68, height: 24 },
    href: "/case-studies/gdfc-infrastructure-loan",
    image: "/images/case-studies/development_finance-case.avif", // add image path when available
  },
  {
    category: "Financial Services",
    body: 'Licensed in two markets within an eighteen-month window their own regulatory counsel called "aggressive but not impossible."',
    logo: {
      src: "/logos/Meridian Capital logo.svg",
      alt: "Meridian Capital",
      width: 131,
      height: 24,
    },
    href: "/case-studies/meridian-capital-licensing",
    image: "/images/case-studies/financial_services-case.avif", // add image path when available
  },
  {
    category: "Public Sector",
    body: "Three customs authorities aligned on a shared standard in ten months, against a multilateral estimate of three to five years",
    logo: { src: "/logos/Eagla Logo.svg", alt: "EAGLA", width: 80, height: 24 },
    href: "/case-studies/eagla-customs-standard",
    image: "/images/case-studies/public_sector-case.avif", // add image path when available
  },
];

export function CaseStudiesSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const panels = panelRefs.current;
    const contents = contentRefs.current;
    const logos = logoRefs.current;
    const numbers = numberRefs.current;
    const overlays = overlayRefs.current;

    const heights = contents.map((el) => el?.scrollHeight ?? 0);

    panels.forEach(
      (p, i) => p && gsap.set(p, { width: i === 0 ? "80%" : "10%" })
    );
    contents.forEach(
      (c, i) =>
        c &&
        gsap.set(c, {
          height: i === 0 ? heights[0] : 0,
          opacity: i === 0 ? 1 : 0,
        })
    );
    logos.forEach((l, i) => l && gsap.set(l, { opacity: i === 0 ? 1 : 0 }));
    numbers.forEach((n, i) => n && gsap.set(n, { opacity: i === 0 ? 0 : 1 }));
    overlays.forEach(
      (o, i) => o && gsap.set(o, { opacity: i === 0 ? 0.25 : 1 })
    );

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      CASES.slice(0, -1).forEach((_, i) => {
        tl
          // Panel widths animate over full duration
          .to(panels[i], { width: "10%", ease: "none", duration: 1 }, i)
          .to(panels[i + 1], { width: "80%", ease: "none", duration: 1 }, i)
          // Overlay: full opacity when collapsed, subtle tint when expanded
          .to(overlays[i], { opacity: 1, ease: "none", duration: 1 }, i)
          .to(overlays[i + 1], { opacity: 0.25, ease: "none", duration: 1 }, i)
          // Collapsing card: height over full duration, content/logo out first half, number in second half
          .to(contents[i], { height: 0, ease: "none", duration: 1 }, i)
          .to(contents[i], { opacity: 0, ease: "none", duration: 0.5 }, i)
          .to(logos[i], { opacity: 0, ease: "none", duration: 0.5 }, i)
          .to(numbers[i], { opacity: 1, ease: "none", duration: 0.5 }, i + 0.5)
          // Expanding card: height over full duration, number out first half, content/logo in second half
          .to(
            contents[i + 1],
            { height: heights[i + 1], ease: "none", duration: 1 },
            i
          )
          .to(numbers[i + 1], { opacity: 0, ease: "none", duration: 0.5 }, i)
          .to(
            contents[i + 1],
            { opacity: 1, ease: "none", duration: 0.5 },
            i + 0.5
          )
          .to(
            logos[i + 1],
            { opacity: 1, ease: "none", duration: 0.5 },
            i + 0.5
          );
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex gap-6 items-start px-12 pt-32 pb-24 max-w-[1600px] mx-auto w-full overflow-hidden">
        {/* Left col */}
        <div className="flex flex-col justify-between self-stretch shrink-0 w-108">
          <div className="flex flex-col gap-3">
            <div className="self-start border border-[#d0d6d8] rounded-[10px] px-3 py-1">
              <span className="text-base font-normal leading-6 text-[#67787c] whitespace-nowrap">
                Case Studies
              </span>
            </div>
            <p className="text-4xl font-medium leading-11 tracking-tight text-[#161b1d]">
              Selected engagements across our markets.
            </p>
          </div>
          <AnimatedLink
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-base font-semibold text-[#525252]"
          >
            See All Case Studies
          </AnimatedLink>
        </div>

        {/* Expanding panels */}
        <div className="flex flex-1 gap-3 h-full min-w-0">
          {CASES.map((c, i) => (
            <Link
              key={c.href}
              href={c.href}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className="relative flex flex-col justify-between overflow-hidden rounded-xl p-6"
              style={{
                width: i === 0 ? "80%" : "10%",
                backgroundColor: CARD_COLOR,
              }}
            >
              {/* Background image — hidden until image path is provided */}
              {c.image && (
                <Image
                  src={c.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80vw"
                />
              )}

              {/* Colour overlay — full opacity when collapsed, subtle tint when expanded */}
              <div
                ref={(el) => {
                  overlayRefs.current[i] = el;
                }}
                className="absolute inset-0 z-[1]"
                style={{
                  backgroundColor: CARD_COLOR,
                  opacity: i === 0 ? 0.25 : 1,
                }}
              />

              {/* Content — height and opacity driven by GSAP */}
              <div
                ref={(el) => {
                  contentRefs.current[i] = el;
                }}
                className="relative z-[2] flex flex-col gap-4 overflow-hidden"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <Badge
                  type="modern"
                  color="gray"
                  size="md"
                  className="text-sm font-normal leading-5 text-[#161b1d]! border-none! bg-white/80! ring-0! shadow-none!"
                >
                  {c.category}
                </Badge>

                <p className="text-xl font-normal leading-normal text-white/90">
                  {c.body}
                </p>
              </div>

              {/* Number — visible when collapsed, hidden when expanded */}
              <div
                ref={(el) => {
                  numberRefs.current[i] = el;
                }}
                style={{ opacity: i === 0 ? 0 : 1 }}
                className="absolute bottom-6 left-0 right-0 z-[2] flex justify-center pointer-events-none"
              >
                <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-lg font-medium text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Logo — opacity driven by GSAP on wrapper div */}
              <div
                ref={(el) => {
                  logoRefs.current[i] = el;
                }}
                style={{ opacity: i === 0 ? 1 : 0 }}
                className="relative z-[2] shrink-0"
              >
                <Image
                  src={c.logo.src}
                  alt={c.logo.alt}
                  width={c.logo.width}
                  height={c.logo.height}
                  unoptimized
                  className="object-contain object-left brightness-0 invert"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
