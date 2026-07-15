import { test, expect } from '@playwright/test';

test.describe('Smoke - IA Page', () => {
  test('/ia loads with status 200', async ({ page }) => {
    const response = await page.goto('/ia');
    expect(response?.status()).toBe(200);
  });

  test('page title "Assistente Bíblico" is visible', async ({ page }) => {
    await page.goto('/ia', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    await expect(page.locator('h1')).toContainText('Assistente Bíblico');
  });

  test('chat input exists and is visible', async ({ page }) => {
    await page.goto('/ia', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    const input = page.locator('input[placeholder*="pergunta bíblica"]');
    await expect(input).toBeVisible({ timeout: 10000 });
  });

  test('send button is visible', async ({ page }) => {
    await page.goto('/ia', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    const sendBtn = page.locator('button').filter({ has: page.locator('svg.lucide-send') }).first();
    await expect(sendBtn).toBeVisible({ timeout: 10000 });
  });

  test('tradition selector is visible', async ({ page }) => {
    await page.goto('/ia', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    await expect(page.locator('text=Tradição:').first()).toBeVisible({ timeout: 10000 });
  });

  test('suggestion cards are shown', async ({ page }) => {
    await page.goto('/ia', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    await expect(page.getByText('Faça uma pergunta sobre as Escrituras')).toBeVisible({ timeout: 10000 });
  });

  test('typing a question enables send button', async ({ page }) => {
    await page.goto('/ia', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    const input = page.locator('input[placeholder*="pergunta bíblica"]');
    await input.fill('O que é graça?');
    await page.waitForTimeout(500);
    const sendBtn = page.locator('button').filter({ has: page.locator('svg.lucide-send') }).first();
    await expect(sendBtn).toBeEnabled();
  });
});
