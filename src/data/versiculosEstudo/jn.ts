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
  'Escrito por Joao entre 90-100 d.C., provavelmente em Efeso, para igrejas de fala grega que enfrentavam o gnosticismo. O prologo evoca Gn 1:1 para apresentar Jesus como o Logos divino, preexistente e co-eterno com Deus, respondendo a falsos ensinos sobre a criacao de Cristo.',
  'Prologo poetico em forma de himno (1:1-18), que introduz os temas centrais de todo o Evangelho: a divindade de Cristo, a incarnacao, a luz versus trevas, e o testemunho de Joao Batista.',
  'Jo 1:1 estabelece a doutrina central da Trindade e da divindade de Cristo. O Verbo (Logos) e coeterno com Deus — nao foi criado, mas existia desde a eternidade. Isso refuta o arianismo e qualquer ensino que reduza Cristo a mera criatura.',
  ['Reconhecer que Jesus nao comecou a existir no nascimento, mas e eterno como Deus', 'Permitir que a verdade da divindade de Cristo transforme a forma como adoramos e obeyecemos'],
  ['Como o conceito de Logos conecta o pensamento grego com a revelacao hebraica?', 'Por que e essencial afirmar que o Verbo era Deus e nao apenas deus?'],
  ['Gn 1:1', 'Cl 1:15-17', 'Hb 1:2-3', '1 Jo 1:1', 'Ap 19:13']);

addVS(1, 2,
  'O Verbo era com Deus — distincao de pessoas na unidade divina',
  'O texto grego \'en pros ton theon\' indica relacao pessoal face a face, nao mera proximidade. Os primeiros cristaos usaram este versiculo para desenvolver a teologia trinitaria.',
  'O prologo continua a desenvolver a identidade do Verbo. O verso anterior afirma que era Deus; este afirma que estava com Deus. A tensao entre unidade e distincao e o cerne da controversa trinitaria.',
  'Este versiculo sustenta a doutrina da Trindade: ha distincao real entre o Pai e o Filho, mas ambos sao igualmente Deus.',
  ['Refletir sobre o mistério da unidade e distincao na Trindade', 'Apreciar que Jesus tem relacionamento pessoal eterno com o Pai'],
  ['Como podemos compreender a distincao entre \'era Deus\' e \'era com Deus\'?', 'Que implicas isso para a oracao e adoracao de Jesus?'],
  ['Mt 28:19', '2 Co 13:14', '1 Pe 1:2']);

addVS(1, 3,
  'Todas as coisas foram feitas por Ele — Criador soberano',
  'No contexto do seculo I, o gnosticismo ensinava que o mundo material era mau e criado por um deus inferior. Joao afirma categoricamente que o Verbo criou todas as coisas, incluindo o mundo material.',
  'O prologo expande o escopo: de relacao com Deus (vv. 1-2) para relacao com a criacao (v. 3).',
  'Cristo e o Criador de todas as coisas — nada existe fora Dele. Isso inclui o universo, a humanidade, a historia e cada detalhe da vida.',
  ['Reconhecer que tudo na minha vida vem de Cristo como Criador', 'Cultivar gratidao diaria pelo dom da criacao e da vida'],
  ['Como a verdade de que Cristo e o Criador afeta a minha visao do mundo material?', 'Se tudo foi criado por Cristo, que responsabilidade tenho com o que Ele criou?'],
  ['Cl 1:16', 'Hb 1:2', 'Ef 3:9', 'Ap 4:11']);

addVS(1, 4,
  'Nele estava a vida — fonte de toda existencia',
  'O conceito de vida (zoe) em Joao nao se refere apenas a existencia biologica, mas a vida eterna, espiritual e abundante. O gnosticismo separava a vida espiritual da material.',
  'O prologo introduz o segundo grande tema joanino: vida em Cristo. A vida nao e algo que Cristo simplesmente dá — ela esta \'nele\', faz parte de Sua essencia.',
  'Jesus Cristo e a fonte unica de vida verdadeira — tanto a vida natural quanto a vida eterna derivam Dele. Sem Ele, nao ha vida em nenhum sentido pleno.',
  ['Buscar em Cristo a fonte da minha vida espiritual', 'Reconhecer que cada respiracao e um dom do Criador'],
  ['Que tipos de \'vida\' este versiculo pode estar referenciando?', 'Como Cristo e a fonte da vida eterna para quem Nele cre?'],
  ['1 Jo 5:11-12', 'Jo 14:6', 'Jo 11:25', 'Jo 10:10']);

addVS(1, 5,
  'A luz reluziu nas trevas — vitoria sobre o mal',
  'A imagem luz versus trevas e um dos temas mais proeminentes de Joao. Nas trevas espirituais do paganismo romano e do gnosticismo, a luz de Cristo brilha com poder invencivel.',
  'O prologo culmina com o conflito cosmico entre luz e trevas. A luz vence — as trevas nao a comprehendem, mas tambem nao a derrotam.',
  'A luz de Cristo e irresistivel e invencivel. As trevas (pecado, morte, Satan) nao podem vence-la. Isso da esperanca certa de que o bem prevalecera sobre o mal.',
  ['Viver como filho da luz, rejeitando as obras das trevas', 'Ter confianca de que Cristo venceu o pecado e a morte'],
  ['Quais sao as \'trevas\' que nao compreendem a luz?', 'Como a luz de Cristo transformou minha vida pessoalmente?'],
  ['Jo 8:12', 'Jo 12:46', '1 Jo 1:5-7', 'Ef 5:8-11']);

addVS(1, 6,
  'Um homem enviado da parte de Deus — missao de Joao Batista',
  'A frase \'homem enviado\' (anthropos apostallos) indica missao divina formal. Joao Batista e o unico personagem do NT chamado de \'apostolos\' antes da era cristã.',
  'Transicao do prologo cosmico para a historia concreta. O Batista e introduzido como ponte entre o AT e o NT.',
  'Joao Batista cumpre o papel profetico de Isaias 40:3, preparando o caminho para o Senhor. Sua humildade e modelo de servico cristao.',
  ['Praticar a humildade de servir sem buscar protagonismo', 'Compreender que Deus usa pessoas comuns para cumprir Seus propositos'],
  ['Por que Joao insiste em dizer que o Batista nao e a luz?', 'Que papel tenho eu como \'enviado\' de Deus no mundo de hoje?'],
  ['Mt 3:1-3', 'Lc 1:15-17', 'Is 40:3']);

addVS(1, 7,
  'Para testemunhar da Luz — o testemunho como missao',
  'O testemunho (martyria) e uma palavra-chave em Joao, aparecendo 47 vezes no Evangelho. O conceito judicial de testemunho era fundamental no judaismo.',
  'O papel do Batista e definido: testemunhar. Isso conecta o prologo com a narrativa que se segue.',
  'Todos os crentes sao chamados a testemunhar de Cristo. O testemunho nao e opiniao pessoal, mas relato factual do que Deus fez.',
  ['Desenvolver um testemunho pessoal claro do que Cristo fez na minha vida', 'Ser corajoso em compartilhar a fé'],
  ['Que significa testemunhar da Luz no contexto cultural de hoje?', 'Como posso melhorar minha habilidade de compartilhar o evangelho?'],
  ['At 1:8', 'At 4:20', '1 Jo 1:2-3', '1 Pe 3:15']);

addVS(1, 8,
  'Ele nao era a luz — testemunho de humildade radical',
  'Joao repetidamente declara que nao e o Messias, algo incomum para um profeta que atraia milhares de seguidores. Isso reflete sua integridade espiritual.',
  'A repeticao do testemunho negativo do Batista enfatiza a distincao entre o Testemunho e o Testemunhado.',
  'A verdadeira espiritualidade se define pelo que aponta, nao pelo que atrai. Joao Batista desviu todos os seus seguidores para Cristo.',
  ['Examinar se minha vida aponta para Cristo ou para mim mesmo', 'Desenvolver humildade genuina que aponte para Cristo'],
  ['Como posso discernir quando estou buscando reconhecimento pessoal?', 'O que a geração atual pode aprender com a humildade de Joao Batista?'],
  ['Mt 3:11', 'Jo 3:28-30', '2 Co 4:5']);

addVS(1, 9,
  'A luz verdadeira, que alumia a todo homem — universalidade da graça',
  'A frase \'todo homem\' indica que a luz de Cristo se estende a toda humanidade, nao apenas a Israel. Isso antecipa o universalismo joanino que culmina em Jo 3:16.',
  'O prologo expande o escopo da luz: de cósmica (v. 5) para universal (v. 9).',
  'A graça de Cristo e disponivel a toda pessoa, sem excecao de etnia, classe ou religiao. Isso fundamente a missao universal da igreja.',
  ['Reconhecer que toda pessoa ao meu redor e alvo da luz de Cristo', 'Desenvolver um coracao missions que busca alcancar quem vive nas trevas'],
  ['Como a universalidade da luz desafia o exclusivismo religioso?', 'Que implicacoes isso tem para o trabalho missionario?'],
  ['Jo 3:16', 'Rm 2:14-15', 'At 17:26-27']);

addVS(1, 10,
  'Ele estava no mundo — a incarnacao misteriosa',
  'O verbo \'estava\' (en) indica permanencia. O Verbo criador nao visitou o mundo occasionalmente — Ele esteve presente nele continuamente.',
  'O versiculo desenvolve o paradoxo da incarnacao: o Criador estava no mundo que criou, mas o mundo nao o reconheceu.',
  'O mundo criado por Cristo falhou em reconhecê-Lo. A cegueira espiritual nao se deve a falta de evidencias, mas a coracao endurecido.',
  ['Examinar se reconheço a presenca de Cristo nas situacoes do dia a dia', 'Buscar formas de ajudar outros a enxergarem a Cristo no mundo'],
  ['Por que o mundo que Cristo criou falhou em reconhecê-Lo?', 'Que barreiras impedem as pessoas de reconhecerem a Cristo hoje?'],
  ['Jo 14:17', 'Jo 14:9', 'Rm 1:19-21']);

addVS(1, 11,
  'Veio para os seus, e os seus nao o receberam — rejeicao de Israel',
  'A expressao \'os seus\' se refere ao povo de Israel, que recebeu as aliancas, a Lei, os profetas e as promessas messiânicas.',
  'O paralelo com Gn 3 comecando: a criacao rejeita o Criador (v. 10), e agora o povo eleito rejeita o Eleito.',
  'A rejeicao de Israel e uma lição sobre os perigos da religiosidade sem relacionamento. Ter a Lei e as promessas nao garante aceitacao do Messias.',
  ['Examinar se sou religioso sem ser verdadeiramente receptivo a Cristo', 'Buscar a authenticity na fé, evitando a armadilha da religiosidade formal'],
  ['Como a rejeicao de Israel nos ensina sobre os perigos da religiosidade?', 'Que semelhanças existem entre a rejeicao do seculo I e a indiferença religiosa de hoje?'],
  ['Rm 9:1-5', 'Rm 11:1-6', 'Mt 23:37-39']);

addVS(1, 12,
  'Deu-lhes o poder de serem filhos de Deus — adocao divina',
  'O texto grego \'exousia\' indica que a filiação divina não é automática, mas requer resposta. A adocao como filhos de Deus é um tema paulino que Joao apresenta de forma concisa.',
  'O prologo introduce o tema da filiação divina que sera desenvolvido em 1 Jo 3:1-3.',
  'A filiação divina é o privilegio mais alto da existencia humana. Nao somos apenas criaturas de Deus — somos filhos adotivos, com heranca e comunhao direta com o Pai.',
  ['Abraçar a identidade de filho(a) de Deus como base da autoestima', 'Compartilhar o convite da filiação com quem vive como orfao espiritual'],
  ['O que significa ser \'filho de Deus\' em termos praticos?', 'Que responsabilidades acompanham os privilegios da filiação divina?'],
  ['Rm 8:14-17', 'Gl 4:4-7', '1 Jo 3:1-3', 'Ef 1:5']);

