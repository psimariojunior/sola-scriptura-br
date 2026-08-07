import { VersicoEstudo } from './versiculosEstudoTypes';

const registro: Record<string, VersicoEstudo> = {};

function addVS(
  capitulo: number, v: number,
  titulo: string, contextoHistorico: string,
  contextoLiterario: string, significadoTeologico: string,
  aplicacoes: string[], perguntasEstudo: string[],
  versiculosConexoes: string[]
) {
  registro[`${capitulo}:${v}`] = {
    livro: 'mt', capitulo, versiculo: v, titulo,
    contextoHistorico, contextoLiterario, significadoTeologico,
    aplicacoes, perguntasEstudo, versiculosConexoes
  };
}

// ========== CAPÍTULO 1 — ENCARNACAO ==========

addVS(1, 23,
  "Emanuel — Deus conosco: A Encarnação",
  "Mateus escreveu para judeus cristãos entre 50-70 d.C., período em que a Igreja primitiva precisava confirmar que Jesus era o Messias prometido no Antigo Testamento. A comunidade judaica disputava com fariseus e saduceus sobre a identidade de Jesus. A citação de Isaías 7:14 era conhecida no judaísmo como referência messiânica, embora os judeus não-cristãos interpretassem 'almá' como jovem, não virgem.",
  "O Evangelho de Mateus é estruturado em cinco grandes discursos (capítulos 5-7, 10, 13, 18, 23-25) intercalados por narrativas. O capítulo 1 abre com a genealogia em três grupos de 14 gerações (Abraão a Davi, Davi ao exílio, exílio a Jesus), demonstrando continuidade histórica. A encarnação marca o início da narrativa da salvação: Deus assume a natureza humana.",
  "A expressão 'Emanuel' (עמּנוּ אֵל) significa literalmente 'Deus connosco'. Mateus cita Isaías 7:14 como cumprimento profético, mas vai além do sentido original — Isaías referia-se a um nascimento no tempo do rei Acaz, enquanto Mateus aplica ao nascimento virginal de Jesus. A teologia da encarnação é central: o Verbo se fez carne (Jo 1:14), Deus não permanece distante, mas habita entre os homens. Jesus é plenamente Deus e plenamente humano, o mediador entre Céu e terra.",
  [
    "Reconhecer que Deus está presente no dia a dia, não apenas nos momentos religiosos",
    "Permitir que o 'Deus conosco' transforme as relações familiares e comunitárias",
    "Estudar as profecias messiânicas do AT para fortalecer a fé em Jesus como Cristo"
  ],
  [
    "Como a expressão 'Deus conosco' muda a forma como enfrento dificuldades?",
    "De que maneira Jesus como Emanuel se manifesta na comunidade de fé hoje?",
    "Que implicações práticas tem a encarnação para a forma como tratamos o sofrimento alheio?"
  ],
  ["Is 7:14", "Jo 1:14", "Fl 2:5-8"]
);

// ========== CAPÍTULO 2 — ADORACAO DOS MAGOS ==========

addVS(2, 1,
  "Os magos e a estrela: Busca pelo Rei dos judeus",
  "Herodes, o Grande, reinou de 37 a 4 a.C. e era conhecido por sua brutalidade — matou filhos e esposa por paranoia. Os magos (μάγοι) eram sacerdotes persas, astrólogos e conselheiros reis, provavelmente de Babilônia ou Pérsia. A chegada de estrangeiros buscando um 'Rei dos judeus' alarmou Herodes, que via seu trono ameaçado. A estrela pode ter sido alinhamento planetário (Júpiter-Saturno em 7 a.C.) ou fenômeno sobrenatural.",
  "Mateus 2 é a narrativa da infância de Jesus, complementar ao relato de Lucas (que foca em Maria e os pastores). Mateus apresenta Jesus como Rei — os magos representam as nações que se curvam diante dele. A estrutura inclui: chegada dos magos, interrogatório de Herodes, orientação divina, adoração, fuga para o Egito, retorno. A estrela guia os magos de Jerusalém a Belém.",
  "A adoração dos magos cumpre Salmos 72:10-11 ('reis de Társis e das ilhas lhe trarão presentes') e Números 24:17 ('uma estrela sairá de Jacó'). Jesus é reconhecido como Rei não pelos líderes religiosos de Jerusalém (que ignoram a profecia), mas por estrangeiros. Isso antecipa a missão universal do Evangelho: a salvação não é apenas para Israel, mas para todas as nações. O ouro representa realeza, a mirra sua humanidade e morte, o incenso sua divindade.",
  [
    "Buscar a Deus com diligência, mesmo quando o caminho não é claro",
    "Reconhecer que Deus pode usar pessoas fora do nosso círculo religioso para nos guiar",
    "Oferecer o que temos de melhor a Jesus, não o que sobra"
  ],
  [
    "O que a busca dos magos ensina sobre a disposição de Deus em se revelar a quem o busca?",
    "Por que os líderes religiosos de Jerusalém, que conheciam as Escrituras, não foram até Belém?",
    "Como as oferendas dos magos (ouro, mirra, incenso) simbolizam diferentes aspectos da pessoa de Jesus?"
  ],
  ["Nm 24:17", "Sl 72:10-11", "Is 60:3"]
);

addVS(2, 10,
  "A alegria ao ver a estrela: Experiência de encontrar a Deus",
  "Após o interrogatório de Herodes, os magos seguiram a estrela com expectativa. A expressão 'alegraram-se com alegria imensa' (ἐχάρησαν χαρὰν μεγάλην σφόδρα) é enfática no grego, indicando júbilo overwhelming. Belém ficava a cerca de 10 km ao sul de Jerusalém — a estrela reapareceu para guiá-los especificamente à casa onde Jesus estava. A tradição de que Jesus estava em uma 'casa' (não manjedoura) sugere que já havia se passado algum tempo desde o nascimento.",
  "Mateus contrasta a reação dos magos (alegria) com a de Herodes (raiva, Mt 2:16). A estrela funciona como sinal divino que guia e revela. A narrativa segue o padrão do AT: Deus guia seu povo através de sinais (coluna de fogo, nuvem). A alegria dos magos é típica de quem encontra a presença de Deus — cf. a alegria dos pastores em Lc 2:10 e a dos discípulos ao ver o Ressuscitado em Lc 24:41.",
  "A alegria dos magos é uma resposta teológica: encontrar Jesus é fonte de gozo. Esta alegria não depende das circunstâncias externas — os magos tinham acabado de passar por Herodes, um tirano perigoso. A alegria cristã é mais profunda que a felicidade superficial, pois está ancorada na presença do Salvador. Mateus mostra que a busca por Jesus é recompensada: quem procura, encontra (Mt 7:7).",
  [
    "Cultivar a alegria que vem do encontro com Jesus, não apenas de circunstâncias favoráveis",
    "Reconhecer que Deus guia etapa por etapa — a estrela reapareceu quando eles estavam perto",
    "Permitir que a presença de Jesus transforme a perspectiva sobre os problemas"
  ],
  [
    "Como a 'alegria imensa' dos magos se compara com as fontes de alegria que busco no mundo?",
    "Que papel a fidelidade na busca desempenha no encontro com Deus?",
    "De que maneira a presença de Jesus muda a forma como encaro situações difíceis?"
  ],
  ["Lc 2:10", "Sl 16:11", "Jo 15:11"]
);

addVS(2, 11,
  "A adoração e as oferendas: Entregar o que temos de melhor",
  "Os magos entraram na 'casa' (οἰκία) e viram o menino com Maria. A prostração (προσεκύνησαν) era gesto de reverência diante de reis e deuses no Oriente Próximo. As três oferendas são significativas: ouro (presente real, cf. 1 Rs 10:10), mirra (resina usada em embalsamamento, antecipando a morte de Jesus — cf. Jo 19:39), e incenso (usado no culto do templo, indicando que Jesus é Deus — cf. Êx 30:34-38). Os magos, depois de adorar, abriram seus tesouros.",
  "Mateus apresenta a adoração dos magos como modelo: primeiro reconhecem Jesus como Rei, depois oferecem. A ordem é importante — a oferenda flui da adoração, não o contrário. A adoração dos magos é semelhante à dos anjos em Ap 4:10, que lançam suas coroas diante do trono. A narrativa também mostra que Jesus não está em um palácio, mas em uma humilde casa — a realeza divina se manifesta na pobreza.",
  "A adoração dos magos revela que Deus aceita a adoração de quem vem de coração sincero, independentemente de sua origem. As oferendas representam o que havia de mais precioso para eles — não eram presentes simbólicos, mas tesouros reais. Jesus merece o que temos de melhor: nosso tempo, talentos e recursos. A generosidade na adoração é resposta à generosidade de Deus em se revelar.",
  [
    "Avaliar se ofereço a Jesus o que temos de melhor ou apenas o que sobra",
    "Entender que a verdadeira adoração envolve entrega concreta, não apenas sentimentos",
    "Reconhecer que Jesus aceita adoração de qualquer background, como aceitou os magos"
  ],
  [
    "O que nossas oferendas a Jesus revelam sobre nossas prioridades?",
    "Como equilibrar a adoração pessoal com a adoração comunitária?",
    "De que maneira a humildade da manjedoura/casa desafia nossa tendência a associar status com Deus?"
  ],
  ["1 Rs 10:10", "Jo 19:39", "Ap 4:10"]
);

// ========== CAPÍTULO 3 — JOAO BATISTA E BATISMO ==========

addVS(3, 2,
  "Arrependei-vos: O chamado de João Batista",
  "João Batista (c. 5 a.C. - 28/29 d.C.) pregava no deserto da Judeia, ao longo do Jordão. O 'deserto' (ἔρημος) evoca o Sinai e a errância de Israel — João é o novo Elias (cf. Mt 11:14). O reino dos céus (βασιλεία τῶν οὐρανῶν) é expressão típica de Mateus, que substitui 'Deus' por 'céus' por respeito judaico. A mensagem é urgente: 'já está próximo' (ἤγγικεν), indicando realização iminente, não apenas futura.",
  "Mateus 3 introduz João Batista como precursor, cumprindo Malaquias 3:1 ('enviarei meu mensageiro'). João é retratado como profeta do deserto, com vestes de pele de camelo e alimentação de gafanhotos e mel silvestre (Mt 3:4), ecoando Elias (2 Rs 1:8). A narrativa inclui: pregação de João, confronto com fariseus, batismo de Jesus e a voz do Pai. João prepara o caminho para o ministério público de Jesus.",
  "O batismo de João era um ritual de purificação, mas com significado novo: arrependimento para perdão de pecados (Mc 1:4). João distingue seu batismo (água) do batismo de Jesus (Espírito Santo e fogo — Mt 3:11). A pregação de João cumpre Isaías 40:3 ('Voz que clama no deserto'). O arrependimento (μετάνοια) significa mudança de mente e direção, não apenas sentimento de culpa. João prepara o povo para receber o Messias.",
  [
    "Examinar áreas da vida que precisam de arrependimento genuíno, não superficial",
    "Reconhecer que o arrependimento é uma mudança de direção, não apenas de sentimentos",
    "Entender que preparar o caminho para Jesus envolve拆除 ídolos e prioridades equivocadas"
  ],
  [
    "O que significa 'o reino dos céus está próximo' para a vida prática hoje?",
    "Como o chamado ao arrependimento de João se diferencia da culpa religiosa?",
    "Que áreas da minha vida resistem à mudança que Deus está pedindo?"
  ],
  ["Is 40:3", "Mc 1:4", "Lc 3:2-14"]
);

addVS(3, 17,
  "A voz do Pai: 'Este é o meu Filho amado'",
  "O batismo de Jesus ocorreu no Jordão, possivelmente perto de Beit Arbel. A descida do Espírito 'como pomba' (ὡσεὶ περιστεράν) evoca Gênesis 1:2, onde o Espírito pairava sobre as águas — um novo início da criação. A voz do Pai (φωνή ἐκ τῶν οὐρανῶν) é theophania, manifestação divina similar à que Moisés ouviu no Sinai (Êx 19:19). A declaração 'este é o meu Filho amado' (οὗτός ἐστιν ὁ υἱός μου ὁ ἀγαπητός) cita Salmos 2:7, salmo messiânico.",
  "Mateus 3:13-17 é o relato do batismo de Jesus, que marca o início de seu ministério público. A Trindade se manifesta claramente: o Filho está nas águas, o Espírito desce como pomba, o Pai fala dos céus. Esta é a primeira das três vezes que a voz do Pai é ouvida nos Evangelhos (as outras são na Transfiguração em Mt 17:5 e na entrada triunfal em Jo 12:28). Jesus não era pecador, mas se identifica com a humanidade pecadora ao ser batizado.",
  "A declaração do Pai sobre Jesus tem três dimensões: (1) identidade — 'meu Filho', (2) relacionamento — 'amado', (3) aprovação — 'em quem me agrado'. Jesus é o Filho unigênito, amado antes da fundação do mundo (Jo 17:24). A menção de 'grande contentamento' (εὐδόκησα) indica que o Pai se agrada do Filho não por obras, mas por essência. No batismo, Jesus é publicamente apresentado como o servo sofredor de Isaías 53, que cumpre a vontade do Pai.",
  [
    "Buscar a identidade filial em Deus, não em realizações ou aprovação humana",
    "Entender que Deus se agrada de nós não por mérito, mas por relacionamento em Cristo",
    "Viver na certeza de ser amado por Deus, para que isso motive a obediência"
  ],
  [
    "Como a declaração do Pai sobre Jesus influencia a forma como vejo minha própria identidade?",
    "O que significa ser 'amado por Deus' em contextos de sofrimento e dúvida?",
    "Como a manifestação da Trindade no batismo ajuda a compreender a natureza de Deus?"
  ],
  ["Sl 2:7", "Is 42:1", "Jo 1:32-34"]
);

// ========== CAPÍTULO 4 — TENTACAO E CHAMADO ==========

