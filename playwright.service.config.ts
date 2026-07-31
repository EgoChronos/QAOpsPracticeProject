import { defineConfig } from '@playwright/test';
import { createAzurePlaywrightConfig, ServiceOS } from '@azure/playwright';
import { DefaultAzureCredential } from '@azure/identity';
import config from './playwright.config';

const isServiceConfigured = !!process.env.PLAYWRIGHT_SERVICE_URL;

/* Learn more about service configuration at https://aka.ms/pww/docs/config */
export default defineConfig(
  config,
  createAzurePlaywrightConfig(config, {
    exposeNetwork: '<loopback>',
    connectTimeout: 3 * 60 * 1000, // 3 minutes
    os: ServiceOS.LINUX,
    // Only require Azure credentials when the service is actually configured.
    // Otherwise fall back to local browsers (e.g. `npm run test:local`).
    ...(isServiceConfigured ? { credential: new DefaultAzureCredential() } : {}),
    // Fall back to local browsers when PLAYWRIGHT_SERVICE_URL is not set.
    useCloudHostedBrowsers: isServiceConfigured,
  }),
  {
    // IMPORTANT: this reporter array REPLACES the base config's reporters,
    // so it must re-include everything needed by CI:
    //  - blob:        consumed by `playwright merge-reports` in the merge job
    //  - allure:      consumed by `allure generate` in the merge job
    //  - junit:       consumed by CI result publishing
    //  - github:      CI annotations (only when running in GitHub Actions)
    reporter: [
      ['list'],
      ['html', { open: 'never' }],
      ['blob', { outputFile: 'blob-report/blob-report.zip' }],
      [
        'allure-playwright',
        {
          detail: true,
          outputFolder: process.env.ALLURE_RESULTS_DIR || 'reporting/allure-results',
          environmentInfo: {
            Environment: process.env.TEST_ENV || 'local',
            BaseURL: process.env.BASE_URL || 'https://automationintesting.online',
            ApiURL: process.env.API_URL || 'https://restful-booker.herokuapp.com',
            NodeVersion: process.version,
            Platform: process.platform,
          },
        },
      ],
      ['junit', { outputFile: 'test-results/results.xml' }],
      ...(process.env.CI ? [['github'] as ['github']] : []),
      // Upload results to Playwright Workspaces only when the service is used
      ...(isServiceConfigured ? ([['@azure/playwright/reporter']] as ['@azure/playwright/reporter'][]) : []),
    ],
  }
);

