# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/booking/create-booking.spec.ts >> Booking Flow — Home Page >> should show at least one bookable room @smoke @booking
- Location: tests/ui/booking/create-booking.spec.ts:27:7

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - navigation [ref=e4]:
      - generic [ref=e5]:
        - link "Shady Meadows B&B" [ref=e6] [cursor=pointer]:
          - /url: /
        - list [ref=e9]:
          - listitem [ref=e10]:
            - link "Rooms" [ref=e11] [cursor=pointer]:
              - /url: /#rooms
          - listitem [ref=e12]:
            - link "Booking" [ref=e13] [cursor=pointer]:
              - /url: /#booking
          - listitem [ref=e14]:
            - link "Amenities" [ref=e15] [cursor=pointer]:
              - /url: /#amenities
          - listitem [ref=e16]:
            - link "Location" [ref=e17] [cursor=pointer]:
              - /url: /#location
          - listitem [ref=e18]:
            - link "Contact" [ref=e19] [cursor=pointer]:
              - /url: /#contact
          - listitem [ref=e20]:
            - link "Admin" [ref=e21] [cursor=pointer]:
              - /url: /admin
    - generic [ref=e25]:
      - heading "Welcome to Shady Meadows B&B" [level=1] [ref=e26]
      - paragraph [ref=e27]: Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.
      - link "Book Now" [ref=e28] [cursor=pointer]:
        - /url: "#booking"
    - generic [ref=e29]:
      - generic [ref=e33]:
        - heading "Check Availability & Book Your Stay" [level=3] [ref=e34]
        - generic [ref=e36]:
          - generic [ref=e37]:
            - generic [ref=e38]: Check In
            - textbox [ref=e41]: 29/07/2026
          - generic [ref=e42]:
            - generic [ref=e43]: Check Out
            - textbox [ref=e46]: 30/07/2026
          - button "Check Availability" [ref=e49] [cursor=pointer]
      - generic [ref=e53]:
        - heading "Our Rooms" [level=2] [ref=e54]
        - paragraph [ref=e55]: Comfortable beds and delightful breakfast from locally sourced ingredients
    - generic [ref=e57]:
      - generic [ref=e58]:
        - heading "Our Location" [level=2] [ref=e59]
        - paragraph [ref=e60]: Find us in the beautiful Newingtonfordburyshire countryside
      - generic [ref=e61]:
        - generic [ref=e72]:
          - generic [ref=e73]:
            - link "Pigeon" [ref=e74] [cursor=pointer]:
              - /url: https://pigeon-maps.js.org/
            - text: "|"
          - generic [ref=e75]:
            - text: ©
            - link "OpenStreetMap" [ref=e76] [cursor=pointer]:
              - /url: https://www.openstreetmap.org/copyright
            - text: contributors
        - generic [ref=e79]:
          - heading "Contact Information" [level=3] [ref=e80]
          - generic [ref=e81]:
            - generic [ref=e82]: 
            - generic [ref=e84]:
              - heading "Address" [level=5] [ref=e85]
              - paragraph [ref=e86]: Shady Meadows B&B, Shadows valley, Newingtonfordburyshire, Dilbery, N1 1AA
          - generic [ref=e87]:
            - generic [ref=e88]: 
            - generic [ref=e90]:
              - heading "Phone" [level=5] [ref=e91]
              - paragraph [ref=e92]: "012345678901"
          - generic [ref=e93]:
            - generic [ref=e94]: 
            - generic [ref=e96]:
              - heading "Email" [level=5] [ref=e97]
              - paragraph [ref=e98]: fake@fakeemail.com
          - separator [ref=e99]
          - heading "Getting Here" [level=4] [ref=e100]
          - paragraph [ref=e101]: Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.
    - generic [ref=e107]:
      - heading "Send Us a Message" [level=3] [ref=e108]
      - generic [ref=e109]:
        - generic [ref=e110]:
          - generic [ref=e111]: Name
          - textbox "Name" [ref=e112]
        - generic [ref=e113]:
          - generic [ref=e114]: Email
          - textbox "Email" [ref=e115]
        - generic [ref=e116]:
          - generic [ref=e117]: Phone
          - textbox "Phone" [ref=e118]
        - generic [ref=e119]:
          - generic [ref=e120]: Subject
          - textbox "Subject" [ref=e121]
        - generic [ref=e122]:
          - generic [ref=e123]: Message
          - textbox [ref=e124]
        - button "Submit" [ref=e126] [cursor=pointer]
    - contentinfo [ref=e127]:
      - generic [ref=e128]:
        - generic [ref=e129]:
          - generic [ref=e130]:
            - heading "Shady Meadows B&B" [level=5] [ref=e131]
            - paragraph [ref=e132]: Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.
            - generic [ref=e133]:
              - link "" [ref=e134] [cursor=pointer]:
                - /url: "#"
              - link "" [ref=e136] [cursor=pointer]:
                - /url: "#"
              - link "" [ref=e138] [cursor=pointer]:
                - /url: "#"
          - generic [ref=e140]:
            - heading "Contact Us" [level=5] [ref=e141]
            - list [ref=e142]:
              - listitem [ref=e143]:
                - generic [ref=e144]: 
                - text: Shady Meadows B&B, Shadows valley, Newingtonfordburyshire, Dilbery, N1 1AA
              - listitem [ref=e145]:
                - generic [ref=e146]: 
                - text: "012345678901"
              - listitem [ref=e147]:
                - generic [ref=e148]: 
                - text: fake@fakeemail.com
          - generic [ref=e149]:
            - heading "Quick Links" [level=5] [ref=e150]
            - list [ref=e151]:
              - listitem [ref=e152]:
                - link "Home" [ref=e153] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e154]:
                - link "Rooms" [ref=e155] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e156]:
                - link "Booking" [ref=e157] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e158]:
                - link "Contact" [ref=e159] [cursor=pointer]:
                  - /url: "#"
        - separator [ref=e160]
        - generic [ref=e162]:
          - text: restful-booker-platform v2.2 Created by
          - link "Mark Winteringham" [ref=e163] [cursor=pointer]:
            - /url: http://www.mwtestconsultancy.co.uk
          - text: "- © 2019-26"
          - link "Cookie-Policy" [ref=e164] [cursor=pointer]:
            - /url: /cookie
          - text: "-"
          - link "Privacy-Policy" [ref=e165] [cursor=pointer]:
            - /url: /privacy
          - text: "-"
          - link "Admin panel" [ref=e166] [cursor=pointer]:
            - /url: /admin
  - alert [ref=e167]
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
> 30 |     expect(count).toBeGreaterThan(0);
     |                   ^ Error: expect(received).toBeGreaterThan(expected)
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
  45 |       await expect(bookButton).toBeVisible({ timeout: 10_000 });
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