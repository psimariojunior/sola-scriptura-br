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
    livro: 'jn', capitulo, versiculo: v, titulo,
    contextoHistorico, contextoLiterario, significadoTeologico,
    aplicacoes, perguntasEstudo, versiculosConexoes
  };
}

// ═══════ CAPITULO 1 ═══════

addVS(1, 1,
  'No principio era o Verbo — preexistencia e divindade do Cristo',
  'Joao escreve entre 90-100 d.C. em Efeso, para igrejas de fala grega que enfrentavam o gnosticismo. O prologo evoca Gn 1:1 para apresentar Jesus como o Logos divino, preexistente e co-eterno com Deus, respondendo a falsos ensinos que reduziam Cristo a mera criatura angelical.',
  'Prologo poetico em forma de himno (1:1-18) que introduz os temas centrais de todo o Evangelho: a divindade de Cristo, a incarnacao, luz versus trevas, e o testemunho de Joao Batista.',
  'Jo 1:1 estabelece a doutrina central da Trindade e da divindade de Cristo. O Verbo (Logos) e coeterno com Deus — nao foi criado, mas existia desde a eternidade. Isso refuta o arianismo e qualquer ensino que reduza Cristo a mera criatura.',
  ['Reconhecer que Jesus nao comecou a existir no nascimento, mas e eterno como Deus', 'Permitir que a verdade da divindade de Cristo transforme a forma como adoramos e obeyecemos', 'Estudar o conceito de Logos para comunicar o evangelho a pessoas de formacao filosofica'],
  ['Como o conceito de Logos conecta o pensamento grego com a revelacao hebraica?', 'Por que e essencial afirmar que o Verbo era Deus e nao apenas deus?', 'Que implicacoes a preexistencia de Cristo tem para a nossa fé?'],
  ['Gn 1:1', 'Cl 1:15-17', 'Hb 1:2-3']);

addVS(1, 2,
  'O Verbo era com Deus — distincao de pessoas na unidade divina',
  'O texto grego "en pros ton theon" indica relacao pessoal face a face, nao mera proximidade. Os primeiros cristaos usaram este versiculo para desenvolver a teologia trinitaria contra o modalismo e o adoptionismo.',
  'O prologo continua a desenvolver a identidade do Verbo. O verso anterior afirma que era Deus; este afirma que estava com Deus. A tensao entre unidade e distincao e o cerne da controversa trinitaria.',
  'Este versiculo sustenta a doutrina da Trindade: ha distincao real entre o Pai e o Filho, mas ambos sao igualmente Deus. A relacao "com Deus" indica comunhao pessoal eterna, nao subordinação ontologica.',
  ['Refletir sobre o mistério da unidade e distincao na Trindade', 'Apreciar que Jesus tem relacionamento pessoal eterno com o Pai'],
  ['Como podemos compreender a distincao entre "era Deus" e "era com Deus"?', 'Que implicacoes isso tem para a oracao e adoracao de Jesus?'],
  ['Mt 28:19', '2 Co 13:14', '1 Pe 1:2']);

addVS(1, 3,
  'Todas as coisas foram feitas por Ele — Criador soberano',
  'No contexto do seculo I, o gnosticismo ensinava que o mundo material era mau e criado por um deus inferior (demiurgo). Joao afirma categoricamente que o Verbo criou todas as coisas, incluindo o mundo material, refutando essa heresia.',
  'O prologo expande o escopo: de relacao com Deus (vv. 1-2) para relacao com a criacao (v. 3). A prioridade temporal do Verbo e estabelecida: antes de toda criacao.',
  'Cristo e o Criador de todas as coisas — nada existe fora Dele. Isso inclui o universo, a humanidade, a historia e cada detalhe da vida. A criacao nao e acidental, mas proposital.',
  ['Reconhecer que tudo na minha vida vem de Cristo como Criador', 'Cultivar gratidao diaria pelo dom da criacao e da vida', 'Cuidar da criacao como mordomia confiada pelo Criador'],
  ['Como a verdade de que Cristo e o Criador afeta a minha visao do mundo material?', 'Se tudo foi criado por Cristo, que responsabilidade tenho com o que Ele criou?', 'Por que o gnosticismo negava a criacao material e qual e o impacto disso?'],
  ['Cl 1:16', 'Hb 1:2', 'Ef 3:9', 'Ap 4:11']);

addVS(1, 5,
  'A luz reluziu nas trevas — vitoria sobre o mal',
  'A imagem luz versus trevas e um dos temas mais proeminentes de Joao. Nas trevas espirituais do paganismo romano e do gnosticismo emergente, a luz de Cristo brilha com poder invencivel.',
  'O prologo culmina com o conflito cosmico entre luz e trevas. A luz vence — as trevas nao a comprehendem, mas tambem nao a derrotam. A verbos estao no presente: "reluz" e "nao compreenderam".',
  'A luz de Cristo e irresistivel e invencivel. As trevas (pecado, morte, Satan) nao podem vence-la. Isso da esperanca certa de que o bem prevalecera sobre o mal. A cegueira humana e responsabilidade, nao fatalidade.',
  ['Viver como filho da luz, rejeitando as obras das trevas', 'Ter confianca de que Cristo venceu o pecado e a morte', 'Reconhecer que a cegueira espiritual e escolha, nao destino'],
  ['Quais sao as "trevas" que nao compreendem a luz?', 'Como a luz de Cristo transformou minha vida pessoalmente?', 'Que formas a cegueira espiritual se manifesta hoje?'],
  ['Jo 8:12', 'Jo 12:46', '1 Jo 1:5-7', 'Ef 5:8-11']);

addVS(1, 14,
  'O Verbo se fez carne — o mistério da incarnação',
  'A expressão "se fez carne" (eskēnōsen) significa literalmente "tabernaculou" — o Verbo eterno habitou entre os humanos como Deus habitou no tabernáculo no deserto. A incarnação foi o maior ato de humildade da história.',
  'Este é o versículo mais denso teologicamente do prologo. A incarnação é o ponto alto da história da redenção: Deus não apenas falou — Ele se tornou um de nós para habitar entre nós.',
  'A incarnação é o maior ato de humildade e amor da história. O Verbo eterno, coeterno com Deus, assumiu a natureza humana completa sem pecado. Isso fundamenta a nossa salvação e a capacidade de Cristo de ser nosso Sumo Sacerdote.',
  ['Adorar a humildade de Deus que se tornou carne para nos resgatar', 'Viver com a consciência de que Deus entende minha experiência humana completa', 'Valorizar a encarnação como fundamento da salvação e da compaixão de Cristo'],
  ['O que significa o Verbo se tornar carne em termos de como Deus nos entende?', 'Que implicações a incarnação tem para a minha vida fisica e emocional?', 'Como a incarnação valida a vida material e não apenas a espiritual?'],
  ['Fp 2:6-8', '1 Ti 3:16', 'Hb 2:14-18', '1 Jo 4:2-3']);

addVS(1, 29,
  'Eis o Cordeiro de Deus — sacrificio redentor e messianico',
  'Joao Batista identifica Jesus como o Cordeiro de Deus no dia seguinte ao batismo. A imagem conecta o Cordeiro Pascal do Êxodo (Êx 12) com o Servo Sofredor de Isaias 53. Os judeus ouviam isso e pensavam no sacrifício diário no templo.',
  'A identificação messiânica de Jesus como Cordeiro é o primeiro anuncio explícito da paixão no Evangelho de Joao. O "toma o pecado do mundo" antecipa a substituição vicária na cruz.',
  'Cristo é o Cordeiro de Deus que remove o pecado do mundo. Isso não se refere apenas a Israel, mas a toda humanidade ("do mundo"). O sacrifício de Cristo é universal em seu alcance e suficiente em seu valor.',
  ['Receber que Cristo tomou sobre Si o meu pecado', 'Viver na gratidão pelo sacrifício substitutivo de Cristo', 'Compartilhar a mensagem de que o pecado do mundo foi pago na cruz'],
  ['Como a imagem de Cordeiro de Deus conecta o AT com o NT?', 'O que "toma o pecado do mundo" significa para a minha vida?', 'Por que Joao Batista escolheu essa imagem e não outra?'],
  ['Êx 12:3-7', 'Is 53:4-7', '1 Pe 1:18-19', 'Ap 5:6-14']);

// ═══════ CAPITULO 3 ═══════

addVS(3, 16,
  'Porque Deus amou o mundo de tal maneira — o versículo mais conhecido da Bíblia',
  'A expressão "de tal maneira" (houtōs) indica o grau do amor. Deus amou tanto o mundo que deu o Seu Filho unigênito. Isso é a declaração mais concisa do evangelho, falada a Nicodemus durante uma visita noturna.',
  'O versículo é o resumo de todo o diálogo com Nicodemus. Tudo o que Jesus disse sobre nascer de novo culmina nesta declaração de amor divino. A estrutura lógica é: amor → dá → para que não pereça → mas tenha vida eterna.',
  'O amor de Deus é incondicional (ao mundo — inclusive pecadores), sacrificial (deu o Seu Filho unigênito), e salvífico (para que não pereça, mas tenha vida eterna). Isso é o fundamento da fé cristã: Deus amou primeiro.',
  ['Receber o amor de Deus como fundamento da minha identidade', 'Compartilhar a oferta do evangelho com urgencia, sabendo que a alternativa é perecimento', 'Viver na certeza de que o amor de Deus não depende do meu merecimento'],
  ['O que o amor de Deus pelo "mundo" ensina sobre Sua natureza?', 'Que implicações a free offer do evangelho tem para o evangelismo?', 'Como o amor sacrificial de Deus se difere do amor sentimental humano?'],
  ['Rm 5:8', '1 Jo 4:9-10', 'Jo 1:14', '2 Co 5:19-21']);

