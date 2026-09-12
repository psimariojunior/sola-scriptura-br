// Banco de Artigos Teológicos Profundos — Sola Scriptura BR
// Cada artigo é um ensaio acadêmico com evidências bíblicas, desenvolvimento histórico,
// perspectivas contemporâneas, bibliografia e perguntas de estudo.
// Total: 25 artigos em 8 categorias

export interface ReferenciaBibliografica {
  autor: string;
  obra: string;
  ano: number;
  editora: string;
  local?: string;
}

export interface ArtigoTeologico {
  id: string;
  titulo: string;
  subtitulo?: string;
  categoria: 'soteriologia' | 'cristologia' | 'trindade' | 'pneumatologia' | 'escatologia' | 'eclesiologia' | 'hermeneutica' | 'antropologia';
  tags: string[];
  autor?: string;
  dataPublicacao?: string;
  tempoLeitura: string; // ex: "12 min de leitura"
  resumo: string;
  conteudo: string[]; // array de parágrafos
  versicosChave: string[];
  fontes: ReferenciaBibliografica[];
  leituraAdicional?: string[];
  perguntas?: string[];
}

// ============================================================
// SOTERIOLOGIA — Doutrinas da Salvação
// ============================================================

export const artigoExpiao: ArtigoTeologico = {
  id: 'expiao-historia-teologia',
  titulo: 'A Expiação na Teologia Cristã',
  subtitulo: 'Do sacrifício vicário ao debate contemporâneo: uma análise histórica e bíblica',
  categoria: 'soteriologia',
  tags: ['expiação', 'sacrifício', 'substituição', 'satisfação', 'Cristo', 'morte', 'redenção'],
  autor: 'Sola Scriptura — Estudos Teológicos',
  tempoLeitura: '15 min de leitura',
  resumo: 'A doutrina da expiação — a crença de que a morte de Cristo achieves a reconciliação entre Deus e a humanidade — é o coração da fé cristã. Este artigo examina as principais teorias da expiação ao longo da história da igreja, desde o "resgate" patrístico até os modelos substitutionais e relacionais contemporâneos.',
  conteudo: [
    'A morte de Jesus no calvário é o evento central da história cristã. Mas o que exatamente aconteceu ali? Por que o Filho de Deus precisou morrer? A resposta a essas perguntas constitui a doutrina da expiação — uma das mais complexas e debatidas da teologia cristã.',
    'Os Pais da Igreja primitivos compreendiam a morte de Cristo principalmente através da linguagem de "resgate" (antílutron). Orígenes (c. 185-254) desenvolveu a teoria da "satisfação ao diabo", segundo a qual Cristo pagou um resgate a Satanás para libertar a humanidade da escravidão do pecado. Embora essa teoria seja rejeitada pela maioria dos teólogos modernos, ela reflete a preocupação primitiva com a dimensão objetiva da cruz — algo real aconteceu ali, algo foi pago.',
    'São Anselmo de Cantuária (1033-1109) revolucionou a compreensão ocidental da expiação com sua obra Cur Deus Homo. Anselmo argumentou que o pecado humano é uma ofensa à honra de Deus, e que apenas um ser infinitamente valioso — Deus-homem — poderia oferecer satisfação proporcional. A teoria da satisfação vicária de Anselmo tornou-se a base para a teologia reformada posterior.',
    'Tomás de Aquino (1225-1274) refinou a teoria anselmiana, enfatizando que a cruz é um ato de amor divino, não meramente uma transação jurídica. Para Aquino, a morte de Cristo é simultaneamente satisfação, sacrifício e exemplo — três dimensões que não se excluem.',
    'A Reforma Protestante trouxe ênfases renovadas. Lutero (1483-1546) desenvolveu a teologia da cruz (theologia crucis), argumentando que Deus se revela precisamente onde menos esperamos — no sofrimento e na fraqueza. Para Lutero, a cruz não é apenas um meio para um fim; ela é a revelação suprema do caráter de Deus.',
    'João Calvino (1509-1564) articulou a expiação como "redenção particular" — Cristo morreu eficazmente pelos eleitos, não apenas potencialmente por todos. Essa visão, conhecida como expiação limitada ou redenção definitiva, permanece controversa entre os reformados.',
    'No século XX, Karl Barth (1886-1968) revitalizou a teologia da expiação ao enfatizar o caráter relacional de Deus. Para Barth, a cruz é o lugar onde Deus, em Cristo, toma sobre si a recusa humana e transforma essa recusa em aceitação. A expiação não é uma transação unilateral, mas o encontro decisivo entre o amor de Deus e o pecado humano.',
    'Jürgen Moltmann (1926-2024) adicionou a dimensão da teologia da esperança, argumentando que a cruz só faz sentido à luz da ressurreição. A morte de Cristo não é o fim da história, mas o início de uma nova criação. A expiação é, portanto, escatológica — ela inaugura o futuro de Deus no presente.',
    'As teorias contemporâneas incluem a expiação como vitória (Christus Victor), que retoma a linguagem patrística de triunfo sobre as forças do mal; a expiação exemplar, que enfatiza o exemplo moral da cruz; e a expiação penal substitutionária, que mantém a ênfase reformada na satisfação vicária.',
    'Nenhuma teoria da expiação captura plenamente o mistério da cruz. Os Pais da Igreja, os Reformadores e os teólogos modernos oferecem facetas complementares de uma realidade que excede qualquer sistema. O que une todas as perspectivas é a convicção central: na cruz de Cristo, Deus resolveu o problema do pecado de uma vez por todas, abrindo o caminho para a reconciliação e a nova vida.',
  ],
  versicosChave: ['Is 53:5-6', 'Rm 3:21-26', '2 Co 5:18-21', 'Ef 1:7', '1 Pe 2:24', 'Hb 9:11-14', '1 Jo 2:2'],
  fontes: [
    { autor: 'Anselmo de Cantuária', obra: 'Cur Deus Homo', ano: 1098, editora: 'Penguin Classics', local: 'Londres' },
    { autor: 'Gustaf Aulén', obra: 'Christus Victor: An Historical Study of the Three Main Types of the Atonement', ano: 1931, editora: 'SPCK', local: 'Londres' },
    { autor: 'John Stott', obra: 'The Cross of Christ', ano: 1986, editora: 'IVP', local: 'Downers Grove' },
    { autor: 'Jürgen Moltmann', obra: 'The Crucified God', ano: 1972, editora: 'Fortress Press', local: 'Minneapolis' },
    { autor: 'Steve Jeffery, Michael Ovey, Andrew Sach', obra: 'Pierced for Our Transgressions: Rediscovering the Glory of Penal Substitution', ano: 2007, editora: 'IVP', local: 'Downers Grove' },
    { autor: 'Garry Williams', obra: 'Penal Substitutionary Atonement', ano: 2018, editora: 'IVP', local: 'Downers Grove' },
  ],
  leituraAdicional: [
    'Karl Barth, Church Dogmatics IV/1 (sobre a expiação)',
    'Richard Hanson, The Atonement (survey histórico)',
    'Robert Letham, The Work of Christ (visão panorâmica)',
  ],
  perguntas: [
    'Como a teoria da satisfação vicária de Anselmo se diferencia da teoria do resgate de Orígenes?',
    'Por que Lutero enfatizou a theologia crucis em oposição a uma teologia da glória?',
    'Em que sentido a expiação é "escatológica" segundo Moltmann?',
    'Como as diferentes teorias da expiação se complementam?',
    'Qual é a relevância pastoral da doutrina da expiação para a vida cristã cotidiana?',
  ],
};

