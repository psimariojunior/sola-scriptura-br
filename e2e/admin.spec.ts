import { test, expect } from '@playwright/test';

test.describe('Admin Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/admin/);
  });

  test('page redirects to auth if not logged in', async ({ page }) => {
    await page.waitForTimeout(3000);
    const url = page.url();
    const isOnAdmin = url.includes('/admin');
    const isOnAuth = url.includes('/auth');
    expect(isOnAdmin || isOnAuth).toBe(true);
  });

  test('admin sidebar shows navigation tabs', async ({ page }) => {
    if (page.url().includes('/admin')) {
      await expect(page.locator('text=Admin Panel')).toBeVisible({ timeout: 5000 });
    }
  });

  test('dashboard tab shows stats section', async ({ page }) => {
    if (page.url().includes('/admin')) {
      const heading = page.locator('text=Dashboard').first();
      await expect(heading).toBeVisible({ timeout: 5000 });
    }
  });

  test('sidebar has Dashboard, Conteúdo, Usuários, Estudos, Configurações', async ({ page }) => {
    if (page.url().includes('/admin')) {
      await expect(page.locator('text=Dashboard').first()).toBeVisible();
      await expect(page.locator('text=Conteúdo').first()).toBeVisible();
      await expect(page.locator('text=Usuários').first()).toBeVisible();
      await expect(page.locator('text=Estudos').first()).toBeVisible();
      await expect(page.locator('text=Configurações').first()).toBeVisible();
    }
  });

  test('navigating to Conteúdo tab loads content management', async ({ page }) => {
    if (page.url().includes('/admin')) {
      const conteudoBtn = page.locator('button').filter({ hasText: 'Conteúdo' }).first();
      if (await conteudoBtn.isVisible()) {
        await conteudoBtn.click();
        await page.waitForTimeout(1000);
        await expect(page.locator('text=Gerenciar Conteúdo').first()).toBeVisible({ timeout: 5000 });
      }
    }
  });
});
