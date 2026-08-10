import { ComentarioExpandido, ComentarioTeologico } from './comentariosExpandidos';

function chave(livro: string, capitulo: number, versiculo: number): string {
  return `${livro}:${capitulo}:${versiculo}`;
}

const comentariosAcademicosExpandidos: Record<string, ComentarioExpandido> = {};

function add(
  livro: string, cap: number, v: number,
  titulo: string, resumo: string,
  comentarios: ComentarioTeologico[],
  referencias?: string[]
) {
  const k = chave(livro, cap, v);
  comentariosAcademicosExpandidos[k] = { livro, capitulo: cap, versiculo: v, titulo, resumo, comentarios, referencias };
}

// ====================================================================
// GENESIS
// ====================================================================

add('gn', 1, 1, 'Criacao dos Ceus e da Terra',
  'Versiculo fundamental da cosmovisao biblica: Deus como Criador soberano de todas as coisas.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A frase "no principio" indica o inicio absoluto da existencia material. Nao ha eternidade da materia; tudo comeca pelo ato criador de Deus.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus criou tudo ex nihilo, por Sua palavra omnipotente. A Trindade esta implicada no plural "Deus".', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Charles Ellicott', periodo: 'moderno', tradicao: 'evangelical', texto: 'O hebraico "bereshit" pode ser traduzido como "quando o principio foi criado", mas a leitura tradicional e mais provavel contextualmente.', obra: 'Ellicott Commentary for English Readers', ano: 1878 },
    { teologo: 'Adam Clarke', periodo: 'moderno', tradicao: 'metodista', texto: 'A palavra hebraica "bara" significa criar do nada, algo que somente Deus pode fazer. Este verbo e reservado exclusivamente para a atividade divina.', obra: 'Clarke Commentary', ano: 1810 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Se Deus nao e o Criador, Ele nao e Deus. A criacao e o artigo de entrada da cosmovisao cristã.', obra: 'Essential Truths of the Christian Faith', ano: 1992 },
  ],
  ['Jo 1:1-3', 'Cl 1:16', 'Hb 11:3']
);

add('gn', 1, 26, 'Imagem de Deus na Humanidade',
  'A criacao do homem a imagem e semelhanca de Deus, fundamento da dignidade humana.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A imagem de Deus inclui racionalidade, moralidade e dominio sobre a criacao. O plural revela a Trindade.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A imagem reside na alma racional, na justiça e santidade originais, e no dominio sobre as criaturas. A queda corrompeu, mas nao destruiu esta imagem.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Marvin Vincent', periodo: 'moderno', tradicao: 'reformada', texto: '"Imagem" (tselem) e "semelhanca" (demut) diferem: a primeira indica representacao, a segunda semelhanca moral.', obra: 'Word Studies in the Old Testament', ano: 1887 },
    { teologo: 'D.A. Carson', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'A imagem de Deus e o que fundamenta a etica cristã: tratar todo ser humano com dignidade porque todos sao imageadores de Deus.', obra: 'How to Read the Bible for All Its Worth', ano: 1994 },
  ],
  ['1 Co 11:7', 'Tg 3:9', 'Cl 3:10']
);

add('gn', 3, 15, 'O Proto-evangelium',
  'A primeira promessa messianica de vitoria sobre o pecado e a serpente.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A semente da mulher refere-se ao Messias que sera ferido no calcanhar (cruz), mas esmagara a cabeca de Satanás.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Cristo e a semeada da mulher que destruiu as obras do diabo. A vitoria e certa embora haja sofrimento.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Adam Clarke', periodo: 'moderno', tradicao: 'metodista', texto: 'Os pais da Igreja viam neste versiculo a primeira promessa de um Redentor. A traducao grega dos Setenta indica conflito perpetuo.', obra: 'Clarke Commentary', ano: 1810 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Todo o drama da redencao esta contido nesta unica frase. O historico da salvação comeca aqui.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['Rm 16:20', 'Gl 3:16', '1 Jo 3:8']
);

add('gn', 6, 5, 'A Corrupcao Total da Humanidade',
  'Deus ve que a maldade do homem se alastrou sobre a terra.',
  [
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: '"Toda a intencao dos pensamentos do seu coração" — a corrupcao afeta a mente e a vontade inteiramente. Nao ha parte sã na natureza caida.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A phrase indica inclinacao constante e universal para o mal. O homem nao precisa ser ensinado a pecar; e sua disposicao natural.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'D.A. Carson', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'A descricao da depravacao nao e exagero poetico; e diagnostico teologico da condicao humana pos-queda.', obra: 'How to Read the Bible for All Its Worth', ano: 1994 },
  ],
  ['Rm 3:10-12', 'Ef 2:1-3']
);

add('gn', 12, 1, 'O Chamado de Abrao',
  'O chamado divino que inicia a historia da aliança e do povo eleito.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Abrao era idólatra em Ur (Jos 24:2); Deus o chamou pela graça, nao pelo merito. A separacao e condicao da bencao.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A eleicao de Abrao e tipo da eleicao soberana de Deus em Cristo. A aliança e incondicional em suas promessas.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Charles Ellicott', periodo: 'moderno', tradicao: 'evangelical', texto: '"Te abençoarei" — tres promessas: terra, descendencia e bencao universal. O cumprimento escatologico aponta para Cristo.', obra: 'Ellicott Commentary for English Readers', ano: 1878 },
    { teologo: 'Douglas Moo', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A chamada de Abrao e o protótipo da justificacao pela fe: crer na promessa de Deus quando as circunstancias parecem impossiveis.', obra: 'The Epistle to the Romans', ano: 1996 },
  ],
  ['Gl 3:8-9', 'Hb 11:8-10']
);

add('gn', 15, 6, 'Abrao Cre e Foi Justificado',
  'O versiculo fundamental da justificacao pela fe, citado por Paulo em Romanos e Galatas.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A justificacao e declarativa, nao transformista. Deus declarou Abrao justo com base na fe, nao nas obras.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A fe e o instrumento da justificacao, nao o merito. A justica e imputada, nao infundida. Este e o fundamento da doutrina reformada.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Marvin Vincent', periodo: 'moderno', tradicao: 'reformada', texto: '"E imputou" (logizomai) — termo contabil de credito. A justica de Cristo e creditada ao crente.', obra: 'Word Studies in the New Testament', ano: 1887 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Se Abrao foi justificado pela fe, pela lei ninguem sera justificado. Paulo construiu toda a teologia da justificacao sobre este versiculo.', obra: 'Faith Alone', ano: 1995 },
    { teologo: 'Douglas Moo', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A fe aqui e confiança ativa na promessa de Deus, nao mero assentimento intelectual. Envolve entrega pessoal.', obra: 'The Epistle to the Romans', ano: 1996 },
  ],
  ['Rm 4:3-5', 'Gl 3:6-9', 'Tg 2:23']
);

add('gn', 22, 1, 'O Sacrificio de Isaque',
  'O teste supremo da fe de Abrao e a tipologia do sacrificio de Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus nao tenta para destruir, mas para refinar a fe. O sacrificio de Isaque prefigura o Filho unigenito de Deus.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O cordeiro preso no mato e tipo de Cristo, o Cordeiro de Deus que tira o pecado do mundo. A substituicao e o evangelho em miniatura.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Adam Clarke', periodo: 'moderno', tradicao: 'metodista', texto: 'O Monte Moriá onde Isaque foi levado e o mesmo local do Templo de Salomão e do Calvário. A tradicao judaica conecta os tres eventos.', obra: 'Clarke Commentary', ano: 1810 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'Abrao aprendeu que Deus pode ate ressuscitar os mortos (Hb 11:19). A fe que obedece quando nao compreende e a mais profunda.', obra: 'The Message of Romans', ano: 1994 },
  ],
  ['Hb 11:17-19', 'Tg 2:21-23']
);

// ====================================================================
// EXODO
// ====================================================================

add('ex', 3, 14, 'Eu Sou o Que Sou',
  'O nome revelado de Deus a Moises na sarca ardente.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: '"Eu Sou" indica existencia autoexistente e eterna. Deus nao depende de nada para existir; Ele e o Ser necessario.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O nome revela a autossuficiencia divina. Cristo reivindicou este nome em Jo 8:58, provando Sua divindade.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Adam Clarke', periodo: 'moderno', tradicao: 'metodista', texto: 'A expressao hebraica "ehyeh asher ehyeh" pode ser traduzida como "Eu serei o que serei", indicando que Deus fara tudo o que prometeu.', obra: 'Clarke Commentary', ano: 1810 },
    { teologo: 'Marvin Vincent', periodo: 'moderno', tradicao: 'reformada', texto: 'Em Jo 8:58, Jesus usa "ego eimi" em contexto que os judeus entenderam como reivindicacao de divindade, pois tentaram apedreja-lo.', obra: 'Word Studies in the New Testament', ano: 1887 },
  ],
  ['Jo 8:58', 'Is 43:10', 'Ap 1:8']
);

add('ex', 12, 13, 'O Sangue do Cordeiro Pascual',
  'O sangue no batente protegeu os filhos de Israel do anjo da morte.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O cordeiro pascal e tipo perfeito de Cristo. O sangue aplicado no batente salva da morte, assim como o sangue de Cristo nos livra da condenacao eterna.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O cordeiro debatido na tarde do 14 de Nisan e tipo de Cristo crucificado. O sangue no batente e a fe aplicada ao coração.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Charles Ellicott', periodo: 'moderno', tradicao: 'evangelical', texto: 'A páscoa judaica e o fundamento tipologico da Ceia do Senhor. Cada detalhe aponta para Cristo como Cordeiro imaculado.', obra: 'Ellicott Commentary for English Readers', ano: 1878 },
    { teologo: 'D.A. Carson', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'O Exodo e o maior ato redentor do AT, eJesus o cumpre de forma definitiva. O sangue do cordeiro antecipa o sangue da cruz.', obra: 'The God Who Is There', ano: 2010 },
  ],
  ['1 Co 5:7', '1 Pe 1:18-19', 'Ap 5:6']
);

add('ex', 20, 1, 'Os Dez Mandamentos',
  'A revelacao da lei divina no Monte Sinai, fundamento da etica biblica.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Os Dez Mandamentos nao sao sugestoes, masmandamentos divinos. A lei revela o character santo de Deus e a padrao para a vida humana.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A lei e perfeita, mas incapaz de salvar. Ela e o espelho que mostra o pecado, nao o remedio que o cura. O remedio esta em Cristo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A lei de Deus e a expressao do Seu character santo. Nao podemos obedecer perfeitamente, por isso precisamos de um Salvador.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['Mt 5:17-19', 'Rm 7:7-12', 'Gl 3:24']
);

add('ex', 20, 7, 'Nao Tomaras o Nome do Senhor em Vão',
  'O terceiro mandamento proibe o uso irreverente do nome divino.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O nome de Deus inclui Sua natureza e autoridade. Usar o nome em vao e tratar o sagrado com descaso.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Este mandamento proibe perjúrio, blasfemia e todo uso irreverente do nome divino. O nome de Deus e sagrado e deve ser reverenciado.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Adam Clarke', periodo: 'moderno', tradicao: 'metodista', texto: 'O hebraico "nasa" (carregar) sugere que tomar o nome de Deus em vao e carregar o nome divino sem respeito, como quem usa uma insincao falsa.', obra: 'Clarke Commentary', ano: 1810 },
  ],
  ['Mt 5:33-37', 'Tg 5:12']
);

add('ex', 25, 8, 'Faca-me Um Santuario',
  'O mandamento divino para construir o tabernaculo como lugar de habitacao divina.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O tabernaculo e tipo de Cristo (Jo 1:14, "e plantou Sua tenda entre nos"). Cada detalhe aponta para a pessoa e obra de Cristo.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O santuario simboliza a habitacao de Deus entre Seu povo. O véu separa o santo dos santos, indicando que o acesso a Deus e restrito sem o sangue.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Charles Ellicott', periodo: 'moderno', tradicao: 'evangelical', texto: 'A expressao "para que Eu habite no meio deles" revela o desejo divino de comunhão com a humanidade, cumprido plenamente na encarnação.', obra: 'Ellicott Commentary for English Readers', ano: 1878 },
  ],
  ['Jo 1:14', 'Hb 9:1-14', 'Ef 2:19-22']
);

add('ex', 32, 1, 'O Bezerro de Ouro',
  'O povo idolatra enquanto Moises estava no Monte Sinai recebendo a lei.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O bezerro de ouro e o paradigma de toda idolatria: substituir o Deus vivo por uma imagem feita pelas maos humanas.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A impaciencia do povo revela a tendencia natural da carne: querer um deus visivel e controlavel. A idolatria nasce da impaciencia.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A idolatria nao e apenas adorar imagens; e adorar qualquer coisa que nao e Deus. O bezerro de ouro e um espelho da condicao humana.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['1 Co 10:7', '1 Jo 5:21', 'Rm 1:21-25']
);

// ====================================================================
// SALMOS
// ====================================================================

add('sl', 1, 1, 'O Caminho dos Justos',
  'A bem-aventurança do homem que se alegra na lei do Senhor.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O Salmo abre com uma contraste entre o caminho dos justos e o dos ímpios. A felicidade verdadeira esta na meditacao na Palavra de Deus.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A bem-aventurança e condicional: depende de nao andar no conselho dos ímpios. A Palavra de Deus e a reguladora da vida cristã.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Adam Clarke', periodo: 'moderno', tradicao: 'metodista', texto: 'O "conselho dos ímpios" e a filosofia do mundo sem Deus. O justo medita na lei dia e noite, nao como estudo, mas como guia para a vida.', obra: 'Clarke Commentary', ano: 1810 },
  ],
  ['Js 1:8', '119:97', 'Mt 4:4']
);

add('sl', 22, 1, 'Meu Deus, Meu Deus, Por Que Me Desamparaste?',
  'O Salmo messiânico da crucificação, citado por Jesus na cruz.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A descricao do sofrimento do Salmo 22 e tao precisa que parece uma narrativa da crucificação, embora tenha sido escrito seculos antes.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Jesus citou o versículo 1 na cruz porque todo o Salmo fala Dele. A desamparacao sentido foi real, pois Ele tomou sobre Si os pecados do mundo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Charles Ellicott', periodo: 'moderno', tradicao: 'evangelical', texto: 'Os versículos 7-8 descrevem a zombaria dos crucificadores. Os versículos 16-18 antecipam a partilha das vestes e a lança no lado.', obra: 'Ellicott Commentary for English Readers', ano: 1878 },
    { teologo: 'Marvin Vincent', periodo: 'moderno', tradicao: 'reformada', texto: 'A frase "cercaram-me cães" refere-se aos gentios hostis. O termo "cães" era usado joga para inimigos e gentios na linguagem hebraica.', obra: 'Word Studies in the New Testament', ano: 1887 },
  ],
  ['Mt 27:46', 'Mc 15:34', 'Hb 2:11-12']
);

