'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { UpworkBadge } from '@/components/ui/UpworkBadge'

const HEADLINE = 'We don\'t just execute. We think first.'
const WORDS = HEADLINE.split(' ')

// Desktop line-break index: break before second "We" — two clean lines
const BREAK_BEFORE = new Set([4])

// Word index to accent — "think" = 5
const ACCENT_INDEX = 5

export function HeroSection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const wordMaskRefs = useRef<(HTMLSpanElement | null)[]>([])

  // Label, subhead, CTA (`.hero-fade-in`, see globals.css) and now the
  // headline too are all real, fully-painted content from the first frame —
  // nothing above the fold sits behind opacity:0/transform-hidden waiting on
  // JS. The headline's word-by-word "rise up" look is faked by animating an
  // opaque decorative `.word-mask` OVER each already-visible word instead of
  // animating the word itself — GSAP/document.fonts.ready only gate that
  // decorative mask now, so a slow font load can no longer delay LCP the way
  // it did when the real text was the thing being hidden and revealed.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return // masks are display:none via CSS media query

    const maskEls = wordMaskRefs.current.filter(
      (el): el is HTMLSpanElement => el !== null,
    )

    let cancelled = false

    const ctx = gsap.context(() => {
      gsap.set(maskEls, { yPercent: 0 })
    }, sectionRef)

    // Wait for the headline webfont so the mask's box matches the word's
    // final layout — same reasoning as before, just no longer a risk to the
    // real text since the real text isn't what's being clipped/moved.
    document.fonts.ready.then(() => {
      if (cancelled) return
      ctx.add(() => {
        gsap.to(maskEls, { yPercent: -100, duration: 1.05, ease: 'expo.out', stagger: 0.065 })
      })
    })

    return () => {
      cancelled = true
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="main-content"
      className="relative flex flex-col justify-center min-h-svh overflow-x-clip"
      aria-label="Hero Website Vikreta"
    >
      {/* ── Content ──────────────────────────────────────────── */}
      <div className="container relative z-10 pt-28 pb-20 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28">

        {/* Label — kicker badge, tight to headline */}
        <span
          style={{ '--fade-y': '14px', '--fade-duration': '0.5s' } as React.CSSProperties}
          className="hero-fade-in inline-flex items-center gap-2 border border-(--color-border) bg-white px-3 py-1.5 rounded-sm mb-6"
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
                >
                  {word}
                </span>
                <span
                  className="word-mask"
                  ref={(el) => { wordMaskRefs.current[i] = el }}
                />
              </span>
              {i < WORDS.length - 1 ? ' ' : null}
            </React.Fragment>
          ))}
        </h1>

        {/* Subheadline — constrained width for ideal line length.
            This is the LCP element on mobile PSI runs — CSS-only fade
            (`.hero-fade-in`), never gated behind JS/font-load. */}
        <p
          style={{ '--fade-y': '18px', '--fade-duration': '0.65s', '--fade-delay': '1.05s' } as React.CSSProperties}
          className="hero-fade-in text-body-lg text-(--color-text-muted) max-w-lg leading-relaxed mb-10 lg:mb-12"
        >
          Website Vikreta works with businesses that want to go digital properly, or want to figure out where AI fits in what they already do. Websites, apps, automation, design. We use every relevant tool available. And we listen before we touch anything.
        </p>

        {/* CTAs */}
        <div
          style={{ '--fade-y': '18px', '--fade-duration': '0.6s', '--fade-delay': '1.25s' } as React.CSSProperties}
          className="hero-fade-in flex flex-wrap gap-3 items-center"
        >
          <Button href="/contact" variant="primary" size="lg" showArrow>
            Talk to Us, it&apos;s Free
          </Button>
          <Button href="/work" variant="ghost" size="lg" showArrow>
            See our work
          </Button>
        </div>

      </div>

      {/* Upwork badge — mobile: bottom-right corner of hero. md+: straddles fold,
          right edge aligned to container content edge. Overlaps section below. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 md:top-[100vh] md:bottom-auto z-20">
        <div className="container relative">
          <div className="pointer-events-auto absolute -bottom-10 right-8 md:right-(--section-x) md:-translate-y-[80%] md:translate-y-0">
            <div className="w-[110px] h-[110px] md:w-auto md:h-auto">
              <UpworkBadge />
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