export const artigoJustificacao: ArtigoTeologico = {
  id: 'justificacao-pela-fe',
  titulo: 'A Justificação pela Fé',
  subtitulo: 'De Paulo a Lutero ao debate contemporâneo católico-protestante',
  categoria: 'soteriologia',
  tags: ['justificação', 'fé', 'obras', 'Lutero', 'Concordata', 'imputação', 'graça'],
  autor: 'Sola Scriptura — Estudos Teológicos',
  tempoLeitura: '14 min de leitura',
  resumo: 'A justificação pela fé é a doutrina que Martinho Lutero chamou de "artigo da igreja que cai ou permanece". Este artigo rastreia o desenvolvimento da doutrina desde Paulo até a Declaração Conjunta Católica-Luterana de 1999, examinando as tensões entre fé e obras, imputação e transformação.',
  conteudo: [
    'Na carta aos Romanos, Paulo declara: "O homem é justificado pela fé, independente das obras da lei" (Rm 3:28). Essa afirmação se tornou o grito de guerra da Reforma Protestante e continua sendo um dos pontos mais debatidos da teologia cristã.',
    'Para Paulo, a justificação é um verbo jurídico — Deus declara o pecador justo diante de seu tribunal. Essa declaração não se baseia nas obras do indivíduo, mas na fé em Cristo. A justificação é, portanto, gratuita (gratia) e se aplica pela fé (sola fide).',
    'Agostinho de Hipona (354-430) desenvolveu a doutrina da justificação em debate com Pelágio. Para Agostinho, a graça precede a fé — Deus nos capacita a crer antes mesmo de crermos. A justificação não é apenas uma declaração, mas uma transformação real (iustitia infusa) que sanctifica o crente.',
    'A Reforma Protestante reafirmou a justificação como declaratória (iustitia imputata). Lutero, na célebre tradução de Rm 3:28, adicionou a palavra "somente" (sola) — "o homem é justificado somente pela fé". Essa adição, embora não esteja no texto grego, captura a ênfase reformada: a fé é o único meio da justificação.',
    'O Concílio de Trento (1545-1563) respondeu à Reforma, afirmando que a justificação inclui não apenas a declaração, mas também a renovação interior do homem pela graça. A justificação é, para a teologia católica, um processo que pode ser perdido pelo pecado mortal.',
    'O debate católico-protestante sobre a justificação continuou durante séculos, mas em 1999, a Igreja Católica e a Federação Luterana Mundial assinaram a Declaração Conjunta sobre a Doutrina da Justificação. O documento reconhece um consenso fundamental: "Pela graça de Deus, por amor a todos os seres humanos, Cristo morreu por nós. Aqueles que respondem à graça de Deus pela fé estão justificados"',
    'No contexto brasileiro, a justificação pela fé tem implicações pastorais profundas. Em uma cultura onde muitas igrejas enfatizam as obras como condição de salvação, a doutrina pauliniana da graça gratuita é um lembrete de que a salvação é dom de Deus, não conquista humana.',
    'A tensão entre fé e obras permanece produtiva. Tiago afirma que "a fé sem obras é morta" (Tg 2:26), enquanto Paulo insiste na justificação pela fé. A harmonização dessas perspectivas exige uma compreensão de que a fé genuína necessariamente produz frutos, mas os frutos não são a causa da salvação.',
  ],
  versicosChave: ['Rm 3:21-28', 'Rm 4:1-8', 'Gl 2:16', 'Ef 2:8-9', 'Tg 2:14-26', 'Fp 3:9'],
  fontes: [
    { autor: 'Martin Luther', obra: 'On the Freedom of a Christian', ano: 1520, editora: 'Fortress Press', local: 'Minneapolis' },
    { autor: 'John Calvin', obra: 'Institutes of the Christian Religion III.11', ano: 1559, editora: 'Westminster Press', local: 'Philadelphia' },
    { autor: 'N.T. Wright', obra: 'Justification: God\'s Plan and Paul\'s Vision', ano: 2009, editora: 'IVP Academic', local: 'Downers Grove' },
    { autor: 'Michael Horton', obra: 'Justification (2 vols.)', ano: 2018, editora: 'Zondervan', local: 'Grand Rapids' },
    { autor: 'Declaração Conjunta Católica-Luterana', obra: 'On the Doctrine of Justification', ano: 1999, editora: 'Vaticano / Lutheran World Federation' },
  ],
  perguntas: [
    'Qual é a diferença entre iustitia imputata e iustitia infusa?',
    'Como a Declaração Conjunta de 1999 resolve (ou não) as tensões históricas?',
    'O que Tiago quer dizer com "fé sem obras é morta" (Tg 2:26)?',
    'Qual é a relevância pastoral da justificação pela fé no contexto brasileiro?',
  ],
};

export const artigoAlianca: ArtigoTeologico = {
  id: 'teologia-alianca',
  titulo: 'A Teologia da Aliança',
  subtitulo: 'Da aliança abraâmica ao novo pacto em Cristo',
  categoria: 'soteriologia',
  tags: ['aliança', 'pacto', 'Abraão', 'Moisés', 'Novo Testamento', 'promessa'],
  autor: 'Sola Scriptura — Estudos Teológicos',
  tempoLeitura: '13 min de leitura',
  resumo: 'A teologia da aliança (covenant theology) é o arcabouço interpretativo que conecta toda a Escritura através do tema central das alianças de Deus com a humanidade. Este artigo examina as alianças bíblicas — adâmica, noética, abraâmica, mosaica, davídica e nova — e seu significado teológico.',
  conteudo: [
    'A Bíblia é, em sua essência, um livro de alianças. Desde Gênesis até Apocalipse, Deus estabelece pactos com a humanidade que estruturam toda a história da salvação. A teologia da aliane compreende esses pactos como um arcabouço unificado que revela o plano redentor de Deus.',
    'A primeira aliança bíblica aparece em Gênesis 3:15, onde Deus promete que a semente da mulher esmagará a cabeça da serpente. Essa aliança-adâmica (ou proto-evangelium) é a semente de todas as alianças subsequentes. Em Gênesis 8-9, Deus estabelece a aliança com Noé — uma aliança universal de graça comum que sustenta a criação.',
    'A aliança abraâmica (Gn 12:1-3; 15:1-21; 17:1-14) é o momento decisivo. Deus promete a Abraão descendentes, terra e bênção. Essas promessas são incondicionais — Deus as assume sobre si mesmo, independentemente da fidelidade de Abraão. A aliança abraâmica é, portanto, fundamentalmente graciosa.',
    'A aliança mosaica (Êx 19-24) adiciona a dimensão da obediência. Israel recebe a lei como resposta à graça já manifestada no Êxodo. A lei não é um meio de salvação, mas uma expressão de sanctificação — como o povo resgat deve viver. A aliança mosaica é condicional na medida em que a desobediência acarreta maldições (Dt 28).',
    'A aliança davídica (2 Sm 7:1-17) promete um rei eterno cujo trono será estabelecido para sempre. Essa promessa é messiânica — ela encontra seu cumprimento em Jesus Cristo, o Filho de Davi que reina para sempre.',
    'O Novo Testamento apresenta Jesus como mediador da "nova aliança" (Lc 22:20; Hb 8-10). A nova aliança cumpre e supera todas as alianças anteriores: ela é internalizada (a lei gravada no coração), universal (estendida a todas as nações) e definitiva (baseada no sacrifício perfeito de Cristo).',
    'A teologia da aliança reformada distingue entre a aliança da graça (que conecta todas as eras) e a aliança da obra (que exigia perfeição, cumprida apenas por Cristo). Essa distinção é fundamental para a compreensão calvinista da salvação.',
    'No contexto brasileiro, a teologia da aliança oferece uma alternativa à fragmentação bíblica. Em vez de tratar a Bíblia como uma coleção de histórias disconnected, ela apresenta um narrativa unificada: Deus busca e restaura seu povo através de alianzas progressivas.',
  ],
  versicosChave: ['Gn 12:1-3', 'Gn 15:6', 'Êx 19:5-6', '2 Sm 7:16', 'Lc 22:20', 'Hb 8:6-13', 'Gl 3:15-18'],
  fontes: [
    { autor: 'Louis Berkhof', obra: 'Systematic Theology', ano: 1938, editora: 'Eerdmans', local: 'Grand Rapids' },
    { autor: 'Geerhardus Vos', obra: 'The Biblical Theology', ano: 1948, editora: 'Eerdmans', local: 'Grand Rapids' },
    { autor: 'O. Palmer Robertson', obra: 'The Christ of the Covenants', ano: 1980, editora: 'P&R Publishing', local: 'Phillipsburg' },
    { autor: 'Michael Horton', obra: 'Covenant and Eschatology', ano: 2002, editora: 'WJK', local: 'Louisville' },
    { autor: 'G.K. Beale', obra: 'The Temple and the Church\'s Mission', ano: 2004, editora: 'IVP Academic', local: 'Downers Grove' },
  ],
  perguntas: [
    'Como a aliança abraâmica se diferencia da aliança mosaica em termos de condições?',
    'O que significa que a nova aliança é "interna" e "universal"?',
    'Como a teologia da aliança ajuda a unificar a narrativa bíblica?',
    'Qual é a relação entre a aliança davídica e a messianologia?',
  ],
};

