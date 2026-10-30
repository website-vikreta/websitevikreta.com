import { Page, Locator, expect } from '@playwright/test';

/**
 * NavbarComponent: Page Object Model for the sitewide global navigation,
 * desktop dropdowns, scroll-compression states, and mobile drawer.
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
    this.header = page.locator('header').first();
    this.nav = page.locator('nav[aria-label="Main navigation"]').first();
    this.logo = this.header.locator('a[href="/"]').first();
    this.servicesTrigger = this.header.locator('button.nav-link:has-text("Services")').first();
    this.servicesDropdown = this.header.locator('.dropdown-panel');
    this.contactCta = this.header.locator('a[href="/contact"]').first();
    this.hamburgerButton = page.locator('button[aria-label="Open navigation"], button[aria-controls="mobile-drawer"]').first();
    this.mobileDrawer = page.locator('#mobile-drawer');
    this.mobileDrawerCloseButton = this.mobileDrawer.locator('button[aria-label="Close navigation"]').first();
  }

  async openServicesDropdown(): Promise<void> {
    await this.servicesTrigger.hover();
    await expect(this.servicesDropdown).toBeVisible();
  }

  async getServiceLink(href: string): Promise<Locator> {
    return this.header.locator(`a[href="${href}"]`).first();
  }

  async openMobileDrawer(): Promise<void> {
    await this.hamburgerButton.click();
    await expect(this.mobileDrawer).toBeVisible();
    await expect(this.mobileDrawer).toHaveClass(/translate-x-0/);
  }

  async closeMobileDrawer(): Promise<void> {
    await this.mobileDrawerCloseButton.click();
    await expect(this.mobileDrawer).toHaveClass(/translate-x-full/);
  }

  async expandMobileServices(): Promise<void> {
    const servicesToggle = this.mobileDrawer.locator('button:has-text("Services")').first();
    await servicesToggle.click();
  }

  async verifyScrolledState(isScrolled: boolean): Promise<void> {
    if (isScrolled) {
      await expect(this.nav).toHaveClass(/h-14/);
    } else {
      await expect(this.nav).toHaveClass(/h-20/);
    }
  }
}
