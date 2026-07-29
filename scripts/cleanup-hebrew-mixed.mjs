#!/usr/bin/env node
/**
 * cleanup-hebrew-mixed.mjs
 *
 * Limpa entradas do lexico hebraico que ficaram misturadas (ingles/portugues).
 * Para entradas misturadas, usa a definicao do mobile/strong quando disponivel,
 * senao marca como "[traduzir]" para revisao manual.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Carregar fontes de dados
const hebMobile = JSON.parse(readFileSync(resolve(ROOT, 'mobile/assets/data/lexicon-hebraico.json'), 'utf8'));
const mobilePtMap = new Map();
for (const e of hebMobile) {
  if (e.morfologia) {
    mobilePtMap.set(e.strong, e.morfologia);
  }
}

const strongContent = readFileSync(resolve(ROOT, 'src/data/biblia/strong/index.ts'), 'utf8');
const strongPtMap = new Map();
const strongRegex = /strong:\s*'(H\d+)'[^}]*?morfologia:\s*'([^']+)'/g;
let m;
while ((m = strongRegex.exec(strongContent)) !== null) {
  if (!strongPtMap.has(m[1])) {
    strongPtMap.set(m[1], m[2]);
  }
}

// Funcao para verificar se uma definicao esta misturada
function isMista(def) {
  // Tem acentos portugueses E palavras inglesas comuns
  const temPt = /[àáâãéêíóôõúç]/i.test(def);
  const temEn = /\b(properly|figuratively|literally|specifically|generally|commonly|especially|particularly|exactly|precisely|approximately|concrete|abstract|implied|perhaps|used|only|some|thing|something|nothing|everything|any|every|each|other|another|such|same|different|various|certain|sure|true|false|real|actual|exact|specific|general|common|special|particular|certain|possible|impossible|necessary|unnecessary|important|unimportant|significant|insignificant|relevant|irrelevant|related|unrelated|connected|disconnected|separate|unseparate|divided|undivided|united|joined|combined|mixed|pure|impure|clean|unclean|clear|unclear|bright|dim|dark|light|heavy|hard|soft|rough|smooth|sharp|dull|hot|cold|warm|cool|dry|wet|moist|fresh|stale|new|old|young|modern|ancient|early|late|soon|quick|slow|fast|steady|sudden|gradual|constant|changing|moving|still|quiet|loud|noisy|silent|active|passive|positive|negative|good|bad|evil|wicked|righteous|just|unjust|fair|unfair|equal|unequal|balanced|unbalanced|stable|unstable|safe|unsafe|dangerous|secure|insecure|strong|weak|powerful|powerless|mighty|feeble|bold|timid|brave|cowardly|proud|humble|arrogant|modest|wise|foolish|smart|stupid|intelligent|ignorant|learned|unlearned|educated|uneducated|trained|untrained|experienced|inexperienced|skilled|unskilled|able|unable|capable|incapable|qualified|unqualified|ready|unready|prepared|unprepared|willing|unwilling|eager|reluctant|happy|sad|glad|sorry|pleased|displeased|satisfied|dissatisfied|content|discontent|comfortable|uncomfortable|healthy|sick|well|ill|alive|dead|living|dying|born|unborn|mortal|immortal|temporary|permanent|lasting|fleeting|passing|enduring|eternal|everlasting|infinite|limited|unlimited|bounded|unbounded|restricted|unrestricted|free|bound|tied|loose|tight|open|closed|shut|locked|unlocked|sealed|unsealed|covered|uncovered|hidden|revealed|exposed|visible|invisible|seen|unseen|known|unknown|familiar|unfamiliar|strange|foreign|native|local|distant|near|far|close|remote|central|peripheral|inner|outer|upper|lower|higher|lower|top|bottom|front|back|side|middle|center|edge|border|boundary|limit|end|beginning|start|finish|stop|pause|continue|proceed|advance|retreat|move|stay|remain|leave|arrive|depart|enter|exit|go|come|return|rise|fall|ascend|descend|climb|drop|sink|float|fly|swim|run|walk|crawl|creep|jump|leap|skip|hop|dance|sing|speak|say|tell|talk|whisper|shout|cry|call|answer|reply|respond|ask|question|inquire|seek|search|find|lose|keep|hold|release|let|make|do|create|destroy|build|break|fix|repair|mend|heal|hurt|wound|cut|tear|rip|split|divide|separate|join|unite|connect|attach|detach|bind|tie|untie|wrap|unwrap|cover|uncover|hide|reveal|show|display|present|offer|give|take|receive|accept|reject|refuse|deny|admit|confess|declare|announce|proclaim|publish|broadcast|spread|scatter|gather|collect|assemble|disperse|distribute|share|divide|multiply|add|subtract|increase|decrease|grow|shrink|expand|contract|stretch|compress|press|squeeze|push|pull|drag|lift|carry|bear|support|hold|drop|throw|cast|hurl|fling|toss|pitch|aim|shoot|fire|strike|hit|beat|pound|knock|tap|touch|feel|sense|perceive|notice|observe|watch|look|see|view|behold|gaze|stare|glance|peek|peer|scan|examine|inspect|investigate|study|analyze|consider|think|ponder|reflect|meditate|contemplate|imagine|dream|hope|wish|desire|want|need|require|demand|request|beg|plead|pray|worship|praise|thank|blame|accuse|condemn|judge|sentence|punish|reward|forgive|pardon|excuse|justify|defend|protect|guard|shield|shelter|hide|save|rescue|deliver|free|release|liberate|emancipate|enslave|capture|seize|catch|arrest|imprison|confine|restrict|limit|control|direct|guide|lead|follow|chase|pursue|hunt|track|trace|trail|path|road|way|route|journey|travel|voyage|trip|tour|visit|meet|greet|welcome|receive|entertain|host|serve|attend|minister|help|assist|aid|support|encourage|inspire|motivate|stimulate|provoke|excite|arouse|awaken|wake|sleep|rest|work|labor|toil|strive|struggle|fight|battle|war|conflict|contest|compete|race|game|play|sport|exercise|practice|train|rehearse|prepare|ready|equip|furnish|supply|provide|furnish|stock|store|save|keep|preserve|maintain|sustain|endure|last|continue|persist|insist|maintain|assert|claim|allege|declare|state|express|voice|articulate|pronounce|utter|speak|say|tell|relate|narrate|describe|explain|interpret|translate|define|clarify|illuminate|enlighten|educate|teach|instruct|train|coach|tutor|mentor|guide|direct|advise|counsel|warn|caution|alert|notify|inform|announce|proclaim|declare|publish|broadcast|advertise|promote|market|sell|buy|purchase|trade|exchange|barter|deal|bargain|negotiate|mediate|arbitrate|settle|resolve|determine|decide|choose|select|pick|elect|appoint|designate|assign|nominate|name|call|title|label|tag|mark|sign|signal|symbol|token|badge|emblem|crest|seal|stamp|print|impress|imprint|mark|score|record|register|enroll|enter|note|list|catalog|index|file|archive|store|save|keep|preserve|maintain|sustain|support|uphold|defend|protect|guard|shield|shelter|cover|hide|conceal|secrete|bury|inter|entomb|plant|sow|seed|grow|cultivate|nurture|nourish|feed|tend|care|mind|watch|oversee|supervise|manage|administer|govern|rule|reign|command|order|direct|instruct|charge|commission|authorize|empower|enable|permit|allow|let|suffer|tolerate|bear|endure|stand|abide|accept|receive|welcome|greet|salute|honor|respect|esteem|value|prize|treasure|cherish|love|adore|worship|idolize|admire|appreciate|enjoy|relish|savor|taste|sample|try|test|prove|verify|confirm|corroborate|substantiate|validate|authenticate|certify|attest|witness|testify|declare|state|affirm|assert|maintain|hold|keep|retain|preserve|conserve|save|rescue|deliver|free|liberate|release|loose|untie|unbind|unbind|unfasten|unfasten|undo|open|unlock|unseal|uncover|reveal|disclose|expose|show|display|exhibit|present|offer|proffer|tender|extend|stretch|reach|attain|achieve|accomplish|fulfill|realize|actualize|materialize|embody|incarnate|personify|represent|symbolize|signify|mean|denote|connote|imply|suggest|hint|intimate|insinuate|whisper|mutter|mumble|murmur|grumble|complain|protest|object|oppose|resist|withstand|stand|endure|bear|suffer|tolerate|accept|submit|yield|surrender|give up|capitulate|succumb|fall|fail|falter|stumble|trip|slip|slide|glide|coast|roll|tumble|drop|plunge|dive|sink|submerge|drown|suffocate|choke|smother|stifle|suppress|repress|oppress|crush|quash|quell|subdue|conquer|defeat|vanquish|overcome|overwhelm|overpower|overthrow|topple|fell|bring down|cast down|humble|humiliate|degrade|demean|belittle|diminish|reduce|lessen|decrease|minimize|shrink|contract|compress|condense|concentrate|focus|center|converge|meet|join|unite|merge|blend|mix|mingle|combine|fuse|weld|solder|cement|bind|tie|fasten|secure|lock|latch|bolt|bar|block|obstruct|impede|hinder|hamper|thwart|frustrate|foil|baffle|confound|bewilder|perplex|puzzle|mystify|confuse|disconcert|unsettle|disturb|trouble|bother|annoy|irritate|vex|provoke|anger|enrage|infuriate|incense|outrage|scandalize|shock|horrify|appall|dismay|daunt|discourage|dishearten|dispirit|depress|sadden|grieve|mourn|bewail|bemoan|lament|deplore|regret|rue|repent|atone|expiate|make amends|compensate|recompense|repay|requite|retaliate|revenge|avenge|punish|chastise|discipline|correct|rectify|reform|amend|improve|better|enhance|augment|increase|magnify|amplify|enlarge|expand|extend|lengthen|prolong|protract|draw out|stretch out|spread out|lay out|set out|put out|take out|bring out|pull out|draw out|extract|remove|eliminate|eradicate|exterminate|extirpate|uproot|tear out|wrest|wrench|snatch|grab|seize|clutch|grip|grasp|hold|clasp|embrace|hug|squeeze|press|compress|crush|grind|pulverize|pound|beat|strike|smite|slap|punch|kick|stomp|trample|crush|smash|shatter|break|crack|snap|split|cleave|rend|tear|rip|shred|destroy|demolish|raze|level|flatten|annihilate|obliterate|erase|delete|cancel|annul|nullify|invalidate|void|quash|reverse|undo|revoke|rescind|repeal|abolish|extinguish|quench|douse|put out|blow out|snuff out|smother|stifle|suppress|restrain|contain|control|check|halt|stop|cease|desist|quit|give up|abandon|forsake|leave|depart|go away|go forth|set out|start out|take off|head out|be off|be gone|begone|get out|clear out|move out|pack up|decamp|abscond|flee|fly|run away|escape|break free|get free|make off|take flight|take to flight|show a clean pair of heels|beat a retreat|turn tail|cut and run|show one's heels|take to one's heels|betake oneself|repair|resort|go|betake oneself|wander|stray|roam|ramble|rove|range|prowl|cruise|travel|journey|tour|trip|voyage|sail|navigate|fly|soar|glide|hover|float|drift|coast|slide|slip|skid|glissade|roll|tumble|fall|drop|plunge|dive|descend|sink|settle|subside|abate|decrease|diminish|lessen|reduce|lower|drop|fall|decline|wane|ebb|fade|wither|shrivel|shrink|contract|compress|condense|concentrate|focus|center|converge|meet|join|unite|merge|blend|mix|mingle|combine|fuse|weld|solder|cement|bind|tie|fasten|secure|lock|latch|bolt|bar|block|obstruct|impede|hinder|hamper|thwart|frustrate|foil|baffle|confound|bewilder|perplex|puzzle|mystify|confuse|disconcert|unsettle|disturb|trouble|bother|annoy|irritate|vex|provoke|anger|enrage|infuriate|incense|outrage|scandalize|shock|horrify|appall|dismay|daunt|discourage|dishearten|dispirit|depress|sadden|grieve|mourn|bewail|bemoan|lament|deplore|regret|rue|repent|atone|expiate|make amends|compensate|recompense|repay|requite|retaliate|revenge|avenge|punish|chastise|discipline|correct|rectify|reform|amend|improve|better|enhance|augment|increase|magnify|amplify|enlarge|expand|extend|lengthen|prolong|protract|draw out|stretch out|spread out|lay out|set out|put out|take out|bring out|pull out|draw out|extract|remove|eliminate|eradicate|exterminate|extirpate|uproot|tear out|wrest|wrench|snatch|grab|seize|clutch|grip|grasp|hold|clasp|embrace|hug|squeeze|press|compress|crush|grind|pulverize|pound|beat|strike|smite|slap|punch|kick|stomp|trample|crush|smash|shatter|break|crack|snap|split|cleave|rend|tear|rip|shred|destroy|demolish|raze|level|flatten|annihilate|obliterate|erase|delete|cancel|annul|nullify|invalidate|void|quash|reverse|undo|revoke|rescind|repeal|abolish|extinguish|quench|douse|put out|blow out|snuff out|smother|stifle|suppress|restrain|contain|control|check|halt|stop|cease|desist|quit|give up|abandon|forsake|leave|depart|go away|go forth|set out|start out|take off|head out|be off|be gone|begone|get out|clear out|move out|pack up|decamp|abscond|flee|fly|run away|escape|break free|get free|make off|take flight|take to flight|show a clean pair of heels|beat a retreat|turn tail|cut and run|show one's heels|take to one's heels)\b/i.test(def);
  
  return temPt && temEn;
}

// Funcao para verificar se uma definicao esta em ingles
function isIngles(def) {
  // Nao tem acentos portugueses E comeca com palavra inglesa
  const temPt = /[àáâãéêíóôõúç]/i.test(def);
  const comecaEn = /^[a-z]+\s/i.test(def);
  return !temPt && comecaEn;
}

// Carregar e atualizar hebraico.ts
const hebPath = resolve(ROOT, 'src/data/lexicon/hebraico.ts');
let hebContent = readFileSync(hebPath, 'utf8');

let limpos = 0;
let traduzidos = 0;
let mantidos = 0;

// Processar cada entrada
const regexGlobal = /strong:\s*"(H\d+)"[^}]*?definicao:\s*"([^"]+)"/g;
let match;

// Coletar todas as entradas primeiro
const entradas = [];
while ((match = regexGlobal.exec(hebContent)) !== null) {
  entradas.push({
    fullMatch: match[0],
    strong: match[1],
    definicao: match[2],
    index: match.index,
  });
}

console.log(`📝 Total de entradas: ${entradas.length}`);

for (const entrada of entradas) {
  const { strong, definicao } = entrada;
  
  // Verificar se esta misturada
  if (isMista(definicao)) {
    // Tentar obter traducao das fontes
    let novaDefinicao = null;
    
    if (mobilePtMap.has(strong)) {
      novaDefinicao = mobilePtMap.get(strong);
    } else if (strongPtMap.has(strong)) {
      novaDefinicao = strongPtMap.get(strong);
    }
    
    if (novaDefinicao) {
      // Substituir no arquivo
      const escapedDef = definicao.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regexReplace = new RegExp(`(strong:\\s*"${strong}"[^}]*?definicao:\\s*)"${escapedDef}"`);
      hebContent = hebContent.replace(regexReplace, `$1"${novaDefinicao.replace(/"/g, '\\"')}"`);
      traduzidos++;
    } else {
      // Marcar como "[traduzir]" para revisao manual
      const escapedDef = definicao.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regexReplace = new RegExp(`(strong:\\s*"${strong}"[^}]*?definicao:\\s*)"${escapedDef}"`);
      hebContent = hebContent.replace(regexReplace, `$1"[traduzir] ${definicao}"`);
      limpos++;
    }
  } else if (isIngles(definicao)) {
    // Entrada totalmente em ingles - tentar traduzir
    let novaDefinicao = null;
    
    if (mobilePtMap.has(strong)) {
      novaDefinicao = mobilePtMap.get(strong);
    } else if (strongPtMap.has(strong)) {
      novaDefinicao = strongPtMap.get(strong);
    }
    
    if (novaDefinicao) {
      const escapedDef = definicao.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regexReplace = new RegExp(`(strong:\\s*"${strong}"[^}]*?definicao:\\s*)"${escapedDef}"`);
      hebContent = hebContent.replace(regexReplace, `$1"${novaDefinicao.replace(/"/g, '\\"')}"`);
      traduzidos++;
    }
  } else {
    mantidos++;
  }
}

writeFileSync(hebPath, hebContent, 'utf8');

console.log(`\n📊 Resultado da limpeza:`);
console.log(`  - Mantidos (ja em PT): ${mantidos}`);
console.log(`  - Traduzidos via fontes: ${traduzidos}`);
console.log(`  - Marcados como [traduzir]: ${limpos}`);
console.log(`  - Total processados: ${mantidos + traduzidos + limpos}`);
