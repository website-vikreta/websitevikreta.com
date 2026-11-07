'use client'
import type { Demo } from '@/content/ai-automations/types'
import { useSim, initials } from './useSim'

type D = Extract<Demo, { kind: 'chat' }>
const P: Record<string, string> = { meher: 'Meher', ira: 'Ira', arjun: 'Arjun' }
const CH: Record<D['channel'], string> = { whatsapp: 'WhatsApp', sms: 'SMS', web: 'Website chat', team: 'Team channel' }

export function ChatSim({ demo }: { demo: D }) {
  const m = demo.messages
  const team = demo.channel === 'team'
  const { ref, step, done, reduce, replay } = useSim(m.length, 1100)
  const isAi = (f: string) => f in P
  const side = (f: string) => (team ? 'in' : f === 'user' ? 'out' : 'in')
  const avatar = (f: string) =>
    isAi(f) ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img className="wv-sim-av" src={`/wv/personas/${f}-front.webp`} alt="" width={32} height={32} />
    ) : (
      <span className="wv-sim-av wv-sim-av-i" aria-hidden>{f === 'user' ? 'U' : initials(f)}</span>
    )
  const name = (f: string) => (isAi(f) ? `${P[f]} · AI` : f === 'user' ? 'Customer' : f)

  return (
    <div ref={ref} className={`wv-sim wv-sim-chat is-${demo.channel}`}>
      <div className="wv-sim-bar">
        <span className="wv-sim-title">{demo.title}</span>
        <span className="wv-sim-tag">{CH[demo.channel]}</span>
      </div>
      <div className="wv-sim-thread" role="log" aria-label={demo.title} style={{ ['--n' as string]: m.length }}>
        {m.map((x, i) => {
          const on = i < step
          const typing = i === step && !reduce
          return (
            <div key={i} className={`wv-sim-msg is-${side(x.from)} ${on ? 'is-on' : ''}`}>
              {team || x.from !== 'user' ? avatar(x.from) : null}
              <div className="wv-sim-col">
                {team && <span className="wv-sim-who">{name(x.from)}</span>}
                <p className="wv-sim-bub">{x.text}</p>
                {x.attachment && (
                  <div className={`wv-sim-att is-${x.attachment.kind}`}>
                    <span className="wv-sim-att-ic" aria-hidden>{x.attachment.kind === 'pdf' ? 'PDF' : x.attachment.kind === 'image' ? 'IMG' : '+'}</span>
                    <span className="wv-sim-att-t"><b>{x.attachment.label}</b>{x.attachment.meta && <i>{x.attachment.meta}</i>}</span>
                  </div>
                )}
              </div>
              {typing && (
                <div className="wv-sim-typing" aria-hidden><span /><span /><span /></div>
              )}
            </div>
          )
        })}
      </div>
      {done && !reduce && <button type="button" className="wv-sim-replay" onClick={replay}>Replay</button>}
    </div>
  )
}
