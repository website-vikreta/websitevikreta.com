'use client'
import { useRef, useState } from 'react'
import type { Demo } from '@/content/ai-automations/types'
import { useSim } from './useSim'

type D = Extract<Demo, { kind: 'call' }>

export function CallSim({ demo }: { demo: D }) {
  const L = demo.lines
  const { ref, step, done, reduce, replay } = useSim(L.length + 1, 1300)
  const au = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const live = !done && !reduce
  const toggle = () => {
    const a = au.current
    if (!a) return
    if (a.paused) { a.play().then(() => setPlaying(true)).catch(() => {}) } else { a.pause(); setPlaying(false) }
  }
  return (
    <div ref={ref} className="wv-sim wv-sim-call">
      <div className="wv-sim-bar">
        <span className="wv-sim-title">{demo.title}</span>
        <span className="wv-sim-tag">{demo.caller}</span>
      </div>
      <div className={`wv-sim-wave ${live ? 'is-live' : ''}`} aria-hidden>
        {Array.from({ length: 28 }, (_, i) => <span key={i} style={{ ['--i' as string]: i, ['--h' as string]: 0.25 + ((i * 37) % 10) / 14 }} />)}
      </div>
      <div className="wv-sim-lines" role="log" aria-label="Call transcript">
        {L.map((l, i) => (
          <p key={i} className={`wv-sim-line is-${l.who} ${i < step ? 'is-on' : ''}`}>
            <b>{l.who === 'agent' ? 'AI agent' : 'Caller'}</b>
            {l.text}
          </p>
        ))}
      </div>
      <div className={`wv-sim-outcome ${step > L.length ? 'is-on' : ''}`}><span aria-hidden>✓</span> {demo.outcome}</div>
      <div className="wv-sim-foot">
        {demo.audio && (
          <>
            <audio ref={au} src={demo.audio} preload="none" onEnded={() => setPlaying(false)} />
            <button type="button" className="wv-sim-btn" onClick={toggle} aria-pressed={playing}>{playing ? 'Pause audio' : 'Play audio'}</button>
          </>
        )}
        {done && !reduce && <button type="button" className="wv-sim-replay" onClick={replay}>Replay</button>}
      </div>
    </div>
  )
}
