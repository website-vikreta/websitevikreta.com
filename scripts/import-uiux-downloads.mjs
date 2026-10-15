import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const downloads = 'D:\\Downloads'
const convert = join(root, 'scripts', 'convert-to-webp.mjs')

/** Workflow + optional pain WebP from Downloads. Pain pinboard uses pain/*. */
const map = [
  ['ChatGPT Image Sep 19, 2026, 03_12_25 PM.png', 'public/services/uiux-design/pain/landing-friction.webp', 1600],
  ['ChatGPT Image Sep 19, 2026, 03_13_47 PM.png', 'public/services/uiux-design/pain/checkout-friction.webp', 1600],
  ['ChatGPT Image Sep 19, 2026, 03_17_02 PM.png', 'public/services/uiux-design/pain/handoff-friction.webp', 1600],
  ['ChatGPT Image Sep 19, 2026, 03_21_28 PM.png', 'public/services/uiux-design/workflow/flow-map.webp', 1200],
  ['ChatGPT Image Sep 19, 2026, 03_22_45 PM.png', 'public/services/uiux-design/workflow/design-canvas.webp', 1440],
  ['ChatGPT Image Sep 19, 2026, 05_01_04 PM.png', 'public/services/uiux-design/system/spacing/space-card-01.webp', 600],
  ['ChatGPT Image Sep 19, 2026, 05_01_55 PM.png', 'public/services/uiux-design/system/spacing/space-card-02.webp', 600],
  ['ChatGPT Image Sep 19, 2026, 05_03_12 PM.png', 'public/services/uiux-design/system/spacing/space-card-03.webp', 600],
  ['ChatGPT Image Sep 19, 2026, 05_04_02 PM.png', 'public/services/uiux-design/system/auto-layout/product-card.webp', 800],
]

for (const [file, out, w] of map) {
  const input = join(downloads, file)
  const output = join(root, out)
  execFileSync(process.execPath, [convert, input, output, String(w)], { stdio: 'inherit' })
}
