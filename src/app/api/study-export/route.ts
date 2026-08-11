import { NextRequest, NextResponse } from "next/server";
import { carregarTraducao } from "@/data/biblia/texto/carregar";
import { GREGO, type PalavraGrega } from "@/data/lexicon/grego";
import { palavrasHebraicas, type PalavraHebraica } from "@/data/lexicon/hebraico";
import { crossReferencesMap, type CrossReference } from "@/data/biblia/crossReferences";
import { obterComentarios, type Comentario } from "@/data/comentarios";
import { LIVROS_NT, LIVROS_AT } from "@/data/biblia/livros";

export const runtime = "nodejs";

const ABREV_NOME: Record<string, string> = {};
[...LIVROS_AT, ...LIVROS_NT].forEach((l) => {
  ABREV_NOME[l.abreviacao] = l.nome;
});

interface StudyRequest {
  type: "verse" | "chapter" | "word-study";
  reference: string;
  translations: string[];
  includeInterlinear: boolean;
  includeMorphology: boolean;
  includeCrossRefs: boolean;
  includeComments: boolean;
}

function parseReferencia(ref: string): {
  livro: string;
  capitulo: number;
  versiculo?: number;
  fimVersiculo?: number;
  nomeLivro: string;
} {
  const limpo = ref.trim().replace(/\s+/g, " ");
  const match = limpo.match(/^(\d?\s*[A-Za-záéíóúãõêôç]+)\s+(\d+):(\d+)(?:\s*-\s*(\d+))?$/i);
  if (!match) {
    throw new Error(`Referencia invalida: "${ref}". Use formato "Jo 3:16" ou "1 Co 13:1-8".`);
  }

  const [, livroRaw, cap, v1, v2] = match;
  const livroLower = livroRaw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const todasAbrevs = [...LIVROS_AT, ...LIVROS_NT];
  const livroInfo = todasAbrevs.find((l) => {
    const abrevNorm = l.abreviacao.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const nomeNorm = l.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return abrevNorm === livroLower || nomeNorm === livroLower;
  });

  if (!livroInfo) {
    throw new Error(`Livro nao encontrado: "${livroRaw}".`);
  }

  return {
    livro: livroInfo.abreviacao,
    capitulo: parseInt(cap, 10),
    versiculo: v1 ? parseInt(v1, 10) : undefined,
    fimVersiculo: v2 ? parseInt(v2, 10) : undefined,
    nomeLivro: livroInfo.nome,
  };
}

function buscarReferenciasCruzadas(referencia: string): CrossReference[] {
  const doMap = crossReferencesMap[referencia] ?? [];
  const paraMap: CrossReference[] = [];
  for (const chave of Object.keys(crossReferencesMap)) {
    for (const r of crossReferencesMap[chave]) {
      if (r.to === referencia) paraMap.push(r);
    }
  }
  const todos = [...doMap];
  for (const r of paraMap) {
    if (!todos.some((t) => t.from === r.from && t.to === r.to)) {
      todos.push(r);
    }
  }
  return todos;
}

function buscarPalavrasGregas(referencia: string): PalavraGrega[] {
  return GREGO.filter((p) => p.versiculos.some((v) => v === referencia));
}

function buscarPalavrasHebraicas(_referencia: string): PalavraHebraica[] {
  return palavrasHebraicas.filter(() => false);
}

function buscarComentarios(livro: string, capitulo: number, versiculo?: number): Comentario[] {
  if (versiculo !== undefined) {
    return obterComentarios(livro, capitulo, versiculo);
  }
  const todos: Comentario[] = [];
  for (let v = 1; v <= 176; v++) {
    todos.push(...obterComentarios(livro, capitulo, v));
  }
  return todos;
}

function formatarReferencia(livro: string, capitulo: number, versiculo?: number, fim?: number): string {
  const nome = ABREV_NOME[livro] ?? livro;
  if (versiculo !== undefined) {
    const suf = fim && fim !== versiculo ? `-${fim}` : "";
    return `${nome} ${capitulo}:${versiculo}${suf}`;
  }
  return `${nome} ${capitulo}`;
}