addVS(3, 17,
  'Deus nao enviou o Filho para condenar, mas para salvar — o proposito da vinda',
  'Isso é uma correção ao pensamento que esperava um Messias juiz que destruiria os romanos. Jesus veio primeiro como Salvador, não como Juiz. A condenação existe para quem rejeita, mas não é o proposito da vinda.',
  'O versiculo estabelece a hierarquia de propositos: a vinda de Cristo tem como proposito principal a salvacao. A condenação é consequencia da rejeição, não do desejo divino.',
  'Deus é misericordioso antes de ser juiz. O coração de Deus é salvador, não punitivo. A condenação é responsabilidade humana pela rejeição da luz oferecida.',
  ['Viver na certeza de que o proposito de Deus é salvacao', 'Compartilhar o evangelho com a urgencia de quem sabe que a alternativa e condenação', 'Cultivar um coração misericordioso como o de Deus para com os perdidos'],
  ['Qual é a relação entre salvacao e condenação no proposito de Deus?', 'Que consolo existe em saber que o coracao de Deus é salvador?', 'Como a prioridade salvadora de Deus afeta o evangelismo da igreja?'],
  ['2 Pe 3:9', '1 Tm 2:3-4', 'Lc 15:7', 'Rm 5:8-9']);

addVS(3, 30,
  'E necessario que Ele cresça, e eu diminua — a prioridade de Cristo',
  'Joao Batista declara que Jesus deve crescer enquanto ele diminui. Isso é o oposto do comportamento humano natural: todo profeta quer ganhar seguidores. João aponta seus discipulos para Jesus.',
  'A declaração é um principio espiritual fundamental: o crescimento de Cristo na vida do crente requer diminuição do ego. O versiculo precede a celebração do casamento (Jo 3:22-30), tema de alegria por Cristo.',
  'A vida cristã é um processo contínuo de diminuição do eu e exaltação de Cristo. Isso não é humildade artificial, mas reconhecimento de que Cristo é a fonte de toda vida e graça.',
  ['Examinar onde o ego ainda ocupa espaço que deveria ser de Cristo', 'Praticar a humildade de diminuir para que Cristo cresça', 'Reconhecer que o sucesso de outros na fé não ameaça minha posição em Cristo'],
  ['Por que a diminuição do eu é necessária para o crescimento de Cristo?', 'Como o exemplo de João Batista desafia a cultura de protagonismo?', 'Que áreas da minha vida precisam de diminuição para que Cristo cresça?'],
  ['Mt 3:11', 'Jo 3:28-29', '2 Co 4:5', 'Fp 2:5-8']);

// ═══════ CAPITULO 4 ═══════

addVS(4, 1,
  'Jesus sabia que os fariseus ouviram que batizava — o discernimento divino',
  'Joao esclarece que Jesus nao batizava — eram seus discipulos. Isso evita confusao sobre o batismo de Jesus e estabelece que a obra do reino depende da ação divina, não do batismo em si.',
  'A transicao da Judeia para a Galileia pela Samaria é uma narrativa cuidadosamente construída para o encontro com a mulher samaritana.',
  'Jesus tem discernimento sobre os motivos dos lideres religiosos. A Sua saida da Judeia não é fuga, mas direcionamento divino para o proximo encontro providencial.',
  ['Reconhecer que Deus direciona Sua obra com sabedoria', 'Entender que o batismo é sinal, não causa da salvação'],
  ['Por que Joao esclarece que Jesus nao batizava?', 'Que diferença existe entre o batismo como sinal e como meio de graça?'],
  ['Mt 3:13-17', 'At 2:38', 'Rm 6:3-4']);

addVS(4, 14,
  'Quem beber da agua que eu lhe der nunca terá sede — fonte de vida eterna',
  'A "agua viva" é o Espirito Santo e a vida eterna. A imagem de fonte indica que a vida eterna não é estática, mas dinâmica — jorra continuamente para a vida eterna. Isso contrasta com a água do poço que satisfaz temporariamente.',
  'A declaração é o primeiro "eu sou" implícito de Jesus: Ele se apresenta como a fonte de água viva, cumprindo a imagem do Deus que satisfaz a sede do povo (Is 44:3; Jr 2:13).',
  'A vida em Cristo é abundante e auto-alimentada. A fonte interior do Espirito Santo supre continuamente as necessidades espirituais. A sede retorna quando buscamos satisfação em fontes erradas.',
  ['Cultivar a fonte interior do Espirito Santo na vida diaria', 'Viver na certeza de que Cristo supre continuamente minhas necessidades', 'Reconhecer que a sede espiritual é sinal de que Cristo quer suprir'],
  ['O que significa a "agua viva" na vida cristã?', 'Como a fonte interior funciona no dia a dia?', 'Por que a sede retorna quando buscamos satisfação fora de Cristo?'],
  ['Jo 7:37-39', 'Jo 10:10', 'Is 44:3', 'Ef 3:17-19']);

addVS(4, 24,
  'Deus é Espirito — adorá-lo em espírito e em verdade',
  'A declaração mais profunda sobre a natureza de Deus e do culto. Deus não pode ser limitado a templo ou local. Os samaritanos adoravam no monte Gerizim; os judeus em Jerusalem. Jesus transcende ambas as localizações.',
  'A exigência de "espírito e verdade" indica que o culto requer a obra do Espirito Santo (espírito) e a conformidade com a Palavra (verdade). Isso reforma todo o conceito de adoração: de ritual externo para transformação interna.',
  'O culto espiritual é universal — qualquer pessoa, em qualquer lugar, pode adorar a Deus se adorar em espírito e verdade. Isso antecipa a universalidade da igreja cristã.',
  ['Cultivar a vida espiritual para adorar em espírito', 'Fundamentar a adoração na verdade das Escrituras', 'Buscar a autenticidade na adoração, evitando o formalismo vazio'],
  ['O que significa adorar "em espírito" e "em verdade" separadamente?', 'Que reformas o culto cristão precisa para atender a este padrão?', 'Como a adoração em espírito e verdade se aplica fora da congregação?'],
  ['At 17:24-25', 'Jo 14:23', 'Rm 12:1-2', 'Hb 13:15-16']);

// ═══════ CAPITULO 6 ═══════

addVS(6, 35,
  'Eu sou o pao da vida — saciedade espiritual em Cristo',
  'A primeira das sete declarações "Eu sou" exclusivas em Joao. A primeira declaração "Eu sou" com predicado. Cristo se declara a fonte unica de saciedade espiritual e vida eterna, cumprindo o simbolico do maná no deserto.',
  'O discurso do Pao da Vida é um dos mais longos de Jesus em Joao, pronunciado na sinagoga de Cafarnaum após a multiplicação dos pães. A declaração conecta Cristo com o nome divino de Êxodo 3:14.',
  'Cristo é o alimento espiritual que satisfaz a fome da alma. Assim como o maná sustentou Israel no deserto, Cristo sustenta os crentes na jornada da fé. A fé em Ele é o sustento diário da vida espiritual.',
  ['Buscar em Cristo a saciedade que o mundo não pode dar', 'Entender que a fé em Cristo é sustento diário, não evento único', 'Reconhecer que a fome espiritual só se satisfaz em Cristo'],
  ['O que a imagem de "pão" ensina sobre Cristo?', 'Como a fé diária em Cristo se sustenta como o maná sustentou Israel?', 'Que tipos de "fome espiritual" Cristo satisfaz?'],
  ['Êxodo 16:14-35', 'Jo 6:48-51', 'Mt 4:4', '1 Co 11:23-26']);

addVS(6, 44,
  'Ninguém pode vir a mim se o Pai que me enviou não o trouxer — a soberania divina na salvação',
  'Jesus ensina a soberania divina no processo de salvação: ninguém vem a Cristo por iniciativa própria. O Pai "traz" os eleitos. Isso não elimina a responsabilidade humana, mas estabelece a prioridade da graça.',
  'O versiculo é parte do discurso que causa divisão entre os discipulos. Muitos se afastam porque não aceitam a dependência total de Deus.',
  'A salvação começa com a iniciativa divina. O homem responde, mas a primeira ação é de Deus. Isso humilha o orgulho humano e exalta a graça soberana.',
  ['Reconhecer que minha vinda a Cristo é resultado da graça divina', 'Agradecer ao Pai por me ter trazido a Cristo', 'Evitar o orgulho de pensar que salvei a mim mesmo'],
  ['Como a soberania divina na salvação se relaciona com a responsabilidade humana?', 'O que isso significa para o evangelismo?', 'Como isso afeta nossa oração pelos perdidos?'],
  ['Jo 6:37', 'Jo 6:65', 'Ef 2:4-5', 'Fp 1:29']);

addVS(6, 63,
  'O Espirito é quem dá vida — a letra mata, o Espirito vivifica',
  'Jesus afirma que a vida espiritual depende do Espirito Santo, não da compreensão intelectual ou da obediência literal. A "carne" (natureza humana apartada de Deus) não aproveita nada.',
  'O versiculo antecipa o contraste entre a letra (Lei) e o Espírito (graça), desenvolvido por Paulo em 2 Co 3:6. A Palavra de Deus só ganha vida quando o Espírito a aplica ao coração.',
  'A vida espiritual é obra do Espírito Santo, não de esforço humano. A Palavra de Deus é ferramenta do Espírito, mas a vida vem do Espírito. Isso evita tanto o racionalismo quanto o emocionalismo.',
  ['Depender do Espírito Santo para dar vida às Escrituras', 'Evitar o literalismo que mata em vez de vivificar', 'Buscar a iluminação do Espírito antes e durante o estudo da Palavra'],
  ['Como o Espírito Santo transforma a letra morta em Palavra viva?', 'Que papel a iluminação do Espírito desempenha no estudo bíblico?', 'Como equilibrar o estudo racional com a dependência do Espírito?'],
  ['2 Co 3:6', 'Rm 7:6', 'Jo 16:13-14', '1 Co 2:10-14']);

// ═══════ CAPITULO 8 ═══════

