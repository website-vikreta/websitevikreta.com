import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  reactCompiler: true,
  experimental: {
    // Inlines CSS into <style> in <head> instead of a render-blocking
    // <link rel="stylesheet">. Trade-off: no cross-page stylesheet caching,
    // but that fits a Tailwind/atomic CSS bundle (small, same on every page).
    inlineCss: false,
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
};

export default nextConfig;