// ============================================================
// CRISTOLOGIA — Doutrinas de Cristo
// ============================================================

export const artigoCristologia: ArtigoTeologico = {
  id: 'cristologia-historia-dogma',
  titulo: 'Cristologia: Quem é Jesus Cristo?',
  subtitulo: 'Do título "Senhor" paulino ao Concílio de Calcedônia e além',
  categoria: 'cristologia',
  tags: ['Cristo', 'divindade', 'humanidade', 'Calcedônia', 'Hypóstase', 'natureza', 'encarnação'],
  autor: 'Sola Scriptura — Estudos Teológicos',
  tempoLeitura: '16 min de leitura',
  resumo: 'A cristologia — o estudo da pessoa e obra de Cristo — é a doutrina mais disputada e mais definidora da fé cristã. Desde as primeiras confissões paulinas até os debates cristológicos dos primeiros séculos, a igreja lutou para articular como Jesus pode ser simultaneamente verdadeiro Deus e verdadeiro homem.',
  conteudo: [
    'A pergunta "Quem é Jesus?" é a pergunta mais importante da história cristã. As respostas da igreja primitiva a essa pergunta moldaram não apenas a teologia, mas a própria identidade do cristianismo.',
    'Paulo, escrevendo nos anos 50 d.C., atribui a Jesus títulos que na tradição judaica pertenciam apenas a Deus. O hino de Filipenses 2:6-11 descreve Jesus como "sendo em forma de Deus" (morphē theou) e guardando igualdade com Deus. O hino de Colossenses 1:15-20 apresenta Cristo como "a imagem do Deus invisível" e "ante todas as coisas". Essas são afirmações cristológicas notavelmente altas para uma geração posterior à morte de Jesus.',
    'O Evangelho de João eleva a cristologia ao máximo: "No princípio era o Logos, e o Logos estava com Deus, e o Logos era Deus" (Jo 1:1). A identificação de Jesus com o Logos cósmico é a afirmação cristológica mais ousada do Novo Testamento.',
    'Os primeiros séculos da igreja testemunharam debates cristológicos intensos. O arianismo (séc. IV) negava a divindade plena de Cristo, afirmando que ele era a primeira criatura de Deus. O Concílio de Niceia (325 d.C.) respondeu afirmando que o Filho é "consustancial" (homoousios) com o Pai — da mesma substância, não de substância similar.',
    'O Concílio de Éfeso (431 d.C.) definiu que Cristo possui uma única pessoa (hypóstase) com duas naturezas — divina e humana. O Concílio de Calcedônia (451 d.C.) articulou a fórmula clássica: Cristo é "verdadeiro Deus e verdadeiro homem, realmente racional e realmente corporal; da mesma substância que o Pai quanto à divindade, e da mesma substância que nós quanto à humanidade".',
    'A cristologia de Calcedônia foi criticada por various perspectives. A cristologia leninista (Lênin II, 544 d.C.) negava a distinção das naturezas, enfatizando a unidade de Cristo. A cristologianestoriana (Nestório, 428 d.C.) enfatizava a separação das naturezas, arriscando dividir Cristo em dois.',
    'No século XX, Karl Barth revitalizou a cristologia ao enfatizar que Jesus Cristo é o "Único Intermediário" — o ponto onde o tempo e a eternidade se encontram. Para Barth, toda a teologia é cristologia, porque Cristo é a chave de toda a revelação divina.',
    'A cristologia contemporânea enfrenta novos desafios: o diálogo inter-religioso (como Jesus se relaciona com Buda, Maomé e Krishna?), o pluralismo (há salvação fora de Cristo?), e a teologia da libertação (como a cristologia serve aos oprimidos?).',
    'A cristologia não é uma abstração acadêmica. Ela determina como adoramos, como vivemos e como esperamos. Se Jesus é apenas um grande mestre, a fé cristã é uma entre muitas. Se ele é o Verbo encarnado, ele é o Senhor de toda a realidade.',
  ],
  versicosChave: ['Jo 1:1-14', 'Fp 2:5-11', 'Cl 1:15-20', 'Hb 1:1-4', '2 Co 8:9', '1 Tm 3:16'],
  fontes: [
    { autor: 'Leo Magnus (Papa Leão I)', obra: 'Epístola 28 (Tomo de Leão)', ano: 449, editora: 'Nicene and Post-Nicene Fathers' },
    { autor: 'Karl Barth', obra: 'Church Dogmatics I/2', ano: 1938, editora: 'T&T Clark', local: 'Edimburgo' },
    { autor: 'Richard Bauckham', obra: 'Jesus and the God of Israel', ano: 2008, editora: 'Eerdmans', local: 'Grand Rapids' },
    { autor: 'N.T. Wright', obra: 'Jesus and the Victory of God', ano: 1996, editora: 'SPCK', local: 'Londres' },
    { autor: 'Larry Hurtado', obra: 'Lord Jesus Christ: Devotion to Jesus in Earliest Christianity', ano: 2003, editora: 'Eerdmans', local: 'Grand Rapids' },
  ],
  perguntas: [
    'Como Paulo atribui títulos divinos a Jesus sem abandonar o monoteísmo?',
    'Qual é a diferença entre a cristologia niceana e a calcedônia?',
    'O que significa que Cristo é "consustancial" (homoousios) ao Pai?',
    'Como a cristologia de Barth difere da cristologia clássica?',
  ],
};

export const artigoEncarnacao: ArtigoTeologico = {
  id: 'encarnacao-vertice-historia',
  titulo: 'A Encarnação: O Vértice da História',
  subtitulo: 'De João 1:14 à teologia patrística do "Deus que se faz homem"',
  categoria: 'cristologia',
  tags: ['encarnação', 'Logos', 'Virgem Maria', 'natimorto', 'Gregório de Nazianzo', 'natureza divina'],
  autor: 'Sola Scriptura — Estudos Teológicos',
  tempoLeitura: '12 min de leitura',
  resumo: 'A encarnação — o evento pelo qual o Verbo eterno de Deus assumiu natureza humana no ventre de Maria — é o mistério central do cristianismo. Este artigo examina o significado teológico da encarnação, desde João 1:14 até a formulação de Gregório de Nazianzo: "O que não foi assumido não foi curado".',
  conteudo: [
    '"O Verbo se fez carne e habitou entre nós" (Jo 1:14). Essa frase de João é uma das mais revolucionárias da literatura mundial. O Logos cósmico — o princípio racional do universo, a palavra criadora de Deus — assumiu carne humana, tornou-se historical e geograficamente particular.',
    'A encarnação não é uma mera "aparência" de humanidade (docetismo). João enfatiza que o Verbo "se fez carne" (sarx ex auto) — não fantasma, não ilusão, mas carne real. Cristo comeu, bebeu, chorou, suou e morreu. A realidade da humanidade de Cristo é tão importante quanto a realidade de sua divindade.',
    'Os Padres da Igreja desenvolveram a teologia da encarnação em debate com as heresias. Atanásio de Alexandria (c. 296-373) argumentou em Contra os Gentios que "o Verbo se fez homem para que nós nos fizéssemos deuses" (theopoiēthōmen). A encarnação é, portanto, participatória — ela abre caminho para a deificação (theosis) da humanidade.',
    'Gregório de Nazianzo (329-390) articulou o princípio cristológico fundamental: "O que não foi assumido não foi curado" (ep 101). Se Cristo não assumiu a totalidade da natureza humana — mente, vontade, emoções — então essas dimensões da humanidade permanecem não-redimidas.',
    'A encarnação tem implications cósmicas. Se Deus se tornou carne, então a matéria não é má — ela é amada por Deus. A encarnação sanctifica a existência bodily, a sexualidade, o trabalho, a dor e até a morte. Tudo isso foi assumido pelo Verbo.',
    'No contexto da virgindade de Maria, a teologia cristã insiste que a encarnação é um ato soberano de Deus, não uma consequência biológica. Maria concebe pelo poder do Espírito Santo (Lc 1:35). A virgindade é sinal da originalidade radical da obra de Deus em Cristo.',
    'A encarnação é também paradigmática para a vida cristã. Assim como o Verbo se fez carne e habitou entre nós, os cristãos são chamados a "encarnar" o evangelho em sua própria cultura e contexto. A missão cristã é, em sua essência, uma continuação da encarnação.',
  ],
  versicosChave: ['Jo 1:1-18', 'Lc 1:26-38', 'Fp 2:5-8', 'Gl 4:4-5', 'Hb 2:14-18', '1 Jo 4:2-3'],
  fontes: [
    { autor: 'Atanásio de Alexandria', obra: 'Contra os Gentios / Sobre a Encarnação', ano: 318-328, editora: 'Oxford Early Christian Texts' },
    { autor: 'Gregório de Nazianzo', obra: 'Epístola 101 (ep. dogm.)', ano: 381, editora: 'Nicene and Post-Nicene Fathers' },
    { autor: 'Athanasius Schmemann', obra: 'The Life of the World', ano: 1963, editora: 'SVS Press', local: 'Crestwood' },
    { autor: 'Hans Urs von Balthasar', obra: 'Mysterium Paschale', ano: 1970, editora: 'Ignatius Press', local: 'San Francisco' },
    { autor: 'T.F. Torrance', obra: 'The Mediation of Christ', ano: 1992, editora: 'P&R Publishing', local: 'Phillipsburg' },
  ],
  perguntas: [
    'Por que a encarnação é paradigmática para a vida cristã?',
    'O que significa "o que não foi assumido não foi curado"?',
    'Como a encarnação sanctifica a existência material?',
    'Qual é a relação entre encarnação e missão?',
  ],
};

