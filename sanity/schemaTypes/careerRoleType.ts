import {CaseIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const careerRoleType = defineType({
  name: 'careerRole',
  title: 'Career role',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Role title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'department',
      type: 'string',
      initialValue: 'Advisory',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'departmentDescription',
      title: 'Department description',
      type: 'string',
      initialValue: 'Open positions on our advisory team.',
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'overview',
      title: 'Role overview',
      description: 'Add two or three short paragraphs for the role details modal.',
      type: 'array',
      of: [{type: 'text', rows: 4}],
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'requirements',
      title: 'What we are looking for',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'location',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'countryCode',
      title: 'Country code',
      description: 'Two-letter code used for the location flag, for example NG, GH, KE or RW.',
      type: 'string',
      validation: (rule) => rule.required().uppercase().length(2),
    }),
    defineField({
      name: 'employmentType',
      type: 'string',
      initialValue: 'Full-time',
      options: {
        list: ['Full-time', 'Part-time', 'Contract', 'Internship'],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'compensation',
      title: 'Compensation range',
      description: 'Use the public-facing format, including currency when appropriate.',
      type: 'string',
    }),
    defineField({
      name: 'detailsUrl',
      title: 'Application URL',
      description: 'Link to the application form. Leave blank to direct applicants to the contact page.',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'isOpen',
      title: 'Open for applications',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'departmentOrder',
      title: 'Department order',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'order',
      title: 'Role order',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [
        {field: 'departmentOrder', direction: 'asc'},
        {field: 'order', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      department: 'department',
      location: 'location',
      isOpen: 'isOpen',
    },
    prepare({title, department, location, isOpen}) {
      return {
        title,
        subtitle: `${department ?? 'Unassigned'} · ${location ?? 'No location'}${isOpen === false ? ' · Closed' : ''}`,
      }
    },
  },
})
