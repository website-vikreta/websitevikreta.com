'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'

const HEADLINE = 'We don\'t just build your website. We think with you.'
const WORDS = HEADLINE.split(' ')

// Desktop line-break indices: forces W / b / W starts — avoids y/t descender column
const BREAK_BEFORE = new Set([3, 6])

// Word index to accent — "think" = 7
const ACCENT_INDEX = 7

export function HeroSection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const labelRef     = useRef<HTMLSpanElement>(null)
  const wordInnerRefs = useRef<(HTMLSpanElement | null)[]>([])
  const subheadRef   = useRef<HTMLParagraphElement>(null)
  const ctaRef       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const wordEls = wordInnerRefs.current.filter(
      (el): el is HTMLSpanElement => el !== null,
    )

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [labelRef.current, subheadRef.current, ctaRef.current],
          { opacity: 1 },
        )
        gsap.set(wordEls, { y: '0%' })
        return
      }

      // Initial states — set before first paint to avoid flash
      gsap.set(labelRef.current, { opacity: 0, y: 14 })
      gsap.set(wordEls, { y: '110%' })
      gsap.set([subheadRef.current, ctaRef.current], {
        opacity: 0,
        y: 18,
      })

      const tl = gsap.timeline({ delay: 0.1 })

      // 1. Label fades in
      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
      // 2. Headline words reveal — masked upward slide
        .to(
          wordEls,
          {
            y: '0%',
            duration: 1.05,
            ease: 'expo.out',
            stagger: 0.065,
          },
          '-=0.2',
        )
      // 3. Subhead fades up
        .to(
          subheadRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
          },
          '-=0.3',
        )
      // 4. CTAs follow immediately
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.45',
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="main-content"
      className="relative flex flex-col justify-center min-h-svh overflow-hidden"
      aria-label="Hero — Website Vikreta"
    >
      {/* ── Content ──────────────────────────────────────────── */}
      <div className="container relative z-10 pt-28 pb-20 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28">

        {/* Label — kicker badge, tight to headline */}
        <span
          ref={labelRef}
          data-hero-anim
          className="inline-flex items-center gap-2 border border-(--color-border) bg-white px-3 py-1.5 rounded-sm mb-6"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-(--color-accent)" />
          <span className="font-mono text-meta-label tracking-(--tracking-meta) text-(--color-text) uppercase">
            AI-Powered Agency
          </span>
        </span>

        {/* Headline — display scale, word-masked reveal */}
        <h1
          className="text-display font-semibold text-(--color-text) font-sans mb-12 lg:mb-14"
          aria-label={HEADLINE}
        >
          {WORDS.map((word, i) => (
            <React.Fragment key={i}>
              {BREAK_BEFORE.has(i) && <br className="hidden lg:block" />}
              <span className="word-wrapper" aria-hidden="true">
                <span
                  className="word-inner"
                  style={i === ACCENT_INDEX ? { color: 'var(--color-accent)' } : undefined}
                  ref={(el) => { wordInnerRefs.current[i] = el }}
                >
                  {word}
                </span>
              </span>
              {i < WORDS.length - 1 ? ' ' : null}
            </React.Fragment>
          ))}
        </h1>

        {/* Subheadline — constrained width for ideal line length */}
        <p
          ref={subheadRef}
          data-hero-anim
          className="text-body-lg text-(--color-text-muted) max-w-lg leading-relaxed mb-10 lg:mb-12"
        >
          Website Vikreta is a premium AI agency that listens first, 
          then builds websites, apps, and the smart systems that make everything work faster.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          data-hero-anim
          className="flex flex-wrap gap-3 items-center"
        >
          <Button href="/work" variant="primary" size="lg" showArrow>
            Talk to Us, it&apos;s Free
          </Button>
          <Button href="/contact" variant="ghost" size="lg" showArrow>
            See our work
          </Button>
        </div>
      </div>

    </section>
  )
}
