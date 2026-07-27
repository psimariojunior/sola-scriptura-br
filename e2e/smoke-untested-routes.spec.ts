import { test, expect } from '@playwright/test';

const UNTESTED_ROUTES = [
  { route: '/referencias', name: 'Referências cruzadas' },
  { route: '/memorizacao', name: 'Flashcards memorização' },
  { route: '/relacoes', name: 'Mapa de relações bíblicas' },
  { route: '/desafios', name: 'Desafios comunitários' },
  { route: '/comparar-comentarios', name: 'Comparação de comentários' },
  { route: '/dashboard', name: 'Dashboard de progresso' },
  { route: '/estudo-split', name: 'Modo estudo split view' },
  { route: '/comunidade', name: 'Chat comunitário' },
  { route: '/quiz/multiplayer', name: 'Quiz multiplayer' },
  { route: '/atlas', name: 'Atlas bíblico' },
  { route: '/mapas', name: 'Mapas bíblicos' },
  { route: '/ofertas', name: 'Ofertas PIX' },
  { route: '/ferramentas/introducoes', name: 'Introduções por livro' },
];

for (const { route, name } of UNTESTED_ROUTES) {
  test.describe(`Rota ${route}`, () => {
    test('carrega página com conteúdo', async ({ page }) => {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded', timeout: 30000 });
      expect(response?.status()).toBe(200);

      await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 15000 });

      const headingText = await page.locator('h1, h2').first().textContent();
      expect(headingText).toBeTruthy();
      expect(headingText!.trim().length).toBeGreaterThan(0);
    });
  });
}
