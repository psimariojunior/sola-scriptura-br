'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { listarMarcas, ouvirMudancas, initSync, obterEstatisticas, type MarcaBiblia } from '@/lib/estudos';

interface EstudosContextType {
  marcas: MarcaBiblia[];
  refresh: () => void;
  getCor: (livro: string, capitulo: number, versiculo: number, traducao: string) => string | null;
  isFavorito: (livro: string, capitulo: number, versiculo: number, traducao: string) => boolean;
  stats: { total: number; favoritos: number; anotacoes: number; livrosUnicos: number };
}

const EstudosContext = createContext<EstudosContextType>({
  marcas: [],
  refresh: () => {},
  getCor: () => null,
  isFavorito: () => false,
  stats: { total: 0, favoritos: 0, anotacoes: 0, livrosUnicos: 0 },
});

export function EstudosProvider({ children }: { children: ReactNode }) {
  const [marcas, setMarcas] = useState<MarcaBiblia[]>([]);
  const [version, setVersion] = useState(0);
  const [stats, setStats] = useState({ total: 0, favoritos: 0, anotacoes: 0, livrosUnicos: 0 });

  const refresh = useCallback(() => setVersion((v) => v + 1), []);

  useEffect(() => {
    initSync();
  }, []);

  useEffect(() => {
    const m = listarMarcas();
    setMarcas(m);
    setStats(obterEstatisticas());
  }, [version]);

  useEffect(() => {
    const unsub = ouvirMudancas(() => {
      setMarcas(listarMarcas());
      setStats(obterEstatisticas());
    });
    return unsub;
  }, []);

  const chave = (l: string, c: number, v: number, t: string) => `${l}:${c}:${v}:${t}`;

  const getCor = useCallback(
    (l: string, c: number, v: number, t: string) => {
      const k = chave(l, c, v, t);
      return marcas.find((m) => chave(m.livro, m.capitulo, m.versiculo, m.traducao) === k)?.cor ?? null;
    },
    [marcas]
  );

  const isFavorito = useCallback(
    (l: string, c: number, v: number, t: string) => {
      const k = chave(l, c, v, t);
      return marcas.some((m) => chave(m.livro, m.capitulo, m.versiculo, m.traducao) === k && m.favorito);
    },
    [marcas]
  );

  return (
    <EstudosContext.Provider value={{ marcas, refresh, getCor, isFavorito, stats }}>
      {children}
    </EstudosContext.Provider>
  );
}

export const useEstudos = () => useContext(EstudosContext);
