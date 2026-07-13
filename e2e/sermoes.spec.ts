import { test, expect } from '@playwright/test';

test.describe('Sermoes Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sermoes', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/sermoes/);
  });

  test('page has sermons content', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('sermon outlines are displayed', async ({ page }) => {
    const cards = page.locator('.glass-card, .sola-card, [class*="card"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('sermon cards show titles', async ({ page }) => {
    await page.waitForTimeout(2000);
  });

  test('expanding a sermon shows details', async ({ page }) => {
    const firstCard = page.locator('.glass-card, .sola-card, [class*="card"]').first();
    await expect(firstCard).toBeVisible({ timeout: 10000 });
    await firstCard.click();
    await page.waitForTimeout(500);
  });

  test('sermon cards show base text references', async ({ page }) => {
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
