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
  readonly clientLogos: Locator;
  readonly featuredWork: Locator;
  readonly techStack: Locator;
  readonly testimonialSwitcher: Locator;
  readonly blogPreviewCards: Locator;

  constructor(page: Page) {
    super(page);
    const main = page.locator('main');
    this.hero = page.locator('section#main-content');
    this.primaryCta = this.hero.getByRole('link', { name: /Talk to Us/ });
    this.secondaryCta = this.hero.getByRole('link', { name: 'See our work' });
    this.stats = page.getByRole('region', { name: 'Impact Statistics' });
    this.serviceCards = main.locator('article').filter({ has: page.locator('h3') }).filter({ hasText: 'Explore More' });
    this.clientLogos = page.locator('[aria-label="Client logos"] img');
    this.featuredWork = page.getByRole('region', { name: 'Featured Work' });
    this.techStack = page.locator('section', { hasText: 'The AI stack we actually use.' });
    this.testimonialSwitcher = page.getByRole('button', { name: /^View .* testimonial$/ });
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
