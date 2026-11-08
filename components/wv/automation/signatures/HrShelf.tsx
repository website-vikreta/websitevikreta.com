'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import type { Branch } from '@/content/ai-automations/types'
import { Arrow, KineticTitle } from '../../ui'
import { prefillLead } from '../LeadForm'
import './sig-a.css'

type DocId = 'offer' | 'nda' | 'onboard' | 'done'
type Doc = { id: DocId; name: string; slug: string; line: string }
const DOCS: Doc[] = [
  { id: 'offer', name: 'Offer letter', slug: 'offer-letter-automation', line: 'Filled from one message, approved by you, out for e-sign in minutes.' },
  { id: 'nda', name: 'Contractor NDA', slug: 'contractor-nda-and-contracts', line: 'Parties, dates and scope filled in. Sent, signed, filed.' },
  { id: 'onboard', name: 'Onboarding pack', slug: 'employee-onboarding-automation', line: 'Welcome note, checklist and first-week plan, ready on day one.' },
  { id: 'done', name: 'Completion letter', slug: 'completion-letters', line: 'Made and emailed on the end date, with no reminder needed.' },
]

const Sig = ({ ink = '#1d3fa8' }: { ink?: string }) => (
  <svg className="sg-sig" viewBox="0 0 150 50" aria-hidden>
    <path d="M4 34c8-22 14-30 18-26 5 5-8 30-4 32 6 2 12-22 20-22 5 0 0 20 6 20 8 0 10-12 18-12 4 0 2 8 8 8 7 0 12-8 22-14 8-5 14-6 18-2" style={{ stroke: ink }} />
  </svg>
)

function Paper({ id }: { id: DocId }) {
  return (
    <div className="sg-paper" aria-hidden>
      <div className="sg-pi">
        <div className="sg-lh"><i className="sg-mk" /><b>Northwind Studio</b><span>{id === 'offer' ? 'Offer' : id === 'nda' ? 'Legal' : id === 'onboard' ? 'People' : 'Certificate'}</span></div>
        {id === 'offer' && (
          <>
            <h4>Offer of employment</h4>
            <p>Dear Neel,</p>
            <p>We are pleased to offer you the role of Frontend Developer, starting on 1 December.</p>
            <dl><div><dt>Role</dt><dd>Frontend Developer</dd></div><div><dt>Start date</dt><dd>1 Dec</dd></div><div><dt>Type</dt><dd>Full-time</dd></div><div><dt>Reports to</dt><dd>Priya Rao</dd></div></dl>
            <p>Please sign below to accept. We look forward to having you on the team.</p>
            <div className="sg-sg"><Sig /><span>Priya Rao<br />Founder</span></div>
          </>
        )}
        {id === 'nda' && (
          <>
            <h4>Mutual NDA</h4>
            <dl><div><dt>Party A</dt><dd>Northwind Studio</dd></div><div><dt>Party B</dt><dd>Aarav Mehta</dd></div></dl>
            <ol><li>Confidential information covers client lists, pricing and source files.</li><li>Neither party shares it without written consent.</li><li>This agreement runs for 2 years from signing.</li></ol>
            <div className="sg-sg2"><div><Sig /><span>Priya Rao</span></div><div><Sig ink="#0e7a3d" /><span>Aarav Mehta</span></div></div>
          </>
        )}
        {id === 'onboard' && (
          <>
            <h4>Welcome, Aarav</h4>
            <p>Your first week at Northwind Studio.</p>
            <ul className="sg-ck">
              <li className="is-d">Welcome email sent</li><li className="is-d">Slack and Drive access</li><li className="is-d">Laptop and logins ready</li><li>Day 1 intro with Priya</li><li>30-day plan reviewed</li>
            </ul>
            <p className="sg-sm">Day 1 · Mon 1 Dec · 10:00</p>
          </>
        )}
        {id === 'done' && (
          <div className="sg-cert">
            <h4>Certificate of completion</h4>
            <p>This certifies that</p>
            <strong>Aarav Mehta</strong>
            <p>completed a 3-month design internship at Northwind Studio, ending 28 Feb.</p>
            <span className="sg-seal" />
            <div className="sg-sg"><Sig /><span>Priya Rao<br />Founder</span></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function HrShelf({ branch }: { branch: Branch }) {
  const dlg = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<Doc>(DOCS[0])
  const target = (d: Doc) => {
    const p = branch.products.find((x) => x.slug === d.slug)
    return { p, href: p?.page ? `/services/ai-automations/${branch.slug}/${p.slug}` : null, interest: p?.name ?? d.name }
  }
  const t = target(open)
  return (
    <section className="wv-sec" id="shelf">
      <div className="wv-wrap">
        <div className="wv-sec-head">
          <KineticTitle lines={['The paperwork', 'writes itself.']} className="wv-h2" accent={1} />
          <div className="wv-sec-aside"><p>Four documents the HR automation drafts, fills and files for you. Open one to see the sample.</p></div>
        </div>

        <ul className="sg-shelf">
          {DOCS.map((d, i) => (
            <li key={d.id} style={{ ['--r' as string]: `${[-3, -1, 1.5, 3.5][i]}deg`, ['--y' as string]: `${[6, 0, 4, 10][i]}px` }}>
              <button type="button" className="sg-doc" onClick={() => { setOpen(d); dlg.current?.showModal() }} aria-haspopup="dialog">
                <Paper id={d.id} />
                <span className="sg-doc-n">{d.name}</span>
                <span className="sg-doc-l">{d.line}</span>
                <span className="sg-doc-go">Preview <Arrow size={13} /></span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <dialog
        ref={dlg}
        className="sg-dlg"
        aria-labelledby="sg-dlg-t"
        onClick={(e) => { if (e.target === dlg.current) dlg.current?.close() }}
      >
        <button type="button" className="sg-x" aria-label="Close preview" onClick={() => dlg.current?.close()}>&times;</button>
        <div className="sg-dlg-in">
          <Paper id={open.id} />
          <div className="sg-dlg-t">
            <h3 id="sg-dlg-t">{open.name}</h3>
            <p>{open.line}</p>
            <p className="sg-sm">Sample document with made-up details.</p>
            {t.href ? (
              <Link href={t.href} className="wv-btn wv-btn-y" onClick={() => dlg.current?.close()}>See how it runs <Arrow size={15} /></Link>
            ) : (
              <a
                href={`?interest=${encodeURIComponent(t.interest)}#lead`}
                className="wv-btn wv-btn-y"
                onClick={(e) => { e.preventDefault(); dlg.current?.close(); prefillLead(t.interest) }}
              >
                Get this built <Arrow size={15} />
              </a>
            )}
          </div>
        </div>
      </dialog>
    </section>
  )
}
