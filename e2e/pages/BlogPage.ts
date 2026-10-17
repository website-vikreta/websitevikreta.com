import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * BlogPage: Page Object Model for the Blog directory,
 * debounced search bar, and taxonomy post feeds.
 */
export class BlogPage extends BasePage {
  readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('input[aria-label="Search articles"]');
  }

  async gotoBlog(): Promise<void> {
    await this.navigate('/blog');
  }

  async gotoSearch(): Promise<void> {
    await this.navigate('/blog/search');
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.page.waitForURL(new RegExp(`query=${encodeURIComponent(query)}|query=${query}`), { timeout: 10000 });
  }
}
