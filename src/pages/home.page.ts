/**
 * Home Page Object.
 *
 * The main hotel booking page — shows rooms and allows guests to make bookings.
 */

import { Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { UIRoutes } from '../config/urls';

export class HomePage extends BasePage {
  protected readonly path = UIRoutes.home;

  // ---------------------------------------------------------------------------
  // Locators
  // ---------------------------------------------------------------------------

  get roomCards(): Locator {
    return this.page.locator('.hotel-room-info, [class*="room"]');
  }

  get firstRoomCard(): Locator {
    return this.roomCards.first();
  }

  get bookRoomButton(): Locator {
    return this.page.getByRole('button', { name: /book this room|book now/i }).first();
  }

  get pageHeading(): Locator {
    return this.page.getByRole('heading').first();
  }

  get navBar(): Locator {
    return this.page.locator('nav, .navbar, [class*="nav"]').first();
  }

  get footer(): Locator {
    return this.page.locator('footer, [class*="footer"]').first();
  }

  // Booking success modal / confirmation
  get bookingSuccessMessage(): Locator {
    return this.page
      .locator('.booking-confirmation, [class*="confirmation"]')
      .or(this.page.getByText(/Booking Successful/i));
  }

  get closeBookingButton(): Locator {
    return this.page.getByRole('button', { name: /close|cancel/i });
  }

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------

  /** Click the "Book this room" button on the first available room */
  async clickBookRoom(): Promise<void> {
    await this.bookRoomButton.click();
  }

  /** Navigate to home page and wait for it to render */
  async goto(): Promise<void> {
    await super.goto();
    // Wait for the heading as a signal that React has rendered the page
    await this.pageHeading.waitFor({ state: 'visible', timeout: 15_000 });
  }

  /** Get the count of room cards displayed */
  async getRoomCount(): Promise<number> {
    // Wait for at least one room card to appear before counting
    await this.firstRoomCard
      .waitFor({ state: 'visible', timeout: 15_000 })
      .catch(() => { /* no rooms available — count will be 0 */ });
    return this.roomCards.count();
  }

  /** Close any open booking confirmation modal */
  async closeConfirmation(): Promise<void> {
    if (await this.closeBookingButton.isVisible()) {
      await this.closeBookingButton.click();
    }
  }

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  /** Assert at least one room card is visible */
  async expectRoomsVisible(): Promise<void> {
    await expect(this.firstRoomCard).toBeVisible();
  }

  /** Assert the booking success confirmation is shown */
  async expectBookingSuccessVisible(): Promise<void> {
    await expect(this.bookingSuccessMessage).toBeVisible({ timeout: 15_000 });
  }

  /** Assert the page has loaded with expected title */
  async expectPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\//);
    await expect(this.pageHeading).toBeVisible();
  }
}
