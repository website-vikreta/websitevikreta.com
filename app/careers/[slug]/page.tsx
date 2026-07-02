import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { ALL_OPENINGS_QUERY, OPENING_BY_SLUG_QUERY } from '@/sanity/lib/careers-queries'
import CareerDetailClient from './CareerDetailClient'

export async function generateStaticParams() {
  const openings = await client.fetch(ALL_OPENINGS_QUERY)
  return openings.map((o: { slug: string }) => ({ slug: o.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const opening = await client.fetch(OPENING_BY_SLUG_QUERY, { slug })
  if (!opening) return {}
  return {
    title: opening.metaTitle ?? `${opening.title} | Careers at Website Vikreta`,
    description: opening.metaDescription ?? opening.description,
    openGraph: {
      title: opening.metaTitle ?? `${opening.title} | Website Vikreta`,
      description: opening.metaDescription ?? opening.description,
      url: `${process.env.NEXT_PUBLIC_HOSTNAME}/careers/${slug}`,
      siteName: 'WebsiteVikreta',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    alternates: { canonical: `${process.env.NEXT_PUBLIC_HOSTNAME}/careers/${slug}` },
  }
}

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const opening = await client.fetch(OPENING_BY_SLUG_QUERY, { slug })
  if (!opening) notFound()
  return <CareerDetailClient opening={opening} />
}
