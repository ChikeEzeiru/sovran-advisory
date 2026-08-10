import {CalendarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'blockContent',
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'startDate',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      type: 'datetime',
      validation: (rule) => rule.min(rule.valueOfField('startDate')),
    }),
    defineField({
      name: 'location',
      type: 'string',
    }),
    defineField({
      name: 'capacity',
      type: 'number',
      description: 'Maximum number of registrations. Leave empty for unlimited.',
      validation: (rule) => rule.integer().positive(),
    }),
    defineField({
      name: 'price',
      type: 'number',
      description: 'Price in cents (e.g. 2500 = $25.00). Leave empty or 0 for a free event.',
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      startDate: 'startDate',
      media: 'coverImage',
    },
    prepare(selection) {
      const {startDate} = selection
      return {
        ...selection,
        subtitle: startDate && new Date(startDate).toLocaleDateString(),
      }
    },
  },
})
