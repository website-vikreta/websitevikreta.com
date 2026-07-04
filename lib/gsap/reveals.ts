'use client'

import { useEffect, type DependencyList, type RefObject } from 'react'
import { gsap, SplitText } from '@/lib/gsap'

/**
 * Shared GSAP motion primitives for the AI-Automations page (and beyond).
 * Section builders call these inside `useGsapSection` — never hand-roll gsap.fromTo.
 * All primitives self-gate on prefers-reduced-motion and jump to final state.
 * See motion-spec.md Section A for the contract.
 */

// ── A1. Tokens ──────────────────────────────────────────────────────────────

/** Easing map. Standard reveal curve ≈ cubic-bezier(0.16,1,0.3,1). No back/elastic/bounce. */
export const EASE = {
  out: 'power3.out',
  smooth: 'expo.out',
  inOut: 'power2.inOut',
  draw: 'power1.inOut',
} as const

/** Duration scale (seconds). Use these — never ad-hoc values. */
export const DUR = {
  micro: 0.2,
  fast: 0.4,
  base: 0.7,
  slow: 1.0,
  crawl: 1.4,
} as const

/** Stagger scale (seconds between grouped elements). */
export const STAGGER = { tight: 0.05, base: 0.1, loose: 0.15 } as const

/** Default ScrollTrigger start for reveals (text/cards/images). */
export const ST_START = 'top 85%' as const

// ── Internals ────────────────────────────────────────────────────────────────

/** True when the user requested reduced motion (SSR-safe). */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

type TriggerTarget = Element | string | null

interface ScrollOptions {
  /** ScrollTrigger element/selector. Omit → use a sensible fallback. `null` → load-triggered (no ScrollTrigger). */
  trigger?: TriggerTarget
  /** ScrollTrigger start. Default 'top 85%'. */
  start?: string
  /** Fire once, never re-animate on scroll-up. Default true. */
  once?: boolean
}

function firstElement(target: gsap.DOMTarget): Element | null {
  if (typeof window === 'undefined') return null
  if (typeof target === 'string') return document.querySelector(target)
  if (target instanceof Element) return target
  if (Array.isArray(target)) {
    const el = target[0]
    return el instanceof Element ? el : null
  }
  return null
}

/** Build a ScrollTrigger vars object, or undefined for load-triggered animations. */
function scrollVars(
  fallback: Element | string | null,
  opts: ScrollOptions,
): gsap.TweenVars['scrollTrigger'] {
  if (opts.trigger === null) return undefined
  const triggerEl = opts.trigger ?? fallback
  if (!triggerEl) return undefined
  return { trigger: triggerEl, start: opts.start ?? ST_START, once: opts.once ?? true }
}

// ── A2. Reveal primitives ────────────────────────────────────────────────────

interface RevealLinesOptions extends ScrollOptions {
  delay?: number
  stagger?: number
}

/**
 * Masked heading reveal — splits into lines, masks each, slides the inner up from behind.
 * Trigger sits on the static heading (never the moving inner). Returns the tween (timeline-addable for the hero).
 */
export function revealLines(
  target: Element | string,
  options: RevealLinesOptions = {},
): gsap.core.Tween {
  const { delay = 0, stagger = STAGGER.base } = options
  const el = firstElement(target)
  if (!el || prefersReducedMotion()) {
    return gsap.set(el ?? {}, {})
  }

  const split = new SplitText(el, { type: 'lines', linesClass: 'rl-line' })
  const inners: HTMLElement[] = []
  split.lines.forEach((line) => {
    const lineEl = line as HTMLElement
    // Mask + descender guard (padding+negative-margin nets zero layout shift).
    lineEl.style.overflow = 'hidden'
    lineEl.style.paddingBottom = '0.14em'
    lineEl.style.marginBottom = '-0.14em'
    const inner = document.createElement('span')
    inner.className = 'rl-inner'
    inner.style.display = 'block'
    while (lineEl.firstChild) inner.appendChild(lineEl.firstChild)
    lineEl.appendChild(inner)
    inners.push(inner)
  })

  return gsap.from(inners, {
    yPercent: 110,
    duration: DUR.slow,
    ease: EASE.smooth,
    stagger,
    delay,
    scrollTrigger: scrollVars(el, options),
  })
}

interface RevealFadeUpOptions extends ScrollOptions {
  y?: number
  stagger?: number
  delay?: number
}

/**
 * Fade + rise reveal — for paragraphs, cards, buttons, form columns. Group stagger by DOM order.
 * Returns the tween (timeline-addable). Trigger defaults to the first target.
 */
