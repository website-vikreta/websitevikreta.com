'use client'

import { useRef, useEffect } from 'react'

const SPACING    = 20   // grid density
const BASE_R     = 1  // dot radius
const NEAR_R     = 1.8  // dot radius when close to cursor
const INFLUENCE  = 130  // repel radius px
const MAX_SHIFT  = 14   // max repel displacement px
const SPARKLE_MS = 120  // how often a random dot lights up
const SPARKLE_HOLD = 380 // how long sparkle stays

interface Sparkle { col: number; row: number; born: number }

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animFrame: number
    let mouseX = -9999
    let mouseY = -9999
    const sparkles: Sparkle[] = []
    let lastSparkle = 0

    function resize() {
      if (!canvas) return
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function spawnSparkle(cols: number, rows: number, now: number) {
      if (now - lastSparkle < SPARKLE_MS) return
      lastSparkle = now
      sparkles.push({
        col: Math.floor(Math.random() * cols),
        row: Math.floor(Math.random() * rows),
        born: now,
      })
      // clean expired
      const cutoff = now - SPARKLE_HOLD
      while (sparkles.length > 0 && sparkles[0].born < cutoff) sparkles.shift()
    }

    function draw(now: number) {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cols = Math.ceil(canvas.width  / SPACING) + 2
      const rows = Math.ceil(canvas.height / SPACING) + 2

      spawnSparkle(cols, rows, now)

      // build sparkle lookup
      const sparkleSet = new Set(sparkles.map(s => `${s.col},${s.row}`))
      const sparkleAge = new Map<string, number>()
      for (const s of sparkles) {
        sparkleAge.set(`${s.col},${s.row}`, (now - s.born) / SPARKLE_HOLD)
      }

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const baseX = col * SPACING
          const baseY = row * SPACING

          const dx   = baseX - mouseX
          const dy   = baseY - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)

          let shiftX = 0
          let shiftY = 0
          let proximity = 0

          if (dist < INFLUENCE && dist > 0) {
            proximity = 1 - dist / INFLUENCE
            const force = proximity * MAX_SHIFT
            shiftX = -(dx / dist) * force
            shiftY = -(dy / dist) * force
          }

          const x = baseX + shiftX
          const y = baseY + shiftY

          // Sparkle check
          const key = `${col},${row}`
          const isSparkling = sparkleSet.has(key)
          const age = sparkleAge.get(key) ?? 0
          // arc: rises then fades
          const sparkIntensity = isSparkling
            ? Math.sin(age * Math.PI)
            : 0

          // Color blend: dark dot → warm gold near cursor + sparkle
          const goldBlend = proximity * 0.7 + sparkIntensity * 0.9
          const r = Math.round(10  + goldBlend * 215)  // 10 → 225
          const g = Math.round(10  + goldBlend * 175)  // 10 → 185
          const b = Math.round(10  + goldBlend * -10)  // 10 → 0
          const a = 0.1 + proximity * 0.18 + sparkIntensity * 0.5

          const radius = BASE_R + proximity * (NEAR_R - BASE_R) + sparkIntensity * 0.6

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${a})`
          ctx.fill()
        }
      }

      animFrame = requestAnimationFrame(draw)
    }

    function handleMouseMove(e: MouseEvent) {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    function handleMouseLeave() {
      mouseX = -9999
      mouseY = -9999
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