export async function POST(request: NextRequest) {
  let body: StudyRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ erro: "JSON invalido" }, { status: 400 });
  }

  const {
    type,
    reference,
    translations = ["nvi"],
    includeInterlinear = false,
    includeMorphology = false,
    includeCrossRefs = false,
    includeComments = false,
  } = body;

  if (!reference?.trim()) {
    return NextResponse.json({ erro: "Campo 'reference' e obrigatorio." }, { status: 400 });
  }

  if (!type || !["verse", "chapter", "word-study"].includes(type)) {
    return NextResponse.json({ erro: "Campo 'type' invalido. Use: verse, chapter ou word-study." }, { status: 400 });
  }

  let parsed;
  try {
    parsed = parseReferencia(reference);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ erro: msg }, { status: 400 });
  }

  const { livro, capitulo, versiculo, fimVersiculo, nomeLivro } = parsed;
  const referenciaFormatada = formatarReferencia(livro, capitulo, versiculo, fimVersiculo);

  const resultado: Record<string, unknown> = {
    meta: {
      tipo: type,
      referencia: referenciaFormatada,
      data: new Date().toISOString(),
      idioma: "pt-BR",
    },
    texto: {} as Record<string, unknown>,
  };

  const traducoesTraduzidas: Record<string, string> = {
    arc: "Almeida Revisada e Corrigida",
    nvi: "Nova Versao Internacional",
    ara: "Almeida Revisada Atualizada",
    acf: "Almeida Corrigida e Fiel",
    kjv: "King James Version",
    web: "World English Bible",
    nvt: "Nova Traducao na Linguagem de Hoje",
    kja: "Nova Traducao-Jovens Atualizada",
    aa: "Nova Traducao na Linguagem de Hoje (1993)",
    nbv: "Nova Biblia Viva",
    naa: "Nova Almeida Atualizada",
    ntlh: "Nova Traducao na Linguagem de Hoje",
  };

  const textos: Record<string, unknown> = {};

  for (const trad of translations) {
    const dados = await carregarTraducao(trad);
    const capData = dados[livro]?.[capitulo];

    if (!capData) {
      textos[trad] = {
        nomeCompleto: traducoesTraduzidas[trad] ?? trad,
        erro: `Traducao "${trad}" indisponivel para ${referenciaFormatada}.`,
      };
      continue;
    }

    if (type === "chapter") {
      textos[trad] = {
        nomeCompleto: traducoesTraduzidas[trad] ?? trad,
        versiculos: capData.map((t, i) => ({ numero: i + 1, texto: t })),
      };
    } else {
      const inicio = (versiculo ?? 1) - 1;
      const fim = fimVersiculo ?? (versiculo ?? capData.length);
      const versiculos = [];
      for (let v = inicio; v < Math.min(fim, capData.length); v++) {
        versiculos.push({ numero: v + 1, texto: capData[v] });
      }
      textos[trad] = {
        nomeCompleto: traducoesTraduzidas[trad] ?? trad,
        versiculos,
      };
    }
  }

  resultado.texto = textos;

  if (type === "verse" || type === "chapter") {
    const refAlvo = versiculo !== undefined
      ? `${ABREV_NOME[livro] ?? livro} ${capitulo}:${versiculo}`
      : `${ABREV_NOME[livro] ?? livro} ${capitulo}`;

    if (includeInterlinear) {
      const palavrasGregas = buscarPalavrasGregas(refAlvo);
      const palavrasHebraicas = buscarPalavrasHebraicas(refAlvo);
      resultado.interlinear = {
        gregos: palavrasGregas.map((p) => ({
          strong: p.strong,
          palavra: p.palavra,
          transliteracao: p.transliteracao,
          definicao: p.definicaoResumida,
          categoria: p.categoria,
          pronuncia: p.pronuncia,
        })),
        hebraicos: palavrasHebraicas.map((p) => ({
          strong: p.strong,
          palavra: p.palavra,
          transliteracao: p.transliteracao,
          definicao: p.definicao,
          pronuncia: p.pronuncia,
        })),
      };
    }

    if (includeMorphology) {
      const palavrasG = buscarPalavrasGregas(refAlvo);
      resultado.morfologia = palavrasG.map((p) => ({
        strong: p.strong,
        palavra: p.palavra,
        morphologia: p.morphologia,
        uso: p.uso,
      }));
    }

    if (includeCrossRefs) {
      const refsEncontradas = buscarReferenciasCruzadas(
        versiculo !== undefined
          ? `${ABREV_NOME[livro] ?? livro} ${capitulo}:${versiculo}`
          : `${ABREV_NOME[livro] ?? livro} ${capitulo}`
      );

      resultado.referenciasCruzadas = refsEncontradas.map((r) => ({
        de: r.from,
        para: r.to,
        tipo: r.type,
        descricao: r.description,
      }));
    }

    if (includeComments) {
      const comentariosEncontrados = buscarComentarios(livro, capitulo, versiculo);
      resultado.comentarios = comentariosEncontrados.map((c) => ({
        autor: c.autor,
        texto: c.texto,
        tipo: c.tipo,
        versiculo: c.versiculo,
      }));
    }
  }

  if (type === "word-study") {
    const todasPalavrasG = GREGO.filter((p) => {
      const livroNome = (ABREV_NOME[livro] ?? livro).toLowerCase();
      return p.uso.toLowerCase().includes(livroNome);
    });

    resultado.estudoPalavras = {
      gregos: todasPalavrasG.slice(0, 50).map((p) => ({
        strong: p.strong,
        palavra: p.palavra,
        transliteracao: p.transliteracao,
        definicao: p.definicaoResumida,
        categoria: p.categoria,
        morphologia: p.morphologia,
        uso: p.uso,
        frequencia: p.frequencia,
        versiculos: p.versiculos,
      })),
      total: todasPalavrasG.length,
    };
  }

  return NextResponse.json(resultado);
}
