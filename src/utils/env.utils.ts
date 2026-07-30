/**
 * Environment Utilities.
 *
 * Helper functions for environment detection and validation.
 */

import { env, TestEnvironment } from '../config/env';

/** Returns true if running in a CI pipeline */
export function isCI(): boolean {
  return env.isCI;
}

/** Returns true if running against local environment */
export function isLocal(): boolean {
  return env.testEnv === 'local';
}

/** Returns true if running against staging */
export function isStaging(): boolean {
  return env.testEnv === 'staging';
}

/** Returns true if running against production */
export function isProduction(): boolean {
  return env.testEnv === 'production';
}

/**
 * Skip a test if the current environment matches.
 * Use in Playwright's test.skip() callback.
 *
 * Example:
 *   test.skip(shouldSkipOn('production'), 'Destructive test, not safe in production');
 */
export function shouldSkipOn(environment: TestEnvironment): boolean {
  return env.testEnv === environment;
}

/**
 * Return a value based on the current environment.
 * Useful for environment-specific test data or timeouts.
 *
 * Example:
 *   const retries = envSwitch({ local: 0, staging: 2, production: 3 });
 */
export function envSwitch<T>(values: Partial<Record<TestEnvironment, T>>, defaultValue: T): T {
  return values[env.testEnv] ?? defaultValue;
}
