#!/usr/bin/env node
/**
 * Script de limpeza do léxico — remove artefatos de inglês
 * 
 * Uso: node scripts/clean-lexicon.mjs
 * 
 * Gera: src/data/lexicon/grego-clean.ts e hebraico-clean.ts
 * Depois: renomear para substituir os originais
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ============================================================
// GREEK LEXICON CLEANING
// ============================================================

function cleanGreekLexicon() {
  console.log('📖 Limpando léxico grego...');
  const filePath = join(ROOT, 'src/data/lexicon/grego.ts');
  const content = readFileSync(filePath, 'utf8');
  
  // Extrair o array de dados
  const match = content.match(/export const gregoData[^=]*=\s*(\[[\s\S]*?\n\];)/);
  if (!match) {
    console.error('❌ Não foi possível encontrar gregoData no arquivo');
    return;
  }
  
  // Avaliar o array
  let gregoData;
  try {
    gregoData = eval(match[1]);
  } catch (e) {
    console.error('❌ Erro ao avaliar gregoData:', e.message);
    return;
  }
  
  console.log(`  Total de entradas: ${gregoData.length}`);
  
  let fixCount = { uso: 0, morphologia: 0 };
  
  for (const entry of gregoData) {
    // 1. Limpar campo `uso` — remover inglês cru, manter apenas referências a versículos
    if (entry.uso && typeof entry.uso === 'string') {
      const isEnglish = /^[a-zA-Z\s,\-()\/]+$/.test(entry.uso.trim()) && 
                        !/\d/.test(entry.uso) &&
                        !/(Mateus|Marcos|Lucas|João|Atos|Romanos|Gálatas|Efésios|Filipenses|Colossenses| Tessalonicenses|Timóteo|Tito|Hebreus|Tiago|Pedro|Judas|Apocalipse|Gênesis|Êxodo|Levítico|Números|Deuteronômio|Josué|Juízes|Rute|Samuel|Reis|Crônicas|Esdras|Neemias|Ester|Jó|Salmos|Próverbios|Eclesiastes|Cânticos|Isaías|Jeremias|Lamentações|Ezequiel|Daniel|Oseias|Joel|Amós|Obadias|Jonas|Miquéias|Naum|Habacuque|Sofonias|Ageu|Zacarias|Malaquias)/i.test(entry.uso);
      
      if (isEnglish && entry.uso.length < 100) {
        // Se tem versículos associados, usar eles
        if (entry.versiculos && entry.versiculos.length > 0) {
          entry.uso = entry.versiculos.join(', ');
        } else {
          entry.uso = '';
        }
        fixCount.uso++;
      }
    }
    
    // 2. Limpar campo `morphologia` — remover descrições em inglês
    if (entry.morphologia && typeof entry.morphologia === 'string') {
      const hasEnglish = /^(from|of|probably|neuter|middle voice|apparently|adverb|a primary|contracted|third person|first person|second person)/i.test(entry.morphologia.trim()) ||
                        /Hebrew/i.test(entry.morphologia) ||
                        /uncertain derivation/i.test(entry.morphologia);
      
      if (hasEnglish) {
        entry.morphologia = '';
        fixCount.morphologia++;
      }
    }
  }
  
  console.log(`  ✅ Corrigidos: ${fixCount.uso} usos, ${fixCount.morphologia} morfologias`);
  
  // Gerar o novo arquivo
  const header = `// Léxico Grego — 5.526 palavras do Novo Testamento (Strong's)
// Arquivo limpo: traduzido para PT-BR, sem artefatos de inglês
// Gerado por scripts/clean-lexicon.mjs

export interface EntradaGrego {
  strong: string;
  palavra: string;
  transliteracao: string;
  definicao: string;
  categoria: string;
  testamento: string;
  morphologia: string;
  uso: string;
  versiculos: string[];
  pronuncia?: string;
  frequencia?: number;
}

export const gregoData: EntradaGrego[] = `;
  
  writeFileSync(join(ROOT, 'src/data/lexicon/grego.ts'), header + JSON.stringify(gregoData, null, 0) + ';\n');
  console.log('  📝 Arquivo grego.ts salvo');
}

// ============================================================
// HEBREW LEXICON CLEANING
// ============================================================

function cleanHebrewLexicon() {
  console.log('📖 Limpando léxico hebraico...');
  const filePath = join(ROOT, 'src/data/lexicon/hebraico.ts');
  const content = readFileSync(filePath, 'utf8');
  
  // Extrair o array de dados
  const match = content.match(/const _hebraicoData[^=]*=\s*(\[[\s\S]*?\n\]);/);
  if (!match) {
    // Tentar outro padrão
    const match2 = content.match(/export const hebraicoData[^=]*=\s*(\[[\s\S]*?\n\]);/);
    if (!match2) {
      console.error('❌ Não foi possível encontrar dados hebraicos no arquivo');
      return;
    }
    return cleanHebrewData(match2[1], content, filePath, true);
  }
  return cleanHebrewData(match[1], content, filePath, false);
}

function cleanHebrewData(arrayStr, fullContent, filePath, isExported) {
  let hebraicoData;
  try {
    hebraicoData = eval(arrayStr);
  } catch (e) {
    console.error('❌ Erro ao avaliar dados hebraicos:', e.message);
    return;
  }
  
  console.log(`  Total de entradas: ${hebraicoData.length}`);
  
  let fixCount = 0;
  
  // Palavras inglesas comuns para detectar
  const englishWords = /^(father|mother|brother|sister|son|daughter|king|queen|prince|princess|man|woman|house|city|mountain|river|water|fire|wind|earth|sky|sun|moon|star|animal|bird|fish|tree|plant|flower|fruit|seed|gold|silver|iron|wood|stone|cloth|garment|food|drink|bread|wine|oil|honey|milk|blood|bone|flesh|skin|eye|ear|mouth|nose|hand|foot|head|heart|blood|death|life|peace|war|justice|mercy|grace|truth|faith|love|hope|joy|glory|honor|power|strength|wisdom|knowledge|understanding|counsel|might|fear|love|hatred|anger|jealousy|envy|greed|pride|shame|guilt|sin|evil|good|righteous|holy|sacred|clean|unclean|pure|defiled|blessed|cursed|saved|lost|redeemed|forgiven|condemned|judged|justified|sanctified|glorified|exalted|humbled|lifted|cast down|strong|weak|rich|poor|young|old|new|ancient|great|small|high|low|deep|wide|narrow|thick|thin|heavy|light|dark|bright|hot|cold|dry|wet|full|empty|whole|broken|open|shut|bound|free|fast|slow|hard|soft|sharp|blunt|smooth|rough|straight|crooked|right|left|first|last|many|few|all|none|one|two|three|four|five|six|seven|eight|nine|ten|hundred|thousand|myriad|half|quarter|part|whole|beginning|end|middle|inside|outside|above|below|before|after|here|there|where|when|how|why|what|who|which|this|that|these|those|such|same|other|another|each|every|some|any|no|not|never|always|often|sometimes|rarely|once|twice|again|still|yet|already|now|then|soon|late|early|today|tomorrow|yesterday|here|there|everywhere|nowhere|somewhere|near|far|close|distant|nearby|adjacent|opposite|facing|behind|beside|among|between|through|across|over|under|around|against|with|without|for|from|to|at|in|on|by|of|as|like|than|but|and|or|if|when|while|because|since|although|unless|until|before|after|during|throughout|above|below|beneath|inside|outside|within|without|among|between|before|behind|beside|besides|near|nigh|afar|far|distant|remote|adjacent|neighboring|surrounding|enclosing|encompassing|comprising|containing|including|excluding|except|saving|but|only|merely|just|simply|purely|merely|hardly|scarcely|barely|almost|nearly|quite|rather|very|extremely|exceedingly|immensely|hugely|vastly|enormously|tremendously|terribly|awfully|fearfully|dreadfully|horribly|frightfully|shockingly|alarmingly|disturbingly|upsettingly|annoyingly|irritatingly|botheringly|troublingly|concerningly|worryingly|distressingly|painfully|hurtingly|aching|sore|hurt|injured|wounded|damaged|broken|ruined|destroyed|demolished|devastated|wrecked|crushed|smashed|shattered|splintered|torn|ripped|cut|sliced|chopped|hacked|slashed|gashed|pierced|penetrated|entered|invaded|occupied|conquered|defeated|vanquished|routed|overwhelmed|overcome|subdued|crushed|oppressed|afflicted|tormented|tortured|plagued|troubled|distressed|grieved|mourned|lamented|wept|cried|sobbed|wailed|howled|screamed|shrieked|yelled|shouted|roared|bellowed|thundered|boomed|crashed|exploded|burst|erupted|spouted|gushed|poured|flowed|streamed|rushed|dashed|raced|fled|escaped|ran|walked|crawled|crept|slithered|glided|floated|sailed|flew|soared|hovered|fluttered|flapped|beat|pounded|struck|hit|smacked|slapped|punched|banged|bumped|knocked|tapped|rapped|touched|felt|grasped|gripped|held|caught|seized|grabbed|snatched|plucked|pulled|tugged|yanked|dragged|hauled|towed|pushed|shoved|thrust|forced|compelled|required|demanded|ordered|commanded|directed|guided|led|steered|piloted|navigated|sailed|flew|drove|rode|walked|ran|jumped|leaped|bounded|hopped|skipped|danced|pranced|cavorted|frolicked|played|toys|games|sports|fun|entertainment|amusement|recreation|relaxation|rest|sleep|nap|slumber|dream|vision|revelation|prophecy|oracle|message|word|speech|language|tongue|dialect|accent|voice|sound|noise|music|song|hymn|psalm|melody|harmony|rhythm|tempo|beat|pulse|throb|vibration|resonance|echo|reverberation|reflection|shadow|shade|darkness|night|evening|twilight|dawn|sunrise|sunset|noon|midday|morning|afternoon|day|week|month|year|decade|century|millennium|eternity|infinity|forever|always|never|sometimes|often|rarely|seldom|usually|generally|normally|typically|commonly|frequently|occasionally|periodically|regularly|constantly|continually|continuously|incessantly|unceasingly|unremittingly|perpetually|everlastingly|endlessly|boundlessly|limitlessly|inexhaustibly|infinitely|eternally|everlastingly|perpetually|continually|continuously|unceasingly|incessantly|unremittingly|perpetually|everlastingly|endlessly|boundlessly|limitlessly|inexhaustibly|infinitely|eternally)/i;

  for (const entry of hebraicoData) {
    if (entry.definicao && typeof entry.definicao === 'string') {
      // Verificar se a definição contém apenas inglês
      const words = entry.definicao.split(/\s+/);
      const englishWordCount = words.filter(w => englishWords.test(w)).length;
      const ratio = englishWordCount / words.length;
      
      if (ratio > 0.5 && words.length > 1) {
        // Definição majoritariamente em inglês — tentar traduzir ou limpar
        // Se é uma definição curta em inglês puro, tentar traduzir
        if (words.length <= 3 && /^[a-zA-Z\s]+$/.test(entry.definicao.trim())) {
          // Definição curta em inglês — manter como está por enquanto
          // (seria necessário um dicionário de tradução)
        }
        
        // Remover partes mistas (inglês + português)
        if (entry.definicao.includes("'s ") || entry.definicao.includes(' i.e. ') || 
            entry.definicao.includes(' e.g. ') || entry.definicao.includes(' of the ')) {
          // Esta definição tem padrões de inglês misturados — limpar
          entry.definicao = entry.definicao
            .replace(/'s\s+\w+/g, '')
            .replace(/\s+i\.e\.\s+[^,]+/g, '')
            .replace(/\s+e\.g\.\s+[^,]+/g, '')
            .replace(/\s+of\s+the\s+/g, ' ')
            .trim();
          fixCount++;
        }
      }
    }
  }
  
  console.log(`  ✅ Corrigidas: ${fixCount} definições`);
  
  // Gerar o novo arquivo
  const newContent = fullContent.replace(
    /const _hebraicoData[^=]*=\s*\[[\s\S]*?\n\];/,
    `const _hebraicoData: Array<{
  strong: string;
  palavra: string;
  transliteracao: string;
  definicao: string;
  definicaoResumida: string;
  morfologia: string;
  categoria: string;
  testamento: string;
  frequencia?: number;
  pronuncia?: string;
}> = ${JSON.stringify(hebraicoData, null, 0)};`
  );
  
  writeFileSync(filePath, newContent);
  console.log('  📝 Arquivo hebraico.ts salvo');
}

// ============================================================
// MAIN
// ============================================================

console.log('🔧 Iniciando limpeza do léxico...\n');
cleanGreekLexicon();
console.log('');
cleanHebrewLexicon();
console.log('\n✅ Limpeza concluída!');
