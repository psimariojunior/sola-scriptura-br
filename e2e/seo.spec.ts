import { test, expect } from '@playwright/test';

const PAGES_TO_TEST = [
  { path: '/', name: 'Home', title: /sola scriptura/i },
  { path: '/biblia', name: 'Biblia', title: /biblia/i },
  { path: '/pesquisa', name: 'Pesquisa', title: /pesquisa/i },
  { path: '/ia', name: 'IA', title: /ia|intelig|assistente/i },
  { path: '/quiz', name: 'Quiz', title: /quiz/i },
  { path: '/comparar', name: 'Comparar', title: /comparar/i },
  { path: '/favoritos', name: 'Favoritos', title: /favorito/i },
];

test.describe('SEO', () => {
  test.describe('Page titles', () => {
    for (const page of PAGES_TO_TEST) {
      test(`${page.name} (${page.path}) has a title tag`, async ({ page: p }) => {
        await p.goto(page.path, { waitUntil: 'networkidle', timeout: 60000 });
        const title = await p.title();
        expect(title.length).toBeGreaterThan(0);
      });
    }
  });

  test.describe('Meta descriptions', () => {
    for (const page of PAGES_TO_TEST) {
      test(`${page.name} (${page.path}) has a meta description`, async ({ page: p }) => {
        await p.goto(page.path, { waitUntil: 'networkidle', timeout: 60000 });
        const description = await p.getAttribute('meta[name="description"]', 'content');
        expect(description).toBeTruthy();
        expect(description!.length).toBeGreaterThan(10);
      });
    }
  });

  test.describe('Open Graph tags', () => {
    for (const page of PAGES_TO_TEST) {
      test(`${page.name} (${page.path}) has og:title`, async ({ page: p }) => {
        await p.goto(page.path, { waitUntil: 'networkidle', timeout: 60000 });
        const ogTitle = await p.getAttribute('meta[property="og:title"]', 'content');
        expect(ogTitle).toBeTruthy();
        expect(ogTitle!.length).toBeGreaterThan(0);
      });

      test(`${page.name} (${page.path}) has og:description`, async ({ page: p }) => {
        await p.goto(page.path, { waitUntil: 'networkidle', timeout: 60000 });
        const ogDesc = await p.getAttribute('meta[property="og:description"]', 'content');
        expect(ogDesc).toBeTruthy();
        expect(ogDesc!.length).toBeGreaterThan(0);
      });

      test(`${page.name} (${page.path}) has og:image`, async ({ page: p }) => {
        await p.goto(page.path, { waitUntil: 'networkidle', timeout: 60000 });
        const ogImage = await p.getAttribute('meta[property="og:image"]', 'content');
        expect(ogImage).toBeTruthy();
      });
    }
  });

  test.describe('JSON-LD structured data', () => {
    test('Bible page has JSON-LD script tags', async ({ page }) => {
      await page.goto('/biblia', { waitUntil: 'networkidle', timeout: 60000 });
      const jsonLdScripts = page.locator('script[type="application/ld+json"]');
      const count = await jsonLdScripts.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const content = await jsonLdScripts.nth(i).textContent();
        expect(() => JSON.parse(content!)).not.toThrow();
      }
    });

    test('JSON-LD contains valid @context', async ({ page }) => {
      await page.goto('/biblia', { waitUntil: 'networkidle', timeout: 60000 });
      const firstJsonLd = await page.locator('script[type="application/ld+json"]').first().textContent();
      const parsed = JSON.parse(firstJsonLd!);
      expect(parsed['@context']).toBe('https://schema.org');
    });
  });

  test.describe('Image alt attributes', () => {
    for (const page of PAGES_TO_TEST) {
      test(`${page.name} (${page.path}) - all images have alt`, async ({ page: p }) => {
        await p.goto(page.path, { waitUntil: 'networkidle', timeout: 60000 });

        const images = p.locator('img');
        const count = await images.count();
        const missing: number[] = [];

        for (let i = 0; i < count; i++) {
          const alt = await images.nth(i).getAttribute('alt');
          if (alt === null) {
            missing.push(i);
          }
        }

        if (missing.length > 0) {
          console.warn(
            `${page.path}: ${missing.length} images missing alt attribute`
          );
        }

        expect(missing.length).toBe(0);
      });
    }
  });

  test.describe('Link accessibility', () => {
    for (const page of PAGES_TO_TEST) {
      test(`${page.name} (${page.path}) - links have accessible names`, async ({ page: p }) => {
        await p.goto(page.path, { waitUntil: 'networkidle', timeout: 60000 });

        const links = p.locator('a[href]');
        const count = await links.count();
        const emptyLinks: number[] = [];

        for (let i = 0; i < count; i++) {
          const link = links.nth(i);
          const text = (await link.textContent())?.trim() ?? '';
          const ariaLabel = await link.getAttribute('aria-label');
          const title = await link.getAttribute('title');
          const ariaLabelledBy = await link.getAttribute('aria-labelledby');
          const hasImg = await link.locator('img[alt]').count();

          const hasAccessibleName =
            text.length > 0 ||
            !!ariaLabel ||
            !!title ||
            !!ariaLabelledBy ||
            hasImg > 0;

          if (!hasAccessibleName) {
            emptyLinks.push(i);
          }
        }

        if (emptyLinks.length > 0) {
          console.warn(
            `${page.path}: ${emptyLinks.length} links without accessible names`
          );
        }

        expect(emptyLinks.length).toBe(0);
      });
    }
  });

  test.describe('Canonical URLs', () => {
    for (const page of PAGES_TO_TEST) {
      test(`${page.name} (${page.path}) has canonical link`, async ({ page: p }) => {
        await p.goto(page.path, { waitUntil: 'networkidle', timeout: 60000 });
        const canonical = await p.getAttribute('link[rel="canonical"]', 'href');
        expect(canonical).toBeTruthy();
        expect(canonical).toContain('solascripturabr.com.br');
      });
    }
  });

  test.describe('Viewport meta tag', () => {
    test('page has viewport meta tag', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });
      const viewport = await page.getAttribute('meta[name="viewport"]', 'content');
      expect(viewport).toBeTruthy();
      expect(viewport).toContain('width=');
    });
  });

  test.describe('Language attribute', () => {
    test('html tag has lang attribute', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });
      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBeTruthy();
      expect(lang).toMatch(/^pt(-BR)?$/);
    });
  });

  test.describe('Twitter Card tags', () => {
    test('page has twitter:card meta tag', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });
      const card = await page.getAttribute('meta[name="twitter:card"]', 'content');
      expect(card).toBeTruthy();
    });

    test('page has twitter:title meta tag', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });
      const title = await page.getAttribute('meta[name="twitter:title"]', 'content');
      expect(title).toBeTruthy();
    });
  });
});
