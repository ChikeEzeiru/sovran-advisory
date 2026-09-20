"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Building08,
  PresentationChart02,
  Server05,
  Signal02,
  ChevronDown,
  BookOpen02,
  Users03,
  CalendarCheck02,
  Menu01,
  XClose,
} from "@untitledui/icons";
import { Button } from "@/components/ui/Button";
import { ConditionalLink } from "@/components/ui/ConditionalLink";
import { Handshake } from "@/components/icons/Handshake";
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
  overlay?: string;
}

const EXPERTISE_ITEMS: DropdownItem[] = [
  {
    title: "Intelligence",
    desc: "See the signals, constraints and opportunities that matter before you commit.",
    href: "/expertise/intelligence",
    icon: Signal02,
    image: "/images/services/sovran photo - Intelligence.avif",
  },
  {
    title: "Strategy",
    desc: "Choose a route to market, investment or growth that fits the situation.",
    href: "/expertise/strategy",
    icon: PresentationChart02,
    image: "/images/services/sovran photo - comms and stakeholder eng.avif",
  },
  {
    title: "Institutions",
    desc: "Work with the regulators, partners and public systems that shape the outcome.",
    href: "/expertise/institutions",
    icon: Building08,
    image: "/images/services/sovran photo - policy and govt relations.avif",
  },
  {
    title: "Delivery",
    desc: "Turn decisions into coordinated programmes, operating models and measurable progress.",
    href: "/expertise/delivery",
    icon: Server05,
    image: "/images/services/comms-base.png",
    overlay: "/images/services/sovran photo - digital and tech advisory 2.avif",
  },
];

