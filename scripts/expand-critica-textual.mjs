import { writeFileSync } from 'fs';
import { join } from 'path';

const content = `import type { VarianteTextual } from "./criticaTextual";

// This file is auto-generated. See scripts/expand-critica-textual.mjs
// placeholder to not break imports
export {};
`;

// We'll write the actual file directly
const filePath = join(process.cwd(), 'src/data/biblia/criticaTextual.ts');

const fileContent = \`export interface VarianteTextual {
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
\${buildEntries()}
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
\`;

console.log('This approach has issues. Using direct write instead.');
