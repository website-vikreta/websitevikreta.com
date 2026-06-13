'use client'

import { useRef, useEffect } from 'react'

const SPACING  = 20
const BASE_R   = 1
const NEAR_R   = 1.8
const INFLUENCE = 200
const MAX_SHIFT = 14

// Cursor-zone accent flashes
const CURSOR_INTERVAL = 500   // ms between batches
const CURSOR_HOLD     = 1400  // lifetime per sparkle
const CURSOR_COUNT    = 3     // dots lit per batch

// Ambient whole-grid flashes (very rare, very subtle)
const AMBIENT_INTERVAL = 2000
const AMBIENT_HOLD     = 1400

const SPARKLE_R = 2.5  // peak radius for yellow cursor dots

interface Sparkle {
  col:  number
  row:  number
  born: number
  type: 'cursor' | 'ambient'
}

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
    let lastCursorSpawn  = 0
    let lastAmbientSpawn = 0

    function resize() {
      if (!canvas) return
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function spawnCursorSparkles(cols: number, rows: number, now: number) {
      if (mouseX === -9999) return
      if (now - lastCursorSpawn < CURSOR_INTERVAL) return
      lastCursorSpawn = now
      let count = 0
      let tries = 0
      while (count < CURSOR_COUNT && tries < 50) {
        tries++
        const angle = Math.random() * Math.PI * 2
        const r     = Math.random() * INFLUENCE * 0.85
        const col   = Math.round((mouseX + Math.cos(angle) * r) / SPACING)
        const row   = Math.round((mouseY + Math.sin(angle) * r) / SPACING)
        if (col >= 0 && col < cols && row >= 0 && row < rows) {
          sparkles.push({ col, row, born: now, type: 'cursor' })
          count++
        }
      }
    }

    function spawnAmbientSparkle(cols: number, rows: number, now: number) {
      if (now - lastAmbientSpawn < AMBIENT_INTERVAL) return
      lastAmbientSpawn = now
      sparkles.push({
        col:  Math.floor(Math.random() * cols),
        row:  Math.floor(Math.random() * rows),
        born: now,
        type: 'ambient',
      })
    }

    function pruneSparkles(now: number) {
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const hold = sparkles[i].type === 'cursor' ? CURSOR_HOLD : AMBIENT_HOLD
        if (now - sparkles[i].born > hold) sparkles.splice(i, 1)
      }
    }

    function draw(now: number) {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cols = Math.ceil(canvas.width  / SPACING) + 2
      const rows = Math.ceil(canvas.height / SPACING) + 2

      spawnCursorSparkles(cols, rows, now)
      spawnAmbientSparkle(cols, rows, now)
      pruneSparkles(now)

      // Build per-cell sparkle state (keep highest intensity)
      const sparkleMap = new Map<string, { intensity: number; type: 'cursor' | 'ambient' }>()
      for (const s of sparkles) {
        const hold      = s.type === 'cursor' ? CURSOR_HOLD : AMBIENT_HOLD
        const age       = (now - s.born) / hold
        const intensity = Math.sin(age * Math.PI)  // smooth 0→peak→0
        const key       = `${s.col},${s.row}`
        const prev      = sparkleMap.get(key)
        if (!prev || intensity > prev.intensity) {
          sparkleMap.set(key, { intensity, type: s.type })
        }
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

          const sp             = sparkleMap.get(`${col},${row}`)
          const sparkIntensity = sp?.intensity ?? 0
          const isCursor       = sp?.type === 'cursor'

          // Base: very dark subtle dot
          let r = 10, g = 10, b = 10
          let alpha  = 0.09
          let radius = BASE_R

          // Cursor proximity — grow + warm very slightly
          if (proximity > 0) {
            alpha  += proximity * 0.16
            radius  = BASE_R + proximity * (NEAR_R - BASE_R)
            r = Math.round(10 + proximity * 25)
            g = Math.round(10 + proximity * 18)
          }

          // Sparkle overlay
          if (sparkIntensity > 0) {
            if (isCursor) {
              // Brand yellow #FFD600 = (255, 214, 0)
              const blend = sparkIntensity * 0.9
              r = Math.round(r + blend * (255 - r))
              g = Math.round(g + blend * (214 - g))
              b = Math.round(b + blend * (0   - b))
              alpha  = sparkIntensity
              radius = BASE_R + sparkIntensity * (SPARKLE_R - BASE_R)
            } else {
              // Ambient: near-white faint pulse
              r = Math.round(r + sparkIntensity * 55)
              g = Math.round(g + sparkIntensity * 50)
              b = Math.round(b + sparkIntensity * 40)
              alpha  += sparkIntensity * 0.12
              radius += sparkIntensity * 0.3
            }
          }

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
