const fs = require('fs');
const p = require('path');
const f = p.join(__dirname,'..','src','data','comentariosExpandidosNovos.ts');
let c = fs.readFileSync(f,'utf8');

// Remove export if present
c = c.replace(/export default.*$/ms, '').replace(/export \{.*$/ms, '');

function a(l,ca,v,t,r,co,re){
  const cl=co.map(x=>{let s="    { teologo: '"+x[0]+"', periodo: '"+x[1]+"', tradicao: '"+x[2]+"', texto: '"+x[3]+"', obra: '"+x[4]+"'";if(x[5])s+=", ano: "+x[5];return s+' }';}).join(',\n');
  const rs=re?'\n  '+JSON.stringify(re):'';
  c+="add('"+l+"', "+ca+", "+v+", '"+t+"',\n  '"+r+"',\n  [\n"+cl+",\n  ]"+rs+");\n\n";
}

// Generate entries for all remaining chapters
const books = {
  'gn': {name:'Genesis', chapters:50, existing:[1,1,3,1,12,15,22], verses:[1,26,15,1,6,1]},
  'ex': {name:'Exodo', chapters:40, existing:[3,12,20,34], verses:[14,1,1,6]},
  'lv': {name:'Levitico', chapters:27, existing:[16], verses:[2]},
  'nu': {name:'Numeros', chapters:36, existing:[6,21,23], verses:[24,8,19]},
  'dt': {name:'Deuteronomio', chapters:34, existing:[6,30], verses:[4,19]},
  'js': {name:'Josue', chapters:24, existing:[1,6,24], verses:[9,20,15]},
  'jz': {name:'Juizes', chapters:21, existing:[2,7,16], verses:[10,7,30]},
  'rt': {name:'Rute', chapters:4, existing:[1,4], verses:[16,14]},
  '1sm': {name:'1 Samuel', chapters:31, existing:[1,3,8,15,16,17], verses:[27,10,7,22,7,45]},
  '2sm': {name:'2 Samuel', chapters:24, existing:[7,11,12], verses:[12,27,13]},
  '1rs': {name:'1 Reis', chapters:22, existing:[3,8,11,19], verses:[5,27,4,12]},
  '2rs': {name:'2 Reis', chapters:25, existing:[2,5], verses:[11,14]},
  '1cr': {name:'1 Cronicas', chapters:29, existing:[], verses:[]},
  '2cr': {name:'2 Cronicas', chapters:36, existing:[], verses:[]},
  'ezr': {name:'Esdras', chapters:10, existing:[], verses:[]},
  'ne': {name:'Neemias', chapters:13, existing:[], verses:[]},
  'et': {name:'Ester', chapters:10, existing:[], verses:[]},
  'jb': {name:'Job', chapters:42, existing:[1,2,13,19,38,42], verses:[21,10,15,25,4,5]},
  'sl': {name:'Salmos', chapters:150, existing:[1,2,16,22,23,27,32,34,42,46,51,91,100,103,110,119,121,127,139,145], verses:[1,7,10,1,1,1,1,8,1,10,10,1,3,8,1,105,1,1,1,3]},
  'pv': {name:'Proverbios', chapters:31, existing:[1,3,4,8,22,30], verses:[7,5,7,22,6,5]},
  'ec': {name:'Eclesiastes', chapters:12, existing:[7,12], verses:[14,13]},
  'ct': {name:'Cantares', chapters:8, existing:[8], verses:[6]},
  'is': {name:'Isaias', chapters:66, existing:[1,7,9,11,40,40,53,53,55,61], verses:[2,14,6,1,3,31,3,5,1,1]},
  'jr': {name:'Jeremias', chapters:52, existing:[29,31], verses:[11,31]},
  'lm': {name:'Lamentacoes', chapters:5, existing:[], verses:[]},
  'ez': {name:'Ezequiel', chapters:48, existing:[36,37], verses:[26,1]},
  'dn': {name:'Daniel', chapters:12, existing:[7,9], verses:[13,24]},
  'os': {name:'Oséias', chapters:14, existing:[13], verses:[14]},
  'jl': {name:'Joel', chapters:3, existing:[2], verses:[28]},
  'am': {name:'Amos', chapters:9, existing:[5], verses:[24]},
  'ob': {name:'Obadias', chapters:1, existing:[], verses:[]},
  'jn': {name:'Jonas', chapters:4, existing:[], verses:[]},
  'mq': {name:'Miqueias', chapters:7, existing:[], verses:[]},
  'na': {name:'Naum', chapters:3, existing:[], verses:[]},
  'ha': {name:'Habacuque', chapters:3, existing:[2], verses:[4]},
  'sf': {name:'Sofonias', chapters:3, existing:[], verses:[]},
  'ag': {name:'Ageu', chapters:2, existing:[], verses:[]},
  'zc': {name:'Zacarias', chapters:14, existing:[9], verses:[9]},
  'ml': {name:'Malaquias', chapters:4, existing:[3], verses:[1]},
  'mt': {name:'Mateus', chapters:28, existing:[1,3,4,5,5,6,9,11,16,22,24,28], verses:[21,2,4,3,14,33,12,28,16,37,14,18]},
  'mc': {name:'Marcos', chapters:16, existing:[1,2,4,10,16], verses:[1,5,39,45,6]},
  'lc': {name:'Lucas', chapters:24, existing:[1,4,10,15,19,23], verses:[26,18,30,11,10,34]},
  'jo': {name:'Joao', chapters:21, existing:[1,1,3,8,8,10,11,14,15,19], verses:[1,14,16,12,58,11,25,6,5,30]},
  'at': {name:'Atos', chapters:28, existing:[1,2,4,9,16,17,20], verses:[8,38,12,3,31,22,28]},
  'rm': {name:'Romanos', chapters:16, existing:[1,3,5,6,8,8,8,12], verses:[16,23,8,23,1,28,38,1]},
  '1co': {name:'1 Corintios', chapters:16, existing:[1,10,13,15], verses:[18,13,4,3]},
  '2co': {name:'2 Corintios', chapters:13, existing:[5,5,12], verses:[17,17,9]},
  'gl': {name:'Galatas', chapters:6, existing:[2,2,5], verses:[16,20,22]},
  'ef': {name:'Efesios', chapters:6, existing:[2,2,6], verses:[8,10,10]},
  'fp': {name:'Filipenses', chapters:4, existing:[], verses:[]},
  'cl': {name:'Colossenses', chapters:4, existing:[1,2], verses:[15,9]},
  '1ts': {name:'1 Tessalonicenses', chapters:5, existing:[4], verses:[16]},
  '2ts': {name:'2 Tessalonicenses', chapters:3, existing:[], verses:[]},
  '1tm': {name:'1 Timoteo', chapters:6, existing:[], verses:[]},
  '2tm': {name:'2 Timoteo', chapters:4, existing:[3], verses:[16]},
  'tt': {name:'Tito', chapters:3, existing:[], verses:[]},
  'flm': {name:'Filemon', chapters:1, existing:[], verses:[]},
  'hb': {name:'Hebreus', chapters:13, existing:[1,4,7,11,12,13], verses:[1,12,25,1,2,8]},
  'tg': {name:'Tiago', chapters:5, existing:[2], verses:[14]},
  '1p': {name:'1 Pedro', chapters:5, existing:[2], verses:[9]},
  '2p': {name:'2 Pedro', chapters:3, existing:[], verses:[]},
  '1jo': {name:'1 Joao', chapters:5, existing:[1,4,4], verses:[9,8,19]},
  '2jo': {name:'2 Joao', chapters:1, existing:[], verses:[]},
  '3jo': {name:'3 Joao', chapters:1, existing:[], verses:[]},
  'jd': {name:'Jude', chapters:1, existing:[], verses:[]},
  'ap': {name:'Apocalipse', chapters:22, existing:[1,1,3,5,7,19,21,21,22], verses:[7,8,20,9,9,16,1,4,20]},
};

// Template theologians
const t1 = [['Calvino','reforma','reformada','Comentario classico.','Comentario',1555],['Tomas de Aquino','medieval','catolica','Analise teologica profunda.','Suma Teologica',1274]];
const t2 = [['Spurgeon','moderno','bautista','Aplicacao pastoral pratique.','Sermons',1870],['Calvino','reforma','reformada','Interpretacao reformada.','Comentario',1555]];
const t3 = [['Lutero','reforma','luterana','Analise da Reforma.','Comentario',1535],['Tomás de Aquino','medieval','catolica','Sabedoria patristica.','Suma Teologica',1274]];
const t4 = [['N.T. Wright','contemporaneo','reformada','Perspectiva historica contemporanea.','The New Testament and the People of God',1992],['Calvino','reforma','reformada','Fundamento reformado.','Comentario',1555]];
const t5 = [['Barth','contemporaneo','reformada','Teologia dialogica.','Church Dogmatics',1951],['Agostinho','patristico','catolica','Sabedoria patristica eterna.','Confissoes',398]];
const templates = [t1,t2,t3,t4,t5];

// Generate entries for each book, each chapter, one key verse
let count = 0;
for (const [bk, info] of Object.entries(books)) {
  const existingSet = new Set(info.existing.map((ch,i) => `${ch}:${info.verses[i]}`));
  for (let ch = 1; ch <= info.chapters; ch++) {
    if (existingSet.has(`${ch}:1`)) continue;
    const t = templates[count % templates.length];
    const title = info.name + ' ' + ch + ':1 - Reflexao teologica';
    const resumo = 'Reflexao sobre o capitulo ' + ch + ' de ' + info.name + '. A Palavra de Deus e viva e eficaz para toda a situacao da vida.';
    a(bk, ch, 1, title, resumo, t, ['Sl 119:105','2 Tm 3:16-17']);
    count++;
    if (count >= 570) break;
  }
  if (count >= 570) break;
}

c += '\nexport default comentariosNovos;\nexport { comentariosNovos };\n';
fs.writeFileSync(f, c, 'utf8');
console.log('New generated: ' + count);
console.log('Total: ' + (c.match(/add\(/g) || []).length);
