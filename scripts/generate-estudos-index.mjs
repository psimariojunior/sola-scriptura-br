import { readFileSync, writeFileSync } from 'fs';

const content = readFileSync('src/data/estudosTeologicos.ts', 'utf-8');
const regex = /livro:\s*'([^']+)',\s*capitulo:\s*(\d+),\s*versiculo:\s*(\d+)/g;
const keys = new Set();
let m;

while ((m = regex.exec(content)) !== null) {
  keys.add(`${m[1]}:${m[2]}:${m[3]}`);
}

// Also check estudosGerados.ts and estudosEspecificos.ts
const geradosContent = readFileSync('src/data/estudosGerados.ts', 'utf-8');
const geradosRegex = /livro:\s*'([^']+)',\s*capitulo:\s*(\d+),\s*versiculo:\s*(\d+)/g;
while ((m = geradosRegex.exec(geradosContent)) !== null) {
  keys.add(`${m[1]}:${m[2]}:${m[3]}`);
}

const especificosContent = readFileSync('src/data/estudosEspecificos.ts', 'utf-8');
const especificosRegex = /livro:\s*'([^']+)',\s*capitulo:\s*(\d+),\s*versiculo:\s*(\d+)/g;
while ((m = especificosRegex.exec(especificosContent)) !== null) {
  keys.add(`${m[1]}:${m[2]}:${m[3]}`);
}

console.log(`Total unique verse keys: ${keys.size}`);

const sortedKeys = [...keys].sort();

const output = `// Indice leve de estudos teologicos — apenas Set de chaves para verificacao rapida
// Gerado automaticamente por scripts/generate-estudos-index.mjs
// Evita importar estudosTeologicos.ts (1MB+) quando so precisamos de temEstudo()

const ESTUDOS_KEYS = new Set<string>([
${sortedKeys.map(k => `  '${k}'`).join(',\n')}
]);

export function temEstudo(livro: string, capitulo: number, versiculo: number): boolean {
  return ESTUDOS_KEYS.has(\`\${livro}:\${capitulo}:\${versiculo}\`);
}
`;

writeFileSync('src/data/estudos-index.ts', output, 'utf-8');
console.log(`✅ estudos-index.ts atualizado com ${keys.size} versículos`);
