import { test, expect } from '../../fixtures/test';

test.describe('Global Navigation, Scroll States & Mobile Drawer', () => {
  test('Desktop header contains logo, nav items, services mega-menu and booking CTA', async ({
    page,
    basePage,
    nav,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await basePage.navigate('/about');

    await expect(nav.header).toBeVisible();
    await expect(nav.logo).toBeVisible();
    await expect(nav.logo).toHaveAttribute('aria-label', 'Website Vikreta home');

    // The mega menu shows one service panel at a time; switch tabs to check each service.
    await nav.openServicesDropdown();
    await expect(nav.servicesDropdown.getByRole('tab')).toHaveCount(5);
    for (const [tab, href] of [
      ['Applied AI', '/services/ai'],
      ['Web Design & Development', '/services/web-development'],
      ['CRMs & Web Applications', '/services/apps-crm'],
      ['UI/UX Design', '/services/uiux-design'],
      ['SEO & GEO', '/services/digital-marketing'],
    ]) {
      const panel = await nav.selectServiceTab(tab);
      await expect(panel.locator(`a[href="${href}"]`).first()).toBeVisible();
    }

    // Top-level nav links, plus Studio/Careers in the Company dropdown.
    await expect(nav.header.locator('a[href="/work"]').first()).toBeVisible();
    await expect(nav.header.locator('a[href="/blog"]').first()).toBeVisible();
    await expect(nav.header.locator('a[href="/services/ai"]').first()).toBeVisible();
    await nav.header.locator('button[data-nav="company"]').hover();
    await expect(nav.header.locator('#wvn-company a[href="/about"]').first()).toBeVisible();
    await expect(nav.header.locator('#wvn-company a[href="/careers"]').first()).toBeVisible();

    await expect(nav.contactCta).toBeVisible();
    await expect(nav.contactCta).toContainText('Book a free call');
  });

  test('Header turns solid after the first scroll and transparent at the top', async ({
    page,
    basePage,
    nav,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await basePage.navigate('/');

    await nav.verifyScrolledState(false);
    await basePage.scrollTo(100);
    await nav.verifyScrolledState(true);
    await basePage.scrollTo(0);
    await nav.verifyScrolledState(false);
  });

  test('Header auto-hides while scrolling down and reappears on scroll up', async ({
    page,
    basePage,
    nav,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await basePage.navigate('/');

    await expect(nav.header).toHaveCSS('transform', 'none');
    await basePage.scrollTo(700);
    await expect.poll(() => nav.header.evaluate((el) => getComputedStyle(el).transform)).not.toBe('none');
    await basePage.scrollTo(300);
    await expect.poll(() => nav.header.evaluate((el) => getComputedStyle(el).transform)).toBe('none');
  });

  test('Mobile navigation drawer opens, expands services accordion, and closes cleanly', async ({
    page,
    basePage,
    nav,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await basePage.navigate('/services');

    await basePage.verifyNoHorizontalOverflow();
    await nav.openMobileDrawer();
    await nav.expandMobileServices();
    await expect(nav.mobileDrawer.locator('a[href="/services/ai"]').first()).toBeVisible();
    await expect(nav.mobileDrawer.locator('a[href="/services/web-development"]').first()).toBeVisible();
    await nav.closeMobileDrawer();
  });

  test('Escape closes an open services panel and returns focus to its trigger', async ({
    page,
    basePage,
    nav,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await basePage.navigate('/about');

    await nav.servicesTrigger.click();
    await expect(nav.servicesDropdown).toBeVisible();
    // Let the header's 90ms hover-intent timer fire before Escape, so it cannot reopen the panel.
    await page.waitForTimeout(150);
    await page.keyboard.press('Escape');
    await expect(nav.servicesDropdown).toHaveCount(0);
    await expect(nav.servicesTrigger).toBeFocused();
  });

  test('Footer renders all key links and legal navigation', async ({ page, basePage }) => {
    await basePage.navigate('/');

    const footer = page.getByRole('contentinfo');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();

    await expect(footer.locator('a[href*="/legal/privacy-policy"]').first()).toBeVisible();
    await expect(footer.locator('a[href*="/legal/terms-and-conditions"]').first()).toBeVisible();
    await expect(footer.locator('a[href*="/legal/disclaimer"]').first()).toBeVisible();
  });
});
