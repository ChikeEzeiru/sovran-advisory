import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import {
  PerspectivesIndex,
  type PerspectiveIndexItem,
} from "@/components/sections/PerspectivesIndex";
import { getPerspectives } from "@/lib/cms-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Insights on African Markets & Institutions",
  description:
    "Read Sovran’s analysis of African markets, regulation, payments, infrastructure, technology and the institutions shaping consequential decisions.",
  path: "/perspectives",
});

export default async function PerspectivesPage() {
  const perspectives = await getPerspectives();
  const indexItems: PerspectiveIndexItem[] = perspectives.map(
    ({ slug, title, type, topic, summary, image, imageAlt, published, featured, author }) => ({
      slug,
      title,
      type,
      topic,
      summary,
      image,
      imageAlt,
      published,
      featured,
      authorName: author.name,
    })
  );

  return (
    <>
      <Navbar theme="light" />
      <main>
        <section className="mx-auto w-full max-w-400 px-12 pt-24 pb-16 max-md:px-4 max-md:pt-22 max-md:pb-12">
          <div className="flex max-w-3xl flex-col items-start gap-4">
            <div className="flex flex-col items-start gap-2">
              <div className="rounded-xs border border-border-secondary bg-bg-secondary px-3 py-1">
                <p className="text-base max-md:text-sm max-md:leading-5 leading-6 text-text-tertiary">
                  Perspectives
                </p>
              </div>
              <h1 className="text-5xl max-md:text-4xl max-md:leading-11 font-medium leading-15 tracking-tight text-text-primary text-balance ">
                Understanding what is changing,
                <br className="max-sm:hidden" /> and what it means.
              </h1>
            </div>
            <p className="text-xl max-md:text-lg max-md:leading-7 leading-7.5 text-text-tertiary text-balance ">
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
