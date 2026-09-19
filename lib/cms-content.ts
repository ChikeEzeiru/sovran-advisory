import {cache} from 'react'
import {sanityFetch} from '@/sanity/lib/live'
import {CASE_STUDIES, type CaseStudy} from '@/lib/case-studies'
import {PERSPECTIVE_DETAILS, type PerspectiveDetail} from '@/lib/perspective-details'
import {PERSPECTIVES, type Perspective} from '@/lib/perspectives'
import {
  EDITORIAL_AUTHOR,
  getLocalPerspectiveAuthor,
} from '@/lib/perspective-authors'

export type PerspectiveAuthor = {
  name: string
  role: string
  image?: string
  imageAlt: string
}

export type PerspectiveContent = Perspective &
  PerspectiveDetail & {
    id: string
    author: PerspectiveAuthor
    featured: boolean
    imageAlt: string
    publishedAt: string
    updatedAt?: string
    seoTitle?: string
    seoDescription?: string
  }

export type RelatedPerspective = Pick<
  PerspectiveContent,
  'slug' | 'title' | 'summary'
>

export type CaseStudyContent = CaseStudy & {
  id: string
  conceptWork: boolean
  imageAlt: string
  updatedAt?: string
  relatedPerspective?: RelatedPerspective
  seoTitle?: string
  seoDescription?: string
}

type CmsPerspective = {
  id: string
  slug: string
  title: string
  type: string
  topic: string
  audience: string
  summary: string
  paragraphs: string[]
  image: string
  imageAlt: string
  publishedAt: string
  updatedAt?: string
  author?: PerspectiveAuthor
  featured?: boolean
  sections: PerspectiveDetail['sections']
  quote: string
  takeaway: string
  seoTitle?: string
  seoDescription?: string
}

type CmsCaseStudy = Omit<
  CaseStudyContent,
  'practices' | 'related' | 'metric' | 'secondaryMetric'
> & {
  practices: string[]
  related?: string
  metric?: CaseStudyContent['metric']
  secondaryMetric?: CaseStudyContent['secondaryMetric']
}

type CmsResponse<T> = {
  documentCount: number
  items: T[]
}

const PERSPECTIVES_QUERY = `{
  "documentCount": count(*[_type == "perspective"]),
  "items": *[_type == "perspective" && defined(slug.current)] | order(
    coalesce(featured, false) desc,
    coalesce(featuredOrder, 999) asc,
    publishedAt desc
  ) {
    "id": _id,
    "updatedAt": _updatedAt,
    "slug": slug.current,
    title,
    "type": perspectiveType,
    topic,
    audience,
    summary,
    "paragraphs": coalesce(introduction, []),
    "image": mainImage.asset->url,
    "imageAlt": coalesce(mainImage.alt, ""),
    publishedAt,
    "author": {
      "name": coalesce(author->name, "Sovran Editorial Team"),
      "role": coalesce(author->role, "Editorial team"),
      "image": author->image.asset->url,
      "imageAlt": coalesce(author->image.alt, "")
    },
    "featured": coalesce(featured, false),
    sections[]{id, title, paragraphs, bullets},
    quote,
    takeaway,
    seoTitle,
    seoDescription
  }
}`

const CASE_STUDIES_QUERY = `{
  "documentCount": count(*[_type == "caseStudy"]),
  "items": *[_type == "caseStudy" && defined(slug.current)] | order(
    coalesce(order, 0) asc,
    title asc
  ) {
    "id": _id,
    "updatedAt": _updatedAt,
    "slug": slug.current,
    client,
    sector,
    market,
    practices,
    title,
    summary,
    challenge,
    challengeDetails,
    work,
    workstreams[]{title, body},
    deliverables,
    outcome,
    outcomeDetails,
    insight{title, body},
    pullQuote,
    "image": coalesce(mainImage.asset->url, "/images/case-studies/case-study-card-texture.png"),
    "imageAlt": coalesce(mainImage.alt, ""),
    "logo": logo.asset->url,
    logoAlt,
    "logoWidth": coalesce(logoWidth, 44),
    metric{value, label},
    secondaryMetric{value, label},
    "related": relatedPerspective->title,
    "relatedPerspective": relatedPerspective->{
      "slug": slug.current,
      title,
      summary
    },
    "conceptWork": coalesce(conceptWork, true),
    seoTitle,
    seoDescription
  }
}`

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

function formatPublishedDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date)
}

function toIsoDate(value: string) {
  const date = new Date(`${value} UTC`)
  return Number.isNaN(date.getTime()) ? value : date.toISOString()
}

function getFallbackPerspectives(): PerspectiveContent[] {
  return PERSPECTIVES.map((article) => {
    const detail = PERSPECTIVE_DETAILS[article.slug]

    return {
      ...article,
      ...detail,
      id: `local-${article.slug}`,
      author: getLocalPerspectiveAuthor(article.slug),
      featured: article.slug === 'the-new-competitive-landscape-for-african-payments',
      imageAlt: `${article.title} perspective cover image`,
      publishedAt: toIsoDate(detail.published),
    }
  })
}

function normalizePerspective(item: CmsPerspective): PerspectiveContent {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    type: item.type,
    topic: item.topic,
    audience: item.audience,
    summary: item.summary,
    paragraphs: item.paragraphs ?? [],
    image: item.image,
    imageAlt: item.imageAlt ?? '',
    published: formatPublishedDate(item.publishedAt),
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt,
    author: item.author ?? EDITORIAL_AUTHOR,
    featured: item.featured ?? false,
    sections: item.sections ?? [],
    quote: item.quote,
    takeaway: item.takeaway,
    seoTitle: item.seoTitle,
    seoDescription: item.seoDescription,
  }
}

function getFallbackCaseStudies(): CaseStudyContent[] {
  return CASE_STUDIES.map((study) => {
    const related = PERSPECTIVES.find((item) => item.title === study.related)

    return {
      ...study,
      id: `local-${study.slug}`,
      conceptWork: true,
      imageAlt: `${study.client} case study`,
      relatedPerspective: related
        ? {
            slug: related.slug,
            title: related.title,
            summary: related.summary,
          }
        : undefined,
    }
  })
}

function normalizeCaseStudy(item: CmsCaseStudy): CaseStudyContent {
  return {
    ...item,
    practices: item.practices.join(' + '),
    related: item.related ?? '',
    metric: item.metric ?? {value: '', label: ''},
    secondaryMetric: item.secondaryMetric ?? {value: '', label: ''},
  }
}

export const getPerspectives = cache(async (): Promise<PerspectiveContent[]> => {
  try {
    const {data} = await sanityFetch({query: PERSPECTIVES_QUERY})
    const result = data as CmsResponse<CmsPerspective>

    return result.documentCount === 0 || result.items.length === 0
      ? getFallbackPerspectives()
      : result.items.map(normalizePerspective)
  } catch (error) {
    console.error('Unable to load perspectives from Sanity.', error)
    return getFallbackPerspectives()
  }
})

export const getPerspectiveBySlug = cache(async (slug: string) => {
  const perspectives = await getPerspectives()
  return perspectives.find((item) => item.slug === slug) ?? null
})

export const getPerspectiveSlugs = cache(async () => {
  const perspectives = await getPerspectives()
  return perspectives.map(({slug}) => ({slug}))
})

export const getCaseStudies = cache(async (): Promise<CaseStudyContent[]> => {
  try {
    const {data} = await sanityFetch({query: CASE_STUDIES_QUERY})
    const result = data as CmsResponse<CmsCaseStudy>

    return result.documentCount === 0 || result.items.length === 0
      ? getFallbackCaseStudies()
      : result.items.map(normalizeCaseStudy)
  } catch (error) {
    console.error('Unable to load case studies from Sanity.', error)
    return getFallbackCaseStudies()
  }
})

export const getCaseStudyBySlug = cache(async (slug: string) => {
  const studies = await getCaseStudies()
  return studies.find((item) => item.slug === slug) ?? null
})

export const getCaseStudySlugs = cache(async () => {
  const studies = await getCaseStudies()
  return studies.map(({slug}) => ({slug}))
})
