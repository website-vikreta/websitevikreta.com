import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { PRODUCTION_VIEWPORTS } from './helpers/responsive-viewports';

const TARGET_PAGES = [
  { name: 'home', path: '/' },
  { name: 'services', path: '/services' },
  { name: 'service_ai_automations', path: '/services/ai-automations' },
  { name: 'service_apps_crm', path: '/services/web-mobile-app-development' },
  { name: 'service_web_dev', path: '/services/web-development' },
  { name: 'service_ui_ux', path: '/services/uiux-design' },
  { name: 'service_digital_marketing', path: '/services/digital-marketing' },
  { name: 'about', path: '/about' },
  { name: 'work', path: '/work' },
  { name: 'blog', path: '/blog' },
  { name: 'contact', path: '/contact' },
  { name: 'careers', path: '/careers' },
];

async function captureVisualQA() {
  const outputDir = path.join(process.cwd(), 'test-results', 'visual-qa');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('================================================================');
  console.log('🚀 WEBSITE VIKRETA - HIGH-RES VISUAL QA & OVERFLOW AUDIT');
  console.log('================================================================');
  console.log(`Auditing ${TARGET_PAGES.length} routes across ${PRODUCTION_VIEWPORTS.length} responsive viewports...`);
  console.log(`Output Directory: ${outputDir}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

  let totalScreenshots = 0;
  let totalOverflowIssues = 0;

  try {
    for (const target of TARGET_PAGES) {
      console.log(`\n📸 Auditing Route: ${target.name} (${target.path})`);
      await page.goto(`${baseUrl}${target.path}`, { waitUntil: 'domcontentloaded', timeout: 30000 });

      // Wait for typography and layout stabilization
      try {
        await page.evaluate(() => document.fonts.ready);
      } catch {}
      await page.waitForTimeout(300);

      for (const vp of PRODUCTION_VIEWPORTS) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.waitForTimeout(200);

        // Verify horizontal overflow (crucial for mobile-first QA)
        const overflow = await page.evaluate(() => {
          const scrollWidth = document.documentElement.scrollWidth;
          const innerWidth = window.innerWidth;
          return {
            hasOverflow: scrollWidth > innerWidth,
            diff: scrollWidth - innerWidth,
          };
        });

        const statusIcon = overflow.hasOverflow ? '⚠️ [OVERFLOW]' : '✓ [CLEAN]';
        if (overflow.hasOverflow) {
          totalOverflowIssues++;
          console.warn(`  ${statusIcon} ${vp.name}: Exceeds width by +${overflow.diff}px`);
        } else {
          console.log(`  ${statusIcon} ${vp.name}`);
        }

        const safePageName = target.name.replace(/[^a-z0-9_-]/gi, '_');
        const safeVpName = vp.name.replace(/[^a-z0-9_-]/gi, '_');
        const filename = `${safePageName}_${safeVpName}.png`;
        const filePath = path.join(outputDir, filename);

        await page.screenshot({ path: filePath, fullPage: false });
        totalScreenshots++;
      }
    }

    console.log('\n================================================================');
    console.log('📊 VISUAL QA AUDIT COMPLETE');
    console.log('================================================================');
    console.log(`Total Screenshots Captured: ${totalScreenshots}`);
    console.log(`Horizontal Overflow Issues: ${totalOverflowIssues}`);
    console.log(`Results saved in: ${outputDir}`);
    console.log('================================================================');
  } catch (err) {
    console.error('Visual QA run encountered an error:', err instanceof Error ? err.message : err);
  } finally {
    await browser.close();
  }
}

captureVisualQA().catch((err) => {
  console.error('Fatal execution error in captureVisualQA:', err);
  process.exit(1);
});
