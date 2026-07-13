import { ManualBiblico } from '../manuaisBiblicos';

export const manualCristologia: ManualBiblico = {
  id: 'cristologia',
  slug: 'cristologia',
  titulo: 'Cristologia',
  subtitulo: 'Doutrina de Cristo',
  autor: 'Comissão Teológica Sola Scriptura',
  descricao: 'Um estudo aprofundado sobre a pessoa e obra de Jesus Cristo, desde Sua pré-existência eterna até Sua segunda vinda.',
  categorias: ['Cristo', 'Divindade', 'Humanidade', 'Encarnação', 'Ressurreição'],
  icone: 'Cross',
  cor: 'text-amber-500',
  capitulos: [
    {
      numero: 1,
      titulo: 'A Natureza Divina de Cristo',
      resumo: 'Cristo é verdadeiro Deus, coeterno e consubstancial com o Pai.',
      conteudo: `A divindade de Cristo é pilar fundamental da fé cristã. O Prólogo de João declara: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus" (João 1:1). O Verbo se fez carne (João 1:14) — Jesus é o Deus encarnado.\n\nColossenses 1:15-17 declara que Ele é "a imagem do Deus invisível, o primogênito de toda a criação. Porque nele foram criadas todas as coisas." Hebreus 1:3: "O resplendor da glória e a expressão exata do ser de Deus."\n\nOs títulos divinos confirmam: Senhor (Kyrios = YHWH), Filho de Deus, Alfa e Ômega, Salvador. Filipenses 2:6-11 descreve a kenosis — esvaziamento voluntário sem abandonar a natureza divina. Tomé confessou: "Meu Senhor e meu Deus!" (João 20:28).`,
      versicosChave: [
        { referencia: 'João 1:1', texto: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.', traducao: 'NVI' },
        { referencia: 'Colossenses 1:15-16', texto: 'Ele é a imagem do Deus invisível, o primogênito de toda a criação. Nele foram criadas todas as coisas.', traducao: 'NVI' },
        { referencia: 'Hebreus 1:3', texto: 'O resplendor da glória e a expressão exata do seu ser.', traducao: 'NVI' },
        { referencia: 'João 20:28', texto: 'Tomé respondeu: Meu Senhor e meu Deus!', traducao: 'NVI' },
      ],
      perguntasEstudo: [
        'Como o Prólogo de João estabelece a divindade de Cristo?',
        'Qual a importância do título "Senhor" no NT?',
        'Como a kenosis é compatível com a plena divindade?',
      ],
      citacoesTeologos: [
        { nome: 'Atanásio de Alexandria', periodo: 'Patrístico (296-373)', citacao: 'O Filho se encarnou para que nós pudéssemos ser divinizados. Ele se fez homem para que nós fôssemos feitos filhos de Deus.', obra: 'Sobre a Encarnação' },
        { nome: 'Benjamin Warfield', periodo: 'Modernos (1851-1921)', citacao: 'A divindade de Cristo não é um dogma tardio, mas uma verdade que emerge naturalmente do NT.', obra: 'Calvin e a Religião Reformada' },
      ],
    },
    {
      numero: 2,
      titulo: 'A Natureza Humana de Cristo',
      resumo: 'Cristo é verdadeiro homem, sem pecado.',
      conteudo: `Cristo é verdadeiro homem: nasceu de Maria, cresceu, experimentou fome, sede, cansaço e morreu. Para ser nosso representante e Sumo Sacerdote, precisava ser humano como nós (Hebreus 2:17).\n\nEra sem pecado: "Nele não há pecado" (1 João 3:5). A ausência de pecado não O tornava menos humano, mas o tornava o único sacrifício perfeito.\n\nA virgem Conceição garantiu natureza humana pura, sem pecado original. Mateus 1:18-20: Jesus concebido pelo Espírito Santo.\n\nCristo é o novo Adão — onde Adão falhou, Cristo venceu. Onde Adão trouxe morte, Cristo trouxe vida.`,
      versicosChave: [
        { referencia: 'Hebreus 2:17', texto: 'Era necessário tornar-se semelhante aos irmãos, para ser misericordioso e fiel Sumo Sacerdote.', traducao: 'NVI' },
        { referencia: '1 Timóteo 2:5', texto: 'Um só Deus e um só Mediador: o homem Cristo Jesus.', traducao: 'NVI' },
        { referencia: '1 Pedro 2:22', texto: 'Não cometeu pecado, nem se achou engano na sua boca.', traducao: 'NVI' },
      ],
      perguntasEstudo: [
        'Por que a humanidade de Cristo é tão importante quanto Sua divindade?',
        'Como Cristo pode ser sem pecado e verdadeiramente humano?',
      ],
      citacoesTeologos: [
        { nome: 'Tomás de Aquino', periodo: 'Escolástica (1225-1274)', citacao: 'Sem a humanidade de Cristo, não haveria mediação, sacrifício nem exemplo.', obra: 'Summa Theologiae' },
        { nome: 'Larry Hurtado', periodo: 'Contemporâneo (1943-2023)', citacao: 'Os cristãos primitivos insistiam que Jesus era mais do que humano — era o Deus-homem.', obra: 'Lord Jesus Christ' },
      ],
    },
    {
      numero: 3,
      titulo: 'Títulos de Cristo',
      resumo: 'Os nomes que revelam identidade e missão.',
      conteudo: `**Jesus** (Yeshua) significa "Deus salva" — Sua missão salvadora. **Cristo** (Messias) significa "ungido" — Profeta, Sacerdote e Rei suprema. **Senhor** (Kyrios) é o nome divino YHWH atribuído a Jesus. **Filho de Deus** revela relação eterna na Trindade. **Filho do Homem** (Daniel 7:13-14) revela autoridade messiânica. **Cordeiro de Deus** (João 1:29) conecta com sacrifícios do AT. **Bom Pastor** (João 10:11) revela cuidado pessoal. **Sumo Sacerdote** (Hebreus 4:14) descreve mediação.`,
      versicosChave: [
        { referencia: 'Mateus 1:21', texto: 'Chamarás o seu nome Jesus, porque salvará o seu povo dos seus pecados.', traducao: 'NVI' },
        { referencia: 'Filipenses 2:9-11', texto: 'Deus o exaltou sobre todo o nome. Todo joelho se dobre e toda língua confesse que Jesus Cristo é o Senhor.', traducao: 'NVI' },
        { referencia: 'João 1:29', texto: 'Eis o Cordeiro de Deus, que tira o pecado do mundo!', traducao: 'NVI' },
      ],
      perguntasEstudo: [
        'Por que o título "Senhor" é teologicamente significativo?',
        'Como os títulos se conectam com as promessas do AT?',
      ],
      citacoesTeologos: [
        { nome: 'Richard Bauckham', periodo: 'Contemporâneo (1946-)', citacao: 'A cristologia do NT inclui Jesus na identidade monotheísta de Israel.', obra: 'Jesus and the God of Israel' },
        { nome: 'Larry Hurtado', periodo: 'Contemporâneo (1943-2023)', citacao: 'A devotion a Jesus no cristianismo primitivo era sem precedentes no judaísmo.', obra: 'Lord Jesus Christ' },
      ],
    },
    {
      numero: 4,
      titulo: 'O Ministério Terrenal de Cristo',
      resumo: 'Ensino, curas e proclamação do Reino.',
      conteudo: `Jesus foi o maior mestre: parábolas, Sermão do Monte, discursos sobre discipulado. Seu ministério de cura demonstrava o Reino invadindo o domínio do pecado (Mateus 4:23).\n\nO tema central era: "O Reino de Deus está próximo. Arrependei-vos e crede no evangelho" (Marcos 1:15). Demonstrou autoridade sobre natureza, espíritos, morte e Lei.\n\nO chamado ao discipulado era seguir a uma pessoa, não meramente aceitar doutrinas.`,
      versicosChave: [
        { referencia: 'Marcos 1:15', texto: 'Cumpriu-se o tempo, e o reino de Deus está próximo.', traducao: 'NVI' },
        { referencia: 'Mateus 4:23', texto: 'Percorria Galileia, ensinando, pregando o evangelho do reino e curando.', traducao: 'ARC' },
        { referencia: 'Mateus 11:28', texto: 'Vinde a mim, todos os cansados e oprimidos, e eu vos aliviarei.', traducao: 'NVI' },
      ],
      perguntasEstudo: [
        'Como os milagres se relacionam com o Reino?',
        'Qual a relevância do Sermão do Monte hoje?',
      ],
      citacoesTeologos: [
        { nome: 'N.T. Wright', periodo: 'Contemporâneo (1948-)', citacao: 'O ministério de Jesus não pode ser compreendido fora da história de Israel.', obra: 'Jesus e a Vitória de Deus' },
        { nome: 'John Stott', periodo: 'Contemporâneo (1921-2011)', citacao: 'Seguir Jesus é negar a si mesmo e caminhar no caminho da obediência.', obra: 'O Novo Mandamento' },
      ],
    },
    {
      numero: 5,
      titulo: 'Os Milagres de Cristo',
      resumo: 'Sinais que confirmam identidade divina.',
      conteudo: `Curas (ciegos, paralíticos, leprosos), exorcismos (legião), controle da natureza (tempestades, multiplicação), ressurreições (Lázaro). Os propósitos: confirmar a mensagem (Hebreus 2:4), manifestar glória (João 2:11), demonstrar compaixão e inaugurar o Reino.`,
      versicosChave: [
        { referencia: 'João 20:30-31', texto: 'Muitos sinais foram escritos para que credeis que Jesus é o Cristo.', traducao: 'NVI' },
        { referencia: 'João 11:25-26', texto: 'Eu sou a ressurreição e a vida. Quem crê em mim viverá.', traducao: 'NVI' },
      ],
      perguntasEstudo: [
        'Qual a relação entre milagres e o Reino?',
        'Como responder à duvidas sobre historicidade?',
      ],
      citacoesTeologos: [
        { nome: 'C.S. Lewis', periodo: 'Modernos (1898-1963)', citacao: 'Um homem que disse as coisas que Jesus disse seria lunático ou Deus. Temos que escolher.', obra: 'Cristianismo Puro e Simples' },
        { nome: 'Wolfhart Pannenberg', periodo: 'Modernos (1928-2014)', citacao: 'A ressurreição é um evento histórico verificável.', obra: 'Jesus — Deus e Homem' },
      ],
    },
    {
      numero: 6,
      titulo: 'Os Ensinos de Cristo',
      resumo: 'O ensino mais transformador da história.',
      conteudo: `O Sermão do Monte (Mateus 5-7) é o manifesto do Reino. As bem-aventuranças descrevem o caráter do cidadão do Reino. As parábolas são histórias terrestres com verdades celestiais.\n\nJesus ensinou sobre Deus como Pai amoroso, o Reino como realidade presente, amor radical ao inimigo, oração filial. Sua ética vai além das ações ao coração: odiar é assassinato, cobiçar é adultério.`,
      versicosChave: [
        { referencia: 'Mateus 5:3-4', texto: 'Bem-aventurados os pobres de espírito, porque deles é o reino dos céus.', traducao: 'NVI' },
        { referencia: 'Mateus 22:37-39', texto: 'Amarás o Senhor de todo o coração e o teu próximo como a ti mesmo.', traducao: 'NVI' },
        { referencia: 'João 13:34-35', texto: 'Um novo mandamento vos dou: que vos ameis uns aos outros.', traducao: 'NVI' },
      ],
      perguntasEstudo: [
        'Como o Sermão do Monte se diferencia da ética convencional?',
        'Como o amor ao inimigo é possível?',
      ],
      citacoesTeologos: [
        { nome: 'Dietrich Bonhoeffer', periodo: 'Modernos (1906-1945)', citacao: 'O Sermão do Monte não é ideal impossível, mas descrição da vida cristã real.', obra: 'O Custo do Discipulado' },
        { nome: 'N.T. Wright', periodo: 'Contemporâneo (1948-)', citacao: 'Os ensinos de Jesus são proclamação do Reino — implementando o governo de Deus.', obra: 'O que Paulo realmente quis dizer' },
      ],
    },
    {
      numero: 7,
      titulo: 'A Paixão e Morte de Cristo',
      resumo: 'O sacrifício substitutivo na cruz.',
      conteudo: `A Paixão começou no Getsêmani, passou pela prisão, julgamento injusto e crucificação — o suplício mais vergonhoso do mundo romano.\n\nAs sete palavras da cruz revelam o coração de Deus: perdão ("Pai, perdoa-lhes"), promessa ("Hoje estarás no paraíso"), amor ("Aí está teu filho"), desamparo ("Por que me desamparaste?"), sede, consumação ("Está consumado") e entrega ("Nas tuas mãos").\n\nA escuridão sobre a terra (Mateus 27:45) simboliza juízo divino. O véu do templo rasgou — acesso direto a Deus aberto pelo sangue de Cristo.`,
      versicosChave: [
        { referencia: 'Isaías 53:5', texto: 'Ferido por nossas transgressões, moído por nossas iniquidades.', traducao: 'NVI' },
        { referencia: 'João 19:30', texto: 'Está consumado! E entregou o espírito.', traducao: 'ARC' },
        { referencia: 'Romanos 5:8', texto: 'Deus prova o amor: Cristo morreu por nós sendo pecadores.', traducao: 'NVI' },
      ],
      perguntasEstudo: [
        'Por que a crucificação era necessária?',
        'O que significa "Está consumado"?',
      ],
      citacoesTeologos: [
        { nome: 'Martin Lutero', periodo: 'Reforma (1483-1546)', citacao: 'Na cruz, Deus demonstra o máximo do Seu amor. Não nos ama porque somos amáveis.', obra: 'Sermões sobre o Catecismo' },
        { nome: 'John Stott', periodo: 'Contemporâneo (1921-2011)', citacao: 'A cruz não é derrota, mas vitória — Cristo derrotou pecado, morte e diabo.', obra: 'A Cruz de Cristo' },
      ],
    },
    {
      numero: 8,
      titulo: 'A Ressurreição de Cristo',
      resumo: 'A vitória sobre a morte e base da fé.',
      conteudo: `Sem ressurreição não há cristianismo (1 Coríntios 15:14). Evidências: túmulo vazio, aparições a 500+, transformação dos discípulos.\n\nO corpo ressurreto era reconhecível, mas glorificado. A ressurreição prova a aceitação do sacrifício e é a primeira fruta da ressurreição geral. A proclamação apostólica era centrada na ressurreição.`,
      versicosChave: [
        { referencia: '1 Coríntios 15:3-4', texto: 'Cristo morreu pelos pecados, foi sepultado e ressuscitou no terceiro dia.', traducao: 'ARC' },
        { referencia: 'Romanos 1:4', texto: 'Declarado Filho de Deus com poder, pela ressurreição dos mortos.', traducao: 'NVI' },
        { referencia: '1 Coríntios 15:17', texto: 'Se Cristo não ressuscitou, é vã a vossa fé.', traducao: 'NVI' },
      ],
      perguntasEstudo: [
        'Quais as evidências históricas da ressurreição?',
        'Por que a ressurreição é mais importante que a cruz?',
      ],
      citacoesTeologos: [
        { nome: 'N.T. Wright', periodo: 'Contemporâneo (1948-)', citacao: 'A ressurreição não é mito nem experiência subjetiva, mas evento no tempo e espaço.', obra: 'A Ressurreição do Filho de Deus' },
        { nome: 'Wolfhart Pannenberg', periodo: 'Modernos (1928-2014)', citacao: 'A ressurreição é o evento mais importante da história.', obra: 'Jesus — Deus e Homem' },
      ],
    },
    {
      numero: 9,
      titulo: 'A Ascensão de Cristo',
      resumo: 'A elevação à direita do Pai e intercessão.',
      conteudo: `Cristo ascendeu visivelmente (Atos 1:9), inaugurando Sua exaltação celestial. Sentou-se à direita do Pai, acima de todo poder (Efésios 1:20-21).\n\nInaugura ministério celestial como Sumo Sacerdote e Advogado: "Vive sempre para interceder por nós" (Hebreus 7:25). A ascensão foi condição para a vinda do Espírito Santo em Pentecostes.\n\nA promessa: "Este mesmo Jesus voltará" (Atos 1:11).`,
      versicosChave: [
        { referencia: 'Atos 1:9', texto: 'Elevou-se, e uma nuvem o recebeu.', traducao: 'NVI' },
        { referencia: 'Efésios 1:20-21', texto: 'Sentou à sua direita acima de todo principado e poder.', traducao: 'NVI' },
        { referencia: 'Hebreus 7:25', texto: 'Vive sempre para interceder por eles.', traducao: 'NVI' },
      ],
      perguntasEstudo: [
        'Como a ascensão se relaciona com a vinda do Espírito?',
        'Como a intercessão celestial nos dá segurança?',
      ],
      citacoesTeologos: [
        { nome: 'John Calvin', periodo: 'Reforma (1509-1564)', citacao: 'De lá Ele distribui dons e graças, e intercede por nós.', obra: 'Institutos da Religião Cristã' },
        { nome: 'Wayne Grudem', periodo: 'Contemporâneo (1948-)', citacao: 'A ascensão é transição para novo ministério — o Cristo ascensionado governa tudo em favor da igreja.', obra: 'Teologia Sistemática' },
      ],
    },
    {
      numero: 10,
      titulo: 'A Segunda Vinda de Cristo',
      resumo: 'A prometida volta para consumar o Reino.',
      conteudo: `Mais de 300 passagens tratam da segunda vinda. Será visível, pessoal e gloriosa: "Todo o olho o verá" (Apocalipse 1:7).\n\nPropósito: completar salvação dos santos e consumar juízo sobre o mal. Sinais: pregação a todas nações, guerras, terremotos, apostasia.\n\nAtitude correta: vigilância e fidelidade. "Não sabeis em que dia o Senhor há de vir" (Mateus 24:42). A parusia é fundamento da esperança cristã.`,
      versicosChave: [
        { referencia: 'Atos 1:11', texto: 'Este mesmo Jesus virá da mesma maneira como o vistes ir para o céu.', traducao: 'NVI' },
        { referencia: 'Apocalipse 1:7', texto: 'Vem com as nuvens, e todo o olho o verá.', traducao: 'NVI' },
        { referencia: '1 Tessalonicenses 4:16-17', texto: 'O Senhor descerá com estrondo; os mortos ressuscitarão, e seremos arrebatados.', traducao: 'ARC' },
      ],
      perguntasEstudo: [
        'Por que Cristo não revelou o dia da volta?',
        'Como a segunda vinda deve afetar a vida diária?',
      ],
      citacoesTeologos: [
        { nome: 'Charles Spurgeon', periodo: 'Pos-Reforma (1834-1892)', citacao: 'A esperança da segunda vinda é a estrela da manhã da alma.', obra: 'Sermões de Manhã' },
        { nome: 'Jürgen Moltmann', periodo: 'Contemporâneo (1926-2024)', citacao: 'A segunda vinda não é fuga, mas promessa de transformação da criação.', obra: 'A Teologia da Esperança' },
      ],
    },
  ],
};
