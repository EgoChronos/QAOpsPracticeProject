/**
 * Named timeout constants for consistent timing across the framework.
 *
 * Using named constants instead of magic numbers makes it immediately
 * clear WHY a particular timeout value was chosen, and makes bulk
 * adjustments trivial.
 *
 * Usage:
 *   await page.waitForSelector(locator, { timeout: Timeouts.ELEMENT_VISIBLE });
 */

export const Timeouts = {
  /** Default action timeout — most UI interactions should complete within this */
  DEFAULT: 15_000,

  /** Short wait for elements that should already be present */
  SHORT: 5_000,

  /** Extended wait for slow operations (file uploads, external APIs) */
  EXTENDED: 60_000,

  /** Navigation timeout — full page load */
  NAVIGATION: 30_000,

  /** API request timeout */
  API_REQUEST: 20_000,

  /** Animation/transition completion */
  ANIMATION: 1_000,

  /** Polling interval for custom waits */
  POLLING_INTERVAL: 500,
} as const;

export type Timeout = (typeof Timeouts)[keyof typeof Timeouts];
