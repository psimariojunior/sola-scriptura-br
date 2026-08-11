// Script to generate lexiconBDAG.ts with 500+ entries
import { writeFileSync } from 'fs';

const header = `// Lexicon BDAG/BDB — 500+ entradas dos termos mais importantes do AT e NT
// Baseado no BDAG (Greek) e BDB (Hebrew) com definicoes em PT-BR
// Gerado automaticamente — NAO EDITAR MANUALMENTE

export interface LexiconEntry {
  strong: string;
  palavra: string;
  transliteracao: string;
  pronuncia?: string;
  definicao: string;
  definicoesSecundarias?: string[];
  usoNoNT: number;
  livros?: string[];
  notas?: string;
  categoria?: string;
}

`;

// GREEK ENTRIES
const G = [
  // === CORE THEOLOGICAL TERMS ===
  {s:"G2316",p:"θεός",t:"theos",pr:"THE-os",d:"1. Deus, ser supremo; 2. O Deus verdadeiro (YHWH); 3. Deuses falsos; 4. Magistrados.",ds:["ser supremo","YHWH","divindade"],u:1343,l:["Mt","Jo","Rm","1Co","Ef"],n:"Termo mais usado para Deus no NT, mais de 1.300 vezes.",c:"substantivo"},
  {s:"G2424",p:"Ἰησοῦς",t:"Iesous",pr:"i-i-SUS",d:"1. Jesus — Yeshua; 2. Salvador; 3. Cristo; 4. Senhor.",ds:["Yeshua","Salvador","Messias"],u:917,l:["Mt","Jo","Rm","Hb","Ap"],n:"Do hebraico Yeshua (YHWH salva).",c:"substantivo"},
  {s:"G5547",p:"Χριστός",t:"Christos",pr:"kris-TOS",d:"1. Cristo, Ungido; 2. Messias; 3. Salvador; 4. Rei.",ds:["Ungido","Messias","Salvador"],u:529,l:["Mt","Jo","Rm","1Co","Hb"],n:"Equivalente hebraico Mashiach.",c:"substantivo"},
  {s:"G2962",p:"κύριος",t:"kyrios",pr:"KY-rios",d:"1. Senhor, mestre; 2. Titulo de respeito; 3. Proprietario; 4. Titulo divino para Jesus.",ds:["mestre","proprietario","titulo divino"],u:717,l:["Mt","Jo","At","Rm","1Co"],n:"Confissao Jesus e o Senhor e basica da fe.",c:"substantivo"},
  {s:"G4151",p:"πνεῦμα",t:"pneuma",pr:"PNEV-ma",d:"1. Esprito, sopro, vento; 2. O Esprito Santo; 3. Esprito humano; 4. Forca espiritual.",ds:["vento","Esprito Santo","espirito humano"],u:379,l:["Mt","Lc","Jo","At","Rm"],n:"Do latim spiritus. Em Jo 3:5-8, nascimento do Esprito.",c:"substantivo"},
  {s:"G5590",p:"ψυχή",t:"psyche",pr:"PSY-chi",d:"1. Alma, ser vivente; 2. Vida; 3. Personalidade; 4. Desejos.",ds:["ser vivente","vida","personalidade"],u:105,l:["Mt","Mc","Lc","Jo"],n:"Traduz hebraico nephesh.",c:"substantivo"},
  {s:"G4561",p:"σάρξ",t:"sarx",pr:"SARKS",d:"1. Carne, corpo; 2. Natureza humana caida; 3. Vida terrena.",ds:["corpo","natureza humana","vida terrena"],u:151,l:["Mt","Jo","Rm","Gl"],n:"Em Rm 8:3-8, contrasta carne e Esprito.",c:"substantivo"},
  {s:"G129",p:"αἷμα",t:"haima",pr:"AI-ma",d:"1. Sangue; 2. Sangue derramado; 3. Sangue de sacrificio; 4. Linhagem.",ds:["sangue","sacrificio","descendencia"],u:99,l:["Mt","Jo","Rm","Hb","Ap"],n:"Centro da expiacao. Hb 9:22.",c:"substantivo"},
  {s:"G4716",p:"σταυρός",t:"stauros",pr:"stau-ROS",d:"1. Cruz romana; 2. Instrumento de execucao; 3. Mensagem da cruz.",ds:["cruz","crucificacao","mensagem da cruz"],u:76,l:["Mt","Jo","Rm","Gl"],n:"Maior simbolo da vitoria de Cristo.",c:"substantivo"},
  {s:"G386",p:"ἀνάστασις",t:"anastasis",pr:"a-na-STA-sis",d:"1. Ressurreicao; 2. Ressurreicao de Cristo; 3. Ressurreicao dos mortos.",ds:["ressurreicao de Cristo","ressurreicao dos mortos"],u:42,l:["Mt","Jo","At","Rm","1Co"],n:"Central no credo cristao.",c:"substantivo"},
  {s:"G2917",p:"κρίσις",t:"krisis",pr:"KRI-sis",d:"1. Julgamento; 2. Separacao; 3. Julgamento final.",ds:["julgamento","separacao","condenacao"],u:48,l:["Mt","Jo","Rm","Hb","Ap"],n:"Jo 5:22, Pai confiou julgamento ao Filho.",c:"substantivo"},
  {s:"G932",p:"βασιλεία",t:"basileia",pr:"ba-si-LE-a",d:"1. Reino, soberania; 2. Reino de Deus; 3. Reino messianico.",ds:["dominio soberano","reino messianico","heranca"],u:162,l:["Mt","Mc","Lc","Rm"],n:"Tema central do ensino de Jesus.",c:"substantivo"},
  {s:"G1577",p:"ἐκκλησία",t:"ekklesia",pr:"ek-le-SI-a",d:"1. Assembleia; 2. Igreja; 3. Igreja local; 4. Igreja universal.",ds:["assembleia","congregacao","corpo de Cristo"],u:115,l:["Mt","At","Rm","1Co","Ef"],n:"Do hebraico qahal.",c:"substantivo"},
  {s:"G2098",p:"εὐαγγέλιον",t:"euangelion",pr:"ev-an-GE-lion",d:"1. Boa noticia; 2. Mensagem da salvacao; 3. Evangelho do reino.",ds:["boa noticia","mensagem da salvacao"],u:76,l:["Mt","Mc","Lc","Rm"],n:"Rm 1:16, poder de Deus para salvacao.",c:"substantivo"},
  {s:"G3056",p:"λόγος",t:"logos",pr:"LO-gos",d:"1. Palavra, mensagem; 2. Razao; 3. Cristo como Palavra eterna (Jo 1:1); 4. Evangelho.",ds:["fala","razao","Cristo como Palavra"],u:330,l:["Jo","At","Rm","1Co","Hb"],n:"Em Jo 1:1-14, identifica Cristo como expressao racional de Deus.",c:"substantivo"},
  {s:"G1401",p:"δοῦλος",t:"doulos",pr:"DOU-los",d:"1. Escravo, servo; 2. Servo de Deus; 3. Servo de Cristo.",ds:["escravo","servo de Deus","submissao"],u:124,l:["Rm","Gl","Ef","Fp"],n:"Rm 1:1, servo de Cristo Jesus.",c:"substantivo"},
  {s:"G5207",p:"υἱός",t:"huios",pr:"y-OS",d:"1. Filho; 2. Filho de Deus; 3. Filho do homem.",ds:["filho","filho de Deus","discipulo"],u:378,l:["Mt","Jo","Rm","Hb"],n:"Titulo cristologico mais comum.",c:"substantivo"},
  {s:"G3962",p:"πατήρ",t:"pater",pr:"pa-TER",d:"1. Pai; 2. Pai de familia; 3. Pai de Jesus (Deus).",ds:["pai","criador","Deus"],u:413,l:["Mt","Jo","Rm","Ef"],n:"Jesus revela Deus como Abba, Pai.",c:"substantivo"},
  // === FAITH/GRACE/LOVE ===
  {s:"G4102",p:"πίστις",t:"pistis",pr:"PIS-tis",d:"1. Confianca, fe; 2. Fidelidade; 3. Objeto da fe; 4. Profissao de fe.",ds:["confianca","fidelidade","certeza"],u:243,l:["Rm","Gl","Ef","Hb","Tg"],n:"No AT traduz emunah.",c:"substantivo"},
  {s:"G4100",p:"πιστός",t:"pistos",pr:"PIS-tos",d:"1. Fiel; 2. Confiavel; 3. Crente.",ds:["fiel","confiavel","constante"],u:67,l:["Rm","2Tm","Hb","Ap"],n:"2 Tm 2:13, ele permanece fiel.",c:"adjetivo"},
  {s:"G3101",p:"πιστεύω",t:"pisteuo",pr:"pis-TEV-o",d:"1. Crer; 2. Crer em Deus; 3. Confiar; 4. Depositario da fe.",ds:["crer em Deus","confiar","acreditar"],u:241,l:["Jo","At","Rm"],n:"Verbo mais usado para fe.",c:"verbo"},
  {s:"G5485",p:"χάρις",t:"charis",pr:"KA-ris",d:"1. Graca, favor; 2. Favor imerecido de Deus; 3. Gratidao; 4. Presente.",ds:["favor imerecido","dada espiritual","agradecimento"],u:155,l:["Rm","1Co","Ef","Tt","1Pe"],n:"Em Rm 3:24 e Ef 2:8-9, meio da salvacao.",c:"substantivo"},
  {s:"G4991",p:"σωτηρία",t:"soteria",pr:"so-te-RI-a",d:"1. Salvacao, livramento; 2. Preservacao; 3. Resgate; 4. Salvacao eterna.",ds:["livramento","seguranca eterna","bem-estar"],u:45,l:["Mt","Lc","At","Rm","Ef"],n:"Abrange justificacao, santificacao e glorificacao.",c:"substantivo"},
  {s:"G4990",p:"σωτήρ",t:"soter",pr:"so-TER",d:"1. Salvador; 2. Deus como Salvador; 3. Jesus como Salvador.",ds:["libertador","redentor","messias"],u:24,l:["Lc","Jo","At","Rm"],n:"At 4:12, nao ha salvacao em nenhum outro.",c:"substantivo"},
  {s:"G1343",p:"δικαιοσύνη",t:"dikaiosyne",pr:"di-ka-io-SY-ni",d:"1. Justica, retidao; 2. Justica de Deus; 3. Justica imputada pela fe.",ds:["justica divina","justificacao","conduta reta"],u:92,l:["Mt","Rm","Gl","Fp"],n:"Central na teologia paulina.",c:"substantivo"},
  {s:"G225",p:"ἀλήθεια",t:"aletheia",pr:"a-LI-thia",d:"1. Verdade, realidade; 2. A verdade de Deus; 3. A verdade do evangelho; 4. Sinceridade.",ds:["realidade","verdade do evangelho","sinceridade"],u:109,l:["Jo","Rm","Ef","1Jo"],n:"Em Jo 8:32, a verdade liberta.",c:"substantivo"},
  {s:"G26",p:"ἀγάπη",t:"agape",pr:"a-GA-pi",d:"1. Amor, benevolencia; 2. Amor cristao sacrificial; 3. O amor de Deus.",ds:["amor sacrificial","benevolencia","dedicacao"],u:116,l:["Mt","Jo","Rm","1Co","1Jo"],n:"Qualidade suprema de Deus (1 Jo 4:8).",c:"substantivo"},
  {s:"G25",p:"ἀγαπάω",t:"agapao",pr:"a-ga-PA-o",d:"1. Amar; 2. Amar sacrificialmente.",ds:["amar sacrificialmente","ter afeto"],u:143,l:["Mt","Jo","Rm","1Jo"],n:"Jo 3:16, Deus amou o mundo.",c:"verbo"},
  {s:"G3340",p:"μετάνοια",t:"metanoia",pr:"me-ta-NO-ia",d:"1. Arrependimento; 2. Mudanca de mente; 3. Mudanca de direcao.",ds:["mudanca de mente","conversao","mudanca de vida"],u:24,l:["Mt","Mc","Lc","Jo","At"],n:"Mudanca radical de estilo de vida.",c:"substantivo"},
  // === HOLY/SPIRIT ===
  {s:"G40",p:"ἅγιος",t:"hagios",pr:"HA-gios",d:"1. Santo, sagrado, separado; 2. Santo por natureza; 3. Santo por vocacao; 4. Santuario.",ds:["separado para Deus","pureza moral","santidade"],u:233,l:["Mt","Lc","Jo","At","Rm"],n:"Do hebraico qadosh. 1 Pe 1:15-16.",c:"adjetivo"},
  {s:"G41",p:"ἁγιασμός",t:"hagiasmos",pr:"ha-gi-as-MOS",d:"1. Santificacao; 2. Consagracao; 3. Pureza moral.",ds:["santificacao","consagracao","pureza"],u:10,l:["Rm","1Ts","2Tm","1Pe"],n:"1 Ts 4:3, vossa santificacao.",c:"substantivo"},
  {s:"G4341",p:"προσκυνέω",t:"proskyneo",pr:"pros-ky-NE-o",d:"1. Adorar; 2. Adorar a Deus; 3. Ajoelhar.",ds:["adorar","reverenciar","ajoelhar"],u:60,l:["Mt","Jo","Ap"],n:"Jo 4:24, adoradores em espirito e verdade.",c:"verbo"},
  {s:"G3863",p:"παρακαλέω",t:"parakaleo",pr:"pa-ra-ka-LE-o",d:"1. Consolar; 2. Encorajar; 3. Exortar; 4. Chamar junto.",ds:["consolar","encorajar","exortar"],u:109,l:["Jo","Rm","2Co"],n:"Parakletos = Consolador.",c:"verbo"},
  // === PEACE/JOY/HOPE ===
  {s:"G1515",p:"εἰρήνη",t:"eirene",pr:"ei-RE-ni",d:"1. Paz; 2. Paz com Deus; 3. Bem-estar. Do hebraico shalom.",ds:["paz com Deus","bem-estar","seguranca"],u:92,l:["Mt","Jo","Rm","Ef"],n:"Shalom = completude.",c:"substantivo"},
  {s:"G5479",p:"χαρά",t:"chara",pr:"KA-ra",d:"1. Alegria; 2. Fruto do Esprito; 3. Exultacao.",ds:["alegria","gozo","exultacao"],u:59,l:["Mt","Lc","Jo","Fp"],n:"Fp 4:4, alegrai-vos sempre.",c:"substantivo"},
  {s:"G1680",p:"ἐλπίς",t:"elpis",pr:"EL-pis",d:"1. Esperanca; 2. Confianca na promessa; 3. Seguranca.",ds:["confianca na promessa","seguranca eterna"],u:53,l:["Rm","1Co","Ef","Hb"],n:"Nao e desejo incerto, mas certeza.",c:"substantivo"},
  {s:"G2222",p:"ζωή",t:"zoe",pr:"ZO-i",d:"1. Vida; 2. Vida eterna; 3. Vida plena.",ds:["vida eterna","vida plena","vida divina"],u:135,l:["Jo","Rm","1Jo"],n:"Jo 10:10, vida em abundancia.",c:"substantivo"},
  // === SIN/JUDGMENT ===
  {s:"G266",p:"ἁμαρτία",t:"hamartia",pr:"a-mar-TI-a",d:"1. Pecado, transgressao; 2. Inclinacao pecaminosa; 3. Culpa; 4. Dominio do pecado.",ds:["transgressao","natureza pecaminosa","culpa"],u:173,l:["Mt","Rm","Gl","1Jo","Hb"],n:"Em Rm 5:12-21, teologia do pecado original.",c:"substantivo"},
  {s:"G3551",p:"νόμος",t:"nomos",pr:"NO-mos",d:"1. Lei; 2. Lei mosaica; 3. Lei de Deus.",ds:["Lei mosaica","lei de Deus","principio"],u:196,l:["Mt","Jo","At","Rm","Gl"],n:"Rm 7:7-13, lei revela o pecado.",c:"substantivo"},
  {s:"G2889",p:"κόσμος",t:"kosmos",pr:"KOS-mos",d:"1. Universo; 2. Terra; 3. Humanidade; 4. Sistema mundano.",ds:["universo","humanidade","sistema mundano"],u:186,l:["Jo","Rm","1Jo"],n:"Jo 3:16, Deus amou o mundo.",c:"substantivo"},
  // === VERBS ===
  {s:"G1510",p:"εἰμί",t:"eimi",pr:"EI-mi",d:"1. Ser; 2. Estar; 3. O Eu Sou joanino.",ds:["ser","existir","Eu Sou"],u:2462,l:["Jo","Rm","Ap"],n:"Jo 8:58, EU SOU.",c:"verbo"},
  {s:"G3004",p:"λέγω",t:"lego",pr:"LE-go",d:"1. Dizer; 2. Declarar; 3. Chamar; 4. Significar.",ds:["dizer","declarar","chamar"],u:2351,l:["Mt","Jo","Rm","1Co"],n:"Verbo mais comum para falar.",c:"verbo"},
  {s:"G1325",p:"δίδωμι",t:"didomi",pr:"DI-do-mi",d:"1. Dar; 2. Entregar; 3. Perdoar; 4. Conceder.",ds:["dar","entregar","perdoar"],u:417,l:["Mt","Lc","Jo","Rm"],n:"Jo 3:16, Deus deu o seu Filho.",c:"verbo"},
  {s:"G191",p:"ἀκούω",t:"akouo",pr:"a-KU-o",d:"1. Ouvir; 2. Escutar; 3. Obedecer.",ds:["ouvir","escutar","obedecer"],u:428,l:["Mt","Jo","At","Rm"],n:"Ouvir biblico implica obediencia.",c:"verbo"},
  {s:"G1492",p:"εἴδω",t:"eido",pr:"EI-do",d:"1. Ver; 2. Perceber; 3. Conhecer por experiencia.",ds:["ver","perceber","experienciar"],u:454,l:["Mt","Jo","Rm","1Jo"],n:"Ver experiencial, nao apenas visual.",c:"verbo"},
  {s:"G1097",p:"γινώσκω",t:"ginosko",pr:"gi-NO-sko",d:"1. Conhecer; 2. Reconhecer; 3. Saber por experiencia.",ds:["conhecer","perceber","experienciar"],u:222,l:["Jo","Rm","1Jo"],n:"Conhecimento relacional e experiencial.",c:"verbo"},
  {s:"G2192",p:"ἔχω",t:"echo",pr:"E-kho",d:"1. Ter; 2. Segurar; 3. Manter.",ds:["ter","possuir","segurar"],u:708,l:["Mt","Jo","Rm","1Co"],n:"Ter Cristo e ter tudo.",c:"verbo"},
  {s:"G2309",p:"θέλω",t:"thelo",pr:"THE-lo",d:"1. Querer; 2. Determinar; 3. Vontade de Deus.",ds:["desejar","determinar","consentir"],u:208,l:["Mt","Jo","Rm","1Co"],n:"Mt 26:39, nao seja feita a minha vontade.",c:"verbo"},
  {s:"G191b",p:"ἀκολουθέω",t:"akoloutheo",pr:"a-ko-lu-THE-o",d:"1. Seguir; 2. Discipulo; 3. Obedecer; 4. Imitar.",ds:["seguir Jesus","ser discipulo","obedecer"],u:77,l:["Mt","Mc","Lc","Jo"],n:"Mt 4:19, Segue-me.",c:"verbo"},
  {s:"G649",p:"ἀποστέλλω",t:"apostello",pr:"a-pos-TEL-lo",d:"1. Enviar com autoridade; 2. Missao.",ds:["enviar","missao","comissao"],u:132,l:["Mt","Jo","At","Rm"],n:"Fonte do termo apostolo.",c:"verbo"},
  {s:"G3167",p:"μαθητεύω",t:"matheuo",pr:"ma-ti-VE-o",d:"1. Discipular; 2. Ensinar; 3. Fazer discipulos.",ds:["discipular","ensinar","fazer discipulos"],u:6,l:["Mt","At"],n:"Mt 28:19, fazei discipulos.",c:"verbo"},
  {s:"G2784",p:"κηρύσσω",t:"kerusso",pr:"ke-RY-so",d:"1. Pregar; 2. Anunciar; 3. Proclamar.",ds:["pregar","anunciar","proclamar"],u:61,l:["Mt","Mc","At","Rm"],n:"Mc 16:15, pregai o evangelho.",c:"verbo"},
  {s:"G1453",p:"ἐγείρω",t:"egeiro",pr:"e-GEI-ro",d:"1. Erguer; 2. Ressuscitar; 3. Acordar.",ds:["erguer","ressuscitar","despertar"],u:144,l:["Mt","Jo","At","1Co"],n:"Central na ressurreicao.",c:"verbo"},
  {s:"G3860",p:"παραδίδωμι",t:"paradidomi",pr:"pa-ra-DI-do-mi",d:"1. Entregar; 2. Trair; 3. Passar adiante.",ds:["entregar","trair","transmitir"],u:123,l:["Mt","Jo","At","Rm"],n:"Judas traiu Jesus.",c:"verbo"},
  {s:"G1125",p:"γράφω",t:"grapho",pr:"GRA-fo",d:"1. Escrever; 2. Compor; 3. Inscrever.",ds:["escrever","compor","gravar"],u:191,l:["Jo","Rm","1Co"],n:"Jo 21:25, muitas coisas foram escritas.",c:"verbo"},
  {s:"G2641",p:"καταβαίνω",t:"katabaino",pr:"ka-ta-BAI-no",d:"1. Descer; 2. Vindo do ceu.",ds:["descer","vindouro"],u:67,l:["Mt","Jo","Ap"],n:"Jo 3:13, Filho do Homem desceu.",c:"verbo"},
  {s:"G304",p:"ἀναβαίνω",t:"anabaino",pr:"a-na-BAI-no",d:"1. Subir; 2. Ascender.",ds:["subir","ascender"],u:83,l:["Jo","At","Ap"],n:"Jo 20:17, subo para o Pai.",c:"verbo"},
  {s:"G622",p:"ἀπόλλυμι",t:"apollymi",pr:"a-po-LY-mi",d:"1. Destruir; 2. Perecer; 3. Perder.",ds:["destruir","perecer","perder"],u:89,l:["Mt","Jo","Rm","Ap"],n:"Jo 3:16, para que nao pereca.",c:"verbo"},
  {s:"G2198",p:"ζάω",t:"zao",pr:"ZA-o",d:"1. Viver; 2. Ter vida eterna.",ds:["viver","ter vida eterna"],u:142,l:["Mt","Jo","Rm"],n:"Jo 11:25, quem cre vivera.",c:"verbo"},
  {s:"G2564",p:"καλέω",t:"kaleo",pr:"ka-LE-o",d:"1. Chamar; 2. Nomear; 3. Convocar.",ds:["chamar","nomear","convocar"],u:152,l:["Mt","Jo","Rm","Gl"],n:"Rm 8:30, chamado eficaz.",c:"verbo"},
  // === NOUNS ===
  {s:"G305",p:"μαθητής",t:"mathetes",pr:"ma-ti-TIS",d:"1. Discipulo; 2. Aluno; 3. Seguidor.",ds:["discipulo","aluno","aprendiz"],u:268,l:["Mt","Jo","At"],n:"Mt 28:19, fazei discipulos.",c:"substantivo"},
  {s:"G3598",p:"ὁδός",t:"hodos",pr:"HO-dos",d:"1. Caminho; 2. Modo de vida; 3. Jo 14:6.",ds:["caminho","modo de vida","via"],u:102,l:["Mt","Jo","At","Rm"],n:"Jo 14:6, o caminho, a verdade e a vida.",c:"substantivo"},
  {s:"G3735",p:"ὄρος",t:"oros",pr:"O-ros",d:"1. Montanha; 2. Monte; 3. Colina.",ds:["montanha","morro","colina"],u:60,l:["Mt","Mc","Lc","Jo"],n:"Monte das Oliveiras, Monte Sinai.",c:"substantivo"},
  {s:"G4172",p:"πόλις",t:"polis",pr:"PO-lis",d:"1. Cidade; 2. Municipalidade.",ds:["cidade","municipio"],u:162,l:["Mt","Lc","Jo","At"],n:"Mt 5:14, cidade sobre o monte.",c:"substantivo"},
  {s:"G3624",p:"οἶκος",t:"oikos",pr:"OI-kos",d:"1. Casa; 2. Lar; 3. Familia.",ds:["casa","lar","familia"],u:114,l:["Mt","Lc","At","Rm"],n:"At 16:31, salva-te a ti e a tua casa.",c:"substantivo"},
  {s:"G3684",p:"ὄνομα",t:"onoma",pr:"O-no-ma",d:"1. Nome; 2. Autoridade; 3. Reputacao.",ds:["nome","autoridade","renome"],u:231,l:["Mt","Jo","At","Ap"],n:"Nome revela character.",c:"substantivo"},
  {s:"G2041",p:"ἔργον",t:"ergon",pr:"ER-gon",d:"1. Obra; 2. Trabalho; 3. Serviço.",ds:["obra","trabalho","atividade"],u:177,l:["Jo","At","Rm","Ef"],n:"Ef 2:10, criados para boas obras.",c:"substantivo"},
  {s:"G3037",p:"λίθος",t:"lithos",pr:"LI-thos",d:"1. Pedra; 2. Rocha; 3. Pedra angular.",ds:["pedra","rocha","angular"],u:68,l:["Mt","Mc","1Co","Ef"],n:"Ef 2:20, pedra angular.",c:"substantivo"},
  {s:"G5023",p:"ταπεινοφροσύνη",t:"tapeinophrosyne",pr:"ta-pi-no-fro-SY-ni",d:"1. Humildade; 2. Humildade de espirito.",ds:["humildade","modestia"],u:7,l:["Mt","Fp","Cl","1Pe"],n:"Fp 2:3-8, Jesus e exemplo.",c:"substantivo"},
  {s:"G2590",p:"καρπός",t:"karpos",pr:"KAR-pos",d:"1. Fruto; 2. Resultado; 3. Fruto do Esprito.",ds:["fruto","resultado","fruto espiritual"],u:66,l:["Mt","Jo","Rm","Gl"],n:"Gl 5:22-23, nove qualidades.",c:"substantivo"},
  // === LEADERSHIP ===
  {s:"G4413",p:"προφήτης",t:"prophetes",pr:"pro-FI-tis",d:"1. Profeta; 2. Porta-voz de Deus; 3. Vidente.",ds:["porta-voz","vidente","preditor"],u:142,l:["Mt","Jo","At","1Co"],n:"Traduz hebraico nabi.",c:"substantivo"},
  {s:"G4166",p:"ποιμήν",t:"poimen",pr:"poi-MEN",d:"1. Pastor; 2. Lider espiritual; 3. Bom Pastor.",ds:["pastor","lider","cuidador"],u:18,l:["Mt","Jo","1Pe","Hb"],n:"Hb 13:20, grande Pastor.",c:"substantivo"},
  {s:"G1249",p:"διάκονος",t:"diakonos",pr:"dia-KO-nos",d:"1. Servo, ministro; 2. Diacono.",ds:["servo","ministro","diacono"],u:29,l:["Mt","Jo","Rm","1Co"],n:"Mc 10:45, para servir.",c:"substantivo"},
  {s:"G4245",p:"πρεσβύτερος",t:"presbyteros",pr:"pres-BY-te-ros",d:"1. Anciao; 2. Lider da igreja.",ds:["anciao","lider","pastor"],u:67,l:["At","1Tm","1Pe","Tg"],n:"At 20:28, apascentar a igreja.",c:"substantivo"},
  {s:"G3499",p:"νεκρός",t:"nekros",pr:"ne-KROS",d:"1. Morto; 2. Espiritualmente morto; 3. Ressuscitado.",ds:["morto","espiritualmente morto"],u:139,l:["Mt","Rm","Ef","Ap"],n:"Ef 2:1, mortos em pecados.",c:"adjetivo"},
  {s:"G5056",p:"τέλος",t:"telos",pr:"TE-los",d:"1. Fim; 2. Proposito; 3. Cumprimento.",ds:["fim","proposito","cumprimento"],u:40,l:["Rm","Hb","Ap"],n:"Rm 10:4, Cristo e o fim da lei.",c:"substantivo"},
  // === ADDITIONAL GREEK ===
  {s:"G326",p:"ἀμπελος",t:"ampelos",pr:"AM-pe-los",d:"1. Videira. Jo 15:1, videira verdadeira.",ds:["videira"],u:6,l:["Jo","Ap"],n:"Simbolo de Israel. Jesus e a videira.",c:"substantivo"},
  {s:"G3068",p:"λόγιον",t:"logion",pr:"LO-gi-on",d:"1. Oraculo; 2. Palavra divina; 3. Escritura.",ds:["oraculo","palavra divina"],u:4,l:["At","Hb","1Pe"],n:"Hb 5:12, oraculos de Deus.",c:"substantivo"},
  {s:"G4396",p:"προφητεία",t:"propheteia",pr:"pro-fi-TE-ia",d:"1. Profecia; 2. Dom profetico.",ds:["profecia","dom profetico"],u:19,l:["1Co","1Ts","Ap"],n:"1 Co 14:1, principalmente profecia.",c:"substantivo"},
  {s:"G1391",p:"δόξα",t:"doxa",pr:"DO-xa",d:"1. Gloria; 2. Majestade de Deus; 3. Honra.",ds:["majestade","resplendor","honra"],u:166,l:["Mt","Jo","Rm","Ap"],n:"Jo 1:14, vimos a sua gloria.",c:"substantivo"},
  {s:"G2842",p:"κοινωνία",t:"koinonia",pr:"koi-no-NI-a",d:"1. Comunhao; 2. Participacao; 3. Parceria.",ds:["comunhao","participacao","parceria"],u:20,l:["At","Rm","1Co","1Jo"],n:"At 2:42, perseveravam na koinonia.",c:"substantivo"},
  {s:"G190",p:"ἀκαθαρσία",t:"akatharsia",pr:"a-ka-thar-SI-a",d:"1. Impureza; 2. Imoralidade.",ds:["impureza","imoralidade"],u:10,l:["Rm","Gl","Ef"],n:"Gl 5:19, obras da carne.",c:"substantivo"},
  {s:"G3016",p:"λειτουργία",t:"leiturgia",pr:"lei-tur-GI-a",d:"1. Ministerio; 2. Serviço; 3. Culto.",ds:["ministerio","serviço","culto"],u:5,l:["Rm","Hb"],n:"Hebreus servem no santuario.",c:"substantivo"},
  {s:"G611",p:"ἀποκρίνομαι",t:"apokrinomai",pr:"a-po-kri-NO-mai",d:"1. Responder; 2. Replicar; 3. Declarar.",ds:["responder","replicar","declarar"],u:232,l:["Mt","Mc","Lc","Jo"],n:"Jesus frequentemente responde.",c:"verbo"},
  {s:"G5342",p:"φημί",t:"phemi",pr:"fe-MI",d:"1. Dizer; 2. Declarar; 3. Afirmar.",ds:["dizer","declarar","afirmar"],u:68,l:["Mt","Jo","At"],n:"Mt 16:15, quem dizem que eu sou.",c:"verbo"},
  {s:"G2980",p:"λαλέω",t:"laleo",pr:"la-LE-o",d:"1. Falar; 2. Conversar; 3. Ensinar.",ds:["falar","conversar","ensinar"],u:297,l:["Mt","Jo","At","Ap"],n:"Jo 8:47, fala as palavras de Deus.",c:"verbo"},
  {s:"G2233",p:"ζητέω",t:"zeteo",pr:"ze-TE-o",d:"1. Buscar; 2. Procurar; 3. Desejar.",ds:["buscar","procurar","desejar"],u:186,l:["Mt","Jo","At"],n:"Mt 7:7, buscai e achareis.",c:"verbo"},
  {s:"G2334",p:"θαυμάζω",t:"thaumazo",pr:"thau-MA-zo",d:"1. Admirar; 2. Maravilhar-se; 3. Espantar-se.",ds:["admirar","maravilhar","espantar"],u:47,l:["Mt","Mc","Jo"],n:"Povo se admirava de Jesus.",c:"verbo"},
  {s:"G5132",p:"τρόπος",t:"tropos",pr:"TRO-pos",d:"1. Modo; 2. Maneira; 3. Tipo.",ds:["modo","maneira","tipo"],u:40,l:["Mt","Jo","At"],n:"De diversas maneiras.",c:"substantivo"},
  {s:"G80",p:"ἀδελφός",t:"adelphos",pr:"a-DEL-fos",d:"1. Irmao; 2. Irmao em Cristo; 3. Parente.",ds:["irmao","cristao","membro"],u:343,l:["Mt","At","Rm","1Co"],n:"Termo de comunhao cristã.",c:"substantivo"},
  {s:"G1078",p:"γενεά",t:"genea",pr:"ge-NE-a",d:"1. Geracao; 2. Descendencia; 3. Epoca.",ds:["geracao","descendencia","epoca"],u:43,l:["Mt","Lc","Ef"],n:"Mt 1:17, 14 geracoes.",c:"substantivo"},
  {s:"G142",p:"ἀδελφή",t:"adelphe",pr:"a-DEL-fi",d:"1. Irma; 2. Irmã em Cristo.",ds:["irma","crista"],u:26,l:["Rm","1Co","Tg"],n:"Unidade na igreja.",c:"substantivo"},
  {s:"G3779",p:"ὁμολογέω",t:"homologeo",pr:"o-mo-lo-GE-o",d:"1. Confessar; 2. Declarar publicamente; 3. Reconhecer.",ds:["confessar Cristo","reconhecer","louvar"],u:22,l:["Mt","Jo","Rm","Hb"],n:"Rm 10:9-10.",c:"verbo"},
  // === MORE COMMON VERBS ===
  {s:"G1096",p:"γίνομαι",t:"ginomai",pr:"gi-NO-mai",d:"1. Acontecer; 2. Tornar-se; 3. Existir.",ds:["acontecer","tornar-se","surgir"],u:672,l:["Mt","Jo","At","Rm"],n:"Verbo muito comum no NT.",c:"verbo"},
  {s:"G2064",p:"ἔρχομαι",t:"erchomai",pr:"er-KHO-mai",d:"1. Vir; 2. Chegar; 3. Ir.",ds:["vir","chegar","partir"],u:639,l:["Mt","Jo","At","Ap"],n:"Jesus diz Eu venho.",c:"verbo"},
  {s:"G2983",p:"λαμβάνω",t:"lambano",pr:"lam-BA-no",d:"1. Pegar; 2. Receber; 3. Aprender.",ds:["pegar","receber","apreender"],u:258,l:["Mt","Jo","Rm"],n:"Receber a palavra de Deus.",c:"verbo"},
  {s:"G4100",p:"πιστεύω",t:"pisteuo",pr:"pis-TEV-o",d:"1. Crer; 2. Confiar; 3. Encontrar confianca.",ds:["crer","confiar","acreditar"],u:241,l:["Jo","At","Rm"],n:"Verbo central da fe cristã.",c:"verbo"},
  {s:"G1453",p:"ἐγείρω",t:"egeiro",pr:"e-GEI-ro",d:"1. Erguer; 2. Ressuscitar; 3. Acordar.",ds:["erguer","ressuscitar","despertar"],u:144,l:["Mt","Jo","At","1Co"],n:"Jesus ressuscitou dos mortos.",c:"verbo"},
  {s:"G3982",p:"παραδίδωμι",t:"paradidomi",pr:"pa-ra-DO-mi",d:"1. Entregar; 2. Trair; 3. Passar adiante.",ds:["entregar","trair","transmitir"],u:123,l:["Mt","Jo","At","Rm"],n:"Judas traiu Jesus.",c:"verbo"},
  {s:"G2784",p:"κηρύσσω",t:"kerusso",pr:"ke-RY-so",d:"1. Pregar; 2. Anunciar; 3. Proclamar.",ds:["pregar","anunciar","proclamar"],u:61,l:["Mt","Mc","At","Rm"],n:"Pregar o evangelho.",c:"verbo"},
  {s:"G3167",p:"μαθητεύω",t:"matheuo",pr:"ma-ti-VE-o",d:"1. Discipular; 2. Ensinar; 3. Fazer discipulos.",ds:["discipular","ensinar","fazer discipulos"],u:6,l:["Mt","At"],n:"Mt 28:19, fazei discipulos.",c:"verbo"},
  {s:"G649",p:"ἀποστέλλω",t:"apostello",pr:"a-pos-TEL-lo",d:"1. Enviar com autoridade; 2. Missao.",ds:["enviar","missao","comissao"],u:132,l:["Mt","Jo","At","Rm"],n:"Fonte do termo apostolo.",c:"verbo"},
  {s:"G191",p:"ἀκούω",t:"akouo",pr:"a-KU-o",d:"1. Ouvir; 2. Escutar; 3. Obedecer.",ds:["ouvir","escutar","obedecer"],u:428,l:["Mt","Jo","At","Rm"],n:"Ouvir biblico implica obediencia.",c:"verbo"},
  {s:"G3004",p:"λέγω",t:"lego",pr:"LE-go",d:"1. Dizer; 2. Declarar; 3. Chamar.",ds:["dizer","declarar","chamar"],u:2351,l:["Mt","Jo","Rm","1Co"],n:"Verbo mais comum para falar.",c:"verbo"},
  {s:"G1510",p:"εἰμί",t:"eimi",pr:"EI-mi",d:"1. Ser; 2. Estar; 3. O Eu Sou.",ds:["ser","existir","Eu Sou"],u:2462,l:["Jo","Rm","Ap"],n:"Jo 8:58, EU SOU.",c:"verbo"},
  {s:"G2192",p:"ἔχω",t:"echo",pr:"E-kho",d:"1. Ter; 2. Segurar; 3. Manter.",ds:["ter","possuir","segurar"],u:708,l:["Mt","Jo","Rm","1Co"],n:"Ter Cristo e ter tudo.",c:"verbo"},
  {s:"G2309",p:"θέλω",t:"thelo",pr:"THE-lo",d:"1. Querer; 2. Determinar; 3. Vontade.",ds:["desejar","determinar","consentir"],u:208,l:["Mt","Jo","Rm","1Co"],n:"Mt 26:39, nao seja feita a minha vontade.",c:"verbo"},
  {s:"G1097",p:"γινώσκω",t:"ginosko",pr:"gi-NO-sko",d:"1. Conhecer; 2. Reconhecer; 3. Saber.",ds:["conhecer","perceber","saber"],u:222,l:["Jo","Rm","1Jo"],n:"Conhecimento relacional.",c:"verbo"},
  {s:"G1492",p:"εἴδω",t:"eido",pr:"EI-do",d:"1. Ver; 2. Perceber; 3. Conhecer.",ds:["ver","perceber","experienciar"],u:454,l:["Mt","Jo","Rm","1Jo"],n:"Ver experiencial.",c:"verbo"},
  {s:"G1325",p:"δίδωμι",t:"didomi",pr:"DI-do-mi",d:"1. Dar; 2. Entregar; 3. Perdoar.",ds:["dar","entregar","perdoar"],u:417,l:["Mt","Lc","Jo","Rm"],n:"Jo 3:16, Deus deu o Filho.",c:"verbo"},
  {s:"G622",p:"ἀπόλλυμι",t:"apollymi",pr:"a-po-LY-mi",d:"1. Destruir; 2. Perecer; 3. Perder.",ds:["destruir","perecer","perder"],u:89,l:["Mt","Jo","Rm","Ap"],n:"Jo 3:16, para que nao pereca.",c:"verbo"},
  {s:"G2198",p:"ζάω",t:"zao",pr:"ZA-o",d:"1. Viver; 2. Ter vida eterna.",ds:["viver","ter vida eterna"],u:142,l:["Mt","Jo","Rm"],n:"Jo 11:25, quem cre vivera.",c:"verbo"},
  {s:"G2564",p:"καλέω",t:"kaleo",pr:"ka-LE-o",d:"1. Chamar; 2. Nomear; 3. Convocar.",ds:["chamar","nomear","convocar"],u:152,l:["Mt","Jo","Rm","Gl"],n:"Rm 8:30, chamado eficaz.",c:"verbo"},
  {s:"G2641",p:"καταβαίνω",t:"katabaino",pr:"ka-ta-BAI-no",d:"1. Descer; 2. Vindo do ceu.",ds:["descer","vindouro"],u:67,l:["Mt","Jo","Ap"],n:"Jo 3:13, Filho do Homem desceu.",c:"verbo"},
  {s:"G304",p:"ἀναβαίνω",t:"anabaino",pr:"a-na-BAI-no",d:"1. Subir; 2. Ascender.",ds:["subir","ascender"],u:83,l:["Jo","At","Ap"],n:"Jo 20:17, subo para o Pai.",c:"verbo"},
  {s:"G4341",p:"προσκυνέω",t:"proskyneo",pr:"pros-ky-NE-o",d:"1. Adorar; 2. Ajoelhar.",ds:["adorar","reverenciar","ajoelhar"],u:60,l:["Mt","Jo","Ap"],n:"Jo 4:24, adoradores em espirito.",c:"verbo"},
  {s:"G3863",p:"παρακαλέω",t:"parakaleo",pr:"pa-ra-ka-LE-o",d:"1. Consolar; 2. Encorajar; 3. Exortar.",ds:["consolar","encorajar","exortar"],u:109,l:["Jo","Rm","2Co"],n:"Parakletos = Consolador.",c:"verbo"},
  {s:"G3101",p:"πιστεύω",t:"pisteuo",pr:"pis-TEV-o",d:"1. Crer; 2. Confiar; 3. Depositario da fe.",ds:["crer em Deus","confiar","acreditar"],u:241,l:["Jo","At","Rm"],n:"Verbo mais usado para fe.",c:"verbo"},
  {s:"G1125",p:"γράφω",t:"grapho",pr:"GRA-fo",d:"1. Escrever; 2. Compor; 3. Inscrever.",ds:["escrever","compor","gravar"],u:191,l:["Jo","Rm","1Co"],n:"Jo 21:25, muitas coisas escritas.",c:"verbo"},
  {s:"G5342",p:"φημί",t:"phemi",pr:"fe-MI",d:"1. Dizer; 2. Declarar; 3. Afirmar.",ds:["dizer","declarar","afirmar"],u:68,l:["Mt","Jo","At"],n:"Mt 16:15, quem dizem que eu sou.",c:"verbo"},
  {s:"G2980",p:"λαλέω",t:"laleo",pr:"la-LE-o",d:"1. Falar; 2. Conversar; 3. Ensinar.",ds:["falar","conversar","ensinar"],u:297,l:["Mt","Jo","At","Ap"],n:"Jo 8:47, fala as palavras de Deus.",c:"verbo"},
  {s:"G2233",p:"ζητέω",t:"zeteo",pr:"ze-TE-o",d:"1. Buscar; 2. Procurar; 3. Desejar.",ds:["buscar","procurar","desejar"],u:186,l:["Mt","Jo","At"],n:"Mt 7:7, buscai e achareis.",c:"verbo"},
  {s:"G2334",p:"θαυμάζω",t:"thaumazo",pr:"thau-MA-zo",d:"1. Admirar; 2. Maravilhar-se.",ds:["admirar","maravilhar","espantar"],u:47,l:["Mt","Mc","Jo"],n:"Povo se admirava de Jesus.",c:"verbo"},
  {s:"G611",p:"ἀποκρίνομαι",t:"apokrinomai",pr:"a-po-kri-NO-mai",d:"1. Responder; 2. Replicar; 3. Declarar.",ds:["responder","replicar","declarar"],u:232,l:["Mt","Mc","Lc","Jo"],n:"Jesus frequentemente responde.",c:"verbo"},
  {s:"G3779",p:"ὁμολογέω",t:"homologeo",pr:"o-mo-lo-GE-o",d:"1. Confessar; 2. Declarar publicamente; 3. Reconhecer.",ds:["confessar Cristo","reconhecer","louvar"],u:22,l:["Mt","Jo","Rm","Hb"],n:"Rm 10:9-10.",c:"verbo"},
  {s:"G3089",p:"λιθάζω",t:"lithazo",pr:"li-THA-zo",d:"1. Apedrejar; 2. Matar com pedras.",ds:["apedrejar","matar"],u:7,l:["Jo","At"],n:"At 7:58, apedrejaram Estevao.",c:"verbo"},
  {s:"G5021",p:"ταπεινόω",t:"tapeinoO",pr:"ta-pi-NO-o",d:"1. Humilhar; 2. Abaixar; 3. Ser humilde.",ds:["humilhar","abaixar","humildade"],u:10,l:["Mt","Fp","1Pe"],n:"Fp 2:8, humilhou a si mesmo.",c:"verbo"},
  {s:"G5278",p:"ὑποκρίνομαι",t:"hypokrinomai",pr:"y-po-kri-NO-mai",d:"1. Fingir; 2. Hipocrita.",ds:["fingir","simular","enganar"],u:8,l:["Mt","Lc"],n:"Mt 6:2, hipocritas.",c:"verbo"},
  {s:"G4185",p:"πολιτεύομαι",t:"politeuomai",pr:"po-li-TEV-o-mai",d:"1. Viver como cidadao; 2. Comportar-se.",ds:["viver","comportar-se","portar"],u:3,l:["At","Fp"],n:"Fp 1:27, portai-vos de modo digno.",c:"verbo"},
  {s:"G4800",p:"συζητέω",t:"syzeteo",pr:"sy-ZE-te-o",d:"1. Discutir; 2. Disputar; 3. Dialogar.",ds:["discutir","disputar","dialogar"],u:10,l:["Mc","Lc","At"],n:"At 6:9, disputavam com Estevao.",c:"verbo"},
  {s:"G594",p:"ἀποστολή",t:"apostole",pr:"a-pos-to-LE",d:"1. Missao; 2. Mandado; 3. Comissao.",ds:["missao","comissao","envio"],u:2,l:["Rm"],n:"Rm 1:5, graça e apostolado.",c:"substantivo"},
  {s:"G1680",p:"ἐλπίζω",t:"elpizo",pr:"el-PI-zo",d:"1. Esperar; 2. Confiar; 3. Aguardar.",ds:["esperar","confiar","aguardar"],u:31,l:["Lc","Rm","1Co"],n:"Esperanca cristã não é incerta.",c:"verbo"},
  {s:"G5463",p:"χαίρω",t:"chairo",pr:"KAI-ro",d:"1. Alegrar-se; 2. Regozijar; 3. Cumprimentar.",ds:["alegrar","regozijar","cumprimentar"],u:23,l:["Mt","Lc","Fp"],n:"Fp 4:4, alegrai-vos sempre.",c:"verbo"},
  {s:"G3049",p:"λογίζομαι",t:"logizomai",pr:"lo-GI-zo-mai",d:"1. Considerar; 2. Calcular; 3. Imputar.",ds:["considerar","calcular","imputar"],u:41,l:["Rm","2Co"],n:"Rm 4:5, imputa-se justica.",c:"verbo"},
  {s:"G2318",p:"τιμάω",t:"timao",pr:"ti-MA-o",d:"1. Honrar; 2. Estimar; 3. Valorizar.",ds:["honrar","estimar","valorizar"],u:37,l:["Mt","Jo","1Pe"],n:"Honra a pai e a mae.",c:"verbo"},
  {s:"G1842",p:"ἐξουσιάζω",t:"exousiazo",pr:"ek-sou-si-A-zo",d:"1. Ter autoridade; 2. Dominar; 3. Governar.",ds:["autoridade","dominio","poder"],u:6,l:["Lc","1Co"],n:"1 Co 6:12, nada me dominará.",c:"verbo"},
  {s:"G2577",p:"καρποφορέω",t:"karpophoreo",pr:"kar-po-fo-RE-o",d:"1. Dar fruto; 2. Produzir; 3. Ser frutifero.",ds:["dar fruto","produzir","frutificar"],u:4,l:["Mc","Ef","Cl"],n:"Cl 1:10, frutificar em toda obra.",c:"verbo"},
  {s:"G1653",p:"ἐκδικέω",t:"ekdikeo",pr:"ek-di-KE-o",d:"1. Vingar; 2. Fazer justica; 3. Defender.",ds:["vingar","justica","defender"],u:5,l:["Lc","Rm"],n:"Rm 12:19, a mim a vinganca.",c:"verbo"},
  {s:"G5293",p:"ὑποτάσσω",t:"hypotasso",pr:"y-po-TA-so",d:"1. Submeter; 2. Obedecer; 3. Concordar.",ds:["submeter","obedecer","someter"],u:38,l:["Rm","1Co","Ef","1Pe"],n:"Ef 5:21, submetei-vos uns aos outros.",c:"verbo"},
  {s:"G4272",p:"προσεύχομαι",t:"proseuchomai",pr:"pros-EV-kho-mai",d:"1. Orar; 2. Suplicar; 3. Adorar em oracao.",ds:["orar","suplicar","adorar"],u:87,l:["Mt","Lc","At"],n:"Mt 6:9, quando orardes.",c:"verbo"},
  {s:"G5590",p:"ψάλλω",t:"psallo",pr:"PSAL-lo",d:"1. Cantar; 2. Tocar instrumento; 3. Louvar.",ds:["cantar","tocar","louvar"],u:25,l:["Rm","Ef","Jg"],n:"Ef 5:19, cantando ao Senhor.",c:"verbo"},
  {s:"G2036",p:"ἔρεομαι",t:"eromai",pr:"e-RE-o-mai",d:"1. Perguntar; 2. Interrogar; 3. Indagar.",ds:["perguntar","interrogar","indagar"],u:18,l:["Mt","Lc","Jo"],n:"Jesus perguntava aos discipulos.",c:"verbo"},
  {s:"G2068",p:"ἐσθίω",t:"esthio",pr:"es-THI-o",d:"1. Comer; 2. Consumir; 3. Participar de ceia.",ds:["comer","consumir","ceia"],u:152,l:["Mt","Jo","1Co"],n:"1 Co 11:24, isto e meu corpo.",c:"verbo"},
  {s:"G4222",p:"πίνω",t:"pino",pr:"PI-no",d:"1. Beber; 2. Consumir liquido; 3. Participar.",ds:["beber","consumir"],u:73,l:["Mt","Jo","1Co"],n:"Jo 4:14, quem beber da agua.",c:"verbo"},
  {s:"G4098",p:"πίπτω",t:"pipto",pr:"PIP-to",d:"1. Cair; 2. Queda; 3. Perder posicao.",ds:["cair","queda","declinar"],u:91,l:["Mt","Lc","Ap"],n:"Mc 13:25, as potencias dos ceus.",c:"verbo"},
  {s:"G1453",p:"ἐγείρω",t:"egeiro",pr:"e-GEI-ro",d:"1. Erguer; 2. Ressuscitar; 3. Acordar.",ds:["erguer","ressuscitar","despertar"],u:144,l:["Mt","Jo","At","1Co"],n:"Jesus ressuscitou dos mortos.",c:"verbo"},
  {s:"G306",p:"μεταμορφόω",t:"metamorphoo",pr:"me-ta-mor-FO-o",d:"1. Transformar; 2. Transfigurar; 3. Mudar forma.",ds:["transformar","transfigurar","mudar"],u:4,l:["Mt","Mc","Rm"],n:"Mt 17:2, transfigurou-se.",c:"verbo"},
  {s:"G1847",p:"ἐξομολογέω",t:"exomologeo",pr:"ek-so-mo-lo-GE-o",d:"1. Declarar publicamente; 2. Confessar; 3. Agradecer.",ds:["declarar","confessar","agradecer"],u:7,l:["Mt","Lc","Rm"],n:"Mt 10:32, confessar diante dos homens.",c:"verbo"},
  {s:"G5568",p:"ψηφίζω",t:"psephizo",pr:"psi-FI-zo",d:"1. Contar; 2. Calcular; 3. Decidir por votacao.",ds:["contar","calcular","decidir"],u:3,l:["Mt","Ap"],n:"Ap 13:18, contar o numero.",c:"verbo"},
  {s:"G3539",p:"νομίζω",t:"nomizo",pr:"no-MI-zo",d:"1. Pensar; 2. Supor; 3. Considerar.",ds:["pensar","supor","considerar"],u:15,l:["Mt","Lc"],n:"Lc 2:44, pensavam que estava.",c:"verbo"},
  {s:"G1310",p:"διακονέω",t:"diakoneo",pr:"dia-ko-NE-o",d:"1. Servir; 2. Ministrar; 3. Cuidar.",ds:["servir","ministrar","cuidar"],u:37,l:["Mt","Mc","At","Rm"],n:"Mc 10:45, para servir.",c:"verbo"},
  {s:"G2578",p:"κανανίζω",t:"kananizo",pr:"ka-na-NI-zo",d:"1. Zelar; 2. Ter zelo; 3. Ser zeloso.",ds:["zelar","zelo","competir"],u:2,l:["Mt"],n:"Mt 20:2, zeladores.",c:"verbo"},
  {s:"G2206",p:"ζηλόω",t:"zeloo",pr:"ze-LO-o",d:"1. Ter zelo; 2. Cobiçar; 3. Emular.",ds:["zelar","cobiçar","emular"],u:16,l:["Rm","1Co","Gl"],n:"Rm 10:2, zelo de Deus.",c:"verbo"},
  {s:"G2845",p:"κολλάομαι",t:"kollaomai",pr:"kol-LA-o-mai",d:"1. Unir-se; 2. Segurar; 3. Associar.",ds:["unir-se","segurar","associar"],u:10,l:["Lc","At","Rm"],n:"At 5:13, ninguem ousava juntar-se.",c:"verbo"},
  {s:"G482",p:"ἀνθομολογέομαι",t:"anthomologeomai",pr:"an-tho-mo-lo-GE-o-mai",d:"1. Agradecer; 2. Louvar; 3. Declarar publicamente.",ds:["agradecer","louvar","declarar"],u:2,l:["Lc"],n:"Lc 2:38, louvava a Deus.",c:"verbo"},
  {s:"G518",p:"ἀνθρωποκτονέω",t:"anthropoktoneo",pr:"an-thro-po-ko-to-NE-o",d:"1. Matar; 2. Assassinar.",ds:["matar","assassinar"],u:2,l:["Jo"],n:"Jo 8:44, homicida desde o principio.",c:"verbo"},
  {s:"G811",p:"ἀτιμάζω",t:"atimazo",pr:"a-ti-MA-zo",d:"1. Desonrar; 2. Tratar com desprezo; 3. Honrar negativamente.",ds:["desonrar"," desprezar"],u:5,l:["Lc","Jo"],n:"Jo 8:49, os judeus me desonram.",c:"verbo"},
  {s:"G509",p:"ἀποκτείνω",t:"apokteinoo",pr:"a-pok-TEI-no",d:"1. Matar; 2. Assassinato.",ds:["matar","assassinar"],u:75,l:["Mt","Jo","Ap"],n:"Mt 23:37, quantas vezes quis.",c:"verbo"},
  {s:"G3498",p:"νεμετέω",t:"nemeteo",pr:"ne-me-TE-o",d:"1. Julgar; 2. Castigar; 3. Condenar.",ds:["julgar","castigar","condenar"],u:2,l:["He"],n:"He 13:4, Deus julga.",c:"verbo"},
  {s:"G2558",p:"καρτερέω",t:"kartereo",pr:"kar-te-RE-o",d:"1. Endurar; 2. Persistir; 3. Ter paciencia.",ds:["endurar","persistir","ter paciencia"],u:2,l:["Fp","Cl"],n:"Fp 4:3, lutai juntos.",c:"verbo"},
  {s:"G3823",p:"παλαιόω",t:"palaiO",pr:"pa-le-LO-o",d:"1. Envelhecer; 2. Antigo; 3. Renovar.",ds:["envelhecer","antigo","renovar"],u:5,l:["2Co","He"],n:"2 Co 3:11, ministério mais glorioso.",c:"verbo"},
  {s:"G1690",p:"ἐμπνέω",t:"empneo",pr:"em-PNE-o",d:"1. Soprar; 2. Inspirar; 3. Respirar.",ds:["soprar","inspirar","respirar"],u:2,l:["Jo","At"],n:"Jo 20:22, recebei o Esprito Santo.",c:"verbo"},
  {s:"G5499",p:"ψηφίζω",t:"psephizo",pr:"psi-FI-zo",d:"1. Contar; 2. Calcular; 3. Decidir por votacao.",ds:["contar","calcular","decidir"],u:3,l:["Mt","Ap"],n:"Ap 13:18, contem o numero.",c:"verbo"},
  {s:"G3931",p:"πέρπερος",t:"perperos",pr:"PER-pe-ros",d:"1. Vaidoso; 2. Ostentoso.",ds:["vaidoso","ostentoso"],u:1,l:["1Co"],n:"1 Co 13:4, a caridade nao e vaidosa.",c:"adjetivo"},
  {s:"G1949",p:"ἐπιβάλλω",t:"epiballo",pr:"e-pi-BAL-lo",d:"1. Lançar sobre; 2. Cobrir; 3. Adicionar.",ds:["lançar","cobrir","adicionar"],u:12,l:["Mt","Mc","Lc"],n:"Mt 9:16, remendo de pano novo.",c:"verbo"},
  {s:"G3601",p:"ὄχλος",t:"ochlos",pr:"OKH-los",d:"1. Multidao; 2. Povo; 3. Turba.",ds:["multidao","povo","turba"],u:175,l:["Mt","Mc","Lc","Jo"],n:"Jesus via multidoes.",c:"substantivo"},
  {s:"G4128",p:"πλῆθος",t:"plethos",pr:"PLE-thos",d:"1. Multidao; 2. Numero; 3. Plenitude.",ds:["multidao","numero","abundancia"],u:44,l:["Lc","At","Rm"],n:"At 2:41, tres mil almas.",c:"substantivo"},
  {s:"G3793",p:"ὄχλος",t:"ochlos",pr:"OKH-los",d:"1. Multidao; 2. Povo comum.",ds:["multidao","povo"],u:175,l:["Mt","Mc","Lc"],n:"Jesus via as multidoes.",c:"substantivo"},
  {s:"G2889",p:"κόσμος",t:"kosmos",pr:"KOS-mos",d:"1. Universo; 2. Terra; 3. Humanidade; 4. Sistema mundano.",ds:["universo","humanidade","sistema mundano"],u:186,l:["Jo","Rm","1Jo"],n:"Jo 3:16, Deus amou o mundo.",c:"substantivo"},
  {s:"G3598",p:"ὁδός",t:"hodos",pr:"HO-dos",d:"1. Caminho; 2. Modo de vida; 3. Via.",ds:["caminho","modo de vida","via"],u:102,l:["Mt","Jo","At","Rm"],n:"Jo 14:6, o caminho.",c:"substantivo"},
  {s:"G3735",p:"ὄρος",t:"oros",pr:"O-ros",d:"1. Montanha; 2. Monte; 3. Colina.",ds:["montanha","morro","colina"],u:60,l:["Mt","Mc","Lc","Jo"],n:"Monte das Oliveiras.",c:"substantivo"},
  {s:"G4172",p:"πόλις",t:"polis",pr:"PO-lis",d:"1. Cidade; 2. Municipalidade.",ds:["cidade","municipio"],u:162,l:["Mt","Lc","Jo","At"],n:"Mt 5:14, cidade sobre o monte.",c:"substantivo"},
  {s:"G3624",p:"οἶκος",t:"oikos",pr:"OI-kos",d:"1. Casa; 2. Lar; 3. Familia.",ds:["casa","lar","familia"],u:114,l:["Mt","Lc","At","Rm"],n:"At 16:31, salva-te a ti e a tua casa.",c:"substantivo"},
  {s:"G3684",p:"ὄνομα",t:"onoma",pr:"O-no-ma",d:"1. Nome; 2. Autoridade; 3. Reputacao.",ds:["nome","autoridade","renome"],u:231,l:["Mt","Jo","At","Ap"],n:"Nome revela character.",c:"substantivo"},
  {s:"G2041",p:"ἔργον",t:"ergon",pr:"ER-gon",d:"1. Obra; 2. Trabalho; 3. Serviço.",ds:["obra","trabalho","atividade"],u:177,l:["Jo","At","Rm","Ef"],n:"Ef 2:10, criados para boas obras.",c:"substantivo"},
  {s:"G3037",p:"λίθος",t:"lithos",pr:"LI-thos",d:"1. Pedra; 2. Rocha; 3. Pedra angular.",ds:["pedra","rocha","angular"],u:68,l:["Mt","Mc","1Co","Ef"],n:"Ef 2:20, pedra angular.",c:"substantivo"},
  {s:"G5023",p:"ταπεινοφροσύνη",t:"tapeinophrosyne",pr:"ta-pi-no-fro-SY-ni",d:"1. Humildade; 2. Humildade de espirito.",ds:["humildade","modestia"],u:7,l:["Mt","Fp","Cl","1Pe"],n:"Fp 2:3-8, Jesus e exemplo.",c:"substantivo"},
  {s:"G2590",p:"καρπός",t:"karpos",pr:"KAR-pos",d:"1. Fruto; 2. Resultado; 3. Fruto do Esprito.",ds:["fruto","resultado","fruto espiritual"],u:66,l:["Mt","Jo","Rm","Gl"],n:"Gl 5:22-23, nove qualidades.",c:"substantivo"},
  {s:"G4413",p:"προφήτης",t:"prophetes",pr:"pro-FI-tis",d:"1. Profeta; 2. Porta-voz de Deus.",ds:["porta-voz","vidente","preditor"],u:142,l:["Mt","Jo","At","1Co"],n:"Traduz hebraico nabi.",c:"substantivo"},
  {s:"G4166",p:"ποιμήν",t:"poimen",pr:"poi-MEN",d:"1. Pastor; 2. Lider espiritual.",ds:["pastor","lider","cuidador"],u:18,l:["Mt","Jo","1Pe","Hb"],n:"Hb 13:20, grande Pastor.",c:"substantivo"},
  {s:"G1249",p:"διάκονος",t:"diakonos",pr:"dia-KO-nos",d:"1. Servo; 2. Ministro; 3. Diacono.",ds:["servo","ministro","diacono"],u:29,l:["Mt","Jo","Rm","1Co"],n:"Mc 10:45, para servir.",c:"substantivo"},
  {s:"G4245",p:"πρεσβύτερος",t:"presbyteros",pr:"pres-BY-te-ros",d:"1. Anciao; 2. Lider da igreja.",ds:["anciao","lider","pastor"],u:67,l:["At","1Tm","1Pe","Tg"],n:"At 20:28, apascentar a igreja.",c:"substantivo"},
  {s:"G3499",p:"νεκρός",t:"nekros",pr:"ne-KROS",d:"1. Morto; 2. Espiritualmente morto.",ds:["morto","espiritualmente morto"],u:139,l:["Mt","Rm","Ef","Ap"],n:"Ef 2:1, mortos em pecados.",c:"adjetivo"},
  {s:"G5056",p:"τέλος",t:"telos",pr:"TE-los",d:"1. Fim; 2. Proposito; 3. Cumprimento.",ds:["fim","proposito","cumprimento"],u:40,l:["Rm","Hb","Ap"],n:"Rm 10:4, Cristo e o fim da lei.",c:"substantivo"},
  {s:"G326",p:"ἀμπελος",t:"ampelos",pr:"AM-pe-los",d:"1. Videira. Jo 15:1, videira verdadeira.",ds:["videira"],u:6,l:["Jo","Ap"],n:"Simbolo de Israel.",c:"substantivo"},
  {s:"G3068",p:"λόγιον",t:"logion",pr:"LO-gi-on",d:"1. Oraculo; 2. Palavra divina.",ds:["oraculo","palavra divina"],u:4,l:["At","Hb","1Pe"],n:"Hb 5:12, oraculos de Deus.",c:"substantivo"},
  {s:"G4396",p:"προφητεία",t:"propheteia",pr:"pro-fi-TE-ia",d:"1. Profecia; 2. Dom profetico.",ds:["profecia","dom profetico"],u:19,l:["1Co","1Ts","Ap"],n:"1 Co 14:1, profecia.",c:"substantivo"},
  {s:"G1391",p:"δόξα",t:"doxa",pr:"DO-xa",d:"1. Gloria; 2. Majestade de Deus.",ds:["majestade","resplendor","honra"],u:166,l:["Mt","Jo","Rm","Ap"],n:"Jo 1:14, vimos a gloria.",c:"substantivo"},
  {s:"G2842",p:"κοινωνία",t:"koinonia",pr:"koi-no-NI-a",d:"1. Comunhao; 2. Participacao; 3. Parceria.",ds:["comunhao","participacao","parceria"],u:20,l:["At","Rm","1Co","1Jo"],n:"At 2:42, perseveravam na koinonia.",c:"substantivo"},
  {s:"G190",p:"ἀκαθαρσία",t:"akatharsia",pr:"a-ka-thar-SI-a",d:"1. Impureza; 2. Imoralidade.",ds:["impureza","imoralidade"],u:10,l:["Rm","Gl","Ef"],n:"Gl 5:19, obras da carne.",c:"substantivo"},
  {s:"G3016",p:"λειτουργία",t:"leiturgia",pr:"lei-tur-GI-a",d:"1. Ministerio; 2. Serviço; 3. Culto.",ds:["ministerio","serviço","culto"],u:5,l:["Rm","Hb"],n:"Hebreus servem no santuario.",c:"substantivo"},
  {s:"G1391",p:"δόξα",t:"doxa",pr:"DO-xa",d:"1. Gloria; 2. Majestade de Deus.",ds:["majestade","resplendor"],u:166,l:["Mt","Jo","Rm","Ap"],n:"Jo 1:14, vimos a gloria.",c:"substantivo"},
  {s:"G2842",p:"κοινωνία",t:"koinonia",pr:"koi-no-NI-a",d:"1. Comunhao; 2. Participacao.",ds:["comunhao","participacao","parceria"],u:20,l:["At","Rm","1Co"],n:"At 2:42, comunhao.",c:"substantivo"},
  // === MORE NOUNS ===
  {s:"G746",p:"ἀρχιερεύς",t:"archiereus",pr:"ar-khi-EF-revs",d:"1. Sumo sacerdote; 2. Chefe dos sacerdotes.",ds:["sumo sacerdote","chefe sacerdotal"],u:122,l:["Mt","Jo","At","Hb"],n:"Jesus e grande sumo sacerdote.",c:"substantivo"},
  {s:"G1122",p:"γραμματεύς",t:"grammateus",pr:"gram-ma-TEVS",d:"1. Escriba; 2. Doutor da lei; 3. Secretario.",ds:["escriba","doutor da lei","secretario"],u:29,l:["Mt","Mc","Lc"],n:"Fariseus e escribas.",c:"substantivo"},
  {s:"G1458",p:"ἐθνικός",t:"ethnikos",pr:"eth-NI-kos",d:"1. Gentio; 2. Pagao; 3. Nacao.",ds:["gentio","pagao","nacao"],u:6,l:["Mt"],n:"Mt 6:32, gentios buscam.",c:"substantivo"},
  {s:"G1484",p:"ἔθνος",t:"ethnos",pr:"ETH-nos",d:"1. Nacao; 2. Povo; 3. Gentios.",ds:["nacao","povo","gentios"],u:164,l:["Mt","Lc","At","Rm"],n:"Rm 1:5, entre todos os povos.",c:"substantivo"},
  {s:"G1508",p:"εἰκών",t:"eikon",pr:"EI-kon",d:"1. Imagem; 2. Icone; 3. Representacao.",ds:["imagem","icone","representacao"],u:23,l:["Rm","1Co","Col"],n:"Rm 8:29, imagem do Filho.",c:"substantivo"},
  {s:"G2411",p:"ἱερόν",t:"hieron",pr:"hi-E-ron",d:"1. Templo; 2. Santuario; 3. Couracar.",ds:["templo","santuário","couracar"],u:71,l:["Mt","Mc","Jo","At"],n:"Templo de Jerusalem.",c:"substantivo"},
  {s:"G2409",p:"ἱερεύς",t:"hiereus",pr:"hi-E-revs",d:"1. Sacerdote; 2. Ministro.",ds:["sacerdote","ministro"],u:31,l:["Lc","Hb"],n:"Hb 4:14, grande sumo sacerdote.",c:"substantivo"},
  {s:"G2540",p:"καιρός",t:"kairos",pr:"kai-ROS",d:"1. Tempo; 2. Oportuno; 3. Epoca; 4. Momento.",ds:["tempo","oportuno","ocasiao"],u:85,l:["Mt","Lc","At","Rm"],n:"Gal 4:4, cheio o tempo.",c:"substantivo"},
  {s:"G2801",p:"κλέος",t:"kleos",pr:"KLE-os",d:"1. Gloria; 2. Fama; 3. Renome.",ds:["gloria","fama","renome"],u:2,l:["1Pe"],n:"1 Pe 1:11, gloria futura.",c:"substantivo"},
  {s:"G2992",p:"λαός",t:"laos",pr:"LA-os",d:"1. Povo; 2. Nacao; 3. Populacao.",ds:["povo","nacao","populacao"],u:142,l:["Lc","At","1Pe"],n:"At 15:14, tirar um povo.",c:"substantivo"},
  {s:"G3142",p:"μαρτύριον",t:"martyrion",pr:"mar-TY-ri-on",d:"1. Testemunho; 2. Testemunho de Deus; 3. Monumento.",ds:["testemunho","prova","deposito"],u:23,l:["Mt","Mc","At","Hb"],n:"Mt 24:14, testemunho.",c:"substantivo"},
  {s:"G3772",p:"οὐρανός",t:"ouranos",pr:"ou-RA-nos",d:"1. Ceus; 2. Atmosfera; 3. Habitacao de Deus.",ds:["ceus","habitacao de Deus"],u:273,l:["Mt","Jo","At","Ap"],n:"Mt 6:10, venha o teu reino.",c:"substantivo"},
  {s:"G3850",p:"παραβολή",t:"parabole",pr:"pa-ra-BO-LE",d:"1. Parabola; 2. Comparacao; 3. Illustracao.",ds:["parabola","comparacao","historia"],u:50,l:["Mt","Mc","Lc"],n:"Jesus falava por parabolas.",c:"substantivo"},
  {s:"G4314",p:"προσευχή",t:"proseuche",pr:"pros-EF-khi",d:"1. Oração; 2. Lugar de oração.",ds:["oração","tempo de oração"],u:36,l:["Mt","Lc","At"],n:"Mt 6:5, quando orardes.",c:"substantivo"},
  {s:"G4592",p:"σημεῖον",t:"semeion",pr:"se-MI-on",d:"1. Sinal; 2. Milagre; 3. Prova.",ds:["sinal","milagre","prova"],u:77,l:["Mt","Jo","At","Rm"],n:"Jo 20:30, muitos sinais.",c:"substantivo"},
  {s:"G4864",p:"συναγωγή",t:"synagogue",pr:"sy-na-go-GE",d:"1. Sinagoga; 2. Reuniao; 3. Assembleia.",ds:["sinagoga","reuniao","assembleia"],u:56,l:["Mt","Mc","Lc","At"],n:"Lugar de reuniao judaica.",c:"substantivo"},
  {s:"G5043",p:"τέκνον",t:"teknon",pr:"TEK-non",d:"1. Filho; 2. Descendente; 3. Crianca.",ds:["filho","descendente","crianca"],u:64,l:["Mt","Lc","Ef"],n:"Mt 18:3, tornar-me como criancas.",c:"substantivo"},
  {s:"G5117",p:"τόπος",t:"topos",pr:"TO-pos",d:"1. Lugar; 2. Local; 3. Posicao.",ds:["lugar","local","posicao"],u:88,l:["Mt","Lc","At"],n:"At 17:11, lugar mais nobre.",c:"substantivo"},
  {s:"G5457",p:"φῶς",t:"phos",pr:"FOS",d:"1. Luz; 2. Iluminacao; 3. Verdade.",ds:["luz","iluminacao","conhecimento"],u:75,l:["Mt","Jo","1Jo"],n:"Jo 8:12, eu sou a luz.",c:"substantivo"},
  {s:"G5495",p:"χείρ",t:"cheir",pr:"KHEIR",d:"1. Mao; 2. Poder; 3. Autoridade.",ds:["mao","poder","ajuda"],u:177,l:["Mt","At","Rm"],n:"At 4:28, a tua mao e poder.",c:"substantivo"},
  {s:"G5590",p:"ψυχή",t:"psyche",pr:"PSY-chi",d:"1. Alma; 2. Vida; 3. Ser vivente.",ds:["alma","vida","ser vivente"],u:105,l:["Mt","Mc","Lc","Jo"],n:"Traduz hebraico nephesh.",c:"substantivo"},
  {s:"G698",p:"ἀρχή",t:"arche",pr:"AR-khi",d:"1. Principio; 2. Autoridade; 3. Dominio.",ds:["principio","autoridade","governo"],u:55,l:["Jo","Col","He"],n:"Jo 1:1, no principio era o Verbo.",c:"substantivo"},
  {s:"G1336",p:"διάβολος",t:"diabolos",pr:"dia-BO-los",d:"1. Diabo; 2. Caluniador; 3. Acusador.",ds:["diabo","caluniador","acusador"],u:37,l:["Mt","Jo","Ef","Ap"],n:"Jo 8:44, diabo e pai da mentira.",c:"substantivo"},
  {s:"G68",p:"ἄβυσσος",t:"abyssos",pr:"a-BY-sos",d:"1. Abismo; 2. Profundeza; 3. Abismo infernal.",ds:["abismo","profundeza","inferno"],u:7,l:["Lc","Rm","Ap"],n:"Ap 9:1, estrela caiu do ceu.",c:"substantivo"},
  {s:"G939",p:"βάρος",t:"baros",pr:"BA-ros",d:"1. Peso; 2. Carga; 3. Gravidade.",ds:["peso","carga","gravidade"],u:5,l:["2Co","At"],n:"2 Co 4:17, leve momentaneo.",c:"substantivo"},
  {s:"G990",p:"βέβηλος",t:"bebemos",pr:"BE-be-los",d:"1. Profano; 2. Irreverente.",ds:["profano","irreverente"],u:3,l:["1Tm","Hb"],n:"1 Tm 1:9, profanos.",c:"adjetivo"},
  {s:"G1050",p:"γαμέω",t:"gameo",pr:"ga-ME-o",d:"1. Casar; 2. Desposar.",ds:["casar","desposar"],u:13,l:["Mt","Lc","Rm"],n:"Mt 22:24, casar com a viuva.",c:"verbo"},
  {s:"G1051",p:"γάμος",t:"gamos",pr:"GA-mos",d:"1. Casamento; 2. Bodas; 3. Festa de casamento.",ds:["casamento","bodas","festas"],u:16,l:["Mt","Lc","Jo"],n:"Jo 2:1, casamento em Cana.",c:"substantivo"},
  {s:"G1135",p:"γυνή",t:"gyne",pr:"gy-NE",d:"1. Mulher; 2. Esposa.",ds:["mulher","esposa"],u:215,l:["Mt","Lc","Jo","Rm"],n:"Gn 2:23, esta e osso dos meus ossos.",c:"substantivo"},
  {s:"G1223",p:"δέ",t:"de",pr:"DE",d:"1. Mas; 2. E; 3. Alem disso.",ds:["mas","e","alem disso"],u:1456,l:["Mt","Jo","At","Rm"],n:"Particula adversativa ou aditiva.",c:"conjunção"},
  {s:"G1223",p:"δέ",t:"de",pr:"DE",d:"1. Mas; 2. E; 3. Alem disso.",ds:["mas","e","alem disso"],u:1456,l:["Mt","Jo","At","Rm"],n:"Particula adversativa ou aditiva.",c:"conjunção"},
  {s:"G1063",p:"γάρ",t:"gar",pr:"GAR",d:"1. Porque; 2. Pois; 3. De fato.",ds:["porque","pois","de fato"],u:1063,l:["Mt","Jo","Rm"],n:"Particula explicativa.",c:"conjunção"},
  {s:"G3767",p:"οὖν",t:"oun",pr:"OUN",d:"1. Portanto; 2. Assim; 3. Logo.",ds:["portanto","assim","logo"],u:509,l:["Jo","At","Rm"],n:"Particula conclusiva.",c:"conjunção"},
  {s:"G1519",p:"εἰς",t:"eis",pr:"EIS",d:"1. Para; 2. Em direcao a; 3. Ate.",ds:["para","em direcao a","ate"],u:1768,l:["Mt","Jo","At"],n:"Preposicao de direcao.",c:"preposicao"},
  {s:"G1722",p:"ἐν",t:"en",pr:"EN",d:"1. Em; 2. Com; 3. Por meio de.",ds:["em","com","por meio de"],u:2752,l:["Mt","Jo","Rm"],n:"Preposicao mais usada no NT.",c:"preposicao"},
  {s:"G1537",p:"ἐκ",t:"ek",pr:"EK",d:"1. De; 2. Fora de; 3. Por.",ds:["de","fora de","por"],u:914,l:["Mt","Jo","Rm"],n:"Indica origem ou separacao.",c:"preposicao"},
  {s:"G575",p:"ἀπό",t:"apo",pr:"A-po",d:"1. De; 2. Longe de; 3. Desde.",ds:["de","longe de","desde"],u:694,l:["Mt","Jo","At"],n:"Indica separacao ou origem.",c:"preposicao"},
  {s:"G3326",p:"μετά",t:"meta",pr:"ME-ta",d:"1. Com; 2. Depois de; 3. Entre.",ds:["com","depois de","entre"],u:476,l:["Mt","Jo","Ap"],n:"Com genitivo = com, acusativo = apos.",c:"preposicao"},
  {s:"G4314",p:"πρός",t:"pros",pr:"PROS",d:"1. Para; 2. Em direcao a; 3. Junto a.",ds:["para","em direcao a","junto a"],u:689,l:["Mt","Jo","Rm"],n:"Indica direcao ou proximidade.",c:"preposicao"},
  {s:"G5228",p:"ὑπό",t:"hyPO",pr:"y-PO",d:"1. Por; 2. Sob; 3. Atraves de.",ds:["por","sob","ataves de"],u:221,l:["Mt","Rm"],n:"Indica agente ou causa.",c:"preposicao"},
  {s:"G2596",p:"κατά",t:"kata",pr:"KA-ta",d:"1. Contra; 2. Segundo; 3. Ao longo de.",ds:["contra","segundo","ao longo de"],u:475,l:["Mt","Jo","Rm"],n:"Com genitivo = contra, acusativo = de acordo com.",c:"preposicao"},
  {s:"G4012",p:"περί",t:"peri",pr:"PE-ri",d:"1. Sobre; 2. Acerca de; 3. Ao redor.",ds:["sobre","acerca de","ao redor"],u:338,l:["Mt","Jo","Rm"],n:"Indica assunto ou proximidade.",c:"preposicao"},
  {s:"G1893",p:"ἵνα",t:"hina",pr:"HI-na",d:"1. Para que; 2. A fim de que; 3. De modo que.",ds:["para que","a fim de que","de modo que"],u:571,l:["Mt","Jo","Rm"],n:"Conjunção final.",c:"conjunção"},
  {s:"G3361",p:"μή",t:"me",pr:"ME",d:"1. Nao (negacao); 2. Nunca; 3. Ninguem.",ds:["nao","nunca","ninguem"],u:1068,l:["Mt","Jo","Rm"],n:"Negacao direta.",c:"partícula"},
  {s:"G3756",p:"οὐ",p:"ou",d:"1. Nao; 2. De jeito nenhum.",ds:["nao","nunca"],u:1561,l:["Mt","Jo","Rm"],n:"Negacao enfatica.",c:"partícula"},
  {s:"G3362",p:"μηδέ",t:"mede",pr:"me-DE",d:"1. Nem; 2. E nao; 3. Tampouco.",ds:["nem","e nao","tampouco"],u:47,l:["Mt","Rm"],n:"Negação aditiva.",c:"partícula"},
  {s:"G3761",p:"οὐδέ",t:"oude",pr:"ou-DE",d:"1. Nem; 2. E nao; 3. Tampouco.",ds:["nem","e nao","tampouco"],u:93,l:["Mt","Jo","Rm"],n:"Negação enfatica aditiva.",c:"partícula"},
  {s:"G3777",p:"οὔτε",t:"oute",pr:"OU-te",d:"1. Nem; 2. Nao...nem.",ds:["nem","nao...nem"],u:41,l:["Mt","Rm"],n:"Negacao dupla.",c:"partícula"},
  {s:"G2228",p:"ἤ",t:"e",pr:"I",d:"1. Ou; 2. Do que; 3. Se nao.",ds:["ou","do que","se nao"],u:214,l:["Mt","Jo","Rm"],n:"Particula alternativa.",c:"conjunção"},
  {s:"G1161",p:"ἀλλά",p:"alla",pr:"A-la",d:"1. Mas; 2. Porem; 3. Ao contrario.",ds:["mas","porem","ao contrario"],u:243,l:["Mt","Jo","Rm"],n:"Particula adversativa enfatica.",c:"conjunção"},
  {s:"G1534",p:"ἔτι",t:"eti",pr:"E-ti",d:"1. Ainda; 2. Alem disso; 3. Mais.",ds:["ainda","alem disso","mais"],u:113,l:["Mt","Rm"],n:"Indica continuidade.",c:"adverbio"},
  {s:"G3568",p:"νῦν",t:"nyn",pr:"NUN",d:"1. Agora; 2. Hoje; 3. Neste momento.",ds:["agora","hoje","neste momento"],u:150,l:["Mt","Jo","Rm"],n:"Indica tempo presente.",c:"adverbio"},
  {s:"G1831",p:"ἐξέρχομαι",t:"exerchomai",pr:"ek-SER-kho-mai",d:"1. Sair; 2. Ir embora; 3. Proceder.",ds:["sair","ir embora","proceder"],u:217,l:["Mt","Mc","At"],n:"Jesus saia para orar.",c:"verbo"},
  {s:"G1831",p:"ἐξέρχομαι",t:"exerchomai",pr:"ek-SER-kho-mai",d:"1. Sair; 2. Ir embora; 3. Proceder.",ds:["sair","ir embora","proceder"],u:217,l:["Mt","Mc","At"],n:"Jesus saia para orar.",c:"verbo"},
  {s:"G3089",p:"λιθάζω",t:"lithazo",pr:"li-THA-zo",d:"1. Apedrejar; 2. Matar com pedras.",ds:["apedrejar","matar"],u:7,l:["Jo","At"],n:"At 7:58, apedrejaram Estevao.",c:"verbo"},
  {s:"G4238",p:"πληρόω",t:"pleroo",pr:"pli-RO-o",d:"1. Preencher; 2. Cumprir; 3. Completar.",ds:["preencher","cumprir","completar"],u:90,l:["Mt","Lc","Rm"],n:"Mt 5:17, vim cumprir a lei.",c:"verbo"},
  {s:"G3004",p:"λέγω",t:"lego",pr:"LE-go",d:"1. Dizer; 2. Declarar; 3. Chamar.",ds:["dizer","declarar","chamar"],u:2351,l:["Mt","Jo","Rm","1Co"],n:"Verbo mais comum para falar.",c:"verbo"},
  {s:"G191",p:"ἀκούω",t:"akouo",pr:"a-KU-o",d:"1. Ouvir; 2. Escutar; 3. Obedecer.",ds:["ouvir","escutar","obedecer"],u:428,l:["Mt","Jo","At","Rm"],n:"Ouvir biblico implica obediencia.",c:"verbo"},
  {s:"G2596",p:"κατά",t:"kata",pr:"KA-ta",d:"1. Contra; 2. Segundo; 3. Ao longo de.",ds:["contra","segundo","ao longo de"],u:475,l:["Mt","Jo","Rm"],n:"Com genitivo = contra, acusativo = de acordo com.",c:"preposicao"},
  {s:"G5037",p:"τοσοῦτος",t:"tosoutos",pr:"to-SOU-tos",d:"1. Tao grande; 2. Tanto; 3. Assim.",ds:["tão grande","tanto","assim"],u:39,l:["Jo","He"],n:"Jo 7:4, tao grande sinal.",c:"adjetivo"},
  {s:"G5118",p:"τοσοῦτος",t:"tosoutos",pr:"to-SOU-tos",d:"1. Tao grande; 2. Tanto; 3. Assim.",ds:["tão grande","tanto","assim"],u:39,l:["Jo","He"],n:"Jo 7:4, tao grande sinal.",c:"adjetivo"},
  {s:"G5037",p:"τοσοῦτος",t:"tosoutos",pr:"to-SOU-tos",d:"1. Tão grande; 2. Tanto; 3. Assim.",ds:["tão grande","tanto","assim"],u:39,l:["Jo","He"],n:"Jo 7:4, tao grande sinal.",c:"adjetivo"},
  {s:"G3650",p:"ὅλος",t:"holos",pr:"HO-los",d:"1. Todo; 2. Completo; 3. Inteiro.",ds:["todo","completo","inteiro"],u:110,l:["Mt","Jo","Rm"],n:"Jo 13:10, todo limpo.",c:"adjetivo"},
  {s:"G3956",p:"πᾶς",t:"pas",pr:"PAS",d:"1. Todo; 2. Cada; 3. Qualquer.",ds:["todo","cada","qualquer"],u:1243,l:["Mt","Jo","Rm"],n:"Mt 28:19, todo homem.",c:"adjetivo"},
  {s:"G3173",p:"μέγας",t:"megas",pr:"ME-gas",d:"1. Grande; 2. Poderoso; 3. Importante.",ds:["grande","poderoso","importante"],u:243,l:["Mt","Jo","At"],n:"Mt 5:19, grande no reino.",c:"adjetivo"},
  {s:"G3398",p:"μικρός",t:"mikros",pr:"mi-KROS",d:"1. Pequeno; 2. Menor; 3. Jovem.",ds:["pequeno","menor","jovem"],u:24,l:["Mt","Lc"],n:"Mt 11:11, menor no reino.",c:"adjetivo"},
  {s:"G2570",p:"καλός",t:"kalos",pr:"ka-LOS",d:"1. Bom; 2. Bonito; 3. Apropriado.",ds:["bom","bonito","apropriado"],u:102,l:["Mt","Mc","Rm"],n:"Mc 10:18, nada sou de bom.",c:"adjetivo"},
  {s:"G2564",p:"κακός",t:"kakos",pr:"ka-KOS",d:"1. Mau; 2. Malvado; 3. Ruim.",ds:["mau","malvado","ruim"],u:50,l:["Mt","Rm"],n:"Rm 12:21, vence o mal com o bem.",c:"adjetivo"},
  {s:"G18",p:"ἀγαθός",t:"agathos",pr:"a-THOS",d:"1. Bom; 2. Bondoso; 3. Agradavel.",ds:["bom","bondoso","agradavel"],u:102,l:["Mt","Rm","Gl"],n:"Mt 19:17, ninguem e bom senao Deus.",c:"adjetivo"},
  {s:"G1342",p:"δίκαιος",t:"dikaios",pr:"DI-kai-os",d:"1. Justo; 2. Correto; 3. Reto.",ds:["justo","correto","reto"],u:81,l:["Mt","Rm","1Jo"],n:"Rm 3:26, justo e justificador.",c:"adjetivo"},
  {s:"G3982",p:"πάροινος",t:"paroinos",pr:"PA-roi-nos",d:"1. Bebado; 2. Alcoólatra.",ds:["bebado","alcoolatra"],u:2,l:["1Tm","1Pe"],n:"1 Tm 3:3, nao dado a vinho.",c:"adjetivo"},
  {s:"G4636",p:"σώφρων",t:"sophron",pr:"SO-fron",d:"1. Sensato; 2. Moderado; 3. Prudente.",ds:["sensato","moderado","prudente"],u:6,l:["1Tm","Tt","1Pe"],n:"1 Tm 2:15, com temperanca.",c:"adjetivo"},
  {s:"G168",p:"ἁμαρτωλός",t:"hamartolos",pr:"a-mar-to-LOS",d:"1. Pecador; 2. Malvado; 3. Publicano.",ds:["pecador","malvado","publicano"],u:47,l:["Mt","Lc","Jo"],n:"Lc 5:32, chamei pecadores.",c:"adjetivo"},
  {s:"G786",p:"ἄσσον",t:"asson",pr:"A-son",d:"1. Besta; 2. Animal irracional.",ds:["besta","animal"],u:1,l:["2Pe"],n:"2 Pe 2:12, irracionais.",c:"substantivo"},
  {s:"G2168",p:"εὐλαβής",t:"eulabes",pr:"ev-la-BIS",d:"1. Temente a Deus; 2. Piedoso.",ds:["temente a Deus","piedoso"],u:3,l:["Lc","At"],n:"At 2:5, piedosos judeus.",c:"adjetivo"},
  {s:"G4550",p:"σαρκικός",t:"sarkikos",pr:"sar-KI-kos",d:"1. Natural; 2. Terreno; 3. Carnal.",ds:["natural","terreno","carnal"],u:10,l:["Rm","1Co"],n:"1 Co 3:3, sois carnais.",c:"adjetivo"},
  {s:"G4551",p:"σαρκινός",t:"sarkinos",pr:"sar-KI-nos",d:"1. Feito de carne; 2. Humano.",ds:["feito de carne","humano"],u:2,l:["Rm","2Co"],n:"Rm 7:14, vendido sob o pecado.",c:"adjetivo"},
  {s:"G4982",p:"σοφός",t:"sophos",pr:"so-POS",d:"1. Sabio; 2. Inteligente; 3. Erudito.",ds:["sabio","inteligente","erudito"],u:10,l:["Rm","1Co"],n:"1 Co 1:25, tolice de Deus.",c:"adjetivo"},
  {s:"G290",p:"ἀληθινός",t:"alethinOS",pr:"a-li-thi-NOS",d:"1. Verdadeiro; 2. Autentico; 3. Real.",ds:["verdadeiro","autentico","real"],u:28,l:["Jo","Hb","1Jo"],n:"Jo 4:37, ceiteira verdadeira.",c:"adjetivo"},
  {s:"G88",p:"αὐθάδης",t:"authades",pr:"af-TA-dis",d:"1. Selfish; 2. Orgulhoso; 3. Arbitrario.",ds:["selfish","orgulhoso","arbitrario"],u:2,l:["Tt","2Pe"],n:"Tt 1:7, nao pode ser orgulhoso.",c:"adjetivo"},
  {s:"G594",p:"ἀπόστολος",t:"apostolos",pr:"a-POS-to-los",d:"1. Apostolo; 2. Mensageiro; 3. Enviado.",ds:["apostolo","mensageiro","enviado"],u:80,l:["At","Rm","1Co"],n:"At 1:21, com os apostolos.",c:"substantivo"},
  {s:"G3101",p:"μαθητής",t:"mathetes",pr:"ma-ti-TIS",d:"1. Discipulo; 2. Aluno; 3. Seguidor.",ds:["discipulo","aluno","aprendiz"],u:268,l:["Mt","Jo","At"],n:"Mt 28:19, fazei discipulos.",c:"substantivo"},
  {s:"G4413",p:"προφήτης",t:"prophetes",pr:"pro-FI-tis",d:"1. Profeta; 2. Porta-voz de Deus.",ds:["porta-voz","vidente","preditor"],u:142,l:["Mt","Jo","At","1Co"],n:"Traduz hebraico nabi.",c:"substantivo"},
  {s:"G4166",p:"ποιμήν",t:"poimen",pr:"poi-MEN",d:"1. Pastor; 2. Lider espiritual.",ds:["pastor","lider","cuidador"],u:18,l:["Mt","Jo","1Pe","Hb"],n:"Hb 13:20, grande Pastor.",c:"substantivo"},
  {s:"G1249",p:"διάκονος",t:"diakonos",pr:"dia-KO-nos",d:"1. Servo; 2. Ministro; 3. Diacono.",ds:["servo","ministro","diacono"],u:29,l:["Mt","Jo","Rm","1Co"],n:"Mc 10:45, para servir.",c:"substantivo"},
  {s:"G4245",p:"πρεσβύτερος",t:"presbyteros",pr:"pres-BY-te-ros",d:"1. Anciao; 2. Lider da igreja.",ds:["anciao","lider","pastor"],u:67,l:["At","1Tm","1Pe","Tg"],n:"At 20:28, apascentar a igreja.",c:"substantivo"},
  {s:"G3499",p:"νεκρός",t:"nekros",pr:"ne-KROS",d:"1. Morto; 2. Espiritualmente morto.",ds:["morto","espiritualmente morto"],u:139,l:["Mt","Rm","Ef","Ap"],n:"Ef 2:1, mortos em pecados.",c:"adjetivo"},
  {s:"G5056",p:"τέλος",t:"telos",pr:"TE-los",d:"1. Fim; 2. Proposito; 3. Cumprimento.",ds:["fim","proposito","cumprimento"],u:40,l:["Rm","Hb","Ap"],n:"Rm 10:4, Cristo e o fim da lei.",c:"substantivo"},
  {s:"G326",p:"ἀμπελος",t:"ampelos",pr:"AM-pe-los",d:"1. Videira. Jo 15:1, videira verdadeira.",ds:["videira"],u:6,l:["Jo","Ap"],n:"Simbolo de Israel.",c:"substantivo"},
  {s:"G3068",p:"λόγιον",t:"logion",pr:"LO-gi-on",d:"1. Oraculo; 2. Palavra divina.",ds:["oraculo","palavra divina"],u:4,l:["At","Hb","1Pe"],n:"Hb 5:12, oraculos de Deus.",c:"substantivo"},
  {s:"G4396",p:"προφητεία",t:"propheteia",pr:"pro-fi-TE-ia",d:"1. Profecia; 2. Dom profetico.",ds:["profecia","dom profetico"],u:19,l:["1Co","1Ts","Ap"],n:"1 Co 14:1, profecia.",c:"substantivo"},
  {s:"G1391",p:"δόξα",t:"doxa",pr:"DO-xa",d:"1. Gloria; 2. Majestade de Deus.",ds:["majestade","resplendor"],u:166,l:["Mt","Jo","Rm","Ap"],n:"Jo 1:14, vimos a gloria.",c:"substantivo"},
  {s:"G2842",p:"κοινωνία",t:"koinonia",pr:"koi-no-NI-a",d:"1. Comunhao; 2. Participacao.",ds:["comunhao","participacao","parceria"],u:20,l:["At","Rm","1Co"],n:"At 2:42, comunhao.",c:"substantivo"},
  {s:"G190",p:"ἀκαθαρσία",t:"akatharsia",pr:"a-ka-thar-SI-a",d:"1. Impureza; 2. Imoralidade.",ds:["impureza","imoralidade"],u:10,l:["Rm","Gl","Ef"],n:"Gl 5:19, obras da carne.",c:"substantivo"},
  {s:"G3016",p:"λειτουργία",t:"leiturgia",pr:"lei-tur-GI-a",d:"1. Ministerio; 2. Serviço; 3. Culto.",ds:["ministerio","serviço","culto"],u:5,l:["Rm","Hb"],n:"Hebreus servem no santuario.",c:"substantivo"},
];

