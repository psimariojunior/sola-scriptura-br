import { NextRequest } from 'next/server';
import { LIVROS_AT, LIVROS_NT } from '@/data/biblia/livros';

interface BuscaResultado {
  id: string;
  titulo: string;
  subtitulo?: string;
  categoria: 'versiculo' | 'doutrina' | 'personagem' | 'topico' | 'estudo';
  href: string;
}

function normalize(str: string): string {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || '';

  if (q.trim().length < 2) {
    return Response.json({ resultados: [] });
  }

  const query = normalize(q);
  const resultados: BuscaResultado[] = [];

  try {
    const livros = [...LIVROS_AT, ...LIVROS_NT];

    for (const livro of livros) {
      const nomeMatch = normalize(livro.nome).includes(query);
      const abrevMatch = normalize(livro.abreviacao).includes(query);

      if (nomeMatch || abrevMatch) {
        resultados.push({
          id: `livro-${livro.abreviacao}`,
          titulo: livro.nome,
          subtitulo: `${livro.testamento} — ${livro.totalCapitulos} capítulos`,
          categoria: 'versiculo',
          href: `/biblia?livro=${livro.abreviacao}`,
        });
      }
    }

    try {
      const { doutrinas } = await import('@/data/biblia');
      const doutrinasList = Array.isArray(doutrinas) ? doutrinas : Object.values(doutrinas as Record<string, unknown>);
      for (const d of doutrinasList) {
        if (!d || typeof d !== 'object') continue;
        const dd = d as Record<string, unknown>;
        const nome = normalize(String(dd.nome || dd.titulo || ''));
        const desc = normalize(String(dd.descricao || dd.resumo || ''));
        if (nome.includes(query) || desc.includes(query)) {
          resultados.push({
            id: `doutrina-${String(dd.id || dd.nome)}`,
            titulo: String(dd.nome || dd.titulo),
            subtitulo: String(dd.categoria || 'Teologia'),
            categoria: 'doutrina',
            href: `/teologia`,
          });
        }
      }
    } catch (err: unknown) {
      console.error('[busca] Erro ao buscar doutrinas:', err instanceof Error ? err.message : err);
    }

    try {
      const mod = await import('@/data/biblia/personagensAvancados');
      const personagensAvancados = (mod as Record<string, unknown>).default || (mod as Record<string, unknown>).personagensAvancados || [];
      const personagens = Array.isArray(personagensAvancados) ? personagensAvancados : [];
      for (const p of personagens) {
        if (!p || typeof p !== 'object') continue;
        const pp = p as Record<string, unknown>;
        const nome = normalize(String(pp.nome || ''));
        const desc = normalize(String(pp.descricao || pp.resumo || ''));
        if (nome.includes(query) || desc.includes(query)) {
          resultados.push({
            id: `personagem-${String(pp.id || pp.nome)}`,
            titulo: String(pp.nome),
            subtitulo: String(pp.cargo || pp.funcao || ''),
            categoria: 'personagem',
            href: `/personagens`,
          });
        }
      }
    } catch (err: unknown) {
      console.error('[busca] Erro ao buscar personagens:', err instanceof Error ? err.message : err);
    }

    try {
      const dicMod = await import('@/data/dicionarioBiblico');
      const dicionarioBiblico = (dicMod as Record<string, unknown>).default || (dicMod as Record<string, unknown>).dicionarioBiblico || [];
      const verbetes = Array.isArray(dicionarioBiblico) ? dicionarioBiblico : [];
      for (const v of verbetes) {
        if (!v || typeof v !== 'object') continue;
        const vv = v as Record<string, unknown>;
        const termo = normalize(String(vv.termo || ''));
        const def = normalize(String(vv.definicao || ''));
        if (termo.includes(query) || def.includes(query)) {
          resultados.push({
            id: `topico-${String(vv.id || vv.termo)}`,
            titulo: String(vv.termo),
            subtitulo: String(vv.categoria || ''),
            categoria: 'topico',
            href: `/idiomas/dicionario`,
          });
        }
      }
    } catch (err: unknown) {
      console.error('[busca] Erro ao buscar dicionario:', err instanceof Error ? err.message : err);
    }

    try {
      const comMod = await import('@/data/comentariosExpandidos');
      const comentariosModule = (comMod as Record<string, unknown>).default || (comMod as Record<string, unknown>).comentariosExpandidos || {};
      const comentarios = typeof comentariosModule === 'object' && comentariosModule !== null
        ? Object.values(comentariosModule as Record<string, unknown>)
        : [];
      for (const c of comentarios) {
        if (!c || typeof c !== 'object') continue;
        const cc = c as Record<string, unknown>;
        const titulo = normalize(String(cc.titulo || ''));
        const resumo = normalize(String(cc.resumo || ''));
        if (titulo.includes(query) || resumo.includes(query)) {
          resultados.push({
            id: `estudo-${String(cc.livro)}-${String(cc.capitulo)}-${String(cc.versiculo)}`,
            titulo: String(cc.titulo),
            subtitulo: `${String(cc.livro || '').toUpperCase()} ${String(cc.capitulo)}:${String(cc.versiculo)}`,
            categoria: 'estudo',
            href: `/biblia?livro=${String(cc.livro)}&capitulo=${String(cc.capitulo)}`,
          });
        }
      }
    } catch (err: unknown) {
      console.error('[busca] Erro ao buscar comentarios:', err instanceof Error ? err.message : err);
    }

    const ordenados = resultados
      .sort((a, b) => {
        const aStart = normalize(a.titulo).startsWith(query) ? 0 : 1;
        const bStart = normalize(b.titulo).startsWith(query) ? 0 : 1;
        return aStart - bStart;
      })
      .slice(0, 50);

    return Response.json({ resultados: ordenados });
  } catch {
    return Response.json({ resultados: [], erro: 'Erro na busca' }, { status: 500 });
  }
}
