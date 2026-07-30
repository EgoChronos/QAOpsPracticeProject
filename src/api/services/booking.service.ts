/**
 * Booking Service — orchestration layer for booking operations.
 *
 * This is the primary interface tests use to interact with bookings.
 * It handles:
 * - Authentication (fetching tokens transparently)
 * - Test data lifecycle (create + track for cleanup)
 * - Higher-level operations (createAndVerify, etc.)
 *
 * Usage in tests:
 *   const bookingService = new BookingService();
 *   const id = await bookingService.createBooking(payload);
 *   // ... run test ...
 *   await bookingService.cleanup(); // deletes all bookings created this session
 */

import { BookingClient } from '../clients/booking.client';
import { AuthService } from './auth.service';
import {
  Booking,
  BookingFilters,
  BookingId,
  CreateBookingPayload,
  CreateBookingResponse,
  PartialUpdateBookingPayload,
  UpdateBookingPayload,
} from '../../models/booking.model';
import { logger } from '../../utils/logger';

export class BookingService {
  private readonly authService: AuthService;
  private authenticatedClient: BookingClient | null = null;
  private readonly readClient: BookingClient;

  /** Track IDs created during this service instance for automatic cleanup */
  private createdIds: number[] = [];

  constructor(authService?: AuthService) {
    this.authService = authService ?? new AuthService();
    // Read-only client (no auth) for GET requests
    this.readClient = new BookingClient();
  }

  // ---------------------------------------------------------------------------
  // Private: get or create an authenticated client
  // ---------------------------------------------------------------------------

  private async getAuthenticatedClient(): Promise<BookingClient> {
    if (!this.authenticatedClient) {
      const token = await this.authService.getAdminToken();
      this.authenticatedClient = new BookingClient(token);
    }
    return this.authenticatedClient;
  }

  // ---------------------------------------------------------------------------
  // READ operations
  // ---------------------------------------------------------------------------

  /** Get all booking IDs, optionally filtered */
  async getAllIds(filters?: BookingFilters): Promise<BookingId[]> {
    const response = await this.readClient.getAllIds(filters);
    return response.data;
  }

  /** Get a booking by ID */
  async getBooking(id: number): Promise<Booking> {
    const response = await this.readClient.getById(id);
    return response.data;
  }

  // ---------------------------------------------------------------------------
  // CREATE operations
  // ---------------------------------------------------------------------------

  /**
   * Create a booking and track its ID for cleanup.
   * Returns the full CreateBookingResponse.
   */
  async createBooking(payload: CreateBookingPayload): Promise<CreateBookingResponse> {
    // POST /booking does not require auth
    const response = await this.readClient.create(payload);
    const data = response.data;
    this.createdIds.push(data.bookingid);
    logger.info(`Created booking: ${data.bookingid}`);
    return data;
  }

  /** Create a booking and return just the numeric ID */
  async createBookingAndGetId(payload: CreateBookingPayload): Promise<number> {
    const result = await this.createBooking(payload);
    return result.bookingid;
  }

  // ---------------------------------------------------------------------------
  // UPDATE operations
  // ---------------------------------------------------------------------------

  /** Full update (PUT) of a booking */
  async updateBooking(id: number, payload: UpdateBookingPayload): Promise<Booking> {
    const client = await this.getAuthenticatedClient();
    const response = await client.update(id, payload);
    return response.data;
  }

  /** Partial update (PATCH) of a booking */
  async patchBooking(id: number, payload: PartialUpdateBookingPayload): Promise<Booking> {
    const client = await this.getAuthenticatedClient();
    const response = await client.partialUpdate(id, payload);
    return response.data;
  }

  // ---------------------------------------------------------------------------
  // DELETE operations
  // ---------------------------------------------------------------------------

  /** Delete a specific booking by ID */
  async deleteBooking(id: number): Promise<void> {
    const client = await this.getAuthenticatedClient();
    await client.delete(id);
    // Remove from tracking list
    this.createdIds = this.createdIds.filter((tracked) => tracked !== id);
    logger.info(`Deleted booking: ${id}`);
  }

  // ---------------------------------------------------------------------------
  // Lifecycle management
  // ---------------------------------------------------------------------------

  /**
   * Delete all bookings created by this service instance.
   * Call this in afterEach or afterAll hooks to restore clean state.
   */
  async cleanup(): Promise<void> {
    if (this.createdIds.length === 0) {
      logger.debug('No bookings to clean up');
      return;
    }

    logger.info(`Cleaning up ${this.createdIds.length} booking(s): ${this.createdIds.join(', ')}`);

    const deletePromises = [...this.createdIds].map(async (id) => {
      try {
        await this.deleteBooking(id);
      } catch (error) {
        // Log but don't throw — cleanup should be best-effort
        logger.warn(`Failed to delete booking ${id} during cleanup`, error);
      }
    });

    await Promise.allSettled(deletePromises);
    this.createdIds = [];
  }

  /**
   * Verify that a booking exists and matches expected data.
   * Useful after UI actions to confirm backend state.
   */
  async verifyBookingExists(id: number, expectedData?: Partial<Booking>): Promise<Booking> {
    const booking = await this.getBooking(id);

    if (expectedData) {
      for (const [key, value] of Object.entries(expectedData)) {
        const bookingValue = booking[key as keyof Booking];
        if (JSON.stringify(bookingValue) !== JSON.stringify(value)) {
          throw new Error(
            `Booking ${id} field "${key}" mismatch.\n` +
              `Expected: ${JSON.stringify(value)}\n` +
              `Got: ${JSON.stringify(bookingValue)}`,
          );
        }
      }
    }

    return booking;
  }

  /** Get the list of booking IDs tracked by this instance */
  getTrackedIds(): number[] {
    return [...this.createdIds];
  }
}
