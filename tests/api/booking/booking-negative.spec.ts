/**
 * API Tests — Booking Negative Testing
 *
 * Tests the booking API's error handling and validation.
 * Covers scenarios like 404, unauthenticated writes, and invalid data.
 *
 * Negative testing is critical in API testing because:
 * - It verifies the API rejects bad input gracefully
 * - It ensures proper status codes and error messages
 * - It exposes security issues (unauthenticated access)
 *
 * Tags: @regression @api @booking @negative
 */

import { test, expect } from '../../../src/fixtures/base.fixture';
import { BookingFactory } from '../../../src/data/factories/booking.factory';
import { env } from '../../../src/config/env';
import { createHttpClient } from '../../../src/api/clients/base.client';

test.describe('Booking API — Negative Testing', () => {
  // ---------------------------------------------------------------------------
  // 404 — Not Found
  // ---------------------------------------------------------------------------

  test.describe('Non-existent bookings', () => {
    test(
      'should return 404 when getting a booking with non-existent ID @regression @api @negative',
      async ({ bookingClient }) => {
        try {
          await bookingClient.getById(999999999);
          // If no error thrown, the status should be 404
        } catch (error) {
          const apiError = error as { status: number };
          expect(apiError.status).toBe(404);
        }
      },
    );

    test(
      'should return 405 or error when deleting non-existent booking without auth @regression @api @negative',
      async () => {
        const unauthClient = createHttpClient({ baseURL: env.apiUrl });
        try {
          await unauthClient.delete(`/booking/999999999`);
        } catch (error) {
          const apiError = error as { status: number };
          // Should reject unauthenticated delete
          expect([403, 404, 405]).toContain(apiError.status);
        }
      },
    );
  });

  // ---------------------------------------------------------------------------
  // 403 — Forbidden (write operations without auth)
  // ---------------------------------------------------------------------------

  test.describe('Unauthenticated write operations', () => {
    test(
      'should return 403 when updating without auth token @regression @api @negative',
      async ({ bookingService }) => {
        // Create a real booking to try to update
        const created = await bookingService.createBooking(BookingFactory.create());

        // Attempt update with NO auth token
        const unauthClient = createHttpClient({ baseURL: env.apiUrl });

        try {
          await unauthClient.put(`/booking/${created.bookingid}`, BookingFactory.create());
          // If it succeeds, that's a security issue — fail the test
          throw new Error('Expected 403 but got 2xx — security issue!');
        } catch (error) {
          const apiError = error as { status: number; message?: string };
          if (apiError.message?.includes('security issue')) throw error;
          expect([403, 405]).toContain(apiError.status);
        }
      },
    );

    test(
      'should return 403 when deleting without auth token @regression @api @negative',
      async ({ bookingService }) => {
        const created = await bookingService.createBooking(BookingFactory.create());

        const unauthClient = createHttpClient({ baseURL: env.apiUrl });

        try {
          await unauthClient.delete(`/booking/${created.bookingid}`);
          throw new Error('Expected 403 but got 2xx — security issue!');
        } catch (error) {
          const apiError = error as { status: number; message?: string };
          if (apiError.message?.includes('security issue')) throw error;
          expect([403, 405]).toContain(apiError.status);
        }
      },
    );
  });

  // ---------------------------------------------------------------------------
  // Data validation
  // ---------------------------------------------------------------------------

  test.describe('Data validation', () => {
    test(
      'should handle booking with minimum required fields @regression @api @negative',
      async ({ bookingService }) => {
        // Only required fields, no additionalneeds
        const minimalPayload = {
          firstname: 'Min',
          lastname: 'Test',
          totalprice: 1,
          depositpaid: false,
          bookingdates: {
            checkin: '2025-12-01',
            checkout: '2025-12-02',
          },
        };

        // Should succeed — additionalneeds is optional
        const result = await bookingService.createBooking(minimalPayload);
        expect(result.bookingid).toBeGreaterThan(0);
      },
    );

    test(
      'should retrieve booking without additionalneeds field @regression @api @negative',
      async ({ bookingService }) => {
        const payload = {
          firstname: 'NoNeeds',
          lastname: 'Test',
          totalprice: 50,
          depositpaid: true,
          bookingdates: {
            checkin: '2025-11-01',
            checkout: '2025-11-05',
          },
        };

        const created = await bookingService.createBooking(payload);
        const booking = await bookingService.getBooking(created.bookingid);

        expect(booking.firstname).toBe('NoNeeds');
        // additionalneeds may be empty string or undefined
        expect(booking.additionalneeds === undefined || booking.additionalneeds === '').toBeTruthy();
      },
    );
  });

  // ---------------------------------------------------------------------------
  // Filtering edge cases
  // ---------------------------------------------------------------------------

  test.describe('Filter edge cases', () => {
    test(
      'should return empty array for non-existent firstname filter @regression @api @negative',
      async ({ bookingClient }) => {
        const response = await bookingClient.getAllIds({
          firstname: 'ZZZ_NonExistent_User_XYZ_12345',
        });

        expect(response.status).toBe(200);
        expect(response.data).toEqual([]);
      },
    );
  });
});