addVS(8, 12,
  'Eu sou a luz do mundo — o guia que ilumina as trevas',
  'A segunda declaração "Eu sou" em Joao. Cristo é a luz que ilumina as trevas da ignorancia, do pecado e da morte. A declaração é feita no templo durante a festa dos Tabernáculos, quando gigantes velas iluminavam o pátio.',
  'A declaração conecta o prologo (1:4-5) com a vida do crente (8:12). A luz do mundo não é apenas revelação doutrinária — é guia prático para a vida.',
  'Cristo é a luz que guia, revela e salva. Sem Ele, a humanidade caminha em trevas. Isso fundamenta a exclusividade cristã como verdadeira revelação. Quem segue a Cristo não caminha nas trevas.',
  ['Caminhar na luz de Cristo, rejeitando as trevas do pecado', 'Ser refletor da luz de Cristo no mundo', 'Reconhecer que a luz de Cristo é guia, não apenas conhecimento'],
  ['O que a imagem de "luz" ensina sobre a missão de Cristo?', 'Como podemos ser "luz do mundo" como Jesus ensinou?', 'Que formas de trevas a luz de Cristo ilumina hoje?'],
  ['Jo 1:4-5', 'Jo 9:5', 'Jo 12:35-36', 'Mt 5:14-16']);

addVS(8, 31,
  'Se permanecerdes na minha palavra, sereis verdadeiramente meus discipulos — a obediencia como critério',
  'A condição para ser discipulo verdadeiro é permanecer na Palavra de Cristo. Isso não é conhecimento intelectual, mas obediência prática e contínua.',
  'O versiculo introduz a distinção entre discipulo verdadeiro e superficial. A permanência na Palavra é o teste da genuinidade da fé.',
  'A fé genuína se manifesta em obediência contínua à Palavra de Cristo. Isso vai além da decisão inicial — é um estilo de vida de submissão à verdade.',
  ['Examinar se estou permanecendo na Palavra de Cristo', 'Buscar a obediência como evidência de discipulado', 'Reconhecer que a fé sem obediência é fé morta'],
  ['O que significa "permanecer na minha palavra" na prática?', 'Que diferença existe entre saber a Palavra e permanecer nela?', 'Como a obediência é evidência de discipulado genuíno?'],
  ['Jo 14:15', 'Jo 14:21', 'Tg 1:22-25', '1 Jo 2:3-6']);

addVS(8, 32,
  'Conhecereis a verdade, e a verdade vos libertará — a liberdade pela verdade',
  'A verdade de Cristo liberta do pecado, da ignorancia e da opressão. Isso não é apenas conhecimento intelectual, mas transformação existencial. Os judeus pensavam ser livres por serem descendentes de Abraão.',
  'A declaração é feita no contexto da discussão sobre a liberdade espiritual. A verdade de Cristo é libertadora em todos os niveis: espiritual (do pecado), intelectual (da ignorancia), social (da opressão) e existencial (do sentido).',
  'A verdade de Cristo é libertadora porque revela a realidade como ela é. O pecado escraviza; a verdade liberta. Isso fundamenta o valor do estudo bíblico e da pregação fiel.',
  ['Buscar a verdade de Cristo como caminho para a liberdade', 'Viver na liberdade que a verdade de Cristo proporciona', 'Reconhecer que a verdade liberta, mesmo quando é desconfortável'],
  ['Que tipo de liberdade a verdade de Cristo oferece?', 'Como o conhecimento da verdade transforma a vida prática?', 'Que formas de escravidão a verdade de Cristo quebra?'],
  ['Jo 8:36', 'Jo 14:6', 'Gl 5:1', '2 Co 3:17']);

// ═══════ CAPITULO 9 ═══════

addVS(9, 2,
  'Mestre, quem pecou, este ou seus pais, para que nascesse cego? — a teologia da retribuição',
  'A pergunta dos discipulos revela a teologia dominante do judaismo antigo: o sofrimento era consequencia de pecado pessoal ou ancestral. Essa visão está em Jó e em vários Salmos.',
  'A cura do cego de nascença é o sexto sinal joanino e revela a cegueira espiritual dos lideres religiosos. A pergunta dos discipulos é o ponto de partida para um ensino radical sobre sofrimento e glória de Deus.',
  'O sofrimento não é necessariamente consequencia de pecado pessoal. Jesus refuta a visão de que toda doença é punição divina, abrindo espaço para o sofrimento ter proposito redentor.',
  ['Não julgar os sofrentes assumindo que são pecadores', 'Buscar o proposito de Deus mesmo no sofrimento', 'Evitar explicações simplistas sobre o sofrimento alheio'],
  ['Por que Jesus afirma que o sofrimento não é causado por pecado pessoal?', 'Como o sofrimento pode revelar a glória de Deus?', 'Que alternativa Jesus oferece à teologia da retribuição?'],
  ['Lc 13:1-5', 'Jó 1:1-22', '2 Co 4:16-18', 'Rm 8:28']);

addVS(9, 5,
  'Enquanto estou no mundo, sou a luz do mundo — a missão limitada no tempo',
  'Jesus declara que Sua presença no mundo tem proposito e prazo. A missão de Cristo na terra é temporal — Ele veio para iluminar antes de ser exaltado.',
  'O versiculo é a justificativa para a cura no sabado: se Ele é a luz do mundo, não pode parar de agir. A luz não descansa enquanto ha trevas.',
  'A missão de Cristo é urgente e temporal. Enquanto estivermos no mundo, temos a mesma responsabilidade: agir enquanto é dia.',
  ['Agir com urgencia na missão, sabendo que o tempo é limitado', 'Reconhecer que a presença de Cristo no mundo é proposital'],
  ['Que urgencia a declaração "enquanto estou no mundo" traz?', 'Como a temporariedade da missão afeta o evangelismo?', 'Que responsabilidade temos enquanto a luz está no mundo?'],
  ['Jo 12:35', 'Jo 12:46', 'Jo 9:4', 'Ef 5:15-16']);

addVS(9, 31,
  'Sabemos que Deus não ouve a pecadores — o testemunho do cego curado',
  'O cego curado faz uma declaração teológica impressionante: Deus não ouve pecadores. Ele argumenta que, se Jesus não fosse de Deus, não poderia curar.',
  'O cego progride no conhecimento: de "um homem chamado Jesus" (v. 11) para "profeta" (v. 17) para "de Deus" (v. 33). Cada etapa é uma descoberta guiada pela experiência.',
  'A experiência pessoal de transformação é argumento poderoso contra a incredulidade. O cego não tem teologia sofisticada, mas tem testemunho incontestável.',
  ['Compartilhar o que Cristo fez na minha vida com simplicidade', 'Reconhecer que a experiência pessoal de transformação é argumento poderoso', 'Permitir que a experiência de Cristo guie meu entendimento teológico'],
  ['Como o testemunho do cego amadurece ao longo do diálogo?', 'Por que a experiência pessoal de transformação é mais persuasiva que argumentos?', 'Que lição a humildade do cego ensina sobre testemunho?'],
  ['Mt 12:24', 'Mc 5:19-20', 'At 4:19-20', '1 Pe 3:15']);

// ═══════ CAPITULO 10 ═══════

addVS(10, 7,
  'Eu sou a porta das ovelhas — acesso seguro ao rebanho',
  'A quarta declaração "Eu sou" em Joao (com predicado). A imagem de porta indica que há um acesso único e seguro ao rebanho de Deus. Os falsos pastores pulam o muro; Jesus é a porta.',
  'A declaração contrapõe os falsos pastores de Israel (Ez 34) que exploravam o rebanho. Jesus é a porta legítima que garante acesso seguro e vida abundante.',
  'Cristo é a única via legítima de acesso a Deus e à salvação. Os falsos mestres tentam entrar por outros caminhos; Jesus é a porta autêntica.',
  ['Reconhecer que Cristo é a única via legítima de acesso a Deus', 'Desconfiar de quem tenta entrar pela porta errada', 'Buscar segurança e proteção no rebanho de Cristo'],
  ['O que a imagem de "porta" ensina sobre a relação de Cristo com o rebanho?', 'Quem são os "falsos pastores" que pulam o muro?', 'Como a porta protege o rebanho de ladrões e assaltantes?'],
  ['Ez 34:11-16', 'Sl 100:3', 'Mt 7:13-14', 'Jo 14:6']);

addVS(10, 9,
  'Eu sou a porta; por mim, se entrar, sera salvo — salvacao pela porta',
  'A declaração reforça que a salvação vem pela porta de Cristo. "Entrar" é ato de fé; "será salvo" é resultado garantido.',
  'A imagem indica que há um caminho correto para entrar no rebanho. Os ladrões tentam entrar pelo lado errado; Jesus é a única entrada autorizada.',
  'A salvação vem pela fé em Cristo como a porta. Não há outro acesso ao rebanho de Deus.',
  ['Examinar se entrei pela porta de Cristo ou por outra via', 'Confiar que quem entra pela porta é salvo'],
  ['Que significa "entrar" pela porta na prática?', 'Como Cristo como porta se relaciona com Cristo como caminho (14:6)?'],
  ['Jo 14:6', 'Mt 7:13-14', 'At 4:12']);

addVS(10, 10,
  'O ladrão não vem senão para roubar, matar e destruir; eu vim para que tenham vida — a vida abundante',
  'O contraste é claro: o ladrão (Satan, falsos mestres) rouba, mata e destrói; Jesus traz vida abundante. A "vida" aqui é zoe — vida plena, não apenas existência.',
  'A declaração é uma das mais conhecidas de Jesus. A vida abundante não é prosperidade material, mas plenitude espiritual em comunhão com Cristo.',
  'Cristo veio para dar vida em abundância — não apenas vida eterna futura, mas vida plena presente. Isso desafia tanto o ascetismo quanto o materialismo.',
  ['Buscar a vida abundante que Cristo promete', 'Reconhecer que o ladrão quer destruir, mas Cristo quer dar vida', 'Viver na plenitude da vida em Cristo, não na escravidão do pecado'],
  ['Que tipo de "vida abundante" Cristo oferece?', 'Como o ladrão rouba, mata e destrói hoje?', 'Como a vida abundante se manifesta na prática?'],
  ['Jo 10:28', 'Jo 14:19', 'Rm 6:4', '1 Jo 5:11-12']);

