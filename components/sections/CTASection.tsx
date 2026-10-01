'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { RevealText, RevealFade } from '@/components/ui/Reveal'

const CTAMapBackground = dynamic(
  () => import('@/components/ui/CTAMapBackground').then((mod) => mod.CTAMapBackground),
  { ssr: false }
)

interface CTAProps {
  badge?: {
    text: string
  }
  title: string
  description?: string
  action: {
    text: string
    href: string
  }
  withGlow?: boolean
  withMap?: boolean
}

export function CTASection({
  badge,
  title,
  description,
  action,
  withMap = true,
}: CTAProps) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative w-full overflow-hidden border-y border-[var(--color-border,#E8E8E8)] bg-[var(--color-bg,#FAFAF7)] py-20 sm:py-24 md:py-28 lg:py-32"
    >
      {/* Background Curved Natural Earth Map Strip */}
      {withMap && (
        <div className="opacity-70 sm:opacity-100 transition-opacity duration-500">
          <CTAMapBackground />
        </div>
      )}

      {/* Optional Badge if explicitly passed */}
      {badge && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 sm:bottom-8 z-20">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
            <div className="pointer-events-auto inline-block">
              <Badge text={badge.text} />
            </div>
          </div>
        </div>
      )}

      {/* Content Container (elevated, commanding hero typography) */}
      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center gap-3.5 px-6 text-center sm:gap-5">
        {/* Title — Signature Masked Vertical Line Reveal */}
        <RevealText
          as="h2"
          className="text-3xl font-bold tracking-tight text-[#121212] sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.08]"
        >
          <span id="cta-heading">{title}</span>
        </RevealText>

        {/* Description — Staggered Fade Up */}
        {description && (
          <RevealFade delay={0.12} y={16}>
            <p className="max-w-lg text-sm sm:text-base text-[var(--color-text-muted,#525252)] leading-relaxed">
              {description}
            </p>
          </RevealFade>
        )}

        {/* Action Button — Staggered Fade Up with Hover Scale */}
        <RevealFade delay={0.22} y={16}>
          <div className="mt-1 sm:mt-2">
            <Button
              href={action.href}
              variant="accent"
              size="lg"
              showArrow
            >
              {action.text}
            </Button>
          </div>
        </RevealFade>
      </div>
    </section>
  )
}

