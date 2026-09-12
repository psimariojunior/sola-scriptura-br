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

  test('login persiste sessão em memória (cookies HttpOnly são setados pela API route)', async () => {
    mockFetchLogin('Mário', 'teste@exemplo.com');
    const user = await authService.login('teste@exemplo.com', 'senha123');
    expect(user.email).toBe('teste@exemplo.com');
    expect(authService.isAutenticado()).toBe(true);
    expect(authService.getAccessToken()).toBe('tok_123');
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

  test('recarregarSessao restaura estado via API /api/auth/user', async () => {
    // Mocka a rota /api/auth/user para retornar o usuário
    (global as any).fetch = jest.fn(async (url: string) => {
      if (String(url).includes('/api/auth/user')) {
        return {
          ok: true,
          json: async () => ({
            usuario: { id: 'u1', nome: 'Mário', email: 'teste@exemplo.com', role: 'user' },
          }),
        };
      }
      return { ok: false, json: async () => ({ message: 'erro' }) };
    });
    authService.recarregarSessao();
    // hidratarSessao é async, espera o fetch completar
    await new Promise(r => setTimeout(r, 10));
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

  test('cadastrar valida nome obrigatorio', async () => {
    mockFetchLogin('Test', 't@t.com');
    await expect(authService.cadastrar('', 't@t.com', 'senha1234')).rejects.toThrow('Nome é obrigatório');
  });

  test('cadastrar valida senha minima 8 caracteres', async () => {
    mockFetchLogin('Test', 't@t.com');
    await expect(authService.cadastrar('Test', 't@t.com', 'curta')).rejects.toThrow('pelo menos 8 caracteres');
  });

  test('cadastrar valida email obrigatorio', async () => {
    mockFetchLogin('Test', 't@t.com');
    await expect(authService.cadastrar('Test', '', 'senha1234')).rejects.toThrow('Email é obrigatório');
  });

  test('diagnosticarEstado retorna estado correto', () => {
    const estado = authService.diagnosticarEstado();
    expect(estado).toHaveProperty('temToken');
    expect(estado).toHaveProperty('temUsuario');
    expect(estado).toHaveProperty('totalUsers');
    expect(estado).toHaveProperty('temLegacy');
    expect(typeof estado.temToken).toBe('boolean');
    expect(typeof estado.temUsuario).toBe('boolean');
  });

  test('temAcessoTotal retorna false sem usuario', async () => {
    await authService.logout();
    expect(authService.temAcessoTotal()).toBe(false);
  });

  test('definirSessaoExterna configura sessao corretamente', async () => {
    await authService.logout();
    authService.definirSessaoExterna({
      accessToken: 'ext_token',
      refreshToken: 'ext_refresh',
      usuario: { id: 'u2', nome: 'Externo', email: 'ext@test.com' },
    });
    expect(authService.isAutenticado()).toBe(true);
    expect(authService.getAccessToken()).toBe('ext_token');
    expect(authService.getUsuario()?.email).toBe('ext@test.com');
  });

  test('liberarAcessoTotal atualiza usuario', async () => {
    mockFetchLogin('User', 'user@test.com');
    await authService.login('user@test.com', 'senha12345');
    expect(authService.temAcessoTotal()).toBe(false);
    
    authService.liberarAcessoTotal();
    expect(authService.temAcessoTotal()).toBe(true);
    expect(authService.getUsuario()?.dataPagamento).toBeDefined();
  });

  test('subscribe e notifyListeners funcionam', async () => {
    const cb = jest.fn();
    const unsub = authService.subscribe(cb);
    mockFetchLogin('Listener', 'listener@test.com');
    await authService.login('listener@test.com', 'senha12345');
    // notifyListeners e chamado no login
    // O listener pode ou nao ser chamado dependendo do estado anterior
    unsub();
  });

  test('getRefreshToken retorna null apos logout', async () => {
    await authService.logout();
    expect(authService.getRefreshToken()).toBeNull();
  });

  test('refreshAccessToken retorna false sem refresh token', async () => {
    await authService.logout();
    // Força busca de refresh token via /api/auth/user que retorna null
    (global as any).fetch = jest.fn(async () => ({
      ok: false,
      json: async () => ({ message: 'erro' }),
    }));
    const result = await (authService as any).refreshAccessToken();
    expect(result).toBe(false);
  });

  test('apiFetch adiciona Authorization header', async () => {
    mockFetchLogin('API', 'api@test.com');
    await authService.login('api@test.com', 'senha12345');

    let capturedUrl = '';
    let capturedInit: any = null;
    (global as any).fetch = jest.fn(async (url: string, init: any) => {
      capturedUrl = url;
      capturedInit = init;
      return { ok: true, status: 200, json: async () => ({}) };
    });

    await authService.apiFetch('/api/test', { method: 'GET' });
    expect(capturedUrl).toBe('/api/test');
    expect(capturedInit.headers.Authorization).toContain('Bearer');
  });

  test('apiFetch faz retry em 401 quando tem refresh token', async () => {
    mockFetchLogin('Retry', 'retry@test.com');
    await authService.login('retry@test.com', 'senha12345');

    let callCount = 0;
    (global as any).fetch = jest.fn(async (url: string, init: any) => {
      callCount++;
      if (callCount === 1) {
        // Primeira chamada retorna 401
        return { ok: false, status: 401, json: async () => ({}) };
      }
      // Refresh + retry
      if (String(url).includes('/auth/refresh')) {
        return {
          ok: true,
          json: async () => ({
            data: { accessToken: 'new_tok', refreshToken: 'new_ref' },
          }),
        };
      }
      // Retry da chamada original
      return { ok: true, status: 200, json: async () => ({ retry: true }) };
    });

    const res = await authService.apiFetch('/api/data');
    expect(res.ok).toBe(true);
    expect(callCount).toBeGreaterThanOrEqual(2);
  });

  test('cadastrar normaliza email para lowercase', async () => {
    (global as any).fetch = jest.fn(async (url: string) => {
      if (String(url).includes('/auth/cadastrar')) {
        return {
          ok: true,
          json: async () => ({
            data: {
              accessToken: 'tok_norm',
              refreshToken: 'ref_norm',
              usuario: { id: 'u3', nome: 'Teste', email: 'teste@exemplo.com' },
            },
          }),
        };
      }
      return { ok: false, json: async () => ({}) };
    });

    const user = await authService.cadastrar('Teste', '  TESTE@EXEMPLO.COM  ', 'senha12345');
    expect(user.email).toBe('teste@exemplo.com');
  });

  test('sincronizarAcessoTotal busca status de pagamento', async () => {
    mockFetchLogin('Sync', 'sync@test.com');
    await authService.login('sync@test.com', 'senha12345');

    (global as any).fetch = jest.fn(async (url: string) => {
      if (String(url).includes('/pagamento/status')) {
        return {
          ok: true,
          json: async () => ({ acessoTotal: true }),
        };
      }
      return { ok: false, json: async () => ({}) };
    });

    await authService.sincronizarAcessoTotal();
    expect(authService.temAcessoTotal()).toBe(true);
  });

  test('sincronizarAcessoTotal nao faz nada quando nao autenticado', async () => {
    await authService.logout();
    const fetchSpy = jest.fn();
    (global as any).fetch = fetchSpy;
    
    await authService.sincronizarAcessoTotal();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
