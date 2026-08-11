import { defineField, defineType } from 'sanity'

export const commentType = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Internal use only (e.g. avatar fetching). Never displayed publicly.',
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'parentComment',
      title: 'Parent Comment',
      type: 'reference',
      to: [{ type: 'comment' }],
      description: 'Set when this comment is a reply — links it to the comment it replies to.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'message',
    },
  },
})