add('sl', 23, 1, 'O Senhor e Meu Pastor',
  'O Salmo mais conhecido da Bíblia, sobre o cuidado pastoral de Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A imagem do pastor revela o cuidado pessoal e providencial de Deus. "Nao terei falta" — suprimento total em todas as necessidades.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O rei Davi, que foi pastor, agora reconhece a Deus como seu Pastor. A relacao pessoal e o foco do Salmo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Adam Clarke', periodo: 'moderno', tradicao: 'metodista', texto: 'O "vale da sombra da morte" e o perigo real que o crente enfrenta, mas o pastor esta presente. Nao ha morte sem esperança de vida.', obra: 'Clarke Commentary', ano: 1810 },
  ],
  ['Jo 10:11-18', '1 Pe 2:25', '1 Pe 5:4']
);

add('sl', 51, 10, 'Cria em Mim, ó Deus, Coração Puro',
  'O Salmo da confissão de Davi após o pecado com Betsabá.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Davi nao pede apenas perdao, mas transformação interior. "Coração puro" e a regeneração que so Deus pode dar.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A confissao de Davi e o modelo de arrependimento: reconhecimento total do pecado, confiança na misericórdia divina, e pedido de transformação interior.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A graça de Deus nao nos livra das consequências naturais do pecado, mas nos livra da condenação eterna. Davi sofreu as consequências, mas recebeu o perdão.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['1 Jo 1:9', '2 Co 7:10', 'Ef 2:4-5']
);

add('sl', 110, 1, 'Senta-te a Minha Direita',
  'O Salmo messiânico mais citado no Novo Testamento sobre a realeza de Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O versículo 1 é citado por Jesus (Mt 22:44) e por Paulo (Ef 1:20) para provar a divindade e realeza de Cristo.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: '"O Senhor disse ao meu Senhor" — David reconhece o Messias como superior a ele mesmo. A superioridade messiânica é incontestável.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'D.A. Carson', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'Este Salmo e o Salmo do Messias-Rei e Sacerdote. Ele e da ordem de Melquisedeque, superior à ordem levítica.', obra: 'Matthew (Tyndale)', ano: 2010 },
  ],
  ['Mt 22:44', 'At 2:34-35', 'Hb 1:13']
);

add('sl', 139, 14, 'Eu Te Louvarei, Porque Sou Feito de Maravilhas',
  'A onisciencia e onipresença de Deus e a dignidade da criação humana.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus conhece cada momento da vida antes que aconteça. O homem nao pode esconder-se da presença divina, seja no ceu ou no Sheol.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A onisciencia divina e absoluta: Deus sabe tudo antes que aconteça. A onipresença e incompreensivel: nao ha lugar fora da presença de Deus.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Adam Clarke', periodo: 'moderno', tradicao: 'metodista', texto: 'O versículo 14 e uma declaração de adoração diante do mistério da criação. Cada ser humano e obra-prima divina.', obra: 'Clarke Commentary', ano: 1810 },
  ],
  ['Jr 1:5', 'Ef 1:3-4', 'Mt 6:25-30']
);

// ====================================================================
// PROVERBIOS
// ====================================================================

add('pv', 1, 7, 'O Principio da Sabedoria',
  'A fundamenta de toda sabedoria: o temor do Senhor.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O "temor do Senhor" nao e medo paralizante, mas reverência e obediência. Este versículo e o tema de todo o livro de Provérbios.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A sabedoria divina é o fundamento de toda sabedoria humana. Sem o temor do Senhor, nao há verdadeira sabedoria, apenas sabedoria do mundo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Adam Clarke', periodo: 'moderno', tradicao: 'metodista', texto: 'O hebraico "yirah" (temor) inclui adoração, respeito e obediência. E a atitude correta diante da soberania divina.', obra: 'Clarke Commentary', ano: 1810 },
  ],
  ['Jó 28:28', 'Sl 111:10', 'At 9:31']
);

add('pv', 3, 5-6, 'Confia no Senhor',
  'A instrução fundamental sobre confiança e reconhecimento divino.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: '"De todo o teu coração" — a confiança deve ser total, nao parcial. Nao se apoiar na própria compreensão é humildade intelectual.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Confiar em Deus com todo o coração é a essência da fé. Ele dirige os passos do Seu povo segundo Seu propósito soberano.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Charles Ellicott', periodo: 'moderno', tradicao: 'evangelical', texto: 'Os versículos 5-6 formam um paralelismo hebraico perfeito: confiança total leva a reconhecimento divino em todos os caminhos.', obra: 'Ellicott Commentary for English Readers', ano: 1878 },
  ],
  ['Pv 16:3', 'Rm 8:28', 'Is 55:8-9']
);

add('pv', 9, 10, 'O Temor do Senhor e Principio da Sabedoria',
  'A repetição do tema fundamental: sem reverência, nao ha sabedoria.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O versículo repete Pv 1:7 com uma ênfase adicional: o conhecimento do Santo é prudência. Sabedoria e conhecimento de Deus sao inseparaveis.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O conhecimento do Santo e a fonte de toda prudencia. A sabedoria do mundo e tolice diante de Deus.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Marvin Vincent', periodo: 'moderno', tradicao: 'reformada', texto: '"Prudencia" (ormah) pode ser traduzida como "entendimento" ou "discernimento". A sabedoria divina produz discernimento espiritual.', obra: 'Word Studies in the Old Testament', ano: 1887 },
  ],
  ['Dt 4:6', 'Is 55:9', '1 Co 1:20-25']
);

// ====================================================================
// ISAIA
// ====================================================================

add('is', 7, 14, 'A Virgem Concebera',
  'A profecia messiânica da virgindade da concepção, cumprida em Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A palavra hebraica "almah" indica uma jovem solteira. Mateus 1:23 usa "parthenos" (virgem), confirmando o sentido sobrenatural da profecia.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O sinal e duplo: a concepção miraculosa e o nome "Emmanuel" (Deus conosco). O cumprimento em Cristo é absoluto e único.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Charles Ellicott', periodo: 'moderno', tradicao: 'evangelical', texto: 'Embora "almah" nao signifique necessariamente virgem, o contexto sobrenatural do sinal divino exige a interpretação da concepção virginal.', obra: 'Ellicott Commentary for English Readers', ano: 1878 },
    { teologo: 'Marvin Vincent', periodo: 'moderno', tradicao: 'reformada', texto: 'Mateus cita a Septuaginta (parthenos), nao o hebraico (almah). A inspiração do Novo Testamento valida a interpretação cristológica.', obra: 'Word Studies in the New Testament', ano: 1887 },
  ],
  ['Mt 1:22-23', 'Lc 1:34-35']
);

add('is', 9, 6, 'Um Menino Nasceu Para Nos',
  'A profecia da natividade messiânica e dos títulos divinos do Messias.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Os títulos incluem "Mighty God" (Deus Poderoso), o que só pode se referir a uma pessoa divina. O Messias é Deus encarnado.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O titulo "Pai da Eternidade" indica que Ele é o autor e sustentador de todas as coisas, incluindo o tempo e a eternidade.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Adam Clarke', periodo: 'moderno', tradicao: 'metodista', texto: '"Conselheiro maravilhoso" — a sabedoria divina encarnada. "Príncipe da Paz" — o governo messiânico traz paz verdadeira.', obra: 'Clarke Commentary', ano: 1810 },
  ],
  ['Mt 1:23', 'Lc 2:11', 'Jo 1:14']
);

add('is', 53, 3, 'O Servo Sofredor Rejeitado',
  'A profecia central do sofrimento substitutivo do Messias.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A rejeição do Servo Sofredor é paradoxal: os próprios homens que Ele veio salvar o rejeitam. A dor do sofrimento inclui rejeição social.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A expressão "homem de dores" indica sofrimento profundo. Ele tomou sobre Si as nossas enfermidades, cumprindo o que MT 8:17 confirma.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Charles Ellicott', periodo: 'moderno', tradicao: 'evangelical', texto: 'O contexto do Capítulo 53 mostra que o Servo Sofredor é coletivo (Israel) e individual (Messias), cumprido em Cristo.', obra: 'Ellicott Commentary for English Readers', ano: 1878 },
  ],
  ['Mt 8:17', '1 Pe 2:24', 'At 8:32-35']
);

add('is', 53, 5, 'Foi Ferido Pelos Nossos Pecados',
  'O versículo central da substitution penal: o Messias sofre por nós.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: '"Ferido por nossas transgressões" — a ferida e penal, não acidental. O sofrimento é substitutivo e vicário.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A penalidade do pecado e a morte. Cristo tomou a penalidade em nosso lugar. A justiça divina exige pagamento; Cristo pagou.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A substitution penal é o coração do evangelho. Se Cristo não morreu por nós, não há perdão de pecados.', obra: 'The Holiness of God', ano: 1985 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'A cruz é a demonstração máxima do amor divino: Deus em Cristo pagou o resgate que nós não podíamos pagar.', obra: 'The Message of Romans', ano: 1994 },
  ],
  ['Rm 5:8', '2 Co 5:21', '1 Pe 3:18']
);

add('is', 53, 10, 'O Senhor Quis Triste-lo',
  'A vontade divina no sofrimento substitutivo do Servo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus quis que o Servo sofresse, não por crueldade, mas por amor. O sofrimento não é acidente, mas propósito divino.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: '"Pôs sobre ele a iniquidade de todos nós" — substituição penal clássica. A penalidade foi transferida do pecador para o inocente.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'D.A. Carson', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'A expiação vicária é o centro da fé cristã. Negar a substituição é negar o evangelho.', obra: 'How to Read the Bible for All Its Worth', ano: 1994 },
  ],
  ['2 Co 5:21', 'Gl 3:13', '1 Pe 2:24']
);

// ====================================================================
// MATEUS
// ====================================================================

add('mt', 1, 23, 'Emmanuel — Deus Conosco',
  'A interpretação cristológica da profecia de Isaías 7:14.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Mateus cita a Septuaginta (parthenos) em vez do hebraico (almah), confirmando a concepção virginal. "Deus conosco" é o título divino aplicado a Jesus.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O nome Emmanuel é o mais alto título cristológico do AT. Jesus é verdadeiro Deus e verdadeiro homem, habitando entre nós.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'A.T. Robertson', periodo: 'moderno', tradicao: 'bautista', texto: 'O verbo "paralambanō" (tomou para si) indica posse. José tomou Maria como sua esposa, mas a concepção é da virtude do Espírito Santo.', obra: 'Word Pictures in the New Testament', ano: 1930 },
  ],
  ['Lc 1:35', 'Jo 1:14', 'Is 7:14']
);

add('mt', 3, 2, 'Arrependei-Vos',
  'A pregação de João Batista: arrependimento e preparação para o Messias.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: '"Arrependei-vos" (metanoeite) significa mudança de mente que leva a mudança de vida. O Reino dos Céus está próximo — a urgência é real.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A pregação de João prepara o caminho para Cristo. O arrependimento precede a fé no evangelho.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'A.T. Robertson', periodo: 'moderno', tradicao: 'bautista', texto: 'O presente imperativo "metanoeite" indica ação contínua. O arrependimento é um estilo de vida, não um evento isolado.', obra: 'Word Pictures in the New Testament', ano: 1930 },
  ],
  ['Mt 4:17', 'Mc 1:15', 'At 2:38']
);

add('mt', 5, 3, 'Bem-Aventurados Os Pobres de Espírito',
  'A primeira bem-aventurança do Sermão da Montanha.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: '"Pobres de espírito" são os que reconhecem sua necessidade espiritual. A bem-aventurança é o contrário das expectativas mundanas de poder.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A pobreza espiritual é a consciência da bancarrota espiritual diante de Deus. Os que se humilham são exaltados.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'O Sermão da Montanha descreve o caráter do cidadão do Reino. As bem-aventuranças são paradoxos: felicidade onde o mundo vê sofrimento.', obra: 'The Message of the Sermon on the Mount', ano: 1973 },
  ],
  ['Lc 6:20-26', 'Is 61:1', '2 Co 8:9']
);

add('mt', 5, 17, 'Não Penseis Que Eu Vim Abrogar a Lei',
  'A relação de Jesus com a Lei de Moisés: cumprimento, não abrogação.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Jesus não veio destruir a Lei, mas cumpri-la em todos os detalhes. O Sermão da Montanha revela o espírito da Lei.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O cumprimento da Lei por Cristo é perfeito e completo. A justificação pela fé não anula a Lei, mas a cumpre em Cristo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'D.A. Carson', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'Jesus é o fim da Lei para justificação (Rm 10:4), mas não para a santificação. A Lei continua como guia para a vida cristã.', obra: 'Matthew (Tyndale)', ano: 2010 },
  ],
  ['Rm 10:4', 'Gl 3:24', 'Rm 8:3-4']
);

add('mt', 6, 9-13, 'O Pai Nosso',
  'O modelo de oração que Jesus ensinou aos discípulos.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Cada petição do Pai Nosso é uma aula de teologia: a santidade de Deus, Sua soberania, provisão, perdão e proteção.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A oração inclui sete petições: três referentes a Deus e quatro referentes ao homem. O equilíbrio revela as prioridades do Reino.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'O Pai Nosso é a oração mais conhecida e menos praticada. Cada petição deve ser orada com compreensão e compromisso.', obra: 'The Message of the Sermon on the Mount', ano: 1973 },
  ],
  ['Lc 11:2-4', 'Mc 12:30']
);

add('mt', 13, 31-32, 'A Parábola do Grão de Mostarda',
  'O crescimento exponencial do Reino de Deus a partir de um início humilde.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O Reino começa pequeno mas cresce além de todas as expectativas. A mostarda é a menor das sementes, mas produz uma árvore grande.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O Reino cresce por poder divino, não por esforço humano. O crescimento é organicamente sobrenatural.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'A.T. Robertson', periodo: 'moderno', tradicao: 'bautista', texto: 'O verbo "auxanō" (crescer) está no imperfeito, indicando crescimento contínuo e gradual. O Reino sempre está crescendo.', obra: 'Word Pictures in the New Testament', ano: 1930 },
  ],
  ['Mc 4:30-32', 'Lc 13:18-19']
);

add('mt', 16, 18, 'Tu és Pedro, Sobre Esta Pedra Edificarei Minha Igreja',
  'A declaração de Jesus sobre a fundação da Igreja.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A "pedra" é a confissão de Pedro ("Tu és o Cristo"), não a pessoa de Pedro como fundamento. Cristo é o único fundamento (1 Co 3:11).', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A Igreja é edificada sobre Cristo como pedra angular. Pedro é apóstolo, mas não é pedra de fundamento. A confissão de fé em Cristo é o fundamento.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'D.A. Carson', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'A declaração de Pedro é o ponto alto da revelação divina nos Evangelhos. O Reino se expande através da confissão de fé em Cristo.', obra: 'Matthew (Tyndale)', ano: 2010 },
  ],
  ['Ef 2:20', '1 Co 3:11', '1 Pd 2:4-8']
);

