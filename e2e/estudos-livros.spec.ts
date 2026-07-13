import { test, expect } from '@playwright/test';

test.describe('Estudos - Genesis', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/estudos/genesis', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/estudos\/genesis/);
  });

  test('page has Genesis study content', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('study sections are displayed', async ({ page }) => {
    const sections = page.locator('.glass-card, .sola-card, [class*="card"]');
    await expect(sections.first()).toBeVisible({ timeout: 10000 });
  });

  test('header and navigation are present', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });
});

test.describe('Estudos - Romanos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/estudos/romanos', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/estudos\/romanos/);
  });

  test('page has Romans study content', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('study sections are displayed', async ({ page }) => {
    const sections = page.locator('.glass-card, .sola-card, [class*="card"]');
    await expect(sections.first()).toBeVisible({ timeout: 10000 });
  });

  test('header and navigation are present', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });
});

test.describe('Estudos - João', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/estudos/joao', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/estudos\/joao/);
  });

  test('page has John study content', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('study sections are displayed', async ({ page }) => {
    const sections = page.locator('.glass-card, .sola-card, [class*="card"]');
    await expect(sections.first()).toBeVisible({ timeout: 10000 });
  });

  test('header and navigation are present', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });
});

test.describe('Estudos - Salmos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/estudos/salmos', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/estudos\/salmos/);
  });

  test('page has Psalms study content', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('study sections are displayed', async ({ page }) => {
    const sections = page.locator('.glass-card, .sola-card, [class*="card"]');
    await expect(sections.first()).toBeVisible({ timeout: 10000 });
  });

  test('header and navigation are present', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });
});
