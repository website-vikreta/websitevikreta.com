'use client'

import './globals.css'

// Replaces the root layout when the layout itself crashes, so no providers/fonts here — plain elements only.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main className="container flex flex-col justify-center min-h-svh max-w-[720px] mx-auto">
          <h1 className="font-bold text-7xl md:text-9xl leading-[1] mb-8">500</h1>
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">Something went wrong</h2>
          <div className="flex flex-wrap gap-4">
            <button type="button" onClick={reset} className="btn btn-primary py-[0.8125rem] px-[1.625rem]">
              Try again
            </button>
            {/* Full reload on purpose: the root layout crashed, client nav can't recover it. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className="btn btn-ghost py-[0.8125rem] px-[1.625rem]">Visit Home</a>
          </div>
        </main>
      </body>
    </html>
  )
}
