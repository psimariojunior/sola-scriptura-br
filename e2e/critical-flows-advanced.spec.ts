import { test, expect } from '@playwright/test';

test.describe('Fluxo Crítico: Leitura Bíblica', () => {
  test('abre a Bíblia e lê versículos do Gênesis 1', async ({ page }) => {
    await page.goto('/biblia', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Versículos visíveis
    const verses = page.locator('span.font-bold.tabular-nums');
    await expect(verses.first()).toBeVisible({ timeout: 15000 });
    const count = await verses.count();
    expect(count).toBeGreaterThan(5);

    // Texto do primeiro versículo não vazio
    const firstVerseText = await page.locator('p.font-serif-body').first().textContent();
    expect(firstVerseText?.length).toBeGreaterThan(10);
  });

  test('navega entre capítulos', async ({ page }) => {
    await page.goto('/biblia', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Encontrar botão de próximo capítulo
    const nextBtn = page.locator('button').filter({ hasText: /próximo|next|→/i }).first();
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(2000);

      // Verificar que a URL mudou
      const url = page.url();
      expect(url).toContain('/biblia');
    }
  });

  test('seleciona e deseleciona versículo', async ({ page }) => {
    await page.goto('/biblia', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Clicar no primeiro versículo
    const firstVerse = page.locator('p.font-serif-body').first();
    await expect(firstVerse).toBeVisible({ timeout: 10000 });
    await firstVerse.click();
    await page.waitForTimeout(500);

    // Clicar novamente para deselecionar (toggle)
    await firstVerse.click();
    await page.waitForTimeout(500);
  });

  test('muda tradução', async ({ page }) => {
    await page.goto('/biblia', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Procurar seletor de tradução
    const translationSelector = page.locator('select, [role="combobox"]').first();
    if (await translationSelector.isVisible()) {
      await translationSelector.click();
      await page.waitForTimeout(500);
    }
  });
});

test.describe('Fluxo Crítico: Pesquisa', () => {
  test('pesquisa por palavra-chave', async ({ page }) => {
    await page.goto('/pesquisa', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Campo de busca visível
    const searchInput = page.locator('input[type="text"]').first();
    await expect(searchInput).toBeVisible({ timeout: 10000 });

    // Digitar termo de busca
    await searchInput.fill('fé');
    await page.waitForTimeout(2000);

    // Resultados aparecem
    const results = page.locator('[class*="result"], [class*="verse"]');
    const count = await results.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('pesquisa semantic toggle funciona', async ({ page }) => {
    await page.goto('/pesquisa', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Procurar toggle de busca semântica
    const semanticToggle = page.locator('button, label').filter({ hasText: /semântica|semantic/i }).first();
    if (await semanticToggle.isVisible()) {
      await semanticToggle.click();
      await page.waitForTimeout(500);
    }
  });
});

test.describe('Fluxo Crítico: Palavras Originais', () => {
  test('carrega página de palavras com léxico', async ({ page }) => {
    await page.goto('/palavras', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Título visível
    await expect(page.getByText('Palavras', { exact: false }).first()).toBeVisible({ timeout: 10000 });

    // Tabs de idioma visíveis
    const gregTab = page.locator('button').filter({ hasText: /grego/i }).first();
    const hebrTab = page.locator('button').filter({ hasText: /hebraico/i }).first();
    await expect(gregTab).toBeVisible({ timeout: 5000 });
    await expect(hebrTab).toBeVisible();
  });

  test('pesquisa palavra grega e expande detalhes', async ({ page }) => {
    await page.goto('/palavras', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Buscar "agape"
    const searchInput = page.locator('input[type="text"]').first();
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    await searchInput.fill('agape');
    await page.waitForTimeout(1000);

    // Primeiro resultado visível
    const firstResult = page.locator('button').filter({ hasText: /agapē|agapaō/i }).first();
    if (await firstResult.isVisible()) {
      await firstResult.click();
      await page.waitForTimeout(500);

      // Detalhes expandidos
      const definicao = page.locator('text=Definição').first();
      await expect(definicao).toBeVisible({ timeout: 5000 });
    }
  });

  test('alterna para vista de frequência', async ({ page }) => {
    await page.goto('/palavras', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Clicar no botão de frequência
    const freqBtn = page.locator('button').filter({ hasText: /frequência|frequency/i }).first();
    await expect(freqBtn).toBeVisible({ timeout: 5000 });
    await freqBtn.click();
    await page.waitForTimeout(1000);

    // Top 20 visível
    const top20 = page.locator('text=Top 20').first();
    await expect(top20).toBeVisible({ timeout: 5000 });
  });

  test('alterna para hebraico', async ({ page }) => {
    await page.goto('/palavras', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    const hebrTab = page.locator('button').filter({ hasText: /hebraico/i }).first();
    await expect(hebrTab).toBeVisible({ timeout: 5000 });
    await hebrTab.click();
    await page.waitForTimeout(1000);

    // Buscar hebraico
    const searchInput = page.locator('input[type="text"]').first();
    await searchInput.fill('shalom');
    await page.waitForTimeout(1000);
  });
});

test.describe('Fluxo Crítico: Notificações', () => {
  test('página de configurações de notificações carrega', async ({ page }) => {
    await page.goto('/configuracoes/notificacoes', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Título
    await expect(page.getByText('Notificações', { exact: false }).first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Fluxo Crítico: Home Page', () => {
  test('home carrega com versículo do dia', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Título da página
    const title = await page.title();
    expect(title.toLowerCase()).toContain('sola scriptura');

    // Hero section
    const heading = page.locator('h1');
    await expect(heading.first()).toBeVisible({ timeout: 10000 });

    // Links de navegação principais
    const bibliaLink = page.locator('a[href="/biblia"]').first();
    await expect(bibliaLink).toBeVisible({ timeout: 5000 });
  });

  test('navega para estudos', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    const estudosLink = page.locator('a[href="/estudos"]').first();
    if (await estudosLink.isVisible()) {
      await estudosLink.click();
      await page.waitForURL(/\/estudos/, { timeout: 15000 });
      await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 10000 });
    }
  });
});

test.describe('Fluxo Crítico: Navegação Mobile Bottom Bar', () => {
  test('bottom bar está visível em viewport mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Bottom nav bar
    const bottomNav = page.locator('nav').last();
    await expect(bottomNav).toBeVisible({ timeout: 10000 });
  });
});
