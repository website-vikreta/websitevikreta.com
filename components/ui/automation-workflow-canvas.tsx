'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { flushSync } from 'react-dom'
import { motion, useReducedMotion } from 'motion/react'
import {
  Workflow, MessageSquare, FileText, Target, Plug,
  Plus, ArrowRight,
  type LucideIcon,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface WorkflowNode {
  id: string
  type: 'trigger' | 'action' | 'condition'
  title: string
  description: string
  icon: LucideIcon
  color: 'brand' | 'neutral'
  position: { x: number; y: number }
}

interface WorkflowConnection {
  from: string
  to: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NODE_WIDTH = 220
const NODE_HEIGHT = 130

const colorClasses: Record<string, string> = {
  brand: 'border-[#FFBF00]/40 bg-[#FFBF00]/10 text-black',
  neutral: 'border-black/15 bg-black/[0.03] text-black',
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const initialNodes: WorkflowNode[] = [
  {
    id: 'node-1',
    type: 'trigger',
    title: 'AI Workflow Automation',
    description: 'End-to-end workflows powered by AI, built around how you work',
    icon: Workflow,
    color: 'brand',
    position: { x: 50, y: 100 },
  },
  {
    id: 'node-2',
    type: 'action',
    title: 'AI Chatbot Development',
    description: '24/7 first responder, trained on your business',
    icon: MessageSquare,
    color: 'neutral',
    position: { x: 300, y: 100 },
  },
  {
    id: 'node-3',
    type: 'action',
    title: 'Document & Email Automation',
    description: 'Extract, summarize, and act on incoming data instantly',
    icon: FileText,
    color: 'neutral',
    position: { x: 550, y: 100 },
  },
  {
    id: 'node-4',
    type: 'condition',
    title: 'Lead Scoring & Qualification',
    description: 'AI reads behavior and CRM activity to qualify leads',
    icon: Target,
    color: 'neutral',
    position: { x: 800, y: 100 },
  },
  {
    id: 'node-5',
    type: 'action',
    title: 'Custom AI Integrations',
    description: 'GPT or Claude wired directly into your existing tools',
    icon: Plug,
    color: 'neutral',
    position: { x: 1050, y: 100 },
  },
]

const initialConnections: WorkflowConnection[] = [
  { from: 'node-1', to: 'node-2' },
  { from: 'node-2', to: 'node-3' },
  { from: 'node-3', to: 'node-4' },
  { from: 'node-4', to: 'node-5' },
]

const nodeTemplates: Omit<WorkflowNode, 'id' | 'position'>[] = [
  {
    type: 'trigger',
    title: 'AI Workflow Automation',
    description: 'End-to-end workflows powered by AI, built around how you work',
    icon: Workflow,
    color: 'brand',
  },
  {
    type: 'action',
    title: 'AI Chatbot Development',
    description: '24/7 first responder, trained on your business',
    icon: MessageSquare,
    color: 'neutral',
  },
  {
    type: 'action',
    title: 'Document & Email Automation',
    description: 'Extract, summarize, and act on incoming data instantly',
    icon: FileText,
    color: 'neutral',
  },
  {
    type: 'condition',
    title: 'Lead Scoring & Qualification',
    description: 'AI reads behavior and CRM activity to qualify leads',
    icon: Target,
    color: 'neutral',
  },
  {
    type: 'action',
    title: 'Custom AI Integrations',
    description: 'GPT or Claude wired directly into your existing tools',
    icon: Plug,
    color: 'neutral',
  },
]

// ─── SVG connection line ──────────────────────────────────────────────────────

function WorkflowConnectionLine({
  from,
  to,
  nodes,
}: {
  from: string
  to: string
  nodes: WorkflowNode[]
}) {
  const fromNode = nodes.find(n => n.id === from)
  const toNode   = nodes.find(n => n.id === to)
  if (!fromNode || !toNode) return null

  const x1   = fromNode.position.x + NODE_WIDTH
  const y1   = fromNode.position.y + NODE_HEIGHT / 2
  const x2   = toNode.position.x
  const y2   = toNode.position.y + NODE_HEIGHT / 2
  const midX = (x1 + x2) / 2

  return (
    <path
      d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
      fill="none"
      stroke="#121212"
      strokeWidth={1.5}
      strokeDasharray="4 3"
      strokeOpacity={0.2}
    />
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AutomationWorkflowCanvas() {
  const reduce = useReducedMotion()
  const [nodes,       setNodes]       = useState<WorkflowNode[]>(initialNodes)
  const [connections, setConnections] = useState<WorkflowConnection[]>(initialConnections)
  const [dragging,    setDragging]    = useState(false)

  const canvasRef = useRef<HTMLDivElement>(null)
  const dragRef   = useRef<{
    id: string
    startMouseX: number
    startMouseY: number
    origX: number
    origY: number
  } | null>(null)

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

  // ── Add node ──────────────────────────────────────────────────────────────

  const addNode = useCallback(() => {
    const template  = nodeTemplates[Math.floor(Math.random() * nodeTemplates.length)]
    const lastNode  = nodes[nodes.length - 1]
    const newNode: WorkflowNode = {
      ...template,
      id: `node-${Date.now()}`,
      position: {
        x: lastNode.position.x + NODE_WIDTH + 50,
        y: lastNode.position.y,
      },
    }

    flushSync(() => {
      setNodes(prev       => [...prev, newNode])
      setConnections(prev => [...prev, { from: lastNode.id, to: newNode.id }])
    })

    canvasRef.current?.scrollTo({ left: newNode.position.x - 50, behavior: 'smooth' })
  }, [nodes])

  // ── Canvas dimensions ─────────────────────────────────────────────────────

  const canvasW = Math.max(...nodes.map(n => n.position.x + NODE_WIDTH + 80))
  const canvasH = Math.max(...nodes.map(n => n.position.y + NODE_HEIGHT + 80))

  return (
    <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_2px_16px_rgba(0,0,0,0.04)] overflow-hidden">

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold text-[var(--color-text)]">Automation Canvas</span>
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase rounded-full border border-[#FFBF00]/40 bg-[#FFBF00]/10 text-black">
            Active
          </span>
        </div>
        <button
          onClick={addNode}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border border-black/30 bg-transparent text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-white hover:border-[var(--color-text)] transition-colors duration-200 cursor-pointer"
        >
          <Plus size={12} strokeWidth={2} aria-hidden />
          Add Node
        </button>
      </div>

      {/* ── Canvas ── */}
      <div
        ref={canvasRef}
        className="relative overflow-x-auto overflow-y-hidden"
        style={{
          height: 420,
          backgroundColor: 'var(--color-bg-muted)',
          cursor: dragging ? 'grabbing' : 'default',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        <div className="relative" style={{ width: canvasW, height: canvasH }}>

          {/* SVG connection lines — behind nodes */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width={canvasW}
            height={canvasH}
          >
            {connections.map(conn => (
              <WorkflowConnectionLine
                key={`${conn.from}-${conn.to}`}
                from={conn.from}
                to={conn.to}
                nodes={nodes}
              />
            ))}
          </svg>

          {/* Nodes */}
          {nodes.map((node, i) => {
            const Icon      = node.icon
            const isInitial = i < initialNodes.length
            return (
              <motion.div
                key={node.id}
                initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: reduce ? 0 : 0.25,
                  delay:    reduce ? 0 : (isInitial ? i * 0.06 : 0),
                  ease:     [0.22, 1, 0.36, 1],
                }}
                onMouseDown={e => onNodeMouseDown(e, node.id)}
                className={`absolute rounded-xl border p-4 select-none ${colorClasses[node.color]}`}
                style={{
                  left:      node.position.x,
                  top:       node.position.y,
                  width:     NODE_WIDTH,
                  minHeight: NODE_HEIGHT,
                  cursor:    dragging && dragRef.current?.id === node.id ? 'grabbing' : 'grab',
                  boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
                }}
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                    style={{
                      background: node.color === 'brand'
                        ? 'rgba(255,191,0,0.2)'
                        : 'rgba(0,0,0,0.06)',
                    }}
                  >
                    <Icon size={13} strokeWidth={1.5} aria-hidden />
                  </div>
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: '0.625rem', letterSpacing: '0.1em', opacity: 0.5 }}
                  >
                    {node.type}
                  </span>
                </div>

                <h4
                  className="font-bold leading-snug"
                  style={{ fontSize: '0.9375rem' }}
                >
                  {node.title}
                </h4>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── Footer stats ── */}
      <div className="flex items-center gap-4 px-5 py-3 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: '#FFBF00' }}
          />
          <span className="text-xs text-[var(--color-text-muted)]">{nodes.length} nodes</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ArrowRight size={10} strokeWidth={1.5} style={{ color: 'var(--color-text-faint)' }} aria-hidden />
          <span className="text-xs text-[var(--color-text-muted)]">{connections.length} connections</span>
        </div>
        <span
          className="ml-auto text-xs hidden sm:inline"
          style={{ color: 'var(--color-text-faint)' }}
        >
          Drag nodes to rearrange
        </span>
      </div>
    </div>
  )
}
