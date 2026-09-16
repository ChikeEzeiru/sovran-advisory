import {
  defineDocuments,
  defineLocations,
  type PresentationPluginOptions,
} from 'sanity/presentation'

const mainDocuments = defineDocuments([
  {
    route: '/perspectives/:slug',
    filter: `_type == "perspective" && slug.current == $slug`,
  },
  {
    route: '/case-studies/:slug',
    filter: `_type == "caseStudy" && slug.current == $slug`,
  },
  {
    route: '/events/:slug',
    filter: `_type == "event" && slug.current == $slug`,
  },
])

export const presentationResolve: PresentationPluginOptions['resolve'] = {
  mainDocuments,
  locations: {
    perspective: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (document) => ({
        locations: [
          ...(document?.slug
            ? [
                {
                  title: document.title || 'Untitled perspective',
                  href: `/perspectives/${document.slug}`,
                },
              ]
            : []),
          {title: 'All perspectives', href: '/perspectives'},
        ],
      }),
    }),
    caseStudy: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (document) => ({
        locations: [
          ...(document?.slug
            ? [
                {
                  title: document.title || 'Untitled case study',
                  href: `/case-studies/${document.slug}`,
                },
              ]
            : []),
          {title: 'All case studies', href: '/case-studies'},
        ],
      }),
    }),
    event: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (document) => ({
        locations: document?.slug
          ? [
              {
                title: document.title || 'Untitled event',
                href: `/events/${document.slug}`,
              },
            ]
          : [],
      }),
    }),
    careerRole: defineLocations({
      select: {
        title: 'title',
      },
      resolve: (document) => ({
        locations: [
          {
            title: document?.title
              ? `Careers — ${document.title}`
              : 'Careers',
            href: '/careers#open-roles',
          },
        ],
      }),
    }),
  },
}
