'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import {
  Eye, Search, Wrench, PackageCheck,
  Plus, RotateCcw, ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion, DUR, EASE, STAGGER } from '@/lib/gsap/reveals'

// ─── Types ────────────────────────────────────────────────────────────────────

interface WorkflowNode {
  id: string
  step: string
  title: string
  description: string
  icon: LucideIcon
  position: { x: number; y: number }
}

interface WorkflowConnection {
  from: string
  to: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NODE_WIDTH = 250
const NODE_HEIGHT = 196
const GREEN = '#16a34a' // matches the success green used across the site

// ─── Data ─────────────────────────────────────────────────────────────────────

const NODE_GAP = 60 // horizontal space between cards, so the connecting arrow reads clearly

const initialNodes: WorkflowNode[] = [
  {
    id: 'node-1',
    step: '01',
    title: 'We watch',
    description: 'How the work actually gets done today, not how it’s supposed to work on paper.',
    icon: Eye,
    position: { x: 32, y: 100 },
  },
  {
    id: 'node-2',
    step: '02',
    title: 'We find the time sink',
    description: 'The exact step eating the hours, and whether automation is even the right fix.',
    icon: Search,
    position: { x: 32 + (NODE_WIDTH + NODE_GAP), y: 100 },
  },
  {
    id: 'node-3',
    step: '03',
    title: 'We build, quietly',
    description: 'No disruption to the work still running while we build.',
    icon: Wrench,
    position: { x: 32 + (NODE_WIDTH + NODE_GAP) * 2, y: 100 },
  },
  {
    id: 'node-4',
    step: '04',
    title: 'We hand it over',
    description: 'Documentation, a walkthrough, and a system your team owns. No dependency on us to keep it alive.',
    icon: PackageCheck,
    position: { x: 32 + (NODE_WIDTH + NODE_GAP) * 3, y: 100 },
  },
]

const initialConnections: WorkflowConnection[] = [
  { from: 'node-1', to: 'node-2' },
  { from: 'node-2', to: 'node-3' },
  { from: 'node-3', to: 'node-4' },
]

// ─── SVG connection line ──────────────────────────────────────────────────────

function WorkflowConnectionLine({
  from,
  to,
  nodes,
  pathRef,
}: {
  from: string
  to: string
  nodes: WorkflowNode[]
  pathRef?: (el: SVGPathElement | null) => void
}) {
  const fromNode = nodes.find(n => n.id === from)
  const toNode   = nodes.find(n => n.id === to)
  if (!fromNode || !toNode) return null

  const x1   = fromNode.position.x + NODE_WIDTH
  const y1   = fromNode.position.y + NODE_HEIGHT / 2
  const x2   = toNode.position.x - 9 // leave room for the arrowhead
  const y2   = toNode.position.y + NODE_HEIGHT / 2
  const midX = (x1 + x2) / 2

  return (
    <path
      ref={pathRef}
      d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
      fill="none"
      stroke="var(--color-text)"
      strokeWidth={1.5}
      strokeOpacity={0.4}
      strokeDasharray="5 4"
      markerEnd="url(#wf-arrow)"
    />
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AutomationWorkflowCanvas() {
  const [nodes,       setNodes]       = useState<WorkflowNode[]>(initialNodes)
  const [dragging,    setDragging]    = useState(false)
  // Gates the transform CSS-transition (hover lift) so it can't smear gsap's
  // per-frame entrance transform. Flips true once the entrance settles.
  const [entered,     setEntered]     = useState(false)
  const connections = initialConnections

  // ── Entrance choreography refs (self-drawing workflow) ─────────────────────
  const scopeRef    = useRef<HTMLDivElement>(null)
  const nodeElRefs   = useRef<Record<string, HTMLDivElement | null>>({})
  const pathElRefs   = useRef<(SVGPathElement | null)[]>([])
  const markerRef    = useRef<SVGPathElement>(null)
  const badgeRef     = useRef<HTMLSpanElement>(null)

  const dragRef = useRef<{
    id: string
    startMouseX: number
    startMouseY: number
    origX: number
    origY: number
  } | null>(null)

  // ── Custom scrollbars ────────────────────────────────────────────────────
  // Native scrollbars are hidden (.wf-scroll) and replaced with these
  // draggable, accent-colored bars so styling is consistent cross-browser.

  const scrollRef = useRef<HTMLDivElement>(null)
  const [metrics, setMetrics] = useState({
    scrollLeft: 0, scrollTop: 0, scrollWidth: 0, scrollHeight: 0, clientWidth: 0, clientHeight: 0,
  })

  const updateMetrics = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setMetrics({
      scrollLeft:   el.scrollLeft,
      scrollTop:    el.scrollTop,
      scrollWidth:  el.scrollWidth,
      scrollHeight: el.scrollHeight,
      clientWidth:  el.clientWidth,
      clientHeight: el.clientHeight,
    })
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateMetrics()
    el.addEventListener('scroll', updateMetrics, { passive: true })
    const ro = new ResizeObserver(updateMetrics)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateMetrics)
      ro.disconnect()
    }
  }, [updateMetrics])

  const scrollDragRef = useRef<{ axis: 'x' | 'y'; startPointer: number; startScroll: number } | null>(null)

  const onThumbPointerDown = useCallback((e: React.PointerEvent, axis: 'x' | 'y') => {
    e.preventDefault()
    e.stopPropagation()
    const el = scrollRef.current
    if (!el) return
    scrollDragRef.current = {
      axis,
      startPointer: axis === 'x' ? e.clientX : e.clientY,
      startScroll:  axis === 'x' ? el.scrollLeft : el.scrollTop,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [])

  const onThumbPointerMove = useCallback((e: React.PointerEvent) => {
    const d  = scrollDragRef.current
    const el = scrollRef.current
    if (!d || !el) return
    if (d.axis === 'x') {
      const maxScroll       = el.scrollWidth - el.clientWidth
      const thumbWidth      = el.clientWidth * (el.clientWidth / el.scrollWidth)
      const maxThumbTravel  = el.clientWidth - thumbWidth
      const delta           = e.clientX - d.startPointer
      const scrollDelta     = maxThumbTravel > 0 ? (delta / maxThumbTravel) * maxScroll : 0
      el.scrollLeft = Math.min(maxScroll, Math.max(0, d.startScroll + scrollDelta))
    } else {
      const maxScroll       = el.scrollHeight - el.clientHeight
      const thumbHeight     = el.clientHeight * (el.clientHeight / el.scrollHeight)
      const maxThumbTravel  = el.clientHeight - thumbHeight
      const delta           = e.clientY - d.startPointer
      const scrollDelta     = maxThumbTravel > 0 ? (delta / maxThumbTravel) * maxScroll : 0
      el.scrollTop = Math.min(maxScroll, Math.max(0, d.startScroll + scrollDelta))
    }
  }, [])

  const onThumbPointerUp = useCallback(() => {
    scrollDragRef.current = null
  }, [])

  const onTrackPointerDown = useCallback((e: React.PointerEvent, axis: 'x' | 'y') => {
    if (e.target !== e.currentTarget) return // clicks on the thumb itself are handled separately
    const el = scrollRef.current
    if (!el) return
    const rect = e.currentTarget.getBoundingClientRect()
    if (axis === 'x') {
      const ratio = (e.clientX - rect.left) / rect.width
      el.scrollLeft = ratio * (el.scrollWidth - el.clientWidth) - el.clientWidth / 2
    } else {
      const ratio = (e.clientY - rect.top) / rect.height
      el.scrollTop = ratio * (el.scrollHeight - el.clientHeight) - el.clientHeight / 2
    }
  }, [])

  // ── Drag ──────────────────────────────────────────────────────────────────

  const onNodeMouseDown = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault()
      const node = nodes.find(n => n.id === id)
      if (!node) return
      dragRef.current = {
        id,
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        origX: node.position.x,
        origY: node.position.y,
      }
      setDragging(true)
    },
    [nodes],
  )

  useEffect(() => {
    if (!dragging) return

    const onMouseMove = (e: MouseEvent) => {
      const d = dragRef.current
      if (!d) return
      const dx = e.clientX - d.startMouseX
      const dy = e.clientY - d.startMouseY
      setNodes(prev =>
        prev.map(n =>
          n.id === d.id
            ? { ...n, position: { x: Math.max(0, d.origX + dx), y: Math.max(0, d.origY + dy) } }
            : n,
        ),
      )
    }

    const onMouseUp = () => {
      dragRef.current = null
      setDragging(false)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup',   onMouseUp)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup',   onMouseUp)
    }
  }, [dragging])

  // ── Canvas dimensions ─────────────────────────────────────────────────────

  const canvasW = Math.max(...nodes.map(n => n.position.x + NODE_WIDTH + 32))
  const canvasH = Math.max(...nodes.map(n => n.position.y + NODE_HEIGHT + 80))

  useEffect(() => {
    updateMetrics()
  }, [canvasW, canvasH, updateMetrics])

  const resetLayout = useCallback(() => {
    setNodes(initialNodes)
  }, [])

  // ── Entrance: nodes settle 01→04, connectors self-draw L→R, arrows pop last ──
  useEffect(() => {
    const scope = scopeRef.current
    if (!scope) return

    const nodeEls = initialNodes
      .map(n => nodeElRefs.current[n.id])
      .filter((el): el is HTMLDivElement => !!el)
    const paths  = pathElRefs.current.filter(
      (p): p is SVGPathElement => !!p,
    )
    const marker = markerRef.current
    const badge  = badgeRef.current

    // Reduced motion: render the fully-drawn final state, no animation.
    if (prefersReducedMotion()) {
      setEntered(true)
      return
    }

    const ctx = gsap.context(() => {
      // Solid "draw" setup: dash the whole length, hide via offset. Restored
      // to the dashed look on complete so drag redraws stay dashed.
      const lengths = paths.map(p => p.getTotalLength())
      // Dash the whole length as one solid dash; `.from` below sweeps the
      // offset len→0 (immediateRender hides it until the sweep plays).
      paths.forEach((p, i) => {
        gsap.set(p, { strokeDasharray: lengths[i] })
      })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: scope, start: 'top 75%', once: true },
        onComplete: () => {
          gsap.set(nodeEls, { clearProps: 'transform,opacity' })
          paths.forEach(p =>
            gsap.set(p, { clearProps: 'strokeDasharray,strokeDashoffset' }),
          )
          if (marker) gsap.set(marker, { clearProps: 'opacity' })
          if (badge)  gsap.set(badge,  { clearProps: 'transform' })
          setEntered(true)
        },
      })

      // 01 + 02 settle, then connector 01→02 draws, then 03, draw, then 04, draw.
      tl.from(nodeEls[0], { opacity: 0, y: 16, duration: DUR.base, ease: EASE.out }, 0)
      tl.from(nodeEls[1], { opacity: 0, y: 16, duration: DUR.base, ease: EASE.out }, STAGGER.base)
      tl.from(paths[0],   { strokeDashoffset: lengths[0], duration: DUR.crawl, ease: EASE.draw }, '>-0.15')
      tl.from(nodeEls[2], { opacity: 0, y: 16, duration: DUR.base, ease: EASE.out }, '<+0.15')
      tl.from(paths[1],   { strokeDashoffset: lengths[1], duration: DUR.crawl, ease: EASE.draw }, '>-0.15')
      tl.from(nodeEls[3], { opacity: 0, y: 16, duration: DUR.base, ease: EASE.out }, '<+0.15')
      tl.from(paths[2],   { strokeDashoffset: lengths[2], duration: DUR.crawl, ease: EASE.draw }, '>-0.15')

      // Arrowheads pop last.
      if (marker) tl.from(marker, { opacity: 0, duration: DUR.fast, ease: EASE.out }, '>-0.2')

      // Single, non-looping "Active" pulse on entrance.
      if (badge) {
        tl.to(badge, {
          scale: 1.15, duration: DUR.fast, ease: EASE.out, yoyo: true, repeat: 1,
          transformOrigin: 'center',
        }, '<')
      }
    }, scope)

    return () => ctx.revert()
  }, [])

  const hasXOverflow = metrics.scrollWidth  > metrics.clientWidth  + 1
  const hasYOverflow = metrics.scrollHeight > metrics.clientHeight + 1

  const xThumbWidthPct = metrics.scrollWidth  > 0 ? (metrics.clientWidth  / metrics.scrollWidth)  * 100 : 100
  const yThumbHeightPct = metrics.scrollHeight > 0 ? (metrics.clientHeight / metrics.scrollHeight) * 100 : 100

  const xMaxScroll = metrics.scrollWidth  - metrics.clientWidth
  const yMaxScroll = metrics.scrollHeight - metrics.clientHeight

  const xThumbLeftPct = xMaxScroll > 0 ? (metrics.scrollLeft / xMaxScroll) * (100 - xThumbWidthPct)  : 0
  const yThumbTopPct  = yMaxScroll > 0 ? (metrics.scrollTop  / yMaxScroll) * (100 - yThumbHeightPct) : 0

  return (
    <div ref={scopeRef} className="bg-[var(--color-surface)] overflow-hidden">

      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold tracking-tight text-[var(--color-text)]">
            How We Work
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase border"
            style={{
              color:       GREEN,
              borderColor: 'rgba(22,163,74,0.35)',
              background:  'rgba(22,163,74,0.10)',
            }}
          >
            <span
              ref={badgeRef}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: GREEN }}
              aria-hidden
            />
            Active
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetLayout}
            title="Reset the layout back to its original order"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[var(--color-border-strong)] bg-transparent text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-surface)] hover:border-[var(--color-text)] transition-colors duration-200 cursor-pointer"
          >
            <RotateCcw size={12} strokeWidth={2} aria-hidden />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Decorative, non-functional — the process is fixed */}
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="Our process is fixed — these four steps don’t change"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[var(--color-border-strong)] bg-transparent text-[var(--color-text-faint)] cursor-not-allowed"
          >
            <Plus size={12} strokeWidth={2} aria-hidden />
            <span className="hidden sm:inline">Add Node</span>
          </button>
        </div>
      </div>

      {/* ── Canvas ── */}
      <div className="relative">
        <div
          ref={scrollRef}
          id="wf-canvas-viewport"
          role="group"
          aria-label="How we work — our four-step process"
          className="wf-scroll relative overflow-auto p-0"
          style={{
            height: 420,
            backgroundColor: 'var(--color-bg-muted)',
            cursor: dragging ? 'grabbing' : 'default',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        >
        <div className="relative mx-auto" style={{ width: canvasW, height: canvasH }}>

          {/* SVG connection lines — behind nodes, decorative */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width={canvasW}
            height={canvasH}
            aria-hidden
          >
            <defs>
              <marker
                id="wf-arrow"
                viewBox="0 0 8 8"
                refX="6"
                refY="4"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path ref={markerRef} d="M 0 1 L 6 4 L 0 7" fill="none" stroke="var(--color-text)" strokeOpacity={0.55} strokeWidth={1.4} />
              </marker>
            </defs>
            {connections.map((conn, i) => (
              <WorkflowConnectionLine
                key={`${conn.from}-${conn.to}`}
                from={conn.from}
                to={conn.to}
                nodes={nodes}
                pathRef={el => { pathElRefs.current[i] = el }}
              />
            ))}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => {
            const Icon = node.icon
            return (
              <div
                key={node.id}
                ref={el => { nodeElRefs.current[node.id] = el }}
                onMouseDown={e => onNodeMouseDown(e, node.id)}
                role="article"
                aria-roledescription="Draggable process step"
                aria-label={`Step ${node.step}: ${node.title}. ${node.description}`}
                className={`absolute border border-[var(--color-border-strong)] p-4 select-none duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${entered ? 'transition-[border-color,transform]' : 'transition-colors'} ${dragging ? '' : 'hover:border-[var(--color-text)] hover:-translate-y-0.5'}`}
                style={{
                  left:        node.position.x,
                  top:         node.position.y,
                  width:       NODE_WIDTH,
                  minHeight:   NODE_HEIGHT,
                  cursor:      dragging && dragRef.current?.id === node.id ? 'grabbing' : 'grab',
                  background:  'var(--color-surface)',
                  color:       'var(--color-text)',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-8 h-8 flex items-center justify-center shrink-0 border"
                    style={{
                      background:  'var(--color-bg-muted)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    <Icon size={16} strokeWidth={1.75} aria-hidden style={{ color: 'var(--color-text)' }} />
                  </div>
                  <span
                    className="font-semibold tabular-nums"
                    style={{
                      fontSize:      '0.75rem',
                      letterSpacing: '0.12em',
                      color:         'var(--color-text-faint)',
                    }}
                  >
                    STEP {node.step}
                  </span>
                </div>

                <h4
                  className="font-semibold leading-tight mb-2 tracking-tight"
                  style={{ fontSize: '1.1875rem' }}
                >
                  {node.title}
                </h4>
                <p
                  className="leading-snug"
                  style={{
                    fontSize: '0.9375rem',
                    color:    'var(--color-text-muted)',
                  }}
                >
                  {node.description}
                </p>
              </div>
            )
          })}
        </div>
        </div>

        {/* Custom horizontal scrollbar */}
        {hasXOverflow && (
          <div
            role="scrollbar"
            aria-orientation="horizontal"
            aria-controls="wf-canvas-viewport"
            aria-valuenow={Math.round(metrics.scrollLeft)}
            aria-valuemin={0}
            aria-valuemax={Math.round(xMaxScroll)}
            tabIndex={0}
            onPointerDown={e => onTrackPointerDown(e, 'x')}
            onKeyDown={e => {
              const el = scrollRef.current
              if (!el) return
              if (e.key === 'ArrowRight') el.scrollLeft += 60
              if (e.key === 'ArrowLeft')  el.scrollLeft -= 60
            }}
            className="absolute left-0 right-0 bottom-0 h-1 cursor-pointer"
            style={{ background: 'var(--color-border-strong)' }}
          >
            <div
              onPointerDown={e => onThumbPointerDown(e, 'x')}
              onPointerMove={onThumbPointerMove}
              onPointerUp={onThumbPointerUp}
              className="absolute top-0 h-full cursor-grab active:cursor-grabbing"
              style={{
                width:      `${xThumbWidthPct}%`,
                left:       `${xThumbLeftPct}%`,
                background: 'var(--color-accent)',
              }}
            />
          </div>
        )}

        {/* Custom vertical scrollbar */}
        {hasYOverflow && (
          <div
            role="scrollbar"
            aria-orientation="vertical"
            aria-controls="wf-canvas-viewport"
            aria-valuenow={Math.round(metrics.scrollTop)}
            aria-valuemin={0}
            aria-valuemax={Math.round(yMaxScroll)}
            tabIndex={0}
            onPointerDown={e => onTrackPointerDown(e, 'y')}
            onKeyDown={e => {
              const el = scrollRef.current
              if (!el) return
              if (e.key === 'ArrowDown') el.scrollTop += 60
              if (e.key === 'ArrowUp')   el.scrollTop -= 60
            }}
            className="absolute top-0 bottom-0 right-0 w-1 cursor-pointer"
            style={{ background: 'var(--color-border-strong)' }}
          >
            <div
              onPointerDown={e => onThumbPointerDown(e, 'y')}
              onPointerMove={onThumbPointerMove}
              onPointerUp={onThumbPointerUp}
              className="absolute left-0 w-full cursor-grab active:cursor-grabbing"
              style={{
                height:     `${yThumbHeightPct}%`,
                top:        `${yThumbTopPct}%`,
                background: 'var(--color-accent)',
              }}
            />
          </div>
        )}
      </div>

      {/* ── Footer stats ── */}
      <div className="flex items-center gap-4 px-5 py-3 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GREEN }} aria-hidden />
          <span className="text-xs text-[var(--color-text-muted)]">{nodes.length} steps</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ArrowRight size={11} strokeWidth={1.75} style={{ color: 'var(--color-text-faint)' }} aria-hidden />
          <span className="text-xs text-[var(--color-text-muted)]">{connections.length} handoffs</span>
        </div>
        <span className="ml-auto text-xs hidden sm:inline" style={{ color: 'var(--color-text-faint)' }}>
          Drag to rearrange
        </span>
      </div>
    </div>
  )
}
