import React from 'react'
import Image from 'next/image'
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

const FEATURED_LOGO = '/client-logos/simpli-home.svg'
const CASE_STUDIES_1_LOGO = '/client-logos/sustainable-bitcoin-protocol.svg'
const CASE_STUDIES_2_LOGO = '/client-logos/ap-cleanco.svg'

// Real work — no invented metrics.
const FEATURED: CaseStudy = {
  logo: FEATURED_LOGO,
  company: 'Simpli Home',
  tags: 'AI AUTOMATION / MEDIA OPS',
  title: 'Bulk media generation, automated.',
  subtitle: 'A media team doing bulk content generation by hand. We automated the whole pipeline inside Figma Buzz. The work just started happening faster.',
  href: '/work',
}

const CASE_STUDIES: CaseStudy[] = [
  {
    logo: CASE_STUDIES_1_LOGO,
    company: 'Sustainable Bitcoin Protocol',
    tags: 'UI/UX DESIGN / DESIGN SYSTEM',
    title: 'From MVP to a product people actually use.',
    subtitle: 'Rough flows, no design system, unclear product. We went in at the foundation and rebuilt everything.',
    href: '/work',
  },
  {
    logo: CASE_STUDIES_2_LOGO,
    company: 'AP Cleanco',
    tags: 'WEBSITE / MARKETING',
    title: 'Zero to online. Properly.',
    subtitle: 'Garage cleaning company, no web presence at all. We built the marketing site from scratch. Local SEO baked in, loads fast, written to convert.',
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
      <Image src={item.logo} alt={item.company} height={32} width={160} className="h-8 w-auto self-start" unoptimized />
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
          <RevealFade>
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
                    <Image
                      src={FEATURED.logo}
                      alt={`${FEATURED.company} case study`}
                      height={48}
                      width={200}
                      className="h-12 w-auto opacity-80 grayscale"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </Link>
          </RevealFade>

          {/* Two-up rows */}
          <RevealFade className="grid border-t border-(--color-border) lg:grid-cols-2" delay={0.1}>
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
