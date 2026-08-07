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
    livro: 'gn', capitulo, versiculo: v, titulo,
    contextoHistorico, contextoLiterario, significadoTeologico,
    aplicacoes, perguntasEstudo, versiculosConexoes
  };
}

// ═══════════════════════════════════════════════════════════════════════
// GÊNESIS 1 — A Criação
// ═══════════════════════════════════════════════════════════════════════
addVS(1, 1, "A criação dos céus e da terra",
  "Versículo inaugural da Bíblia, escrito por Moisés no deserto durante a peregrinação de Israel (~1446 a.C.). O povo recém-libertado do Egito precisa conhecer a origem de tudo e a soberania do Deus que os libertou.",
  "O texto hebraico 'Bereshit bara Elohim' usa o verbo 'bara' (criar) — um verbo reservado exclusivamente para Deus, indicando criação a partir do nada (ex nihilo). 'Elohim' é plural majestático, sugerindo poder e trindade.",
  "Deus é o Criador soberano de todas as coisas. Não há matéria preexistente — tudo vem dEle. Este versículo é a base de toda a cosologia bíblica e se cumpre em Cristo (Cl 1:16).",
  ["Reconhecer que tudo vem de Deus — nossa vida, talentos e posses não são nossos", "Viver com propósito, pois fomos criados por um Criador com plano", "Cuidar da criação como mordomos, não como donos"],
  ["O que significa 'no princípio'? Existe algo antes de Deus?", "Como a criação ex nihilo afeta nossa visão de mundo?", "Qual a relação entre Gn 1:1 e João 1:1-3?"],
  ["Jo 1:1-3", "Hb 11:3", "Rm 1:20", "Cl 1:16-17", "Ap 4:11"]
);

addVS(1, 2, "A terra sem forma e vazia, e o Espírito de Deus",
  "A frase 'tohu va-vohu' (sem forma e vazia) descreve o estado inicial da terra antes da ordenação divina. Não é caos negativo, mas potencialidade bruta aguardando o comando de Deus.",
  "O verso 2 funciona como transição entre a criação initial (v.1) e a ordenação (v.3 em diante). A água sobre a face do abismo (tehom) conecta-se ao caos marinho das mitologias do Oriente Próximo, mas aqui Deus é soberano sobre ele.",
  "O Espírito de Deus ('ruach Elohim') pairava sobre as águas — a mesma palavra usada para 'sopro' em Gn 2:7. O Espírito é ativo desde a criação, preparando o terreno para a vida.",
  ["Deus trabalha no que parece caos — Ele pode transformar nossa vida desordenada", "O Espírito de Deus está presente mesmo quando não vemos resultado", "Não tenhamos medo do 'vazio' — Deus preenche o que está vazio"],
  ["O que 'tohu va-vohu' significa na cultura do Oriente Próximo?", "Como o Espírito de Deus age na criação e na nossa vida?", "Qual a relação com a regeneração espiritual?"],
  ["Jó 38:8-11", "Sl 104:5-6", "2 Co 4:6", "Ef 2:4-5"]
);

addVS(1, 3, "Disse Deus: Haja luz; e houve luz",
  "A primeira palavra de Deus na Bíblia é 'yehi' — 'haja'. A criação é por decreto verbal. Não há esforço, luta ou conflito — apenas autoridade absoluta. Isso diferencia radicalmente a cosmologia bíblica das mitologias egípcias e babilônicas.",
  "A luz (or) pode ser distinta do sol (criado no dia 4), indicando luz primordial ou a presença gloriosa de Deus. João Calvino e outros reformadores veem aqui a luz da revelação divina.",
  "Jesus é a 'Luz do mundo' (Jo 8:12). A ordem 'Haja luz' se cumpre na encarnação — Deus fala e a luz vem. A salvação é um ato criativo de Deus.",
  ["Quando Deus fala na nossa vida, basta Sua palavra para transformar", "A luz de Deus dissipa a escuridão — não precisamos entender tudo, basta obedecer", "Somos chamados a ser luz no mundo (Mt 5:14)"],
  ["Por que Deus cria pela palavra e não pelo trabalho manual?", "O que representa a luz antes do sol?", "Como Cristo é a luz da criação e da salvação?"],
  ["Sl 33:6", "2 Co 4:6", "Jo 1:4-5", "Jo 8:12", "1 Pd 2:9"]
);

addVS(1, 4, "Viu Deus que a luz era boa; e fez Deus separação entre a luz e as trevas",
  "Deus 'viu' (yara) — o primeiro julgamento moral na Bíblia. A separação entre luz e trevas é o primeiro ato de ordem, estabelecendo o padrão de discernimento que percorre toda a Escritura.",
  "A separação (havdalah) é o princípio organizador da criação: luz/trevas, céu/terra, mar/terra seca. Cada separação é uma declaração de propósito divino.",
  "Deus não cria as trevas — ele separa a luz delas. O mal não é criação de Deus, mas Ele tem autoridade sobre ele. A separação aponta para o juízo final (Mt 25:41).",
  ["Deus é um Deus de ordem, não de confusão — isso se aplica à nossa vida", "O discernimento entre bem e mal começa com Deus como padrão", "As trevas existem, mas a luz prevalece"],
  ["Como a separação luz/trevas se cumpre na história da salvação?", "O que as trevas representam bíblicamente?", "Como discernir a vontade de Deus no dia a dia?"],
  ["Jo 1:5", "Jo 3:19-21", "1 Ts 5:4-5", "Ef 5:8-11"]
);

addVS(1, 5, "Chamou Deus à luz Dia, e às trevas chamou Noite",
  "O ato de 'chamar' (qara) é naming — dar nome é ter autoridade. Deus nomeia Sua obra, estabelecendo identidade e propósito. O dia e a noite são ordenados, não aleatórios.",
  "'E houve tarde e houve manhã, dia primeiro' — o dia bíblico começa ao entardecer (do pôr do sol ao pôr do sol), diferente do calendário romano. Isso é significativo para o Sabbath.",
  "A sucessão dia/noite é o primeiro ritmo de Deus — trabalho e descanso, atividade e repouso. Isso prefigura o Sabbath e o ciclo da graça.",
  ["Deus dá nome às coisas — Ele nos conhece pelo nome (Is 43:1)", "O ritmo dia/noite nos ensina sobre trabalho e descanso", "Mesmo na noite, Deus está no controle"],
  ["Por que Deus estabelece o ciclo dia/noite antes do sol?", "Como o conceito de 'dia' bíblico afeta a interpretação da criação?", "Qual o significado espiritual da noite?"],
  ["Sl 74:16", "Sl 104:19-23", "Is 43:1", "Ap 21:25"]
);

