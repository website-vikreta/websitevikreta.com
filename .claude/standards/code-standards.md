# Code Standards — Website Vikreta

## Rules That Are Not Negotiable
- TypeScript strict mode. No `any`. No `@ts-ignore` without a comment explaining why.
- `next/image` for every image. No `<img>` tags.
- `next/font` for every font. No CDN font links.
- No inline styles except for dynamic values (e.g. GSAP targets).
- CSS custom properties for all design tokens. No hardcoded hex values in component files.
- Accessibility: every interactive element is keyboard-navigable.

---

## File Naming
```
components/sections/HeroSection.tsx       PascalCase for components
components/ui/Button.tsx                  PascalCase
lib/gsap/useScrollReveal.ts              camelCase for hooks/utils
app/(marketing)/about/page.tsx           App Router convention
styles/globals.css                       kebab-case for style files
```

## Component Structure
```tsx
// 1. Imports (external → internal → styles)
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

// 2. Types
interface HeroSectionProps {
  headline: string
  subhead?: string
}

// 3. Component
export function HeroSection({ headline, subhead }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP: always kill on cleanup
    const ctx = gsap.context(() => {
      // animations here
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref}>
      {/* content */}
    </section>
  )
}
```

## GSAP Rules
```tsx
// Always use gsap.context() — prevents memory leaks
// Always return ctx.revert() in cleanup
// Register plugins once in a central file (lib/gsap/index.ts)
// Never register plugins inside components
```

```ts
// lib/gsap/index.ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

export { gsap, ScrollTrigger, SplitText }
```

## Accessibility Requirements
- `<html lang="en">` always
- Skip to main content link (visually hidden, focusable)
- All images: meaningful `alt` text or `alt=""` for decorative
- Color contrast: text on `#000000` must pass AA (white passes, `#444` fails for small text)
- `prefers-reduced-motion`: wrap all non-essential animation
- Focus indicators: never remove outline without replacing it
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>` — not everything is a `<div>`

## Performance Patterns
```tsx
// Lazy load heavy components
const ThreeScene = dynamic(() => import('@/components/ThreeScene'), {
  ssr: false,
  loading: () => <div className="scene-placeholder" />
})

// Suspense for blog/dynamic content
<Suspense fallback={<BlogSkeleton />}>
  <BlogList />
</Suspense>

// Font loading — Epilogue only
import { Epilogue } from 'next/font/google'
const epilogue = Epilogue({ variable: '--font-epilogue', subsets: ['latin'] })

// In layout.tsx
<html className={epilogue.variable}>
// Use font-sans Tailwind class or var(--font-epilogue) in CSS
```

## State Management
- Local UI state: `useState`
- Server state / fetching: React Server Components + `fetch` with revalidation
- No Redux. No Zustand unless proven necessary.
- Form state: React Hook Form

## Error Handling
```tsx
// Every page should have an error boundary
// app/[route]/error.tsx — Next.js built-in

// API calls always try/catch with user-visible fallback
try {
  const data = await fetchData()
} catch (error) {
  console.error('[ComponentName]:', error)
  return <ErrorState message="Content unavailable" />
}
```

## Git Commit Convention
```
feat: add hero section animation
fix: correct CLS on blog image load
perf: lazy load Three.js scene
seo: add FAQ schema to services page
style: update button hover to accent color
```