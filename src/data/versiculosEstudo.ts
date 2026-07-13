export interface VersicoEstudo {
  livro: string;
  capitulo: number;
  versiculo: number;
  titulo: string;
  contextoHistorico: string;
  contextoLiterario: string;
  significadoTeologico: string;
  aplicações: string[];
  perguntasEstudo: string[];
  versiculosConexoes: string[];
}

function chaveVS(livro: string, cap: number, v: number): string {
  return `${livro}:${cap}:${v}`;
}

const versiculosEstudo: Record<string, VersicoEstudo> = {};

function addVS(
  livro: string, cap: number, v: number,
  titulo: string, contextoHistorico: string,
  contextoLiterario: string, significadoTeologico: string,
  aplicações: string[], perguntasEstudo: string[],
  versiculosConexoes: string[]
) {
  const k = chaveVS(livro, cap, v);
  versiculosEstudo[k] = {
    livro, capitulo: cap, versiculo: v, titulo,
    contextoHistorico, contextoLiterario, significadoTeologico,
    aplicações, perguntasEstudo, versiculosConexoes
  };
}


// ====================================================================
// PENTATEUCO
// ====================================================================

addVS('gn', 1, 1, 'Criação dos Céus e da Terra',
  'Texto escrito no deserto do Sinai, tradição sacerdotal. Contexto polêmico contra mitos criacionistas do Antigo Oriente Próximo (Enuma Elish, Atrahasis).',
  'Abertura da Torá. Forma literária: narrativa史诗 épica com estrutura cadenciada ("E disse Deus... e foi assim"). Proclama monoteísmo absoluto.',
  'Fundamento de toda a cosmovisão bíblica. Deus como Criador soberano, distinto da criação (não panteísmo). Base para o monoteísmo, a dignidade humana e a responsabilidade ambiental.',
  ['Reconhecer a soberania de Deus sobre toda a criação', 'Cultivar responsabilidade ambiental como mordomos', 'Resistir a cosmovisões materialistas ou naturalistas'],
  ['Como o monoteísmo do Gênesis se diferencia dos mitos politeístas?', 'Que implicações a criação ex nihilo tem para nossa visão de mundo?', 'Como a dignidade humana está enraizada na criação à imagem de Deus?'],
  ['Jn 1:1-3', 'Cl 1:16', 'Hb 11:3', 'Sl 33:6-9']
);

addVS('gn', 1, 26, 'Imagem de Deus na Humanidade',
  'Contexto do Antigo Oriente: reis eram chamados "imagem de um deus". Aqui, TODOS os humanos são imagem de Deus, não apenas governantes.',
  'Culminação da obra criadora. O ser humano é a "coroa" da criação. Termos hebraicos (tselem/demut) indicam representação e semelhança moral.',
  'Fundamento da dignidade humana inalienável. Imagem inclui racionalidade, moralidade, relacionamento e domínio. Afeta ética, política, aborto, eutanásia, direitos humanos.',
  ['Tratar todo ser humano com dignidade', 'Rejeitar práticas que desumanizam', 'Exercer domínio responsável sobre a criação'],
  ['O que significa ser "imagem de Deus" na prática?', 'Como essa doutrina afeta nossa visão sobre direitos humanos?', 'De que maneira o pecado afeta a imagem de Deus?'],
  ['1 Co 11:7', 'Tg 3:9', 'Cl 3:10', 'Sl 8:4-8']
);

addVS('gn', 3, 15, 'O Proto-evangelium',
  'No contexto da queda, Deus faz a primeira promessa de redenção. Língua hebraica indica hostilidade contínua entre a semente da mulher e a serpente.',
  'Diálogo de sentença (tipo judicial divino). O primeiro "Evangelho" na Escritura. Estrutura de promessa e cumprimento.',
  'Base da história da redenção: Deus inicia o plano de salvação mesmo após a rebelião. Tipologia cristológica: a semente vence a serpente. Fundamento da escatologia bíblica.',
  ['Confiar que Deus tem um plano de redenção', 'Reconhecer a realidade da guerra espiritual', 'Esperar a vitória final de Cristo sobre o mal'],
  ['Como essa promessa se conecta com toda a história da salvação?', 'Quem é a "semente da mulher"?', 'Como o Apocalipse cumpre esta profecia?'],
  ['Rm 16:20', 'Gl 3:16', '1 Jo 3:8', 'Ap 12:9']
);

addVS('gn', 12, 1, 'O Chamado de Abraão',
  'Abram é chamado de Ur dos Caldeus (Mesopotâmia), centro de politeísmo. O chamado é radical: deixar terra, parentes e casa.',
  'Início da história da aliança. Forma de promessa solene. O chamado é incondicional em sua base, mas exige resposta de fé.',
  'Base da eleição divina. Deus escolhe um povo para ser canal de bênção para todas as nações. A eleição não é privilégio, mas responsabilidade missionária.',
  ['Disponibilidade para Deus', 'Priorizar a chamado de Deus sobre acomodações', 'Ser bênção para os outros'],
  ['O que significa "deixar a terra" hoje?', 'Como o chamado de Abraão se relaciona com a missão cristã?', 'Que sacrifícios Deus pode estar pedindo?'],
  ['Gl 3:8-9', 'Hb 11:8-10', 'Rm 4:3-5', 'At 7:2-4']
);

addVS('gn', 15, 6, 'Abraão Crê e É Justificado',
  'Contexto de aliança antiga (rito de cortar animais). Abram teme, mas Deus faz um juramento sozinho. A fé de Abram é contar com a promessa.',
  'Versículo narrativo fundamental. Palavra hebraica "heemin" (acreditou) é rara no AT. Referência mais citada no NT sobre justificação.',
  'Versículo central da teologia da justificação pela fé. Paulo o usa em Romanos e Gálatas. A fé é confiança ativa na promessa, não mero assentimento intelectual.',
  ['Exercer fé como confiança ativa', 'Descansar na promessa de Deus', 'Entender que a fé é dom e resposta humana'],
  ['Como Abraão "crer" se manifestou em sua vida?', 'Qual a diferença entre fé intelectual e fé salvadora?', 'Como isso se conecta com a justificação pela fé?'],
  ['Rm 4:3-5', 'Gl 3:6-9', 'Tg 2:23', 'Hb 11:8-19']
);

addVS('gn', 22, 1, 'O Sacrifício de Isaque',
  'Contexto cultural: sacrifício humano era praticado no Antigo Oriente. Deus proíbe em outros textos (Dt 12:31), mas testa a fé de Abraão.',
  'Narrativa de prova (test narrative). Clímax dramático. Terminologia de "oferta queimada" (olah) aparece pela primeira vez.',
  'Prefiguração do sacrifício de Cristo. Tipo do Pai que dá o Filho unigênito. Revela a fé que obedece mesmo quando não compreende. Fundamento da teologia da substituição.',
  ['Obedecer a Deus mesmo sem entender', 'Confiar que Deus proverá', 'Reconhecer o custo da fé genuína'],
  ['Como Deus pode pedir algo que contradiz Sua própria vontade?', 'Que semelhanças existem entre Isaque e Cristo?', 'Como a provação da fé nos fortalece?'],
  ['Hb 11:17-19', 'Tg 2:21-23', 'Jo 3:16', 'Rm 8:32']
);

// ÊXODO
addVS('ex', 3, 14, 'A Revelação do Nome Divino',
  'Contexto: Moisés diante da sarça ardente no Monte Horeb. O nome "YHWH" (EU SOU) já era conhecido (Gn 4:26), mas aqui é revelado em plenitude.',
  'Epifania divina. Forma de teofania. O nome revela autoexistência, eternidade e fidelidade à aliança.',
  'Fundamento do monoteísmo bíblico. Deus é autoexistente, imutável e fiel. Conexão cristológica: Jesus usa "Eu Sou" no Evangelho de João.',
  ['Reverenciar o nome de Deus', 'Confiar na autoexistência e soberania de Deus', 'Usar o nome de Deus com respeito'],
  ['O que o nome "Eu Sou" revela sobre o caráter de Deus?', 'Como Jesus se identifica com este nome?', 'Por que o nome de Deus é sagrado?'],
  ['Jo 8:58', 'Ap 1:8', 'Is 43:10', 'Ex 6:2-3']
);

addVS('ex', 20, 1, 'Os Dez Mandamentos',
  'Contexto do Monte Sinai. Aliança vassala entre Deus e Israel. Os mandamentos são termos da aliança.',
  'Forma de código de lei antigo. Estrutura em duas tábuas: quatro mandamentos (relação com Deus) e seis (relação com o próximo).',
  'Revelação da lei moral de Deus. A lei mostra o caráter santo de Deus e a necessidade humana de redenção. Não é meio de salvação, mas expressão da aliança.',
  ['Buscar obediência que nasce do amor', 'Reconhecer a necessidade de um Salvador', 'Aplicar os mandamentos como guia de vida'],
  ['Como a lei se relaciona com a graça?', 'Por que os mandamentos ainda são relevantes?', 'Como Cristo cumpre a lei?'],
  ['Mt 22:37-40', 'Rm 7:7-12', 'Gl 3:24', 'Rm 10:4']
);


// ====================================================================
// HISTÓRICOS
// ====================================================================

addVS('js', 1, 9, 'Coragem e Presença de Deus',
  'Josué assume a liderança após a morte de Moisés. O povo está diante do Jordão e das cidades fortificadas de Canaã.',
  'Forma de comissão real (tipo de investidura). Repeteção da promessa "não te deixarei nem te desampararei".',
  'A presença de Deus é a fonte da coragem. A promessa se cumpre em Cristo (Mt 28:20). A obediência é condicionada à presença divina.',
  ['Enfrentar desafios com coragem', 'Lembrar que Deus está conosco', 'Obedecer às instruções divinas'],
  ['Como a presença de Deus nos dá coragem?', 'Que "terras" Deus está nos chamando para conquistar?', 'Como a promessa se cumpre em Cristo?'],
  ['Hb 13:5', 'Mt 28:20', 'Dt 31:6', 'Js 1:6-7']
);

addVS('1sm', 16, 7, 'Deus Vê o Coração',
  'Contexto: unção de Davi como rei. Samuel esperava que o mais alto fosse o escolhido. Deus corrige o critério humano.',
  'Narrativa de contraste. O critério divino se opõe ao critério humano de avaliação.',
  'Deus avalia pelo critério interno (coração), não externo (aparência). Fundamento da cristologia (Cristo como o Coração de Deus para o mundo) e da ética cristã.',
  ['Julgar pelo caráter, não pela aparência', 'Cultivar o coração diante de Deus', 'Humilhar-se perante o critério divino'],
  ['Como Deus avalia o que os homens não veem?', 'Que correlação existe entre exterior e interior?', 'Como isso afeta nossa visão de liderança?'],
  ['1 Co 1:27-29', 'Sl 139:1-4', '1 Sm 10:22-23', 'Rm 2:28-29']
);

addVS('2sm', 7, 12, 'A Aliança Davídica Eterna',
  'Contexto: Davi quer construir um templo para Deus. Profeta Natã revela que Deus construirá uma "casa" (dinastia) para Davi.',
  'Forma de aliança régia. Promessa messiânica com cumplimento progressivo: Salomão → linhagem → Cristo.',
  'Fundamento da cristologia messiânica. O Filho de Davi terá trono eterno. Paulo e Lucas rastreiam Jesus até Davi. Cumprimento escatológico no reino de Cristo.',
  ['Confiar nos planos eternos de Deus', 'Entender que Deus transforma nossos projetos', 'Esperar o cumprimento das promessas messiânicas'],
  ['Como esta profecia se cumpre em Cristo?', 'O que significa "reino eterno" na perspectiva cristã?', 'Como isso afeta nossa esperança?'],
  ['Lc 1:32-33', 'At 2:29-32', 'Sl 89:3-4', 'Is 11:1-10']
);


