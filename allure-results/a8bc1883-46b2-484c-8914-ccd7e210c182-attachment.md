# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/admin/admin-navigation.spec.ts >> Admin Panel Navigation >> should navigate to Messages section @regression @navigation
- Location: tests/ui/admin/admin-navigation.spec.ts:50:7

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: /messages/i })

```

# Test source

```ts
  1   | /**
  2   |  * Admin Page Object.
  3   |  *
  4   |  * Covers the admin panel that appears after successful login.
  5   |  * Includes navigation, room management, and logout.
  6   |  */
  7   | 
  8   | import { Locator, expect } from '@playwright/test';
  9   | import { BasePage } from './base.page';
  10  | import { UIRoutes } from '../config/urls';
  11  | 
  12  | export class AdminPage extends BasePage {
  13  |   protected readonly path = UIRoutes.admin;
  14  | 
  15  |   // ---------------------------------------------------------------------------
  16  |   // Locators
  17  |   // ---------------------------------------------------------------------------
  18  | 
  19  |   // Navigation links
  20  |   get roomsNavLink(): Locator {
  21  |     return this.page.getByRole('link', { name: /rooms/i });
  22  |   }
  23  | 
  24  |   get reportNavLink(): Locator {
  25  |     return this.page.getByRole('link', { name: /report/i });
  26  |   }
  27  | 
  28  |   get brandingNavLink(): Locator {
  29  |     return this.page.getByRole('link', { name: /branding/i });
  30  |   }
  31  | 
  32  |   get messagesNavLink(): Locator {
  33  |     return this.page.getByRole('link', { name: /messages/i });
  34  |   }
  35  | 
  36  |   get logoutLink(): Locator {
  37  |     return this.page.getByRole('link', { name: /logout/i });
  38  |   }
  39  | 
  40  |   // Dashboard elements
  41  |   get adminPanelHeading(): Locator {
  42  |     return this.page.getByRole('heading', { name: /rooms|administration|admin/i }).first();
  43  |   }
  44  | 
  45  |   get roomsList(): Locator {
  46  |     return this.page.locator('.room-listing, [class*="room-list"]');
  47  |   }
  48  | 
  49  |   // Room creation
  50  |   get roomNameInput(): Locator {
  51  |     return this.page.locator('#roomName');
  52  |   }
  53  | 
  54  |   get roomTypeSelect(): Locator {
  55  |     return this.page.locator('#type');
  56  |   }
  57  | 
  58  |   get roomAccessibleSelect(): Locator {
  59  |     return this.page.locator('#accessible');
  60  |   }
  61  | 
  62  |   get roomPriceInput(): Locator {
  63  |     return this.page.locator('#roomPrice');
  64  |   }
  65  | 
  66  |   get createRoomButton(): Locator {
  67  |     return this.page.getByRole('button', { name: /create/i });
  68  |   }
  69  | 
  70  |   get frontPageLink(): Locator {
  71  |     return this.page.getByRole('link', { name: /front page/i });
  72  |   }
  73  | 
  74  |   // ---------------------------------------------------------------------------
  75  |   // Actions
  76  |   // ---------------------------------------------------------------------------
  77  | 
  78  |   /** Click the Rooms navigation link */
  79  |   async navigateToRooms(): Promise<void> {
  80  |     await this.roomsNavLink.click();
  81  |     await this.page.waitForURL(/rooms/);
  82  |   }
  83  | 
  84  |   /** Click the Report navigation link */
  85  |   async navigateToReport(): Promise<void> {
  86  |     await this.reportNavLink.click();
  87  |     await this.page.waitForURL(/report/);
  88  |   }
  89  | 
  90  |   /** Click the Branding navigation link */
  91  |   async navigateToBranding(): Promise<void> {
  92  |     await this.brandingNavLink.click();
  93  |     await this.page.waitForURL(/branding/);
  94  |   }
  95  | 
  96  |   /** Click the Messages navigation link */
  97  |   async navigateToMessages(): Promise<void> {
> 98  |     await this.messagesNavLink.click();
      |                                ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  99  |     await this.page.waitForURL(/messages/);
  100 |   }
  101 | 
  102 |   /** Perform admin logout */
  103 |   async logout(): Promise<void> {
  104 |     await this.logoutLink.click();
  105 |     await this.page.waitForURL(/\//);
  106 |   }
  107 | 
  108 |   /**
  109 |    * Create a new room via the admin form.
  110 |    */
  111 |   async createRoom(details: {
  112 |     name: string;
  113 |     type: string;
  114 |     accessible: boolean;
  115 |     price: number;
  116 |   }): Promise<void> {
  117 |     await this.roomNameInput.fill(details.name);
  118 |     await this.roomTypeSelect.selectOption(details.type);
  119 |     await this.roomAccessibleSelect.selectOption(details.accessible ? 'true' : 'false');
  120 |     await this.roomPriceInput.fill(String(details.price));
  121 |     await this.createRoomButton.click();
  122 |   }
  123 | 
  124 |   /** Navigate to the front-facing page */
  125 |   async goToFrontPage(): Promise<void> {
  126 |     await this.frontPageLink.click();
  127 |   }
  128 | 
  129 |   // ---------------------------------------------------------------------------
  130 |   // Assertions
  131 |   // ---------------------------------------------------------------------------
  132 | 
  133 |   /** Assert the admin dashboard is visible */
  134 |   async expectAdminDashboardVisible(): Promise<void> {
  135 |     await expect(this.page).toHaveURL(/admin/);
  136 |   }
  137 | 
  138 |   /** Assert a navigation link is visible */
  139 |   async expectNavLinksVisible(): Promise<void> {
  140 |     await expect(this.roomsNavLink).toBeVisible();
  141 |     await expect(this.reportNavLink).toBeVisible();
  142 |     await expect(this.logoutLink).toBeVisible();
  143 |   }
  144 | 
  145 |   /** Assert the user has been logged out */
  146 |   async expectLoggedOut(): Promise<void> {
  147 |     await expect(this.page).not.toHaveURL(/admin/);
  148 |   }
  149 | }
  150 | 
```