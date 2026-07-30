/**
 * Message Modal Component Object.
 *
 * Generic modal component used across the application.
 */

import { Page, Locator, expect } from '@playwright/test';

export class MessageModalComponent {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get modal(): Locator {
    return this.page.locator('.modal, [role="dialog"], [class*="modal"]').first();
  }

  get modalTitle(): Locator {
    return this.modal.locator('h1, h2, h3, .modal-title').first();
  }

  get modalBody(): Locator {
    return this.modal.locator('.modal-body, [class*="modal-content"]').first();
  }

  get closeButton(): Locator {
    return this.modal.getByRole('button', { name: /close|×|dismiss/i });
  }

  async close(): Promise<void> {
    await this.closeButton.click();
    await this.waitForHidden();
  }

  async waitForVisible(timeout: number = 10_000): Promise<void> {
    await this.modal.waitFor({ state: 'visible', timeout });
  }

  async waitForHidden(timeout: number = 10_000): Promise<void> {
    await this.modal.waitFor({ state: 'hidden', timeout });
  }

  async getTitle(): Promise<string> {
    return (await this.modalTitle.textContent()) ?? '';
  }

  async getBody(): Promise<string> {
    return (await this.modalBody.textContent()) ?? '';
  }

  async expectVisible(): Promise<void> {
    await expect(this.modal).toBeVisible();
  }

  async expectHidden(): Promise<void> {
    await expect(this.modal).not.toBeVisible();
  }

  async expectTitleContains(text: string): Promise<void> {
    await expect(this.modalTitle).toContainText(text);
  }
}
