import type { Locator, Page } from '@playwright/test';
import { test, expect } from '../../fixtures/test';
import { TEST_LEAD } from '../../fixtures/test-data';
import { PRODUCTION_VIEWPORTS } from '../../helpers/responsive-viewports';
import { expectAllLinksWork, expectCleanFullScroll } from '../../helpers/page-checks';

const PATH = '/services/ai-automations/whatsapp-automation';
const OVERFLOW_WIDTHS = [320, 390, 768, 1440];

/**
 * WhatsApp Automation page: health, structure, the lead popups, the inline
 * demo form, the RTO calculator and the FAQ. EmailJS is mocked in fixtures/test.ts, so no test sends a
 * real email.
 */

// Match on the card's own <h3>: the eCommerce card also says "Everything in WA Starter".
const packageCard = (page: Page, name: string): Locator => page.locator('#packages article').filter({ has: page.getByRole('heading', { name, exact: true }) });

test.describe('WhatsApp Automation: Structure & Health', { tag: '@critical' }, () => {
  test('renders with HTTP 200, one H1 and the right title', { tag: '@smoke' }, async ({ page }) => {
    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);

    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('WhatsApp automation');
    await expect(page).toHaveTitle(/WhatsApp Automation/i);
  });

  test('scrolling the whole page throws no JS errors and no same-origin request fails', async ({ page, basePage, baseURL }) => {
    await expectCleanFullScroll(page, basePage, PATH, baseURL!);
  });

  test('every link on the page works', async ({ page, basePage }) => {
    await basePage.navigate(PATH);
    await basePage.scrollThroughPage();
    await expectAllLinksWork(page);
  });
});

test.describe('WhatsApp Automation: Content', () => {
  test('has every main section in the page', async ({ page }) => {
    await page.goto(PATH);

    for (const heading of [
      /Where buyers drop off/i,
      /Plug every leak/i,
      /Calculate what returned COD orders cost/i,
      /Why WhatsApp outperforms email and SMS/i,
      /Live in 7 to 14 days/i,
      /What D2C brands report/i,
    ]) {
      await expect(page.getByRole('heading', { name: heading })).toHaveCount(1);
    }
  });

  test('exposes Service, HowTo, BreadcrumbList and FAQPage structured data', async ({ page }) => {
    await page.goto(PATH);

    const graph = await page.$$eval('script[type="application/ld+json"]', (nodes) =>
      nodes.flatMap((n) => {
        const json = JSON.parse(n.textContent ?? '{}');
        return (json['@graph'] ?? [json]).map((item: { '@type': string }) => item['@type']);
      }),
    );
    expect(graph).toEqual(expect.arrayContaining(['Service', 'HowTo', 'BreadcrumbList', 'FAQPage']));
  });
});

test.describe('WhatsApp Automation: Demo popup', () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigate(PATH);
  });

  test('the hero "Book a Platform Demo" opens the popup', async ({ page, auditModal }) => {
    await page.locator('main').getByRole('link', { name: 'Book a Platform Demo' }).first().click();
    await expect(auditModal.modalContent).toBeVisible();
    await expect(auditModal.modalContent.locator('form').getByRole('heading', { name: 'Book a Platform Demo' })).toBeVisible();
  });

  test('the Subject is still editable, and the popup closes with Escape', async ({ page, auditModal }) => {
    await page.locator('main').getByRole('link', { name: 'Book a Platform Demo' }).first().click();
    await auditModal.subjectInput.fill('Shopify store, 300 orders a day');
    await expect(auditModal.subjectInput).toHaveValue('Shopify store, 300 orders a day');
    await auditModal.closeViaEscape();
  });

  test('submitting the popup sends the lead to EmailJS and shows the success message', async ({ page, auditModal }) => {
    await page.locator('main').getByRole('link', { name: 'Book a Platform Demo' }).first().click();
    await auditModal.fillForm({
      firstName: TEST_LEAD.firstName,
      lastName: TEST_LEAD.lastName,
      email: TEST_LEAD.email,
      phone: TEST_LEAD.phone,
      subject: TEST_LEAD.subject,
      message: TEST_LEAD.message,
    });

    const sent = page.waitForRequest(/api\.emailjs\.com/);
    await auditModal.submit();
    await auditModal.verifySuccessState();

    const request = await sent;
    expect(await (await request.response())?.text(), 'EmailJS was not mocked').toBe('OK');
    expect(request.postDataJSON().template_params).toMatchObject({
      name: TEST_LEAD.name,
      email: TEST_LEAD.email,
      service_type: TEST_LEAD.subject,
      message: TEST_LEAD.message,
    });
  });

});

test.describe('WhatsApp Automation: Packages', () => {
  test.beforeEach(async ({ basePage, page }) => {
    await basePage.navigate(PATH);
    await page.locator('#packages').scrollIntoViewIfNeeded();
  });

  for (const plan of ['WA Starter', 'WA eCommerce']) {
    test(`"Get a quote" on ${plan} opens the popup`, async ({ page, auditModal }) => {
      await packageCard(page, plan).getByRole('link', { name: /Get a quote/ }).click();
      await expect(auditModal.modalContent).toBeVisible();
    });
  }

  test('"Talk to us" opens the popup', async ({ page, auditModal }) => {
    await page.locator('#packages').getByRole('link', { name: /Talk to us/ }).click();
    await expect(auditModal.modalContent).toBeVisible();
  });

  test('both plans are shown with their feature lists', async ({ page }) => {
    for (const plan of ['WA Starter', 'WA eCommerce']) {
      await expect(packageCard(page, plan)).toBeVisible();
      await expect(packageCard(page, plan).locator('li').first()).toBeVisible();
    }
    await expect(packageCard(page, 'WA eCommerce')).toContainText('Abandoned cart recovery');
  });
});

