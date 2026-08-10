export interface ReferenciaCruzada {
  referencia: string;
  descricao: string;
}

export interface LeituraAdicional {
  titulo: string;
  tipo: 'estudo' | 'artigo' | 'livro';
  descricao: string;
}

export interface ContextoHistorico {
  periodo: string;
  evento: string;
  descricao: string;
}

export interface EstudoTeologico {
  id: string;
  titulo: string;
  categoria: string;
  subcategoria?: string;
  conteudo: string[];
  versicosChave: string[];
  tags: string[];
  fontes: string[];
  referenciasCruzadas?: ReferenciaCruzada[];
  leituraAdicional?: LeituraAdicional[];
  aplicacaoPratica?: string;
  contextoHistorico?: ContextoHistorico;
}

export const estudosTeologicosNovos: EstudoTeologico[] = [
  // ════════════════════════════════════════════════════════════════
  // 1. THEOSIS (DIVINIZACAO) — Teologia Oriental
  // ════════════════════════════════════════════════════════════════

  {
    id: 'neo-001',
    titulo: 'Theosis — A Divinizacao do Ser Humano',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Soteriologia Oriental',
    conteudo: [
      'A theosis (divinizacao) e o ensino central da teologia Ortodoxa Oriental de que o ser humano e chamado a participar da natureza divina. Nao se trata de o homem se tornar Deus por essencia, mas de uma uniao hipostatica — o homem continua criado, mas participa da vida divina por graça.',
      'O axioma fundamental de Atanasio: "Deus se fez homem para que os homens se tornassem deuses" (De Incarnatione, 54). Nao e panteismo, mas a doutrina de que a salvacao e transformacao ontologica, nao apenas perdao judicial.',
      'Gregorio de Nissa desenvolveu a ideia de epektase — progresso infinito na semelhanca com Deus. O ser humano nunca atinge a perfeicao absoluta, mas eternamente cresce na participacao de sua vida.',
      'A theosis se distingue da justificacao ocidental: nao e apenas forensic (declaracao de justica), mas real (transformacao da natureza). O Oriente fala de "natureszas" (physis) enquanto o Ocidente fala de "pessoas" e "relacao juridica".',
      'A praxis da theosis inclui oracao continua, sacramentos (especialmente a Eucaristia), ascese, e participacao na liturgia. A vida monastica e vista como caminho privilegiado, mas nao exclusivo.',
      'A theosis nao anula a graça — e ela mesma o fruto da graça divina agindo na liberdade humana. A cooperacao sinergica (synergeia) entre graça e liberdade e fundamental.'
    ],
    versicosChave: ['2 Pedro 1:4', 'João 17:21-23', '1 João 3:2', 'Romanos 8:17', 'Efésios 1:4-5'],
    tags: ['theosis', 'divinização', 'deificação', 'participação da natureza divina', 'teologia oriental', 'patrística'],
    fontes: [
      'Atanásio, De Incarnatione, 54.3',
      'Gregório de Nissa, De Vita Moysis',
      'Vladimir Lossky, The Mystical Theology of the Eastern Church (1944)',
      'John Meyendorff, Byzantine Theology (1974)',
      'Christos Yannaras, Elements of Christian Culture (1991)',
      'Paul Blowers, Maximus the Confessor (2014)'
    ],
    referenciasCruzadas: [
      { referencia: '2 Pedro 1:4', descricao: 'Participar da natureza divina' },
      { referencia: 'João 17:21-23', descricao: 'Unidade dos crentes com Deus e entre si' },
      { referencia: '1 João 3:2', descricao: 'Seremos semelhantes a Ele' },
      { referencia: 'Romanos 8:17', descricao: 'Herdeiros de Deus e co-herdeiros com Cristo' }
    ],
    leituraAdicional: [
      { titulo: 'The Mystical Theology of the Eastern Church', tipo: 'livro', descricao: 'A theosis como centro da teologia ortodoxa' },
      { titulo: 'Maximus the Confessor, Blowers', tipo: 'livro', descricao: 'Sistematizacao da theosis no sec. VII' }
    ],
    aplicacaoPratica: 'Pratique a oracao do coracao para cultivar a presenca de Deus. Participe regularmente da Eucaristia como meio de theosis.',
    contextoHistorico: { periodo: 'Sec. II-VIII d.C.', evento: 'Desenvolvimento patristico da theosis', descricao: 'Ireneu (sec. II) ja falava de deificacao. Atanasio e os Capadocios aprofundaram. Maximus e Palamas sistematizaram.' }
  },

  {
    id: 'neo-002',
    titulo: 'Synergeia — A Cooperacao entre Graca e Liberdade',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Soteriologia Oriental',
    conteudo: [
      'A synergeia (cooperacao) e o principio de que a salvacao envolve cooperacao ativa entre a graça divina e a liberdade humana.',
      'A graça sempre precede e inicia — o homem nao da o primeiro passo sozinho. Mas Deus respeita a liberdade criada e nao forca a resposta.',
      'O contraste com o calvinismo: o reformado fala de graça irresistivel; o oriental fala de graça que pode ser resistida.',
      'Gregorio Palamas distinguiu entre a essencia de Deus (inacessivel) e as energias divinas (acessiveis). O homem participa das energias, nao da essencia.',
      'A praxis inclui: oracao, ascese, sacramentos e caridade — cooperacao com a graça que ja esta agindo.'
    ],
    versicosChave: ['Filipenses 2:12-13', 'Romanos 9:16', '1 Coríntios 15:10', 'Efésios 2:8-10'],
    tags: ['synergeia', 'cooperacao', 'graca', 'liberdade', 'Palamas', 'energias divinas'],
    fontes: [
      'Gregório Palamas, Triades, I.3.18',
      'Atanásio, De Incarnatione, 54',
      'John Meyendorff, Byzantine Theology (1974)',
      'Georgios Florovsky, Ways of Russian Theology (1937)'
    ],
    referenciasCruzadas: [
      { referencia: 'Filipenses 2:12-13', descricao: 'Trabalhai na vossa salvacao — Deus opera em vos' },
      { referencia: 'Romanos 9:16', descricao: 'Nao depende do que quer, mas de Deus' },
      { referencia: '1 Coríntios 15:10', descricao: 'Graca de Deus nao foi va — mas trabalhei mais' }
    ],
    leituraAdicional: [
      { titulo: 'Byzantine Theology, Meyendorff', tipo: 'livro', descricao: 'Synergeia como principio fundamental' }
    ],
    aplicacaoPratica: 'Reconheca que a salvacao e cooperacao. Cultive a oracao como ato de cooperar com a graça.',
    contextoHistorico: { periodo: 'Sec. IV-XIV d.C.', evento: 'Resposta oriental a controversia pelagiana', descricao: 'O Oriente manteve equilibrio entre graça e liberdade, articulado por Maximo e Palamas.' }
  },

  {
    id: 'neo-003',
    titulo: 'Teologia do Covenant — Aliancas Biblicas',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Teologia Federal',
    conteudo: [
      'A teologia do covenant e o arcabouco interpretativo que ve toda a Escritura como historia de aliancas entre Deus e a humanidade.',
      'A alianca abraamica (Genesis 12, 15, 17) e incondicional em suas promessas. Paulo a usa para argumentar pela justificacao pela fe (Romanos 4, Galatas 3).',
      'A alianca sinaitica (Exodo 19-24) e condicional: "Se vos obedecees... sereis meu povo." Nao contradiz a graça.',
      'A nova alianca (Jeremias 31:31-34) e a consumacao: Deus promete escrever sua lei nos coracoes e perdoar pecados completamente.',
      'A teologia federal classica (Cocceio, Ames, Turretin) distinguiu entre alianca das obras e alianca da graça.'
    ],
    versicosChave: ['Genesis 12:1-3', 'Jeremias 31:31-34', 'Hebreus 8:6-13', 'Lucas 22:20'],
    tags: ['alianca', 'covenant', 'teologia federal', 'alianca da graça', 'alianca das obras', 'nova alianca'],
    fontes: [
      'Johannes Cocceio, Summa Doctrinae de Foedere (1648)',
      'Herman Witsius, The Economy of the Covenants (1685)',
      'Geerhardus Vos, Biblical Theology (1948)',
      'O. Palmer Robertson, The Christ of the Covenants (1980)'
    ],
    referenciasCruzadas: [
      { referencia: 'Genesis 15:6', descricao: 'Abraao creu e lhe foi imputada justica' },
      { referencia: 'Hebreus 8:8-12', descricao: 'Nova alianca superior — transformacao interior' },
      { referencia: 'Lucas 22:20', descricao: 'Este calice e a nova alianca no meu sangue' }
    ],
    leituraAdicional: [
      { titulo: 'The Christ of the Covenants, Robertson', tipo: 'livro', descricao: 'Cristo como centro de todas as aliancas' }
    ],
    aplicacaoPratica: 'Entenda sua fe como parte de um plano covenantal. A nova alianca em Cristo nao depende de sua obediencia perfeita.',
    contextoHistorico: { periodo: 'Sec. XVI-XVII d.C.', evento: 'Sistematizacao da teologia federal', descricao: 'Cocceio (1648) sistematizou. Witsius expandiu. Westminster Confession articulou.' }
  },

  {
    id: 'neo-004',
    titulo: 'O Reino de Deus — Tema Central do NT',
    categoria: 'Teologia Bíblica',
    subcategoria: 'Escatologia',
    conteudo: [
      'O Reino de Deus e o tema central do ensino de Jesus — mencionado mais de 120 vezes nos Evangelhos.',
      'A natureza do Reino e paradoxal: ja e ainda nao. Jesus diz "o Reino esta entre vos" (Lucas 17:21) — presente na sua pessoa. Mas tambem reza "venha o teu Reino" (Mateus 6:10) — ainda futuro.',
      'O Reino nao e territorio politico, mas dominio soberano de Deus exercido na historia. A crucificacao nao e derrota, mas vitoria do Reino.',
      'A parabola do grao de mostarda (Mateus 13:31-32) ilustra o crescimento organico do Reino.',
      'O Reino se consuma no retorno de Cristo, quando "entregara o Reino ao Deus Pai" (1 Corintios 15:24).'
    ],
    versicosChave: ['Mateus 4:17', 'Marcos 1:15', 'Lucas 17:21', 'Mateus 6:10', '1 Coríntios 15:24'],
    tags: ['reino de Deus', 'reino dos ceus', 'ja e ainda nao', 'escatologia', 'paradoxo'],
    fontes: [
      'George Eldon Ladd, A Theology of the New Testament (1974)',
      'N.T. Wright, Jesus and the Victory of God (1996)',
      'Oscar Cullmann, Christ and Time (1946)',
      'Richard Hays, The Moral Vision of the New Testament (1996)'
    ],
    referenciasCruzadas: [
      { referencia: 'Daniel 2:44', descricao: 'Deus erguera um reino que nao sera destruido' },
      { referencia: 'Isaias 9:6-7', descricao: 'Rei messianico — sem fim' },
      { referencia: 'Mateus 13:31-32', descricao: 'Grao de mostarda — crescimento organico' }
    ],
    leituraAdicional: [
      { titulo: 'A Theology of the New Testament, Ladd', tipo: 'livro', descricao: 'O ja e ainda nao do Reino' }
    ],
    aplicacaoPratica: 'Viva no ja e ainda nao: celebre vitórias presentes, mas nao desanime com o mal que persiste.',
    contextoHistorico: { periodo: 'Ministerio de Jesus (~30 d.C.)', evento: 'Anuncio messianico do Reino', descricao: 'Jesus herda o conceito do AT e o transforma: presente nele, mas ainda nao consumado.' }
  },

  {
    id: 'neo-005',
    titulo: 'Escatologia Inaugurada — O Ja e Ainda Nao',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Escatologia',
    conteudo: [
      'A escatologia inaugurada: os ultimos tempos comecaram com a ressurreicao de Cristo, mas nao se consumaram.',
      'O ja: Cristo ressuscitou, o Espirito foi derramado, o evangelho vai as nacoes. O Reino esta presente em poder.',
      'O ainda nao: a morte reina, o mal persiste, a criacao geme. A ressurreicao corporal final ainda nao ocorreu.',
      'A etica cristã e moldada por essa tensao: nao escapamos do mundo nem nos identificamos com ele.',
      'A escatologia inaugurada influencia a missao: nao construimos o Reino, mas testificamos dele.'
    ],
    versicosChave: ['Hebreus 6:5', 'Romanos 8:18-25', '1 Coríntios 15:20-26', 'Efésios 1:20-23'],
    tags: ['escatologia inaugurada', 'ja e ainda nao', 'tensao escatologica', 'consumacao'],
    fontes: [
      'George Eldon Ladd, The Presence of the Future (1974)',
      'Oscar Cullmann, Christ and Time (1946)',
      'Anthony Hoekema, The Bible and the Future (1979)',
      'N.T. Wright, Surprised by Hope (2008)'
    ],
    referenciasCruzadas: [
      { referencia: 'Romanos 8:18-25', descricao: 'A criacao geme esperando a redencao' },
      { referencia: '1 Coríntios 15:20-26', descricao: 'Cristo primeiro, depois os que sao dele' },
      { referencia: 'Efésios 1:20-23', descricao: 'Deus colocou Cristo a direita' }
    ],
    leituraAdicional: [
      { titulo: 'The Presence of the Future, Ladd', tipo: 'livro', descricao: 'Estudo classico da escatologia inaugurada' },
      { titulo: 'Surprised by Hope, Wright', tipo: 'livro', descricao: 'Corrige equivocos sobre escatologia' }
    ],
    aplicacaoPratica: 'Nao viva como se tudo estivesse perdido nem como se tudo estivesse resolvido. O Reino ja venceu, mas a batalha continua.',
    contextoHistorico: { periodo: 'Sec. XX d.C.', evento: 'Desenvolvimento da escatologia inaugurada', descricao: 'Ladd e Cullmann articularam a tensao. Wright popularizou.' }
  },

  {
    id: 'neo-006',
    titulo: 'A Nova Perspectiva sobre Paulo',
    categoria: 'Exegese do Novo Testamento',
    subcategoria: 'Paulinismo',
    conteudo: [
      'A NPP reinterpretou a doutrina paulina da justificacao. Principais: E.P. Sanders, James D.G. Dunn e N.T. Wright.',
      'Sanders (1977): o judaismo nao era legalismo, mas "covenantal nomism": obediencia mantem na alianca, nao entra por ela.',
      'Dunn: "obras da lei" nao sao boas em geral, mas marcadores de identidade judaica (circuncisao, pureza, calendario).',
      'Wright: a justificacao nao e principalmente sobre individuos, mas sobre como Deus inclui gentios no povo pela fe.',
      'A NPP nao nega salvacao pela fe, mas muda o quadro: o problema nao era "como ser salvo?" mas "como Deus inclui gentios?"',
      'A critica reformada argumenta que a NPP minimiza a dimensao individual da salvacao.'
    ],
    versicosChave: ['Gálatas 2:16', 'Romanos 3:21-26', 'Gálatas 2:11-14', 'Efésios 2:8-9'],
    tags: ['nova perspectiva', 'Sanders', 'Dunn', 'Wright', 'obras da lei', 'justificacao', 'covenantal nomism'],
    fontes: [
      'E.P. Sanders, Paul and Palestinian Judaism (1977)',
      'James D.G. Dunn, The Theology of Paul the Apostle (1998)',
      'N.T. Wright, The Climax of the Covenant (1991)',
      'N.T. Wright, Justification (2009)',
      'Michael Bird, The Saving Righteousness of God (2007)'
    ],
    referenciasCruzadas: [
      { referencia: 'Gálatas 2:16', descricao: 'Nenhum homem e justificado por obras da lei' },
      { referencia: 'Romanos 3:21-26', descricao: 'Justica de Deus revelada pela fe em Cristo' },
      { referencia: 'Efésios 2:8-9', descricao: 'Salvos pela graça pela fe, nao por obras' }
    ],
    leituraAdicional: [
      { titulo: 'Paul and Palestinian Judaism, Sanders', tipo: 'livro', descricao: 'O livro que iniciou a NPP' },
      { titulo: 'Justification, Wright', tipo: 'livro', descricao: 'Wright defende sua reinterpretacao' }
    ],
    aplicacaoPratica: 'Reflita sobre como entende a justificacao. Estude Galatas e Romanos com atencao ao contexto judaico.',
    contextoHistorico: { periodo: '1977-presente', evento: 'NPP e o debate sobre justificacao', descricao: 'Sanders redefiniu o judaismo. Dunn cunhou o termo. Wright expandiu.' }
  },

  {
    id: 'neo-007',
    titulo: 'Open Theism — O Deus que Arrisca',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'O Teismo Aberto: Deus, por amor a liberdade criada, escolheu nao saber certas coisas do futuro — decisoes livres de criaturas racionais.',
      'Pinnock, Sanders, Rice: o livre-arbitrio genuino exige que escolhas futuras sejam abertas — nem mesmo Deus as conhece como certas.',
      'Isso nao significa falta de poder ou sabedoria. Ele e omnisciente sobre tudo cognoscivel. Decisoes futuras livres nao sao objetos de conhecimento certo.',
      'Rejeita Determinismo e Arminianismo classico. E uma "terceira via" que preserva liberdade humana mais radical.',
      'Implicacoes: Deus pode surpreender-se, mudar de planos (Genesis 6:6), e realmente arrisca na criacao.',
      'Critica reformada: diminui soberania divina. Critica arminiana: Deus pode dar liberdade sem abrir mao do conhecimento perfeito.'
    ],
    versicosChave: ['Genesis 6:6-7', '1 Samuel 15:10-11', 'Jonas 3:10', 'Jeremias 18:7-10'],
    tags: ['teismo aberto', 'open theism', 'livre-arbitrio', 'futuro aberto', 'Pinnock', 'soberania'],
    fontes: [
      'Clark Pinnock, The Openness of God (1994)',
      'Richard Rice, The Openness of God (1980)',
      'Gregory Boyd, God of the Possible (2000)',
      'William Hasker, God, Time, and Knowledge (1989)'
    ],
    referenciasCruzadas: [
      { referencia: 'Genesis 6:6-7', descricao: 'O Senhor se arrependeu — mudanca divina' },
      { referencia: '1 Samuel 15:10-11', descricao: 'Arrependi-me de haver feito rei a Saul' },
      { referencia: 'Jonas 3:10', descricao: 'Deus se arrependeu do mal que dissera' },
      { referencia: 'Jeremias 18:7-10', descricao: 'Se uma nacao fizer o mal, me arrependerei' }
    ],
    leituraAdicional: [
      { titulo: 'The Openness of God, Pinnock et al.', tipo: 'livro', descricao: 'Manifesto do teismo aberto' },
      { titulo: 'God of the Possible, Boyd', tipo: 'livro', descricao: 'Defesa popular com exemplos biblicos' }
    ],
    aplicacaoPratica: 'O teismo aberto convida relacao autentica com Deus. Suas escolhas importam.',
    contextoHistorico: { periodo: '1980-presente', evento: 'Emergencia do teismo aberto', descricao: 'Rice (1980) publicou. Pinnock (1994) manifesto. Boyd popularizou.' }
  },

  {
    id: 'neo-008',
    titulo: 'Compatibilismo vs. Libertarismo — Livre-Arbítrio',
    categoria: 'Filosofia da Religião',
    subcategoria: 'Livre-Arbítrio',
    conteudo: [
      'O libertarismo: liberdade genuina requer alternativas abertas — poderia ter feito diferente nas mesmas circunstancias.',
      'O compatibilismo (Hobbes, Hume, Edwards, Sproul): liberdade e agir conforme seus desejos, mesmo que determinados por causas anteriores.',
      'Libertarios (Plantinga, Craig): o compatibilismo e ilusao — se desejos sao determinados, nao poderia ter feito diferente.',
      'A Biblia parece pressupor ambos: Proverbios 21:1 (soberania) e Deuteronomio 30:19 (alternativa genuina).',
      'Calvinismo e compatibilista; arminianismo e libertario. Determinismo Hard nega liberdade de todos.',
      'Libertarismo moderado (Plantinga) mantem genuinas alternativas, preservando responsabilidade moral.'
    ],
    versicosChave: ['Deuteronômio 30:19', 'Provérbios 21:1', 'Romanos 9:16-22', 'Josué 24:15'],
    tags: ['compatibilismo', 'libertarismo', 'livre-arbitrio', 'determinismo', 'soberania', 'responsabilidade'],
    fontes: [
      'Alvin Plantinga, God, Freedom, and Evil (1974)',
      'Jonathan Edwards, Freedom of the Will (1754)',
      'R. Sproul, Willing to Believe (1997)',
      'William Lane Craig, The Only Wise God (1999)'
    ],
    referenciasCruzadas: [
      { referencia: 'Romanos 9:16-22', descricao: 'Depende de Deus que tem misericordia' },
      { referencia: 'Deuteronômio 30:19', descricao: 'Escolhe a vida — alternativa genuina' },
      { referencia: 'Josué 24:15', descricao: 'Escolhei hoje a quem servireis' }
    ],
    leituraAdicional: [
      { titulo: 'God, Freedom, and Evil, Plantinga', tipo: 'livro', descricao: 'Defesa libertaria' },
      { titulo: 'Freedom of the Will, Edwards', tipo: 'livro', descricao: 'Defesa classica do compatibilismo' }
    ],
    aplicacaoPratica: 'Voce realmente poderia ter feito diferente? A Biblia mantem tensao — viva o paradoxo.',
    contextoHistorico: { periodo: 'Sec. XVII-presente', evento: 'Debate entre Arminio e os Reformados', descricao: 'Arminio desafiou. Edwards respondeu. Debate continua.' }
  },

  {
    id: 'neo-009',
    titulo: 'Calcedonia — A Formula Cristologica',
    categoria: 'Historia da Igreja',
    subcategoria: 'Concilios Ecumenicos',
    conteudo: [
      'Concilio de Calcedonia (451): Cristo e uma pessoa em duas naturezas — divina e humana — sem confusao, sem mudanca, sem divisao, sem separacao.',
      'Rejeita Apolinarianismo (sem mente humana), Nestorianismo (duas pessoas) e Eutiquianismo (uma natureza composta).',
      '"Sem confusao" rejeita monofisismo. "Sem mudanca" rejeita absorcao. "Sem divisao" rejeita duas pessoas. "Sem separacao" rejeita separacao.',
      'Preserva plena humanidade (sofreu, morreu) e plena divindade (Deus de verdade). O que nao e assumido nao e redimido.',
      'Tradicao Oriental rejeitou Calcedonia, adotando Miaphisitism. Dialogo moderno mostra convergencia.',
      'Implicacoes: Jesus e modelo de vida humana e objeto de adoracao divina.'
    ],
    versicosChave: ['João 1:14', 'Colossenses 2:9', 'Filipenses 2:6-8', 'Hebreus 1:3'],
    tags: ['Calcedonia', 'cristologia', 'duas naturezas', 'monofisismo', 'nestorianismo', 'miaphisitismo'],
    fontes: [
      'Richard Price and Michael Gaddis, The Acts of Chalcedon (2005)',
      'Anatolios, Retrieving Nicaea (2011)',
      'Jaroslav Pelikan, The Shape of Death (1961)'
    ],
    referenciasCruzadas: [
      { referencia: 'João 1:14', descricao: 'O Logos se fez carne' },
      { referencia: 'Colossenses 2:9', descricao: 'Nele habita toda a plenitude da divindade' },
      { referencia: 'Filipenses 2:6-8', descricao: 'Tendo forma de Deus, se esvaziou' }
    ],
    leituraAdicional: [
      { titulo: 'Retrieving Nicaea, Anatolios', tipo: 'livro', descricao: 'Analise das definicoes cristologicas' }
    ],
    aplicacaoPratica: 'Calcedonia preserva o evangelho: Deus assumiu humanidade para nos salvar.',
    contextoHistorico: { periodo: '451 d.C.', evento: 'Concilio de Calcedonia', descricao: 'Convocado para resolver controversia eutiquiana. Formula se tornou padrao.' }
  },

  {
    id: 'neo-010',
    titulo: 'Nestorianismo e Miafisitismo',
    categoria: 'Historia da Igreja',
    subcategoria: 'Cristologias Hereeticas',
    conteudo: [
      'Nestorio: Cristo tem duas pessoas — divina e humana. Maria era "Cristotoce", nao "Teotoce".',
      'Cirilo de Alexandria: uniao e hypostatica — uma pessoa. Maria e Teotoce porque a pessoa gerada e Deus.',
      'Concilio de Efeso (431) condenou Nestorio. Igreja Assiria aceitou e se separou.',
      'Eutiquianismo/Monofisismo: uma natureza divina absorveu a humana.',
      'Tradicao Oriental (copta, etiope): miaphisitismo — natureza composta, nao misturada.',
      'Dialogo moderno (1990) mostrou convergencia significativa.'
    ],
    versicosChave: ['João 1:14', 'Hebreus 2:14-18', '1 Timóteo 2:5', 'Romanos 1:3-4'],
    tags: ['nestorianismo', 'miafisitismo', 'duas naturezas', 'copta', 'Efeso', 'Teotoce'],
    fontes: [
      'Friedrich Loofs, Nestorius and His Place (1914)',
      'Richard Price, The Council of Ephesus (1997)',
      'W.H.C. Frend, The Rise of the Monophysite Movement (1972)'
    ],
    referenciasCruzadas: [
      { referencia: 'Hebreus 2:14-18', descricao: 'Cristo participou da carne — plena humanidade' },
      { referencia: '1 Timóteo 2:5', descricao: 'Um mediador — homem Cristo Jesus' },
      { referencia: '1 João 4:2-3', descricao: 'Jesus veio em carne — confissao ortodoxa' }
    ],
    leituraAdicional: [
      { titulo: 'St. Cyril of Alexandria, McGuckin', tipo: 'livro', descricao: 'Cirilo articulou cristologia contra Nestorio' }
    ],
    aplicacaoPratica: 'Pense em Jesus como uma pessoa, nao duas. A cruz e Deus sofrendo como homem.',
    contextoHistorico: { periodo: '428-451 d.C.', evento: 'Controversias cristologicas', descricao: 'Nestorio condenado em Efeso. Eutiques em Calcedonia. Igrejas orientais mantiveram miafisitismo.' }
  },

  {
    id: 'neo-011',
    titulo: 'Pneumatologia — Pessoa e Obra do Espirito Santo',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Pneumatologia',
    conteudo: [
      'O Espirito Santo nao e uma forca impessoal, mas pessoa divina que pensa, sente e age.',
      'Pessoa do Espirito: pode ser mentido (Atos 5:3), tem vontade (1 Corintios 12:11), intercede (Romanos 8:26), e entristecido (Efesios 4:30).',
      'Obra na regeneracao: faz nascer de novo (Joao 3:5-6), da vida nova (Efesios 2:5), sela (Efesios 1:13).',
      'Obra na santificacao: produz frutos (Galatas 5:22-23), da dons (1 Corintios 12:4-11), guia em toda a verdade (Joao 16:13).',
      'Pentecostal: batismo no Espirito como experiencia posterior. Reformada: simultaneo a regeneracao.',
      'Unidade do corpo de Cristo e obra do Espirito: "Um so Espirito, um so corpo" (Efesios 4:4).'
    ],
    versicosChave: ['João 14:26', 'Atos 1:8', '1 Coríntios 12:4-11', 'Galatas 5:22-23'],
    tags: ['Espirito Santo', 'pneumatologia', 'batismo no Espirito', 'dons', 'frutos', 'regeneracao'],
    fontes: [
      'Gordon Fee, God\'s Empowering Presence (1994)',
      'James Dunn, Jesus and the Spirit (1970)',
      'Veli-Matti Karkkainen, Pneumatology (2002)',
      'Robert Menzies, Spirit and Power (2000)'
    ],
    referenciasCruzadas: [
      { referencia: 'João 14:26', descricao: 'O Espirito ensinara e recordara' },
      { referencia: 'Atos 1:8', descricao: 'Recebereis poder quando o Espirito vier' },
      { referencia: 'Romanos 8:26', descricao: 'Espirito intercede com gemidos' }
    ],
    leituraAdicional: [
      { titulo: 'God\'s Empowering Presence, Fee', tipo: 'livro', descricao: 'Estudo exaustivo do Espirito no NT' },
      { titulo: 'Pneumatology, Karkkainen', tipo: 'livro', descricao: 'Survey global' }
    ],
    aplicacaoPratica: 'Cultive a presenca do Espirito pela oracao e obediencia. Os frutos sao evidencia de vida pneumatica.',
    contextoHistorico: { periodo: 'Sec. II-presente', evento: 'Desenvolvimento da pneumatologia', descricao: 'Atanasio e Capadocios articularam divindade do Espirito. Credo niceno adicionou.' }
  },

  {
    id: 'neo-012',
    titulo: 'Dons Espirituais — Continuidade ou Descontinuidade?',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Pneumatologia',
    conteudo: [
      'Debate: cessacionismo (dons milagrosos cessaram) vs. continuismo (dons continuam).',
      'Cessacionismo (Warfield): dons eram sinais apostolicos. Com canao fechado, cessaram. Argumento teologico.',
      'Continuismo (Fee, Wimber): nao ha passagem ensinando cessar. Paulo fala como atuais.',
      'Moderado (Grudem): dons de revelacao podem ter cessado; dons de servico continuam.',
      'Linguas: glossolalia (oracao privada) ou lingua estranha? Continuismo usa como oracao privada.',
      'Terceira via: dons existem, mas avaliar pela Escritura (1 Tessalonicenses 5:19-21).'
    ],
    versicosChave: ['1 Coríntios 12:4-11', '1 Coríntios 13:8-10', 'Efésios 4:11-13', 'Hebreus 2:3-4'],
    tags: ['dons espirituais', 'cessacionismo', 'continuismo', 'carismatico', 'linguas', 'profecia'],
    fontes: [
      'B.B. Warfield, Counterfeit Miracles (1918)',
      'Gordon Fee, God\'s Empowering Presence (1994)',
      'Wayne Grudem, The Gift of Prophecy (1988)',
      'John Wimber, Power Evangelism (1986)'
    ],
    referenciasCruzadas: [
      { referencia: '1 Coríntios 13:8-10', descricao: 'Quando vier o perfeito, o parcial cessara' },
      { referencia: 'Efésios 4:11-13', descricao: 'Ate que cheguemos a medida de Cristo' },
      { referencia: '1 Tessalonicenses 5:19-21', descricao: 'Nao extingais o Espirito, examinai tudo' }
    ],
    leituraAdicional: [
      { titulo: 'Counterfeit Miracles, Warfield', tipo: 'livro', descricao: 'Defesa cessacionista' },
      { titulo: 'The Gift of Prophecy, Grudem', tipo: 'livro', descricao: 'Posicao moderada' }
    ],
    aplicacaoPratica: 'Nao despreze as profecias, mas examine tudo. Dons existem para edificacao.',
    contextoHistorico: { periodo: '1901-presente', evento: 'Ressurgimento dos dons', descricao: 'Pentecostalismo (1906). Warfield respondeu. Carismatico (1960) expandiu.' }
  },

  {
    id: 'neo-013',
    titulo: 'Missiologia — A Teologia da Missao',
    categoria: 'Teologia Pratica',
    subcategoria: 'Missiologia',
    conteudo: [
      'Missiologia: teologia da missao — missao de Deus (missio Dei): proclamacao, justica, misericordia, criacao, restauracao.',
      'Missao de Deus comeca com Deus: busca perdidos (Lucas 19:10), envia filhos (Joao 3:16), restaura todas as coisas (Colossenses 1:20).',
      'Grande Comissao (Mateus 28:19-20): "Ide, fazei discipulos." Nao e apenas evangelismo, mas discipulado completo.',
      'Missao tem dimensoes locais e globais. Atos 1:8: Jerquele, Judeia, Samaria, confins da terra.',
      'Contextualizacao: evangelho universal, comunicacao contextual. Inculturacao, nao sincretismo.',
      'Missao moderna enfrenta secularismo, pluralismo, pobreza. Resposta: humildade e confianca no evangelho.'
    ],
    versicosChave: ['Mateus 28:19-20', 'Atos 1:8', 'Lucas 19:10', 'Romanos 10:14-15'],
    tags: ['missao', 'missiologia', 'missio Dei', 'Grande Comissao', 'discipulado', 'contextualizacao'],
    fontes: [
      'David Bosch, Transforming Mission (1991)',
      'Lesslie Newbigin, The Open Secret (1978)',
      'Christopher Wright, The Mission of God (2006)',
      'John Stott, Christian Mission in the Modern World (1975)'
    ],
    referenciasCruzadas: [
      { referencia: 'Mateus 28:19-20', descricao: 'Ide, fazei discipulos de todas as nacoes' },
      { referencia: 'Atos 1:8', descricao: 'Testemunhas ate os confins da terra' },
      { referencia: 'Isaias 6:8', descricao: 'Aqui estou; envia-me' }
    ],
    leituraAdicional: [
      { titulo: 'Transforming Mission, Bosch', tipo: 'livro', descricao: 'Obra mais influente da missiologia' }
    ],
    aplicacaoPratica: 'Todo cristao e chamado a ser testemunha. Comece em sua comunidade.',
    contextoHistorico: { periodo: 'Sec. XVIII-presente', evento: 'Missao cristã global', descricao: 'William Carey (1792). Centro mudou para Sul Global.' }
  },

  {
    id: 'neo-014',
    titulo: 'Contextualizacao do Evangelho',
    categoria: 'Teologia Pratica',
    subcategoria: 'Missiologia',
    conteudo: [
      'Contextualizacao: comunicar evangelho de forma compreensivel, sem comprometer verdade. Inculturacao, nao sincretismo.',
      'Biblia ja e contextualizada: Deus escolheu cultura hebraica. Paulo contextualiza em Atenas (Atos 17).',
      'Tres abordagens: adaptacao maxima (Keller), principio biblico (Townsend), confronto (Stott).',
      'Exige conhecimento profundo da cultura: mitos, ritmos, valores, linguagem.',
      'Perigos: sincretismo, imperialismo cultural, relativismo.',
      'Cristianismo do Sul Global desenvolve contextualidades ricas.'
    ],
    versicosChave: ['1 Coríntios 9:19-23', 'Atos 17:22-31', 'Romanos 12:2', 'Colossenses 2:8'],
    tags: ['contextualizacao', 'inculturacao', 'cultura', 'sincretismo', 'Keller', 'Stott'],
    fontes: [
      'Timothy Keller, Ministry of Mercy (1989)',
      'John Stott, Christian Mission in the Modern World (1975)',
      'Lamin Sanneh, Translating the Message (1989)'
    ],
    referenciasCruzadas: [
      { referencia: '1 Coríntios 9:19-23', descricao: 'Paulo se faz tudo a todos' },
      { referencia: 'Atos 17:22-31', descricao: 'Paulo em Atenas: usa cultura grega' },
      { referencia: 'Colossenses 2:8', descricao: 'Cuidado com filosofia va' }
    ],
    leituraAdicional: [
      { titulo: 'Ministry of Mercy, Keller', tipo: 'livro', descricao: 'Evangelho em contexto urbano' },
      { titulo: 'Translating the Message, Sanneh', tipo: 'livro', descricao: 'Traducao biblica transforma culturas' }
    ],
    aplicacaoPratica: 'Pense na cultura do ouvinte. Nao imponha formas ocidentais. Ouca antes de falar.',
    contextoHistorico: { periodo: 'Sec. XX-presente', evento: 'Missiologia contextual', descricao: 'O cristianismo sempre foi contextual.' }
  },

  {
    id: 'neo-015',
    titulo: 'Bioetica Cristã — Principios Fundamentais',
    categoria: 'Etica Cristã',
    subcategoria: 'Bioetica',
    conteudo: [
      'Principios: dignidade humana (imagem de Deus), sacralidade da vida, responsabilidade de zelo, compaixao pelo sofrimento.',
      'Aborto: cristianismo defende vida desde concepcao (Salmo 139:13-16, Lucas 1:41-44).',
      'Eutanasia: opoe-se a morte provocada, reconhece dignidade no sofrimento. Cuidado paliativo compativel.',
      'Engenharia genetica: CRISPR levanta questoes sobre "jogar de Deus". Humildade necessaria.',
      'Clonacao reprodutiva: rejeitada. Cada pessoa deve ser unica.',
      'Bioetica cristã nao e apenas "nao fazer" — e agir com misericordia.'
    ],
    versicosChave: ['Salmo 139:13-16', 'Jeremias 1:5', 'Gênesis 1:27', 'Mateus 25:36'],
    tags: ['bioetica', 'aborto', 'eutanasia', 'clonagem', 'engenharia genetica', 'dignidade', 'vida'],
    fontes: [
      'John Kilner, Dignity and Destiny (2015)',
      'Albert Mohler, Christian Ethics (2018)',
      'Robert George, Embryo (2008)',
      'Scott Rae, Moral Issues of Our Time (2015)'
    ],
    referenciasCruzadas: [
      { referencia: 'Salmo 139:13-16', descricao: 'Deus me formou nas entranhas da mae' },
      { referencia: 'Gênesis 1:27', descricao: 'Fez a imagem de Deus' },
      { referencia: 'Mateus 25:36', descricao: 'Estive doente e me visitastes' }
    ],
    leituraAdicional: [
      { titulo: 'Dignity and Destiny, Kilner', tipo: 'livro', descricao: 'Base teologica da dignidade' }
    ],
    aplicacaoPratica: 'Pense com profundidade teologica. Dignidade humana nao e opcional.',
    contextoHistorico: { periodo: 'Sec. XX-XXI', evento: 'Desenvolvimento da bioetica cristã', descricao: 'IVF (1978), clonagem (1996), CRISPR (2012). Documentos vaticanos.' }
  },

  {
    id: 'neo-016',
    titulo: 'Cuidado da Criacao — Ecotheologia',
    categoria: 'Etica Cristã',
    subcategoria: 'Meio Ambiente',
    conteudo: [
      'Deus confiou responsabilidade de zelar (Genesis 2:15). Teocentrismo, nao ecocentrismo.',
      '"Dominar" (Genesis 1:28) e governo sabio, nao exploracao predatoria.',
      'Queda corrompeu relacao: ganancia, consumismo, indiferenca sao frutos do pecado.',
      'Romanos 8:19-22: criacao gemera ate a redencao. Nova criacao (Apocalipse 21-22) e renovacao.',
      'Administrador fiel — usar com sabedoria, preservar com responsabilidade.',
      'Acoes: reduzir consumo, reciclar, apoiar energias limpas, proteger especies.'
    ],
    versicosChave: ['Genesis 2:15', 'Romanos 8:19-22', 'Apocalipse 21:1-5', 'Levitico 25:23'],
    tags: ['meio ambiente', 'ecotheologia', 'criacao', 'cuidado', 'renovacao', 'sustentabilidade'],
    fontes: [
      'Calvin DeWitt, Caring for Creation (1988)',
      'Steven Bouma-Prediger, For the Beauty of the Earth (2001)',
      'Pope Francis, Laudato Si (2015)',
      'Richard Bauckham, The Bible and Ecology (2010)'
    ],
    referenciasCruzadas: [
      { referencia: 'Genesis 2:15', descricao: 'Cultivar e guardar o jardim' },
      { referencia: 'Romanos 8:19-22', descricao: 'A criacao geme esperando a redencao' },
      { referencia: 'Apocalipse 21:1-5', descricao: 'Novos ceus e nova terra — renovacao' }
    ],
    leituraAdicional: [
      { titulo: 'Laudato Si, Papa Francisco', tipo: 'livro', descricao: 'Enciclica sobre a casa comum' }
    ],
    aplicacaoPratica: 'Reduza consumo, recicle, cuide do entorno. "Venha o teu reino" inclui restauracao da criacao.',
    contextoHistorico: { periodo: '1967-presente', evento: 'Ecotheologia', descricao: 'Lynn White (1967). DeWitt respondeu. Laudato Si (2015).' }
  },

  {
    id: 'neo-017',
    titulo: 'Teologia do Corpo — Joao Paulo II',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Antropologia Teologica',
    conteudo: [
      '129 catequeses (1979-1984): corpo humano a luz do plano divino — revela pessoa, vocacao ao amor, misterio da encarnacao.',
      'Corpo nao e "prisao da alma" nem mero instrumento. A pessoa e corporea.',
      '"Nupcialidade do corpo": corpo, especialmente na diferenca sexual, revela vocacao ao amor.',
      'Castidade nao e repressao, mas integracao: dominio de si para doar-se plenamente.',
      'Abrange: dignidade, sexualidade, matrimonio, virgindade, modestia, trabalho, sofrimento, morte.',
      'Resposta ao secularismo: corpo e templo do Espirito Santo.'
    ],
    versicosChave: ['Genesis 2:23-25', '1 Coríntios 6:19-20', 'Mateus 22:30', 'Efésios 5:31-32'],
    tags: ['teologia do corpo', 'Joao Paulo II', 'sexualidade', 'castidade', 'matrimonio', 'dignidade'],
    fontes: [
      'João Paulo II, Teologia do Corpo (1979-1984)',
      'Christopher West, Theology of the Body Explained (2003)',
      'Michael Waldstein, Man and Woman He Created Them (2006)'
    ],
    referenciasCruzadas: [
      { referencia: 'Genesis 2:23-25', descricao: 'Os dois serao uma so carne' },
      { referencia: '1 Coríntios 6:19-20', descricao: 'Corpo e templo do Espirito Santo' },
      { referencia: 'Efésios 5:31-32', descricao: 'O misterio e grande — matrimonio e Igreja' }
    ],
    leituraAdicional: [
      { titulo: 'Theology of the Body Explained, West', tipo: 'livro', descricao: 'Explicacao acessivel' }
    ],
    aplicacaoPratica: 'Reflita sobre o significado do seu corpo. Cuide como templo.',
    contextoHistorico: { periodo: '1979-1984', evento: 'Catequeses sobre o corpo', descricao: 'Joao Paulo II apresentou 129 catequeses. Contribuicao significativa.' }
  },

  {
    id: 'neo-018',
    titulo: 'A Teologia da Prosperidade — Analise Critica',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Teologias Contemporaneas',
    conteudo: [
      'Ensina que Deus deseja prosperidade material. Defensores: Hagin, Copeland, Osteen.',
      'Base biblica alegada: Malaquias 3:10, 3 Joao 2, Proverbios 10:22. Tiradas de contexto.',
      'Critica biblica: Jesus era pobre (Lucas 9:58), apostolos sofreram (2 Corintios 11:23-28).',
      'Critica pastoral: culpa doentes e pobres. Abusivo e falso (Joao 9:1-3).',
      'Critica social: valoriza individualismo, consumismo — tudo que Jesus criticou (Lucas 12:15-21).',
      'O que e correto: Deus se importa, fe tem poder. Mas reduzir fe a prosperidade e distorsao.'
    ],
    versicosChave: ['Lucas 12:15-21', '1 Timóteo 6:9-10', '2 Coríntios 11:23-28', 'Mateus 16:24'],
    tags: ['teologia da prosperidade', 'prosperidade', 'Copeland', 'Osteen', 'critica', 'consumismo'],
    fontes: [
      'Kate Bowler, Blessed (2013)',
      'John Piper, Let the Nations Be Glad (2010)',
      'Randy Alcorn, Money, Possessions, and Eternity (2003)'
    ],
    referenciasCruzadas: [
      { referencia: 'Lucas 12:15-21', descricao: 'Guardai-vos de avareza' },
      { referencia: '1 Timóteo 6:9-10', descricao: 'Ganancia e raiz de todos os males' },
      { referencia: 'Mateus 16:24', descricao: 'Negue-se a si mesmo — evangelho e sacrificio' }
    ],
    leituraAdicional: [
      { titulo: 'Blessed, Kate Bowler', tipo: 'livro', descricao: 'Historia academica' }
    ],
    aplicacaoPratica: 'Nao aceite sem examinar biblicamente. O evangelho nao e sobre ficar rico.',
    contextoHistorico: { periodo: '1940-presente', evento: 'Crescimento da teologia da prosperidade', descricao: 'Hagin (1940s). Copeland, Osteen expandiram. Criticada por todas as tradicoes.' }
  },

  {
    id: 'neo-019',
    titulo: 'Teologia da Libertacao — Analise Critica',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Teologias Contemporaneas',
    conteudo: [
      'Parte dos pobres e oprimidos. "Deus dos pobres" central.',
      'Contribuicao: salvacao integral — liberacao da pobreza, opressao, injustica social.',
      'Critica marxista: categorias marxistas. Vaticano criticou mas reconheceu legitima.',
      'Critica pastoral: pode reduzir evangelho a justica social.',
      'Nao e monolitica: catolica (Gutierrez), negra (Cone), feminista (Ruiz).',
      'Avaliacao: erros, mas contribuicoes significativas — integralidade, preferencia pelos pobres.'
    ],
    versicosChave: ['Lucas 4:18-19', 'Isaías 61:1', 'Mateus 25:31-46', 'Tiago 2:15-17'],
    tags: ['teologia da libertacao', 'Gutierrez', 'pobres', 'justica social', 'opressao', 'marxismo'],
    fontes: [
      'Gustavo Gutierrez, A Theology of Liberation (1971)',
      'James Cone, A Black Theology of Liberation (1970)',
      'Ratzinger, Instruction on Certain Aspects (1984)'
    ],
    referenciasCruzadas: [
      { referencia: 'Lucas 4:18-19', descricao: 'Liberatar os cativos' },
      { referencia: 'Mateus 25:31-46', descricao: 'Julgamento pelas obras de misericordia' },
      { referencia: 'Isaías 58:6-7', descricao: 'Quebrantar lazos da injustica' }
    ],
    leituraAdicional: [
      { titulo: 'A Theology of Liberation, Gutierrez', tipo: 'livro', descricao: 'Livro fundador' }
    ],
    aplicacaoPratica: 'O evangelho e pessoal E social. Nao negligencie os pobres.',
    contextoHistorico: { periodo: '1960s-presente', evento: 'Teologia da libertacao', descricao: 'Gutierrez (1971). Ditaduras. Vaticano.' }
  },

  {
    id: 'neo-020',
    titulo: 'Teologia Feminista — Analise Critica',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Teologias Contemporaneas',
    conteudo: [
      'Parte da experiencia das mulheres. Questiona linguagem sobre Deus e patriarcado.',
      'Contribuicao: igualdade de genero — Genesis 1:27 ambos a imagem de Deus.',
      'Critica conservadora: rejeita autoridade biblica (1 Timoteo 2:12, 1 Corintios 14:34-35).',
      'Contribuicoes: revelou como patriarcado distorceu teologia.',
      'Evangelismo: egalitarias vs. complementaristas (Grudem vs. Piper).',
      'Avaliacao: contribuicoes significativas sobre dignidade, mas risco de reinterpretar Escritura.'
    ],
    versicosChave: ['Gênesis 1:27', 'Gálatas 3:28', '1 Timóteo 2:12', 'Efésios 5:22-33'],
    tags: ['teologia feminista', 'igualdade', 'genero', 'patriarcado', 'egalitario', 'complementarismo'],
    fontes: [
      'Elisabeth Schussler Fiorenza, In Memory of Her (1983)',
      'Sally McFague, Models of God (1987)',
      'Wayne Grudem, Evangelical Feminism and Biblical Truth (2004)',
      'Philip Barton Payne, Man and Woman, One in Christ (2009)'
    ],
    referenciasCruzadas: [
      { referencia: 'Gênesis 1:27', descricao: 'A imagem de Deus — macho e femea' },
      { referencia: 'Gálatas 3:28', descricao: 'Nao ha homem nem mulher — todos um' },
      { referencia: 'Efésios 5:22-33', descricao: 'Submissao mutua — amor como Cristo' }
    ],
    leituraAdicional: [
      { titulo: 'In Memory of Her, Fiorenza', tipo: 'livro', descricao: 'Feminismo cristao academico' },
      { titulo: 'Evangelical Feminism, Grudem', tipo: 'livro', descricao: 'Defesa complementarista' }
    ],
    aplicacaoPratica: 'Estude as passagens em contexto. Reconheca contribuicoes. Evite extremos.',
    contextoHistorico: { periodo: '1960s-presente', evento: 'Teologia feminista', descricao: 'Fiorenza e McFague principais vozes. Debate continua.' }
  },

  {
    id: 'neo-021',
    titulo: 'Teologia Pos-Liberal — Lindbeck e Hauerwas',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Teologias Contemporaneas',
    conteudo: [
      'Pos-liberalismo rejeita liberalismo e fundamentalismo. Lindbeck e Hauerwas principais.',
      'Lindbeck (1984): tres abordagens — cognitivista (fundamentalismo), expressivista (liberalismo), cultural-linguistica (pos-liberalismo).',
      'Cultural-linguistica: fe e como "gramatica" — sistema de simbolos, narrativas, praticas.',
      'Hauerwas: igreja e "comunidade de caridade" que vive por narrativa, nao argumentos filosoficos.',
      'Critica: pode levar ao relativismo, isolar da igreja, negligenciar verdades universais.',
      'Contribuicao: recupera narrativa biblica, valoriza comunidade, resistencia ao Constantinianismo.'
    ],
    versicosChave: ['Josué 1:8', 'Salmo 1:1-3', 'Atos 2:42-47', '1 Coríntios 11:2'],
    tags: ['pos-liberalismo', 'Lindbeck', 'Hauerwas', 'cultural-linguistico', 'narrativa', 'comunidade'],
    fontes: [
      'George Lindbeck, The Nature of Doctrine (1984)',
      'Stanley Hauerwas, A Community of Character (1981)',
      'Stanley Hauerwas, Resident Aliens (1989)',
      'William Placher, The domestication of transcendence (1996)'
    ],
    referenciasCruzadas: [
      { referencia: 'Atos 2:42-47', descricao: 'Vida comunitaria da igreja primitiva' },
      { referencia: 'Josué 1:8', descricao: 'Meditar na lei — narrativa formadora' },
      { referencia: '1 Coríntios 11:2', descricao: 'Guardai as tradicoes' }
    ],
    leituraAdicional: [
      { titulo: 'The Nature of Doctrine, Lindbeck', tipo: 'livro', descricao: 'Manifesto pos-liberal' }
    ],
    aplicacaoPratica: 'Reflita como narrativa biblica molda sua vida. Valorize comunidade.',
    contextoHistorico: { periodo: '1984-presente', evento: 'Pos-liberalismo', descricao: 'Lindbeck (1984) e Hauerwas (1981). Reacao a liberalismo e fundamentalismo.' }
  },

  {
    id: 'neo-022',
    titulo: 'A Reforma Radical — Anabatistas',
    categoria: 'Historia da Igreja',
    subcategoria: 'Reforma Protestante',
    conteudo: [
      'Reforma Radical rejeitou Catolicismo e Reforma Magistral (Lutero, Calvino). Exigiu igreja visivel.',
      'Principio: separacao igreja-mundo. Lutero e Calvino mantiveram Constantinianismo. Anabatistas rejeitaram.',
      'Batismo de crentes: batismo infantil invalido. Fe e pessoal.',
      'Pacifismo: "Nao mataras" e absoluto. Magistrados cristãos nao podem usar espada.',
      'Ecclesiologico: igreja como comunidade de disciplina. Simplicidade de vida.',
      'Herdeiros: Mennonitas, Huteritas, Irmaos.'
    ],
    versicosChave: ['Mateus 5:38-42', 'Romanos 12:17-21', '2 Coríntios 6:14-18', 'Apocalipse 18:4'],
    tags: ['anabatista', 'reforma radical', 'pacifismo', 'batismo de crentes', 'separacao', 'disciplina'],
    fontes: [
      'Harold Bender, The Anabaptist Vision (1944)',
      'Esther伯纳德, The Anabaptist Story (1964)',
      'J. Denny Weaver, The Nonviolent Atonement (2001)'
    ],
    referenciasCruzadas: [
      { referencia: 'Mateus 5:38-42', descricao: 'Nao resistir ao mal' },
      { referencia: 'Romanos 12:17-21', descricao: 'Nao vos vingueis' },
      { referencia: '2 Coríntios 6:14-18', descricao: 'Sai do meio deles' }
    ],
    leituraAdicional: [
      { titulo: 'The Anabaptist Story, Bender', tipo: 'livro', descricao: 'Visao panoramica' }
    ],
    aplicacaoPratica: 'Reflita sobre igreja e Estado. Separacao pode ser mais biblica.',
    contextoHistorico: { periodo: '1525-presente', evento: 'Reforma Radical', descricao: 'Grebel, Manz, Blaurock (1525). Perseguidos. Sobreviveram.' }
  },

  {
    id: 'neo-023',
    titulo: 'A Teologia Puritana',
    categoria: 'Historia da Igreja',
    subcategoria: 'Protestantismo',
    conteudo: [
      'Puritanos buscaram purificar Igreja da Inglaterra. Teologia calvinista com foco na piedade pratica.',
      'Teologia: soberania absoluta, depravacao total, eleicao incondicional, perseveranca dos santos.',
      'Predestinacao nao levava ao quietismo — era motivo de gratidao e santificacao.',
      'Cultura: valorizaram educacao (Harvard, Yale), trabalho duro, disciplina.',
      'Piedade: diarios espirituais, meditacao, oracao, examinacao de consciencia.',
      'Herdeiros: batistas primitivos, metodistas (em parte). Influencia no evangelicalismo.'
    ],
    versicosChave: ['Efésios 2:8-10', 'Filipenses 2:12-13', '2 Coríntios 13:5', 'Hebreus 12:14'],
    tags: ['puritanismo', 'calvinismo', 'piedade', 'predestinacao', 'etica do trabalho', 'diarios'],
    fontes: [
      'Perry Miller, The New England Mind (1939)',
      'J.I. Packer, A Quest for Godliness (1990)',
      'Iain Murray, The Puritan Hope (1977)',
      'John Owen, Mortification of Sin (1656)'
    ],
    referenciasCruzadas: [
      { referencia: 'Efésios 2:8-10', descricao: 'Salvos pela graça — para boas obras' },
      { referencia: 'Filipenses 2:12-13', descricao: 'Trabalhai com temor e tremor' },
      { referencia: 'Hebreus 12:14', descricao: 'Segui a santificacao' }
    ],
    leituraAdicional: [
      { titulo: 'A Quest for Godliness, Packer', tipo: 'livro', descricao: 'Survey da teologia puritana' }
    ],
    aplicacaoPratica: 'Adote disciplina espiritual: diarios, meditacao, examinacao.',
    contextoHistorico: { periodo: '1550-1700', evento: 'Puritanismo', descricao: 'Miller documentou. Packer popularizou. Influencia profunda.' }
  },

  {
    id: 'neo-024',
    titulo: 'Realismo Comum Escocês',
    categoria: 'Filosofia da Religião',
    subcategoria: 'Epistemologia',
    conteudo: [
      'Realismo Comum (Thomas Reid, Dugald Stewart): percepcao e imediatamente realista — percebemos o mundo diretamente.',
      'Aplicacao a teologia: revelacao divina e percebida imediatamente pela razao comum.',
      'Influencia no evangelicalismo: Charles Hodge usou para defender inerrancia — Biblia como "teste" de verdade.',
      'Critica: Kant argumentou que nao conhecemos a "coisa em si".',
      'Herdeiros: B.B. Warfield, J. Gresham Machen, fundamentalismo americano.',
      'Metodologia de Hodge influenciou seminarios evangelicos.'
    ],
    versicosChave: ['Romanos 1:19-20', 'Salmo 19:1-4', 'Atos 17:28', 'Hebreus 11:1'],
    tags: ['realismo comum', 'Reid', 'Hodge', 'epistemologia', 'inerrancia', 'razao comum', 'Princeton'],
    fontes: [
      'Thomas Reid, Inquiry into the Human Mind (1764)',
      'Charles Hodge, Systematic Theology (1872)',
      'Mark Noll, Between Faith and Criticism (1986)'
    ],
    referenciasCruzadas: [
      { referencia: 'Romanos 1:19-20', descricao: 'Conhecimento de Deus pela razao' },
      { referencia: 'Salmo 19:1-4', descricao: 'Ceus declaram — revelacao na criacao' },
      { referencia: 'Hebreus 11:1', descricao: 'Fe e certeza das coisas esperadas' }
    ],
    leituraAdicional: [
      { titulo: 'Systematic Theology, Hodge', tipo: 'livro', descricao: 'Teologia influenciada pelo realismo' }
    ],
    aplicacaoPratica: 'Fe nao e cegueiro racional. Deus deu razao comum para perceber verdade.',
    contextoHistorico: { periodo: '1764-1920', evento: 'Realismo comum e evangelicalismo', descricao: 'Reid fundou. Hodge aplicou. Warfield e Machen defenderam.' }
  },

  {
    id: 'neo-025',
    titulo: 'A Teologia Dialética de Karl Barth',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Teologias Contemporaneas',
    conteudo: [
      'Karl Barth (1886-1968): teologia dialética (neo-ortodoxa) rejeita liberalismo.',
      '"Barreira" entre Deus e homem e absoluta. Deus e "totalmente outro" (ganz andere).',
      'Revelacao nao e ideia humana, mas ato de Deus. Escritura nao e palavra de Deus em si, mas testemunho.',
      '"Paradox": fe e escandalo e racionalidade ao mesmo tempo.',
      'Dogmatica Eclesial: opoe-se a liberalismo e literalismo. Quer "pensar com a igreja".',
      'Critica: pode negligenciar racionalidade da fe (Van Til), pode ser vago sobre moral.'
    ],
    versicosChave: ['Isaías 55:8-9', 'Romanos 11:33-36', '1 Coríntios 1:25', 'João 1:14'],
    tags: ['Barth', 'teologia dialética', 'neo-ortodoxia', 'totalmente outro', 'revelacao', 'paradoxo'],
    fontes: [
      'Karl Barth, Römerbrief (1919)',
      'Karl Barth, Church Dogmatics (1932-1967)',
      'Eberhard Busch, The Great Passion (2014)',
      'Bruce McCormack, Karl Barth\'s Critically Realistic Dialectical Theology (1995)'
    ],
    referenciasCruzadas: [
      { referencia: 'Isaías 55:8-9', descricao: 'Meus pensamentos nao sao os vossos' },
      { referencia: 'Romanos 11:33-36', descricao: 'Profundezas da sabedoria de Deus' },
      { referencia: 'João 1:14', descricao: 'Logos se fez carne — revelacao em Cristo' }
    ],
    leituraAdicional: [
      { titulo: 'Church Dogmatics, Barth', tipo: 'livro', descricao: 'Obra monumental' }
    ],
    aplicacaoPratica: 'Reconheca transcendencia de Deus. Mas nao use isso para evitar estudo biblico.',
    contextoHistorico: { periodo: '1919-1968', evento: 'Teologia dialética', descricao: 'Barth rompeu com liberalismo. Dogmatics sao maior obra do sec. XX.' }
  },

  {
    id: 'neo-026',
    titulo: 'A Teologia da Esperança — Jürgen Moltmann',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Escatologia',
    conteudo: [
      'Moltmann (1926-2024): teologia centrada na esperanca. Escritura e sobre futuro — promessa de Deus.',
      'Esperanca nao e otimismo, mas expectativa ativa. Fe e "anticipacao" do futuro.',
      'Crucificacao nao e apenas passado — e abertura para futuro. Deus sofre com sofredores.',
      'Teologia da cruz e da gloria em tensao: Deus se revela no sofrimento.',
      'Esperanca e politica: engaja transformacao social. Influenciou libertacao e marxismo cristao.',
      'Trindade de Moltmann: "perichoresis" — dança mutua de amor. Fundamento da esperanca.'
    ],
    versicosChave: ['Romanos 8:24-25', 'Apocalipse 21:1-5', 'Isaías 65:17', 'Efésios 1:18-20'],
    tags: ['teologia da esperanca', 'Moltmann', 'escatologia', 'futuro', 'trindade', 'sofrimento', 'politica'],
    fontes: [
      'Jürgen Moltmann, Theology of Hope (1964)',
      'Jürgen Moltmann, The Crucified God (1972)',
      'Jürgen Moltmann, The Trinity and the Kingdom (1980)',
      'Bauckham and Hartwig, The Theology of Jürgen Moltmann (1999)'
    ],
    referenciasCruzadas: [
      { referencia: 'Romanos 8:24-25', descricao: 'Na esperanca fomos salvos' },
      { referencia: 'Apocalipse 21:1-5', descricao: 'Novos ceus e nova terra' },
      { referencia: 'Efésios 1:18-20', descricao: 'Olhos do coracao iluminados' }
    ],
    leituraAdicional: [
      { titulo: 'Theology of Hope, Moltmann', tipo: 'livro', descricao: 'Obra fundadora' },
      { titulo: 'The Crucified God, Moltmann', tipo: 'livro', descricao: 'Deus crucificado e centro' }
    ],
    aplicacaoPratica: 'Viva com esperanca ativa. Nao se contente com status quo.',
    contextoHistorico: { periodo: '1964-presente', evento: 'Teologia da esperanca', descricao: 'Moltmann, prisioneiro de guerra. Theology of Hope revolucionou.' }
  },

  {
    id: 'neo-027',
    titulo: 'Teologia Política — Schmitt e Solzhenitsyn',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Teologia Politica',
    conteudo: [
      'Schmitt (1888-1985): conceitos politicos centrais sao teologicos secularizados.',
      '"Soberano e quem decide sobre excecao" — espelha milagre divino.',
      'Solzhenitsyn (1918-2008): comunismo falhou porque rejeitou Deus. Ausencia de Deus leva a totalitarismo.',
      'Teologia politica nao e partidaria — e como fe molda visao de sociedade.',
      'Barth: "Cristo e Senhor" e afirmacao politica — ele e soberano, nao o Estado.',
      'Esperanca (Moltmann) e libertacao (Gutierrez) sao formas de teologia politica.'
    ],
    versicosChave: ['Daniel 2:21', 'Romanos 13:1-7', 'Atos 5:29', 'Apocalipse 11:15'],
    tags: ['teologia politica', 'Schmitt', 'Solzhenitsyn', 'soberania', 'Estado', 'Barth', 'justica'],
    fontes: [
      'Carl Schmitt, Politische Theologie (1922)',
      'Richard John Neuhaus, The Naked Public Square (1984)',
      'Stanley Hauerwas, Resident Aliens (1989)',
      'William Cavanaugh, The Myth of Religious Violence (2009)'
    ],
    referenciasCruzadas: [
      { referencia: 'Daniel 2:21', descricao: 'Deus muda tempos e reinos' },
      { referencia: 'Romanos 13:1-7', descricao: 'Toda alma sujeita as autoridades' },
      { referencia: 'Atos 5:29', descricao: 'Obedecer a Deus mais que aos homens' },
      { referencia: 'Apocalipse 11:15', descricao: 'Reinos sao do Senhor' }
    ],
    leituraAdicional: [
      { titulo: 'Politische Theologie, Schmitt', tipo: 'livro', descricao: 'Fundamento da teologia politica' },
      { titulo: 'Resident Aliens, Hauerwas', tipo: 'livro', descricao: 'Igreja como alternativa' }
    ],
    aplicacaoPratica: 'Reflita como fe molda visao politica. "Cristo e Senhor" e afirmacao politica.',
    contextoHistorico: { periodo: '1922-presente', evento: 'Teologia politica', descricao: 'Schmitt fundou. Barth respondeu. Hauerwas desenvolveu.' }
  },

  {
    id: 'neo-028',
    titulo: 'Renovacao de Toda a Criacao — Escatologia Ecologica',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Escatologia',
    conteudo: [
      'Biblia nao ensina destruicao total, mas renovacao. Romanos 8:19-22: criacao geme.',
      'Apocalipse 21-22: "Novos ceus e nova terra" — renovacao, nao aniquilacao.',
      'Visao de "arrebatamento" e destruicao (dispensacionalismo) e minoritaria.',
      'Ecologia teologica: se Deus renovara, temos responsabilidade agora.',
      '"Teologia da terra": terra pertence a Deus (Levitico 25:23).',
      'Mandato original: "Cultivar e guardar" (Genesis 2:15). Shamar inclui protecao.'
    ],
    versicosChave: ['Romanos 8:19-22', 'Apocalipse 21:1-5', 'Genesis 2:15', 'Isaías 65:17'],
    tags: ['renovacao', 'criacao', 'ecologia', 'escatologia', 'nova criacao', 'cuidado', 'terra'],
    fontes: [
      'Richard Bauckham, The Fate of the Dead (1998)',
      'N.T. Wright, Surprised by Hope (2008)',
      'Calvin DeWitt, Caring for Creation (1988)',
      'Steven Bouma-Prediger, For the Beauty of the Earth (2001)'
    ],
    referenciasCruzadas: [
      { referencia: 'Romanos 8:19-22', descricao: 'Criacao geme esperando' },
      { referencia: 'Apocalipse 21:1-5', descricao: 'Novos ceus e nova terra' },
      { referencia: 'Genesis 2:15', descricao: 'Cultivar e guardar' }
    ],
    leituraAdicional: [
      { titulo: 'Surprised by Hope, Wright', tipo: 'livro', descricao: 'Ressurreicao e renovacao' }
    ],
    aplicacaoPratica: 'Cuide da criacao agora — prefiguracao da renovacao futura.',
    contextoHistorico: { periodo: '1990s-presente', evento: 'Ecologia teologica', descricao: 'Wright e Bauckham articularam.' }
  },

  {
    id: 'neo-029',
    titulo: 'Cristologia de Barth — O Unico e Grande Nao',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Cristologia',
    conteudo: [
      'Cristologia "de cima para baixo": Logos se encarna. Prioridade e graça de Deus.',
      '"Nao" divino: Deus diz nao ao pecado e a morte na cruz.',
      'Cruz e revelacao: Deus se revela no sofrimento. Teologia da cruz central.',
      'Cristo e "Sim" de Deus para humanidade. Encarnacao e ato de graça.',
      'Cristologia "critica e realista": baseada em revelacao, nao experiencia.',
      'Critica: pode negligenciar humanidade (Moltmann), pode ser vaga.'
    ],
    versicosChave: ['João 1:14', 'Filipenses 2:6-8', 'Romanos 8:3', '2 Coríntios 5:19'],
    tags: ['Barth', 'cristologia', 'revelacao', 'cruz', 'graca', 'encarnacao', 'sim/nao'],
    fontes: [
      'Karl Barth, Church Dogmatics II/1 (1940)',
      'Karl Barth, Church Dogmatics II/2 (1948)',
      'John Webster, Karl Barth (1998)'
    ],
    referenciasCruzadas: [
      { referencia: 'João 1:14', descricao: 'Logos se fez carne' },
      { referencia: 'Filipenses 2:6-8', descricao: 'Tendo forma de Deus, se esvaziou' },
      { referencia: '2 Coríntios 5:19', descricao: 'Deus em Cristo reconciliando' }
    ],
    leituraAdicional: [
      { titulo: 'Church Dogmatics II/1, Barth', tipo: 'livro', descricao: 'Cristologia barthiana' }
    ],
    aplicacaoPratica: 'Cruz nao e derrota, mas vitoria. Deus diz "sim" quando merecemos "nao".',
    contextoHistorico: { periodo: '1940-1948', evento: 'Church Dogmatics II', descricao: 'Cristologia durante Segunda Guerra.' }
  },

  {
    id: 'neo-030',
    titulo: 'Pneumatologia Global — O Espirito no Sul Global',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Pneumatologia',
    conteudo: [
      'Cristianismo do Sul Global enfatiza Espirito de forma diferente. Pneumatologia mais experiencial e comunitaria.',
      'Africa: Espirito como forca que liberta de espiritos do mal. Cura e libertacao centrais.',
      'America Latina: Espirito associado a justica social. "Espirito dos oprimidos".',
      'Asia: Espirito associado a sabedoria e paz. Pentecostalismo cresce rapido.',
      'Diferenca do Ocidente: pneumatologia academica vs. vivida e comunitaria.',
      'Desafio: integrar experiencia com teologia sistematica.'
    ],
    versicosChave: ['Atos 2:17-21', '1 Coríntios 12:4-11', 'Galatas 5:22-23', 'Romanos 8:26-27'],
    tags: ['pneumatologia', 'global', 'Sul Global', 'Africa', 'America Latina', 'Asia', 'pentecostalismo'],
    fontes: [
      'Veli-Matti Karkkainen, Pneumatology (2002)',
      'Allan Anderson, An Introduction to Pentecostalism (2004)',
      'Kwame Bediako, Christianity in Africa (1995)',
      'Samuel Escobar, The New Global Mission (2003)'
    ],
    referenciasCruzadas: [
      { referencia: 'Atos 2:17-21', descricao: 'Derramarei do meu Espirito' },
      { referencia: '1 Coríntios 12:4-11', descricao: 'Distribuicoes diferentes' },
      { referencia: 'Romanos 8:26-27', descricao: 'Espirito intercede' }
    ],
    leituraAdicional: [
      { titulo: 'Pneumatology, Karkkainen', tipo: 'livro', descricao: 'Survey global' }
    ],
    aplicacaoPratica: 'Aprenda com Sul Global. Fe nao e apenas doutrina, mas experiencia.',
    contextoHistorico: { periodo: '1900s-presente', evento: 'Pentecostalismo global', descricao: 'Cresceu mais rapido no Sul Global.' }
  },

  {
    id: 'neo-031',
    titulo: 'Vocacao — A Teologia do Trabalho',
    categoria: 'Etica Cristã',
    subcategoria: 'Vida Prática',
    conteudo: [
      'Doutrina da vocacao (Beruf, calling): todo trabalho honesto e chamado de Deus. Lutero e Calvino.',
      'Lutero:牧师, politico, agricultor — todos vocacao divina. Nao ha hierarquia.',
      'Calvino: trabalho e servico a Deus. "Etica protestante" valoriza trabalho duro, disciplina.',
      'Vocacao nao e apenas profissao — e modo de glorificar Deus em todas as esferas.',
      'Trabalho: dom (capacidade dada), servico (contribuicao), missao (testemunho).',
      'Em mundo de desemprego, teologia da vocacao oferece dignidade.'
    ],
    versicosChave: ['Efésios 2:10', 'Colossenses 3:23-24', 'Provérbios 22:29', 'Mateus 25:21'],
    tags: ['vocacao', 'trabalho', 'Lutero', 'Calvino', 'etica protestante', 'servico', 'dom'],
    fontes: [
      'Martin Luther, secular Calling (1520)',
      'John Calvin, Institutes III.10',
      'Os Guinness, The Call (1998)',
      'Tim Keller, Every Good Endeavor (2014)'
    ],
    referenciasCruzadas: [
      { referencia: 'Efésios 2:10', descricao: 'Criados para boas obras' },
      { referencia: 'Colossenses 3:23-24', descricao: 'Tudo de coração' },
      { referencia: 'Mateus 25:21', descricao: 'Bom e fiel servo' }
    ],
    leituraAdicional: [
      { titulo: 'Every Good Endeavor, Keller', tipo: 'livro', descricao: 'Teologia do trabalho' }
    ],
    aplicacaoPratica: 'Veja trabalho como vocacao. Trabalhe como para o Senhor.',
    contextoHistorico: { periodo: '1520-presente', evento: 'Teologia da vocacao', descricao: 'Lutero e Calvino. Weber analisou. Keller popularizou.' }
  },

  {
    id: 'neo-032',
    titulo: 'Salvacao Integral — Espirito, Alma e Corpo',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Soteriologia',
    conteudo: [
      'Salvacao nao e apenas da "alma" — e integral: espirito, alma e corpo (1 Tessalonicenses 5:23).',
      'Dualismo grego (alma boa, corpo mau) influenciou igreja. Biblia hebraica ve pessoa como unidade.',
      'Salvacao inclui: justificacao, regeneracao, santificacao, glorificacao.',
      'Corpo e ressuscitado (1 Corintios 15). Esperanca e ressurreicao corporal, nao "ir para ceu".',
      'Salvacao e social: comunidade (Igreja) e criacao restauradas. Cosmica.',
      'Implicacoes: cuidamos do corpo, mente, espirito, sociedade.'
    ],
    versicosChave: ['1 Tessalonicenses 5:23', '1 Coríntios 15:42-44', 'Romanos 8:23', 'Colossenses 1:19-20'],
    tags: ['salvacao integral', 'corpo', 'alma', 'espirito', 'ressurreicao', 'cosmica', 'integralidade'],
    fontes: [
      'N.T. Wright, Surprised by Hope (2008)',
      'Joel Green, The Body, Spiritualization, and the Resurrection (2008)',
      'John Polkinghorne, The God of Hope (2011)'
    ],
    referenciasCruzadas: [
      { referencia: '1 Tessalonicenses 5:23', descricao: 'Deus vos santifique inteiramente' },
      { referencia: '1 Coríntios 15:42-44', descricao: 'Ressurreicao do corpo' },
      { referencia: 'Romanos 8:23', descricao: 'Criacao sera libertada' }
    ],
    leituraAdicional: [
      { titulo: 'Surprised by Hope, Wright', tipo: 'livro', descricao: 'Salvacao integral' }
    ],
    aplicacaoPratica: 'Nao negligencie nenhuma dimensao. Cuide do corpo, mente, espirito e sociedade.',
    contextoHistorico: { periodo: '1990s-presente', evento: 'Teologia da integralidade', descricao: 'Wright articulou. Polkinghorne integrou ciencia.' }
  },

  {
    id: 'neo-033',
    titulo: 'Epistemologia Reformada — Van Til e Plantinga',
    categoria: 'Filosofia da Religião',
    subcategoria: 'Epistemologia',
    conteudo: [
      'Van Til (1895-1987) e Plantinga (1932-): fundamentos para conhecimento cristao.',
      'Van Til: argumento cosmologico impossivel sem pressupor Deus. Nao ha "ponto neutro".',
      'Plantinga: fe pode ser "knowledge by acquaintance". Fe e racional.',
      '"Calvinista" de Plantinga: se Deus existe e criou mente, temos warrant para crer.',
      '"Pressuposicao" de Van Til: apologetica deve partir de Deus como pressuposicao.',
      'Critica: Plantinga pode ser muito forte. Van Til pode ser muito circular.'
    ],
    versicosChave: ['Romanos 1:18-23', 'Provérbios 1:7', '1 Coríntios 2:14', 'Salmo 14:1'],
    tags: ['epistemologia reformada', 'Van Til', 'Plantinga', 'pressuposicao', 'warrant', 'apologetica'],
    fontes: [
      'Cornelius Van Til, The Defense of the Faith (1955)',
      'Alvin Plantinga, Warranted Christian Belief (2000)',
      'William Alston, Perceiving God (1991)',
      'Michael Sudduth, The Reformed Objection to Natural Theology (1999)'
    ],
    referenciasCruzadas: [
      { referencia: 'Romanos 1:18-23', descricao: 'Conhecimento de Deus e evidente' },
      { referencia: 'Provérbios 1:7', descricao: 'Temor do Senhor e principio da sabedoria' },
      { referencia: '1 Coríntios 2:14', descricao: 'O homem natural nao aceita as coisas' },
      { referencia: 'Salmo 14:1', descricao: 'Diz o insensato: nao ha Deus' }
    ],
    leituraAdicional: [
      { titulo: 'Warranted Christian Belief, Plantinga', tipo: 'livro', descricao: 'Epistemologia reformada contemporanea' },
      { titulo: 'The Defense of the Faith, Van Til', tipo: 'livro', descricao: 'Apologetica pressuposicional' }
    ],
    aplicacaoPratica: 'A fe nao precisa de provas neutras. Confie na racionalidade da fe cristã.',
    contextoHistorico: { periodo: '1955-presente', evento: 'Epistemologia reformada', descricao: 'Van Til e Plantinga desenvolveram. Debate continua.' }
  },

  {
    id: 'neo-034',
    titulo: 'Teologia da Criacao — Criacionismo, Evolucao e Design',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Teologia da Criacao',
    conteudo: [
      'Debate sobre origens: criacionismo jovem, velha terra, evolucao teistica, design inteligente.',
      'Criacionismo jovem (Ken Ham): Genesis 1 e relato literal. Terra com 6.000 anos.',
      'Velha terra (Hugh Ross): dia=era geologica. Terra com 4.5 bilhoes de anos.',
      'Evolucao teistica (Polkinghorne, Lamoureux): Deus usou evolucao como meio criador.',
      'Design inteligente (Behe, Dembski): complexidade irredutivel aponta para Designer.',
      'Biblia nao e livro de ciencia — revela quem criou, nao como.'
    ],
    versicosChave: ['Genesis 1:1', 'Salmo 19:1', 'Romanos 1:20', 'Colossenses 1:16-17'],
    tags: ['criacionismo', 'evolucao', 'design inteligente', 'origens', 'velha terra', 'jovem terra'],
    fontes: [
      'John Polkinghorne, Belief in God in an Age of Science (1998)',
      'Denis Lamoureux, Evolutionary Creation (2008)',
      'Michael Behe, Darwin\'s Black Box (1996)',
      'Hugh Ross, A Matter of Days (2004)'
    ],
    referenciasCruzadas: [
      { referencia: 'Genesis 1:1', descricao: 'Deus criou os ceus e a terra' },
      { referencia: 'Salmo 19:1', descricao: 'Ceus declaram a gloria de Deus' },
      { referencia: 'Colossenses 1:16-17', descricao: 'Tudo foi criado por Cristo' },
      { referencia: 'Romanos 1:20', descricao: 'Invisiveis de Deus sao vistos na criacao' }
    ],
    leituraAdicional: [
      { titulo: 'Belief in God in an Age of Science, Polkinghorne', tipo: 'livro', descricao: 'Ciencia e fe em dialogo' },
      { titulo: 'Evolutionary Creation, Lamoureux', tipo: 'livro', descricao: 'Evolucao teistica' }
    ],
    aplicacaoPratica: 'Nao transforme Genesis em livro de ciencia. Foque em quem criou, nao em como.',
    contextoHistorico: { periodo: '1859-presente', evento: 'Debate sobre origens', descricao: 'Darwin (1859) desafiou criacionismo. Debate continua.' }
  },

  {
    id: 'neo-035',
    titulo: 'Teologia da Reconciliacao — Atonement',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Soteriologia',
    conteudo: [
      'Teoria da substituicao penal (Anselmo, Calvino): Cristo pagou o pena do pecado em nosso lugar.',
      'Teoria da recapitulacao (Ireneu): Cristo recapitulou a historia humana, vencendo o mal.',
      'Teoria moral (Abelardo): cruz e exemplo de amor que nos inspira a mudar.',
      'Teoria da vitoria (Aulén): cruz e vitoria de Cristo sobre Satanás e a morte.',
      'Teoria da troca (Murray): Cristo tomou nossos pecados e nos deu sua justica.',
      'Cada teoria captura facetas do misterio da cruz. Nenhuma e completa sozinha.'
    ],
    versicosChave: ['1 Coríntios 15:3-4', '1 Pedro 2:24', '2 Coríntios 5:21', 'Colossenses 2:14-15'],
    tags: ['expiacao', 'substituicao penal', 'recapitulacao', 'teoria moral', 'vitoria', 'morte de Cristo'],
    fontes: [
      'Anselmo, Cur Deus Homo (1098)',
      'John Calvin, Institutes III.16',
      'Gustaf Aulén, Christus Victor (1931)',
      'Leon Morris, The Apostolic Preaching of the Cross (1955)',
      'J.I. Packer, Knowing God (1973)'
    ],
    referenciasCruzadas: [
      { referencia: '1 Coríntios 15:3-4', descricao: 'Cristo morreu por nossos pecados' },
      { referencia: '1 Pedro 2:24', descricao: 'Levou sobre si nossos pecados' },
      { referencia: '2 Coríntios 5:21', descricao: 'Deus o fez pecado por nos' },
      { referencia: 'Colossenses 2:14-15', descricao: 'Aniquilou o documento... triunfando' }
    ],
    leituraAdicional: [
      { titulo: 'Cur Deus Homo, Anselmo', tipo: 'livro', descricao: 'Substituicao penal classica' },
      { titulo: 'Christus Victor, Aulén', tipo: 'livro', descricao: 'Teoria da vitoria' }
    ],
    aplicacaoPratica: 'A cruz e mais que exemplo — e ato redentor que transforma historia. Entenda suas facetas.',
    contextoHistorico: { periodo: 'Sec. XI-presente', evento: 'Desenvolvimento das teorias da expiacao', descricao: 'Anselmo (1098), Abelardo, Aulen, Calvin cada um contribuiu.' }
  },

  {
    id: 'neo-036',
    titulo: 'Teologia da Alianca e Historia da Salvacao',
    categoria: 'Teologia Bíblica',
    subcategoria: 'Historia da Salvacao',
    conteudo: [
      'Historia da salvacao: Deus age na historia para restaurar a humanidade. Criacao, queda, promessa, alianca, exodo, exilio, vinda de Cristo.',
      'Foco no AT: Abraao, Moises, Davi — cada alianca avanca o plano redentor.',
      'NT: Cristo e consumacao de todas as aliancas. Nova alianca em seu sangue.',
      'Paulo: Adão e tipo de Cristo. Um trouxe morte, outro trouxe vida.',
      'Escatologia: historia de salvacao culmina na nova criacao.',
      'Implicacao: nao somos pagina em branco — somos parte de uma historia maior.'
    ],
    versicosChave: ['Genesis 12:1-3', 'Jeremias 31:31-34', 'Lucas 22:20', 'Hebreus 8:6-13'],
    tags: ['historia da salvacao', 'alianca', 'AT', 'NT', 'consumacao', 'promessa'],
    fontes: [
      'Geerhardus Vos, Biblical Theology (1948)',
      'O. Palmer Robertson, The Christ of the Covenants (1980)',
      'Christopher Wright, The Mission of God (2006)',
      'N.T. Wright, The New Testament and the People of God (1992)'
    ],
    referenciasCruzadas: [
      { referencia: 'Genesis 12:1-3', descricao: 'Alianca abraamica — promessa' },
      { referencia: 'Jeremias 31:31-34', descricao: 'Nova alianca — transformacao interior' },
      { referencia: 'Lucas 22:20', descricao: 'Nova alianca no meu sangue' },
      { referencia: 'Hebreus 8:6-13', descricao: 'Cristo mediador de alianca melhor' }
    ],
    leituraAdicional: [
      { titulo: 'Biblical Theology, Vos', tipo: 'livro', descricao: 'Teologia biblica reformada' },
      { titulo: 'The Christ of the Covenants, Robertson', tipo: 'livro', descricao: 'Cristo e centro das aliancas' }
    ],
    aplicacaoPratica: 'Voce e parte de uma historia de salvacao. Nao e isolado — e herdeiro de promessas.',
    contextoHistorico: { periodo: 'Sec. XX-presente', evento: 'Teologia biblica narrativa', descricao: 'Vos, Robertson, Wright desenvolveram.' }
  },

  {
    id: 'neo-037',
    titulo: 'Teologia da Cruz — Lutero e a Theologia Crucis',
    categoria: 'Historia da Igreja',
    subcategoria: 'Reforma Protestante',
    conteudo: [
      'Theologia Crucis de Lutero: Deus se revela no sofrimento, nao na gloria.',
      'Contraste com theologia gloria: busca poder, conhecimento, admiracao.',
      'Cruz e central: nao ha salvacao sem sofrimento. Cristo e "Deus escondido".',
      'Axioma luterano: "Deus age contra sua vontade" (Deus sub contrario).',
      'Implicacoes: Igreja nao e triunfalista; vive no sofrimento, nao na vitoria.',
      'Modernidade: Kierkegaard, Bonhoeffer, Moltmann desenvolveram.'
    ],
    versicosChave: ['1 Coríntios 1:18-25', 'Filipenses 2:5-11', '2 Coríntios 12:9', 'Galatas 6:14'],
    tags: ['teologia da cruz', 'Lutero', 'theologia crucis', 'sofrimento', 'Deus escondido', 'Kierkegaard'],
    fontes: [
      'Martin Luther, Heidelberg Disputation (1518)',
      'Søren Kierkegaard, Practice in Christianity (1850)',
      'Dietrich Bonhoeffer, The Cost of Discipleship (1937)',
      'Jürgen Moltmann, The Crucified God (1972)'
    ],
    referenciasCruzadas: [
      { referencia: '1 Coríntios 1:18-25', descricao: 'Palavra da cruz e loucura para os que perdem' },
      { referencia: 'Filipenses 2:5-11', descricao: 'Se esvaziou, tomando forma de servo' },
      { referencia: '2 Coríntios 12:9', descricao: 'Minha graça e suficiente' },
      { referencia: 'Galatas 6:14', descricao: 'Longe esteja de mim gloriar-me senao na cruz' }
    ],
    leituraAdicional: [
      { titulo: 'Heidelberg Disputation, Lutero', tipo: 'livro', descricao: 'Teses da theologia crucis' },
      { titulo: 'The Cost of Discipleship, Bonhoeffer', tipo: 'livro', descricao: 'Custo do discipulado' }
    ],
    aplicacaoPratica: 'Nao espere gloria no mundo. Deus age onde menos esperamos — no sofrimento, na fraqueza.',
    contextoHistorico: { periodo: '1518-presente', evento: 'Theologia Crucis', descricao: 'Lutero articulou em 1518. Kierkegaard, Bonhoeffer, Moltmann expandiram.' }
  },

  {
    id: 'neo-038',
    titulo: 'Teologia da Glorificacao — O Futuro do Crente',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Escatologia',
    conteudo: [
      'Glorificacao: etapa final da salvacao. Corpo mortal sera transformado em corpo glorificado.',
      'Romanos 8:30: "Aos que justificou, tambem glorificou" — ja realizado em prospecto.',
      '1 Corintios 15:42-44: corpo corruptivel sera incorruptivel, espiritual, glorioso.',
      'Filipenses 3:20-21: Cristo transformara nosso corpo de humilhacao a gloria.',
      '1 João 3:2: seremos semelhantes a Ele porque o veremos como e.',
      'Glorificacao nao e aniquilacao — e transformacao do que ja existe.'
    ],
    versicosChave: ['Romanos 8:30', '1 Coríntios 15:42-44', 'Filipenses 3:20-21', '1 João 3:2'],
    tags: ['glorificacao', 'ressurreicao', 'corpo glorificado', 'transformacao', 'futuro'],
    fontes: [
      'Anthony Hoekema, The Bible and the Future (1979)',
      'N.T. Wright, Surprised by Hope (2008)',
      'G.C. Berkouwer, The Return of Christ (1972)',
      'Richard Bauckham, The Fate of the Dead (1998)'
    ],
    referenciasCruzadas: [
      { referencia: 'Romanos 8:30', descricao: 'Tambem glorificou' },
      { referencia: '1 Coríntios 15:42-44', descricao: 'Corpo incorruptivel, espiritual' },
      { referencia: 'Filipenses 3:20-21', descricao: 'Transformara corpo de humilhacao' },
      { referencia: '1 João 3:2', descricao: 'Seremos semelhantes a Ele' }
    ],
    leituraAdicional: [
      { titulo: 'Surprised by Hope, Wright', tipo: 'livro', descricao: 'Ressurreicao e glorificacao' }
    ],
    aplicacaoPratica: 'Espere transformacao, nao fuga. O corpo nao e lixo — sera glorificado.',
    contextoHistorico: { periodo: 'Sec. XX-presente', evento: 'Teologia da glorificacao', descricao: 'Wright popularizou. Berkouwer articulou.' }
  },

  {
    id: 'neo-039',
    titulo: 'Teologia do Amor — Agape, Eros e Philia',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Etica Cristã',
    conteudo: [
      'Agape: amor incondicional, sacrificial, sem expectativa de retorno. Amor de Deus.',
      'Eros: amor romântico, desejo, busca posse. Nao e necessariamente egoista.',
      'Philia: amor fraterno, amizade, lealdade.',
      'C.S. Lewis (The Four Loves): agape e a forma mais alta, mas nao anula as outras.',
      'Agape nao e apenas sentimento — e decisao, ato de vontade, praxis.',
      'Amor ao proximo: amar como Cristo nos amou. Inclui inimigos.'
    ],
    versicosChave: ['1 João 4:8', '1 Coríntios 13:4-7', 'Mateus 5:44', 'João 15:13'],
    tags: ['amor', 'agape', 'eros', 'philia', 'C.S. Lewis', 'amor ao proximo', 'inimigos'],
    fontes: [
      'C.S. Lewis, The Four Loves (1960)',
      'Anders Nygren, Agape and Eros (1930)',
      'Mortimer Adler, The Four Dimensions of Philanthropy (1970)',
      'Timothy Keller, The Meaning of Marriage (2011)'
    ],
    referenciasCruzadas: [
      { referencia: '1 João 4:8', descricao: 'Deus e amor' },
      { referencia: '1 Coríntios 13:4-7', descricao: 'O amor e sofredor, benigno' },
      { referencia: 'Mateus 5:44', descricao: 'Amai os vossos inimigos' },
      { referencia: 'João 15:13', descricao: 'Ninguem tem maior amor que este' }
    ],
    leituraAdicional: [
      { titulo: 'The Four Loves, Lewis', tipo: 'livro', descricao: 'Filosofia do amor' },
      { titulo: 'Agape and Eros, Nygren', tipo: 'livro', descricao: 'Contraste entre amor grego e cristao' }
    ],
    aplicacaoPratica: 'Ame com agape: incondicionalmente, sacrificialmente. Isso inclui inimigos.',
    contextoHistorico: { periodo: 'Sec. XX-presente', evento: 'Teologia do amor', descricao: 'Nygren contrastou agape e eros. Lewis integrou. Keller popularizou.' }
  },

  {
    id: 'neo-040',
    titulo: 'Teologia da Esperanca Escatologica — A Vinda de Cristo',
    categoria: 'Teologia Sistemática',
    subcategoria: 'Escatologia',
    conteudo: [
      'Volta de Cristo: evento futuro que consuma historia. Atos 1:11: "Assim como o vistes ir".',
      '1 Tessalonicenses 4:16-17: Senhor descerá, mortos ressuscitarão, vivos serao arrebatados.',
      'Mateus 24-25: sinais da volta — guerras, fomes, terremotes, evangelho as nacoes.',
      '2 Pedro 3:10: "Dia do Senhor" virá como ladrão. Ceus passarão com estrondo.',
      'Apocalipse 19-22: segunda vinda — vitória final, juízo, nova criação.',
      'Esperanca nao e escapismo — engaja transformacao presente.'
    ],
    versicosChave: ['Atos 1:11', '1 Tessalonicenses 4:16-17', 'Mateus 24:30', 'Apocalipse 19:11-16'],
    tags: ['volta de Cristo', 'parusia', 'escatologia', 'ressurreicao', 'juízo', 'nova criacao'],
    fontes: [
      'George Eldon Ladd, A Theology of the New Testament (1974)',
      'N.T. Wright, Surprised by Hope (2008)',
      'Anthony Hoekema, The Bible and the Future (1979)',
      'G.C. Berkouwer, The Return of Christ (1972)'
    ],
    referenciasCruzadas: [
      { referencia: 'Atos 1:11', descricao: 'Assim como o vistes ir' },
      { referencia: '1 Tessalonicenses 4:16-17', descricao: 'Senhor descerá, mortos ressuscitarão' },
      { referencia: 'Mateus 24:30', descricao: 'Filho do homem vindo em nuvens' },
      { referencia: 'Apocalipse 19:11-16', descricao: 'Cristo como guerreiro vitorioso' }
    ],
    leituraAdicional: [
      { titulo: 'Surprised by Hope, Wright', tipo: 'livro', descricao: 'Corrige equivocos sobre volta' }
    ],
    aplicacaoPratica: 'Viva preparado. A volta nao e desculpa para passividade — e motivo de santidade.',
    contextoHistorico: { periodo: 'Sec. I-presente', evento: 'Esperanca da volta', descricao: 'Igreja primitiva aguardava volta imediata. Debate escatologico continua.' }
  }
];