addVS(1, 6, "Firmamento no meio das águas",
  "O firmamento ('raqia') hebraico sugere uma expansão sólida — os antigos israelitas viam o céu como uma cúpula que separava as águas acima (chuva) das águas abaixo (oceanos). A ciência moderna não invalida a verdade teológica.",
  "A separação das águas é o segundo ato de ordenação. O firmamento é chamado de 'céus' (shamayim) no verso 8. A criação é progressiva: de caos a ordem, de potencial a realidade.",
  "Deus estabelece limites e fronteiras. As águas não se misturam — há ordem na criação. Isso reflete o caráter de Deus: Ele é um Deus de limites saudáveis e propósito.",
  ["Deus estabelece limites por amor, não por restrição", "A ordem na criação reflete o caráter ordenado de Deus", "Podemos confiar que Deus mantém as coisas no lugar"],
  ["O que o 'firmamento' significa para a cosologia bíblica?", "Como Deus usa limites para proteger?", "Qual a relação com a providência divina?"],
  ["Sl 148:4-6", "Jó 38:8-11", "2 Pd 3:5-7"]
);

addVS(1, 7, "Separação das águas de baixo e de cima",
  "A separação continua — Deus organiza o caos em categorias. As águas de baixo formam os mares, as de cima ficam retidas para a chuva. Isso é sustentação: Deus provê chuva no tempo certo.",
  "O verbo 'dividiu' (badal) é o mesmo usado para separar Israel das nações e o sagrado do profano. A criação já carrega o tema da santificação.",
  "Deus não elimina as águas — ele as organiza. Assim, Deus não elimina nossos problemas, mas os coloca em perspectiva. As águas retidas são graça; as liberadas são juízo (Dilúvio).",
  ["Deus sustenta a vida com provisão controlada — a chuva é graça", "Ele não elimina o perigo, mas o controla", "Nosso sustento depende do controle soberano de Deus"],
  ["Como Deus usa as águas como juízo e graça na Bíblia?", "O que a chuva representa espiritualmente?", "Como a provisão de Deus é diária e confiável?"],
  ["Dt 11:11-14", "Sl 104:13-14", "Jl 2:23", "Mt 5:45", "Ap 11:6"]
);

addVS(1, 8, "Chamou Deus ao firmamento Céus",
  "Terceira nomeação divina. 'Shamayim' (céus) é plural — pode indicar os céus atmosféricos e os céus celestiais. A Bíblia posterior desenvolve o conceito de 'três céus' (2 Co 12:2).",
  "'E houve tarde e houve manhã, dia segundo' — Deus repete o ciclo, estabelecendo padrão. A repetição na Bíblia indica importância e confiabilidade.",
  "Os céus declaram a glória de Deus (Sl 19:1). A criação visível é testemunho contínuo do Criador invisível (Rm 1:20).",
  ["A criação é uma declaração constante da glória de Deus", "Mesmo quando não vemos, Deus está trabalhando (há tarde e manhã)", "A repetição de Deus indica Sua fidelidade"],
  ["Como os céus declaram a glória de Deus no dia a dia?", "O que significa que Deus repete Seu padrão?", "Como isso nos dá segurança?"],
  ["Sl 19:1-4", "Rm 1:20", "Hb 1:3", "2 Co 12:2"]
);

addVS(1, 9, "Reúnam-se as águas debaixo dos céus",
  "A terceira separação: a terra seca aparece. O verbo 'yiqqavu' (reúnam-se) é imperativo — Deus comanda e a obediência é instantânea. A criação é ato de autoridade, não negociação.",
  "A terra seca (yabashah) é o palco para a vida humana. Até aqui, tudo é preparação — Deus está criando o cenário para Sua obra-prima: o homem.",
  "Deus prepara o lugar antes de colocar o habitante. Assim, Ele nos prepara antes de nos chamar para servir. A terra seca é o estágio, a humanidade é o ator principal.",
  ["Deus prepara tudo antes de nos colocar no lugar certo", "A criação é um drama com ato único — tudo aponta para o ser humano", "Deus tem autoridade absoluta sobre a natureza"],
  ["Por que Deus separa a terra seca antes de criar a vida?", "Como Deus nos prepara antes de nos usar?", "O que a ordem da criação nos ensina sobre prioridades?"],
  ["Jr 1:5", "Ef 2:10", "2 Tm 1:9", "1 Pd 1:20"]
);

addVS(1, 10, "Chamou Deus à terra seca Terra, e às massas de águas chamou Mares",
  "Quarta nomeação. 'Yam' (mar) na cultura do Oriente Próximo é sinônimo de caos e força desordenada. Mas Deus nomeia — Ele tem autoridade sobre o caos.",
  "Deus 'viu que era bom' — a primeira vez que a expressão aparece no singular. Nos dias anteriores, a avaliação era implícita. Agora, há aprovação explícita da terra.",
  "Os mares existem, mas são nomeados e controlados por Deus. No Apocalipse, 'não haverá mais mar' (Ap 21:1) — o caos será vencido definitivamente.",
  ["Deus tem autoridade sobre o que parece caos na nossa vida", "O que parece ameaçador está sob controle divino", "O destino final é a ordem perfeita, sem caos"],
  ["Por que os mares representam caos na Bíblia?", "Como Deus controla o 'mar' na nossa vida?", "O que Ap 21:1 significa para o futuro?"],
  ["Jó 38:8-11", "Sl 89:9", "Mt 8:26-27", "Ap 21:1"]
);

addVS(1, 11, "Produza a terra erva verde",
  "Primeira vida na criação — vegetação. O verbo 'dashá' (brotar) indica vida que emerge espontaneamente pela palavra de Deus. Não há semente plantada — é criação direta.",
  "A ordem é significativa: primeiro o habitat (terra, luz, água), depois os vegetais, depois os animais, finalmente o homem. Deus é um Deus de preparação e ordem.",
  "A erva verde é o primeiro alimento para os animais que virão. Deus provê antes de criar quem precisa de provisão. Isso é graça: o sustento já está pronto antes da necessidade.",
  ["Deus provê antes da necessidade — Ele antecipa nossas fomes", "A vida brota pela palavra de Deus — assim é a fé", "Cuidar da natureza é cuidar da obra de Deus"],
  ["Por que a vegetação vem antes dos animais?", "Como Deus provê antes de criar a necessidade?", "Qual a relação entre a palavra de Deus e a vida?"],
  ["Sl 104:14-15", "Mt 6:25-34", "Jo 12:24", "1 Co 15:36-37"]
);

addVS(1, 12, "A terra produziu erva verde",
  "A criação responde imediatamente ao comando de Deus. Não há intervalo, resistência ou atraso. A palavra de Deus é eficaz — ela faz o que diz (Is 55:11).",
  "O versículo repete a descrição do verso 11, confirmando que o que Deus ordenou se cumpriu. A Bíblia valoriza a confirmação: a palavra de Deus não volta vazia.",
  "Assim como a terra obedeceu, nós somos chamados a obedecer à palavra de Deus. A criação é modelo de submissão — a terra não perguntou 'por que?', simplesmente brotou.",
  ["A palavra de Deus é eficaz — quando Ele fala, acontece", "Obedecer à palavra de Deus traz vida", "A criação obedece; nós, que temos livre-arbítrio, escolhemos obedecer"],
  ["O que a resposta imediata da terra nos ensina sobre obediência?", "Como a palavra de Deus é eficaz na nossa vida?", "Qual a relação entre fé e obediência?"],
  ["Is 55:11", "Rm 10:17", "Tg 1:22", "Hb 4:12"]
);

