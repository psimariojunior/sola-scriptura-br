#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Dicionario compacto de termos gregos biblicos
const DIC = new Map([
  ['father','pai'],['mother','mae'],['son','filho'],['daughter','filha'],['brother','irmao'],['sister','irma'],
  ['man','homem'],['woman','mulher'],['child','crianca'],['people','povo'],['king','rei'],['God','Deus'],
  ['Lord','SENHOR'],['angel','anjo'],['spirit','espirito'],['soul','alma'],['covenant','alianca'],['law','lei'],
  ['commandment','mandamento'],['sacrifice','sacrificio'],['sin','pecado'],['grace','graca'],['truth','verdade'],
  ['faith','fe'],['hope','esperanca'],['love','amor'],['peace','paz'],['life','vida'],['death','morte'],
  ['light','luz'],['darkness','trevas'],['heaven','ceu'],['earth','terra'],['water','agua'],['fire','fogo'],
  ['blood','sangue'],['heart','coracao'],['house','casa'],['city','cidade'],['road','estrada'],['stone','pedra'],
  ['bread','pao'],['wine','vinho'],['oil','oleo'],['sheep','ovelha'],['lamb','cordeiro'],['lion','leao'],
  ['wisdom','sabedoria'],['knowledge','conhecimento'],['righteousness','justica'],['mercy','misericordia'],
  ['blessing','bencao'],['curse','maldicao'],['prayer','oracao'],['worship','adoracao'],['praise','louvor'],
  ['salvation','salvacao'],['redemption','redencao'],['forgiveness','perdao'],['judgment','julgamento'],
  ['to create','criar'],['to make','fazer'],['to give','dar'],['to take','tomar'],['to see','ver'],
  ['to hear','ouvir'],['to speak','falar'],['to say','dizer'],['to know','saber'],['to believe','crer'],
  ['to love','amar'],['to hate','odiar'],['to fear','temer'],['to seek','buscar'],['to find','encontrar'],
  ['to save','salvar'],['to deliver','libertar'],['to forgive','perdoar'],['to judge','julgar'],
  ['to send','enviar'],['to come','vir'],['to go','ir'],['to rise','levantar'],['to die','morrer'],
  ['to live','viver'],['to teach','ensinar'],['to learn','aprender'],['to preach','pregar'],
  ['to heal','curar'],['to cast out','expulsar'],['to baptize','batizar'],['to anoint','ungir'],
  ['good','bom'],['evil','mal'],['holy','santo'],['just','justo'],['pure','puro'],['true','verdadeiro'],
  ['great','grande'],['small','pequeno'],['new','novo'],['old','velho'],['first','primeiro'],['last','ultimo'],
  ['many','muitos'],['all','todos'],['none','nenhum'],['eternal','eterno'],
  ['and','e'],['or','ou'],['but','mas'],['not','nao'],['in','em'],['to','para'],['for','para'],
  ['with','com'],['from','de'],['by','por'],['of','de'],['that','que'],['this','este'],['who','quem'],
  ['which','qual'],['what','que'],['where','onde'],['when','quando'],['how','como'],['if','se'],
  ['because','porque'],['therefore','portanto'],['also','tambem'],['very','muito'],['more','mais'],
  ['Jesus','Jesus'],['Christ','Cristo'],['Paul','Paulo'],['Peter','Pedro'],['John','Joao'],
  ['Matthew','Mateus'],['Mark','Marcos'],['Luke','Lucas'],['James','Tiago'],['Jude','Judas'],
  ['Moses','Moises'],['Abraham','Abraao'],['David','Davi'],['Solomon','Salomao'],['Elijah','Elias'],
  ['Isaiah','Isaias'],['Jeremiah','Jeremias'],['Ezekiel','Ezequiel'],['Daniel','Daniel'],
  ['Israel','Israel'],['Jerusalem','Jerusalem'],['Galilee','Galileia'],['Judea','Judeia'],
  ['temple','templo'],['synagogue','sinagoga'],['church','igreja'],['altar','altar'],
  ['gospel','evangelho'],['scripture','escritura'],['revelation','revelacao'],['prophecy','profecia'],
  ['miracle','milagre'],['parable','parabola'],['apostle','apostolo'],['disciple','discipulo'],
  ['elder','anciao'],['deacon','diacono'],['bishop','bispo'],['pastor','pastor'],['teacher','professor'],
  ['resurrection','ressurreicao'],['ascension','ascensao'],['second coming','segunda vinda'],
  ['kingdom','reino'],['throne','trono'],['crown','coroa'],['glory','gloria'],['honor','honra'],
  ['power','poder'],['authority','autoridade'],
  ['patience','paciencia'],['kindness','bondade'],['goodness','benignidade'],['gentleness','mansidao'],
  ['faithfulness','fidelidade'],['temperance','temperanca'],['joy','alegria'],
  ['longsuffering','longanimidade'],['meekness','mansidao'],['self-control','autocontrole'],
  ['iniquity','iniquidade'],['transgression','transgressao'],['rebellion','rebeliao'],
  ['repentance','arrependimento'],['conversion','conversao'],['sanctification','santificacao'],
  ['justification','justificacao'],['glorification','glorificacao'],['election','eleicao'],
  ['predestination','predestinacao'],['calling','chamado'],['adoption','adocao'],['regeneration','regeneracao'],
  ['perseverance','perseveranca'],['assurance','seguranca'],['eternal security','seguranca eterna'],
  ['compassion','compaixao'],['longsuffering','longanimidade'],
  ['holiness','santidade'],['purity','pureza'],['humility','humildade'],
  ['obedience','obediencia'],['submission','submissao'],['reverence','reverencia'],
  ['trust','confianca'],['dependence','dependencia'],['devotion','devocao'],['consecration','consagracao'],
  ['dedication','dedicacao'],['offering','oferta'],['libation','libacao'],
  ['incense','incenso'],['anointing','uncao'],['baptism','batismo'],['communion','comunhao'],
  ['fasting','jejum'],['supplication','suplica'],['intercession','intercessao'],
  ['thanksgiving','agradecimento'],['adoration','adoracao'],
  ['meditation','meditacao'],['contemplation','contemplacao'],['study','estudo'],['reading','leitura'],
  ['preaching','pregacao'],['teaching','ensino'],['evangelism','evangelismo'],['mission','missao'],
  ['testimony','testemunho'],['witness','testemunha'],['defense','defesa'],['apology','apologia'],
  ['heresy','heresia'],['false doctrine','doutrina falsa'],['false teacher','falso professor'],
  ['false prophet','falso profeta'],['antichrist','anticristo'],['satan','satan'],['devil','diabo'],
  ['demon','demônio'],['archangel','arcanjo'],['cherub','querubim'],['seraph','serafim'],
  ['hell','inferno'],['paradise','paraiso'],
  ['resurrection','ressurreicao'],['rapture','arrebatamento'],
  ['tribulation','tribulacao'],['millennium','milenio'],['final judgment','julgamento final'],
  ['new heaven','novo ceu'],['new earth','nova terra'],['new jerusalem','nova jerusalem'],
  ['river of life','rio da vida'],['tree of life','arvore da vida'],['book of life','livro da vida'],
  ['lake of fire','lago de fogo'],['outer darkness','trevas exteriores'],
  ['gnashing of teeth','range de dentes'],['eternal punishment','punicao eterna'],
  ['eternal life','vida eterna'],['eternal glory','gloria eterna'],['eternal rest','descanso eterno'],
  ['inheritance','heranca'],['reward','recompensa'],['mansion','mansao'],['dwelling','morada'],
  ['tabernacle','tabernaculo'],['mercy seat','propiciatorio'],['ark','arca'],
  ['lampstand','castical'],['incense altar','altar de incenso'],['laver','lavacro'],
  ['veil','veu'],['curtain','cortina'],['wall','muro'],
  ['foundation','fundacao'],['cornerstone','pedra angular'],['capstone','pedra de topo'],
  ['living stone','pedra viva'],['precious stone','pedra preciosa'],['gem','gema'],
  ['gold','ouro'],['silver','prata'],['bronze','bronze'],['iron','ferro'],['clay','argila'],
  ['wood','madeira'],['rock','rocha'],['sand','areia'],['dust','poeira'],
  ['meat','carne'],['fish','peixe'],['fruit','fruto'],
  ['seed','semente'],['wheat','trigo'],['barley','cevada'],['grape','uva'],['fig','figo'],
  ['olive','azeitona'],['vine','videira'],['branch','ramo'],
  ['root','raiz'],['leaf','folha'],['flower','flor'],['grass','grama'],['tree','arvore'],
  ['forest','floresta'],['garden','jardim'],['field','campo'],['vineyard','vinha'],
  ['harvest','colheita'],['winepress','prensa de vinho'],
  ['goat','cabra'],['ox','boi'],['cow','vaca'],
  ['horse','cavalo'],['donkey','jumento'],['camel','camelo'],['dog','cachorro'],['pig','porco'],
  ['bear','urso'],['wolf','lobo'],['fox','raposa'],['eagle','aguia'],
  ['dove','pomba'],['sparrow','pardal'],['serpent','serpente'],['viper','víbora'],
  ['scorpion','escorpiao'],['locust','gafanhoto'],['worm','verme'],
  ['husband','marido'],['wife','esposa'],['family','familia'],['household','casa'],['tribe','tribo'],['nation','nacao'],
  ['kingdom','reino'],['empire','imperio'],['town','vila'],
  ['village','aldeia'],['country','pais'],['land','terra'],['region','regiao'],
  ['mountain','montanha'],['hill','colina'],['valley','vale'],['plain','planicie'],
  ['desert','deserto'],['wilderness','deserto'],['river','rio'],['lake','lago'],['sea','mar'],
  ['island','ilha'],['coast','costa'],['border','fronteira'],['boundary','limite'],
  ['east','leste'],['west','oeste'],['north','norte'],['south','sul'],
  ['right hand','mao direita'],['left hand','mao esquerda'],['before','antes'],['after','depois'],
  ['above','acima'],['below','abaixo'],['inside','dentro'],['outside','fora'],
  ['near','perto'],['far','longe'],['here','aqui'],['there','la'],['everywhere','em todo lugar'],
  ['always','sempre'],['never','nunca'],['sometimes','as vezes'],['often','frequentemente'],
  ['now','agora'],['then','entao'],['soon','em breve'],['later','depois'],
  ['today','hoje'],['yesterday','ontem'],['tomorrow','amanha'],['forever','para sempre'],
  ['beginning','comeco'],['end','fim'],['middle','meio'],
  ['one','um'],['two','dois'],['three','tres'],['four','quatro'],['five','cinco'],
  ['six','seis'],['seven','sete'],['eight','oito'],['nine','nove'],['ten','dez'],
  ['twelve','doze'],['hundred','cem'],['thousand','mil'],
  ['legion','legiao'],['multitude','multidao'],['crowd','turba'],['assembly','assembleia'],
  ['congregation','congregacao'],['synagogue','sinagoga'],['palace','palacio'],['prison','prisao'],
  ['court','tribunal'],['marketplace','mercado'],['street','rua'],['square','praca'],
  ['bridge','ponte'],['well','poco'],['pool','piscina'],['tomb','tumulo'],['grave','sepultura'],
  ['cross','cruz'],['stake','estaca'],['nail','prego'],['spear','lanca'],['sword','espada'],
  ['shield','escudo'],['helmet','capacete'],['breastplate','couraca'],['belt','cinto'],
  ['sandals','sandalia'],['robe','vestido'],['cloak','manto'],['tunic','tunica'],
  ['scepter','cetro'],['ring','anel'],['seal','selo'],['key','chave'],['scroll','pergaminho'],['book','livro'],
  ['letter','carta'],['epistle','epistola'],['decree','decreto'],
  ['edict','edital'],['statute','estatuto'],['ordinance','ordenanca'],
  ['sentence','sentenca'],['verdict','veredito'],['accusation','acusacao'],
  ['evidence','evidencia'],['oath','juramento'],['vow','voto'],['promise','promessa'],['pact','pacto'],
  ['treaty','tratado'],['agreement','acordo'],['contract','contrato'],['debt','divida'],
  ['payment','pagamento'],['price','preco'],['value','valor'],['cost','custo'],
  ['profit','lucro'],['loss','perda'],['gain','ganho'],['estate','propriedade'],
  ['property','propriedade'],['possession','possessao'],['building','edificio'],
  ['pillar','pilar'],['column','coluna'],['beam','viga'],
  ['plank','tábua'],['hammer','martelo'],['axe','machado'],['saw','serra'],
  ['plow','arado'],['sickle','foice'],['yoke','jugo'],['burden','fardo'],['load','carga'],
  ['bag','bolsa'],['purse','bolsa'],['money','dinheiro'],['coin','moeda'],['denarius','denario'],
  ['shekel','siclo'],['talent','talento'],['mite','mite'],['drachma','dracma'],
  ['pearl','perola'],['coral','coral'],['ivory','marfim'],['brick','tijolo'],
  ['mortar','argamassa'],['wax','cera'],['rope','corda'],['cord','cordao'],
  ['thread','fio'],['cloth','pano'],['linen','linho'],['wool','la'],['silk','seda'],
  ['purple','purpura'],['scarlet','escarlata'],['white','branco'],['black','preto'],
  ['red','vermelho'],['blue','azul'],['green','verde'],['yellow','amarelo'],['gold','dourado'],
  ['silver','prateado'],['bronze','bronzeado'],['dark','escuro'],['bright','brilhante'],
  ['shadow','sombra'],['shade','sombra'],['sun','sol'],['moon','lua'],['star','estrela'],
  ['dawn','amanhecer'],['dusk','crepusculo'],['noon','meio-dia'],['midnight','meia-noite'],
  ['morning','manha'],['evening','noite'],['day','dia'],['night','noite'],
  ['week','semana'],['month','mes'],['year','ano'],['season','estacao'],
  ['sabbath','sabado'],['feast','festa'],['festival','festival'],['jubilee','jubileu'],
  ['passover','pascoa'],['pentecost','pentecostes'],['tabernacles','tabernaculos'],
  ['trumpets','trombetas'],['atonement','expiacao'],['purim','purim'],['hanukkah','hanukkah'],
  ['grain','graos'],['barley','cevada'],['pomegranate','romã'],['date','tamara'],['almond','amendoa'],
  ['butter','manteiga'],['milk','leite'],['honey','mel'],['salt','sal'],['vinegar','vinagre'],
  ['beer','cerveja'],['egg','ovo'],['cheese','queijo'],
  ['hat','chapeu'],['veil','veu'],['bracelet','pulseira'],['necklace','colar'],['earring','brinco'],
  ['home','lar'],['tent','tenda'],['fortress','fortaleza'],['dungeon','masmorra'],
  ['fence','cerca'],['hedge','sebe'],['barrier','barreira'],
  ['ladder','escada'],['stairs','escada'],['step','degrau'],
  ['floor','piso'],['ceiling','teto'],['arch','arco'],['dome','cupola'],['spire','agulha'],
  ['table','mesa'],['chair','cadeira'],['bed','cama'],['bench','banco'],
  ['seat','assento'],['couch','sofa'],['mat','esteira'],
  ['candle','vela'],['torch','tocha'],['sunrise','nascer do sol'],['sunset','por do sol'],
  ['hour','hora'],['moment','momento'],['instant','instante'],['time','tempo'],
  ['age','era'],['generation','geracao'],['century','seculo'],['decade','decada'],
]);

