// Gera indices leves (apenas Set de chaves) a partir dos arquivos de dados completos
// Evita importar 2.5MB+ de dados so para verificar se um versiculo tem comentario/estudo

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');

// === GERAR comentarios-index.ts ===
console.log('Gerando src/data/comentarios-index.ts...');
const comentariosContent = readFileSync(resolve(ROOT, 'src/data/comentarios.ts'), 'utf-8');

// Extrair todas as chamadas add('livro', cap, v, ...) e extrair as chaves unicas
const addPattern = /add\('(\w+)',\s*(\d+),\s*(\d+),/g;
const keys = new Set();
let match;
while ((match = addPattern.exec(comentariosContent)) !== null) {
  keys.add(`${match[1]}:${match[2]}:${match[3]}`);
}

const curatedFiles = [
  'src/data/comentarios-reais/matthew-henry.ts',
  'src/data/comentarios-reais/jamieson-fausset-brown.ts',
  'src/data/comentarios-reais/albert-barnes.ts',
  'src/data/comentarios-reais/gn-matthew-henry.ts',
];
const curatedPattern = /livro:\s*['"](\w+)['"],\s*\n\s*capitulo:\s*(\d+),\s*\n\s*versiculo:\s*(\d+)/g;
const jsonPattern = /"livro":\s*"(\w+)",\s*\n\s*"capitulo":\s*(\d+),\s*\n\s*"versiculo":\s*(\d+)/g;
for (const rel of curatedFiles) {
  const content = readFileSync(resolve(ROOT, rel), 'utf-8');
  curatedPattern.lastIndex = 0;
  jsonPattern.lastIndex = 0;
  while ((match = curatedPattern.exec(content)) !== null) {
    keys.add(`${match[1]}:${match[2]}:${match[3]}`);
  }
  while ((match = jsonPattern.exec(content)) !== null) {
    keys.add(`${match[1]}:${match[2]}:${match[3]}`);
  }
}

const sortedKeys = [...keys].sort();
console.log(`  ${sortedKeys.length} chaves unicas encontradas`);

const comentariosIndex = `// Indice leve de comentarios — apenas Set de chaves para verificacao rapida
// Gerado automaticamente por scripts/generate-light-indexes.mjs
// Evita importar comentarios.ts (2.5MB) quando so precisamos de temComentario()

const COMENTARIOS_KEYS = new Set<string>([
${sortedKeys.map(k => `  '${k}'`).join(',\n')}
]);

export function temComentario(livro: string, capitulo: number, versiculo: number): boolean {
  return COMENTARIOS_KEYS.has(\`\${livro}:\${capitulo}:\${versiculo}\`);
}
`;

writeFileSync(resolve(ROOT, 'src/data/comentarios-index.ts'), comentariosIndex);
console.log(`  -> comentarios-index.ts escrito (${(Buffer.byteLength(comentariosIndex) / 1024).toFixed(1)} KB)`);

// === GERAR estudos-index.ts ===
console.log('Gerando src/data/estudos-index.ts...');
const estudosFiles = [
  resolve(ROOT, 'src/data/estudosTeologicos.ts'),
  resolve(ROOT, 'src/data/estudosClassicosCanon.ts'),
];
const estudoPattern = /livro:\s*'(\w+)',\s*capitulo:\s*(\d+),\s*versiculo:\s*(\d+)/g;
const estudoKeys = new Set();
for (const file of estudosFiles) {
  const estudosContent = readFileSync(file, 'utf-8');
  estudoPattern.lastIndex = 0;
  while ((match = estudoPattern.exec(estudosContent)) !== null) {
    estudoKeys.add(`${match[1]}:${match[2]}:${match[3]}`);
  }
}

const sortedEstudoKeys = [...estudoKeys].sort();
console.log(`  ${sortedEstudoKeys.length} chaves unicas encontradas`);

const estudosIndex = `// Indice leve de estudos teologicos — apenas Set de chaves para verificacao rapida
// Gerado automaticamente por scripts/generate-light-indexes.mjs
// Evita importar estudosTeologicos.ts (1MB+) quando so precisamos de temEstudo()

const ESTUDOS_KEYS = new Set<string>([
${sortedEstudoKeys.map(k => `  '${k}'`).join(',\n')}
]);

export function temEstudo(livro: string, capitulo: number, versiculo: number): boolean {
  return ESTUDOS_KEYS.has(\`\${livro}:\${capitulo}:\${versiculo}\`);
}
`;

writeFileSync(resolve(ROOT, 'src/data/estudos-index.ts'), estudosIndex);
console.log(`  -> estudos-index.ts escrito (${(Buffer.byteLength(estudosIndex) / 1024).toFixed(1)} KB)`);

console.log('\nPronto! Agora atualize os imports em VerseActions.tsx e MobileActionBar.tsx.');