addVS(1, 13,
  'Nao de sangue, nem de vontade de carne — origem sobrenatural da salvacao',
  'A tripla negacao (sangue, vontade de carne, vontade de homem) refuta qualquer forma de salvacao humana — seja por linhagem, esforco moral ou decisao arbitria.',
  'O prologo contrasta duas origens: a natural (sangue/carn) e a sobrenatural (de Deus). Isso prepara o ensinamento sobre nascer de novo (cap. 3).',
  'A salvacao nao é conquista humana, mas regeneracao divina. Ninguem pode nascer de novo por proprio esforco.',
  ['Reconhecer que minha salvacao e obra de Deus, nao meu merecimento', 'Proclamar a graça como unica base da salvacao'],
  ['Se a salvacao e de Deus, que papel exerce a responsabilidade humana?', 'Que consolo existe em saber que minha salvacao depende de Deus?'],
  ['Ef 2:8-9', 'Tt 3:5', '1 Pe 1:23', 'Rm 9:16']);

addVS(1, 14,
  'O Verbo se fez carne — o mistério da incarnação',
  'A expressão \'se fez carne\' (eskēnōsen) significa literalmente \'tabernaculou\' — o Verbo eterno habitou entre os humanos como Deus habitou no tabernaculo no deserto.',
  'Este é o versiculo mais denso teologicamente do prologo. A incarnacao é o ponto alto da historia da redencao.',
  'A incarnacao é o maior ato de humildade e amor da historia. Deus nao apenas falou — Ele se tornou um de nos.',
  ['Adorar a humildade de Deus que se tornou carne para nos resgatar', 'Viver com a consciencia de que Deus entende minha experiencia humana completa'],
  ['O que significa o Verbo se tornar carne em termos de como Deus nos entende?', 'Que implicacoes a incarnacao tem para a minha vida fisica e emocional?'],
  ['Fp 2:6-8', '1 Ti 3:16', 'He 2:14-18', '1 Jo 4:2-3']);

addVS(1, 15,
  'Joao deu testemunho dele — o testemunho profetico do Batista',
  'Joao reitera o testemunho do Batista (vv. 6-8), mas agora com o conteudo especifico: Cristo \'vem depois de mim\' mas \'era antes de mim\'.',
  'O prologo interrompe o fluxo da incarnacao (v. 14) para lembrar que o testemunho profetico ja havia apontado para esta verdade.',
  'O testemunho do Batista valida a preexistencia de Cristo de forma publica e historica. Isso nao e especulacao teologica, mas relato de testemunha ocular.',
  ['Valorizar o testemunho historico da igreja primitiva como fundamento da fé', 'Ser fiel em transmitir o que Deus revelou'],
  ['Como o testemunho do Batista antecipa os debates cristologicos dos primeiros seculos?', 'Que importancia tem o testemunho historico para a fé cristã atual?'],
  ['Mt 3:13-17', 'Jo 3:28-30', '1 Jo 1:1-3']);

addVS(1, 16,
  'Recebemos graça sobre graça — abundancia da revelacao divina',
  'A frase \'charin anti charitos\' indica graça em lugar de graça — uma graça substituindo e superando a anterior. Isso descreve o progresso da revelacao.',
  'O prologo contrasta a Lei de Moises (graça limitada) com a graça de Cristo (graça plena).',
  'A graça de Cristo é inesgotavel e progressiva. Cada dia na fé revela novas profundidades de amor divino.',
  ['Busca mais profundidade na graça de Deus', 'Estudar a transicao da Lei para a graça'],
  ['Como podemos experimentar \'graça sobre graça\' na vida cristã?', 'Que differencas existem entre a graça da Lei e a graça do Evangelho?'],
  ['2 Co 3:7-18', 'Hb 1:1-4', 'Rm 5:20-21']);

addVS(1, 17,
  'A Lei foi dada por Moises; a graça e a verdade vieram por Cristo',
  'A conjuncao \'de\' indica origem: a Lei teve origem em Moises; a graça teve origem em Cristo. Isso nao diminui a Lei, mas estabelece a superioridade da revelacao cristologica.',
  'O prologo estabelece o contraste entre duas dispensacoes: a Lei (parcial, preparatoria) e a graça (plena, culminante).',
  'A Lei revela o pecado; a graça o perdoa. A Lei exige obediencia perfeita; a graça a concede.',
  ['Estudar a relacao entre Lei e graça', 'Viver na dispensacao da graça plena revelada em Cristo'],
  ['Se a Lei foi dada por Moises e a graça veio por Cristo, como elas se relacionam?', 'O que significa viver na graça sem desprezar a santidade da Lei?'],
  ['Rm 6:14', 'Rm 7:7-12', 'Gl 3:23-25']);

addVS(1, 18,
  'Ninguem jamais viu a Deus — Cristo como Revelador unico',
  'O texto grego diz \'monogenēs theos\' (Deus unico/unigênito), nao \'filho unico\'. Isso indica que Cristo é o unico que pode revelar plenamente a Deus.',
  'O prologo se encerra com a afirmação mais forte sobre a identidade de Cristo: Ele é Deus que revela Deus.',
  'Cristo é a unica via de acesso a Deus. Toda forma de buscar Deus fora de Cristo é incompleta e insatisfatoria.',
  ['Buscar conhecer o Pai apenas atraves de Cristo', 'Estudar profundamente a vida e ensinamentos de Jesus como revelacao de Deus'],
  ['Por que ninguem pode ver Deus diretamente?', 'Como Cristo revela o character de Deus de forma unica?'],
  ['Jo 14:9', '1 Jo 4:12', '1 Tm 6:16', 'Cl 1:15']);

// ═══════ CAPITULO 2 ═══════
addVS(2, 1,
  'Houve bodas em Cana da Galileia — o primeiro sinal revelador',
  'Cana era uma vila pequena na Galileia. As bodas duravam sete dias. O fato de Jesus e seus discipulos estarem presentes indica participacao normal na vida social judaica.',
  'Capitulo 2 inaugura a secao dos sinais de Jesus (2:1-11:45). A primeira obra publica é um ato de servico humilde em uma celebracao familiar.',
  'O primeiro sinal revela que Cristo traz alegria e abundancia. A agua transformada em vinho aponta para a transformacao que Cristo opera na vida.',
  ['Reconhecer que Cristo se importa com as alegrias e necessidades cotidianas', 'Permitir que Cristo transforme as areas vazias da minha vida em abundancia'],
  ['Por que a primeira obra publica de Jesus foi em uma celebracao de casamento?', 'O que a transformacao da agua em vinho ensina sobre o proposito de Cristo?'],
  ['Is 25:6', 'Ef 5:25-27', 'Ap 19:7-9']);

addVS(2, 4,
  'Que tenho contigo, mulher? Ainda nao chegou a minha hora — timing divino',
  'A expressão grega \'ti emoi kai soi\' não é desrespeito — é formula idiomática que indica que o assunto não é de responsabilidade compartilhada. A \'hora\' é o tema central joanino.',
  'Jesus estabelece Sua autoridade independente — Sua \'hora\' é determinada pelo Pai, nao por circunstancias humanas.',
  'Jesus nao age por pressao, mas por proposito divino. Deus age no Seu tempo, nao no nosso.',
  ['Respeitar o tempo de Deus, mesmo quando queremos ação imediata', 'Confiancar que Deus tem um proposito e momento para tudo'],
  ['O que Jesus quis dizer com \'minha hora\'?', 'Como podemos confiancar no tempo de Deus quando as circunstancias parecem urgentes?'],
  ['Jo 7:30', 'Jo 12:23', 'Jo 13:1']);

addVS(2, 5,
  'Fazei o que Ele vos disser — obediencia como canal de milagres',
  'Maria não insiste nem desiste — obedece e direciona os servos a Cristo. Sua frase final registrada nas Escrituras é um mandamento de obediencia.',
  'A resposta de Maria aponta para Cristo, nunca para si mesma. A intercessão de Maria sempre direciona para Jesus.',
  'A obediencia simples é o canal pelo qual Deus opera milagres. A fé que obedece antes de compreender é o tipo de fé que agrada a Deus.',
  ['Obedecer aos ensinamentos de Cristo mesmo quando nao compreendemos', 'Agir com fé antes de ver o resultado'],
  ['Que importancia tem a obediencia na experiencia cristã?', 'Como a obediencia precede o entendimento na fé?'],
  ['1 Sm 15:22', 'Tg 1:22-25', 'Hb 11:8']);

addVS(2, 11,
  'Este foi o primeiro dos sinais de Jesus — revelacao da glória divina',
  'O termo \'semeia\' (sinais) é usado por Joao em vez de \'dynameis\' (milagres). Cada sinal joanino aponta para uma verdade maior sobre a identidade de Cristo.',
  'O versiculo encerra a narrativa de Cana com a declaracao de proposito: os sinais revelam a glória de Cristo e fortalecem a fé dos discipulos.',
  'Os sinais de Cristo não são meros prodigios — são revelacoes da glória divina. Cada miraculo tem um significado teológico profundo.',
  ['Estudar cada sinal de Cristo em Joao para entender seu significado', 'Permitir que os sinais de Cristo fortaleçam minha fé'],
  ['Qual é a diferença entre \'milagre\' e \'sinal\' na teologia joanina?', 'Como os sinais de Cristo revelam Sua glória?'],
  ['Jo 20:30-31', 'Jo 11:4', '2 Co 3:18']);

addVS(2, 14,
  'Encontrou no templo os que vendiam bois, ovelhas e pombas — instituicao corrompida',
  'O mercado do templo era uma extensao do sistema sacrificial. O problema era a exploração e o lucro excessivo em um local sagrado.',
  'Jesus confronta o sistema religioso que priorizou o lucro sobre a oração. O templo deveria ser casa de oração para todas as nações.',
  'A religiosidade que se torna instrumento de poder e lucro é odiosa aos olhos de Deus.',
  ['Avaliar se uso a fé para lucro pessoal', 'Confrontar pratica religiosas que exploram os vulneraveis'],
  ['Como a religiosidade corrompida se manifesta hoje?', 'Que responsabilidade temos de purificar a igreja?'],
  ['Am 5:21-24', 'Is 1:11-17', 'Mt 23:25-28']);

addVS(2, 16,
  'Tirai isso daqui — o templo como casa de oração',
  'A frase \'casa de oração\' (oikos proseuchēs) vem de Is 56:7, que inclui as nações — antecipando a universalidade da graça.',
  'Jesus completa a frase de Isaias e remove o complemento sobre as nações, focando no proposito original do templo.',
  'O culto a Deus deve ser marcado por oração e reverencia, nao por comércio e exploração.',
  ['Priorizar a oração e a adoração genuína', 'Manter o sagrado separado do comércio'],
  ['Que formas de \'comercio espiritual\' precisam ser \'tiradas\' da igreja hoje?', 'Como podemos manter o foco na oração?'],
  ['Is 56:7', 'Jr 7:11', 'Mt 21:13']);

addVS(2, 19,
  'Destruí este templo e em três dias o levantarei — profecia da ressurreição',
  'Jesus fala do templo do Seu corpo (v. 21). As autoridades entendem literalmente. A profecia é sobre a ressurreição no terceiro dia.',
  'A frase é o nucleo da acusação contra Jesus no julgamento. As autoridades distorceram suas palavras para acusa-lo de blasfêmia.',
  'A ressurreição é o sinal definitivo de que Jesus é o Messias. A destruicao e reconstrucao do templo do Seu corpo é o ato redentor supremo.',
  ['Fixar os olhos na ressurreição como fundamento da fé cristã', 'Viver na certeza da ressurreição como base da esperança'],
  ['Por que Jesus escolheu a linguagem do templo para falar de Sua ressurreição?', 'Que centralidade a ressurreição tem na teologia cristã?'],
  ['Mt 26:61', 'Mc 14:58', '1 Co 15:3-4', '1 Co 3:16']);

addVS(2, 22,
  'Quando ressuscitou dentre os mortos, os discipulos lembraram-se — compreensao retroativa',
  'Padrao joanino: a compreensão das palavras de Jesus só vem apos a ressurreição. A fé não é cega — é baseada na evidencia historica da ressurreição.',
  'A ressurreição é a chave hermeneutica de todo o Evangelho. Sem ela, as palavras de Jesus permanecem enigmaticas.',
  'A ressurreição transforma a compreensão do passado. O que parecia confuso se torna claro.',
  ['Estudar as Escrituras com a lente da ressurreição', 'Confiancar que Deus revelará Sua verdade no tempo certo'],
  ['Como a ressurreição ilumina a compreensão do Antigo Testamento?', 'Que exemplos de compreensao retroativa existem na minha vida?'],
  ['Lc 24:44-48', 'At 17:2-3', '1 Co 15:14']);

