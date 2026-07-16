/**
 * Testes do serviço de autenticação (src/lib/auth.ts)
 * Valida: cadastro, login, roles de admin, persistência em localStorage/cookie
 * e propagação de estado sem necessidade de refresh.
 */
import { authService, AuthService } from '@/lib/auth';

const ADMIN = 'psi_mariojunior@hotmail.com';

function mockFetchLogin(nome: string, email: string) {
  (global as any).fetch = jest.fn(async (url: string) => {
    if (String(url).includes('/api/auth/login')) {
      return {
        ok: true,
        json: async () => ({
          data: { accessToken: 'tok_123', refreshToken: 'ref_123', usuario: { id: 'u1', nome, email } },
        }),
      };
    }
    if (String(url).includes('/api/auth/cadastrar')) {
      return {
        ok: true,
        json: async () => ({
          data: { accessToken: 'tok_123', refreshToken: 'ref_123', usuario: { id: 'u1', nome, email } },
        }),
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

  test('login persiste sessão em localStorage e cookie', async () => {
    mockFetchLogin('Mário', 'teste@exemplo.com');
    const user = await authService.login('teste@exemplo.com', 'senha123');
    expect(user.email).toBe('teste@exemplo.com');
    expect(authService.isAutenticado()).toBe(true);
    expect(localStorage.getItem('accessToken')).toBe('tok_123');
    expect(document.cookie).toContain('ssb_token=');
  });

  test('email de admin recebe role admin', async () => {
    mockFetchLogin('Admin', ADMIN);
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
    const redirectSpy = jest.spyOn(AuthService.prototype as any, 'redirecionar').mockImplementation(() => {});
    authService.loginWithGoogle();
    expect(redirectSpy).toHaveBeenCalledWith('/api/auth/google');
    redirectSpy.mockRestore();
  });

  test('logout limpa estado, storage e cookie', async () => {
    mockFetchLogin('Mário', 'teste@exemplo.com');
    await authService.login('teste@exemplo.com', 'senha123');
    expect(authService.isAutenticado()).toBe(true);
    await authService.logout();
    expect(authService.isAutenticado()).toBe(false);
    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(document.cookie).not.toContain('ssb_token=tok');
  });

  test('recarregarSessao restaura estado do localStorage', async () => {
    mockFetchLogin('Mário', 'teste@exemplo.com');
    await authService.login('teste@exemplo.com', 'senha123');
    await authService.logout();
    localStorage.setItem('accessToken', 'tok_123');
    localStorage.setItem('refreshToken', 'ref_123');
    localStorage.setItem('usuario', JSON.stringify({ id: 'u1', nome: 'Mário', email: 'teste@exemplo.com' }));
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
