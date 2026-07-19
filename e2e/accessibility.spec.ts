import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES_TO_TEST = [
  { path: '/', name: 'Home' },
  { path: '/biblia', name: 'Biblia' },
  { path: '/pesquisa', name: 'Pesquisa' },
  { path: '/ia', name: 'IA' },
  { path: '/quiz', name: 'Quiz' },
  { path: '/comparar', name: 'Comparar' },
  { path: '/favoritos', name: 'Favoritos' },
];

test.describe('Accessibility', () => {
  test.describe('WCAG 2.1 AA compliance (axe-core)', () => {
    for (const page of PAGES_TO_TEST) {
      test(`${page.name} (${page.path}) has no serious/critical axe violations`, async ({ page: p }) => {
        await p.goto(page.path, {
          waitUntil: 'networkidle',
          timeout: 60000,
        });

        const results = await new AxeBuilder({ page: p })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();

        const seriousAndCritical = results.violations.filter(
          (v) => v.impact === 'serious' || v.impact === 'critical'
        );

        if (seriousAndCritical.length > 0) {
          const details = seriousAndCritical
            .map((v) => `  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodes)`)
            .join('\n');
          console.warn(`Accessibility violations on ${page.path}:\n${details}`);
        }

        // Report but don't fail for minor/moderate issues
        const minorViolations = results.violations.filter(
          (v) => v.impact === 'minor' || v.impact === 'moderate'
        );
        if (minorViolations.length > 0) {
          console.info(
            `Minor/moderate issues on ${page.path}: ${minorViolations.length} violations (not failing)`
          );
        }

        expect(
          seriousAndCritical.length,
          `Found ${seriousAndCritical.length} serious/critical accessibility violations on ${page.path}`
        ).toBe(0);
      });
    }
  });

  test.describe('Color contrast across all pages', () => {
    for (const page of PAGES_TO_TEST) {
      test(`${page.name} passes color contrast checks`, async ({ page: p }) => {
        await p.goto(page.path, {
          waitUntil: 'networkidle',
          timeout: 60000,
        });

        const results = await new AxeBuilder({ page: p })
          .include('body')
          .withRules(['color-contrast'])
          .analyze();

        const contrastViolations = results.violations.filter((v) => v.id === 'color-contrast');

        if (contrastViolations.length > 0) {
          const details = contrastViolations
            .flatMap((v) => v.nodes.map((n) => `    ${n.html.substring(0, 120)}`))
            .join('\n');
          console.warn(`Color contrast issues on ${page.path}:\n${details}`);
        }

        // Fail only on serious impact contrast issues (typically large text failures)
        const seriousContrast = contrastViolations.filter((v) => v.impact === 'serious');
        expect(
          seriousContrast.length,
          `Found ${seriousContrast.length} serious color contrast violations on ${page.path}`
        ).toBe(0);
      });
    }
  });

  test.describe('Keyboard navigation', () => {
    test('Tab key moves focus through interactive elements on home page', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      const focusedTags: string[] = [];
      for (let i = 0; i < 8; i++) {
        await page.keyboard.press('Tab');
        const tag = await page.evaluate(() => document.activeElement?.tagName ?? '');
        focusedTags.push(tag);
      }

      const interactiveCount = focusedTags.filter((t) =>
        ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(t)
      ).length;
      expect(interactiveCount).toBeGreaterThanOrEqual(3);
    });

    test('focus indicator is visible on focused elements', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      const hasFocusOutline = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement;
        if (!el) return false;
        const style = window.getComputedStyle(el);
        const outline = style.outlineStyle;
        const boxShadow = style.boxShadow;
        const borderColor = style.borderColor;
        return (
          outline !== 'none' ||
          (boxShadow !== 'none' && boxShadow !== '' && borderColor !== 'transparent')
        );
      });

      expect(hasFocusOutline).toBe(true);
    });

    test('Tab navigates through biblia page interactive elements', async ({ page }) => {
      await page.goto('/biblia', { waitUntil: 'networkidle', timeout: 60000 });

      const focusedTags: string[] = [];
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab');
        const tag = await page.evaluate(() => document.activeElement?.tagName ?? '');
        focusedTags.push(tag);
      }

      const interactiveCount = focusedTags.filter((t) =>
        ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(t)
      ).length;
      expect(interactiveCount).toBeGreaterThanOrEqual(3);
    });

    test('Escape key closes open dropdowns/modals', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      const themeBtn = page.locator('button[aria-label="Temas"]').first();
      if (await themeBtn.isVisible()) {
        await themeBtn.click();
        await page.waitForTimeout(300);

        const menuVisible = await page.locator('[role="menuitem"]').first().isVisible();
        if (menuVisible) {
          await page.keyboard.press('Escape');
          await page.waitForTimeout(300);
          const menuHidden = await page.locator('[role="menuitem"]').first().isHidden();
          expect(menuHidden).toBe(true);
        }
      }
    });
  });

  test.describe('Form accessibility', () => {
    test('search input on pesquisa page is keyboard accessible', async ({ page }) => {
      await page.goto('/pesquisa', { waitUntil: 'networkidle', timeout: 60000 });

      const searchInput = page.locator('input[type="text"], input[type="search"], input[placeholder]').first();
      if (await searchInput.isVisible()) {
        await searchInput.focus();
        const isFocused = await page.evaluate(
          () => document.activeElement?.tagName === 'INPUT'
        );
        expect(isFocused).toBe(true);
      }
    });

    test('inputs have associated labels or aria-label', async ({ page }) => {
      await page.goto('/pesquisa', { waitUntil: 'networkidle', timeout: 60000 });

      const results = await new AxeBuilder({ page })
        .withRules(['label'])
        .analyze();

      const labelViolations = results.violations.filter((v) => v.id === 'label');
      expect(
        labelViolations.length,
        `Found ${labelViolations.length} input elements without labels on /pesquisa`
      ).toBe(0);
    });
  });

  test.describe('Semantic structure', () => {
    test('pages have proper landmark regions', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      const landmarks = await page.evaluate(() => {
        return {
          header: document.querySelectorAll('header, [role="banner"]').length,
          nav: document.querySelectorAll('nav, [role="navigation"]').length,
          main: document.querySelectorAll('main, [role="main"]').length,
        };
      });

      expect(landmarks.header).toBeGreaterThanOrEqual(1);
      expect(landmarks.nav).toBeGreaterThanOrEqual(1);
    });

    test('heading hierarchy is logical', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      const headings = await page.evaluate(() => {
        const hs = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        return hs.map((h) => parseInt(h.tagName.charAt(1)));
      });

      expect(headings.length).toBeGreaterThan(0);
      expect(headings[0]).toBe(1);

      for (let i = 1; i < headings.length; i++) {
        expect(
          headings[i] - headings[i - 1],
          `Heading h${headings[i]} follows h${headings[i - 1]} (skip level)`
        ).toBeLessThanOrEqual(1);
      }
    });
  });

  test.describe('Image accessibility', () => {
    test('all images have alt attributes on home page', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      const results = await new AxeBuilder({ page })
        .withRules(['image-alt'])
        .analyze();

      const imageViolations = results.violations.filter((v) => v.id === 'image-alt');
      expect(imageViolations.length).toBe(0);
    });
  });
});
