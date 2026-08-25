import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Button } from "@/components/ui/Button";
import { CASE_STUDIES } from "@/lib/case-studies";

export function generateStaticParams() { return CASE_STUDIES.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const study = CASE_STUDIES.find((item) => item.slug === slug);
  return study ? { title: study.title, description: study.challenge } : {};
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const study = CASE_STUDIES.find((item) => item.slug === slug); if (!study) notFound();
  return <>
    <Navbar theme="light" />
    <main>
      <article>
        <header className="mx-auto w-full max-w-400 px-12 pt-40 pb-16 max-md:px-6 max-md:pt-32">
          <p className="text-sm font-medium uppercase tracking-wider text-text-quaternary">Conceptual case study</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-medium leading-tight tracking-tight text-text-primary max-md:text-4xl max-md:leading-11">{study.title}</h1>
          <div className="mt-12 grid grid-cols-4 gap-6 border-t border-border-primary pt-5 max-md:grid-cols-2">
            {[["Client", study.client], ["Sector", study.sector], ["Market context", study.market], ["Practices", study.practices]].map(([label, value]) => <div key={label}><p className="text-sm text-text-quaternary">{label}</p><p className="mt-1 text-base text-text-secondary">{value}</p></div>)}
          </div>
        </header>
        <div className="mx-auto w-full max-w-400 px-12 max-md:px-6"><div className="relative aspect-[10/3] overflow-hidden rounded-xs bg-bg-quaternary max-lg:aspect-16/9"><Image src={study.image} alt="" fill priority sizes="(min-width: 1600px) 1600px, 100vw" className="object-cover" /><span aria-hidden="true" className="absolute inset-0 bg-black/10" /></div></div>
        <div className="mx-auto grid w-full max-w-400 grid-cols-12 gap-8 px-12 py-24 max-lg:grid-cols-1 max-md:px-6 max-md:py-16">
          <aside className="col-span-3"><p className="text-sm leading-5 text-text-quaternary">{study.client} and all results shown are fictional and created for this conceptual project.</p></aside>
          <div className="col-span-8 col-start-5 flex flex-col gap-16 max-lg:col-span-1">
            {[["The challenge", study.challenge], ["What Sovran did", study.work], ["Outcome", study.outcome]].map(([title, copy]) => <section key={title}><h2 className="text-2xl font-medium text-text-primary">{title}</h2><p className="mt-4 text-lg leading-7.5 text-text-tertiary">{copy}</p></section>)}
            <section><h2 className="text-2xl font-medium text-text-primary">Key deliverables</h2><ul className="mt-5 border-t border-border-primary">{study.deliverables.map((item, index) => <li key={item} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-border-primary py-4"><span className="text-sm text-text-quaternary">{String(index + 1).padStart(2, "0")}</span><span className="text-lg text-text-secondary">{item}</span></li>)}</ul></section>
            <section className="rounded-xs bg-bg-quaternary p-8"><p className="text-sm text-text-quaternary">Related Perspective</p><h2 className="mt-3 text-2xl font-medium leading-8 text-text-primary">{study.related}</h2></section>
            <div><Button href="/contact" variant="primary" size="lg">Discuss a similar challenge</Button></div>
          </div>
        </div>
      </article>
    </main>
    <SiteFooter />
  </>;
}
