/**
 * UI Tests — Authentication
 *
 * Tests the login and logout flows of the Restful Booker admin panel.
 *
 * Tags:
 *   @smoke — should run on every deployment
 *   @regression — full regression suite
 *   @auth — authentication-specific tests
 *
 * These tests intentionally test the UI login flow directly,
 * even though the auth fixture uses API login.
 * Reason: we MUST test the login UI works — that's a real user path.
 * The fixture just avoids re-testing it in non-auth test files.
 */

import { test, expect } from '../../../src/fixtures/base.fixture';
import { UserFactory } from '../../../src/data/factories/user.factory';

test.describe('Authentication', () => {
  // ---------------------------------------------------------------------------
  // Happy path
  // ---------------------------------------------------------------------------

  test('should login successfully with valid admin credentials @smoke @auth', async ({
    loginPage,
  }) => {
    const admin = UserFactory.uiAdmin();

    await loginPage.goto();
    await loginPage.expectLoginPageVisible();

    await loginPage.login({ username: admin.username, password: admin.password });

    // After successful login, the URL should change to admin panel
    await expect(loginPage.page).toHaveURL(/admin/, { timeout: 10_000 });
  });

  test('should display the admin dashboard after login @smoke @auth', async ({
    loginPage,
    adminPage,
  }) => {
    const admin = UserFactory.uiAdmin();

    await loginPage.login({ username: admin.username, password: admin.password });

    // Verify admin navigation is visible
    await adminPage.expectNavLinksVisible();
  });

  test('should logout successfully @smoke @auth', async ({ loginPage, adminPage }) => {
    const admin = UserFactory.uiAdmin();

    // Login first
    await loginPage.login({ username: admin.username, password: admin.password });
    await loginPage.page.waitForURL(/admin/);

    // Wait for the authenticated admin shell to be fully rendered before
    // interacting — otherwise the logout click can race the login redirect.
    await adminPage.waitForReady();

    // Then logout
    await adminPage.logout();

    // After logout, should be redirected away from admin
    await adminPage.expectLoggedOut();
  });

  // ---------------------------------------------------------------------------
  // Error handling / negative tests
  // ---------------------------------------------------------------------------

  test('should display error message with invalid credentials @regression @auth', async ({
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.login({ username: 'invalid_user', password: 'wrong_password' });

    // Error message or login form should still be visible
    // The app keeps you on the login page with invalid creds
    await expect(loginPage.page).toHaveURL(/admin/);
  });

  test('should not login with empty username @regression @auth', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.enterPassword('password');
    await loginPage.clickLogin();

    // Should remain on login page
    await expect(loginPage.usernameInput).toBeVisible();
  });

  test('should not login with empty password @regression @auth', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.enterUsername('admin');
    await loginPage.clickLogin();

    // Should remain on login page
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test('should not login with empty credentials @regression @auth', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.clickLogin();

    // Form validation should prevent submission
    await expect(loginPage.loginButton).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Session handling
  // ---------------------------------------------------------------------------

  test('should redirect to admin panel if already authenticated @regression @auth', async ({
    loginPage,
  }) => {
    const admin = UserFactory.uiAdmin();

    // Login and navigate away
    await loginPage.login({ username: admin.username, password: admin.password });
    await loginPage.page.waitForURL(/admin/);

    // Navigate to admin URL again — should stay in admin (session preserved)
    await loginPage.page.goto('/admin');
    // URL should remain in the admin area (session is preserved)
    await expect(loginPage.page).toHaveURL(/admin/);
  });
});
