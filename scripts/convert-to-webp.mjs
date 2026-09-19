/**
 * Convert PNG/JPEG → WebP (quality 82, sitewide default).
 * Usage: node scripts/convert-to-webp.mjs <input> <output> [width]
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

const [input, output, widthArg] = process.argv.slice(2)
if (!input || !output) {
  console.error('Usage: node scripts/convert-to-webp.mjs <input> <output> [maxWidth]')
  process.exit(1)
}

const maxWidth = widthArg ? Number(widthArg) : undefined
await mkdir(dirname(output), { recursive: true })

let pipeline = sharp(input)
if (maxWidth) pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true })
await pipeline.webp({ quality: 82 }).toFile(output)
console.log(`Wrote ${output}`)
