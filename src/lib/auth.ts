'use client';

const USERS_KEY = 'ssb_users';
const TOKEN_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';
const USER_KEY = 'usuario';

const LEGACY_KEYS = {
  users: ['ssb_users_v1', 'sola_users', 'users', 'auth_users', 'ssb_accounts'],
  token: ['accessToken', 'auth_token', 'ssb_token', 'token', 'jwt'],
  refresh: ['refreshToken', 'refresh_token', 'ssb_refresh'],
  user: ['usuario', 'user', 'currentUser', 'ssb_user', 'ssb_usuario'],
};

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

type StoredUser = Usuario & { senha?: string; password?: string; name?: string };

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

function makeUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function makeToken(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function readLegacyUsers(): StoredUser[] {
  if (typeof window === 'undefined') return [];
  for (const key of LEGACY_KEYS.users) {
    const parsed = readJSON<StoredUser[] | { users: StoredUser[] }>(localStorage.getItem(key));
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray((parsed as { users: StoredUser[] }).users)) {
      return (parsed as { users: StoredUser[] }).users;
    }
  }
  return [];
}

function readLegacySession(): { token: string | null; refresh: string | null; usuario: Usuario | null } {
  if (typeof window === 'undefined') return { token: null, refresh: null, usuario: null };
  let token: string | null = null;
  let refresh: string | null = null;
  let usuario: Usuario | null = null;

  for (const key of LEGACY_KEYS.token) {
    const v = localStorage.getItem(key);
    if (v) { token = v; break; }
  }
  for (const key of LEGACY_KEYS.refresh) {
    const v = localStorage.getItem(key);
    if (v) { refresh = v; break; }
  }
  for (const key of LEGACY_KEYS.user) {
    const parsed = readJSON<Usuario>(localStorage.getItem(key));
    if (parsed && parsed.email) { usuario = parsed; break; }
  }

  return { token, refresh, usuario };
}

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || 'psi_mariojunior@hotmail.com')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

function aplicarRole(usuario: Usuario): Usuario {
  if (!usuario) return usuario;
  const isAdmin = usuario.role === 'admin' || ADMIN_EMAILS.includes(usuario.email.trim().toLowerCase());
  return { ...usuario, role: isAdmin ? 'admin' : 'user' };
}

