import { test, expect } from '@playwright/test';

test.describe('Bible Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/biblia', { timeout: 90000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(5000);
  });

  test.describe('Page load', () => {
    test('page loads with correct URL', async ({ page }) => {
      await expect(page).toHaveURL(/\/biblia/);
    });

    test('page shows Genesis (Gênesis) by default', async ({ page }) => {
      await expect(page.getByRole('button', { name: /Gênesis/ }).first()).toBeVisible({ timeout: 15000 });
    });

    test('chapter counter shows "1 /"', async ({ page }) => {
      await expect(page.getByText('1 /').first()).toBeVisible();
    });
  });

  test.describe('Book sidebar', () => {
    test('sidebar shows book list', async ({ page }) => {
      const sidebar = page.locator('aside').first();
      await expect(sidebar).toBeVisible();
      await expect(sidebar.getByText('Gênesis').first()).toBeVisible();
    });

    test('sidebar contains multiple OT books', async ({ page }) => {
      const sidebar = page.locator('aside').first();
      await expect(sidebar).toBeVisible();
      await expect(sidebar.getByText('Êxodo').first()).toBeVisible();
      await expect(sidebar.getByText('Levítico').first()).toBeVisible();
    });

    test('clicking a book changes the chapter to 1', async ({ page }) => {
      const sidebar = page.locator('aside').first();
      const exodoBtn = sidebar.getByText('Êxodo').first();
      await expect(exodoBtn).toBeVisible();
      await exodoBtn.click();
      await page.waitForTimeout(3000);
      await expect(page.getByText('1 /').first()).toBeVisible();
    });

    test('search input filters books', async ({ page }) => {
      const searchInput = page.locator('input[placeholder="Buscar livro..."]');
      await expect(searchInput).toBeVisible();
      await searchInput.fill('João');
      await page.waitForTimeout(500);
      const sidebar = page.locator('aside').first();
      await expect(sidebar.getByText('João').first()).toBeVisible();
    });
  });

  test.describe('Chapter navigation', () => {
    test('next chapter button navigates forward', async ({ page }) => {
      const initialText = await page.locator('p.font-serif-body').first().textContent();
      const nextBtn = page.locator('button:has(svg.lucide-chevron-right)').first();
      await nextBtn.click();
      await page.waitForTimeout(3000);
      const newText = await page.locator('p.font-serif-body').first().textContent();
      expect(newText).not.toEqual(initialText);
    });

    test('previous chapter button is disabled on chapter 1', async ({ page }) => {
      const prevBtn = page.locator('button:has(svg.lucide-chevron-left)').first();
      await expect(prevBtn).toBeDisabled();
    });

    test('chapter counter updates after navigation', async ({ page }) => {
      const nextBtn = page.locator('button:has(svg.lucide-chevron-right)').first();
      await nextBtn.click();
      await page.waitForTimeout(3000);
      await expect(page.getByText('2 /').first()).toBeVisible();
    });
  });

  test.describe('Translations', () => {
    test('ARC and NVI translation buttons are visible', async ({ page }) => {
      const arcButton = page.locator('button').filter({ hasText: /^ARC$/ });
      const nviButton = page.locator('button').filter({ hasText: /^NVI$/ });
      await expect(arcButton).toBeVisible();
      await expect(nviButton).toBeVisible();
    });

    test('ARC is active by default', async ({ page }) => {
      const arcButton = page.locator('button').filter({ hasText: /^ARC$/ });
      await expect(arcButton).toHaveClass(/bg-primary\/10/);
    });

    test('clicking NVI toggles it on', async ({ page }) => {
      const nviButton = page.locator('button').filter({ hasText: /^NVI$/ });
      await nviButton.click();
      await page.waitForTimeout(2000);
      await expect(nviButton).toHaveClass(/bg-emerald-500\/10/);
    });

    test('multiple translations can be selected', async ({ page }) => {
      const nviButton = page.locator('button').filter({ hasText: /^NVI$/ });
      const arcButton = page.locator('button').filter({ hasText: /^ARC$/ });
      await nviButton.click();
      await page.waitForTimeout(2000);
      await expect(nviButton).toHaveClass(/bg-emerald-500\/10/);
      await expect(arcButton).toHaveClass(/bg-primary\/10/);
    });

    test('deselecting a translation removes it', async ({ page }) => {
      const arcButton = page.locator('button').filter({ hasText: /^ARC$/ });
      await arcButton.click();
      await page.waitForTimeout(2000);
      await expect(arcButton).not.toHaveClass(/bg-primary\/10/);
    });
  });

  test.describe('Verses', () => {
    test('verses are displayed with verse numbers', async ({ page }) => {
      const verseNumbers = page.locator('sup.text-primary.font-bold');
      await expect(verseNumbers.first()).toBeVisible({ timeout: 10000 });
      const count = await verseNumbers.count();
      expect(count).toBeGreaterThan(0);
    });

    test('verse text content is not empty', async ({ page }) => {
      const verseText = await page.locator('p.font-serif-body').first().textContent();
      expect(verseText!.length).toBeGreaterThan(0);
    });

    test('verse action buttons exist (heart, copy, note)', async ({ page }) => {
      const verseActions = page.locator('.group .flex.items-center.gap-0\\.5 button');
      await expect(verseActions.first()).toBeVisible({ timeout: 10000 });
      const count = await verseActions.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });
  });

  test.describe('PainelDoVersiculo', () => {
    test('clicking a verse opens PainelDoVersiculo', async ({ page }) => {
      const verse = page.locator('div.group').first();
      await expect(verse).toBeVisible({ timeout: 10000 });
      await verse.click();
      await page.waitForTimeout(1000);
      const panel = page.locator('[class*="PainelDoVersiculo"], [data-panel="versiculo"], .fixed.inset-0').first();
      await expect(panel).toBeVisible({ timeout: 5000 });
    });

    test('PainelDoVersiculo shows verse reference', async ({ page }) => {
      const verse = page.locator('div.group').first();
      await verse.click();
      await page.waitForTimeout(1000);
      await expect(page.locator('text=Gênesis').first()).toBeVisible({ timeout: 5000 });
    });

    test('PainelDoVersiculo has close button', async ({ page }) => {
      const verse = page.locator('div.group').first();
      await verse.click();
      await page.waitForTimeout(1000);
      const closeBtn = page.locator('button[aria-label="Fechar"], button:has(svg.lucide-x)').first();
      await expect(closeBtn).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Verse actions', () => {
    test('copy button copies verse text', async ({ page }) => {
      const copyBtn = page.locator('button:has(svg.lucide-copy)').first();
      await expect(copyBtn).toBeVisible({ timeout: 10000 });
      await copyBtn.click();
      await page.waitForTimeout(500);
      const checkIcon = page.locator('button:has(svg.lucide-check)').first();
      await expect(checkIcon).toBeVisible({ timeout: 3000 });
    });

    test('favorite button toggles heart icon', async ({ page }) => {
      const favBtn = page.locator('button:has(svg.lucide-heart)').first();
      await expect(favBtn).toBeVisible({ timeout: 10000 });
      await favBtn.click();
      await page.waitForTimeout(500);
      const filledHeart = page.locator('button:has(svg.lucide-heart.fill-current)').first();
      await expect(filledHeart).toBeVisible({ timeout: 3000 });
    });
  });

  test.describe('View modes', () => {
    test('parallel view mode button is visible when multiple translations selected', async ({ page }) => {
      const parallelBtn = page.locator('button[title="Lado a lado"]');
      await expect(parallelBtn).toBeVisible({ timeout: 10000 });
    });

    test('switching to parallel view shows two columns', async ({ page }) => {
      const parallelBtn = page.locator('button[title="Lado a lado"]');
      await parallelBtn.click();
      await page.waitForTimeout(1000);
      const columns = page.locator('.grid.grid-cols-1.md\\:grid-cols-2');
      await expect(columns).toBeVisible({ timeout: 5000 });
    });

    test('comparison view mode button exists', async ({ page }) => {
      const comparisonBtn = page.locator('button[title="Comparação"]');
      await expect(comparisonBtn).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Settings', () => {
    test('settings button opens font size controls', async ({ page }) => {
      const settingsBtn = page.locator('button[title="Configurações"]');
      await expect(settingsBtn).toBeVisible({ timeout: 10000 });
      await settingsBtn.click();
      await page.waitForTimeout(500);
      await expect(page.getByText('Tamanho:')).toBeVisible();
    });

    test('font size can be increased', async ({ page }) => {
      const settingsBtn = page.locator('button[title="Configurações"]');
      await settingsBtn.click();
      await page.waitForTimeout(500);
      const initialSize = await page.locator('.font-mono').textContent();
      const increaseBtn = page.locator('button:has(svg.lucide-plus)');
      await increaseBtn.click();
      await page.waitForTimeout(300);
      const newSize = await page.locator('.font-mono').textContent();
      expect(Number(newSize)).toBeGreaterThan(Number(initialSize));
    });
  });

  test.describe('Reading mode', () => {
    test('reading mode button toggles reading mode', async ({ page }) => {
      const readingBtn = page.locator('button[title="Modo leitura"]');
      await expect(readingBtn).toBeVisible({ timeout: 10000 });
      await readingBtn.click();
      await page.waitForTimeout(1000);
      await expect(page.locator('text=Capítulo 1').first()).toBeVisible({ timeout: 5000 });
    });
  });
});
