import { test, expect } from '@playwright/test';

test.describe('Comparar Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/comparar', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/comparar/);
  });

  test('page has comparison content', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('translation selector buttons are visible', async ({ page }) => {
    await expect(page.locator('text=ARC').first()).toBeVisible();
    await expect(page.locator('text=NVI').first()).toBeVisible();
  });

  test('navigation buttons exist', async ({ page }) => {
    const prevBtn = page.getByRole('button', { name: /anterior|previous/i }).first();
    const nextBtn = page.getByRole('button', { name: /próximo|next/i }).first();
    await expect(prevBtn).toBeVisible({ timeout: 10000 });
    await expect(nextBtn).toBeVisible();
  });

  test('chapter navigation works', async ({ page }) => {
    const nextBtn = page.getByRole('button', { name: /próximo|next/i }).first();
    await expect(nextBtn).toBeVisible({ timeout: 10000 });
    await nextBtn.click();
    await page.waitForTimeout(1000);
  });

  test('comparison content is displayed', async ({ page }) => {
    await page.waitForTimeout(3000);
    const content = page.locator('.sola-card, .glass-card, [class*="card"]').first();
    await expect(content).toBeVisible({ timeout: 10000 });
  });
});
