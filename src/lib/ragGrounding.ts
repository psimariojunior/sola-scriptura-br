import {
  obterEstudoVersiculo,
  obterEstudoCapitulo,
  obterEstudoLivro,
} from '@/lib/estudosLoader';
import { obterComentarios } from '@/data/comentarios';
import { crossReferences } from '@/data/crossReferences';
import { findWordInText, getStrongByNumber } from '@/lib/lexiconSearch';
import { TODOS_LIVROS, livroPorAbreviacao } from '@/data/biblia/livros';

const LIMITE_PALAVRAS = 1500;

export interface ReferenciaDetectada {
  livro: string;
  livroNome: string;
  capitulo: number;
  versiculo?: number;
  textoOriginal: string;
}

const NOME_PARA_ABREV = new Map<string, string>();
for (const l of TODOS_LIVROS) NOME_PARA_ABREV.set(l.nome.toLowerCase(), l.abreviacao);
for (const [abrev, info] of livroPorAbreviacao) {
  if (!NOME_PARA_ABREV.has(info.nome.toLowerCase())) {
    NOME_PARA_ABREV.set(info.nome.toLowerCase(), abrev);
  }
}

const NOMES_ORDENADOS = [...TODOS_LIVROS].map((l) => l.nome).sort((a, b) => b.length - a.length);
const escapar = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const NOME_ALTERNACAO = NOMES_ORDENADOS.map(escapar).join('|');
const REGEX_REF = new RegExp(`(?<!\\w)(${NOME_ALTERNACAO})\\s+(\\d+)(?::(\\d+))?`, 'g');

function resolverAbrev(nome: string): string | null {
  const k = nome.trim().toLowerCase();
  if (NOME_PARA_ABREV.has(k)) return NOME_PARA_ABREV.get(k)!;
  if (livroPorAbreviacao.has(k)) return livroPorAbreviacao.get(k)!.abreviacao;
  for (const l of TODOS_LIVROS) if (l.nome.toLowerCase().startsWith(k)) return l.abreviacao;
  return null;
}

export function detectarReferencia(texto: string): ReferenciaDetectada | null {
  REGEX_REF.lastIndex = 0;
  const match = REGEX_REF.exec(texto);
  if (!match) return null;
  const abrev = resolverAbrev(match[1]);
  if (!abrev) return null;
  const capitulo = parseInt(match[2], 10);
  if (capitulo < 1 || capitulo > 150) return null;
  const versiculo = match[3] ? parseInt(match[3], 10) : undefined;
  if (versiculo !== undefined && (versiculo < 1 || versiculo > 200)) return null;
  const info = livroPorAbreviacao.get(abrev);
  return {
    livro: abrev,
    livroNome: info?.nome ?? match[1],
    capitulo,
    versiculo,
    textoOriginal: match[0],
  };
}

function extrairPalavrasChave(texto: string): string[] {
  const parada = new Set([
    'deus', 'senhor', 'jesus', 'cristo', 'espírito', 'pai', 'filho', 'homem', 'mulher',
    'de', 'do', 'da', 'dos', 'das', 'no', 'na', 'nos', 'nas', 'por', 'para', 'com', 'que',
    'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas', 'e', 'ou', 'em', 'se', 'ao', 'à',
    'estudo', 'versículo', 'versiculo', 'capítulo', 'capitulo', 'sobre', 'analise', 'análise',
    'gere', 'gerar', 'explic', 'como', 'qual', 'quem', 'quando', 'onde', 'porque', 'por que',
  ]);
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !parada.has(w));
}

export interface ContextoRAG {
  referencia: ReferenciaDetectada;
  blocos: string[];
  fontes: string[];
  temContexto: boolean;
}

