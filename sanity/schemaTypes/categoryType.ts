import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      group: 'content',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Overrides page title in search results. 50–60 chars recommended.',
      validation: (r) => r.required().max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      group: 'seo',
      description: 'Shown in search results. 150–160 chars recommended.',
      validation: (r) => r.required().max(160),
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'seo',
      description: 'Keywords for search engines. Add as tags.',
      options: { layout: 'tags' },
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'SEO Canonical URL',
      type: 'url',
      group: 'seo',
      description:
        'Full canonical URL for this category landing page, e.g. https://www.websitevikreta.com/blog/category/category-slug. Prevents staging-domain indexing.',
      validation: (r) => r.required().uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
