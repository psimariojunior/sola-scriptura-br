import type { EstudoCapitulo, VersiculoChaveCap } from '@/data/estudosCapitulo';
import { estudosPorLivro } from '@/data/estudosPorLivro';
import { getPericopesCapitulo, type Pericope } from '@/data/biblia/pericopes';
import { livroPorAbreviacao, TODOS_LIVROS, type LivroInfo } from '@/data/biblia/livros';

function semAcento(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function nomesPericope(info: LivroInfo): string[] {
  const extra: Record<string, string[]> = {
    jz: ['Juizes', 'Juízes'],
    ct: ['Cânticos', 'Cantares', 'Cântico dos Cânticos'],
    fm: ['Filemom', 'Filémon'],
    sl: ['Salmos', 'Salmo'],
  };
  return Array.from(
    new Set([info.nome, semAcento(info.nome), info.abreviacao, ...(extra[info.abreviacao] ?? [])]),
  );
}

export function resolverLivroEstudo(livro: string): LivroInfo | undefined {
  const k = livro.toLowerCase();
  return livroPorAbreviacao.get(k) ?? TODOS_LIVROS.find(
    (l) => l.nome.toLowerCase() === k || semAcento(l.nome).toLowerCase() === semAcento(k).toLowerCase(),
  );
}

function pericopesDoCapitulo(info: LivroInfo, capitulo: number): Pericope[] {
  const seen = new Set<string>();
  const out: Pericope[] = [];
  for (const nome of nomesPericope(info)) {
    for (const p of getPericopesCapitulo(nome, capitulo)) {
      if (!seen.has(p.id)) {
        seen.add(p.id);
        out.push(p);
      }
    }
  }
  return out;
}

function capituloDaRef(ref: string): number | null {
  const m = ref.match(/(\d+)\s*:\s*\d+/);
  return m ? Number.parseInt(m[1], 10) : null;
}

function unicos(itens: Array<string | undefined>): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of itens) {
    const t = item?.trim();
    if (!t) continue;
    const k = t.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(t);
  }
  return out;
}

export function eStubGenerico(estudo: EstudoCapitulo): boolean {
  if (estudo.nivel === 'profundo') return false;
  if (estudo.resumo.includes('apresenta o desenvolvimento do capítulo')) return true;
  const perguntasGenericas = estudo.perguntasEstudo.filter(
    (p) =>
      p.startsWith('Qual o tema central') ||
      p.includes('Como este capítulo se relaciona com o restante') ||
      p.includes('Que verdade prática pode ser aplicada hoje'),
  );
  return perguntasGenericas.length >= 2 && estudo.resumo.length < 180;
}

/**
 * Ficha de estudo para qualquer capítulo dos 66 livros.
 * Prioriza perícopes + introdução do livro; nunca inventa citação de autor.
 */