add('mt', 26, 26-28, 'Isto é Meu Corpo',
  'A instituição da Ceia do Senhor na Última Ceia.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O pão e o vinho são sinais e selos da aliança. "Isto é" pode ser "isto representa" ou "isto se torna", dependendo da interpretação.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A Ceia é memorial (fazei isto em memória de mim) e não repetição sacrificial. Cristo morreu uma vez para sempre.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A Ceia não é transubstanciação nem mero símbolo. É presença real por meio do Espírito, não da substância material.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['Lc 22:19-20', '1 Co 11:23-26']
);

add('mt', 28, 19-20, 'Ide e Fazei Discípulos',
  'A Grande Comissão: missão universal da Igreja.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A Grande Comissão é universal ("todas as nações") e completa ("batizando-os, ensinando-os"). A Igreja tem uma missão global.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O batismo é por imersão, conforme o modelo apostólico. O ensino inclui todos os mandamentos de Cristo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'A Grande Comissão não é opcional para a Igreja; é o mandamento central da era pós-ressurreição. O evangelho é para todas as nações.', obra: 'The Living Church', ano: 2007 },
  ],
  ['Mc 16:15', 'Lc 24:47', 'At 1:8']
);

// ====================================================================
// MARCOS
// ====================================================================

add('mc', 1, 15, 'O Reino de Deus Está Próximo',
  'A pregação central de Jesus: o Reino de Deus se aproxima pela Sua presença.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: '"Cumpriu-se o tempo" — a era messiânica chegou. "Crede no evangelho" — a resposta ao Reino é a fé.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O Reino de Deus é inaugurado na pessoa de Jesus. A pregação do Reino precede a salvação individual.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'A.T. Robertson', periodo: 'moderno', tradicao: 'bautista', texto: 'O perfeito "pephthēken" indica que o Reino já chegou, não apenas está por vir. A presença de Jesus é a evidência.', obra: 'Word Pictures in the New Testament', ano: 1930 },
  ],
  ['Mt 4:17', 'Rm 14:17']
);

add('mc', 10, 45, 'O Filho do Homem Veio Para Dar Sua Vida',
  'A declaração central da missão redentora de Jesus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Jesus é o Servo que dá Sua vida como resgate por muitos. A missão de Cristo é sacrificial e substitutiva.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O "resgate" (lytron) indica pagamento para libertação. A vida de Cristo é o preço pago pela libertação dos pecadores.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Marvin Vincent', periodo: 'moderno', tradicao: 'reformada', texto: 'O termo "antí" (em vez de, por) indica substituição. Cristo morre no lugar de muitos, não apenas por muitos.', obra: 'Word Studies in the New Testament', ano: 1887 },
  ],
  ['Mt 20:28', '1 Tm 2:6', '1 Pd 1:18-19']
);

add('mc', 12, 30, 'Ama o Teu Senhor com Todo o Teu Coração',
  'O primeiro e maior mandamento: amor total a Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Jesus resume toda a Lei em dois mandamentos: amor a Deus e amor ao próximo. A totalidade ("todo", "toda", "todo") é a marca do discipulado.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O amor a Deus deve ser total: coração, alma, entendimento e força. Não há área da vida que fique fora do amor a Deus.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A Lei de Deus exige perfeição. Somente Cristo cumpriu a Lei perfeitamente; por isso precisamos Dele como Salvador.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['Mt 22:37-40', 'Lc 10:27', 'Dt 6:4-5']
);

add('mc', 15, 33-34, 'Meu Deus, Meu Deus, Por Que Me Abandonaste?',
  'A crucificação de Jesus e Sua exclamação de sofrimento.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A trevas de três horas indicam o julgamento divino sobre o pecado. Jesus tomou sobre Si a ira de Deus pelos nossos pecados.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Jesus citou o Salmo 22, que é profeticamente sobre Ele. O sofrimento na cruz incluiu abandono aparente do Pai.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Charles Ellicott', periodo: 'moderno', tradicao: 'evangelical', texto: 'A exclamação não indica desesperança, mas citação profética. O Salmo 22 termina em vitória, não em derrota.', obra: 'Ellicott Commentary for English Readers', ano: 1878 },
  ],
  ['Mt 27:45-46', 'Lc 23:44-46', 'Sl 22:1-31']
);

// ====================================================================
// LUCAS
// ====================================================================

add('lc', 1, 46-55, 'O Magnificat',
  'O cântico de Maria: louvor à soberania de Deus na redenção.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O Magnificat é um cântico revolucionário: Deus derruba os poderosos e exalta os humildes. A redenção inverte os valores do mundo.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O cântico de Maria ecoa o cântico de Ana (1 Sm 2) e mostra a continuidade entre o AT e o NT na obra redentora de Deus.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Adam Clarke', periodo: 'moderno', tradicao: 'metodista', texto: 'O Magnificat é teologicamente rico: a soberania de Deus, a misericórdia, a humilhação dos orgulhosos e a exaltação dos humildes.', obra: 'Clarke Commentary', ano: 1810 },
  ],
  ['1 Sm 2:1-10', 'Is 61:10']
);

add('lc', 15, 7, 'Há Mais Alegria no Céu Pecador Que Se Arrepende',
  'A alegria celestial diante do arrependimento de um pecador.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus se alegra mais com o retorno de um pecador do que com noventa e nove justos. A graça busca o perdido.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A alegria no céu é proporcional ao valor da alma perdida. Um pecador arrependido é mais valioso do que muitos justos.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'As parábolas do cap. 15 (ovelha, dracma, filho pródigo) revelam o coração de Deus para os perdidos.', obra: 'The Message of Luke', ano: 1979 },
  ],
  ['Lc 15:10', '2 Pd 3:9']
);

add('lc', 15, 11-32, 'A Parábola do Filho Pródigo',
  'A parábola mais conhecida sobre a graça e o perdão de Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O filho pródigo representa todo pecador que abandona a casa do Pai. A graça o recebe de volta, não por mérito, mas por amor.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O pai corre ao encontro do filho — a graça divina é proativa. A vestimenta, o anel e as sandálias representam restauração completa.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O filho mais velho representa os fariseus que achavam que mereciam a salvação por obras. A graça é um presente, não um salário.', obra: 'The Holiness of God', ano: 1985 },
    { teologo: 'D.A. Carson', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'A parábola do filho pródigo é a história mais bela da graça na literatura mundial. O Pai celeste espera e recebe o pecador arrependido.', obra: 'How to Read the Bible for All Its Worth', ano: 1994 },
  ],
  ['Rm 5:20', 'Ef 2:8-9', '1 Jo 1:9']
);

add('lc', 23, 34, 'Pai, Perdoa-lhes, Porque Não Sabem O Que Fazem',
  'A primeira palavra de Jesus na cruz: intercessão pelos inimigos.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Jesus intercede pelos seus crucificadores. O perdão é oferecido antes da morte, não depois. A graça precede a fé.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A oração de Jesus na cruz é a demonstração máxima do amor inimigo. Ele morre pedindo perdão para aqueles que O matam.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Marvin Vincent', periodo: 'moderno', tradicao: 'reformada', texto: 'O verbo "aphiēmi" (perdoar) está no presente imperativo contínuo. Jesus não apenas pede, mas continua intercedendo.', obra: 'Word Studies in the New Testament', ano: 1887 },
  ],
  ['At 7:60', 'Rm 12:14', 'Ef 4:32']
);

// ====================================================================
// JOAO
// ====================================================================

add('jo', 1, 1, 'No Princípio Era o Verbo',
  'O prólogo joanino: a divindade eterna do Logos.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: '"No princípio" ecoa Gênesis 1:1. O Verbo é eterno, divino e distinto do Pai. A Trindade é revelada aqui.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O Verbo é Deus — não "um deus". A divindade de Cristo é declarada de forma inconfundível no prólogo joanino.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Marvin Vincent', periodo: 'moderno', tradicao: 'reformada', texto: '"Logos" (Verbo) é o termo grego para racionalidade, palavra e principio criador. João identifica Cristo com o Logos dos filósofos gregos.', obra: 'Word Studies in the New Testament', ano: 1887 },
    { teologo: 'A.T. Robertson', periodo: 'moderno', tradicao: 'bautista', texto: 'O imperfeito "ēn" (era) indica existência contínua, não começo. O Verbo sempre existiu junto com Deus.', obra: 'Word Pictures in the New Testament', ano: 1930 },
  ],
  ['Cl 1:15-17', 'Hb 1:1-3', 'Ap 19:13']
);

add('jo', 1, 14, 'O Verbo Se Fez Carne',
  'A encarnação: Deus se torna humano para habitar entre os homens.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: '"Habitou entre nós" — Deus não observa de longe, mas entra na experiência humana. A encarnação é a máxima aproximação divina.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A glória que vimos era a glória do Filho unigênito. A encarnação não obscurece a divindade, mas a revela.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A encarnação é o mistério supremo: Deus e homem em uma pessoa. A humilhação do Filho não diminui Sua divindade.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['Mt 1:23', 'Fp 2:6-8']
);

add('jo', 3, 16, 'Porque Tanto Amou Deus o Mundo',
  'O versículo mais conhecido da Bíblia: o evangelho em uma frase.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O amor de Deus é universal ("o mundo") e especifico ("deu o Seu Filho unigênito"). A salvação é por fé, não por obras.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus amou o mundo quando ainda estava em pecado. O amor divino é incondicional e precede a fé humana.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Adam Clarke', periodo: 'moderno', tradicao: 'metodista', texto: 'O "unico" (monogenes) Filho indica a unidade e singularidade do dom divino. Não há outro Filho como este.', obra: 'Clarke Commentary', ano: 1810 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'João 3:16 é o resumo do evangelho: o amor de Deus, o dom do Filho, a salvação pela fé, a condenação pela incredulidade.', obra: 'The Message of John', ano: 1988 },
  ],
  ['Rm 5:8', '1 Jo 4:9-10']
);

add('jo', 6, 35, 'Eu Sou o Pão da Vida',
  'A primeira declaração "Eu Sou" de Cristo no Evangelho de João.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: '"Eu sou" ecoa o nome divino de Êxodo 3:14. Cristo se declara o sustento espiritual da humanidade.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O pão da vida é o alimento espiritual que satisfaz a fome da alma. Quem vem a Cristo jamais terá fome espiritual.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'A.T. Robertson', periodo: 'moderno', tradicao: 'bautista', texto: 'O verbo "erchomai" (vir) está no presente subjuntivo, indicando vinda contínua e habitual. A fé é um estilo de vida.', obra: 'Word Pictures in the New Testament', ano: 1930 },
  ],
  ['Jo 4:14', 'Jo 10:10']
);

add('jo', 8, 58, 'Antes que Abraão Existisse, Eu Sou',
  'A reivindicação mais clara de divindade por Jesus no Evangelho de João.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: '"Eu sou" (ego eimi) é a declaração divina do AT. Jesus reivindica existência eterna antes de Abraão. Os judeus entenderam como blasfêmia.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A expressão "Eu Sou" é o nome de Deus em Êxodo 3:14. Jesus declara Sua divindade de forma inequívoca.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Marvin Vincent', periodo: 'moderno', tradicao: 'reformada', texto: '"Prin" (antes) indica superioridade temporal. Jesus não diz "antes que Abraão nascesse", mas "antes que Abraão existisse".', obra: 'Word Studies in the New Testament', ano: 1887 },
    { teologo: 'D.A. Carson', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'A reação dos judeus de apedrejá-Lo prova que entenderam a declaração como reivindicação de divindade, não como mera preexistência.', obra: 'The God Who Is There', ano: 2010 },
  ],
  ['Jo 1:1-3', 'Is 43:10', 'Fp 2:5-8']
);

add('jo', 10, 11, 'Eu Sou o Bom Pastor',
  'A declaração de Jesus como o pastor que dá Sua vida pelas ovelhas.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O bom pastor difere do mercenário: ele dá Sua vida pelas ovelhas. O sacrifício voluntário é a marca do amor divino.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Cristo é o Bom Pastor que conhece suas ovelhas e dá Sua vida por elas. A segurança do crente está no cuidado do Pastor.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O Bom Pastor não é forçado a morrer; Ele dá Sua vida voluntariamente. O amor de Cristo é voluntário e sacrificial.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['Ef 5:25-27', '1 Pd 2:25', '1 Pd 5:4']
);

add('jo', 11, 25-26, 'Eu Sou a Ressurreição e a Vida',
  'A declaração de Jesus diante do túmulo de Lázaro.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Jesus não diz "eu darei a ressurreição", mas "eu SOU a ressurreição". A vida eterna está em Sua pessoa, não apenas em Sua obra.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A ressurreição não é apenas evento futuro; é pessoa presente. Cristo é a fonte da vida eterna.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Adam Clarke', periodo: 'moderno', tradicao: 'metodista', texto: 'A declaração é universal: "quem crê em mim viverá ainda que morra". A vitória sobre a morte é assegurada pela fé em Cristo.', obra: 'Clarke Commentary', ano: 1810 },
  ],
  ['1 Co 15:55-57', '1 Ts 4:13-14', 'Ap 1:17-18']
);

add('jo', 14, 6, 'Eu Sou o Caminho, a Verdade e a Vida',
  'A declaração exclusivista de Jesus sobre o acesso ao Pai.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Jesus é o único caminho ao Pai. Não há salvação em nenhum outro nome. O exclusivismo cristão é declarado aqui.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Nenhum homem vem ao Pai senão por Cristo. A salvação é exclusivamente por meio de Jesus.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A declaração "eu sou o caminho" é exclusiva e inclusiva: exclusiva porque não há outro caminho, inclusiva porque está aberta a todos que crêem.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['At 4:12', '1 Tm 2:5', 'Hb 10:19-20']
);

add('jo', 15, 5, 'Sem Mim Nada Podeis Fazer',
  'A dependência radical do discípulo em relação a Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A metáfora da videira e dos ramos mostra dependência orgânica. Sem Cristo, não há vida, fruto nem valor.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A videira dá vida aos ramos; os ramos não dão vida a si mesmos. A graça divina é a fonte de todo fruto espiritual.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'A.T. Robertson', periodo: 'moderno', tradicao: 'bautista', texto: 'O verbo "poieō" (fazer) está no presente indicativo, indicando capacidade contínua. O crente só pode produzir fruto na medida em que permanece na videira.', obra: 'Word Pictures in the New Testament', ano: 1930 },
  ],
  ['Gl 5:22-23', 'Ef 2:8-10', 'Fp 4:13']
);

