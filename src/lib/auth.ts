'use client';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  role?: 'admin' | 'user';
  acessoTotal?: boolean;
  dataPagamento?: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  usuario: Usuario;
}

function readJSON<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function normalizeEmail(email: string): string {
  return (email || '').trim().toLowerCase();
}

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

function aplicarRole(usuario: Usuario): Usuario {
  if (!usuario) return usuario;
  const isAdmin = usuario.role === 'admin' || ADMIN_EMAILS.includes(usuario.email.trim().toLowerCase());
  return { ...usuario, role: isAdmin ? 'admin' : 'user' };
}

/**
 * Le valor de um cookie pelo nome (acessa cookies NAO-HttpOnly).
 * Para cookies HttpOnly, use a rota /api/auth/user.
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.split(';').find((c) => c.trim().startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=').slice(1).join('=')) : null;
}

class AuthService {
  private static instance: AuthService;
  private accessToken: string | null = null;
  private refreshTokenValue: string | null = null;
  private usuario: Usuario | null = null;
  private listeners: Set<() => void> = new Set();
  private initialized = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.initFromCookies();
    }
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Inicializa estado a partir de cookies na primeira visita.
   * Le o cookie ssb_usuario (nao-HttpOnly) para info do UI.
   * O token de acesso so e necessario em memoria apos login/refresh.
   */
  private initFromCookies(): void {
    if (typeof window === 'undefined' || this.initialized) return;
    this.initialized = true;

    const usuarioStr = getCookie('ssb_usuario');
    if (usuarioStr) {
      const parsed = readJSON<Usuario>(usuarioStr);
      if (parsed && parsed.email) {
        this.usuario = aplicarRole(parsed);
      }
    }
  }

  async cadastrar(nome: string, email: string, senha: string): Promise<Usuario> {
    if (typeof window === 'undefined') {
      throw new Error('Cadastro indisponível no servidor');
    }

    const emailNorm = normalizeEmail(email);
    const nomeLimpo = (nome || '').trim();
    const senhaLimpa = senha || '';

    if (!emailNorm) throw new Error('Email é obrigatório');
    if (!nomeLimpo) throw new Error('Nome é obrigatório');
    if (senhaLimpa.length < 8) throw new Error('A senha deve ter pelo menos 8 caracteres');

    const res = await fetch('/api/auth/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: nomeLimpo, email: emailNorm, senha: senhaLimpa }),
      signal: AbortSignal.timeout(15000),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Erro ao cadastrar');
    }

    const result = data.data || data;

    // API route ja setou cookies HttpOnly; armazena token em memoria
    this.accessToken = result.accessToken || null;
    this.refreshTokenValue = result.refreshToken || null;
    this.usuario = aplicarRole(result.usuario);

    this.notifyListeners();
    return this.usuario!;
  }

  async login(email: string, senha: string): Promise<Usuario> {
    if (typeof window === 'undefined') {
      throw new Error('Login indisponível no servidor');
    }

    const emailNorm = normalizeEmail(email);
    const senhaLimpa = senha || '';

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailNorm, senha: senhaLimpa }),
      signal: AbortSignal.timeout(15000),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Email ou senha incorretos');
    }

    const result = data.data || data;
    const usuario: Usuario = aplicarRole(result.usuario);

    // API route ja setou cookies HttpOnly; armazena token em memoria
    this.accessToken = result.accessToken || null;
    this.refreshTokenValue = result.refreshToken || null;
    this.usuario = usuario;

    this.notifyListeners();
    return usuario;
  }

  async loginWithGoogle(): Promise<Usuario> {
    if (typeof window === 'undefined') {
      throw new Error('Login indisponivel no servidor');
    }
    window.location.href = 'https://api.solascripturabr.com.br/api/v1/auth/google';
    return new Promise<Usuario>((_, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Redirecionamento interrompido. Tente novamente.'));
      }, 10000);
      window.addEventListener('beforeunload', () => clearTimeout(timeout));
    });
  }

  async loginWithApple(): Promise<Usuario> {
    if (typeof window === 'undefined') {
      throw new Error('Login indisponivel no servidor');
    }
    this.redirecionar('/api/auth/apple');
    return new Promise<Usuario>((_, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Redirecionamento interrompido. Tente novamente.'));
      }, 10000);
      window.addEventListener('beforeunload', () => clearTimeout(timeout));
    });
  }

  protected redirecionar(url: string): void {
    if (typeof window !== 'undefined') {
      window.location.assign(url);
    }
  }

  async logout(): Promise<void> {
    this.accessToken = null;
    this.refreshTokenValue = null;
    this.usuario = null;

    if (typeof window !== 'undefined') {
      // Limpa cookies via API route (HttpOnly)
      const cookiesToClear = ['ssb_token', 'ssb_usuario', 'ssb_refresh'];
      await Promise.allSettled(
        cookiesToClear.map((name) =>
          fetch('/api/auth/cookie/clear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
          }).catch(() => {
            // Fallback: limpa cookie acessivel via document.cookie
            document.cookie = `${name}=; path=/; max-age=0`;
          })
        )
      );
    }

    this.notifyListeners();
  }

  async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshTokenValue) {
      // Tenta ler refresh token do cookie HttpOnly via API
      try {
        const cookieRes = await fetch('/api/auth/user');
        if (!cookieRes.ok) return false;
        // Nao temos acesso ao refresh token HttpOnly no client
        return false;
      } catch {
        return false;
      }
    }

    try {
      const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: this.refreshTokenValue }),
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) return false;
      const data = await res.json();
      const result = data.data || data;
      if (result.accessToken) {
        this.accessToken = result.accessToken;
        this.refreshTokenValue = result.refreshToken || this.refreshTokenValue;
        if (result.usuario) {
          this.usuario = aplicarRole(result.usuario);
        }
        this.notifyListeners();
        return true;
      }
    } catch { /* ignore */ }
    return false;
  }

  async apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const token = this.getAccessToken();
    const headers = { ...options.headers, Authorization: `Bearer ${token}` };
    let res = await fetch(url, { ...options, headers });

    if (res.status === 401 && this.refreshTokenValue) {
      const refreshed = await this.refreshAccessToken();
      if (refreshed) {
        const newToken = this.getAccessToken();
        const retryHeaders = { ...options.headers, Authorization: `Bearer ${newToken}` };
        res = await fetch(url, { ...options, headers: retryHeaders });
      }
    }

    return res;
  }

  subscribe(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notifyListeners(): void {
    for (const cb of this.listeners) {
      try { cb(); } catch { /* ignore */ }
    }
  }

  getUsuario(): Usuario | null {
    return this.usuario;
  }

  isAutenticado(): boolean {
    return !!this.usuario;
  }

  isAdmin(): boolean {
    if (!this.usuario) return false;
    return this.usuario.role === 'admin';
  }

  temAcessoTotal(): boolean {
    return !!this.usuario?.acessoTotal;
  }

  async sincronizarAcessoTotal(): Promise<void> {
    if (typeof window === 'undefined') return;
    if (!this.isAutenticado()) return;

    const email = this.usuario?.email;
    if (!email) return;

    try {
    const res = await fetch('/api/pagamento/status', {
      method: 'GET',
      credentials: 'include',
    });
      if (!res.ok) return;
      const data = await res.json();
      if (data && data.acessoTotal === true) {
        if (!this.usuario?.acessoTotal) {
          this.liberarAcessoTotal();
        }
      }
    } catch {
      // Offline/rede indisponivel: mantem o valor atual
    }
  }

  liberarAcessoTotal(): void {
    if (typeof window === 'undefined') return;
    if (!this.usuario) return;
    const usuarioAtualizado: Usuario = {
      ...this.usuario,
      acessoTotal: true,
      dataPagamento: new Date().toISOString(),
    };
    this.usuario = usuarioAtualizado;
    // Atualiza cookie de usuario (nao-HttpOnly para leitura no client)
    try {
      const expirar = 60 * 60 * 24 * 30;
      const secure = window.location.protocol === 'https:';
      document.cookie = `ssb_usuario=${encodeURIComponent(JSON.stringify(usuarioAtualizado))}; path=/; max-age=${expirar}; SameSite=Lax${secure ? '; Secure' : ''}`;
    } catch { /* ignore */ }
    this.notifyListeners();
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  getRefreshToken(): string | null {
    return this.refreshTokenValue;
  }

  /**
   * Restaura o usuário a partir dos cookies HttpOnly (via API).
   */
  async hidratarSessao(): Promise<void> {
    if (typeof window === 'undefined') return;
    try {
      const res = await fetch('/api/auth/user', { credentials: 'include', cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      if (data?.usuario?.email) {
        this.usuario = aplicarRole(data.usuario);
        this.notifyListeners();
      }
    } catch {
      /* rede/offline: mantém estado atual */
    }
  }

  /**
   * Recarrega sessao a partir dos cookies (util para mudancas em outra aba).
   */
  recarregarSessao(): void {
    void this.hidratarSessao();
  }

  /**
   * Define sessao a partir de dados externos (ex: OAuth callback).
   * Os cookies HttpOnly devem ser setados pela API route correspondente.
   */
  definirSessaoExterna(data: AuthResponse): void {
    if (typeof window === 'undefined') return;
    this.accessToken = data.accessToken || null;
    this.refreshTokenValue = data.refreshToken || null;
    this.usuario = data.usuario ? aplicarRole(data.usuario) : null;
    this.notifyListeners();
  }

  /**
   * Sessao do OAuth: chama API para setar cookies HttpOnly e armazena em memoria.
   */
  async definirSessaoOAuth(data: AuthResponse): Promise<void> {
    if (typeof window === 'undefined') return;
    try {
      await fetch('/api/auth/oauth/set-cookies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch { /* ignore */ }
    this.definirSessaoExterna(data);
  }

  diagnosticarEstado(): {
    temToken: boolean;
    temUsuario: boolean;
    totalUsers: number;
    temLegacy: boolean;
  } {
    if (typeof window === 'undefined') {
      return { temToken: false, temUsuario: false, totalUsers: 0, temLegacy: false };
    }
    return {
      temToken: !!this.accessToken,
      temUsuario: !!this.usuario,
      totalUsers: 0,
      temLegacy: false,
    };
  }
}

export const authService = AuthService.getInstance();
export { AuthService };
export type { Usuario, AuthResponse };