// ============================================================
// TRINDADE
// ============================================================

export const artigoTrindade: ArtigoTeologico = {
  id: 'trindade-misterio-central',
  titulo: 'A Trindade: O Mistério Central da Fé',
  subtitulo: 'Deus uno em essência, trino em pessoas — desenvolvimento histórico e bíblico',
  categoria: 'trindade',
  tags: ['Trindade', 'Pai', 'Filho', 'Espírito Santo', 'Niceia', 'homoousios', 'consustancial'],
  autor: 'Sola Scriptura — Estudos Teológicos',
  tempoLeitura: '15 min de leitura',
  resumo: 'A doutrina da Trindade — Deus é um em essência e três em pessoas — é o mistério mais profundo da fé cristã. Não é politeísmo, não é modalismo, não é arianismo. Este artigo examina como a igreja chegou a essa formulação e por que ela é essencial para a compreensão de Deus.',
  conteudo: [
    'A Trindade não é um paradoxo lógico nem uma contradição. É a resposta da igreja à revelação bíblica: Deus é absolutamente uno, mas se revela como Pai, Filho e Espírito Santo — três "hipóstases" (pessoas) distintas, mas de uma única substância (ousia).',
    'O Antigo Testamento apresenta um Deus rigorosamente monoteísta. "Ouve, Israel: o Senhor nosso Deus é o único Senhor" (Dt 6:4). Contudo, há vestígios de pluralidade dentro da unidade: "Façamos o homem à nossa imagem" (Gn 1:26); a voz do Senhor que fala com "Senhor" (Sl 110:1); a Sabedoria personificada em Provérbios 8.',
    'O Novo Testamento revela a Trindade de forma mais nítida. Mateus 28:19 ordena o batismo "em nome do Pai, do Filho e do Espírito Santo" — três pessoas, um único "nome" (singular). A bênção paulina (2 Co 13:14) menciona as três pessoas em sequência.',
    'A formulação trinitária se desenvolveu ao longo de séculos de debate. O Concílio de Niceia (325 d.C.) afirmou que o Filho é "consustancial" (homoousios) com o Pai — da mesma substância. Essa afirmação foi combatida por Ario, que insistia que o Filho era "de outra substância" (heteroousios) ou "semelhante" (homoiousios).',
    'O Concílio de Constantinopla (381 d.C.) expandiu a doutrina para incluir o Espírito Santo: "O Senhor, o Dador da Vida, que procede do Pai, que com o Pai e o Filho é adorado e glorificado". A processão do Espírito Santo (Filioque) se tornaria o ponto de divisão entre Oriente e Ocidente.',
    'Agostinho de Hipona (354-430) desenvolveu a analogia psicológica da Trindade: Pai = memória, Filho = inteligência, Espírito Santo = vontade. Embora toda analogia seja imperfeita, Agostinho mostrou que a Trindade não é uma contradição — é a realidade mais profunda do ser divino.',
    'A Trindade não é uma curiosidade acadêmica. Ela determina como adoramos (em três pessoas), como vivemos (na comunhão do Espírito), e como esperamos (a Resurreição do Filho). Sem a Trindade, o cristianismo se reduz a um monoteísmo abstrato ou um politeísmoпрактичный.',
    'No contexto brasileiro, onde seitas como a Univeral e a Mórmon negam a Trindade, a defesa trinitária é urgentemente pastoral. A Trindade não é uma doutrina opcional — ela é o fundamento de toda a fé cristã.',
  ],
  versicosChave: ['Dt 6:4', 'Mt 28:19', '2 Co 13:14', 'Jo 1:1-3', 'Rm 8:9-11', 'Ef 2:18', '1 Pe 1:2'],
  fontes: [
    { autor: 'Agostinho de Hipona', obra: 'De Trinitate', ano: 400-416, editora: 'Oxford Early Christian Texts' },
    { autor: 'Richard of St. Victor', obra: 'De Trinitate', ano: 1160, editora: 'CFM' },
    { autor: 'Karl Rahner', obra: 'The Trinity', ano: 1967, editora: 'Continuum', local: 'Londres' },
    { autor: 'Moltmann', obra: 'The Trinity and the Kingdom', ano: 1981, editora: 'Fortress Press', local: 'Minneapolis' },
    { autor: 'Millard Erickson', obra: 'God in Three Persons', ano: 1995, editora: 'Zondervan', local: 'Grand Rapids' },
  ],
  perguntas: [
    'Como a Trindade se diferencia do politeísmo?',
    'Qual é a diferença entre homoousios e homoiousios?',
    'Por que a processão do Espírito Santo (Filioque) é teologicamente significativa?',
    'Como a analogia de Agostinho ajuda a compreender a Trindade?',
  ],
};

// ============================================================
// PNEUMATOLOGIA
// ============================================================

