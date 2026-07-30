# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/auth/auth.spec.ts >> Auth API >> POST /auth >> should return a token with valid admin credentials @smoke @api @auth
- Location: tests/api/auth/auth.spec.ts:23:9

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1   | /**
  2   |  * API Tests — Authentication
  3   |  *
  4   |  * Tests the /auth endpoint covering token creation, invalid credentials,
  5   |  * and response validation.
  6   |  *
  7   |  * These tests run against the real Restful Booker API.
  8   |  * They use the API clients directly — no browser needed.
  9   |  *
  10  |  * Tags: @smoke @regression @api @auth
  11  |  */
  12  | 
  13  | import { test, expect } from '../../../src/fixtures/base.fixture';
  14  | import { AuthTokenSchema } from '../../../src/api/schemas/auth.schema';
  15  | import { env } from '../../../src/config/env';
  16  | 
  17  | test.describe('Auth API', () => {
  18  |   // ---------------------------------------------------------------------------
  19  |   // POST /auth — Happy path
  20  |   // ---------------------------------------------------------------------------
  21  | 
  22  |   test.describe('POST /auth', () => {
  23  |     test(
  24  |       'should return a token with valid admin credentials @smoke @api @auth',
  25  |       async ({ authClient }) => {
  26  |         const response = await authClient.createToken({
  27  |           username: env.adminUsername,
  28  |           password: env.adminPassword,
  29  |         });
  30  | 
  31  |         expect(response.status).toBe(200);
  32  | 
  33  |         // Validate response shape with Zod schema
  34  |         const validated = AuthTokenSchema.safeParse(response.data);
> 35  |         expect(validated.success).toBeTruthy();
      |                                   ^ Error: expect(received).toBeTruthy()
  36  | 
  37  |         if (validated.success) {
  38  |           expect(validated.data.token).toBeTruthy();
  39  |           expect(typeof validated.data.token).toBe('string');
  40  |           expect(validated.data.token.length).toBeGreaterThan(0);
  41  |         }
  42  |       },
  43  |     );
  44  | 
  45  |     test('should return Content-Type JSON header @regression @api @auth', async ({
  46  |       authClient,
  47  |     }) => {
  48  |       const response = await authClient.createToken({
  49  |         username: env.adminUsername,
  50  |         password: env.adminPassword,
  51  |       });
  52  | 
  53  |       expect(response.headers['content-type']).toContain('application/json');
  54  |     });
  55  | 
  56  |     test(
  57  |       'should return 200 status code even for invalid credentials @regression @api @auth',
  58  |       async ({ authClient }) => {
  59  |         // Restful Booker quirk: returns 200 with { reason: 'Bad credentials' }
  60  |         // instead of 401 — this is intentional API design for this demo app
  61  |         const response = await authClient.createToken({
  62  |           username: 'wrong_user',
  63  |           password: 'wrong_password',
  64  |         });
  65  | 
  66  |         expect(response.status).toBe(200);
  67  |       },
  68  |     );
  69  | 
  70  |     test(
  71  |       'should return bad credentials reason for invalid credentials @regression @api @auth',
  72  |       async ({ authClient }) => {
  73  |         const response = await authClient.createToken({
  74  |           username: 'wrong_user',
  75  |           password: 'wrong_password',
  76  |         });
  77  | 
  78  |         // Should contain a reason field instead of token
  79  |         const data = response.data as { reason?: string; token?: string };
  80  |         expect(data).toHaveProperty('reason');
  81  |         expect(data.reason).toBe('Bad credentials');
  82  |       },
  83  |     );
  84  | 
  85  |     test('should not return a token for invalid credentials @regression @api @auth', async ({
  86  |       authClient,
  87  |     }) => {
  88  |       const response = await authClient.createToken({
  89  |         username: 'invalid',
  90  |         password: 'invalid',
  91  |       });
  92  | 
  93  |       const data = response.data as { token?: string; reason?: string };
  94  |       // Should NOT have a token field
  95  |       expect(data.token).toBeUndefined();
  96  |     });
  97  | 
  98  |     test('should return a token for admin user @regression @api @auth', async ({ authService }) => {
  99  |       const token = await authService.getAdminToken();
  100 | 
  101 |       expect(token).toBeTruthy();
  102 |       expect(typeof token).toBe('string');
  103 |       expect(token.length).toBeGreaterThan(0);
  104 |     });
  105 |   });
  106 | });
  107 | 
```