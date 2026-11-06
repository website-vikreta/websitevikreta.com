import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * BasePage: Foundational Page Object Model for Website Vikreta
 *
 * Implements enterprise-grade UI stability:
 * 1. Web Font Readiness (`document.fonts.ready`) to eliminate layout-shift false failures.
 * 2. Next.js React hydration wait guards.
 * 3. GSAP animation and scroll-settle utilities.
 * 4. Responsive horizontal overflow detector (critical for mobile-first Awwwards QA).
 * 5. Diagnostic screenshot and console error capture.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a path and wait for DOM, fonts, and hydration to stabilize.
   */
  async navigate(pathStr: string): Promise<void> {
    await this.page.goto(pathStr);
    await this.waitForStability();
  }

  /**
   * Ensures typography, layout shifts, and React hydration have completed.
   */
  async waitForStability(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');

    // Wait for React hydration: React tags hydrated DOM nodes with a `__reactFiber$…` key.
    // Without this, a test can scroll before ScrollManager's mount-time jumpScroll(0) runs
    // and gets reset to the top (seen as flaky navbar scroll tests in headed Chrome).
    await this.page.waitForFunction(() => {
      const el = document.querySelector('header') ?? document.body;
      return Object.keys(el).some((k) => k.startsWith('__reactFiber'));
    });

    // Wait for Epilogue web fonts to fully load to prevent layout-shift locator drift
    try {
      await this.page.evaluate(() => document.fonts.ready);
    } catch {
      // Font face API fallback
    }

    // Brief breather for GSAP timeline mount
    await this.page.waitForTimeout(200);
  }

  /**
   * Scrolls top-to-bottom in viewport-sized steps so every lazy section, lazy image and
   * scroll-triggered reveal mounts. Re-reads the height each step: lazy sections grow the page.
   */
  async scrollThroughPage(): Promise<void> {
    for (let y = 0; y < (await this.page.evaluate(() => document.documentElement.scrollHeight)); y += 600) {
      await this.scrollTo(y);
    }
  }

  /**
   * Waits until React has hydrated this specific element. Needed for controls inside a Suspense
   * boundary that streams in after the header: before hydration a select/button looks ready but
   * has no handlers attached, so the interaction silently does nothing.
   */
  async waitForHydrated(locator: Locator): Promise<void> {
    await expect
      .poll(() => locator.evaluate((el) => Object.keys(el).some((k) => k.startsWith('__reactFiber'))), {
        message: 'Element never hydrated',
      })
      .toBe(true);
  }

  /**
   * Asserts that no horizontal scrollbar or element overflow exists at the current viewport.
   * A critical non-negotiable check for mobile viewports (320px–430px).
   */
  async verifyNoHorizontalOverflow(): Promise<void> {
    const overflowInfo = await this.page.evaluate(() => {
      const scrollWidth = document.documentElement.scrollWidth;
      const innerWidth = window.innerWidth;
      return {
        hasOverflow: scrollWidth > innerWidth,
        scrollWidth,
        innerWidth,
        difference: scrollWidth - innerWidth,
      };
    });

    expect(
      overflowInfo.hasOverflow,
      `Horizontal overflow detected! Page scrollWidth (${overflowInfo.scrollWidth}px) exceeds window innerWidth (${overflowInfo.innerWidth}px) by ${overflowInfo.difference}px.`
    ).toBe(false);
  }

  /**
   * Smoothly scrolls to a given vertical offset and waits for sticky headers/ScrollTrigger.
   */
  async scrollTo(y: number): Promise<void> {
    await this.page.evaluate((targetY) => window.scrollTo({ top: targetY, behavior: 'smooth' }), y);
    await this.page.waitForTimeout(400);
  }

  /**
   * Primary H1 heading locator
   */
  getH1(): Locator {
    return this.page.locator('h1').first();
  }

  /**
   * Page title string
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Metadata helper (description, og:*, twitter:*)
   */
  async getMetaContent(selector: string): Promise<string | null> {
    const meta = this.page.locator(selector).first();
    if ((await meta.count()) === 0) return null;
    return meta.getAttribute('content');
  }

  /**
   * Canonical URL link helper
   */
  async getCanonicalHref(): Promise<string | null> {
    const link = this.page.locator('link[rel="canonical"]').first();
    if ((await link.count()) === 0) return null;
    return link.getAttribute('href');
  }

  /**
   * Captures a high-resolution screenshot stored in test-results/screenshots/
   */
  async captureScreenshot(testName: string, fullPage: boolean = false): Promise<string> {
    const screenshotDir = path.join(process.cwd(), 'test-results', 'screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    const cleanName = testName.replace(/[^a-z0-9_-]/gi, '_').toLowerCase();
    const filePath = path.join(screenshotDir, `${cleanName}_${Date.now()}.png`);
    await this.page.screenshot({ path: filePath, fullPage });
    return filePath;
  }
}
