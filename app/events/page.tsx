import type { Metadata } from "next"
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Events",
  description:
    "Convenings, roundtables, and public programmes hosted by Sovran Advisory across our markets.",
}
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'

const EVENTS_QUERY = `*[_type == "event" && startDate >= now()] | order(startDate asc) {
  _id,
  title,
  slug,
  startDate,
  location,
  price,
  coverImage
}`

type EventListItem = {
  _id: string
  title: string
  slug: { current: string }
  startDate: string
  location?: string
  price?: number
  coverImage?: Parameters<typeof urlFor>[0]
}

export default async function EventsPage() {
  const { data } = await sanityFetch({ query: EVENTS_QUERY })
  const events = data as EventListItem[]

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-text-primary">
      <h1 className="mb-8 text-3xl font-semibold">Upcoming Events</h1>
      <div className="flex flex-col gap-6">
        {events.map((event) => (
          <Link
            key={event._id}
            href={`/events/${event.slug.current}`}
            className="flex gap-4 rounded-xs border border-border-primary p-4 transition-colors duration-150 hover:bg-bg-primary-hover"
          >
            {event.coverImage && (
              <Image
                src={urlFor(event.coverImage).width(160).height(120).url()}
                alt=""
                width={160}
                height={120}
                className="rounded-xs object-cover"
              />
            )}
            <div>
              <h2 className="text-xl font-semibold text-text-primary">{event.title}</h2>
              <p className="text-text-tertiary">
                {new Date(event.startDate).toLocaleDateString(undefined, {
                  dateStyle: 'medium',
                })}
                {event.location && ` · ${event.location}`}
              </p>
              <p className="text-text-tertiary">
                {event.price ? `$${(event.price / 100).toFixed(2)}` : 'Free'}
              </p>
            </div>
          </Link>
        ))}
        {events.length === 0 && (
          <p className="text-text-tertiary">No upcoming events.</p>
        )}
      </div>
    </main>
  )
}
