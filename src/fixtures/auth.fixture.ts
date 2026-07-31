/**
 * Auth Fixture — extends base fixture with pre-authenticated browser context.
 *
 * This fixture logs in via the API (not the UI) before the test starts,
 * then injects the session cookies into the browser context.
 *
 * Why API login in fixtures?
 * - Faster than UI login (one HTTP request vs full page interaction)
 * - More reliable (no UI flakiness in setup)
 * - Follows the principle: "test what you're testing, set up everything else via API"
 *
 * Usage:
 *   import { test } from '@fixtures/auth.fixture';
 *
 *   test('admin action', async ({ authenticatedAdminPage }) => {
 *     // Already logged in — no login steps needed
 *   });
 */

import { BrowserContext } from '@playwright/test';
import { test as baseTest, AllFixtures } from './base.fixture';
import { AdminPage } from '../pages/admin.page';
import { env } from '../config/env';
import { logger } from '../utils/logger';

export type AuthFixtures = AllFixtures & {
  /** A browser context pre-authenticated as admin */
  authenticatedContext: BrowserContext;
  /** AdminPage in a pre-authenticated context */
  authenticatedAdminPage: AdminPage;
};

export const test = baseTest.extend<AuthFixtures>({
  /**
   * Provides a browser context with admin session cookies already set.
   * The context is created fresh per test (isolated), not shared.
   */
  authenticatedContext: async ({ browser, authService }, use) => {
    // Get a valid admin session token from the WEB APP's own login endpoint.
    // (A token from the legacy API does NOT authenticate the web app UI.)
    const token = await authService.getUiAdminToken();
    logger.debug('Creating authenticated browser context');

    // Create a new isolated browser context
    const context = await browser.newContext({
      baseURL: env.baseUrl,
      storageState: {
        cookies: [
          {
            name: 'token',
            value: token,
            domain: new URL(env.baseUrl).hostname,
            path: '/',
            httpOnly: false,
            secure: false,
            sameSite: 'Lax',
            expires: -1,
          },
        ],
        origins: [],
      },
    });

    await use(context);

    // Clean up the context after the test
    await context.close();
  },

  /**
   * An AdminPage instance using the pre-authenticated context.
   * Tests using this fixture skip the login step entirely.
   */
  authenticatedAdminPage: async ({ authenticatedContext }, use) => {
    const page = await authenticatedContext.newPage();
    const adminPage = new AdminPage(page);
    await adminPage.goto();
    await use(adminPage);
    await page.close();
  },
});

export { expect } from '@playwright/test';
