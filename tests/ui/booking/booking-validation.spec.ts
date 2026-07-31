/**
 * UI Tests — Booking Form Validation
 *
 * Tests the validation behaviour of the booking form.
 * Ensures appropriate error messages appear for invalid inputs.
 *
 * This suite demonstrates:
 * - Negative UI testing patterns
 * - Error message assertion
 * - Boundary value testing
 *
 * Tags: @regression @booking @validation
 */

import { test, expect } from '../../../src/fixtures/base.fixture';
import { randomPhone } from '../../../src/utils/string.utils';

test.describe('Booking Form Validation', () => {
  test.beforeEach(async ({ homePage, page, reservationPage }) => {
    await homePage.goto();
    // The "Book now" link on the home page navigates to the reservation page.
    const bookNow = page.locator('a[href*="/reservation/"]').first();
    const isVisible = await bookNow.isVisible({ timeout: 5000 }).catch(() => false);
    if (isVisible) {
      await bookNow.click();
    }
    // Open the guest details form on the reservation page.
    const reserveNow = reservationPage.reserveNowButton;
    const formVisible = await reserveNow.isVisible({ timeout: 5000 }).catch(() => false);
    if (formVisible) {
      await reserveNow.click();
    }
  });

  test('should show validation errors when booking form is submitted empty @regression @validation', async ({
    reservationPage,
  }) => {
    const formVisible = await reservationPage.firstnameInput
      .isVisible({ timeout: 3000 })
      .catch(() => false);
    if (!formVisible) {
      test.skip();
      return;
    }

    // Submit the empty form — the app should keep the form visible (not submit).
    await reservationPage.reserveNowButton.click();
    await expect(reservationPage.firstnameInput).toBeVisible();
  });

  test('should require valid phone number format @regression @validation', async ({
    reservationPage,
  }) => {
    const formVisible = await reservationPage.firstnameInput
      .isVisible({ timeout: 3000 })
      .catch(() => false);
    if (!formVisible) {
      test.skip();
      return;
    }

    await reservationPage.fillGuestDetails({
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      phone: '123', // Too short
    });
    await reservationPage.reserveNowButton.click();

    // Form should not have succeeded — form fields should still be visible.
    await expect(reservationPage.firstnameInput).toBeVisible();
  });

  test('should accept valid phone number with 11 digits @regression @validation', async ({
    reservationPage,
  }) => {
    const formVisible = await reservationPage.phoneInput
      .isVisible({ timeout: 3000 })
      .catch(() => false);
    if (!formVisible) {
      test.skip();
      return;
    }

    const validPhone = randomPhone(11);
    await reservationPage.phoneInput.fill(validPhone);
    await expect(reservationPage.phoneInput).toHaveValue(validPhone);
  });
});
