const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false, 
  workers: 1,           
  timeout: 600000, 
  reporter: 'html',
  use: {
    baseURL: 'https://www.swifttranslator.com/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});