// ====================================================================
// POÉTICOS
// ====================================================================

addVS('sl', 2, 7, 'O Messias Filho de Deus',
  'Salmo de coroação régia. No contexto original, o rei de Israel é "filho" de Deus por aliança. Aplicação messiânica.',
  'Forma de salmo real (royal psalm). Estrutura: rebelião das nações → riso divino → decreto → filiação → posse das nações.',
  'Interpretação cristã: o Filho é o Messias eterno. Citado em Hb 1:5 e At 13:33 como referência à ressurreição. Base da filiação divina de Cristo.',
  ['Reconhecer a soberania de Cristo sobre as nações', 'Adorar o Filho como Senhor', 'Viver sob a autoridade do Messias'],
  ['Como este salmo se aplica a Cristo?', 'O que significa "Tu és Meu Filho" na ressurreição?', 'Como as nações devem responder ao Filho?'],
  ['Hb 1:5', 'At 13:33', 'Sl 110:1', '2 Sm 7:14']
);

addVS('sl', 22, 1, 'Deus Meu, Por Que Me Desamparaste?',
  'Salmo de lamentação pessoal. Originalmente de Davi, mas com detalhes que se encaixam perfeitamente na crucificação.',
  'Forma de lamentação. Grito de abandono → confiança → louvor final. Os detalhes (ossos expostos, língua, dividir vestes) são notáveis.',
  'Profecia messiânica da crucificação. Jesus cita o versículo na cruz (Mt 27:46). A experiência de abandono de Jesus é real, não simulada. Fundamento da substituição vicária.',
  ['Compreender que Jesus experimentou o abandono por nós', 'Confiar mesmo quando Deus parece distante', 'Lembrar que o sofrimento tem propósito'],
  ['Por que Jesus sentiu abandono se era Deus?', 'Como este salmo nos conforta no sofrimento?', 'Que paralelos existem entre o salmo e a crucificação?'],
  ['Mt 27:35', 'Mt 27:46', 'Mc 15:24', 'Jo 19:24']
);

addVS('sl', 23, 1, 'O Senhor É o Meu Pastor',
  'Salmo de Davi, que conhecia o trabalho de pastor. Contexto pastoral: Israel como rebanho de Deus.',
  'Forma de salmo de confiança. Metáfora pastoral: pastor → provisão, proteção, orientação, disciplina, presença.',
  'Revela o cuidado pessoal de Deus. Imagem pastoral é aplicada a Cristo (Jo 10). O "vale da sombra da morte" não é evitado, mas enfrentado com a presença divina.',
  ['Confiar no cuidado pessoal de Deus', 'Descansar na provisão divina', 'Perseverar mesmo nos vales'],
  ['Que significa "O Senhor é MEU pastor" (possessivo)?', 'Como Deus nos guia "por veredas de justiça"?', 'O que o "vale da sombra" representa na vida cristã?'],
  ['Jo 10:11-14', '1 P 2:25', 'Is 40:11', 'Lc 15:3-7']
);

addVS('sl', 119, 105, 'A Palavra como Guia',
  'Parte do maior salmo da Escritura (22 versículos, cada um começando com letra do alfabeto hebraico).',
  'Acrostiche. O versículo é o "lema" do salmo. A Palavra é guia (lâmpada) e caminho (senda).',
  'Suficiência e autoridade da Escritura. A Bíblia ilumina a escuridão do pecado e guia os passos. Fundamento do Sola Scriptura.',
  ['Ler a Bíblia diariamente', 'Deixar a Escritura guiar decisões', 'Valorizar a Palavra acima da tradição humana'],
  ['Como a Bíblia é "lâmpada" para nossos pés?', 'Que decisão específica Deus pode estar guiando pela Sua Palavra?', 'Por que a Escritura é suficiente para guiar?'],
  ['2 Tm 3:16-17', '2 P 1:19-21', 'Sl 19:7-11', 'Sl 12:6']
);

addVS('ec', 12, 13, 'O Fim de Toda a Instrução',
  'Conclusão do Eclesiastes. Após explorar vaidade, prazeres e sabedoria, o autor chega ao ponto final.',
  'Forma de conclusão sapiencial. Contraste com tudo o que foi dito antes. Fórmula solene de encerramento.',
  'Temor a Deus e obediência são o objetivo da vida. A vaidade (hebel) é superada pela relação com o Criador. Fundamento da ética cristã.',
  ['Viver com eternidade em mente', 'Priorizar a relação com Deus', 'Reconhecer que Deus julgará todas as coisas'],
  ['O que significa "temer a Deus" na prática?', 'Como a eternidade dá significado ao presente?', 'Que relação existe entre obediência e alegria?'],
  ['Dt 10:12', 'Jó 28:28', 'Pr 1:7', 'Mt 10:28']
);


// ====================================================================
// PROFETAS
// ====================================================================

addVS('is', 7, 14, 'A Profecia de Immanuel',
  'Contexto: crise política com Rezim e Peká. Profecia a Acaz: sinal da vitória de Judá. Mateus aplica a Cristo.',
  'Dupla referência: cumprimento imediato (nascimento histórico) e cumprimento escatológico (virgem conceberá).',
  'Profecia messiânica do nascimento virginal. Mateus 1:23 cita explicitamente. O nome "Deus Conosco" é a essência da encarnação.',
  ['Adorar a Deus que está conosco', 'Reconhecer que Deus se manifesta na história', 'Esperar a presença de Deus em todas as circunstâncias'],
  ['Como o nascimento virginal confirma a divindade de Cristo?', 'O que "Deus Conosco" significa para nós hoje?', 'Como Mateus aplica esta profecia?'],
  ['Mt 1:22-23', 'Lc 1:26-35', 'Is 9:6', 'Mc 12:29']
);

addVS('is', 9, 6, 'Um Menino Nos Nasceu',
  'Contexto messiânico. Isaías projeta futuro ideal para a linhagem davídica. Títulos reais e divinos combinados.',
  'Forma de oráculo messiânico. Títulos acumulativos: Conselheiro, Deus Forte, Pai Eterno, Príncipe da Paz.',
  'Cristologia alta no AT. O Messias é humano (nasceu) e divino (Deus Forte, Pai Eterno). Fundamento da dupla natureza de Cristo.',
  ['Reconhecer a divindade de Cristo', 'Descansar sob o governo do Príncipe da Paz', 'Esperar o governo sem fim de Cristo'],
  ['Como um "menino" pode ser "Deus Forte"?', 'O que "Pai Eterno" significa no contexto messiânico?', 'Como a paz de Cristo se manifesta no mundo?'],
  ['Lc 1:32-33', 'Lc 2:11', 'Jo 1:1-3', 'Ap 19:16']
);

addVS('is', 53, 5, 'Pelas Suas Chagas Sararemos',
  'O clímax do quarto Servo Sofredor. Isaías descreve um sofrimento substitutivo que traz cura.',
  'Forma de poema profético. Paralelismo hebraico perfeito. Detalhes precisos da crucificação (séculos antes).',
  'O texto mais citado no NT sobre a expiação. Substituição vicária: Ele sofre por nós. Base da teologia da satisfação. Curado pelas chagas = restauração integral.',
  ['Adorar a Cristo pelo sacrifício substitutivo', 'Reconhecer que a cura vem pela cruz', 'Viver gratidão pela obra redentora'],
  ['Como o sofrimento de um pode curar a muitos?', 'O que "chagas" representa na teologia cristã?', 'Por que é necessário sofrimento para a cura?'],
  ['1 P 2:24-25', '2 Co 5:21', 'Rm 4:25', 'Hb 9:28']
);

addVS('jr', 31, 31, 'A Nova Aliança',
  'Contexto: exílio babilônico. A aliança mosaica falhou porque o povo não obedeceu. Deus promete uma aliança interna.',
  'Forma de oráculo de aliança. Contraste com a aliança anterior. Três promessas: lei no coração, perdão completo, conhecimento direto.',
  'Fundamento da teologia do Novo Testamento. Jesus institui a Ceia como "nova aliança" (Lc 22:20). O Espírito escreve a lei no coração (Ef 2:16).',
  ['Buscar a transformação interior', 'Depend do Espírito para obediência', 'Confiar no perdão completo de Deus'],
  ['Como a nova aliança é diferente da antiga?', 'O que significa "lei no coração"?', 'Como Cristo institui a nova aliança?'],
  ['Lc 22:20', '2 Co 3:6', 'Hb 8:6-13', 'Rm 8:3-4']
);


// ====================================================================
// EVANGELHOS
// ====================================================================

addVS('mt', 5, 1, 'As Beatitudes',
  'Jesus no Monte,类似于Moisés no Sinai. Contexto: contraste com o pharisaísmo legalista. Discurso inaugural do reino.',
  'Forma de discurso (um dos cinco discursos de Mateus). Estrutura beatitudinal: bem-aventurança → razão → promessa.',
  'Constituição do reino de Deus. Valores invertidos: os pobres, mansos e perseguidos são bem-aventurados. Fundamento da ética cristã.',
  ['Viver as atitudes do reino', 'Reconhecer dependência de Deus', 'Buscar justiça com mansidão'],
  ['Por que "pobres de espírito" são bem-aventurados?', 'As beatitudes são requisitos ou descrições?', 'Como viver as beatitudes no mundo atual?'],
  ['Lc 6:20-26', 'Is 61:1-2', 'Mt 11:28-30', 'Js 1:2']
);

addVS('mt', 16, 16, 'Tu és o Cristo',
  'Contexto: região de Cesareia de Filipe. Pedro faz a confissão messiânica mais completa.',
  'Clímax revelatório. A pergunta de Jesus ("Quem dizem os homens que sou?") culmina na confissão pessoal.',
  'Revelação divina (não descoberta humana). Pedro recebe o "poder das chaves" (v.19). Fundamento da eclesiologia.',
  ['Confessar Cristo publicamente', 'Reconhecer que a fé é revelação divina', 'Viver sob a autoridade de Cristo'],
  ['Como Pedro soube isso sem ter sido ensinado?', 'O que significam as "chaves do reino"?', 'Como a confissão de Pedro é modelos para nós?'],
  ['Mc 8:29', 'Jo 6:68-69', 'Mt 11:25-27', '1 Co 12:3']
);

addVS('mt', 28, 18, 'A Grande Comissão',
  'Contexto pós-ressurreição. Montanha na Galileia (lugar de revelação). Autoridade cósmica declarada.',
  'Forma de comissão missionária. Imperativos: ide, fazei discípulos, batizando, ensinando. Promessa de presença.',
  'Base da missão cristã. Autoridade universal → missão universal. Fórmula trinitária de batismo. Presença perpetua de Cristo.',
  ['Participar ativamente da missão cristã', 'Ensinar e discipular outras pessoas', 'Confiar na presença de Cristo na missão'],
  ['O que significa "toda autoridade"?', 'Que implicações a Grande Comissão tem para a vida cotidiana?', 'Como a presença de Cristo nos capacita?'],
  ['Mc 16:15-18', 'Lc 24:46-49', 'At 1:8', 'Rm 10:14-15']
);

