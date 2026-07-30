/**
 * Booking Factory — Test Data Builder pattern using Faker.
 *
 * Factories generate realistic, randomised test data on demand.
 * This ensures:
 * - Tests are independent (no shared static fixtures)
 * - Data is always valid unless we explicitly make it invalid
 * - Data is realistic (meaningful names, valid dates)
 *
 * The Builder pattern (withFirstName, withDates, etc.) lets tests
 * customise specific fields while keeping defaults for everything else.
 *
 * Usage:
 *   // Default random booking
 *   const booking = BookingFactory.create();
 *
 *   // Custom fields, rest is random
 *   const booking = BookingFactory.create({ firstname: 'Alice' });
 *
 *   // Invalid booking (negative testing)
 *   const invalid = BookingFactory.createInvalid();
 */

import { faker } from '@faker-js/faker';
import { Booking, BookingDates, CreateBookingPayload } from '../../models/booking.model';
import { formatDate, addDays } from '../../utils/date.utils';

export class BookingFactory {
  /**
   * Generate a valid booking payload with all required fields.
   * Override any field by passing partial data.
   */
  static create(overrides: Partial<Booking> = {}): CreateBookingPayload {
    const checkin = faker.date.soon({ days: 30 });
    const checkout = addDays(checkin, faker.number.int({ min: 1, max: 14 }));

    const defaultBooking: Booking = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      totalprice: faker.number.int({ min: 50, max: 5000 }),
      depositpaid: faker.datatype.boolean(),
      bookingdates: {
        checkin: formatDate(checkin),
        checkout: formatDate(checkout),
      },
      additionalneeds: faker.helpers.maybe(() =>
        faker.helpers.arrayElement([
          'Breakfast',
          'Dinner',
          'Airport Transfer',
          'Late Checkout',
          'Early Check-in',
          'Extra Pillows',
        ]),
      ),
    };

    return { ...defaultBooking, ...overrides };
  }

  /**
   * Generate multiple bookings at once.
   */
  static createMany(count: number, overrides: Partial<Booking> = {}): CreateBookingPayload[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }

  /**
   * Create a booking with specific date range.
   */
  static createWithDates(checkin: Date, checkout: Date): CreateBookingPayload {
    return this.create({
      bookingdates: {
        checkin: formatDate(checkin),
        checkout: formatDate(checkout),
      },
    });
  }

  /**
   * Create a booking for today + N days from now.
   */
  static createForDaysFromNow(
    checkInDaysFromNow: number,
    stayDurationDays: number = 2,
  ): CreateBookingPayload {
    const checkin = addDays(new Date(), checkInDaysFromNow);
    const checkout = addDays(checkin, stayDurationDays);
    return this.createWithDates(checkin, checkout);
  }

  /**
   * Generate deliberately invalid booking data for negative testing.
   */
  static createInvalid(type: 'missing-name' | 'invalid-dates' | 'empty' = 'empty'): Partial<Booking> {
    switch (type) {
      case 'missing-name':
        return {
          totalprice: 100,
          depositpaid: false,
          bookingdates: {
            checkin: formatDate(new Date()),
            checkout: formatDate(addDays(new Date(), 2)),
          },
        };

      case 'invalid-dates':
        return {
          firstname: faker.person.firstName(),
          lastname: faker.person.lastName(),
          totalprice: 100,
          depositpaid: false,
          bookingdates: {
            checkin: 'not-a-date',
            checkout: 'also-not-a-date',
          },
        };

      case 'empty':
      default:
        return {};
    }
  }

  /**
   * Generate booking dates only.
   */
  static createDates(checkinDaysFromNow: number = 1, stayDays: number = 2): BookingDates {
    const checkin = addDays(new Date(), checkinDaysFromNow);
    const checkout = addDays(checkin, stayDays);
    return {
      checkin: formatDate(checkin),
      checkout: formatDate(checkout),
    };
  }
}
