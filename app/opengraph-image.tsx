import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Website Vikreta — AI-First Web Agency in Pune'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '1200px',
          height: '630px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Left section — cream brand content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '720px',
            height: '630px',
            backgroundColor: '#FAF9F6',
            padding: '60px',
          }}
        >
          {/* Logo */}
          <img
            src="/logo/websitevikreta-logo-horizontal.png"
            width={120}
            alt=""
            style={{ marginBottom: '32px' }}
          />

          {/* Top label */}
          <div
            style={{
              display: 'flex',
              fontSize: '16px',
              color: '#888888',
              letterSpacing: '0.15em',
              fontWeight: 400,
            }}
          >
            WEB AGENCY · PUNE · INDIA
          </div>

          {/* Brand name */}
          <div
            style={{
              display: 'flex',
              fontSize: '72px',
              color: '#0A0A0A',
              fontWeight: 700,
              lineHeight: 1.1,
              marginTop: '32px',
            }}
          >
            Website Vikreta
          </div>

          {/* Tagline */}
          <div
            style={{
              display: 'flex',
              fontSize: '28px',
              color: '#0A0A0A',
              fontWeight: 400,
              marginTop: '16px',
            }}
          >
            AI-First Web Agency
          </div>

          {/* Descriptor */}
          <div
            style={{
              display: 'flex',
              fontSize: '18px',
              color: '#555555',
              marginTop: '24px',
            }}
          >
            Websites · AI Automations · Digital Growth
          </div>

          {/* Bottom accent bar */}
          <div
            style={{
              display: 'flex',
              width: '80px',
              height: '4px',
              backgroundColor: '#FFBF00',
              marginTop: '48px',
            }}
          />
        </div>

        {/* Right section — yellow accent block */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '480px',
            height: '630px',
            backgroundColor: '#FFBF00',
            position: 'relative',
          }}
        >
          {/* Decorative "V" — watermark */}
          <div
            style={{
              display: 'flex',
              fontSize: '240px',
              color: '#0A0A0A',
              fontWeight: 700,
              opacity: 0.12,
            }}
          >
            V
          </div>

          {/* vikreta.com label — centered overlay */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: '20px',
                color: '#0A0A0A',
                fontWeight: 500,
                opacity: 0.6,
              }}
            >
              vikreta.com
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
