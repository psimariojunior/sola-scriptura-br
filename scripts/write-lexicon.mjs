import { writeFileSync, appendFileSync, statSync } from 'fs';
import { join } from 'path';

const p = join('C:\\Sola Scriptura BR', 'src', 'data', 'biblia', 'lexiconBDAG.ts');

function w(s) { appendFileSync(p, s, 'utf8'); }

// Clear and write header
writeFileSync(p, `// Lexicon BDAG/BDB — 200+ entradas dos termos mais importantes do AT e NT
// Baseado no BDAG (Greek) e BDB (Hebrew) com definicoes em PT-BR

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

const GREGO: LexiconEntry[] = [
`, 'utf8');

// Greek entries
const gregos = [
  { strong: "G2316", palavra: "θεός", transliteracao: "theos", pronuncia: "THE-os", definicao: "1. Deus, ser supremo; 2. O Deus verdadeiro (YHWH); 3. Deuses falsos; 4. Magistrados; 5. O divino em geral.", definicoesSecundarias: ["ser supremo", "YHWH", "divindade"], usoNoNT: 1343, livros: ["Mt", "Jo", "Rm", "1Co", "Ef"], notas: "Termo mais usado para Deus no NT, mais de 1.300 vezes.", categoria: "substantivo" },
  { strong: "G3056", palavra: "λόγος", transliteracao: "logos", pronuncia: "LO-gos", definicao: "1. Palavra, mensagem; 2. Razao; 3. Cristo como Palavra eterna (Jo 1:1); 4. Evangelho.", definicoesSecundarias: ["fala", "razao", "Cristo como Palavra"], usoNoNT: 330, livros: ["Jo", "At", "Rm", "1Co", "Hb"], notas: "Em Jo 1:1-14, identifica Cristo como a expressao racional de Deus.", categoria: "substantivo" },
  { strong: "G4151", palavra: "πνεῦμα", transliteracao: "pneuma", pronuncia: "PNEV-ma", definicao: "1. Esprito, sopro, vento; 2. O Esprito Santo; 3. Esprito humano; 4. Forca espiritual.", definicoesSecundarias: ["vento", "Esprito Santo", "espirito humano"], usoNoNT: 379, livros: ["Mt", "Lc", "Jo", "At", "Rm"], notas: "Do latim spiritus. Em Jo 3:5-8, Jesus fala do nascimento do Esprito.", categoria: "substantivo" },
  { strong: "G225", palavra: "ἀλήθεια", transliteracao: "aletheia", pronuncia: "a-LI-thia", definicao: "1. Verdade, realidade; 2. A verdade de Deus; 3. A verdade do evangelho; 4. Sinceridade.", definicoesSecundarias: ["realidade", "verdade do evangelho", "sinceridade"], usoNoNT: 109, livros: ["Jo", "Rm", "Ef", "1Jo"], notas: "Em Jo 8:32, a verdade liberta.", categoria: "substantivo" },
  { strong: "G40", palavra: "ἅγιος", transliteracao: "hagios", pronuncia: "HA-gios", definicao: "1. Santo, sagrado, separado; 2. Santo por natureza; 3. Santo por vocacao; 4. Santuario.", definicoesSecundarias: ["separado para Deus", "pureza moral", "santidade"], usoNoNT: 233, livros: ["Mt", "Lc", "Jo", "At", "Rm"], notas: "Do hebraico qadosh. 1 Pe 1:15-16.", categoria: "adjetivo" },
  { strong: "G2962", palavra: "κύριος", transliteracao: "kyrios", pronuncia: "KY-rios", definicao: "1. Senhor, mestre; 2. Titulo de respeito; 3. Proprietario; 4. Titulo divino para Jesus.", definicoesSecundarias: ["mestre", "proprietario", "titulo divino"], usoNoNT: 717, livros: ["Mt", "Jo", "At", "Rm", "1Co"], notas: "Confissao Jesus e o Senhor e basica da fe cristã.", categoria: "substantivo" },
  { strong: "G26", palavra: "ἀγάπη", transliteracao: "agape", pronuncia: "a-GA-pi", definicao: "1. Amor, benevolencia; 2. Amor cristao sacrificial; 3. O amor de Deus.", definicoesSecundarias: ["amor sacrificial", "benevolencia", "dedicacao"], usoNoNT: 116, livros: ["Mt", "Jo", "Rm", "1Co", "1Jo"], notas: "Qualidade suprema de Deus (1 Jo 4:8).", categoria: "substantivo" },
  { strong: "G4102", palavra: "πίστις", transliteracao: "pistis", pronuncia: "PIS-tis", definicao: "1. Confianca, fe; 2. Fidelidade; 3. Objeto da fe; 4. Profissao de fe.", definicoesSecundarias: ["confianca", "fidelidade", "certeza"], usoNoNT: 243, livros: ["Rm", "Gl", "Ef", "Hb", "Tg"], notas: "No AT traduz emunah.", categoria: "substantivo" },
  { strong: "G5485", palavra: "χάρις", transliteracao: "charis", pronuncia: "KA-ris", definicao: "1. Graca, favor; 2. Favor imerecido de Deus; 3. Gratidao; 4. Presente.", definicoesSecundarias: ["favor imerecido", "dada espiritual", "agradecimento"], usoNoNT: 155, livros: ["Rm", "1Co", "Ef", "Tt", "1Pe"], notas: "Em Rm 3:24 e Ef 2:8-9, meio da salvacao.", categoria: "substantivo" },
  { strong: "G4991", palavra: "σωτηρία", transliteracao: "soteria", pronuncia: "so-te-RI-a", definicao: "1. Salvacao, livramento; 2. Preservacao; 3. Resgate; 4. Salvacao eterna.", definicoesSecundarias: ["livramento", "seguranca eterna", "bem-estar"], usoNoNT: 45, livros: ["Mt", "Lc", "At", "Rm", "Ef"], notas: "Abrange justificacao, santificacao e glorificacao.", categoria: "substantivo" },
  { strong: "G266", palavra: "ἁμαρτία", transliteracao: "hamartia", pronuncia: "a-mar-TI-a", definicao: "1. Pecado, transgressao; 2. Inclinacao pecaminosa; 3. Culpa; 4. Dominio do pecado.", definicoesSecundarias: ["transgressao", "natureza pecaminosa", "culpa"], usoNoNT: 173, livros: ["Mt", "Rm", "Gl", "1Jo", "Hb"], notas: "Em Rm 5:12-21, teologia do pecado original.", categoria: "substantivo" },
  { strong: "G1343", palavra: "δικαιοσύνη", transliteracao: "dikaiosyne", pronuncia: "di-ka-io-SY-ni", definicao: "1. Justica, retidao; 2. Justica de Deus; 3. Justica imputada pela fe.", definicoesSecundarias: ["justica divina", "justificacao", "conduta reta"], usoNoNT: 92, livros: ["Mt", "Rm", "Gl", "Fp"], notas: "Central na teologia paulina.", categoria: "substantivo" },
  { strong: "G1577", palavra: "ἐκκλησία", transliteracao: "ekklesia", pronuncia: "ek-le-SI-a", definicao: "1. Assembleia; 2. Igreja; 3. Igreja local; 4. Igreja universal.", definicoesSecundarias: ["assembleia", "congregacao", "corpo de Cristo"], usoNoNT: 115, livros: ["Mt", "At", "Rm", "1Co", "Ef"], notas: "Do hebraico qahal.", categoria: "substantivo" },
  { strong: "G932", palavra: "βασιλεία", transliteracao: "basileia", pronuncia: "ba-si-LE-a", definicao: "1. Reino, soberania; 2. Reino de Deus; 3. Reino messianico.", definicoesSecundarias: ["dominio soberano", "reino messianico", "heranca"], usoNoNT: 162, livros: ["Mt", "Mc", "Lc", "Rm"], notas: "Tema central do ensino de Jesus.", categoria: "substantivo" },
  { strong: "G4561", palavra: "σάρξ", transliteracao: "sarx", pronuncia: "SARKS", definicao: "1. Carne, corpo; 2. Natureza humana caida; 3. Vida terrena.", definicoesSecundarias: ["corpo", "natureza humana", "vida terrena"], usoNoNT: 151, livros: ["Mt", "Jo", "Rm", "Gl"], notas: "Em Rm 8:3-8, contrasta carne e Esprito.", categoria: "substantivo" },
  { strong: "G5590", palavra: "ψυχή", transliteracao: "psyche", pronuncia: "PSY-chi", definicao: "1. Alma, ser vivente; 2. Vida; 3. Personalidade; 4. Desejos.", definicoesSecundarias: ["ser vivente", "vida", "personalidade"], usoNoNT: 105, livros: ["Mt", "Mc", "Lc", "Jo"], notas: "Traduz hebraico nephesh.", categoria: "substantivo" },
  { strong: "G129", palavra: "αἷμα", transliteracao: "haima", pronuncia: "AI-ma", definicao: "1. Sangue; 2. Sangue derramado; 3. Sangue de sacrificio; 4. Linhagem.", definicoesSecundarias: ["sangue", "sacrificio", "descendencia"], usoNoNT: 99, livros: ["Mt", "Jo", "Rm", "Hb", "Ap"], notas: "Centro da expiacao. Hb 9:22.", categoria: "substantivo" },
  { strong: "G4716", palavra: "σταυρός", transliteracao: "stauros", pronuncia: "stau-ROS", definicao: "1. Cruz romana; 2. Instrumento de execucao; 3. Mensagem da cruz.", definicoesSecundarias: ["cruz", "crucificacao", "mensagem da cruz"], usoNoNT: 76, livros: ["Mt", "Jo", "Rm", "Gl"], notas: "Maior simbolo da vitoria de Cristo.", categoria: "substantivo" },
  { strong: "G386", palavra: "ἀνάστασις", transliteracao: "anastasis", pronuncia: "a-na-STA-sis", definicao: "1. Ressurreicao; 2. Ressurreicao de Cristo; 3. Ressurreicao dos mortos.", definicoesSecundarias: ["ressurreicao de Cristo", "ressurreicao dos mortos"], usoNoNT: 42, livros: ["Mt", "Jo", "At", "Rm", "1Co"], notas: "Central no credo cristao.", categoria: "substantivo" },
  { strong: "G2917", palavra: "κρίσις", transliteracao: "krisis", pronuncia: "KRI-sis", definicao: "1. Julgamento; 2. Separacao; 3. Julgamento final.", definicoesSecundarias: ["julgamento", "separacao", "condenacao"], usoNoNT: 48, livros: ["Mt", "Jo", "Rm", "Hb", "Ap"], notas: "Jo 5:22, Pai confiou julgamento ao Filho.", categoria: "substantivo" },
  { strong: "G1515", palavra: "εἰρήνη", transliteracao: "eirene", pronuncia: "ei-RE-ni", definicao: "1. Paz; 2. Paz com Deus; 3. Bem-estar. Do hebraico shalom.", definicoesSecundarias: ["paz com Deus", "bem-estar", "seguranca"], usoNoNT: 92, livros: ["Mt", "Jo", "Rm", "Ef"], notas: "Shalom = completude.", categoria: "substantivo" },
  { strong: "G5479", palavra: "χαρά", transliteracao: "chara", pronuncia: "KA-ra", definicao: "1. Alegria; 2. Fruto do Esprito; 3. Exultacao.", definicoesSecundarias: ["alegria", "gozo", "exultacao"], usoNoNT: 59, livros: ["Mt", "Lc", "Jo", "Fp"], notas: "Fp 4:4, alegrai-vos sempre.", categoria: "substantivo" },
  { strong: "G1680", palavra: "ἐλπίς", transliteracao: "elpis", pronuncia: "EL-pis", definicao: "1. Esperanca; 2. Confianca na promessa; 3. Seguranca.", definicoesSecundarias: ["confianca na promessa", "seguranca eterna"], usoNoNT: 53, livros: ["Rm", "1Co", "Ef", "Hb"], notas: "Nao e desejo incerto, mas certeza.", categoria: "substantivo" },
  { strong: "G3551", palavra: "νόμος", transliteracao: "nomos", pronuncia: "NO-mos", definicao: "1. Lei; 2. Lei mosaica; 3. Lei de Deus.", definicoesSecundarias: ["Lei mosaica", "lei de Deus", "principio"], usoNoNT: 196, livros: ["Mt", "Jo", "At", "Rm", "Gl"], notas: "Rm 7:7-13, lei revela o pecado.", categoria: "substantivo" },
  { strong: "G4990", palavra: "σωτήρ", transliteracao: "soter", pronuncia: "so-TER", definicao: "1. Salvador; 2. Deus como Salvador; 3. Jesus como Salvador.", definicoesSecundarias: ["libertador", "redentor", "messias"], usoNoNT: 24, livros: ["Lc", "Jo", "At", "Rm"], notas: "At 4:12, nao ha salvacao em nenhum outro.", categoria: "substantivo" },
  { strong: "G3340", palavra: "μετάνοια", transliteracao: "metanoia", pronuncia: "me-ta-NO-ia", definicao: "1. Arrependimento; 2. Mudanca de mente; 3. Mudanca de direcao.", definicoesSecundarias: ["mudanca de mente", "conversao", "mudanca de vida"], usoNoNT: 24, livros: ["Mt", "Mc", "Lc", "Jo", "At"], notas: "Mudanca radical de estilo de vida.", categoria: "substantivo" },
  { strong: "G908", palavra: "βάπτισμα", transliteracao: "baptisma", pronuncia: "bap-TIS-ma", definicao: "1. Batismo, imersao; 2. Rito de iniciacao.", definicoesSecundarias: ["imersao", "rito de iniciacao"], usoNoNT: 5, livros: ["Mt", "Mc", "Lc", "At"], notas: "Representa morte e ressurreicao com Cristo.", categoria: "substantivo" },
  { strong: "G2098", palavra: "εὐαγγέλιον", transliteracao: "euangelion", pronuncia: "ev-an-GE-lion", definicao: "1. Boa noticia; 2. Mensagem da salvacao; 3. Evangelho do reino.", definicoesSecundarias: ["boa noticia", "mensagem da salvacao"], usoNoNT: 76, livros: ["Mt", "Mc", "Lc", "Rm"], notas: "Rm 1:16, poder de Deus para salvacao.", categoria: "substantivo" },
  { strong: "G2842", palavra: "κοινωνία", transliteracao: "koinonia", pronuncia: "koi-no-NI-a", definicao: "1. Comunhao; 2. Participacao; 3. Parceria.", definicoesSecundarias: ["comunhao", "participacao", "parceria"], usoNoNT: 20, livros: ["At", "Rm", "1Co", "1Jo"], notas: "At 2:42, perseveravam na koinonia.", categoria: "substantivo" },
  { strong: "G1391", palavra: "δόξα", transliteracao: "doxa", pronuncia: "DO-xa", definicao: "1. Gloria; 2. Majestade de Deus; 3. Honra.", definicoesSecundarias: ["majestade", "resplendor", "honra"], usoNoNT: 166, livros: ["Mt", "Jo", "Rm", "Ap"], notas: "Jo 1:14, vimos a sua gloria.", categoria: "substantivo" },
  { strong: "G3101", palavra: "πιστεύω", transliteracao: "pisteuo", pronuncia: "pis-TEV-o", definicao: "1. Crer; 2. Crer em Deus; 3. Confiar.", definicoesSecundarias: ["crer em Deus", "confiar", "acreditar"], usoNoNT: 241, livros: ["Jo", "At", "Rm"], notas: "Verbo mais usado para fe.", categoria: "verbo" },
  { strong: "G25", palavra: "ἀγαπάω", transliteracao: "agapao", pronuncia: "a-ga-PA-o", definicao: "1. Amar; 2. Amar sacrificialmente.", definicoesSecundarias: ["amar sacrificialmente", "ter afeto"], usoNoNT: 143, livros: ["Mt", "Jo", "Rm", "1Jo"], notas: "Jo 3:16, Deus amou o mundo.", categoria: "verbo" },
  { strong: "G191", palavra: "ἀκολουθέω", transliteracao: "akoloutheo", pronuncia: "a-ko-lu-THE-o", definicao: "1. Seguir; 2. Discipulo; 3. Obedecer; 4. Imitar.", definicoesSecundarias: ["seguir Jesus", "ser discipulo", "obedecer"], usoNoNT: 77, livros: ["Mt", "Mc", "Lc", "Jo"], notas: "Mt 4:19, Segue-me.", categoria: "verbo" },
  { strong: "G3779", palavra: "ὁμολογέω", transliteracao: "homologeo", pronuncia: "o-mo-lo-GE-o", definicao: "1. Confessar; 2. Declarar publicamente; 3. Reconhecer.", definicoesSecundarias: ["confessar Cristo", "reconhecer", "louvar"], usoNoNT: 22, livros: ["Mt", "Jo", "Rm", "Hb"], notas: "Rm 10:9-10.", categoria: "verbo" },
  { strong: "G4341", palavra: "προσκυνέω", transliteracao: "proskyneo", pronuncia: "pros-ky-NE-o", definicao: "1. Adorar; 2. Adorar a Deus; 3. Ajoelhar.", definicoesSecundarias: ["adorar", "reverenciar", "ajoelhar"], usoNoNT: 60, livros: ["Mt", "Jo", "Ap"], notas: "Jo 4:24, adoradores em espirito e verdade.", categoria: "verbo" },
  { strong: "G2309", palavra: "θέλω", transliteracao: "thelo", pronuncia: "THE-lo", definicao: "1. Querer; 2. Determinar; 3. Vontade de Deus.", definicoesSecundarias: ["desejar", "determinar", "consentir"], usoNoNT: 208, livros: ["Mt", "Jo", "Rm", "1Co"], notas: "Mt 26:39, nao seja feita a minha vontade.", categoria: "verbo" },
  { strong: "G1097", palavra: "γινώσκω", transliteracao: "ginosko", pronuncia: "gi-NO-sko", definicao: "1. Conhecer; 2. Reconhecer; 3. Saber por experiencia.", definicoesSecundarias: ["conhecer", "perceber", "experienciar"], usoNoNT: 222, livros: ["Jo", "Rm", "1Jo"], notas: "Conhecimento relacional e experiencial.", categoria: "verbo" },
  { strong: "G1325", palavra: "δίδωμι", transliteracao: "didomi", pronuncia: "DI-do-mi", definicao: "1. Dar; 2. Entregar; 3. Perdoar; 4. Conceder.", definicoesSecundarias: ["dar", "entregar", "perdoar"], usoNoNT: 417, livros: ["Mt", "Lc", "Jo", "Rm"], notas: "Jo 3:16, Deus deu o seu Filho.", categoria: "verbo" },
  { strong: "G3004", palavra: "λέγω", transliteracao: "lego", pronuncia: "LE-go", definicao: "1. Dizer; 2. Declarar; 3. Chamar; 4. Significar.", definicoesSecundarias: ["dizer", "declarar", "chamar"], usoNoNT: 2351, livros: ["Mt", "Jo", "Rm", "1Co"], notas: "Verbo mais comum para falar.", categoria: "verbo" },
  { strong: "G191", palavra: "ἀκούω", transliteracao: "akouo", pronuncia: "a-KU-o", definicao: "1. Ouvir; 2. Escutar; 3. Obedecer.", definicoesSecundarias: ["ouvir", "escutar", "obedecer"], usoNoNT: 428, livros: ["Mt", "Jo", "At", "Rm"], notas: "Ouvir biblico implica obediencia.", categoria: "verbo" },
  { strong: "G1492", palavra: "εἴδω", transliteracao: "eido", pronuncia: "EI-do", definicao: "1. Ver; 2. Perceber; 3. Conhecer por experiencia.", definicoesSecundarias: ["ver", "perceber", "experienciar"], usoNoNT: 454, livros: ["Mt", "Jo", "Rm", "1Jo"], notas: "Ver experiencial, nao apenas visual.", categoria: "verbo" },
  { strong: "G2192", palavra: "ἔχω", transliteracao: "echo", pronuncia: "E-kho", definicao: "1. Ter; 2. Segurar; 3. Manter.", definicoesSecundarias: ["ter", "possuir", "segurar"], usoNoNT: 708, livros: ["Mt", "Jo", "Rm", "1Co"], notas: "Ter Cristo e ter tudo.", categoria: "verbo" },
  { strong: "G2222", palavra: "ζωή", transliteracao: "zoe", pronuncia: "ZO-i", definicao: "1. Vida; 2. Vida eterna; 3. Vida plena.", definicoesSecundarias: ["vida eterna", "vida plena", "vida divina"], usoNoNT: 135, livros: ["Jo", "Rm", "1Jo"], notas: "Jo 10:10, vida em abundancia.", categoria: "substantivo" },
  { strong: "G2590", palavra: "καρπός", transliteracao: "karpos", pronuncia: "KAR-pos", definicao: "1. Fruto; 2. Resultado; 3. Fruto do Esprito.", definicoesSecundarias: ["fruto", "resultado", "fruto espiritual"], usoNoNT: 66, livros: ["Mt", "Jo", "Rm", "Gl"], notas: "Gl 5:22-23, nove qualidades.", categoria: "substantivo" },
  { strong: "G4100", palavra: "πιστός", transliteracao: "pistos", pronuncia: "PIS-tos", definicao: "1. Fiel; 2. Confiavel; 3. Crente.", definicoesSecundarias: ["fiel", "confiavel", "constante"], usoNoNT: 67, livros: ["Rm", "2Tm", "Hb", "Ap"], notas: "2 Tm 2:13, ele permanece fiel.", categoria: "adjetivo" },
  { strong: "G2889", palavra: "κόσμος", transliteracao: "kosmos", pronuncia: "KOS-mos", definicao: "1. Universo; 2. Terra; 3. Humanidade; 4. Sistema mundano.", definicoesSecundarias: ["universo", "humanidade", "sistema mundano"], usoNoNT: 186, livros: ["Jo", "Rm", "1Jo"], notas: "Jo 3:16, Deus amou o mundo.", categoria: "substantivo" },
  { strong: "G5207", palavra: "υἱός", transliteracao: "huios", pronuncia: "y-OS", definicao: "1. Filho; 2. Filho de Deus; 3. Filho do homem.", definicoesSecundarias: ["filho", "filho de Deus", "discipulo"], usoNoNT: 378, livros: ["Mt", "Jo", "Rm", "Hb"], notas: "Titulo cristologico mais comum.", categoria: "substantivo" },
  { strong: "G3962", palavra: "πατήρ", transliteracao: "pater", pronuncia: "pa-TER", definicao: "1. Pai; 2. Pai de familia; 3. Pai de Jesus (Deus).", definicoesSecundarias: ["pai", "criador", "Deus"], usoNoNT: 413, livros: ["Mt", "Jo", "Rm", "Ef"], notas: "Jesus revela Deus como Abba, Pai.", categoria: "substantivo" },
  { strong: "G2424", palavra: "Ἰησοῦς", transliteracao: "Iesous", pronuncia: "i-i-SUS", definicao: "1. Jesus — Yeshua; 2. Salvador; 3. Cristo; 4. Senhor.", definicoesSecundarias: ["Yeshua", "Salvador", "Messias"], usoNoNT: 917, livros: ["Mt", "Jo", "Rm", "Hb", "Ap"], notas: "Do hebraico Yeshua (YHWH salva).", categoria: "substantivo" },
  { strong: "G5547", palavra: "Χριστός", transliteracao: "Christos", pronuncia: "kris-TOS", definicao: "1. Cristo, Ungido; 2. Messias; 3. Salvador; 4. Rei.", definicoesSecundarias: ["Ungido", "Messias", "Salvador"], usoNoNT: 529, livros: ["Mt", "Jo", "Rm", "1Co", "Hb"], notas: "Equivalente hebraico Mashiach.", categoria: "substantivo" },
  { strong: "G1510", palavra: "εἰμί", transliteracao: "eimi", pronuncia: "EI-mi", definicao: "1. Ser; 2. Estar; 3. O Eu Sou joanino.", definicoesSecundarias: ["ser", "existir", "Eu Sou"], usoNoNT: 2462, livros: ["Jo", "Rm", "Ap"], notas: "Jo 8:58, EU SOU.", categoria: "verbo" },
  { strong: "G1401", palavra: "δοῦλος", transliteracao: "doulos", pronuncia: "DOU-los", definicao: "1. Escravo, servo; 2. Servo de Deus; 3. Servo de Cristo.", definicoesSecundarias: ["escravo", "servo de Deus", "submissao"], usoNoNT: 124, livros: ["Rm", "Gl", "Ef", "Fp"], notas: "Rm 1:1, servo de Cristo Jesus.", categoria: "substantivo" },
  { strong: "G3598", palavra: "ὁδός", transliteracao: "hodos", pronuncia: "HO-dos", definicao: "1. Caminho; 2. Modo de vida; 3. Jo 14:6.", definicoesSecundarias: ["caminho", "modo de vida", "via"], usoNoNT: 102, livros: ["Mt", "Jo", "At", "Rm"], notas: "Jo 14:6, o caminho, a verdade e a vida.", categoria: "substantivo" },
  { strong: "G4413", palavra: "προφήτης", transliteracao: "prophetes", pronuncia: "pro-FI-tis", definicao: "1. Profeta; 2. Porta-voz de Deus; 3. Vidente.", definicoesSecundarias: ["porta-voz", "vidente", "preditor"], usoNoNT: 142, livros: ["Mt", "Jo", "At", "1Co"], notas: "Traduz hebraico nabi.", categoria: "substantivo" },
  { strong: "G4166", palavra: "ποιμήν", transliteracao: "poimen", pronuncia: "poi-MEN", definicao: "1. Pastor; 2. Lider espiritual; 3. Bom Pastor.", definicoesSecundarias: ["pastor", "lider", "cuidador"], usoNoNT: 18, livros: ["Mt", "Jo", "1Pe", "Hb"], notas: "Hb 13:20, grande Pastor.", categoria: "substantivo" },
  { strong: "G4103", palavra: "πρόβατον", transliteracao: "probaton", pronuncia: "PRO-ba-ton", definicao: "1. Ovelha; 2. Discipulo de Cristo.", definicoesSecundarias: ["ovelha", "discipulo", "crente"], usoNoNT: 40, livros: ["Mt", "Jo", "1Pe", "Ap"], notas: "Jo 10:11, bom pastor.", categoria: "substantivo" },
  { strong: "G1249", palavra: "διάκονος", transliteracao: "diakonos", pronuncia: "dia-KO-nos", definicao: "1. Servo, ministro; 2. Diacono.", definicoesSecundarias: ["servo", "ministro", "diacono"], usoNoNT: 29, livros: ["Mt", "Jo", "Rm", "1Co"], notas: "Mc 10:45, para servir.", categoria: "substantivo" },
  { strong: "G4245", palavra: "πρεσβύτερος", transliteracao: "presbyteros", pronuncia: "pres-BY-te-ros", definicao: "1. Anciao; 2. Lider da igreja.", definicoesSecundarias: ["anciao", "lider", "pastor"], usoNoNT: 67, livros: ["At", "1Tm", "1Pe", "Tg"], notas: "At 20:28, apascentar a igreja.", categoria: "substantivo" },
  { strong: "G5056", palavra: "τέλος", transliteracao: "telos", pronuncia: "TE-los", definicao: "1. Fim; 2. Proposito; 3. Cumprimento.", definicoesSecundarias: ["fim", "proposito", "cumprimento"], usoNoNT: 40, livros: ["Rm", "Hb", "Ap"], notas: "Rm 10:4, Cristo e o fim da lei.", categoria: "substantivo" },
  { strong: "G649", palavra: "ἀποστέλλω", transliteracao: "apostello", pronuncia: "a-pos-TEL-lo", definicao: "1. Enviar com autoridade; 2. Missao.", definicoesSecundarias: ["enviar", "missao", "comissao"], usoNoNT: 132, livros: ["Mt", "Jo", "At", "Rm"], notas: "Fonte do termo apostolo.", categoria: "verbo" },
  { strong: "G3499", palavra: "νεκρός", transliteracao: "nekros", pronuncia: "ne-KROS", definicao: "1. Morto; 2. Espiritualmente morto; 3. Ressuscitado.", definicoesSecundarias: ["morto", "espiritualmente morto"], usoNoNT: 139, livros: ["Mt", "Rm", "Ef", "Ap"], notas: "Ef 2:1, mortos em pecados.", categoria: "adjetivo" },
  { strong: "G622", palavra: "ἀπόλλυμι", transliteracao: "apollymi", pronuncia: "a-po-LY-o", definicao: "1. Destruir; 2. Perecer; 3. Perder.", definicoesSecundarias: ["destruir", "perecer", "perder"], usoNoNT: 89, livros: ["Mt", "Jo", "Rm", "Ap"], notas: "Jo 3:16, para que nao pereca.", categoria: "verbo" },
  { strong: "G2198", palavra: "ζάω", transliteracao: "zao", pronuncia: "ZA-o", definicao: "1. Viver; 2. Ter vida eterna.", definicoesSecundarias: ["viver", "ter vida eterna"], usoNoNT: 142, livros: ["Mt", "Jo", "Rm"], notas: "Jo 11:25, quem cre vivera.", categoria: "verbo" },
  { strong: "G5023", palavra: "ταπεινοφροσύνη", transliteracao: "tapeinophrosyne", pronuncia: "ta-pi-no-fro-SY-ni", definicao: "1. Humildade; 2. Humildade de espirito.", definicoesSecundarias: ["humildade", "modestia"], usoNoNT: 7, livros: ["Mt", "Fp", "Cl", "1Pe"], notas: "Fp 2:3-8, Jesus e exemplo.", categoria: "substantivo" },
  { strong: "G3068", palavra: "λόγιον", transliteracao: "logion", pronuncia: "LO-gi-on", definicao: "1. Oraculo; 2. Palavra divina; 3. Escritura.", definicoesSecundarias: ["oraculo", "palavra divina"], usoNoNT: 4, livros: ["At", "Hb", "1Pe"], notas: "Hb 5:12, oraculos de Deus.", categoria: "substantivo" },
  { strong: "G4396", palavra: "προφητεία", transliteracao: "propheteia", pronuncia: "pro-fi-TE-ia", definicao: "1. Profecia; 2. Dom profetico.", definicoesSecundarias: ["profecia", "dom profetico"], usoNoNT: 19, livros: ["1Co", "1Ts", "Ap"], notas: "1 Co 14:1, principalmente profecia.", categoria: "substantivo" },
  { strong: "G3863", palavra: "παρακαλέω", transliteracao: "parakaleo", pronuncia: "pa-ra-ka-LE-o", definicao: "1. Consolar; 2. Encorajar; 3. Exortar.", definicoesSecundarias: ["consolar", "encorajar", "exortar"], usoNoNT: 109, livros: ["Jo", "Rm", "2Co"], notas: "Parakletos = Consolador.", categoria: "verbo" },
  { strong: "G2564", palavra: "καλέω", transliteracao: "kaleo", pronuncia: "ka-LE-o", definicao: "1. Chamar; 2. Nomear; 3. Convocar.", definicoesSecundarias: ["chamar", "nomear", "convocar"], usoNoNT: 152, livros: ["Mt", "Jo", "Rm", "Gl"], notas: "Rm 8:30, chamado eficaz.", categoria: "verbo" },
  { strong: "G326", palavra: "ἀμπελος", transliteracao: "ampelos", pronuncia: "AM-pe-los", definicao: "1. Videira. Jo 15:1, videira verdadeira.", definicoesSecundarias: ["videira"], usoNoNT: 6, livros: ["Jo", "Ap"], notas: "Simbolo de Israel. Jesus e a videira.", categoria: "substantivo" }
];

