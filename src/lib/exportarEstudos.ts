import type { MarcaBiblia } from './estudos';
import { livroPorAbreviacao } from '@/data/biblia';

export function downloadAsFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportToJson(marcas: MarcaBiblia[]) {
  const data = marcas.map(m => ({
    referencia: `${m.livro} ${m.capitulo}:${m.versiculo}`,
    traducao: m.traducao,
    texto: m.texto,
    favorito: m.favorito,
    anotacao: m.anotacao?.texto || null,
    data: new Date(m.dataCriacao).toISOString(),
  }));
  downloadAsFile(JSON.stringify(data, null, 2), 'meus-estudos.json', 'application/json');
}

export function exportToTxt(marcas: MarcaBiblia[]) {
  const lines = marcas.map(m => {
    const livro = livroPorAbreviacao.get(m.livro);
    const ref = `${livro?.nome || m.livro} ${m.capitulo}:${m.versiculo} (${m.traducao})`;
    let out = `${ref}\n${m.texto}`;
    if (m.anotacao?.texto) {
      out += `\n\nAnotação:\n${m.anotacao.texto}`;
    }
    return out;
  });
  const content = lines.join('\n\n━━━━━━━━━━━━━━━━━━━━━━\n\n');
  downloadAsFile(content, 'meus-estudos.txt', 'text/plain;charset=utf-8');
}

export function exportToCsv(marcas: MarcaBiblia[]) {
  const header = 'Livro,Capítulo,Versículo,Tradução,Texto,Favorito,Anotação,Data';
  const rows = marcas.map(m => {
    const livro = livroPorAbreviacao.get(m.livro);
    const ref = livro?.nome || m.livro;
    const texto = `"${m.texto.replace(/"/g, '""')}"`;
    const anotacao = m.anotacao?.texto ? `"${m.anotacao.texto.replace(/"/g, '""')}"` : '';
    return `${ref},${m.capitulo},${m.versiculo},${m.traducao},${texto},${m.favorito},${anotacao},${new Date(m.dataCriacao).toISOString()}`;
  });
  const bom = '\uFEFF';
  downloadAsFile(bom + [header, ...rows].join('\n'), 'meus-estudos.csv', 'text/csv;charset=utf-8');
}