addVS('jo', 1, 1, 'No Princípio Era o Verbo',
  'Contexto: João ecoa Gn 1:1. Termo grego "Logos" era conhecido tanto no judaísmo (Filão) quanto no helenismo (estoicismo).',
  'Prólogo joanino. Forma de hino cristológico. Três declarações sobre o Verbo: preexistência, criação, revelação.',
  'Cristologia alta. O Verbo é pré-existente, divino e criador. Base da doutrina trinitária. Identificação do Verbo com Jesus (v.14).',
  ['Adorar a Cristo como Deus eterno', 'Reconhecer que toda verdade vem de Cristo', 'Viver em relação com o Verbo encarnado'],
  ['O que o termo "Logos" comunica a diferentes públicos?', 'Como o Prólogo de João se conecta com o Gênesis?', 'O que a preexistência de Cristo significa para nós?'],
  ['Cl 1:15-17', 'Hb 1:1-3', '1 Jo 1:1-2', 'Gn 1:1']
);

addVS('jo', 3, 16, 'Porque Deus Amou o Mundo',
  'Contexto: Jesus ensina a Nicodemos, fariseu e mestre de Israel. Noite (simbolismo joanino de trevas).',
  'Forma de declaração teológica condensada. Cada frase é carregada de significado: amor, dádiva, consequências, fé, vida.',
  'Resumo do evangelho. Causa (amor), meio (Filho), resultado (vida eterna), condição (fé), negação (condenação).',
  ['Receber o amor de Deus', 'Crer no Filho unigênito', 'Compartilhar o evangelho com outros'],
  ['O que o amor de Deus "assim" significa na prática?', 'Que tipo de fé salva?', 'Como equilibrar graça e responsabilidade?'],
  ['Rm 5:8', '1 Jo 4:9-10', 'Ef 2:4-5', 'Rm 6:23']
);

addVS('jo', 8, 58, 'Antes que Abraão Existisse, Eu Sou',
  'Contexto: discussão com fariseus sobre a autoridade de Jesus. Ele assume o nome divino "Eu Sou" (YHWH).',
  'Declaração cristológica suprema. "Antes que Abraão existisse, EU SOU" — verbo no presente indicando eternidade.',
  'Jesus se identifica com Deus (YHWH). A reação dos judeus (apedrejamento) confirma que entenderam como blasfêmia. Base da divindade de Cristo.',
  ['Adorar a Cristo como Deus eterno', 'Reconhecer que Jesus não é apenas um profeta', 'Viver sob a autoridade do "Eu Sou"'],
  ['Por que os judeus quiseram apedrejá-Lo?', 'Como "EU SOU" se conecta com Êxodo 3:14?', 'Que implicações a eternidade de Cristo tem para nossa fé?'],
  ['Ex 3:14', 'Jo 1:1-3', 'Fp 2:6', 'Cl 1:17']
);

addVS('jo', 14, 6, 'Caminho, Verdade e Vida',
  'Contexto: Última Ceia. Jesus prepara os discípulos para Sua partida. Tomás pergunta pelo caminho.',
  'Declaração exclusivista em forma de三重 identidade. Cada termo é uma afirmação sobre Cristo: único caminho, verdade absoluta, fonte de vida.',
  'Exclusividade cristológica. Não há múltiplos caminhos. Cristo é o caminho (mediação), a verdade (revelação) e a vida (redenção).',
  ['Seguir a Cristo como único caminho', 'Viver na verdade de Cristo', 'Receber a vida eterna somente nEle'],
  ['Como Cristo pode ser o "único" caminho?', 'Que diferença Cristo faz entre verdade e mentira?', 'O que "vida" significa aqui?'],
  ['At 4:12', '1 Tm 2:5', 'Hb 10:19-20', 'Jo 10:9']
);

addVS('jo', 19, 30, 'Está Consumado',
  'Contexto: última palavra de Jesus na cruz. Termo grego "tetelestai" = "está pago integralmente".',
  'Clímax da paixão. Forma de declaração triunfante, não de derrota. O verbo está no perfeito: ação completa com resultados permanentes.',
  'Obra da redenção completa. A expiação é suficiente e eficaz. Nada pode ser acrescentado ao que Cristo fez. Fundamento do Sola Christo.',
  ['Descansar na obra acabada de Cristo', 'Não tentar acrescentar méritos', 'Viver gratidão pela redenção completa'],
  ['O que "consumado" significa na perspectiva de Cristo?', 'Como isso afeta nossa segurança na salvação?', 'Por que "pago integralmente" é mais preciso?'],
  ['Hb 9:12', 'Hb 10:10-14', 'Rm 5:8-9', 'Ef 1:7']
);


// ====================================================================
// ATOS
// ====================================================================

addVS('at', 2, 38, 'Arrependei-Vos e Sede Batizados',
  'Contexto: dia de Pentecostes. Pedro prega após o derramamento do Espírito. 3.000 convertem-se.',
  'Forma de convite missionário. Três elementos: arrependimento, batismo, promessa do Espírito.',
  'Relação entre arrependimento, batismo e Espírito. O batismo é sinal, não causa da salvação. A promessa é para todos (inclusividade).',
  ['Arrependimento genuíno é mudança de mente e vida', 'Batismo como sinal público de fé', 'Receber a promessa do Espírito'],
  ['O batismo salva ou é sinal?', 'O que o arrependimento inclui na prática?', 'Como receber a promessa do Espírito?'],
  ['Mc 16:16', 'Rm 6:3-4', 'At 1:8', 'Ef 2:8-9']
);

addVS('at', 4, 12, 'Em Nenhum Outro Há Salvação',
  'Contexto: Pedro e João diante do Sinhedrogo. Após curar o coxo, são interrogados.',
  'Declaração exclusivista em contexto de perseguição. Nome de Jesus como autoridade.',
  'Exclusividade cristológica absoluta. Não há plano B. Fundamento do evangelismo e da tolerância cristã (respeito sem compromisso).',
  ['Proclamar Cristo como único Salvador', 'Ser corajosos sob pressão', 'Amar os que nos perseguem sem ceder na verdade'],
  ['Como conciliar exclusivismo com amor ao próximo?', 'O que fazer quando o mundo pressiona para relativizar?', 'Por que o nome de Jesus é o único?'],
  ['Jo 14:6', '1 Tm 2:5', 'Hb 10:19-23', 'Mt 28:18-20']
);


// ====================================================================
// ROMANOS
// ====================================================================

addVS('rm', 3, 23, 'Todos Pecaram',
  'Contexto: Paulo constrói o argumento da pecaminosidade universal antes de introduzir a justificação.',
  'Culmina o diagnóstico da pecaminosidade (Rm 1:18-3:20). Termo "hamartia" = errar o alvo.',
  'Diagnóstico universal: todos, sem exceção, falharam. Base da igualdade humana perante Deus. Preparação para a solução (graça).',
  ['Reconhecer a própria pecaminosidade', 'Não se comparar com outros', 'Buscar a solução em Cristo, não em obras'],
  ['O que significa "pecado" na perspectiva bíblica?', 'Por que o reconhecimento do pecado é necessário?', 'Como isso prepara para a graça?'],
  ['Rm 3:10-12', 'Rm 3:21-26', 'Ef 2:1-3', '1 Jo 1:8-10']
);

addVS('rm', 6, 23, 'O Salário do Pecado é a Morte',
  'Contexto: contraste entre escravidão ao pecado e escravidão à justiça.',
  'Estrutura de contraste: salário (morte) vs. dádiva (vida eterna). Termo "antisthia" = contraste.',
  'Justiça retributiva: o pecado merece morte. Graça gratuita: a vida eterna é dádiva, não salário. Equilíbrio entre justiça e misericórdia.',
  ['Levar a sério o pecado', 'Receber a dádiva com gratidão', 'Viver como morto para o pecado'],
  ['Por que a morte é o "salário" do pecado?', 'Que tipo de vida eterna é oferecida?', 'Como a graça gratuita se relaciona com a justiça?'],
  ['Rm 5:12-21', 'Rm 6:1-11', 'Gl 6:7-8', 'Tg 1:15']
);

addVS('rm', 8, 1, 'Nenhuma Condenação',
  'Contexto: após discutir a luta contra o pecado (cap. 7), Paulo proclama a liberdade.',
  'Declaração absoluta: "nenhuma condenação" (krima). Não "nenhuma acusação" (outra coisa).',
  'Libertação legal da condenação. A justificação é um veredicto divino. Segurança do crente em Cristo.',
  ['Viver livres da culpa', 'Não permitir que Satanás acuse', 'Segurança na identidade em Cristo'],
  ['Como conciliar "nenhuma condenação" com a santificação?', 'O que isso significa para o crente que peca?', 'Como viver sem culpa?'],
  ['Jo 5:24', '8:36', 'Rm 8:31-39', '1 Jo 3:19-21']
);

addVS('rm', 8, 28, 'Tudo Contribui para o Bem',
  'Contexto: après a seção sobre sofrimento e intercessão do Espírito.',
  'Afirmação da soberania divina. "Tudo" inclui o sofrimento, mas não o pecado. "Bem" é ser conformado a Cristo.',
  'A soberania de Deus opera mesmo no sofrimento. O "bem" não é conforto, mas conformidade com Cristo. Fundamento da esperança cristã.',
  ['Encontrar propósito no sofrimento', 'Confiar no controle divino', 'Buscar ser conformado a Cristo'],
  ['"Tudo" inclui realmente tudo?', 'Como Deus transforma o mal em bem?', 'O que isso significa no luto e na dor?'],
  ['Jó 42:2', 'Ef 1:11', 'Rm 8:18-30', 'Gn 50:20']
);

addVS('rm', 8, 28, 'Nada Nos Separará do Amor de Deus',
  'Contexto: clímax da argumentação sobre segurança eterna.',
  'Lista exaustiva de forças que não podem separar: morte, vida, anjos, potestades, alturas, profundidades, criatura alguma.',
  'Segurança absoluta do crente. Amor inseparável em Cristo Jesus. Base da certeza da salvação.',
  ['Viver com segurança e alegria', 'Não temer as forças espirituais', 'Confiar no amor eterno de Deus'],
  ['O que pode ameaçar a segurança cristã?', 'Como essa passagem nos conforta em tempos difíceis?', 'O que significa "amor de Deus em Cristo Jesus"?'],
  ['Ef 3:18-19', '1 P 1:3-5', 'Jó 39:1-30', 'Sl 139:7-12']
);


// ====================================================================
// CORÍNTIOS E GÁLATAS
// ====================================================================

addVS('1co', 13, 4, 'O Amor Nunca Falha',
  'Contexto: Paulo corrige o uso indevido de dons espirituais em Corinto. Amor é mais excelente que qualquer dom.',
  'Forma de hino ao amor. Estrutura negativa (não é orgulhoso) e positiva (sufre tudo). Culmina na permanência do amor.',
  'O amor é mais importante que dons, conhecimento e sacrifício. Amor (agape) é a virtude cristã por excelência. Fundamento da ética cristã.',
  ['Praticar o amor concreto', 'Priorizar o amor acima dos dons', 'Avaliar relacionamentos pelo amor, não pelo desempenho'],
  ['Como o "amor" bíblico se diferencia do sentimentalismo?', 'O que significa "suportar tudo" sem ser passivo?', 'Como cultivar amor genuíno?'],
  ['1 Jo 4:7-8', 'Gl 5:22-23', '1 Co 12:31-14:1', 'Mt 22:37-40']
);

