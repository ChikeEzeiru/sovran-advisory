import {CaseIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

const PRACTICES = ['Intelligence', 'Strategy', 'Institutions', 'Delivery']

const metricField = (name: 'metric' | 'secondaryMetric', title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({name: 'value', type: 'string', validation: (rule) => rule.required()}),
      defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
    ],
    validation: (rule) => rule.required(),
  })

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({name: 'client', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'sector', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'market', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'practices',
      type: 'array',
      of: [defineArrayMember({type: 'string', options: {list: PRACTICES}})],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(320),
    }),
    defineField({name: 'challenge', type: 'text', rows: 4, validation: (rule) => rule.required()}),
    defineField({
      name: 'challengeDetails',
      title: 'Challenge detail paragraphs',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 4})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'work',
      title: 'How we approached the work — introduction',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'workstreams',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'workstream',
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'body', type: 'text', rows: 4, validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'title', subtitle: 'body'}},
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'deliverables',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({name: 'outcome', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({
      name: 'outcomeDetails',
      title: 'Outcome detail paragraphs',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 4})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'insight',
      title: 'The wider lesson',
      type: 'object',
      fields: [
        defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'body', type: 'text', rows: 3, validation: (rule) => rule.required()}),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'pullQuote', type: 'text', rows: 3, validation: (rule) => rule.required()}),
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
      name: 'logo',
      title: 'Client logo',
      type: 'file',
      options: {accept: 'image/svg+xml,image/png,image/jpeg,image/webp'},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'logoAlt', title: 'Client logo alternative text', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'logoWidth',
      description: 'Display width in pixels. The rendered logo remains 44px high.',
      type: 'number',
      initialValue: 44,
      validation: (rule) => rule.required().integer().min(24).max(160),
    }),
    metricField('metric', 'Primary metric'),
    metricField('secondaryMetric', 'Secondary metric'),
    defineField({
      name: 'relatedPerspective',
      type: 'reference',
      to: [{type: 'perspective'}],
    }),
    defineField({
      name: 'conceptWork',
      title: 'Show “Concept work” badge',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({name: 'seoTitle', title: 'SEO title', type: 'string', validation: (rule) => rule.max(70)}),
    defineField({name: 'seoDescription', title: 'SEO description', type: 'text', rows: 2, validation: (rule) => rule.max(170)}),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [
        {field: 'order', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'client', media: 'mainImage'},
  },
})
