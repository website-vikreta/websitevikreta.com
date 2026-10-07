import { test, expect } from './fixtures/test';

test.describe('Contact Page: Form Validations, Submission & Links', () => {
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
      name: 'Aman',
      jobOrWebsite: 'Web App',
      email: 'invalid-email-address',
      phone: '1234',
    });

    await contactPage.submit();

    await expect(contactPage.emailError).toBeVisible();
    await expect(contactPage.phoneError).toBeVisible();
  });

  test('Happy Path: Submitting valid form sends mock EmailJS and displays success message', async ({
    contactPage,
  }) => {
    await contactPage.fillForm({
      name: 'Aman Sharma',
      jobOrWebsite: 'Custom E-commerce Store',
      email: 'aman.sharma@example.com',
      phone: '+91 9823012345',
    });

    await contactPage.submit();
    await contactPage.verifySuccessState();

    // Click "Submit another request" to reset the form
    await contactPage.reset();
    await expect(contactPage.nameInput).toHaveValue('');
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
