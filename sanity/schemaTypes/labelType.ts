import { defineField, defineType } from 'sanity'

export const labelType = defineType({
  name: 'label',
  title: 'Label',
  type: 'document',
  description: 'Frontend placement label (e.g. "Featured", "Hero") — not a taxonomy, used to drive layout decisions.',
  fields: [
    defineField({
      name: 'title',
      title: 'Name / SEO Title',
      type: 'string',
      description: 'Frontend placement label, e.g. "Featured", "Hero".',
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description / SEO Description',
      type: 'text',
      rows: 2,
      validation: (r) => r.required().max(160),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
