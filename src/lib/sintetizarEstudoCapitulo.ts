import type { EstudoCapitulo, VersiculoChaveCap } from '@/data/estudosCapitulo';
import { estudosPorLivro } from '@/data/estudosPorLivro';
import { getPericopesCapitulo, type Pericope } from '@/data/biblia/pericopes';
import { livroPorAbreviacao, TODOS_LIVROS, type LivroInfo } from '@/data/biblia/livros';
import { localizacoesBiblicas } from '@/data/atlasBiblico';

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

function escapeReg(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function locaisDoCapitulo(info: LivroInfo, capitulo: number): string[] {
  const prefixes = new Set<string>([
    info.abreviacao,
    info.nome,
    semAcento(info.nome),
    info.abreviacao.replace(/^_/, ''),
  ]);
  const ab = info.abreviacao.replace(/^_/, '');
  prefixes.add(ab.charAt(0).toUpperCase() + ab.slice(1));
  const capRe = new RegExp(
    `^(${[...prefixes].map(escapeReg).join('|')})\\s*${capitulo}(:|\\s|$)`,
    'i',
  );
  const out: string[] = [];
  for (const loc of localizacoesBiblicas) {
    if (loc.versiculos.some((v) => capRe.test(v.trim()))) {
      out.push(`${loc.nome}: ${loc.descricao}`);
    }
  }
  return unicos(out).slice(0, 4);
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

function perguntaEspecifica(
  nome: string,
  capitulo: number,
  pericopes: Pericope[],
  chavesLivro: VersiculoChaveCap[],
  introTemas: string[],
): string {
  const verso = chavesLivro[0];
  if (verso) {
    const trecho = verso.texto.replace(/\s+/g, ' ').trim();
    const curto = trecho.length > 90 ? `${trecho.slice(0, 87)}…` : trecho;
    return `Como ${verso.referencia} («${curto}») governa a leitura de ${nome} ${capitulo} — e onde o cânon retoma essa afirmação?`;
  }
  const p = pericopes[0];
  if (p) {
    return `Na unidade «${p.titulo}» de ${nome} ${capitulo}, o que o texto afirma sobre «${p.tema}» que o restante do livro desenvolve ou corrige?`;
  }
  const tema = introTemas[0];
  if (tema) {
    return `Onde ${nome} ${capitulo} ilustra o tema «${tema}» — e o que o capítulo, lido no próprio teor, não permite forçar?`;
  }
  return `Qual afirmação concreta de ${nome} ${capitulo} (não um slogan) deve governar a leitura deste trecho?`;
}

/**
 * Ficha de estudo para qualquer capítulo dos 66 livros.
 * Perícopes + temas do livro + 1 pergunta específica do capítulo.
 * Sempre `nivel: 'sintese'`. Nunca inventa citação de Henry, Calvino ou contemporâneo.
 */
export function sintetizarEstudoCapitulo(livro: string, capitulo: number): EstudoCapitulo {
  const info = resolverLivroEstudo(livro);
  const abrev = info?.abreviacao ?? livro.toLowerCase();
  const nome = info?.nome ?? livro;
  const total = info?.totalCapitulos;
  const intro = estudosPorLivro[abrev];
  const pericopes = info ? pericopesDoCapitulo(info, capitulo) : [];
  const temasLivro = intro?.temasPrincipais ?? [];

  const tituloPericopes =
    pericopes.length === 1
      ? pericopes[0].titulo
      : pericopes.length > 1
        ? pericopes.map((p) => p.titulo).join(' · ')
        : '';
  const tituloTemas = temasLivro.slice(0, 2).join('; ');
  const tituloBruto = tituloPericopes
    || (tituloTemas ? `${nome} ${capitulo} — ${tituloTemas}` : `${nome} ${capitulo}`);

  const temas = unicos([
    ...pericopes.flatMap((p) => [p.tema, p.temaHomiletico]),
    ...temasLivro,
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

  const posicao = total
    ? `${nome} ${capitulo} (capítulo ${capitulo} de ${total} em ${nome})`
    : `${nome} ${capitulo}`;

  const blocoLivro = intro
    ? `${posicao} se lê no livro ${intro.genero}, associado pela tradição a ${intro.autor} (${intro.data}). Temas do livro que iluminam este capítulo: ${temasLivro.slice(0, 4).join('; ')}.`
    : `${posicao} deve ser lido no cânon completo, com Cristo como centro da Escritura (Lc 24:27, 44–47).`;

  const blocoPericopes =
    pericopes.length > 0
      ? `Unidades pericopais catalogadas neste capítulo (${pericopes.length}): ${pericopes
          .map((p) => {
            const hom = p.temaHomiletico ? ` — ${p.temaHomiletico}` : '';
            return `«${p.titulo}» (${p.tema}${hom})`;
          })
          .join('; ')}.`
      : `Não há perícope isolada catalogada para ${nome} ${capitulo}: leia o capítulo no fluxo literário do livro, sem extrair um título inventado. Os temas de ${nome} (${temasLivro.slice(0, 3).join(', ') || 'revelação, aliança, fé'}) dão o horizonte, não um resumo substituto do texto.`;

  const blocoVerso = VersiculosChave[0]
    ? `Verso que a introdução do livro assinala neste capítulo: ${VersiculosChave[0].referencia} — «${VersiculosChave[0].texto}» (${VersiculosChave[0].explicacao}).`
    : '';

  const blocoTeologia =
    'Esta ficha é síntese automática (introdução do livro + perícopes), não comentário clássico nem ficha profunda. A analogia da fé pede: leia o capítulo à luz de toda a Escritura (Lc 24:44–47; Jo 5:39); a lei acusa, a promessa sustenta, o cumprimento está em Cristo.';

  const resumo = [blocoLivro, blocoPericopes, blocoVerso, blocoTeologia].filter(Boolean).join(' ');

  const contextoHistorico = intro
    ? `Síntese histórica (introdução do livro, não Henry): ${intro.contexto} ${posicao} se insere nesse quadro${
        pericopes[0]
          ? `: a unidade «${pericopes[0].titulo}» trata de ${pericopes[0].temaHomiletico || pericopes[0].tema}`
          : temasLivro[0]
            ? `, no horizonte de «${temasLivro[0]}»`
            : ''
      }.`
    : `${posicao}, no ${info?.testamento === 'AT' ? 'Antigo' : 'Novo'} Testamento.`;

  const generos = unicos(pericopes.map((p) => p.genero));
  const contextoCultural = intro
    ? `Síntese cultural (gênero literário catalogado): ${nome} é ${intro.genero}${
        generos.length ? `; neste capítulo as perícopes são de gênero ${generos.join(', ')}` : ''
      }. Leia segundo o gênero — não transforme parábola em crônica nem epístola em apocalipse.`
    : generos.length
      ? `Síntese cultural: gênero(s) pericopal(is) ${generos.join(', ')}.`
      : undefined;

  const geo = info ? locaisDoCapitulo(info, capitulo) : [];
  const contextoGeografico = geo.length > 0
    ? `Síntese geográfica (atlas já catalogado): ${geo.join(' ')}`
    : undefined;

  const notaExegetica = palavrasOriginais.length > 0
    ? `Síntese exegética (palavras das perícopes, não comentário clássico): ${palavrasOriginais.join('; ')}. Leia cada termo no versículo, não como glossário solto.`
    : undefined;

  const paralelos = unicos(pericopes.flatMap((p) => p.paralelosSinoticos ?? [])).slice(0, 6);
  const notaHermeneutica = [
    'Síntese hermenêutica (analogia da fé, não Henry nem Calvino): leia o capítulo à luz de toda a Escritura (Lc 24:44–47; Jo 5:39). A lei acusa, a promessa sustenta, o cumprimento está em Cristo.',
    paralelos.length > 0 ? `Paralelos sinóticos já catalogados: ${paralelos.join('; ')}.` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const significadoTeologico = pericopes.some((p) => p.temaHomiletico)
    ? `${pericopes
        .filter((p) => p.temaHomiletico)
        .map((p) => `«${p.titulo}»: ${p.temaHomiletico}`)
        .join(' ')} No cânon o capítulo serve à revelação do caráter de Deus — santo, fiel à aliança, juiz do mal e salvador do Seu povo — e prepara ou aplica a obra de Cristo.`
    : temasLivro.length > 0
      ? `${nome} ${capitulo} deve ser lido pelos temas do próprio livro (${temasLivro.slice(0, 3).join(', ')}), não por um resumo genérico. Juízo e graça não se separam: a lei expõe o pecado; a promessa aponta o Redentor.`
      : `Este capítulo revela o caráter de Deus e a condição humana. No conjunto da Escritura, juízo e graça não se separam.`;

  const aplicacaoPratica = intro
    ? `${intro.aplicacaoPratica} Em ${nome} ${capitulo}, aplique o que o texto de fato ensina — não slogans. Ore com as palavras da Escritura: o que Deus revela de Si, o que exige do povo, e como Cristo cumpre o que aqui se promete ou se exige.`
    : `Leia ${nome} ${capitulo} com oração. Busque o que o texto revela sobre Deus, o pecado, a aliança e a esperança em Cristo; depois obedeça na igreja e na vida cotidiana.`;

  const especifica = perguntaEspecifica(nome, capitulo, pericopes, chavesLivro, temasLivro);

  const perguntasBase = [
    `Qual o argumento literário de ${nome} ${capitulo} no fluxo do livro?`,
    `O que ${nome} ${capitulo} revela sobre o caráter de Deus (santidade, fidelidade, juízo, misericórdia) sem importar um tema de outro capítulo?`,
    `De que modo ${nome} ${capitulo} aponta para Cristo ou é cumprido nEle (Lc 24:44–47)?`,
    `Que obediência concreta a igreja é chamada a viver a partir deste capítulo?`,
  ];

  const perguntasEstudo = unicos([especifica, ...perguntasBase]).slice(0, 6);

  return {
    livro: abrev,
    capitulo,
    titulo: tituloBruto.length > 140 ? `${nome} ${capitulo}` : tituloBruto,
    resumo,
    temas: temas.length > 0 ? temas : ['Revelação', 'Aliança', 'Fé e obediência'],
    VersiculosChave,
    aplicacaoPratica,
    perguntasEstudo,
    contextoHistorico,
    contextoCultural,
    contextoGeografico,
    notaExegetica,
    notaHermeneutica,
    estrutura: estrutura.length > 0 ? estrutura : undefined,
    significadoTeologico,
    palavrasOriginais: palavrasOriginais.length > 0 ? palavrasOriginais : undefined,
    fontes: unicos([
      `${nome} ${capitulo} (Escritura)`,
      intro ? `Introdução a ${intro.titulo} (temas e contexto do livro)` : undefined,
      pericopes.length > 0
        ? `Perícopes catalogadas do capítulo (${pericopes.length})`
        : 'Sem perícope isolada catalogada — leitura no fluxo do livro',
      'Analogia da fé (Escritura interpreta Escritura)',
      'Síntese automática — não é Henry, Calvino, Wright nem ficha profunda',
    ]),
    nivel: 'sintese',
  };
}
