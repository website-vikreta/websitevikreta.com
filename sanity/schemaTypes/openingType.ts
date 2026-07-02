import { defineType, defineField } from 'sanity'

export const openingType = defineType({
  name: 'opening',
  title: 'Opening',
  type: 'document',
  groups: [
    { name: 'details', title: 'Details', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      group: 'details',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'details',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'type',
      title: 'Role Type',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'Internship', value: 'Internship' },
          { title: 'Full-time', value: 'Full-time' },
        ],
        layout: 'radio',
      },
      initialValue: 'Internship',
      validation: r => r.required(),
    }),
    defineField({
      name: 'stipend',
      title: 'Stipend / Salary',
      type: 'string',
      group: 'details',
      description: 'e.g. ₹5,000 – ₹8,000 / month',
      validation: r => r.required(),
    }),
    defineField({
      name: 'positions',
      title: 'Number of Positions',
      type: 'number',
      group: 'details',
      validation: r => r.required().min(1),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'details',
      rows: 4,
      validation: r => r.required(),
    }),
    defineField({
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
      validation: r => r.required().min(1),
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
      validation: r => r.required().min(1),
    }),
    defineField({
      name: 'isActive',
      title: 'Active (visible on site)',
      type: 'boolean',
      group: 'details',
      initialValue: true,
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      validation: r => r.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      rows: 2,
      validation: r => r.max(160),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'type' },
    prepare({ title, subtitle }) {
      return { title, subtitle }
    },
  },
})
