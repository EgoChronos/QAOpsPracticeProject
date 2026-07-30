/**
 * Contact Page Object.
 *
 * Covers the contact form on the main hotel page.
 * Includes both happy path submissions and validation error scenarios.
 */

import { Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { UIRoutes } from '../config/urls';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export class ContactPage extends BasePage {
  // Contact form is a section on the home page, not a separate route
  protected readonly path = UIRoutes.home;

  // ---------------------------------------------------------------------------
  // Locators
  // ---------------------------------------------------------------------------

  get nameInput(): Locator {
    return this.page.getByRole('textbox', { name: /name/i }).nth(0);
  }

  get emailInput(): Locator {
    return this.page.getByRole('textbox', { name: /email/i });
  }

  get phoneInput(): Locator {
    return this.page.getByRole('textbox', { name: /phone/i });
  }

  get subjectInput(): Locator {
    return this.page.getByRole('textbox', { name: /subject/i });
  }

  get messageInput(): Locator {
    return this.page.locator('#description, textarea[name="message"]');
  }

  get submitButton(): Locator {
    return this.page.getByRole('button', { name: /submit/i });
  }

  get successMessage(): Locator {
    return this.page.locator('.contact-confirmation, [class*="contact"]').filter({
      hasText: /Thanks for getting in touch/i,
    });
  }

  get errorMessages(): Locator {
    return this.page.locator('.alert-danger p, [class*="error"] p');
  }

  get contactFormSection(): Locator {
    return this.page.locator('#contact, [class*="contact-form"]').first();
  }

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------

  /** Navigate to the contact form section (scroll into view) */
  async scrollToContactForm(): Promise<void> {
    await this.goto();
    await this.contactFormSection.scrollIntoViewIfNeeded();
  }

  /** Fill in the contact form with all fields */
  async fillForm(data: ContactFormData): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
    await this.subjectInput.fill(data.subject);
    await this.messageInput.fill(data.message);
  }

  /** Submit the contact form */
  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  /** Fill and submit the form in one action */
  async submitContactForm(data: ContactFormData): Promise<void> {
    await this.scrollToContactForm();
    await this.fillForm(data);
    await this.submit();
  }

  /** Clear all form fields */
  async clearForm(): Promise<void> {
    await this.nameInput.clear();
    await this.emailInput.clear();
    await this.phoneInput.clear();
    await this.subjectInput.clear();
    await this.messageInput.clear();
  }

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  /** Assert the success confirmation is visible */
  async expectSuccessMessageVisible(): Promise<void> {
    await expect(this.successMessage).toBeVisible({ timeout: 15_000 });
  }

  /** Assert success message contains the submitted name */
  async expectSuccessWithName(name: string): Promise<void> {
    await expect(this.successMessage).toContainText(name);
  }

  /** Assert validation errors are displayed */
  async expectValidationErrors(): Promise<void> {
    await expect(this.errorMessages.first()).toBeVisible();
  }

  /** Assert a specific error message is present */
  async expectErrorMessage(message: string): Promise<void> {
    await expect(this.errorMessages.filter({ hasText: message })).toBeVisible();
  }

  /** Get all visible error messages as strings */
  async getErrorMessages(): Promise<string[]> {
    const count = await this.errorMessages.count();
    const messages: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await this.errorMessages.nth(i).textContent();
      if (text) messages.push(text.trim());
    }
    return messages;
  }
}
