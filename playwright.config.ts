import { defineConfig, devices } from '@playwright/test';
import { readFileSync } from 'node:fs';

/** Next allows one dev server per project dir; if one is already running, test against it instead of spawning another. */
function runningDevUrl(): string | undefined {
  try {
    const { pid, appUrl } = JSON.parse(readFileSync('.next/dev/lock', 'utf8'));
    process.kill(pid, 0); // throws if the process is gone (stale lock)
    return appUrl;
  } catch {
    return undefined;
  }
}

const PORT = process.env.PORT || 3005;
const EXISTING = process.env.PROD ? undefined : runningDevUrl();
const BASE_URL = process.env.BASE_URL || EXISTING || `http://localhost:${PORT}`;

/** Headless by default (CI-safe). Use `npm run test:e2e:headed` to watch; SLOWMO=500 to pace it. */
export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  expect: { timeout: 10_000 }, // GSAP word reveals + font stabilisation
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    baseURL: BASE_URL,
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    launchOptions: { slowMo: Number(process.env.SLOWMO ?? 0) },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop-chrome',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    // Cross-browser coverage runs in CI only (needs `playwright install firefox webkit`).
    ...(process.env.CI
      ? [
          { name: 'firefox', use: { ...devices['Desktop Firefox'], viewport: { width: 1440, height: 900 } } },
          { name: 'webkit', use: { ...devices['Desktop Safari'], viewport: { width: 1440, height: 900 } } },
        ]
      : []),
  ],
  webServer: EXISTING || process.env.BASE_URL ? undefined : {
    command: process.env.PROD ? `npm run start -- -p ${PORT}` : `npm run dev -- -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
