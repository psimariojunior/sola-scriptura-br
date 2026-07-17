interface EpubCapitulo {
  titulo: string;
  conteudo: string;
}

interface EpubOpcoes {
  titulo: string;
  autor: string;
  descricao: string;
  capitulos: EpubCapitulo[];
  capa?: string;
  idioma: string;
}

const MIMETYPE = 'application/epub+zip';

let tabela_crc: number;
const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[i] = c;
}

function crc32(dados: Uint8Array): number {
  tabela_crc = 0xffffffff;
  for (let i = 0; i < dados.length; i++) {
    tabela_crc = crcTable[(tabela_crc ^ dados[i]) & 0xff] ^ (tabela_crc >>> 8);
  }
  return (tabela_crc ^ 0xffffffff) >>> 0;
}

function paraUtf8(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

interface ZipEntrada {
  nome: string;
  dados: Uint8Array;
  dataMod: Date;
}

function criarZip(entradas: ZipEntrada[]): Uint8Array {
  const centralDir: Uint8Array[] = [];
  const localHeaders: Uint8Array[] = [];
  let offset = 0;

  for (const entrada of entradas) {
    const nomeBytes = paraUtf8(entrada.nome);
    const crc = crc32(entrada.dados);
    const time = ((entrada.dataMod.getHours() << 11) | (entrada.dataMod.getMinutes() << 5) | (Math.floor(entrada.dataMod.getSeconds() / 2))) & 0xffff;
    const date = (((entrada.dataMod.getFullYear() - 1980) << 9) | ((entrada.dataMod.getMonth() + 1) << 5) | entrada.dataMod.getDate()) & 0xffff;

    const local = new Uint8Array(30 + nomeBytes.length + entrada.dados.length);
    const lv = new DataView(local.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(6, 0, true);
    lv.setUint16(8, 0, true);
    lv.setUint16(10, time, true);
    lv.setUint16(12, date, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, entrada.dados.length, true);
    lv.setUint32(22, entrada.dados.length, true);
    lv.setUint16(26, nomeBytes.length, true);
    lv.setUint16(28, 0, true);
    local.set(nomeBytes, 30);
    local.set(entrada.dados, 30 + nomeBytes.length);
    localHeaders.push(local);

    const central = new Uint8Array(46 + nomeBytes.length);
    const cv = new DataView(central.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(8, 0, true);
    cv.setUint16(10, 0, true);
    cv.setUint16(12, time, true);
    cv.setUint16(14, date, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, entrada.dados.length, true);
    cv.setUint32(24, entrada.dados.length, true);
    cv.setUint16(28, nomeBytes.length, true);
    cv.setUint16(30, 0, true);
    cv.setUint16(32, 0, true);
    cv.setUint16(34, 0, true);
    cv.setUint16(36, 0, true);
    cv.setUint32(38, 0x20, true);
    cv.setUint32(42, offset, true);
    central.set(nomeBytes, 46);
    centralDir.push(central);

    offset += local.length;
  }

  const centralDirOffset = offset;
  let centralDirSize = 0;
  for (const cd of centralDir) centralDirSize += cd.length;

  const endRecord = new Uint8Array(22);
  const ev = new DataView(endRecord.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(4, 0, true);
  ev.setUint16(6, 0, true);
  ev.setUint16(8, entradas.length, true);
  ev.setUint16(10, entradas.length, true);
  ev.setUint32(12, centralDirSize, true);
  ev.setUint32(16, centralDirOffset, true);
  ev.setUint16(20, 0, true);

  const totalSize = offset + centralDirSize + 22;
  const resultado = new Uint8Array(totalSize);
  let pos = 0;
  for (const lh of localHeaders) {
    resultado.set(lh, pos);
    pos += lh.length;
  }
  for (const cd of centralDir) {
    resultado.set(cd, pos);
    pos += cd.length;
  }
  resultado.set(endRecord, pos);
  return resultado;
}

function gerarCss(): string {
  return `
body { font-family: Georgia, 'Times New Roman', serif; margin: 1em; line-height: 1.8; color: #1a1612; }
h1 { font-size: 1.8em; color: #3a2618; margin: 0.5em 0; border-bottom: 2px solid #d4a843; padding-bottom: 0.3em; }
h2 { font-size: 1.4em; color: #7a5030; margin: 1em 0 0.5em; }
h3 { font-size: 1.1em; color: #3a2618; margin: 0.8em 0 0.4em; }
blockquote { background: #f5f0e8; border-left: 3px solid #b48c32; padding: 0.8em 1em; margin: 1em 0; border-radius: 0 6px 6px 0; font-style: italic; }
blockquote strong { font-style: normal; color: #7a5030; }
p { margin: 0.5em 0; text-align: justify; }
.verse { margin: 0.5em 0; text-indent: -1.5em; padding-left: 1.5em; }
.verse-num { font-weight: bold; color: #7a5030; font-size: 0.85em; }
.note { background: #fff; border: 1px solid #e0d8cc; border-radius: 6px; padding: 0.75em; margin: 0.5em 0; font-size: 0.9em; }
sup { font-size: 0.75em; vertical-align: super; }
.cover-title { text-align: center; font-size: 2em; color: #3a2618; margin-top: 3em; }
.cover-author { text-align: center; color: #7a5030; margin-top: 1em; }
.meta { text-align: center; color: #7a6e62; font-size: 0.9em; margin-top: 2em; }
`.trim();
}

function gerarContentOpf(opcoes: EpubOpcoes, capitulosArquivos: string[]): string {
  const agora = new Date().toISOString();
  const temCapa = !!opcoes.capa;

  let manifestItems = '';
  manifestItems += '    <item id="css" href="style.css" media-type="text/css" />\n';
  manifestItems += '    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav" />\n';
  manifestItems += '    <item id="toc ncx" href="toc.ncx" media-type="application/x-dtbncx+xml" />\n';
  if (temCapa) {
    manifestItems += '    <item id="cover-image" href="cover.jpg" media-type="image/jpeg" />\n';
  }

  capitulosArquivos.forEach((arq, i) => {
    manifestItems += `    <item id="chapter${i + 1}" href="${arq}" media-type="application/xhtml+xml" />\n`;
  });

  let spineItems = '';
  capitulosArquivos.forEach((_, i) => {
    spineItems += `    <itemref idref="chapter${i + 1}" />\n`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="bookid" version="3.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="bookid">sola-scriptura-${Date.now()}</dc:identifier>
    <dc:title>${opcoes.titulo}</dc:title>
    <dc:creator>${opcoes.autor}</dc:creator>
    <dc:language>${opcoes.idioma}</dc:language>
    <dc:description>${opcoes.descricao}</dc:description>
    <dc:publisher>Sola Scriptura</dc:publisher>
    <dc:date>${agora.split('T')[0]}</dc:date>
    <meta property="dcterms:modified">${agora}</meta>
  </metadata>
  <manifest>
${manifestItems}  </manifest>
  <spine toc="toc ncx">
${spineItems}  </spine>
</package>`;
}

function gerarTocNcx(opcoes: EpubOpcoes, capitulos: EpubCapitulo[]): string {
  const navPoints = capitulos.map((cap, i) => `
    <navPoint id="navpoint-${i + 1}" playOrder="${i + 1}">
      <navLabel>
        <text>${cap.titulo}</text>
      </navLabel>
      <content src="chapter_${i + 1}.xhtml" />
    </navPoint>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="sola-scriptura-${Date.now()}" />
  </head>
  <docTitle>
    <text>${opcoes.titulo}</text>
  </docTitle>
  <navMap>${navPoints}
  </navMap>
</ncx>`;
}

function gerarNavXhtml(opcoes: EpubOpcoes, capitulos: EpubCapitulo[]): string {
  const links = capitulos.map((cap, i) =>
    `        <li><a href="chapter_${i + 1}.xhtml">${cap.titulo}</a></li>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title>${opcoes.titulo}</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <nav epub:type="toc" id="toc">
    <h1>Sumário</h1>
    <ol>
${links}
    </ol>
  </nav>
</body>
</html>`;
}

export interface PlanoLeituraEpub {
  id: string;
  nome: string;
  descricao: string;
  duracao: number;
  categoria: string;
  dificuldade: string;
  dias: {
    dia: number;
    titulo: string;
    leituras: { livro: string; capituloInicio: number; capituloFim?: number; versiculoInicio?: number; versiculoFim?: number }[];
    reflexao?: string;
    oracao?: string;
  }[];
  metadata?: { totalVersiculos: number; totalCapitulos: number; tempoEstimado: string };
}

function formatarRefLeituraEpub(l: PlanoLeituraEpub['dias'][number]['leituras'][number]): string {
  if (l.capituloFim && l.capituloFim !== l.capituloInicio) {
    return `${l.livro} ${l.capituloInicio}-${l.capituloFim}`;
  }
  if (l.versiculoInicio && l.versiculoFim) {
    return `${l.livro} ${l.capituloInicio}:${l.versiculoInicio}-${l.versiculoFim}`;
  }
  return `${l.livro} ${l.capituloInicio}`;
}

export async function exportPlanEpub(plano: PlanoLeituraEpub): Promise<Blob> {
  const capitulos: EpubCapitulo[] = plano.dias.map(d => {
    const leituras = d.leituras.map(formatarRefLeituraEpub).join(' • ');
    let corpo = `<div class="verse"><strong>${leituras}</strong></div>`;
    if (d.reflexao) corpo += `<blockquote><strong>Reflexão:</strong> ${d.reflexao}</blockquote>`;
    if (d.oracao) corpo += `<blockquote><strong>Oração:</strong> ${d.oracao}</blockquote>`;
    return { titulo: `Dia ${d.dia} — ${d.titulo}`, conteudo: corpo };
  });

  const meta = [
    plano.descricao,
    `Duração: ${plano.duracao} dias`,
    `Categoria: ${plano.categoria}`,
    `Dificuldade: ${plano.dificuldade}`,
    plano.metadata ? `Tempo estimado: ${plano.metadata.tempoEstimado}` : '',
  ].filter(Boolean).join(' · ');

  return gerarEpub({
    titulo: plano.nome,
    autor: 'Sola Scriptura',
    descricao: meta,
    capitulos,
    idioma: 'pt',
  });
}

export interface VersiculoEpub { numero: number; texto: string }

export async function exportChapterEpub(
  livroNome: string,
  capitulo: number,
  versiculos: VersiculoEpub[],
  traducao: string
): Promise<Blob> {
  const corpo = versiculos
    .map(v => `<p class="verse"><sup class="verse-num">${v.numero}</sup> ${v.texto}</p>`)
    .join('\n');

  return gerarEpub({
    titulo: `${livroNome} ${capitulo} (${traducao.toUpperCase()})`,
    autor: 'Sola Scriptura',
    descricao: `${livroNome} capítulo ${capitulo} na tradução ${traducao.toUpperCase()}`,
    capitulos: [{ titulo: `${livroNome} ${capitulo}`, conteudo: corpo }],
    idioma: 'pt',
  });
}

function gerarCapaXhtml(opcoes: EpubOpcoes): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>${opcoes.titulo}</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="cover-title">${opcoes.titulo}</div>
  <div class="cover-author">${opcoes.autor}</div>
  ${opcoes.descricao ? `<div class="meta">${opcoes.descricao}</div>` : ''}
</body>
</html>`;
}

function gerarCapituloXhtml(capitulo: EpubCapitulo, num: number): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>${capitulo.titulo}</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>${capitulo.titulo}</h1>
  ${capitulo.conteudo}
</body>
</html>`;
}

export async function gerarEpub(opcoes: EpubOpcoes): Promise<Blob> {
  const arquivos: ZipEntrada[] = [];
  const dataMod = new Date();

  arquivos.push({ nome: 'mimetype', dados: paraUtf8(MIMETYPE), dataMod });
  arquivos.push({ nome: 'META-INF/container.xml', dados: paraUtf8(`<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml" />
  </rootfiles>
</container>`), dataMod });

  const temCapa = !!opcoes.capa;
  const capitulosXhtml: string[] = [];
  const capitulosArquivos: string[] = [];

  let idxInicio = 0;
  if (temCapa) {
    capitulosArquivos.push('chapter_1.xhtml');
    capitulosXhtml.push(gerarCapaXhtml(opcoes));
    idxInicio = 1;
  }

  opcoes.capitulos.forEach((cap, i) => {
    const nome = `chapter_${idxInicio + i + 1}.xhtml`;
    capitulosArquivos.push(nome);
    capitulosXhtml.push(gerarCapituloXhtml(cap, i));
  });

  arquivos.push({ nome: 'OEBPS/style.css', dados: paraUtf8(gerarCss()), dataMod });
  arquivos.push({ nome: 'OEBPS/content.opf', dados: paraUtf8(gerarContentOpf(opcoes, capitulosArquivos)), dataMod });
  arquivos.push({ nome: 'OEBPS/toc.ncx', dados: paraUtf8(gerarTocNcx(opcoes, opcoes.capitulos)), dataMod });
  arquivos.push({ nome: 'OEBPS/nav.xhtml', dados: paraUtf8(gerarNavXhtml(opcoes, opcoes.capitulos)), dataMod });

  capitulosXhtml.forEach((xhtml, i) => {
    arquivos.push({ nome: `OEBPS/${capitulosArquivos[i]}`, dados: paraUtf8(xhtml), dataMod });
  });

  if (temCapa && opcoes.capa) {
    try {
      const resp = await fetch(opcoes.capa);
      const blob = await resp.blob();
      const buffer = await blob.arrayBuffer();
      arquivos.push({ nome: 'OEBPS/cover.jpg', dados: new Uint8Array(buffer), dataMod });
    } catch {
      // capa indisponível, continua sem
    }
  }

  const zipData = criarZip(arquivos);
  return new Blob([new Uint8Array(zipData)], { type: 'application/epub+zip' });
}
