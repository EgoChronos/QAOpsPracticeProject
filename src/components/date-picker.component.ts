/**
 * Date Picker Component Object.
 *
 * The Restful Booker UI uses a custom date range picker for booking dates.
 * This component object abstracts the complex drag-selection interaction
 * into simple, readable method calls.
 *
 * Key lesson: complex, reusable UI interactions belong in component objects,
 * NOT duplicated across multiple test files.
 */

import { Page, Locator } from '@playwright/test';
import { formatDate } from '../utils/date.utils';

export class DatePickerComponent {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ---------------------------------------------------------------------------
  // Locators
  // ---------------------------------------------------------------------------

  /** The date picker calendar container */
  get calendar(): Locator {
    return this.page.locator('.rdrCalendarWrapper, [class*="calendar"], [class*="datepicker"]').first();
  }

  /** Individual day cells in the calendar */
  get dayCells(): Locator {
    return this.page.locator('.rdrDay:not(.rdrDayPassive), [class*="day"]:not([class*="disabled"])');
  }

  /** Check-in date input field */
  get checkinInput(): Locator {
    return this.page.locator(
      'input[name="checkin"], input[placeholder*="Check in"], #checkin',
    );
  }

  /** Check-out date input field */
  get checkoutInput(): Locator {
    return this.page.locator(
      'input[name="checkout"], input[placeholder*="Check out"], #checkout',
    );
  }

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------

  /**
   * Select a date range by clicking start and end day cells.
   *
   * Note: The Restful Booker date picker uses a drag-to-select pattern.
   * We click the start date, then drag to the end date.
   *
   * @param checkin - Check-in date
   * @param checkout - Check-out date
   */
  async selectDateRange(checkin: Date, checkout: Date): Promise<void> {
    // First click: opens the calendar and selects start date
    await this.page.locator('[data-testid="BookButton"], button:has-text("Book")').first().click();

    // Wait for calendar to appear
    await this.page.waitForSelector('.rdrCalendarWrapper, [class*="calendar"]', {
      timeout: 5000,
    }).catch(() => {
      // Calendar might already be visible
    });

    await this.selectCheckinDate(checkin);
    await this.selectCheckoutDate(checkout);
  }

  /** Fill check-in date via input field (if the app uses date inputs) */
  async fillCheckinDate(date: Date): Promise<void> {
    const formatted = formatDate(date);
    await this.checkinInput.fill(formatted);
  }

  /** Fill check-out date via input field */
  async fillCheckoutDate(date: Date): Promise<void> {
    const formatted = formatDate(date);
    await this.checkoutInput.fill(formatted);
  }

  /** Select check-in date by clicking the day cell */
  async selectCheckinDate(date: Date): Promise<void> {
    const dayText = date.getDate().toString();
    await this.page
      .locator(`.rdrDay:not(.rdrDayPassive) .rdrDayNumber span:text-is("${dayText}")`)
      .first()
      .click();
  }

  /** Select check-out date by clicking the day cell */
  async selectCheckoutDate(date: Date): Promise<void> {
    const dayText = date.getDate().toString();
    await this.page
      .locator(`.rdrDay:not(.rdrDayPassive) .rdrDayNumber span:text-is("${dayText}")`)
      .last()
      .click();
  }
}