addVS(4, 1,
  "A tentação no deserto: Enfrentando o inimigo",
  "Jesus foi conduzido pelo Espírito ao deserto (ἔρημος) da Judeia, uma região árida ao oeste do Mar Morto. O deserto é lugar de teste no AT: Israel foi tentado no deserto por 40 anos (Dt 6:16), Elias caminhou 40 dias até o Horebe (1 Rs 19:8). Os '40 dias e 40 noites' ecoam os 40 dias do dilúvio (Gn 7:12), os 40 anos de Israel no deserto e os 40 anos de reinado de Davi e Salomão. Jesus jejua — indicando dependência do Pai, não necessidade física.",
  "Mateus 4:1-11 é o relato da tentação de Jesus, paralelo a Lc 4:1-13. Mateus apresenta as tentações em ordem diferente de Lucas, possivelmente por ênfase narrativa. A estrutura é: (1) transformar pedras em pão (necessidades físicas), (2) lançar-se do templo (presunção/espetáculo), (3) adorar Satanás por poder mundial (ambição). Cada tentação é precedida por 'Se és Filho de Deus' — Satanás ataca a identidade de Jesus. Jesus responde com 'Está escrito' (γέγραπται), citando Deuteronômio.",
  "As três tentações são protótipo de toda tentação humana: (1) satisfazer desejos legítimos por meios ilegítimos, (2) testar Deus em vez de confiar nele, (3) buscar poder sem cruz. Jesus vence onde Adão falhou — Adão comeu, Jesus jejua; Adão duvidou, Jesus confia nas Escrituras. A vitória de Jesus é a vitória do novo Adão (Rm 5:14-19). O deserto é lugar de purificação: Jesus é preparado para seu ministério não apesar do teste, mas através dele.",
  [
    "Reconhecer que os momentos de maior vulnerabilidade espiritual são após vitórias ou períodos de isolamento",
    "Preparar-se com a Palavra de Deus para enfrentar tentações específicas",
    "Entender que a tentação não é pecado — Jesus foi tentado mas não pecou"
  ],
  [
    "Como Satanás ataca a identidade de filhos de Deus hoje (Se és filho de Deus...)?",
    "De que forma as três tentações de Jesus se manifestam em desafios contemporâneos?",
    "Por que Jesus, sendo Deus, precisava passar por tentação?"
  ],
  ["Dt 6:16", "Dt 8:3", "Hb 4:15"]
);

addVS(4, 19,
  "Vinde após mim: O chamado radical dos primeiros discípulos",
  "Jesus chamou Pedro (Simão) e André enquanto pescavam no Mar da Galileia (Tiberíades). A pescaria comercial era trabalho árduo — os pescadores lançavam redes à noite ou de madrugada. 'Vinde depois de mim' (δεῦτε ὀπίσω μου) era linguagem de rabino, mas Jesus inverte a relação: normalmente o discípulo escolhe o rabino. Jesus escolhe e chama. 'Farei de vós pescadores de homens' (ποιήσω ὑμᾶς ἁλιεῖς ἀνθρώπων) é metáfora que transforma sua profissão em missão.",
  "Mateus 4:18-22 apresenta o chamado dos quatro primeiros discípulos: Pedro, André, Tiago e João. Mateus simplifica o relato comparado a Mc 1:16-20 — a resposta é imediata e sem hesitação. A narração é concisa e dramática: 'imediatamente deixaram as redes e o seguiram' (εὐθέως ἀφέντες τὰ δίκτυα ἠκολούθησαν αὐτῷ). Tiago e João deixaram o pai Zebedeu e os empregados — uma ruptura radical com o padrão de vida anterior. Mateus enfatiza a autoridade de Jesus que chama e a obediência imediata.",
  "O chamado de Jesus é pessoal e comunitário — ele chama individualmente, mas forma uma comunidade. 'Pescadores de homens' ecoa Jeremias 16:16, onde Deus envia pescadores para buscar os remanescentes. A conversão é um processo: Jesus não diz 'venham e aprendam', mas 'venham e sejam transformados'. A resposta imediata dos discípulos indica autoridade divina — apenas Deus pode inspirar obediência tão radical. O chamado implica deixar (ἀφέντες) — há um custo no seguir a Jesus.",
  [
    "Avaliar se estou disposto a deixar o que é confortável para seguir o chamado de Jesus",
    "Reconhecer que Jesus transforma nossas habilidades e experiências para seu reino",
    "Entender que o chamado é pessoal — Jesus nos chama pelo nome, não genericamente"
  ],
  [
    "O que Jesus quer transformar nas minhas habilidades e experiências para sua missão?",
    "Que 'redes' preciso deixar para seguir Jesus mais de perto?",
    "Como equilibrar o radicalismo do chamado com as responsabilidades cotidianas?"
  ],
  ["Lc 5:1-11", "Jr 16:16", "Mc 1:16-20"]
);

// ========== CAPÍTULO 5 — SERMAO DA MONTANHA: BEATITUDES ==========

addVS(5, 1,
  "As bem-aventuranças: Valores invertidos do Reino",
  "O Sermão da Montanha (Mt 5-7) é o primeiro dos cinco grandes discursos de Mateus. A 'montanha' (ὄρος) pode ser a Beatitude, ao norte do Mar da Galileia, ou uma elevação genérica. Jesus senta para ensinar — postura de rabino, indicando autoridade. As beatitudes (μακάριοι, 'bem-aventurados') são 9 declarações sobre quem é abençoado no Reino de Deus. O formato é semelhante aos Salmos de bênção (Sl 1:1), mas Jesus radicaliza ao abençoar os pobres em espírito.",
  "Mateus 5:1-12 é a introdução ao Sermão da Montanha, seguido por 6 antíteses (Mt 5:21-48) e ensinos práticos (Mt 6-7). As beatitudes formam um poema com estrutura quiasmática. Cada uma começa com 'bem-aventurados são' e termina com uma promessa. Mateus apresenta Jesus como o novo Moisés que sobe a montanha para dar a nova Lei — mas enquanto Moisés trouxe a lei externa, Jesus revela a lei do coração. As beatitudes são o perfil do cidadão do Reino.",
  "As beatitudes são radicalmente diferentes dos valores do mundo antigo e contemporâneo. O mundo celebra os poderosos, ricos e autossuficientes; Jesus abençoa os pobres, mansos e perseguidos. A primeira beatitude — 'pobres em espírito' (πτωχοὶ τῷ πνεύματι) — reconhece a dependência total de Deus. A promessa final — 'deles é o reino dos céus' — é o tema central de Mateus. As beatitudes são realidade presente ('deles é') e futura ('serão consolados'). Jesus não descreve ideais inalcançáveis, mas a vida que o Espírito produz.",
  [
    "Reavaliar valores pessoais à luz das beatitudes — o que o mundo considera 'bem-aventurança'?",
    "Cultivar a pobreza espiritual: reconhecer a necessidade diária de Deus",
    "Persistir na perseguição, entendendo que é sinal de fidelidade ao Reino"
  ],
  [
    "Por que Jesus começa pelo 'pobre em espírito' e não pela justiça ou amor?",
    "Como as beatitudes se relacionam umas com as outras — há uma progressão?",
    "Que implicações as beatitudes têm para a forma como a Igreja vive e testemunha?"
  ],
  ["Sl 1:1-6", "Is 61:1-3", "Lc 6:20-23"]
);

addVS(5, 3,
  "Bem-aventurados os pobres em espírito",
  "A expressão 'pobres em espírito' (πτωχοὶ τῷ πνεύματι) é exclusiva de Mateus — Lucas registra apenas 'pobres' (Lc 6:20). 'Pobre' (πτωχός) no grego indica mendicância, não apenas escassez. 'Em espírito' (τῷ πνεύματι) refere-se à atitude interior de dependência de Deus. No AT, os 'anawim' (humildes/pobres) eram aqueles que dependiam totalmente de Deus (Sl 9:12, 18). Jesus expande o conceito: não é pobreza material, mas reconhecimento espiritual da necessidade de Deus.",
  "A primeira beatitude é a fundação de todas as outras. Sem reconhecer a pobreza espiritual, não há espaço para a graça. Mateus apresenta Jesus como ensinador da nova aliança, onde o coração é transformado. A expressão 'deles é o reino dos céus' (αὐτῶν ἐστιν ἡ βασιλεία τῶν οὐρανῶν) é promessa presente — não 'será', mas 'é'. Os pobres em espírito já possuem o Reino. Mateus contrasta com os fariseus, que confiavam em sua própria justiça (Mt 5:20).",
  "Teologicamente, a pobreza espiritual é oposta à auto-suficiência religiosa. Os fariseus acumulavam méritos; Jesus diz que os que se reconhecem espiritualmente vazios é que herdam o Reino. Isaías 66:2 diz: 'A estes olharei com deferência: ao humilde e de espírito contrito'. A pobreza espiritual é o reconhecimento de que não podemos nos salvar — é a porta de entrada para a graça. Paulo expressa o mesmo princípio: 'Por graça sois salvos, por meio da fé' (Ef 2:8-9).",
  [
    "Examinar se há auto-suficiência espiritual que impede receber a graça de Deus",
    "Praticar a dependência diária de Deus através da oração e do estudo da Palavra",
    "Evitar o orgulho religioso que depende de méritos próprios em vez da graça"
  ],
  [
    "Como a pobreza espiritual se diferencia da pobreza material?",
    "De que forma a auto-suficiência religiosa pode ser um obstáculo à graça?",
    "O que significa viver com dependência radical de Deus no dia a dia?"
  ],
  ["Sl 9:12", "Is 66:2", "2 Co 12:9"]
);

addVS(5, 7,
  "Bem-aventurados os misericordiosos",
  "A misericórdia (ἔλεος) no AT é o amor leal de Deus por sua aliança (חֶסֶד, hesed). Misericordiosos são aqueles que praticam a compaixão ativa, não apenas sentem pena. A misericórdia é central na fé judaica — a tradição registra que 'misericórdia triunfa sobre o julgamento' (Tg 2:13). No contexto de Mateus, Jesus ensina que os discípulos devem refletir o caráter de Deus, que é 'rico em misericórdia' (Ef 2:4). A promessa — 'serão misericordiados' — indica reciprocidade divina.",
  "A quinta beatitude (Mt 5:7) está no centro do bloco das beatitudes sociais (5:7-9). Mateus estrutura as beatitudes em três grupos: (1) necessidade espiritual (5:3-5), (2) retidão ativa (5:6-9), (3) perseguição (5:10-12). A misericórdia é retidão ativa — o discípulo não apenas reconhece sua pobreza, mas age com compaixão. A parábola do servo impiedoso (Mt 18:23-35) ilustra o que acontece quando alguém recebe misericórdia mas não a pratica.",
  "Jesus conecta misericórdia recebida com misericórdia praticada. A oração do Pai Nosso pede 'perdoa-nos... como também nós perdoamos' (Mt 6:12), estabelecendo conexão entre misericórdia divina e humana. A misericórdia cristã vai além da caridade — é ver o outro como Deus nos vê, com compaixão e não com julgamento. Tiago 2:13 avisa: 'o julgamento será sem misericórdia contra quem não teve misericórdia'. A misericórdia é evidência de ter recebido misericórdia.",
  [
    "Praticar a misericórdia ativa em vez da piedade superficial",
    "Perdoar aqueles que nos ofenderam, reconhecendo o perdão que recebemos de Deus",
    "Desenvolver empatia genuína pelos que sofrem, não apenas generosidade eventual"
  ],
  [
    "Como a misericórdia praticada se diferencia da simples compaixão?",
    "Que relação existe entre perdoar e ser perdoado?",
    "De que forma a falta de misericórdia pode comprometer nossa relação com Deus?"
  ],
  ["Tg 2:13", "Ef 2:4", "Lc 10:25-37"]
);

addVS(5, 12,
  "Regozijai-vos: A alegria na perseguição",
  "A nona beatitude é a mais intensa: 'alegrai-vos e exultai' (χαίρετε καὶ ἀγαλλιᾶσθε), duplo imperativo indicando gozo profundo. 'Perseguiram-vos' (διώκουσιν) é presente contínuo — a perseguição é real e atual, não hipotética. A recompensa 'nos céus' é tanto presente (o Reino agora) quanto futura (glória eterna). Mateus escreve para cristãos que enfrentam oposição da sinagoga (expulsão em Jo 9:22) e da sociedade romana. A referência aos profetas anteriores (v. 12) conecta os discípulos à cadeia profética.",
  "As três primeiras e as três últimas beatitudes formam um quiasmo: pobreza espiritual ↔ perseguição. Mateus encerra as beatitudes com perseguição porque é a consequência natural da vida no Reino. A alegria na perseguição é paradoxal — o mundo não entende como alguém pode alegrar-se no sofrimento. Esta é a mesma alegria que Paulo e Silas tinham em Filipos (At 16:25), e que os primeiros mártires demonstravam. A perseguição é sinal de autenticidade — se você não é perseguido, algo pode estar errado.",
  "A perseguição é evidência de fidelidade ao Reino. Jesus não promete conforto, mas recompensa. A expressão 'grandes são vossas recompensas nos céus' (μεγάλος ὁ μισθὸς ὑμῶν ἐν τοῖς οὐρανοῖς) indica valor eterno, não apenas terreno. Mateus apresenta o paradoxo cristão: perder a vida para ganhá-la (Mt 16:25). A perseguição não é acidente — é consequência da luz que expõe as trevas (Jo 3:19-21). O cristão perseguido está em boa companhia: os profetas, os apóstolos e o próprio Jesus.",
  [
    "Verificar se minha fé gera alguma forma de oposição — pode indicar autenticidade",
    "Cultivar a alegria que transcende circunstâncias, ancorada na eternidade",
    "Rezar pelos perseguidores, seguindo o exemplo de Jesus (Mt 5:44)"
  ],
  [
    "Como manter a alegria quando a fé traz consequências negativas?",
    "Que formas de 'perseguição' os cristãos enfrentam no contexto brasileiro?",
    "Como distinguir perseguição legítima de consequências por erros próprios?"
  ],
  ["Lc 6:22-23", "At 5:41", "Rm 8:17"]
);

addVS(5, 14,
  "Vós sois a luz do mundo: Identidade e missão",
  "A metáfora da luz (φῶς) era poderosa no Oriente Próximo — sem ele, não havia vida noturna. Uma cidade no topo de um morro (ἐπὶ τοῦ ὄρους) era visível de longe, como Tel Aviv hoje. A metáfora de Israel como luz já existia no AT (Is 42:6, 49:6), mas Jesus a aplica aos discípulos — não apenas a Israel, mas a toda comunidade de fé. 'Luz do mundo' (φῶς τοῦ κόσμου) é título de Jesus em João 8:12; agora ele reparte essa identidade com seus seguidores.",
  "Mateus 5:14-16 é a aplicação prática das beatitudes. Depois de descrever o caráter do cidadão do Reino, Jesus diz como ele deve viver visivelmente. A estrutura é: identidade (vocês são luz) → função (não se esconda) → propósito (glorificar ao Pai). A luz não existe para si mesma — ela ilumina, revela, guia. A cidade no morro não pode ser escondida; a lâmpada não se acende para ser colocada debaixo do cântaro. A fé cristã é necessariamente pública.",
  "A luz tem dupla função: (1) iluminar o caminho — o cristão deve viver de forma que outros encontrem direção em sua vida; (2) revelar a verdade — a luz expõe o que está nas trevas, o que pode causar reação (Jo 3:19-20). A expressão 'assim brilhe a vossa luz diante dos homens' (οὕτως λαμψάτω τὸ φῶς ὑμῶν ἔμπροσθεν τῶν ἀνθρώπων) indica que a luz é evidente, não secreta. O objetivo final é 'verem as vossas boas obras e glorifiquem ao vosso Pai' — a luz aponta para Deus, não para nós.",
  [
    "Viver de forma autêntica que permita outros verem Cristo em mim",
    "Evitar o 'cristianismo secreto' que esconde a fé por medo de reação",
    "Permitir que as boas obras apontem para Deus, não para minha imagem"
  ],
  [
    "De que formas a luz cristã pode ser 'escondida' na vida prática?",
    "Como equilibrar a visibilidade da fé com a humildade?",
    "Que 'boas obras' a comunidade cristã pode realizar para glorificar a Deus na sociedade?"
  ],
  ["Is 42:6", "Jo 8:12", "Ef 5:8-14"]
);