addVS(2, 23,
  'Muitos creram no seu nome vendo os sinais — fé baseada em sinais',
  'Muitos \'creram\', mas Jesus nao \'confiava\' neles (v. 24). Joao distingue entre fé superficial (baseada em sinais) e fé genuína.',
  'O versiculo introduz um tema joanino crucial: há niveis diferentes de fé. A fé baseada em milagres é frágil e superficial.',
  'Ver sinais não garante fé genuína. Muitas pessoas seguem Jesus por causa do que recebem, nao por quem Ele é.',
  ['Examinar se minha fé se baseia em sinais externos ou em conhecimento pessoal de Cristo', 'Buscar uma fé madura que resista quando os sinais cessam'],
  ['Qual é a diferença entre fé baseada em sinais e fé baseada em conhecimento?', 'Como desenvolver uma fé mais profunda e resistente?'],
  ['Jo 4:48', 'Jo 6:26-27', 'Jo 20:29']);

addVS(2, 24,
  'Jesus nao se confiava a eles — discernimento divino do coracao',
  'O verbo grego \'episteuen\' (confiava) é o mesmo usado para \'crer\'. Jesus \'não cría\' neles porque conhecia o coracao humano.',
  'Contraste entre a fé superficial do povo (v. 23) e o discernimento de Jesus (v. 24). A Omnisciência de Cristo é implicita.',
  'Deus conhece profundamente cada coracao humano. Isso é consolador para quem é sincero e temivel para quem finge.',
  ['Cultivar autenticidade na presença de Deus', 'Buscar a genuinidade na adoração, na oração e no testemunho'],
  ['O que a Omnisciência de Jesus implica para a nossa vida espiritual?', 'Que consolo e que desafio existe em saber que Deus conhece nosso coracao?'],
  ['1 Sm 16:7', 'Sl 139:1-4', 'Hb 4:12-13']);

// ═══════ CAPITULO 3 ═══════
addVS(3, 1,
  'Havia um fariseu chamado Nicodemus — o professor que buscou a verdade',
  'Nicodemus era membro do Sinédrio e fariseu — duas qualificacoes que indicam autoridade religiosa e politica. Sua visita noturna indica medo ou desejo de privacidade.',
  'Nicodemus é um dos personagens mais complexos do Evangelho. Ele representa a religiosidade judaica que busca verdade, mas hesita em abraçar plenamente a verdade.',
  'A busca por Cristo não é exclusiva dos pobres e marginalizados. Os religiosos, educados e poderosos tambem precisam nascer de novo.',
  ['Reconhecer que a educacao e a posicao religiosa nao substituem o novo nascimento', 'Buscar a Cristo pessoalmente, mesmo quando a sociedade desaprova'],
  ['Por que Nicodemus veio de noite?', 'Que barreiras sociais e religiosas podem impedir as pessoas de buscarem Cristo?'],
  ['Nm 22:18-20', '1 Sm 3:1-10', 'Is 55:6-9']);

addVS(3, 3,
  'Se um homem nao nascer de novo, nao pode ver o Reino de Deus — necessidade absoluta',
  'A frase \'nascer de novo\' (gennaō anōthen) tem duplo sentido: \'nascer de cima\' ou \'nascer de novo\'. Jesus usa a ambiguidade intencionalmente.',
  'Jesus muda o assunto de sinais para necessidade humana fundamental. A question intelectual de Nicodemus é transformada em declaracao de necessidade espiritual.',
  'O novo nascimento não é opcional — é condição absoluta para a vida no Reino. Isso refuta qualquer forma de salvacao por obras ou herança religiosa.',
  ['Reconhecer que nenhuma quantidade de religiosidade substitui o novo nascimento', 'Buscar a transformação sobrenatural que so o Espirito Santo pode produzir'],
  ['O que significa nascer de novo na compreensão cristã?', 'Como o novo nascimento se relaciona com a fé em Cristo?'],
  ['Ef 2:1-5', 'Tt 3:5', '1 Pe 1:23', 'Rm 12:2']);

addVS(3, 5,
  'Se um homem nao nascer de agua e de Espirito, nao pode entrar no Reino — dupla regeneração',
  'A \'agua\' pode se referir a: (1) nascimento fisico, (2) purificacao ritual (baptismo), ou (3) a Palavra de Deus. A maioria dos estudiosos ve dupla regeneração: fisica e espiritual.',
  'Jesus amplia a explicação: o novo nascimento envolve agua (limpeza) e Espirito (regeneracao). Isso antecipa a doutrina do batismo.',
  'A vida no Reino requer transformação completa — purificação e regeneração. Isso não é mera decisao intelectual, mas uma obra sobrenatural.',
  ['Entender que a salvação envolve purificação e regeneracao', 'Valorizar o batismo como sinal externo da obra interna do Espirito'],
  ['O que a \'agua\' representa neste versículo?', 'Que papel o batismo desempenha no novo nascimento?'],
  ['Ef 5:25-26', 'Tt 3:5', 'At 2:38', 'Rm 6:3-4']);

addVS(3, 6,
  'O que nasceu da carne e carne, e o que nasceu do Espirito e espirito — duas naturezas',
  '\'Carne\' (sarx) não se refere ao corpo, mas a natureza caída dominada pelo pecado. O Espirito é a natureza divina que regenera.',
  'Jesus estabelece uma distincao ontológica: a carne so produz carne; o Espirito produz espirito. A transformação não é melhoria da natureza caída, mas criacao nova.',
  'A regeneração não é auto-aperfeiçoamento — é criacao nova. A natureza caída não pode se transformar em espiritual por esforco proprio.',
  ['Reconhecer que a transformação espiritual depende do Espirito Santo', 'Evitar o moralismo que tenta transformar a carne em espiritual por obras'],
  ['Que implicacoes a distincao carne/espirito tem para a vida cristã?', 'Como a regeneração difere da reforma moral?'],
  ['Rm 8:5-9', 'Gl 5:16-17', '1 Co 2:11-14']);

addVS(3, 8,
  'O vento sopra onde quer — o mistério da obra do Espirito',
  'A palavra grega \'pneuma\' significa tanto \'vento\' quanto \'espirito\'. Jesus usa a analogia natural para explicar a obra sobrenatural.',
  'A obra do Espirito Santo é misteriosa e soberana. Assim como o vento nao pode ser controlado, a regeneração é obra da soberania divina.',
  'O Espirito Santo age livremente, onde e quando quer. A regeneração não é produto de programa humano.',
  ['Abraçar o mistério da obra do Espirito Santo', 'Ser sensivel ao soprar do Espirito na vida e na igreja'],
  ['Como a analogia do vento ajuda a compreender a obra do Espirito?', 'Que implicas a soberania do Espirito para o evangelismo?'],
  ['Jo 14:16-18', 'At 2:1-4', '1 Co 12:4-11']);

addVS(3, 9,
  'Como pode ser isso? — a limitação da compreensão humana',
  'Nicodemus pergunta pela segunda vez como algo pode ser possivel. A repetição indica que não conseguiu absorver a verdade espiritual.',
  'O dialogo mostra a gradual revelação: de sinais (v. 2) para necessidade (vv. 3-5) para mistério (v. 8).',
  'A compreensão espiritual requer humildade intelectual. Não podemos compreender tudo com a mente limitada.',
  ['Cultivar humildade intelectual diante dos mistérios de Deus', 'Aceitar que ha verdades que transcendem a compreensão humana'],
  ['Como podemos equilibrar a busca por entendimento com a aceitação do mistério?', 'Que papel a humildade desempenha na compreensão espiritual?'],
  ['Is 55:8-9', 'Rm 11:33-36', '1 Co 1:20-21']);

addVS(3, 10,
  'Tu és o mestre de Israel e nao sabes isso? — a ironia pedagogica',
  'A pergunta de Jesus é irônica: um dos maiores mestres de Israel nao entende a verdade mais básica sobre a regeneração.',
  'Jesus usa a propria posição de Nicodemus contra ele. Se ele fosse realmente mestre, ja deveria conhecer as Escrituras que falam do novo coracao.',
  'A teologia academica sem regeneração é estéril. Nicodemus sabia as Escrituras, mas nao compreendia a necessidade do novo nascimento.',
  ['Unir o estudo teológico com a experiencia espiritual', 'Permitir que as Escrituras transformem o coracao, nao apenas a mente'],
  ['Como o conhecimento teologico pode se tornar estéril?', 'Que papel a experiência espiritual desempenha na compreensão das Escrituras?'],
  ['1 Co 8:1-3', '2 Tm 3:5-7', 'Rm 2:17-24']);

addVS(3, 13,
  'Ninguém subiu ao céu senão aquele que desceu — a exclusividade de Cristo',
  'A frase \'Filho do Homem\' é titulo messiânico de Dn 7:13-14. Jesus afirma que Ele é o unico que \'desceu do céu\' e pode testemunhar das realidades divinas.',
  'O versiculo estabelece a autoridade unica de Cristo como Revelador divino. Nenhum profeta ou mestre pode testemunhar do céu — somente o que veio de lá.',
  'Cristo é a unica ponte entre céu e terra. Nenhuma religião, filosofia ou experiencia humana pode substituir a revelação que Cristo trouxe.',
  ['Reconhecer a autoridade unica de Cristo como Revelador divino', 'Valorizar a revelação cristã como superior a qualquer outro conhecimento'],
  ['Por que Cristo é o unico que pode testemunhar das realidades celestiais?', 'Que conforto existe em saber que temos um Revelador perfeito?'],
  ['Jo 1:18', 'Jo 14:6', '1 Tm 2:5', 'Hb 1:1-3']);

addVS(3, 14,
  'Assim como Moises levantou a serpente no deserto — tipologia da cruz',
  'A referencia é a historia de Nm 21:4-9, onde Israel foi picado por serpentes venenosas e curado ao olhar para a serpente de bronze erguida por Moises.',
  'Jesus usa uma tipologia do AT para explicar a cruz. Assim como os israelitas foram curados pelo simples ato de olhar, os crentes são salvos pelo ato de fé em Cristo crucificado.',
  'Cristo, sem pecado, tomou sobre Si o pecado da humanidade. Assim como a serpente era o instrumento de cura, a cruz é o instrumento de redenção.',
  ['Fixar os olhos na cruz de Cristo como unica fonte de salvacao', 'Reconhecer que Cristo assumiu o que nao merecava para nos dar o que nao merecamos'],
  ['Por que Jesus escolheu a tipologia da serpente para explicar a cruz?', 'Que semelhanças existem entre a serpente de bronze e Cristo na cruz?'],
  ['Nm 21:4-9', '2 Co 5:21', 'Gl 3:13', '1 Pe 2:24']);

addVS(3, 15,
  'Para que todo o que crê tenha vida eterna nele — o proposito da cruz',
  'A frase \'todo o que crê\' indica universalidade da oferta e especificidade da resposta. A vida eterna é disponivel a todos que creem.',
  'O versiculo articula o proposito da cruz: salvacao pela fé. Isso é o nucleo do evangelho joanino.',
  'A vida eterna é um presente disponivel agora, nao apenas uma recompensa futura. A fé em Cristo produz vida eterna imediata.',
  ['Cultivar uma fé viva e ativa em Cristo crucificado', 'Receber a vida eterna como presente atual'],
  ['O que significa crer em Cristo de forma prática?', 'Que differencas existem entre fé genuína e fé superficial?'],
  ['Jo 5:24', 'Jo 6:47', 'Jo 11:25-26', 'Rm 6:23']);

addVS(3, 16,
  'Porque Deus amou o mundo de tal maneira — o versículo mais conhecido',
  'A expressão \'de tal maneira\' (houtōs) indica o grado do amor. Deus amou tanto o mundo que deu o Seu Filho unigênito. Isso é a declaracao mais concisa do evangelho.',
  'O versiculo é o resumo de todo o dialogo com Nicodemus. Tudo o que Jesus disse culmina nesta declaracao de amor divino.',
  'O amor de Deus é incondicional (ao mundo), sacrificial (deu o Filho), e salvífico (para que nao pereça). Isso é o fundamento da fé cristã.',
  ['Receber o amor de Deus como fundamento da identidade', 'Compartilhar a oferta do evangelho com urgencia'],
  ['O que o amor de Deus pelo \'mundo\' ensina sobre Sua natureza?', 'Que implicacoes a free offer do evangelho tem para o evangelismo?'],
  ['Rm 5:8', '1 Jo 4:9-10', 'Jo 1:14', '2 Co 5:19-21']);

