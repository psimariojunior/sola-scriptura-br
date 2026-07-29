#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Dicionario compacto de termos biblicos
const DIC = new Map([
  // Familia
  ['father','pai'],['mother','mae'],['son','filho'],['daughter','filha'],['brother','irmao'],['sister','irma'],['husband','marido'],['wife','esposa'],['man','homem'],['woman','mulher'],['child','crianca'],['children','filhos'],['firstborn','primogenito'],['orphan','orfao'],['widow','viuva'],['seed','semente'],['offspring','descendencia'],['descendant','descendente'],
  // Sociedade
  ['people','povo'],['nation','nacao'],['king','rei'],['queen','rainha'],['prince','principe'],['servant','servo'],['slave','escravo'],['master','senhor'],['enemy','inimigo'],['friend','amigo'],['neighbor','proximo'],['stranger','estrangeiro'],['priest','sacerdote'],['prophet','profeta'],['judge','juiz'],['elder','anciao'],['leader','lider'],['captain','capitao'],
  // Deus
  ['God','Deus'],['Lord','SENHOR'],['angel','anjo'],['spirit','espirito'],['soul','alma'],['covenant','alianca'],['law','lei'],['commandment','mandamento'],['sacrifice','sacrificio'],['offering','oferta'],['sin','pecado'],['iniquity','iniquidade'],['transgression','transgressao'],['righteousness','justica'],['justice','justica'],['mercy','misericordia'],['grace','graca'],['truth','verdade'],['faith','fe'],['hope','esperanca'],['blessing','bencao'],['curse','maldicao'],['prayer','oracao'],['worship','adoracao'],['praise','louvor'],
  // Natureza
  ['heaven','ceu'],['earth','terra'],['land','terra'],['world','mundo'],['sun','sol'],['moon','lua'],['star','estrela'],['mountain','montanha'],['hill','colina'],['valley','vale'],['river','rio'],['sea','mar'],['water','agua'],['fire','fogo'],['wind','vento'],['rain','chuva'],['snow','neve'],['dew','orvalho'],['cloud','nuvem'],['storm','tempestade'],['darkness','trevas'],['light','luz'],['stone','pedra'],['rock','rocha'],['tree','arvore'],['forest','floresta'],['garden','jardim'],['seed','semente'],['fruit','fruto'],['wheat','trigo'],['barley','cevada'],['vine','videira'],['olive','azeitona'],
  // Animais
  ['sheep','ovelha'],['lamb','cordeiro'],['goat','cabra'],['cattle','gado'],['ox','boi'],['horse','cavalo'],['donkey','jumento'],['lion','leao'],['bear','urso'],['wolf','lobo'],['eagle','aguia'],['dove','pomba'],['serpent','serpente'],['fish','peixe'],
  // Corpo
  ['head','cabeca'],['face','rosto'],['eye','olho'],['ear','ouvido'],['mouth','boca'],['neck','pescoco'],['arm','braco'],['hand','mao'],['finger','dedo'],['back','costas'],['foot','pe'],['knee','joelho'],['bone','osso'],['blood','sangue'],['heart','coracao'],['breath','flegma'],
  // Construcoes
  ['house','casa'],['home','lar'],['tent','tenda'],['temple','templo'],['altar','altar'],['tabernacle','tabernaculo'],['sanctuary','santuario'],['city','cidade'],['wall','muro'],['gate','portao'],['door','porta'],['tower','torre'],['palace','palacio'],['prison','prisao'],
  // Objetos
  ['bread','pao'],['wine','vinho'],['oil','oleo'],['milk','leite'],['honey','mel'],['salt','sal'],['garment','vestimenta'],['robe','vestido'],['crown','coroa'],['sword','espada'],['spear','lanca'],['shield','escudo'],['staff','cajado'],['rod','vara'],['book','livro'],['scroll','pergaminho'],['table','mesa'],['bed','cama'],['lamp','lampada'],
  // Tempo
  ['day','dia'],['night','noite'],['morning','manha'],['evening','noite'],['week','semana'],['month','mes'],['year','ano'],['sabbath','sabado'],['feast','festa'],['jubilee','jubileu'],['beginning','comeco'],['end','fim'],['eternity','eternidade'],['forever','para sempre'],
  // Espaco
  ['place','lugar'],['way','caminho'],['path','senda'],['road','estrada'],['wilderness','deserto'],['desert','deserto'],['field','campo'],
  // Conceitos
  ['wisdom','sabedoria'],['understanding','entendimento'],['knowledge','conhecimento'],['folly','loucura'],['love','amor'],['hate','odio'],['anger','ira'],['peace','paz'],['war','guerra'],['joy','alegria'],['sorrow','tristeza'],['fear','medo'],['strength','forca'],['power','poder'],['glory','gloria'],['honor','honra'],['shame','vergonha'],['life','vida'],['death','morte'],['salvation','salvacao'],['deliverance','libertacao'],['redemption','redencao'],['forgiveness','perdao'],['healing','curanca'],['judgment','julgamento'],['punishment','punicao'],['reward','recompensa'],['inheritance','heranca'],['wealth','riqueza'],['poverty','pobreza'],
  // Verbos
  ['to create','criar'],['to make','fazer'],['to form','formar'],['to build','construir'],['to establish','estabelecer'],['to give','dar'],['to take','tomar'],['to bring','trazer'],['to send','enviar'],['to go','ir'],['to come','vir'],['to see','ver'],['to hear','ouvir'],['to speak','falar'],['to say','dizer'],['to know','saber'],['to understand','entender'],['to believe','crer'],['to trust','confiar'],['to seek','buscar'],['to find','encontrar'],['to love','amar'],['to hate','odiar'],['to fear','temer'],['to praise','louvar'],['to worship','adorar'],['to pray','orar'],['to bless','abençoar'],['to curse','amaldicoar'],['to save','salvar'],['to deliver','libertar'],['to redeem','resgatar'],['to forgive','perdoar'],['to judge','julgar'],['to rule','governar'],['to reign','reinar'],['to conquer','conquistar'],['to destroy','destruir'],['to kill','matar'],['to die','morrer'],['to live','viver'],['to rise','levantar'],['to fall','cair'],['to walk','andar'],['to run','correr'],['to flee','fugir'],['to fight','lutar'],['to teach','ensinar'],['to learn','aprender'],['to write','escrever'],['to read','ler'],['to eat','comer'],['to drink','beber'],['to sleep','dormir'],['to rest','descansar'],['to work','trabalhar'],['to serve','servir'],['to help','ajudar'],['to protect','proteger'],['to defend','defender'],['to guard','guardar'],['to hide','esconder'],['to reveal','revelar'],['to show','mostrar'],['to call','chamar'],['to name','nomear'],['to choose','escolher'],['to gather','reunir'],['to scatter','espalhar'],['to divide','dividir'],['to unite','unir'],['to bind','atar'],['to loose','soltar'],['to cover','cobrir'],['to open','abrir'],['to close','fechar'],['to pour','derramar'],['to burn','queimar'],['to wash','lavar'],['to cleanse','purificar'],['to sanctify','santificar'],['to anoint','ungir'],['to offer','oferecer'],['to sacrifice','sacrificar'],['to atone','expiar'],['to plead','implorar'],['to command','ordenar'],['to decree','decretar'],['to promise','prometer'],['to swear','jurar'],['to vow','votar'],['to fulfill','cumprir'],['to complete','completar'],['to begin','comecar'],['to cease','cessar'],['to return','voltar'],['to turn','voltar'],['to follow','seguir'],['to lead','conduzir'],['to guide','guiar'],['to carry','carregar'],['to bear','suportar'],['to endure','suportar'],['to suffer','sofrer'],['to afflict','afligir'],['to oppress','oprimir'],['to release','soltar'],['to capture','capturar'],['to plunder','saquear'],['to sing','cantar'],['to rejoice','alegrar'],['to mourn','lamentar'],['to weep','chorar'],['to honor','honrar'],['to glorify','glorificar'],['to exalt','exaltar'],['to humble','humilhar'],['to punish','punir'],['to correct','corrigir'],['to rebuke','repreender'],['to provide','prover'],['to sustain','sustentar'],['to maintain','manter'],['to keep','guardar'],['to preserve','preservar'],['to rescue','resgatar'],['to escape','escapar'],['to prosper','prosperar'],['to overcome','vencer'],['to subdue','subjugar'],
  // Adjetivos
  ['good','bom'],['evil','mal'],['righteous','justo'],['wicked','impio'],['holy','santo'],['pure','puro'],['clean','limpo'],['unclean','impuro'],['great','grande'],['small','pequeno'],['mighty','poderoso'],['strong','forte'],['weak','fraco'],['wise','sabio'],['foolish','tolo'],['young','jovem'],['old','velho'],['new','novo'],['first','primeiro'],['last','ultimo'],['many','muitos'],['few','poucos'],['all','todos'],['none','nenhum'],['beautiful','bonito'],['rich','rico'],['poor','pobre'],['alive','vivo'],['dead','morto'],['true','verdadeiro'],['false','falso'],['eternal','eterno'],
  // Preposicoes
  ['and','e'],['or','ou'],['but','mas'],['not','nao'],['in','em'],['on','em'],['at','em'],['to','para'],['for','para'],['with','com'],['from','de'],['by','por'],['of','de'],['that','que'],['this','este'],['he','ele'],['she','ela'],['we','nos'],['they','eles'],['you','voce'],['who','quem'],['which','qual'],['what','que'],['where','onde'],['when','quando'],['how','como'],['if','se'],['then','entao'],['because','porque'],['therefore','portanto'],['now','agora'],['also','tambem'],['very','muito'],['much','muito'],['more','mais'],['only','apenas'],['still','ainda'],['already','ja'],['always','sempre'],['never','nunca'],['before','antes'],['after','depois'],['between','entre'],['through','atraves'],['into','dentro'],['upon','sobre'],['against','contra'],['until','ate'],['since','desde'],['while','enquanto'],['during','durante'],['within','dentro de'],['without','sem'],['beyond','alem'],['above','acima'],['below','abaixo'],['over','sobre'],['under','sob'],['near','perto'],['far','longe'],['like','como'],['as','como'],['about','sobre'],['a','um'],['the','o'],
]);

