import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { InternalPageHero } from "@/components/sections/InternalPageHero";
import { ConditionalLink } from "@/components/ui/ConditionalLink";
import { PERSPECTIVES } from "@/lib/perspectives";
import { PERSPECTIVE_DETAILS } from "@/lib/perspective-details";

export const metadata: Metadata = { title: "Perspectives", description: "Short, useful analysis for people making decisions across changing markets." };

export default function PerspectivesPage() {
  const featuredSlugs = [
    "the-new-competitive-landscape-for-african-payments",
    "regulatory-fragmentation-cross-border-growth",
    "signals-reshaping-east-african-logistics",
  ];
  const featured = featuredSlugs.flatMap((slug) => {
    const article = PERSPECTIVES.find((item) => item.slug === slug);
    return article ? [article] : [];
  });
  const articles = PERSPECTIVES.filter((article) => !featuredSlugs.includes(article.slug));

  return <><Navbar theme="light" /><main>
    <InternalPageHero eyebrow="Perspectives" title="What we are seeing." intro="Short, useful analysis for people making decisions across changing markets." />
    <section className="mx-auto w-full max-w-400 px-12 pb-24 max-md:px-6 max-md:pb-16">
      <div className="mb-16 flex flex-col gap-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-text-quaternary">Featured Perspectives</p>
          <h2 className="mt-3 text-3xl font-medium leading-9 tracking-tight text-text-primary">Questions shaping decisions now.</h2>
        </div>

        <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
          {featured[0] && (
            <ConditionalLink href={`/perspectives/${featured[0].slug}`} className="group flex min-w-0 flex-col gap-5">
              <div className="relative aspect-4/3 overflow-hidden rounded-xs bg-bg-quaternary max-lg:aspect-16/9">
                <Image src={PERSPECTIVE_DETAILS[featured[0].slug].image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none" />
                <span aria-hidden="true" className="absolute inset-0 bg-black/10" />
              </div>
              <div>
                <p className="text-sm text-text-quaternary">{featured[0].type} · {featured[0].topic}</p>
                <h3 className="mt-2 max-w-2xl text-3xl font-medium leading-9 tracking-tight text-text-secondary group-hover:text-text-brand-secondary">{featured[0].title}</h3>
                <p className="mt-3 max-w-2xl text-base leading-6 text-text-tertiary">{featured[0].summary}</p>
              </div>
            </ConditionalLink>
          )}

          <div className="grid grid-rows-2 gap-6 max-lg:grid-cols-2 max-lg:grid-rows-1 max-md:grid-cols-1">
            {featured.slice(1).map((article) => (
              <ConditionalLink key={article.slug} href={`/perspectives/${article.slug}`} className="group grid min-w-0 grid-cols-2 gap-5 border-t border-border-primary pt-5 max-xl:grid-cols-1 max-lg:grid-cols-1">
                <div className="relative min-h-48 overflow-hidden rounded-xs bg-bg-quaternary max-lg:aspect-16/10">
                  <Image src={PERSPECTIVE_DETAILS[article.slug].image} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none" />
                  <span aria-hidden="true" className="absolute inset-0 bg-black/10" />
                </div>
                <div className="flex flex-col justify-between gap-6">
                  <p className="text-sm text-text-quaternary">{article.type} · {article.topic}</p>
                  <div><h3 className="text-2xl font-medium leading-8 tracking-tight text-text-secondary group-hover:text-text-brand-secondary">{article.title}</h3><p className="mt-3 text-sm leading-5 text-text-tertiary">{article.summary}</p></div>
                </div>
              </ConditionalLink>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-12 flex flex-wrap gap-2 border-y border-border-primary py-4" aria-label="Perspective filters">
        {["All", "Market brief", "Analysis", "Sector insight", "Policy brief", "Research"].map((filter, index) => <button key={filter} type="button" className={`rounded-xs px-3 py-2 text-sm transition-colors ${index === 0 ? "bg-bg-primary-solid text-text-primary-on-brand" : "bg-bg-secondary-alt text-text-tertiary hover:text-text-primary"}`}>{filter}</button>)}
      </div>
      <div className="grid grid-cols-2 gap-x-12 max-lg:grid-cols-1">
        {articles.map((article, index) => <ConditionalLink key={article.slug} href={`/perspectives/${article.slug}`} className="group flex min-h-72 flex-col justify-between border-t border-border-primary py-6 last:border-b max-lg:min-h-60">
          <div className="flex items-center justify-between gap-4"><p className="text-sm text-text-quaternary">{article.type} · {article.topic}</p><span className="text-sm tabular-nums text-text-quaternary">{String(index + 1).padStart(2, "0")}</span></div>
          <div><h2 className="max-w-xl text-2xl font-medium leading-8 tracking-tight text-text-secondary group-hover:text-text-brand-secondary">{article.title}</h2><p className="mt-3 max-w-xl text-base leading-6 text-text-tertiary">{article.summary}</p></div>
          <p className="text-sm text-text-quaternary">For {article.audience} · Conceptual Perspective</p>
        </ConditionalLink>)}
      </div>
    </section>
  </main><SiteFooter /></>;
}
