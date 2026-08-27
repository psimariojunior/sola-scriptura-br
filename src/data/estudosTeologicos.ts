import { estudosTeologicosExpandidos, EstudoTeologico } from './estudosTeologicosExpandidos';
import { estudosClassicosCanon } from './estudosClassicosCanon';

export interface EstudoTeologo {
  teologo: string;
  periodo: string;
  tradicao: string;
  visao: string;
  resumo: string;
  citacao: string;
  citacaoFonte?: 'resumo' | 'citacao-real';
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
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Criacionismo instantâneo', resumo: 'Deus criou tudo de uma vez, incluindo as sementes causais (rationes seminais) que se desenvolveriam ao longo do tempo. A criação não foi necessária para Deus — Ele criou por amor.', citacao: '«Deus criou todas as coisas juntas de uma vez, e não como quem faz e depois contempla o que fez.»' },
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
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Cristologia central', resumo: 'Este versículo é a primeira menção à vinda de Cristo. A vitória sobre Satanás se dá pela Paixão e Morte de Jesus, esmagando a cabeça do inimigo.', citacao: '«A cabeça da serpente, que é o diabo, será esmagada pelacruz de Cristo.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Promessa de graça', resumo: 'Aqui começa o evangelho — Deus promete um redentor mesmo antes da sentença. A promessa é gratuita, não condicional. A semente da mulher é Cristo.', citacao: '«Este é o primeiro sermão evangélico, pregado por Deus em pessoa.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Aliança de graça', resumo: 'O versículo estabelece a aliança de redenção. A vitória de Cristo é certa — a serpente será esmagada, não apenas ferida. É promessa, não possibilidade.', citacao: '«Deus não apenas prediz a vitória — Ele a garante pela Sua palavra.»' },
      { teologo: 'Herman Bavinck', periodo: '1854-1921', tradicao: 'Reforma neocalvinista', visao: 'História da redenção', resumo: 'Gn 3:15 é o protoevangelho: toda a revelação posterior desdobra a inimizade entre a semente da mulher e a da serpente, até a vitória de Cristo na cruz e no juízo.', citacao: '«A primeira promessa do evangelho é o germe de toda a história da redenção.»' },
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
      { teologo: 'David Bosch', periodo: '1929-1992', tradicao: 'Missionologia', visao: 'Missão transformadora', resumo: 'A missão éparticipação na transformação do mundo segundo o Reino de Deus. Não é apenas conversão individual mas justiça social.', citacao: '«A missão é muito maior que evangelismo — é participação na missão de Deus no mundo.»' },
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
      { teologo: 'Karl Rahner', periodo: '1904-1984', tradicao: 'Católica', visao: 'Graçaanônima', resumo: 'A graça de Deus atua mesmo fora da Igreja. Quem busca a verdade e o amor está respondendo à graça de Cristo, mesmo sem o saber.', citacao: '«O cristão anônimo é aquele que responde à graça sem conhecer o Evangelho.»' },
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
    livro: 'ezr', capitulo: 7, versiculo: 10,
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
    livro: 'jon', capitulo: 3, versiculo: 10,
    tema: 'Arrependimento de Nínive — Misericórdia universal',
    contexto: 'A cidade gentílica de Nínive se arrepende à pregação de Jonas, e Deus perdoa.',
    interpretacoes: [
      { teologo: 'Agostinho', periodo: '354-430', tradicao: 'Patrística', visao: 'Graça soberana', resumo: 'A salvação de Nínive demonstra que a misericórdia de Deus transpõe fronteiras de povo.', citacao: '«Deus não rejeita quem se arrepende, seja judeu ou gentio.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Justificação pela fé', resumo: 'Nínive é justificada por sua fé manifesta em arrependimento, não por merecimento.', citacao: '«A fé que se arrepende alcança o perdão de Deus.»' },
    ],
  },
  {
    livro: 'mq', capitulo: 6, versiculo: 8,
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
    livro: 'sf', capitulo: 3, versiculo: 17,
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
  // ═══════════════════════════════════════════════════════════════════════
  // ROMANOS 5-8 — JUSTIFICAÇÃO E SANTIFICAÇÃO
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'rm', capitulo: 5, versiculo: 1,
    tema: 'Paz com Deus pela justificação',
    contexto: 'Paulo declara que, tendo sido justificados pela fé, temos paz com Deus por meio de Jesus Cristo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Paz interior', resumo: 'A paz com Deus não é ausência de conflito externo, mas reconciliação interior. O coração inquieto encontra repouso em Deus.', citacao: '«Fizeste-nos para Ti, Senhor, e inquieto está o nosso coração enquanto não repousar em Ti.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Justificação pela fé', resumo: 'A paz com Deus não vem por obras nem por mérito — vem pela fé em Cristo. É o artigo pelo qual a igreja se sustenta ou cai.', citacao: '«Justificados pela fé, temos paz — não por nossos esforços, mas pela graça de Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Reconciliação', resumo: 'A justificação remove a inimizade entre Deus e o homem. A paz é fruto da reconciliação objetiva operada por Cristo na cruz.', citacao: '«A paz com Deus é o fundamento de toda bênção — sem justificação, não há paz.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Segurança', resumo: 'A paz com Deus é um estado permanente, não um sentimento passageiro. É a certeza de que estamos reconciliados com o Criador.', citacao: '«A paz com Deus é a maior necessidade do homem — e a maior dádiva do evangelho.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 5, versiculo: 12,
    tema: 'Pecado original — Por um homem entrou o pecado',
    contexto: 'Paulo explica que por um só homem (Adão) o pecado entrou no mundo, e pelo pecado a morte, afetando todos os homens.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Pecado original', resumo: 'O pecado de Adão contaminou toda a humanidade. Nascemos com uma natureza caída que nos inclina ao mal. A morte é consequência universal do pecado.', citacao: '«Em Adão todos pecaram — o pecado não é apenas ato, é condição herdada.»' },
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Natureza ferida', resumo: 'O pecado original não destruiu a natureza humana, mas a feriu. A razão está obscurecida, a vontade enfraquecida — mas a imagem de Deus permanece.', citacao: '«A natureza humana foi ferida, não destruída — a imagem de Deus permanece, embora deformada.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Depravação total', resumo: 'O pecado de Adão afetou todas as faculdades humanas. Nada em nós escapa ao pecado — somos total e completamente dependentes da graça.', citacao: '«O pecado original é a corrupção da nossa natureza que nos torna culpados diante de Deus.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Nova Perspectiva', visao: 'Adão como tipo', resumo: 'Adão é tipo da humanidade — seu pecado representa o pecado de todos. Assim como em Adão todos morrem, em Cristo todos serão vivificados.', citacao: '«Adão é o tipo daquele que havia de vir — Cristo é o novo Adão que desfaz o mal do primeiro.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 6, versiculo: 6,
    tema: 'O homem velho foi crucificado com Cristo',
    contexto: 'Paulo ensina que nosso homem velho foi crucificado com Cristo para que o corpo do pecado fosse destruído.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Morte do pecado', resumo: 'A crucificação do homem velho não é eliminação completa do pecado, mas perda de seu domínio. O pecado ainda habita em nós, mas não reina.', citacao: '«O pecado está em nós, mas não reina — a cruz de Cristo quebrou seu poder.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Simul iustus et peccator', resumo: 'Somos simultaneamente justos e pecadores. O homem velho morre diariamente pela fé, mas a santificação é processo contínuo.', citacao: '«O homem velho é crucificado diariamente — mas a ressurreição é o destino final.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Santificação', resumo: 'A morte do homem velho é o início da santificação. Não é perfeição instantânea, mas direção nova — livres do domínio do pecado.', citacao: '«A santificação é a obra do Espírito que nos liberta gradualmente do domínio do pecado.»' },
      { teologo: 'John Owen', periodo: '1616-1683', tradicao: 'Puritana', visao: 'Mortificação', resumo: 'O crente deve mortificar diariamente as obras da carne. A cruz não é apenas evento passado — é realidade presente que transforma.', citacao: '«Se o pecado não for mortificado diariamente, ele mortificará o crente.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 7, versiculo: 15,
    tema: 'O bem que quero não faço — Conflito interior',
    contexto: 'Paulo descreve o conflito interior do crente entre a lei da mente e a lei do pecado nos membros.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Conflito espiritual', resumo: 'O conflito entre o bem e o mal é a experiência universal do crente. A graça não elimina a luta — dá forças para vencê-la.', citacao: '«O homem justo luta contra o pecado — mas a graça lhe dá a vitória.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Simul iustus et peccator', resumo: 'Este versículo descreve a condição cristã real: queremos o bem, mas fazemos o mal. A solução não é perfeição própria, mas Cristo.', citacao: '«Em mim, isto é, na minha carne, não habita bem algum — mas Cristo habita em mim.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Dependência da graça', resumo: 'O conflito de Paulo nos ensina humildade. Nenhum crente é perfeito — todos dependem diariamente da graça de Deus.', citacao: '«O conflito interior nos mantém humildes e dependentes da graça — sem ela, não podemos fazer nada.»' },
      { teologo: 'John Wesley', periodo: '1703-1791', tradicao: 'Metodista', visao: 'Santificação progressiva', resumo: 'O conflito de Romanos 7 não precisa ser permanente. A santificação progressiva nos leva a uma vida de vitória sobre o pecado.', citacao: '«A graça não apenas perdoa — ela transforma. O conflito pode diminuir à medida que crescemos em santidade.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 8, versiculo: 1,
    tema: 'Nenhuma condenação para os que estão em Cristo',
    contexto: 'Paulo declara que não há condenação para os que estão em Cristo Jesus — a absolvição definitiva do crente.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Liberdade', resumo: 'A condenação foi removida não porque não somos pecadores, mas porque Cristo foi condenado em nosso lugar. A liberdade é real e total.', citacao: '«Não há condenação — não porque não pecamos, mas porque Cristo pagou o preço.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Justiça imputada', resumo: 'A absolvição do crente é judicial — Deus declara justo quem crê em Cristo. Não é justiça própria, mas justiça recebida.', citacao: '«Diante do tribunal de Deus, o crente é absolvido — não por seus méritos, mas pela fé em Cristo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Segurança eterna', resumo: 'A condenação foi removida definitivamente. Quem está em Cristo não pode ser condenado — a sentença foi cumprida na cruz.', citacao: '«Quem está em Cristo é livre da condenação — a sentença foi executada na cruz, não sobre o crente.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Identidade', resumo: 'Em Cristo temos uma nova identidade — não somos mais definidos por nossos fracassos, mas pela graça de Deus.', citacao: '«A identidade do crente não é baseada no que faz, mas no que Cristo fez por ele.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 8, versiculo: 14,
    tema: 'Guiados pelo Espírito de Deus',
    contexto: 'Paulo afirma que todos os que são guiados pelo Espírito de Deus são filhos de Deus.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Filhos de Deus', resumo: 'A filiação divina não é status legal — é realidade viva. O Espírito nos guia, consola e transforma em filhos semelhantes ao Filho.', citacao: '«O Espírito nos faz filhos — não por adoção legal apenas, mas por transformação real.»' },
      { teologo: 'John Wesley', periodo: '1703-1791', tradicao: 'Metodista', visao: 'Testemunho do Espírito', resumo: 'O Espírito testifica com o nosso espírito que somos filhos de Deus — é uma certeza interior que vai além da razão.', citacao: '«O Espírito Santo nos garante interiormente que somos filhos de Deus — esta é a certeza cristã.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Direção divina', resumo: 'A guia do Espírito é o distintivo dos filhos de Deus. Quem não é guiado pelo Espírito não pode reivindicar filiação.', citacao: '«A guia do Espírito é a marca do cristão — sem ela, não há filiação.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 8, versiculo: 15,
    tema: 'Espírito de adoção — Aba, Pai',
    contexto: 'Paulo declara que recebemos não espírito de escravidão, mas de adoção, pelo qual clamamos: Aba, Pai.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Intimidade', resumo: 'O clamor "Aba" é a expressão mais íntima da relação com Deus. Não é medo servil — é confiança filial.', citacao: '«Chamar Deus de Pai é o privilégio máximo do cristão — é intimidade com o Criador.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Liberdade', resumo: 'O espírito de adoção nos liberta do medo. Não somos escravos — somos filhos. A oração é conversa com o Pai, não súplica ao juiz.', citacao: '«Em Cristo, deixamos de ser escravos para nos tornarmos filhos — e o Espírito nos ensina a chamar Deus de Pai.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Graça', resumo: 'A adoção é graça pura — não merecemos ser filhos. Deus nos adota em Cristo, e o Espírito nos garante essa filiação.', citacao: '«A adoção é o ato mais livre de Deus — Ele nos escolhe como filhos sem que tenhamos direito.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 8, versiculo: 26,
    tema: 'O Espírito intercede por nós',
    contexto: 'Paulo ensina que o Espírito Santo intercede por nós com gemidos inexprimíveis quando não sabemos como orar.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Intercessão', resumo: 'O Espírito supre nossa fraqueza na oração. Quando não sabemos pedir, Ele intercede com gemidos que vão além das palavras.', citacao: '«O Espírito ora em nós quando não sabemos orar — Ele é o consolador que supre nossa fraqueza.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Auxílio divino', resumo: 'A oração cristã não depende de nossa eloquência — o Espírito aperfeiçoa nossas súplicas. Nenhuma oração sincera é desperdiçada.', citacao: '«O Espírito corrige e aperfeiçoa nossas orações — nenhuma sincera é rejeitada.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Consolo', resumo: 'A intercessão do Espírito é consolo para os momentos de escuridão. Mesmo quando não sentimos nada, o Espírito está orando por nós.', citacao: '«Quando as palavras falham, o Espírito fala — e suas palavras são perfeitas.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 8, versiculo: 35,
    tema: 'Quem nos separará do amor de Cristo?',
    contexto: 'Paulo pergunta retórica: tribulação, angústia, perseguição, fome, nudez, perigo ou espada — nada nos separará do amor de Cristo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Perseverança', resumo: 'Nenhuma força criada pode separar o crente do amor de Cristo. A segurança não está em nossa força, mas no amor inabalável de Deus.', citacao: '«Nem tribulação, nem angústia, nem perseguição nos separará — o amor de Cristo é mais forte que tudo.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Segurança', resumo: 'A lista de Paulo inclui todas as formas de sofrimento — e conclui que nenhuma tem poder para nos arrancar das mãos de Deus.', citacao: '«Cristo nos segura com mão firme — nenhuma força do universo pode nos arrancar dEle.»' },
      { teologo: 'John Piper', periodo: '1946-', tradicao: 'Reformada', visao: 'Supremacia', resumo: 'O amor de Cristo é supremo sobre todas as circunstâncias. Mesmo na morte, estamos seguros — porque Cristo venceu a morte.', citacao: '«O amor de Cristo é invencível — nada no céu, na terra ou debaixo da terra pode vencê-lo.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // EFÉSIOS 6 — ARMADURA ESPIRITUAL
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'ef', capitulo: 6, versiculo: 11,
    tema: 'Revesti-vos da armadura de Deus',
    contexto: 'Paulo exorta os crentes a vestir toda a armadura de Deus para resistir às ciladas do diabo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Guerra espiritual', resumo: 'A armadura é Cristo mesmo — cada peça representa uma virtude que recebemos Dele. A força vem de Deus, não de nós mesmos.', citacao: '«Revesti-vos de Cristo — Ele é a armadura que nos protege de todo mal.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola Scriptura', resumo: 'A Espada do Espírito é a Palavra de Deus — a única arma ofensiva. Lutero escreveu o hino "Uma Fortaleza é o nosso Deus" meditando neste texto.', citacao: '«A Palavra de Deus é a espada que corta todas as mentiras e acusações do inimigo.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Vida cristã', resumo: 'A guerra espiritual não é contra pessoas — é contra princípios e potestades. A armadura protege toda a pessoa: verdade, justiça, paz, fé, salvação e Palavra.', citacao: '«O inimigo não é carne e sangue — são as forças espirituais da maldade.»' },
      { teologo: 'C.S. Lewis', periodo: '1898-1963', tradicao: 'Anglicana', visao: 'Espiritual', resumo: 'A guerra espiritual é real, mas o resultado já está decidido. Cristo venceu na cruz — nós lutamos a partir da vitória, não por ela.', citacao: '«O inimigo é forte, mas já foi derrotado — nossa luta é a da celebração.»' },
    ],
  },
  {
    livro: 'ef', capitulo: 6, versiculo: 13,
    tema: 'Toma toda a armadura de Deus',
    contexto: 'Paulo detalha a armadura: cinto da verdade, couraça da justiça, pés calçados com o evangelho, escudo da fé, capacete da salvação e espada do Espírito.',
    interpretacoes: [
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Virtudes', resumo: 'Cada peça da armadura corresponde a uma virtude teologal: verdade (fé), justiça (esperança), evangelho (caridade), fé (escudo), salvação (capacete).', citacao: '«A armadura de Deus são as virtudes infundidas pelo Espírito — cada uma protege uma parte da alma.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Equipamento', resumo: 'Cada cristão deve vestir TODA a armadura — não apenas parte. A negligência em uma área abre espaço para o ataque.', citacao: '«A armadura é completa — quem negligencia uma peça expõe todo o corpo ao inimigo.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Espada', resumo: 'A espada do Espírito é a única arma ofensiva — a Palavra de Deus. Sem ela, apenas nos defendemos; com ela, avançamos.', citacao: '«A Palavra de Deus é a espada que vence o inimigo — sem ela, somos vulneráveis.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // APOCALIPSE 21-22 — NOVOS CÉUS E NOVA TERRA
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'ap', capitulo: 21, versiculo: 1,
    tema: 'Novos céus e nova terra',
    contexto: 'João vislumbra a criação renovada — novos céus e nova terra, pois os primeiros passaram.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cidade de Deus', resumo: 'A nova criação é a consumação da Cidade de Deus — onde Deus habita com Seu povo para sempre. Não é fuga do mundo, mas transformação.', citacao: '«A cidade de Deus desce do céu — é Deus vindo habitar conosco, não nós fugindo para Ele.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Restauração', resumo: 'A criação será renovada, não destruída. Deus restaurará todas as coisas — a esperança cristã é de restauração, não aniquilação.', citacao: '«Deus não destruirá a criação — Ele a renovará para que reflita Sua glória original.»' },
      { teologo: 'Jürgen Moltmann', periodo: '1926-2024', tradicao: 'Teologia da Esperança', visao: 'Transformação', resumo: 'A esperança cristã não é fuga para o céu — é transformação da terra. Deus se compromete com o futuro da criação.', citacao: '«A esperança cristã não é escapar do mundo — é ver o mundo transformado pela glória de Deus.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Anglicana', visao: 'Nova criação', resumo: 'O céu e a terra se encontram — não vamos para o céu, o céu vem para a terra. A realidade final é a fusão dos dois mundos.', citacao: '«O destino final não é ir ao céu — é o céu vir à terra. Deus habitará conosco aqui.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 21, versiculo: 3,
    tema: 'Eis o tabernáculo de Deus com os homens',
    contexto: 'O anúncio central da escatologia: Deus habitará com os homens, e eles serão Seu povo, e Deus mesmo estará com eles.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Comunhão eterna', resumo: 'O sonho mais antigo de Deus se cumpre: habitar com Seu povo face a face. A história da salvação culmina na comunhão perfeita.', citacao: '«Deus habitará conosco — é o cumprimento de toda promessa e de toda esperança.»' },
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Visão beatífica', resumo: 'A felicidade final é a visão direta de Deus — habitar com Ele face a face, sem mediação, sem véu.', citacao: '«A visão beatífica é ver Deus como Ele é — face a face, sem sombras.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Presença plena', resumo: 'O tabernáculo do AT era sombra — a realidade é a presença plena de Deus com Seu povo. Não haverá mais templo, porque Deus mesmo é o templo.', citacao: '«Deus será o templo — não precisaremos de edifícios, porque Sua presença será total.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 21, versiculo: 5,
    tema: 'Eis que faço novas todas as coisas',
    contexto: 'Aquele que está assentado no trono declara que faz novas todas as coisas — a renovação cósmica final.',
    interpretacoes: [
      { teologo: 'Jürgen Moltmann', periodo: '1926-2024', tradicao: 'Teologia da Esperança', visao: 'Nova criação', resumo: 'Deus não apenas consola — Ele renova. A promessa de novas coisas é a base da esperança cristã para o mundo.', citacao: '«A esperança cristã é certeza de que Deus fará todas as coisas novas — não apenas consolará, mas transformará.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Anglicana', visao: 'Continuidade', resumo: 'As coisas novas não substituem as velhas — as transformam. Há continuidade entre a criação presente e a renovada.', citacao: '«Deus não descarta — Ele renova. A nova criação brota da velha como a borboleta da crisálida.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Esperança', resumo: 'Toda injustiça, dor e morte serão desfeitas. A renovação é total — não apenas espiritual, mas cósmica.', citacao: '«Deus não apenas perdoa o passado — Ele reescreve o futuro. Todas as coisas serão feitas novas.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 22, versiculo: 1,
    tema: 'O rio da vida',
    contexto: 'João vê um rio de água da vida, límpido como cristal, que sai do trono de Deus e do Cordeiro.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Plenitude', resumo: 'O rio da vida é o Espírito Santo que emana de Deus e irriga toda a criação renovada. É a plenitude da vida divina compartilhada.', citacao: '«O rio da vida é o Espírito que flui do trono de Deus — dando vida eterna a todos os que bebem.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Restauração', resumo: 'O rio de Ezequiel 47 se cumpre aqui — a cura e a restauração que Deus prometeu se realizam plenamente na nova criação.', citacao: '«O rio da vida cumpre a profecia de Ezequiel — onde ele chega, tudo floresce e revive.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Anglicana', visao: 'Nova criação', resumo: 'O rio da vida não é metáfora — é realidade. A nova criação é material e espiritual, física e divina.', citacao: '«A nova criação não é apenas espiritual — é material, física, real. O rio flui, as árvores frutificam.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 22, versiculo: 3,
    tema: 'Servirão a Deus face a face',
    contexto: 'Na nova criação, os servos de Deus O servirão face a face, verão Seu rosto, e Seu nome estará em suas frontes.',
    interpretacoes: [
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Visão beatífica', resumo: 'Ver o rosto de Deus é a felicidade suprema — a realização de todo desejo humano. Nada pode ser comparado a esta visão.', citacao: '«A felicidade final consiste na visão da essência divina — ver Deus face a face.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Intimidade', resumo: 'O serviço na nova criação não é servidão — é adoração livre e alegre. Ver o rosto de Deus é o privilégio dos redimidos.', citacao: '«Servir a Deus face a face é o maior privilégio — é adoração sem véu, sem medo, sem pecado.»' },
      { teologo: 'Jürgen Moltmann', periodo: '1926-2024', tradicao: 'Teologia da Esperança', visao: 'Comunhão', resumo: 'A comunhão com Deus na nova criação é a realização plena do propósito da criação — Deus e homem juntos para sempre.', citacao: '«A comunhão eterna com Deus é o destino da criação — é o paraíso restaurado.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // SALMOS — CONFORTO, PROTEÇÃO E PALAVRA
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'sl', capitulo: 91, versiculo: 1,
    tema: 'Debaixo das asas de Deus — Refúgio',
    contexto: 'O Salmo 91 é o salmo da proteção divina — quem habita no esconderijo do Altíssimo repousa sob Suas asas.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Proteção', resumo: 'Deus é refúgio e fortaleza. A proteção divina não elimina o perigo, mas nos guarda no meio dele. Habitar em Deus é estar seguro.', citacao: '«Quem repousa em Deus está seguro — não porque não há perigo, mas porque Deus é maior que todo perigo.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Confiança', resumo: 'O salmo 91 é o salmo da confiança absoluta. Quem se abriga no Altíssimo não teme pestilência nem seta — porque Deus é seu escudo.', citacao: '«A sombra do Altíssimo é o lugar mais seguro do universo — ali, nenhum mal nos alcança.»' },
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Confessante', visao: 'Fé', resumo: 'A proteção de Deus não é garantia de ausência de sofrimento — é garantia de Sua presença no sofrimento. Mesmo na morte, estamos seguros.', citacao: '«Deus nos protege não do sofrimento, mas no sofrimento — e é isso que importa.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 91, versiculo: 4,
    tema: 'Cobrir-te-á com as suas penas',
    contexto: 'Deus nos cobre com Suas penas — imagem maternal de proteção, como a galinha cobre seus pintinhos.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cuidado maternal', resumo: 'Deus nos protege como mãe protege seus filhos. A metáfora das penas revela ternura, proximidade e cuidado íntimo.', citacao: '«Deus nos cobre com Suas penas — é o cuidado maternal do Criador sobre Suas criaturas.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Providência', resumo: 'A proteção de Deus é pessoal — Ele não cuida da humanidade em abstrato, mas de cada crente individualmente.', citacao: '«Deus cobre cada crente com Suas penas — é cuidado pessoal, não geral.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Conforto', resumo: 'As penas de Deus são nosso refúgio. Quando o mundo é hostil, encontramos abrigo sob as asas do Altíssimo.', citacao: '«Sob as asas de Deus há segurança — ali, o trovão se transforma em canção de ninar.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 91, versiculo: 11,
    tema: 'Anjos guardiões — Proteção celestial',
    contexto: 'Deus ordenará Seus anjos para nos guardarem em todos os nossos caminhos.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Anjos', resumo: 'Os anjos são mensageiros e protetores de Deus. Eles nos guardam não por nosso mérito, mas por mandamento divino.', citacao: '«Deus ordena Seus anjos para nos guardarem — é Sua bondade, não nosso merecimento.»' },
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Anjos guardiões', resumo: 'Cada crente tem anjo guardião que vê a face de Deus e nos protege. A guarda angélica é parte da providência divina.', citacao: '«O anjo guardião vê a face de Deus e nos protege — é Sua providência sobre cada alma.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'A proteção angélica é instrumento da soberania de Deus. Os anjos servem aos crentes por mandamento divino.', citacao: '«Os anjos são servos de Deus que nos guardam — mas a proteção vem dEle, não deles.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // PROVÉRBIOS 3:5-6 — CONFIANÇA
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'pv', capitulo: 3, versiculo: 5,
    tema: 'Confia no SENHOR de todo o teu coração',
    contexto: 'Salomão ensina que a verdadeira sabedoria começa com confiança total em Deus, sem confiar no próprio entendimento.',
    interpretacoes: [
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Virtude', resumo: 'A confiança em Deus é virtude teologal — não é cegueira, mas reconhecimento de que Deus sabe mais que nós. A razão é útil, mas limitada.', citacao: '«Confiar em Deus é ato de humildade — reconhecer que Sua sabedoria transcende a nossa.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Fé', resumo: 'Confiar de todo o coração significa não confiar em parte em Deus e em parte em si mesmo. É abandono total da autoconfiança.', citacao: '«A fé não divide lealdade — ela a concentra toda em Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Confiar no Senhor é reconhecer Sua soberania sobre todas as coisas. O próprio entendimento é limitado — Deus é infinito.', citacao: '«O coração humano é enganoso — mas Deus é fiel. Confiar nEle é a única segurança.»' },
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Confessante', visao: 'Cruz', resumo: 'A confiança plena em Deus muitas vezes significa aceitar o que não entendemos. É na escuridão que a fé se prova verdadeira.', citacao: '«Quando Deus nos chama, Ele nos leva aonde nossa compreensão falha — e é aí que a fé começa.»' },
    ],
  },
  {
    livro: 'pv', capitulo: 3, versiculo: 6,
    tema: 'Reconhece-O em todos os teus caminhos',
    contexto: 'A continuação: reconhecer a Deus em todos os caminhos, e Ele endireitará as veredas.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Orientação', resumo: 'Reconhecer a Deus é convidáLo a ser Senhor de todas as áreas da vida — não apenas da espiritualidade, mas do trabalho, dos relacionamentos, das decisões.', citacao: '«Reconhecer a Deus em todos os caminhos é fazer Dele o centro de toda a vida.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Providência', resumo: 'Deus endireita as veredas de quem O reconhece. A orientação divina não é automática — é resposta à submissão do coração.', citacao: '«Quem reconhece a Deus encontra o caminho — Ele endireita o que está torto.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Reconhecer a Deus não é apenas orar antes de comer — é envolver Deus em cada decisão, cada planejamento, cada passo.', citacao: '«Reconhecer a Deus é fazer Dele o GPS da vida — Ele conhece o caminho que não conhecemos.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // FILIPENSES 4:13 — FORÇA EM CRISTO
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'fp', capitulo: 4, versiculo: 13,
    tema: 'Posso todas as coisas naquele que me fortalece',
    contexto: 'Paulo escreve da prisão — não é sobre conquista pessoal, mas sobre contentamento em qualquer circunstância pela força de Cristo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Dependência', resumo: 'A força não vem de nós — vem de Cristo. Não é "posso tudo sozinho", mas "posso tudo porque Cristo me fortalece".', citacao: '«Posso todas as coisas — não por mim mesmo, mas por Cristo que habita em mim.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Contentamento', resumo: 'O contentamento é aprendido — e a força para aprender vem de Cristo. Não é resignação, mas confiança ativa.', citacao: '«O segredo do contentamento é a força de Cristo — sem Ele, não podemos suportar.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Este versículo não é para conquistar riquezas — é para perseverar nas dificuldades. Cristo dá força para sofrer, não apenas para prosperar.', citacao: '«Posso todas as coisas — até mesmo suportar a cruz, até mesmo morrer bem.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Contentamento', resumo: 'Paulo não diz "posso tudo" — diz "posso todas as coisas naquele que me fortalece". A força vem de Cristo, não de nós mesmos.', citacao: '«O segredo não é ter tudo — é ter a Cristo em tudo.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // JEREMIAS 29:11 — PLANOS DE DEUS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'jr', capitulo: 29, versiculo: 11,
    tema: 'Planos de paz e futuro — Esperança no exílio',
    contexto: 'Deus promete ao povo exilado que tem planos de paz e não de mal, para dar-lhes futuro e esperança.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Providência', resumo: 'Mesmo no exílio — consequência da desobediência — Deus mantém planos de bem. A disciplina divina não é abandono.', citacao: '«Deus não abandona Seu povo no exílio — Ele transforma o castigo em restauração.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Os planos de Deus são soberanos — mesmo quando o povo sofre as consequências de suas escolhas, Deus tem um propósito redentor.', citacao: '«Deus não é surpreendido pelo exílio — Seus planos de bem permanecem mesmo quando falhamos.»' },
      { teologo: 'Jürgen Moltmann', periodo: '1926-2024', tradicao: 'Teologia da Esperança', visao: 'Esperança', resumo: 'A promessa de futuro não é apenas para Israel — é para toda a criação. Deus é o Deus do futuro — a esperança cristã é certeza do que virá.', citacao: '«A esperança cristã não é fuga do presente — é engajamento no futuro de Deus.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // ISAÍAS 40:31 — RENOVAÇÃO DE FORÇAS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'is', capitulo: 40, versiculo: 31,
    tema: 'Renovarão as forças — Espera no Senhor',
    contexto: 'Isaías promete que os que esperam no Senhor renovarão suas forças — subirão com asas como águias.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Esperança', resumo: 'A espera no Senhor não é passividade — é confiança ativa. A renovação vem para quem deposita sua esperança em Deus.', citacao: '«A espera em Deus não cansa — ela renova. Quem confia no Senhor recebe forças novas.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Renovação', resumo: 'A força humana é limitada — a de Deus é infinita. Quem espera em Deus recebe forças que ultrapassam a capacidade natural.', citacao: '«Os que esperam no Senhor renovarão as forças — porque Deus é a fonte inesgotável de energia.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'A águia renova suas penas arrancando as velhas. Às vezes Deus permite a dor para nos renovar.', citacao: '«A águia não voa alto porque é forte — voa alto porque confia no vento. Assim é com Deus.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Anglicana', visao: 'Restauração', resumo: 'A renovação de forças não é apenas espiritual — é restauração completa. Deus não apenas consola, Ele restaura a dignidade e o propósito.', citacao: '«Deus não nos devolve ao estado anterior — Ele nos leva a algo maior.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // 2 TIMÓTEO 3:16 — INSPIRAÇÃO DAS ESCRITURAS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: '2tm', capitulo: 3, versiculo: 16,
    tema: 'Toda Escritura é inspirada por Deus',
    contexto: 'Paulo declara a origem divina de toda a Escritura e sua utilidade para ensino, repreensão, correção e instrução em justiça.',
    interpretacoes: [
      { teologo: 'Atanásio', periodo: '296-373', tradicao: 'Patrística', visao: 'Autoridade canônica', resumo: 'Toda a Escritura provém de Deus e é suficiente para a fé e o ministério. Não precisamos de revelação extra — a Bíblia basta.', citacao: '«As divinas Escrituras bastam para a piedade e para toda a edificação.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola Scriptura', resumo: 'A Bíblia é a autoridade suprema para fé e prática. Não depende da aprovação da Igreja — é autêntica por si mesma.', citacao: '«A Escritura é a rainha — a Igreja é a serva. A Palavra tem autoridade sobre a tradição.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Clareza e suficiência', resumo: 'A Bíblia é a regra infalível de fé; seu testemunho é confirmado pelo Espírito. É clara o suficiente para o crente comum.', citacao: '«A Escritura é a escola do Espírito Santo, onde aprendemos a Deus perfeitamente.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Autoridade', resumo: 'A inspiração não é ditado mecânico — Deus usou personalidades, culturas e estilos humanos, mas garantiu a verdade.', citacao: '«A Bíblia é simultaneamente Palavra de Deus e palavra humana — divina em origem, humana em expressão.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // HEBREUS 11 — HALL DA FÉ
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'hb', capitulo: 11, versiculo: 1,
    tema: 'A fé é a certeza das coisas que se esperam',
    contexto: 'A definição clássica de fé no Novo Testamento: certeza das coisas que se esperam e prova das que não se veem.',
    interpretacoes: [
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Fé e razão', resumo: 'A fé não é cegueira — é certeza fundada na verdade de Deus. A razão prepara o terreno, mas a fé é o ato de adesão ao invisível.', citacao: '«A fé é o início de toda a vida eterna em nós — nos faz ver o que ainda não vemos.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Fiducia', resumo: 'A fé verdadeira não é apenas conhecimento (notitia), mas também confiança pessoal (fiducia). Crer é confiar em Cristo.', citacao: '«A fé é um conhecimento firme da bondade de Deus para conosco.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Certeza', resumo: 'A fé não é probabilidade — é certeza. Não porque temos provas científicas, mas porque Deus é digno de confiança.', citacao: '«A fé é uma convicção firme e segura da verdade de Deus — acima de toda incerteza humana.»' },
      { teologo: 'Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação', resumo: 'A fé é resposta à Palavra de Deus. Não é invenção humana — é Deus quem Se revela e chama.', citacao: '«A fé é a mão aberta que recebe o que Deus dá — e o que Deus dá é Ele mesmo.»' },
    ],
  },
  {
    livro: 'hb', capitulo: 11, versiculo: 6,
    tema: 'Sem fé é impossível agradar a Deus',
    contexto: 'O autor de Hebreus declara que sem fé é impossível agradar a Deus — é necessário crer que Ele existe e que recompensa os que O buscam.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Fé', resumo: 'A fé é o fundamento da relação com Deus. Sem ela, não podemos sequer nos aproximar — quanto mais agradar.', citacao: '«A fé é o passo primeiro — sem ela, não há caminho para Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Recompensa', resumo: 'Deus recompensa os que O buscam sinceramente. A fé não é mérito — mas Deus graciosamente recompensa quem confia nEle.', citacao: '«A fé não é mérito — mas Deus a recompensa. É Sua bondade, não nosso direito.»' },
      { teologo: 'John Piper', periodo: '1946-', tradicao: 'Reformada', visao: 'Deus-centrado', resumo: 'Agradar a Deus é o propósito da vida — e a fé é o meio. Sem fé, buscamos nossa glória; com fé, buscamos a dEle.', citacao: '«A fé é buscar a glória de Deus acima da nossa — e nisso Ele se agrada.»' },
    ],
  },
  {
    livro: 'hb', capitulo: 11, versiculo: 13,
    tema: 'Estrangeiros e peregrinos na terra',
    contexto: 'Os heróis da fé morreram sem receber as promessas — viram de longe e as saudaram, confessando que eram estrangeiros na terra.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Peregrinação', resumo: 'O cristão é peregrino neste mundo — sua pátria é celestial. A fé nos faz estrangeiros aqui e cidadãos do céu.', citacao: '«Somos peregrinos — nossa pátria não é aqui, mas no céu. A fé nos faz caminhar para casa.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Esperança', resumo: 'Os santos antigos morreram sem ver o cumprimento — mas viram de longe. A fé é ver o futuro prometido como se já fosse presente.', citacao: '«A fé vê de longe o que ainda não chegou — e se alegra como se já tivesse chegado.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Anglicana', visao: 'Aliança', resumo: 'Os heróis da fé viveram entre duas alianças — viram a promessa, mas não seu cumprimento. Nós vivemos no cumprimento — quanto mais devemos crer.', citacao: '«Eles viram de longe — nós vemos de perto. Nossa responsabilidade é maior.»' },
    ],
  },
  {
    livro: 'hb', capitulo: 11, versiculo: 6,
    tema: 'Oração dos anciãos — Cura pela fé',
    contexto: 'Tiago instrui os doentes a chamar os anciãos da igreja para orar e ungir com óleo — a oração da fé salvará o enfermo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cura', resumo: 'A cura divina é real — mas não é automática. A oração da fé é instrumento de Deus, não garantia de cura imediata.', citacao: '«Deus pode curar — e muitas vezes cura através da oração da fé.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Comunidade', resumo: 'A cura não é assunto individual — envolve a comunidade. Os anciãos representam a igreja intercedendo pelo enfermo.', citacao: '«A oração da igreja é poderosa — Deus atende quando Seu povo intercede com fé.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Prático', resumo: 'O óleo pode ter valor medicinal (Tiago não exclui medicina), mas a oração é o elemento essencial. Fé e medicina não se excluem.', citacao: '«A fé não exclui a medicina — a oração e o tratamento andam juntos.»' },
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
for (const e of estudosClassicosCanon) addToIndex(e);

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
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Encarnação', resumo: 'O nome Emmanuel significa que Deus Se fez homem para habitar conosco. A encarnação é o mistério central da fé.', citacao: '«Deus Se fez homem para que o homem pudesse se tornar, por graça, participaçãoário da natureza divina.»' },
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
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Nova Perspectiva', visao: 'Fé como lealdade', resumo: 'No contexto original hebraico, fé (emunah) significa lealdade e fidelidade. O justo viverá mantendo aliança — não apenas crendo, mas perseverando em fidelidade.', citacao: '«A fé bíblica não é apenas crença mental — é lealdadeprática ao Deus da aliança.»' },
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
    contexto: 'O autor exorta os crentes a perseverarem, tendo como testemunhas os heróis da fé do capítulo 11 — uma nuvem de testemunhas.',
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
  // ═══════════════════════════════════════════════════════════════════════
  // SALTOS E SALMOS EXPANDIDOS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'sl', capitulo: 23, versiculo: 1,
    tema: 'O Senhor é o meu pastor',
    contexto: 'O Salmo mais conhecido da Bíblia. David, que era pastor, compara Deus ao pastor perfeito que cuida de suas ovelhas.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cristo como Bom Pastor', resumo: 'Este salmo é uma profecia de Cristo. Ele é o Bom Pastor que dá a vida pelas ovelhas. Em Deus como pastor, encontramos provisão, proteção e descanso.', citacao: '«Cristo é nosso Pastor — e nós somos suas ovelhas. Ele nos pastoreia com amor eterno.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1564', tradicao: 'Reforma', visao: 'Confiança', resumo: 'A chave é \"o meu\" — não basta saber que Deus é pastor, é preciso fazê-lo SEU pastor. A fé pessoal transforma conhecimento em experiência.', citacao: '«A fé diz: \"Deus é MEU pastor\" — não apenas o pastor do mundo, mas o meu.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Graça', resumo: 'David não diz \"eu cuido de mim mesmo\" — ele reconhece dependência total. Num mundo que exige autossuficiência, admitir que precisa de um pastor é revolucionário.', citacao: '«A verdadeira liberdade não é não precisar de ninguém — é confiar no Pastor perfeito.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 51, versiculo: 10,
    tema: 'Cria em mim um coração puro',
    contexto: 'David escreve este salmo após seu pecado com Betecebá. É o maior salmo de arrependimento da Bíblia — uma confissão completa.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Arrependimento', resumo: 'David não pede apenas perdão — pede transformação interior. O pecado não é apenas ação, é condição do coração. Só Deus pode criar um coração puro.', citacao: '«Não peço apenas limpeza, mas uma nova criação — um coração puro que me faça capaz de te amar.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Regeneração', resumo: 'O arrependimento verdadeiro começa não com remorso, mas com pedido de transformação. David sabe que não pode se limpar — precisa de um novo coração.', citacao: '«A penitência verdadeira não é tristeza pelo pecado, mas desejo de santidade.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 119, versiculo: 105,
    tema: 'Lâmpada para os meus pés',
    contexto: 'O mais longo salmo da Bíblia, um poema acrostico sobre a Palavra de Deus. Este versículo é seu verso central.',
    interpretacoes: [
      { teologo: 'Martinho Lutero', periodo: '1483-1564', tradicao: 'Reforma', visao: 'Sola Scriptura', resumo: 'A Bíblia não ilumina todo o caminho de uma vez — ela ilumina apenas os próximos passos. É assim que Deus nos guia: passo a passo, em fé.', citacao: '«A Palavra de Deus não mostra o caminho inteiro — mostra o próximo passo.»' },
      { teologo: 'John Piper', periodo: '1946-presente', tradicao: 'Reformada', visao: 'Alegria', resumo: 'A Bíblia não é apenas regra de vida — é fonte de alegria. Quanto mais lemos, mais conhecemos Deus, e quanto mais conhecemos Deus, mais nos alegramos.', citacao: '«A Bíblia não é um manual de instruções — é uma carta de amor que traz alegria.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // PROVÉRBIOS EXPANDIDOS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'pv', capitulo: 3, versiculo: 5,
    tema: 'Confia no Senhor de todo o teu coração',
    contexto: 'Um dos versículos mais memorizados da Bíblia. Salomão ensina que a verdadeira sabedoria começa com confiança total em Deus.',
    interpretacoes: [
      { teologo: 'Martinho Lutero', periodo: '1483-1564', tradicao: 'Reforma', visao: 'Fé', resumo: 'Confiar de todo o coração significa não confiar em parte em Deus e em parte na própria compreensão. É um abandono total da autoconfiança.', citacao: '«A fé não divide lealdade — ela a concentra toda em Deus.»' },
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Confessional', visao: 'Cruz', resumo: 'A confiança plena em Deus muitas vezes significa aceitar o que não entendemos. É na escuridão que a fé se prova verdadeira.', citacao: '«Quando Deus nos chama, Ele nos leva aonde nossa compreensão falha — e é aí que a fé começa.»' },
    ],
  },
  {
    livro: 'pv', capitulo: 22, versiculo: 6,
    tema: 'Instruí o menino no caminho',
    contexto: 'Provérbio sobre educação e criação de filhos — o princípio de que a formação da infância molda o adulto.',
    interpretacoes: [
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Educação', resumo: 'A educação não é apenas informação — é formação de caráter. Crianças que aprendem os caminhos de Deus desde cedo têm um fundamento inabalável.', citacao: '«Ensine o menino no caminho, e quando for velho não se desviará dele.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Família', resumo: 'Este provérbio não é uma promessa garantida, mas um princípio geral. A educação cristã não é controle — é semear sementes que Deus faz brotar.', citacao: '«Não podemos forçar resultados, mas podemos semear sementes de fé que duram para sempre.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // ISAÍAS EXPANDIDO
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'is', capitulo: 9, versiculo: 6,
    tema: 'Príncipe da Paz',
    contexto: 'A profecia messiânica mais famosa de Isaías — o nascimento do Messias que seria chamado Maravilhoso, Conselheiro, Deus Forte, Pai eterno, Príncipe da Paz.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Encarnação', resumo: 'As quatro names messiânicas revelam quem é Jesus: Maravilhoso (mistério), Conselheiro (sabedoria), Deus Forte (poder), Pai eterno (cuidado), Príncipe da Paz (reconciliação).', citacao: '«Nestas palavras, Isaías descreve o que João descreverá: o Verbo se fez carne.»' },
      { teologo: 'Martin Luther King Jr.', periodo: '1929-1968', tradicao: 'Batista', visao: 'Paz', resumo: 'A paz que Jesus traz não é ausência de conflito — é justiça. A verdadeira paz vem quando todos são tratados com dignidade.', citacao: '«A paz não é apenas ausência de tensão — é presença de justiça.»' },
    ],
  },
  {
    livro: 'is', capitulo: 53, versiculo: 5,
    tema: 'Machucado pelas nossas transgressões',
    contexto: 'O capítulo 53 de Isaías é a profecia mais clara sobre a morte expiatória do Messias no Antigo Testamento — a «profecia da cepa sofredora».',
    interpretacoes: [
      { teologo: 'Martinho Lutero', periodo: '1483-1564', tradicao: 'Reforma', visao: 'Substituição', resumo: 'Cristo foi machucado por NOSSAS transgressões — Ele tomou o castigo que merecíamos. Esta é a essência da expiação substitutiva.', citacao: '«Ele foi ferido por nossas rebeliões — o castigo que era nosso caiu sobre Ele.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Cruz', resumo: 'A cruz não é acidente — é plano eterno de Deus. A ferida de Cristo é a cura do mundo. A morte dele é a nossa vida.', citacao: '«Na cruz, a justiça de Deus e a misericórdia de Deus se encontram — e nós somos salvos.»' },
    ],
  },
  {
    livro: 'is', capitulo: 40, versiculo: 31,
    tema: 'Renovarão as forças',
    contexto: 'O início da segunda parte de Isaías (capítulos 40-55), voltada ao exílio em Babilônia. A promessa é de restauração e renovamento.',
    interpretacoes: [
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Esperança', resumo: 'A promessa não é força própria — é força recebida. Quem espera no Senhor não se cansa porque não depende de suas próprias forças.', citacao: '«Os que esperam no Senhor não correm — voam.»' },
      { teologo: 'N.T. Wright', periodo: '1948-presente', tradicao: 'Anglicana', visao: 'Renovação', resumo: 'A renovação de forças não é apenas espiritual — é restauração completa. Deus não apenas consola, Ele restaura a dignidade e o propósito.', citacao: '«Deus não nos devolve ao estado anterior — Ele nos leva a algo maior.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // MATEUS EXPANDIDO
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'mt', capitulo: 11, versiculo: 28,
    tema: 'Vinde a mim todos os que estais cansados',
    contexto: 'Jesus convida os que carregam fardos pesados — um dos versículos mais reconfortantes do Novo Testamento.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Descanso', resumo: 'O descanso de Cristo não é inatividade — é cessar de lutar contra o pecado pela nossa própria força. É entregar o fardo e aceitar a graça.', citacao: '«O jugo de Cristo é suave porque é leve — é o peso da graça, não da lei.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Graça', resumo: 'Jesus não diz \"venham os perfeitos\" — diz \"os cansados\". O evangelho é para quem reconhece que não consegue mais carregar sozinho.', citacao: '«O evangelho não é para os que se sentem fortes — é para os que sabem que são fracos.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 6, versiculo: 9,
    tema: 'Pai nosso que estais nos céus',
    contexto: 'O Pai-Nosso, a oração modelada por Jesus — o padrão de toda oração cristã.',
    interpretacoes: [
      { teologo: 'Martinho Lutero', periodo: '1483-1564', tradicao: 'Reforma', visao: 'Oração', resumo: 'Lutero ensinava que o Pai-Nosso contém tudo o que podemos pedir. Começa com a glória de Deus e termina com nossas necessidades — a ordem certa.', citacao: '«O Pai-Nosso é a oração perfeita — todas as outras orações cabem nele.»' },
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Confessional', visao: 'Comunidade', resumo: 'Note que Jesus diz \"nosso\", não \"meu\". A oração cristã é sempre comunitária. Quando oramos, oramos com e pela Igreja.', citacao: '«Não existe oração cristã solitária — sempre oramos como membros do corpo de Cristo.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 24, versiculo: 35,
    tema: 'O céu e a terra passarão',
    contexto: 'Jesus fala sobre o fim dos tempos — as palavras dele nunca passarão, mesmo quando tudo ao redor mudar.',
    interpretacoes: [
      { teologo: 'N.T. Wright', periodo: '1948-presente', tradicao: 'Anglicana', visao: 'Escatologia', resumo: 'A palavra de Jesus não é apenas eterna — é transformadora. Ela não sobreviverá apenas ao fim — ela CRIA o novo mundo.', citacao: '«As palavras de Jesus não apenas sobrevivem ao fim — elas inauguram o novo céu e a nova terra.»' },
      { teologo: 'John Piper', periodo: '1946-presente', tradicao: 'Reformada', visao: 'Eternidade', resumo: 'Tudo o que o mundo oferece é temporário — apenas a Palavra de Jesus permanece. Nossos problemas são temporários; a promessa de Deus é eterna.', citacao: '«O mundo passa — mas a Palavra de Cristo permanece para sempre.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // LUCAS EXPANDIDO
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'lc', capitulo: 1, versiculo: 37,
    tema: 'Nenhuma coisa é impossível para Deus',
    contexto: 'O anjo Gabriel anuncia a Maria que ela conceberá por obra do Espírito Santo — a promessa de que Deus pode fazer o impossível.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Onipotência', resumo: 'Deus não faz o logicamente impossível (como um círculo quadrado), mas o naturalmente impossível — a encarnação, a ressurreição, a salvação.', citacao: '«Deus não faz o absurdo — Ele faz o impossível.»' },
      { teologo: 'John Calvin', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'A impossibilidade humana não limita Deus. A virgem conceber, Lázaro ressuscitar, o mundo ser salvo — tudo é possível para quem criou o universo.', citacao: '«Não há limite para o poder de Deus — o impossível para nós é simples para Ele.»' },
    ],
  },
  {
    livro: 'lc', capitulo: 15, versiculo: 11,
    tema: 'A parábola do filho pródigo',
    contexto: 'Uma das parábolas mais famosas de Jesus — sobre um filho que desperdiça sua herança e retorna arrependido ao pai.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Conversão', resumo: 'O filho pródigo representa todo pecador que desperdiça a herança da graça. O retorno não é mérito — é o início da misericórdia. O pai corre ao encontro, não espera de braços cruzados.', citacao: '«O pai não esperou — correu. Assim Deus corre ao encontro do pecador arrependido.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Graça', resumo: 'O verdadeiro problema não é apenas o filho que foi embora, mas o filho que ficou e não se alegrou com o perdão. A parábola é tanto sobre auto-justiça quanto sobre pecado.', citacao: '«A graça de Deus é tão escandalosa que ofende tanto os pecadores quanto os religiosos.»' },
    ],
  },
  {
    livro: 'lc', capitulo: 23, versiculo: 34,
    tema: 'Pai, perdoa-lhes',
    contexto: 'A primeira palavra de Jesus na cruz — mesmo sendo torturado injustamente, Ele pede o perdão para seus algozes.',
    interpretacoes: [
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Confessional', visao: 'Graça barata', resumo: 'A graça que Jesus oferece na cruz é gratuita — mas não é barata. Custou a vida dele. O perdão não minimiza o pecado — o custo da cruz o revela em toda a sua gravidade.', citacao: '«A graça gratuita não é graça barata — ela custou a vida do Filho de Deus.»' },
      { teologo: 'N.T. Wright', periodo: '1948-presente', tradicao: 'Anglicana', visao: 'Reconciliação', resumo: 'Jesus não apenas perdoa — Ele inaugura o novo pacto com seu sangue. Na cruz, a velha ordem morre e a nova começa.', citacao: '«Na cruz, Jesus não apenas sofre — Ele está criando um novo povo, uma nova aliança, um novo mundo.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // ATOS EXPANDIDO
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'at', capitulo: 1, versiculo: 8,
    tema: 'Recebereis poder quando o Espírito Santo descer',
    contexto: 'A última instrução de Jesus antes da ascensão — a promessa do Espírito Santo e a missão global da Igreja.',
    interpretacoes: [
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Missões', resumo: 'A ordem é clara: primeiro o poder do Espírito, depois o testemunho em Jerusalém, na Judeia, na Samaria e até os confins da terra. A missão é centrípeta — começa em casa e vai até o mundo.', citacao: '«O evangelho começa em Jerusalém e vai até os confins da terra — mas começa em casa.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1564', tradicao: 'Reforma', visao: 'Espírito', resumo: 'Sem o Espírito Santo, não há testemunho eficaz. A Igreja não depende de estratégia humana, mas do poder divino.', citacao: '«A Igreja não avança por força humana — avança pelo poder do Espírito.»' },
    ],
  },
  {
    livro: 'at', capitulo: 2, versiculo: 38,
    tema: 'Arrependei-vos e sede batizados',
    contexto: 'O sermão de Pedro no Pentecostes — o primeiro chamado à salvação na história da Igreja, resultando em 3 mil conversões.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Arrependimento', resumo: 'Arrependimento e batismo não são obras que salvam — são respostas à graça de Deus. O arrependimento é a mudança de mente que leva à mudança de vida.', citacao: '«O arrependimento não é obra nossa — é dom de Deus que nos capacita a voltar para Ele.»' },
      { teologo: 'N.T. Wright', periodo: '1948-presente', tradicao: 'Anglicana', visao: 'Novo pacto', resumo: 'A promessa é para \"vós e vossos filhos\" — não é individual, é familiar e comunitária. O batismo marca a entrada no novo povo de Deus.', citacao: '«A promessa do Espírito é para toda a família — gerações inteiras são chamadas.»' },
    ],
  },
  {
    livro: 'at', capitulo: 4, versiculo: 12,
    tema: 'Não há salvação em nenhum outro',
    contexto: 'Pedro diante do Sinédrio — a declaração mais exclusivista e mais universal do cristianismo primitivo.',
    interpretacoes: [
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Cristologia', resumo: 'A exclusividade de Cristo não é arrogância — é humildade. Não inventamos um Deus que salva — recebemos o único que se revelou.', citacao: '«A exclusividade de Cristo não é intolerância — é fidelidade ao Deus que se revelou.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Universalidade', resumo: 'O único nome dado aos homens é um dom — não uma restrição. Deus não restringe a salvação — Ele a oferece a todos através de um único caminho.', citacao: '«A salvação em somente um nome não é restrição — é a generosidade de Deus em oferecer um caminho certo.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // ROMANOS EXPANDIDO
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'rm', capitulo: 3, versiculo: 23,
    tema: 'Todos pecaram',
    contexto: 'O diagnóstico universal do pecado — o versículo que fundamenta toda a teologia da depravação humana.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Pecado original', resumo: 'O pecado não é apenas ato — é condição. Todos pecaram significa que ninguém é justo por si mesmo. A solução não é melhoria, mas regeneração.', citacao: '«O pecado é a condição da natureza humana caída — não apenas a violação de uma lei.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1564', tradicao: 'Reforma', visao: 'Justificação', resumo: 'Este versículo é a base da justificação pela fé. Se todos pecaram, ninguém pode se salvar por obras. A salvação é dom gratuito.', citacao: '«Se todos pecaram, ninguém pode se justificar — a salvação é só pela graça.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 6, versiculo: 23,
    tema: 'O salário do pecado é a morte',
    contexto: 'O versículo que conecta a gravidade do pecado com o dom da vida eterna — dois destinos, duas escolhas.',
    interpretacoes: [
      { teologo: 'John Piper', periodo: '1946-presente', tradicao: 'Reformada', visao: 'Dualidade', resumo: 'O versículo tem duas metades: morte (pecado) e graça (Cristo). A morte é o salário que merecemos; a graça é o dom que não merecemos.', citacao: '«O pecado paga salário — mas a graça dá presente. E o presente é infinitamente maior.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Cruz', resumo: 'O salário do pecado é a morte — mas Cristo tomou esse salário na cruz. O que merecíamos foi pago por Ele.', citacao: '«Na cruz, Jesus recebeu o salário que merecíamos — para que pudéssemos receber o dom que não merecíamos.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 10, versiculo: 9,
    tema: 'Se confessares com a tua boca',
    contexto: 'A fórmula da salvação em Romanos — confessar e crer que Deus ressuscitou a Jesus dos mortos.',
    interpretacoes: [
      { teologo: 'Martinho Lutero', periodo: '1483-1564', tradicao: 'Reforma', visao: 'Fé', resumo: 'Confessar e crer não são obras — são a resposta da fé. A salvação é pela graça mediante a fé — não pelo mérito.', citacao: '«A fé que salva não é sentimento — é confiança em Cristo e em sua ressurreição.»' },
      { teologo: 'N.T. Wright', periodo: '1948-presente', tradicao: 'Anglicana', visao: 'Ressurreição', resumo: 'A ressurreição não é apenas evento passado — é a realidade que define o futuro. Crer na ressurreição é aceitar que Deus vai renovar tudo.', citacao: '«Cristo ressuscitou — e isso muda tudo. O futuro do mundo já começou.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // 1 CORÍNTIOS E GÁLATAS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: '1co', capitulo: 13, versiculo: 4,
    tema: 'O amor é sofredor',
    contexto: 'O hino ao amor — o capítulo mais lido em casamentos, mas que vai muito além do romantismo. É a definição divina do amor.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Caridade', resumo: 'O amor de 1 Coríntios 13 é o amor de Deus — ágape. Não é sentimento, é escolha. É a virtude que permanece quando tudo o mais passa.', citacao: '«A fé, a esperança e o amor permanecem — mas o maior é o amor.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Cruz', resumo: 'Cristo é o cumprimento perfeito deste poema. Ele é sofredor, bondoso, não inveja, não se orgulha. O amor de 1 Coríntios 13 é o amor da cruz.', citacao: '«O amor que Paulo descreve não é um ideal impossível — é o amor que vemos na cruz de Cristo.»' },
    ],
  },
  {
    livro: 'gl', capitulo: 5, versiculo: 22,
    tema: 'Os frutos do Espírito',
    contexto: 'A lista dos frutos do Espírito — não são obras que fazemos, mas frutos que o Espírito produz em nós.',
    interpretacoes: [
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Confessional', visao: 'Obediência', resumo: 'Os frutos do Espírito não são virtudes que cultivamos — são evidências de uma vida rendida a Cristo. Não produzimos fruto por esforço, mas por conexão.', citacao: '«O fruto não é obra do homem — é obra do Espírito no homem que se rende.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Caráter', resumo: 'Nove frutos, uma árvore. O fruto do Espírito é unidade — não podemos ter amor sem paciência, nem bondade sem mansidão. São inseparáveis.', citacao: '«O fruto do Espírito é um — nove facetas de uma mesma joia: o caráter de Cristo.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // EFÉSIOS, FILIPENSES, COLOSSENSSES
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'ef', capitulo: 2, versiculo: 8,
    tema: 'Pela graça sois salvos',
    contexto: 'O versículo central da soteriologia paulina — a salvação é dom de Deus, não resultado de obras humanas.',
    interpretacoes: [
      { teologo: 'Martinho Lutero', periodo: '1483-1564', tradicao: 'Reforma', visao: 'Sola Gratia', resumo: 'A salvação é pela graça — não pela lei, não por obras, não por mérito. É o coração da Reforma: salvação por graça mediante fé.', citacao: '«Somos salvos por graça, mediante fé — não por obras, para que ninguém se glorie.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eleição', resumo: 'A graça precede a fé — Deus nos escolheu antes que pudéssemos escolher. A salvação é 100% obra de Deus, 0% obra humana.', citacao: '«A fé é o meio pelo qual recebemos a graça — mas a graça é a fonte de tudo.»' },
    ],
  },
  {
    livro: 'fp', capitulo: 4, versiculo: 13,
    tema: 'Posso todas as coisas naquele que me fortalece',
    contexto: 'Paulo escreve da prisão — não é sobre vitória esportiva, mas sobre contentamento em qualquer circunstância.',
    interpretacoes: [
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Contentamento', resumo: 'Paulo não diz \"posso tudo\" — diz \"posso todas as coisas naquele que me fortalece\". A força vem de Cristo, não de nós mesmos.', citacao: '«O segredo não é ter tudo — é ter a Cristo em tudo.»' },
      { teologo: 'John Piper', periodo: '1946-presente', tradicao: 'Reformada', visao: 'Dependência', resumo: 'A verdadeira força é reconhecer nossa fraqueza. Paulo aprendeu que quanto mais fraco ele era, mais Cristo operava nele.', citacao: '«Quando somos fracos, então somos fortes — porque Cristo opera em nossa fraqueza.»' },
    ],
  },
  {
    livro: 'cl', capitulo: 3, versiculo: 23,
    tema: 'Tudo o que fizerdes, fazei de todo o coração',
    contexto: 'Paulo transforma o trabalho cotidiano em ato de adoração — tudo é para o Senhor, não para patrões.',
    interpretacoes: [
      { teologo: 'Martinho Lutero', periodo: '1483-1564', tradicao: 'Reforma', visao: 'Vocação', resumo: 'Lutero reformou o conceito de trabalho: lavar louça é tão sagrado quanto pregar. Toda vocação é chamamento de Deus.', citacao: '«Não há trabalho pequeno diante de Deus — tudo é oportunidade de servir.»' },
      { teologo: 'Dorothy Sayers', periodo: '1893-1957', tradicao: 'Anglicana', visao: 'Trabalho', resumo: 'O trabalho não é apenas meio de subsistência — é expressão da criatividade humana feita à imagem de Deus. Fazer bem é glorificar a Deus.', citacao: '«O trabalho não é um meio para ganhar a vida — é a vida em si mesma, uma oportunidade de gloria.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // HEBREUS, TIAGO, PEDRO, APOCALIPSE
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'hb', capitulo: 11, versiculo: 1,
    tema: 'A fé é o firme fundamento',
    contexto: 'O «hall da fé» — a definição mais precisa de fé em toda a Bíblia, seguida pela lista dos heróis da fé.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Crença', resumo: 'A fé não é cegueiro — é ver o invisível. Os santos antigos viam além do visível e entraram no que Deus prometeu.', citacao: '«A fé é ver o invisível como se fosse visível, e o impossível como se fosse possível.»' },
      { teologo: 'Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação', resumo: 'A fé não é nossa contribuição — é resposta à revelação de Deus. Deus fala, e nós cremos. A fé é ato de Deus em nós.', citacao: '«A fé não é nossa descoberta — é Deus quem se revela e nos faz crer.»' },
    ],
  },
  {
    livro: 'tg', capitulo: 2, versiculo: 17,
    tema: 'A fé sem obras é morta',
    contexto: 'Tiago confronta a falsa noção de que basta crer intelectualmente — a fé verdadeira se demonstra em ação.',
    interpretacoes: [
      { teologo: 'Lutero', periodo: '1483-1564', tradicao: 'Reforma', visao: 'Fé + Obras', resumo: 'Lutero chamou Tiago de «epístola de palha» porque parecia contradazer Paulo. Mas Tiago não fala de fé sem obras — fala de obras como evidência da fé.', citacao: '«Tiago não contradiz Paulo — ambos dizem que a fé verdadeira produz frutos.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Evidência', resumo: 'A fé sem obras não é fé fraca — é fé morta. A obra não salva, mas é prova de que a fé está viva.', citacao: '«A fé que não produz obras é como um corpo sem respiração — morta por dentro.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 3, versiculo: 20,
    tema: 'Eis que estou à porta e bato',
    contexto: 'Jesus bate à porta — imagem clássica do convite divino. Ele não arromba, Ele espera que abramos.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Liberdade', resumo: 'Deus respeita nossa liberdade — Ele bate, mas não entra à força. A salvação é convite, não imposição.', citacao: '«Deus bate à porta — mas só entra quando abrimos.»' },
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Confessional', visao: 'Graça', resumo: 'A porta que Cristo bate é o coração humano. Ele não força a entrada — mas nunca para de bajar. O convite é eterno.', citacao: '«O amor de Deus não invade — ele convida. E esse convite dura para sempre.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 21, versiculo: 4,
    tema: 'Enxugará toda lágrima',
    contexto: 'A promessa final — um novo céu e uma nova terra onde não haverá mais dor, luto nem morte.',
    interpretacoes: [
      { teologo: 'N.T. Wright', periodo: '1948-presente', tradicao: 'Anglicana', visao: 'Nova criação', resumo: 'O Apocalipse não é sobre ir para o céu — é sobre o céu vindo à terra. Deus não destrói a criação, Ele a renova.', citacao: '«Deus não vai nos levar para longe da terra — Ele vai trazer o céu para a terra.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Esperança', resumo: 'A dor não é o fim da história. Deus promete restauração total — não apenas perdoar o passado, mas curar tudo o que foi perdido.', citacao: '«Deus não apenas perdoa — Ele restaura. Todas as lágrimas serão enxugadas.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 8, versiculo: 28,
    tema: 'Todas as coisas contribuem para o bem',
    contexto: 'Paulo garante que Deus soberanamentedireciona todas as circunstâncias da vida dos que O amam para o bem.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Providência', resumo: 'Deus permite o mal, mas dele tira um bem maior. A providência divina não é passiva — é o governo ativo de Deus sobre todas as coisas.', citacao: '«Deus permite que o mal aconteça, mas dele tira um bem maior do que se o impedisse.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Providência', resumo: 'A providência de Deus não elimina o livre-arbítrio, mas direciona tudo para o fim último: a salvação dos santos.', citacao: '«A providência de Deus é tão perfeita que nada escapa ao seu governo, nem mesmo o livre-arbítrio.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Deus não apenas permite — Ele ordena todas as coisas para o bem dos que O amam. Não há acidente na vida do cristão.', citacao: '«Nada acontece ao acaso — Deus governa todas as coisas com sabedoria infinita para o bem dos Seus.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Este versículo é o colchão mais macio do cristão. Quando tudo parece errado, Deus está trabalhando para o bem.', citacao: '«Se Deus permite a tempestade, é porque há um porto seguro do outro lado.»' },
      { teologo: 'Timothy Keller', periodo: '1950-2023', tradicao: 'Reformada', visao: 'Cruz', resumo: 'Não é que tudo seja bom — é que Deus usa tudo para o bem. A cruz parece o pior mal, mas foi o maior bem da história.', citacao: '«A cruz de Cristo é a prova definitiva de que Deus transforma o pior em melhor.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 8, versiculo: 38,
    tema: 'Nada nos separará do amor de Deus',
    contexto: 'Paulo enumera todas as forças cósmicas que tentam nos separar de Cristo — e conclui que nenhuma tem poder.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Perseverança', resumo: 'Nem a morte, nem a vida, nem anjos, nem potestades podem separar-nos do amor de Deus. Esta é a segurança do crente.', citacao: '«Que nos separará do amor de Cristo? Nada — nem a morte, nem a vida, nem o presente, nem o futuro.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Liberdade', resumo: 'O cristão é livre de todo temor — nem morte nem vida podem arrancá-lo das mãos de Deus. A garantia está em Cristo, não em nós.', citacao: '«Nem a morte nem a vida pode nos separar do amor de Deus em Cristo Jesus. Isto é liberdade!»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Cristologia', resumo: 'A pergunta não é se nós agarramos a Deus — é se Ele nos agarra. A resposta é sim: em Cristo, Deus nos segura para sempre.', citacao: '«O amor de Deus não depende da nossa fidelidade — depende da fidelidade dEle.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 12, versiculo: 2,
    tema: 'Renovação do entendimento',
    contexto: 'Paulo ordena que não nos conforme com este mundo, mas que sejamos transformados pela renovação da mente.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Renovação', resumo: 'A transformação começa na mente — quando pensamos como Deus pensa, vivemos como Deus quer. A conversão é intelectual e moral.', citacao: '«A transformação do cristão começa pelo entendimento — renovado pela Palavra de Deus.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Contracultura', resumo: 'A sociedade molda nosso pensamento — a Palavra de Deus o transforma. O cristão é chamado a pensar diferente.', citacao: '«Não pense como o mundo pensa — renove sua mente pela Palavra de Deus.»' },
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Confessional', visao: 'Obediência', resumo: 'A renovação da mente não é apenas intelectual — é uma mudança que resulta em obediência. Pensar diferente leva a viver diferente.', citacao: '«A mente renovada obedece — porque pensa como Deus pensa.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 5, versiculo: 8,
    tema: 'Deus demonstra seu amor',
    contexto: 'O versículo central do evangelho: Deus prova seu amor por nós em que Cristo morreu por nós sendo pecadores.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Graça', resumo: 'Deus não nos amou porque éramos bons — nos amou sendo pecadores. O amor de Deus não depende do nosso valor, mas do dele.', citacao: '«Deus nos amou quando éramos pecadores — não quando éramos dignos.»' },
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Cruz', resumo: 'A cruz é a prova máxima do amor de Deus. Não morremos por pessoas boas — morremos por inimigos. Isto é graça.', citacao: '«Cristo morreu por pecadores — não por justos. Esta é a graça que nos salva.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Substituição', resumo: 'A cruz não é apenas exemplo de amor — é substituição vicária. Cristo morreu em nosso lugar, pagando o preço que devíamos.', citacao: '«Cristo morreu por nós — não apenas por nós, mas no nosso lugar. Esta é a substituição penal.»' },
    ],
  },
  {
    livro: 'ef', capitulo: 2, versiculo: 8,
    tema: 'Salvos pela graça mediante a fé',
    contexto: 'Paulo resume toda a teologia da salvação em um versículo: é dom de Deus, não obra humana.',
    interpretacoes: [
      { teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola Fide', resumo: 'A salvação é 100% graça de Deus e 100% fé humana. Não é graça + obras — é graça alone. A fé é o meio, não o mérito.', citacao: '«Somos salvos pela graça de Deus, mediante a fé — não pelas obras. Nisto está a liberdade cristã.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Sola Gratia', resumo: 'A graça precede a fé — Deus nos capacita a crer antes de crermos. A salvação é inteiramente obra de Deus.', citacao: '«A fé é dom de Deus — não nascemos com capacidade de crer. Deus nos regenera para que possamos crer.»' },
      { teologo: 'John Wesley', periodo: '1703-1791', tradicao: 'Metodista', visao: 'Graça preveniente', resumo: 'A graça de Deus antecipa nossa decisão — Deus nos busca primeiro. A fé é resposta à graça que já está agindo.', citacao: '«A graça de Deus nos precede — Deus nos busca quando ainda não O procuramos.»' },
      { teologo: 'N.T. Wright', periodo: '1948-presente', tradicao: 'Anglicana', visao: 'Nova perspectiva', resumo: 'A fé não é apenas assentimento mental — é lealdade a Jesus como Senhor. A salvação é por graça, mas implica obediência.', citacao: '«A fé é confiança ativa em Jesus como Senhor — não apenas concordância intelectual.»' },
    ],
  },
  {
    livro: 'fp', capitulo: 4, versiculo: 13,
    tema: 'Posso todas as coisas em Cristo',
    contexto: 'Paulo declara que a força para enfrentar qualquer circunstância vem de Cristo que o fortalece.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '-', tradicao: 'Patrística', visao: 'Dependência', resumo: 'Não é "posso todas as coisas" sozinho — é "naquele que me fortalece". A fraqueza humana é preenchida pela força divina.', citacao: '«Posso todas as coisas — não por mim mesmo, mas por Cristo que habita em mim.»' },
      { teologo: 'Charles Spurgeon', periodo: '-', tradicao: 'Batista', visao: 'Prático', resumo: 'Este versículo não é para conquistar riquezas — é para perseverar nas dificuldades. Cristo dá força para sofrer, não apenas para prosperar.', citacao: '«Posso todas as coisas — até mesmo suportar a cruz, até mesmo morrer bem.»' },
      { teologo: 'John Piper', periodo: '1946-presente', tradicao: 'Reformada', visao: 'Glória de Deus', resumo: 'A força de Cristo em nós é para a missão — para fazer Discípulos, para sofrer pelo evangelho, para glorificar a Deus.', citacao: '«Podemos todas as coisas porque Deus quer ser glorificado em nossa fraqueza.»' },
    ],
  },
  {
    livro: 'fp', capitulo: 4, versiculo: 6,
    tema: 'Não vos preocupeis com coisa alguma',
    contexto: 'Paulo ordena que em vez de ansiedade, apresentemos nossas petições a Deus com ações de graças.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '-', tradicao: 'Patrística', visao: 'Oração', resumo: 'A oração é o antídoto contra a ansiedade. Quando oramos, reconhecemos que Deus controla tudo — e a paz vem.', citacao: '«Não vos preocupeis — mas em tudo, pela oração e súplicas, com ações de graças, apresentai os vossos pedidos a Deus.»' },
      { teologo: 'Calvino', periodo: '-', tradicao: 'Reforma', visao: 'Pro providência', resumo: 'A ansiedade é falta de confiança na providência de Deus. Se Deus cuida dos pássaros, quanto mais de nós.', citacao: '«Deus não nos deixou órfãos — Ele nos convidou a orar. E prometeu responder.»' },
      { teologo: 'Timothy Keller', periodo: '-', tradicao: 'Reformada', visao: 'Cruz', resumo: 'A ansiedade não é apenas problema psicológico — é problema teológico. Revela que confiamos mais em nós mesmos do que em Deus.', citacao: '«A oração é o oposto da ansiedade — é reconhecer que Deus é maior do que nossos problemas.»' },
    ],
  },
  {
    livro: 'cl', capitulo: 1, versiculo: 15,
    tema: 'Cristo, imagem do Deus invisível',
    contexto: 'Paulo apresenta o hino cristológico mais elevado do NT — Cristo é a imagem visível do Deus invisível.',
    interpretacoes: [
      { teologo: 'Atanásio', periodo: '-', tradicao: 'Patrística', visao: 'Consubstancialidade', resumo: 'Cristo não é apenas "como" Deus — Ele é Deus. A imagem do Deus invisível é o próprio Deus se revelando em carne.', citacao: '«Ninguém viu a Deus nunca — mas o Filho, que está no seio do Pai, Ele o revelou.»' },
      { teologo: 'Calvino', periodo: '-', tradicao: 'Reforma', visao: 'Cristológico', resumo: 'Cristo é a imagem perfeita de Deus porque é Deus. Não há representação parcial — quem vê o Filho vê o Pai.', citacao: '«Cristo é a imagem do Deus invisível — não porque é uma cópia, mas porque é o próprio Deus.»' },
      { teologo: 'Karl Barth', periodo: '-', tradicao: 'Teologia Dialética', visao: 'Revelação', resumo: 'Cristo não é apenas um revelador — Ele é a revelação. Em Cristo, Deus se torna acessível sem perder sua transcendência.', citacao: '«Cristo é o ponto de encontro entre o Deus invisível e o mundo visível.»' },
    ],
  },
  {
    livro: 'hb', capitulo: 11, versiculo: 1,
    tema: 'A fé é o firme fundamento',
    contexto: 'A definição clássica de fé na Bíblia — certeza das coisas que se esperam, prova das coisas que se não veem.',
    interpretacoes: [
      { teologo: 'Tomás de Aquino', periodo: '-', tradicao: 'Escolástica', visao: 'Fé e razão', resumo: 'A fé não é cega — é certeza racional baseada na revelação de Deus. A razão prepara o caminho, mas a fé vai além.', citacao: '«A fé é o firm fundamento — não é palpitação do sentimento, mas certeza do intelecto.»' },
      { teologo: 'Calvino', periodo: '-', tradicao: 'Reforma', visao: 'Confiança', resumo: 'A fé não é apenas concordância intelectual — é confiança pessoal em Deus e em suas promessas.', citacao: '«A fé é conhecimento seguro da bondade de Deus, firmado na verdade de sua promessa.»' },
      { teologo: 'Martin Luther King Jr.', periodo: '-', tradicao: 'Batista', visao: 'Social', resumo: 'A fé é agir com base no que não vemos, porque acreditamos no que Deus prometeu. A fé gera ação.', citacao: '«A fé é tomar o primeiro passo mesmo quando não vemos a escada inteira.»' },
    ],
  },
  {
    livro: '1jo', capitulo: 4, versiculo: 8,
    tema: 'Deus é amor',
    contexto: 'A declaração mais concisa e profunda sobre a natureza de Deus — amor não é apenas algo que Deus faz, é o que Ele é.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '-', tradicao: 'Patrística', visao: 'Trindade', resumo: 'O amor de Deus se manifesta na Trindade — o Pai ama o Filho, o Filho ama o Pai, e o Espírito é o amor mútuo entre eles.', citacao: '«Deus é amor — e onde há amor, aí está Deus. O amor é a própria essência divina.»' },
      { teologo: 'André Louf', periodo: '-', tradicao: 'Contemplativa', visao: 'Mística', resumo: 'Deus não apenas ama — Ele é amor. Não há momento em que Deus não esteja amando. O amor é o que Ele é, não o que Ele faz.', citacao: '«Deus é amor — não um amor entre outros, mas o amor que é Deus mesmo.»' },
      { teologo: 'Timothy Keller', periodo: '-', tradicao: 'Reformada', visao: 'Cruz', resumo: 'O amor de Deus não é sentimental — é sacrificial. A cruz é onde vemos o que significa "Deus é amor".', citacao: '«O amor de Deus não é um sentimento vago — é a cruz de Cristo.»' },
    ],
  },
  {
    livro: 'tg', capitulo: 1, versiculo: 5,
    tema: 'Pedir sabedoria com fé',
    contexto: 'Tiago ensina que quando nos falta sabedoria, devemos pedir a Deus que dá liberalmente.',
    interpretacoes: [
      { teologo: 'Lutero', periodo: '-', tradicao: 'Reforma', visao: 'Graça', resumo: 'A sabedoria não vem de nós — vem de Deus. Pedir com fé é confiar que Deus ouve e responde.', citacao: '«Se algum de vós tem falta de sabedoria, peça-a a Deus — Ele dá a todos, sem humilhar.»' },
      { teologo: 'John Owen', periodo: '-', tradicao: 'Puritano', visao: 'Santificação', resumo: 'A sabedoria divina é necessária para viver a fé no dia a dia. Deus não nega sabedoria a quem pede com fé.', citacao: '«A sabedoria de Deus é necessária para a vida cristã — e Deus a dá generosamente.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 11, versiculo: 28,
    tema: 'Vinde a mim, todos os cansados',
    contexto: 'Jesus convida os cansados e oprimidos a encontrar descanso nele — o convite mais doce do evangelho.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '-', tradicao: 'Patrística', visao: 'Descanso', resumo: 'O descanso que Jesus oferece não é ociosidade — é paz da alma que encontra seu fim em Deus.', citacao: '«O nosso coração está inquieto enquanto não repousa em Ti, ó Senhor.»' },
      { teologo: 'Calvino', periodo: '-', tradicao: 'Reforma', visao: 'Jugo leve', resumo: 'O jugo de Cristo é leve porque é a graça que carrega, não nossos ombros. A obediência a Cristo é liberdade.', citacao: '«O jugo de Cristo é suave porque é Ele quem carrega o peso.»' },
      { teologo: 'Charles Spurgeon', periodo: '-', tradicao: 'Batista', visao: 'Evangelístico', resumo: 'Este é o convite mais aberto da Bíblia — "todos". Não importa quem você é, Jesus convida você a descansar.', citacao: '«Vinde a mim — todos, sem exceção. Este é o chamado mais doce que já se ouviu.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 51, versiculo: 10,
    tema: 'Cria em mim um coração puro',
    contexto: 'O salmo de arrependimento de Davi após o pecado com Bate-Seba — um grito por renovação espiritual.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '-', tradicao: 'Patrística', visao: 'Arrependimento', resumo: 'Davi não pede perdo exterior — pede transformação interior. A purificação começa no coração.', citacao: '«Cria em mim um coração puro, ó Deus — porque é de dentro que vem a impureza.»' },
      { teologo: 'Martinho Lutero', periodo: '-', tradicao: 'Reforma', visao: 'Graça', resumo: 'Davi sabe que não pode se purificar — precisa que Deus crie em ele um coração novo. A salvação é obra de Deus.', citacao: '«Não diz "limpa-me" — diz "cria em mim". É Deus quem faz a obra nova.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 6, versiculo: 33,
    tema: 'Buscai primeiro o reino de Deus',
    contexto: 'Jesus estabelece a prioridade absoluta: primeiro o reino de Deus e sua justiça, e tudo o mais será acrescentado.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '-', tradicao: 'Patrística', visao: 'Amor ordenado', resumo: 'O problema não é ter coisas — é amar coisas mais que Deus. Buscar primeiro o reino é amar o que é supremo.', citacao: '«Ama Deus acima de tudo, e as coisas de Deus no lugar certo.»' },
      { teologo: 'Calvino', periodo: '-', tradicao: 'Reforma', visao: 'Providência', resumo: 'Deus cuida das necessidades materiais — nossa responsabilidade é buscar o reino. A provisão vem como consequência.', citacao: '«Deus não nos pede para ignorar as necessidades — mas para colocar o reino em primeiro lugar.»' },
      { teologo: 'John Stott', periodo: '-', tradicao: 'Evangélica', visao: 'Prioridades', resumo: 'A ordem é importante — primeiro o reino, depois as necessidades. Inverter é idolatria.', citacao: '«Quando buscamos primeiro o reino, Deus cuida do resto.»' },
    ],
  },
  {
    livro: 'is', capitulo: 40, versiculo: 31,
    tema: 'Subirão com asas como águias',
    contexto: 'O profeta Isaías promete renovação de forças para os que esperam no Senhor — uma das passagens mais encorajadoras do AT.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '-', tradicao: 'Reforma', visao: 'Esperança', resumo: 'A espera do Senhor não é passividade — é confiança ativa que Deus vai agir. A renovação vem para os que esperam.', citacao: '«Os que esperam no Senhor renovarão as forças — como águias que voam mais alto.»' },
      { teologo: 'Charles Spurgeon', periodo: '-', tradicao: 'Batista', visao: 'Prático', resumo: 'A águia renova suas penas arrancando as velhas. Às vezes Deus permite a dor para nos renovar.', citacao: '«A águia não voa alto porque é forte — voa alto porque confia no vento. Assim é com Deus.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 3, versiculo: 23,
    tema: 'Todos pecaram e estão destituídos da glória de Deus',
    contexto: 'A diagnose universal do pecado — ninguém é justo diante de Deus, todos precisam de salvação.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '-', tradicao: 'Patrística', visao: 'Pecado original', resumo: 'O pecado não é apenas ato — é condição. Nascemos pecadores e precisamos de graça para sermos salvos.', citacao: '«Todos pecaram — não apenas em atos, mas em natureza. O pecado é a raiz, não apenas o fruto.»' },
      { teologo: 'Lutero', periodo: '-', tradicao: 'Reforma', visao: 'Justificação', resumo: 'Se todos pecaram, ninguém pode se salvar pelas obras. A justiça vem de fora — de Cristo, não de nós.', citacao: '«Se todos pecaram, ninguém pode se salvar por si mesmo. A justiça vem de Deus.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 6, versiculo: 23,
    tema: 'O salário do pecado é a morte',
    contexto: 'Paulo contrasta o salário do pecado (morte) com o dom de Deus (vida eterna em Cristo Jesus).',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '-', tradicao: 'Reforma', visao: 'Graça', resumo: 'O pecado paga salário — morte. Mas Deus dá dom — vida eterna. Não é salário, é dádiva.', citacao: '«O pecado paga morte — mas o dom de Deus é vida eterna. Não é merecimento, é graça.»' },
      { teologo: 'John Stott', periodo: '-', tradicao: 'Evangélica', visao: 'Substituição', resumo: 'Cristo pagou o salário do pecado que devíamos receber. Na cruz, a morte foi satisfeita.', citacao: '«Cristo recebeu o salário que merecíamos — para que recebêssemos o dom que não merecíamos.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 1, versiculo: 14,
    tema: 'O Verbo se fez carne',
    contexto: 'O mistério da encarnação — o Verbo eterno, Deus, tomou carne humana e habitou entre nós.',
    interpretacoes: [
      { teologo: 'Atanásio', periodo: '-', tradicao: 'Patrística', visao: 'Encarnação', resumo: 'Deus se tornou homem para que o homem pudesse se tornar divino. A encarnação é a ponte entre céu e terra.', citacao: '«O Verbo se fez carne para que nós participássemos da natureza divina.»' },
      { teologo: 'Agostinho', periodo: '-', tradicao: 'Patrística', visao: 'União hipostática', resumo: 'Em Cristo, duas naturezas se unem em uma pessoa — divina e humana. Não há confusão, não há separação.', citacao: '«O Verbo é Deus e homem — completo em ambas as naturezas.»' },
      { teologo: 'Calvino', periodo: '-', tradicao: 'Reforma', visao: 'Glória', resumo: 'A glória do Verbo encarnado é a graça e a verdade que traz. Não é uma glória que ofusca — é uma glória que salva.', citacao: '«Vimos a glória dEle — não a glória do poder, mas a glória da graça.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 3, versiculo: 3,
    tema: 'Nascer de novo',
    contexto: 'Jesus diz a Nicodemos que é preciso nascer de novo — de água e do Espírito — para ver o reino de Deus.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '-', tradicao: 'Patrística', visao: 'Regeneração', resumo: 'Nascer de novo é obra do Espírito — o homem não pode se regenerar sozinho. Deus inicia a obra de transformação.', citacao: '«O homem não pode nascer de novo por si mesmo — é necessário o trabalho do Espírito Santo.»' },
      { teologo: 'Calvino', periodo: '-', tradicao: 'Reforma', visao: 'Eleição', resumo: 'Nascer de novo é dom de Deus — não depende de nossa vontade, mas da soberania divina.', citacao: '«A regeneração é obra exclusiva do Espírito — o homem é totalmente passivo nela.»' },
      { teologo: 'John Wesley', periodo: '-', tradicao: 'Metodista', visao: 'Graça preveniente', resumo: 'Deus dá a todos a graça preveniente que capacita a responder ao evangelho. Nascer de novo é cooperar com a graça.', citacao: '«A graça de Deus nos precede — Deus nos capacita a nascer de novo.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 14, versiculo: 6,
    tema: 'Eu sou o caminho, a verdade e a vida',
    contexto: 'Jesus declara ser o único caminho ao Pai — exclusividade cristológica no seu nível mais alto.',
    interpretacoes: [
      { teologo: 'Tomás de Aquino', periodo: '-', tradicao: 'Escolástica', visao: 'Exclusividade', resumo: 'Cristo é o único caminho porque é o único que satisfaz plenamente a Deus. Não há salvação fora dEle.', citacao: '«Ninguém vai ao Pai senão por Cristo — porque só Ele é caminho, verdade e vida.»' },
      { teologo: 'Karl Barth', periodo: '-', tradicao: 'Teologia Dialética', visao: 'Revelação', resumo: 'Cristo não é uma opção entre muitas — é a revelação definitiva de Deus. Não há Deus senão o Deus revelado em Cristo.', citacao: '«Cristo é o único caminho porque é a única revelação verdadeira de Deus.»' },
      { teologo: 'N.T. Wright', periodo: '1948-presente', tradicao: 'Anglicana', visao: 'Missões', resumo: 'A exclusividade de Cristo não é arrogância — é urgência. Se Cristo é o único caminho, a missão é vital.', citacao: '«Se Jesus é o único caminho, não podemos ser indiferentes.»' },
    ],
  },
  {
    livro: 'hb', capitulo: 12, versiculo: 1,
    tema: 'Corramos com paciência a carreira',
    contexto: 'A imagem do cristão como corredor na arena — cercado de testemunhas, deixando todo peso e pecado.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '-', tradicao: 'Patrística', visao: 'Perseverança', resumo: 'A vida cristã é uma corrida — não sprint. A paciência é necessária porque a vitória não é instantânea.', citacao: '«Corramos com paciência — a vitória não é para os rápidos, mas para os perseverantes.»' },
      { teologo: 'Charles Spurgeon', periodo: '-', tradicao: 'Batista', visao: 'Prático', resumo: 'A nuvem de testemunhas nos rodeia — os santos que já correram e venceram. Eles nos encorajam a não desistir.', citacao: '«Temos uma nuvem de testemunhas — não para nos julgar, mas para nos encorajar.»' },
    ],
  },
  {
    livro: '1co', capitulo: 15, versiculo: 3,
    tema: 'Cristo morreu por nossos pecados',
    contexto: 'Paulo transmite o evangelho mais antigo — tradição recebida e transmitida: Cristo morreu, sepultou e ressuscitou.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '-', tradicao: 'Patrística', visao: 'Substituição', resumo: 'A morte de Cristo é vicária — morreu em nosso lugar, pagando o preço do pecado.', citacao: '«Cristo morreu por nossos pecados — não pelos seus, mas pelos nossos.»' },
      { teologo: 'Lutero', periodo: '-', tradicao: 'Reforma', visao: 'Satisfação', resumo: 'A cruz é a satisfação plena pela injustiça humana. Deus julgou o pecado em Cristo para nos perdoar.', citacao: '«Na cruz, Deus julgou o pecado — para que não julgasse o pecador.»' },
    ],
  },
  {
    livro: 'ef', capitulo: 6, versiculo: 10,
    tema: 'Fortalecei-vos no Senhor',
    contexto: 'Paulo conclui a carta com a exortação à guerra espiritual — vestir a armadura de Deus.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '-', tradicao: 'Reforma', visao: 'Guerra espiritual', resumo: 'A força vem do Senhor — não de nós mesmos. A armadura de Deus é a graça que nos protege.', citacao: '«A guerra espiritual não é com armas humanas — é com a verdade, a justiça e a fé.»' },
      { teologo: 'John Stott', periodo: '-', tradicao: 'Evangélica', visao: 'Prático', resumo: 'A armadura de Deus não é teórica — é para uso diário. Cada peça representa uma verdade que devemos viver.', citacao: '«A armadura de Deus é para ser vestida, não apenas estudada.»' },
    ],
  },
  {
    livro: '1pe', capitulo: 5, versiculo: 7,
    tema: 'Lançando sobre ele todo o vosso cuidado',
    contexto: 'Pedro exorta a lançar toda ansiedade sobre Deus porque Ele mesmo cuida de nós.',
    interpretacoes: [
      { teologo: 'Lutero', periodo: '-', tradicao: 'Reforma', visao: 'Confiança', resumo: 'Deus não é um ser distante — Ele cuida pessoalmente de nós. Podemos lançar nossos cuidados sobre Ele.', citacao: '«Deus cuida de vós — portanto, não carregueis o peso sozinhos.»' },
      { teologo: 'Charles Spurgeon', periodo: '-', tradicao: 'Batista', visao: 'Prático', resumo: 'Este versículo é o remédio contra a ansiedade. Se Deus cuida dos pássaros, quanto mais de nós.', citacao: '«Lançai sobre ele todo o vosso cuidado — porque Ele mesmo cuida de vós.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 23, versiculo: 4,
    tema: 'A vale da sombra da morte',
    contexto: 'Mesmo no valley mais escuro, o pastor está presente — "não temerei mal algum, porque tu estás comigo".',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '-', tradicao: 'Patrística', visao: 'Companhia', resumo: 'A presença de Deus transforma o vale da sombra — não elimin a escuridão, mas dá coragem para atravessá-la.', citacao: '«Mesmo no vale da sombra da morte, não temo — porque tu estás comigo.»' },
      { teologo: 'Spurgeon', periodo: '-', tradicao: 'Batista', visao: 'Pastoral', resumo: 'O pastor caminha conosco no vale — não nos promete evitar o vale, mas promete estar conosco nele.', citacao: '«O pastor não nos livra do vale — mas caminha conosco através dele.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // NOVOS ESTUDOS — Versículos fundamentais que faltavam
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'gn', capitulo: 15, versiculo: 6,
    tema: 'Justificação pela fé — Abram creu em Deus',
    contexto: 'Abram acredita na promessa de Deus de que teria descendência numerosa, e isso lhe foi creditado como justiça. Este é o fundamento da doutrina da justificação pela fé.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Graça', resumo: 'A fé de Abram não era mérito próprio — era resposta à graça de Deus. A justiça sempre vem de Deus para o homem, nunca do homem para Deus.', citacao: '«A fé é um dom de Deus — não uma conquista do homem.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola fide', resumo: 'Este versículo é o心脏 da Reforma: o homem é justificado pela fé, sem as obras da lei. Abram creu e isso bastou.', citacao: '«A fé alone justifica — esta é a verdade que liberta a consciência.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Imputação', resumo: 'A justiça de Cristo é imputada ao crente pela fé. Não é justiça própria, mas justiça recebida por graça.', citacao: '«Deus imputa a justiça de Cristo ao que crê — como se nunca tivesse pecado.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Nova Perspectiva', visao: 'Aliança', resumo: 'A fé de Abram é confiança na fidelidade de Deus à Sua aliança. Justificação é declarations de que pertencemos ao povo da aliança.', citacao: '«A fé é confiança na fidelidade de Deus — não apenas aceite de doutrinas.»' },
    ],
  },
  {
    livro: 'gn', capitulo: 50, versiculo: 20,
    tema: 'Soberania de Deus sobre o mal',
    contexto: 'José revela a seus irmãos que o que eles quizeram para o mal, Deus o tornou em bem — uma das declarações mais poderosas sobre a soberania divina.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Providência', resumo: 'Deus permite o mal sem ser autor dele. Ele transforma as intenções más em Seus propósitos bondosos.', citacao: '«Deus permite o mal, mas dele tira um bem maior.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania total', resumo: 'Nada acontece fora do controle de Deus — nem a traição dos irmãos de José. A soberania de Deus governa até mesmo o pecado.', citacao: '«A soberania de Deus se estende até sobre o pecado dos homens.»' },
      { teologo: 'C.S. Lewis', periodo: '1898-1963', tradicao: 'Anglicana', visao: 'Livre-arbítrio', resumo: 'Deus permite o mal porque pode transformá-lo em bem maior. A história de José é o exemplo perfeito disso.', citacao: '『Deus permite o mal porque pode extrair dele um bem maior.』' },
    ],
  },
  {
    livro: 'ex', capitulo: 20, versiculo: 1,
    tema: 'Os Dez Mandamentos — Lei de Deus',
    contexto: 'Deus entrega os Dez Mandamentos no Monte Sinai, estabelecendo a base da moralidade e da aliança com Israel.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor', resumo: 'Os mandamentos se resumem em amar a Deus e ao próximo. O amor é a plenitude da lei.', citacao: '«Ama e faz o que quiseres — se amas, não farás nada que destrua o amor.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Lei e Evangelho', resumo: 'A lei revela o pecado e conduz ao evangelho. Os mandamentos mostram nossa incapacidade e apontam para Cristo.', citacao: '«A lei é o espelho que nos mostra nosso pecado — para nos conduzir a Cristo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Liame', resumo: 'A lei não é meio de salvação — é guia para a vida cristã. Ela mostra como viver para a glória de Deus.', citacao: '«A lei é o liame dos santos — não para salvá-los, mas para guiá-los.»' },
    ],
  },
  {
    livro: 'dt', capitulo: 6, versiculo: 4,
    tema: 'Shema — Ouve, Israel',
    contexto: 'A declaração central da fé judaica: "Ouve, Israel: o Senhor nosso Deus é o único Senhor". O fundamento do monoteísmo bíblico.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Unidade de Deus', resumo: 'Deus é uno — não há divisão na natureza divina. O Shema é a base de toda a teologia bíblica.', citacao: '«Deus é uno — e este é o primeiro e maior mandamento.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola Deus', resumo: 'O Shema é o fundamento de tudo: um Deus, um povo, uma fé. Fora disso, tudo é idolatria.', citacao: '«Ouve, Israel — este é o primeiro e mais importante mandamento.»' },
      { teologo: 'Rashi', periodo: '1040-1105', tradicao: 'Rabínica', visao: 'Judaísmo', resumo: 'O Shema é a profissão de fé diária do judeu. Cada palavra é carregada de significado: Deus é um, e Sua unidade é perfeita.', citacao: '«Ouve, Israel — este versículo é o resumo de toda a Torá.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 51, versiculo: 10,
    tema: 'Cria em mim um coração puro',
    contexto: 'O salmo de arrependimento de Davi após seu pecado com Bate-Seba — a mais profunda expressão de contrição do Antigo Testamento.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Arrependimento', resumo: 'O arrependimento verdadeiro começa no coração. Davi não pede apenas perdão — pede transformação interior.', citacao: '«Cria em mim um coração puro — porque eu não posso purificá-lo sozinho.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça renovadora', resumo: 'A pureza do coração é obra do Espírito Santo. O crente não se auto-purifica — pede a Deus que crie um coração novo.', citacao: '«Davi reconhece que a purificação vem de Deus — não do próprio esforço.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Devocional', resumo: 'Este salmo é o modelo de arrependimento para todos os tempos. A honestidade diante de Deus é o primeiro passo da restauração.', citacao: '«A confissão sincera é o início da restauração — Deus não rejeita um coração contrito.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 3, versiculo: 23,
    tema: 'Todos pecaram — Universalidade do pecado',
    contexto: 'Paulo estabelece que todos, sem exceção, pecaram e ficam aquém da glória de Deus — o diagnóstico universal da condição humana.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Pecado original', resumo: 'O pecado afeta a todos — não há exceção. Mesmo os mais religiosos pecam contra a glória de Deus.', citacao: '«Todos pecaram — não há um justo, nem um sequer.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Depravação total', resumo: 'O homem é incapaz de cumprir a lei de Deus por si mesmo. Todos estão sob a condenação — é preciso um Salvador.', citacao: '«O homem não é apenas pecador — é pecado em toda a sua existência.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Total depravity', resumo: 'O pecado corrompeu tudo — mente, vontade, emoções. Não há parte do ser humano que esteja intacta.', citacao: '«O pecado corrompeu tudo em nós — até mesmo as nossas melhores obras são manchadas.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 6, versiculo: 23,
    tema: 'Salário do pecado é a morte',
    contexto: 'Paulo contrasta o salário do pecado (morte) com o dom de Deus (vida eterna) — a mais clara declaração sobre condenação e salvação.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Morte espiritual', resumo: 'A morte aqui é espiritual — separação de Deus. O pecado paga seu salário: eterna separação do Criador.', citacao: '«O pecado paga seu salário — e o salário é a morte eterna.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Lei e graça', resumo: 'A lei mostra o salário do pecado, mas o evangelho mostra o dom gratuito de Deus. Morte vs. vida eterna.', citacao: '«O pecado paga a morte — mas Deus dá a vida eterna como dom.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Evangelho', resumo: 'Este versículo é o evangelho em miniatura: dois contrastes — morte vs. vida, salário vs. dom, pecado vs. Cristo.', citacao: '«A cruz é o lugar onde o salário do pecado foi pago pelo dom de Deus.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 10, versiculo: 9,
    tema: 'Confessar e crer — Salvação',
    contexto: 'Paulo explica que se confessarmos Jesus como Senhor e crermos que Deus o ressuscitou dos mortos, seremos salvos.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Fé confessada', resumo: 'A fé não é apenas intelectual — é confessada publicamente. Reconhecer Jesus como Senhor é submeter toda a vida a Ele.', citacao: '«Confessar com a boca é declarar publicamente o que a fé crê internamente.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola fide', resumo: 'A salvação vem pela fé na ressurreição de Cristo. Não há outra via — nem obras, nem méritos, nem religião.', citacao: '«A fé que crê na ressurreição é a fé que salva — nada mais, nada menos.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eficácia', resumo: 'A confissão e a fé são evidências da graça de Deus. Deus não apenas declara — Ele transforma.', citacao: '«A fé que salva é a fé que confessa — porque a graça transforma o coração.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 6, versiculo: 33,
    tema: 'Buscai primeiro o Reino de Deus',
    contexto: 'Jesus ensina sobre prioridades: buscar primeiro o Reino de Deus e Sua justiça, e todas as outras coisas serão acrescentadas.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor ordenado', resumo: 'O amor a Deus deve vir antes de tudo — quando amamos a Deus primeiro, tudo mais se ordena.', citacao: '«Busca primeiro a Deus — e tudo mais será ordenado pelo amor.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Deus sabe do que precisamos antes que peçamos. Quando priorizamos o Reino, Deus cuida do resto.', citacao: '«Deus não é devedor — quando buscamos o Reino, Ele supre todas as nossas necessidades.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Prático', resumo: 'A ansiedade vem de buscar primeiro as coisas terrenas. O Reino de Deus deve ser a prioridade absoluta.', citacao: '«O antídoto contra a ansiedade é buscar primeiro o Reino de Deus.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 3, versiculo: 3,
    tema: 'Nascido de novo',
    contexto: 'Jesus diz a Nicodemos que é preciso nascer de novo (de cima) para ver o Reino de Deus — o início do diálogo mais famoso sobre salvação.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Regeneração', resumo: 'Nascer de novo é obra do Espírito Santo — não é decisão humana. Deus regenera o coração para que possa crer.', citacao: '«Nascer de novo é receber uma nova natureza — obra exclusiva do Espírito.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Graça', resumo: 'Nicodemos pensava que a salvação vinha pelo conhecimento religioso. Jesus mostra que é preciso uma transformação divina.', citacao: '«O homem não pode se regenerar — é preciso nascer de novo pelo Espírito de Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eleição', resumo: 'Nascer de novo é um dom soberano de Deus. Ele escolhe quem regenera — não é mérito humano.', citacao: '«A regeneração é dom de Deus — Ele escolhe aquecer o coração que está morto.»' },
    ],
  },
  {
    livro: 'ef', capitulo: 2, versiculo: 8,
    tema: 'Salvos pela graça mediante a fé',
    contexto: 'Paulo resume toda a teologia da salvação: é dom de Deus, não de obras, para que ninguém se glorie.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Graça', resumo: 'A salvação é totalmente graça de Deus — desde a eleição até a glória final. Não há mérito humano.', citacao: '«A graça de Deus é suficiente — não precisamos de obras para ser salvos.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola gratia', resumo: 'A salvação é pela graça alone, mediante a fé alone, em Cristo alone. Nada de obras humanas.', citacao: '«Somos salvos pela graça de Deus — não pelas nossas obras ou méritos.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça irresistível', resumo: 'A graça de Deus é irresistível — Ele regenera e mantém os Seus. A fé é também dom de Deus.', citacao: '«A graça de Deus é irresistível — Ele nos atrai e nos sustenta.»' },
    ],
  },
  {
    livro: 'cl', capitulo: 1, versiculo: 15,
    tema: 'Cristo imagem de Deus invisível',
    contexto: 'Paulo declara que Cristo é a imagem visível do Deus invisível — a mais elevada declaração cristológica do Novo Testamento.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'União pessoal', resumo: 'Em Cristo habita toda a plenitude da divindade — Ele é Deus em carne humana.', citacao: '«Cristo é a imagem de Deus invisível — nele vemos o Pai.»' },
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Cristológico', resumo: 'Cristo é a imagem perfeita de Deus porque Ele é o Filho unigênito — não por participação, mas por natureza.', citacao: '«Cristo é imagem de Deus não por semelhança, mas por identidade de natureza.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação', resumo: 'Em Cristo, Deus se revela completamente — não há Deus além do que se mostra em Jesus.', citacao: '«Cristo é a revelação de Deus — não há Deus além dEle.»' },
    ],
  },
  {
    livro: 'hb', capitulo: 4, versiculo: 12,
    tema: 'A Palavra de Deus viva e eficaz',
    contexto: 'O autor de Hebreus descreve a Palavra de Deus como viva, eficaz, mais cortante que qualquer espada de dois gumes.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Poder da Palavra', resumo: 'A Palavra de Deus não é texto morto — é viva e age no coração do ouvinte.', citacao: '«A Palavra de Deus é viva — ela age onde é recebida com fé.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola Scriptura', resumo: 'A Escritura é a arma mais poderosa contra o pecado e o erro. Ela penetra onde nenhuma outra coisa chega.', citacao: '«A Palavra de Deus é a espada do Espírito — mais poderosa que qualquer exército.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Autoridade', resumo: 'A Escritura tem autoridade absoluta — ela julga, corrige e instrui com poder divino.', citacao: '«A Palavra de Deus é o julgador dos pensamentos e intenções do coração.»' },
    ],
  },
  {
    livro: '1jo', capitulo: 4, versiculo: 8,
    tema: 'Deus é amor',
    contexto: 'João declara que o amor é a essência da natureza de Deus — quem não ama não conhece a Deus.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor trinitário', resumo: 'O amor de Deus é eterno — existe entre o Pai, o Filho e o Espírito Santo. Criamos porque fomos amados.', citacao: '«Deus é amor — e quem não ama não conhece a Deus.»' },
      { teologo: 'C.S. Lewis', periodo: '1898-1963', tradicao: 'Anglicana', visao: 'Amor', resumo: 'O amor de Deus não é um sentimento — é uma ação. Deus nos amou primeiro, e nós respondemos ao Seu amor.', citacao: '«Deus nos ama — não porque somos amáveis, mas porque Ele é amor.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 21, versiculo: 4,
    tema: 'Novos céus e nova terra',
    contexto: 'A promessa final da Bíblia: Deus enxugará toda lágrima, e não haverá mais morte, nem pranto, nem dor.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Escatologia', resumo: 'A nova criação é a restauração perfeita — Deus fará todas as coisas novas. A esperança cristã é corporal e eterna.', citacao: '«Deus enxugará toda lágrima — esta é a promessa final da Escritura.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Nova criação', resumo: 'A esperança cristã não é apenas espiritual — é a restauração de toda a criação. O sofrimento terá fim.', citacao: '«Deus promete uma nova criação — não apenas um novo céu, mas uma nova terra.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // DANIEL — Profecias e Apocalipse
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'dn', capitulo: 2, versiculo: 44,
    tema: 'Reino de Deus eterno',
    contexto: 'Daniel interpreta o sonho de Nabucodonosor: uma pedra destrói todas os impérios mundanos e se torna um grande monte.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Teologia da história', resumo: 'Os quatro impérios representam as eras da história humana. O reino de Deus substitui todos os impérios terrenos. A Igreja é esse reino invisível que cresce até o juízo final.', citacao: '«O reino de Deus começou com a humildade e crescerá até dominar todo o mundo.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Reino espiritual', resumo: 'A pedra cortada sem mãos é Cristo, que destrói todos os reinos mundanos pela Sua palavra. O reino de Deus não é político mas espiritual.', citacao: '«Cristo é a pedra que esmagará todos os reinos da terra.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania divina', resumo: 'Deus controla a história dos impérios. Nenhum poder humano pode resistir ao Seu decreto. A pedra é o reino eterno que Deus estabelecerá.', citacao: '«Deus humilha os orgulhosos e exalta os humildes através da história.»' },
    ],
  },
  {
    livro: 'dn', capitulo: 7, versiculo: 13,
    tema: 'Filho do Homem',
    contexto: 'Daniel vê em visão o Filho do Homem vindo com as nuvens do céu para receber domínio eterno.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cristologia', resumo: 'O Filho do Homem é Cristo que recebe o reino eterno dos santos do Altíssimo. A visão prefigura a Segunda Vinda e o juízo final.', citacao: '«A Cristo foram dados domínio, honra e reino — e todos O servirão.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação', resumo: 'O Filho do Homem é o Homem para os outros — Deus que se revela em Jesus Cristo. A visão é apocalíptica e escatológica.', citacao: '«Jesus Cristo é o homem que Deus é e o Deus que o homem é.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Nova Perspectiva', visao: 'Escatologia inaugurada', resumo: 'Daniel 7 é a chave para entender o auto-título de Jesus como Filho do Homem. O reino de Deus é inaugurado em Jesus mas consumado na Parousia.', citacao: '«O Filho do Homem de Daniel é o rei messiânico que receberá o reino de Deus.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // EZEQUIEL — Visões e Profecias
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'ez', capitulo: 37, versiculo: 5,
    tema: 'Vale de ossos secos — Ressurreição',
    contexto: 'Deus mostra a Ezequiel um vale cheio de ossos secos e ordena que profetize para que revivam.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Tipologia da ressurreição', resumo: 'Os ossos secos representam Israel no exílio, mas também a humanidade morta em pecado. A profecia mostra que Deus pode dar vida onde há morte.', citacao: '«Deus abre os túmulos — Ele pode ressuscitar o que está morto.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Restauração de Israel', resumo: 'A visão mostra a restauração literal de Israel do exílio babilônico. Deus cumprirá Suas promessas apesar da aparente impossibilidade.', citacao: '«Deus pode fazer reviver o que os homens consideram perdido para sempre.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Ressurreição', resumo: 'A visão prefigura a ressurreição dos mortos em Cristo. O Espírito Santo é a fonte da vida — onde Ele está, há vida.', citacao: '«O mesmo Espírito que ressuscitou a Jesus ressuscitará os que creem Nele.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // JEREMIAS — Profecias e Lamentos
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'jr', capitulo: 29, versiculo: 11,
    tema: 'Planos de paz e esperança',
    contexto: 'Deus fala ao povo exilado na Babilônia: os Seus planos não são de mal, mas de paz e futuro esperançoso.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Providência divina', resumo: 'Deus governa a história com sabedoria e amor. Mesmo no sofrimento, Ele está trabalhando para o bem do Seu povo.', citacao: '«Deus não abandona os que Ele escolheu — Ele os guia até o fim.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania e aliança', resumo: 'O versículo é uma promessa de aliança: Deus tem planos específicos para Seu povo. A esperança não é na situação atual mas no propósito eterno de Deus.', citacao: '«Deus não promete ausência de sofrimento, mas propósito no sofrimento.»' },
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Confessante', visao: 'Custo da discipleship', resumo: 'A esperança em Deus não é otimismo vago — é confiança concreta no Deus que cumpre Suas promessas, mesmo quando tudo parece perdido.', citacao: '«Deus não nos dá os nossos sonhos, mas os Seus.»' },
    ],
  },
  {
    livro: 'jr', capitulo: 31, versiculo: 33,
    tema: 'Nova aliança',
    contexto: 'Deus promete uma nova aliança diferente daquela feita no Sinai — Sua lei será escrita no coração do povo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Graça interior', resumo: 'A nova aliança é a transformação interior pelo Espírito Santo. Deus não apenas ordena — Ele capacita a obediência.', citacao: '«Deus não apenas dá a lei — Ele dá o desejo de cumpri-la.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Nova aliança em Cristo', resumo: 'Esta profecia se cumpre em Cristo. A lei de Deus é gravada no coração dos crentes pelo Espírito Santo. A salvação é pela graça, não pela letra da lei.', citacao: '«A nova aliança é a graça que transforma o coração, não apenas o comportamento.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Relacional', resumo: 'A nova aliança é personal — «eu serei o Deus deles, e eles serão o meu povo». A relação com Deus é íntima e direta.', citacao: '«O grande dom da nova aliança é a presença de Deus connosco.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // 1 SAMUEL — Reis e Profetas
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: '1sm', capitulo: 16, versiculo: 7,
    tema: 'Deus olha para o coração',
    contexto: 'Samuel unje David como rei. Deus rejeita a aparência externa e escolhe o menor dos filhos de Jessé.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Interioridade', resumo: 'Deus vê além da aparência — Ele examina o coração. A verdadeira grandeza não está no exterior mas na disposição interior para Deus.', citacao: '«Deus não se impressiona com aparências — Ele vê a verdade do coração.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eleição soberana', resumo: 'Deus escolhe pelo Seu próprio critério, não pelos padrões humanos. A eleição é pela graça, não pelo mérito ou aparência.', citacao: '«Deus escolhe o que o mundo despreza — assim é o reino de Deus.»' },
      { teologo: 'C.S. Lewis', periodo: '1898-1963', tradicao: 'Anglicana', visao: 'Moralidade', resumo: 'A moralidade de Deus é mais profunda que a nossa — Ele valoriza a humildade, a obediência e o caráter, não a força ou beleza.', citacao: '«Deus olha para onde nós não olhamos — para a coragem escondida, o amor silencioso, a fé constante.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // JOSUÉ — Conquista e Obediência
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'js', capitulo: 1, versiculo: 9,
    tema: 'Coragem e presença de Deus',
    contexto: 'Deus encoraja Josué antes da conquista da Terra Prometida: não temas, porque eu sou contigo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Coragem divina', resumo: 'A coragem não vem de nós mesmos — vem da promessa de que Deus está conosco. A obediência gera confiança.', citacao: '«Deus não promete ausência de batalhas, mas presença nas batalhas.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Confiança na promessa', resumo: 'Deus comanda coragem porque Ele mesmo está presente. A fé não é sentimento mas confiança na Palavra de Deus.', citacao: '«Deus não está longe — Ele está presente, e isso basta para a coragem.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Missões', resumo: 'O mandamento de coragem é para a missão — Deus envia e Deus acompanha. Não há chamado sem presença divina.', citacao: '«Não temas — é o mandamento mais repetido da Bíblia. Deus sabe que tememos.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // RUTE — Fidelidade e Redenção
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'rt', capitulo: 1, versiculo: 16,
    tema: 'Fidelidade e aliança',
    contexto: 'Rute se recusa a deixar sua sogra Noemi e professa lealdade: onde fores, eu irei.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Tipologia cristã', resumo: 'A fidelidade de Rute prefigura a fidelidade de Deus ao Seu povo. Rute, gentia, entra na linha de Cristo — as nações são incluídas na aliança.', citacao: '«Rute gentia se torna ancestral do Messias — a graça de Deus ultrapassa fronteiras.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Providência', resumo: 'Deus usa as decisões fiéis dos indivíduos para cumprir Seus propósitos eternos. Rute não sabia que seria ancestral do Messias.', citacao: '«Deus dirige os passos dos humildes para cumprir Seus eternos desígnios.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Nova Perspectiva', visao: 'Missão de Israel', resumo: 'Rute é moabita — a outsiders é incluída no povo de Deus. A história bíblica é de inclusão, não de exclusão.', citacao: '«Deus sempre quis que as nações viessem à luz — Rute é prova disso.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // JUÍZES — Ciclo de Pecado e Graça
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'jz', capitulo: 21, versiculo: 25,
    tema: 'Anarquia espiritual',
    contexto: 'O livro de Juízes termina com uma frase sombria: cada um fazia o que parecia certo aos seus olhos.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Consequências do pecado', resumo: 'Sem a lei de Deus, o homem cai em anarquia moral. Juízes mostra o ciclo: pecado, opressão, clamor, libertação, repetição.', citacao: '«Quando cada um faz o que quer, ninguém faz o que é bom.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Necessidade da lei', resumo: 'O livro inteiro é uma demonstração de que Israel precisava de um rei — e aponta para Cristo, o Rei perfeito.', citacao: '«Juízes mostra que sem governo divino, a humanidade se autodestrói.»' },
      { teologo: 'G.K. Chesterton', periodo: '1874-1936', tradicao: 'Anglicana', visao: 'Originalidade do pecado', resumo: '«Cada um fazia o que era certo aos seus olhos» — o pecado original é a recusa de submeter o julgamento pessoal a um padrão objetivo.', citacao: '«O homem moderno não é rebelde — é o próprio juiz da sua própria causa.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // ROMANOS 5-8 — DOUTRINA CENTRAL DA SALVAÇÃO
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'rm', capitulo: 5, versiculo: 1,
    tema: 'Justificados pela fé — Paz com Deus',
    contexto: 'Paulo declara que a justificação pela fé traz paz com Deus e acesso à graça.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Paz interior', resumo: 'A justificação não é apenas um decreto legal — é uma realidade transformadora que traz paz profunda entre Deus e o crente.', citacao: '«A paz com Deus não é ausência de conflito, mas reconciliação plena.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola fide', resumo: 'A justificação é pela fé somente — não há obras que possam acrescentar ao que Cristo já fez. A paz é resultado direto da fé.', citacao: '«A fé justificante nos traz paz — não porque somos perfeitos, mas porque Cristo é suficiente.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Posição', resumo: 'A justificação é uma declaração judicial de que o crente é considerado justo diante de Deus. A paz é consequência desta posição.', citacao: '«Deus nos declara justos — e esta declaração é a base da nossa paz eterna.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 5, versiculo: 3,
    tema: 'Sofrimento produz perseverança',
    contexto: 'Paulo ensina que o sofrimento gera perseverança, que produz caráter, que gera esperança.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Provação', resumo: 'O sofrimento não é acidente — Deus o usa para amadurecer a fé. Cada trial é uma oportunidade de crescimento espiritual.', citacao: '«O sofrimento é a forja onde Deus forma o caráter do crente.»' },
      { teologo: 'Bonhoeffer', periodo: '1906-1945', tradicao: 'Luterana', visao: 'Custo da graça', resumo: 'A graça de Deus não elimina o sofrimento — ela o transforma em ferramenta de santificação. O discípulo sofre porque Cristo sofreu.', citacao: '«O sofrimento cristão não é inútil — é o caminho da maturidade espiritual.»' },
      { teologo: 'N.T. Wright', periodo: 'Contemporâneo', tradicao: 'Anglicana', visao: 'Renovação', resumo: 'O sofrimento atual é temporário e comparativo — a glória futura supera qualquer dor presente. A perseverança produz esperança viva.', citacao: '«O sofrimento é passageiro; a esperança que dele nasce é eterna.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 5, versiculo: 10,
    tema: 'Reconciliados pela morte do Filho',
    contexto: 'Paulo argumenta que, sendo inimigos, fomos reconciliados pela morte de Cristo, quanto mais seremos salvos por Sua vida.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Reconciliação', resumo: 'A reconciliação é obra unilateral de Deus — nós éramos inimigos, mas Ele agiu primeiro pela cruz.', citacao: '«Deus nos reconciliou quando éramos inimigos — quanto mais agora que somos amigos.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Expiação', resumo: 'A morte de Cristo remove a raiva divina contra o pecado. A vida de Cristo intercede por nós — dupla garantia de salvação.', citacao: '«A cruz é a base da reconciliação; a ressurreição é a garantia da salvação.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 6, versiculo: 4,
    tema: 'Batismo na morte e ressurreição de Cristo',
    contexto: 'Paulo ensina que o batismo simboliza a morte do homem velho e o início de uma nova vida em Cristo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Morte e ressurreição', resumo: 'O batismo é sepultura do homem velho. Assim como Cristo morreu e ressuscitou, o crente participa desta realidade.', citacao: '«O batismo é morte e vida — morremos para o pecado e ressuscitamos para Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Sinal da aliança', resumo: 'O batismo é sinal visível da graça invisível. Não é merely simbólico — é participação na morte e ressurreição de Cristo.', citacao: '«O batismo nos assegura que fomos sepultados com Cristo para vivermos uma nova vida.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 6, versiculo: 14,
    tema: 'Não sob a Lei, sob a graça',
    contexto: 'Paulo declara que os crentes não estão mais sob a condenação da Lei, mas sob a graça libertadora.',
    interpretacoes: [
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Lei e graça', resumo: 'A Lei condena, mas a graça liberta. O crente não vive por mérito, mas pela graça que transforma.', citacao: '«A Lei mostra o que Deus exige; a graça dá o que Deus promete.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Terceiro uso da lei', resumo: 'A graça não anula a Lei — ela a cumpre em nós. O crente obedece não para ser salvo, mas porque já é salvo.', citacao: '«A graça não é licença para pecar — é poder para viver em santidade.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 7, versiculo: 15,
    tema: 'O conflito entre a carne e o espírito',
    contexto: 'Paulo descreve a luta interna entre o desejo de fazer o bem e a tendência para o pecado.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Pecado original', resumo: 'Mesmo regenerado, o crente ainda luta contra a carne. A graça não elimina a inclinação para o pecado — ela o controla.', citacao: '«Não faço o que quero, mas o que odeio — esta é a condição do regenerado.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Simul iustus et peccator', resumo: 'O crente é ao mesmo tempo justo e pecador. A justificação é completa, mas a santificação é progressiva.', citacao: '«Somos justos e pecadores ao mesmo tempo — a justiça vem de Cristo, o pecado de nós.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Guerra espiritual', resumo: 'A guerra entre carne e espírito é real e contínua. A vitória não é perfeição, mas perseverança na fé.', citacao: '«O crente nunca para de lutar — mas a vitória pertence a Cristo.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 7, versiculo: 25,
    tema: 'Gratidão pela libertação em Cristo',
    contexto: 'Paulo conclui sua reflexão declarando gratidão por Jesus Cristo, nosso Senhor, que nos livra do corpo da morte.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Libertação', resumo: 'A libertação do pecado é obra completa de Cristo. Não é esforço humano — é graça divina que nos livra.', citacao: '«Deus me livra do corpo desta morte — graças a Jesus Cristo nosso Senhor.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Agradecimento', resumo: 'A gratidão é a resposta natural à graça. Reconhecemos que Cristo é a única fonte de libertação.', citacao: '«Toda a glória é de Cristo — Ele nos livra onde não podemos nos livrar.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 8, versiculo: 1,
    tema: 'Nenhuma condenação em Cristo Jesus',
    contexto: 'Paulo declara que para os que estão em Cristo Jesus não há condenação — a mais completa declaração de segurança eterna.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Segurança', resumo: 'A condenação foi absorvida por Cristo na cruz. Para os que creem, não há mais veredicto de culpa.', citacao: '«Nenhuma condenação — porque Cristo pagou o preço completo.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Justificação', resumo: 'A justificação é completa e irrevogável. O diabo pode acusar, mas Deus já declarou justos os que creem.', citacao: '«O veredicto de Deus é final: não há condenação para quem está em Cristo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'União com Cristo', resumo: 'A união com Cristo é a base da segurança. Quem está nEle partilha Sua justiça e Sua vitória sobre o pecado.', citacao: '«Em Cristo somos justos — não por obras, mas por união com Ele.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 8, versiculo: 18,
    tema: 'As sofrimentos presentes não se comparam à glória futura',
    contexto: 'Paulo compara as aflições presentes com a glória que será revelada — uma perspectiva escatológica do sofrimento.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Esperança', resumo: 'O sofrimento atual é temporário e insignificante comparado à glória eterna. A perspectiva muda tudo.', citacao: '«Os sofrimentos deste tempo não são dignos de serem comparados com a glória vindoura.»' },
      { teologo: 'C.S. Lewis', periodo: '1898-1963', tradicao: 'Anglicana', visao: 'Esperança', resumo: 'Se as coisas piores que nos acontecessem fossem as piores possíveis, não teríamos motivo de esperança. Mas há glória à frente.', citacao: '«Se o universo não tem esperança, é porque nós é que não a vimos ainda.»' },
      { teologo: 'Jürgen Moltmann', periodo: '1926-2024', tradicao: 'Teologia da Esperança', visao: 'Escatologia', resumo: 'A esperança cristã é certeza do que virá. A glória futura transforma o significado do sofrimento presente.', citacao: '«A esperança não é otimismo — é certeza de que Deus restaurará todas as coisas.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 8, versiculo: 26,
    tema: 'O Espírito Santo intercede em nossas fraquezas',
    contexto: 'Paulo ensina que o Espírito Santo auxilia nossa oração quando não sabemos como orar.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Intercessão', resumo: 'O Espírito traduz nossas suspiros em oração aceitável a Deus. Mesmo em silêncio, Ele intercede.', citacao: '«O Espírito ora por nós com suspiros inexprimíveis — Deus entende o que não podemos dizer.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Auxílio divino', resumo: 'A oração não depende de nossas capacidades — o Espírito capacita e guia nossa comunhão com Deus.', citacao: '«Deus não nos abandona na oração — Ele mesmo nos ensina a orar pelo Seu Espírito.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 8, versiculo: 29,
    tema: 'Predestinados para sermos conformados à imagem de Cristo',
    contexto: 'Paulo revela que Deus nos predestinou para sermos conformados à imagem de Seu Filho.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Predestinação', resumo: 'Deus nos escolheu antes da fundação do mundo para sermos como Cristo. A predestinação tem um propósito: conformidade com Cristo.', citacao: '«Deus nos predestinou para sermos o espelho da imagem de Seu Filho.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'A predestinação é ato soberano de Deus — Ele escolhe, chama, justifica e glorifica. Todo o processo é Sua obra.', citacao: '«Deus faz todas as coisas segundo o Seu eterno decreto — sem erro, sem fracasso.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 8, versiculo: 31,
    tema: 'Deus por nós — Ninguém contra nós',
    contexto: 'Paulo declara que se Deus é por nós, quem será contra nós? A mais forte declaração de segurança.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Soberania', resumo: 'Deus é mais poderoso que qualquer inimigo. Se Ele está do nosso lado, nenhum adversário pode nos vencer.', citacao: '«Se Deus é por nós, quem será contra nós? Ninguém pode nos separar do Seu amor.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Coragem', resumo: 'Esta é a base da coragem cristã — não confiamos em nossas forças, mas no Deus que é por nós.', citacao: '«Deus é por nós — esta é a mais grande e confortadora declaração de toda a Bíblia.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 8, versiculo: 37,
    tema: 'Mais que vencedores em Cristo',
    contexto: 'Paulo declara que somos mais do que vencedores por meio dAquele que nos amou.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Vitória', resumo: 'Não apenas sobrevivemos ao sofrimento — vencemos nele. A vitória não é nossa, mas de Cristo em nós.', citacao: '«Nossa vitória não vem de nós mesmos — vem dAquele que nos amou.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Perseverança', resumo: 'A vitória é certa porque Deus é fiel. Nada pode nos separar do amor de Cristo — nem sofrimento, nem morte.', citacao: '«Somos mais do que vencedores — porque Cristo já venceu por nós.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 8, versiculo: 38,
    tema: 'Nada pode nos separar do amor de Deus',
    contexto: 'Paulo lista tudo que poderia nos separar do amor de Cristo — nada consegue. A culminação da segurança eterna.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor incondicional', resumo: 'Nem morte, nem vida, nem anjos, nem potestades podem nos separar do amor de Deus em Cristo Jesus.', citacao: '«Nada, absolutamente nada, pode nos separar do amor de Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Segurança eterna', resumo: 'A segurança do crente não depende de sua fidelidade, mas da fidelidade de Deus. O amor divino é inquebrantável.', citacao: '«A segurança eterna é garantida pelo amor de Deus — não pela nossa capacidade.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Consolo', resumo: 'Nem a nossa fraqueza, nem os nossos inimigos, nem as forças cósmicas podem nos arrancar das mãos de Deus.', citacao: '«A mão que nos segura é mais forte do que todas as forças que tentam nos arrancar.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // EFÉSIOS 6 — ARMADURA ESPIRITUAL
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'ef', capitulo: 6, versiculo: 10,
    tema: 'Fortalecer-se no Senhor',
    contexto: 'Paulo exorta os crentes a se fortalecerem no Senhor e na força do Seu poder para a batalha espiritual.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Dependência', resumo: 'A força vem do Senhor — não de nós mesmos. O crente não luta com armas humanas, mas com o poder divino.', citacao: '«A fortaleza do crente não está em si mesmo — está no Senhor.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Batalha espiritual', resumo: 'A vida cristã é guerra espiritual. A vitória não vem de esforço próprio, mas de dependência do poder de Deus.', citacao: '«Não lutamos pela vitória — lutamos a partir da vitória que Cristo já obteve.»' },
    ],
  },
  {
    livro: 'ef', capitulo: 6, versiculo: 11,
    tema: 'Revestir-se de toda a armadura de Deus',
    contexto: 'Paulo instrui os crentes a usarem toda a armadura divina para resistir às ciladas do diabo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Proteção espiritual', resumo: 'A armadura é de Deus — não é construída pelo homem. Cada peça representa uma verdade espiritual que nos protege.', citacao: '«A armadura é divina — não a fabricamos, mas a recebemos de Deus.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Guerra espiritual', resumo: 'O diabo é real e astuto. A armadura de Deus é a única defesa eficaz contra seus ataques.', citacao: '«O diabo não dorme — mas a armadura de Deus é mais forte que qualquer ataque.»' },
    ],
  },
  {
    livro: 'ef', capitulo: 6, versiculo: 12,
    tema: 'Nossa luta não é contra carne e sangue',
    contexto: 'Paulo revela que a verdadeira batalha é contra principados e potestades espirituais, não contra pessoas.',
    interpretacoes: [
      { teologo: 'Epheso (trad.)', periodo: 'Séc. I d.C.', tradicao: 'Bíblica', visao: 'Guerra cósmica', resumo: 'O crente enfrenta forças espirituais que operam nos bastidores da história. A batalha é real, mas a vitória já foi conquistada.', citacao: '«Não lutamos contra homens — lutamos contra forças espirituais da maldade.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Discernimento', resumo: 'Devemos discernir entre o inimigo real (Satanás) e as pessoas que são instrumentos seus. Odiar pessoas é lutar no campo errado.', citacao: '«Nossa luta não é contra os homens — é contra as forças espirituais que os manipulam.»' },
    ],
  },
  {
    livro: 'ef', capitulo: 6, versiculo: 14,
    tema: 'Cingir os lombos com a verdade e a couraça da justiça',
    contexto: 'Paulo descreve as primeiras peças da armadura: a verdade que cinge e a justiça que protege o coração.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Verdade e justiça', resumo: 'A verdade de Deus é o cinto que nos mantém firmes. A justiça de Cristo é a couraça que protege nosso coração.', citacao: '«A verdade nos cinge — a justiça nos protege. Sem elas, estamos vulneráveis.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Integridade', resumo: 'A verdade não é apenas doutrina — é vida íntegra. A justiça não é auto-atribuída — é recebida de Cristo.', citacao: '«A verdade é integridade de vida; a justiça é dom de Deus pela fé.»' },
    ],
  },
  {
    livro: 'ef', capitulo: 6, versiculo: 17,
    tema: 'O capacete da salvação e a espada do Espírito',
    contexto: 'Paulo completa a armadura com o capacete da salvação e a espada do Espírito, que é a Palavra de Deus.',
    interpretacoes: [
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Palavra de Deus', resumo: 'A Palavra de Deus é a arma mais poderosa contra Satanás. É a única ofensiva na armadura — ataca as mentiras do inimigo.', citacao: '«A Palavra de Deus é a espada do Espírito — contra ela, nenhuma mentira prospera.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Sola Scriptura', resumo: 'O capacete protege a mente — a salvação garante nossa identidade em Cristo. A espada é a Bíblia, nossa arma ofensiva.', citacao: '«A salvação é o capacete que protege nossa mente; a Palavra é a espada que vence o inimigo.»' },
    ],
  },
  {
    livro: 'ef', capitulo: 6, versiculo: 18,
    tema: 'Orar em todo tempo no Espírito',
    contexto: 'Paulo conclui a passagem sobre a armadura com a exortação à oração contínua em todo o tempo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Oração contínua', resumo: 'A oração é a atmosfera da guerra espiritual. Sem ela, a armadura é inútil — a comunhão com Deus é essencial.', citacao: '«Orem sempre — a oração mantém a alma em comunhão com Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Dependência', resumo: 'A oração não é uma das peças — é o elemento que mantém todas as outras. Sem oração, a armadura cai.', citacao: '«A oração é o fio que conecta o crente ao poder de Deus.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // APOCALIPSE — TEMAS ESCATOLÓGICOS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'ap', capitulo: 1, versiculo: 8,
    tema: 'Eu sou o Alfa e o Ômega — Soberania de Cristo',
    contexto: 'Cristo declara ser o Alfa e o Ômega, o Primeiro e o Derradeiro — início e fim de toda a história.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Eternidade', resumo: 'Cristo é o início e o fim de tudo. Sua soberania se estende sobre toda a criação e toda a história.', citacao: '«Cristo é o Alfa e o Ômega — tudo começa e termina nEle.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação', resumo: 'Cristo é a Palavra de Deus que sustenta toda a realidade. Ele é o centro da história e da criação.', citacao: '«Deus falou — e esta Palavra é Cristo, o Alfa e o Ômega.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 3, versiculo: 20,
    tema: 'Eis que estou à porta e chamo',
    contexto: 'Cristo se apresenta como um visitante que bate à porta do coração, convidando à comunhão íntima.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Convite', resumo: 'Cristo não força entrada — Ele convida. A porta é o coração humano, e Ele respeita a liberdade.', citacao: '«Cristo bate à porta — mas só entra se abrirmos.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Relacionamento', resumo: 'O convite é para comunhão íntima — Cristo quer jantar conosco, não apenas batizar. É chamado ao relacionamento pessoal.', citacao: '«Cristo não quer estar do lado de fora — Ele quer habitar em nós.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 12, versiculo: 11,
    tema: 'Venceram pelo sangue do Cordeiro e pela palavra do testemunho',
    contexto: 'A vitória da igreja sobre Satanás se dá pelo sacrifício de Cristo e pela fidelidade até a morte.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Vitória', resumo: 'A vitória não é militar mas espiritual. O sangue do Cordeiro é a base, e o testemunho fiel é a evidência.', citacao: '«Venceram pelo sangue do Cordeiro — a cruz é a arma suprema contra o mal.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Martírio', resumo: 'O testemunho fiel até a morte é a forma suprema de vitória. A Igreja vence não pela força, mas pela fidelidade.', citacao: '«O martírio é a vitória suprema — morrer por Cristo é vencer o mundo.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 19, versiculo: 11,
    tema: 'O cavalo branco — Segunda Vinda de Cristo',
    contexto: 'Cristo retorna como juiz e rei, montado em cavalo branco, vitorioso em justiça.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Juízo', resumo: 'A segunda vinda de Cristo será visível e gloriosa. Ele virá como juiz justo para recompensar os fiéis e punir os ímpios.', citacao: '«O cavalo branco é o símbolo da vitória — Cristo virá como Rei vitorioso.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Escatologia', resumo: 'A volta de Cristo consumará todas as promessas. A vitória final é certa — o mal será derrotado para sempre.', citacao: '«Cristo virá como juiz — e Sua justiça será perfeita.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 21, versiculo: 3,
    tema: 'Eis o tabernáculo de Deus com os homens',
    contexto: 'A visão final: Deus habitará face a face com os homens, sem mais templo intermediário.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Comunhão eterna', resumo: 'O sonho mais antigo de Deus se cumpre: habitar com Seu povo face a face, sem mediação de templo.', citacao: '«Deus habitará com os homens — esta é a consumação de toda a história.»' },
      { teologo: 'N.T. Wright', periodo: 'Contemporâneo', tradicao: 'Anglicana', visao: 'Nova criação', resumo: 'O céu e a terra se encontram — Deus não nos leva para o céu, mas traz o céu para a terra.', citacao: '«O destino final não é ir ao céu — é o céu vir à terra.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 22, versiculo: 20,
    tema: 'Amém; vem, Senhor Jesus',
    contexto: 'A oração mais breve e mais escatológica da igreja — anseio pela volta de Cristo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Esperança', resumo: 'A oração da Igreja é simples: vem, Senhor Jesus. É o anseio mais profundo da alma crente.', citacao: '«Vem, Senhor Jesus — esta é a oração final da Escritura e da Igreja.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Escatologia', resumo: 'A volta de Cristo é certa — Ele mesmo disse: Sim, venho em breve. A Igreja anseia pela consumação.', citacao: '«A oração da Igreja é: vem, Senhor Jesus — e Ele responde: venho em breve.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // SALMOS — LOUVOR, ADORAÇÃO E CONFIANÇA
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'sl', capitulo: 1, versiculo: 1,
    tema: 'Bem-aventurança do justo',
    contexto: 'O Salmo 1 abre o hinário com a declaração de bem-aventurança para quem não anda nos conselhos dos ímpios.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Caminhos', resumo: 'Há dois caminhos: o do justo que medita na Palavra, e o do ímpio que perece. A bem-aventurança vem da separação do mal.', citacao: '«Bem-aventurado o homem que não anda no conselho dos ímpios — ele é como árvore plantada.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Meditação', resumo: 'A meditação na Palavra de Deus é o caminho para a felicidade. O justo é aquele que pondera a Escritura dia e noite.', citacao: '«A Palavra de Deus é a fonte de toda bem-aventurança — medite nela continuamente.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 22, versiculo: 1,
    tema: 'Deus meu, por que me desamparaste?',
    contexto: 'O salmo messiânico mais citado por Jesus na cruz — a queixa do justo abandonado.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Profecia', resumo: 'Davi profetiza a Paixão de Cristo. As palavras de abandono são as mesmas que Jesus pronunciou na cruz.', citacao: '«Deus meu, por que me desamparaste? — o grito de Cristo na cruz é o grito de todo justo que sofre.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Teologia da cruz', resumo: 'Deus se esconde na cruz — é o paradoxo da fé. O abandono aparente é na verdade a forma mais profunda de presença.', citacao: '«Deus está mais presente onde parece estar mais ausente — na cruz.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 46, versiculo: 10,
    tema: 'Aquietai-vos e sabei que eu sou Deus',
    contexto: 'O salmo convida ao silêncio reverente diante da soberania de Deus em meio ao caos.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Quietude', resumo: 'O silêncio é a linguagem de Deus. A quietação não é passividade — é reconhecimento da soberania divina.', citacao: '«Aquietai-vos — parem de lutar e reconheçam que Deus é Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'A quietação é cessar de tentar controlar as circunstâncias e reconhecer que Deus governa tudo.', citacao: '«Parem — e saibam que eu sou Deus. A soberania de Deus é nossa paz.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 51, versiculo: 1,
    tema: 'Misericórdia de Deus — Arrependimento de Davi',
    contexto: 'O salmo de arrependimento de Davi após seu pecado com Bate-Seba — o mais profundo pedido de perdão.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Arrependimento', resumo: 'Davi reconhece que o pecado é contra Deus antes de ser contra os homens. O arrependimento começa na presença divina.', citacao: '«Contra ti somente pequei — o pecado é sempre uma ofensa a Deus.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Perdão', resumo: 'A misericórdia de Deus é maior que qualquer pecado. Davi encontrou perdão — e todo pecador arrependido também encontrará.', citacao: '«Lava-me彻底mente da minha iniquidade — o perdão de Deus é completo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Novo coração', resumo: 'Cria em mim um coração puro — o pedido é por regeneração. Deus não apenas perdoa — Ele transforma.', citacao: '«O verdadeiro arrependimento pede não apenas perdão, mas um novo coração.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 103, versiculo: 8,
    tema: 'O Senhor é misericordioso e compassivo',
    contexto: 'Davi louva o caráter de Deus: misericordioso, paciente, abundante em bondade.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Caráter divino', resumo: 'A misericórdia é o atributo mais glorioso de Deus. Ele não nos trata como pecados merecemos, mas com bondade infinita.', citacao: '«O Senhor é misericordioso — não nos trata conforme merecemos.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'A misericórdia de Deus não tem limites. Ele perdoa todas as nossas transgressões e cura todas as nossas enfermidades.', citacao: '«Deus remove os nossos pecados como o oriente remove as nuvens — completamente.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 119, versiculo: 9,
    tema: 'Como se purificará o jovem?',
    contexto: 'O salmista pergunta como um jovem manterá puro o caminho, e responde: guardando a Palavra de Deus.',
    interpretacoes: [
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola Scriptura', resumo: 'A Palavra de Deus é o purificador da vida. A santidade vem pela meditação e obediência à Escritura.', citacao: '«A Palavra de Deus purifica a vida — é o meio da santificação.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Guarda da Palavra', resumo: 'O jovem é purificado pela obediência à Palavra. A Escritura é guia e protetor do coração.', citacao: '«Guardei a tua Palavra — a obediência à Escritura é o caminho da pureza.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // PROVÉRBIOS — SABEDORIA PRÁTICA
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'pv', capitulo: 1, versiculo: 7,
    tema: 'O temor do SENHOR é o princípio do conhecimento',
    contexto: 'O versículo temático de Provérbios: a reverência a Deus é o início de toda sabedoria.',
    interpretacoes: [
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Sapiencial', resumo: 'O temor de Deus é a virtude que ordena todas as outras. Sem reverência divina, todo conhecimento é vaidade.', citacao: '«O temor do Senhor é o princípio — sem ele, tudo o mais é loucura.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Temor filial', resumo: 'O temor não é escravidão mas reverência. O sabedoria começa quando reconhecemos nossa dependência de Deus.', citacao: '«O temor do Senhor é o começo — quem começa aqui, vai longe.»' },
    ],
  },
  {
    livro: 'pv', capitulo: 3, versiculo: 5,
    tema: 'Confia no SENHOR de todo o teu coração',
    contexto: 'O provérbio mais conhecido: confiança absoluta em Deus, sem confiar no próprio entendimento.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Confiança', resumo: 'A confiança em Deus é total — não parcial. Não confiar no próprio entendimento é reconhecer a limitação humana.', citacao: '«Confia no Senhor com todo o teu coração — não dividas tua confiança.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'A sabedoria não vem da razão humana, mas da submissão ao Senhor. Deus guia os que confiam nEle.', citacao: '«Não confie em sua própria compreensão — confie em Deus, e Ele endireitará seus passos.»' },
    ],
  },
  {
    livro: 'pv', capitulo: 4, versiculo: 23,
    tema: 'Guarda o teu coração',
    contexto: 'O provérbio mais importante sobre a vida interior: o coração é a fonte de tudo o que somos.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Interioridade', resumo: 'O coração é o centro de onde procedem todos os pensamentos e ações. Guardá-lo é guardar toda a vida.', citacao: '«Guarda o teu coração — dele procedem os torrentes da vida.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Vigilância', resumo: 'O coração é enganoso e desesperadamente corrupto — precisa ser vigiado constantemente pela Palavra de Deus.', citacao: '«O coração humano é uma fábrica de ídolos — vigie-o pela Palavra de Deus.»' },
    ],
  },
  {
    livro: 'pv', capitulo: 9, versiculo: 10,
    tema: 'O temor do SENHOR é princípio da sabedoria',
    contexto: 'A sabedoria e o conhecimento começam no temor de Deus — reverência que leva à obediência.',
    interpretacoes: [
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Virtude', resumo: 'O temor de Deus é a virtude cardeal — dele decorrem todas as outras. É o fundamento da vida espiritual.', citacao: '«O temor do Senhor é o princípio da sabedoria porque ordena todas as virtudes.»' },
      { teologo: 'Jonathan Edwards', periodo: '1703-1758', tradicao: 'Puritana', visao: 'Afeições', resumo: 'O temor não é medo servil mas reverência amorosa. É a afeição mais sublime — combina admiração, amor e temor.', citacao: '«A verdadeira religião consiste em afeições santificadas — e o temor de Deus é a mais sublime.»' },
    ],
  },
  {
    livro: 'pv', capitulo: 16, versiculo: 9,
    tema: 'O SENHOR endireita os passos',
    contexto: 'O homem planeja seus caminhos, mas é o Senhor quem determina os passos — soberania sobre os planos humanos.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Podemos planejar, mas Deus dirige. A soberania divina não anula a responsabilidade humana — a complementa.', citacao: '«O homem planeja, mas Deus decide — e Sua decisão é sempre melhor.»' },
      { teologo: 'Provérbios (trad.)', periodo: '~950 a.C.', tradicao: 'Bíblica', visao: 'Sabedoria', resumo: 'O equilíbrio entre planejamento humano e direção divina é a essência da sabedoria prática.', citacao: '«O coração do homem planeja o seu caminho, mas o Senhor lhe dirige os passos.»' },
    ],
  },
  {
    livro: 'pv', capitulo: 22, versiculo: 6,
    tema: 'Instrui o menino no caminho',
    contexto: 'O provérbio sobre educação: instruir a criança desde cedo, e quando velho não se desviará.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Educação', resumo: 'A educação cristã começa na infância. O caráter se forma cedo — a instrução no caminho do Senhor é responsabilidade dos pais.', citacao: '«Instrui o menino no caminho — e quando velho, não se desviará.»' },
      { teologo: 'John Wesley', periodo: '1703-1791', tradicao: 'Metodista', visao: 'Formação', resumo: 'A formação espiritual na infância é fundamental. O que se planta cedo, colhe-se para sempre.', citacao: '«Dê-me um menino até os sete anos, e lhe darei um homem.»' },
    ],
  },
  {
    livro: 'pv', capitulo: 27, versiculo: 17,
    tema: 'O ferro afia o ferro',
    contexto: 'Provérbio sobre o poder das relações saudáveis: o homem afia o semblante do seu amigo.',
    interpretacoes: [
      { teologo: 'Provérbios (trad.)', periodo: '~950 a.C.', tradicao: 'Bíblica', visao: 'Relações', resumo: 'A comunhão cristã é essencial para o crescimento. Ninguém cresce sozinho — precisamos uns dos outros.', citacao: '«O ferro afia o ferro — assim o homem afia o semblante do seu amigo.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Comunhão', resumo: 'A comunhão entre irmãos é instrumento de Deus para o crescimento mútuo. O estímulo e a correção são ferramentas de aperfeiçoamento.', citacao: '«Nossos amigos são as ferramentas de Deus para nos aperfeiçoar.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // OUTROS LIVROS — VERSÍCULOS ESSENCIAIS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'is', capitulo: 40, versiculo: 31,
    tema: 'Os que esperam renovam suas forças',
    contexto: 'Isaías encoraja os exilados com a promessa de renovação para aqueles que esperam no Senhor.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Esperança', resumo: 'A esperança em Deus não decepciona. Quem espera nEle recebe forças novas — não apenas renovadas, mas sobrenaturais.', citacao: '«Os que esperam no Senhor renovarão as suas forças — como águias.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Consolo', resumo: 'A exaustão espiritual é real, mas Deus promete renovação. A espera não é passividade — é confiança ativa.', citacao: '«Quando estiver cansado, espere no Senhor — Ele renovará suas forças como as da águia.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 11, versiculo: 28,
    tema: 'Vinde a mim, todos os cansados',
    contexto: 'O convite mais suave de Jesus:Ele recebe os cansados e oprimidos, dando-lhes descanso.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Descanso', resumo: 'O descanso de Cristo não é physically — é espiritual. É descansar do esforço de salvar-se pelas próprias obras.', citacao: '«Vinde a mim — eu sou o descanso que buscavam.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'O jugo de Cristo é suave porque Ele carrega o peso conosco. A graça elimina o esforço auto-salvador.', citacao: '«O jugo de Cristo é suave — porque Ele carrega o fardo conosco.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 22, versiculo: 37,
    tema: 'Amarás o Senhor teu Deus de todo o teu coração',
    contexto: 'Jesus resume toda a Lei em dois mandamentos: amar a Deus e amar ao próximo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor ordenado', resumo: 'O amor a Deus é o princípio e o fim de toda a Lei. Quando amamos a Deus primeiro, tudo mais se ordena.', citacao: '«Ama a Deus de todo o teu coração — e tudo o mais virá naturalmente.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Resumo da Lei', resumo: 'Todo o dever do homem se resume em amar a Deus completamente e ao próximo como a si mesmo.', citacao: '«O amor a Deus e ao próximo é todo o cumprimento da Lei.»' },
    ],
  },
  {
    livro: 'mc', capitulo: 8, versiculo: 34,
    tema: 'Negue a si mesmo e tome a sua cruz',
    contexto: 'Jesus chama ao discipulado radical: negar a si mesmo, tomar a cruz e segui-Lo.',
    interpretacoes: [
      { teologo: 'Bonhoeffer', periodo: '1906-1945', tradicao: 'Luterana', visao: 'Custo da graça', resumo: 'A graça custa a vida do homem. Seguir a Cristo é morrer para si mesmo — não é conforto, mas cruz.', citacao: '«Quando Cristo chama um homem, chama-o para morrer.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Discipulado', resumo: 'A cruz não é sofrimento aleatório — é sofrimento por causa de Cristo. Negar a si mesmo é submeter a vontade ao Senhor.', citacao: '«Seguir a Cristo é perder a vida para encontrá-la — o paradoxo do evangelho.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 10, versiculo: 10,
    tema: 'Vida em abundância',
    contexto: 'Jesus declara que veio para dar vida abundante, em contraste com o ladrão que vem para roubar.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Vida plena', resumo: 'A vida abundância não é prosperidade material — é vida em comunhão com Deus, plena de significado e propósito.', citacao: '«Cristo veio para dar vida — não apenas existência, mas vida em abundância.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Propósito', resumo: 'A vida abundância é viver para a glória de Deus. O ladrão rouba a verdadeira vida; Cristo a dá em plenitude.', citacao: '«A vida abundância é viver para Deus — tudo o mais é roubo do ladrão.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 15, versiculo: 5,
    tema: 'Sem mim nada podeis fazer',
    contexto: 'Jesus ensina que somos ramos dependentes da videira — sem Ele, não podemos produzir fruto.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Dependência', resumo: 'A união com Cristo é vital — sem ela, somos ramos secos. O fruto é evidência da união, não mérito.', citacao: '«Sem mim nada podeis — a dependência de Cristo é total e constante.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Perseverança', resumo: 'Permanecer na videira é condição para frutificar. A perseverança não é obra humana — é dom divino.', citacao: '«Permaneçam em mim — e eu permaneçamos em vós. A união é a chave do fruto.»' },
    ],
  },
  {
    livro: 'gl', capitulo: 2, versiculo: 20,
    tema: 'Estou crucificado com Cristo',
    contexto: 'Paulo declara sua identidade em Cristo: crucificado, mas vivendo pela fé no Filho de Deus.',
    interpretacoes: [
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Morte e vida', resumo: 'O crente morre para o pecado e vive para Cristo. A identidade antiga é substituída pela nova em Cristo.', citacao: '«Estou crucificado com Cristo — já não sou eu que vivo, mas Cristo vive em mim.»' },
      { teologo: 'Bonhoeffer', periodo: '1906-1945', tradicao: 'Luterana', visao: 'Discipulado', resumo: 'A cruz é o centro da vida cristã. Viver é morrer diariamente para si mesmo e viver para Cristo.', citacao: '«A vida cristã é uma cruz — morrer para si mesmo todos os dias.»' },
    ],
  },
  {
    livro: 'hb', capitulo: 12, versiculo: 2,
    tema: 'Olhando para Jesus, autor e consumador da fé',
    contexto: 'O autor de Hebreus encoraja a perseverança olhando para Jesus como modelo e consumador da fé.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Perseverança', resumo: 'A fé começa e termina em Cristo. Ele é tanto o iniciador quanto o aperfeiçoador de toda a fé.', citacao: '«Olhando para Jesus — Ele é o autor e consumador da fé.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Centro', resumo: 'Jesus é o centro de toda a fé cristã. O olhar deve ser fixo nEle — não nas circunstâncias, mas no Salvador.', citacao: '«Olhe para Jesus — não para as tempestades, não para as dunhas, mas para o Salvador.»' },
    ],
  },
  {
    livro: 'tg', capitulo: 1, versiculo: 5,
    tema: 'Pedir sabedoria a Deus',
    contexto: 'Tiago ensina que a sabedoria divina está disponível para todos que pedem com fé.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Sabedoria', resumo: 'Deus não recusa sabedoria a quem pede de coração sincero. A sabedoria divina é um dom, não um mérito.', citacao: '«Se alguém tem falta de sabedoria, peça-a a Deus — Ele a dá liberalmente.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Oração', resumo: 'A oração é o meio pelo qual recebemos sabedoria. Deus não censura quem pede — Ele responde com generosidade.', citacao: '«Deus dá sabedoria a todos sem distinção — é dom de Sua graça.»' },
    ],
  },
  {
    livro: 'tg', capitulo: 4, versiculo: 7,
    tema: 'Sujeitai-vos a Deus; resisti ao diabo',
    contexto: 'Tiago ensina a ordem correta: primeiro submeter-se a Deus, depois resistir ao diabo.',
    interpretacoes: [
      { teologo: 'Tiago (trad.)', periodo: 'Séc. I d.C.', tradicao: 'Bíblica', visao: 'Guerra espiritual', resumo: 'A resistência ao diabo só é eficaz quando precedida da submissão a Deus. A ordem é essential.', citacao: '«Sujeitai-vos primeiro a Deus — depois resisti ao diabo, e fugirá.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Dependência', resumo: 'A vitória sobre Satanás não vem de força própria — vem da submissão total a Deus. A submissão é a chave.', citacao: '«Não resistimos ao diabo com nossas forças — mas com o poder de Deus que habita em nós.»' },
    ],
  },
  {
    livro: '1co', capitulo: 10, versiculo: 13,
    tema: 'Tentação tem saída',
    contexto: 'Paulo assegura que Deus é fiel e não permite tentação acima do que podemos suportar, preparando sempre uma saída.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Proteção', resumo: 'Deus limita a tentação — Ele nunca permite que sejamos tentados além de nossa capacidade. A saída é sempre fornecida.', citacao: '«Deus é fiel — não permite tentação acima do que podemos suportar.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Providência', resumo: 'Deus controla a tentação — Ele a permite para testar, não para destruir. A saída é o caminho de fuga que Deus prepara.', citacao: '«Deus prepare um caminho de saída — mas é preciso escolhê-lo.»' },
    ],
  },
  {
    livro: '2co', capitulo: 5, versiculo: 17,
    tema: 'Nova criatura em Cristo',
    contexto: 'Paulo declara que quem está em Cristo é nova criatura — as coisas velhas passaram.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Regeneração', resumo: 'A conversão é uma nova criação real — não apenas reforma, mas transformação completa da natureza.', citacao: '«Se alguém está em Cristo, nova criatura é — tudo se torna novo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Identidade', resumo: 'A identidade do crente é transformada — a velha natureza morre e uma nova nasce. É obra de Deus, não de esforço humano.', citacao: '«A nova criação é obra de Deus — Ele faz todas as coisas novas em Cristo.»' },
    ],
  },
  {
    livro: 'cl', capitulo: 3, versiculo: 23,
    tema: 'Tudo o que fizerdes, fazei como ao Senhor',
    contexto: 'Paulo ensina que o trabalho e o serviço devem ser feitos como se servissemos diretamente ao Senhor.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Vocação', resumo: 'Todo trabalho é vocação quando feito para a glória de Deus. Não há distinção entre sagrado e secular.', citacao: '«Tudo o que fizerdes, fazei como ao Senhor — Ele é o verdadeiro patrão.»' },
      { teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Luterana', visao: 'Vida cotidiana', resumo: 'A vida cristã é vivida no cotidiano — no trabalho, nos relacionamentos, nas tarefas simples. Tudo é para Deus.', citacao: '«A graça de Deus não é o conforto — é o chamado a viver para Ele em tudo.»' },
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



const estudosCatalogoRestante: EstudoVersiculo[] = [
  {
    livro: 'gn', capitulo: 1, versiculo: 2,
    tema: 'Caos primordial',
    contexto: 'Terra sem forma e vazia, Espírito de Deus pairando.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Apopfatismo', resumo: 'O caos é matéria prima aguardando ordenação.', citacao: '«O Espírito pairava — vida já presente no caos.»' },
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Potencialidade', resumo: 'A matéria aguarda as formas que Deus imprime.', citacao: '«O caos é matéria primeira apta a receber formas.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Descrição literal', resumo: 'Moisés descreve o estado real da terra.', citacao: '«Deus criou para habitar, não para ser vazio.»' },
    ],
  },
  {
    livro: 'gn', capitulo: 1, versiculo: 3,
    tema: 'Luz — primeira palavra criadora',
    contexto: 'Deus diz «Haja luz», e há luz.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cristologia', resumo: 'A luz é tipo de Cristo.', citacao: '«A luz é Cristo — primeira obra divina.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Autoridade', resumo: 'Deus cria pela palavra — sem esforço.', citacao: '«Deus cria pela palavra — autoridade sem esforço.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação', resumo: 'A luz é primeiro ato de revelação.', citacao: '«A luz é revelação — Deus se faz conhecido.»' },
    ],
  },
  {
    livro: 'gn', capitulo: 2, versiculo: 7,
    tema: 'Formação do pó ao fôlego',
    contexto: 'Deus forma o homem do pó e sopra fôlego.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Unidade corpo-alma', resumo: 'O homem é unidade de pó e fôlego divino.', citacao: '«O homem é alma vivente — não tem alma, é alma.»' },
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Hilemorfismo', resumo: 'A alma é forma substancial do corpo.', citacao: '«A alma é forma do corpo — sem ela, é pó.»' },
      { teologo: 'C.S. Lewis', periodo: '1898-1963', tradicao: 'Evangélica', visao: 'Dignidade', resumo: 'O fôlego confere dignidade incomparável.', citacao: '«Não somos animais — carregamos fôlego de Deus.»' },
    ],
  },
  {
    livro: 'gn', capitulo: 2, versiculo: 24,
    tema: 'Unidade do matrimônio',
    contexto: 'Deus estabelece o casamento — dois se tornam uma só carne.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Unidade indissolúvel', resumo: 'Deus une — não deve ser separado.', citacao: '«O que Deus uniu, o homem não separe.»' },
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Complementariedade', resumo: 'A mulher é complemento — igualdade.', citacao: '«A mulher é complemento — igualdade.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Cristológico', resumo: 'O matrimônio prefigura Cristo e a Igreja.', citacao: '«O casamento é o mistério da aliança.»' },
    ],
  },
  {
    livro: 'gn', capitulo: 3, versiculo: 6,
    tema: 'A queda — transgressão',
    contexto: 'Eva vê que a árvore é boa e come do fruto proibido.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Desordenção do desejo', resumo: 'O pecado começa no desejo desordenado.', citacao: '«O pecado é desejo desordenado — querer o proibido.»' },
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Pecado original', resumo: 'A queda afetou toda natureza humana.', citacao: '«Natureza ferida — razão obscurecida, vontade enfraquecida.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Bondade perdida', resumo: 'A bondade original foi perdida, não a natureza.', citacao: '«A natureza caiu — mas Deus a criou boa.»' },
    ],
  },
  {
    livro: 'gn', capitulo: 4, versiculo: 7,
    tema: 'Pecado à porta',
    contexto: 'Deus avisa Caim — o pecado está à porta.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Gratuitidade', resumo: 'O pecado não tem causa exterior.', citacao: '«O pecado está à porta — mas tu podes dominá-lo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania e responsabilidade', resumo: 'Deus adverte, mas o homem é responsável.', citacao: '«Deus adverte — mas o homem escolhe.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Liberdade moral', resumo: 'Deus dá Chance ao pecador.', citacao: '«Deus nunca permite tentação sem dar graça.»' },
    ],
  },
  {
    livro: 'gn', capitulo: 6, versiculo: 5,
    tema: 'Depravação universal',
    contexto: 'Todos os pensamentos do coração continuamente maus.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Pecado original', resumo: 'A queda contaminou toda raça — não há justo.', citacao: '«O coração é ídolo de si mesmo.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Depravação total', resumo: 'O homem está morto em pecado.', citacao: '«O homem é incapaz de bem sem graça.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Total depravity', resumo: 'O pecado afeta cada faculdade.', citacao: '«Não há saúde — completamente corrompido.»' },
    ],
  },
  {
    livro: 'gn', capitulo: 8, versiculo: 22,
    tema: 'Aliança com a criação',
    contexto: 'Dias e noites, verão e inverno não cessarão.',
    interpretacoes: [
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Aliança de preservação', resumo: 'Deus preserva a ordem natural.', citacao: '«Enquanto a terra existir, semente não cessará.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Aliança cósmica', resumo: 'A aliança com a criação é pré-condição.', citacao: '«Deus se vincula à criação antes de exigir.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Renovação', resumo: 'A aliança aponta para restauração.', citacao: '«Deus não destruirá — renovará pela ressurreição.»' },
    ],
  },
  {
    livro: 'gn', capitulo: 12, versiculo: 3,
    tema: 'Abençoar todas as nações',
    contexto: 'Em ti serão abençoadas todas as famílias da terra.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Tipologia eclesial', resumo: 'Abraom é tipo da Igreja — bênção universal.', citacao: '«Em ti, todas as famílias — cumprido em Cristo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eleição instrumental', resumo: 'Deus escolhe um para abençoar muitos.', citacao: '«Deus abençoa um para abençoar a todos.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Nova aliança', resumo: 'A missão da Igreja é levar a bênção.', citacao: '«Deus abençoa o mundo através de um povo.»' },
    ],
  },
  {
    livro: 'gn', capitulo: 22, versiculo: 14,
    tema: 'Jireh — O Senhor proverá',
    contexto: 'Deus providencia cordeiro como substituto.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Tipologia cristológica', resumo: 'O cordeiro é tipo de Cristo — substituto.', citacao: '«O cordeiro prefigura Cristo — Cordeiro de Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Providência soberana', resumo: 'Deus proverá — no momento certo.', citacao: '«Deus proverá — no momento exato.»' },
      { teologo: 'C.S. Lewis', periodo: '1898-1963', tradicao: 'Evangélica', visao: 'Sacrifício e dádiva', resumo: 'Deus prove o substituto.', citacao: '«Deus quer a nós — nos dá o que precisamos.»' },
    ],
  },
  {
    livro: 'gn', capitulo: 28, versiculo: 15,
    tema: 'Promessa de presença',
    contexto: 'Deus promete estar com Jacó.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Presença permanente', resumo: 'A presença é a maior promessa.', citacao: '«Eis que eu estou contigo — maior promessa.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Aliança pessoal', resumo: 'Deus faz aliança com cada pessoa.', citacao: '«Deus faz aliança com cada um.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Companheirismo', resumo: 'A presença é fundamento da oração.', citacao: '«Deus caminha conosco — não está distante.»' },
    ],
  },
  {
    livro: 'ex', capitulo: 12, versiculo: 5,
    tema: 'Cordeiro pascal sem mancha',
    contexto: 'Escolher cordeiro sem mancha — tipo de Cristo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Tipologia', resumo: 'Cordeiro prefigura Cristo imaculado.', citacao: '«Cordeiro pascal é Cristo — imaculado, oferecido.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Substituição', resumo: 'Cordeiro morre em lugar do primogênito.', citacao: '«Sangue do cordeiro poupa — como sangue de Cristo.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Éxodo cristão', resumo: 'A páscoa é paradigma da salvação.', citacao: '«História de Israel é paradigma da salvação.»' },
    ],
  },
  {
    livro: 'ex', capitulo: 14, versiculo: 13,
    tema: 'Salvação do Senhor',
    contexto: 'Não temais — vede o livramento do Senhor.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Livramento tipológico', resumo: 'Travessia é tipo do batismo.', citacao: '«Mar Vermelho é tipo do batismo.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Confiança', resumo: 'Quando tudo parece perdido, Deus age.', citacao: '«Confie no livramento de Deus.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Fé prática', resumo: 'A fé é necessária antes do livramento.', citacao: '«Deus não pede separar águas — apenas avançar.»' },
    ],
  },
  {
    livro: 'ex', capitulo: 20, versiculo: 3,
    tema: 'Sem outros deuses',
    contexto: 'Não terás outros deuses diante de mim.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor desordenado', resumo: 'O pecado é amar mais o menor.', citacao: '«Pecado é amar mais o que é menos.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Teologia da cruz', resumo: 'Deus não compartilha Sua glória.', citacao: '«Deus não divide Seu trono.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Coração idólatra', resumo: 'O coração é fábrica de ídolos.', citacao: '«Coração perpetuamente idólatra.»' },
    ],
  },
  {
    livro: 'ex', capitulo: 20, versiculo: 12,
    tema: 'Honrar pai e mãe',
    contexto: 'Primeiro mandamento com promessa.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Ordem natural', resumo: 'A família é primeira escola de virtude.', citacao: '«Honrar pais é honrar Deus.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Vocação', resumo: 'Vida cotidiana é vocação.', citacao: '«Família é primeira vocação.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Reino de Deus', resumo: 'Honrar é viver o reino no lar.', citacao: '«O reino começa em casa.»' },
    ],
  },
  {
    livro: 'ex', capitulo: 31, versiculo: 18,
    tema: 'Tábuas da Lei',
    contexto: 'Escritas pelo dedo de Deus.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Lei e graça', resumo: 'A Lei é santa, mas revela sem curar.', citacao: '«Lei dada para que pecado abundasse.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Lei e evangelho', resumo: 'Lei acusa, evangelho consola.', citacao: '«Lei é espelho — evangelho é remédio.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Três usos', resumo: 'Conter mal, revelar pecado, guiar justo.', citacao: '«Lei não abolida — cumprida em Cristo.»' },
    ],
  },
  {
    livro: 'lv', capitulo: 16, versiculo: 30,
    tema: 'Expiação pelo sumo sacerdote',
    contexto: 'Dia da expiação — entra no Santo dos Santos.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Tipologia cristológica', resumo: 'Sumo sacerdote é tipo de Cristo.', citacao: '«Cristo entra no santuário com Seu sangue.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Substituição', resumo: 'Bode expiatório leva pecados — tipo de Cristo.', citacao: '«Bode é Cristo — remove nossos pecados.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Reino restaurado', resumo: 'A expiação restaura presença de Deus.', citacao: '«Expiação é restauração da presença.»' },
    ],
  },
  {
    livro: 'nm', capitulo: 6, versiculo: 24,
    tema: 'Bênção aaronítica',
    contexto: 'O Senhor te abençoe e te guarde.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Trindade', resumo: 'Três cláusulas aludem à Trindade.', citacao: '«Bênção trinitária — três, um Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça soberana', resumo: 'A bênção é graça — sem mérito.', citacao: '«Deus abençoa porque quer.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Pastoral', resumo: 'O pastor abençoa com autoridade espiritual.', citacao: '«Pastor com autoridade, abençoa com poder.»' },
    ],
  },
  {
    livro: 'dt', capitulo: 6, versiculo: 5,
    tema: 'Amarás o Senhor de todo coração',
    contexto: 'Mandamento supremo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor total', resumo: 'Amor sem divisão de lealdade.', citacao: '«Ama Deus e faz — se amor perfeito, tudo seguirá.»' },
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Amor beatífico', resumo: 'O amor a Deus é fim último.', citacao: '«Fim último é visão beatífica — ver Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Adoração', resumo: 'Adoração é dever supremo.', citacao: '«Adoração é dever — não apenas no templo.»' },
    ],
  },
  {
    livro: 'dt', capitulo: 18, versiculo: 15,
    tema: 'Profeta como Moisés',
    contexto: 'Deus levantará profeta como Moisés.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cristologia', resumo: 'Cristo é profeta como Moisés — mas superior.', citacao: '«Profeta como Moisés — mas maior, Deus e homem.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Mediação', resumo: 'Cristo é mediador perfeito.', citacao: '«Mediador perfeito — Deus e homem se encontram.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Reino', resumo: 'Profeta lidera novo éxodo.', citacao: '«Jesus lidera novo éxodo.»' },
    ],
  },
  {
    livro: 'dt', capitulo: 30, versiculo: 19,
    tema: 'Vida e morte',
    contexto: 'Escolhe a vida para que vivas.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Liberdade', resumo: 'Deus respeita liberdade — escolha real.', citacao: '«Deus respeita liberdade — escolha real.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Graça', resumo: 'A escolha é pela graça — Deus habilita.', citacao: '«Escolha é pela graça — Deus habilita ao bem.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Soberania e responsabilidade coexistem.', citacao: '«Soberania e responsabilidade coexistem.»' },
    ],
  },
  {
    livro: '1sm', capitulo: 8, versiculo: 7,
    tema: 'Rejeição da monarquia',
    contexto: 'O povo pede rei — Deus interpreta como rejeição.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Soberania', resumo: 'Deus é verdadeiro rei.', citacao: '«Não é a ti que rejeitam — é a mim.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Dualidade', resumo: 'Deus usa escolhas erradas para propósitos.', citacao: '«Deus transforma rebeldias em instrumentos.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Reino', resumo: 'O pedido é idolatria política.', citacao: '«Queriam rei como nações — Deus deu segundo Seu coração.»' },
    ],
  },
  {
    livro: '2sm', capitulo: 7, versiculo: 16,
    tema: 'Aliança davídica eterna',
    contexto: 'Trono estabelecido para sempre.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cristologia', resumo: 'Cumpre em Cristo — Rei eterno.', citacao: '«Casa de Davi para sempre — cumprido em Cristo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Aliança', resumo: 'Aliança incondicional — Deus promete.', citacao: '«Deus não condiciona — garante pela fidelidade.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Reino', resumo: 'Aliança é fundamento do reino.', citacao: '«Aliança davídica é cerne da história.»' },
    ],
  },
  {
    livro: '2sm', capitulo: 12, versiculo: 13,
    tema: 'O Senhor tirou teu pecado',
    contexto: 'Natan absolve Davi.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Perdão', resumo: 'Deus tira o pecado — não ignora, remove.', citacao: '«Deus tira — remove, não ignora.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Absolvição', resumo: 'Quando Deus diz «tirou», é tirado.', citacao: '«Absolvição é real — Deus remove.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'Perdão é graça — Davi não merecia.', citacao: '«Perdão é graça — Deus compadece.»' },
    ],
  },
  {
    livro: '1rs', capitulo: 3, versiculo: 12,
    tema: 'Sabedoria de Salomão',
    contexto: 'Deus concede sabedoria incomparável.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Sabedoria divina', resumo: 'Sabedoria é dom de Deus.', citacao: '«Sabedoria vem de Deus — dom, não conquista.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Vocação', resumo: 'Deus dá sabedoria para a vocação.', citacao: '«Deus capacita o que chama.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Sabedoria mais valuable que riqueza.', citacao: '«Salomão pediu sabedoria — Deus deu mais.»' },
    ],
  },
  {
    livro: '2rs', capitulo: 2, versiculo: 11,
    tema: 'Ascensão de Elias',
    contexto: 'Levado ao céu em carro de fogo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Tipologia', resumo: 'Elias é tipo de Cristo.', citacao: '«Tipo de Cristo — assunto ao céu.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Deus pode o que quiser.', citacao: '«Deus não é limitado — autor das leis.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Escatologia', resumo: 'Ascensão aponta para a de Cristo.', citacao: '«Prefigura ascensão de Cristo.»' },
    ],
  },
  {
    livro: '2rs', capitulo: 5, versiculo: 14,
    tema: 'Purificação de Naamã',
    contexto: 'Leproso sirio curado pela obediência.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Fé na palavra', resumo: 'Cura pela obediência à palavra.', citacao: '«Naamã curado ao obedecer — fé é obediência.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Graça', resumo: 'Graça gratuita — Naamã não merecia.', citacao: '«Graça gratuita — não merecia, mas Deus curou.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Missão', resumo: 'Deus cura até inimigos.', citacao: '«Deus cura inimigos — graça sem fronteiras.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 27, versiculo: 4,
    tema: 'Uma coisa peço ao Senhor',
    contexto: 'Habitar na casa do Senhor.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Deseiro', resumo: 'Um desejo supremo — ver Deus.', citacao: '«Desejo supremo — ver Deus.»' },
      { teologo: 'São Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Visão beatífico', resumo: 'O fim é contemplar a Deus.', citacao: '«Um desejo — ver Deus.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Prioridade', resumo: 'A fé é sobre prioridades.', citacao: '«Uma coisa — Deus primeiro.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 32, versiculo: 5,
    tema: 'Confessei e Tu perdoaste',
    contexto: 'Arrependimento traz perdão.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Confissão', resumo: 'Confessar é reconhecer a verdade.', citacao: '«Confessar é reconhecer — Deus perdoa.»' },
      { teologo: 'Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Perdão', resumo: 'O perdão é real e completo.', citacao: '«Perdoou — completely removido.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Libertação', resumo: 'O pecado pesa — o perdão liberta.', citacao: '«Pecado pesa — perdão livra o coração.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 51, versiculo: 7,
    tema: 'Lava-me e ficarei mais branco',
    contexto: 'Purificação divina — misericórdia soberana.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Misericórdia', resumo: 'Misericórdia superior a sacrifícios.', citacao: '«Misericórdia — Deus não deseja sacrifício.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'A graça transforma — lava, purifica.', citacao: '«Graça lava — faz branco.»' },
      { teologo: 'C.S. Lewis', periodo: '1898-1963', tradicao: 'Evangélica', visao: 'Humildade', resumo: 'Humildade é reconhecer a necessidade.', citacao: '«Humildade — saber que Deus lava.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 73, versiculo: 26,
    tema: 'Meu coração e minha carne languidem',
    contexto: 'Dúvida resolvida pela presença de Deus.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Presença', resumo: 'A presença de Deus sustenta.', citacao: '«Deus é a porção — sem Ele, nada.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Fé crida', resumo: 'A fé não é sentimento — é escolha.', citacao: '«Fé não é sentimento — é escolha.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Provação', resumo: 'O salmoist duvidou mas Deus provou.', citacao: '«Dúvida existe — mas Deus se revela.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 110, versiculo: 1,
    tema: 'Senta-te à minha direita',
    contexto: 'Salmo messiânico — messias sacerdote e rei.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cristologia', resumo: 'Cristo é sumo sacerdote e rei.', citacao: '«Cristo sentado — obra acabada.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Aliança', resumo: 'Aliança nova — eterna, por Cristo.', citacao: '«Aliança nova — por Jesus.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Ascensão', resumo: 'Aponta para ascensão e exaltação.', citacao: '«Ascensão — sentado à direita.»' },
    ],
  },
  {
    livro: 'ec', capitulo: 1, versiculo: 2,
    tema: 'Vanidade de vaidades',
    contexto: 'Tudo é vaidade sob o sol.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Limitação humana', resumo: 'O homem busca sem encontrar plenitude.', citacao: '«Vaidade — tudo é vaidade.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Necessidade de Deus', resumo: 'Sem Deus, tudo é vazio.', citacao: '«Sem Deus, tudo é vazio.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Realismo', resumo: 'O Eclesiastes é realista — não nega a realidade.', citacao: '«Realismo — Deus é resposta ao vazio.»' },
    ],
  },
  {
    livro: 'ec', capitulo: 3, versiculo: 11,
    tema: 'Tudo fez formoso em seu tempo',
    contexto: 'Deus põe eternidade no coração.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Eternidade', resumo: 'O desejo de eternidade é divino.', citacao: '«Deus pôs eternidade — desejo de eternidade.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Providência', resumo: 'Deus governa todos os tempos.', citacao: '«Deus governa — há tempo para tudo.»' },
      { teologo: 'C.S. Lewis', periodo: '1898-1963', tradicao: 'Evangélica', visao: 'Beleza', resumo: 'A criação é formosa — arte de Deus.', citacao: '«Tudo formoso — Deus é artista.»' },
    ],
  },
  {
    livro: 'is', capitulo: 6, versiculo: 8,
    tema: 'Quem irá? Eis-me aqui',
    contexto: 'Chamado de Isaías para a missão.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Vocação', resumo: 'A vocação é divina — Deus prepara.', citacao: '«Quem enviará? — eu respondo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Missão', resumo: 'A missão é prioritária — Deus busca.', citacao: '«Deus busca — quem responde?»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prontidão', resumo: 'Resposta imediata à chamada.', citacao: '«Prontidão — eu estou aqui.»' },
    ],
  },
  {
    livro: 'is', capitulo: 55, versiculo: 11,
    tema: 'Minha palavra não volta vazia',
    contexto: 'A Palavra de Deus é eficaz.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Eficiência', resumo: 'A palavra de Deus produz.', citacao: '«Minha palavra produz — não volta vazia.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Deus governa pela palavra.', citacao: '«Deus governa — palavra eficaz.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Confiança', resumo: 'Deus cumpre o que promete.', citacao: '«Deus cumpre — não volta vazia.»' },
    ],
  },
  {
    livro: 'jr', capitulo: 1, versiculo: 5,
    tema: 'Antes de te formar no ventre eu te conheci',
    contexto: 'Vocação antecipada — Deus escolhe antes do nascimento.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Eleição', resumo: 'Deus escolhe antes do nascimento.', citacao: '«Antes de nascer — Deus já escolheu.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Vocação', resumo: 'Deus prepara antes de enviar.', citacao: '«Deus prepara — conhecendo desde o início.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Própria', resumo: 'A vocação é divina, não humana.»', citacao: 'A vocação é divina, não humana.»' },
    ],
  },
  {
    livro: 'ez', capitulo: 37, versiculo: 9,
    tema: 'Vida aos ossos secos',
    contexto: 'Visão do vale de ossos — ressurreição.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Ressurreição', resumo: 'Ossos vivificados — tipo de ressurreição.', citacao: '«Ossos vivos — Deus restaura.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Restauração', resumo: 'Israel restaurado do exílio.', citacao: '«Exílio não é fim — Deus restaura.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Espírito', resumo: 'O Espírito dá vida aos mortos.', citacao: '«Espírito — vida aos ossos.»' },
    ],
  },
  {
    livro: 'ez', capitulo: 36, versiculo: 26,
    tema: 'Coração de pedra, coração de carne',
    contexto: 'Promessa de transformação interior.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Transformação', resumo: 'Deus substitui coração duro por mole.', citacao: '«Coração novo — Deus transforma.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Espírito', resumo: 'O Espírito é agente da mudança.', citacao: '«Espírito — agente da mudança.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Renovação', resumo: 'Renovação total — interior e exterior.»', citacao: 'Renovação total — interior e exterior.»' },
    ],
  },
  {
    livro: 'os', capitulo: 11, versiculo: 1,
    tema: 'De Egipto chamei Meu filho',
    contexto: 'Deus cuida como pai.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Paternidade divina', resumo: 'Deus é pai — cuida com ternura.', citacao: '«Israel é Meu filho — Deus é pai.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eleição', resumo: 'Deus escolhe e cuida.', citacao: '«Deus escolhe — cuida como pai.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Cristologia', resumo: 'Cristo é Filho — cumprido em Mateus.»', citacao: 'Cristo é Filho — cumprido em Mateus.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 3, versiculo: 2,
    tema: 'Arrependei-vos — chegado o reino',
    contexto: 'João prepara a vinda do Messias.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Conversão', resumo: 'O reino exige conversão.', citacao: '«Reino chegou — arrependam-se.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Urgência', resumo: 'O reino é urgente — não adie.', citacao: '«Reino urgente — arrependam-se.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Escatologia', resumo: 'O reino já é presente — mas ainda não perfeito.', citacao: '«Reino presente — mas não ainda pleno.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 4, versiculo: 17,
    tema: 'Jesus prega o mesmo',
    contexto: 'Reino dos céus está próximo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cristologia', resumo: 'Jesus herda a mensagem de João.', citacao: '«Jesus herda — reino está próximo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Reino', resumo: 'O reino é real — não é apenas espiritual.', citacao: '«Reino é real — não apenas espiritual.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Missão', resumo: 'A missão é proclamar o reino.', citacao: '«Missão — proclamar o reino.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 5, versiculo: 14,
    tema: 'Vós sois a luz do mundo',
    contexto: 'A luz não pode ser escondida.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Testemunho', resumo: 'O crente é luz — não pode ser escondido.', citacao: '«Luz do mundo — não pode ser escondida.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Missão', resumo: 'A fé é para ser vista — não escondida.', citacao: '«Fé é para ser vista — não escondida.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'A fé é prática — não apenas crença.', citacao: '«Fé é prática — não apenas crença.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 5, versiculo: 44,
    tema: 'Amai a vossos inimigos',
    contexto: 'Amor radical — inimigos.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor radical', resumo: 'Amai a vossos inimigos — sem exceção.', citacao: '«Amor radical — sem exceção.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'Deus ama antes — nós devemos amar.', citacao: '«Deus amou — nós devemos amar.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Inclusão', resumo: 'O amor é inclusivo — não exclui.', citacao: '«Amor inclusivo — para todos.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 10, versiculo: 33,
    tema: 'Negar diante dos homens',
    contexto: 'A confissão pública é necessária.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Confissão', resumo: 'A fé é pública — não pode ser escondida.', citacao: '«Confissão pública — fé não escondida.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Testemunho', resumo: 'Testemunho é falar de Cristo abertamente.', citacao: '«Testemunho — falar abertamente.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Coragem', resumo: 'A fé exige coragem — negar é pecado.', citacao: '«Coragem — negar é pecado.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 16, versiculo: 18,
    tema: 'Sobre esta pedra edificarei Minha Igreja',
    contexto: 'Fundação da Igreja — promessa invencível.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Eclesiologia', resumo: 'A Igreja é de Cristo — não humana.', citacao: '«Minha Igreja — de Cristo, não humana.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Pedra', resumo: 'Cristo é a pedra angular — não Pedro.', citacao: '«Pedra é Cristo — não Pedro.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Promessa', resumo: 'A Igreja é invencível — portas do inferno não prevalecerão.»', citacao: 'A Igreja é invencível — portas do inferno não prevalecerão.»' },
    ],
  },
  {
    livro: 'mc', capitulo: 1, versiculo: 15,
    tema: 'Crede no evangelho',
    contexto: 'Jesus proclama: crede, o reino está próximo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Fé', resumo: 'A fé é resposta ao evangelho.', citacao: '«Crede — fé é resposta.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Reino', resumo: 'O reino é real — não é ideia.', citacao: '«Reino é real — não apenas ideia.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Urgência', resumo: 'O reino é urgente — não adie.', citacao: '«Reino urgente — crede agora.»' },
    ],
  },
  {
    livro: 'mc', capitulo: 16, versiculo: 15,
    tema: 'Ide por todo mundo',
    contexto: 'Grande Comissão — proclamar o evangelho.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Missão', resumo: 'Evangelho para toda criatura.', citacao: '«Toda criatura — missão universal.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Proclamação', resumo: 'Proclamar — não apenas viver.', citacao: '«Proclamar — falar.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Universalidade', resumo: 'O evangelho é para todos — sem exceção.»', citacao: 'O evangelho é para todos — sem exceção.»' },
    ],
  },
  {
    livro: 'lc', capitulo: 2, versiculo: 10,
    tema: 'Boas novas de grande alegria',
    contexto: 'Natal — nascimento do Salvador.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Natal', resumo: 'Jesus nasce — Salvador do mundo.', citacao: '«Natal — Salvador.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Joy', resumo: 'Alegria — não é apenas notícia, é salvação.', citacao: '«Alegria — salvação.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Inclusão', resumo: 'Para todos — não apenas para judeus.', citacao: '«Para todos — sem exceção.»' },
    ],
  },
  {
    livro: 'lc', capitulo: 4, versiculo: 18,
    tema: 'Espírito do Senhor é sobre mim',
    contexto: 'Jesus na sinagoga — manifesto messiânico.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cristologia', resumo: 'Jesus é o Ungido — Messias.', citacao: '«Espírito sobre mim — Messias.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Missão', resumo: 'Libertar cativos — misericórdia.', citacao: '«Libertar — missão messiânica.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Reino', resumo: 'Reino se inicia — libertação.', citacao: '«Reino se inicia — libertação.»' },
    ],
  },
  {
    livro: 'lc', capitulo: 15, versiculo: 20,
    tema: 'O pai corre ao encontro',
    contexto: 'Parábola do filho pródigo — graça que acolhe.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Graça', resumo: 'Deus corre ao encontro — graça.', citacao: '«Pai corre — graça que acolhe.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Arrependimento', resumo: 'O filho arrependido é acolhido.', citacao: '«Arrependimento — acolhimento.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Perdão', resumo: 'O perdão é pleno — festa no céu.', citacao: '«Perdão pleno — festa.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 6, versiculo: 35,
    tema: 'Eu sou o pão da vida',
    contexto: 'Cristo é sustento — dá vida eterna.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cristologia', resumo: 'Cristo é o pão — sustento divino.', citacao: '«Pão da vida — sustento.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Fé', resumo: 'A fé se alimenta de Cristo.', citacao: '«Fé — alimenta-se de Cristo.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Vida eterna', resumo: 'A vida eterna é comer e beber de Cristo.»', citacao: 'A vida eterna é comer e beber de Cristo.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 8, versiculo: 32,
    tema: 'Conhecereis a verdade, e a verdade vos libertará',
    contexto: 'Liberdade pela verdade.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Verdade', resumo: 'A verdade liberta — não escraviza.', citacao: '«Verdade liberta — não escraviza.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Liberdade', resumo: 'Liberdade vem do conhecimento de Deus.', citacao: '«Liberdade — conhecimento de Deus.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'A verdade é prática — não apenas teoria.', citacao: '«Verdade é prática — liberta.»' },
    ],
  },
  {
    livro: 'at', capitulo: 17, versiculo: 11,
    tema: 'Bereanos — examinavam as Escrituras',
    contexto: 'Estudo bíblico — fé baseada na Palavra.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Estudo', resumo: 'A fé se baseia no estudo da Palavra.', citacao: '«Bereanos — estudo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Escritura', resumo: 'A Escritura é autoridade — não tradição.', citacao: '«Escritura é autoridade — não tradição.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'A fé é estudo — não ignorância.»', citacao: 'A fé é estudo — não ignorância.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 1, versiculo: 16,
    tema: 'Não me envergonho do evangelho',
    contexto: 'Poder de Deus para salvação.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Evangelho', resumo: 'O evangelho é poder de Deus.', citacao: '«Evangelho — poder de Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Salvação', resumo: 'Salvação para todo o que crê.', citacao: '«Salvação — para todos que creem.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Testemunho', resumo: 'Não tenha vergonha — fale abertamente.»', citacao: 'Não tenha vergonha — fale abertamente.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 3, versiculo: 10,
    tema: 'Não há justo nem sequer um',
    contexto: 'Depravação universal — todos pecaram.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Depravação', resumo: 'Todos são pecadores — sem exceção.', citacao: '«Não há justo — todos pecaram.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Lei', resumo: 'A Lei revela o pecado — não cura.', citacao: '«Lei revela — não cura.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Necessidade', resumo: 'Todos precisam de salvação — sem exceção.»', citacao: 'Todos precisam de salvação — sem exceção.»' },
    ],
  },
  {
    livro: '1co', capitulo: 1, versiculo: 18,
    tema: 'Loucura da cruz',
    contexto: 'A cruz é loucura para os que perecem.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cruz', resumo: 'A cruz é loucura — mas é poder.', citacao: '«Cruz é loucura — mas é poder.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Paradoxo', resumo: 'O que parece fracasso é vitória.', citacao: '«Cruz parece fracasso — é vitória.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Fé', resumo: 'A fé abraça o paradoxo — cruz é salvação.»', citacao: 'A fé abraça o paradoxo — cruz é salvação.»' },
    ],
  },
  {
    livro: '1co', capitulo: 10, versiculo: 31,
    tema: 'Gloriai a Deus em tudo',
    contexto: 'Tudo para a glória de Deus.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Glória', resumo: 'Tudo deve ser para a glória de Deus.', citacao: '«Tudo para glória — sem exceção.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Ética', resumo: 'A ética é para a glória — não para aplauso.', citacao: '«Ética para glória — não para aplauso.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'A fé é prática — não teoria.»', citacao: 'A fé é prática — não teoria.»' },
    ],
  },
  {
    livro: '1co', capitulo: 12, versiculo: 12,
    tema: 'Um corpo com muitos membros',
    contexto: 'Unidade na diversidade — a Igreja.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Unidade', resumo: 'A Igreja é um corpo — membros diferentes.', citacao: '«Um corpo — membros diversos.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Diversidade', resumo: 'Diversidade de dons — mesmo corpo.', citacao: '«Diversidade — mesmo corpo.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Cooper', resumo: 'Unidade não uniformidade — cooperação.»', citacao: 'Unidade não uniformidade — cooperação.»' },
    ],
  },
  {
    livro: '1co', capitulo: 15, versiculo: 55,
    tema: 'Ó morte, onde está teu aguilhão',
    contexto: 'Vitória sobre a morte — ressurreição.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Ressurreição', resumo: 'A vitória sobre a morte é real.', citacao: '«Morte vencida — ressurreição.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Esperança', resumo: 'A esperança é real — não é ilusão.', citacao: '«Esperança — vitória.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Vida', resumo: 'A vida em Cristo vence a morte.»', citacao: 'A vida em Cristo vence a morte.»' },
    ],
  },
  {
    livro: '2co', capitulo: 4, versiculo: 6,
    tema: 'Luz do conhecimento da glória de Deus',
    contexto: 'Luz divina na escuridão.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Iluminação', resumo: 'Deus ilumina — revela Seu caráter.', citacao: '«Deus ilumina — Seu caráter.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Revelação', resumo: 'A revelação é divina — não humana.', citacao: '«Revelação — divina.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Vida', resumo: 'A vida em Cristo é luz — não trevas.»', citacao: 'A vida em Cristo é luz — não trevas.»' },
    ],
  },
  {
    livro: 'gl', capitulo: 3, versiculo: 13,
    tema: 'Cristo nos resgat da maldição da Lei',
    contexto: 'Cristo é maldição por nós.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Substituição', resumo: 'Cristo é maldição — por nós.', citacao: '«Cristo é maldição — por nós.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Redenção', resumo: 'Redenção pela fé — não pela Lei.', citacao: '«Redenção — fé, não Lei.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Liberdade', resumo: 'Liberdade da Lei — não para pecar, mas viver.»', citacao: 'Liberdade da Lei — não para pecar, mas viver.»' },
    ],
  },
  {
    livro: 'gl', capitulo: 5, versiculo: 1,
    tema: 'Cristo nos libertou para liberdade',
    contexto: 'Liberdade — não para licenciosidade.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Liberdade', resumo: 'Liberdade em Cristo — não para pecar.', citacao: '«Libertou para liberdade — não para pecar.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Responsabilidade', resumo: 'A liberdade é responsabilidade — não licença.', citacao: '«Liberdade é responsabilidade — não licença.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Amor', resumo: 'O amor é cumprimento da Lei.', citacao: '«Amor — cumprimento da Lei.»' },
    ],
  },
  {
    livro: 'ef', capitulo: 1, versiculo: 4,
    tema: 'Ele nos escolheu antes da fundação do mundo',
    contexto: 'Eleição divina — antes da criação.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Eleição', resumo: 'Deus escolhe antes — não por mérito.', citacao: '«Escolhidos antes — não por mérito.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'A graça é anterior — não é conquista.', citacao: '«Graça anterior — não conquista.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Propósito', resumo: 'Deus tem propósito — escolheu para santidade.»', citacao: 'Deus tem propósito — escolheu para santidade.»' },
    ],
  },
  {
    livro: 'ef', capitulo: 2, versiculo: 10,
    tema: 'Criados em boas obras',
    contexto: 'A salvação produz obras — não é o oposto.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Obras', resumo: 'As obras são resultado — não causa.', citacao: '«Obras são resultado — não causa.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Propósito', resumo: 'Deus preparou obras — não para salvar, mas para viver.', citacao: '«Obras preparadas — para viver.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'A fé é prática — não apenas crença.»', citacao: 'A fé é prática — não apenas crença.»' },
    ],
  },
  {
    livro: 'ef', capitulo: 4, versiculo: 11,
    tema: 'Deu dons — apóstolos, profetas, evangelistas',
    contexto: 'Dons para a edificação da Igreja.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Dons', resumo: 'Dons são dados — não conquistados.', citacao: '«Dons dados — para edificar.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Unidade', resumo: 'Dons são para unidade — não para divisão.', citacao: '«Dons — para unidade.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Dons são para servir — não para dominar.»', citacao: 'Dons são para servir — não para dominar.»' },
    ],
  },
  {
    livro: 'fp', capitulo: 2, versiculo: 5,
    tema: 'Tendo a mesma mente de Cristo',
    contexto: 'Cristo se esvaziou — não usou privilégio.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Kenosis', resumo: 'Cristo se esvaziou — humildade suprema.', citacao: '«Esvaziou — humildade suprema.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Serviço', resumo: 'Cristo veio servir — não ser servido.', citacao: '«Servir — não ser servido.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Exemplo', resumo: 'Cristo é exemplo — humildade radical.»', citacao: 'Cristo é exemplo — humildade radical.»' },
    ],
  },
  {
    livro: 'cl', capitulo: 1, versiculo: 16,
    tema: 'Tudo foi criado por Ele e para Ele',
    contexto: 'Cristo é criador e sustentador.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cristologia', resumo: 'Cristo é criador — tudo por Ele.', citacao: '«Tudo criado — por Cristo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Cristo sustenta todas as coisas.', citacao: '«Cristo sustenta — todas as coisas.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Senhorio', resumo: 'Cristo é senhor de tudo — sem exceção.»', citacao: 'Cristo é senhor de tudo — sem exceção.»' },
    ],
  },
  {
    livro: 'cl', capitulo: 2, versiculo: 9,
    tema: 'Toda a plenitude da divindade habita nele',
    contexto: 'Cristo é plenamente Deus.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Deus', resumo: 'Cristo é Deus — plenitude.', citacao: '«Plenitude — Cristo é Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Encarnação', resumo: 'Deus se faz homem — presença plena.', citacao: '«Deus se faz homem — presença plena.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Autoridade', resumo: 'Cristo tem autoridade — sem limite.»', citacao: 'Cristo tem autoridade — sem limite.»' },
    ],
  },
  {
    livro: '1ts', capitulo: 5, versiculo: 17,
    tema: 'Orai sem cessar',
    contexto: 'Oração constante — vida de oração.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Oração', resumo: 'A oração é constante — não apenas momentos.', citacao: '«Oração constante — sempre.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Vida', resumo: 'A vida é oração — não apenas palavras.', citacao: '«Vida é oração — sempre.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'A fé é prática — não teoria.»', citacao: 'A fé é prática — não teoria.»' },
    ],
  },
  {
    livro: '2ts', capitulo: 3, versiculo: 3,
    tema: 'O Senhor é fiel',
    contexto: 'Deus é fiel — protege dos maus.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Fidelidade', resumo: 'Deus é fiel — sempre.', citacao: '«Deus é fiel — sempre.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Proteção', resumo: 'Deus protege — não abandona.', citacao: '«Deus protege — não abandona.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Confiança', resumo: 'A fé confia — Deus é fiel.»', citacao: 'A fé confia — Deus é fiel.»' },
    ],
  },
  {
    livro: '1tm', capitulo: 6, versiculo: 10,
    tema: 'A raiz de todos os males é o amor ao dinheiro',
    contexto: 'Dinheiro é perigoso — não o dinheiro em si.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Avarice', resumo: 'O amor ao dinheiro é raiz — não o dinheiro.', citacao: '«Amor ao dinheiro — raiz do mal.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Desapego', resumo: 'Desapego é necessário — Deus é suficiente.', citacao: '«Desapego — Deus é suficiente.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'A fé é prática — não teoria.»', citacao: 'A fé é prática — não teoria.»' },
    ],
  },
  {
    livro: '2tm', capitulo: 2, versiculo: 15,
    tema: 'Esforça-te por apresentar a Deus aprovado',
    contexto: 'Estudo da Palavra — não esconder.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Estudo', resumo: 'Estudo é dever — não opcional.', citacao: '«Esforça-te — estudo é dever.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Aprovação', resumo: 'Aprovação vem do estudo — não do conhecimento.', citacao: '«Aprovação — estudo.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'A fé é estudo — não ignorância.»', citacao: 'A fé é estudo — não ignorância.»' },
    ],
  },
  {
    livro: 'tt', capitulo: 2, versiculo: 11,
    tema: 'A graça de Deus se manifestou',
    contexto: 'Graça que salva — não apenas ensina.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Graça', resumo: 'A graça é real — transforma.', citacao: '«Graça — transforma.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Salvação', resumo: 'Salvação é por graça — não por obras.', citacao: '«Salvação — graça, não obras.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'A graça se expressa em vida santa.»', citacao: 'A graça se expressa em vida santa.»' },
    ],
  },
  {
    livro: '1pe', capitulo: 1, versiculo: 3,
    tema: 'Deus nos regenerou pela ressurreição',
    contexto: 'Ressurreição — esperança viva.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Ressurreição', resumo: 'A ressurreição é fonte de esperança.', citacao: '«Ressurreição — fonte de esperança.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Nova vida', resumo: 'Em Cristo, somos regenerados — nova vida.', citacao: '«Regenerados — nova vida.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Esperança', resumo: 'A esperança é viva — não é ilusão.»', citacao: 'A esperança é viva — não é ilusão.»' },
    ],
  },
  {
    livro: '1pe', capitulo: 4, versiculo: 10,
    tema: 'Distribuí o dom de graça',
    contexto: 'Dons são para servir — não para orgulho.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Dons', resumo: 'Dons são dados — não conquistados.', citacao: '«Dons dados — não conquistados.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Serviço', resumo: 'Dons são para servir — não para dominar.', citacao: '«Dons — servir, não dominar.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'A fé é prática — não teoria.»', citacao: 'A fé é prática — não teoria.»' },
    ],
  },
  {
    livro: '1jo', capitulo: 3, versiculo: 18,
    tema: 'Não amemos de palavra, mas de obra',
    contexto: 'Amor prático — não apenas palavras.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor', resumo: 'Amor é ação — não apenas palavra.', citacao: '«Amor é ação — não apenas palavra.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Prático', resumo: 'O amor se demonstra em ações.', citacao: '«Amor se demonstra — ações.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'A fé é prática — não teoria.»', citacao: 'A fé é prática — não teoria.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 5, versiculo: 9,
    tema: 'Com teu sangue compraste gente de toda nação',
    contexto: 'Salvação universal — todos os povos.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Salvação', resumo: 'Salvação é para todos — sem exceção.', citacao: '«Salvação — todos os povos.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Sacrifício', resumo: 'Cristo é o Cordeiro — sangue comprado.', citacao: '«Sangue comprado — todos os povos.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Missão', resumo: 'A missão é universal — até o fim.»', citacao: 'A missão é universal — até o fim.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 11, versiculo: 15,
    tema: 'Os reinos do mundo são do Senhor',
    contexto: 'Reino final — Deus reina.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Escatologia', resumo: 'O reino final é de Deus — não dos homens.', citacao: '«Reinos — do Senhor.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Vitória', resumo: 'Deus vence — final é certo.', citacao: '«Deus vence — final certo.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Esperança', resumo: 'A esperança é certa — Deus reinará.»', citacao: 'A esperança é certa — Deus reinará.»' },
    ],
  },

  {
    livro: 'jó', capitulo: 19, versiculo: 25,
    tema: 'Eu sei que o meu Redentor vive',
    contexto: 'Esperança messiânica no sofrimento.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Redentor', resumo: 'Jó vê além da dor — o Redentor.', citacao: '«Redentor vive — esperança eterna.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Ressurreição', resumo: 'Esperança de ver Deus.', citacao: '«Eu o verei — esperança de ver.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Fé', resumo: 'Fé que transcende o sofrimento.', citacao: '«Fé que vai além da dor.»' },
    ],
  },
  {
    livro: 'jó', capitulo: 38, versiculo: 4,
    tema: 'Onde estavas tu quando lancei os aços do mar?',
    contexto: 'Deus revela Seu poder na criação.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Poder divino', resumo: 'Deus é infinitamente maior.', citacao: '«Deus é maior — não podemos compreender.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Criação', resumo: 'A criação testifica do Criador.', citacao: '«Criação — testemunho do poder.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Humildade', resumo: 'Humildade diante do mistério.', citacao: '«Humildade — diante do mistério.»' },
    ],
  },
  {
    livro: 'jó', capitulo: 42, versiculo: 2,
    tema: 'Sei que Tu podes tudo',
    contexto: 'Reconhecimento da onipotência divina.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Onipotência', resumo: 'Deus pode tudo — sem exceção.', citacao: '«Deus pode tudo — sem exceção.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Submissão', resumo: 'Submissão à vontade de Deus.', citacao: '«Submissão — reconhecer Sua vontade.»' },
      { teologo: 'C.S. Lewis', periodo: '1898-1963', tradicao: 'Evangélica', visao: 'Restauração', resumo: 'Deus restaura — devolve o que foi tirado.»', citacao: 'Deus restaura — devolve o que foi tirado.»' },
    ],
  },
  {
    livro: 'jon', capitulo: 1, versiculo: 17,
    tema: 'O grande peixe engoliu Jonas',
    contexto: 'Juízo e misericórdia no mesmo ato.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Juízo', resumo: 'Deus disciplina — mas não destrói.', citacao: '«Peixe engoliu — juízo, mas não destruição.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Misericórdia', resumo: 'Misericórdia no meio do juízo.', citacao: '«Misericórdia — Deus não destrói.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Obediência', resumo: 'Desobediência leva a consequências.', citacao: '«Desobediência — consequências inevitáveis.»' },
    ],
  },
  {
    livro: 'jon', capitulo: 4, versiculo: 11,
    tema: 'Porque eu sabia que Tu és clemente',
    contexto: 'Jonas entende a misericórdia — por isso foge.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Misericórdia', resumo: 'Jonas foge porque sabe que Deus é misericordioso.', citacao: '«Foge porque sabe — misericórdia é certa.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Rebeldia', resumo: 'Rebeldia nasce da compreensão da graça.', citacao: '«Rebeldia — nasce de saber da graça.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Graça', resumo: 'A graça perturba quem quer juízo.»', citacao: 'A graça perturba quem quer juízo.»' },
    ],
  },
  {
    livro: 'mq', capitulo: 5, versiculo: 2,
    tema: 'De ti sairá o governador',
    contexto: 'Profecia messiânica — Belém.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cristologia', resumo: 'Messias nasce em Belém.', citacao: '«De Belém — governador de Israel.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Humildade', resumo: 'Deus usa o pequeno — Belém.', citacao: '«Belém — pequena entre mil.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Promessa', resumo: 'Promessa cumprida em Jesus.»', citacao: 'Promessa cumprida em Jesus.»' },
    ],
  },
  {
    livro: 'mq', capitulo: 6, versiculo: 8,
    tema: 'Ele te declarou, ó homem, o que é bom',
    contexto: 'Resumo da vontade de Deus.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Justiça', resumo: 'Justiça, misericórdia, humildade.', citacao: '«Justiça, misericórdia, andar humildemente.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Simplicidade', resumo: 'A vontade de Deus é simples.', citacao: '«Wants — simples, não complexa.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Fé é prática — não teoria.»', citacao: 'Fé é prática — não teoria.»' },
    ],
  },
  {
    livro: 'hb', capitulo: 2, versiculo: 9,
    tema: 'Deus tudo submeteu sob seus pés',
    contexto: 'Cristo coroado de glória e honra.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Coroação', resumo: 'Cristo é coroado — senhor de tudo.', citacao: '«Coroado — senhor de todas as coisas.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Unidade', resumo: 'Cristo e humanidade — união.', citacao: '«Tudo submetido — Cristo e humanidade.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Senhorio', resumo: 'Cristo é senhor — tudo debaixo de seus pés.»', citacao: 'Cristo é senhor — tudo debaixo de seus pés.»' },
    ],
  },
  {
    livro: 'hb', capitulo: 3, versiculo: 15,
    tema: 'Se hoje ouvirdes a voz dEle',
    contexto: 'Urgência de responder a Deus.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Urgência', resumo: 'Hoje — não amanhã.', citacao: '«Hoje — se ouvirdes.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Hardened', resumo: 'Coração se endurece quando se adia.', citacao: '«Endurecimento — quando se adia.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Obediência', resumo: 'Obediência imediata — não adiamento.»', citacao: 'Obediência imediata — não adiamento.»' },
    ],
  },
  {
    livro: 'hb', capitulo: 6, versiculo: 12,
    tema: 'Não sejais tardios, mas imitadores',
    contexto: 'Perseverança dos que herdam as promessas.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Perseverança', resumo: 'Perseverar até o fim — não desistir.', citacao: '«Perseverar — herdar as promessas.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Imitação', resumo: 'Imitar os que perseveraram.', citacao: '«Imitar — seguir exemplos de fé.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Fé', resumo: 'Fé é perseverança — não desistência.»', citacao: 'Fé é perseverança — não desistência.»' },
    ],
  },
  {
    livro: 'hb', capitulo: 7, versiculo: 25,
    tema: 'Sempre vive para interceder por nós',
    contexto: 'Cristo é sumo sacerdote eterno.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Intercessão', resumo: 'Cristo intercede — sempre.', citacao: '«Intercessão eterna — sempre vivo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eternidade', resumo: 'Sacerdócio eterno — não passa.', citacao: '«Sacerdócio eterno — permanente.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Segurança', resumo: 'Podemos ter certeza — Ele intercede.»', citacao: 'Podemos ter certeza — Ele intercede.»' },
    ],
  },
  {
    livro: 'hb', capitulo: 8, versiculo: 6,
    tema: 'Ministração melhor',
    contexto: 'Aliança nova — superior à antiga.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Aliança', resumo: 'Nova aliança — melhor que a antiga.', citacao: '«Nova aliança — melhor ministração.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Mediação', resumo: 'Cristo é mediador melhor.', citacao: '«Mediador melhor — promessas melhores.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Superioridade', resumo: 'Cristo é superior a Moisés.»', citacao: 'Cristo é superior a Moisés.»' },
    ],
  },
  {
    livro: 'hb', capitulo: 9, versiculo: 27,
    tema: 'Está ordenado aos homens morrerem uma só vez',
    contexto: 'Morte e juízo — realidade escatológica.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Juízo', resumo: 'Após a morte — juízo.', citacao: '«Morta uma vez — depois juízo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Escatologia', resumo: 'A morte é certa — juízo é certo.', citacao: '«Morte certa — juízo certo.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Preparação', resumo: 'Preparar-se para o encontro.»', citacao: 'Preparar-se para o encontro.»' },
    ],
  },
  {
    livro: 'hb', capitulo: 10, versiculo: 24,
    tema: 'Concidir uns aos outros em amor',
    contexto: 'Comunhão e encorajamento mútuo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Comunhão', resumo: 'A fé é vivida em comunidade.', citacao: '«Concidir — encorajar no amor.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Amor', resumo: 'O amor é expresso em ação prática.', citacao: '«Amor — ação prática.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Fé é vivida em comunidade.»', citacao: 'Fé é vivida em comunidade.»' },
    ],
  },
  {
    livro: 'hb', capitulo: 10, versiculo: 36,
    tema: 'Precisais de perseverança',
    contexto: 'Perseverança para receber a promessa.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Perseverança', resumo: 'Perseverança é necessária — não opcional.', citacao: '«Perseverança — para receber a promessa.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Paciência', resumo: 'Paciência é fruto da fé.', citacao: '«Paciência — fruto da fé.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Recompensa', resumo: 'Recompensa vem depois da perseverança.»', citacao: 'Recompensa vem depois da perseverança.»' },
    ],
  },
  {
    livro: 'hb', capitulo: 12, versiculo: 14,
    tema: 'Segui a paz com todos',
    contexto: 'Paz e santidade — caminho estreito.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Paz', resumo: 'Paz com todos — sem exceção.', citacao: '«Paz com todos — sem exceção.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Santidade', resumo: 'Sem santidade — ninguém verá o Senhor.', citacao: '«Santidade — sem ela, ninguém vê.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Disciplina', resumo: 'Disciplina é caminho — não maldição.»', citacao: 'Disciplina é caminho — não maldição.»' },
    ],
  },
  {
    livro: 'hb', capitulo: 13, versiculo: 8,
    tema: 'Jesus Cristo é o mesmo ontem, hoje e sempre',
    contexto: 'Imutabilidade de Cristo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Imutabilidade', resumo: 'Cristo não muda — ontem, hoje, sempre.', citacao: '«Cristo não muda — sempre o mesmo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Confiança', resumo: 'Podemos confiar — Ele é constante.', citacao: '«Confiança — Ele é constante.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Esperança', resumo: 'Esperança firme — Cristo é imutável.»', citacao: 'Esperança firme — Cristo é imutável.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 4, versiculo: 4,
    tema: 'Aquietai-vos e peçai em vosso coração',
    contexto: 'Meditação e oração.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Meditação', resumo: 'Meditação é caminho — não distração.', citacao: '«Meditação — caminho de oração.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Oração', resumo: 'Oração é diálogo — não monólogo.', citacao: '«Oração — diálogo com Deus.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Oração e meditação andam juntas.»', citacao: 'Oração e meditação andam juntas.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 8, versiculo: 4,
    tema: 'O que é o homem para te acordares dele?',
    contexto: 'Dignidade humana na criação.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Dignidade', resumo: 'O homem é coroa da criação.', citacao: '«O que é o homem? — coroa.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Criação', resumo: 'Deus se lembra do homem — interesse.', citacao: '«Deus se lembra — interesse pessoal.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Humildade', resumo: 'A humildade é reconhecer nossa pequenez.»', citacao: 'A humildade é reconhecer nossa pequenez.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 16, versiculo: 11,
    tema: 'Mostrar-me-ás o caminho da vida',
    contexto: 'Plenitude na presença de Deus.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Presença', resumo: 'A presença é plenitude — alegria.', citacao: '«Presença — plenitude de alegria.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Vida', resumo: 'A vida verdadeira é em Deus.', citacao: '«Caminho da vida — em Deus.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Esperança', resumo: 'Deleitas eternas à direita de Deus.»', citacao: 'Deleitas eternas à direita de Deus.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 18, versiculo: 2,
    tema: 'O Senhor é a minha rocha',
    contexto: 'Deus é fortaleza — segurança total.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Fortaleza', resumo: 'Deus é refúgio — segurança total.', citacao: '«Rocha — fortaleza inabalável.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Proteção', resumo: 'Deus protege — escudo e baluarte.', citacao: '«Escudo — proteção completa.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Louvor', resumo: 'Louvor nasce da experiência de salvação.»', citacao: 'Louvor nasce da experiência de salvação.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 19, versiculo: 7,
    tema: 'A lei do Senhor é perfeita',
    contexto: 'A Palavra é completa — não falta nada.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Perfeição', resumo: 'A Lei é perfeita — transforma.', citacao: '«Lei perfeita — converte a alma.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Autoridade', resumo: 'A Palavra tem autoridade — não é sugestão.', citacao: '«Palavra — autoridade suprema.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Fé', resumo: 'A fé se alimenta da Palavra.»', citacao: 'A fé se alimenta da Palavra.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 34, versiculo: 8,
    tema: 'Provai e vede que o Senhor é bom',
    contexto: 'Experiência da bondade divina.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Bondade', resumo: 'Deus é bom — experiência transforma.', citacao: '«Provai — Deus é bom.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Confiança', resumo: 'A fé se fortalece na experiência.', citacao: '«Experiência — fortalece a fé.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Fé é vivida — não apenas pensada.»', citacao: 'Fé é vivida — não apenas pensada.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 37, versiculo: 4,
    tema: 'Deleita-te também no Senhor',
    contexto: 'Alegria em Deus — não em circunstâncias.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Alegria', resumo: 'Alegria em Deus — não nas coisas.', citacao: '«Deleitar-se — alegria em Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Desejos', resumo: 'Deus satisfaz desejos — não o mundo.', citacao: '«Deus satisfaz — desejos do coração.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prioridade', resumo: 'Deus primeiro — tudo o mais se segue.»', citacao: 'Deus primeiro — tudo o mais se segue.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 40, versiculo: 8,
    tema: ' Eis que venho',
    contexto: 'Obediência plena — Cristo cumpre.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cristologia', resumo: 'Cristo diz «Eis que venho» — obediência.', citacao: '«Eis que venho — obediência plena.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Obediência', resumo: 'Obediência é prazer — não fardo.', citacao: '«Obediência — prazer, não fardo.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Missão', resumo: 'Cristo veio para cumprir a vontade do Pai.»', citacao: 'Cristo veio para cumprir a vontade do Pai.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 62, versiculo: 2,
    tema: 'Apenas em Deus a minha alma descansa',
    contexto: 'Descanso em Deus — não em coisas.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Descanso', resumo: 'Descanso é em Deus — não em segurança.', citacao: '«Descanso — apenas em Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Confiança', resumo: 'Confiança absoluta — sem reserva.', citacao: '«Apenas em Deus — confiança absoluta.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Fé é descansar — não correr.»', citacao: 'Fé é descansar — não correr.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 84, versiculo: 10,
    tema: 'Um dia nas tuas áreas melhor que mil',
    contexto: 'Valor da presença de Deus.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Presença', resumo: 'Um dia com Deus vale mais que mil.', citacao: '«Um dia — melhor que mil.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Prioridade', resumo: 'A presença é prioridade — não luxo.', citacao: '«Presença — prioridade.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Desejo', resumo: 'Desejar a presença de Deus — fome espiritual.»', citacao: 'Desejar a presença de Deus — fome espiritual.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 90, versiculo: 1,
    tema: 'Senhor, tu tens sido o nosso refúgio',
    contexto: 'Deus é refúgio de geração em geração.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Refúgio', resumo: 'Deus é refúgio — sempre.', citacao: '«Refúgio — de geração em geração.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eternidade', resumo: 'Deus é eterno — antes das montanhas.', citacao: '«Deus é eterno — antes de tudo.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Perspectiva', resumo: 'Vida humana é passageira — Deus é eterno.»', citacao: 'Vida humana é passageira — Deus é eterno.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 95, versiculo: 7,
    tema: 'Hoje, se ouvirdes a voz dEle',
    contexto: 'Urgência de responder.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Urgência', resumo: 'Hoje — não adie.', citacao: '«Hoje — se ouvirdes.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Endurecimento', resumo: 'Coração se endurece com atraso.', citacao: '«Endurecimento — quando se adia.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Obediência', resumo: 'Obediência imediata — não postergação.»', citacao: 'Obediência imediata — não postergação.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 107, versiculo: 1,
    tema: 'Louvai ao Senhor porque Ele é bom',
    contexto: 'Louvor é resposta à bondade.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Louvor', resumo: 'Louvor é resposta — não obrigação.', citacao: '«Louvai — porque Ele é bom.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Bondade', resumo: 'Bondade é eterna — não temporal.', citacao: '«Bondade eterna — sempre.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Gratidão', resumo: 'Gratidão é expressão de fé.»', citacao: 'Gratidão é expressão de fé.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 119, versiculo: 89,
    tema: 'Para sempre, ó Senhor, está firme a tua palavra',
    contexto: 'Palavra eterna — não passa.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Eternidade', resumo: 'A Palavra é eterna — não passa.', citacao: '«Palavra firme — para sempre.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Constância', resumo: 'A Palavra é constante — não muda.', citacao: '«Palavra constante — sempre firme.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Confiança', resumo: 'A fé se baseia na Palavra eterna.»', citacao: 'A fé se baseia na Palavra eterna.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 121, versiculo: 1,
    tema: 'Ergo os meus olhos para os montes',
    contexto: 'Deus é nosso socorro — não os montes.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Socorro', resumo: 'Socorro vem do Senhor — não da criação.', citacao: '«Socorro — do Criador, não da criação.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Guarda', resumo: 'Deus guarda — não dorme.', citacao: '«Deus guarda — não dorme nem cochila.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Confiança', resumo: 'Confiança total — Deus cuida.»', citacao: 'Confiança total — Deus cuida.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 126, versiculo: 5,
    tema: 'Os que semeiam em lágrimas colherão com júbilo',
    contexto: 'Sofrimento frutifica.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Colheita', resumo: 'O que é plantado em lágrimas floresce.', citacao: '«Lágrimas — colheita de júbilo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Esperança', resumo: 'A esperança é certa — lágrimas viram alegria.', citacao: '«Lágrimas — viram júbilo.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Ciclo', resumo: 'Sofrimento precede a glória.»', citacao: 'Sofrimento precede a glória.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 139, versiculo: 14,
    tema: 'Eu te louvarei, porque de um modo assombroso fui feito',
    contexto: 'Criação maravilhosa — dignidade.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Criação', resumo: 'Cada pessoa é obra-prima de Deus.', citacao: '«Assombroso — criação divina.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Dignidade', resumo: 'Dignidade não depende de performance.', citacao: '«Dignidade — obra de Deus.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Louvor', resumo: 'Louvor nasce do reconhecimento.»', citacao: 'Louvor nasce do reconhecimento.»' },
    ],
  },
  {
    livro: 'sl', capitulo: 145, versiculo: 3,
    tema: 'Grande é o Senhor e mui digno de louvor',
    contexto: 'Grandeza de Deus — louvor.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Grandeza', resumo: 'Deus é grande — sem limites.', citacao: '«Grande — sem limites.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Louvor', resumo: 'Louvor é resposta à grandeza.', citacao: '«Louvor — resposta à grandeza.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Adoração', resumo: 'Adoração é reconhecer Sua grandeza.»', citacao: 'Adoração é reconhecer Sua grandeza.»' },
    ],
  },
  {
    livro: 'pv', capitulo: 2, versiculo: 6,
    tema: 'Porque o Senhor dá a sabedoria',
    contexto: 'Sabedoria é dom divino.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Dom', resumo: 'Sabedoria vem de Deus — não do homem.', citacao: '«Deus dá — sabedoria é dom.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'Graça divina capacita ao bom juízo.', citacao: '«Deus dá — graça para discernir.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Humildade', resumo: 'Reconhecer que sabedoria vem de Deus.»', citacao: 'Reconhecer que sabedoria vem de Deus.»' },
    ],
  },
  {
    livro: 'pv', capitulo: 11, versiculo: 25,
    tema: 'A alma bondosa será saciada',
    contexto: 'Generosidade frutifica.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Generosidade', resumo: 'Generosidade é satisfeita — não empobrecida.', citacao: '«Alma bondosa — será saciada.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Retribuição', resumo: 'Deus recompensa generosidade.', citacao: '«Deus recompensa — generosidade.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Generosidade é prática — não teoria.»', citacao: 'Generosidade é prática — não teoria.»' },
    ],
  },
  {
    livro: 'pv', capitulo: 15, versiculo: 1,
    tema: 'A resposta branda desvia o furor',
    contexto: 'Brandura vence a ira.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Brandura', resumo: 'Brandura é força — não fraqueza.', citacao: '«Resposta branda — desvia fúria.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Controle', resumo: 'Controle de reação — maturidade.', citacao: '«Brandura — controle do temperamento.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Respostas brandas — prática diária.»', citacao: 'Respostas brandas — prática diária.»' },
    ],
  },
  {
    livro: 'pv', capitulo: 17, versiculo: 17,
    tema: 'Em todo tempo ama o amigo',
    contexto: 'Amizade é constante — não oportunista.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Constância', resumo: 'Amor verdadeiro é constante.', citacao: '«Amizade — todo tempo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Lealdade', resumo: 'Lealdade em provação — não só na prosperidade.', citacao: '«Lealdade — na provação.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Comunhão', resumo: 'Amizade é comunhão — não transação.»', citacao: 'Amizade é comunhão — não transação.»' },
    ],
  },
  {
    livro: 'pv', capitulo: 18, versiculo: 10,
    tema: 'O nome do Senhor é uma torre forte',
    contexto: 'Deus é fortaleza — segurança no nome.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Nome', resumo: 'O nome de Deus é refugio seguro.', citacao: '«Nome — torre forte.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Proteção', resumo: 'O justo corre e está seguro.', citacao: '«Justo — corre e está seguro.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Confiança', resumo: 'Confiança no nome — não em forças.»', citacao: 'Confiança no nome — não em forças.»' },
    ],
  },
  {
    livro: 'pv', capitulo: 19, versiculo: 21,
    tema: 'Muitos pensamentos no coração do homem, mas só o conselho do Senhor se efetiva',
    contexto: 'Soberania nos planos.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Soberania', resumo: 'Planos humanos — mas Deus decide.', citacao: '«Muitos planos — Deus executa.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Humildade', resumo: 'Planejar com humildade — não arrogância.', citacao: '«Planejar — mas submeter a Deus.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Planos submetidos à vontade divina.»', citacao: 'Planos submetidos à vontade divina.»' },
    ],
  },
  {
    livro: 'pv', capitulo: 20, versiculo: 27,
    tema: 'O espírito do homem é a candelabro do Senhor',
    contexto: 'Espírito ilumina — Deus vê.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Espírito', resumo: 'O espírito é lâmpada — Deus vê tudo.', citacao: '«Espírito — candelabro de Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Transparência', resumo: 'Deus vê o interior — não podemos esconder.', citacao: '«Deus vê — transparência total.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Intimidade', resumo: 'Intimidade com Deus — viver diante Dele.»', citacao: 'Intimidade com Deus — viver diante Dele.»' },
    ],
  },
  {
    livro: 'pv', capitulo: 21, versiculo: 31,
    tema: 'O cavalo se acautela para o dia da batalha, mas o Senhor dá a vitória',
    contexto: 'Vitória vem do Senhor.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Vitória', resumo: 'Preparação humana — vitória divina.', citacao: '«Cavalo se prepara — Deus dá vitória.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Dependência', resumo: 'Dependência de Deus — não de estratégia.', citacao: '«Dependência — vitória é do Senhor.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Preparar-se — mas confiar em Deus.»', citacao: 'Preparar-se — mas confiar em Deus.»' },
    ],
  },
  {
    livro: 'gn', capitulo: 1, versiculo: 27,
    tema: 'Criou Deus o homem à sua imagem',
    contexto: 'Imago Dei — dignidade humana.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Imagem', resumo: 'O homem carrega a imagem de Deus.', citacao: '«Imagem de Deus — dignidade suprema.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Dignidade', resumo: 'Dignidade não é conquista — é dádiva.', citacao: '«Dignidade — dádiva divina.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Relacional', resumo: 'Imagem é relacional — Deus comunica.', citacao: '«Imagem — relacionamento.»' },
    ],
  },
  {
    livro: 'gn', capitulo: 2, versiculo: 18,
    tema: 'Não é bom que o homem esteja só',
    contexto: 'Comunhão — Deus estabelece companhia.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Companhia', resumo: 'Solidão não é boa — Deus prove companhia.', citacao: '«Não é bom — Deus provê.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Relação', resumo: 'A relação é necessária — não opcional.', citacao: '«Relação — necessidade humana.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Complementar', resumo: 'A mulher complementa — igualdade.»', citacao: 'A mulher complementa — igualdade.»' },
    ],
  },
  {
    livro: 'gn', capitulo: 6, versiculo: 8,
    tema: 'Noé achou graça aos olhos do Senhor',
    contexto: 'Graça antes do juízo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Graça', resumo: 'Graça precede juízo — Noé achou graça.', citacao: '«Achou graça — antes do dilúvio.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eleição', resumo: 'Deus escolheu um — para salvar.', citacao: '«Deus escolhe — para preservar.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Fé', resumo: 'Fé de Noé — obedeceu sem ver.»', citacao: 'Fé de Noé — obedeceu sem ver.»' },
    ],
  },
  {
    livro: 'gn', capitulo: 9, versiculo: 13,
    tema: 'Pus o arco-íris no céu',
    contexto: 'Aliança visual — sinal da promessa.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Aliança', resumo: 'Arco-íris é sinal — Deus não destruirá.', citacao: '«Arco-íris — sinal de aliança.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Memória', resumo: 'Arco-íris é lembrete — Deus cumpre.', citacao: '«Lembrete — Deus cumpre.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Beleza', resumo: 'Aliança é bela — não apenas séria.»', citacao: 'Aliança é bela — não apenas séria.»' },
    ],
  },
  {
    livro: 'gn', capitulo: 17, versiculo: 7,
    tema: 'E estabelecerei a minha aliança entre mim e ti',
    contexto: 'Aliança abraômica — eterna.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Aliança', resumo: 'Aliança é de Deus — não depende de nós.', citacao: '«Aliança — Deus estabelece.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eternidade', resumo: 'Aliança é eterna — não temporal.', citacao: '«Eterna — não termina.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Promessa', resumo: 'Promessa cumprida em Cristo.»', citacao: 'Promessa cumprida em Cristo.»' },
    ],
  },
  {
    livro: 'gn', capitulo: 25, versiculo: 34,
    tema: 'Vendeu o direito de primogenitura',
    contexto: 'Esau despreza o sagrado.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Desprezo', resumo: 'Desprezar o sagrado tem consequências.', citacao: '«Vendeu — desprezou o sagrado.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Prioridade', resumo: 'Prioridades erradas levam a perdas.', citacao: '«Prioridade — Esau errou.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Aviso', resumo: 'Aviso sobre consequências de escolhas.»', citacao: 'Aviso sobre consequências de escolhas.»' },
    ],
  },
  {
    livro: 'gn', capitulo: 32, versiculo: 28,
    tema: 'Não te chamarás mais Jacó, mas Israel',
    contexto: 'Transformação — de enganador a príncipe.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Transformação', resumo: 'Deus transforma identidade.', citacao: '«Israel — príncipe com Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Nome', resumo: 'Nome é identidade — Deus renomeia.', citacao: '«Nome novo — nova identidade.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Graça', resumo: 'Graça transforma — não ignora o passado.»', citacao: 'Graça transforma — não ignora o passado.»' },
    ],
  },
  {
    livro: 'ex', capitulo: 3, versiculo: 8,
    tema: 'Desci para livrá-los da mão dos egípcios',
    contexto: 'Deus vê e age — misericórdia ativa.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Misericórdia', resumo: 'Deus vê o sofrimento — e age.', citacao: '«Deus vê — livra.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Libertação', resumo: 'Libertação é promessa — Deus cumpre.', citacao: '«Deus livra — sempre.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'História', resumo: 'Deus age na história — não é distante.»', citacao: 'Deus age na história — não é distante.»' },
    ],
  },
  {
    livro: 'ex', capitulo: 15, versiculo: 2,
    tema: 'O Senhor é a minha força e o meu cântico',
    contexto: 'Louvor após o livramento.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Louvor', resumo: 'Louvor nasce da experiência de salvação.', citacao: '«Cântico — louvor pós-livramento.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Vitória', resumo: 'Vitória é do Senhor — não do homem.', citacao: '«Vitória — do Senhor.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Alegria', resumo: 'Alegria na libertação — louvor espontâneo.»', citacao: 'Alegria na libertação — louvor espontâneo.»' },
    ],
  },
  {
    livro: 'ex', capitulo: 19, versiculo: 5,
    tema: 'Sereis para mim um reino de sacerdotes',
    contexto: 'Povo sacerdotal — identidade de Israel.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Sacerdócio', resumo: 'Israel é povo sacerdotal — todos são sacerdotes.', citacao: '«Reino de sacerdotes — identidade.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Aliança', resumo: 'Aliança é identidade — não apenas regras.', citacao: '«Aliança — identidade.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Missão', resumo: 'Israel é luz — para as nações.»', citacao: 'Israel é luz — para as nações.»' },
    ],
  },
  {
    livro: 'ex', capitulo: 33, versiculo: 14,
    tema: 'A minha presença irá contigo',
    contexto: 'Promessa de presença — o mais importante.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Presença', resumo: 'Presença é a maior promessa.', citacao: '«Minha presença — maior promessa.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Companhia', resumo: 'Deus caminha conosco — não nos abandona.', citacao: '«Presença — companhia divina.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Confiança', resumo: 'Podemos ir — Deus vai conosco.»', citacao: 'Podemos ir — Deus vai conosco.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 5, versiculo: 16,
    tema: 'Assim brilhe a luz diante dos homens',
    contexto: 'Testemunho visível — boas obras.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Testemunho', resumo: 'Luz é visível — boas obras.', citacao: '«Brilhar — boas obras visíveis.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Glorificação', resumo: 'Boas obras glorificam a Deus.', citacao: '«Glorificam — Pai nos céus.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Fé é visível — não escondida.»', citacao: 'Fé é visível — não escondida.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 5, versiculo: 48,
    tema: 'Sede perfeitos como o vosso Pai celestial é perfeito',
    contexto: 'Perfeição divina como modelo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Perfeição', resumo: 'Perfeição é meta — não desculpa.', citacao: '«Perfeitos — como o Pai.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Santidade', resumo: 'Santidade é meta — não perfeccionismo.', citacao: '«Santidade — caminho.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Modelo', resumo: 'Deus é modelo — não utopia.»', citacao: 'Deus é modelo — não utopia.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 7, versiculo: 7,
    tema: 'Pedi e vos será dado',
    contexto: 'Oração é promessa — não esforço vazio.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Oração', resumo: 'Oração é promessa — Deus ouve.', citacao: '«Pedireis — e será dado.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Confiança', resumo: 'Confiança na resposta — não duvida.', citacao: '«Confiança — Deus responde.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Oração é prática — não teoria.»', citacao: 'Oração é prática — não teoria.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 10, versiculo: 42,
    tema: 'Quem der de beber um copo de água fria',
    contexto: 'Pequenos atos têm valor eterno.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Serviço', resumo: 'Pequenos atos — valor eterno.', citacao: '«Copo de água — recompensa eterna.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Amor', resumo: 'Amor se demonstra em detalhes.', citacao: '«Amor — nos detalhes.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Serviço é prática — não palavras.»', citacao: 'Serviço é prática — não palavras.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 13, versiculo: 44,
    tema: 'O reino dos céus é como um tesouro escondido',
    contexto: 'Valor do reino — tudo pela sua causa.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Valor', resumo: 'O reino vale mais que tudo.', citacao: '«Tesouro — vende tudo por ele.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Dedicação', resumo: 'Dedicação total — não parcial.', citacao: '«Dedicação — tudo pelo reino.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Alegria', resumo: 'Alegria ao encontrar o reino.»', citacao: 'Alegria ao encontrar o reino.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 18, versiculo: 3,
    tema: 'Se não vos converterdes e vos fizerdes como as crianças',
    contexto: 'Humildade como modelo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Humildade', resumo: 'Criança é modelo — humildade.', citacao: '«Converter — como crianças.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Simplicidade', resumo: 'Fé simples — não complexa.', citacao: '«Simplicidade — fé de criança.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Modelo', resumo: 'Criança é modelo — não obstáculo.»', citacao: 'Criança é modelo — não obstáculo.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 20, versiculo: 28,
    tema: 'O Filho do Homem veio para servir',
    contexto: 'Cristo veio servir — não ser servido.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Serviço', resumo: 'Cristo veio servir — paradigma.', citacao: '«Servir — não ser servido.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Resgate', resumo: 'Serviço é resgate — dar vida.', citacao: '«Resgate — dar vida por muitos.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Exemplo', resumo: 'Cristo é exemplo — servir sempre.»', citacao: 'Cristo é exemplo — servir sempre.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 24, versiculo: 13,
    tema: 'Quem perseverar até o fim será salvo',
    contexto: 'Perseverança é necessária.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Perseverança', resumo: 'Perseverar até o fim — sem desistir.', citacao: '«Até o fim — perseverar.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Fé', resumo: 'Fé verdadeira persevera — não desiste.', citacao: '«Fé — persevera.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Promessa', resumo: 'Salvação é para quem persevera.»', citacao: 'Salvação é para quem persevera.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 25, versiculo: 21,
    tema: 'Bom servo e fiel',
    contexto: 'Fé aplicada — fidelidade.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Fidelidade', resumo: 'Ser fiel no pouco — Deus confia mais.', citacao: '«Bom servo — fiel no pouco.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Responsabilidade', resumo: 'Responsabilidade é proporcional à graça.', citacao: '«Responsabilidade — fiel no pouco.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Recompensa', resumo: 'Recompensa vem da fidelidade.»', citacao: 'Recompensa vem da fidelidade.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 26, versiculo: 41,
    tema: 'Vigiai e orai para que não entreis em tentação',
    contexto: 'Alerta espiritual — oração.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Vigilância', resumo: 'Vigilância é necessária — tentação é real.', citacao: '«Vigiai — orai.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Tentação', resumo: 'Tentação é real — não subestimar.', citacao: '«Tentação — real, não ignorar.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Oração é armada contra tentação.»', citacao: 'Oração é armada contra tentação.»' },
    ],
  },
  {
    livro: 'mt', capitulo: 28, versiculo: 20,
    tema: 'E eis que estou convosco todos os dias',
    contexto: 'Promessa de presença — até a consumação.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Presença', resumo: 'Presença é promessa — até o fim.', citacao: '«Convosco — todos os dias.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Companhia', resumo: 'Deus caminha — não abandona.', citacao: '«Convosco — sempre.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Segurança', resumo: 'Segurança total — Deus está conosco.»', citacao: 'Segurança total — Deus está conosco.»' },
    ],
  },
  {
    livro: 'mc', capitulo: 1, versiculo: 17,
    tema: 'Vinde depois de mim',
    contexto: 'Chamada à discipulado — seguir.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Chamada', resumo: 'Chamada é pessoal — seguir.', citacao: '«Vinde — seguir.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Discipulado', resumo: 'Discipulado é seguir — não apenas crer.', citacao: '«Seguir — discipulado.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Imitação', resumo: 'Imitar Cristo — viver como Ele.»', citacao: 'Imitar Cristo — viver como Ele.»' },
    ],
  },
  {
    livro: 'mc', capitulo: 9, versiculo: 24,
    tema: 'Crede; ajuda-me na minha incredulidade',
    contexto: 'Fé que admite dúvidas — honestidade.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Honestidade', resumo: 'Fé honesta — admitir dúvidas.', citacao: '«Crede — ajuda-me.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Dúvida', resumo: 'Dúvida não é pecado — é oportunidade.', citacao: '«Dúvida — honestidade.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Oração', resumo: 'Oração sincera — Deus responde.»', citacao: 'Oração sincera — Deus responde.»' },
    ],
  },
  {
    livro: 'mc', capitulo: 10, versiculo: 14,
    tema: 'Deixai vir a mim as criancinhas',
    contexto: 'Deus acolhe os humildes.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Acolhimento', resumo: 'Deus acolhe — não rejeita.', citacao: '«Deixai vir — acolhimento.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Humildade', resumo: 'Humildade é condição — não obstáculo.', citacao: '«Humildade — condição.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Abertura', resumo: 'Abertura para os pequenos.»', citacao: 'Abertura para os pequenos.»' },
    ],
  },
  {
    livro: 'mc', capitulo: 12, versiculo: 30,
    tema: 'Amarás o Senhor teu Deus de todo o teu coração',
    contexto: 'Amor total — mandamento supremo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor', resumo: 'Amor total — sem reserva.', citacao: '«Todo o coração — sem reserva.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Prioridade', resumo: 'Amor a Deus primeiro — sempre.', citacao: '«Prioridade — Deus primeiro.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Amor é prática — não sentimento.»', citacao: 'Amor é prática — não sentimento.»' },
    ],
  },
  {
    livro: 'mc', capitulo: 14, versiculo: 38,
    tema: 'Vigiai e orai para que não entreis em tentação',
    contexto: 'Alerta e oração — guerra espiritual.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Vigilância', resumo: 'Vigilância é necessária — sempre.', citacao: '«Vigiai — orai.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Tentação', resumo: 'Tentação é real — não subestimar.', citacao: '«Tentação — real, combater.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Oração é armada — usar.»', citacao: 'Oração é armada — usar.»' },
    ],
  },
  {
    livro: 'lc', capitulo: 1, versiculo: 46,
    tema: 'A minha alma engrandece ao Senhor',
    contexto: 'Magnificat — louvor de Maria.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Louvor', resumo: 'Louvor nasce da experiência de graça.', citacao: '«Alma engrandece — louvor.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Humildade', resumo: 'Deus olha para os humildes.', citacao: '«Olha para a humildade — ergue os baixos.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Revolução', resumo: 'Deus inverte valores — reino ao contrário.»', citacao: 'Deus inverte valores — reino ao contrário.»' },
    ],
  },
  {
    livro: 'lc', capitulo: 2, versiculo: 19,
    tema: 'Maria guardava todas essas coisas, meditando nelas',
    contexto: 'Meditação — guardando no coração.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Meditação', resumo: 'Meditação é guardar — não apenas ler.', citacao: '«Meditava — guardava no coração.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Recepção', resumo: 'Receber a Palavra — não apenas ouvir.', citacao: '«Guardava — recebia profundamente.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Fé', resumo: 'Fé é meditação — não superficialidade.»', citacao: 'Fé é meditação — não superficialidade.»' },
    ],
  },
  {
    livro: 'lc', capitulo: 6, versiculo: 27,
    tema: 'Amai a vossos inimigos, fazei bem aos que vos odeiam',
    contexto: 'Amor radical — inimigos.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor radical', resumo: 'Amar inimigos — sem exceção.', citacao: '«Amai — inimigos.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'Graça vai além — ama quem odeia.', citacao: '«Graça — ama quem odeia.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Difficuldade', resumo: 'O mais difícil — mas necessário.»', citacao: 'O mais difícil — mas necessário.»' },
    ],
  },
  {
    livro: 'lc', capitulo: 9, versiculo: 23,
    tema: 'Se alguém quer vir após mim, negue-se a si mesmo',
    contexto: 'Cruz diária — discipulado.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Negação', resumo: 'Negar a si mesmo — todos os dias.', citacao: '«Negue — diariamente.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Cruz', resumo: 'Cruz é vida — não momento.', citacao: '«Cruz — vida, não evento.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Seguimento', resumo: 'Seguir Cristo é caminho diário.»', citacao: 'Seguir Cristo é caminho diário.»' },
    ],
  },
  {
    livro: 'lc', capitulo: 11, versiculo: 9,
    tema: 'Pedi e vos será dado; buscai e achareis',
    contexto: 'Oração é promessa — buscar.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Oração', resumo: 'Oração é busca ativa.', citacao: '«Pedir — buscar — bater.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Perseverança', resumo: 'Perseverar na oração — não desistir.', citacao: '«Perseverança — orar sempre.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Confiança', resumo: 'Deus responde — confiança certa.»', citacao: 'Deus responde — confiança certa.»' },
    ],
  },
  {
    livro: 'lc', capitulo: 12, versiculo: 34,
    tema: 'Onde estiver o teu tesouro, aí estará também o teu coração',
    contexto: 'Prioridades reveladas por tesouro.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Tesouro', resumo: 'Onde está o tesouro — ali o coração.', citacao: '«Tesouro — revela prioridades.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Prioridade', resumo: 'Prioridade é revelada — não declarada.', citacao: '«Revelada — não declarada.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Transparência', resumo: 'Deus vê o coração — não apenas obras.»', citacao: 'Deus vê o coração — não apenas obras.»' },
    ],
  },
  {
    livro: 'lc', capitulo: 15, versiculo: 7,
    tema: 'Haverá mais alegria no céu por um pecador que se arrepende',
    contexto: 'Arrependimento é celebrado no céu.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Arrependimento', resumo: 'Arrependimento é celebrado — não apenas perdoado.', citacao: '«Mais alegria — arrependimento.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Celebração', resumo: 'O céu celebra conversões.', citacao: '«Céu celebra — arrependimento.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Valor', resumo: 'Cada pessoa tem valor eterno.»', citacao: 'Cada pessoa tem valor eterno.»' },
    ],
  },
  {
    livro: 'lc', capitulo: 16, versiculo: 10,
    tema: 'Quem é fiel no pouco é fiel também no muito',
    contexto: 'Fidelidade é proporcional.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Fidelidade', resumo: 'Fidelidade no pouco — confiança no muito.', citacao: '«Fiel no pouco — fiel no muito.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Responsabilidade', resumo: 'Responsabilidade é gradual.', citacao: '«Pouco — muito.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Integralidade', resumo: 'Fé é uma — não dividida.»', citacao: 'Fé é uma — não dividida.»' },
    ],
  },
  {
    livro: 'lc', capitulo: 18, versiculo: 1,
    tema: 'Deve-se orar sempre e não desistir',
    contexto: 'Perseverança na oração.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Oração', resumo: 'Orar sempre — não desistir.', citacao: '«Sempre — não desistir.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Perseverança', resumo: 'Perseverança é essencial.', citacao: '«Perseverança — orar sem desistir.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Promessa', resumo: 'Deus ouve — mesmo quando parece não.»', citacao: 'Deus ouve — mesmo quando parece não.»' },
    ],
  },
  {
    livro: 'lc', capitulo: 19, versiculo: 10,
    tema: 'O Filho do Homem veio buscar e salvar o que estava perdido',
    contexto: 'Missão de Jesus — busca e salvação.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Missão', resumo: 'Jesus veio buscar — não esperar.', citacao: '«Veio buscar — não esperar.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Salvação', resumo: 'Salvação é buscar — não apenas oferecer.', citacao: '«Buscar — salvar — missão.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prioridade', resumo: 'O perdido é prioridade de Deus.»', citacao: 'O perdido é prioridade de Deus.»' },
    ],
  },
  {
    livro: 'lc', capitulo: 22, versiculo: 42,
    tema: 'Se possível, afasta de mim este cálice — mas não a minha vontade',
    contexto: 'Agonia no Getsêmani — submissão.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Submissão', resumo: 'Submissão total — não a minha.', citacao: '«Não a minha — mas a tua.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Oração', resumo: 'Oração honesta — admitir dor.', citacao: '«Cálice — honestidade na dor.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Exemplo', resumo: 'Cristo é exemplo — submissão total.»', citacao: 'Cristo é exemplo — submissão total.»' },
    ],
  },
  {
    livro: 'lc', capitulo: 24, versiculo: 32,
    tema: 'Não ardia o nosso coração?',
    contexto: 'Pós-ressurreição — corações ardentos.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Experiência', resumo: 'Fé é experiência — não apenas doutrina.', citacao: '«Ardeu — experiência.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Reconhecimento', resumo: 'Reconhecer Cristo na Palavra.', citacao: '«Reconhecer — na Palavra.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Transformação', resumo: 'Fé transforma — corações ardem.»', citacao: 'Fé transforma — corações ardem.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 1, versiculo: 47,
    tema: 'Eis um verdadeiro israelita',
    contexto: 'Transparência — Deus vê o coração.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Transparência', resumo: 'Deus vê — não podemos esconder.', citacao: '«Verdadeiro — Deus vê.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eleição', resumo: 'Deus escolhe — conhecendo.', citacao: '«Deus escolhe — desde o início.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Honestidade', resumo: 'Fé é honestidade — não máscara.»', citacao: 'Fé é honestidade — não máscara.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 3, versiculo: 30,
    tema: 'É necessário que Ele cresça, mas que eu diminua',
    contexto: 'Cristo aumenta, homem diminui.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Humildade', resumo: 'Cristo cresce — eu diminuo.', citacao: '«Cresça — diminua.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Prioridade', resumo: 'Cristo é prioridade — não eu.', citacao: '«Cristo primeiro — eu depois.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Decaimento', resumo: 'O batista é exemplo — apontar para Cristo.»', citacao: 'O batista é exemplo — apontar para Cristo.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 4, versiculo: 14,
    tema: 'Quem beber da água que eu lhe der não terá sede',
    contexto: 'Satisfação em Cristo — não no mundo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Satisfação', resumo: 'Cristo satisfaz — o mundo não.', citacao: '«Água viva — sede eterna.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Vida', resumo: 'Vida eterna começa agora — não só no céu.', citacao: '«Água — vida eterna agora.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Oferta', resumo: 'Deus oferece — não força.»', citacao: 'Deus oferece — não força.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 5, versiculo: 24,
    tema: 'Quem ouve a minha palavra e crê no que me enviou tem a vida eterna',
    contexto: 'Fé traz vida eterna.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Fé', resumo: 'Ouvi + Crer = Vida eterna.', citacao: '«Ouvir — crer — vida.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eternidade', resumo: 'Vida eterna começa agora — não depois.', citacao: '«Agora — vida eterna.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Presente', resumo: 'Salvação é presente — não apenas futuro.»', citacao: 'Salvação é presente — não apenas futuro.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 7, versiculo: 38,
    tema: 'De seu ventre correrão rios de água viva',
    contexto: 'Espírito derrama vida.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Espírito', resumo: 'Espírito é fonte — rios de vida.', citacao: '«Rios — vida abundante.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Interior', resumo: 'A fonte é interior — não externa.', citacao: '«Interior — não externo.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Abundância', resumo: 'Vida abundante — não escassa.»', citacao: 'Vida abundante — não escassa.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 9, versiculo: 25,
    tema: 'Uma coisa eu sei: que era cego e agora vejo',
    contexto: 'Transformação é real — experiência.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Transformação', resumo: 'Transformação é real — não é ilusão.', citacao: '«Cego — agora vejo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Experiência', resumo: 'Experiência é testemunho — não teoria.', citacao: '«Experiência — testemunho.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Simplicidade', resumo: 'Fé é simples — não precisa de explicações complexas.»', citacao: 'Fé é simples — não precisa de explicações complexas.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 12, versiculo: 32,
    tema: 'Se eu for levantado da terra, atrarei todos a mim',
    contexto: 'Atração da cruz — universal.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cruz', resumo: 'Cruz atrai — não repele.', citacao: '«Levantado — atraio todos.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Missão', resumo: 'Missão é universal — todos os povos.', citacao: '«Todos — universal.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Universalidade', resumo: 'Cristo é para todos — sem exceção.»', citacao: 'Cristo é para todos — sem exceção.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 13, versiculo: 34,
    tema: 'Um novo mandamento vos dou: que vos ameis uns aos outros',
    contexto: 'Amor fraternal — novo mandamento.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor', resumo: 'Novo mandamento — amor fraterno.', citacao: '«Amai-vos — novo mandamento.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Comunidade', resumo: 'Amor é comunitário — não individual.', citacao: '«Uns aos outros — comunitário.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Testemunho', resumo: 'Amor é testemunho — ao mundo.»', citacao: 'Amor é testemunho — ao mundo.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 15, versiculo: 11,
    tema: 'Estas coisas vos disse para que a minha alegria esteja em vós',
    contexto: 'Alegria de Cristo — nos crentes.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Alegria', resumo: 'Alegria é de Cristo — não circunstancial.', citacao: '«Minha alegria — em vós.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Completa', resumo: 'Alegria completa — não parcial.', citacao: '«Completa — não parcial.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Promessa', resumo: 'Promessa de alegria — para todos.»', citacao: 'Promessa de alegria — para todos.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 17, versiculo: 3,
    tema: 'E esta é a vida eterna: que te conheçam',
    contexto: 'Conhecimento de Deus é vida eterna.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Conhecimento', resumo: 'Conhecimento é vida — não informação.', citacao: '«Conhecer — vida eterna.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Relação', resumo: 'Vida eterna é relação — não apenas doutrina.', citacao: '«Relação — não apenas saber.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Presente', resumo: 'Vida eterna começa agora — não depois.»', citacao: 'Vida eterna começa agora — não depois.»' },
    ],
  },
  {
    livro: 'jo', capitulo: 20, versiculo: 29,
    tema: 'Porque me viste, creste; benditos são os que não viram e creram',
    contexto: 'Fé sem ver — bênção suprema.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Fé', resumo: 'Fé sem ver — bênção suprema.', citacao: '«Viram — creram. Não viram — benditos.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'Graça é para todos — videntes e cegos.', citacao: '«Benditos — os que não viram.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Modelo', resumo: 'Nós somos o modelo — fé sem ver.»', citacao: 'Nós somos o modelo — fé sem ver.»' },
    ],
  },
  {
    livro: 'at', capitulo: 4, versiculo: 31,
    tema: 'O lugar onde estavam reunidos tremeu; foram todos cheios do Espírito Santo',
    contexto: 'Manifestação do Espírito — coragem.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Espírito', resumo: 'Espírito se manifesta — poder.', citacao: '«Reunião tremeu — poder do Espírito.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Coragem', resumo: 'Espírito dá coragem — não medo.', citacao: '«Cheios — coragem.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Comunhão', resumo: 'Comunhão é prenúncio do reino.»', citacao: 'Comunhão é prenúncio do reino.»' },
    ],
  },
  {
    livro: 'at', capitulo: 5, versiculo: 42,
    tema: 'Todos os dias, no templo e pelas casas, não cessavam de ensinar e pregar',
    contexto: 'Persistência no ensino.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Ensino', resumo: 'Ensino é constante — não ocasional.', citacao: '«Todos os dias — ensino constante.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Coragem', resumo: 'Perseguem mas não param.', citacao: '«Perseguição — mas continuam.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Missão', resumo: 'Missão é prioritária — sempre.»', citacao: 'Missão é prioritária — sempre.»' },
    ],
  },
  {
    livro: 'at', capitulo: 8, versiculo: 26,
    tema: 'Levanta-te e vai para o sul',
    contexto: 'Obediência a guias divinos.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Obediência', resumo: 'Obediência é imediata — sem questionar.', citacao: '«Levanta — vai.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Guia', resumo: 'Deus guia — passo a passo.', citacao: '«Guia — direção divina.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Missão', resumo: 'Missão é guiada — não improvisada.»', citacao: 'Missão é guiada — não improvisada.»' },
    ],
  },
  {
    livro: 'at', capitulo: 10, versiculo: 38,
    tema: 'Deus ungiu com o Espírito Santo e poder a Jesus de Nazaré',
    contexto: 'Ungido — para fazer bondade.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Ungação', resumo: 'Jesus ungido — para servir.', citacao: '«Ungido — fazer bem.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Serviço', resumo: 'Serviço é ungido — não secular.', citacao: '«Fazer bem — serviço ungido.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Exemplo', resumo: 'Cristo é exemplo — ungido para servir.»', citacao: 'Cristo é exemplo — ungido para servir.»' },
    ],
  },
  {
    livro: 'at', capitulo: 13, versiculo: 47,
    tema: 'Pois assim nos ordenou o Senhor: Pus-te para ser luz das nações',
    contexto: 'Missão é mandamento divino.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Missão', resumo: 'Missão é ordenada — não opcional.', citacao: '«Luz — para as nações.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Universalidade', resumo: 'Salvação é universal — sem fronteiras.', citacao: '«Nações — universal.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Mandamento', resumo: 'Deus ordena — não sugere.»', citacao: 'Deus ordena — não sugere.»' },
    ],
  },
  {
    livro: 'at', capitulo: 16, versiculo: 31,
    tema: 'Crê no Senhor Jesus e serás salvo',
    contexto: 'Salvação pela fé — simples.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Fé', resumo: 'Salvação é pela fé — não por obras.', citacao: '«Crê — serás salvo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Simplicidade', resumo: 'Salvação é simples — não complexa.', citacao: '«Crê — simples.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Universalidade', resumo: 'Salvação é para todos — sem exceção.»', citacao: 'Salvação é para todos — sem exceção.»' },
    ],
  },
  {
    livro: 'at', capitulo: 20, versiculo: 35,
    tema: 'Mais bem-aventurado é dar do que receber',
    contexto: 'Generosidade é bênção.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Generosidade', resumo: 'Dar é mais abençado — paradigma.', citacao: '«Dar — mais abençado.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Serviço', resumo: 'Serviço é prioridade — não luxo.', citacao: '«Dar — serviço.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Alegria', resumo: 'Alegria em dar — não apenas receber.»', citacao: 'Alegria em dar — não apenas receber.»' },
    ],
  },
  {
    livro: 'at', capitulo: 26, versiculo: 18,
    tema: 'Abrir os seus olhos para se converterem das trevas para a luz',
    contexto: 'Conversão é iluminação divina.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Conversão', resumo: 'Conversão é obra divina — não humana.', citacao: '«Abrir olhos — converter.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Luz', resumo: 'Luz é conhecimento — não apenas sensação.', citacao: '«Luz — conhecimento.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Libertação', resumo: 'Conversão liberta — das trevas.»', citacao: 'Conversão liberta — das trevas.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 2, versiculo: 4,
    tema: 'Ou não desprezas tu as riquezas da sua bondade, paciência e longanimidade?',
    contexto: 'Bondade de Deus leva ao arrependimento.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Bondade', resumo: 'Bondade de Deus — não para desprezar.', citacao: '«Bondade — leva ao arrependimento.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Paciência', resumo: 'Paciência de Deus — não é tolerância.', citacao: '«Paciência — longanimidade.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Arrependimento', resumo: 'Arrependimento é resposta à bondade.»', citacao: 'Arrependimento é resposta à bondade.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 4, versiculo: 5,
    tema: 'Mas àquele que não obra, mas crê naquele que justifica ao ímpio, a sua fé lhe é imputada como justiça',
    contexto: 'Justificação pela fé — sem obras.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Justificação', resumo: 'Fé é imputada — não conquistada.', citacao: '«Fé — imputada como justiça.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'Graça é dádiva — não mérito.', citacao: '«Graça — não obras.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Sola fide', resumo: 'Sola fide — coração da Reforma.»', citacao: 'Sola fide — coração da Reforma.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 7, versiculo: 18,
    tema: 'Sei que em mim, isto é, na minha carne, não habita o bien',
    contexto: 'Conflito interior — guerra espiritual.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Conflito', resumo: 'Há guerra interior — real.', citacao: '«Em mim — guerra.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Pecado', resumo: 'Pecado habita — mas não domina.', citacao: '«Habita — mas não domina.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Honestidade', resumo: 'Fé é honestidade — admitir conflito.»', citacao: 'Fé é honestidade — admitir conflito.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 13, versiculo: 10,
    tema: 'O amor não faz mal ao próximo',
    contexto: 'Amor é cumprimento da Lei.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor', resumo: 'Amor é cumprimento — não lei morta.', citacao: '«Amor — não faz mal.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Lei', resumo: 'Lei se cumpre em amor.', citacao: '«Cumprimento — amor.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Amor é prática — não teoria.»', citacao: 'Amor é prática — não teoria.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 14, versiculo: 19,
    tema: 'Procurai, pois, as coisas que servem para a paz e a edificação mútua',
    contexto: 'Paz e edificação — comunidade.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Paz', resumo: 'Paz é meta — não é opcional.', citacao: '«Paz — procurar.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Edificação', resumo: 'Edificar — não destruir.', citacao: '«Edificação — mútua.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Comunidade', resumo: 'Comunidade é paz — não conflito.»', citacao: 'Comunidade é paz — não conflito.»' },
    ],
  },
  {
    livro: 'rm', capitulo: 16, versiculo: 20,
    tema: 'O Deus da paz esmagará sob vossos pés em breve a Satanás',
    contexto: 'Vitória sobre Satanás — certeza.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Vitória', resumo: 'Deus esmaga Satanás — vitória.', citacao: '«Deus da paz — esmaga.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Promessa', resumo: 'Promessa é certa — não é possibilidade.', citacao: '«Em breve — vitória certa.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Esperança', resumo: 'Esperança é certa — vitória é garantida.»', citacao: 'Esperança é certa — vitória é garantida.»' },
    ],
  },
  {
    livro: '1co', capitulo: 2, versiculo: 2,
    tema: 'Porque não me propus a saber entre vós coisa alguma senão Jesus Cristo, e este crucificado',
    contexto: 'Cruz é centro — não filosofia.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cruz', resumo: 'Cruz é centro — não sabedoria humana.', citacao: '«Cristo crucificado — centro.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Simplicidade', resumo: 'Simplicidade do evangelho — não erudição.', citacao: '«Simplicidade — evangelho.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Foco', resumo: 'Foco no essencial — não no acessório.»', citacao: 'Foco no essencial — não no acessório.»' },
    ],
  },
  {
    livro: '1co', capitulo: 3, versiculo: 16,
    tema: 'Não sabeis que sois o templo de Deus',
    contexto: 'Igreja é templo — não edifício.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Templo', resumo: 'Cada crente é templo do Espírito.', citacao: '«Sois — templo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Santidade', resumo: 'Templo é sagrado — cuidar.', citacao: '«Sagrado — não profanar.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Dignidade', resumo: 'Dignidade do crente — templo de Deus.»', citacao: 'Dignidade do crente — templo de Deus.»' },
    ],
  },
  {
    livro: '1co', capitulo: 6, versiculo: 19,
    tema: 'O vosso corpo é templo do Espírito Santo',
    contexto: 'Corpo é sagrado — não é nosso.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Corpo', resumo: 'Corpo é templo — não é nosso.', citacao: '«Vosso corpo — templo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Santidade', resumo: 'Cuidar do corpo — santidade.', citacao: '«Templo — cuidar.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Responsabilidade', resumo: 'Responsabilidade com o corpo — não descuido.»', citacao: 'Responsabilidade com o corpo — não descuido.»' },
    ],
  },
  {
    livro: '1co', capitulo: 9, versiculo: 24,
    tema: 'Não sabeis que os que correm na pista, todos correm, mas um só leva o prêmio',
    contexto: 'Corrida — disciplina.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Disciplina', resumo: 'Corrida exige disciplina — não improviso.', citacao: '«Correm — um leva prêmio.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Meta', resumo: 'Meta é clara — correr para ganhar.', citacao: '«Meta — ganhar.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Esforço', resumo: 'Esforço é necessário — não basta querer.»', citacao: 'Esforço é necessário — não basta querer.»' },
    ],
  },
  {
    livro: '1co', capitulo: 11, versiculo: 26,
    tema: 'Sempre que comerdes deste pão e beberdes deste cálice',
    contexto: 'Ceia do Senhor — memorial.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Memorial', resumo: 'Ceia é memorial — não magia.', citacao: '«Comer — beber — memorial.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Reino', resumo: 'Ceia é antecipação do reino.', citacao: '«Reino — antecipação.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Comunhão', resumo: 'Ceia é comunhão — com Cristo e irmãos.»', citacao: 'Ceia é comunhão — com Cristo e irmãos.»' },
    ],
  },
  {
    livro: '1co', capitulo: 14, versiculo: 33,
    tema: 'Porque Deus não é de confusão, mas de paz',
    contexto: 'Deus é ordem — não caos.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Ordem', resumo: 'Deus é ordem — não confusão.', citacao: '«Deus — paz, não confusão.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Comunidade', resumo: 'Comunidade é paz — não bagunça.', citacao: '«Ordem — paz.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Culto', resumo: 'Culto é ordenado — não caótico.»', citacao: 'Culto é ordenado — não caótico.»' },
    ],
  },
  {
    livro: '1co', capitulo: 16, versiculo: 14,
    tema: 'Tudo o que fizerdes fazei com amor',
    contexto: 'Amor em tudo — sem exceção.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor', resumo: 'Amor em tudo — sem exceção.', citacao: '«Tudo — com amor.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Ética', resumo: 'Amor é fundamento da ética cristã.', citacao: '«Amor — ética.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Amor é prática — não teoria.»', citacao: 'Amor é prática — não teoria.»' },
    ],
  },
  {
    livro: '2co', capitulo: 1, versiculo: 3,
    tema: 'Bendito seja o Deus e Pai do nosso Senhor Jesus Cristo',
    contexto: 'Consolação divina — fonte.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Consolação', resumo: 'Deus consola — para consolar outros.', citacao: '«Deus — consola.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Pai', resumo: 'Deus é pai — ternura divina.', citacao: '«Pai — consola.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Purpose', resumo: 'Consolados para consolar — missão.»', citacao: 'Consolados para consolar — missão.»' },
    ],
  },
  {
    livro: '2co', capitulo: 3, versiculo: 17,
    tema: 'Onde está o Espírito do Senhor, ali há liberdade',
    contexto: 'Espírito traz liberdade.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Liberdade', resumo: 'Espírito é liberdade — não lei.', citacao: '«Espírito — liberdade.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Lei', resumo: 'Lei é letra — Espírito é vida.', citacao: '«Letra — morta. Espírito — vida.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Vida', resumo: 'Vida no Espírito — não sob Lei.»', citacao: 'Vida no Espírito — não sob Lei.»' },
    ],
  },
  {
    livro: '2co', capitulo: 6, versiculo: 16,
    tema: 'Sois o templo do Deus vivo',
    contexto: 'Igreja é templo — Deus habita.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Templo', resumo: 'Igreja é templo — Deus habita.', citacao: '«Templo — Deus vivo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Habitação', resumo: 'Deus habita — não é distante.', citacao: '«Deus habita — não distante.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Santidade', resumo: 'Santidade — viver como templo.»', citacao: 'Santidade — viver como templo.»' },
    ],
  },
  {
    livro: '2co', capitulo: 9, versiculo: 7,
    tema: 'Cada um dê como propôs em seu coração, não com tristeza ou por necessidade',
    contexto: 'Generosidade é espontânea.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Generosidade', resumo: 'Dar com alegria — não por obrigação.', citacao: '«Coração — não tristeza.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'Dar é graça — não é taxa.', citacao: '«Graça — dar com alegria.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Generosidade é prática — não teoria.»', citacao: 'Generosidade é prática — não teoria.»' },
    ],
  },
  {
    livro: '2co', capitulo: 10, versiculo: 5,
    tema: 'Levando cativo todo entendimento à obediência de Cristo',
    contexto: 'Pensamento submetido a Cristo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Pensamento', resumo: 'Pensamento submetido — não livre.', citacao: '«Cativo — obediência a Cristo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Obediência', resumo: 'Obediência inclui mente — não só corpo.', citacao: '«Mente — submetida.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Pensar como Cristo — transformação.»', citacao: 'Pensar como Cristo — transformação.»' },
    ],
  },
  {
    livro: 'gl', capitulo: 1, versiculo: 6,
    tema: 'Admiro-vos de tão depressa vos transpordes de um chamado',
    contexto: 'Advertência contra outro evangelho.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Alerta', resumo: 'Falsa graça não é graça.', citacao: '«Rapidamente — outro evangelho.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'Graça não é licença para pecar.', citacao: '«Graça — não licença.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Vigilância', resumo: 'Vigilância contra falsos ensinos.»', citacao: 'Vigilância contra falsos ensinos.»' },
    ],
  },
  {
    livro: 'gl', capitulo: 4, versiculo: 6,
    tema: 'E porque sois filhos, Deus enviou o Espírito do Seu Filho',
    contexto: 'Espírito confirma filiação.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Filiação', resumo: 'Espírito confirma — somos filhos.', citacao: '«Espírito — filhos.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Espírito', resumo: 'Espírito é testemunho — internamente.', citacao: '«Testemunho — Abá, Pai.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Confiança', resumo: 'Confiança de filhos — não de escravos.»', citacao: 'Confiança de filhos — não de escravos.»' },
    ],
  },
  {
    livro: 'ef', capitulo: 2, versiculo: 14,
    tema: 'Pois ele mesmo é a nossa paz',
    contexto: 'Cristo é paz — não apenas traz.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Paz', resumo: 'Cristo é paz — não apenas traz.', citacao: '«Cristo — paz.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Reconciliação', resumo: 'Reconciliação é obra de Cristo.', citacao: '«Cristo — reconcilia.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Unidade', resumo: 'Unidade é em Cristo — não em acordos.»', citacao: 'Unidade é em Cristo — não em acordos.»' },
    ],
  },
  {
    livro: 'ef', capitulo: 3, versiculo: 17,
    tema: 'Para que Cristo habite em vós pela fé',
    contexto: 'Habitação de Cristo — fé.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Habitação', resumo: 'Cristo habita — não é visitante.', citacao: '«Cristo habita — pela fé.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Fé', resumo: 'Fé é meio — Cristo habita por ela.', citacao: '«Fé — meio.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Presença', resumo: 'Presença de Cristo — real, não figurada.»', citacao: 'Presença de Cristo — real, não figurada.»' },
    ],
  },
  {
    livro: 'ef', capitulo: 4, versiculo: 32,
    tema: 'Sede bondosos misericordiosos uns para com os outros',
    contexto: 'Bondade e misericórdia fraternas.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Bondade', resumo: 'Bondade mútua — não apenas individual.', citacao: '«Bondosos — uns com os outros.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Misericórdia', resumo: 'Misericórdia é prática — não teoria.', citacao: '«Misericórdia — prática.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Comunidade', resumo: 'Comunidade é bondade — não crítica.»', citacao: 'Comunidade é bondade — não crítica.»' },
    ],
  },
  {
    livro: 'ef', capitulo: 5, versiculo: 18,
    tema: 'Não vos embebaís de vinho, mas enchei-vos do Espírito Santo',
    contexto: 'Espírito — não vício.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Espírito', resumo: 'Encher do Espírito — não de vinho.', citacao: '«Encher — do Espírito.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Controle', resumo: 'Espírito é controle — não perda.', citacao: '«Espírito — controle.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Vida', resumo: 'Vida no Espírito — não no vício.»', citacao: 'Vida no Espírito — não no vício.»' },
    ],
  },
  {
    livro: 'fp', capitulo: 1, versiculo: 6,
    tema: 'Tendo por certo isto: que aquele que em vós começou a boa obra a aperfeiçoará',
    contexto: 'Deus começa e aperfeiçoa.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Perseverança', resumo: 'Deus completa o que começa.', citacao: '«Começou — aperfeiçoará.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Confiança', resumo: 'Confiança — Deus é fiel.', citacao: '«Deus — fiel.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Segurança', resumo: 'Segurança — Deus não abandona o que começou.»', citacao: 'Segurança — Deus não abandona o que começou.»' },
    ],
  },
  {
    livro: 'fp', capitulo: 2, versiculo: 3,
    tema: 'Nada façais por contenda ou vaidade',
    contexto: 'Humildade em tudo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Humildade', resumo: 'Nada por contenda — humildade.', citacao: '«Nada — por contenda.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Vaidade', resumo: 'Vaidade destrói — humildade constrói.', citacao: '«Contenda — destrói.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Humildade é prática — não teoria.»', citacao: 'Humildade é prática — não teoria.»' },
    ],
  },
  {
    livro: 'fp', capitulo: 3, versiculo: 13,
    tema: 'Esquecendo o que fica para trás e estendendo-me para o que está adiante',
    contexto: 'Esquecer para avançar.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Futuro', resumo: 'Olhar para frente — não para trás.', citacao: '«Adiante — esquecendo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Perseverança', resumo: 'Perseverar — não olhar para trás.', citacao: '«Esquecendo — avançando.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Foco', resumo: 'Focar no que está por vir.»', citacao: 'Focar no que está por vir.»' },
    ],
  },
  {
    livro: 'cl', capitulo: 1, versiculo: 18,
    tema: 'Ele é o princípio, o primogênito de entre os mortos',
    contexto: 'Cristo é primeiro — em tudo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Primazia', resumo: 'Cristo é primeiro — em tudo.', citacao: '«Primogênito — primeiro.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Ressurreição', resumo: 'Primeiro a ressuscitar — padrão.', citacao: '«Primeiro — entre os mortos.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Senhorio', resumo: 'Senhorio de Cristo — absoluto.»', citacao: 'Senhorio de Cristo — absoluto.»' },
    ],
  },
  {
    livro: 'cl', capitulo: 2, versiculo: 6,
    tema: 'Assim, pois, recebestes a Cristo Jesus, o Senhor; caminhai nele',
    contexto: 'Caminhar em Cristo — fé ativa.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Caminhar', resumo: 'Fé é caminhar — não apenas crer.', citacao: '«Caminhai — nele.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Atividade', resumo: 'Fé é atividade — não passividade.', citacao: '«Caminhar — ativo.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Fé se vive — não se teoriza.»', citacao: 'Fé se vive — não se teoriza.»' },
    ],
  },
  {
    livro: 'cl', capitulo: 3, versiculo: 16,
    tema: 'A palavra de Cristo habite em vós ricamente',
    contexto: 'Palavra habita — não apenas informa.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Habitação', resumo: 'Palavra habita — não apenas informa.', citacao: '«Habite — ricamente.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Riqueza', resumo: 'Palavra é riqueza — não pobreza.', citacao: '«Ricamente — abundância.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Vida', resumo: 'Palavra é vida — não letra.»', citacao: 'Palavra é vida — não letra.»' },
    ],
  },
  {
    livro: '1ts', capitulo: 1, versiculo: 3,
    tema: 'Lembrando-nos sem cessar da vossa obra de fé, trabalho de amor',
    contexto: 'Fé produz obra — amor produz trabalho.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Fé viva', resumo: 'Fé produz obras — não é abstrata.', citacao: '«Fé — obra.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Amor', resumo: 'Amor produz trabalho — não é passivo.', citacao: '«Amor — trabalho.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Esperança', resumo: 'Esperança produz perseverança — não desistência.»', citacao: 'Esperança produz perseverança — não desistência.»' },
    ],
  },
  {
    livro: '1ts', capitulo: 2, versiculo: 13,
    tema: 'Recebestes a palavra de Deus, que é palavra de Deus',
    contexto: 'Palavra é divina — não humana.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Palavra', resumo: 'Palavra é de Deus — não de homens.', citacao: '«Palavra de Deus — não humana.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Autoridade', resumo: 'Autoridade da Palavra — não é opinião.', citacao: '«Autoridade — divina.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Recepção', resumo: 'Receber a Palavra — como é.»', citacao: 'Receber a Palavra — como é.»' },
    ],
  },
  {
    livro: '1ts', capitulo: 3, versiculo: 12,
    tema: 'O Senhor faça vos abundar e transbordar de amor',
    contexto: 'Amor crescente — obra divina.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor', resumo: 'Amor é dom — não conquista.', citacao: '«Amor — faça abundar.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Crescimento', resumo: 'Amor cresce — obra do Espírito.', citacao: '«Abundar — transbordar.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Oração', resumo: 'Oração por amor crescente.»', citacao: 'Oração por amor crescente.»' },
    ],
  },
  {
    livro: '1ts', capitulo: 5, versiculo: 11,
    tema: 'Amai-vos uns aos outros e edificai-vos mutuamente',
    contexto: 'Amor e edificação mútua.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor', resumo: 'Amor é mútuo — não unidirecional.', citacao: '«Amai-vos — mútuo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Edificação', resumo: 'Edificar — não destruir.', citacao: '«Edificar — mútuo.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Comunidade', resumo: 'Comunidade é amor e edificação.»', citacao: 'Comunidade é amor e edificação.»' },
    ],
  },
  {
    livro: '2ts', capitulo: 1, versiculo: 3,
    tema: 'Devemos sempre agradecer a Deus por vós, porque a fé de vós cresce',
    contexto: 'Fé cresce — não é estática.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Crescimento', resumo: 'Fé cresce — não é fixa.', citacao: '«Cresce — sempre.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Gratidão', resumo: 'Gratidão por fé crescente.', citacao: '«Agradecer — fé cresce.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Comunidade', resumo: 'Comunidade cresce — não estagna.»', citacao: 'Comunidade cresce — não estagna.»' },
    ],
  },
  {
    livro: '2ts', capitulo: 2, versiculo: 16,
    tema: 'Deu-vos eterna consolação e boa esperança pela graça',
    contexto: 'Consolação eterna — pela graça.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Consolação', resumo: 'Consolação é eterna — não temporal.', citacao: '«Eterna — consolação.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'Consolação é graça — não mérito.', citacao: '«Pela graça — consolação.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Esperança', resumo: 'Esperança é boa — não vaga.', citacao: '«Boa esperança — certa.»' },
    ],
  },
  {
    livro: '1tm', capitulo: 1, versiculo: 15,
    tema: 'Cristo Jesus veio ao mundo para salvar os pecadores',
    contexto: 'Missão de Cristo — salvar.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Missão', resumo: 'Cristo veio salvar — não condenar.', citacao: '«Veio salvar — pecadores.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'Salvação é graça — não conquista.', citacao: '«Graça — salvar.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Universalidade', resumo: 'Salvação é para todos — sem exceção.»', citacao: 'Salvação é para todos — sem exceção.»' },
    ],
  },
  {
    livro: '1tm', capitulo: 3, versiculo: 15,
    tema: 'A igreja do Deus vivo, coluna e sustentáculo da verdade',
    contexto: 'Igreja sustenta verdade.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Igreja', resumo: 'Igreja é coluna — sustenta verdade.', citacao: '«Coluna — sustentáculo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Verdade', resumo: 'Igreja é guardiã — não criadora.', citacao: '«Verdade — igreja sustenta.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Responsabilidade', resumo: 'Responsabilidade — manter verdade.»', citacao: 'Responsabilidade — manter verdade.»' },
    ],
  },
  {
    livro: '1tm', capitulo: 4, versiculo: 12,
    tema: 'Ninguém menospreze a tua juventude; mas seja exemplo',
    contexto: 'Exemplo em tudo — juventude.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Exemplo', resumo: 'Ser exemplo — não desculpa.', citacao: '«Ninguém menospreze — seja exemplo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Juventude', resumo: 'Juventude é oportunidade — não limitação.', citacao: '«Juventude — exemplo.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Exemplo é prático — não verbal.»', citacao: 'Exemplo é prático — não verbal.»' },
    ],
  },
  {
    livro: '2tm', capitulo: 1, versiculo: 7,
    tema: 'Deus não nos deu espírito de timidez, mas de poder, amor e moderação',
    contexto: 'Espírito é poder — não medo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Poder', resumo: 'Espírito é poder — não timidez.', citacao: '«Não timidez — poder.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Amor', resumo: 'Amor — não medo.', citacao: '«Amor — moderação.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Coragem', resumo: 'Coragem vem do Espírito — não de nós.»', citacao: 'Coragem vem do Espírito — não de nós.»' },
    ],
  },
  {
    livro: '2tm', capitulo: 4, versiculo: 2,
    tema: 'Repreende, repreende, suplica com toda paciência e ensino',
    contexto: 'Ministério da Palavra — com paciência.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Ensino', resumo: 'Ensino é urgente — sempre.', citacao: '«Repreende — suplica — ensina.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Paciência', resumo: 'Paciência é necessária — sempre.', citacao: '«Toda paciência — sempre.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Fidelidade', resumo: 'Fiel ao ensino — sempre.»', citacao: 'Fiel ao ensino — sempre.»' },
    ],
  },
  {
    livro: 'tt', capitulo: 1, versiculo: 5,
    tema: 'Para que em Creta ordenasses em cada cidade',
    contexto: 'Ordem na igreja — disciplina.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Ordem', resumo: 'Igreja é ordenada — não caótica.', citacao: '«Ordenar — em cada cidade.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Disciplina', resumo: 'Disciplina é pastoral — não punitiva.', citacao: '«Disciplina — pastoral.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Estrutura', resumo: 'Estrutura é necessária — não opcional.»', citacao: 'Estrutura é necessária — não opcional.»' },
    ],
  },
  {
    livro: 'tg', capitulo: 5, versiculo: 16,
    tema: 'Confessai as vossas faltas uns aos outros e orai uns pelos outros',
    contexto: 'Confissão mútua — cura.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Confissão', resumo: 'Confissão mútua — não individual.', citacao: '«Confessai — uns aos outros.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Oração', resumo: 'Oração mútua — cura.', citacao: '«Orar — pelos outros.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Comunidade', resumo: 'Comunidade é confissão — não máscara.»', citacao: 'Comunidade é confissão — não máscara.»' },
    ],
  },
  {
    livro: '1pe', capitulo: 4, versiculo: 8,
    tema: 'Acima de tudo, porém, tende um fervoroso amor uns pelos outros',
    contexto: 'Amor fervoroso — cobre pecados.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor', resumo: 'Amor fervoroso — não morno.', citacao: '«Fervoroso — acima de tudo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Cobertura', resumo: 'Amor cobre pecados — não expõe.', citacao: '«Amor — cobre.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prioridade', resumo: 'Amor é prioridade — não opcional.»', citacao: 'Amor é prioridade — não opcional.»' },
    ],
  },
  {
    livro: '1jo', capitulo: 2, versiculo: 15,
    tema: 'Não ameis o mundo nem as coisas que estão no mundo',
    contexto: 'Amor a Deus — não ao mundo.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Mundo', resumo: 'Mundo é temporário — Deus é eterno.', citacao: '«Não amar — mundo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Prioridade', resumo: 'Prioridade: Deus, não mundo.', citacao: '«Deus primeiro — mundo depois.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Alerta', resumo: 'Alerta contra idolatria do mundo.»', citacao: 'Alerta contra idolatria do mundo.»' },
    ],
  },
  {
    livro: '1jo', capitulo: 2, versiculo: 27,
    tema: 'A unção que dele recebestes habita em vós',
    contexto: 'Espírito habita — não precisa de ensino humano.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Espírito', resumo: 'Unção habita — não é externa.', citacao: '«Habita — não precisa de homem.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Dependência', resumo: 'Dependência do Espírito — não de mestres.', citacao: '«Espírito ensina — não homem.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Suficiência', resumo: 'Espírito é suficiente — não faltam mestres.»', citacao: 'Espírito é suficiente — não faltam mestres.»' },
    ],
  },
  {
    livro: '1jo', capitulo: 5, versiculo: 14,
    tema: 'E esta é a confiança que temos nele: que, se pedirmos alguma coisa segundo a sua vontade, ele nos ouve',
    contexto: 'Oração segundo vontade — certeza.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Oração', resumo: 'Oração é certa — se é vontade Dele.', citacao: '«Segundo a sua vontade — ouve.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Confiança', resumo: 'Confiança — certeza de ouvida.', citacao: '«Ouve — certeza.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Vontade', resumo: 'Orar é alinhar — não exigir.»', citacao: 'Orar é alinhar — não exigir.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 2, versiculo: 4,
    tema: 'Mas tenho contra ti que deixaste o teu primeiro amor',
    contexto: 'Primeiro amor — prioridade perdida.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Prioridade', resumo: 'Primeiro amor — prioridade.', citacao: '«Deixaste — primeiro amor.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Alerta', resumo: 'Alerta — prioridade perdida.', citacao: '«Primeiro amor — recuperar.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Renovação', resumo: 'Renovação do primeiro amor — sempre.»', citacao: 'Renovação do primeiro amor — sempre.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 3, versiculo: 10,
    tema: 'Porque guardaste a palavra da minha paciência, também eu te guardarei da hora da provação',
    contexto: 'Guarda dos fiéis — promessa.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Guarda', resumo: 'Deus guarda os fiéis — promessa.', citacao: '«Guardaste — guardarei.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Perseverança', resumo: 'Perseverança é recompensada.', citacao: '«Guarda — recompensa.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Promessa', resumo: 'Promessa é certa — Deus guarda.»', citacao: 'Promessa é certa — Deus guarda.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 5, versiculo: 5,
    tema: 'O Leão da tribo de Judá venceu',
    contexto: 'Cristo é Leão — venceu.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Vitória', resumo: 'Leão venceu — vitória certa.', citacao: '«Leão — venceu.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Poder', resumo: 'Poder do Leão — não fraqueza.', citacao: '«Leão — poder.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Esperança', resumo: 'Esperança — Leão venceu.»', citacao: 'Esperança — Leão venceu.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 7, versiculo: 9,
    tema: 'Uma multidão que ninguém podia contar',
    contexto: 'Salvos de todas as nações.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Universalidade', resumo: 'Salvos de todas as nações — sem exceção.', citacao: '«Ninguém podia contar — multidão.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Diversidade', resumo: 'Toda tribo, língua, povo e nação.', citacao: '«Toda — diversidade.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Esperança', resumo: 'Esperança — multidão salva.»', citacao: 'Esperança — multidão salva.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 19, versiculo: 7,
    tema: 'Porque chegou a hora do seu casamento do Cordeiro',
    contexto: 'Casamento do Cordeiro — ceia celestial.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Ceia', resumo: 'Ceia é antecipação — não apenas memorial.', citacao: '«Casamento — ceia celestial.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Reino', resumo: 'Ceia é reino — não apenas aliança.', citacao: '«Reino — ceia.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Esperança', resumo: 'Esperança — ceia celestial.»', citacao: 'Esperança — ceia celestial.»' },
    ],
  },
  {
    livro: 'ap', capitulo: 22, versiculo: 5,
    tema: 'Não haverá mais noite',
    contexto: 'Luz eterna — sem mais trevas.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Luz', resumo: 'Luz eterna — sem mais noite.', citacao: '«Não haverá — noite.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Perfeição', resumo: 'Perfeição total — sem mais maldade.', citacao: '«Perfeita — sem maldade.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Esperança', resumo: 'Esperança certa — luz eterna.»', citacao: 'Esperança certa — luz eterna.»' },
    ],
  },

  {
    livro: 'js', capitulo: 24, versiculo: 15,
    tema: 'Eu e a minha casa serviremos ao Senhor',
    contexto: 'Decisão coletiva — fé.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Decisão', resumo: 'Decisão pessoal e familiar.', citacao: '«Eu e minha casa — decisão.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Liberdade', resumo: 'Deus respeita — não força.', citacao: '«Servir — escolha.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Família', resumo: 'Família serve — juntos.»', citacao: 'Família serve — juntos.»' },
    ],
  },
  {
    livro: 'jz', capitulo: 4, versiculo: 9,
    tema: 'O Senhor tem saído diante de ti',
    contexto: 'Vitória é divina — não humana.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Vitória', resumo: 'Deus vai adiante — vitória.', citacao: '«Senhor saiu — vitória.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Obediência', resumo: 'Obediência precede vitória.', citacao: '«Obediência — vitória.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Fé', resumo: 'Fé em Deus — vitória.»', citacao: 'Fé em Deus — vitória.»' },
    ],
  },
  {
    livro: 'jz', capitulo: 16, versiculo: 30,
    tema: 'Morreu Samson com os que matou em sua morte',
    contexto: 'Fé que transforma fraqueza em força.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Força', resumo: 'Força vem de Deus — não de nós.', citacao: '«Deus — força.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Fé', resumo: 'Fé vence fraqueza.', citacao: '«Fé — vence.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Propósito', resumo: 'Deus usa até fraqueza — propósito.»', citacao: 'Deus usa até fraqueza — propósito.»' },
    ],
  },
  {
    livro: 'rt', capitulo: 2, versiculo: 12,
    tema: 'O Senhor recompense o teu trabalho',
    contexto: 'Recompensa divina — graça.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Recompensa', resumo: 'Deus recompensa — não esquece.', citacao: '«Recompensa — trabalho.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'Graça recompensa — não mérito.', citacao: '«Recompensa — graça.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Fé', resumo: 'Fé produz recompensa.»', citacao: 'Fé produz recompensa.»' },
    ],
  },
  {
    livro: 'rt', capitulo: 4, versiculo: 14,
    tema: 'O Senhor te faça mulher como Raquebe, que edificou a casa de Davi',
    contexto: 'Fé que edifica — geração.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Edificação', resumo: 'Fé edifica — geração a geração.', citacao: '«Edifica — casa.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eleição', resumo: 'Deus inclui — raça de Davi.', citacao: '«Deus inclui — geração.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Promessa', resumo: 'Promessa messiânica — Davi.»', citacao: 'Promessa messiânica — Davi.»' },
    ],
  },
  {
    livro: '1cr', capitulo: 16, versiculo: 34,
    tema: 'Louvai ao Senhor porque Ele é bom',
    contexto: 'Louvor pela bondade divina.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Bondade', resumo: 'Deus é bom — sempre.', citacao: '«Bondade — sempre.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Louvor', resumo: 'Louvor é resposta — não obrigação.', citacao: '«Louvor — resposta.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Gratidão', resumo: 'Gratidão é expressão de fé.»', citacao: 'Gratidão é expressão de fé.»' },
    ],
  },
  {
    livro: '1cr', capitulo: 29, versiculo: 17,
    tema: 'Deus meu, toda esta grande multidão',
    contexto: 'Ofertas para o templo — generosidade.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Generosidade', resumo: 'Generosidade é dom — não mérito.', citacao: '«Generosidade — dom.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Dedicação', resumo: 'Dedicação é total — não parcial.', citacao: '«Dedicação — tudo.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Louvor', resumo: 'Louvor em ofertas — gratidão.»', citacao: 'Louvor em ofertas — gratidão.»' },
    ],
  },
  {
    livro: '2cr', capitulo: 15, versiculo: 7,
    tema: 'Mas vós, sede fortes e não desanimeis',
    contexto: 'Coragem e perseverança.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Coragem', resumo: 'Coragem é necessária — sempre.', citacao: '«Fortes — não desanimeis.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Perseverança', resumo: 'Perseverança é recompensada.', citacao: '«Perseverança — recompensa.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Deus', resumo: 'Deus está convosco — coragem.»', citacao: 'Deus está convosco — coragem.»' },
    ],
  },
  {
    livro: '2cr', capitulo: 20, versiculo: 15,
    tema: 'Não temais nem vos assusteis, porque a batalha não é vossa',
    contexto: 'Batalha é divina — não humana.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Vitória', resumo: 'Vitória é de Deus — não nossa.', citacao: '«Batalha — não é vossa.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Fé', resumo: 'Fé em Deus — vitória.', citacao: '«Deus — vitória.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Oração', resumo: 'Oração precede vitória.»', citacao: 'Oração precede vitória.»' },
    ],
  },
  {
    livro: 'ezr', capitulo: 1, versiculo: 3,
    tema: 'Suba aquele cujo Deus está em Jerusalém',
    contexto: 'Retorno — obediência.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Obediência', resumo: 'Deus tocou o coração do rei.', citacao: '«Deus tocou — rei permitiu.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Providência', resumo: 'Deus provê — usando reis.', citacao: '«Providência — usando authority.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Restauração', resumo: 'Restauração é obra divina.»', citacao: 'Restauração é obra divina.»' },
    ],
  },
  {
    livro: 'ezr', capitulo: 9, versiculo: 8,
    tema: 'A mão do Senhor nosso Deus foi sobre nós para nos livrar',
    contexto: 'Proteção divina — livramento.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Proteção', resumo: 'Deus protege — mão divina.', citacao: '«Mão do Senhor — livrou.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Livramento', resumo: 'Livramento é divino — não humano.', citacao: '«Livramento — Deus.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Gratidão', resumo: 'Gratidão pelo livramento.»', citacao: 'Gratidão pelo livramento.»' },
    ],
  },
  {
    livro: 'ne', capitulo: 2, versiculo: 8,
    tema: 'Deus estendeu a mim a sua misericórdia',
    contexto: 'Misericórdia divina — proteção.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Misericórdia', resumo: 'Deus estende misericórdia.', citacao: '«Misericórdia — Deus.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Proteção', resumo: 'Deus protege — misericórdia.', citacao: '«Proteção — misericórdia.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Gratidão', resumo: 'Gratidão por misericórdia.»', citacao: 'Gratidão por misericórdia.»' },
    ],
  },
  {
    livro: 'et', capitulo: 7, versiculo: 3,
    tema: 'Mas destruir e matar não podemos',
    contexto: 'Limites humanos — Deus age.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Limites', resumo: 'Limites humanos — Deus age por outros.', citacao: '«Não podemos — Deus pode.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Deus usa circunstâncias — soberano.', citacao: '«Soberania — Deus age.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Fé', resumo: 'Fé confia — Deus age.»', citacao: 'Fé confia — Deus age.»' },
    ],
  },
  {
    livro: 'jó', capitulo: 2, versiculo: 10,
    tema: 'Não pecou Job com seus lábios',
    contexto: 'Fé que resiste — não maldiz.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Fé', resumo: 'Fé resiste — não maldiz.', citacao: '«Não pecou — lábios.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Paciência', resumo: 'Paciência na provação — não murmura.', citacao: '«Paciência — não maldiz.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Testemunho', resumo: 'Testemunho na dor — fé firme.»', citacao: 'Testemunho na dor — fé firme.»' },
    ],
  },
  {
    livro: 'jó', capitulo: 23, versiculo: 10,
    tema: 'Mas Ele sabe o caminho que eu percorro',
    contexto: 'Deus conhece — mesmo sem entender.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Conhecimento', resumo: 'Deus sabe — mesmo sem entender.', citacao: '«Deus sabe — caminho.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Confiança', resumo: 'Confiança — mesmo sem entender.', citacao: '«Confiança — sem entender.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Provação', resumo: 'Provação tem propósito — Deus sabe.»', citacao: 'Provação tem propósito — Deus sabe.»' },
    ],
  },
  {
    livro: 'lm', capitulo: 3, versiculo: 23,
    tema: 'As tuas misericórdias são novas a cada manhã',
    contexto: 'Misericórdia diária — renovação.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Diária', resumo: 'Misericórdia é diária — não anual.', citacao: '«Diária — novas.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Renovação', resumo: 'Renovação é diária — não semanal.', citacao: '«Renovação — diária.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Confiança', resumo: 'Confiança — Deus renova sempre.»', citacao: 'Confiança — Deus renova sempre.»' },
    ],
  },
  {
    livro: 'ct', capitulo: 2, versiculo: 4,
    tema: 'Levou-me ao seu banquete',
    contexto: 'Amor divino — banquetes.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor', resumo: 'Amor é celebrado — banquetes.', citacao: '«Banquete — amor.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Deleite', resumo: 'Deleite em Deus — não apenas em coisas.', citacao: '«Deleite — Deus.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Experiência', resumo: 'Experiência de amor com Deus.»', citacao: 'Experiência de amor com Deus.»' },
    ],
  },
  {
    livro: '2pe', capitulo: 1, versiculo: 3,
    tema: 'Sua divina potência nos concedeu tudo o que conduz à vida piedosa',
    contexto: 'Providência divina — vida piedosa.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Providência', resumo: 'Deus provê — para vida piedosa.', citacao: '«Providência — tudo.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Piedade', resumo: 'Piedade é fruto — não esforço.', citacao: '«Piedade — fruto.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Vida', resumo: 'Vida piedosa — dom divino.»', citacao: 'Vida piedosa — dom divino.»' },
    ],
  },
  {
    livro: '2jo', capitulo: 1, versiculo: 4,
    tema: 'Rejiei que alguns dos teus filhos andam na verdade',
    contexto: 'Verdade andada — não apenas sabida.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Andar', resumo: 'Andar na verdade — prática.', citacao: '«Andam — verdade.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Verdade', resumo: 'Verdade é vivida — não apenas conhecida.', citacao: '«Verdade — andada.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Comunhão', resumo: 'Comunhão é verdade — não mentira.»', citacao: 'Comunhão é verdade — não mentira.»' },
    ],
  },
  {
    livro: '3jo', capitulo: 1, versiculo: 11,
    tema: 'Quem faz o bem é de Deus; quem faz o mal não viu a Deus',
    contexto: 'Ações revelam identidade.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Ações', resumo: 'Ações revelam — não palavras.', citacao: '«Bem — de Deus. Mal — não viu.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Identidade', resumo: 'Identidade se revela em ação.', citacao: '«Identidade — ação.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Prático', resumo: 'Fé é prática — não teoria.»', citacao: 'Fé é prática — não teoria.»' },
    ],
  },
  {
    livro: 'jd', capitulo: 1, versiculo: 20,
    tema: 'Vós, amados, edificando-vos sobre a vossa santíssima fé',
    contexto: 'Edificação na fé — oração.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Edificação', resumo: 'Edificar na fé — constante.', citacao: '«Edificar — fé.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Oração', resumo: 'Oração é meio — não ornamento.', citacao: '«Orar — no Espírito.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Crescimento', resumo: 'Crescer na fé — oração.»', citacao: 'Crescer na fé — oração.»' },
    ],
  },
  {
    livro: 'fm', capitulo: 1, versiculo: 4,
    tema: 'Porque menciono a tua fé e o teu amor',
    contexto: 'Fé e amor — virtudes.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Fé', resumo: 'Fé é mencionada — reconhecida.', citacao: '«Fé — mencionada.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Amor', resumo: 'Amor é mencionado — reconhecido.', citacao: '«Amor — mencionado.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Comunhão', resumo: 'Comunhão é fé e amor.»', citacao: 'Comunhão é fé e amor.»' },
    ],
  },
  {
    livro: 'ag', capitulo: 1, versiculo: 8,
    tema: 'Subi ao monte, derrubai madeira e edificai a casa',
    contexto: 'Obediência — construir.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Obediência', resumo: 'Obediência é prática — não verbal.', citacao: '«Subir — derrubar — edificar.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Prioridade', resumo: 'Prioridade: casa de Deus.', citacao: '«Casa de Deus — primeiro.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Ação', resumo: 'Ação é necessária — não contemplação.»', citacao: 'Ação é necessária — não contemplação.»' },
    ],
  },
  {
    livro: 'ag', capitulo: 2, versiculo: 9,
    tema: 'A glória desta casa última será maior',
    contexto: 'Glória da nova casa — promessa.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Glória', resumo: 'Glória da nova casa — maior.', citacao: '«Última — maior.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Promessa', resumo: 'Promessa de glória — Deus cumpre.', citacao: '«Glória — promessa.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Esperança', resumo: 'Esperança — glória maior.»', citacao: 'Esperança — glória maior.»' },
    ],
  },
  {
    livro: 'zc', capitulo: 4, versiculo: 6,
    tema: 'Não por força, nem por poder, mas pelo Meu Espírito',
    contexto: 'Espírito — não força humana.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Espírito', resumo: 'Espírito é meio — não força.', citacao: '«Espírito — não força.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Dependência', resumo: 'Dependência do Espírito — não de nós.', citacao: '«Espírito — dependência.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Poder', resumo: 'Poder é divino — não humano.»', citacao: 'Poder é divino — não humano.»' },
    ],
  },
  {
    livro: 'ml', capitulo: 3, versiculo: 10,
    tema: 'Trazei todos os dízimos à casa do tesouro',
    contexto: 'Dízimos — prueba divina.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Dízimos', resumo: 'Dízimos é prova — não imposto.', citacao: '«Trazei — prova.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Provação', resumo: 'Deus prova — dízimos.', citacao: '«Prova-me — dízimos.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Generosidade', resumo: 'Generosidade é prova de fé.»', citacao: 'Generosidade é prova de fé.»' },
    ],
  },
  {
    livro: 'ob', capitulo: 1, versiculo: 4,
    tema: 'Ainda que te exaltes como a águia',
    contexto: 'Orgulho derrubado — Deus humilha.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Orgulho', resumo: 'Orgulho precede destruição.', citacao: '«Exaltado — derrubado.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Deus humilha — soberano.', citacao: '«Deus humilha — soberano.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Aviso', resumo: 'Aviso contra orgulho.»', citacao: 'Aviso contra orgulho.»' },
    ],
  },
  {
    livro: 'jl', capitulo: 2, versiculo: 25,
    tema: 'Eu vos restituirei os anos que foram devorados',
    contexto: 'Restauração divina — promessa.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Restauração', resumo: 'Deus restaura — anos perdidos.', citacao: '«Restituirei — anos.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Promessa', resumo: 'Promessa de restauração — certa.', citacao: '«Deus restaura — sempre.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Esperança', resumo: 'Esperança — restauração.»', citacao: 'Esperança — restauração.»' },
    ],
  },
  {
    livro: 'jl', capitulo: 3, versiculo: 17,
    tema: 'Eu habitarrei em Jerusalém',
    contexto: 'Deus habita — presença divina.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Presença', resumo: 'Deus habita — não é distante.', citacao: '«Habitarrei — Jerusalém.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Reino', resumo: 'Reino é presença — não é distante.', citacao: '«Habita — reino.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Promessa', resumo: 'Promessa de presença — certa.»', citacao: 'Promessa de presença — certa.»' },
    ],
  },
  {
    livro: 'mq', capitulo: 4, versiculo: 3,
    tema: 'Não mais ensinarão espada, nem guerrearão',
    contexto: 'Paz messiânica — promessa.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Paz', resumo: 'Paz messiânica — sem guerra.', citacao: '«Não mais — espada.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Reino', resumo: 'Reino é paz — não guerra.', citacao: '«Reino — paz.»' },
      { teologo: 'N.T. Wright', periodo: '1948-', tradicao: 'Evangélica', visao: 'Escatologia', resumo: 'Paz futura — promessa.»', citacao: 'Paz futura — promessa.»' },
    ],
  },
  {
    livro: 'mq', capitulo: 7, versiculo: 8,
    tema: 'Eu esperarei no Senhor que esconde a Sua face',
    contexto: 'Esperança em Deus escondido.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Esperança', resumo: 'Esperar em Deus — mesmo escondido.', citacao: '«Esperarei — Deus esconde.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Fé', resumo: 'Fé vê Deus escondido — não apenas manifesto.', citacao: '«Deus escondido — fé.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Paciência', resumo: 'Paciência — esperar Deus.»', citacao: 'Paciência — esperar Deus.»' },
    ],
  },
  {
    livro: 'hc', capitulo: 3, versiculo: 17,
    tema: 'Mas eu exultarei no Senhor',
    contexto: 'Alegria mesmo na adversidade.',
    interpretacoes: [
      { teologo: 'Santo Agostinho', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Alegria', resumo: 'Alegria em Deus — mesmo na dor.', citacao: '«Exultarei — Senhor.»' },
      { teologo: 'Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Fé', resumo: 'Fé transcende circunstâncias.', citacao: '«Alegria — apesar de tudo.»' },
      { teologo: 'Charles Spurgeon', periodo: '1834-1892', tradicao: 'Batista', visao: 'Louvor', resumo: 'Louvor na adversidade — fé verdadeira.»', citacao: 'Louvor na adversidade — fé verdadeira.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // JÓ — SOFRIMENTO, SOBERANIA E SABEDORIA
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'jó', capitulo: 1, versiculo: 21,
    tema: 'O Senhor o deu, o Senhor o tomou',
    contexto: 'Jó perde todos os bens, filhos e saúde, mas não blasfema contra Deus. Sua resposta é um modelo de submissão soberana.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Providência divina', resumo: 'A resposta de Jó demonstra que Deus é autor de tudo — tanto o dar quanto o tomar. A submissão a Deus mesmo na perda é a essência da fé verdadeira. Agostinho via em Jó o protótipo do crente que aceita a vontade divina sem compreender.', citacao: '«Jó não disse ‘o Senhor me deu e o Senhor me tirou’ — ele disse ‘o Senhor DEU, o Senhor TOMOU’. Tudo vem de Deus, até a perda.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Virtude da caridade', resumo: 'Jó pratica a virtude da caridade ao amar Deus independentemente dos bens recebidos. Aquino argumenta que a verdadeira devoção não é mercantil — não se ama Deus pelos dons, mas pelo próprio Deus.', citacao: '«O justo não serve a Deus por causa dos bens temporais, mas pelo amor ao próprio Deus, que é a beatitude última.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Sola Deo gloria', resumo: 'Calvino enfatiza que Jó reconhece a soberania absoluta de Deus sobre todas as coisas. Não há acaso — tudo está nas mãos de Deus. A bênção e a adversidade são ambas instrumentos do propósito divino.', citacao: '«Jó ensina que não devemos receber apenas de Deus o que nos agrada, mas também suportar o que nos aflige, pois tudo vem da mão do Pai.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação na crise', resumo: 'Barth vê em Jó o momento em que o homem encontra o Deus vivo — não um conceito abstrato. A crise de Jó revela um Deus que transcende toda teologia humana e se impõe como o Verdadeiro.', citacao: '«O Deus de Jó não é um deus fácil — é o Deus que se encontra quando tudo o que sabemos sobre Ele é destruído.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Exemplo de fé', resumo: 'Jó é o exemplo supremo de fé incondicional. Stott enfatiza que a fé não é um contrato com Deus — é confiança na bondade de Deus mesmo quando não entendemos os caminhos divinos.', citacao: '«A fé de Jó nos ensina que amamos Deus não pelo que Ele nos dá, mas pelo que Ele é.»' },
    ],
  },
  {
    livro: 'jó', capitulo: 3, versiculo: 3,
    tema: 'Pereça o dia em que nasci',
    contexto: 'Jó prange o dia do seu nascimento em um lamento que é um dos mais comoventes da Escritura. Não é suicídio, mas expressão de profundo sofrimento.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Lamento legítimo', resumo: 'Agostinho defende que o lamento de Jó é legítimo — Deus não condena a dor honesta. O sofrimento não anula a piedade, mas a purifica. O crente pode chorar diante de Deus sem pecar.', citacao: '«As lágrimas de Jó são orações — Deus não despreza o pranto do justo.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Dor como purificação', resumo: 'Aquino vê no lamento de Jó a dimensão purificadora do sofrimento. A dor não é castigo — é caminho de santificação. Jó, ao lutar com Deus, se aproxima Dele.', citacao: '«O sofrimento do justo não é vingança divina, mas provação que aperfeiçoa a virtude.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Sinceridade diante de Deus', resumo: 'Calvino elogia a sinceridade de Jó — ele não finge piedade. A honestidade diante de Deus é mais valiosa que a resignação superficial. Deus prefere a dor sincera à hipocrisia.', citacao: '«Jó não se esconde atrás de máscaras — ele derrama sua alma diante de Deus com honestidade brutal.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Protesto teológico', resumo: 'Barth interpreta o lamento de Jó como um protesto legítimo contra o sofrimento injusto. O crente tem o direito de questionar Deus — e Deus responde ao questionamento, não ao silêncio.', citacao: '«O lamento de Jó é mais teológico que muitas confissões de fé — porque é honesto.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Dor e esperança', resumo: 'Stott vê em Jó 3 a tensão entre dor e esperança. Jó lamenta, mas não renega Deus. A diferença entre desespero e fé é que a fé lamenta diante de Deus, não longe Dele.', citacao: '«Mesmo em seu lamento mais sombrio, Jó continua falando com Deus — e isso é fé.»' },
    ],
  },
  {
    livro: 'jó', capitulo: 7, versiculo: 17,
    tema: 'Que é o homem para que dele te lembres?',
    contexto: 'Jó questiona a Deus sobre a condição humana — por que Deus se importa tanto com seres tão frágeis e temporais?',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Dignidade humana', resumo: 'Agostinho vê aqui o paradoxo da dignidade humana: somos insignificantes em comparação com Deus, e ainda assim Ele se lembra de nós. Essa é a graça — Deus escolhe se importar com o frágil.', citacao: '«Deus se lembra do homem não porque ele é grande, mas porque Deus é infinitamente misericordioso.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Providência particular', resumo: 'A pergunta de Jó revela a doutrina da providência particular — Deus governa cada detalhe da vida humana, mesmo os mais insignificantes. Não há acaso no universo.', citacao: '«A providência divina se estende ao menor dos seres — pois Deus é causa de todas as coisas.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Humildade humana', resumo: 'Calvino enfatiza a humildade que a pergunta exige. O homem não tem direito de exigir explicações de Deus — mas Deus, em sua bondade, as oferece. A pergunta é retórica: Deus se lembra por amor.', citacao: '«Somos worms diante de Deus — e ainda assim Ele nos sustenta com Sua mão poderosa.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Relação criador-criatura', resumo: 'Barth vê em Jó 7:17 a relação fundamental entre Deus e o homem — não é distância mas proximidade escolhida. Deus não está distante; Ele está presente no sofrimento.', citacao: '«Deus não é o deus distante — é o Deus que se inclina sobre o homem frágil.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Valor do homem', resumo: 'Stott enfatiza que a pergunta de Jó revela o valor infinito do ser humano diante de Deus. Somos frágeis, mas amados. Essa é a base da dignidade humana.', citacao: '«Deus se lembra de nós não porque somos importantes, mas porque Ele é amor.»' },
    ],
  },
  {
    livro: 'jó', capitulo: 9, versiculo: 33,
    tema: 'Haja um árbitro entre nós',
    contexto: 'Jó clama por um mediador — alguém que possa ficar entre ele e Deus para fazer justiça. Uma profecia messiânica involuntária.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Tipologia cristológica', resumo: 'Agostinho vê em Jó 9:33 uma profecia de Cristo, o único Mediador entre Deus e os homens. Jó não sabia, mas clamava pelo Redentor que viria.', citacao: '«Jó não encontrou na terra quem pusesse a mão sobre ambos — mas o céu enviou o Filho de Deus como Mediador.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Necessidade de mediação', resumo: 'Aquino argumenta que a pergunta de Jó revela a impossibilidade de o homem justificar-se a si mesmo. A mediação é necessária porque Deus é justo e o homem é pecador.', citacao: '«Nenhum homem pode ser seu próprio advogado diante de Deus — é preciso um Mediador justo.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Christus Mediator', resumo: 'Calvino vê aqui a necessidade absoluta de Cristo como Mediador. Sem Ele, não há acesso a Deus. Jó antecipa a doutrina da intercessão de Cristo.', citacao: '«O desejo de Jó encontra resposta completa em Cristo, que é nosso Advogado junto ao Pai.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação progressiva', resumo: 'Barth vê em Jó 9:33 um momento de revelação progressiva — o homem descobre que precisa de um mediador divino, e esse mediador é revelado em Cristo.', citacao: '«O clame de Jó por um árbitro é o grito da humanidade por Deus — e Deus responde em Jesus Cristo.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Necessidade de intercessão', resumo: 'Stott enfatiza que Jó articula a necessidade humana de um intercessor. Essa necessidade é suprida em Cristo, que vive sempre para interceder por nós.', citacao: '«Jó não encontrou o mediador — nós o encontramos em Jesus Cristo, que está à destra do Pai.»' },
    ],
  },
  {
    livro: 'jó', capitulo: 14, versiculo: 14,
    tema: 'Se um homem morrer, tornará a viver?',
    contexto: 'Jó questiona a ressurreição — em meio ao sofrimento, ele vislumbra a possibilidade de uma vida além da morte.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Ressurreição', resumo: 'Agostinho vê em Jó 14:14 uma das primeiras expressões da esperança da ressurreição no Antigo Testamento. Jó vislumbra que a morte não é o fim.', citacao: '«Jó antecipa a ressurreição — mesmo na escuridão, uma luz de esperança se acende.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Beatitudo futura', resumo: 'Aquino interpreta este versículo como uma referência à beatitude futura — Jó espera que, após a morte, haverá uma espera feliz até a consumação das promessas divinas.', citacao: '«A esperança de Jó é que, mesmo na morte, Deus não abandona o justo — há uma vida que transcende a morte.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Esperança incipiente', resumo: 'Calvino reconhece que Jó não tem uma doutrina clara da ressurreição, mas sua intuição aponta para a vida eterna. A fé busca Deus mesmo quando não compreende.', citacao: '«Jó não sabe explicar a ressurreição, mas sua fé a pressente — Deus não pode perder aquele que é seu.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Promessa escatológica', resumo: 'Barth vê em Jó 14:14 o grito escatológico da humanidade — a esperança de que Deus vai além da morte. Essa esperança se cumpre em Cristo ressuscitado.', citacao: '«A pergunta de Jó é a pergunta da humanidade — e a resposta é o túmulo vazio de Páscoa.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Esperança cristã', resumo: 'Stott vê em Jó 14:14 a semente da esperança cristã na ressurreição. A morte não é o fim — é uma porta para a vida eterna com Deus.', citacao: '«Jó pergunta se o homem tornará a viver — e Cristo ressuscitado responde: sim, para sempre.»' },
    ],
  },
  {
    livro: 'jó', capitulo: 19, versiculo: 25,
    tema: 'Eu sei que o meu Redentor vive',
    contexto: 'No auge do sofrimento, Jó declara sua fé inabalável num Redentor que viverá eternamente — uma das declarações mais poderosas do Antigo Testamento.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cristologia profética', resumo: 'Agostinho vê em Jó 19:25 uma profecia direta de Cristo. O Redentor (Goel) é o próprio Deus que virá resgatar o homem. É uma das declarações messiânicas mais antigas.', citacao: '«Jó vê além da morte — ele vê o Redentor vivo, que há de se levantar sobre a terra.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Redenção divina', resumo: 'Aquino interpreta o Redentor como Cristo, que é ao mesmo tempo Deus e homem. Jó declara que há um defensor que viverá para sempre e que se levantará na terra.', citacao: '«O Redentor é Cristo, que morre uma vez mas vive para sempre, e há de se manifestar na terra final.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Certeza da fé', resumo: 'Calvino enfatiza a certeza de Jó — «EU SEIO». Não é especulação, é convicção. No meio do sofrimento, a fé se torna certeza. O Redentor vive, e isso muda tudo.', citacao: '«Jó não diz ‘talvez’ ou ‘espero’ — ele diz ‘EU SEIO que o meu Redentor vive’. Essa é a fé em sua forma mais pura.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Deus contra a morte', resumo: 'Barth vê em Jó 19:25 a declaração de que Deus vence a morte. O Redentor vivo é o Deus que se opõe à morte e ao sofrimento, e該使用者finalmente vence.', citacao: '«O Redentor de Jó é o Deus que diz não à morte — e sua palavra é mais forte que o túmulo.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Vitória final', resumo: 'Stott vê em Jó 19:25 a antecipação da vitória de Cristo sobre a morte. O Redentor vive, e isso garante que o sofrimento não é o fim da história.', citacao: '«A declaração de Jó é o hino da esperança cristã — o Redentor vive, e nós viveremos com Ele.»' },
    ],
  },
  {
    livro: 'jó', capitulo: 23, versiculo: 10,
    tema: 'Mas Ele sabe o caminho que eu trilho',
    contexto: 'Jó declara que, embora não veja Deus, confia que Ele conhece seu caminho e que ele sairá provado como o ouro.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Provação divina', resumo: 'Agostinho vê aqui o conceito de provação como purificação — Deus permite o sofrimento para refinar o justo como o ouro é refinado pelo fogo.', citacao: '«Deus conhece o caminho do justo — e o prova para purificar, não para destruir.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Providência omnisciente', resumo: 'Aquino enfatiza a omniscência divina — Deus sabe tudo sobre o caminho de cada pessoa. Nada escapa ao Seu conhecimento, e isso é motivo de consolo, não de temor.', citacao: '«Deus sabe perfeitamente o caminho de cada homem — e isso é a base da confiança do justo.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania e conhecimento', resumo: 'Calvino vê em Jó 23:10 a junção perfeita entre soberania e conhecimento divinos. Deus não apenas governa — Ele conhece intimamente cada passo do crente.', citacao: '«Mesmo quando Deus parece distante, Ele está mais perto que nossos próprios pés — pois Ele sabe o caminho.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Deus que conhece', resumo: 'Barth vê em Jó a declaração de que Deus não é uma abstração — Ele é o Deus que sabe, que conhece, que está presente. O conhecimento divino é pessoal, não impessoal.', citacao: '«Deus não é um observador distante — Ele é o Deus que conhece o caminho do homem porque Ele mesmo o percorre.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Confiança na provação', resumo: 'Stott vê em Jó 23:10 o modelo de confiança em meio à provação. Jó não compreende, mas confia — e essa fé é mais valiosa que a compreensão.', citacao: '«A fé de Jó nos ensina que não precisamos entender tudo para confiar em Deus — basta saber que Ele sabe.»' },
    ],
  },
  {
    livro: 'jó', capitulo: 28, versiculo: 12,
    tema: 'Mas a sabedoria onde se achará?',
    contexto: 'O poema sobre a sabedoria — Jó investiga onde se encontra a sabedoria verdadeira, e conclui que ela está em Deus.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Sabedoria divina', resumo: 'Agostinho vê em Jó 28 a busca pela sabedoria que só pode ser encontrada em Deus. A sabedoria não está nas profundezas da terra ou nos oceanos — está no coração de Deus.', citacao: '«A sabedoria não se compra com ouro — ela é dom de Deus para aqueles que O temem.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Sapientia Dei', resumo: 'Aquino interpreta este poema como a busca pela sabedoria divina — a sapientia que está acima de toda ciência humana. A sabedoria verdadeira é conhecer a Deus.', citacao: '«A sabedoria humana é limitada — a sabedoria divina é infinita e se encontra no temor do Senhor.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Limitação humana', resumo: 'Calvino enfatiza que o poema mostra os limites da sabedoria humana. O homem pode escavar a terra, mas não encontra a sabedoria — porque ela é revelação divina.', citacao: '«O homem pode tudo escavar menos a sabedoria — pois ela não está na terra, mas no céu.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação da sabedoria', resumo: 'Barth vê em Jó 28 a preparação para a revelação de Deus. A sabedoria não é conquista humana — é dádiva divina que se revela em Cristo.', citacao: '«A sabedoria de Deus não é encontrada pelo homem — ela vem ao homem em Jesus Cristo.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Temor do Senhor', resumo: 'Stott vê em Jó 28:28 a conclusão do poema — o temor do Senhor é a sabedoria. Não é conhecimento acadêmico, mas reverência diante de Deus.', citacao: '«A sabedoria não está em sabiologia — está no temor do Senhor, que é o princípio de toda sabedoria.»' },
    ],
  },
  {
    livro: 'jó', capitulo: 33, versiculo: 14,
    tema: 'Deus fala de um modo, e de outro',
    contexto: 'Elihu revela que Deus se comunica de diversas maneiras — através de sonhos, visões e sofrimento — para chamar a atenção do homem.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Revelação múltipla', resumo: 'Agostinho vê em Jó 33 a doutrina da revelação generalizada — Deus fala através da natureza, da consciência e dos eventos. O homem precisa ouvir.', citacao: '«Deus não se cala — Ele fala através de todas as coisas, mas o homem nem sempre ouve.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Comunicação divina', resumo: 'Aquino interpreta os modos de comunicação divina como meios de graça — sonhos, visões e sofrimento são instrumentos pelos quais Deus chama o homem à conversão.', citacao: '«Deus se comunica de múltiplas formas para que o homem não tenha desculpas para ignorá-Lo.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Palavra e Espírito', resumo: 'Calvino enfatiza que Deus fala através da Palavra e do Espírito. O sofrimento pode ser um modo de Deus falar — não para castigar, mas para despertar.', citacao: '«Deus fala duas vezes — pela Sua Palavra e pelo Seu Espírito. O sofrimento pode ser o altifalante de Deus.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Palavra de Deus', resumo: 'Barth vê em Jó 33 a preparação para a doutrina da Palavra de Deus. Deus fala — e quando fala, Ele se revela. A revelação não é ideia, mas evento.', citacao: '«Deus não é mudo — Ele fala, e quando fala, tudo muda.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Voz de Deus', resumo: 'Stott vê em Jó 33 a insistência de que Deus se comunica pessoalmente. Ele não é uma força distante — é um Pai que fala com seus filhos através de vários meios.', citacao: '«Deus fala através da Escritura, da oração, da comunidade e até do sofrimento — Ele nunca para de falar.»' },
    ],
  },
  {
    livro: 'jó', capitulo: 38, versiculo: 4,
    tema: 'Onde estavas tu quando eu fundei a terra?',
    contexto: 'Deus responde a Jó do redemoinho com uma série de perguntas retóricas que revelam Sua soberania sobre toda a criação.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Transcendência divina', resumo: 'Agostinho vê em Jó 38 a demonstração da transcendência de Deus — o homem não estava presente na criação, então não pode questionar o Criador. A humildade é a resposta ao mistério.', citacao: '«Deus não responde às perguntas de Jó — Ele faz perguntas que nenhum homem pode responder.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Causa primeira', resumo: 'Aquino argumenta que Jó 38 demonstra Deus como causa primeira de tudo. O homem é criatura — depende completamente do Criador para existir.', citacao: '«Deus é o fundamento de todo ser — sem Ele, nada existe, nem mesmo a pergunta.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania absoluta', resumo: 'Calvino vê em Jó 38 a declaração definitiva da soberania de Deus. Deus governa tudo — desde as constelações até os animais selvagens. Nenhuma detalhe escapa ao Seu controle.', citacao: '«Deus governa tudo com perfeita sabedoria — e o homem não tem direito de questionar o que não compreende.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Deus incontrolável', resumo: 'Barth vê em Jó 38 o Deus que não pode ser controlado ou domesticado pelo pensamento humano. Deus é livre — e essa liberdade é o âmago de Sua soberania.', citacao: '«Deus não é um deus que o homem pode colocar em sua caixa de teologia — Ele é o Deus que vem do redemoinho.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Admirável criação', resumo: 'Stott vê em Jó 38 a maravilha da criação como testemunho da sabedoria de Deus. Cada detalhe da natureza é uma lição de soberania divina.', citacao: '«As perguntas de Deus em Jó 38 são as lições mais profundas de teologia natural — a criação revela o Criador.»' },
    ],
  },
  {
    livro: 'jó', capitulo: 40, versiculo: 2,
    tema: 'Acusarás o Todo-Poderoso?',
    contexto: 'Deus desafia Jó a considerar se ele realmente pode contestar o Juiz de toda a terra. A pergunta é retórica: quem é o homem para acusar a Deus?',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Justiça divina', resumo: 'Agostinho vê aqui a reafirmação da justiça de Deus — o homem não pode acusar a Deus porque Deus é perfeitamente justo. O que parece injusto aos nossos olhos é justo aos olhos de Deus.', citacao: '«Deus não pode ser acusado — pois Ele é a própria justiça. O que parece injusto é na verdade sabedoria infinita.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Juiz supremo', resumo: 'Aquino argumenta que Deus é o juiz supremo e não pode ser julgado pelo homem. A criação é prova da justiça divina — Deus governa com perfeição.', citacao: '«O homem é parte da criação — como pode julgar o Criador? A submissão é a resposta racional.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania e humildade', resumo: 'Calvino enfatiza que a pergunta de Deus é um chamado à humildade. Não se acusa o Todo-Poderoso — se O adora. A adoração é a resposta ao mistério.', citacao: '«A resposta ao sofrimento não é acusação — é adoração diante da majestade de Deus.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Deus como juiz', resumo: 'Barth vê em Jó 40 o Deus que se apresenta como juiz — não para condenar Jó, mas para revelar que Ele é o único apto para julgar. O homem é réu, não juiz.', citacao: '«Deus não é acusado — Ele acusa. E quando acusa, é misericórdia, não vingança.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Submissão reverente', resumo: 'Stott vê em Jó 40 o chamado à submissão reverente. Não devemos acusar Deus, mas confiar em sua sabedoria, mesmo quando não compreendemos.', citacao: '«A submissão a Deus não é passividade — é reconhecer que Ele é Deus e nós não somos.»' },
    ],
  },
  {
    livro: 'jó', capitulo: 42, versiculo: 5,
    tema: 'Eu te conhecia de ouvir, mas agora te vejo',
    contexto: 'Jó finalmente encontra Deus face a face. Seu conhecimento passa de segunda mão (ouvir) para experiência direta (ver).',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Conhecimento experimental', resumo: 'Agostinho vê em Jó 42:5 o culminar da jornada espiritual — o conhecimento de Deus que vem da experiência, não do raciocínio. Jó passou de ouvir falar de Deus a conhecê-Lo pessoalmente.', citacao: '«O verdadeiro conhecimento de Deus não vem dos livros, mas do encontro pessoal com Ele.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Visão beatífica', resumo: 'Aquino interpreta «ver» como antecipação da visão beatífica — o conhecimento direto de Deus que é a felicidade última. Jó experimentou um prelúdio da glória eterna.', citacao: '«Ver Deus face a face é a beatitude última — e Jó teve um vislumbre dessa realidade.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Conhecimento vivencial', resumo: 'Calvino enfatiza a transformação que o conhecimento vivencial de Deus produz. Jó não apenas sabia de Deus — ele O encontrou. E esse encontro muda tudo.', citacao: '«Há diferença entre falar de Deus e falar COM Deus — Jó fez a transição.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Encontro com Deus', resumo: 'Barth vê em Jó 42:5 o momento do encontro — o kairós divino. Deus não é conceito; é realidade viva que se impõe ao homem. O encontro destrói os ídolos teológicos.', citacao: '«O conhecimento de Deus não é informação — é encontro. E no encontro, tudo é destruído e reconstruído.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Relação pessoal', resumo: 'Stott vê em Jó 42:5 a essência da fé cristã — não é religião de rituais, mas relação pessoal com Deus. Jó deixou de ser religioso para ser devoto.', citacao: '«A fé não é saber sobre Deus — é conhecê-Lo. E quando O conhecemos, nunca mais somos os mesmos.»' },
    ],
  },
  {
    livro: 'jó', capitulo: 42, versiculo: 10,
    tema: 'O Senhor restaurou a Jó',
    contexto: 'Após interceder por seus amigos, Jó recebe o dobro de tudo o que havia perdido. A restauração divina é o epílogo da história.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Restauração divina', resumo: 'Agostinho vê na restauração de Jó um prelúdio da restauração escatológica — Deus restaurará tudo o que o sofrimento roubou. A justiça divina será plenamente revelada.', citacao: '«Deus não apenas devolve — Ele restaura em dobro. A graça supera a perda.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Retribuição futura', resumo: 'Aquino interpreta a restauração como antecipação da recompensa futura — Deus compensará todo sofrimento do justo na vida eterna. O sofrimento presente é momentâneo.', citacao: '«A restauração de Jó é imagem da recompensa eterna — Deus não fica em dívida com o justo.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça e misericórdia', resumo: 'Calvino enfatiza que a restauração é graça, não merecimento. Jó não fez nada para merecer o dobro — Deus, em Sua misericórdia, restaurou tudo.', citacao: '«A restauração de Jó é pura graça — Deus dá porque é bom, não porque somos dignos.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Novo começo', resumo: 'Barth vê na restauração de Jó o sinal de que Deus sempre dá um novo começo. O passado não define o futuro — Deus pode transformar tudo.', citacao: '«Deus é o Deus dos novos começos — e a restauração de Jó é prova disso.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Fidelidade divina', resumo: 'Stott vê em Jó 42:10 a fidelidade de Deus em cumprir Suas promessas. Deus não abandona os que Sua — Ele restaura, renova e abençoa.', citacao: '«A história de Jó é a história da fidelidade de Deus — Ele nunca abandona os seus.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // NAUM
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'na', capitulo: 1, versiculo: 2,
    tema: 'O Deus zeloso e vingador',
    contexto: 'Naum anuncia a queda de Nínive, capital do império Assírio, que destruiu o reino do norte de Israel em 722 a.C.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Justiça divina', resumo: 'Agostinho vê em Naum a revelação da justiça divina — Deus é paciente mas não eterno em Sua tolerância.', citacao: '«Deus é paciente, mas não eterno em Sua paciência — o pecado encontrará seu fim.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Providência divina', resumo: 'Aquino interpreta a vingança de Deus como expressão da providência — Deus usa nações como instrumentos para cumprir Seus propósitos.', citacao: '«A vingança de Deus não é arbítrio — é a ordem da providência se cumprindo.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania absoluta', resumo: 'Calvino enfatiza que Deus é soberano sobre todas as nações — Nínive caiu porque Deus assim determinou.', citacao: '«Deus é senhor de todas as nações — Nínive cai porque Ele assim quis.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação divina', resumo: 'Barth vê em Naum a revelação do Deus que se opõe ao poder opressor — Deus está do lado dos oprimidos.', citacao: '«O Deus de Naum é o Deus que se opõe ao poder opressor.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Fidelidade às promessas', resumo: 'Stott vê em Naum a fidelidade de Deus em cumprir as maldições da aliança.', citacao: '«Deus cumpre tanto as bênçãos quanto as maldições da Sua aliança.»' },
    ],
  },
  {
    livro: 'na', capitulo: 1, versiculo: 7,
    tema: 'Refúgio no dia da aflição',
    contexto: 'No meio da tempestade do julgamento, Naum oferece uma palavra de consolo: Deus é um refúgio para os que Nele confiam.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Deus como rocha', resumo: 'Agostinho vê em Deus o refúgio permanente — quando tudo desmorona, Deus é a rocha que não se move.', citacao: '«Deus é a rocha que não se move — mesmo quando o mundo desmorona.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Virtude da esperança', resumo: 'Aquino vê neste versículo a virtude da esperança — Deus é refúgio não apenas do perigo físico, mas de todo mal.', citacao: '«A esperança é a virtude que nos leva a Deus como refúgio de todo mal.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Proteção divina', resumo: 'Calvino enfatiza que Deus protege Seu povo mesmo no meio do julgamento.', citacao: '«Deus protege Seu povo mesmo no meio do julgamento.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Graça no julgamento', resumo: 'Barth vê em Deus o refúgio que está presente mesmo no julgamento.', citacao: '«Deus está presente até no julgamento — Ele é o refúgio do crente.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Segurança em Deus', resumo: 'Stott vê em Deus o refúgio seguro — mesmo quando o mundo é perigoso, Nele encontramos proteção.', citacao: '«Em Deus encontramos proteção e paz mesmo no meio do perigo.»' },
    ],
  },
  {
    livro: 'na', capitulo: 1, versiculo: 15,
    tema: 'Alegria pela libertação',
    contexto: 'Naum anuncia que os oprimidos podem se alegrar porque Deus vai julgar Nínive e libertar Seu povo.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Libertação escatológica', resumo: 'Agostinho vê neste versículo uma antecipação da libertação final — Deus julgará todos os opressores.', citacao: '«A alegria do crente é antecipação da vitória final de Deus.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Beatitude', resumo: 'Aquino vê na alegria a realização da beatitude — Deus é a causa última de toda alegria verdadeira.', citacao: '«A verdadeira alegria vem de Deus — Ele é a causa da nossa felicidade.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Libertação do pecado', resumo: 'Calvino vê na alegria não apenas libertação política, mas espiritual — Deus liberta do pecado e da morte.', citacao: '«A maior libertação é do pecado — e isso é motivo de alegria eterna.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Evangelho', resumo: 'Barth vê em Naum 1:15 um anúncio do evangelho — Deus liberta e chama à alegria.', citacao: '«Naum é um anúncio do evangelho — Deus liberta e chama à alegria.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Celebração da justiça', resumo: 'Stott vê na alegria a celebração da justiça de Deus.', citacao: '«Quando Deus age, o povo se alegra porque vê Sua fidelidade.»' },
    ],
  },
  {
    livro: 'na', capitulo: 2, versiculo: 2,
    tema: 'Deus restaura o que foi roubado',
    contexto: 'Nínive será destruída porque roubou e destruiu Israel. Deus promete restaurar o que foi tirado.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Restauração divina', resumo: 'Agostinho vê em Deus o restaurador de tudo — o que o pecado roubou, Deus devolve.', citacao: '«Deus restaura tudo o que o pecado roubou — sua justiça é completa.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Retribuição', resumo: 'Aquino vê na destruição de Nínive a retribuição divina — Deus paga com a mesma moeda aos que oprimem.', citacao: '«Deus retribui segundo as obras — quem oprime será oprimido.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Providência', resumo: 'Calvino vê na restauração a providência divina — Deus cuida do Seu povo.', citacao: '«Deus cuida do Seu povo e não permite que o mal prevaleça.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Novo começo', resumo: 'Barth vê na restauração o sinal de que Deus sempre dá um novo começo.', citacao: '«Deus é o Deus dos novos começos — Ele restaura o que foi destruído.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Fidelidade', resumo: 'Stott vê na restauração a fidelidade de Deus em cumprir Suas promessas.', citacao: '«Deus cumpre Suas promessas de restauração para os oprimidos.»' },
    ],
  },
  {
    livro: 'na', capitulo: 2, versiculo: 13,
    tema: 'A espada devoradora do Senhor',
    contexto: 'Deus usa Nínive como instrumento de julgamento contra Israel, mas agora Ele vai julgar a própria Nínive.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Julgamento duplo', resumo: 'Agostinho vê aqui o princípio do julgamento duplo — Deus usa nações para disciplinar, mas depois julga as nações.', citacao: '«Deus usa nações como instrumentos, mas depois as julga por seus pecados.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Providência', resumo: 'Aquino vê na espada divina a expressão da providência — Deus controla até os impérios.', citacao: '«Deus controla até os impérios para cumprir Seus propósitos.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Calvino enfatiza a soberania de Deus sobre todas as nações — Nínive pensava ser invencível.', citacao: '«Nenhum império é invencível — Deus é mais poderoso que todos.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Julgamento dos poderosos', resumo: 'Barth vê em Deus o juiz dos poderosos — os que exercem violência serão julgados.', citacao: '«Deus é o juiz dos poderosos — a violência será julgada.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Justiça divina', resumo: 'Stott vê na espada divina a justiça de Deus.', citacao: '«Deus não permite que o pecado fique sem punição — Sua justiça é perfeita.»' },
    ],
  },
  {
    livro: 'na', capitulo: 3, versiculo: 5,
    tema: 'Deus expõe a impiedade',
    contexto: 'Deus vai expor publicamente os pecados de Nínive — suas mentiras, roubos e violência serão revelados.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Luz da verdade', resumo: 'Agostinho vê em Deus a luz que expõe as trevas — nada fica escondido do Seu olhar.', citacao: '«Deus é a luz que expõe as trevas — nada fica escondido do Seu olhar.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Justiça', resumo: 'Aquino vê na exposição divina a expressão da justiça — Deus não permite que o pecado fique escondido.', citacao: '«A justiça de Deus exige que o pecado seja exposto.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Verdade', resumo: 'Calvino enfatiza que Deus é a verdade e expõe todas as mentiras.', citacao: '«Deus é a verdade e expõe todas as mentiras.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação', resumo: 'Barth vê em Deus o revelador — Ele expõe o que está escondido e chama à verdade.', citacao: '«Deus revela e confronta — Ele expõe o que está escondido.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Verdade divina', resumo: 'Stott vê em Deus a verdade que expõe o engano.', citacao: '«Deus é a verdade que expõe todo engano.»' },
    ],
  },
  {
    livro: 'na', capitulo: 3, versiculo: 19,
    tema: 'Consolo para os aflitos',
    contexto: 'Apesar da destruição de Nínive, Deus traz consolo para os aflitos. Ele cura os feridos e restaura o que foi quebrado.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cura divina', resumo: 'Agostinho vê em Deus o curador das almas — Ele cura as feridas do pecado.', citacao: '«Deus cura as feridas do pecado e restaura a paz interior.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Misericórdia', resumo: 'Aquino vê no consolo a misericórdia divina — Deus não apenas julga, mas também consola.', citacao: '«A misericórdia de Deus se manifesta no consolo aos aflitos.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'Calvino enfatiza que Deus é fonte de toda consolação.', citacao: '«Deus é a fonte de toda consolação — Ele restaura a esperança.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Esperança', resumo: 'Barth vê em Deus a esperança para os desesperançados.', citacao: '«Deus traz consolo no meio da destruição — Ele é a esperança.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Restauração', resumo: 'Stott vê em Deus o restaurador — Ele não apenas consola, mas restaura.', citacao: '«Deus restaura o que foi perdido — Ele é o consolo dos aflitos.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // SOFONIAS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'sf', capitulo: 1, versiculo: 2,
    tema: 'Deus varrerá tudo com vassoura de destruição',
    contexto: 'Sofonias propheta a julgamento total sobre Judá e Jerusalém. A ira de Deus será derramada sobre todos — idólatras, apóstatas e os tranquilos.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Julgamento universal', resumo: 'Agostinho vê em Sofonias o anúncio do julgamento que atinge todos — ninguém escapa da justiça divina.', citacao: '«A vassoura de Deus varre todos — ninguém escapa da Sua justiça.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Punição do pecado', resumo: 'Aquino vê na destruição a punição pelo pecado — Deus não tolera a idolatria e a rebelião.', citacao: '«Deus pune o pecado porque é santo — a destruição é consequência da idolatria.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania divina', resumo: 'Calvino enfatiza que Deus é soberano sobre o julgamento — Ele varre o que é impuro porque é santo.', citacao: '«Deus varre o impuro porque é santo — Sua soberania se manifesta no julgamento.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Confronto divino', resumo: 'Barth vê em Sofonias o confronto de Deus com a complacência humana — Deus não aceita a indiferença.', citacao: '«Deus não aceita a complacência — Ele confronta a indiferença.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Santidade divina', resumo: 'Stott vê no julgamento a expressão da santidade de Deus — Ele não pode tolerar o pecado.', citacao: '«A santidade de Deus exige o julgamento do pecado.»' },
    ],
  },
  {
    livro: 'sf', capitulo: 1, versiculo: 14,
    tema: 'O dia do Senhor se aproxima',
    contexto: 'Sofonias descreve o "dia do Senhor" como um dia de trevas e aflição, não de luz. É um aviso urgente de que o julgamento está próximo.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Escatologia', resumo: 'Agostinho vê no dia do Senhor a antecipação do julgamento final — o dia em que Deus julgará todos.', citacao: '«O dia do Senhor é o dia do julgamento final — e ele se aproxima.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Alerta', resumo: 'Aquino vê no dia do Senhor um alerta para a conversão — Deus chama os pecados ao arrependimento.', citacao: '«O dia do Senhor é um chamado à conversão — antes que seja tarde.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Certeza do julgamento', resumo: 'Calvino enfatiza a certeza do julgamento — o dia do Senhor virá, e os pecados serão julgados.', citacao: '«O dia do Senhor é certo — os pecados serão julgados.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Kairos', resumo: 'Barth vê no dia do Senhor o kairos — o momento decisivo de Deus que transforma a história.', citacao: '«O dia do Senhor é o kairos — o momento decisivo de Deus.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Preparação', resumo: 'Stott vê no dia do Senhor um chamado à preparação — devemos viver prontos para Sua vinda.', citacao: '«Devemos viver prontos para o dia do Senhor — ele pode chegar a qualquer momento.»' },
    ],
  },
  {
    livro: 'sf', capitulo: 2, versiculo: 3,
    tema: 'Busquem ao Senhor, todos os mansos',
    contexto: 'No meio do julgamento, Sofonias faz um apelo: busquem ao Senhor, os mansos da terra, que buscam a justiça. Talvez sejam escondidos no dia da ira.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Misericórdia no julgamento', resumo: 'Agostinho vê neste versículo a misericórdia de Deus no meio do julgamento — há chance de arrependimento.', citacao: '«Deus oferece misericórdia mesmo no julgamento — há chance de arrependimento.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Humildade', resumo: 'Aquino vê nos mansos os humildes que reconhecem sua dependência de Deus — eles serão protegidos.', citacao: '«Os humildes são protegidos porque reconhecem sua dependência de Deus.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eleição', resumo: 'Calvino vê nos mansos os eleitos de Deus — eles serão escondidos no dia do julgamento.', citacao: '«Os eleitos de Deus serão escondidos no dia do julgamento.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Graça', resumo: 'Barth vê neste versículo a graça de Deus que busca os mansos — Deus não quer a destruição, mas a salvação.', citacao: '«Deus busca os mansos — Ele não quer a destruição, mas a salvação.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Busca de Deus', resumo: 'Stott vê neste versículo o chamado à busca de Deus — devemos buscá-Lo com humildade.', citacao: '«Deus chama os mansos a buscá-Lo — e Ele se faz encontrar.»' },
    ],
  },
  {
    livro: 'sf', capitulo: 3, versiculo: 9,
    tema: 'Deus purificará os lábios do povo',
    contexto: 'Sofonias anuncia que Deus purificará os lábios do povo para que invoquem Seu nome e O sirvam de comum acordo.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Purificação interior', resumo: 'Agostinho vê na purificação dos lábios a transformação interior — Deus muda o coração para que a língua declare Sua glória.', citacao: '«Deus purifica o coração primeiro, e a língua segue — a mudança é interior.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Graça santificante', resumo: 'Aquino vê na purificação a graça santificante — Deus transforma o homem para que possa servi-Lo.', citacao: '«A graça santificante transforma o homem para que possa servir a Deus.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Regeneração', resumo: 'Calvino vê na purificação a regeneração — Deus cria um novo povo com lápios que declaram Sua glória.', citacao: '«Deus regenera o povo para que declare Sua glória com lápios puros.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Novo começo', resumo: 'Barth vê na purificação o novo começo que Deus oferece — Ele não destrói, mas transforma.', citacao: '«Deus não destrói — Ele transforma e oferece um novo começo.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Unidade', resumo: 'Stott vê na purificação dos lábios a unidade do povo de Deus — lápios puros levam à adoração em comunhão.', citacao: '«Lápios puros levam à adoração em comunhão — Deus purifica para unir.»' },
    ],
  },
  {
    livro: 'sf', capitulo: 3, versiculo: 17,
    tema: 'O Senhor teu Deus está no meio de ti',
    contexto: 'Uma das promessas mais bonitas de Sofonias: Deus está no meio do Seu povo, guerreiro que salva, e se alegra sobre eles com cânticos.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Presença divina', resumo: 'Agostinho vê na presença de Deus no meio do povo a réalidade da encarnação — Deus se faz próximo.', citacao: '«Deus está no meio do povo — Ele se faz próximo e guerreiro que salva.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Providência', resumo: 'Aquino vê na presença divina a providência — Deus não abandona Seu povo, mas está presente para salvá-lo.', citacao: '«Deus está presente para salvar — Sua providência não falha.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Alegria divina', resumo: 'Calvino vê em Deus que se alegra sobre o povo a Sua alegria em salvar — Deus não salva por obrigação, mas por amor.', citacao: '«Deus se alegra em salvar — Ele não salva por obrigação, mas por amor.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Graça presente', resumo: 'Barth vê em Deus presente no meio do povo a graça que já chegou — Deus não é futuro, é presente.', citacao: '«Deus já está no meio do povo — a graça é presente, não apenas futuro.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Comunhão', resumo: 'Stott vê na presença de Deus a comunhão — Ele está no meio do povo para estar em relação com eles.', citacao: '«Deus está no meio do povo para estar em relação — a comunhão é Sua vontade.»' },
    ],
  },
  {
    livro: 'sf', capitulo: 3, versiculo: 20,
    tema: 'Deus reunirá e restaurará o povo',
    contexto: 'Sofonias encerra com a promessa de que Deus reunirá o povo disperso e trará de volta os exilados. A restauração é certa.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Reunião escatológica', resumo: 'Agostinho vê na reunião do povo a antecipação da reunião final — Deus juntará todos os Seus no fim dos tempos.', citacao: '«Deus juntará todos os Seus — a reunião final é certa.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Restauração', resumo: 'Aquino vê na restauração a promessa de Deus de devolver o que foi perdido — Deus é fiel.', citacao: '«Deus é fiel e restaura o que foi perdido — Sua promessa é certa.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eleição', resumo: 'Calvino vê na reunião a reunião dos eleitos — Deus chama de todas as nações os que são dEle.', citacao: '«Deus chama os eleitos de todas as nações — a reunião é universal.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Nova aliança', resumo: 'Barth vê na restauração a nova aliança — Deus faz tudo novo e reúne o povo em comunhão.', citacao: '«Deus faz tudo novo — a restauração é a nova aliança.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Fidelidade', resumo: 'Stott vê na restauração a fidelidade de Deus em cumprir Suas promessas — Ele não abandona os Seus.', citacao: '«Deus cumpre Suas promessas de restauração — Ele nunca abandona os Seus.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // LEVÍTICO
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'lv', capitulo: 1, versiculo: 3,
    tema: 'Holocausto: offering que sobe como aroma agradável',
    contexto: 'Levítico abre com as instruções para os sacrifícios. O holocausto é a oferta mais completa — o animal é queimado inteiro, representando a entrega total a Deus.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Alegoria cristológica', resumo: 'Agostinho vê no holocausto a figura de Cristo que se ofereceu completamente por nós — o aroma agradável é a obediência perfeita de Cristo.', citacao: '«Cristo é o holocausto perfeito — Sua obediência é aroma agradável a Deus.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Sacrifício propiciatório', resumo: 'Aquino vê no holocausto a satisfação da honra de Deus — o pecado ofende a Deus, e o sacrifício satisfaz essa ofensa.', citacao: '«O holocausto satisfaz a honra de Deus ofendida pelo pecado.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Tipologia', resumo: 'Calvino vê no holocausto uma sombra das realidades celestiais — o sacrifício terrestre aponta para o sacrifício celestial de Cristo.', citacao: '«O holocausto é sombra — Cristo é a realidade.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Reconciliação', resumo: 'Barth vê no holocausto o ato de reconciliação — Deus aceita o sacrifício e se reconcilia com o povo.', citacao: '«O holocausto é o ato de reconciliação — Deus aceita e se reconcilia.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Substituição', resumo: 'Stott vê no holocausto o princípio da substituição — o animal morre no lugar do pecador, apontando para Cristo.', citacao: '«O holocausto ensina a substituição — o animal morre no lugar do pecador.»' },
    ],
  },
  {
    livro: 'lv', capitulo: 16, versiculo: 30,
    tema: 'O Dia da Expiação (Yom Kippur)',
    contexto: 'O versículo central de Levítico — no décimo dia do sétimo mês, o sacerdote faz expiação por todo Israel. É o dia mais sagrado do calendário judaico.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Purificação universal', resumo: 'Agostinho vê no Yom Kippur a figura da purificação universal que Cristo realizou — Ele purificou não apenas Israel, mas todo o mundo.', citacao: '«Cristo é nosso Yom Kippur — Ele purificou todo o mundo.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Satisfação', resumo: 'Aquino vê no dia da expiação a satisfação plena — o pecado é removido completamente pela graça de Deus.', citacao: '«A expiação é satisfação plena — o pecado é removido pela graça.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Expiação definitiva', resumo: 'Calvino vê no Yom Kippur a expiação definitiva de Cristo — não há mais necessidade de sacrifícios anuais.', citacao: '«Cristo é a expiação definitiva — não há mais necessidade de sacrifícios.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Reconciliação total', resumo: 'Barth vê no dia da expiação a reconciliação total — Deus não apenas perdoa, mas se reconcilia completamente.', citacao: '«A expiação é reconciliação total — Deus se reconcilia plenamente.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Substituição vicária', resumo: 'Stott vê no Yom Kippur a substituição vicária — o bode emissário leva os pecados para longe, como Cristo.', citacao: '«O bode emissário leva os pecados para longe — Cristo faz o mesmo por nós.»' },
    ],
  },
  {
    livro: 'lv', capitulo: 19, versiculo: 18,
    tema: 'Amarás o teu próximo como a ti mesmo',
    contexto: 'O mandamento mais citado por Jesus — amar o próximo como a si mesmo. É o resumo da Lei e da Profecias, e o fundamento da ética cristã.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor como Lei', resumo: 'Agostinho vê neste mandamento o resumo de toda a Lei — quem ama, cumpre tudo. O amor é o fundamento.', citacao: '«Ame, e faça o que quiser — se amar, não fará o que é proibido.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Lei natural', resumo: 'Aquino vê no amor ao próximo a lei natural gravada no coração — todos os homens conhecem esse mandamento.', citacao: '«Amar o próximo é lei natural — todos os homens a conhecem.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Summa da Lei', resumo: 'Calvino vê neste mandamento a summa da Lei — Deus e o próximo são os dois pilares da vida cristã.', citacao: '«A Lei se resume em dois pilares: Deus e o próximo.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Humanidade reconciliada', resumo: 'Barth vê no amor ao próximo a humanidade reconciliada — em Cristo, todos são irmãos.', citacao: '«Em Cristo, todos são irmãos — o amor ao próximo é a humanidade reconciliada.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Ética cristã', resumo: 'Stott vê neste mandamento o fundamento da ética cristã — o amor prático ao próximo é a marca do discípulo.', citacao: '«O amor prático ao próximo é a marca do discípulo de Cristo.»' },
    ],
  },
  {
    livro: 'lv', capitulo: 20, versiculo: 8,
    tema: 'Santos porque o Senhor é santo',
    contexto: 'Deus comanda santidade porque Ele é santo. A santidade não é opcional — é o propósito da aliança. Deus separa o povo para Si.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Santificação', resumo: 'Agostinho vê na santidade o objetivo da criação — Deus criou o homem para ser santo, à Sua imagem.', citacao: '«Deus criou o homem para ser santo — a santidade é o propósito da criação.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Graça santificante', resumo: 'Aquino vê na santidade o fruto da graça santificante — Deus dá a graça para que o homem seja santo.', citacao: '«A graça santificante é o meio Deus usa para tornar o homem santo.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Santificação_progressiva', resumo: 'Calvino vê na santidade um processo — o crente é santificado gradualmente pela Palavra e pelo Espírito.', citacao: '«A santificação é um processo — o crente cresce em santidade pela Palavra e pelo Espírito.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Reino de Deus', resumo: 'Barth vê na santidade a vida no Reino de Deus — ser santo é viver na realidade do Reino presente.', citacao: '«Ser santo é viver na realidade do Reino de Deus presente.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Chamado à santidade', resumo: 'Stott vê na santidade um chamado — Deus não apenas pede santidade, mas dá os meios para alcançá-la.', citacao: '«Deus não apenas pede santidade — Ele dá os meios para alcançá-la.»' },
    ],
  },
  {
    livro: 'lv', capitulo: 25, versiculo: 10,
    tema: 'Ano do Jubileu: liberdade e restauração',
    contexto: 'A cada 50 anos, o Jubileu: escravos são libertos, terras retornam aos proprietários originais, dívidas são perdoadas. Uma revolução social e econômica.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Libertação espiritual', resumo: 'Agostinho vê no Jubileu a figura da libertação que Cristo traz — Ele liberta escravos do pecado e restaura a dignidade.', citacao: '«Cristo é nosso Jubileu — Ele liberta e restaura a dignidade perdida.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Justiça social', resumo: 'Aquino vê no Jubileu a justiça social — Deus não aceita desigualdade extrema, e o Jubileu corrige as distorções.', citacao: '«O Jubileu é justiça social — Deus corrige as distorções da economia.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'Calvino vê no Jubileu a graça de Deus que restaura — Deus não abandona os caídos, mas os levanta.', citacao: '«O Jubileu é graça restauradora — Deus levanta os caídos.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Libertação', resumo: 'Barth vê no Jubileu a libertação dos oprimidos — Deus se pronuncia contra toda forma de escravidão.', citacao: '«Deus se pronuncia contra toda escravidão — o Jubileu é libertação.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Restauração', resumo: 'Stott vê no Jubileu a restauração completa — Deus restaura tudo: liberdade, propriedade e dignidade.', citacao: '«O Jubileu restaura tudo — liberdade, propriedade e dignidade.»' },
    ],
  },
  {
    livro: 'lv', capitulo: 26, versiculo: 12,
    tema: 'Eu andarei entre vós',
    contexto: 'Deus promete caminhar no meio do Seu povo, ser seu Deus e eles serão Seu povo. É a essência da aliança: presença divina.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Deus connosco', resumo: 'Agostinho vê na promessa de Deus andar entre o povo a anticipate da encarnação — Deus se faz presente entre os homens.', citacao: '«Deus anda entre nós — a aliança é presença divina.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Habitação divina', resumo: 'Aquino vê na habitação de Deus entre o povo a Sua generosidade — Deus se faz presente por amor.', citacao: '«Deus habita entre o povo por amor — Sua presença é dom.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Aliança', resumo: 'Calvino vê na promessa a essência da aliança — Deus se compromete a estar presente com Seu povo.', citacao: '«A aliança é compromisso de presença — Deus está conosco.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Reconciliação presente', resumo: 'Barth vê em Deus andando entre o povo a reconciliação presente — Deus já está conosco, não apenas promete estar.', citacao: '«Deus já está conosco — a reconciliação é presente, não apenas futuro.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Comunhão', resumo: 'Stott vê na promessa a comunhão — Deus quer estar em relação íntima com Seu povo.', citacao: '«Deus quer comunhão — Ele anda entre nós para estar em relação.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // NÚMEROS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'nm', capitulo: 6, versiculo: 24-26,
    tema: 'A bênção de Arão',
    contexto: 'A bênção sacerdotal mais antiga de Israel — "O Senhor te abençoe e te guarde" — usada até hoje na sinagoga e na igreja.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Graça trina', resumo: 'Agostinho vê na bênção de Arão uma revelação da Trindade — três versículos, três pessoas, uma bênção.', citacao: '«A bênção de Arão é trina — três versículos revelam um Deus que abençoa em três.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Graça eficiente', resumo: 'Aquino vê na bênção a graça eficiente — Deus não apenas deseja abençoar, mas efetivamente abençoa.', citacao: '«A bênção de Deus é eficiente — Ele não apenas deseja, mas realiza.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Promessa', resumo: 'Calvino vê na bênção uma promessa — Deus se compromete a abençoar e guardar Seu povo.', citacao: '«A bênção é promessa — Deus se compromete a abençoar e guardar.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Graça', resumo: 'Barth vê na bênção a graça que precede — Deus abençoa antes que o homem peça.', citacao: '«Deus abençoa antes que peçamos — Sua graça precede.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Bênção completa', resumo: 'Stott vê na bênção três dimensões: proteção (guarde), presença (face brilhe) e paz (rosto volto).', citacao: '«A bênção tem três dimensões: proteção, presença e paz.»' },
    ],
  },
  {
    livro: 'nm', capitulo: 11, versiculo: 29,
    tema: 'Todos profetizarão',
    contexto: 'Moisés, ao saber que setenta anciãos receberam o Espírito, expressa seu desejo de que todo o povo profetizasse. Marcos é punido por profetizar no acampamento.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Democratização do Espírito', resumo: 'Agostinho vê neste versículo a democratização do Espírito — Deus distribui Seus dons livremente.', citacao: '«Deus distribui Seus dons livremente — todos podem receber o Espírito.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Carismas', resumo: 'Aquino vê nos dons espirituais a graça distribuída — cada um recebe segundo a necessidade da comunidade.', citacao: '«Os dons são graça distribuída — cada um recebe para o bem da comunidade.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania do Espírito', resumo: 'Calvino vê no desejo de Moisés a soberania do Espírito — Ele distribui como quer, não como queremos.', citacao: '«O Espírito distribui como quer — não como os homens desejam.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Profecia universal', resumo: 'Barth vê em "todos profetizarão" a profecia universal — Deus fala por meio de todos os crentes.', citacao: '«Deus fala por todos os crentes — a profecia é universal.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Sacerdócio universal', resumo: 'Stott vê neste versículo o sacerdócio universal — todos têm acesso direto a Deus e ao Seu Espírito.', citacao: '«Todos têm acesso a Deus — o sacerdócio é universal.»' },
    ],
  },
  {
    livro: 'nm', capitulo: 14, versiculo: 4,
    tema: 'Deixemo-nos e voltemos para o Egito',
    contexto: 'Após os espias relatarem gigantes em Canaã, o povo reclama e quer voltar ao Egito. A incredulidade gera rebelião.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Incredulidade', resumo: 'Agostinho vê na rebelião o poder da incredulidade — o povo viu os milagres, mas esqueceu tudo diante do medo.', citacao: '«A incredulidade faz o povo esquecer os milagres — o medo é mais forte que a memória.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Pecado contra a fé', resumo: 'Aquino vê na rebelião um pecado contra a fé — o povo não confiou nas promessas de Deus.', citacao: '«A rebelião é pecado contra a fé — não confiar nas promessas de Deus.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Desobediência', resumo: 'Calvino vê na vontade de voltar ao Egito a desobediência pura — o povo preferiu a escravidão à liberdade.', citacao: '«O povo preferiu a escravidão à liberdade — desobediência é preferir o Egito.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Medo vs fé', resumo: 'Barth vê no medo do povo a antítese da fé — o medo paralisa, mas a fé liberta.', citacao: '«O medo paralisa — a fé liberta. O povo escolheu o medo.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Escolha', resumo: 'Stott vê no versículo uma escolha — o povo poderia confiar em Deus, mas escolheu a rebelião.', citacao: '«A fé é uma escolha — o povo poderia confiar, mas escolheu rebelar-se.»' },
    ],
  },
  {
    livro: 'nm', capitulo: 21, versiculo: 8-9,
    tema: 'A serpente de bronze',
    contexto: 'Deus ordena que Moisés faça uma serpente de bronze e a coloque num poste — quem olhar para ela será curado. Jesus cita este evento em João 3:14.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Tipologia cristológica', resumo: 'Agostinho vê na serpente de bronze a figura de Cristo — assim como a serpente curava quem olhava, Cristo salva quem O contempla.', citacao: '«Cristo é nossa serpente de bronze — quem O contempla é salvo.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Fé visual', resumo: 'Aquino vê na serpente o ato de fé — o povo precisava olhar, e o olhar era ato de fé em Deus.', citacao: '«Olhar para a serpente era ato de fé — a fé se manifesta na ação.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'Calvino vê na serpente a graça gratuita — Deus cura sem mérito, apenas pela fé no que Ele ordenou.', citacao: '«Deus cura gratuitamente — a serpente é graça, não merecimento.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Cristo elevado', resumo: 'Barth vê na serpente elevada a cruz de Cristo — assim como a serpente foi erguida, Cristo foi elevado para salvar.', citacao: '«Cristo é a serpente erguida — Ele é elevado para salvar.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Substituição', resumo: 'Stott vê na serpente a substituição — o povo merecia morrer, mas Deus ofereceu um meio de salvação.', citacao: '«O povo merecia morrer, mas Deus ofereceu salvação — a serpente é substituição.»' },
    ],
  },
  {
    livro: 'nm', capitulo: 22, versiculo: 28,
    tema: 'Balaam e a jumenta que falou',
    contexto: 'Balaam, profeta pagão, é contratabal por Balac para amaldiçoar Israel. Uma jumenta vê o anjo do Senhor e fala — uma das cenas mais surpreendentes da Bíblia.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Souverania de Deus', resumo: 'Agostinho vê na jumenta que fala a soberania de Deus — até os animais obedecem a Deus quando os homens se rebelam.', citacao: '«Até a jumenta obedece a Deus quando o profeta se rebela — Sua soberania é total.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Providência', resumo: 'Aquino vê na jumenta o instrumento da providência — Deus usa meios inusitados para alcançar Seus propósitos.', citacao: '«Deus usa meios inusitados — até uma jumenta é instrumento da providência.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Cegueira espiritual', resumo: 'Calvino vê em Balaam a cegueira espiritual — o profeta via a jumenta, mas não via o anjo.', citacao: '«Balaam via a jumenta, mas não via o anjo — a cegueira espiritual é cega.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação', resumo: 'Barth vê na jumenta a revelação que vem de onde não se espera — Deus pode falar por qualquer meio.', citacao: '«Deus pode falar por qualquer meio — até por uma jumenta.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Advertência', resumo: 'Stott vê em Balaam uma advertência — o profeta foi guerreiro por dinheiro, mas Deus o usou para abençoar.', citacao: '«Balaam foi profeta por dinheiro — mas Deus o usou para abençoar.»' },
    ],
  },
  {
    livro: 'nm', capitulo: 27, versiculo: 18,
    tema: 'Joshué, homem de espírito',
    contexto: 'Deus escolhe Joshué para suceder Moisés — um homem em quem há espírito. É a transição de liderança no deserto.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Espírito Santo', resumo: 'Agostinho vê em Joshué a manifestação do Espírito — Deus escolhe quem tem Seu Espírito para liderar.', citacao: '«Deus escolhe quem tem Seu Espírito — o Espírito é a marca da liderança.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Autoridade', resumo: 'Aquino vê em Joshué a autoridade delegada — Deus delega autoridade para liderar o povo.', citacao: '«Deus delega autoridade — Joshué recebeu para liderar.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eleição', resumo: 'Calvino vê em Joshué a eleição divina — Deus escolheu antes que o povo soubesse.', citacao: '«Deus escolheu Joshué antes que o povo soubesse — a eleição é divina.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Chamado', resumo: 'Barth vê em Joshué o chamado divino — Deus chama e equipec com Seu Espírito.', citacao: '«Deus chama e equipec — Joshué recebeu o Espírito para cumprir.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Liderança', resumo: 'Stott vê em Joshué o modelo de liderança — liderar com o Espírito e a obediência.', citacao: '«Liderar é ter o Espírito e a obediência — Joshué é o modelo.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // 1 REIS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: '1rs', capitulo: 3, versiculo: 9,
    tema: 'Sábio coração para julgar',
    contexto: 'Salomão pede a Deus um coração sábio para julgar o povo. Deus se agrada e lhe dá não apenas sabedoria, mas também riqueza e gloria.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Sabedoria divina', resumo: 'Agostinho vê no pedido de Salomão a sabedoria que vem de Deus — não é sabedoria humana, mas divina.', citacao: '«A sabedoria verdadeira vem de Deus — Salomão pediu o que é mais importante.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Virtude da sabedoria', resumo: 'Aquino vê na sabedoria a virtude intelectual que ordena todas as coisas ao fim último — Deus.', citacao: '«A sabedoria ordena tudo a Deus — é a virtude suprema.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'Calvino vê na sabedoria de Salomão um dom de graça — Deus dá porque quer, não porque merecemos.', citacao: '«A sabedoria é dom de graça — Deus dá porque é bom.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação', resumo: 'Barth vê na sabedoria a revelação de Deus — o homem só é sábio quando recebe de Deus.', citacao: '«A sabedoria é revelação — o homem só é sábio quando recebe de Deus.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Prioridades', resumo: 'Stott vê no pedido de Salomão as prioridades corretas — ele pediu sabedoria em vez de riqueza.', citacao: '«Salomão pediu sabedoria — as prioridades certas levam às bênçãos.»' },
    ],
  },
  {
    livro: '1rs', capitulo: 8, versiculo: 27,
    tema: 'Deus não habita em templos feitos por mãos',
    contexto: 'Na dedicação do templo, Salomão reconhece que nem os céus dos céus podem conter a Deus — quanto mais este templo.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Transcendência', resumo: 'Agostinho vê na declaração de Salomão a transcendência de Deus — Ele é maior que qualquer criação.', citacao: '«Deus é maior que toda criação — o templo é símbolo, não contenção.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Infinidade', resumo: 'Aquino vê na declaração a infinidade de Deus — Ele não pode ser contido em nenhum lugar.', citacao: '«Deus é infinito — nenhum templo O contém.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Presença', resumo: 'Calvino vê no templo o símbolo da presença — Deus está presente, mas não limitado ao templo.', citacao: '«Deus está presente no templo, mas não é limitado por ele.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Mistério', resumo: 'Barth vê na declaração o mistério de Deus — Ele se revela, mas nunca é totalmente compreendido.', citacao: '«Deus é mistério — se revela, mas nunca é totalmente compreendido.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Adoração', resumo: 'Stott vê no templo o lugar de adoração — não porque Deus precisa, mas porque o homem precisa.', citacao: '«O templo é para o homem adorar — Deus não precisa, mas o homem sim.»' },
    ],
  },
  {
    livro: '1rs', capitulo: 11, versiculo: 4,
    tema: 'O coração de Salomão se desviou',
    contexto: 'Salomão, o mais sábio dos reis, caiu em idolatria por causa de suas mulheres estrangeiras. O aviso é claro: até os sábios podem cair.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Fragilidade humana', resumo: 'Agostinho vê na queda de Salomão a fragilidade humana — até o mais sábio pode cair se não vigiar.', citacao: '«Até o mais sábio pode cair — a vigilância é necessária sempre.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Pecado', resumo: 'Aquino vê na idolatria de Salomão o pecado de concupiscência — o desejo desordenado o afastou de Deus.', citacao: '«O desejo desordenado afasta de Deus — Salomão caiu pela concupiscência.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Advertência', resumo: 'Calvino vê em Salomão uma advertência — ninguém está seguro cair, mesmo os mais espirituais.', citacao: '«Ninguém está seguro — Salomão é advertência para todos.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Gravidade do pecado', resumo: 'Barth vê na queda de Salomão a gravidade do pecado — ele destrói até os mais sábios.', citacao: '«O pecado é grave — ele destrói até os mais sábios.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Vigilância', resumo: 'Stott vê em Salomão o chamado à vigilância — devemos guardar nossos corações.', citacao: '«Devemos guardar nossos corações — Salomão não guardou e caiu.»' },
    ],
  },
  {
    livro: '1rs', capitulo: 17, versiculo: 1,
    tema: 'Elias e a seca',
    contexto: 'Elias anuncia a seca em Israel como julgamento pela idolatria de Acabe e Jezabel. O profeta se esconde na ravina do Querite.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Julgamento', resumo: 'Agostinho vê na seca o julgamento de Deus — a idolatria tem consequências sobre a terra.', citacao: '«A idolatria tem consequências — a seca é julgamento de Deus.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Providência', resumo: 'Aquino vê na provisão no Querite a providência — Deus cuida de Elias mesmo no meio do julgamento.', citacao: '«Deus cuida de Elias no meio do julgamento — Sua providência não falha.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Calvino vê na seca a soberania de Deus — Ele controla a chuva e a terra.', citacao: '«Deus é soberano sobre a chuva e a terra — a seca é Sua vontade.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Profecia', resumo: 'Barth vê em Elias o profeta que confronta — Ele desafia o rei e a religião falsa.', citacao: '«Elias confronta o rei e a religião falsa — a profecia é confronto.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Coragem', resumo: 'Stott vê em Elias o modelo de coragem — ele desafiou o rei e confiou em Deus.', citacao: '«Elias é modelo de coragem — desafiou o rei e confiou em Deus.»' },
    ],
  },
  {
    livro: '1rs', capitulo: 19, versiculo: 12,
    tema: 'A voz da brisa suave',
    contexto: 'Elias está na caverna, fugindo de Jezabel. Deus não está no terremoto, no fogo, mas na brisa suave. A presença de Deus é sutil.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Presença sutil', resumo: 'Agostinho vê na brisa suave a presença de Deus que se comunica no silêncio — Deus fala quando o homem cala.', citacao: '«Deus fala no silêncio — a brisa suave é Sua presença sutil.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Contemplação', resumo: 'Aquino vê na brisa o momento da contemplação — Deus se revela ao alma em silêncio e amor.', citacao: '«A contemplação é o momento em que Deus se revela — a brisa é contemplação.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'Calvino vê na brisa suave a graça de Deus que vem gentle — Ele não força, mas convida.', citacao: '«Deus vem gentle — a brisa suave é Sua graça convidando.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação', resumo: 'Barth vê na brisa a revelação de Deus — Ele se revela no que é pequeno e humilde.', citacao: '«Deus se revela no pequeno e humilde — a brisa é Sua revelação.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Descanso', resumo: 'Stott vê na brisa o convite ao descanso — Deus chama Elias a descansar nEle.', citacao: '«Deus convida ao descanso — a brisa suave é Sua chamada.»' },
    ],
  },
  {
    livro: '1rs', capitulo: 22, versiculo: 14,
    tema: 'Micaias profetizará a verdade',
    contexto: 'Micaias é o único profeta que ousa falar a verdade contra Acabe. Enquanto 400 profetas mentem, ele fala a palavra do Senhor.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Verdade', resumo: 'Agostinho vê em Micaias o profeta da verdade — mesmo contra a multidão, ele fala o que Deus diz.', citacao: '«A verdade não depende da multidão — Micaias falou sozinho.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Coragem', resumo: 'Aquino vê em Micaias a coragem do profeta — ele enfrenta o rei e a multidão de falsos profetas.', citacao: '«Micaias tem a coragem de enfrentar o rei — o profeta fala a verdade.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Calvino vê em Micaias a soberania de Deus — Deus revela Sua vontade através do profeta fiel.', citacao: '«Deus revela Sua vontade pelo profeta fiel — Micaias é instrumento.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Profecia', resumo: 'Barth vê em Micaias o modelo de profecia — falar a verdade mesmo quando é impopular.', citacao: '«Profetizar é falar a verdade mesmo quando impopular — Micaias é modelo.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Fidelidade', resumo: 'Stott vê em Micaias a fidelidade à palavra de Deus — ele não compromete a verdade por popularidade.', citacao: '«Micaias não compromete a verdade — a fidelidade é mais importante que a popularidade.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // LAMENTAÇÕES
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'lm', capitulo: 1, versiculo: 1,
    tema: 'Como é solidã a cidade',
    contexto: 'Jeremias lamenta a destruição de Jerusalém. A cidade que era cheia de gente agora está vazia, viúva e escrava.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Tristeza profunda', resumo: 'Agostinho vê no lamento a tristeza profunda de Deus pela destruição da cidade — Deus também chora.', citacao: '«Deus chora com os que choram — a solidão de Jerusalém é Sua tristeza.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Julgamento', resumo: 'Aquino vê na solidão o resultado do julgamento — a cidade que rejeitou Deus ficou vazia.', citacao: '«A solidão é resultado do julgamento — a cidade que rejeitou Deus ficou vazia.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Consequência', resumo: 'Calvino vê na solidão a consequência do pecado — Jerusalém pagou o preço de sua rebeldia.', citacao: '«A solidão é consequência do pecado — Jerusalém pagou o preço.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Dor de Deus', resumo: 'Barth vê no lamento a dor de Deus — Ele sofre com os que sofrem, mesmo quando são culpados.', citacao: '«Deus sofre com os que sofrem — mesmo quando são culpados.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Empatia', resumo: 'Stott vê no lamento a empatia de Deus — Ele não é indiferente à dor humana.', citacao: '«Deus não é indiferente — Ele empathize com nossa dor.»' },
    ],
  },
  {
    livro: 'lm', capitulo: 2, versiculo: 19,
    tema: 'Levanta-te e clama na noite',
    contexto: 'Jeremias exorta Jerusalém a clamar a Deus na noite — levantar como água no início da vigília. A oração é o caminho da restauração.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Oração', resumo: 'Agostinho vê na exortação o poder da oração — mesmo no meio da destruição, a oração alcança Deus.', citacao: '«A oração alcança Deus mesmo no meio da destruição — clamar é a chave.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Perseverança', resumo: 'Aquino vê na exortação a perseverança na oração — devemos clamar sem desistir.', citacao: '«A perseverança na oração é necessária — clamar sem desistir.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Dependência', resumo: 'Calvino vê na exortação a dependência de Deus — o homem precisa clamar porque depende dEle.', citacao: '«O homem clama porque depende de Deus — a oração é dependência.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Resposta', resumo: 'Barth vê na exortação a confiança de que Deus responde — Ele ouve o clamor do abismo.', citacao: '«Deus ouve o clamor do abismo — Ele responde à oração.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Esperança', resumo: 'Stott vê na exortação a esperança — mesmo na noite mais escura, a oração traz luz.', citacao: '«A oração traz luz na noite mais escura — é esperança em ação.»' },
    ],
  },
  {
    livro: 'lm', capitulo: 3, versiculo: 22-23,
    tema: 'As misericórdias de Deus se renovam',
    contexto: 'O versículo mais conhecido de Lamentações — as misericórdias de Deus não acabam, e Sua bondade se renova a cada manhã. Uma ilha de esperança no meio do desespero.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Graça renovada', resumo: 'Agostinho vê nas misericórdias que se renovam a graça de Deus que nunca se esgota — cada manhã é nova graça.', citacao: '«As misericórdias de Deus são como a manhã — sempre novas, sempre frescas.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Bondade infinita', resumo: 'Aquino vê na renovação a bondade infinita de Deus — Sua bondade não tem fim.', citacao: '«A bondade de Deus é infinita — Sua misericórdia nunca se esgota.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Fidelidade', resumo: 'Calvino vê na renovação a fidelidade de Deus — Ele é fiel todos os dias.', citacao: '«Deus é fiel todos os dias — Sua misericórdia se renova.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Graça', resumo: 'Barth vê na renovação a graça que nunca falha — Deus sempre dá nova chance.', citacao: '«A graça nunca falha — Deus sempre dá nova chance.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Esperança', resumo: 'Stott vê na renovação a esperança — cada manhã é oportunidade de recomeçar com Deus.', citacao: '«Cada manhã é oportunidade de recomeçar — as misericórdias se renovam.»' },
    ],
  },
  {
    livro: 'lm', capitulo: 3, versiculo: 25,
    tema: 'O Senhor é bom para quem Nele espera',
    contexto: 'No meio do desespero, Jeremias declara que Deus é bom para aqueles que esperam Nele. A esperança em Deus é o antídoto contra o desespero.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Bondade divina', resumo: 'Agostinho vê na bondade de Deus a razão da esperança — Deus é bom mesmo quando tudo é mau.', citacao: '«Deus é bom mesmo quando tudo é mau — Sua bondade é a razão da esperança.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Virtude da esperança', resumo: 'Aquino vê na esperança a virtude que nos leva a Deus — Ele recompensa quem espera nEle.', citacao: '«A esperança é virtude que nos leva a Deus — Ele recompensa quem espera.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Confiança', resumo: 'Calvino vê na bondade de Deus a razão da confiança — devemos confiar porque Ele é bom.', citacao: '«A bondade de Deus é razão da confiança — devemos confiar porque Ele é bom.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Bondade', resumo: 'Barth vê na bondade de Deus a realidade que sustenta — Ele é bom e fiel.', citacao: '«Deus é bom e fiel — Sua bondade sustenta a esperança.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Esperança', resumo: 'Stott vê na bondade de Deus a fonte da esperança — ela não depende das circunstâncias, mas de Deus.', citacao: '«A esperança não depende das circunstâncias — depende da bondade de Deus.»' },
    ],
  },
  {
    livro: 'lm', capitulo: 3, versiculo: 40,
    tema: 'Examinemos os nossos caminhos',
    contexto: 'Jeremias chama o povo ao autoexame — devemos voltar ao Senhor e examinar nossos caminhos. O arrependimento é o caminho da restauração.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Conversão', resumo: 'Agostinho vê no autoexame o início da conversão — o homem precisa se reconhecer pecador para se converter.', citacao: '«O autoexame é o início da conversão — reconhecer o pecado é o primeiro passo.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Penitência', resumo: 'Aquino vê no exame a penitência — devemos examinar nossos pecados e arrepender-nos.', citacao: '«O exame é penitência — devemos examinar e arrepender-nos.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Arrependimento', resumo: 'Calvino vê no exame o arrependimento — devemos voltar a Deus examinando nossa vida.', citacao: '«O exame leva ao arrependimento — devemos voltar a Deus.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revisão de vida', resumo: 'Barth vê no exame a revisão de vida — devemos nos perguntar se estamos no caminho de Deus.', citacao: '«O exame é revisão de vida — estamos no caminho de Deus?»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Autoavaliação', resumo: 'Stott vê no exame a autoavaliação espiritual — devemos nos conhecer para crescer.', citacao: '«A autoavaliação éecessária para crescer — o exame é ferramenta.»' },
    ],
  },
  {
    livro: 'lm', capitulo: 5, versiculo: 21,
    tema: 'Restaura-nos, Senhor, para que sejamos restaurados',
    contexto: 'A última oração de Lamentações — um pedido desesperado de restauração. O povo reconhece que só Deus pode restaurá-los.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Dependência total', resumo: 'Agostinho vê na oração a dependência total de Deus — o homem não pode se restaurar, só Deus.', citacao: '«O homem não pode se restaurar — só Deus pode restaurar.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Graça', resumo: 'Aquino vê na oração o pedido de graça — Deus dá a graça da restauração.', citacao: '«A restauração é graça — Deus dá o que o homem não pode conquistar.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Calvino vê na oração a submissão à soberania de Deus — só Ele pode restaurar.', citacao: '«A restauração depende da soberania de Deus — só Ele pode restaurar.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Esperança', resumo: 'Barth vê na oração a esperança — mesmo no desespero, há esperança em Deus.', citacao: '«Mesmo no desespero, há esperança — a oração é expressão dessa esperança.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Renovação', resumo: 'Stott vê na oração o pedido de renovação — Deus renova os que se voltam para Ele.', citacao: '«Deus renova os que se voltam para Ele — a oração é o caminho.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // OSÉIAS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'os', capitulo: 1, versiculo: 2,
    tema: 'Deus ordena que Oséias case com uma prostituta',
    contexto: 'Deus ordena que Oséias se case com Gômer, uma prostituta, como símbolo da infidelidade de Israel. O profeta vivencia a dor de Deus.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Alegoria', resumo: 'Agostinho vê no casamento de Oséias a alegoria de Deus e Israel — Deus é fiel, mas Israel é infiel.', citacao: '«O casamento de Oséias é imagem de Deus e Israel — fidelidade contra infidelidade.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Símbolo', resumo: 'Aquino vê no casamento o símbolo da aliança — Deus casou com Israel, mas Israel traiu.', citacao: '«O casamento é símbolo da aliança — Israel traiu o Deus que o amava.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Profecia', resumo: 'Calvino vê no casamento uma profecia — Deus mostra como Israel O traiu através do casamento de Oséias.', citacao: '«O casamento é profecia — Deus mostra a infidelidade de Israel.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Dor de Deus', resumo: 'Barth vê no casamento a dor de Deus — Ele sofre com a infidelidade do povo.', citacao: '«Deus sofre com a infidelidade — o casamento é Sua dor.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Sacrifício', resumo: 'Stott vê no casamento o sacrifício do profeta — Oséias aceita a dor para cumprir o propósito de Deus.', citacao: '«O profeta aceita a dor — o casamento é sacrifício pelo propósito de Deus.»' },
    ],
  },
  {
    livro: 'os', capitulo: 2, versiculo: 14,
    tema: 'Eu a seduzirei e a levarei ao deserto',
    contexto: 'Deus promete seduzir e levar Israel ao deserto para falar ao seu coração — uma imagem de amor e restauração.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor divino', resumo: 'Agostinho vê na sedução o amor de Deus que busca o pecador — Ele não desiste, mas seduz com bondade.', citacao: '«Deus seduz com bondade — Ele busca o pecador com amor.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Misericórdia', resumo: 'Aquino vê na sedução a misericórdia de Deus — Ele recupera o que se perdeu.', citacao: '«A sedução é misericórdia — Deus recupera o que se perdeu.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'Calvino vê na sedução a graça de Deus que busca o pecador — Ele não abandona.', citacao: '«Deus busca com graça — Ele não abandona o pecador.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Amor', resumo: 'Barth vê na sedução o amor de Deus que se entrega — Ele se dá completamente ao pecador.', citacao: '«Deus se entrega — o amor é sedução divina.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Restauração', resumo: 'Stott vê na sedução a restauração — Deus seduz para restaurar a relação quebrada.', citacao: '«Deus seduz para restaurar — a relação quebrada é restaurada pelo amor.»' },
    ],
  },
  {
    livro: 'os', capitulo: 3, versiculo: 1,
    tema: 'Ama de novo',
    contexto: 'Deus ordena que Oséias ame novamente Gômer, mesmo depois de ela ter sido vendida como escrava. Um retrato do amor incondicional de Deus.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor incondicional', resumo: 'Agostinho vê no amor de Oséias o amor incondicional de Deus — Ele ama mesmo quando somos indignos.', citacao: '«Deus ama mesmo quando somos indignos — o amor é incondicional.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Graça', resumo: 'Aquino vê no amor a graça que vai além do merecimento — Deus ama sem条件.', citacao: '«O amor de Deus vai além do merecimento — é graça pura.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eleição', resumo: 'Calvino vê no amor a eleição — Deus escolhe amar mesmo quando não somos dignos.', citacao: '«Deus escolhe amar — a eleição é amor gratuito.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Graça', resumo: 'Barth vê no amor a graça que se entrega — Deus se dá completamente ao pecador.', citacao: '«A graça se entrega — Deus ama sem条件.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Redenção', resumo: 'Stott vê no amor a redenção — Deus resgata o que está perdido.', citacao: '«Deus redime o que está perdido — o amor é redenção.»' },
    ],
  },
  {
    livro: 'os', capitulo: 6, versiculo: 6,
    tema: 'Misericórdia e não sacrifício',
    contexto: 'Deus prefere a misericórdia ao sacrifício. Jesus cita este versículo duas vezes nos Evangelhos — é central para entender o coração de Deus.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Misericórdia', resumo: 'Agostinho vê na misericórdia o coração de Deus — Ele prefere a misericórdia ao ritual.', citacao: '«O coração de Deus é misericórdia — Ele prefere o amor ao ritual.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Amor', resumo: 'Aquino vê na misericórdia o amor em ação — o sacrifício sem amor é vazio.', citacao: '«O sacrifício sem amor é vazio — a misericórdia é amor em ação.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Interior', resumo: 'Calvino vê na misericórdia o culto interior — Deus olha para o coração, não para o ritual.', citacao: '«Deus olha para o coração — o culto interior é o que importa.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Reconciliação', resumo: 'Barth vê na misericórdia a reconciliação — Deus reconcilia pelo amor, não pelo sacrifício.', citacao: '«A reconciliação vem pelo amor — a misericórdia é reconciliação.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Prática', resumo: 'Stott vê na misericórdia a prática cristã — devemos praticar misericórdia, não apenas oferecer sacrifícios.', citacao: '«A prática cristã é misericórdia — devemos amar, não apenas adorar.»' },
    ],
  },
  {
    livro: 'os', capitulo: 11, versiculo: 1,
    tema: 'Quando Israel era menino, eu o amei',
    contexto: 'Deus lembra do amor que teve por Israel desde o Egito — como um pai que ensina seu filho a andar. Uma das imagens mais ternas de Deus no Antigo Testamento.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Amor paterno', resumo: 'Agostinho vê no amor de Deus por Israel o amor de um pai — Deus ensina, guia e protege.', citacao: '«Deus é pai que ensina — Seu amor por Israel é amor paterno.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Bondade', resumo: 'Aquino vê no amor a bondade de Deus — Ele amou Israel desde o início.', citacao: '«Deus amou desde o início — Sua bondade é anterior ao pecado.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eleição', resumo: 'Calvino vê no amor a eleição — Deus escolheu amar Israel antes que ele existisse.', citacao: '«Deus escolheu amar — a eleição é anterior à existência.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Amor', resumo: 'Barth vê no amor de Deus por Israel o amor que precede — Deus ama antes que o homem exista.', citacao: '«Deus ama antes que existamos — Seu amor é anterior.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Paternidade', resumo: 'Stott vê em Deus o pai que cuida — Ele ensina Israel a andar como um pai ensina o filho.', citacao: '«Deus é pai que cuida — Ele ensina como um pai ao filho.»' },
    ],
  },
  {
    livro: 'os', capitulo: 13, versiculo: 14,
    tema: 'Ó morte, onde estão tuas pragas?',
    contexto: 'Deus desafia a morte — onde estão tuas pragas? Paul cita este versículo em 1 Coríntios 15:55. A morte foi derrotada pela ressurreição.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Vitória sobre a morte', resumo: 'Agostinho vê no desafio a vitória de Deus sobre a morte — Cristo venceu a morte na cruz.', citacao: '«Deus venceu a morte — Cristo é a vitória sobre as pragas.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Ressurreição', resumo: 'Aquino vê no desafio a ressurreição — a morte não tem poder sobre os que crêem.', citacao: '«A morte não tem poder — a ressurreição é a vitória.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Derrota', resumo: 'Calvino vê na morte derrotada — Cristo derrotou a morte e deu vida eterna.', citacao: '«A morte foi derrotada — Cristo deu vida eterna.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Novo começo', resumo: 'Barth vê na derrota da morte o novo começo — a morte não é o fim, mas o início.', citacao: '«A morte é início — o novo começo pela ressurreição.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Esperança', resumo: 'Stott vê no desafio à morte a esperança cristã — a morte foi vencida por Cristo.', citacao: '«A morte foi vencida — a esperança cristã é a ressurreição.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // ECLESIASTES
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'ec', capitulo: 1, versiculo: 2,
    tema: 'Vaidade de vaidades, tudo é vaidade',
    contexto: 'Eclesiastes abre com a declaração mais famosa da literatura sapiencial — tudo é vaidade, um vapor que passa. O Preletor busca sentido na vida.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Vanidade', resumo: 'Agostinho vê na vaidade a busca humana por satisfação — nada satisfaz plenamente senão Deus.', citacao: '«Nada satisfaz plenamente senão Deus — tudo é vaidade sem Ele.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Bens temporais', resumo: 'Aquino vê na vaidade a limitação dos bens temporais — eles não dão felicidade plena.', citacao: '«Os bens temporais são limitados — não dão felicidade plena.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Sentido', resumo: 'Calvino vê na vaidade a busca de sentido — o homem busca, mas só encontra em Deus.', citacao: '«O homem busca sentido — só encontra em Deus.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Absurdo', resumo: 'Barth vê na vaidade o absurdo da vida sem Deus — tudo é vapor sem Ele.', citacao: '«Sem Deus, tudo é vapor — a vida é absurda sem sentido.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Realismo', resumo: 'Stott vê na vaidade o realismo — o Preletor encara a realidade sem ilusões.', citacao: '«O Preletor é realista — encara a vida sem ilusões.»' },
    ],
  },
  {
    livro: 'ec', capitulo: 3, versiculo: 1,
    tema: 'Há tempo para tudo',
    contexto: 'Eclesiastes ensina que há um tempo para cada coisa — nascer, morrer, plantar, colher. A vida tem ritmos que Deus estabeleceu.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Ordem divina', resumo: 'Agostinho vê nos tempos a ordem divina — Deus estabeleceu ritmos para tudo.', citacao: '«Deus estabeleceu tempos — há ordem em tudo.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Providência', resumo: 'Aquino vê nos tempos a providência — Deus controla os tempos da vida.', citacao: '«Deus controla os tempos — a providência está em tudo.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Calvino vê nos tempos a soberania de Deus — Ele determina cada momento.', citacao: '«Deus determina cada momento — Sua soberania é total.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Kairos', resumo: 'Barth vê nos tempos o kairos — o momento oportuno de Deus.', citacao: '«Há um tempo de Deus — o kairos é o momento oportuno.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Paciência', resumo: 'Stott vê nos tempos o chamado à paciência — devemos esperar o tempo de Deus.', citacao: '«Devemos esperar o tempo de Deus — a paciência é necessária.»' },
    ],
  },
  {
    livro: 'ec', capitulo: 3, versiculo: 11,
    tema: 'Deus fez tudo formoso em seu tempo',
    contexto: 'Deus fez tudo formoso e pôs a eternidade no coração do homem — há um desejo de infinito que nada satisfaz senão Deus.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Eternidade', resumo: 'Agostinho vê na eternidade no coração o desejo de Deus — o coração humano é inquieto até repousar em Deus.', citacao: '«O coração é inquieto até repousar em Deus — a eternidade é Sua marca.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Beatitude', resumo: 'Aquino vê na eternidade o desejo de beatitude — o homem busca a felicidade eterna.', citacao: '«O homem busca a felicidade eterna — a eternidade no coração é desejo de beatitude.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Conhecimento', resumo: 'Calvino vê na eternidade o desejo de conhecimento de Deus — o homem busca conhecer a Deus.', citacao: '«O homem busca conhecer Deus — a eternidade é desejo de conhecimento.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Felicidade', resumo: 'Barth vê na eternidade o desejo de felicidade — só Deus satisfaz esse desejo.', citacao: '«Só Deus satisfaz o desejo de felicidade — a eternidade é Sua resposta.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Propósito', resumo: 'Stott vê na eternidade o propósito de Deus — Ele colocou em nós o desejo de eternidade.', citacao: '«Deus colocou em nós o desejo de eternidade — é Sua marca.»' },
    ],
  },
  {
    livro: 'ec', capitulo: 7, versiculo: 14,
    tema: 'No dia da prosperidade, goza; no dia da adversidade, reflete',
    contexto: 'Eclesiastes ensina equilíbrio — gozar quando as coisas vão bem, e refletir quando vão mal. Ambos são de Deus.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Equilíbrio', resumo: 'Agostinho vê no equilíbrio a sabedoria — devemos gozar e refletir em seus tempos.', citacao: '«A sabedoria é equilíbrio — gozar e refletir em seus tempos.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Providência', resumo: 'Aquino vê no equilíbrio a providência — Deus dá prosperidade e adversidade para nosso crescimento.', citacao: '«Deus usa prosperidade e adversidade — ambos são para nosso crescimento.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Calvino vê no equilíbrio a soberania — Deus determina os altos e baixos da vida.', citacao: '«Deus determina os altos e baixos — Sua soberania é em tudo.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Mistério', resumo: 'Barth vê no equilíbrio o mistério de Deus — Ele dá os dois lados da vida.', citacao: '«Deus dá os dois lados — o mistério está na diversidade.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Maturidade', resumo: 'Stott vê no equilíbrio a maturidade espiritual — amadurecemos ao enfrentar os dois lados.', citacao: '«A maturidade vem ao enfrentar prosperidade e adversidade — o equilíbrio é crescimento.»' },
    ],
  },
  {
    livro: 'ec', capitulo: 12, versiculo: 13,
    tema: 'Teme a Deus e guarda Seus mandamentos',
    contexto: 'A conclusão de Eclesiastes — o fim de tudo é temer a Deus e guardar Seus mandamentos. É o resumo da sabedoria.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Temo de Deus', resumo: 'Agostinho vê no temor de Deus o princípio da sabedoria — quem teme a Deus começa a ser sábio.', citacao: '«O temor de Deus é princípio da sabedoria — sem Ele, tudo é vaidade.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Virtude', resumo: 'Aquino vê no temor de Deus a virtude que ordena a vida — ele dá sentido a tudo.', citacao: '«O temor de Deus ordena a vida — é a virtude que dá sentido.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Conclusão', resumo: 'Calvino vê na conclusão o resumo de toda a vida — temer Deus e guardar Seus mandamentos.', citacao: '«O resumo da vida é temer Deus e guardar Seus mandamentos.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Resposta', resumo: 'Barth vê no temor a resposta ao Deus que se revela — Deus se revela, e o homem responde com temor.', citacao: '«Deus se revela, e o homem responde — o temor é resposta à revelação.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Prática', resumo: 'Stott vê no temor a prática diária — devemos temer a Deus e obeyecer todos os dias.', citacao: '«O temor de Deus é prática diária — devemos obeyecer todos os dias.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // CÂNTICO DOS CÂNTICOS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'ct', capitulo: 2, versiculo: 14,
    tema: 'A pomba nos furos da rocha',
    contexto: 'O amado chama a amada para sair dos esconderijos — uma imagem de intimidade e vulnerabilidade no amor.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cristo e a Igreja', resumo: 'Agostinho vê no amado a Cristo e na amada a Igreja — Ele chama a Igreja para intimidade.', citacao: '«Cristo chama a Igreja para intimidade — a pomba é a alma que O busca.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Amor místico', resumo: 'Aquino vê no chamado o amor místico — Deus chama a alma para união.', citacao: '«Deus chama a alma para união — o amor místico é Sua vontade.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Aliança', resumo: 'Calvino vê no chamado a aliança amorosa — Deus chama o povo para relação.', citacao: '«O chamado é aliança — Deus chama para relação amorosa.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Encontro', resumo: 'Barth vê no chamado o encontro — Deus se encontra com o homem em intimidade.', citacao: '«O encontro é intimidade — Deus se encontra com o homem.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Relação', resumo: 'Stott vê no chamado a relação — Deus quer relação íntima com cada crente.', citacao: '«Deus quer relação íntima — o chamado é para intimidade.»' },
    ],
  },
  {
    livro: 'ct', capitulo: 4, versiculo: 7,
    tema: 'Tu és toda formosa, meu amor',
    contexto: 'O amado declara que a amada é perfeita — sem mancha. Uma declaração de amor incondicional que aponta para o amor de Deus por Israel/Igreja.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Perfeição', resumo: 'Agostinho vê na declaração a perfeição da Igreja aos olhos de Deus — Ele a vê sem mancha.', citacao: '«Deus vê a Igreja sem mancha — ela é perfeita aos Seus olhos.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Beleza', resumo: 'Aquino vê na beleza da amada a beleza da graça — Deus enfeita a alma com Sua graça.', citacao: '«A beleza da alma vem da graça — Deus a enfeita.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Eleição', resumo: 'Calvino vê na declaração a eleição — Deus escolhe e vê perfeição onde outros veem pecado.', citacao: '«Deus escolhe e vê perfeição — a eleição é amor que vê além.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Amor', resumo: 'Barth vê na declaração o amor que transforma — Deus ama e transforma.', citacao: '«Deus ama e transforma — o amor é a força que muda tudo.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Aceitação', resumo: 'Stott vê na declaração a aceitação — Deus aceita o crente como é, mas o transforma.', citacao: '«Deus aceita e transforma — o amor é aceitação que muda.»' },
    ],
  },
  {
    livro: 'ct', capitulo: 6, versiculo: 3,
    tema: 'Eu sou do meu amado, e o meu é meu',
    contexto: 'A reciprocidade do amor — eu sou do amado, e o amado é meu. Uma declaração de pertencimento mútuo que reflete a aliança.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Pertencimento', resumo: 'Agostinho vê na reciprocidade o pertencimento mútuo — Deus pertence ao povo e o povo pertence a Deus.', citacao: '«Deus pertence ao povo e o povo pertence a Deus — é pertencimento mútuo.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Aliança', resumo: 'Aquino vê na reciprocidade a aliança — Deus se compromete e o povo se entrega.', citacao: '«A aliança é compromisso mútuo — Deus se compromete e o povo se entrega.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Graça', resumo: 'Calvino vê na reciprocidade a graça — Deus primeiro amou, e o povo responde.', citacao: '«Deus primeiro amou — a reciprocidade é graça que responde.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Comunhão', resumo: 'Barth vê na reciprocidade a comunhão — Deus e o povo em relação mutua.', citacao: '«A comunhão é relação mutua — Deus e o povo em reciprocidade.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Relação', resumo: 'Stott vê na reciprocidade a relação — Deus quer relação mútua com Seu povo.', citacao: '«Deus quer relação mútua — a reciprocidade é Sua vontade.»' },
    ],
  },
  {
    livro: 'ct', capitulo: 8, versiculo: 6,
    tema: 'O amor é forte como a morte',
    contexto: 'O versículo mais poderoso do Cântico — o amor é forte como a morte, e as águas grandes não o podem apagar. Uma declaração da força do amor divino.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Força do amor', resumo: 'Agostinho vê no amor forte como a morte a força do amor divino — Ele ama com intensidade inabalável.', citacao: '«O amor de Deus é forte como a morte — nada O pode apagar.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Perseverança', resumo: 'Aquino vê no amor que resiste às águas a perseverança do amor — Ele não desiste.', citacao: '«O amor persevera — as águas não O apagam.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Inabalável', resumo: 'Calvino vê no amor inabalável a segurança do crente — nada pode separá-lo do amor de Deus.', citacao: '«Nada pode separar do amor de Deus — Ele é inabalável.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Vitória', resumo: 'Barth vê no amor que vence a morte a vitória do amor — Ele vence tudo.', citacao: '«O amor vence tudo — até a morte.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Eternidade', resumo: 'Stott vê no amor eterno a marca de Deus — Ele ama para sempre.', citacao: '«O amor de Deus é eterno — Ele ama para sempre.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // MALAQUIAS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'ml', capitulo: 1, versiculo: 6,
    tema: 'Onde está o meu honra?',
    contexto: 'Deus acusa Israel de desonrá-Lo — os sacerdotes oferecem sacrifícios impuros e o povo não dá o dízimo. Deus pergunta: onde está a Minha honra?',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Honra divina', resumo: 'Agostinho vê na pergunta a exigência da honra divina — Deus merece ser honrado.', citacao: '«Deus merece honra — a pergunta é exigência de Sua dignidade.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Justiça', resumo: 'Aquino vê na acusação a injustiça humana — o homem falha em dar a Deus o que Lhe é devido.', citacao: '«O homem falha em dar o que é devido — a injustiça é contra Deus.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Advertência', resumo: 'Calvino vê na pergunta uma advertência — devemos honrar a Deus acima de tudo.', citacao: '«A pergunta é advertência — devemos honrar a Deus acima de tudo.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Exigência', resumo: 'Barth vê na pergunta a exigência divina — Deus não aceita ser desonrado.', citacao: '«Deus não aceita ser desonrado — Sua exigência é absoluta.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Prioridades', resumo: 'Stott vê na pergunta as prioridades erradas — o povo honrava a si mesmo, não a Deus.', citacao: '«As prioridades erradas levam à desonra — Deus deve ser primeiro.»' },
    ],
  },
  {
    livro: 'ml', capitulo: 3, versiculo: 10,
    tema: 'Trazei todos os dízimos',
    contexto: 'O único versículo da Bíblia que "testa" a Deus — trazei o dízimo e vede se Eu não abrirei as janelas dos céus. Uma promessa de bênção para quem dá.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Generosidade', resumo: 'Agostinho vê no dízimo a generosidade que abre as bênçãos — Deus retribui quem dá.', citacao: '«A generosidade abre as bênçãos — Deus retribui quem dá.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Graça', resumo: 'Aquino vê no dízimo a graça de Deus que se multiplica — Ele dá mais do que recebemos.', citacao: '«Deus dá mais do que recebemos — o dízimo é graça que se multiplica.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Promessa', resumo: 'Calvino vê no dízimo uma promessa — Deus promete abençoar quem O honra com seus bens.', citacao: '«O dízimo é promessa — Deus abençoa quem O honra.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Teste', resumo: 'Barth vê no dízimo o teste de fé — Deus convida a testar Sua fidelidade.', citacao: '«Deus convida a testar Sua fidelidade — o dízimo é teste de fé.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Prática', resumo: 'Stott vê no dízimo a prática da fidelidade — dar é ato de obediência e fé.', citacao: '«Dar é obediência e fé — o dízimo é prática de fidelidade.»' },
    ],
  },
  {
    livro: 'ml', capitulo: 3, versiculo: 1,
    tema: 'O mensageiro da aliança',
    contexto: 'Deus anuncia o envio do mensageiro que preparará o caminho — João Batista citado em Mateus 11:10. A preparação para o Messias.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'João Batista', resumo: 'Agostinho vê no mensageiro João Batista — ele prepara o caminho para Cristo.', citacao: '«João Batista é o mensageiro — ele prepara o caminho para Cristo.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Preparação', resumo: 'Aquino vê no mensageiro a preparação para a vinda do Messias — algo grande está chegando.', citacao: '«O mensageiro prepara para o Messias — algo grande está chegando.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Promessa', resumo: 'Calvino vê no mensageiro a promessa cumprida — Deus envia quem prepara o caminho.', citacao: '«Deus cumpre a promessa — o mensageiro é envio divino.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Revelação', resumo: 'Barth vê no mensageiro a revelação que se aproxima — Cristo está chegando.', citacao: '«O mensageiro anuncia a revelação — Cristo está chegando.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Cumprimento', resumo: 'Stott vê no mensageiro o cumprimento profético — Malaquias profetizou João Batista.', citacao: '«Malaquias profetizou João Batista — a profecia se cumpre.»' },
    ],
  },
  {
    livro: 'ml', capitulo: 4, versiculo: 2,
    tema: 'O sol da justiça nascerá',
    contexto: 'A última profecia do Antigo Testamento — o sol da justiça nascerá com cura em suas asas. Uma promessa de luz e cura para os que temem a Deus.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Cristo', resumo: 'Agostinho vê no sol da justiça Cristo — Ele é a luz que traz cura e justiça.', citacao: '«Cristo é o sol da justiça — Ele traz luz e cura.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Justiça', resumo: 'Aquino vê no sol a justiça divina — Deus trará justiça e cura aos fiéis.', citacao: '«O sol da justiça é Deus trazendo justiça e cura.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Esperança', resumo: 'Calvino vê no sol a esperança — para os que temem a Deus, há luz e cura.', citacao: '«A esperança é o sol — para os que temem a Deus, há luz e cura.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Vinda', resumo: 'Barth vê no sol a vinda de Cristo — Ele é a luz que está por vir.', citacao: '«O sol da justiça é Cristo que está por vir — a vinda é certa.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Cura', resumo: 'Stott vê no sol a cura — Cristo traz cura para os feridos.', citacao: '«Cristo é o sol que cura — Ele traz cura para os feridos.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // 2 CRÔNICAS
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: '2cr', capitulo: 7, versiculo: 14,
    tema: 'Se o meu povo se humilhar',
    contexto: 'O versículo mais citado de 2 Crônicas — se o povo se humilhar, orar, buscar a face de Deus e se desviar dos caminhos maus, Deus perdoará e curará a terra.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Arrependimento', resumo: 'Agostinho vê no versículo o caminho do arrependimento — humilhação, oração e busca de Deus.', citacao: '«O arrependimento é humilhação, oração e busca — é o caminho para Deus.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Perdão', resumo: 'Aquino vê no versículo a promessa de perdão — Deus perdoa quando o homem se humilha.', citacao: '«Deus perdoa quando o homem se humilha — a promessa é certa.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Condição', resumo: 'Calvino vê no versículo a condição para a bênção — Deus perdoa se o povo se humilhar.', citacao: '«A bênção tem condição — Deus perdoa se o povo se humilhar.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Graça', resumo: 'Barth vê no versículo a graça — Deus perdoa mesmo quando o povo não merece.', citacao: '«O perdão é graça — Deus perdoa sem merecimento.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Cura', resumo: 'Stott vê no versículo a cura da terra — o arrependimento leva à restauração.', citacao: '«O arrependimento cura a terra — a restauração vem pela humilhação.»' },
    ],
  },
  {
    livro: '2cr', capitulo: 15, versiculo: 7,
    tema: 'Não desanimeis, porque há recompensa',
    contexto: 'Azarias exorta o rei Asa — não desanime, pois há recompensa para o que busca Deus. Uma palavra de encorajamento para a perseverança.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Recompensa', resumo: 'Agostinho vê na recompensa a promessa de Deus — Ele retribui quem busca.', citacao: '«Deus retribui quem busca — a recompensa é certa.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Perseverança', resumo: 'Aquino vê na exortação a perseverança — devemos continuar busca mesmo quando difícil.', citacao: '«A perseverança é necessária — devemos continuar busca.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Estímulo', resumo: 'Calvino vê no versículo um estímulo — Deus encoraja a não desistir.', citacao: '«Deus encoraja — não devemos desistir.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Fidelidade', resumo: 'Barth vê na exortação a fidelidade — Deus é fiel e recompensará.', citacao: '«Deus é fiel e recompensará — a fidelidade tem recompensa.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Encorajamento', resumo: 'Stott vê no versículo encorajamento — não desanime, há recompensa.', citacao: '«Não desanime — há recompensa para quem busca Deus.»' },
    ],
  },
  {
    livro: '2cr', capitulo: 16, versiculo: 9,
    tema: 'Os olhos do Senhor percorrem toda a terra',
    contexto: 'Deus fortaleceu os corações dos que Nele confiavam — Seus olhos percorrem toda a terra para mostrar Seu poder a favor dos que são íntegros.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Olhar divino', resumo: 'Agostinho vê nos olhos de Deus o olhar que vigia — Deus vê tudo e age em favor dos fiéis.', citacao: '«Deus vê tudo e age — Seus olhos percorrem a terra.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Providência', resumo: 'Aquino vê nos olhos a providência — Deus observa e intervém a favor dos que são íntegros.', citacao: '«Deus observa e intervém — Sua providência percorre a terra.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Calvino vê nos olhos a soberania — Deus vê e governa tudo.', citacao: '«Deus vê e governa — Sua soberania percorre toda a terra.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Vigilância', resumo: 'Barth vê nos olhos a vigilância divina — Deus não dorme nem cochila.', citacao: '«Deus vige — Ele não dorme nem cochila.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Proteção', resumo: 'Stott vê nos olhos a proteção — Deus protege os que são íntegros.', citacao: '«Deus protege os íntegros — Seus olhos os guardam.»' },
    ],
  },
  {
    livro: '2cr', capitulo: 20, versiculo: 15,
    tema: 'Não temais, nem vos assusteis',
    contexto: 'Josafá enfrenta exércitos vastos. Deus diz: não temais — a batalha é do Senhor. Uma das maiores histórias de fé no Antigo Testamento.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Guerreira', resumo: 'Agostinho vê na batalha a guerra espiritual — Deus luta por Seu povo.', citacao: '«Deus luta por Seu povo — a batalha é dEle.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Fé', resumo: 'Aquino vê no chamado à fé — devemos confiar em Deus mesmo quando o inimigo é grande.', citacao: '«A fé é confiança em Deus — devemos confiar mesmo quando o inimigo é grande.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Calvino vê na batalha a soberania de Deus — Ele controla até as guerras.', citacao: '«Deus é soberano até nas guerras — a batalha é dEle.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Vitória', resumo: 'Barth vê na batalha a vitória de Deus — Ele já venceu.', citacao: '«Deus já venceu — a batalha é vitória certa.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Coragem', resumo: 'Stott vê no chamado à coragem — não devemos temer porque Deus está conosco.', citacao: '«Não temamos — Deus está conosco e a batalha é dEle.»' },
    ],
  },
  {
    livro: '2cr', capitulo: 26, versiculo: 5,
    tema: 'Uzias buscou a Deus',
    contexto: 'Uzias foi um bom rei enquanto buscou a Deus — Deus o prosperou. Mas quando se orgulhou, foi punido com lepra. Uma lição sobre humildade.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Humildade', resumo: 'Agostinho vê na história de Uzias a importância da humildade — o orgulho destrói.', citacao: '«A humildade é caminho — o orgulho destrói.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Pecado', resumo: 'Aquino vê no orgulho o pecado que precede a queda — Uzias se orgulhou e caiu.', citacao: '«O orgulho precede a queda — Uzias é exemplo.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Advertência', resumo: 'Calvino vê na história uma advertência — devemos manter a humildade mesmo quando prosperamos.', citacao: '«A prosperidade não deve gerar orgulho — a humildade é necessária sempre.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Gravidade', resumo: 'Barth vê na queda de Uzias a gravidade do orgulho — ele é pecado grave.', citacao: '«O orgulho é pecado grave — Uzias é exemplo da sua gravidade.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Exemplo', resumo: 'Stott vê em Uzias um exemplo — devemos manter a humildade mesmo quando bem-sucedidos.', citacao: '«Uzias é exemplo — a humildade é necessária mesmo no sucesso.»' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════
  // JOEL
  // ═══════════════════════════════════════════════════════════════════════
  {
    livro: 'jl', capitulo: 2, versiculo: 28,
    tema: 'Derramarei do meu Espírito',
    contexto: 'A promessa mais famosa de Joel — Deus derramará Seu Espírito sobre toda carne. Pedro cita este versículo no Pentecostes (Atos 2:17).',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Pentecostes', resumo: 'Agostinho vê na promessa o Pentecostes — o Espírito é derramado sobre todos.', citacao: '«O Pentecostes é o cumprimento — o Espírito é derramado sobre todos.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Dons', resumo: 'Aquino vê no derramamento a distribuição dos dons — Deus dá dons a todos.', citacao: '«Deus distribui dons a todos — o derramamento é graça universal.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Nova aliança', resumo: 'Calvino vê no derramamento a nova aliança — Deus escreve Sua Lei nos corações.', citacao: '«A nova aliança é Espírito nos corações — Deus escreve Sua Lei em nós.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Universalidade', resumo: 'Barth vê no derramamento a universalidade — o Espírito é para todos, sem distinção.', citacao: '«O Espírito é para todos — a promessa é universal.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Missões', resumo: 'Stott vê no derramamento o início das missões — o Espírito capacita para testemunhar.', citacao: '«O derramamento é início das missões — o Espírito capacita para testemunhar.»' },
    ],
  },
  {
    livro: 'jl', capitulo: 2, versiculo: 32,
    tema: 'Todo aquele que invocar o nome do Senhor será salvo',
    contexto: 'Uma das primeiras declarações de salvação pela fé — quem invocar o nome do Senhor será salvo. Pedro cita em Atos 2:21.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Salvação', resumo: 'Agostinho vê na invocação o caminho da salvação — basta chamar o nome do Senhor.', citacao: '«A salvação é pela invocação — basta chamar o nome do Senhor.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Fé', resumo: 'Aquino vê na invocação o ato de fé — invocar é crer.', citacao: '«Invocar é crer — a fé se manifesta na invocação.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Promessa', resumo: 'Calvino vê na salvação uma promessa — Deus salva todos que O chamam.', citacao: '«A salvação é promessa — Deus salva todos que O chamam.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Graça', resumo: 'Barth vê na invocação a graça — Deus salva por graça, não por obras.', citacao: '«A salvação é graça — Deus salva sem obras.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Universalidade', resumo: 'Stott vê na salvação a universalidade — todos podem ser salvos.', citacao: '«A salvação é para todos — todos podem ser salvos.»' },
    ],
  },
  {
    livro: 'jl', capitulo: 2, versiculo: 13,
    tema: 'Rasgai o vosso coração, e não as vossas vestes',
    contexto: 'Deus pede arrependimento genuíno — não rasgar vestes (ritual), mas rasgar o coração (sinceridade). O culto exterior sem coração não vale.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Interioridade', resumo: 'Agostinho vê no arrependimento a interioridade — Deus olha para o coração, não para a aparência.', citacao: '«Deus olha para o coração — o arrependimento é interior.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Sinceridade', resumo: 'Aquino vê no rasgar do coração a sinceridade — Deus aceita apenas o que é sincero.', citacao: '«Deus aceita apenas o sincero — o ritual sem coração é vazio.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Interior', resumo: 'Calvino vê no versículo o culto interior — Deus não aceita rituais sem-heart.', citacao: '«Deus não aceita rituais sem-heart — o culto é interior.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Autenticidade', resumo: 'Barth vê no rasgar do coração a autenticidade — Deus quer autenticidade, não performance.', citacao: '«Deus quer autenticidade — o rasgar do coração é real.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Arrependimento', resumo: 'Stott vê no versículo o arrependimento genuíno — ele começa no coração.', citacao: '«O arrependimento genuíno começa no coração — não na aparência.»' },
    ],
  },
  {
    livro: 'jl', capitulo: 3, versiculo: 14,
    tema: 'Santificai guerreiros',
    contexto: 'Deus convoca guerreiros para o vale de Josafá — o julgamento das nações. É um chamado à ação para os que seguem a Deus.',
    interpretacoes: [
      { teologo: 'Agostinho de Hipona', periodo: '354-430 d.C.', tradicao: 'Patrística', visao: 'Guerra espiritual', resumo: 'Agostinho vê no chamado a guerra espiritual — Deus convoca para lutar contra o mal.', citacao: '«Deus convoca para a guerra espiritual — devemos lutar contra o mal.»' },
      { teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Justiça', resumo: 'Aquino vê no chamado a justiça — Deus convoca para proclamar Sua justiça.', citacao: '«Deus convoca para a justiça — devemos proclamar Sua justiça.»' },
      { teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Soberania', resumo: 'Calvino vê no chamado a soberania — Deus convoca porque é Ele quem lidera.', citacao: '«Deus lidera — o chamado é Sua soberania em ação.»' },
      { teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia Dialética', visao: 'Pró-atividade', resumo: 'Barth vê no chamado a pró-atividade — Deus convoca à ação, não à passividade.', citacao: '«Deus convoca à ação — não devemos ser passivos.»' },
      { teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica', visao: 'Discipulado', resumo: 'Stott vê no chamado o discipulado — ser discípulo é estar pronto para agir.', citacao: '«Ser discípulo é estar pronto para agir — o chamado é para ação.»' },
    ],
  },
];

for (const e of estudosCatalogoRestante) addToIndex(e);

export function obterEstudos(livro: string, capitulo: number, versiculo: number): EstudoVersiculo[] {
  return byRefMap.get(`${livro}:${capitulo}:${versiculo}`) || [];
}

export function temEstudo(livro: string, capitulo: number, versiculo: number): boolean {
  return byRefMap.has(`${livro}:${capitulo}:${versiculo}`);
}

export function listarTodosEstudos(): EstudoVersiculo[] {
  return Array.from(byRefMap.values()).flat();
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