addVS('2co', 5, 17, 'Nova Criatura',
  'Contexto: Paulo argumenta sobre o ministério da nova aliança versus a velha.',
  'Forma de declaração cristológica. "Em Cristo" é a chave: nova identidade, não autoajuda.',
  'A regeneração é obra sobrenatural de Deus. Não é reforma, mas nova criação. Base da identidade cristã.',
  ['Viver na nova identidade em Cristo', 'Não voltar ao "antigo homem"', 'Reconheber que Deus faz novidade'],
  ['Como a "nova criação" difere da "reforma"?', 'O que muda concretamente na vida de um cristão?', 'Como a identidade em Cristo afeta a autopercepção?'],
  ['Ef 2:10', 'Gl 6:15', 'Jo 3:3-7', 'Ef 4:22-24']
);

addVS('2co', 5, 21, 'Deus Nos Fez Justiça Nele',
  'Contexto: clímax do argumento sobre o ministério de reconciliação.',
  'Declaração compacta da imputação: Cristo tomou nosso pecado, nós tomamos Sua justiça.',
  'A grande troca: pecado por justiça. Imputação dupla: nossos pecados imputados a Cristo, Sua justiça imputada a nós. Base da justificação.',
  ['Receber a justiça de Cristo como dom', 'Não confiar em méritos próprios', 'Viver segundo a nova identidade'],
  ['O que significa "imputação" na prática?', 'Como a justiça de Cristo se aplica a nós?', 'Por que a troca é justa?'],
  ['Is 53:5-6', 'Fp 3:9', 'Rm 4:3-8', 'Gl 3:13-14']
);

addVS('gl', 2, 16, 'Justificados Pela Fé em Cristo',
  'Contexto: Paulo confronta Pedro em Antioquia sobre a necessidade de observar a lei para a salvação.',
  'Declaração tres vezes repetida (ênfase). Três construções diferentes em grego: pela fé, não por obras da lei.',
  'Versículo central da Reforma. Sola fide: a fé é o meio exclusivo da justificação. Não por obras da lei.',
  ['Viver pela fé em Cristo', 'Não depender de obras para salvação', 'Resistir ao legalismo religioso'],
  ['O que a fé "não por obras" não exclui?', 'Como a fé se manifesta em obras?', 'Por que a repetição三重?'],
  ['Rm 3:28', 'Ef 2:8-9', 'Rm 4:4-5', 'Tg 2:14-26']
);


// ====================================================================
// EFÉSIOS E FILIPENSES
// ====================================================================

addVS('ef', 2, 8, 'Por Graça Sois Salvos',
  'Contexto: Paulo descreve a condição humana (mortos em trespassos) e a intervenção divina.',
  'Estrutura de contraste: mortos → vivificados. "Graça" (charis) é o centro. Fé e salvação são dádivas.',
  'A salvação é 100% graça de Deus. Fé é o meio, não o mérito. Equilíbrio entre soberania divina e responsabilidade humana.',
  ['Receber a salvação como dom', 'Humilhar-se perante a graça', 'Não confiar em méritos próprios'],
  ['A fé é também dádiva ou apenas meio?', 'Como conciliar graça soberana com responsabilidade?', 'O que isso significa para os não crentes?'],
  ['Rm 3:24', 'Tt 3:5', 'Ef 2:5-6', 'Gl 2:16']
);

addVS('ef', 2, 10, 'Criados para Boas Obras',
  'Contexto: após afirmar que a salvação não é por obras (2:8-9), Paulo afirma que a salvação leva a obras.',
  'Estrutura de paradoxo: não por obras, mas para obras. "Criados" (ktizo) indica nova criação.',
  'A graça antecipa as obras. Deus preparou as obras que devemos andar. Santificação é consequência, não causa, da salvação.',
  ['Viver as boas obras que Deus preparou', 'Entender que obras são fruto, não causa', 'Buscar a santificação pela graça'],
  ['Como obras são preparadas por Deus?', 'Qual a relação entre fé e obras?', 'O que significam "boas obras" na prática?'],
  ['Tg 2:14-17', 'Mt 5:16', 'Fp 2:12-13', '2 Tm 3:16-17']
);

addVS('fp', 4, 13, 'Posso Todas as Coisas',
  'Contexto: Paulo aprendeu a contentar-se em toda situação. A força vem de Cristo.',
  'Frase amplamente mal interpretada. Não é "posso tudo que quiser", mas "posso tudo que Cristo quer através de mim".',
  'A suficiência pela força de Cristo. Não é autosuficiência, mas dependência radical. Funciona na abundância e na necessidade.',
  ['Depender de Cristo para tudo', 'Contentar-se em toda situação', 'Ser forte na fraqueza'],
  ['O que Paulo realmente "pode" fazer?', 'Como a fraqueza se torna força?', 'O que isso significa na vida cotidiana?'],
  ['2 Co 12:9-10', 'Ef 3:16', 'Jo 15:5', '2 Co 12:7-10']
);


// ====================================================================
// HEBREUS E EPÍSTOLAS GERAIS
// ====================================================================

addVS('hb', 11, 1, 'A Fé É o Firme Fundamento',
  'Contexto: "salão dos famosos" da fé. Após definir fé, Paulo lista exemplos do AT.',
  'Definição clássica de fé. "Firme fundamento" (hypostasis) = base concreta. "Convicção" (elegchos) = evidência.',
  'Fé é certeza das coisas que se esperam, prova das que não se veem. Não é cegueira, mas visão de realidades invisíveis.',
  ['Cultivar fé como certeza', 'Viver por aquilo que não se vê', 'Quebrar a dependência da visão e do controle'],
  ['A fé é oposta à razão ou a transcende?', 'Como fé e evidência se relacionam?', 'O que significa "provar" o invisível?'],
  ['2 Co 4:18', 'Rm 8:24-25', '2 Co 5:7', '1 P 1:8-9']
);

addVS('hb', 13, 8, 'Ontem e Hoje o Mesmo',
  'Contexto: advertências contra doutrinas estranhas e exortação à estabilidade.',
  'Afirmação categórica da imutabilidade de Cristo. Presente perfeito: é o mesmo continuamente.',
  'A imutabilidade de Cristo é base da segurança da fé. Não depende de mudanças culturais ou circunstanciais.',
  ['Fundar a fé no Cristo imutável', 'Não se deixar levar por modas teológicas', 'Encontrar conforto na permanência de Cristo'],
  ['Como Cristo pode ser "o mesmo" em contextos tão diferentes?', 'O que isso significa para a tradição cristã?', 'Como a imutabilidade nos dá estabilidade?'],
  ['Ml 3:6', 'Tg 1:17', 'Sl 102:25-27', 'Is 40:8']
);

addVS('tg', 2, 14, 'Fé Sem Obras É Morta',
  'Contexto: Tiago corrige a distorção paulina da fé. Fé que não produz obras está morta.',
  'Forma de pergunta retórica: "De que lhes serve?". Não nega a justificação pela fé, mas nega a fé sem frutos.',
  'Fé genuína produz obras. Não é fé + obras = salvação, mas fé que salva sempre produz obras. Complementaridade com Paulo.',
  ['Examinar se a fé é genuína', 'Deixar a fé se manifestar em obras', 'Evitar o intelectualismo sem prática'],
  ['Tiago contraria Paulo?', 'O que distingue fé morta de fé viva?', 'Que obras a fé genuína produz?'],
  ['Gl 2:16', 'Ef 2:8-10', 'Rm 3:27-28', 'Mt 25:31-46']
);

addVS('1jo', 4, 8, 'Deus É Amor',
  'Contexto: João ensina sobre o amor fraternal como sinal de salvação.',
  'Declaração ontológica: o amor não é apenas algo que Deus tem, mas algo que Ele É. Fundamento da ética.',
  'O amor é a essência de Deus. Se Deus é amor, então a não-amor contradiz a natureza de Deus. Base da ética cristã.',
  ['Amar como Deus ama', 'Reconhecer que amor é mais que sentimento', 'Viver o amor como identidade cristã'],
  ['O que significa "Deus É amor" ontologicamente?', 'Como o amor de Deus se diferencia do amor humano?', 'Que consequências isso tem para a ética?'],
  ['Jo 3:16', '1 Jo 4:16', '1 Co 13:4-8', 'Ef 5:1-2']
);


// ====================================================================
// APOCALIPSE
// ====================================================================

addVS('ap', 3, 20, 'Estou à Porta e Chamo',
  'Contexto: carta à igreja de Laodiceia, morna e autossuficiente.',
  'Metáfora de hospitalidade: Cristo como visitante que bate à porta. Inversão: é Deus quem bata à porta humana.',
  'O convite pessoal de Cristo. A graça é urgente mas não forçada. Cristo espera que O recebamos.',
  ['Abrir a vida para Cristo', 'Não ser nem quente nem frio', 'Reconhecer a necessidade de Cristo'],
  ['Por que Cristo bata em vez de entrar?', 'O que significa "ceia" neste contexto?', 'Como a morna espiritualidade nos afeta?'],
  ['Lc 13:25', 'Mt 25:1-13', 'Jo 10:1-3', 'Rm 13:11-14']
);

addVS('ap', 21, 4, 'Enxugará Todas as Lágrimas',
  'Contexto: visão final da nova criação. Deus restaura tudo o que o pecado destruiu.',
  'Forma de promessa escatológica. Lista negativa: sem morte, luto, dor, clamor. Antes era temporário.',
  'Esperança final da criação. A restauração é total: relacional (Deus conosco), existencial (sem dor), cósmica (nova criação).',
  ['Viver com esperança escatológica', 'Suportar as lágrimas presentes com visão futura', 'Ansiar pela nova criação'],
  ['O que as "lágrimas" representam?', 'Como essa esperança nos dá força hoje?', 'O que a ausência de dor significa na prática?'],
  ['Is 25:8', '1 Co 15:54-55', 'Ap 21:1-3', 'Rm 8:18-25']
);

addVS('ap', 22, 20, 'Sim, Vem Senhor Jesus',
  'Contexto: penúltimo versículo de toda a Escritura. O clamor escatológico da igreja.',
  'Forma de oração-resposta. "Maranatha" (venha, Senhor) é a oração primitiva da igreja.',
  'Escatologia vivida: a igreja anseia pela volta de Cristo. A história tem direção e destino. O "sim" é acordo com a promessa.',
  ['Clamar pela volta de Cristo', 'Viver preparados para Sua vinda', 'Mantener viva a esperança escatológica'],
  ['Como a expectativa da volta de Cristo afeta a vida cotidiana?', 'Por que a igreja primitiva dizia "Maranatha"?', 'O que isso significa para nossas prioridades?'],
  ['1 Co 16:22', 'Mt 24:42', '1 Ts 4:16-17', '2 P 3:11-13']
);


// ====================================================================
// MAIS EPÍSTOLAS PAULINAS
// ====================================================================

addVS('rm', 1, 16, 'Não Me Envergonho do Evangelho',
  'Contexto: introdução da carta. Paulo declara o tema central antes de desenvolver o argumento.',
  'Versículo temático de Romanos. Termos: "poder" (dunamis) para salvação, "primeiro ao judeu" mostra continuidade.',
  'O evangelho é poder ativo, não apenas informação. A salvação é para todos os que creem. Fundamento da missão cristã.',
  ['Vergonha do evangelho ou coragem?', 'Como proclamar sem envergonhar?', 'O que o evangelho "poder" significa na prática?'],
  ['Por que o evangelho é "poder"?', 'O que "primeiro ao judeu" implica para a missão?', 'Como isso afeta nossa evangelismo?'],
  ['1 Co 1:18', 'Rm 1:17', 'Ef 6:19', 'Mc 8:38']
);

