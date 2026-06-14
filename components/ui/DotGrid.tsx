'use client'

import { useRef, useEffect } from 'react'

const SPACING       = 15
const BASE_R        = 1
const PAINT_R       = 20
const HOLD_TIME     = 0
const FADE_DURATION = 2500

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animFrame: number
    let lastX = -9999
    let lastY = -9999

    // Paint trail: "col,row" → timestamp last touched
    const painted = new Map<string, number>()
    let lastPrune = 0

    function resize() {
      if (!canvas) return
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    // Interpolate along cursor path so fast moves leave no gaps
    function paintSegment(x0: number, y0: number, x1: number, y1: number, now: number) {
      if (!canvas) return
      const cols = Math.ceil(canvas.width  / SPACING) + 2
      const rows = Math.ceil(canvas.height / SPACING) + 2
      const dx  = x1 - x0
      const dy  = y1 - y0
      const len = Math.sqrt(dx * dx + dy * dy)
      // Step at half-brush intervals — guarantees full coverage at any speed
      const steps = Math.max(1, Math.ceil(len / (PAINT_R * 0.5)))
      const r2    = PAINT_R * PAINT_R

      for (let s = 0; s <= steps; s++) {
        const t  = s / steps
        const cx = x0 + dx * t
        const cy = y0 + dy * t
        const c0 = Math.max(0, Math.floor((cx - PAINT_R) / SPACING))
        const c1 = Math.min(cols - 1, Math.ceil((cx + PAINT_R) / SPACING))
        const r0 = Math.max(0, Math.floor((cy - PAINT_R) / SPACING))
        const r1 = Math.min(rows - 1, Math.ceil((cy + PAINT_R) / SPACING))
        for (let r = r0; r <= r1; r++) {
          for (let c = c0; c <= c1; c++) {
            const ddx = c * SPACING - cx
            const ddy = r * SPACING - cy
            if (ddx * ddx + ddy * ddy <= r2) painted.set(`${c},${r}`, now)
          }
        }
      }
    }

    function prunePainted(now: number) {
      if (now - lastPrune < 500) return
      lastPrune = now
      const expire = HOLD_TIME + FADE_DURATION
      for (const [key, t] of painted) {
        if (now - t > expire) painted.delete(key)
      }
    }

    function draw(now: number) {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cols = Math.ceil(canvas.width  / SPACING) + 2
      const rows = Math.ceil(canvas.height / SPACING) + 2

      prunePainted(now)

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * SPACING
          const y = row * SPACING

          const paintTime = painted.get(`${col},${row}`)
          let yellowness  = 0

          if (paintTime !== undefined) {
            const age = now - paintTime
            if (age <= HOLD_TIME) {
              yellowness = 1.0
            } else {
              yellowness = Math.max(0, 1.0 - (age - HOLD_TIME) / FADE_DURATION)
            }
          }

          // Size shrinks over full FADE_DURATION while color stays yellow
          // When size reaches BASE_R (yellowness=0), color snaps back instantly
          const r      = yellowness > 0 ? 255 : 10
          const g      = yellowness > 0 ? 214 : 10
          const b      = 0
          const alpha  = yellowness > 0 ? 0.92 : 0.09
          const radius = BASE_R + yellowness * 1

          ctx.beginPath()
          ctx.arc(x, y, Math.max(0.5, radius), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
          ctx.fill()
        }
      }

      animFrame = requestAnimationFrame(draw)
    }

    function handleMouseMove(e: MouseEvent) {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const nx   = e.clientX - rect.left
      const ny   = e.clientY - rect.top
      const now  = performance.now()

      paintSegment(lastX === -9999 ? nx : lastX, lastX === -9999 ? ny : lastY, nx, ny, now)

      lastX = nx
      lastY = ny
    }

    function handleMouseLeave() {
      lastX = -9999
      lastY = -9999
    }

    const parent = canvas.parentElement
    resize()
    window.addEventListener('resize', resize)
    parent?.addEventListener('mousemove', handleMouseMove)
    parent?.addEventListener('mouseleave', handleMouseLeave)
    animFrame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
      parent?.removeEventListener('mousemove', handleMouseMove)
      parent?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
