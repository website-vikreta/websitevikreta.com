import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export const SERVICE_ROUTES = [
  { path: '/services/ai-automations', label: 'AI Automations' },
  { path: '/services/web-mobile-app-development', label: 'Web & Mobile App Development' },
  { path: '/services/web-development', label: 'Web Development' },
  { path: '/services/uiux-design', label: 'UI/UX Design' },
  { path: '/services/digital-marketing', label: 'Digital Marketing' },
];

/**
 * ServicesPage: Page Object Model for navigating and verifying
 * service landing pages, section hierarchies, and legacy redirects.
 */
export class ServicesPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async gotoService(pathStr: string): Promise<void> {
    await this.navigate(pathStr);
  }

  async verifyPermanentRedirect(sourcePath: string, expectedDestination: string): Promise<void> {
    await this.page.goto(sourcePath);
    await this.page.waitForURL(`**${expectedDestination}`, { timeout: 15000 });
    expect(this.page.url()).toContain(expectedDestination);
    await expect(this.getH1()).toBeVisible();
  }
}
