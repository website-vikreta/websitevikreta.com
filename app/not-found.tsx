'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { DotGrid } from '@/components/ui/DotGrid'

export default function NotFound() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLHeadingElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [labelRef.current, headingRef.current, subheadRef.current, ctaRef.current],
          { opacity: 1, y: 0 },
        )
        return
      }

      // Initial states
      gsap.set(labelRef.current, { opacity: 0, y: 14 })
      gsap.set(headingRef.current, { opacity: 0, y: 18 })
      gsap.set([subheadRef.current, ctaRef.current], { opacity: 0, y: 18 })

      const tl = gsap.timeline({ delay: 0.1 })

      // 1. Label fades in
      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
      // 2. Heading fades in
        .to(
          headingRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
          },
          '-=0.2',
        )
      // 3. Subhead fades in
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
      // 4. CTA fades in
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
      className="relative flex flex-col justify-center min-h-svh overflow-hidden"
      aria-label="Page Not Found"
    >
      <DotGrid />
      {/* Content */}
      <div className="container relative z-10 pt-28 pb-20 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28">
        <div className="max-w-[720px] mx-auto">
        {/* 404 */}
        <h1
          ref={labelRef}
          className="inline-block font-bold text-[var(--color-text)] mb-8 text-7xl md:text-9xl leading-[1]"
        >
          404
        </h1>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-3xl md:text-5xl font-semibold text-(--color-text) font-sans mb-6 lg:mb-8"
        >
          Page Not Found
        </h2>

        {/* Subhead */}
        <p
          ref={subheadRef}
          className="text-body-lg text-(--color-text-muted) max-w-lg leading-relaxed mb-10 lg:mb-12"
        >
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>

        {/* CTA */}
        <div ref={ctaRef}>
          <Button href="/" variant="primary" showArrow>Visit Home</Button>
        </div>
        </div>
      </div>
    </section>
  )
}
