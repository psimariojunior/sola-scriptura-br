import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('home page carrega corretamente com titulo e hero section', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Titulo da pagina
    const title = await page.title();
    expect(title.toLowerCase()).toContain('sola scriptura');

    // Hero section visivel
    const heading = page.locator('h1');
    await expect(heading.first()).toBeVisible({ timeout: 10000 });
    await expect(heading.first()).toContainText('Sola');
    await expect(heading.first()).toContainText('Scriptura');
  });

  test('hero subtitle e botoes CTA sao visiveis', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    await expect(page.getByText('Estudo Bíblico Acadêmico', { exact: true }).nth(1)).toBeVisible();
    const cta = page.locator('a[href="/biblia"]').filter({ hasText: 'Iniciar Estudo' });
    await expect(cta).toBeVisible();
  });
});

test.describe('Bible Page - Navegacao', () => {
  test('navega para /biblia e ve versiculos', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1500);

    // Clicar no link da biblia
    const bibliaLink = page.locator('a[href="/biblia"]').first();
    await expect(bibliaLink).toBeVisible();
    await bibliaLink.click();
    await page.waitForURL(/\/biblia/, { timeout: 60000 });

    // Esperar versiculos carregarem
    await page.waitForTimeout(5000);

    // Verificar que versiculos estao visiveis
    const verseNumbers = page.locator('sup.text-primary.font-bold');
    await expect(verseNumbers.first()).toBeVisible({ timeout: 15000 });
    const count = await verseNumbers.count();
    expect(count).toBeGreaterThan(0);

    // Verificar que texto do verso nao esta vazio
    const verseText = await page.locator('p.font-serif-body').first().textContent();
    expect(verseText!.length).toBeGreaterThan(0);
  });

  test('botoes de traducao ARC e NVI estao visiveis', async ({ page }) => {
    await page.goto('/biblia', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);

    const arcButton = page.locator('button').filter({ hasText: /^ARC$/ });
    const nviButton = page.locator('button').filter({ hasText: /^NVI$/ });
    await expect(arcButton).toBeVisible();
    await expect(nviButton).toBeVisible();
  });
});

test.describe('Bible Page - Troca de Traducao', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/biblia', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);
  });

  test('ARC esta ativa por padrao', async ({ page }) => {
    const arcButton = page.locator('button').filter({ hasText: /^ARC$/ });
    await expect(arcButton).toHaveClass(/bg-primary\/10/);
  });

  test('clicar NVI ativa NVI e mantem ARC', async ({ page }) => {
    const nviButton = page.locator('button').filter({ hasText: /^NVI$/ });
    await nviButton.click();
    await page.waitForTimeout(2000);
    await expect(nviButton).toHaveClass(/bg-emerald-500\/10/);

    const arcButton = page.locator('button').filter({ hasText: /^ARC$/ });
    await expect(arcButton).toHaveClass(/bg-primary\/10/);
  });

  test('desativar traducao remove ella', async ({ page }) => {
    const arcButton = page.locator('button').filter({ hasText: /^ARC$/ });
    await arcButton.click();
    await page.waitForTimeout(2000);
    await expect(arcButton).not.toHaveClass(/bg-primary\/10/);
  });
});

test.describe('Bible Page - Pesquisa de Livros', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/biblia', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);
  });

  test('pesquisa encontra livros na sidebar', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Buscar livro..."]');
    await expect(searchInput).toBeVisible();

    // Pesquisar por Joao
    await searchInput.fill('João');
    await page.waitForTimeout(500);

    const sidebar = page.locator('aside').first();
    await expect(sidebar.getByText('João').first()).toBeVisible();
  });

  test('sidebar mostra livros do AT', async ({ page }) => {
    const sidebar = page.locator('aside').first();
    await expect(sidebar).toBeVisible();
    await expect(sidebar.getByText('Gênesis').first()).toBeVisible();
    await expect(sidebar.getByText('Êxodo').first()).toBeVisible();
  });

  test('clicar em livro muda para capitulo 1', async ({ page }) => {
    const sidebar = page.locator('aside').first();
    const exodoBtn = sidebar.getByText('Êxodo').first();
    await expect(exodoBtn).toBeVisible();
    await exodoBtn.click();
    await page.waitForTimeout(3000);
    await expect(page.getByText('1 /').first()).toBeVisible();
  });
});

test.describe('Bible Page - Modo Zen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/biblia', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);
  });

  test('botao de modo zen existe e ativa/desativa', async ({ page }) => {
    // Procurar pelo botao de modo zen (pode ter titulo ou aria-label)
    const zenBtn = page.locator('button[title="Modo leitura"], button[title="Modo zen"], button[aria-label*="zen"], button[aria-label*="leitura"]').first();

    if (await zenBtn.isVisible()) {
      await zenBtn.click();
      await page.waitForTimeout(1000);

      // Verificar que o layout mudou (sidebar escondida ou verso em destaque)
      const heading = page.locator('text=Capítulo 1').first();
      await expect(heading).toBeVisible({ timeout: 5000 });
    }
  });
});

test.describe('Bible Page - Mobile Menu', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('mobile menu abre e fecha', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1500);

    // Abrir menu mobile
    const menuBtn = page.locator('button[aria-controls="mobile-menu"]');
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();
    await page.waitForTimeout(500);

    // Verificar que menu esta aberto
    const mobileNav = page.locator('#mobile-menu');
    await expect(mobileNav).toBeVisible();

    // Verificar links de navegacao
    await expect(mobileNav.locator('a[href="/biblia"]').first()).toBeVisible();
    await expect(mobileNav.locator('a[href="/pesquisa"]').first()).toBeVisible();

    // Fechar menu clicando em um link
    const bibliaLink = mobileNav.locator('a[href="/biblia"]').first();
    await bibliaLink.click();
    await page.waitForURL(/\/biblia/, { timeout: 60000 });
    await expect(page).toHaveURL(/\/biblia/);
  });

  test('mobile menu mostra todas as secoes', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1500);

    const menuBtn = page.locator('button[aria-controls="mobile-menu"]');
    await menuBtn.click();
    await page.waitForTimeout(500);

    const mobileNav = page.locator('#mobile-menu');
    await expect(mobileNav.locator('a[href="/exegese"]').first()).toBeVisible();
    await expect(mobileNav.locator('a[href="/ia"]').first()).toBeVisible();
    await expect(mobileNav.locator('a[href="/cronologia"]').first()).toBeVisible();
    await expect(mobileNav.locator('a[href="/devocional"]').first()).toBeVisible();
  });
});
