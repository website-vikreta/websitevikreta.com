import { Page, Locator, expect } from '@playwright/test';

export interface AuditFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/**
 * AuditModalComponent: Page Object Model for the Radix Dialog-based
 * sitewide process audit lead generation modal.
 */
export class AuditModalComponent {
  readonly page: Page;
  readonly modalContent: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;
  readonly closeButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalContent = page.locator('.audit-modal-content');
    this.firstNameInput = this.modalContent.locator('input[name="firstName"]');
    this.lastNameInput = this.modalContent.locator('input[name="lastName"]');
    this.emailInput = this.modalContent.locator('input[name="email"]');
    this.phoneInput = this.modalContent.locator('input[name="phone"]');
    this.subjectInput = this.modalContent.locator('input[name="subject"]');
    this.messageInput = this.modalContent.locator('textarea[name="message"]');
    this.submitButton = this.modalContent.locator('button[type="submit"]');
    this.closeButton = this.modalContent.locator('button[aria-label="Close"]');
    this.successMessage = this.modalContent.locator('text=Thanks, we\'ll get back to you within 24 hours.');
  }

  async openViaTrigger(trigger?: Locator): Promise<void> {
    const btn = trigger ?? this.page.locator('button:has-text("Audit"), a[href*="audit"], button:has-text("Process Audit")').first();
    await btn.click();
    await expect(this.modalContent).toBeVisible({ timeout: 10000 });
  }

  async fillForm(data: Partial<AuditFormData>): Promise<void> {
    if (data.firstName !== undefined) await this.firstNameInput.fill(data.firstName);
    if (data.lastName !== undefined) await this.lastNameInput.fill(data.lastName);
    if (data.email !== undefined) await this.emailInput.fill(data.email);
    if (data.phone !== undefined) await this.phoneInput.fill(data.phone);
    if (data.subject !== undefined) await this.subjectInput.fill(data.subject);
    if (data.message !== undefined) await this.messageInput.fill(data.message);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
    await expect(this.modalContent).not.toBeVisible();
  }

  async closeViaEscape(): Promise<void> {
    await this.page.keyboard.press('Escape');
    await expect(this.modalContent).not.toBeVisible();
  }

  async verifySuccessState(): Promise<void> {
    await expect(this.successMessage).toBeVisible({ timeout: 10000 });
  }
}
