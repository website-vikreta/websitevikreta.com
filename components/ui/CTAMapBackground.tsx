'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, Objects } from 'topojson-specification'
import type { FeatureCollection, Geometry } from 'geojson'

interface CountriesTopology extends Topology<Objects> {
  objects: {
    countries: Objects[string]
  }
}

// Global client hubs
const ALL_HUBS = [
  { id: 'la', name: 'Archmodal (Los Angeles)', coords: [-118.2437, 34.0522] as [number, number], isMajor: true },
  { id: 'dallas', name: 'Cozmo Realty (Dallas)', coords: [-96.7970, 32.7767] as [number, number], isMajor: false },
  { id: 'chicago', name: 'Champion Lenders (Chicago)', coords: [-87.6298, 41.8781] as [number, number], isMajor: false },
  { id: 'toronto', name: 'Simpli Home (Toronto)', coords: [-79.3832, 43.6532] as [number, number], isMajor: true },
  { id: 'montreal', name: 'Elevagechiotspug (Montreal)', coords: [-71.8, 46.8] as [number, number], isMajor: false },
  { id: 'manchester', name: 'AP CleanCo (Manchester)', coords: [-2.2426, 53.4808] as [number, number], isMajor: false },
  { id: 'zurich', name: 'Sustainable Bitcoin Protocol (Zurich)', coords: [8.5417, 47.3769] as [number, number], isMajor: true },
  { id: 'delhi', name: 'Katalyst Consulting (New Delhi)', coords: [77.2090, 28.6139] as [number, number], isMajor: false },
  { id: 'mumbai', name: 'Earth by Blancora (Mumbai)', coords: [70.5, 20.5] as [number, number], isMajor: false },
  { id: 'pune', name: 'Tocal & MetaThumbz (Pune)', coords: [73.8567, 18.5204] as [number, number], isMajor: true },
  { id: 'bengaluru', name: 'JAXL (Bengaluru)', coords: [77.5946, 12.9716] as [number, number], isMajor: false },
  { id: 'singapore', name: 'Global Asia Node (Singapore)', coords: [103.8198, 1.3521] as [number, number], isMajor: true },
]

const ALL_LINKS: [string, string][] = [
  ['la', 'toronto'],
  ['la', 'dallas'],
  ['dallas', 'chicago'],
  ['chicago', 'toronto'],
  ['toronto', 'montreal'],
  ['toronto', 'zurich'],
  ['montreal', 'manchester'],
  ['manchester', 'zurich'],
  ['zurich', 'delhi'],
  ['delhi', 'pune'],
  ['mumbai', 'pune'],
  ['pune', 'bengaluru'],
  ['pune', 'singapore'],
  ['la', 'zurich'],
]

// West Region (Americas & Western Europe)
const WEST_HUB_IDS = new Set(['la', 'dallas', 'chicago', 'toronto', 'montreal', 'manchester', 'zurich'])
const WEST_LINKS: [string, string][] = [
  ['la', 'toronto'],
  ['la', 'dallas'],
  ['dallas', 'chicago'],
  ['chicago', 'toronto'],
  ['toronto', 'montreal'],
  ['toronto', 'zurich'],
  ['montreal', 'manchester'],
  ['manchester', 'zurich'],
  ['la', 'zurich'],
]

// East Region (Europe, India & Asia-Pacific)
const EAST_HUB_IDS = new Set(['zurich', 'delhi', 'mumbai', 'pune', 'bengaluru', 'singapore'])
const EAST_LINKS: [string, string][] = [
  ['zurich', 'delhi'],
  ['delhi', 'pune'],
  ['mumbai', 'pune'],
  ['pune', 'bengaluru'],
  ['pune', 'singapore'],
]

// Module-level in-memory cache
let cachedWorldData: FeatureCollection<Geometry> | null = null

interface CTAMapBackgroundProps {
  variant?: 'desktop' | 'mobile'
}

