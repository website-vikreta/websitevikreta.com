'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, Objects } from 'topojson-specification'
import type { FeatureCollection, Geometry } from 'geojson'
import { GLOBE_CLIENTS, type GlobeClient } from '@/lib/globe-clients-data'
import { Globe, Navigation } from 'lucide-react'

interface CountriesTopology extends Topology<Objects> {
  objects: {
    countries: Objects[string]
  }
}

// Major hub IDs that receive primary radar pulse rings
const MAJOR_HUBS = new Set(['simpli-home', 'sustainable-btc', 'ap-cleanco', 'archmodal', 'tocal', 'jaxl'])

interface GlobalNetworkMapProps {
  selectedClientId: string | null
  hoveredClientId: string | null
  onSelectClient: (client: GlobeClient | null) => void
  onHoverClient: (client: GlobeClient | null) => void
  activeRegion: string
  onSelectRegion: (region: string) => void
}

export function GlobalNetworkMap({
  selectedClientId,
  hoveredClientId,
  onSelectClient,
  onHoverClient,
  activeRegion,
  onSelectRegion,
}: GlobalNetworkMapProps) {
  const [worldData, setWorldData] = useState<FeatureCollection<Geometry> | null>(null)

  // Natural Earth projection with gentle -11° rotation to center Europe/Africa & curve Americas/Asia naturally
  const { projection, pathGenerator } = useMemo(() => {
    const proj = geoNaturalEarth1()
      .rotate([-11, 0, 0])
      .scale(158)
      .translate([500, 218])
    const path = geoPath().projection(proj)
    return { projection: proj, pathGenerator: path }
  }, [])

  // Load countries topology from local public asset
  useEffect(() => {
    let isMounted = true
    fetch('/data/countries-110m.json')
      .then((res) => res.json())
      .then((topology: CountriesTopology) => {
        if (!isMounted) return
        const countries = feature(topology, topology.objects.countries) as FeatureCollection<Geometry>
        // Exclude Antarctica (ISO 010) to eliminate massive dead polar space
        const inhabitedCountries: FeatureCollection<Geometry> = {
          ...countries,
          features: countries.features.filter((f) => f.id !== '010'),
        }
        setWorldData(inhabitedCountries)
      })
      .catch((err) => console.error('Failed to load topology for map:', err))
    return () => {
      isMounted = false
    }
  }, [])

  // Landmass SVG path features
  const countryPaths = useMemo(() => {
    if (!worldData) return []
    return worldData.features
      .map((f, i) => ({
        id: (f.id as string) || `c-${i}`,
        d: pathGenerator(f) || '',
      }))
      .filter((c) => c.d.length > 0)
  }, [worldData, pathGenerator])

  // Projected client coordinates
  const projectedClients = useMemo(() => {
    return GLOBE_CLIENTS.map((client) => {
      const pos = projection(client.coords)
      return {
        ...client,
        x: pos ? pos[0] : 0,
        y: pos ? pos[1] : 0,
        isMajor: MAJOR_HUBS.has(client.id),
      }
    })
  }, [projection])

  // Map of client coordinates by ID for arc generation
  const clientPosMap = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>()
    projectedClients.forEach((c) => map.set(c.id, { x: c.x, y: c.y }))
    return map
  }, [projectedClients])

  // Connecting network arcs between key client hubs
  const networkArcs = useMemo(() => {
    const connections: [string, string][] = [
      ['tocal', 'sustainable-btc'], // Pune -> Zurich/NY
      ['tocal', 'ap-cleanco'],       // Pune -> Manchester
      ['tocal', 'archmodal'],        // Pune -> LA
      ['ap-cleanco', 'simpli-home'], // Manchester -> Toronto
      ['sustainable-btc', 'simpli-home'], // Zurich -> Toronto
      ['simpli-home', 'archmodal'],  // Toronto -> LA
      ['simpli-home', 'cozmo-realty'], // Toronto -> Dallas
      ['tocal', 'jaxl'],             // Pune -> Bengaluru
      ['tocal', 'katalyst-consulting'], // Pune -> Delhi
      ['tocal', 'earth-by-blancora'], // Pune -> Mumbai
    ]

    return connections
      .map(([fromId, toId], idx) => {
        const p1 = clientPosMap.get(fromId)
        const p2 = clientPosMap.get(toId)
        if (!p1 || !p2) return null

        const midX = (p1.x + p2.x) / 2
        const midY = (p1.y + p2.y) / 2
        const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y)
        const curveOffset = Math.min(dist * 0.22, 45)
        const cpY = midY - curveOffset

        return {
          id: `arc-${idx}`,
          d: `M ${p1.x} ${p1.y} Q ${midX} ${cpY} ${p2.x} ${p2.y}`,
          fromId,
          toId,
        }
      })
      .filter(Boolean) as { id: string; d: string; fromId: string; toId: string }[]
  }, [clientPosMap])

  // Active client object for map popup
  const activeClient = useMemo(() => {
    const targetId = hoveredClientId || selectedClientId
    return projectedClients.find((c) => c.id === targetId) || null
  }, [hoveredClientId, selectedClientId, projectedClients])

  return (
    <div className="relative w-full rounded-2xl border border-black/10 bg-[#FAFAF7] overflow-hidden shadow-xs">
      {/* Embedded CSS for smooth flowing flight arcs and soft breathing pulses */}
      <style jsx>{`
        @keyframes arcFlow {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -20;
          }
        }
        .network-arc-flow {
          animation: arcFlow 2.8s linear infinite;
        }
        @keyframes hubBreathe {
          0% {
            r: 10px;
            opacity: 0.6;
          }
          50% {
            r: 18px;
            opacity: 0.2;
          }
          100% {
            r: 24px;
            opacity: 0;
          }
        }
        .hub-ripple {
          animation: hubBreathe 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
      `}</style>

      {/* Top Header Bar inside Map */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 sm:px-8 pt-5 pb-3 border-b border-black/5 bg-white/40">
        <div className="flex items-center gap-3">
          <Globe className="h-4 w-4 text-[#121212]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#121212]">
            Global Client Network
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#525252]">
            <span className="h-2 w-2 rounded-full bg-[#10B981] inline-block" />
            12 Active Clients
          </span>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['All', 'North America', 'Europe', 'Asia'] as const).map((region) => {
            const isActive = activeRegion === region
            return (
              <button
                key={region}
                type="button"
                onClick={() => onSelectRegion(region)}
                className={`rounded-full px-3.5 py-1 text-xs font-mono transition-colors ${
                  isActive
                    ? 'bg-[#121212] text-white font-medium shadow-xs'
                    : 'bg-white text-[#525252] hover:bg-white/80 hover:text-[#121212] border border-black/10'
                }`}
              >
                {region}
              </button>
            )
          })}
        </div>
      </div>

      {/* Panoramic SVG Map Canvas with Curved Natural Earth Projection (viewBox 0 0 1000 420) */}
      <div className="relative w-full aspect-[2.38/1] max-h-[410px] md:max-h-[440px] select-none flex items-center justify-center p-2 sm:p-4 bg-[#FAFAF7]">
        <svg
          viewBox="0 0 1000 420"
          className="w-full h-full object-contain"
          role="img"
          aria-label="Map displaying Website Vikreta global client network topology"
        >
          <defs>
            {/* Subtle dot matrix pattern matching the reference image */}
            <pattern id="map-dot-grid" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.75" fill="#D6D6CE" opacity="0.65" />
            </pattern>
            {/* Soft radial glow filter for major hub auras */}
            <radialGradient id="hub-glow-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD600" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#FFD600" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FFD600" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Dot Grid Background */}
          <rect width="1000" height="420" fill="url(#map-dot-grid)" />

          {/* Region Text Labels matching the reference image */}
          <text
            x="180"
            y="175"
            fill="#A6A69E"
            fontSize="9.5"
            fontFamily="monospace"
            fontWeight="700"
            letterSpacing="0.18em"
            className="pointer-events-none select-none"
          >
            NORTH AMERICA
          </text>
          <text
            x="500"
            y="115"
            fill="#A6A69E"
            fontSize="9.5"
            fontFamily="monospace"
            fontWeight="700"
            letterSpacing="0.18em"
            textAnchor="middle"
            className="pointer-events-none select-none"
          >
            EUROPE
          </text>
          <text
            x="845"
            y="180"
            fill="#A6A69E"
            fontSize="9.5"
            fontFamily="monospace"
            fontWeight="700"
            letterSpacing="0.18em"
            className="pointer-events-none select-none"
          >
            ASIA
          </text>

          {/* Curved Landmass Outlines */}
          <g className="countries">
            {countryPaths.map((country) => (
              <path
                key={country.id}
                d={country.d}
                fill="#EAEAE3"
                stroke="#DDDDD5"
                strokeWidth="0.5"
                strokeLinejoin="round"
              />
            ))}
          </g>

          {/* Smooth Flowing Connecting Flight Arcs */}
          <g className="network-arcs">
            {networkArcs.map((arc) => {
              const isHighlighted =
                hoveredClientId === arc.fromId ||
                hoveredClientId === arc.toId ||
                selectedClientId === arc.fromId ||
                selectedClientId === arc.toId

              return (
                <path
                  key={arc.id}
                  d={arc.d}
                  fill="none"
                  stroke={isHighlighted ? '#121212' : '#F2C000'}
                  strokeWidth={isHighlighted ? 1.6 : 1}
                  strokeDasharray="3 5"
                  opacity={isHighlighted ? 1 : 0.75}
                  className={`transition-all duration-300 ${!isHighlighted ? 'network-arc-flow' : ''}`}
                />
              )
            })}
          </g>

          {/* Client Nodes */}
          <g className="client-nodes">
            {projectedClients.map((client) => {
              const isSelected = selectedClientId === client.id
              const isHovered = hoveredClientId === client.id
              const isDimmed = activeRegion !== 'All' && client.region !== activeRegion

              return (
                <g
                  key={client.id}
                  transform={`translate(${client.x}, ${client.y})`}
                  onClick={() => onSelectClient(isSelected ? null : client)}
                  onMouseEnter={() => onHoverClient(client)}
                  onMouseLeave={() => onHoverClient(null)}
                  className={`cursor-pointer transition-opacity duration-300 ${
                    isDimmed ? 'opacity-20' : 'opacity-100'
                  }`}
                >
                  {/* Soft Radial Ambient Aura for Major Hubs (matches reference image) */}
                  {client.isMajor && (
                    <>
                      <circle
                        r="18"
                        fill="url(#hub-glow-gradient)"
                        className="pointer-events-none"
                      />
                      <circle
                        r="14"
                        fill="none"
                        stroke="#FFD600"
                        strokeWidth="1.2"
                        className="hub-ripple"
                      />
                    </>
                  )}

                  {/* Accent Highlight Ring */}
                  <circle
                    r={isSelected || isHovered ? 6 : client.isMajor ? 4.5 : 3.5}
                    fill="#FFD600"
                    stroke="#121212"
                    strokeWidth="1"
                    className="transition-transform duration-200"
                  />

                  {/* Dark Core Pin */}
                  <circle
                    r={isSelected || isHovered ? 3 : client.isMajor ? 2.2 : 1.8}
                    fill="#121212"
                  />
                </g>
              )
            })}
          </g>
        </svg>

        {/* Active Pin Floating Card — Minimalist Popover */}
        {activeClient && (
          <div
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full mb-3 rounded-lg border border-black/15 bg-white px-3 py-2 shadow-md transition-all duration-200"
            style={{
              left: `${(activeClient.x / 1000) * 100}%`,
              top: `${(activeClient.y / 420) * 100}%`,
            }}
          >
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFD600] shrink-0" />
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#525252] whitespace-nowrap">
                {activeClient.city}, {activeClient.country}
              </p>
            </div>
            <p className="font-sans text-xs font-bold text-[#121212] whitespace-nowrap mt-0.5">
              {activeClient.name}
            </p>
            <p className="font-mono text-[10px] text-[#525252] whitespace-nowrap mt-0.5">
              {activeClient.service}
            </p>
          </div>
        )}
      </div>

      {/* Map Bottom Status Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-5 sm:px-8 py-3 border-t border-black/5 bg-white/60">
        <div className="flex items-center gap-5 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFD600] opacity-40 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFD600] ring-2 ring-black/10" />
            </span>
            <span className="text-[#121212] font-semibold">Active client hubs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#121212]" />
            <span className="text-[#525252]">Regional nodes</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#525252]">
          <Navigation className="h-3 w-3 text-[#121212]" />
          <span>Select a hub to explore</span>
        </div>
      </div>
    </div>
  )
}

