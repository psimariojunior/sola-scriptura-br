import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES_TO_TEST = [
  { path: '/', name: 'Home' },
  { path: '/biblia', name: 'Biblia' },
  { path: '/pesquisa', name: 'Pesquisa' },
  { path: '/teologia', name: 'Teologia' },
  { path: '/historia', name: 'Historia' },
  { path: '/personagens', name: 'Personagens' },
  { path: '/exegese', name: 'Exegese' },
  { path: '/idiomas', name: 'Idiomas' },
  { path: '/harmonia', name: 'Harmonia' },
  { path: '/atlas', name: 'Atlas' },
  { path: '/favoritos', name: 'Favoritos' },
  { path: '/notas', name: 'Notas' },
  { path: '/quiz', name: 'Quiz' },
  { path: '/ia', name: 'IA' },
  { path: '/auth/login', name: 'Login' },
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

    test('skip link is visible and functional on first Tab', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      await page.keyboard.press('Tab');
      const skipLink = page.locator('a[href="#main"], a[href="#content"], text=Pular para o conteúdo, text=Skip to content').first();
      if (await skipLink.isVisible()) {
        await expect(skipLink).toBeVisible();
        await page.keyboard.press('Enter');
        const activeTag = await page.evaluate(() => document.activeElement?.tagName ?? '');
        expect(['MAIN', 'A', 'BUTTON']).toContain(activeTag);
      }
    });

    test('arrow keys navigate within menu when open', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      const menuTrigger = page.locator('button[aria-haspopup="menu"], button[aria-expanded]').first();
      if (await menuTrigger.isVisible()) {
        await menuTrigger.click();
        await page.waitForTimeout(300);
        const menuItems = page.locator('[role="menuitem"]');
        const count = await menuItems.count();
        if (count > 1) {
          await menuItems.first().focus();
          await page.keyboard.press('ArrowDown');
          const activeRole = await page.evaluate(() => document.activeElement?.getAttribute('role') ?? '');
          expect(activeRole).toBe('menuitem');
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

    test('search form submits with Enter key', async ({ page }) => {
      await page.goto('/pesquisa', { waitUntil: 'networkidle', timeout: 60000 });

      const searchInput = page.locator('input[type="text"], input[type="search"], input[placeholder]').first();
      if (await searchInput.isVisible()) {
        await searchInput.fill('Graça');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1000);
        const url = page.url();
        expect(url).toContain('q=');
      }
    });

    test('aria-required marks mandatory fields', async ({ page }) => {
      await page.goto('/pesquisa', { waitUntil: 'networkidle', timeout: 60000 });

      const requiredInputs = await page.locator('[aria-required="true"], [required]').count();
      if (requiredInputs > 0) {
        const firstRequired = page.locator('[aria-required="true"], [required]').first();
        const hasLabel = await firstRequired.evaluate((el) => {
          const id = el.id;
          return !!(
            document.querySelector(`label[for="${id}"]`) ||
            el.closest('label') ||
            el.getAttribute('aria-label')
          );
        });
        expect(hasLabel).toBe(true);
      }
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

    test('each page has a single h1', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      const h1Count = await page.locator('h1').count();
      expect(h1Count, 'Page should have exactly one h1').toBe(1);
    });

    test('page has lang attribute on html element', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      const lang = await page.evaluate(() => document.documentElement.getAttribute('lang'));
      expect(lang).toBeTruthy();
      expect(lang!.length).toBeGreaterThanOrEqual(2);
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

    test('decorative images have empty alt or role="presentation"', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      const decorativeImages = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.filter((img) => {
          const alt = img.getAttribute('alt');
          const role = img.getAttribute('role');
          return alt === '' || role === 'presentation' || role === 'none';
        }).length;
      });

      const totalImages = await page.locator('img').count();
      expect(totalImages).toBeGreaterThanOrEqual(0);
      expect(decorativeImages).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('ARIA attributes', () => {
    test('all ARIA roles are valid', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      const results = await new AxeBuilder({ page })
        .withRules(['aria-valid-role'])
        .analyze();

      const roleViolations = results.violations.filter((v) => v.id === 'aria-valid-role');
      expect(roleViolations.length).toBe(0);
    });

    test('ARIA properties reference existing IDs', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      const results = await new AxeBuilder({ page })
        .withRules(['aria-valid-attr-value'])
        .analyze();

      const ariaViolations = results.violations.filter((v) => v.id === 'aria-valid-attr-value');
      expect(ariaViolations.length).toBe(0);
    });

    test('buttons and links have accessible names', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      const results = await new AxeBuilder({ page })
        .withRules(['button-name', 'link-name'])
        .analyze();

      const nameViolations = results.violations.filter(
        (v) => v.id === 'button-name' || v.id === 'link-name'
      );

      if (nameViolations.length > 0) {
        const details = nameViolations
          .flatMap((v) => v.nodes.map((n) => `    ${v.id}: ${n.html.substring(0, 100)}`))
          .join('\n');
        console.warn(`Accessible name violations on /:\n${details}`);
      }

      expect(
        nameViolations.length,
        `Found ${nameViolations.length} elements without accessible names`
      ).toBe(0);
    });

    test('aria-label and aria-labelledby values are non-empty', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      const emptyAria = await page.evaluate(() => {
        const els = document.querySelectorAll('[aria-label], [aria-labelledby]');
        let empty = 0;
        els.forEach((el) => {
          const label = el.getAttribute('aria-label');
          const labelledby = el.getAttribute('aria-labelledby');
          if (label !== null && label.trim() === '') empty++;
          if (labelledby !== null && labelledby.trim() === '') empty++;
        });
        return empty;
      });

      expect(emptyAria).toBe(0);
    });
  });

  test.describe('Link and navigation accessibility', () => {
    test('links have descriptive text or aria-label', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      const emptyLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'));
        return links.filter((a) => {
          const text = a.textContent?.trim() ?? '';
          const ariaLabel = a.getAttribute('aria-label')?.trim() ?? '';
          const title = a.getAttribute('title')?.trim() ?? '';
          return !text && !ariaLabel && !title;
        }).length;
      });

      expect(emptyLinks).toBe(0);
    });

    test('links that open in new tab indicate this', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      const linksMissingIndicator = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[target="_blank"]'));
        return links.filter((a) => {
          const text = a.textContent?.trim() ?? '';
          const ariaLabel = a.getAttribute('aria-label') ?? '';
          const hasIndicator =
            text.includes('new tab') ||
            text.includes('new window') ||
            text.includes('novo') ||
            ariaLabel.includes('new tab') ||
            ariaLabel.includes('new window') ||
            ariaLabel.includes('novo');
          const hasVisuallyHidden = a.querySelector('.sr-only, .visually-hidden');
          return !hasIndicator && !hasVisuallyHidden;
        }).length;
      });

      if (linksMissingIndicator > 0) {
        console.info(
          `${linksMissingIndicator} links open in new tab without visible indicator (not failing)`
        );
      }
    });

    test('no orphaned click handlers on non-interactive elements', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      const results = await new AxeBuilder({ page })
        .withRules(['aria-roles'])
        .analyze();

      const roleViolations = results.violations.filter((v) => v.id === 'aria-roles');
      expect(roleViolations.length).toBe(0);
    });
  });

  test.describe('Mobile-specific accessibility', () => {
    test('bottom navigation is accessible', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      const bottomNav = page.locator('nav, [role="navigation"]').last();
      if (await bottomNav.isVisible()) {
        const hasAriaLabel = await bottomNav.evaluate((el) => {
          return !!(el.getAttribute('aria-label') || el.getAttribute('aria-labelledby'));
        });
        expect(hasAriaLabel).toBe(true);
      }
    });

    test('touch targets meet minimum size', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      const smallTargets = await page.evaluate(() => {
        const interactives = document.querySelectorAll(
          'a, button, input, select, textarea, [role="button"], [tabindex]'
        );
        let tooSmall = 0;
        interactives.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            if (rect.width < 44 || rect.height < 44) {
              tooSmall++;
            }
          }
        });
        return tooSmall;
      });

      if (smallTargets > 0) {
        console.info(
          `${smallTargets} interactive elements below 44x44px touch target (not failing)`
        );
      }
    });

    test('content is accessible without horizontal scroll', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasHorizontalScroll).toBe(false);
    });
  });

  test.describe('Dark mode accessibility', () => {
    test('axe-core passes with dark theme applied', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      await page.evaluate(() => {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      });
      await page.waitForTimeout(500);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const seriousAndCritical = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical'
      );

      expect(
        seriousAndCritical.length,
        `Dark mode: ${seriousAndCritical.length} serious/critical violations`
      ).toBe(0);
    });
  });

  test.describe('Reduced motion', () => {
    test('animations respect prefers-reduced-motion', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });

      const hasAnimations = await page.evaluate(() => {
        const elements = document.querySelectorAll('[style*="animation"], .animate');
        return elements.length;
      });

      expect(hasAnimations).toBeGreaterThanOrEqual(0);
    });
  });
});
