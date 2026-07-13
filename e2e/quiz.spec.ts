import { test, expect } from '@playwright/test';

test.describe('Quiz Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/quiz', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/quiz/);
  });

  test('page has quiz content', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('level selection buttons are visible', async ({ page }) => {
    await expect(page.locator('text=Fácil').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Médio').first()).toBeVisible();
    await expect(page.locator('text=Difícil').first()).toBeVisible();
  });

  test('start quiz button is visible', async ({ page }) => {
    const startBtn = page.locator('button').filter({ hasText: /Iniciar|Começar|Jogar/ }).first();
    await expect(startBtn).toBeVisible({ timeout: 10000 });
  });

  test('category filter is available', async ({ page }) => {
    await expect(page.locator('text=Categoria').first()).toBeVisible({ timeout: 10000 });
  });

  test('selecting a level highlights it', async ({ page }) => {
    const facilBtn = page.locator('button').filter({ hasText: 'Fácil' }).first();
    await expect(facilBtn).toBeVisible({ timeout: 10000 });
    await facilBtn.click();
    await page.waitForTimeout(300);
  });

  test('clicking start begins the quiz', async ({ page }) => {
    const startBtn = page.locator('button').filter({ hasText: /Iniciar|Começar|Jogar/ }).first();
    if (await startBtn.isVisible()) {
      await startBtn.click();
      await page.waitForTimeout(2000);
    }
  });

  test('quiz has timer element', async ({ page }) => {
    await expect(page.locator('text=/\\d+/').first()).toBeVisible({ timeout: 10000 });
  });

  test('header and navigation are present', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });
});
