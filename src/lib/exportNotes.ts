import type { Nota } from '@/components/NotaEditor';

export type FormatoNotas = 'txt' | 'html' | 'print';

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch {
    return iso;
  }
}

function separador(tamanho = 60): string {
  return '='.repeat(tamanho);
}

function separadorSecao(): string {
  return '-'.repeat(40);
}

export function exportAsTxt(notas: Nota[]): string {
  const linhas: string[] = [];

  linhas.push(separador());
  linhas.push('MINHAS ANOTAÇÕES');
  linhas.push('Sola Scriptura — solascripturabr.com.br');
  linhas.push(separador());
  linhas.push(`Total: ${notas.length} nota(s)`);
  linhas.push(`Gerado em: ${formatDate(new Date().toISOString())}`);
  linhas.push('');

  for (const nota of notas) {
    linhas.push(separadorSecao());
    linhas.push(nota.titulo || 'Sem título');
    linhas.push(separadorSecao());
    linhas.push('');

    if (nota.tags.length > 0) {
      linhas.push(`Tags: ${nota.tags.join(', ')}`);
    }
    linhas.push(`Criado: ${formatDate(nota.dataCriacao)}`);
    linhas.push(`Atualizado: ${formatDate(nota.dataAtualizacao)}`);
    linhas.push('');

    linhas.push(stripHtml(nota.conteudo));
    linhas.push('');
  }

  linhas.push(separador());
  linhas.push('Gerado por Sola Scriptura');

  return linhas.join('\n');
}

export function exportAsHtml(notas: Nota[]): string {
  const notaRows = notas.map((nota) => {
    const conteudoLimpo = stripHtml(nota.conteudo);
    const tags = nota.tags.length > 0
      ? nota.tags.map((t) => `<span class="tag">${t}</span>`).join(' ')
      : '<span class="tag tag-empty">Sem tag</span>';

    return `
      <tr>
        <td class="titulo-cell">
          <strong>${nota.titulo || 'Sem título'}</strong>
          <div class="tags">${tags}</div>
        </td>
        <td class="conteudo-cell">${conteudoLimpo}</td>
        <td class="meta-cell">${formatDate(nota.dataCriacao)}</td>
      </tr>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minhas Anotações — Sola Scriptura</title>
  <style>
    @page { margin: 1.5cm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: Georgia, 'Times New Roman', serif;
      color: #1a1612;
      background: #faf8f5;
      line-height: 1.6;
      padding: 2rem;
    }
    header {
      text-align: center;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 2px solid #d4a843;
    }
    h1 { font-size: 1.8rem; color: #3a2618; }
    .subtitle { color: #7a6e62; font-size: 0.9rem; margin-top: 0.5rem; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1.5rem;
    }
    th {
      background: #3a2618;
      color: #d4a843;
      padding: 0.75rem 1rem;
      text-align: left;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #e0d8cc;
      vertical-align: top;
    }
    tr:hover td { background: #f5f0e8; }
    .titulo-cell { width: 25%; }
    .titulo-cell strong { color: #3a2618; }
    .conteudo-cell { width: 55%; font-size: 0.9rem; }
    .meta-cell { width: 20%; font-size: 0.8rem; color: #7a6e62; }
    .tags { margin-top: 0.3rem; }
    .tag {
      display: inline-block;
      background: #f5f0e8;
      color: #7a5030;
      font-size: 0.65rem;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .tag-empty { background: #e8e8e8; color: #999; }
    footer {
      text-align: center;
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #e0d8cc;
      color: #7a6e62;
      font-size: 0.8rem;
    }
    @media print {
      body { padding: 0; background: white; }
      tr:hover td { background: transparent; }
      th { background: #3a2618 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <header>
    <h1>Minhas Anotações</h1>
    <p class="subtitle">${notas.length} nota(s) · Gerado em ${formatDate(new Date().toISOString())}</p>
  </header>
  <main>
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Conteúdo</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
${notaRows}
      </tbody>
    </table>
  </main>
  <footer>
    <p>Gerado por Sola Scriptura — solascripturabr.com.br</p>
  </footer>
</body>
</html>`;
}

export function exportAsPrintable(notas: Nota[]): string {
  return exportAsHtml(notas);
}

export function triggerPrint(html: string): void {
  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => {
    win.print();
  }, 300);
}

export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function filtrarNotas(
  notas: Nota[],
  opcoes: { tag?: string; dataInicio?: string; dataFim?: string }
): Nota[] {
  return notas.filter((n) => {
    if (opcoes.tag && !n.tags.includes(opcoes.tag)) return false;
    if (opcoes.dataInicio) {
      const inicio = new Date(opcoes.dataInicio).getTime();
      if (new Date(n.dataCriacao).getTime() < inicio) return false;
    }
    if (opcoes.dataFim) {
      const fim = new Date(opcoes.dataFim).getTime();
      if (new Date(n.dataCriacao).getTime() > fim) return false;
    }
    return true;
  });
}

export function obterTagsUnicas(notas: Nota[]): string[] {
  const tags = new Set<string>();
  for (const n of notas) {
    for (const t of n.tags) tags.add(t);
  }
  return Array.from(tags).sort();
}
