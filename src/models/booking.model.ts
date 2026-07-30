/**
 * Booking domain models.
 *
 * These interfaces mirror the Restful Booker API contract.
 * They are the source of truth for booking data shapes throughout
 * the framework — used in factories, API clients, and page objects.
 *
 * @see https://restful-booker.herokuapp.com/apidoc/
 */

// ---------------------------------------------------------------------------
// Core booking data
// ---------------------------------------------------------------------------

export interface BookingDates {
  checkin: string; // Format: YYYY-MM-DD
  checkout: string; // Format: YYYY-MM-DD
}

export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds?: string;
}

// ---------------------------------------------------------------------------
// API response shapes
// ---------------------------------------------------------------------------

/** Response from GET /booking (list) */
export interface BookingId {
  bookingid: number;
}

/** Response from GET /booking/:id and POST /booking */
export interface BookingResponse extends Booking {
  // Same shape as Booking — kept separate for semantic clarity
}

/** Response from POST /booking */
export interface CreateBookingResponse {
  bookingid: number;
  booking: BookingResponse;
}

// ---------------------------------------------------------------------------
// Request payloads
// ---------------------------------------------------------------------------

/** Payload for POST /booking */
export type CreateBookingPayload = Booking;

/** Payload for PUT /booking/:id (full update) */
export type UpdateBookingPayload = Booking;

/** Payload for PATCH /booking/:id (partial update) */
export type PartialUpdateBookingPayload = Partial<Booking>;

// ---------------------------------------------------------------------------
// Filter / query parameters
// ---------------------------------------------------------------------------

export interface BookingFilters {
  firstname?: string;
  lastname?: string;
  checkin?: string;
  checkout?: string;
  roomid?: number;
}
