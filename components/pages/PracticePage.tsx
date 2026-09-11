import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { InternalPageHero } from "@/components/sections/InternalPageHero";
import { Button } from "@/components/ui/Button";
import { ConditionalLink } from "@/components/ui/ConditionalLink";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export type PracticePageData = {
  name: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  services: string[];
  receive: string;
  callWhen: string;
  caseStudy: { title: string; meta: string; href: string; image: string };
  perspectives: { title: string; type: string; href: string }[];
  cta: string;
};

export function PracticePage({ data }: { data: PracticePageData }) {
  return (
    <>
      <Navbar theme="light" />
      <main>
        <InternalPageHero
          eyebrow={`What we do · ${data.name}`}
          title={data.title}
          intro={data.intro}
          image={data.image}
          imageAlt={data.imageAlt}
        />

        <section className="border-y border-border-secondary-alt bg-bg-primary">
          <div className="mx-auto grid w-full max-w-400 grid-cols-12 gap-8 px-12 py-24 max-lg:grid-cols-1 max-md:px-6 max-md:py-16">
            <div className="col-span-4">
              <SectionEyebrow>What we do</SectionEyebrow>
              <h2 className="mt-3 max-w-sm text-3xl font-medium leading-9 tracking-tight text-text-primary">
                Focused work around the decision in front of you.
              </h2>
            </div>
            <ol className="col-span-8 border-t border-border-primary">
              {data.services.map((service, index) => (
                <li key={service} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-border-primary py-5">
                  <span className="text-sm tabular-nums text-text-quaternary">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-xl leading-7.5 text-text-secondary">{service}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-400 grid-cols-2 gap-6 px-12 py-24 max-lg:grid-cols-1 max-md:px-6 max-md:py-16">
          <div className="flex min-h-80 flex-col justify-between rounded-xs bg-bg-quaternary p-8 max-md:min-h-64 max-md:p-6">
            <p className="text-sm font-medium uppercase tracking-wider text-text-quaternary">What you receive</p>
            <p className="max-w-xl text-3xl font-medium leading-9 tracking-tight text-text-secondary max-md:text-2xl max-md:leading-8">
              {data.receive}
            </p>
          </div>
          <div className="flex min-h-80 flex-col justify-between rounded-xs bg-bg-primary-solid p-8 text-text-primary-on-brand max-md:min-h-64 max-md:p-6" data-theme="dark">
            <p className="text-sm font-medium uppercase tracking-wider text-text-quaternary">When to call us</p>
            <div className="flex flex-col items-start gap-6">
              <p className="max-w-xl text-2xl leading-8">{data.callWhen}</p>
              <Button href="/contact" variant="primary" size="lg">{data.cta}</Button>
            </div>
          </div>
        </section>

        <section className="bg-utility-neutral-100">
          <div className="mx-auto flex w-full max-w-400 flex-col gap-10 px-12 py-24 max-md:px-6 max-md:py-16">
            <div>
              <SectionEyebrow>Related work</SectionEyebrow>
              <h2 className="mt-3 text-3xl font-medium leading-9 tracking-tight text-text-primary">See the thinking in practice.</h2>
            </div>
            <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
              <ConditionalLink href={data.caseStudy.href} className="group flex min-w-0 flex-col gap-5">
                <div className="relative aspect-16/9 overflow-hidden rounded-xs bg-bg-quaternary">
                  <Image src={data.caseStudy.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none" />
                </div>
                <div>
                  <p className="text-sm text-text-quaternary">Conceptual case study · {data.caseStudy.meta}</p>
                  <h3 className="mt-2 text-2xl font-medium leading-8 tracking-tight text-text-secondary group-hover:text-text-brand-secondary">{data.caseStudy.title}</h3>
                </div>
              </ConditionalLink>
              <div className="flex flex-col border-t border-border-primary">
                {data.perspectives.map((item) => (
                  <ConditionalLink key={item.title} href={item.href} className="group flex min-h-36 flex-col justify-between border-b border-border-primary py-5">
                    <p className="text-sm text-text-quaternary">Conceptual Perspective · {item.type}</p>
                    <h3 className="max-w-xl text-xl font-medium leading-7.5 text-text-secondary group-hover:text-text-brand-secondary">{item.title}</h3>
                  </ConditionalLink>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
