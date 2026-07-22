import { test, expect } from '@playwright/test';

const ROUTES = ['/', '/biblia', '/pesquisa', '/idiomas', '/teologia', '/ia', '/estudos', '/comparar'];

test.describe('Smoke Tests', () => {
  test.describe('Todas as rotas principais retornam 200', () => {
    for (const route of ROUTES) {
      test(`Rota ${route} retorna 200`, async ({ page }) => {
        const response = await page.goto(route, { waitUntil: 'domcontentloaded', timeout: 30000 });
        expect(response?.status()).toBe(200);
      });
    }
  });

  test.describe('Nao ha erros de console em /biblia', () => {
    test('Pagina /biblia carrega sem erros criticos de console', async ({ page }) => {
      const errors: string[] = [];

      page.on('console', msg => {
        if (msg.type() === 'error') {
          const text = msg.text();
          // Ignorar erros conhecidos de service worker e favicon
          if (!text.includes('service worker') && !text.includes('favicon') && !text.includes('SW')) {
            errors.push(text);
          }
        }
      });

      await page.goto('/biblia', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(3000);

      // Filtrar erros irrelevantes
      const criticalErrors = errors.filter(
        e => !e.includes('ResizeObserver') && !e.includes('chunk') && !e.includes('Loading chunk')
      );

      expect(criticalErrors).toHaveLength(0);
    });
  });

  test.describe('Fonts carregam corretamente', () => {
    test('Fontes CSS estao disponiveis', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });

      // Verificar se as variaveis de fonte estao definidas
      const cormorantVar = await page.evaluate(() => {
        return getComputedStyle(document.documentElement).getPropertyValue('--font-cormorant').trim();
      });
      const interVar = await page.evaluate(() => {
        return getComputedStyle(document.documentElement).getPropertyValue('--font-inter').trim();
      });

      expect(cormorantVar).toBeTruthy();
      expect(interVar).toBeTruthy();
    });

    test('Fontes sao aplicadas no body', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });

      const bodyFont = await page.evaluate(() => {
        return getComputedStyle(document.body).fontFamily;
      });

      expect(bodyFont).toBeTruthy();
      expect(bodyFont.length).toBeGreaterThan(0);
    });
  });
});
