/**
 * Admin Page Object.
 *
 * Covers the admin panel that appears after successful login.
 * Includes navigation, room management, and logout.
 */

import { Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { UIRoutes } from '../config/urls';

export class AdminPage extends BasePage {
  protected readonly path = UIRoutes.admin;

  // ---------------------------------------------------------------------------
  // Locators
  // ---------------------------------------------------------------------------

  // Navigation links
  get roomsNavLink(): Locator {
    return this.page.getByRole('link', { name: /rooms/i });
  }

  get reportNavLink(): Locator {
    return this.page.getByRole('link', { name: /report/i });
  }

  get brandingNavLink(): Locator {
    return this.page.getByRole('link', { name: /branding/i });
  }

  get messagesNavLink(): Locator {
    return this.page.getByRole('link', { name: /messages/i });
  }

  /**
   * Logout control.
   * In the current app (automationintesting.online) logout is rendered as
   * a BUTTON, not a link — using getByRole('button') matches both reliably.
   */
  get logoutLink(): Locator {
    return this.page.getByRole('button', { name: /logout/i });
  }

  // Dashboard elements
  get adminPanelHeading(): Locator {
    return this.page.getByRole('heading', { name: /rooms|administration|admin/i }).first();
  }

  get roomsList(): Locator {
    return this.page.locator('.room-listing, [class*="room-list"]');
  }

  // Room creation
  get roomNameInput(): Locator {
    return this.page.locator('#roomName');
  }

  get roomTypeSelect(): Locator {
    return this.page.locator('#type');
  }

  get roomAccessibleSelect(): Locator {
    return this.page.locator('#accessible');
  }

  get roomPriceInput(): Locator {
    return this.page.locator('#roomPrice');
  }

  get createRoomButton(): Locator {
    return this.page.getByRole('button', { name: /create/i });
  }

  get frontPageLink(): Locator {
    return this.page.getByRole('link', { name: /front page/i });
  }

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------

  /** Navigate to admin panel and wait for the authenticated shell to render */
  async goto(): Promise<void> {
    await super.goto();
    await this.waitForReady();
  }

  /**
   * Wait until the authenticated admin shell has fully settled.
   *
   * The login POST triggers a redirect that passes through `/admin` before
   * reaching the final authenticated route `/admin/rooms`. Interacting during
   * that transition loses clicks (React re-renders the tree), so we first
   * wait for the settled route, then for the logout button — a reliable
   * signal that the admin session is active.
   */
  async waitForReady(): Promise<void> {
    await this.page.waitForURL(/admin\/rooms/, { timeout: 20_000 });
    await this.logoutLink.waitFor({ state: 'visible', timeout: 20_000 });
  }

  /** Click the Rooms navigation link */
  async navigateToRooms(): Promise<void> {
    await this.roomsNavLink.click();
    await this.page.waitForURL(/rooms/);
  }

  /** Click the Report navigation link */
  async navigateToReport(): Promise<void> {
    await this.reportNavLink.click();
    await this.page.waitForURL(/report/);
  }

  /** Click the Branding navigation link */
  async navigateToBranding(): Promise<void> {
    await this.brandingNavLink.click();
    await this.page.waitForURL(/branding/);
  }

  /** Click the Messages navigation link */
  async navigateToMessages(): Promise<void> {
    await this.messagesNavLink.click();
    // The app uses /admin/message (singular) — wait for either spelling.
    await this.page.waitForURL(/message/);
  }

  /** Perform admin logout */
  async logout(): Promise<void> {
    // Capture the logout navigation concurrently with the click — the click
    // itself triggers a client-side route change, so waiting on it first is
    // more reliable than racing the click with a waitForURL.
    await Promise.all([
      this.page.waitForURL(
        (url) => !url.pathname.startsWith('/admin'),
        { timeout: 10_000 },
      ),
      this.logoutLink.click(),
    ]);
  }

  /**
   * Create a new room via the admin form.
   */
  async createRoom(details: {
    name: string;
    type: string;
    accessible: boolean;
    price: number;
  }): Promise<void> {
    await this.roomNameInput.fill(details.name);
    await this.roomTypeSelect.selectOption(details.type);
    await this.roomAccessibleSelect.selectOption(details.accessible ? 'true' : 'false');
    await this.roomPriceInput.fill(String(details.price));
    await this.createRoomButton.click();
  }

  /** Navigate to the front-facing page */
  async goToFrontPage(): Promise<void> {
    await this.frontPageLink.click();
  }

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  /** Assert the admin dashboard is visible */
  async expectAdminDashboardVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/admin/);
  }

  /** Assert a navigation link is visible */
  async expectNavLinksVisible(): Promise<void> {
    await expect(this.roomsNavLink).toBeVisible();
    await expect(this.reportNavLink).toBeVisible();
    await expect(this.logoutLink).toBeVisible();
  }

  /** Assert the user has been logged out */
  async expectLoggedOut(): Promise<void> {
    await expect(this.page).not.toHaveURL(/admin/);
  }
}
