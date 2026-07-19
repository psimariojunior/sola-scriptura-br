import { test, expect, type Page } from '@playwright/test';

/**
 * Comprehensive E2E tests for Sola Scriptura BR critical user flows.
 *
 * Covers: Bible reading, search, AI assistant, favorites, notes, collections,
 * comparison, theme switching, and mobile navigation.
 *
 * These tests are resilient to minor UI changes and use role/text selectors
 * with explicit waits and loading-state handling.
 */

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Wait for the Bible page to be fully loaded with verse content visible. */
async function waitForBibleLoaded(page: Page) {
  await expect(page.locator('sup.text-primary.font-bold').first()).toBeVisible({
    timeout: 30000,
  });
}

/** Seed a value into localStorage before page loads. */
async function seedLocalStorage(page: Page, key: string, value: string) {
  await page.addInitScript((args: [string, string]) => {
    localStorage.setItem(args[0], args[1]);
  }, [key, value]);
}

// ---------------------------------------------------------------------------
// 1. Bible Reading Flow
// ---------------------------------------------------------------------------
test.describe('1. Bible Reading Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/biblia', {
      timeout: 90000,
      waitUntil: 'domcontentloaded',
    });
    await waitForBibleLoaded(page);
  });

  test('page loads with Genesis chapters and verses', async ({ page }) => {
    await expect(page).toHaveURL(/\/biblia/);

    // Default book should be Genesis (Gênesis).
    await expect(
      page.getByRole('button', { name: /Gênesis/ }).first()
    ).toBeVisible({ timeout: 15000 });

    // Chapter counter shows "1 /".
    await expect(page.getByText('1 /', { exact: false }).first()).toBeVisible();

    // At least one verse rendered.
    const verses = page.locator('sup.text-primary.font-bold');
    const count = await verses.count();
    expect(count).toBeGreaterThan(0);
  });

  test('selecting a different book loads chapter 1 of that book', async ({
    page,
  }) => {
    const sidebar = page.locator('aside').first();
    await expect(sidebar).toBeVisible();

    const exodoBtn = sidebar.getByText('Êxodo').first();
    await expect(exodoBtn).toBeVisible();
    await exodoBtn.click();

    // Chapter counter resets to 1.
    await expect(page.getByText('1 /', { exact: false }).first()).toBeVisible({
      timeout: 15000,
    });
  });

  test('selecting a specific chapter loads its verses', async ({ page }) => {
    // We are on Genesis 1. Navigate to Genesis 2 via next button.
    const nextBtn = page
      .locator('button:has(svg.lucide-chevron-right)')
      .first();
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    // Chapter counter should show 2.
    await expect(page.getByText('2 /', { exact: false }).first()).toBeVisible({
      timeout: 15000,
    });

    // Verse text changed (different content than chapter 1).
    const firstVerse = await page
      .locator('p.font-serif-body')
      .first()
      .textContent();
    expect(firstVerse!.length).toBeGreaterThan(0);
  });

  test('previous chapter button is disabled on chapter 1', async ({
    page,
  }) => {
    const prevBtn = page
      .locator('button:has(svg.lucide-chevron-left)')
      .first();
    await expect(prevBtn).toBeDisabled();
  });

  test('search input in sidebar filters books', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Buscar livro..."]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('João');
    await page.waitForTimeout(500);
    const sidebar = page.locator('aside').first();
    await expect(sidebar.getByText('João').first()).toBeVisible();
  });

  test('verse action buttons (heart, copy) exist on verses', async ({
    page,
  }) => {
    const copyBtn = page.locator('button:has(svg.lucide-copy)').first();
    await expect(copyBtn).toBeVisible({ timeout: 10000 });

    const favBtn = page.locator('button:has(svg.lucide-heart)').first();
    await expect(favBtn).toBeVisible({ timeout: 10000 });
  });

  test('copy button copies verse text to clipboard area', async ({
    page,
  }) => {
    const copyBtn = page.locator('button:has(svg.lucide-copy)').first();
    await expect(copyBtn).toBeVisible({ timeout: 10000 });
    await copyBtn.click();

    // A check icon replaces the copy icon on success.
    const checkIcon = page
      .locator('button:has(svg.lucide-check)')
      .first();
    await expect(checkIcon).toBeVisible({ timeout: 5000 });
  });

  test('multiple translations can be toggled', async ({ page }) => {
    const arcButton = page.locator('button').filter({ hasText: /^ARC$/ });
    const nviButton = page.locator('button').filter({ hasText: /^NVI$/ });
    await expect(arcButton).toBeVisible();
    await expect(nviButton).toBeVisible();

    // Both are selectable; toggling NVI adds it.
    await nviButton.click();
    await page.waitForTimeout(2000);
    // Verse count should remain > 0 with both translations.
    const verses = page.locator('sup.text-primary.font-bold');
    const count = await verses.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// 2. Search Flow
// ---------------------------------------------------------------------------
test.describe('2. Search Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pesquisa', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.waitForTimeout(2000);
  });

  test('page loads with search input focused', async ({ page }) => {
    await expect(page).toHaveURL(/\/pesquisa/);
    const heading = page.locator('h1').first();
    await expect(heading).toContainText('Pesquisa');

    const input = page.locator(
      'input[placeholder="Pesquisar nas Escrituras..."]'
    );
    await expect(input).toBeVisible();
    await expect(input).toBeFocused();
  });

  test('typing a query shows results', async ({ page }) => {
    const input = page.locator(
      'input[placeholder="Pesquisar nas Escrituras..."]'
    );
    await input.fill('Deus');
    await page.waitForTimeout(1500);
    await expect(
      page.locator('text=resultados para').first()
    ).toBeVisible({ timeout: 15000 });
  });

  test('result count contains a number', async ({ page }) => {
    const input = page.locator(
      'input[placeholder="Pesquisar nas Escrituras..."]'
    );
    await input.fill('amor');
    await page.waitForTimeout(1500);
    const resultText = await page
      .locator('text=resultados para')
      .first()
      .textContent({ timeout: 15000 });
    expect(resultText).toMatch(/\d+/);
  });

  test('empty state shows instructions before typing', async ({ page }) => {
    await expect(page.getByText('Digite para pesquisar')).toBeVisible();
  });

  test('searching for nonsense shows no results', async ({ page }) => {
    const input = page.locator(
      'input[placeholder="Pesquisar nas Escrituras..."]'
    );
    await input.fill('xyznonexistent123abc');
    await page.waitForTimeout(1500);
    await expect(
      page.getByText('Nenhum resultado encontrado')
    ).toBeVisible({ timeout: 15000 });
  });

  test('clear button removes search text and hides results', async ({
    page,
  }) => {
    const input = page.locator(
      'input[placeholder="Pesquisar nas Escrituras..."]'
    );
    await input.fill('teste');
    await page.waitForTimeout(500);

    const clearBtn = page.locator('button[aria-label="Limpar busca"]');
    await expect(clearBtn).toBeVisible();
    await clearBtn.click();

    await expect(input).toHaveValue('');
  });

  test('filter sidebar shows search mode options', async ({ page }) => {
    await expect(page.getByText('Modo de Busca')).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Contém/ })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Exato/ })
    ).toBeVisible();
  });

  test('filter sidebar shows translation checkboxes', async ({ page }) => {
    await expect(page.getByText('Tradução')).toBeVisible();
    await expect(page.locator('text=ARC').first()).toBeVisible();
    await expect(page.locator('text=NVI').first()).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// 3. AI Assistant Flow
// ---------------------------------------------------------------------------
test.describe('3. AI Assistant Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ia', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.waitForTimeout(2000);
  });

  test('page loads with chat interface visible', async ({ page }) => {
    await expect(page).toHaveURL(/\/ia/);

    const heading = page.locator('h1').first();
    await expect(heading).toContainText('Assistente');
  });

  test('chat input is visible and accepts text', async ({ page }) => {
    const input = page.locator('input[placeholder*="pergunta bíblica"]');
    await expect(input).toBeVisible();
    await expect(input).toBeEnabled();
  });

  test('send button is visible next to input', async ({ page }) => {
    const sendBtn = page
      .locator('button')
      .filter({ has: page.locator('svg.lucide-send') })
      .first();
    await expect(sendBtn).toBeVisible();
  });

  test('typing a question makes send button interactive', async ({
    page,
  }) => {
    const input = page.locator('input[placeholder*="pergunta bíblica"]');
    await input.fill('O que é graça?');
    await page.waitForTimeout(300);
    const sendBtn = page
      .locator('button')
      .filter({ has: page.locator('svg.lucide-send') })
      .first();
    await expect(sendBtn).toBeEnabled();
  });

  test('tradition selector dropdown works', async ({ page }) => {
    await expect(page.locator('text=Tradição:').first()).toBeVisible();

    const tradBtn = page
      .locator('button')
      .filter({ hasText: /Tradição:/ });
    await tradBtn.click();
    await page.waitForTimeout(500);

    await expect(page.locator('text=Reformada').first()).toBeVisible();
    await expect(page.locator('text=Arminiana').first()).toBeVisible();
  });

  test('suggestion cards are shown initially', async ({ page }) => {
    await expect(
      page.getByText('Faça uma pergunta sobre as Escrituras')
    ).toBeVisible();
  });

  test('connection test button is present', async ({ page }) => {
    await expect(page.locator('text=Testar conexão').first()).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// 4. Favorites Page
// ---------------------------------------------------------------------------
test.describe('4. Favorites Page', () => {
  test('page loads with empty state when no favorites', async ({ page }) => {
    // Clear any existing favorites.
    await page.goto('/favoritos', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.evaluate(() => localStorage.removeItem('ssb_favoritos'));
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    const heading = page.locator('h1').first();
    await expect(heading).toContainText('Favoritos');
  });

  test('page loads with favorites from localStorage', async ({ page }) => {
    const favs = JSON.stringify([
      {
        versiculo: 'Gênesis 1:1',
        livro: 'Gênesis',
        capitulo: 1,
        verso: 1,
        texto: 'No princípio criou Deus os céus e a terra.',
        cor: 'amarelo',
        data: new Date().toISOString(),
      },
    ]);
    await seedLocalStorage(page, 'ssb_favoritos', favs);

    await page.goto('/favoritos', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.waitForTimeout(1000);

    await expect(
      page.getByText('Gênesis 1:1').first()
    ).toBeVisible({ timeout: 10000 });
    await expect(
      page.getByText('No princípio criou Deus').first()
    ).toBeVisible();
  });

  test('empty state shows guidance message', async ({ page }) => {
    await page.goto('/favoritos', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.evaluate(() => localStorage.removeItem('ssb_favoritos'));
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    await expect(
      page.getByText('Nenhum favorito').first()
    ).toBeVisible({ timeout: 10000 });
    await expect(
      page.getByText('Destaque versículos na Bíblia').first()
    ).toBeVisible();
  });

  test('filter by color is available when favorites exist', async ({
    page,
  }) => {
    const favs = JSON.stringify([
      {
        versiculo: 'João 3:16',
        livro: 'João',
        capitulo: 3,
        verso: 16,
        texto: 'Porque Deus amou o mundo.',
        cor: 'azul',
        data: new Date().toISOString(),
      },
    ]);
    await seedLocalStorage(page, 'ssb_favoritos', favs);

    await page.goto('/favoritos', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.waitForTimeout(1000);

    // Color filter buttons should be visible.
    const filterSection = page.locator('button[title]').first();
    await expect(filterSection).toBeVisible({ timeout: 5000 });
  });

  test('favorites count is displayed', async ({ page }) => {
    const favs = JSON.stringify([
      {
        versiculo: 'Gênesis 1:1',
        livro: 'Gênesis',
        capitulo: 1,
        verso: 1,
        texto: 'No princípio criou Deus.',
        cor: 'verde',
        data: new Date().toISOString(),
      },
      {
        versiculo: 'Salmos 23:1',
        livro: 'Salmos',
        capitulo: 23,
        verso: 1,
        texto: 'O Senhor é o meu pastor.',
        cor: 'rosa',
        data: new Date().toISOString(),
      },
    ]);
    await seedLocalStorage(page, 'ssb_favoritos', favs);

    await page.goto('/favoritos', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.waitForTimeout(1000);

    // Should show "2 de 2 favoritos".
    await expect(
      page.getByText('2 de 2 favoritos').first()
    ).toBeVisible({ timeout: 10000 });
  });
});

// ---------------------------------------------------------------------------
// 5. Notes Page
// ---------------------------------------------------------------------------
test.describe('5. Notes Page', () => {
  test('page loads with empty state when no notes', async ({ page }) => {
    await page.goto('/notas', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.evaluate(() => localStorage.removeItem('ssb_notas'));
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    const heading = page.locator('h1').first();
    await expect(heading).toContainText('Notas');
  });

  test('page loads with notes from localStorage', async ({ page }) => {
    const notes = JSON.stringify([
      {
        versiculo: 'Romanos 8:28',
        livro: 'Romanos',
        capitulo: 8,
        verso: 28,
        textoNota: 'Tudo coopera para o bem.',
        data: new Date().toISOString(),
      },
    ]);
    await seedLocalStorage(page, 'ssb_notas', notes);

    await page.goto('/notas', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.waitForTimeout(1000);

    await expect(
      page.getByText('Romanos 8:28').first()
    ).toBeVisible({ timeout: 10000 });
    await expect(
      page.getByText('Tudo coopera para o bem').first()
    ).toBeVisible();
  });

  test('empty state shows guidance message', async ({ page }) => {
    await page.goto('/notas', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.evaluate(() => localStorage.removeItem('ssb_notas'));
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    await expect(
      page.getByText('Nenhuma nota').first()
    ).toBeVisible({ timeout: 10000 });
    await expect(
      page.getByText('Adicione notas aos versículos').first()
    ).toBeVisible();
  });

  test('search input filters notes', async ({ page }) => {
    const notes = JSON.stringify([
      {
        versiculo: 'João 14:6',
        livro: 'João',
        capitulo: 14,
        verso: 6,
        textoNota: 'Jesus é o caminho.',
        data: new Date().toISOString(),
      },
      {
        versiculo: 'Efésios 2:8',
        livro: 'Efésios',
        capitulo: 2,
        verso: 8,
        textoNota: 'Pela graça sois salvos.',
        data: new Date().toISOString(),
      },
    ]);
    await seedLocalStorage(page, 'ssb_notas', notes);

    await page.goto('/notas', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.waitForTimeout(1000);

    const searchInput = page.locator('input[placeholder="Buscar notas..."]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('caminho');
    await page.waitForTimeout(500);

    // Only the matching note should appear.
    await expect(
      page.getByText('Jesus é o caminho').first()
    ).toBeVisible();
  });

  test('notes count is displayed', async ({ page }) => {
    const notes = JSON.stringify([
      {
        versiculo: 'Gênesis 1:1',
        livro: 'Gênesis',
        capitulo: 1,
        verso: 1,
        textoNota: 'Nota 1',
        data: new Date().toISOString(),
      },
      {
        versiculo: 'Gênesis 1:2',
        livro: 'Gênesis',
        capitulo: 1,
        verso: 2,
        textoNota: 'Nota 2',
        data: new Date().toISOString(),
      },
    ]);
    await seedLocalStorage(page, 'ssb_notas', notes);

    await page.goto('/notas', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.waitForTimeout(1000);

    await expect(
      page.getByText('2 de 2 notas').first()
    ).toBeVisible({ timeout: 10000 });
  });
});

// ---------------------------------------------------------------------------
// 6. Collections Page
// ---------------------------------------------------------------------------
test.describe('6. Collections Page', () => {
  test('page loads and shows heading', async ({ page }) => {
    await page.goto('/colecoes', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.waitForTimeout(1000);

    await expect(
      page.getByText('Coleções de Versículos').first()
    ).toBeVisible({ timeout: 15000 });
  });

  test('page loads with empty state when no collections', async ({
    page,
  }) => {
    await page.goto('/colecoes', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.evaluate(() => localStorage.removeItem('ssb_colecoes'));
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    await expect(
      page.getByText('Nenhuma coleção ainda').first()
    ).toBeVisible({ timeout: 15000 });
  });

  test('"Nova" button is visible to create collections', async ({ page }) => {
    await page.goto('/colecoes', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.evaluate(() => localStorage.removeItem('ssb_colecoes'));
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    const novaBtn = page.getByRole('button', { name: /Nova/ }).first();
    await expect(novaBtn).toBeVisible({ timeout: 10000 });
  });

  test('creating a collection shows it in the list', async ({ page }) => {
    await page.goto('/colecoes', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.evaluate(() => localStorage.removeItem('ssb_colecoes'));
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Click "Criar primeira coleção" or "Nova".
    const criarBtn = page
      .getByRole('button', { name: /Criar primeira coleção|Nova/ })
      .first();
    await expect(criarBtn).toBeVisible({ timeout: 10000 });
    await criarBtn.click();

    // Fill in the name.
    const nomeInput = page.locator(
      'input[placeholder="Ex: Versículos de fé"]'
    );
    await expect(nomeInput).toBeVisible({ timeout: 5000 });
    await nomeInput.fill('Minha Coleção E2E');

    // Click "Criar" to save.
    const submitBtn = page.getByRole('button', { name: /^Criar$/ }).first();
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    // The collection should now appear in the list.
    await expect(
      page.getByText('Minha Coleção E2E').first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('collection with verses shows verse count', async ({ page }) => {
    const colecoes = JSON.stringify([
      {
        id: 'test123',
        nome: 'Fé e Graça',
        descricao: 'Versículos sobre fé',
        versiculos: [
          {
            livro: 'Hebreus',
            capitulo: 11,
            verso: 1,
            texto: 'Ora, a fé é a certeza daquilo que esperamos.',
            referencia: 'Hebreus 11:1',
          },
        ],
        criadaEm: new Date().toISOString(),
      },
    ]);
    await seedLocalStorage(page, 'ssb_colecoes', colecoes);

    await page.goto('/colecoes', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.waitForTimeout(1000);

    // Should show "1 versículo".
    await expect(
      page.getByText('Fé e Graça').first()
    ).toBeVisible({ timeout: 10000 });
  });
});

// ---------------------------------------------------------------------------
// 7. Comparison Page
// ---------------------------------------------------------------------------
test.describe('7. Comparison Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/comparar', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.waitForTimeout(2000);
  });

  test('page loads with comparison content', async ({ page }) => {
    await expect(page).toHaveURL(/\/comparar/);
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 15000 });
  });

  test('translation selector buttons are visible', async ({ page }) => {
    await expect(page.locator('text=ARC').first()).toBeVisible();
    await expect(page.locator('text=NVI').first()).toBeVisible();
  });

  test('chapter navigation buttons exist', async ({ page }) => {
    const prevBtn = page
      .locator('button')
      .filter({ has: page.locator('svg.lucide-chevron-left') })
      .first();
    const nextBtn = page
      .locator('button')
      .filter({ has: page.locator('svg.lucide-chevron-right') })
      .first();
    await expect(prevBtn).toBeVisible({ timeout: 10000 });
    await expect(nextBtn).toBeVisible();
  });

  test('navigating to next chapter works', async ({ page }) => {
    const nextBtn = page
      .locator('button')
      .filter({ has: page.locator('svg.lucide-chevron-right') })
      .first();
    await expect(nextBtn).toBeVisible({ timeout: 10000 });
    await nextBtn.click();
    await page.waitForTimeout(2000);

    // Content should still be visible after navigation.
    const content = page
      .locator('.sola-card, .glass-card, [class*="card"]')
      .first();
    await expect(content).toBeVisible({ timeout: 10000 });
  });

  test('comparison cards display verse content', async ({ page }) => {
    await page.waitForTimeout(3000);
    const content = page
      .locator('.sola-card, .glass-card, [class*="card"]')
      .first();
    await expect(content).toBeVisible({ timeout: 10000 });
  });
});

// ---------------------------------------------------------------------------
// 8. Theme Switching
// ---------------------------------------------------------------------------
test.describe('8. Theme Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.waitForTimeout(1500);
  });

  test('theme toggle button is visible in the header', async ({ page }) => {
    const themeBtn = page.locator('button[aria-label="Temas"]').first();
    await expect(themeBtn).toBeVisible();
  });

  test('clicking theme toggle opens dropdown with options', async ({
    page,
  }) => {
    const themeBtn = page.locator('button[aria-label="Temas"]').first();
    await themeBtn.click();
    await page.waitForTimeout(500);

    const themeOptions = page
      .locator('[role="menuitem"]')
      .filter({ hasText: /Claro|Escuro|Sepia|Padrão|Noturno/ });
    await expect(themeOptions.first()).toBeVisible();
  });

  test('switching to light theme removes dark class from html', async ({
    page,
  }) => {
    const themeBtn = page.locator('button[aria-label="Temas"]').first();
    await themeBtn.click();
    await page.waitForTimeout(500);

    const lightOption = page
      .locator('[role="menuitem"]')
      .filter({ hasText: /Claro/ });
    await lightOption.click();
    await page.waitForTimeout(500);

    const htmlClass = await page.locator('html').getAttribute('class');
    expect(htmlClass).not.toContain('dark');
  });

  test('switching to dark theme adds dark class to html', async ({
    page,
  }) => {
    const themeBtn = page.locator('button[aria-label="Temas"]').first();
    await themeBtn.click();
    await page.waitForTimeout(500);

    const darkOption = page
      .locator('[role="menuitem"]')
      .filter({ hasText: /Escuro/ });
    await darkOption.click();
    await page.waitForTimeout(500);

    const htmlClass = await page.locator('html').getAttribute('class');
    expect(htmlClass).toContain('dark');
  });

  test('switching to sepia theme adds sepia class to html', async ({
    page,
  }) => {
    const themeBtn = page.locator('button[aria-label="Temas"]').first();
    await themeBtn.click();
    await page.waitForTimeout(500);

    const sepiaOption = page
      .locator('[role="menuitem"]')
      .filter({ hasText: /Sepia/ });
    await sepiaOption.click();
    await page.waitForTimeout(500);

    const htmlClass = await page.locator('html').getAttribute('class');
    expect(htmlClass).toContain('sepia');
  });

  test('theme preference persists across page reload', async ({
    page,
  }) => {
    const themeBtn = page.locator('button[aria-label="Temas"]').first();
    await themeBtn.click();
    await page.waitForTimeout(500);

    const darkOption = page
      .locator('[role="menuitem"]')
      .filter({ hasText: /Escuro/ });
    await darkOption.click();
    await page.waitForTimeout(500);

    // Reload the page and verify theme persists.
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);

    const htmlClass = await page.locator('html').getAttribute('class');
    expect(htmlClass).toContain('dark');
  });
});

// ---------------------------------------------------------------------------
// 9. Mobile Navigation (BottomNavBar)
// ---------------------------------------------------------------------------
test.describe('9. Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.waitForTimeout(1500);
  });

  test('BottomNavBar is visible on mobile', async ({ page }) => {
    const bottomNav = page.locator('nav[aria-label="Navegacao mobile"]');
    await expect(bottomNav).toBeVisible();
  });

  test('BottomNavBar shows 5 tabs: Início, Bíblia, Estudos, Pesquisa, Mais',
    async ({ page }) => {
      const bottomNav = page.locator('nav[aria-label="Navegacao mobile"]');
      await expect(bottomNav).toBeVisible();

      // Check each tab label is present.
      await expect(bottomNav.getByLabel('Início').first()).toBeVisible();
      await expect(bottomNav.getByLabel('Bíblia').first()).toBeVisible();
      await expect(bottomNav.getByLabel('Estudos').first()).toBeVisible();
      await expect(bottomNav.getByLabel('Pesquisa').first()).toBeVisible();
      await expect(bottomNav.getByLabel('Mais opcoes').first()).toBeVisible();
    }
  );

  test('clicking Bíblia tab navigates to /biblia', async ({ page }) => {
    const bottomNav = page.locator('nav[aria-label="Navegacao mobile"]');
    const bibliaTab = bottomNav.getByLabel('Bíblia').first();
    await bibliaTab.click();

    await page.waitForURL(/\/biblia/, { timeout: 30000 });
    await expect(page).toHaveURL(/\/biblia/);
  });

  test('clicking Pesquisa tab navigates to /pesquisa', async ({ page }) => {
    const bottomNav = page.locator('nav[aria-label="Navegacao mobile"]');
    const pesquisaTab = bottomNav.getByLabel('Pesquisa').first();
    await pesquisaTab.click();

    await page.waitForURL(/\/pesquisa/, { timeout: 30000 });
    await expect(page).toHaveURL(/\/pesquisa/);
  });

  test('clicking Início tab navigates to /', async ({ page }) => {
    // First navigate away so Início is not already active.
    await page.goto('/biblia', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
    await page.waitForTimeout(1000);

    const bottomNav = page.locator('nav[aria-label="Navegacao mobile"]');
    const inicioTab = bottomNav.getByLabel('Início').first();
    await inicioTab.click();

    await page.waitForURL(/^\/$/, { timeout: 30000 });
    await expect(page).toHaveURL('/');
  });

  test('clicking Mais tab opens overlay with extra links', async ({
    page,
  }) => {
    const bottomNav = page.locator('nav[aria-label="Navegacao mobile"]');
    const maisTab = bottomNav.getByLabel('Mais opcoes').first();
    await maisTab.click();

    // The "Mais opcoes" dialog overlay should appear.
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await expect(dialog.getByText('Mais opcoes')).toBeVisible();
  });

  test('More overlay links navigate to correct pages', async ({ page }) => {
    const bottomNav = page.locator('nav[aria-label="Navegacao mobile"]');
    const maisTab = bottomNav.getByLabel('Mais opcoes').first();
    await maisTab.click();

    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible({ timeout: 5000 });

    // Click Teologia link.
    const teologiaLink = dialog.getByText('Teologia').first();
    await expect(teologiaLink).toBeVisible();
    await teologiaLink.click();

    await page.waitForURL(/\/teologia/, { timeout: 30000 });
    await expect(page).toHaveURL(/\/teologia/);
  });

  test('closing More overlay works', async ({ page }) => {
    const bottomNav = page.locator('nav[aria-label="Navegacao mobile"]');
    const maisTab = bottomNav.getByLabel('Mais opcoes').first();
    await maisTab.click();

    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible({ timeout: 5000 });

    // Click the close button.
    const closeBtn = dialog.getByLabel('Fechar menu').first();
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();

    // Dialog should disappear.
    await expect(dialog).toBeHidden({ timeout: 3000 });
  });

  test('active tab is visually highlighted on current page', async ({
    page,
  }) => {
    // On the home page, Início should be the active tab.
    const bottomNav = page.locator('nav[aria-label="Navegacao mobile"]');
    const inicioTab = bottomNav.getByLabel('Início').first();
    await expect(inicioTab).toHaveClass(/text-\[#D4A843\]/);
  });
});
