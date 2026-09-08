/**
 * Smoke-test major routes + modal overflow on mobile viewport.
 * Usage: node scripts/verify-site-smoke.mjs [baseUrl]
 */
import { chromium, devices } from 'playwright'

const BASE = process.argv[2] ?? 'http://localhost:3000'

const ROUTES = [
  '/',
  '/about',
  '/contact',
  '/work',
  '/work/case-studies',
  '/services',
  '/services/web-development',
  '/services/ai-automations',
  '/services/digital-marketing',
  '/services/web-mobile-app-development',
  '/services/uiux-design',
  '/blog',
  '/faq',
  '/careers',
  '/legal/privacy-policy',
]

const MODAL_CASES = [
  { route: '/services/ai-automations', hash: '#book-audit' },
  { route: '/services/digital-marketing', hash: '#marketing-audit' },
  { route: '/services/web-mobile-app-development', hash: '#start-project' },
]

function overflowPx(page) {
  return page.evaluate(() =>
    Math.max(
      0,
      document.documentElement.scrollWidth - document.documentElement.clientWidth,
      document.body.scrollWidth - document.body.clientWidth,
    ),
  )
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ ...devices['iPhone 13'], baseURL: BASE })
  const page = await context.newPage()

  const failures = []

  for (const route of ROUTES) {
    try {
      const res = await page.goto(route, { waitUntil: 'networkidle', timeout: 120000 })
      const status = res?.status() ?? 0
      await page.waitForTimeout(600)
      const overflow = await overflowPx(page)
      const title = await page.title()
      const hasMain = await page.locator('main, [id="main-content"]').first().isVisible().catch(() => false)

      if (status >= 400) failures.push(`${route}: HTTP ${status}`)
      if (overflow > 1) failures.push(`${route}: horizontal overflow ${overflow}px`)
      if (!title) failures.push(`${route}: empty document title`)
      if (!hasMain) failures.push(`${route}: no visible main landmark`)

      console.log(`${status === 200 ? 'OK' : 'ERR'} ${route} (${status}) overflow=${overflow}px`)
    } catch (err) {
      failures.push(`${route}: ${err.message}`)
      console.log(`ERR ${route}: ${err.message}`)
    }
  }

  for (const { route, hash } of MODAL_CASES) {
    try {
      await page.goto(route, { waitUntil: 'networkidle', timeout: 120000 })
      await page.waitForTimeout(500)
      const link = page.locator(`a[href="${hash}"]`).first()
      if ((await link.count()) === 0) {
        console.log(`SKIP ${route} modal ${hash} (no trigger)`)
        continue
      }
      await link.scrollIntoViewIfNeeded()
      await link.click()
      await page.waitForSelector('.audit-modal-content', { state: 'visible', timeout: 10000 })
      await page.waitForTimeout(400)
      const overflow = await overflowPx(page)
      if (overflow > 1) failures.push(`${route} modal: horizontal overflow ${overflow}px`)
      console.log(`${overflow <= 1 ? 'OK' : 'ERR'} ${route} modal overflow=${overflow}px`)
      await page.keyboard.press('Escape')
      await page.waitForTimeout(300)
    } catch (err) {
      failures.push(`${route} modal: ${err.message}`)
      console.log(`ERR ${route} modal: ${err.message}`)
    }
  }

  // Web-dev specific: proof CTA + support autoplay
  try {
    await page.goto('/services/web-development', { waitUntil: 'networkidle', timeout: 120000 })
    await page.locator('a[href="#proof"]').first().click()
    await page.waitForTimeout(2500)
    const proofTop = await page.evaluate(() => document.getElementById('proof')?.getBoundingClientRect().top ?? 9999)
    if (proofTop > 200) failures.push(`/services/web-development #proof: scroll missed (top=${proofTop})`)
    else console.log(`OK /services/web-development #proof scroll top=${proofTop.toFixed(0)}px`)

    await page.evaluate(() => document.getElementById('support-heading')?.scrollIntoView())
    await page.waitForTimeout(2500)
    const stepA = await page.locator('button[aria-current="step"]').first().textContent()
    await page.waitForTimeout(2600)
    const stepB = await page.locator('button[aria-current="step"]').first().textContent()
    if (stepA === stepB) failures.push('/services/web-development support: autoplay stalled')
    else console.log('OK /services/web-development support autoplay')
  } catch (err) {
    failures.push(`/services/web-development checks: ${err.message}`)
  }

  await browser.close()

  console.log('\n' + '-'.repeat(60))
  if (failures.length === 0) {
    console.log('PASS — all site smoke checks passed')
    process.exit(0)
  }
  console.log(`FAIL — ${failures.length} issue(s):`)
  failures.forEach((f) => console.log(`  • ${f}`))
  process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(2)
})
