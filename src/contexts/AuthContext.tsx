'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { authService, Usuario } from '@/lib/auth';

interface AuthContextType {
  usuario: Usuario | null;
  isAutenticado: boolean;
  isAdmin: boolean;
  login: (email: string, senha: string) => Promise<Usuario>;
  cadastrar: (nome: string, email: string, senha: string) => Promise<Usuario>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<Usuario>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isAutenticado, setIsAutenticado] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = authService.getUsuario();
    if (user) {
      setUsuario(user);
      setIsAutenticado(true);
      setIsAdmin(authService.isAdmin());
    }
  }, []);

  const login = useCallback(async (email: string, senha: string) => {
    const user = await authService.login(email, senha);
    setUsuario(user);
    setIsAutenticado(true);
    setIsAdmin(authService.isAdmin());
    return user;
  }, []);

  const cadastrar = useCallback(async (nome: string, email: string, senha: string) => {
    const user = await authService.cadastrar(nome, email, senha);
    setUsuario(user);
    setIsAutenticado(true);
    setIsAdmin(authService.isAdmin());
    return user;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUsuario(null);
    setIsAutenticado(false);
    setIsAdmin(false);
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const user = await authService.loginWithGoogle();
    setUsuario(user);
    setIsAutenticado(true);
    setIsAdmin(authService.isAdmin());
    return user;
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, isAutenticado, isAdmin, login, cadastrar, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      usuario: null,
      isAutenticado: false,
      isAdmin: false,
      login: async () => { throw new Error('AuthProvider not mounted'); },
      cadastrar: async () => { throw new Error('AuthProvider not mounted'); },
      logout: async () => {},
      loginWithGoogle: async () => { throw new Error('AuthProvider not mounted'); },
    };
  }
  return context;
}
