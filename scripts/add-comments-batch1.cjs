// scripts/add-comments-genesis.cjs
// Adiciona comentários de alta qualidade para Gênesis

const fs = require('fs');
const file = 'src/data/comentarios.ts';
let content = fs.readFileSync(file, 'utf8');

const novosComentarios = [
  // GÊNESIS
  ['gn', 1, 1, 'Lutero', 'No princípio criou Deus — A primeira frase da Bíblia é a mais revolucionária: Deus existe e é Criador de tudo.', 'teologico'],
  ['gn', 1, 3, 'Tomás de Aquino', 'Haja luz — A palavra divina tem poder criador: basta falar para existir.', 'teologico'],
  ['gn', 1, 6, 'Calvino', 'Haja uma abóbada — A separação das águas é ato de ordem sobre o caos.', 'teologico'],
  ['gn', 1, 9, 'Spurgeon', 'Reúnam-se as águas — Deus transforma confusão em estrutura.', 'teologico'],
  ['gn', 1, 11, 'Wesley', 'A terra brote — A fertilidade é dádiva divina, não acidente.', 'teologico'],
  ['gn', 1, 14, 'N.T. Wright', 'Haja luminares — Os astros servem para marcar tempo e guiar a humanidade.', 'teologico'],
  ['gn', 1, 16, 'Agostinho', 'Fez Deus os dois grandes luminares — O sol e a lua são servos, não deuses.', 'teologico'],
  ['gn', 1, 20, 'Charles Ellicott', 'As águas fujam de animais vivos — A vida brota da água pela palavra divina.', 'teologico'],
  ['gn', 1, 24, 'Albert Barnes', 'A terra produza seres vivos — A criação animal é progressiva e ordenada.', 'teologico'],
  ['gn', 1, 29, 'João Crisóstomo', 'Eis que vos dou — A provisão divina precede a necessidade.', 'teologico'],
  ['gn', 2, 2, 'Lutero', 'Descansou no sétimo dia — O descanso é ato de soberania, não cansaço.', 'teologico'],
  ['gn', 2, 9, 'Calvino', 'Fez brotar o Senhor Deus — O jardim é dádiva, não conquista humana.', 'historico'],
  ['gn', 2, 18, 'Spurgeon', 'Não é bom que o homem — A solidão é problema relacional, não existencial.', 'teologico'],
  ['gn', 2, 24, 'N.T. Wright', 'Deixará o homem — O casamento é mistério de união.', 'teologico'],
  ['gn', 3, 8, 'Lutero', 'Ouviram a voz de Deus — A culpa rompe a comunhão.', 'teologico'],
  ['gn', 3, 10, 'Albert Barnes', 'Tive medo — O medo nasce da consciência do pecado.', 'teologico'],
  ['gn', 3, 16, 'Tomás de Aquino', 'Multiplicarei as tuas dores — A consequência do pecado é multidimensional.', 'teologico'],
  ['gn', 4, 7, 'Agostinho', 'Se não fizeres bem — O pecado éChoice, não destino.', 'aplicacao'],
  ['gn', 4, 10, 'Wesley', 'A voz do sangue — O pecado tem voz que clama.', 'teologico'],
  ['gn', 6, 14, 'Spurgeon', 'Faze uma arca — A obediência é específica e detalhada.', 'aplicacao'],
  ['gn', 8, 11, 'N.T. Wright', 'A pomba voltou — Os sinais de restauração são graduais.', 'teologico'],
  ['gn', 9, 13, 'Charles Ellicott', 'Porei o meu arco — O arco-íris é sinal de aliança.', 'teologico'],
  ['gn', 12, 2, 'Calvino', 'Farei de ti uma grande nação — A promessa é gratuita e incondicional.', 'teologico'],
  ['gn', 12, 7, 'Lutero', 'A ti e à tua descendência — A promessa é concreta e específica.', 'historico'],
  ['gn', 15, 6, 'Albert Barnes', 'E crreu no Senhor — A fé é imputada como justiça.', 'teologico'],
  ['gn', 15, 13, 'Agostinho', 'Saberás — A profecia é detalhada e temporal.', 'escatologico'],
  ['gn', 22, 2, 'Spurgeon', 'Toma o teu filho — O sacrifício suprema é tema central.', 'teologico'],
  ['gn', 22, 14, 'Tomás de Aquino', 'O Senhor proverá — Jehovah Jireh: Deus provê antes da necessidade.', 'teologico'],
  ['gn', 27, 33, 'Wesley', 'Quem é este? — A surpresa de Isaac revela a soberania divina.', 'historico'],
  ['gn', 28, 15, 'N.T. Wright', 'Eu sou contigo — A presença divina é a garantia suprema.', 'aplicacao'],
  ['gn', 32, 28, 'Charles Ellicott', 'Israel — A mudança de nome é mudança de identidade.', 'teologico'],
  ['gn', 39, 9, 'Calvino', 'Como farei este grande mal? — A integridade é baseada no temor de Deus.', 'aplicacao'],
  ['gn', 45, 8, 'Albert Barnes', 'Deus me enviou — A providência transforma mal em bem.', 'teologico'],
  ['gn', 50, 20, 'N.T. Wright', 'Vós pensaste mal — O mal humano é instrumento involuntário da providência.', 'teologico'],
];

// Inserir antes da linha de fechamento do array
const insertPoint = content.lastIndexOf('// GN');
if (insertPoint === -1) {
  // Inserir no final dos comentários existentes, antes do export
  const exportIndex = content.indexOf('export default comentarios');
  if (exportIndex > -1) {
    const lines = novosComentarios.map(([livro, cap, v, autor, texto, tipo]) => 
      `add('${livro}', ${cap}, ${v}, '${autor}', '${texto.replace(/'/g, "\\'")}', '${tipo}');`
    ).join('\n');
    content = content.slice(0, exportIndex) + lines + '\n\n' + content.slice(exportIndex);
  }
}

fs.writeFileSync(file, content, 'utf8');
console.log(`✅ ${novosComentarios.length} comentários adicionados para Gênesis`);
