"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building08,
  PresentationChart02,
  Server05,
  Signal02,
  ChevronDown,
} from "@untitledui/icons";
import { Button } from "@/components/ui/Button";
import type { ComponentType } from "react";

const EASE = "cubic-bezier(0.65,0,0.35,1)";

type DropdownKey = "expertise" | "about";
const DROPDOWN_ORDER: DropdownKey[] = ["expertise", "about"];

// Height of one image slot in the vertical strip (px)
const IMG_H = 340;

interface DropdownItem {
  title: string;
  desc: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  image: string; // empty string = placeholder until provided
}

const EXPERTISE_ITEMS: DropdownItem[] = [
  {
    title: "Policy & Government Relations",
    desc: "Working with governments and multilateral bodies across Africa.",
    href: "/expertise/policy",
    icon: Building08,
    image: "/images/services/sovran photo - policy and govt relations.avif",
  },
  {
    title: "Digital & Technology Advisory",
    desc: "Technology strategy for governments and institutions.",
    href: "/expertise/technology",
    icon: Server05,
    image: "/images/services/sovran photo - digital and tech advisory.avif",
  },
  {
    title: "Market & Corporate Strategy",
    desc: "Helping corporates and investors enter and operate in African markets.",
    href: "/expertise/strategy",
    icon: PresentationChart02,
    image: "/images/services/sovran photo - market and corporate strategy.avif",
  },
  {
    title: "Communications & Stakeholder Engagement",
    desc: "Reputation management and strategic communications.",
    href: "/expertise/communications",
    icon: Signal02,
    image: "/images/services/sovran photo - comms and stakeholder eng.avif",
  },
];

// Images will be provided later
const ABOUT_ITEMS: DropdownItem[] = [
  {
    title: "About Sovran",
    desc: "Who we are, how we work, and where we operate.",
    href: "/about",
    icon: Building08,
    image: "/images/sovran photo - our story.avif",
  },
  {
    title: "Leadership & Team",
    desc: "The people who lead our practice areas and run our engagements.",
    href: "/leadership",
    icon: Signal02,
    image: "",
  },
  {
    title: "Careers",
    desc: "Join a team working on Africa's most consequential advisory mandates.",
    href: "/careers",
    icon: PresentationChart02,
    image: "",
  },
  {
    title: "Events",
    desc: "Convenings, roundtables, and public programmes across our markets.",
    href: "/events",
    icon: Server05,
    image: "",
  },
];

const PANEL_META = {
  expertise: {
    items: EXPERTISE_ITEMS,
    footer: {
      icon: Building08,
      title: "Targeted solutions that help our clients",
      desc: "Get tailored solutions that have empowered our clients to succeed.",
      cta: "See Overview",
      href: "/expertise",
    },
  },
  about: {
    items: ABOUT_ITEMS,
    footer: {
      icon: Signal02,
      title: "Built for the complexity of African markets",
      desc: "Meet the firm and the people behind our engagements.",
      cta: "About the Firm",
      href: "/about",
    },
  },
} as const;

// ─── Nav item ────────────────────────────────────────────────────────────────

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  hasChevron?: boolean;
  theme?: "dark" | "light";
  dropdownOpen?: boolean;
  onMouseEnter?: () => void;
}

function NavItem({
  href,
  children,
  hasChevron = false,
  theme = "dark",
  dropdownOpen = false,
  onMouseEnter,
}: NavItemProps) {
  return (
    <Link
      href={href}
      onMouseEnter={onMouseEnter}
      className={`group inline-flex items-center gap-1 px-3 py-2 text-base font-medium cursor-pointer select-none rounded-xl transition-colors duration-150 ${
        theme === "light"
          ? "text-[#22292B] hover:bg-black/8"
          : "text-[#F1F3F3] hover:bg-white/15"
      }`}
    >
      <span className="relative overflow-hidden flex h-6">
        <span
          className="leading-6 whitespace-nowrap transition-transform duration-380 group-hover:-translate-y-full motion-reduce:transition-none"
          style={{ transitionTimingFunction: EASE }}
        >
          {children}
        </span>
        <span
          className="absolute top-full left-0 leading-6 whitespace-nowrap transition-transform duration-380 group-hover:-translate-y-full motion-reduce:transition-none"
          style={{ transitionTimingFunction: EASE }}
          aria-hidden
        >
          {children}
        </span>
      </span>

      {hasChevron && (
        <ChevronDown
          size={16}
          className="shrink-0 opacity-60"
          style={{
            transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: `transform 300ms ${EASE}`,
          }}
        />
      )}
    </Link>
  );
}

