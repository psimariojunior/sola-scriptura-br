import { getVersiculoEstudo, versiculosPorLivro, type VersicoEstudo } from '@/data/versiculosEstudo';
import { obterEstudos } from '@/data/estudosTeologicos';
import { obterComentarios } from '@/data/comentarios';
import { getCrossReferencesByVerse, type CrossReference } from '@/data/biblia/crossReferences';
import { obterEstudoCapitulo } from '@/lib/estudosLoader';

export type TipoEstudo = 'versiculo' | 'capitulo' | 'livro';

export interface BlocoEstudo {
  secao: string;
  icone?: string;
  conteudo: string | string[];
}

export interface ReferenciaSintetizada {
  referencia: string;
  titulo: string;
  tipo: 'parallel' | 'fulfillment' | 'quotation' | 'contrast' | 'thematic' | 'typology';
  descricao?: string;
}

export interface TeologoResumo {
  teologo: string;
  periodo: string;
  tradicao: string;
  visao: string;
  resumo: string;
  citacao?: string;
}

export interface VersiculoSintetizado {
  numero: number;
  titulo?: string;
  contextoHistorico?: string;
  contextoLiterario?: string;
  significadoTeologico?: string;
  aplicacoes: string[];
  perguntasEstudo: string[];
  versiculosConexoes: string[];
  referencias: ReferenciaSintetizada[];
  temEstudo: boolean;
}

export interface EstudoSintetizado {
  tipo: TipoEstudo;
  referencia: string;
  titulo: string;
  resumo?: string;
  blocos: BlocoEstudo[];
  fontes: string[];
  verbetes?: { termo: string; definicao: string }[];
  geradoEm: string;
}

function refToString(livro: string, capitulo: number, versiculo?: number): string {
  return versiculo !== undefined ? `${livro} ${capitulo}:${versiculo}` : `${livro} ${capitulo}`;
}

async function carregarLivroCompleto(livro: string): Promise<Record<string, VersicoEstudo> | null> {
  const loader = versiculosPorLivro[livro.toLowerCase() as keyof typeof versiculosPorLivro];
  if (!loader) return null;
  const mod = await loader();
  return (mod.default ?? mod) as Record<string, VersicoEstudo>;
}

function mapearReferencias(refs: CrossReference[]): ReferenciaSintetizada[] {
  return refs.map((r) => ({
    referencia: r.to,
    titulo: r.to,
    tipo: r.type,
    descricao: r.description,
  }));
}

function blocoTeologos(teologos: TeologoResumo[]): BlocoEstudo {
  return {
    secao: 'Interpretação de Teólogos',
    icone: 'Users',
    conteudo: teologos.map((t) =>
      `**${t.teologo}** (${t.periodo} · ${t.tradicao} · ${t.visao})\n${t.resumo}${t.citacao ? `\n\n> "${t.citacao}"` : ''}`
    ),
  };
}

function blocoComentarios(comentarios: { autor: string; texto: string; tipo: string }[]): BlocoEstudo {
  return {
    secao: 'Comentários',
    icone: 'Quote',
    conteudo: comentarios.map((c) => `**${c.autor}** (${c.tipo}): ${c.texto}`),
  };
}

function blocoReferencias(refs: ReferenciaSintetizada[]): BlocoEstudo {
  return {
    secao: 'Referências Cruzadas',
    icone: 'Link2',
    conteudo: refs.map((r) => `${r.referencia} — ${r.descricao ?? r.tipo}`),
  };
}

