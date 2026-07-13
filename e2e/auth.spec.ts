import { test, expect } from '@playwright/test';

test.describe('Auth - Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('page title "Entrar" is visible', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Entrar');
  });

  test('email input is visible', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
  });

  test('password input is visible', async ({ page }) => {
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();
  });

  test('submit button "Entrar" is visible', async ({ page }) => {
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toContainText('Entrar');
  });

  test('Google login button is visible', async ({ page }) => {
    await expect(page.locator('text=Continuar com Google')).toBeVisible();
  });

  test('Apple login button is visible', async ({ page }) => {
    await expect(page.locator('text=Continuar com Apple')).toBeVisible();
  });

  test('password toggle shows/hides password', async ({ page }) => {
    const passwordInput = page.locator('input[type="password"]');
    const toggleBtn = page.locator('button').filter({ has: page.locator('svg.lucide-eye') }).first();
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();
    await page.waitForTimeout(300);
    const textInput = page.locator('input[type="text"][placeholder*="senha"]');
    await expect(textInput).toBeVisible();
  });

  test('submitting empty form shows validation error', async ({ page }) => {
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();
    await page.waitForTimeout(500);
    await expect(page.locator('text=Preencha todos os campos')).toBeVisible();
  });

  test('link to registration page is visible', async ({ page }) => {
    const cadastroLink = page.locator('a[href="/auth/cadastro"]');
    await expect(cadastroLink).toBeVisible();
    await expect(cadastroLink).toContainText('Cadastre-se');
  });
});

test.describe('Auth - Cadastro Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/cadastro', { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/auth\/cadastro/);
  });

  test('page title "Criar Conta" is visible', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Criar Conta');
  });

  test('name input is visible', async ({ page }) => {
    const nameInput = page.locator('input[placeholder*="Seu nome"]');
    await expect(nameInput).toBeVisible();
  });

  test('email input is visible', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
  });

  test('password input is visible', async ({ page }) => {
    const passwordInput = page.locator('input[type="password"]').first();
    await expect(passwordInput).toBeVisible();
  });

  test('confirm password input is visible', async ({ page }) => {
    const confirmInput = page.locator('input[placeholder*="Repita a senha"]');
    await expect(confirmInput).toBeVisible();
  });

  test('submit button "Criar Conta" is visible', async ({ page }) => {
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toContainText('Criar Conta');
  });

  test('Google signup button is visible', async ({ page }) => {
    await expect(page.locator('text=Cadastrar com Google')).toBeVisible();
  });

  test('link to login page is visible', async ({ page }) => {
    const loginLink = page.locator('a[href="/auth/login"]');
    await expect(loginLink).toBeVisible();
    await expect(loginLink).toContainText('Entrar');
  });

  test('submitting empty form shows validation error', async ({ page }) => {
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();
    await page.waitForTimeout(500);
    await expect(page.locator('text=Preencha todos os campos')).toBeVisible();
  });
});
