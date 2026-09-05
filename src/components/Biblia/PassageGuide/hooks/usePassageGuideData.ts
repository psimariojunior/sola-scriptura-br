'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Comentario } from '@/data/comentarios';
import type { CrossReference } from '@/data/biblia/crossReferences';
import type { EstudoVersiculo } from '@/data/estudosTeologicos';
import type { LocalBiblico } from '@/data/biblia/locais';

export interface PassageGuideSection<T> {
  data: T;
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

export interface PassageGuideData {
  comentarios: PassageGuideSection<Comentario[]>;
  crossRefs: PassageGuideSection<CrossReference[]>;
  estudos: PassageGuideSection<EstudoVersiculo[]>;
  locais: PassageGuideSection<LocalBiblico[]>;
  lexico: PassageGuideSection<{ palavra: string; strong: string; definicao: string; idioma: 'hebraico' | 'grego' }[]>;
}

const EMPTY_COMMENTS: Comentario[] = [];
const EMPTY_REFS: CrossReference[] = [];
const EMPTY_ESTUDOS: EstudoVersiculo[] = [];
const EMPTY_LOCAIS: LocalBiblico[] = [];
const EMPTY_LEXICO: { palavra: string; strong: string; definicao: string; idioma: 'hebraico' | 'grego' }[] = [];

export function usePassageGuideData(livro: string, capitulo: number, versiculo: number) {
  const [comentarios, setComentarios] = useState<PassageGuideSection<Comentario[]>>({
    data: EMPTY_COMMENTS, loading: false, loaded: false, error: null,
  });
  const [crossRefs, setCrossRefs] = useState<PassageGuideSection<CrossReference[]>>({
    data: EMPTY_REFS, loading: false, loaded: false, error: null,
  });
  const [estudos, setEstudos] = useState<PassageGuideSection<EstudoVersiculo[]>>({
    data: EMPTY_ESTUDOS, loading: false, loaded: false, error: null,
  });
  const [locais, setLocais] = useState<PassageGuideSection<LocalBiblico[]>>({
    data: EMPTY_LOCAIS, loading: false, loaded: false, error: null,
  });
  const [lexico, setLexico] = useState<PassageGuideSection<{ palavra: string; strong: string; definicao: string; idioma: 'hebraico' | 'grego' }[]>>({
    data: EMPTY_LEXICO, loading: false, loaded: false, error: null,
  });

  const livroLower = livro.toLowerCase();

  // Load comments immediately
  useEffect(() => {
    let cancelled = false;
    setComentarios(prev => ({ ...prev, loading: true, error: null }));
    import('@/data/lazy/comentarios').then(mod => {
      if (cancelled) return;
      mod.getComentariosLazy(livroLower, capitulo, versiculo).then(data => {
        if (cancelled) return;
        setComentarios({ data, loading: false, loaded: true, error: null });
      }).catch(err => {
        if (cancelled) return;
        setComentarios(prev => ({ ...prev, loading: false, error: String(err) }));
      });
    });
    return () => { cancelled = true; };
  }, [livroLower, capitulo, versiculo]);

  // Load cross-references immediately
  useEffect(() => {
    let cancelled = false;
    setCrossRefs(prev => ({ ...prev, loading: true, error: null }));
    import('@/data/biblia/crossReferences').then(mod => {
      if (cancelled) return;
      const data = mod.getCrossReferencesByVerse(livroLower, capitulo, versiculo);
      if (cancelled) return;
      setCrossRefs({ data, loading: false, loaded: true, error: null });
    }).catch(err => {
      if (cancelled) return;
      setCrossRefs(prev => ({ ...prev, loading: false, error: String(err) }));
    });
    return () => { cancelled = true; };
  }, [livroLower, capitulo, versiculo]);

  // Load studies immediately
  useEffect(() => {
    let cancelled = false;
    setEstudos(prev => ({ ...prev, loading: true, error: null }));
    import('@/data/estudosTeologicos').then(mod => {
      if (cancelled) return;
      const data = mod.obterEstudos(livroLower, capitulo, versiculo);
      if (cancelled) return;
      setEstudos({ data, loading: false, loaded: true, error: null });
    }).catch(err => {
      if (cancelled) return;
      setEstudos(prev => ({ ...prev, loading: false, error: String(err) }));
    });
    return () => { cancelled = true; };
  }, [livroLower, capitulo, versiculo]);

  // Lazy load: locations
  const loadLocais = useCallback(() => {
    if (locais.loaded || locais.loading) return;
    setLocais(prev => ({ ...prev, loading: true, error: null }));
    import('@/data/biblia/locais').then(mod => {
      const data = mod.locaisBiblicos.filter(l =>
        l.referencias.some(r => {
          const match = r.match(/^(\d?\s*\w+)\s+(\d+):(\d+)/);
          if (!match) return false;
          const refLivro = match[1].toLowerCase().replace(/\s+/g, '');
          const refCap = parseInt(match[2]);
          const refVer = parseInt(match[3]);
          return refLivro === livroLower && refCap === capitulo && refVer === versiculo;
        })
      );
      setLocais({ data, loading: false, loaded: true, error: null });
    }).catch(err => {
      setLocais(prev => ({ ...prev, loading: false, error: String(err) }));
    });
  }, [livroLower, capitulo, versiculo, locais.loaded, locais.loading]);

  // Lazy load: lexicon
  const loadLexico = useCallback(() => {
    if (lexico.loaded || lexico.loading) return;
    setLexico(prev => ({ ...prev, loading: true, error: null }));
    Promise.all([
      import('@/data/lexicon/hebraico'),
      import('@/data/lexicon/grego'),
    ]).then(([hebMod, greMod]) => {
      const palavras: { palavra: string; strong: string; definicao: string; idioma: 'hebraico' | 'grego' }[] = [];
      // Get first 3 Hebrew entries
      const hebData = (hebMod as any).palavrasHebraicos || (hebMod as any).palavrasHebraicas || [];
      for (const e of hebData.slice(0, 3)) {
        if (e?.palavra) palavras.push({ palavra: e.palavra, strong: e.strong || '', definicao: e.definicao || e.significado || '', idioma: 'hebraico' });
      }
      // Get first 2 Greek entries
      const greData = (greMod as any).palavrasGregas || (greMod as any).palavrasGrega || [];
      for (const e of greData.slice(0, 2)) {
        if (e?.palavra) palavras.push({ palavra: e.palavra, strong: e.strong || '', definicao: e.definicao || e.significado || '', idioma: 'grego' });
      }
      setLexico({ data: palavras, loading: false, loaded: true, error: null });
    }).catch(err => {
      setLexico(prev => ({ ...prev, loading: false, error: String(err) }));
    });
  }, [lexico.loaded, lexico.loading]);

  return {
    comentarios,
    crossRefs,
    estudos,
    locais,
    lexico,
    loadLocais,
    loadLexico,
  };
}