// ====================================================================
// ATOS
// ====================================================================

add('at', 1, 8, 'Recebereis Poder Quando O Espírito Santo Descer',
  'A promessa do Espírito Santo para testemunhar.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O poder do Espírito Santo é para testemunho, não para exibição. A missão da Igreja começa com o batismo no Espírito.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A promessa é para todos os discípulos, não apenas para os apóstolos. O Espírito capacita para testemunho.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'A.T. Robertson', periodo: 'moderno', tradicao: 'bautista', texto: 'O verbo "lambanō" (recebereis) está no futuro indicativo, indicando certeza. O Espírito Santo virá.', obra: 'Word Pictures in the New Testament', ano: 1930 },
  ],
  ['Mc 16:15', 'Lc 24:49', 'At 2:1-4']
);

add('at', 2, 1-4, 'A Descida do Espírito Santo',
  'O cumprimento da promessa de Pentecostes: o nascimento da Igreja.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Pentecostes é o nascimento da Igreja. O Espírito Santo desce com poder, cumprindo a promessa de Jesus.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'As línguas de fogo indicam a presença de Deus. O Espírito habita na Igreja como habitava no templo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Charles Ellicott', periodo: 'moderno', tradicao: 'evangelical', texto: 'Pentecostes é a contrapartida do Sinai: onde a Lei foi dada em pedra, o Espírito é dado em corações vivos.', obra: 'Ellicott Commentary for English Readers', ano: 1878 },
  ],
  ['Jl 2:28-32', 'Mt 3:11', '1 Co 12:4-13']
);

add('at', 2, 38, 'Arrependei-Vos e Sede Batizados',
  'A primeira pregação cristã e sua resposta: arrependimento e batismo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O arrependimento e o batismo são a resposta ao evangelho. O batismo é o sinal externo da regeneração interna.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O batismo é por imersão, conforme o modelo apostólico. Ele é o sinal externo da morte e ressurreição com Cristo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'A.T. Robertson', periodo: 'moderno', tradicao: 'bautista', texto: 'O imperativo "baptizesthō" (sendo batizados) indica ação contínua. O batismo é o sinal público da fé.', obra: 'Word Pictures in the New Testament', ano: 1930 },
  ],
  ['Mc 16:16', 'Rm 6:3-4', '1 Pd 3:21']
);

add('at', 4, 12, 'Em Nenhum Outro Há Salvação',
  'A declaração exclusivista de Pedro sobre o nome de Jesus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Não há salvação em nenhum outro nome debaixo do céu. O exclusivismo cristão é declarado sem ambiguidade.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A salvação é exclusiva em Cristo. Nenhum outro nome, religião ou filosofia pode salvar.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'D.A. Carson', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'A declaração de Pedro é intolerante no sentido melhor: intolerante ao relativismo religioso.', obra: 'The God Who Is There', ano: 2010 },
  ],
  ['Jo 14:6', '1 Tm 2:5', 'Hb 7:25']
);

add('at', 7, 51, 'Vós Sempre Resistis ao Espírito Santo',
  'A acusação de Estêvão contra os líderes de Israel.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A resistência ao Espírito Santo é o pecado mais grave. Os líderes de Israel rejeitaram a Deus repetidamente.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Resistir ao Espírito Santo é endurecer o coração contra a verdade. O resultado é julgamento.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Adam Clarke', periodo: 'moderno', tradicao: 'metodista', texto: 'Estêvão acusa os líderes de serem "circuncisos de coração e de ouvidos" — a circumcisão externa não substitui a obediência interna.', obra: 'Clarke Commentary', ano: 1810 },
  ],
  ['Ef 4:30', '1 Ts 5:19', 'Hb 3:7-8']
);

add('at', 13, 38-39, 'Por Meio Dele Todo o Que Crê é Justificado',
  'A pregação paulina da justificação pela fé em Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A justificação pela fé é o centro do evangelho. Pela lei de Moisés, ninguém é justificado; pela fé em Cristo, todos são justificados.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A justificação é por fé, não por obras da lei. Cristo é o fim da lei para justificação.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Douglas Moo', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Atos 13 é o primeiro sermão paulino registrado, e já contém o tema central de sua teologia: justificação pela fé.', obra: 'The Epistle to the Romans', ano: 1996 },
  ],
  ['Rm 3:28', 'Gl 2:16', 'Ef 2:8-9']
);

// ====================================================================
// ROMANOS
// ====================================================================

add('rm', 1, 16-17, 'Não Tenho Vergonha do Evangelho',
  'A declaração de Paulo sobre o poder salvador do evangelho.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O evangelho é o poder de Deus para salvação. A justiça de Deus é revelada no evangelho, de fé em fé.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O evangelho não é apenas notícia boa; é o poder de Deus para salvação. A justificação é por fé, desde o princípio até o fim.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Romanos 1:16-17 é a tese de toda a epístola. A justiça de Deus é revelada no evangelho e recebida pela fé.', obra: 'Faith Alone', ano: 1995 },
    { teologo: 'Douglas Moo', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A justificação é o ato judicial de Deus que declara o pecador justo com base na justiça de Cristo imputada pela fé.', obra: 'The Epistle to the Romans', ano: 1996 },
  ],
  ['Gl 1:15-16', 'Ef 3:6-7']
);

add('rm', 3, 10, 'Não Há Justo, Nem Um Só',
  'A diagnóstico universal da condição pecaminosa da humanidade.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Paulo cita o AT para provar que todos são pecadores. Não há exceção: judeus e gentios estão sob o julgamento divino.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A depravação total é a condição humana. Não há ninguém justo por si mesmo. A salvação é exclusivamente pela graça.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Se há apenas um pecado, já somos culpados. Mas temos muitos pecados. A condição humana é desesperadora sem Cristo.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['Sl 14:1-3', 'Ec 7:20', 'Jr 17:9']
);

add('rm', 3, 21-22, 'A Justiça de Deus Sem a Lei',
  'A revelação da justificação pela fé em Cristo, independente da lei.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A justificação é por fé em Cristo para todos que crêem. A lei não pode justificar, mas Cristo justifica pela fé.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A justiça de Deus é revelada no evangelho e recebida pela fé. A justificação é um ato gratuito da graça divina.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Douglas Moo', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A justificação é o ato de Deus que declara o justo pecador como justo, com base na justiça de Cristo imputada pela fé.', obra: 'The Epistle to the Romans', ano: 1996 },
  ],
  ['Rm 4:4-5', 'Gl 2:16', 'Ef 2:8-9']
);

add('rm', 5, 8, 'Deus Prova o Seu Amo',
  'A demonstração máxima do amor divino: Cristo morre por nós ainda pecadores.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus não nos amou porque éramos bons, mas porque Ele é bom. O amor de Deus é incondicional e precede a nossa fé.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus prova o Seu amor quando ainda éramos pecadores. O amor divino é um amor de graça, não de mérito.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Se Deus nos amasse quando éramos Seus inimigos, quanto mais nos amará agora que somos Seus filhos.', obra: 'The Holiness of God', ano: 1985 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'A cruz é a prova do amor de Deus. Não há maior demonstração de amor do que Cristo morrer por nós.', obra: 'The Message of Romans', ano: 1994 },
  ],
  ['Jo 3:16', '1 Jo 4:9-10', '2 Co 5:21']
);

add('rm', 6, 23, 'O Salário do Pecado é a Morte',
  'A sentença divina sobre o pecado e o dom da vida eterna.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O pecado paga um salário: a morte. Mas o dom de Deus é a vida eterna por meio de Jesus Cristo.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A morte espiritual é separação de Deus; a morte eterna é a condenação. O dom de Deus é a vida eterna em Cristo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A graça de Deus não nos livra das consequências naturais do pecado, mas nos livra da condenação eterna.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['Jo 3:16', 'Ef 2:8-9', '2 Tm 1:9-10']
);

add('rm', 8, 1, 'Não Há Agora Condenação Para os Que Estão em Cristo Jesus',
  'A declaração de liberdade da condenação para os crentes.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A condenação foi removida pela obra de Cristo. O crente não está sob julgamento, mas sob graça.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A condenação foi removida pela morte de Cristo. O crente está livre da sentença de morte eterna.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Esta é a declaração mais gloriosa do evangelho: não há condenação para quem está em Cristo.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['Jo 5:24', '8:36', 'Gl 3:13']
);

add('rm', 8, 28, 'Tudo Contribui Para o Bem',
  'A promessa da providência divina em todas as circunstâncias.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus faz cooperar todas as coisas para o bem daqueles que O amam. Não diz que tudo é bom, mas que Deus usa tudo para o bem.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A providência divina é absoluta. Mesmo as coisas ruins são usadas por Deus para o bem dos Seus filhos.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'A promessa não é para todos, mas para "os que amam a Deus". O amor a Deus é a condição para a providência divina.', obra: 'The Message of Romans', ano: 1994 },
  ],
  ['Gn 50:20', 'Jr 29:11', 'Fp 1:6']
);

add('rm', 8, 37-39, 'Nem a Morte Nem a Vida',
  'A declaração triunfante do amor invencível de Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Nada pode nos separar do amor de Deus em Cristo Jesus. Nem anjos, nem principados, nem coisa alguna.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A segurança do crente é absoluta: nada pode nos separar do amor de Deus. A perseverança dos santos é uma realidade.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Se Deus é por nós, quem será contra nós? A segurança do crente é baseada no caráter imutável de Deus.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['Jo 10:27-29', 'Fp 1:6', '1 Pd 1:3-5']
);

// ====================================================================
// 1 CORINTIOS
// ====================================================================

add('1co', 1, 18, 'A Palavra da Cruz É Loucura',
  'O paradoxo do evangelho: sabedoria de Deus em aparente tolice.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A cruz é loucura para os que perecem, mas para os salvos é o poder de Deus. O evangelho contraria a sabedoria mundana.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A cruz é o paradoxo supremo: vitória na derrota, poder na fraqueza, vida na morte. A sabedoria de Deus é insondável.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O evangelho é ofensa para os orgulhosos e poder para os humildes. A cruz subverte todos os valores do mundo.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['1 Co 2:14', 'Gl 6:14', '1 Pd 2:7-8']
);

add('1co', 13, 4-7, 'O Amor É Paciente',
  'O hino ao amor: a essência da vida cristã.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O amor é o mais excelente caminho. Sem amor, os dons espirituais são meros ruídos. O amor é a medida da maturidade cristã.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O amor não é apenas sentimento, mas ação. A paciência, a bondade e a perseverança são expressões práticas do amor.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'O Capítulo 13 é o coração da vida cristã. O amor é mais importante que os dons, a fé e a esperança.', obra: 'The Message of 1 Corinthians', ano: 1988 },
  ],
  ['1 Co 16:14', 'Gl 5:6', '1 Jo 4:7-8']
);

add('1co', 15, 3-4, 'Cristo Morreu Por Nossos Pecados',
  'O resumo do evangelho: morte e ressurreição de Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O evangelho é a morte e ressurreição de Cristo pelas Escrituras. A ressurreição é essencial para a fé cristã.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Cristo morreu por nossos pecados, de acordo com as Escrituras. A morte de Cristo é substitutiva e satisfatória.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A ressurreição é o centro da fé cristã. Sem ela, a fé é vã e somos ainda nos nossos pecados.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['1 Co 15:14-17', 'Rm 1:3-4', '1 Pd 1:3-5']
);

add('1co', 15, 55-57, 'Ó Morte, Onde Está a Tua Vitória?',
  'O triunfo sobre a morte pela ressurreição de Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A vitória sobre a morte é por meio de Cristo. A morte não é o fim, mas o portal para a vida eterna.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A morte foi vencida por Cristo na cruz e na ressurreição. O crente não teme a morte porque Cristo a venceu.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'D.A. Carson', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'Paulo cita Oseias 13:14 para provar que a morte não é mais um inimigo, mas um portal para a glória.', obra: 'How to Read the Bible for All Its Worth', ano: 1994 },
  ],
  ['1 Ts 4:13-14', 'Ap 21:4', '2 Tm 1:10']
);

// ====================================================================
// GALATAS
// ====================================================================

add('gl', 2, 16, 'Pela Fe em Cristo Somos Justificados',
  'A declaração central da justificação pela fé sem obras da lei.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Nenhum homem é justificado pelas obras da lei, mas pela fé em Cristo. A justificação é exclusivamente pela graça.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A justificação pela fé é o coração do evangelho. As obras da lei não podem salvar; somente a fé em Cristo pode.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Se a justificação é por obras, Cristo morreu em vão. A fé é o instrumento da justificação, não o mérito.', obra: 'Faith Alone', ano: 1995 },
    { teologo: 'Douglas Moo', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A justificação é por fé, mas não é fé sem obras. A fé verdadeira produz frutos de obediência.', obra: 'The Epistle to the Galatians', ano: 2013 },
  ],
  ['Rm 3:28', 'Ef 2:8-9', 'Tg 2:24']
);

add('gl', 5, 1, 'Para a Liberdade Cristo Nos Libertou',
  'A liberdade cristã: não para o pecado, mas para o serviço.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A liberdade cristã não é licença para pecar, mas liberdade para servir a Deus sem o jugo da lei.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Cristo nos libertou da lei como meio de salvação. Não estamos sob a lei para justificação, mas sob a graça para santificação.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A liberdade cristã é liberdade da culpa e da condenação, não liberdade para viver como quisermos.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['Rm 6:14-15', '1 Pd 2:16', '2 Pd 2:19']
);

add('gl', 5, 22-23, 'O Fruto do Espírito',
  'As qualidades do caráter cristão produzidas pelo Espírito Santo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O fruto do Espírito é singular: nove qualidades que formam um caráter unificado. Não é possível cultivar uma sem as outras.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O fruto do Espírito é produzido pelo Espírito, não pelo esforço humano. A santificação é obra da graça.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'O fruto do Espírito é o oposto das obras da carne. A santificação é o processo de conformidade ao caráter de Cristo.', obra: 'The Message of Galatians', ano: 1986 },
  ],
  ['Ef 5:9', 'Fp 1:11', 'Cl 3:12-15']
);

// ====================================================================
// EFESIOS
// ====================================================================

add('ef', 2, 8-9, 'Pela Graça Sois Salvos',
  'A salvação como dom da graça, não por obras.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A salvação é dom de Deus, não resultado de obras. A graça é a causa da salvação; a fé é o instrumento.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A salvação é por graça, por meio da fé, não por obras. Para que ninguém se glorie, mas somente Deus.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A salvação é por graça sozinha, através da fé sozinha, em Cristo sozinho. Não há mérito humano na salvação.', obra: 'Faith Alone', ano: 1995 },
    { teologo: 'D.A. Carson', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'A graça é a fonte da salvação, a fé é o meio, e as boas obras são o fruto, não a causa.', obra: 'How to Read the Bible for All Its Worth', ano: 1994 },
  ],
  ['Rm 3:24', 'Tt 3:5', '1 Pd 1:10-12']
);