addVS(10, 11,
  'Eu sou o bom pastor — o amor sacrificial do pastor',
  'A quinta declaração "Eu sou" em Joao. A imagem de pastor conecta-se com o AT (Sl 23, Ez 34). O "bom" pastor se distingue do mercenário que foge do perigo.',
  'O discurso do Bom Pastor é uma das mais belas imagens de Cristo. Ele conhece as ovelhas, guia-as e dá a vida por elas. Isso antecipa a cruz.',
  'Cristo é o pastor que conhece, guia e protege Seu rebanho. Ele não é mercenário que foge do perigo — é o pastor que morre pelas ovelhas. Isso fundamenta o amor sacrificial de Cristo.',
  ['Confiar no Bom Pastor que conhece e guia Sua vida', 'Reconhecer que Cristo dá a vida por nós, não apenas nos dirige', 'Seguir a voz do pastor e não a de falsos líderes'],
  ['O que as imagens de pastor e ovelhas ensinam sobre a relação de Cristo com Seu povo?', 'Como Cristo se diferencia dos "falsos pastores"?', 'Que responsabilidade temos como ovelhas do Bom Pastor?'],
  ['Ez 34:11-16', 'Sl 23:1-6', '1 Pe 5:2-4', 'Hb 13:20']);

addVS(10, 27,
  'As minhas ovelhas ouvem a minha voz, e eu conheço-as — o reconhecimento mútuo',
  'O conhecimento mútuo entre o pastor e as ovelhas é pessoal e íntimo. As ovelhas conhecem a voz do pastor e seguem-no; o pastor conhece cada ovelha individualmente.',
  'A declaração estabelece o critério de autenticidade: as ovelhas de Cristo ouvem Sua voz. Isso se aplica ao discernimento de falsos mestres e à segurança da salvação.',
  'O relacionamento de Cristo com Seu povo é pessoal e conhecido. Ele não pastoreia multidões anônimas — conhece cada ovelha pelo nome.',
  ['Ouvir a voz de Cristo e segui-la', 'Buscar o conhecimento pessoal de Cristo', 'Discernir Sua voz entre as muitas vozes do mundo'],
  ['Como reconhecemos a voz de Cristo?', 'O que significa conhecer e ser conhecido por Cristo?', 'Que consolo existe em saber que Cristo nos conhece individualmente?'],
  ['Jo 10:3-4', 'Jo 10:14', '1 Jo 2:3-6', 'Mt 7:15-20']);

addVS(10, 28,
  'Eu dou-lhes vida eterna, e jamais perecerão — segurança eterna do crente',
  'A promessa de vida eterna e segurança absoluta. Ninguém pode arrancar as ovelhas da mão de Cristo, nem da mão do Pai.',
  'A declaração é uma das mais consoladoras do Evangelho: a segurança da salvação depende da mão de Cristo, não da nossa firmeza.',
  'A segurança da salvação é baseada no poder de Cristo, não na perfeição do crente. Isso é alivio para quem luta com dúvidas e fracassos. A vida eterna não pode ser perdida porque depende da mão de Cristo.',
  ['Viver na certeza da segurança eterna em Cristo', 'Confiar que a mão de Cristo é mais forte que nossas fraquezas', 'Reconhecer que a segurança é dádiva, não conquista humana'],
  ['O que a segurança eterna significa para a vida cristã?', 'Como a segurança pela mão de Cristo difere da segurança pelas nossas obras?', 'Que conforto a promessa de "jamais perecerão" traz?'],
  ['Jo 6:37-40', 'Rm 8:35-39', 'Fp 1:6']);

// ═══════ CAPITULO 11 ═══════

addVS(11, 25,
  'Eu sou a ressurreição e a vida — a vitória sobre a morte',
  'A sexta declaração "Eu sou" em Joao. Cristo não apenas ressuscita mortos — Ele é a própria ressurreição. A vida eterna é Nele mesmo, não apenas um dom que Ele distribui.',
  'A declaração é feita diante do túmulo de Lázaro, o maior sinal joanino antes da paixão. Isso antecipa a própria ressurreição de Cristo e fundamenta a ressurreição futura dos crentes.',
  'Cristo é a fonte da vida eterna. A ressurreição não é apenas um evento futuro — é uma realidade presente em Cristo. Quem Nele cre já tem a vida eterna. A morte é derrotada.',
  ['Confiar em Cristo como a fonte da vida eterna, mesmo diante da morte', 'Viver com a certeza de que a morte não é o fim para quem está em Cristo', 'Anunciar a vitória sobre a morte como central do evangelho'],
  ['O que significa Jesus ser "a ressurreição e a vida"?', 'Como essa declaração prepara os discipulos para a Sua própria ressurreição?', 'Que impacto a vitória sobre a morte tem na vida diária do crente?'],
  ['Jo 14:6', 'Jo 6:39-40', '1 Co 15:55-57', 'Rm 6:5-11']);

addVS(11, 26,
  'Quem vive e crê em mim jamais morrerá — a vida eterna presente',
  'Jesus declara que a vida eterna é presente e eterna. "Jamais morrerá" não se refere à morte física, mas à morte espiritual eterna.',
  'O versiculo complementa a declaração anterior: quem tem a vida eterna não perece. A morte física é uma transição, não um fim.',
  'A vida eterna começa na fé e continua eternamente. A morte física é uma porta, não um muro.',
  ['Viver na certeza de que a morte é transição, não fim', 'Reconhecer que a vida eterna é presente e não apenas futura', 'Anunciar que a fé em Cristo vence a morte espiritual'],
  ['Que diferença existe entre morte física e morte espiritual?', 'Como a vida eterna se manifesta agora?', 'Que consolo a promessa de "jamais morrerá" traz diante da morte?'],
  ['Jo 5:24', 'Rm 8:38-39', '1 Co 15:51-57', 'Ap 20:6']);

addVS(11, 35,
  'Jesus chorou — a compaixão genuína de Cristo',
  'O versiculo mais curto da Bíblia (em português e em grego), mas um dos mais profundos. O Verbo que criou o universo chora diante da morte de um amigo.',
  'O choro de Jesus revela Sua humanidade genuína. Ele não é um deus distante — Ele compartilha nossas dores e tristezas. Mesmo sabendo que ressuscitaria Lázaro, Ele chora com quem chora.',
  'A compaixão de Cristo é real e emocional. Ele não apenas entende intelectualmente nosso sofrimento — Ele o sente profundamente. Isso fundamenta Sua capacidade de ser nosso Sumo Sacerdote.',
  ['Reconhecer que Cristo sente nossas dores e chora connosco', 'Ter permissão para chorar e expressar tristeza diante da morte', 'Cultivar a compaixão como Cristo, chorando com quem chora'],
  ['Por que Jesus chorou se sabia que ia ressuscitar Lázaro?', 'O que o choro de Jesus ensina sobre a compaixão de Deus?', 'Como a humanidade de Cristo nos dá permissão para sermos vulneráveis?'],
  ['Hb 4:15', 'Sl 56:8', 'Is 53:3', 'Rm 12:15']);

// ═══════ CAPITULO 13 ═══════

addVS(13, 1,
  'Tendo amado os seus que estavam no mundo, amou-os até o fim — o amor até a cruz',
  'O versiculo de abertura do discurso da despedida. "Até o fim" (eis telos) pode significar até a morte na cruz, ou até a consumação eterna. O amor de Cristo é completo e sem limites.',
  'A lavagem dos pés é o prelúdio da ceia e da paixão. Jesus demonstra o amor sacrificial antes de ensiná-lo.',
  'O amor de Cristo é perseverante e total. Ele amou os seus "até o fim" — até a morte na cruz. Isso fundamenta a segurança da salvação: o amor que sustenta é o mesmo que salva.',
  ['Reconhecer que o amor de Cristo é até o fim, sem limites', 'Imitar o amor perseverante de Cristo para com os outros', 'Viver na certeza de que o amor de Cristo não desiste'],
  ['O que "até o fim" significa na vida do crente?', 'Como o amor até a cruz se aplica na vida cristã?', 'Que consolo existe em saber que o amor de Cristo é perseverante?'],
  ['Jo 15:9', 'Rm 8:35-39', 'Ef 3:17-19', '1 Jo 3:16']);

addVS(13, 34,
  'Um mandamento novo vos dou: que vos ameis uns aos outros — o amor como marca da igreja',
  'O mandamento do amor fraternal é "novo" não no conteúdo (já existia no AT), mas na norma: "como eu vos amei". O padrão do amor cristão é o amor sacrificial de Cristo na cruz.',
  'O mandamento do amor é o nucleo da ética cristã em Joao. Isso antecipa os discursos da videira (cap. 15) e a oração sacerdotal (cap. 17).',
  'O amor cristão se define pelo amor de Cristo: sacrificial, incondicional, servicial. Isso vai além do amor natural e requer a obra do Espírito Santo.',
  ['Amar os outros como Cristo nos amou — sacrificial e incondicional', 'Cultivar o amor fraternal como marca da igreja', 'Reconhecer que o amor é o critério de reconhecimento dos discipulos'],
  ['O que o "novo" do mandamento do amor significa?', 'Como o amor de Cristo se torna norma para o amor cristão?', 'Que testemunho o amor fraternal tem para o mundo?'],
  ['Jo 15:12-13', '1 Jo 3:16-18', '1 Jo 4:7-12', 'Rm 13:8-10']);

addVS(13, 35,
  'Nisto conhecereis que sois meus discipulos: se tiverdes amor uns pelos outros — o critério de autenticidade',
  'O amor fraternal é o critério público de autenticidade do discipulado. O mundo reconhece que os discipulos de Cristo são autênticos pelo amor que demonstram.',
  'O versiculo completa o mandamento anterior: o amor não é apenas obrigação, mas testemunho.',
  'O amor é a evangelização mais poderosa. O mundo não é convencido por argumentos, mas pelo amor genuíno entre os crentes.',
  ['Demonstrar amor genuíno como testemunho ao mundo', 'Examinar se minha comunidade demonstra amor que o mundo reconhece', 'Reconhecer que o amor é mais persuasivo que qualquer argumento'],
  ['Como o amor fraternal se torna testemunho ao mundo?', 'Que formas de amor são mais persuasivas para quem não crê?', 'Como a falta de amor na igreja prejudica o testemunho?'],
  ['Jo 15:12', '1 Jo 3:18', '1 Jo 4:7-12', 'Mt 5:14-16']);

