export interface EstudoTeologo {
  teologo: string;
  periodo: string;
  tradicao: string;
  visao: string;
  resumo: string;
  citacao: string;
}

export interface EstudoVersiculo {
  livro: string;
  capitulo: number;
  versiculo: number;
  tema: string;
  contexto: string;
  interpretacoes: EstudoTeologo[];
}

const estudosData: EstudoVersiculo[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // GÊNESIS 1
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'gn', capitulo: 1, versiculo: 1,
    tema: 'Criação ex nihilo',
    contexto: 'O versículo inaugural da Bíblia estabelece a soberania criadora de Deus sobre todo o universo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Criacionismo de瞬间', resumo: 'Deus criou tudo de uma vez, incluindo as sementes causais (rationes seminais) que se desenvolveriam ao longo do tempo. A criação não foi necessária para Deus — Ele criou por amor.', citacao: '«Deus criou todas as coisas juntas de uma vez, e não como quem faz e depois contempla o que fez.»' },
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Criacionismo clássico', resumo: 'A criação é um ato livre de Deus que não pressupõe matéria preexistente. Deus é o ato puro — criar é participar do ser divino. A ordem do cosmos reflete a sabedoria divina.', citacao: '«Criar é dar o ser a algo que não existia antes, segundo toda a plenitude da perfeição divina.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Criacionismo literal', resumo: 'Moisés narra a criação como testemunha ocular divina. O texto não é alegoria — é história real. A soberania de Deus se manifesta na ordem e propósito da criação.', citacao: '«Moisés não fala aqui filosoficamente, mas descreve o que todos os homens podem ver com os olhos.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação', resumo: 'Gênesis 1 não é livro científico mas revelação. A criação é o primeiro artigo do Credo — tudo o que existe é de Deus, para Deus, e por Deus. Não há dualismo.', citacao: '«Deus é o Criador — este é o primeiro e último pensamento de todo o Antigo Testamento.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Criacionismo dia/era', resumo: 'Os dias de Gênesis podem ser eras longas, não dias de 24 horas. O relato mostra progressão de caos a ordem, culminando na criação do homem.', citacao: '«A Escritura não é um livro de ciência, mas é verdadeira em tudo o que afirma.»' },
    ],
  },
  {
    livro: 'gn', capitulo: 1, versiculo: 26,
    tema: 'Imago Dei — Imagem de Deus',
    contexto: 'Deus decide criar o ser humano à Sua imagem e semelhança, conferindo dignidade única.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Imagem racional', resumo: 'A imagem de Deus no homem está na razão, memória e vontade — as faculdades que refletem a Trindade. O pecado corrompeu mas não destruiu a imagem.', citacao: '«A imagem de Deus no homem não foi destruída, mas deformada pelo pecado.»' },
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Imagem relacional', resumo: 'O homem é imagem de Deus por natureza (razão) e semelhança por graça (virtudes). A imagem se manifesta no conhecimento, amor e domínio sobre a criação.', citacao: '«O homem é imagem de Deus especialmente na alma, onde reflete a divina natureza.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Imagem moral', resumo: 'A imagem de Deus inclui justiça e santidade originais. Ela foi perdida no pecado, mas restaurada em Cristo. Todo homem tem dignidade por ser criado à imagem de Deus.', citacao: '«A imagem de Deus é aquela dignidade incomparável pela qual se assemelha a Ele e é participante da Sua imortalidade.»' },
      { teologo: 'Emil Brunner', periodo: '1889-1966', tradicao: 'Neocalvinista', visao: 'Imagem personalista', resumo: 'A imagem de Deus se realiza na relação interpessoal — Deus criou macho e fêmea, e a comunhão humana reflete a comunhão trinitária.', citacao: '«A personalidade é a imagem de Deus no homem.»' },
      { teologo: 'José Míguez Bonino', periodo: '1924-2014', tradicao: 'Teologia da Libertação', visao: 'Imagem comunitária', resumo: 'A imagem de Deus não é apenas individual mas comunitária — reflete a justiça e relações de igualdade. A opressão é contrária à imagem divina.', citacao: '«A imagem de Deus implica igualdade fundamental entre todos os seres humanos.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // GÊNESIS 3
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'gn', capitulo: 3, versiculo: 15,
    tema: 'Protoevangelium — Primeira promessa messiânica',
    contexto: 'Após a queda, Deus anuncia que a descendência da mulher esmagará a cabeça da serpente.',
    interpretacoes: [
      { teologo: 'Santo Irineu', periodo: '130-202 d.C.', tradicao: 'Patrística', visao: 'Tipologia mariana', resumo: 'A mulher é Eva/Maria tipológica. Cristo, a descendência da mulher, vence Satanás na cruz. Irineu via Adão e Eva como prefigurações de Cristo e a Igreja.', citacao: '«O nó da desobediência de Eva foi desfeito pela obediência de Maria.»' },
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Cristologia central', resumo: 'Este versículo é a primeira menção à vinda de Cristo. A vitória sobre Satanás se dá pela Paixão e Morte de Jesus, esmagando a cabeça do inimigo.', citacao: '«A cabeça da serpente, que é o diabo, será esmagada pela十字架 de Cristo.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Promessa de graça', resumo: 'Aqui começa o evangelho — Deus promete um redentor mesmo antes da sentença. A promessa é gratuita, não condicional. A semente da mulher é Cristo.', citacao: '«Este é o primeiro sermão evangélico, pregado por Deus em pessoa.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Aliança de graça', resumo: 'O versículo estabelece a aliança de redenção. A vitória de Cristo é certa — a serpente será esmagada, não apenas ferida. É promessa, não possibilidade.', citacao: '«Deus não apenas prediz a vitória — Ele a garante pela Sua palavra.»' },
      { teologo: 'Jonah Goldberg', periodo: 'Contemporâneo', tradicao: 'Evangélica', visao: 'Cosmologia do conflito', resumo: 'O versículo estabelece o conflito cósmico entre semente da mulher e semente da serpente que percorre toda a Escritura até o Apocalipse.', citacao: '«Toda a história bíblica é o drama desta guerra cósmica iniciada em Gn 3:15.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // ÊXODO
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'ex', capitulo: 3, versiculo: 14,
    tema: 'YHWH — Eu Sou o que Sou',
    contexto: 'Deus revela Seu nome inefável a Moisés na sarça ardente.',
    interpretacoes: [
      { teologo: 'Orígenes', periodo: '185-254 d.C.', tradicao: 'Patrística', visao: 'Apopfatismo', resumo: 'O nome revela o Ser absolutamente transcendente — Deus não pode ser definido por categorias humanas. «Eu Sou» é ser puro, sem limitação.', citacao: '«Deus está além de todo nome, além de toda compreensão.»' },
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Ser subsistente', resumo: 'Deus é o Ser que subsiste por Si mesmo (ipsum esse subsistens). Não depende de nada para existir — é o fundamento de todo ser.', citacao: '«Deus não apenas tem ser — Ele é o Ser.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Autoexistência', resumo: 'O nome significa que Deus é autoexistente, eterno, imutável. Ele é quem é — sem mudança, sem dependência, sem começo nem fim.', citacao: '«Deus atribui a Si mesmo este nome para confirmar a fé de Moisés.»' },
      { teologo: 'Martin Buber', periodo: '1878-1965', tradicao: 'Filosofia judaica', visao: 'Relação eu-Tu', resumo: 'O nome revela que Deus entra em relação. «Eu Sou» não é abstração — é presença pessoal que se dirige ao homem. O encontro é tudo.', citacao: '«O Eterno diz ‘Eu Sou’ — e ao dizê-lo, Se dirige.»' },
      { teologo: 'Jürgen Moltmann', periodo: '1926-2024', tradicao: 'Teologia da Esperança', visao: 'Deus libertador', resumo: 'Deus se revela como «Eu Sou» para libertar os escravos. O nome não é filosofia — é compromisso de libertação. A identidade de Deus é histórica.', citacao: '«Deus é o Deus dos oprimidos que se revela na história da libertação.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // SALMOS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'sl', capitulo: 23, versiculo: 1,
    tema: 'O SENHOR é o meu pastor',
    contexto: 'Davi expressa confiança absoluta em Deus como pastor cuidadoso do Seu povo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cristo bom pastor', resumo: 'O Salmo profetiza Cristo, o Bom Pastor que dá a vida pelas ovelhas. Deus é pastor de Israel e Cristo é o Pastor escatológico.', citacao: '«Deus é nosso pastor — e que pastor, senão Aquele que Se fez ovelha por nós?»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Providência particular', resumo: 'Deus cuida individualmente de cada crente. Não é providência geral — é cuidado pessoal, íntimo, diário. «O meu» indica posse por fé.', citacao: '«Não basta saber que Deus é pastor — é preciso experimentar que Ele é o MEU pastor.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Devoção pastoral', resumo: 'O maior salmo de conforto. Em tempos de trevas, a certeza de que Deus pastoreia sustenta a alma. A confiança não depende de circunstâncias.', citacao: '«Este salmo é o santo dos santos da devoção cristã.»' },
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Luterana', visao: 'Custosa graça', resumo: 'O pastor guia para verdes pastagens E por vales sombrios — o cuidado divino inclui o sofrimento. A graça não é conforto apenas, mas chamado.', citacao: '«O discípulo não recebe a graça para si — recebe-a para dar aos outros.»' },
      { teologo: 'Ricardo Gondim', periodo: 'Contemporâneo', tradicao: 'Evangélica', visao: 'Liderança servil', resumo: 'Liderança bíblica é pastoreio — cuidar, guiar, proteger. Os líderes devem ser como o Pastor de Israel — sacrifício, não poder.', citacao: '«O líder cristão é chamado a pastorear, não a dominar.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 119, versiculo: 105,
    tema: 'Lâmpada para os pés — Guia da Palavra',
    contexto: 'O maior salmo celebra a Torá como guia e luz para a caminhada do justo.',
    interpretacoes: [
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola Scriptura', resumo: 'A Palavra é a única autoridade para fé e prática. Ela ilumina o caminho quando as tradições humanas ofuscam.', citacao: '«A Palavra de Deus é a fortaleza da Igreja — sem ela, tudo desmorona.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Iluminação divina', resumo: 'A Escritura ilumina não por poder próprio mas pelo Espírito que a acompanha. A Palavra e o Espírito são inseparáveis.', citacao: '«A Escritura é como um espelho — nele vemos nossa verdadeira condição.»' },
      { teologo: 'John Wesley', periodo: '1703-1791', tradicao: 'Metodista', visao: 'Prática piedosa', resumo: 'A Palavra deve ser não apenas lida mas vivida. Ela guia não apenas intelectualmente mas prático — para a santificação.', citacao: '«Deus nada escreveu para ser apenas decifrado — Ele escreveu para ser obedecido.»' },
      { teologo: 'N.T. Wright', periodo: 'Contemporâneo', tradicao: 'Anglicana', visao: 'Narrativa canônica', resumo: 'A Palavra guia no contexto da grande história de Deus — criação, queda, redenção, restauração. Lemos a Bíblia dentro desta narrativa.', citacao: '«A Bíblia não é um livro de regras — é o livro da história de Deus com Seu povo.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // PROvéRBIOS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'pv', capitulo: 9, versiculo: 10,
    tema: 'Temor do SENHOR — Princípio da sabedoria',
    contexto: 'O temor de Deus é o fundamento de toda sabedoria e conhecimento.',
    interpretacoes: [
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Virtude cardeal', resumo: 'O temor de Deus é virtude cardeal — não medo servil, mas reverência que busca agradar ao Pai. É princípio de sabedoria porque ordena todas as outras virtudes.', citacao: '«O temor de Deus é o princípio da sabedoria porque dele decorrem todas as virtudes.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Simul iustus et peccator', resumo: 'O temor reconhece nossa indignidade diante de Deus santo, mas a fé em Cristo transforma esse temor em confiança. Somos ao mesmo tempo pecadores e justos.', citacao: '«O temor de Deus não nos desespera — nos leva ao Evangelho.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Conhecimento de Deus', resumo: 'O verdadeiro conhecimento de Deus começa no temor reverencial. Não é saber intelectual — é conhecimento relacional que transforma a vida.', citacao: '«O conhecimento de Deus sem o temor é vaidade. O temor sem o conhecimento é superstição.»' },
      { teologo: 'Jonathan Edwards', periodo: '1703-1758', tradicao: 'Puritana', visao: 'Afeições santificadas', resumo: 'O temor de Deus é a afeição mais sublime — combina admiração, amor e reverência. É o fundamento da verdadeira religião.', citacao: '«A verdadeira religião consiste em afeições santificadas.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // ISAÍAS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'is', capitulo: 53, versiculo: 5,
    tema: 'Servo Sofredor — Substituição vicária',
    contexto: 'A profecia messiânica mais clara do Antigo Testamento sobre a morte substitutiva do Messias.',
    interpretacoes: [
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Satisfação vicária', resumo: 'Cristo sofreu em nosso lugar, pagando o devido castigo. Sua paixão é sacrifício de expiação que restaura a relação entre Deus e o homem.', citacao: '«Ele ferido foi por nossas rebeliões — e pela Sua-stripes somos curados.»' },
      { teologo: 'Anselmo de Cantuária', periodo: '1033-1109', tradicao: 'Escolástica', visao: 'Satisfação', resumo: 'A morte de Cristo é satisfação adequada pela ofensa à honra de Deus. Apenas um Deus-homem poderia oferecer satisfação infinita.', citacao: '«Deus encarnou para oferecer o que a humanidade não podia — satisfação perfeita.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Teologia da cruz', resumo: 'Deus se revela não no poder mas no sofrimento. A cruz é o lugar onde Deus está — no abandono, na dor, na morte. É paradoxo da fé.', citacao: '«Deus está do lado dos fracos, dos sofredores, dos crucificados.»' },
      { teologo: 'Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Substituição', resumo: 'Cristo é o substituto que assume o julgamento de Deus contra o pecado humano. Na cruz, Deus julga a si mesmo em Cristo.', citacao: '«O homem é o inimigo de Deus, e Deus é o homem em Cristo.»' },
      { teologo: 'Jürgen Moltmann', periodo: '1926-2024', tradicao: 'Teologia da Esperança', visao: 'Deus sofredor', resumo: 'Deus sofre com e por nós na cruz. Não é Deus indiferente — é Deus que entra na paixão humana para resgatá-la.', citacao: '«Deus crucificado é a base de toda a teologia cristã.»' },
    ],
  },
  {
    livro: 'is', capitulo: 7, versiculo: 14,
    tema: 'Virgem conceberá — Profecia messiânica',
    contexto: 'Isaías profetiza o nascimento miraculoso como sinal para o rei Acaz.',
    interpretacoes: [
      { teologo: 'Santo Ireneu', periodo: '130-202 d.C.', tradicao: 'Patrística', visao: 'Tipologia', resumo: 'A virgem é tipo de Maria. Assim como Eva nasceu sem pecado, Maria concebeu sem pecado. O nascimento virginal é prefiguração da encarnação.', citacao: '«Assim como Eva concebeu da serpente, Maria concebeu do Espírito Santo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Dupla realização', resumo: 'O versículo tem realização imediata (filho de Isaías) e messiânica (Cristo). A palavra hebraica «almah» pode significar tanto donzela quanto jovem.', citacao: '«Deus sempre dá sinais que se cumprem em dupla dimensão — histórica e escatológica.»' },
      { teologo: 'Geza Vermes', periodo: '1924-2013', tradicao: 'Estudo judaico', visao: 'Contexto histórico', resumo: 'No contexto do Antigo Testamento, «almah» indica uma mulher jovem em idade de casamento. A tradução grega «parthenos» (virgem) é interpretação helenística.', citacao: '«O texto hebraico original não implica necessariamente virgindade, mas juventude.»' },
      { teologo: 'Raymond Brown', periodo: '1928-1998', tradicao: 'Católica', visao: 'Cristologia narrativa', resumo: 'Mateus interpreta Gn 7:14 à luz da natalidade de Jesus. A virgem conceberá é sinal de intervenção divina na história.', citacao: '«Os evangelhos da infância são teologia narrativa, não relatos jornalísticos.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // MATEUS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'mt', capitulo: 1, versiculo: 23,
    tema: 'Emmanuel — Deus conosco',
    contexto: 'Mateus cita Isaías para provar que o nascimento de Jesus cumpre a profecia messiânica.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Encarnação', resumo: 'Deus se faz presente no meio dos homens. A encarnação não é diminuição de Deus mas exaltação da humanidade. Emmanuel é mistério da união hipostática.', citacao: '«Deus se fez homem para que o homem se fizesse Deus.»' },
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Comunhão de idiomas', resumo: 'Na encarnação, as naturezas divina e humana se unem em uma pessoa. Deus não está «conosco» externamente — está unido à nossa natureza.', citacao: '«A encarnação é o maior milagre — Deus toma nossa natureza sem abandonar a Sua.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Presença salvadora', resumo: 'Deus está conosco para salvar, não apenas para habitar. A presença de Emmanuel é salvífica — ela redime, santifica, glorifica.', citacao: '«Deus não veio para nos julgar — veio para nos resgatar.»' },
      { teologo: 'Hans Urs von Balthasar', periodo: '1905-1988', tradicao: 'Católica', visao: 'Descida aos infernos', resumo: 'Deus está conosco até nos infernos. A encarnação é ida ao fundo da condição humana — nem o pecado pode separar Deus de nós em Cristo.', citacao: '«Cristo desceu aos infernos para que não haja lugar onde Deus não esteja presente.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 28, versiculo: 19,
    tema: 'Grande Comissão — Batismo e discipulado',
    contexto: 'Cristo ressuscitado comanda a Igreja a fazer discípulos de todas as nações.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Universalidade', resumo: 'A missão não é apenas para Israel mas para todas as nações. O batismo em nome do Pai, Filho e Espírito Santo revela a Trindade.', citacao: '«Fazei discípulos de todas as nações — não há exceção, não há limitação.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Missio Dei', resumo: 'A missão não é nossa iniciativa — é de Deus. Ele comanda e promete estar conosco até o fim dos séculos. A obediência é resposta à graça.', citacao: '«A Igreja não tem missão — Deus tem missão, e a Igreja é instrumento.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Evangelismo integral', resumo: 'A Grande Comissão inclui fazer discípulos (evangelismo), batizar (incorporação à Igreja) e ensinar (educação). É missão holística.', citacao: '«A missão não é opcional — é a razão de ser da Igreja.»' },
      { teologo: 'David Bosch', periodo: '1929-1992', tradicao: 'Missionologia', visao: 'Missão transformadora', resumo: 'A missão é参与 na transformação do mundo segundo o Reino de Deus. Não é apenas conversão individual mas justiça social.', citacao: '«A missão é muito maior que evangelismo — é participation na missão de Deus no mundo.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // JOÃO
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'jo', capitulo: 1, versiculo: 1,
    tema: 'O Verbo — Preexistência de Cristo',
    contexto: 'O prólogo joanino declara a divindade pré-existente de Cristo como Verbo eterno.',
    interpretacoes: [
      { teologo: 'Orígenes', periodo: '185-254 d.C.', tradicao: 'Patrística', visao: 'Filho gerado', resumo: 'O Verbo é gerado eternamente pelo Pai — não criado. O «no princípio» aponta para a eternidade do Filho, anterior à criação.', citacao: '«O Verbo era Deus — não um deus, mas o Deus verdadeiro.»' },
      { teologo: 'Atanásio', periodo: '296-373 d.C.', tradicao: 'Patrística', visao: 'Homoousios', resumo: 'O Verbo é da mesma substância (homoousios) do Pai. Não é criatura — é Deus de Deus, Luz de Luz. A salvação depende da divindade de Cristo.', citacao: '«Se Cristo não é verdadeiro Deus, não há salvação.»' },
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Verbo subsistente', resumo: 'O Verbo é a expressão perfeita do Pai — é Deus que se comunica. O Verbo encarnado é a palavra definitiva de Deus à humanidade.', citacao: '«O Verbo é a perfeita expressão do Pensamento divino.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Deus revelado', resumo: 'João destrói toda heresia que nega a divindade de Cristo. O Verbo é Deus em todos os sentidos — não parcialmente, não metaforicamente.', citacao: '«João é o mouro que quebra todas as cabeças da serpente.»' },
      { teologo: 'Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Palavra reveladora', resumo: 'O Verbo é a Palavra de Deus que se torna carne. A revelação não é ideia mas pessoa — Cristo é a Palavra viva, não apenas a Bíblia.', citacao: '«Deus falou — e isso é o Evangelho. Deus falou uma vez, e isso é suficiente.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 3, versiculo: 16,
    tema: 'Amor universal — Salvação pela fé',
    contexto: 'O versículo mais conhecido da Bíblia resume o evangelho: amor, dádiva, fé, vida eterna.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Graça irresistível', resumo: 'Deus amou tanto que deu o Seu Filho — a salvação é iniciativa divina, não humana. A fé é dom de Deus, não mérito humano.', citacao: '«Deus nos amou primeiro — nós não O amamos primeiro.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola fide', resumo: 'O versículo é a essência do evangelho: salvação pela fé, não pelas obras. Quem crê tem vida eterna — é presente, não futuro apenas.', citacao: '«A fé não é mérito — é recepção do que Deus já fez.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eleição', resumo: 'Deus amou «o mundo» — não apenas Israel. A eleição não exclui o universalidade da oferta. O que se perde é por rejeição humana.', citacao: '«Deus ama o mundo tanto que deu o que tem de mais precioso.»' },
      { teologo: 'Wesley', periodo: '1703-1791', tradicao: 'Metodista', visao: 'Graça preveniente', resumo: 'A graça de Deus precede a conversão. Deus ama primeiro, e esse amor desperta a fé. A graça está disponível a todos.', citacao: '«Deus antecipa Seu amor — Ele nos ama antes de o sabermos.»' },
      { teologo: 'Karl Rahner', periodo: '1904-1984', tradicao: 'Católica', visao: 'Graça匿名', resumo: 'A graça de Deus atua mesmo fora da Igreja. Quem busca a verdade e o amor está respondendo à graça de Cristo, mesmo sem o saber.', citacao: '«O cristão anônimo é aquele que responde à graça sem conhecer o Evangelho.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 14, versiculo: 6,
    tema: 'Caminho, Verdade e Vida — Exclusividade de Cristo',
    contexto: 'Jesus declara ser o único caminho ao Pai, a verdade que liberta e a vida eterna.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Caminho exclusivo', resumo: 'Cristo é o único caminho porque é o único que venceu a morte. Não há outro nome pelo qual possamos ser salvos — é exclusividade ontológica.', citacao: '«Fora de Cristo não há salvação — porque Cristo é o único que ressuscitou.»' },
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Via veritatis', resumo: 'Cristo é verdade porque é o Verbo encarnado. A verdade não é conceito mas pessoa. Conhecer a verdade é conhecer a Cristo.', citacao: '«A verdade é Cristo — não apenas algo que Ele diz, mas algo que Ele é.»' },
      { teologo: 'Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação exclusiva', resumo: 'Cristo é a revelação definitiva de Deus. Não há revelação autêntica fora dEle — toda verdade é verdade de Cristo, mesmo quando não reconhecida.', citacao: '«Cristo é a Palavra de Deus — e esta Palavra é uma e exclusiva.»' },
      { teologo: 'Raimon Panikkar', periodo: '1918-2010', tradicao: 'Inter-religioso', visao: 'Cristo cósmico', resumo: 'Cristo é caminho para todos, mesmo para quem não O conhece. O Cristo cósmico está presente em toda busca sincera pela verdade.', citacao: '«Cristo é mais que o cristianismo — Ele é o mistero que transcende toda religião.»' },
      { teologo: 'José Míguez Bonino', periodo: '1924-2014', tradicao: 'Teologia da Libertação', visao: 'Caminho libertador', resumo: 'Cristo é caminho de libertação dos oprimidos. A verdade é justiça social, e a vida é dignidade para todos. A exclusividade é ética, não apenas dogmática.', citacao: '«Cristo é o caminho da libertação — fora dEle não há justiça plena.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // ATOS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'at', capitulo: 2, versiculo: 42,
    tema: 'Comunidade primitiva — Vida da Igreja',
    contexto: 'Luke descreve a vida cotidiana da primeira comunidade cristã em Jerusalém.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Igreja invisível', resumo: 'A comunidade primitiva é modelo de Igreja — unidade, amor, partilha. Mas a Igreja visível sempre é imperfecta — a perfeição é escatológica.', citacao: '«A Igreja é santa porque Cristo a santifica — mas continua pecadora enquanto na terra.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Igreja reformada', resumo: 'A Igreja verdadeira se distingue pela pregação fiel, sacramentos corretos e disciplina. Atos 2:42 é o padrão — não o ideal inatingível.', citacao: '«A Igreja é reformada e sempre se reformando segundo a Palavra de Deus.»' },
      { teologo: 'John Wesley', periodo: '1703-1791', tradicao: 'Metodista', visao: 'Sociedade de pessoas', resumo: 'A Igreja é sociedade de pessoas convertidas e santificadas. Atos 2 mostra o que a comunidade pode ser quando vive no poder do Espírito.', citacao: '«O mundo é minha paróquia — mas a Igreja é minha família.»' },
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Luterana', visao: 'Comunidade real', resumo: 'A comunidade cristã não se forma por interesses comuns mas por Cristo. É comunidade de obediência, não de sentimentalismo.', citacao: '«A comunidade não é ideal humano — é realidade divina.»' },
      { teologo: 'Jonathan Bonk', periodo: 'Contemporâneo', tradicao: 'Missionologia', visao: 'Missão integral', resumo: 'Atos 2 mostra que a Igreja nasceu como comunidade missionária. A partilha econômica e a proclamação são inseparáveis.', citacao: '«A Igreja primitiva não fazia missão — ela ERA missão.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // ROMANOS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'rm', capitulo: 5, versiculo: 8,
    tema: 'Amor de Deus na cruz — Justificação',
    contexto: 'Paulo declara que Deus prova Seu amor por nós em Cristo que morreu por nós sendo pecadores.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Graça soberana', resumo: 'Deus nos amou quando ainda éramos pecadores — não quando nos tornamos bons. A justificação é precedida pela graça, não pela moralidade.', citacao: '«Deus nos amou quando ainda éramos inimigos — eis o mistério do amor.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Justificação pela fé', resumo: 'A cruz é a prova de que a salvação é por graça. Deus não espera nossa santificação — Ele nos justifica como pecadores, pela fé.', citacao: '«A justificação é o artigo pelo qual a Igreja se sustenta ou cai.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Propiciação', resumo: 'Cristo é propiciação pelo nosso pecado. A cruz não é apenas exemplo — é sacrifício que satisfaz a justiça de Deus.', citacao: '«Deus é ao mesmo tempo justo e Justificador — e isso na cruz de Cristo.»' },
      { teologo: 'N.T. Wright', periodo: 'Contemporâneo', tradicao: 'Anglicana', visao: 'Reino presente', resumo: 'A justificação é declaração de que o crente pertence ao povo de Deus. Não é apenas perdão — é inclusion no Reino de Deus.', citacao: '«A justificação é o veredicto judicial que nos declara membros do povo de Deus.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 8, versiculo: 28,
    tema: 'Todas as coisas cooperam para o bem',
    contexto: 'Paulo assegura que Deus usa todas as circunstâncias — boas e más — para o bem dos que O amam.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Providência', resumo: 'Deus governa todas as coisas com sabedoria infinita. O que parece mal aos nossos olhos é instrumento do bem eterno. A providência não é acaso.', citacao: '«Deus não permite nada sem razão — Ele transforma males em bens maiores.»' },
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Causa primeira', resumo: 'Deus é causa primeira de todas as coisas. O mal existe por privação do bem, mas Deus permite para um bem maior — a salvação.', citacao: '«Deus permite o mal para obter um bem maior — e isso é sabedoria infinita.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania divina', resumo: 'Deus controla todas as coisas — até o sofrimento. Nada escapa ao Seu governo. O crente pode descansar na certeza do Seu propósito.', citacao: '«Nada acontece sem o decreto de Deus — e tudo é para o Seu glorificação.»' },
      { teologo: 'C.S. Lewis', periodo: '1898-1963', tradicao: 'Anglicana', visao: 'Problema do mal', resumo: 'Deus transforma o sofrimento em glorificação. O mal é real, mas Deus não é vencido por ele — Ele o usa para um propósito maior.', citacao: '«Deus sussurra nossos prazeres, grita em nossas dores — é Seu megafone para despertar o mundo surdo.»' },
      { teologo: 'Tim Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Redenção narrativa', resumo: 'Deus escreve histórias de redenção. O que parece ruim hoje será parte de uma narrativa maior de graça. A fé é confiar no Autor.', citacao: '«O evangelho não é apenas o início da fé cristã — é o centro de toda a vida.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 12, versiculo: 2,
    tema: 'Transformação pela renovação da mente',
    contexto: 'Paulo exorta os crentes a não se conformarem ao mundo, mas a serem transformados pela mente renovada.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Conversão contínua', resumo: 'A conversão não é evento único mas processo contínuo. A mente se renova pela leitura da Escritura, oração e prática das virtudes.', citacao: '«A verdadeira conversão é da mente para Deus — e é obra contínua do Espírito.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Renovação pela Palavra', resumo: 'A Palavra de Deus é o instrumento de renovação da mente. Sem ela, a mente continua conformada ao mundo. A Escritura é critério de toda verdade.', citacao: '«A mente renovada é mente formada pela Palavra de Deus — não pela cultura.»' },
      { teologo: 'Wesley', periodo: '1703-1791', tradicao: 'Metodista', visao: 'Santificação', resumo: 'A transformação é gradual santificação. A graça não apenas perdona — ela transforma. O crente cresce em perfeição de amor.', citacao: '«A santificação é a obra do Espírito na vida do crente — e é progressiva.»' },
      { teologo: 'Dallas Willard', periodo: '1935-2013', tradicao: 'Filosofia cristã', visao: 'Discipulado intencional', resumo: 'A renovação da mente requer disciplina intencional. A transformação não é automática — é resultado de práticas espirituais consistentes.', citacao: '«A graça não substitui o esforço — ela o torna possível.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // 1 CORÍNTIOS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: '1co', capitulo: 13, versiculo: 4,
    tema: 'Definição do amor cristão',
    contexto: 'Paulo descreve a natureza do amor (agape) como base de toda vida cristã e espiritualidade.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor caritas', resumo: 'O amor é a virtude suprema — dela dependem todas as outras. O amor cristão (caritas) é amor a Deus e ao próximo como a si mesmo.', citacao: '«O amor é a única força que pode unir o que está dividido.»' },
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Amor benevolente', resumo: 'O amor é benevolência — quer o bem do outro por si mesmo. Não é sentimento mas vontade. O amor se prova nos atos, não nas palavras.', citacao: '«O amor é ato de vontade, não de sentimento — é querer o bem do outro.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Amor fraternal', resumo: 'O amor é a regra de ouro da Igreja. Sem amor, os dons espirituais são ruído. A fé se prova pelo amor — não pela experiência.', citacao: '«Sem amor, até a fé mais ortodoxa é apenas som.»' },
      { teologo: 'Bonhoeffer', periodo: '1906-1945', tradicao: 'Luterana', visao: 'Custosa graça', resumo: 'O amor cristão é custoso — custa a vida. O amor de Cristo na cruz é o modelo. Amar é arriscar, sacrificar, servir.', citacao: '«O amor é o dom mais caro — custa tudo, porque Cristo custou tudo.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // EFÉSIOS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'ef', capitulo: 2, versiculo: 8,
    tema: 'Salvação pela graça pela fé',
    contexto: 'Paulo resume o evangelho: somos salvos por graça, mediante fé, não por obras humanas.',
    interpretacoes: [
      { teologo: 'Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Graça soberana', resumo: 'A salvação é totalmente obra de Deus. A fé é dom de Deus, não mérito humano. Se pudéssemos salvar-nos, não precisaríamos de Cristo.', citacao: '«Deus nos precede em tudo — até na fé que temos.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola gratia', resumo: 'A graça é gratuita e suficiente. Não há mérito humano na salvação. A fé é receptáculo da graça — não contribuição humana.', citacao: '«Somos justificados pela fé sem as obras da Lei — eis o artigo da queda ou da ascensão da Igreja.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça eficaz', resumo: 'A graça não é apenas oferecida mas eficaz. Deus regenera o coração para que creia. A fé é resultado da graça, não sua causa.', citacao: '«A fé é o meio pelo qual Deus nos conecta a Cristo — mas o mérito é dEle.»' },
      { teologo: 'Wesley', periodo: '1703-1791', tradicao: 'Metodista', visao: 'Graça preveniente', resumo: 'A graça antecipa a fé. Deus já está agindo antes de buscarmos. A graça preveniente capacita a resposta humana.', citacao: '«Deus nos busca antes de O buscarmos — eis o mistério da graça.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // FILIPENSES
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'fp', capitulo: 2, versiculo: 6,
    tema: 'Kenosis — Esvaziamento de Cristo',
    contexto: 'O hino cristológico mais antigo descreve o esvaziamento voluntário de Cristo em serviço.',
    interpretacoes: [
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'União hipostática', resumo: 'Cristo não abandona a divindade mas assume a humanidade. O esvaziamento é na forma — não na substância. A encarnação é adição, não subtração.', citacao: '«Cristo esvaziou-Se na forma — mas não perdeu a substância divina.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Humildade exemplar', resumo: 'Cristo é o modelo de humildade. Se esvaziou voluntariamente — é exemplo para nós. O crente deve ter a mesma atitude.', citacao: '«Cristo desceu para que nós subamos — humildade é o caminho da glória.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Cristologia vertical', resumo: 'O esvaziamento é descida de Deus ao homem. Não é perda mas dom. Deus se faz servo para nos servir.', citacao: '«Deus desceu — e ao descer, nos exaltou.»' },
      { teologo: 'Jürgen Moltmann', periodo: '1926-2024', tradicao: 'Teologia da Esperança', visao: 'Cristo social', resumo: 'O esvaziamento tem dimensão social — Cristo se identifica com os oprimidos. A kenosis ésolidariedade com os últimos.', citacao: '«Deus se fez escravo para libertar os escravos.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // 1 PEDRO
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: '1pe', capitulo: 2, versiculo: 9,
    tema: 'Sacerdócio real — Identidade da Igreja',
    contexto: 'Pedro aplica ao Novo Povo de Deus as categorias do Antigo Testamento: sacerdócio, realeza, santidade.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Igreja sacerdotal', resumo: 'Todo crente é sacerdote — não há hierarquia sacrificial como no AT. O sacerdócio cristão é espiritual, universal, ministerial.', citacao: '«A Igreja é sacerdócio real — todos são sacerdotes, mas há ministérios diversos.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sacerdócio de todos os crentes', resumo: 'Todo crente tem acesso direto a Deus. Não há mediador humano entre Deus e o homem senão Cristo. A confissão privada é conselho, não mandamento.', citacao: '«Todos os cristãos são sacerdotes — não há classe sacerdotal especial.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Corpo de Cristo', resumo: 'A Igreja é corpo de Cristo — cada membro tem função. O sacerdócio é ministerial: todos servem, todos oferecem sacrifícios espirituais.', citacao: '«Na Igreja, todos são servos de Deus — há dons diversos, mas dignidade igual.»' },
      { teologo: 'Oscar Romero', periodo: '1917-1980', tradicao: 'Católica', visao: 'Igreja dos pobres', resumo: 'O sacerdócio real é missão entre os pobres. A Igreja é chamada a ser voz dos sem voz, defensora dos oprimidos.', citacao: '«A Igreja que não provoca crises pelo Evangelho não é a Igreja de Cristo.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // APOCALIPSE
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'ap', capitulo: 21, versiculo: 4,
    tema: 'Novos céus e nova terra — Escatologia final',
    contexto: 'A visão final da Bíblia: Deus enxugará toda lágrima e não haverá mais morte nem dor.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cidade de Deus', resumo: 'A cidade de Deus é a realidade escatológica final — comunhão eterna com Deus. Não é fuga do mundo mas transformação do mundo.', citacao: '«Aqui não temos cidade permanente — buscamos a que há de vir.»' },
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Visão beatífica', resumo: 'A felicidade final é a visão direta de Deus — a visão beatífica. É a realização de todo desejo humano, a plenitude da bem-aventurança.', citacao: '«A felicidade final consiste na visão da essência divina.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Consumação', resumo: 'A criação será renovada, não destruída. Deus restaurará tudo — a criação clama pela libertação. O crente tem esperança certa.', citacao: '«Deus renovará a criação — não a destruirá. A esperança é de restauração, não aniquilação.»' },
      { teologo: 'Jürgen Moltmann', periodo: '1926-2024', tradicao: 'Teologia da Esperança', visao: 'Eschatologia otimista', resumo: 'Deus se compromete com o futuro da criação. A esperança não é fuga mas transformação. Deus será tudo em todos.', citacao: '«A esperança cristã não é esperança em algo — é esperança em Alguém.»' },
      { teologo: 'N.T. Wright', periodo: 'Contemporâneo', tradicao: 'Anglicana', visao: 'Nova criação', resumo: 'O céu e a terra se encontram — não vamos para o céu, o céu vem para a terra. A realidade final é a fusão dos dois mundos.', citacao: '«O destino final não é ir ao céu — é o céu vir à terra.»' },
    ],
  },
];

// Índices para busca rápida
const byRefMap = new Map<string, EstudoVersiculo[]>();

function addToIndex(estudo: EstudoVersiculo) {
  const key = `${estudo.livro}:${estudo.capitulo}:${estudo.versiculo}`;
  if (!byRefMap.has(key)) byRefMap.set(key, []);
  byRefMap.get(key)!.push(estudo);
}

for (const e of estudosData) addToIndex(e);

export function obterEstudos(livro: string, capitulo: number, versiculo: number): EstudoVersiculo[] {
  return byRefMap.get(`${livro}:${capitulo}:${versiculo}`) || [];
}

export function temEstudo(livro: string, capitulo: number, versiculo: number): boolean {
  return byRefMap.has(`${livro}:${capitulo}:${versiculo}`);
}

export function listarTodosEstudos(): EstudoVersiculo[] {
  return estudosData;
}