export function sintetizarEstudoCapitulo(livro: string, capitulo: number): EstudoCapitulo {
  const info = resolverLivroEstudo(livro);
  const abrev = info?.abreviacao ?? livro.toLowerCase();
  const nome = info?.nome ?? livro;
  const intro = estudosPorLivro[abrev];
  const pericopes = info ? pericopesDoCapitulo(info, capitulo) : [];

  const titulo =
    pericopes.length === 1
      ? pericopes[0].titulo
      : pericopes.length > 1
        ? pericopes.map((p) => p.titulo).join(' · ')
        : `${nome} ${capitulo}`;

  const temas = unicos([
    ...pericopes.flatMap((p) => [p.tema, p.temaHomiletico]),
    ...(intro?.temasPrincipais ?? []),
  ]).slice(0, 8);

  const estrutura = unicos(
    pericopes.flatMap((p) => {
      if (p.outline && p.outline.length > 0) {
        return p.outline.map((item) =>
          pericopes.length > 1 ? `${p.titulo}: ${item}` : item,
        );
      }
      const trecho =
        p.capituloInicio === p.capituloFim
          ? `${p.versiculoInicio}–${p.versiculoFim}`
          : `${p.capituloInicio}:${p.versiculoInicio}–${p.capituloFim}:${p.versiculoFim}`;
      return [`${p.titulo} (${trecho})`];
    }),
  );

  const chavesLivro: VersiculoChaveCap[] = (intro?.versiculosChave ?? [])
    .filter((v) => capituloDaRef(v.referencia) === capitulo)
    .map((v) => ({ referencia: v.referencia, texto: v.texto, explicacao: v.explicacao }));

  const chavesPericope: VersiculoChaveCap[] = pericopes
    .filter((p) => p.textoChave)
    .map((p) => ({
      referencia: p.textoChave!,
      texto: p.temaHomiletico || p.tema,
      explicacao: `Texto-chave da perícope «${p.titulo}»: ${p.tema}.`,
    }));

  const VersiculosChave = (chavesLivro.length > 0 ? chavesLivro : chavesPericope).slice(0, 4);

  const palavrasOriginais = unicos(pericopes.flatMap((p) => p.palavrasOriginais ?? [])).slice(0, 8);

  const blocoLivro = intro
    ? `${nome} (${intro.genero}) é tradicionalmente associado a ${intro.autor}, ${intro.data}. ${intro.contexto}`
    : `${nome} capítulo ${capitulo} deve ser lido no cânon completo, com Cristo como centro da Escritura (Lc 24:27, 44–47).`;

  const blocoPericopes =
    pericopes.length > 0
      ? `Neste capítulo a narrativa/argumento se organiza em ${pericopes.length === 1 ? 'uma unidade' : `${pericopes.length} unidades`}: ${pericopes
          .map((p) => {
            const hom = p.temaHomiletico ? ` — ${p.temaHomiletico}` : '';
            return `«${p.titulo}» (${p.tema}${hom})`;
          })
          .join('; ')}.`
      : `Não há perícope catalogada isolada para este capítulo; leia-o, portanto, no fluxo literário de ${nome} e nos temas do livro${intro ? ` (${intro.temasPrincipais.slice(0, 3).join(', ')})` : ''}.`;

  const blocoTeologia = intro
    ? `Teologicamente, ${nome} ${capitulo} não é um fragmento isolado: pertence à história da aliança. Os temas do livro — ${intro.temasPrincipais.slice(0, 4).join(', ')} — iluminam o texto. A analogia da fé exige ler o capítulo à luz de toda a Escritura: a lei acusa, a promessa sustenta, e o cumprimento está em Cristo.`
    : `A analogia da fé exige ler ${nome} ${capitulo} à luz de toda a Escritura, com Cristo como chave (Jo 5:39).`;

  const resumo = [blocoLivro, blocoPericopes, blocoTeologia].join(' ');

  const contextoHistorico = intro
    ? `${intro.contexto} O capítulo ${capitulo} se insere nesse quadro: ${pericopes[0]?.temaHomiletico || pericopes[0]?.tema || temas[0] || 'o desdobramento da revelação neste trecho'}.`
    : `Capítulo ${capitulo} de ${nome}, no ${info?.testamento === 'AT' ? 'Antigo' : 'Novo'} Testamento.`;

  const significadoTeologico =
    pericopes.find((p) => p.temaHomiletico)?.temaHomiletico
      ? `${pericopes
          .filter((p) => p.temaHomiletico)
          .map((p) => p.temaHomiletico)
          .join(' ')} No cânon, o capítulo serve à revelação do caráter de Deus — santo, fiel à aliança, juiz do mal e salvador do Seu povo — e prepara ou aplica a obra de Cristo.`
      : `Este capítulo revela o caráter de Deus e a condição humana. No conjunto da Escritura, juízo e graça não se separam: a lei expõe o pecado; a promessa aponta o Redentor; a igreja é chamada à fé que obedece.`;

  const aplicacaoPratica = intro
    ? `${intro.aplicacaoPratica} Em ${nome} ${capitulo}, isso se concretiza na obediência ao que o texto de fato ensina — não em slogans. Medite no argumento do capítulo, ore com as palavras da Escritura e pergunte: o que Deus revela de Si, o que exige do Seu povo, e como Cristo cumpre o que aqui se promete ou se exige.`
    : `Leia ${nome} ${capitulo} com oração. Busque o que o texto revela sobre Deus, o pecado, a aliança e a esperança em Cristo; depois aplique em obediência concreta, na igreja e na vida cotidiana.`;

  const perguntasBase = [
    `Qual o argumento literário de ${nome} ${capitulo} no fluxo do livro?`,
    `O que este capítulo revela sobre o caráter de Deus (santidade, fidelidade, juízo, misericórdia)?`,
    `Como o texto descreve a condição humana e a resposta da fé?`,
    `De que modo ${nome} ${capitulo} aponta para Cristo ou é cumprido nEle (Lc 24:44–47)?`,
    `Que obediência concreta a igreja é chamada a viver a partir deste capítulo?`,
  ];

  const perguntasPericope = pericopes
    .slice(0, 2)
    .map((p) => `Na unidade «${p.titulo}», como o tema «${p.tema}» se desdobra no texto?`);

  const perguntasEstudo = unicos([...perguntasPericope, ...perguntasBase, ...(intro?.perguntasEstudo ?? [])]).slice(0, 6);

  return {
    livro: abrev,
    capitulo,
    titulo: titulo.length > 140 ? `${nome} ${capitulo}` : titulo,
    resumo,
    temas: temas.length > 0 ? temas : ['Revelação', 'Aliança', 'Fé e obediência'],
    VersiculosChave,
    aplicacaoPratica,
    perguntasEstudo,
    contextoHistorico,
    estrutura: estrutura.length > 0 ? estrutura : undefined,
    significadoTeologico,
    palavrasOriginais: palavrasOriginais.length > 0 ? palavrasOriginais : undefined,
    fontes: unicos([
      intro ? `Introdução a ${intro.titulo}` : undefined,
      pericopes.length > 0 ? 'Perícopes canônicas do capítulo' : undefined,
      'Analogia da fé (Escritura interpreta Escritura)',
    ]),
    nivel: 'sintese',
  };
}
