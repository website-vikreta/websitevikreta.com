import { defineField, defineType } from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Author Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional — frontend falls back to a generated avatar when empty.',
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio / SEO Description',
      type: 'string',
      description: 'One-line bio used in Person schema markup and author card previews.',
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      description: 'Full bio shown on the author landing page.',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({ name: 'href', type: 'url', title: 'URL' }),
                  defineField({
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        },
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Full LinkedIn profile URL e.g. https://linkedin.com/in/username',
      validation: (r) =>
        r.uri({ scheme: ['http', 'https'] }).custom((value) => {
          if (!value) return true
          try {
            const { hostname } = new URL(value)
            const isLinkedIn = hostname === 'linkedin.com' || hostname.endsWith('.linkedin.com')
            return isLinkedIn || 'Must be a linkedin.com profile URL, e.g. https://linkedin.com/in/username'
          } catch {
            return 'Enter a valid URL'
          }
        }),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'shortBio',
      media: 'image',
    },
  },
})