addVS(3, 17,
  'Deus nao enviou o Filho para condenar, mas para salvar — o proposito da vinda',
  'Isso é uma correção ao pensamento que esperava um Messias juiz. Jesus veio primeiro como Salvador, nao como Juiz.',
  'O versiculo estabelece a hierarquia de propositos: a vinda de Cristo tem como proposito principal a salvacao.',
  'Deus é misericordioso antes de ser juiz. A condenação é consequencia da rejeição, nao do proposito divino.',
  ['Viver na certeza de que o proposito de Deus é salvacao', 'Compartilhar o evangelho com a urgencia de quem sabe que a alternativa e condenação'],
  ['Qual é a relação entre salvacao e condenação no proposito de Deus?', 'Que consolo existe em saber que o coracao de Deus é salvador?'],
  ['2 Pe 3:9', '1 Tm 2:3-4', 'Lc 15:7', 'Rm 5:8-9']);

addVS(3, 18,
  'Quem crê nele nao e condenado — a liberdade pela fé',
  'A condenação ja existe para quem nao crê — nao é futura, mas presente. A fé em Cristo livra da condenação presente e futura.',
  'O versiculo estabelece dois estados: condenado (por incredulidade) e livre (pela fé). A diferença é a fé, nao o merecimento.',
  'A fé em Cristo é o divisor de águas entre condenação e libertação. Isso não é sobre merecimento, mas sobre recepção.',
  ['Viver na liberdade daquele que nao e mais condenado', 'Compartilhar a liberdade da condenação com quem vive sob medo'],
  ['O que significa estar \'condenado\' na experiencia presente?', 'Como a fé em Cristo livra da condenação?'],
  ['Rm 8:1-2', 'Jo 5:24', '1 Jo 3:18-20']);

addVS(3, 19,
  'Esta é a condenação: que a luz veio e os homens amaram as trevas — a causa',
  'A condenação não é arbitrária — é responsavel. Os homens sao condenados porque preferem as trevas à luz.',
  'O versiculo explica a mecanica da condenação: rejeição voluntaria da luz. A cegueira espiritual é escolha.',
  'A condenação humana é auto-imposta. Deus oferece luz; o homem escolhe trevas.',
  ['Examinar se estou evitando areas que a luz de Cristo quer iluminar', 'Cultivar amor à luz em vez de apego às trevas'],
  ['Por que as pessoas preferem as trevas à luz?', 'Que areas da minha vida resistem à luz de Cristo?'],
  ['Jo 1:5', 'Jo 8:12', 'Ef 5:11-14', '1 Jo 1:5-7']);

addVS(3, 21,
  'Mas quem pratica a verdade vem à luz — a coragem da autenticidade',
  'O contraste com o v. 20 é claro: quem ama a verdade busca a luz. Isso nao significa perfeição, mas direção do coraque.',
  'O versiculo encerra o dialogo com Nicodemus com uma nota de esperança: ha uma alternativa à condenação.',
  'A autenticidade espiritual produz coragem para enfrentar a luz. Quem vive na verdade nao teme a exposição.',
  ['Praticar a verdade em todas as areas da vida', 'Buscar a luz em vez de fugir dela'],
  ['Que diferencas existem entre quem foge da luz e quem busca a luz?', 'Como a pratica da verdade produz mais luz na vida?'],
  ['1 Jo 1:5-7', 'Jo 8:31-32', 'Ef 5:8-14']);

// ═══════ CAPITULO 4 ═══════
addVS(4, 3,
  'Deixou a Judeia e voltou para a Galileia — caminho de cruzamento',
  'O caminho mais curto da Judeia para a Galileia passava pela Samaria. A maioria dos judeus evitava o territorio samaritano. Jesus escolhe deliberadamente o caminho \'errado\'.',
  'A jornada pela Samaria é preparação narrativa para o encontro com a mulher samaritana.',
  'Cristo quebra barreiras sociais e religiosas para alcançar quem esta perdido.',
  ['Quebrar barreiras sociais e religiosas para alcançar quem precisa de Cristo', 'Reconhecer que Deus frequentemente nos leva por caminhos inesperados'],
  ['Por que Jesus escolheu passar pela Samaria?', 'Que barreiras precisamos quebrar para alcançar os perdidos?'],
  ['At 1:8', 'Lc 10:25-37', '1 Co 9:19-22']);

addVS(4, 4,
  'Tinha que passar pela Samaria — necessidade divina',
  'A expressão \'tinha que\' (edei) indica necessidade divina, nao geografica. Jesus \'tinha que\' passar pela Samaria porque tinha um encontro divinamente marcado.',
  'O \'tinha que\' joanino ecoa o \'tinha que\' da cruz. A missao de Cristo o levava a cruzes e encontros.',
  'Deus direciona nossos passos para encontros providenciais.',
  ['Confiar que Deus direciona meus passos para encontros providenciais', 'Estar atento às pessoas que Deus coloca no meu caminho'],
  ['Como Deus usa decisões cotidianas para cumprir Seus propositos?', 'Que encontros providenciais Deus tem proporcionado na minha vida?'],
  ['Rm 8:28', 'At 8:26-29', 'Pv 16:9']);

addVS(4, 6,
  'Jesus, cansado da jornada, assentou-se à beira do poço — humanidade real de Cristo',
  'O detalhe da fadiga humilde a divindade de Cristo. O mesmo Verbo que criou o universo agora senta cansado. Isso é a incarnacao em profundidade.',
  'O poço de Jacó é local historicamente significativo para os samaritanos. Jesus escolhe um local de memoria religiosa compartilhada.',
  'A fadiga de Jesus mostra que Ele experiencia plenamente a vida humana. Isso valida Sua capacidade de sympathia com nossas fraquezas.',
  ['Confiancar em um Cristo que compreende nossas fraquezas', 'Reconhecer que Deus se manifesta nos momentos mais comuns da vida'],
  ['Por que Joao inclui o detalhe da fadiga de Jesus?', 'Que consolo existe em saber que Jesus entende nossa exaustão?'],
  ['Hb 4:15-16', 'Is 53:2-3', 'Fp 2:6-8']);

addVS(4, 7,
  'Veio uma mulher samaritanabuscar agua — o encontro providencial',
  'A mulher é duplamente marginalizada: samaritana, mulher e com historico moral questionavel. Jesus vai ao encontro dos mais rejeitados.',
  'O horario do meio-dia indica que ela evitava as outras mulheres. A vinda de Jesus no horário \'errado\' mostra que a providencia transcende convenções.',
  'Deus frequentemente nos leva a pessoas em momentos de vulnerabilidade e solidão.',
  ['Buscar os marginalizados e solitarios, como Jesus fez', 'Estar atento aos encontros providenciais do dia a dia'],
  ['Por que Jesus escolheu esta mulher em particular?', 'Que barreiras sociais precisamos quebrar?'],
  ['Lc 19:5-10', 'Lc 15:1-7', 'At 8:26-40']);

addVS(4, 9,
  'Como pedes agua a uma samaritana? — barreiras quebradas por Cristo',
  'A surpresa da mulher revela as profundas divisoes entre judeus e samaritanos. Um rabino judeu nunca falaria com uma mulher samaritana em público.',
  'O versiculo estabelece o conflito social que Jesus vai desafiar. Barreiras etnicas, de gênero e religiosas são quebradas por Cristo.',
  'O evangelho transcende todas as divisões humanas — raciais, sociais, religiosas e de gênero.',
  ['Quebrar deliberadamente as barreiras sociais que impedem o evangelho', 'Examinar se minhas preconceitos estao impedindo meu testemunho'],
  ['Que barreiras sociais Jesus quebrou neste encontro?', 'Como as divisoes ainda afetam o testemunho cristão hoje?'],
  ['Gl 3:28', 'Ef 2:14-16', 'At 10:34-35']);

addVS(4, 10,
  'Se soubesses o dom de Deus — a revelação da graça',
  'Jesus transforma a conversa sobre agua fisica para agua espiritual. O \'dom de Deus\' é Cristo mesmo e a vida eterna.',
  'A frase \'se soubesses\' indica que a mulher estava despercebendo a maior oportunidade da sua vida.',
  'A graça de Deus é um dom que frequentemente ignoramos por focar nas necessidades materiais.',
  ['Reconhecer que Cristo é o maior dom que podemos receber', 'Ir alem das necessidades materiais para buscar as espirituais'],
  ['Que \'dom de Deus\' Jesus oferece à mulher?', 'Como ignoramos os \'dons de Deus\' ao focar apenas nas necessidades materiais?'],
  ['Rm 6:23', 'Ef 2:8', 'Jo 3:16']);

addVS(4, 13,
  'Todo aquele que beber desta agua tornará a ter sede — insuficiencia do mundo',
  'A agua do poço satisfaz momentaneamente, mas a sede retorna. Assim, as satisfações materiais nunca preenchem completamente o vazio da alma.',
  'Jesus estabelece o contraste entre agua temporal (satisfacoes do mundo) e agua eterna (vida em Cristo).',
  'A sede insaciável do coração humano so é satisfeita por Cristo.',
  ['Examinar onde estou buscando saciedade que so Cristo pode dar', 'Vir a Cristo como a unica fonte de saciedade eterna'],
  ['Que \'águas\' o mundo oferece que nunca saciam?', 'O que significa experimentar a saciedade que Cristo oferece?'],
  ['Is 55:1-2', 'Ec 1:8', 'Lc 12:15-21']);

addVS(4, 14,
  'Quem beber da agua que eu lhe der nunca mais terá sede — vida eterna abundante',
  'A \'agua viva\' é o Espirito Santo e a vida eterna. A promessa é que quem receber a Cristo terá uma fonte interior que jorra para a vida eterna.',
  'A imagem de fonte indica que a vida eterna não é estatica, mas dinamica. Cristo produz uma fonte interior que continua a suprir.',
  'A vida em Cristo é abundante e auto-alimentada. A fonte interior do Espirito Santo supre continuamente as necessidades espirituais.',
  ['Cultivar a fonte interior do Espirito Santo', 'Viver na certeza de que Cristo supre continuamente minhas necessidades'],
  ['O que significa a \'agua viva\' na vida cristã?', 'Como a fonte interior funciona no dia a dia?'],
  ['Jo 7:37-39', 'Jo 10:10', 'Is 44:3', 'Ef 3:17-19']);

addVS(4, 16,
  'Vai, chama teu marido e volta — Jesus confronta a realidade oculta',
  'Jesus pede a mulher que traga seu marido como pretexto para revelar Sua Omnisciência.',
  'O confronto de Jesus não é acusatório, mas revelador. Ele usa a pergunta para revelar que conhece toda a historia da mulher.',
  'Deus conhece nossas historias completas — os fracassos, as feridas, os segredos. Isso é amedrontador e libertador ao mesmo tempo.',
  ['Abrir os segredos do coraque diante de Deus', 'Confiancar que o conocimento de Deus é para cura, nao para condenação'],
  ['Por que Jesus confrontou a mulher sobre seu passado?', 'Que liberdade existe em ser conhecido completamente por Deus?'],
  ['Sl 139:1-4', 'Hb 4:12-13', '1 Jo 3:19-20']);

addVS(4, 18,
  'Tiveste cinco maridos e o que tens agora nao teu marito — a verdade libertadora',
  'Cinco maridos indicam uma historia de instabilidade relacional. A mulher era duplamente marginalizada: etnicamente e moralmente.',
  'Jesus revela que conhece toda a historia, mas sem julgamento punitivo. Isso prepara o terreno para que ela reconheça que Cristo e o Messias.',
  'Nenhuma historia é tao complicada para que Cristo não possa restaurar. O passado nao define o proposito de Deus.',
  ['Reconhecer que nenhum passado é tao grave para impedir a restauração', 'Não julgar os outros com base em seu passado'],
  ['Como o passado da mulher prepara o terreno para a revelação messiânica?', 'Que exemplos de restauração existem na Bíblia?'],
  ['Js 24:15-24', 'Lc 15:11-32', '1 Co 6:9-11']);

