import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Button } from "@/components/ui/Button";
import { ArticleShareActions } from "@/components/ui/ArticleShareActions";
import { PERSPECTIVES } from "@/lib/perspectives";
import { PERSPECTIVE_DETAILS } from "@/lib/perspective-details";

export function generateStaticParams() {
  return PERSPECTIVES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = PERSPECTIVES.find((item) => item.slug === slug);
  return article ? { title: article.title, description: article.summary } : {};
}

export default async function PerspectivePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = PERSPECTIVES.find((item) => item.slug === slug);
  const detail = PERSPECTIVE_DETAILS[slug];
  if (!article || !detail) notFound();

  const readingTime = `${Math.max(7, detail.sections.length * 3)} min read`;

  return (
    <>
      <Navbar theme="light" />
      <main>
        <article>
          <header className="mx-auto flex w-full max-w-320 flex-col gap-16 px-8 pt-40 pb-24 max-md:gap-10 max-md:px-6 max-md:pt-32 max-md:pb-16">
            <div className="flex max-w-3xl flex-col items-start gap-6">
              <div className="flex items-center gap-2 rounded-xs border border-utility-neutral-300 bg-bg-secondary-alt py-1 pr-3 pl-1">
                <span className="rounded-xs border border-utility-neutral-300 bg-bg-primary px-2 py-0.5 text-xs font-medium leading-4.5 text-text-brand-tertiary">{article.type}</span>
                <span className="text-xs font-medium leading-4.5 text-text-brand-tertiary">{readingTime}</span>
              </div>
              <h1 className="text-5xl font-medium leading-15 tracking-tight text-text-primary max-md:text-4xl max-md:leading-11">{article.title}</h1>
              <p className="text-xl leading-7.5 text-text-tertiary">{article.summary}</p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="relative aspect-19/10 overflow-hidden rounded-xs bg-bg-quaternary">
                <Image src={detail.image} alt="" fill priority sizes="(min-width: 1280px) 1216px, calc(100vw - 48px)" className="object-cover" />
                <span aria-hidden="true" className="absolute inset-0 bg-black/10" />
              </div>
              <div className="flex flex-wrap items-start justify-between gap-6">
                <dl className="flex gap-12 max-sm:w-full max-sm:justify-between max-sm:gap-6">
                  <div><dt className="text-sm font-semibold text-text-brand-tertiary">Written by</dt><dd className="mt-2 text-lg font-medium text-text-primary">Sovran Editorial Team</dd></div>
                  <div><dt className="text-sm font-semibold text-text-brand-tertiary">Published on</dt><dd className="mt-2 text-lg font-medium text-text-primary">{detail.published}</dd></div>
                </dl>
                <ArticleShareActions title={article.title} />
              </div>
            </div>
          </header>

          <section className="mx-auto grid w-full max-w-295 grid-cols-[20rem_minmax(0,45rem)] items-start gap-16 px-8 pb-24 max-lg:grid-cols-1 max-md:px-6 max-md:pb-16">
            <aside className="sticky top-32 flex flex-col gap-8 max-lg:static">
              <div className="border-y border-border-primary py-8">
                <p className="font-semibold text-text-brand-tertiary">Table of contents</p>
                <nav className="mt-4 flex flex-col items-start gap-3" aria-label="Article sections">
                  <a href="#introduction" className="text-base font-medium text-text-tertiary hover:text-text-primary">Introduction</a>
                  {detail.sections.map((section) => <a key={section.id} href={`#${section.id}`} className="text-left text-base font-medium text-text-tertiary hover:text-text-primary">{section.title}</a>)}
                  <a href="#next" className="text-base font-medium text-text-tertiary hover:text-text-primary">What this means</a>
                </nav>
              </div>

              <div className="rounded-xs border border-border-secondary bg-bg-secondary p-8 shadow-xs max-lg:max-w-md">
                <div className="flex size-14 items-center justify-center rounded-xs border border-border-primary bg-bg-primary text-xl text-text-brand-tertiary shadow-xs" aria-hidden="true">→</div>
                <h2 className="mt-6 text-xl font-semibold text-text-primary">Weekly newsletter</h2>
                <p className="mt-2 text-sm leading-5 text-text-tertiary">Clear analysis on the markets, institutions and operating conditions shaping consequential decisions.</p>
                <label className="mt-5 block"><span className="sr-only">Work email</span><input type="email" placeholder="you@company.com" className="w-full rounded-xs border border-border-primary bg-bg-primary px-3.5 py-2.5 text-sm text-text-primary shadow-xs outline-none placeholder:text-text-placeholder focus:border-border-brand focus:ring-2 focus:ring-border-brand/20" /></label>
                <Button type="button" variant="primary-alt" size="md" showIcon={false} className="mt-3 w-full justify-center">Subscribe</Button>
                <p className="mt-3 text-xs leading-4.5 text-text-quaternary">Conceptual newsletter. No subscription is created.</p>
              </div>
            </aside>

            <div className="min-w-0 text-lg leading-7 text-text-tertiary">
              <section id="introduction" className="scroll-mt-32">
                <h2 className="text-2xl font-semibold leading-8 tracking-tight text-text-primary">Introduction</h2>
                <div className="mt-5 flex flex-col gap-5">{article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              </section>

              <blockquote className="my-12 border-l-2 border-border-brand pl-5">
                <p className="text-2xl font-medium italic leading-8 text-text-primary">“{detail.quote}”</p>
                <footer className="mt-5 text-base text-text-tertiary">Sovran Editorial Team</footer>
              </blockquote>

              {detail.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-32 pt-10 first:pt-0">
                  <h2 className="text-2xl font-semibold leading-8 tracking-tight text-text-primary">{section.title}</h2>
                  <div className="mt-5 flex flex-col gap-5">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                  {section.bullets && <ul className="mt-6 flex list-disc flex-col gap-2 pl-6 marker:text-text-brand-tertiary">{section.bullets.map((item) => <li key={item} className="pl-1">{item}</li>)}</ul>}
                </section>
              ))}

              <section id="next" className="mt-12 scroll-mt-32 rounded-xs bg-bg-quaternary p-8 max-md:p-6">
                <h2 className="text-xl font-semibold text-text-primary">What this means</h2>
                <p className="mt-3">{detail.takeaway}</p>
                <div className="mt-6"><Button href="/contact" variant="primary" size="lg">Start a conversation about this issue</Button></div>
              </section>

              <div className="mt-12 flex flex-wrap gap-2 border-t border-border-secondary pt-6">
                {[article.type, article.topic, article.audience].map((tag) => <span key={tag} className="rounded-xs border border-utility-neutral-300 bg-bg-secondary-alt px-3 py-1 text-xs font-medium text-text-tertiary">{tag}</span>)}
              </div>
              <p className="mt-8 text-sm leading-5 text-text-quaternary">Conceptual Perspective — created for demonstration purposes. The research, organisations and examples described are fictional.</p>
            </div>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
