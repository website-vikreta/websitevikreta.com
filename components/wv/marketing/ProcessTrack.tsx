'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { KineticTitle, Reveal } from '../ui'

/** Pillar process: the same pinned, scroll-driven horizontal track the homepage
 * uses for "How we work". Vertical scrolling moves the steps sideways so the
 * previous step stays in view while the next one arrives; a rail tracks progress.
 * On mobile and for reduced motion it is a plain vertical stack. */

const STEPS = [
  { n: '01', t: 'Audit', d: 'We pull your current rankings, traffic and lead numbers, and find what is actually costing you conversions.' },
  { n: '02', t: 'Plan', d: 'One growth plan across SEO, AEO/GEO and content, so the channels reinforce each other instead of fighting for budget.' },
  { n: '03', t: 'Run', d: 'We ship content, fix technical SEO and publish in stages, reporting on leads and revenue, not vanity numbers.' },
  { n: '04', t: 'Compound', d: 'SEO and content keep paying off after launch. We tune what works and cut what does not.' },
]

function useDesktop(q = '(min-width: 960px)') {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const update = () => setOn(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [q])
  return on
}

export function ProcessTrack() {
  const desktop = useDesktop()
  const reduce = useReducedMotion()
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [dist, setDist] = useState(0)

  useEffect(() => {
    const measure = () => {
      const el = track.current
      if (el) setDist(Math.max(0, el.scrollWidth - window.innerWidth + 48))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [desktop])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist])
  const pinned = desktop && !reduce

  return (
    <section ref={section} id="how-we-work" className={`mk-proc${pinned ? ' is-pinned' : ''}`}>
      <div className="mk-proc-sticky">
        <div className="wv-wrap mk-proc-head">
          <KineticTitle lines={['How we', 'work']} accent={1} className="wv-h2" />
          <p>Four steps, the same on every engagement. Scroll to move through them.</p>
        </div>
        <motion.div ref={track} className="mk-proc-track" style={pinned ? { x } : undefined}>
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={pinned ? 0 : 0.05 * i} className="mk-proc-step">
              <span className="mk-proc-n">{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <span className="mk-proc-line" aria-hidden />
            </Reveal>
          ))}
          <div className="mk-proc-step is-visual" aria-hidden>
            <span className="mk-proc-vlabel">What compounds</span>
            <div className="mk-proc-chart">
              <i style={{ height: '30%' }} /><i style={{ height: '46%' }} /><i style={{ height: '62%' }} /><i style={{ height: '82%' }} />
            </div>
            <p>Rankings → Citations → Leads. The work keeps paying after launch.</p>
          </div>
        </motion.div>
        {pinned && (
          <div className="wv-wrap">
            <div className="mk-proc-rail"><motion.i style={{ scaleX: scrollYProgress }} /></div>
          </div>
        )}
      </div>
    </section>
  )
}