addVS(4, 21,
  'Nem neste monte nem em Jerusalem adorareis — culto em espirito e verdade',
  'Jesus transcende a disputa entre judeus e samaritanos sobre o local correto de culto. O culto verdadeiro não depende de lugar, mas de atitude interior.',
  'A declaracao revoluciona o conceito de culto: nao é mais centralizado em templo, mas no espirito e na verdade.',
  'O culto a Deus é universal e espiritual. Qualquer pessoa, em qualquer lugar, pode adorar a Deus.',
  ['Adorar a Deus em qualquer lugar com espirito e verdade', 'Buscar a autenticidade na adoração'],
  ['O que significa adorar em espirito e em verdade?', 'Que reformas o culto cristão precisa?'],
  ['At 17:24-25', 'Jo 14:23', 'Rm 12:1-2']);

addVS(4, 22,
  'Vocês adoram o que não conhecem — a ignorancia religiosa',
  'Jesus afirma que os samaritanos adoram sem conhecimento verdadeiro. Isso é critica direta à religiosidade sincretista.',
  'O versiculo estabelece a hierarquia do conhecimento: \'nos sabemos o que adoramos\'. Isso não é arrogancia, mas reconhecimento de que a adoração requer conhecimento da verdade.',
  'A adoração sem conhecimento é idolatria disfarçada. Deus deseja adoradores em espirito E em verdade.',
  ['Buscar o conhecimento verdadeiro de Deus para adorar com propriedade', 'Equilibrar a emoção e o conhecimento na adoração'],
  ['Por que o conhecimento é essencial para a adoração?', 'Que papel o estudo das Escrituras desempenha na adoração?'],
  ['Am 5:4-6', 'Is 1:11-15', 'Jo 14:6', 'Hb 11:6']);

addVS(4, 24,
  'Deus é Espírito — adorá-lo em espírito e em verdade',
  'A declaração mais profunda sobre a natureza de Deus e do culto. Deus é espiritual — nao pode ser limitado a templo ou ritual.',
  'A exigência de \'espírito e verdade\' indica que o culto requer a obra do Espirito Santo (espirito) e a conformidade com a Palavra (verdade).',
  'O culto espiritual reforma todo o conceito de adoração: de ritual externo para transformação interna.',
  ['Cultivar a vida espiritual para adorar em espirito', 'Fundamentar a adoração na verdade das Escrituras'],
  ['O que significa adorar \'em espírito\' e \'em verdade\' separadamente?', 'Que reformas o culto cristão precisa para atender a este padrão?'],
  ['Rm 12:1-2', 'Hb 13:15-16', 'Ef 5:18-20']);

addVS(4, 25,
  'Eu sei que o Messias vem — a fé que busca',
  'A mulher mantinha a expectativa messiânica da tradição samaritana. Sua declaracao contrasta com a incredulidade sofisticada de Nicodemus.',
  'A fé primitiva da mulher contrasta com a teologia complexa de Nicodemus. A simplicidade da fé frequentemente supera a complexidade da teologia.',
  'A esperança messiânica existe em lugares inesperados. Deus preservou nos corações humanos o anseio pelo Salvador.',
  ['Valorizar a fé simples e sincera, mesmo que incompleta', 'Buscar Cristo com o anseio da mulher samaritana'],
  ['Por que a fé simples da mulher contrasta com a teologia complexa de Nicodemus?', 'Que valor a fé sincera tem diante de Deus?'],
  ['Mt 11:25-26', '1 Co 1:26-29', 'Hb 11:6']);

addVS(4, 26,
  'Eu sou — a revelação messiânica direta',
  'Esta é a primeira vez que Jesus declara abertamente \'Eu sou\' (egō eimi) a um individuo no Evangelho de Joao. A declaração é teologicamente carregada, conectando-se com o nome divino de Êxodo 3:14.',
  'A declaração \'Eu sou\' é a identificação messiânica mais direta de Jesus no Evangelho. Isso vai alem de \'Messias\' — é uma afirmacao de divindade.',
  'Cristo não apenas é o Messias prometido — Ele é o \'Eu Sou\' eterno, o Deus que se revela ao povo.',
  ['Reconhecer que Jesus é mais que um grande mestre — Ele é o Deus que se revela', 'Receber a declaracao de Cristo como base da fé'],
  ['O que a declaração \'Eu sou\' ensina sobre a identidade de Jesus?', 'Por que a mulher samaritana foi a primeira a ouvir esta declaracao?'],
  ['Êxodo 3:14', 'Jo 8:58', 'Jo 10:30', 'Jo 18:5-6']);

addVS(4, 29,
  'Vejam um homem que me disse tudo o que eu fiz — o testemunho transformador',
  'A mulher deixa o cântaro e vai à cidade — a transformação é tão profunda que ela abandona o motivo da sua vinda (agua) para compartilhar o encontro com Cristo.',
  'A mulher se torna evangelista: \'Vejam um homem\'. O testemunho dela é baseado na experiencia pessoal, nao na teologia.',
  'A transformação que Cristo produz é tão intensa que muda as prioridades da pessoa. O que era importante (agua) se torna insignificante comparado com o encontro com Cristo.',
  ['Compartilhar o que Cristo fez na vida com entusiasmo natural', 'Deixar as \'cântaros\' (preocupações antigas) para testemunhar'],
  ['Como a mulher se transformou de marginalizada para evangelista?', 'Que exemplos de transformação radical existem na igreja?'],
  ['At 1:8', 'Mc 5:19-20', 'Lc 8:39']);

addVS(4, 39,
  'Muitos samaritanos creram por causa da palavra da mulher — o poder do testemunho',
  'O testemunho de uma mulher marginalizada leva muitos samaritanos à fé. Isso demonstra que Deus usa pessoas inesperadas para Sua obra.',
  'A eficácia do testemunho não depende da posição social ou da perfeição moral do testemunho, mas do poder da Palavra de Deus.',
  'Deus frequentemente usa as pessoas menos prováveis para levar o evangelho. O testemunho pessoal é uma das ferramentas mais poderosas do evangelismo.',
  ['Usar meu testemunho pessoal como ferramenta de evangelismo', 'Reconhecer que Deus pode usar qualquer pessoa para Sua glória'],
  ['Por que Deus usou uma mulher marginalizada como evangelista?', 'Que poder o testemunho pessoal tem sobre argumentos academicos?'],
  ['At 1:8', 'Mc 5:19-20', 'Rm 10:14-17']);

// ═══════ CAPITULO 5 ═══════
addVS(5, 8,
  'Levanta-te, toma o teu leito e anda — a autoridade de Cristo sobre a doença',
  'A cura do enfermo na piscina de Betesda, paralitico ha 38 anos, revela a autoridade de Jesus sobre o sofrimento humano. O mandamento \'levanta-te\' é imperativo e imediato.',
  'O terceiro sinal joanino estabelece a autoridade de Cristo sobre a doenca cronica e a impotencia humana. A Piscina de Betesda (Casa da Misericórdia) era local de esperança frustrada.',
  'Cristo tem autoridade para curar o que parece incurável e restaurar o que parece perdido. Nenhuma situacao é tao longa ou grave para que Cristo nao possa agir.',
  ['Trazer as doenças crônicas e situações \'impossíveis\' para Cristo', 'Confiar na autoridade de Jesus mesmo quando a cura não vem no tempo esperado'],
  ['Por que Jesus curou apenas um homem entre muitos na piscina?', 'O que a cura ensina sobre a soberania de Deus no sofrimento?'],
  ['Mc 1:40-42', 'Lc 5:12-13', 'At 3:1-10']);

addVS(5, 14,
  'Vai, e nao peques mais — a ligação entre pecado e consequências',
  'Jesus conecta a cura com a exortação moral. Isso não significa que toda doença é causada por pecado, mas que a graça de Deus exige resposta moral.',
  'O versiculo revela que a cura de Cristo não é apenas física — é total. A transformação inclui a dimensão moral e espiritual.',
  'A graça de Deus que cura também chama à santidade. Receber a cura é receberrresponsabilidade de viver de forma diferente.',
  ['Reconhecer que a graça de Deus exige resposta moral', 'Viver de forma coerente com a transformação que Cristo operou'],
  ['O que a exortação \'não peques mais\' ensina sobre a graça?', 'Como equilibrar a graça com a exigência de santidade?'],
  ['Rm 6:1-2', '1 Jo 2:1-2', 'Tg 5:19-20']);

addVS(5, 17,
  'Meu Pai trabalha até agora, e eu trabalho — a igualdade com o Pai',
  'Jesus declara igualdade funcional com o Pai. A \'obra\' de Deus inclui sustentação do universo e redenção da humanidade, que continua no sabado.',
  'A declaração provoca os judeus porque implica que Jesus se iguala a Deus. Isso é um dos pontos de tensão cristológica centrais do Evangelho.',
  'Deus não descansa de manter a criação e redimir o povo. O trabalho de Deus pela salvação é continuo e não para no sabado.',
  ['Reconhecer que o trabalho de Deus pela salvação é continuo', 'Cooperar com a obra de Deus, mesmo em tempos de descanso'],
  ['O que a igualdade funcional com o Pai ensina sobre a divindade de Cristo?', 'Como o trabalho de Deus se manifesta mesmo quando \'descansamos\'?'],
  ['Jo 5:19', 'Jo 5:30', 'Jo 14:10-11']);

addVS(5, 19,
  'O Filho nada pode fazer por Si mesmo — a submissão do Filho ao Pai',
  'Jesus declara Sua dependência total do Pai. Isso não diminui Sua divindade — revela a relacao trinitaria de submissão funcional dentro da unidade divina.',
  'O versiculo estabelece o principio de que Jesus age em perfeita harmonia com a vontade do Pai. Isso é modelo para o discipulado.',
  'A obediência perfeita de Cristo ao Pai é modelo para os crentes. Agir em conformidade com a vontade de Deus é o segredo da vida cristã eficaz.',
  ['Buscar a vontade de Deus em todas as decisões', 'Aprender a submeter os proprios desejos à vontade do Pai'],
  ['Como a submissão de Cristo ao Pai se reconcilia com Sua divindade?', 'Que modelo isso apresenta para a vida cristã?'],
  ['Jo 5:30', 'Jo 8:28-29', 'Fp 2:5-8']);

addVS(5, 24,
  'Quem ouve a minha palavra e crê naquele que me enviou tem a vida eterna — justificação pela fé',
  'A vida eterna é presente (tem), nao apenas futura. A fé em Cristo produce justificação imediata e certeza de salvacao.',
  'O versiculo condensa o evangelho: ouvir, crer e receber. A sequencia revela o processo de salvação — revelação, fé e posse da vida eterna.',
  'A justificação pela fé é um presente que o crente possui agora. Isso elimina a incerteza e o medo da condenação.',
  ['Viver na certeza da justificação pela fé', 'Compartilhar a certeza da salvacao com quem vive sob medo'],
  ['O que significa \'ter a vida eterna\' agora e não apenas no futuro?', 'Como a justificação pela fé elimina o medo da condenação?'],
  ['Rm 5:1', 'Rm 8:1', 'Ef 2:8-9', '1 Jo 5:11-13']);

addVS(5, 39,
  'Voces pesquisam as Escrituras porque julgam ter nelas a vida eterna — o estudo sem Cristo',
  'Jesus critica o estudo das Escrituras que não leva a Cristo. As Escrituras testemunham Dele, mas os estudiosos as usam para ganhar vida propria.',
  'O versiculo revela o paradoxo da religiosidade: estudar a Palavra de Deus sem reconhecer aquele de quem ela fala.',
  'As Escrituras têm o proposito de levar a Cristo. Estuda-las sem chegar a Ele é como olhar para o mapa sem chegar ao destino.',
  ['Estudar as Escrituras com o proposito de conhecer a Cristo, nao apenas informacao', 'Permitir que a Palavra aponte para Cristo em cada pagina'],
  ['Como o estudo das Escrituras pode se tornar estéril sem Cristo?', 'Que papel as Escrituras desempenham em levar as pessoas a Cristo?'],
  ['Jo 5:46', 'Lc 24:27', 'Lc 24:44', '2 Tm 3:15-17']);

