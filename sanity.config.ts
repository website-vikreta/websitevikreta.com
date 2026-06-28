import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@/sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export default defineConfig({
  name: 'Website Vikreta',
  title: 'Website Vikreta',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01' }),
  ],
  schema: {
    types: schemaTypes,
  },
})
