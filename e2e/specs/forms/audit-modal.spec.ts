import { test, expect } from '../../fixtures/test';
import { TEST_LEAD } from '../../fixtures/test-data';

test.describe('Audit Modal Dialog, Field Validations & Lead Capture Flow', { tag: '@forms' }, () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigate('/services/ai-automations');
  });

  test('Audit Modal opens from CTA and auto-focuses first input field', async ({ auditModal }) => {
    await auditModal.openViaTrigger();
    await expect(auditModal.firstNameInput).toBeFocused();
  });

  test('Submitting empty Audit form displays field validation errors', async ({ auditModal }) => {
    await auditModal.openViaTrigger();
    await auditModal.submit();

    const errors = auditModal.modalContent.locator(
      'p[role="alert"], span[role="alert"], p.text-red-500, p:has-text("Required"), p:has-text("required")'
    );
    await expect(errors.first()).toBeVisible();
  });

  test('Phone field enforces valid digit structure', async ({ auditModal }) => {
    await auditModal.openViaTrigger();

    await auditModal.fillForm({ ...TEST_LEAD, phone: '123' }); // invalid phone

    await auditModal.submit();

    const phoneError = auditModal.modalContent.locator('text=Valid phone number required');
    await expect(phoneError).toBeVisible();
  });

  test('Happy Path: Submitting valid form sends mock EmailJS and displays success banner', { tag: '@critical' }, async ({
    page,
    auditModal,
  }) => {
    await auditModal.openViaTrigger();
    await auditModal.fillForm(TEST_LEAD);

    const sent = page.waitForRequest(/api\.emailjs\.com/);
    await auditModal.submit();
    await auditModal.verifySuccessState();

    // The (mocked) EmailJS call carries the fake identity, never a real-looking person.
    const params = (await sent).postDataJSON().template_params;
    expect(params).toMatchObject({
      name: TEST_LEAD.name,
      email: TEST_LEAD.email,
      mobile: TEST_LEAD.phone,
      service_type: TEST_LEAD.subject,
      message: TEST_LEAD.message,
    });
  });

  test('Modal closes cleanly via Escape key and close button', async ({ auditModal }) => {
    await auditModal.openViaTrigger();
    await auditModal.close();

    await auditModal.openViaTrigger();
    await auditModal.closeViaEscape();
  });
});
