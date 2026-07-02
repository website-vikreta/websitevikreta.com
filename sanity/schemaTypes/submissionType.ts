import { defineType, defineField } from 'sanity'

export const submissionType = defineType({
  name: 'submission',
  title: 'Submission',
  type: 'document',
  fields: [
    defineField({
      name: 'candidateName',
      title: 'Candidate Name',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'opening',
      title: 'Applied For',
      type: 'reference',
      to: [{ type: 'opening' }],
      validation: r => r.required(),
    }),
    defineField({
      name: 'resume',
      title: 'Resume (PDF)',
      type: 'file',
      options: { accept: '.pdf' },
      validation: r => r.required(),
    }),
    defineField({
      name: 'resumePublicUrl',
      title: 'Resume Public URL',
      type: 'url',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Reviewed', value: 'reviewed' },
          { title: 'Shortlisted', value: 'shortlisted' },
          { title: 'Rejected', value: 'rejected' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
  ],
  preview: {
    select: {
      title: 'candidateName',
      subtitle: 'email',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      return { title, subtitle: `${subtitle} — ${status}` }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
})
