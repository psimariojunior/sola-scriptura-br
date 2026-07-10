'use client';

// Configuração da API
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-bb96.up.railway.app/api/v1';

interface Usuario {
  id: string;
  nome: string;
  email: string;
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
    const data = await this.fetchApi<AuthResponse>('/auth/cadastrar', {
      method: 'POST',
      body: JSON.stringify({ nome, email, senha }),
    });

    this.setSession(data);
    return data.usuario;
  }

  async login(email: string, senha: string): Promise<Usuario> {
    const data = await this.fetchApi<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    });

    this.setSession(data);
    return data.usuario;
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

    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
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
    }
  }

  getUsuario(): Usuario | null {
    return this.usuario;
  }

  isAutenticado(): boolean {
    return !!this.accessToken && !!this.usuario;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }
}

export const authService = AuthService.getInstance();
export type { Usuario, AuthResponse };
