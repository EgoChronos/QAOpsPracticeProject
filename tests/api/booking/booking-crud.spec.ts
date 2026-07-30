/**
 * API Tests — Booking CRUD
 *
 * Full CRUD coverage for the /booking endpoint.
 * Tests all HTTP methods: GET, POST, PUT, PATCH, DELETE.
 *
 * Design principles demonstrated:
 * - Each test is independent (creates its own data, cleans up after itself)
 * - bookingService tracks created IDs → automatic cleanup via fixture
 * - Zod schema validation on all responses
 * - Status code + header + body assertions
 *
 * Tags: @regression @api @booking
 */

import { test, expect } from '../../../src/fixtures/base.fixture';
import { BookingFactory } from '../../../src/data/factories/booking.factory';
import { BookingSchema, BookingIdListSchema, CreateBookingResponseSchema } from '../../../src/api/schemas/booking.schema';

test.describe('Booking API — CRUD', () => {
  // ---------------------------------------------------------------------------
  // GET /booking (list)
  // ---------------------------------------------------------------------------

  test.describe('GET /booking', () => {
    test('should return 200 and an array of booking IDs @smoke @api @booking', async ({
      bookingClient,
    }) => {
      const response = await bookingClient.getAllIds();

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBeTruthy();
    });

    test('should return valid booking ID schema @regression @api @booking', async ({
      bookingClient,
    }) => {
      const response = await bookingClient.getAllIds();

      const validated = BookingIdListSchema.safeParse(response.data);
      expect(validated.success).toBeTruthy();
    });

    test('should return JSON content type @regression @api @booking', async ({ bookingClient }) => {
      const response = await bookingClient.getAllIds();
      expect(response.headers['content-type']).toContain('application/json');
    });

    test('should filter bookings by firstname @regression @api @booking', async ({
      bookingService,
    }) => {
      // Create a booking with a unique first name
      const uniqueName = `TestUser${Date.now()}`;
      await bookingService.createBooking(
        BookingFactory.create({ firstname: uniqueName }),
      );

      // Filter by that name
      const allIds = await bookingService.getAllIds({ firstname: uniqueName });
      expect(allIds.length).toBeGreaterThan(0);

      // Verify the returned bookings match the filter
      for (const { bookingid } of allIds) {
        const booking = await bookingService.getBooking(bookingid);
        expect(booking.firstname).toBe(uniqueName);
      }
    });
  });

  // ---------------------------------------------------------------------------
  // GET /booking/:id
  // ---------------------------------------------------------------------------

  test.describe('GET /booking/:id', () => {
    test('should return 200 and full booking data @smoke @api @booking', async ({
      bookingService,
    }) => {
      // Arrange: create a booking first
      const payload = BookingFactory.create();
      const created = await bookingService.createBooking(payload);
      const bookingId = created.bookingid;

      // Act
      const booking = await bookingService.getBooking(bookingId);

      // Assert
      expect(booking.firstname).toBe(payload.firstname);
      expect(booking.lastname).toBe(payload.lastname);
      expect(booking.totalprice).toBe(payload.totalprice);
      expect(booking.depositpaid).toBe(payload.depositpaid);
    });

    test('should return valid booking schema @regression @api @booking', async ({
      bookingService,
      bookingClient,
    }) => {
      const created = await bookingService.createBooking(BookingFactory.create());
      const response = await bookingClient.getById(created.bookingid);

      const validated = BookingSchema.safeParse(response.data);
      expect(validated.success).toBeTruthy();
    });

    test('should return booking dates correctly @regression @api @booking', async ({
      bookingService,
    }) => {
      const dates = BookingFactory.createDates(5, 3);
      const payload = BookingFactory.create({ bookingdates: dates });
      const created = await bookingService.createBooking(payload);

      const booking = await bookingService.getBooking(created.bookingid);

      expect(booking.bookingdates.checkin).toBe(dates.checkin);
      expect(booking.bookingdates.checkout).toBe(dates.checkout);
    });
  });

  // ---------------------------------------------------------------------------
  // POST /booking
  // ---------------------------------------------------------------------------

  test.describe('POST /booking', () => {
    test('should create a booking and return 200 with booking data @smoke @api @booking', async ({
      bookingService,
    }) => {
      const payload = BookingFactory.create();
      const result = await bookingService.createBooking(payload);

      expect(result.bookingid).toBeTruthy();
      expect(typeof result.bookingid).toBe('number');
      expect(result.bookingid).toBeGreaterThan(0);
      expect(result.booking.firstname).toBe(payload.firstname);
    });

    test('should return valid CreateBookingResponse schema @regression @api @booking', async ({
      bookingClient,
    }) => {
      const payload = BookingFactory.create();
      const response = await bookingClient.create(payload);

      const validated = CreateBookingResponseSchema.safeParse(response.data);
      expect(validated.success).toBeTruthy();
    });

    test('should persist booking data accurately @regression @api @booking', async ({
      bookingService,
    }) => {
      const payload = BookingFactory.create({
        firstname: 'Alice',
        lastname: 'Smith',
        totalprice: 999,
        depositpaid: true,
      });

      const created = await bookingService.createBooking(payload);
      const retrieved = await bookingService.getBooking(created.bookingid);

      expect(retrieved.firstname).toBe('Alice');
      expect(retrieved.lastname).toBe('Smith');
      expect(retrieved.totalprice).toBe(999);
      expect(retrieved.depositpaid).toBe(true);
    });

    test('should create booking with additionalneeds @regression @api @booking', async ({
      bookingService,
    }) => {
      const payload = BookingFactory.create({ additionalneeds: 'Breakfast' });
      const created = await bookingService.createBooking(payload);
      const retrieved = await bookingService.getBooking(created.bookingid);

      expect(retrieved.additionalneeds).toBe('Breakfast');
    });
  });

  // ---------------------------------------------------------------------------
  // PUT /booking/:id (full update)
  // ---------------------------------------------------------------------------

  test.describe('PUT /booking/:id', () => {
    test('should fully update a booking @regression @api @booking', async ({ bookingService }) => {
      // Arrange
      const original = await bookingService.createBooking(BookingFactory.create());
      const updatedPayload = BookingFactory.create({
        firstname: 'UpdatedFirstName',
        lastname: 'UpdatedLastName',
      });

      // Act
      const updated = await bookingService.updateBooking(original.bookingid, updatedPayload);

      // Assert
      expect(updated.firstname).toBe('UpdatedFirstName');
      expect(updated.lastname).toBe('UpdatedLastName');
    });

    test('should persist PUT update when retrieved again @regression @api @booking', async ({
      bookingService,
    }) => {
      const created = await bookingService.createBooking(BookingFactory.create());
      const newData = BookingFactory.create({ firstname: 'PersistTest' });

      await bookingService.updateBooking(created.bookingid, newData);

      // Retrieve fresh copy from API
      const fresh = await bookingService.getBooking(created.bookingid);
      expect(fresh.firstname).toBe('PersistTest');
    });
  });

  // ---------------------------------------------------------------------------
  // PATCH /booking/:id (partial update)
  // ---------------------------------------------------------------------------

  test.describe('PATCH /booking/:id', () => {
    test('should partially update a booking firstname @regression @api @booking', async ({
      bookingService,
    }) => {
      const created = await bookingService.createBooking(BookingFactory.create());

      const updated = await bookingService.patchBooking(created.bookingid, {
        firstname: 'PatchedName',
      });

      expect(updated.firstname).toBe('PatchedName');
      // Other fields should remain unchanged
      expect(updated.lastname).toBe(created.booking.lastname);
    });

    test('should partially update totalprice @regression @api @booking', async ({
      bookingService,
    }) => {
      const created = await bookingService.createBooking(BookingFactory.create());

      const updated = await bookingService.patchBooking(created.bookingid, {
        totalprice: 12345,
      });

      expect(updated.totalprice).toBe(12345);
    });
  });

  // ---------------------------------------------------------------------------
  // DELETE /booking/:id
  // ---------------------------------------------------------------------------

  test.describe('DELETE /booking/:id', () => {
    test('should delete a booking successfully @regression @api @booking', async ({
      bookingService,
    }) => {
      // Create a booking to delete
      const payload = BookingFactory.create();
      const created = await bookingService.createBooking(payload);
      const id = created.bookingid;

      // Remove from service tracking (we'll delete manually)
      const trackedIds = bookingService.getTrackedIds();
      expect(trackedIds).toContain(id);

      // Delete it
      await bookingService.deleteBooking(id);

      // Verify it no longer appears in the list
      const allIds = await bookingService.getAllIds();
      const found = allIds.find((b) => b.bookingid === id);
      expect(found).toBeUndefined();
    });
  });
});
