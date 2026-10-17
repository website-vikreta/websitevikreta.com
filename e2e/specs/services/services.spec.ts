import { test, expect } from '../../fixtures/test';
import { SERVICE_ROUTES } from '../../pages/ServicesPage';
import { PRODUCTION_VIEWPORTS } from '../../helpers/responsive-viewports';
import { expectAllLinksWork, expectCarouselButtonsMove, expectCleanFullScroll, submitInlineAuditForm } from '../../helpers/page-checks';

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
  { path: '/services/ai-automations', cta: /Book a Free Process Audit/, formId: 'book-audit', faq: 'AI automation frequently asked questions', faqCount: 6, carousel: null },
  { path: '/services/web-mobile-app-development', cta: /Book a Free Project Call/, ctaIsCalendly: true, formId: 'start-project', faq: 'Apps & CRM FAQs', faqCount: 3, carousel: 'Client testimonials' },
  { path: '/services/web-development', cta: /Book a call/, formId: 'get-quote', faq: 'Web Development FAQs', faqCount: 5, carousel: 'Client testimonials' },
  { path: '/services/uiux-design', cta: /Book a call/, formId: 'get-quote', faq: 'UI/UX design FAQs', faqCount: 5, carousel: 'UI/UX client testimonials' },
  { path: '/services/digital-marketing', cta: /Book a Free Marketing Audit/, formId: 'marketing-audit', faq: 'Digital Marketing FAQs', faqCount: 4, carousel: null },
];

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

    if (svc.ctaIsCalendly) {
      // This hero CTA is a Calendly link, not the popup. Its href comes from NEXT_PUBLIC_CALENDLY_URL.
      test('the hero call-to-action links to Calendly in a new, safe tab', async ({ page, basePage }) => {
        // Known bug: NEXT_PUBLIC_CALENDLY_URL is not set in .env.local or CI, so Button gets an empty href
        // and renders a dead <button> that does nothing on click. test.fail() keeps the suite green while
        // it is open, and starts failing (= tells us) once the env var is set or the code is fixed.
        test.fail();
        await basePage.navigate(svc.path);
        const cta = page.locator('main').getByRole('link', { name: svc.cta }).first();
        await expect(cta, 'Hero CTA is not a link (dead button: NEXT_PUBLIC_CALENDLY_URL unset)').toHaveAttribute('href', /calendly\.com/, { timeout: 5000 });
        await expect(cta).toHaveAttribute('target', '_blank');
        await expect(cta).toHaveAttribute('rel', /noopener/);
      });
    } else test('the hero call-to-action opens the lead popup, and Escape closes it', async ({ page, basePage, auditModal }) => {
      await basePage.navigate(svc.path);
      const main = page.locator('main');
      const cta = main.getByRole('link', { name: svc.cta }).or(main.getByRole('button', { name: svc.cta })).first();
      await auditModal.openViaTrigger(cta);
      await expect(auditModal.firstNameInput).toBeVisible();
      await auditModal.closeViaEscape();
    });

    test('the inline lead form submits with the fake test identity (mocked email)', { tag: ['@forms', '@critical'] }, async ({ page, basePage }) => {
      await basePage.navigate(svc.path);
      await basePage.scrollThroughPage();
      const form = page.locator(`section#${svc.formId}`);
      await form.scrollIntoViewIfNeeded();
      await submitInlineAuditForm(page, form);
    });

    test(`FAQ lists ${svc.faqCount} questions, and clicking one expands its answer`, async ({ page, basePage }) => {
      await basePage.navigate(svc.path);
      await basePage.scrollThroughPage();
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
