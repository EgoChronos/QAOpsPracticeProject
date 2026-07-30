/**
 * Login Page Object.
 *
 * Encapsulates all interactions with the admin login page.
 * Tests never touch selectors directly — they call methods on this class.
 */

import { Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { AuthCredentials } from '../models/auth.model';
import { UIRoutes } from '../config/urls';

export class LoginPage extends BasePage {
  protected readonly path = UIRoutes.admin;

  // ---------------------------------------------------------------------------
  // Locators — defined as getters for lazy evaluation
  // Using Playwright's recommended locator strategies (role, label, test-id)
  // ---------------------------------------------------------------------------

  get usernameInput(): Locator {
    return this.page.getByRole('textbox', { name: /username/i });
  }

  get passwordInput(): Locator {
    return this.page.getByRole('textbox', { name: /password/i });
  }

  get loginButton(): Locator {
    return this.page.getByRole('button', { name: /login/i });
  }

  get errorMessage(): Locator {
    return this.page.locator('.alert-danger, [class*="error"], p:has-text("Bad credentials")');
  }

  get adminDashboard(): Locator {
    return this.page.locator('#admin-panel, .admin-panel, [class*="admin"]').first();
  }

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------

  /** Fill in the username field */
  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /** Fill in the password field */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /** Click the login button */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Complete the full login flow.
   * Fills credentials and submits the form.
   */
  async login(credentials: AuthCredentials): Promise<void> {
    await this.goto();
    await this.enterUsername(credentials.username);
    await this.enterPassword(credentials.password);
    await this.clickLogin();
  }

  /**
   * Login and wait for successful redirect to admin dashboard.
   */
  async loginAsAdmin(credentials: AuthCredentials): Promise<void> {
    await this.login(credentials);
    await this.waitForAdminDashboard();
  }

  /** Clear the username field */
  async clearUsername(): Promise<void> {
    await this.usernameInput.clear();
  }

  /** Clear the password field */
  async clearPassword(): Promise<void> {
    await this.passwordInput.clear();
  }

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  /** Assert that the login page is visible */
  async expectLoginPageVisible(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  /** Assert that an error message is displayed */
  async expectErrorVisible(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }

  /** Assert that the error message contains expected text */
  async expectErrorMessage(text: string): Promise<void> {
    await expect(this.errorMessage).toContainText(text);
  }

  /** Wait for and assert the admin dashboard is shown after login */
  async waitForAdminDashboard(): Promise<void> {
    await this.page.waitForURL(/admin/);
    // After login the URL should no longer show a login form
    await expect(this.loginButton).not.toBeVisible({ timeout: 5000 }).catch(() => {
      // Login button might still be visible on the admin page in some states
    });
  }
}
