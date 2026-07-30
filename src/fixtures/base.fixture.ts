/**
 * Base Test Fixtures.
 *
 * Playwright fixtures are the framework's dependency injection system.
 * They replace beforeEach/afterEach boilerplate and make setup/teardown
 * reusable, composable, and type-safe.
 *
 * Every fixture is:
 * - Set up automatically before each test that uses it
 * - Torn down automatically after the test completes (even on failure)
 * - Composable — fixtures can depend on other fixtures
 *
 * Usage in tests:
 *   import { test } from '@fixtures/base.fixture';
 *
 *   test('my test', async ({ loginPage, bookingService }) => {
 *     // loginPage and bookingService are pre-created and ready to use
 *   });
 *
 * @see https://playwright.dev/docs/test-fixtures
 */

import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AdminPage } from '../pages/admin.page';
import { HomePage } from '../pages/home.page';
import { ContactPage } from '../pages/contact.page';
import { BookingService } from '../api/services/booking.service';
import { AuthService } from '../api/services/auth.service';
import { BookingClient } from '../api/clients/booking.client';
import { AuthClient } from '../api/clients/auth.client';
import { HealthClient } from '../api/clients/health.client';
import { NavbarComponent } from '../components/navbar.component';
import { logger } from '../utils/logger';

// ---------------------------------------------------------------------------
// Fixture type definitions
// ---------------------------------------------------------------------------

export type PageFixtures = {
  loginPage: LoginPage;
  adminPage: AdminPage;
  homePage: HomePage;
  contactPage: ContactPage;
  navBar: NavbarComponent;
};

export type ServiceFixtures = {
  bookingService: BookingService;
  authService: AuthService;
};

export type ClientFixtures = {
  bookingClient: BookingClient;
  authClient: AuthClient;
  healthClient: HealthClient;
  authenticatedBookingClient: BookingClient;
};

export type AllFixtures = PageFixtures & ServiceFixtures & ClientFixtures;

// ---------------------------------------------------------------------------
// Base test — extends Playwright's built-in test with our custom fixtures
// ---------------------------------------------------------------------------

export const test = base.extend<AllFixtures>({
  // -------------------------------------------------------------------------
  // Page object fixtures
  // -------------------------------------------------------------------------

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
    // No teardown needed — page closes automatically
  },

  adminPage: async ({ page }, use) => {
    const adminPage = new AdminPage(page);
    await use(adminPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  contactPage: async ({ page }, use) => {
    const contactPage = new ContactPage(page);
    await use(contactPage);
  },

  navBar: async ({ page }, use) => {
    const navBar = new NavbarComponent(page);
    await use(navBar);
  },

  // -------------------------------------------------------------------------
  // Service fixtures (with automatic cleanup)
  // -------------------------------------------------------------------------

  authService: async ({}, use) => {
    const authService = new AuthService();
    await use(authService);
    // Invalidate cached token after test
    authService.invalidateCache();
  },

  bookingService: async ({ authService }, use) => {
    const bookingService = new BookingService(authService);
    await use(bookingService);

    // Automatic cleanup: delete all bookings created during this test
    logger.debug('Running booking service cleanup...');
    await bookingService.cleanup();
  },

  // -------------------------------------------------------------------------
  // API client fixtures (raw access for API tests)
  // -------------------------------------------------------------------------

  authClient: async ({}, use) => {
    const authClient = new AuthClient();
    await use(authClient);
  },

  bookingClient: async ({}, use) => {
    // Unauthenticated client for GET-only operations
    const bookingClient = new BookingClient();
    await use(bookingClient);
  },

  authenticatedBookingClient: async ({ authService }, use) => {
    // Authenticated client for write operations
    const token = await authService.getAdminToken();
    const client = new BookingClient(token);
    await use(client);
  },

  healthClient: async ({}, use) => {
    const healthClient = new HealthClient();
    await use(healthClient);
  },
});

// Re-export expect so tests can import everything from one place
export { expect } from '@playwright/test';
