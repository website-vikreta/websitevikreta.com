import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface ContactFormData {
  name: string;
  jobOrWebsite: string;
  email: string;
  phone: string;
}

/**
 * ContactPage: Page Object Model for the conversational contact form
 * and reach-out flow at `/contact`.
 */
export class ContactPage extends BasePage {
  readonly nameInput: Locator;
  readonly jobOrWebsiteInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly resetButton: Locator;

  readonly nameError: Locator;
  readonly jobError: Locator;
  readonly emailError: Locator;
  readonly phoneError: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.locator('input[name="name"]');
    this.jobOrWebsiteInput = page.locator('input[name="jobOrWebsite"]');
    this.emailInput = page.locator('input[name="email"]');
    this.phoneInput = page.locator('input[name="phone"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.successMessage = page.locator('text=Thanks for reaching out, our team will get back to you');
    this.resetButton = page.locator('button:has-text("Submit another request")');

    this.nameError = page.locator('#err-name');
    this.jobError = page.locator('#err-job');
    this.emailError = page.locator('#err-email');
    this.phoneError = page.locator('#err-phone');
  }

  async goto(): Promise<void> {
    await this.navigate('/contact');
  }

  async fillForm(data: Partial<ContactFormData>): Promise<void> {
    if (data.name !== undefined) await this.nameInput.fill(data.name);
    if (data.jobOrWebsite !== undefined) await this.jobOrWebsiteInput.fill(data.jobOrWebsite);
    if (data.email !== undefined) await this.emailInput.fill(data.email);
    if (data.phone !== undefined) await this.phoneInput.fill(data.phone);
  }

  async submit(): Promise<void> {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
  }

  async reset(): Promise<void> {
    await this.resetButton.click();
    await expect(this.nameInput).toBeVisible();
  }

  async verifySuccessState(): Promise<void> {
    await expect(this.successMessage).toBeVisible({ timeout: 10000 });
  }
}
