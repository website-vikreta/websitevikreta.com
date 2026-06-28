'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

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
  subtitle: 'What took a team now runs end-to-end inside Figma Buzz.',
  href: '/work',
}

const CASE_STUDIES: CaseStudy[] = [
  {
    logo: LOGO,
    company: 'Blancora',
    tags: 'E-COMMERCE / CUSTOM CMS',
    title: 'A storefront the team owns.',
    subtitle: 'Full e-commerce on a custom CMS — ship a change without a developer.',
    href: '/work',
  },
  {
    logo: LOGO,
    company: 'iEndorse',
    tags: 'MVP / AFFILIATE PLATFORM',
    title: 'Affiliate platform, zero to launch.',
    subtitle: 'Core flows, dashboards, and tracking — live on day one.',
    href: '/work',
  },
]

// Masked line — text slides up from behind a clip (hero reveal family).
function Mask({
  as: Tag = 'div',
  className = '',
  innerClassName = '',
  children,
}: {
  as?: React.ElementType
  className?: string
  innerClassName?: string
  children: React.ReactNode
}) {
  return (
    <Tag className={`overflow-hidden pb-[0.12em] -mb-[0.12em] ${className}`}>
      <span data-mask className={`block ${innerClassName}`}>
        {children}
      </span>
    </Tag>
  )
}

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

export function FeaturedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('[data-mask]', { yPercent: 0 })
        gsap.set('[data-fade]', { autoAlpha: 1, y: 0 })
        return
      }

      // Per group — staggered masked slide-up. Fires only once the group is
      // well inside the viewport (top reaches 78% of the screen), once.
      gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
        const masks = group.querySelectorAll('[data-mask]')
        const fades = group.querySelectorAll('[data-fade]')

        gsap.set(masks, { yPercent: 110 })
        gsap.set(fades, { autoAlpha: 0, y: 24 })

        const tl = gsap.timeline({
          scrollTrigger: { trigger: group, start: 'top 78%', once: true },
        })

        tl.to(masks, {
          yPercent: 0,
          duration: 1.0,
          ease: 'expo.out',
          stagger: 0.08,
        })

        if (fades.length) {
          tl.to(
            fades,
            { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' },
            '-=0.85',
          )
        }
      })

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="container py-20 md:py-28">

        {/* ── Section header ─────────────────────────────────────── */}
        <div data-reveal-group className="max-w-3xl mb-12 md:mb-16">
          <Mask
            as="h2"
            innerClassName="text-h2 font-bold tracking-tight text-(--color-text)"
          >
            Proof over promises.
          </Mask>

          <Mask className="mt-5">
            <span className="block text-body-lg text-(--color-text-muted) max-w-xl leading-relaxed">
              We don&apos;t pitch what we might do. Here is what we&apos;ve already
              shipped — and what it changed for the businesses behind it.
            </span>
          </Mask>
        </div>

        {/* ── Case study grid ────────────────────────────────────── */}
        <div className="border border-(--color-border)">

          {/* Featured */}
          <Link
            href={FEATURED.href}
            data-reveal-group
            className="group grid gap-8 px-6 bg-(--color-bg) transition-colors duration-300 ease-out hover:bg-(--color-surface) md:px-10 lg:grid-cols-2 lg:gap-16"
          >
            <div className="flex flex-col justify-between gap-8 pt-10 md:pt-14 lg:pb-14">
              <Mask>
                <span className="flex items-center gap-3 text-2xl font-semibold text-(--color-text)">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={FEATURED.logo} alt="" aria-hidden className="h-8 w-8" />
                  {FEATURED.company}
                </span>
              </Mask>
              <div>
                <Mask>
                  <span className="block font-mono text-meta-label tracking-(--tracking-meta) text-(--color-text-faint) uppercase">
                    {FEATURED.tags}
                  </span>
                </Mask>
                <Mask
                  as="h3"
                  className="mt-4 mb-6"
                  innerClassName="text-2xl font-bold leading-snug tracking-tight text-balance sm:text-3xl text-(--color-text)"
                >
                  {FEATURED.title}{' '}
                  <span className="font-semibold text-(--color-text-faint)">
                    {FEATURED.subtitle}
                  </span>
                </Mask>
                <Mask>
                  <span className="block">
                    <ReadCaseStudy />
                  </span>
                </Mask>
              </div>
            </div>

            {/* Visual — bordered frame, monochrome placeholder */}
            <div data-fade className="py-10 lg:py-14">
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

          {/* Two-up rows */}
          <div className="grid border-t border-(--color-border) lg:grid-cols-2">
            {CASE_STUDIES.map((item, idx) => (
              <Link
                key={item.company}
                href={item.href}
                data-reveal-group
                className={`group flex flex-col justify-between gap-12 px-6 py-10 transition-colors duration-300 ease-out hover:bg-(--color-surface) md:px-10 md:py-14 xl:gap-16 ${
                  idx === 1
                    ? 'border-t border-(--color-border) lg:border-t-0 lg:border-l'
                    : ''
                }`}
              >
                <Mask>
                  <span className="flex items-center gap-3 text-2xl font-semibold text-(--color-text)">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.logo} alt="" aria-hidden className="h-8 w-8" />
                    {item.company}
                  </span>
                </Mask>
                <div>
                  <Mask>
                    <span className="block font-mono text-meta-label tracking-(--tracking-meta) text-(--color-text-faint) uppercase">
                      {item.tags}
                    </span>
                  </Mask>
                  <Mask
                    as="h3"
                    className="mt-4 mb-6"
                    innerClassName="text-2xl font-bold leading-snug tracking-tight text-balance sm:text-3xl text-(--color-text)"
                  >
                    {item.title}{' '}
                    <span className="font-semibold text-(--color-text-faint)">
                      {item.subtitle}
                    </span>
                  </Mask>
                  <Mask>
                    <span className="block">
                      <ReadCaseStudy />
                    </span>
                  </Mask>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
