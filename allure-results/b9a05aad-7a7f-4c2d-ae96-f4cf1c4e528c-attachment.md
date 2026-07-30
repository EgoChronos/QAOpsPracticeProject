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
        - button [ref=e7]
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
            - text: Check In
            - textbox [ref=e40]: 29/07/2026
          - generic [ref=e41]:
            - text: Check Out
            - textbox [ref=e44]: 30/07/2026
          - button "Check Availability" [ref=e46]
      - generic [ref=e48]:
        - generic [ref=e49]:
          - heading "Our Rooms" [level=2] [ref=e50]
          - paragraph [ref=e51]: Comfortable beds and delightful breakfast from locally sourced ingredients
        - generic [ref=e52]:
          - generic [ref=e54]:
            - img "Single Room" [ref=e56]
            - generic [ref=e57]:
              - heading "Single" [level=5] [ref=e58]
              - paragraph [ref=e59]: Aenean porttitor mauris sit amet lacinia molestie. In posuere accumsan aliquet. Maecenas sit amet nisl massa. Interdum et malesuada fames ac ante.
              - generic [ref=e61]:
                - generic [ref=e62]:
                  - generic [ref=e63]: 
                  - text: TV
                - generic [ref=e64]:
                  - generic [ref=e65]: 
                  - text: WiFi
                - generic [ref=e66]:
                  - generic [ref=e67]: 
                  - text: Safe
            - generic [ref=e68]:
              - generic [ref=e69]: £100 per night
              - link "Book now" [ref=e70] [cursor=pointer]:
                - /url: /reservation/1?checkin=2026-07-29&checkout=2026-07-30
          - generic [ref=e72]:
            - img "Single Room" [ref=e74]
            - generic [ref=e75]:
              - heading "Double" [level=5] [ref=e76]
              - paragraph [ref=e77]: Vestibulum sollicitudin, lectus ac mollis consequat, lorem orci ultrices tellus, eleifend euismod tortor dui egestas erat. Phasellus et ipsum nisl.
              - generic [ref=e79]:
                - generic [ref=e80]:
                  - generic [ref=e81]: 
                  - text: TV
                - generic [ref=e82]:
                  - generic [ref=e83]: 
                  - text: Radio
                - generic [ref=e84]:
                  - generic [ref=e85]: 
                  - text: Safe
            - generic [ref=e86]:
              - generic [ref=e87]: £150 per night
              - link "Book now" [ref=e88] [cursor=pointer]:
                - /url: /reservation/2?checkin=2026-07-29&checkout=2026-07-30
          - generic [ref=e90]:
            - img "Single Room" [ref=e92]
            - generic [ref=e93]:
              - heading "Suite" [level=5] [ref=e94]
              - paragraph [ref=e95]: Etiam metus metus, fringilla ac sagittis id, consequat vel neque. Nunc commodo quis nisl nec posuere. Etiam at accumsan ex.
              - generic [ref=e97]:
                - generic [ref=e98]:
                  - generic [ref=e99]: 
                  - text: Radio
                - generic [ref=e100]:
                  - generic [ref=e101]: 
                  - text: WiFi
                - generic [ref=e102]:
                  - generic [ref=e103]: 
                  - text: Safe
            - generic [ref=e104]:
              - generic [ref=e105]: £225 per night
              - link "Book now" [ref=e106] [cursor=pointer]:
                - /url: /reservation/3?checkin=2026-07-29&checkout=2026-07-30
    - generic [ref=e108]:
      - generic [ref=e109]:
        - heading "Our Location" [level=2] [ref=e110]
        - paragraph [ref=e111]: Find us in the beautiful Newingtonfordburyshire countryside
      - generic [ref=e112]:
        - generic [ref=e120]:
          - generic [ref=e121]:
            - link "Pigeon" [ref=e122] [cursor=pointer]:
              - /url: https://pigeon-maps.js.org/
            - text: "|"
          - generic [ref=e123]:
            - text: ©
            - link "OpenStreetMap" [ref=e124] [cursor=pointer]:
              - /url: https://www.openstreetmap.org/copyright
            - text: contributors
        - generic [ref=e127]:
          - heading "Contact Information" [level=3] [ref=e128]
          - generic [ref=e129]:
            - generic [ref=e130]: 
            - generic [ref=e132]:
              - heading "Address" [level=5] [ref=e133]
              - paragraph [ref=e134]: Shady Meadows B&B, Shadows valley, Newingtonfordburyshire, Dilbery, N1 1AA
          - generic [ref=e135]:
            - generic [ref=e136]: 
            - generic [ref=e138]:
              - heading "Phone" [level=5] [ref=e139]
              - paragraph [ref=e140]: "012345678901"
          - generic [ref=e141]:
            - generic [ref=e142]: 
            - generic [ref=e144]:
              - heading "Email" [level=5] [ref=e145]
              - paragraph [ref=e146]: fake@fakeemail.com
          - separator [ref=e147]
          - heading "Getting Here" [level=4] [ref=e148]
          - paragraph [ref=e149]: Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.
    - generic [ref=e155]:
      - heading "Send Us a Message" [level=3] [ref=e156]
      - generic [ref=e157]:
        - generic [ref=e158]:
          - text: Name
          - textbox "Name" [ref=e159]
        - generic [ref=e160]:
          - text: Email
          - textbox "Email" [ref=e161]
        - generic [ref=e162]:
          - text: Phone
          - textbox "Phone" [ref=e163]
        - generic [ref=e164]:
          - text: Subject
          - textbox "Subject" [ref=e165]
        - generic [ref=e166]:
          - text: Message
          - textbox [ref=e167]
        - button "Submit" [ref=e169]
    - contentinfo [ref=e170]:
      - generic [ref=e171]:
        - generic [ref=e172]:
          - generic [ref=e173]:
            - heading "Shady Meadows B&B" [level=5] [ref=e174]
            - paragraph [ref=e175]: Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.
            - generic [ref=e176]:
              - link "" [ref=e177] [cursor=pointer]:
                - /url: "#"
              - link "" [ref=e179] [cursor=pointer]:
                - /url: "#"
              - link "" [ref=e181] [cursor=pointer]:
                - /url: "#"
          - generic [ref=e183]:
            - heading "Contact Us" [level=5] [ref=e184]
            - list [ref=e185]:
              - listitem [ref=e186]:
                - generic [ref=e187]: 
                - text: Shady Meadows B&B, Shadows valley, Newingtonfordburyshire, Dilbery, N1 1AA
              - listitem [ref=e188]:
                - generic [ref=e189]: 
                - text: "012345678901"
              - listitem [ref=e190]:
                - generic [ref=e191]: 
                - text: fake@fakeemail.com
          - generic [ref=e192]:
            - heading "Quick Links" [level=5] [ref=e193]
            - list [ref=e194]:
              - listitem [ref=e195]:
                - link "Home" [ref=e196] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e197]:
                - link "Rooms" [ref=e198] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e199]:
                - link "Booking" [ref=e200] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e201]:
                - link "Contact" [ref=e202] [cursor=pointer]:
                  - /url: "#"
        - separator [ref=e203]
        - generic [ref=e205]:
          - text: restful-booker-platform v2.2 Created by
          - link "Mark Winteringham" [ref=e206] [cursor=pointer]:
            - /url: http://www.mwtestconsultancy.co.uk
          - text: "- © 2019-26"
          - link "Cookie-Policy" [ref=e207] [cursor=pointer]:
            - /url: /cookie
          - text: "-"
          - link "Privacy-Policy" [ref=e208] [cursor=pointer]:
            - /url: /privacy
          - text: "-"
          - link "Admin panel" [ref=e209] [cursor=pointer]:
            - /url: /admin
  - alert [ref=e210]
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