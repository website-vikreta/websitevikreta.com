'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export function RouteProgressBar() {
  const pathname     = usePathname()
  const prevPath     = useRef(pathname)
  const [width,    setWidth]   = useState(0)
  const [visible,  setVisible] = useState(false)
  const [fading,   setFading]  = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null)
  const t2 = useRef<ReturnType<typeof setTimeout> | null>(null)

  function clearAll() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (t1.current) clearTimeout(t1.current)
    if (t2.current) clearTimeout(t2.current)
  }

  function startBar() {
    clearAll()
    setFading(false)
    setVisible(true)
    setWidth(15)

    t1.current = setTimeout(() => setWidth(40), 200)
    t2.current = setTimeout(() => setWidth(55), 600)

    let cur = 55
    intervalRef.current = setInterval(() => {
      cur += Math.random() * 3 + 0.5
      if (cur >= 82) { cur = 82; clearInterval(intervalRef.current!) }
      setWidth(cur)
    }, 500)
  }

  function completeBar() {
    clearAll()
    setWidth(100)
    t1.current = setTimeout(() => setFading(true), 250)
    t2.current = setTimeout(() => {
      setVisible(false)
      setFading(false)
      setWidth(0)
    }, 600)
  }

  // Click listener — catches all <a> tag clicks (Next.js Link renders as <a>)
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href') ?? ''
      if (!href || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('#')) return
      const dest = href.split('?')[0].split('#')[0]
      if (dest === pathname) return
      startBar()
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [pathname])

  // Complete when route finishes
  useEffect(() => {
    if (pathname !== prevPath.current) {
      prevPath.current = pathname
      if (visible) completeBar()
    }
  }, [pathname])

  if (!visible) return null

  return (
    <div
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         '100%',
        height:        '3px',
        zIndex:        99999,
        pointerEvents: 'none',
        opacity:       fading ? 0 : 1,
        transition:    'opacity 0.35s ease',
      }}
    >
      {/* Bar */}
      <div
        style={{
          height:     '100%',
          width:      `${width}%`,
          background: '#FFD600',
          transition: width >= 100 ? 'width 0.25s ease' : 'width 0.5s ease-out',
          position:   'relative',
          overflow:   'hidden',
        }}
      >
        {/* Shimmer */}
        <div
          style={{
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)',
            animation:  'shimmer 1.1s linear infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  )
}