export async function sintetizarEstudo(
  livro: string,
  capitulo: number,
  versiculo?: number
): Promise<EstudoSintetizado> {
  const fontes = new Set<string>();
  const blocos: BlocoEstudo[] = [];

  if (versiculo !== undefined) {
    const ref = refToString(livro, capitulo, versiculo);

    const vsPromise = getVersiculoEstudo(livro, capitulo, versiculo);
    const teologicos = obterEstudos(livro, capitulo, versiculo);
    const comentarios = obterComentarios(livro, capitulo, versiculo);
    const refs = mapearReferencias(getCrossReferencesByVerse(livro, capitulo, versiculo));
    const vs = await vsPromise;

    let titulo = `${livro} ${capitulo}:${versiculo}`;

    if (teologicos.length > 0) {
      fontes.add('Estudos Teológicos');
      titulo = teologicos[0].tema;
      blocos.push({ secao: 'Visão Geral', icone: 'BookOpen', conteudo: teologicos[0].contexto });
      const teologos: TeologoResumo[] = teologicos[0].interpretacoes.map((i) => ({
        teologo: i.teologo,
        periodo: i.periodo,
        tradicao: i.tradicao,
        visao: i.visao,
        resumo: i.resumo,
        citacao: i.citacao,
      }));
      blocos.push(blocoTeologos(teologos));
    }

    if (vs) {
      fontes.add('Estudo por Versículo');
      if (teologicos.length === 0) titulo = vs.titulo;
      if (vs.contextoHistorico) blocos.push({ secao: 'Contexto Histórico', icone: 'ScrollText', conteudo: vs.contextoHistorico });
      if (vs.contextoLiterario) blocos.push({ secao: 'Contexto Literário', icone: 'ScrollText', conteudo: vs.contextoLiterario });
      if (vs.significadoTeologico) blocos.push({ secao: 'Significado Teológico', icone: 'Sparkles', conteudo: vs.significadoTeologico });
      if (vs.aplicacoes.length > 0) blocos.push({ secao: 'Aplicações', icone: 'Lightbulb', conteudo: vs.aplicacoes });
      if (vs.perguntasEstudo.length > 0) blocos.push({ secao: 'Perguntas de Estudo', icone: 'HelpCircle', conteudo: vs.perguntasEstudo });
      if (vs.versiculosConexoes.length > 0) {
        blocos.push({
          secao: 'Conexões Internas',
          icone: 'Link2',
          conteudo: vs.versiculosConexoes,
        });
      }
    }

    if (comentarios.length > 0) {
      fontes.add('Comentários de Teólogos');
      blocos.push(blocoComentarios(comentarios));
    }

    if (refs.length > 0) {
      fontes.add('Referências Cruzadas');
      blocos.push(blocoReferencias(refs));
    }

    if (blocos.length === 0) {
      blocos.push({
        secao: 'Aviso',
        conteudo: `Nenhum estudo sintetizado disponível para ${ref}. Consulte o texto bíblico e as ferramentas de pesquisa.`,
      });
    }

    return {
      tipo: 'versiculo',
      referencia: ref,
      titulo,
      blocos,
      fontes: [...fontes],
      geradoEm: new Date().toISOString(),
    };
  }

  // Capítulo ou livro
  const estudoCap = obterEstudoCapitulo(livro, capitulo);
  const ref = refToString(livro, capitulo);

  if (estudoCap) {
    fontes.add('Estudo do Capítulo');
    if (estudoCap.resumo) blocos.push({ secao: 'Resumo do Capítulo', icone: 'BookOpen', conteudo: estudoCap.resumo });
    if (estudoCap.temas.length > 0) blocos.push({ secao: 'Temas', icone: 'Tag', conteudo: estudoCap.temas });
    if (estudoCap.VersiculosChave.length > 0) {
      blocos.push({
        secao: 'Versículos-Chave',
        icone: 'Quote',
        conteudo: estudoCap.VersiculosChave.map((vc) => `**${vc.referencia}**: "${vc.texto}" — ${vc.explicacao}`),
      });
    }
    if (estudoCap.aplicacaoPratica) blocos.push({ secao: 'Aplicação Prática', icone: 'Lightbulb', conteudo: estudoCap.aplicacaoPratica });
    if (estudoCap.perguntasEstudo.length > 0) blocos.push({ secao: 'Perguntas de Estudo', icone: 'HelpCircle', conteudo: estudoCap.perguntasEstudo });
  }

  const livroCompleto = await carregarLivroCompleto(livro);
  const versiculosDoCap: VersiculoSintetizado[] = [];
  if (livroCompleto) {
    fontes.add('Estudo por Versículo');
    const prefixo = `${capitulo}:`;
    for (const chave of Object.keys(livroCompleto)) {
      if (!chave.startsWith(prefixo)) continue;
      const v = livroCompleto[chave];
      const refs = mapearReferencias(getCrossReferencesByVerse(livro, capitulo, v.versiculo));
      versiculosDoCap.push({
        numero: v.versiculo,
        titulo: v.titulo,
        contextoHistorico: v.contextoHistorico,
        contextoLiterario: v.contextoLiterario,
        significadoTeologico: v.significadoTeologico,
        aplicacoes: v.aplicacoes,
        perguntasEstudo: v.perguntasEstudo,
        versiculosConexoes: v.versiculosConexoes,
        referencias: refs,
        temEstudo: true,
      });
    }
    versiculosDoCap.sort((a, b) => a.numero - b.numero);
  }

  if (versiculosDoCap.length > 0) {
    blocos.push({
      secao: `Estudos por Versículo (${versiculosDoCap.length})`,
      icone: 'List',
      conteudo: versiculosDoCap.map((v) => {
        const partes = [`**${v.numero}. ${v.titulo ?? ''}**`];
        if (v.significadoTeologico) partes.push(v.significadoTeologico);
        if (v.contextoHistorico) partes.push(`Contexto: ${v.contextoHistorico}`);
        if (v.aplicacoes.length > 0) partes.push(`Aplicações: ${v.aplicacoes.join('; ')}`);
        if (v.referencias.length > 0) partes.push(`Refs: ${v.referencias.map((r) => r.referencia).join(', ')}`);
        return partes.join('\n');
      }),
    });
  }

  if (estudoCap || versiculosDoCap.length > 0) {
    return {
      tipo: 'capitulo',
      referencia: ref,
      titulo: estudoCap?.titulo ?? `${livro} ${capitulo}`,
      blocos,
      fontes: [...fontes],
      geradoEm: new Date().toISOString(),
    };
  }

  // Apenas livro (sem capítulo específico) — só usado quando capitulo vazio? mantemos fallback de capítulo.
  return {
    tipo: 'capitulo',
    referencia: ref,
    titulo: `${livro} ${capitulo}`,
    blocos: [
      {
        secao: 'Aviso',
        conteudo: `Nenhum estudo sintetizado disponível para ${ref}.`,
      },
    ],
    fontes: [...fontes],
    geradoEm: new Date().toISOString(),
  };
}

export function estudoParaTexto(estudo: EstudoSintetizado): string {
  const linhas: string[] = [];
  linhas.push(`# Estudo Sintetizado — ${estudo.referencia}`);
  linhas.push('');
  linhas.push(`**${estudo.titulo}**`);
  linhas.push(`_Fontes: ${estudo.fontes.join(', ')}_`);
  linhas.push('');
  for (const bloco of estudo.blocos) {
    linhas.push(`## ${bloco.secao}`);
    if (Array.isArray(bloco.conteudo)) {
      for (const item of bloco.conteudo) linhas.push(`- ${item}`);
    } else {
      linhas.push(bloco.conteudo);
    }
    linhas.push('');
  }
  return linhas.join('\n');
}
