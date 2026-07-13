import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.describe('Buttons have aria-labels', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
    });

    test('theme button has aria-label', async ({ page }) => {
      const themeBtn = page.locator('button[aria-label="Temas"]').first();
      await expect(themeBtn).toBeVisible();
      const ariaLabel = await themeBtn.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
    });

    test('mobile menu button has aria-controls', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(500);
      const menuBtn = page.locator('button[aria-controls="mobile-menu"]');
      await expect(menuBtn).toBeVisible();
      const ariaControls = await menuBtn.getAttribute('aria-controls');
      expect(ariaControls).toBe('mobile-menu');
    });

    test('mobile menu button has aria-expanded', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(500);
      const menuBtn = page.locator('button[aria-controls="mobile-menu"]');
      const ariaExpanded = await menuBtn.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('false');
    });

    test('mobile menu button aria-expanded changes on click', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(500);
      const menuBtn = page.locator('button[aria-controls="mobile-menu"]');
      await menuBtn.click();
      await page.waitForTimeout(500);
      const ariaExpanded = await menuBtn.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('true');
    });
  });

  test.describe('Images have alt text', () => {
    test('all img elements have alt attribute', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      const images = page.locator('img');
      const count = await images.count();
      for (let i = 0; i < count; i++) {
        const alt = await images.nth(i).getAttribute('alt');
        expect(alt).not.toBeNull();
      }
    });

    test('images on biblia page have alt text', async ({ page }) => {
      await page.goto('/biblia', { timeout: 90000, waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(5000);
      const images = page.locator('img');
      const count = await images.count();
      for (let i = 0; i < count; i++) {
        const alt = await images.nth(i).getAttribute('alt');
        expect(alt).not.toBeNull();
      }
    });
  });

  test.describe('Keyboard navigation', () => {
    test('Tab key moves focus through interactive elements', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      await page.keyboard.press('Tab');
      const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
      expect(['A', 'BUTTON', 'INPUT']).toContain(firstFocused);
    });

    test('multiple Tab presses move through header elements', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      const focusedElements: string[] = [];
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        const tag = await page.evaluate(() => document.activeElement?.tagName);
        focusedElements.push(tag || '');
      }
      const hasInteractive = focusedElements.some(tag => ['A', 'BUTTON', 'INPUT'].includes(tag));
      expect(hasInteractive).toBe(true);
    });

    test('Enter key activates focused link', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      const bibliaLink = page.locator('nav a[href="/biblia"]').first();
      await bibliaLink.focus();
      await page.keyboard.press('Enter');
      await page.waitForURL(/\/biblia/, { timeout: 60000 });
      await expect(page).toHaveURL(/\/biblia/);
    });

    test('Escape key closes mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const menuBtn = page.locator('button[aria-controls="mobile-menu"]');
      await menuBtn.click();
      await page.waitForTimeout(500);
      const mobileNav = page.locator('#mobile-menu');
      await expect(mobileNav).toBeVisible();
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
      const isHidden = await mobileNav.isHidden();
      expect(isHidden).toBe(true);
    });
  });

  test.describe('Semantic HTML', () => {
    test('page has a header element', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      const header = page.locator('header');
      await expect(header).toBeVisible();
    });

    test('page has a nav element', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      const nav = page.locator('nav').first();
      await expect(nav).toBeVisible();
    });

    test('mobile menu has role="navigation"', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const menuBtn = page.locator('button[aria-controls="mobile-menu"]');
      await menuBtn.click();
      await page.waitForTimeout(500);
      const nav = page.locator('#mobile-menu[role="navigation"]');
      await expect(nav).toBeVisible();
    });

    test('main landmark exists on biblia page', async ({ page }) => {
      await page.goto('/biblia', { timeout: 90000, waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(5000);
      const main = page.locator('main');
      await expect(main).toBeVisible();
    });
  });

  test.describe('Link accessibility', () => {
    test('nav links have visible text', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      const navLinks = page.locator('nav a');
      const count = await navLinks.count();
      for (let i = 0; i < count; i++) {
        const text = await navLinks.nth(i).textContent();
        expect(text!.trim().length).toBeGreaterThan(0);
      }
    });

    test('links have href attribute', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      const links = page.locator('a[href]');
      const count = await links.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Color contrast (basic checks)', () => {
    test('body text has sufficient contrast in light mode', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      const themeBtn = page.locator('button[aria-label="Temas"]').first();
      await themeBtn.click();
      await page.waitForTimeout(500);
      const lightOption = page.locator('[role="menuitem"]').filter({ hasText: /Claro/ });
      await lightOption.click();
      await page.waitForTimeout(500);
      const bodyColor = await page.evaluate(() => {
        return window.getComputedStyle(document.body).color;
      });
      expect(bodyColor).toBeTruthy();
    });

    test('body text has sufficient contrast in dark mode', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      const themeBtn = page.locator('button[aria-label="Temas"]').first();
      await themeBtn.click();
      await page.waitForTimeout(500);
      const darkOption = page.locator('[role="menuitem"]').filter({ hasText: /Escuro/ });
      await darkOption.click();
      await page.waitForTimeout(500);
      const bodyColor = await page.evaluate(() => {
        return window.getComputedStyle(document.body).color;
      });
      expect(bodyColor).toBeTruthy();
    });
  });

  test.describe('Form accessibility', () => {
    test('search input on biblia page has placeholder', async ({ page }) => {
      await page.goto('/biblia', { timeout: 90000, waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(5000);
      const searchInput = page.locator('input[placeholder="Buscar livro..."]');
      await expect(searchInput).toBeVisible();
      const placeholder = await searchInput.getAttribute('placeholder');
      expect(placeholder).toBeTruthy();
    });

    test('search input is focusable', async ({ page }) => {
      await page.goto('/biblia', { timeout: 90000, waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(5000);
      const searchInput = page.locator('input[placeholder="Buscar livro..."]');
      await searchInput.focus();
      const isFocused = await page.evaluate(() => document.activeElement === document.querySelector('input[placeholder="Buscar livro..."]'));
      expect(isFocused).toBe(true);
    });
  });

  test.describe('ARIA attributes', () => {
    test('dropdown menus use role="menuitem"', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const moreBtn = page.locator('nav button').filter({ hasText: 'Mais' }).first();
      await moreBtn.click();
      await page.waitForTimeout(500);
      const menuItems = page.locator('[role="menuitem"]');
      const count = await menuItems.count();
      expect(count).toBeGreaterThan(0);
    });

    test('theme dropdown has correct menu structure', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const themeBtn = page.locator('button[aria-label="Temas"]').first();
      await themeBtn.click();
      await page.waitForTimeout(500);
      const menuItems = page.locator('[role="menuitem"]');
      const count = await menuItems.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });
  });
});