class AuthService {
  private static instance: AuthService;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private usuario: Usuario | null = null;
  private listeners: Set<() => void> = new Set();
  private migrated = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.loadFromStorage();
    }
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;

    this.migrarContasAntigas();

    this.accessToken = localStorage.getItem(TOKEN_KEY);
    this.refreshToken = localStorage.getItem(REFRESH_KEY);
    const usuarioStr = localStorage.getItem(USER_KEY);
    if (usuarioStr) {
      const parsed = readJSON<Usuario>(usuarioStr);
      if (parsed && parsed.email) {
        this.usuario = aplicarRole(parsed);
      }
    }

    // Ensure cookies exist from localStorage (recreate if missing)
    if (this.accessToken && this.usuario) {
      const existingToken = document.cookie.split(';').some(c => c.trim().startsWith('ssb_token='));
      if (!existingToken) {
        this.setCookie('ssb_token', this.accessToken);
        this.setCookie('ssb_usuario', JSON.stringify(this.usuario));
      }
    }
  }

  private getUsers(): StoredUser[] {
    if (typeof window === 'undefined') return [];
    const parsed = readJSON<StoredUser[]>(localStorage.getItem(USERS_KEY));
    return Array.isArray(parsed) ? parsed : [];
  }

  private saveUsers(users: StoredUser[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  private migrarContasAntigas(): void {
    if (typeof window === 'undefined') return;
    if (this.migrated) return;
    this.migrated = true;

    try {
      const currentUsers = this.getUsers();
      const legacyUsers = readLegacyUsers();

      if (legacyUsers.length > 0) {
        const emailsAtuais = new Set(currentUsers.map((u) => normalizeEmail(u.email)));
        const usersMigrados: StoredUser[] = [...currentUsers];

        for (const legacy of legacyUsers) {
          if (!legacy || !legacy.email) continue;
          const emailNorm = normalizeEmail(legacy.email);
          if (emailsAtuais.has(emailNorm)) continue;
          const senha = legacy.senha || legacy.password || '';
          const id = legacy.id || makeUserId();
          usersMigrados.push({
            id,
            nome: legacy.nome || legacy.name || legacy.email.split('@')[0],
            email: legacy.email,
            role: legacy.role || 'user',
            senha,
          });
          emailsAtuais.add(emailNorm);
        }

        if (usersMigrados.length > currentUsers.length) {
          this.saveUsers(usersMigrados);
        }
      }

      const hasCurrentSession = !!localStorage.getItem(TOKEN_KEY) && !!localStorage.getItem(USER_KEY);
      if (!hasCurrentSession) {
        const { token, refresh, usuario } = readLegacySession();
        if (token && usuario && usuario.email) {
          this.accessToken = token;
          this.refreshToken = refresh;
          this.usuario = aplicarRole(usuario);
          this.setSession({
            accessToken: token,
            refreshToken: refresh || makeToken('refresh'),
            usuario: this.usuario,
          });
        }
      }

      for (const key of LEGACY_KEYS.users) {
        if (key !== USERS_KEY) localStorage.removeItem(key);
      }
    } catch {
      // Falha silenciosa - migração não pode quebrar o app
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

    const res = await fetch('https://api.solascripturabr.com.br/api/v1/auth/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: nomeLimpo, email: emailNorm, senha: senhaLimpa }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Erro ao cadastrar');
    }

    const result = data.data || data;

    this.setSession({
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      usuario: result.usuario,
    });

    return result.usuario;
  }

  async login(email: string, senha: string): Promise<Usuario> {
    if (typeof window === 'undefined') {
      throw new Error('Login indisponível no servidor');
    }

    const emailNorm = normalizeEmail(email);
    const senhaLimpa = senha || '';

    const res = await fetch('https://api.solascripturabr.com.br/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailNorm, senha: senhaLimpa }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Email ou senha incorretos');
    }

    const result = data.data || data;
    const usuario: Usuario = aplicarRole(result.usuario);

    this.setSession({
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      usuario,
    });

    return usuario;
  }

  async loginWithGoogle(): Promise<Usuario> {
    if (typeof window === 'undefined') {
      throw new Error('Login indisponível no servidor');
    }
    window.location.href = 'https://api.solascripturabr.com.br/api/v1/auth/google';
    return new Promise<Usuario>(() => {});
  }

  async loginWithApple(): Promise<Usuario> {
    if (typeof window === 'undefined') {
      throw new Error('Login indisponível no servidor');
    }
    this.redirecionar('/api/auth/apple');
    return new Promise<Usuario>(() => {});
  }

  // Isolado para permitir spy em testes e evitar acesso direto a window.location.
  protected redirecionar(url: string): void {
    if (typeof window !== 'undefined') {
      window.location.assign(url);
    }
  }

  async logout(): Promise<void> {
    this.clearSession();
  }

  async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) return false;
    try {
      const res = await fetch('https://api.solascripturabr.com.br/api/v1/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      if (data.accessToken) {
        const result = data.data || data;
        this.setSession({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken || this.refreshToken,
          usuario: result.usuario || this.usuario,
        });
        return true;
      }
    } catch { /* ignore */ }
    return false;
  }

  async apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const token = this.getAccessToken();
    const headers = { ...options.headers, Authorization: `Bearer ${token}` };
    let res = await fetch(url, { ...options, headers });

    if (res.status === 401 && this.refreshToken) {
      const refreshed = await this.refreshAccessToken();
      if (refreshed) {
        const newToken = this.getAccessToken();
        const retryHeaders = { ...options.headers, Authorization: `Bearer ${newToken}` };
        res = await fetch(url, { ...options, headers: retryHeaders });
      }
    }

    return res;
  }

  private setSession(data: AuthResponse): void {
    const usuario = aplicarRole(data.usuario);

    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.usuario = usuario;

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(TOKEN_KEY, data.accessToken);
        localStorage.setItem(REFRESH_KEY, data.refreshToken);
        localStorage.setItem(USER_KEY, JSON.stringify(usuario));
      } catch { /* ignore */ }
      this.setCookie('ssb_token', data.accessToken);
      this.setCookie('ssb_usuario', JSON.stringify(usuario));
    }

    this.notifyListeners();
  }

  private setCookie(name: string, value: string): void {
    try {
      const expirar = 60 * 60 * 24 * 30;
      const secure = typeof window !== 'undefined' && window.location.protocol === 'https:';
      const secureFlag = secure ? '; Secure' : '';
      document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${expirar}; SameSite=None${secureFlag}`;
    } catch { /* ignore */ }
  }

  private clearSession(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.usuario = null;

    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_KEY);
        localStorage.removeItem(USER_KEY);
      } catch { /* ignore */ }
      try {
        document.cookie = 'ssb_token=; path=/; max-age=0';
        document.cookie = 'ssb_usuario=; path=/; max-age=0';
      } catch { /* ignore */ }
    }

    this.notifyListeners();
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
    return !!this.accessToken && !!this.usuario;
  }

  isAdmin(): boolean {
    if (!this.usuario) return false;
    return this.usuario.role === 'admin';
  }

  temAcessoTotal(): boolean {
    return !!this.usuario?.acessoTotal;
  }

  // Confirma o "Acesso Total" real no servidor (Supabase) e, se confirmado,
  // persiste a flag no localStorage para atualizar a UI instantaneamente.
  // O localStorage continua sendo o cache de UX; o servidor e' a fonte de verdade.
  // Em caso de falha de rede/offline, mantem o valor atual do localStorage.
  async sincronizarAcessoTotal(): Promise<void> {
    if (typeof window === 'undefined') return;
    if (!this.isAutenticado()) return;

    const email = this.usuario?.email;
    if (!email) return;

    try {
      const res = await fetch(
        '/api/pagamento/status?email=' + encodeURIComponent(email),
        { method: 'GET', headers: { 'Content-Type': 'application/json' } },
      );
      if (!res.ok) return;
      const data = await res.json();
      if (data && data.acessoTotal === true) {
        if (!this.usuario?.acessoTotal) {
          this.liberarAcessoTotal();
        }
      }
    } catch {
      // Offline/rede indisponivel: mantem o valor do localStorage.
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
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(usuarioAtualizado));
      this.setCookie('ssb_usuario', JSON.stringify(usuarioAtualizado));
    } catch { /* ignore */ }
    this.notifyListeners();
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  getRefreshToken(): string | null {
    return this.refreshToken;
  }

  recarregarSessao(): void {
    if (typeof window === 'undefined') return;
    this.migrarContasAntigas();
    this.accessToken = localStorage.getItem(TOKEN_KEY);
    this.refreshToken = localStorage.getItem(REFRESH_KEY);
    const usuarioStr = localStorage.getItem(USER_KEY);
    if (usuarioStr) {
      const parsed = readJSON<Usuario>(usuarioStr);
      this.usuario = parsed && parsed.email ? aplicarRole(parsed) : null;
    } else {
      this.usuario = null;
    }
    this.notifyListeners();
  }

  definirSessaoExterna(data: AuthResponse): void {
    if (typeof window === 'undefined') return;
    this.setSession(data);
  }

  migrarManualmente(): boolean {
    if (typeof window === 'undefined') return false;
    this.migrated = false;
    this.migrarContasAntigas();
    this.recarregarSessao();
    return this.isAutenticado();
  }

  listarUsuariosCadastrados(): number {
    return this.getUsers().length;
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
    const totalUsers = this.getUsers().length;
    const temLegacy =
      LEGACY_KEYS.users.some((k) => !!localStorage.getItem(k) && k !== USERS_KEY) ||
      LEGACY_KEYS.token.some((k) => !!localStorage.getItem(k) && k !== TOKEN_KEY) ||
      LEGACY_KEYS.user.some((k) => !!localStorage.getItem(k) && k !== USER_KEY);
    return {
      temToken: !!localStorage.getItem(TOKEN_KEY),
      temUsuario: !!localStorage.getItem(USER_KEY),
      totalUsers,
      temLegacy,
    };
  }
}

export const authService = AuthService.getInstance();
export { AuthService };
export type { Usuario, AuthResponse };
