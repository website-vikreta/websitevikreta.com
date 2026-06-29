import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { RevealText, RevealFade } from '@/components/ui/Reveal'

interface CaseStudy {
  logo: string
  company: string
  tags: string
  title: string
  subtitle: string
  image?: string
  href: string
}

const LOGO = '/logo/websitevikreta-icon.svg'

// Real work — no invented metrics.
const FEATURED: CaseStudy = {
  logo: LOGO,
  company: 'Sustainable Bitcoin Protocol',
  tags: 'AI AUTOMATION / MEDIA OPS',
  title: 'Bulk media generation, automated.',
  subtitle: 'A media team doing bulk content generation by hand. We automated the whole pipeline inside Figma Buzz. They didn\'t hire anyone. The work just started happening faster.',
  href: '/work',
}

const CASE_STUDIES: CaseStudy[] = [
  {
    logo: LOGO,
    company: 'Blancora',
    tags: 'E-COMMERCE / CUSTOM CMS',
    title: 'A storefront the team owns.',
    subtitle: 'Full e-commerce on a custom CMS. The client updates it themselves now. No developer in the loop.',
    href: '/work',
  },
  {
    logo: LOGO,
    company: 'iEndorse',
    tags: 'MVP / AFFILIATE PLATFORM',
    title: 'Affiliate platform, zero to launch.',
    subtitle: 'Affiliate platform, built from scratch. Dashboards, tracking, core flows: live on day one. No phase two that never came.',
    href: '/work',
  },
]

// Matches TextLink design language (lucide ArrowRight + underline draw).
function ReadCaseStudy() {
  return (
    <span className="inline-flex w-fit items-center gap-1.5 text-[1rem] font-medium text-(--color-text)">
      <span className="relative">
        Read case study
        <span className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-(--color-text) transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </span>
      <ArrowRight
        size={14}
        strokeWidth={1.75}
        aria-hidden="true"
        className="transition-transform duration-300 ease-out group-hover:translate-x-1"
      />
    </span>
  )
}

function CaseCard({ item }: { item: CaseStudy }) {
  return (
    <>
      <span className="flex items-center gap-3 text-2xl font-semibold text-(--color-text)">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.logo} alt="" aria-hidden className="h-8 w-8" />
        {item.company}
      </span>
      <div>
        <span className="block font-mono text-meta-label tracking-(--tracking-meta) text-(--color-text-faint) uppercase">
          {item.tags}
        </span>
        <h3 className="mt-4 mb-6 text-2xl font-bold leading-snug tracking-tight text-balance sm:text-3xl text-(--color-text)">
          {item.title}{' '}
          <span className="font-semibold text-(--color-text-faint)">
            {item.subtitle}
          </span>
        </h3>
        <ReadCaseStudy />
      </div>
    </>
  )
}

export function FeaturedWorkSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container py-16 md:py-20">

        {/* ── Section header ─────────────────────────────────────── */}
        <div className="max-w-3xl mb-10 md:mb-14">
          <RevealText
            as="h2"
            className="text-h2 font-bold tracking-tight text-(--color-text)"
          >
            Proof over promises.
          </RevealText>

          <RevealFade className="mt-5" delay={0.1}>
            <span className="block text-body-lg text-(--color-text-muted) max-w-xl leading-relaxed">
              We don&apos;t pitch what we might do. Here is what we&apos;ve already
              shipped, and what it changed for the businesses behind it.
            </span>
          </RevealFade>
        </div>

        {/* ── Case study grid ────────────────────────────────────── */}
        <div className="border border-(--color-border)">

          {/* Featured */}
          <RevealFade delay={0.15}>
            <Link
              href={FEATURED.href}
              className="group grid gap-8 px-6 bg-(--color-bg) transition-colors duration-300 ease-out hover:bg-(--color-surface) md:px-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className="flex flex-col justify-between gap-8 pt-10 md:pt-14 lg:pb-14">
                <CaseCard item={FEATURED} />
              </div>

              {/* Visual — bordered frame, monochrome placeholder */}
              <div className="py-10 lg:py-14">
                <div className="h-full border border-(--color-border) bg-(--color-surface) p-2">
                  <div className="flex aspect-[14/9] h-full w-full items-center justify-center bg-(--color-bg-muted)">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={FEATURED.logo}
                      alt={`${FEATURED.company} case study`}
                      className="h-16 w-16 opacity-80 grayscale"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </RevealFade>

          {/* Two-up rows */}
          <RevealFade className="grid border-t border-(--color-border) lg:grid-cols-2" delay={0.25}>
            {CASE_STUDIES.map((item, idx) => (
              <Link
                key={item.company}
                href={item.href}
                className={`group flex flex-col justify-between gap-12 px-6 py-10 transition-colors duration-300 ease-out hover:bg-(--color-surface) md:px-10 md:py-14 xl:gap-16 ${
                  idx === 1
                    ? 'border-t border-(--color-border) lg:border-t-0 lg:border-l'
                    : ''
                }`}
              >
                <CaseCard item={item} />
              </Link>
            ))}
          </RevealFade>

        </div>
      </div>
    </section>
  )
}
