import { defineConfig } from '@playwright/test';
import 'dotenv/config';

/**
 * Mobitru Basic auth for the upstream WebSocket (same as wss://user:apiKey@host/...).
 * @returns {Record<string, string>}
 */
function mobitruConnectAuthHeaders() {
  const user = process.env.MOBITRU_USER || 'HEALENIUM';
  const apiKey = process.env.MOBITRU_API_KEY;
  if (!apiKey) return {};
  const token = Buffer.from(`${user}:${apiKey}`, 'utf8').toString('base64');
  return { 'Authorization': `Basic ${token}` };
}

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. (undefined)*/
  workers: process.env.CI ? 1 : 8,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    // Standard line reporter for test progress
    ['line'],

    // HTML reporter for detailed reports
    ['html', { outputFolder: 'playwright-report' }],

  ],
  /* Global timeout for all tests and hooks */
  timeout: 300000, // 5 minutes for entire test including hooks

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Timeout settings */
    actionTimeout: 120_000,        // 2 minutes for actions
    navigationTimeout: 120_000,    // 2 minutes for navigation

    /* Connect to Playwright server */
    connectOptions: {
      // wsEndpoint: process.env.PLAYWRIGHT_SERVER_URL || 'ws://localhost:5050',
      wsEndpoint: process.env.PLAYWRIGHT_SERVER_URL || 'ws://localhost:8095/hlm-playwright-proxy',
      // wsEndpoint: process.env.PLAYWRIGHT_SERVER_URL || 'ws://54.242.17.37/hlm-playwright-proxy',
      timeout: 60000,            // 60 seconds for WebSocket connection timeout
      headers: {
        // ...mobitruConnectAuthHeaders(),
        // 'hlm-api-key': 'd816dd38-8934-4fc2-a170-97ae4dbddf3b', // tenantId
        'hlm-locator-cache': 'false', // disable locator cache
      },
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      timeout: 300000, // 5 minutes for this project including hooks
    },
  ],
});
