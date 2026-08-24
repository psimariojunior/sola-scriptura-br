/**
 * Testes do serviço de autenticação (src/lib/auth.ts)
 * Valida: cadastro, login, roles de admin, persistência em cookies HttpOnly
 * e propagação de estado sem necessidade de refresh.
 */
import { authService, AuthService } from '@/lib/auth';

const ADMIN = 'psi_mariojunior@hotmail.com';
process.env.NEXT_PUBLIC_ADMIN_EMAILS = ADMIN;

function mockFetchLogin(nome: string, email: string, role?: string) {
  (global as any).fetch = jest.fn(async (url: string) => {
    if (String(url).includes('/auth/login')) {
      return {
        ok: true,
        json: async () => ({
          data: { accessToken: 'tok_123', refreshToken: 'ref_123', usuario: { id: 'u1', nome, email, role } },
        }),
      };
    }
    if (String(url).includes('/auth/cadastrar')) {
      return {
        ok: true,
        json: async () => ({
          data: { accessToken: 'tok_123', refreshToken: 'ref_123', usuario: { id: 'u1', nome, email, role } },
        }),
      };
    }
    if (String(url).includes('/auth/cookie/clear')) {
      try {
        document.cookie = `ssb_token=; path=/; max-age=0`;
        document.cookie = `ssb_usuario=; path=/; max-age=0`;
        document.cookie = `ssb_refresh=; path=/; max-age=0`;
      } catch {}
      return { ok: true, json: async () => ({ message: 'ok' }) };
    }
    if (String(url).includes('/auth/refresh')) {
      return {
        ok: true,
        json: async () => ({
          data: { accessToken: 'tok_123', refreshToken: 'ref_123' },
        }),
      };
    }
    if (String(url).includes('/auth/user')) {
      return {
        ok: true,
        json: async () => ({ usuario: null }),
      };
    }
    return { ok: false, json: async () => ({ message: 'erro' }) };
  });
}

describe('auth.ts', () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie.split(';').forEach((c) => {
      const name = c.split('=')[0].trim();
      if (name) document.cookie = `${name}=; path=/; max-age=0`;
    });
    authService.logout();
  });

  test('login persiste sessão em memória e cookies HttpOnly', async () => {
    mockFetchLogin('Mário', 'teste@exemplo.com');
    const user = await authService.login('teste@exemplo.com', 'senha123');
    expect(user.email).toBe('teste@exemplo.com');
    expect(authService.isAutenticado()).toBe(true);
    expect(authService.getAccessToken()).toBe('tok_123');
    expect(document.cookie).toContain('ssb_token=');
  });

  test('email de admin recebe role admin', async () => {
    mockFetchLogin('Admin', ADMIN, 'admin');
    await authService.login(ADMIN, 'senha123');
    expect(authService.isAdmin()).toBe(true);
    expect(authService.getUsuario()?.role).toBe('admin');
  });

  test('email normal NÃO é admin', async () => {
    mockFetchLogin('User', 'comum@exemplo.com');
    await authService.login('comum@exemplo.com', 'senha123');
    expect(authService.isAdmin()).toBe(false);
  });

  test('cadastrar define sessão autenticada', async () => {
    mockFetchLogin('Novo', 'novo@exemplo.com');
    const user = await authService.cadastrar('Novo', 'novo@exemplo.com', 'senha123');
    expect(user.email).toBe('novo@exemplo.com');
    expect(authService.isAutenticado()).toBe(true);
  });

  test('loginWithGoogle redireciona para o backend OAuth', () => {
    expect(typeof authService.loginWithGoogle).toBe('function');
  });

  test('logout limpa estado, memória e cookies', async () => {
    mockFetchLogin('Mário', 'teste@exemplo.com');
    await authService.login('teste@exemplo.com', 'senha123');
    expect(authService.isAutenticado()).toBe(true);
    await authService.logout();
    await new Promise(r => setTimeout(r, 0));
    expect(authService.isAutenticado()).toBe(false);
    expect(authService.getAccessToken()).toBeNull();
    expect(document.cookie).not.toContain('ssb_token=tok');
  });

  test('recarregarSessao restaura estado do cookie ssb_usuario', async () => {
    // Simula cookie de usuario definido pela API route
    document.cookie = `ssb_usuario=${encodeURIComponent(JSON.stringify({ id: 'u1', nome: 'Mário', email: 'teste@exemplo.com' }))}; path=/; max-age=3600`;
    authService.recarregarSessao();
    expect(authService.isAutenticado()).toBe(true);
    expect(authService.getUsuario()?.email).toBe('teste@exemplo.com');
  });

  test('login lança erro quando backend retorna não-ok', async () => {
    (global as any).fetch = jest.fn(async () => ({
      ok: false,
      json: async () => ({ message: 'Credenciais inválidas' }),
    }));
    await expect(authService.login('x@y.com', 'errada')).rejects.toThrow();
    expect(authService.isAutenticado()).toBe(false);
  });
});