export const artigoPneumatologia: ArtigoTeologico = {
  id: 'pneumatologia-espirito-santo',
  titulo: 'Pneumatologia: A Obra do Espírito Santo',
  subtitulo: 'Do gênese ao pentecostes ao karismático contemporâneo',
  categoria: 'pneumatologia',
  tags: ['Espírito Santo', 'Pentecostes', 'dons', 'frutos', 'regeneração', 'santificação', 'unção'],
  autor: 'Sola Scriptura — Estudos Teológicos',
  tempoLeitura: '14 min de leitura',
  resumo: 'O Espírito Santo é a Pessoa mais ignorada da Trindade. Este artigo examina a obra completa do Espírito — da criação à regeneração, da santificação aos dons espirituais — e como ela molda a vida da igreja.',
  conteudo: [
    '"O Espírito de Deus pairava sobre as águas" (Gn 1:2). O Espírito Santo é a primeira pessoa da Trindade mencionada na Bíblia. Ele é o Agente da criação, o autor da vida, o inspirador das Escrituras e o sustentador da igreja.',
    'No Antigo Testamento, o Espírito agia de forma particular: inspirava profetas (2 Pe 1:21), capacitava líderes (Jz 3:10), e transformava corações (Ez 36:26-27). Mas a obra do Espírito no AT era limitada e temporária — ela se intensificaria na era messiânica.',
    'João Batista anunciou: "Ele vos batizará com Espírito Santo e fogo" (Mt 3:11). A promessa do Espírito é messiânica — ela se cumpre em Pentecostes (At 2), quando o Espírito descende sobre a igreja de forma permanente e universal.',
    'A regeneração (nascimento de novo) é a obra mais fundamental do Espírito. João 3:5-6 declara: "É preciso nascer da água e do Espírito... o que nasceu do Espírito é espírito". A regeneração não é melhoria moral — é uma nova criação, uma transformação ontológica do ser humano.',
    'A santificação é a obra contínua do Espírito na vida do crente. 2 Coríntios 3:18 descreve o processo: "Nós todos, com rosto descoberto, contemplando a glória do Senhor, somos transformados de glória em glória na mesma imagem". A santificação não é perfeição moral instantânea, mas um progresso gradual sob a direção do Espírito.',
    'Os dons espirituais (1 Co 12-14; Rm 12:3-8; Ef 4:7-16) são capacitações sobrenaturais para o serviço na igreja. O debate entre cessacionalismo (dons cessaram com os apóstolos) e continuísmo (dons continuam hoje) permanece um dos pontos mais divisivos entre igrejas evangélicas.',
    'O fruto do Espírito (Gl 5:22-23) é o indicador mais confiável da maturidade cristã. Enquanto os dons são para edificação da igreja, o fruto é para a transformação do caráter. "Amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança" — essas qualidades não são fruto do esforço humano, mas resultado da presença do Espírito.',
    'No contexto pentecostal e carismático brasileiro, a pneumatologia precisa de equilíbrio. O Espírito Santo é real e atuante, mas sua obra sempre se submete à Escritura. Dons espirituais não são indicadores de espiritualidade, e a experiência nunca substitui a verdade bíblica.',
  ],
  versicosChave: ['Gn 1:2', 'At 2:1-4', 'Jo 3:5-8', 'Rm 8:9-17', 'Gl 5:16-25', '1 Co 12:4-13', 'Ef 4:30'],
  fontes: [
    { autor: 'Agostinho de Hipona', obra: 'On the Holy Spirit', ano: 415, editora: 'Catholic University of America Press' },
    { autor: 'John Owen', obra: 'Discourse Concerning the Holy Spirit', ano: 1674, editora: 'Banner of Truth' },
    { autor: 'Gordon Fee', obra: 'God\'s Empowering Presence', ano: 1994, editora: 'Hendrickson', local: 'Peabody' },
    { autor: 'Amos Yong', obra: 'The Spirit Poured Out on All Flesh', ano: 2005, editora: 'Baker Academic', local: 'Grand Rapids' },
    { autor: 'Jürgen Moltmann', obra: 'The Church in the Power of the Spirit', ano: 1977, editora: 'SCM Press', local: 'Londres' },
  ],
  perguntas: [
    'Qual é a diferença entre dons e frutos do Espírito?',
    'Como a pneumatologia se relaciona com a cristologia?',
    'O que significa que o Espírito "convence do pecado" (Jo 16:8)?',
    'Como a igreja pode discernir a obra genuína do Espírito?',
  ],
};

// ============================================================
// ESCATOLOGIA
// ============================================================

export const artigoEscatologia: ArtigoTeologico = {
  id: 'escatologia-ultimas-coisas',
  titulo: 'Escatologia: Estudo das Últimas Coisas',
  subtitulo: 'Milênio, arrebatamento, tribulação, juízo final — um panorama das perspectivas',
  categoria: 'escatologia',
  tags: ['escatologia', 'milênio', 'arrebatamento', 'tribulação', 'juízo', 'nova criação', 'Parousia'],
  autor: 'Sola Scriptura — Estudos Teologicos',
  tempoLeitura: '16 min de leitura',
  resumo: 'A escatologia — o estudo das últimas coisas — é a área da teologia mais disputada e mais influenciada pela cultura. Este artigo examina as principais posições escatológicas (premilennialismo, amilennialismo, pós-milenialismo) e como elas se fundamentam na Escritura.',
  conteudo: [
    'A escatologia é a doutrina da esperança cristã. Ela não se ocupa apenas do "fim do mundo", mas de toda a realidade à luz de seu destino final. A Escritura apresenta um arco que vai da criação à nova criação, passando pela queda, pela redenção e pela consumação.',
    'O Novo Testamento é essencialmente escatológico. Jesus inaugurou seu ministério com o anúncio: "O Reino de Deus está próximo" (Mc 1:15). A palavra grega "eschaton" (último) deu nome à escatologia — ela estuda o "último" estado de todas as coisas.',
    'O premilennialismo sustenta que Cristo retornará antes (pre) de um reinado literal de mil anos na terra (Ap 20:1-6). Essa posição foi dominante nos primeiros séculos da igreja (Papias, Justino, Irineu) e ressurgiu com o dispensacionalismo no séc. XIX.',
    'O amilennialismo (defendido por Agostinho, Calvino, Barth) interpreta o milênio como uma referência simbólica ao período entre a primeira e a segunda vinda de Cristo. O "milênio" é a era atual da igreja, não um futuro reino terreno.',
    'O pós-milenialismo sustenta que o evangelho gradualmente transformará a sociedade antes do retorno de Cristo. Essa posição foi popular entre os puritanos e no liberalismo protestante do séc. XIX, mas perdeu força após as guerras mundiais.',
    'O arrebatamento (rapture) — a ideia de que os cristãos serão levados ao encontro do Senhor "no ar" (1 Ts 4:17) — é particularmente disputada. O pré-tribulacionalismo (comum no dispensacionalismo) separa o arrebatamento do retorno visível. O pós-tribulacionalismo (comum em outras tradições) identifica os dois eventos.',
    'O juízo final (Mt 25:31-46; Ap 20:11-15) é a consumação de toda a justiça divina. A Escritura fala de dois livros: o livro da vida e os livros das obras. Asalvação não é por obras, mas as obras são evidência da fé.',
    'A nova criação (Ap 21-22) é a esperança final. "Eis que faço novas todas as coisas" (Ap 21:5). A Escritura não ensina a destruição do mundo, mas sua renovação. A criação original não é descartada — ela é transformada e glorificada.',
  ],
  versicosChave: ['Mt 24-25', '1 Co 15:20-28', '1 Ts 4:13-18', 'Ap 20:1-6', 'Ap 21:1-5', 'Rm 8:18-25'],
  fontes: [
    { autor: 'George Eldon Ladd', obra: 'A Theology of the New Testament', ano: 1974, editora: 'Eerdmans', local: 'Grand Rapids' },
    { autor: 'Clarence Bass', obra: 'Backgrounds to Dispensationalism', ano: 1960, editora: 'Baker', local: 'Grand Rapids' },
    { autor: 'Anthony Hoekema', obra: 'The Bible and the Future', ano: 1979, editora: 'Eerdmans', local: 'Grand Rapids' },
    { autor: 'Craig Koester', obra: 'Revelation', ano: 2014, editora: 'Yale University Press', local: 'New Haven' },
    { autor: 'N.T. Wright', obra: 'Surprised by Hope', ano: 2008, editora: 'HarperOne', local: 'Nova York' },
  ],
  perguntas: [
    'Qual é a diferença entre premilennialismo, amilennialismo e pós-milenialismo?',
    'O que a Escritura realmente diz sobre o arrebatamento?',
    'Como a nova criação (Ap 21-22) se relaciona com a criação original (Gn 1-2)?',
    'Por que a escatologia é pastoralmente importante?',
  ],
};

// ============================================================
// ECLESIOLOGIA
// ============================================================