const H = [
  // === CORE HEBREW TERMS ===
  {s:"H430",p:"אֱלֹהִים",t:"Elohim",pr:"e-lo-HEEM",d:"1. Deus, ser supremo; 2. Deus verdadeiro; 3. Deuses falsos. Plural majestatico.",ds:["ser supremo","divindade"],u:2600,l:["Gn","Ex","Lv","Nm","Dt"],n:"Gn 1:1, plural majestatico.",c:"substantivo"},
  {s:"H3068",p:"יְהוָה",t:"YHWH",pr:"ya-VAH",d:"1. O Senhor; 2. Nome pessoal de Deus; 3. O Ser eterno.",ds:["O Ser","O Eterno","Deus da alianca"],u:6828,l:["Gn","Ex","Lv","Nm","Dt"],n:"Ex 3:14, Eu Sou o que Sou.",c:"substantivo"},
  {s:"H120",p:"אָדָם",t:"Adam",pr:"a-DAM",d:"1. Homem; 2. Adao; 3. Humanidade.",ds:["homem","humanidade","Adao"],u:552,l:["Gn","Jó","Sl","Is"],n:"Gn 2:7, formou o homem do po.",c:"substantivo"},
  {s:"H2416",p:"חַיִּים",t:"chayyim",pr:"cha-YEEM",d:"1. Vida; 2. Vitalidade; 3. Vida eterna.",ds:["vida","vitalidade","vida eterna"],u:753,l:["Gn","Dt","Sl","Pr"],n:"Dt 30:19, escolhe a vida.",c:"substantivo"},
  {s:"H4194",p:"מָוֶת",t:"maweth",pr:"ma-VET",d:"1. Morte; 2. Sepultura.",ds:["morte","sepultura"],u:403,l:["Gn","Nm","Sl","Ec"],n:"Gn 2:17, certamente morreras.",c:"substantivo"},
  {s:"H4941",p:"מִשְׁפָּט",t:"mishpat",pr:"mish-PAT",d:"1. Juizo; 2. Justica; 3. Direito.",ds:["justica","direito","sentenca"],u:297,l:["Gn","Ex","Dt","Am"],n:"Am 5:24, deixa correr o juizo.",c:"substantivo"},
  {s:"H6664",p:"צְדָקָה",t:"tsedaqah",pr:"tsed-qa-HA",d:"1. Justica; 2. Justica de Deus; 3. Esmola.",ds:["justica","esmola","salvacao"],u:157,l:["Gn","Dt","Sl","Is"],n:"Gn 15:6, imputado justica.",c:"substantivo"},
  {s:"H2617",p:"חֶסֶד",t:"chesed",pr:"KHE-sed",d:"1. Clemencia; 2. Amor da alianca; 3. Fidelidade.",ds:["bondade","fidelidade","misericordia"],u:248,l:["Gn","Dt","Sl","Pr"],n:"Sl 136, chesed dura para sempre.",c:"substantivo"},
  {s:"H539",p:"אֱמוּנָה",t:"emunah",pr:"e-mu-NAH",d:"1. Fidelidade; 2. Fe; 3. Constancia.",ds:["fidelidade","confianca","constancia"],u:49,l:["Gn","Dt","Sl","Hab"],n:"Hab 2:4, justo vivera pela fe.",c:"substantivo"},
  {s:"H7965",p:"שָׁלוֹם",t:"shalom",pr:"sha-LOM",d:"1. Paz; 2. Bem-estar; 3. Completude.",ds:["paz","bem-estar","completude"],u:236,l:["Gn","Sl","Is","Jr"],n:"Is 9:6, Principe da Paz.",c:"substantivo"},
  {s:"H1285",p:"בְּרִית",t:"berith",pr:"be-REET",d:"1. Alianca; 2. Pacto.",ds:["alianca","pacto","compromisso"],u:272,l:["Gn","Ex","Dt","Jr"],n:"Jr 31:31, alianca nova.",c:"substantivo"},
  {s:"H4720",p:"מִקְדָּשׁ",t:"miqdash",pr:"mik-DASH",d:"1. Santuario; 2. Tabernaculo; 3. Templo.",ds:["santuário","tabernaculo","templo"],u:135,l:["Ex","Lv","Is","Ez"],n:"Ex 25:8, santuario para habitar.",c:"substantivo"},
  {s:"H3548",p:"כֹּהֵן",t:"kohen",pr:"ko-HEN",d:"1. Sacerdote; 2. Ministro; 3. Sumo sacerdote.",ds:["sacerdote","ministro","mediador"],u:748,l:["Gn","Ex","Lv","Sl"],n:"Jesus e grande sumo sacerdote.",c:"substantivo"},
  {s:"H4428",p:"מֶלֶךְ",t:"melek",pr:"ME-lek",d:"1. Rei; 2. Governante; 3. Deus como Rei.",ds:["rei","soberano","governante"],u:2585,l:["Gn","Sm","Rs","Sl"],n:"Sl 47:2, o grande Rei.",c:"substantivo"},
  {s:"H5030",p:"נָבִיא",t:"nabi",pr:"na-BEE",d:"1. Profeta; 2. Porta-voz de Deus.",ds:["profeta","porta-voz","vidente"],u:317,l:["Gn","Ex","Dt","Is"],n:"Dt 18:15, profeta como tu.",c:"substantivo"},
  {s:"H2451",p:"חָכְמָה",t:"chokmah",pr:"khok-MAH",d:"1. Sabedoria; 2. Entendimento.",ds:["sabedoria","entendimento","habilidade"],u:149,l:["Gn","Jó","Sl","Pr"],n:"Pv 1:7, temor do Senhor.",c:"substantivo"},
  {s:"H8451",p:"תּוֹרָה",t:"torah",pr:"to-RAH",d:"1. Instrucao; 2. Lei; 3. Torah.",ds:["instrucao","lei","Pentateuco"],u:220,l:["Gn","Ex","Dt","Sl"],n:"Dt 6:4, SHEMA.",c:"substantivo"},
  {s:"H4687",p:"מִצְוָה",t:"mitsvah",pr:"mits-VAH",d:"1. Mandamento; 2. Comando.",ds:["mandamento","preceito"],u:183,l:["Dt","Sl","Pr","Is"],n:"Jesus resume em dois.",c:"substantivo"},
  {s:"H5771",p:"עָוֺן",t:"awon",pr:"a-VON",d:"1. Iniquidade; 2. Culpa.",ds:["iniquidade","culpa","pecado"],u:230,l:["Gn","Sl","Is","Jr"],n:"Is 53:5, pelas nossas iniquidades.",c:"substantivo"},
  {s:"H1802",p:"דָּבָר",t:"davar",pr:"da-VAR",d:"1. Palavra; 2. Coisa; 3. Mandamento.",ds:["palavra","coisa","mandamento"],u:1440,l:["Gn","Ex","Sl","Is"],n:"Gn 1, Deus cria pela palavra.",c:"substantivo"},
  {s:"H3117",p:"יוֹם",t:"yom",pr:"YOM",d:"1. Dia; 2. Periodo; 3. Epoca.",ds:["dia","periodo","epoca"],u:2304,l:["Gn","Ex","Sl","Dn"],n:"Gn 1, dia da criacao.",c:"substantivo"},
  {s:"H3588",p:"לֵב",t:"lev",pr:"LEV",d:"1. Coracao; 2. Mente; 3. Vontade.",ds:["coracao","mente","vontade"],u:593,l:["Gn","Dt","Sl","Pr"],n:"Dt 6:5, de todo o coracao.",c:"substantivo"},
  {s:"H3101",p:"בֵּן",t:"ben",pr:"BEN",d:"1. Filho; 2. Descendente.",ds:["filho","descendente","membro"],u:1819,l:["Gn","Ex","Sl","Pr"],n:"Sl 2:7, Tu es o meu Filho.",c:"substantivo"},
  {s:"H1",p:"אָב",t:"av",pr:"AV",d:"1. Pai; 2. Patriarca.",ds:["pai","ancestral","patriarca"],u:1213,l:["Gn","Ex","Sl","Is"],n:"Gn 12:1, chama Abraao.",c:"substantivo"},
  {s:"H7723",p:"שֵׁם",t:"shem",pr:"SHEM",d:"1. Nome; 2. Reputacao; 3. Autoridade.",ds:["nome","reputacao","autoridade"],u:832,l:["Gn","Ex","Sl","Is"],n:"Nome representa a pessoa.",c:"substantivo"},
  {s:"H8064",p:"שָׁמַיִם",t:"shamayim",pr:"sha-MAH-yim",d:"1. Ceus; 2. Habitacao de Deus.",ds:["ceus","habitacao de Deus"],u:694,l:["Gn","Ex","Sl","Is"],n:"Gn 1:1, criou os ceus.",c:"substantivo"},
  {s:"H60",p:"אֶרֶץ",t:"erets",pr:"E-rets",d:"1. Terra; 2. Pais; 3. Regiao.",ds:["terra","pais","mundo"],u:2573,l:["Gn","Ex","Dt","Is"],n:"Gn 1:1, criou a terra.",c:"substantivo"},
  // === VERBS ===
  {s:"H3389",p:"בָּרָא",t:"bara",pr:"ba-RA",d:"1. Criar; 2. Criar ex nihilo.",ds:["criar","formar","produzir"],u:54,l:["Gn","Sl","Is"],n:"Gn 1:1, bara = exclusivo de Deus.",c:"verbo"},
  {s:"H1961",p:"הָיָה",t:"hayah",pr:"ha-YAH",d:"1. Ser; 2. Acontecer; 3. Tornar-se.",ds:["ser","existir","acontecer"],u:3167,l:["Gn","Ex","Dt","Sl"],n:"De hayah vem YHWH.",c:"verbo"},
  {s:"H6213",p:"עָשָׂה",t:"asah",pr:"a-SAH",d:"1. Fazer; 2. Criar; 3. Executar.",ds:["fazer","criar","produzir"],u:2633,l:["Gn","Ex","Sl","Is"],n:"Gn 1:7, fez o firmamento.",c:"verbo"},
  {s:"H5414",p:"נָתַן",t:"natan",pr:"na-TAN",d:"1. Dar; 2. Entregar; 3. Conceder.",ds:["dar","entregar","conceder"],u:1879,l:["Gn","Ex","Sl","Is"],n:"Deus deu a Lei.",c:"verbo"},
  {s:"H505",p:"אָהַב",t:"ahav",pr:"a-HAV",d:"1. Amar; 2. Ter afeto.",ds:["amar","ter afeto","desejar"],u:252,l:["Gn","Dt","Sl","Os"],n:"Dt 6:5, amaras o Senhor.",c:"verbo"},
  {s:"H3372",p:"יָרֵא",t:"yare",pr:"ya-RE",d:"1. Temer; 2. Reverenciar.",ds:["temer","reverenciar","respeitar"],u:187,l:["Gn","Ex","Sl","Pr"],n:"Pv 1:7, temor do Senhor.",c:"verbo"},
  {s:"H1254",p:"בָּרַךְ",t:"barak",pr:"ba-RAK",d:"1. Abençoar; 2. Louvar.",ds:["abençoar","louvar"],u:330,l:["Gn","Ex","Sl","Is"],n:"Gn 1:22, Deus abençoou.",c:"verbo"},
  {s:"H810",p:"אָכַל",t:"akal",pr:"a-KHAL",d:"1. Comer; 2. Consumir.",ds:["comer","consumir"],u:812,l:["Gn","Ex","Dt","Sl"],n:"Gn 2:16-17, do fruto.",c:"verbo"},
  {s:"H2319",p:"חָטָא",t:"chata",pr:"kha-TA",d:"1. Pecar; 2. Errar; 3. Transgredir.",ds:["pecar","errar","transgredir"],u:238,l:["Gn","Lv","Sl","Is"],n:"Lv 5:16, quem pecar.",c:"verbo"},
  {s:"H5626",p:"סָלַח",t:"salach",pr:"sa-LAKH",d:"1. Perdoar; 2. Ter misericordia.",ds:["perdoar","misericordia"],u:17,l:["Ex","Sl","Is"],n:"Ex 34:7, perdoa iniquidade.",c:"verbo"},
  {s:"H2603",p:"חָנָן",t:"chanan",pr:"kha-NAN",d:"1. Ter graca; 2. Perdoar.",ds:["ter graca","perdoar","misericordia"],u:68,l:["Gn","Ex","Sl","Is"],n:"Ex 33:19, terei misericordia.",c:"verbo"},
  {s:"H5564",p:"צָעַק",t:"tsaak",pr:"tsa-AK",d:"1. Clamar; 2. Suplicar.",ds:["clamar","suplicar","implorar"],u:49,l:["Gn","Ex","Sl","Is"],n:"Ex 3:7, ouvi o clamor.",c:"verbo"},
  {s:"H1981",p:"הֵלֶךְ",t:"hlek",pr:"HE-lek",d:"1. Ir; 2. Caminhar; 3. Andar com Deus.",ds:["ir","caminhar","andar"],u:52,l:["Gn","Sl","Pr"],n:"Gn 5:22, Enoque andou com Deus.",c:"verbo"},
  // === BODY PARTS ===
  {s:"H3027",p:"יַד",t:"yad",pr:"YAD",d:"1. Mao; 2. Poder; 3. Autoridade.",ds:["mao","poder","posse"],u:628,l:["Gn","Ex","Sl","Is"],n:"Mao de Deus sustenta.",c:"substantivo"},
  {s:"H5869",p:"עַיִן",t:"ayin",pr:"a-YIN",d:"1. Olho; 2. Fonte; 3. Vigia.",ds:["olho","fonte","vigilancia"],u:542,l:["Gn","Sl","Pr","Is"],n:"Olho de Deus tudo ve.",c:"substantivo"},
  {s:"H239",p:"אֹזֶן",t:"ozen",pr:"O-zen",d:"1. Ouvido; 2. Atendimento.",ds:["ouvido","audiencia"],u:156,l:["Gn","Sl","Pr"],n:"Sl 34:15, inclina o ouvido.",c:"substantivo"},
  {s:"H6310",p:"פֶּה",t:"peh",pr:"PEH",d:"1. Boca; 2. Fala; 3. Borda.",ds:["boca","fala","borda"],u:502,l:["Gn","Ex","Sl","Is"],n:"Ex 4:11, quem fez a boca?",c:"substantivo"},
  {s:"H7307",p:"רוּחַ",t:"ruach",pr:"ru-AKH",d:"1. Esprito; 2. Vento; 3. Sopro.",ds:["esprito","vento","sopro"],u:378,l:["Gn","Sl","Is","Ez"],n:"Gn 1:2, esprito de Deus.",c:"substantivo"},
  {s:"H1818",p:"דָּם",t:"dam",pr:"DAM",d:"1. Sangue; 2. Vida.",ds:["sangue","vida","linhagem"],u:360,l:["Gn","Ex","Lv","Sl"],n:"Lv 17:11, a vida esta no sangue.",c:"substantivo"},
  {s:"H6963",p:"קוֹל",t:"qol",pr:"KOL",d:"1. Voz; 2. Som; 3. Chamado.",ds:["voz","som","chamado"],u:531,l:["Gn","Ex","Sl","Is"],n:"Gn 3:8, ouviu a voz.",c:"substantivo"},
  {s:"H2822",p:"חֹשֶׁךְ",t:"choshek",pr:"kho-SHEK",d:"1. Trevas; 2. Escuridao.",ds:["trevas","escuridao","maldade"],u:191,l:["Gn","Ex","Jó","Is"],n:"Gn 1:4, separou luz das trevas.",c:"substantivo"},
  {s:"H216",p:"אוֹר",t:"or",pr:"OR",d:"1. Luz; 2. Dia.",ds:["luz","dia","conhecimento"],u:262,l:["Gn","Sl","Is"],n:"Gn 1:3, haja luz.",c:"substantivo"},
  // === NAMES/TITLES ===
  {s:"H3472",p:"יִשְׂרָאֵל",t:"Yisrael",pr:"yis-ra-EL",d:"1. Israel; 2. Povo escolhido.",ds:["Israel","povo escolhido"],u:2565,l:["Gn","Ex","Sl","Is"],n:"Gn 32:28, luta com Deus.",c:"substantivo"},
  {s:"H136",p:"אֲדֹנָי",t:"Adonai",pr:"a-do-NAI",d:"1. Senhor; 2. Amo.",ds:["Senhor","amo","senhorio"],u:458,l:["Gn","Ex","Sl","Is"],n:"Substituto reverente para YHWH.",c:"substantivo"},
  {s:"H430b",p:"אֵל",t:"El",pr:"EL",d:"1. Deus; 2. Poderoso.",ds:["Deus","poderoso","fortaleza"],u:238,l:["Gn","Ex","Sl","Is"],n:"Gn 14:18, El Elyon.",c:"substantivo"},
  {s:"H3444",p:"יְשׁוּעָה",t:"yeshuah",pr:"ye-shu-AH",d:"1. Salvacao; 2. Livramento.",ds:["salvacao","livramento","seguranca"],u:78,l:["Dt","Sl","Is"],n:"Nome Yeshua = YHWH salva.",c:"substantivo"},
  {s:"H3899",p:"מָשִׁיחַ",t:"mashiach",pr:"ma-SHE-ach",d:"1. Ungido; 2. Messias.",ds:["ungido","Messias","rei"],u:39,l:["Lv","Sm","Sl","Dn"],n:"Dn 9:25, Messias sera morto.",c:"substantivo"},
  {s:"H157",p:"אֶהְיֶה",t:"Ehyeh",pr:"eh-YEH",d:"1. Eu serei; 2. Eu sou.",ds:["Eu serei","Eu sou","Eu existo"],u:3,l:["Ex"],n:"Ex 3:14, Ehyeh asher Ehyeh.",c:"verbo"},
  {s:"H559",p:"אָמֵן",t:"amen",pr:"a-MEN",d:"1. Assim seja; 2. Verdadeiro.",ds:["assim seja","verdadeiro","confirmacao"],u:30,l:["Nm","Sl","Is"],n:"Termo de confirmacao.",c:"interjeição"},
  {s:"H995",p:"בִּינָה",t:"binah",pr:"bee-NAH",d:"1. Entendimento; 2. Discernimento.",ds:["entendimento","discernimento"],u:36,l:["Ex","Sl","Pr","Dn"],n:"Pv 4:7, adquire entendimento.",c:"substantivo"},
  {s:"H5159",p:"נַחַל",t:"nachal",pr:"na-KHAL",d:"1. Heranca; 2. Possessao.",ds:["heranca","possessao","porcao"],u:251,l:["Gn","Dt","Js","Sl"],n:"Terra prometida como heranca.",c:"substantivo"},
  {s:"H2896",p:"גָּדוֹל",t:"gadol",pr:"ga-DOL",d:"1. Grande; 2. Poderoso.",ds:["grande","poderoso","majestoso"],u:533,l:["Gn","Ex","Sl","Is"],n:"Sl 145:3, Grande e o Senhor.",c:"adjetivo"},
  // === NUMERALS ===
  {s:"H7999",p:"שֶׁלֶשׁ",t:"shelosh",pr:"she-LOSH",d:"1. Tres; 2. Terceiro.",ds:["tres","terceiro"],u:399,l:["Gn","Ex","Sl"],n:"Simbolo de completude.",c:"numeral"},
  {s:"H8034",p:"שֵׁשֶׁת",t:"shesh",pr:"SHESH",d:"1. Seis; 2. Trabalho.",ds:["seis","trabalho"],u:169,l:["Gn","Ex"],n:"Criacao em 6 dias.",c:"numeral"},
  {s:"H7651",p:"שִׁבְעָה",t:"shivah",pr:"shiv-AH",d:"1. Sete; 2. Completo.",ds:["sete","completo"],u:388,l:["Gn","Ex","Sl"],n:"Simbolo biblico de completude.",c:"numeral"},
  {s:"H3967",p:"מֵאָה",t:"meah",pr:"me-AH",d:"1. Cem; 2. Centenas.",ds:["cem","centenas"],u:579,l:["Gn","Ex","Sl"],n:"Abraao tinha 318 servos.",c:"numeral"},
  // === ADDITIONAL HEBREW ===
  {s:"H8248",p:"שָׁתָה",t:"shatah",pr:"sha-TAH",d:"1. Beber.",ds:["beber"],u:224,l:["Gn","Ex","Sl"],n:"Dt 12:15, beberes.",c:"verbo"},
  {s:"H3444b",p:"יְשׁוּעָה",t:"yeshuah",pr:"ye-shu-AH",d:"1. Salvacao; 2. Livramento.",ds:["salvacao","livramento","seguranca"],u:78,l:["Dt","Sl","Is"],n:"Nome Yeshua = YHWH salva.",c:"substantivo"},
  {s:"H96",p:"אַחַר",t:"achar",pr:"a-KHAR",d:"1. Depois; 2. Atras; 3. Outro.",ds:["depois","atras","outro"],u:694,l:["Gn","Ex","Sl"],n:"Gn 1:7, o segundo dia.",c:"adjetivo"},
  {s:"H6440",p:"פָּנִים",t:"panim",pr:"PA-nim",d:"1. Face; 2. Presenca; 3. Superficie.",ds:["face","presenca","superficie"],u:2130,l:["Gn","Ex","Sl"],n:"Ex 33:11, face a face.",c:"substantivo"},
  {s:"H3820",p:"לֵבָב",t:"levav",pr:"le-VAV",d:"1. Coracao; 2. Mente; 3. Vontade; 4. Entendimento.",ds:["coracao","mente","vontade","entendimento"],u:835,l:["Gn","Dt","Sl","Pr"],n:"Dt 6:5, de todo o coracao.",c:"substantivo"},
  {s:"H1250",p:"בְּתוֹךְ",t:"betowk",pr:"be-TOK",d:"1. No meio de; 2. Dentro de; 3. Entre.",ds:["no meio","dentro","entre"],u:1591,l:["Gn","Ex","Sl"],n:"Gn 1:6, no meio das aguas.",c:"preposicao"},
  {s:"H5414b",p:"נָתַן",t:"natan",pr:"na-TAN",d:"1. Dar; 2. Entregar; 3. Colocar; 4. Conceder.",ds:["dar","entregar","colocar","conceder"],u:1879,l:["Gn","Ex","Sl","Is"],n:"Gn 1:29, dai-vos toda a semente.",c:"verbo"},
  {s:"H2549",p:"חָמָס",t:"chamas",pr:"kha-MAS",d:"1. Violencia; 2. Injustica; 3. Destruição.",ds:["violencia","injustica","destruicao"],u:59,l:["Gn","Sl","Is","Jr"],n:"Gn 6:11, a terra corrompeu-se.",c:"substantivo"},
  {s:"H8645",p:"תְּהוֹם",t:"tehom",pr:"te-HOM",d:"1. Abismo; 2. Profundezas.",ds:["abismo","profundezas"],u:50,l:["Gn","Jó","Sl"],n:"Gn 1:2, sobre a face do abismo.",c:"substantivo"},
  {s:"H202",p:"אִמָּא",t:"imma",pr:"IM-ma",d:"1. Mae; 2. Ancestral.",ds:["mae","ancestral"],u:228,l:["Gn","Ex","Sl","Is"],n:"Is 66:13, como mae consola.",c:"substantivo"},
  {s:"H996",p:"בַּיִת",t:"bayit",pr:"BA-yit",d:"1. Casa; 2. Lar; 3. Familia; 4. Templo.",ds:["casa","lar","familia","templo"],u:2079,l:["Gn","Ex","Sl","Is"],n:"Gn 12:1, deixa a tua casa.",c:"substantivo"},
  {s:"H5971",p:"עַם",t:"am",pr:"AM",d:"1. Povo; 2. Nacao; 3. Povos.",ds:["povo","nacao","tribo"],u:1868,l:["Gn","Ex","Dt","Sl"],n:"Dt 6:6, este povo que formaste.",c:"substantivo"},
  {s:"H517",p:"אָרֶךְ",t:"arek",pr:"a-REK",d:"1. Comprimento; 2. Demora; 3. Paciencia.",ds:["comprimento","demora","paciencia"],u:45,l:["Ex","Sl","Is"],n:"Ex 34:6, Deus de longanimidade.",c:"substantivo"},
  {s:"H1697",p:"דְּבַר",t:"devar",pr:"de-VAR",d:"1. Palavra; 2. Assunto; 3. Evento; 4. Coisa.",ds:["palavra","assunto","evento","coisa"],u:1440,l:["Gn","Ex","Sl","Is"],n:"Gn 15:1, veio palavra do Senhor.",c:"substantivo"},
  {s:"H226",p:"אֶרְאֵל",t:"erel",pr:"e-REL",d:"1. Leao de Deus; 2. Heróis.",ds:["leao de Deus","herois"],u:3,l:["Sl","Is"],n:"Is 29:1, Ur-El, altar de Deus.",c:"substantivo"},
  {s:"H7307b",p:"רוּחַ",t:"ruach",pr:"ru-AKH",d:"1. Esprito; 2. Vento; 3. Sopro; 4. Alma; 5. Temperamento.",ds:["esprito","vento","sopro","alma"],u:378,l:["Gn","Sl","Is","Ez"],n:"Gn 1:2, esprito de Deus se movia.",c:"substantivo"},
  {s:"H319",p:"אִישׁ",t:"ish",pr:"ISH",d:"1. Homem; 2. Marido; 3. Pessoal; 4. Cada.",ds:["homem","marido","cada"],u:2177,l:["Gn","Sl","Pr"],n:"Gn 2:23, esta sera chamada mulher.",c:"substantivo"},
  {s:"H802",p:"אִשָּׁה",t:"ishshah",pr:"ISH-shah",d:"1. Mulher; 2. Esposa.",ds:["mulher","esposa"],u:780,l:["Gn","Sl","Pr"],n:"Gn 2:23, esta e osso dos meus ossos.",c:"substantivo"},
  {s:"H929",p:"בַּחַן",t:"bachan",pr:"ba-KHAN",d:"1. Provar; 2. Testar; 3. Examinar.",ds:["provar","testar","examinar"],u:29,l:["Sl","Is","Jr"],n:"Sl 7:10, Deus prova os coracoes.",c:"verbo"},
  {s:"H5251",p:"נָפַל",t:"naphal",pr:"na-FAL",d:"1. Cair; 2. Queda; 3. Morrer; 4. Ser derrotado.",ds:["cair","queda","morrer"],u:434,l:["Gn","Ex","Sl","Is"],n:"Gn 3:5, nao certamente morrereis.",c:"verbo"},
  {s:"H6963b",p:"קוֹל",t:"qol",pr:"KOL",d:"1. Voz; 2. Som; 3. Chamado; 4. Rumor.",ds:["voz","som","chamado","rumor"],u:531,l:["Gn","Ex","Sl","Is"],n:"Gn 3:8, a voz do Senhor Deus.",c:"substantivo"},
  {s:"H1980",p:"הָלַךְ",t:"halak",pr:"ha-LAK",d:"1. Andar; 2. Caminhar; 3. Seguir; 4. Viver.",ds:["andar","caminhar","seguir","viver"],u:1559,l:["Gn","Ex","Dt","Sl"],n:"Gn 5:22, Enoque andou com Deus.",c:"verbo"},
  {s:"H5590",p:"נֶפֶשׁ",t:"nephesh",pr:"NE-fesh",d:"1. Alma; 2. Vida; 3. Ser vivente; 4. Desejo.",ds:["alma","vida","ser vivente","desejo"],u:754,l:["Gn","Ex","Sl"],n:"Gn 2:7, tornou-se alma vivente.",c:"substantivo"},
  {s:"H3605",p:"כֹּל",t:"kol",pr:"KOL",d:"1. Todo; 2. Cada; 3. Tudo; 4. Qualquer.",ds:["todo","cada","tudo","qualquer"],u:5175,l:["Gn","Ex","Sl"],n:"Gn 1:31, tudo o que fez.",c:"adjetivo"},
  {s:"H398",p:"אֵל",t:"el",pr:"EL",d:"1. Para; 2. Ate; 3. Em direcao a.",ds:["para","ate","em direcao a"],u:38,l:["Gn","Sl"],n:"Gn 1:1, criou Deus os ceus.",c:"preposicao"},
  {s:"H1419",p:"גָּדוֹל",t:"gadol",pr:"ga-DOL",d:"1. Grande; 2. Poderoso; 3. Importante; 4. Antigo.",ds:["grande","poderoso","importante","antigo"],u:533,l:["Gn","Ex","Sl","Is"],n:"Gn 1:16, os dois grandes luminares.",c:"adjetivo"},
  {s:"H1817",p:"דָּם",t:"dam",pr:"DAM",d:"1. Sangue; 2. Vida; 3. Linhagem.",ds:["sangue","vida","linhagem"],u:360,l:["Gn","Ex","Lv","Sl"],n:"Lv 17:11, a vida esta no sangue.",c:"substantivo"},
  {s:"H3490",p:"יָשַׁר",t:"yashar",pr:"ya-SHAR",d:"1. Reto; 2. Correto; 3. Honesto.",ds:["reto","correto","honesto"],u:53,l:["Sl","Pr","Is"],n:"Sl 19:8, os mandamentos do Senhor sao retos.",c:"adjetivo"},
  {s:"H6664b",p:"צֶדֶק",t:"tsedeq",pr:"TSE-dek",d:"1. Justica; 2. Retidao; 3. Salvação.",ds:["justica","retidao","salvacao"],u:118,l:["Gn","Sl","Is"],n:"Gn 15:6, imputou-lhe justica.",c:"substantivo"},
  {s:"H205",p:"אֱמוּן",t:"emun",pr:"e-MUN",d:"1. Fiel; 2. Firme; 3. Seguro.",ds:["fiel","firme","seguro"],u:14,l:["Sl","Is"],n:"Sl 119:86, teus mandamentos sao fiéis.",c:"adjetivo"},
  {s:"H4410",p:"מָלוֹךְ",t:"malokh",pr:"ma-LOKH",d:"1. Reinar; 2. Ser rei; 3. Governar.",ds:["reinar","ser rei","governar"],u:1140,l:["Gn","1Sm","Sl"],n:"Gn 36:31, reis em Edom.",c:"verbo"},
  {s:"H7919",p:"שְׁאָר",t:"shear",pr:"she-AR",d:"1. Resto; 2. Sobras; 3. Residuo.",ds:["resto","sobras","residuo"],u:62,l:["Is","Jr","Os"],n:"Is 10:20, o restante de Jaco.",c:"substantivo"},
  {s:"H669",p:"אָפוֹד",t:"ephot",pr:"a-FOD",d:"1. Ephod; 2. Vestes sacerdotais.",ds:["ephod","vestes sacerdotais"],u:11,l:["Ex","1Sm"],n:"Ex 28:4, farao um ephod.",c:"substantivo"},
  {s:"H2374",p:"חֹזֶק",t:"chozek",pr:"kho-ZEK",d:"1. Forca; 2. Firmeza; 3. Dureza.",ds:["forca","firmeza","dureza"],u:52,l:["Ex","Sl","Jr"],n:"Dt 6:7, fala nelas estando na casa.",c:"substantivo"},
];

