'use client'

import '@/app/wv.css'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { geoGraticule, geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Objects, Topology } from 'topojson-specification'
import type { FeatureCollection, Geometry } from 'geojson'
import { wvFonts } from './fonts'
import { Arrow, KineticTitle, Magnetic, Reveal, ease } from './ui'

/** Client volume by market, relative (owner-ranked, not counts). Pune is home base. */
const MARKETS = [
  { id: 'us', name: 'United States', c: [-98, 39], v: 1 },
  { id: 'uk', name: 'United Kingdom', c: [-1.5, 52.5], v: 0.8 },
  { id: 'au', name: 'Australia', c: [134, -25.5], v: 0.74 },
  { id: 'ca', name: 'Canada', c: [-96, 56], v: 0.7 },
  { id: 'nz', name: 'New Zealand', c: [172.5, -41.5], v: 0.52 },
  { id: 'in', name: 'India', c: [73.86, 18.52], v: 0.66, home: true },
  { id: 'ch', name: 'Switzerland', c: [8.2, 46.8], v: 0.26 },
  { id: 'sg', name: 'Singapore', c: [103.82, 1.35], v: 0.24 },
] as const

let world: FeatureCollection<Geometry> | null = null

function useWorld() {
  const [w, setW] = useState(world)
  useEffect(() => {
    if (world) return
    let live = true
    fetch('/data/countries-110m.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((topo: Topology<Objects>) => {
        const fc = feature(topo, topo.objects.countries) as FeatureCollection<Geometry>
        world = { ...fc, features: fc.features.filter((f) => f.id !== '010') }
        if (live) setW(world)
      })
      .catch(() => {}) // map is decoration; CTA still works without it
    return () => {
      live = false
    }
  }, [])
  return w
}

function MapArt() {
  const w = useWorld()
  const reduce = useReducedMotion()
  const art = useMemo(() => {
    const proj = geoNaturalEarth1().rotate([-22, 0, 0]).scale(205).translate([600, 330])
    const path = geoPath(proj)
    const pts = MARKETS.map((m) => ({ ...m, p: proj(m.c as unknown as [number, number]) ?? [0, 0] }))
    const home = pts.find((m) => 'home' in m)!.p
    const arcs = pts
      .filter((m) => !('home' in m))
      .map((m, i) => {
        const [x1, y1] = home
        const [x2, y2] = m.p
        const dx = x2 - x1
        const apex = Math.min(Math.max(Math.hypot(dx, y2 - y1) * 0.38, 40), 150)
        const top = Math.min(y1, y2) - apex
        return { id: m.id, i, d: `M${x1} ${y1}C${(x1 + dx * 0.25).toFixed(1)} ${top.toFixed(1)} ${(x1 + dx * 0.75).toFixed(1)} ${top.toFixed(1)} ${x2} ${y2}` }
      })
    return {
      grid: path(geoGraticule().step([30, 20])()) ?? '',
      land: w ? w.features.map((f) => path(f) ?? '').filter(Boolean) : [],
      pts,
      arcs,
    }
  }, [w])

  const t = (delay: number, duration = 1.4) => (reduce ? { duration: 0 } : { duration, ease, delay })
  const vp = { once: true, margin: '-15% 0px' } as const

  return (
    <svg className="wv-mcta-map" viewBox="0 0 1200 580" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <path d={art.grid} className="wv-mcta-grid" />
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: art.land.length ? 1 : 0 }} transition={t(0, 0.9)}>
        {art.land.map((d, i) => (
          <path key={i} d={d} className="wv-mcta-land" />
        ))}
      </motion.g>

      {art.pts.map((m, i) => (
        <motion.g key={m.id} style={{ x: m.p[0], y: m.p[1] }} initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={vp} transition={t(0.1 + i * 0.08, 1)}>
          <circle r={10 + m.v * 38} className="wv-mcta-vol" style={{ animationDelay: `${-i * 0.7}s` }} />
          {m.v >= 0.5 && <circle r={10 + m.v * 38} className="wv-mcta-ring" style={{ animationDelay: `${-i * 0.9}s` }} />}
        </motion.g>
      ))}

      {art.arcs.map((a) => (
        <g key={a.id}>
          <motion.path d={a.d} className="wv-mcta-arc" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={vp} transition={t(0.5 + a.i * 0.12)} />
          <path d={a.d} className="wv-mcta-flow" style={{ animationDelay: `${-a.i * 0.4}s` }} />
          <circle r="3.2" className="wv-mcta-comet">
            <animateMotion dur={`${3.2 + (a.i % 3) * 0.7}s`} begin={`${a.i * 0.45}s`} repeatCount="indefinite" path={a.d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.55 1" />
          </circle>
        </g>
      ))}

      {art.pts.map((m, i) => (
        <motion.g key={`h-${m.id}`} style={{ x: m.p[0], y: m.p[1] }} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={vp} transition={t(0.8 + i * 0.05, 0.6)}>
          <circle r={'home' in m ? 6 : 4.2} className="wv-mcta-hub" />
          <circle r={'home' in m ? 2.6 : 1.7} className="wv-mcta-core" />
        </motion.g>
      ))}
    </svg>
  )
}

export function MapCta() {
  return (
    <div className={`wv wv-shell ${wvFonts}`}>
      <section className="wv-mcta" aria-labelledby="wv-mcta-h">
        <MapArt />
        <div className="wv-wrap wv-mcta-in">
          <div id="wv-mcta-h">
            <KineticTitle lines={['Ready when', 'you are']} accent={1} className="wv-h2" />
          </div>
          <Reveal delay={0.15}>
            <p className="wv-mcta-lead">
              Free call, no commitment. Wherever you are, tell us what you&apos;re building and we&apos;ll tell you what
              we&apos;d actually do about it.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="wv-cta-row is-center">
            <Magnetic>
              <Link href="/contact" className="wv-btn wv-btn-y">
                Book a call <Arrow />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