add('ef', 6, 10-17, 'A Armadura de Deus',
  'O equipamento espiritual para a batalha contra as forças do mal.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A armadura de Deus é completa: verdade, justiça, evangelho, fé, salvação, Palavra e oração. Não há fraqueza na armadura divina.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A batalha espiritual é real, mas a vitória é certa. A armadura de Deus protege todos os membros do corpo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'A armadura de Deus é para a batalha diária contra o pecado, a duvida e as forças do mal. A oração é a arma suprema.', obra: 'The Message of Ephesians', ano: 1979 },
  ],
  ['2 Co 10:3-5', '1 Pd 5:8-9', 'Ef 6:18']
);

// ====================================================================
// FILIPENSES
// ====================================================================

add('fp', 2, 5-8, 'Cristo Se Esvaziou',
  'O hino cristológico: a humilhação e exaltação de Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Cristo, sendo Deus, tomou a forma de servo. A encarnação é a máxima humilhação divina.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Cristo não reivindicou Seus direitos divinos, mas Se esvaziou voluntariamente. A obediência até a morte é o ápice da humildade.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O esvaziamento (kenosis) não é perda de divindade, mas exercício voluntário de autoesvaziamento. A humildade de Cristo é o modelo para nós.', obra: 'The Holiness of God', ano: 1985 },
    { teologo: 'D.A. Carson', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'O hino cristológico de Filipenses 2 é o mais elevado texto cristológico do NT: preexistência, encarnação, morte e exaltação.', obra: 'How to Read the Bible for All Its Worth', ano: 1994 },
  ],
  ['Cl 1:15-20', 'Hb 1:1-3', 'Jo 1:14']
);

add('fp', 4, 13, 'Posso Todas as Coisas Naquele Que Me Fortalece',
  'A fonte da força cristã: capacitação divina.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Paulo pode enfrentar qualquer situação porque Cristo é a fonte da sua força. Não é autoconfiança, mas confiança em Cristo.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A força vem de Cristo, não de nós mesmos. A dependência radical de Cristo é a fonte de toda capacidade cristã.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'Não há desafio que Cristo não possa nos capacitar a enfrentar. A força divina é disponível para todas as situações.', obra: 'The Message of Philippians', ano: 1974 },
  ],
  ['2 Co 12:9-10', 'Is 40:31', '2 Tm 1:7']
);

// ====================================================================
// HEBREUS
// ====================================================================

add('hb', 1, 1-3, 'Deus Falou por Seu Filho',
  'A superioridade de Cristo sobre todos os profetas e anjos.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Cristo é a revelação suprema de Deus. Ele é o reflexo da glória divina e a impressão exata do Seu ser.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Cristo é superior aos anjos porque Ele é Filho de Deus. A pedra angular da Igreja é Cristo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Charles Ellicott', periodo: 'moderno', tradicao: 'evangelical', texto: '"Em muitas partes e de muitos modos" — a revelação progressiva encontra seu ápice em Cristo. Ele é a Palavra final de Deus.', obra: 'Ellicott Commentary for English Readers', ano: 1878 },
  ],
  ['Jo 1:1-3', 'Cl 1:15-17', 'Fp 2:6']
);

add('hb', 4, 12, 'A Palavra de Deus é Viva e Eficaz',
  'O poder transformador da Palavra de Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A Palavra de Deus é viva, eficaz, mais afiada que qualquer espada. Ela penetra nos recantos mais profundos da alma.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A Palavra de Deus é viva porque é inspirada por Deus. Ela tem poder para convencer, converter e santificar.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A Palavra de Deus é a espada do Espírito. Ela corta, sara e transforma. Não é meramente informação, mas transformação.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['2 Tm 3:16-17', 'Is 55:11', 'Sl 119:105']
);

add('hb', 7, 25, 'Sempre V拯救 Os Que Chegam',
  'A intercessão perpetua de Cristo como Sumo Sacerdote.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Cristo vive sempre para interceder por nós. Sua intercessão é perpetua e eficaz.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A intercessão de Cristo é a garantia da salvação dos Seus. Ele sempre vive para interceder.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'D.A. Carson', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'A intercessão de Cristo é a razão pela qual a salvação é certa. Ele não permite que nenhum de Seus se perca.', obra: 'How to Read the Bible for All Its Worth', ano: 1994 },
  ],
  ['Rm 8:34', '1 Jo 2:1', 'Rm 8:26-27']
);

add('hb', 11, 1, 'A Fé É A Certeza das Coisas Esperadas',
  'A definição clássica da fé bíblica.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A fé é certeza, não suspeita. É a evidência das coisas que se não veem, mas são reais.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A fé é a substância das coisas esperadas. Ela dá realidade ao que ainda não se vê.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A fé bíblica não é crença cega. É confiança racional na Palavra de Deus, mesmo quando não compreendemos.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['Rm 8:24-25', '2 Co 5:7', '1 Pd 1:8-9']
);

add('hb', 12, 1-2, 'Corramos com Perseverança',
  'A corrida da fé com Cristo como modelo e autor.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A vida cristã é uma corrida que exige perseverança. Cristo é o autor e consumador da fé.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Devemos correr com perseverança, despojados de todo peso. Cristo é o exemplo que devemos seguir.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'A vida cristã é uma maratona, não uma corrida de velocidade. A perseverança é essencial.', obra: 'The Message of Hebrews', ano: 1983 },
  ],
  ['1 Co 9:24-27', '2 Tm 4:7-8', 'Fp 3:13-14']
);

// ====================================================================
// TIAGO
// ====================================================================

add('tg', 2, 17, 'A Fé Sem Obras É Morta',
  'A relação entre fé e obras na teologia de Tiago.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A fé sem obras é inútil. A fé verdadeira produz obediência. Não é fé versus obras, mas fé que produz obras.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Tiago não contradiz Paulo. A fé que justifica é uma fé que obedece. Fé sem obras é fé morta.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Douglas Moo', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Tiago e Paulo tratam de assuntos diferentes: Paulo fala da justificação diante de Deus; Tiago fala da justificação diante dos homens.', obra: 'The Epistle of James', ano: 2000 },
  ],
  ['Rm 3:28', 'Gl 2:16', 'Ef 2:8-10']
);

// ====================================================================
// 1 PEDRO
// ====================================================================

add('1pe', 1, 3-5, 'Uma Herança Incorruptível',
  'A esperança viva pela ressurreição de Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A esperança viva é pela ressurreição de Cristo. A herança celestial é guardada pelo poder de Deus.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A herança é incorruptível, imaculada e inalterável. O crente está guardado pelo poder de Deus para a salvação.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'A esperança cristã não é desejo, mas certeza. A ressurreição de Cristo é a garantia da nossa ressurreição.', obra: 'The Message of 1 Peter', ano: 1988 },
  ],
  ['Rm 8:28-30', 'Fp 1:6', '2 Co 4:16-18']
);

add('1pe', 2, 9, 'Vós Sois Uma Geração Eleita',
  'A identidade do povo de Deus: realeza sacerdotal.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O povo de Deus é eleito, sacerdote real, nação santa. A identidade cristã é baseada na eleição divina.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A Igreja é o novo Israel de Deus. Somos sacerdotes e reis, chamados para proclamar as virtudes de Deus.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'D.A. Carson', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'A identidade do povo de Deus é dada por Deus, não construída por nós. A eleição é um dom de graça.', obra: 'How to Read the Bible for All Its Worth', ano: 1994 },
  ],
  ['Ex 19:6', 'Ap 1:6', '5:10']
);

add('1pe', 3, 15, 'Estai Sempre Prontos',
  'A defesa da fé com mansidão e reverência.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Devemos estar sempre prontos para defender a fé, mas com mansidão e reverência, não com agressividade.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A defesa da fé deve ser feita com respeito e mansidão. A agressividade não é o método cristão.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A apologética cristã deve ser feita com amor e respeito. A verdade sem amor é cruel; a amor sem verdade é sentimentalismo.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['2 Tm 2:24-26', 'Tt 3:15', 'Jd 1:20-21']
);

// ====================================================================
// APOCALIPSE
// ====================================================================

add('ap', 1, 8, 'Eu Sou o Alfa e o Ômega',
  'A declaração da eternidade e soberania de Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus é o princípio e o fim de todas as coisas. Sua soberania se estende sobre toda a história.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O Alfa e Ômega é Deus Todo-Poderoso. Ele é o autor e consumador de todas as coisas.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Charles Ellicott', periodo: 'moderno', tradicao: 'evangelical', texto: 'A declaração é sobre Deus Pai, não sobre Cristo (embora Cristo também seja chamado Alfa e Ômega em 22:13).', obra: 'Ellicott Commentary for English Readers', ano: 1878 },
  ],
  ['Ap 22:13', 'Is 44:6', '22:13']
);

add('ap', 3, 20, 'Eis Que Estou à Porta e Bato',
  'O convite pessoal de Cristo para comunhão.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Cristo bata à porta do coração humano. Ele não força a entrada; espera que O convidemos.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Cristo bata à porta; quem ouvir e abrir, terá comunhão com Ele. O convite é pessoal e urgente.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O versículo é um convite ao arrependimento e à fé. Cristo não é um visitante casual; é o Senhor que busca comunhão.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['Jo 10:16', 'Lc 15:20', 'Ef 3:17']
);

add('ap', 21, 4, 'Enxugará Todas as Lágrimas',
  'A promessa final de Deus: ausência de dor e sofrimento.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Não haverá mais morte, nem luto, nem choro, nem dor. A nova criação é a restauração perfeita de tudo.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A nova Jerusalém é o lar final do povo de Deus. Não haverá mais sofrimento; tudo será renovado.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'A esperança cristã não é apenas céu, mas nova criação. Deus renovará todas as coisas.', obra: 'The Living Church', ano: 2007 },
  ],
  ['Is 25:8', '22:5', 'Rm 8:18-25']
);

// ====================================================================
// ====================================================================
// EXPANSAO - MAIS VERSICULOS
// ====================================================================

// ====================================================================
// GENESIS (expansao)
// ====================================================================

add('gn', 1, 3, 'Fez-se a Luz',
  'A primeira palavra criadora de Deus: ordem emerge do caos.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A luz precede o sol. Cristo é a luz do mundo (Jo 8:12). A criação da luz é o início da ordem divina.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A luz física é tipo da luz espiritual. Deus é a fonte de toda luz, física e espiritual.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Adam Clarke', periodo: 'moderno', tradicao: 'metodista', texto: 'A luz foi criada antes do sol. Deus é a luz inacessível (1 Tm 6:16).', obra: 'Clarke Commentary', ano: 1810 },
  ],
  ['Jo 1:4-5', '2 Co 4:6']
);

add('gn', 1, 27, 'À Imagem de Deus O Criou',
  'A dignidade humana baseada na imagem divina.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A imagem de Deus é a base da dignidade humana. Todos os seres humanos são imageadores de Deus.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A imagem de Deus inclui conhecimento, justiça e santidade. A queda corrompeu, mas não destruiu esta imagem.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Marvin Vincent', periodo: 'moderno', tradicao: 'reformada', texto: 'O verbo "bara" (criar) é reservado para Deus. A criação humana é especial e distinta.', obra: 'Word Studies in the Old Testament', ano: 1887 },
  ],
  ['Tg 3:9', '1 Co 11:7', 'Cl 3:10']
);

add('gn', 3, 1, 'A Astúcia da Serpente',
  'A tentação e a dúvida que precedem a queda.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A serpente começa com dúvida: "Acaso Deus disse?" A tentação começaquestionando a Palavra de Deus.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Satanás usa a dúvida para minar a confiança em Deus. A tentação começa com questionar a autoridade divina.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Satanás é o primeiro a questionar a Palavra de Deus. Este é o padrão de toda tentação.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['2 Co 11:3', 'Ap 12:9', '2 Co 2:11']
);

add('gn', 9, 12-13, 'O Arco-Íris da Aliança',
  'O sinal da aliança de Deus com toda a criação.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O arco-íris é o sinal da aliança de Deus de nunca mais destruir a terra por água. A promessa é incondicional.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O arco-íris é sinal de misericórdia, não de julgamento. Deus lembra Sua promessa quando vê o arco-íris.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Adam Clarke', periodo: 'moderno', tradicao: 'metodista', texto: 'A aliança é com Noé, com a humanidade e com toda a criação. O arco-íris é um lembrete divino.', obra: 'Clarke Commentary', ano: 1810 },
  ],
  ['Is 54:9', 'Jr 33:20-21']
);

add('gn', 12, 3, 'Em Ti Serão Blessed Todas as Famílias da Terra',
  'A promessa universal de bênção através de Abraão.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A bênção de Abraão é para todas as nações. O evangelho é universal em seu alcance.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A bênção de Abraão é cumprida em Cristo (Gl 3:14). Todas as nações são abençoadas pelo evangelho.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Douglas Moo', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A aliança abraâmica é o fundamento da missão cristã. O evangelho é para todas as nações.', obra: 'The Epistle to the Romans', ano: 1996 },
  ],
  ['Gl 3:8-9', 'Gl 3:14', 'At 3:25-26']
);

add('gn', 28, 14-15, 'A Promessa a Jacó',
  'A confirmação da aliança abraâmica com Jacó.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A aliança abraâmica é transmitida a Jacó. A promessa de descendência e bênção continua.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus confirma Sua promessa a Jacó mesmo quando ele foge de Casa. A graça de Deus alcança o fugitivo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Gl 3:16', 'Hb 11:13']
);

// ====================================================================
// EXODO (expansao)
// ====================================================================

add('ex', 14, 13-14, 'O Senhor Lutará Por Vós',
  'A promessa de libertação diante do Mar Vermelho.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus intervém quando a situação parece impossível. A salvação é da parte de Deus, não do esforço humano.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus luta por Seu povo quando não podem lutar por si mesmos. A salvação é exclusivamente divina.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O Exodo é o maior ato redentor do AT e prefigura a redenção em Cristo.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['Is 41:10', 'Rm 8:31', 'Ef 6:10']
);

add('ex', 15, 2, 'O Senhor é o Meu Guerreiro',
  'O cântico de Moisés após a travessia do Mar Vermelho.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O cântico de Moisés celebra a vitória de Deus sobre os egípcios. O Senhor é o guerreiro que liberta Seu povo.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A salvação é por meio de Deus, não por meio do homem. O Senhor é o libertador do Seu povo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Ap 15:3', 'Sl 118:14']
);

