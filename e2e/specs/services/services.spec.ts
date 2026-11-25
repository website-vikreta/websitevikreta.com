import { test, expect } from '../../fixtures/test';
import { SERVICE_ROUTES } from '../../pages/ServicesPage';
import { PRODUCTION_VIEWPORTS } from '../../helpers/responsive-viewports';
import { expectAllLinksWork, expectCarouselButtonsMove, expectCleanFullScroll, submitInlineAuditForm, submitInlineWvLeadForm } from '../../helpers/page-checks';

test.describe('Services Directory, Sub-Pages & 308 Permanent Redirects', () => {
  for (const { path } of SERVICE_ROUTES) {
    test(`Service route "${path}" renders with HTTP 200 and H1`, async ({
      page,
      servicesPage,
    }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      await servicesPage.waitForStability();
      await expect(servicesPage.getH1()).toBeVisible();
    });
  }

  test('Services overview "/services" renders with HTTP 200 (coming-soon page, no h1)', async ({ page }) => {
    const response = await page.goto('/services');
    expect(response?.status()).toBe(200);
  });

  test('Legacy slug /services/apps-crm permanently redirects to /services/web-mobile-app-development', async ({
    servicesPage,
  }) => {
    await servicesPage.verifyPermanentRedirect(
      '/services/apps-crm',
      '/services/web-mobile-app-development'
    );
  });

  test('Legacy slug /services/web-and-mobile-apps permanently redirects to /services/web-mobile-app-development', async ({
    servicesPage,
  }) => {
    await servicesPage.verifyPermanentRedirect(
      '/services/web-and-mobile-apps',
      '/services/web-mobile-app-development'
    );
  });
});

/**
 * Deep checks for every service page, data-driven: the same main things run on all five pages.
 * Each page: health, every link, hero CTA opens the lead popup, the inline lead form submits
 * (fake identity, EmailJS mocked), the FAQ expands, the testimonial carousel moves, no overflow.
 */
const SERVICE_PAGES = [
  // The new Applied AI hub uses the wv inline lead form + native <details> FAQ, and its
  // hero CTA prefills that form instead of opening the legacy audit popup.
  { path: '/services/ai', cta: /Get my plan/, formId: 'lead', formKind: 'wv', ctaKind: 'form', faq: 'Questions people ask', faqKind: 'native', faqCount: 8, carousel: null },
  { path: '/services/web-mobile-app-development', cta: /Book a Free Project Call/, formId: 'start-project', formKind: 'audit', ctaKind: 'modal', faq: 'Apps & CRM FAQs', faqKind: 'region', faqCount: 3, carousel: 'Client testimonials' },
  // The wv web pillar: hero CTA links to /contact, the closing is the global map CTA (no inline form), LeafPage FAQ (first answer open).
  { path: '/services/web-development', cta: /Get a free website audit/, formId: null, formKind: 'audit', ctaKind: 'link', faq: 'Questions people ask', faqKind: 'leaf', faqCount: 5, carousel: null },
  { path: '/services/uiux-design', cta: /Book a call/, formId: 'get-quote', formKind: 'audit', ctaKind: 'modal', faq: 'UI/UX design FAQs', faqKind: 'region', faqCount: 5, carousel: 'UI/UX client testimonials' },
  { path: '/services/digital-marketing', cta: /Book a Free Marketing Audit/, formId: 'marketing-audit', formKind: 'audit', ctaKind: 'modal', faq: 'Digital Marketing FAQs', faqKind: 'region', faqCount: 4, carousel: null },
] as const;

const OVERFLOW_WIDTHS = [320, 768, 1440];

