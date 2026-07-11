'use client';

import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from 'react';

export type TemaNome = 'escuro' | 'sepia' | 'noturno';

export interface TemaConfig {
  nome: TemaNome;
  label: string;
  icone: string;
  vars: Record<string, string>;
}

const TEMAS: Record<TemaNome, TemaConfig> = {
  escuro: {
    nome: 'escuro',
    label: 'Escuro',
    icone: '🌙',
    vars: {
      '--bg': '#0f0d0a',
      '--fg': '#ede5d8',
      '--muted-fg': '#b0a494',
      '--card-bg': '#1c1814',
      '--card-border': '#3a3228',
      '--border': '#3a3228',
      '--primary': '#d4b87a',
      '--primary-light': '#e0c88a',
      '--accent': '#d4a060',
    },
  },
  sepia: {
    nome: 'sepia',
    label: 'Sépia',
    icone: '📜',
    vars: {
      '--bg': '#f5f0e8',
      '--fg': '#3d2e1e',
      '--muted-fg': '#8a7a68',
      '--card-bg': '#faf5ed',
      '--card-border': '#e0d5c5',
      '--border': '#e0d5c5',
      '--primary': '#8b6f45',
      '--primary-light': '#a88b5e',
      '--accent': '#7a5e3a',
    },
  },
  noturno: {
    nome: 'noturno',
    label: 'Noturno',
    icone: '🌃',
    vars: {
      '--bg': '#0a0a0a',
      '--fg': '#f0f0f0',
      '--muted-fg': '#a0a0a0',
      '--card-bg': '#141414',
      '--card-border': '#2a2a2a',
      '--border': '#2a2a2a',
      '--primary': '#d4b87a',
      '--primary-light': '#e0c88a',
      '--accent': '#b89a5e',
    },
  },
};

const STORAGE_KEY = 'ssb_theme';

function aplicarVars(vars: Record<string, string>) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }
}

interface TemaContextType {
  tema: TemaNome;
  setTema: (tema: TemaNome) => void;
  temaAtual: TemaConfig;
  temasDisponiveis: TemaConfig[];
}

const TemaContext = createContext<TemaContextType>({
  tema: 'escuro',
  setTema: () => {},
  temaAtual: TEMAS.escuro,
  temasDisponiveis: Object.values(TEMAS),
});

export function useTema() {
  return useContext(TemaContext);
}

export function TemaProvider({ children }: { children: ReactNode }) {
  const [tema, setTemaState] = useState<TemaNome>('escuro');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as TemaNome | null;
    const initial = saved && TEMAS[saved] ? saved : 'escuro';
    setTemaState(initial);
    aplicarVars(TEMAS[initial].vars);
    setMounted(true);
  }, []);

  const setTema = useCallback((novo: TemaNome) => {
    setTemaState(novo);
    localStorage.setItem(STORAGE_KEY, novo);
    aplicarVars(TEMAS[novo].vars);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <TemaContext.Provider value={{ tema, setTema, temaAtual: TEMAS[tema], temasDisponiveis: Object.values(TEMAS) }}>
      {children}
    </TemaContext.Provider>
  );
}

export { TEMAS };
