/**
 * API Tests — Authentication
 *
 * Tests the /auth endpoint covering token creation, invalid credentials,
 * and response validation.
 *
 * These tests run against the real Restful Booker API.
 * They use the API clients directly — no browser needed.
 *
 * Tags: @smoke @regression @api @auth
 */

import { test, expect } from '../../../src/fixtures/base.fixture';
import { AuthTokenSchema } from '../../../src/api/schemas/auth.schema';
import { env } from '../../../src/config/env';

test.describe('Auth API', () => {
  // ---------------------------------------------------------------------------
  // POST /auth — Happy path
  // ---------------------------------------------------------------------------

  test.describe('POST /auth', () => {
    test(
      'should return a token with valid admin credentials @smoke @api @auth',
      async ({ authClient }) => {
        const response = await authClient.createToken({
          username: env.adminUsername,
          password: env.adminPassword,
        });

        expect(response.status).toBe(200);

        // Validate response shape with Zod schema
        const validated = AuthTokenSchema.safeParse(response.data);
        expect(validated.success).toBeTruthy();

        if (validated.success) {
          expect(validated.data.token).toBeTruthy();
          expect(typeof validated.data.token).toBe('string');
          expect(validated.data.token.length).toBeGreaterThan(0);
        }
      },
    );

    test('should return Content-Type JSON header @regression @api @auth', async ({
      authClient,
    }) => {
      const response = await authClient.createToken({
        username: env.adminUsername,
        password: env.adminPassword,
      });

      expect(response.headers['content-type']).toContain('application/json');
    });

    test(
      'should return 200 status code even for invalid credentials @regression @api @auth',
      async ({ authClient }) => {
        // Restful Booker quirk: returns 200 with { reason: 'Bad credentials' }
        // instead of 401 — this is intentional API design for this demo app
        const response = await authClient.createToken({
          username: 'wrong_user',
          password: 'wrong_password',
        });

        expect(response.status).toBe(200);
      },
    );

    test(
      'should return bad credentials reason for invalid credentials @regression @api @auth',
      async ({ authClient }) => {
        const response = await authClient.createToken({
          username: 'wrong_user',
          password: 'wrong_password',
        });

        // Should contain a reason field instead of token
        const data = response.data as { reason?: string; token?: string };
        expect(data).toHaveProperty('reason');
        expect(data.reason).toBe('Bad credentials');
      },
    );

    test('should not return a token for invalid credentials @regression @api @auth', async ({
      authClient,
    }) => {
      const response = await authClient.createToken({
        username: 'invalid',
        password: 'invalid',
      });

      const data = response.data as { token?: string; reason?: string };
      // Should NOT have a token field
      expect(data.token).toBeUndefined();
    });

    test('should return a token for admin user @regression @api @auth', async ({ authService }) => {
      const token = await authService.getAdminToken();

      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });
  });
});
