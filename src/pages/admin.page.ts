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

  get logoutLink(): Locator {
    return this.page.getByRole('link', { name: /logout/i });
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
    await this.page.waitForURL(/messages/);
  }

  /** Perform admin logout */
  async logout(): Promise<void> {
    await this.logoutLink.click();
    await this.page.waitForURL(/\//);
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
