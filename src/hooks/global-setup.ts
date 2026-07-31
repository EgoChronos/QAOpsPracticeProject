/**
 * Global Setup — runs once before all test suites.
 *
 * Responsibilities:
 * 1. Validate that the target application is reachable
 * 2. Obtain an admin auth token and save it to disk
 * 3. Log configuration summary for CI debugging
 *
 * The saved auth state is consumed by authenticated fixtures,
 * avoiding repeated login API calls per test.
 *
 * @see https://playwright.dev/docs/test-global-setup-teardown
 */

import { FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { AuthService } from '../api/services/auth.service';
import { HealthClient } from '../api/clients/health.client';
import { env } from '../config/env';
import { logger } from '../utils/logger';

// Path where the admin auth token is stored between setup and tests -
const AUTH_DIR = path.join(process.cwd(), '.auth');
const AUTH_STATE_FILE = path.join(AUTH_DIR, 'admin.json');

async function globalSetup(_config: FullConfig): Promise<void> {
  logger.info('='.repeat(60));
  logger.info('QAOps Playwright Framework — Global Setup');
  logger.info('='.repeat(60));
  logger.info(`Environment  : ${env.testEnv}`);
  logger.info(`Base URL     : ${env.baseUrl}`);
  logger.info(`API URL      : ${env.apiUrl}`);
  logger.info(`Admin User   : ${env.adminUsername}`);
  logger.info(`CI Mode      : ${env.isCI}`);
  if (env.playwrightServiceUrl) {
    logger.info(`Service URL  : ${env.playwrightServiceUrl}`);
  }
  logger.info('='.repeat(60));

  // -------------------------------------------------------------------------
  // Step 1: Health check — verify API is reachable
  // -------------------------------------------------------------------------
  logger.info('Step 1: Checking API health...');
  const healthClient = new HealthClient();

  const isHealthy = await healthClient.isHealthy();
  if (!isHealthy) {
    logger.warn(
      'API health check returned unexpected response — tests may fail if the API is unavailable.',
    );
    logger.warn(`Check API URL: ${env.apiUrl}/ping`);
  } else {
    logger.info('✓ API is healthy');
  }

  // -------------------------------------------------------------------------
  // Step 2: Obtain admin auth token and persist to disk
  // -------------------------------------------------------------------------
  logger.info('Step 2: Obtaining admin auth token...');

  const authService = new AuthService();

  try {
    const authState = await authService.buildStoredState();

    // Ensure the .auth directory exists
    if (!fs.existsSync(AUTH_DIR)) {
      fs.mkdirSync(AUTH_DIR, { recursive: true });
    }

    // Write auth state to disk for use by fixtures
    fs.writeFileSync(AUTH_STATE_FILE, JSON.stringify(authState, null, 2), 'utf-8');
    logger.info(`✓ Admin token obtained and saved to: ${AUTH_STATE_FILE}`);
  } catch (error) {
    logger.error('Failed to obtain admin auth token', error);
    logger.error(
      'Tests requiring authentication will fail. Check ADMIN_USERNAME and ADMIN_PASSWORD in .env',
    );
    // Don't throw — let tests fail individually rather than blocking everything
  }

  logger.info('='.repeat(60));
  logger.info('Global setup complete. Starting tests...');
  logger.info('='.repeat(60));
}

export default globalSetup;
