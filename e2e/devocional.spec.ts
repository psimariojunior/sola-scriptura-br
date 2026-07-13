import { test, expect } from '@playwright/test';

test.describe('Devocional Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/devocional', { timeout: 60000, waitUntil: 'commit' });
    await page.waitForLoadState('domcontentloaded', { timeout: 30000 });
    await page.waitForTimeout(2000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/devocional/);
  });

  test('today\'s devotional is shown with title', async ({ page }) => {
    const title = page.locator('h1').first();
    await expect(title).toBeVisible({ timeout: 10000 });
    const text = await title.textContent();
    expect(text!.length).toBeGreaterThan(0);
  });

  test('devotional has Meditação and Oração sections', async ({ page }) => {
    await expect(page.locator('text=Meditação')).toBeVisible();
    await expect(page.locator('text=Oração')).toBeVisible();
  });

  test('navigation button Anterior exists', async ({ page }) => {
    const prevBtn = page.locator('button').filter({ hasText: 'Anterior' });
    await expect(prevBtn).toBeVisible();
  });

  test('navigation button Próximo exists', async ({ page }) => {
    const nextBtn = page.locator('button').filter({ hasText: 'Próximo' });
    await expect(nextBtn).toBeVisible();
  });

  test('clicking Anterior changes the devotional', async ({ page }) => {
    const initialTitle = await page.locator('h1').first().textContent();
    const prevBtn = page.locator('button').filter({ hasText: 'Anterior' });
    await prevBtn.click();
    await page.waitForTimeout(500);
    const newTitle = await page.locator('h1').first().textContent();
    expect(newTitle).not.toEqual(initialTitle);
  });

  test('share button exists', async ({ page }) => {
    await expect(page.locator('button').filter({ hasText: 'Compartilhar' })).toBeVisible();
  });

  test('day counter is shown', async ({ page }) => {
    await expect(page.locator('text=/Dia \\d+ de \\d+/')).toBeVisible();
  });

  test('read full chapter link exists', async ({ page }) => {
    await expect(page.locator('text=Ler capítulo completo')).toBeVisible();
  });
});