addVS(5, 16,
  "Boas obras para glória de Deus: Visibilidade da fé",
  "A exortação 'assim brilhe a vossa luz' (οὕτως λαμψάτω τὸ φῶς ὑμῶν) é imperativo — não 'pode brilhar', mas 'deixe brilhar'. A 'luz' é manifesta em 'boas obras' (καλὰ ἔργα), expressão que em Mateus inclui justiça prática (Mt 5:16), misericórdia (Mt 6:1-4) e obediência (Mt 7:21-27). 'Deixem ver' (ὁρῶσιν) indica que a fé deve ser observável, não privada. A glória vai para o Pai ('vosso Pai que está nos céus'), não para o crente — o cristão é lâmpada, não a fonte de luz.",
  "Mateus 5:16 é o versículo que conecta identidade (v. 14-15) com motivação. A luz não brilha por mérito próprio, mas porque reflete a luz de Cristo (2 Co 4:6). As boas obras não são para ganhar salvação, mas para serem evidência dela (Ef 2:10). Mateus enfatiza que a fé sem obras é inútil (Mt 7:21-23 — 'nunca vos conheci'). A motivação correta é crucial: fazer para que outros glorifiquem a Deus, não para receber elogios humanos (Mt 6:1-4).",
  "A visibilidade da fé é um mandamento, não opcional. O cristão não pode ser 'cristão escondido' — a fé autêntica necessariamente se manifesta em ação. Porém, a motivação deve ser pura: não para demonstrar piedade, mas para refletir o caráter de Deus. As boas obras incluem: justiça social, compaixão, integridade profissional, amor aos inimigos, serviço humilde. O resultado apontado é 'glorificar ao Pai' — as obras são evidência, não causa, da salvação.",
  [
    "Realizar boas obras motivadas por amor a Deus, não por reputação pessoal",
    "Ser intencional em viver de forma que outros vejam Cristo através de minhas ações",
    "Evitar o legalismo que transforma boas obras em mérito em vez de resposta à graça"
  ],
  [
    "Como saber se minhas boas obras são para glória de Deus ou para minha imagem?",
    "Que obras práticas a comunidade cristã pode realizar para ser luz na sociedade?",
    "De que forma a motivação por trás das obras afeta seu valor espiritual?"
  ],
  ["Ef 2:10", "2 Co 4:6", "Tg 2:14-17"]
);

// ========== CAPÍTULO 6 — PAI NOSSO E PRIORIDADES ==========

addVS(6, 9,
  "Pai Nosso: A oração modelo de Jesus",
  "A oração do Pai Nosso (Πάτερ ἡμῶν) é a única oração que Jesus ensinou aos discípulos (Lc 11:1-4 registra uma versão mais curta). 'Nosso' (ἡμῶν) é plural — a oração é comunitária, não apenas individual. 'Que estais nos céus' (ὁ ἐν τοῖς οὐρανοῖς) reconhece a transcendência de Deus, mas o termo 'Pai' (Πάτερ) indica intimidade. Mateus usa 'céus' em vez de 'Deus' por respeito judaico, mas o significado é o mesmo — Deus como pai amoroso e próximo.",
  "A oração do Pai Nosso (Mt 6:9-13) é o centro do Sermão da Montanha. Mateus a posiciona após o ensino sobre não hipocrisia na oração (Mt 6:5-8). A estrutura inclui: (1) introdução — Pai, (2) três petições sobre Deus (seu nome, seu reino, sua vontade), (3) três petições sobre nós (pão diário, perdão, livramento). Jesus ensina que a oração começa com Deus, não com nós. A oração é modelo (οὕτως, 'assim'), não fórmula mecânica.",
  "O Pai Nosso revela a natureza do Deus cristão: (1) Pai — relacionamento pessoal; (2) nos céus — transcendência; (3) santificado seja o teu nome — reverência; (4) venha o teu reino — expectativa escatológica; (5) seja feita a tua vontade — submissão; (6) pão diário — dependência; (7) perdão — relacionamento restaurado; (8) livramento do mal — proteção. A oração é um compêndio do evangelho. Agostinho disse: 'Bem merecidamente o Salvador resume na oração a vida dos justos'.",
  [
    "Priorizar os aspectos de Deus (nome, reino, vontade) antes de pedidos pessoais",
    "Cultivar dependência diária — o 'pão de cada dia' é necessidade constante",
    "Perdoar antes de pedir perdão, reconhecendo a conexão entre ambas"
  ],
  [
    "Por que Jesus ensina a oração comunitária ('nosso') em vez de ('meu')?",
    "Como equilibrar as petições sobre Deus (nome, reino, vontade) com as necessidades pessoais?",
    "O que significa perdoar 'nossas dívidas como também nós perdoamos' na prática?"
  ],
  ["Lc 11:1-4", "1 Ts 5:17", "Ef 6:18"]
);

addVS(6, 33,
  "Buscai primeiro o reino: Prioridade radical",
  "A expressão 'primeiro' (πρῶτον) é advérbio de tempo e ordem — significa 'antes de tudo'. 'O reino de Deus' (τὴν βασιλείαν τοῦ θεοῦ) é o tema central do ensino de Jesus (Mt 4:17). 'Sua justiça' (τὴν δικαιοσύνην αὐτοῦ) refere-se à retidão que vem do Reino, não à justiça própria dos fariseus (Mt 6:1-6, 16-18). O versículo é a conclusão do ensino sobre ansiedade (Mt 6:25-34), onde Jesus diz para não se preocupar com comida, vestimenta e necessidades materiais.",
  "Mateus 6:33 é o versículo-chave do Sermão da Montanha sobre prioridades. Ele conecta: (1) não acumular tesouros na terra (Mt 6:19-21), (2) ter o olhar simples (Mt 6:22-23), (3) não servir a Deus e ao dinheiro (Mt 6:24), (4) não se preocupar (Mt 6:25-34). A estrutura mostra progressão: o que você ama (tesouros), como você vê (olhar), a quem você serve (senhor), e como você vive (ansiedade). Buscar primeiro o reino é a resposta para todas essas questões.",
  "A prioridade do reino não é uma opção, mas um mandamento. O 'reino' no ensino de Jesus é a soberania de Deus exercida na terra — quando a vontade de Deus é feita na terra como no céu (Mt 6:10). A justiça do reino é diferente da justiça humana: é dada por Deus (Rm 3:21-22), não conquistada por obras. A promessa é que todas as outras coisas serão acrescentadas — Deus cuida das necessidades quando ele é prioridade. Jesus não diz para não trabalhar, mas para não se ansietar.",
  [
    "Avaliar se Deus é realmente prioridade ou se está competindo com outras coisas",
    "Desenvolver um estilo de vida que reflete a centralidade do Reino",
    "Confiar que Deus supre necessidades quando ele é colocado em primeiro lugar"
  ],
  [
    "O que 'buscar primeiro o reino' significa concretamente no dia a dia?",
    "Como a ansiedade sobre necessidades materiais revela onde estão nossas prioridades?",
    "De que forma as 'outras coisas' são acrescentadas quando buscamos a Deus primeiro?"
  ],
  ["Mt 6:25-34", "Rm 14:17", "Fp 4:19"]
);

// ========== CAPÍTULO 7 — PEDIR E SERÁ DADO / SÁBIO E TOLO ==========

addVS(7, 7,
  "Pedireis e recebereis: A promessa da oração eficaz",
  "Jesus ensina três verbos de oração: pedite (αἰτεῖτε), buscai (ζητεῖτε), batei (κρούετε) — progressão de intensidade. 'E será dado' (δοθήσεται) está no passivo divino — Deus é quem dá. A parábola do amigo à meia-noite (Lc 11:5-8) ilustra a persistência. O contexto imediato é a oração (Mt 6:9-13), mas Mateus aplica ao pedir generosamente. A promessa não é que Deus dará tudo que queremos, mas que ele dá o que precisamos para o Reino.",
  "Mateus 7:7-11 é a conclusão do Sermão da Montanha sobre oração. A estrutura é: (1) três comandos (pedir, buscar, bater), (2) três promessas (receber, encontrar, abrir), (3) parábola do pai humano. A progressão indica que a oração envolve: petição (pedir), busca ativa (buscar) e insistência (bater). O versículo 11 compara Deus com pais humanos: se pais humanos dão o que é bom, quanto mais o Pai celestial. A lógica é do menor para o maior (qal wa-chomer).",
  "A oração bíblica não é wishful thinking, mas comunicação com um Pai que dá o que é bom. O 'bom' (ἀγαθόν) que o Pai dá é o que é verdadeiramente benéfico, nem sempre o que desejamos. Tiago 4:3 avisa: 'quando pedis, não recebeis, porque pedis mal'. A oração eficaz é alinhada com a vontade de Deus (1 Jo 5:14). Jesus não promete ausência de sofrimento, mas presença de Deus no sofrimento. A oração é confiança no caráter de Deus, não manipulação.",
  [
    "Orar com persistência e fé, não com ansiedade ou desespero",
    "Acreditar que Deus dá o que é bom, mesmo quando não entendemos seus caminhos",
    "Desenvolver uma vida de oração constante, não apenas em momentos de crise"
  ],
  [
    "Como a parábola do pai humano nos ajuda a entender o caráter de Deus como Pai?",
    "O que fazer quando a oração parece não ser respondida?",
    "Como distinguir entre pedidos alinhados com a vontade de Deus e desejos egoístas?"
  ],
  ["Lc 11:9-13", "1 Jo 5:14", "Rm 8:26-27"]
);

addVS(7, 24,
  "A casa construída sobre a rocha: Obediência prática",
  "A parábola do construtor sábio e tolo (Mt 7:24-27) conclui o Sermão da Montanha. A 'rocha' (πέτρα) representa Jesus e suas palavras — não apenas ouvir, mas praticar. O 'pedregulho' (ἄμμος, literalmente areia) representa ouvir sem obedecer. A metáfora da casa era familiar: construções na Galileia eram feitas sobre rocha quando possível, mas os terrenos arenosos perto do mar eram instáveis. As 'grandes chuvas, inundações e ventos' representam as provações da vida.",
  "Mateus 7:24-27 é a conclusão dramática do Sermão da Montanha. A estrutura é paralela: (1) quem ouve e pratica — casa sobre rocha — sobrevive; (2) quem ouve e não pratica — casa sobre areia — cai. A diferença não é o que ouviram (ambos ouviram), mas o que fizeram. Mateus apresenta Jesus como o novo Moisés que dá a Lei, mas a resposta é diferente: obedece por amor, não por medo. A parábola antecipa a parábola do julgamento final (Mt 25:31-46).",
  "A fé sem obras é morta (Tg 2:17). Jesus enfatiza que a vida cristã não é conhecimento teórico, mas prática diária. A expressão 'praticar estas minhas palavras' (ποιήσῃ) é imperativo — obediência ativa. A casa sobre rocha não é isenta de tempestades — todos enfrentam problemas, mas a fundação faz a diferença. A parábola é aviso solene: não basta ouvir sermões, participar de grupos, ou ter conhecimento bíblico — é preciso viver o que se ouve.",
  [
    "Avaliar se minhas palavras e ações refletem o que Jesus ensinou",
    "Investir em 'fundamento' sólido: oração, estudo bíblico, comunhão",
    "Preparar-se para tempestades com base na obediência diária, não na fé superficial"
  ],
  [
    "O que significa construir 'sobre a rocha' na prática cotidiana?",
    "Como identificar se estou ouvindo sem praticar?",
    "Que 'tempestades' testam a fundação da fé, e como me preparar?"
  ],
  ["Tg 1:22-25", "Lc 6:46-49", "1 Co 3:11"]
);

// ========== CAPÍTULO 8 — CURA DO LEPRO E TEMPESTADE ==========

addVS(8, 2,
  "A cura do leproso: Jesus toca o impuro",
  "A lepra (λέπρα) no AT era doença que causava exclusão social e ritual (Lv 13-14). O leproso era considerado imundo e devia viver fora do acampamento (Nm 5:2). Este homem se aproxima de Jesus — violação da Lei. 'Senhor, se quiseres, podes me limpar' (Κύριε, ἐὰν θέλῃς, δύνασαί με καθαρίσαι) é fé e submissão: reconhece o poder de Jesus ('podes') e sua autoridade ('se quiseres'). A expressão 'limpar' (καθαρίσαι) é técnica do AT para purificação ritual.",
  "Mateus 8:1-4 é a primeira de sete narrativas de milagres no bloco de Mt 8-9. Mateus inclui: cura do leproso (8:1-4), servo do centurião (8:5-13), sogra de Pedro (8:14-15), múltiplos curados (8:16-17), seguidores hesitantes (8:18-22), tempestade calma (8:23-27), demônios nos porcos (8:28-34). Cada milagre revela um aspecto da autoridade de Jesus. O leproso é o primeiro — Jesus toca-o, algo que nenhum judeu faria.",
  "A cura do leproso cumpre Isaías 53:4 ('ele carregou nossas doenças'). Mateus 8:17 cita explicitamente esta profecia. Jesus não apenas cura — ele 'tocou' (ἥψατο) o leproso, restaurando-o socialmente. O toque de Jesus transforma impuro em puro, ao contrário da Lei que declarava impuro quem tocava. A autoridade de Jesus vai além da Lei: ele não apenas cumpre a Lei, mas a transcende. O leproso que era excluído agora é enviado ao sacerdote para restabelecimento comunitário.",
  [
    "Reconhecer que Jesus tem poder sobre doenças, sofrimento e exclusão social",
    "Ir além das barreiras sociais e religiosas para alcançar os marginalizados",
    "Confiar na autoridade de Jesus mesmo em situações aparentemente impossíveis"
  ],
  [
    "Como o toque de Jesus desafia as barreiras sociais e religiosas de hoje?",
    "O que a cura do leproso ensina sobre a relação entre fé e ação de Deus?",
    "De que forma a exclusão social atual se assemelha à lepra bíblica?"
  ],
  ["Lv 13-14", "Is 53:4", "Mc 1:40-42"]
);

