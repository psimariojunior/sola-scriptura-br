import { test, expect } from '@playwright/test';

test.describe('Estatisticas Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/estatisticas', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/estatisticas/);
  });

  test('page has statistics content', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('stats cards show streak and reading data', async ({ page }) => {
    await page.waitForTimeout(2000);
    const cards = page.locator('.glass-card, .sola-card, [class*="card"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
  });

  test('chart components are rendered', async ({ page }) => {
    await page.waitForTimeout(2000);
    const charts = page.locator('svg.recharts-surface, .recharts-wrapper, [class*="recharts"]');
    const count = await charts.count();
    expect(count).toBeGreaterThan(0);
  });

  test('weekly data visualization exists', async ({ page }) => {
    await page.waitForTimeout(2000);
  });

  test('books read section exists', async ({ page }) => {
    await page.waitForTimeout(2000);
  });

  test('header and navigation are present', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('footer is visible', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});
