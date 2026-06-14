import type { Metadata } from 'next'
import { Epilogue } from 'next/font/google'
import { Navbar } from '@/components/ui/Navbar'
import './globals.css'

const epilogue = Epilogue({
  variable: '--font-epilogue',
  subsets: ['latin'],
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
      className={epilogue.variable}
    >
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
