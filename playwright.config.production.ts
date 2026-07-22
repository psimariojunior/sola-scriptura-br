import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/production',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 3,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report-production' }]],
  timeout: 60000,
  expect: {
    timeout: 15000,
  },
  use: {
    baseURL: 'https://solascripturabr.com.br',
    trace: 'on-first-retry',
    screenshot: 'on',
    actionTimeout: 15000,
    navigationTimeout: 45000,
    extraHTTPHeaders: {
      'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
