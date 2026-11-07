'use client'
import type { Demo } from '@/content/ai-automations/types'
import { useSim } from './useSim'

type D = Extract<Demo, { kind: 'flow' }>

// ponytail: nodes render in listed order as a chain; edges only decide order of lighting. Branching layouts need real graph layout.
export function FlowSim({ demo }: { demo: D }) {
  const N = demo.nodes
  const { ref, step, done, reduce, replay } = useSim(N.length, 900)
  return (
    <div ref={ref} className="wv-sim wv-sim-flow">
      <div className="wv-sim-bar"><span className="wv-sim-title">{demo.title}</span></div>
      <ol className="wv-sim-nodes">
        {N.map((n, i) => (
          <li key={n.id} className={i < step ? 'is-on' : ''}>
            <span className="wv-sim-node"><b>{n.label}</b>{n.app && <i>{n.app}</i>}</span>
            {i < N.length - 1 && <span className="wv-sim-edge" aria-hidden />}
          </li>
        ))}
      </ol>
      {done && !reduce && <button type="button" className="wv-sim-replay" onClick={replay}>Replay</button>}
    </div>
  )
}
