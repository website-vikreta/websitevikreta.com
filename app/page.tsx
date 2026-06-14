import { HeroSection } from '@/components/sections/HeroSection'
import { StatsCounters } from '@/components/sections/StatsCounters'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWorkSection'
import { TechnologiesSection } from '@/components/sections/TechnologiesSection'
import { CTASection } from '@/components/sections/CTASection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsCounters />
      <ProcessSection />
      <ServicesSection />
      <FeaturedWorkSection />
      <TechnologiesSection />
      <CTASection />
    </main>
  )
}
