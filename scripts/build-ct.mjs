import { writeFileSync, readFileSync } from 'fs';

const data = JSON.parse(readFileSync('scripts/all-entries.json', 'utf8'));

const entries = data.entries.map(e => {
  const vs = e.variantes.map(v =>
    `      { leitura: ${JSON.stringify(v.leitura)}, manuscritos: [${v.manuscritos.map(m => JSON.stringify(m)).join(', ')}], classificacao: ${JSON.stringify(v.classificacao)} }`
  ).join(',\n');
  let s = `  {\n    id: ${JSON.stringify(e.id)},\n    referencia: ${JSON.stringify(e.referencia)},\n    tipo: ${JSON.stringify(e.tipo)},\n    variantes: [\n${vs}\n    ],\n    explicacao: ${JSON.stringify(e.explicacao)},\n    versiculosAfetados: [${e.versiculosAfetados.map(v => JSON.stringify(v)).join(', ')}]`;
  if (e.pericope) s += `,\n    pericope: ${JSON.stringify(e.pericope)}`;
  if (e.recomendacaoNA28) s += `,\n    recomendacaoNA28: ${JSON.stringify(e.recomendacaoNA28)}`;
  s += '\n  },';
  return s;
});

writeFileSync('src/data/biblia/criticaTextual.ts', data.header + entries.join('\n') + data.footer, 'utf8');
console.log(`Written ${entries.length} entries to criticaTextual.ts`);
