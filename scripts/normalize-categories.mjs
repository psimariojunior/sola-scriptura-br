import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const filePath = join(process.cwd(), 'src/data/estudosTeologicosExpandidos.ts');
const content = readFileSync(filePath, 'utf-8');

// 15 main categories and their mappings
const CATEGORY_MAP = {
  // Doutrinas Fundamentais
  'Teologia Proper': 'Doutrinas Fundamentais',
  'Atributos': 'Doutrinas Fundamentais',
  'Conhecimento de Deus': 'Doutrinas Fundamentais',
  'Trindade': 'Doutrinas Fundamentais',

  // Cristologia
  'Natureza de Cristo': 'Cristologia',
  'Messias': 'Cristologia',
  'Messianismo': 'Cristologia',
  'Cruz': 'Cristologia',
  'Ressurreição': 'Cristologia',

  // Pneumatologia
  'Espírito Santo': 'Pneumatologia',
  'Natureza do Espirito Santo': 'Pneumatologia',
  'Dons Espirituais': 'Pneumatologia',
  'Dons': 'Pneumatologia',
  'Uncao': 'Pneumatologia',
  'União': 'Pneumatologia',
  'Experiencias Espirituais': 'Pneumatologia',

  // Bibliologia
  'Escritura': 'Bibliologia',
  'Canone': 'Bibliologia',
  'Manuscritos': 'Bibliologia',
  'Crítica Textual': 'Bibliologia',
  'Textual': 'Bibliologia',
  'Textos': 'Bibliologia',
  'Tradução': 'Bibliologia',
  'Linguas Biblicas': 'Bibliologia',
  'Línguas': 'Bibliologia',
  'Hebraico': 'Bibliologia',
  'Literatura Biblica': 'Bibliologia',
  'Generos Literarios': 'Bibliologia',
  'Classificacao': 'Bibliologia',
  'Teólogos Clássicos': 'Bibliologia',

  // Angelologia
  'Seres Angelicais': 'Angelologia',
  'Ordem Angelical': 'Angelologia',
  'Ministerio Angelical': 'Angelologia',
  'Seres Demoniacos': 'Angelologia',
  'Demonologia': 'Angelologia',
  'Guerra Espiritual': 'Angelologia',

  // Antropologia
  'Doutrina do Pecado': 'Antropologia',
  'Hereditariedade do Pecado': 'Antropologia',
  'Identidade': 'Antropologia',
  'Identidade Cristã': 'Antropologia',

  // Hamartiologia
  'Idolatria': 'Hamartiologia',

  // Soteriologia
  'Salvação': 'Soteriologia',
  'Salvacao': 'Soteriologia',
  'Doutrina da Salvacao': 'Soteriologia',
  'Justificação': 'Soteriologia',
  'Redenção': 'Soteriologia',
  'Graça': 'Soteriologia',
  'Lei e Graça': 'Soteriologia',
  'Conversão': 'Soteriologia',

  // Eclesiologia
  'Sacramentos': 'Eclesiologia',
  'Sacramento': 'Eclesiologia',
  'Liturgia': 'Eclesiologia',
  'Ortodoxia': 'Eclesiologia',
  'Comunhão': 'Eclesiologia',
  'Comunidade': 'Eclesiologia',
  'Governança': 'Eclesiologia',
  'Carismático': 'Eclesiologia',
  'Catolicismo': 'Eclesiologia',
  'Concílios': 'Eclesiologia',
  'Ecumenismo': 'Eclesiologia',
  'Pluralismo': 'Eclesiologia',
  'Herésias': 'Eclesiologia',
  'Seitas': 'Eclesiologia',
  'Ministério': 'Eclesiologia',
  'Ministerio': 'Eclesiologia',
  'Ministerios': 'Eclesiologia',
  'Ensino': 'Eclesiologia',
  'Templo': 'Eclesiologia',

  // Escatologia
  'Eventos Finais': 'Escatologia',
  'Eventos Futuros': 'Escatologia',
  'Futuro': 'Escatologia',
  'Eventos': 'Escatologia',
  'Consumação': 'Escatologia',
  'Eternidade': 'Escatologia',
  'Céu': 'Escatologia',
  'Juizo': 'Escatologia',
  'Parousia': 'Escatologia',
  'Protecao e Juizo': 'Escatologia',
  'Reino': 'Escatologia',
  'Apocalipse': 'Escatologia',
  'Profecia': 'Escatologia',

  // Teologia Bíblica
  'Teologia Biblica': 'Teologia Bíblica',
  'Teologia': 'Teologia Bíblica',
  'Temas por Livro': 'Teologia Bíblica',
  'Tema Central': 'Teologia Bíblica',
  'Tematica': 'Teologia Bíblica',
  'Tipologia': 'Teologia Bíblica',
  'Aliança': 'Teologia Bíblica',
  'Alianças': 'Teologia Bíblica',
  'Providência': 'Teologia Bíblica',
  'Soberania': 'Teologia Bíblica',
  'Evangelhos': 'Teologia Bíblica',
  'Profetas': 'Teologia Bíblica',
  'Pentateuco': 'Teologia Bíblica',
  'Genese': 'Teologia Bíblica',
  'Exodo': 'Teologia Bíblica',
  'Josue': 'Teologia Bíblica',
  'Juizes': 'Teologia Bíblica',
  'Salmos': 'Teologia Bíblica',
  'Provérbios': 'Teologia Bíblica',
  'Rute': 'Teologia Bíblica',
  'Samuel': 'Teologia Bíblica',
  'Esdras-Neemias': 'Teologia Bíblica',
  'Livros Poéticos': 'Teologia Bíblica',
  'Atos e Epístolas': 'Teologia Bíblica',
  'Atos e Apocalipse': 'Teologia Bíblica',
  'Epístolas': 'Teologia Bíblica',
  'Epístolas Paulinas': 'Teologia Bíblica',
  'Epístolas Gerais': 'Teologia Bíblica',
  'Epístolas Pastorais': 'Teologia Bíblica',
  'Epístolas Pessoais': 'Teologia Bíblica',
  'Paulinas': 'Teologia Bíblica',
  'Epistolas': 'Teologia Bíblica',
  'Evangelho de João': 'Teologia Bíblica',
  'AT': 'Teologia Bíblica',
  'NT': 'Teologia Bíblica',
  'Antigo Testamento': 'Teologia Bíblica',
  'Novo Testamento': 'Teologia Bíblica',
  'Poésia': 'Teologia Bíblica',
  'Poesia': 'Teologia Bíblica',
  'Gêneros': 'Teologia Bíblica',
  'Gênero': 'Teologia Bíblica',
  'Personagens': 'Teologia Bíblica',
  'Reis': 'Teologia Bíblica',

  // Apologetica
  'Defesa': 'Apologetica',
  'Argumentos': 'Apologetica',
  'Evidências': 'Apologetica',
  'Evidencias': 'Apologetica',
  'Definicao': 'Apologetica',

  // Teologia Sistemática
  'Teologia Moderna': 'Teologia Sistemática',
  'Escolástica': 'Teologia Sistemática',

  // História da Igreja
  'Historia da Igreja': 'História da Igreja',
  'Históricos': 'História da Igreja',
  'Histórico': 'História da Igreja',
  'História': 'História da Igreja',
  'Reforma': 'História da Igreja',
  'Contrarreforma': 'História da Igreja',
  'Patrística': 'História da Igreja',
  'Patristica': 'História da Igreja',
  'Medieval': 'História da Igreja',
  'Avivamento': 'História da Igreja',
  'Avivamentos': 'História da Igreja',
  'Movimentos': 'História da Igreja',
  'Mártir': 'História da Igreja',
  'Perseguição': 'História da Igreja',
  'Perseguicao': 'História da Igreja',
  'Arqueologia': 'História da Igreja',

  // Hermenêutica
  'Hermenapeutica': 'Hermenêutica',
  'Hermenêutica NT': 'Hermenêutica',
  'Homilética': 'Hermenêutica',
  'Métodos': 'Hermenêutica',
  'Metodos': 'Hermenêutica',
  'Contexto': 'Hermenêutica',

  // Questões Contemporâneas
  'Questoes Contemporaneas': 'Questões Contemporâneas',
  'Contemporânea': 'Questões Contemporâneas',
  'Ética': 'Questões Contemporâneas',
  'Ã‰tica': 'Questões Contemporâneas',
  'Ética Cristã': 'Questões Contemporâneas',
  'Ã‰tica Cristã': 'Questões Contemporâneas',
  'Ética Pública': 'Questões Contemporâneas',
  'Ã‰tica Pública': 'Questões Contemporâneas',
  'Etica Crista': 'Questões Contemporâneas',
  'Bioética': 'Questões Contemporâneas',
  'Fé e Ciência': 'Questões Contemporâneas',
  'Ciência': 'Questões Contemporâneas',
  'AT e Ciência': 'Questões Contemporâneas',
  'Tecnologia': 'Questões Contemporâneas',
  'Cultura Digital': 'Questões Contemporâneas',
  'Saúde Mental': 'Questões Contemporâneas',
  'Saude': 'Questões Contemporâneas',
  'Ecologia': 'Questões Contemporâneas',
  'Cultura': 'Questões Contemporâneas',
  'Religiões': 'Questões Contemporâneas',
  'Religião': 'Questões Contemporâneas',
  'Cosmovisão': 'Questões Contemporâneas',
  'Filosofia': 'Questões Contemporâneas',
  'Filosofia Cristã': 'Questões Contemporâneas',
  'Epistemologia': 'Questões Contemporâneas',
  'Existencial': 'Questões Contemporâneas',
  'Justiça Social': 'Questões Contemporâneas',
  'Justiça': 'Questões Contemporâneas',
  'Sociedade': 'Questões Contemporâneas',
  'Razão': 'Questões Contemporâneas',
  'Ambiente': 'Questões Contemporâneas',
  'Problemas': 'Questões Contemporâneas',
  'Saúde': 'Questões Contemporâneas',

  // Missiologia
  'Missões': 'Missiologia',
  'Missão': 'Missiologia',
  'Missoes': 'Missiologia',
  'Missão e Evangelismo': 'Missiologia',
  'Missão Urbana': 'Missiologia',
  'Evangelismo': 'Missiologia',
  'Grande Comissao': 'Missiologia',
  'Discipulado': 'Missiologia',

  // Vida Crista
  'Vida Cristã': 'Vida Crista',
  'Vida Espiritual': 'Vida Crista',
  'Espiritualidade': 'Vida Crista',
  'Caráter': 'Vida Crista',
  'Carater Cristao': 'Vida Crista',
  'Obediência': 'Vida Crista',
  'Força': 'Vida Crista',
  'Paz': 'Vida Crista',
  'Poder': 'Vida Crista',
  'Virtude': 'Vida Crista',
  'Verdade': 'Vida Crista',
  'Amor': 'Vida Crista',
  'Alegria': 'Vida Crista',
  'Esperança': 'Vida Crista',
  'Perdão': 'Vida Crista',
  'Misericórdia': 'Vida Crista',
  'Simplicidade': 'Vida Crista',
  'Devoção': 'Vida Crista',
  'Renascimento Espiritual': 'Vida Crista',
  'Desejo de Deus': 'Vida Crista',
  'Alimento Espiritual': 'Vida Crista',
  'Glória': 'Vida Crista',
  'Realeza': 'Vida Crista',
  'Crescimento': 'Vida Crista',
  'Atitude': 'Vida Crista',
  'Servo': 'Vida Crista',
  'Fundamentos': 'Vida Crista',
  'Santidade': 'Vida Crista',
  'Fé': 'Vida Crista',
  'Oração': 'Vida Crista',
  'Adoração': 'Vida Crista',
  'Adoracao': 'Vida Crista',
  'Música': 'Vida Crista',
  'Musica': 'Vida Crista',
  'Comunicação': 'Vida Crista',
  'Resistência': 'Vida Crista',
  'Família': 'Vida Crista',
  'Familia': 'Vida Crista',
  'Casamento': 'Vida Crista',
  'Relacionamentos': 'Vida Crista',
  'Mulheres': 'Vida Crista',
  'Juventude': 'Vida Crista',
  'Liderança': 'Vida Crista',
  'Lideranca': 'Vida Crista',
  'Disciplina': 'Vida Crista',
  'Mordomia': 'Vida Crista',
  'Prática': 'Vida Crista',
  'Práticas': 'Vida Crista',
  'Parábolas': 'Vida Crista',
  'Milagres': 'Vida Crista',
  'Sofrimento': 'Vida Crista',

  // Estudos Comparativos
  'Comparação Sinótica': 'Estudos Comparativos',
  'Comparação Apostólica': 'Estudos Comparativos',
  'Harmonia': 'Estudos Comparativos',

  // Additional unmapped categories
  'Sabedoria': 'Vida Crista',
  'Educação': 'Vida Crista',
  'Educacao': 'Vida Crista',
  'Trabalho': 'Vida Crista',
  'Orientação': 'Vida Crista',
  'Criação': 'Teologia Bíblica',
  'Santos': 'Teologia Bíblica',
  'Ordenancas': 'Eclesiologia',
};

