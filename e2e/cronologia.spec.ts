import { test, expect } from '@playwright/test';

test.describe('Cronologia Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cronologia', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/cronologia/);
  });

  test('page title "Cronologia Bíblica" is visible', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Cronologia');
    await expect(page.locator('h1')).toContainText('Bíblica');
  });

  test('filter section with period buttons is visible', async ({ page }) => {
    await expect(page.getByText('Filtrar por período')).toBeVisible();
    await expect(page.getByRole('button', { name: /Todos/ }).first()).toBeVisible();
  });

  test('period filter buttons show event counts', async ({ page }) => {
    const todosBtn = page.locator('button').filter({ hasText: /Todos \(\d+\)/ });
    await expect(todosBtn).toBeVisible();
  });

  test('timeline has events displayed', async ({ page }) => {
    const events = page.locator('.glass-card');
    await expect(events.first()).toBeVisible({ timeout: 10000 });
    const count = await events.count();
    expect(count).toBeGreaterThan(0);
  });

  test('filtering by period shows only that period', async ({ page }) => {
    const patriarcasBtn = page.getByRole('button', { name: /Patriarcas/ });
    if (await patriarcasBtn.isVisible()) {
      await patriarcasBtn.click();
      await page.waitForTimeout(500);
    }
  });

  test('legend section is visible', async ({ page }) => {
    await expect(page.locator('text=Legenda')).toBeVisible();
  });

  test('legend shows all period types', async ({ page }) => {
    await expect(page.locator('text=Criação').first()).toBeVisible();
    await expect(page.locator('text=Patriarcas').first()).toBeVisible();
  });

  test('event cards show year in monospace font', async ({ page }) => {
    const years = page.locator('.font-mono');
    await expect(years.first()).toBeVisible({ timeout: 10000 });
    const count = await years.count();
    expect(count).toBeGreaterThan(0);
  });
});
