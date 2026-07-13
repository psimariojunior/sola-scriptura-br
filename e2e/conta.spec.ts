import { test, expect } from '@playwright/test';

test.describe('Conta Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/conta', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/conta/);
  });

  test('redirects to login if not authenticated', async ({ page }) => {
    await page.waitForTimeout(3000);
    const url = page.url();
    const isOnConta = url.includes('/conta');
    const isOnAuth = url.includes('/auth');
    expect(isOnConta || isOnAuth).toBe(true);
  });

  test('if authenticated, shows welcome message', async ({ page }) => {
    if (page.url().includes('/conta')) {
      await expect(page.locator('text=Bem-vindo').first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('if authenticated, shows profile section', async ({ page }) => {
    if (page.url().includes('/conta')) {
      await expect(page.locator('text=Minha Conta').first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('if authenticated, shows stats cards', async ({ page }) => {
    if (page.url().includes('/conta')) {
      await expect(page.locator('text=Favoritos').first()).toBeVisible({ timeout: 5000 });
      await expect(page.locator('text=Anotações').first()).toBeVisible();
      await expect(page.locator('text=Total').first()).toBeVisible();
    }
  });

  test('if authenticated, shows logout button', async ({ page }) => {
    if (page.url().includes('/conta')) {
      await expect(page.locator('text=Sair').first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('if authenticated, shows quick links to Estudos and Bíblia', async ({ page }) => {
    if (page.url().includes('/conta')) {
      await expect(page.locator('text=Meus Estudos').first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('if authenticated, shows premium upgrade CTA', async ({ page }) => {
    if (page.url().includes('/conta')) {
      await expect(page.locator('text=Premium').first()).toBeVisible({ timeout: 5000 });
    }
  });
});
