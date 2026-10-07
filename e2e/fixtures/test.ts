import { test as base, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { NavbarComponent } from '../pages/NavbarComponent';
import { AuditModalComponent } from '../pages/AuditModalComponent';
import { ContactPage } from '../pages/ContactPage';
import { ServicesPage } from '../pages/ServicesPage';
import { BlogPage } from '../pages/BlogPage';
import { HomePage } from '../pages/HomePage';
import { setupEmailJSMock } from '../helpers/mock-emailjs';

/**
 * Custom Playwright test fixture extending base test with
 * Page Object Models and automatic network safety guards.
 */
interface ExtendedFixtures {
  basePage: BasePage;
  nav: NavbarComponent;
  auditModal: AuditModalComponent;
  contactPage: ContactPage;
  servicesPage: ServicesPage;
  blogPage: BlogPage;
  homePage: HomePage;
}

export const test = base.extend<ExtendedFixtures>({
  page: async ({ page }, use) => {
    // 1. Auto-mock EmailJS API calls across all tests
    await setupEmailJSMock(page);

    // 2. Production safety: monitor console for unhandled Next.js runtime exceptions
    page.on('pageerror', (err) => {
      console.warn(`[Uncaught Page Error]: ${err.message}`);
    });

    await use(page);
  },

  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  nav: async ({ page }, use) => {
    await use(new NavbarComponent(page));
  },

  auditModal: async ({ page }, use) => {
    await use(new AuditModalComponent(page));
  },

  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },

  servicesPage: async ({ page }, use) => {
    await use(new ServicesPage(page));
  },

  blogPage: async ({ page }, use) => {
    await use(new BlogPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect };
