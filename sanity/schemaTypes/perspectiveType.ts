import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

const TOPICS = [
  'Markets',
  'Technology',
  'Payments',
  'Regulation',
  'Infrastructure',
  'Logistics',
]

export const perspectiveType = defineType({
  name: 'perspective',
  title: 'Perspective',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      description: 'Used on cards, in search results and as the default SEO description.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: 'perspectiveType',
      title: 'Content type',
      description: 'For example: Market brief, Analysis, Sector insight or Research.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'topic',
      type: 'string',
      options: {list: TOPICS},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'audience',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{type: 'author'}],
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      description: 'Only one published perspective should be featured at a time.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'featuredOrder',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'introduction',
      description: 'Use two or three short editorial paragraphs.',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 4})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'sections',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'perspectiveSection',
          title: 'Section',
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'Section anchor',
              description: 'Lowercase words separated by hyphens, used by the table of contents.',
              type: 'string',
              validation: (rule) =>
                rule.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
                  name: 'URL-safe anchor',
                }),
            }),
            defineField({
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'paragraphs',
              type: 'array',
              of: [defineArrayMember({type: 'text', rows: 4})],
              validation: (rule) => rule.required().min(1),
            }),
            defineField({
              name: 'bullets',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'id'},
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'quote',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'takeaway',
      title: 'What this means',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(170),
    }),
  ],
  orderings: [
    {
      title: 'Publication date, newest first',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'perspectiveType',
      media: 'mainImage',
    },
  },
})
