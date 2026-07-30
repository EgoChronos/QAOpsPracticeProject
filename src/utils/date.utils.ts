/**
 * Date Utilities.
 *
 * Centralised date formatting and manipulation functions.
 * All date logic in the framework goes through these utilities,
 * ensuring consistent formatting across factories, page objects, and tests.
 *
 * The Restful Booker API expects dates in YYYY-MM-DD format.
 */

/**
 * Format a Date object as YYYY-MM-DD (Restful Booker API format).
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Add N days to a date and return the new Date.
 * Does not mutate the original date.
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Get today's date as YYYY-MM-DD.
 */
export function today(): string {
  return formatDate(new Date());
}

/**
 * Get a date N days from today as YYYY-MM-DD.
 */
export function daysFromNow(days: number): string {
  return formatDate(addDays(new Date(), days));
}

/**
 * Parse a YYYY-MM-DD string into a Date object.
 */
export function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Check if a date string is in valid YYYY-MM-DD format.
 */
export function isValidDateFormat(dateStr: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}

/**
 * Check if checkout is after checkin.
 */
export function isValidDateRange(checkin: string, checkout: string): boolean {
  return new Date(checkout) > new Date(checkin);
}

/**
 * Format a date for UI display (e.g., "January 15, 2025").
 */
export function formatDateForDisplay(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get a date range from today.
 * Returns checkin and checkout strings.
 */
export function getDateRange(
  checkInDaysFromNow: number = 1,
  stayDurationDays: number = 2,
): { checkin: string; checkout: string } {
  const checkin = addDays(new Date(), checkInDaysFromNow);
  const checkout = addDays(checkin, stayDurationDays);
  return {
    checkin: formatDate(checkin),
    checkout: formatDate(checkout),
  };
}