addVS(8, 26,
  "A tempestade calma: Autoridade sobre a criação",
  "A barca (πλοῖον) cruzava o Mar da Galileia (também chamado Lago de Tiberíades), que era propenso a tempestades súbitas por causa da topografia — vales adjacentes criam correntes de ar que agitam as águas. Jesus dormia (καθεύδων) — humanidade real, cansada após o ministério. Os discípulos acordam-no com 'Senhor, salva-nos, perecemos!' (Κύριε, σῶσον ἡμᾶς, ἀπολλύμεθα) — desespero genuíno. Jesus repreende os ventos e o mar, e 'sobrevém grande bonança' (ἐγένετο γαλήνη μεγάλη).",
  "Mateus 8:23-27 é a narrativa da tempestade calma, paralela a Mc 4:35-41 e Lc 8:22-25. Mateus enfatiza o poder de Jesus como criador — apenas Deus controla o mar (Sl 89:9, Jó 38:8-11). A reação dos discípulos — 'Que homem é este, que até os ventos e o mar lhe obedecem?' — revela reconhecimento parcial de sua identidade divina. Mateus usa a tempestade como metáfora das dificuldades que os discípulos enfrentarão, e de Jesus como o único que pode acalmá-las.",
  "No AT, o mar é símbolo do caos e das forças do mal (Sl 74:13-14, Is 27:1). Jesus calmar o mar demonstra que ele tem autoridade sobre todo o caos — físico e espiritual. A pergunta dos discípulos — 'Que homem é este?' — é a pergunta central de Mateus: quem é Jesus? A resposta é: ele é o Filho de Deus que tem autoridade sobre a criação. O evento prefigura a ressurreição — Jesus vence a morte (o 'mar' da morte no AT) e traz paz.",
  [
    "Confiar que Jesus está no barco mesmo quando ele parece 'dormir' (silencioso)",
    "Reconhecer que as tempestades da vida são oportunidades para testemunhar o poder de Jesus",
    "Evitar o pânico e lembrar que Jesus tem autoridade sobre toda situação"
  ],
  [
    "Por que Jesus 'dormia' durante a tempestade — o que isso revela sobre sua humanidade?",
    "Como a pergunta dos discípulos sobre a identidade de Jesus se aplica à nossa fé?",
    "Que 'tempestades' na vida testam nossa confiança em Jesus?"
  ],
  ["Sl 89:9", "Jó 38:8-11", "Mc 4:35-41"]
);

// ========== CAPÍTULO 9 — PERDÃO, MULHER CRUENTA E CEITEIROS ==========

addVS(9, 6,
  "Perdão dos pecados: Autoridade do Filho do Homem",
  "Jesus disse ao paralítico: 'Levanta-te, toma o teu leito e vai para a tua casa' (Mt 9:6). A cura física (paralisia) e o perdão dos pecados estão conectados — a doença era vista como consequência do pecado (Jo 9:2). 'Filho do Homem' (υἱὸς τοῦ ἀνθρώπου) é título que Jesus usa para si mesmo, evocando Daniel 7:13-14, onde o Filho do Homem recebe autoridade universal. Mateus apresenta Jesus como aquele que tem autoridade para perdoar pecados — prerrogativa divina (Jr 31:34).",
  "Mateus 9:1-8 é a narrativa do paralítico, paralela a Mc 2:1-12 e Lc 5:17-26. Mateus simplifica: não menciona os amigos que descem o paralítico pelo telhado. A ênfase está na autoridade de Jesus para perdoar pecados. Os escribas acusam Jesus de blasfêmia ('só Deus pode perdoar pecados'), mas Jesus prova sua autoridade pela cura física. O resultado: 'glorificaram a Deus, que concedeu tal poder aos homens' — reconhecimento de que Jesus é o mediador divino.",
  "O perdão dos pecados é o centro do ministério de Jesus. A cura física é sinal do que ele faz espiritualmente: restaura o que está quebrado. O paralítico representa a humanidade incapacitada pelo pecado — incapaz de se movimentar espiritualmente. Jesus diz 'está perdoados teus pecados' (ἀφέωνταί σου αἱ ἁμαρτίαι), presente indicando realidade atual, não futuro. O perdão não é um processo, mas uma declaração que transforma a condição do ser humano. Mateus mostra que Jesus não apenas ensina sobre perdão, mas o concede.",
  [
    "Reconhecer que o perdão de Deus é completo e imediato para quem crê",
    "Compartilhar o perdão que recebemos com outros que nos ofenderam",
    "Entender que o perdão liberta tanto quem perdoa quanto quem é perdoado"
  ],
  [
    "O que a conexão entre cura física e perdão espiritual nos ensina sobre o ministério de Jesus?",
    "Como a autoridade de Jesus para perdoar pecados afeta nossa vida diária?",
    "Que barreiras impedem as pessoas de receber o perdão de Deus hoje?"
  ],
  ["Sl 103:3", "Dn 7:13-14", "Mc 2:1-12"]
);

addVS(9, 20,
  "A mulher com fluxo de sangue: Fé persistente",
  "A mulher com 'fluxo de sangue' (ῥύσις αἵματος) sofria de hemorragia crônica, possivelmente por 12 anos. A condição a tornava ritualmente impura (Lv 15:25-27), incapaz de participar da vida comunitária, e provavelmente empobrecida pelos muitos tratamentos médicos ('gastou tudo que tinha com médicos' — Mc 5:26). 'Tocou-lhe na orla do manto' (ἥψατο τοῦ κρασπέδου) — a orla do manto (κράσπεδον) era a franja que todo judeu devia usar (Nm 15:38).",
  "Mateus 9:20-22 é a narrativa da mulher com fluxo de sangue, inserida no caminho de Jesus para a casa de Jairo (Mt 9:18-26). Mateus simplifica o relato comparado a Mc 5:25-34 — não menciona o gasto com médicos. A estrutura é: (1) a mulher se aproxima em segredo, (2) toca o manto, (3) Jesus sente o poder sair, (4) identifica a mulher, (5) declara fé. A mulher tem 'fé' (πίστις) — palavra chave em Mateus para relacionamento com Deus.",
  "A orla do manto de Jesus evoca Malaquias 4:2 ('o sol da justiça nascerá com cura em suas asas' — asas/asas são tradução de 'כנפיו', asas/franja). Jesus é o sol da justiça que traz cura. A mulher que era impura se torna pura pelo toque de Jesus — a graça vence a Lei. O 'poder' (δύναμις) que sai de Jesus é a mesma palavra grega para 'milagre' — a cura é resultado do poder divino, não da superstição do manto. A mulher é restaurada à comunidade.",
  [
    "Cultivar fé persistente que busca Jesus apesar de obstáculos",
    "Reconhecer que Jesus tem poder para restaurar o que a doença e o sofrimento quebraram",
    "Ir além da religiosidade superficial em busca do verdadeiro encontro com Cristo"
  ],
  [
    "O que a 'força' que sai de Jesus nos ensina sobre sua natureza?",
    "Como a restauração da mulher se aplica àqueles que são marginalizados hoje?",
    "O que a persistência da mulher ensina sobre a forma de buscar a Deus?"
  ],
  ["Nm 15:38", "Ml 4:2", "Mc 5:25-34"]
);

addVS(9, 35,
  "Ceiteiros e seara: A urgência da missão",
  "A expressão 'ceiteiros' (ἐργάται) significa 'trabalhadores', não 'ceifeiros' — é mais preciso. A 'seara' (θερισμός) é grande — a colheita espiritual é abundante, mas os trabalhadores são poucos. A compaixão de Jesus (ἐσπλαγχνίσθη) é visceral (literalmente 'tripas retorcidas' — sentimento profundo). Ele vê as multidões 'cansadas e dispersas como ovelhas que não têm pastor' (ἐκλελυμέναι καὶ ἐρριμμέναι) — metáfora de Israel sem liderança espiritual (Nm 27:17, 1 Rs 22:17).",
  "Mateus 9:35-38 é a conclusão do bloco de milagres (Mt 8-9) e introdução à missão (Mt 10). A estrutura é: (1) Jesus percorre as cidades e aldeias, (2) vê a multidão com compaixão, (3) declara a urgência, (4) pede oração. A 'seara' é Israel — Jesus ainda não enviou para as nações (Mt 10:5-6). O pedido de oração ('rogai ao Senhor da seara') indica que a missão é obra de Deus, não apenas esforço humano. Mateus conecta compaixão de Jesus com ação missionária.",
  "A compaixão de Jesus é o motor da missão. O padrão é: Jesus vê → Jesus sente → Jesus age. O discípulo deve seguir o mesmo padrão: ver o sofrimento, sentir compaixão, agir. A oração pelos trabalhadores não é passiva — é preparação para ser um dos trabalhadores. A missão é urgente porque a seara é madura — o tempo da colheita é limitado. Mateus antecipa a Grande Comissão (Mt 28:19-20), mas aqui o foco é Israel. A compaixão de Jesus é o modelo para a Igreja.",
  [
    "Desenvolver a compaixão de Jesus pelo sofrimento alheio",
    "Orar por trabalhadores na seara e estar disposto a ser um deles",
    "Permitir que a compaixão se converta em ação concreta de evangelização e serviço"
  ],
  [
    "O que a imagem de 'ovelhas sem pastor' nos ensina sobre a situação espiritual atual?",
    "Como a compaixão de Jesus se manifesta na Igreja hoje?",
    "Que significa ser um 'trabalhador na seara' no contexto brasileiro?"
  ],
  ["Nm 27:17", "1 Rs 22:17", "Lc 10:2"]
);

// ========== CAPÍTULO 10 — CONFESSAR CRISTO ==========

addVS(10, 32,
  "Confessar diante dos homens: Fé pública",
  "Jesus usa dois verbos de 'confessar': ὁμολογήσει (confessará, reconhecimento público) e ἀρνήσησθε (negar, rejeição). 'Confessar diante dos homens' (ὁμολογήσει ἐν ἐμοί) é reconhecimento público de Jesus como Senhor e Salvador. 'Na presença do meu Pai' indica que a confissão terrena tem consequências celestiais. Mateus escreve para cristãos enfrentando perseguição — confessar Jesus podia significar exclusão da sinagoga, perda de propriedade ou morte (At 5:41).",
  "Mateus 10:32-39 é parte do discurso missionário (Mt 10), onde Jesus prepara os discípulos para a perseguição. A estrutura é: (1) confissão tem consequências eternas (10:32-33), (2) o discípulo não traz paz, mas espada (10:34-36), (3) o custo do discipulado (10:37-39). Jesus não oferece conforto, mas realismo — seguir a Ele pode custar tudo. A confissão é o oposto da cobardia espiritual — negar Jesus é negar a própria salvação.",
  "A confissão pública é evidência de fé genuína. Romanos 10:9-10 diz: 'se confirmares com a tua boca que Jesus é o Senhor e crer em teu coração que Deus o ressuscitou dos mortos, serás salvo'. A confissão não é meramente 'dizer palavras', mas reconhecer publicamente a soberania de Jesus. Mateus apresenta a confissão como critério de juízo final (Mt 7:21-23 — 'nem todo o que me diz Senhor entrará no Reino'). A fé privada sem confissão pública é fé incompleta.",
  [
    "Manifestar publicamente a fé em Jesus, não apenas mantê-la privada",
    "Reconhecer que a confissão pública tem consequências, mas a recompensa é eterna",
    "Preparar-se para o custo do discipulado, que pode incluir rejeição e sofrimento"
  ],
  [
    "O que significa confessar Jesus 'diante dos homens' no contexto brasileiro?",
    "Como equilibrar a confissão pública com a sabedoria em contextos hostis?",
    "Que implicações a confissão tem para a forma como vivemos e testemunhamos?"
  ],
  ["Rm 10:9-10", "2 Tm 2:12", "At 5:41"]
);

addVS(10, 40,
  "Receber vocês é receber mim: Representação de Cristo",
  "A expressão 'quem recebe vocês recebe mim' (ὁ δεχόμενος ὑμᾶς ἐμὲ δέχεται) estabelece identidade entre o discípulo e Jesus. 'Receber' (δέχομαι) inclui acolher, hospedar e apoiar materialmente — prática essencial num mundo sem sistema de hotelaria. 'O que me enviou' (τὸν ἀποστείλαντά με) é o Pai — a cadeia é: Pai → Jesus → discípulos → quem os recebe. Mateus escreve num contexto onde os cristãos dependiam da hospitalidade para missão itinerante.",
  "Mateus 10:40-42 é a conclusão do discurso missionário, com promessas de recompensa. A estrutura é: (1) quem recebe os discípulos recebe Jesus, (2) quem recebe um profeta recebe recompensa de profeta, (3) quem dá um copo de água a um 'pequenino' recebe recompensa. Jesus identifica-se com os humildes — 'um destes pequeninos' (ἑνὶ τῶν μικρῶν τούτων) é frase que Mateus usa para os discípulos (Mt 18:6, 10, 14) e para os necessitados (Mt 25:40).",
  "A identificação de Jesus com seus discípulos é teologicamente profunda: servir ao irmão é servir a Cristo. A parábola do julgamento final (Mt 25:31-46) desenvolve este princípio — 'fizeram isso a um dos mais pequeninos de meus irmãos, fizeram a mim'. Mateus apresenta a graça como algo que se recebe também através de outros — a comunidade cristã é mediadora da presença de Cristo. A recompensa é proporcional: quem recebe profeta recebe 'recompensa de profeta'.",
  [
    "Rever que cada pessoa que encontramos é portadora da imagem de Deus",
    "Praticar a hospitalidade como ministério, não apenas cortesia social",
    "Reconhecer que servir aos humildes é servir diretamente a Cristo"
  ],
  [
    "Como a identificação de Jesus com seus discípulos muda a forma como tratamos os crentes?",
    "O que significa servir aos 'pequeninos' no contexto brasileiro?",
    "De que forma a hospitalidade pode ser um instrumento de evangelização?"
  ],
  ["Mt 25:31-46", "Lc 10:16", "Rm 12:13"]
);

// ========== CAPÍTULO 11 — VENHAM A MIM TODOS ==========

addVS(11, 28,
  "Venham a mim todos: O convite de Jesus",
  "A expressão 'Vinde a mim todos' (Δεῦτε πρός με πάντες) é inclusiva e universal — 'todos' (πάντες) não exclui ninguém. 'Cansados e sobrecarregados' (οἱ κοπιῶντες καὶ πεφορτισμένοι) descreve o peso da Lei rabínica com seus 613 mandamentos e interpretações. No contexto original, a carga incluía o jugo da ocupação romana e as exigências dos escribas. Jesus oferece descanso (ἀνάπαυσις) que vai além do física — é descanso da alma, restauração da relação com Deus.",
  "Mateus 11:28-30 é o convite final do discurso onde Jesus louva o Pai por se revelar aos humildes (Mt 11:25-27). A estrutura é: (1) convite universal (11:28), (2) duas opções — jugo leve vs pesado (11:29-30). 'O meu jugo é suave' (χρηστὸς) significa 'bom, útil, confortável' — não fácil, mas adequado. 'O meu fardo é leve' (ἐλαφρός) contrasta com o peso da religiosidade legalista. Jesus não promete ausência de trabalho, mas trabalho com sentido e suportável.",
  "O jugo (ζυγός) no AT era símbolo de escravidão e opressão (Lv 26:13, Jr 2:20). Jesus inverte o sentido: seu jugo é liberdade. A expressão 'aprendei de mim' (μάθετε ἀπ᾽ ἐμοῦ) indica que Jesus é mestre, mas não apenas com palavras — com exemplo. 'Sou manso e humilde de coração' (πραΰς καὶ ταπεινὸς τῇ καρδία) descreve seu caráter, o oposto dos fariseus que impõem cargas pesadas sem praticar. O descanso de Jesus é para 'as almas' — restauração espiritual profunda.",
  [
    "Buscar em Jesus o descanso que o mundo e a religiosidade não oferecem",
    "Rejeitar o legalismo que impõe cargas pesadas sem transformação do coração",
    "Aprender a mansidão e humildade de Jesus como estilo de vida, não apenas virtude"
  ],
  [
    "O que significa 'o meu jugo é suave' na prática da vida cristã?",
    "Como a religiosidade moderna pode se tornar um 'jugo pesado' como o dos fariseus?",
    "Que tipo de 'descanso' Jesus oferece — é descanso da atividade ou descanso da ansiedade?"
  ],
  ["Lv 26:13", "Jr 2:20", "Ef 5:14"]
);

