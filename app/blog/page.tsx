import { Metadata } from 'next'
import { BlogListingClient } from './BlogListingClient'
import { blogPosts as staticPosts } from '@/lib/blog-data'
import { fetchBlogPosts } from '@/sanity/lib/fetch'
import type { DisplayPost } from '@/sanity/types'

export const metadata: Metadata = {
  title: 'AI Automation, Next.js & Web Development Blog | Website Vikreta',
  description: 'Read practical guides on AI automation, Next.js development, workflow automation, SEO, and business growth. Learn how to build faster websites and automate repetitive work with AI.',
  keywords: [
    'AI automation blog',
    'AI workflow automation',
    'Next.js blog',
    'web development blog',
    'business automation guides',
    'AI automation agency',
    'web development agency India',
    'workflow automation with n8n',
    'Make.com tutorials',
    'SEO and Next.js',
    'AI business automation tips',
    'Website Vikreta blog',
  ],
  openGraph: {
    title: 'AI Automation, Next.js & Web Development Blog | Website Vikreta',
    description: 'Read practical guides on AI automation, Next.js development, workflow automation, SEO, and business growth.',
    url: 'https://stage.websitevikreta.com/blog',
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Website Vikreta Blog | AI Automation & Web Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation, Next.js & Web Development Blog | Website Vikreta',
    description: 'Read practical guides on AI automation, Next.js development, workflow automation, SEO, and business growth.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://stage.websitevikreta.com/blog',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

async function getPosts(): Promise<DisplayPost[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    // Sanity not yet configured — use static data
    return staticPosts.map((p) => ({
      slug: p.slug,
      category: p.category,
      title: p.title,
      description: p.description,
      publishDate: p.publishDate,
      readTime: p.readTime,
      imageUrl: p.imageUrl,
    }))
  }
  const staticFallback = staticPosts.map((p) => ({
    slug: p.slug,
    category: p.category,
    title: p.title,
    description: p.description,
    publishDate: p.publishDate,
    readTime: p.readTime,
    imageUrl: p.imageUrl,
  }))
  try {
    const posts = await fetchBlogPosts()
    return posts.length > 0 ? posts : staticFallback
  } catch {
    return staticFallback
  }
}

export default async function BlogPage() {
  const posts = await getPosts()
  return <BlogListingClient posts={posts} />
}
