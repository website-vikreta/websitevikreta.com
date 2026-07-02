import { defineQuery } from 'next-sanity'

export const ALL_OPENINGS_QUERY = defineQuery(`
  *[_type == "opening" && isActive == true] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    type,
    stipend,
    positions,
    description,
    prerequisites,
    skills,
  }
`)

export const OPENING_BY_SLUG_QUERY = defineQuery(`
  *[_type == "opening" && slug.current == $slug && isActive == true][0] {
    _id,
    title,
    "slug": slug.current,
    type,
    stipend,
    positions,
    description,
    prerequisites,
    skills,
    metaTitle,
    metaDescription,
  }
`)
