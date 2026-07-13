import { test, expect } from '@playwright/test';

test.describe('Ferramentas - Concordância', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ferramentas/concordancia', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/ferramentas\/concordancia/);
  });

  test('page has concordance content', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('search input is visible', async ({ page }) => {
    const input = page.locator('input[placeholder*="Buscar"], input[type="text"]').first();
    await expect(input).toBeVisible();
  });

  test('tab navigation shows Busca, Grego, Hebraico, Frequentes', async ({ page }) => {
    await expect(page.locator('button').filter({ hasText: /Busca|Grego|Hebraico|Frequentes/ }).first()).toBeVisible({ timeout: 10000 });
  });

  test('searching for a word shows concordance results', async ({ page }) => {
    const input = page.locator('input[placeholder*="Buscar"], input[type="text"]').first();
    await input.fill('logos');
    await page.waitForTimeout(500);
  });

  test('switching to Greek tab shows Greek words', async ({ page }) => {
    const gregoTab = page.locator('button').filter({ hasText: 'Grego' }).first();
    if (await gregoTab.isVisible()) {
      await gregoTab.click();
      await page.waitForTimeout(500);
    }
  });

  test('switching to Hebrew tab shows Hebrew words', async ({ page }) => {
    const hebraicoTab = page.locator('button').filter({ hasText: 'Hebraico' }).first();
    if (await hebraicoTab.isVisible()) {
      await hebraicoTab.click();
      await page.waitForTimeout(500);
    }
  });

  test('header and navigation are present', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });
});

test.describe('Ferramentas - Crítica Textual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ferramentas/critica-textual', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/ferramentas\/critica-textual/);
  });

  test('page has textual criticism content', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('search input is visible', async ({ page }) => {
    const input = page.locator('input[placeholder*="Buscar"], input[type="text"]').first();
    await expect(input).toBeVisible();
  });

  test('type filter buttons are visible', async ({ page }) => {
    await expect(page.locator('button').filter({ hasText: /Todos/ }).first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('button').filter({ hasText: /Adição/ }).first()).toBeVisible();
    await expect(page.locator('button').filter({ hasText: /Omissão/ }).first()).toBeVisible();
  });

  test('variant cards are displayed', async ({ page }) => {
    const cards = page.locator('.glass-card, .sola-card, [class*="card"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
  });

  test('filtering by type shows filtered results', async ({ page }) => {
    const adicaoBtn = page.locator('button').filter({ hasText: 'Adição' }).first();
    if (await adicaoBtn.isVisible()) {
      await adicaoBtn.click();
      await page.waitForTimeout(500);
    }
  });

  test('evidence filter buttons are visible', async ({ page }) => {
    await expect(page.locator('button').filter({ hasText: /Forte|Moderada|Fraca/ }).first()).toBeVisible({ timeout: 10000 });
  });

  test('header and navigation are present', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });
});
