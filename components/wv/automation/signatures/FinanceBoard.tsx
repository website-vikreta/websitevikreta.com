'use client'
import { motion } from 'motion/react'
import type { Branch } from '@/content/ai-automations/types'
import { Logo, useClock } from './kit-b'

const COLS = ['Overdue 30+', 'Reminded', 'Promised', 'Paid']
// [client, amount, ms when it enters Reminded, Promised, Paid] (0 = never)
const INV: [string, number, number, number, number][] = [
  ['Northwind Studio', 4600, 1000, 3400, 6600],
  ['Harbor & Pine', 2150, 1600, 4200, 7400],
  ['Lumen Dental', 1280, 2200, 0, 8200],
  ['Cedar Row Realty', 6900, 2800, 5000, 0],
  ['Tidewater Foods', 3400, 3600, 5800, 8800],
  ['Orbit Fitness', 890, 4200, 0, 0],
]
const END = 10000
const usd = (n: number) => '$' + n.toLocaleString('en-US')
const colOf = (r: (typeof INV)[number], t: number) => (r[4] && t >= r[4] ? 3 : r[3] && t >= r[3] ? 2 : t >= r[2] ? 1 : 0)

export default function FinanceBoard({ branch }: { branch: Branch }) {
  void branch
  const { ref, t, running, play } = useClock(END)
  const cols = INV.map((r) => colOf(r, t))
  const sum = (c: number) => INV.reduce((a, r, i) => a + (cols[i] === c ? r[1] : 0), 0)
  const open = INV.reduce((a, r, i) => a + (cols[i] < 3 ? r[1] : 0), 0)
  return (
    <section ref={ref} className="sb-sec" aria-labelledby="sb-fin-h">
      <div className="wv-wrap">
        <div className="sb-row">
          <div>
            <h2 id="sb-fin-h" className="wv-h2 wv-ax-h2">Watch cash come in</h2>
            <p className="sb-lede">Six overdue invoices. Reminders go out on schedule, promises get logged, payments post to your books.</p>
          </div>
          <button type="button" className="sb-replay" onClick={play} disabled={running}>{running ? 'Chasing…' : '↻ Replay'}</button>
        </div>
        <div className="sb-board">
          <div className="sb-tot">
            <div><small>Still outstanding</small><b>{usd(open)}</b></div>
            <div className="is-paid"><small>Collected</small><b>{usd(sum(3))}</b></div>
            <span className="sb-tot-l"><Logo k="quickbooks" s={26} /><Logo k="stripe" s={26} /></span>
          </div>
          <div className="sb-cols">
            {COLS.map((name, c) => (
              <div key={name} className={`sb-col ${c === 3 ? 'is-paid' : ''}`}>
                <h3>{name}<span>{cols.filter((x) => x === c).length}</span></h3>
                <div className="sb-cards">
                  {INV.map((r, i) => cols[i] === c && (
                    <motion.div key={r[0]} layoutId={`inv-${r[0]}`} layout="position" className="sb-inv" transition={{ type: 'spring', stiffness: 220, damping: 28 }}>
                      <b>{r[0]}</b><span>{usd(r[1])}</span>
                      {c === 3 && <i aria-hidden>✓</i>}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="sb-note">Sample data: fictional clients and amounts. Payments post to your books automatically.</p>
      </div>
    </section>
  )
}
