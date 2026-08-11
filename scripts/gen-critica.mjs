import { writeFileSync, readFileSync } from 'fs';

// Helper to escape strings for TypeScript
function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function entry(id, ref, tipo, variantes, explicacao, versiculos, pericope, rec) {
  const vs = variantes.map(v =>
    `      { leitura: "${esc(v[0])}", manuscritos: [${v[1].map(m => '"' + esc(m) + '"').join(', ')}], classificacao: "${v[2]}" }`
  ).join(',\n');
  let s = `  {\n    id: "${id}",\n    referencia: "${ref}",\n    tipo: "${tipo}",\n    variantes: [\n${vs}\n    ],\n    explicacao: "${esc(explicacao)}",\n    versiculosAfetados: [${versiculos.map(v => '"' + v + '"').join(', ')}]`;
  if (pericope) s += `,\n    pericope: "${esc(pericope)}"`;
  if (rec) s += `,\n    recomendacaoNA28: "${esc(rec)}"`;
  s += '\n  },';
  return s;
}

// Read entries from JSON
const entriesData = JSON.parse(readFileSync(new URL('./critica-entries.json', import.meta.url), 'utf8'));
const entries = entriesData.map(e =>
  entry(e.id, e.referencia, e.tipo, e.variantes, e.explicacao, e.versiculosAfetados, e.pericope, e.recomendacaoNA28)
);

const header = `export interface VarianteTextual {
  id: string;
  referencia: string;
  tipo: 'letras_similares' | 'adicao_omissao' | 'ordem_palavras' | 'substituicao_sinonimos' | 'teologica' | 'relato' | 'numerica' | 'pontuacao';
  variantes: {
    leitura: string;
    manuscritos: string[];
    classificacao: 'forte' | 'moderada' | 'fraca';
  }[];
  explicacao: string;
  versiculosAfetados: string[];
  pericope?: string;
  recomendacaoNA28?: string;
}

export const VARIANTES_TEXTUAIS: VarianteTextual[] = [
${entries.join('\n')}
];

export function getVariantePorReferencia(ref: string): VarianteTextual[] {
  const refNormalizada = ref.toLowerCase().trim();
  return VARIANTES_TEXTUAIS.filter(v => v.referencia === refNormalizada);
}

export function getVariantePorLivro(livro: string): VarianteTextual[] {
  const livroNormalizado = livro.toLowerCase().trim();
  return VARIANTES_TEXTUAIS.filter(v => v.referencia.startsWith(livroNormalizado + ':'));
}

export function temVarianteSignificativa(ref: string): boolean {
  const variantes = getVariantePorReferencia(ref);
  return variantes.some(v => v.variantes.some(vr => vr.classificacao === 'fraca'));
}
`;

writeFileSync('src/data/biblia/criticaTextual.ts', header, 'utf8');
console.log(`Written ${entries.length} entries to criticaTextual.ts`);