addVS('rm', 5, 8, 'Deus Prova Seu Amor',
  'Contexto: Paulo ilustra a graça usando a cruz como exemplo supremo.',
  'Estrutura de contraste: éramos pecadores → Cristo morreu. Amor não é reação ao mérito, mas iniativa soberana.',
  'A cruz é a demonstração suprema do amor. Amor por inimigos é o radicalismo cristão. Base da ética do amor.',
  ['Receber o amor incondicional', 'Amar quem não merece', 'Entender que a cruz é a medida do amor'],
  ['Como Deus pode amar inimigos?', 'O que isso significa para nossos inimigos?', 'Como o amor na cruz se aplica à vida cotidiana?'],
  ['Jo 3:16', '1 Jo 4:10', 'Ef 2:4-5', 'Mt 5:44-48']
);

addVS('gl', 5, 22, 'Os Frutos do Espírito',
  'Contexto: Paulo contrasta obras da carne com frutos do Espírito.',
  'Metáfora agrícola: "fruto" (singular) = uma realidade com muitas manifestações. Lista noventa por cento positiva.',
  'O fruto é obra do Espírito, não esforço humano. Cada fruto é facet da mesma realidade. Base da santificação.',
  ['Cultivar cada fruto na vida', 'Depender do Espírito, não do esforço', 'Avaliar a maturidade cristã pelo fruto'],
  ['Por que "fruto" no singular?', 'Como o fruto se relaciona com os dons?', 'Que fruto mais está faltando em sua vida?'],
  ['Mt 7:16-20', 'Ef 5:9', 'Gl 5:16-21', 'Col 3:12-15']
);

addVS('ef', 6, 10, 'Sede Fortalecidos no Senhor',
  'Contexto: clímax de Efésios. Após doutrina (caps. 1-3), Paulo exorta à prática (caps. 4-6).',
  'Metáfora militar: armadura romana como imagem de recursos espirituais. A guerra é espiritual, não física.',
  'O crente precisa de recursos divinos para a guerra espiritual. A armadura é Cristo e suas verdades. A oração é o fio que liga tudo.',
  ['Vestir a armadura diariamente', 'Reconhecer a realidade da guerra espiritual', 'Orar constantemente como base da batalha'],
  ['Que tipo de "guerra" enfrentamos?', 'Como cada peça da armadura se aplica?', 'Por que a oração é a "arma" final?'],
  ['2 Co 10:3-5', 'Rm 13:12', '1 P 5:8-9', 'Ef 6:18-20']
);

addVS('fp', 4, 6, 'Não vos Aflijais',
  'Contexto: Paulo exorta à paz em vez da ansiedade. Instrução prática baseada em verdade teológica.',
  'Imperativo negativo ("não") seguido de positivo ("em tudo, em oração"). Gratidão como antídoto à ansiedade.',
  'A oração e a gratidão substituem a preocupação. A soberania de Deus é o fundamento. Não é proibição, mas transformação.',
  ['Trocar ansiedade por oração', 'Praticar gratidão em tudo', 'Confiar que Deus cuida'],
  ['A oração elimina toda ansiedade?', 'Como a gratidão transforma a perspectiva?', 'O que "em tudo" realmente significa?'],
  ['1 P 5:7', 'Sl 55:22', 'Mt 6:25-34', 'Fp 4:7']
);

// ====================================================================
// MAIS EVANGELHOS
// ====================================================================

addVS('mt', 11, 28, 'Vinde a Mim, Todos os Cansados',
  'Contexto: Jesus convida os oprimidos pela religiosidade fúlica dos fariseus.',
  'Forma de convite. Imperativos: "vinde", "aprendi". Contraste com o jugo pesado da lei humana.',
  'O convite é universal ("todos"). O descanso é espiritual: alívio do jugo da autojustificação. Jesus é o mestre manso.',
  ['Aceitar o convite de Jesus', 'Descansar do trabalho servil', 'Aprender com Jesus a mansidão'],
  ['O que o "jugo" representa?', 'Que descanso Jesus oferece?', 'Como a mansidão se relaciona com a liberdade?'],
  ['Is 55:1', 'Mt 11:29-30', 'Jr 31:25', '1 Jo 5:3']
);

addVS('lc', 15, 11, 'O Filho Pródigo',
  'Contexto: Jesus narra três parábolas sobre o que se perde e se encontra. Esta é a culminante.',
  'Narrativa com três personagens: pai generoso, filho pródigo, filho ressentido. Clímax na graça do pai.',
  'A graça precede o arrependimento. O pai corre, abraça e restaura. A parábola é mais sobre o pai que sobre o filho.',
  ['Reconhecer que somos o filho pródigo', 'Receber a graça que restaura', 'Evitar o espírito do filho ressentido'],
  ['A parábola é sobre o filho ou sobre o pai?', 'O que o "far-me-ai filho" significa?', 'Como a graça do pai desafia nossas expectativas?'],
  ['Jo 3:16-17', 'Ef 2:1-10', '1 Jo 3:1', 'Rm 8:15-17']
);

addVS('mc', 10, 45, 'Dar a Vida em Resgate',
  'Contexto: depois de corrigir a ambição dos discípulos, Jesus define o propósito de Sua vinda.',
  'Declaração cristológica central: o Filho do Homem veio para servir e dar vida.',
  'A missão de Jesus é substitutiva e redentora. O "resgate" (lutron) indica pagamento por libertação. Serviço é o modelo de liderança.',
  ['Servir em vez de dominar', 'Entender que Cristo deu Sua vida por nós', 'Seguir o modelo de serviço de Jesus'],
  ['O que o "resgate" implica sobre a condição humana?', 'Como o serviço se relaciona com a autoridade?', 'O que significa "dar a vida" no nosso contexto?'],
  ['Mt 20:28', '1 Tm 2:6', '1 P 2:21', 'Jo 10:11']
);

addVS('lc', 23, 34, 'Pai, Perdoa-lhes',
  'Contexto: primeira palavra da cruz. Jesus ora pelos que O crucificam.',
  'Citação de Isaías 53:12. Forma de intercessão. "Não sabem o que fazem" = ignorância, não isenção.',
  'O perdão é proativo, não reativo. Jesus intercede pelos inimigos. Modelo para a ética cristã da não violência e do perdão.',
  ['Perdoar quem nos fere', 'Interceder pelos inimigos', 'Reconhecer que muitos pecam por ignorância'],
  ['Como perdoar sem minimizar o mal?', 'O que "não sabem" significa?', 'Como isso se aplica à justiça social?'],
  ['Mt 5:44', 'At 7:60', 'Rm 12:14-21', 'Ef 4:32']
);

// ====================================================================
// MAIS POÉTICOS E PROFETAS
// ====================================================================

addVS('sl', 51, 10, 'Coração Puro, Ó Deus',
  'Contexto: salmo de arrependimento de Davi após o pecado com Bate-Seba e assassinato de Urias.',
  'Forma de lamentação pessoal. Clímax: "coração puro" (leb tahor). Não é apenas perdão, mas transformação.',
  'A regeneração é obra do Espírito. O coração contrito é o sacrifício aceito. Arrependimento vai além do ato, à raiz.',
  ['Buscar pureza de coração', 'Quebrantar-se pelo pecado', 'Confian na regeneração divina'],
  ['O que "coração puro" significa?', 'Como a regeneração difere do arrependimento?', 'O que "espírito reto" implica na prática?'],
  ['Jo 3:3-7', 'Ef 2:1-5', '1 Jo 1:9', 'Sl 32:1-5']
);

addVS('is', 53, 10, 'O Senhor Quis Mará-lo',
  'Contexto: clímax do Servo Sofredor. A morte do Servo é desejada por Deus para redenção.',
  'Paradoxo: Deus quer o sofrimento do Servo. "Mará-lo" (chalah) = fazer doente, afligir.',
  'A morte de Cristo é-planejada por Deus, não acidente. A oblação voluntária é fundamento da salvação.',
  ['Reconhecer o propósito divino no sofrimento de Cristo', 'Adorar pelo sacrifício planejado', 'Confiar que Deus tem propósito em tudo'],
  ['Por que Deus "quis" afligir o Servo?', 'O que a oblação voluntária significa?', 'Como isso afeta nossa visão de sofrimento?'],
  ['Hb 9:14', 'Ef 5:2', '1 Jo 4:10', 'Is 53:4-6']
);

addVS('dn', 7, 13, 'O Filho do Homem Recebe Domínio',
  'Contexto: visão apocalíptica de Daniel. Figuras bestiais são reinos humanos; o Filho do Homem recebe domínio eterno.',
  'Forma de visão apocalíptica. Dualismo entre reinos humanos (bestas) e reino divino (Filho do Homem).',
  'Jesus se identifica com esta figura (Mc 14:62). A autoridade cósmica é dada, não usurpada. Base da escatologia cristã.',
  ['Esperar o reino eterno de Cristo', 'Não se assombrar com reinos humanos', 'Viver sob a autoridade do Filho do Homem'],
  ['Quem é o "Filho do Homem" neste contexto?', 'Como Jesus usa este título?', 'O que "domínio eterno" significa?'],
  ['Mt 26:64', 'Ap 1:7', 'Ap 1:13', 'Mc 14:61-62']
);

// ====================================================================
// MAIS ATOS E EPÍSTOLAS
// ====================================================================

addVS('at', 1, 8, 'Sereis Minhas Testemunhas',
  'Contexto: última pergunta dos discípulos antes da ascensão. Eles esperam política, Jesus dá missão.',
  'Comissão missionária com estrutura geográfica: Jerusalém → Judeia → Samaria → extremidades da terra.',
  'A missão é universal e prograssiva. O Espírito capacita para testemunho. A igreja nasce missionária.',
  ['Começar pela nossa comunidade', 'Expandir o alcance gradualmente', 'Depender do Espírito para testemunhar'],
  ['Como começar pela "Jerusalém" pessoal?', 'Por que a Samaria é mencionada?', 'O que o Espírito tem a ver com missão?'],
  ['Mt 28:19-20', 'Mc 16:15', 'At 2:1-4', 'Rm 10:14-15']
);

addVS('at', 17, 22, 'Homens de Atenas',
  'Contexto: Paulo na Areópago, centro intelectual do mundo grego. Altar "Ao Deus Desconhecido".',
  'Modelo de engajamento cultural. Paulo usa poeta grego (Epimênides) para ponte. Começa pelo que aceitam.',
  'O evangelho se comunica em contextos culturais diferentes. Deus não depende de templos humanos. Modelo de apologética.',
  ['Engajar a cultura com o evangelho', 'Encontrar pontos de contato', 'Proclamar Cristo mesmo em ambientes hostis'],
  ['Como dialogar sem comprometer a verdade?', 'O que significa "Deus que não habita em templos"?', 'Como Paulo usa a cultura sem se render?'],
  ['Is 66:1', 'Sl 139:7-10', 'Rm 1:19-20', '1 Co 9:19-23']
);

