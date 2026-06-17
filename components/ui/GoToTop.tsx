'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export function GoToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={[
        'btn btn-ghost bg-[var(--color-surface)]',
        'fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-40',
        'p-0 w-9 h-9 sm:w-10 sm:h-10',
        'transition-opacity duration-300',
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      ].join(' ')}
    >
      <ChevronUp size={16} strokeWidth={1.75} aria-hidden="true" />
    </button>
  )
}
