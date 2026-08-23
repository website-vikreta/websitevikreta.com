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
      name: 'flag',
      title: 'Flags',
      type: 'array',
      group: 'details',
      description: 'Highlights this opening with corner tags on the careers listing. Select as many as apply.',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'New', value: 'New' },
          { title: 'Hiring Urgently', value: 'Hiring Urgently' },
        ],
      },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      group: 'details',
      rows: 4,
      description: 'Shown on the careers card and below the title on the detail page.',
      validation: r => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (About the Internship)',
      type: 'array',
      group: 'details',
      description: 'Full write-up rendered as "About the Internship" on the detail page.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
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
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
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
      title: 'Accepting Applications',
      type: 'boolean',
      group: 'details',
      description:
        'Turn off when you are no longer hiring for this role. The listing and detail page stay live, but the apply form is replaced with a "not accepting applications" message — use this instead of unpublishing so closed roles stop generating resumes without losing the page.',
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
    defineField({
      name: 'metaKeywords',
      title: 'Meta Keywords',
      type: 'array',
      group: 'seo',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'type' },
    prepare({ title, subtitle }) {
      return { title, subtitle }
    },
  },
})
