import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage: Page Object Model for `/` (components/wv/Home.tsx).
 * Section order: Hero → Band → Manifesto → Services → Results → Work → Process → Quotes → CTA.
 */
export class HomePage extends BasePage {
  readonly hero: Locator;
  readonly primaryCta: Locator;
  readonly secondaryCta: Locator;
  readonly stats: Locator;
  readonly serviceRows: Locator;
  readonly featuredWork: Locator;
  readonly processSteps: Locator;
  readonly testimonials: Locator;
  readonly ctaSection: Locator;

  constructor(page: Page) {
    super(page);
    this.hero = page.locator('section#top');
    this.primaryCta = this.hero.getByRole('link', { name: /Book a free Consultation/i }).first();
    this.secondaryCta = this.hero.getByRole('link', { name: /See the work/i }).first();
    this.stats = page.locator('section[aria-label="Results"]');
    this.serviceRows = page.locator('#services a.wv-svc-row');
    this.featuredWork = page.locator('#work');
    this.processSteps = page.locator('#process .wv-step');
    this.testimonials = page.locator('section[aria-label="What clients say"]');
    this.ctaSection = page.locator('#contact');
  }

  async goto(): Promise<void> {
    await this.navigate('/');
  }

  /** Hero CTAs are plain server-rendered markup; wait until the primary one is visible. */
  async waitForHeroReveal(): Promise<void> {
    await this.primaryCta.waitFor({ state: 'visible' });
  }
}
