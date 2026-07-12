'use client';

import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from 'react';

export type TemaNome = 'light' | 'escuro' | 'sepia' | 'noturno';

export interface TemaConfig {
  nome: TemaNome;
  label: string;
  icone: string;
}

const TEMAS: Record<TemaNome, TemaConfig> = {
  light: {
    nome: 'light',
    label: 'Claro',
    icone: '☀️',
  },
  escuro: {
    nome: 'escuro',
    label: 'Escuro',
    icone: '🌙',
  },
  sepia: {
    nome: 'sepia',
    label: 'Sépia',
    icone: '📖',
  },
  noturno: {
    nome: 'noturno',
    label: 'Noturno',
    icone: '🌑',
  },
};

const STORAGE_KEY = 'ssb_theme';

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
    setMounted(true);
  }, []);

  const setTema = useCallback((novo: TemaNome) => {
    setTemaState(novo);
    localStorage.setItem(STORAGE_KEY, novo);
    const root = document.documentElement;
    root.classList.remove('dark', 'sepia', 'noturno');
    if (novo === 'escuro' || novo === 'noturno') {
      root.classList.add('dark');
    }
    if (novo === 'noturno') {
      root.classList.add('noturno');
    }
    if (novo === 'sepia') {
      root.classList.add('sepia');
    }
    // light: no class added, uses :root defaults
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
