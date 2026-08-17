import { defineQuery } from 'next-sanity'

export const ALL_OPENINGS_QUERY = defineQuery(`
  *[_type == "opening"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    type,
    stipend,
    positions,
    flag,
    isActive,
    shortDescription,
    prerequisites,
    skills,
  }
`)

export const OPENING_BY_SLUG_QUERY = defineQuery(`
  *[_type == "opening" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    type,
    stipend,
    positions,
    flag,
    isActive,
    shortDescription,
    description,
    prerequisites,
    skills,
    metaTitle,
    metaDescription,
    metaKeywords,
  }
`)