// ========== CAPÍTULO 13 — PARABOLAS ==========

addVS(13, 3,
  "A parábola do semeador: Obediência ao receber a Palavra",
  "A parábola do semeador (Mt 13:3-9) é a primeira de sete parábolas no capítulo 13, o 'capítulo das parábolas'. Jesus senta ao lado do mar — postura de mestre. O semeador (σπείρων) joga sementes em quatro tipos de solo: (1) caminho — aves comem; (2) pedregulho — brota mas seca; (3) espinhos — sufocam; (4) boa terra — produz 30, 60, 100 por um. A parábola é sobre a recepção da Palavra, não sobre o semeador — Jesus semeia indiscriminadamente, a diferença está no solo.",
  "Mateus 13:3-23 inclui a parábola e sua explicação (13:18-23). Mateus é o único evangelista que inclui a explicação de Jesus. Os quatro solos representam: (1) caminho — coração endurecido, Satanás rouba; (2) pedregulho — alegria inicial sem profundidade, desiste na adversidade; (3) espinhos — preocupações mundanas e riquezas sufocam; (4) boa terra — ouve, compreende e produz fruto. A parábola ensina que a Palavra é a mesma, mas a resposta varia conforme o coração.",
  "Jesus usa parábolas cumprindo Salmo 78:2 ('abrirei a minha boca em parábolas'). As parábolas são histórias da vida real que revelam verdades do Reino. A parábola do semeador revela que: (1) a Palavra é semeada genericamente, não seletivamente; (2) a adversidade é esperada; (3) o fruto varia — nem todo cristão produz igualmente; (4) a fé genuína produz obras. Mateus apresenta Jesus como o semeador que semeia sem distinção, mas o resultado depende da receptividade do coração.",
  [
    "Examinar que tipo de 'solo' representa meu coração atualmente",
    "Remover 'pedregulhos' e 'espinhos' que impedem a Palavra de frutificar",
    "Cultivar um coração receptivo através da oração, comunhão e estudo bíblico"
  ],
  [
    "Como identificar se sou 'solo pedregulho' — alegria sem profundidade?",
    "Que 'espinhos' competem com a Palavra na vida moderna?",
    "O que significa produzir fruto de 30, 60 e 100 por um — há níveis de maturidade?"
  ],
  ["Sl 78:2", "Mc 4:3-20", "Lc 8:5-15"]
);

addVS(13, 44,
  "O tesouro escondido e a pérola: Valor do Reino",
  "A parábola do tesouro escondido (13:44) descreve um homem que encontra tesouro num campo — no Oriente Próximo, não havia bancos seguros, as pessoas enterravam valores. O campo de um terceiro podia conter tesouros de outros (guerras, invasões). A parábola da pérola de grande preço (13:45-46) é semelhante: um negociante de pérolas busca pérolas finas e encontra uma de valor incomparável. Em ambas, o personagem vende tudo para possuir o que encontrou.",
  "Mateus 13:44-46 apresenta duas parábolas complementares. A primeira é sobre um homem que encontra por acaso — o Reino pode surpreender. A segunda é sobre um negociante que busca — o Reino é encontrado por quem o busca diligentemente. 'Vendeu tudo o que tinha' (ἀπὸ τῆς χαρᾶς αὐτοῦ) indica que a alegria supera o sacrifício. Mateus enfatiza que o Reino de Deus é de valor incomparável — nenhum investimento terreno se compara.",
  "As parábolas ensinam que o Reino de Deus é o maior tesouro disponível. 'Vender tudo' não é necessariamente literal pobreza, mas disposição total de prioridades. Paulo expressou o mesmo: 'tudo considero perda pelo excelente conhecimento de Cristo Jesus, meu Senhor' (Fp 3:8). O preço não é pesado quando se reconhece o valor — quem encontra o tesouro não lamenta o que vendeu. Mateus apresenta o Reino como algo que transforma valores, não apenas acrescenta benefícios.",
  [
    "Avaliar se o Reino de Deus é realmente meu maior tesouro, ou há concorrentes",
    "Dispor-se a fazer sacrifícios quando se reconhece o valor de Cristo",
    "Buscar ativamente o Reino, não apenas esperar que ele apareça"
  ],
  [
    "O que 'vender tudo' significa na prática para diferentes pessoas?",
    "Como equilibrar a disposição de abandonar tudo com as responsabilidades cotidianas?",
    "Que 'pérolas' o mundo oferece que podem competir com o valor do Reino?"
  ],
  ["Fp 3:7-8", "Pv 2:4-5", "Mt 6:19-21"]
);

// ========== CAPÍTULO 14 — JESUS CAMINHA SOBRE AS AGUAS ==========

addVS(14, 25,
  "Jesus caminha sobre as águas: Poder sobre o caos",
  "À quarta vigília da noite (entre 3h e 6h da manhã), Jesus caminha sobre o Mar da Galileia. A barca dos discípulos estava 'assediada pelas ondas' (ἐβασανίζετο ὑπὸ τῶν κυμάτων) — verbos que indicam tortura, não apenas agitação. 'Assombraram-se' (ἐταράχθησαν) é o mesmo verbo de 'tempestade' em Mt 8:24 — os discípulos estão em pânico. Jesus diz 'Eu sou; não temais' (ἐγώ εἰμι, μὴ φοβεῖσθε) — a expressão 'Eu sou' (ἐγώ εἰμι) ecoa o nome de Deus em Êx 3:14.",
  "Mateus 14:22-33 é a narrativa de Jesus caminhando sobre as águas, paralela a Mc 6:45-52 e Jo 6:16-21. Mateus inclui o episódio de Pedro caminhando sobre as águas (14:28-31), único nos Evangelhos. A estrutura é: (1) Jesus ora sozinho, (2) tempestade no mar, (3) Jesus caminha sobre as águas, (4) medo dos discípulos, (5) 'Eu sou', (6) Pedro caminha e afunda, (7) Jesus salva. Mateus enfatiza que Jesus tem autoridade sobre o mar — divindade manifesta.",
  "No AT, caminhar sobre as águas é atributo divino (Jó 9:8 — 'Deus que alone estendeu os céus e caminha sobre as ondas do mar'). A expressão 'Eu sou' (ἐγώ εἰμι) é uma theophania — Jesus se identifica com o Deus que liberta Israel. A tentativa de Pedro de caminhar sobre as águas mostra que a fé pode fazer o impossível, mas a dúvida o afunda. Jesus 'tomou sua mão' (κρατήσας τῆς χειρός αὐτοῦ) — mesmo na falha, Jesus está próximo para socorrer.",
  [
    "Confiar que Jesus está presente mesmo quando as 'tempestades' da vida parecem esmagadoras",
    "Arriscar-se em fé, sabendo que Jesus está estendendo a mão para socorrer",
    "Reconhecer que a dúvida não nos afunda permanentemente — Jesus nos sustenta"
  ],
  [
    "O que a expressão 'Eu sou' revela sobre a identidade de Jesus?",
    "Por que Pedro afundou quando viu as ondas — o que isso ensina sobre a fé?",
    "Como as tempestades da vida podem ser oportunidades para Jesus se manifestar?"
  ],
  ["Jó 9:8", "Êx 3:14", "Mc 6:45-52"]
);

// ========== CAPÍTULO 16 — CONFISSAO DE PEDRO ==========

addVS(16, 13,
  "Quem é Jesus?: A pergunta central",
  "Jesus fez a pergunta 'Quem dizem os homens que é o Filho do Homem?' (τίνα λέγουσιν οἱ ἄνθρωποι εἶναι τὸν υἱὸν τοῦ ἀνθρώπου) em Cesareia de Filipe, ao norte do Mar da Galileia — territoridade pagã, longe do judaísmo oficial. A região tinha um templo a Pã (deus da natureza) e era conhecida como 'o portão do inferno'. Jesus escolhe este lugar para a confissão de Pedro — a fé cristã se declara no confronto com o paganismo.",
  "Mateus 16:13-20 é um dos textos mais importantes do Evangelho. A estrutura é: (1) perguntas sobre opinião pública (16:13-14), (2) pergunta pessoal (16:15), (3) confissão de Pedro (16:16), (4) declaração de Jesus (16:17-19), (5) ordem de segredo (16:20). Mateus apresenta a confissão de Pedro como clímax da seção de revelações (Mt 14-16). A opinião pública incluía João Batista, Elias, Jeremias — profetas, mas não o Messias.",
  "A confissão de Pedro — 'Tu és o Cristo, o Filho do Deus vivo' (Σὺ εἶ ὁ Χριστὸς ὁ υἱὸς τοῦ θεοῦ τοῦ ζῶντος) — é a resposta correta para a pergunta central de Mateus. 'Cristo' (Χριστός) é o ungido, Messias em hebraico. 'Filho do Deus vivo' vai além — não apenas messias humano, mas divino. Jesus responde: 'Sobre esta rocha edificarei a minha igreja' — a rocha é a confissão de Pedro (e de todos os que confessam), não Pedro pessoalmente. 'Portões do inferno' (πύλαι ᾅδου) não prevalecerão — a Igreja é invencível.",
  [
    "Fazer a pergunta pessoal: 'E eu, quem digo que Jesus é?'",
    "Confiar que a Igreja de Cristo é invencível apesar de perseguições e crises",
    "Reconhecer que a confissão de Jesus vai além do conhecimento intelectual — é entrega"
  ],
  [
    "O que muda quando a pergunta sobre Jesus passa de opinião pública para pessoal?",
    "Sobre que 'rocha' a Igreja é construída — a confissão de fé, Pedro, ou Cristo?",
    "Que 'portões do inferno' a Igreja enfrenta hoje, e por que não prevalecem?"
  ],
  ["Jo 6:68-69", "Ef 2:19-20", "1 P 2:4-5"]
);

addVS(16, 24,
  "Negar a si mesmo: O custo do discipulado",
  "Depois da confissão de Pedro e da primeira predição da paixão (Mt 16:21), Jesus ensina sobre o custo do discipulado. 'Negar a si mesmo' (ἀρνησάσθω ἑαυτόν) significa deixar de ser o centro da própria vida — não é auto-rejeição, mas reorientação. 'Tomar sua cruz' (λαμβανέτω τὸν σταυρὸν αὐτοῦ) era imagem chocante: a cruz era instrumento de execução romana. No século I, os condenados carregavam a横梁 (patibulum) até o local da crucificação. Jesus usa símbolo de morte para descrever vida.",
  "Mateus 16:24-28 é a primeira vez que Jesus menciona a cruz (antes da paixão). A estrutura é: (1) negar a si mesmo, (2) tomar a cruz, (3) seguir a Jesus, (4) salvar/perder a vida. A ordem importa: primeiro negar, depois carregar, depois seguir. 'Negar' não é esconder a fé, mas submeter a própria vontade à de Deus. 'Perder a vida' (ἀπολέσῃ τὴν ψυχὴν αὐτοῦ) não é necessariamente martírio, mas disposição para sofrer por causa de Jesus.",
  "O paradoxo cristão é central aqui: 'quem quiser salvar a sua vida, perdê-la-á; e quem perder a sua vida por mim, achá-la-á' (Mt 16:25). A cruz não é sofrimento vazio, mas sofrimento com propósito — seguir a Jesus. Paulo expressa: 'tenho por perda todas as coisas... para ganhar a Cristo' (Fp 3:8). A cruz é símbolo de morte e ressurreição — morrer para si mesmo para viver para Cristo. Mateus apresenta o discipulado como um caminho de entrega total, não de conforto.",
  [
    "Identificar áreas da vida onde 'negar a si mesmo' é necessário",
    "Aceitar que o caminho cristão pode incluir sofrimento, mas sempre com propósito",
    "Liberar o controle da própria vida em favor da vontade de Jesus"
  ],
  [
    "O que 'tomar a cruz' significa para quem não enfrenta perseguição física?",
    "Como o paradoxo de salvar e perder a vida se aplica às decisões diárias?",
    "Que aspectos da vida moderna competem com a centralidade de Cristo?"
  ],
  ["Lc 9:23-25", "Gl 2:20", "Fp 3:7-8"]
);

// ========== CAPÍTULO 17 — TRANSFIGURACAO ==========

addVS(17, 1,
  "A transfiguração: Glória de Deus revelada",
  "Jesus levou Pedro, Tiago e João a uma 'alta montanha' (ὄρος ὑψηλόν) — possivelmente o Monte Tabor ou o Monte Hermon. 'Seis dias depois' conecta com a predição da paixão (Mt 16:21-28) — a transfiguração é resposta à cruz. 'Transfigurou-se diante deles' (μετεμορρώθη ἔμπροσθεν αὐτῶν) — μεταμορφόω significa 'mudar de forma', o mesmo verbo de Rm 12:2 (ser transformado). 'Seu rosto brilhou como o sol' (τὸ πρόσωπον αὐτοῦ ἔλαμψεν ὡς τὸ φῶς) ecoa o rosto de Moisés ao descer do Sinai (Êx 34:29).",
  "Mateus 17:1-8 é a narrativa da transfiguração, paralela a Mc 9:2-8 e Lc 9:28-36. Mateus inclui: (1) subida à montanha, (2) transfiguração de Jesus, (3) aparecimento de Moisés e Elias, (4) proposta de Pedro, (5) nuvem e voz do Pai, (6) medo dos discípulos, (7) Jesus toca e consola. Mateus apresenta a transfiguração como antecipação da glória pós-ressurreição — Jesus não muda, mas sua glória divina se manifesta temporariamente.",
  "A transfiguração revela a identidade divina de Jesus de forma inconfundível. Moisés (representando a Lei) e Elias (representando os Profetas) aparecem — Jesus cumpre toda a Escritura. A voz do Pai repete a declaração do batismo (Mt 3:17): 'Este é o meu Filho amado, em quem me agrado; ouvi-o'. A adição de 'ouvi-o' (ἀκούετε αὐτοῦ) indica que Jesus é a autoridade final — acima da Lei e dos Profetas. A nuvem (νεφέλη) é shekinah, a presença divina que enchia o templo.",
  [
    "Reconhecer que Jesus não é apenas mestre ou profeta — ele é o Filho de Deus em glória",
    "Entender que a transfiguração antecipa a ressurreição — a cruz não é o fim",
    "Cultivar momentos de 'montanha' na fé — encontros com Deus que renovam a esperança"
  ],
  [
    "O que a presença de Moisés e Elias ao lado de Jesus nos ensina sobre o AT?",
    "Por que Pedro queria construir tendas — o que isso revela sobre a experiência humana diante de Deus?",
    "Como a transfiguração ajuda a enfrentar os momentos de 'vale' na vida cristã?"
  ],
  ["Êx 34:29-35", "2 P 1:16-18", "Mc 9:2-8"]
);

