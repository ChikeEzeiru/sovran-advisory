"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { SearchLg } from "@untitledui/icons";
import { ConditionalLink } from "@/components/ui/ConditionalLink";
import { ButtonArrowVisual, ButtonVisual } from "@/components/ui/Button";
import { PERSPECTIVES, type Perspective } from "@/lib/perspectives";
import { PERSPECTIVE_DETAILS } from "@/lib/perspective-details";

const FEATURED_SLUG = "the-new-competitive-landscape-for-african-payments";
const PAGE_SIZE = 6;
const CATEGORIES = [
  "View all",
  "Markets",
  "Technology",
  "Payments",
  "Regulation",
  "Infrastructure",
  "Logistics",
];

function ArticleBadge({ article }: { article: Perspective }) {
  return (
    <div className="inline-flex items-center w-fit rounded-xs border border-border-secondary bg-bg-secondary-alt p-1 pr-3 text-xs font-medium leading-4.5 text-text-brand-secondary">
      <span className="rounded-xs border border-border-secondary bg-bg-primary px-2 py-0.5">
        {article.topic}
      </span>
      <span className="pl-2">{article.type}</span>
    </div>
  );
}

function ArticleCard({ article }: { article: Perspective }) {
  const details = PERSPECTIVE_DETAILS[article.slug];

  return (
    <ConditionalLink
      href={`/perspectives/${article.slug}`}
      className="group flex min-w-0 flex-col gap-4"
    >
      <div className="relative aspect-3/2 w-full overflow-hidden border border-black/10 bg-bg-quaternary">
        <Image
          src={details.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 384px, (min-width: 768px) 40vw, calc(100vw - 48px)"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
        />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <ArticleBadge article={article} />
          <div className="flex items-start gap-4">
            <h2 className="min-w-0 flex-1 text-lg font-semibold leading-7 text-text-primary">
              {article.title}
            </h2>
            <ButtonArrowVisual className="mt-1 size-5 text-fg-quaternary" />
          </div>
          <p className="text-base leading-6 text-text-tertiary">
            {article.summary}
          </p>
        </div>
        <div className="text-sm leading-5">
          <p className="font-semibold text-text-primary">Sovran Advisory</p>
          <p className="text-text-tertiary">{details.published}</p>
        </div>
      </div>
    </ConditionalLink>
  );
}

function PaginationButton({
  children,
  direction,
  disabled,
  onClick,
}: {
  children: string;
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="group inline-flex h-9 items-center gap-1.5 rounded-xs bg-bg-primary px-3 text-sm font-semibold leading-5 text-text-secondary shadow-xs-skeuomorphic transition-[transform,background-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-bg-primary-hover active:scale-[0.98] active:duration-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-bg-primary disabled:active:scale-100 motion-reduce:transform-none"
    >
      {direction === "previous" && (
        <ButtonArrowVisual direction="left" />
      )}
      <ButtonVisual size="sm" showIcon={false}>
        {children}
      </ButtonVisual>
      {direction === "next" && <ButtonArrowVisual />}
    </button>
  );
}

export function PerspectivesIndex() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("View all");
  const [page, setPage] = useState(1);
  const isBrowsingAll = category === "View all" && query.trim() === "";

  const featured = PERSPECTIVES.find(
    (article) => article.slug === FEATURED_SLUG
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return PERSPECTIVES.filter((article) => {
      const matchesCategory =
        category === "View all" || article.topic === category;
      const matchesQuery =
        normalizedQuery === "" ||
        [article.title, article.summary, article.type, article.topic].some(
          (value) => value.toLocaleLowerCase().includes(normalizedQuery)
        );

      return matchesCategory && matchesQuery;
    }).filter((article) => !isBrowsingAll || article.slug !== FEATURED_SLUG);
  }, [category, isBrowsingAll, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visibleArticles = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const updateCategory = (nextCategory: string) => {
    setCategory(nextCategory);
    setPage(1);
  };

  return (
    <section className="mx-auto w-full max-w-400 px-12 pb-24 max-md:px-6 max-md:pb-16">
      <div className="flex items-start gap-16 max-lg:flex-col max-lg:gap-12">
        <aside className="w-70 shrink-0 max-lg:w-full">
          <label className="flex h-11 items-center gap-2 rounded-xs border border-border-primary bg-bg-primary px-3.5 shadow-xs focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-fg-brand-primary-alt">
            <SearchLg
              aria-hidden="true"
              className="size-5 shrink-0 text-fg-quaternary"
            />
            <span className="sr-only">Search Perspectives</span>
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search"
              className="min-w-0 flex-1 bg-transparent text-base leading-6 text-text-primary outline-none placeholder:text-text-placeholder"
            />
          </label>

          <div className="mt-8">
            <p className="mb-5 text-sm font-semibold leading-5 text-text-brand-secondary">
              Perspective categories
            </p>
            <div
              className="flex flex-col gap-1 max-lg:grid max-lg:grid-cols-3 max-md:grid-cols-2"
              aria-label="Perspective categories"
            >
              {CATEGORIES.map((item) => {
                const active = item === category;
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={active}
                    onClick={() => updateCategory(item)}
                    className={`group h-11 rounded-xs px-3 text-left text-base leading-6 transition-[transform,background-color,color,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] active:duration-100 motion-reduce:transform-none ${
                      active
                        ? "border border-border-secondary bg-bg-primary-hover font-medium text-text-secondary"
                        : "text-text-quaternary hover:bg-bg-primary-hover hover:text-text-secondary"
                    }`}
                  >
                    <ButtonVisual size="lg" showIcon={false}>
                      {item}
                    </ButtonVisual>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {isBrowsingAll && featured && (
            <ConditionalLink
              href={`/perspectives/${featured.slug}`}
              className="group mb-12 grid min-w-0 grid-cols-[minmax(0,2fr)_minmax(14rem,1fr)] gap-8 max-xl:grid-cols-1"
            >
              <div className="relative aspect-7/4 min-w-0 overflow-hidden rounded-xs">
                <Image
                  src={PERSPECTIVE_DETAILS[featured.slug].image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1280px) 560px, (min-width: 1024px) 55vw, calc(100vw - 48px)"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
                />
              </div>
              <div className="flex min-w-0 flex-col justify-between gap-8">
                <div className="flex flex-col items-start gap-4">
                  <ArticleBadge article={featured} />
                  <div>
                    <h2 className="text-2xl font-semibold leading-8 tracking-tight text-text-primary transition-colors group-hover:text-text-brand-secondary">
                      {featured.title}
                    </h2>
                    <p className="mt-2 text-base leading-6 text-text-tertiary">
                      {featured.summary}
                    </p>
                  </div>
                </div>
                <div className="text-sm leading-5">
                  <p className="font-semibold text-text-primary">
                    Sovran Advisory
                  </p>
                  <p className="text-text-tertiary">
                    {PERSPECTIVE_DETAILS[featured.slug].published}
                  </p>
                </div>
              </div>
            </ConditionalLink>
          )}

          {visibleArticles.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 max-md:grid-cols-1">
              {visibleArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="border-y border-border-secondary py-16">
              <h2 className="text-2xl font-medium leading-8 text-text-primary">
                No Perspectives found
              </h2>
              <p className="mt-2 text-base leading-6 text-text-tertiary">
                Try another search term or category.
              </p>
            </div>
          )}

          {filtered.length > PAGE_SIZE && (
            <nav
              aria-label="Perspectives pagination"
              className="mt-16 flex items-center justify-between gap-5 border-t border-border-secondary pt-5"
            >
              <PaginationButton
                direction="previous"
                disabled={page === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              >
                Previous
              </PaginationButton>

              <div className="flex items-center gap-0.5 max-sm:hidden">
                {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      aria-label={`Page ${pageNumber}`}
                      aria-current={pageNumber === page ? "page" : undefined}
                      onClick={() => setPage(pageNumber)}
                      className={`size-9 rounded-xs text-sm font-medium leading-5 transition-[transform,background-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.94] active:duration-100 motion-reduce:transform-none ${
                        pageNumber === page
                          ? "bg-bg-primary text-text-secondary"
                          : "text-text-quaternary hover:bg-bg-primary-hover"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                )}
              </div>

              <PaginationButton
                direction="next"
                disabled={page === pageCount}
                onClick={() =>
                  setPage((current) => Math.min(pageCount, current + 1))
                }
              >
                Next
              </PaginationButton>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
