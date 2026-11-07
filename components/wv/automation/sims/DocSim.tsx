'use client'
import type { Demo } from '@/content/ai-automations/types'
import { useSim } from './useSim'

type D = Extract<Demo, { kind: 'doc' }>

export function DocSim({ demo }: { demo: D }) {
  const f = demo.fields, s = demo.status
  const { ref, step, done, reduce, replay } = useSim(f.length + s.length, 700)
  return (
    <div ref={ref} className="wv-sim wv-sim-doc">
      <div className="wv-sim-bar"><span className="wv-sim-title">{demo.title}</span></div>
      <div className="wv-sim-paper">
        <h3 className="wv-sim-doct">{demo.docTitle}</h3>
        <dl>
          {f.map((x, i) => (
            <div key={i} className={`wv-sim-field ${i < step ? 'is-on' : ''}`}>
              <dt>{x.label}</dt><dd>{x.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <ul className="wv-sim-status">
        {s.map((x, i) => (
          <li key={i} className={f.length + i < step ? 'is-on' : ''}><span aria-hidden>✓</span>{x}</li>
        ))}
      </ul>
      {done && !reduce && <button type="button" className="wv-sim-replay" onClick={replay}>Replay</button>}
    </div>
  )
}
