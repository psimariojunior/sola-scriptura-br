const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'estudosTeologicos.ts');
const content = fs.readFileSync(filePath, 'utf8');

const existingRefs = new Set();
const refRegex = /livro:\s*'([^']+)',\s*capitulo:\s*(\d+),\s*versiculo:\s*(\d+)/g;
let m;
while ((m = refRegex.exec(content)) !== null) {
  existingRefs.add(`${m[1]}:${m[2]}:${m[3]}`);
}
console.log(`Estudos existentes: ${existingRefs.size}`);

const T = {
  ag: { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística' },
  ta: { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica' },
  lu: { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma' },
  ca: { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma' },
  we: { teologo: 'Wesley', periodo: '1703-1791', tradicao: 'Metodista' },
  sp: { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista' },
  ba: { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética' },
  le: { teologo: 'C.S. Lewis', periodo: '1898-1963', tradicao: 'Evangélica' },
  wi: { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica' },
  st: { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica' },
};

function I(t, v, r, c) {
  return { ...t, visao: v, resumo: r, citacao: c };
}

function S(liv, cap, ver, tema, ctx, interps) {
  return { livro: liv, capitulo: cap, versiculo: ver, tema, contexto: ctx, interpretacoes: interps };
}

const studies = [];

function add(liv, cap, ver, tema, ctx, interps) {
  const ref = `${liv}:${cap}:${ver}`;
  if (!existingRefs.has(ref)) {
    studies.push(S(liv, cap, ver, tema, ctx, interps));
  }
}

const d = require('./studies-data.cjs');
d(add, T, I);

const insertPoint = content.lastIndexOf('];');
if (insertPoint === -1) { console.error('Could not find insert point'); process.exit(1); }

let newContent = '';
for (const study of studies) {
  const lines = [];
  lines.push('  {');
  lines.push(`    livro: '${study.livro}', capitulo: ${study.capitulo}, versiculo: ${study.versiculo},`);
  lines.push(`    tema: '${study.tema.replace(/'/g, "\\'")}',`);
  lines.push(`    contexto: '${study.contexto.replace(/'/g, "\\'")}',`);
  lines.push('    interpretacoes: [');
  for (const interp of study.interpretacoes) {
    lines.push(`      { teologo: '${interp.teologo.replace(/'/g, "\\'")}', periodo: '${interp.periodo.replace(/'/g, "\\'")}', tradicao: '${interp.tradicao.replace(/'/g, "\\'")}', visao: '${interp.visao.replace(/'/g, "\\'")}', resumo: '${interp.resumo.replace(/'/g, "\\'")}', citacao: '${interp.citacao.replace(/'/g, "\\'")}' },`);
  }
  lines.push('    ],');
  lines.push('  },');
  newContent += lines.join('\n') + '\n';
}

const finalContent = content.slice(0, insertPoint) + '\n' + newContent + content.slice(insertPoint);
fs.writeFileSync(filePath, finalContent, 'utf8');

const newCount = existingRefs.size + studies.length;
console.log(`Novos estudos adicionados: ${studies.length}`);
console.log(`Total de estudos: ${newCount}`);
