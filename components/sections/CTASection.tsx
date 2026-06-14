'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { DotGrid } from '@/components/ui/DotGrid'

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
}

export function CTASection({
  badge,
  title,
  description,
  action,
  withGlow = true,
}: CTAProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-0 md:pt-0">
      {/* DotGrid background */}
      <div className="absolute inset-0">
        <DotGrid />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-container flex-col items-center gap-6 px-8 py-8 text-center sm:gap-6 md:py-12">
        {/* Badge */}
        {badge && (
          <Badge text={badge.text} />
        )}

        {/* Title */}
        <h2 className="text-3xl font-semibold sm:text-5xl">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-muted-foreground">
            {description}
          </p>
        )}

        {/* Action Button */}
        <Button
          href={action.href}
          variant="accent"
          size="lg"
          showArrow
        >
          {action.text}
        </Button>

        {/* Glow Effect */}
        {withGlow && (
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-yellow-400/20 to-transparent opacity-50" />
        )}
      </div>
    </section>
  )
}
