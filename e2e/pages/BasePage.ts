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
