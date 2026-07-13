import { test, expect } from '@playwright/test';

test.describe('Exegese Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/exegese', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/exegese/);
  });

  test('page has exegese content', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('book selector or reference input is available', async ({ page }) => {
    const interactive = page.locator('select, input[type="text"], button').first();
    await expect(interactive).toBeVisible({ timeout: 10000 });
  });

  test('analyze/generate button exists', async ({ page }) => {
    const btn = page.locator('button').filter({ hasText: /Analisar|Gerar|Exegese|Estudar/i }).first();
    await expect(btn).toBeVisible({ timeout: 10000 });
  });

  test('page has main landmark', async ({ page }) => {
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('header and navigation are present', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });
});
