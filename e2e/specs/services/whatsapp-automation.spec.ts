import { Page } from '@playwright/test';
import { test, expect } from '../../fixtures/test';
import { PRODUCTION_VIEWPORTS } from '../../helpers/responsive-viewports';
import { expectAllLinksWork, expectCleanFullScroll, expectSectionOrder, submitInlineWvLeadForm } from '../../helpers/page-checks';

const PATH = '/services/ai/whatsapp-automation';
const OVERFLOW_WIDTHS = [320, 390, 768, 1440];

/**
 * WhatsApp & Chat Automation branch page (content/ai/branches/whatsapp-automation.ts).
 * The page uses the wv inline lead form and native <details> FAQ; EmailJS is mocked in fixtures/test.ts.
 */

const HEADINGS = [
  'Reply to every lead in seconds.',
  'What Arjun handles',
  'Before and after',
  'Sound like your week?',
  'Works with your tools',
  'Pairs well with',
  'Keep reading',
  'Questions people ask',
];

const faqs = (page: Page) => page.locator('#faq details');

test.describe('WhatsApp Automation: Structure & Health', { tag: '@critical' }, () => {
  test('renders with HTTP 200, one H1 and the right title', { tag: '@smoke' }, async ({ page }) => {
    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);

    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('Reply to every lead in seconds.');
    await expect(page).toHaveTitle(/WhatsApp & SMS Automation/i);
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
  test('every main section renders in the designed order', async ({ page, basePage }) => {
    await basePage.navigate(PATH);
    await expectSectionOrder(page, HEADINGS);
  });

  test('the hero CTA prefills the inline form instead of opening a popup', async ({ page, basePage }) => {
    await basePage.navigate(PATH);
    await page.locator('main').getByRole('link', { name: /Get my plan/ }).first().click();
    await expect(page).toHaveURL(/#lead$/);
    await expect(page.locator('#lead input[name="want"]')).toHaveValue(/whatsapp-automation/);
  });

  test('products without a page prefill the form; two have real product pages', async ({ page, basePage }) => {
    await basePage.navigate(PATH);
    const rows = page.locator('#products a.wv-ax-row');
    await expect(rows).toHaveCount(7);
    await expect(page.locator('#products a.wv-ax-row[href^="/services/ai/whatsapp-automation/"]')).toHaveCount(2);
    await expect(page.locator('#products a[href="#lead"]')).toHaveCount(5);

    await page.locator('#products a[href="#lead"]').first().click();
    await expect(page).toHaveURL(/#lead$/);
    await expect(page.locator('#lead input[name="want"]')).toHaveValue(/WhatsApp customer support/);
  });

  test('the FAQ expands a question in place', async ({ page, basePage }) => {
    await basePage.navigate(PATH);
    const items = faqs(page);
    await expect(items).toHaveCount(8);
    const first = items.first();
    await first.scrollIntoViewIfNeeded();
    await expect(first).not.toHaveAttribute('open', '');
    await first.locator('summary').click();
    await expect(first).toHaveAttribute('open', '');
    await expect(first.locator('p')).toBeVisible();
  });

  test('exposes Service, ItemList, BreadcrumbList and FAQPage structured data', async ({ page }) => {
    await page.goto(PATH);
    const graph = await page.$$eval('script[type="application/ld+json"]', (nodes) =>
      nodes.flatMap((n) => {
        const json = JSON.parse(n.textContent ?? '{}');
        return (json['@graph'] ?? [json]).map((item: { '@type': string }) => item['@type']);
      }),
    );
    expect(graph).toEqual(expect.arrayContaining(['Service', 'ItemList', 'BreadcrumbList', 'FAQPage']));
  });

  test('FAQPage structured data matches the questions on the page', async ({ page }) => {
    await page.goto(PATH);
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const faq = schemas
      .flatMap((s) => {
        const json = JSON.parse(s);
        return json['@graph'] ?? [json];
      })
      .find((d: { '@type': string }) => d['@type'] === 'FAQPage');
    expect(faq, 'No FAQPage JSON-LD').toBeTruthy();
    expect(faq.mainEntity.length).toBe(await faqs(page).count());
  });
});

test.describe('WhatsApp Automation: Inline lead form', () => {
  test.beforeEach(async ({ basePage, page }) => {
    await basePage.navigate(PATH);
    await page.locator('#lead').scrollIntoViewIfNeeded();
  });

  test('submitting empty fields shows errors and sends nothing', async ({ page }) => {
    let sent = 0;
    page.on('request', (r) => {
      if (r.url().includes('api.emailjs.com')) sent++;
    });
    // "want" is prefilled by the page; clear it so its required-field error is exercised too.
    await page.locator('#lead input[name="want"]').fill('');
    await page.locator('#lead button[type="submit"]').click();

    await expect(page.locator('#lead').getByText('Enter your name')).toBeVisible();
    await expect(page.locator('#lead').getByText('Enter a valid work email')).toBeVisible();
    await expect(page.locator('#lead').getByText('Tell us what to automate')).toBeVisible();
    expect(sent).toBe(0);
  });

  test('a filled form submits (mocked) and shows "Got it."', async ({ page }) => {
    await submitInlineWvLeadForm(page, page.locator('#lead'));
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

  test('on mobile the hero CTA and WhatsApp chat link are visible', async ({ page, basePage }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await basePage.navigate(PATH);
    await expect(page.locator('main').getByRole('link', { name: /Get my plan/ }).first()).toBeInViewport();
    await expect(page.locator('main').getByRole('link', { name: /Chat on WhatsApp/ }).first()).toBeVisible();
  });
});
