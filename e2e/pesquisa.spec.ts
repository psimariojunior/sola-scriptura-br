import { test, expect } from '@playwright/test';

test.describe('Pesquisa Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pesquisa', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/pesquisa/);
  });

  test('page title "Pesquisa Bíblica" is visible', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Pesquisa Bíblica');
  });

  test('search input is visible and has placeholder', async ({ page }) => {
    const input = page.locator('input[placeholder="Pesquisar nas Escrituras..."]');
    await expect(input).toBeVisible();
  });

  test('search input is focused by default', async ({ page }) => {
    const input = page.locator('input[placeholder="Pesquisar nas Escrituras..."]');
    await expect(input).toBeFocused();
  });

  test('searching for a word shows results', async ({ page }) => {
    const input = page.locator('input[placeholder="Pesquisar nas Escrituras..."]');
    await input.fill('Deus');
    await page.waitForTimeout(1500);
    await expect(page.locator('text=resultados para')).toBeVisible({ timeout: 10000 });
  });

  test('search shows result count', async ({ page }) => {
    const input = page.locator('input[placeholder="Pesquisar nas Escrituras..."]');
    await input.fill('amor');
    await page.waitForTimeout(1500);
    await expect(page.locator('text=resultados para')).toBeVisible({ timeout: 10000 });
    const resultText = await page.locator('text=resultados para').textContent();
    expect(resultText).toMatch(/\d+/);
  });

  test('clear button appears after typing', async ({ page }) => {
    const input = page.locator('input[placeholder="Pesquisar nas Escrituras..."]');
    await input.fill('teste');
    await page.waitForTimeout(500);
    const clearBtn = page.locator('button[aria-label="Limpar busca"]');
    await expect(clearBtn).toBeVisible();
  });

  test('clear button removes search text', async ({ page }) => {
    const input = page.locator('input[placeholder="Pesquisar nas Escrituras..."]');
    await input.fill('teste');
    await page.waitForTimeout(500);
    const clearBtn = page.locator('button[aria-label="Limpar busca"]');
    await clearBtn.click();
    await expect(input).toHaveValue('');
  });

  test('filter sidebar shows search modes', async ({ page }) => {
    await expect(page.getByText('Modo de Busca')).toBeVisible();
    await expect(page.getByRole('button', { name: /Contém/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Exato/ })).toBeVisible();
  });

  test('filter sidebar shows translation checkboxes', async ({ page }) => {
    await expect(page.getByText('Tradução')).toBeVisible();
    await expect(page.locator('text=ARC').first()).toBeVisible();
    await expect(page.locator('text=NVI').first()).toBeVisible();
  });

  test('filter sidebar shows testament buttons', async ({ page }) => {
    await expect(page.getByText('Testamento')).toBeVisible();
    await expect(page.getByRole('button', { name: /Todos/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /^AT$/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /^NT$/ })).toBeVisible();
  });

  test('empty state shows instructions', async ({ page }) => {
    await expect(page.getByText('Digite para pesquisar')).toBeVisible();
  });

  test('search for non-existent term shows no results', async ({ page }) => {
    const input = page.locator('input[placeholder="Pesquisar nas Escrituras..."]');
    await input.fill('xyznonexistent123');
    await page.waitForTimeout(1500);
    await expect(page.getByText('Nenhum resultado encontrado')).toBeVisible({ timeout: 10000 });
  });

  test('export button appears when results exist', async ({ page }) => {
    const input = page.locator('input[placeholder="Pesquisar nas Escrituras..."]');
    await input.fill('Deus');
    await page.waitForTimeout(1500);
    await expect(page.locator('text=Exportar').first()).toBeVisible({ timeout: 10000 });
  });
});
