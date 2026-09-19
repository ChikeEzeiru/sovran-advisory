import type {MetadataRoute} from 'next'
import {client} from '@/sanity/lib/client'
import {getCaseStudies, getPerspectives} from '@/lib/cms-content'
import {absoluteUrl} from '@/lib/seo'

const STATIC_ROUTES = [
  '/',
  '/expertise',
  '/expertise/intelligence',
  '/expertise/strategy',
  '/expertise/institutions',
  '/expertise/delivery',
  '/case-studies',
  '/perspectives',
  '/about',
  '/leadership',
  '/partnerships',
  '/events',
  '/careers',
  '/contact',
  '/legal',
  '/privacy',
  '/terms',
]

type EventSitemapItem = {
  slug: string
  updatedAt?: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [perspectives, caseStudies, events] = await Promise.all([
    getPerspectives(),
    getCaseStudies(),
    client
      .fetch<EventSitemapItem[]>(
        `*[_type == "event" && defined(slug.current)] | order(startDate desc) {
          "slug": slug.current,
          "updatedAt": _updatedAt
        }`,
      )
      .catch(() => []),
  ])

  return [
    ...STATIC_ROUTES.map((path) => ({
      url: absoluteUrl(path),
    })),
    ...perspectives.map((article) => ({
      url: absoluteUrl(`/perspectives/${article.slug}`),
      lastModified: article.updatedAt || article.publishedAt,
    })),
    ...caseStudies.map((study) => ({
      url: absoluteUrl(`/case-studies/${study.slug}`),
      lastModified: study.updatedAt,
    })),
    ...events.map((event) => ({
      url: absoluteUrl(`/events/${event.slug}`),
      lastModified: event.updatedAt,
    })),
  ]
}
