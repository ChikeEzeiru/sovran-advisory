import type {Metadata} from 'next'

export const SITE_NAME = 'Sovran Advisory'
export const SITE_DESCRIPTION =
  'Sovran is an Africa-focused advisory firm helping businesses, investors and public institutions make decisions across markets, strategy, institutions and delivery.'

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://sovranadvisory.com'

export const SITE_URL = new URL(
  configuredSiteUrl.startsWith('http')
    ? configuredSiteUrl
    : `https://${configuredSiteUrl}`,
)

export const DEFAULT_SOCIAL_IMAGE = '/images/case-studies/case-studies-hero.png'

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString()
}

function socialImageUrl(image: string) {
  const url = new URL(image, SITE_URL)

  if (url.hostname === 'cdn.sanity.io') {
    url.searchParams.set('w', '1200')
    url.searchParams.set('h', '630')
    url.searchParams.set('fit', 'crop')
    url.searchParams.set('fm', 'jpg')
    return url.toString()
  }

  if (url.pathname.toLowerCase().endsWith('.avif')) {
    return absoluteUrl(DEFAULT_SOCIAL_IMAGE)
  }

  return url.toString()
}

export function toMetaDescription(value: string, maxLength = 165) {
  const normalized = value.replace(/\s+/g, ' ').trim()
  if (normalized.length <= maxLength) return normalized

  const clipped = normalized.slice(0, maxLength + 1)
  const lastSpace = clipped.lastIndexOf(' ')
  return `${clipped.slice(0, lastSpace > 120 ? lastSpace : maxLength).trimEnd()}…`
}

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_SOCIAL_IMAGE,
  imageAlt = `${SITE_NAME} — African markets advisory`,
  type = 'website',
  noIndex = false,
}: {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  noIndex?: boolean
}): Metadata {
  const canonical = absoluteUrl(path)
  const socialImage = socialImageUrl(image)

  return {
    title,
    description,
    alternates: {canonical},
    robots: noIndex
      ? {index: false, follow: false, nocache: true}
      : {index: true, follow: true},
    openGraph: {
      type,
      locale: 'en_GB',
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      images: [{url: socialImage, alt: imageAlt}],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialImage],
    },
  }
}

export function breadcrumbJsonLd(
  items: ReadonlyArray<{name: string; path: string}>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
