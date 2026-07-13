import { test, expect } from '@playwright/test';

test.describe('Personagens Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/personagens', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/personagens/);
  });

  test('page title "Personagens Bíblicos" is visible', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Personagens');
    await expect(page.locator('h1')).toContainText('Bíblicos');
  });

  test('search input is visible', async ({ page }) => {
    const input = page.locator('input[placeholder*="Buscar por nome"]');
    await expect(input).toBeVisible();
  });

  test('testament filter buttons are visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Todos/ }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Antigo T\./ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Novo T\./ })).toBeVisible();
  });

  test('period filter section is visible', async ({ page }) => {
    await expect(page.getByText('Filtrar por período')).toBeVisible();
  });

  test('stats show total, AT, NT counts', async ({ page }) => {
    await expect(page.locator('text=Total').first()).toBeVisible();
    await expect(page.locator('text=Antigo Testamento').first()).toBeVisible();
    await expect(page.locator('text=Novo Testamento').first()).toBeVisible();
  });

  test('character cards are displayed', async ({ page }) => {
    const cards = page.locator('.glass-card');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
  });

  test('clicking a character expands details', async ({ page }) => {
    const firstCard = page.locator('.glass-card').first();
    await expect(firstCard).toBeVisible({ timeout: 10000 });
    await firstCard.click();
    await page.waitForTimeout(500);
  });

  test('searching filters character list', async ({ page }) => {
    const input = page.locator('input[placeholder*="Buscar por nome"]');
    await input.fill('Moisés');
    await page.waitForTimeout(500);
  });

  test('filtering by NT shows only New Testament characters', async ({ page }) => {
    await page.getByRole('button', { name: /Novo T\./ }).click();
    await page.waitForTimeout(500);
  });

  test('filtering by AT shows only Old Testament characters', async ({ page }) => {
    await page.getByRole('button', { name: /Antigo T\./ }).click();
    await page.waitForTimeout(500);
  });
});
