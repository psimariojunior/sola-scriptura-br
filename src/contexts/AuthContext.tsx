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
  loginWithApple: () => Promise<Usuario>;
  recarregarSessao: () => void;
  migrarContas: () => boolean;
  diagnosticar: () => { temToken: boolean; temUsuario: boolean; totalUsers: number; temLegacy: boolean };
}

const AuthContext = createContext<AuthContextType | null>(null);

function snapshot(): { usuario: Usuario | null; isAutenticado: boolean; isAdmin: boolean } {
  const usuario = authService.getUsuario();
  return {
    usuario,
    isAutenticado: authService.isAutenticado(),
    isAdmin: authService.isAdmin(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isAutenticado, setIsAutenticado] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const syncState = useCallback(() => {
    const snap = snapshot();
    setUsuario(snap.usuario);
    setIsAutenticado(snap.isAutenticado);
    setIsAdmin(snap.isAdmin);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    authService.migrarManualmente();
    syncState();
  }, [syncState]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const unsub = authService.subscribe(() => {
      syncState();
    });
    return unsub;
  }, [syncState]);

  const login = useCallback(async (email: string, senha: string) => {
    const user = await authService.login(email, senha);
    syncState();
    return user;
  }, [syncState]);

  const cadastrar = useCallback(async (nome: string, email: string, senha: string) => {
    const user = await authService.cadastrar(nome, email, senha);
    syncState();
    return user;
  }, [syncState]);

  const logout = useCallback(async () => {
    await authService.logout();
    syncState();
  }, [syncState]);

  const loginWithGoogle = useCallback(async () => {
    const user = await authService.loginWithGoogle();
    syncState();
    return user;
  }, [syncState]);

  const loginWithApple = useCallback(async () => {
    const user = await authService.loginWithApple();
    syncState();
    return user;
  }, [syncState]);

  const recarregarSessao = useCallback(() => {
    authService.recarregarSessao();
    syncState();
  }, [syncState]);

  const migrarContas = useCallback(() => {
    return authService.migrarManualmente();
  }, []);

  const diagnosticar = useCallback(() => {
    return authService.diagnosticarEstado();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isAutenticado,
        isAdmin,
        login,
        cadastrar,
        logout,
        loginWithGoogle,
        loginWithApple,
        recarregarSessao,
        migrarContas,
        diagnosticar,
      }}
    >
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
      loginWithApple: async () => { throw new Error('AuthProvider not mounted'); },
      recarregarSessao: () => {},
      migrarContas: () => false,
      diagnosticar: () => ({ temToken: false, temUsuario: false, totalUsers: 0, temLegacy: false }),
    };
  }
  return context;
}