addVS('2co', 12, 9, 'Minha Graça Basta',
  'Contexto: Paulo relata sua "espinha na carne" e a resposta de Deus.',
  'Estrutura de paradoxo: fraqueza → perfeição de Cristo. Graça = suficiência divina na insuficiência humana.',
  'A graça de Deus é suficiente para todas as situações. A fraqueza humana é palco da força divina.',
  ['Aceitar a fraqueza como oportunidade', 'Depender da graça, não da força própria', 'Glorificar a Deus nas limitações'],
  ['O que é a "espinha na carne"?', 'Por que Deus não remove a fraqueza?', 'Como a graça se manifesta na insuficiência?'],
  ['Fp 4:13', '2 Co 4:7', '2 Co 12:7-10', '1 P 4:10-11']
);

addVS('2tm', 3, 16, 'Toda Escritura É Inspirada por Deus',
  'Contexto: Paulo instrui Timóteo sobre a autoridade das Escrituras em tempos difíceis.',
  'Declaração sobre a natureza da Bíblia. "Theopneustos" = respirada por Deus. Quatro utilidades listadas.',
  'A Bíblia é inspirada por Deus e útil para vida cristã. Autoridade, inerrância e suficiência. Base do Sola Scriptura.',
  ['Estudar a Bíblia com seriedade', 'Submeter-se à autoridade da Escritura', 'Usar a Bíblia para ensinar, corrigir e instruir'],
  ['O que "inspirada por Deus" significa?', 'A Bíblia tem erros?', 'Como a suficiência da Escritura se aplica?'],
  ['2 P 1:20-21', 'Sl 119:89', 'Is 40:8', 'Jo 10:35']
);

addVS('hb', 4, 12, 'Viva É a Palavra de Deus',
  'Contexto: após advertência contra a desobediência (cap. 3), Paulo fala do poder da Palavra.',
  'Metáfora: Palavra como espada de dois gumes. Personificação: viva, eficaz, penetrante.',
  'A Palavra de Deus é ativa e eficaz. Penetra o íntimo, julga pensamentos. Diferente de qualquer palavra humana.',
  ['Reverenciar a Palavra de Deus', 'Deixar a Bíblia nos julgar e transformar', 'Reconhecer o poder da Escritura'],
  ['Como a Bíblia "penetra" nossa vida?', 'O que significa "espada de dois gumes"?', 'Por que a Palavra é "mais afiada"?'],
  ['2 Tm 3:16-17', 'Sl 119:105', 'Is 55:10-11', 'Ef 6:17']
);

addVS('1p', 2, 9, 'Vós Sois Geração Eleita',
  'Contexto: Pedro escreve a cristãos perseguidos, lembrando sua identidade em Cristo.',
  'Lista de títulos: geração eleita, sacerdócio real, nação santa, povo peculiar. Ecoa Êxodo 19:6.',
  'A identidade do povo de Deus é dada por graça, não conquistada. Eleição, sacerdócio e santidade são realidades espirituais.',
  ['Viver segundo a identidade dada por Deus', 'Ser sacerdote que intercede e oferece sacrifícios espirituais', 'Ser santo em meio à cultura'],
  ['O que "geração eleita" significa?', 'Como todos são "sacerdócio real"?', 'O que "povo peculiar" implica?'],
  ['Ex 19:6', 'Ap 1:6', '1 P 2:5', 'Dt 7:6']
);

addVS('ap', 21, 1, 'Novos Céus e Nova Terra',
  'Contexto: visão final de João. Deus não abandona a criação, mas a renova.',
  'Contraste com o mundo presente. "Novos" (kainos) = renovados qualitativamente, não novos no tempo.',
  'Renovação cósmica, não destruição. Deus restaura o que o pecado corrompeu. Base da esperança cristã.',
  ['Esperar a restauração de todas as coisas', 'Cuidar do mundo presente', 'Não desistir do mundo "velho"'],
  ['Renovação é diferente de destruição?', 'O que isso significa para o cuidado ambiental?', 'Como a nova criação se relaciona com a ressurreição?'],
  ['Is 65:17', '2 P 3:13', 'Rm 8:19-22', 'Ap 22:1-5']
);

addVS('1jo', 1, 9, 'Se Confessarmos',
  'Contexto: João ensina sobre andar na luz versus andar nas trevas.',
  'Estrutura condicional: se confessarmos → Deus é fiel e justo para perdoar. Confissão é condição, não causa.',
  'O perdão é garantido pela fidelidade de Deus. "Justo" indica que Deus mantém Sua palavra. Confissão é restauração, não punição.',
  ['Praticar a confissão regular', 'Confiar na fidelidade de Deus', 'Não ter medo de confessar'],
  ['A confissão é necessária para o perdão?', 'O que "confessar" inclui?', 'Por que Deus é "fiel e justo" para perdoar?'],
  ['Sl 32:5', '1 Jo 2:1-2', 'Tg 5:16', 'Rm 8:1']
);

// ====================================================================
// MAIS VERSÍCULOS ESSENCIAIS
// ====================================================================

addVS('gn', 1, 3, 'E Disse Deus: Haja Luz',
  'Contexto: primeiro ato criador. A palavra divina produz realidade.',
  'Forma de comando divino. "E houve luz" = eficácia da palavra de Deus.',
  'A palavra de Deus é eficaz. A criação pela palavra prefigura a nova criação pela Palavra (Jo 1:1-3).',
  ['Confiar no poder da Palavra de Deus', 'Reconhecer que Deus fala e as coisas acontecem', 'Obedecer à voz divina'],
  ['O que a criação pela palavra ensina sobre Deus?', 'Como isso se conecta com Cristo como Palavra?', 'O que "luz" representa espiritualmente?'],
  ['Jo 1:1-5', '2 Co 4:6', 'Sl 33:6', 'Hb 11:3']
);

addVS('is', 40, 3, 'A Voz no Deserto',
  'Contexto:或áculo de consolação após julgamento. Preparo para o retorno do exílio.',
  'Metáfora de estrada: nivelar o caminho para o rei. Aplicação joanina: João Batista como arauto.',
  'João Batista prepara o caminho para Cristo. A consolação vem após a preparação. Dupla aplicação: exílio e Messias.',
  ['Preparar o coração para Cristo', 'Reconhecer a urgência da preparação', 'Ser voz que clama no deserto'],
  ['Como João cumpriu esta profecia?', 'O que significa "nivelar o caminho"?', 'O que preparar o coração implica?'],
  ['Mt 3:1-3', 'Mc 1:2-4', 'Lc 3:3-6', 'Mt 11:10']
);

addVS('fl', 1, 15, 'Aceita-o Como a Mim',
  'Contexto: Paulo intercede por Onésimo, escravo fugido que se converteu.',
  'Carta pessoal que revela o poder transformador do evangelho. Onésimo é "útil" (nome significa "útil").',
  'O evangelho transforma relacionamentos sociais. Em Cristo não há escravo nem livre (Gl 3:28). Reconciliação é central.',
  ['Reconciliar relacionamentos quebrados', 'Reconhecer que o evangelho transforma identidades', 'Agir como mediador de paz'],
  ['Como o evangelho muda relações sociais?', 'O que significa "aceitar como a mim"?', 'Como Paulo exemplifica intercessão?'],
  ['Gl 3:28', 'Col 3:11', 'Filemom', '2 Co 5:16-17']
);

addVS('ap', 5, 9, 'Digno É o Cordeiro',
  'Contexto: clímax celestial. Ninguém podia abrir o livro, mas o Cordeiro morto é digno.',
  'Contraste dramático: leão de Judá vence como Cordeiro sacrificado. Vitória pela morte.',
  'A vitória de Cristo é pela cruz, não pela espada. O sacrifício é a base da adoração eterna.',
  ['Adorar ao Cordeiro sacrificado', 'Reconhecer que a vitória vem pela cruz', 'Compartilhar o louvor celestial'],
  ['Por que um Cordeiro é digno?', 'Como a morte é vitória?', 'O que o "livro selado" representa?'],
  ['Ap 5:5-14', 'Jo 1:29', 'Dn 7:13-14', 'Is 53:7']
);

// ====================================================================
// VERSÍCULOS ADICIONAIS — GÊNESIS A DEUTERÔMIO
// ====================================================================

addVS('gn', 2, 7, 'O Formado do Homem do Pó',
  'Contexto: segunda narrativa da criação (Yavista). Detalhes mais íntimos da criação humana.',
  'Narrativa vívida: Deus forma (yatsar = como o oleiro), sopra o fôlego, homem se torna alma vivente.',
  'A humanidade é material e espiritual. O "fôlego" (nishmah) é o princípio vital de Deus. Dignidade e finitude combinadas.',
  ['Valorizar a vida como dádiva divina', 'Reconhecer dependência do fôlego de Deus', 'Cultivar a dimensão espiritual da vida'],
  ['O que o "fôlego de Deus" significa?', 'Como matéria e espírito se relacionam?', 'O que isso ensina sobre a morte?'],
  ['Ec 12:7', 'Jó 27:3', 'Sl 104:29-30', 'Hb 12:9']
);

addVS('gn', 6, 8, 'Noé Achou Graça',
  'Contexto: juízo universal pelo dilúvio. Noé é o remanescente fiel.',
  'Forma de narrativa de sobrevivência. Graça (hen) aparece pela primeira vez no AT.',
  'Deus busca um remanescente fiel. A graça precede a obediência de Noé. Tipologia de Cristo como salvador.',
  ['Ser parte do remanescente fiel', 'Confiar na graça de Deus mesmo no juízo', 'Obedecer mesmo quando o mundo corrói'],
  ['O que "achar graça" significa?', 'Como a graça se relaciona com a obediência?', 'Que paralelos existem entre Noé e Cristo?'],
  ['Hb 11:7', '1 P 3:20-21', 'Mt 24:37-39', 'Lc 17:26-27']
);

addVS('gn', 28, 14, 'Em Ti e na Tua Semente Serão Abençoadas Todas as Famílias',
  'Contexto: promessa renovada a Jacó (escada de Betel).',
  'Promessa abrangente: descendência, terra e bênção universal. "Todas as famílias da terra" = missão global.',
  'A aliança abraâmica se expande. A bênção é para todas as nações. Base da missão cristã.',
  ['Receber a bênção como responsabilidade', 'Ser canal de bênção para outros', 'Esperar a bênção universal de Deus'],
  ['Como a promessa se cumpre em Cristo?', 'O que "todas as famílias" significa?', 'Qual nossa responsabilidade na bênção?'],
  ['Gl 3:8-9', 'Gl 3:16', 'At 3:25', 'Ef 1:3']
);

addVS('ex', 15, 22-23, 'As Águas Amargas de Mara',
  'Contexto: após o cântico do Mar Vermelho, o povo encontra águas amargas no deserto.',
  'Narrativa de provação no deserto. Mara (amargo) → Deus ensina → águas doces.',
  'Deus permite provações para ensinar e prover. A pedra golpeada prefigura Cristo (1 Co 10:4).',
  ['Lembrar que Deus provê no deserto', 'Não murmurar nas dificuldades', 'Confian que Deus transforma o amargo em doce'],
  ['Por que Deus permite amargura?', 'O que a pedra prefigura?', 'Como isso nos prepara para o deserto cristão?'],
  ['1 Co 10:4', 'Nm 20:11', 'Sl 78:15-16', 'Is 48:21']
);

// ====================================================================
// VERSÍCULOS ADICIONAIS — HISTÓRICOS E POÉTICOS
// ====================================================================