addVS(1, 14, "Haja luminares no firmamento dos céus",
  "Os 'luminaries' (me'orot) são o sol, a lua e as estrelas — mas Deus os chama de 'luminaries', não de deuses. No Egito e na Babilônia, sol e lua eram divindades. Aqui, são ferramentas criadas.",
  "A função dos luminares é tripla: separar dia/noite, servir de sinais (moedim — marcadores de tempo, como festas e Sabbath) e determinar estações. A criação tem calendário e ritmo.",
  "Deus usa a criação como 'sinais' — não para adivinhação (proibida em Dt 18:10-12), mas para marcar tempos sagrados. A criação é calendário da graça.",
  ["Deus estabelece tempos e estações — há um tempo para tudo (Ec 3:1)", "Os luminares são servos, não deuses — nada na criação deve ser adorado", "Deus dá sinais para nos guiar, não para manipular"],
  ["Por que Deus separa os luminares do dia 4 em vez do dia 1?", "Como os 'sinais' de Deus se cumprem no calendário bíblico?", "Qual a diferença entre observar sinais e adivinhação?"],
  ["Sl 104:19", "Ec 3:1-8", "Lc 1:70-79", "Rm 13:11-12"]
);

addVS(1, 16, "Fez Deus os dois luminares grandes",
  "A lua 'governa a noite' (memshalah — domínio, governo). No hebraico, a lua é feminina (yare'ach) mas o verbo é masculino — pode indicar submissão à autoridade divina.",
  "O sol governa o dia, a lua governa a noite. Isso pode ser lido como tipologia: Cristo (Sol) governa o dia da graça, a Igreja (lua) reflete Sua luz na escuridão.",
  "A criação dos luminares no dia 4, depois da vegetação (dia 3), mostra que Deus首先 cria o alimento, depois o meio de preservá-lo. A ordem divina é sempre pragmática.",
  ["Deus primeiro provê, depois sustenta — Ele não abandona o que criou", "A criação é um reflexo da ordem divina, não do acaso", "Nada na criação é acidental — tudo tem propósito"],
  ["Por que a lua é chamada de 'governante da noite'?", "Como Cristo e a Igreja se relacionam com sol e lua?", "Qual o propósito da ordem na criação?"],
  ["Sl 136:7-9", "Jó 31:26-28", "Jo 12:36", "Ap 12:1"]
);

addVS(1, 21, "Criou Deus os grandes monstros marinhos",
  "A palavra 'tanninim' (monstros marinhos) na cultura do Oriente Próximo representava o caos e o mal. Deus os cria — mas os controla. Não são deuses rivais, são criaturas submissas.",
  "Este é o primeiro verbo 'bara' (criar ex nihilo) desde o verso 1. A criação dos seres vivos é um segundo ato criativo — indica que a vida é especial aos olhos de Deus.",
  "Deus cria o que o mundo teme (monstros marinhos) e o controla. Assim, Ele cria我们的 medos e os coloca sob Sua autoridade. Nada escapa do Seu governo.",
  ["Deus cria e controla até mesmo o que nos causa medo", "A vida é sagrada — Deus a cria com cuidado especial", "Não devemos temer o que Deus já criou e controla"],
  ["O que os 'tanninim' representam na cosologia antiga?", "Por que este é o segundo uso de 'bara'?", "Como Deus controla o que nos assusta?"],
  ["Jó 41:1-11", "Sl 74:13-14", "Sl 104:25-26", "Is 27:1", "Ap 12:3-4"]
);

addVS(1, 26, "Façamos o homem à nossa imagem",
  "O plural 'façamos' (na'aseh) é o primeiro indicativo da trindade no Antigo Testamento. Os anjos não são criadores — o plural indica consulta dentro da própria divindade. 'Imago Dei' é o fundamento da dignidade humana.",
  "O homem (adam) vem de 'adamah' (terra). A humanidade é terra animada pelo sopro de Deus. A imagem não é física — é relacional, moral, intelectual e espiritual.",
  "A imagem de Deus é a razão pela qual todo ser humano tem dignidade inalienável. Não depende de raça, gênero, inteligência ou capacidade. Todo humano é portador de imagem divina.",
  ["Todo ser humano tem dignidade porque é imagem de Deus", "Somos criados para relacionamento com Deus e com os outros", "A responsabilidade humana vem da imagem de Deus"],
  ["O que significa ser 'imagem de Deus' na prática?", "Como a imagem de Deus se relaciona com a salvação?", "Por que a dignidade humana não pode ser tirada?"],
  ["Gn 9:6", "Sl 8:5-8", "1 Co 11:7", "2 Co 3:18", "Cl 3:10", "Tg 3:9"]
);

addVS(1, 27, "Criou Deus o homem à sua imagem",
  "A criação do homem é o clímax da criação — tudo antes era preparação. A repetição (imagem de Deus, macho e fêmea) indica importância. Deus não fez apenas 'um humano', fez a humanidade.",
  "Macho e fêmea são igualmente imagem de Deus. Não há hierarquia ontológica entre os sexos. A distinção é funcional e complementar, não de valor.",
  "A criação de Adão e Eva é o fundamento do casamento (Gn 2:24), da família e da sociedade. A imagem de Deus se reflete na comunidade, não apenas no indivíduo.",
  ["Homens e mulheres são igualmente imagem de Deus — sem superioridade", "A criação do casamento é divina, não humana", "Somos criados para comunhão, não isolamento"],
  ["Como macho e fêmea refletem igualmente a imagem de Deus?", "Qual a relação entre Gn 1:27 e o casamento?", "Como viver como imagem de Deus no dia a dia?"],
  ["Gn 2:18-24", "Mt 19:4-6", "Gl 3:28", "Ef 5:21-33", "1 Pd 3:7"]
);

addVS(1, 28, "Frutificai, multiplicai",
  "A bênção divina é anterior à queda. Deus primeiro abençoa, depois dá o mandamento. A procriação não é punição — é bênção. A terra é dada como dom, não como propriedade.",
  "Deus dá 'domínio' (radah) — não exploração, mas cuidado responsável. O mesmo verbo é usado para o rei que governa com justiça. O homem é rei-sacerdote na criação.",
  "A multiplicaçãoo e o domínio são a missão humana: preencher a terra e cuidar dela. Essa missão não é anulada pela queda — é redimida em Cristo (Mt 28:19-20).",
  ["A vida é bênção de Deus, não acidente", "Somos chamados a multiplicar — física e espiritualmente", "O domínio é responsabilidade, não tirania"],
  ["Como a bênção de Gn 1:28 se relaciona com a Grande Comissão?", "O que significa 'frutificar' espiritualmente?", "Como exercer domínio sem explorar?"],
  ["Sl 127:3", "Mt 28:19-20", "Ef 1:3", "1 Pd 2:9"]
);

