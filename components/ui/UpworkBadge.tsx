'use client'

import React, { useEffect, useId, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const BADGE_TEXT = 'TOP RATED ON UPWORK ✱ 100% JOB SUCCESS ✱ CLICK TO HIRE ✱ '

function UpworkMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M 395.2 287.6 Q 364.8 286 345.6 270 L 345.6 270 L 345.6 270 Q 326.4 254.8 320.8 244.4 Q 328 187.6 348 165.2 Q 367.2 142.8 395.2 143.6 Q 423.2 144.4 440.8 163.6 Q 459.2 182.8 460 215.6 Q 459.2 248.4 440.8 267.6 Q 423.2 286.8 395.2 287.6 L 395.2 287.6 Z M 395.2 97.2 Q 345.6 98 317.6 123.6 L 317.6 123.6 L 317.6 123.6 Q 289.6 149.2 282.4 183.6 Q 264.8 147.6 254.4 103.6 L 164 103.6 L 164 103.6 L 164 216.4 L 164 216.4 Q 164 247.6 150.4 267.6 Q 136 286.8 108.8 287.6 Q 81.6 286.8 66.4 267.6 Q 52 247.6 52 216.4 L 52 103.6 L 52 103.6 L 0 103.6 L 0 103.6 L 0 216.4 L 0 216.4 Q 0 266.8 29.6 300.4 Q 60.8 334 108.8 334 Q 156.8 333.2 186.4 301.2 Q 215.2 269.2 216 216.4 L 216 140.4 L 216 140.4 Q 220.8 160.4 233.6 191.6 Q 245.6 222.8 268 255.6 L 240 414.8 L 240 414.8 L 293.6 414.8 L 293.6 414.8 L 312 302 L 312 302 Q 320.8 309.2 331.2 315.6 Q 358.4 332.4 390.4 334 Q 391.2 334 395.2 334 Q 444.8 333.2 477.6 300.4 Q 510.4 267.6 512 215.6 Q 510.4 163.6 477.6 130.8 Q 444.8 98 395.2 97.2 L 395.2 97.2 Z"
      />
    </svg>
  )
}

const CIRCUMFERENCE = 2 * Math.PI * 40 // path radius = 40 SVG units ≈ 251.327

export function UpworkBadge() {
  const pathId  = useId().replace(/:/g, 'up')
  const badgeRef = useRef<HTMLAnchorElement>(null)
  const ringRef  = useRef<HTMLDivElement>(null)
  const textRef  = useRef<SVGTextElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  // Fit font-size so text exactly fills the circle circumference.
  // Must run after paint + fonts loaded — useLayoutEffect fires too early for SVG text metrics.
  useEffect(() => {
    let cancelled = false

    const fit = () => {
      if (cancelled) return
      const textEl = textRef.current
      if (!textEl) return
      const tp = textEl.querySelector('textPath') as (SVGTextContentElement & Element) | null
      if (!tp) return
      const natural = tp.getComputedTextLength()
      if (natural === 0) {
        requestAnimationFrame(fit)
        return
      }
      const base = parseFloat(textEl.getAttribute('font-size') ?? '5.5')
      textEl.setAttribute('font-size', ((base * CIRCUMFERENCE) / natural).toFixed(4))
    }

    document.fonts.ready.then(() => requestAnimationFrame(fit))

    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const el = badgeRef.current
    const ring = ringRef.current
    if (!el || !ring) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Entrance — fires after all hero animations complete (~2.6s total)
    if (prefersReduced) {
      gsap.set(el, { opacity: 1, scale: 1 })
      tweenRef.current = gsap.to(ring, {
        rotation: 360,
        duration: 12,
        ease: 'linear',
        repeat: -1,
        transformOrigin: '50% 50%',
      })
    } else {
      gsap.set(el, { opacity: 0, scale: 0, transformOrigin: '50% 50%' })
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: 'back.out(2.4)',
        delay: 2.8,
        onComplete: () => {
          tweenRef.current = gsap.to(ring, {
            rotation: 360,
            duration: 12,
            ease: 'linear',
            repeat: -1,
            transformOrigin: '50% 50%',
          })
        },
      })
    }

    return () => {
      tweenRef.current?.kill()
    }
  }, [])

  const handleMouseEnter = () => tweenRef.current?.timeScale(0.25)
  const handleMouseLeave = () => tweenRef.current?.timeScale(1)

  return (
    <a
      ref={badgeRef}
      href="http://upwork.com/ag/websitevikreta"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Top rated on Upwork with 100% Job Success Score — view agency profile"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex items-center justify-center w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] cursor-pointer select-none"
      style={{ opacity: 0 }}
    >
      {/* Spinning text ring — font in SVG user units so it scales with badge size */}
      <div ref={ringRef} className="absolute inset-0">
        <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
          <defs>
            <path
              id={pathId}
              d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
            />
          </defs>
          <text
            ref={textRef}
            fontSize="5.5"
            letterSpacing="0.3"
            fill="var(--color-text-muted)"
            fontFamily="Epilogue, sans-serif"
            textAnchor="start"
          >
            <textPath href={`#${pathId}`} startOffset="0%">
              {BADGE_TEXT}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Centre — bare Upwork logo, ~25% of badge width */}
      <UpworkMark className="relative z-10 w-1/4 h-1/4 text-(--color-text) group-hover:text-[#14A800] transition-colors duration-300" />
    </a>
  )
}
