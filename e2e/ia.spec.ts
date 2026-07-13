import { test, expect } from '@playwright/test';

test.describe('IA Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ia', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/ia/);
  });

  test('page title "Assistente Bíblico" is visible', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Assistente Bíblico');
  });

  test('chat input is visible', async ({ page }) => {
    const input = page.locator('input[placeholder*="pergunta bíblica"]');
    await expect(input).toBeVisible();
  });

  test('send button is visible', async ({ page }) => {
    const sendBtn = page.locator('button').filter({ has: page.locator('svg.lucide-send') }).first();
    await expect(sendBtn).toBeVisible();
  });

  test('tradition selector is visible', async ({ page }) => {
    await expect(page.locator('text=Tradição:').first()).toBeVisible();
  });

  test('suggestion cards are shown initially', async ({ page }) => {
    await expect(page.getByText('Faça uma pergunta sobre as Escrituras')).toBeVisible();
  });

  test('suggestion cards include categories', async ({ page }) => {
    await expect(page.locator('text=Teologia').first()).toBeVisible();
    await expect(page.locator('text=Doutrina').first()).toBeVisible();
  });

  test('clicking a suggestion sends the question', async ({ page }) => {
    const suggestion = page.locator('button').filter({ hasText: 'Explique a doutrina da Trindade' });
    if (await suggestion.isVisible()) {
      await suggestion.click();
      await page.waitForTimeout(2000);
    }
  });

  test('tradition dropdown shows available traditions', async ({ page }) => {
    const tradBtn = page.locator('button').filter({ hasText: /Tradição:/ });
    await tradBtn.click();
    await page.waitForTimeout(500);
    await expect(page.locator('text=Reformada').first()).toBeVisible();
    await expect(page.locator('text=Arminiana').first()).toBeVisible();
  });

  test('connection test button exists', async ({ page }) => {
    await expect(page.locator('text=Testar conexão').first()).toBeVisible();
  });

  test('typing a question enables send button', async ({ page }) => {
    const input = page.locator('input[placeholder*="pergunta bíblica"]');
    await input.fill('O que é graça?');
    await page.waitForTimeout(300);
    const sendBtn = page.locator('button').filter({ has: page.locator('svg.lucide-send') }).first();
    await expect(sendBtn).toBeEnabled();
  });
});
