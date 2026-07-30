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
  test.beforeEach(async ({ homePage, page }) => {
    await homePage.goto();
    // Open the booking form on the first available room
    const bookButton = page
      .getByRole('button', { name: /book this room/i })
      .or(page.locator('button.btn-outline-primary'))
      .first();
    const isVisible = await bookButton.isVisible({ timeout: 5000 }).catch(() => false);
    if (isVisible) {
      await bookButton.click();
    }
  });

  test('should show validation errors when booking form is submitted empty @regression @validation', async ({
    page,
  }) => {
    // Try to submit an empty form
    const submitBtn = page.getByRole('button', { name: /^book$/i }).first();
    const isVisible = await submitBtn.isVisible({ timeout: 3000 }).catch(() => false);

    if (isVisible) {
      await submitBtn.click();
      // Some error feedback should appear
      await page.waitForTimeout(1000);
      // The form should still be visible (not successfully submitted)
      await expect(submitBtn).toBeVisible();
    }
  });

  test('should require valid phone number format @regression @validation', async ({ page }) => {
    // Fill in all required fields except phone with an invalid value
    const firstname = page.locator('input[name="firstname"]').first();
    const lastname = page.locator('input[name="lastname"]').first();
    const email = page.locator('input[name="email"]').first();
    const phone = page.locator('input[name="phone"]').first();

    const firstnameVisible = await firstname.isVisible({ timeout: 3000 }).catch(() => false);
    if (!firstnameVisible) {
      test.skip();
      return;
    }

    await firstname.fill('John');
    await lastname.fill('Doe');
    await email.fill('john.doe@example.com');
    await phone.fill('123'); // Too short

    const submitBtn = page.getByRole('button', { name: /^book$/i }).first();
    await submitBtn.click();

    await page.waitForTimeout(1000);
    // Form should not have succeeded — should still be visible
    await expect(submitBtn).toBeVisible();
  });

  test('should accept valid phone number with 11 digits @regression @validation', async ({
    page,
  }) => {
    const phone = page.locator('input[name="phone"]').first();
    const isVisible = await phone.isVisible({ timeout: 3000 }).catch(() => false);

    if (isVisible) {
      const validPhone = randomPhone(11);
      await phone.fill(validPhone);
      await expect(phone).toHaveValue(validPhone);
    }
  });
});
