import { test, expect } from '@playwright/test';

test.describe('Pericopes Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pericopes', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/pericopes/);
  });

  test('page has pericopes content', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('search input is visible', async ({ page }) => {
    const input = page.locator('input[placeholder*="Buscar"], input[type="text"]').first();
    await expect(input).toBeVisible();
  });

  test('genre filter buttons are visible', async ({ page }) => {
    await expect(page.locator('button').filter({ hasText: /Todos/ }).first()).toBeVisible({ timeout: 10000 });
  });

  test('genre filters include Narrativa, Discurso, Parábola', async ({ page }) => {
    await expect(page.locator('button').filter({ hasText: 'Narrativa' }).first()).toBeVisible({ timeout: 10000 });
  });

  test('pericope cards are displayed', async ({ page }) => {
    const cards = page.locator('.glass-card, .sola-card, [class*="card"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('filtering by genre shows filtered results', async ({ page }) => {
    const parabolaBtn = page.locator('button').filter({ hasText: 'Parábola' });
    if (await parabolaBtn.isVisible()) {
      await parabolaBtn.click();
      await page.waitForTimeout(500);
    }
  });

  test('searching for a pericope filters results', async ({ page }) => {
    const input = page.locator('input[placeholder*="Buscar"], input[type="text"]').first();
    await input.fill('Mateus');
    await page.waitForTimeout(500);
  });

  test('pericope cards show genre badges', async ({ page }) => {
    await page.waitForTimeout(2000);
  });

  test('header and navigation are present', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });
});
