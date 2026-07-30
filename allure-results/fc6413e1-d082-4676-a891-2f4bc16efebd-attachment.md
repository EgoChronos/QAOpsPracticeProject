# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/booking/create-booking.spec.ts >> Booking Flow — Home Page >> should complete a booking with valid guest details @regression @booking
- Location: tests/ui/booking/create-booking.spec.ts:33:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: /book this room/i }).or(locator('button.btn-outline-primary')).first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('button', { name: /book this room/i }).or(locator('button.btn-outline-primary')).first()

```

```yaml
- navigation:
  - link "Shady Meadows B&B":
    - /url: /
  - button
  - list:
    - listitem:
      - link "Rooms":
        - /url: /#rooms
    - listitem:
      - link "Booking":
        - /url: /#booking
    - listitem:
      - link "Amenities":
        - /url: /#amenities
    - listitem:
      - link "Location":
        - /url: /#location
    - listitem:
      - link "Contact":
        - /url: /#contact
    - listitem:
      - link "Admin":
        - /url: /admin
- heading "Welcome to Shady Meadows B&B" [level=1]
- paragraph: Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.
- link "Book Now":
  - /url: "#booking"
- heading "Check Availability & Book Your Stay" [level=3]
- text: Check In
- textbox: 29/07/2026
- text: Check Out
- textbox: 30/07/2026
- button "Check Availability"
- heading "Our Rooms" [level=2]
- paragraph: Comfortable beds and delightful breakfast from locally sourced ingredients
- img "Single Room"
- heading "Single" [level=5]
- paragraph: Aenean porttitor mauris sit amet lacinia molestie. In posuere accumsan aliquet. Maecenas sit amet nisl massa. Interdum et malesuada fames ac ante.
- text:  TV  WiFi  Safe £100 per night
- link "Book now":
  - /url: /reservation/1?checkin=2026-07-29&checkout=2026-07-30
- img "Single Room"
- heading "Double" [level=5]
- paragraph: Vestibulum sollicitudin, lectus ac mollis consequat, lorem orci ultrices tellus, eleifend euismod tortor dui egestas erat. Phasellus et ipsum nisl.
- text:  TV  Radio  Safe £150 per night
- link "Book now":
  - /url: /reservation/2?checkin=2026-07-29&checkout=2026-07-30
- img "Single Room"
- heading "Suite" [level=5]
- paragraph: Etiam metus metus, fringilla ac sagittis id, consequat vel neque. Nunc commodo quis nisl nec posuere. Etiam at accumsan ex.
- text:  Radio  WiFi  Safe £225 per night
- link "Book now":
  - /url: /reservation/3?checkin=2026-07-29&checkout=2026-07-30
- heading "Our Location" [level=2]
- paragraph: Find us in the beautiful Newingtonfordburyshire countryside
- img
- link "Pigeon":
  - /url: https://pigeon-maps.js.org/
- text: "| ©"
- link "OpenStreetMap":
  - /url: https://www.openstreetmap.org/copyright
- text: contributors
- heading "Contact Information" [level=3]
- text: 
- heading "Address" [level=5]
- paragraph: Shady Meadows B&B, Shadows valley, Newingtonfordburyshire, Dilbery, N1 1AA
- text: 
- heading "Phone" [level=5]
- paragraph: "012345678901"
- text: 
- heading "Email" [level=5]
- paragraph: fake@fakeemail.com
- separator
- heading "Getting Here" [level=4]
- paragraph: Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.
- heading "Send Us a Message" [level=3]
- text: Name
- textbox "Name"
- text: Email
- textbox "Email"
- text: Phone
- textbox "Phone"
- text: Subject
- textbox "Subject"
- text: Message
- textbox
- button "Submit"
- contentinfo:
  - heading "Shady Meadows B&B" [level=5]
  - paragraph: Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.
  - link "":
    - /url: "#"
  - link "":
    - /url: "#"
  - link "":
    - /url: "#"
  - heading "Contact Us" [level=5]
  - list:
    - listitem:  Shady Meadows B&B, Shadows valley, Newingtonfordburyshire, Dilbery, N1 1AA
    - listitem:  012345678901
    - listitem:  fake@fakeemail.com
  - heading "Quick Links" [level=5]
  - list:
    - listitem:
      - link "Home":
        - /url: "#"
    - listitem:
      - link "Rooms":
        - /url: "#"
    - listitem:
      - link "Booking":
        - /url: "#"
    - listitem:
      - link "Contact":
        - /url: "#"
  - separator
  - text: restful-booker-platform v2.2 Created by
  - link "Mark Winteringham":
    - /url: http://www.mwtestconsultancy.co.uk
  - text: "- © 2019-26"
  - link "Cookie-Policy":
    - /url: /cookie
  - text: "-"
  - link "Privacy-Policy":
    - /url: /privacy
  - text: "-"
  - link "Admin panel":
    - /url: /admin
