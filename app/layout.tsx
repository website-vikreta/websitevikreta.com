import type { Metadata } from 'next'
import { Suspense } from 'react'
import localFont from 'next/font/local'
import { ConditionalNavbar } from '@/components/ui/ConditionalNavbar'
import { ConditionalShell } from '@/components/ui/ConditionalShell'
import { ScrollManager } from '@/components/ui/ScrollManager'
import { RouteProgressBar } from '@/components/ui/RouteProgressBar'
import { AuditModalProvider } from '@/components/ui/AuditModalProvider'
import { CTASection } from '@/components/sections/CTASection'
import { FooterSection } from '@/components/sections/FooterSection'
import './globals.css'
import Script from 'next/script'
import { SITE_URL } from '@/config/site'

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
  metadataBase: new URL(SITE_URL),
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
        <Suspense fallback={null}>
          <RouteProgressBar />
        </Suspense>
        <ScrollManager />
        <AuditModalProvider>
          <ConditionalNavbar />
          {children}
        </AuditModalProvider>
        {/* <GoToTop /> */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            {/* Was strategy="lazyOnload" to shave TBT off mobile Lighthouse (the reason @next/third-parties'
                GoogleAnalytics, which hardcodes afterInteractive, wasn't used). But lazyOnload only fires
                once the browser goes truly idle, and this site's continuous scroll/motion animations rarely
                let that happen — GA4 Realtime and Clarity were both missing real concurrent visitors because
                the script just never loaded in time. afterInteractive trades a little TBT back for gtag
                actually firing; still hand-rolled (not @next/third-parties) so it stays behind the hostname
                gate below instead of loading on stage/localhost too.

                The hostname check below (same guard as middleware.ts's isProduction) has to live
                inside the script, not as a server-side conditional — gating this render with
                headers()/cookies() would force the whole app out of static generation. GA_ID is set
                in .env.local for local testing convenience, so without this, localhost and the
                stage deploy both fire real pageviews/events into production GA4. */}
            <Script
              id="ga-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  if (window.location.hostname === 'www.websitevikreta.com') {
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                  }
                `,
              }}
            />
            <Script
              id="ga-src"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
          </>
        )}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script
            id="clarity-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                if (window.location.hostname === 'www.websitevikreta.com') {
                  (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
                }
              `,
            }}
          />
        )}

      <ConditionalShell>
        <CTASection
          title="Ready when you are."
          description="Free call. No commitment. Tell us what you're building, or what isn't working, and we'll tell you what we'd actually do about it. Not a pitch. Just a conversation."
          action={{
            text: "Book a call",
            href: "/contact"
          }}
          withGlow={true}
        />
        <FooterSection />
      </ConditionalShell>
      </body>
    </html>
  )
}
