import { DotGrid } from '@/components/ui/DotGrid'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsCounters } from '@/components/sections/StatsCounters'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { ClientLogosSection } from '@/components/sections/ClientLogosSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWorkSection'
import { TechnologiesSection } from '@/components/sections/TechnologiesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { BlogPreviewSection } from '@/components/sections/BlogPreviewSection'
import { CTASection } from '@/components/sections/CTASection'
import { FooterSection } from '@/components/sections/FooterSection'

export default function Home() {
  return (
    <main>
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
      <CTASection
        badge={{ text: "Let's talk" }}
        title="Let's build something intelligent together"
        description="Free consultation. No commitment. Whether it's a website, an app, or a full AI audit — we'll listen, map it out, and tell you exactly what we'd do."
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