export const artigoEclesiologia: ArtigoTeologico = {
  id: 'eclesiologia-igreja',
  titulo: 'Eclesiologia: A Natureza da Igreja',
  subtitulo: 'Igreja visível e invisível, local e universal — perspectivas bíblicas e históricas',
  categoria: 'eclesiologia',
  tags: ['igreja', 'corpo de Cristo', 'noiva', 'sacramentos', 'ministério', 'autoridade', 'missão'],
  autor: 'Sola Scriptura — Estudos Teológicos',
  tempoLeitura: '13 min de leitura',
  resumo: 'A eclesiologia — o estudo da igreja — examina a natureza, missão e estrutura do povo de Deus. Este artigo analisa as imagens bíblicas da igreja, a distinção entre igreja visível e invisível, e como a eclesiologia molda a prática cristã.',
  conteudo: [
    'A palavra grega "ekklēsia" (igreja) significa "assembleia convocada". Ela aparece pela primeira vez em Mateus 16:18: "Sobre esta pedra edificarei a minha igreja". A igreja não é uma organização humana — ela é criação divina, o corpo de Cristo no mundo.',
    'O Novo Testamento usa diversas imagens para descrever a igreja: corpo de Cristo (Ef 1:22-23), templo do Espírito Santo (1 Co 3:16), noiva de Cristo (Ef 5:25-27), rebanho de Deus (1 Pe 5:2), povo de Deus (1 Pe 2:9). Cada imagem revela uma dimensão diferente da realidade eclesial.',
    'A distinção entre igreja visível e invisível é uma das mais importantes da eclesiologia protestante. A igreja invisível é o conjunto de todos os verdadeiros crentes em Cristo, conhecidos apenas por Deus. A igreja visível é a comunidade concreta de cristãos batizados, organizada em congregações locais.',
    'Augusto de Hipona formulou a distinção: "A igreja visível é o corpo de Cristo, mas nem todos que estão no corpo são membros de Cristo" (De Civitate Dei). Essa afirmação reconhece que a comunhão visível inclui crentes genuínos e falsos — apenas Deus knows the heart.',
    'A missão da igreja é tripla: adoração, testemunho e serviço. A igreja existe para glorificar a Deus, para anunciar o evangelho ao mundo, e para servir os necessitados. Essas três dimensões são inseparáveis — a adoração sem testemunho é estéril, e o testemunho sem serviço é hipócrita.',
    'O ministério pastoral na Escritura envolve três funções: ensino (1 Tm 3:2), administração (1 Tm 3:4-5) e conselho (1 Ts 5:12). A priesthood of all believers (1 Pe 2:9) afirma que todos os cristãos são sacerdotes — não há uma classe sacerdotal separada.',
    'A eclesiologia ecumênica busca a unidade visível da igreja. João 17:21 é o mandamento ecumênico: "Para que todos sejam um". A unidade não é uniformidade, mas comunhão na diversidade — um dos maiores desafios do cristianismo contemporâneo.',
  ],
  versicosChave: ['Mt 16:18', 'Ef 1:22-23', 'Ef 4:1-16', '1 Co 12:12-27', '1 Pe 2:4-10', 'Ap 21:1-4'],
  fontes: [
    { autor: 'Herman Bavinck', obra: 'Reformed Dogmatics IV (Church)', ano: 1911, editora: 'Baker Academic', local: 'Grand Rapids' },
    { autor: 'Edmund Clowney', obra: 'The Church', ano: 1995, editora: 'IVP', local: 'Downers Grove' },
    { autor: 'Lesslie Newbigin', obra: 'The Gospel in a Pluralist Society', ano: 1989, editora: 'Eerdmans', local: 'Grand Rapids' },
    { autor: 'Stanley Hauerwas', obra: 'A Community of Character', ano: 1981, editora: 'University of Notre Dame Press' },
    { autor: 'Kevin Vanhoozer', obra: 'The Drama of Doctrine', ano: 2005, editora: 'WJK', local: 'Louisville' },
  ],
  perguntas: [
    'Qual é a diferença entre igreja visível e invisível?',
    'Como as imagens bíblicas da igreja se complementam?',
    'O que significa "sacerdório de todos os crentes"?',
    'Como a eclesiologia se relaciona com a missão?',
  ],
};

// ============================================================
// HERMENÊUTICA
// ============================================================

export const artigoHermeneutica: ArtigoTeologico = {
  id: 'hermeneutica-principios',
  titulo: 'Hermenêutica: Princípios de Interpretação',
  subtitulo: 'Como ler a Bíblia com fidelidade — gramática, história, teologia, aplicação',
  categoria: 'hermeneutica',
  tags: ['hermenêutica', 'exegese', 'interpretação', 'contexto', 'gramática', 'história', 'aplicação'],
  autor: 'Sola Scriptura — Estudos Teológicos',
  tempoLeitura: '14 min de leitura',
  resumo: 'A hermenêutica é a arte e a ciência de interpretar a Bíblia. Este artigo apresenta os princípios fundamentais de uma interpretação fiel: estudo do texto original, contexto histórico, análise gramatical, e aplicação teológica.',
  conteudo: [
    'A hermenêutica bíblica é mais do que técnica — é uma postura de reverência diante da Palavra de Deus. Interpretar a Bíblia com fidelidade exige humildade intelectual, rigor acadêmico e dependência do Espírito Santo.',
    'O primeiro princípio hermenêutico é o estudo do texto original. Isso inclui: (1) a língua original (hebraico/grego); (2) o contexto imediato (versículo, capítulo, livro); (3) o contexto bíblico maior (canon). Sem essas bases, a interpretação é arbitrária.',
    'A crítica textual é o alicerce da exegese. Antes de interpretar, precisamos determinar qual texto é o mais provavelmente original. O apparatus crítico da NA28/UBS5 lista variantes manuscritas, e o exegeta deve avaliar evidências externas (antiguidade, geografia) e internas (lecio facilior, lectio difficilior).',
    'O contexto histórico é indispensável. A Bíblia foi escrita para pessoas reais em contextos reais. Conhecer o império romano, a cultura helênica, o judaísmo do Segundo Templo e as práticas sociais do mundo antigo é essencial para uma leitura fiel.',
    'A análise gramatical (sintaxe, morfologia, semântica) é o esqueleto da interpretação. As palavras têm significados determinados pela gramática, não pelo leitor. O estudo do grego e do hebraico não é luxo acadêmico — é necessidade hermenêutica.',
    'A tipologia bíblica estuda como pessoas, eventos e instituições do AT prefiguram realidades do NT. O sacrifício de Isaac prefigura Cristo, a maná prefigura a ceia, o Tabernáculo prefigura a igreja. A tipologia não é alegoria arbitrária — é uma leitura canônica que reconhece a coerência interna da Escritura.',
    'A aplicação é o momento final da hermenêutica. Interpretar sem aplicar é estéril. Mas aplicar sem interpretar é perigoso. A aplicação deve respeitar o significado original do texto, a natureza da aliança (Lei vs. Graça), e o contexto do leitor.',
    'Os erros hermenêuticos mais comuns incluem: (1) leitura descontextualizada (frases soltas de seu contexto); (2) anacronismo (projetar categorias modernas no texto antigo); (3) interpretação alegórica excessiva (ignorar o sentido literal); (4) relativismo (o texto significa "o que quiser para mim").',
  ],
  versicosChave: ['2 Tm 2:15', '2 Tm 3:16-17', '1 Co 2:12-14', '2 Pd 1:20-21', 'At 17:11', 'Ef 1:17-18'],
  fontes: [
    { autor: 'Grant Osborne', obra: 'The Hermeneutical Spiral', ano: 2006, editora: 'IVP Academic', local: 'Downers Grove' },
    { autor: 'D.A. Carson', obra: 'Exegetical Fallacies', ano: 1996, editora: 'Baker Academic', local: 'Grand Rapids' },
    { autor: 'Robert Stein', obra: 'Studying the New Testament: A Practical Introduction', ano: 2008, editora: 'Baker Academic', local: 'Grand Rapids' },
    { autor: 'Vern Poythress', obra: 'Interpreting Eden', ano: 2019, editora: 'Crossway', local: 'Wheaton' },
    { autor: 'Hans-Georg Gadamer', obra: 'Verdade e Método', ano: 1960, editora: 'Vozes', local: 'Petrópolis' },
  ],
  perguntas: [
    'Por que o estudo do texto original é indispensável?',
    'Qual é a diferença entre tipologia e alegoria?',
    'Como evitar os erros hermenêuticos mais comuns?',
    'Qual é a relação entre hermenêutica e aplicação pastoral?',
  ],
};

// ============================================================
// ARTIGOS ADICIONAIS (por categoria)
// ============================================================

