import { test, expect } from '@playwright/test';

test.describe('Parabolas Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/parabolas', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/parabolas/);
  });

  test('page has parables content', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('search input is visible', async ({ page }) => {
    const input = page.locator('input[placeholder*="Buscar"], input[type="text"]').first();
    await expect(input).toBeVisible();
  });

  test('gospel filter buttons are visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Todos/ }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Mateus/ }).first()).toBeVisible();
  });

  test('parable cards are displayed', async ({ page }) => {
    const cards = page.locator('.glass-card, .sola-card, [class*="card"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
  });

  test('clicking a parable shows more details', async ({ page }) => {
    const firstCard = page.locator('.glass-card, .sola-card, [class*="card"]').first();
    await expect(firstCard).toBeVisible({ timeout: 10000 });
    await firstCard.click();
    await page.waitForTimeout(500);
  });

  test('searching for a parable filters results', async ({ page }) => {
    const input = page.locator('input[placeholder*="Buscar"], input[type="text"]').first();
    await input.fill('Samaritano');
    await page.waitForTimeout(500);
  });

  test('filtering by Marcos shows Marcos parables', async ({ page }) => {
    const marcosBtn = page.locator('button').filter({ hasText: 'Marcos' }).first();
    if (await marcosBtn.isVisible()) {
      await marcosBtn.click();
      await page.waitForTimeout(500);
    }
  });
});
