'use client'

import { useEffect, useState } from 'react'

/** Round "back to top" button. Appears after one screen of scrolling. */
export function BackToTop() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const check = () => setOn(window.scrollY > 700)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])
  return (
    <button
      type="button"
      className={`wv-top${on ? ' is-on' : ''}`}
      aria-label="Back to top"
      tabIndex={on ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
    >
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}
