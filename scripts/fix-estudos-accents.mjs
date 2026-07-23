import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const BASE = 'C:\\Sola Scriptura BR\\src\\app\\estudos';

const FILES = [
  'genesis/page.tsx', 'romanos/page.tsx', 'joao/page.tsx',
  'apocalipse/page.tsx', 'atos/page.tsx', 'efesios/page.tsx',
  'salmos/page.tsx', 'proverbios/page.tsx', '1corintios/page.tsx',
  'filipenses/page.tsx',
];

// Common Portuguese words without accents → with accents
const ACCENT_FIXES = [
  // Very common short words
  [' ja ', ' já '], [' ja,', ' já,'], [' ja.', ' já.'],
  [' nao ', ' não '], [' Nao ', ' Não '], [' nao,', ' não,'], [' nao.', ' não.'],
  [' voce ', ' você '], [' Voce ', ' Você '],
  [' ha ', ' há '], [' Ha ', ' Há '],
  [' ate ', ' até '], [' Ate ', ' Até '],
  [' alem ', ' além '], [' Alem ', ' Além '],
  [' entao ', ' então '], [' Entao ', ' Então '],
  [' tambem ', ' também '], [' Tambem ', ' Também '],
  [' so ', ' só '], [' So ', ' Só '],
  [' la ', ' lá '], [' La ', ' Lá '],
  [' ira ', ' irá '], [' Ira ', 'irá'],
  [' sera ', ' será '], [' Será ', ' Será '],
  [' tera ', ' terá '], [' vivera ', ' viverá '],
  [' estara ', ' estará '],
  [' pode ', ' pode '], // fine

  // -ção words (most common)
  [' situacao ', ' situação '], [' Situacao ', ' Situação '],
  [' protecao ', ' proteção '], [' Protecao ', ' Proteção '],
  [' revelacao ', ' revelação '], [' Revelacao ', ' Revelação '],
  [' oracao ', ' oração '], [' Oracao ', ' Oração '],
  [' educacao ', ' educação '], [' Educacao ', ' Educação '],
  [' informacao ', ' informação '], [' Informacao ', ' Informação '],
  [' direcao ', ' direção '], [' Direcao ', ' Direção '],
  [' estacao ', ' estação '], [' Estacao ', ' Estação '],
  [' nacao ', ' nação '], [' Nacao ', ' Nação '],
  [' criacao ', ' criação '], [' Criacao ', ' Criação '],
  [' solucao ', ' solução '], [' Solucao ', ' Solução '],
  [' condicoes ', ' condições '], [' Condicoes ', ' Condições '],
  [' condicao ', ' condição '], [' Condicao ', ' Condição '],
  [' funcao ', ' função '], [' Funcao ', ' Função '],
  [' instrucao ', ' instrução '], [' Instrucao ', ' Instrução '],
  [' producao ', ' produção '], [' Producao ', ' Produção '],
  [' construcao ', ' construção '], [' Construcao ', ' Construção '],
  [' destruicao ', ' destruição '], [' Destruicao ', ' Destruição '],
  [' resurreicao ', ' resurreição '], [' Ressurreicao ', ' Ressurreição '],
  [' ascensao ', ' ascensão '], [' Ascensao ', ' Ascensão '],
  [' consagracao ', ' consagração '], [' Consagracao ', ' Consagração '],
  [' renovacao ', ' renovação '], [' Renovacao ', ' Renovação '],
  [' transformacao ', ' transformação '], [' Transformacao ', ' Transformação '],
  [' manifestacao ', ' manifestação '], [' Manifestacao ', ' Manifestação '],
  [' salvacao ', ' salvação '], [' Salvacao ', ' Salvação '],
  [' justificacao ', ' justificação '], [' Justificacao ', ' Justificação '],
  [' santificacao ', ' santificação '], [' Santificacao ', ' Santificação '],
  [' condenacao ', ' condenação '], [' Condenacao ', ' Condenação '],
  [' predestinacao ', ' predestinação '], [' Predestinacao ', ' Predestinação '],
  [' eleicao ', ' eleição '], [' Eleicao ', ' Eleição '],
  [' redencao ', ' redenção '], [' Redencao ', ' Redenção '],
  [' glorificacao ', ' glorificação '], [' Glorificacao ', ' Glorificação '],
  [' reconciliacao ', ' reconciliação '], [' Reconciliacao ', ' Reconciliação '],
  [' intercessao ', ' intercessão '], [' Intercessao ', ' Intercessão '],
  [' comunhao ', ' comunhão '], [' Comunhao ', ' Comunhão '],
  [' maldicao ', ' maldição '], [' Maldicao ', ' Maldição '],
  [' bendicao ', ' bênção '], [' Bendicao ', ' Bênção '],
  [' lamentacao ', ' lamentação '], [' Lamentacao ', ' Lamentação '],
  [' adoracao ', ' adoração '], [' Adoracao ', ' Adoração '],
  [' exaltacao ', ' exaltação '], [' Exaltacao ', ' Exaltação '],
  [' saudacoes ', ' saudações '], [' Saudacoes ', ' Saudações '],
  [' instrucoes ', ' instruções '], [' Instrucoes ', ' Instruções '],
  [' explicacoes ', ' explicações '], [' Explicacoes ', ' Explicações '],
  [' aplicacoes ', ' aplicações '], [' Aplicacoes ', ' Aplicações '],
  [' oracoes ', ' orações '], [' Oracoes ', ' Orações '],
  [' interpretacoes ', ' interpretações '], [' Interpretacoes ', ' Interpretações '],

  // -ão words
  [' nao ', ' não '], [' mao ', ' mão '], [' maos ', ' mãos '],
  [' pao ', ' pão '], [' irmao ', ' irmão '], [' irmaos ', ' irmãos '],
  [' coracao ', ' coração '], [' Coracao ', ' Coração '],
  [' nacoes ', ' nações '], [' Nacoes ', ' Nações '],

  // -ência words
  [' obediencia ', ' obediência '], [' Obediencia ', ' Obediência '],
  [' consciencia ', ' consciência '], [' Consciencia ', ' Consciência '],
  [' experiencia ', ' experiência '], [' Experiencia ', ' Experiência '],
  [' paciencia ', ' paciência '], [' Paciencia ', ' Paciência '],
  [' perseveranca ', ' perseverança '], [' Perseveranca ', ' Perseverança '],
  [' excelencia ', ' excelência '], [' Excelencia ', ' Excelência '],
  [' providencia ', ' providência '], [' Providencia ', ' Providência '],
  [' evidencia ', ' evidência '], [' Evidencia ', ' Evidência '],
  [' influencia ', ' influência '], [' Influencia ', ' Influência '],
  [' deferencia ', ' deferência '], [' Diferencia ', ' Diferença '],
  [' preferencia ', ' preferência '], [' Preferencia ', ' Preferência '],
  [' referencia ', ' referência '], [' Referencia ', ' Referência '],
  [' consequencia ', ' consequência '], [' Consequencia ', ' Consequência '],
  [' eloquencia ', ' eloquência '], [' Eloquencia ', ' Eloquência '],
  [' indiferencia ', ' indiferença '], [' Indiferencia ', ' Indiferença '],

  // -ância words
  [' confianca ', ' confiança '], [' Confianca ', ' Confiança '],
  [' esperanca ', ' esperança '], [' Esperanca ', ' Esperança '],
  [' tolerancia ', ' tolerância '], [' Tolerancia ', ' Tolerância '],
  [' elegancia ', ' elegância '], [' Elegancia ', ' Elegância '],
  [' abundancia ', ' abundância '], [' Abundancia ', ' Abundância '],
  [' tolerancia ', ' tolerância '], [' Tolerancia ', ' Tolerância '],
  [' instabilidade ', ' instabilidade '], // fine
  [' constancia ', ' constância '], [' Constancia ', ' Constância '],
  [' frequencia ', ' frequência '], [' Frequencia ', ' Frequência '],
  [' inteligencia ', ' inteligência '], [' Inteligencia ', ' Inteligência '],
  [' negligencia ', ' negligência '], [' Negligencia ', ' Negligência '],
  [' proeminencia ', ' proeminência '], // fine
  [' reverencia ', ' reverência '], [' Reverencia ', ' Reverência '],
  [' silencio ', ' silêncio '], [' Silencio ', ' Silêncio '],
  [' veemencia ', ' veemência '], // fine
  ['Violencia', 'Violência'], ['violencia', 'violência'],

  // -oso/-osa
  [' poderoso ', ' poderoso '], // fine
  [' glorioso ', ' glorioso '], // fine
  [' maravilhoso ', ' maravilhoso '], // fine
  [' perigoso ', ' perigoso '], // fine

  // -ico/-ica
  [' pratico ', ' prático '], [' Pratico ', ' Prático '],
  [' teologico ', ' teológico '], [' Teologico ', ' Teológico '],
  [' historico ', ' histórico '], [' Historico ', ' Histórico '],
  [' mistico ', ' místico '], [' Mistico ', ' Místico '],
  [' etico ', ' ético '], [' Etico ', ' Ético '],
  [' dogmatico ', ' dogmático '], [' Dogmatico ', ' Dogmático '],
  [' liturgico ', ' litúrgico '], [' Liturgico ', ' Litúrgico '],
  [' symbolico ', ' simbólico '], [' Symbolico ', ' Simbólico '],
  [' prophetico ', ' profético '], [' Prophetico ', ' Profético '],
  [' evangelico ', ' evangélico '], [' Evangelico ', ' Evangélico '],
  [' harmonico ', ' harmônico '], [' Harmonico ', ' Harmônico '],
  [' canonico ', ' canônico '], [' Canonico ', ' Canônico '],
  [' dramatico ', ' dramático '], [' Dramatico ', ' Dramático '],
  [' romantico ', ' romântico '], [' Romantico ', ' Romântico '],
  [' systematico ', ' sistemático '], [' Systematico ', ' Sistemático '],
  [' problematico ', ' problemático '], [' Problematico ', ' Problemático '],
  [' catastrofico ', ' catastrófico '], [' Catastrofico ', ' Catastrófico '],

  // -vel words
  [' impossivel ', ' impossível '], [' Impossivel ', ' Impossível '],
  [' visivel ', ' visível '], [' Visivel ', ' Visível '],
  [' invisivel ', ' invisível '], [' Invisivel ', ' Invisível '],
  [' acessivel ', ' acessível '], [' Acessivel ', ' Acessível '],
  [' flexivel ', ' flexível '], [' Flexivel ', ' Flexível '],
  [' inviolavel ', ' inviolável '], [' Inviolavel ', ' Inviolável '],
  [' inabalavel ', ' inabalável '], [' Inabalavel ', ' Inabalável '],

  // -il words
  [' facil ', ' fácil '], [' Facil ', ' Fácil '],
  [' dificil ', ' difícil '], [' Dificil ', ' Difícil '],
  [' util ', ' útil '], [' Util ', ' Útil '],
  [' gracil ', ' gracil '], // fine
  [' fragil ', ' frágil '], [' Fragil ', ' Frágil '],

  // -vel/-il variations
  [' amavel ', ' amável '], [' Amavel ', ' Amável '],
  [' notavel ', ' notável '], [' Notavel ', ' Notável '],
  [' notavel ', ' notável '],
  [' admiravel ', ' admirável '], [' Admiravel ', ' Admirável '],
  [' memoravel ', ' memorável '], [' Memoravel ', ' Memorável '],
  [' consideravel ', ' considerável '], [' Consideravel ', ' Considerável '],
  [' miseravel ', ' miserável '], [' Miseravel ', ' Miserável '],
  [' razoavel ', ' razoável '], [' Razoavel ', ' Razoável '],
  [' comparavel ', ' comparável '], [' Comparavel ', ' Comparável '],
  [' inexplicavel ', ' inexplicável '], [' Inexplicavel ', ' Inexplicável '],
  [' inegavel ', ' inegável '], [' Inegavel ', ' Inegável '],
  [' inegavel ', ' inegável '],
  [' inato ', ' inato '], // fine
  [' lamentavel ', ' lamentável '], [' Lamentavel ', ' Lamentável '],
  [' imperdoavel ', ' imperdoável '], [' Imperdoavel ', ' Imperdoável '],
  [' imperdoavel ', ' imperdoável '],
  [' indispensavel ', ' indispensável '], [' Indispensavel ', ' Indispensável '],
  [' imprescindivel ', ' imprescindível '], [' Impresscindivel ', ' Imprescindível '],
  [' inumeravel ', ' inumerável '], [' Inumeravel ', ' Inumerável '],
  [' inumeravel ', ' inumerável '],
  [' incontestavel ', ' incontestável '], [' Incontestavel ', ' Incontestável '],
  [' inegavel ', ' inegável '],
  [' incomparavel ', ' incomparável '], [' Incomparavel ', ' Incomparável '],
  [' inexoravel ', ' inexorável '], [' Inexoravel ', ' Inexorável '],
  [' inexplicavel ', ' inexplicável '],
  [' insondavel ', ' insondável '], [' Insondavel ', ' Insondável '],
  [' insondavel ', ' insondável '],
  [' intransigivel ', ' intransigente '], // not a standard word
  [' inumeravel ', ' inumerável '],
  [' incontestavel ', ' incontestável '],
  [' inexoravel ', ' inexorável '],
  [' inexplicavel ', ' inexplicável '],
  [' insondavel ', ' insondável '],

  // -avel/-evel specific
  [' estavel ', ' estável '], [' Estavel ', ' Estável '],
  [' instavel ', ' instável '], [' Instavel ', ' Instável '],
  [' variavel ', ' variável '], [' Variavel ', ' Variável '],
  [' equivoco ', ' equívoco '], [' Equivoco ', ' Equívoco '],
  [' benefico ', ' benéfico '], [' Benefico ', ' Benéfico '],
  [' malefico ', ' maléfico '], [' Malefico ', ' Maléfico '],
  [' profetico ', ' profético '], [' Profetico ', ' Profético '],

  // Specific corrections for each study page
  ['fundacao', 'fundação'], ['Fundacao', 'Fundação'],
  ['antemao', 'antemão'], ['Antemao', 'Antemão'],
  ['prontidao', 'prontidão'], ['Prontidao', 'Prontidão'],
  ['restauracao', 'restauração'], ['Restauracao', 'Restauração'],
  ['lagrima', 'lágrima'], ['Lagrima', 'Lágrima'],
  ['tabernaculo', 'tabernáculo'], ['Tabernaculo', 'Tabernáculo'],
  ['saudade', 'saudade'], // fine
  ['guarnicao', 'guarnição'], ['Guarnicao', 'Guarnição'],
  ['proclamacao', 'proclamação'], ['Proclamacao', 'Proclamação'],
  ['faccoes', 'facções'], ['Faccoes', 'Facções'],
  ['definicao', 'definição'], ['Definicao', 'Definição'],
  ['inuteis', 'inúteis'], ['Inuteis', 'Inúteis'],
  ['iluminacao', 'iluminação'], ['Iluminacao', 'Iluminação'],
  ['incarnacao', 'encarnação'], ['Incarnacao', 'Encarnação'],
  ['compilacao', 'compilação'], ['Compilacao', 'Compilação'],
  ['sobré', 'sobre'], // likely a typo
];

let totalFixed = 0;

for (const file of FILES) {
  const path = join(BASE, file);
  try {
    const content = readFileSync(path, 'utf-8');
    let fixed = content;
    for (const [from, to] of ACCENT_FIXES) {
      fixed = fixed.split(from).join(to);
    }
    if (content !== fixed) {
      writeFileSync(path, fixed, 'utf-8');
      console.log(`✅ ${file}: corrigido`);
      totalFixed++;
    } else {
      console.log(`⏭️  ${file}: sem alterações`);
    }
  } catch (err) {
    console.error(`❌ ${file}: ${err.message}`);
  }
}

console.log(`\n📊 Total: ${totalFixed} arquivos corrigidos`);
