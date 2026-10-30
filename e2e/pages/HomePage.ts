import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage: Page Object Model for the landing page `/`.
 * Section order: Hero → Stats → Services → Client logos → Work → Tech stack → Testimonials → Blog.
 */
export class HomePage extends BasePage {
  readonly hero: Locator;
  readonly primaryCta: Locator;
  readonly secondaryCta: Locator;
  readonly stats: Locator;
  readonly serviceCards: Locator;
  readonly featuredWork: Locator;
  readonly testimonials: Locator;
  readonly blogPreviewCards: Locator;

  constructor(page: Page) {
    super(page);
    const main = page.locator('main');
    this.hero = page.locator('section#main-content');
    this.primaryCta = this.hero.getByRole('link', { name: /Talk to Us/ });
    this.secondaryCta = this.hero.getByRole('link', { name: 'See our work' });
    this.stats = page.getByRole('region', { name: 'Impact Statistics' });
    // The grid renders a hover-grow bento on lg+ and a sticky stack below it, each with all five cards;
    // only the layout for the current viewport is visible, so count that one.
    this.serviceCards = main
      .locator('article')
      .filter({ has: page.locator('h3') })
      .filter({ hasText: 'Explore More' })
      .filter({ visible: true });
    this.featuredWork = page.getByRole('region', { name: 'Featured Work' });
    this.testimonials = page.locator('section', { has: page.getByRole('heading', { name: 'Work that moved numbers.' }) });
    this.blogPreviewCards = page.locator('section', { hasText: 'behind the work.' }).locator('article');
  }

  async goto(): Promise<void> {
    await this.navigate('/');
  }

  /** Waits for the hero word-reveal to finish so CTAs are clickable and stable. */
  async waitForHeroReveal(): Promise<void> {
    await this.primaryCta.waitFor({ state: 'visible' });
  }
}
