'use client'
import { AnimatePresence, motion } from 'motion/react'
import { ease } from '../../ui'
import { HeroCopy } from '../HeroCopy'
import { Lg, heroCopy, useStage, type HeroProps } from './VoiceHero'
import './heroes-b.css'

const ITEMS: [string, number][] = [['Dispatch dashboard, milestone 2', 3200], ['Hosting and setup', 450], ['Support retainer', 950]]
const usd = (n: number) => '$' + Math.round(n).toLocaleString('en-US')

export default function FinanceHero({ branch, product }: HeroProps) {
  const build = product?.slug === 'invoice-automation'
  const pill = build ? ['Job done', 'Drafted', 'Posted to books', 'Sent'] : ['Sent', 'Reminder 1 · +3d', 'Reminder 2 · +7d', 'PAID']
  const feed = build
    ? [['Job marked done', 'qb'], ['Invoice drafted', 'inv'], ['Posted to QuickBooks', 'qb'], ['Sent with pay link', 'mail']]
    : [['Invoice emailed · Day 0', 'mail'], ['Email nudge · +3 days', 'mail'], ['WhatsApp nudge · +7 days', 'whatsapp'], ['Paid by card · Stripe', 'stripe']]
  const at = [800, 3000, 5200, 7400]
  const { ref, t, reduce } = useStage(8600, at[1])
  const step = at.filter((a) => t >= a).length - 1
  const paid = !build && step === 3
  const OUT = 18400
  const k = Math.min(1, Math.max(0, (t - at[3]) / 900))
  const out = paid ? OUT - 4600 * (reduce ? 1 : 1 - Math.pow(1 - k, 3)) : OUT
  const cp = heroCopy(branch, product)
  const key = ['qb', 'inv', 'mail']
  return (
    <section ref={ref} className="hb-hero">
      <div className="wv-grid-bg" aria-hidden />
      <div className="wv-wrap hb-in">
        <div className="hb-copy"><HeroCopy {...cp} /></div>
        <div className="hb-stage hb-fin" aria-hidden>
          <div className="hb-card hb-inv">
            <div className="hb-inv-top">
              <div><b>INV-1042</b><small>Northwind Studio</small></div>
              <span className="hb-logos"><Lg k="quickbooks" s={22} /><Lg k="stripe" s={22} /></span>
            </div>
            <ul>
              {ITEMS.map(([n, v]) => <li key={n}><span>{n}</span><b>{usd(v)}</b></li>)}
            </ul>
            <div className="hb-inv-foot">
              <span className="hb-total">Total <b>{usd(4600)}</b></span>
              <div className="hb-pillbox">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span key={Math.max(step, 0)} className={`hb-pill ${step === 3 ? 'is-paid' : ''}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={reduce ? { duration: 0 } : { duration: 0.4, ease }}>
                    {pill[Math.max(step, 0)]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            {!build && (
              <motion.div className="hb-stamp" initial={false} animate={{ opacity: paid ? 1 : 0, scale: paid ? 1 : 2.2, rotate: paid ? -12 : 4 }} transition={{ duration: 0.45, ease }}>PAID</motion.div>
            )}
          </div>
          <div className="hb-card hb-out">
            <small>Outstanding</small>
            <b>{usd(out)}</b>
          </div>
          <ol className="hb-feed">
            {feed.map(([label, ic], i) => (
              <motion.li key={label} initial={false} animate={{ opacity: step >= i ? 1 : 0, x: step >= i ? 0 : 24 }} transition={{ duration: 0.5, ease }}>
                {key.includes(ic) ? <span className="hb-dotm">{ic === 'mail' ? '@' : ic === 'inv' ? '#' : '✓'}</span> : <Lg k={ic} s={20} />}
                {label}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