// ═══════ CAPITULO 6 ═══════
addVS(6, 35,
  'Eu sou o pao da vida — a declaração Eu Sou的第一',
  'A primeira das sete declarações \'Eu sou\' em Joao. Cristo se declara a fonte unica de saciedade espiritual e vida eterna, cumprindo o simbolico do maná do deserto.',
  'O discurso do Pao da Vida é um dos mais longos de Jesus em Joao. A declaração \'Eu sou\' conecta Cristo com o nome divino de Êxodo 3:14.',
  'Cristo é o alimento espiritual que satisfaz a fome da alma. Assim como o maná sustentou Israel no deserto, Cristo sustenta os crentes na jornada da fé.',
  ['Buscar em Cristo a saciedade que o mundo nao pode dar', 'Entender que a fé em Cristo é o sustento diario da vida espiritual'],
  ['O que a imagem de \'pao\' ensina sobre Cristo?', 'Como a fé diária em Cristo se sustenta como o maná sustentou Israel?'],
  ['Êxodo 16:14-35', 'Jo 6:48-51', '1 Co 11:23-26']);

addVS(6, 63,
  'O Espirito é quem dá vida — a letra mata, o Espirito vivifica',
  'Jesus afirma que a vida espiritual depende do Espirito Santo, nao da compreensão intelectual ou da obediência literal. A carne (natureza humana) não aproveita nada.',
  'O versiculo antecipa o contraste entre a letra (Lei) e o Espirito (graça), desenvolvido por Paulo em 2 Co 3:6.',
  'A vida espiritual é obra do Espirito Santo, nao de esforço humano. A Palavra de Deus só ganha vida quando o Espirito a aplica ao coracao.',
  ['Depender do Espirito Santo para dar vida às Escrituras', 'Evitar o literalismo que mata em vez de vivificar'],
  ['Como o Espirito Santo transforma a letra morta em Palavra viva?', 'Que papel a iluminação do Espirito desempenha no estudo bíblico?'],
  ['2 Co 3:6', 'Rm 7:6', 'Jo 16:13-14', '1 Co 2:10-14']);

addVS(6, 68,
  'Para quem iremos tu tens palavras de vida eterna — a confissão de Pedro',
  'Pedro faz a confissão de fé mais profunda do Evangelho de Joao: \'Senhor, para quem iremos? Tu tens palavras de vida eterna\'.',
  'A confissão de Pedro é o climax do capitulo 6, quando muitos discipulos abandonam Jesus. Pedro reconhece que não há alternativa a Cristo.',
  'A fé madura reconhece que Cristo é a unica opcao real. Quando todas as alternativas falham, Cristo permanece como a unica fonte de vida.',
  ['Reconhecer que Cristo é a unica opcao real na vida', 'Afirmar a fé mesmo quando outros abandonam'],
  ['Por que a confissão de Pedro é o climax do capitulo 6?', 'O que Pedro reconhece que os outros não viram?'],
  ['Mt 16:16', 'Jo 6:67-69', 'Jo 21:15-17']);

// ═══════ CAPITULO 7 ═══════
addVS(7, 37,
  'Se alguém tem sede, venha a mim e beba — rios de agua viva',
  'Na festa dos Tabernaculos, Jesus se declara a fonte de agua viva. A agua simboliza o Espirito Santo que seria derramado após a exaltação de Cristo.',
  'A declaração é o climax da festa dos Tabernaculos, quando os sacerdotes derramavam agua no altar. Jesus diz que Ele é a verdadeira fonte.',
  'A sede espiritual só é satisfeita por Cristo. A promessa do Espirito é para quem tem sede — os que reconhecem sua necessidade.',
  ['Ter sede espiritual e vir a Cristo com essa sede', 'Receber a abundancia do Espirito Santo que Cristo promete'],
  ['O que a festa dos Tabernaculos ensina sobre Cristo?', 'Como a promessa do Espirito se cumpre na vida cristã?'],
  ['Is 44:3', 'Is 55:1', 'Jo 4:13-14', 'Jo 14:16-17']);

// ═══════ CAPITULO 8 ═══════
addVS(8, 12,
  'Eu sou a luz do mundo — declaração Eu Sou',
  'A segunda declaração \'Eu sou\'. Cristo é a luz que ilumina as trevas do mundo. Isso conecta-se com o prologo (1:4-5) e antecipa a crucificação (19:37).',
  'A declaração é feita no templo durante a festa dos Tabernaculos, quando gigantes velas iluminavam o pátio. Jesus diz que Ele é a verdadeira luz.',
  'Cristo é a luz que guia, revela e salva. Sem Ele, a humanidade caminha em trevas. Isso fundamenta a exclusividade cristã como verdadeira revelação.',
  ['Caminhar na luz de Cristo, rejeitando as trevas do pecado', 'Ser refletor da luz de Cristo no mundo'],
  ['O que a imagem de \'luz\' ensina sobre a missão de Cristo?', 'Como podemos ser \'luz do mundo\' como Jesus ensinou?'],
  ['Jo 1:4-5', 'Jo 9:5', 'Jo 12:35-36', 'Mt 5:14-16']);

addVS(8, 32,
  'Conhecereis a verdade, e a verdade vos libertará — a liberdade pela verdade',
  'A verdade de Cristo liberta do pecado, da ignorancia e da opressão. Isso não é apenas conhecimento intelectual, mas transformação existencial.',
  'A declaração é feita no contexto da discussão sobre a liberdade espiritual. Os judeus pensavam ser livres por serem descendentes de Abraão.',
  'A verdade de Cristo é libertadora em todos os niveis: espiritual (do pecado), intelectual (da ignorancia), social (da opressão) e existencial (do sentido).',
  ['Buscar a verdade de Cristo como caminho para a liberdade', 'Viver na liberdade que a verdade de Cristo proporciona'],
  ['Que tipo de liberdade a verdade de Cristo oferece?', 'Como o conhecimento da verdade transforma a vida prática?'],
  ['Jo 8:36', 'Jo 14:6', 'Gl 5:1', '2 Co 3:17']);

addVS(8, 58,
  'Antes que Abraão existisse, Eu Sou — declaração de eternidade',
  'A declaração mais direta de divindade no Evangelho de Joao. \'Eu sou\' (egō eimi) é o nome divino de Êxodo 3:14. Os judeus entenderam e tentaram apedrejá-Lo por blasfêmia.',
  'A declaração culmina o debate sobre a identidade de Cristo. Os judeus entenderam que Jesus estava afirmando ser Deus, por isso reagiram com violência.',
  'Cristo é eterno — nao comecou a existir com Abraão. Isso fundamenta a plena divindade de Cristo e a verdade da Trindade.',
  ['Adorar a Cristo como o \'Eu Sou\' eterno, nao apenas como profeta', 'Reconhecer que a declaração de divindade é o nucleo da fé cristã'],
  ['Por que os judeus entenderam que Jesus estava afirmando ser Deus?', 'Que implicacoes a eternidade de Cristo tem para a nossa fé?'],
  ['Êxodo 3:14', 'Jo 1:1', 'Jo 10:30', 'Cl 1:17', 'Hb 13:8']);

// ═══════ CAPITULO 9 ═══════
addVS(9, 3,
  'Nem ele pecou, nem seus pais — refutando a teologia da retribuição',
  'Jesus refuta a visão dominante de que a doença era consequencia de pecado pessoal. Isso quebra o paradigma da teologia da retribuição do judaismo antigo.',
  'A cura do cego de nascença é o sexto sinal joanino e revela a cegueira espiritual dos lideres religiosos.',
  'O sofrimento nao é necessariamente consequencia de pecado pessoal. Deus pode usar o sofrimento para revelar Sua glória.',
  ['Não julgar os sofrentes assumindo que são pecadores', 'Buscar o proposito de Deus mesmo no sofrimento'],
  ['Por que Jesus afirma que o sofrimento não é causado por pecado pessoal?', 'Como o sofrimento pode revelar a glória de Deus?'],
  ['Lc 13:1-5', 'Jó 1:1-22', '2 Co 4:16-18']);

addVS(9, 25,
  'Uma coisa sei: que era cego e agora enxergo — o testemunho da transformação',
  'O cego curado dá o testemunho mais simples e poderoso do Evangelho: \'Uma coisa sei\'. A experiencia pessoal de transformação é indiscutível.',
  'O testemunho do cego é progressivo: de \'um homem chamado Jesus\' (v. 11) para \'profeta\' (v. 17) para \'de Deus\' (v. 33) para Senhor (v. 38).',
  'O testemunho mais eficaz é o da experiencia pessoal. Ninguém pode discutir com o que a pessoa viveu. A transformação fala por si.',
  ['Compartilhar o que Cristo fez na minha vida com simplicidade', 'Reconhecer que a experiencia pessoal é argumento poderoso'],
  ['Como o testemunho do cego amadurece ao longo do dialogo?', 'Por que a experiencia pessoal de transformação é mais persuasiva que argumentos?'],
  ['Mt 12:24', 'Mc 5:19-20', 'At 4:19-20']);

// ═══════ CAPITULO 10 ═══════
addVS(10, 11,
  'Eu sou o bom pastor — declaração Eu Sou do Bom Pastor',
  'A terceira declaração \'Eu sou\'. Jesus se compara ao pastor que cuida das ovelhas, contrapondo-se aos falsos pastores de Israel (Ez 34).',
  'O discurso do Bom Pastor é uma das mais belas imagens de Cristo no Evangelho. Ele conhece as ovelhas, guia-as e dá a vida por elas.',
  'Cristo é o pastor que conhece, guia e protege Seu rebanho. Ele nao é mercenario que foge do perigo — é o pastor que morre pelas ovelhas.',
  ['Confiar no Bom Pastor que conhece e guia Sua vida', 'Reconhecer que Cristo dá a vida por nós, nao apenas nos dirige'],
  ['O que as imagens de pastor e ovelhas ensinam sobre a relação de Cristo com Seu povo?', 'Como Cristo se diferencia dos \'falsos pastores\'?'],
  ['Ez 34:11-16', 'Sl 23:1-6', '1 Pe 5:2-4']);

addVS(10, 18,
  'Ninguém me tira a vida — Eu a dou voluntariamente — soberania na cruz',
  'Jesus afirma que Sua morte é voluntaria e soberana. Ninguém O obriga — Ele escolhe dar a vida. Isso revela o character divino de Sua paixão.',
  'A declaração é teologicamente crucial: a morte de Cristo não é tragédia, mas sacrificio voluntario. Isso fundamenta o valor redentor da cruz.',
  'A cruz de Cristo é ato de soberania e amor, nao de vitimismo. Ele escolhe morrer — isso transforma completamente o significado da paixão.',
  ['Reconhecer que a morte de Cristo é sacrificio voluntario, nao tragédia', 'Adorar a Cristo pela Sua soberania e amor na cruz'],
  ['Como a morte voluntaria de Cristo difere de um martírio qualquer?', 'Que implicacoes a soberania de Cristo na cruz tem para a nossa salvação?'],
  ['Is 53:4-7', 'Fp 2:5-8', '1 Pe 2:24', 'Hb 9:14']);

addVS(10, 28,
  'Ninguém vos arrancará da minha mão — segurança eterna',
  'A promessa de segurança eterna para as ovelhas de Cristo. Nenhuma força pode arrancar o crente da mão de Cristo.',
  'A declaração é uma das mais consoladoras do Evangelho: a segurança da salvação depende da mão de Cristo, nao da nossa firmeza.',
  'A segurança da salvação é baseada no poder de Cristo, nao na perfeição do crente. Isso é alivio para quem luta com dúvidas e fracassos.',
  ['Viver na certeza da segurança eterna em Cristo', 'Confiar que a mão de Cristo é mais forte que nossas fraquezas'],
  ['O que a segurança eterna significa para a vida cristã?', 'Como a segurança pela mão de Cristo difere da segurança pelas nossas obras?'],
  ['Jo 6:37-40', 'Rm 8:35-39', 'Fp 1:6']);

