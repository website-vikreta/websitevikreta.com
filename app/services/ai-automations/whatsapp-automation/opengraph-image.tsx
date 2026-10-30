import { ImageResponse } from 'next/og'

export const alt = 'WhatsApp Automation for Shopify and D2C Stores | Website Vikreta'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: '#FAFAF7',
          color: '#111',
        }}
      >
        <div style={{ fontSize: 28, color: '#25d366', fontWeight: 700 }}>Website Vikreta</div>
        <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, marginTop: 24 }}>
          Your store on WhatsApp. Every step of the sale.
        </div>
        <div style={{ fontSize: 32, color: '#555', marginTop: 32 }}>
          Cart recovery · COD confirmation · Order updates · AI support
        </div>
      </div>
    ),
    size,
  )
}
