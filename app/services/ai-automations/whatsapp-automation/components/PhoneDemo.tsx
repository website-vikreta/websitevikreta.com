'use client'

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

const HOLD_MS = 3200

type MsgNode =
  | { t: 'typing'; ms: number }
  | { t: 'in';      ms: number; body: ReactNode; time: string }
  | { t: 'buttons'; ms: number }
  | { t: 'tap';     ms: number; which: 'yes' | 'no' }
  | { t: 'out';     ms: number; text: string; time: string }
  | { t: 'divider'; ms: number; text: string }
  | { t: 'status';  ms: number; text: string; tone: 'good' | 'bad' }

/* ── message bodies defined outside component — never recreated ── */
const orderCard: ReactNode = (
  <div>
    <p style={{ marginBottom: 6 }}>Hi Ananya, thanks for ordering from Kaya Wear.</p>
    <div style={{
      borderRadius: 8, background: 'rgba(0,0,0,0.05)',
      padding: '7px 10px', fontFamily: 'ui-monospace,monospace',
      fontSize: 12.5, lineHeight: 1.7, color: 'rgba(18,18,18,0.85)',
    }}>
      <div>Ribbed Cotton Top (M)</div>
      <div>Order #4127</div>
      <div style={{ fontWeight: 600 }}>₹1,299 · Cash on Delivery</div>
    </div>
    <p style={{ marginTop: 6 }}>Please confirm this order so we can ship it.</p>
  </div>
)

const reminderCard: ReactNode = (
  <p>Hi Ananya, we still haven&apos;t heard back on order #4127 (₹1,299). Please confirm so we can ship it today.</p>
)

const opening: MsgNode[] = [
  { t: 'typing',  ms: 750 },
  { t: 'in',      ms: 1150, body: orderCard, time: '10:42' },
  { t: 'buttons', ms: 850 },
]

const SCENARIOS = {
  confirm: {
    tab: 'They confirm',
    caption: 'Goes to dispatch like any other order. You do nothing.',
    nodes: [
      ...opening,
      { t: 'tap',    ms: 700, which: 'yes' } as MsgNode,
      { t: 'out',    ms: 750, text: 'Yes, ship it', time: '10:47' } as MsgNode,
      { t: 'status', ms: 800, text: "Confirmed. Moved to today's dispatch.", tone: 'good' } as MsgNode,
    ],
  },
  cancel: {
    tab: 'They cancel',
    caption: 'Order cancels itself in your store. Nothing gets packed.',
    nodes: [
      ...opening,
      { t: 'tap',    ms: 700, which: 'no' } as MsgNode,
      { t: 'out',    ms: 750, text: 'No, cancel', time: '10:47' } as MsgNode,
      { t: 'status', ms: 800, text: 'Cancelled in your store. ₹250 you did not spend.', tone: 'bad' } as MsgNode,
    ],
  },
  silent: {
    tab: 'No reply',
    caption: 'The one that saves you the most money.',
    nodes: [
      ...opening,
      { t: 'divider', ms: 900,  text: '3 hours later' } as MsgNode,
      { t: 'in',      ms: 1500, body: reminderCard, time: '13:42' } as MsgNode,
      { t: 'divider', ms: 950,  text: '24 hours later' } as MsgNode,
      { t: 'status',  ms: 850,  text: 'No reply. Order cancelled automatically.', tone: 'bad' } as MsgNode,
    ],
  },
} as const

type ScenarioKey = keyof typeof SCENARIOS
const KEYS = Object.keys(SCENARIOS) as ScenarioKey[]

/* ── Keyframes injected once at module level via a singleton style tag ── */
const STYLE_ID = 'wa-phone-demo-styles'
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const s = document.createElement('style')
  s.id = STYLE_ID
  s.textContent = `
    @keyframes waPop {
      from { opacity:0; transform:scale(0.93) translateY(7px); }
      to   { opacity:1; transform:scale(1) translateY(0); }
    }
    @keyframes waFade { from{opacity:0} to{opacity:1} }
    @keyframes waDot {
      0%,60%,100% { transform:translateY(0);   opacity:.35; }
      30%          { transform:translateY(-4px); opacity:1; }
    }
    .wa-pop  { animation: waPop  0.24s cubic-bezier(0.34,1.56,0.64,1) both; }
    .wa-fade { animation: waFade 0.32s ease both; }
    .wa-dot  { animation: waDot  1.2s  ease-in-out infinite; }
    @media (prefers-reduced-motion:reduce) {
      .wa-pop, .wa-fade { animation:none!important; opacity:1!important; }
    }
  `
  document.head.appendChild(s)
}