// ═══════ CAPITULO 14 ═══════

addVS(14, 1,
  'Não se turbe o vosso coração — confiança em meio à tribulação',
  'A primeira palavra do discurso da despedida: não se turbe. Jesus antecipa a tristeza dos discipulos e oferece consolo e direção. "Crêdes em Deus, crede também em mim".',
  'O discurso do Cenáculo (caps. 14-16) é o coração pastoral do Evangelho de Joao. Jesus prepara Seus discipulos para Sua partida.',
  'A turbação do coração é humana, mas a resposta de Cristo é consolo e verdade. A fé não elimina a tristeza, mas a sustenta. A fé em Deus e em Cristo é o antídoto contra a turbulação.',
  ['Trazer as turbulações do coracao a Cristo em oração', 'Lembrar das promessas de Cristo em tempos de angustia', 'Cultivar a fé em Deus e em Cristo como âncora'],
  ['Como Jesus responde à tristeza dos discipulos?', 'Que consolo existe na promessa "não se turbe o vosso coração"?', 'Como a fé em Cristo sustenta em tempos difíceis?'],
  ['Jo 14:27', 'Fp 4:6-7', '1 Pe 5:7', 'Is 41:10']);

addVS(14, 2,
  'Na casa de meu Pai há muitas moradas — o preparo celestial',
  'A promessa de que Jesus prepara lugar para os crentes na casa do Pai. "Muitas moradas" indica abundância e espaço para todos.',
  'A declaração é consolo para os discipulos que vão perder a companhia física de Jesus.',
  'Jesus prepara um lugar para os crentes. A eternidade não é incerteza, mas preparo divino. Há lugar garantido para quem Nele cre.',
  ['Viver na certeza de que há um lugar preparado', 'Confiar que Jesus prepara algo melhor do que imaginamos', 'Usar a esperança celestial como motivação para a fidelidade terrena'],
  ['Que tipo de "moradas" Jesus prepara?', 'Como a promessa do preparo celestial afeta a vida presente?', 'O que a eternidade com Deus significa para quem crê?'],
  ['Jo 14:3', '1 Co 2:9', 'Ap 21:1-4', '2 Co 5:1']);

addVS(14, 3,
  'Se eu for e vos preparar o lugar, tornarei e vos levarei para mim mesmo — a promessa do retorno',
  'A declaração é uma das mais consoladoras: Jesus promete voltar para levar os crentes consigo. Isso fundamenta a esperança escatológica cristã.',
  'A promessa inclui retorno, preparo e reunião. Jesus não abandona — Ele volta.',
  'A volta de Cristo é certa e pessoal. Ele não delega — Ele mesmo volta para levar os seus.',
  ['Viver com expectativa do retorno de Cristo', 'Usar a esperança da volta como motivação para a santidade'],
  ['O que a volta de Cristo significa para a vida presente?', 'Como a promessa do retorno afeta nossa visão da eternidade?'],
  ['Jo 14:28', 'At 1:11', '1 Ts 4:16-17', 'Ap 22:12']);

addVS(14, 6,
  'Eu sou o caminho, a verdade e a vida — a exclusividade absoluta de Cristo',
  'A declaração mais famosa sobre a exclusividade de Cristo. Ele não é um caminho entre muitos — é O caminho, A verdade e A vida. Resposta à pergunta de Tomé.',
  'A declaração é a resposta à pergunta de Tomé: "Senhor, não sabemos para onde vais; como podemos saber o caminho?"',
  'Cristo é a unica via de acesso a Deus. Isso é humilhante para o orgulho humano, mas libertador para quem abraça a verdade. Não há pluralismo de caminhos.',
  ['Aceitar a exclusividade de Cristo como único caminho a Deus', 'Viver de acordo com a verdade que Cristo revela', 'Ter a certeza de que Cristo é a vida plena'],
  ['O que as três declarações (caminho, verdade, vida) ensinam sobre Cristo?', 'Como a exclusividade de Cristo desafia o relativismo contemporâneo?', 'Que consolo a certeza do caminho traz para quem duvida?'],
  ['Jo 10:9', 'Jo 11:25', '1 Tm 2:5', 'At 4:12']);

addVS(14, 15,
  'Se me amardes, guardareis os meus mandamentos — o amor que obedece',
  'A obediência é a evidência do amor por Cristo. "Se me amardes" é condição; "guardareis" é consequência natural.',
  'O versiculo introduz a relação entre amor e obediência que será desenvolvida em 14:21, 14:23.',
  'O amor genuína se manifesta em obediência. Isso não é legalismo — é a resposta natural do coração que ama.',
  ['Examinar se meu amor por Cristo se manifesta em obediência', 'Reconhecer que a obediência é evidência de amor, não conquista'],
  ['Que relação existe entre amor e obediência?', 'Como a obediência se torna evidência de amor genuíno?'],
  ['Jo 14:21', 'Jo 14:23', '1 Jo 5:3', '1 Jo 2:3-6']);

addVS(14, 16,
  'Outro Consolador vos dará, para que convosco fique eternamente — a promessa do Espírito Santo',
  'A primeira promessa do Espírito Santo como Paracleto (Consolador/Advogado). O "outro" Consolador é da mesma natureza de Cristo — o Espírito Santo continua a obra de Jesus.',
  'A promessa do Espírito é central no discurso da despedida. Jesus garante que a Sua partida não é abandono — é substituição por uma presença ainda mais íntima.',
  'O Espírito Santo é a presença contínua de Cristo na igreja. Ele ensina, recorda, convence e guia. Isso fundamenta a vida espiritual da comunidade cristã.',
  ['Receber a promessa do Espírito Santo com fé', 'Ser sensível à presença e aos ensinamentos do Espírito Santo', 'Cultivar a comunhão com o Espírito Santo como companheiro diário'],
  ['O que o Espírito Santo faz como Consolador?', 'Como a promessa do Espírito consola os discipulos da partida de Jesus?', 'Que diferença a presença do Espírito faz na vida cristã?'],
  ['Jo 14:26', 'Jo 15:26', 'Jo 16:7-15', 'At 1:4-5']);

addVS(14, 17,
  'O Espírito da verdade, que o mundo não pode receber — a rejeição do mundo',
  'O mundo não pode receber o Espírito porque não O vê nem O conhece. Os crentes recebem porque habitam com Ele e estará neles.',
  'A declaração contrasta a recepção do mundo com a dos crentes.',
  'O Espírito Santo habita nos crentes de forma íntima e permanente.',
  ['Valorizar a habitação do Espírito Santo em mim', 'Reconhecer que o mundo não pode compreender o Espírito'],
  ['Por que o mundo não pode receber o Espírito?', 'O que significa o Espírito habitar em nós?'],
  ['Jo 14:16', 'Jo 15:26', '1 Co 6:19', 'Rm 8:9-11']);

addVS(14, 27,
  'Deixo-vos a paz, a minha paz vos dou — a paz sobrenatural de Cristo',
  'A paz de Cristo (eirēnē) é diferente da paz do mundo: não depende de circunstancias, mas da presença interior de Cristo. A declaração contrasta os dois tipos de paz.',
  'A paz do mundo é ausência de conflito; a paz de Cristo é presença de Deus no meio do conflito. A primeira é dependente de circunstancias; a segunda, independente.',
  'A paz de Cristo é um presente que sustenta em meio às tempestades. Isso não é otimismo superficial, mas confiança profunda no character de Deus.',
  ['Receber a paz de Cristo como presente que sustenta em tempos difíceis', 'Não buscar a paz no mundo, mas em Cristo', 'Reconhecer que a paz de Cristo é independente de circunstâncias'],
  ['Como a paz de Cristo difere da paz do mundo?', 'O que significa experimentar a paz de Cristo no meio das dificuldades?', 'Como a paz de Cristo se manifesta mesmo em tempos de crise?'],
  ['Jo 16:33', 'Rm 5:1', 'Fp 4:6-7', 'Is 26:3']);

// ═══════ CAPITULO 15 ═══════

addVS(15, 1,
  'Eu sou a videira verdadeira — a fonte de vida espiritual',
  'A sétima declaração "Eu sou" em Joao. A videira é imagem de Israel no AT (Is 5:1-7); Jesus se declara a verdadeira videira que produz fruto abundante.',
  'O discurso da videira é o ensinamento mais profundo sobre a vida cristã: permanecer em Cristo é a condição para produzir fruto.',
  'Cristo é a fonte de vida e fruto. O Pai é o agricultor que poda para produzir mais fruto. A videira é Cristo; os sarços somos nós.',
  ['Reconhecer que Cristo é a fonte da minha vida espiritual', 'Buscar fruto ao permanecer em Cristo', 'Aceitar a poda divina como instrumento de crescimento'],
  ['O que a videira ensina sobre a relação entre Cristo e os crentes?', 'Que papel o Pai desempenha como agricultor?', 'Como a poda produz mais fruto?'],
  ['Is 5:1-7', 'Jo 15:4-5', 'Gl 5:22-25', 'Mt 7:16-20']);

addVS(15, 3,
  'Vós já estais limpos por causa da palavra que vos tenho falado — a Palavra que purifica',
  'Jesus declara que os discipulos estão limpos pela Sua Palavra. A purificação vem pela Palavra, não apenas pelo batismo ou ritual.',
  'O versiculo prepara o discurso sobre permanência na videira.',
  'A Palavra de Deus tem poder purificador. Ela limpa, transforma e santifica.',
  ['Valorizar a Palavra de Deus como instrumento de purificação', 'Permitir que a Palavra transforme áreas da vida que precisam de limpeza'],
  ['Que tipo de "limpeza" a Palavra de Deus produz?', 'Como a Palavra purifica sem ser ritual?'],
  ['Ef 5:25-26', 'Sl 119:9', 'Tg 1:18', '1 Pe 1:22-25']);

