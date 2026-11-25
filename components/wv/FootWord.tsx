'use client'

import { useRef } from 'react'

/** Outlined wordmark; a yellow disc follows the pointer and shows only inside the glyphs (background-clip: text). */
export function FootWord() {
  const ref = useRef<HTMLParagraphElement>(null)
  return (
    <p
      ref={ref}
      className="wv-foot-word"
      aria-hidden="true"
      onPointerMove={(e) => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - r.left}px`)
        el.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
      onPointerEnter={() => ref.current?.style.setProperty('--r', '96px')}
      onPointerLeave={() => ref.current?.style.setProperty('--r', '0px')}
    >
      WEBSITE VIKRETA
    </p>
  )
}
