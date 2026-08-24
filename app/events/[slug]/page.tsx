import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText, type PortableTextBlock } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'
import RegistrationForm from './RegistrationForm'

const EVENT_QUERY = `*[_type == "event" && slug.current == $slug][0] {
  _id,
  title,
  description,
  startDate,
  endDate,
  location,
  price,
  coverImage
}`

type EventDetail = {
  _id: string
  title: string
  description?: PortableTextBlock[]
  startDate: string
  endDate?: string
  location?: string
  price?: number
  coverImage?: Parameters<typeof urlFor>[0]
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data: event } = await sanityFetch({ query: EVENT_QUERY, params: { slug } })

  if (!event) {
    notFound()
  }

  const typedEvent = event as EventDetail

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-text-primary">
      {typedEvent.coverImage && (
        <Image
          src={urlFor(typedEvent.coverImage).width(800).height(400).url()}
          alt=""
          width={800}
          height={400}
          className="mb-6 w-full rounded-xs object-cover"
        />
      )}
      <h1 className="text-3xl font-semibold mb-2">{typedEvent.title}</h1>
      <p className="mb-1 text-text-tertiary">
        {new Date(typedEvent.startDate).toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })}
      </p>
      {typedEvent.location && (
        <p className="mb-1 text-text-tertiary">{typedEvent.location}</p>
      )}
      <p className="mb-6 text-text-tertiary">
        {typedEvent.price ? `$${(typedEvent.price / 100).toFixed(2)}` : 'Free'}
      </p>

      {typedEvent.description && (
        <div className="prose dark:prose-invert mb-10">
          <PortableText value={typedEvent.description} />
        </div>
      )}

      <h2 className="mb-4 text-xl font-semibold text-text-primary">Register</h2>
      <RegistrationForm eventId={typedEvent._id} />
    </main>
  )
}
