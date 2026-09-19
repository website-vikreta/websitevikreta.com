'use client'

import { WorkTestimonialsSection } from '@/components/sections/work/WorkTestimonialsSection'
import { WORK_TESTIMONIALS } from '@/lib/work-data'
import { UI_UX_TESTIMONIAL_SLUGS } from '@/app/services/uiux-design/data'

const UI_UX_TESTIMONIALS = WORK_TESTIMONIALS.filter((t) =>
  (UI_UX_TESTIMONIAL_SLUGS as readonly string[]).includes(t.slug),
)

export function UiUxTestimonialsSection() {
  return (
    <WorkTestimonialsSection
      testimonials={UI_UX_TESTIMONIALS}
      heading="What clients say about our UI/UX work"
      ariaLabel="UI/UX client testimonials"
    />
  )
}