- alert
```

# Test source

```ts
  1  | /**
  2  |  * UI Tests — Booking Flow
  3  |  *
  4  |  * Tests the end-to-end booking flow from the hotel home page.
  5  |  *
  6  |  * Key QAOps patterns demonstrated:
  7  |  * 1. API used to verify backend state after UI action
  8  |  * 2. bookingService tracks created bookings → automatic cleanup
  9  |  * 3. Tests are independent — no shared mutable state
  10 |  *
  11 |  * Tags: @regression @booking
  12 |  */
  13 | 
  14 | import { test, expect } from '../../../src/fixtures/base.fixture';
  15 | 
  16 | import { faker } from '@faker-js/faker';
  17 | import { randomPhone } from '../../../src/utils/string.utils';
  18 | import { addDays } from '../../../src/utils/date.utils';
  19 | 
  20 | test.describe('Booking Flow — Home Page', () => {
  21 |   test('should display rooms on the home page @smoke @booking', async ({ homePage }) => {
  22 |     await homePage.goto();
  23 |     await homePage.expectPageLoaded();
  24 |     await homePage.expectRoomsVisible();
  25 |   });
  26 | 
  27 |   test('should show at least one bookable room @smoke @booking', async ({ homePage }) => {
  28 |     await homePage.goto();
  29 |     const count = await homePage.getRoomCount();
  30 |     expect(count).toBeGreaterThan(0);
  31 |   });
  32 | 
  33 |   test(
  34 |     'should complete a booking with valid guest details @regression @booking',
  35 |     async ({ page, homePage }) => {
  36 |       await homePage.goto();
  37 | 
  38 |       // Click on the first room's Book button
  39 |       const bookButton = page
  40 |         .getByRole('button', { name: /book this room/i })
  41 |         .or(page.locator('button.btn-outline-primary'))
  42 |         .first();
  43 | 
  44 |       // Verify book button is present
> 45 |       await expect(bookButton).toBeVisible({ timeout: 10_000 });
     |                                ^ Error: expect(locator).toBeVisible() failed
  46 |       await bookButton.click();
  47 | 
  48 |       // A booking form should appear — fill in guest details
  49 |       const checkin = addDays(new Date(), 10);
  50 |       const checkout = addDays(checkin, 3);
  51 | 
  52 |       // Drag to select dates on the calendar (if present)
  53 |       const calendarVisible = await page
  54 |         .locator('.rdrCalendarWrapper')
  55 |         .isVisible()
  56 |         .catch(() => false);
  57 |       if (calendarVisible) {
  58 |         // Click start date then end date
  59 |         const dayNumbers = page.locator('.rdrDayNumber span');
  60 |         const dayCount = await dayNumbers.count();
  61 |         if (dayCount >= 4) {
  62 |           await dayNumbers.nth(checkin.getDate() - 1).click();
  63 |           await dayNumbers.nth(checkout.getDate() - 1).click();
  64 |         }
  65 |       }
  66 | 
  67 |       // Fill guest details
  68 |       const firstname = faker.person.firstName();
  69 |       const lastname = faker.person.lastName();
  70 | 
  71 |       await page.locator('input[name="firstname"]').first().fill(firstname).catch(() => {});
  72 |       await page.locator('input[name="lastname"]').first().fill(lastname).catch(() => {});
  73 |       await page
  74 |         .locator('input[name="email"]')
  75 |         .first()
  76 |         .fill(faker.internet.email())
  77 |         .catch(() => {});
  78 |       await page.locator('input[name="phone"]').first().fill(randomPhone(11)).catch(() => {});
  79 | 
  80 |       // Submit the form
  81 |       const submitBtn = page.getByRole('button', { name: /^book$/i }).first();
  82 |       if (await submitBtn.isVisible()) {
  83 |         await submitBtn.click();
  84 |       }
  85 | 
  86 |       // Check for success or that we progressed (flexible assertion)
  87 |       await page.waitForTimeout(2000);
  88 |       const url = page.url();
  89 |       expect(url).toBeTruthy();
  90 |     },
  91 |   );
  92 | 
  93 |   test('should show home page content @smoke @booking', async ({ homePage }) => {
  94 |     await homePage.goto();
  95 |     await expect(homePage.page).toHaveURL('/');
  96 |     await expect(homePage.pageHeading).toBeVisible();
  97 |   });
  98 | });
  99 | 
```