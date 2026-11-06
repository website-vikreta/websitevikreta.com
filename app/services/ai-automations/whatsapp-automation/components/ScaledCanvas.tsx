'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/* Lays children out on a fixed width×height canvas (a reference image's own coordinates) and
   scales it to the available width. The canvas is absolutely positioned so its fixed pixel width
   never feeds back into the parent grid column. */
export default function ScaledCanvas({ width, height, children }: { width: number; height: number; children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.74)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])

  return (
    <div ref={wrapRef} className="relative w-full overflow-hidden" style={{ height: height * scale }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width, height, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  )
}
