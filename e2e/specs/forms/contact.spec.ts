import { test, expect } from '../../fixtures/test';
import { TEST_LEAD } from '../../fixtures/test-data';
import { PRODUCTION_VIEWPORTS } from '../../helpers/responsive-viewports';
import { expectAllLinksWork, expectCleanFullScroll } from '../../helpers/page-checks';

test.describe('Contact Page: Form Validations, Submission & Links', { tag: '@forms' }, () => {
  test.beforeEach(async ({ contactPage }) => {
    await contactPage.goto();
  });

  test('Page loads at /contact and displays contact form with all required inputs', async ({
    contactPage,
  }) => {
    await expect(contactPage.getH1()).toBeVisible();
    await expect(contactPage.nameInput).toBeVisible();
    await expect(contactPage.jobOrWebsiteInput).toBeVisible();
    await expect(contactPage.emailInput).toBeVisible();
    await expect(contactPage.phoneInput).toBeVisible();
    await expect(contactPage.submitButton).toBeVisible();
  });

  test('Submitting blank form triggers validation errors on all fields', async ({ contactPage }) => {
    await contactPage.submit();

    await expect(contactPage.nameError).toBeVisible();
    await expect(contactPage.jobError).toBeVisible();
    await expect(contactPage.emailError).toBeVisible();
    await expect(contactPage.phoneError).toBeVisible();
  });

  test('Whitespace-only input is rejected as empty', async ({ contactPage }) => {
    await contactPage.fillForm({
      name: '   ',
      jobOrWebsite: '   ',
      email: '   ',
      phone: '   ',
    });

    await contactPage.submit();

    await expect(contactPage.nameError).toBeVisible();
    await expect(contactPage.jobError).toBeVisible();
    await expect(contactPage.emailError).toBeVisible();
    await expect(contactPage.phoneError).toBeVisible();
  });

  test('Invalid email and invalid phone numbers are rejected', async ({ contactPage }) => {
    await contactPage.fillForm({
      name: TEST_LEAD.name,
      jobOrWebsite: TEST_LEAD.jobOrWebsite,
      email: 'invalid-email-address',
      phone: '1234',
    });

    await contactPage.submit();

    await expect(contactPage.emailError).toBeVisible();
    await expect(contactPage.phoneError).toBeVisible();
  });

  test('Social and email contact links exist with valid href protocols', async ({ page }) => {
    const mailtoLinks = page.locator('a[href^="mailto:"]');
    const mailtoCount = await mailtoLinks.count();
    expect(mailtoCount).toBeGreaterThanOrEqual(1);

    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});

test.describe('Contact Page: Health & Responsive', () => {
  test('scrolling the whole page throws no JS errors and no same-origin request fails', { tag: '@critical' }, async ({ page, basePage, baseURL }) => {
    await expectCleanFullScroll(page, basePage, '/contact', baseURL!);
  });

  test('every link on the page works', { tag: '@critical' }, async ({ page, contactPage }) => {
    await contactPage.goto();
    await expectAllLinksWork(page);
  });

  for (const vp of PRODUCTION_VIEWPORTS.filter((v) => [320, 768, 1440].includes(v.width))) {
    test(`no horizontal overflow at ${vp.name}, and the form is fully usable`, async ({ page, contactPage }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await contactPage.goto();
      await contactPage.verifyNoHorizontalOverflow();
      await contactPage.submitButton.scrollIntoViewIfNeeded();
      await expect(contactPage.submitButton).toBeInViewport();
    });
  }
});
