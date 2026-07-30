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
        - link "Shady Meadows B&B" [ref=e6]:
          - /url: /
        - list [ref=e9]:
          - listitem [ref=e10]:
            - link "Rooms" [ref=e11]:
              - /url: /#rooms
          - listitem [ref=e12]:
            - link "Booking" [ref=e13]:
              - /url: /#booking
          - listitem [ref=e14]:
            - link "Amenities" [ref=e15]:
              - /url: /#amenities
          - listitem [ref=e16]:
            - link "Location" [ref=e17]:
              - /url: /#location
          - listitem [ref=e18]:
            - link "Contact" [ref=e19]:
              - /url: /#contact
          - listitem [ref=e20]:
            - link "Admin" [ref=e21]:
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
      - generic [ref=e52]:
        - generic [ref=e53]:
          - heading "Our Rooms" [level=2] [ref=e54]
          - paragraph [ref=e55]: Comfortable beds and delightful breakfast from locally sourced ingredients
        - generic [ref=e56]:
          - generic [ref=e58]:
            - img "Single Room" [ref=e60]
            - generic [ref=e61]:
              - heading "Single" [level=5] [ref=e62]
              - paragraph [ref=e63]: Aenean porttitor mauris sit amet lacinia molestie. In posuere accumsan aliquet. Maecenas sit amet nisl massa. Interdum et malesuada fames ac ante.
              - generic [ref=e65]:
                - generic [ref=e66]:
                  - generic [ref=e67]: 
                  - text: TV
                - generic [ref=e68]:
                  - generic [ref=e69]: 
                  - text: WiFi
                - generic [ref=e70]:
                  - generic [ref=e71]: 
                  - text: Safe
            - generic [ref=e72]:
              - generic [ref=e73]: £100 per night
              - link "Book now" [ref=e74] [cursor=pointer]:
                - /url: /reservation/1?checkin=2026-07-29&checkout=2026-07-30
          - generic [ref=e76]:
            - img "Single Room" [ref=e78]
            - generic [ref=e79]:
              - heading "Double" [level=5] [ref=e80]
              - paragraph [ref=e81]: Vestibulum sollicitudin, lectus ac mollis consequat, lorem orci ultrices tellus, eleifend euismod tortor dui egestas erat. Phasellus et ipsum nisl.
              - generic [ref=e83]:
                - generic [ref=e84]:
                  - generic [ref=e85]: 
                  - text: TV
                - generic [ref=e86]:
                  - generic [ref=e87]: 
                  - text: Radio
                - generic [ref=e88]:
                  - generic [ref=e89]: 
                  - text: Safe
            - generic [ref=e90]:
              - generic [ref=e91]: £150 per night
              - link "Book now" [ref=e92] [cursor=pointer]:
                - /url: /reservation/2?checkin=2026-07-29&checkout=2026-07-30
          - generic [ref=e94]:
            - img "Single Room" [ref=e96]
            - generic [ref=e97]:
              - heading "Suite" [level=5] [ref=e98]
              - paragraph [ref=e99]: Etiam metus metus, fringilla ac sagittis id, consequat vel neque. Nunc commodo quis nisl nec posuere. Etiam at accumsan ex.
              - generic [ref=e101]:
                - generic [ref=e102]:
                  - generic [ref=e103]: 
                  - text: Radio
                - generic [ref=e104]:
                  - generic [ref=e105]: 
                  - text: WiFi
                - generic [ref=e106]:
                  - generic [ref=e107]: 
                  - text: Safe
            - generic [ref=e108]:
              - generic [ref=e109]: £225 per night
              - link "Book now" [ref=e110] [cursor=pointer]:
                - /url: /reservation/3?checkin=2026-07-29&checkout=2026-07-30
    - generic [ref=e112]:
      - generic [ref=e113]:
        - heading "Our Location" [level=2] [ref=e114]
        - paragraph [ref=e115]: Find us in the beautiful Newingtonfordburyshire countryside
      - generic [ref=e116]:
        - generic [ref=e127]:
          - generic [ref=e128]:
            - link "Pigeon" [ref=e129]:
              - /url: https://pigeon-maps.js.org/
            - text: "|"
          - generic [ref=e130]:
            - text: ©
            - link "OpenStreetMap" [ref=e131]:
              - /url: https://www.openstreetmap.org/copyright
            - text: contributors
        - generic [ref=e134]:
          - heading "Contact Information" [level=3] [ref=e135]
          - generic [ref=e136]:
            - generic [ref=e137]: 
            - generic [ref=e139]:
              - heading "Address" [level=5] [ref=e140]
              - paragraph [ref=e141]: Shady Meadows B&B, Shadows valley, Newingtonfordburyshire, Dilbery, N1 1AA
          - generic [ref=e142]:
            - generic [ref=e143]: 
            - generic [ref=e145]:
              - heading "Phone" [level=5] [ref=e146]
              - paragraph [ref=e147]: "012345678901"
          - generic [ref=e148]:
            - generic [ref=e149]: 
            - generic [ref=e151]:
              - heading "Email" [level=5] [ref=e152]
              - paragraph [ref=e153]: fake@fakeemail.com
          - separator [ref=e154]
          - heading "Getting Here" [level=4] [ref=e155]
          - paragraph [ref=e156]: Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.
    - generic [ref=e162]:
      - heading "Send Us a Message" [level=3] [ref=e163]
      - generic [ref=e164]:
        - generic [ref=e165]:
          - generic [ref=e166]: Name
          - textbox "Name" [ref=e167]
        - generic [ref=e168]:
          - generic [ref=e169]: Email
          - textbox "Email" [ref=e170]
        - generic [ref=e171]:
          - generic [ref=e172]: Phone
          - textbox "Phone" [ref=e173]
        - generic [ref=e174]:
          - generic [ref=e175]: Subject
          - textbox "Subject" [ref=e176]
        - generic [ref=e177]:
          - generic [ref=e178]: Message
          - textbox [ref=e179]
        - button "Submit" [ref=e181] [cursor=pointer]
    - contentinfo [ref=e182]:
      - generic [ref=e183]:
        - generic [ref=e184]:
          - generic [ref=e185]:
            - heading "Shady Meadows B&B" [level=5] [ref=e186]
            - paragraph [ref=e187]: Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.
            - generic [ref=e188]:
              - link "" [ref=e189] [cursor=pointer]:
                - /url: "#"
              - link "" [ref=e191] [cursor=pointer]:
                - /url: "#"
              - link "" [ref=e193] [cursor=pointer]:
                - /url: "#"
          - generic [ref=e195]:
            - heading "Contact Us" [level=5] [ref=e196]
            - list [ref=e197]:
              - listitem [ref=e198]:
                - generic [ref=e199]: 
                - text: Shady Meadows B&B, Shadows valley, Newingtonfordburyshire, Dilbery, N1 1AA
              - listitem [ref=e200]:
                - generic [ref=e201]: 
                - text: "012345678901"
              - listitem [ref=e202]:
                - generic [ref=e203]: 
                - text: fake@fakeemail.com
          - generic [ref=e204]:
            - heading "Quick Links" [level=5] [ref=e205]
            - list [ref=e206]:
              - listitem [ref=e207]:
                - link "Home" [ref=e208]:
                  - /url: "#"
              - listitem [ref=e209]:
                - link "Rooms" [ref=e210]:
                  - /url: "#"
              - listitem [ref=e211]:
                - link "Booking" [ref=e212]:
                  - /url: "#"
              - listitem [ref=e213]:
                - link "Contact" [ref=e214]:
                  - /url: "#"
        - separator [ref=e215]
        - generic [ref=e217]:
          - text: restful-booker-platform v2.2 Created by
          - link "Mark Winteringham" [ref=e218]:
            - /url: http://www.mwtestconsultancy.co.uk
          - text: "- © 2019-26"
          - link "Cookie-Policy" [ref=e219]:
            - /url: /cookie
          - text: "-"
          - link "Privacy-Policy" [ref=e220]:
            - /url: /privacy
          - text: "-"
          - link "Admin panel" [ref=e221]:
            - /url: /admin
  - alert [ref=e222]
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