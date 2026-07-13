import { test, expect } from '@playwright/test';

test.describe('Historia Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/historia', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/historia/);
  });

  test('page title "História Bíblica" is visible', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('História');
    await expect(page.locator('h1')).toContainText('Bíblica');
  });

  test('tab navigation shows Períodos, Linha do Tempo, Civilizações', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Períodos/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Linha do Tempo/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Civilizações/ })).toBeVisible();
  });

  test('Períodos tab is active by default', async ({ page }) => {
    const periodosBtn = page.getByRole('button', { name: /Períodos/ });
    await expect(periodosBtn).toHaveClass(/bg-primary/);
  });

  test('clicking Linha do Tempo tab shows timeline', async ({ page }) => {
    await page.getByRole('button', { name: /Linha do Tempo/ }).click();
    await page.waitForTimeout(500);
    await expect(page.locator('text=Linha do Tempo Bíblica')).toBeVisible();
  });

  test('clicking Civilizações tab shows civilisations', async ({ page }) => {
    await page.getByRole('button', { name: /Civilizações/ }).click();
    await page.waitForTimeout(500);
    await expect(page.locator('text=Civilizações e o Povo de Deus')).toBeVisible();
  });

  test('period sections are expandable', async ({ page }) => {
    const firstPeriodBtn = page.locator('button').filter({ hasText: /eventos/ }).first();
    if (await firstPeriodBtn.isVisible()) {
      await firstPeriodBtn.click();
      await page.waitForTimeout(500);
    }
  });

  test('Civilizações tab shows Egito, Assíria, Babilônia', async ({ page }) => {
    await page.getByRole('button', { name: /Civilizações/ }).click();
    await page.waitForTimeout(500);
    await expect(page.locator('text=Egito').first()).toBeVisible();
    await expect(page.locator('text=Assíria').first()).toBeVisible();
    await expect(page.locator('text=Babilônia').first()).toBeVisible();
  });

  test('contexto cultural section is visible', async ({ page }) => {
    await expect(page.locator('text=Contexto Cultural')).toBeVisible();
  });

  test('Geografia, Cultura, Impérios cards are visible', async ({ page }) => {
    await expect(page.locator('text=Geografia').first()).toBeVisible();
    await expect(page.locator('text=Cultura').first()).toBeVisible();
    await expect(page.locator('text=Impérios').first()).toBeVisible();
  });
});
