/**
 * Booking Helper — High-level test helpers for booking lifecycle management.
 *
 * Helpers sit above the service layer and encapsulate common test patterns.
 * The key difference: helpers are test-aware (they understand test context),
 * while services are pure API orchestration.
 *
 * The primary use case here demonstrates a core QAOps principle:
 *   "Use APIs to set up test data — don't drive UI through setup steps"
 *
 * Example flow:
 *   1. API creates a booking (fast, reliable)
 *   2. UI test verifies the booking appears correctly
 *   3. API deletes the booking (cleanup)
 *
 * This pattern:
 * - Reduces test execution time significantly
 * - Eliminates setup flakiness
 * - Keeps tests focused on what they're actually testing
 */

import { BookingService } from '../api/services/booking.service';
import { BookingFactory } from '../data/factories/booking.factory';
import { Booking, CreateBookingPayload, CreateBookingResponse } from '../models/booking.model';
import { logger } from '../utils/logger';

export interface CreateAndTrackResult {
  bookingId: number;
  booking: Booking;
  cleanup: () => Promise<void>;
}

/**
 * Create a booking via API and return the ID along with a cleanup function.
 *
 * Usage:
 *   const { bookingId, cleanup } = await createTestBooking(bookingService);
 *   // ... run UI test ...
 *   await cleanup(); // delete the booking
 */
export async function createTestBooking(
  bookingService: BookingService,
  overrides: Partial<CreateBookingPayload> = {},
): Promise<CreateAndTrackResult> {
  const payload = BookingFactory.create(overrides);
  logger.info(`Creating test booking via API: ${payload.firstname} ${payload.lastname}`);

  const result: CreateBookingResponse = await bookingService.createBooking(payload);

  return {
    bookingId: result.bookingid,
    booking: result.booking,
    cleanup: async () => {
      logger.info(`Cleaning up test booking: ${result.bookingid}`);
      await bookingService.deleteBooking(result.bookingid);
    },
  };
}

/**
 * Create multiple test bookings and return an array of results with a batch cleanup.
 */
export async function createMultipleTestBookings(
  bookingService: BookingService,
  count: number,
  overrides: Partial<CreateBookingPayload> = {},
): Promise<{
  results: CreateAndTrackResult[];
  cleanupAll: () => Promise<void>;
}> {
  const results = await Promise.all(
    Array.from({ length: count }, () => createTestBooking(bookingService, overrides)),
  );

  return {
    results,
    cleanupAll: async () => {
      await Promise.allSettled(results.map((r) => r.cleanup()));
    },
  };
}

/**
 * Verify a booking exists via API after a UI action.
 *
 * Use this after UI interactions to confirm the backend reflects the change.
 * This demonstrates "UI action → API verification" pattern.
 */
export async function verifyBookingViaApi(
  bookingService: BookingService,
  bookingId: number,
  expectedData?: Partial<Booking>,
): Promise<Booking> {
  logger.info(`Verifying booking ${bookingId} via API`);
  return bookingService.verifyBookingExists(bookingId, expectedData);
}