addVS(1, 31, "Viu Deus tudo quanto fizera; e era muito bom",
  "A expressão 'tov me'od' (muito bom) só aparece no sexto dia — após a criação do homem. A criação é boa, mas com o homem ela é 'muito boa'. A humanidade é o coroamento.",
  "A avaliação divina é o padrão de verdade. O que Deus aprova é bom; o que Ele reprova é mau. Não existe bondade independente de Deus.",
  "O relato da criação termina com satisfação divina. Deus descansa não por cansaço, mas por conclusão — a obra está completa e perfeita.",
  ["Deus se satisfaz com Sua obra — e nós devemos descansar nEle", "A criação é boa — o pecado não anula a bondade original", "O descanso de Deus é modelo para o Sabbath"],
  ["Por que 'muito bom' só aparece com a criação do homem?", "Como o descanso de Deus se relaciona com o Sabbath?", "Como ver a bondade da criação apesar do pecado?"],
  ["Gn 2:2-3", "Ex 20:8-11", "Mc 2:27", "Hb 4:9-11", "Ap 21:5"]
);

// ═══════════════════════════════════════════════════════════════════════
// GÊNESIS 2 — A Formação do Homem e da Mulher
// ═══════════════════════════════════════════════════════════════════════
addVS(2, 7, "Formou o Senhor Deus o homem do pó da terra",
  "'Yatzar' (formar) é o verbo do oleiro — Deus é artesão, não apenas decreto. O homem é obra de arte divina, moldada com cuidado pessoal. 'Neshamah' (sopro de vida) é o que diferencia o homem do animal.",
  "Gn 1 descreve a criação em termos gerais; Gn 2 se aprofunda na criação do homem. Não há contradição — são perspectivas complementares (telescópica vs. cronológica).",
  "O homem é pó + sopro. Sem o sopro de Deus, somos apenas matéria. A vida é dom sobrenatural, não fenômeno biológico. Isso é a base da dignidade e da esperança.",
  ["Somos terra animada por Deus — humildade e dignidade juntas", "A vida é dom de Deus, não conquista humana", "O sopro de Deus nos distingue — somos espirituais"],
  ["Qual a diferença entre 'nephesh' (Gn 1:24) e 'neshamah' (Gn 2:7)?", "Como o conceito de 'pó' afeta nossa visão de mortalidade?", "O que o sopro de Deus significa para a salvação?"],
  ["Jó 33:4", "Sl 103:14", "Ec 12:7", "Is 42:5", "Zc 12:1", "1 Co 15:45"]
);

addVS(2, 8, "Plantou o Senhor Deus um jardim",
  "O 'jardim' (gan) é um sanctus — lugar da presença de Deus. Deus não cria de longe; Ele plantou, habitou e cuidou. A criação é íntima, não impessoal.",
  "O Éden (eden — prazer, delícia) está no oriente, com quatro rios. A geografia sugere localização real (mesopotâmica), não mitologia abstrata.",
  "O jardim é o primeiro templo — Deus caminha nele com o homem. A salvação é restauração do jardim (Ap 22:1-5). A história bíblica é jardim → queda → novo jardim.",
  ["Deus deseja habitar conosco — a criação é para comunhão", "O jardim é modelo de vida ideal: presença de Deus, provisão, trabalho", "A esperança cristã é restauração do jardim"],
  ["Por que Deus 'plantou' um jardim em vez de criar?", "Como o jardim se relaciona com o templo e com a nova criação?", "O que significa Deus 'caminhar' com o homem?"],
  ["Sl 16:11", "Ef 2:6", "Ap 2:7", "Ap 22:1-5"]
);

addVS(2, 9, "Árvore da vida e árvore do conhecimento",
  "Duas árvores centrais: a vida (chayim) e o conhecimento do bem e do mal. A escolha é real — Deus dá liberdade genuína. A vida eterna depende de um relacionamento, não de um ato mágico.",
  "A árvore da vida está no meio do jardim (Ap 22:2 a colocará no novo jardim). O acesso a ela é o que se perde na queda e se recupera na salvação.",
  "A árvore do conhecimento não é sobre informação — é sobre autoridade. Comer dela é decidir por si mesmo o que é bom e mau, independentemente de Deus.",
  ["A liberdade humana é real — Deus não força obediência", "O pecado é auto-definição do bem e do mal", "A vida eterna é restauração da árvore da vida"],
  ["Por que Deus coloca uma restrição no jardim?", "O que a árvore da vida representa?", "Como a queda se relaciona com a autonomia humana?"],
  ["Dt 30:15-20", "Js 24:15", "Rm 6:16", "Ap 22:2", "Ap 22:14"]
);

addVS(2, 18, "Não é bom que o homem esteja só",
  "Primeira coisa 'não boa' na criação. Até aqui tudo era 'bom' e 'muito bom'. A solidão é a primeira imperfeição — não moral, mas relacional. O homem é feito para comunhão.",
  "A 'ajuda' (ezer) não é servil — é a mesma palavra usada para Deus como ajuda de Israel (Sl 33:20). A mulher é aliada poderosa, não subordinada.",
  "Deus não faz a mulher imediatamente — primeiro faz o homem experimentar a solidão. A necessidade precede a provisão. Assim, Deus prepara o coração antes de dar a resposta.",
  ["A solidão não é fracasso — é condição que Deus resolve", "A mulher é 'ajuda poderosa' (ezer), não serva", "Deus prepara o coração antes de dar a resposta"],
  ["Por que Deus permite a solidão antes de dar companhia?", "O que 'ezer' significa em todo o Antigo Testamento?", "Como isso se aplica à vida comunitária?"],
  ["Sl 33:20", "Sl 124:8", "Sl 146:5", "2 Co 6:18", "Gl 4:4-7"]
);

addVS(2, 22, "Fez o Senhor Deus uma mulher",
  "Deus não faz a mulher da cabeça do homem (para dominá-lo), nem dos pés (para ser pisada), mas da costela — para ser companheira, perto do coração e do braço.",
  "A palavra 'ishshah' (mulher) vem de 'ish' (homem). A conexão é etimológica e relacional. O homem reconhece: 'esta é osso dos meus ossos'. A igualdade é reconhecida, não concedida.",
  "A criação da mulher é o último ato criativo antes do Sabbath. Deus coroa Sua obra com o relacionamento mais íntimo. O casamento é a primeira instituição divina.",
  ["Homem e mulher são iguais perante Deus — custódia da imagem divina", "O casamento é instituição divina, não cultural", "A complementaridade é bonita, não hierárquica"],
  ["Como Gn 2:22 se relaciona com a igualdade de gênero?", "Por que a mulher é criada por último?", "O que a reação de Adão (v.23) nos ensina?"],
  ["Gn 1:27", "Mt 19:4-6", "Ef 5:21-33", "Gl 3:28", "1 Pd 3:7"]
);