// ═══════ CAPITULO 11 ═══════
addVS(11, 25,
  'Eu sou a ressurreição e a vida — declaração Eu Sou da ressurreição',
  'A quinta declaração \'Eu sou\'. Cristo não apenas ressuscita mortos — Ele é a própria ressurreição. A vida eterna é Nele mesmo, não apenas um dom que Ele distribui.',
  'A declaração é feita diante do túmulo de Lázaro, o maior sinal joanino antes da paixão. Isso antecipa a própria ressurreição de Cristo.',
  'Cristo é a fonte da vida eterna. A ressurreição não é apenas um evento futuro — é uma realidade presente em Cristo. Quem Nele cre já tem a vida eterna.',
  ['Confiar em Cristo como a fonte da vida eterna, mesmo diante da morte', 'Viver com a certeza de que a morte não é o fim para quem está em Cristo'],
  ['O que significa Jesus ser \'a ressurreição e a vida\'?', 'Como essa declaração prepara os discipulos para a Sua própria ressurreição?'],
  ['Jo 14:6', 'Jo 6:39-40', '1 Co 15:55-57', 'Rm 6:5-11']);

addVS(11, 35,
  'Jesus chorou — a humanidade compassionaria de Cristo',
  'O versiculo mais curto da Bíblia, mas um dos mais profundos. O Verbo que criou o universo chora diante da morte de um amigo.',
  'O choro de Jesus revela Sua humanidade genuína. Ele não é um deus distante — Ele compartilha nossas dores e tristezas.',
  'A compassão de Cristo é real e emocional. Ele não apenas entende intelectualmente nosso sofrimento — Ele o sente profundamente.',
  ['Reconhecer que Cristo sente nossas dores e chora connosco', 'Ter permissão para chorar e expressar tristeza diante da morte'],
  ['Por que Jesus chorou se sabia que ia ressuscitar Lázaro?', 'O que o choro de Jesus ensina sobre a compaixão de Deus?'],
  ['Hb 4:15', 'Sl 56:8', 'Is 53:3', 'Rm 12:15']);

// ═══════ CAPITULO 12 ═══════
addVS(12, 24,
  'Se o grão de trigo, caindo na terra, não morrer, fica só; mas, se morrer, produz muito fruto — o paradoxo da cruz',
  'A imagem do grão de trigo que morre para produzir fruto é uma das mais poderosas sobre o significado da cruz e da missão cristã.',
  'Jesus antecipa Sua morte e a frutificação que dela advém. A cruz não é derrota — é semeadura que produz colheita abundante.',
  'A morte para si mesmo é a condição para a vida abundante em Cristo. O discipulado exige morrer ao ego para viver para Deus e para os outros.',
  ['Abraçar o paradoxo da cruz: morrer para viver', 'Reconhecer que o sacrifício produz fruto abundante'],
  ['Como o \'morrer para si mesmo\' se aplica na vida cristã?', 'Que fruto vem do sacrifício e da obediência a Cristo?'],
  ['Jo 15:4-5', 'Gl 2:20', 'Fp 3:10-11', 'Rm 6:5-8']);

// ═══════ CAPITULO 13 ═══════
addVS(13, 14,
  'Se eu, o Senhor e o Mestre, lavei os vossos pés, também deveis lavar uns os outros — o exemplo do servico',
  'A lavagem dos pés é o exemplo mais radical de humildade e servico no Evangelho. Jesus, sendo Deus, toma a posição do mais baixo servo.',
  'A lavagem dos pés precede a ceia e é um ato simbólico de purificação e humildade. Jesus estabelece o padrao de liderança por servico.',
  'A liderança cristã é servico, nao domínio. Jesus demonstra que o verdadeiro poder se manifesta na humildade e no cuidado com os outros.',
  ['Servir aos outros com humildade, seguindo o exemplo de Jesus', 'Liderar por servico, nao por autoridade ou poder'],
  ['O que a lavagem dos pés ensina sobre a natureza da liderança cristã?', 'Como podemos praticar a humildade de Cristo no dia a dia?'],
  ['Mt 20:26-28', 'Lc 22:24-27', 'Fp 2:5-8', '1 Pe 5:2-3']);

addVS(13, 34,
  'Um mandamento novo vos dou: que vos ameis uns aos outros — o mandamento do amor',
  'O mandamento do amor fraternal é \'novo\' não no conteúdo (já existia no AT), mas na norma: \'como eu vos amei\'. O amor cristão é baseado no amor sacrificial de Cristo.',
  'O mandamento do amor é o nucleo da ética cristã em Joao. Isso antecipa os discursos da videira (cap. 15) e a oração sacerdotal (cap. 17).',
  'O amor cristão se define pelo amor de Cristo: sacrificial, incondicional, servicial. Isso vai além do amor natural e requer a obra do Espirito Santo.',
  ['Amar os outros como Cristo nos amou — sacrificial e incondicional', 'Cultivar o amor fraternal como marca da igreja'],
  ['O que o \'novo\' do mandamento do amor significa?', 'Como o amor de Cristo se torna norma para o amor cristão?'],
  ['Jo 15:12-13', '1 Jo 3:16-18', '1 Jo 4:7-12', 'Rm 13:8-10']);

// ═══════ CAPITULO 14 ═══════
addVS(14, 1,
  'Não se turbe o vosso coração — confianca em meio à tribulação',
  'A primeira palavra do discurso da despedida: não se turbe. Jesus antecipa a tristeza dos discipulos e oferece consolo e direção.',
  'O discurso do Cenáculo (caps. 14-16) é o coração pastoral do Evangelho de Joao. Jesus prepara Seus discipulos para Sua partida.',
  'A turbação do coracao é humana, mas a resposta de Cristo é consolo e verdade. A fé não elimina a tristeza, mas a sustenta.',
  ['Trazer as turbulações do coraque a Cristo em oração', 'Lembrar das promessas de Cristo em tempos de angustia'],
  ['Como Jesus responde à tristeza dos discipulos?', 'Que consolo existe na promessa \'não se turbe o vosso coração\'?'],
  ['Jo 14:27', 'Fp 4:6-7', '1 Pe 5:7', 'Is 41:10']);

addVS(14, 6,
  'Eu sou o caminho, a verdade e a vida — a exclusividade de Cristo',
  'A declaração mais famosa sobre a exclusividade de Cristo. Ele não é um caminho entre muitos — é O caminho, A verdade e A vida.',
  'A declaração é a resposta à pergunta de Tomé: \'Senhor, não sabemos para onde vais; como podemos saber o caminho?\'',
  'Cristo é a unica via de acesso a Deus. Isso é humilhante para o orgulho humano, mas libertador para quem abraça a verdade.',
  ['Aceitar a exclusividade de Cristo como único caminho a Deus', 'Viver de acordo com a verdade que Cristo revela'],
  ['O que as três declarações (caminho, verdade, vida) ensinam sobre Cristo?', 'Como a exclusividade de Cristo desafia o relativismo contemporaneo?'],
  ['Jo 10:9', 'Jo 11:25', '1 Tm 2:5', 'At 4:12']);

addVS(14, 16,
  'Eu pedirei ao Pai e Ele vos dará outro Consolador — a promessa do Espirito Santo',
  'A primeira promessa do Espirito Santo como Paracleto (Consolador/Advogado). O \'outro\' Consolador é da mesma natureza de Cristo — o Espirito Santo continua a obra de Jesus.',
  'A promessa do Espirito é central no discurso da despedida. Jesus garante que a Sua partida não é abandono — é substituição por uma presença ainda mais íntima.',
  'O Espirito Santo é a presença contínua de Cristo na igreja. Ele ensina, recorda, convence e guia. Isso fundamenta a vida espiritual da comunidade cristã.',
  ['Receber a promessa do Espirito Santo com fé', 'Ser sensivel à presença e aos ensinamentos do Espirito Santo'],
  ['O que o Espirito Santo faz como Consolador?', 'Como a promessa do Espirito consola os discipulos da partida de Jesus?'],
  ['Jo 14:26', 'Jo 15:26', 'Jo 16:7-15', 'At 1:4-5', 'At 2:1-4']);

addVS(14, 27,
  'Deixo-vos a paz, a minha paz vos dou — a paz sobrenatural de Cristo',
  'A paz de Cristo (eirēnē) é diferente da paz do mundo: não depende de circunstancias, mas da presença interior de Cristo.',
  'A declaração contrasta a paz de Cristo com a paz do mundo. A paz do mundo é ausência de conflito; a paz de Cristo é presença de Deus no meio do conflito.',
  'A paz de Cristo é um presente que sustenta em meio às tempestades. Isso não é otimismo superficial, mas confiança profunda no character de Deus.',
  ['Receber a paz de Cristo como presente que sustenta em tempos difíceis', 'Não buscar a paz no mundo, mas em Cristo'],
  ['Como a paz de Cristo difere da paz do mundo?', 'O que significa experimentar a paz de Cristo no meio das dificuldades?'],
  ['Jo 16:33', 'Rm 5:1', 'Fp 4:6-7', 'Is 26:3']);

// ═══════ CAPITULO 15 ═══════
addVS(15, 5,
  'Eu sou a videira, vós os sarços — declaração Eu Sou da videira',
  'A sétima declaração \'Eu sou\' em Joao. A videira é imagem de Israel no AT (Is 5:1-7); Jesus se declara a verdadeira videira que produz fruto abundante.',
  'O discurso da videira é o ensinamento mais profundo sobre a vida cristã: permanecer em Cristo é a condição para produzir fruto.',
  'A vida cristã é dependencia total de Cristo. Sem Ele, nada podemos fazer. O fruto não vem de esforço proprio, mas da comunhão vital com Cristo.',
  ['Permanecer em Cristo como sarço na videira', 'Reconhecer que o fruto espiritual vem da comunhão com Cristo, nao do esforço humano'],
  ['O que significa \'permanecer em Cristo\' na vida prática?', 'Como o fruto espiritual se manifesta quando permanecemos na videira?'],
  ['Jo 15:4-5', 'Gl 5:22-25', 'Mt 7:16-20', 'Sl 1:1-3']);

addVS(15, 12,
  'Este é o meu mandamento: que vos ameis uns aos outros, como eu vos amei — o amor como marca da discipulagem',
  'O mandamento do amor é repetido e aprofundado: \'como eu vos amei\'. O padrão do amor cristão é o amor sacrificial de Cristo na cruz.',
  'O discurso da videira culmina no mandamento do amor. O fruto supremo da videira é o amor fraternal.',
  'O amor cristão é sacrificial, não sentimental. Ele se mede pelo que dá, não pelo que sente. Isso é o padrão ético supremo do discipulado.',
  ['Amar os outros com o amor sacrificial de Cristo', 'Medir o amor pelo que dou, nao pelo que sinto'],
  ['Como o amor de Cristo se torna padrão para o amor cristão?', 'Que fruto o amor sacrificial produz na comunidade?'],
  ['Jo 13:34-35', '1 Jo 3:16-18', '1 Jo 4:7-12', 'Rm 5:8']);

addVS(15, 16,
  'Não me escolhestes a mim, mas eu vos escolhi — a eleição divina na missão',
  'Jesus revela que a iniciativa da salvação é divina, não humana. Deus escolhe, o homem responde. Isso fundamenta a graça como fundamento da missão.',
  'A declaração é feita no contexto da missão: \'para que vos vades e deis fruto\'. A eleição tem proposito missionario.',
  'A eleição divina não é para privilegio, mas para servico. Deus escolhe para enviar. A salvação é proposito, não privilegio egoista.',
  ['Reconhecer que a salvação é graça divina, nao conquista humana', 'Usar a eleição como motivacao para a missão'],
  ['Como a iniciativa divina na salvação se relaciona com a responsabilidade humana?', 'O que a eleição para a missão ensina sobre o proposito da igreja?'],
  ['Ef 1:3-6', 'Ef 2:8-10', 'At 13:48', '1 Pe 2:9-10']);

// ═══════ CAPITULO 16 ═══════
addVS(16, 7,
  'É melhor para vós que eu vá — a vantagem da partida de Cristo',
  'Jesus diz que a Sua partida é \'melhor\' porque permite a vinda do Espirito Santo. O Espirito em nós é melhor que Jesus ao nosso lado fisicamente.',
  'A declaração paradoxal prepara os discipulos para a partida. O Consolador interno é mais íntimo que a presença fisica.',
  'A vida sob o Espirito Santo é mais rica que a vida com Jesus fisicamente. O Espirito habita interiormente, ensina e guia continuamente.',
  ['Receber a partida de Cristo como ganho, não perda', 'Valorizar a presença do Espirito Santo como continuação da obra de Cristo'],
  ['Por que a partida de Jesus é \'melhor\' para os discipulos?', 'Como a presença do Espirito Santo supera a presença fisica de Cristo?'],
  ['Jo 14:16-18', 'Jo 14:26', 'Jo 16:13-15', 'At 2:1-4']);

