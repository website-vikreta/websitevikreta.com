/**
 * Mobile horizontal overflow check — run against local dev server.
 * Usage: node scripts/verify-horizontal-overflow.mjs [baseUrl]
 */
import { chromium, devices } from 'playwright'

const BASE = process.argv[2] ?? 'http://localhost:3000'

const CASES = [
  { route: '/', modalHash: null },
  { route: '/services/web-development', modalHash: '#get-quote' },
  { route: '/services/ai-automations', modalHash: '#book-audit' },
  { route: '/services/digital-marketing', modalHash: '#marketing-audit' },
  { route: '/services/web-mobile-app-development', modalHash: '#start-project' },
  { route: '/work', modalHash: null },
  { route: '/about', modalHash: null },
  { route: '/contact', modalHash: null },
  { route: '/blog', modalHash: null },
]

function overflowPx(page) {
  return page.evaluate(() => {
    const doc = document.documentElement
    const body = document.body
    return Math.max(
      0,
      doc.scrollWidth - doc.clientWidth,
      body.scrollWidth - body.clientWidth,
    )
  })
}

async function openModalByHash(page, hash) {
  const link = page.locator(`a[href="${hash}"], button[href="${hash}"]`).first()
  if ((await link.count()) === 0) return { opened: false, note: `no ${hash} trigger` }

  await link.scrollIntoViewIfNeeded()
  await link.click({ timeout: 10000 })
  await page.waitForSelector('.audit-modal-content', { state: 'visible', timeout: 10000 })
  await page.waitForTimeout(500)
  return { opened: true }
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    ...devices['iPhone 13'],
    baseURL: BASE,
  })
  const page = await context.newPage()

  const results = []
  let failed = 0

  for (const { route, modalHash } of CASES) {
    await page.goto(route, { waitUntil: 'networkidle', timeout: 120000 })
    await page.waitForTimeout(1000)

    const pageOverflow = await overflowPx(page)
    results.push({ route, state: 'page', overflowPx: pageOverflow })
    if (pageOverflow > 1) failed++

    if (modalHash) {
      try {
        const { opened, note } = await openModalByHash(page, modalHash)
        if (opened) {
          const modalOverflow = await overflowPx(page)
          results.push({ route, state: 'modal-open', overflowPx: modalOverflow, hash: modalHash })
          if (modalOverflow > 1) failed++
          await page.keyboard.press('Escape')
          await page.waitForTimeout(400)
        } else {
          results.push({ route, state: 'modal-open', overflowPx: null, note })
        }
      } catch (err) {
        results.push({ route, state: 'modal-open', overflowPx: null, note: String(err.message ?? err) })
      }
    }
  }

  await browser.close()

  console.log('\nHorizontal overflow audit (iPhone 13 viewport)\n')
  console.log('Route'.padEnd(42), 'State'.padEnd(14), 'Overflow (px)')
  console.log('-'.repeat(70))
  for (const row of results) {
    const px =
      row.overflowPx === null || row.overflowPx === undefined
        ? (row.note ?? 'skipped')
        : String(row.overflowPx)
    const bad = typeof row.overflowPx === 'number' && row.overflowPx > 1 ? '  ← FAIL' : ''
    console.log(row.route.padEnd(42), row.state.padEnd(14), px + bad)
  }
  console.log('-'.repeat(70))
  console.log(
    failed === 0
      ? 'PASS — no horizontal overflow > 1px on tested routes'
      : `FAIL — ${failed} case(s) with overflow > 1px`,
  )
  process.exit(failed === 0 ? 0 : 1)
}

main().catch((err) => {
  console.error(err)
  process.exit(2)
})
