import { Page, Locator, expect } from '@playwright/test';

/**
 * NavbarComponent: Page Object Model for the wv sitewide header,
 * mega-menu dropdowns, scroll states and mobile drawer.
 */
export class NavbarComponent {
  readonly page: Page;
  readonly header: Locator;
  readonly nav: Locator;
  readonly logo: Locator;
  readonly servicesTrigger: Locator;
  readonly servicesDropdown: Locator;
  readonly contactCta: Locator;
  readonly hamburgerButton: Locator;
  readonly mobileDrawer: Locator;
  readonly mobileDrawerCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header.wv-header').first();
    this.nav = this.header.locator('nav.wvn-nav').first();
    this.logo = this.header.locator('a.wv-logo').first();
    this.servicesTrigger = this.header.locator('button[data-nav="services"]').first();
    this.servicesDropdown = this.header.locator('#wvn-services');
    this.contactCta = this.header.locator('.wv-bar-cta a[href="/contact"]').first();
    this.hamburgerButton = this.header.locator('button.wv-burger').first();
    this.mobileDrawer = page.locator('#wv-drawer');
    this.mobileDrawerCloseButton = this.hamburgerButton; // the same burger toggles to "Close menu"
  }

  async openServicesDropdown(): Promise<void> {
    await this.servicesTrigger.hover();
    await expect(this.servicesDropdown).toBeVisible();
  }

  /** The mega menu shows one service panel at a time; switch tabs before checking a service's links. */
  async selectServiceTab(title: string): Promise<Locator> {
    await this.servicesDropdown.getByRole('tab', { name: title }).click();
    const panel = this.page.locator('#wv-tabpanel');
    await expect(panel).toBeVisible();
    return panel;
  }

  async getServiceLink(href: string): Promise<Locator> {
    return this.page.locator(`#wv-tabpanel a[href="${href}"]`).first();
  }

  async openMobileDrawer(): Promise<void> {
    await this.hamburgerButton.click();
    await expect(this.mobileDrawer).toBeVisible();
    await expect(this.hamburgerButton).toHaveAttribute('aria-expanded', 'true');
  }

  async closeMobileDrawer(): Promise<void> {
    await this.mobileDrawerCloseButton.click();
    await expect(this.mobileDrawer).toHaveCount(0);
    await expect(this.hamburgerButton).toHaveAttribute('aria-expanded', 'false');
  }

  async expandMobileServices(): Promise<void> {
    const servicesToggle = this.mobileDrawer.locator('button.wv-acc-btn', { hasText: 'Services' }).first();
    await servicesToggle.click();
    await expect(servicesToggle).toHaveAttribute('aria-expanded', 'true');
  }

  async verifyScrolledState(isScrolled: boolean): Promise<void> {
    if (isScrolled) {
      await expect(this.header).toHaveClass(/is-solid/);
    } else {
      await expect(this.header).not.toHaveClass(/is-solid/);
    }
  }
}
