import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  reactCompiler: true,
  // OG routes read persona PNGs + the Anton font from disk at request time.
  outputFileTracingIncludes: {
    '/services/ai/**/opengraph-image*': ['./app/services/ai/_og/**', './app/fonts/Anton-Regular.ttf'],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/studio/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ]
  },
  // Temporary until the /services hub page ships; remove then, and restore the
  // /services sitemap entry + "Services" breadcrumb level on app/services/*/page.tsx
  async redirects() {
    return [
      {
        source: '/services',
        destination: '/services/ai',
        permanent: false,
      },
      // Renamed AI Automations -> Applied AI (2026-11-10). Covers the hub and every branch/product page.
      {
        source: '/services/ai-automations/:path*',
        destination: '/services/ai/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