// Carregar fontes
const hebMobile = JSON.parse(readFileSync(resolve(ROOT, 'mobile/assets/data/lexicon-hebraico.json'), 'utf8'));
const mobilePtMap = new Map();
for (const e of hebMobile) { if (e.morfologia) mobilePtMap.set(e.strong, e.morfologia); }

const strongContent = readFileSync(resolve(ROOT, 'src/data/biblia/strong/index.ts'), 'utf8');
const strongPtMap = new Map();
const sr = /strong:\s*'(H\d+)'[^}]*?morfologia:\s*'([^']+)'/g;
let m;
while ((m = sr.exec(strongContent)) !== null) { if (!strongPtMap.has(m[1])) strongPtMap.set(m[1], m[2]); }

// Atualizar hebraico.ts
const hebPath = resolve(ROOT, 'src/data/lexicon/hebraico.ts');
let hebContent = readFileSync(hebPath, 'utf8');
let traduzidos = 0;

const re = /strong:\s*"(H\d+)"[^}]*?definicao:\s*"([^"]+)"/g;
let match;
const replacements = [];

while ((match = re.exec(hebContent)) !== null) {
  const strong = match[1];
  const def = match[2];
  
  // Ja em portugues?
  if (/[àáâãéêíóôõúç]/i.test(def) || /^(substantivo|verbo|adjetivo)/i.test(def)) continue;
  
  // Tentar fontes primeiro
  let novaDef = mobilePtMap.get(strong) || strongPtMap.get(strong);
  
  if (!novaDef) {
    // Traduzir usando dicionario
    let resultado = def;
    for (const [en, pt] of DIC) {
      const regex = new RegExp('\\b' + en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
      resultado = resultado.replace(regex, pt);
    }
    if (resultado !== def) novaDef = resultado;
  }
  
  if (novaDef && novaDef !== def) {
    replacements.push({ strong, oldDef: def, newDef: novaDef });
  }
}

for (const { strong, oldDef, newDef } of replacements) {
  const escaped = oldDef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(strong:\\s*"${strong}"[^}]*?definicao:\\s*)"${escaped}"`);
  hebContent = hebContent.replace(regex, `$1"${newDef.replace(/"/g, '\\"')}"`);
  traduzidos++;
}

writeFileSync(hebPath, hebContent, 'utf8');
console.log(`✅ ${traduzidos} definicoes traduzidas/atualizadas`);