// ─── Dropdown panel content ───────────────────────────────────────────────────

interface PanelProps {
  panelKey: DropdownKey;
  theme: "dark" | "light";
  hoveredIdx: number;
  onItemHover: (i: number) => void;
}

function DropdownPanel({
  panelKey,
  theme,
  hoveredIdx,
  onItemHover,
}: PanelProps) {
  const { items, footer } = PANEL_META[panelKey];
  const FooterIcon = footer.icon;
  const isLight = theme === "light";

  const titleCls = isLight ? "text-[#161b1d]" : "text-[#e8ecec]";
  const descCls = isLight ? "text-[#67787c]" : "text-[#7a8e93]";
  const itemHover = isLight ? "hover:bg-[#edf0f0]" : "hover:bg-white/6";
  const activeItem = isLight ? "bg-[#edf0f0]" : "bg-white/8";

  return (
    <div className="flex flex-col">
      {/* Main row: items + image */}
      <div className={`flex gap-6 px-6 pt-5 pb-4 ${isLight ? "bg-[#F9FBFB]" : "bg-[#0e1214]"}`}>
        {/* Left: item list */}
        <div className="flex flex-col gap-0.5 flex-1">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => onItemHover(i)}
                className={`flex items-start gap-3 px-3 py-3 rounded-xl transition-colors duration-150 ${
                  hoveredIdx === i ? activeItem : itemHover
                }`}
              >
                <span
                  className={`mt-0.5 shrink-0 p-1.5 rounded-lg ${
                    isLight ? "bg-[#e3e7e8]" : "bg-white/10"
                  }`}
                >
                  <Icon size={16} className={descCls} />
                </span>
                <div className="flex flex-col gap-0.5">
                  <p className={`text-sm font-medium leading-5 ${titleCls}`}>
                    {item.title}
                  </p>
                  <p className={`text-sm leading-5 ${descCls}`}>{item.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Right: vertically sliding image strip */}
        <div
          className="shrink-0 rounded-xl overflow-hidden"
          style={{ width: 476, height: IMG_H }}
        >
          {items.some((it) => it.image) ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: IMG_H * items.length,
                transform: `translateY(${-hoveredIdx * IMG_H}px)`,
                transition: `transform 420ms ${EASE}`,
              }}
            >
              {items.map((item, i) => (
                <div
                  key={i}
                  style={{ height: IMG_H, position: "relative", flexShrink: 0 }}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          ) : (
            // Placeholder until About images are provided
            <div
              className={`w-full h-full ${
                isLight ? "bg-[#d8dede]" : "bg-white/10"
              }`}
            />
          )}
        </div>
      </div>

      {/* Footer bar */}
      <div
        className={`flex items-center justify-between gap-4 px-9 py-4 ${isLight ? "bg-white" : "bg-[#080c0d]"}`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`shrink-0 p-1.5 rounded-lg ${
              isLight ? "bg-[#e3e7e8]" : "bg-white/10"
            }`}
          >
            <FooterIcon size={16} className={descCls} />
          </span>
          <div className="flex flex-col gap-0.5">
            <p className={`text-sm font-medium leading-5 ${titleCls}`}>
              {footer.title}
            </p>
            <p className={`text-sm leading-5 ${descCls}`}>{footer.desc}</p>
          </div>
        </div>
        <Button
          href={footer.href}
          variant={isLight ? "secondary" : "tertiary"}
          size="sm"
          showIcon={false}
          className="shrink-0"
        >
          {footer.cta}
        </Button>
      </div>
    </div>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

interface NavbarProps {
  theme?: "dark" | "light";
}

export function Navbar({ theme = "dark" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<DropdownKey | null>(null);
  const [slideEnabled, setSlideEnabled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<Record<DropdownKey, number>>({
    expertise: 0,
    about: 0,
  });
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const [lastIndex, setLastIndex] = useState(0);
  const isLight = theme === "light";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDropdownEnter = (key: DropdownKey) => {
    clearTimeout(closeTimer.current);
    setSlideEnabled(active !== null && active !== key);
    setLastIndex(DROPDOWN_ORDER.indexOf(key));
    setActive(key);
  };

  const handleNonDropdownEnter = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setActive(null);
      setSlideEnabled(false);
    }, 80);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => {
      setActive(null);
      setSlideEnabled(false);
    }, 80);
  };

  const handlePanelEnter = () => clearTimeout(closeTimer.current);

  const displayIndex =
    active !== null ? DROPDOWN_ORDER.indexOf(active) : lastIndex;


  return (
    <header
      data-theme={isLight ? undefined : "dark"}
      className="fixed top-0 left-0 right-0 z-50"
      onMouseLeave={handleLeave}
    >
      {/* Nav bar */}
      <div
        className={`h-18 flex items-center justify-center px-4 border-b transition-[background-color,backdrop-filter,border-color] duration-300 ease-out ${
          isLight
            ? active
              ? "bg-[#F1F3F3] border-transparent"
              : scrolled
                ? "bg-[#F1F3F3] border-[#d0d6d8]"
                : "bg-[#F1F3F3] border-transparent"
            : scrolled || active
              ? "bg-black/50 backdrop-blur-md border-transparent"
              : "bg-transparent backdrop-blur-none border-transparent"
        }`}
      >
        <div className="flex items-center justify-between w-full max-w-[1600px] px-8">
          <Link href="/" className="shrink-0">
            <Image
              src={isLight ? "/sovran-logo-light.svg" : "/sovran-logo.svg"}
              alt="Sovran"
              width={121}
              height={40}
              priority
            />
          </Link>

          <nav className="flex items-center">
            <NavItem
              href="/expertise"
              hasChevron
              theme={theme}
              dropdownOpen={active === "expertise"}
              onMouseEnter={() => handleDropdownEnter("expertise")}
            >
              Expertise
            </NavItem>
            <NavItem
              href="/about"
              hasChevron
              theme={theme}
              dropdownOpen={active === "about"}
              onMouseEnter={() => handleDropdownEnter("about")}
            >
              About
            </NavItem>
            <NavItem
              href="/case-studies"
              theme={theme}
              onMouseEnter={handleNonDropdownEnter}
            >
              Case Studies
            </NavItem>
            <NavItem
              href="/intelligence"
              theme={theme}
              onMouseEnter={handleNonDropdownEnter}
            >
              Insights
            </NavItem>
            <NavItem
              href="/careers"
              theme={theme}
              onMouseEnter={handleNonDropdownEnter}
            >
              Careers
            </NavItem>
          </nav>

          <Button
            variant={isLight ? "primary" : "secondary"}
            size="sm"
            href="/contact"
            showIcon={false}
          >
            Contact Us
          </Button>
        </div>
      </div>

      {/* Dropdown panel */}
      <div
        className={`transition-[grid-template-rows] duration-300 ease-out grid justify-items-center ${
          active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div
          className="w-full max-w-250 rounded-b-xl overflow-hidden shadow-[0px_20px_24px_-4px_#00000014,0px_8px_8px_-4px_#00000008,0px_3px_3px_-1.5px_#0000000a]"
          onMouseEnter={handlePanelEnter}
          onMouseLeave={handleLeave}
        >
            <div className="overflow-hidden">
              <div
                style={{
                  display: "flex",
                  width: "200%",
                  transform: `translateX(${-displayIndex * 50}%)`,
                  transition: slideEnabled ? `transform 380ms ${EASE}` : "none",
                }}
              >
                <div style={{ width: "50%" }}>
                  <DropdownPanel
                    panelKey="expertise"
                    theme={theme}
                    hoveredIdx={hoveredIdx.expertise}
                    onItemHover={(i) =>
                      setHoveredIdx((prev) => ({ ...prev, expertise: i }))
                    }
                  />
                </div>
                <div style={{ width: "50%" }}>
                  <DropdownPanel
                    panelKey="about"
                    theme={theme}
                    hoveredIdx={hoveredIdx.about}
                    onItemHover={(i) =>
                      setHoveredIdx((prev) => ({ ...prev, about: i }))
                    }
                  />
                </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
