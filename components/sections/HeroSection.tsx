'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'

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
          [labelRef.current, subheadRef.current, ctaRef.current, scrollIndRef.current],
          { opacity: 1 },
        )
        gsap.set(wordEls, { y: '0%' })
        return
      }

      // Set explicit initial states before animation (prevents flash)
      gsap.set(labelRef.current, { opacity: 0, y: 12 })
      gsap.set(wordEls, { y: '110%' })
      gsap.set([subheadRef.current, ctaRef.current, scrollIndRef.current], {
        opacity: 0,
        y: 16,
      })

      const tl = gsap.timeline({ delay: 0.15 })

      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
        .to(
          wordEls,
          {
            y: '0%',
            duration: 0.9,
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
          '-=0.35',
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
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
          '-=0.1',
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
      <div className="container pt-28 pb-24">
        {/* Label */}
        <span
          ref={labelRef}
          data-hero-anim
          className="block font-mono text-meta-label tracking-[var(--tracking-meta)] text-[var(--color-accent)] uppercase mb-8"
        >
          AI-First Digital Agency
        </span>

        {/* Headline */}
        <h1
          className="text-display font-bold text-white mb-8 font-sans"
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
          className="text-body-lg text-[var(--color-text-muted)] max-w-xl mb-12"
        >
          You&rsquo;re losing hours every week to work a system could do.
          We build the systems.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          data-hero-anim
          className="flex flex-wrap gap-4"
        >
          <Link href="/work" className="btn btn-primary">
            See Our Work
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Talk to Us
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndRef}
        data-hero-anim
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <div className="w-px h-10 bg-white/[0.15]" />
        <span className="font-mono text-[10px] text-[var(--color-text-faint)] tracking-[0.2em] uppercase">
          Scroll
        </span>
      </div>
    </section>
  )
}
