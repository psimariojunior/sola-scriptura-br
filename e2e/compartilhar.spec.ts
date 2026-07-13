import { test, expect } from '@playwright/test';

test.describe('Compartilhar Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/compartilhar', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/compartilhar/);
  });

  test('page has sharing content', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('predefined verse buttons are visible', async ({ page }) => {
    await expect(page.locator('text=João 3:16').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Salmos 23:1').first()).toBeVisible();
  });

  test('verse cards show verse text', async ({ page }) => {
    await page.waitForTimeout(2000);
    const verseText = page.locator('text=Deus amou o mundo').first();
    await expect(verseText).toBeVisible({ timeout: 10000 });
  });

  test('copy button exists for verses', async ({ page }) => {
    const copyBtn = page.locator('button').filter({ has: page.locator('svg.lucide-copy') }).first();
    await expect(copyBtn).toBeVisible({ timeout: 10000 });
  });

  test('copy button works and shows confirmation', async ({ page }) => {
    const copyBtn = page.locator('button').filter({ has: page.locator('svg.lucide-copy') }).first();
    await expect(copyBtn).toBeVisible({ timeout: 10000 });
    await copyBtn.click();
    await page.waitForTimeout(500);
    const checkIcon = page.locator('button:has(svg.lucide-check)').first();
    await expect(checkIcon).toBeVisible({ timeout: 3000 });
  });

  test('multiple verse options are available', async ({ page }) => {
    await expect(page.locator('text=Filipenses 4:13').first()).toBeVisible();
    await expect(page.locator('text=Romanos 8:28').first()).toBeVisible();
  });

  test('header and navigation are present', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('footer is visible', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});
