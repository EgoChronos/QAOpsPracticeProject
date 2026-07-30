/**
 * Booking API Client.
 *
 * Provides typed methods for all /booking endpoints.
 * Supports both authenticated (token) and unauthenticated requests.
 *
 * @see https://restful-booker.herokuapp.com/apidoc/#api-Booking
 */

import { AxiosInstance, AxiosResponse } from 'axios';
import { createHttpClient, extractData } from './base.client';
import {
  Booking,
  BookingFilters,
  BookingId,
  CreateBookingPayload,
  CreateBookingResponse,
  PartialUpdateBookingPayload,
  UpdateBookingPayload,
} from '../../models/booking.model';
import { env } from '../../config/env';
import { ApiEndpoints } from '../../config/urls';

export class BookingClient {
  private readonly http: AxiosInstance;

  /**
   * @param token - Optional auth token for write operations.
   *                If omitted, only GET requests will succeed.
   */
  constructor(token?: string) {
    this.http = createHttpClient({
      baseURL: env.apiUrl,
      token,
    });
  }

  // ---------------------------------------------------------------------------
  // READ operations
  // ---------------------------------------------------------------------------

  /**
   * GET /booking
   * Returns all booking IDs, optionally filtered.
   */
  async getAllIds(filters?: BookingFilters): Promise<AxiosResponse<BookingId[]>> {
    return this.http.get<BookingId[]>(ApiEndpoints.booking, { params: filters });
  }

  /**
   * GET /booking/:id
   * Returns the full booking object for a given ID.
   */
  async getById(id: number): Promise<AxiosResponse<Booking>> {
    return this.http.get<Booking>(ApiEndpoints.bookingById(id));
  }

  // ---------------------------------------------------------------------------
  // CREATE operations
  // ---------------------------------------------------------------------------

  /**
   * POST /booking
   * Creates a new booking. Returns the created booking with its assigned ID.
   */
  async create(payload: CreateBookingPayload): Promise<AxiosResponse<CreateBookingResponse>> {
    return this.http.post<CreateBookingResponse>(ApiEndpoints.booking, payload);
  }

  // ---------------------------------------------------------------------------
  // UPDATE operations
  // ---------------------------------------------------------------------------

  /**
   * PUT /booking/:id
   * Full replacement of a booking. Requires authentication.
   */
  async update(id: number, payload: UpdateBookingPayload): Promise<AxiosResponse<Booking>> {
    return this.http.put<Booking>(ApiEndpoints.bookingById(id), payload);
  }

  /**
   * PATCH /booking/:id
   * Partial update of a booking. Requires authentication.
   */
  async partialUpdate(
    id: number,
    payload: PartialUpdateBookingPayload,
  ): Promise<AxiosResponse<Booking>> {
    return this.http.patch<Booking>(ApiEndpoints.bookingById(id), payload);
  }

  // ---------------------------------------------------------------------------
  // DELETE operations
  // ---------------------------------------------------------------------------

  /**
   * DELETE /booking/:id
   * Deletes a booking by ID. Requires authentication.
   * Returns 201 Created (quirk of the Restful Booker API) on success.
   */
  async delete(id: number): Promise<AxiosResponse<string>> {
    return this.http.delete<string>(ApiEndpoints.bookingById(id));
  }

  // ---------------------------------------------------------------------------
  // Convenience methods
  // ---------------------------------------------------------------------------

  /** Create a booking and return just the numeric booking ID */
  async createAndGetId(payload: CreateBookingPayload): Promise<number> {
    const response = await this.create(payload);
    return extractData(response).bookingid;
  }

  /** Get full booking data for an ID */
  async getBookingData(id: number): Promise<Booking> {
    const response = await this.getById(id);
    return extractData(response);
  }
}
