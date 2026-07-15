import { test, expect } from '@playwright/test';

test.describe('Smoke - Landing Page', () => {
  test('landing page loads with status 200', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('page title contains "Sola Scriptura"', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveTitle(/Sola Scriptura/i);
  });

  test('h1 heading is visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible({ timeout: 15000 });
  });

  test('navigation links exist', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const navLinks = [
      '/biblia',
      '/pesquisa',
      '/exegese',
      '/ia',
      '/teologia',
      '/historia',
      '/idiomas',
    ];

    for (const href of navLinks) {
      const link = page.locator(`a[href="${href}"]`).first();
      await expect(link).toBeVisible({ timeout: 10000 });
    }
  });

  test('CTA button navigates to /biblia', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const cta = page.locator('a[href="/biblia"]').filter({ hasText: /Iniciar Estudo/i }).first();
    await expect(cta).toBeVisible({ timeout: 10000 });
  });

  test('no critical console errors on load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const criticalErrors = errors.filter(
      (e) => !e.includes('favicon') && !e.includes('404') && !e.includes('analytics')
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test('footer is visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible({ timeout: 10000 });
  });
});
