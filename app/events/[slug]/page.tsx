import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock } from "next-sanity";
import { Navbar } from "@/components/sections/Navbar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import RegistrationForm from "./RegistrationForm";

const EVENT_QUERY = `*[_type == "event" && slug.current == $slug][0] {
  _id, title, description, startDate, endDate, location, price, coverImage
}`;

type EventDetail = {
  _id: string;
  title: string;
  description?: PortableTextBlock[];
  startDate: string;
  endDate?: string;
  location?: string;
  price?: number;
  coverImage?: Parameters<typeof urlFor>[0];
};

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: event } = await sanityFetch({ query: EVENT_QUERY, params: { slug } });
  if (!event) notFound();
  const typedEvent = event as EventDetail;
  const date = new Date(typedEvent.startDate).toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" });

  return (
    <>
      <Navbar theme="light" />
      <main>
        <article>
          <header className="mx-auto w-full max-w-400 px-12 pt-40 pb-16 max-md:px-6 max-md:pt-32">
            <p className="text-sm font-medium uppercase tracking-wider text-text-quaternary">Event</p>
            <h1 className="mt-4 max-w-5xl text-5xl font-medium leading-tight tracking-tight text-text-primary max-md:text-4xl max-md:leading-11">{typedEvent.title}</h1>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border-primary pt-5 max-md:grid-cols-1">
              <div><dt className="text-sm text-text-quaternary">Date and time</dt><dd className="mt-1 text-base text-text-secondary">{date}</dd></div>
              <div><dt className="text-sm text-text-quaternary">Location</dt><dd className="mt-1 text-base text-text-secondary">{typedEvent.location ?? "Details to follow"}</dd></div>
              <div><dt className="text-sm text-text-quaternary">Access</dt><dd className="mt-1 text-base text-text-secondary">{typedEvent.price ? `$${(typedEvent.price / 100).toFixed(2)}` : "Complimentary"}</dd></div>
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
              <h2 className="text-2xl font-medium text-text-primary">About this event</h2>
              {typedEvent.description ? <div className="mt-5 space-y-5 text-lg leading-8 text-text-tertiary"><PortableText value={typedEvent.description} /></div> : <p className="mt-5 text-lg leading-8 text-text-tertiary">Further programme details will be published when the event opens for registration.</p>}
            </div>
            <aside className="col-span-4 rounded-xs border border-border-secondary bg-bg-primary p-8 shadow-xs max-lg:col-span-1">
              <p className="text-sm font-medium uppercase tracking-wider text-text-quaternary">Registration</p>
              <h2 className="mt-3 text-2xl font-medium text-text-primary">Request a place</h2>
              <div className="mt-6"><RegistrationForm eventId={typedEvent._id} /></div>
            </aside>
          </div>

          <div className="mx-auto flex w-full max-w-400 px-12 pb-24 max-md:px-6 max-md:pb-16">
            <span className="rounded-xs border border-border-secondary bg-bg-secondary px-3 py-1 text-sm leading-5 text-text-tertiary">
              Conceptual event
            </span>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
