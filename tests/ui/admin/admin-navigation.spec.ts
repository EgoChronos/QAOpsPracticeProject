/**
 * UI Tests — Admin Panel Navigation
 *
 * Tests navigation between admin panel sections.
 * Uses the auth fixture to avoid re-testing login in every test.
 *
 * This suite demonstrates:
 * - Using authenticated fixtures (API login, not UI login)
 * - Navigation testing
 * - URL assertion patterns
 *
 * Tags: @smoke @regression @navigation
 */

import { test, expect } from '@fixtures/auth.fixture';

test.describe('Admin Panel Navigation', () => {
  // ---------------------------------------------------------------------------
  // All tests in this describe block start pre-authenticated
  // ---------------------------------------------------------------------------

  test('should show admin dashboard after authentication @try @smoke @navigation', async ({
    authenticatedAdminPage,
  }) => {
    await authenticatedAdminPage.expectAdminDashboardVisible();
    await authenticatedAdminPage.expectNavLinksVisible();
  });

  test('should navigate to Rooms section @smoke @navigation', async ({
    authenticatedAdminPage,
  }) => {
    await authenticatedAdminPage.navigateToRooms();
    await expect(authenticatedAdminPage.page).toHaveURL(/rooms/);
  });

  test('should navigate to Report section @regression @navigation', async ({
    authenticatedAdminPage,
  }) => {
    await authenticatedAdminPage.navigateToReport();
    await expect(authenticatedAdminPage.page).toHaveURL(/report/);
  });

  test('should navigate to Branding section @regression @navigation', async ({
    authenticatedAdminPage,
  }) => {
    await authenticatedAdminPage.navigateToBranding();
    await expect(authenticatedAdminPage.page).toHaveURL(/branding/);
  });

  test('should navigate to Messages section @regression @navigation', async ({
    authenticatedAdminPage,
  }) => {
    await authenticatedAdminPage.navigateToMessages();
    await expect(authenticatedAdminPage.page).toHaveURL(/message/);
  });

  test('should navigate back to front page @regression @navigation', async ({
    authenticatedAdminPage,
  }) => {
    await authenticatedAdminPage.goToFrontPage();
    // Front page should not be the admin panel
    await expect(authenticatedAdminPage.page).not.toHaveURL(/admin/);
  });

  test('should show all expected navigation links @regression @navigation', async ({
    authenticatedAdminPage,
  }) => {
    await expect(authenticatedAdminPage.roomsNavLink).toBeVisible();
    await expect(authenticatedAdminPage.reportNavLink).toBeVisible();
    await expect(authenticatedAdminPage.brandingNavLink).toBeVisible();
    await expect(authenticatedAdminPage.messagesNavLink).toBeVisible();
    await expect(authenticatedAdminPage.logoutLink).toBeVisible();
  });
});
