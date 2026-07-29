import { type Page, type Expect } from '@playwright/test';

/**
 * Espera que a Bíblia carregue (versículos visíveis)
 */
export async function waitForBibleLoaded(page: Page) {
  await page.waitForSelector('span.font-bold.tabular-nums', { timeout: 15000 });
}

/**
 * Semeia localStorage antes do carregamento da página
 */
export async function seedLocalStorage(page: Page, key: string, value: string) {
  await page.addInitScript(([k, v]) => {
    localStorage.setItem(k, v);
  }, [key, value]);
}

/**
 * Semeia múltiplos itens no localStorage
 */
export async function seedMultipleLocalStorage(page: Page, items: Record<string, string>) {
  await page.addInitScript((entries) => {
    for (const [k, v] of entries) {
      localStorage.setItem(k, v);
    }
  }, Object.entries(items));
}

/**
 * Verifica se a página carrega com status 200
 */
export async function expectPageLoads(page: Page, url: string, title?: string) {
  const response = await page.goto(url);
  expect(response?.status()).toBe(200);
  if (title) {
    await expect(page).toHaveTitle(new RegExp(title));
  }
}

/**
 * Verifica se o header está presente
 */
export async function expectHeaderPresent(page: Page) {
  const header = page.locator('header, [role="banner"], nav').first();
  await expect(header).toBeVisible();
}

/**
 * Verifica se o footer está presente
 */
export async function expectFooterPresent(page: Page) {
  const footer = page.locator('footer, [role="contentinfo"]').first();
  await expect(footer).toBeVisible();
}

/**
 * Verifica se não há erros no console
 */
export async function expectNoConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  return errors;
}

/**
 * Navega para uma rota e verifica status
 */
export async function navigateAndCheck(page: Page, url: string, expectedStatus = 200) {
  const response = await page.goto(url);
  expect(response?.status()).toBe(expectedStatus);
}

/**
 * Verifica elementos de uma página de lista/cards
 */
export async function expectCardsPresent(page: Page) {
  const cards = page.locator('.glass-card, [class*="card"], article');
  await expect(cards.first()).toBeVisible();
}

/**
 * Verifica search input existe e funciona
 */
export async function expectSearchWorks(page: Page, placeholder?: string) {
  const searchInput = page.locator('input[type="text"], input[type="search"]').first();
  await expect(searchInput).toBeVisible();
  if (placeholder) {
    await expect(searchInput).toHaveAttribute('placeholder', new RegExp(placeholder, 'i'));
  }
}

/**
 * Login rápido (preenche formulário e submete)
 */
export async function quickLogin(page: Page, email: string, password: string) {
  await page.goto('/auth/login');
  await page.fill('input[type="email"], input[name="email"]', email);
  await page.fill('input[type="password"], input[name="password"]', password);
  await page.click('button[type="submit"]');
}
