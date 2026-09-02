import { test, expect } from '@playwright/test';

test.describe('Trilha oficial João', () => {
  test('página da trilha lista capítulos e critério honesto', async ({ page }) => {
    await page.goto('/cursos/joao', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/cursos\/joao/);
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 15000 });
    await expect(heading).toContainText(/João/i);
    await expect(page.getByText(/ficha profunda/i).first()).toBeVisible();
    await expect(page.getByText(/Não há carga horária inventada/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Ler na Bíblia/i }).first()).toBeVisible();
  });
});

test.describe('Trilha oficial Romanos', () => {
  test('página da trilha existe e aponta para o guia', async ({ page }) => {
    await page.goto('/cursos/romanos', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1').first()).toContainText(/Romanos/i);
    await expect(page.getByText(/16 capítulos/i).first()).toBeVisible();
  });
});

test.describe('Cursos', () => {
  test('destaque das trilhas oficiais acima dos cursos introdutórios', async ({ page }) => {
    await page.goto('/cursos', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: /Trilhas oficiais/i })).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('link', { name: /Evangelho de João/i }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /Cursos introdutórios/i })).toBeVisible();
  });
});
