/**
 * Base Page Object.
 *
 * All page objects extend this class.
 * Provides shared functionality:
 * - Navigation
 * - Waiting utilities
 * - Common assertions
 * - Screenshot capture
 *
 * Design principle: page objects expose WHAT the page can do,
 * not HOW the DOM is structured. Test code should read like
 * human actions, not like CSS selectors.
 */

import { Page, Locator, expect } from '@playwright/test';
import { Timeouts } from '../config/timeouts';
import { logger } from '../utils/logger';

export abstract class BasePage {
  public readonly page: Page;

  /**
   * The URL path for this page.
   * Subclasses should override with their specific path.
   */
  protected abstract readonly path: string;

  constructor(page: Page) {
    this.page = page;
  }

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------

  /** Navigate to this page's URL */
  async goto(): Promise<void> {
    logger.debug(`Navigating to: ${this.path}`);
    await this.page.goto(this.path);
    await this.waitForPageLoad();
  }

  /** Wait for the page to reach a stable state */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Get the current page URL */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /** Get the current page title */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  // ---------------------------------------------------------------------------
  // Waiting utilities
  // ---------------------------------------------------------------------------

  /** Wait for a locator to be visible */
  async waitForVisible(locator: Locator, timeout: number = Timeouts.DEFAULT): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /** Wait for a locator to be hidden */
  async waitForHidden(locator: Locator, timeout: number = Timeouts.DEFAULT): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  /** Assert the current URL contains the expected path */
  async expectUrl(pathOrUrl: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(pathOrUrl));
  }

  /** Assert the page title matches */
  async expectTitle(title: string): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }

  // ---------------------------------------------------------------------------
  // Debugging helpers
  // ---------------------------------------------------------------------------

  /** Capture a screenshot with a descriptive name */
  async captureScreenshot(name: string): Promise<Buffer> {
    logger.debug(`Capturing screenshot: ${name}`);
    return this.page.screenshot({ fullPage: true, path: `test-results/${name}.png` });
  }

  /** Scroll element into view and highlight it (useful during debugging) */
  async highlightElement(locator: Locator): Promise<void> {
    await locator.evaluate((el) => {
      (el as HTMLElement).style.outline = '3px solid red';
    });
  }
}