addVS(2, 24, "Por isso deixará o homem pai e mãe",
  "O casamento é deixar para se unir — não abandono, mas reorientação de prioridades. A nova aliança familiar tem precedência sobre a antiga.",
  "Deus fala no futuro ('deixará') — antes do pecado, antes do casamento real. O casamento é decreto divino anterior à queda. O plano de Deus precede a história humana.",
  "'São uma carne' (basar echad) — a unidade do casamento é mais que física. É emocional, espiritual e existencial. Por isso o pecado contra o casamento é sério.",
  ["O casamento é prioridade — Deus primeiro, depois cônjuge, depois filhos", "A unidade do casamento é sagrada e deve ser protegida", "Deus estabelece o casamento antes da queda — é bom por natureza"],
  ["O que 'deixar pai e mãe' significa na prática?", "Como a unidade 'são uma carne' se aplica no dia a dia?", "Por que o casamento é tão importante aos olhos de Deus?"],
  ["Mt 19:5-6", "Ef 5:31", "Mc 10:7-9", "1 Co 6:16-17", "Ef 5:25-32"]
);

// ═══════════════════════════════════════════════════════════════════════
// GÊNESIS 3 — A Queda
// ═══════════════════════════════════════════════════════════════════════
addVS(3, 1, "A serpente era mais astuta",
  "A serpente (nachash) pode ser instrumento de Satanás, não Satanás pessoalmente. A 'astúcia' (arum) é o oposto da 'simplicidade' (pethi) de Rc 14:15. O mal se disfarça de sabedoria.",
  "A serpente questiona a palavra de Deus: 'Deus realmente disse?' — esta é a primeira tentação: duvidar da revelação divina. Todo pecado começa com a distorção da palavra de Deus.",
  "A serpente não ataca diretamente — ela mina a confiança na palavra de Deus. Assim opera o inimigo hoje: 'Deus realmente disse que é pecado?'. A resposta é firmeza na Escritura.",
  ["O pecado começa com a duvida na palavra de Deus", "Deus realmente disse? — sempre voltemos à Escritura", "A astúcia do mal se disfarça de sabedoria moderna"],
  ["Como a serpente distorce a palavra de Deus hoje?", "Qual a diferença entre questionar e duvidar?", "Como nos proteger da astúcia do inimigo?"],
  ["2 Co 11:3", "Ef 6:11", "1 Pd 5:8", "Ap 12:9", "Ap 20:2"]
);

addVS(3, 2, "Da árvore do meio do jardim, Deus disse",
  "Eva corrige ligeiramente a ordem de Deus — 'não comereis NEM tocareis' (Deus só disse 'não comereis'). A adição mostra como a desobediência começa com a distorção sutil da verdade.",
  "A árvore 'do meio do jardim' — Eva especifica qual árvore, mostrando que sabia exatamente qual era a restrição. A tentação não vem da ignorância, mas da escolha consciente.",
  "A distorção da palavra de Deus pode ser inconsciente. Eva não mentiu intencionalmente, mas acrescentou algo. Assim, a desobediência cresce gradualmente — um pouco de distorção de cada vez.",
  ["Cuidado com a distorção sutil da verdade — ela cresce", "A tentação não vem da ignorância, mas da escolha", "Deus dá limites claros — devemos obedecer sem acrescentos"],
  ["Como Eva distorceu a palavra de Deus?", "Por que a distorção sutil é perigosa?", "Como manter a fidelidade à Escritura?"],
  ["Mt 4:1-11", "2 Co 11:3", "Tg 1:14-15", "2 Tm 3:16-17"]
);

addVS(3, 3, "Nem tocareis nela, para que não morrais",
  "Eva adiciona 'nem tocareis' — Deus não disse isso. A superstição (medo exagerado) pode ser tão perigosa quanto a desobediência. A verdade está no meio-termo entre legalismo e liberalismo.",
  "A advertência era 'no dia que comeres, certamente morrerás'. Eva omite 'certamente' e diz 'para que não morrais'. A urgência é suavizada — assim o pecado é minimizado.",
  "A morte espiritual (separação de Deus) é instantânea; a morte física é posterior. Deu falou a verdade — Adão e Eva morreram (espiritualmente naquele dia, fisicamente depois).",
  ["A palavra de Deus é exata — não devemos subtrair nem acrescentar", "Minimizar o pecado é o primeiro passo para a desobediência", "A morte espiritual é real mesmo quando a física não é imediata"],
  ["Por que Eva omite 'certamente'?", "Como minimizamos o pecado na prática?", "Qual a relação entre pecado e morte espiritual?"],
  ["Rm 6:23", "Ef 2:1-2", "Tg 1:15", "1 Tm 5:6", "Ap 20:14"]
);

addVS(3, 4, "Certamente não morrereis",
  "A serpente contradiz diretamente Deus. Esta é a primeira mentira documentada na Bíblia. A estratégia do diabo é negar as consequências do pecado.",
  "A serpente mente sobre duas coisas: (1) a morte não acontecerá, e (2) Deus tem motivos ocultos. A desobediência é apresentada como segura e benéfica.",
  "Satanás ainda diz a mesma mentira hoje: 'não vai acontecer nada', 'todo mundo faz', 'Deus é bom demais para punir'. A Escritura é clara: as consequências do pecado são reais.",
  ["A mentira do diabo é sempre a mesma: 'não vai acontecer nada'", "As consequências do pecado são reais, mesmo quando parecem distantes", "A verdade de Deus é confiável, mesmo quando a mentira é sedutora"],
  ["Como a mentira de Satanás se repete hoje?", "Por que acreditar que 'não vai acontecer nada' é perigoso?", "Como discernir entre a verdade de Deus e a mentira do inimigo?"],
  ["Jo 8:44", "2 Co 11:14", "Ef 6:11-12", "1 Pd 5:8", "Ap 12:9-10"]
);

addVS(3, 5, "Sereis como Deus, conhecendo o bem e o mal",
  "A tentação final: ser como Deus. Não é proibido querer ser santo (sê santos como eu sou santo — Lv 19:2), mas ser Deus é usurpar o lugar do Criador. A ambição desordenada é raiz do pecado.",
  "O 'conhecimento do bem e do mal' não é informação — é experiência. O pecado dá 'experiência' do mal, mas a um custo devastador. A sabedoria de Deus é gratuita; a sabedoria do mundo é cara.",
  "O pecado promete igualdade com Deus, mas traz escravidão. Adão e Eva não se tornaram deuses — tornaram-se mortos. A mentira do pecado é sempre maior que sua entrega.",
  ["O pecado promete mais do que entrega", "A ambição de ser Deus é a raiz de todo pecado", "A experiência do mal é uma lição que custa demais"],
  ["O que significa 'conhecer o bem e o mal' na prática?", "Como a ambição desordenada opera na nossa vida?", "Deus nos proíbe de algo bom ou nos protege de algo ruim?"],
  ["Is 14:12-15", "Ef 2:1-3", "Tg 1:14-15", "1 Jo 2:16"]
);

