import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL('/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('title "Sola Scriptura" is visible', async ({ page }) => {
    const h1 = page.locator('h1').nth(1);
    await expect(h1).toContainText('Sola');
    await expect(h1).toContainText('Scriptura');
  });

  test('hero subtitle is visible', async ({ page }) => {
    await expect(page.getByText('Estudo Bíblico Acadêmico', { exact: true }).nth(1)).toBeVisible();
  });

  test('navigation link "Bíblia" goes to /biblia', async ({ page }) => {
    const bibliaLink = page.locator('a[href="/biblia"]').first();
    await expect(bibliaLink).toBeVisible();
    await bibliaLink.click();
    await page.waitForURL(/\/biblia/);
    await expect(page).toHaveURL(/\/biblia/);
  });

  test('modules section shows all 12 modules', async ({ page }) => {
    const expectedHrefs = [
      '/biblia', '/pesquisa', '/exegese', '/ferramentas',
      '/idiomas', '/teologia', '/historia', '/ia',
      '/cronologia', '/personagens', '/devocional', '/flashcards',
    ];

    for (const href of expectedHrefs) {
      await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible({ timeout: 10000 });
    }
  });

  test('CTA buttons are clickable', async ({ page }) => {
    const ctaButton = page.locator('a[href="/biblia"]').filter({ hasText: 'Iniciar Estudo' });
    await expect(ctaButton).toBeVisible();
    await ctaButton.click();
    await page.waitForURL(/\/biblia/);
    await expect(page).toHaveURL(/\/biblia/);
  });

  test('stats section is visible', async ({ page }) => {
    await expect(page.locator('text=66')).toBeVisible();
    await expect(page.locator('text=31.102')).toBeVisible();
  });

  test('devocional CTA navigates to /devocional', async ({ page }) => {
    const devocionalLink = page.locator('a[href="/devocional"]').first();
    await expect(devocionalLink).toBeVisible();
    await devocionalLink.click();
    await page.waitForURL(/\/devocional/);
    await expect(page).toHaveURL(/\/devocional/);
  });

  test('features section shows key features', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Multi-Tradução' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Línguas Originais' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'IA Especializada' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Atlas Interativo' })).toBeVisible();
  });
});
