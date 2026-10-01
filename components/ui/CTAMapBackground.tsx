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

// All client network hubs across North America, Europe, India, and East Asia
const CTA_HUBS = [
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

// Module-level in-memory cache: fetches once per session, instant for all subsequent pages
let cachedWorldData: FeatureCollection<Geometry> | null = null

export function CTAMapBackground() {
  const [worldData, setWorldData] = useState<FeatureCollection<Geometry> | null>(() => cachedWorldData)

  // Natural Earth projection scaled and centered with extra top headroom for flight arcs
  const { projection, pathGenerator } = useMemo(() => {
    const proj = geoNaturalEarth1()
      .rotate([-11, 0, 0])
      .scale(270)
      .translate([600, 318])
    const path = geoPath().projection(proj)
    return { projection: proj, pathGenerator: path }
  }, [])

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
        // Fails gracefully: CTA section remains 100% styled and fully functional
        console.warn('Map background unavailable, continuing with flat CTA:', err)
      })
    return () => {
      isMounted = false
    }
  }, [worldData])

  // Projected landmass SVG paths
  const countryPaths = useMemo(() => {
    if (!worldData) return []
    return worldData.features
      .map((f, i) => ({
        id: (f.id as string) || `cta-c-${i}`,
        d: pathGenerator(f) || '',
      }))
      .filter((c) => c.d.length > 0)
  }, [worldData, pathGenerator])

  // Projected hub coordinates
  const projectedHubs = useMemo(() => {
    return CTA_HUBS.map((hub) => {
      const pos = projection(hub.coords)
      return {
        ...hub,
        x: pos ? pos[0] : 0,
        y: pos ? pos[1] : 0,
      }
    })
  }, [projection])

  // Connecting network arcs
  const arcs = useMemo(() => {
    const hubMap = new Map<string, { x: number; y: number }>()
    projectedHubs.forEach((h) => hubMap.set(h.id, { x: h.x, y: h.y }))

    const links: [string, string][] = [
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

    return links
      .map(([fromId, toId], idx) => {
        const p1 = hubMap.get(fromId)
        const p2 = hubMap.get(toId)
        if (!p1 || !p2) return null
        const midX = (p1.x + p2.x) / 2
        const midY = (p1.y + p2.y) / 2
        const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y)
        const curveOffset = Math.min(dist * 0.16, 26)
        const cpY = midY - curveOffset
        return {
          id: `cta-arc-${idx}`,
          d: `M ${p1.x} ${p1.y} Q ${midX} ${cpY} ${p2.x} ${p2.y}`,
        }
      })
      .filter(Boolean) as { id: string; d: string }[]
  }, [projectedHubs])

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
      `}</style>

      {/* Layer 1: Landmasses */}
      <div className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${worldData ? 'opacity-100' : 'opacity-0'}`}>
        <svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full min-w-full"
        >
          {/* Curved World Landmasses */}
          <g className="cta-countries">
            {countryPaths.map((country) => (
              <path
                key={country.id}
                d={country.d}
                fill="#EFEFE9"
                stroke="#DDDDCF"
                strokeWidth="0.45"
                strokeLinejoin="round"
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Layer 3: High-Z-Index Flight Arcs & Glowing Client Hub Pins */}
      <div className={`relative z-10 w-full h-full transition-opacity duration-700 ${worldData ? 'opacity-100' : 'opacity-0'}`}>
        <svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full min-w-full"
        >
          {/* Animated Flowing Connecting Arcs */}
          <g className="cta-arcs">
            {arcs.map((arc) => (
              <path
                key={arc.id}
                d={arc.d}
                fill="none"
                stroke="#FFD600"
                strokeWidth="1.25"
                strokeDasharray="3 5"
                opacity="0.9"
                className="cta-arc-flow"
              />
            ))}
          </g>

          {/* Client Hub Nodes with Glowing Radar Halos (Always on top) */}
          <g className="cta-hubs">
            {projectedHubs.map((hub) => (
              <g key={hub.id} transform={`translate(${hub.x}, ${hub.y})`}>
                {hub.isMajor && (
                  <>
                    <circle
                      r="14"
                      fill="#FFD600"
                      opacity="0.2"
                      className="pointer-events-none"
                    />
                    <circle
                      r="11"
                      fill="none"
                      stroke="#FFD600"
                      strokeWidth="1.2"
                      className="cta-hub-pulse"
                    />
                  </>
                )}
                <circle
                  r={hub.isMajor ? 4 : 2.5}
                  fill="#FFD600"
                  stroke="#121212"
                  strokeWidth="1"
                />
                <circle
                  r={hub.isMajor ? 2 : 1.2}
                  fill="#121212"
                />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  )
}