// ========== CAPÍTULO 18 — CRIANCAS COMO MODELO ==========

addVS(18, 2,
  "As crianças como modelo: Humildade no Reino",
  "Os discípulos perguntaram 'Quem é o maior no reino dos céus?' (Mt 18:1) — pergunta de ambiciosa política. Jesus 'chamou uma criança' (παιδίον) e a colocou no meio deles. No mundo antigo, crianças (até 6-7 anos) não tinham status social, não eram educadas, e dependiam totalmente dos adultos. Jesus inverte a hierarquia: o maior é o menor. 'Converter-se e tornar-se como crianças' (στραφῆτε καὶ γένησθε ὡς τὰ παιδία) não é ingenuidade, mas dependência e humildade.",
  "Mateus 18:1-5 apresenta o ensino sobre humildade através da criança, paralelo a Mc 9:33-37 e Lc 9:46-48. Mateus adiciona: 'se não vos converterdes e vos tornardes como as crianças, de modo nenhum entrareis no reino dos céus' (18:3). 'Converter-se' (στραφῆτε) é o mesmo verbo de 'arrependimento' (metanoia) — mudança de direção. A criança é modelo não por inocência, mas por posição: humildade, dependência, confiança. 'Receber uma criança em meu nome' é receber a Cristo.",
  "A humildade cristã é radicalmente diferente da humildade filosófica grega, que buscava auto-suficiência. Jesus ensina que a entrada no Reino requer tornar-se como a criança: reconhecer que não nos bastamos, que precisamos de Deus como uma criança precisa dos pais. A expressão 'os pequeninos' (τῶν μικρῶν) em Mateus é um conceito teológico que inclui crianças, humildes, marginalizados e discípulos vulneráveis (Mt 18:6, 10, 14, 25:40). Receber os humildes é receber a Cristo.",
  [
    "Reconhecer a necessidade de humildade genuína, não falsa modéstia",
    "Cultivar dependência de Deus como uma criança depende dos pais",
    "Proteger os 'pequeninos' — os vulneráveis e marginalizados da comunidade"
  ],
  [
    "Que características de uma criança Jesus quer que cultivemos — e quais ele não quer?",
    "Como a humildade cristã se diferencia da auto-depreciação ou da passividade?",
    "De que forma a Igreja pode ser mais 'como crianças' em vez de institucional e orgulhosa?"
  ],
  ["Mc 9:33-37", "Lc 9:46-48", "1 P 5:5-6"]
);

addVS(18, 12,
  "A ovelha perdida: Compasividade divina",
  "A parábola da ovelha perdida (Mt 18:12-14) responde à questão de Mateus 18:1 ('quem é o maior?'). A imagem de um pastor que deixa 99 para buscar uma era inesperada — economicamente irracional. 'Nonaginta e nove' (ἐνενήκοντα ἐννέA) era número que os ouvintes entendiam como 'quase todas' — o pastor arrisca a maioria por uma. 'Não quer que nenhuma delas se perca' (οὐ θέλει ἵνα ἀπόληται) declara a vontade de Deus pela salvação de cada pessoa.",
  "Mateus 18:12-14 é a parábola da ovelha perdida, paralela a Lc 15:3-7 (onde inclui as parábolas da moeda perdida e do filho pródigo). Mateus a usa para ilustrar o cuidado com os 'pequeninos' — os vulneráveis na comunidade. A estrutura é: (1) ovelha perdida entre cem, (2) pastor deixa as 99, (3) busca até encontrar, (4) alegra-se com os vizinhos, (5) 'assim não é vontade do Pai celestial que se perca um destes pequeninos'.",
  "A parábola revela o caráter de Deus: ele busca ativamente os perdidos, não espera passivamente. 'Busca até encontrá-la' (ζητεῖ τὴν ἀπολωλυῖαν) indica perseverança — Deus não desiste. A alegria do pastor ('alegra-se mais com ela do que com as que não se perderam') reflete a alegria divina pela salvação de um pecador (Lc 15:7). Mateus enfatiza que cada 'pequenino' tem valor infinito aos olhos de Deus — ninguém é descartável.",
  [
    "Cuidar dos que se afastaram da comunidade de fé, não apenas dos fiéis",
    "Reconhecer que Deus busca cada pessoa individualmente — ninguém é número",
    "Celebrar com alegria a restauração de quem foi encontrado"
  ],
  [
    "O que a 'perda' de uma ovelha entre cem nos ensina sobre o valor individual?",
    "Como a Igreja pode ser mais eficaz em buscar os que se afastaram?",
    "De que forma a alegria do pastor desafia nossa tendência a julgar os que voltam?"
  ],
  ["Lc 15:3-7", "1 P 2:25", "Is 53:6"]
);

// ========== CAPÍTULO 19 — CRIANCAS E RIQUEZAS ==========

addVS(19, 14,
  "Deixem vir as crianças: Acesso ao Reino",
  "Os discípulos repreendiam as pessoas que traziam crianças a Jesus — provavelmente porque Jesus era um mestre importante e as crianças não tinham estatura social para tal honra. Jesus disse: 'Deixai vir as crianças e não as impeçais, porque delas é o reino dos céus' (ἄφετε τὰ παιδία καὶ μὴ κωλύετε αὐτὰ ἐλθεῖν πρός με). 'Não as impeçais' (μὴ κωλύετε) é imperativo forte — é proibido bloquear o acesso das crianças a Jesus.",
  "Mateus 19:13-15 é o episódio das crianças, paralelo a Mc 10:13-16 e Lc 18:15-17. Mateus simplifica o relato — não menciona que Jesus 'tomou as crianças nos braços' (Mc 10:16). A declaração 'delas é o Reino dos céus' (αὐτῶν γάρ ἐστιν ἡ βασιλεία τῶν οὐρανῶν) repete Mt 18:3. Mateus conecta este episódio com o ensino anterior sobre humildade (Mt 18:1-5) e antecipa a bênção que Jesus dará aos pobres e humildes ao longo do ministério.",
  "Jesus não apenas tolera crianças — ele as coloca como modelo e herdeiras do Reino. No mundo antigo, as crianças eram 'vistas e não ouvidas'; Jesus as coloca no centro. A expressão 'delas é o Reino' é presente — as crianças já possuem o Reino pela fé, não por mérito. A Igreja primitiva interpretou isso como chamado para cuidar dos órfãos, abandonados e vulneráveis. Tiago 1:27 define 'religião pura' como cuidar de órfãos e viúvas.",
  [
    "Valorizar as crianças não apenas como 'futuro da Igreja', mas como presentes do Reino",
    "Remover barreiras que impedem crianças e jovens de conhecer Jesus",
    "Aprender com a fé simples e dependente das crianças"
  ],
  [
    "O que as crianças ensinam sobre a natureza da fé que adultos frequentemente perdem?",
    "De que forma a Igreja pode ser mais inclusiva para crianças e famílias?",
    "Como o valor de Jesus pelas crianças desafia práticas culturais que as marginalizam?"
  ],
  ["Mc 10:13-16", "Tg 1:27", "Mt 18:1-5"]
);

addVS(19, 28,
  "Juízes de Israel: Autoridade escatológica",
  "Jesus disse aos discípulos: 'vós que me seguis, na regeneração, quando o Filho do Homem se assentar no trono da sua glória, assentar-vos-eis também vós sobre doze tronos, julgando as doze tribos de Israel' (Mt 19:28). 'Na regeneração' (ἐν τῇ παλιγγενεσίᾳ) refere-se à era messiânica — a restauração de todas as coisas (At 3:21). 'Doze tronos' indica autoridade dada aos apóstolos — Judas será substituído por Matias (At 1:15-26).",
  "Mateus 19:28-29 é a promessa escatológica para os discípulos que deixaram tudo para seguir Jesus. A estrutura é: (1) promessa de autoridade no Reino futuro, (2) promessa de recompensa (vida eterna). 'Deixou casas, irmãos, etc.' ecoa a parábola do tesouro (Mt 13:44-46) — o que é deixado por Jesus é recompensado multiplicado. Mateus conecta sacrifício presente com recompensa futura, sem negar a realidade do sofrimento.",
  "A promessa de 'doze tronos' é exclusiva de Mateus e reflete a autoridade da Igreja primitiva. A 'regeneração' (παλιγγενεσία) é termo raro no NT — aparece apenas aqui e em Tito 3:5. Refere-se à nova criação (Is 65:17, Ap 21:1). Jesus garante que o sacrifício dos discípulos não é em vão — há recompensa concreta e específica. A vida eterna (ζωὴν αἰώνιον) não é apenas existência futura, mas qualidade de vida que começa agora e se perpetua.",
  [
    "Confiar que Deus reconhece e recompensa cada sacrifício feito em seu nome",
    "Manter a perspectiva eterna em meio às dificuldades presentes",
    "Liderar com humildade e responsabilidade, sabendo que há prestação de contas"
  ],
  [
    "O que a imagem de 'doze tronos' nos ensina sobre a autoridade da Igreja?",
    "Como equilibrar a recompensa futura com a fidelidade presente?",
    "Que 'casas e famílias' são mais difíceis de deixar por Jesus hoje?"
  ],
  ["At 3:21", "Ap 21:1-5", "Tg 1:12"]
);

// ========== CAPÍTULO 20 — FILHO DO HOMEM VEIO SERVIR ==========

addVS(20, 28,
  "Filho do Homem veio servir: Liderança sacrificial",
  "A expressão 'o Filho do Homem não veio para que lhe servissem, mas para servir' (ὁ υἱὸς τοῦ ἀνθρώπου οὐκ ἦλθεν ἵνα διακονηθῇ ἀλλ᾽ ἵνα διακονήσῃ) inverte a expectativa messiânica — o Messias seria rei glorioso, não servo. 'Dar a sua vida em resgate por muitos' (δοῦναι τὴν ψυχὴν αὐτοῦ λύτρον ἀντὶ πολλῶν) usa λύτρον (resgate), palavra que no AT se refere à redenção de escravos (Lv 25:47-49). 'Por muitos' (ὑπὲρ πολλῶν) pode ser traduzido 'em lugar de muitos'.",
  "Mateus 20:28 é o versículo central do Evangelho — o resumo da missão de Jesus. Mateus o posiciona após o episódio da mãe de Tiago e João (Mt 20:20-28), onde os discípulos pedem posições de poder. Jesus responde com o modelo do servo: 'entre vós, não é assim' (20:26). A estrutura contrasta: (1) os governantes do mundo exercem autoridade (20:25), (2) entre vós, o maior deve ser servo (20:26-27), (3) o Filho do Homem veio servir e dar sua vida (20:28).",
  "A missão de Jesus é definida por dois verbos: servir (διακονέω) e dar (δίδωμi). Servir é ação cotidiana; dar a vida é o牺牲 supremo. O resgate (λύτρον) conecta Jesus ao Cordeiro da Páscoa (Êx 12:13) e ao Servo Sofredor de Isaías 53:12 ('dará a sua vida em resgate'). Mateus apresenta Jesus como o servo-rei que conquista não por poder, mas por sacrifício. A liderança cristã é diferente: quem quer ser maior, deve ser servo.",
  [
    "Praticar a liderança de serviço, não de domínio",
    "Reconhecer que cada ato de serviço é participation na missão de Jesus",
    "Despojar-se de privilégios para servir aos outros, como Jesus fez"
  ],
  [
    "O que a palavra 'resgate' nos ensina sobre a natureza da salvação?",
    "Como a liderança de serviço se aplica em ambientes de trabalho, família e igreja?",
    "De que forma o exemplo de Jesus desafia modelos de liderança baseados em poder?"
  ],
  ["Is 53:10-12", "Mc 10:45", "Ef 5:25-27"]
);

// ========== CAPÍTULO 21 — ENTRADA TRIUNFAL E PURIFICACAO ==========

addVS(21, 9,
  "Hosana ao Filho de Davi: Entrada triunfal",
  "A entrada em Jerusalém ocorreu no domingo, início da semana da Páscoa. Jesus montou em um jumento (ὄνον) e um potro (πῶλον), cumprindo Zacarias 9:9 ('eis o teu Rei vem humilde, montado em jumento'). 'Hosana' (ὡσαννά) é hebraico 'salva agora!' — grito de louvor e súplica. 'Abençoado o que vem em nome do Senhor' (εὐλογημένος ὁ ἐρχόμενος ἐν ὀνόματι Κυρίου) é citação de Salmo 118:26, usado na liturgia do templo.",
  "Mateus 21:1-11 é a narrativa da entrada triunfal, paralela a Mc 11:1-10, Lc 19:28-40 e Jo 12:12-19. Mateus inclui o detalhe do jumento e potro, cumprindo Zacarias 9:9. A multidão espalha suas vestes e ramos de palmeira — gesto de recepção real (cf. 2 Rs 9:13, quando Jeú é proclamado rei). A pergunta 'Quem é este?' (τίς ἐστιν οὗτος) ecoa Mt 16:13 — a multidão responde corretamente: 'Jesus, o profeta de Nazaré da Galileia'.",
  "A entrada triunfal cumpre Zacarias 9:9 — 'o teu Rei vem humilde, montado em jumento'. No AT, a montaria real era cavalo (1 Rs 1:33); o jumento indica humildade e paz. Jesus é o Rei que chega não para guerra, mas para salvação. O grito 'Hosana' (Sl 118:25-26) era litúrgico — o povo reconhece em Jesus o messias prometido. Mateus apresenta a entrada como coroamento paradoxal: o Rei entra em sua capital para morrer, não para governar politicamente.",
  [
    "Reconhecer que Jesus é Rei, mas de um Reino baseado em humildade e serviço",
    "Celebrar a presença de Jesus com entusiasmo genuíno, não religiosidade formal",
    "Entender que a entrada triunfal aponta para a cruz — o caminho da salvação é o sacrifício"
  ],
  [
    "O que o jumento (em vez de cavalo) nos ensina sobre o tipo de Reino que Jesus inaugura?",
    "Como equilibrar o louvor público com a fidelidade no sofrimento?",
    "Que 'hosana' eu preciso gritar na minha situação atual?"
  ],
  ["Zc 9:9", "Sl 118:25-26", "2 Rs 9:13"]
);

