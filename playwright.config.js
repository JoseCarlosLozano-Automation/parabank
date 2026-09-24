import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: 'https://parabank.parasoft.com',
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10 * 1000,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
});