addVS(3, 6, "Viu a mulher que a árvore era boa",
  "Três desejos: 'bom para comer' (apetite), 'desejável aos olhos' (estética), 'desejável para ganhar sabedoria' (ambição). Estes são os 'desejos da carne, os desejos dos olhos, e a ostentação da vida' (1 Jo 2:16).",
  "Eva come e dá ao marido — o que estava com ela. A responsabilidade é compartilhada, mas Adão (que estava presente — v.6 implícito) não se opôs. O silêncio diante do pecado é cúmplice.",
  "O pecado é sempre racionalizado como 'bom'. Ninguém peca achando que é ruim — o pecado se disfarça de benefício. A queda é um ato de fé no engano, não em Deus.",
  ["O pecado se disfarça de benefício — cuidado com a racionalização", "A tentação atinge três áreas: corpo, olhos e orgulho", "O silêncio diante do pecado é cúmplice"],
  ["Como os três desejos de 1 Jo 2:16 se conectam com Gn 3:6?", "Por que Adão não impediu Eva?", "Como o pecado se disfarça de 'bom' na nossa vida?"],
  ["1 Jo 2:16", "Mt 4:1-11", "Tg 1:14-15", "2 Co 11:3"]
);

addVS(3, 7, "Abriram-se os olhos de ambos",
  "Os 'olhos se abriram' — mas não para sabedoria, para vergonha. O pecado promete conhecimento, mas traz vergonha. A consciência do mal não é sabedoria é dor.",
  "As figueiras — costuram-se para cobrir. A vergonha gera escondimento, mas Deus já sabia. O pecado nos faz esconder daquele que tudo vê e tudo sabe.",
  "A vergonha é a primeira consequência do pecado. Não é apenas sensação — é condição existencial. O homem se sente nu, exposto, vulnerável. Assim é a alma sem Deus.",
  ["O pecado traz vergonha, não sabedoria", "Esconder-se de Deus é inútil — Ele vê tudo", "A vergonha é real, mas Deus tem remédio para ela"],
  ["Como o pecado nos faz 'esconder' de Deus hoje?", "A vergonha é de Deus ou do pecado?", "Como Cristo resolve a vergonha?"],
  ["Is 59:2", "Rm 3:23", "Hb 4:13", "1 Jo 1:8-9"]
);

addVS(3, 8, "Ouve a voz do Senhor Deus caminhando no jardim",
  "Deus caminha ('mithhallekh') — linguagem antropomórfica que indica intimidade. Deus não está distante — Ele procura os que se esconderam. A graça precede o juízo.",
  "Adão e Eva se escondem, mas Deus os chama: 'Onde estás?' — Deus sabe onde eles estão. A pergunta é para eles, não para Ele. É convite ao arrependimento.",
  "O chamado de Deus 'Onde estás?' é o primeiro evangelho: Deus busca o pecador. Não é o homem que busca a Deus — é Deus que busca o homem (Lc 19:10).",
  ["Deus busca o pecador — nós não O buscamos primeiro", "A pergunta 'Onde estás?' é convite ao arrependimento", "Esconder-se de Deus é inútil — Ele já sabe"],
  ["Por que Deus pergunta 'Onde estás?' se Ele sabe?", "Como Deus 'caminha' conosco hoje?", "O que a busca divina nos ensina sobre evangelismo?"],
  ["Lc 15:1-32", "Lc 19:10", "Ef 2:4-5", "1 Pd 2:25", "Rm 5:8"]
);

addVS(3, 9, "Onde estás?",
  "A pergunta mais importante da Bíblia. Deus não busca informação — Ele busca relacionamento. 'Onde estás?' é sobre estado espiritual, não localização física.",
  "Adão responde: 'Ouvi tua voz no jardim e tive medo, porque estou nu'. A resposta revela: (1) reconhecimento da voz de Deus, (2) medo, (3) vergonha. O pecado produz essas três coisas.",
  "Deus ainda pergunta: 'Onde estás?' É a pergunta de todo pregador, de toda Escritura, de todo convite. Onde você está com Deus?",
  ["Deus pergunta 'Onde estás?' — é convite, não acusação", "O pecado produz medo, vergonha e escondimento", "A resposta honesta é o primeiro passo da restauração"],
  ["Deus ainda pergunta 'Onde estás?' hoje?", "Como responder honestamente a Deus?", "O que medo e vergonha produzem na vida espiritual?"],
  ["Sl 139:1-12", "Lc 15:11-32", "Hb 4:12-13", "Ap 3:1-3"]
);

addVS(3, 15, "Porei inimizade entre ti e a mulher",
  "O Proto-evangelium — a primeira promessa do Salvador. A 'semente da mulher' (zera ha-ishshah) é singular: é Cristo, nascido de mulher (Gl 4:4). A serpente será ferida na cabeça (vitoriedade decisiva), Cristo no calcanhar (sofrimento temporário).",
  "A 'inimizade' (eyvah) é permanente — não há reconciliação entre a serpente e a mulher. O conflito espiritual é real e contínuo até o fim (Ef 6:12).",
  "Todo o Antigo Testamento é espera desta semente. As promessas a Abraão ('em ti serão benditas todas as nações'), a Davi ('teu descendente reinará eternamente') se cumprem em Cristo.",
  ["Deus já tem um plano de redenção antes da punição", "A semente da mulher é Cristo — toda a Bíblia aponta para Ele", "O conflito espiritual é real, mas a vitória já está garantida"],
  ["Como Gn 3:15 se conecta com toda a história da salvação?", "O que a 'semente da mulher' significa profeticamente?", "Como a vitória de Cristo afeta nossa vida hoje?"],
  ["Gl 4:4", "Rm 16:20", "Ap 12:17", "Ap 20:10", "1 Jo 3:8"]
);

addVS(3, 16, "Multiplicarei os teus sofrimentos",
  "A punição da mulher: (1) sofrimento na concepção, (2) parto com dor, (3) desejos voltados para o marido. Não é punição arbitrária — é consequência natural da queda.",
  "A 'dor' (etzev) é mais que física — é emocional. O relacionamento que era harmonia agora terá tensão. Mas Deus não abandona — a salvação vem pela mulher (Gl 4:4).",
  "Mesmo na punição, há promessa: a salvação vem pela semente da mulher. A mulher, que foi instrumento da queda, será instrumento da redenção (Is 7:14, Lc 1:26-38).",
  ["As consequências do pecado afetam relacionamentos", "Deus não abandona mesmo quando puni", "A mulher é tanto instrumento de queda quanto de redenção"],
  ["Como as consequências da queda afetam os relacionamentos hoje?", "Deus puni por amor ou por vingança?", "Como a salvação vem pela mulher na história bíblica?"],
  ["Is 7:14", "Lc 1:26-38", "Gl 4:4", "1 Tm 2:14-15"]
);

