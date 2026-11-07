'use client'
import type { Demo } from '@/content/ai-automations/types'
import { useSim } from './useSim'

type D = Extract<Demo, { kind: 'fanout' }>

export function FanoutSim({ demo }: { demo: D }) {
  const O = demo.outputs
  const { ref, step, done, reduce, replay } = useSim(O.length + 1, 800)
  return (
    <div ref={ref} className="wv-sim wv-sim-fan">
      <div className="wv-sim-bar"><span className="wv-sim-title">{demo.title}</span></div>
      <div className="wv-sim-src"><span>One idea</span><p>{demo.source}</p></div>
      <div className="wv-sim-outs">
        {O.map((o, i) => (
          <article key={i} className={`wv-sim-out ${i + 1 < step ? 'is-on' : ''}`}>
            <span className="wv-sim-ch">{o.channel}</span>
            <p>{o.text}</p>
          </article>
        ))}
      </div>
      {done && !reduce && <button type="button" className="wv-sim-replay" onClick={replay}>Replay</button>}
    </div>
  )
}
