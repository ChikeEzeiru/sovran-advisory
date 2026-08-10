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
    <main className="max-w-3xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-semibold mb-8">Upcoming Events</h1>
      <div className="flex flex-col gap-6">
        {events.map((event) => (
          <Link
            key={event._id}
            href={`/events/${event.slug.current}`}
            className="flex gap-4 border rounded-lg p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            {event.coverImage && (
              <Image
                src={urlFor(event.coverImage).width(160).height(120).url()}
                alt=""
                width={160}
                height={120}
                className="rounded object-cover"
              />
            )}
            <div>
              <h2 className="text-xl font-medium">{event.title}</h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                {new Date(event.startDate).toLocaleDateString(undefined, {
                  dateStyle: 'medium',
                })}
                {event.location && ` · ${event.location}`}
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                {event.price ? `$${(event.price / 100).toFixed(2)}` : 'Free'}
              </p>
            </div>
          </Link>
        ))}
        {events.length === 0 && <p>No upcoming events.</p>}
      </div>
    </main>
  )
}
