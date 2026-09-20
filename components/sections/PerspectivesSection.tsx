"use client";

import {
  useState,
  useId,
  useEffect,
  useRef,
  useCallback,
  type PointerEvent,
} from "react";
import Image from "next/image";
import { Squircle } from "@squircle-js/react";
import { Button } from "@/components/ui/Button";

// Squeezy carousel layout constants (adapted from Stripe's pattern)
const S_GAP = 8; // gap before small cards (col >= 4)
const L_GAP = 16; // gap before medium/active cards (col 1–3)
const S_W = 8; // small card resting width
const S_HOVER = 3; // small card hover expansion in px

// Column flex fractions applied to totalMediumCardWidth.
// Fractions sum to 1.0 for any hover combination, filling the row exactly.
const DEF_F = [-0.06, 0.61, 0.3, 0.15]; // default (no hover)
const STR_F = [0, 0.71, 0.4, 0.25]; // stretched (this col is hovered)
const SQZ_F = [-0.12, 0.59, 0.28, 0.13]; // squeezed (another col is hovered)

const ANIM_DUR = 1000; // ms
const EASE = "cubic-bezier(0.19,1,0.22,1)";
const SLOT_OVERLAY_OPACITY = [0, 0, 0.2, 0.48, 0.85];
const MOBILE_ANIM_DUR = 700;
const MOBILE_GAP = 8;
const MOBILE_SLOT_WEIGHTS = [196, 88, 44, 20, 8] as const;
const MOBILE_TOTAL_SLOT_WIDTH = MOBILE_SLOT_WEIGHTS.reduce(
  (total, width) => total + width,
  0
);

function overlayOpacity(columnIndex: number) {
  if (columnIndex < 0) return 0;
  return SLOT_OVERLAY_OPACITY[
    Math.min(columnIndex, SLOT_OVERLAY_OPACITY.length - 1)
  ];
}

function mobileOverlayOpacity(columnIndex: number) {
  return columnIndex < 0 ? SLOT_OVERLAY_OPACITY.at(-1)! : overlayOpacity(columnIndex);
}

function computeMobileSlotLayout(rowWidth: number) {
  const availableWidth = Math.max(
    rowWidth - MOBILE_GAP * (MOBILE_SLOT_WEIGHTS.length - 1),
    0
  );
  const scale = availableWidth / MOBILE_TOTAL_SLOT_WIDTH;
  const widths = MOBILE_SLOT_WEIGHTS.map((width) => width * scale);
  const positions = widths.reduce<number[]>((result, width, index) => {
    const previousX = result[index - 1];
    const previousWidth = widths[index - 1];
    result.push(
      index === 0
        ? 0
        : previousX + previousWidth + MOBILE_GAP
    );
    return result;
  }, []);

  return { positions, widths };
}

const ARTICLES = [
  {
    image: "/images/intelligence/Blog thumbnail-Digital Infrastructure.avif",
    collapsedOffsetX: 0,
    title: "Nigeria’s next digital infrastructure cycle.",
    body: "A new cycle emerging around identity, payments, connectivity and the systems",
    cta: "Read the report",
    href: "/perspectives/cross-border-settlement-interoperability",
  },
  {
    image: "/images/intelligence/Blog thumbnail-Cross border.avif",
    collapsedOffsetX: 0,
    title: "What regulatory fragmentation means for cross-border growth.",
    body: "The next phase of digital finance growth will be shaped by the ability to manage data minimisation and trust.",
    cta: "Read the report",
    href: "/perspectives/data-minimisation-trust-strategy",
  },
  {
    image: "/images/intelligence/Blog thumbnail-Market entry.avif",
    collapsedOffsetX: 0,
    title: "Why market entry fails after the strategy is approved.",
    body: "Regulatory arbitrage is a key driver of digital finance growth, but it is not a sustainable strategy.",
    cta: "Read the analysis",
    href: "/perspectives/regulatory-arbitrage-digital-finance",
  },
  {
    image: "/images/intelligence/Blog thumbnail-Payments.avif",
    collapsedOffsetX: 0,
    title: "The new competitive landscape for African payments.",
    body: "The architecture of trust is the new battleground for cross-border payments.",
    cta: "Read the brief",
    href: "/perspectives/architecture-of-trust",
  },
  {
    image: "/images/intelligence/Blog thumbnail-Single market.avif",
    collapsedOffsetX: 0,
    title: "The cost of treating Africa as a single market.",
    body: "A new report from the Digital Finance Institute explores the challenges of cross-border payments in Africa.",
    cta: "Read the report",
    href: "/perspectives/cbdc-deployment-patterns",
  },
];

