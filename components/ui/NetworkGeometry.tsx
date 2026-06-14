'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

export function NetworkGeometry() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return

    // Subtle slow drift parallax on scroll
    const ctx = gsap.context(() => {
      gsap.to(svg, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: svg.closest('section'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
      viewBox="0 0 1440 800"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Grid lines – horizontal */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1="0"
          y1={(i * 800) / 8}
          x2="1440"
          y2={(i * 800) / 8}
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {/* Grid lines – vertical */}
      {Array.from({ length: 17 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={(i * 1440) / 16}
          y1="0"
          x2={(i * 1440) / 16}
          y2="800"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {/* Network nodes – scattered positions */}
      {[
        { cx: 120, cy: 140 },
        { cx: 1320, cy: 220 },
        { cx: 280, cy: 680 },
        { cx: 1080, cy: 520 },
        { cx: 720, cy: 400 },
      ].map((pos, i) => (
        <circle
          key={`node-${i}`}
          cx={pos.cx}
          cy={pos.cy}
          r="3"
          fill="currentColor"
        />
      ))}

      {/* Connecting lines between nodes */}
      <line x1="120" y1="140" x2="280" y2="680" stroke="currentColor" strokeWidth="0.5" />
      <line x1="280" y1="680" x2="1080" y2="520" stroke="currentColor" strokeWidth="0.5" />
      <line x1="1320" y1="220" x2="1080" y2="520" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  )
}