export async function construirContextoRAG(
  texto: string,
): Promise<ContextoRAG | null> {
  const referencia = detectarReferencia(texto);
  if (!referencia) return null;

  const blocos: string[] = [];
  const fontes = new Set<string>();

  // 1. Estudo de livro (contexto amplo)
  const estudoLivro = obterEstudoLivro(referencia.livro);
  if (estudoLivro) {
    blocos.push(
      `CONTEXTO DO LIVRO (${estudoLivro.titulo}): ${estudoLivro.contexto} ` +
        `Temas principais: ${estudoLivro.temasPrincipais.join(', ')}.`,
    );
    fontes.add(`Estudo do livro de ${estudoLivro.titulo}`);
  }

  // 2. Estudo de capítulo
  const estudoCap = obterEstudoCapitulo(referencia.livro, referencia.capitulo);
  if (estudoCap) {
    blocos.push(
      `ESTUDO DO CAPÍTULO ${referencia.capitulo} — ${estudoCap.titulo}: ${estudoCap.resumo}`,
    );
    if (estudoCap.VersiculosChave.length > 0) {
      const vs = estudoCap.VersiculosChave
        .map((v) => `  • ${v.referencia}: "${v.texto}" — ${v.explicacao}`)
        .join('\n');
      blocos.push(`VERSÍCULOS-CHAVE DO CAPÍTULO:\n${vs}`);
    }
    fontes.add(`Estudo do capítulo ${referencia.capitulo}`);
  }

  // 3. Estudo específico do versículo (se aplicável)
  if (referencia.versiculo) {
    const estudoVs = await obterEstudoVersiculo(
      referencia.livro,
      referencia.capitulo,
      referencia.versiculo,
    );
    if (estudoVs) {
      if (estudoVs.contexto) {
        blocos.push(`ESTUDO DO VERSÍCULO — ${estudoVs.tema}: ${estudoVs.contexto}`);
      }
      if (estudoVs.detalhe) {
        const d = estudoVs.detalhe;
        blocos.push(
          `ANÁLISE DE ${d.titulo}:\n` +
            `- Contexto histórico: ${d.contextoHistorico}\n` +
            `- Contexto literário: ${d.contextoLiterario}\n` +
            `- Significado teológico: ${d.significadoTeologico}` +
            (d.aplicacoes.length ? `\n- Aplicações: ${d.aplicacoes.join('; ')}` : '') +
            (d.versiculosConexoes.length ? `\n- Conexões: ${d.versiculosConexoes.join(', ')}` : ''),
        );
      }
      if (estudoVs.interpretacoes && estudoVs.interpretacoes.length > 0) {
        const interp = estudoVs.interpretacoes
          .map(
            (i) =>
              `  • ${i.teologo} (${i.tradicao}, ${i.periodo}): ${i.resumo} — "${i.citacao}"`,
          )
          .join('\n');
        blocos.push(`INTERPRETAÇÕES TEOLOGICAS:\n${interp}`);
        estudoVs.interpretacoes.forEach((i) => fontes.add(i.teologo));
      }
      fontes.add(`Estudo de ${referencia.livroNome} ${referencia.capitulo}:${referencia.versiculo}`);
    }

    // 3b. Comentários de teólogos
    const comentarios = obterComentarios(
      referencia.livro,
      referencia.capitulo,
      referencia.versiculo,
    );
    if (comentarios.length > 0) {
      const c = comentarios
        .map((cm) => `  • ${cm.autor} (${cm.tipo}): ${cm.texto}`)
        .join('\n');
      blocos.push(`COMENTÁRIOS DE TEOLOGOS:\n${c}`);
      comentarios.forEach((cm) => fontes.add(cm.autor));
    }

    // 3c. Referências cruzadas
    const crKey = `${referencia.livro}:${referencia.capitulo}:${referencia.versiculo}`;
    const cr = crossReferences[crKey];
    if (cr && cr.length > 0) {
      blocos.push(`REFERÊNCIAS CRUZADAS: ${cr.join(', ')}`);
    }
  }

  // 4. Grounding de línguas originais (Strong / léxico) com base em palavras-chave
  const palavras = extrairPalavrasChave(texto);
  const achadosLex = new Set<string>();
  for (const pal of palavras.slice(0, 6)) {
    const resultados = findWordInText(pal).slice(0, 2);
    for (const r of resultados) {
      const e = r.entry;
      const tag = e.strong;
      if (achadosLex.has(tag)) continue;
      achadosLex.add(tag);
      const idioma = e.strong.toUpperCase().startsWith('H') ? 'hebraico' : 'grego';
      blocos.push(
        `LÉXICO (Strong ${e.strong}, ${idioma}): ${e.transliteracao} — ${e.definicao}`,
      );
    }
  }

  // Detectar Strongs explícitos (ex: "G26", "H430")
  const strongMatch = texto.match(/\b[GH]\d{2,4}\b/gi);
  if (strongMatch) {
    for (const s of strongMatch.slice(0, 4)) {
      const entry = getStrongByNumber(s);
      if (entry) {
        const idioma = entry.strong.toUpperCase().startsWith('H') ? 'hebraico' : 'grego';
        blocos.push(
          `STRONG ${entry.strong} (${idioma}): ${entry.transliteracao} — ${entry.definicao}`,
        );
        fontes.add(`Strong ${entry.strong}`);
      }
    }
  }

  if (blocos.length === 0) return null;

  // Cortar para respeitar o limite de tokens (≈1500 palavras)
  let textoFinal = '';
  let total = 0;
  for (const b of blocos) {
    const palavrasBloco = b.split(/\s+/).length;
    if (total + palavrasBloco > LIMITE_PALAVRAS) {
      const restante = LIMITE_PALAVRAS - total;
      if (restante > 20) {
        textoFinal += '\n\n' + b.split(/\s+/).slice(0, restante).join(' ');
      }
      break;
    }
    textoFinal += (textoFinal ? '\n\n' : '') + b;
    total += palavrasBloco;
  }

  return {
    referencia,
    blocos: [textoFinal],
    fontes: [...fontes],
    temContexto: true,
  };
}