const mainCategories = new Set([
  'Doutrinas Fundamentais',
  'Cristologia',
  'Pneumatologia',
  'Bibliologia',
  'Angelologia',
  'Antropologia',
  'Hamartiologia',
  'Soteriologia',
  'Eclesiologia',
  'Escatologia',
  'Teologia Bíblica',
  'Apologetica',
  'Teologia Sistemática',
  'História da Igreja',
  'Hermenêutica',
  'Questões Contemporâneas',
  'Missiologia',
  'Vida Crista',
  'Estudos Comparativos',
]);

let replacements = 0;
const unmapped = new Map();
const categoryCounts = new Map();

const newContent = content.replace(/categoria:\s*'([^']+)'/g, (match, cat) => {
  categoryCounts.set(cat, (categoryCounts.get(cat) || 0) + 1);
  
  if (CATEGORY_MAP[cat]) {
    replacements++;
    return `categoria: '${CATEGORY_MAP[cat]}'`;
  }
  
  if (mainCategories.has(cat)) {
    return match; // Already a main category
  }
  
  // Unmapped category
  unmapped.set(cat, (unmapped.get(cat) || 0) + 1);
  return match;
});

writeFileSync(filePath, newContent, 'utf-8');

console.log(`\n=== Category Normalization Results ===`);
console.log(`Total replacements made: ${replacements}`);
console.log(`\nCategories before normalization:`);
for (const [cat, count] of [...categoryCounts.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${cat}: ${count}`);
}

if (unmapped.size > 0) {
  console.log(`\nUnmapped categories (not in mapping):`);
  for (const [cat, count] of [...unmapped.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat}: ${count}`);
  }
} else {
  console.log(`\nAll categories mapped successfully!`);
}

// Count after normalization
const afterContent = readFileSync(filePath, 'utf-8');
const afterCounts = new Map();
for (const match of afterContent.matchAll(/categoria:\s*'([^']+)'/g)) {
  const cat = match[1];
  afterCounts.set(cat, (afterCounts.get(cat) || 0) + 1);
}

console.log(`\nFinal category counts (${afterCounts.size} categories):`);
for (const [cat, count] of [...afterCounts.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${cat}: ${count}`);
}