export function CTAMapBackground({ variant = 'desktop' }: CTAMapBackgroundProps) {
  const [worldData, setWorldData] = useState<FeatureCollection<Geometry> | null>(() => cachedWorldData)
  const [activeRegion, setActiveRegion] = useState<'west' | 'east'>('west')
  const [userInteracted, setUserInteracted] = useState(false)

  // Fetch world data once
  useEffect(() => {
    if (cachedWorldData) {
      if (!worldData) setWorldData(cachedWorldData)
      return
    }

    let isMounted = true
    fetch('/data/countries-110m.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((topology: CountriesTopology) => {
        if (!isMounted) return
        const countries = feature(topology, topology.objects.countries) as FeatureCollection<Geometry>
        const inhabited = {
          ...countries,
          features: countries.features.filter((f) => f.id !== '010'),
        }
        cachedWorldData = inhabited
        setWorldData(inhabited)
      })
      .catch((err) => {
        console.warn('Map background unavailable, continuing with flat CTA:', err)
      })
    return () => {
      isMounted = false
    }
  }, [worldData])

  // Mobile auto-cycle between West and East maps every 4.5 seconds
  useEffect(() => {
    if (variant !== 'mobile') return

    const interval = setInterval(() => {
      setActiveRegion((prev) => (prev === 'west' ? 'east' : 'west'))
    }, userInteracted ? 8000 : 4500)

    return () => clearInterval(interval)
  }, [variant, userInteracted])

  // Desktop Projection & Elements
  const desktopData = useMemo(() => {
    if (variant !== 'desktop') return null
    const proj = geoNaturalEarth1().rotate([-11, 0, 0]).scale(270).translate([600, 318])
    const pathGen = geoPath().projection(proj)

    const countries = worldData
      ? worldData.features
          .map((f, i) => ({ id: (f.id as string) || `c-${i}`, d: pathGen(f) || '' }))
          .filter((c) => c.d.length > 0)
      : []

    const hubs = ALL_HUBS.map((hub) => {
      const pos = proj(hub.coords)
      return { ...hub, x: pos ? pos[0] : 0, y: pos ? pos[1] : 0 }
    })

    const hubMap = new Map<string, { x: number; y: number }>()
    hubs.forEach((h) => hubMap.set(h.id, { x: h.x, y: h.y }))

    const arcs = ALL_LINKS.map(([fromId, toId], idx) => {
      const p1 = hubMap.get(fromId)
      const p2 = hubMap.get(toId)
      if (!p1 || !p2) return null
      const midX = (p1.x + p2.x) / 2
      const midY = (p1.y + p2.y) / 2
      const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y)
      const cpY = midY - Math.min(dist * 0.16, 26)
      return { id: `d-arc-${idx}`, d: `M ${p1.x} ${p1.y} Q ${midX} ${cpY} ${p2.x} ${p2.y}` }
    }).filter(Boolean) as { id: string; d: string }[]

    return { countries, hubs, arcs }
  }, [variant, worldData])

  // Mobile Projections & Elements for Both Regions
  // Region 1: West (Americas & EU)
  const mobileWestData = useMemo(() => {
    if (variant !== 'mobile') return null
    const proj = geoNaturalEarth1().rotate([48, 0, 0]).scale(160).translate([200, 215])
    const pathGen = geoPath().projection(proj)

    const countries = worldData
      ? worldData.features
          .map((f, i) => ({ id: `mw-c-${f.id || i}`, d: pathGen(f) || '' }))
          .filter((c) => c.d.length > 0)
      : []

    const hubs = ALL_HUBS.filter((h) => WEST_HUB_IDS.has(h.id)).map((hub) => {
      const pos = proj(hub.coords)
      return { ...hub, x: pos ? pos[0] : 0, y: pos ? pos[1] : 0 }
    })

    const hubMap = new Map<string, { x: number; y: number }>()
    hubs.forEach((h) => hubMap.set(h.id, { x: h.x, y: h.y }))

    const arcs = WEST_LINKS.map(([fromId, toId], idx) => {
      const p1 = hubMap.get(fromId)
      const p2 = hubMap.get(toId)
      if (!p1 || !p2) return null
      const midX = (p1.x + p2.x) / 2
      const midY = (p1.y + p2.y) / 2
      const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y)
      const cpY = midY - Math.min(dist * 0.16, 22)
      return { id: `mw-arc-${idx}`, d: `M ${p1.x} ${p1.y} Q ${midX} ${cpY} ${p2.x} ${p2.y}` }
    }).filter(Boolean) as { id: string; d: string }[]

    return { countries, hubs, arcs }
  }, [variant, worldData])

  // Region 2: East (India & Asia)
  const mobileEastData = useMemo(() => {
    if (variant !== 'mobile') return null
    const proj = geoNaturalEarth1().rotate([-70, 0, 0]).scale(160).translate([195, 215])
    const pathGen = geoPath().projection(proj)

    const countries = worldData
      ? worldData.features
          .map((f, i) => ({ id: `me-c-${f.id || i}`, d: pathGen(f) || '' }))
          .filter((c) => c.d.length > 0)
      : []

    const hubs = ALL_HUBS.filter((h) => EAST_HUB_IDS.has(h.id)).map((hub) => {
      const pos = proj(hub.coords)
      return { ...hub, x: pos ? pos[0] : 0, y: pos ? pos[1] : 0 }
    })

    const hubMap = new Map<string, { x: number; y: number }>()
    hubs.forEach((h) => hubMap.set(h.id, { x: h.x, y: h.y }))

    const arcs = EAST_LINKS.map(([fromId, toId], idx) => {
      const p1 = hubMap.get(fromId)
      const p2 = hubMap.get(toId)
      if (!p1 || !p2) return null
      const midX = (p1.x + p2.x) / 2
      const midY = (p1.y + p2.y) / 2
      const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y)
      const cpY = midY - Math.min(dist * 0.16, 22)
      return { id: `me-arc-${idx}`, d: `M ${p1.x} ${p1.y} Q ${midX} ${cpY} ${p2.x} ${p2.y}` }
    }).filter(Boolean) as { id: string; d: string }[]

    return { countries, hubs, arcs }
  }, [variant, worldData])

  // ==========================================
  // MOBILE DUAL-REGION BACKGROUND
  // ==========================================
  if (variant === 'mobile') {
    return (
      <div className="absolute inset-0 overflow-hidden select-none" aria-hidden="true">
        <style jsx>{`
          @keyframes ctaArcFlow {
            from {
              stroke-dashoffset: 0;
            }
            to {
              stroke-dashoffset: -20;
            }
          }
          .cta-arc-flow {
            animation: ctaArcFlow 3.2s linear infinite;
          }
          @keyframes ctaPulse {
            0% {
              r: 5px;
              opacity: 0.7;
            }
            50% {
              r: 13px;
              opacity: 0.25;
            }
            100% {
              r: 19px;
              opacity: 0;
            }
          }
          .cta-hub-pulse {
            animation: ctaPulse 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .cta-arc-flow,
            .cta-hub-pulse {
              animation: none;
            }
          }
        `}</style>

        {/* Map 1: Americas & Western Europe (West) */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            activeRegion === 'west' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {mobileWestData && (
            <svg
              viewBox="0 0 390 340"
              preserveAspectRatio="xMidYMid slice"
              className="w-full h-full min-w-full"
            >
              {/* Landmasses */}
              <g className="cta-countries">
                {mobileWestData.countries.map((c) => (
                  <path
                    key={c.id}
                    d={c.d}
                    fill="var(--color-bg-muted)"
                    stroke="var(--color-border)"
                    strokeWidth="0.5"
                    strokeLinejoin="round"
                  />
                ))}
              </g>

              {/* Connecting Arcs */}
              <g className="cta-arcs">
                {mobileWestData.arcs.map((arc) => (
                  <path
                    key={arc.id}
                    d={arc.d}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="1.3"
                    strokeDasharray="3 5"
                    opacity="0.9"
                    className="cta-arc-flow"
                  />
                ))}
              </g>

              {/* Hub Pins */}
              <g className="cta-hubs">
                {mobileWestData.hubs.map((hub) => (
                  <g key={hub.id} transform={`translate(${hub.x}, ${hub.y})`}>
                    {hub.isMajor && (
                      <>
                        <circle r="14" fill="var(--color-accent)" opacity="0.25" className="pointer-events-none" />
                        <circle r="11" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" className="cta-hub-pulse" />
                      </>
                    )}
                    <circle r={hub.isMajor ? 4.2 : 2.8} fill="var(--color-accent)" stroke="var(--color-text)" strokeWidth="1" />
                    <circle r={hub.isMajor ? 2 : 1.2} fill="var(--color-text)" />
                  </g>
                ))}
              </g>
            </svg>
          )}
        </div>

        {/* Map 2: Europe, India & Asia (East) */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            activeRegion === 'east' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {mobileEastData && (
            <svg
              viewBox="0 0 390 340"
              preserveAspectRatio="xMidYMid slice"
              className="w-full h-full min-w-full"
            >
              {/* Landmasses */}
              <g className="cta-countries">
                {mobileEastData.countries.map((c) => (
                  <path
                    key={c.id}
                    d={c.d}
                    fill="var(--color-bg-muted)"
                    stroke="var(--color-border)"
                    strokeWidth="0.5"
                    strokeLinejoin="round"
                  />
                ))}
              </g>

              {/* Connecting Arcs */}
              <g className="cta-arcs">
                {mobileEastData.arcs.map((arc) => (
                  <path
                    key={arc.id}
                    d={arc.d}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="1.3"
                    strokeDasharray="3 5"
                    opacity="0.9"
                    className="cta-arc-flow"
                  />
                ))}
              </g>

              {/* Hub Pins */}
              <g className="cta-hubs">
                {mobileEastData.hubs.map((hub) => (
                  <g key={hub.id} transform={`translate(${hub.x}, ${hub.y})`}>
                    {hub.isMajor && (
                      <>
                        <circle r="14" fill="var(--color-accent)" opacity="0.25" className="pointer-events-none" />
                        <circle r="11" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" className="cta-hub-pulse" />
                      </>
                    )}
                    <circle r={hub.isMajor ? 4.2 : 2.8} fill="var(--color-accent)" stroke="var(--color-text)" strokeWidth="1" />
                    <circle r={hub.isMajor ? 2 : 1.2} fill="var(--color-text)" />
                  </g>
                ))}
              </g>
            </svg>
          )}
        </div>

        {/* Minimal Bottom Switcher Pills */}
        <div className="pointer-events-auto absolute bottom-2.5 sm:bottom-3 inset-x-0 flex items-center justify-center z-20">
          <div className="inline-flex items-center gap-1 p-0.5 bg-[var(--color-surface)] border border-[var(--color-border,#E8E8E8)] rounded-full text-[10px] font-mono tracking-tight">
            <button
              type="button"
              onClick={() => {
                setActiveRegion('west')
                setUserInteracted(true)
              }}
              className={`px-2.5 py-0.5 rounded-full transition-all flex items-center gap-1.5 ${
                activeRegion === 'west'
                  ? 'bg-[var(--color-text)] text-[var(--color-accent)] font-medium'
                  : 'text-[var(--color-text-muted,#737373)] hover:text-[var(--color-text)]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  activeRegion === 'west' ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border-strong)]'
                }`}
              />
              Americas & EU
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveRegion('east')
                setUserInteracted(true)
              }}
              className={`px-2.5 py-0.5 rounded-full transition-all flex items-center gap-1.5 ${
                activeRegion === 'east'
                  ? 'bg-[var(--color-text)] text-[var(--color-accent)] font-medium'
                  : 'text-[var(--color-text-muted,#737373)] hover:text-[var(--color-text)]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  activeRegion === 'east' ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border-strong)]'
                }`}
              />
              India & Asia
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ==========================================
  // DESKTOP FULL-BLEED AMBIENT MAP (ORIGINAL)
  // ==========================================
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
      aria-hidden="true"
    >
      <style jsx>{`
        @keyframes ctaArcFlow {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -20;
          }
        }
        .cta-arc-flow {
          animation: ctaArcFlow 3.2s linear infinite;
        }
        @keyframes ctaPulse {
          0% {
            r: 5px;
            opacity: 0.7;
          }
          50% {
            r: 13px;
            opacity: 0.25;
          }
          100% {
            r: 19px;
            opacity: 0;
          }
        }
        .cta-hub-pulse {
          animation: ctaPulse 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .cta-arc-flow,
          .cta-hub-pulse {
            animation: none;
          }
        }
      `}</style>

      {/* Layer 1: Landmasses */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
          worldData ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full min-w-full">
          <g className="cta-countries">
            {desktopData?.countries.map((country) => (
              <path
                key={country.id}
                d={country.d}
                fill="var(--color-bg-muted)"
                stroke="var(--color-border)"
                strokeWidth="0.45"
                strokeLinejoin="round"
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Layer 2: Arcs & Client Hub Pins */}
      <div
        className={`relative z-10 w-full h-full transition-opacity duration-700 ${
          worldData ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full min-w-full">
          <g className="cta-arcs">
            {desktopData?.arcs.map((arc) => (
              <path
                key={arc.id}
                d={arc.d}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="1.25"
                strokeDasharray="3 5"
                opacity="0.9"
                className="cta-arc-flow"
              />
            ))}
          </g>

          <g className="cta-hubs">
            {desktopData?.hubs.map((hub) => (
              <g key={hub.id} transform={`translate(${hub.x}, ${hub.y})`}>
                {hub.isMajor && (
                  <>
                    <circle r="14" fill="var(--color-accent)" opacity="0.2" className="pointer-events-none" />
                    <circle r="11" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" className="cta-hub-pulse" />
                  </>
                )}
                <circle r={hub.isMajor ? 4 : 2.5} fill="var(--color-accent)" stroke="var(--color-text)" strokeWidth="1" />
                <circle r={hub.isMajor ? 2 : 1.2} fill="var(--color-text)" />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  )
}