function Ticks() {
  return (
    <svg viewBox="0 0 16 11" width={16} height={11} style={{ flexShrink: 0, color: '#4fc3f7' }}>
      <path fill="currentColor" d="M11.07.65 5.4 6.32 3.6 4.5l-.9.9 2.7 2.7 6.57-6.57zM15.35.65 9.68 6.32l-.72-.72-.9.9 1.62 1.62L15.35 1.55z" />
      <path fill="currentColor" d="m.65 5.4 2.7 2.7.9-.9-2.7-2.7z" />
    </svg>
  )
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function PhoneDemo() {
  const [key, setKey]     = useState<ScenarioKey>('confirm')
  const [stage, setStage] = useState(0)
  const reduced           = useRef(false)
  const nodes             = SCENARIOS[key].nodes

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion:reduce)').matches
  }, [])

  /* reset on scenario change */
  useEffect(() => {
    setStage(reduced.current ? nodes.length : 0)
  }, [key, nodes.length])

  /* tick */
  useEffect(() => {
    if (reduced.current) return
    const step = nodes[stage]
    const wait = step ? step.ms : HOLD_MS
    const id   = window.setTimeout(() => setStage(s => s >= nodes.length ? 0 : s + 1), wait)
    return () => window.clearTimeout(id)
  }, [stage, nodes])

  const visible     = useMemo(() => nodes.slice(0, stage), [nodes, stage])
  const tapped      = visible.find(n => n.t === 'tap') as { which?: string } | undefined
  const buttonsShown = visible.some(n => n.t === 'buttons')

  /* ── shared style helpers ── */
  const bubble = (extra?: React.CSSProperties): React.CSSProperties => ({
    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
    ...extra,
  })

  return (
    <div style={{ width: '100%' }}>

      {/* ── Scenario tabs ── */}
      <div
        role="tablist"
        aria-label="What the customer does"
        style={{
          display: 'flex',
          maxWidth: 340,
          margin: '0 auto 20px',
          borderRadius: 999,
          border: '1px solid var(--color-border)',
          background: 'var(--color-bg-muted)',
          padding: 4,
        }}
      >
        {KEYS.map(k => (
          <button
            key={k}
            role="tab"
            aria-selected={key === k}
            onClick={() => setKey(k)}
            style={{
              flex: 1, borderRadius: 999, padding: '8px 6px',
              fontSize: 12.5, fontWeight: 600, letterSpacing: '-0.01em',
              border: 'none', cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
              background: key === k ? 'var(--color-text)' : 'transparent',
              color:      key === k ? '#fff' : 'var(--color-text-muted)',
            }}
          >
            {SCENARIOS[k].tab}
          </button>
        ))}
      </div>

      {/* ── Phone shell ── */}
      <div style={{ maxWidth: 330, width: '100%', margin: '0 auto' }}>
        <div style={{
          borderRadius: '2.4rem',
          border: '1px solid rgba(0,0,0,0.1)',
          background: '#1a1a1a',
          padding: 10,
          boxShadow: '0 40px 80px -30px rgba(20,18,15,0.45), 0 0 0 1px rgba(255,255,255,0.05) inset',
        }}>
          <div style={{ overflow: 'hidden', borderRadius: '1.9rem', background: '#efe7de' }}>

            {/* status bar */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: '#008069', padding: '10px 16px 4px',
              fontFamily: 'ui-monospace,monospace', fontSize: 10.5, color: 'rgba(255,255,255,0.9)',
            }}>
              <span>9:41</span>
              <span style={{ display:'flex', alignItems:'center', gap: 3 }}>
                {[8,10,12].map((h,i) => (
                  <span key={i} style={{ display:'inline-block', height: h, width: 3, borderRadius: 2, background: i<2 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)' }} />
                ))}
                <span style={{ marginLeft: 4, display:'inline-block', height: 10, width: 20, borderRadius: 3, border:'1px solid rgba(255,255,255,0.5)' }} />
              </span>
            </div>

            {/* chat header */}
            <div style={{ display:'flex', alignItems:'center', gap:10, background:'#008069', padding:'0 12px 10px', color:'#fff' }}>
              <svg viewBox="0 0 24 24" width={16} height={16} style={{ flexShrink:0, opacity:0.9 }}>
                <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"/>
              </svg>
              <span style={{ display:'grid', height:32, width:32, flexShrink:0, placeItems:'center', borderRadius:'50%', background:'#c9a227', fontSize:13, fontWeight:700, color:'#fff' }}>K</span>
              <span style={{ minWidth:0 }}>
                <span style={{ display:'block', fontSize:13.5, fontWeight:600, lineHeight:1.2 }}>Kaya Wear</span>
                <span style={{ display:'block', fontSize:10.5, lineHeight:1.2, color:'rgba(255,255,255,0.7)' }}>Business account</span>
              </span>
            </div>

            {/* messages */}
            <div style={{
              position:'relative', display:'flex', flexDirection:'column',
              justifyContent:'flex-end', gap:6,
              height: 452, overflow:'hidden', padding: '12px 12px 14px',
            }}>
              {/* top fade */}
              <span aria-hidden style={{
                pointerEvents:'none', position:'absolute', inset:'0 0 auto 0',
                height: 36, zIndex:10,
                background:'linear-gradient(to bottom, #efe7de, transparent)',
              }} />

              {visible.map((node, i) => {
                const isLast = i === visible.length - 1

                if (node.t === 'typing') {
                  if (!isLast) return null
                  return (
                    <div key={i} className="wa-pop" style={bubble({ display:'flex', alignItems:'center', gap:4, width:'fit-content', borderRadius:'16px 16px 16px 4px', background:'#fff', padding:'12px 14px' })}>
                      {[0,1,2].map(d => <span key={d} className="wa-dot" style={{ display:'inline-block', height:6, width:6, borderRadius:'50%', background:'#b0a89a', animationDelay:`${d*0.16}s` }} />)}
                    </div>
                  )
                }

                if (node.t === 'in') {
                  return (
                    <div key={i} className="wa-pop" style={bubble({ maxWidth:'85%', borderRadius:'16px 16px 16px 4px', background:'#fff', padding:'10px 12px', fontSize:13.5, lineHeight:1.5, color:'#121212' })}>
                      {node.body}
                      <span style={{ display:'block', textAlign:'right', fontFamily:'ui-monospace,monospace', fontSize:10, color:'#a09890', marginTop:4 }}>{node.time}</span>
                    </div>
                  )
                }

                if (node.t === 'buttons') {
                  return (
                    <div key={i} style={{ maxWidth:'85%', display:'flex', flexDirection:'column', gap:4 }}>
                      {(['yes','no'] as const).map((id, bi) => {
                        const label   = id === 'yes' ? 'Yes, ship it' : 'No, cancel'
                        const isTapped = tapped?.which === id
                        const anyTapped = Boolean(tapped)
                        return (
                          <div key={id} className="wa-pop" style={bubble({ borderRadius:8, background:'#fff', textAlign:'center', animationDelay:`${bi*90}ms` })}>
                            <div style={{
                              padding:'10px 12px', fontSize:13.5, fontWeight:500,
                              color:  isTapped ? '#008069' : anyTapped ? '#c0b8b0' : '#027eb5',
                              background: isTapped ? 'rgba(0,128,105,0.1)' : 'transparent',
                              transition: 'all 0.3s',
                            }}>{label}</div>
                          </div>
                        )
                      })}
                    </div>
                  )
                }

                if (node.t === 'out') {
                  return (
                    <div key={i} className="wa-pop" style={bubble({ display:'flex', alignItems:'flex-end', gap:6, marginLeft:'auto', maxWidth:'80%', borderRadius:'16px 16px 4px 16px', background:'#d9fdd3', padding:'8px 12px', fontSize:13.5, color:'#121212' })}>
                      <span>{node.text}</span>
                      <span style={{ display:'flex', flexShrink:0, alignItems:'center', gap:2, paddingBottom:1, fontFamily:'ui-monospace,monospace', fontSize:10, color:'#a09890' }}>
                        {node.time}<Ticks />
                      </span>
                    </div>
                  )
                }

                if (node.t === 'divider') {
                  return (
                    <div key={i} className="wa-fade" style={{ margin:'2px auto', borderRadius:999, background:'rgba(0,0,0,0.07)', padding:'4px 12px', fontFamily:'ui-monospace,monospace', fontSize:10.5, letterSpacing:'0.04em', color:'rgba(18,18,18,0.5)' }}>
                      {node.text}
                    </div>
                  )
                }

                if (node.t === 'status') {
                  return (
                    <div key={i} className="wa-pop" style={{ display:'flex', alignItems:'center', gap:8, marginTop:4, borderRadius:12, padding:'10px 12px', fontSize:12.5, fontWeight:600, lineHeight:1.3, background: node.tone === 'good' ? '#1a8a5a' : '#1a1a1a', color:'#fff' }}>
                      <span style={{ flexShrink:0, fontFamily:'ui-monospace,monospace', fontSize:10, fontWeight:400, textTransform:'uppercase', letterSpacing:'0.12em', opacity:0.6 }}>store</span>
                      {node.text}
                    </div>
                  )
                }

                return null
              })}
            </div>
          </div>
        </div>

        {/* caption */}
        <p key={key} className="wa-fade" style={{ marginTop:16, textAlign:'center', maxWidth:300, marginInline:'auto', fontSize:13, lineHeight:1.5, color:'var(--color-text-muted)' }}>
          {SCENARIOS[key].caption}
        </p>
        <p style={{ marginTop:6, textAlign:'center', maxWidth:300, marginInline:'auto', fontFamily:'ui-monospace,monospace', fontSize:10.5, lineHeight:1.5, color:'var(--color-text-faint)' }}>
          Example message. Your store&apos;s name, product and order number.
        </p>
      </div>

      <span className="sr-only" aria-live="off">
        {buttonsShown ? 'Two reply buttons: Yes, ship it. No, cancel.' : ''}
      </span>
    </div>
  )
}
