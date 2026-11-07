import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const ogSize = { width: 1200, height: 630 }

const png = async (id: string) =>
  `data:image/png;base64,${(await readFile(join(process.cwd(), 'app', 'services', 'ai-automations', '_og', `${id}-front.png`))).toString('base64')}`

// personas: one id for a branch/product card, all three for the hub.
export async function ogImage(kicker: string, title: string, personas: string[] = []) {
  const [font, ...imgs] = await Promise.all([readFile(join(process.cwd(), 'app', 'fonts', 'Anton-Regular.ttf')), ...personas.map(png)])
  const h = personas.length > 1 ? 300 : 480
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', background: '#f6f4ee', color: '#121212', display: 'flex', fontFamily: 'Anton' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, padding: 72 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28 }}>
            <div style={{ width: 18, height: 18, borderRadius: 9, background: '#fac800' }} />
            Website Vikreta · {kicker}
          </div>
          <div style={{ fontSize: title.length > 40 || personas.length > 1 ? 76 : 100, lineHeight: 1, textTransform: 'uppercase', letterSpacing: -2 }}>{title}</div>
          <div style={{ width: 220, height: 12, background: '#fac800' }} />
        </div>
        {imgs.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', width: personas.length > 1 ? 560 : 380, background: '#fac800', position: 'relative' }}>
            {imgs.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} height={h} width={Math.round(h * 0.69)} alt="" style={{ marginLeft: i ? -40 : 0 }} />
            ))}
            <div style={{ position: 'absolute', top: 32, right: 32, background: '#121212', color: '#fac800', fontSize: 28, padding: '6px 16px', borderRadius: 8 }}>AI</div>
          </div>
        )}
      </div>
    ),
    { ...ogSize, fonts: [{ name: 'Anton', data: font, weight: 400, style: 'normal' }] },
  )
}
