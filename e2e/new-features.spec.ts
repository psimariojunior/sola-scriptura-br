import { test, expect } from '@playwright/test';

test.describe('Modo Socrático', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/socratico', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/socratico/);
  });

  test('page has heading', async ({ page }) => {
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('has mode selector buttons', async ({ page }) => {
    const buttons = page.locator('button');
    await expect(buttons.first()).toBeVisible({ timeout: 10000 });
  });

  test('can select explore mode', async ({ page }) => {
    const exploreBtn = page.locator('button').filter({ hasText: /Explorar|Explore/i }).first();
    if (await exploreBtn.isVisible({ timeout: 5000 })) {
      await exploreBtn.click();
      await page.waitForTimeout(500);
    }
  });
});

test.describe('Mapa de Promessas', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/promessas', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/promessas/);
  });

  test('page has promise content', async ({ page }) => {
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('has testament filter', async ({ page }) => {
    const filter = page.locator('button').filter({ hasText: /Todos|AT|NT/i }).first();
    await expect(filter).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Jornada Emocional', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/emocoes', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/emocoes/);
  });

  test('page has emotion content', async ({ page }) => {
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('has emotion legend', async ({ page }) => {
    const legend = page.locator('text=Alegria|Tristeza|Esperança').first();
    await expect(legend).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Modo Imersivo', () => {
  test('page loads successfully', async ({ page }) => {
    await page.goto('/imersao', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(/\/imersao/);
  });

  test('has fullscreen layout', async ({ page }) => {
    await page.goto('/imersao', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    const verse = page.locator('p, span, div').filter({ hasText: /\d+/ }).first();
    await expect(verse).toBeVisible({ timeout: 10000 });
  });

  test('has control buttons', async ({ page }) => {
    await page.goto('/imersao', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    const buttons = page.locator('button');
    await expect(buttons.first()).toBeVisible({ timeout: 10000 });
  });
});
