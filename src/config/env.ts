/**
 * Environment configuration loader.
 *
 * Centralises all environment variable access behind a typed interface.
 * This prevents scattered process.env calls throughout the codebase and
 * gives us a single place to validate and document required config.
 *
 * Usage:
 *   import { env } from '@config/env';
 *   const url = env.baseUrl;
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

/**
 * Retrieves an environment variable, throwing if required and missing.
 */
function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;
  if (value === undefined || value === '') {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
        `Check your .env file or CI/CD pipeline configuration.\n` +
        `See .env.example for all supported variables.`,
    );
  }
  return value;
}

function getOptionalEnvVar(key: string, defaultValue: string = ''): string {
  return process.env[key] ?? defaultValue;
}

function getBooleanEnvVar(key: string, defaultValue: boolean = false): boolean {
  const value = process.env[key];
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true' || value === '1';
}

function getNumberEnvVar(key: string, defaultValue: number): number {
  const value = process.env[key];
  if (value === undefined || value === '') return defaultValue;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(`Environment variable ${key} must be a number, got: "${value}"`);
  }
  return parsed;
}

// ---------------------------------------------------------------------------
// Supported environments
// ---------------------------------------------------------------------------
export type TestEnvironment = 'local' | 'dev' | 'staging' | 'production';

function parseTestEnv(value: string): TestEnvironment {
  const valid: TestEnvironment[] = ['local', 'dev', 'staging', 'production'];
  if (!valid.includes(value as TestEnvironment)) {
    console.warn(`Unknown TEST_ENV value "${value}", defaulting to "local"`);
    return 'local';
  }
  return value as TestEnvironment;
}

// ---------------------------------------------------------------------------
// Typed environment configuration object
// ---------------------------------------------------------------------------
export const env = {
  /** Current test environment (local | dev | staging | production) */
  testEnv: parseTestEnv(getOptionalEnvVar('TEST_ENV', 'local')),

  /** Base URL of the web application under test */
  baseUrl: getEnvVar('BASE_URL', 'https://automationintesting.online'),

  /** Base URL of the REST API under test */
  apiUrl: getEnvVar('API_URL', 'https://restful-booker.herokuapp.com'),

  /** Admin credentials */
  adminUsername: getEnvVar('ADMIN_USERNAME', 'admin'),
  adminPassword: getEnvVar('ADMIN_PASSWORD', 'password'),

  /** Optional static test user (created dynamically if blank) */
  testUserUsername: getOptionalEnvVar('TEST_USER_USERNAME'),
  testUserPassword: getOptionalEnvVar('TEST_USER_PASSWORD'),

  /** Playwright configuration overrides */
  playwrightTimeout: getNumberEnvVar('PLAYWRIGHT_TIMEOUT', 30_000),

  /** Allure results output directory */
  allureResultsDir: getOptionalEnvVar('ALLURE_RESULTS_DIR', 'reporting/allure-results'),

  /** Whether the test run is happening inside a CI pipeline */
  isCI: getBooleanEnvVar('CI', false),

  /** Playwright Service URL for Azure Playwright Service */
  playwrightServiceUrl: getOptionalEnvVar('PLAYWRIGHT_SERVICE_URL'),
} as const;

// Type export so callers can type their config parameters
export type EnvConfig = typeof env;
