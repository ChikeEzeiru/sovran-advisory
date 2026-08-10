import Link from "next/link";
import {
  Building08,
  PresentationChart02,
  Server05,
  Signal02,
} from "@untitledui/icons";
import type { ComponentType, CSSProperties } from "react";

const EASE = "cubic-bezier(0.65,0,0.35,1)";

function ArrowRight({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
      style={style}
    >
      <path
        d="M2 8h12M9 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface Service {
  title: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  bg: string;
  overlay?: string;
}

const SERVICES: Service[] = [
  {
    title: "Policy & Government relations",
    href: "/expertise/policy",
    icon: Building08,
    bg: "/images/services/sovran photo - policy and govt relations.avif",
  },
  {
    title: "Market & Corporate Strategy",
    href: "/expertise/strategy",
    icon: PresentationChart02,
    bg: "/images/services/sovran photo - market and corporate strategy.avif",
  },
  {
    title: "Digital & Technology Advisory",
    href: "/expertise/technology",
    icon: Server05,
    bg: "/images/services/sovran photo - digital and tech advisory.avif",
  },
  {
    title: "Communications & Stakeholder Engagement",
    href: "/expertise/communications",
    icon: Signal02,
    bg: "/images/services/comms-base.png",
    overlay: "/images/services/sovran photo - comms and stakeholder eng.avif",
  },
];

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      href={service.href}
      className="group relative flex flex-[1_0_0] min-w-160 min-h-90 items-end gap-6 p-8 rounded-xl overflow-hidden"
    >
      {/* Background image — zooms within the overflow-hidden container on hover */}
      <img
        src={service.bg}
        alt=""
        aria-hidden
        className="absolute inset-0 size-full object-cover pointer-events-none will-change-transform transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
      />
      {/* Optional overlay image (Communications card) */}
      {service.overlay && (
        <img
          src={service.overlay}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover pointer-events-none will-change-transform transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
        />
      )}
      {/* Bottom gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-linear-to-b from-transparent to-black/40"
      />

      {/* Content row */}
      <div className="relative flex flex-1 items-start gap-3 min-w-0">
        <div className="flex items-center py-1 shrink-0 text-[#f9fbfb]">
          <Icon size={24} />
        </div>
        <div className="flex flex-1 flex-col justify-center min-w-0 overflow-hidden">
          <span className="relative flex overflow-hidden h-8">
            <span
              className="text-2xl font-medium leading-8 text-[#f9fbfb] whitespace-nowrap transition-transform duration-380 group-hover:-translate-y-full motion-reduce:transition-none"
              style={{ transitionTimingFunction: EASE }}
            >
              {service.title}
            </span>
            <span
              aria-hidden
              className="absolute top-full left-0 text-2xl font-medium leading-8 text-[#f9fbfb] whitespace-nowrap transition-transform duration-380 group-hover:-translate-y-full motion-reduce:transition-none"
              style={{ transitionTimingFunction: EASE }}
            >
              {service.title}
            </span>
          </span>
        </div>
      </div>

      {/* Arrow — slides out right, enters from left */}
      <span className="relative overflow-hidden inline-flex items-center w-4 h-4 shrink-0 text-[#f9fbfb]">
        <ArrowRight
          className="transition-transform duration-380 group-hover:translate-x-full motion-reduce:transition-none"
          style={{ transitionTimingFunction: EASE }}
        />
        <ArrowRight
          className="absolute inset-0 -translate-x-full transition-transform duration-380 group-hover:translate-x-0 motion-reduce:transition-none"
          style={{ transitionTimingFunction: EASE }}
        />
      </span>
    </Link>
  );
}

export function ServicesSection() {
  return (
    <section className="flex flex-col gap-16 py-24">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 max-w-200 mx-auto w-full px-12">
        <div className="border border-[#d0d6d8] rounded-[10px] px-3 py-1">
          <span className="text-base font-normal leading-6 text-[#67787c] whitespace-nowrap">
            What we do
          </span>
        </div>
        <p className="text-4xl font-medium leading-11 tracking-tight text-[#161b1d] text-center">
          Targeted solutions that help our clients
        </p>
      </div>

      {/* Cards grid */}
      <div className="flex flex-wrap gap-6 justify-center px-12 max-w-[1600px] mx-auto w-full">
        {SERVICES.map((service) => (
          <ServiceCard key={service.href} service={service} />
        ))}
      </div>
    </section>
  );
}