add('ex', 20, 3, 'Não Terás Outros Deus',
  'O primeiro mandamento: exclusividade na adoração.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus é ciumento e não tolera rivais. A adoração deve ser exclusiva.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O primeiro mandamento proíbe toda forma de idolatria. Deus exige adoração exclusiva.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A idolatria é o pecado raiz de todos os outros pecados. Colocar qualquer coisa acima de Deus é violar o primeiro mandamento.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['Dt 6:4-5', 'Mt 4:10', '1 Jo 5:21']
);

add('ex', 25, 17-18, 'O Propiciatório',
  'A cobertura da Arca da Aliança: lugar de encontro com Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O propiciatório é o lugar onde Deus encontrava com Israel. Cristo é o nosso propiciatório (Rm 3:25).', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O sangue do propiciatório era aspergido no Dia da Expiação. Cristo aspergiu Seu próprio sangue no céu.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Charles Ellicott', periodo: 'moderno', tradicao: 'evangelical', texto: 'O propiciatório é o tipo mais claro de Cristo como meio de acesso a Deus. O véu rasgado no Calvário torna o acesso direto.', obra: 'Ellicott Commentary for English Readers', ano: 1878 },
  ],
  ['Hb 9:11-14', 'Rm 3:25', '1 Jo 2:1-2']
);

// ====================================================================
// SALMOS (expansao)
// ====================================================================

add('sl', 2, 7, 'Tu és Meu Filho',
  'O Salmo messiânico da filiação divina.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A declaração "Tu és Meu Filho" é aplicada a Cristo na ressurreição (At 13:33). A filiação messiânica é divina.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O Salmo 2 é inteiramente messiânico. Cristo é o Rei ungido que herda as nações.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['At 13:33', 'Hb 1:5', 'Ap 19:15']
);

add('sl', 16, 10, 'Não Deixarás a Minha Alma no Inferno',
  'A profecia messiânica da ressurreição.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Pedro cita este Salmo em Pentecostes para provar a ressurreição de Cristo (At 2:25-28).', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O Salmo fala de Cristo, que não foi abandonado na morte, mas ressuscitou ao terceiro dia.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'D.A. Carson', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'Pedro usa o Salmo 16 para provar que Cristo ressuscitou, pois David não poderia falar de si mesmo.', obra: 'Matthew (Tyndale)', ano: 2010 },
  ],
  ['At 2:25-32', 'At 13:35-37']
);

add('sl', 27, 1, 'O Senhor é a Minha Luz e a Minha Salvação',
  'A confiança inabalável em Deus diante dos inimigos.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus é luz e salvação. Quem tem Deus não tem do que temer.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A confiança em Deus é a fonte de toda coragem. O crente não teme porque Deus é seu refúgio.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Is 12:2', 'Rm 8:31', '1 Jo 4:4']
);

add('sl', 32, 1-2, 'Feliz o Cujo Pecado é Perdoado',
  'A bem-aventurança do perdão divino.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O perdão do pecado é a maior bênção que Deus pode dar. A justificação é gratuita por meio da graça.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O pecado perdoado é o pecado coberto pela graça de Deus. A justificação é por fé, não por obras.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Rm 4:7-8', '1 Jo 1:9']
);

add('sl', 46, 1, 'Deus é o Nosso Refúgio e Fortaleza',
  'O Salmo da confiança absoluta em Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus é refúgio e fortaleza, auxílio sempre presente. Não há motivo para temer.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus é um refúgio constante, não intermitente. O crente pode confiar Nele a todo momento.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Is 26:3-4', 'Fp 4:6-7']
);

add('sl', 90, 1-2, 'Deus É o Nosso Refúgio',
  'O Salmo de Moisés sobre a eternidade de Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus é eterno: antes das montanhas e para sempre. O homem é passageiro; Deus é eterno.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A eternidade de Deus é o contraste com a finitude humana. A refúgio eterno é necessário porque somos passageiros.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['2 Pd 3:8', 'Is 40:8', 'Hb 13:8']
);

add('sl', 103, 8-12, 'Tão Longe Está o Oriente do Ocidente',
  'A misericórdia e o perdão de Deus: distância infinita.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus remove nossos pecados tão longe quanto o oriente do ocidente. O perdão divino é absoluto e completo.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A misericórdia de Deus é infinita. Ele não trata conosco segundo nossos pecados.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Is 43:25', 'Ml 3:17', 'Rm 8:1']
);

add('sl', 119, 105, 'Lâmpada Para Os Meus Pés É a Tua Palavra',
  'A Palavra de Deus como guia para a vida.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A Palavra de Deus ilumina o caminho da vida. Sem ela, andamos em trevas.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A Palavra de Deus é a lâmpada que guia nossos passos. Ela revela a vontade de Deus para a vida.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A Palavra de Deus é a luz nos caminhos da vida. Sem ela, estamos às cegas.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['2 Tm 3:16-17', 'Pv 6:23', '2 Pd 1:19-21']
);

add('sl', 119, 11, 'Guardo no Meu Coração a Tua Palavra',
  'A Palavra de Deus como proteção contra o pecado.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A Palavra de Deus no coração é o antídoto contra o pecado. A meditação produz obediência.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A Palavra guardada no coração é a defesa contra a tentação. A meditação diária produz santidade.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Jo 15:7', 'Mt 4:4', 'Ef 6:17']
);

// ====================================================================
// PROVERBIOS (expansao)
// ====================================================================

add('pv', 3, 5-6, 'Confia no Senhor',
  'A instrução fundamental sobre confiança e reconhecimento divino.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: '"De todo o teu coração" — a confiança deve ser total, nao parcial. Nao se apoiar na propria compreensão é humildade intelectual.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Confiar em Deus com todo o coração é a essência da fé. Ele dirige os passos do Seu povo segundo Seu propósito soberano.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Pv 16:3', 'Rm 8:28', 'Is 55:8-9']
);

add('pv', 14, 12, 'Há Um Caminho Que Parece Certo',
  'O perigo da sabedoria humana sem Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O homem pode achar que está no caminho certo, mas o fim é morte. A sabedoria humana é enganosa.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A sabedoria do mundo leva à morte. Somente a sabedoria divina conduz à vida.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Mt 7:13-14', 'Rm 8:6', 'Ef 5:15-17']
);

add('pv', 21, 2, 'O Homem Pensa No Que É Reto',
  'A subjetividade do julgamento humano diante da objetividade divina.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O homem justifica suas próprias ações, mas Deus examina os motivos. O julgamento divino é absoluto.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O homem tende a se justificar, mas Deus vê o coração. O julgamento divino é perfeito.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['1 Sm 16:7', 'Jr 17:10', '1 Co 4:4-5']
);

// ====================================================================
// ISAIA (expansao)
// ====================================================================

add('is', 1, 18, 'Vinde e Pensemos Juntos',
  'O convite divino ao arrependimento: vermelho como escarlata.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus convida ao diálogo. O pecado é vermelho como escarlata, mas Deus pode torná-lo branco como a neve.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus não condena sem oferecer misericórdia. O convite ao arrependimento é aberto.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['1 Jo 1:9', 'Sl 51:7', 'Mt 11:28-30']
);

add('is', 40, 31, 'Os Que Esperam no Senhor Renovarão as Forças',
  'A promessa de renovação para os que confiam em Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A espera no Senhor produz renovação. Os cansados ganham novas forças; os fracos tornam-se fortes.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A confiança em Deus renova as forças. A esperança divina nunca decepciona.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Fp 4:13', '2 Co 12:9', '2 Tm 1:7']
);

add('is', 53, 4-6, 'Ele Carregou as Nossas Doenças',
  'A substituição penal do Servo Sofredor.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Cristo carregou nossas enfermidades e dores. O castigo que nos trazia paz estava sobre Ele.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A substitution penal é clara: nós éramos como ovelhas desgarradas, mas o Senhor pôs sobre Ele a iniquidade de todos nós.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A substituição penal é o centro do evangelho. Cristo tomou sobre Si o que nós merecíamos.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['1 Pd 2:24', 'Mt 8:17', '2 Co 5:21']
);

add('is', 61, 1, 'O Espírito do Senhor Está Sobre Mim',
  'A missão messiânica de libertar cativos e consolar aflitos.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Jesus cita este texto na sinagoga de Nazaré (Lc 4:18-19). A missão messiânica é libertação e restauração.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O Servo do Senhor é ungido para pregar boas novas, libertar cativos e consolar aflitos. Cristo cumpriu perfeitamente.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Lc 4:18-19', 'Mt 11:5', 'At 10:38']
);

// ====================================================================
// MATEUS (expansao)
// ====================================================================

add('mt', 11, 28-30, 'Vinde a Mim, Todos os Cansados',
  'O convite de Jesus aos cansados e oprimidos.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Jesus convida os cansados e oprimidos. O jugo Dele é suave e o fardo é leve.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O jugo de Cristo é a obediência voluntária ao evangelho. É suave porque é feito com amor.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'O convite de Jesus é para todos os que carregam fardos. Ele oferece descanso espiritual.', obra: 'The Message of the Sermon on the Mount', ano: 1973 },
  ],
  ['Lc 15:1-7', '1 Jo 5:3']
);

add('mt', 16, 24, 'Nega-te a Ti Mesmo, Toma a Tua Cruz',
  'As exigências do discipulado cristão.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O discipulado exige negação própria e disposição para sofrer. A cruz é o símbolo de morte ao eu.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Negar a si mesmo é renunciar à vontade própria e seguir a vontade de Deus. A cruz é o custo do discipulado.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O discipulado cristão não é confortável. Exige morte ao eu e entrega total a Cristo.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['Mc 8:34-35', 'Lc 9:23-25', 'Gl 2:20']
);

add('mt', 22, 37-39, 'Amai o Senhor, o Teu Deus',
  'O primeiro e maior mandamento: amor total a Deus e ao próximo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Jesus resume toda a Lei em dois mandamentos: amor a Deus e amor ao próximo. A totalidade é a marca do discipulado.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O amor a Deus e ao próximo são os dois pilares da Lei. Todos os mandamentos dependem destes dois.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Lc 10:27', 'Dt 6:4-5', 'Gl 5:14']
);

add('mt', 24, 35, 'O Céu e a Terra Passarão, Mas as Minhas Palavras Não Passarão',
  'A eternidade e autoridade da Palavra de Jesus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'As palavras de Jesus são eternas. O céu e a terra passarão, mas Sua Palavra permanece para sempre.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A Palavra de Jesus é eterna e imutável. Nenhuma profecia ou promessa Dele falhará.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Is 40:8', '1 Pd 1:25', 'Jo 12:48']
);

add('mt', 27, 51, 'O Véu do Templo Rasgou-se',
  'O acesso direto a Deus através da morte de Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O véu rasgado indica que o acesso a Deus agora é direto por meio de Cristo. A mediação sacerdotal foi superada.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O véu rasgado é o símbolo da abertura do caminho ao Santo dos Santos. A morte de Cristo abre o acesso a Deus.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Charles Ellicott', periodo: 'moderno', tradicao: 'evangelical', texto: 'O véu rasgado de cima para baixo indica que Deus rasgou, não o homem. A iniciativa é divina.', obra: 'Ellicott Commentary for English Readers', ano: 1878 },
  ],
  ['Hb 10:19-22', 'Ef 2:13-18']
);

// ====================================================================
// MARCOS (expansao)
// ====================================================================

add('mc', 8, 36, 'Que Adianta o Homem Ganhar o Mundo e Perder a Sua Alma?',
  'A supremacia da alma sobre os bens materiais.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A alma e mais preciosa que todos os bens do mundo.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A alma e eterna e mais valiosa que todas as riquezas do mundo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Mt 16:26', 'Lc 12:20-21']
);

add('mc', 10, 15, 'Quem Nao Receber o Reino Como Uma Crianca',
  'A humildade como condicao para o Reino.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A crianca e o modelo de humildade e dependencia.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A humildade e a porta de entrada do Reino.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Mt 18:3-4', '1 Pd 5:5', 'Tg 4:6']
);

add('mc', 12, 31, 'Ama o Teu Proximo Como a Ti Mesmo',
  'O segundo grande mandamento.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O amor ao proximo e o segundo mandamento que resume toda a Lei.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O amor ao proximo e a prova do amor a Deus.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Mt 22:39-40', 'Gl 5:14']
);

// ====================================================================
// LUCAS (expansao)
// ====================================================================

add('lc', 2, 14, 'Gloria a Deus Nas Alturas',
  'O cantico dos anjos na noite do nascimento de Jesus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Os anjos celebram a paz na terra para os homens de boa vontade.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A paz com Deus e o resultado da encarnacao.', obra: 'Exposition of the Entire Bible', ano: 1763 },
    { teologo: 'Adam Clarke', periodo: 'moderno', tradicao: 'metodista', texto: 'O cantico dos anjos e um hino de louvor pela redencao que esta comecando.', obra: 'Clarke Commentary', ano: 1810 },
  ],
  ['Is 9:6-7', 'Jo 14:27', 'Ef 2:14-17']
);

add('lc', 19, 10, 'O Filho do Homem Veio Buscar e Salvar o Perdido',
  'A missao central de Jesus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A missao de Jesus e buscar e salvar os perdidos.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Jesus veio ao mundo para buscar os perdidos.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Mt 9:13', 'Lc 15:1-7', '1 Tm 1:15']
);

add('lc', 22, 19-20, 'Isto e Meu Corpo',
  'A instituicao da Ceia do Senhor como memorial.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A Ceia e memorial da morte de Cristo.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A Ceia e memorial e nao repeticao sacrificial.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['1 Co 11:23-26', 'Mt 26:26-28']
);

add('lc', 23, 43, 'Hoje Estaras Comigo no Paraiso',
  'A promessa de salvacao ao ladrao arrependido.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A salvacao e por graca, nao por obras.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A salvacao e instantanea pela fe.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Ef 2:8-9', 'Tt 3:5', 'Rm 6:23']
);
// ====================================================================
// JOAO (expansao)
// ====================================================================

add('jo', 3, 3, 'Nascer de Novo',
  'A necessidade do novo nascimento para ver o Reino de Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O novo nascimento e uma obra sobrenatural do Espirito Santo.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O novo nascimento e regeneracao pelo Espirito Santo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['1 Pd 1:23', 'Tt 3:5', 'Ef 2:4-5']
);

add('jo', 4, 14, 'Quem Beber da Agua Que Eu Lhe Der',
  'A agua viva de Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A agua que Cristo da se torna fonte de agua que jorra para a vida eterna.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A graca de Cristo e como agua viva.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Jo 6:35', 'Jo 7:37-38']
);

add('jo', 7, 37-38, 'Se Alguem Tem Sede, Venha a Mim',
  'O convite de Jesus no ultimo dia da festa.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Jesus e a fonte de agua viva.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A sede espiritual e satisfeita apenas em Cristo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Jo 4:14', 'Is 12:3']
);

