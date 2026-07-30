/**
 * String Utilities.
 *
 * Common string manipulation helpers used across the framework.
 */

/**
 * Generate a random string of specified length using alphanumeric characters.
 * Useful for creating unique test identifiers.
 */
export function randomString(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join(
    '',
  );
}

/**
 * Generate a random email address with a unique suffix.
 * Prevents test collision when creating test users.
 */
export function uniqueEmail(prefix: string = 'test'): string {
  const timestamp = Date.now();
  return `${prefix}.${timestamp}@qaops-test.com`;
}

/**
 * Truncate a string to the specified maximum length.
 * Adds an ellipsis if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 3)}...`;
}

/**
 * Capitalise the first letter of a string.
 */
export function capitalise(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Remove all whitespace from a string.
 */
export function removeWhitespace(str: string): string {
  return str.replace(/\s/g, '');
}

/**
 * Check if a string is a valid email format.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Generate a phone number string of the specified length.
 * Restful Booker requires phone to be 11-21 characters.
 */
export function randomPhone(length: number = 11): string {
  const digits = Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
  return digits;
}

/**
 * Extract numeric value from a string (e.g., "$150.00" → 150).
 */
export function extractNumber(str: string): number {
  const match = str.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}
