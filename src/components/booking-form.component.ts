/**
 * Booking Form Component Object.
 *
 * The inline booking form that appears within each room card.
 * Handles first name, last name, email, phone, and date range input.
 */

import { Page, Locator, expect } from '@playwright/test';

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export class BookingFormComponent {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ---------------------------------------------------------------------------
  // Locators
  // ---------------------------------------------------------------------------

  get firstNameInput(): Locator {
    return this.page.locator('input[name="firstname"], input[id*="firstname"]').first();
  }

  get lastNameInput(): Locator {
    return this.page.locator('input[name="lastname"], input[id*="lastname"]').first();
  }

  get emailInput(): Locator {
    return this.page.locator('input[name="email"], input[id*="email"]').first();
  }

  get phoneInput(): Locator {
    return this.page.locator('input[name="phone"], input[id*="phone"]').first();
  }

  get bookButton(): Locator {
    return this.page.getByRole('button', { name: /^book$/i }).first();
  }

  get cancelButton(): Locator {
    return this.page.getByRole('button', { name: /cancel/i }).first();
  }

  get validationErrors(): Locator {
    return this.page.locator('.alert-danger, [class*="error-message"]').first();
  }

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------

  /** Fill in all guest details */
  async fillGuestDetails(data: BookingFormData): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
  }

  /** Click the Book button to submit the form */
  async clickBook(): Promise<void> {
    await this.bookButton.click();
  }

  /** Click Cancel to dismiss the form */
  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  /** Assert the booking form is visible */
  async expectFormVisible(): Promise<void> {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.phoneInput).toBeVisible();
  }

  /** Assert validation error messages are shown */
  async expectValidationErrors(): Promise<void> {
    await expect(this.validationErrors).toBeVisible();
  }
}