addVS(21, 12,
  "Purificação do templo: Zelo pela casa de Deus",
  "Jesus entrou no templo e expulsou os que vendiam e compravam, derrubou as mesas dos cambistas e os bancos dos que vendiam pombas. O templo de Herodes era enorme — o pátio dos gentios (onde estavam os mercadores) media cerca de 300x400 metros. 'Minha casa será chamada casa de oração' (οἰκός προσευχῆς) cita Isaías 56:7. 'Mas vós a fazeis caverna de ladrões' (σπήλαιον λῃστῶν) adapta Jeremias 7:11. Jesus não condena o comércio em si, mas a exploração nos pátios do templo.",
  "Mateus 21:12-13 é a purificação do templo, paralela a Mc 11:15-18 e Lc 19:45-48. Mateus inclui: (1) expulsão dos vendedores, (2) derrubamento das mesas, (3) cura dos cegos e coxos no templo, (4) citação de Isaías 56:7 e Jeremias 7:11. A estrutura mostra que Jesus purifica o templo para que funcione como Deus planejou — casa de oração para todas as nações (Is 56:7). Os sumos sacerdotes e escribas buscavam matar Jesus após este ato (21:15-16).",
  "A purificação do templo é ato profético que antecipa a destruição do templo em 70 d.C. (Mt 24:1-2). No AT, Elias e Jeremias também confrontaram a corrupção no culto (1 Rs 18:20-40, Jr 7). Jesus assume autoridade sobre o templo — ele é o novo templo (Jo 2:19-21). A frase 'casa de oração para todas as nações' revela o plano universal de Deus — o templo não era apenas para Israel, mas para todos os povos. A expulsão dos mercadores restaura a propósito original do local.",
  [
    "Examinar se há 'mercadores' no templo atual — práticas que desonram o culto a Deus",
    "Defender que a casa de Deus seja de oração, não de exploração",
    "Reconhecer que Jesus tem autoridade para purificar o que está corrompido"
  ],
  [
    "O que a purificação do templo nos ensina sobre a justiça de Deus?",
    "De que forma a 'casa de oração para todas as nações' se aplica à Igreja global?",
    "Que práticas modernas podem se assemelhar ao 'comércio no templo'?"
  ],
  ["Is 56:7", "Jr 7:11", "1 Rs 18:20-40"]
);

// ========== CAPÍTULO 22 — GRANDE MANDAMENTO ==========

addVS(22, 37,
  "Amar a Deus: O primeiro e grande mandamento",
  "O fariseu (νομικός, advogado da Lei) testou Jesus com a pergunta sobre o maior mandamento. Os rabinos listavam 613 mandamentos — tentavam resumi-los em um. Jesus cita Deuteronômio 6:5 (Shemá): 'Amarás o Senhor, o teu Deus, de todo o teu coração, de toda a tua alma e de todo o teu entendimento'. 'De todo o coração' (ἐξ ὅλης τῆς καρδίας σου) inclui emoções; 'de toda a alma' (ἐξ ὅλης τῆς ψυχῆς σου) inclui vida; 'de todo o entendimento' (ἐξ ὅλης τῆς διανοίας σου) inclui mente.",
  "Mateus 22:34-40 é o diálogo sobre o maior mandamento. A estrutura é: (1) pergunta do fariseu (22:35-36), (2) resposta de Jesus com o Shemá (22:37-38), (3) segundo mandamento semelhante (22:39), (4) resumo dos dois mandamentos (22:40). Mateus apresenta Jesus como autoridade final sobre a Lei — ele não cita um entre 613, mas resume a Torá inteira em dois mandamentos. 'Todos os profetas e a Lei dependem disto' (ἐν τούτοις τοῖς δυσὶν ἐντολαῖς ὅλος ὁ νόμος καὶ οἱ προφῆται κρέμανται).",
  "O amor a Deus em Deuteronômio 6:5 é o mandamento central do judaísmo. Jesus expande ao conectar com o amor ao próximo (Lv 19:18). A estrutura revela: (1) amor vertical — a Deus com totalidade; (2) amor horizontal — ao próximo como a si mesmo. Não são dois mandamentos, mas um com duas faces. João 13:34 adiciona o mandamento novo: 'amai-vos uns aos outros como eu vos amei'. O amor cristão vai além do amor natural — é amor que se sacrifica, como o amor de Jesus na cruz.",
  [
    "Avaliar se amo a Deus com totalidade — coração, alma e entendimento",
    "Desenvolver um amor genuíno pelo próximo que vai além da tolerância",
    "Integrar emoção, vida e mente no amor a Deus — não apenas sentimento ou razão"
  ],
  [
    "O que significa amar a Deus 'de todo o entendimento' — como a mente se envolve no amor?",
    "Como o amor ao próximo se relaciona com o amor a Deus — pode haver um sem o outro?",
    "Que desafios o amor radical de Jesus apresenta em relações difíceis?"
  ],
  ["Dt 6:4-5", "Lv 19:18", "Jo 13:34-35"]
);

// ========== CAPÍTULO 24 — EVANGELHO E VOLTA ==========

addVS(24, 14,
  "O evangelho será pregado: Missão universal",
  "Jesus disse: 'este evangelho do Reino será pregado em todo o mundo, para testemunho a todas as nações, e então virá o fim' (τοῦτο τὸ εὐαγγέλιον τῆς βασιλείας κηρυχθήσεται ἐν ὅλῳ τῷ κόσμῳ εἰς μαρτύριον πᾶσιν τοῖς ἔθνεσιν, καὶ τότε ἥξει τὸ τέλος). 'Em todo o mundo' (ἐν ὅλῳ τῷ κόσμῳ) é universal — não apenas Israel. 'Para testemunho a todas as nações' (εἰς μαρτύριον πᾶσιν τοῖς ἔθνεσιν) indica que a pregação é evidência, não necessariamente conversão de todos. Mateus escreve em contexto onde a missão já começou.",
  "Mateus 24:14 é parte do Discurso Escatológico (Mt 24-25), onde Jesus descreve os sinais da volta. A estrutura inclui: (1) destruição do templo (24:1-2), (2) sinais da volta (24:3-14), (3) abominação da desolação (24:15-22), (4) vinda do Filho do Homem (24:29-31), (5) parábolas da vigilância (24:32-25:13), (6) julgamento (25:31-46). O versículo 14 é o clímisso dos sinais: o evangelho deve alcançar todas as nações antes do fim.",
  "A pregação do evangelho a todas as nações cumpre a promessa feita a Abraão: 'em ti serão benditas todas as famílias da terra' (Gn 12:3). Mateus, que escreveu para judeus, inclui a missão universal como plano de Deus desde o início. A Grande Comissão (Mt 28:19-20) expande este mandato. O 'fim' (τὸ τέλος) não é necessariamente o fim do mundo, mas o fim da era presente. A missão é urgente porque o retorno de Jesus depende, em parte, do alcance global do evangelho.",
  [
    "Participar ativamente da missão de levar o evangelho a todos os povos",
    "Apoiar missionários e iniciativas de evangelização global",
    "Reconhecer que a volta de Jesus está relacionada com a missão da Igreja"
  ],
  [
    "O que significa 'o evangelho será pregado em todo o mundo' na era digital?",
    "Como a urgência da missão deve afetar prioridades pessoais e comunitárias?",
    "Que nações ou grupos ainda precisam ouvir o evangelho — e o que posso fazer?"
  ],
  ["Gn 12:3", "Mt 28:19-20", "Rm 10:14-15"]
);

addVS(24, 35,
  "Céus e terra passarão: A Palavra permanece",
  "Jesus disse: 'Céus e terra passarão, mas as minhas palavras não passarão' (ὁ οὐρανὸς καὶ ἡ γῆ παρελεύσονται, οἱ δὲ λόγοι μου οὐ μὴ παρέλθωσιν). 'Não passarão' (οὐ μὴ παρέλθωσιν) é dupla negativa no grego — enfatiza certeza absoluta. Os céus e a terra são vistos como permanentes no AT (Sl 102:25-27, Is 40:8), mas Jesus diz que sua Palavra é mais permanente que a criação. 'Não sabeis nem o dia nem a hora' (24:36) adiciona mistério — mesmo Jesus (como Filho do Homem) não declara o momento exato.",
  "Mateus 24:35-36 é a transição entre os sinais da volta e o aviso de vigilância. A estrutura é: (1) permanência da Palavra de Jesus, (2) ignorância sobre o dia exato, (3) parábola dos dias de Noé (24:37-39), (4) apelo à vigilância (24:42-44). Mateus usa a comparação entre a Palavra de Jesus e a criação para estabelecer autoridade: se até o céu e a terra são temporários, quanto mais os eventos passageiros. A Palavra de Jesus é a única realidade permanente.",
  "A declaração de Jesus sobre a permanência de sua Palavra tem profundas implicações: (1) as profecias se cumprirão — ele não é um falso profeta; (2) a história tem direção e propósito — não é cíclica; (3) as promessas de salvação são seguras — não dependem de circunstâncias mutáveis. Isaías 40:8 já dizia: 'seca a erva, murcha a flor, mas a palavra do nosso Deus permanece para sempre'. Mateus conecta a autoridade de Jesus com a confiabilidade de suas palavras.",
  [
    "Confiar que as promessas de Deus são mais permanentes que qualquer circunstância",
    "Estudar e memorizar a Palavra de Jesus como fundamento da vida",
    "Viver com urgência, sabendo que o retorno é certo embora o momento seja desconhecido"
  ],
  [
    "O que a permanência da Palavra de Jesus nos ensina sobre prioridades na vida?",
    "Como viver com urgência sem cair no medo ou na especulação sobre o fim?",
    "Que promessas de Jesus são especialmente preciosas em tempos de crise?"
  ],
  ["Is 40:8", "Sl 102:25-27", "2 P 3:10-13"]
);

addVS(24, 44,
  "Estai preparados: Vigilância constante",
  "Jesus disse: 'Portanto, também vós estai preparados, porque o Filho do Homem virá numa hora em que não pensais' (διὰ τοῦτο καὶ ὑμεῖς γίνεσθε ἑτοῖμοι, ὅτι ἐν ᾗ ὥρᾳ οὐ δοκεῖτε ὁ υἱὸς τοῦ ἀνθρώπου ἔρχεται). 'Em hora que não pensais' indica que a volta será inesperada. A parábola do servo fiel e mau (Mt 24:45-51) ilustra: o servo que se prepara é recompensado; o que se embriaga e maltrata os outros é punido. A vigilância não é passiva, mas ativa fidelidade.",
  "Mateus 24:44-25:13 é a seção das parábolas da vigilância. Mateus inclui: (1) servo fiel e mau (24:45-51), (2) dez virgens (25:1-13), (3) talentos (25:14-30), (4) julgamento das nações (25:31-46). O tema comum é preparação para a volta de Jesus. 'Estai preparados' (γίνεσθε ἑτοῖμοι) é imperativo — preparação é responsabilidade. Mateus enfatiza que a espera não é ociosa, mas produtiva — os servos fiéis administram o que lhes foi confiado.",
  "A exortação à vigilância é constante nos Evangelhos: 'vigiai e orai' (Mt 26:41), 'estai alerta' (Mc 13:33). Mateus apresenta a volta de Jesus como certa, mas o momento como incerto — a combinação gera urgência ética. A preparação não é medo, mas responsabilidade: 'bem-aventurado aquele servo a quem o senhor, quando vier, achar fazendo assim' (Mt 24:46). O julgamento não é sobre conhecimento profético, mas sobre fidelidade no cotidiano.",
  [
    "Viver cada dia como se Jesus pudesse voltar, sem medo mas com responsabilidade",
    "Administrar bem os 'talentos' que Deus confiou — tempo, recursos, dons",
    "Evitar a distração com as coisas do mundo que adormecem a fé"
  ],
  [
    "Como a certeza da volta de Jesus muda as prioridades diárias?",
    "O que significa 'preparado' na prática — é apenas fé ou inclui obras?",
    "Como as parábolas da vigilância se aplicam a diferentes contextos de vida?"
  ],
  ["Mc 13:33-37", "1 Ts 5:2-6", "2 P 3:10-12"]
);

// ========== CAPÍTULO 25 — JULGAMENTO DAS NACOES ==========

addVS(25, 31,
  "O Filho do Homem em sua glória: Juiz universal",
  "Quando 'o Filho do Homem vier em sua glória, e todos os santos anjos com ele, assentar-se-á sobre o trono da sua glória' (ὅταν ἔλθῃ ὁ υἱὸς τοῦ ἀνθρώπου ἐν τῇ δόξῃ αὐτοῦ καὶ πάντες οἱ ἄγγελοι οἱ ἅγιοι μετ᾽ αὐτοῦ, τότε καθίσει ἐπὶ θρόνου δόξης αὐτοῦ). A imagem evoca Daniel 7:13-14, onde o Filho do Homem recebe autoridade universal. 'Todas as nações' (πάντα τὰ ἔθνη) inclui todos os povos — o julgamento é universal, não apenas para Israel.",
  "Mateus 25:31-46 é a parábola do julgamento final, a última das parábolas do Discurso Escatológico. A estrutura é: (1) o Filho do Homem se assenta no trono, (2) as nações são reunidas, (3) separação entre ovelhas (direita) e bodes (esquerda), (4) critério: servir aos 'mais pequeninos' (25:35-40), (5) destino eterno (25:46). Mateus apresenta Jesus como juiz — a mesma pessoa que pede misericórdia agora distribui justiça. O critério não é religiosidade, mas compaixão prática.",
  "A parábola do julgamento revela que Jesus se identifica com os necessitados: 'fizeram isso a um dos mais pequeninos de meus irmãos, fizeram a mim' (25:40). 'Os mais pequeninos' (τῶν ἐλαχίστων τούτων τῶν ἀδελφῶν μου) são os necessitados, mas também os discípulos — Jesus está em cada pessoa que sofre. O julgamento não é baseado em milagres ou conhecimento bíblico, mas em atos de misericórdia: fome, sede, estrangeiro, nu, doente, preso. Mateus inverte o valor religioso: servir ao próximo é servir a Deus.",
  [
    "Reconhecer que cada ato de misericórdia tem valor eterno",
    "Servir aos necessitados como se servissem a Cristo — com urgência e alegria",
    "Avaliar se minha fé se traduz em ação concreta de amor ao próximo"
  ],
  [
    "Quem são os 'mais pequeninos' no contexto atual — pobres, marginalizados, perseguidos?",
    "O que a parábola ensina sobre a relação entre fé e obras no juízo final?",
    "Como a identificação de Jesus com os necessitados muda a forma como tratamos o sofrimento alheio?"
  ],
  ["Dn 7:13-14", "Lc 10:25-37", "Tg 2:14-17"]
);

// ========== CAPÍTULO 26 — ULTIMA CEIA ==========

