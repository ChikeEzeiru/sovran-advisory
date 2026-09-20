import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock } from "next-sanity";
import { cache } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { breadcrumbJsonLd, createPageMetadata, toMetaDescription } from "@/lib/seo";
import RegistrationForm from "./RegistrationForm";

const EVENT_QUERY = `*[_type == "event" && slug.current == $slug][0] {
  _id, title, "slug": slug.current, description, "summary": pt::text(description),
  startDate, endDate, location, price, coverImage,
  "coverImageAlt": coalesce(coverImage.alt, ""), "updatedAt": _updatedAt
}`;

type EventDetail = {
  _id: string;
  slug: string;
  title: string;
  description?: PortableTextBlock[];
  summary?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  price?: number;
  coverImage?: Parameters<typeof urlFor>[0];
  coverImageAlt?: string;
  updatedAt?: string;
};

const getEvent = cache(async (slug: string) => {
  const { data } = await sanityFetch({ query: EVENT_QUERY, params: { slug } });
  return (data as EventDetail | null) ?? null;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return {};

  const image = event.coverImage
    ? urlFor(event.coverImage).width(1200).height(630).url()
    : undefined;

  return createPageMetadata({
    title: event.title,
    description:
      (event.summary ? toMetaDescription(event.summary) : undefined) ||
      `Event details and registration information for ${event.title}.`,
    path: `/events/${event.slug}`,
    image,
    imageAlt: event.coverImageAlt || event.title,
  });
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();
  const typedEvent = event;
  const date = new Date(typedEvent.startDate).toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" });

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          {name: "Home", path: "/"},
          {name: "Events", path: "/events"},
          {name: typedEvent.title, path: `/events/${typedEvent.slug}`},
        ])}
      />
      <Navbar theme="light" />
      <main>
        <article>
          <header className="mx-auto w-full max-w-400 px-12 pt-40 pb-16 max-md:px-6 max-md:pt-32">
            <p className="text-sm max-md:text-xs max-md:leading-4 font-medium uppercase tracking-wider text-text-quaternary">Event</p>
            <h1 className="mt-4 max-w-5xl text-5xl max-md:text-4xl max-md:leading-11 font-medium leading-tight tracking-tight text-text-primary ">{typedEvent.title}</h1>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border-primary pt-5 max-md:grid-cols-1">
              <div><dt className="text-sm max-md:text-xs max-md:leading-4 text-text-quaternary">Date and time</dt><dd className="mt-1 text-base max-md:text-sm max-md:leading-5 text-text-secondary">{date}</dd></div>
              <div><dt className="text-sm max-md:text-xs max-md:leading-4 text-text-quaternary">Location</dt><dd className="mt-1 text-base max-md:text-sm max-md:leading-5 text-text-secondary">{typedEvent.location ?? "Details to follow"}</dd></div>
              <div><dt className="text-sm max-md:text-xs max-md:leading-4 text-text-quaternary">Access</dt><dd className="mt-1 text-base max-md:text-sm max-md:leading-5 text-text-secondary">{typedEvent.price ? `$${(typedEvent.price / 100).toFixed(2)}` : "Complimentary"}</dd></div>
            </dl>
          </header>

          {typedEvent.coverImage && (
            <div className="mx-auto w-full max-w-400 px-12 max-md:px-6">
              <div className="relative aspect-[10/3] overflow-hidden rounded-xs bg-bg-quaternary max-lg:aspect-16/9">
                <Image src={urlFor(typedEvent.coverImage).width(1600).height(600).url()} alt="" fill priority sizes="(min-width: 1600px) 1600px, 100vw" className="object-cover" />
                <span aria-hidden="true" className="absolute inset-0 bg-black/15" />
              </div>
            </div>
          )}

          <div className="mx-auto grid w-full max-w-400 grid-cols-12 gap-12 px-12 py-24 max-lg:grid-cols-1 max-md:px-6 max-md:py-16">
            <div className="col-span-7 col-start-2 max-lg:col-span-1">
              <h2 className="text-2xl max-md:text-xl max-md:leading-7.5 font-medium text-text-primary">About this event</h2>
              {typedEvent.description ? <div className="mt-5 space-y-5 text-lg max-md:text-base max-md:leading-6 leading-8 text-text-tertiary"><PortableText value={typedEvent.description} /></div> : <p className="mt-5 text-lg max-md:text-base max-md:leading-6 leading-8 text-text-tertiary">Further programme details will be published when the event opens for registration.</p>}
            </div>
            <aside className="col-span-4 rounded-xs border border-border-secondary bg-bg-primary p-8 shadow-xs max-lg:col-span-1">
              <p className="text-sm max-md:text-xs max-md:leading-4 font-medium uppercase tracking-wider text-text-quaternary">Registration</p>
              <h2 className="mt-3 text-2xl max-md:text-xl max-md:leading-7.5 font-medium text-text-primary">Request a place</h2>
              <div className="mt-6"><RegistrationForm eventId={typedEvent._id} /></div>
            </aside>
          </div>

          <div className="mx-auto flex w-full max-w-400 px-12 pb-24 max-md:px-6 max-md:pb-16">
            <span className="rounded-xs border border-border-secondary bg-bg-secondary px-3 py-1 text-sm max-md:text-xs max-md:leading-4 leading-5 text-text-tertiary">
              Conceptual event
            </span>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
