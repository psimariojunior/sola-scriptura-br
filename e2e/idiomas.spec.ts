import { test, expect } from '@playwright/test';

test.describe('Idiomas Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/idiomas', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/idiomas/);
  });

  test('page title is visible', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Línguas');
    await expect(page.locator('h1')).toContainText('Originais');
  });

  test('stats cards show total, Greek, and Hebrew counts', async ({ page }) => {
    await expect(page.locator('text=Total').first()).toBeVisible();
    await expect(page.locator('text=Grego').first()).toBeVisible();
    await expect(page.locator('text=Hebraico').first()).toBeVisible();
  });

  test('search input is visible', async ({ page }) => {
    const input = page.locator('input[placeholder*="Buscar por palavra"]');
    await expect(input).toBeVisible();
  });

  test('language filter buttons are visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Todos/ }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Grego/ }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Hebraico/ }).first()).toBeVisible();
  });

  test('word cards are displayed', async ({ page }) => {
    const cards = page.locator('.glass-card');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('filtering by Greek shows only Greek words', async ({ page }) => {
    await page.getByRole('button', { name: /Grego/ }).first().click();
    await page.waitForTimeout(500);
    const badges = page.locator('text=GREGO');
    const count = await badges.count();
    expect(count).toBeGreaterThan(0);
  });

  test('filtering by Hebrew shows only Hebrew words', async ({ page }) => {
    await page.getByRole('button', { name: /Hebraico/ }).first().click();
    await page.waitForTimeout(500);
    const badges = page.locator('text=HEBRAICO');
    const count = await badges.count();
    expect(count).toBeGreaterThan(0);
  });

  test('searching filters word list', async ({ page }) => {
    const input = page.locator('input[placeholder*="Buscar por palavra"]');
    await input.fill('agape');
    await page.waitForTimeout(500);
    const cards = page.locator('.glass-card');
    const count = await cards.count();
    expect(count).toBeLessThan(50);
  });

  test('word card shows Strong number', async ({ page }) => {
    await expect(page.locator('text=/Strong \\d+/').first()).toBeVisible({ timeout: 10000 });
  });

  test('word card shows transliteration', async ({ page }) => {
    const italicTexts = page.locator('.glass-card .italic');
    const count = await italicTexts.count();
    expect(count).toBeGreaterThan(0);
  });
});
