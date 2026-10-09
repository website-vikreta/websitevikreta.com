import { test, expect } from './fixtures/test';

test.describe('Global Navigation, Scroll States & Mobile Drawer', () => {
  test('Desktop Header contains logo, navigation items, dropdown services, and Contact CTA', async ({
    page,
    basePage,
    nav,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    // Not '/': the home page hides the desktop links until the first scroll.
    await basePage.navigate('/about');

    // Header and Logo
    await expect(nav.header).toBeVisible();
    await expect(nav.logo).toBeVisible();

    // Services Dropdown interaction
    await nav.openServicesDropdown();

    const serviceLinks = [
      '/services/ai-automations',
      '/services/web-development',
      '/services/web-mobile-app-development',
      '/services/uiux-design',
      '/services/digital-marketing',
    ];
    for (const href of serviceLinks) {
      const link = await nav.getServiceLink(href);
      await expect(link).toBeVisible();
    }

    // Top-level nav links
    await expect(nav.header.locator('a[href="/work"]').first()).toBeVisible();
    await expect(nav.header.locator('a[href="/about"]').first()).toBeVisible();
    await expect(nav.header.locator('a[href="/blog"]').first()).toBeVisible();
    await expect(nav.header.locator('a[href="/careers"]').first()).toBeVisible();

    // Contact CTA
    await expect(nav.contactCta).toBeVisible();
    await expect(nav.contactCta).toContainText('Contact Us');
  });

  test('Navbar transforms height and background on scroll', async ({
    page,
    basePage,
    nav,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await basePage.navigate('/');

    // Initial state: h-20
    await nav.verifyScrolledState(false);

    // Scroll down >40px
    await basePage.scrollTo(100);

    // Scrolled state: h-14 with backdrop
    await nav.verifyScrolledState(true);

    // Scroll back to top
    await basePage.scrollTo(0);
    await nav.verifyScrolledState(false);
  });

  test('Mobile navigation drawer opens, expands services accordion, and closes cleanly', async ({
    page,
    basePage,
    nav,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await basePage.navigate('/services');

    // Verify no horizontal overflow in mobile viewport
    await basePage.verifyNoHorizontalOverflow();

    // Open drawer
    await nav.openMobileDrawer();

    // Expand services accordion
    await nav.expandMobileServices();
    await expect(nav.mobileDrawer.locator('a[href="/services/ai-automations"]').first()).toBeVisible();
    await expect(nav.mobileDrawer.locator('a[href="/services/web-development"]').first()).toBeVisible();

    // Close drawer
    await nav.closeMobileDrawer();
  });

  test('Home page hides desktop nav links until the first scroll', async ({ page, basePage, nav }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await basePage.navigate('/');
    const links = nav.header.locator('ul').first();
    await expect(links).toHaveClass(/opacity-0/);
    await basePage.scrollTo(100);
    await expect(links).toHaveClass(/opacity-100/);
  });

  test('Home page: invisible desktop nav links are not reachable by keyboard Tab', async ({ page, basePage, nav }) => {
    // Known site bug: hidden links still take keyboard focus (Navbar.tsx needs `invisible`).
    // test.fail() keeps the suite green while the bug is open, and starts failing once it's fixed.
    test.fail();
    await page.setViewportSize({ width: 1440, height: 900 });
    await basePage.navigate('/');

    const hiddenList = nav.header.locator('ul').first();
    await expect(hiddenList).toHaveClass(/opacity-0/);

    // Tab through the first 15 stops; none may land inside the hidden list.
    const focusedInsideHiddenList: string[] = [];
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press('Tab');
      const hit = await hiddenList.evaluate((ul) => {
        const el = document.activeElement;
        return el && ul.contains(el) ? (el.textContent ?? '').trim() : null;
      });
      if (hit) focusedInsideHiddenList.push(hit);
    }

    expect(
      focusedInsideHiddenList,
      'Keyboard focus landed on invisible nav links (add visibility:hidden or inert while hidden)'
    ).toEqual([]);
  });

  test('Footer renders all key links and legal navigation', async ({
    page,
    basePage,
  }) => {
    await basePage.navigate('/');

    const footer = page.getByRole('region', { name: 'Footer' });
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();

    // Check legal links
    await expect(footer.locator('a[href*="/legal/privacy-policy"]').first()).toBeVisible();
    await expect(footer.locator('a[href*="/legal/terms-and-conditions"]').first()).toBeVisible();
    await expect(footer.locator('a[href*="/legal/disclaimer"]').first()).toBeVisible();
  });
});