addVS(15, 5,
  'Eu sou a videira, vós os sarços — dependencia total de Cristo',
  'A declaração é a chave de todo o discurso: sem Cristo, nada podemos fazer. O sarço depende totalmente da videira para vida e fruto.',
  'A imagem indica que o fruto não vem de esforço proprio, mas da comunhão vital com Cristo.',
  'A vida cristã é dependencia total de Cristo. O fruto espiritual é resultado da comunhão, não do esforço humano. Isso humilha o orgulho e exalta a graça.',
  ['Permanecer em Cristo como sarço na videira', 'Reconhecer que o fruto espiritual vem da comunhão com Cristo, não do esforço humano', 'Depender de Cristo em cada area da vida'],
  ['O que significa "permanecer em Cristo" na vida prática?', 'Como o fruto espiritual se manifesta quando permanecemos na videira?', 'Por que "sem mim nada podeis fazer" é libertador e não ameaçador?'],
  ['Jo 15:4-5', 'Gl 5:22-25', 'Mt 7:16-20', 'Sl 1:1-3']);

addVS(15, 9,
  'Como o Pai me amou, também eu vos amei — o amor como modelo da comunhão',
  'O amor de Cristo pelos discipulos é modelo do amor do Pai por Cristo. Isso estabelece uma cadeia de amor: Pai → Filho → crentes.',
  'A declaração introduz o tema do amor que permanece e frutifica.',
  'O amor que sustenta a comunhão na videira é o mesmo amor que o Pai tem pelo Filho. Isso fundamenta a segurança da vida cristã.',
  ['Receber o amor de Cristo como fonte da comunhão', 'Viver na certeza de que o amor de Cristo é tão firme quanto o do Pai por Ele'],
  ['Como o amor do Pai pelo Filho se reflete no amor de Cristo por nós?', 'Que segurança o amor divino traz para a vida cristã?'],
  ['Jo 15:10', 'Jo 13:1', '1 Jo 4:9-10', 'Rm 8:35-39']);

addVS(15, 10,
  'Se guardardes os meus mandamentos, permanecereis no meu amor — a obediência que mantém a comunhão',
  'A obediência é o meio de permanecer no amor de Cristo. Isso não é condicionamento, mas a resposta natural do amor.',
  'O versiculo paraleliza amor e obediência: amor leva à obediência; obediência mantém a comunhão.',
  'A obediência não é o preço do amor, mas a expressão dele. Quem ama obedece naturalmente.',
  ['Cultivar a obediência como expressão de amor', 'Reconhecer que a obediência mantém a comunhão com Cristo'],
  ['Que relação entre amor e obediência se estabelece?', 'Como a obediência se torna natural para quem ama?'],
  ['Jo 14:15', '1 Jo 5:3', '2 Jo 1:6']);

addVS(15, 11,
  'Estas coisas vos tenho dito para que a minha alegria esteja em vós, e a vossa alegria seja plena — a alegria completa',
  'O objetivo dos ensinamentos de Cristo não é o dever, mas a alegria. A alegria de Cristo nos enche quando vivemos em comunhão com Ele.',
  'O versiculo encerra o bloco sobre amor e obediência com a promessa de alegria.',
  'A alegria cristã não é dependente de circunstancias, mas da comunhão com Cristo.',
  ['Buscar a alegria que Cristo oferece', 'Reconhecer que a obediência produz alegria, não tristeza'],
  ['Que tipo de alegria Cristo promete?', 'Como a alegria de Cristo se diferencia da alegria do mundo?'],
  ['Jo 15:11', 'Jo 17:13', 'Fp 4:4', 'Ne 8:10']);

addVS(15, 13,
  'Ninguém tem maior amor do que este: que um ponga a sua vida pelos seus amigos — o amor sacrificial supremo',
  'A declaração é o padrão máximo do amor: dar a vida pelos amigos. Isso aponta diretamente para a cruz de Cristo.',
  'O versiculo antecipa a paixão: Cristo dará a vida pelos seus.',
  'O amor cristão se mede pelo sacrifício, não pelo sentimento. O amor que dá a vida é o mais alto testemunho.',
  ['Cultivar o amor sacrificial pelos outros', 'Reconhecer que o amor se mede pelo que dá, não pelo que sente'],
  ['Que tipo de sacrifício o amor sacrificial exige hoje?', 'Como o exemplo de Cristo desafia o amor superficial?'],
  ['Jo 10:11', '1 Jo 3:16', 'Rm 5:8', 'Ef 5:2']);

// ═══════ CAPITULO 16 ═══════

addVS(16, 7,
  'É melhor para vós que eu vá — a vantagem da partida de Cristo',
  'Jesus diz que a Sua partida é "melhor" porque permite a vinda do Espírito Santo. O Espírito em nós é mais íntimo que a presença física de Jesus.',
  'A declaração paradoxal prepara os discipulos para a partida. O Consolador interno é mais íntimo que a presença fisica.',
  'A vida sob o Espírito Santo é mais rica que a vida com Jesus fisicamente. O Espírito habita interiormente, ensina e guia continuamente. Isso fundamenta a vida cristã pós-ascensão.',
  ['Receber a partida de Cristo como ganho, não perda', 'Valorizar a presença do Espírito Santo como continuação da obra de Cristo', 'Reconhecer que o Espírito conosco é melhor que Jesus ao nosso lado fisicamente'],
  ['Por que a partida de Jesus é "melhor" para os discipulos?', 'Como a presença do Espírito Santo supera a presença fisica de Cristo?', 'Que vantagens a presença do Espírito oferece?'],
  ['Jo 14:16-18', 'Jo 14:26', 'Jo 16:13-15', 'At 2:1-4']);

addVS(16, 8,
  'Quando vier, convencerá o mundo de pecado, de justiça e de julgamento — a obra do Espírito no mundo',
  'O Espírito Santo tem três ministérios para com o mundo: convencer de pecado (rejeição de Cristo), de justiça (Cristo foi justificado) e de julgamento (Satan foi julgado).',
  'O versiculo introduz a obra do Espírito Santo não apenas para os crentes, mas para o mundo.',
  'O Espírito Santo convence o mundo da verdade sobre pecado, justiça e julgamento. Isso é o fundamento da evangelização.',
  ['Valorizar a obra do Espírito Santo na convicção dos corações', 'Reconhecer que a conversão depende da obra do Espírito, não apenas de argumentos'],
  ['Como o Espírito convence de pecado, justiça e julgamento?', 'Que papel a convicção do Espírito desempenha na evangelização?'],
  ['Jo 16:9-11', 'At 2:37', '2 Co 4:4-6']);

addVS(16, 13,
  'Quando vier o Espírito da verdade, Ele vos guiará a toda a verdade — a iluminação divina',
  'O Espírito Santo é o guia infalível para a verdade. Ele não fala por Si mesmo, mas revela o que é de Cristo e do Pai.',
  'O versiculo fundamenta a iluminação do Espírito Santo no estudo das Escrituras e na vida cristã.',
  'A verdade não é conquista racional, mas revelação do Espírito. Isso não nega o estudo, mas o complementa com a iluminação divina.',
  ['Depender do Espírito Santo para compreender as Escrituras', 'Buscar a guia do Espírito nas decisões da vida', 'Cultivar a sensibilidade ao guiar do Espírito'],
  ['Como o Espírito Santo guia à verdade?', 'Que papel a iluminação do Espírito desempenha no estudo bíblico?', 'Como discernir a voz do Espírito?'],
  ['Jo 14:26', '1 Co 2:10-14', 'Ef 1:17-18', '1 Jo 2:27']);

addVS(16, 33,
  'No mundo tereis aflições; mas tende bom ânimo, eu venci o mundo — a vitória em meio às tribulações',
  'A declaração final do discurso da despedida: aflições são certas, mas a vitória também é certa. Cristo venceu o mundo.',
  'O versiculo é o equilíbrio perfeito entre realismo (aflições) e otimismo cristão (vitória).',
  'A vitória de Cristo sobre o mundo não elimina as tribulações, mas as transforma em contexto de vitória.',
  ['Viver com a certeza de que Cristo venceu o mundo', 'Ter bom ânimo mesmo em meio às aflições', 'Reconhecer que as tribulações não anulam a vitória de Cristo'],
  ['Como a vitória de Cristo se manifesta em meio às aflições?', 'O que "vencer o mundo" significa na prática?', 'Como a certeza da vitória afeta a forma como enfrentamos dificuldades?'],
  ['Jo 14:27', 'Rm 8:37', '1 Jo 5:4', '2 Co 2:14']);

// ═══════ CAPITULO 17 ═══════

addVS(17, 1,
  'Pai, a hora é chegada; glorifica o teu Filho para que o Filho te glorifique — a hora da glória',
  'A oração sacerdotal começa com a "hora" — o tema central de Joao. A "hora" é a cruz, que é simultaneamente a máxima humilhação e a máxima glorificação de Cristo.',
  'A oração sacerdotal é a mais longa oração registrada de Jesus. Ela revela o coração de Cristo para com Seu povo.',
  'A glória de Cristo se manifesta plenamente na cruz. O que parece derrota é a maior demonstração de amor e poder.',
  ['Reconhecer que a glória de Deus se manifesta na cruz', 'Viver na certeza de que a cruz é vitória, não derrota'],
  ['Por que a cruz é simultaneamente humilhação e glorificação?', 'Como a oração de Jesus revela o Seu coração?'],
  ['Jo 12:23', 'Jo 13:1', 'Fp 2:5-11']);

addVS(17, 2,
  'Assim lhe concedeste poder sobre toda carne — a autoridade universal de Cristo',
  'A declaração estabelece a autoridade universal de Cristo: todo ser humano está sob o Seu domínio.',
  'A autoridade de Cristo é dádiva do Pai, não conquista humana.',
  'Cristo tem autoridade sobre toda a criação. Isso fundamenta a universalidade da salvação e da adoração.',
  ['Reconhecer a autoridade universal de Cristo', 'Submeter toda a vida à autoridade de Cristo'],
  ['O que a autoridade sobre "toda carne" significa?', 'Como a autoridade de Cristo se aplica à vida diária?'],
  ['Mt 28:18', 'Fp 2:9-11', 'Ef 1:20-22']);

addVS(17, 3,
  'Esta é a vida eterna: que te conheçam a ti, o único Deus verdadeiro, e a Jesus Cristo — conhecimento como comunhão',
  'A vida eterna é definida como conhecimento relacional de Deus e de Cristo. Isso vai além do conhecimento intelectual — é comunhão pessoal, íntima e transformadora.',
  'A declaração é o resumo de todo o Evangelho: a vida eterna começa no conhecimento de Deus e se aprofunda eternamente.',
  'A vida eterna começa agora, não apenas no céu. Conhecer a Deus é possuir vida eterna presente e futura.',
  ['Buscar o conhecimento relacional de Deus como o bem supremo', 'Viver na certeza de que conhecer a Cristo é possuir a vida eterna', 'Aprofundar o conhecimento de Deus como fonte de vida'],
  ['O que o conhecimento de Deus significa em termos de relacionamento?', 'Como o conhecimento relacional se difere do conhecimento intelectual?', 'Como o conhecimento de Deus se aprofunda na eternidade?'],
  ['Jo 14:6', 'Jo 10:38', '1 Jo 5:20', 'Ef 1:17', '2 Pe 1:2-3']);

addVS(17, 5,
  'Pai, glorifica-me junto de ti com a glória que tive contigo antes que o mundo fosse — a eternidade de Cristo',
  'Jesus pede a restauração da glória que teve com o Pai antes da criação. Isso declara Sua preexistencia e divindade.',
  'A declaração é uma das mais fortes sobre a preexistencia de Cristo.',
  'Cristo existia antes do mundo e tinha glória junto do Pai. A encarnação foi uma humilhação temporária; a exaltação é a restauração da glória eterna.',
  ['Adorar a Cristo como preexistente e eterno', 'Reconhecer que a encarnação foi humilhação voluntária'],
  ['Que implicações a preexistencia de Cristo tem para a nossa fé?', 'Como a pedida de glória se relaciona com a encarnação?'],
  ['Jo 1:1-2', 'Jo 8:58', 'Fp 2:6-8', 'Cl 1:17']);

addVS(17, 20,
  'Não rogo somente por estes, mas também por aqueles que hão de crer em mim — oração por todos os crentes',
  'A oração de Jesus se estende além dos discipulos presentes para todos os crentes futuros, incluindo nós. Isso é uma das maiores consolações do Evangelho.',
  'Jesus ora por todos os crentes de todos os tempos. Isso fundamenta a intercessão eterna de Cristo (Hb 7:25) e a segurança da igreja.',
  'A oração de Jesus por nós é garantia de que não estamos sozinhos. Ele intercede continuamente pelo Seu povo junto ao Pai.',
  ['Viver na certeza de que Jesus ora por nós continuamente', 'Interceder uns pelos outros, seguindo o exemplo de Cristo', 'Valorizar a intercessão eterna de Cristo como fundamento da segurança'],
  ['Como a oração de Jesus por todos os crentes nos consola?', 'Que segurança existe em saber que Cristo intercede por nós?', 'Como a intercessão de Cristo se relaciona com a nossa oração?'],
  ['Hb 7:25', 'Rm 8:34', '1 Jo 2:1', 'Rm 8:26-27']);

addVS(17, 21,
  'Para que todos sejam um, como tu, Pai, és em mim, e eu em ti — a unidade como testemunho',
  'A oração de Jesus pela unidade dos crentes é uma das mais profundas. A unidade é modelo: assim como Pai e Filho são um, os crentes devem ser um.',
  'A unidade não é uniformidade, mas comunhão na verdade e no amor.',
  'A unidade da igreja é testemunho ao mundo sobre a realidade de Deus.',
  ['Buscar a unidade da igreja como testemunho ao mundo', 'Reconhecer que a unidade é mais que harmonia — é comunhão em Cristo'],
  ['O que a unidade entre Pai e Filho ensina sobre a unidade da igreja?', 'Como a unidade se manifesta em meio à diversidade?'],
  ['Jo 17:22-23', 'Ef 4:3-6', 'Fp 2:1-4']);

addVS(17, 22,
  'A glória que me deste, dei-lhes — a glória compartilhada',
  'Jesus compartilha Sua glória com os crentes. Isso não é glória de poder, mas glória de comunhão e testemunho.',
  'A declaração estabelece a união mística entre Cristo e os crentes.',
  'Os crentes participam da glória de Cristo. Isso eleva a dignidade do crente.',
  ['Reconhecer que participamos da glória de Cristo', 'Viver de forma digna da glória que recebemos'],
  ['Que tipo de glória Cristo compartilha conosco?', 'Como a glória compartilhada se manifesta na vida do crente?'],
  ['Jo 17:22', '2 Co 3:18', 'Rm 8:17', '1 Pe 5:10']);

addVS(17, 23,
  'Para que sejam um em nós — a unidade perfeita',
  'A culminação da oração pela unidade: perfeita comunhão entre os crentes, refletindo a comunhão entre Pai e Filho.',
  'A unidade é o objetivo da oração sacerdotal.',
  'A unidade perfeita é o testemunho máximo ao mundo.',
  ['Buscar a unidade como objetivo supremo da comunidade', 'Reconhecer que a unidade é testemunho ao mundo'],
  ['Como a unidade da igreja testemunha ao mundo?', 'Que obstáculos impedem a unidade?'],
  ['Jo 17:21-22', 'Ef 4:3-6', '1 Co 1:10']);

// ═══════ CAPITULO 18 ═══════

addVS(18, 6,
  'Quando lhes disse "Eu sou", recuaram e caíram no chão — o poder do nome divino',
  'A declaração "Eu sou" no Getsêmani causa queda dos soldados. O poder do nome divino se manifesta mesmo na aparente fraqueza da paixão.',
  'O episodio revela que a captura de Jesus não foi força humana, mas consentimento divino. Jesus se entrega, não é capturado.',
  'O poder de Cristo se manifesta mesmo no momento de maior aparente fraqueza. A cruz não é derrota — é vitória. O "Eu sou" de Êxodo 3:14 causa queda.',
  ['Reconhecer que a aparente fraqueza de Cristo esconde poder divino', 'Confiar que Deus age mesmo quando as circunstancias parecem contra nós', 'Adorar o "Eu sou" que causa queda e adoração'],
  ['Por que os soldados caíram quando Jesus disse "Eu sou"?', 'Como o poder de Cristo se manifesta na aparente fraqueza da cruz?', 'Que consolo o poder do "Eu sou" traz para as dificuldades?'],
  ['Jo 10:18', 'Fp 2:5-11', 'Is 53:7', '1 Co 1:25']);

addVS(18, 36,
  'O meu reino não é deste mundo — a natureza do reino de Cristo',
  'Jesus declara que Seu reino não é "deste mundo" (ek tou kosmou tou tou). Isso não significa que não está no mundo, mas que não tem origem no mundo.',
  'A declaração redefine a natureza messiânica: Jesus não veio para estabelecer reino politico, mas espiritual.',
  'O reino de Cristo transcende os reinos humanos. Isso evita tanto o politismo quanto o quietismo.',
  ['Reconhecer que o reino de Cristo transcende os reinos humanos', 'Viver como cidadão do reino de Cristo em meio aos reinos do mundo', 'Evitar a politicagem da fé sem abandonar a responsabilidade social'],
  ['Que tipo de reino Cristo veio estabelecer?', 'Como o reino de Cristo se relaciona com os reinos políticos?', 'O que significa ser cidadão do reino de Cristo?'],
  ['Mt 6:33', 'Mt 6:10', 'Rm 14:17', 'Ap 11:15']);

// ═══════ CAPITULO 19 ═══════

addVS(19, 26,
  'Mulher, ai está teu filho — o cuidado de Cristo na cruz',
  'A primeira palavra da cruz dirigida à mãe: Maria. Jesus, mesmo na agonia, cuida dos que ama. Isso revela Sua humanidade compasiva e Sua obediência ao mandamento de honrar pai e mãe.',
  'A declaração é uma das sete palavras da cruz. Jesus confia Maria ao discípulo amado.',
  'A cruz não impede o cuidado pelos entes queridos. Jesus mostra que o amor se manifesta mesmo no sofrimento extremo.',
  ['Cuidar dos entes queridos mesmo em tempos difíceis', 'Reconhecer que o amor se manifesta no sacrifício', 'Honrar os pais mesmo em circunstâncias extremas'],
  ['O que a declaração à mãe ensina sobre o cuidado de Cristo?', 'Como Jesus equilibra o sofrimento pessoal com o cuidado pelos outros?'],
  ['Ex 20:12', 'Lc 2:34-35', '1 Tm 5:8']);

addVS(19, 27,
  'Ai está teu filho — o discipulo é confiado à mãe',
  'Jesus confia Maria ao discípulo amado, estabelecendo uma nova relação familiar baseada na fé.',
  'A declaração completa o cuidado de Jesus pela mãe.',
  'A comunidade cristã se torna família. O discípulo e a mãe de Jesus se tornam pai e filho na fé.',
  ['Reconhecer que a fé cria laços familiares mais profundos que o sangue', 'Cuidar dos membros da comunidade como família'],
  ['O que a nova relação familiar ensina sobre a igreja?', 'Como a fé cria laços mais fortes que o sangue?'],
  ['Mc 3:34-35', 'Mt 12:49-50', 'Gl 6:10']);

addVS(19, 30,
  'Está consumado — a obra redentora completa',
  'A sexta palavra da cruz: "Consummatum est" (Está consumado). A obra redentora está completa — nada falta. Isso não é derrota, mas vitória consumada.',
  'A declaração é o climax teológico da paixão. A salvação está completa — a obra de Cristo na cruz é suficiente e final.',
  'A redenção é obra completa de Cristo, não parcial. Nada pode ser adicionado ao que Ele fez na cruz. Isso fundamenta a certeza da salvação.',
  ['Receber a redenção como obra completa de Cristo', 'Não tentar complementar com obras o que Cristo já consumou', 'Viver na certeza de que a salvação é completa em Cristo'],
  ['O que "está consumado" significa para a nossa salvação?', 'Como a completeza da obra de Cristo afeta nossa vida cristã?', 'Por que nada pode ser adicionado ao que Cristo fez na cruz?'],
  ['Hb 9:12', 'Hb 10:10-14', 'Rm 5:9', '1 Jo 2:2']);

