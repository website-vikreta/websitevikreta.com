import { HomePreloader } from '@/components/ui/HomePreloader'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsCounters } from '@/components/sections/StatsCounters'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { ClientLogosSection } from '@/components/sections/ClientLogosSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWorkSection'
import { TechnologiesSection } from '@/components/sections/TechnologiesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { BlogPreviewSection } from '@/components/sections/BlogPreviewSection'
import { DotGrid } from '@/components/ui/DotGrid'

export default function Home() {
  return (
    <main>
      <HomePreloader />
      <DotGrid global />
      <HeroSection />
      <StatsCounters />
      <ProcessSection />
      <ClientLogosSection />
      <ServicesSection />
      <FeaturedWorkSection />
      <TechnologiesSection />
      <TestimonialsSection />
      <BlogPreviewSection />
    </main>
  )
}
