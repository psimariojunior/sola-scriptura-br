'use client';

import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from 'react';

export type TemaNome = 'light' | 'dim' | 'escuro' | 'sepia' | 'noturno' | 'auto';

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
  dim: {
    nome: 'dim',
    label: 'Meio-escuro',
    icone: '🌆',
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
  auto: {
    nome: 'auto',
    label: 'Automático',
    icone: '🔄',
  },
};

const STORAGE_KEY = 'ssb_theme';

function resolverAuto(): TemaNome {
  const h = new Date().getHours();
  return h >= 6 && h < 18 ? 'light' : 'escuro';
}

function aplicarClasses(tema: TemaNome) {
  const root = document.documentElement;
  root.classList.remove('dark', 'dim', 'sepia', 'noturno');
  const resolved = tema === 'auto' ? resolverAuto() : tema;
  if (resolved === 'escuro' || resolved === 'noturno') {
    root.classList.add('dark');
  }
  if (resolved === 'dim') {
    root.classList.add('dark');
    root.classList.add('dim');
  }
  if (resolved === 'noturno') {
    root.classList.add('noturno');
  }
  if (resolved === 'sepia') {
    root.classList.add('sepia');
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
    aplicarClasses(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (tema !== 'auto') return;
    const id = setInterval(() => {
      aplicarClasses('auto');
    }, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [tema]);

  const setTema = useCallback((novo: TemaNome) => {
    setTemaState(novo);
    localStorage.setItem(STORAGE_KEY, novo);
    aplicarClasses(novo);
  }, []);

  const resolved = tema === 'auto' ? resolverAuto() : tema;

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <TemaContext.Provider value={{ tema, setTema, temaAtual: TEMAS[resolved], temasDisponiveis: Object.values(TEMAS) }}>
      {children}
    </TemaContext.Provider>
  );
}

export { TEMAS };
