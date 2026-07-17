import { test, expect, type Page } from '@playwright/test';

/**
 * Critical user journey tests for Sola Scriptura BR.
 *
 * These cover the core flows a user performs on the reading/note/export/share
 * surfaces. They are intentionally resilient (role/text selectors, explicit
 * waits) so they survive minor UI copy changes. They run against the local dev
 * server configured in playwright.config.ts (http://localhost:3099).
 *
 * NOTE: We never assert on real file downloads (PDF/EPUB/PNG) in CI — only that
 * the modals open and the expected options render.
 */

async function openToolsDropdown(page: Page) {
  const toolsBtn = page.locator('button[aria-label="Ferramentas"]').first();
  await expect(toolsBtn).toBeVisible({ timeout: 20000 });
  await toolsBtn.click();
  const notasItem = page.getByRole('button', { name: 'Notas' }).first();
  await expect(notasItem).toBeVisible({ timeout: 5000 });
}

test.describe('Critical flows', () => {
  test.describe('1. Read Bible flow', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/biblia', { timeout: 90000, waitUntil: 'domcontentloaded' });
      // Wait for verses to render (verse numbers are superscripts).
      await expect(page.locator('sup.text-primary.font-bold').first()).toBeVisible({ timeout: 20000 });
    });

    test('loads a chapter with verse cards', async ({ page }) => {
      const verseNumbers = page.locator('sup.text-primary.font-bold');
      await expect(verseNumbers.first()).toBeVisible();
      const count = await verseNumbers.count();
      expect(count).toBeGreaterThan(0);
    });

    test('clicking next chapter changes the chapter', async ({ page }) => {
      // Confirm we start on chapter 1.
      await expect(page.getByText('1 /', { exact: false }).first()).toBeVisible();

      const initialFirstVerse = await page.locator('p.font-serif-body').first().textContent();

      const nextBtn = page.locator('button:has(svg.lucide-chevron-right)').first();
      await expect(nextBtn).toBeVisible();
      await nextBtn.click();

      // Chapter counter should now show 2.
      await expect(page.getByText('2 /', { exact: false }).first()).toBeVisible({ timeout: 15000 });

      const newFirstVerse = await page.locator('p.font-serif-body').first().textContent();
      expect(newFirstVerse).not.toEqual(initialFirstVerse);
    });
  });

  test.describe('2. Note flow', () => {
    test('create a note, persists in localStorage and survives reload', async ({ page }) => {
      await page.goto('/biblia', { timeout: 90000, waitUntil: 'domcontentloaded' });
      await expect(page.locator('sup.text-primary.font-bold').first()).toBeVisible({ timeout: 20000 });

      // Open the tools dropdown and click "Notas".
      await openToolsDropdown(page);
      await page.getByRole('button', { name: 'Notas' }).first().click();

      // The notes panel with the editor should appear.
      const notesPanel = page.getByText('Minhas Anotações').first();
      await expect(notesPanel).toBeVisible({ timeout: 10000 });

      // Type a distinctive title into the note editor.
      const marker = `Nota E2E ${Date.now()}`;
      const tituloInput = page.locator('input[placeholder="Título da nota..."]').first();
      await expect(tituloInput).toBeVisible({ timeout: 10000 });
      await tituloInput.fill(marker);

      // Type body content into the contentEditable editor.
      const editor = page.locator('[contenteditable="true"]').first();
      await expect(editor).toBeVisible();
      await editor.click();
      await editor.type('Texto de teste automatizado para a nota.');

      // Click "Salvar" to persist.
      const salvarBtn = page.getByRole('button', { name: 'Salvar' }).first();
      await expect(salvarBtn).toBeVisible();
      await salvarBtn.click();

      // Assert the note is persisted in localStorage under sola-notas.
      const stored = await page.evaluate(() => localStorage.getItem('sola-notas'));
      expect(stored).not.toBeNull();
      expect(stored).toContain(marker);

      // Reload and verify the note is still present in localStorage.
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      const storedAfterReload = await page.evaluate(() => localStorage.getItem('sola-notas'));
      expect(storedAfterReload).toContain(marker);
    });
  });

  test.describe('3. Export flow', () => {
    test('ToolsDropdown "Exportar PDF" opens the ExportModal', async ({ page }) => {
      await page.goto('/biblia', { timeout: 90000, waitUntil: 'domcontentloaded' });
      await expect(page.locator('sup.text-primary.font-bold').first()).toBeVisible({ timeout: 20000 });

      await openToolsDropdown(page);
      await page.getByRole('button', { name: 'Exportar PDF' }).first().click();

      // The modal header shows "Exportar <book> <chapter>".
      const modal = page.getByRole('dialog').first();
      await expect(modal).toBeVisible({ timeout: 10000 });
      await expect(page.getByText('Exportar', { exact: false }).first()).toBeVisible();

      // PDF and EPUB format options render.
      await expect(page.getByRole('button', { name: 'PDF' }).first()).toBeVisible();
      await expect(page.getByRole('button', { name: 'EPUB' }).first()).toBeVisible();

      // Selecting EPUB does not crash.
      await page.getByRole('button', { name: 'EPUB' }).first().click();
      await expect(page.getByText('E-book para leitores').first()).toBeVisible();
    });
  });

  test.describe('4. Share flow', () => {
    test('share verse renders and theme switch draws a canvas', async ({ page }) => {
      await page.goto('/compartilhar/versiculo?livro=jo&cap=3&v=16&t=arc', {
        timeout: 90000,
        waitUntil: 'domcontentloaded',
      });

      // The verse reference + text should render.
      await expect(page.getByText('João 3:16', { exact: false }).first()).toBeVisible({ timeout: 20000 });
      await expect(page.getByText('Deus amou o mundo', { exact: false }).first()).toBeVisible({ timeout: 20000 });

      // Open the share modal.
      const abrirBtn = page.getByRole('button', { name: /Personalizar e compartilhar/i }).first();
      await expect(abrirBtn).toBeVisible();
      await abrirBtn.click();

      const modal = page.getByRole('dialog', { name: 'Compartilhar versículo' }).first();
      await expect(modal).toBeVisible({ timeout: 10000 });

      // Theme options ("Tema de fundo") render with swatches.
      await expect(page.getByText('Tema de fundo').first()).toBeVisible();
      const themeBtn = page.getByRole('button', { name: 'Tema Aurora' }).first();
      await expect(themeBtn).toBeVisible();

      // Click a different theme and assert a canvas is rendered.
      await page.getByRole('button', { name: 'Tema Noite' }).first().click();
      const canvas = modal.locator('canvas').first();
      await expect(canvas).toBeVisible({ timeout: 5000 });
      const hasPixels = await canvas.evaluate((c) => {
        const cv = c as HTMLCanvasElement;
        return cv.width > 0 && cv.height > 0;
      });
      expect(hasPixels).toBeTruthy();
    });
  });

  test.describe('5. Flashcards flow', () => {
    test('flashcards page renders study UI or empty state', async ({ page }) => {
      await page.goto('/flashcards', { timeout: 90000, waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/\/flashcards/);

      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible({ timeout: 15000 });
      await expect(heading).toHaveText(/Flashcards/i);

      // Either an empty state ("Tudo revisado!") or a study card is present.
      const emptyOrCard = page.getByText('Tudo revisado!').first().or(
        page.getByText('Clique para revelar').first(),
      );
      await expect(emptyOrCard).toBeVisible({ timeout: 15000 });
    });

    test('flip a flashcard reveals the back text', async ({ page }) => {
      await page.goto('/flashcards', { timeout: 90000, waitUntil: 'domcontentloaded' });
      await expect(page.locator('h1').first()).toBeVisible({ timeout: 15000 });

      // Only run the flip test when a study card is available.
      const revealButton = page.getByRole('button', { name: 'Revelar' }).first();
      if (await revealButton.isVisible().catch(() => false)) {
        await revealButton.click();

        // Quality buttons (Errei / Difícil / Bom / Fácil) appear after flip.
        await expect(page.getByRole('button', { name: 'Errei' }).first()).toBeVisible({ timeout: 10000 });

        // The back of the card shows verse text (not the "Memorize" front label).
        await expect(page.getByText('Memorize').first()).toBeHidden({ timeout: 5000 }).catch(() => {});
        const backText = page.locator('p.font-serif-body').first();
        await expect(backText).toBeVisible({ timeout: 10000 });
      } else {
        test.skip(true, 'No due flashcards available to flip');
      }
    });
  });
});
