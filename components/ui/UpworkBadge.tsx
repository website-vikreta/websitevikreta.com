'use client'

import React, { useEffect, useId, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const BADGE_TEXT = 'TOP RATED ON UPWORK ✱ 100% JOB SUCCESS ✱ '

// Upwork wordmark "U" — path lifted from public/brands-upwork.svg
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

export function UpworkBadge() {
  const pathId = useId().replace(/:/g, 'up')
  const ringRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    if (!ringRef.current) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) return

    tweenRef.current = gsap.to(ringRef.current, {
      rotation: 360,
      duration: 12,
      ease: 'linear',
      repeat: -1,
      transformOrigin: '50% 50%',
    })

    return () => {
      tweenRef.current?.kill()
    }
  }, [])

  const handleMouseEnter = () => tweenRef.current?.timeScale(0.25)
  const handleMouseLeave = () => tweenRef.current?.timeScale(1)

  return (
    <a
      href="http://upwork.com/ag/websitevikreta"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Top rated on Upwork with 100% Job Success Score — view agency profile"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex items-center justify-center w-[180px] h-[180px] cursor-pointer select-none"
    >
      {/* Spinning text ring — no circle, text only */}
      <div ref={ringRef} className="absolute inset-0">
        <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
          <defs>
            <path
              id={pathId}
              d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
            />
          </defs>
          <text
            style={{ fontSize: '0.5rem' }}
            letterSpacing="0.5"
            fill="var(--color-text-muted)"
            fontFamily="var(--font-epilogue, sans-serif)"
          >
            <textPath href={`#${pathId}`} startOffset="0%">
              {BADGE_TEXT}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Centre — bare logo, no disc/border/background */}
      <UpworkMark className="relative z-10 w-[46px] h-[46px] text-(--color-text) group-hover:text-[#14A800] transition-colors duration-300" />
    </a>
  )
}
