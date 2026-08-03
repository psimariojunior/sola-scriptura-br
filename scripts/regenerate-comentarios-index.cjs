// scripts/regenerate-comentarios-index.cjs
// Regenera comentarios-index.ts a partir de comentarios.ts atualizado

const fs = require('fs');

const content = fs.readFileSync('src/data/comentarios.ts', 'utf8');
const re = /add\('([^']+)',\s*(\d+),\s*(\d+),\s*'([^']+)',\s*'([^']*)'/g;
let m;
const keys = new Set();

while ((m = re.exec(content)) !== null) {
  const livro = m[1];
  const cap = m[2];
  const v = m[3];
  keys.add(`${livro}:${cap}:${v}`);
}

const sorted = [...keys].sort();
const lines = [
  '// Indice leve de comentarios — apenas Set de chaves para verificacao rapida',
  '// Gerado automaticamente por scripts/regenerate-comentarios-index.cjs',
  '// Evita importar comentarios.ts (2.5MB) quando so precisamos de temComentario()',
  '',
  `const COMENTARIOS_KEYS = new Set<string>([${sorted.map(k => `  '${k}'`).join(',\n')}]);`,
  '',
  'export function temComentario(livro: string, capitulo: number, versiculo: number): boolean {',
  '  return COMENTARIOS_KEYS.has(`${livro}:${capitulo}:${versiculo}`);',
  '}',
  '',
  'export function totalComentarios(): number {',
  `  return ${sorted.length};`,
  '}',
  ''
];

fs.writeFileSync('src/data/comentarios-index.ts', lines.join('\n'), 'utf8');
console.log(`✅ Index regenerado: ${sorted.length} versículos com comentários`);
