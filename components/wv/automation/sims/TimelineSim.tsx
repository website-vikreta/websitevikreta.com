'use client'
import type { Demo } from '@/content/ai-automations/types'
import { useSim } from './useSim'

type D = Extract<Demo, { kind: 'timeline' }>

export function TimelineSim({ demo }: { demo: D }) {
  const E = demo.events
  const { ref, step, done, reduce, replay } = useSim(E.length, 1000)
  return (
    <div ref={ref} className="wv-sim wv-sim-tl">
      <div className="wv-sim-bar"><span className="wv-sim-title">{demo.title}</span></div>
      <ol className="wv-sim-events">
        {E.map((e, i) => (
          <li key={i} className={`is-${e.state} ${i < step ? 'is-on' : ''}`}>
            <span className="wv-sim-dot" aria-hidden />
            <span className="wv-sim-at">{e.at}</span>
            <span className="wv-sim-lbl">{e.label}</span>
          </li>
        ))}
      </ol>
      {done && !reduce && <button type="button" className="wv-sim-replay" onClick={replay}>Replay</button>}
    </div>
  )
}
