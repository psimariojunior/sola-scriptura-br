'use client';

const ADMIN_EMAILS = ['psi_mariojunior@hotmail.com'];
const USERS_KEY = 'ssb_users';
const TOKEN_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';
const USER_KEY = 'usuario';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  role?: 'admin' | 'user';
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  usuario: Usuario;
}

class AuthService {
  private static instance: AuthService;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private usuario: Usuario | null = null;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem(TOKEN_KEY);
      this.refreshToken = localStorage.getItem(REFRESH_KEY);
      const usuarioStr = localStorage.getItem(USER_KEY);
      if (usuarioStr) {
        try {
          this.usuario = JSON.parse(usuarioStr);
          if (this.usuario && ADMIN_EMAILS.includes(this.usuario.email)) {
            this.usuario.role = 'admin';
          }
        } catch {
          this.usuario = null;
        }
      }
    }
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private getUsers(): Array<Usuario & { senha: string }> {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  }

  private saveUsers(users: Array<Usuario & { senha: string }>): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  async cadastrar(nome: string, email: string, senha: string): Promise<Usuario> {
    const existingUsers = this.getUsers();
    if (existingUsers.find((u) => u.email === email)) {
      throw new Error('Este email já está cadastrado');
    }

    const usuario: Usuario = {
      id: `user_${Date.now()}`,
      nome,
      email,
      role: ADMIN_EMAILS.includes(email) ? 'admin' : 'user',
    };

    existingUsers.push({ ...usuario, senha });
    this.saveUsers(existingUsers);

    this.setSession({
      accessToken: `token_${Date.now()}`,
      refreshToken: `refresh_${Date.now()}`,
      usuario,
    });

    return usuario;
  }

  async login(email: string, senha: string): Promise<Usuario> {
    const existingUsers = this.getUsers();
    const found = existingUsers.find((u) => u.email === email && u.senha === senha);
    if (!found) {
      throw new Error('Email ou senha incorretos');
    }

    const usuario: Usuario = {
      id: found.id,
      nome: found.nome,
      email: found.email,
      role: found.role || (ADMIN_EMAILS.includes(email) ? 'admin' : 'user'),
    };

    this.setSession({
      accessToken: `token_${Date.now()}`,
      refreshToken: `refresh_${Date.now()}`,
      usuario,
    });

    return usuario;
  }

  async loginWithGoogle(): Promise<Usuario> {
    const usuario: Usuario = {
      id: `google_${Date.now()}`,
      nome: 'Usuário Google',
      email: `usuario${Date.now()}@gmail.com`,
    };
    this.setSession({
      accessToken: `g_token_${Date.now()}`,
      refreshToken: `g_refresh_${Date.now()}`,
      usuario,
    });
    return usuario;
  }

  async loginWithApple(): Promise<Usuario> {
    const usuario: Usuario = {
      id: `apple_${Date.now()}`,
      nome: 'Usuário Apple',
      email: `usuario${Date.now()}@icloud.com`,
    };
    this.setSession({
      accessToken: `a_token_${Date.now()}`,
      refreshToken: `a_refresh_${Date.now()}`,
      usuario,
    });
    return usuario;
  }

  async logout(): Promise<void> {
    this.clearSession();
  }

  private setSession(data: AuthResponse): void {
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.usuario = data.usuario;

    if (this.usuario && ADMIN_EMAILS.includes(this.usuario.email)) {
      this.usuario.role = 'admin';
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, data.accessToken);
      localStorage.setItem(REFRESH_KEY, data.refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(this.usuario));
      document.cookie = `ssb_token=${data.accessToken}; path=/; max-age=2592000; SameSite=Lax`;
      document.cookie = `ssb_usuario=${encodeURIComponent(JSON.stringify(this.usuario))}; path=/; max-age=2592000; SameSite=Lax`;
    }
  }

  private clearSession(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.usuario = null;

    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem(USER_KEY);
      document.cookie = 'ssb_token=; path=/; max-age=0';
      document.cookie = 'ssb_usuario=; path=/; max-age=0';
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
    return ADMIN_EMAILS.includes(this.usuario.email) || this.usuario.role === 'admin';
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }
}

export const authService = AuthService.getInstance();
export type { Usuario, AuthResponse };
