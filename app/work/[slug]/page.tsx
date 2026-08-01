import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/config/site'
import { CASE_STUDIES, getCaseStudyBySlug } from '@/lib/work-data'
import { CaseStudyDetailClient } from './CaseStudyDetailClient'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)

  if (!study) {
    return { title: 'Case Study Not Found | Website Vikreta' }
  }

  const title = `${study.company} Case Study | Website Vikreta`
  const description = study.excerpt

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/work/${study.slug}`,
      siteName: 'Website Vikreta',
      type: 'article',
      locale: 'en_IN',
      // Dimensions differ per branch — the case-study art is 1448x1086, the
      // shared fallback card is 1200x675. One hardcoded pair was wrong for both.
      images: [
        study.image
          ? {
              url: study.image,
              width: 1448,
              height: 1086,
              alt: `${study.company} case study`,
            }
          : {
              url: '/og-image.png',
              width: 1200,
              height: 675,
              alt: `${study.company} case study`,
            },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [study.image ?? '/og-image.png'],
    },
    alternates: {
      canonical: `${SITE_URL}/work/${study.slug}`,
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
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)

  if (!study) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description: study.excerpt,
    author: {
      '@type': 'Organization',
      name: 'Website Vikreta',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Website Vikreta',
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/work/${study.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyDetailClient study={study} />
    </>
  )
}
