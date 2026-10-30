import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage: Page Object Model for the landing page `/` (components/home/*, content/home.ts).
 * Section order: Hero → Clients → Work → Services → Process → Why us → Numbers → Testimonials → Book call → FAQ → Blog → Contact.
 */
export class HomePage extends BasePage {
  readonly hero: Locator;
  readonly primaryCta: Locator;
  readonly secondaryCta: Locator;
  readonly stats: Locator;
  readonly serviceCards: Locator;
  readonly featuredWork: Locator;
  readonly testimonials: Locator;
  readonly blogCards: Locator;
  readonly faqs: Locator;
  readonly contactSection: Locator;
  readonly bookCall: Locator;

  constructor(page: Page) {
    super(page);
    this.hero = page.locator('section#main-content');
    this.primaryCta = this.hero.getByRole('button', { name: /Book a free audit/ }).or(this.hero.getByRole('link', { name: /Book a free audit/ })).first();
    this.secondaryCta = this.hero.getByRole('link', { name: 'See our work' });
    this.stats = page.locator('#numbers');
    this.serviceCards = page.locator('#services a.home-card-link');
    this.featuredWork = page.locator('#work');
    this.testimonials = page.locator('#testimonials');
    this.blogCards = page.locator('#blog article');
    this.faqs = page.locator('#faq details');
    this.contactSection = page.locator('#contact');
    this.bookCall = page.locator('#book-call');
  }

  async goto(): Promise<void> {
    await this.navigate('/');
  }

  /** Hero CTAs are plain server-rendered markup; wait until the primary one is visible. */
  async waitForHeroReveal(): Promise<void> {
    await this.primaryCta.waitFor({ state: 'visible' });
  }
}
