import { createClient } from 'next-sanity'

export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN,
})
