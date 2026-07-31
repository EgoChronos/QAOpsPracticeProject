import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config();

// Auth state storage path — saved by global-setup, consumed by authenticated tests
export const AUTH_STATE_PATH = path.join(__dirname, '.auth', 'admin.json');

/**
 * Playwright configuration for the QAOps Learning Framework.
 *
 * Key design decisions:
 * - Multiple projects for cross-browser coverage (chromium default, firefox, webkit)
 * - Allure + HTML dual reporters for both CI and local development
 * - Screenshots/video/trace on failure for zero-friction debugging
 * - Retry on CI only — fast feedback locally, stable runs in pipeline
 * - Global setup seeds auth state to avoid login on every test
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // -------------------------------------------------------------------------
  // Test discovery
  // -------------------------------------------------------------------------
  testDir: './tests',
  testMatch: ['**/*.spec.ts'],

  // -------------------------------------------------------------------------
  // Execution
  // -------------------------------------------------------------------------
  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if test.only is accidentally committed
  forbidOnly: !!process.env.CI,

  // Retry failed tests: 1 time on CI, 0 locally for speed
  retries: process.env.CI ? 2 : 0,

  // Workers: half CPUs on CI to avoid resource contention, 4 locally
  workers: process.env.CI ? '50%' : 4,

  // -------------------------------------------------------------------------
  // Timeouts
  // -------------------------------------------------------------------------
  timeout: Number(process.env.PLAYWRIGHT_TIMEOUT) || 30_000,
  expect: {
    // Assertion timeout — how long web-first assertions poll before failing
    timeout: 10_000,
  },

  // -------------------------------------------------------------------------
  // Global setup / teardown
  // -------------------------------------------------------------------------
  globalSetup: './src/hooks/global-setup.ts',
  globalTeardown: './src/hooks/global-teardown.ts',

  // -------------------------------------------------------------------------
  // Reporters
  // -------------------------------------------------------------------------
  reporter: [
    // Always-on: concise terminal output
    ['list'],

    // Allure: rich enterprise-grade report
    [
      'allure-playwright',
      {
        detail: true,
        // allure-playwright v3 option is `resultsDir` (not `outputFolder`,
        // which was the v2 name and is silently ignored -> results were
        // always written to ./allure-results regardless of this setting).
        resultsDir: process.env.ALLURE_RESULTS_DIR || 'reporting/allure-results',
        suiteTitle: true,
        categories: [
          {
            name: 'Product Defects',
            messageRegex: '.*AssertionError.*',
          },
          {
            name: 'Test Infrastructure Issues',
            messageRegex: '.*TimeoutError.*',
          },
        ],
        environmentInfo: {
          Environment: process.env.TEST_ENV || 'local',
          BaseURL: process.env.BASE_URL || 'https://automationintesting.online',
          ApiURL: process.env.API_URL || 'https://restful-booker.herokuapp.com',
          NodeVersion: process.version,
          Platform: process.platform,
        },
      },
    ],

    // HTML: quick local report (open with `npm run report`)
    ['html', { outputFolder: 'playwright-report', open: 'never' }],

    // JUnit XML: consumed by Jenkins, Azure DevOps, GitLab CI
    ['junit', { outputFile: 'test-results/results.xml' }],

    // GitHub Actions annotations (active when CI=true)
    ...(process.env.CI ? [['github'] as ['github']] : []),
  ],

  // -------------------------------------------------------------------------
  // Shared browser options (applied to all projects unless overridden)
  // -------------------------------------------------------------------------
  use: {
    // Base URL — all page.goto('/path') calls resolve against this
    baseURL: process.env.BASE_URL || 'https://automationintesting.online',

    // Capture on failure
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',

    // Realistic viewport
    viewport: { width: 1280, height: 720 },

    // Navigation timeout
    navigationTimeout: 30_000,

    // Action timeout
    actionTimeout: 15_000,

    // Locale and timezone for deterministic date formatting
    locale: 'en-US',
    timezoneId: 'America/New_York',

    // Ignore HTTPS errors in dev/staging with self-signed certs
    ignoreHTTPSErrors: process.env.TEST_ENV !== 'production',

    // Extra HTTP headers sent with every request
    extraHTTPHeaders: {
      'x-test-automation': 'qaops-framework',
    },
  },

  // -------------------------------------------------------------------------
  // Projects — multi-browser / multi-context configurations
  // -------------------------------------------------------------------------
  projects: [
    // ----- Setup project: runs before all test projects -----
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // ----- UI: Chromium (primary) -----
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
      // Depends on setup project having run
      dependencies: ['setup'],
    },

    // ----- UI: Firefox -----
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
      dependencies: ['setup'],
    },

    // ----- UI: WebKit (Safari engine) -----
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
      dependencies: ['setup'],
    },

    // ----- Mobile: iPhone 14 -----
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 7'],
      },
      dependencies: ['setup'],
    },

    // ----- API tests: no browser needed -----
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        // API tests don't navigate to a browser page
        baseURL: process.env.API_URL || 'https://restful-booker.herokuapp.com',
      },
    },
  ],

  // -------------------------------------------------------------------------
  // Output directory for test artifacts (screenshots, traces, videos)
  // -------------------------------------------------------------------------
  outputDir: 'test-results',
});