test.describe('WhatsApp Automation: Inline demo form', () => {
  test.beforeEach(async ({ basePage, page }) => {
    await basePage.navigate(PATH);
    await page.locator('#whatsapp-demo').scrollIntoViewIfNeeded();
  });

  test('submitting it with empty fields shows the required-field errors and sends nothing', async ({ page }) => {
    let sent = 0;
    page.on('request', (r) => {
      if (r.url().includes('api.emailjs.com')) sent++;
    });
    await page.locator('#whatsapp-demo button[type="submit"]').click();

    await expect(page.locator('#whatsapp-demo').getByText('Required').first()).toBeVisible();
    expect(sent).toBe(0);
  });

  test('a filled form submits (mocked), shows the success message', async ({ page }) => {
    const root = page.locator('#whatsapp-demo');
    for (const [name, value] of Object.entries({ firstName: TEST_LEAD.firstName, lastName: TEST_LEAD.lastName, email: TEST_LEAD.email, phone: TEST_LEAD.phone })) {
      await root.locator(`input[name="${name}"]`).fill(value);
    }
    await root.locator('input[name="subject"]').fill(TEST_LEAD.subject);
    await root.locator('textarea[name="message"]').fill(TEST_LEAD.message);

    const sent = page.waitForRequest(/api\.emailjs\.com/);
    await root.locator('button[type="submit"]').click();
    await expect(root.getByText("Thanks, we'll get back to you within 24 hours.")).toBeVisible();

    const request = await sent;
    expect(request.postDataJSON().template_params).toMatchObject({ email: TEST_LEAD.email, service_type: TEST_LEAD.subject });
  });
});

test.describe('WhatsApp Automation: RTO calculator', () => {
  test.beforeEach(async ({ basePage, page }) => {
    await basePage.navigate(PATH);
    await page.getByRole('heading', { name: /Calculate what returned COD orders cost/i }).scrollIntoViewIfNeeded();
  });

  test('starts at the default numbers (120 orders a day, 30% RTO, ₹250 per parcel = ₹2,70,000 a month)', async ({ page }) => {
    await expect(page.getByText('₹2,70,000', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Per month' })).toHaveAttribute('aria-pressed', 'true');
  });

  test('"Per year" multiplies the loss by 12', async ({ page }) => {
    await page.getByRole('button', { name: 'Per year' }).click();
    await expect(page.getByRole('button', { name: 'Per year' })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByText('₹32,40,000', { exact: true })).toBeVisible();
  });

  test('changing the orders per day updates the loss', async ({ page }) => {
    // 60 orders a day instead of 120 halves the loss: 60 x 30 x 30% x ₹250 = ₹1,35,000
    await page.getByLabel('COD orders per day value').fill('60');
    await expect(page.getByText('₹1,35,000', { exact: true })).toBeVisible();
  });
});

test.describe('WhatsApp Automation: FAQ', () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigate(PATH);
  });

  const questions = (page: Page) => page.locator('main button[aria-expanded]');

  test('opening a question shows its answer and opening another closes the first', async ({ page }) => {
    const q = questions(page);
    await q.first().scrollIntoViewIfNeeded();
    await expect(q.first()).toHaveAttribute('aria-expanded', 'false');

    await q.nth(0).click();
    await expect(q.nth(0)).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator(`[id="${await q.nth(0).getAttribute('aria-controls')}"]`)).toBeVisible();

    await q.nth(1).click();
    await expect(q.nth(1)).toHaveAttribute('aria-expanded', 'true');
    await expect(q.nth(0)).toHaveAttribute('aria-expanded', 'false');
  });

  test('FAQPage structured data matches the questions on the page', async ({ page }) => {
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const faq = schemas
      .flatMap((s) => {
        const json = JSON.parse(s);
        return json['@graph'] ?? [json];
      })
      .find((d: { '@type': string }) => d['@type'] === 'FAQPage');
    expect(faq, 'No FAQPage JSON-LD').toBeTruthy();

    expect(faq.mainEntity.length).toBe(await questions(page).count());
  });
});

test.describe('WhatsApp Automation: Responsive', () => {
  for (const vp of PRODUCTION_VIEWPORTS.filter((v) => OVERFLOW_WIDTHS.includes(v.width))) {
    test(`no horizontal overflow at ${vp.name}`, async ({ page, basePage }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await basePage.navigate(PATH);
      await basePage.scrollThroughPage();
      await basePage.verifyNoHorizontalOverflow();
    });
  }

  test('on mobile the sticky "Book a Platform Demo" bar opens the popup', async ({ page, basePage, auditModal }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await basePage.navigate(PATH);
    await page.evaluate(() => window.scrollTo(0, 1200));

    const sticky = page.getByRole('link', { name: /platform demo/i }).filter({ visible: true }).last();
    await sticky.click();
    await expect(auditModal.modalContent).toBeVisible();
  });
});
