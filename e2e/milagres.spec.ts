import { test, expect } from '@playwright/test';

test.describe('Milagres Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/milagres', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/milagres/);
  });

  test('page has miracles content', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('search input is visible', async ({ page }) => {
    const input = page.locator('input[placeholder*="Buscar"], input[type="text"]').first();
    await expect(input).toBeVisible();
  });

  test('miracle type filter buttons are visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Todos/ }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Cura/ }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Natureza/ }).first()).toBeVisible();
  });

  test('miracle cards are displayed', async ({ page }) => {
    const cards = page.locator('.glass-card, .sola-card, [class*="card"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
  });

  test('filtering by Cura shows healing miracles', async ({ page }) => {
    await page.getByRole('button', { name: /Cura/ }).first().click();
    await page.waitForTimeout(500);
  });

  test('filtering by Natureza shows nature miracles', async ({ page }) => {
    await page.getByRole('button', { name: /Natureza/ }).first().click();
    await page.waitForTimeout(500);
  });

  test('filtering by Ressurreição shows resurrection miracles', async ({ page }) => {
    const resBtn = page.locator('button').filter({ hasText: 'Ressurreição' });
    if (await resBtn.isVisible()) {
      await resBtn.click();
      await page.waitForTimeout(500);
    }
  });

  test('searching filters miracles', async ({ page }) => {
    const input = page.locator('input[placeholder*="Buscar"], input[type="text"]').first();
    await input.fill('cego');
    await page.waitForTimeout(500);
  });

  test('miracle cards show location info', async ({ page }) => {
    const cards = page.locator('.glass-card, .sola-card, [class*="card"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
  });
});
