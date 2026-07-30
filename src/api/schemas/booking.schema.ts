/**
 * Zod schemas for Booking API response validation.
 *
 * These schemas serve a dual purpose:
 * 1. Runtime validation — parse() throws if the API returns unexpected shape
 * 2. Type inference — z.infer<> generates TypeScript types automatically
 *
 * This is the lightweight alternative to separate JSON Schema files.
 * Zod integrates natively with TypeScript and gives actionable error messages.
 *
 * Usage in tests:
 *   const booking = BookingSchema.parse(response.data);
 *   // booking is now fully typed and validated
 */

import { z } from 'zod';

// ---------------------------------------------------------------------------
// Booking dates
// ---------------------------------------------------------------------------

export const BookingDatesSchema = z.object({
  checkin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  checkout: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});

// ---------------------------------------------------------------------------
// Full booking object
// ---------------------------------------------------------------------------

export const BookingSchema = z.object({
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  totalprice: z.number().positive('Total price must be positive'),
  depositpaid: z.boolean(),
  bookingdates: BookingDatesSchema,
  additionalneeds: z.string().optional(),
});

// ---------------------------------------------------------------------------
// Booking ID (from list endpoint)
// ---------------------------------------------------------------------------

export const BookingIdSchema = z.object({
  bookingid: z.number().int().positive(),
});

export const BookingIdListSchema = z.array(BookingIdSchema);

// ---------------------------------------------------------------------------
// Create booking response
// ---------------------------------------------------------------------------

export const CreateBookingResponseSchema = z.object({
  bookingid: z.number().int().positive(),
  booking: BookingSchema,
});

// ---------------------------------------------------------------------------
// TypeScript types inferred from schemas (single source of truth)
// ---------------------------------------------------------------------------

export type ValidatedBooking = z.infer<typeof BookingSchema>;
export type ValidatedBookingId = z.infer<typeof BookingIdSchema>;
export type ValidatedCreateBookingResponse = z.infer<typeof CreateBookingResponseSchema>;
