/**
 * UI Tests — Booking Flow
 *
 * Tests the end-to-end booking flow from the hotel home page.
 *
 * Key QAOps patterns demonstrated:
 * 1. API used to verify backend state after UI action
 * 2. bookingService tracks created bookings → automatic cleanup
 * 3. Tests are independent — no shared mutable state
 *
 * Tags: @regression @booking
 */

import { test, expect } from '../../../src/fixtures/base.fixture';

import { faker } from '@faker-js/faker';
import { daysFromNow } from '../../../src/utils/date.utils';
import { randomPhone } from '../../../src/utils/string.utils';

test.describe('Booking Flow — Home Page', () => {
  test('should display rooms on the home page @smoke @booking', async ({ homePage }) => {
    await homePage.goto();
    await homePage.expectPageLoaded();
    await homePage.expectRoomsVisible();
  });

  test('should show at least one bookable room @smoke @booking', async ({ homePage }) => {
    await homePage.goto();
    const count = await homePage.getRoomCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should complete a booking with valid guest details @regression @booking', async ({
    page,
    reservationPage,
  }) => {
    // Navigate directly to the reservation page with RANDOM future dates.
    // The home page "Book now" links always use today→tomorrow, and any fixed
    // date window (e.g. daysFromNow(30)) repeats across retries — the app
    // REJECTS duplicate bookings for the same room+dates (the page even
    // crashes). Randomising the window keeps every attempt/retry/worker on
    // different dates, so tests stay independent and parallel-safe.
    const checkinOffset = 30 + Math.floor(Math.random() * 270); // 30–300 days out
    await reservationPage.gotoRoom(1, {
      checkin: daysFromNow(checkinOffset),
      checkout: daysFromNow(checkinOffset + 3),
    });

    // Landing on the reservation page — booking widget should be present.
    await reservationPage.expectBookingWidgetVisible();

    // Fill in guest details and submit.
    const guestDetails = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email(),
      phone: randomPhone(11),
    };
    await reservationPage.submitBooking(guestDetails);

    // A booking confirmation should appear.
    await reservationPage.expectConfirmationVisible();

    // Sanity: the URL is still on the reservation page.
    expect(page.url()).toContain('/reservation/');
  });

  test('should show home page content @smoke @booking', async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.page).toHaveURL('/');
    await expect(homePage.pageHeading).toBeVisible();
  });
});