addVS('js', 24, 15, 'Escolhei Hoje a Quem Sirvais',
  'Contexto: discurso de despedida de Josué. Aliança renovada.',
  'Forma de apelo decisório. "Escolhei hoje" = urgência. "Eu e minha casa" = liderança familiar.',
  'Deus exige decisão pessoal. A fé não é herança, mas escolha. Liderança familiar na fé.',
  ['Tomar decisão consciente por Deus', 'Liderar a família na fé', 'Não servir a Deus por tradição, mas por escolha'],
  ['A decisão é individual ou familiar?', 'O que significa servir ao Senhor hoje?', 'Como renovar a aliança pessoal?'],
  ['Dt 30:19', 'Js 1:9', '1 Rs 18:21', 'Rm 12:1-2']
);

addVS('1rs', 19, 11-12, 'A Voz da Voz Fina',
  'Contexto: Elias no Monte Horeb, fugindo de Jezabel. Uma voz pequena (qol demamah daqah).',
  'Contraste: terremoto, fogo, vento → silêncio. Deus fala no silêncio, não no espetáculo.',
  'Deus se revela no silêncio e na quietude. A "voz fina" é a voz da graça, não da violência.',
  ['Cultivar o silêncio para ouvir Deus', 'Reconhecer que Deus não está sempre no espetáculo', 'Buscar a voz suave do Espírito'],
  ['Por que Deus não está no terremoto?', 'Como ouvir a "voz fina" hoje?', 'O que o silêncio ensina sobre Deus?'],
  ['Sl 46:10', '1 Rs 19:11-12', 'Hb 12:26', 'Zc 4:6']
);

addVS('sl', 16, 10, 'Não Deixarás a Minha Alma no Seol',
  'Contexto: salmo messiânico. Pedro cita em Atos 2 como profecia da ressurreição.',
  'Forma de salmo de confiança. Termo "Seol" = mundo dos mortos. "Santo" = o ungido de Deus.',
  'Profecia da ressurreição de Cristo. "Santo" é identificado com o Messias. A corrupção não tem domínio.',
  ['Confiar na ressurreição', 'Esperar que a morte não é o fim', 'Adorar a Cristo como Ressurreto'],
  ['Como David fala de si mesmo e do Messias?', 'O que a ressurreição prova?', 'Por que "santo" não pode significar apenas David?'],
  ['At 2:25-32', 'At 13:35-37', 'Rm 1:4', '1 Co 15:20-23']
);

addVS('sl', 139, 16, 'Todos os Dias Foram Escritos',
  'Contexto: meditação sobre a onisciência e onipresença de Deus.',
  'Forma de meditação íntima. Livro celestial = presciência divina. "Insubstante" = embrião.',
  'Deus conhece a vida desde a concepção. O livro da vida inclui cada dia. Base da dignidade e da providência.',
  ['Viver confiante no conhecimento divino', 'Valorizar cada dia como dado por Deus', 'Reconhecer que Deus nos conhece totalmente'],
  ['O que o "livro" de cada dia contém?', 'Como a presciência de Deus afeta nosso livre-arbítrio?', 'O que isso ensina sobre valor da vida?'],
  ['Jó 14:16', 'Sl 56:8', 'Mt 10:29-31', 'Ef 1:4']
);

// ====================================================================
// VERSÍCULOS ADICIONAIS — PROFETAS MENORES E MAIORES
// ====================================================================

addVS('os', 6, 6, 'Misericórdia Quero e Não Sacrifício',
  'Contexto: Deus critica a religiosidade vazia de Israel.',
  'Contraste: misericórdia (hesed) vs. sacrifício. Jesus cita duas vezes (Mt 9:13; 12:7).',
  'Deus prioriza relacionamento justo sobre ritual. A misericórdia é mais importante que a religião formal.',
  ['Praticar misericórdia em vez de formalismo', 'Avaliar a religiosidade pelo fruto', 'Amar como Deus ama'],
  ['Como misericórdia e sacrifício se relacionam?', 'Por que Jesus cita este versículo?', 'O que significa "conhecer a Deus" neste contexto?'],
  ['Mt 9:13', 'Mt 12:7', 'Am 5:21-24', 'Ml 3:16-18']
);

addVS('mc', 6, 8, 'De Teu Juízo Sai Misericórdia',
  'Contexto: Miquéias resume o que Deus espera: justiça, misericórdia e humildade.',
  'Fórmula condicional: "ele te mostrou... o que é bom". Justiça + misericórdia + humildade.',
  'A religião genuína se manifesta em justiça social, misericórdia pessoal e humildade diante de Deus.',
  ['Praticar justiça no cotidiano', 'Ser misericordioso com os necessitados', 'Cultivar humildade diante de Deus'],
  ['Como justiça e misericórdia se combinam?', 'O que humildade tem a ver com isso?', 'Como isso se aplica à vida moderna?'],
  ['Am 5:24', 'Lc 6:36', 'Tg 2:13', 'Mt 5:7']
);

addVS('zcf', 14, 9, 'O Senhor Será Rei sobre Toda a Terra',
  'Contexto: profecia escatológica. Dia do Senhor em que o reinado de Deus é universal.',
  'Visão profética do reino universal. "Um só Senhor" = monoteísmo universal. Nomes novos = transformação.',
  'O reino de Deus se estenderá a toda a terra. A adoração será unificada. Base da esperança escatológica.',
  ['Ansiar pelo reino universal de Deus', 'Viver como súditos do Rei', 'Esperar a unidade na adoração'],
  ['O que "dia um só" significa?', 'Como isso se relaciona com a nova criação?', 'O que os "nomes novos" comunicam?'],
  ['Ap 11:15', 'Ap 21:2-3', 'Is 2:2-4', 'Dn 2:44']
);

// ====================================================================
// VERSÍCULOS ADICIONAIS — EVANGELHOS E ATOS
// ====================================================================

addVS('mt', 22, 37, 'O Grande Mandamento',
  'Contexto: fariseu pergunta qual é o maior mandamento. Jesus combina Dt 6:5 e Lv 19:18.',
  'Síntese da lei: dois amores — Deus e próximo. "De todo o teu coração" = totalidade.',
  'A lei se resume em amor. Sem amor genuíno a Deus, não há obediência genuína. O próximo é amado por causa de Deus.',
  ['Amar Deus com totalidade', 'Amar o próximo como a si mesmo', 'Reconhecer que os dois mandamentos se conectam'],
  ['Por que dois mandamentos em um?', 'O que "todo o coração" significa?', 'Como o amor ao próximo se relaciona com o amor a Deus?'],
  ['Mc 12:29-30', 'Lc 10:25-28', 'Dt 6:5', 'Lv 19:18']
);

addVS('mt', 24, 42, 'Vigiai, porque Não Sabeis',
  'Contexto: discurso escatológico (discurso do Monte das Oliveiras) sobre a segunda vinda.',
  'Forma de advertência. Imperativo: "vigiai". Incerteza temporal: "nenhum dia nem hora".',
  'A segunda vinda é certa, mas o tempo é desconhecido. A vigília é a atitude correta.',
  ['Viver em expectativa vigilante', 'Não presumir sobre tempos e horas', 'Estar preparado sempre'],
  ['O que significa "vigiar" na prática?', 'Como viver sem saber o dia nem a hora?', 'O que a incerteza temporal nos ensina?'],
  ['Mc 13:32-37', '1 Ts 5:1-6', 'Ap 16:15', '2 P 3:10']
);

addVS('mt', 28, 19, 'Ide, Portanto, Fazei Discípulos',
  'Contexto: primeira parte da Grande Comissão. Imperativo principal: "fazei discípulos".',
  'Três participios: "ide" (indo), "batizando" (batizando), "ensinando" (ensinando). Fazer discípulos é o imperativo.',
  'A missão não é apenas evangelismo, mas discipulado. Batismo e ensino são meios, não fins.',
  ['Fazer discípulos, não apenas convertidos', 'Batizar como sinal público', 'Ensinar obediência a tudo o que Cristo ordenou'],
  ['Qual é a diferença entre evangelismo e discipulado?', 'O que "batizar" comunica?', 'Como ensinar "tudo o que eu vos mandei"?'],
  ['Mt 28:20', 'Mc 16:15', 'Lc 24:47', 'At 1:8']
);

addVS('jo', 10, 11, 'O Bom Pastor Dá a Sua Vida',
  'Contexto: Jesus se compara com o bom pastor em contraste com o ladrão.',
  'Metáforma pastoral. "Bom pastor" (kalos) = generoso, sacrificado. "Dá a vida" = sacrifício voluntário.',
  'O bom pastor se sacrifica pelas ovelhas. Contraste com o雇佣 (misto) que foge. Tipo de Cristo na cruz.',
  ['Reconhecer o amor sacrifical de Cristo', 'Seguir o Bom Pastor, não vozes estranhas', 'Cuidar dos "pequeninos"'],
  ['O que distingue o bom pastor do雇佣?', 'Como Cristo dá a vida voluntariamente?', 'O que ser "ovelha" significa hoje?'],
  ['Jo 10:14-18', '1 P 2:25', 'Is 40:11', 'Lc 15:3-7']
);

addVS('jo', 15, 5, 'Sem Mim Nada Podeis',
  'Contexto: metáforma da videira e dos ramos, na última ceia.',
  'Metáforma agrícola: Cristo = videira, discípulos = ramos. Sem conexão = sem fruto.',
  'Dependência radical de Cristo. O fruto é resultado da conexão, não do esforço. Humildade é reconhecer nossa incapacidade.',
  ['Manter-se conectado a Cristo', 'Reconhecer que o fruto vem dEle', 'Buscar a oração e o estudo da Palavra'],
  ['O que significa "permanecer" na prática?', 'Como o fruto se manifesta?', 'O que acontece quando nos desconectamos?'],
  ['Jo 15:1-8', 'Gl 5:22-23', 'Fp 4:13', '2 Co 12:9']
);

// ====================================================================
// VERSÍCULOS ADICIONAIS — EPÍSTOLAS PAULINAS E GERAIS
// ====================================================================

addVS('rm', 7, 15, 'O Que Faço Não Quero',
  'Contexto: Paulo descreve a luta entre a carne e o espírito no crente.',
  'Diálogo interior: "quero" vs. "faço". Paradoxo da vida cristã antes da plena santificação.',
  'A luta contra o pecado é real até a glorificação. A lei é boa, mas a carne é fraca.',
  ['Reconhecer a luta interna', 'Não desistir por causa da queda', 'Clamar pela libertação em Cristo'],
  ['Essa luta é apenas para cristãos?', 'Como Cristo liberta dessa luta?', 'O que "lei do pecado" significa?'],
  ['Rm 8:1-4', 'Gl 5:16-17', 'Ef 4:22-24', '1 Jo 1:8-10']
);

addVS('1co', 6, 19-20, 'O vosso Corpo É Templo',
  'Contexto: Paulo corrige imoralidade sexual na igreja de Corinto.',
  'Metáfora de templo: o corpo é habitação do Espírito. "Comprados" = redimidos por preço.',
  'O corpo é templo do Espírito Santo. A redenção implica santificação do corpo.',
  ['Tratar o corpo com respeito', 'Lembrar que o Espírito habita em nós', 'Glorificar a Deus no corpo'],
  ['O que "templo" significa em relação ao corpo?', 'Como isso afeta decisões sobre sexualidade?', 'O que "preço" foi pago?'],
  ['Rm 12:1', '2 Co 6:16', 'Ef 5:18-20', '1 Ts 4:3-5']
);

