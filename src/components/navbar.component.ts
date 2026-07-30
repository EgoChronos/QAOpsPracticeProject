/**
 * Navbar Component Object.
 *
 * Represents the navigation bar present on all pages.
 * Component objects follow the same pattern as Page Objects but
 * represent reusable UI components that appear across multiple pages.
 */

import { Page, Locator, expect } from '@playwright/test';

export class NavbarComponent {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ---------------------------------------------------------------------------
  // Locators
  // ---------------------------------------------------------------------------

  get logo(): Locator {
    return this.page.locator('.navbar-brand, [class*="logo"]').first();
  }

  get adminLink(): Locator {
    return this.page.getByRole('link', { name: /admin/i });
  }

  get homeLink(): Locator {
    return this.page.getByRole('link', { name: /home/i });
  }

  get navbar(): Locator {
    return this.page.locator('nav, .navbar').first();
  }

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------

  /** Click the admin link in the navbar */
  async clickAdmin(): Promise<void> {
    await this.adminLink.click();
  }

  /** Click the home/logo link */
  async clickHome(): Promise<void> {
    await this.homeLink.click();
  }

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  /** Assert the navbar is visible */
  async expectVisible(): Promise<void> {
    await expect(this.navbar).toBeVisible();
  }
}