// ═══════ CAPITULO 20 ═══════

addVS(20, 1,
  'No primeiro dia da semana, Maria Madalena foi ao túmulo de manhã cedo — a ressurreição anunciada',
  'O primeiro dia da semana (domingos) se torna o dia da adoração cristã por causa da ressurreição. Maria Madalena vai ao túmulo antes do amanhecer.',
  'O relato da ressurreição é o climax de todo o Evangelho. A primeira testemunha é uma mulher — algo revolucionário no seculo I.',
  'A ressurreição de Cristo é o fato historico mais importante da historia. Sem ela, a fé é vã (1 Co 15:14).',
  ['Celebrar a ressurreição como fundamento da fé cristã', 'Reconhecer que a ressurreição transforma tudo'],
  ['Por que a ressurreição é o fato mais importante da história?', 'Como a ressurreição transforma a vida do crente?'],
  ['1 Co 15:3-8', 'Mc 16:1-8', 'Lc 24:1-12']);

addVS(20, 2,
  'Tiraram o Senhor do túmulo, e não sabemos onde o puseram — a preocupação humana',
  'Maria Madalena e as outras mulheres estão preocupadas com quem moveu o corpo. Elas ainda não entenderam que Cristo ressuscitou.',
  'O relato mostra a gradual compreensão da ressurreição.',
  'A dúvida humana é natural. Deus tem paciência com nossas dúvidas e nos guia gradualmente.',
  ['Ter paciência com as dúvidas dos outros', 'Reconhecer que a compreensão da ressurreição é gradual'],
  ['Por que Maria Madalena ainda não entendeu a ressurreição?', 'Como Deus guia nossas dúvidas até a verdade?'],
  ['Lc 24:11', 'Mc 16:11']);

addVS(20, 5,
  'Nao entrou, so olhou — a cautela da fé inicial',
  'Pedro e João vão ao túmulo. João olha e não entra; Pedro entra e vê os panos. A fé inicial é cautelosa.',
  'O relato mostra diferentes respostas à ressurreição: curiosidade, dúvida e fé.',
  'A investigação honesta leva à fé.',
  ['Investigar a ressurreição com honestidade', 'Não ter medo de examinar as evidências'],
  ['Por que João não entrou no túmulo?', 'Que papel a investigação honesta desempenha na fé?'],
  ['Lc 24:12', 'At 1:3']);

addVS(20, 6,
  'Entrou também Simão Pedro, que lhe seguia — a ousadia de Pedro',
  'Pedro, apesar da negação, ousa entrar no túmulo. Isso mostra que a graça restauradora já está operando.',
  'A ousadia de Pedro contrasta com sua negação recente.',
  'Deus restaura quem fracassou. A graça não depende da perfeição passada.',
  ['Ter ousadia para investigar a fé mesmo após fracassos', 'Reconhecer que a graça restauradora já opera'],
  ['Como a graça restauradora opera na vida de Pedro?', 'O que a ousadia de Pedro ensina sobre a restauração?'],
  ['Lc 22:54-62', 'Jo 21:15-17']);

addVS(20, 8,
  'Entrou também o outro discipulo, que primeiro vira o túmulo, e viu e creu — a fé pela evidência',
  'João entra e vê os panos e crê. Isso é o primeiro registro de fé na ressurreição no Evangelho.',
  'A fé na ressurreição se baseia na evidência historica.',
  'A fé não é cega — é baseada na evidência da ressurreição.',
  ['Basear a fé na evidência da ressurreição', 'Reconhecer que a fé é razoável e baseada em fatos'],
  ['Que evidências levaram João a crer?', 'Como as evidências da ressurreição sustentam a fé hoje?'],
  ['1 Co 15:3-8', 'At 1:3', 'Rm 1:4']);

addVS(20, 28,
  'Tomé respondeu e disse-lhe: Meu Senhor e meu Deus! — a confissão suprema de fé',
  'A confissão de fé mais forte do Evangelho: Tomé reconhece Jesus como Senhor e Deus. Isso é a culminação da cristologia joanina.',
  'A confissão de Tomé é o climax do Evangelho. Todos os sinais, discursos e ensinamentos levam a esta declaração de divindade.',
  'A fé em Cristo culmina no reconhecimento de Sua plena divindade. Isso é o nucleo do cristianismo: Jesus é Senhor e Deus.',
  ['Confessar a divindade de Cristo como nucleo da fé', 'Permitir que a fé em Cristo Senhor e Deus transforme toda a vida', 'Reconhecer que a confissão de fé é o climax da experiência cristã'],
  ['O que a confissão de Tomé ensina sobre a identidade de Jesus?', 'Como a confissão de fé é o climax da experiência cristã?', 'Que transformação a confissão "Meu Senhor e meu Deus" produz?'],
  ['Jo 1:1', 'Jo 20:30-31', 'Fp 2:9-11', 'Rm 10:9-10']);

addVS(20, 29,
  'Porque me viste, Tomé, creste? Bem-aventurados os que não viram e creram — a fé sem ver',
  'Jesus abençoa a fé que não depende de evidencia visual. Isso é um paradoxo: a ressurreição é historica, mas a fé vai além do ver.',
  'O versiculo é uma benção para todos os crentes posteriores que não viram fisicamente a Cristo, mas creem.',
  'A fé genuína vai além da evidencia sensorial. A benção de Cristo é para quem crê sem ver — isso é fé madura e confiante.',
  ['Abençoar e cultivar a fé que não depende de ver fisicamente', 'Reconhecer que a fé sem ver é benção de Cristo', 'Viver na certeza de que a fé tem fundamento mesmo sem ver'],
  ['Por que a fé sem ver é mais benção do que a fé que vê?', 'Como cultivar uma fé que resista à falta de evidencia sensorial?', 'Que consolo a benção de Cristo traz para quem não viu?'],
  ['Rm 8:24-25', '1 Pe 1:6-9', 'Hb 11:1', '2 Co 5:7']);

addVS(20, 31,
  'Estas coisas foram escritas para que creiais que Jesus é o Cristo, o Filho de Deus — o propósito do Evangelho',
  'O versiculo é o proposito declarado de todo o Evangelho de Joao: que os leitores creiam que Jesus é o Cristo e o Filho de Deus, e que crendo, tenham vida em seu nome.',
  'O versiculo é a conclusão narrativa do Evangelho, estabelecendo o proposito literário e teológico.',
  'O Evangelho de Joao é um livro evangelístico. Seu proposito é levar à fé em Cristo como Messias e Filho de Deus.',
  ['Reconhecer que o Evangelho de Joao foi escrito para produzir fé', 'Usar o Evangelho de Joao como ferramenta de evangelismo', 'Afirmar que Jesus é o Cristo e Filho de Deus'],
  ['Que tipo de fé o Evangelho de Joao busca produzir?', 'Como "vida em seu nome" se manifesta?', 'Como o propósito do Evangelho se relaciona com a vida cristã?'],
  ['Jo 20:28', 'Jo 3:16', '1 Jo 5:11-13', 'Rm 10:9-10']);

// ═══════ CAPITULO 21 ═══════

addVS(21, 15,
  'Tu me amas? — apascenta os meus cordeiros — a restauração e comissão de Pedro',
  'A restauração de Pedro após a negação. Jesus pergunta três vezes "Tu me amas?", correspondendo às três negações. A restauração é completa e publica, ao lado do lago.',
  'A restauração de Pedro é um dos episodios mais bonitos do Evangelho. Jesus não rejeita o apóstolo fracassado — Ele o restaura e o comissiona para pastorear.',
  'Deus restaura quem fracassou. A negação de Pedro não é o fim da história — a graça de Cristo é maior que o pecado. A restauração é proporcional à negação: três perguntas, três afirmações.',
  ['Receber a restauração de Cristo mesmo após o fracasso', 'Aceitar a comissão de pastorear após a restauração', 'Reconhecer que Deus usa quem fracassou e foi restaurado'],
  ['Como Jesus restaura Pedro de forma publica e gentil?', 'O que a restauração de Pedro ensina sobre a graça de Deus?', 'Que lição a restauração dá para quem fracassou na fé?'],
  ['Lc 22:54-62', 'Mt 26:69-75', 'Mc 16:7', '2 Co 5:18-20']);

addVS(21, 16,
  'Apascenta as minhas ovelhas — a comissão pastoral',
  'A segunda pergunta e a segunda comissão: "Apascenta". A responsabilidade pastoral é confiada a Pedro.',
  'A repetição enfatiza a seriedade da comissão.',
  'A liderança pastoral é dom divino, não conquista humana.',
  ['Aceitar a responsabilidade pastoral com humildade', 'Reconhecer que pastorear é comissão divina'],
  ['O que a repetição da pergunta e da comissão ensina?', 'Que responsabilidades o pastoreio envolve?'],
  ['1 Pe 5:2-4', 'At 20:28', 'Ef 4:11-12']);

addVS(21, 17,
  'Senhor, tu sabes todas as coisas — sabes que te amo — o conhecimento divino do coração',
  'Pedro confessa que Jesus sabe tudo — inclusive o amor genuíno que existe mesmo em meio à negação. "Tu sabes tudo" reconhece a onisciência de Cristo.',
  'A terceira restauração de Pedro é a mais profunda: Jesus pergunta "Tu me amas?" e Pedro responde "Tu sabes tudo".',
  'Deus conhece o coracao melhor do que nós mesmos. Mesmo quando duvidamos de nosso amor por Ele, Ele sabe o que ha no fundo do coraque.',
  ['Confiar que Deus conhece nosso amor mesmo quando duvidamos', 'Reconhecer que o conhecimento de Deus sobre nós é perfeito', 'Aceitar que Deus vê além das nossas falhas'],
  ['Como o conhecimento de Deus sobre nosso coraque nos consola?', 'O que a restauração de Pedro ensina sobre a graça de segunda chance?', 'Por que Pedro recorreu ao conhecimento de Deus?'],
  ['Jo 2:25', 'Sl 139:1-4', '1 Jo 3:19-20', '1 Co 4:3-5']);

export default registro;
export const v_jn = registro;