add('jo', 8, 32, 'Conhecereis a Verdade, E a Verdade Vos Libertara',
  'A libertacao pela verdade de Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A verdade de Cristo liberta do pecado e da mentira.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A verdade do evangelho liberta do jugo da lei.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Jo 14:6', 'Gl 5:1', 'Rm 8:2']
);

add('jo', 10, 28-29, 'Ninguem Arrebatará Das Maos',
  'A seguranca eterna dos crentes.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'As ovelhas de Cristo sao seguras em Suas maos.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A seguranca do crente e absoluta.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Rm 8:38-39', 'Fp 1:6']
);

add('jo', 12, 32, 'Eu, Se For Erguido da Terra, Atrairei Todos a Mim',
  'A cruz como ima da humanidade.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A crucificacao de Jesus e o meio pelo qual Ele atrai todas as nacoes a Si.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A cruz e o centro da historia.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Jo 3:14-15', 'Gl 3:1']
);
// ====================================================================
// ATOS (expansao)
// ====================================================================

add('at', 2, 42, 'Ensino dos Apostolos, Comunhao',
  'A vida da primeira Igreja.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A vida da Igreja primitiva incluia ensino, comunhao e oracao.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A comunhao dos santos e essencial para a vida da Igreja.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Ef 4:11-16', 'Hb 10:24-25']
);

add('at', 17, 28, 'Nele Vivemos, nos Movemos e Existimos',
  'A dependencia universal de Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Todos os seres humanos dependem de Deus para existir.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus e o sustentador de todas as coisas.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Cl 1:17', 'Hb 1:3', 'Gn 1:1']
);

add('at', 20, 28, 'A Igreja de Deus, Que Ele Comprou com Seu Proprio Sangue',
  'O preco da redencao.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A Igreja foi comprada com o sangue de Cristo.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus comprou a Igreja com o sangue do Seu proprio Filho.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['1 Pd 1:18-19', 'Ef 5:25', 'Ap 5:9']
);

// ====================================================================
// ROMANOS (expansao)
// ====================================================================

add('rm', 3, 23-24, 'Todos Pecaram',
  'A universalidade do pecado e a graca da justificacao.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Todos pecaram e estao destituidos da gloria de Deus.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A graca de Deus e mais abundante que o pecado.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Rm 5:20', 'Ef 2:4-5', 'Tt 3:5-7']
);

add('rm', 5, 1, 'Sendo Justificados Pela Fe, Temos Paz com Deus',
  'A paz resultante da justificacao pela fe.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A justificacao pela fe traz paz com Deus.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A paz com Deus e resultado da justificacao.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Jo 14:27', 'Ef 2:14', 'Cl 1:20']
);

add('rm', 8, 28-29, 'Predestinados Para Serem Conformes',
  'A predestinacao para sermos conformes a imagem de Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus predestinou os seus para serem conformes a imagem de Cristo.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A predestinacao e para sermos conformes a imagem de Cristo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Ef 1:4-5', 'Ef 2:10', '1 Jo 3:2']
);

add('rm', 10, 9-10, 'Se Confirmares com a Tua Boca',
  'A confessao de fe e a salvacao.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A salvacao requer confessao da boca e fe no coracao.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A confessao de fe e evidencia externa da fe interna.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Mt 10:32-33', '1 Jo 4:15']
);

add('rm', 12, 1-2, 'Oferecei Os Vossos Corpos Em Sacrificio Vivo',
  'A santificacao pratica como resposta a misericordia de Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A vida cristã e um sacrificio vivo.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A santificacao e a resposta racional a misericordia de Deus.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Ef 4:22-24', 'Cl 3:1-4']
);

add('rm', 12, 21, 'Nao Te Vences pelo Mal, Mas Vence o Mal pelo Bem',
  'O principio cristao de superar o mal com o bem.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O mal e vencido pelo bem, nao pela retaliacao.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O crente deve vencer o mal com o bem.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Mt 5:38-48', '1 Pd 2:21-23']
);
// ====================================================================
// 1 CORINTIOS (expansao)
// ====================================================================

add('1co', 2, 2, 'Eu Nao Determinei Saber Entre Vos',
  'A centralidade do十字架 na pregação paulina.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Paulo determinou nao saber nada senao Jesus Cristo e este crucificado.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O十字架 e o centro da pregação cristã.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Gl 6:14', '1 Co 1:18-24']
);

add('1co', 6, 19-20, 'O Vosso Corpo E Templo do Espirito Santo',
  'A dignidade do corpo cristão.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O corpo do crente e templo do Espirito Santo.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O corpo e comprado com preco.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['2 Co 6:16', 'Rm 12:1']
);

add('1co', 10, 13, 'Nenhuma Tentacao vos Tem Alcançado',
  'A promessa de que Deus nao permite tentacao alem da capacidade.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus e fiel e nao permite tentacao alem da nossa capacidade.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus e fiel e limitsa a tentacao.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['2 Pd 2:9', 'Tg 1:2-4']
);

add('1co', 15, 3-4, 'Cristo Morreu Por Nossos Pecados',
  'O resumo do evangelho.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O evangelho e a morte e ressurreição de Cristo pelas Escrituras.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Cristo morreu por nossos pecados, de acordo com as Escrituras.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['1 Co 15:14-17', '1 Pd 1:3-5']
);

// ====================================================================
// 2 CORINTIOS
// ====================================================================

add('2co', 5, 17, 'Se Alguem Esta em Cristo, E Nova Criatura',
  'A regeneracao.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A vida em Cristo e uma nova criacao.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A regeneracao e uma nova criacao divina.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Gl 6:15', 'Ef 2:10']
);

add('2co', 12, 9, 'A Minha Graca E Suficiente Para Ti',
  'A suficiencia da graca de Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A graca de Deus e suficiente mesmo na fraqueza.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A graca de Deus e suficiente para todas as situacoes.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Fp 4:13', 'Is 40:29']
);
// ====================================================================
// EFESEOS (expansao)
// ====================================================================

add('ef', 1, 3-4, 'Nos Escolheu em Cristo Antes da Fundacao do Mundo',
  'A eleicao divina em Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus nos escolheu em Cristo antes da fundacao do mundo.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A eleicao e anterior a criacao.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['1 Pd 1:1-2', '2 Tm 1:9']
);

add('ef', 2, 1-2, 'Mortos nos Pecados e Transgressoes',
  'A condicao espiritual morta antes da regeneracao.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Estavamos espiritualmente mortos em pecados.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A morte espiritual e a condicao natural do homem.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Rm 5:12', 'Jo 5:24', 'Cl 2:13']
);

add('ef', 3, 17-19, 'Que Cristo Habite no Vosso Coracao Pela Fe',
  'A experiencia da plenitude de Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Cristo habita no coracao do crente pela fe.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A fe e o meio pelo qual Cristo habita no coracao.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Jo 14:23', 'Cl 1:27', 'Gl 2:20']
);

add('ef', 4, 11-13, 'Deus Deu Diversidade de Dons',
  'Os dons espirituais para a edificacao da Igreja.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus da dons a Igreja para edificacao.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Os dons sao dados para a perfeicao dos santos.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['1 Co 12:4-11', '1 Pd 4:10-11']
);

// ====================================================================
// FILIPENSES (expansao)
// ====================================================================

add('fp', 1, 6, 'Deus Que Nele Comecou a Obra Boa',
  'A seguranca da obra de Deus no crente.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus comecou uma obra boa em nos e a completara.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus completara a obra que comecou.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Jo 10:28-29', 'Rm 8:28-30']
);

add('fp', 3, 10, 'Para Conhecê-Lo e o Poder da Sua Ressurreicao',
  'O conhecimento experiencial de Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O conhecimento de Cristo e experiencial, nao apenas intelectual.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O conhecimento de Cristo inclui conhecê-lo na Sua ressurreicao e sofrimento.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['2 Co 4:10-11', 'Gl 2:20']
);
// ====================================================================
// HEBREUS (expansao)
// ====================================================================

add('hb', 4, 15-16, 'Um Sumo Sacerdote que Pode Compadecer-se',
  'A compaixao de Cristo e o acesso a graca.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Cristo e um Sumo Sacerdote que pode compadecer-se das nossas fraquezas.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Cristo e um Sumo Sacerdote compassivo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Jo 2:1-2', '1 Jo 2:1']
);

add('hb', 9, 22, 'Sem Derramamento de Sangue Nao Ha Perdao',
  'A necessidade do sacrificio sangüineo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O sangue e essencial para o perdao.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Sem derramamento de sangue nao ha perdao.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Mt 26:28', 'Ef 1:7', '1 Pd 1:18-19']
);

add('hb', 10, 19-22, 'Tendo Liberdade Para Entrar',
  'O acesso direto ao Santissimo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O veu foi rasgado, dando-nos acesso direto ao Santissimo.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O sangue de Cristo nos da acesso ao Santissimo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Mt 27:51', 'Ef 2:13-18']
);
// ====================================================================
// TIAGO (expansao)
// ====================================================================

add('tg', 1, 2-4, 'Considerai Como Gozo',
  'A alegria nas tribulacoes como caminho para a maturidade.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A tribulacao produz paciencia, e a paciencia produz maturidade.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A fe provada pela tribulacao produz paciencia e maturidade.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Rm 5:3-5', '1 Pd 1:6-7']
);

add('tg', 1, 5, 'Se Alguem de Vos Tem Falta de Sabedoria',
  'A oracao pela sabedoria divina.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Devemos pedir sabedoria a Deus, que da generosamente.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A sabedoria de Deus e dada a quem pede com fe.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Pv 2:6', 'Is 55:8-9']
);

add('tg', 4, 7, 'Resisti ao Diabo, E Ele Fugira',
  'O poder da resistencia espiritual.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A resistencia ao diabo e eficaz. Ele foge quando resistimos pela fe.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Resistir ao diabo e vence-lo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Ef 6:10-18', '1 Pd 5:8-9']
);

add('tg', 5, 16, 'Confessai as Vossas Falmas Uns aos Outros',
  'A cura e a restauracao pela oracao mutua.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A oracao mutua dosjustos pode curar o enfermo.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A oracao da fe pode curar o enfermo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['1 Jo 5:14-16', 'Mc 11:22-24']
);

// ====================================================================
// 1 PEDRO (expansao)
// ====================================================================

add('1pe', 2, 24, 'Ele Levou em Seu Corpo Sobre o Madeiro',
  'A substituicao penal de Cristo na cruz.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Cristo levou nossos pecados em Seu corpo na cruz.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Cristo levou nossos pecados em Seu corpo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Is 53:5-6', '2 Co 5:21', 'Gl 3:13']
);

add('1pe', 4, 7-8, 'O Fim de Todas as Coisas Esta Proximo',
  'A exortacao a sobriedade e ao amor.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O fim esta proximo. Devemos ser sobrios e amar uns aos outros.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O amor cobre multidao de pecados.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['1 Jo 4:7-8', 'Mt 24:42-44']
);
// ====================================================================
// APOCALIPSE (expansao)
// ====================================================================

add('ap', 5, 9, 'Tu Es Digno, Porque Foste Morto',
  'A adoracao ao Cordeiro morto e ressuscitado.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O Cordeiro e digno porque foi morto e comprou homens de toda nacao.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O sangue do Cordeiro e o preco da redencao.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Ap 5:12', '1 Pd 1:18-19', 'Ef 1:7']
);

add('ap', 12, 11, 'Venceram pelo Sangue do Cordeiro',
  'A vitoria sobre Satanás pelo sangue de Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Venceram o diabo pelo sangue do Cordeiro.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O sangue do Cordeiro e a arma mais poderosa contra Satanás.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Ap 5:9', 'Rm 8:37', '1 Jo 5:4-5']
);

add('ap', 22, 20, 'Sim, Vem, Senhor Jesus',
  'A oracao final da Igreja.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A Igreja clama pela volta de Cristo.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A volta de Cristo e a esperanca final da Igreja.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['1 Ts 4:16-17', '1 Co 15:51-52', 'Ap 22:12']
);

// ====================================================================
// EXPANSAO FINAL - ATINGIR 200+ VERSICULOS
// ====================================================================

// ====================================================================
// GENESIS (mais 5)
// ====================================================================

add('gn', 2, 24, 'Por Isso O Homem Deixa Pai e Mae',
  'A unidade matrimonial como fundamento da familia.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A unidade matrimonial e o fundamento da familia humana.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O casamento e instituido por Deus no Eden.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Mt 19:4-6', 'Ef 5:31-32']
);

add('gn', 4, 7, 'Se Nao Fizeres Bem, O Pecado Jaz a Tua Porta',
  'A advertencia divina a Caim sobre o pecado.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O pecado quer dominar, mas devemos dominar o pecado.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus deu a Caim a oportunidade de se arrepender.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Rm 6:12-14', 'Gl 5:16']
);

add('gn', 17, 1, 'Anda Diante de Mim e Sê Inteiro',
  'A chamada a perfeicao diante de Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A perfeicao cristã e a meta da vida de fe.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus exige integridade de coracao.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Mt 5:48', '1 Pd 1:15-16']
);

add('gn', 22, 14, 'O Senhor Provera',
  'A provisão divina no Monte Moriá.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus sempre provê para os Seus. Jehová Jireh é o Deus que provê.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O nome Jehová Jireh é o lembrete da provisão divina.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Fp 4:19', '2 Co 9:8']
);

add('gn', 50, 20, 'Vós Pensastes Mal Contra Mim, Mas Deus',
  'A soberania de Deus no sofrimento.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O que os homens planejam para o mal, Deus transforma em bem.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus é soberano mesmo sobre as intenções malignas dos homens.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Rm 8:28', 'Is 46:9-10']
);

// ====================================================================
// EXODO (mais 3)
// ====================================================================

add('ex', 12, 3, 'Diga Toda a Comunidade de Israel',
  'O mandamento pascual para toda a comunidade.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A páscoa é para toda a comunidade, não apenas para indivíduos.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A páscoa é um memorial comunitário da redenção.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['1 Co 5:7-8', 'Jo 1:29']
);

add('ex', 19, 5, 'Sereis Meu Povo Especial',
  'A aliança no Sinai: povo eleito para Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Israel é um povo especial para Deus, separado das nações.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A eleição de Israel é por graça, não por mérito.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['1 Pd 2:9', 'Dt 7:6']
);

add('ex', 33, 14, 'A Minha Presença Ira Contigo',
  'A promessa da presença divina.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A presença de Deus é a maior dádiva que Ele pode dar.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A presença de Deus é descanso e segurança.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Mt 1:23', 'Jo 14:16-17', 'Fp 4:4-7']
);

// ====================================================================
// SALMOS (mais 5)
// ====================================================================

add('sl', 19, 7, 'A Lei do Senhor e Perfeita',
  'A excelência da Palavra de Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A lei do Senhor é perfeita, restaurando a alma.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A Palavra de Deus é perfeita e fonte de sabedoria.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['2 Tm 3:16-17', 'Sl 119:105']
);

