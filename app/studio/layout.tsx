import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sanity Studio | Website Vikreta',
  robots: { index: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
      {children}
    </div>
  )
}