addVS('2co', 4, 7, 'Temos Este Tesouro em Vasos de Barro',
  'Contexto: Paulo fala do ministério da nova aliança em fraqueza.',
  'Metáforma: tesouro (evangelho) em vaso de barro (humanidade frágil). Paradoxo poder/fragilidade.',
  'A excelência do poder é de Deus, não de nós. A fraqueza humana destaca a suficiência divina.',
  ['Aceitar a própria fragilidade', 'Reconhecer que Deus usa instrumentos fracos', 'Não confundir o vaso com o tesouro'],
  ['Por que Deus escolhe vassouras de barro?', 'Como a fraqueza destaca o poder?', 'O que isso muda na nossa autoestima?'],
  ['2 Co 12:9-10', 'Fp 2:12-13', '1 Co 1:27-29', 'Jr 45:5']
);

addVS('gl', 3, 28, 'Nem Judeu nem Grego',
  'Contexto: Paulo afirma a igualdade radical em Cristo.',
  'Lista de três categorias sociais: etnia, classe, gênero. "Em Cristo" é a identidade suprema.',
  'Igualdade radical na identidade cristã. Não nega diferenças, mas afirma dignidade igual.',
  ['Tratar todos com igual dignidade', 'Não permitir preconceitos na igreja', 'Reconheber identidade em Cristo antes de categorias'],
  ['Isso é ideal ou prática?', 'Como conciliar igualdade com diferenças?', 'O que isso ensina sobre justiça social?'],
  ['Rm 10:12', 'Col 3:11', 'Ef 2:14-18', 'Mt 28:19']
);

addVS('fp', 2, 3, 'Nada Fazendo por Contenda',
  'Contexto: Paulo exorta à humildade e harmonia na igreja.',
  'Negativo: não por contenda ou vaidade. Positivo: considerar os outros superiores.',
  'A humildade cristã é o oposto da vaidade. Modelo: Cristo se esvaziou (2:6-8).',
  ['Praticar humildade genuína', 'Preferir os outros acima de si', 'Buscar harmonia na comunidade'],
  ['Como ser humilde sem ser falso?', 'O que "considerar superiores" significa?', 'Como a humildade se relaciona com a unidade?'],
  ['Fp 2:5-11', 'Rm 12:10', '1 P 5:5-6', 'Ef 4:1-3']
);

addVS('cl', 3, 23, 'Tudo o que Fazedes, Fazei de Coração',
  'Contexto: Paulo instrui servos sobre como trabalhar.',
  'Imperativo: tudo para o Senhor, não para homens. "De coração" = com sinceridade.',
  'A vida cristã é total: tudo é para a glória de Deus. Trabalho secular é ministry.',
  ['Trabalhar para Deus em tudo', 'Ser excelente em todas as tarefas', 'Lembrar que somos servos de Cristo'],
  ['Isso inclui tarefas cotidianas?', 'Como trabalhar "para o Senhor" no emprego?', 'O que "senhorio de Cristo" significa?'],
  ['Ef 6:5-8', 'Rm 12:11', '1 Co 10:31', '1 P 2:18-20']
);

addVS('1ts', 5, 16, 'Regozijai-Vos Sempre',
  'Contexto: Paulo dá instruções práticas para a vida cristã no final da carta.',
  'Forma de instrução concisa. "Sempre" = incondicional. Não depende de circunstâncias.',
  'A alegria cristã é um fruto do Espírito que transcende circunstâncias. É mandamento, não opção.',
  ['Praticar a alegria como disciplina', 'Não deixar circunstâncias ditarem a alegria', 'Reconhecer que a alegria é fruto do Espírito'],
  ['Como ser alegre na adversidade?', 'A alegria é diferente da felicidade?', 'O que isso significa na prática?'],
  ['Fp 4:4', 'Gl 5:22', 'Rm 5:3-5', 'Tg 1:2-4']
);

addVS('hb', 10, 24-25, 'Não Deixemos de Congregar',
  'Contexto: exortação à perseverança e comunhão fraternal.',
  'Imperativo: não abandonar a assembleia. Motivo: encorajar uns aos outros.',
  'A comunhão cristã é essencial. A perseverança é coletiva, não individual. O "dia se aproximando" é escatológico.',
  ['Valorizar a comunhão cristã', 'Não abandonar a igreja em dificuldades', 'Encorajar uns aos outros regularmente'],
  ['Por que a congregação é necessária?', 'O que "dia se aproximando" significa?', 'Como encorajar os outros na prática?'],
  ['Hb 3:12-13', 'Rm 12:4-5', '1 Co 12:12-27', 'Ef 4:11-16']
);

addVS('tg', 1, 5, 'Se Algum de Vós Tem Falta de Sabedoria',
  'Contexto: Tiago instrui sobre como lidar com provações e necessidades.',
  'Instrução prática: peça a Deus. Condição: com fé, sem duvidar. "Generosamente" = sem repreensão.',
  'A sabedoria é dada por Deus de forma generosa. A fé é essencial para receber. A onisciência de Deus vê todas as necessidades.',
  ['Pedir sabedoria a Deus', 'Crer que Deus dá generosamente', 'Não ser duplamente instável'],
  ['Como pedir sabedoria?', 'O que é "fé sem duvidar"?', 'Por que Deus não repreende ao dar?'],
  ['Sl 111:10', 'Ef 1:17', 'Cl 1:9', 'Mt 7:7-11']
);

addVS('1jo', 2, 1, 'Temos um Advogado diante do Pai',
  'Contexto: João responde ao problema do pecado na vida cristã.',
  'Termo grego "parakletos" = advogado, defensor. "Justo" = Cristo satisfaz a justiça divina.',
  'Cristo intercede como advogado. A expiação é por nossos pecados, não apenas pelos do mundo.',
  ['Confiar na intercessão de Cristo', 'Não desesperar após cair em pecado', 'Reconhecer que Cristo nos defende'],
  ['Cristo é advogado ou sacrifício?', 'O que "justo" implica?', 'Como isso nos consola?'],
  ['Hb 7:25', 'Rm 8:34', '1 Jo 1:8-2:2', 'Zc 3:1-5']
);

addVS('1jo', 4, 19, 'Nós O Amamos Porque Ele Nos Amou',
  'Contexto: João fundamenta o amor fraternal no amor divino.',
  'Causal inverso: não amamos primeiro, mas fomos amados primeiro. O amor divino é a fonte.',
  'O amor cristão é resposta ao amor de Deus. Amor a Deus e aos outros nasce do reconhecimento do amor divino.',
  ['Amar como resposta ao amor', 'Não tentar amar por esforço próprio', 'Reconhecer que Deus é a fonte do amor'],
  ['Qual a diferença entre amor-humano e amor-divino?', 'Como o amor de Deus nos transforma?', 'O que isso significa para o evangelismo?'],
  ['Jo 3:16', '1 Jo 4:7-12', 'Ef 2:4-5', 'Rm 5:8']
);

addVS('jz', 2, 10, 'Gerou-se Outra Geração que Não Conhecia',
  'Contexto: fim da geração de Josué. Ciclo de pecado e juízo.',
  'Frase terrível: "não conhecia o Senhor". O conhecimento não se transmite automaticamente.',
  'Cada geração precisa ter experiência própria com Deus. A tradição não substitui a fé pessoal.',
  ['Transmitir a fé à próxima geração', 'Não depender da fé dos pais', 'Cultivar conhecimento pessoal de Deus'],
  ['Por que a fé não se herda?', 'Como ensinar sem impor?', 'O que isso significa para a educação cristã?'],
  ['Dt 6:6-7', 'Sl 78:1-7', '2 Tm 1:5', 'Ef 6:4']
);

addVS('1co', 10, 13, 'Nenhuma Tentação vos Tocou',
  'Contexto: Paulo usa a história de Israel como exemplo. Provações são comuns.',
  'Tentação não é pecado. "Comum aos homens" = universal. " Deus é fiel" = garantia de escape.',
  'Deus limita a tentação e dá caminho de escape. A fidelidade de Deus é o fundamento para resistir.',
  ['Não se desesperar na tentação', 'Buscar o caminho de escape que Deus dá', 'Confian na fidelidade de Deus'],
  ['O que significa "caminho de escape"?', 'Por que Deus permite tentações?', 'Como resistir na prática?'],
  ['Js 1:13-15', 'Sl 119:11', 'Tg 1:12-15', '2 P 2:9']
);

addVS('2ts', 3, 3, 'O Senhor É Fiel',
  'Contexto: Paulo ressalta a fidelidade de Deus em meio a perseguições.',
  'Declaração de fé na fidelidade divina. "Firmará" (sterizo) = estabelecer, dar estabilidade.',
  'A fidelidade de Deus é garantia de perseverança. Ele protege do maligno.',
  ['Firmar-se na fidelidade de Deus', 'Não temer o maligno', 'Confiar que Deus estabelece os fiéis'],
  ['Como Deus "firma" os fiéis?', 'O que "guarda do maligno" implica?', 'Como isso nos dá coragem?'],
  ['1 Co 10:13', '1 P 5:8-10', 'Sl 121:1-8', 'Dt 31:6']
);

addVS('at', 2, 42, 'Persistiam no Ensino dos Apóstolos',
  'Contexto: descrição da igreja primitiva. Quatro marcas.',
  'Quatro pilares: ensino, comunhão, fração do pão, oração. Modelo de igreja.',
  'A igreja primitiva era ensinada, comunal, sacramental e orante. Base para a eclesiologia cristã.',
  ['Ser parte de uma comunidade ensinada', 'Praticar comunhão genuína', 'Valorizar os sacramentos e a oração'],
  ['O que cada marca significa?', 'Como viver essas quatro dimensões hoje?', 'Que mudanças isso traz?'],
  ['At 2:44-47', 'Rm 12:4-5', '1 Co 11:23-26', 'Ef 2:19-22']
);

addVS('ef', 1, 3, 'Abençoado o Deus e Pai',
  'Contexto: introdução de Efésios. Hino de louvor.',
  'Forma de hino. "Abençoado" = louvado. Lista de bênçãos espirais no plano divino.',
  'Deus nos abençoou com toda bênção espiritual. A salvação é obra completa de Deus, não de nossos méritos.',
  ['Reconhecer todas as bênçãos espirais', 'Não negligenciar o que Deus já deu', 'Viver em gratidão pela salvação'],
  ['O que são "bênçãos espirais"?', 'Como recebemos essas bênçãos?', 'O que isso muda em nossa visão?'],
  ['Rm 8:28-32', '2 Co 9:8', 'Fp 4:19', 'Cl 2:9-10']
);

addVS('ap', 22, 21, 'A Graça do Senhor Jesus',
  'Contexto: versículo final de toda a Bíblia. Bênção final.',
  'Fórmula trinitária: graça (Filho) + amor (Pai) + comunhão (Espírito).',
  'A Palavra de Deus termina com graça. A Bíblia inteira é sobre a graça de Deus.',
  ['Viver sob a graça', 'Terminar cada dia com gratidão', 'Lembrar que tudo é graça'],
  ['Por que a Bíblia termina com "graça"?', 'O que "comunhão do Espírito Santo" significa?', 'Como isso resume toda a Escritura?'],
  ['2 Co 13:14', 'Rm 16:20', 'Jd 24-25', 'Sl 103:1-5']
);


// ====================================================================
// EXPORTAÇÃO
// ====================================================================

export default versiculosEstudo;
export { versiculosEstudo };
