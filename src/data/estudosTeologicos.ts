import { estudosTeologicosExpandidos, EstudoTeologico } from './estudosTeologicosExpandidos';

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

export type { EstudoTeologico };
export { estudosTeologicosExpandidos };

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
  // ═══════════════════════════════════════════════════════════════════════
  // GÊNESIS 12
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'gn', capitulo: 12, versiculo: 1,
    tema: 'Chamado de Abraão — Fé e promessa',
    contexto: 'Deus chama Abrão para deixar sua terra e seguir para uma terra desconhecida, prometendo bênção a todas as nações.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Peregrinação', resumo: 'Abraão é modelo do crente como peregrino — chamado a deixar o mundo para seguir a promessa de Deus. A fé é caminhada em direção ao invisível.', citacao: '«A fé de Abraão nos ensina que somos peregrinos neste mundo, em busca da pátria celestial.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eleição e chamado', resumo: 'O chamado de Abraão é pura graça — não há mérito nele. Deus escolhe um homem idoso e sem filhos para ser pai de uma nação. A promessa precede a fé.', citacao: '«Deus não chamou Abraão porque ele era fiel — tornou-o fiel ao chamá-lo.»' },
      { teologo: 'Kierkegaard', periodo: '1813-1855', tradicao: 'Filosofia cristã', visao: 'Salto de fé', resumo: 'Abraão é o cavaleiro da fé — a obediência absurda que transcende a razão. Ele não sabia para onde ia, mas confiou. A fé é paradoxo, não certeza.', citacao: '«Pela fé, Abraão saiu da terra de seus pais e tornou-se estrangeiro na terra da promessa.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // ÊXODO 20
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'ex', capitulo: 20, versiculo: 2,
    tema: 'Os Dez Mandamentos — Lei de Deus',
    contexto: 'Deus entrega a Lei a Israel no Sinai, estabelecendo os fundamentos da aliança.',
    interpretacoes: [
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Lei natural', resumo: 'Os mandamentos são expressão da lei natural inscrita no coração humano. A lei moral é participação da lei eterna de Deus na criatura racional.', citacao: '«A lei divina é necessária para guiar o homem à sua perfeição última.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Usos da lei', resumo: 'A lei tem dois usos: civil (frear o pecado) e teológico (revelar o pecado e levar a Cristo). A lei não salva — prepara para a graça.', citacao: '«A lei nos mostra o pecado; o Evangelho nos mostra o Salvador.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Terceiro uso', resumo: 'A lei também tem um terceiro uso — guiar o crente na vida de santificação. Não para salvação, mas como regra de gratidão.', citacao: '«A lei é como um açoite para a carne, mas também é guia para o espírito.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // LEVÍTICO 19
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'lv', capitulo: 19, versiculo: 18,
    tema: 'Amar ao próximo como a ti mesmo',
    contexto: 'A lei da santidade ordena o amor ao próximo como resumo das obrigações éticas de Israel.',
    interpretacoes: [
      { teologo: 'Hillel', periodo: '~110 a.C.-10 d.C.', tradicao: 'Filosofia judaica', visao: 'Regra de ouro', resumo: 'Hillel resumiu a Torá como «o que é odioso para ti, não faças ao próximo». Este versículo é o fundamento da ética judaica.', citacao: '«O que é odioso para ti, não faças ao teu próximo — toda a Torá está nisto.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Amor ordenado', resumo: 'O amor ao próximo deve ser ordenado — primeiro a Deus, depois ao próximo, e a cada um conforme seu grau de parentesco e necessidade.', citacao: '«O amor é a forma de todas as virtudes — sem ele, nada é perfeito.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // DEUTERONÔMIO 6
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'dt', capitulo: 6, versiculo: 4,
    tema: 'Shema Israel — O SENHOR é um',
    contexto: 'A declaração central da fé de Israel: o SENHOR é único e deve ser amado com todo o ser.',
    interpretacoes: [
      { teologo: 'Moisés Maimônides', periodo: '1135-1204', tradicao: 'Filosofia judaica', visao: 'Unicidade absoluta', resumo: 'O Shema é a afirmação da unicidade absoluta de Deus. Não há pluralidade na divindade — Deus é um em sentido único e exclusivo.', citacao: '«Deus é um — não como um par, nem como uma espécie, nem como um composto, mas como uma unidade além de toda compreensão.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Exclusividade', resumo: 'O Shema é a base da fé bíblica — somente Deus deve ser adorado. Exclui toda idolatria e sincretismo. Amar a Deus é o primeiro e maior mandamento.', citacao: '«O coração humano é uma fábrica de ídolos — o Shema nos chama de volta ao único Deus verdadeiro.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Deus revelado', resumo: 'O Deus único se revela em três pessoas. O Shema não contradiz a Trindade — a unicidade de Deus é a base para compreender a Trindade como comunhão, não divisão.', citacao: '«Deus é um — e este Um se revela como Pai, Filho e Espírito Santo.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // JOSUÉ 1
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'js', capitulo: 1, versiculo: 9,
    tema: 'Sê forte e corajoso — Presença de Deus',
    contexto: 'Deus encoraja Josué a assumir a liderança de Israel na conquista de Canaã.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Coragem na vocação', resumo: 'A coragem de Josué não vem de si mesmo mas da promessa da presença de Deus. A certeza do chamado divino é a base da verdadeira coragem.', citacao: '«Não temas, porque Deus está contigo — esta promessa é o fundamento de toda coragem cristã.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Confiança na promessa', resumo: 'Deus não manda ser forte sem dar a força. A ordem vem com a promessa. A coragem cristã é confiança na fidelidade de Deus.', citacao: '«Deus não nos chamaria para uma tarefa sem nos dar a força para cumpri-la.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // 1 SAMUEL 3
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: '1sm', capitulo: 3, versiculo: 10,
    tema: 'Fala, SENHOR — Chamado profético',
    contexto: 'O jovem Samuel é chamado por Deus durante a noite no santuário de Siló.',
    interpretacoes: [
      { teologo: 'Gregório Magno', periodo: '540-604', tradicao: 'Patrística', visao: 'Discernimento', resumo: 'Samuel precisou de ajuda para discernir a voz de Deus. O discernimento espiritual é aprendido na humildade e na orientação dos mais experientes.', citacao: '«Samuel ouviu a voz de Deus, mas não a reconheceu — até ser guiado por Eli.»' },
      { teologo: 'Bonhoeffer', periodo: '1906-1945', tradicao: 'Luterana', visao: 'Obediência', resumo: 'A resposta de Samuel «fala, SENHOR» é o modelo da obediência cristã. Estar disponível para ouvir e obedecer é a essência do discipulado.', citacao: '«A disposição para ouvir é o começo de toda obediência cristã.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // 2 SAMUEL 7
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: '2sm', capitulo: 7, versiculo: 12,
    tema: 'Aliança Davídica — Reino eterno',
    contexto: 'Deus promete a Davi que seu trono será estabelecido para sempre, prefigurando o Messias.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Tipologia real', resumo: 'Davi é tipo de Cristo, o Rei eterno. A promessa a Davi se cumpre plenamente em Jesus, o Filho de Davi que reina para sempre.', citacao: '«Davi prefigurou Cristo — assim como Davi reinou sobre Israel, Cristo reina sobre a Igreja.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Aliança perpétua', resumo: 'A aliança com Davi é incondicional — não depende dos méritos de seus descendentes. É promessa pura de Deus, que se cumpre em Cristo.', citacao: '«Deus prometeu a Davi um reino eterno — promessa que só poderia cumprir-se no Messias.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // 1 REIS 19
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: '1rs', capitulo: 19, versiculo: 12,
    tema: 'Voz mansa e delicada — Presença silenciosa',
    contexto: 'Elias encontra Deus não no vento, terremoto ou fogo, mas numa voz suave e tranquila.',
    interpretacoes: [
      { teologo: 'Gregório de Nissa', periodo: '335-395', tradicao: 'Patrística', visao: 'Teologia mística', resumo: 'Deus não se revela no barulho mas no silêncio. O conhecimento de Deus é apofático — Ele está além de toda manifestação sensível.', citacao: '«O silêncio é a linguagem de Deus — tudo o mais é má tradução.»' },
      { teologo: 'Kierkegaard', periodo: '1813-1855', tradicao: 'Filosofia cristã', visao: 'Encontro singular', resumo: 'Deus não se revela nas manifestações espetaculares mas no encontro pessoal, silencioso. A fé é relação íntima, não espetáculo público.', citacao: '«Deus sussurra — não grita. A fé é ouvir o que o barulho do mundo não permite.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // JÓ 1
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'jó', capitulo: 1, versiculo: 21,
    tema: 'Nu saí do ventre — Soberania no sofrimento',
    contexto: 'Jó perde tudo e ainda assim bendiz a Deus, reconhecendo Sua soberania.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Desapego', resumo: 'Jó ensina o desapego radical — tudo que temos é dom de Deus. Bendizer a Deus na perda é a verdadeira fé, não interessada mas desinteressada.', citacao: '«Jó amava a Deus não pelo que recebia, mas pelo que Deus é.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Jó reconhece a soberania absoluta de Deus sobre todas as coisas — bênçãos e perdas vêm de Sua mão. O sofrimento não diminui a bondade de Deus.', citacao: '«Se recebemos o bem de Deus, por que não receberíamos também o mal?»' },
      { teologo: 'C.S. Lewis', periodo: '1898-1963', tradicao: 'Anglicana', visao: 'Provação', resumo: 'O sofrimento não é castigo mas refinamento. Jó mostra que a fé verdadeira não é barganha com Deus — é confiança incondicional.', citacao: '«Deus grita em nossas dores — é Seu megafone para despertar um mundo surdo.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // JEREMIAS 29
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'jr', capitulo: 29, versiculo: 11,
    tema: 'Planos de paz e futuro — Esperança em Deus',
    contexto: 'Deus promete esperança e futuro ao Seu povo no exílio.',
    interpretacoes: [
      { teologo: 'Jürgen Moltmann', periodo: '1926-2024', tradicao: 'Teologia da Esperança', visao: 'Esperança escatológica', resumo: 'A promessa de futuro não é apenas para Israel mas para toda a criação. Deus é o Deus do futuro — a esperança cristã é certeza do que virá.', citacao: '«A esperança cristã não é fuga do presente — é engajamento no futuro de Deus.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // EZEQUIEL 37
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'ez', capitulo: 37, versiculo: 5,
    tema: 'Vale de ossos secos — Restauração',
    contexto: 'Deus mostra a Ezequiel uma visão de ossos secos que revivem, simbolizando a restauração de Israel.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Ressurreição', resumo: 'A visão profetiza a ressurreição dos mortos. Os ossos secos representam a humanidade sem Deus — o Espírito dá vida onde não há esperança.', citacao: '«Onde o Espírito sopra, os mortos revivem — esta é a promessa da ressurreição.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Palavra criadora', resumo: 'A restauração é obra da Palavra de Deus. Os ossos não se movem por si — a palavra profética cria vida onde só há morte.', citacao: '«Deus fala — e o que estava morto revive. A Palavra de Deus é poder criador.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // DANIEL 3
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'dn', capitulo: 3, versiculo: 17,
    tema: 'O Deus que pode livrar — Fé incondicional',
    contexto: 'Sadraque, Mesaque e Abednego enfrentam a fornalha ardente com fé inabalável.',
    interpretacoes: [
      { teologo: 'Santo Ambrósio', periodo: '340-397', tradicao: 'Patrística', visao: 'Confiança heroica', resumo: 'Os três jovens são modelos de fé heroica — não negociam a consciência nem diante da morte. A verdadeira fé não depende do resultado.', citacao: '«Deus pode livrar — e se não livrar, ainda assim não adoraremos outros deuses.»' },
      { teologo: 'Kierkegaard', periodo: '1813-1855', tradicao: 'Filosofia cristã', visao: 'Fé incondicional', resumo: 'A fé não é barganha — é fidelidade incondicional. Os jovens não exigem livramento — confiam mesmo sem garantia. Este é o salto da fé.', citacao: '«A fé não diz «Deus me livrará» — diz «Deus sabe o que é melhor, e eu confio».»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // MATEUS 5
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'mt', capitulo: 5, versiculo: 3,
    tema: 'Bem-aventuranças — Felicidade do Reino',
    contexto: 'Jesus inaugura Seu ensino declarando bem-aventurados os pobres de espírito, os que choram, os mansos.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Degraus espirituais', resumo: 'As bem-aventuranças são os degraus da vida espiritual. Cada uma conduz à próxima — da humildade à visão de Deus. São o retrato do verdadeiro discípulo.', citacao: '«As bem-aventuranças são o caminho da perfeição cristã.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Ética do Reino', resumo: 'As bem-aventuranças descrevem a vida do Reino, não requisitos para entrar nele. São promessas aos que já são cidadãos do Reino.', citacao: '«Não são obras que precedem a graça — são dons que a acompanham.»' },
      { teologo: 'Bonhoeffer', periodo: '1906-1945', tradicao: 'Luterana', visao: 'Discipulado radical', resumo: 'As bem-aventuranças são o chamado ao discipulado radical. Felizes os que sofrem por Cristo — não porque o sofrimento é bom, mas porque Cristo está com eles.', citacao: '«Quando Cristo chama um homem, chama-o para morrer.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 5, versiculo: 9,
    tema: 'Pacificadores — Filhos de Deus',
    contexto: 'Jesus declara bem-aventurados os pacificadores, que serão chamados filhos de Deus.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Paz escatológica', resumo: 'A verdadeira paz é a ordem perfeita — cada coisa em seu lugar sob Deus. O pacificador é aquele que restaura a ordem divina na terra.', citacao: '«A paz é a tranquilidade da ordem — o pacificador é o artífice da ordem de Deus.»' },
      { teologo: 'Martin Luther King Jr.', periodo: '1929-1968', tradicao: 'Batista', visao: 'Justiça como paz', resumo: 'A verdadeira paz não é ausência de conflito — é presença de justiça. O pacificador bíblico luta contra a injustiça com amor e não violência.', citacao: '«A paz verdadeira não é simplesmente a ausência de tensão — é a presença da justiça.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // MARCOS 10
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'mc', capitulo: 10, versiculo: 45,
    tema: 'Serviço e sacrifício — O Filho do Homem veio para servir',
    contexto: 'Jesus redefine a grandeza como serviço, dando Sua vida em resgate por muitos.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Humildade redentora', resumo: 'Cristo inverte a lógica do poder — a grandeza está em servir. Ele veio não para ser servido, mas para servir e dar a vida.', citacao: '«O maior é o que serve — Cristo é o maior porque serviu até a morte.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Resgate', resumo: 'A morte de Cristo é resgate — pagamento pelos pecados. «Por muitos» significa que a salvação é aplicada aos que creem.', citacao: '«Cristo deu Sua vida em resgate — preço pelo nosso livramento.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // LUCAS 1
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'lc', capitulo: 1, versiculo: 38,
    tema: 'Eis aqui a serva do Senhor — Magnificat',
    contexto: 'Maria responde ao anúncio do anjo com humildade e disposição total à vontade de Deus.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Modelo de fé', resumo: 'Maria concebeu Cristo primeiro no coração pela fé, depois no ventre. Sua disposição é o modelo de toda resposta humana à graça divina.', citacao: '«Maria concebeu pela fé antes de conceber no corpo — a fé precede o milagre.»' },
      { teologo: 'Hans Urs von Balthasar', periodo: '1905-1988', tradicao: 'Católica', visao: 'Fiat', resumo: 'O «sim» de Maria é o ponto de encontro entre a iniciativa divina e a liberdade humana. Seu «faça-se» ecoa o «faça-se» da criação e da redenção.', citacao: '«O fiat de Maria é o sim da criação ao seu Criador.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // LUCAS 10
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'lc', capitulo: 10, versiculo: 27,
    tema: 'O Bom Samaritano — Amor ao próximo',
    contexto: 'Jesus responde ao doutor da lei sobre quem é o próximo com a parábola do Bom Samaritano.',
    interpretacoes: [
      { teologo: 'Clemente de Alexandria', periodo: '150-215', tradicao: 'Patrística', visao: 'Amor universal', resumo: 'O próximo não é apenas o vizinho ou o compatriota — é todo ser humano que precisa de ajuda.', citacao: '«O próximo é todo aquele que precisa — não há fronteiras para o amor cristão.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Amor prático', resumo: 'A parábola mostra que o amor não é sentimento mas ação. Quem é o próximo? Não o que merece, mas o que precisa.', citacao: '«O amor ao próximo não se prova com palavras, mas com obras.»' },
      { teologo: 'Gustavo Gutiérrez', periodo: '1928-2024', tradicao: 'Teologia da Libertação', visao: 'Opção pelos pobres', resumo: 'O samaritano representa a opção preferencial pelos pobres. O amor cristão se revela na solidariedade com os vulneráveis.', citacao: '«O amor ao próximo é a medida do amor a Deus — e este amor se concretiza na justiça aos pobres.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // JOÃO 11
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'jo', capitulo: 11, versiculo: 25,
    tema: 'Ressurreição e Vida — Vitória sobre a morte',
    contexto: 'Jesus declara a Marta que Ele é a ressurreição e a vida, antes de ressuscitar Lázaro.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Vida eterna', resumo: 'Cristo não apenas dá vida — Ele é a Vida. A ressurreição não é evento futuro apenas — quem crê já passou da morte para a vida.', citacao: '«Cristo é a ressurreição — não apenas porque ressuscita, mas porque é a própria Vida.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Fé e ressurreição', resumo: 'A ressurreição de Lázaro é penhor da nossa ressurreição. Crer em Cristo é ter a vida eterna já agora.', citacao: '«Quem crê em Cristo possui a vida eterna — não apenas a esperará, mas já a possui.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // JOÃO 15
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'jo', capitulo: 15, versiculo: 5,
    tema: 'Videira e varas — União com Cristo',
    contexto: 'Jesus ensina que sem Ele nada podemos fazer — somos ramos dependentes da videira.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'União mística', resumo: 'A videira e os ramos simbolizam a união mística de Cristo e a Igreja. Separados dEle, não temos vida — unidos, produzimos frutos eternos.', citacao: '«Toda a nossa fecundidade vem de Cristo — separados dEle, somos ramos secos.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'União vital', resumo: 'A união com Cristo é vital, não apenas legal. Permanecer nEle é a condição para frutificar. O fruto não é opcional — é evidência da união.', citacao: '«Não basta estar na videira — é preciso permanecer. A perseverança é a marca da fé verdadeira.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // GÁLATAS 5
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'gl', capitulo: 5, versiculo: 22,
    tema: 'Fruto do Espírito — Vida no Espírito',
    contexto: 'Paulo contrasta as obras da carne com o fruto do Espírito na vida do crente.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Virtudes cristãs', resumo: 'O fruto do Espírito é a suma de todas as virtudes cristãs. Não são obras humanas mas graça divina operando na vida do crente.', citacao: '«O fruto do Espírito é a liberdade dos filhos de Deus — viver não pela carne, mas pelo Espírito.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Santificação', resumo: 'O fruto não é opcional — é evidência da habitação do Espírito. A santificação é progressiva — o fruto amadurece com o tempo.', citacao: '«O fruto do Espírito é a marca do cristão — não perfeição instantânea, mas crescimento contínuo.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Dons e virtudes', resumo: 'O fruto do Espírito são as virtudes infundidas por Deus na alma. A caridade é a raiz — todas as outras virtudes fluem do amor.', citacao: '«A caridade é a forma de todas as virtudes — o amor é a raiz de todo fruto espiritual.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // COLOSSENSES 1
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'cl', capitulo: 1, versiculo: 15,
    tema: 'Cristo — Imagem do Deus invisível',
    contexto: 'O hino cristológico mais elevado declara Cristo como primogênito de toda a criação e cabeça da Igreja.',
    interpretacoes: [
      { teologo: 'Atanásio', periodo: '296-373 d.C.', tradicao: 'Patrística', visao: 'Homoousios', resumo: 'Cristo é imagem do Deus invisível — não criatura, mas da mesma substância do Pai. Ver Cristo é ver o Pai.', citacao: '«Cristo é a imagem do Deus invisível — não semelhança distante, mas presença plena da divindade.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Cristo mediador', resumo: 'Cristo é o mediador entre Deus e os homens porque une em Si as duas naturezas. Como imagem, revela o Pai.', citacao: '«Cristo é a imagem perfeita do Pai porque procede dEle como Verbo — expressão completa do ser divino.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Senhorio de Cristo', resumo: 'Cristo é Senhor sobre toda a criação e cabeça da Igreja. Nada escapa ao Seu senhorio.', citacao: '«Cristo não é apenas Salvador — é Senhor de tudo o que existe.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // 1 TESSALONICENSES 4
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: '1ts', capitulo: 4, versiculo: 16,
    tema: 'Arrebatamento — Esperança da volta de Cristo',
    contexto: 'Paulo descreve a volta de Cristo e o arrebatamento da Igreja.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Ressurreição geral', resumo: 'A volta de Cristo será visível e gloriosa. Os mortos em Cristo ressuscitarão primeiro, depois os vivos serão transformados.', citacao: '«O Senhor descerá dos céus com alarido — não em segredo, mas para que todos vejam.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Consolação', resumo: 'Paulo não escreve para alimentar especulações cronológicas mas para consolar os que perderam entes queridos.', citacao: '«Consolai-vos uns aos outros com estas palavras — a esperança da volta de Cristo é o conforto da Igreja.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Esperança equilibrada', resumo: 'A volta de Cristo deve motivar vigilância e santidade, não especulação. O importante não é saber quando mas estar preparado.', citacao: '«O que importa não é saber quando Cristo voltará — é estar pronto para quando Ele vier.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // HEBREUS 1
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'hb', capitulo: 1, versiculo: 1,
    tema: 'Deus falou pelo Filho — Supremacia de Cristo',
    contexto: 'O autor de Hebreus abre declarando que Deus, que falou de muitas maneiras no passado, falou definitivamente pelo Filho.',
    interpretacoes: [
      { teologo: 'Orígenes', periodo: '185-254 d.C.', tradicao: 'Patrística', visao: 'Revelação progressiva', resumo: 'Deus falou de muitas maneiras — profetas, visões, sonhos — mas agora falou pelo Filho. A revelação em Cristo é definitiva e superior a todas as anteriores.', citacao: '«Antes, Deus falou em sombras — agora, na plena luz do Filho.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Palavra final', resumo: 'Cristo é a Palavra final de Deus. Não há revelação superior à que temos em Cristo. Toda Escritura aponta para Ele.', citacao: '«Deus não tem mais nada a dizer além do que disse em Cristo — Ele é a Palavra definitiva.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Cristo-centrismo', resumo: 'A revelação de Deus em Cristo é o centro da Escritura e da teologia. Toda a Bíblia é testemunha de Cristo.', citacao: '«Cristo é a Palavra de Deus — a Bíblia é testemunha desta Palavra.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // TIAGO 2
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'tg', capitulo: 2, versiculo: 17,
    tema: 'Fé sem obras é morta — Fé viva',
    contexto: 'Tiago argumenta que a fé genuína se prova pelas obras — fé sem obras não é fé verdadeira.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Fé frutífera', resumo: 'Paulo fala da causa da salvação (fé); Tiago fala da evidência da salvação (obras). Somos justificados pela fé somente, mas a fé que salva não está só.', citacao: '«Somos justificados pela fé somente — mas a fé que justifica nunca está só.»' },
      { teologo: 'John Wesley', periodo: '1703-1791', tradicao: 'Metodista', visao: 'Santificação', resumo: 'As obras são evidência da fé viva. A santificação é progressiva — a fé que não produz fruto não é fé salvadora.', citacao: '«A fé que não produz boas obras não é fé — é mera crença intelectual.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // 1 JOÃO 4
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: '1jo', capitulo: 4, versiculo: 8,
    tema: 'Deus é amor — Natureza divina',
    contexto: 'João declara que Deus é amor — a mais profunda definição da essência de Deus.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor trinitário', resumo: 'Deus é amor porque é Trindade — Pai ama o Filho, Filho ama o Pai, e o Espírito Santo é o amor entre Eles. O amor não é atributo — é essência divina.', citacao: '«Deus é amor — e porque é Trindade, o amor é eterno, relacional, vivo.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Amor subsistente', resumo: 'Deus não apenas ama — Ele é amor. O amor é a própria substância divina. O amor de Deus é a fonte de todo amor criado.', citacao: '«Deus é amor — não porque ama, mas porque o amor é a própria essência do Seu ser.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Amor livre', resumo: 'Deus é amor em liberdade — ama não por necessidade mas por superabundância de bondade. O amor de Deus é gratuito, soberano, incondicional.', citacao: '«Deus ama porque é amor — e é amor em perfeita liberdade.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // LIVROS FALTANTES (expandindo cobertura)
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'nm', capitulo: 21, versiculo: 8,
    tema: 'A serpente de bronze — Tipo de Cristo',
    contexto: 'Israel, picado por serpentes, é curado ao olhar para a serpente de bronze erguida por Moisés.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Tipologia cruenta', resumo: 'A serpente de bronze é figura exata da crucificação: Cristo foi feito pecado por nós para que olhando nEle vivamos.', citacao: '«O remédio estava na contemplação da serpente de bronze, figura de Cristo na cruz.»' },
      { teologo: 'João Crisóstomo', periodo: '349-407', tradicao: 'Patrística Oriental', visao: 'Cura pela fé', resumo: 'A cura não vinha do bronze em si, mas da fé obediente em olhar para o sinal levantado.', citacao: '«A serpente não curava por natureza, mas a obediência que olhava a curava.»' },
      { teologo: 'Agostinho', periodo: '354-430', tradicao: 'Patrística', visao: 'Exaltação do Senhor', resumo: 'Como a serpente foi erguida no deserto, o Filho do Homem foi erguido na cruz para dar vida (Jo 3:14).', citacao: '«O que a serpente de bronze significava, Cristo na cruz cumpriu plenamente.»' },
    ],
  },
  {
    livro: 'jz', capitulo: 21, versiculo: 25,
    tema: 'Ausência de rei — Necessidade de liderança divina',
    contexto: 'O período dos juízes termina com a constatação do caos moral quando cada um faz o que lhe parece reto.',
    interpretacoes: [
      { teologo: 'Agostinho', periodo: '354-430', tradicao: 'Patrística', visao: 'Pecado original', resumo: 'Sem a lei de Deus reinando no coração, a autonomia humana degenera em caos. A necessidade de um Rei justo aponta para Cristo.', citacao: '«Onde Deus não reina, cada um se torna seu próprio deus e perde o rumo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania real', resumo: 'A anarquia de Juízes é o pano de fundo da monarquia davídica e, em última instância, do Rei Messiânico.', citacao: '«A falta de rei visível faz clamar por aquele que é Rei eterno.»' },
    ],
  },
  {
    livro: 'rt', capitulo: 1, versiculo: 16,
    tema: 'Lealdade de Rute — Graça transcultural',
    contexto: 'Rute, moabita, declara lealdade incondicional a Noemi e ao Deus de Israel.',
    interpretacoes: [
      { teologo: 'Matthew Henry', periodo: '1662-1714', tradicao: 'Puritana', visao: 'Providência', resumo: 'A fidelidade de Rute revela como Deus atrai gentios à Sua aliança, integrando-os na linhagem de Cristo.', citacao: '«A graça de Deus não reconhece fronteiras de nação quando há fé sincera.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Exemplo de fé', resumo: 'Rute é modelo de conversão verdadeira: abandona os deuses estranhos para servir ao Deus vivo.', citacao: '«Rute trocou seus deuses por Cristo, ainda que não O conhecesse pelo nome.»' },
    ],
  },
  {
    livro: '2rs', capitulo: 2, versiculo: 9,
    tema: 'Pedido de Eliseu — Herança espiritual',
    contexto: 'Eliseu pede o duplo do espírito de Elias antes de este ser elevado aos céus.',
    interpretacoes: [
      { teologo: 'João Crisóstomo', periodo: '349-407', tradicao: 'Patrística Oriental', visao: 'Sucessão profética', resumo: 'O pedido não é por poder, mas por fidelidade redobrada na continuação da obra de Deus.', citacao: '«Quem serve com ousadia recebe o dobro do Espírito que o precedeu.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça ministerial', resumo: 'Deus multiplica a graça sobre Seus servos fiéis para que a Sua obra não cesse.', citacao: '«O Senhor honra quem persevera pedindo Sua presença em dobro.»' },
    ],
  },
  {
    livro: 'ed', capitulo: 7, versiculo: 10,
    tema: 'Dedicação de Esdras — Estudo e ensino da Lei',
    contexto: 'Esdras prepara o coração para buscar, cumprir e ensinar a Lei do Senhor em Jerusalém.',
    interpretacoes: [
      { teologo: 'Matthew Henry', periodo: '1662-1714', tradicao: 'Puritana', visao: 'Piedade intelectual', resumo: 'A renovação do povo começa com o líder consagrado ao estudo e ensino fiel da Palavra.', citacao: '«Esdras não estudou para si só, mas para transmitir a lei com poder.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Reforma pela Palavra', resumo: 'A restauração de Israel se faz pela redescoberta e aplicação da Escritura.', citacao: '«Onde a lei é restaurada, ali Deus restaura Seu povo.»' },
    ],
  },
  {
    livro: 'ne', capitulo: 8, versiculo: 10,
    tema: 'A alegria do Senhor é a vossa força',
    contexto: 'Neemias exorta o povo a não se entristecer, mas a se alegrar no Senhor após ouvir a Lei.',
    interpretacoes: [
      { teologo: 'Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Gozo espiritual', resumo: 'A força para resistir vem da alegria em Deus, não do esforço próprio. O gozo é combustível da obediência.', citacao: '«Tira a alegria do crente e tu tiras sua força.»' },
      { teologo: 'Neemias (trad.)', periodo: 'Séc. V a.C.', tradicao: 'Bíblica', visao: 'Consolação comunitária', resumo: 'A alegria compartilhada no culto sustenta o povo em meio à reconstrução e oposição.', citacao: '«O dia é santo ao nosso Senhor; não vos entristeçais, porque a alegria do Senhor é a vossa força.»' },
    ],
  },
  {
    livro: 'et', capitulo: 4, versiculo: 14,
    tema: 'Para tal momento — Providência silenciosa',
    contexto: 'Mardoqueu convence Ester de que ela foi preservada para salvar seu povo numa hora crítica.',
    interpretacoes: [
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Providência', resumo: 'Mesmo sem citar o nome de Deus, o livro revela Sua mão soberana operando por meio de pessoas comuns.', citacao: '«Deus prepara Seus instrumentos antes de preparar Sua obra.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'A providência de Deus age de maneira oculta mas eficaz para a salvação de Seu povo.', citacao: '«O Senhor guia os eventos por caminhos que os olhos não veem.»' },
    ],
  },
  {
    livro: 'lm', capitulo: 3, versiculo: 22,
    tema: 'Misericórdias renovadas — Fidelidade no sofrimento',
    contexto: 'No meio da devastação de Jerusalém, o profeta afirma que as misericórdias do Senhor não têm fim.',
    interpretacoes: [
      { teologo: 'Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Consolo', resumo: 'A graça renovada a cada manhã sustenta os que passam pela disciplina divina.', citacao: '«As misericórdias de Deus são como o maná: novas toda a manhã.»' },
      { teologo: 'Agostinho', periodo: '354-430', tradicao: 'Patrística', visao: 'Esperança', resumo: 'Mesmo no juízo há amor; a fidelidade de Deus permanece quando tudo mais desaba.', citacao: '«Aonde quer que o pecado abunde, a misericórdia de Deus superabunda.»' },
    ],
  },
  {
    livro: '2pe', capitulo: 1, versiculo: 4,
    tema: 'Participantes da natureza divina',
    contexto: 'Pedro ensina que as promessas nos habilitam a escapar da corrupção e participar da vida de Deus.',
    interpretacoes: [
      { teologo: 'Pedro (trad.)', periodo: 'Séc. I d.C.', tradicao: 'Bíblica', visao: 'Deificação por graça', resumo: 'A participação não anula a criatura, mas a eleva pela graça à semelhança de Cristo.', citacao: '«Vos fizestes participantes da natureza divina, havendo escapado da corrupção.»' },
      { teologo: 'Atanásio', periodo: '296-373', tradicao: 'Patrística', visao: 'Encarnação', resumo: 'O Verbo se fez homem para que os homens se tornassem deuses por adoção.', citacao: '«Ele se fez homem para que fôssemos feitos deuses.»' },
    ],
  },
  {
    livro: '1tm', capitulo: 2, versiculo: 5,
    tema: 'Um só Mediador',
    contexto: 'Paulo afirma haver um único mediador entre Deus e os homens: Cristo Jesus, homem.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Mediação exclusiva', resumo: 'Cristo, verdadeiro Deus e verdadeiro homem, é o único canal de acesso a Deus. Nenhum santo intermedia.', citacao: '«Não há meio de chegar a Deus senão por Cristo, o único Mediador.»' },
      { teologo: 'Atanásio', periodo: '296-373', tradicao: 'Patrística', visao: 'Encarnação mediadora', resumo: 'A encarnação é necessária precisamente porque só Deus-homem pode reconciliar ambas as naturezas.', citacao: '«Aquele que é Mediador é o mesmo que é Salvador, o Verbo encarnado.»' },
    ],
  },
  {
    livro: '2jo', capitulo: 1, versiculo: 6,
    tema: 'Andar segundo os mandamentos',
    contexto: 'O amor verdadeiro se manifesta no andar segundo os mandamentos de Deus.',
    interpretacoes: [
      { teologo: 'João Crisóstomo', periodo: '349-407', tradicao: 'Patrística Oriental', visao: 'Amor obediente', resumo: 'O amor não é mero sentimento, mas obediência prática à vontade revelada de Deus.', citacao: '«Quem diz amar e desobedece, ilude a si mesmo.»' },
      { teologo: 'João (trad.)', periodo: 'Séc. I d.C.', tradicao: 'Bíblica', visao: 'Continuidade', resumo: 'O mandamento novo é também o antigo: amar é andar como Cristo ensinou.', citacao: '«Este é o amor: que andemos segundo os Seus mandamentos.»' },
    ],
  },
  {
    livro: '3jo', capitulo: 1, versiculo: 4,
    tema: 'Alegria do pastor — Filhos na verdade',
    contexto: 'João expressa seu maior gozo ao ouvir que seus filhos espirituais andam na verdade.',
    interpretacoes: [
      { teologo: 'João Crisóstomo', periodo: '349-407', tradicao: 'Patrística Oriental', visao: 'Pastoral', resumo: 'O fruto genuíno do ministério é a santidade dos discípulos, não a aclamação própria.', citacao: '«Maior gozo não há para o pastor do que ver o rebanho na verdade.»' },
      { teologo: 'João (trad.)', periodo: 'Séc. I d.C.', tradicao: 'Bíblica', visao: 'Alegria mútua', resumo: 'A comunhão na verdade gera alegria partilhada entre mestre e discípulo.', citacao: '«Não tenho maior gozo do que este: o de ouvir que os meus filhos andam na verdade.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // PROFETAS MENORES, CANTARES E EPÍSTOLAS CURTAS (cobertura completa)
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'ct', capitulo: 8, versiculo: 6,
    tema: 'Amor selado sobre o coração — Tipo do amor de Cristo',
    contexto: 'O Cântico descreve um amor forte como a morte, lido tipologicamente como a paixão de Cristo pela Sua igreja.',
    interpretacoes: [
      { teologo: 'Bernardo de Claraval', periodo: '1090-1153', tradicao: 'Monástica', visao: 'Mística', resumo: 'O amor de Deus por alma é intenso e exclusivo; a devoção mística medeia a união com Cristo.', citacao: '«O amor de Deus derrama-se no coração e sela a alma para Si.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Aliança', resumo: 'O Cântico ilustra a fidelidade da aliança entre Deus e Seu povo, espelhada no matrimônio.', citacao: '«O amor conjugal é sombra do amor invencível de Deus por Sua igreja.»' },
    ],
  },
  {
    livro: 'jl', capitulo: 2, versiculo: 28,
    tema: 'Derramamento do Espírito — Pentecostes anunciado',
    contexto: 'Joel profetiza que o Espírito seria derramado sobre toda a carne, cumprido em Atos 2.',
    interpretacoes: [
      { teologo: 'Pedro (trad.)', periodo: 'Séc. I d.C.', tradicao: 'Bíblica', visao: 'Cumprimento pentecostal', resumo: 'A profecia de Joel se cumpre no derramamento do Espírito sobre judeus e gentios igualmente.', citacao: '«Isto é o que foi dito pelo profeta Joel: derramarei do Meu Espírito.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Economia do Espírito', resumo: 'A nova era é marcada pela presença interior do Espírito, sinal do reino vindouro.', citacao: '«O derramamento do Espírito é a marca da igreja do Novo Testamento.»' },
    ],
  },
  {
    livro: 'jn', capitulo: 3, versiculo: 10,
    tema: 'Arrependimento de Nínive — Misericórdia universal',
    contexto: 'A cidade gentílica de Nínive se arrepende à pregação de Jonas, e Deus perdoa.',
    interpretacoes: [
      { teologo: 'Agostinho', periodo: '354-430', tradicao: 'Patrística', visao: 'Graça soberana', resumo: 'A salvação de Nínive demonstra que a misericórdia de Deus transpõe fronteiras de povo.', citacao: '«Deus não rejeita quem se arrepende, seja judeu ou gentio.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Justificação pela fé', resumo: 'Nínive é justificada por sua fé manifesta em arrependimento, não por merecimento.', citacao: '«A fé que se arrepende alcança o perdão de Deus.»' },
    ],
  },
  {
    livro: 'mi', capitulo: 6, versiculo: 8,
    tema: 'O que Deus requer — Justiça, misericórdia e humildade',
    contexto: 'Miquéias resume a exigência moral de Deus em três atitudes práticas.',
    interpretacoes: [
      { teologo: 'Miquéias (trad.)', periodo: 'Séc. VIII a.C.', tradicao: 'Bíblica', visao: 'Ética profética', resumo: 'A religião autêntica é fazer justiça, amar a misericórdia e andar humildemente com Deus.', citacao: '«Ele te declarou, ó homem, o que é bom; que outro bem requer o Senhor, senão praticar a justiça?»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Santidade prática', resumo: 'A verdadeira piedade se expressa em retidão social e humildade diante de Deus.', citacao: '«A justiça para com o próximo e a humildade diante de Deus são o culto real.»' },
    ],
  },
  {
    livro: 'zc', capitulo: 9, versiculo: 9,
    tema: 'O Rei manso de Jerusalém — Entrada messiânica',
    contexto: 'Zacarias anuncia a vinda do Rei humilde, montado em jumenta, cumprida em Mateus 21.',
    interpretacoes: [
      { teologo: 'Mateus (trad.)', periodo: 'Séc. I d.C.', tradicao: 'Bíblica', visao: 'Cumprimento', resumo: 'A entrada triunfal de Jesus em Jerusalém cumpre literalmente esta profecia.', citacao: '«Dizei à filha de Sião: eis que o teu Rei vem a ti, manso.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Realeza humilde', resumo: 'A majestade de Cristo se revela na humildade; Seu trono é a cruz.', citacao: '«O Rei da glória veio em humildade para reinar pela cruz.»' },
    ],
  },
  {
    livro: 'ml', capitulo: 4, versiculo: 2,
    tema: 'O Sol da Justiça — Cura messiânica',
    contexto: 'Malaquias encerra o AT anunciando o surgimento do Sol da Justiça para os que temem a Deus.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Esperança messiânica', resumo: 'A última profecia do AT aponta para a vinda de Cristo como luz e cura.', citacao: '«O Sol da Justiça há de nascer trazendo salvação em suas asas.»' },
      { teologo: 'Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Consolo', resumo: 'Para os que temem a Deus, a vinda de Cristo traz cura e livramento seguros.', citacao: '«Aquele que é o Sol levanta-se para curar os que andam nas trevas.»' },
    ],
  },
  {
    livro: '2tm', capitulo: 3, versiculo: 16,
    tema: 'Inspiração das Escrituras',
    contexto: 'Paulo afirma a origem divina de toda a Escritura e sua utilidade para a vida do crente.',
    interpretacoes: [
      { teologo: 'Atanásio', periodo: '296-373', tradicao: 'Patrística', visao: 'Autoridade canônica', resumo: 'Toda a Escritura provém de Deus e é suficiente para a fé e o ministério.', citacao: '«As divinas Escrituras bastam para a piedade e para toda a edificação.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Clareza e suficiência', resumo: 'A Bíblia é a regra infalível de fé; seu testemunho é confirmado pelo Espírito.', citacao: '«A Escritura é a escola do Espírito Santo, onde aprendemos a Deus perfeitamente.»' },
    ],
  },
  {
    livro: 'tt', capitulo: 3, versiculo: 5,
    tema: 'Salvação pela misericórdia',
    contexto: 'Tito ensina que fomos salvos não por obras, mas pela regeneração do Espírito.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Sola gratia', resumo: 'A salvação é inteiramente pela misericórdia de Deus, mediante a lavagem da regeneração.', citacao: '«Não pelas obras de justiça que fizéssemos, mas segundo Sua misericórdia nos salvou.»' },
      { teologo: 'Tito (trad.)', periodo: 'Séc. I d.C.', tradicao: 'Bíblica', visao: 'Renovação', resumo: 'O Espírito Santo renova o crente, tornando-o herdeiro da esperança da vida eterna.', citacao: '«Justificados pela Sua graça, fomos feitos herdeiros conforme a esperança da vida eterna.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // ESTUDOS FALTANTES (cobertura completa de 66 livros)
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: '1cr', capitulo: 29, versiculo: 11,
    tema: 'A soberania de Deus sobre todas as coisas',
    contexto: 'Davi declara que de Deus é o reino, a grandeza, o poder e a glória, antes de entregar a arca.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Toda preeminência e riqueza provêm de Deus; o homem nada tem que não tenha recebido.', citacao: '«Tua, ó Senhor, é a grandeza, o poder, a glória, a vitória e a majestade.»' },
    ],
  },
  {
    livro: '2cr', capitulo: 7, versiculo: 14,
    tema: 'Humilhar-se e sarar a terra',
    contexto: 'Deus promete perdoar e curar a terra se Seu povo se humilhar, orar e se converter.',
    interpretacoes: [
      { teologo: 'Matthew Henry', periodo: '1662-1714', tradicao: 'Puritana', visao: 'Avivamento', resumo: 'A condição do avivamento é a humilhação do povo diante de Deus, não o mérito.', citacao: '«O arrependimento precede sempre a cura que Deus promete.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Aliança', resumo: 'A fidelidade de Deus à aliança se expressa em perdoar quando há verdadeira volta.', citacao: '«Quem se volta a Deus com todo o coração encontra o perdão certo.»' },
    ],
  },
  {
    livro: 'ec', capitulo: 12, versiculo: 13,
    tema: 'O dever do homem — Temer a Deus',
    contexto: 'O conclusão de Eclesiastes: temer a Deus e guardar Seus mandamentos é o dever de todo homem.',
    interpretacoes: [
      { teologo: 'Agostinho', periodo: '354-430', tradicao: 'Patrística', visao: 'Temor filial', resumo: 'Após esgotar a vaidade do mundo, o sábio conclui que só o temor de Deus dá sentido.', citacao: '«Teme a Deus e guarda os Seus mandamentos, porque isto é o dever de todo homem.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sabedoria', resumo: 'A reverência a Deus é o princípio e o fim de toda sabedoria autêntica.', citacao: '«O temor do Senhor é o começo e o fim da verdadeira sabedoria.»' },
    ],
  },
  {
    livro: 'os', capitulo: 6, versiculo: 6,
    tema: 'Misericórdia, não sacrifício',
    contexto: 'Oséias declara que Deus deseja misericórdia e conhecimento de Si, mais que holocaustos.',
    interpretacoes: [
      { teologo: 'Mateus (trad.)', periodo: 'Séc. I d.C.', tradicao: 'Bíblica', visao: 'Cumprimento', resumo: 'Jesus cita este versículo para priorizar a misericórdia sobre o ritual (Mt 9:13; 12:7).', citacao: '«Misericórdia quero, e não sacrifício; e o conhecimento de Deus mais do que holocaustos.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Culto racional', resumo: 'O culto agradável é o amor prático, não a observância externa vazia.', citacao: '«Deus rejeita o ritual quando falta o coração cheio de misericórdia.»' },
    ],
  },
  {
    livro: 'ob', capitulo: 1, versiculo: 21,
    tema: 'Salvadores no monte Sião',
    contexto: 'Obadias encerra anunciando a vitória final de Deus sobre Edom e a restauração de Sião.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Juízo e reino', resumo: 'A soberania de Deus sobre as nações se consuma no reino de Cristo, libertador de Seu povo.', citacao: '«Subirão salvadores ao monte Sião para julgar o monte de Esaú.»' },
    ],
  },
  {
    livro: 'na', capitulo: 1, versiculo: 7,
    tema: 'O Senhor é bom — Refúgio',
    contexto: 'No meio da denúncia contra Nínive, Naum afirma a bondade de Deus para os que nEle se refugiam.',
    interpretacoes: [
      { teologo: 'Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Providência', resumo: 'A justiça de Deus pune a iniquidade, mas Sua bondade abriga os fiéis.', citacao: '«O Senhor é bom, uma fortaleza no dia da angústia; conhece os que nEle confiam.»' },
    ],
  },
  {
    livro: 'so', capitulo: 3, versiculo: 17,
    tema: 'Deus se alegra sobre Seu povo',
    contexto: 'Sofonias anuncia que o Senhor, no meio de Seu povo, se regozijará com amor.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Amor de Deus', resumo: 'O Deus santo não apenas perdoa, mas se deleita em Seu povo redimido.', citacao: '«Regozijar-se-á em ti com alegria; retomará o Seu amor em silêncio.»' },
    ],
  },
  {
    livro: 'ag', capitulo: 1, versiculo: 5,
    tema: 'Considerai os vossos caminhos',
    contexto: 'Ageu exorta o povo a refletir sobre suas prioridades e a reconstruir o templo de Deus.',
    interpretacoes: [
      { teologo: 'Ageu (trad.)', periodo: 'Séc. VI a.C.', tradicao: 'Bíblica', visao: 'Exortação', resumo: 'A escassez do povo reflete ter deixado a casa de Deus em segundo lugar.', citacao: '«Considerai os vossos caminhos: semeais muito e recolheis pouco.»' },
    ],
  },
  {
    livro: '2co', capitulo: 5, versiculo: 17,
    tema: 'Nova criatura em Cristo',
    contexto: 'Paulo declara que quem está em Cristo é nova criatura; as coisas velhas passaram.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Regeneração', resumo: 'A união com Cristo produz uma nova criação real; a identidade antiga é substituída.', citacao: '«Se alguém está em Cristo, nova criatura é; as coisas velhas já passaram.»' },
      { teologo: 'Agostinho', periodo: '354-430', tradicao: 'Patrística', visao: 'Renovação', resumo: 'A graça transforma a natureza do crente de dentro para fora.', citacao: '«Quem te criou sem ti não te justificará sem ti; mas tu colaboras pela graça.»' },
    ],
  },
  {
    livro: '2co', capitulo: 12, versiculo: 9,
    tema: 'A graça basta, o poder na fraqueza',
    contexto: 'Deus responde a Paulo que Sua graça basta, e o poder se aperfeiçoa na fraqueza.',
    interpretacoes: [
      { teologo: 'Paulo (trad.)', periodo: 'Séc. I d.C.', tradicao: 'Bíblica', visao: 'Dependência', resumo: 'A fraqueza é o lugar onde a força de Cristo se manifesta plenamente.', citacao: '«A Minha graça te basta, porque o poder se aperfeiçoa na fraqueza.»' },
      { teologo: 'Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Consolo', resumo: 'O crente não precisa temer a fraqueza, pois nela habita o poder de Cristo.', citacao: '«Quando estou fraco, então sou forte, porque Cristo me sustenta.»' },
    ],
  },
  {
    livro: '2ts', capitulo: 3, versiculo: 16,
    tema: 'O Senhor da paz dá paz',
    contexto: 'Paulo encerra pedindo que o Senhor da paz conceda paz em todo tempo e modo.',
    interpretacoes: [
      { teologo: 'João Crisóstomo', periodo: '349-407', tradicao: 'Patrística Oriental', visao: 'Paz', resumo: 'A paz de Cristo guarda a igreja em meio a perseguição e incerteza.', citacao: '«O Senhor da paz vos dê sempre a paz por todos os modos.»' },
    ],
  },
  {
    livro: 'fm', capitulo: 1, versiculo: 6,
    tema: 'A comunicação da fé',
    contexto: 'Paulo louva a fé de Filemom que se torna ativa em benefício dos santos.',
    interpretacoes: [
      { teologo: 'João Crisóstomo', periodo: '349-407', tradicao: 'Patrística Oriental', visao: 'Fraternidade', resumo: 'A fé genuína se comunica em ações de amor e reconciliação prática.', citacao: '«A comunicação da tua fé se torne eficaz no conhecimento de todo o bem.»' },
    ],
  },
  {
    livro: 'jd', capitulo: 1, versiculo: 3,
    tema: 'Combater pela fé uma vez entregue',
    contexto: 'Judas exorta a contenderem pela fé que foi entregue aos santos de uma vez por todas.',
    interpretacoes: [
      { teologo: 'Judas (trad.)', periodo: 'Séc. I d.C.', tradicao: 'Bíblica', visao: 'Ortodoxia', resumo: 'A doutrina apostólica é fixa e definitiva; deve ser defendida contra falsos mestres.', citacao: '«Contendei pela fé que uma vez foi dada aos santos.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Sola Scriptura', resumo: 'A Palavra entregue é a regra invariável; a igreja a guarda, não a reinventa.', citacao: '«A fé foi entregue de uma vez; não cabe acrescentar nem tirar.»' },
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

// ═══════════════════════════════════════════════════════════════════════
// MAIS ESTUDOS — VERSÍCLOS ESSENCIAIS DO NT E AT
// ═══════════════════════════════════════════════════════════════════════

const estudosExtras: EstudoVersiculo[] = [
  {
    livro: 'sl', capitulo: 23, versiculo: 1,
    tema: 'Deus como Pastor',
    contexto: 'O salmo mais conhecido da Bíblia, atribuído a Davi, expressa confiança absoluta em Deus como pastor cuidadoso.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Alegórico-pastoral', resumo: 'Cristo é o bom pastor que nos guia pelos caminhos da justiça. O vale da sombra da morte é a provação terrena.', citacao: '«O Senhor é o meu pastor — nisto reconheço o que possuo e o que não possuo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Cristológico', resumo: 'Davi experimentou Deus como pastor em todas as circunstâncias da vida. A provisão divina é completa — nada falta ao que está em Cristo.', citacao: '«Davi não fala de si mesmo, mas de todos os fiéis que buscam proteção em Deus.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático-devocional', resumo: 'O salmo é um testemunho pessoal. Cada palavra é carregada de experiência vivida. Não é teologia abstrata — é fé provada.', citacao: '«Este salmo é a joia da Escritura — um colar de pérolas espirituais.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 119, versiculo: 105,
    tema: 'A Palavra como lâmpada',
    contexto: 'O maior salmo da Bíblia, um poema acróstico sobre a excelência da Palavra de Deus.',
    interpretacoes: [
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Sola Scriptura', resumo: 'A Palavra de Deus é a única luz segura para a jornada da vida. Fora dela, o homem tropeça na escuridão.', citacao: '«A Palavra de Deus é a lâmpada que ilumina o caminho do fiel na escuridão deste mundo.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Autoridade bíblica', resumo: 'A Escritura é a única regra de fé e prática. O cristão não precisa de tradições humanas — basta a Palavra de Deus.', citacao: '«Uma simples leitura da Palavra de Deus é mais útil do que todos osCommentários dos Padres.»' },
    ],
  },
  {
    livro: 'pv', capitulo: 9, versiculo: 10,
    tema: 'O princípio da sabedoria',
    contexto: 'O livro de Provérbios estabelece que o temor do Senhor é o fundamento de toda sabedoria.',
    interpretacoes: [
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Sapiencial', resumo: 'O temor do Senhor não é escravidão, mas reverência filial. A sabedoria verdadeira começa no reconhecimento da soberania divina.', citacao: '«O temor do Senhor é o princípio da sabedoria porque nos ordena a Deus como fim último.»' },
      { teologo: 'John Owen', periodo: '1616-1683', tradicao: 'Puritano', visao: 'Puritano', resumo: 'Sem o temor de Deus, toda sabedoria humana é loucura diante dEle. A verdadeira sabedoria é conhecimento prático de Deus.', citacao: '«A sabedoria do mundo é loucura diante de Deus; mas o temor do Senhor é sabedoria eterna.»' },
    ],
  },
  {
    livro: 'is', capitulo: 53, versiculo: 5,
    tema: 'O Servo Sofrido',
    contexto: 'A profecia messiânica mais clara do Antigo Testamento, predizendo o sofrimento e a morte expiatória do Messias.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Tipológico', resumo: 'Isaías via adiante o Servo do Senhor que tomaria sobre Si as enfermidades do povo. Cada ferida é uma lição de redenção.', citacao: '«Ele foi ferido pelas nossas transgressões — nele vemos o preço da nossa salvação.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Substituição', resumo: 'Cristo tomou sobre Si o castigo que merecíamos. A justiça de Deus se satisfaz plenamente na cruz. Não há nada a acrescentar.', citacao: '«As nossas transgressões foram postas sobre Ele — Ele é o cordeiro de Deus que tira o pecado do mundo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Expiação indefinida', resumo: 'A expiação de Cristo é suficiente para todos e eficaz para os eleitos. As feridas do Servo são a base de toda a salvação.', citacao: '«A multidão das nossas transgressões seria insuportável, mas Deus as pôs sobre o seu Filho.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Substitucionária', resumo: 'A cruz não é acidente — é o eterno propósito de Deus. Cristo morreu por nós, no nosso lugar, pagando o que devíamos.', citacao: '«A substituição é o âmago do evangelho: Ele morreu por nós.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 1, versiculo: 23,
    tema: 'Emmanuel — Deus conosco',
    contexto: 'Mateus cita Isaías para provar que o nascimento de Jesus é cumprimento profético.',
    interpretacoes: [
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Encarnação', resumo: 'O nome Emmanuel significa que Deus Se fez homem para habitar conosco. A encarnação é o mistério central da fé.', citacao: '«Deus Se fez homem para que o homem pudesse se tornar, por graça, participationário da natureza divina.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação', resumo: 'Emmanuel é o resumo de toda a cristologia. Em Jesus, Deus e homem se encontram — não em abstração, mas na história.', citacao: '«Emmanuel — Deus conosco — é o único conteúdo da fé cristã.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 1, versiculo: 1,
    tema: 'O Logos eterno',
    contexto: 'O prólogo do Evangelho de João estabelece a pré-existência e a divindade de Cristo como o Logos eterno.',
    interpretacoes: [
      { teologo: 'Orígenes', periodo: '185-254 d.C.', tradicao: 'Patrística', visao: 'Logos cósmico', resumo: 'O Logos é o princípio racional do universo. Ele preexiste a toda criação e é a fonte de toda verdade e bondade.', citacao: '«O Logos é anterior a toda criação — Ele é o princípio de todas as coisas.»' },
      { teologo: 'Atanásio', periodo: '296-373 d.C.', tradicao: 'Patrística', visao: 'Homousios', resumo: 'João 1:1 é a declaração mais clara da divindade de Cristo. «Deus era o Verbo» — não «um deus», mas o próprio Deus.', citacao: '«O Verbo era Deus — não uma criatura, não um ser menor, mas o próprio Deus.»' },
      { teologo: 'Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Trinitário', resumo: 'O Logos é o Filho eterno do Pai. No princípio era — não começou a existir. É coeterno e consubstancial com o Pai.', citacao: '«O Verbo era Deus — não começou a ser, mas era desde toda a eternidade.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Cristologia reformada', resumo: 'João destrói todas as heresias cristológicas de uma vez. O Verbo é Deus pleno — não parte de Deus, mas todo Deus.', citacao: '«Nunca houve tempo em que o Filho não existisse — Ele é eterno como o Pai.»' },
      { teologo: 'Leon Morris', periodo: '1914-2006', tradicao: 'Evangélica', visao: 'Joanino', resumo: 'O Logos é a chave de todo o Evangelho de João. Cristo é a Palavra de Deus para a humanidade — a revelação perfeita.', citacao: '«O Logos de João é Cristo — a Palavra eterna de Deus encarnada para nos revelar o Pai.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 3, versiculo: 16,
    tema: 'O versículo mais amado',
    contexto: 'A declaração mais conhecida do evangelho cristão, resumindo o amor de Deus e o plano de salvação.',
    interpretacoes: [
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola fide', resumo: 'Deus amou tanto o mundo que deu o Seu Filho. A salvação é dom gratuito — não se compra, não se merece. A fé é o meio de recebê-la.', citacao: '«Deus amou o mundo de tal maneira — isto é o evangelho em uma frase.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eleição', resumo: 'O amor de Deus se manifesta na eleição eterna. O mundo é amado não por mérito, mas pela graça soberana de Deus.', citacao: '«Não amamos a Deus porque Ele nos amou primeiro — mas Ele nos amou porque é amor.»' },
      { teologo: 'C.S. Lewis', periodo: '1898-1963', tradicao: 'Anglicana', visao: 'Apologetical', resumo: 'Este versículo é a chave de toda a Escritura. Deus não é indiferente — Ele age pelo amor. A cruz é a prova suprema.', citacao: '«O cristianismo, se for falso, é de pouca importância; mas se for verdade, é de importância infinita.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 14, versiculo: 6,
    tema: 'Cristo é o caminho',
    contexto: 'Jesus declara ser o único caminho para o Pai, a verdade e a vida — a exclusividade cristã.',
    interpretacoes: [
      { teologo: 'Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Exclusividade', resumo: 'Não há caminhos múltiplos para Deus — há um só caminho, uma só verdade, uma só vida. Cristo é tudo.', citacao: '«Ninguém vem ao Pai senão por Cristo — não há outro nome debaixo do céu.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Pluralismo crítico', resumo: 'A exclusividade de Cristo não é arrogância — é verdade. Não há salvação em nenhum outro nome.', citacao: '«Cristo não é um dos muitos caminhos — é o único caminho para o Pai.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 5, versiculo: 8,
    tema: 'Deus prova Seu amor',
    contexto: 'Paulo declara que Deus demonstra Seu amor pela humanidade ao morrer Cristo por nós quando ainda éramos pecadores.',
    interpretacoes: [
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Justificação', resumo: 'Deus nos amou quando éramos pecadores — não quando éramos dignos. A justificação é um ato de graça absoluta.', citacao: '«Deus nos justifica enquanto pecadores — é o grande mistério da graça.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça soberana', resumo: 'A cruz é a prova suprema do amor de Deus. Não é uma resposta ao nosso mérito, mas uma demonstração de Sua bondade.', citacao: '«Deus nos amou quando éramos pecadores — este é o evangelho em sua pureza.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 8, versiculo: 28,
    tema: 'Tudo coopera para o bem',
    contexto: 'Paulo afirma que todas as coisas cooperam para o bem daqueles que amam a Deus e são chamados conforme Seu propósito.',
    interpretacoes: [
      { teologo: 'Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Providência', resumo: 'Deus governa todas as coisas com sabedoria perfeita. Até o mal é usado por Ele para cumprir Seus propósitos bons.', citacao: '«Deus permite o mal, mas dele tira um bem maior.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'A soberania de Deus é absoluta. Nada acontece fora do Seu controle. Tudo — até as tribulações — serve ao propósito divino.', citacao: '«Tudo o que Deus faz é bom, justo e sábio — mesmo quando não entendemos.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 12, versiculo: 2,
    tema: 'Renovação da mente',
    contexto: 'Paulo exorta os cristãos a não se conformarem com este mundo, mas a serem transformados pela renovação da mente.',
    interpretacoes: [
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Santificação', resumo: 'A santificação começa na mente. Quando pensamos como Deus pensa, começamos a viver como Deus quer.', citacao: '«A renovação da mente é a fonte de toda a vida cristã.»' },
      { teologo: 'Dallas Willard', periodo: '1935-2013', tradicao: 'Evangélica', visao: 'Discipulado', resumo: 'A transformação não é exterior — é interior. A mente renovada produz uma vida renovada. O discipulado é um processo de mudança mental.', citacao: '«O segredo do discipulado é a transformação da mente.»' },
    ],
  },
  {
    livro: '1co', capitulo: 13, versiculo: 4,
    tema: 'Definição do amor',
    contexto: 'O hino ao amor de Paulo, o texto mais lido em casamentos, define o amor como paciência, bondade e perseverança.',
    interpretacoes: [
      { teologo: 'Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Caridade', resumo: 'O amor é a virtude que une tudo. Sem amor, nada importa — nem profecias, nem milagres, nem conhecimento.', citacao: '«O amor é o vínculo da perfeição — sem ele, nada temos de valor.»' },
      { teologo: 'C.S. Lewis', periodo: '1898-1963', tradicao: 'Anglicana', visao: 'Amor divino', resumo: 'O amor de 1 Coríntios 13 não é sentimental — é uma decisão. É querer o bem do outro, mesmo quando é difícil.', citacao: '«O amor não é um sentimento — é uma decisão de buscar o bem do outro.»' },
    ],
  },
  {
    livro: 'ef', capitulo: 2, versiculo: 8,
    tema: 'Salvação pela graça',
    contexto: 'Paulo declara que a salvação é pela graça de Deus, por meio da fé, e não por obras humanas.',
    interpretacoes: [
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola gratia', resumo: 'A salvação é um dom gratuito de Deus. Não é mérito humano — é graça pura. A fé é o meio pelo qual recebemos este dom.', citacao: '«Somos salvos pela graça, pela fé — não por obras, para que ninguém se glorie.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça soberana', resumo: 'Até a fé é um dom de Deus. Ninguém pode crer por si mesmo — Deus opera o querer e o efetuar em nós.', citacao: '«A fé é dom de Deus — não mérito do homem.»' },
      { teologo: 'John Wesley', periodo: '1703-1791', tradicao: 'Metodista', visao: 'Graça preveniente', resumo: 'A graça precede a fé — Deus já está agindo antes de decidirmos crer. A salvação é graça do início ao fim.', citacao: '«A graça de Deus nos antecipa, nos convence e nos sustenta.»' },
    ],
  },
  {
    livro: 'fp', capitulo: 2, versiculo: 6,
    tema: 'Hinos cristológicos',
    contexto: 'O hino cristológico mais antigo, descrevendo a Kenosis — o esvaziamento voluntário de Cristo.',
    interpretacoes: [
      { teologo: 'Atanásio', periodo: '296-373 d.C.', tradicao: 'Patrística', visao: 'Kenosis', resumo: 'Cristo não reivindicou Seus direitos divinos, mas Se esvaziou para servir. A humilhação é a forma do amor divino.', citacao: '«O Verbo Se fez carne — não por necessidade, mas por amor.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Cristologia descendente', resumo: 'A Kenosis é o paradoxo central: Deus Se faz servo. O poder de Deus se manifesta na fraqueza.', citacao: '«Deus se humilha — e nessa humilhação está o Seu poder supremo.»' },
    ],
  },
  {
    livro: 'hb', capitulo: 11, versiculo: 1,
    tema: 'A fé é certeza',
    contexto: 'O "Hall da Fé" de Hebreus define a fé como certeza das coisas que se esperam e prova das que não se veem.',
    interpretacoes: [
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Fé e razão', resumo: 'A fé não é cegueira — é certeza fundada na verdade de Deus. A razão prepara o terreno, mas a fé é o ato de adesão.', citacao: '«A fé é o início de toda a vida eterna em nós.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Fiducia', resumo: 'A fé verdadeira não é apenas conhecimento (notitia), mas também confiança pessoal (fiducia). Crer é confiar em Cristo.', citacao: '«A fé é um conhecimento firme da bondade de Deus para conosco.»' },
    ],
  },
  {
    livro: '1pe', capitulo: 2, versiculo: 9,
    tema: 'Sacerdócio real',
    contexto: 'Pedro aplica a linguagem do AT sobre Israel à Igreja — somos sacerdócio real, nação santa.',
    interpretacoes: [
      { teologo: 'Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Igreja', resumo: 'A Igreja é o novo Israel espiritual. Todo crente é sacerdote — não precisa de mediação humana para acessar Deus.', citacao: '«Somos todos sacerdotes — cada fiel pode se aproximar de Deus diretamente.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sacerdócio de todos os crentes', resumo: 'Todo cristão é sacerdote — não há distinção entre clérigos e leigos. Todos têm acesso direto a Deus pela fé.', citacao: '«Todo cristão é sacerdote — todos podem pregar, ensinar e interceder.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 21, versiculo: 4,
    tema: 'Nova criação',
    contexto: 'A promessa final da Bíblia — Deus enxergará toda lágrima e não haverá mais morte nem luto.',
    interpretacoes: [
      { teologo: 'Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Escatologia', resumo: 'A nova Jerusalém é a culminação de toda a história da redenção. Deus habitará com os homens para sempre.', citacao: '«A cidade de Deus é o destino final de todos os que creem — a paz eterna.»' },
      { teologo: 'Jürgen Moltmann', periodo: '1926-2024', tradicao: 'Teologia da Esperança', visao: 'Eschaton', resumo: 'A esperança cristã não é fuga do mundo — é transformação de todas as coisas. A nova criação é a ressurreição da terra.', citacao: '«A esperança não é otimismo — é certeza de que Deus restaurará todas as coisas.»' },
    ],
  },
  {
    livro: 'gn', capitulo: 12, versiculo: 2,
    tema: 'A aliança com Abraão',
    contexto: 'Deus chama Abraão para sair de sua terra e promete fazer dele uma grande nação.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Aliança', resumo: 'A aliança com Abraão é o início do plano redentor. As promessas são gratuitas e incondicionais.', citacao: '«Deus fez uma aliança gratuita com Abraão — sem merecimento, sem condição.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Nova Perspectiva', visao: 'Missional', resumo: 'Abraão é chamado para ser bênção para todas as nações. A história de Israel tem um propósito missional cósmico.', citacao: '«Em ti serão benditas todas as famílias da terra — esta é a missão de Israel.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 28, versiculo: 19,
    tema: 'A Grande Comissão',
    contexto: 'Jesus ordena que seus discípulos façam discípulos de todas as nações, batizando-os no nome da Trindade.',
    interpretacoes: [
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Missões', resumo: 'A Grande Comissão é o mandamento final de Cristo. A Igreja existe para fazer discípulos — este é o propósito supremo.', citacao: '«A missão da Igreja é fazer discípulos — ensinando, batizando e obedecendo a tudo o que Cristo ordenou.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Missões', resumo: 'A missão não é opcional — é essencial. A Igreja não tem missão — a missão tem Igreja.', citacao: '«A Igreja existe para a missão — sem missão, não existe Igreja.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // AMÓS — JUSTIÇA SOCIAL
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'am', capitulo: 3, versiculo: 2,
    tema: 'Eleição e responsabilidade',
    contexto: 'Amós dirigiu-se a Israel no auge de sua prosperidade, lembrando que a eleição não traz privilégio mas responsabilidade diante de Deus.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Eleição', resumo: 'Deus escolheu Israel não por mérito, mas por graça. A eleição traz responsabilidade — quanto mais se conhece a vontade de Deus, maior a condenação ao desobedecer.', citacao: '«A vocação de Israel é um dom, não um prêmio — e com ela veio o dever de santidade.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania divina', resumo: 'A eleição não é imunidade ao julgamento. Deus julga com mais severidade aqueles que receberam mais revelação. O privilégio espiritual aumenta a responsabilidade.', citacao: '«Deus não tolera que seus próprios escolhidos abusem de Sua bondade impunemente.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Eleição cristológica', resumo: 'A eleição de Israel aponta para Cristo — o verdadeiro Eleito. Em Jesus, Deus e a humanidade são reconciliados. A eleição não exclui, mas inclui todas as nações.', citacao: '«A eleição de Israel é o caminho histórico para a eleição universal em Jesus Cristo.»' },
    ],
  },
  {
    livro: 'am', capitulo: 5, versiculo: 24,
    tema: 'Justiça como rio caudaloso',
    contexto: 'Amós clama por justiça que flua como águas que não cessam — a religião sem justiça social é abominação para Deus.',
    interpretacoes: [
      { teologo: 'Martin Luther King Jr.', periodo: '1929-1968', tradicao: 'Batista', visao: 'Justiça social', resumo: 'Este versículo é o fundamento bíblico do movimento pelos direitos civis. A justiça não é luxo — é necessidade urgente e contínua.', citacao: '«Devemos insistir na justiça como um rio caudaloso — fluindo sem descanso.»' },
      { teologo: 'Gustavo Gutiérrez', periodo: '1928-2024', tradicao: 'Teologia da Libertação', visao: 'Liberdade', resumo: 'Deus está do lado dos oprimidos. A justiça não é caridade — é direito. A Igreja deve denunciar as estruturas de pecado que mantêm a desigualdade.', citacao: '«A opção pelos pobres não é preferência ideológica — é exigência profética.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Cidade justa', resumo: 'A justiça bíblica vai além da caridade — ela confronta as causas sistêmicas da opressão. A Igreja deve buscar a justiça em todas as esferas da sociedade.', citacao: '«A justiça não é apenas dar esmolas — é reformar as estruturas que destroem vidas.»' },
    ],
  },
  {
    livro: 'am', capitulo: 6, versiculo: 4,
    tema: 'Condenação dos opulentos',
    contexto: 'Amós denuncia a elite de Israel que vive em luxo enquanto o povo sofre — religião e prosperidade não substituem a justiça.',
    interpretacoes: [
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Confessante', visao: 'Custo da graça', resumo: 'A graça barata permite que os ricos durmam em leitos de marfim enquanto os pobres passam fome. O discípulo verdadeiro compartilha o sofrimento do próximo.', citacao: '«A graça barata é a graça que beneficia a si mesma — a graça custosa custa a vida do homem.»' },
      { teologo: 'José Míguez Bonino', periodo: '1924-2014', tradicao: 'Teologia da Libertação', visao: 'Comunitário', resumo: 'A injustiça não é apenas individual mas estrutural. A denúncia profética de Amós se aplica a qualquer sistema econômico que marginaliza os pobres.', citacao: '«O pecado social é mais grave que o individual porque afeta comunidades inteiras.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Nova Perspectiva', visao: 'Reino de Deus', resumo: 'A justiça do Reino de Deus é integral — abrange o bem-estar físico e espiritual. Deus não separa religião de justiça social.', citacao: '«O Deus bíblico se importa com corpos famintos tanto quanto com almas perdidas.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // HABACUQUE — FÉ E JUSTIÇA
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'hc', capitulo: 2, versiculo: 4,
    tema: 'O justo viverá pela fé',
    contexto: 'Habacuque recebe a resposta divina: o orgulhoso não tem reta alma, mas o justo viverá pela sua fé — versículo central da teologia reformada.',
    interpretacoes: [
      { teologo: 'São Paulo', periodo: '~55 d.C.', tradicao: 'Apostólica', visao: 'Sola fide', resumo: 'Paulo cita Habacuque 2:4 em Romanos 1:17 e Gálatas 3:11 para fundamentar a doutrina da justificação pela fé. A fé é o meio pelo qual o homem justo recebe a vida de Deus.', citacao: '«O justo viverá pela fé — não pelas obras da lei, mas pela confiança em Deus.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola fide', resumo: 'Este versículo foi a pedra angular da Reforma. Lutero entendeu que o justo não é quem obedece perfeitamente, mas quem confia em Deus apesar de suas falhas.', citacao: '«Esta frase me abriu as portas do céu — o justo viverá pela fé, não pelas obras.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Justificação', resumo: 'A fé é o instrumento pelo qual recebemos a justiça de Cristo. Não é uma fé morta, mas viva e ativa — produz frutos, mas não os merece.', citacao: '«A fé justificante não está sozinha — sempre vem acompanhada de arrependimento e santificação.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Nova Perspectiva', visao: 'Fé como lealdade', resumo: 'No contexto original hebraico, fé (emunah) significa lealdade e fidelidade. O justo viverá mantendo aliança — não apenas crendo, mas perseverando em fidelidade.', citacao: '«A fé bíblica não é apenas crença mental — é lealdade实践 ao Deus da aliança.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Gospel', resumo: 'A fé é receber o que não merecemos — a justiça de Cristo. É humildade radical: reconhecer que nada podemos fazer para nos salvar.', citacao: '«A fé é as mãos vazias que recebem o dom gratuito de Deus.»' },
    ],
  },
  {
    livro: 'hc', capitulo: 1, versiculo: 2,
    tema: 'A queixa contra a injustiça',
    contexto: 'Habacuque questiona Deus por permitir a violência e a injustiça — um salmo de lamento profético que expressa a dor diante do silêncio divino.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Providência', resumo: 'Deus permite o mal para um bem maior. O lamento profético não é falta de fé — é expressão de uma fé que busca compreender os caminhos de Deus.', citacao: '«O grito do profeta é a voz de todos os que sofrem injustiça e clamam por justiça divina.»' },
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Confessante', visao: 'Custo da graça', resumo: 'O cristão não pode ser indiferente à injustiça. Habacuque mostra que questionar Deus é parte da fé — o que Deus não tolera é a indiferença diante do mal.', citacao: '«Quem clama contra a injustiça está mais perto de Deus do que quem se cala.»' },
      { teologo: 'Jürgen Moltmann', periodo: '1926-2024', tradicao: 'Teologia da Esperança', visao: 'Teodiceia', resumo: 'O lamento profético é uma forma legítima de oração. Deus não é indiferente ao sofrimento — Ele mesmo sofre conosco na história.', citacao: '«O Deus crucificado é o Deus que sofre com os oprimidos e contra os opressores.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // ROMANOS — DOUTRINA CENTRAL DA FÉ
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'rm', capitulo: 5, versiculo: 8,
    tema: 'O amor de Deus na cruz',
    contexto: 'Paulo revela a prova suprema do amor de Deus: Cristo morreu por nós quando ainda éramos pecadores — não por nossos méritos, mas por Sua graça.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Graça', resumo: 'O amor de Deus não é resposta à nossa bondade — é a origem da nossa salvação. Deus nos amou quando éramos inimigos, e esta é a essência da graça.', citacao: '«Deus nos amou quando éramos pecadores — não para que nos tornássemos pecadores, mas para nos tornar justos.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Substituição', resumo: 'A cruz é a manifestação máxima do amor divino. Cristo tomou sobre Si a ira que merecíamos, substituindo-nos perfeitamente.', citacao: '«Deus não nos amou porque éramos dignos — nos tornamos dignos porque Deus nos amou.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Expiação', resumo: 'A morte de Cristo não é apenas exemplo — é sacrifício expiatório. Deus demonstra Seu amor ao satisfazer Sua própria justiça na cruz.', citacao: '«A morte de Cristo é a demonstração mais clara de que Deus é amor e justiça ao mesmo tempo.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Substituição', resumo: 'O versículo condensa todo o evangelho: Deus nos amou, Cristo morreu, éramos pecadores. A cruz não é acidente — é o plano eterno de Deus.', citacao: '«A cruz é o ponto culminante da história — onde amor e justiça se encontram.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Gospel', resumo: 'O amor de Deus não depende da performance humana. Isso liberta do desempenho e da culpa — somos amados não pelo que fazemos, mas pelo que Cristo fez por nós.', citacao: '«O evangelho não é: eu amo Deus — é: Deus me amou primeiro.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 8, versiculo: 28,
    tema: 'Tudo coopera para o bem',
    contexto: 'Paulo assegura que todas as coisas — até o sofrimento — cooperam para o bem daqueles que amam a Deus e são chamados segundo o Seu propósito.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Providência', resumo: 'Deus permite o mal para tirar dele um bem maior. A providência divina governa todas as coisas, mesmo aquelas que não compreendemos.', citacao: '«Deus permite o mal para um bem maior que não poderia existir sem ele.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Providência', resumo: 'A providência de Deus não elimina o livre-arbítrio — Ele governa as coisas de modo a usar até as escolhas humanas para Seus propósitos.', citacao: '«Deus governa todas as coisas de modo indireto — permitindo que as causas secundárias ajam livremente.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Nada acontece por acidente. A soberania de Deus é absoluta — Ele governa até as catástrofes para cumprir Seus propósitos de amor.', citacao: '«A providência de Deus se estende até os menores detalhes da vida humana.»' },
      { teologo: 'C.S. Lewis', periodo: '1898-1963', tradicao: 'Anglicana', visao: 'O maior conto', resumo: 'Deus é como um autor que escreve a história mais bela usando até os capítulos mais sombrios. O sofrimento não é o fim — é parte da narrativa redentora.', citacao: '«Deus supreendentemente nos conta a história mais bela possível — mesmo usando os capítulos que preferiríamos pular.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Gospel', resumo: 'Este versículo não é um clichê — é a promessa de que Deus não desperdiça nenhuma dor. Ele transforma sofrimento em caráter, e características em glória.', citacao: '«Deus não causa o mal, mas Ele o governa e o transforma para nosso bem.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 8, versiculo: 31,
    tema: 'Deus por nós',
    contexto: 'Paulo chega ao clímax da argumentação: se Deus é por nós, quem será contra nós? — a segurança final do crente.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Triunfo', resumo: 'Nenhuma força criada pode derrotar aquele que Deus defende. A segurança do crente não está em suas capacidades, mas no poder de Deus por ele.', citacao: '«Se Deus é por nós, toda a criação não pode contra nós — porque Deus é maior que a criação.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Coram Deo', resumo: 'O crente está diante de Deus e seguro. Nenhum acusador — nem Satanás, nem a lei, nem a consciência — pode condenar quem está em Cristo.', citacao: '«Diante de Deus, somos justos — não porque não pecamos, mas porque Cristo cobriu nossos pecados.»' },
      { teologo: 'John Murray', periodo: '1898-1975', tradicao: 'Reformada', visao: 'Segurança', resumo: 'A pergunta é retórica — não há ninguém que possa derrotar o crente. Deus não apenas é conosco — Ele é por nós, comprometido com nossa salvação.', citacao: '«A segurança do crente está no caráter imutável de Deus — Ele não abandona o que começou.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 12, versiculo: 1,
    tema: 'Oferecer o corpo em sacrifício',
    contexto: 'Paulo faz a transição da doutrina para a prática — a resposta à graça é a entrega total da vida como culto vivo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Culto interior', resumo: 'O sacrifício aceitável não é animal — é a vida inteira do crente. A adoração verdadeira começa na mente renovada e se expressa em ação.', citacao: '«O sacrifício que Deus pede é um coração quebrantado e humilhado — não sacrifícios externos.»' },
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Confessante', visao: 'Graça barata', resumo: 'A graça custosa exige tudo — não apenas palavras, mas a vida inteira. O discípulo que não conta o custo não é digno de Cristo.', citacao: '«A graça barata é a graça que beneficia a si mesma — a graça custosa custa a vida do homem.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Vida cristã', resumo: 'A adoração não é apenas música — é uma vida inteira oferecida a Deus. O corpo inclui mente, vontade e emoções — tudo deve ser consagrado.', citacao: '«A adoração é a resposta total da criatura ao Criador — corpo e alma.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 12, versiculo: 2,
    tema: 'Renovação da mente',
    contexto: 'Paulo ordena que não nos conformemos com este mundo, mas que nos transformemos pela renovação da mente — mudança interior que produz transformação exterior.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Conversão', resumo: 'A conversão é antes de tudo uma mudança mental — a mente que estava cega para Deus é iluminada pela graça. A renovação é progressiva.', citacao: '«O amor ordena: não te conformes com este mundo — pensa de modo diferente para viver de modo diferente.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Mente renovada', resumo: 'Arenovação da mente é o início da santificação. O cristão deve examinar tudo pelo filtro da Escritura, não pela cultura dominante.', citacao: '«A mente renovada pela Palavra de Deus é o instrumento pelo qual discernimos a vontade de Deus.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Gospel', resumo: 'A cultura sempre tenta nos conformar. A mente renovada pelo evangelho resiste a esta pressão — não por legalismo, mas por uma nova identidade em Cristo.', citacao: '«Não basta resistir à cultura — é preciso ser transformado por algo maior: o evangelho.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 13, versiculo: 1,
    tema: 'Submissão às autoridades',
    contexto: 'Paulo instrui os cristãos a se submeterem às autoridades governamentais — toda autoridade vem de Deus.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Ordem social', resumo: 'A autoridade civil é uma concessão divina para conter o pecado. Sem governo, o mundo mergulharia no caos.', citacao: '«A autoridade é necessária para manter a ordem — sem ela, o pecado se multiplica sem limite.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Magistrados', resumo: 'Deus governa o mundo através de magistrados. Submeter-se à autoridade é submeter-se a Deus — mas quando a autoridade ordena contra Deus, a obediência a Deus tem prioridade.', citacao: '«Devemos obedecer aos magistrados como ministros de Deus — mas Deus deve ser obedecido em primeiro lugar.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Cidadania', resumo: 'O cristão é cidadão de dois reinos — o terrestre e o celestial. A submissão às autoridades é parte da responsabilidade cidadã, não obediência absoluta.', citacao: '«O cristão deve ser o melhor cidadão — submisso às leis, mas leal a Cristo acima de tudo.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 16, versiculo: 1,
    tema: 'Recomendação de Febe',
    contexto: 'Paulo recomenda Febe, diaconisa da igreja em Cêncreia — evidência do papel ativo das mulheres na igreja primitiva.',
    interpretacoes: [
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Nova Perspectiva', visao: 'Igualdade', resumo: 'Febe é chamada de diaconisa (diákonos) e protetora (prostatis) — termos de liderança. As mulheres exerciam funções ministeriais na igreja primitiva.', citacao: '«Febe não era auxiliar — era líder. Paulo a recomenda como diáconisa e protetora da igreja.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Complementaridade', resumo: 'A igualdade fundamental dos sexos na criação se manifesta no ministério cristão. Em Cristo, não há masculino nem feminino — todos são um.', citacao: '«Em Cristo, a distinção entre homem e mulher não desaparece — mas é reconciliada.»' },
      { teologo: 'Catherine Mowry Cssalvatore', periodo: '1945-', tradicao: 'Feminista', visao: 'Inclusividade', resumo: 'O testemunho de Paulo sobre Febe desafia interpretações exclusivistas. A história da igreja mostra mulheres em todos os níveis de liderança.', citacao: '«Febe é prova de que as mulheres sempre estiveram no centro da missão cristã.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // EFÉSIOS — IGREJA E ARMADURA
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'ef', capitulo: 2, versiculo: 8,
    tema: 'Salvos pela graça pela fé',
    contexto: 'Paulo resume toda a doutrina da salvação: é dom de Deus, não resultado de obras — para que ninguém se glorie.',
    interpretacoes: [
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola gratia, sola fide', resumo: 'A salvação é 100% graça de Deus, recebida pela fé. Não há mérito humano — a fé é o meio, não o mérito. A salvação é completa em Cristo.', citacao: '«Somos salvos pela graça de Deus mediante a fé — não por nossos esforços, mas pelo dom de Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça irresistível', resumo: 'Até a fé é um dom de Deus — não é obra humana. A graça precede, capacita e sustenta a fé. O homem não pode se salvar por si mesmo.', citacao: '«A fé que crê na salvação também é dom de Deus — tudo vem dEle, tudo é por Ele, tudo é para Ele.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Evangelho', resumo: 'A salvação é composta de três dádivas: graça (o que Deus dá), fé (como recebemos) e salvação (o que ganhamos). Tudo é dom.', citacao: '«Graça é a dádiva suprema — é o que recebemos quando não merecemos nada.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Gospel', resumo: 'Se a salvação dependesse de nossas obras, nunca teríamos certeza. A graça免费 nos dá segurança — porque depende de Deus, não de nós.', citacao: '«O evangelho é a notícia de que Jesus morreu por mim — não que eu preciso fazer algo por Ele.»' },
    ],
  },
  {
    livro: 'ef', capitulo: 6, versiculo: 10,
    tema: 'A armadura de Deus',
    contexto: 'Paulo encerra a carta com a exortação à guerra espiritual — o crente deve revestir-se da armadura completa de Deus para enfrentar as forças do mal.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Guerra espiritual', resumo: 'A armadura é Cristo mesmo — cada peça representa uma virtude que recebemos Dele. A força vem de Deus, não de nós mesmos.', citacao: '«A armadura de Deus é Cristo — revestimo-Lo ao nos vestirmos Dele.»' },
      { teologo: 'Martin Luther', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola Scriptura', resumo: 'A Espada do Espírito é a Palavra de Deus — a única arma ofensiva. Lutero escreveu o hino "Uma Fortaleza é o nosso Deus" meditando neste texto.', citacao: '«A Palavra de Deus é a espada que corta todas as mentiras e acusações do inimigo.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Vida cristã', resumo: 'A guerra espiritual não é contra pessoas — é contra princípios e potestades. A armadura protege toda a pessoa: verdade, justiça, paz, fé, salvação e Palavra.', citacao: '«O inimigo não é carne e sangue — são as forças espirituais da maldade.»' },
      { teologo: 'C.S. Lewis', periodo: '1898-1963', tradicao: 'Anglicana', visao: 'Espiritual', resumo: 'A guerra espiritual é real, mas o resultado já está decidido. Cristo venceu na cruz — nós lutamos a partir da vitória, não por ela.', citacao: '«O inimigo é forte, mas já foi derrotado — nossa luta é a da celebração.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // HEBREUS — FÉ E PERSISTÊNCIA
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'hb', capitulo: 4, versiculo: 12,
    tema: 'A Palavra de Deus viva e eficaz',
    contexto: 'O autor de Hebreus descreve a Palavra de Deus como viva, eficaz, mais afiada que qualquer espada — penetra até os mais íntimos recessos da alma.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Eficácia', resumo: 'A Palavra de Deus não é texto morto — é voz viva de Deus que transforma, convence e regenera. Ela opera no coração com poder divino.', citacao: '«A Palavra de Deus é como o trovão de Deus — ressoa no coração e transforma a vida.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola Scriptura', resumo: 'A Escritura é mais poderosa que qualquer instituição humana. Ela julga, corrige e ensina — é a autoridade suprema da fé e da prática.', citacao: '«A Palavra de Deus não pode ser acorrentada — ela sempre encontra um caminho para o coração.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Iluminação', resumo: 'A Palavra exige iluminação do Espírito Santo para ser compreendida. Sem o Espírito, lemos letra morta. Com Ele, encontramos vida.', citacao: '«A Palavra de Deus é como o sol — precisa da luz do Espírito para ser vista.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Autoridade', resumo: 'A Palavra de Deus tem autoridade inegável — ela nos conhece melhor do que nós mesmos. Não podemos fugir dela.', citacao: '«A Palavra de Deus nos penetra — ela sabe o que há no mais profundo do coração.»' },
    ],
  },
  {
    livro: 'hb', capitulo: 11, versiculo: 1,
    tema: 'A fé é certeza',
    contexto: 'O "salmo da fé" do Novo Testamento — a fé é a certeza das coisas que se esperam, a convicção das coisas que se não veem.',
    interpretacoes: [
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Assentimento', resumo: 'A fé é um assentimento da mente movido pela vontade, sob a iluminação divina. Não é cegueira — é ver o invisível pela luz de Deus.', citacao: '«A fé é o início da vida eterna — nos faz ver o que ainda não vemos, mas já possuímos.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Fiducia', resumo: 'A fé verdadeira não é apenas conhecimento (notitia), mas também confiança pessoal (fiducia). Crer é confiar em Cristo.', citacao: '«A fé é um conhecimento firme da bondade de Deus para conosco.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Certezza', resumo: 'A fé não é probabilidade — é certeza. Não porque temos provas científicas, mas porque Deus é digno de confiança. Fé e dúvida são opostas.', citacao: '«A fé é uma convicção firme e segura da verdade de Deus — acima de toda incerteza humana.»' },
      { teologo: 'Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação', resumo: 'A fé é resposta à Palavra de Deus. Não é invenção humana — é Deus quem Se revela e chama. A fé é sempre dom, nunca conquista.', citacao: '«A fé é a mão aberta que recebe o que Deus dá — e o que Deus dá é Ele mesmo.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Nova Perspectiva', visao: 'Reino', resumo: 'A fé não é apenas crença individual — é lealdade ao Deus da aliança que está restaurando o mundo. Fé é participar do projeto de Deus.', citacao: '«A fé é confiar no Deus que está fazendo todas as coisas novas — e ser parte disso.»' },
    ],
  },
  {
    livro: 'hb', capitulo: 12, versiculo: 1,
    tema: 'A corrida da fé',
    contexto: 'O autor exorta os crentes a perseverarem, tendo como testemunhas os heróis da fé do capítulo 11 — uma cloud of witnesses.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Comunhão dos santos', resumo: 'Os santos que já partiram nos observam e nos incentivam. A comunhão dos santos não é apenas terrena — é celestial.', citacao: '«A multidão dos santos nos cerca — somos espectadores e corredores ao mesmo tempo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Perseverança', resumo: 'A corrida exige perseverança — não é para quem começa, mas para quem termina. Largamos o peso do pecado e corremos com olhos fixos em Cristo.', citacao: '«A perseverança é a marca dos verdadeiros crentes — eles correm até o fim.»' },
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Confessante', visao: 'Custo', resumo: 'A corrida da fé não é confortável — exige renúncia, sofrimento e perseverança. Mas o prêmio supera infinitamente o custo.', citacao: '«Quando Cristo chama um homem, Ele o chama para vir e morrer.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Perseverança', resumo: 'A vida cristã é uma corrida, não uma caminhada. Exige disciplina, foco e determinação. O alvo é Cristo — e só Ele.', citacao: '«Corramos com perseverança, olhando para Jesus — o autor e consumador da fé.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // 1 PEDRO — ESPERANÇA E RESISTÊNCIA
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: '1pe', capitulo: 3, versiculo: 15,
    tema: 'Defender a esperança',
    contexto: 'Pedro instrui os crentes a estarem sempre preparados para explicar sua fé — com mansidão e temor.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Apologética', resumo: 'A defesa da fé deve ser feita com amor e humildade. A arrogância destroi o testemunho — a mansidão abre corações.', citacao: '«A verdade deve ser dita com caridade — sem ela, a verdade se torna veneno.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Apologética', resumo: 'O crente deve conhecer sua fé e ser capaz de defendê-la. A apologética não é privilégio de teólogos — é dever de todo cristão.', citacao: '«Todo cristão deve ser capaz de dar razão de sua esperança — não por orgulho, mas por obediência.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Apologética cultural', resumo: 'A apologética moderna deve ser contextual — responder às perguntas reais das pessoas. A mansidão e o temor mostram que a fé não é fanatismo.', citacao: '«A melhor apologética é uma vida transformada — mas às vezes precisamos também de palavras.»' },
    ],
  },
  {
    livro: '1pe', capitulo: 5, versiculo: 8,
    tema: 'Vigiar contra o diabo',
    contexto: 'Pedro alerta: o diabo ronda como leão rugindo, buscando quem devorar — a vigilância é essencial.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Guerra espiritual', resumo: 'O diabo é real e perigoso — mas já foi derrotado por Cristo. A vigilância é necessária, mas o medo não.', citacao: '«O diabo rug como leão — mas Cristo é o Leão de Judá que o venceu.»' },
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Confessante', visao: 'Vigilância', resumo: 'A comunidade é o antídoto contra o diabo. Ele ataca o isolamento — a solidão espiritual é perigosa. Precisamos uns dos outros.', citacao: '«O diabo não entra onde a comunidade é forte — ele cisma, acusa e isola.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Vida cristã', resumo: 'Vigiar não é paranoia — é consciência. O crente não deve subestimar o inimigo nem superestimá-lo. A arma é a fé firme em Cristo.', citacao: '«Sejamos sóbrios e vigilantes — não porque temos medo, mas porque sabemos quem é o inimigo.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // TIAGO — FÉ E OBRAS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'tg', capitulo: 1, versiculo: 2,
    tema: 'Alegria nas tribulações',
    contexto: 'Tiago começa sua carta com um paradoxo: considerem puro gozo quando passarem por provações — porque a provação produz perseverança.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Provação', resumo: 'A provação é o teste da fé — assim como o ouro é provado pelo fogo. Deus permite as tribulações para nos aperfeiçoar.', citacao: '«A tribulação é o forno onde a fé é purificada — só sobra o que é genuíno.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Virtude', resumo: 'A perseverança é uma virtude que se fortalece com a prática. Quanto mais enfrentamos dificuldades, mais fortes nos tornamos na fé.', citacao: '«A perseverança é a virtude que nos mantém firmes diante do mal — e é fortalecida pelo exercício.»' },
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Confessante', visao: 'Custo', resumo: 'A alegria na tribulação não é masoquismo — é fé que confia no propósito de Deus mesmo quando não compreendemos.', citacao: '«Quando Cristo chama um homem, Ele o chama para vir e morrer — mas também para viver de modo novo.»' },
    ],
  },
  {
    livro: 'tg', capitulo: 2, versiculo: 14,
    tema: 'Fé sem obras é morta',
    contexto: 'Tiago enfrenta o antinomianismo: fé sem obras concretas de amor não salva — a fé verdadeira se manifesta em ação.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor', resumo: 'A fé verdadeira se expressa em amor. Fé sem obras é como um corpo sem alma — existe em teoria, mas não em realidade.', citacao: '«A fé que não ama não é fé — é conhecimento morto que não transforma a vida.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola fide', resumo: 'Lutero reconhecia que Tiago não contradiz Paulo — Paulo fala de obras da lei como meio de salvação, Tiago fala de obras de amor como fruto da fé.', citacao: '«Tiago não ensina obras para salvação — ensina que a fé verdadeira sempre produz frutos de amor.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Fé viva', resumo: 'A fé verdadeira é viva e ativa — produz frutos inevitavelmente. Uma fé que não produz obras não é fé — é ilusão.', citacao: '«A fé é a raiz, as obras são o fruto — uma árvore sem frutos está morta.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Nova Perspectiva', visao: 'Nova aliança', resumo: 'A fé que salva é uma fé que obedece — não por mérito, mas porque o Espírito capacita. Fé e obras são inseparáveis.', citacao: '«Paulo e Tiago não discordam — falam de coisas diferentes. Paulo: não por obras da lei. Tiago: sem obras, fé é morta.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // MATEUS — ENSINOS DE JESUS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'mt', capitulo: 5, versiculo: 3,
    tema: 'As Bem-Aventuranças',
    contexto: 'Jesus inicia o Sermão do Monte com as Bem-Aventuranzas — uma revolução dos valores: os pobres de espírito, os que choram, os mansos são abençoados.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Escatológico', resumo: 'As bem-aventuranças são promessas escatológicas — os que sofrem agora receberão consolo na consumação do Reino. São duas cidades, dois destinos.', citacao: '«As bem-aventuranças descrevem os cidadãos da cidade de Deus — pobres em espírito, ricos em graça.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Beatitude', resumo: 'A felicidade suprema (beatitudo) não está em bens materiais — está na visão direta de Deus. As bem-aventuranças são o caminho para essa felicidade.', citacao: '«A felicidade perfeita não pode ser encontrada em bens terrenos — apenas na posse de Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Reino', resumo: 'As bem-aventuranças são o currículo do Reino — descrevem o caráter de quem pertence a Jesus. Não são mérito, mas fruto do Espírito.', citacao: '«As bem-aventuranças são o retrato do discípulo de Cristo — humilde, manso, justo, misericordioso.»' },
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Confessante', visao: 'Discipulado', resumo: 'As bem-aventuranças são o manifesto do discipulado cristão. Não são conforto — são convocação para uma vida radical de following Jesus.', citacao: '«Quando Cristo chama um homem, Ele o chama para vir e morrer — e as bem-aventuranças são o caminho.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Nova Perspectiva', visao: 'Reino de Deus', resumo: 'As bem-aventuranças são a constituição do Reino de Deus — os reis do mundo são os mansos, os pobres, os perseguidores. Jesus inverte os valores.', citacao: '«As bem-aventuranças são o manifesto do Reino — onde os últimos serão primeiros.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 6, versiculo: 9,
    tema: 'O Pai Nosso',
    contexto: 'Jesus ensina os discípulos a orar — o Pai Nosso é o modelo supremo de oração, contendo adoração, súplica e entrega.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Comunhão', resumo: 'O Pai Nosso é a oração perfeita — resume tudo o que o homem pode pedir e tudo o que Deus pode dar. É oração comunitária — dizemos "Pai nosso", não "Pai meu".', citacao: '«O Pai Nosso é breve em palavras, mas rico em significado — toda a Escritura nele se resume.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Catequese', resumo: 'Lutero ensinava que o Pai Nosso é a oração mais perfeita — cada petição nos ensina a depender completamente de Deus.', citacao: '«Não precisamos de muitas palavras — Deus já sabe o que precisamos. O Pai Nosso é suficiente.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Adoração', resumo: 'A primeira petição — "santificado seja o teu nome" — é a mais importante. Tudo o mais é consequência. Deus primeiro, depois nossas necessidades.', citacao: '«A oração começa onde começa o Pai Nosso — na adoração ao nome santo de Deus.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 16, versiculo: 16,
    tema: 'Confissão de Pedro',
    contexto: 'Pedro confessa Jesus como o Cristo, o Filho de Deus — o momento mais decisivo da revelação no Evangelho de Mateus.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cristológico', resumo: 'A confissão de Pedro é o fundamento da Igreja. Não foi revelação humana — foi revelação divina. "Carne e sangue não te revelaram isso, mas meu Pai.".', citacao: '«Pedro confessou o Cristo — e sobre esta pedra, Cristo edificou Sua Igreja.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Cristológico', resumo: 'Cristo é simultaneamente verdadeiro Deus e verdadeiro homem — esta é a confessão central da fé. Pedro foi o primeiro a articulá-la.', citacao: '«A confissão de Pedro contém os dois artigos essenciais da fé: Cristo é Senhor e Cristo é Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Cristológico', resumo: 'Pedro não é a pedra da Igreja — Cristo é. A Igreja se edifica sobre a confissão de que Jesus é o Cristo, o Filho de Deus.', citacao: '«A Igreja se edifica sobre Cristo — não sobre Pedro. A pedra viva é Jesus mesmo.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 28, versiculo: 19,
    tema: 'A Grande Comissão',
    contexto: 'Jesus ordena que seus discípulos façam discípulos de todas as nações, batizando-os no nome da Trindade.',
    interpretacoes: [
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Missões', resumo: 'A Grande Comissão é o mandamento final de Cristo. A Igreja existe para fazer discípulos — este é o propósito supremo.', citacao: '«A missão da Igreja é fazer discípulos — ensinando, batizando e obedecendo a tudo o que Cristo ordenou.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Missões', resumo: 'A missão não é opcional — é essencial. A Igreja não tem missão — a missão tem Igreja.', citacao: '«A Igreja existe para a missão — sem missão, não existe Igreja.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Nova Perspectiva', visao: 'Missão integral', resumo: 'A missão não é apenas evangelismo — é fazer discípulos que obedecem a tudo o que Jesus ensinou, incluindo justiça e misericórdia.', citacao: '«A missão de Jesus é integral — inclui palavras e ações, evangelho e justiça.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // JOÃO — IDENTIDADE E SALVAÇÃO
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'jo', capitulo: 1, versiculo: 1,
    tema: 'O Logos eterno',
    contexto: 'O prólogo do Evangelho de João declara que o Verbo era Deus e estava com Deus desde o início — a declaração mais elevada da divindade de Cristo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Trinitário', resumo: 'O Verbo é eterno como o Pai — não foi criado, mas gerado. A relação entre Pai e Filho é a origem de todo amor e comunhão.', citacao: '«O Verbo era Deus — não uma criatura, mas o Criador. Não começou a existir — sempre existiu com o Pai.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Logos', resumo: 'O Logos é a Razão eterna de Deus — através dela todas as coisas foram feitas. João aplicou o termo grego para expressar a verdade hebraica.', citacao: '«O Verbo é a perfeita expressão do Pai — nele habita toda a plenitude da divindade.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação', resumo: 'O Prólogo de João é a declaração mais clara de que Jesus é a Palavra viva de Deus — não apenas porta-voz, mas o próprio Deus falando.', citacao: '«Em Jesus Cristo, a Palavra se fez carne — Deus falou pela última e definitiva vez.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Nova Perspectiva', visao: 'Cristológico', resumo: 'João usa o Logos para conectar o Evangelho com a filosofia grega — mas o Logos é antes de tudo o Verbo criador de Gênesis 1.', citacao: '«O Verbo que criou o mundo agora vem habitar nele — é o Deus que Se aproxima.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 3, versiculo: 16,
    tema: 'O versículo mais conhecido',
    contexto: 'Jesus fala a Nicodemos sobre o amor de Deus que deu o Filho único para que todo o que crê não pereça, mas tenha a vida eterna.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor', resumo: 'O amor de Deus não é abstrato — é concreto, histórico, pessoal. Deus deu o que tinha de mais precioso para resgatar o que tinha de mais perdido.', citacao: '«Tão grande é o amor de Deus que não poupou o próprio Filho — e por esse amor, somos livres.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Evangelho', resumo: 'Este versículo é o evangelho em miniatura: Deus amou, deu o Filho, o mundo precisa, quem crê não perece, tem vida eterna.', citacao: '«O evangelho é isso: Deus nos amou e deu o Filho por nós — não para condenação, mas para salvação.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'A universalidade do amor ("o mundo") e a especificidade da salvação ("todo o que crê") — Deus ama a todos, mas salva os que creem.', citacao: '«Deus amou o mundo — mas é pelo crer que recebemos o que Ele deu.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Gospel', resumo: 'O versículo mais traduzido da história resume tudo: o amor de Deus, o sacrifício de Cristo, a necessidade da fé, o dom da vida.', citacao: '«João 3:16 é a Bíblia inteira em uma frase — o evangelho em 26 palavras.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 10, versiculo: 10,
    tema: 'Vida em abundância',
    contexto: 'Jesus declara que veio para que as ovelhas tenham vida — e vida em abundância, em contraste com o ladrão que vem para roubar.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Plenitude', resumo: 'A vida abundância não é prosperidade material — é a plenitude da vida em Deus. O pecado rouba a verdadeira vida; Cristo a restaura.', citacao: '«A vida que Cristo dá não é apenas existir — é viver em comunhão com o Criador.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Vida eterna', resumo: 'A vida abundância é a vida eterna que começa agora — não apenas no céu. Quem está em Cristo já experimenta a vida nova.', citacao: '«A vida abundância é a graça de Deus operando em nós — transformando-nos día a día.»' },
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Confessante', visao: 'Discipulado', resumo: 'A vida abundância não é conforto — é significado. O discípulo que segue a Cristo encontra propósito que nenhum bem material pode dar.', citacao: '«Quando Cristo chama um homem, Ele o chama para uma vida que vale a pena ser vivida.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Gospel', resumo: 'A abundância de Jesus não é acréscimo — é substituição. Ele não acrescenta coisas à vida — Ele dá vida nova.', citacao: '«A vida abundância é ser libertado de si mesmo — é encontrar a vida perdendo a vida.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 14, versiculo: 6,
    tema: 'O caminho, a verdade e a vida',
    contexto: 'Jesus declara exclusividade: ninguém vem ao Pai senão por Ele — a declaração mais exclusivista e mais amada do cristianismo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Exclusivismo', resumo: 'Cristo é o único caminho porque é o único que preenche o abismo entre Deus e o homem. Não há salvação em nenhum outro nome.', citacao: '«Em nenhum outro há salvação — porque em nenhum outro Deus Se fez homem para nos resgatar.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Veritas', resumo: 'Cristo é a verdade objetiva que liberta. Não é uma verdade entre muitas — é a verdade definitiva que revela Deus e o homem.', citacao: '«Cristo é a verdade que nos liberta do erro — e o caminho que nos conduz ao Pai.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação', resumo: 'A exclusividade de Cristo não é arrogância — é humildade. Deus Se revelou em um lugar concreto, numa pessoa histórica. A verdade é pessoal, não abstrata.', citacao: '«Deus não é uma ideia — é uma pessoa. E essa pessoa é Jesus Cristo.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Evangelho', resumo: 'Jesus não disse "uma das verdades" — disse "a verdade". A exclusividade não é intolerância — é amor que compartilha o único caminho de salvação.', citacao: '«A exclusividade de Cristo não é intolerância — é a verdade que liberta.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 15, versiculo: 5,
    tema: 'A videira e os sarmentos',
    contexto: 'Jesus se compara à videira — os discípulos são os sarmentos que só produzem frutos quando permanecem Nele.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'União', resumo: 'A união com Cristo é a fonte de toda a vida espiritual. Sem Ele, nada podemos fazer — com Ele, tudo é possível.', citacao: '«A videira é Cristo — sem Ele, os sarmentos secam e são queimados.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Perseverança', resumo: 'Permanecer na videira é perseverar na fé e na obediência. Os sarmentos que não produzem frutos são retirados — a perseverança é evidência da graça.', citacao: '«O sarmento que não produz fruto prova que nunca esteve verdadeiramente unido à videira.»' },
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Confessante', visao: 'Discipulado', resumo: 'Permanecer em Cristo é obedecer aos seus mandamentos. Fé sem obediência não é fé — é ilusão. A união se manifesta em frutos.', citacao: '«A obediência não é opcional para o discípulo — é o teste da união com Cristo.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // 1 JOÃO — AMOR E COMUNHÃO
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: '1jo', capitulo: 1, versiculo: 9,
    tema: 'Perdão dos pecados',
    contexto: 'João assegura que Deus é fiel e justo para perdoar nossos pecados e nos purificar de toda injustiça — a promessa da restauração.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Misericórdia', resumo: 'O perdão de Deus não é relutante — é generoso. Ele não apenas perdoa, mas purifica. A justiça de Deus exige purificação; a misericórdia a oferece.', citacao: '«Deus é fiel para perdoar — não porque somos dignos, mas porque Ele é misericordioso.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Promessa', resumo: 'Este versículo é uma promessoal clara: confessar é ser perdoado. Não há dúvida, não há condicional — é promessa absoluta de Deus.', citacao: '«Se confessamos nossos pecados, Deus é fiel — Ele prometeu perdoar e perdoa.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Fidelidade', resumo: 'Deus é fiel à Sua própria palavra — Ele não pode mentir. Quando promete perdoar, perdoa. A nossa confiança está no caráter Dele, não nos nossos méritos.', citacao: '«A fidelidade de Deus é a garantia do nosso perdão — Ele não pode abandonar o que prometeu.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Gospel', resumo: 'A confissão não é uma transação — é uma relação. Deus não apenas perdoa, mas restaura. O perdão é o início da cura.', citacao: '«A confissão é a porta de entrada para a graça — Deus não apenas perdoa, mas restaura.»' },
    ],
  },
  {
    livro: '1jo', capitulo: 4, versiculo: 8,
    tema: 'Deus é amor',
    contexto: 'A declaração mais concisa e mais profunda sobre a natureza de Deus: Deus não apenas ama — Ele é amor.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Trindade', resumo: 'Deus é amor porque é Trindade — Pai, Filho e Espírito Santo em comunhão perfeita. O amor não existiu antes da Trindade — é a própria natureza de Deus.', citacao: '«Deus é amor — e este amor é a comunhão eterna do Pai, do Filho e do Espírito Santo.»' },
      { teologo: 'Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação', resumo: 'Deus é amor — não como atributo, mas como essência. O amor não é uma ideia humana aplicada a Deus — é Deus quem define o que é amor.', citacao: '«O amor não é uma qualidade de Deus — é Deus mesmo. Quem vê o Filho vê o amor do Pai.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Gospel', resumo: 'Deus é amor significa que o amor não é ilusão — tem origem eterna. O amor que experimentamos aponta para o amor que é Deus.', citacao: '«Deus não apenas ama — Ele é amor. Isso significa que o amor é a realidade mais profunda do universo.»' },
    ],
  },
];

for (const e of estudosExtras) {
  const key = `${e.livro}:${e.capitulo}:${e.versiculo}`;
  if (!byRefMap.has(key)) {
    byRefMap.set(key, []);
  }
  byRefMap.get(key)!.push(e);
}

export function obterEstudos(livro: string, capitulo: number, versiculo: number): EstudoVersiculo[] {
  return byRefMap.get(`${livro}:${capitulo}:${versiculo}`) || [];
}

export function temEstudo(livro: string, capitulo: number, versiculo: number): boolean {
  return byRefMap.has(`${livro}:${capitulo}:${versiculo}`);
}

export function listarTodosEstudos(): EstudoVersiculo[] {
  return estudosData;
}

export function obterEstudosExpandidos(): EstudoTeologico[] {
  return estudosTeologicosExpandidos;
}

export function obterEstudosPorCategoria(categoria: string): EstudoTeologico[] {
  return estudosTeologicosExpandidos.filter(e => e.categoria === categoria);
}

export function obterEstudoPorId(id: string): EstudoTeologico | undefined {
  return estudosTeologicosExpandidos.find(e => e.id === id);
}
