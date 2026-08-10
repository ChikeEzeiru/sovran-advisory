import { Button } from "@/components/ui/Button";
import { ConditionalLink } from "@/components/ui/ConditionalLink";

const EASE = "cubic-bezier(0.65,0,0.35,1)";

function ArrowRight({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
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

const ARTICLES = [
  {
    images: [
      "/images/intelligence/article1-1.png",
      "/images/intelligence/article1-2.png",
      "/images/intelligence/article1-3.png",
      "/images/intelligence/article1-4.png",
      "/images/intelligence/article1-5.png",
    ],
    category: "Policy Brief",
    title:
      "Cross-Border Settlement Interoperability: What the Nairobi Forum Revealed, Regulators have agreed on the technical fix. They have not yet agreed who is liable when it fails.",
    href: "/intelligence/cross-border-settlement-interoperability",
  },
  {
    images: ["/images/intelligence/article2.png"],
    category: "Report",
    title:
      "Data Minimisation as a Trust Strategy: Lessons from National Digital ID Rollouts, Systems collecting less personal data are seeing higher voluntary enrolment than those collecting more.",
    href: "/intelligence/data-minimisation-trust-strategy",
  },
];

function ArticleCard({ article }: { article: (typeof ARTICLES)[0] }) {
  return (
    <div className="group/card flex flex-1 flex-col gap-6 min-w-0">
      {/* Photo */}
      <ConditionalLink
        href={article.href}
        className="relative block h-96 rounded-xl overflow-hidden shrink-0"
      >
        {article.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={i === 0 ? article.category : ""}
            aria-hidden={i > 0}
            className="absolute inset-0 size-full object-cover will-change-transform transition-transform duration-700 ease-out group-hover/card:scale-105 motion-reduce:transition-none"
          />
        ))}
      </ConditionalLink>

      {/* Meta */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-normal leading-5 text-[#67787c]">
          {article.category}
        </p>

        <p className="text-xl font-normal leading-normal text-[#4b585b]">
          {article.title}
        </p>
      </div>

      {/* Read link */}
      <ConditionalLink
        href={article.href}
        className="inline-flex items-center gap-1.5 text-base font-semibold text-[#525252]"
      >
        <span className="relative overflow-hidden inline-flex h-6">
          <span
            className="leading-6 whitespace-nowrap transition-transform duration-380 group-hover/card:-translate-y-full motion-reduce:transition-none"
            style={{ transitionTimingFunction: EASE }}
          >
            Read Article
          </span>
          <span
            aria-hidden
            className="absolute top-full left-0 leading-6 whitespace-nowrap transition-transform duration-380 group-hover/card:-translate-y-full motion-reduce:transition-none"
            style={{ transitionTimingFunction: EASE }}
          >
            Read Article
          </span>
        </span>
        <span className="relative overflow-hidden inline-flex items-center w-4 h-4 shrink-0">
          <ArrowRight
            className="shrink-0 transition-transform duration-380 group-hover/card:translate-x-full motion-reduce:transition-none"
            style={{ transitionTimingFunction: EASE }}
          />
          <ArrowRight
            className="absolute inset-0 shrink-0 -translate-x-full transition-transform duration-380 group-hover/card:translate-x-0 motion-reduce:transition-none"
            style={{ transitionTimingFunction: EASE }}
          />
        </span>
      </ConditionalLink>
    </div>
  );
}

export function IntelligenceSection() {
  return (
    <section className="py-24">
      <div className="flex flex-col gap-16 px-12 max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <div className="flex items-start justify-between w-full">
          <div className="flex flex-col gap-3 flex-1 min-w-0 max-w-200">
            <div className="self-start border border-[#d0d6d8] rounded-[10px] px-3 py-1">
              <span className="text-base font-normal leading-6 text-[#67787c] whitespace-nowrap">
                Insights
              </span>
            </div>
            <p className="text-4xl font-medium leading-11 tracking-tight text-[#161b1d]">
              Our analysis across African markets.
            </p>
          </div>
          <Button variant="secondary" size="md" href="/intelligence">
            See All
          </Button>
        </div>

        {/* Articles */}
        <div className="flex gap-6">
          {ARTICLES.map((article) => (
            <ArticleCard key={article.href} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