addVS(3, 17, "Maldita é a terra por tua causa",
  "A terra é amaldiçoada — mas não destruída. Deus preserva a criação mesmo caída. A maldição é sobre o trabalho (dor e suor), não sobre o trabalho em si.",
  "O trabalho não é punição — é vocação (Gn 2:15). A maldição torna o trabalho árduo, não inútil. O fruto do trabalho ainda existe, mas exige esforço.",
  "A terra produce 'espinhos e cardos' — a criação foi submetida à futilidade (Rm 8:20). Mas isso é temporário — a criação será libertada (Rm 8:21).",
  ["O trabalho é vocação, não punição — a maldição é o sofrimento, não o trabalho", "A criação foi submetida à futilidade, mas será libertada", "Deus preserva a criação mesmo caída"],
  ["Como a maldição afeta o trabalho hoje?", "O que Rm 8:20-21 nos diz sobre o futuro da criação?", "Como trabalhar com propósito mesmo sob a maldição?"],
  ["Rm 8:19-22", "Rm 8:28", "Ef 2:10", "Cl 3:23-24"]
);

addVS(3, 21, "Fez o Senhor Deus túnicas de peles",
  "Deus mata animais para cobrir a vergonha — primeiro sacrifício da Bíblia. O sangue é derramado antes do homem ser vestido. Assim, a salvação é por substituição, não por mérito.",
  "As peles (not) indicam morte de um inocente para cobrir o culpado. Isso é o evangelho: Cristo (o Cordeiro de Deus) morre para cobrir nossos pecados.",
  "Deus veste o homem — não é o homem que se veste. A salvação é dom, não conquista. Adão e Eva não fizeram as túnicas — Deus as fez.",
  ["A salvação é por substituição — alguém inocente morre pelo culpado", "Deus veste o homem — a salvação é dom", "O primeiro sacrifício aponta para Cristo"],
  ["Por que Deus mata animais para vestir o homem?", "Como as túnicas de peles se conectam com o sacrifício de Cristo?", "O que significa ser 'vestido' por Deus?"],
  ["Is 61:10", "Rm 3:21-26", "Rm 13:14", "Gl 3:27", "Ap 3:5", "Ap 19:8"]
);

// ═══════════════════════════════════════════════════════════════════════
// GÊNESIS 4 — Caim e Abel
// ═══════════════════════════════════════════════════════════════════════
addVS(4, 4, "Abel também trouxe dos primogênitos",
  "Abel trouxe dos 'primeiros e das gorduras' (reshit u-mechle'ot) — o melhor. Cain trouxe 'do fruto da terra' — qualquer coisa. A atitude do coração é mais importante que o presente.",
  "Deus 'olhou para Abel e para a sua oferta' (shaa'ah) — olhar favorável. Não é sobre a qualidade do presente, mas sobre a fé e a devoção de quem dá (Hb 11:4).",
  "A aceitação de Deus é por fé, não por obras. Abel trouxe com fé (Hb 11:4); Cain com obrigação. A questão não é O que dá, mas COMO dá.",
  ["Deus olha para o coração, não para o presente", "Dar com fé e devoção é mais importante que o valor", "A generosidade começa no coração"],
  ["Por que Deus aceitou Abel e rejeitou Cain?", "O que a fé tem a ver com a oferta?", "Como dar com o coração certo?"],
  ["Hb 11:4", "1 Jo 3:12", "Mt 23:23", "2 Co 9:6-7"]
);

addVS(4, 7, "Se bem fizeres, não haverá aceitação?",
  "Deus fala diretamente com Cain antes do pecado — mostra paciência divina. O pecado está 'deitado à porta' (rovetz — como animal feroz), mas Cain pode dominá-lo.",
  "A metáfora do pecado como animal que quer dominar é poderosa. O pecado não é força irresistível — há domínio possível pela graça de Deus.",
  "Deus adverte Cain ANTES do pecado. Não é surpresa, não é armadilha — é advertência amorosa. Assim Deus age connosco: nos avisa antes que o pecado nos domine.",
  ["Deus nos avisa antes que o pecado nos domine", "O pecado é como animal — pode ser dominado pela graça", "A escolha é nossa: bem ou mal, vida ou morte"],
  ["Como Deus nos avisa antes do pecado?", "O que significa 'o pecado está deitado à porta'?", "Como dominar o pecado pela graça?"],
  ["Dt 30:15-20", "Tg 1:14-15", "1 Co 10:13", "Ef 6:10-18"]
);

// ═══════════════════════════════════════════════════════════════════════
// GÊNESIS 6-9 — O Dilúvio
// ═══════════════════════════════════════════════════════════════════════
addVS(6, 5, "A maldade do homem se multiplicara sobre a terra",
  "Diagnóstico radical da condição humana: 'todo desígnio dos pensamentos do coração era somente mau, continuamente'. Não há exceção — a corrupção é total.",
  "Deus 'se arrependeu' (nacham) — não mudança de plano, mas dor emocional. Deus sofre com o pecado humano. O juízo não é frieza, é dor de pai.",
  "Mesmo na corrupção total, há uma exceção: 'Noé achou graça'. A graça de Deus precede a salvação. Noé não era perfeito — era justo E andava com Deus.",
  ["A condição humana é desesperadora sem a graça de Deus", "Deus sofre com o pecado — O juízo é amor ferido", "A graça de Deus encontra um remanescente"],
  ["O que significa Deus 'se arrepender'?", "Como a corrupção humana se compara com a nossa época?", "O que a exceção de Noé nos ensina sobre graça?"],
  ["Gn 8:21", "Rm 3:10-18", "Rm 3:23", "Ef 2:1-3", "Hb 11:7"]
);

addVS(6, 8, "Noé achou graça aos olhos do Senhor",
  "A primeira menção de 'graça' (chen) na Bíblia. A graça é favor imerecido — Noé não merecia, mas encontrou. Assim, todos nós dependemos da graça de Deus.",
  "'Achou graça' — a graça está disponível, mas precisa ser encontrada. Noé não comprou a graça; ele a recebeu pela fé e pela obediência.",
  "A salvação de Noé é tipo da salvação em Cristo: (1) graça imerecida, (2) arca de salvação, (3) julgamento do mundo, (4) aliança nova. Noé é prefiguração de Cristo.",
  ["A graça é o fundamento da salvação — não méritos", "Deus salva um remanescente pela graça", "A graça está disponível para quem a busca"],
  ["O que a graça de Noé nos ensina sobre a salvação?", "Como a arca é tipo de Cristo?", "Deus salva por mérito ou por graça?"],
  ["Ef 2:8-9", "Tt 2:11-12", "1 Pd 3:20-21", "Hb 11:7"]
);

// ═══════════════════════════════════════════════════════════════════════
// GÊNESIS 12 — O Chamado de Abraão
// ═══════════════════════════════════════════════════════════════════════
addVS(12, 1, "Vai-te da tua terra e da tua parentela",
  "O chamado de Abraão é o marco divisório da história da salvação. Deus escolhe um homem de uma cidade pagã (Ur) para criar um povo que conheça o verdadeiro Deus.",
  "'Vai-te' (lekh-lekha) — literalmente 'vai para ti mesmo'. O chamado de Deus nos leva para fora de nós mesmos para encontrarmos nossa verdadeira identidade em Cristo.",
  "Deus pede tres coisas: (1) deixar a terra (segurança), (2) a parentela (comunidade), (3) a casa do pai (identidade). A fé exige renúncia.",
  ["Deus nos chama para fora da nossa zona de conforto", "A fé exige renúncia — não há十字架 sem negação", "O chamado de Deus é pessoal: 'vai para ti'"],
  ["Por que Deus pede para Abraão deixar tudo?", "O que 'lekh-lekha' significa para nós hoje?", "Como a renúncia se relaciona com a fé?"],
  ["Mt 16:24-26", "Lc 9:57-62", "Hb 11:8-12", "Fl 3:7-14"]
);

