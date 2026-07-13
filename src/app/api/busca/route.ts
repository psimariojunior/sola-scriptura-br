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
      const doutrinasList = Array.isArray(doutrinas) ? doutrinas : Object.values(doutrinas as any);
      for (const d of doutrinasList) {
        if (!d || typeof d !== 'object') continue;
        const dd = d as any;
        const nome = normalize(dd.nome || dd.titulo || '');
        const desc = normalize(dd.descricao || dd.resumo || '');
        if (nome.includes(query) || desc.includes(query)) {
          resultados.push({
            id: `doutrina-${dd.id || dd.nome}`,
            titulo: dd.nome || dd.titulo,
            subtitulo: dd.categoria || 'Teologia',
            categoria: 'doutrina',
            href: `/teologia`,
          });
        }
      }
    } catch {}

    try {
      const mod = await import('@/data/biblia/personagensAvancados');
      const personagensAvancados = (mod as any).default || (mod as any).personagensAvancados || [];
      const personagens = Array.isArray(personagensAvancados) ? personagensAvancados : [];
      for (const p of personagens) {
        if (!p || typeof p !== 'object') continue;
        const pp = p as any;
        const nome = normalize(pp.nome || '');
        const desc = normalize(pp.descricao || pp.resumo || '');
        if (nome.includes(query) || desc.includes(query)) {
          resultados.push({
            id: `personagem-${pp.id || pp.nome}`,
            titulo: pp.nome,
            subtitulo: pp.cargo || pp.funcao || '',
            categoria: 'personagem',
            href: `/personagens`,
          });
        }
      }
    } catch {}

    try {
      const dicMod = await import('@/data/dicionarioBiblico');
      const dicionarioBiblico = (dicMod as any).default || (dicMod as any).dicionarioBiblico || [];
      const verbetes = Array.isArray(dicionarioBiblico) ? dicionarioBiblico : [];
      for (const v of verbetes) {
        if (!v || typeof v !== 'object') continue;
        const vv = v as any;
        const termo = normalize(vv.termo || '');
        const def = normalize(vv.definicao || '');
        if (termo.includes(query) || def.includes(query)) {
          resultados.push({
            id: `topico-${vv.id || vv.termo}`,
            titulo: vv.termo,
            subtitulo: vv.categoria || '',
            categoria: 'topico',
            href: `/idiomas/dicionario`,
          });
        }
      }
    } catch {}

    try {
      const comMod = await import('@/data/comentariosExpandidos');
      const comentariosModule = (comMod as any).default || (comMod as any).comentariosExpandidos || {};
      const comentarios = typeof comentariosModule === 'object' && comentariosModule !== null
        ? Object.values(comentariosModule as Record<string, any>)
        : [];
      for (const c of comentarios) {
        if (!c || typeof c !== 'object') continue;
        const titulo = normalize(c.titulo || '');
        const resumo = normalize(c.resumo || '');
        if (titulo.includes(query) || resumo.includes(query)) {
          resultados.push({
            id: `estudo-${c.livro}-${c.capitulo}-${c.versiculo}`,
            titulo: c.titulo,
            subtitulo: `${(c.livro || '').toUpperCase()} ${c.capitulo}:${c.versiculo}`,
            categoria: 'estudo',
            href: `/biblia?livro=${c.livro}&capitulo=${c.capitulo}`,
          });
        }
      }
    } catch {}

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