const N = ARTICLES.length;
// numSmallCards = clamp(N - 4, 1, 3) — for N=5: 1 small card
const NUM_SMALL = Math.max(1, Math.min(3, N - 4));
const VISIBLE = 4 + NUM_SMALL;
// Total gap: S_GAP per small card + L_GAP × 3 (between the 4 main columns)
const TOT_GAP = S_GAP * NUM_SMALL + 3 * L_GAP;

type RenderCard = {
  instanceId: number;
  articleIndex: number;
  columnIndex: number;
};

function MobileArticleDetails({
  article,
  className = "",
  style,
}: {
  article: (typeof ARTICLES)[number];
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`flex flex-col gap-4 ${className}`} style={style}>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-medium leading-7.5 text-text-secondary max-md:text-lg max-md:leading-7">
          {article.title}
        </h3>
        <p className="text-base leading-6 text-text-tertiary max-md:text-sm max-md:leading-5">
          {article.body}
        </p>
      </div>
      <Button
        href={article.href}
        variant="secondary"
        size="lg"
        className="w-full justify-center"
      >
        View
      </Button>
    </div>
  );
}

function computeWidths(
  colOneBaseW: number,
  totalMedW: number,
  hovCol: number
): number[] {
  const smallHov = hovCol >= 4;
  const medOffset = smallHov ? S_HOVER : 0;
  const fracs =
    hovCol >= 0 && hovCol <= 3
      ? DEF_F.map((_, j) => (j === hovCol ? STR_F[j] : SQZ_F[j]))
      : [...DEF_F];
  const effMedW = totalMedW - medOffset;
  return Array.from({ length: VISIBLE }, (_, k) => {
    if (k >= 4) return S_W + (hovCol === k ? medOffset : 0);
    if (k === 0) return colOneBaseW + effMedW * fracs[0];
    return effMedW * fracs[k];
  });
}

