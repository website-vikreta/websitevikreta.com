import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  // useCdn: true gives fast cached reads; set false for live preview or write operations
  useCdn: process.env.NODE_ENV === 'production',
  // Server-side token for authenticated requests (drafts, private datasets)
  token: process.env.SANITY_API_READ_TOKEN,
})
