/**
 * API Tests — Health Check
 *
 * Tests the /ping endpoint to verify API availability.
 * These are the fastest, most lightweight tests — ideal for:
 * - Pre-flight checks in CI pipelines
 * - Smoke tests after deployment
 * - Canary tests in monitoring
 *
 * Tags: @smoke @api @health
 */

import { test, expect } from '../../../src/fixtures/base.fixture';

test.describe('Health API', () => {
  test.describe('GET /ping', () => {
    test('should return 201 when API is healthy @smoke @api @health', async ({ healthClient }) => {
      const response = await healthClient.ping();
      // Restful Booker returns 201 for the ping endpoint (by design)
      expect(response.status).toBe(201);
    });

    test('should confirm API is reachable @smoke @api @health', async ({ healthClient }) => {
      const isHealthy = await healthClient.isHealthy();
      expect(isHealthy).toBeTruthy();
    });

    test('should respond within acceptable time @regression @api @health', async ({
      healthClient,
    }) => {
      const startTime = Date.now();
      await healthClient.ping();
      const duration = Date.now() - startTime;

      // API should respond within 5 seconds
      expect(duration).toBeLessThan(5000);
    });

    test('should return a response body @regression @api @health', async ({ healthClient }) => {
      const response = await healthClient.ping();
      // Response should have some content (even if just "Created")
      expect(response.data).toBeDefined();
    });
  });
});
