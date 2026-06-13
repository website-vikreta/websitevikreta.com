'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { DotGrid } from '@/components/ui/DotGrid'

const HEADLINE = 'We Build. We Automate. We Grow.'
const WORDS = HEADLINE.split(' ')

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const wordInnerRefs = useRef<(HTMLSpanElement | null)[]>([])
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollIndRef = useRef<HTMLDivElement>(null)

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
          [
            labelRef.current,
            subheadRef.current,
            ctaRef.current,
            scrollIndRef.current,
          ],
          { opacity: 1 },
        )
        gsap.set(wordEls, { y: '0%' })
        return
      }

      // Set initial states synchronously before first paint
      gsap.set(labelRef.current, { opacity: 0, y: 14 })
      gsap.set(wordEls, { y: '110%' })
      gsap.set([subheadRef.current, ctaRef.current, scrollIndRef.current], {
        opacity: 0,
        y: 18,
      })

      const tl = gsap.timeline({ delay: 0.1 })

      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power2.out',
      })
        .to(
          wordEls,
          {
            y: '0%',
            duration: 0.95,
            ease: 'expo.out',
            stagger: 0.07,
          },
          '-=0.2',
        )
        .to(
          subheadRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
          },
          '-=0.4',
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
          },
          '-=0.35',
        )
        .to(
          scrollIndRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          },
          '-=0.15',
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="main-content"
      className="relative flex flex-col justify-center min-h-svh overflow-hidden bg-white"
      aria-label="Hero — Website Vikreta"
    >
      {/* ── Dot grid background ─────────────────────────────── */}
      <DotGrid />


      {/* ── Content ──────────────────────────────────────────── */}
      <div className="container relative z-10 pt-36 pb-28">
        {/* Label badge */}
        <span
          ref={labelRef}
          data-hero-anim
          className="inline-flex items-center gap-2 mb-9"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
          <span className="font-mono text-meta-label tracking-[var(--tracking-meta)] text-[var(--color-text-muted)] uppercase">
            AI-First Digital Agency
          </span>
        </span>

        {/* Headline */}
        <h1
          className="text-display font-bold text-[var(--color-text)] mb-9 font-sans"
          aria-label={HEADLINE}
        >
          {WORDS.map((word, i) => (
            <React.Fragment key={i}>
              <span className="word-wrapper" aria-hidden="true">
                <span
                  className="word-inner"
                  ref={(el) => {
                    wordInnerRefs.current[i] = el
                  }}
                >
                  {word}
                </span>
              </span>
              {i < WORDS.length - 1 ? ' ' : null}
            </React.Fragment>
          ))}
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          data-hero-anim
          className="text-body-lg text-[var(--color-text-muted)] max-w-lg mb-12 leading-relaxed"
        >
          You&rsquo;re losing hours every week to work a system could do.
          We build the systems.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          data-hero-anim
          className="flex flex-wrap gap-4 items-center"
        >
          <Button href="/work" variant="primary" size="lg" showArrow>
            See Our Work
          </Button>
          <Button href="/contact" variant="ghost" size="lg" showArrow>
            Talk to Us
          </Button>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <div
        ref={scrollIndRef}
        data-hero-anim
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        aria-hidden="true"
      >
        <div className="w-px h-9 bg-black/[0.12]" />
        <span className="font-mono text-[9px] text-[var(--color-text-faint)] tracking-[0.22em] uppercase">
          Scroll
        </span>
      </div>
    </section>
  )
}
