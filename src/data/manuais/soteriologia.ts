import { ManualBiblico } from '../manuaisBiblicos';

export const manualSoteriologia: ManualBiblico = {
  id: 'soteriologia',
  slug: 'soteriologia',
  titulo: 'Soteriologia',
  subtitulo: 'Doutrina da Salvação',
  autor: 'Comissão Teológica Sola Scriptura',
  descricao: 'Um estudo completo sobre o plano eterno de salvação de Deus, desde a eleição antes da fundação do mundo até a glorificação final do crente.',
  categorias: ['Salvação', 'Graça', 'Fé', 'Justificação', 'Santificação'],
  icone: 'Heart',
  cor: 'text-red-500',
  capitulos: [
    {
      numero: 1,
      titulo: 'A Origem do Plano de Salvação',
      resumo: 'O decreto eterno de Deus antes da fundação do mundo.',
      conteudo: `O plano de salvação não foi uma reação de Deus ao pecado humano, mas um decreto soberano e eterno estabelecido antes da fundação do mundo. A Escritura é clara ao afirmar que Cristo foi predeterminado antes que o mundo existesse (1 Pedro 1:20). Esta verdade fundamental estabelece que a salvação é inteiramente uma iniciação divina, não uma resposta humana.\n\nO Concílio de Paz, como é chamado na teologia reformada, refere-se ao eterno conselho de Deus pelo qual Ele decretou salvar um povo para Si mesmo, pela graça, através da mediação de Jesus Cristo. Este decreto inclui a eleição individual, a justificação pela fé, a regeneração pelo Espírito e a glorificação final.\n\nA soberania de Deus no plano de salvação é evidenciada em Efésios 1:4-5: "Ele nos elegeu nele antes da fundação do mundo, para sermos santos e irrepreensíveis diante dele. Em amor nos predestinou para sermos adotados filhos seus por meio de Jesus Cristo." A linguagem é inequívoca: a eleição precede a existência humana.\n\nEm Romanos 8:29-30, encontramos a cadeia da salvação: "os que de antemão conhecemos, também de antemão predestinamos... E os que predestinamos, também chamamos; e os que chamamos, também justificamos; e os que justificamos, também glorificamos." Esta cadeia inquebrável demonstra que a salvação é obra completa de Deus, do início ao fim.\n\nA importância prática desta doutrina é profunda. Quando compreendemos que a salvação é iniciativa de Deus, somos libertos da ansiedade quanto à nossa segurança eterna. Não fomos nós quem escolhemos a Deus, mas Ele quem nos escolheu (João 15:16). Esta verdade gera humildade, gratidão e adoração.`,
      versicosChave: [
        { referencia: 'Efésios 1:4-5', texto: 'Ele nos elegeu nele antes da fundação do mundo, para sermos santos e irrepreensíveis diante dele.', traducao: 'NVI' },
        { referencia: '1 Pedro 1:20', texto: 'Ele foi conhecido antes da fundação do mundo, mas se manifestou nos últimos tempos por amor de vós.', traducao: 'ARC' },
        { referencia: 'Romanos 8:29-30', texto: 'Os que de antemão conhecemos, também de antemão predestinamos... E os que justificamos, também glorificamos.', traducao: 'NVI' },
        { referencia: '2 Timóteo 1:9', texto: 'Ele nos salvou e nos chamou com uma santa vocação, não conforme às nossas obras, mas conforme ao seu próprio propósito e graça.', traducao: 'NVI' },
      ],
      perguntasEstudo: [
        'De que forma a eleição antes da fundação do mundo elimina o mérito humano na salvação?',
        'Como a cadeia da salvação em Romanos 8:29-30 nos dá segurança eterna?',
        'Qual a relação entre o decreto eterno de Deus e a responsabilidade humana na pregação?',
        'Como esta doutrina influencia nossa oração e nosso evangelismo?',
      ],
      citacoesTeologos: [
        { nome: 'João Calvino', periodo: 'Reforma (1509-1564)', citacao: 'A eleição de Deus é o eterno decreto pelo qual Ele determinou consigo mesmo o que faria com cada um dos homens.', obra: 'Institutos da Religião Cristã' },
        { nome: 'Charles Spurgeon', periodo: 'Pos-Reforma (1834-1892)', citacao: 'A doutrina da eleição é a mãe de todas as consolações. Se Deus me escolheu antes da fundação do mundo, nenhum demônio pode me arrancar de Suas mãos.', obra: 'Sermões' },
      ],
    },
    {
      numero: 2,
      titulo: 'A Necessidade do Homem',
      resumo: 'A condição pecaminosa que torna a salvação necessária.',
      conteudo: `A necessidade humana de salvação decorre do problema universal do pecado. Desde a queda de Adão, toda a raça humana está sujeita à maldição do pecado e à separação de Deus. A Bíblia descreve: "Não há justo, nem sequer um" (Romanos 3:10).\n\nO pecado não é meramente uma falha moral, mas uma condição existencial que afeta toda a pessoa — mente, vontade, emoções e corpo. A depravação total significa que cada aspecto da natureza humana foi corrompido.\n\nRomanos 1:18-32 descreve o processo de degradação: o homem, conhecendo Deus, rejeitou esse conhecimento e se voltou para a idolatria. Deus "os entregou" às consequências de seus próprios desejos.\n\nA gravidade do pecado se mede pela santidade de Deus. Contra Ti somente pequei (Salmo 51:4). A incapacidade humana para resolver o pecado é total. O homem é espiritualmente morto (Efésios 2:1), cegos (2 Coríntios 4:4) e incapaz de buscar a Deus (Romanos 3:11).`,
      versicosChave: [
        { referencia: 'Romanos 3:10', texto: 'Não há justo, nem sequer um.', traducao: 'NVI' },
        { referencia: 'Efésios 2:1-2', texto: 'Estando vós mortos em vossos pecados e transgressões.', traducao: 'ARC' },
        { referencia: 'Romanos 6:23', texto: 'O salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna.', traducao: 'NVI' },
      ],
      perguntasEstudo: [
        'Como a depravação total se diferencia do fatalismo?',
        'Por que a gravidade do pecado se mede pela santidade de Deus?',
        'De que forma a queda de Adão afeta toda a humanidade?',
      ],
      citacoesTeologos: [
        { nome: 'Agostinho de Hipona', periodo: 'Patrístico (354-430)', citacao: 'O homem não pode querer o bem espiritual sem a graça precedente, porque está morto em seus pecados.', obra: 'Confissões' },
        { nome: 'Martin Lutero', periodo: 'Reforma (1483-1546)', citacao: 'A vontade humana é cativa: se Deus reinar, obedecerá de bom grado; se Satanás, de má vontade.', obra: 'A Escravidão da Vontade' },
      ],
    },
    {
      numero: 3,
      titulo: 'A Obra de Cristo',
      resumo: 'Propiciação, expiação e redenção na cruz.',
      conteudo: `O coração da salvação é a obra vicária de Jesus Cristo na cruz. Através de Sua morte expiatória, Cristo resolveu o problema do pecado de forma completa e definitiva.\n\nA propiciação refere-se à satisfação da justiça divina pelo sacrifício de Cristo. O pecado exige satisfação porque Deus é justo e não pode ignorar a transgressão (1 João 2:2).\n\nA expiação implica "tirar o pecado de distância". Cristo removeu a barreira que separava Deus do homem (Isaías 53:5-6).\n\nA redenção implica pagamento de resgate para libertar o cativo. Cristo pagou o preço com Seu sangue (1 Pedro 1:18-19). A reconciliação descreve a restauração da relação quebrada (2 Coríntios 5:19).\n\nNa cruz, Jesus declarou "Está consumado" (João 19:30) — a obra redentora foi completada perfeita e definitivamente.`,
      versicosChave: [
        { referencia: '1 João 2:2', texto: 'Ele é a propiciação pelos nossos pecados, e não somente pelos nossos, mas também pelos de todo o mundo.', traducao: 'NVI' },
        { referencia: 'Isaías 53:5', texto: 'Ele foi ferido por nossas transgressões, e moído por nossas iniquidades.', traducao: 'NVI' },
        { referencia: 'Romanos 5:8', texto: 'Deus prova o seu amor por nós em que Cristo morreu por nós, sendo nós ainda pecadores.', traducao: 'NVI' },
        { referencia: '2 Coríntios 5:21', texto: 'Aquele que não conheceu pecado, por nós o fez pecado, para que nele fôssemos feitos justiça de Deus.', traducao: 'NVI' },
      ],
      perguntasEstudo: [
        'Qual a diferença entre propiciação e expiação?',
        'Como a cruz resolve justiça e misericórdia de Deus?',
        'O que significa que Cristo "se fez pecado" por nós?',
      ],
      citacoesTeologos: [
        { nome: 'Anselmo de Cantuária', periodo: 'Escolástica (1033-1109)', citacao: 'Deus não pode perdoar sem satisfação, porque seria indigno de Sua justiça.', obra: 'Cur Deus Homo' },
        { nome: 'John Stott', periodo: 'Contemporâneo (1921-2011)', citacao: 'A cruz é um sacrifício substitutivo que satisfaz a justiça de Deus e redime os pecadores.', obra: 'A Cruz de Cristo' },
      ],
    },
    {
      numero: 4,
      titulo: 'A Graça de Deus',
      resumo: 'A graça soberana como fundamento da salvação.',
      conteudo: `A graça de Deus é o favor imerecido concedido ao pecador culpado. "Pela graça sois salvos, por meio da fé; não vem de vós, é dom de Deus" (Efésios 2:8).\n\nA graça preveniente precede a conversão, capacitando o pecador morto a responder ao evangelho. A graça regeneradora produz nova vida espiritual (Tito 3:5). A graça santificadora transforma o caráter ao longo da vida cristã. A graça perseverante sustenta o crente até o fim (Filipenses 1:6).\n\nO "sola gratia" (somente pela graça) foi central na Reforma Protestante, insistindo na suficiência da graça contra os sistemas de obras.`,
      versicosChave: [
        { referencia: 'Efésios 2:8-9', texto: 'Pela graça sois salvos, por meio da fé; é dom de Deus, não vem das obras.', traducao: 'NVI' },
        { referencia: 'Tito 3:5', texto: 'Ele nos salvou pela lavagem da regeneração e pela renovação do Espírito Santo.', traducao: 'NVI' },
      ],
      perguntasEstudo: [
        'Qual a diferença entre graça preveniente e regeneradora?',
        'Como a graça é compatível com a responsabilidade humana?',
        'De que forma o "sola gratia" distingue o cristianismo bíblico?',
      ],
      citacoesTeologos: [
        { nome: 'Agostinho de Hipona', periodo: 'Patrístico (354-430)', citacao: 'Quando Deus coroa nossos méritos, Ele coroa seus próprios dons.', obra: 'Confissões' },
        { nome: 'John Piper', periodo: 'Contemporâneo (1946-)', citacao: 'A graça não é apenas a causa da salvação, mas também o objetivo.', obra: 'Desejando Deus' },
      ],
    },
    {
      numero: 5,
      titulo: 'Fé e Arrependimento',
      resumo: 'Os meios instrumentais da salvação.',
      conteudo: `Fé e arrependimento são os meios instrumentais pelos quais o pecador recebe a salvação. A fé bíblica tem três elementos: conhecimento, aprovação e confiança (fiducia) em Cristo.\n\nO arrependimento é a mudança de mente que resulta em mudança de direção — inclui conhecimento do pecado, tristeza, confissão e forsaka.\n\nArrependimento e fé são faces da mesma moeda: a fé se volta para Cristo; o arrependimento se volta do pecado. Não se pode ter um sem o outro.`,
      versicosChave: [
        { referencia: 'Efésios 2:8', texto: 'Pela graça sois salvos, por meio da fé.', traducao: 'NVI' },
        { referencia: 'Atos 3:19', texto: 'Arrependei-vos e convertei-vos, para que os pecados sejam apagados.', traducao: 'ARC' },
        { referencia: 'Hebreus 11:6', texto: 'Sem fé é impossível agradar a Deus.', traducao: 'NVI' },
      ],
      perguntasEstudo: [
        'Quais os três elementos da fé bíblica?',
        'Como o arrependimento se diferencia da culpa?',
        'A fé é dom de Deus ou decisão humana?',
      ],
      citacoesTeologos: [
        { nome: 'Martin Lutero', periodo: 'Reforma (1483-1546)', citacao: 'A fé é a mão que recebe o dom da salvação.', obra: 'Comentário aos Gálatas' },
        { nome: 'Jonathan Edwards', periodo: 'Pós-Reforma (1703-1758)', citacao: 'A fé genuína sempre produz santidade.', obra: 'O Fiel Consentidor' },
      ],
    },
    {
      numero: 6,
      titulo: 'Justificação',
      resumo: 'A declaração legal de justiça diante de Deus.',
      conteudo: `A justificação é o ato forense pelo qual Deus declara o pecador justo com base na justiça de Cristo. Inclui remissão de pecados e imputação da justiça de Cristo.\n\nA base é a obra de Cristo, não as obras do crente. "O homem é justificado pela fé, sem as obras da lei" (Romanos 3:28). A justificação é completa e definitiva — não é processo, mas decreto instantâneo.\n\nA Reforma Protestante restaurou esta doutrina essencial contra os sistemas de obras medieval.`,
      versicosChave: [
        { referencia: 'Romanos 3:24', texto: 'Justificados gratuitamente pela sua graça, pela redenção em Cristo Jesus.', traducao: 'ARC' },
        { referencia: 'Romanos 5:1', texto: 'Justificados pela fé, temos paz com Deus.', traducao: 'NVI' },
        { referencia: 'Gálatas 2:16', texto: 'O homem não é justificado por obras da lei, mas pela fé em Cristo.', traducao: 'ARC' },
      ],
      perguntasEstudo: [
        'Qual a diferença entre justificação e santificação?',
        'Como a imputação da justiça resolve o pecado?',
        'Por que a justificação pela fé não promove a imoralidade?',
      ],
      citacoesTeologos: [
        { nome: 'Martin Lutero', periodo: 'Reforma (1483-1546)', citacao: 'A justificação é o artigo pelo qual a igreja permanece ou cai.', obra: 'Sobre a Escravidão da Vontade' },
        { nome: 'John Calvin', periodo: 'Reforma (1509-1564)', citacao: 'A justificação pela fé é o principal pilar de toda a religião cristã.', obra: 'Institutos da Religião Cristã' },
      ],
    },
    {
      numero: 7,
      titulo: 'Regeneração',
      resumo: 'O novo nascimento pelo Espírito Santo.',
      conteudo: `A regeneração é a obra soberana do Espírito Santo pela qual Ele dá vida espiritual ao pecador morto. "Aquele que não nascer de novo não pode ver o reino de Deus" (João 3:3).\n\nÉ monergística — obra exclusiva de Deus. A fé não causa a regeneração; a regeneração causa a fé. Produz mudanças radicais: nova criação (2 Coríntios 5:17). É um evento, não um processo.`,
      versicosChave: [
        { referencia: 'João 3:3', texto: 'Aquele que não nascer de novo não pode ver o reino de Deus.', traducao: 'NVI' },
        { referencia: '2 Coríntios 5:17', texto: 'Se alguém está em Cristo, é nova criação.', traducao: 'NVI' },
        { referencia: 'Tito 3:5', texto: 'Salvos pela lavagem da regeneração e renovação do Espírito Santo.', traducao: 'NVI' },
      ],
      perguntasEstudo: [
        'Por que a regeneração é necessária?',
        'Como a regeneração se relaciona com a fé?',
        'A regeneração é reversível?',
      ],
      citacoesTeologos: [
        { nome: 'João Calvino', periodo: 'Reforma (1509-1564)', citacao: 'A regeneração é a renovação da natureza humana pela qual Deus nos restaura da morte para a vida.', obra: 'Institutos da Religião Cristã' },
        { nome: 'Charles Spurgeon', periodo: 'Pos-Reforma (1834-1892)', citacao: 'O homem natural pode reformar sua vida, mas não pode regenerar sua natureza.', obra: 'Sermões de Manhã' },
      ],
    },
    {
      numero: 8,
      titulo: 'Santificação',
      resumo: 'O processo de conformidade à imagem de Cristo.',
      conteudo: `A santificação é o processo pelo qual o crente é transformado progressivamente à imagem de Cristo. Tem dimensão negativa (mortificação do pecado) e positiva (frutos do Espírito).\n\nÉ obra do Espírito, mas requer cooperação humana. O principal instrumental é a Palavra de Deus: "Santifica-os pela tua verdade" (João 17:17).`,
      versicosChave: [
        { referencia: '1 Tessalonicenses 4:3', texto: 'Essa é a vontade de Deus, a vossa santificação.', traducao: 'NVI' },
        { referencia: 'João 17:17', texto: 'Santifica-os pela tua verdade; a tua palavra é a verdade.', traducao: 'NVI' },
        { referencia: 'Gálatas 5:22-23', texto: 'O fruto do Espírito é: amor, gozo, paz, longanimidade.', traducao: 'NVI' },
      ],
      perguntasEstudo: [
        'Qual a relação entre justificação e santificação?',
        'Como cooperar com o Espírito sem cair no legalismo?',
      ],
      citacoesTeologos: [
        { nome: 'John Wesley', periodo: 'Pos-Reforma (1703-1791)', citacao: 'A santificação é a obra do Espírito pela qual os afetos dos crentes são purificados.', obra: 'Sermões' },
        { nome: 'Jonathan Edwards', periodo: 'Pós-Reforma (1703-1758)', citacao: 'A santidade é a beleza suprema do caráter divino.', obra: 'A Religião do Sentimento Delicioso' },
      ],
    },
    {
      numero: 9,
      titulo: 'Perseverança dos Santos',
      resumo: 'A segurança eterna pela graça perseverante.',
      conteudo: `Todos os verdadeiramente regenerados perseverarão na fé até o fim. "Eu lhes dou a vida eterna; não perecerão jamais" (João 10:28). A cadeia da salvação em Romanos 8:30 não pode ser quebrada.\n\nA perseverança não significa ausência de queda — Davi e Pedro caíram, mas foram restaurados. A diferença entre o crente que persevera e o apóstata é que o crente se arrepende.\n\nA perseverança é incentivo à santidade, não ao relaxamento.`,
      versicosChave: [
        { referencia: 'João 10:28-29', texto: 'Lhes dou a vida eterna; ninguém as arrancará da minha mão.', traducao: 'NVI' },
        { referencia: 'Filipenses 1:6', texto: 'Aquele que começou boa obra a aperfeiçoará até ao dia de Cristo.', traducao: 'ARC' },
      ],
      perguntasEstudo: [
        'A perseverança promove negligência?',
        'Como explicar a queda de líderes?',
        'Qual a diferença entre queda e apostasia?',
      ],
      citacoesTeologos: [
        { nome: 'Charles Spurgeon', periodo: 'Pos-Reforma (1834-1892)', citacao: 'Não é nossa firmeza que nos mantém, mas a mão do eterno Deus.', obra: 'Sermões de Noite' },
        { nome: 'John MacArthur', periodo: 'Contemporâneo (1939-)', citacao: 'A segurança do crente não depende de sua força, mas da fidelidade de Deus.', obra: 'A Graça Que Salva' },
      ],
    },
    {
      numero: 10,
      titulo: 'Glorificação',
      resumo: 'A consumação final da salvação.',
      conteudo: `A glorificação é o estágio final: corpo glorificado, liberdade total do pecado, presença eterna de Deus. "Semeia-se corpo corruptível, ressuscitará incorruptível" (1 Coríntios 15:42).\n\nInclui a restauração da criação (Romanos 8:21) e a Nova Jerusalém onde não haverá mais morte nem dor (Apocalipse 21:4).\n\nCompleta o que a justificação começou e a santificação desenvolveu.`,
      versicosChave: [
        { referencia: 'Romanos 8:30', texto: 'Os que justificou, também glorificou.', traducao: 'NVI' },
        { referencia: '1 João 3:2', texto: 'Seremos semelhantes a ele, porque o veremos como ele é.', traducao: 'NVI' },
        { referencia: 'Apocalipse 21:4', texto: 'Enxugará toda lágrima, e a morte não haverá mais.', traducao: 'NVI' },
      ],
      perguntasEstudo: [
        'Como a glorificação se relaciona com a ressurreição?',
        'De que forma a expectativa da glorificação afeta a vida presente?',
      ],
      citacoesTeologos: [
        { nome: 'Agostinho de Hipona', periodo: 'Patrístico (354-430)', citacao: 'Veremos Deus face a face. Esta é a suprema recompensa dos santos.', obra: 'A Cidade de Deus' },
        { nome: 'Jürgen Moltmann', periodo: 'Contemporâneo (1926-2024)', citacao: 'A esperança da glorificação não é fuga, mas promessa da transformação de todas as coisas.', obra: 'A Teologia da Esperança' },
      ],
    },
  ],
};
