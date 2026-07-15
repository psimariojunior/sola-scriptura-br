import { test, expect } from '@playwright/test';

const API_BASE = 'https://api.solascripturabr.com.br';

test.describe('Smoke - API Health', () => {
  test('health check returns 200', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/v1/health`);
    expect(response.status()).toBe(200);
  });

  test('health check returns valid JSON', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/v1/health`);
    const body = await response.json();
    expect(body).toBeDefined();
  });

  test('livros endpoint returns data', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/v1/livros`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toBeDefined();
  });

  test('livros endpoint returns array with books', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/v1/livros`);
    const body = await response.json();
    const books = Array.isArray(body) ? body : body.data || body.livros;
    expect(Array.isArray(books)).toBe(true);
    expect(books.length).toBeGreaterThan(0);
  });

  test('CORS headers are present', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/v1/health`, {
      headers: {
        Origin: 'https://solascripturabr.com',
      },
    });
    const corsHeader = response.headers()['access-control-allow-origin'];
    expect(corsHeader).toBeDefined();
  });

  test('API responds within acceptable time', async ({ request }) => {
    const start = Date.now();
    await request.get(`${API_BASE}/api/v1/health`);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(5000);
  });
});
