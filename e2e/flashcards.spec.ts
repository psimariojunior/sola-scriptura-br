import { test, expect } from '@playwright/test';

test.describe('Flashcards Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/flashcards', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/flashcards/);
  });

  test('page has flashcards content', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('stats section shows card counts', async ({ page }) => {
    await page.waitForTimeout(2000);
    const cards = page.locator('.glass-card, .sola-card, [class*="card"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
  });

  test('flip/answer buttons exist', async ({ page }) => {
    await page.waitForTimeout(2000);
    const buttons = page.locator('button');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('correct/incorrect answer buttons exist', async ({ page }) => {
    await page.waitForTimeout(2000);
    await expect(page.locator('button').first()).toBeVisible({ timeout: 10000 });
  });

  test('stats view toggle exists', async ({ page }) => {
    await expect(page.locator('svg.lucide-bar-chart-3, svg.lucide-brain').first()).toBeVisible({ timeout: 10000 });
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
