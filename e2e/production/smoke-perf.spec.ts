import { test, expect } from '@playwright/test';

const PAGES = [
  { path: '/', name: 'Landing Page' },
  { path: '/biblia', name: 'Bíblia' },
  { path: '/ia', name: 'IA' },
  { path: '/teologia', name: 'Teologia' },
  { path: '/historia', name: 'História' },
  { path: '/idiomas', name: 'Idiomas' },
  { path: '/exegese', name: 'Exegese' },
  { path: '/pesquisa', name: 'Pesquisa' },
];

test.describe('Smoke - Performance', () => {
  for (const pageConfig of PAGES) {
    test(`${pageConfig.name} (${pageConfig.path}) loads within 5 seconds`, async ({ page }) => {
      const start = Date.now();
      const response = await page.goto(pageConfig.path, { waitUntil: 'domcontentloaded' });
      const elapsed = Date.now() - start;

      expect(response?.status()).toBe(200);
      expect(elapsed).toBeLessThan(5000);
    });
  }

  test('no resources return 404 on landing page', async ({ page }) => {
    const failedRequests: string[] = [];
    page.on('response', (response) => {
      if (response.status() === 404 && !response.url().includes('favicon')) {
        failedRequests.push(response.url());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(failedRequests).toHaveLength(0);
  });

  test('no resources return 404 on /biblia', async ({ page }) => {
    const failedRequests: string[] = [];
    page.on('response', (response) => {
      if (response.status() === 404 && !response.url().includes('favicon')) {
        failedRequests.push(response.url());
      }
    });

    await page.goto('/biblia', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    expect(failedRequests).toHaveLength(0);
  });

  test('no failed network requests on landing page', async ({ page }) => {
    const failedRequests: string[] = [];
    page.on('requestfailed', (request) => {
      failedRequests.push(`${request.url()} - ${request.failure()?.errorText}`);
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(failedRequests).toHaveLength(0);
  });

  test('CSS and JS resources load successfully', async ({ page }) => {
    const failedResources: string[] = [];
    page.on('response', (response) => {
      const url = response.url();
      if (
        (url.endsWith('.css') || url.endsWith('.js') || url.includes('/_next/')) &&
        response.status() >= 400
      ) {
        failedResources.push(`${url} (${response.status()})`);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(failedResources).toHaveLength(0);
  });
});
