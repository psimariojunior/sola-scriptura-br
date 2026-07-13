import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.describe('Landing page', () => {
    test('landing page loads correctly', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      await expect(page).toHaveURL('/');
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
      await expect(heading).toContainText('Sola');
    });

    test('header logo links to home', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const logo = page.locator('header a[href="/"]').first();
      await expect(logo).toBeVisible();
    });

    test('hero CTA navigates to /biblia', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const cta = page.locator('a[href="/biblia"]').filter({ hasText: 'Iniciar Estudo' });
      await expect(cta).toBeVisible();
      await cta.click();
      await page.waitForURL(/\/biblia/, { timeout: 60000 });
      await expect(page).toHaveURL(/\/biblia/);
    });
  });

  test.describe('Page navigation', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
    });

    test('navigates to /biblia', async ({ page }) => {
      const link = page.locator('nav a[href="/biblia"]').first();
      await expect(link).toBeVisible();
      await link.click();
      await page.waitForURL(/\/biblia/, { timeout: 60000 });
      await expect(page).toHaveURL(/\/biblia/);
    });

    test('navigates to /pesquisa', async ({ page }) => {
      const link = page.locator('nav a[href="/pesquisa"]').first();
      await expect(link).toBeVisible();
      await link.click();
      await page.waitForURL(/\/pesquisa/, { timeout: 60000 });
      await expect(page).toHaveURL(/\/pesquisa/);
    });

    test('navigates to /exegese', async ({ page }) => {
      const link = page.locator('nav a[href="/exegese"]').first();
      await expect(link).toBeVisible();
      await link.click();
      await page.waitForURL(/\/exegese/, { timeout: 60000 });
      await expect(page).toHaveURL(/\/exegese/);
    });

    test('navigates to /teologia', async ({ page }) => {
      const link = page.locator('nav a[href="/teologia"]').first();
      await expect(link).toBeVisible();
      await link.click();
      await page.waitForURL(/\/teologia/, { timeout: 60000 });
      await expect(page).toHaveURL(/\/teologia/);
    });

    test('navigates to /ia', async ({ page }) => {
      const link = page.locator('nav a[href="/ia"]').first();
      await expect(link).toBeVisible();
      await link.click();
      await page.waitForURL(/\/ia/, { timeout: 60000 });
      await expect(page).toHaveURL(/\/ia/);
    });

    test('navigates to /historia', async ({ page }) => {
      const link = page.locator('nav a[href="/historia"]').first();
      await expect(link).toBeVisible();
      await link.click();
      await page.waitForURL(/\/historia/, { timeout: 60000 });
      await expect(page).toHaveURL(/\/historia/);
    });

    test('navigates to /idiomas', async ({ page }) => {
      const link = page.locator('nav a[href="/idiomas"]').first();
      await expect(link).toBeVisible();
      await link.click();
      await page.waitForURL(/\/idiomas/, { timeout: 60000 });
      await expect(page).toHaveURL(/\/idiomas/);
    });
  });

  test.describe('Mobile menu', () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test('mobile menu button is visible on small screens', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const menuBtn = page.locator('button[aria-controls="mobile-menu"]');
      await expect(menuBtn).toBeVisible();
    });

    test('mobile menu opens and shows nav links', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const menuBtn = page.locator('button[aria-controls="mobile-menu"]');
      await menuBtn.click();
      await page.waitForTimeout(500);
      const mobileNav = page.locator('#mobile-menu');
      await expect(mobileNav).toBeVisible();
      await expect(mobileNav.locator('a[href="/biblia"]').first()).toBeVisible();
      await expect(mobileNav.locator('a[href="/exegese"]').first()).toBeVisible();
      await expect(mobileNav.locator('a[href="/ia"]').first()).toBeVisible();
    });

    test('mobile menu closes after clicking a link', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const menuBtn = page.locator('button[aria-controls="mobile-menu"]');
      await menuBtn.click();
      await page.waitForTimeout(500);
      const mobileNav = page.locator('#mobile-menu');
      await expect(mobileNav).toBeVisible();
      const bibliaLink = mobileNav.locator('a[href="/biblia"]').first();
      await bibliaLink.click();
      await page.waitForURL(/\/biblia/, { timeout: 60000 });
      await expect(page).toHaveURL(/\/biblia/);
    });

    test('mobile menu shows "Mais" links (Cronologia, Devocional, Flashcards)', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const menuBtn = page.locator('button[aria-controls="mobile-menu"]');
      await menuBtn.click();
      await page.waitForTimeout(500);
      const mobileNav = page.locator('#mobile-menu');
      await expect(mobileNav.locator('a[href="/cronologia"]').first()).toBeVisible();
      await expect(mobileNav.locator('a[href="/devocional"]').first()).toBeVisible();
      await expect(mobileNav.locator('a[href="/flashcards"]').first()).toBeVisible();
    });

    test('mobile login link is visible', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const menuBtn = page.locator('button[aria-controls="mobile-menu"]');
      await menuBtn.click();
      await page.waitForTimeout(500);
      const mobileNav = page.locator('#mobile-menu');
      await expect(mobileNav.locator('a[href="/auth/login"]').first()).toBeVisible();
    });
  });

  test.describe('Theme switcher', () => {
    test('theme toggle button exists', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const themeBtn = page.locator('button[aria-label="Temas"]').first();
      await expect(themeBtn).toBeVisible();
    });

    test('theme toggle opens dropdown with theme options', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const themeBtn = page.locator('button[aria-label="Temas"]').first();
      await themeBtn.click();
      await page.waitForTimeout(500);
      const themeOptions = page.locator('[role="menuitem"]').filter({ hasText: /Claro|Escuro|Sepia|Padrão|Noturno/ });
      await expect(themeOptions.first()).toBeVisible();
    });

    test('can switch to light theme', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const themeBtn = page.locator('button[aria-label="Temas"]').first();
      await themeBtn.click();
      await page.waitForTimeout(500);
      const lightOption = page.locator('[role="menuitem"]').filter({ hasText: /Claro/ });
      await lightOption.click();
      await page.waitForTimeout(500);
      const htmlClass = await page.locator('html').getAttribute('class');
      expect(htmlClass).not.toContain('dark');
    });

    test('can switch to dark theme', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const themeBtn = page.locator('button[aria-label="Temas"]').first();
      await themeBtn.click();
      await page.waitForTimeout(500);
      const darkOption = page.locator('[role="menuitem"]').filter({ hasText: /Escuro/ });
      await darkOption.click();
      await page.waitForTimeout(500);
      const htmlClass = await page.locator('html').getAttribute('class');
      expect(htmlClass).toContain('dark');
    });

    test('can switch to sepia theme', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const themeBtn = page.locator('button[aria-label="Temas"]').first();
      await themeBtn.click();
      await page.waitForTimeout(500);
      const sepiaOption = page.locator('[role="menuitem"]').filter({ hasText: /Sepia/ });
      await sepiaOption.click();
      await page.waitForTimeout(500);
      const htmlClass = await page.locator('html').getAttribute('class');
      expect(htmlClass).toContain('sepia');
    });
  });

  test.describe('Desktop "Mais" dropdown', () => {
    test('"Mais" dropdown button exists on desktop', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const moreBtn = page.locator('nav button').filter({ hasText: 'Mais' }).first();
      await expect(moreBtn).toBeVisible();
    });

    test('"Mais" dropdown shows additional links', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const moreBtn = page.locator('nav button').filter({ hasText: 'Mais' }).first();
      await moreBtn.click();
      await page.waitForTimeout(500);
      await expect(page.locator('[role="menuitem"]').filter({ hasText: 'Cronologia' }).first()).toBeVisible();
      await expect(page.locator('[role="menuitem"]').filter({ hasText: 'Devocional' }).first()).toBeVisible();
      await expect(page.locator('[role="menuitem"]').filter({ hasText: 'Flashcards' }).first()).toBeVisible();
      await expect(page.locator('[role="menuitem"]').filter({ hasText: 'Meus Estudos' }).first()).toBeVisible();
    });

    test('"Mais" dropdown link navigates to /cronologia', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const moreBtn = page.locator('nav button').filter({ hasText: 'Mais' }).first();
      await moreBtn.click();
      await page.waitForTimeout(500);
      const cronologiaLink = page.locator('[role="menuitem"]').filter({ hasText: 'Cronologia' }).first();
      await cronologiaLink.click();
      await page.waitForURL(/\/cronologia/, { timeout: 60000 });
      await expect(page).toHaveURL(/\/cronologia/);
    });
  });

  test.describe('Login link', () => {
    test('login link is visible and navigates to /auth/login', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const loginLink = page.locator('a[href="/auth/login"]').first();
      await expect(loginLink).toBeVisible();
      await loginLink.click();
      await page.waitForURL(/\/auth\/login/, { timeout: 60000 });
      await expect(page).toHaveURL(/\/auth\/login/);
    });
  });

  test.describe('Language toggle', () => {
    test('language toggle button exists', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const langBtn = page.locator('button').filter({ hasText: /^EN$/ }).or(page.locator('button').filter({ hasText: /^PT$/ })).first();
      await expect(langBtn).toBeVisible();
    });

    test('language toggle switches between PT and EN', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const langBtn = page.locator('button').filter({ hasText: /^EN$/ }).or(page.locator('button').filter({ hasText: /^PT$/ })).first();
      const initialText = await langBtn.textContent();
      await langBtn.click();
      await page.waitForTimeout(500);
      const newText = await langBtn.textContent();
      expect(newText).not.toEqual(initialText);
    });
  });
});
