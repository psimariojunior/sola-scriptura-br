import { writeFileSync } from 'fs';

// Build entries programmatically
const E = [];
function a(id,ref,tipo,vs,exp,vf,pe,re){
  E.push({id,referencia:ref,tipo,variantes:vs.map(v=>({leitura:v[0],manuscritos:v[1],classificacao:v[2]})),explicacao:exp,versiculosAfetados:vf,...(pe?{pericope:pe}:{}),...(re?{recomendacaoNA28}:)});
}
function s(o){return JSON.stringify(o);}

// All 300+ entries inline
// The data is too large for inline definition, so we write a minimal version
// and expand in the next step

// Write header
const hdr = `export interface VarianteTextual {
  id: string;
  referencia: string;
  tipo: 'letras_similares' | 'adicao_omissao' | 'ordem_palavras' | 'substituicao_sinonimos' | 'teologica' | 'relato' | 'numerica' | 'pontuacao';
  variantes: { leitura: string; manuscritos: string[]; classificacao: 'forte' | 'moderada' | 'fraca'; }[];
  explicacao: string;
  versiculosAfetados: string[];
  pericope?: string;
  recomendacaoNA28?: string;
}

export const VARIANTES_TEXTUAIS: VarianteTextual[] = [
`;

const ftr = `];

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

writeFileSync('src/data/biblia/criticaTextual.ts', hdr + '];\n' + ftr, 'utf8');
console.log('Header written. Now run the data injector.');