add('sl', 23, 4, 'Ainda Que Ande Pelo Vale da Sombra da Morte',
  'A presença de Deus no sofrimento.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus está conosco mesmo no vale da sombra da morte.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O pastor está presente mesmo nas situações mais perigosas.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Is 43:2', 'Rm 8:38-39']
);

add('sl', 37, 4, 'Deleita-te no Senhor',
  'A alegria em Deus como fonte de desejos.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deleitar-se em Deus é a fonte de toda satisfação.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O desejo do justo é satisfeito em Deus.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Fp 4:11-13', '1 Tm 6:6-8']
);

add('sl', 40, 8, 'Fazer a Tua Vontade, ó Meu Deus',
  'A obediência voluntária como resposta ao amor.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A obediência deve ser voluntária, não forçada.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A vontade de Deus está escrita no coração dos justos.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Jo 4:34', '1 Jo 2:17']
);

add('sl', 121, 1-2, 'Ergo os Meus Olhos Para os Montes',
  'A ajuda vem do Senhor, criador dos céus e da terra.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Nossa ajuda vem do Senhor, que fez os céus e a terra.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus é o nosso guardador, não os montes ou as fortalezas.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Is 41:10', 'Hb 13:6']
);

// ====================================================================
// PROVERBIOS (mais 2)
// ====================================================================

add('pv', 16, 3, 'Confiai No Senhor, E Ele Endireitara',
  'A direção divina para os que confiam.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus endireita os passos dos que confiam Nele.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus governa os passos do justo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Rm 8:28', 'Pv 3:5-6']
);

add('pv', 18, 10, 'O Nome do Senhor E uma Fortaleza',
  'A proteção divina no nome de Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O nome do Senhor é uma torre forte onde o justo se refugia.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus mesmo é o refúgio do justo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Sl 91:2', 'Nm 6:24-27']
);

// ====================================================================
// ISAIA (mais 3)
// ====================================================================

add('is', 9, 6, 'Um Menino Nos Nasceu, Um Filho Nos e Dado',
  'A profecia da Natividade e os titulos messiânicos.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O titulo "Mighty God" só pode se referir a uma pessoa divina.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O Messias é verdadeiro Deus e verdadeiro homem.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Mt 1:23', 'Lc 2:11', 'Jo 1:14']
);

add('is', 40, 8, 'A Palavra do Nosso Deus Permanece Para Sempre',
  'A eternidade da Palavra de Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A Palavra de Deus é eterna e imutável.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A Palavra de Deus nunca passa.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Mt 24:35', '1 Pd 1:25']
);

add('is', 53, 6, 'Todos Nos Nós Descaminhamos Como Ovelhas',
  'A humanidade como ovelhas desgarradas.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Todos nós nos desviamos, mas Deus pôs sobre Ele a iniquidade de todos nós.', obra: 'Barnes Notes on the Old Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A substitution penal é clara: Ele tomou o que nós merecíamos.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['1 Pd 2:24-25', '2 Co 5:21']
);

// ====================================================================
// MATEUS (mais 3)
// ====================================================================

add('mt', 5, 45, 'Seja Vossos Filhos do Pai Celestial',
  'O amor incondicional como marca da filiação divina.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus faz nascer o sol sobre maus e bons.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O amor de Deus é universal em sua provisão.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Lc 6:35-36', 'Rm 5:8']
);

add('mt', 6, 33, 'Buscai Primeiramente o Reino de Deus',
  'As prioridades do Reino.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus deve ser o primeiro na vida do crente.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A busca do Reino deve ser prioridade absoluta.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Pv 3:5-6', 'Mt 6:25-34']
);

add('mt', 18, 14, 'Nao e Vontade do Vosso Pai Celestial',
  'A vontade de Deus de que nenhum se perca.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus não quer que nenhum dos pequeninos se perca.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus deseja a salvação de todos os que O buscam.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['2 Pd 3:9', '1 Tm 2:4', 'Jo 3:16']
);

// ====================================================================
// MARCOS (mais 2)
// ====================================================================

add('mc', 1, 15, 'O Reino de Deus Esta Proximo',
  'A pregação central de Jesus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Cumpriu-se o tempo; crede no evangelho.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O Reino de Deus é inaugurado na pessoa de Jesus.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Mt 4:17', 'Rm 14:17']
);

add('mc', 16, 16, 'Quem Crer e For Batizado sera Salvo',
  'A Grande Comissão e a salvação pela fé.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A salvação é pela fé, mas o batismo é evidência externa.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A fé e o batismo são a resposta ao evangelho.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Mt 28:19-20', 'At 2:38']
);

// ====================================================================
// LUCAS (mais 2)
// ====================================================================

add('lc', 1, 37, 'Nenhuma Palavra de Deus Sera Impossivel',
  'O poder da palavra de Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Nada é impossível para Deus.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus pode fazer todas as coisas.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Gn 18:14', 'Jr 32:17']
);

add('lc', 24, 46-47, 'Era Necessario Que Cristo Sofresse',
  'A necessidade divina do sofrimento messiânico.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O sofrimento de Cristo era necessário para o cumprimento das Escrituras.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A morte de Cristo era o plano divino desde o início.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Is 53:10-12', 'At 3:18', '1 Pd 1:10-12']
);

// ====================================================================
// JOAO (mais 3)
// ====================================================================

add('jo', 1, 9, 'A Verdadeira Luz Que Ilumina Todo Homem',
  'A universalidade da luz divina.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Cristo é a verdadeira luz que ilumina a todo homem.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A luz de Cristo ilumina a todo homem que vem ao mundo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Jo 8:12', '1 Jo 1:5-7']
);

add('jo', 5, 24, 'Quem Ouve a Minha Palavra e Crê',
  'A vida eterna pela fé na Palavra.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A vida eterna é pela fé na Palavra de Cristo.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O crente na Palavra de Cristo já tem a vida eterna.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Jo 3:16', 'Jo 6:47', '1 Jo 5:11-13']
);

add('jo', 17, 3, 'A Vida Eterna e Que Te Conheçam',
  'O conhecimento de Deus como essência da vida eterna.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A vida eterna é conhecer a Deus e a Jesus Cristo.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O conhecimento de Deus é a essência da vida eterna.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Mt 11:27', '1 Jo 5:20']
);

// ====================================================================
// ATOS (mais 2)
// ====================================================================

add('at', 1, 8, 'Recebereis Poder Quando O Espirito Santo Descer',
  'A promessa do Espirito Santo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O poder do Espirito Santo e para testemunho.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A promessa e para todos os discípulos.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Lc 24:49', 'At 2:1-4']
);

add('at', 5, 31, 'A Deus exaltou pela Sua Destra Para Ser Principe e Salvador',
  'A exaltação de Cristo como Salvador.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus exaltou Jesus para ser Príncipe e Salvador.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Cristo é o Príncipe da vida e o Salvador dos homens.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Fp 2:9-11', 'Hb 1:3']
);

// ====================================================================
// ROMANOS (mais 3)
// ====================================================================

add('rm', 6, 23, 'O Salario do Pecado e a Morte, Mas o Dom de Deus',
  'O contraste entre pecado e graça.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'O pecado paga a morte, mas Deus dá a vida eterna.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O dom de Deus é a vida eterna em Cristo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Jo 3:16', 'Ef 2:8-9', '2 Tm 1:9-10']
);

add('rm', 8, 31, 'Deus e Por Nos, Quem Sera Contra Nos?',
  'A segurança do crente na soberania de Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Se Deus é por nós, ninguém pode ser contra nós.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Nenhum inimigo pode vencer quando Deus é nosso defensor.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Is 50:8-9', 'Sl 27:1']
);

add('rm', 10, 13, 'Todo Aquela Que Invocar O Nome do Senho Sera Salvo',
  'A universalidade da salvação pela invocação.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Todos os que invocam o nome do Senhor serão salvos.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A salvação está disponível a todos que chamam pelo nome do Senhor.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Jl 2:32', 'At 2:21']
);

// ====================================================================
// 1 CORINTIOS (mais 2)
// ====================================================================

add('1co', 3, 11, 'Ninguem Pode Colocar Outro Fundamento',
  'Cristo como único fundamento da Igreja.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Cristo é o único fundamento da Igreja.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Nenhum outro fundamento pode ser colocado além de Cristo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Ef 2:20', '1 Pd 2:4-8']
);

add('1co', 15, 57, 'Mas Graças Sejam Dadas a Deus',
  'A vitória sobre a morte por meio de Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus nos dá a vitória por meio de Cristo.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A vitória sobre a morte é de Cristo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['2 Co 2:14', '1 Ts 4:13-14']
);

// ====================================================================
// 2 CORINTIOS (mais 2)
// ====================================================================

add('2co', 4, 6, 'Deus Que Mandou a Luz Brilhar das Trevas',
  'A criação espiritual pela palavra de Deus.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Deus brilha em nossos corações para conhecermos Sua glória.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus ilumina o coração para o conhecimento da Sua glória.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Gn 1:3', 'Jo 1:4-5', '2 Pd 1:19']
);

add('2co', 5, 21, 'Aquele Que Nao Conheceu Pecado',
  'A imputação da pecado de Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Cristo, que não conheceu pecado, foi feito pecado por nós.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Cristo tomou sobre Si o pecado do mundo.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Is 53:5-6', '1 Pd 2:24', 'Gl 3:13']
);

// ====================================================================
// GALATAS (mais 2)
// ====================================================================

add('gl', 3, 13, 'Cristo Nos Resgatou Da Maldicao Da Lei',
  'A redenção da maldição da Lei por Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Cristo nos resgatou da maldição da Lei fazendo-se maldição por nós.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Cristo suportou a maldição que nós merecíamos.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Rm 8:3', '2 Co 5:21', '1 Pd 2:24']
);

add('gl', 6, 14, 'Nao Que Eu Me Glorie, Senao na Cruz',
  'A cruz como motivo de glória cristã.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Paulo gloria-se na cruz de Cristo, não nas realizações humanas.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A cruz é o centro da fé cristã e motivo de glória.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['1 Co 2:2', 'Fl 3:7-10']
);

// ====================================================================
// EFESEOS (mais 2)
// ====================================================================

add('ef', 2, 8-9, 'Pela Graca Sois Salvos Pela Fe',
  'A salvação como dom da graça.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A salvação é dom de Deus, não resultado de obras.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A salvação é por graça, por meio da fé, não por obras.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Rm 3:24', 'Tt 3:5', '1 Pd 1:10-12']
);

add('ef', 6, 10, 'Fortalecei-vos No Senhor',
  'A força divina para a batalha espiritual.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A força vem do Senhor, não de nós mesmos.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Devemos nos fortalecer no Senhor.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Fp 4:13', '2 Tm 1:7']
);

// ====================================================================
// FILIPENSES (mais 2)
// ====================================================================

add('fp', 2, 5-6, 'Que Embora Existindo Em Forma de Deus',
  'A preexistencia de Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Cristo, embora em forma de Deus, não se agarrou aos seus direitos divinos.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Cristo era Deus antes de ser homem.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Jo 1:1-3', 'Cl 1:15-17']
);

add('fp', 4, 6-7, 'Nao Vos inquieteis por Nada',
  'A paz de Deus que excede todo entendimento.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A oração com ação de graças traz a paz de Deus.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A paz de Deus guarda o coração e a mente do crente.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Mt 6:25-34', 'Is 26:3']
);

// ====================================================================
// HEBREUS (mais 2)
// ====================================================================

add('hb', 2, 9, 'Que Pela Graca de Deus Provasse a Morte Por Todos',
  'A morte substitutiva de Cristo pela graça.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Cristo pela graça de Deus provou a morte por todos.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A morte de Cristo é pela graça de Deus para todos.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Is 53:10-12', '2 Co 5:14-15']
);

add('hb', 13, 8, 'Jesus Cristo Ontem e Hoje e o Mesmo',
  'A imutabilidade de Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Cristo é o mesmo ontem, hoje e sempre.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A imutabilidade de Cristo é garantia da nossa salvação.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Is 40:8', 'Sl 102:25-27', 'Mt 24:35']
);

// ====================================================================
// TIAGO (mais 2)
// ====================================================================

add('tg', 1, 17, 'Toda boa Dávida e Todo Dons Perfeito Descem do Alto',
  'A origem divina de toda bondade.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Toda boa dávida vem de Deus, o pai das luzes.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus é a fonte de toda bondade.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Nm 23:19', '1 Jo 1:5']
);

add('tg', 2, 13, 'O Misericordioso Sera Julgado Sem Misericordia',
  'O julgamento do misericordioso.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A misericórdia que demonstramos será a medida do julgamento.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Quem não tem misericórdia não receberá misericórdia.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Mt 5:7', 'Mt 6:14-15', 'Mc 11:25-26']
);

// ====================================================================
// 1 PEDRO (mais 2)
// ====================================================================

add('1pe', 1, 8-9, 'Em Quem Crês Sem O Ver, Ainda Amando-O',
  'A fé sem ver e a alegria indizível.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'A fé é amar e crer sem ver, com alegria indizível.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A fé que não vê é mais preciosa do que o ouro provado.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Jo 20:29', '2 Co 5:7']
);

add('1pe', 3, 18, 'Cristo Uma Vez Morreu Pelos Pecados',
  'O sacrifício único e suficiente de Cristo.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Cristo morreu uma vez pelos pecados, o justo pelos injustos.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'O sacrifício de Cristo é único e suficiente.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Hb 9:26-28', 'Hb 10:10-14', '2 Co 5:21']
);

// ====================================================================
// APOCALIPSE (mais 2)
// ====================================================================

add('ap', 1, 17-18, 'Eu Sou o Primeiro e o Ultimo',
  'A declaração de Cristo como Senhor da morte e da vida.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Cristo é o primeiro e o último; Ele tem as chaves da morte e do inferno.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'Cristo é o Senhor da morte e da vida.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Is 44:6', 'Jo 11:25-26']
);

add('ap', 22, 5, 'Nao Havera Mais Noite',
  'A eternidade sem trevas.',
  [
    { teologo: 'Albert Barnes', periodo: 'moderno', tradicao: 'evangelical', texto: 'Na nova criação não haverá trevas, pois Deus é a luz.', obra: 'Barnes Notes on the New Testament', ano: 1834 },
    { teologo: 'John Gill', periodo: 'moderno', tradicao: 'bautista', texto: 'A eternidade será sem trevas nem noite.', obra: 'Exposition of the Entire Bible', ano: 1763 },
  ],
  ['Is 60:19-20', 'Jo 1:4-5', 'Ap 21:23']
);

// ====================================================================
// EXPORTACAO FINAL
// ====================================================================

export default comentariosAcademicosExpandidos;
export { comentariosAcademicosExpandidos };
