import { test, expect } from '@playwright/test';

test.describe('Estudos Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/estudos', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/estudos/);
  });

  test('page title "Meus Estudos" is visible', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Meus Estudos');
  });

  test('stats cards show Total, Favoritos, Anotações', async ({ page }) => {
    await expect(page.locator('text=Total').first()).toBeVisible();
    await expect(page.locator('text=Favoritos').first()).toBeVisible();
    await expect(page.locator('text=Anotações').first()).toBeVisible();
  });

  test('tab buttons for Todas, Favoritos, Anotações are visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Todas/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Favoritos/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Anotações/ })).toBeVisible();
  });

  test('search input is visible', async ({ page }) => {
    const input = page.locator('input[placeholder*="Buscar nos estudos"]');
    await expect(input).toBeVisible();
  });

  test('empty state shows "Nenhum estudo salvo"', async ({ page }) => {
    await expect(page.locator('text=Nenhum estudo salvo')).toBeVisible();
  });

  test('empty state has link to Bible', async ({ page }) => {
    const link = page.locator('a[href="/biblia"]').filter({ hasText: 'Ir para a Bíblia' });
    await expect(link).toBeVisible();
  });

  test('clicking "Ir para a Bíblia" navigates', async ({ page }) => {
    const link = page.locator('a[href="/biblia"]').filter({ hasText: 'Ir para a Bíblia' });
    await link.click();
    await page.waitForURL(/\/biblia/, { timeout: 60000 });
    await expect(page).toHaveURL(/\/biblia/);
  });

  test('Todas tab is active by default', async ({ page }) => {
    const todasBtn = page.getByRole('button', { name: /Todas/ });
    await expect(todasBtn).toHaveClass(/bg-primary/);
  });

  test('switching to Favoritos tab works', async ({ page }) => {
    await page.getByRole('button', { name: /Favoritos/ }).click();
    await page.waitForTimeout(500);
  });

  test('switching to Anotações tab works', async ({ page }) => {
    await page.getByRole('button', { name: /Anotações/ }).click();
    await page.waitForTimeout(500);
  });
});
