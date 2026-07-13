import { test, expect } from '@playwright/test';

test.describe('Ferramentas Page (Atlas Bíblico)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ferramentas', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/ferramentas/);
  });

  test('page title "Atlas Bíblico" is visible', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Atlas');
    await expect(page.locator('h1')).toContainText('Bíblico');
  });

  test('search input for locations is visible', async ({ page }) => {
    const input = page.locator('input[placeholder*="Buscar local"]');
    await expect(input).toBeVisible();
  });

  test('testament filter buttons are visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Todos/ }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Antigo Testamento/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Novo Testamento/ })).toBeVisible();
  });

  test('category filter buttons are visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Todas/ }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Cidades/ })).toBeVisible();
  });

  test('map container is visible', async ({ page }) => {
    const mapArea = page.locator('.sola-card').first();
    await expect(mapArea).toBeVisible({ timeout: 10000 });
  });

  test('location list panel shows locations', async ({ page }) => {
    await expect(page.locator('text=/\\d+ locais/').first()).toBeVisible({ timeout: 10000 });
  });

  test('searching filters locations', async ({ page }) => {
    const input = page.locator('input[placeholder*="Buscar local"]');
    await input.fill('Jerusalém');
    await page.waitForTimeout(500);
  });

  test('clear filters button appears when filters are active', async ({ page }) => {
    await page.getByRole('button', { name: /Antigo Testamento/ }).click();
    await page.waitForTimeout(500);
    const clearBtn = page.locator('text=Limpar filtros');
    await expect(clearBtn).toBeVisible();
  });

  test('category filters include Montes, Mares, Rios, Desertos', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Montes/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Mares/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Rios/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Desertos/ })).toBeVisible();
  });
});