// Images will be provided later
const ABOUT_ITEMS: DropdownItem[] = [
  {
    title: "About Sovran",
    desc: "Who we are, how we work, and where we operate.",
    href: "/about",
    icon: BookOpen02,
    image: "/images/sovran photo - our story.avif",
  },
  {
    title: "Leadership & Team",
    desc: "The people who lead our practice areas and run our engagements.",
    href: "/leadership",
    icon: Users03,
    image: "/images/sovran photo - leadership & team.avif",
  },
  {
    title: "Partners & Institutional Relationships",
    desc: "The institutions and organisations we work with.",
    href: "/partnerships",
    icon: Handshake,
    image: "/images/sovran photo - partners & intitutional rshps.avif",
  },
  {
    title: "Events",
    desc: "Convenings, roundtables, and public programmes across our markets.",
    href: "/events",
    icon: CalendarCheck02,
    image: "/images/sovran photo - events & convening.avif",
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
  onFocus?: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  controls?: string;
  dropdownKey?: DropdownKey;
}

function NavItem({
  href,
  children,
  hasChevron = false,
  theme = "dark",
  dropdownOpen = false,
  onMouseEnter,
  onFocus,
  onKeyDown,
  controls,
  dropdownKey,
}: NavItemProps) {
  return (
    <ConditionalLink
      href={href}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      data-dropdown-trigger={dropdownKey}
      aria-haspopup={hasChevron ? true : undefined}
      aria-expanded={hasChevron ? dropdownOpen : undefined}
      aria-controls={hasChevron ? controls : undefined}
      className={`group inline-flex items-center gap-1 rounded-xs px-3 py-2 text-base font-medium transition-colors duration-150 select-none cursor-pointer max-md:text-sm max-md:leading-5 ${
        theme === "light"
          ? "text-text-secondary hover:bg-bg-primary-hover"
          : "text-text-secondary hover:bg-bg-primary-hover"
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
    </ConditionalLink>
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

  const titleCls = "text-text-primary";
  const descCls = "text-text-quaternary";
  const itemHover = "hover:bg-bg-primary-hover";
  const activeItem = "bg-bg-primary-hover";

  return (
    <div className="flex flex-col">
      {/* Main row: items + image */}
      <div className="flex gap-6 px-6 pt-5 pb-4 bg-bg-primary">
        {/* Left: item list */}
        <div className="flex flex-col gap-0.5 flex-1">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <ConditionalLink
                key={item.href}
                href={item.href}
                onMouseEnter={() => onItemHover(i)}
                className={`flex items-start gap-3 px-3 py-3 rounded-xs transition-colors duration-150 ${
                  hoveredIdx === i ? activeItem : itemHover
                }`}
              >
                <span
                  className={`mt-0.5 shrink-0 p-1.5 rounded-xs ${
                    isLight ? "bg-bg-quaternary" : "bg-white/10"
                  }`}
                >
                  <Icon size={16} className={descCls} />
                </span>
                <div className="flex flex-col gap-0.5">
                  <p className={`text-sm max-md:text-xs max-md:leading-4 font-medium leading-5 ${titleCls}`}>
                    {item.title}
                  </p>
                  <p className={`text-sm max-md:text-xs max-md:leading-4 leading-5 text-pretty ${descCls}`}>
                    {item.desc}
                  </p>
                </div>
              </ConditionalLink>
            );
          })}
        </div>

        {/* Right: vertically sliding image strip */}
        <div
          className="shrink-0 rounded-xs overflow-hidden"
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
                  {item.overlay && (
                    <Image
                      src={item.overlay}
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Placeholder until About images are provided
            <div
              className={`w-full h-full ${
                isLight ? "bg-border-primary" : "bg-white/10"
              }`}
            />
          )}
        </div>
      </div>

      {/* Footer bar */}
      <div
        className={`flex items-center justify-between gap-4 border-t-[0.5px] border-border-secondary-alt px-9 py-4 ${
          isLight
            ? "bg-bg-secondary"
            : "bg-[color-mix(in_srgb,var(--sovran-color-bg-primary)_97%,white)]"
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`shrink-0 p-1.5 rounded-xs ${
              isLight ? "bg-bg-quaternary" : "bg-white/10"
            }`}
          >
            <FooterIcon size={16} className={descCls} />
          </span>
          <div className="flex flex-col gap-0.5">
            <p className={`text-sm max-md:text-xs max-md:leading-4 font-medium leading-5 ${titleCls}`}>
              {footer.title}
            </p>
            <p className={`text-sm max-md:text-xs max-md:leading-4 leading-5 ${descCls}`}>{footer.desc}</p>
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

interface MobileNavigationProps {
  expanded: DropdownKey | null;
  onNavigate: () => void;
  onToggle: (key: DropdownKey) => void;
}

function MobileNavigation({
  expanded,
  onNavigate,
  onToggle,
}: MobileNavigationProps) {
  return (
    <div
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-x-0 top-18 bottom-0 overflow-y-auto bg-bg-secondary-alt lg:hidden"
    >
      <nav
        aria-label="Mobile navigation"
        className="mx-auto flex w-full max-w-400 flex-col gap-8 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
      >
        <div className="flex flex-col">
          {DROPDOWN_ORDER.map((key) => {
            const panel = PANEL_META[key];
            const isExpanded = expanded === key;

            return (
              <div key={key} className="flex flex-col">
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={`mobile-${key}-links`}
                  onClick={() => onToggle(key)}
                  className="flex w-full cursor-pointer items-center justify-between gap-2 p-3 text-left text-base max-md:text-sm max-md:leading-5 font-medium leading-6 text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
                >
                  <span className="capitalize">{key}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-text-quaternary transition-transform duration-200 motion-reduce:transition-none ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isExpanded ? (
                  <div
                    id={`mobile-${key}-links`}
                    className="overflow-hidden rounded-xs bg-bg-primary-alt"
                  >
                    <div className="flex flex-col gap-0.5 p-1">
                      {panel.items.map((item) => {
                        const Icon = item.icon;

                        return (
                          <ConditionalLink
                            key={item.href}
                            href={item.href}
                            onClick={onNavigate}
                            className="flex items-start gap-3 rounded-xs px-2 py-4 transition-colors duration-150 hover:bg-bg-primary-hover"
                          >
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-xs border border-border-primary bg-bg-primary text-fg-secondary shadow-xs">
                              <Icon size={16} />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm max-md:text-xs max-md:leading-4 font-medium leading-5 text-text-secondary">
                                {item.title}
                              </span>
                              <span className="mt-1 block text-sm max-md:text-xs max-md:leading-4 leading-5 text-text-quaternary">
                                {item.desc}
                              </span>
                            </span>
                          </ConditionalLink>
                        );
                      })}
                    </div>

                    <div className="px-6 py-4">
                      <Button
                        href={panel.footer.href}
                        variant="secondary"
                        size="md"
                        className="w-full justify-center"
                      >
                        {key === "expertise"
                          ? "See Expertise Overview"
                          : "See Our Full History"}
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}

          {[
            { label: "Case Studies", href: "/case-studies" },
            { label: "Perspectives", href: "/perspectives" },
            { label: "Careers", href: "/careers" },
          ].map((item) => (
            <ConditionalLink
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="rounded-xs p-3 text-base max-md:text-sm max-md:leading-5 font-medium leading-6 text-text-secondary transition-colors duration-150 hover:bg-bg-primary-hover"
            >
              {item.label}
            </ConditionalLink>
          ))}
        </div>

        <Button
          href="/contact"
          variant="primary"
          size="lg"
          showIcon={false}
          className="w-full justify-center"
        >
          Contact Us
        </Button>
      </nav>
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<DropdownKey | null>(null);
  const [slideEnabled, setSlideEnabled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<Record<DropdownKey, number>>({
    expertise: 0,
    about: 0,
  });
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const headerRef = useRef<HTMLElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const [lastIndex, setLastIndex] = useState(0);
  const isLight = theme === "light";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    const pageElements = Array.from(document.body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement &&
        !element.contains(headerRef.current) &&
        element !== headerRef.current
    );
    const previousInert = pageElements.map((element) => element.inert);

    document.body.style.overflow = "hidden";
    pageElements.forEach((element) => {
      element.inert = true;
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setMobileExpanded(null);
        window.requestAnimationFrame(() => mobileToggleRef.current?.focus());
        return;
      }

      if (event.key === "Tab" && headerRef.current) {
        const focusableElements = Array.from(
          headerRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((element) => element.offsetParent !== null);
        const first = focusableElements[0];
        const last = focusableElements.at(-1);

        if (!first || !last) return;

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      pageElements.forEach((element, index) => {
        element.inert = previousInert[index];
      });
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

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

  const focusDropdown = (key: DropdownKey) => {
    handleDropdownEnter(key);
    window.requestAnimationFrame(() => {
      document
        .querySelector<HTMLElement>(
          `#desktop-${key}-panel a[href], #desktop-${key}-panel button:not([disabled])`
        )
        ?.focus();
    });
  };

  const displayIndex =
    active !== null ? DROPDOWN_ORDER.indexOf(active) : lastIndex;

  return (
    <header
      ref={headerRef}
      data-scroll-lock-fixed
      data-theme={isLight ? undefined : "dark"}
      className="fixed top-0 left-0 right-0 z-50"
      onMouseLeave={handleLeave}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setActive(null);
          setSlideEnabled(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape" || active === null) return;
        event.preventDefault();
        const trigger = headerRef.current?.querySelector<HTMLElement>(
          `[data-dropdown-trigger="${active}"]`
        );
        setActive(null);
        setSlideEnabled(false);
        trigger?.focus();
      }}
    >
      {/* Nav bar */}
      <div
        className={`h-18 flex items-center justify-center border-b px-4 transition-[background-color,backdrop-filter,border-color] duration-300 ease-out max-lg:px-2 ${
          isLight
            ? active
              ? "bg-bg-tertiary border-transparent max-lg:bg-bg-secondary-alt-2 max-lg:backdrop-blur-[2px]"
              : scrolled
                ? "bg-bg-tertiary border-border-primary max-lg:bg-bg-secondary-alt-2 max-lg:border-transparent max-lg:backdrop-blur-[2px]"
                : "bg-bg-tertiary border-transparent max-lg:bg-bg-secondary-alt-2 max-lg:backdrop-blur-[2px]"
            : scrolled || active || mobileOpen
              ? "bg-black/50 backdrop-blur-md border-transparent max-lg:bg-black/60 max-lg:backdrop-blur-[2px]"
              : "bg-transparent backdrop-blur-none border-transparent"
        }`}
      >
        <div className="flex w-full max-w-[1600px] items-center justify-between px-8 max-lg:px-2">
          <ConditionalLink href="/" className="shrink-0">
            <Image
              src={isLight ? "/sovran-logo-light.svg" : "/sovran-logo.svg"}
              alt="Sovran"
              width={121}
              height={40}
              priority
              className="max-lg:h-10 max-lg:w-[121px]"
            />
          </ConditionalLink>

          <nav className="flex items-center max-lg:hidden">
            <NavItem
              href="/expertise"
              hasChevron
              theme={theme}
              dropdownOpen={active === "expertise"}
              onMouseEnter={() => handleDropdownEnter("expertise")}
              onFocus={() => handleDropdownEnter("expertise")}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  focusDropdown("expertise");
                }
              }}
              controls="desktop-expertise-panel"
              dropdownKey="expertise"
            >
              Expertise
            </NavItem>
            <NavItem
              href="/about"
              hasChevron
              theme={theme}
              dropdownOpen={active === "about"}
              onMouseEnter={() => handleDropdownEnter("about")}
              onFocus={() => handleDropdownEnter("about")}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  focusDropdown("about");
                }
              }}
              controls="desktop-about-panel"
              dropdownKey="about"
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
              href="/perspectives"
              theme={theme}
              onMouseEnter={handleNonDropdownEnter}
            >
              Perspectives
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
            className="max-lg:hidden"
          >
            Contact Us
          </Button>

          <button
            ref={mobileToggleRef}
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setActive(null);
              setMobileOpen((open) => !open);
              if (mobileOpen) setMobileExpanded(null);
            }}
            className={`hidden size-10 cursor-pointer items-center justify-center rounded-xs border shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current max-lg:flex ${
              isLight
                ? "border-border-primary bg-bg-primary text-text-secondary hover:bg-bg-primary-hover"
                : "border-border-primary bg-black/50 text-text-primary hover:bg-black/60"
            }`}
          >
            {mobileOpen ? <XClose size={22} /> : <Menu01 size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <MobileNavigation
          expanded={mobileExpanded}
          onNavigate={() => {
            setMobileOpen(false);
            setMobileExpanded(null);
          }}
          onToggle={(key) =>
            setMobileExpanded((current) => (current === key ? null : key))
          }
        />
      ) : null}

      {/* Dropdown panel */}
      <div
        id="desktop-navigation-dropdown"
        aria-hidden={active === null}
        inert={active === null}
        className={`grid justify-items-center transition-[grid-template-rows] duration-300 ease-out max-lg:hidden ${
          active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div
          className="w-full max-w-250 rounded-b-xs overflow-hidden shadow-[0px_20px_24px_-4px_#00000014,0px_8px_8px_-4px_#00000008,0px_3px_3px_-1.5px_#0000000a]"
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
              <div
                id="desktop-expertise-panel"
                style={{ width: "50%" }}
                aria-hidden={active !== "expertise"}
                inert={active !== "expertise"}
              >
                <DropdownPanel
                  panelKey="expertise"
                  theme={theme}
                  hoveredIdx={hoveredIdx.expertise}
                  onItemHover={(i) =>
                    setHoveredIdx((prev) => ({ ...prev, expertise: i }))
                  }
                />
              </div>
              <div
                id="desktop-about-panel"
                style={{ width: "50%" }}
                aria-hidden={active !== "about"}
                inert={active !== "about"}
              >
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
