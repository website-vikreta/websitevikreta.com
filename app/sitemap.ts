import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

const BASE = process.env.NEXT_PUBLIC_HOSTNAME!

const staticRoutes: MetadataRoute.Sitemap = [
  // Home
  {
    url: `${BASE}/`,
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
    url: `${BASE}/services/web-and-mobile-apps`,
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

const SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] {
    "slug": slug.current,
    _updatedAt
  }
`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return staticRoutes
  }

  try {
    const posts = await client.fetch<{ slug: string; _updatedAt: string }[]>(
      SLUGS_QUERY,
      {},
      { next: { revalidate: 3600 } },
    )

    const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: 'daily',
      priority: 0.6,
    }))

    return [...staticRoutes, ...blogRoutes]
  } catch {
    return staticRoutes
  }
}
