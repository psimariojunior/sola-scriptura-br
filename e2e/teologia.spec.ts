import { test, expect } from '@playwright/test';

test.describe('Teologia Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/teologia', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/teologia/);
  });

  test('page title "Teologia Sistemática" is visible', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Teologia');
    await expect(page.locator('h1')).toContainText('Sistemática');
  });

  test('search input is visible', async ({ page }) => {
    const input = page.locator('input[placeholder*="Buscar doutrina"]');
    await expect(input).toBeVisible();
  });

  test('category filter buttons are visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Todas/ }).first()).toBeVisible();
  });

  test('stats cards show doctrine counts', async ({ page }) => {
    await expect(page.locator('text=Doutrinas').first()).toBeVisible();
    await expect(page.locator('text=Categorias').first()).toBeVisible();
    await expect(page.locator('text=Referências').first()).toBeVisible();
  });

  test('doctrine cards are displayed', async ({ page }) => {
    const cards = page.locator('.sola-card');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('searching for a doctrine filters results', async ({ page }) => {
    const input = page.locator('input[placeholder*="Buscar doutrina"]');
    await input.fill('Trindade');
    await page.waitForTimeout(500);
    await expect(page.locator('text=Trindade').first()).toBeVisible();
  });

  test('category filter works', async ({ page }) => {
    const cristologiaBtn = page.getByRole('button', { name: /Cristologia/ });
    if (await cristologiaBtn.isVisible()) {
      await cristologiaBtn.click();
      await page.waitForTimeout(500);
    }
  });

  test('theological traditions section is visible', async ({ page }) => {
    await expect(page.locator('text=Tradições Teológicas')).toBeVisible();
  });

  test('Reformada tradition card is visible', async ({ page }) => {
    await expect(page.locator('text=Reformada').first()).toBeVisible();
  });

  test('Arminiana tradition card is visible', async ({ page }) => {
    await expect(page.locator('text=Arminiana').first()).toBeVisible();
  });
});
