/**
 * Global Teardown — runs once after all test suites complete.
 *
 * Responsibilities:
 * - Clean up any shared test state
 * - Remove temporary auth files
 * - Log test run summary
 */

import { FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { logger } from '../utils/logger';

const AUTH_STATE_FILE = path.join(process.cwd(), '.auth', 'admin.json');

async function globalTeardown(_config: FullConfig): Promise<void> {
  logger.info('='.repeat(60));
  logger.info('QAOps Playwright Framework — Global Teardown');
  logger.info('='.repeat(60));

  // Remove the stored auth state after all tests complete
  if (fs.existsSync(AUTH_STATE_FILE)) {
    fs.unlinkSync(AUTH_STATE_FILE);
    logger.info('✓ Auth state file cleaned up');
  }

  logger.info('Global teardown complete.');
  logger.info('='.repeat(60));
}

export default globalTeardown;
