import { test, expect } from '@playwright/test';

test.describe('Smoke - Bíblia Page', () => {
  test('/biblia loads with status 200', async ({ page }) => {
    const response = await page.goto('/biblia');
    expect(response?.status()).toBe(200);
  });

  test('page shows Genesis (Gênesis) by default', async ({ page }) => {
    await page.goto('/biblia', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(5000);
    await expect(page.getByRole('button', { name: /Gênesis/ }).first()).toBeVisible({ timeout: 15000 });
  });

  test('verses are displayed', async ({ page }) => {
    await page.goto('/biblia', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(5000);
    const verseNumbers = page.locator('sup.text-primary.font-bold');
    await expect(verseNumbers.first()).toBeVisible({ timeout: 15000 });
    const count = await verseNumbers.count();
    expect(count).toBeGreaterThan(0);
  });

  test('translation buttons are available (ARC, NVI)', async ({ page }) => {
    await page.goto('/biblia', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(5000);
    const arcButton = page.locator('button').filter({ hasText: /^ARC$/ });
    const nviButton = page.locator('button').filter({ hasText: /^NVI$/ });
    await expect(arcButton).toBeVisible({ timeout: 10000 });
    await expect(nviButton).toBeVisible({ timeout: 10000 });
  });

  test('book sidebar is visible with book list', async ({ page }) => {
    await page.goto('/biblia', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(5000);
    const sidebar = page.locator('aside').first();
    await expect(sidebar).toBeVisible({ timeout: 10000 });
    await expect(sidebar.getByText('Gênesis').first()).toBeVisible();
  });

  test('chapter navigation buttons exist', async ({ page }) => {
    await page.goto('/biblia', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(5000);
    const nextBtn = page.locator('button:has(svg.lucide-chevron-right)').first();
    await expect(nextBtn).toBeVisible({ timeout: 10000 });
  });
});