// Carregar grego.ts
const gregPath = resolve(ROOT, 'src/data/lexicon/grego.ts');
let gregContent = readFileSync(gregPath, 'utf8');

let traduzidos = 0;
let jaPortugues = 0;
let total = 0;

const re = /strong:\s*'G(\d+)'[^}]*?definicao:\s*'([^']+)'/g;
let match;
const replacements = [];

while ((match = re.exec(gregContent)) !== null) {
  total++;
  const strong = 'G' + match[1];
  const definicao = match[2];
  
  // Ja em portugues?
  if (/[àáâãéêíóôõúç]/i.test(definicao) || 
      /^(substantivo|verbo|adjetivo|advérbio|preposição|conjunção|pronome|numeral|partícula|interjeição)/i.test(definicao) ||
      definicao.includes('de Deus') || definicao.includes('de Cristo') || definicao.includes('do Espirito')) {
    jaPortugues++;
    continue;
  }
  
  // Traduzir usando dicionario
  let resultado = definicao;
  for (const [en, pt] of DIC) {
    const regex = new RegExp('\\b' + en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
    resultado = resultado.replace(regex, pt);
  }
  
  if (resultado !== definicao) {
    replacements.push({ strong, oldDef: definicao, newDef: resultado });
  }
}

for (const { strong, oldDef, newDef } of replacements) {
  const escaped = oldDef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(strong:\\s*'${strong}'[^}]*?definicao:\\s*)'${escaped}'`);
  gregContent = gregContent.replace(regex, `$1'${newDef.replace(/'/g, "\\'")}'`);
  traduzidos++;
}

writeFileSync(gregPath, gregContent, 'utf8');
console.log(`📊 Grego:`);
console.log(`  - Total: ${total}`);
console.log(`  - Ja em PT: ${jaPortugues}`);
console.log(`  - Traduzidos: ${traduzidos}`);
console.log(`  - Ainda em EN: ${total - jaPortugues - traduzidos}`);
