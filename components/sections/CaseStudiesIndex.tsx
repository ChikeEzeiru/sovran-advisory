"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronDown, FilterLines, SearchLg } from "@untitledui/icons";
import { ButtonArrowVisual, ButtonVisual } from "@/components/ui/Button";
import { ConditionalLink } from "@/components/ui/ConditionalLink";

export type CaseStudyIndexItem = {
  slug: string;
  client: string;
  sector: string;
  market: string;
  practices: string;
  title: string;
  image: string;
  imageAlt: string;
  logo: string;
  logoAlt: string;
  metric: { value: string; label: string };
};

const CATEGORIES = [
  "All",
  "Intelligence",
  "Strategy",
  "Institutions",
  "Delivery",
] as const;
const PAGE_SIZE = 6;

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
      className="group inline-flex h-9 items-center gap-1.5 rounded-xs bg-bg-primary px-3 text-sm max-md:text-xs max-md:leading-4 font-semibold leading-5 text-text-secondary shadow-xs transition-[transform,background-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-bg-primary-hover active:scale-[0.98] active:duration-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-bg-primary disabled:active:scale-100 motion-reduce:transform-none max-sm:size-9 max-sm:justify-center max-sm:px-0"
    >
      {direction === "previous" && <ButtonArrowVisual direction="left" />}
      <span className="max-sm:hidden">
        <ButtonVisual size="sm" showIcon={false}>
          {children}
        </ButtonVisual>
      </span>
      {direction === "next" && <ButtonArrowVisual />}
    </button>
  );
}

export function CaseStudiesIndex({
  studies,
}: {
  studies: CaseStudyIndexItem[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [page, setPage] = useState(1);

  const filteredStudies = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return studies.filter((study) => {
      const matchesCategory =
        category === "All" || study.practices.includes(category);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [study.title, study.client, study.sector, study.market, study.practices]
          .join(" ")
          .toLocaleLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query, studies]);

  const pageCount = Math.max(1, Math.ceil(filteredStudies.length / PAGE_SIZE));
  const visibleStudies = filteredStudies.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const updateCategory = (nextCategory: (typeof CATEGORIES)[number]) => {
    setCategory(nextCategory);
    setPage(1);
  };

  return (
    <section className="bg-bg-secondary-alt-2 py-16">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-16 px-12 max-md:gap-12 max-md:px-4">
        <div className="flex w-full items-center justify-between max-lg:flex-col max-lg:items-stretch max-lg:gap-4 max-md:gap-3">
          <label className="flex h-11 w-100 shrink-0 items-center gap-2 rounded-xs border border-border-primary bg-bg-primary px-3.5 shadow-xs focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-fg-brand-primary-alt max-lg:w-full">
            <SearchLg
              aria-hidden="true"
              className="size-5 shrink-0 text-fg-quaternary"
            />
            <span className="sr-only">Search case studies</span>
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

          <div
            className="flex min-w-0 items-center gap-1 overflow-x-auto max-md:hidden"
            aria-label="Case-study practices"
          >
            {CATEGORIES.map((item) => {
              const active = item === category;

              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={active}
                  onClick={() => updateCategory(item)}
                  className={`group h-11 shrink-0 rounded-xs px-4 text-base leading-6 transition-[transform,background-color,color,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] active:duration-100 motion-reduce:transform-none max-md:text-sm max-md:leading-5 ${
                    active
                      ? "border border-border-secondary bg-bg-primary font-medium text-text-secondary"
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

          <label className="hidden h-11 w-full items-center gap-2 rounded-xs border border-border-primary bg-bg-primary px-3.5 shadow-xs focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-fg-brand-primary-alt max-md:flex">
            <FilterLines
              aria-hidden="true"
              className="size-5 shrink-0 text-fg-quaternary"
            />
            <span className="sr-only">Case-study practice</span>
            <select
              value={category}
              onChange={(event) =>
                updateCategory(event.target.value as (typeof CATEGORIES)[number])
              }
              className={`min-w-0 flex-1 appearance-none bg-transparent text-base leading-6 outline-none ${
                category === "All"
                  ? "text-text-placeholder"
                  : "text-text-primary"
              }`}
            >
              {CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All categories" : item}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none size-5 shrink-0 text-fg-quaternary"
            />
          </label>
        </div>

        {visibleStudies.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 max-md:grid-cols-1">
            {visibleStudies.map((study) => (
              <article key={study.slug} className="min-w-0">
                <ConditionalLink
                  href={`/case-studies/${study.slug}`}
                  className="group flex min-w-0 flex-col gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
                >
                  <div className="relative flex h-80 min-w-0 overflow-hidden rounded-xs bg-neutral-900 p-4 max-lg:h-72 max-md:h-80 max-sm:h-72">
                    <Image
                      src={study.image}
                      alt={study.imageAlt}
                      fill
                      loading="eager"
                      unoptimized
                      sizes="(min-width: 1600px) 740px, (min-width: 768px) calc(50vw - 60px), calc(100vw - 48px)"
                      className="z-0 object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 z-10 bg-linear-to-b from-black/70 via-black/20 to-transparent"
                    />
                    <div className="relative z-20 flex min-w-0 items-start gap-3">
                      <span className="relative h-9 w-12 shrink-0">
                        <Image
                          src={study.logo}
                          alt={study.logoAlt}
                          fill
                          unoptimized
                          className="object-contain object-top-left"
                        />
                      </span>
                      <h2 className="min-w-0 text-xl max-md:text-lg max-md:leading-7 font-medium leading-7.5 tracking-tight text-text-primary-on-brand">
                        {study.title}
                      </h2>
                    </div>
                  </div>

                  {study.metric.value && study.metric.label ? (
                    <p className="flex items-baseline gap-1 px-2 pt-3 pb-5 text-base max-md:text-sm max-md:leading-5 leading-6">
                      <span className="shrink-0 font-semibold text-text-secondary">
                        {study.metric.value}
                      </span>
                      <span className="text-text-quaternary">
                        {study.metric.label}
                      </span>
                    </p>
                  ) : null}
                </ConditionalLink>
              </article>
            ))}
          </div>
        ) : (
          <div className="border-y border-border-secondary py-16">
            <h2 className="text-2xl max-md:text-xl max-md:leading-7.5 font-medium leading-8 text-text-primary">
              No case studies found
            </h2>
            <p className="mt-2 text-base max-md:text-sm max-md:leading-5 leading-6 text-text-tertiary">
              Try another search term or practice.
            </p>
          </div>
        )}

        {filteredStudies.length > PAGE_SIZE && (
          <nav
            aria-label="Case studies pagination"
            className="flex items-center justify-between gap-5 border-t border-border-secondary pt-5"
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
                    className={`size-9 rounded-xs text-sm font-medium leading-5 transition-[transform,background-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.94] active:duration-100 motion-reduce:transform-none max-md:text-xs max-md:leading-4 ${
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

            <p className="hidden text-sm max-md:text-xs max-md:leading-4 font-medium leading-5 text-text-secondary max-sm:block">
              Page {page} of {pageCount}
            </p>

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
    </section>
  );
}
