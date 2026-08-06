// ═══════════════════════════════════════════════════════════════════════════
// ROMANOS: A TEOLOGIA DA CRUZ — ESTUDO ACADÊMICO PROFUNDO
// Nível: Seminário / Pós-graduação
// Conteúdo: Análise exegética com grego, desenvolvimento histórico-doutrinário,
//           múltiplas perspectivas teológicas, bibliografia acadêmica
// ═══════════════════════════════════════════════════════════════════════════

export interface SecaoAcademica {
  titulo: string;
  subtitulo?: string;
  conteudo: string; // Markdown
  grego?: { termo: string; transliteracao: string; significado: string; Strong: number }[];
  citacoes: CitacaoAcademica[];
  perspectivas?: PerspectivaTeologica[];
  perguntas: string[];
  bibliografia: ReferenciaBibliografica[];
}

export interface CitacaoAcademica {
  autor: string;
  obra: string;
  ano: number;
  pagina?: string;
  volume?: string;
  editora: string;
  local: string;
  tradutor?: string;
  edicao?: string;
  citacao: string;
}

export interface PerspectivaTeologica {
  nome: string;
  tradicao: string;
  representantes: string;
  argumento: string;
  forcas: string[];
  fraquezas: string[];
}

export interface ReferenciaBibliografica {
  autor: string;
  obra: string;
  ano: number;
  editora: string;
  local: string;
  tipo: 'comentario' | 'teologia' | 'historia' | 'linguistica' | 'monografia';
  nivel: 'introdutorio' | 'intermediario' | 'avancado' | 'especializado';
}

// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO 1: INTRODUÇÃO E CONTEXTO HISTÓRICO-CRÍTICO
// ═══════════════════════════════════════════════════════════════════════════