addVS(16, 13,
  'Quando vier o Espirito da verdade, Ele vos guará a toda a verdade — a guia do Espirito Santo',
  'O Espirito Santo é o guia infalível para a verdade. Ele não fala por Si mesmo, mas revela o que é de Cristo e do Pai.',
  'O versiculo fundamenta a iluminação do Espirito Santo no estudo das Escrituras e na vida cristã. O Espirito é o Commentador divino.',
  'A verdade não é conquista racional, mas revelação do Espirito. Isso não nega o estudo, mas o complementa com a iluminação divina.',
  ['Depender do Espirito Santo para compreender as Escrituras', 'Buscar a guia do Espirito nas decisões da vida'],
  ['Como o Espirito Santo guia à verdade?', 'Que papel a iluminação do Espirito desempenha no estudo bíblico?'],
  ['Jo 14:26', '1 Co 2:10-14', 'Ef 1:17-18', '1 Jo 2:27']);

// ═══════ CAPITULO 17 ═══════
addVS(17, 3,
  'Esta é a vida eterna: que te conheçam a ti, o único Deus verdadeiro, e a Jesus Cristo — conhecimento como vida eterna',
  'A vida eterna é definida como conhecimento relacional de Deus e de Cristo. Isso vai além do conhecimento intelectual — é comunhão pessoal.',
  'A oração sacerdotal é a mais longa oração registrada de Jesus. Ela revela o coração de Cristo para com Seu povo.',
  'A vida eterna começa agora, no conhecimento de Deus. Não é apenas vida futura, mas realidade presente que se aprofunda eternamente.',
  ['Buscar o conhecimento relacional de Deus como o bem supremo', 'Viver na certeza de que conhecer a Cristo é possuir a vida eterna'],
  ['O que o conhecimento de Deus significa em termos de relacionamento?', 'Como o conhecimento relacional se difere do conhecimento intelectual?'],
  ['Jo 14:6', 'Jo 10:38', '1 Jo 5:20', 'Ef 1:17', '2 Pe 1:2-3']);

addVS(17, 20,
  'Não rogo somente por estes, mas também por aqueles que hão de crer em mim — oração por todos os crentes',
  'A oração de Jesus se estende além dos discipulos presentes para todos os crentes futuros, incluindo nós. Isso é uma das maiores consolações do Evangelho.',
  'Jesus ora por todos os crentes de todos os tempos. Isso fundamenta a intercessão eterna de Cristo (Hb 7:25) e a segurança da igreja.',
  'A oração de Jesus por nós é garantia de que não estamos sozinhos. Ele intercede continuamente pelo Seu povo junto ao Pai.',
  ['Viver na certeza de que Jesus ora por nós continuamente', 'Interceder uns pelos outros, seguindo o exemplo de Cristo'],
  ['Como a oração de Jesus por todos os crentes nos consola?', 'Que segurança existe em saber que Cristo intercede por nós?'],
  ['Hb 7:25', 'Rm 8:34', '1 Jo 2:1', 'Rm 8:26-27']);

// ═══════ CAPITULO 18 ═══════
addVS(18, 6,
  'Quando Ele lhes disse \'Eu sou\', recuaram e caíram no chão — o poder do nome divino',
  'A declaração \'Eu sou\' no Getsêmani causa queda dos soldados. O poder do nome divino se manifesta mesmo na aparente fraqueza da paixão.',
  'O episodio revela que a captura de Jesus não foi força humana, mas consentimento divino. Jesus se entrega, nao é capturado.',
  'O poder de Cristo se manifesta mesmo no momento de maior aparente fraqueza. A cruz não é derrota — é vitória.',
  ['Reconhecer que a aparente fraqueza de Cristo esconde poder divino', 'Confiar que Deus age mesmo quando as circunstancias parecem contra nós'],
  ['Por que os soldados caíram quando Jesus disse \'Eu sou\'?', 'Como o poder de Cristo se manifesta na aparente fraqueza da cruz?'],
  ['Jo 10:18', 'Fp 2:5-11', 'Is 53:7', '1 Co 1:25']);

// ═══════ CAPITULO 19 ═══════
addVS(19, 30,
  'Está consumado — a redenção completa',
  'A sexta palavra da cruz: \'Consummatum est\' (Está consumado). A obra redentora está completa — nada falta. Isso não é derrota, mas vitória consumada.',
  'A declaração é o climax teológico da paixão. A salvação está completa — a obra de Cristo na cruz é suficiente e final.',
  'A redenção é obra completa de Cristo, não parcial. Nada pode ser adicionado ao que Ele fez na cruz. Isso fundamenta a certeza da salvação.',
  ['Receber a redenção como obra completa de Cristo', 'Não tentar complementar com obras o que Cristo já consumou'],
  ['O que \'está consumado\' significa para a nossa salvação?', 'Como a completeza da obra de Cristo afeta nossa vida cristã?'],
  ['Hb 9:12', 'Hb 10:10-14', 'Rm 5:9', '1 Jo 2:2']);

addVS(19, 34,
  'Um dos soldados abriu-lhe o lado com uma lança — a fonte de graça',
  'O sangue e a agua que brotam do lado de Cristo simbolizam a redenção (sangue) e a regeneração (agua). Isso cumpre as profecias do AT.',
  'O detalhe do soldado que abre o lado é historico e teológico. A fonte que brota é a igreja nascida da morte de Cristo.',
  'Do lado aberto de Cristo brotam os meios de graça: sangue (perdão) e agua (limpeza). Isso fundamenta os sacramentos e a vida espiritual.',
  ['Receber com reverencia os meios de graça que brotam do lado de Cristo', 'Reconhecer que a morte de Cristo produz vida para a igreja'],
  ['O que o sangue e a agua simbolizam?', 'Como as bênçãos que brotam do lado de Cristo se manifestam na vida da igreja?'],
  ['Zc 12:10', '1 Jo 5:6-8', 'Hb 9:14', '1 Pe 1:2']);

// ═══════ CAPITULO 20 ═══════
addVS(20, 16,
  'Jesus disse-lhe: Maria! Ela, voltando-se, disse-lhe: Rabbuni! — o poder do nome pessoal',
  'A ressurreição é revelada primeiro a Maria Madalena. O chamamento pelo nome (\'Maria\') produz reconhecimento imediato. Isso é o padrao da graça: Deus chama pelo nome.',
  'A primeira aparição de Jesus ressuscitado é a uma mulher — algo revolucionário no contexto do seculo I. O testemunho feminino é validado.',
  'Cristo chama pelo nome pessoalmente. A salvação não é massa, mas encontro pessoal. Assim como chamou Maria, Ele chama cada crente pelo nome.',
  ['Reconhecer que Cristo nos chama pelo nome, pessoalmente', 'Valorizar o encontro pessoal com Cristo ressuscitado'],
  ['Por que Jesus apareceu primeiro a Maria Madalena?', 'O que o chamamento pelo nome ensina sobre a relação de Cristo connosco?'],
  ['Sl 139:1-18', 'Is 43:1', 'Jo 10:3', 'Ap 2:17']);

addVS(20, 28,
  'Tomé respondeu e disse-lhe: Meu Senhor e meu Deus! — a confissão de fé suprema',
  'A confissão de fé mais forte do Evangelho: Tomé reconhece Jesus como Senhor e Deus. Isso é a culminacao da cristologia joanina.',
  'A confissão de Tomé é o climax do Evangelho. Todos os sinais, discursos e ensinamentos levam a esta declaração de divindade.',
  'A fé em Cristo culmina no reconhecimento de Sua plena divindade. Isso é o nucleo do cristianismo: Jesus é Senhor e Deus.',
  ['Confessar a divindade de Cristo como nucleo da fé', 'Permitir que a fé em Cristo Senhor e Deus transforme toda a vida'],
  ['O que a confissão de Tomé ensina sobre a identidade de Jesus?', 'Como a confissão de fé é o climax da experiência cristã?'],
  ['Jo 1:1', 'Jo 20:30-31', 'Fp 2:9-11', 'Rm 10:9-10']);

addVS(20, 29,
  'Porque me viste, Tomé, creste? Bem-aventurados os que não viram e creram — a fé sem ver',
  'Jesus abençoa a fé que não depende de evidencia visual. Isso é um paradoxo: a ressurreição é historica, mas a fé vai além do ver.',
  'O versiculo é uma benção para todos os crentes posteriores que não viram fisicamente a Cristo, mas creem.',
  'A fé genuína vai além da evidencia sensorial. A benção de Cristo é para quem crê sem ver — isso é fé madura e confiante.',
  ['Abençoar e cultivar a fé que não depende de ver fisicamente', 'Reconhecer que a fé sem ver é bençãode Cristo'],
  ['Por que a fé sem ver é mais benção do que a fé que vê?', 'Como cultivar uma fé que resista à falta de evidencia sensorial?'],
  ['Rm 8:24-25', '1 Pe 1:6-9', 'Hb 11:1', '2 Co 5:7']);

// ═══════ CAPITULO 21 ═══════
addVS(21, 15,
  'Apascenta os meus cordeiros — a restauração de Pedro',
  'A restauração de Pedro após a negação. Jesus pergunta três vezes \'Tu me amas?\', correspondendo às três negações. A restauração é completa e publica.',
  'A restauração de Pedro é um dos episodios mais bonitos do Evangelho. Jesus não rejeita o apóstolo fracassado — Ele o restaura e o comissiona.',
  'Deus restaura quem fracassou. A negação de Pedro não é o fim da história — a graça de Cristo é maior que o pecado.',
  ['Receber a restauração de Cristo mesmo após o fracasso', 'Comissionar outros para a missão, mesmo quando mostram fraqueza'],
  ['Como Jesus restaura Pedro de forma publica e gentil?', 'O que a restauração de Pedro ensina sobre a graça de Deus?'],
  ['Lc 22:54-62', 'Mt 26:69-75', 'Mc 16:7', '2 Co 5:18-20']);

addVS(21, 17,
  'Senhor, tu sabes todas as coisas — sabes que te amo — o conhecimento divino do coracao',
  'Pedro confessa que Jesus sabe tudo — inclusive o amor genuíno que existe mesmo em meio à negação. Isso ecoa Jo 2:25 (Jesus conhece o coracao).',
  'A terceira restauração de Pedro é a mais profunda: Jesus pergunta \'Tu me amas?\' e Pedro responde \'Tu sabes tudo\'.',
  'Deus conhece o coracao melhor do que nós mesmos. Mesmo quando duvidamos de nosso amor por Ele, Ele sabe o que ha no fundo do coraque.',
  ['Confiar que Deus conhece nosso amor mesmo quando duvidamos', 'Reconhecer que o conhecimento de Deus sobre nós é perfeito'],
  ['Como o conhecimento de Deus sobre nosso coraque nos consola?', 'O que a restauração de Pedro ensina sobre a graça de segunda chance?'],
  ['Jo 2:25', 'Sl 139:1-4', '1 Jo 3:19-20', '1 Co 4:3-5']);

addVS(21, 25,
  'Ha muitas outras coisas que Jesus fez — a incompletude da narrativa',
  'O Evangelho se encerra com a afirmação de que ha muitas coisas que Jesus fez que nao foram registradas. Isso incentiva o estudo continuo e a experiencia pessoal.',
  'O versiculo é uma despedida aberta: a historia de Cristo não terminou — continua na igreja e na vida dos crentes.',
  'A narrativa joanina é intencionalmente incompleta. Isso mantém Cristo como mistério infinito que sempre podemos descobrir mais.',
  ['Estudar continuamente a vida de Cristo, sabendo que ha sempre mais a descobrir', 'Viver como parte da historia continuada de Cristo no mundo'],
  ['Por que Joao encerra com a afirmação de que ha \'muitas outras coisas\'?', 'Como a incompletitude do Evangelho incentiva a busca continuada?'],
  ['Jo 20:30-31', 'At 1:1', 'Ef 3:18-19']);


export default registro;
export const v_jn = registro;