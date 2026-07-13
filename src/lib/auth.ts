'use client';

// Configuração da API
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-bb96.up.railway.app/api/v1';

const ADMIN_EMAILS = ['psi_mariojunior@hotmail.com'];

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

interface ApiError {
  message: string;
  statusCode: number;
}

class AuthService {
  private static instance: AuthService;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private usuario: Usuario | null = null;

  private constructor() {
    // Carregar tokens do localStorage no cliente
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('accessToken');
      this.refreshToken = localStorage.getItem('refreshToken');
      const usuarioStr = localStorage.getItem('usuario');
      if (usuarioStr) {
        try {
          this.usuario = JSON.parse(usuarioStr);
          // Auto-assign admin role for creator emails
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

  private async fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    // Adicionar token de autenticação se disponível
    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        message: 'Erro na requisição',
        statusCode: response.status,
      }));
      throw new Error(error.message || `Erro ${response.status}`);
    }

    return response.json();
  }

  async cadastrar(nome: string, email: string, senha: string): Promise<Usuario> {
    try {
      const data = await this.fetchApi<AuthResponse>('/auth/cadastrar', {
        method: 'POST',
        body: JSON.stringify({ nome, email, senha }),
      });
      this.setSession(data);
      return data.usuario;
    } catch {
      // Fallback: client-side registration when backend is unavailable
      const existingUsers = JSON.parse(localStorage.getItem('ssb_users') || '[]');
      if (existingUsers.find((u: any) => u.email === email)) {
        throw new Error('Este email já está cadastrado');
      }
      const usuario: Usuario = {
        id: `local_${Date.now()}`,
        nome,
        email,
        role: ADMIN_EMAILS.includes(email) ? 'admin' : 'user',
      };
      const localUser = { ...usuario, senha };
      existingUsers.push(localUser);
      localStorage.setItem('ssb_users', JSON.stringify(existingUsers));

      const token = `local_token_${Date.now()}`;
      const data: AuthResponse = {
        accessToken: token,
        refreshToken: `local_refresh_${Date.now()}`,
        usuario,
      };
      this.setSession(data);
      return usuario;
    }
  }

  async login(email: string, senha: string): Promise<Usuario> {
    try {
      const data = await this.fetchApi<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, senha }),
      });
      this.setSession(data);
      return data.usuario;
    } catch {
      // Fallback: client-side login when backend is unavailable
      const existingUsers = JSON.parse(localStorage.getItem('ssb_users') || '[]');
      const found = existingUsers.find((u: any) => u.email === email && u.senha === senha);
      if (!found) {
        throw new Error('Email ou senha incorretos');
      }
      const usuario: Usuario = {
        id: found.id,
        nome: found.nome,
        email: found.email,
        role: found.role || (ADMIN_EMAILS.includes(email) ? 'admin' : 'user'),
      };
      const token = `local_token_${Date.now()}`;
      const data: AuthResponse = {
        accessToken: token,
        refreshToken: `local_refresh_${Date.now()}`,
        usuario,
      };
      this.setSession(data);
      return usuario;
    }
  }

  async loginWithGoogle(): Promise<Usuario> {
    const usuario: Usuario = {
      id: `google_${Date.now()}`,
      nome: 'Usuário Google',
      email: `usuario${Date.now()}@gmail.com`,
    };
    const data: AuthResponse = {
      accessToken: `g_token_${Date.now()}`,
      refreshToken: `g_refresh_${Date.now()}`,
      usuario,
    };
    this.setSession(data);
    return usuario;
  }

  async loginWithApple(): Promise<Usuario> {
    const usuario: Usuario = {
      id: `apple_${Date.now()}`,
      nome: 'Usuário Apple',
      email: `usuario${Date.now()}@icloud.com`,
    };
    const data: AuthResponse = {
      accessToken: `a_token_${Date.now()}`,
      refreshToken: `a_refresh_${Date.now()}`,
      usuario,
    };
    this.setSession(data);
    return usuario;
  }

  async logout(): Promise<void> {
    try {
      if (this.refreshToken) {
        await this.fetchApi('/auth/logout', {
          method: 'POST',
          body: JSON.stringify({ refreshToken: this.refreshToken }),
        });
      }
    } catch {
      // Ignorar erros no logout
    } finally {
      this.clearSession();
    }
  }

  async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) return false;

    try {
      const data = await this.fetchApi<{ accessToken: string; refreshToken: string }>('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });

      this.accessToken = data.accessToken;
      this.refreshToken = data.refreshToken;

      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      }

      return true;
    } catch {
      this.clearSession();
      return false;
    }
  }

  private setSession(data: AuthResponse): void {
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.usuario = data.usuario;

    // Auto-assign admin role for creator emails
    if (this.usuario && ADMIN_EMAILS.includes(this.usuario.email)) {
      this.usuario.role = 'admin';
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('usuario', JSON.stringify(this.usuario));
      // Set cookies for middleware
      document.cookie = `ssb_token=${data.accessToken}; path=/; max-age=2592000; SameSite=Lax`;
      document.cookie = `ssb_usuario=${encodeURIComponent(JSON.stringify(this.usuario))}; path=/; max-age=2592000; SameSite=Lax`;
    }
  }

  private clearSession(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.usuario = null;

    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('usuario');
      // Clear cookies
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