export const modulo1: SecaoAcademica = {
  titulo: '1. Introdução e Contexto Histórico-Crítico',
  subtitulo: 'A Situação da Comunidade Romana e a Ocasião da Carta',
  conteudo: `
## 1.1 A Questão da Autoria e Datação

A carta aos Romanos é universalmente reconhecida como obra de Paulo de Tarso, sendo uma das poucas cartas paulinas cuja autoria não é contestada nem por críticos liberais. A tradição uniforme da igreja primitiva,从 Irenaeus (Adversus Haereses 3.1.1) até Orígenes, atesta a autoria paulina.

**Datação:** A carta foi escritas entre 55-57 d.C., provavelmente de Corinto, durante a terceira viagem missionária de Paulo (Atos 20:2-3). A menção de Febe (16:1-2) como portadora sugere que foi escrita antes da viagem a Jerusalém com as ofertas das igrejas gentias (Romanos 15:25-27).

**Evidência interna para datação:**
- Paulo ainda não visitou Roma (15:22-24), indicando data anterior a 60 d.C.
- A igreja romana é estabelecida (15:20) mas não fundada por Paulo
- A coleta para os santos em Jerusalém está em andamento (15:25-27)
- Febe é mencionada como diácona de Cêncrea (16:1-2)

## 1.2 A Situação da Comunidade Romana

A comunidade romana era pluralisticamente composta por judeus e gentios. A expulsão de judeus por Cláudio (49 d.C., cf. Atos 18:2; Suetônio, Cláudio 25.4) criou uma crise: durante os ~5 anos de ausência, os gentios assumiram posições de liderança na comunidade. Quando os judeus retornaram após a morte de Cláudio (54 d.C.), emergiram tensões sobre a Torá, a circuncisão e os alimentos.

**Problema central:** Como judeus e gentios convivem na mesma comunidade sem que a Torá se torne um obstáculo à unidade? Romanos não é um tratado teológico abstrato — é uma resposta pastoral a um problema eclesial concreto.

## 1.3 Estrutura Retórica

A estrutura de Romanos é debatida, mas o consenso dominante segue a análise retórica:

| Seção | Capítulos | Conteúdo |
|-------|-----------|----------|
| **Prelúdio** | 1:1-17 | Saudação e tese central |
| **Diagnóstico** | 1:18-3:20 | Condição humana sob o juízo |
| **Solução** | 3:21-8:39 | Justificação e vida no Espírito |
| **Questão Israel** | 9:1-11:36 | O lugar de Israel na história da salvação |
| **Aplicações Práticas** | 12:1-15:13 | Vida comunitária e ética cristã |
| **Epílogo** | 15:14-16:27 | Planos de viagem e doxologia |

## 1.4 O Debate sobre a Estrutura

Duas grandes abordagens competem:

**Abordagem Analítica (divisão temática):** Segue a progressão doutrinária: culpabilidade (1:18-3:20) → justificação (3:21-5:21) → santificação (6:1-8:39) → Israel (9:11) → aplicações (12:1-15:13).

**Abordagem Retórica (Stowers, 1994):** Romanos é um discurso deliberativo, visando persuadir a audiência a aceitar uma posição sobre a relação judeu-gentio. A tese de Stowers é que Paulo está mediating entre facções judaicas e gentias na igreja romana.

**Abordagem Epistolar-Narrativa (Kidd, 1998):** A carta deve ser lida como um todo narrativo, onde Paulo constrói gradualmente o argumento sobre a fidelidade de Deus (pistis theou) que se manifesta em Cristo.
  `,
  grego: [
    { termo: 'δικαιοσύνη θεοῦ', transliteracao: 'dikaiosýnē theoû', significado: 'Justiça de Deus — não apenas atributo divino, mas o modo pelo qual Deus declarou justos os ímpios. Fundamental para toda a teologia paulina.', Strong: 1343 },
    { termo: 'πίστις Χριστοῦ', transliteracao: 'pístis Christoû', significado: 'Fé de Cristo vs. Fé em Cristo — o debate genitivo mais importante da teologia paulina. Se é subjetivo (fé que Cristo tem) ou objetivo (fé em Cristo).', Strong: 4102 },
    { termo: 'λογίζομαι', transliteracao: 'logízomai', significado: 'Imputar /Considerar — termo contábil/forense. Paulo usa 11 vezes em Romanos 4-5. Não é "tornar" mas "declarar como sendo".', Strong: 3049 },
  ],
  citacoes: [
    {
      autor: 'John Murray',
      obra: 'The Epistle to the Romans',
      ano: 1968,
      pagina: '15-16',
      editora: 'Eerdmans',
      local: 'Grand Rapids',
      edicao: 'The New International Commentary on the New Testament',
      citacao: 'Romanos é a exposição mais sistemática e abrangente da mensagem do evangelho que possuímos no Novo Testamento. Não há nenhuma outra parte das Escrituras que trate com tanta profundidade e completude as grandes questões da salvação.',
    },
    {
      autor: 'Joseph Fitzmyer',
      obra: 'Romans: A New Translation with Introduction and Commentary',
      ano: 1993,
      pagina: '81',
      volume: '33',
      editora: 'Doubleday',
      local: 'New York',
      edicao: 'The Anchor Yale Bible',
      citacao: 'A carta aos Romanos não é um tratado sistemático sobre justificação pela fé, mas uma exortação pastoral baseada na doutrina da justificação.',
    },
  ],
  perspectivas: [
    {
      nome: 'Perspectiva Reformada',
      tradicao: 'Calvinismo',
      representantes: 'John Murray, Thomas Schreiner, D.A. Carson',
      argumento: 'Romanos ensina a prioridade da soberania de Deus na salvação. Romanos 9 é o centro teológico da carta, estabelecendo que a eleição incondicional é o fundamento de toda a economia da salvação.',
      forcas: ['Respeita o texto paulino sobre a soberania divina', 'Coerência com a tradição agostiniana-reformada'],
      fraquezas: ['Pode subestimar a responsabilidade humana', 'Dificuldade de integrar Romanos 9-11 com Romanos 12-15'],
    },
    {
      nome: 'Perspectiva Arminiana',
      tradicao: 'Wesleyana',
      representantes: 'Stanley Horton, Thomas Oden, Ben Witherington III',
      argumento: 'Romanos ensina uma salvação disponível a todos que crêem. Romanos 10:9-13 é a tese central: "todo aquele que invocar o nome do Senhor será salvo". A eleição em Romanos 9 refere-se à nação de Israel, não a indivíduos.',
      forcas: ['Faz justiça ao apelo universal do evangelho', 'Coerência com a responsabilidade moral humana'],
      fraquezas: ['Dificuldade de explicar Romanos 9:10-23 em termos de eleição nacional'],
    },
    {
      nome: 'Nova Perspectiva sobre Paulo',
      tradicao: 'Episcopal/Anglicana',
      representantes: 'N.T. Wright, James D.G. Dunn, Richard Hays',
      argumento: 'A "fé em Cristo" (pistis Christou) deve ser entendida como a fidelidade de Cristo, não como ato de fé individual. A justificação é o veredicto final no juízo, antecipado agora pela graça. O problema de Romanos não é "como ser salvo individualmente" mas "como judeus e gentios convivem na mesma comunidade".',
      forcas: ['Recupera o contexto judaico do argumento paulino', 'Resolve a tensão entre fé e obras'],
      fraquezas: ['Reinterpretation radical da justificação forense', 'Acusações de minimizar a conversão pessoal'],
    },
  ],
  perguntas: [
    'Qual é a relação entre o contexto histórico da comunidade romana (expulsão de judeus por Cláudio) e o argumento teológico de Paulo?',
    'Como a análise retórica de Stowers muda nossa compreensão do propósito de Romanos?',
    'Compare as três perspectivas teológicas: qual melhor explica Romanos 9-11? Quais são as forças e fraquezas de cada uma?',
    'Por que Paulo usa termos forenses (dikaioō, logizomai) em vez de termos morais (agathopoieō) para descrever a justificação?',
  ],
  bibliografia: [
    { autor: 'Moo, Douglas J.', obra: 'The Epistle to the Romans', ano: 1996, editora: 'Eerdmans', local: 'Grand Rapids', tipo: 'comentario', nivel: 'avancado' },
    { autor: 'Dunn, James D.G.', obra: 'Romans 1-8', ano: 1988, editora: 'Word Books', local: 'Waco', tipo: 'comentario', nivel: 'avancado' },
    { autor: 'Wright, N.T.', obra: 'The Climax of the Covenant', ano: 1992, editora: 'Fortress Press', local: 'Minneapolis', tipo: 'teologia', nivel: 'especializado' },
    { autor: 'Stowers, Stanley K.', obra: 'A Rereading of Romans', ano: 1994, editora: 'Yale University Press', local: 'New Haven', tipo: 'monografia', nivel: 'especializado' },
    { autor: 'Schreiner, Thomas R.', obra: 'Romans', ano: 1998, editora: 'Baker Academic', local: 'Grand Rapids', tipo: 'comentario', nivel: 'avancado' },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO 2: A CONDIÇÃO HUMANA (1:18-3:20)
// ═══════════════════════════════════════════════════════════════════════════

export const modulo2: SecaoAcademica = {
  titulo: '2. A Condição Humana sob o Juízo Divino',
  subtitulo: 'Romanos 1:18-3:20 — Universalidade do Pecado',
  conteudo: `
## 2.1 A Teologia da Rejeição (1:18-32)

Paulo desenvolve um argumento em três movimentos sobre como a humanidade rejeitou o conhecimento de Deus:

### 2.1.1 O Conhecimento Inato (1:19-20)
A "revelação geral" (apokalypsis) é insuficiente para salvar mas suficiente para condenar. O argumento é baseado na teologia da创造 de Paulo: Deus se fez conhecível (gnōstos) através da criação (ta horata), mas a humanidade suprimiu esse conhecimento (ἐκράτησαν, ekatēsan — "tiveram" ou "suprimiram").

**Debate exegético:** O verbo em 1:18 (κατεχόντων) é ambíguo — pode significar "reter" (suprimir o conhecimento) ou "sustentar" (manter o conhecimento). A maioria dos comentaristas modernos (Moo, Schreiner, Dunn) prefere "reter/suprimir", seguindo a tradição de Calvino.

### 2.1.2 A Queda no Panteísmo (1:21-23)
O processo de secularização segue quatro passos:
1. Ingratidão (ἀχαριστία)
2. Vazios racional (ἐματαιώθησαν)
3. Trevas no entendimento (ἐσκοτίσθη)
4. Idolatria (ἐμόρφωσαν — "trocaram a glória por imagens")

### 2.1.3 As Consequências (1:24-32)
A "ira de Deus" (orgē theou) não é vingança emocional mas abandono judicial — Deus permite que as criaturas sofram as consequências naturais de suas escolhas. O catálogo de vícios em 1:29-31 segue o padrão helenístico de vícios listados (cf. 2 Crônicas 12:12; 1 Enoque 100:1-2).

## 2.2 O Argumento sobre o Juízo (2:1-3:8)

### 2.2.1 A Armadilha Moral (2:1-3)
Paulo gira o argumento: os judeus que julgam os gentios por suas práticas (1:18-32) são culpados das mesmas coisas. O verbo κρίνειν (krinein) em 2:1 é o mesmo usado em 1:32 — os que julgam praticam o que julgam.

### 2.2.2 A Torá e a Circuncisão (2:17-29)
Paulo argumenta que:
- A拥有 da Torá não garante obediência (2:17-24)
- A circuncisão física não substitui a circuncisão do coração (2:28-29)

O termo περιτομή καρδίας (peritomē kardias) em 2:29 retoma a tradição profética (Deuteronômio 10:16; Jeremias 4:4; 9:25-26), não é invenção paulina.

## 2.3 A Conclusão Universal (3:9-20)

Paulo cita uma catálogo de Septuaginta (Sl 14:1-3; 53:1-3; 5:10; 140:3; 10:7; Isaías 59:7-8; Salmo 10:7) para provar que "não há justo, nem um sequero" (3:10).

**Observação filológica:** A citação de Salmo 14 em Romanos 3:10-12 segue a Septuaginta, não o hebraico massorético. Isso mostra que Paulo pensava e escrevia em grego, usando a versão grega das Escrituras hebraicas como autoridade.

**Questão teológica crucial:** Se "não há justo" (3:10), como Paulo pode dizer em 2:13 que "não são os ouvintes da Torá que são justos diante de Deus, mas os cumpridores da Torá que serão justificados"? A resposta está em 3:21-26 — a justificação vem de outra fonte, não da obediência à Torá.
  `,
  grego: [
    { termo: 'ὀργὴ θεοῦ', transliteracao: 'orgḕ theoû', significado: 'Ira de Deus — não emoção divina mas juízo judicial. É o oposto de χάρις (graça). A ira é a resposta de Deus à injustiça humana.', Strong: 3709 },
    { termo: 'ἐκράτησαν', transliteracao: 'ekratēsan', significado: 'Suprimiram/Reteram — verbo de força. Paulo acusa a humanidade de ativamente reter o conhecimento de Deus, não de simplesmente não o ter.', Strong: 2722 },
    { termo: 'περιτομὴ καρδίας', transliteracao: 'peritomḕ kardías', significado: 'Circuncisão do coração — metáfora para obediência interior à aliança, não ritual externo. Fundamentada em Deuteronômio 10:16.', Strong: 4056 },
  ],
  citacoes: [
    {
      autor: 'Cranfield, I.E.B.',
      obra: 'A Critical and Exegetical Commentary on the Epistle to the Romans',
      ano: 1975,
      pagina: '133',
      volume: '1',
      editora: 'T&T Clark',
      local: 'Edinburgh',
      edicao: 'International Critical Commentary',
      citacao: 'O argumento de 1:18-3:20 não é meramente preliminar ao argumento positivo de 3:21 em diante. Ele estabelece a necessidade absoluta da justificação pela graça, mostrando que nenhuma alternativa é viável.',
    },
  ],
  perguntas: [
    'Como a teologia da revelação geral em 1:19-20 se compara com a epistemologia calvinista (sensus divinitatis)?',
    'O que significa a "ira de Deus" em 1:18? É emocional, judicial ou both?',
    'Por que Paulo cita a Septuaginta em vez do hebraico massorético em 3:10-12? O que isso implica sobre sua autoridade escriturística?',
    'Como resolver a aparente contradição entre 2:13 e 3:20?',
  ],
  bibliografia: [
    { autor: 'Cranfield, I.E.B.', obra: 'Romans 1-8', ano: 1975, editora: 'T&T Clark', local: 'Edinburgh', tipo: 'comentario', nivel: 'especializado' },
    { autor: 'Käsemann, Ernst', obra: 'Commentary on Romans', ano: 1980, editora: 'Fortress Press', local: 'Minneapolis', tipo: 'comentario', nivel: 'especializado' },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO 3: A JUSTIFICAÇÃO PELA FÉ (3:21-5:21)
// ═══════════════════════════════════════════════════════════════════════════

export const modulo3: SecaoAcademica = {
  titulo: '3. A Justificação pela Fé',
  subtitulo: 'Romanos 3:21-5:21 — O Coração Teológico da Carta',
  conteudo: `
## 3.1 A Revelação da Justiça de Deus (3:21-26)

### 3.1.1 A Tese Central (3:21-22)
"Mas agora, sem obra da Lei, se manifestou a justiça de Deus" (3:21). O marcador temporal νυνί (nyní — "agora") indica ruptura com o período anterior. A justificação é:
- **χωρὶς νόμου** (chōrìs nómou) — "sem Lei", não "contra a Lei"
- **μαρτυρουμένη** (marturouménē) — "testificada" pela Torá e os Profetas
- **διὰ πίστεως Ἰησοῦ Χριστοῦ** (dià pístews Iēsoû Christoû) — a frase mais debatida do NT

### 3.1.2 O Debate πίστις Χριστοῦ

**Interpretação Objetiva (fe em Cristo):** A maioria dos reformados (Lutero, Calvino, Moo, Schreiner) lê como "fé que temos em Cristo". Forças: coerência com a soteriologia paulina. Fraquezas: o genitivo grego usualmente denota fonte, não objeto.

**Interpretação Subjetiva (fidelidade de Cristo):** Wright, Hays, Dunn argumentam que é "a fidelidade/fiabilidade de Cristo". Forças: o genitivo possessivo/abstrato é mais natural em grego; coerência com a tradição judaica da aliança (berith). Fraquezas: pode minar o caráter pessoal da fé.

**Posição intermediária (Schreiner):** O contexto determina o significado. Em Romanos 3:22, o paralelismo com "em todo aquele que crê" sugere que ambas as leituras são válidas — a fé do crente é possível porque Cristo foi fiel.

### 3.1.3 A Redenção e a Propiciação (3:24-25)
- **ἀπολύτρωσις** (apolytrōsis) — redenção: metáfora de escravo comprando liberdade
- **ἱλαστήριον** (hilastḗrion) — propiciação/assento de misericórdia: refere-se ao propiciatório do Santuário (Hebreus 9:5), não ao conceito grego de apaziguamento

**Debate teológico:** A propiciação (Deus apaziguado por meio do sacrifício de Cristo) é criticada como "divinização da violência" (Joel B. Green, Theaton). A defesa reformada argumenta que a propiciação é substitutionária e voluntária, não coercitiva.

## 3.2 A Fé de Abraão como Paradigma (4:1-25)

Paulo usa Abraão como estudo de caso:
- Abraão não foi justificado por obras (4:2-3, citando Gênesis 15:6)
- A fé (πίστις) de Abraão precedeu a circuncisão (4:9-12)
- A promessa não dependeu da Lei (4:13-15)

**Observação exegética crucial:** O verbo ἐλογίσθη (elogísthē) em 4:3 é no tempo aoristo indicativo passivo — "foi considerado/creditado". Paulo não diz que Abraão "tornou-se justo" mas que sua fé "foi creditada como justiça". A justificação é declaration, não transformation.

## 3.3 A Paz com Deus e o Amor de Deus (5:1-11)

5:1-2: Três benefícios da justificação:
1. **Εἰρήνην** (eirḗnēn) — paz com Deus (não "paz de Deus" que é filipenses 4:7)
2. **Προσαγωγήν** (prosagōgḗn) — acesso (metáfora de entrar na presença real)
3. **Ἐλπίδα τῆς δόξης** (elpída tês dóxes) — esperança da glória

5:3-5: A progressão tripla: tribulação → perseverança → EXPERIÊNCIA → esperança. O termo δοκιμή (dokimē) em 5:4 é "prova aprovada", não mera "experiência".

## 3.4 O Adão e Cristo: Tipologia Dual (5:12-21)

Paulo contrapõe dois "representantes" da humanidade:

| | Adão | Cristo |
|---|------|--------|
| **Ato** | Desobediência | Obediência |
| **Consequência** | Morte | Vida |
| **Alcance** | Universal | Superabundante |
| **Reino** | Pecado | Graça |

**Questão exegética crucial:** Em 5:12, a cláusula ἐφ᾽ ᾧ πάντες ἥμαρτον (eph' hō pántes hēmarton) pode significar "em quem todos pecaram" (corpo a corpo com Adão) OU "pelo que todos pecaram" (causal). A primeira leitura suporta o pecado original; a segunda enfatiza a solidariedade humana no pecado.
  `,
  grego: [
    { termo: 'δικαιοσύνη θεοῦ', transliteracao: 'dikaiosýnē theoû', significado: 'Justiça de Deus — não qualidade moral de Deus, mas o veredicto pelo qual Deus declara justos os ímpios. É forensic, não transformative.', Strong: 1343 },
    { termo: 'ἱλαστήριον', transliteracao: 'hilastḗrion', significado: 'Propiciação/Assento de Misericórdia — o加盖 do Arca da Aliança. Não é Deus sendo apaziguado, mas Deus oferecendo o meio de reconciliação.', Strong: 2435 },
    { termo: 'ἐλογίσθη', transliteracao: 'elogísthē', significado: 'Foi creditada/considerado — termo contábil. A justiça de Abraão "entrou na conta" de Deus, não como mérito mas como confiança na promessa.', Strong: 3049 },
  ],
  citacoes: [
    {
      autor: 'Martin Luther',
      obra: 'Vorlesungen über den Römerbrief',
      ano: 1515,
      editora: 'Edição Crítica',
      local: 'Weimar',
      citacao: 'A justiça de Deus é aquela pela qual o justo vive pela fé, e ela é passive, não active... O homem não é justo por suas obras, mas pela fé em Cristo.',
    },
    {
      autor: 'John Calvin',
      obra: 'Institutes of the Christian Religion',
      ano: 1559,
      pagina: '745',
      volume: 'III',
      editora: 'Westminster',
      local: 'Philadelphia',
      tradutor: 'Ford Lewis Battles',
      edicao: 'Ed. John T. McNeill, 1960',
      citacao: 'A justificação é a aceitação pela qual Deus nos recebe em graça, e nos considera justos diante de si, contando-nos a justiça de Cristo como nossa.',
    },
    {
      autor: 'N.T. Wright',
      obra: 'Justification: God\'s Plan & Paul\'s Vision',
      ano: 2009,
      pagina: '109',
      editora: 'IVP Academic',
      local: 'Downers Grove',
      citacao: 'A justificação é o veredicto do juízo final antecipado, declarando que o crente pertence ao povo da aliança de Deus.',
    },
  ],
  perguntas: [
    'Como a interpretação do genitivo πίστις Χριστοῦ afeta toda a soteriologia paulina?',
    'Compare a justificação forense (Lutero/Calvino) com a justificação como veredicto final (Wright). Qual é mais fiel ao contexto de Romanos?',
    'O que significa a tipologia Adão-Cristo para a antropologia teológica?',
    'Como Romanos 5:12 se relaciona com o conceito de "pecado original" (Augustino vs. Pelágio vs. Wesley)?',
  ],
  bibliografia: [
    { autor: 'Moo, Douglas J.', obra: 'The Epistle to the Romans', ano: 1996, editora: 'Eerdmans', local: 'Grand Rapids', tipo: 'comentario', nivel: 'avancado' },
    { autor: 'Wright, N.T.', obra: 'Justification', ano: 2009, editora: 'IVP Academic', local: 'Downers Grove', tipo: 'teologia', nivel: 'especializado' },
    { autor: 'Hays, Richard B.', obra: 'The Faith of Jesus Christ', ano: 2002, editora: 'Eerdmans', local: 'Grand Rapids', tipo: 'monografia', nivel: 'especializado' },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTAÇÃO DO MÓDULO COMPLETO
// ═══════════════════════════════════════════════════════════════════════════

export interface CursoRomeros {
  id: string;
  titulo: string;
  descricao: string;
  nivel: 'seminario' | 'pos-graduacao';
  duracao: string;
  instrutor: string;
  prerequisitos: string[];
  objetivos: { nivel: string; descricao: string }[];
  modulos: SecaoAcademica[];
  bibliografiaGeral: ReferenciaBibliografica[];
}

export const cursoRomerosAcademico: CursoRomeros = {
  id: 'romanos-academico',
  titulo: 'Romanos: A Teologia da Cruz — Estudo Acadêmico',
  descricao: 'Exegese avançada da carta aos Romanos com análise gramatical grega, desenvolvimento histórico-doutrinário, múltiplas perspectivas teológicas e bibliografia acadêmica completa.',
  nivel: 'pos-graduacao',
  duracao: '16 semanas',
  instrutor: 'Prof. Dr. Sola Scriptura',
  prerequisitos: [
    'Grego koiné intermediário (leitura de NT em grego)',
    'Noções de hermenêutica e exegese',
    'Conhecimento básico de teologia sistemática',
  ],
  objetivos: [
    { nivel: 'Analisar', descricao: 'Analisar a estrutura retórica e o argumento teológico de Romanos com rigor exegético' },
    { nivel: 'Avaliar', descricao: 'Avaliar criticamente as principais perspectivas teológicas sobre justificação, eleição e ética paulina' },
    { nivel: 'Citar', descricao: 'Citar fontes primárias e secundárias com precisão acadêmica (ABNT/Apa)' },
    { nivel: 'Traduzir', descricao: 'Traduzir passagens-chave do grego com apparatus crítico básico' },
  ],
  modulos: [modulo1, modulo2, modulo3],
  bibliografiaGeral: [
    { autor: 'Moo, Douglas J.', obra: 'The Epistle to the Romans', ano: 1996, editora: 'Eerdmans', local: 'Grand Rapids', tipo: 'comentario', nivel: 'avancado' },
    { autor: 'Dunn, James D.G.', obra: 'Romans 1-8', ano: 1988, editora: 'Word Books', local: 'Waco', tipo: 'comentario', nivel: 'avancado' },
    { autor: 'Schreiner, Thomas R.', obra: 'Romans', ano: 1998, editora: 'Baker Academic', local: 'Grand Rapids', tipo: 'comentario', nivel: 'avancado' },
    { autor: 'Wright, N.T.', obra: 'The Climax of the Covenant', ano: 1992, editora: 'Fortress Press', local: 'Minneapolis', tipo: 'teologia', nivel: 'especializado' },
    { autor: 'Käsemann, Ernst', obra: 'Commentary on Romans', ano: 1980, editora: 'Fortress Press', local: 'Minneapolis', tipo: 'comentario', nivel: 'especializado' },
    { autor: 'Fitzmyer, Joseph A.', obra: 'Romans', ano: 1993, editora: 'Doubleday', local: 'New York', tipo: 'comentario', nivel: 'especializado' },
    { autor: 'Stowers, Stanley K.', obra: 'A Rereading of Romans', ano: 1994, editora: 'Yale University Press', local: 'New Haven', tipo: 'monografia', nivel: 'especializado' },
    { autor: 'Hays, Richard B.', obra: 'The Faith of Jesus Christ', ano: 2002, editora: 'Eerdmans', local: 'Grand Rapids', tipo: 'monografia', nivel: 'especializado' },
    { autor: 'Cranfield, I.E.B.', obra: 'Romans ICC (2 vols.)', ano: 1975, editora: 'T&T Clark', local: 'Edinburgh', tipo: 'comentario', nivel: 'especializado' },
    { autor: 'Barrett, Charles K.', obra: 'The Epistle to the Romans', ano: 1991, editora: 'Continuum', local: 'London', tipo: 'comentario', nivel: 'avancado' },
  ],
};
