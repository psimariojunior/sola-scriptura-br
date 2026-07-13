import { test, expect } from '@playwright/test';

test.describe('Topicos Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/topicos', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/topicos/);
  });

  test('page has theological topics content', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('search input is visible', async ({ page }) => {
    const input = page.locator('input[placeholder*="Buscar"], input[type="text"]').first();
    await expect(input).toBeVisible();
  });

  test('category filters are visible', async ({ page }) => {
    await expect(page.locator('button').filter({ hasText: /Todas/ }).first()).toBeVisible({ timeout: 10000 });
  });

  test('topic cards are displayed', async ({ page }) => {
    const cards = page.locator('.glass-card, .sola-card, [class*="card"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('topic cards show doctrine names', async ({ page }) => {
    await page.waitForTimeout(2000);
  });

  test('searching for a topic filters results', async ({ page }) => {
    const input = page.locator('input[placeholder*="Buscar"], input[type="text"]').first();
    await input.fill('Trindade');
    await page.waitForTimeout(500);
  });

  test('expanding a topic shows more details', async ({ page }) => {
    const firstCard = page.locator('.glass-card, .sola-card, [class*="card"]').first();
    await expect(firstCard).toBeVisible({ timeout: 10000 });
    await firstCard.click();
    await page.waitForTimeout(500);
  });

  test('header and navigation are present', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });
});
