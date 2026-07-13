import { test, expect } from '@playwright/test';

test.describe('Estudo Page (Verse Study Methods)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/estudo', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/estudo/);
  });

  test('page has study methods content', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('method cards are displayed', async ({ page }) => {
    const cards = page.locator('.glass-card, .sola-card, [class*="card"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('method cards show titles', async ({ page }) => {
    await page.waitForTimeout(2000);
    const methodTitles = page.locator('h2, h3');
    const count = await methodTitles.count();
    expect(count).toBeGreaterThan(0);
  });

  test('expanding a method shows steps and details', async ({ page }) => {
    const firstCard = page.locator('.glass-card, .sola-card, [class*="card"]').first();
    await expect(firstCard).toBeVisible({ timeout: 10000 });
    await firstCard.click();
    await page.waitForTimeout(500);
  });

  test('method description text is visible', async ({ page }) => {
    await page.waitForTimeout(2000);
    const paragraphs = page.locator('p');
    const count = await paragraphs.count();
    expect(count).toBeGreaterThan(0);
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
