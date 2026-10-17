import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  reactCompiler: true,
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
        destination: '/services/ai-automations',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