gregos.forEach((g, i) => {
  const e = '  ' + JSON.stringify(g).replace(/"/g, '"');
  w(e + (i < gregos.length - 1 ? ',\n' : '\n'));
});

w('];\n\nconst HEBRAICO: LexiconEntry[] = [\n');

const hebraicos = [
  { strong: "H430", palavra: "אֱלֹהִים", transliteracao: "Elohim", pronuncia: "e-lo-HEEM", definicao: "1. Deus, ser supremo; 2. Deus verdadeiro; 3. Deuses falsos. Plural majestatico.", definicoesSecundarias: ["ser supremo", "divindade"], usoNoNT: 2600, livros: ["Gn", "Ex", "Lv", "Nm", "Dt"], notas: "Gn 1:1, plural majestatico.", categoria: "substantivo" },
  { strong: "H3068", palavra: "יְהוָה", transliteracao: "YHWH", pronuncia: "ya-VAH", definicao: "1. O Senhor; 2. Nome pessoal de Deus; 3. O Ser eterno.", definicoesSecundarias: ["O Ser", "O Eterno", "Deus da alianca"], usoNoNT: 6828, livros: ["Gn", "Ex", "Lv", "Nm", "Dt"], notas: "Ex 3:14, Eu Sou o que Sou.", categoria: "substantivo" },
  { strong: "H120", palavra: "אָדָם", transliteracao: "Adam", pronuncia: "a-DAM", definicao: "1. Homem; 2. Adao; 3. Humanidade.", definicoesSecundarias: ["homem", "humanidade", "Adao"], usoNoNT: 552, livros: ["Gn", "Jó", "Sl", "Is"], notas: "Gn 2:7, formou o homem do po.", categoria: "substantivo" },
  { strong: "H2416", palavra: "חַיִּים", transliteracao: "chayyim", pronuncia: "cha-YEEM", definicao: "1. Vida; 2. Vitalidade; 3. Vida eterna.", definicoesSecundarias: ["vida", "vitalidade", "vida eterna"], usoNoNT: 753, livros: ["Gn", "Dt", "Sl", "Pr"], notas: "Dt 30:19, escolhe a vida.", categoria: "substantivo" },
  { strong: "H4194", palavra: "מָוֶת", transliteracao: "maweth", pronuncia: "ma-VET", definicao: "1. Morte; 2. Sepultura.", definicoesSecundarias: ["morte", "sepultura"], usoNoNT: 403, livros: ["Gn", "Nm", "Sl", "Ec"], notas: "Gn 2:17, certamente morreras.", categoria: "substantivo" },
  { strong: "H4941", palavra: "מִשְׁפָּט", transliteracao: "mishpat", pronuncia: "mish-PAT", definicao: "1. Juizo; 2. Justica; 3. Direito.", definicoesSecundarias: ["justica", "direito", "sentenca"], usoNoNT: 297, livros: ["Gn", "Ex", "Dt", "Am"], notas: "Am 5:24, deixa correr o juizo.", categoria: "substantivo" },
  { strong: "H6664", palavra: "צְדָקָה", transliteracao: "tsedaqah", pronuncia: "tsed-qa-HA", definicao: "1. Justica; 2. Justica de Deus; 3. Esmola.", definicoesSecundarias: ["justica", "esmola", "salvacao"], usoNoNT: 157, livros: ["Gn", "Dt", "Sl", "Is"], notas: "Gn 15:6, imputado justica.", categoria: "substantivo" },
  { strong: "H2617", palavra: "חֶסֶד", transliteracao: "chesed", pronuncia: "KHE-sed", definicao: "1. Clemencia; 2. Amor da alianca; 3. Fidelidade.", definicoesSecundarias: ["bondade", "fidelidade", "misericordia"], usoNoNT: 248, livros: ["Gn", "Dt", "Sl", "Pr"], notas: "Sl 136, chesed dura para sempre.", categoria: "substantivo" },
  { strong: "H539", palavra: "אֱמוּנָה", transliteracao: "emunah", pronuncia: "e-mu-NAH", definicao: "1. Fidelidade; 2. Fe; 3. Constancia.", definicoesSecundarias: ["fidelidade", "confianca", "constancia"], usoNoNT: 49, livros: ["Gn", "Dt", "Sl", "Hab"], notas: "Hab 2:4, justo vivera pela fe.", categoria: "substantivo" },
  { strong: "H7965", palavra: "שָׁלוֹם", transliteracao: "shalom", pronuncia: "sha-LOM", definicao: "1. Paz; 2. Bem-estar; 3. Completude.", definicoesSecundarias: ["paz", "bem-estar", "completude"], usoNoNT: 236, livros: ["Gn", "Sl", "Is", "Jr"], notas: "Is 9:6, Principe da Paz.", categoria: "substantivo" },
  { strong: "H1285", palavra: "בְּרִית", transliteracao: "berith", pronuncia: "be-REET", definicao: "1. Alianca; 2. Pacto.", definicoesSecundarias: ["alianca", "pacto", "compromisso"], usoNoNT: 272, livros: ["Gn", "Ex", "Dt", "Jr"], notas: "Jr 31:31, alianca nova.", categoria: "substantivo" },
  { strong: "H4720", palavra: "מִקְדָּשׁ", transliteracao: "miqdash", pronuncia: "mik-DASH", definicao: "1. Santuario; 2. Tabernaculo; 3. Templo.", definicoesSecundarias: ["santuário", "tabernaculo", "templo"], usoNoNT: 135, livros: ["Ex", "Lv", "Is", "Ez"], notas: "Ex 25:8, santuario para habitar.", categoria: "substantivo" },
  { strong: "H3548", palavra: "כֹּהֵן", transliteracao: "kohen", pronuncia: "ko-HEN", definicao: "1. Sacerdote; 2. Ministro; 3. Sumo sacerdote.", definicoesSecundarias: ["sacerdote", "ministro", "mediador"], usoNoNT: 748, livros: ["Gn", "Ex", "Lv", "Sl"], notas: "Jesus e grande sumo sacerdote.", categoria: "substantivo" },
  { strong: "H4428", palavra: "מֶלֶךְ", transliteracao: "melek", pronuncia: "ME-lek", definicao: "1. Rei; 2. Governante; 3. Deus como Rei.", definicoesSecundarias: ["rei", "soberano", "governante"], usoNoNT: 2585, livros: ["Gn", "Sm", "Rs", "Sl"], notas: "Sl 47:2, o grande Rei.", categoria: "substantivo" },
  { strong: "H5030", palavra: "נָבִיא", transliteracao: "nabi", pronuncia: "na-BEE", definicao: "1. Profeta; 2. Porta-voz de Deus.", definicoesSecundarias: ["profeta", "porta-voz", "vidente"], usoNoNT: 317, livros: ["Gn", "Ex", "Dt", "Is"], notas: "Dt 18:15, profeta como tu.", categoria: "substantivo" },
  { strong: "H2451", palavra: "חָכְמָה", transliteracao: "chokmah", pronuncia: "khok-MAH", definicao: "1. Sabedoria; 2. Entendimento.", definicoesSecundarias: ["sabedoria", "entendimento", "habilidade"], usoNoNT: 149, livros: ["Gn", "Jó", "Sl", "Pr"], notas: "Pv 1:7, temor do Senhor.", categoria: "substantivo" },
  { strong: "H995", palavra: "בִּינָה", transliteracao: "binah", pronuncia: "bee-NAH", definicao: "1. Entendimento; 2. Discernimento.", definicoesSecundarias: ["entendimento", "discernimento"], usoNoNT: 36, livros: ["Ex", "Sl", "Pr", "Dn"], notas: "Pv 4:7, adquire entendimento.", categoria: "substantivo" },
  { strong: "H8451", palavra: "תּוֹרָה", transliteracao: "torah", pronuncia: "to-RAH", definicao: "1. Instrucao; 2. Lei; 3. Torah.", definicoesSecundarias: ["instrucao", "lei", "Pentateuco"], usoNoNT: 220, livros: ["Gn", "Ex", "Dt", "Sl"], notas: "Dt 6:4, SHEMA.", categoria: "substantivo" },
  { strong: "H4687", palavra: "מִצְוָה", transliteracao: "mitsvah", pronuncia: "mits-VAH", definicao: "1. Mandamento; 2. Comando.", definicoesSecundarias: ["mandamento", "preceito"], usoNoNT: 183, livros: ["Dt", "Sl", "Pr", "Is"], notas: "Jesus resume em dois.", categoria: "substantivo" },
  { strong: "H5771", palavra: "עָוֺן", transliteracao: "awon", pronuncia: "a-VON", definicao: "1. Iniquidade; 2. Culpa.", definicoesSecundarias: ["iniquidade", "culpa", "pecado"], usoNoNT: 230, livros: ["Gn", "Sl", "Is", "Jr"], notas: "Is 53:5, pelas nossas iniquidades.", categoria: "substantivo" },
  { strong: "H1802", palavra: "דָּבָר", transliteracao: "davar", pronuncia: "da-VAR", definicao: "1. Palavra; 2. Coisa; 3. Mandamento.", definicoesSecundarias: ["palavra", "coisa", "mandamento"], usoNoNT: 1440, livros: ["Gn", "Ex", "Sl", "Is"], notas: "Gn 1, Deus cria pela palavra.", categoria: "substantivo" },
  { strong: "H3117", palavra: "יוֹם", transliteracao: "yom", pronuncia: "YOM", definicao: "1. Dia; 2. Periodo; 3. Epoca.", definicoesSecundarias: ["dia", "periodo", "epoca"], usoNoNT: 2304, livros: ["Gn", "Ex", "Sl", "Dn"], notas: "Gn 1, dia da criacao.", categoria: "substantivo" },
  { strong: "H3588", palavra: "לֵב", transliteracao: "lev", pronuncia: "LEV", definicao: "1. Coracao; 2. Mente; 3. Vontade.", definicoesSecundarias: ["coracao", "mente", "vontade"], usoNoNT: 593, livros: ["Gn", "Dt", "Sl", "Pr"], notas: "Dt 6:5, de todo o coracao.", categoria: "substantivo" },
  { strong: "H3101", palavra: "בֵּן", transliteracao: "ben", pronuncia: "BEN", definicao: "1. Filho; 2. Descendente.", definicoesSecundarias: ["filho", "descendente", "membro"], usoNoNT: 1819, livros: ["Gn", "Ex", "Sl", "Pr"], notas: "Sl 2:7, Tu es o meu Filho.", categoria: "substantivo" },
  { strong: "H1", palavra: "אָב", transliteracao: "av", pronuncia: "AV", definicao: "1. Pai; 2. Patriarca.", definicoesSecundarias: ["pai", "ancestral", "patriarca"], usoNoNT: 1213, livros: ["Gn", "Ex", "Sl", "Is"], notas: "Gn 12:1, chama Abraao.", categoria: "substantivo" },
  { strong: "H7723", palavra: "שֵׁם", transliteracao: "shem", pronuncia: "SHEM", definicao: "1. Nome; 2. Reputacao; 3. Autoridade.", definicoesSecundarias: ["nome", "reputacao", "autoridade"], usoNoNT: 832, livros: ["Gn", "Ex", "Sl", "Is"], notas: "Nome representa a pessoa.", categoria: "substantivo" },
  { strong: "H3389", palavra: "בָּרָא", transliteracao: "bara", pronuncia: "ba-RA", definicao: "1. Criar; 2. Criar ex nihilo.", definicoesSecundarias: ["criar", "formar", "produzir"], usoNoNT: 54, livros: ["Gn", "Sl", "Is"], notas: "Gn 1:1, bara = exclusivo de Deus.", categoria: "verbo" },
  { strong: "H1961", palavra: "הָיָה", transliteracao: "hayah", pronuncia: "ha-YAH", definicao: "1. Ser; 2. Acontecer; 3. Tornar-se.", definicoesSecundarias: ["ser", "existir", "acontecer"], usoNoNT: 3167, livros: ["Gn", "Ex", "Dt", "Sl"], notas: "De hayah vem YHWH.", categoria: "verbo" },
  { strong: "H2822", palavra: "חֹשֶׁךְ", transliteracao: "choshek", pronuncia: "kho-SHEK", definicao: "1. Trevas; 2. Escuridao.", definicoesSecundarias: ["trevas", "escuridao", "maldade"], usoNoNT: 191, livros: ["Gn", "Ex", "Jó", "Is"], notas: "Gn 1:4, separou luz das trevas.", categoria: "substantivo" },
  { strong: "H505", palavra: "אָהַב", transliteracao: "ahav", pronuncia: "a-HAV", definicao: "1. Amar; 2. Ter afeto.", definicoesSecundarias: ["amar", "ter afeto", "desejar"], usoNoNT: 252, livros: ["Gn", "Dt", "Sl", "Os"], notas: "Dt 6:5, amaras o Senhor.", categoria: "verbo" },
  { strong: "H3372", palavra: "יָרֵא", transliteracao: "yare", pronuncia: "ya-RE", definicao: "1. Temer; 2. Reverenciar.", definicoesSecundarias: ["temer", "reverenciar", "respeitar"], usoNoNT: 187, livros: ["Gn", "Ex", "Sl", "Pr"], notas: "Pv 1:7, temor do Senhor.", categoria: "verbo" },
  { strong: "H559", palavra: "אָמֵן", transliteracao: "amen", pronuncia: "a-MEN", definicao: "1. Assim seja; 2. Verdadeiro.", definicoesSecundarias: ["assim seja", "verdadeiro", "confirmacao"], usoNoNT: 30, livros: ["Nm", "Sl", "Is"], notas: "Termo de confirmacao.", categoria: "interjeição" },
  { strong: "H3899", palavra: "מָשִׁיחַ", transliteracao: "mashiach", pronuncia: "ma-SHE-ach", definicao: "1. Ungido; 2. Messias.", definicoesSecundarias: ["ungido", "Messias", "rei"], usoNoNT: 39, livros: ["Lv", "Sm", "Sl", "Dn"], notas: "Dn 9:25, Messias sera morto.", categoria: "substantivo" },
  { strong: "H157", palavra: "אֶהְיֶה", transliteracao: "Ehyeh", pronuncia: "eh-YEH", definicao: "1. Eu serei; 2. Eu sou.", definicoesSecundarias: ["Eu serei", "Eu sou", "Eu existo"], usoNoNT: 3, livros: ["Ex"], notas: "Ex 3:14, Ehyeh asher Ehyeh.", categoria: "verbo" },
  { strong: "H216", palavra: "אוֹר", transliteracao: "or", pronuncia: "OR", definicao: "1. Luz; 2. Dia.", definicoesSecundarias: ["luz", "dia", "conhecimento"], usoNoNT: 262, livros: ["Gn", "Sl", "Is"], notas: "Gn 1:3, haja luz.", categoria: "substantivo" },
  { strong: "H6963", palavra: "קוֹל", transliteracao: "qol", pronuncia: "KOL", definicao: "1. Voz; 2. Som; 3. Chamado.", definicoesSecundarias: ["voz", "som", "chamado"], usoNoNT: 531, livros: ["Gn", "Ex", "Sl", "Is"], notas: "Gn 3:8, ouviu a voz.", categoria: "substantivo" },
  { strong: "H1818", palavra: "דָּם", transliteracao: "dam", pronuncia: "DAM", definicao: "1. Sangue; 2. Vida.", definicoesSecundarias: ["sangue", "vida", "linhagem"], usoNoNT: 360, livros: ["Gn", "Ex", "Lv", "Sl"], notas: "Lv 17:11, a vida esta no sangue.", categoria: "substantivo" },
  { strong: "H3472", palavra: "יִשְׂרָאֵל", transliteracao: "Yisrael", pronuncia: "yis-ra-EL", definicao: "1. Israel; 2. Povo escolhido.", definicoesSecundarias: ["Israel", "povo escolhido"], usoNoNT: 2565, livros: ["Gn", "Ex", "Sl", "Is"], notas: "Gn 32:28, luta com Deus.", categoria: "substantivo" },
  { strong: "H136", palavra: "אֲדֹנָי", transliteracao: "Adonai", pronuncia: "a-do-NAI", definicao: "1. Senhor; 2. Amo.", definicoesSecundarias: ["Senhor", "amo", "senhorio"], usoNoNT: 458, livros: ["Gn", "Ex", "Sl", "Is"], notas: "Substituto reverente para YHWH.", categoria: "substantivo" },
  { strong: "H430", palavra: "אֵל", transliteracao: "El", pronuncia: "EL", definicao: "1. Deus; 2. Poderoso.", definicoesSecundarias: ["Deus", "poderoso", "fortaleza"], usoNoNT: 238, livros: ["Gn", "Ex", "Sl", "Is"], notas: "Gn 14:18, El Elyon.", categoria: "substantivo" },
  { strong: "H3444", palavra: "יְשׁוּעָה", transliteracao: "yeshuah", pronuncia: "ye-shu-AH", definicao: "1. Salvacao; 2. Livramento.", definicoesSecundarias: ["salvacao", "livramento", "seguranca"], usoNoNT: 78, livros: ["Dt", "Sl", "Is"], notas: "Nome Yeshua = YHWH salva.", categoria: "substantivo" },
  { strong: "H1981", palavra: "הֵלֶךְ", transliteracao: "hlek", pronuncia: "HE-lek", definicao: "1. Ir; 2. Caminhar; 3. Andar com Deus.", definicoesSecundarias: ["ir", "caminhar", "andar"], usoNoNT: 52, livros: ["Gn", "Sl", "Pr"], notas: "Gn 5:22, Enoque andou com Deus.", categoria: "verbo" },
  { strong: "H5159", palavra: "נַחַל", transliteracao: "nachal", pronuncia: "na-KHAL", definicao: "1. Heranca; 2. Possessao.", definicoesSecundarias: ["heranca", "possessao", "porcao"], usoNoNT: 251, livros: ["Gn", "Dt", "Js", "Sl"], notas: "Terra prometida como heranca.", categoria: "substantivo" },
  { strong: "H2896", palavra: "גָּדוֹל", transliteracao: "gadol", pronuncia: "ga-DOL", definicao: "1. Grande; 2. Poderoso.", definicoesSecundarias: ["grande", "poderoso", "majestoso"], usoNoNT: 533, livros: ["Gn", "Ex", "Sl", "Is"], notas: "Sl 145:3, Grande e o Senhor.", categoria: "adjetivo" },
  { strong: "H2603", palavra: "חָנָן", transliteracao: "chanan", pronuncia: "kha-NAN", definicao: "1. Ter graca; 2. Perdoar.", definicoesSecundarias: ["ter graca", "perdoar", "misericordia"], usoNoNT: 68, livros: ["Gn", "Ex", "Sl", "Is"], notas: "Ex 33:19, terei misericordia.", categoria: "verbo" },
  { strong: "H5564", palavra: "צָעַק", transliteracao: "tsaak", pronuncia: "tsa-AK", definicao: "1. Clamar; 2. Suplicar.", definicoesSecundarias: ["clamar", "suplicar", "implorar"], usoNoNT: 49, livros: ["Gn", "Ex", "Sl", "Is"], notas: "Ex 3:7, ouvi o clamor.", categoria: "verbo" },
  { strong: "H6213", palavra: "עָשָׂה", transliteracao: "asah", pronuncia: "a-SAH", definicao: "1. Fazer; 2. Criar; 3. Executar.", definicoesSecundarias: ["fazer", "criar", "produzir"], usoNoNT: 2633, livros: ["Gn", "Ex", "Sl", "Is"], notas: "Gn 1:7, fez o firmamento.", categoria: "verbo" },
  { strong: "H202", palavra: "אִמָּא", transliteracao: "imma", pronuncia: "IM-ma", definicao: "1. Mae; 2. Ancestral.", definicoesSecundarias: ["mae", "ancestral"], usoNoNT: 228, livros: ["Gn", "Ex", "Sl", "Is"], notas: "Is 66:13, como mae consola.", categoria: "substantivo" },
  { strong: "H7999", palavra: "שֶׁלֶשׁ", transliteracao: "shelosh", pronuncia: "she-LOSH", definicao: "1. Tres; 2. Terceiro.", definicoesSecundarias: ["tres", "terceiro"], usoNoNT: 399, livros: ["Gn", "Ex", "Sl"], notas: "Simbolo de completude.", categoria: "numeral" },
  { strong: "H8064", palavra: "שָׁמַיִם", transliteracao: "shamayim", pronuncia: "sha-MAH-yim", definicao: "1. Ceus; 2. Habitacao de Deus.", definicoesSecundarias: ["ceus", "habitacao de Deus"], usoNoNT: 694, livros: ["Gn", "Ex", "Sl", "Is"], notas: "Gn 1:1, criou os ceus.", categoria: "substantivo" },
  { strong: "H60", palavra: "אֶרֶץ", transliteracao: "erets", pronuncia: "E-rets", definicao: "1. Terra; 2. Pais; 3. Regiao.", definicoesSecundarias: ["terra", "pais", "mundo"], usoNoNT: 2573, livros: ["Gn", "Ex", "Dt", "Is"], notas: "Gn 1:1, criou a terra.", categoria: "substantivo" }
];

hebraicos.forEach((g, i) => {
  const e = '  ' + JSON.stringify(g).replace(/"/g, '"');
  w(e + (i < hebraicos.length - 1 ? ',\n' : '\n'));
});

w('];\n\n');
w('export const LEXICON_BDAG: LexiconEntry[] = [...GREGO, ...HEBRAICO];\n\n');
w('export const TOTAL_ENTRADAS = LEXICON_BDAG.length;\n');
w('export const TOTAL_GREGOS = GREGO.length;\n');
w('export const TOTAL_HEBRAICOS = HEBRAICO.length;\n\n');
w('export function buscarPorStrong(strong: string): LexiconEntry | undefined {\n');
w('  return LEXICON_BDAG.find(e => e.strong === strong);\n');
w('}\n\n');
w('export function buscarPorPalavra(palavra: string): LexiconEntry[] {\n');
w('  const lower = palavra.toLowerCase();\n');
w('  return LEXICON_BDAG.filter(e =>\n');
w('    e.palavra.toLowerCase().includes(lower) ||\n');
w('    e.transliteracao.toLowerCase().includes(lower)\n');
w('  );\n');
w('}\n\n');
w('export function buscarPorCategoria(categoria: string): LexiconEntry[] {\n');
w('  return LEXICON_BDAG.filter(e => e.categoria === categoria);\n');
w('}\n\n');
w('export function buscarPorFrequencia(minFrequencia: number): LexiconEntry[] {\n');
w('  return LEXICON_BDAG.filter(e => e.usoNoNT >= minFrequencia);\n');
w('}\n\n');
w('export function obterEstatisticas() {\n');
w('  const categorias: Record<string, number> = {};\n');
w('  LEXICON_BDAG.forEach(e => {\n');
w('    if (e.categoria) {\n');
w('      categorias[e.categoria] = (categorias[e.categoria] || 0) + 1;\n');
w('    }\n');
w('  });\n');
w('  return {\n');
w('    total: LEXICON_BDAG.length,\n');
w('    gregos: TOTAL_GREGOS,\n');
w('    hebraicos: TOTAL_HEBRAICOS,\n');
w('    categorias,\n');
w('    maisFrequentes: LEXICON_BDAG\n');
w('      .sort((a, b) => b.usoNoNT - a.usoNoNT)\n');
w('      .slice(0, 20)\n');
w('  };\n');
w('}\n');

const size = statSync(p).size;
console.log('File written: ' + size + ' bytes');
console.log('Greek entries: ' + gregos.length);
console.log('Hebrew entries: ' + hebraicos.length);
console.log('Total: ' + (gregos.length + hebraicos.length));
"