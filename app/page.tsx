import { HeroSection } from '@/components/sections/HeroSection'
import { StatsCounters } from '@/components/sections/StatsCounters'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { ServicesSection } from '@/components/sections/ServicesSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsCounters />
      <ProcessSection />
      <ServicesSection />
    </main>
  )
}