export function PerspectivesSection() {
  const [current, setCurrent] = useState(0);
  const [hoveredArt, setHoveredArt] = useState(-1);
  const [renderCards, setRenderCards] = useState<RenderCard[]>(() =>
    ARTICLES.map((_, index) => ({
      instanceId: index,
      articleIndex: index,
      columnIndex: index,
    }))
  );
  const [cardsOffset, setCardsOffset] = useState(0);
  const [transitionCards, setTransitionCards] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [mobileCards, setMobileCards] = useState<RenderCard[]>(() =>
    ARTICLES.map((_, index) => ({
      instanceId: index,
      articleIndex: index,
      columnIndex: index,
    }))
  );
  const [mobileRowWidth, setMobileRowWidth] = useState(0);
  const [transitionMobileCards, setTransitionMobileCards] = useState(true);
  const [isMobileNavigating, setIsMobileNavigating] = useState(false);
  const [previousMobileArticle, setPreviousMobileArticle] = useState<
    number | null
  >(null);
  const [showMobileArticle, setShowMobileArticle] = useState(true);
  const headingId = useId();

  const rowRef = useRef<HTMLDivElement>(null);
  const mobileRowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const nextInstanceId = useRef(N);
  const nextMobileInstanceId = useRef(N);
  const navigationFrames = useRef<number[]>([]);
  const mobileNavigationFrames = useRef<number[]>([]);
  const navigationTimer = useRef<number | null>(null);
  const mobileNavigationTimer = useRef<number | null>(null);
  const [dims, setDims] = useState<{
    colOneBaseW: number;
    totalMedW: number;
  } | null>(null);
  const [reduced, setReduced] = useState(false);
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePreferences = () => {
      setReduced(reducedQuery.matches);
      setSupportsHover(hoverQuery.matches);
    };

    updatePreferences();
    reducedQuery.addEventListener("change", updatePreferences);
    hoverQuery.addEventListener("change", updatePreferences);
    return () => {
      reducedQuery.removeEventListener("change", updatePreferences);
      hoverQuery.removeEventListener("change", updatePreferences);
    };
  }, []);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      const colOneBaseW = height * (16 / 9);
      const totalMedW = width - colOneBaseW - TOT_GAP - S_W * NUM_SMALL;
      setDims({ colOneBaseW, totalMedW });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const row = mobileRowRef.current;
    if (!row) return;

    const update = () => setMobileRowWidth(row.getBoundingClientRect().width);
    const observer = new ResizeObserver(update);
    observer.observe(row);
    update();

    return () => observer.disconnect();
  }, []);

  const dur = reduced ? 0 : ANIM_DUR;
  // hoveredCol: column position of the hovered article relative to current
  const hovCol = hoveredArt >= 0 ? (hoveredArt - current + N) % N : -1;

  const widths = dims
    ? computeWidths(dims.colOneBaseW, dims.totalMedW, hovCol)
    : null;
  const cardLayout = widths
    ? renderCards.reduce<Array<{ x: number; width: number }>>(
        (layout, card, index) => {
          const previous = layout[index - 1];
          const x = previous
            ? previous.x +
              previous.width +
              (card.columnIndex < 4 ? L_GAP : S_GAP)
            : cardsOffset;
          const width =
            card.columnIndex >= 0 && card.columnIndex < VISIBLE
              ? widths[card.columnIndex]
              : S_W;
          layout.push({ x, width });
          return layout;
        },
        []
      )
    : null;

  const mobileSlotLayout = computeMobileSlotLayout(mobileRowWidth);
  const mobileBaseWidth = mobileSlotLayout.widths[0] ?? 0;
  const mobileDur = reduced ? 0 : MOBILE_ANIM_DUR;

  const getMobileCardLayout = (columnIndex: number) => {
    const lastColumn = MOBILE_SLOT_WEIGHTS.length - 1;
    const smallWidth = mobileSlotLayout.widths[lastColumn] ?? 0;

    if (columnIndex < 0) {
      return {
        x: columnIndex * (smallWidth + MOBILE_GAP),
        width: smallWidth,
      };
    }

    if (columnIndex > lastColumn) {
      return {
        x:
          mobileRowWidth +
          MOBILE_GAP +
          (columnIndex - lastColumn - 1) * (smallWidth + MOBILE_GAP),
        width: smallWidth,
      };
    }

    return {
      x: mobileSlotLayout.positions[columnIndex] ?? 0,
      width: mobileSlotLayout.widths[columnIndex] ?? smallWidth,
    };
  };

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!supportsHover) return;

      if (isNavigating) return;

      const nextCardIndex = renderCards.findIndex((_, index) => {
        const card = cardRefs.current[index];
        if (!card) return false;
        const rect = card.getBoundingClientRect();
        return event.clientX >= rect.left && event.clientX <= rect.right;
      });
      const nextArticle = renderCards[nextCardIndex]?.articleIndex ?? -1;

      // Match Stripe: gaps preserve the current hover instead of collapsing
      // or handing control to a neighbouring card.
      if (nextArticle >= 0 && nextArticle !== hoveredArt) {
        setHoveredArt(nextArticle);
      }
    },
    [hoveredArt, isNavigating, renderCards, supportsHover]
  );

  const navigateBy = useCallback(
    (direction: 1 | -1, requestedSteps = 1) => {
      if (isNavigating || !dims) return;

      const steps = Math.max(1, Math.min(requestedSteps, N - 1));
      const edgeCards =
        direction === 1
          ? renderCards.slice(0, steps)
          : renderCards.slice(-steps);
      const clones = edgeCards.map((card, index) => ({
        instanceId: nextInstanceId.current++,
        articleIndex: card.articleIndex,
        columnIndex:
          direction === 1 ? VISIBLE + index : -steps + index,
      }));
      const stagedCards =
        direction === 1
          ? [...renderCards, ...clones]
          : [...clones, ...renderCards];
      const stagedOffset =
        direction === 1 ? 0 : -steps * (S_W + L_GAP);

      setHoveredArt(-1);
      setIsNavigating(true);
      setTransitionCards(false);
      setRenderCards(stagedCards);
      setCardsOffset(stagedOffset);
      setCurrent((value) => (value + direction * steps + N) % N);

      const firstFrame = window.requestAnimationFrame(() => {
        const secondFrame = window.requestAnimationFrame(() => {
          setTransitionCards(true);
          setRenderCards((cards) =>
            cards.map((card, index) => ({
              ...card,
              columnIndex: direction === 1 ? index - steps : index,
            }))
          );
          setCardsOffset(direction === 1 ? -steps * (S_W + L_GAP) : 0);

          navigationTimer.current = window.setTimeout(() => {
            setTransitionCards(false);
            setRenderCards((cards) => {
              const visibleCards =
                direction === 1
                  ? cards.slice(steps)
                  : cards.slice(0, -steps);
              return visibleCards.map((card, index) => ({
                ...card,
                columnIndex: index,
              }));
            });
            setCardsOffset(0);
            setIsNavigating(false);

            const normalizationFrame = window.requestAnimationFrame(() => {
              setTransitionCards(true);
            });
            navigationFrames.current.push(normalizationFrame);
          }, dur);
        });
        navigationFrames.current.push(secondFrame);
      });
      navigationFrames.current.push(firstFrame);
    },
    [dims, dur, isNavigating, renderCards]
  );

  const navigateMobileBy = useCallback(
    (direction: 1 | -1, requestedSteps = 1) => {
      if (isMobileNavigating || mobileRowWidth === 0) return;

      const steps = Math.max(1, Math.min(requestedSteps, N - 1));
      const edgeCards =
        direction === 1
          ? mobileCards.slice(0, steps)
          : mobileCards.slice(-steps);
      const clones = edgeCards.map((card, index) => ({
        instanceId: nextMobileInstanceId.current++,
        articleIndex: card.articleIndex,
        columnIndex: direction === 1 ? N + index : -steps + index,
      }));
      const stagedCards =
        direction === 1
          ? [...mobileCards, ...clones]
          : [...clones, ...mobileCards];

      setIsMobileNavigating(true);
      setTransitionMobileCards(false);
      setMobileCards(stagedCards);
      setPreviousMobileArticle(current);
      setShowMobileArticle(false);
      setCurrent((value) => (value + direction * steps + N) % N);

      const firstFrame = window.requestAnimationFrame(() => {
        const secondFrame = window.requestAnimationFrame(() => {
          setTransitionMobileCards(true);
          setShowMobileArticle(true);
          setMobileCards((cards) =>
            cards.map((card, index) => ({
              ...card,
              columnIndex: direction === 1 ? index - steps : index,
            }))
          );

          mobileNavigationTimer.current = window.setTimeout(() => {
            setTransitionMobileCards(false);
            setMobileCards((cards) => {
              const visibleCards =
                direction === 1
                  ? cards.slice(steps)
                  : cards.slice(0, -steps);
              return visibleCards.map((card, index) => ({
                ...card,
                columnIndex: index,
              }));
            });
            setIsMobileNavigating(false);
            setPreviousMobileArticle(null);

            const normalizationFrame = window.requestAnimationFrame(() => {
              setTransitionMobileCards(true);
            });
            mobileNavigationFrames.current.push(normalizationFrame);
          }, mobileDur);
        });
        mobileNavigationFrames.current.push(secondFrame);
      });
      mobileNavigationFrames.current.push(firstFrame);
    },
    [current, isMobileNavigating, mobileCards, mobileDur, mobileRowWidth]
  );

  const handleCarouselClick = useCallback(() => {
    const clickedCol =
      hoveredArt >= 0 ? (hoveredArt - current + N) % N : -1;
    if (clickedCol > 0) navigateBy(1, clickedCol);
  }, [current, hoveredArt, navigateBy]);

  useEffect(() => {
    const frames = navigationFrames.current;
    const mobileFrames = mobileNavigationFrames.current;
    return () => {
      frames.forEach(window.cancelAnimationFrame);
      mobileFrames.forEach(window.cancelAnimationFrame);
      if (navigationTimer.current !== null) {
        window.clearTimeout(navigationTimer.current);
      }
      if (mobileNavigationTimer.current !== null) {
        window.clearTimeout(mobileNavigationTimer.current);
      }
    };
  }, []);

  function prev() {
    navigateBy(-1);
  }
  function next() {
    navigateBy(1);
  }

  return (
    <section aria-labelledby={headingId} className="py-20 max-md:py-12">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-10 px-12 max-md:gap-12 max-md:px-4">
        {/* Header: stacked heading+subheading left, nav buttons right */}
        <header className="flex items-start justify-between max-md:flex-col max-md:gap-2">
          <div className="flex flex-col gap-3">
            <h2
              id={headingId}
              className="text-[36px] font-medium leading-11 tracking-[-0.72px] text-text-secondary max-md:text-3xl max-md:leading-[38px]"
            >
              <span className="max-md:hidden">What&apos;s happening</span>
              <span className="hidden max-md:inline">What we are seeing.</span>
            </h2>
            <p className="text-[20px] font-normal leading-7.5 text-text-tertiary max-md:max-w-sm max-md:text-lg max-md:leading-7">
              <span className="max-md:hidden">
                Our latest perspectives and analysis.
              </span>
              <span className="hidden max-md:inline">
                Short, useful analysis for people making decisions across
                changing markets.
              </span>
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 max-md:self-end">
            <Squircle asChild cornerRadius={2} cornerSmoothing={0.6}>
              <button
                type="button"
                onClick={() => {
                  if (window.matchMedia("(max-width: 767px)").matches) {
                    navigateMobileBy(-1);
                    return;
                  }
                  prev();
                }}
                disabled={isNavigating || isMobileNavigating}
                aria-label="Previous article"
                className="relative inline-flex items-center justify-center p-3 cursor-pointer bg-bg-primary hover:bg-bg-primary-hover text-text-secondary shadow-xs ring-1 ring-border-primary ring-inset transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M9.613 2.62 5.107 7.124h9.137v1.75H5.107l4.506 4.506-1.238 1.238-6-6L1.756 8l.619-.62 6-6 1.238 1.24Z" />
                </svg>
              </button>
            </Squircle>
            <Squircle asChild cornerRadius={2} cornerSmoothing={0.6}>
              <button
                type="button"
                onClick={() => {
                  if (window.matchMedia("(max-width: 767px)").matches) {
                    navigateMobileBy(1);
                    return;
                  }
                  next();
                }}
                disabled={isNavigating || isMobileNavigating}
                aria-label="Next article"
                className="relative inline-flex items-center justify-center p-3 cursor-pointer bg-bg-primary hover:bg-bg-primary-hover text-text-secondary shadow-xs ring-1 ring-border-primary ring-inset transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="m6.387 2.62 4.506 4.505H1.756v1.75h9.137l-4.506 4.506 1.238 1.238 6-6L14.245 8l-.618-.62-6-6-1.239 1.24Z" />
                </svg>
              </button>
            </Squircle>
          </div>
        </header>

        {/* Desktop carousel */}
        <div className="hidden md:flex flex-col gap-8">
          {/* Image strip: transient edge cards keep navigation spatially continuous */}
          <div
            ref={rowRef}
            className="relative h-115 overflow-hidden"
          >
            {dims &&
              cardLayout &&
              renderCards.map((card, renderIndex) => {
                const article = ARTICLES[card.articleIndex];
                const col = card.columnIndex;
                const { x, width: w } = cardLayout[renderIndex];
                // Image focal offset: 0 when active, article's collapsedOffsetX otherwise
                const collOX = col === 0 ? 0 : article.collapsedOffsetX;

                return (
                  <div
                    key={card.instanceId}
                    ref={(node) => {
                      cardRefs.current[renderIndex] = node;
                    }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: `${w}px`,
                      height: "100%",
                      overflow: "hidden",
                      borderRadius: "2px",
                      pointerEvents: "none",
                      transform: `translate3d(${x}px, 0, 0)`,
                      transition: transitionCards
                        ? `transform ${dur}ms ${EASE}, width ${dur}ms ${EASE}`
                        : "none",
                      willChange: "transform, width",
                    }}
                    aria-hidden={col !== 0 ? true : undefined}
                  >
                    {/*
                      Image is always imageWidth (= colOneBaseW) pixels wide — the container
                      clips it. This is the "reveal" mechanic: the image doesn't resize,
                      the window over it narrows/widens.
                    */}
                    <Image
                      src={article.image}
                      alt={col === 0 ? article.title : ""}
                      width={2640}
                      height={1440}
                      sizes="818px"
                      style={{
                        position: "absolute",
                        top: 0,
                        height: "100%",
                        width: `${dims.colOneBaseW}px`,
                        maxWidth: "none",
                        left: "50%",
                        transform: `translateX(calc(-50% - ${collOX}px))`,
                        transition: `transform ${dur}ms ${EASE}`,
                      }}
                    />
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor:
                          "var(--sovran-color-bg-primary-solid)",
                        opacity: overlayOpacity(col),
                        pointerEvents: "none",
                        transition: transitionCards
                          ? `opacity ${dur}ms ${EASE}`
                          : "none",
                        willChange: "opacity",
                      }}
                    />
                  </div>
                );
              })}
            <div
              className="absolute inset-0 z-10"
              style={{ cursor: hovCol >= 0 ? "pointer" : "default" }}
              onPointerEnter={handlePointerMove}
              onPointerMove={handlePointerMove}
              onPointerLeave={() => setHoveredArt(-1)}
              onClick={handleCarouselClick}
              aria-hidden="true"
            />
          </div>

          {/* Stripe-style details: overlapping panels crossfade as one unit */}
          <div className="relative min-h-44">
            {/* Spacer: holds height from tallest article */}
            <div
              className="invisible pointer-events-none flex items-center justify-between gap-8"
              aria-hidden="true"
            >
              <div className="flex flex-col gap-2 max-w-[65%]">
                <span className="block text-[24px] max-md:text-xl max-md:leading-7.5 font-medium leading-8 text-text-secondary">
                  {ARTICLES[0].title}
                </span>
                <span className="block text-[18px] max-md:text-base max-md:leading-6 font-normal leading-7 text-text-secondary">
                  {ARTICLES[0].body}
                </span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                showIcon
                className="shrink-0"
              >
                {ARTICLES[0].cta}
              </Button>
            </div>

            {ARTICLES.map((article, index) => {
              const isActive = index === current;

              return (
                <div
                  key={article.href}
                  className="absolute inset-0 flex items-center justify-between gap-8"
                  style={{
                    opacity: isActive ? 1 : 0,
                    visibility: isActive ? "visible" : "hidden",
                    pointerEvents: isActive ? "auto" : "none",
                    transition: reduced
                      ? "none"
                      : isActive
                        ? "opacity 240ms cubic-bezier(0.23,1,0.32,1), visibility 0s"
                        : "opacity 180ms cubic-bezier(0.23,1,0.32,1), visibility 0s linear 180ms",
                  }}
                  aria-hidden={!isActive}
                  inert={!isActive}
                >
                  <div className="flex flex-col gap-2 max-w-[65%]">
                    <span className="block text-[24px] max-md:text-xl max-md:leading-7.5 font-medium leading-8 text-text-secondary">
                      {article.title}
                    </span>
                    <span className="block text-[18px] max-md:text-base max-md:leading-6 font-normal leading-7 text-text-secondary">
                      {article.body}
                    </span>
                  </div>
                  <Button
                    href={article.href}
                    variant="secondary"
                    size="sm"
                    showIcon
                    className="shrink-0"
                  >
                    {article.cta}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: compact squeezy composition from the mobile design. */}
        <div className="hidden flex-col gap-12 max-md:flex">
          <div
            ref={mobileRowRef}
            className="relative h-95 w-full overflow-hidden"
          >
            {mobileRowWidth > 0 &&
              mobileCards.map((card) => {
              const article = ARTICLES[card.articleIndex];
              const { x, width } = getMobileCardLayout(card.columnIndex);
              const rightInset = Math.max(mobileBaseWidth - width, 0);

              return (
                <button
                  key={card.instanceId}
                  type="button"
                  onClick={() => {
                    if (
                      card.columnIndex > 0 &&
                      card.columnIndex < N &&
                      !isMobileNavigating
                    ) {
                      navigateMobileBy(1, card.columnIndex);
                    }
                  }}
                  aria-label={
                    card.columnIndex === 0
                      ? article.title
                      : `Show ${article.title}`
                  }
                  aria-hidden={
                    card.columnIndex < 0 || card.columnIndex >= N
                      ? true
                      : undefined
                  }
                  tabIndex={
                    card.columnIndex < 0 || card.columnIndex >= N ? -1 : 0
                  }
                  className="absolute top-0 left-0 h-full cursor-pointer overflow-hidden rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
                  style={{
                    width: `${mobileBaseWidth}px`,
                    clipPath: `inset(0 ${rightInset}px 0 0)`,
                    transform: `translate3d(${x}px, 0, 0)`,
                    transition: transitionMobileCards
                      ? `transform ${mobileDur}ms ${EASE}, clip-path ${mobileDur}ms ${EASE}`
                      : "none",
                    willChange: "transform, clip-path",
                  }}
                >
                  <Image
                    src={article.image}
                    alt={card.columnIndex === 0 ? article.title : ""}
                    width={2640}
                    height={1440}
                    sizes="196px"
                    className="absolute inset-0 h-full w-full max-w-none object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-bg-primary-solid"
                    style={{
                      opacity: mobileOverlayOpacity(card.columnIndex),
                      transition: transitionMobileCards
                        ? `opacity ${mobileDur}ms ${EASE}`
                        : "none",
                    }}
                  />
                </button>
              );
            })}
          </div>

          <div className="relative">
            <MobileArticleDetails
              article={ARTICLES[current]}
              style={{
                opacity: showMobileArticle ? 1 : 0,
                transition: reduced
                  ? "none"
                  : `opacity 240ms cubic-bezier(0.23,1,0.32,1)`,
              }}
            />
            {previousMobileArticle !== null ? (
              <MobileArticleDetails
                article={ARTICLES[previousMobileArticle]}
                className="pointer-events-none absolute inset-0"
                style={{
                  opacity: showMobileArticle ? 0 : 1,
                  transition: reduced
                    ? "none"
                    : `opacity 180ms cubic-bezier(0.23,1,0.32,1)`,
                }}
              />
            ) : null}
          </div>
        </div>

        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {`Article ${current + 1} of ${N}: ${ARTICLES[current].title}`}
        </div>
      </div>
    </section>
  );
}