for (const svc of SERVICE_PAGES) {
  test.describe(`Service Page ${svc.path}`, () => {
    test('scrolling the whole page throws no JS errors and no same-origin request fails', { tag: '@critical' }, async ({ page, basePage, baseURL }) => {
      await expectCleanFullScroll(page, basePage, svc.path, baseURL!);
    });

    test('every link on the page works', { tag: '@critical' }, async ({ page, basePage }) => {
      await basePage.navigate(svc.path);
      await basePage.scrollThroughPage(); // some sections mount on scroll
      await expectAllLinksWork(page);
    });

    test('the hero call-to-action works: prefill form, Calendly new tab or the lead popup', async ({ page, basePage, auditModal }) => {
      await basePage.navigate(svc.path);
      const main = page.locator('main');
      const cta = main.getByRole('link', { name: svc.cta }).or(main.getByRole('button', { name: svc.cta })).first();
      if (svc.ctaKind === 'link') {
        await expect(cta).toHaveAttribute('href', '/contact');
        return;
      }
      if (svc.ctaKind === 'form') {
        await cta.click();
        await expect(page).toHaveURL(/#lead$/);
        return;
      }
      if (/calendly\.com/.test((await cta.getAttribute('href')) ?? '')) {
        await expect(cta).toHaveAttribute('target', '_blank');
        await expect(cta).toHaveAttribute('rel', /noopener/);
        return;
      }
      await auditModal.openViaTrigger(cta);
      await expect(auditModal.firstNameInput).toBeVisible();
      await auditModal.closeViaEscape();
    });

    test('the inline lead form submits with the fake test identity (mocked email)', { tag: ['@forms', '@critical'] }, async ({ page, basePage }) => {
      test.skip(!svc.formId, 'no inline form on this page');
      await basePage.navigate(svc.path);
      await basePage.scrollThroughPage();
      const form = page.locator(`#${svc.formId}`);
      await form.scrollIntoViewIfNeeded();
      if (svc.formKind === 'wv') await submitInlineWvLeadForm(page, form);
      else await submitInlineAuditForm(page, form);
    });

    test(`FAQ lists ${svc.faqCount} questions, and clicking one expands its answer`, async ({ page, basePage }) => {
      await basePage.navigate(svc.path);
      await basePage.scrollThroughPage();
      if (svc.faqKind === 'native') {
        const faq = page.locator('#faq');
        const items = faq.locator('details');
        await expect(items).toHaveCount(svc.faqCount);
        const first = items.first();
        await first.scrollIntoViewIfNeeded();
        await expect(first).not.toHaveAttribute('open', '');
        await first.locator('summary').click();
        await expect(first).toHaveAttribute('open', '');
        return;
      }
      if (svc.faqKind === 'leaf') {
        const questions = page.locator('#faq button[aria-expanded]');
        await expect(questions).toHaveCount(svc.faqCount);
        await expect(questions.first()).toHaveAttribute('aria-expanded', 'true');
        const second = questions.nth(1);
        await second.scrollIntoViewIfNeeded();
        await second.click();
        await expect(second).toHaveAttribute('aria-expanded', 'true');
        return;
      }
      const questions = page.getByRole('region', { name: svc.faq }).locator('button[aria-expanded]');
      await expect(questions).toHaveCount(svc.faqCount);
      const first = questions.first();
      await first.scrollIntoViewIfNeeded();
      await expect(first).toHaveAttribute('aria-expanded', 'false');
      await first.click();
      await expect(first).toHaveAttribute('aria-expanded', 'true');
    });

    if (svc.carousel) {
      test('testimonials: Next and Previous buttons move the carousel', async ({ page, basePage }) => {
        await basePage.navigate(svc.path);
        await basePage.scrollThroughPage();
        await expectCarouselButtonsMove(page.getByRole('region', { name: svc.carousel! }));
      });
    }

    for (const vp of PRODUCTION_VIEWPORTS.filter((v) => OVERFLOW_WIDTHS.includes(v.width))) {
      test(`no horizontal overflow at ${vp.name}`, async ({ page, basePage }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await basePage.navigate(svc.path);
        await basePage.verifyNoHorizontalOverflow();
      });
    }
  });
}