addVS(12, 2-3, "Farei de ti uma grande nação",
  "Três promessas: (1) descendência, (2) terra, (3) bênção para todas as nações. Estas são as bases da teologia do Antigo Testamento e se cumprem em Cristo.",
  "'Em ti serão benditas todas as famílias da terra' — a bênção de Abraão é universal, não exclusivista. Deus escolhe um povo para abençoar todos os povos.",
  "A promessa é dada antes de Abraão ter filhos — é promessa de fé. Assim, a salvação é sempre pela fé, nunca pela situação circunstancial.",
  ["Deus dá promessas impossíveis — e as cumpre", "A bênção de Abraão é para todas as nações — missão é central", "A fé precede o cumprimento da promessa"],
  ["Como as promessas a Abraão se cumprem em Cristo?", "A bênção é exclusiva ou universal?", "Como viver como bênção para os outros?"],
  ["Gl 3:8-9", "Gl 3:14", "Rm 4:16-25", "At 3:25-26"]
);

addVS(12, 7, "Ao teu descendente darei esta terra",
  "A promessa da terra é dada pela primeira vez. A terra de Canaã é símbolo do descanso de Deus — aponta para a terra prometida celestial (Hb 3:7-4:11).",
  "Abraão erige um altar — o primeiro ato de adoração na terra prometida. O altar é lugar de encontro com Deus, de sacrifício e de memorial.",
  "A terra é dada ao descendente (singular, não plural — 'zera'). No contexto de Gl 3:16, o descendente é Cristo. A terra prometida é o mundo inteiro sob o reinado de Cristo.",
  ["Deus cumpre Suas promessas — mas no Seu tempo", "A adoração é resposta natural à promessa de Deus", "A terra prometida aponta para o céu"],
  ["A terra prometida é literal ou simbólica?", "Como Abraão esperou a promessa?", "O que o altar de Abraão nos ensina sobre adoração?"],
  ["Gl 3:16", "Hb 11:8-16", "Hb 3:7-4:11", "Ap 21:1-3"]
);

// ═══════════════════════════════════════════════════════════════════════
// GÊNESIS 15 — A Aliança de Deus com Abraão
// ═══════════════════════════════════════════════════════════════════════
addVS(15, 6, "Creu Abraão no Senhor, e isso lhe foi imputado como justiça",
  "Versículo fundamental da justificação pela fé, citado por Paulo em Rm 4:3 e Gl 3:6. A justiça não vem pelas obras, mas pela fé na promessa de Deus.",
  "'Imputado' (chashab) — contado, creditado. A justiça é crédito, não conquista. Deus coloca a justiça de Cristo na conta do crente.",
  "Abraão creu em algo impossível: que teria filhos aos 100 anos. A fé é confiança no impossível de Deus. Assim, a salvação é para os impossíveis.",
  ["A justificação é pela fé, não pelas obras", "A fé é confiança no impossível de Deus", "Deus 'credita' justiça — não é mérito, é dom"],
  ["O que 'imputado como justiça' significa na prática?", "Abraão creu em quê exatamente?", "Como a justificação pela fé se relaciona com a vida cristã?"],
  ["Rm 4:1-25", "Gl 3:6-14", "Ef 2:8-9", "Fp 3:9"]
);

// ═══════════════════════════════════════════════════════════════════════
// GÊNESIS 22 — O Sacrifício de Isaac
// ═══════════════════════════════════════════════════════════════════════
addVS(22, 1, "Deus provou a Abraão",
  "A prova (nissah) não é tentação para o mal, mas teste de fé. Deus não tenta (Tg 1:13), mas prova para fortalecer e revelar.",
  "Deus pede o sacrifício do filho da promessa — o impossível. Se Deus pede o impossível, Ele tem um plano para o impossível.",
  "Isaac é tipo de Cristo: filho único, amado, carregando a lenha (crucifixo), no Monte Moriá (onde ficará Jerusalém e o calvário). O cordeiro substituto (v.13) aponta para Cristo.",
  ["Deus prova a fé para fortalecê-la, não para destruí-la", "A obediência de Abraão é modelo de fé total", "O cordeiro substituto é Cristo — nós merecemos a morte, Ele morreu por nós"],
  ["Por que Deus pede algo tão difícil a Abraão?", "Como Isaac é tipo de Cristo?", "O que o cordeiro substituto nos ensina sobre salvação?"],
  ["Tg 1:2-4", "Hb 11:17-19", "Jo 3:16", "Rm 8:32"]
);

// ═══════════════════════════════════════════════════════════════════════
// GÊNESIS 37-50 — A História de José
// ═══════════════════════════════════════════════════════════════════════
addVS(37, 2, "José tinha 17 anos e pastoreava",
  "José é o penúltimo dos doze filhos, mas escolhido por Deus. A primogenitura não é direito automático — Deus escolhe quem quer.",
  "A 'túnica de cores' (ketonet passim) é sinal de favoritismo de Jacó. O favoritismo gera inveja e conflito — lição para pais e para a igreja.",
  "José sofre injustiça desde cedo — vendido pelos irmãos, acusado falsamente, esquecido na prisão. Mas Deus usa a injustiça para o Seu propósito.",
  ["O favoritismo gera destruição — Deus não favorece", "A injustiça humana não impede o plano de Deus", "Deus usa as circunstâncias mais difíceis para nos preparar"],
  ["Como o favoritismo de Jacó afetou a família?", "Deus permite a injustiça ou a usa?", "Como José respondeu à injustiça?"],
  ["Rm 8:28", "Rm 9:10-24", "Gn 50:20"]
);

addVS(50, 20, "Vós pensastes o mal contra mim, mas Deus o tornou em bem",
  "Versículo que resume toda a teologia de Gênesis: o mal humano não supera o propósito soberano de Deus. José interpreta toda a sua história como obra da providência divina.",
  "José não revanchismo — ele perdoa e provê. O perdão é a resposta madura à injustiça. José vê a mão de Deus onde outros veriam apenas azar.",
  "O mal é real, mas não é o fim da história. Deus transforma o mal em bem — não porque o mal é bom, mas porque Deus é maior que o mal.",
  ["Deus transforma o mal em bem — isso não justifica o mal", "O perdão é a resposta cristã à injustiça", "A história humana está nas mãos de Deus"],
  ["Como Deus transforma o mal em bem na nossa vida?", "O que o perdão de José nos ensina?", "A soberania de Deus anula a responsabilidade humana?"],
  ["Rm 8:28", "Rm 9:14-24", "Jó 42:1-6", "Lc 23:34"]
);

// Export default para compatibilidade com dynamic import
export default registro;