addVS(26, 26,
  "A Ceia do Senhor: Memória e presença",
  "Jesus tomou o pão, abençoou-o, partiu-o e deu aos disciples, dizendo: 'Tomai, comei; isto é o meu corpo' (τοῦτό ἐστιν τὸ σῶμά μου). A Ceia da Páscoa (Seder) incluía pão ázimo (matzah) e vinho. O gesto de 'partir o pão' era comum em refeições, mas Jesus lhe dá significado novo — seu corpo seria 'partido' na cruz. 'Fazei isso em memória de mim' (τοῦτο ποιεῖτε εἰς τὴν ἐμὴν ἀνάμνησιν) institui um rito permanente.",
  "Mateus 26:26-28 é a instituição da Ceia do Senhor, paralela a Mc 14:22-24, Lc 22:19-20 e 1 Co 11:23-26. Mateus inclui: (1) o pão como corpo, (2) o vinho como sangue da aliança, (3) 'derramado por muitos para perdão de pecados'. A Ceia conecta a Páscoa judaica (Êx 12) com a nova aliança (Jr 31:31-34). O sangue da aliança (αἷμα τῆς διαθήκης) ecoa Êx 24:8, quando Moisés aspergiu sangue sobre o povo. Jesus é o cordeiro pascal cujo sangue salva.",
  "A Ceia é memorial (ἀνάμνησις) — não apenas lembrança, mas participação atual nos eventos salvíficos. Paulo diz: 'cada vez que comeis este pão e bebeis este cálice, anunciais a morte do Senhor até que ele venha' (1 Co 11:26). 'Até que ele venha' (ἄχρις οὗ ἔλθῃ) conecta a Ceia com a volta de Jesus — cada Ceia é expectativa escatológica. Mateus apresenta a Ceia como centro da vida comunitária: igrejas primitivas se reuniam para partir o pão (At 2:42, 46).",
  [
    "Participar da Ceia do Senhor com reverência e alegria, não por tradição vazia",
    "Lembrar que o corpo e sangue de Jesus foram dados por amor — não é ritual mágico",
    "Viver em expectativa da volta de Jesus, que a Ceia antecipa"
  ],
  [
    "O que 'isto é o meu corpo' significa — como diferentes tradições cristãs interpretam?",
    "Como a Ceia pode ser mais do que um rito, mas experiência transformadora?",
    "Que conexão existe entre a Ceia e a missão da Igreja?"
  ],
  ["Êx 12:1-14", "1 Co 11:23-26", "Jr 31:31-34"]
);

addVS(26, 41,
  "Vigiai e orai: Fraqueza humana",
  "Jesus encontrou os discípulos dormindo no Getsemane e disse: 'Assim, pois, vigiai e orai, para que não entreis em tentação. O espírito, na verdade, está pronto, mas a carne é fraca' (γρηγορεῖτε καὶ προσεύχεσθε, ἵνα μὴ εἰσέλθητε εἰς πειρασμόν. τὸ μὲν πνεῦμα πρόθυμον, ἡ δὲ σὰρξ ἀσθενής). 'Vigiai' (γρηγορεῖτε) é imperativo — atenção constante. 'O espírito está pronto' reconhece boa vontade; 'a carne é fraca' reconhece limitação humana. Jesus não condena a fraqueza, mas exorta à vigilância ativa.",
  "Mateus 26:36-46 é a agonia no Getsemane, paralela a Mc 14:32-42 e Lc 22:39-46. Mateus inclui: (1) Jesus toma Pedro, Tiago e João, (2) 'minha alma está triste até a morte', (3) três orações, (4) três encontros com os discípulos dormindo, (5) 'o espírito está pronto, mas a carne é fraca'. A expressão 'minha alma está triste até a morte' (περίλυπος ἐστὶν ἡ ψυχή μου ἕως θανάτου) revela sofrimento genuíno — Jesus não finge dor.",
  "A frase 'o espírito está pronto, mas a carne é fraca' é uma das mais realistas sobre a condição humana. Não é desculpa, mas diagnóstico. A solução não é eliminar a carne, mas fortalecê-la pela oração. 'Vigiai e orai' é resposta para a tentação — a oração não elimina a fraqueza, mas dá força para resistir. Mateus apresenta Jesus como alguém que entende nossa fraqueza (Hb 4:15) — ele mesmo experimentou o desejo de não passar pelo sofrimento, mas submeteu-se à vontade do Pai.",
  [
    "Reconhecer que boa vontade não é suficiente — a oração é necessária para resistir",
    "Não condenar a fraqueza, mas fortalecê-la pela vigilância e oração",
    "Buscar apoio comunitário nos momentos de vulnerabilidade"
  ],
  [
    "Como 'o espírito está pronto, mas a carne é fraca' se manifesta na tentação diária?",
    "O que significa vigiar — é apenas não dormir, ou atenção espiritual?",
    "Como a oração no Getsemane ensina a orar em momentos de dor extrema?"
  ],
  ["Mc 14:32-42", "Hb 4:15-16", "Ef 6:18"]
);

// ========== CAPÍTULO 27 — MORTE NA CRUZ ==========

addVS(27, 45,
  "Trevas sobre a terra: O sofrimento do Filho de Deus",
  "Das três horas da tarde (ἐκ τῆς ὥρας τῆς ἕκτης, 12h do meio-dia) até a nona hora (τῆς ὥρας τῆς ἐνάτης, 15h da tarde), houve trevas sobre toda a terra. O período de três horas de trevas é exclusivo de Mateus — os outros Evangelhos mencionam escuridão de 12h às 15h. As trevas são sinal divino de juízo (Am 8:9, Is 13:10) — Deus está julgando o pecado que crucifica seu Filho. A terra escurece enquanto o Filho clama: 'Deus meu, Deus meu, por que me abandonaste?'",
  "Mateus 27:45-50 é a crucificação e morte de Jesus. A estrutura inclui: (1) trevas sobre a terra (27:45), (2) grito de abandono (27:46), (3) reação da multidão (27:47-49), (4) último grito e morte (27:50). O grito 'Eli, Eli, lamá sabactâni' (μου, μου, λεμὰ σαβαχθανί) é aramaico, citação de Salmo 22:1. Mateus preserva o aramaico para autenticidade — Jesus citou um salmo inteiro, não apenas as primeiras palavras. As trevas indicam que Deus está presente no sofrimento, não ausente.",
  "As trevas são sinal de juízo divino. No AT, trevas durante o dia indicam julgamento de nações (Am 8:9, Jr 15:2, Jl 2:31). Jesus está assumindo o juíza que merecemos — as trevas caem sobre ele em vez de sobre nós. O Salmo 22 é salmo messiânico que começa com abandono ('Deus meu, por que me abandonaste?') mas termina com vitória ('ele fez a vontade do Senhor'). Mateus apresenta a cruz como o ponto central da história: o justo sofre pelo injusto (1 P 3:18).",
  [
    "Compreender que Jesus suportou trevas para que nós tivéssemos luz",
    "Reconhecer que Deus está presente mesmo quando parece ausente — as trevas não são abandono permanente",
    "Confiar que o sofrimento tem propósito — a cruz é vitória, não derrota"
  ],
  [
    "O que o grito de abandono de Jesus nos ensina sobre o sofrimento humano?",
    "Como as trevas sobre a terra se relacionam com o juízo de Deus sobre o pecado?",
    "De que forma Salmo 22 é chave para entender a crucificação?"
  ],
  ["Sl 22:1-21", "Am 8:9", "1 P 3:18"]
);

addVS(27, 51,
  "O véu rasgado: Acesso direto a Deus",
  "No momento da morte de Jesus, 'o véu do templo rasgou-se em dois, de cima para baixo' (ἐσχίσθη τὸ καταπέτασμα τοῦ ναοῦ ἄνωθεν ἕως κάτω εἰς δύο). O véu (καταπέτασμα) separava o Lugar Santo do Santo dos Santos — só o sumo sacerdote entrava uma vez por ano, no Dia da Expiação (Lv 16). O rasgamento 'de cima para baixo' indica ação divina — não o homem rasga o véu, mas Deus. A terra tremeu, as rochas se fenderam, os túmulos se abriram (27:51-53).",
  "Mateus 27:51-54 é o relato das consequências da morte de Jesus. Mateus inclui: (1) véu rasgado, (2) terremoto, (3) rochas fendidas, (4) túmulos abertos, (5) centurião declara Jesus justo. O véu rasgado é o mais teológico — significa que o acesso ao Santo dos Santos agora é aberto. Não há mais barreira entre Deus e o ser humano. O centurião romano declara 'verdadeiramente este era Filho de Deus' (ἀληθῶς θεοῦ υἱὸς ἦν οὗτος) — um pagão reconhece o que os líderes religiosos não viram.",
  "O véu rasgado cumpre a profecia de Jesus: 'destruí este templo, e em três dias o levantarei' (Jo 2:19) — o templo é seu corpo. A morte de Jesus destrói a barreira entre Deus e o homem. Hebreus 10:19-22 desenvolve este tema: 'pela sangue de Jesus... temos ousadia para entrar no Santo dos Santos'. O terremoto e as rochas fendidas são sinais da presença divina (cf. Sinai, Êx 19:18). Os túmulos abertos antecipam a ressurreição — a morte de Jesus tem poder sobre a morte.",
  [
    "Aprecier que o acesso a Deus é direto — não precisa de mediação humana",
    "Viver com ousadia diante de Deus, sabendo que o véu foi rasgado",
    "Reconhecer que a morte de Jesus tem poder sobre toda morte e sepultura"
  ],
  [
    "O que o véu rasgado nos ensina sobre a relação entre Deus e os seres humanos?",
    "Como o terremoto e as rochas fendidas se relacionam com a autoridade de Jesus?",
    "De que forma a declaração do centurião é significativa — um pagão reconhece a divindade?"
  ],
  ["Lv 16:1-34", "Hb 10:19-22", "Jo 2:19-21"]
);

// ========== CAPÍTULO 28 — RESSURREICAO E GRANDE COMISSAO ==========

addVS(28, 5,
  "Não temais: A notícia da ressurreição",
  "O anjo disse às mulheres: 'Não temais, pois sei que buscais Jesus, que foi crucificado. Não está aqui; ressuscitou como disse' (μὴ φοβεῖσθε ὑμεῖς, οἶδα γὰρ ὅτι Ἰησοῦν τὸν ἐσταυρωμένον ζητεῖτε. οὐκ ἔστιν ὧδε, ἠγέρθη γὰρ καθὼς εἶπεν). 'Não temais' (μὴ φοβεῖσθε) é o mesmo imperativo dos aparições de Jesus (Mt 14:27, 17:7, 28:10). 'Não está aqui' — a tumba está vazia, não porque o corpo foi roubado, mas porque Jesus ressuscitou. 'Como disse' (καθὼς εἶπεν) conecta com as predições anteriores (Mt 16:21, 17:23, 20:19).",
  "Mateus 28:1-10 é o relato da ressurreição, paralelo a Mc 16:1-8, Lc 24:1-12 e Jo 20:1-10. Mateus inclui: (1) ida das mulheres ao túmulo, (2) terremoto e anjo, (3) declaração da ressurreição, (4) medo das mulheres, (5) encontro com Jesus. A ressurreição é o fato central do cristianismo — 'se Cristo não ressuscitou, vã é a vossa fé' (1 Co 15:14). Mateus apresenta a ressurreição como fato histórico: o túmulo vazio, múltiplas testemunhas, encontro pessoal.",
  "A ressurreição de Jesus cumpre as profecias do AT (Sl 16:10, Is 26:19) e as predições de Jesus (Mt 16:21, 17:23, 20:19). A expressão 'ele foi adiante de vós para a Galileia' (προάγει ὑμᾶς εἰς τὴν Γαλιλαίαν) indica que a Galileia é o local da revelação — terra de gentios, antecipando a missão universal. Mateus apresenta a ressurreição como: (1) vitória sobre a morte, (2) confirmação da identidade divina de Jesus, (3) fundamento da fé cristã, (4) garantia da ressurreição dos crentes.",
  [
    "Receber a notícia da ressurreição com alegria, não com dúvida",
    "Viver na certeza de que a morte foi vencida — isso muda tudo",
    "Ir 'para a Galileia' — encontrar Jesus nas situações cotidianas, não apenas no templo"
  ],
  [
    "O que a ressurreição nos ensina sobre o destino final do sofrimento humano?",
    "Como a ressurreição se diferencia de outros relatos de 'retorno à vida' no mundo antigo?",
    "De que forma a certeza da ressurreição afeta a forma como encaramos a morte?"
  ],
  ["Sl 16:10", "1 Co 15:14-20", "At 2:24-32"]
);

addVS(28, 18,
  "Toda autoridade me foi dada: A Grande Comissão",
  "Jesus disse: 'Foi-me dada toda autoridade no céu e na terra' (ἐδόθη μοι πᾶσα ἐξουσία ἐν οὐρανῷ καὶ ἐπὶ τῆς γῆς). 'Foi dada' (ἐδόθη) está no passivo — do Pai ao Filho. 'Toda autoridade' (πᾶσα ἐξουσία) é universal — não apenas sobre Israel, mas sobre toda a criação. Mateus 28:18-20 é a Grande Comissão, o mandamento final de Jesus. 'Ide' (πορευθέντες) é particípio — 'indo', ou seja, o evangelismo é estilo de vida, não evento isolado.",
  "Mateus 28:18-20 é o versículo mais importante para a missão cristã. A estrutura é: (1) autoridade universal de Jesus (28:18), (2) comando de fazer discípulos (28:19a), (3) métodos: batizar e ensinar (28:19b), (4) promessa de presença (28:20). 'Fazei discípulos' (μαθητεύσατε) é o único imperativo — os outros são participios (indo, batizando, ensinando). O mandamento não é 'evangelizar', mas 'fazer discípulos' — pessoas que seguem a Jesus, não apenas que aceitam uma mensagem.",
  "A Grande Comissão cumpre a promessa a Abraão: 'em ti serão benditas todas as famílias da terra' (Gn 12:3). 'Todas as nações' (πάντα τὰ ἔθη) é universal — não apenas Israel. 'Batizando-os em nome do Pai, do Filho e do Espírito Santo' é a primeira menção explícita da Trindade no NT. 'Ensinar-lhes a guardar todas as coisas que vos tenho mandado' — o discipulado é processo continuado. 'Eu estou convosco' (ἐγὼ μεθ᾽ ὑμῶν εἰμι) é a promessa final — Emanuel (Mt 1:23) está presente até o fim.",
  [
    "Assumir que fazer discípulos é responsabilidade de todo crente, não apenas de missionários",
    "Desenvolver competência para ensinar e batizar — não apenas compartilhar, mas formar",
    "Confiar que a presença de Jesus garante eficácia à missão"
  ],
  [
    "O que significa 'toda autoridade me foi dada' — como isso manda a missão?",
    "Como fazer discípulos de 'todas as nações' no contexto globalizado?",
    "Que 'coisas' Jesus mandou ensinar — o que deve ser transmito às novas gerações?"
  ],
  ["Gn 12:3", "At 1:8", "Rm 10:14-15"]
);

export default registro;