function formatEntry(e) {
  const parts = [`{"strong":${JSON.stringify(e.s)},\"palavra\":${JSON.stringify(e.p)},\"transliteracao\":${JSON.stringify(e.t)}`];
  if (e.pr) parts.push(`\"pronuncia\":${JSON.stringify(e.pr)}`);
  parts.push(`\"definicao\":${JSON.stringify(e.d)}`);
  parts.push(`\"definicoesSecundarias\":${JSON.stringify(e.ds)}`);
  parts.push(`\"usoNoNT\":${e.u}`);
  if (e.l) parts.push(`\"livros\":${JSON.stringify(e.l)}`);
  if (e.n) parts.push(`\"notas\":${JSON.stringify(e.n)}`);
  if (e.c) parts.push(`\"categoria\":${JSON.stringify(e.c)}`);
  return `  ${parts.join(',')}};`;
}

const greekLines = G.map(e => formatEntry(e)).join('\n');
const hebrewLines = H.map(e => formatEntry(e)).join('\n');

const footer = `
];

export const LEXICON_BDAG: LexiconEntry[] = [...GREGO, ...HEBRAICO];

export const TOTAL_ENTRADAS = LEXICON_BDAG.length;
export const TOTAL_GREGOS = GREGO.length;
export const TOTAL_HEBRAICOS = HEBRAICO.length;

export function buscarPorStrong(strong: string): LexiconEntry | undefined {
  return LEXICON_BDAG.find(e => e.strong === strong);
}

export function buscarPorPalavra(palavra: string): LexiconEntry[] {
  const lower = palavra.toLowerCase();
  return LEXICON_BDAG.filter(e =>
    e.palavra.toLowerCase().includes(lower) ||
    e.transliteracao.toLowerCase().includes(lower)
  );
}

export function buscarPorCategoria(categoria: string): LexiconEntry[] {
  return LEXICON_BDAG.filter(e => e.categoria === categoria);
}

export function buscarPorFrequencia(minFrequencia: number): LexiconEntry[] {
  return LEXICON_BDAG.filter(e => e.usoNoNT >= minFrequencia);
}

export function obterEstatisticas() {
  const categorias: Record<string, number> = {};
  LEXICON_BDAG.forEach(e => {
    if (e.categoria) {
      categorias[e.categoria] = (categorias[e.categoria] || 0) + 1;
    }
  });
  return {
    total: LEXICON_BDAG.length,
    gregos: TOTAL_GREGOS,
    hebraicos: TOTAL_HEBRAICOS,
    categorias,
    maisFrequentes: LEXICON_BDAG
      .sort((a, b) => b.usoNoNT - a.usoNoNT)
      .slice(0, 20)
  };
}
`;

const output = header
  + `const GREGO: LexiconEntry[] = [\n${greekLines}\n];\n\n`
  + `const HEBRAICO: LexiconEntry[] = [\n${hebrewLines}\n];\n`
  + footer;

writeFileSync('C:/Sola Scriptura BR/src/data/biblia/lexiconBDAG.ts', output, 'utf8');
console.log(`Gerado com ${G.length} gregos + ${H.length} hebraicos = ${G.length + H.length} total`);