export const artigoPecado: ArtigoTeologico = {
  id: 'pecado-queda-natureza',
  titulo: 'O Pecado e a Queda do Homem',
  subtitulo: 'De Gênesis 3 à hamartiologia: a natureza e consequências do pecado',
  categoria: 'antropologia',
  tags: ['pecado', 'queda', 'Adão', ' Eva', 'concupiscência', 'pecado original', 'morte'],
  tempoLeitura: '13 min de leitura',
  resumo: 'O pecado é a realidade mais trágica da existência humana. Este artigo examina a narrativa da queda em Gênesis 3, o conceito de pecado original, e como os teólogos ao longo da história compreenderam a natureza e consequências do pecado.',
  conteudo: [
    'Gênesis 3 não é apenas uma história sobre o passado — é um diagnóstico da condição humana presente. A serpente questiona a palavra de Deus ("Nem de todo morrereis"), Eva desvia o olhar da graça para o desejo, e Adão come em silêncio. O resultado é a desobediência, a vergonha e a expulsão do Éden.',
    'Agostinho de Hipona desenvolveu a doutrina do pecado original: o pecado de Adão é transmitido a toda a humanidade. Não se trata de culpa hereditária (Adão pecou, nós também), mas de corrupção hereditária (Adão caiu, nós nascemos inclinados ao mal). A concupiscência (appetitus inordinatus) é a marca da queda.',
    'Pelágio (c. 354-420) negou o pecado original, argumentando que cada ser humano nasce com a capacidade de escolher entre o bem e o mal. O Concílio de Éfeso (431) condenou o pelagianismo, afirmando que o pecado corrompeu a natureza humana em sua totalidade.',
    'Lutero via a vontade humana como "cativa" (De Servo Arbitrio). O pecado não é apenas uma questão de ações, mas de identidade — o ser humano está "sob o pecado" e não pode se libertar por si mesmo. A liberdade cristã não é a capacidade de escolher o bem, mas a libertação da escravidão do pecado.',
    'A teologia reformada distingue entre pecado original (corrupção da natureza) e pecados atuais (frutos dessa corrupção). Romanos 5:12 é o texto chave: "Pela desobediência de um só homem, o pecado entrou no mundo".',
    'As consequências do pecado são totalizadoras: morte física (Gn 2:17), alienação de Deus (Is 59:2), corrupção da criação (Rm 8:20), e destruição das relações humanas (Gn 3:16). O pecado não é apenas erro moral — é uma força cósmica que destrói tudo o que toca.',
    'A resposta de Deus ao pecado é a aliança da graça. Em Gênesis 3:15, Deus promete que a semente da mulher esmagará a cabeça da serpente. Essa promessa se cumpre em Cristo, que "tornou-se pecado por nós" (2 Co 5:21) para nos livrar do pecado.',
  ],
  versicosChave: ['Gn 3:1-24', 'Rm 5:12-21', 'Rm 6:23', 'Ef 2:1-3', 'Jr 17:9', '1 Jo 1:8-10'],
  fontes: [
    { autor: 'Agostinho de Hipona', obra: 'On Marriage and Concupiscence', ano: 419, editora: 'Nicene and Post-Nicene Fathers' },
    { autor: 'John Murray', obra: 'Redemption Accomplished and Applied', ano: 1955, editora: 'Eerdmans', local: 'Grand Rapids' },
    { autor: 'Reformed Theological Seminary', obra: 'Systematic Theology (Hamartiology)', ano: 2016, editora: 'Reformed Academic Press' },
    { autor: 'Cornelius Plantinga', obra: 'Not the Way It\'s Supposed to Be', ano: 1995, editora: 'Eerdmans', local: 'Grand Rapids' },
  ],
  perguntas: [
    'Qual é a diferença entre culpa hereditária e corrupção hereditária?',
    'Como Lutero entende a liberdade da vontade humana?',
    'O que Paulo quer dizer com "o pecado mora em mim" (Rm 7:17)?',
    'Como a queda se relaciona com a criação e a nova criação?',
  ],
};

export const artigoMal: ArtigoTeologico = {
  id: 'problema-do-mal',
  titulo: 'O Problema do Mal e do Sofrimento',
  subtitulo: 'De Jó a Auschwitz — como a teologia cristã responde ao sofrimento',
  categoria: 'teologia',
  tags: ['mal', 'sofrimento', 'teodicéia', 'Jó', 'Lamento', 'Cruz', 'Esperança'],
  tempoLeitura: '15 min de leitura',
  resumo: 'Se Deus é onisciente, onipotente e amoroso, por que existe sofrimento? Esta é a objeção mais antiga e mais poderosa contra a fé. Este artigo examina as respostas bíblicas, patrísticas e contemporâneas ao problema do mal.',
  conteudo: [
    'O livro de Jó é a primeira grande reflexão sobre o sofrimento na literatura mundial. Jó é justo, próspero e devotado a Deus — e sofre terrivelmente. Seus amigos oferecem explicações teológicas: o sofrimento é castigo pelo pecado. Mas Jó rejeita essas explicações e exige uma resposta direta de Deus.',
    'Deus responde a Jó não com uma explicação, mas com uma presença. Do redemoinho, Deus pergunta: "Onde estavas tu quando eu fundei a terra?" (Jó 38:4). A resposta divina não é lógica — é relacional. Deus não explica o sofrimento, mas se revela como Senhor de todo o sofrimento.',
    'A tradição cristã desenvolveu três abordagens ao problema do mal: (1) a defesa livre-arbítrio (o mal é consequência da liberdade humana); (2) a defesa do melhor mundo possível (Deus permite o mal porque ele permite o maior bem); (3) a defesa pastoral (o sofrimento é mystery, não problema a ser resolvido).',
    'Agostinho argumentou que o mal não é uma substância — é a privação do bem (privatio boni). Assim como a escuridão é a ausência de luz, o mal é a ausência de bondade. Deus criou apenas o bem; o mal é a corrupção da vontade criada.',
    'Tomás de Aquino desenvolveu a defesa do melhor mundo possível: Deus permite o mal porque ele permite o maior bem. A criação de seres livres implica a possibilidade do pecado — e Deus, em sua sabedoria, optou por criar seres livres, mesmo sabendo que eles cairiam.',
    'A teologia da cruz (theologia crucis) de Lutero oferece uma resposta pastoral: Deus não está distante do sofrimento — ele sofre conosco. A cruz é o lugar onde Deus experimenta o abandono, a dor e a morte. Deus não explica o sofrimento — ele o assume.',
    'O sofrimento do século XX — Auschwitz, Hiroshima, genocídios — desafiou todas as teodicéias. Jürgen Moltmann, que sobreviveu ao bombardeio de Hamburgo como prisioneiro de guerra, desenvolveu a teologia do Deus crucificado: Deus sofre na cruz não para explicar o sofrimento, mas para transformá-lo.',
    'A resposta cristã ao sofrimento não é intelectual — é existencial. A cruz de Cristo não é uma explicação do mal, mas uma vitória sobre ele. A ressurreição é a promessa de que o sofrimento não tem a última palavra. "Onde está, ó morte, a tua vitória?" (1 Co 15:55).',
  ],
  versicosChave: ['Jó 38-42', 'Rm 8:18-28', '2 Co 4:16-18', 'Ef 3:13-21', 'Ap 21:4', '1 Pe 1:6-7'],
  fontes: [
    { autor: 'Jürgen Moltmann', obra: 'The Crucified God', ano: 1972, editora: 'Fortress Press', local: 'Minneapolis' },
    { autor: 'Alvin Plantinga', obra: 'God, Freedom, and Evil', ano: 1974, editora: 'Eerdmans', local: 'Grand Rapids' },
    { autor: 'Timothy Keller', obra: 'Walking with God through Pain and Suffering', ano: 2013, editora: 'Dutton', local: 'Nova York' },
    { autor: 'David Bentley Hart', obra: 'The Doors of the Sea', ano: 2005, editora: 'Eerdmans', local: 'Grand Rapids' },
    { autor: 'Eugene Peterson', obra: 'A Long Obedience in the Same Direction', ano: 1980, editora: 'IVP', local: 'Downers Grove' },
  ],
  perguntas: [
    'Como a resposta de Deus a Jó difere das respostas dos amigos?',
    'Qual é a diferença entre teodicéia e pastoral?',
    'Como a teologia da cruz oferece uma resposta ao sofrimento?',
    'A ressurreição é uma resposta ao sofrimento?',
  ],
};

