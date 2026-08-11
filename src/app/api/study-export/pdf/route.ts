import { NextRequest, NextResponse } from "next/server";
import { carregarTraducao } from "@/data/biblia/texto/carregar";
import { GREGO, type PalavraGrega } from "@/data/lexicon/grego";
import { crossReferencesMap, type CrossReference } from "@/data/biblia/crossReferences";
import { obterComentarios, type Comentario } from "@/data/comentarios";
import { LIVROS_NT, LIVROS_AT } from "@/data/biblia/livros";

export const runtime = "nodejs";

const ABREV_NOME: Record<string, string> = {};
[...LIVROS_AT, ...LIVROS_NT].forEach((l) => {
  ABREV_NOME[l.abreviacao] = l.nome;
});

const TRADUCOES_NOMES: Record<string, string> = {
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

interface StudyRequest {
  type: "verse" | "chapter" | "word-study";
  reference: string;
  translations: string[];
  includeInterlinear: boolean;
  includeMorphology: boolean;
  includeCrossRefs: boolean;
  includeComments: boolean;
}

function parseReferencia(ref: string) {
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

function formatarRef(livro: string, cap: number, v?: number, vf?: number) {
  const nome = ABREV_NOME[livro] ?? livro;
  if (v !== undefined) {
    const suf = vf && vf !== v ? `-${vf}` : "";
    return `${nome} ${cap}:${v}${suf}`;
  }
  return `${nome} ${cap}`;
}

function escaparHtml(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderizarVersiculos(versiculos: { numero: number; texto: string }[]): string {
  return versiculos
    .map(
      (v) =>
        `<p class="versiculo"><span class="numero-versiculo">${v.numero}</span> ${escaparHtml(v.texto)}</p>`
    )
    .join("\n");
}

function renderizarInterlinear(palavras: PalavraGrega[]): string {
  if (palavras.length === 0) return "<p><em>Nenhuma palavra original encontrada.</em></p>";

  const linhas = palavras
    .map(
      (p) => `
    <tr>
      <td class="strong">${escaparHtml(p.strong)}</td>
      <td class="grego">${escaparHtml(p.palavra)}</td>
      <td>${escaparHtml(p.transliteracao)}</td>
      <td>${escaparHtml(p.definicaoResumida)}</td>
      <td>${escaparHtml(p.categoria)}</td>
    </tr>`
    )
    .join("\n");

  return `
    <table class="tabela-interlinear">
      <thead>
        <tr>
          <th>Strong</th>
          <th>Grego</th>
          <th>Transliteracao</th>
          <th>Definicao</th>
          <th>Categoria</th>
        </tr>
      </thead>
      <tbody>${linhas}</tbody>
    </table>`;
}

function renderizarMorfologia(palavras: PalavraGrega[]): string {
  if (palavras.length === 0) return "<p><em>Nenhum dado morfologico encontrado.</em></p>";

  return palavras
    .map(
      (p) => `
    <div class="morf-item">
      <strong>${escaparHtml(p.palavra)}</strong> (${escaparHtml(p.strong)})
      <span class="morf-tag">${escaparHtml(p.categoria)}</span>
      <p class="morf-detail">${escaparHtml(p.morphologia)}</p>
      <p class="morf-uso"><em>Uso:</em> ${escaparHtml(p.uso)}</p>
    </div>`
    )
    .join("\n");
}

function renderizarReferenciasCruzadas(referencia: string): string {
  const encontradas = buscarReferenciasCruzadas(referencia);
  if (encontradas.length === 0) return "<p><em>Nenhuma referencia cruzada encontrada.</em></p>";

  const tipos: Record<string, string> = {
    parallel: "Paralelo",
    fulfillment: "Cumprimento",
    quotation: "Citacao",
    contrast: "Contraste",
    thematic: "Tematico",
    typology: "Tipologia",
  };

  const linhas = encontradas
    .map(
      (r) => `
    <tr>
      <td>${escaparHtml(r.from)}</td>
      <td>${escaparHtml(r.to)}</td>
      <td><span class="tipo-ref">${tipos[r.type] ?? r.type}</span></td>
      <td>${escaparHtml(r.description ?? "")}</td>
    </tr>`
    )
    .join("\n");

  return `
    <table class="tabela-refs">
      <thead>
        <tr>
          <th>De</th>
          <th>Para</th>
          <th>Tipo</th>
          <th>Descricao</th>
        </tr>
      </thead>
      <tbody>${linhas}</tbody>
    </table>`;
}

function renderizarComentarios(livro: string, cap: number, v?: number): string {
  const encontrados = buscarComentarios(livro, cap, v);
  if (encontrados.length === 0) return "<p><em>Nenhum comentario encontrado.</em></p>";

  const tipos: Record<string, string> = {
    historico: "Historico",
    teologico: "Teologico",
    gramatical: "Gramatical",
    cultural: "Cultural",
    aplicacao: "Aplicacao",
    escatologico: "Escatologico",
  };

  return encontrados
    .map(
      (c) => `
    <div class="comentario">
      <div class="comentario-header">
        <strong>${escaparHtml(c.autor)}</strong>
        <span class="comentario-tipo">${tipos[c.tipo] ?? c.tipo}</span>
        <span class="comentario-verso">v. ${c.versiculo}</span>
      </div>
      <p class="comentario-texto">${escaparHtml(c.texto)}</p>
    </div>`
    )
    .join("\n");
}

function gerarHtml(
  body: StudyRequest,
  textos: Record<string, { nomeCompleto: string; versiculos?: { numero: number; texto: string }[]; erro?: string }>,
  parsed: ReturnType<typeof parseReferencia>
): string {
  const ref = formatarRef(parsed.livro, parsed.capitulo, parsed.versiculo, parsed.fimVersiculo);
  const dataAtual = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const secaoTexto = Object.entries(textos)
    .map(
      ([trad, dados]) => `
      <div class="secao-traducao">
        <h3 class="titulo-traducao">${escaparHtml(dados.nomeCompleto)} (${trad.toUpperCase()})</h3>
        ${dados.versiculos ? renderizarVersiculos(dados.versiculos) : `<p class="erro-trad"><em>${escaparHtml(dados.erro ?? "Indisponivel")}</em></p>`}
      </div>`
    )
    .join("\n");

  const palavrasG = buscarPalavrasGregas(ref);

  const secaoInterlinear =
    body.includeInterlinear && palavrasG.length > 0
      ? `<div class="secao"><h2>Visao Interlinear</h2>${renderizarInterlinear(palavrasG)}</div>`
      : "";

  const secaoMorfologia =
    body.includeMorphology && palavrasG.length > 0
      ? `<div class="secao"><h2>Analise Morfologica</h2>${renderizarMorfologia(palavrasG)}</div>`
      : "";

  const secaoRefs =
    body.includeCrossRefs
      ? `<div class="secao"><h2>Referencias Cruzadas</h2>${renderizarReferenciasCruzadas(ref)}</div>`
      : "";

  const secaoComentarios =
    body.includeComments
      ? `<div class="secao"><h2>Comentarios</h2>${renderizarComentarios(parsed.livro, parsed.capitulo, parsed.versiculo)}</div>`
      : "";

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Estudo Biblico - ${escaparHtml(ref)}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: "Georgia", "Times New Roman", serif;
      color: #1a1a1a;
      line-height: 1.6;
      background: #fff;
      padding: 40px;
    }

    .capa {
      text-align: center;
      padding: 80px 20px 60px;
      border-bottom: 3px double #b8860b;
      margin-bottom: 40px;
      page-break-after: always;
    }

    .capa h1 {
      font-size: 2.4em;
      color: #b8860b;
      margin-bottom: 8px;
      letter-spacing: 1px;
    }

    .capa .subtitulo {
      font-size: 1.3em;
      color: #555;
      font-style: italic;
      margin-bottom: 30px;
    }

    .capa .referencia-grande {
      font-size: 2em;
      font-weight: bold;
      color: #1a1a1a;
      margin: 20px 0;
    }

    .capa .data {
      font-size: 1em;
      color: #888;
      margin-top: 30px;
    }

    .capa .tipo-badge {
      display: inline-block;
      background: #b8860b;
      color: #fff;
      padding: 4px 16px;
      border-radius: 20px;
      font-size: 0.9em;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 12px;
    }

    .secao {
      margin-bottom: 36px;
      page-break-inside: avoid;
    }

    .secao h2 {
      font-size: 1.5em;
      color: #b8860b;
      border-bottom: 2px solid #daa520;
      padding-bottom: 6px;
      margin-bottom: 16px;
    }

    .secao-traducao {
      margin-bottom: 24px;
      page-break-inside: avoid;
    }

    .titulo-traducao {
      font-size: 1.15em;
      color: #555;
      font-style: italic;
      margin-bottom: 10px;
    }

    .versiculo {
      margin-bottom: 10px;
      text-align: justify;
    }

    .numero-versiculo {
      font-weight: bold;
      color: #b8860b;
      font-size: 0.85em;
      margin-right: 4px;
      vertical-align: super;
    }

    .erro-trad {
      color: #999;
      font-style: italic;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 0.92em;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 8px 10px;
      text-align: left;
    }

    th {
      background: #f5f0e6;
      color: #b8860b;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: #fafaf5;
    }

    .strong {
      font-family: monospace;
      color: #8b6914;
    }

    .grego {
      font-size: 1.1em;
      color: #1a1a1a;
    }

    .morf-item {
      margin-bottom: 16px;
      padding: 10px;
      border-left: 3px solid #daa520;
      background: #fdfaf2;
    }

    .morf-tag {
      display: inline-block;
      background: #b8860b;
      color: #fff;
      padding: 1px 8px;
      border-radius: 10px;
      font-size: 0.8em;
      margin-left: 8px;
      text-transform: lowercase;
    }

    .morf-detail {
      margin-top: 4px;
      font-size: 0.9em;
      color: #555;
    }

    .morf-uso {
      font-size: 0.85em;
      color: #777;
    }

    .tipo-ref {
      display: inline-block;
      background: #e8e0cc;
      color: #6b5a1e;
      padding: 2px 8px;
      border-radius: 8px;
      font-size: 0.82em;
      text-transform: capitalize;
    }

    .comentario {
      margin-bottom: 18px;
      padding: 12px 14px;
      background: #fdfaf2;
      border-left: 3px solid #daa520;
      border-radius: 4px;
      page-break-inside: avoid;
    }

    .comentario-header {
      margin-bottom: 6px;
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
    }

    .comentario-header strong {
      color: #b8860b;
    }

    .comentario-tipo {
      background: #e8e0cc;
      color: #6b5a1e;
      padding: 1px 8px;
      border-radius: 10px;
      font-size: 0.78em;
    }

    .comentario-verso {
      color: #999;
      font-size: 0.85em;
    }

    .comentario-texto {
      font-size: 0.95em;
      color: #333;
    }

    .rodape {
      margin-top: 60px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      text-align: center;
      color: #aaa;
      font-size: 0.8em;
    }

    @media print {
      body {
        padding: 0;
        font-size: 11pt;
      }

      .capa {
        padding: 120px 20px 80px;
      }

      .secao {
        page-break-inside: avoid;
      }

      .comentario {
        page-break-inside: avoid;
      }

      table {
        page-break-inside: avoid;
      }

      .rodape::after {
        counter-increment: page;
        content: counter(page);
      }
    }
  </style>
</head>
<body>

  <div class="capa">
    <h1>Estudo Biblico</h1>
    <div class="subtitulo">${escaparHtml(ABREV_NOME[parsed.livro] ?? parsed.livro)}</div>
    <div class="referencia-grande">${escaparHtml(ref)}</div>
    <div class="tipo-badge">${
      body.type === "verse" ? "Estudo de Versiculo" : body.type === "chapter" ? "Estudo de Capitulo" : "Estudo de Palavra"
    }</div>
    <div class="data">${dataAtual}</div>
  </div>

  <div class="secao">
    <h2>Texto Biblico</h2>
    ${secaoTexto}
  </div>

  ${secaoInterlinear}
  ${secaoMorfologia}
  ${secaoRefs}
  ${secaoComentarios}

  <div class="rodape">
    Sola Scriptura BR - Estudo Biblico Exportado em ${escaparHtml(dataAtual)}
  </div>

</body>
</html>`;
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

  const { livro, capitulo, versiculo, fimVersiculo } = parsed;
  const ref = formatarRef(livro, capitulo, versiculo, fimVersiculo);

  const textos: Record<string, { nomeCompleto: string; versiculos?: { numero: number; texto: string }[]; erro?: string }> = {};

  for (const trad of translations) {
    const dados = await carregarTraducao(trad);
    const capData = dados[livro]?.[capitulo];

    if (!capData) {
      textos[trad] = {
        nomeCompleto: TRADUCOES_NOMES[trad] ?? trad,
        erro: `Traducao "${trad}" indisponivel para ${ref}.`,
      };
      continue;
    }

    if (type === "chapter") {
      textos[trad] = {
        nomeCompleto: TRADUCOES_NOMES[trad] ?? trad,
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
        nomeCompleto: TRADUCOES_NOMES[trad] ?? trad,
        versiculos,
      };
    }
  }

  const html = gerarHtml(
    { type, reference, translations, includeInterlinear, includeMorphology, includeCrossRefs, includeComments },
    textos,
    parsed
  );

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="estudo-${ref.replace(/\s+/g, "-").toLowerCase()}.html"`,
    },
  });
}
