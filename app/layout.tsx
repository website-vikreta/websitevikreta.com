import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Navbar } from '@/components/ui/Navbar'
import './globals.css'

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
  title: 'Website Vikreta — AI-First Digital Agency',
  description:
    "You're losing hours every week to work a system could do. Website Vikreta builds AI-powered automation for digital marketing, web, and business operations.",
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
        <Navbar />
        {children}
      </body>
    </html>
  )
}
