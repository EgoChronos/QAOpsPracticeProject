# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/admin/admin-navigation.spec.ts >> Admin Panel Navigation >> should show all expected navigation links @regression @navigation
- Location: tests/ui/admin/admin-navigation.spec.ts:65:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: /rooms/i })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: /rooms/i })

```

```yaml
- navigation:
  - link "Restful Booker Platform Demo":
    - /url: /
  - button "Toggle navigation"
  - list
  - list:
    - listitem:
      - link "Front Page":
        - /url: /
    - listitem:
      - button "Logout"
- heading "Login" [level=2]
- text: Username
- textbox "Username":
  - /placeholder: Enter username
- text: Password
- textbox "Password"
- button "Login"
- alert
```

# Test source

```ts
  1  | /**
  2  |  * UI Tests — Admin Panel Navigation
  3  |  *
  4  |  * Tests navigation between admin panel sections.
  5  |  * Uses the auth fixture to avoid re-testing login in every test.
  6  |  *
  7  |  * This suite demonstrates:
  8  |  * - Using authenticated fixtures (API login, not UI login)
  9  |  * - Navigation testing
  10 |  * - URL assertion patterns
  11 |  *
  12 |  * Tags: @smoke @regression @navigation
  13 |  */
  14 | 
  15 | import { test, expect } from '@fixtures/auth.fixture';
  16 | 
  17 | test.describe('Admin Panel Navigation', () => {
  18 |   // ---------------------------------------------------------------------------
  19 |   // All tests in this describe block start pre-authenticated
  20 |   // ---------------------------------------------------------------------------
  21 | 
  22 |   test('should show admin dashboard after authentication @smoke @navigation', async ({
  23 |     authenticatedAdminPage,
  24 |   }) => {
  25 |     await authenticatedAdminPage.expectAdminDashboardVisible();
  26 |     await authenticatedAdminPage.expectNavLinksVisible();
  27 |   });
  28 | 
  29 |   test('should navigate to Rooms section @smoke @navigation', async ({
  30 |     authenticatedAdminPage,
  31 |   }) => {
  32 |     await authenticatedAdminPage.navigateToRooms();
  33 |     await expect(authenticatedAdminPage.page).toHaveURL(/rooms/);
  34 |   });
  35 | 
  36 |   test('should navigate to Report section @regression @navigation', async ({
  37 |     authenticatedAdminPage,
  38 |   }) => {
  39 |     await authenticatedAdminPage.navigateToReport();
  40 |     await expect(authenticatedAdminPage.page).toHaveURL(/report/);
  41 |   });
  42 | 
  43 |   test('should navigate to Branding section @regression @navigation', async ({
  44 |     authenticatedAdminPage,
  45 |   }) => {
  46 |     await authenticatedAdminPage.navigateToBranding();
  47 |     await expect(authenticatedAdminPage.page).toHaveURL(/branding/);
  48 |   });
  49 | 
  50 |   test('should navigate to Messages section @regression @navigation', async ({
  51 |     authenticatedAdminPage,
  52 |   }) => {
  53 |     await authenticatedAdminPage.navigateToMessages();
  54 |     await expect(authenticatedAdminPage.page).toHaveURL(/messages/);
  55 |   });
  56 | 
  57 |   test('should navigate back to front page @regression @navigation', async ({
  58 |     authenticatedAdminPage,
  59 |   }) => {
  60 |     await authenticatedAdminPage.goToFrontPage();
  61 |     // Front page should not be the admin panel
  62 |     await expect(authenticatedAdminPage.page).not.toHaveURL(/admin/);
  63 |   });
  64 | 
  65 |   test('should show all expected navigation links @regression @navigation', async ({
  66 |     authenticatedAdminPage,
  67 |   }) => {
> 68 |     await expect(authenticatedAdminPage.roomsNavLink).toBeVisible();
     |                                                       ^ Error: expect(locator).toBeVisible() failed
  69 |     await expect(authenticatedAdminPage.reportNavLink).toBeVisible();
  70 |     await expect(authenticatedAdminPage.brandingNavLink).toBeVisible();
  71 |     await expect(authenticatedAdminPage.messagesNavLink).toBeVisible();
  72 |     await expect(authenticatedAdminPage.logoutLink).toBeVisible();
  73 |   });
  74 | });
  75 | 
```