import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ConditionalNavbar } from '@/components/ui/ConditionalNavbar'
import { GoToTop } from '@/components/ui/GoToTop'
import { CTASection } from '@/components/sections/CTASection'
import { FooterSection } from '@/components/sections/FooterSection'
import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'

const utile = localFont({
  src: [
    { path: './fonts/Utile-Light.otf',          weight: '300', style: 'normal' },
    { path: './fonts/Utile-LightItalic.otf',    weight: '300', style: 'italic' },
    { path: './fonts/Utile-Book.otf',           weight: '350', style: 'normal' },
    { path: './fonts/Utile-BookItalic.otf',     weight: '350', style: 'italic' },
    { path: './fonts/Utile-Regular.otf',        weight: '400', style: 'normal' },
    { path: './fonts/Utile-Italic.otf',         weight: '400', style: 'italic' },
    { path: './fonts/Utile-Medium.otf',         weight: '500', style: 'normal' },
    { path: './fonts/Utile-MediumItalic.otf',   weight: '500', style: 'italic' },
    { path: './fonts/Utile-Semibold.otf',       weight: '600', style: 'normal' },
    { path: './fonts/Utile-SemiboldItalic.otf', weight: '600', style: 'italic' },
    { path: './fonts/Utile-Bold.otf',           weight: '700', style: 'normal' },
    { path: './fonts/Utile-BoldItalic.otf',     weight: '700', style: 'italic' },
    { path: './fonts/Utile-Black.otf',          weight: '900', style: 'normal' },
    { path: './fonts/Utile-BlackItalic.otf',    weight: '900', style: 'italic' },
  ],
  variable: '--font-utile',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://stage.websitevikreta.com'),
  title: 'Website Vikreta — AI-First Digital Agency',
  description:
    "You're losing hours every week to work a system could do. Website Vikreta builds AI-powered automation for digital marketing, web, and business operations.",
  icons: {
    icon: '/logo/websitevikreta-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={utile.variable}
    >
      <body>
        <ConditionalNavbar />
        {children}
        {/* <GoToTop /> */}
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}

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
      </body>
    </html>
  )
}
