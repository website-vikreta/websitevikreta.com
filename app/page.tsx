import { DotGrid } from '@/components/ui/DotGrid'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsCounters } from '@/components/sections/StatsCounters'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWorkSection'
import { TechnologiesSection } from '@/components/sections/TechnologiesSection'
import { CTASection } from '@/components/sections/CTASection'
import { FooterSection } from '@/components/sections/FooterSection'

export default function Home() {
  return (
    <main>
      <DotGrid global />
      <HeroSection />
      <StatsCounters />
      <ProcessSection />
      <ServicesSection />
      <FeaturedWorkSection />
      <TechnologiesSection />
      <CTASection
        badge={{ text: "Ready when you are" }}
        title="Let's build something intelligent together"
        description="Tell us what you're working on — we'll show you how AI-first development can get you there faster."
        action={{
          text: "Book a Call",
          href: "/contact"
        }}
        withGlow={true}
      />
      <FooterSection />
    </main>
  )
}