export function revealFadeUp(
  targets: gsap.DOMTarget,
  options: RevealFadeUpOptions = {},
): gsap.core.Tween {
  const { y = 24, stagger = STAGGER.base, delay = 0 } = options
  if (prefersReducedMotion()) {
    return gsap.set(targets, { opacity: 1, y: 0 })
  }
  return gsap.from(targets, {
    opacity: 0,
    y,
    duration: DUR.base,
    ease: EASE.out,
    stagger,
    delay,
    scrollTrigger: scrollVars(firstElement(targets), options),
  })
}

interface RevealClipImageOptions extends ScrollOptions {
  /** Pair the clip wipe with a slow 1.08→1 inner-image scale settle. Default true; pass false for §3 cards. */
  scale?: boolean
}

/**
 * Editorial image reveal — clip-path wipes up from the bottom, inner <img> settles from 1.08 scale.
 * Container must be overflow-hidden. Returns the timeline.
 */
export function revealClipImage(
  target: Element | string,
  options: RevealClipImageOptions = {},
): gsap.core.Timeline {
  const { scale = true } = options
  const el = firstElement(target)
  if (!el) return gsap.timeline()
  if (prefersReducedMotion()) {
    gsap.set(el, { clipPath: 'inset(0 0 0% 0)' })
    const imgEl = el.querySelector('img')
    if (imgEl) gsap.set(imgEl, { scale: 1 })
    return gsap.timeline()
  }

  const tl = gsap.timeline({ scrollTrigger: scrollVars(el, options) })
  tl.from(el, { clipPath: 'inset(0 0 100% 0)', duration: DUR.slow, ease: EASE.smooth }, 0)
  if (scale) {
    const img = el.querySelector('img')
    if (img) tl.from(img, { scale: 1.08, duration: DUR.crawl, ease: EASE.out }, 0)
  }
  return tl
}

interface CountUpOptions extends ScrollOptions {
  suffix?: string
  duration?: number
}

/**
 * Count-up number — animates a target's textContent 0→value once in view (power3.out, integer snap).
 * Not used on the current AI-Automations copy; included for parity. Do not invent stats.
 */
export function countUp(
  target: Element | string,
  value: number,
  options: CountUpOptions = {},
): gsap.core.Tween {
  const { suffix = '', duration = DUR.slow } = options
  const el = firstElement(target)
  if (!el) return gsap.set({}, {})
  if (prefersReducedMotion()) {
    el.textContent = `${value}${suffix}`
    return gsap.set(el, {})
  }
  const state = { n: 0 }
  return gsap.to(state, {
    n: value,
    duration,
    ease: EASE.out,
    snap: { n: 1 },
    scrollTrigger: scrollVars(el, options),
    onUpdate: () => {
      el.textContent = `${Math.round(state.n)}${suffix}`
    },
  })
}

/**
 * Magnetic pointer-follow — hero primary CTA ONLY. Fine-pointer, non-reduced only. Max travel 8px.
 * Returns a cleanup fn; call it on unmount (event listeners are outside gsap.context).
 */
export function magnetic(el: HTMLElement, strength = 0.25): () => void {
  const noop = () => {}
  if (typeof window === 'undefined') return noop
  if (prefersReducedMotion()) return noop
  if (!window.matchMedia('(pointer: fine)').matches) return noop

  const MAX = 8
  const clamp = (v: number) => Math.max(-MAX, Math.min(MAX, v))

  const onMove = (e: PointerEvent) => {
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    gsap.to(el, {
      x: clamp(relX * strength),
      y: clamp(relY * strength),
      duration: DUR.fast,
      ease: EASE.out,
    })
  }
  const onLeave = () => {
    gsap.to(el, { x: 0, y: 0, duration: DUR.fast, ease: EASE.out })
  }

  el.addEventListener('pointermove', onMove)
  el.addEventListener('pointerleave', onLeave)
  return () => {
    el.removeEventListener('pointermove', onMove)
    el.removeEventListener('pointerleave', onLeave)
    gsap.set(el, { x: 0, y: 0 })
  }
}

// ── A4. Cleanup hook ─────────────────────────────────────────────────────────

/**
 * Scopes a section's GSAP work to a ref and reverts (kills tweens + ScrollTriggers + restores SplitText) on unmount.
 * `callback(reduce)` runs inside gsap.context; `reduce` lets you short-circuit whole timelines (e.g. the hero).
 */
export function useGsapSection(
  ref: RefObject<Element | null>,
  callback: (reduce: boolean) => void,
  deps: DependencyList = [],
): void {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const scope = ref.current
    if (!scope) return
    const reduce = prefersReducedMotion()
    const ctx = gsap.context(() => callback(reduce), scope)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
