import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import {
  PerspectivesIndex,
  type PerspectiveIndexItem,
} from "@/components/sections/PerspectivesIndex";
import { getPerspectives } from "@/lib/cms-content";

export const metadata: Metadata = {
  title: "Perspectives",
  description:
    "Short, useful analysis for people making decisions across changing markets.",
};

export default async function PerspectivesPage() {
  const perspectives = await getPerspectives();
  const indexItems: PerspectiveIndexItem[] = perspectives.map(
    ({ slug, title, type, topic, summary, image, imageAlt, published, featured }) => ({
      slug,
      title,
      type,
      topic,
      summary,
      image,
      imageAlt,
      published,
      featured,
    })
  );

  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="mx-auto w-full max-w-400 px-12 pt-24 pb-16 max-md:px-6 max-md:pt-20">
          <div className="flex max-w-3xl flex-col items-start gap-4">
            <div className="flex flex-col items-start gap-2">
              <div className="rounded-xs border border-border-secondary bg-bg-secondary px-3 py-1">
                <p className="text-base leading-6 text-text-tertiary">
                  Perspectives
                </p>
              </div>
              <h1 className="text-5xl font-medium leading-15 tracking-tight text-text-primary text-balance max-md:text-4xl max-md:leading-11">
                Understanding what is changing,
                <br className="max-sm:hidden" /> and what it means.
              </h1>
            </div>
            <p className="text-xl leading-7.5 text-text-tertiary text-balance">
              Analysis and perspectives on the market, regulatory,
              infrastructure and competitive shifts affecting businesses,
              investors and public institutions.
            </p>
          </div>
        </section>
        <PerspectivesIndex articles={indexItems} />
      </main>
      <SiteFooter />
    </>
  );
}
