'use client'

import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3-geo'
import { feature } from 'topojson-client'
import { Layers, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react'
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

// Module-level in-memory cache
let cachedWorldData: FeatureCollection<Geometry> | null = null

interface CTAMapBackgroundProps {
  variant?: 'desktop' | 'mobile'
}

export function CTAMapBackground({ variant = 'desktop' }: CTAMapBackgroundProps) {
  const [worldData, setWorldData] = useState<FeatureCollection<Geometry> | null>(() => cachedWorldData)

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



  // ==========================================
  // DESKTOP PROJECTION & PARABOLIC ARCS
  // ==========================================
  const desktopData = useMemo(() => {
    if (variant !== 'desktop') return null
    // Center at Atlantic/Europe with wide Natural Earth curvature for taller canvas
    const proj = geoNaturalEarth1().rotate([-11, 0, 0]).scale(235).translate([600, 355])
    const pathGen = geoPath().projection(proj)

    // Spherical graticule lines (latitude/longitude curves across the Earth)
    const graticulePath = pathGen(geoGraticule().step([30, 20])()) || ''

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

    // High parabolic leaping arcs (3D trajectories like reference image)
    const arcs = ALL_LINKS.map(([fromId, toId], idx) => {
      const p1 = hubMap.get(fromId)
      const p2 = hubMap.get(toId)
      if (!p1 || !p2) return null
      const dx = p2.x - p1.x
      const dy = p2.y - p1.y
      const dist = Math.hypot(dx, dy)

      // Parabolic apex: leap up into the sky
      const archApex = Math.min(Math.max(dist * 0.42, 50), 125)
      const cp1X = p1.x + dx * 0.22
      const cp1Y = p1.y - archApex * 0.95
      const cp2X = p1.x + dx * 0.78
      const cp2Y = p2.y - archApex * 0.95

      const d = `M ${p1.x} ${p1.y} C ${cp1X.toFixed(1)} ${cp1Y.toFixed(1)} ${cp2X.toFixed(1)} ${cp2Y.toFixed(1)} ${p2.x} ${p2.y}`
      const isMajor =
        (fromId === 'toronto' && toId === 'zurich') ||
        (fromId === 'zurich' && toId === 'delhi') ||
        (fromId === 'pune' && toId === 'singapore') ||
        (fromId === 'la' && toId === 'toronto')

      return { id: `d-arc-${idx}`, d, isMajor, duration: 3.5 + (idx % 3) * 0.8 }
    }).filter(Boolean) as { id: string; d: string; isMajor: boolean; duration: number }[]

    return { countries, graticulePath, hubs, arcs, hubMap }
  }, [variant, worldData])

  // ==========================================
  // MOBILE PROJECTION (SCALED GLOBAL WORLD MAP)
  // ==========================================
  const mobileData = useMemo(() => {
    if (variant !== 'mobile') return null
    // Full world map scaled larger to span full width and height of mobile canvas
    const proj = geoNaturalEarth1().rotate([-11, 0, 0]).scale(108).translate([200, 160])
    const pathGen = geoPath().projection(proj)
    const graticulePath = pathGen(geoGraticule().step([30, 20])()) || ''

    const countries = worldData
      ? worldData.features
          .map((f, i) => ({ id: `m-c-${f.id || i}`, d: pathGen(f) || '' }))
          .filter((c) => c.d.length > 0)
      : []

    const hubs = ALL_HUBS.map((hub) => {
      const pos = proj(hub.coords)
      return { ...hub, x: pos ? pos[0] : 0, y: pos ? pos[1] : 0 }
    })

    const hubMap = new Map<string, { x: number; y: number }>()
    hubs.forEach((h) => hubMap.set(h.id, { x: h.x, y: h.y }))

    // Clean East-West arterial global backbone for mobile (no tangled clutter)
    const mobileLinks: [string, string][] = [
      ['la', 'toronto'],
      ['toronto', 'zurich'],
      ['zurich', 'pune'],
      ['pune', 'singapore'],
    ]

    const arcs = mobileLinks.map(([fromId, toId], idx) => {
      const p1 = hubMap.get(fromId)
      const p2 = hubMap.get(toId)
      if (!p1 || !p2) return null
      const dx = p2.x - p1.x
      const dy = p2.y - p1.y
      const dist = Math.hypot(dx, dy)
      const archApex = Math.min(Math.max(dist * 0.35, 18), 42)
      const cp1X = p1.x + dx * 0.22
      const cp1Y = p1.y - archApex
      const cp2X = p1.x + dx * 0.78
      const cp2Y = p2.y - archApex

      const d = `M ${p1.x} ${p1.y} C ${cp1X.toFixed(1)} ${cp1Y.toFixed(1)} ${cp2X.toFixed(1)} ${cp2Y.toFixed(1)} ${p2.x} ${p2.y}`

      return { id: `m-arc-${idx}`, d, duration: 3.2 + idx * 0.6 }
    }).filter(Boolean) as { id: string; d: string; duration: number }[]

    return { countries, graticulePath, hubs, arcs }
  }, [variant, worldData])

  // ==========================================
  // SHARED STYLES (Keyframes & Utilities)
  // ==========================================
  const sharedStyles = (
    <style jsx global>{`
      @keyframes ctaArcFlow {
        from {
          stroke-dashoffset: 0;
        }
        to {
          stroke-dashoffset: -24;
        }
      }
      .cta-arc-flow {
        animation: ctaArcFlow 3.4s linear infinite;
      }
      @keyframes ctaHubPulse {
        0% {
          r: 5px;
          opacity: 0.8;
        }
        50% {
          r: 15px;
          opacity: 0.25;
        }
        100% {
          r: 22px;
          opacity: 0;
        }
      }
      .cta-hub-pulse {
        animation: ctaHubPulse 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
      }
      @keyframes ctaPillFloatA {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-6px);
        }
      }
      @keyframes ctaPillFloatB {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-8px);
        }
      }
      @keyframes ctaPillFloatC {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-5px);
        }
      }
      .cta-pill-float-a {
        animation: ctaPillFloatA 4.4s ease-in-out infinite;
      }
      .cta-pill-float-b {
        animation: ctaPillFloatB 5.1s ease-in-out 0.8s infinite;
      }
      .cta-pill-float-c {
        animation: ctaPillFloatC 4.6s ease-in-out 1.6s infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        .cta-arc-flow,
        .cta-hub-pulse,
        .cta-pill-float-a,
        .cta-pill-float-b,
        .cta-pill-float-c {
          animation: none !important;
        }
      }
    `}</style>
  )

  if (variant === 'mobile') {
    return (
      <div className="absolute inset-0 overflow-hidden select-none" aria-hidden="true">
        {sharedStyles}

        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
            worldData ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {mobileData && (
            <svg
              viewBox="0 0 390 260"
              preserveAspectRatio="xMidYMid slice"
              className="w-full h-full min-w-full"
            >
              <defs>
                <marker
                  id="cta-arrow-mobile"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="4"
                  markerHeight="4"
                  orient="auto"
                >
                  <path d="M 0 2 L 7 5 L 0 8 z" fill="var(--color-accent)" />
                </marker>

                <linearGradient id="cta-horizon-fade-m" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.06" />
                  <stop offset="100%" stopColor="var(--color-bg)" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Curved Atmospheric Horizon Dome */}
              <path
                d="M 5 235 Q 195 20 385 235"
                fill="url(#cta-horizon-fade-m)"
                stroke="var(--color-border)"
                strokeWidth="0.6"
                strokeDasharray="3 5"
                opacity="0.45"
              />

              {/* Spherical Graticule Grid */}
              <path
                d={mobileData.graticulePath}
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="0.35"
                strokeDasharray="2 4"
                opacity="0.35"
              />

              {/* Solid Vector Landmasses (Zero Dots) */}
              <g className="cta-countries">
                {mobileData.countries.map((c) => (
                  <path
                    key={c.id}
                    d={c.d}
                    fill="var(--color-bg-muted)"
                    stroke="var(--color-border)"
                    strokeWidth="0.4"
                    strokeLinejoin="round"
                  />
                ))}
              </g>

              {/* High Parabolic Arcs */}
              <g className="cta-arcs">
                {mobileData.arcs.map((arc) => (
                  <path
                    key={arc.id}
                    d={arc.d}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="1.1"
                    strokeDasharray="3 5"
                    opacity="0.85"
                    markerEnd="url(#cta-arrow-mobile)"
                    className="cta-arc-flow"
                  />
                ))}
              </g>

              {/* Signal Pulse Traveling Dots */}
              {mobileData.arcs.map((arc) => (
                <circle
                  key={`dot-${arc.id}`}
                  r="1.6"
                  fill="var(--color-text)"
                  stroke="var(--color-accent)"
                  strokeWidth="0.8"
                >
                  <animateMotion
                    dur={`${arc.duration}s`}
                    repeatCount="indefinite"
                    path={arc.d}
                    keyPoints="0;1"
                    keyTimes="0;1"
                  />
                </circle>
              ))}

              {/* Hub Pins with Clean Subtle Radar Pulses */}
              <g className="cta-hubs">
                {mobileData.hubs.map((hub) => (
                  <g key={hub.id} transform={`translate(${hub.x}, ${hub.y})`}>
                    {(hub.id === 'zurich' || hub.id === 'pune') && (
                      <circle r="7" fill="none" stroke="var(--color-accent)" strokeWidth="0.8" className="cta-hub-pulse" />
                    )}
                    <circle r={hub.isMajor ? 2.6 : 1.6} fill="var(--color-accent)" stroke="var(--color-text)" strokeWidth="0.8" />
                    <circle r={hub.isMajor ? 1.2 : 0.7} fill="var(--color-text)" />
                  </g>
                ))}
              </g>
            </svg>
          )}
        </div>
      </div>
    )
  }

  // ==========================================
  // DESKTOP FULL-BLEED CURVED MAP & PILLS
  // ==========================================
  return (
    <div className="absolute inset-0 overflow-hidden select-none" aria-hidden="true">
      {sharedStyles}

      {/* SVG Map Canvas (Pointer Events None) */}
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
          worldData ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <svg
          viewBox="0 0 1200 580"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full min-w-full"
        >
          <defs>
            {/* Directional Arrowhead Marker */}
            <marker
              id="cta-arrow-desktop"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="4.5"
              markerHeight="4.5"
              orient="auto"
            >
              <path d="M 0 2 L 7 5 L 0 8 z" fill="var(--color-accent)" />
            </marker>

            {/* Top Atmospheric Horizon Gradient */}
            <linearGradient id="cta-horizon-fade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.06" />
              <stop offset="100%" stopColor="var(--color-bg)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Curved Horizon Dome Atmosphere Arc (Overarching Globe Horizon) */}
          <path
            d="M 40 450 Q 600 70 1160 450"
            fill="url(#cta-horizon-fade)"
            stroke="var(--color-border)"
            strokeWidth="0.8"
            strokeDasharray="4 6"
            opacity="0.55"
          />

          {/* Spherical Graticule Grid (Curving Latitude/Longitude Guides) */}
          {desktopData?.graticulePath && (
            <path
              d={desktopData.graticulePath}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="0.45"
              strokeDasharray="3 5"
              opacity="0.4"
            />
          )}

          {/* Solid Vector Landmasses (Crisp TopoJSON Polygons - NOT Dotted) */}
          <g className="cta-countries">
            {desktopData?.countries.map((country) => (
              <path
                key={country.id}
                d={country.d}
                fill="var(--color-bg-muted)"
                stroke="var(--color-border)"
                strokeWidth="0.5"
                strokeLinejoin="round"
              />
            ))}
          </g>

          {/* High Parabolic Leaping Arcs (3D Trajectories) */}
          <g className="cta-arcs">
            {desktopData?.arcs.map((arc) => (
              <path
                key={arc.id}
                d={arc.d}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={arc.isMajor ? '1.4' : '1.15'}
                strokeDasharray="4 6"
                opacity="0.9"
                markerEnd="url(#cta-arrow-desktop)"
                className="cta-arc-flow"
              />
            ))}
          </g>

          {/* Signal Pulse Traveling Dots on Major Arcs */}
          {desktopData?.arcs
            .filter((a) => a.isMajor)
            .map((arc, i) => (
              <circle key={`dot-${arc.id}`} r="2.2" fill="var(--color-text)" stroke="var(--color-accent)" strokeWidth="1.2">
                <animateMotion
                  dur={`${arc.duration}s`}
                  repeatCount="indefinite"
                  path={arc.d}
                  keyPoints="0;1"
                  keyTimes="0;1"
                />
              </circle>
            ))}

          {/* Hub Pins with Concentric Radar Pulses */}
          <g className="cta-hubs">
            {desktopData?.hubs.map((hub) => (
              <g key={hub.id} transform={`translate(${hub.x}, ${hub.y})`}>
                {hub.isMajor && (
                  <>
                    <circle r="15" fill="var(--color-accent)" opacity="0.22" className="pointer-events-none" />
                    <circle r="12" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" className="cta-hub-pulse" />
                  </>
                )}
                <circle r={hub.isMajor ? 4.2 : 2.6} fill="var(--color-accent)" stroke="var(--color-text)" strokeWidth="1" />
                <circle r={hub.isMajor ? 2 : 1.2} fill="var(--color-text)" />
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* ==========================================
          FLOATING CLIENT PILL BADGES (POINTER-EVENTS-AUTO)
          Inspired by Reference Image: 3 Elevated Floating Cards
          ========================================== */}
      <div className="pointer-events-none absolute inset-0 z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Pill 1: Americas / West (Simpli Home) */}
        <div
          className="pointer-events-auto absolute left-[3%] sm:left-[5%] xl:left-[7%] top-[60%] lg:top-[64%] cta-pill-float-a hidden sm:block"
        >
          <Link
            href="/work/simpli-home"
            className="group/pill flex items-center gap-3 rounded-full border border-[var(--color-border,#E8E8E8)] bg-[var(--color-surface,#FFFFFF)] px-3.5 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.06)] backdrop-blur-xs transition-all duration-300 hover:scale-105 hover:border-[var(--color-border-strong,#D4D4D4)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-accent,#FFD600)] text-[var(--color-text,#121212)] shadow-xs transition-transform duration-300 group-hover/pill:rotate-6">
              <Layers size={13} className="stroke-[2.4]" />
            </div>
            <div className="flex flex-col text-left pr-1">
              <span className="text-xs font-bold tracking-tight text-[var(--color-text,#121212)] leading-snug">
                Simpli Home
              </span>
              <span className="text-[10px] text-[var(--color-text-muted,#737373)] leading-tight font-mono">
                Toronto · 11 hrs/wk saved
              </span>
            </div>
            <ArrowUpRight
              size={12}
              className="text-[var(--color-text-faint)] transition-transform duration-300 group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5 group-hover/pill:text-[var(--color-text)]"
            />
          </Link>
        </div>

        {/* Pill 2: Europe / Atlantic (Sustainable Bitcoin Protocol) */}
        <div
          className="pointer-events-auto absolute left-[4%] sm:left-[6%] xl:left-[8%] top-[16%] lg:top-[18%] cta-pill-float-b hidden sm:block"
        >
          <Link
            href="/work/sustainable-bitcoin-protocol"
            className="group/pill flex items-center gap-3 rounded-full border border-[var(--color-border,#E8E8E8)] bg-[var(--color-surface,#FFFFFF)] px-3.5 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.06)] backdrop-blur-xs transition-all duration-300 hover:scale-105 hover:border-[var(--color-border-strong,#D4D4D4)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-text,#121212)] text-[var(--color-accent,#FFD600)] shadow-xs transition-transform duration-300 group-hover/pill:rotate-6">
              <ShieldCheck size={13} className="stroke-[2.4]" />
            </div>
            <div className="flex flex-col text-left pr-1">
              <span className="text-xs font-bold tracking-tight text-[var(--color-text,#121212)] leading-snug">
                Sustainable BTC
              </span>
              <span className="text-[10px] text-[var(--color-text-muted,#737373)] leading-tight font-mono">
                Zurich · Institutional UX
              </span>
            </div>
            <ArrowUpRight
              size={12}
              className="text-[var(--color-text-faint)] transition-transform duration-300 group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5 group-hover/pill:text-[var(--color-text)]"
            />
          </Link>
        </div>

        {/* Pill 3: Asia / East (Tocal & MetaThumbz) */}
        <div
          className="pointer-events-auto absolute right-[3%] sm:right-[5%] xl:right-[7%] top-[50%] lg:top-[54%] cta-pill-float-c hidden sm:block"
        >
          <Link
            href="/work"
            className="group/pill flex items-center gap-3 rounded-full border border-[var(--color-border,#E8E8E8)] bg-[var(--color-surface,#FFFFFF)] px-3.5 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.06)] backdrop-blur-xs transition-all duration-300 hover:scale-105 hover:border-[var(--color-border-strong,#D4D4D4)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-accent,#FFD600)] text-[var(--color-text,#121212)] shadow-xs transition-transform duration-300 group-hover/pill:rotate-6">
              <Cpu size={13} className="stroke-[2.4]" />
            </div>
            <div className="flex flex-col text-left pr-1">
              <span className="text-xs font-bold tracking-tight text-[var(--color-text,#121212)] leading-snug">
                Tocal (DbyT)
              </span>
              <span className="text-[10px] text-[var(--color-text-muted,#737373)] leading-tight font-mono">
                Pune · Hardware & Web
              </span>
            </div>
            <ArrowUpRight
              size={12}
              className="text-[var(--color-text-faint)] transition-transform duration-300 group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5 group-hover/pill:text-[var(--color-text)]"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
