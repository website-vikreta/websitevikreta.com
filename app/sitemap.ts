import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { SITE_URL } from '@/config/site'
import { CASE_STUDIES } from '@/lib/work-data'
import { postHref } from '@/lib/blog-url'
import { BLOG_SEARCH_PATH } from '@/lib/blog-search-params'

const BASE = SITE_URL

const staticRoutes: MetadataRoute.Sitemap = [
  // Home
  {
    url: BASE,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  },

  // Services
  {
    url: `${BASE}/services`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${BASE}/services/ai-automations`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${BASE}/services/web-development`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE}/services/web-mobile-app-development`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE}/services/uiux-design`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE}/services/digital-marketing`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },

  // Work
  {
    url: `${BASE}/work`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE}/work/case-studies`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  ...CASE_STUDIES.map((study) => ({
    url: `${BASE}/work/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  })),

  // Company
  {
    url: `${BASE}/about`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE}/careers`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    url: `${BASE}/contact`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${BASE}/faq`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },

  // Blog
  {
    url: `${BASE}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  // Taxonomy hubs
  ...['categories', 'tags', 'labels', 'authors'].map((hub) => ({
    url: `${BASE}/blog/${hub}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  })),
  // Unfiltered search only — filtered permutations are noindex (see the
  // indexing-policy comment in app/blog/search/page.tsx), so listing them
  // here would just contradict the page's own robots directive.
  {
    url: `${BASE}${BLOG_SEARCH_PATH}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  },

  // Site search
  {
    url: `${BASE}/search`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.4,
  },

  // Legal
  {
    url: `${BASE}/legal/privacy-policy`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.4,
  },
  {
    url: `${BASE}/legal/terms-and-conditions`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.4,
  },
  {
    url: `${BASE}/legal/disclaimer`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.4,
  },
]

// Latest posts only. The full archive is reachable via /blog and the taxonomy
// hubs; listing every post here just bloats the sitemap without adding
// discovery value.
const BLOG_POST_LIMIT = 12

const BLOG_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]
    | order(coalesce(publishedAt, _createdAt) desc)[0...${BLOG_POST_LIMIT}] {
    "slug": slug.current,
    "categorySlug": category->slug.current,
    _updatedAt
  }
`

const TAXONOMY_QUERY = groq`{
  "categories": *[_type == "category" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "tags": *[_type == "tag" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "labels": *[_type == "label" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "authors": *[_type == "author" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
}`

type SlugDoc = { slug: string; _updatedAt: string }

const CAREER_SLUGS_QUERY = groq`
  *[_type == "opening" && isActive == true && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }
`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return staticRoutes
  }

  try {
    const [posts, openings, taxonomy] = await Promise.all([
      client.fetch<{ slug: string; categorySlug: string | null; _updatedAt: string }[]>(
        BLOG_SLUGS_QUERY,
        {},
        { next: { revalidate: 3600 } },
      ),
      client.fetch<SlugDoc[]>(CAREER_SLUGS_QUERY, {}, { next: { revalidate: 3600 } }),
      client.fetch<Record<'categories' | 'tags' | 'labels' | 'authors', SlugDoc[]>>(
        TAXONOMY_QUERY,
        {},
        { next: { revalidate: 3600 } },
      ),
    ])

    const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${BASE}${postHref(post.categorySlug, post.slug)}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: 'daily',
      priority: 0.6,
    }))

    const careerRoutes: MetadataRoute.Sitemap = openings.map((opening) => ({
      url: `${BASE}/careers/${opening.slug}`,
      lastModified: new Date(opening._updatedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

    // /blog/categories/{slug}, /blog/tags/{slug}, /blog/labels/{slug}, /blog/authors/{slug}
    const taxonomyRoutes: MetadataRoute.Sitemap = (
      ['categories', 'tags', 'labels', 'authors'] as const
    ).flatMap((hub) =>
      (taxonomy?.[hub] ?? []).map((doc) => ({
        url: `${BASE}/blog/${hub}/${doc.slug}`,
        lastModified: new Date(doc._updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      })),
    )

    return [...staticRoutes, ...blogRoutes, ...careerRoutes, ...taxonomyRoutes]
  } catch {
    return staticRoutes
  }
}