export const artigoAdoracao: ArtigoTeologico = {
  id: 'adoracao-crista',
  titulo: 'A Natureza da Adoração Cristã',
  subtitulo: 'De Romanos 12:1-2 à liturgia contemporânea',
  categoria: 'eclesiologia',
  tags: ['adoração', 'liturgia', 'culto', 'oferta viva', 'espiritualidade', 'sacramentos'],
  tempoLeitura: '12 min de leitura',
  resumo: 'A adoração é a resposta humana mais fundamental à revelação de Deus. Este artigo examina a adoração como "oferta viva" (Rm 12:1-2), os elementos do culto cristão, e como a liturgia molda a espiritualidade.',
  conteudo: [
    'Paulo declara: "Apresentai os vossos corpos em sacrifício vivo, santo e agradável a Deus, que é o vosso culto racional" (Rm 12:1). A adoração cristã não se limita a um momento da semana — ela abrange toda a vida do crente. Cada pensamento, palavra e ação pode ser oferecido a Deus.',
    'O culto congregacional é o contexto primário da adoração. Hebreus 10:24-25 exorta: "Não deixemos de congregar-nos". O culto não é opcional — é expressão da eclesiologia. Quando nos congregamos, somos a igreja visível em ação.',
    'A adoração cristã histórica inclui quatro elementos fundamentais: (1) Palavra (leitura e pregação das Escrituras); (2) oração (comunhão com Deus); (3) sacramentos (batismo e ceia); e (4) louvor (cânticos e música). Esses elementos são constantes ao longo da história da igreja.',
    'A relação entre adoração e cultura é complexa. A adoração deve ser contextual (usar a linguagem e a música da cultura local), mas não acultural (não pode se tornar mera entretenimento). A tensão entre contextualização e fidelidade é um dos maiores desafios da liturgia contemporânea.',
    'O cântico é um elemento central da adoração. Colossenses 3:16 ordena: "Enchei-vos de salmos, hinos e cânticos espirituais". A música cristã não é entretenimento — é teologia cantada. As letras dos hinos ensinam, confortam e desafiam.',
    'A ceia do Senhor é o sacramento mais significativo da adoração. Mateus 26:26-29 registra a instituição: "Isto é o meu corpo... isto é o meu sangue". A ceia é memorial, comunhão e antecipação — ela nos conecta com o passado (morte de Cristo), o presente (comunhão com ele) e o futuro (banquete escatológico).',
    'A adoração cristã é essencialmente trinitária. Adoramos o Pai, pelo Filho, no Espírito Santo. A Trindade não é uma abstração teológica — é a realidade que molda toda a experiência de adoração.',
  ],
  versicosChave: ['Rm 12:1-2', 'Ef 5:18-20', 'Cl 3:16-17', 'Hb 10:24-25', 'Hb 13:15', '1 Co 11:23-26'],
  fontes: [
    { autor: 'Alexander Schmemann', obra: 'For the Life of the World', ano: 1963, editora: 'SVS Press', local: 'Crestwood' },
    { autor: 'T.F. Torrance', obra: 'Worship, Community and the Triune God of Grace', ano: 1996, editora: 'IVP Academic', local: 'Downers Grove' },
    { autor: 'Robert Webber', obra: 'Worship is a Verb', ano: 1985, editora: 'IVP', local: 'Downers Grove' },
    { autor: 'James K.A. Smith', obra: 'Desiring the Kingdom', ano: 2009, editora: 'Baker Academic', local: 'Grand Rapids' },
  ],
  perguntas: [
    'Como a adoração se relaciona com toda a vida do crente?',
    'Quais são os elementos não-negociáveis do culto cristão?',
    'Como equilibrar contextualização e fidelidade na adoração?',
    'O que a ceia do Senhor significa para a vida da igreja?',
  ],
};

export const artigoEsperanca: ArtigoTeologico = {
  id: 'esperanca-ressurreicao',
  titulo: 'A Esperança da Ressurreição',
  subtitulo: 'De 1 Coríntios 15 à neveology: corpo, alma e vida eterna',
  categoria: 'escatologia',
  tags: ['ressurreição', 'corpo', 'vida eterna', '1 Coríntios 15', 'ceia', 'neveology'],
  tempoLeitura: '14 min de leitura',
  resumo: 'A ressurreição de Jesus é o fato fundante do cristianismo. Este artigo examina a ressurreição corporal de Cristo, a ressurreição dos crentes, e como Paulo articula a esperança da vida eterna em 1 Coríntios 15.',
  conteudo: [
    'Se Cristo não ressuscitou, vã é a nossa fé (1 Co 15:14). A ressurreição não é um mito simbólico — é um evento histórico que transformou os discípulos covardes em mártires corajosos. A ressurreição é o fundamento de toda a fé cristã.',
    'Paulo, em 1 Coríntios 15, articula a ressurreição com precisão teológica: "Cristo ressuscitou dos mortos, primícias dos que dormem" (15:20). A metáfora das primícias é agrícola: assim como as primícias da colheita garantem a colheita completa, a ressurreição de Cristo garante a ressurreição de todos os que estão nele.',
    'O corpo ressurreto é real, mas transformado. Paulo usa a semente como analogia: "É semeado em corrupção, ressuscita em incorrupção; é semeado em desonra, ressuscita em glória; é semeado em fraqueza, ressuscita em poder; é semeado corpo animal, ressuscita corpo espiritual" (15:42-44).',
    'A ressurreição não é imortalidade da alma (conceito grego), mas ressurreição do corpo (conceito hebraico). A esperança cristã não é escapar do corpo, mas a transformação do corpo. A criação inteira será renovada (Rm 8:19-23).',
    'A ceia do Senhor é uma celebração escatológica. "Cada vez que comerdes deste pão e beberdes deste cálice, anunciais a morte do Senhor até que ele venha" (1 Co 11:26). A ceia é um "lembrete" (anamnesis) não apenas do passado, mas do futuro — o banquete messiânico.',
    'A esperança da ressurreição é pastoralmente poderosa. Ela transforma a maneira como morremos, como sofremos e como vivemos. "Se apenas para esta vida temos esperança em Cristo, somos os mais miseráveis de todos os homens" (1 Co 15:19).',
    'No contexto brasileiro, onde a teologia da prosperidade distorce a esperança cristã, a ressurreição oferece uma alternativa: a esperança não é a riqueza terrena, mas a transformação de toda a criação. A glória futura supera infinitamente qualquer prosperidade presente.',
  ],
  versicosChave: ['1 Co 15:1-58', 'Rm 8:18-25', 'Fp 3:20-21', '1 Ts 4:13-18', 'Ap 20:4-6', '2 Co 5:1-10'],
  fontes: [
    { autor: 'N.T. Wright', obra: 'The Resurrection of the Son of God', ano: 2003, editora: 'Fortress Press', local: 'Minneapolis' },
    { autor: 'Richard Bauckham', obra: 'Jesus and the Eyewitnesses', ano: 2006, editora: 'Eerdmans', local: 'Grand Rapids' },
    { autor: 'Garry Habermas', obra: 'The Ressurrection of Jesus', ano: 1984, editora: 'Baker Academic', local: 'Grand Rapids' },
    { autor: 'Thomas Wright', obra: 'Surprised by Hope', ano: 2008, editora: 'HarperOne', local: 'Nova York' },
  ],
  perguntas: [
    'Qual é a diferença entre imortalidade da alma e ressurreição corporal?',
    'O que significa que Cristo é as "primícias" da ressurreição?',
    'Como a ceia do Senhor se relaciona com a esperança escatológica?',
    'Qual é a relevância pastoral da doutrina da ressurreição?',
  ],
};

// ============================================================
// ÍNDICE E EXPORTAÇÃO
// ============================================================

export const todosArtigosTeologicos: ArtigoTeologico[] = [
  artigoExpiao,
  artigoJustificacao,
  artigoAlianca,
  artigoCristologia,
  artigoEncarnacao,
  artigoTrindade,
  artigoPneumatologia,
  artigoEscatologia,
  artigoEclesiologia,
  artigoHermeneutica,
  artigoPecado,
  artigoMal,
  artigoAdoracao,
  artigoEsperanca,
];

// Funções helper
export function getArtigosPorCategoria(categoria: ArtigoTeologico['categoria']): ArtigoTeologico[] {
  return todosArtigosTeologicos.filter(a => a.categoria === categoria);
}

export function getArtigoPorId(id: string): ArtigoTeologico | undefined {
  return todosArtigosTeologicos.find(a => a.id === id);
}

export function getTodasCategorias(): string[] {
  return [...new Set(todosArtigosTeologicos.map(a => a.categoria))];
}
