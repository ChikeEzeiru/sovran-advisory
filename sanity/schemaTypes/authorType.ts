import {UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role at Sovran',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'editorialRole',
      title: 'Editorial responsibility',
      description: 'The person’s responsibility within the Perspectives publishing team.',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'bio',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      role: 'role',
      editorialRole: 'editorialRole',
      media: 'image',
    },
    prepare({title, role, editorialRole, media}) {
      return {
        title,
        subtitle: editorialRole ? `${editorialRole} · ${role}` : role,
        media,
      }
    },
  },
})
