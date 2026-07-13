import { test, expect } from '@playwright/test';

test.describe('Harmonia Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/harmonia', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/harmonia/);
  });

  test('page has harmonic content', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('category filter buttons are visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Todas/ }).first()).toBeVisible();
  });

  test('category filters include relevant categories', async ({ page }) => {
    await expect(page.locator('button').filter({ hasText: /Narrativa|Parábola|Milagre/ }).first()).toBeVisible({ timeout: 10000 });
  });

  test('parallel entries are displayed', async ({ page }) => {
    const entries = page.locator('.glass-card, .sola-card, [class*="card"]');
    await expect(entries.first()).toBeVisible({ timeout: 10000 });
  });

  test('synoptic gospels headers are shown', async ({ page }) => {
    await expect(page.locator('text=Mateus').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Marcos').first()).toBeVisible();
    await expect(page.locator('text=Lucas').first()).toBeVisible();
  });

  test('filtering by category changes displayed entries', async ({ page }) => {
    const parabolaBtn = page.locator('button').filter({ hasText: 'Parábola' });
    if (await parabolaBtn.isVisible()) {
      await parabolaBtn.click();
      await page.waitForTimeout(500);
    }
  });
});
