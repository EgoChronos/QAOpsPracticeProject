/**
 * Reservation Page Object.
 *
 * Covers the dedicated reservation page (`/reservation/:id`) in the current
 * app (automationintesting.online). The booking flow:
 *   1. Home page "Book now" link → `/reservation/:id?checkin=...&checkout=...`
 *   2. The page shows room details, a date calendar, price summary and a
 *      "Reserve Now" button.
 *   3. Clicking "Reserve Now" reveals the guest details form
 *      (firstname / lastname / email / phone).
 *   4. Submitting a valid form shows a "Booking Confirmed" confirmation.
 */

import { Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { logger } from '../utils/logger';

export interface GuestDetails {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

export class ReservationPage extends BasePage {
  // Reservation pages are dynamic (/reservation/:id) — path is set per instance.
  protected readonly path = '/reservation';

  // ---------------------------------------------------------------------------
  // Locators
  // ---------------------------------------------------------------------------

  get bookingCardTitle(): Locator {
    return this.page.getByRole('heading', { name: /book this room/i });
  }

  /** "Reserve Now" button — toggles the guest details form */
  get reserveNowButton(): Locator {
    return this.page.getByRole('button', { name: /reserve now/i }).first();
  }

  /** "Cancel" button shown while the guest form is open */
  get cancelButton(): Locator {
    return this.page.getByRole('button', { name: /cancel/i }).first();
  }

  // Guest details form (appears after clicking "Reserve Now")
  get firstnameInput(): Locator {
    return this.page.locator('input[name="firstname"]');
  }

  get lastnameInput(): Locator {
    return this.page.locator('input[name="lastname"]');
  }

  get emailInput(): Locator {
    return this.page.locator('input[name="email"]');
  }

  get phoneInput(): Locator {
    return this.page.locator('input[name="phone"]');
  }

  /** Booking confirmation block */
  get confirmationMessage(): Locator {
    return this.page.locator(
      '.booking-confirmation, [class*="confirmation"]',
    ).or(this.page.getByText(/booking confirmed/i));
  }

  get returnHomeLink(): Locator {
    return this.page.getByRole('link', { name: /return home/i });
  }

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------

  /**
   * Open the reservation page for a given room id.
   * Optional checkin/checkout dates are appended as query params
   * (the app only renders the booking widget when dates are present).
   */
  async gotoRoom(roomId: number, dates?: { checkin: string; checkout: string }): Promise<void> {
    let url = `${this.path}/${roomId}`;
    if (dates) {
      url += `?checkin=${dates.checkin}&checkout=${dates.checkout}`;
    }
    logger.debug(`Navigating to: ${url}`);
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  /** Open the guest details form by clicking "Reserve Now" */
  async openBookingForm(): Promise<void> {
    await this.reserveNowButton.click();
    await this.firstnameInput.waitFor({ state: 'visible', timeout: 10_000 });
  }

  /** Fill the guest details form */
  async fillGuestDetails(details: GuestDetails): Promise<void> {
    await this.firstnameInput.fill(details.firstname);
    await this.lastnameInput.fill(details.lastname);
    await this.emailInput.fill(details.email);
    await this.phoneInput.fill(details.phone);
  }

  /** Fill and submit the guest details form in one action */
  async submitBooking(details: GuestDetails): Promise<void> {
    await this.openBookingForm();
    await this.fillGuestDetails(details);
    await this.reserveNowButton.click();
  }

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  /** Assert the reservation page rendered the booking widget */
  async expectBookingWidgetVisible(): Promise<void> {
    await expect(this.bookingCardTitle).toBeVisible({ timeout: 15_000 });
    await expect(this.reserveNowButton).toBeVisible();
  }

  /** Assert the booking confirmation is shown after a successful reservation */
  async expectConfirmationVisible(): Promise<void> {
    await expect(this.confirmationMessage).toBeVisible({ timeout: 15_000 });
  }

  /** Assert the guest form fields are visible */
  async expectGuestFormVisible(): Promise<void> {
    await expect(this.firstnameInput).toBeVisible();
    await expect(this.phoneInput).toBeVisible();
  }
}
