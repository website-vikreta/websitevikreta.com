import { test, expect } from './fixtures/test';

test.describe('Audit Modal Dialog, Field Validations & Lead Capture Flow', () => {
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

    await auditModal.fillForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123', // invalid phone
      subject: 'Workflow Automation',
      message: 'Automate manual reporting.',
    });

    await auditModal.submit();

    const phoneError = auditModal.modalContent.locator('text=Valid phone number required');
    await expect(phoneError).toBeVisible();
  });

  test('Happy Path: Submitting valid form sends mock EmailJS and displays success banner', async ({
    auditModal,
  }) => {
    await auditModal.openViaTrigger();

    await auditModal.fillForm({
      firstName: 'Rajesh',
      lastName: 'Sharma',
      email: 'rajesh.sharma@example.com',
      phone: '+91 9823012345',
      subject: 'CRM Integration',
      message: 'Connect HubSpot with our internal billing database.',
    });

    await auditModal.submit();
    await auditModal.verifySuccessState();
  });

  test('Modal closes cleanly via Escape key and close button', async ({ auditModal }) => {
    await auditModal.openViaTrigger();
    await auditModal.close();

    await auditModal.openViaTrigger();
    await auditModal.closeViaEscape();
  });
});
