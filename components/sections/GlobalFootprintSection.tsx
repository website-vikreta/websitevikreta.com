'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { RevealText, RevealFade } from '@/components/ui/Reveal'
import { GLOBE_CLIENTS, type GlobeClient } from '@/lib/globe-clients-data'
import { Users, MapPin, Globe, ArrowRight } from 'lucide-react'

// Dynamically load the SVG map on client only to protect LCP and 0 initial JS budget
const GlobalNetworkMap = dynamic(
  () => import('@/components/ui/GlobalNetworkMap').then((mod) => mod.GlobalNetworkMap),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full aspect-[2.38/1] max-h-[410px] rounded-2xl border border-black/10 bg-[#FAFAF7] flex flex-col items-center justify-center p-6">
        <div className="h-32 w-3/4 rounded-xl border border-black/10 bg-[#F0F0ED] flex items-center justify-center animate-pulse" />
        <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-[#525252]">
          Loading network topology...
        </p>
      </div>
    ),
  }
)

export function GlobalFootprintSection() {
  const [selectedClient, setSelectedClient] = useState<GlobeClient | null>(null)
  const [hoveredClient, setHoveredClient] = useState<GlobeClient | null>(null)
  const [activeRegion, setActiveRegion] = useState<string>('All')

  // Filter clients based on selected region
  const filteredClients = activeRegion === 'All'
    ? GLOBE_CLIENTS
    : GLOBE_CLIENTS.filter((c) => c.region === activeRegion)

  return (
    <section className="overflow-x-clip py-14 md:py-20 border-t border-black/10" aria-label="Global Presence">
      <div className="container">
        {/* Top Header Block matching reference image */}
        <div className="mb-10 md:mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-2xl">
            {/* Eyebrow with yellow square */}
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 bg-[#FFD600] inline-block shrink-0" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#121212]">
                Global Presence
              </span>
            </div>

            {/* Main Headline */}
            <RevealText as="h2" className="text-h2 font-bold tracking-tight text-[#121212]">
              Global teams. One digital partner.
            </RevealText>

            {/* Secondary Headline */}
            <p className="mt-2 text-lg sm:text-xl font-semibold text-[#121212]">
              Web development and AI automation shipped across 8 countries.
            </p>

            {/* Paragraph Subhead */}
            <p className="mt-2 text-sm sm:text-base text-[#525252] leading-relaxed">
              From media operations in Toronto to institutional protocol systems in Zurich, we help ambitious teams build, scale, and automate exceptional digital products.
            </p>
          </div>

          {/* Right-aligned 3 Stat Metric Cards */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 self-start lg:self-auto">
            {/* Card 1: Clients */}
            <div className="flex-1 sm:flex-initial min-w-[125px] rounded-xl border border-black/10 bg-white p-3.5 sm:p-4 flex items-center gap-3 shadow-2xs">
              <div className="h-10 w-10 rounded-full bg-[#FFD600]/15 flex items-center justify-center shrink-0">
                <Users className="h-4 w-4 text-[#121212]" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-sans text-[#121212] leading-none">
                  12+
                </p>
                <p className="mt-1 font-sans text-xs text-[#525252]">
                  Global Clients
                </p>
              </div>
            </div>

            {/* Card 2: Countries */}
            <div className="flex-1 sm:flex-initial min-w-[125px] rounded-xl border border-black/10 bg-white p-3.5 sm:p-4 flex items-center gap-3 shadow-2xs">
              <div className="h-10 w-10 rounded-full bg-[#FFD600]/15 flex items-center justify-center shrink-0">
                <MapPin className="h-4 w-4 text-[#121212]" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-sans text-[#121212] leading-none">
                  08
                </p>
                <p className="mt-1 font-sans text-xs text-[#525252]">
                  Countries
                </p>
              </div>
            </div>

            {/* Card 3: Continents */}
            <div className="flex-1 sm:flex-initial min-w-[125px] rounded-xl border border-black/10 bg-white p-3.5 sm:p-4 flex items-center gap-3 shadow-2xs">
              <div className="h-10 w-10 rounded-full bg-[#FFD600]/15 flex items-center justify-center shrink-0">
                <Globe className="h-4 w-4 text-[#121212]" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-sans text-[#121212] leading-none">
                  03
                </p>
                <p className="mt-1 font-sans text-xs text-[#525252]">
                  Continents
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Panoramic World Network Map Canvas */}
        <RevealFade y={20} duration={0.6} className="mb-10 md:mb-12">
          <GlobalNetworkMap
            selectedClientId={selectedClient?.id || null}
            hoveredClientId={hoveredClient?.id || null}
            onSelectClient={setSelectedClient}
            onHoverClient={setHoveredClient}
            activeRegion={activeRegion}
            onSelectRegion={setActiveRegion}
          />
        </RevealFade>

        {/* Bottom Client Network Section */}
        <div>
          {/* Header Row */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center">
              <span className="h-4 w-1 bg-[#FFD600] inline-block mr-2.5 rounded-full" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#121212]">
                Our Clients Around The World
              </span>
              <span className="ml-2 font-mono text-xs text-[#525252]">
                (12 across 3 continents)
              </span>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-1 font-sans text-xs font-medium text-[#121212] hover:text-[#FFD600] transition-colors"
            >
              <span>View all case studies</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* 4-column x 3-row Card Grid (exactly 12 cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredClients.map((client, index) => {
              const isSelected = selectedClient?.id === client.id
              const isHovered = hoveredClient?.id === client.id
              const idxStr = String(index + 1).padStart(2, '0')

              const cardContent = (
                <div
                  onMouseEnter={() => setHoveredClient(client)}
                  onMouseLeave={() => setHoveredClient(null)}
                  onClick={() => setSelectedClient(isSelected ? null : client)}
                  className={`group relative rounded-xl border p-4 transition-all cursor-pointer h-full flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#121212] bg-[#FFFDF0] shadow-xs'
                      : isHovered
                      ? 'border-[#121212]/30 bg-white shadow-xs'
                      : 'border-black/10 bg-white hover:border-black/25'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Index */}
                    <span className="font-mono text-xs text-[#A0A0A0] shrink-0 mt-0.5">
                      {idxStr}
                    </span>

                    {/* Client Name & Location */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-sans text-sm font-bold text-[#121212] truncate leading-tight group-hover:text-[#121212]">
                        {client.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-[#525252] font-mono mt-1">
                        <MapPin className="h-3 w-3 text-[#A0A0A0] shrink-0" />
                        <span className="truncate">{client.city}</span>
                      </div>
                    </div>
                  </div>

                    {/* Deliverable Tag */}
                  <p className="font-mono text-[10px] uppercase tracking-wider text-[#A0A0A0] truncate mt-3 pt-2.5 border-t border-black/5">
                    {client.service}
                  </p>
                </div>
              )

              if (client.url) {
                return (
                  <Link key={client.id} href={client.url} className="block h-full">
                    {cardContent}
                  </Link>
                )
              }

              return <div key={client.id} className="h-full">{cardContent}</div>
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
