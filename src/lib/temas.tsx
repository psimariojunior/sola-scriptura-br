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

const STORAGE_KEY = 'ssb_theme_v2';
const TEMA_CICLO: TemaNome[] = ['light', 'escuro', 'sepia', 'dim', 'noturno'];

export function normalizarTema(raw: string | null | undefined): TemaNome {
  if (!raw) return 'light';
  if (raw === 'claro') return 'light';
  if (raw in TEMAS) return raw as TemaNome;
  return 'light';
}

function resolverAuto(): TemaNome {
  const h = new Date().getHours();
  return h >= 6 && h < 18 ? 'light' : 'escuro';
}

export function aplicarClasses(tema: TemaNome) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.remove('dark', 'dim', 'sepia', 'noturno');
  const resolved = tema === 'auto' ? resolverAuto() : tema;
  root.setAttribute('data-theme', resolved);
  if (resolved === 'escuro' || resolved === 'noturno' || resolved === 'dim') {
    root.classList.add('dark');
  }
  if (resolved === 'dim') root.classList.add('dim');
  if (resolved === 'noturno') root.classList.add('noturno');
  if (resolved === 'sepia') root.classList.add('sepia');
}

export function persistTema(tema: TemaNome) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, tema);
  localStorage.setItem('ssb_theme', tema === 'light' ? 'claro' : tema);
  aplicarClasses(tema);
}

export function cycleTema(current: string | null | undefined): TemaNome {
  const atual = normalizarTema(current);
  const idx = TEMA_CICLO.indexOf(atual === 'auto' ? resolverAuto() : atual);
  return TEMA_CICLO[(Math.max(idx, 0) + 1) % TEMA_CICLO.length];
}

interface TemaContextType {
  tema: TemaNome;
  setTema: (tema: TemaNome) => void;
  temaAtual: TemaConfig;
  temasDisponiveis: TemaConfig[];
}

const TemaContext = createContext<TemaContextType>({
  tema: 'light',
  setTema: () => {},
  temaAtual: TEMAS.light,
  temasDisponiveis: Object.values(TEMAS),
});

export function useTema() {
  return useContext(TemaContext);
}

export function TemaProvider({ children }: { children: ReactNode }) {
  const [tema, setTemaState] = useState<TemaNome>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('ssb_theme');
    const initial = normalizarTema(raw);
    setTemaState(initial);
    persistTema(initial);
    setMounted(true);

    const onExternal = (e: Event) => {
      const next = normalizarTema((e as CustomEvent<string>).detail);
      setTemaState(next);
      persistTema(next);
    };
    window.addEventListener('ssb:theme-change', onExternal);
    return () => window.removeEventListener('ssb:theme-change', onExternal);
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
    persistTema(novo);
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
