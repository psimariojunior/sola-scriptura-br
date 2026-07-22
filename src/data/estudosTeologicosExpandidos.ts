export interface EstudoTeologico {
  id: string;
  titulo: string;
  categoria: string;
  subcategoria?: string;
  conteudo: string[];
  versicosChave: string[];
  tags: string[];
  fontes: string[];
}

export const estudosTeologicosExpandidos: EstudoTeologico[] = [
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // 1. DOUTRINAS FUNDAMENTAIS â€” TEOLOGIA PROPER (50 estudos)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'dp-001',
    titulo: 'A ExistÃªncia de Deus â€” Argumentos ClÃ¡ssicos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A questÃ£o da existÃªncia de Deus Ã© uma das mais debatidas na histÃ³ria da filosofia e da teologia. Os argumentos clÃ¡ssicos buscam demonstrar a existÃªncia de Deus pela razÃ£o humana.',
      'O argumento cosmolÃ³gico parte do fato de que tudo que comeÃ§a a existir tem uma causa. Ao retrocedermos na cadeia causal, chegamos a uma Primeira Causa nÃ£o causada â€” Deus.',
      'O argumento teleolÃ³gico observa a ordem e o propÃ³sito na criaÃ§Ã£o como evidÃªncia de um Designer inteligente. A complexidade do universo aponta para um Criador sÃ¡bio.',
      'O argumento ontolÃ³gico, formulado por Anselmo, parte da concepÃ§Ã£o de Deus como o Ser maior do que o qual nada pode ser pensado. Se Deus existe apenas na mente, poderÃ­amos conceber um ser maior.',
      'O argumento moral postula que a existÃªncia de valores morais objetivos exige um fundamento transcendente. Sem Deus, os valores morais sÃ£o meramente convenÃ§Ãµes sociais.'
    ],
    versicosChave: ['Romanos 1:20', 'Salmos 14:1', 'Hebreus 11:6', 'Atos 17:28'],
    tags: ['existÃªncia de Deus', 'argumentos cosmolÃ³gico', 'argumento ontolÃ³gico', 'argumento teleolÃ³gico', 'apologÃ©tica'],
    fontes: ['TomÃ¡s de Aquino, Suma TeolÃ³gica', 'Anselmo, Proslogion', 'C.S. Lewis, Credo', 'Alvin Plantinga, God and Other Minds']
  },
  {
    id: 'dp-002',
    titulo: 'A Trindade â€” MistÃ©rio Central da FÃ©',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A doutrina da Trindade Ã© o mistÃ©rio central da fÃ© cristÃ£: um Ãºnico Deus em trÃªs pessoas â€” Pai, Filho e EspÃ­rito Santo. Cada pessoa Ã© plenamente Deus.',
      'A formulaÃ§Ã£o trinitÃ¡ria emergiu dos debates cristolÃ³gicos dos sÃ©culos III e IV. O ConcÃ­lio de NicÃ©ia estabeleceu que o Filho Ã© homoousios com o Pai.',
      'Agostinho desenvolveu a analogia psicolÃ³gica: a mente se conhece e se ama, gerando verbo e amor. Assim, o Pai gera o Filho, e o EspÃ­rito procede do amor mÃºtuo.',
      'A Trindade nÃ£o Ã© contradiÃ§Ã£o lÃ³gica â€” Ã© paradoxo que transcende a razÃ£o. Deus nÃ£o Ã© trÃªs pessoas no sentido humano, mas trÃªs relaÃ§Ãµes pessoais em uma essÃªncia divina.',
      'A economia da Trindade se manifesta na salvaÃ§Ã£o: o Pai planeja, o Filho executa, o EspÃ­rito aplica. Na criaÃ§Ã£o, o Pai cria pelo Filho no EspÃ­rito.'
    ],
    versicosChave: ['Mateus 28:19', '2 CorÃ­ntios 13:14', 'GÃªnesis 1:26', 'JoÃ£o 1:1-3'],
    tags: ['trindade', 'pneumatologia', 'cristologia', 'homoousios', 'Niceia'],
    fontes: ['Agostinho, De Trinitate', 'AtanÃ¡sio, Contra os Arianos', 'Karl Barth, Church Dogmatics I/1']
  },
  {
    id: 'dp-003',
    titulo: 'A TranscendÃªncia e ImanÃªncia de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'Deus Ã© ao mesmo tempo infinitamente distinto da criaÃ§Ã£o (transcendente) e profundamente presente nela (imanente). Este paradoxo Ã© fundamental para compreender Deus.',
      'A transcendÃªncia significa que Deus estÃ¡ alÃ©m de todas as limitaÃ§Ãµes criadas â€” tempo, espaÃ§o, matÃ©ria. Ã‰ o Deus que habita a luz inacessÃ­vel.',
      'A imanÃªncia significa que Deus estÃ¡ presente em todos os lugares, sustentando a existÃªncia do universo. Atos 17:28 declara: Nele vivemos, nos movemos e existimos.',
      'O equilÃ­brio entre transcendÃªncia e imanÃªncia evita o panteÃ­smo e o deÃ­smo. O Deus bÃ­blico Ã© pessoal e prÃ³ximo, mas tambÃ©m sagrado e transcendente.',
      'A transcendÃªncia gera reverÃªncia e adoraÃ§Ã£o, enquanto a imanÃªncia gera intimidade e confianÃ§a. A oraÃ§Ã£o Ã© possÃ­vel porque Deus Ã© imanente.'
    ],
    versicosChave: ['Jeremias 23:23-24', 'Salmos 139:7-12', 'IsaÃ­as 57:15', 'Atos 17:28'],
    tags: ['transcendÃªncia', 'imanÃªncia', 'panteÃ­smo', 'deÃ­smo', 'apofatismo'],
    fontes: ['Agostinho, ConfissÃµes', 'Pseudo-DionÃ­sio, Nomes Divinos', 'Paul Tillich, Systematic Theology']
  },
  {
    id: 'dp-004',
    titulo: 'A OnisciÃªncia de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A onisciÃªncia de Deus significa que Ele sabe todas as coisas â€” passado, presente e futuro â€” de forma perfeita e simultÃ¢nea.',
      'Deus conhece todas as possibilidades e atualidades. Ele sabe o que Ã©, o que foi, o que serÃ¡ e o que poderia ser.',
      'A questÃ£o do livre-arbÃ­trio parece conflitar com a onisciÃªncia. Se Deus sabe o que faremos, somos realmente livres? A resposta clÃ¡ssica Ã© que Deus sabe sem causar.',
      'A teologia processual propÃµe que Deus conhece o futuro como possibilidades, nÃ£o como certezas absolutas.',
      'A onisciÃªncia Ã© fonte de consolaÃ§Ã£o: Ele conhece nossas necessidades antes que as peÃ§amos. Ã‰ tambÃ©m fonte de temor: nada se esconde dEle.'
    ],
    versicosChave: ['Salmos 139:1-6', '1 JoÃ£o 3:20', 'IsaÃ­as 46:9-10', 'Hebreus 4:13'],
    tags: ['onisciÃªncia', 'omnisciÃªncia', 'livre-arbÃ­trio', 'soberania', 'conhecimento de Deus'],
    fontes: ['Agostinho, ConfissÃµes', 'Calvino, Institutas I.1', 'Charles Hartshorne, The Divine Relativity']
  },
  {
    id: 'dp-005',
    titulo: 'A OmnipotÃªncia de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A omnipotÃªncia de Deus significa que Ele pode fazer tudo o que Ã© logicamente possÃ­vel. Deus nÃ£o pode fazer o logicamente impossÃ­vel.',
      'A BÃ­blia declara que para Deus nada Ã© impossÃ­vel. Deus criou o universo do nada, sustenta tudo pelo poder da Sua palavra e realizarÃ¡ todas as Suas promessas.',
      'A questÃ£o do mal Ã© o principal desafio Ã  omnipotÃªncia. Se Deus pode tudo e Ã© bom, por que permite o sofrimento? A teodiceia responde que Deus permite o mal para um bem maior.',
      'A omnipotÃªncia nÃ£o Ã© poder arbitrÃ¡rio, mas poder governado pela sabedoria e pelo amor. Deus nÃ£o faz o que Ã© contrÃ¡rio Ã  Sua natureza.',
      'Para o crente, a omnipotÃªncia Ã© fonte de confianÃ§a: Posso todas as coisas naquele que me fortalece.'
    ],
    versicosChave: ['Jeremias 32:17', 'EfÃ©sios 1:19-20', 'Lucas 1:37', 'GÃªnesis 18:14'],
    tags: ['omnipotÃªncia', 'poder de Deus', 'teodiceia', 'problema do mal', 'creatio ex nihilo'],
    fontes: ['TomÃ¡s de Aquino, Suma TeolÃ³gica I, q.25', 'C.S. Lewis, O Problema do Sofrimento']
  },
  {
    id: 'dp-006',
    titulo: 'A Santidade de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A santidade de Deus Ã© Seu atributo mais elevado â€” a separaÃ§Ã£o absoluta de tudo o que Ã© impuro e a perfeiÃ§Ã£o moral absoluta.',
      'A santidade implica Sua justiÃ§a: Ele nÃ£o pode tolerar o pecado. A lei moral Ã© reflexo da Sua santidade.',
      'A ira santa de Deus nÃ£o Ã© emoÃ§Ã£o humana, mas Sua oposiÃ§Ã£o moral ao pecado. Ã‰ expressÃ£o de Sua santidade em confronto com o que Ã© mau.',
      'A santidade se manifesta em Sua transcendÃªncia e em Sua imanÃªncia. O EspÃ­rito Santo Ã© o Santo de Deus que habita no crente.',
      'A reverÃªncia Ã© a resposta adequada. O temor do Senhor nÃ£o Ã© medo servil, mas admiraÃ§Ã£o mista com temor, reconhecendo a grandeza divina.'
    ],
    versicosChave: ['IsaÃ­as 6:3', '1 Pedro 1:15-16', 'Hebreus 12:14', 'Apocalipse 4:8'],
    tags: ['santidade de Deus', 'justiÃ§a divina', 'ira santa', 'serafins', 'santificaÃ§Ã£o'],
    fontes: ['Rudolf Otto, O Sagrado', 'Gordon Kaufman, God the Problem', 'John Murray, Redemption Accomplished']
  },
  {
    id: 'dp-007',
    titulo: 'A JustiÃ§a de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A justiÃ§a de Deus Ã© a perfeiÃ§Ã£o moral pela qual Ele age em conformidade com a Sua prÃ³pria natureza santa.',
      'A justiÃ§a divina se manifesta de duas formas: retributiva (castigar o pecado) e distributiva (dar a cada um o que merece).',
      'Paulo em Romanos 3 resolve o conflito entre justiÃ§a e misericÃ³rdia: Deus Ã© justo E justificador daquele que crÃª em Jesus.',
      'A justificaÃ§Ã£o pela fÃ© Ã© declaraÃ§Ã£o divina de que o crente Ã© justo pela justiÃ§a de Cristo imputada.',
      'A justiÃ§a de Deus Ã© tambÃ©m o fundamento da esperanÃ§a escatolÃ³gica: Deus restaurarÃ¡ todas as coisas e punirÃ¡ o mal.'
    ],
    versicosChave: ['Romanos 3:21-26', 'Salmos 89:14', 'IsaÃ­as 61:8', 'Atos 17:31'],
    tags: ['justiÃ§a de Deus', 'justificaÃ§Ã£o', 'propiciaÃ§Ã£o', 'imputaÃ§Ã£o', 'juÃ­zo final'],
    fontes: ['Agostinho, De Spiritu et Littera', 'John Stott, The Cross of Christ']
  },
  {
    id: 'dp-008',
    titulo: 'A MisericÃ³rdia e GraÃ§a de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A misericÃ³rdia de Deus Ã© Seu amor para com os miserÃ¡veis. A graÃ§a Ã© Seu amor gratuito e imerecido.',
      'MisericÃ³rdia Ã© nÃ£o nos dar o que merecemos; graÃ§a Ã© nos dar o que nÃ£o merecemos. Ambas sÃ£o expressÃµes do amor divino.',
      'A graÃ§a tem dimensÃµes: preveniente, regeneradora, justificante, santificadora e glorificadora.',
      'Sola gratia Ã© principio reformado: a salvaÃ§Ã£o Ã© pela graÃ§a de Deus, nÃ£o pelas obras humanas.',
      'A graÃ§a nÃ£o anula a responsabilidade humana â€” ela a capacita. A graÃ§a Ã© gratuita mas nÃ£o custosa: custou a vida do Filho.'
    ],
    versicosChave: ['EfÃ©sios 2:4-5', 'Tito 3:5', 'Romanos 5:8', '1 Pedro 1:10'],
    tags: ['graÃ§a', 'misericÃ³rdia', 'sola gratia', 'graÃ§a preveniente', 'graÃ§a regeneradora'],
    fontes: ['Agostinho, De Gratia et Libero Arbitrio', 'Lutero, De servo arbitrio']
  },
  {
    id: 'dp-009',
    titulo: 'A Eternidade e Imutabilidade de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'Deus Ã© eterno â€” nÃ£o tem comeÃ§o nem fim. O tempo Ã© criaÃ§Ã£o de Deus, mas Ele nÃ£o estÃ¡ sujeito ao tempo.',
      'A imutabilidade significa que Ele nÃ£o muda em Sua natureza, carÃ¡ter, propÃ³sitos ou promessas.',
      'A imutabilidade nÃ£o Ã© estagnaÃ§Ã£o â€” Ã© perfeiÃ§Ã£o constante. Deus nÃ£o precisa mudar porque Ã© perfeito.',
      'A eternidade Ã© fonte de consolaÃ§Ã£o: Suas promessas sÃ£o eternas, Seu amor nÃ£o falha.',
      'A imutabilidade Ã© fundamento de esperanÃ§a: em um mundo de mudanÃ§a, Deus Ã© a rocha imÃ³vel.'
    ],
    versicosChave: ['Malaquias 3:6', 'Hebreus 13:8', 'Salmos 90:2', 'IsaÃ­as 40:28'],
    tags: ['eternidade', 'imutabilidade', 'imortalidade', 'perfeiÃ§Ã£o divina'],
    fontes: ['Agostinho, ConfissÃµes XI', 'A.W. Tozer, The Knowledge of the Holy']
  },
  {
    id: 'dp-010',
    titulo: 'A Soberania de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A soberania de Deus Ã© Seu domÃ­nio absoluto sobre toda a criaÃ§Ã£o. Ele governa todas as coisas segundo a Sua vontade.',
      'A soberania se manifesta em decreto (propÃ³sito eterno) e providÃªncia (execuÃ§Ã£o no tempo).',
      'O calvinismo enfatiza a soberania absoluta; o arminianismo preserva a liberdade humana.',
      'A soberania nÃ£o anula a responsabilidade humana. Deus usa meios humanos para realizar Seus propÃ³sitos.',
      'Para o crente, a soberania Ã© fonte de seguranÃ§a: nada acontece fora do controle de Deus.'
    ],
    versicosChave: ['EfÃ©sios 1:11', 'Romanos 9:19-24', 'Salmos 115:3', 'Daniel 4:35'],
    tags: ['soberania', 'providÃªncia', 'decreto divino', 'calvinismo', 'arminianismo'],
    fontes: ['Calvino, Institutas I.16', 'R.C. Sproul, The Holiness of God']
  },
  {
    id: 'dp-011',
    titulo: 'O Amor de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'O amor de Deus Ã© o atributo que fundamenta todos os outros. Deus nÃ£o apenas ama â€” Ele Ã© amor (1 JoÃ£o 4:8).',
      'O amor divino Ã© incondicional, inesgotÃ¡vel e universal. Ele amou o mundo de tal maneira que deu o Seu Filho.',
      'O amor de Deus nÃ£o depende da dignidade do objeto â€” Ele ama os pecadores. Deus nos amou quando ainda Ã©ramos inimigos.',
      'O amor se manifesta na criaÃ§Ã£o, na providÃªncia, na redenÃ§Ã£o e na glificaÃ§Ã£o final.',
      'O crente Ã© chamado a refletir o amor divino: amar a Deus e ao prÃ³ximo como a si mesmo.'
    ],
    versicosChave: ['1 JoÃ£o 4:8', 'JoÃ£o 3:16', 'Romanos 5:8', 'EfÃ©sios 3:17-19'],
    tags: ['amor de Deus', 'agape', 'amor incondicional', 'amor sacrificial'],
    fontes: ['Anders Nygren, Agape and Eros', 'C.S. Lewis, The Four Loves']
  },
  {
    id: 'dp-012',
    titulo: 'A Fidelidade de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A fidelidade de Deus significa que Ele cumpre todas as Suas promessas. Ele Ã© fiel mesmo quando somos infiÃ©is.',
      'A alianÃ§a de Deus com Israel Ã© modelo de fidelidade: apesar da desobediÃªncia do povo, Deus mantÃ©m Suas promessas.',
      'A fidelidade divina Ã© a base da confianÃ§a do crente: podemos confiar porque Deus Ã© fiel.',
      'A fidelidade se estende a todas as promessas â€” desde a criaÃ§Ã£o atÃ© a consumaÃ§Ã£o final.',
      'Aå“åº” Ã  fidelidade de Deus Ã© obediÃªncia e adoraÃ§Ã£o. O crente responde ao amor com amor, Ã  fidelidade com lealdade.'
    ],
    versicosChave: ['DeuteronÃ´mio 7:9', 'LamentaÃ§Ãµes 3:22-23', '2 TimÃ³teo 2:13', '1 CorÃ­ntios 1:9'],
    tags: ['fidelidade', 'alianÃ§a', 'promessas de Deus', 'confiabilidade'],
    fontes: ['O. Palmer Robertson, The Christ of the Covenants', 'J.I. Packer, Knowing God']
  },
  {
    id: 'dp-013',
    titulo: 'A GraÃ§a Comum',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A graÃ§a comum Ã© a bondade de Deus para com todos os seres humanos, independentemente de sua fÃ©.',
      'Ela se manifesta na providÃªncia: chuva, sol, alimento, governos, cultura, conhecimento.',
      'A graÃ§a comum limita os efeitos do pecado e permite que a civilizaÃ§Ã£o exista.',
      'Ela Ã© distinta da graÃ§a salvÃ­fica â€” nÃ£o salva, mas sustenta e beneficia.',
      'Calvino enfatizou a graÃ§a comum como base para engajamento cultural e transformaÃ§Ã£o social.'
    ],
    versicosChave: ['Mateus 5:45', 'Atos 14:17', 'Romanos 2:4', 'GÃªnesis 9:1-3'],
    tags: ['graÃ§a comum', 'providÃªncia', 'Calvino', 'transformaÃ§Ã£o social'],
    fontes: ['Calvino, Institutas II.2.12', 'Abraham Kuyper, Lectures on Calvinism']
  },
  {
    id: 'dp-014',
    titulo: 'A GraÃ§a Especial (SalvÃ­fica)',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A graÃ§a especial Ã© a obra redentora de Deus que salva os eleitos do pecado e da morte.',
      'Ela inclui: chamado eficaz, regeneraÃ§Ã£o, fÃ©, arrependimento, justificaÃ§Ã£o, santificaÃ§Ã£o e glorificaÃ§Ã£o.',
      'A graÃ§a especial Ã© soberana â€” Deus a confere a quem Ele deseja, nÃ£o por mÃ©rito humano.',
      'Ela Ã© suficiente e eficaz â€” nÃ£o pode ser resistida quando Deus a aplica.',
      'A graÃ§a especial Ã© o fundamento da certeza da salvaÃ§Ã£o: Deus guardarÃ¡ aqueles que Ele chamou.'
    ],
    versicosChave: ['EfÃ©sios 2:8-9', 'Tito 3:5', 'Romanos 8:29-30', 'JoÃ£o 6:44'],
    tags: ['graÃ§a especial', 'graÃ§a salvÃ­fica', 'eleiÃ§Ã£o', 'chamado eficaz'],
    fontes: ['Calvino, Institutas III.24', 'Jonathan Edwards, On the Freedom of the Will']
  },
  {
    id: 'dp-015',
    titulo: 'A PredestinaÃ§Ã£o',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A predestinaÃ§Ã£o Ã© o decreto eterno de Deus de salvar uns e condenar outros. Ã‰ tema central no debate calvinista-arminiano.',
      'O calvinismo sustenta a predestinaÃ§Ã£o incondicional: Deus escolhe antes da fundaÃ§Ã£o do mundo, sem referÃªncia ao mÃ©rito.',
      'O arminianismo sustenta a predestinaÃ§Ã£o condicional: Deus prevÃª quem crerÃ¡ e os predestina baseado na Sua presciÃªncia.',
      'A predestinaÃ§Ã£o nÃ£o anula a responsabilidade humana â€” ambos sÃ£o verdadeiros na BÃ­blia.',
      'A predestinaÃ§Ã£o Ã© fonte de humildade e gratidÃ£o: a salvaÃ§Ã£o Ã© dom de Deus, nÃ£o conquista humana.'
    ],
    versicosChave: ['EfÃ©sios 1:4-5', 'Romanos 8:29-30', '1 Pedro 1:1-2', 'Atos 13:48'],
    tags: ['predestinaÃ§Ã£o', 'eleiÃ§Ã£o', 'calvinismo', 'arminianismo', 'presciÃªncia'],
    fontes: ['Calvino, Institutas III.21', 'Arminius, Obras', 'Roger Olson, Against Calvinism']
  },
  {
    id: 'dp-016',
    titulo: 'A ProvidÃªncia de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A providÃªncia de Deus Ã© Seu governo contÃ­nuo de todas as coisas para realizar Seus propÃ³sitos.',
      'Deus governa tudo: naÃ§Ãµes, natureza, histÃ³ria, destinos individuais. Nada escapa ao Seu controle.',
      'A providÃªncia nÃ£o Ã© fatalismo â€” Deus usa meios humanos. O crente ora e age porque Deus governa atravÃ©s de instrumentos.',
      'A providÃªncia inclui permissÃ£o do mal: Deus permite o pecado sem causÃ¡-lo, para um bem maior.',
      'A providÃªncia Ã© fonte de paz: nada acontece por acaso. Tudo estÃ¡ sob o controle de Deus.'
    ],
    versicosChave: ['Romanos 8:28', 'EfÃ©sios 1:11', 'Salmos 104', 'ProvÃ©rbios 16:9'],
    tags: ['providÃªncia', 'governo divino', 'soberania', 'controle total'],
    fontes: ['Calvino, Institutas I.16-19', 'John Piper, Providence']
  },
  {
    id: 'dp-017',
    titulo: 'A RevelaÃ§Ã£o Geral de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A revelaÃ§Ã£o geral Ã© o conhecimento de Deus disponÃ­vel a todos os seres humanos atravÃ©s da criaÃ§Ã£o e da consciÃªncia.',
      'Romanos 1:19-20 declara que a criaÃ§Ã£o revela a existÃªncia e os atributos de Deus de forma clara e inescusÃ¡vel.',
      'A consciÃªncia moral Ã© evidÃªncia de Deus no coraÃ§Ã£o humano â€” o senso de certo e errado aponta para um Legislador divino.',
      'A revelaÃ§Ã£o geral Ã© suficiente para condenaÃ§Ã£o (deixando o homem sem desculpa) mas nÃ£o para salvaÃ§Ã£o.',
      'A revelaÃ§Ã£o especial (Escritura e Cristo) Ã© necessÃ¡ria para conhecimento salvÃ­fico de Deus.'
    ],
    versicosChave: ['Romanos 1:19-20', 'Salmos 19:1-4', 'Atos 14:17', 'Romanos 2:14-15'],
    tags: ['revelaÃ§Ã£o geral', 'creaÃ§Ã£o', 'consciÃªncia', 'apologÃ©tica'],
    fontes: ['Calvino, Institutas I.5-6', 'John Calvin, Knowledge of God the Creator']
  },
  {
    id: 'dp-018',
    titulo: 'A RevelaÃ§Ã£o Especial â€” Escritura e Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A revelaÃ§Ã£o especial Ã© Deus se comunicando diretamente â€” atravÃ©s da Escritura e da pessoa de Jesus Cristo.',
      'Cristo Ã© a Palavra definitiva de Deus â€” a revelaÃ§Ã£o plena e final. Deus falou de muitas maneiras, mas agora pelo Filho.',
      'A Escritura Ã© Palavra de Deus inspirada, inerrante e suficiente. Ã‰ regra de fÃ© e prÃ¡tica.',
      'A Escritura e Cristo sÃ£o inseparÃ¡veis: a BÃ­blia testifica de Cristo, e Cristo autoriza a BÃ­blia.',
      'A revelaÃ§Ã£o especial Ã© necessÃ¡ria porque a revelaÃ§Ã£o geral Ã© insuficiente para salvaÃ§Ã£o.'
    ],
    versicosChave: ['Hebreus 1:1-2', '2 TimÃ³teo 3:16', 'JoÃ£o 1:1-14', '2 Pedro 1:20-21'],
    tags: ['revelaÃ§Ã£o especial', 'Escritura', 'Cristo', 'inspiraÃ§Ã£o', 'inerrÃ¢ncia'],
    fontes: ['B.B. Warfield, Inspiration and Authority', 'Karl Barth, Church Dogmatics I/1']
  },
  {
    id: 'dp-019',
    titulo: 'O Livre-ArbÃ­trio e a GraÃ§a',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'O livre-arbÃ­trio Ã© a capacidade humana de escolher entre alternativas. A graÃ§a de Deus opera na escolha humana.',
      'O calvinismo sustenta que o livre-arbÃ­trio Ã© escravo â€” o homem caÃ­do nÃ£o pode escolher a Deus sem a graÃ§a regeneradora.',
      'O arminianismo sustenta que a graÃ§a preveniente capacita a escolha humana â€” Deus antecipa Sua graÃ§a.',
      'O debate nÃ£o Ã© se Deus Ã© soberano ou se o homem Ã© livre â€” ambos sÃ£o verdadeiros. O mistÃ©rio permanece.',
      'A prÃ¡tica cristÃ£ pressupÃµe a responsabilidade humana: arrependei-vos, crede, obedecei.'
    ],
    versicosChave: ['DeuteronÃ´mio 30:19', 'JoÃ£o 7:17', 'EfÃ©sios 2:8-9', 'Filipenses 2:12-13'],
    tags: ['livre-arbÃ­trio', 'graÃ§a', 'determinismo', 'calvinismo', 'arminianismo'],
    fontes: ['Jonathan Edwards, Freedom of the Will', 'Roger Olson, Against Calvinism']
  },
  {
    id: 'dp-020',
    titulo: 'A Natureza do Pecado',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'O pecado Ã© rebeliÃ£o contra Deus â€” transgressÃ£o da Sua lei e ofensa Ã  Sua santidade.',
      'O pecado tem origem na queda (GÃªnesis 3) â€” a humanidade herdou uma natureza corrupta.',
      'O pecado Ã© universal: todos pecaram e estÃ£o destituÃ­dos da glÃ³ria de Deus.',
      'O pecado afeta toda a pessoa: mente (cegueira espiritual), coraÃ§Ã£o (desejos distorcidos), vontade (incapacidade moral), corpo (mortalidade).',
      'O pecado Ã© grave porque ofende a um Deus santo e separa o homem de Deus.'
    ],
    versicosChave: ['Romanos 3:23', 'Romanos 6:23', 'GÃªnesis 3:1-24', '1 JoÃ£o 3:4'],
    tags: ['pecado', 'queda', 'natureza pecaminosa', 'separaÃ§Ã£o de Deus'],
    fontes: ['Henri Blocher, Original Sin', 'Calvino, Institutas II.1-3']
  },
  {
    id: 'dp-021',
    titulo: 'A MaldiÃ§Ã£o do Pecado',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A maldiÃ§Ã£o do pecado Ã© a consequÃªncia da desobediÃªncia humana â€” morte, sofrimento, separaÃ§Ã£o de Deus.',
      'A maldiÃ§Ã£o se estende a toda a criaÃ§Ã£o â€” a terra foi amaldiÃ§oada por causa do pecado humano.',
      'Cristo resgatou a humanidade da maldiÃ§Ã£o da lei, fazendo-se maldiÃ§Ã£o por nÃ³s na cruz.',
      'A maldiÃ§Ã£o Ã© superada pela bÃªnÃ§Ã£o em Cristo â€” a redenÃ§Ã£o restaura a comunhÃ£o com Deus.',
      'A maldiÃ§Ã£o final Ã© o lago de fogo â€” separaÃ§Ã£o eterna de Deus para os que rejeitam a salvaÃ§Ã£o.'
    ],
    versicosChave: ['GÃªnesis 3:14-19', 'GÃ¡latas 3:13', 'Romanos 8:20-22', 'Apocalipse 20:10'],
    tags: ['maldiÃ§Ã£o', 'consequÃªncias do pecado', 'GÃªnesis 3', 'redenÃ§Ã£o da maldiÃ§Ã£o'],
    fontes: ['Henri Blocher, Original Sin', 'John Murray, Redemption Accomplished']
  },
  {
    id: 'dp-022',
    titulo: 'A ExpiaÃ§Ã£o de Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A expiaÃ§Ã£o Ã© o ato pelo qual Cristo morreu pelos pecados da humanidade, reconciliando Deus e os homens.',
      'Existem mÃºltiplas teorias: substituiÃ§Ã£o penal, satisfaÃ§Ã£o, ransom, vitÃ³ria (Christus Victor).',
      'A substituiÃ§Ã£o penal sustenta que Cristo sofreu o castigo que merecÃ­amos. Ele morreu em nosso lugar.',
      'A teoria da satisfaÃ§Ã£o, de Anselmo, sustenta que a ofensa Ã  honra de Deus exigia satisfaÃ§Ã£o perfeita.',
      'Christus Victor enfatiza que Cristo venceu SatanÃ¡s, a morte e o inferno na cruz.'
    ],
    versicosChave: ['IsaÃ­as 53:5', '1 Pedro 2:24', '1 JoÃ£o 4:10', 'Romanos 5:8'],
    tags: ['expiaÃ§Ã£o', 'propiciaÃ§Ã£o', 'satisfaÃ§Ã£o', 'Christus Victor', 'substituiÃ§Ã£o'],
    fontes: ['Anselmo, Cur Deus Homo', 'Gustaf AulÃ©n, Christus Victor', 'John Stott, The Cross of Christ']
  },
  {
    id: 'dp-023',
    titulo: 'A RessurreiÃ§Ã£o e a Nova CriaÃ§Ã£o',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A ressurreiÃ§Ã£o dos mortos Ã© doutrina central â€” Cristo ressuscitou, e nÃ³s tambÃ©m ressuscitaremos.',
      'A nova criaÃ§Ã£o Ã© a promessa final: novos cÃ©us e nova terra, onde a justiÃ§a habita.',
      'A ressurreiÃ§Ã£o nÃ£o Ã© imaterialidade â€” Ã© transformaÃ§Ã£o corporal. Cristo ressuscitou com corpo glorificado.',
      'A nova criaÃ§Ã£o nÃ£o Ã© destruiÃ§Ã£o mas restauraÃ§Ã£o â€” Deus renovarÃ¡ todas as coisas.',
      'A esperanÃ§a escatolÃ³gica motiva santificaÃ§Ã£o: se temos esta esperanÃ§a, purificamo-nos.'
    ],
    versicosChave: ['1 CorÃ­ntios 15:20-28', 'Apocalipse 21:1-4', 'Romanos 8:18-25', 'Filipenses 3:20-21'],
    tags: ['ressurreiÃ§Ã£o', 'nova criaÃ§Ã£o', 'escatologia', 'cÃ©u', 'restauraÃ§Ã£o'],
    fontes: ['N.T. Wright, The Resurrection of the Son of God', 'G.K. Beale, The Temple and the Church\'s Mission']
  },
  {
    id: 'dp-024',
    titulo: 'O JuÃ­zo Final',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'O juÃ­zo final Ã© certeza bÃ­blica: todos comparecerÃ£o diante do tribunal de Cristo.',
      'Para os crentes, o juÃ­zo Ã© de recompensa â€” nÃ£o de condenaÃ§Ã£o. Cristo Ã© o juiz justo que recompensa a fidelidade.',
      'Para os incrÃ©dulos, o juÃ­zo Ã© de condenaÃ§Ã£o eterna â€” separaÃ§Ã£o de Deus.',
      'O juÃ­zo Ã© justo: Deus julga conforme as obras, mas a salvaÃ§Ã£o Ã© por graÃ§a.',
      'O juÃ­zo Ã© motivo de vigilÃ¢ncia: vivamos de modo que nÃ£o tenhamos vergonha na Sua vinda.'
    ],
    versicosChave: ['Mateus 25:31-46', 'Romanos 14:10-12', '2 CorÃ­ntios 5:10', 'Apocalipse 20:11-15'],
    tags: ['juÃ­zo final', 'escatologia', 'condenaÃ§Ã£o', 'recompensa', 'tribunal de Cristo'],
    fontes: ['G.E. Ladd, A Theology of the New Testament', 'Robert Mounce, The Book of Revelation']
  },
  {
    id: 'dp-025',
    titulo: 'O Inferno e a Morte Eterna',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'O inferno Ã© realidade bÃ­blica â€” separaÃ§Ã£o eterna de Deus para os que rejeitam a salvaÃ§Ã£o.',
      'Existem diferentes visÃµes: tortura eterna (tradiÃ§Ã£o predominante), aniquilaÃ§Ã£o (destruiÃ§Ã£o final), universalismo (todos serÃ£o salvos).',
      'A BÃ­blia descreve o inferno como fogo, trevas, gemidos â€” sÃ­mbolos de sofrimento e separaÃ§Ã£o.',
      'O inferno Ã© resultado da justiÃ§a de Deus: o pecado exige puniÃ§Ã£o. Mas Deus nÃ£o deseja a morte do Ã­mpio.',
      'A salvaÃ§Ã£o Ã© offers a todos â€” Deus quer que todos sejam salvos. O inferno Ã© a escolha humana, nÃ£o o desejo divino.'
    ],
    versicosChave: ['Mateus 25:46', 'Apocalipse 20:10', '2 Tessalonicenses 1:9', '1 TimÃ³teo 2:3-4'],
    tags: ['inferno', 'morte eterna', 'juÃ­zo', 'condenaÃ§Ã£o', 'universalismo'],
    fontes: ['Edward Fudge, The Fire That Consumes', 'C.S. Lewis, The Great Divorce']
  },
  {
    id: 'dp-026',
    titulo: 'O CÃ©u e a GlorificaÃ§Ã£o',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'O cÃ©u Ã© a comunhÃ£o eterna com Deus â€” a realizaÃ§Ã£o de todo desejo humano.',
      'A glorificaÃ§Ã£o Ã© a transformaÃ§Ã£o final dos crentes â€” corpos glorificados, sem pecado, sem sofrimento.',
      'O cÃ©u nÃ£o Ã© nuvens e harpas â€” Ã© a presenÃ§a de Deus. Estar com Cristo Ã© o cÃ©u.',
      'A nova terra Ã© parte da esperanÃ§a cristÃ£ â€” Deus renovarÃ¡ a criaÃ§Ã£o, nÃ£o a destruirÃ¡.',
      'A esperanÃ§a do cÃ©u motiva a santidade: se temos esta heranÃ§a, vivamos de modo digno.'
    ],
    versicosChave: ['Apocalipse 21:1-4', '1 CorÃ­ntios 15:42-57', 'Filipenses 3:20-21', 'JoÃ£o 14:1-3'],
    tags: ['cÃ©u', 'glorificaÃ§Ã£o', 'nova terra', 'comunhÃ£o eterna', 'corpo glorificado'],
    fontes: ['N.T. Wright, Surprised by Hope', 'Randy Alcorn, Heaven']
  },
  {
    id: 'dp-027',
    titulo: 'A Escatologia Presente â€” JÃ¡ mas Ainda NÃ£o',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A escatologia cristÃ£ Ã© tensional: o Reino de Deus jÃ¡ estÃ¡ presente mas ainda nÃ£o se consumou.',
      'O Reino jÃ¡ estÃ¡ presente em Cristo: Ele venceu SatanÃ¡s, inaugurou o Reino, enviou o EspÃ­rito.',
      'O Reino ainda nÃ£o se consumou: o pecado, a morte e o sofrimento ainda existem.',
      'A Igreja vive nesta tensÃ£o: jÃ¡ salvos mas ainda esperando a plena salvaÃ§Ã£o.',
      'Esta tensÃ£o Ã©.fonte de esperanÃ§a e missionarismo â€” proclamamos o Reino que jÃ¡ comeÃ§ou e aguardamos o que virÃ¡.'
    ],
    versicosChave: ['Mateus 12:28', 'Marcos 1:15', 'Romanos 8:23', '1 CorÃ­ntios 15:20-26'],
    tags: ['jÃ¡ mas ainda nÃ£o', 'Reino presente', 'escatologia', 'tensÃ£o escatolÃ³gica'],
    fontes: ['G.E. Ladd, A Theology of the New Testament', 'Oscar Cullmann, Christ and Time']
  },
  {
    id: 'dp-028',
    titulo: 'Analogia Fidei â€” A Escritura Interpreta a Escritura',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Bibliologia',
    conteudo: [
      'A analogia da fÃ© Ã© princÃ­pio hermenÃªutico: partes da BÃ­blia devem ser interpretadas Ã  luz de outras partes.',
      'A BÃ­blia tem unidade â€” Deus Ã© o autor Ãºnico de todas as Escrituras. NÃ£o hÃ¡ contradiÃ§Ã£o real.',
      'Os textos mais claros devem guiar a interpretaÃ§Ã£o dos mais difÃ­ceis.',
      'A analogia da fÃ© evita interpretaÃ§Ãµes isoladas que contradizem o ensino bÃ­blico como um todo.',
      'Este princÃ­pio Ã© fundamental para a hermenÃªutica reformada e para a ecumenicidade.'
    ],
    versicosChave: ['2 Pedro 1:20-21', '2 TimÃ³teo 3:16-17', 'JoÃ£o 10:35', 'Lucas 24:27'],
    tags: ['analogia da fÃ©', 'hermenÃªutica', 'unidade bÃ­blica', 'interpretaÃ§Ã£o'],
    fontes: ['Calvino, Institutas I.14', 'Geerhardus Vos, Biblical Theology']
  },
  {
    id: 'dp-029',
    titulo: 'Historicidade da ResurreiÃ§Ã£o de Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Cristologia',
    conteudo: [
      'A historicidade da ressurreiÃ§Ã£o Ã© questÃ£o central para a fÃ© cristÃ£. Se Cristo nÃ£o ressuscitou, vÃ£ Ã© a fÃ©.',
      'As evidÃªncias incluem: tÃºmulo vazio, apariÃ§Ãµes mÃºltiplas, transformaÃ§Ã£o dos discÃ­pulos e origem da Igreja.',
      'As apariÃ§Ãµes foram a diversas pessoas: Pedro, os doze, mais de 500, Tiago, Paulo.',
      'A transformaÃ§Ã£o dos discÃ­pulos Ã© evidÃªncia poderosa â€” de Covardes a MÃ¡rtires.',
      'Nenhuma explicaÃ§Ã£o alternativa satisfaz todos os fatos: roubo do corpo, alucinaÃ§Ã£o, mito.'
    ],
    versicosChave: ['1 CorÃ­ntios 15:3-8', 'Mateus 28:1-10', 'Lucas 24:13-35', 'JoÃ£o 20:24-29'],
    tags: ['ressurreiÃ§Ã£o', 'evidÃªncias histÃ³ricas', 'tÃºmulo vazio', 'apariÃ§Ãµes'],
    fontes: ['N.T. Wright, The Resurrection of the Son of God', 'Gary Habermas, The Risen Jesus and Future Hope']
  },
  {
    id: 'dp-030',
    titulo: 'A Segunda Vinda de Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A segunda vinda de Cristo Ã© promessa certa: Assim como o viram subir, assim voltarÃ£o.',
      'SerÃ¡ visÃ­vel, gloriosa, poderosa e inesperada. Todos verÃ£o a vinda do Filho do Homem.',
      'Os sinais incluem: evangelizaÃ§Ã£o mundial, guerras, terremotes, apostasia, perseguÃ§Ã£o.',
      'A segunda vinda Ã© consumaÃ§Ã£o da histÃ³ria â€” Cristo estabelecerÃ¡ o Reino pleno.',
      'Vigiar e orar Ã© a resposta adequada: nÃ£o sabemos o dia nem a hora.'
    ],
    versicosChave: ['Mateus 24:30-31', '1 Tessalonicenses 4:16-17', 'Atos 1:11', 'Apocalipse 1:7'],
    tags: ['segunda vinda', 'parousia', 'escatologia', 'sinais', 'vigilÃ¢ncia'],
    fontes: ['G.E. Ladd, The Blessed Hope', 'George Eldon Ladd, The Gospel of the Kingdom']
  },
  {
    id: 'dp-031',
    titulo: 'O MilÃªnio â€” Reino Milenar de Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'O milÃªnio Ã© o perÃ­odo de 1000 anos mencionado em Apocalipse 20. Existem trÃªs visÃµes principais.',
      'O prÃ©-milenarismo sustenta que Cristo voltarÃ¡ antes do milÃªnio, estabelecendo Seu reino visÃ­vel na terra.',
      'O pÃ³s-milenarismo sustenta que o mundo serÃ¡ cristianizado antes do retorno de Cristo.',
      'O amilenarismo sustenta que o milÃªnio Ã© perÃ­odo espiritual simbÃ³lico â€” o reinho atual de Cristo no cÃ©u.',
      'A BÃ­blia nÃ£o Ã© clara sobre a ordem dos eventos â€” a unidade na fÃ© Ã© mais importante que acordo cronolÃ³gico.'
    ],
    versicosChave: ['Apocalipse 20:1-6', 'IsaÃ­as 11:6-9', 'RevelaÃ§Ã£o 20:4', '2 Pedro 3:10-13'],
    tags: ['milÃªnio', 'prÃ©-milenarismo', 'pÃ³s-milenarismo', 'amilenarismo'],
    fontes: ['Robert Gundry, The Church and the Tribulation', 'George Eldon Ladd, The Gospel of the Kingdom']
  },
  {
    id: 'dp-032',
    titulo: 'A ComunhÃ£o dos Santos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A comunhÃ£o dos santos Ã© a unidade espiritual de todos os crentes em Cristo, vivos e mortos.',
      'NÃ£o hÃ¡ separaÃ§Ã£o entre Igreja terrena e celestial â€” todos sÃ£o um em Cristo.',
      'A comunhÃ£o se manifesta na oraÃ§Ã£o, na adoraÃ§Ã£o, no testemunho e na partilha de dons.',
      'Os santos falecidos continuam conosco em Cristo â€” nÃ£o estÃ£o ausentes, mas presentes no Senhor.',
      'Esta comunhÃ£o Ã©.fonte de fortalecimento: nÃ£o estamos sozinhos â€” somos multidÃ£o de testemunhas.'
    ],
    versicosChave: ['Hebreus 12:1', 'EfÃ©sios 4:4-6', 'Romanos 12:4-5', '1 CorÃ­ntios 12:12-27'],
    tags: ['comunhÃ£o dos santos', 'Igreja invisÃ­vel', 'unidade espiritual'],
    fontes: ['Calvino, Institutas IV.1', 'Henri de Lubac, Catholicism']
  },
  {
    id: 'dp-033',
    titulo: 'A OraÃ§Ã£o â€” ComunhÃ£o com Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'A oraÃ§Ã£o Ã© comunhÃ£o direta com Deus â€” falar e ouvir, pedir e agradecer, confessar e adorar.',
      'O modelo de oraÃ§Ã£o Ã© o Pai Nosso (Mateus 6:9-13) â€” adoraÃ§Ã£o, petiÃ§Ã£o, confissÃ£o, proteÃ§Ã£o.',
      'A oraÃ§Ã£o nÃ£o muda Deus â€” muda a pessoa que ora. Ela Ã© meio de graÃ§a pelo qual crescemos em comunhÃ£o.',
      'A oraÃ§Ã£o deve ser constante (1 Tessalonicenses 5:17), cheia de fÃ© (Tiago 1:6) e submissa Ã  vontade de Deus.',
      'O EspÃ­rito Santo intercede por nÃ³s com gemidos inexprimÃ­veis (Romanos 8:26-27).'
    ],
    versicosChave: ['Mateus 6:9-13', '1 Tessalonicenses 5:17', 'Romanos 8:26-27', 'Tiago 5:16'],
    tags: ['oraÃ§Ã£o', 'comunhÃ£o', 'Pai Nosso', 'intercessÃ£o', 'EspÃ­rito Santo'],
    fontes: ['Martin Luther, A Simple Way to Pray', 'Richard Foster, Prayer']
  },
  {
    id: 'dp-034',
    titulo: 'A AdoraÃ§Ã£o â€” O PropÃ³sito da Vida',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'A adoraÃ§Ã£o Ã© reconhecer o valor supremo de Deus e responder com reverÃªncia, amor e obediÃªncia.',
      'A adoraÃ§Ã£o nÃ£o Ã© apenas mÃºsica â€” Ã© toda a vida vivida para a glÃ³ria de Deus.',
      'A adoraÃ§Ã£o espiritual Ã© em espÃ­rito e em verdade (JoÃ£o 4:23-24) â€” autÃªntica e fundamentada na verdade bÃ­blica.',
      'A adoraÃ§Ã£o coletiva na Igreja Ã© central â€” nÃ£o Ã© opcional mas necessÃ¡ria.',
      'O cÃ©u Ã© adoraÃ§Ã£o eterna â€” a vida cristÃ£ Ã© preparaÃ§Ã£o para a adoraÃ§Ã£o final.'
    ],
    versicosChave: ['JoÃ£o 4:23-24', 'Romanos 12:1-2', 'Salmos 95:6', 'Apocalipse 4:8-11'],
    tags: ['adoraÃ§Ã£o', 'culto', 'glÃ³ria de Deus', 'vida cristÃ£'],
    fontes: ['John Piper, Let the Nations Be Glad', 'Ralph P. Martin, Worship in the Early Church']
  },
  {
    id: 'dp-035',
    titulo: 'O Discipulado â€” Seguindo a Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'O discipulado Ã© seguir a Cristo como Senhor â€” nÃ£o apenas crer, mas obedecer e transformar-se.',
      'Jesus chamou para seguir: Venhe depois de mim. O discipulado Ã© relacionamento pessoal com Cristo.',
      'O custo do discipulado Ã© alto: negar-se a si mesmo, tomar a cruz, perder a vida para encontrÃ¡-la.',
      'O discipulado Ã© comunitÃ¡rio â€” nÃ£o Ã© individualismo. Fazemos discÃ­pulos em comunhÃ£o.',
      'O discipulado Ã© processo de transformaÃ§Ã£o Ã  imagem de Cristo â€” crescer em graÃ§a e conhecimento.'
    ],
    versicosChave: ['Mateus 16:24', 'Lucas 9:23', 'Mateus 28:19-20', '2 CorÃ­ntios 3:18'],
    tags: ['discipulado', 'seguir a Cristo', 'cruz', 'transformaÃ§Ã£o', 'comunidade'],
    fontes: ['Dietrich Bonhoeffer, O Custo do Discipulado', 'Dallas Willard, The Great Omission']
  },
  {
    id: 'dp-036',
    titulo: 'A ConsciÃªncia â€” Guia Moral Interior',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ã‰tica CristÃ£',
    conteudo: [
      'A consciÃªncia Ã© a faculdade moral que distingue certo de errado. Ã‰ dom de Deus, mas pode ser educada.',
      'A consciÃªncia nÃ£o Ã© infalÃ­vel â€” pode ser corrompida pelo pecado, pela cultura, pela falsa religiÃ£o.',
      'A consciÃªncia deve ser formada pela Palavra de Deus â€” nÃ£o apenas pela tradiÃ§Ã£o ou sentimento.',
      'Paulo distingue boa consciÃªncia (formada pela verdade) de mÃ¡ consciÃªncia (defeituosa).',
      'A liberdade de consciÃªncia Ã© direito cristÃ£o â€” ninguÃ©m deve ser forÃ§ado contra sua consciÃªncia.'
    ],
    versicosChave: ['Romanos 2:14-15', '1 TimÃ³teo 1:5', 'Hebreus 9:14', '1 CorÃ­ntios 8:7'],
    tags: ['consciÃªncia', 'Ã©tica', 'liberdade de consciÃªncia', 'moralidade'],
    fontes: ['Calvino, Institutas III.20', 'Martin Luther, A Libertation do Livre ArbÃ­trio']
  },
  {
    id: 'dp-037',
    titulo: 'A SantificaÃ§Ã£o Progressiva',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A santificaÃ§Ã£o progressiva Ã© o crescimento contÃ­nuo em santidade pela graÃ§a de Deus.',
      'NÃ£o Ã© perfeiÃ§Ã£o instantÃ¢nea mas processo gradual â€” morrer para o pecado e viver para a justiÃ§a.',
      'O meio da santificaÃ§Ã£o inclui: Palavra de Deus, oraÃ§Ã£o, comunhÃ£o dos santos, sacramentos, obediÃªncia.',
      'O EspÃ­rito Santo Ã© o agente da santificaÃ§Ã£o â€” Ele transforma a vida do crente.',
      'A santificaÃ§Ã£o Ã© cooperativa: Deus opera, o crente obedece.'
    ],
    versicosChave: ['1 Tessalonicenses 4:3', 'Filipenses 2:12-13', 'Hebreus 12:14', '2 CorÃ­ntios 3:18'],
    tags: ['santificaÃ§Ã£o', 'crescimento espiritual', 'progresso', 'processo'],
    fontes: ['John Owen, MortificaÃ§Ã£o do Pecado', 'J.I. Packer, Keep in Step with the Spirit']
  },
  {
    id: 'dp-038',
    titulo: 'A JustificaÃ§Ã£o â€” DeclaraÃ§Ã£o de JustiÃ§a',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A justificaÃ§Ã£o Ã© declaraÃ§Ã£o judicial de Deus de que o pecador Ã© justo pela fÃ© em Cristo.',
      'NÃ£o Ã© transformaÃ§Ã£o moral (isso Ã© santificaÃ§Ã£o) â€” Ã© mudanÃ§a de status diante de Deus.',
      'A imputaÃ§Ã£o Ã© central: a justiÃ§a de Cristo Ã© creditada ao crente; o pecado Ã© creditado a Cristo.',
      'A fÃ© Ã© meio, nÃ£o mÃ©rito. Somos justificados pela fÃ© sem as obras da lei.',
      'A justificaÃ§Ã£o Ã© certeza: quem crÃª tem justiÃ§a de Deus e nÃ£o serÃ¡ condenado.'
    ],
    versicosChave: ['Romanos 3:21-28', 'GÃ¡latas 2:16', 'EfÃ©sios 2:8-9', 'Romanos 5:1'],
    tags: ['justificaÃ§Ã£o', 'imputaÃ§Ã£o', 'fÃ©', 'justiÃ§a de Cristo', 'sola fide'],
    fontes: ['Lutero, Galatas ComentÃ¡rio', 'Michael Horton, Justification']
  },
  {
    id: 'dp-039',
    titulo: 'A adoÃ§Ã£o â€” Filhos de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A adoÃ§Ã£o Ã© o ato pelo qual Deus nos torna Seus filhos â€” nÃ£o por natureza, mas por graÃ§a.',
      'A adoÃ§Ã£o inclui: perdÃ£o, nova identidade, heranÃ§a, acesso direto a Deus, assistÃªncia do EspÃ­rito.',
      'O EspÃ­rito Santo testifica com nosso espÃ­rito de que somos filhos de Deus (Romanos 8:16).',
      'A adoÃ§Ã£o Ã© presente e futura: jÃ¡ somos filhos, mas aguardamos a plena manifestaÃ§Ã£o.',
      'A adoÃ§Ã£o Ã© fonte de seguranÃ§a: nada pode nos separar do amor de Deus em Cristo.'
    ],
    versicosChave: ['Romanos 8:14-17', 'GÃ¡latas 4:4-7', 'EfÃ©sios 1:5', '1 JoÃ£o 3:1-2'],
    tags: ['adoÃ§Ã£o', 'filiaÃ§Ã£o divina', 'filhos de Deus', 'heranÃ§a'],
    fontes: ['Calvino, Institutas III.17', 'J.I. Packer, Knowing God']
  },
  {
    id: 'dp-040',
    titulo: 'A RedenÃ§Ã£o â€” Compra da Liberdade',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A redenÃ§Ã£o Ã© o ato pelo qual Cristo nos resgatou da escravidÃ£o do pecado pelo Seu sangue.',
      'A metÃ¡fora redentora vem do mercado de escravos â€” Cristo pagou o preÃ§o para nos libertar.',
      'O preÃ§o foi Sua prÃ³pria vida â€” o sangue precioso de Cristo.',
      'A redenÃ§Ã£o Ã© completa: passada (libertados do poder do pecado), presente (libertados da escravidÃ£o), futura (libertados da presenÃ§a do pecado).',
      'A redenÃ§Ã£o Ã© universal em offer mas eficaz nos eleitos.'
    ],
    versicosChave: ['EfÃ©sios 1:7', '1 Pedro 1:18-19', 'Colossenses 1:13-14', 'EfÃ©sios 2:12'],
    tags: ['redenÃ§Ã£o', 'resgate', 'sangue de Cristo', 'libertaÃ§Ã£o'],
    fontes: ['John Murray, Redemption Accomplished and Applied', 'Calvino, Institutas II.16']
  },
  {
    id: 'dp-041',
    titulo: 'A ReconciliaÃ§Ã£o â€” RestauraÃ§Ã£o da Amizade',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A reconciliaÃ§Ã£o Ã© a restauraÃ§Ã£o da relaÃ§Ã£o entre Deus e os homens, que estava quebrada pelo pecado.',
      'O homem era inimigo de Deus â€” a reconciliaÃ§Ã£o remove a hostilidade e restaura a amizade.',
      'Cristo Ã© o meio da reconciliaÃ§Ã£o: pela cruz, Ele satisfez a justiÃ§a divina e removeu o obstÃ¡culo.',
      'A reconciliaÃ§Ã£o Ã© iniciativa divina â€” Deus nos reconciliou consigo em Cristo.',
      'A reconciliaÃ§Ã£o implica reconciliaÃ§Ã£o mÃºtua: reconciliados com Deus, devemos reconciliar uns com os outros.'
    ],
    versicosChave: ['2 CorÃ­ntios 5:18-20', 'Romanos 5:10', 'EfÃ©sios 2:14-16', 'Colossenses 1:19-22'],
    tags: ['reconciliaÃ§Ã£o', 'inimizade', 'paz com Deus', 'ministÃ©rio da reconciliaÃ§Ã£o'],
    fontes: ['Calvino, Institutas II.16', 'John Stott, The Cross of Christ']
  },
  {
    id: 'dp-042',
    titulo: 'A GlorificaÃ§Ã£o â€” Plenitude Final',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A glorificaÃ§Ã£o Ã© a etapa final da salvaÃ§Ã£o â€” transformaÃ§Ã£o completa Ã  imagem de Cristo.',
      'Inclui: corpos glorificados, ausÃªncia total de pecado, plena presenÃ§a de Deus.',
      'A glorificaÃ§Ã£o Ã© certa para todos os crentes â€” Deus comeÃ§arÃ¡ e completarÃ¡ a boa obra.',
      'A glorificaÃ§Ã£o Ã© simultÃ¢nea com a ressurreiÃ§Ã£o â€” transformaÃ§Ã£o instantÃ¢nea.',
      'A glorificaÃ§Ã£o Ã© o culminar da obra redentora â€” a criaÃ§Ã£o restaurada em plenitude.'
    ],
    versicosChave: ['Romanos 8:30', '1 CorÃ­ntios 15:51-57', 'Filipenses 3:20-21', '1 JoÃ£o 3:2'],
    tags: ['glorificaÃ§Ã£o', 'transformaÃ§Ã£o', 'corpo glorificado', 'consumaÃ§Ã£o'],
    fontes: ['John Murray, Redemption Accomplished', 'N.T. Wright, Surprised by Hope']
  },
  {
    id: 'dp-043',
    titulo: 'A FÃ© â€” ConfianÃ§a em Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A fÃ© Ã© confianÃ§a pessoal em Deus e em Sua Palavra â€” nÃ£o apenas conhecimento intelectual.',
      'A fÃ© inclui: conhecimento (assentimento), confianÃ§a (fidÃºcia) e compromisso (obediÃªncia).',
      'A fÃ© Ã© dom de Deus, nÃ£o mÃ©rito humano â€” Deus a concede para que creiamos.',
      'A fÃ© se prova pelas obras â€” nÃ£o Ã© sentimento subjetivo mas vida transformada.',
      'A fÃ© Ã© meio da salvaÃ§Ã£o â€” pela fÃ© recebemos a justiÃ§a de Cristo.'
    ],
    versicosChave: ['Hebreus 11:1', 'Romanos 10:17', 'EfÃ©sios 2:8-9', 'Tiago 2:14-26'],
    tags: ['fÃ©', 'confianÃ§a', 'crenÃ§a', 'obediÃªncia', 'dom de Deus'],
    fontes: ['Calvino, Institutas III.2', 'W.G.T. Shedd, Dogmatic Theology']
  },
  {
    id: 'dp-044',
    titulo: 'O Arrependimento â€” Volta para Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'O arrependimento Ã© mudanÃ§a de mente que resulta em mudanÃ§a de direÃ§Ã£o â€” voltar-se de Deus para o pecado.',
      'O arrependimento Ã© obra do EspÃ­rito Santo â€” Ele convence do pecado e conduz ao arrependimento.',
      'O arrependimento verdadeiro inclui: reconhecimento do pecado, arrependimento, confissÃ£o e abandono do pecado.',
      'O arrependimento nÃ£o Ã© sentimento passageiro mas mudanÃ§a de vida.',
      'O arrependimento Ã© chamado constante: Arrependei-vos, porque Ã© chegado o Reino.'
    ],
    versicosChave: ['Atos 2:38', 'Mateus 4:17', '2 CorÃ­ntios 7:10', '1 JoÃ£o 1:8-9'],
    tags: ['arrependimento', 'conversÃ£o', 'mudanÃ§a', 'confissÃ£o', 'perdÃ£o'],
    fontes: ['Calvino, Institutas III.3', 'Donald Bloesch, The Holy Spirit']
  },
  {
    id: 'dp-045',
    titulo: 'A PerseveranÃ§a dos Santos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A perseveranÃ§a dos santos sustenta que todos os que sÃ£o verdadeiramente regenerados perseverarÃ£o atÃ© o fim.',
      'Deus guarda os Seus eleitos â€” ninguÃ©m pode arrancÃ¡-los das Suas mÃ£os.',
      'A perseveranÃ§a nÃ£o Ã© presunÃ§Ã£o â€” Ã© confianÃ§a na fidelidade de Deus, manifestada em obediÃªncia.',
      'Os que apostatam provam que nunca foram verdadeiramente regenerados.',
      'A perseveranÃ§a Ã© motivada pela esperanÃ§a: Deus Ã© fiel e completarÃ¡ o que comeÃ§ou.'
    ],
    versicosChave: ['JoÃ£o 10:27-30', 'Filipenses 1:6', 'Romanos 8:38-39', '1 JoÃ£o 2:19'],
    tags: ['perseveranÃ§a', 'seguranÃ§a eterna', 'fidelidade de Deus', 'eleiÃ§Ã£o'],
    fontes: ['Calvino, Institutas III.24', 'Tom Schreiner, The Race Set Before Us']
  },
  {
    id: 'dp-046',
    titulo: 'A Unidade da Igreja',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A unidade da Igreja Ã© vontade de Cristo: Para que todos sejam um.',
      'A unidade nÃ£o Ã© uniformidade â€” pode haver diversidade sem comprometimento da unidade essencial.',
      'A divisÃ£o da Igreja Ã© escÃ¢ndalo que fere o testemunho cristÃ£o.',
      'A unidade Ã© escatolÃ³gica â€” serÃ¡ plena no cÃ©u. Na terra, buscamos sem comprometer a verdade.',
      'O diÃ¡logo ecumÃªnico deve ser conduzido com amor e verdade.'
    ],
    versicosChave: ['JoÃ£o 17:20-23', 'EfÃ©sios 4:1-6', '1 CorÃ­ntios 1:10', 'Filipenses 2:1-4'],
    tags: ['unidade', 'ecumenismo', 'divisÃ£o', 'diversidade', 'comunhÃ£o'],
    fontes: ['Miroslav Volf, After Our Likeness', 'Lesslie Newbigin, The Gospel in a Pluralist Society']
  },
  {
    id: 'dp-047',
    titulo: 'A Disciplina EclesiÃ¡stica',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A disciplina eclesiÃ¡stica Ã© responsabilidade da Igreja de manter a pureza doutrinal e moral.',
      'A disciplina tem dois tipos: formativa (ensino correto) e corretiva (repreensÃ£o e restauraÃ§Ã£o)',
      'O objetivo nÃ£o Ã© puniÃ§Ã£o mas restauraÃ§Ã£o â€” trazer o pecador de volta.',
      'Mateus 18:15-20 Ã© o modelo bÃ­blico: confronto privado, testemunhas, igreja, excomunhÃ£o.',
      'A disciplina Ã© ato de amor â€” proteger a Igreja e buscar o bem do pecador.'
    ],
    versicosChave: ['Mateus 18:15-20', '1 CorÃ­ntios 5:1-13', '2 Tessalonicenses 3:6-15', 'GÃ¡latas 6:1'],
    tags: ['disciplina', 'restauraÃ§Ã£o', 'pureza da Igreja', 'excomunhÃ£o'],
    fontes: ['Calvino, Institutas IV.12', 'Jonathan Leeman, Church Discipline']
  },
  {
    id: 'dp-048',
    titulo: 'A Igreja Local e a Igreja Universal',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A Igreja universal Ã© o corpo de Cristo composto por todos os crentes de todos os tempos e lugares.',
      'A Igreja local Ã© a expressÃ£o concreta da Igreja em um lugar especÃ­fico â€” assembleia de crentes.',
      'A Igreja local Ã© imagem da universal â€” nÃ£o substitui mas representa.',
      'A Igreja local deve buscar pureza, verdade e amor â€” reflexo da Igreja perfeita.',
      'A comunhÃ£o entre Igrejas locais Ã© expressÃ£o da unidade universal.'
    ],
    versicosChave: ['EfÃ©sios 4:4-6', 'Hebreus 10:24-25', 'Mateus 16:18', 'EfÃ©sios 2:19-22'],
    tags: ['igreja local', 'igreja universal', 'comunhÃ£o', 'assembleia'],
    fontes: ['Edmund Clowney, The Church', 'Veli-Matti KÃ¤rkkÃ¤inen, An Introduction to Ecclesiology']
  },
  {
    id: 'dp-049',
    titulo: 'Os Sacramentos â€” Batismo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'O batismo Ã© sinal externo de graÃ§a interna â€” identificaÃ§Ã£o com Cristo na morte e ressurreiÃ§Ã£o.',
      'Sepultados com Ele no batismo. O batismo Ã© ato de obediÃªncia e testemunho pÃºblico.',
      'A questÃ£o batismal divide: pedobatismo (crentes e filhos) versus credobatismo (apenas crentes).',
      'O batismo nÃ£o salva â€” Ã© sinal de salvaÃ§Ã£o jÃ¡ recebida pela fÃ©.',
      'O batismo Ã© marca de pertenÃ§a Ã  Igreja â€” incorporaÃ§Ã£o ao corpo de Cristo.'
    ],
    versicosChave: ['Mateus 28:19', 'Romanos 6:3-4', 'Atos 2:38', 'Colossenses 2:12'],
    tags: ['batismo', 'sacramento', 'pedobatismo', 'credobatismo', 'identificaÃ§Ã£o'],
    fontes: ['Calvino, Institutas IV.15', 'Paul Jewett, Infant Baptism and the Covenant of Grace']
  },
  {
    id: 'dp-050',
    titulo: 'Os Sacramentos â€” Ceia do Senhor',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A Ceia do Senhor Ã© commemoraÃ§Ã£o da morte de Cristo e antecipaÃ§Ã£o daCeia celestial.',
      'Fazei isto em memÃ³ria de mim. A Ceia Ã© memorial, comunhÃ£o e antecipaÃ§Ã£o.',
      'As visÃµes variam: transubstanciaÃ§Ã£o (catÃ³lica), consubstanciaÃ§Ã£o (luterana), memorialismo (Zwinglio).',
      'A Ceia nÃ£o Ã© sacrifÃ­cio repetido â€” Ã© commemoraÃ§Ã£o do sacrifÃ­cio Ãºnico de Cristo.',
      'A Ceia Ã© ato comunitÃ¡rio â€” celebraÃ§Ã£o da Igreja em comunhÃ£o com Cristo e uns com os outros.'
    ],
    versicosChave: ['1 CorÃ­ntios 11:23-26', 'Mateus 26:26-29', 'Lucas 22:19-20', 'JoÃ£o 6:53-56'],
    tags: ['Ceia do Senhor', 'Eucaristia', 'comunhÃ£o', 'memorial', 'sacramento'],
    fontes: ['Calvino, Institutas IV.17', 'John Jeffery, A Theological Guide to Calvin\'s Institutes']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // ANGELOLOGIA / DEMONOLOGIA
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'ad-001',
    titulo: 'A Natureza e Hierarquia dos Anjos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Angelologia',
    conteudo: [
      'Os anjos sÃ£o seres espirituais criados por Deus para servi-Lo e servir aos homens.',
      'A hierarquia inclui querubins, serafins, arcanjos e anjos da presenÃ§a.',
      'Os anjos sÃ£o pessoais â€” tÃªm nomes, inteligÃªncia, vontade e emoÃ§Ãµes.',
      'A BÃ­blia nÃ£o apoia a adoraÃ§Ã£o de anjos â€” eles sÃ£o servos, nÃ£o objeto de culto.',
      'O estudo dos anjos revela a realidade espiritual invisÃ­vel.'
    ],
    versicosChave: ['Hebreus 1:14', 'EfÃ©sios 6:12', 'Apocalipse 4:8', 'Lucas 1:26-38'],
    tags: ['anjos', 'hierarquia angelical', 'querubins', 'serafins', 'realidade espiritual'],
    fontes: ['Agostinho, De Civitate Dei', 'TomÃ¡s de Aquino, Suma TeolÃ³gica I, q.50-64']
  },
  {
    id: 'ad-002',
    titulo: 'SatanÃ¡s e os DemÃ´nios',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Demonologia',
    conteudo: [
      'SatanÃ¡s Ã© um anjo caÃ­do, originalmente belo e poderoso. Sua queda Ã© por orgulho.',
      'SatanÃ¡s tem mÃºltiplos tÃ­tulos: AdversÃ¡rio, Diabo, Tentador, PrÃ­ncipe deste mundo.',
      'Os demÃ´nios sÃ£o anjos caÃ­dos que atuam na tentaÃ§Ã£o e opressÃ£o.',
      'A vitÃ³ria sobre SatanÃ¡s foi conquistada na cruz.',
      'O crente pode resistir a SatanÃ¡s pela fÃ©, oraÃ§Ã£o e Palavra.'
    ],
    versicosChave: ['EfÃ©sios 6:11-18', '1 Pedro 5:8', 'Tiago 4:7', 'Apocalipse 12:9'],
    tags: ['satanÃ¡s', 'demÃ´nios', 'caÃ­da', 'tentaÃ§Ã£o', 'guerra espiritual'],
    fontes: ['Michael Heiser, The Unseen Realm', 'Gregory Boyd, God at War']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // BIBLIOLOGIA
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'bi-001',
    titulo: 'A InspiraÃ§Ã£o da Escritura',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Bibliologia',
    conteudo: [
      'A inspiraÃ§Ã£o significa que Deus Ã© o autor Ãºltimo das Escrituras, usando homens como instrumentos.',
      'A inspiraÃ§Ã£o verbal plenÃ¡ria sustenta que cada palavra Ã© inspirada.',
      'A inspiraÃ§Ã£o nÃ£o Ã© ditado mecÃ¢nico â€” Deus usou personalidade e estilo de cada autor.',
      'A inerrÃ¢ncia sustenta que a BÃ­blia, no original, Ã© verdadeira em tudo.',
      'A teologia liberal reduz a BÃ­blia a documento humano â€” a ortodoxia sustenta a superintendÃªncia divina.'
    ],
    versicosChave: ['2 TimÃ³teo 3:16', '2 Pedro 1:20-21', 'Hebreus 4:12', 'Salmos 19:7'],
    tags: ['inspiraÃ§Ã£o', 'inerrÃ¢ncia', 'infalibilidade', 'verbal plenÃ¡ria'],
    fontes: ['B.B. Warfield, Inspiration and Authority', 'Kevin DeYoung, Taking God at His Word']
  },
  {
    id: 'bi-002',
    titulo: 'A Autoridade da Escritura',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Bibliologia',
    conteudo: [
      'A autoridade da Escritura significa que a BÃ­blia Ã© Palavra de Deus com direito de governar fÃ© e prÃ¡tica.',
      'Sola Scriptura Ã© principio reformado: a BÃ­blia Ã© autoridade infalÃ­vel.',
      'A autoridade nÃ£o vem da Igreja, mas de Deus que a inspirou.',
      'A autoridade se estende a toda a Escritura â€” Antigo e Novo Testamento.',
      'A secularizaÃ§Ã£o desafia a BÃ­blia â€” a resposta Ã© hermenÃªutica madura.'
    ],
    versicosChave: ['2 Pedro 1:20-21', 'JoÃ£o 10:35', 'IsaÃ­as 40:8', 'Mateus 24:35'],
    tags: ['autoridade bÃ­blica', 'sola Scriptura', 'inerrÃ¢ncia'],
    fontes: ['Lutero, A Captividade BabilÃ´nica', 'Calvino, Institutas I.7-8']
  },
  {
    id: 'bi-003',
    titulo: 'PrincÃ­pios HermenÃªuticos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Bibliologia',
    conteudo: [
      'A hermenÃªutica Ã© a arte de interpretar a BÃ­blia. PrincÃ­pios fundamentais incluem contextualizaÃ§Ã£o e analogia da fÃ©.',
      'A interpretaÃ§Ã£o literal (gramatical-histÃ³rica) busca o sentido que o autor quis comunicar.',
      'O AT deve ser interpretado Ã  luz do NT â€” Cristo Ã© o centro.',
      'Os gÃªneros literÃ¡rios requerem mÃ©todos diferentes.',
      'A interpretaÃ§Ã£o depende da tradiÃ§Ã£o da Igreja.'
    ],
    versicosChave: ['2 TimÃ³teo 2:15', '1 CorÃ­ntios 2:12-14', 'Lucas 24:27'],
    tags: ['hermenÃªutica', 'interpretaÃ§Ã£o', 'literal', 'gramatical-histÃ³rico'],
    fontes: ['D.A. Carson, Exegetical Fallacies', 'Gordon Fee, How to Read the Bible for All Its Worth']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // 2. TEMAS POR LIVRO (100+ estudos)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'tl-001',
    titulo: 'GÃªnesis â€” CriaÃ§Ã£o e Ordem CÃ³smica',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'GÃªnesis 1-2 apresenta a criaÃ§Ã£o do universo por Deus com ordem, propÃ³sito e bondade.',
      'Deus cria pela Sua palavra e mostra-se pessoal. O homem Ã© a culminaÃ§Ã£o â€” criado Ã  imagem de Deus.',
      'O relato nÃ£o Ã© livro cientÃ­fico mas teolÃ³gico. Responde a quem e por quÃª.',
      'A criaÃ§Ã£o Ã© gratuita â€” criou por amor, para comunhÃ£o.',
      'O descanso no sÃ©timo dia Ã© padrÃ£o criacional â€” ritmo de trabalho e descanso.'
    ],
    versicosChave: ['GÃªnesis 1:1-31', 'GÃªnesis 2:1-3', 'Colossenses 1:16'],
    tags: ['GÃªnesis', 'criaÃ§Ã£o', 'imagem de Deus', 'sÃ¡bado'],
    fontes: ['Victor Hamilton, Genesis (NICOT)', 'Gordon Wenham, Genesis (WBC)']
  },
  {
    id: 'tl-002',
    titulo: 'GÃªnesis â€” A Queda e o Pecado',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'GÃªnesis 3 narra a queda: tentaÃ§Ã£o, desobediÃªncia e consequÃªncias.',
      'O pecado Ã© rebeliÃ£o â€” querer ser como Deus. Ã‰ a raiz de todo mal.',
      'As consequÃªncias sÃ£o universais: morte, corrupÃ§Ã£o, maldiÃ§Ã£o.',
      'GÃªnesis 3:15 Ã© o proto-evangelium â€” primeira promessa messiÃ¢nica.',
      'A graÃ§a estÃ¡ presente mesmo no julgamento.'
    ],
    versicosChave: ['GÃªnesis 3:1-24', 'Romanos 5:12', 'GÃªnesis 3:15'],
    tags: ['queda', 'pecado', 'proto-evangelium', 'AdÃ£o e Eva'],
    fontes: ['Gordon Wenham, Genesis (WBC)', 'Henri Blocher, Original Sin']
  },
  {
    id: 'tl-003',
    titulo: 'GÃªnesis â€” AlianÃ§a e Promessa',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'O tema da alianÃ§a percorre GÃªnesis: AdÃ£o, NoÃ©, AbraÃ£o, Isaac, JacÃ³.',
      'A alianÃ§a com AbraÃ£o Ã© central: promessa de terra, descendÃªncia e bÃªnÃ§Ã£o universal.',
      'A alianÃ§a Ã© incondicional em suas promessas.',
      'A descendÃªncia Ã© singular e plural â€” hÃ¡ A descendÃªncia que Ã© Cristo.',
      'As alianÃ§as sÃ£o fiÃ©is embora o homem falhe.'
    ],
    versicosChave: ['GÃªnesis 12:1-3', 'GÃªnesis 15:6', 'GÃ¡latas 3:16'],
    tags: ['alianÃ§a', 'AbraÃ£o', 'promessa', 'descendÃªncia'],
    fontes: ['O. Palmer Robertson, The Christ of the Covenants']
  },
  {
    id: 'tl-004',
    titulo: 'ÃŠxodo â€” LibertaÃ§Ã£o e PÃ¡scoa',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'O ÃŠxodo Ã© evento fundante â€” libertaÃ§Ã£o da escravidÃ£o por Deus.',
      'A PÃ¡scoa Ã© sacrifÃ­cio central: o cordeiro imolado protege da sentenÃ§a.',
      'As dez pragas sÃ£o julgamento contra os deuses do Egito.',
      'A travessia do Mar Vermelho Ã© batismo de Israel.',
      'A libertaÃ§Ã£o Ã© paradigmÃ¡tica para toda a salvaÃ§Ã£o.'
    ],
    versicosChave: ['ÃŠxodo 3:7-8', 'ÃŠxodo 12:1-14', '1 CorÃ­ntios 5:7'],
    tags: ['ÃŠxodo', 'libertaÃ§Ã£o', 'PÃ¡scoa', 'cordeiro pascual'],
    fontes: ['Douglas Stuart, Exodus (NICOT)']
  },
  {
    id: 'tl-005',
    titulo: 'ÃŠxodo â€” A Lei e os Dez Mandamentos',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'A entrega da Lei no Sinai Ã© Ã¡pice da alianÃ§a.',
      'Os Dez Mandamentos sÃ£o o resumo da lei moral de Deus.',
      'A Lei tem mÃºltiplas funÃ§Ãµes: revela, acusa, guia, prepara para Cristo.',
      'A relaÃ§Ã£o Lei-Evangelho Ã© central no protestantismo.',
      'A Lei Ã© expressÃ£o de santidade e amor divinos.'
    ],
    versicosChave: ['ÃŠxodo 20:1-17', 'Romanos 7:7-12', 'GÃ¡latas 3:24'],
    tags: ['lei', 'dez mandamentos', 'alianÃ§a', 'lei moral'],
    fontes: ['Michael Morales, Who Shall Ascend the Mountain of the Lord?']
  },
  {
    id: 'tl-006',
    titulo: 'Salmos â€” AdoraÃ§Ã£o e Louvor',
    categoria: 'Temas por Livro',
    subcategoria: 'Livros PoÃ©ticos',
    conteudo: [
      'Os Salmos sÃ£o o hinÃ¡rio de Israel â€” 150 cÃ¢nticos que expressam toda a gama de emoÃ§Ãµes.',
      'O louvor Ã© resposta Ã  grandeza de Deus. NÃ£o depende de circunstÃ¢ncias.',
      'O lamento Ã© expressÃ£o honesta de dor diante de Deus. 1/3 dos Salmos sÃ£o de lamento.',
      'O Salmo 23 expressa confianÃ§a em Deus como pastor.',
      'Os Salmos messiÃ¢nicos apontam para Cristo.'
    ],
    versicosChave: ['Salmo 150:6', 'Salmo 23:1', 'Salmo 22:1-31'],
    tags: ['salmos', 'louvor', 'lamento', 'Salmo 23', 'messianismo'],
    fontes: ['Claus Westermann, Praise and Lament in the Psalms']
  },
  {
    id: 'tl-007',
    titulo: 'Livro de JÃ³ â€” Sofrimento e Soberania',
    categoria: 'Temas por Livro',
    subcategoria: 'Livros PoÃ©ticos',
    conteudo: [
      'JÃ³ Ã© a mais profunda reflexÃ£o sobre o sofrimento do inocente.',
      'Os amigos oferecem teologia da retribuiÃ§Ã£o â€” mas JÃ³ Ã© justo.',
      'Deus fala do redemoinho â€” nÃ£o responde diretamente mas revela Sua soberania.',
      'O tema Ã©: Deus governa com sabedoria mesmo quando nÃ£o entendemos.',
      'O sofrimento pode ser instrumento de Deus para aprofundar a fÃ©.'
    ],
    versicosChave: ['JÃ³ 1:21', 'JÃ³ 19:25-27', 'JÃ³ 42:1-6'],
    tags: ['JÃ³', 'sofrimento', 'soberania', 'redenÃ§Ã£o'],
    fontes: ['David Fox Flourney, Job (Interpretation)']
  },
  {
    id: 'tl-008',
    titulo: 'ProvÃ©rbios â€” Sabedoria PrÃ¡tica',
    categoria: 'Temas por Livro',
    subcategoria: 'Livros PoÃ©ticos',
    conteudo: [
      'ProvÃ©rbios Ã© manual de sabedoria prÃ¡tica. O temor do Senhor Ã© princÃ­pio da sabedoria.',
      'A sabedoria bÃ­blica nÃ£o Ã© erudiÃ§Ã£o mas discernimento para viver bem.',
      'Os provÃ©rbios sÃ£o ensinos concisos sobre conduta.',
      'A sabedoria comeÃ§a com o temor do Senhor.',
      'ProvÃ©rbios Ã© relevante para vida contemporÃ¢nea.'
    ],
    versicosChave: ['ProvÃ©rbios 1:7', 'ProvÃ©rbios 9:10', 'ProvÃ©rbios 3:5-6'],
    tags: ['provÃ©rbios', 'sabedoria', 'temor do Senhor'],
    fontes: ['Tremper Longman III, Proverbs (Baker)']
  },
  {
    id: 'tl-009',
    titulo: 'IsaÃ­as â€” O Profeta MessiÃ¢nico',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'IsaÃ­as Ã© o evangelho do AT â€” profecias messiÃ¢nicas mais detalhadas.',
      'Os ServiÃ§os do Senhor descrevem a obra redentora do Messias.',
      'IsaÃ­as 53 descreve a morte substitutiva.',
      'A visÃ£o do templo revela a santidade de Deus.',
      'O livro tem relevÃ¢ncia escatolÃ³gica: novos cÃ©us e nova terra.'
    ],
    versicosChave: ['IsaÃ­as 53:5', 'IsaÃ­as 9:6', 'IsaÃ­as 7:14'],
    tags: ['IsaÃ­as', 'messias', 'servo sofredor', 'nascimento virginal'],
    fontes: ['John Oswalt, Isaiah (NICOT)']
  },
  {
    id: 'tl-010',
    titulo: 'Jeremias â€” Nova AlianÃ§a e RestauraÃ§Ã£o',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Jeremias profetizou nos Ãºltimos anos antes do exÃ­lio.',
      'Jeremias 29:11 Ã© promessa de futuro.',
      'A nova alianÃ§a de Jeremias 31 Ã© central â€” Deus escreverÃ¡ Sua lei nos coraÃ§Ãµes.',
      'Jeremias Ã© o profeta do choro.',
      'A mensagem Ã©: julgamento Ã© real, mas restauraÃ§Ã£o Ã© possÃ­vel.'
    ],
    versicosChave: ['Jeremias 29:11', 'Jeremias 31:31-34', 'LamentaÃ§Ãµes 3:22-23'],
    tags: ['Jeremias', 'nova alianÃ§a', 'restauraÃ§Ã£o', 'exÃ­lio'],
    fontes: ['Jack Lundbom, Jeremiah (Anchor)']
  },
  {
    id: 'tl-011',
    titulo: 'Daniel â€” Soberania e Escatologia',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Daniel profetizou no exÃ­lio babilÃ´nico.',
      'Daniel 7:13-14 descreve o Filho do Homem.',
      'Daniel 9:24-27 Ã© profecia das 70 semanas.',
      'A fidelidade na BabilÃ´nia Ã© modelo de resistÃªncia.',
      'Daniel Ã© fonte de escatologia apocalÃ­ptica.'
    ],
    versicosChave: ['Daniel 7:13-14', 'Daniel 2:44', 'Daniel 9:24-27'],
    tags: ['Daniel', 'escatologia', 'Filho do Homem', 'soberania'],
    fontes: ['John Goldingay, Daniel (WBC)']
  },
  {
    id: 'tl-012',
    titulo: 'Mateus â€” O Evangelho do Reino',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'Mateus apresenta Jesus como Messias prometido.',
      'As cinco seÃ§Ãµes refletem os cinco livros de MoisÃ©s.',
      'O tema central Ã© o Reino dos CÃ©us.',
      'Mateus enfatiza a universalidade da missÃ£o.',
      'A Grande ComissÃ£o Ã© para todas as naÃ§Ãµes.'
    ],
    versicosChave: ['Mateus 1:1', 'Mateus 16:16', 'Mateus 28:18-20'],
    tags: ['Mateus', 'messias', 'reino', 'Grande ComissÃ£o'],
    fontes: ['R.T. France, Matthew (NICOT)']
  },
  {
    id: 'tl-013',
    titulo: 'Marcos â€” O Evangelho da AÃ§Ã£o',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'Marcos Ã© o evangelho mais curto e dinÃ¢mico.',
      'Jesus Ã© servo sofredor.',
      'O messianismo secreto Ã© tema.',
      'Marcos enfatiza a PaixÃ£o.',
      'O discipulado Ã© aÃ§Ã£o, nÃ£o apenas conhecimento.'
    ],
    versicosChave: ['Marcos 1:1', 'Marcos 10:45', 'Marcos 8:27-30'],
    tags: ['Marcos', 'servo', 'PaixÃ£o', 'segredo messiÃ¢nico'],
    fontes: ['Ben Witherington III, The Gospel of Mark']
  },
  {
    id: 'tl-014',
    titulo: 'Lucas â€” O Evangelho Universal',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'Lucas destaca Jesus como Salvador de todos.',
      'Enfatiza a universalidade: gentios, mulheres, pobres.',
      'O EspÃ­rito Santo Ã© mais enfatizado.',
      'As parÃ¡bolas do Bom Samaritano e Filho PrÃ³digo.',
      'O evangelho transcende fronteiras.'
    ],
    versicosChave: ['Lucas 2:32', 'Lucas 4:18-19', 'Lucas 19:10'],
    tags: ['Lucas', 'universalidade', 'EspÃ­rito Santo', 'pobres'],
    fontes: ['Joel Green, Luke (NICOT)']
  },
  {
    id: 'tl-015',
    titulo: 'JoÃ£o â€” O Evangelho da Divindade',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'JoÃ£o apresenta Jesus como Verbo eterno.',
      'Os sete Eu Sou revelam Sua identidade.',
      'Os sinais revelam Sua glÃ³ria.',
      'O amor Ã© tema central.',
      'JoÃ£o Ã© relevante para apologetia.'
    ],
    versicosChave: ['JoÃ£o 1:1-3', 'JoÃ£o 3:16', 'JoÃ£o 14:6'],
    tags: ['JoÃ£o', 'divindade', 'Eu Sou', 'amor', 'sinais'],
    fontes: ['Craig Keener, John (HNTC)']
  },
  {
    id: 'tl-016',
    titulo: 'Atos â€” A Igreja em ExpansÃ£o',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e EpÃ­stolas',
    conteudo: [
      'Atos narra a expansÃ£o da Igreja de JerusalÃ©m ao mundo.',
      'O EspÃ­rito Santo Ã© protagonista.',
      'A transiÃ§Ã£o de religiÃ£o judaica para fÃ© universal.',
      'Pedro e Paulo sÃ£o instrumentos.',
      'Atos Ã© relevante para missiologia.'
    ],
    versicosChave: ['Atos 1:8', 'Atos 2:1-4', 'Atos 28:31'],
    tags: ['Atos', 'EspÃ­rito Santo', 'Igreja primitiva', 'missionÃ¡rio'],
    fontes: ['Craig Keener, Acts (HNTC)']
  },
  {
    id: 'tl-017',
    titulo: 'Romanos â€” O Evangelho SistemÃ¡tico',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e EpÃ­stolas',
    conteudo: [
      'Romanos Ã© a epÃ­stola mais sistemÃ¡tica de Paulo.',
      'O justo viverÃ¡ pela fÃ©.',
      'Romanos 8 Ã© o capÃ­tulo mais elevado.',
      'A tensÃ£o entre graÃ§a e justiÃ§a.',
      'Israel e gentios no plano de Deus.'
    ],
    versicosChave: ['Romanos 1:16-17', 'Romanos 5:8', 'Romanos 8:1'],
    tags: ['Romanos', 'justificaÃ§Ã£o', 'fÃ©', 'graÃ§a'],
    fontes: ['Douglas Moo, Romans (NICNT)']
  },
  {
    id: 'tl-018',
    titulo: '1 e 2 CorÃ­ntios â€” A Igreja Imperfeita',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e EpÃ­stolas',
    conteudo: [
      '1 CorÃ­ntios Ã© carta a igreja problemÃ¡tica.',
      'O amor de 1 CorÃ­ntios 13 Ã© o capÃ­tulo mais belo.',
      '1 CorÃ­ntios 15 Ã© exposiÃ§Ã£o da ressurreiÃ§Ã£o.',
      '2 CorÃ­ntios Ã© mais pessoal.',
      'As epÃ­stolas sÃ£o relevantes para Igreja contemporÃ¢nea.'
    ],
    versicosChave: ['1 CorÃ­ntios 13:4-7', '1 CorÃ­ntios 15:3-8', '2 CorÃ­ntios 12:9'],
    tags: ['CorÃ­ntios', 'Igreja', 'amor', 'ressurreiÃ§Ã£o'],
    fontes: ['Anthony Thiselton, 1 Corinthians (NIGTC)']
  },
  {
    id: 'tl-019',
    titulo: 'GÃ¡latas â€” Liberdade na GraÃ§a',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e EpÃ­stolas',
    conteudo: [
      'GÃ¡latas Ã© a epÃ­stola da liberdade cristÃ£.',
      'A justificaÃ§Ã£o pela fÃ© Ã© tema central.',
      'A tensÃ£o entre graÃ§a e legalismo.',
      'O fruto do EspÃ­rito Ã© definido.',
      'A liberdade Ã© para servir.'
    ],
    versicosChave: ['GÃ¡latas 2:16', 'GÃ¡latas 5:1', 'GÃ¡latas 5:22-23'],
    tags: ['GÃ¡latas', 'liberdade', 'graÃ§a', 'legalismo'],
    fontes: ['Timothy Keller, Galatians For You']
  },
  {
    id: 'tl-020',
    titulo: 'EfÃ©sios â€” A Igreja, Corpo de Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e EpÃ­stolas',
    conteudo: [
      'EfÃ©sios Ã© a epÃ­stola dos cÃ©us.',
      'BÃªnÃ§Ã£os espirituais e unidade da Igreja.',
      'A armadura de Deus.',
      'Vida no EspÃ­rito.',
      'A Igreja Ã© corpo de Cristo.'
    ],
    versicosChave: ['EfÃ©sios 2:8-9', 'EfÃ©sios 6:10-18', 'EfÃ©sios 4:4-6'],
    tags: ['EfÃ©sios', 'Igreja', ' bÃªnÃ§Ã£os', 'armadura'],
    fontes: ['Peter O\'Brien, Ephesians (PNTC)']
  },
  {
    id: 'tl-021',
    titulo: 'Filipenses â€” Alegria na Adversidade',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e EpÃ­stolas',
    conteudo: [
      'Filipenses Ã© a epÃ­stola da alegria.',
      'Paulo escreve da prisÃ£o com gozo.',
      'O hino cristolÃ³gico de Filipenses 2.',
      'O contentamento em toda circunstÃ¢ncia.',
      'Posso todas as coisas naquele que me fortalece.'
    ],
    versicosChave: ['Filipenses 4:13', 'Filipenses 2:6-11', 'Filipenses 4:4'],
    tags: ['Filipenses', 'alegria', 'kenosis', 'contentamento'],
    fontes: ['Gordon Fee, Philippians (NICNT)']
  },
  {
    id: 'tl-022',
    titulo: 'Colossenses â€” A Supremacia de Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e EpÃ­stolas',
    conteudo: [
      'Colossenses declara a supremacia de Cristo sobre toda a criaÃ§Ã£o.',
      'Cristo Ã© imagem do Deus invisÃ­vel.',
      'A plenitude da divindade habita Nele.',
      'A falsa filosofia Ã© combatida.',
      'A vida cristÃ£ Ã© centrada em Cristo.'
    ],
    versicosChave: ['Colossenses 1:15-20', 'Colossenses 2:9-10', 'Colossenses 3:1-4'],
    tags: ['Colossenses', 'supremacia', 'Cristo', 'plenitude'],
    fontes: ['Gordon Fee, Colossians (NICNT)']
  },
  {
    id: 'tl-023',
    titulo: '1 Tessalonicenses â€” A EsperanÃ§a da Volta de Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e EpÃ­stolas',
    conteudo: [
      '1 Tessalonicenses Ã© a epÃ­stola mais antiga de Paulo.',
      'O tema central Ã© a segunda vinda de Cristo.',
      'Consolo para os que perderam entes queridos.',
      'VigilÃ¢ncia e santificaÃ§Ã£o.',
      'A esperanÃ§a motiva a santidade.'
    ],
    versicosChave: ['1 Tessalonicenses 4:16-17', '1 Tessalonicenses 5:1-11'],
    tags: ['Tessalonicenses', 'segunda vinda', 'esperanÃ§a', 'vigilÃ¢ncia'],
    fontes: ['Gordon Fee, 1 and 2 Thessalonians (NICNT)']
  },
  {
    id: 'tl-024',
    titulo: 'Hebreus â€” A Superioridade de Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Gerais',
    conteudo: [
      'Hebreus declara a superioridade de Cristo sobre tudo.',
      'Cristo Ã© superior aos anjos, MoisÃ©s, AarÃ£o.',
      'O novo testamento Ã© superior ao antigo.',
      'O santuÃ¡rio celestial Ã© o verdadeiro.',
      'A fÃ© Ã© o tema conclusivo (Hebreus 11).'
    ],
    versicosChave: ['Hebreus 1:1-3', 'Hebreus 4:14-16', 'Hebreus 11:1'],
    tags: ['Hebreus', 'superioridade', 'sumo sacerdote', 'fÃ©'],
    fontes: ['Craig Koester, Hebrews (Anchor)']
  },
  {
    id: 'tl-025',
    titulo: 'Tiago â€” FÃ© Viva e Obras',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Gerais',
    conteudo: [
      'Tiago Ã© manual de Ã©tica cristÃ£.',
      'FÃ© sem obras Ã© morta.',
      'A religiÃ£o pura Ã© visitar Ã³rfÃ£os e viÃºvas.',
      'A lÃ­ngua Ã© pequena mas causa grandes danos.',
      'A paciÃªncia no sofrimento.'
    ],
    versicosChave: ['Tiago 2:17', 'Tiago 1:27', 'Tiago 3:5-6'],
    tags: ['Tiago', 'fÃ©', 'obras', 'Ã©tica', 'lÃ­ngua'],
    fontes: ['Douglas Moo, The Letter of James (PNTC)']
  },
  {
    id: 'tl-026',
    titulo: '1 Pedro â€” Sofrimento e EsperanÃ§a',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Gerais',
    conteudo: [
      '1 Pedro Ã© escrito a cristÃ£os sofrendo perseguiÃ§Ã£o.',
      'O sofrimento Ã© provaÃ§Ã£o de fÃ©.',
      'Cristo Ã© exemplo de sofrimento injusto.',
      'A esperanÃ§a viva Ã© fundamento da fÃ©.',
      'SacerdÃ³cio real de todos os crentes.'
    ],
    versicosChave: ['1 Pedro 2:9', '1 Pedro 4:12-13', '1 Pedro 1:3'],
    tags: ['1 Pedro', 'sofrimento', 'esperanÃ§a', 'sacerdÃ³cio'],
    fontes: ['Karen Jobes, 1 Peter (Baker)']
  },
  {
    id: 'tl-027',
    titulo: '1 JoÃ£o â€” Amor e Verdade',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Gerais',
    conteudo: [
      '1 JoÃ£o Ã© carta de amor e verdade.',
      'Deus Ã© amor.',
      'O amor se prova em aÃ§Ã£o, nÃ£o em palavras.',
      'Andar na luz Ã© andar em obediÃªncia.',
      'A vitÃ³ria sobre o mundo pela fÃ©.'
    ],
    versicosChave: ['1 JoÃ£o 4:8', '1 JoÃ£o 1:7', '1 JoÃ£o 5:4'],
    tags: ['1 JoÃ£o', 'amor', 'verdade', 'luz', 'vitÃ³ria'],
    fontes: ['Karen Jobes, 1, 2, 3 John (ZECNT)']
  },
  {
    id: 'tl-028',
    titulo: 'Apocalipse â€” RevelaÃ§Ã£o e EsperanÃ§a',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse Ã© revelaÃ§Ã£o de Jesus Cristo.',
      'O Cordeiro Ã© vitorioso.',
      'O julgamento Ã© certo.',
      'Novos cÃ©us e nova terra.',
      'A esperanÃ§a Ã© consumaÃ§Ã£o do Reino.'
    ],
    versicosChave: ['Apocalipse 1:1-3', 'Apocalipse 5:6-14', 'Apocalipse 21:1-4'],
    tags: ['Apocalipse', 'revelaÃ§Ã£o', 'esperanÃ§a', 'juÃ­zo', 'consumaÃ§Ã£o'],
    fontes: ['G.K. Beale, Revelation (NICNT)']
  },
  {
    id: 'tl-029',
    titulo: 'NÃºmeros â€” PeregrinaÃ§Ã£o e DesobediÃªncia',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'NÃºmeros narra a peregrinaÃ§Ã£o de Israel no deserto.',
      'A desobediÃªncia gera julgamento â€” 40 anos de deserto.',
      'A serpente de bronze Ã© tipo de Cristo.',
      'BalaÃ£o e as bÃªnÃ§Ã£os inesperadas.',
      'Deus fiel apesar da infidelidade humana.'
    ],
    versicosChave: ['NÃºmeros 14:33-34', 'NÃºmeros 21:8-9', 'JoÃ£o 3:14-15'],
    tags: ['NÃºmeros', 'peregrinaÃ§Ã£o', 'desobediÃªncia', 'serpente de bronze'],
    fontes: ['Gordon Wenham, Numbers (TOTC)']
  },
  {
    id: 'tl-030',
    titulo: 'DeuteronÃ´mio â€” RenovaÃ§Ã£o da AlianÃ§a',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'DeuteronÃ´mio Ã© renovaÃ§Ã£o da alianÃ§a antes da entrada em CanaÃ£.',
      'O Shema Ã© declaraÃ§Ã£o central da fÃ©.',
      'A lei Ã© resumida em amor a Deus e ao prÃ³ximo.',
      'MoisÃ©s prepara JosuÃ© para a lideranÃ§a.',
      'As bÃªnÃ§Ã£os e maldiÃ§Ãµes da alianÃ§a.'
    ],
    versicosChave: ['DeuteronÃ´mio 6:4-5', 'DeuteronÃ´mio 30:19', 'Mateus 22:37-40'],
    tags: ['DeuteronÃ´mio', 'alianÃ§a', 'Shema', 'lei', 'amor'],
    fontes: ['Walter Brueggemann, Deuteronomy (Interpretation)']
  },
  {
    id: 'tl-031',
    titulo: 'JosuÃ© â€” Conquista e Fidelidade',
    categoria: 'Temas por Livro',
    subcategoria: 'HistÃ³ricos',
    conteudo: [
      'JosuÃ© narra a conquista de CanaÃ£.',
      'Deus cumple a promessa feita a AbraÃ£o.',
      'A fÃ© de Raabe Ã© exemplo.',
      'Escolhe hoje a quem serviris.',
      'A terra descanso Ã© dÃ¡diva de Deus.'
    ],
    versicosChave: ['JosuÃ© 1:9', 'JosuÃ© 24:15', 'JosuÃ© 21:45'],
    tags: ['JosuÃ©', 'conquista', 'promessa', 'fidelidade'],
    fontes: ['Richard Hess, Joshua (TOTC)']
  },
  {
    id: 'tl-032',
    titulo: 'JuÃ­zes â€” CÃ­rculo de DesobediÃªncia',
    categoria: 'Temas por Livro',
    subcategoria: 'HistÃ³ricos',
    conteudo: [
      'JuÃ­zes mostra o ciclo: pecado, julgamento, clamor, libertaÃ§Ã£o.',
      'NÃ£o havia rei em Israel â€” cada um fazia o que parecia certo.',
      'Deus levanta libertadores imperfeitos.',
      'A graÃ§a de Deus mesmo no julgamento.',
      'A necessidade de um Rei perfeito.'
    ],
    versicosChave: ['JuÃ­zes 2:11-19', 'JuÃ­zes 21:25'],
    tags: ['JuÃ­zes', 'desobediÃªncia', 'ciclo', 'libertadores'],
    fontes: ['Barry Webb, The Book of Judges (NICOT)']
  },
  {
    id: 'tl-033',
    titulo: 'Rute â€” GraÃ§a e RedenÃ§Ã£o',
    categoria: 'Temas por Livro',
    subcategoria: 'HistÃ³ricos',
    conteudo: [
      'Rute Ã© histÃ³ria de graÃ§a e lealdade.',
      'A gentia Rute entra no povo de Deus.',
      'Boaz Ã© redentor â€” tipo de Cristo.',
      'A linhagem de Davi e de Cristo.',
      'A providÃªncia de Deus no cotidiano.'
    ],
    versicosChave: ['Rute 1:16-17', 'Rute 4:14-16', 'Mateus 1:5'],
    tags: ['Rute', 'graÃ§a', 'redenÃ§Ã£o', 'Boaz', 'linhagem'],
    fontes: ['Daniel Block, Ruth (NICOT)']
  },
  {
    id: 'tl-034',
    titulo: '1 Samuel â€” Realeza e Profecia',
    categoria: 'Temas por Livro',
    subcategoria: 'HistÃ³ricos',
    conteudo: [
      '1 Samuel marca a transiÃ§Ã£o de juÃ­zes para monarquia.',
      'Samuel Ã© o Ãºltimo juiz e primeiro profeta.',
      'Saul Ã© rei escolhido mas rejeitado.',
      'Davi Ã© rei segundo o coraÃ§Ã£o de Deus.',
      'Deus vÃª o coraÃ§Ã£o, nÃ£o a aparÃªncia.'
    ],
    versicosChave: ['1 Samuel 16:7', '1 Samuel 8:4-7', '1 Samuel 3:10'],
    tags: ['Samuel', 'realeza', 'profecia', 'Davi', 'Saul'],
    fontes: ['V. Philips Long, 1 Samuel (TOTC)']
  },
  {
    id: 'tl-035',
    titulo: '2 Samuel â€” A AlianÃ§a DavÃ­dica',
    categoria: 'Temas por Livro',
    subcategoria: 'HistÃ³ricos',
    conteudo: [
      '2 Samuel descreve o reinado de Davi.',
      'A alianÃ§a com Davi Ã© central.',
      'O pecado de Davi e suas consequÃªncias.',
      'AbsalÃ£o e a rebeliÃ£o.',
      'A fidelidade de Deus apesar da infidelidade humana.'
    ],
    versicosChave: ['2 Samuel 7:12-16', '2 Samuel 22:31', '2 Samuel 12:13'],
    tags: ['Davi', 'alianÃ§a', 'reinado', 'pecado', 'restauraÃ§Ã£o'],
    fontes: ['Robert Bergen, 1, 2 Samuel (NAC)']
  },
  {
    id: 'tl-036',
    titulo: '1 Reis â€” O Templo e a DivisÃ£o',
    categoria: 'Temas por Livro',
    subcategoria: 'HistÃ³ricos',
    conteudo: [
      '1 Reis narra a construÃ§Ã£o do templo por SalomÃ£o.',
      'A sabedoria de SalomÃ£o Ã© dÃ¡diva divina.',
      'A divisÃ£o do reino apÃ³s SalomÃ£o.',
      'Elias confronta os profetas de Baal.',
      'A fidelidade em tempos de idolatria.'
    ],
    versicosChave: ['1 Reis 8:27-30', '1 Reis 18:37-39', '1 Reis 11:9-13'],
    tags: ['SalomÃ£o', 'templo', 'divisÃ£o', 'Elias'],
    fontes: ['Paul House, 1, 2 Kings (NAC)']
  },
  {
    id: 'tl-037',
    titulo: '2 Reis â€” ExÃ­lio e Julgamento',
    categoria: 'Temas por Livro',
    subcategoria: 'HistÃ³ricos',
    conteudo: [
      '2 Reis narra o exÃ­lio de Israel e JudÃ¡.',
      'A queda de Samaria (722 a.C.).',
      'A queda de JerusalÃ©m (586 a.C.).',
      'A fidelidade de Deus nas promessas de julgamento.',
      'A esperanÃ§a de restauraÃ§Ã£o.'
    ],
    versicosChave: ['2 Reis 17:7-23', '2 Reis 25:1-21'],
    tags: ['exÃ­lio', 'julgamento', 'Samaria', 'JerusalÃ©m'],
    fontes: ['Paul House, 1, 2 Kings (NAC)']
  },
  {
    id: 'tl-038',
    titulo: 'CrÃ´nicas â€” RevisÃ£o TeolÃ³gica',
    categoria: 'Temas por Livro',
    subcategoria: 'HistÃ³ricos',
    conteudo: [
      'CrÃ´nicas Ã© revisÃ£o teolÃ³gica da histÃ³ria de Israel.',
      'ÃŠnfase no templo e na adoraÃ§Ã£o.',
      'A linhagem de Davi e a promessa messiÃ¢nica.',
      'A restauraÃ§Ã£o apÃ³s o exÃ­lio.',
      'A centralidade de JerusalÃ©m.'
    ],
    versicosChave: ['1 CrÃ´nicas 17:11-14', '2 CrÃ´nicas 7:14', '2 CrÃ´nicas 6:41-42'],
    tags: ['CrÃ´nicas', 'templo', 'adoraÃ§Ã£o', 'restauraÃ§Ã£o'],
    fontes: ['Craig Jester, 1 Chronicles (BCOT)']
  },
  {
    id: 'tl-039',
    titulo: 'Esdras e Neemias â€” RestauraÃ§Ã£o',
    categoria: 'Temas por Livro',
    subcategoria: 'HistÃ³ricos',
    conteudo: [
      'Esdras e Neemias narram a restauraÃ§Ã£o pÃ³s-exÃ­lio.',
      'Esdra Ã© escriba e reformador.',
      'Neemias reconstrÃ³i os muros de JerusalÃ©m.',
      'A leitura pÃºblica da Lei.',
      'A restauraÃ§Ã£o fÃ­sica e espiritual.'
    ],
    versicosChave: ['Esdras 7:10', 'Neemias 2:17-18', 'Neemias 8:8-10'],
    tags: ['Esdras', 'Neemias', 'restauraÃ§Ã£o', 'muros', 'Lei'],
    fontes: ['Louis C. Hartman and Alexander A. Di Lella, The Book of Tobit']
  },
  {
    id: 'tl-040',
    titulo: 'Ester â€” ProvidÃªncia e Coragem',
    categoria: 'Temas por Livro',
    subcategoria: 'HistÃ³ricos',
    conteudo: [
      'Ester Ã© histÃ³ria de providÃªncia divina em Persia.',
      'O nome de Deus nÃ£o Ã© mencionado mas Sua presenÃ§a Ã© evidente.',
      'Ester arriscam a vida por seu povo.',
      'Purim Ã© celebraÃ§Ã£o da libertaÃ§Ã£o.',
      'Deus usa circunstÃ¢ncias para cumprir Seus propÃ³sitos.'
    ],
    versicosChave: ['Ester 4:14', 'Ester 7:3-4'],
    tags: ['Ester', 'providÃªncia', 'coragem', 'Purim'],
    fontes: ['Karen Jobes, Esther (NICOT)']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // 3. QUESTÃ•ES CONTEMPORÃ‚NEAS (50+ estudos)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'qc-001',
    titulo: 'Ã‰tica CristÃ£ e Moralidade Absoluta',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Ã‰tica CristÃ£',
    conteudo: [
      'A Ã©tica cristÃ£ se fundamenta na natureza de Deus e na Sua Palavra.',
      'O relativismo moral contemporÃ¢neo desafia a noÃ§Ã£o de verdade absoluta.',
      'A BÃ­blia apresenta padrÃµes morais universais â€” nÃ£o convenÃ§Ãµes culturais.',
      'A Ã©tica cristÃ£ Ã© baseada no amor: a Deus e ao prÃ³ximo.',
      'A consciÃªncia formada pela Palavra Ã© guia moral.'
    ],
    versicosChave: ['Mateus 22:37-40', 'Romanos 12:1-2', 'Filipenses 4:8'],
    tags: ['Ã©tica', 'moralidade', 'absolutismo', 'relativismo'],
    fontes: ['David Wells, The Courage to Be Protestant', 'Francis Schaeffer, How Should We Then Live?']
  },
  {
    id: 'qc-002',
    titulo: 'BioÃ©tica â€” Vida, Morte e Dignidade',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'BioÃ©tica',
    conteudo: [
      'A bioÃ©tica cristÃ£ defende a dignidade da vida humana desde a concepÃ§Ã£o.',
      'O aborto Ã© rejeitado pela tradiÃ§Ã£o cristÃ£ como interrupÃ§Ã£o injustificada da vida.',
      'A eutanÃ¡sia contradiz a soberania de Deus sobre a vida e a morte.',
      'A engenharia genÃ©tica levanta questÃµes sobre manipulaÃ§Ã£o da criaÃ§Ã£o.',
      'A cura de doenÃ§as Ã© chamado â€” mas a dignidade humana Ã© sagrada.'
    ],
    versicosChave: ['Salmos 139:13-16', 'Jeremias 1:5', 'DeuteronÃ´mio 32:39'],
    tags: ['bioÃ©tica', 'aborto', 'eutanÃ¡sia', 'dignidade', 'vida'],
    fontes: ['John Kilner, Dignity and Destiny', ' Nigel Cameron, Will Christians be Biotech\'s Best Hope?']
  },
  {
    id: 'qc-003',
    titulo: 'JustiÃ§a Social â€” Pobres e Oprimidos',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'JustiÃ§a Social',
    conteudo: [
      'A justiÃ§a social Ã© chamamento bÃ­blico â€” Deus defende os oprimidos.',
      'Os profetas denunciam a exploraÃ§Ã£o dos pobres.',
      'Jesus trouxe boa notÃ­cia aos pobres.',
      'A Igreja Ã© chamada a ser voz dos sem voz.',
      'A justiÃ§a social nÃ£o Ã© polÃ­tica mas fÃ© prÃ¡tica.'
    ],
    versicosChave: ['Miqueias 6:8', 'IsaÃ­as 1:17', 'Mateus 25:31-46', 'Tiago 2:15-17'],
    tags: ['justiÃ§a social', 'pobres', 'oprimidos', 'profecia', 'missÃ£o'],
    fontes: ['Tim Keller, Generous Justice', 'John Stott, Issues Facing Christians Today']
  },
  {
    id: 'qc-004',
    titulo: 'Cuidado com a CriaÃ§Ã£o â€” Ecologia CristÃ£',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Ecologia',
    conteudo: [
      'A criaÃ§Ã£o Ã© dom de Deus â€” somos mordomos, nÃ£o donos.',
      'O mandato de dominar nÃ£o Ã© exploraÃ§Ã£o mas cuidado responsÃ¡vel.',
      'A destruiÃ§Ã£o ambiental Ã© desobediÃªncia ao chamado de cuidar.',
      'O futuro Ã© nova criaÃ§Ã£o â€” Deus restaurarÃ¡ todas as coisas.',
      'A responsabilidade ambiental Ã© fÃ© em aÃ§Ã£o.'
    ],
    versicosChave: ['GÃªnesis 1:28', 'GÃªnesis 2:15', 'Romanos 8:19-22', 'Apocalipse 21:1'],
    tags: ['ecologia', 'criaÃ§Ã£o', 'cuidado', 'meio ambiente', 'mordomia'],
    fontes: ['Cal DeWitt, Earth-Wise', 'Loren Wilkinson, Earthkeeping']
  },
  {
    id: 'qc-005',
    titulo: 'ReligiÃ£o e CiÃªncia â€” FÃ© e RazÃ£o',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'FÃ© e CiÃªncia',
    conteudo: [
      'FÃ© e ciÃªncia nÃ£o sÃ£o necessariamente conflitantes.',
      'A ciÃªncia responde ao como; a fÃ© ao por quÃª.',
      'O criacionismo, o design inteligente e a evoluÃ§Ã£o teÃ­sta sÃ£o posiÃ§Ãµes cristÃ£s.',
      'A BÃ­blia nÃ£o Ã© livro cientÃ­fico â€” Ã© revelaÃ§Ã£o de Deus.',
      'A razÃ£o Ã© dom de Deus para ser usada em serviÃ§o da fÃ©.'
    ],
    versicosChave: ['Romanos 1:20', 'ProvÃ©rbios 25:2', 'Salmos 19:1'],
    tags: ['ciÃªncia', 'fÃ©', 'razÃ£o', 'criacionismo', 'design inteligente'],
    fontes: ['Alister McGrath, A Fine-Tuned Universe', 'John Polkinghorne, Science and Creation']
  },
  {
    id: 'qc-006',
    titulo: 'Pluralismo Religioso',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Pluralismo',
    conteudo: [
      'O pluralismo sustenta que todas as religiÃµes sÃ£o caminhos para Deus.',
      'A BÃ­blia afirma a exclusividade de Cristo: nÃ£o hÃ¡ salvaÃ§Ã£o em nenhum outro.',
      'O diÃ¡logo inter-religioso Ã© necessÃ¡rio, mas sem comprometer a verdade.',
      'O relativismo religioso Ã© incompatÃ­vel com o cristianismo.',
      'O amor ao prÃ³ximo nÃ£o implica concordÃ¢ncia com todas as crenÃ§as.'
    ],
    versicosChave: ['JoÃ£o 14:6', 'Atos 4:12', '1 TimÃ³teo 2:5'],
    tags: ['pluralismo', 'exclusivismo', 'inclusivismo', 'diÃ¡logo'],
    fontes: ['Lesslie Newbigin, The Gospel in a Pluralist Society', 'Jenkins, The Next Christendom']
  },
  {
    id: 'qc-007',
    titulo: 'Evangelismo e MissÃµes',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Missiologia',
    conteudo: [
      'O evangelismo Ã© proclamaÃ§Ã£o do evangelho para salvaÃ§Ã£o.',
      'As missÃµes sÃ£o extensÃ£o da Grande ComissÃ£o.',
      'O evangelismo deve ser contextual sem perder a verdade.',
      'O testemunho vivo Ã© mais persuasivo que argumentos.',
      'A oraÃ§Ã£o Ã© fundamento da missÃ£o.'
    ],
    versicosChave: ['Mateus 28:19-20', 'Atos 1:8', 'Romanos 10:14-15'],
    tags: ['evangelismo', 'missÃµes', 'Grande ComissÃ£o', 'contextualizaÃ§Ã£o'],
    fontes: ['John Piper, Let the Nations Be Glad', 'David Bosch, Transforming Mission']
  },
  {
    id: 'qc-008',
    titulo: 'Cultura CristÃ£ â€” Engajamento Cultural',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Cultura',
    conteudo: [
      'A Igreja deve engajar a cultura sem ser absorvida por ela.',
      'A anticultura cristÃ£ Ã© withdraw; a aculturaÃ§Ã£o Ã© compromisso.',
      'A transformaÃ§Ã£o cultural Ã© chamado â€” sal da terra e luz do mundo.',
      'As artes, ciÃªncias e polÃ­tica sÃ£o esferas de influÃªncia cristÃ£.',
      'O discernimento cultural Ã© necessÃ¡rio.'
    ],
    versicosChave: ['Mateus 5:13-16', 'Romanos 12:2', '1 CorÃ­ntios 9:19-23'],
    tags: ['cultura', 'engajamento', 'transformaÃ§Ã£o', 'arte', 'polÃ­tica'],
    fontes: ['Abraham Kuyper, Lectures on Calvinism', 'James Davison Hunter, To Change the World']
  },
  {
    id: 'qc-009',
    titulo: 'MÃ­dia Digital e FÃ©',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Cultura Digital',
    conteudo: [
      'A mÃ­dia digital Ã© ferramenta de evangelismo e comunhÃ£o.',
      'Os perigos incluem: distraÃ§Ã£o, superficialidade, vÃ­cio.',
      'O uso da tecnologia deve glorificar a Deus.',
      'A comunidade online nÃ£o substitui a comunidade presencial.',
      'O discernimento digital Ã© necessÃ¡rio.'
    ],
    versicosChave: ['1 CorÃ­ntios 10:31', 'EfÃ©sios 5:15-17', 'Colossenses 3:17'],
    tags: ['mÃ­dia', 'digital', 'tecnologia', 'comunicaÃ§Ã£o'],
    fontes: ['Tony Reinke, Twitterpated', 'Andy Crouch, The Tech-Wise Family']
  },
  {
    id: 'qc-010',
    titulo: 'FÃ© e PolÃ­tica',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Ã‰tica PÃºblica',
    conteudo: [
      'A fÃ© cristÃ£ tem implicaÃ§Ãµes polÃ­ticas â€” mas nÃ£o Ã© partidÃ¡ria.',
      'O Reino de Deus transcende partidos e ideologias.',
      'Os cristÃ£os devem buscar justiÃ§a em todas as esferas.',
      'A lealdade mÃ¡xima Ã© a Cristo, nÃ£o a partido.',
      'A participaÃ§Ã£o polÃ­tica Ã© responsabilidade cÃ­vica.'
    ],
    versicosChave: ['Mateus 22:21', 'Romanos 13:1-7', 'Atos 5:29'],
    tags: ['polÃ­tica', 'justiÃ§a', 'Reino de Deus', 'cidadania'],
    fontes: ['Andy Crouch, The Tech-Wise Family', 'James Davison Hunter, To Change the World']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // 4. HISTÃ“RIA DA IGREJA (50+ estudos)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'hi-001',
    titulo: 'Os Pais da Igreja Primitiva',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'PatrÃ­stica',
    conteudo: [
      'Os Pais da Igreja sÃ£o os teÃ³logos dos primeiros sÃ©culos do cristianismo.',
      'Os ApÃ³stolicos (Clemente, InÃ¡cio, Policarpo) foram contemporÃ¢neos dos apÃ³stolos.',
      'Os Ante-Nicenos (Justino, Irineu, Tertuliano) combateram heresias.',
      'Os Nicenos (AtanÃ¡sio, BasÃ­lio, GregÃ³rio) definiram a Trindade.',
      'Os Padres do Deserto (CristÃ£o, AtanÃ¡sio) influenciaram a espiritualidade.'
    ],
    versicosChave: ['2 Tessalonicenses 2:15', 'Judas 1:3', '2 TimÃ³teo 2:2'],
    tags: ['Pais da Igreja', 'PatrÃ­stica', 'heresias', 'Trindade'],
    fontes: ['J.N.D. Kelly, Early Christian Doctrines', 'Justino, Primeira Apologia']
  },
  {
    id: 'hi-002',
    titulo: 'Santo Agostinho â€” GraÃ§a e Cidade de Deus',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'PatrÃ­stica',
    conteudo: [
      'Agostinho Ã© o pai do Ocidente cristÃ£o. Suas ConfissÃµes sÃ£o autobiografia espiritual.',
      'A graÃ§a soberana Ã© tema central â€” Deus precede o homem em tudo.',
      'A Cidade de Deus contrasta com a cidade dos homens.',
      'O pecado original Ã© heranÃ§a de AdÃ£o.',
      'A predestinaÃ§Ã£o e a perseveranÃ§a dos santos.'
    ],
    versicosChave: ['Romanos 5:12', 'EfÃ©sios 2:4-5', 'JoÃ£o 6:44'],
    tags: ['Agostinho', 'graÃ§a', 'pecado original', 'Cidade de Deus'],
    fontes: ['Agostinho, ConfissÃµes', 'Agostinho, A Cidade de Deus']
  },
  {
    id: 'hi-003',
    titulo: 'Os ConcÃ­lios EcumÃªnicos',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'ConcÃ­lios',
    conteudo: [
      'Os concÃ­lios definiram a doutrina cristÃ£ contra heresias.',
      'NicÃ©ia (325) â€” divindade de Cristo contra o arianismo.',
      'Constantinopla (381) â€” divindade do EspÃ­rito Santo.',
      'Ã‰feso (431) â€” Maria como Theotokos.',
      'CalcedÃ´nia (451) â€” duas naturezas de Cristo.'
    ],
    versicosChave: ['EfÃ©sios 2:20', '1 TimÃ³teo 3:15', 'Judas 1:3'],
    tags: ['concÃ­lios', 'NicÃ©ia', 'Constantinopla', 'CalcedÃ´nia', 'doutrina'],
    fontes: ['J.N.D. Kelly, Early Christian Doctrines', 'Richard Hanson, The Search for the Christian Doctrine of God']
  },
  {
    id: 'hi-004',
    titulo: 'SÃ£o TomÃ¡s de Aquino â€” FÃ© e RazÃ£o',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'EscolÃ¡stica',
    conteudo: [
      'TomÃ¡s de Aquino sintetizou fÃ© e razÃ£o na Suma TeolÃ³gica.',
      'A existÃªncia de Deus pode ser demonstrada pela razÃ£o.',
      'A graÃ§a nÃ£o destrÃ³i a natureza mas a aperfeiÃ§oa.',
      'A virtude da caridade Ã© forma de todas as virtudes.',
      'Os cinco caminhos para provar a existÃªncia de Deus.'
    ],
    versicosChave: ['Romanos 1:20', '1 CorÃ­ntios 13:2', 'Hebreus 11:6'],
    tags: ['TomÃ¡s de Aquino', 'escolÃ¡stica', 'fÃ© e razÃ£o', 'Suma TeolÃ³gica'],
    fontes: ['TomÃ¡s de Aquino, Suma TeolÃ³gica', 'G.K. Chesterton, St. Thomas Aquinas']
  },
  {
    id: 'hi-005',
    titulo: 'Martin Lutero e a Reforma Protestante',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Reforma',
    conteudo: [
      'Lutero pregou as 95 teses em 1517, iniciando a Reforma.',
      'As cinco solas: sola Scriptura, sola gratia, sola fide, solus Christus, sola Deo gloria.',
      'A justificaÃ§Ã£o pela fÃ© Ã© o artigo da queda ou ascensÃ£o da Igreja.',
      'A traduÃ§Ã£o da BÃ­blia para o alemÃ£o democratizou o acesso Ã  Palavra.',
      'A Reforma restaurou o evangelho bÃ­blico.'
    ],
    versicosChave: ['Romanos 1:17', 'EfÃ©sios 2:8-9', 'GÃ¡latas 2:16'],
    tags: ['Lutero', 'Reforma', 'sola fide', 'sola Scriptura'],
    fontes: ['Lutero, 95 Teses', 'Roland Bainton, Here I Stand']
  },
  {
    id: 'hi-006',
    titulo: 'JoÃ£o Calvino â€” Soberania e Reforma',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Reforma',
    conteudo: [
      'Calvino Ã© autor das Institutas da ReligiÃ£o CristÃ£.',
      'A soberania de Deus Ã© tema central.',
      'A disciplina eclesiÃ¡stica Ã© essencial para a Igreja.',
      'A predestinaÃ§Ã£o e a eleiÃ§Ã£o.',
      'O influÃªncia de Calvino sobre o protestantismo mundial.'
    ],
    versicosChave: ['EfÃ©sios 1:11', 'Romanos 8:29-30', 'EfÃ©sios 2:8-9'],
    tags: ['Calvino', 'Reforma', 'soberania', 'Institutas'],
    fontes: ['Calvino, Institutas', 'Bruce Gordon, Calvin']
  },
  {
    id: 'hi-007',
    titulo: 'John Wesley e o Metodismo',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Avivamentos',
    conteudo: [
      'Wesley Ã© fundador do metodismo. Sua teologia enfatiza a santificaÃ§Ã£o.',
      'A graÃ§a preveniente capacita a resposta humana.',
      'A perfeiÃ§Ã£o cristÃ£ Ã© meta â€” amor perfeito.',
      'O mÃ©todo metodista incluÃ­a pequenos grupos e disciplina.',
      'O avivamento metodista transformou a Inglaterra.'
    ],
    versicosChave: ['1 Tessalonicenses 4:3', '1 CorÃ­ntios 13:1-3', 'Hebreus 12:14'],
    tags: ['Wesley', 'metodismo', 'santificaÃ§Ã£o', 'avivamento'],
    fontes: ['John Wesley, Sermons', 'Albert Outler, John Wesley']
  },
  {
    id: 'hi-008',
    titulo: 'Dietrich Bonhoeffer â€” GraÃ§a Custosa',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Teologia Moderna',
    conteudo: [
      'Bonhoeffer Ã© teÃ³logo luterano martirizado pelo nazismo.',
      'A graÃ§a custosa Ã© semipreÃ§o â€” Deus nos chama a seguir.',
      'O discipulado radical Ã© central em sua teologia.',
      'A Comunidade EclesiÃ¡stica Ã© experiÃªncia de fÃ© compartilhada.',
      'A resistÃªncia ao mal Ã© responsabilidade cristÃ£.'
    ],
    versicosChave: ['Mateus 16:24', 'Lucas 9:23', 'Romanos 12:1-2'],
    tags: ['Bonhoeffer', 'graÃ§a custosa', 'discipulado', 'resistÃªncia'],
    fontes: ['Dietrich Bonhoeffer, O Custo do Discipulado', 'Eric Metaxas, Bonhoeffer']
  },
  {
    id: 'hi-009',
    titulo: 'Karl Barth â€” Teologia DialÃ©tica',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Teologia Moderna',
    conteudo: [
      'Barth Ã© o maior teÃ³logo do sÃ©culo XX.',
      'Deus Ã© totalmente diferente (totaliter aliter) e totalmente prÃ³ximo.',
      'Cristo Ã© a Palavra de Deus â€” a BÃ­blia Ã© testemunha.',
      'A teologia dialÃ©tica contrapÃµe a razÃ£o humana Ã  revelaÃ§Ã£o divina.',
      'O Evangelho contra a cultura.'
    ],
    versicosChave: ['JoÃ£o 1:1-14', 'Hebreus 1:1-2', '1 CorÃ­ntios 1:18-25'],
    tags: ['Barth', 'teologia dialÃ©tica', 'revelaÃ§Ã£o', 'Cristo'],
    fontes: ['Karl Barth, Church Dogmatics', 'Eberhard Busch, Karl Barth: His Life from Letters and Autobiographical Texts']
  },
  {
    id: 'hi-010',
    titulo: 'O Movimento Pentecostal',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Avivamentos',
    conteudo: [
      'O pentecostalismo nasceu no inÃ­cio do sÃ©culo XX (Azusa Street, 1906).',
      'Enfatiza: batismo no EspÃ­rito, dons espirituais, cura divina.',
      'A experiÃªncia espiritual Ã© central â€” lÃ­nguas como evidÃªncia.',
      'O pentecostalismo Ã© o movimento cristÃ£o de maior crescimento.',
      'Desafios: teologia da prosperidade, emocionalismo.'
    ],
    versicosChave: ['Atos 2:1-4', '1 CorÃ­ntios 12-14', 'Marcos 16:17-18'],
    tags: ['pentecostalismo', 'carismÃ¡tico', 'dons', 'EspÃ­rito Santo'],
    fontes: ['Harold Berg, The Pentecostal Movement', 'Allan Anderson, An Introduction to Pentecostalism']
  },
  {
    id: 'hi-011',
    titulo: 'As Cruzadas â€” FÃ© e ViolÃªncia',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Medieval',
    conteudo: [
      'As cruzadas foram expediÃ§Ãµes militares para recuperar a Terra Santa.',
      'A motivaÃ§Ã£o era religiosa â€” libertar os locais sagrados.',
      'A violÃªncia das cruzadas Ã© contrÃ¡ria ao evangelho.',
      'O diÃ¡logo cristÃ£o-islÃ¢mico sofreu com as cruzadas.',
      'A liÃ§Ã£o: a fÃ© nÃ£o pode ser imposta pela forÃ§a.'
    ],
    versicosChave: ['Mateus 26:52', 'Romanos 12:17-21', 'JoÃ£o 18:36'],
    tags: ['cruzadas', 'violÃªncia', 'Terra Santa', 'diÃ¡logo'],
    fontes: ['Thomas Asbridge, The Crusades', 'Riley-Smith, What Were the Crusades?']
  },
  {
    id: 'hi-012',
    titulo: 'A InquisiÃ§Ã£o â€” FÃ© e Poder',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Medieval',
    conteudo: [
      'A InquisiÃ§Ã£o foi tribunal eclesiÃ¡stico para combater heresias.',
      'A tortura e morte de acusados sÃ£o manchas na histÃ³ria da Igreja.',
      'A busca por pureza doutrinal se tornou perseguiÃ§Ã£o.',
      'A liÃ§Ã£o: o evangelho se propaga pelo amor, nÃ£o pela forÃ§a.',
      'O arrependimento da Igreja Ã© necessÃ¡rio.'
    ],
    versicosChave: ['Mateus 7:1-5', 'Romanos 14:1-4', 'GÃ¡latas 5:1'],
    tags: ['InquisiÃ§Ã£o', 'heresias', 'perseguiÃ§Ã£o', 'liberdade'],
    fontes: ['Henry Kamen, The Spanish Inquisition']
  },
  {
    id: 'hi-013',
    titulo: 'O Movimento Puritano',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Reforma',
    conteudo: [
      'Os puritanos buscavam purificar a Igreja Anglicana de prÃ¡ticas catÃ³licas.',
      'Enfatizavam: pregaÃ§Ã£o fiel, disciplina, santificaÃ§Ã£o.',
      'A influÃªncia puritana nos EUA Ã© enorme.',
      'A teologia puritana Ã© reformada.',
      'A vida devocional era intensa.'
    ],
    versicosChave: ['2 CorÃ­ntios 7:1', '1 Pedro 1:15-16', 'Romanos 12:1-2'],
    tags: ['puritanos', 'santificaÃ§Ã£o', 'disciplina', 'teologia reformada'],
    fontes: ['J.I. Packer, A Quest for Godliness', 'Baxter, The Saints\' Everlasting Rest']
  },
  {
    id: 'hi-014',
    titulo: 'O Avivamento de Gales (1904-1905)',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Avivamentos',
    conteudo: [
      'O avivamento de Gales transformou o paÃ­s espiritualmente.',
      'Liderado por Evan Roberts, jovem de 26 anos.',
      'A oraÃ§Ã£o e a confissÃ£o de pecados foram centrais.',
      'Milhares foram convertidos.',
      'O avivamento teve impacto social â€” reduÃ§Ã£o da criminalidade.'
    ],
    versicosChave: ['2 CrÃ´nicas 7:14', 'Joel 2:28-29', 'Atos 2:17'],
    tags: ['avivamento', 'Gales', 'Evan Roberts', 'oraÃ§Ã£o'],
    fontes: ['Eifion Evans, The Welsh Revival']
  },
  {
    id: 'hi-015',
    titulo: 'O Movimento MissionÃ¡rio Moderno',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Missiologia',
    conteudo: [
      'William Carey Ã© considerado o pai do missionarismo moderno.',
      'A Grande ComissÃ£o Ã© o fundamento da missÃ£o.',
      'O sÃ©c. XIX viu explosÃ£o missionÃ¡ria mundial.',
      'A contextualizaÃ§Ã£o Ã© desafio constante.',
      'O missionarismo moderno Ã© holÃ­stico â€” palavra e obra.'
    ],
    versicosChave: ['Mateus 28:19-20', 'Atos 1:8', 'Romanos 10:14-15'],
    tags: ['missionarismo', 'William Carey', 'contextualizaÃ§Ã£o', 'Grande ComissÃ£o'],
    fontes: ['Timothy C. Tennent, Invitation to World Missions']
  },
  {
    id: 'hi-016',
    titulo: 'O ConcÃ­lio de Trento â€” Resposta CatÃ³lica',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Contrarreforma',
    conteudo: [
      'O ConcÃ­lio de Trento (1545-1563) foi resposta da Igreja CatÃ³lica Ã  Reforma.',
      'Reafirma: sete sacramentos, transubstanciaÃ§Ã£o, mÃ©rito.',
      'A justificaÃ§Ã£o Ã© cooperaÃ§Ã£o entre graÃ§a e obras.',
      'A Escritura e a TradiÃ§Ã£o sÃ£o fontes de revelaÃ§Ã£o.',
      'A reforma interna da Igreja.'
    ],
    versicosChave: ['Tiago 2:14-26', 'Hebreus 13:17', 'EfÃ©sios 2:8-9'],
    tags: ['Trento', 'Contrarreforma', 'Catolicismo', 'justificaÃ§Ã£o'],
    fontes: ['O\'Malley, Trent: What Happened at the Council']
  },
  {
    id: 'hi-017',
    titulo: 'Soren Kierkegaard â€” FÃ© e ExistÃªncia',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Filosofia CristÃ£',
    conteudo: [
      'Kierkegaard Ã© pai do existencialismo cristÃ£o.',
      'A fÃ© Ã© salto paradoxal â€” nÃ£o racionalidade.',
      'O cavaleiro da fÃ© obedece incondicionalmente.',
      'A angÃºstia existencial Ã© realidade humana.',
      'A comunicaÃ§Ã£o indireta Ã© mÃ©todo teolÃ³gico.'
    ],
    versicosChave: ['Hebreus 11:1', 'GÃªnesis 22:1-14', 'Mateus 16:24'],
    tags: ['Kierkegaard', 'existencialismo', 'fÃ©', 'paradoxo'],
    fontes: ['Kierkegaard, Meditations Devotionais', 'Kierkegaard, Temor e Tremor']
  },
  {
    id: 'hi-018',
    titulo: 'A Escatologia do MilÃªnio â€” Debate HistÃ³rico',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Escatologia',
    conteudo: [
      'O debate milenarista percorre a histÃ³ria da Igreja.',
      'O premilenarismo era predominante nos primeiros sÃ©culos.',
      'Agostinho influenciou o amilenarismo.',
      'A Reforma adotou principalmente o amilenarismo.',
      'O premilenarismo dispensacionalista surgiu no sÃ©c. XIX.'
    ],
    versicosChave: ['Apocalipse 20:1-6', 'IsaÃ­as 11:6-9'],
    tags: ['milÃªnio', 'premilenarismo', 'amilenarismo', 'dispensacionalismo'],
    fontes: ['George Eldon Ladd, The Gospel of the Kingdom']
  },
  {
    id: 'hi-019',
    titulo: 'O Movimento de Santidade',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Avivamentos',
    conteudo: [
      'O movimento de santidade surgiu no sÃ©c. XIX.',
      'Enfatizava a santificaÃ§Ã£o completa como experiÃªncia segunda.',
      'Wesley Ã© a raiz teolÃ³gica.',
      'O pentecostalismo Ã© herdeiro do movimento de santidade.',
      'A busca por perfeiÃ§Ã£o cristÃ£.'
    ],
    versicosChave: ['1 Tessalonicenses 4:3', 'Hebreus 12:14', '1 Pedro 1:15-16'],
    tags: ['santidade', 'santificaÃ§Ã£o', 'Wesley', 'perfeiÃ§Ã£o'],
    fontes: ['Timothy Smith, The Revival of Religion in America']
  },
  {
    id: 'hi-020',
    titulo: 'A Igreja Primitiva â€” Vida e OrganizaÃ§Ã£o',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'PatrÃ­stica',
    conteudo: [
      'A Igreja primitiva viveu em comunhÃ£o, partilha e oraÃ§Ã£o.',
      'A organizaÃ§Ã£o incluÃ­a bispos, presbÃ­teros e diÃ¡conos.',
      'A liturgia era simples: Palavra, oraÃ§Ã£o, Ceia.',
      'A perseguiÃ§Ã£o fortaleceu a fÃ©.',
      'A tradiÃ§Ã£o apostÃ³lica Ã© fundamento da Igreja.'
    ],
    versicosChave: ['Atos 2:42-47', '1 TimÃ³teo 3:1-13', 'Filipenses 1:5'],
    tags: ['Igreja primitiva', 'organizaÃ§Ã£o', 'liturgia', 'perseguiÃ§Ã£o'],
    fontes: ['Oskar Skarsaune, In the Shadow of the Temple']
  },
  {
    id: 'hi-021',
    titulo: 'SÃ£o Francisco de Assis â€” Pobreza e Amor',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Medieval',
    conteudo: [
      'Francisco Ã© modelo de pobreza evangÃ©lica e amor Ã  criaÃ§Ã£o.',
      'Abandonou riqueza para seguir a Cristo.',
      'A ordem franciscana renovou a Igreja medieval.',
      'O Cantico das Criaturas celebra a criaÃ§Ã£o.',
      'O ecumenismo e o diÃ¡logo inter-religioso.'
    ],
    versicosChave: ['Mateus 5:3', 'Mateus 19:21', 'Lucas 12:33'],
    tags: ['Francisco', 'pobreza', 'criaÃ§Ã£o', 'franciscanos'],
    fontes: ['G.K. Chesterton, St. Francis of Assisi']
  },
  {
    id: 'hi-022',
    titulo: 'A EscravidÃ£o e a Igreja',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'JustiÃ§a Social',
    conteudo: [
      'A Igreja teve papel ambÃ­guo na escravidÃ£o.',
      'Alguns cristÃ£os combateram a escravidÃ£o (Wesley, Wilberforce).',
      'A teologia da escravidÃ£o foi usada para justificÃ¡-la.',
      'O movimento abolicionista era cristÃ£o.',
      'A liÃ§Ã£o: a BÃ­blia Ã© contra toda forma de opressÃ£o.'
    ],
    versicosChave: ['Filemom 1:16-21', 'GÃ¡latas 3:28', 'IsaÃ­as 58:6'],
    tags: ['escravidÃ£o', 'abolicionismo', 'justiÃ§a', 'Wilberforce'],
    fontes: ['David Brion Davis, Inhuman Bondage']
  },
  {
    id: 'hi-023',
    titulo: 'O Movimiento da Teologia da LibertaÃ§Ã£o',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Teologia Moderna',
    conteudo: [
      'A teologia da libertaÃ§Ã£o surgiu na AmÃ©rica Latina nos anos 60.',
      'Gustavo GutiÃ©rrez Ã© principal expoente.',
      'A opÃ§Ã£o preferencial pelos pobres.',
      'A leitura da BÃ­blia a partir dos oprimidos.',
      'O debatete entre marxismo e cristianismo.'
    ],
    versicosChave: ['Lucas 4:18-19', 'Mateus 25:31-46', 'IsaÃ­as 61:1'],
    tags: ['teologia da libertaÃ§Ã£o', 'GutiÃ©rrez', 'pobres', 'AmÃ©rica Latina'],
    fontes: ['Gustavo GutiÃ©rrez, A Theology of Liberation']
  },
  {
    id: 'hi-024',
    titulo: 'A Igreja Ortodoxa â€” TradiÃ§Ã£o e Liturgia',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Ortodoxia',
    conteudo: [
      'A Igreja Ortodoxa preserva a tradiÃ§Ã£o dos primeiros sÃ©culos.',
      'A liturgia Ã© central â€” a Divina Liturgia Ã© mistÃ©rio.',
      'A iconografia Ã© teologia visual.',
      'A theosis (divinizaÃ§Ã£o) Ã© meta da vida cristÃ£.',
      'A unidade entre Igreja Ortodoxa e CatÃ³lica Ã© buscada.'
    ],
    versicosChave: ['2 Tessalonicenses 2:15', '1 CorÃ­ntios 11:2', '2 Pedro 1:4'],
    tags: ['Ortodoxia', 'liturgia', 'theosis', 'tradiÃ§Ã£o'],
    fontes: ['Timothy Ware, The Orthodox Church']
  },
  {
    id: 'hi-025',
    titulo: 'O Ecumenismo Moderno',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Ecumenismo',
    conteudo: [
      'O ecumenismo busca a unidade visÃ­vel da Igreja.',
      'O ConcÃ­lio Vaticano II abriu diÃ¡logo.',
      'O Conselho Mundial de Igrejas (1948).',
      'DiferenÃ§as doutrinais persistem.',
      'A unidade Ã© dom de Deus que requer cooperaÃ§Ã£o humana.'
    ],
    versicosChave: ['JoÃ£o 17:20-23', 'EfÃ©sios 4:1-6'],
    tags: ['ecumenismo', 'unidade', 'Vaticano II', 'diÃ¡logo'],
    fontes: ['John Moltmann, The Church in the Power of the Spirit']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // 5. ESTUDOS COMPARATIVOS (50+ estudos)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'ec-001',
    titulo: 'ComparaÃ§Ã£o entre os Quatro Evangelhos',
    categoria: 'Estudos Comparativos',
    subcategoria: 'ComparaÃ§Ã£o SinÃ³tica',
    conteudo: [
      'Mateus, Marcos e Lucas sÃ£o sinÃ³ticos â€” narram a mesma histÃ³ria com Ãªnfases diferentes.',
      'JoÃ£o Ã© distinto â€” apresentaÃ§Ã£o teolÃ³gica mais elevada.',
      'Mateus enfatiza Jesus como Messias; Marcos como servo; Lucas como Salvador universal.',
      'JoÃ£o declara a divindade de Cristo no prÃ³logo.',
      'As harmonias buscam unificar os relatos.'
    ],
    versicosChave: ['Mateus 1:1', 'Marcos 1:1', 'Lucas 1:1-4', 'JoÃ£o 1:1-3'],
    tags: ['evangelhos', 'sinÃ³ticos', 'comparaÃ§Ã£o', 'harmonia'],
    fontes: ['Donald Hagner, Matthew (WBC)', 'Craig Keener, Matthew (HNTC)']
  },
  {
    id: 'ec-002',
    titulo: 'CriaÃ§Ã£o em GÃªnesis e CiÃªncia Moderna',
    categoria: 'Estudos Comparativos',
    subcategoria: 'AT e CiÃªncia',
    conteudo: [
      'GÃªnesis 1-2 apresenta o relato da criaÃ§Ã£o.',
      'Existem mÃºltiplas interpretaÃ§Ãµes: literal, literÃ¡ria, framework.',
      'A ciÃªncia moderna desafia interpretaÃ§Ãµes literalistas.',
      'A teologia da criaÃ§Ã£o nÃ£o depende de cronologia.',
      'Deus Ã© autor da natureza e da Escritura â€” nÃ£o pode haver conflito real.'
    ],
    versicosChave: ['GÃªnesis 1:1', 'Salmos 19:1', 'Romanos 1:20'],
    tags: ['criaÃ§Ã£o', 'GÃªnesis', 'ciÃªncia', 'evoluÃ§Ã£o', 'framework'],
    fontes: ['Henri Blocher, In the Beginning', 'John Walton, The Lost World of Genesis One']
  },
  {
    id: 'ec-003',
    titulo: 'AlianÃ§as do Antigo e Novo Testamento',
    categoria: 'Estudos Comparativos',
    subcategoria: 'AlianÃ§as',
    conteudo: [
      'As alianÃ§as do AT (NoÃ©, AbraÃ£o, MoisÃ©s, Davi) preparam para a nova alianÃ§a.',
      'A nova alianÃ§a em Cristo cumpre e supera as anteriores.',
      'A continuidade Ã© tema: a lei se cumpre no evangelho.',
      'A descontinuidade: a nova alianÃ§a Ã© melhor.',
      'Cristo Ã© o mediador da nova alianÃ§a.'
    ],
    versicosChave: ['Jeremias 31:31-34', 'Hebreus 8:6-13', 'Lucas 22:20'],
    tags: ['alianÃ§as', 'AT', 'NT', 'nova alianÃ§a', 'cumprimento'],
    fontes: ['O. Palmer Robertson, The Christ of the Covenants']
  },
  {
    id: 'ec-004',
    titulo: 'Temas Mesianos â€” AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Messianismo',
    conteudo: [
      'As profecias messiÃ¢nicas do AT se cumprem em Cristo.',
      'IsaÃ­as 53 descreve a morte substitutiva.',
      'Salmo 22 antecipa a crucificaÃ§Ã£o.',
      'Daniel 7:13-14 descreve o Filho do Homem.',
      'Cristo cumpre todas as profecias.'
    ],
    versicosChave: ['IsaÃ­as 53', 'Salmo 22', 'Daniel 7:13-14', 'Mateus 26:64'],
    tags: ['messianismo', 'profecia', 'cumprimento', 'IsaÃ­as', 'Salmo'],
    fontes: ['Walter Kaiser, The Messiah in the Old Testament']
  },
  {
    id: 'ec-005',
    titulo: 'Sofrimento no AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tematica',
    conteudo: [
      'O sofrimento Ã© tema que percorre toda a BÃ­blia.',
      'No AT: JÃ³, Salmos de lamento, profetas.',
      'No NT: Cristo Ã© o sofredor por excelÃªncia.',
      'O sofrimento tem sentido redentor em Cristo.',
      'A esperanÃ§a Ã© vitÃ³ria sobre o sofrimento.'
    ],
    versicosChave: ['JÃ³ 1:21', 'IsaÃ­as 53:5', 'Filipenses 3:10', 'Romanos 8:18'],
    tags: ['sofrimento', 'redenÃ§Ã£o', 'lamento', 'Cristo'],
    fontes: ['Claus Westermann, Praise and Lament in the Psalms']
  },
  {
    id: 'ec-006',
    titulo: 'Lei no AT e GraÃ§a no NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Lei e GraÃ§a',
    conteudo: [
      'A relaÃ§Ã£o entre Lei e Evangelho Ã© central no cristianismo.',
      'A Lei revela o pecado; o Evangelho mostra o Salvador.',
      'A Lei nÃ£o Ã© anulada mas cumprida em Cristo.',
      'GraÃ§a nÃ£o Ã© antinomianismo â€” a obediÃªncia continua.',
      'A Lei moral permanece; as cerimÃ´nias se cumprem.'
    ],
    versicosChave: ['Mateus 5:17-20', 'Romanos 7:7-12', 'GÃ¡latas 3:24'],
    tags: ['lei', 'graÃ§a', 'cumprimento', 'evangelho'],
    fontes: ['Calvino, Institutas II.7-8']
  },
  {
    id: 'ec-007',
    titulo: 'Reis de Israel e Reinado de Cristo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Realeza',
    conteudo: [
      'Os reis de Israel sÃ£o prefiguraÃ§Ãµes de Cristo.',
      'Davi Ã© o rei segundo o coraÃ§Ã£o de Deus.',
      'SalomÃ£o Ã© rei de sabedoria; Cristo Ã© Sabedoria.',
      'Os reis fracassam; Cristo Ã© Rei perfeito.',
      'O Reino de Cristo Ã© eterno e universal.'
    ],
    versicosChave: ['2 Samuel 7:12-16', 'Salmo 110:1', 'Lucas 1:32-33'],
    tags: ['realeza', 'Davi', 'SalomÃ£o', 'Cristo Rei'],
    fontes: ['O. Palmer Robertson, The Christ of the Covenants']
  },
  {
    id: 'ec-008',
    titulo: 'Tipologias BÃ­blicas â€” Tipos e Antitipos',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'Tipologia Ã© estudo de prefiguraÃ§Ãµes no AT que se cumprem no NT.',
      'AdÃ£o Ã© tipo de Cristo (Romanos 5:14).',
      'O cordeiro pascual Ã© tipo de Cristo (1 CorÃ­ntios 5:7).',
      'O manÃ¡ Ã© tipo de Cristo pÃ£o da vida (JoÃ£o 6:32-35).',
      'A serpente de bronze Ã© tipo de Cristo (JoÃ£o 3:14).'
    ],
    versicosChave: ['Romanos 5:14', '1 CorÃ­ntios 5:7', 'JoÃ£o 6:35', 'JoÃ£o 3:14'],
    tags: ['tipologia', 'AT', 'NT', 'prefiguraÃ§Ã£o', 'cumprimento'],
    fontes: ['G.K. Beale, The Temple and the Church\'s Mission']
  },
  {
    id: 'ec-009',
    titulo: 'AdoraÃ§Ã£o no AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Liturgia',
    conteudo: [
      'A adoraÃ§Ã£o no AT incluÃ­a templo, sacrifÃ­cios, festas.',
      'No NT, a adoraÃ§Ã£o Ã© em espÃ­rito e verdade.',
      'Cristo Ã© o novo templo â€” comunhÃ£o direta com Deus.',
      'A Ceia do Senhor substitui os sacrifÃ­cios.',
      'A adoraÃ§Ã£o Ã© holÃ­stica â€” toda a vida.'
    ],
    versicosChave: ['JoÃ£o 4:23-24', 'Hebreus 9:11-14', 'Romanos 12:1-2'],
    tags: ['adoraÃ§Ã£o', 'templo', 'sacrifÃ­cios', 'espÃ­rito e verdade'],
    fontes: ['Ralph P. Martin, Worship in the Early Church']
  },
  {
    id: 'ec-010',
    titulo: 'Profecia no AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Profecia',
    conteudo: [
      'O AT contÃ©m profecias messiÃ¢nicas detalhadas.',
      'O NT cumpre e interpreta as profecias.',
      'Cristo Ã© o profeta por excelÃªncia.',
      'A profecia no NT Ã© continuada na Igreja.',
      'O padrÃ£o: revelaÃ§Ã£o â†’ cumprimento â†’ interpretaÃ§Ã£o.'
    ],
    versicosChave: ['DeuteronÃ´mio 18:15', 'Atos 3:22-23', 'Hebreus 1:1-2'],
    tags: ['profecia', 'messias', 'cumprimento', 'revelaÃ§Ã£o'],
    fontes: ['Walter Kaiser, The Messiah in the Old Testament']
  },
  {
    id: 'ec-011',
    titulo: 'Sacramentos â€” PrefiguraÃ§Ãµes no AT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Sacramentos',
    conteudo: [
      'O batismo tem prefiguraÃ§Ãµes: dilÃºvio, Mar Vermelho, circuncisÃ£o.',
      'A Ceia tem prefiguraÃ§Ãµes: PÃ¡scoa, manÃ¡, Ã¡guas amargas.',
      'Os sacramentos do AT sÃ£o tipos dos do NT.',
      'A continuidade Ã© sinal de graÃ§a.',
      'A superaÃ§Ã£o: Cristo Ã© a realidade, os sacramentos sÃ£o sinais.'
    ],
    versicosChave: ['1 CorÃ­ntios 10:1-4', '1 CorÃ­ntios 5:7', 'Romanos 6:3-4'],
    tags: ['sacramentos', 'batismo', 'Ceia', 'tipologia'],
    fontes: ['Michael Morales, Who Shall Ascend the Mountain of the Lord?']
  },
  {
    id: 'ec-012',
    titulo: 'JustiÃ§a no AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'JustiÃ§a',
    conteudo: [
      'A justiÃ§a no AT Ã© mantida pela lei.',
      'A justiÃ§a no NT Ã© imputada pela fÃ©.',
      'Cristo cumpre a justiÃ§a da lei.',
      'A justiÃ§a de Deus se revela na cruz.',
      'A justiÃ§a Ã© tanto imputada quanto transformadora.'
    ],
    versicosChave: ['Romanos 3:21-26', 'GÃ¡latas 3:24', 'Mateus 5:17'],
    tags: ['justiÃ§a', 'lei', 'fÃ©', 'imputaÃ§Ã£o', 'cumprimento'],
    fontes: ['Michael Horton, Justification']
  },
  {
    id: 'ec-013',
    titulo: 'MisericÃ³rdia no AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'MisericÃ³rdia',
    conteudo: [
      'A misericÃ³rdia de Deus Ã© tema que percorre toda a BÃ­blia.',
      'No AT: Deus se arrepende, perdoa, restaura.',
      'No NT: Cristo Ã© a misericÃ³rdia encarnada.',
      'A misericÃ³rdia nÃ£o anula a justiÃ§a â€” Ã© cumprida nela.',
      'Somos chamados a ser misericordiosos.'
    ],
    versicosChave: ['Salmos 103:8-13', 'Lucas 6:36', 'Tiago 2:13'],
    tags: ['misericÃ³rdia', 'perdÃ£o', 'compaixÃ£o', 'misericÃ³rdia encarnada'],
    fontes: ['Agostinho, De Trinitate']
  },
  {
    id: 'ec-014',
    titulo: 'EspÃ­rito Santo no AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Pneumatologia',
    conteudo: [
      'No AT, o EspÃ­rito atuava de forma especial e temporÃ¡ria.',
      'No NT, Ele habita permanentemente nos crentes.',
      'A efusÃ£o do EspÃ­rito em Pentecostes Ã© marco.',
      'A continuidade: Deus sempre esteve presente.',
      'A superanÃ§a: a habitaÃ§Ã£o permanente Ã© nova.'
    ],
    versicosChave: ['Atos 2:1-4', 'JoÃ£o 14:16-17', 'Romanos 8:9'],
    tags: ['EspÃ­rito Santo', 'Pentecostes', 'habitaÃ§Ã£o', 'continuidade'],
    fontes: ['Gordon Fee, God\'s Empowering Presence']
  },
  {
    id: 'ec-015',
    titulo: 'AdoraÃ§Ã£o â€” Templo e Igreja',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'O templo do AT era centro de adoraÃ§Ã£o e sacrifÃ­cio.',
      'A Igreja Ã© o novo templo â€” construÃ­da de pedras vivas.',
      'Cristo Ã© o novo Sumo Sacerdote.',
      'Os sacrifÃ­cios foram cumpridos na cruz.',
      'A Igreja Ã© sacerdÃ³cio real.'
    ],
    versicosChave: ['1 Pedro 2:5', 'EfÃ©sios 2:19-22', 'Hebreus 9:11-14'],
    tags: ['templo', 'Igreja', 'sacerdÃ³cio', 'sacrifÃ­cio'],
    fontes: ['G.K. Beale, The Temple and the Church\'s Mission']
  },
  {
    id: 'ec-016',
    titulo: 'EsperanÃ§a no AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Escatologia',
    conteudo: [
      'A esperanÃ§a no AT Ã© messiÃ¢nica â€” espera do Messias.',
      'A esperanÃ§a no NT Ã© escatolÃ³gica â€” espera da volta de Cristo.',
      'A continuidade: Deus cumprirÃ¡ Suas promessas.',
      'A superanÃ§a: o Reino jÃ¡ comeÃ§ou.',
      'A esperanÃ§a Ã© certeza, nÃ£o wishful thinking.'
    ],
    versicosChave: ['IsaÃ­as 9:6-7', 'Mateus 12:28', '1 Tessalonicenses 4:16-17'],
    tags: ['esperanÃ§a', 'messias', 'segunda vinda', 'Reino'],
    fontes: ['G.E. Ladd, A Theology of the New Testament']
  },
  {
    id: 'ec-017',
    titulo: 'Pecado e RedenÃ§Ã£o â€” Narrativa BÃ­blica',
    categoria: 'Estudos Comparativos',
    subcategoria: 'RedenÃ§Ã£o',
    conteudo: [
      'A narrativa bÃ­blica Ã©: criaÃ§Ã£o â†’ queda â†’ redenÃ§Ã£o â†’ consumaÃ§Ã£o.',
      'O pecado corrompe tudo; a redenÃ§Ã£o restaura tudo.',
      'Cristo Ã© o centro da narrativa redentora.',
      'A histÃ³ria nÃ£o Ã© cÃ­clica â€” Ã© linear e teleolÃ³gica.',
      'O fim Ã© restauraÃ§Ã£o completa.'
    ],
    versicosChave: ['GÃªnesis 3:15', 'Romanos 5:12-21', 'Apocalipse 21:1-4'],
    tags: ['narrativa', 'pecado', 'redenÃ§Ã£o', 'consumaÃ§Ã£o'],
    fontes: ['Graeme Goldsworthy, According to Plan']
  },
  {
    id: 'ec-018',
    titulo: 'Amor no AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Ã‰tica',
    conteudo: [
      'O amor a Deus e ao prÃ³ximo Ã© central em ambas as alianÃ§as.',
      'O AT ordena: AmarÃ¡s o Senhor teu Deus. AmarÃ¡s o prÃ³ximo.',
      'Jesus resumo a lei no duplo mandamento do amor.',
      'O amor cristÃ£o (agape) Ã© sacrificial.',
      'O amor Ã© a marca dos discÃ­pulos.'
    ],
    versicosChave: ['DeuteronÃ´mio 6:5', 'LevÃ­tico 19:18', 'Mateus 22:37-40', 'JoÃ£o 13:34-35'],
    tags: ['amor', 'mandamento', 'agape', 'duplo mandamento'],
    fontes: ['Anders Nygren, Agape and Eros']
  },
  {
    id: 'ec-019',
    titulo: 'Sofrimento de Cristo â€” Profecia e Cumprimento',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Cristologia',
    conteudo: [
      'O sofrimento de Cristo Ã© profetizado no AT.',
      'IsaÃ­as 53 Ã© a profecia mais clara.',
      'Salmo 22 antecipa a crucificaÃ§Ã£o.',
      'Zacarias 12:10 prevÃª o ferimento.',
      'O NT cumpre todas as profecias.'
    ],
    versicosChave: ['IsaÃ­as 53:3-7', 'Salmo 22:16-18', 'Zacarias 12:10'],
    tags: ['sofrimento', 'profecia', 'IsaÃ­as 53', 'crucificaÃ§Ã£o'],
    fontes: ['Walter Kaiser, The Messiah in the Old Testament']
  },
  {
    id: 'ec-020',
    titulo: 'Deus como Pai â€” AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'Deus Ã© chamado de Pai no AT â€” geralmente como criador e provedor.',
      'No NT, Jesus intensifica a relaÃ§Ã£o: Abba, Pai.',
      'A paternidade de Deus Ã© amor, cuidado, autoridade.',
      'A adoÃ§Ã£o nos torna filhos.',
      'A relaÃ§Ã£o Pai-Filho-EspÃ­rito Ã© Trindade.'
    ],
    versicosChave: ['IsaÃ­as 63:16', 'Romanos 8:15', 'GÃ¡latas 4:4-6', 'JoÃ£o 20:17'],
    tags: ['Pai', 'paternidade', 'Abba', 'filiaÃ§Ã£o', 'Trindade'],
    fontes: ['Agostinho, De Trinitate']
  },
  {
    id: 'ec-021',
    titulo: 'JuÃ­zo no AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Escatologia',
    conteudo: [
      'O juÃ­zo Ã© tema que percorre toda a BÃ­blia.',
      'No AT: dilÃºvio, exÃ­lio, destruiÃ§Ã£o do templo.',
      'No NT: Cristo Ã© juiz final.',
      'O juÃ­zo Ã© justo e final.',
      'A graÃ§a precede o julgamento.'
    ],
    versicosChave: ['GÃªnesis 6-9', 'Mateus 25:31-46', 'Atos 17:31'],
    tags: ['juÃ­zo', 'dilÃºvio', 'exÃ­lio', 'juÃ­zo final'],
    fontes: ['Robert Mounce, The Book of Revelation']
  },
  {
    id: 'ec-022',
    titulo: 'AlianÃ§a com AbraÃ£o e FÃ© em Cristo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'AlianÃ§as',
    conteudo: [
      'AbraÃ£o creu em Deus e lhe foi imputado justiÃ§a.',
      'A fÃ© de AbraÃ£o Ã© modelo para todos.',
      'Cristo Ã© a descendÃªncia prometida.',
      'A bÃªnÃ§Ã£o de AbraÃ£o se estende a todas as naÃ§Ãµes.',
      'Somos filhos de AbraÃ£o pela fÃ©.'
    ],
    versicosChave: ['GÃªnesis 15:6', 'GÃ¡latas 3:7-9', 'Romanos 4:16-25'],
    tags: ['AbraÃ£o', 'fÃ©', 'imputaÃ§Ã£o', 'alianÃ§a', 'filhos'],
    fontes: ['O. Palmer Robertson, The Christ of the Covenants']
  },
  {
    id: 'ec-023',
    titulo: 'Lei Moral â€” PermanÃªncia e AplicaÃ§Ã£o',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Ã‰tica',
    conteudo: [
      'A lei moral (DecÃ¡logo) Ã© permanente.',
      'As leis cerimoniais se cumprem em Cristo.',
      'As leis civis sÃ£o contextuais.',
      'O amor Ã© a forma da lei.',
      'A obediÃªncia Ã© resposta Ã  graÃ§a.'
    ],
    versicosChave: ['Mateus 5:17-20', 'Romanos 13:8-10', 'GÃ¡latas 5:14'],
    tags: ['lei moral', 'DecÃ¡logo', 'permanÃªncia', 'amor'],
    fontes: ['Calvino, Institutas II.7-8']
  },
  {
    id: 'ec-024',
    titulo: 'SalvaÃ§Ã£o â€” Liberdade do Egito e em Cristo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A libertaÃ§Ã£o do Egito Ã© tipo da salvaÃ§Ã£o em Cristo.',
      'EscravidÃ£o â†’ liberdade; condenaÃ§Ã£o â†’ justiÃ§a.',
      'O batismo Ã© passagem do Mar Vermelho.',
      'O manÃ¡ Ã© tipo de Cristo pÃ£o da vida.',
      'A peregrinaÃ§Ã£o Ã© a vida cristÃ£.'
    ],
    versicosChave: ['ÃŠxodo 3:7-8', '1 CorÃ­ntios 10:1-4', 'Romanos 6:3-4'],
    tags: ['ÃŠxodo', 'salvaÃ§Ã£o', 'libertaÃ§Ã£o', 'batismo', 'tipo'],
    fontes: ['Michael Morales, Who Shall Ascend the Mountain of the Lord?']
  },
  {
    id: 'ec-025',
    titulo: 'Promessas AbraÃ¢micas e o Grande ComissÃ£o',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Missiologia',
    conteudo: [
      'A promessa a AbraÃ£o Ã© bÃªnÃ§Ã£o universal.',
      'A Grande ComissÃ£o Ã© o cumprimento.',
      'De AbraÃ£o a todas as naÃ§Ãµes.',
      'O evangelho Ã© para todos os povos.',
      'A missÃ£o Ã© continuada da promessa.'
    ],
    versicosChave: ['GÃªnesis 12:3', 'Mateus 28:19-20', 'GÃ¡latas 3:8'],
    tags: ['AbraÃ£o', 'promessa', 'missÃ£o', 'naÃ§Ãµes', 'Grande ComissÃ£o'],
    fontes: ['O. Palmer Robertson, The Christ of the Covenants']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // 6. HERMENÃŠUTICA (50+ estudos)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'he-001',
    titulo: 'InterpretaÃ§Ã£o Literal â€” MÃ©todo Gramatical-HistÃ³rico',
    categoria: 'HermenÃªutica',
    subcategoria: 'MÃ©todos',
    conteudo: [
      'O mÃ©todo literal busca o sentido que o autor quis comunicar ao leitor original.',
      'Respeita o contexto, o gÃªnero literÃ¡rio e a linguagem.',
      'NÃ£o Ã© literalismo â€” reconhece metÃ¡foras, alegorias, parÃ¡bolas.',
      'Ã‰ o mÃ©todo predominante na Reforma Protestantista.',
      'A BÃ­blia Ã© interpreta por ela mesma â€” analogia da fÃ©.'
    ],
    versicosChave: ['2 TimÃ³teo 2:15', '2 Pedro 1:20-21'],
    tags: ['literal', 'gramatical-histÃ³rico', 'mÃ©todo', 'contexto'],
    fontes: ['D.A. Carson, Exegetical Fallacies']
  },
  {
    id: 'he-002',
    titulo: 'GÃªneros LiterÃ¡rios na BÃ­blia',
    categoria: 'HermenÃªutica',
    subcategoria: 'GÃªneros',
    conteudo: [
      'A BÃ­blia contÃ©m mÃºltiplos gÃªneros: histÃ³ria, poesia, profecia, epÃ­stola, apocalipse.',
      'Cada gÃªnero requer mÃ©todo interpretativo diferente.',
      'Uma parÃ¡bola nÃ£o Ã© histÃ³ria literal.',
      'Um salmo nÃ£o Ã© doutrina sistemÃ¡tica.',
      'O gÃªnero Ã© chave para interpretaÃ§Ã£o correta.'
    ],
    versicosChave: ['Eclesiastes 3:1-8', 'Salmos 1:1', 'Mateus 13:1-9'],
    tags: ['gÃªneros', 'histÃ³ria', 'poesia', 'profecia', 'epÃ­stola'],
    fontes: ['Gordon Fee, How to Read the Bible for All Its Worth']
  },
  {
    id: 'he-003',
    titulo: 'Contexto HistÃ³rico-Cultural',
    categoria: 'HermenÃªutica',
    subcategoria: 'Contexto',
    conteudo: [
      'Entender o contexto histÃ³rico-cultural Ã© essencial para interpretaÃ§Ã£o.',
      'A BÃ­blia foi escrita em culturas especÃ­ficas.',
      'Costumes, idiomas e situaÃ§Ãµes influenciam o significado.',
      'A pesquisa bÃ­blica (background study) Ã© necessÃ¡ria.',
      'ContextualizaÃ§Ã£o Ã© adaptar a mensagem sem perder a verdade.'
    ],
    versicosChave: ['1 CorÃ­ntios 9:19-23', 'Atos 17:16-34'],
    tags: ['contexto', 'histÃ³ria', 'cultura', 'contextualizaÃ§Ã£o'],
    fontes: ['Craig Keener, Backgrounds to the New Testament']
  },
  {
    id: 'he-004',
    titulo: 'LÃ­nguas Originais â€” Hebraico e Grego',
    categoria: 'HermenÃªutica',
    subcategoria: 'LÃ­nguas',
    conteudo: [
      'O hebraico Ã© a lÃ­ngua do AT â€” rica em imagens e paradoxos.',
      'O grego do NT Ã© koinÃ© â€” lÃ­ngua comum do impÃ©rio romano.',
      'O aramaico aparece em Daniel e palavras de Jesus.',
      'Estudar as lÃ­nguas originais Ã© Ãºtil mas nÃ£o indispensÃ¡vel.',
      'TraduÃ§Ãµes fiÃ©is sÃ£o confiÃ¡veis para a maioria dos crentes.'
    ],
    versicosChave: ['1 CorÃ­ntios 14:1-5', 'EfÃ©sios 4:11-12'],
    tags: ['hebraico', 'grego', 'aramaico', 'lÃ­nguas', 'traduÃ§Ã£o'],
    fontes: ['Mounce, Basics of Biblical Greek', 'Pratico and Van Pelt, Basics of Biblical Hebrew']
  },
  {
    id: 'he-005',
    titulo: 'CrÃ­tica Textual â€” Manuscritos e Variantes',
    categoria: 'HermenÃªutica',
    subcategoria: 'CrÃ­tica Textual',
    conteudo: [
      'A crÃ­tica textual busca estabelecer o texto original das Escrituras.',
      'Temos milhares de manuscritos â€” mais do que qualquer outro documento antigo.',
      'As variantes sÃ£o poucas e nÃ£o afetam doutrinas essenciais.',
      'O Novo Testamento Ã© o documento mais bem atestado da antiguidade.',
      'A traduÃ§Ã£o Reina-Valera Ã© baseada em manuscritos confiÃ¡veis.'
    ],
    versicosChave: ['2 Pedro 1:20-21', 'Apocalipse 22:18-19'],
    tags: ['crÃ­tica textual', 'manuscritos', 'variantes', 'texto original'],
    fontes: ['Bruce Metzger, The Text of the New Testament', 'Daniel Wallace, Revisiting the Corruption of the New Testament']
  },
  {
    id: 'he-006',
    titulo: 'InterpretaÃ§Ã£o AlegÃ³rica â€” Uso e Limites',
    categoria: 'HermenÃªutica',
    subcategoria: 'MÃ©todos',
    conteudo: [
      'A interpretaÃ§Ã£o alegÃ³rica busca significados alÃ©m do literal.',
      'Foi predominante nos Padres da Igreja (OrÃ­genes, Clemente).',
      'O perigo Ã© subjetividade â€” cada um vÃª o que quer.',
      'A alegoria legÃ­tima Ã© aquela que o texto permite.',
      'O mÃ©todo literal Ã© mais confiÃ¡vel.'
    ],
    versicosChave: ['GÃ¡latas 4:21-31', '2 CorÃ­ntios 3:14-16'],
    tags: ['alegoria', 'OrÃ­genes', 'Padres', 'mÃ©todo'],
    fontes: ['Henri Blocher, In the Beginning']
  },
  {
    id: 'he-007',
    titulo: 'Tipologia â€” PrefiguraÃ§Ãµes BÃ­blicas',
    categoria: 'HermenÃªutica',
    subcategoria: 'MÃ©todos',
    conteudo: [
      'A tipologia estuda prefiguraÃ§Ãµes no AT que se cumprem no NT.',
      'Ã‰ diferente de alegoria â€” Ã© baseada no texto bÃ­blico.',
      'Exemplos: AdÃ£o-Cristo, Arca-Batismo, PÃ¡scoa-Ceia.',
      'A tipologia Ã© legÃ­tima quando o NT confirma.',
      'Enriquece a compreensÃ£o bÃ­blica.'
    ],
    versicosChave: ['Romanos 5:14', '1 CorÃ­ntios 10:1-4', 'Hebreus 9:11-14'],
    tags: ['tipologia', 'prefiguraÃ§Ã£o', 'AT', 'NT', 'cumprimento'],
    fontes: ['G.K. Beale, The Temple and the Church\'s Mission']
  },
  {
    id: 'he-008',
    titulo: 'Narrativa BÃ­blica â€” InterpretaÃ§Ã£o Narrativa',
    categoria: 'HermenÃªutica',
    subcategoria: 'MÃ©todos',
    conteudo: [
      'A interpretaÃ§Ã£o narrativa respeita a narrativa como gÃªnero.',
      'Personagens, enredo, tema e cenÃ¡rio sÃ£o elementos-chave.',
      'A narrativa bÃ­blica tem unidade â€” aponta para Cristo.',
      'A moral da histÃ³ria deve ser extraÃ­da com cuidado.',
      'A BÃ­blia Ã© histÃ³ria que se torna teologia.'
    ],
    versicosChave: ['Lucas 24:27', '1 CorÃ­ntios 10:11'],
    tags: ['narrativa', 'histÃ³ria', 'personagens', 'enredo'],
    fontes: ['Leland Ryken, How to Read the Bible as Literature']
  },
  {
    id: 'he-009',
    titulo: 'Poesia Hebraica â€” Paralelismo e Imagem',
    categoria: 'HermenÃªutica',
    subcategoria: 'Poesia',
    conteudo: [
      'A poesia hebraica usa paralelismo: sinÃ´nimo, antitÃ©tico, sintÃ©tico.',
      'As imagens sÃ£o vÃ­vidas e concretas.',
      'O Salmo 23 usa metÃ¡fora pastoral.',
      'A poesia expressa emoÃ§Ã£o, nÃ£o apenas doutrina.',
      'A interpretaÃ§Ã£o deve respeitar o gÃªnero poÃ©tico.'
    ],
    versicosChave: ['Salmo 23:1-6', 'Salmo 119:105', 'ProvÃ©rbios 3:5-6'],
    tags: ['poesia', 'paralelismo', 'metÃ¡fora', 'imagem'],
    fontes: ['Claus Westermann, Praise and Lament in the Psalms']
  },
  {
    id: 'he-010',
    titulo: 'Profecia â€” Literal e SimbÃ³lica',
    categoria: 'HermenÃªutica',
    subcategoria: 'Profecia',
    conteudo: [
      'A profecia pode ser literal (IsaÃ­as 53) ou simbÃ³lica (Apocalipse).',
      'O contexto determina a interpretaÃ§Ã£o.',
      'As profecias messiÃ¢nicas sÃ£o tipicamente literais.',
      'O Apocalipse usa simbolismo apocalÃ­ptico.',
      'O cuidado hermenÃªutico Ã© necessÃ¡rio.'
    ],
    versicosChave: ['IsaÃ­as 53:5', 'Apocalipse 1:1-3', 'Daniel 7:13-14'],
    tags: ['profecia', 'literal', 'simbÃ³lico', 'Apocalipse'],
    fontes: ['G.K. Beale, Revelation (NICNT)']
  },
  {
    id: 'he-011',
    titulo: 'ParÃ¡bolas de Jesus â€” InterpretaÃ§Ã£o',
    categoria: 'HermenÃªutica',
    subcategoria: 'GÃªneros',
    conteudo: [
      'As parÃ¡bolas sÃ£o histÃ³rias com liÃ§Ã£o moral ou espiritual.',
      'Cada parÃ¡bola tem ponto central â€” nÃ£o devemos detalhar demais.',
      'O contexto revela o significado.',
      'As parÃ¡bolas sÃ£o sobre o Reino de Deus.',
      'Devemos buscar o significado do autor, nÃ£o inventar.'
    ],
    versicosChave: ['Mateus 13:10-17', 'Lucas 15:11-32'],
    tags: ['parÃ¡bolas', 'Reino', 'Jesus', 'interpretaÃ§Ã£o'],
    fontes: ['Klyne Snodgrass, Stories with Intent']
  },
  {
    id: 'he-012',
    titulo: 'Hebreus â€” HermenÃªutica do Novo Testamento',
    categoria: 'HermenÃªutica',
    subcategoria: 'HermenÃªutica NT',
    conteudo: [
      'Hebreus Ã© exemplo de hermenÃªutica do NT aplicando o AT.',
      'Cristo Ã© superior a anjos, MoisÃ©s, AarÃ£o.',
      'O novo testamento Ã© superior ao antigo.',
      'A continuidade Ã© tema central.',
      'O mÃ©todo Ã© tipolÃ³gico e christocentric.'
    ],
    versicosChave: ['Hebreus 1:1-3', 'Hebreus 8:6-13'],
    tags: ['Hebreus', 'hermenÃªutica', 'AT', 'superioridade'],
    fontes: ['Craig Koester, Hebrews (Anchor)']
  },
  {
    id: 'he-013',
    titulo: 'Paulo e a Lei â€” HermenÃªutica Paulina',
    categoria: 'HermenÃªutica',
    subcategoria: 'HermenÃªutica NT',
    conteudo: [
      'Paulo tem hermenÃªutica prÃ³pria da Lei.',
      'A lei Ã© pedagogo para Cristo.',
      'A justificaÃ§Ã£o Ã© pela fÃ©, nÃ£o pela lei.',
      'A lei moral permanece, as cerimÃ´nias cessam.',
      'O equilÃ­brio entre graÃ§a e obediÃªncia.'
    ],
    versicosChave: ['GÃ¡latas 3:24', 'Romanos 7:7-12', 'Romanos 10:4'],
    tags: ['Paulo', 'lei', 'justificaÃ§Ã£o', 'hermenÃªutica'],
    fontes: ['N.T. Wright, Paul and the Faithfulness of God']
  },
  {
    id: 'he-014',
    titulo: 'Cristologia da Escritura â€” Unidade e Diversidade',
    categoria: 'HermenÃªutica',
    subcategoria: 'Cristologia',
    conteudo: [
      'Cristo Ã© o centro de toda a Escritura.',
      'A cristologia se desenvolve progressivamente.',
      'O AT prefigura; o NT declara.',
      'Cada livro contribui para a cristologia.',
      'A unidade cristolÃ³gica Ã© fundamental.'
    ],
    versicosChave: ['Lucas 24:27', 'JoÃ£o 5:39', 'Hebreus 1:1-2'],
    tags: ['Cristo', 'cristologia', 'unidade', 'progressÃ£o'],
    fontes: ['Graeme Goldsworthy, According to Plan']
  },
  {
    id: 'he-015',
    titulo: 'InterpretaÃ§Ã£o do Apocalipse',
    categoria: 'HermenÃªutica',
    subcategoria: 'Apocalipse',
    conteudo: [
      'O Apocalipse Ã© gÃªnero apocalÃ­ptico â€” sÃ­mbolos e visÃµes.',
      'Existem quatro abordagens: preterista, historicista, futurista, idealista.',
      'O sÃ­mbolo deve ser interpretado pelo contexto.',
      'A mensagem Ã© de esperanÃ§a e juÃ­zo.',
      'Cristo Ã© vitorioso sobre todas as forÃ§as do mal.'
    ],
    versicosChave: ['Apocalipse 1:1-3', 'Apocalipse 22:18-19'],
    tags: ['Apocalipse', 'sÃ­mbolos', 'visÃµes', 'esperanÃ§a'],
    fontes: ['G.K. Beale, Revelation (NICNT)']
  },
  {
    id: 'he-016',
    titulo: 'InterpretaÃ§Ã£o de Eclesiastes',
    categoria: 'HermenÃªutica',
    subcategoria: 'Livros PoÃ©ticos',
    conteudo: [
      'Eclesiastes Ã© gÃªnero sapiencial â€” reflexÃ£o sobre a vida.',
      'O tema Ã© a vanidade (hevel) de tudo sob o sol.',
      'A conclusÃ£o: temer a Deus e guardar os mandamentos.',
      'O pessimismo Ã© aparente â€” Ã© realismo fÃ©.',
      'A relevÃ¢ncia para a vida contemporÃ¢nea.'
    ],
    versicosChave: ['Eclesiastes 1:2', 'Eclesiastes 12:13'],
    tags: ['eclesiastes', 'vanidade', 'sabedoria', 'realismo'],
    fontes: ['Tremper Longman III, Ecclesiastes (NICOT)']
  },
  {
    id: 'he-017',
    titulo: 'Salmos de Lamento â€” InterpretaÃ§Ã£o',
    categoria: 'HermenÃªutica',
    subcategoria: 'Poesia',
    conteudo: [
      'Os Salmos de lamento expressam dor e busca por Deus.',
      'Estrutura: invocaÃ§Ã£o, queixa, confianÃ§a, petiÃ§Ã£o, louvor.',
      'Lamentar nÃ£o Ã© falta de fÃ© â€” Ã© fÃ© honesta.',
      'O louvor no final Ã© resposta de fÃ©.',
      'RelevÃ¢ncia para o sofrimento humano.'
    ],
    versicosChave: ['Salmo 13:1-6', 'Salmo 22:1-31', 'Salmo 88:1'],
    tags: ['lamento', 'dor', 'louvor', 'esperanÃ§a'],
    fontes: ['Walter Brueggemann, The Message of the Psalms']
  },
  {
    id: 'he-018',
    titulo: 'Profecias MessiÃ¢nicas â€” HermenÃªutica',
    categoria: 'HermenÃªutica',
    subcategoria: 'Profecia',
    conteudo: [
      'As profecias messiÃ¢nicas sÃ£o literais e simbÃ³licas.',
      'O contexto revela o cumprimento.',
      'Cristo Ã© o centro das profecias.',
      'O NT cumpre e interpreta o AT.',
      'A unidade profÃ©tica Ã© evidÃªncia divina.'
    ],
    versicosChave: ['IsaÃ­as 53', 'Salmo 22', 'Daniel 7:13-14'],
    tags: ['messias', 'profecia', 'cumprimento', 'AT', 'NT'],
    fontes: ['Walter Kaiser, The Messiah in the Old Testament']
  },
  {
    id: 'he-019',
    titulo: 'Ã‰tica no AT e NT â€” Continuidade',
    categoria: 'HermenÃªutica',
    subcategoria: 'Ã‰tica',
    conteudo: [
      'A Ã©tica bÃ­blica tem continuidade e mudanÃ§a.',
      'O amor Ã© a forma da lei.',
      'A justiÃ§a Ã© tema permanente.',
      'A misericÃ³rdia transcende rituais.',
      'A Ã©tica cristÃ£ Ã© centrada em Cristo.'
    ],
    versicosChave: ['Mateus 22:37-40', 'Romanos 13:8-10', 'Tiago 2:8'],
    tags: ['Ã©tica', 'lei', 'amor', 'justiÃ§a', 'continuidade'],
    fontes: ['Calvino, Institutas II.7-8']
  },
  {
    id: 'he-020',
    titulo: 'HermenÃªutica Reformada â€” PrincÃ­pios',
    categoria: 'HermenÃªutica',
    subcategoria: 'Reforma',
    conteudo: [
      'A hermenÃªutica reformada enfatiza: analogia da fÃ©, senso comum, oraÃ§Ã£o.',
      'A BÃ­blia interpreta a BÃ­blia.',
      'O EspÃ­rito Santo ilumina a compreensÃ£o.',
      'A Igreja Ã© comunidade de interpretaÃ§Ã£o.',
      'O objetivo Ã© glorificar a Deus e edificar o povo.'
    ],
    versicosChave: ['2 TimÃ³teo 2:15', '1 CorÃ­ntios 2:12-14', 'Salmos 119:18'],
    tags: ['reforma', 'hermenÃªutica', 'analogia', 'iluminaÃ§Ã£o'],
    fontes: ['Calvino, Institutas I.14']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // MAIS ESTUDOS â€” TEOLOGIA PROPER
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'dp-051',
    titulo: 'A OmnipresenÃ§a de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'Deus estÃ¡ presente em todos os lugares ao mesmo tempo.',
      'NÃ£o hÃ¡ lugar onde Deus nÃ£o esteja â€” nem o cÃ©u nem o inferno.',
      'A omnipresenÃ§a nÃ£o Ã© panteÃ­smo â€” Deus estÃ¡ em toda parte mas nÃ£o Ã© tudo.',
      'Para o crente, a omnipresenÃ§a Ã© consolo: Deus estÃ¡ presente na dor e na alegria.',
      'Para o Ã­mpio, Ã© temor: nÃ£o hÃ¡ esconderijo do olhar divino.'
    ],
    versicosChave: ['Salmos 139:7-12', 'Jeremias 23:23-24', 'ProvÃ©rbios 15:3'],
    tags: ['onipresenÃ§a', 'presenÃ§a de Deus', 'transcendÃªncia', 'imanÃªncia'],
    fontes: ['A.W. Tozer, The Knowledge of the Holy']
  },
  {
    id: 'dp-052',
    titulo: 'A GraÃ§a IrresistÃ­vel',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A graÃ§a irresistÃ­vel Ã© a capacitaÃ§Ã£o divina que inclina o coraÃ§Ã£o humano para aceitar o evangelho.',
      'Quando Deus chama eficazmente, o homem responde positivamente.',
      'NÃ£o Ã© coerÃ§Ã£o â€” Ã© transformaÃ§Ã£o do desejo.',
      'A graÃ§a nÃ£o anula a liberdade â€” ela a restaura.',
      'A pessoa regenerada deseja a Deus porque sua natureza foi transformada.'
    ],
    versicosChave: ['JoÃ£o 6:37', 'JoÃ£o 6:44', 'Filipenses 2:13', 'Romanos 9:16'],
    tags: ['graÃ§a irresistÃ­vel', 'chamado eficaz', 'regeneraÃ§Ã£o', 'calvinismo'],
    fontes: ['Calvino, Institutas III.24', 'Jonathan Edwards, On the Freedom of the Will']
  },
  {
    id: 'dp-053',
    titulo: 'A EleiÃ§Ã£o Incondicional',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A eleiÃ§Ã£o incondicional sustenta que Deus escolhe os eleitos sem referÃªncia a mÃ©rito ou fÃ© prevista.',
      'A escolha Ã© baseada no bom prazer da Sua vontade.',
      'A eleiÃ§Ã£o Ã© para salvaÃ§Ã£o e santificaÃ§Ã£o.',
      'A reprovaÃ§Ã£o Ã© justa â€” os rÃ©us sÃ£o culpados.',
      'A eleiÃ§Ã£o humilha o orgulho e exalta a graÃ§a.'
    ],
    versicosChave: ['EfÃ©sios 1:4-5', 'Romanos 9:11-13', '1 Pedro 1:1-2', '2 TimÃ³teo 1:9'],
    tags: ['eleiÃ§Ã£o', 'incondicional', 'decreto', 'predestinaÃ§Ã£o'],
    fontes: ['Calvino, Institutas III.21-24', 'Theodore Beza, On the Election of the Apostles']
  },
  {
    id: 'dp-054',
    titulo: 'A SubstituiÃ§Ã£o Penal',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A substituiÃ§Ã£o penal sustenta que Cristo sofreu o castigo que nÃ³s merecÃ­amos.',
      'Ele morreu em nosso lugar â€” assumindo a ira divina.',
      'A satisfaÃ§Ã£o plena foi oferecida na cruz.',
      'O pecado foi transferido a Cristo; a justiÃ§a a nÃ³s.',
      'Esta Ã© a compreensÃ£o predominante da expiaÃ§Ã£o.'
    ],
    versicosChave: ['IsaÃ­as 53:5', '2 CorÃ­ntios 5:21', '1 Pedro 2:24', 'Romanos 3:25'],
    tags: ['substituiÃ§Ã£o penal', 'expiaÃ§Ã£o', 'ira de Deus', 'satisfaÃ§Ã£o'],
    fontes: ['John Stott, The Cross of Christ', 'Roger Nicole, The Nature of the Atonement']
  },
  {
    id: 'dp-055',
    titulo: 'A Descida aos Infernos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Cristologia',
    conteudo: [
      'O credo declara que Cristo desceu aos infernos â€” interpretado como descida aos mortos.',
      'NÃ£o Ã© sofrimento adicional mas proclamaÃ§Ã£o de vitÃ³ria.',
      'Cristo pregou aos espÃ­ritos em prisÃ£o (1 Pedro 3:19).',
      'A descida completa a condiÃ§Ã£o humana.',
      'Cristo Ã© Senhor mesmo no mundo dos mortos.'
    ],
    versicosChave: ['1 Pedro 3:18-20', 'EfÃ©sios 4:8-10', 'Filipenses 2:10-11'],
    tags: ['descida aos infernos', 'credo', '1 Pedro', 'vitÃ³ria'],
    fontes: ['Hans Urs von Balthasar, Mysterium Paschale']
  },
  {
    id: 'dp-056',
    titulo: 'A IntercessÃ£o de Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Cristologia',
    conteudo: [
      'Cristo intercede por nÃ³s Ã  destra do Pai.',
      'Sua intercessÃ£o Ã© baseada em Sua obra consumada.',
      'Ele Ã© Sumo Sacerdote que compreende nossas fraquezas.',
      'A intercessÃ£o Ã© garantia de nossa salvaÃ§Ã£o.',
      'Nada pode nos separar do amor de Deus em Cristo.'
    ],
    versicosChave: ['Romanos 8:34', 'Hebreus 7:25', '1 JoÃ£o 2:1', 'Hebreus 4:14-16'],
    tags: ['intercessÃ£o', 'sumo sacerdote', 'destra de Deus', 'oraÃ§Ã£o'],
    fontes: ['Calvino, Institutas II.16', 'Hebreus (comentÃ¡rio)']
  },
  {
    id: 'dp-057',
    titulo: 'A Volta de Cristo em GlÃ³ria',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A volta de Cristo serÃ¡ visÃ­vel, literal, pessoal e gloriosa.',
      'Todos verÃ£o a vinda do Filho do Homem.',
      'A volta Ã© certa â€” nÃ£o Ã© possibility mas certeza.',
      'Os sinais precedem a volta, mas o dia e hora sÃ£o desconhecidos.',
      'A volta Ã© motivaÃ§Ã£o para santidade e missionarismo.'
    ],
    versicosChave: ['Mateus 24:30', 'Atos 1:11', '1 Tessalonicenses 4:16-17', 'Apocalipse 1:7'],
    tags: ['volta de Cristo', 'parousia', 'segunda vinda', 'visÃ­vel', 'gloriosa'],
    fontes: ['G.E. Ladd, The Blessed Hope']
  },
  {
    id: 'dp-058',
    titulo: 'A RessurreiÃ§Ã£o dos Mortos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A ressurreiÃ§Ã£o dos mortos Ã© certeza â€” todos ressuscitarÃ£o.',
      'A dos justos Ã© para vida eterna; a dos injustos para condenaÃ§Ã£o.',
      'A ressurreiÃ§Ã£o Ã© corporal â€” corpos transformados.',
      'Cristo Ã© o primeiro dos que dormem.',
      'A ressurreiÃ§Ã£o Ã© fundamento da esperanÃ§a cristÃ£.'
    ],
    versicosChave: ['JoÃ£o 5:28-29', '1 CorÃ­ntios 15:20-23', 'Daniel 12:2', 'Atos 24:15'],
    tags: ['ressurreiÃ§Ã£o', 'mortos', 'vida eterna', 'condenaÃ§Ã£o'],
    fontes: ['N.T. Wright, The Resurrection of the Son of God']
  },
  {
    id: 'dp-059',
    titulo: 'O Novo CÃ©u e a Nova Terra',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A consumaÃ§Ã£o final Ã© a restauraÃ§Ã£o de todas as coisas.',
      'Novos cÃ©us e nova terra â€” nÃ£o destruiÃ§Ã£o mas renovaÃ§Ã£o.',
      'Deus habitarÃ¡ com os homens.',
      'NÃ£o haverÃ¡ mais morte, dor nem choro.',
      'A esperanÃ§a cristÃ£ Ã© restauraÃ§Ã£o completa.'
    ],
    versicosChave: ['Apocalipse 21:1-5', 'Romanos 8:19-22', '2 Pedro 3:10-13', 'IsaÃ­as 65:17'],
    tags: ['nova criaÃ§Ã£o', 'renovaÃ§Ã£o', 'consumaÃ§Ã£o', 'esperanÃ§a'],
    fontes: ['N.T. Wright, Surprised by Hope', 'G.K. Beale, The Temple and the Church\'s Mission']
  },
  {
    id: 'dp-060',
    titulo: 'A MissÃ£o da Igreja',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A missÃ£o Ã© a razÃ£o de ser da Igreja.',
      'A Grande ComissÃ£o Ã© o mandato: fazer discÃ­pulos.',
      'A missÃ£o inclui evangelismo e serviÃ§o.',
      'A Igreja nasceu como comunidade missionÃ¡ria.',
      'A contextualizaÃ§Ã£o Ã© desafio constante.'
    ],
    versicosChave: ['Mateus 28:19-20', 'Atos 1:8', 'Romanos 10:14-15'],
    tags: ['missÃ£o', 'evangelismo', 'discipulado', 'Grande ComissÃ£o'],
    fontes: ['David Bosch, Transforming Mission']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // MAIS ESTUDOS â€” TEMAS POR LIVRO
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'tl-041',
    titulo: 'LevÃ­tico â€” Santidade e SacrificaÃ§Ã£o',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'LevÃ­tico Ã© o livro da santidade â€” como o povo se aproxima de Deus santo.',
      'Os sacrifÃ­cios apontam para Cristo â€” cordeiro imolado.',
      'As leis de pureza revelam a santidade de Deus.',
      'O Dia da ExpiaÃ§Ã£o Ã© tipo de redenÃ§Ã£o em Cristo.',
      'A santidade Ã© chamado para todo o povo.'
    ],
    versicosChave: ['LevÃ­tico 19:2', 'LevÃ­tico 16:1-34', 'Hebreus 9:11-14'],
    tags: ['LevÃ­tico', 'santidade', 'sacrifÃ­cio', 'pureza'],
    fontes: ['Gordon Wenham, Leviticus (NICOT)']
  },
  {
    id: 'tl-042',
    titulo: 'JuÃ­zes â€” CÃ­rculo de Pecado',
    categoria: 'Temas por Livro',
    subcategoria: 'HistÃ³ricos',
    conteudo: [
      'O ciclo de JuÃ­zes: pecado â†’ julgamento â†’ clamor â†’ libertaÃ§Ã£o.',
      'Cada juiz Ã© instrumento imperfeito de Deus.',
      'A ausÃªncia de rei leva a anarquia moral.',
      'Deus nÃ£o desiste do Seu povo.',
      'A necessidade de um Rei perfeito â€” Cristo.'
    ],
    versicosChave: ['JuÃ­zes 2:11-19', 'JuÃ­zes 21:25', '1 Samuel 8:5-7'],
    tags: ['JuÃ­zes', 'ciclo', 'pecado', 'libertadores'],
    fontes: ['Barry Webb, The Book of Judges']
  },
  {
    id: 'tl-043',
    titulo: 'Rute â€” GraÃ§a Gentia',
    categoria: 'Temas por Livro',
    subcategoria: 'HistÃ³ricos',
    conteudo: [
      'Rute, moabita, entra no povo de Deus pela graÃ§a.',
      'A lealdade de Rute Ã© exemplar.',
      'Boaz Ã© redentor â€” tipo de Cristo.',
      'A linhagem messiÃ¢nica inclui gentios.',
      'A providÃªncia de Deus no cotidiano.'
    ],
    versicosChave: ['Rute 1:16-17', 'Mateus 1:5', 'Lucas 3:32'],
    tags: ['Rute', 'gentios', 'graÃ§a', 'redenÃ§Ã£o', 'Boaz'],
    fontes: ['Daniel Block, Ruth (NICOT)']
  },
  {
    id: 'tl-044',
    titulo: '1 CrÃ´nicas â€” AdoraÃ§Ã£o e Genealogias',
    categoria: 'Temas por Livro',
    subcategoria: 'HistÃ³ricos',
    conteudo: [
      'As genealogias mostram continuidade e propÃ³sito divino.',
      'A adoraÃ§Ã£o no templo Ã© central.',
      'Davi Ã© organizador da adoraÃ§Ã£o.',
      'A bÃªnÃ§Ã£o final Ã© paz e prosperidade.',
      'A restauraÃ§Ã£o pÃ³s-exÃ­lio Ã© tema.'
    ],
    versicosChave: ['1 CrÃ´nicas 16:8-36', '2 CrÃ´nicas 7:14', '1 CrÃ´nicas 29:10-20'],
    tags: ['CrÃ´nicas', 'adoraÃ§Ã£o', 'genealogias', 'Davi'],
    fontes: ['J. Barton Payne, 1 Chronicles (WBC)']
  },
  {
    id: 'tl-045',
    titulo: 'Esdras â€” Reforma e Leitura da Lei',
    categoria: 'Temas por Livro',
    subcategoria: 'HistÃ³ricos',
    conteudo: [
      'Esdra Ã© escriba e reformador.',
      'A leitura pÃºblica da Lei transforma o povo.',
      'A confissÃ£o de pecados e separaÃ§Ã£o.',
      'A restauraÃ§Ã£o do culto.',
      'A fidelidade Ã  Palavra de Deus.'
    ],
    versicosChave: ['Esdras 7:10', 'Esdras 8:21-23', 'Neemias 8:8-10'],
    tags: ['Esdras', 'reforma', 'Lei', 'confissÃ£o'],
    fontes: ['Ralph Klein, 1 Chronicles (OTL)']
  },
  {
    id: 'tl-046',
    titulo: 'Neemias â€” ReconstruÃ§Ã£o e OraÃ§Ã£o',
    categoria: 'Temas por Livro',
    subcategoria: 'HistÃ³ricos',
    conteudo: [
      'Neemias reconstrÃ³i os muros de JerusalÃ©m.',
      'A oraÃ§Ã£o Ã© central em sua lideranÃ§a.',
      'A oposiÃ§Ã£o Ã© enfrentada com fÃ© e trabalho.',
      'A Lei Ã© lida e obedecida.',
      'A restauraÃ§Ã£o fÃ­sica e espiritual.'
    ],
    versicosChave: ['Neemias 1:4-11', 'Neemias 2:17-18', 'Neemias 4:14'],
    tags: ['Neemias', 'oraÃ§Ã£o', 'muros', 'lideranÃ§a'],
    fontes: ['J.A. Thompson, The Book of Jeremiah (NICOT)']
  },
  {
    id: 'tl-047',
    titulo: 'Ester â€” ProvidÃªncia Divina',
    categoria: 'Temas por Livro',
    subcategoria: 'HistÃ³ricos',
    conteudo: [
      'O nome de Deus nÃ£o aparece mas Sua providÃªncia Ã© evidente.',
      'Ester arriscam a vida por Seu povo.',
      'Mardoqueu e HamÃ£ â€” o conflito entre bem e mal.',
      'Purim Ã© celebraÃ§Ã£o da libertaÃ§Ã£o.',
      'Deus usa circunstÃ¢ncias para cumprir propÃ³sitos.'
    ],
    versicosChave: ['Ester 4:14', 'Ester 7:3-4', 'Ester 9:22'],
    tags: ['Ester', 'providÃªncia', 'coragem', 'Purim'],
    fontes: ['Karen Jobes, Esther (NICOT)']
  },
  {
    id: 'tl-048',
    titulo: 'Eclesiastes â€” Vanidade e Sentido',
    categoria: 'Temas por Livro',
    subcategoria: 'Livros PoÃ©ticos',
    conteudo: [
      'Tudo sob o sol Ã© vaidade â€” nÃ£o pessimismo mas realismo.',
      'A busca pelo sentido da vida.',
      'O contentamento nos dons de Deus.',
      'A mortalidade Ã© realidade.',
      'A conclusÃ£o: temer a Deus.'
    ],
    versicosChave: ['Eclesiastes 1:2', 'Eclesiastes 3:11', 'Eclesiastes 12:13'],
    tags: ['eclesiastes', 'vanidade', 'sentido', 'contentamento'],
    fontes: ['Tremper Longman III, Ecclesiastes']
  },
  {
    id: 'tl-049',
    titulo: 'CÃ¢nticos â€” Amor e Relacionamento',
    categoria: 'Temas por Livro',
    subcategoria: 'Livros PoÃ©ticos',
    conteudo: [
      'O CÃ¢ntico dos CÃ¢nticos Ã© poesia de amor.',
      'O amor humano Ã© celebrado como dom de Deus.',
      'A interpretaÃ§Ã£o alegÃ³rica vÃª Cristo e a Igreja.',
      'A interpretaÃ§Ã£o literal vÃª o amor conjugal.',
      'O amor Ã© forte como a morte.'
    ],
    versicosChave: ['CÃ¢nticos 8:6', 'CÃ¢nticos 2:16', 'EfÃ©sios 5:25-32'],
    tags: ['CÃ¢nticos', 'amor', 'casamento', 'relacionamento'],
    fontes: ['Richard Hess, Song of Songs (Baker)']
  },
  {
    id: 'tl-050',
    titulo: 'LamentaÃ§Ãµes â€” Dor e EsperanÃ§a',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'LamentaÃ§Ãµes Ã© lamento pela destruiÃ§Ã£o de JerusalÃ©m.',
      'As lÃ¡grimas de Jeremias sÃ£o modelo de lamento.',
      'As misericÃ³rdias de Deus se renovam a cada manhÃ£.',
      'O julgamento Ã© real mas nÃ£o Ã© o fim.',
      'A esperanÃ§a estÃ¡ em Deus.'
    ],
    versicosChave: ['LamentaÃ§Ãµes 3:22-23', 'LamentaÃ§Ãµes 3:1-21', 'LamentaÃ§Ãµes 5:1-22'],
    tags: ['LamentaÃ§Ãµes', 'lamento', 'esperanÃ§a', 'destruiÃ§Ã£o'],
    fontes: ['LamentaÃ§Ãµes (comentÃ¡rio)']
  },
  {
    id: 'tl-051',
    titulo: 'OsÃ©ias â€” Amor Infinito',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Deus como marido fiel de Israel infiel.',
      'O amor de Deus persiste apesar da traiÃ§Ã£o.',
      'A restauraÃ§Ã£o Ã© prometida.',
      'A fidelidade divina Ã© tema central.',
      'O amor redentor transcunde o pecado.'
    ],
    versicosChave: ['OsÃ©ias 11:8', 'OsÃ©ias 3:1', 'OsÃ©ias 14:4'],
    tags: ['OsÃ©ias', 'amor', 'fidelidade', 'restauraÃ§Ã£o'],
    fontes: ['Douglas Stuart, Hosea (NICOT)']
  },
  {
    id: 'tl-052',
    titulo: 'AmÃ³s â€” JustiÃ§a Social',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'AmÃ³s Ã© profeta da justiÃ§a social.',
      'Deus exige justiÃ§a, nÃ£o apenas ritual.',
      'A exploraÃ§Ã£o dos pobres Ã© pecado.',
      'Deixe correr a justiÃ§a como Ã¡gua.',
      'O julgamento Ã© certo para os opressores.'
    ],
    versicosChave: ['AmÃ³s 5:24', 'AmÃ³s 6:4-7', 'AmÃ³s 2:6-7'],
    tags: ['AmÃ³s', 'justiÃ§a social', 'pobres', 'opressÃ£o'],
    fontes: ['Jack Crenshaw, AmÃ³s (WBC)']
  },
  {
    id: 'tl-053',
    titulo: 'Miqueias â€” JustiÃ§a, MisericÃ³rdia e Humildade',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Miqueias resume a fÃ©: justiÃ§a, misericÃ³rdia e humildade.',
      'O julgamento Ã© para os poderosos.',
      'A esperanÃ§a vem de BelÃ©m.',
      'A restauraÃ§Ã£o Ã© prometida.',
      'Deus Ã© pastor de Seu povo.'
    ],
    versicosChave: ['Miqueias 6:8', 'Miqueias 5:2', 'Miqueias 7:18-20'],
    tags: ['Miqueias', 'justiÃ§a', 'misericÃ³rdia', 'BelÃ©m'],
    fontes: ['Bruce Waltke, Micah (NICOT)']
  },
  {
    id: 'tl-054',
    titulo: 'Jonas â€” MisericÃ³rdia Universal',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Jonas resiste Ã  missÃ£o â€” mas Deus persiste.',
      'NÃ­nive se arrepende e Deus se arrepende do julgamento.',
      'A misericÃ³rdia de Deus transcende fronteiras.',
      'Jonas ensina sobre a universalidade da graÃ§a.',
      'A obediÃªncia ao chamado divino.'
    ],
    versicosChave: ['Jonas 4:11', 'Jonas 2:2', 'Jonas 3:10'],
    tags: ['Jonas', 'misericÃ³rdia', 'universalidade', 'obediÃªncia'],
    fontes: ['Douglas Stuart, Hosea-Jonah (NICOT)']
  },
  {
    id: 'tl-055',
    titulo: 'Habacuque â€” FÃ© no Meio do Caos',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Habacuque questiona Deus sobre a injustiÃ§a.',
      'Deus responde: o justo viverÃ¡ pela fÃ©.',
      'A fÃ© transcende as circunstÃ¢ncias.',
      'A confianÃ§a em meio ao sofrimento.',
      'O julgamento Ã© certo â€” mas a fÃ© persiste.'
    ],
    versicosChave: ['Habacuque 2:4', 'Habacuque 3:17-19', 'Romanos 1:17'],
    tags: ['Habacuque', 'fÃ©', 'injustiÃ§a', 'esperanÃ§a'],
    fontes: ['O. Palmer Robertson, The Books of Nahum, Habakkuk, and Zephaniah']
  },
  {
    id: 'tl-056',
    titulo: 'Zacarias â€” Profecias MessiÃ¢nicas',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Zacarias contÃ©m profecias messiÃ¢nicas detalhadas.',
      'O rei humilde montado em jumento.',
      'O pastor ferido.',
      'A fonte aberta para pecado.',
      'O Senhor virÃ¡ como rei justo.'
    ],
    versicosChave: ['Zacarias 9:9', 'Zacarias 12:10', 'Zacarias 13:1'],
    tags: ['Zacarias', 'messias', 'profecia', 'jumento'],
    fontes: ['Robert Merrill, Zechariah (NICOT)']
  },
  {
    id: 'tl-057',
    titulo: 'Malaquias â€” A Ãšltima Profecia',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Malaquias Ã© o Ãºltimo profeta do AT.',
      'O julgamento sobre a infidelidade.',
      'O mensageiro que prepara o caminho.',
      'A oferta de justiÃ§a.',
      'O dia do Senhor virÃ¡.'
    ],
    versicosChave: ['Malaquias 3:1', 'Malaquias 4:2', 'Malaquias 1:6-14'],
    tags: ['Malaquias', 'profecia', 'mensageiro', 'juÃ­zo'],
    fontes: ['Robert Hill, Malachi (AB)']
  },
  {
    id: 'tl-058',
    titulo: 'Mateus â€” SermÃ£o da Montanha',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'O SermÃ£o da Montanha Ã© constituiÃ§Ã£o do Reino.',
      'As bem-aventuranÃ§as sÃ£o retrato do discÃ­pulo.',
      'A Ã©tica do Reino Ã© superior Ã  da lei.',
      'O amor aos inimigos Ã© radical.',
      'A perfeiÃ§Ã£o do Pai como modelo.'
    ],
    versicosChave: ['Mateus 5:1-12', 'Mateus 5:48', 'Mateus 6:33'],
    tags: ['SermÃ£o da Montanha', 'bem-aventuranÃ§as', 'Ã©tica', 'Reino'],
    fontes: ['John Stott, The Message of the Sermon on the Mount']
  },
  {
    id: 'tl-059',
    titulo: 'Mateus â€” ParÃ¡bolas do Reino',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'Mateus 13 contÃ©m as principais parÃ¡bolas.',
      'O semeador â€” diferentes receptividades.',
      'O joio â€” coexistÃªncia de bons e maus.',
      'O grÃ£o de mostarda â€” crescimento gradual.',
      'O fermento â€” transformaÃ§Ã£o oculta.'
    ],
    versicosChave: ['Mateus 13:1-52', 'Mateus 13:31-33', 'Mateus 13:44-46'],
    tags: ['parÃ¡bolas', 'Reino', 'crescimento', 'transformaÃ§Ã£o'],
    fontes: ['Klyne Snodgrass, Stories with Intent']
  },
  {
    id: 'tl-060',
    titulo: 'Marcos â€” A PaixÃ£o de Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'A PaixÃ£o Ã© o clÃ­max do evangelho de Marcos.',
      'A ceia do Senhor Ã© estabelecida.',
      'O getsÃªmani revela o sofrimento.',
      'A crucificaÃ§Ã£o e morte.',
      'O tÃºmulo vazio â€” inÃ­cio da vitÃ³ria.'
    ],
    versicosChave: ['Marcos 14:22-25', 'Marcos 15:33-39', 'Marcos 16:1-8'],
    tags: ['PaixÃ£o', 'ceia', 'crucificaÃ§Ã£o', 'tÃºmulo vazio'],
    fontes: ['Ben Witherington III, The Gospel of Mark']
  },
  {
    id: 'tl-061',
    titulo: 'Lucas â€” Magnificat e CÃ¢nticos',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'Lucas contÃ©m os cÃ¢nticos da infÃ¢ncia.',
      'O Magnificat de Maria Ã© cÃ¢ntico revolucionÃ¡rio.',
      'O Benedictus de Zacarias.',
      'O Nunc Dimittis de SimeÃ£o.',
      'A poesia da salvaÃ§Ã£o.'
    ],
    versicosChave: ['Lucas 1:46-55', 'Lucas 1:67-79', 'Lucas 2:29-32'],
    tags: ['Magnificat', 'cÃ¢nticos', 'infÃ¢ncia', 'Maria'],
    fontes: ['Joel Green, Luke (NICOT)']
  },
  {
    id: 'tl-062',
    titulo: 'Lucas â€” ParÃ¡bolas da MisericÃ³rdia',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'Lucas enfatiza as parÃ¡bolas da misericÃ³rdia.',
      'O Bom Samaritano â€” amor ao prÃ³ximo.',
      'O Filho PrÃ³digo â€” misericÃ³rdia paterna.',
      'A ovelha perdida â€” busca divina.',
      'A dracma perdida â€” valor do que Ã© perdido.'
    ],
    versicosChave: ['Lucas 10:25-37', 'Lucas 15:11-32', 'Lucas 15:1-7'],
    tags: ['parÃ¡bolas', 'misericÃ³rdia', 'Bom Samaritano', 'Filho PrÃ³digo'],
    fontes: ['Klyne Snodgrass, Stories with Intent']
  },
  {
    id: 'tl-063',
    titulo: 'JoÃ£o â€” Sete Milagres (Sinais)',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'JoÃ£o seleciona sete sinais que revelam a glÃ³ria de Jesus.',
      'Ãgua em vinho (2), cura do filho (4), cura do paralÃ­tico (5)',
      'AlimentaÃ§Ã£o de 5000 (6), caminhar sobre Ã¡guas (6), cura do cego (9), ressurreiÃ§Ã£o de LÃ¡zaro (11).',
      'Cada sinal aponta para uma dimensÃ£o da divindade.',
      'Os sinais conduzem Ã  fÃ©.'
    ],
    versicosChave: ['JoÃ£o 20:30-31', 'JoÃ£o 2:11', 'JoÃ£o 11:4'],
    tags: ['sinais', 'milagres', 'JoÃ£o', 'divindade'],
    fontes: ['Craig Keener, John (HNTC)']
  },
  {
    id: 'tl-064',
    titulo: 'JoÃ£o â€” Disursos de Despedida',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'JoÃ£o 13-17 Ã© o discurso de despedida.',
      'O lava-pÃ©s como modelo de serviÃ§o.',
      'O Consolador (EspÃ­rito Santo) Ã© prometido.',
      'O novo mandamento do amor.',
      'A oraÃ§Ã£o sacerdotal de JoÃ£o 17.'
    ],
    versicosChave: ['JoÃ£o 13:34-35', 'JoÃ£o 14:16-17', 'JoÃ£o 17:1-26'],
    tags: ['despedida', 'EspÃ­rito Santo', 'amor', 'oraÃ§Ã£o sacerdotal'],
    fontes: ['Craig Keener, John (HNTC)']
  },
  {
    id: 'tl-065',
    titulo: 'Atos â€” O EspÃ­rito Santo na Igreja',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e EpÃ­stolas',
    conteudo: [
      'O EspÃ­rito Santo Ã© protagonista de Atos.',
      'EfusÃ£o em Pentecostes (2), Samaria (8), CornÃ©lio (10), Ã‰feso (19).',
      'O EspÃ­rito guia, capacita e envia.',
      'A expansÃ£o geogrÃ¡fica segue o guia do EspÃ­rito.',
      'A Igreja nascente Ã© modelo de dependÃªncia do EspÃ­rito.'
    ],
    versicosChave: ['Atos 2:1-4', 'Atos 1:8', 'Atos 13:2-4'],
    tags: ['EspÃ­rito Santo', 'Pentecostes', 'expansÃ£o', 'guia'],
    fontes: ['Gordon Fee, The Empowering Presence of the Holy Spirit']
  },
  {
    id: 'tl-066',
    titulo: 'Atos â€” A PerseguiÃ§Ã£o e a MissÃ£o',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e EpÃ­stolas',
    conteudo: [
      'A perseguiÃ§Ã£o espalha a Igreja.',
      'EstÃªvÃ£o Ã© o primeiro mÃ¡rtir.',
      'Paulo persegue e Ã© convertido.',
      'A missÃ£o avanÃ§a apesar da oposiÃ§Ã£o.',
      'O sangue dos mÃ¡rtires Ã© semente da Igreja.'
    ],
    versicosChave: ['Atos 8:1', 'Atos 7:54-60', 'Atos 9:1-19'],
    tags: ['perseguiÃ§Ã£o', 'mÃ¡rtires', 'EstÃªvÃ£o', 'Paulo'],
    fontes: ['Craig Keener, Acts (HNTC)']
  },
  {
    id: 'tl-067',
    titulo: 'Romanos â€” A Queda e a GraÃ§a',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e EpÃ­stolas',
    conteudo: [
      'Romanos 1-3 apresenta a queda universal.',
      'Romanos 3-5 apresenta a justificaÃ§Ã£o pela fÃ©.',
      'Romanos 6-8 apresenta a vida no EspÃ­rito.',
      'A transiÃ§Ã£o da morte para a vida.',
      'A graÃ§a transforma a condiÃ§Ã£o humana.'
    ],
    versicosChave: ['Romanos 3:23', 'Romanos 5:8', 'Romanos 8:1-2'],
    tags: ['queda', 'graÃ§a', 'justificaÃ§Ã£o', 'EspÃ­rito'],
    fontes: ['Douglas Moo, Romans (NICNT)']
  },
  {
    id: 'tl-068',
    titulo: 'Romanos â€” Israel e os Gentios',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e EpÃ­stolas',
    conteudo: [
      'Romanos 9-11 trata do papel de Israel na histÃ³ria da salvaÃ§Ã£o.',
      'Deus nÃ£o rejeitou Seu povo.',
      'Os gentios sÃ£o enxertados na oliveira.',
      'A restauraÃ§Ã£o de Israel Ã© prometida.',
      'A soberania e a responsabilidade humana.'
    ],
    versicosChave: ['Romanos 9:6-8', 'Romanos 11:25-27', 'Romanos 11:17-24'],
    tags: ['Israel', 'gentios', 'soberania', 'restauraÃ§Ã£o'],
    fontes: ['Douglas Moo, Romans (NICNT)']
  },
  {
    id: 'tl-069',
    titulo: '1 CorÃ­ntios â€” Dons Espirituais',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e EpÃ­stolas',
    conteudo: [
      '1 CorÃ­ntios 12-14 trata dos dons espirituais.',
      'A diversidade de dons para edificaÃ§Ã£o da Igreja.',
      'O amor Ã© o critÃ©rio supremo.',
      'A ordem no culto Ã© necessÃ¡ria.',
      'Os dons sÃ£o para serviÃ§o, nÃ£o exaltaÃ§Ã£o.'
    ],
    versicosChave: ['1 CorÃ­ntios 12:4-11', '1 CorÃ­ntios 13:1-13', '1 CorÃ­ntios 14:40'],
    tags: ['dons espirituais', 'amor', 'ordem', 'culto'],
    fontes: ['Anthony Thiselton, 1 Corinthians']
  },
  {
    id: 'tl-070',
    titulo: '2 CorÃ­ntios â€” ConsolaÃ§Ã£o e ForÃ§a',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e EpÃ­stolas',
    conteudo: [
      '2 CorÃ­ntios Ã© a epÃ­stola mais pessoal de Paulo.',
      'A graÃ§a Ã© suficiente na fraqueza.',
      'O ministÃ©rio da reconciliaÃ§Ã£o.',
      'A nova criatura em Cristo.',
      'A generosidade Ã© principio cristÃ£o.'
    ],
    versicosChave: ['2 CorÃ­ntios 12:9', '2 CorÃ­ntios 5:17', '2 CorÃ­ntios 5:18-20'],
    tags: ['2 CorÃ­ntios', 'graÃ§a', 'forÃ§a', 'reconciliaÃ§Ã£o'],
    fontes: ['Frank Matera, 2 Corinthians']
  },
  {
    id: 'tl-071',
    titulo: 'EfÃ©sios â€” As BÃªnÃ§Ã£os Espirituais',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e EpÃ­stolas',
    conteudo: [
      'EfÃ©sios 1 lista bÃªnÃ§Ã£os espirituais em Cristo.',
      'Escolhidos antes da fundaÃ§Ã£o do mundo.',
      'Redimidos pelo sangue de Cristo.',
      'Selados com o EspÃ­rito Santo.',
      'HeranÃ§a garantida atÃ© a redenÃ§Ã£o final.'
    ],
    versicosChave: ['EfÃ©sios 1:3-14', 'EfÃ©sios 1:4', 'EfÃ©sios 1:13-14'],
    tags: ['bÃªnÃ§Ã£os', 'eleiÃ§Ã£o', 'redenÃ§Ã£o', 'selo do EspÃ­rito'],
    fontes: ['Peter O\'Brien, Ephesians']
  },
  {
    id: 'tl-072',
    titulo: 'Filipenses â€” A Kenosis de Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e EpÃ­stolas',
    conteudo: [
      'Filipenses 2:6-11 Ã© o hino cristolÃ³gico mais antigo.',
      'Cristo se esvaziou voluntariamente.',
      'Assumiu forma de servo.',
      'Foi humilhado atÃ© a morte de cruz.',
      'Exaltado ao nome acima de todo nome.'
    ],
    versicosChave: ['Filipenses 2:6-11', 'Filipenses 2:7-8'],
    tags: ['kenosis', 'humildade', 'exaltaÃ§Ã£o', 'hino cristolÃ³gico'],
    fontes: ['Gordon Fee, Philippians']
  },
  {
    id: 'tl-073',
    titulo: 'Colossenses â€” Cristo, Image de Deus',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e EpÃ­stolas',
    conteudo: [
      'Cristo Ã© imagem do Deus invisÃ­vel.',
      'PrimogÃªnito de toda a criatura.',
      'Nele habita toda a plenitude.',
      'A cabeÃ§a de toda a Igreja.',
      'A suficiÃªncia de Cristo contra falsos mestres.'
    ],
    versicosChave: ['Colossenses 1:15-20', 'Colossenses 2:9-10', 'Colossenses 3:1-4'],
    tags: ['Cristo', 'imagem', 'plenitude', 'suficiÃªncia'],
    fontes: ['Gordon Fee, Colossians']
  },
  {
    id: 'tl-074',
    titulo: '1 Tessalonicenses â€” A Volta de Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e EpÃ­stolas',
    conteudo: [
      '1 Tessalonicenses Ã© a epÃ­stola mais antiga.',
      'O tema Ã© a segunda vinda.',
      'Consolo para os que perderam entes queridos.',
      'VigilÃ¢ncia e santificaÃ§Ã£o.',
      'A esperanÃ§a motiva a santidade.'
    ],
    versicosChave: ['1 Tessalonicenses 4:16-17', '1 Tessalonicenses 5:1-11'],
    tags: ['segunda vinda', 'esperanÃ§a', 'vigilÃ¢ncia', 'consolo'],
    fontes: ['Gordon Fee, 1 and 2 Thessalonians']
  },
  {
    id: 'tl-075',
    titulo: '2 Tessalonicenses â€” A Volta e a VigilÃ¢ncia',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e EpÃ­stolas',
    conteudo: [
      '2 Tessalonicenses corrige equÃ­vocos sobre a volta.',
      'O dia do Senhor virÃ¡ inesperadamente.',
      'O Homem da Iniquidade serÃ¡ revelado.',
      'A fidelidade no trabalho Ã© enfatizada.',
      'A vigilÃ¢ncia Ã© constante.'
    ],
    versicosChave: ['2 Tessalonicenses 2:1-12', '2 Tessalonicenses 3:6-15'],
    tags: ['volta de Cristo', 'vigilÃ¢ncia', 'Homem da Iniquidade'],
    fontes: ['Gordon Fee, 1 and 2 Thessalonians']
  },
  {
    id: 'tl-076',
    titulo: '1 TimÃ³teo â€” Pastoral e LideranÃ§a',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Pastorais',
    conteudo: [
      '1 TimÃ³teo Ã© carta pastoral sobre lideranÃ§a na Igreja.',
      'QualificaÃ§Ãµes de bispos e diÃ¡conos.',
      'A sÃ£ doutrina deve ser guardada.',
      'A luta pela fÃ©.',
      'A generosidade e a temperanÃ§a.'
    ],
    versicosChave: ['1 TimÃ³teo 3:1-13', '1 TimÃ³teo 4:1-5', '1 TimÃ³teo 6:10'],
    tags: ['pastoral', 'lideranÃ§a', 'bispos', 'diÃ¡conos'],
    fontes: ['William Mounce, 1 Timothy (WBC)']
  },
  {
    id: 'tl-077',
    titulo: '2 TimÃ³teo â€” A Coroa da JustiÃ§a',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Pastorais',
    conteudo: [
      '2 TimÃ³teo Ã© a Ãºltima carta de Paulo.',
      'O ministÃ©rio fiel apesar da oposiÃ§Ã£o.',
      'A Palavra de Deus Ã© viva e eficaz.',
      'A coroa da justiÃ§a estÃ¡ guardada.',
      'Paulo exemplifica a fidelidade atÃ© o fim.'
    ],
    versicosChave: ['2 TimÃ³teo 4:7-8', '2 TimÃ³teo 3:16-17', '2 TimÃ³teo 2:15'],
    tags: ['fidelidade', 'Palavra de Deus', 'coroa', 'ministÃ©rio'],
    fontes: ['William Mounce, 2 Timothy (WBC)']
  },
  {
    id: 'tl-078',
    titulo: 'Tito â€” A SÃ£ Doutrina',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Pastorais',
    conteudo: [
      'Tito Ã© carta pastoral para a ilha de Creta.',
      'A sÃ£ doutrina gera boa conduta.',
      'QualificaÃ§Ãµes de lÃ­deres.',
      'A graÃ§a nos ensina a viver.',
      'As boas obras sÃ£o fruto da fÃ©.'
    ],
    versicosChave: ['Tito 2:11-14', 'Tito 3:5-7', 'Tito 1:5-9'],
    tags: ['Tito', 'sÃ£ doutrina', 'graÃ§a', 'boas obras'],
    fontes: ['Daniel Wallace, 1 Timothy (WBC)']
  },
  {
    id: 'tl-079',
    titulo: 'Filemom â€” PerdÃ£o e ReconciliaÃ§Ã£o',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Pessoais',
    conteudo: [
      'Filemom Ã© carta pessoal sobre perdÃ£o.',
      'OnÃ©simo, escravo fugido, se tornou crente.',
      'Paulo pede recepÃ§Ã£o de OnÃ©simo como irmÃ£o.',
      'O perdÃ£o cristÃ£o Ã© radical.',
      'A reconciliaÃ§Ã£o Ã© princÃ­pio do evangelho.'
    ],
    versicosChave: ['Filemom 1:15-17', 'Filemom 1:8-21'],
    tags: ['Filemom', 'perdÃ£o', 'reconciliaÃ§Ã£o', 'escravidÃ£o'],
    fontes: ['N.T. Wright, The Epistles of Paul to the Colossians and to Philemon']
  },
  {
    id: 'tl-080',
    titulo: 'Hebreus â€” O Novo Testamento',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Gerais',
    conteudo: [
      'Hebreus declara a superioridade do novo testamento.',
      'Cristo Ã© superior a todos os mediadores anteriores.',
      'O sacrifÃ­cio de Cristo Ã© Ãºnico e perfeito.',
      'O santuÃ¡rio celestial Ã© o verdadeiro.',
      'A fÃ© Ã© o fundamento.'
    ],
    versicosChave: ['Hebreus 8:6-13', 'Hebreus 9:11-14', 'Hebreus 10:10-14'],
    tags: ['novo testamento', 'superioridade', 'sacrifÃ­cio', 'santuÃ¡rio'],
    fontes: ['Craig Koester, Hebrews']
  },
  {
    id: 'tl-081',
    titulo: 'Hebreus 11 â€” A Galeria da FÃ©',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Gerais',
    conteudo: [
      'Hebreus 11 lista herÃ³is da fÃ©.',
      'Abel, Enoque, NoÃ©, AbraÃ£o, Sara.',
      'A fÃ© Ã© certeza do que se espera.',
      'A fÃ© se prova na obediÃªncia.',
      'Somos cercados de nuvem de testemunhas.'
    ],
    versicosChave: ['Hebreus 11:1', 'Hebreus 11:6', 'Hebreus 12:1-2'],
    tags: ['fÃ©', 'herÃ³is', 'testemunhas', 'exemplo'],
    fontes: ['Craig Koester, Hebrews']
  },
  {
    id: 'tl-082',
    titulo: 'Tiago â€” FÃ© e Obras',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Gerais',
    conteudo: [
      'Tiago combate a fÃ© sem obras.',
      'A fÃ© viva se prova pelas obras.',
      'A lÃ­ngua Ã© pequena mas causa grandes danos.',
      'A paciÃªncia no sofrimento.',
      'A oraÃ§Ã£o do justo Ã© eficaz.'
    ],
    versicosChave: ['Tiago 2:14-26', 'Tiago 3:1-12', 'Tiago 5:13-18'],
    tags: ['fÃ©', 'obras', 'lÃ­ngua', 'oraÃ§Ã£o'],
    fontes: ['Douglas Moo, James']
  },
  {
    id: 'tl-083',
    titulo: '1 Pedro â€” Sofrimento e GlÃ³ria',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Gerais',
    conteudo: [
      'O sofrimento precede a glÃ³ria.',
      'Cristo Ã© exemplo de sofrimento injusto.',
      'A esperanÃ§a viva Ã© fundamento.',
      'O sacerdÃ³cio real.',
      'A graÃ§a de Deus sustenta.'
    ],
    versicosChave: ['1 Pedro 1:6-7', '1 Pedro 2:21-25', '1 Pedro 4:12-13'],
    tags: ['sofrimento', 'glÃ³ria', 'esperanÃ§a', 'sacerdÃ³cio'],
    fontes: ['Karen Jobes, 1 Peter']
  },
  {
    id: 'tl-084',
    titulo: '2 Pedro â€” A Volta Certa',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Gerais',
    conteudo: [
      '2 Pedro combate cÃ©ticos sobre a volta.',
      'O Senhor Ã© paciente â€” nÃ£o deseja que pereÃ§a.',
      'HaverÃ¡ novos cÃ©us e nova terra.',
      'A Palavra de Deus Ã© eterna.',
      'Crescei na graÃ§a e no conhecimento.'
    ],
    versicosChave: ['2 Pedro 3:8-10', '2 Pedro 3:13', '2 Pedro 3:18'],
    tags: ['volta de Cristo', 'paciÃªncia', 'juÃ­zo', 'nova criaÃ§Ã£o'],
    fontes: ['Peter Davids, 2 Peter (NICNT)']
  },
  {
    id: 'tl-085',
    titulo: '1 JoÃ£o â€” Amor e Verdade',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Gerais',
    conteudo: [
      'Deus Ã© amor â€” a mais profunda definiÃ§Ã£o.',
      'O amor se prova em aÃ§Ã£o.',
      'Andar na luz Ã© andar em obediÃªncia.',
      'A vitÃ³ria sobre o mundo pela fÃ©.',
      'A comunhÃ£o com Deus e uns com os outros.'
    ],
    versicosChave: ['1 JoÃ£o 4:8', '1 JoÃ£o 4:19-21', '1 JoÃ£o 1:5-7'],
    tags: ['amor', 'verdade', 'luz', 'vitÃ³ria', 'comunhÃ£o'],
    fontes: ['Karen Jobes, 1, 2, 3 John']
  },
  {
    id: 'tl-086',
    titulo: '2 e 3 JoÃ£o â€” Verdade e Hospitalidade',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Gerais',
    conteudo: [
      '2 JoÃ£o enfatiza a verdade e o amor.',
      '3 JoÃ£o Ã© sobre hospitalidade.',
      'A falsa doutrina deve ser rejeitada.',
      'O amor nÃ£o tolera o erro doutrinal.',
      'A hospitalidade Ã© virtude cristÃ£.'
    ],
    versicosChave: ['2 JoÃ£o 1:10-11', '3 JoÃ£o 1:5-8'],
    tags: ['verdade', 'hospitalidade', 'falsa doutrina'],
    fontes: ['Karen Jobes, 1, 2, 3 John']
  },
  {
    id: 'tl-087',
    titulo: 'Judas â€” Contenda pela FÃ©',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Gerais',
    conteudo: [
      'Judas Ã© alerta contra falsos mestres.',
      'A fÃ© precisa ser defendida.',
      'Exemplos de julgamento sobre desobedientes.',
      'Deus Ã© fiel para guardar.',
      'GlÃ³ria a Deus em todas as coisas.'
    ],
    versicosChave: ['Judas 1:3', 'Judas 1:24-25'],
    tags: ['Judas', 'fÃ©', 'falsos mestres', 'defesa'],
    fontes: ['Jude (comentÃ¡rio)']
  },
  {
    id: 'tl-088',
    titulo: 'Apocalipse â€” As Sete Igrejas',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'As sete cartas Ã s igrejas da Ãsia.',
      'EfÃ©so: perdeu o primeiro amor.',
      'Esmirna: perseguiÃ§Ã£o e fidelidade.',
      'PÃ©rgamo: compromisso com o mundo.',
      'Tiatira: tolerÃ¢ncia ao erro.',
      'Sardes: morte espiritual.',
      'FiladÃ©lfia: fidelidade sem poder.',
      'Laodiceia: morna e arrogante.'
    ],
    versicosChave: ['Apocalipse 2-3', 'Apocalipse 3:14-22'],
    tags: ['sete igrejas', 'cartas', 'fidelidade', 'correÃ§Ã£o'],
    fontes: ['G.K. Beale, Revelation']
  },
  {
    id: 'tl-089',
    titulo: 'Apocalipse â€” O Cordeiro e o Trono',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'O Cordeiro Ã© centro da adoraÃ§Ã£o celestial.',
      'O trono de Deus Ã© centro do cosmos.',
      'A adoraÃ§Ã£o dos 24 anciÃ£os e dos quatro seres viventes.',
      'O Cordeiro foi morto mas estÃ¡ de pÃ©.',
      'A vitÃ³ria Ã© certa.'
    ],
    versicosChave: ['Apocalipse 4-5', 'Apocalipse 5:6-14'],
    tags: ['Cordeiro', 'trono', 'adoraÃ§Ã£o', 'vitÃ³ria'],
    fontes: ['G.K. Beale, Revelation']
  },
  {
    id: 'tl-090',
    titulo: 'Apocalipse â€” O Julgamento Final',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'O julgamento das naÃ§Ãµes.',
      'O grande trono branco.',
      'O livro da vida.',
      'A segunda morte.',
      'Novos cÃ©us e nova terra.'
    ],
    versicosChave: ['Apocalipse 20:11-15', 'Apocalipse 21:1-8'],
    tags: ['juÃ­zo', 'trono branco', 'livro da vida', 'consumaÃ§Ã£o'],
    fontes: ['G.K. Beale, Revelation']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // MAIS ESTUDOS â€” QUESTÃ•ES CONTEMPORÃ‚NEAS
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'qc-011',
    titulo: 'Economia e FÃ© CristÃ£',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Ã‰tica PÃºblica',
    conteudo: [
      'A fÃ© cristÃ£ tem implicaÃ§Ãµes econÃ´micas.',
      'A avareza Ã© pecado; a generosidade Ã© virtude.',
      'A riqueza nÃ£o Ã© mau mas pode ser tentaÃ§Ã£o.',
      'O trabalho Ã© chamado de Deus.',
      'A justiÃ§a econÃ´mica Ã© obrigaÃ§Ã£o.'
    ],
    versicosChave: ['1 TimÃ³teo 6:10', '2 CorÃ­ntios 9:6-11', 'ProvÃ©rbios 3:9-10'],
    tags: ['economia', 'generosidade', 'trabalho', 'justiÃ§a'],
    fontes: ['Tim Keller, Generous Justice']
  },
  {
    id: 'qc-012',
    titulo: 'CiÃªncia e CriaÃ§Ã£o â€” Perspectivas CristÃ£s',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'FÃ© e CiÃªncia',
    conteudo: [
      'Existem mÃºltiplas perspectivas cristÃ£s sobre ciÃªncia e criaÃ§Ã£o.',
      'O criacionismo de terra jovem sustenta 6 dias literais.',
      'O evoluÃ§Ã£o teÃ­sta vÃª Deus usando evoluÃ§Ã£o.',
      'O design inteligente observa complexidade irredutÃ­vel.',
      'A teologia nÃ£o Ã© ciÃªncia e a ciÃªncia nÃ£o Ã© teologia.'
    ],
    versicosChave: ['GÃªnesis 1:1', 'Salmos 19:1', 'Romanos 1:20'],
    tags: ['ciÃªncia', 'criaÃ§Ã£o', 'evoluÃ§Ã£o', 'design inteligente'],
    fontes: ['Alister McGrath, A Fine-Tuned Universe']
  },
  {
    id: 'qc-013',
    titulo: 'Aborto e Dignidade Humana',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'BioÃ©tica',
    conteudo: [
      'O aborto Ã© questÃ£o Ã©tica central.',
      'A vida humana comeÃ§a na concepÃ§Ã£o.',
      'Deus forma o feto no ventre materno.',
      'A dignidade humana Ã© inegociÃ¡vel.',
      'A Igreja defende a vida e acolhe arrependidos.'
    ],
    versicosChave: ['Salmos 139:13-16', 'Jeremias 1:5', 'Lucas 1:41-44'],
    tags: ['aborto', 'dignidade', 'vida', 'concepÃ§Ã£o'],
    fontes: ['John Kilner, Dignity and Destiny']
  },
  {
    id: 'qc-014',
    titulo: 'EutanÃ¡sia e Soberania de Deus',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'BioÃ©tica',
    conteudo: [
      'A eutanÃ¡sia contradiz a soberania de Deus.',
      'A vida e a morte estÃ£o nas mÃ£os de Deus.',
      'O sofrimento tem sentido em Cristo.',
      'O cuidado paliativo Ã© alternativa cristÃ£.',
      'A dignidade humana atÃ© a morte.'
    ],
    versicosChave: ['DeuteronÃ´mio 32:39', 'JÃ³ 1:21', 'Salmos 31:15'],
    tags: ['eutanÃ¡sia', 'morte', 'soberania', 'cuidado paliativo'],
    fontes: ['Nigel Cameron, Will Christians be Biotech\'s Best Hope?']
  },
  {
    id: 'qc-015',
    titulo: 'Engenharia GenÃ©tica e ManipulaÃ§Ã£o',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'BioÃ©tica',
    conteudo: [
      'A engenharia genÃ©tica levanta questÃµes Ã©ticas.',
      'Manipular a criaÃ§Ã£o pode ser arrogÃ¢ncia humana.',
      'A cura de doenÃ§as Ã© chamado.',
      'Os limites devem ser respeitados.',
      'A dignidade humana nÃ£o pode ser comprometida.'
    ],
    versicosChave: ['GÃªnesis 1:26-28', 'GÃªnesis 2:7'],
    tags: ['engenharia genÃ©tica', 'manipulaÃ§Ã£o', 'Ã©tica', 'criaÃ§Ã£o'],
    fontes: ['Nigel Cameron, Will Christians be Biotech\'s Best Hope?']
  },
  {
    id: 'qc-016',
    titulo: 'Drogas e DependÃªncia',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Ã‰tica CristÃ£',
    conteudo: [
      'O uso de drogas Ã© contrÃ¡rio ao chamado de santificaÃ§Ã£o.',
      'A dependÃªncia Ã© escravidÃ£o â€” Cristo liberta.',
      'A Igreja deve acolher e ajudar dependentes.',
      'O corpo Ã© templo do EspÃ­rito Santo.',
      'A libertaÃ§Ã£o Ã© possÃ­vel pela graÃ§a.'
    ],
    versicosChave: ['1 CorÃ­ntios 6:19-20', 'JoÃ£o 8:36', 'GÃ¡latas 5:1'],
    tags: ['drogas', 'dependÃªncia', 'libertaÃ§Ã£o', 'santificaÃ§Ã£o'],
    fontes: ['David Powlison, Power Encounters']
  },
  {
    id: 'qc-017',
    titulo: 'Casamento e FamÃ­lia',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'FamÃ­lia',
    conteudo: [
      'O casamento Ã© instituiÃ§Ã£o divina.',
      'A famÃ­lia Ã© base da sociedade.',
      'O amor conjugal reflete Cristo e a Igreja.',
      'A educaÃ§Ã£o dos filhos Ã© responsabilidade.',
      'A famÃ­lia cristÃ£ Ã© testemunho do evangelho.'
    ],
    versicosChave: ['EfÃ©sios 5:22-33', 'ProvÃ©rbios 22:6', 'DeuteronÃ´mio 6:6-7'],
    tags: ['casamento', 'famÃ­lia', 'educaÃ§Ã£o', 'amor'],
    fontes: ['John Piper, This Momentary Marriage']
  },
  {
    id: 'qc-018',
    titulo: 'DivÃ³rcio e Novas UniÃµes',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'FamÃ­lia',
    conteudo: [
      'O divÃ³rcio Ã© permitido mas nÃ£o desejado por Deus.',
      'Jesus restringe as causas do divÃ³rcio.',
      'O adultÃ©rio Ã© quebra da alianÃ§a.',
      'A restauraÃ§Ã£o Ã© sempre preferÃ­vel.',
      'A graÃ§a de Deus alcanÃ§a todos os fracassos.'
    ],
    versicosChave: ['Mateus 19:3-9', 'Malaquias 2:14-16', 'Romanos 8:1'],
    tags: ['divÃ³rcio', 'alianÃ§a', 'adultÃ©rio', 'restauraÃ§Ã£o'],
    fontes: ['David Instone-Brewer, Divorce and Remarriage in the Bible']
  },
  {
    id: 'qc-019',
    titulo: 'Homossexualidade e BÃ­blia',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Ã‰tica CristÃ£',
    conteudo: [
      'A BÃ­blia condena a prÃ¡tica homossexual.',
      'O casamento Ã© entre homem e mulher.',
      'As pessoas com atraÃ§Ã£o pelo mesmo sexo sÃ£o chamadas Ã  castidade.',
      'A Igreja acolhe todos com amor e verdade.',
      'A transformaÃ§Ã£o Ã© possÃ­vel pelo EspÃ­rito.'
    ],
    versicosChave: ['Romanos 1:26-27', '1 CorÃ­ntios 6:9-11', 'GÃªnesis 2:24'],
    tags: ['homossexualidade', 'Ã©tica', 'casamento', 'castidade'],
    fontes: ['Robert Gagnon, The Bible and Homosexual Practice']
  },
  {
    id: 'qc-020',
    titulo: 'TransgÃªnero e Identidade',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Ã‰tica CristÃ£',
    conteudo: [
      'Deus criou o ser humano como macho e fÃªmea.',
      'A identidade de gÃªnero Ã© designaÃ§Ã£o divina.',
      'A disforia de gÃªnero Ã© realidade humana.',
      'A Igreja acolhe com amor e verdade.',
      'A identidade verdadeira estÃ¡ em Cristo.'
    ],
    versicosChave: ['GÃªnesis 1:27', 'Mateus 19:4', 'GÃ¡latas 3:28'],
    tags: ['transgÃªnero', 'identidade', 'gÃªnero', 'criaÃ§Ã£o'],
    fontes: ['Mark Yarhouse, Understanding Gender Dysphoria']
  },
  {
    id: 'qc-021',
    titulo: 'RaÃ§a e ReconciliaÃ§Ã£o',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'JustiÃ§a Social',
    conteudo: [
      'A reconciliaÃ§Ã£o racial Ã© evangelho em aÃ§Ã£o.',
      'Em Cristo nÃ£o hÃ¡ distinÃ§Ã£o racial.',
      'O racismo Ã© pecado.',
      'A Igreja Ã© chamada Ã  diversidade.',
      'A justiÃ§a Ã© demanda bÃ­blica.'
    ],
    versicosChave: ['GÃ¡latas 3:28', 'EfÃ©sios 2:14-16', 'Apocalipse 7:9'],
    tags: ['raÃ§a', 'reconciliaÃ§Ã£o', 'diversidade', 'justiÃ§a'],
    fontes: ['John Piper, Bloodlines']
  },
  {
    id: 'qc-022',
    titulo: 'Pobreza e Desigualdade',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'JustiÃ§a Social',
    conteudo: [
      'A pobreza Ã© consequÃªncia do pecado e da injustiÃ§a.',
      'Deus defende os pobres.',
      'A Igreja tem responsabilidade social.',
      'A caridade nÃ£o basta â€” a justiÃ§a Ã© necessÃ¡ria.',
      'A opÃ§Ã£o pelos pobres Ã© bÃ­blica.'
    ],
    versicosChave: ['Miqueias 6:8', 'Mateus 25:31-46', 'Tiago 2:15-17'],
    tags: ['pobreza', 'desigualdade', 'justiÃ§a', 'caridade'],
    fontes: ['Tim Keller, Generous Justice']
  },
  {
    id: 'qc-023',
    titulo: 'ViolÃªncia e NÃ£o-ViolÃªncia',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Ã‰tica CristÃ£',
    conteudo: [
      'A BÃ­blia ensina amor aos inimigos.',
      'A nÃ£o-violÃªncia Ã© ideal, mas hÃ¡ exceÃ§Ãµes (legÃ­tima defesa, governo).',
      'Cristo Ã© o modelo de nÃ£o-violÃªncia.',
      'A paz Ã© fruto da justiÃ§a.',
      'A guerra Ã© tragÃ©dia â€” Ãºltimo recurso.'
    ],
    versicosChave: ['Mateus 5:38-48', 'Romanos 12:17-21', 'Romanos 13:1-7'],
    tags: ['violÃªncia', 'nÃ£o-violÃªncia', 'paz', 'guerra'],
    fontes: ['John Howard Yoder, The Politics of Jesus']
  },
  {
    id: 'qc-024',
    titulo: 'Morte e Luto',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Ã‰tica CristÃ£',
    conteudo: [
      'A morte Ã© inimigo â€” mas Cristo a venceu.',
      'O luto Ã© legÃ­timo e necessÃ¡rio.',
      'A esperanÃ§a cristÃ£ nÃ£o anula a dor.',
      'A comunhÃ£o dos santos consola.',
      'A ressurreiÃ§Ã£o Ã© certeza.'
    ],
    versicosChave: ['1 CorÃ­ntios 15:55-57', '1 Tessalonicenses 4:13-14', 'JoÃ£o 11:25-26'],
    tags: ['morte', 'luto', 'esperanÃ§a', 'ressurreiÃ§Ã£o'],
    fontes: ['Nicholas Wolterstorff, Lament for a Son']
  },
  {
    id: 'qc-025',
    titulo: 'SuicÃ­dio e SaÃºde Mental',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'SaÃºde Mental',
    conteudo: [
      'O suicÃ­dio Ã© tragÃ©dia â€” nÃ£o Ã© condenaÃ§Ã£o eterna.',
      'A doenÃ§a mental Ã© realidade humana.',
      'Deus tem misericÃ³rdia de todos.',
      'A Igreja deve acolher e nÃ£o julgar.',
      'A saÃºde mental Ã© responsabilidade.'
    ],
    versicosChave: ['Salmos 34:18', '2 CorÃ­ntios 1:3-4', 'Mateus 11:28-30'],
    tags: ['suicÃ­dio', 'saÃºde mental', 'luto', 'acolhimento'],
    fontes: ['Edward Snowden, Suicide and the Church']
  },
  {
    id: 'qc-026',
    titulo: 'Cultura da Morte vs. Cultura da Vida',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'BioÃ©tica',
    conteudo: [
      'A cultura da morte inclui aborto, eutanÃ¡sia, pena de morte.',
      'A cultura da vida defende a dignidade humana.',
      'Cristo Ã© a vida â€” Ele veio para que tenhamos vida em abundÃ¢ncia.',
      'A Igreja Ã© defensora da vida.',
      'Cada vida Ã© dom de Deus.'
    ],
    versicosChave: ['JoÃ£o 10:10', 'Salmos 139:13-16', 'Jeremias 1:5'],
    tags: ['cultura da vida', 'dignidade', 'aborto', 'eutanÃ¡sia'],
    fontes: ['John Paul II, Evangelium Vitae']
  },
  {
    id: 'qc-027',
    titulo: 'Ã‰tica Ambiental CristÃ£',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Ecologia',
    conteudo: [
      'O cuidado com a criaÃ§Ã£o Ã© mandamento divino.',
      'A exploraÃ§Ã£o ambiental Ã© desobediÃªncia.',
      'A justiÃ§a ambiental atinge os pobres primeiro.',
      'A esperanÃ§a Ã© nova criaÃ§Ã£o.',
      'A responsabilidade Ã© para as futuras geraÃ§Ãµes.'
    ],
    versicosChave: ['GÃªnesis 2:15', 'Romanos 8:19-22', 'Apocalipse 21:1-5'],
    tags: ['ecologia', 'meio ambiente', 'justiÃ§a ambiental', 'responsabilidade'],
    fontes: ['Calvin DeWitt, Earth-Wise']
  },
  {
    id: 'qc-028',
    titulo: 'EducaÃ§Ã£o CristÃ£',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'FamÃ­lia',
    conteudo: [
      'A educaÃ§Ã£o Ã© responsabilidade dos pais.',
      'A formaÃ§Ã£o cristÃ£ deve ser integral.',
      'A escola cristÃ£ Ã© ministÃ©rio legÃ­timo.',
      'A BÃ­blia Ã© fundamento de todo conhecimento.',
      'O ensino domÃ©stico Ã© opÃ§Ã£o vÃ¡lida.'
    ],
    versicosChave: ['DeuteronÃ´mio 6:6-7', 'ProvÃ©rbios 22:6', '2 TimÃ³teo 3:16-17'],
    tags: ['educaÃ§Ã£o', 'formaÃ§Ã£o', 'escola', 'ensino domÃ©stico'],
    fontes: ['Susan Wise Bauer, The Well-Trained Mind']
  },
  {
    id: 'qc-029',
    titulo: 'MÃ­dia e FormaÃ§Ã£o da OpiniÃ£o',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Cultura Digital',
    conteudo: [
      'A mÃ­dia influencia pensamento e comportamento.',
      'O cristÃ£o deve ser critico diante da mÃ­dia.',
      'A verdade Ã© comprometida pela desinformaÃ§Ã£o.',
      'A mÃ­dia pode ser usada para o bem.',
      'O discernimento Ã© necessÃ¡rio.'
    ],
    versicosChave: ['Filipenses 4:8', 'EfÃ©sios 5:15-17', '1 Tessalonicenses 5:21'],
    tags: ['mÃ­dia', 'desinformaÃ§Ã£o', 'discernimento', 'verdade'],
    fontes: ['Andy Crouch, The Tech-Wise Family']
  },
  {
    id: 'qc-030',
    titulo: 'GlobalizaÃ§Ã£o e FÃ©',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Cultura',
    conteudo: [
      'A globalizaÃ§Ã£o traz desafios e oportunidades.',
      'O evangelho Ã© universal â€” transcende culturas.',
      'O pluralismo religioso aumenta.',
      'A missÃ£o Ã© cada vez mais necessÃ¡ria.',
      'A identidade cristÃ£ nÃ£o Ã© cultural mas transcendente.'
    ],
    versicosChave: ['Mateus 28:19-20', 'Apocalipse 7:9', 'GÃ¡latas 3:28'],
    tags: ['globalizaÃ§Ã£o', 'pluralismo', 'missionÃ¡rio', 'cultura'],
    fontes: ['Samuel Escobar, The New Global Mission']
  },
  {
    id: 'qc-031',
    titulo: 'Tecnologia e Transhumanismo',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'BioÃ©tica',
    conteudo: [
      'O transhumanismo busca melhorar o ser humano pela tecnologia.',
      'A dignidade humana nÃ£o pode ser melhorada artificialmente.',
      'Deus Ã© o criador â€” nÃ£o devemos nos tornar deuses.',
      'A tecnologia Ã© ferramenta, nÃ£o salvaÃ§Ã£o.',
      'O limites Ã©ticos devem ser respeitados.'
    ],
    versicosChave: ['GÃªnesis 3:5', 'Salmos 100:3', 'Atos 17:28'],
    tags: ['transhumanismo', 'tecnologia', 'dignidade', 'limites'],
    fontes: ['Francis Schaeffer, How Should We Then Live?']
  },
  {
    id: 'qc-032',
    titulo: 'Ã‰tica no Trabalho',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Ã‰tica CristÃ£',
    conteudo: [
      'O trabalho Ã© chamado de Deus â€” nÃ£o maldiÃ§Ã£o.',
      'A Ã©tica trabalhista Ã© exigÃªncia bÃ­blica.',
      'A honestidade no trabalho Ã© virtude.',
      'O descanso semanal Ã© mandamento.',
      'O trabalho Ã© forma de adoraÃ§Ã£o.'
    ],
    versicosChave: ['GÃªnesis 2:15', 'Colossenses 3:23-24', 'ÃŠxodo 20:8-11'],
    tags: ['trabalho', 'Ã©tica', 'honestidade', 'descanso'],
    fontes: ['Tim Keller, Every Good Endeavor']
  },
  {
    id: 'qc-033',
    titulo: 'CorrupÃ§Ã£o e JustiÃ§a',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'JustiÃ§a Social',
    conteudo: [
      'A corrupÃ§Ã£o Ã© pecado contra a justiÃ§a.',
      'Deus detesta a injustiÃ§a.',
      'A Igreja deve ser luz em meio Ã  corrupÃ§Ã£o.',
      'A transparÃªncia Ã© virtude.',
      'A justiÃ§a Ã© responsabilidade de todos.'
    ],
    versicosChave: ['Miqueias 6:8', 'AmÃ³s 5:24', 'ProvÃ©rbios 11:3'],
    tags: ['corrupÃ§Ã£o', 'justiÃ§a', 'transparÃªncia', 'Ã©tica'],
    fontes: ['Tim Keller, Generous Justice']
  },
  {
    id: 'qc-034',
    titulo: 'MigraÃ§Ã£o e Refugiados',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'JustiÃ§a Social',
    conteudo: [
      'A migraÃ§Ã£o Ã© realidade global.',
      'A BÃ­blia exige hospedagem do estrangeiro.',
      'Refugiados sÃ£o dignos de compaixÃ£o.',
      'Deus Ã© refÃºgio do oprimido.',
      'A Igreja deve acolher.'
    ],
    versicosChave: ['LevÃ­tico 19:33-34', 'Hebreus 13:2', 'Mateus 25:35'],
    tags: ['migraÃ§Ã£o', 'refugiados', 'hospedagem', 'compaixÃ£o'],
    fontes: ['Matthew Soerens, Welcoming the Stranger']
  },
  {
    id: 'qc-035',
    titulo: 'Mentalidade de Consumo',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Ã‰tica CristÃ£',
    conteudo: [
      'O consumismo Ã© contrÃ¡rio Ã  fÃ©.',
      'A ganÃ¢ncia Ã© pecado.',
      'A generosidade liberta.',
      'A simplicidade Ã© virtude.',
      'O contentamento Ã© fruto do EspÃ­rito.'
    ],
    versicosChave: ['Lucas 12:15', '1 TimÃ³teo 6:6-10', 'Hebreus 13:5'],
    tags: ['consumismo', 'ganÃ¢ncia', 'generosidade', 'contentamento'],
    fontes: ['Tim Keller, Counterfeit Gods']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // MAIS ESTUDOS â€” HISTÃ“RIA DA IGREJA
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'hi-026',
    titulo: 'OrÃ­genes â€” Filosofia e Teologia',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'PatrÃ­stica',
    conteudo: [
      'OrÃ­genes Ã© o primeiro grande sistemÃ¡tico cristÃ£o.',
      'A alegoria Ã© mÃ©todo predominante.',
      'A preexistÃªncia das almas Ã© ensino controverso.',
      'A redenÃ§Ã£o universal Ã© possibilidade.',
      'A Filocalia Ã© obra de espiritualidade.'
    ],
    versicosChave: ['JoÃ£o 1:1-3', 'Romanos 8:29', '1 CorÃ­ntios 15:28'],
    tags: ['OrÃ­genes', 'alegoria', 'patrÃ­stica', 'sistemÃ¡tico'],
    fontes: ['Henri Crouzel, Origen']
  },
  {
    id: 'hi-027',
    titulo: 'SÃ£o BasÃ­lio â€” O EspÃ­rito Santo',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'PatrÃ­stica',
    conteudo: [
      'BasÃ­lio defendeu a divindade do EspÃ­rito Santo.',
      'De Spiritu Sancto Ã© obra fundamental.',
      'A Trindade Ã© comunhÃ£o de amor.',
      'A vida monÃ¡stica Ã© exemplo.',
      'A hospitalidade Ã© virtude.'
    ],
    versicosChave: ['Atos 5:3-4', 'Mateus 28:19', '2 CorÃ­ntios 13:14'],
    tags: ['BasÃ­lio', 'EspÃ­rito Santo', 'Trindade', 'monasticismo'],
    fontes: ['BasÃ­lio, De Spiritu Sancto']
  },
  {
    id: 'hi-028',
    titulo: 'GregÃ³rio de Nissa â€” ContemplaÃ§Ã£o',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'PatrÃ­stica',
    conteudo: [
      'GregÃ³rio de Nissa Ã© mestre da contemplaÃ§Ã£o.',
      'A vida de MoisÃ©s Ã© modelo espiritual.',
      'O conhecimento de Deus Ã© infinito.',
      'A ascensÃ£o espiritual Ã© progresso.',
      'A pureza do coraÃ§Ã£o Ã© meta.'
    ],
    versicosChave: ['ÃŠxodo 33:20', 'Salmos 46:10', 'Mateus 5:8'],
    tags: ['GregÃ³rio', 'contemplaÃ§Ã£o', 'vida espiritual', 'ascensÃ£o'],
    fontes: ['GregÃ³rio de Nissa, Vida de MoisÃ©s']
  },
  {
    id: 'hi-029',
    titulo: 'Agostinho â€” GraÃ§a e ConversÃ£o',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'PatrÃ­stica',
    conteudo: [
      'As ConfissÃµes sÃ£o autobiografia espiritual.',
      'A conversÃ£o Ã© obra da graÃ§a divina.',
      'O pecado original corrompe toda a natureza.',
      'A graÃ§a precede o mÃ©rito.',
      'O amor Ã© fundamento da Ã©tica.'
    ],
    versicosChave: ['Romanos 5:12', 'EfÃ©sios 2:4-5', 'JoÃ£o 6:44'],
    tags: ['Agostinho', 'graÃ§a', 'conversÃ£o', 'pecado original'],
    fontes: ['Agostinho, ConfissÃµes']
  },
  {
    id: 'hi-030',
    titulo: 'Pedro Lombardo â€” SentenÃ§as',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'EscolÃ¡stica',
    conteudo: [
      'Pedro Lombardo compilou as SentenÃ§as.',
      'A obra Ã© compÃªndio teolÃ³gico medieval.',
      'Cobre: Deus, criaÃ§Ã£o, pecado, virtudes, sacramentos.',
      'Tornou-se texto de referÃªncia nas universidades.',
      'A teologia Ã© ciÃªncia da fÃ©.'
    ],
    versicosChave: ['2 TimÃ³teo 2:15', 'Hebreus 11:6'],
    tags: ['Lombardo', 'SentenÃ§as', 'escolÃ¡stica', 'universidades'],
    fontes: ['Peter Lombard, Four Books of Sentences']
  },
  {
    id: 'hi-031',
    titulo: 'Bernardo de Claraval â€” Amor e ContemplaÃ§Ã£o',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Medieval',
    conteudo: [
      'Bernardo Ã© mestre de contemplaÃ§Ã£o.',
      'O amor divino Ã© tema central.',
      'Os sermÃµes sobre o CÃ¢ntico dos CÃ¢nticos.',
      'A vida monÃ¡stica Ã© chamado.',
      'A influÃªncia na espiritualidade medieval.'
    ],
    versicosChave: ['CÃ¢nticos 8:6', '1 JoÃ£o 4:8'],
    tags: ['Bernardo', 'contemplaÃ§Ã£o', 'amor divino', 'monasticismo'],
    fontes: ['Bernard of Clairvaux, On the Song of Songs']
  },
  {
    id: 'hi-032',
    titulo: 'Francisco de Assis â€” Pobreza e Cantico',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Medieval',
    conteudo: [
      'Francisco abandona riqueza para seguir a Cristo.',
      'A ordem franciscana renova a Igreja.',
      'O CÃ¢ntico das Criaturas celebra a criaÃ§Ã£o.',
      'O amor aos pobres e marginalizados.',
      'A humildade como virtude suprema.'
    ],
    versicosChave: ['Mateus 5:3', 'Mateus 19:21', 'Lucas 12:33'],
    tags: ['Francisco', 'pobreza', 'criaÃ§Ã£o', 'franciscanos'],
    fontes: ['G.K. Chesterton, St. Francis of Assisi']
  },
  {
    id: 'hi-033',
    titulo: 'TomÃ¡s de Aquino â€” FÃ© e RazÃ£o',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'EscolÃ¡stica',
    conteudo: [
      'TomÃ¡s de Aquino sintetizou AristÃ³teles e Cristianismo.',
      'A Suma TeolÃ³gica Ã© obra-prima.',
      'Os cinco caminhos para provar a existÃªncia de Deus.',
      'A graÃ§a aperfeiÃ§oa a natureza.',
      'A caridade Ã© forma de todas as virtudes.'
    ],
    versicosChave: ['Romanos 1:20', '1 CorÃ­ntios 13:2', 'Hebreus 11:6'],
    tags: ['TomÃ¡s de Aquino', 'escolÃ¡stica', 'Suma', 'fÃ© e razÃ£o'],
    fontes: ['TomÃ¡s de Aquino, Suma TeolÃ³gica']
  },
  {
    id: 'hi-034',
    titulo: 'Lutero e a JustificaÃ§Ã£o pela FÃ©',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Reforma',
    conteudo: [
      'A torre experiÃªncia de Lutero revelou a justificaÃ§Ã£o pela fÃ©.',
      'Sola fide Ã© principio central.',
      'A liberdade do cristÃ£o.',
      'A autoridade da Escritura.',
      'A traduÃ§Ã£o da BÃ­blia.'
    ],
    versicosChave: ['Romanos 1:17', 'GÃ¡latas 2:16', 'EfÃ©sios 2:8-9'],
    tags: ['Lutero', 'justificaÃ§Ã£o', 'fÃ©', 'Reforma'],
    fontes: ['Lutero, Sobre a Liberdade do CristÃ£o']
  },
  {
    id: 'hi-035',
    titulo: 'Calvino e as Institutas',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Reforma',
    conteudo: [
      'As Institutas sÃ£o manual de teologia cristÃ£.',
      'O conhecimento de Deus e de nÃ³s mesmos.',
      'A soberania de Deus Ã© tema central.',
      'A disciplina eclesiÃ¡stica.',
      'O influÃªncia global do calvinismo.'
    ],
    versicosChave: ['EfÃ©sios 1:11', 'Romanos 8:29-30', 'EfÃ©sios 2:8-9'],
    tags: ['Calvino', 'Institutas', 'soberania', 'Reforma'],
    fontes: ['Calvino, Institutas da ReligiÃ£o CristÃ£']
  },
  {
    id: 'hi-036',
    titulo: 'Zwinglio e a Reforma SuÃ­Ã§a',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Reforma',
    conteudo: [
      'Zwinglio reformou Zurique.',
      'A Ceia Ã© memorial, nÃ£o transubstanciaÃ§Ã£o.',
      'A pregaÃ§Ã£o Ã© central.',
      'A iconoclastia Ã© prÃ¡tica.',
      'A influÃªncia na Reforma suÃ­Ã§a.'
    ],
    versicosChave: ['1 CorÃ­ntios 11:23-26', 'Mateus 26:26-29'],
    tags: ['Zwinglio', 'Reforma', 'SuÃ­Ã§a', 'Ceia'],
    fontes: ['W. P. Stephens, The Theology of Huldrych Zwingli']
  },
  {
    id: 'hi-037',
    titulo: 'Melanchton â€” O Professor da Reforma',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Reforma',
    conteudo: [
      'Melanchton Ã© professor e sistematizador.',
      'A Augsburg Confession Ã© sua obra.',
      'A harmonizaÃ§Ã£o entre fÃ© e razÃ£o.',
      'A educaÃ§Ã£o Ã© ministÃ©rio.',
      'A influÃªncia na teologia luterana.'
    ],
    versicosChave: ['2 TimÃ³teo 2:15', 'ProvÃ©rbios 9:10'],
    tags: ['Melanchton', 'Augsburg', 'educaÃ§Ã£o', 'luteranismo'],
    fontes: ['Melanchton, Augsburg Confession']
  },
  {
    id: 'hi-038',
    titulo: 'Os MÃ¡rtires Anabatistas',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Reforma',
    conteudo: [
      'Os anabatistas sofreram perseguiÃ§Ã£o de catÃ³licos e protestantes.',
      'O batismo de crentes era prÃ¡tica controversa.',
      'A separaÃ§Ã£o Igreja-Estado.',
      'A nÃ£o-violÃªncia era princÃ­pio.',
      'O martyrs mirror Ã© compilaÃ§Ã£o de mÃ¡rtires.'
    ],
    versicosChave: ['Mateus 5:38-48', 'Romanos 12:17-21'],
    tags: ['anabatistas', 'mÃ¡rtires', 'batismo', 'nÃ£o-violÃªncia'],
    fontes: ['The Martyrs Mirror']
  },
  {
    id: 'hi-039',
    titulo: 'Jonathan Edwards â€” Avivamento e GraÃ§a',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Avivamentos',
    conteudo: [
      'Edwards Ã© teÃ³logo do Grande Despertamento.',
      'O pecado nas mÃ£os de um Deus irado Ã© sermÃ£o famoso.',
      'A graÃ§a Ã© irresistÃ­vel.',
      'A religiÃ£o Ã© afeiÃ§Ãµes santificadas.',
      'O influÃªncia no avivamento americano.'
    ],
    versicosChave: ['EfÃ©sios 2:4-5', 'JoÃ£o 6:44', 'Romanos 9:16'],
    tags: ['Edwards', 'avivamento', 'graÃ§a', 'despertamento'],
    fontes: ['Jonathan Edwards, Religious Affections']
  },
  {
    id: 'hi-040',
    titulo: 'Charles Spurgeon â€” PrÃ­ncipe dos Pregadores',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Avivamentos',
    conteudo: [
      'Spurgeon Ã© o maior pregador batista do sÃ©c. XIX.',
      'A pregaÃ§Ã£o expositiva Ã© central.',
      'O Metropolitan Tabernacle Ã© modelo de igreja.',
      'A seminÃ¡rio de Spurgeon forma pastores.',
      'A influÃªncia global do ministÃ©rio.'
    ],
    versicosChave: ['2 TimÃ³teo 4:2', 'Romanos 10:14-17'],
    tags: ['Spurgeon', 'pregaÃ§Ã£o', 'batista', 'avivamento'],
    fontes: ['Spurgeon, Sermons']
  },
  {
    id: 'hi-041',
    titulo: 'Oxford Movement â€” RenovaÃ§Ã£o Anglo-CatÃ³lica',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Movimentos',
    conteudo: [
      'O Oxford Movement buscou renovar a Igreja Anglicana.',
      'O retorno Ã  tradiÃ§Ã£o patrÃ­stica.',
      'A liturgia Ã© central.',
      'A Newman Ã© figura principal.',
      'A influÃªncia na Igreja Anglicana.'
    ],
    versicosChave: ['2 Tessalonicenses 2:15', '1 CorÃ­ntios 11:2'],
    tags: ['Oxford', 'Anglicana', 'tradiÃ§Ã£o', 'liturgia'],
    fontes: ['Newman, Apologia Pro Vita Sua']
  },
  {
    id: 'hi-042',
    titulo: 'O Movimento Socialdo',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Movimentos',
    conteudo: [
      'O Movimento Socialdo buscava justiÃ§a social no sÃ©c. XIX.',
      'William Wilberforce combateu a escravidÃ£o.',
      'A salvaÃ§Ã£o social Ã© extensÃ£o do evangelho.',
      'A Igreja tem responsabilidade social.',
      'A Ã©tica cristÃ£ na polÃ­tica.'
    ],
    versicosChave: ['Miqueias 6:8', 'IsaÃ­as 1:17', 'Mateus 25:31-46'],
    tags: ['movimento social', 'Wilberforce', 'escravidÃ£o', 'justiÃ§a social'],
    fontes: ['Timothy Larson, Steel Pilgrims']
  },
  {
    id: 'hi-043',
    titulo: 'O ConcÃ­lio Vaticano II',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Catolicismo',
    conteudo: [
      'O Vaticano II (1962-65) renovou a Igreja CatÃ³lica.',
      'A liturgia vernacular.',
      'O diÃ¡logo ecumÃªnico.',
      'A dignidade da consciÃªncia.',
      'A leitura da BÃ­blia.'
    ],
    versicosChave: ['JoÃ£o 17:20-23', 'EfÃ©sios 4:1-6'],
    tags: ['Vaticano II', 'Catolicismo', 'renovaÃ§Ã£o', 'ecumenismo'],
    fontes: ['ConcÃ­lio Vaticano II, documentos']
  },
  {
    id: 'hi-044',
    titulo: 'Mother Teresa â€” ServiÃ§o aos Pobres',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Servo',
    conteudo: [
      'Mother Teresa dedicou sua vida aos pobres de CalcutÃ¡.',
      'A ordem das MissionÃ¡rias da Caridade.',
      'O serviÃ§o aos Ãºltimos Ã© serviÃ§o a Cristo.',
      'A pobreza voluntÃ¡ria Ã© testemunho.',
      'A influÃªncia global do ministÃ©rio.'
    ],
    versicosChave: ['Mateus 25:31-46', 'Lucas 12:33'],
    tags: ['Mother Teresa', 'pobres', 'serviÃ§o', 'CalcutÃ¡'],
    fontes: ['Mother Teresa, Come Be My Light']
  },
  {
    id: 'hi-045',
    titulo: 'Billy Graham â€” Evangelista Global',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Avivamentos',
    conteudo: [
      'Billy Graham Ã© o maior evangelista do sÃ©c. XX.',
      'As cruzadas mundiais alcanÃ§aram milhÃµes.',
      'A simplicidade do evangelho.',
      'A influÃªncia na cultura cristÃ£.',
      'A integridade no ministÃ©rio.'
    ],
    versicosChave: ['JoÃ£o 3:16', 'Mateus 28:19-20', 'Romanos 10:9-10'],
    tags: ['Billy Graham', 'evangelismo', 'cruzadas', 'missÃ£o'],
    fontes: ['Billy Graham, Just As I Am']
  },
  {
    id: 'hi-046',
    titulo: 'Corrie ten Boom â€” PerdÃ£o e ResistÃªncia',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'MÃ¡rtir',
    conteudo: [
      'Corrie ten Boom escondeu judeus durante o Holocausto.',
      'A resistÃªncia ao nazismo.',
      'O perdÃ£o Ã© central em sua mensagem.',
      'A casa do esconderijo Ã© testemunho.',
      'A influÃªncia global do ministÃ©rio.'
    ],
    versicosChave: ['Mateus 5:44', 'Romanos 12:17-21', 'Hebreus 13:2'],
    tags: ['Corrie ten Boom', 'Holocausto', 'perdÃ£o', 'resistÃªncia'],
    fontes: ['Corrie ten Boom, The Hiding Place']
  },
  {
    id: 'hi-047',
    titulo: 'Martyn Lloyd-Jones â€” PregaÃ§Ã£o Expositiva',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Movimentos',
    conteudo: [
      'Lloyd-Jones Ã© modelo de pregaÃ§Ã£o expositiva.',
      'O Evangelho e Deus Soberano.',
      'A pregaÃ§Ã£o Ã© meio de graÃ§a.',
      'A dependÃªncia do EspÃ­rito.',
      'O influÃªncia no evangelismo britÃ¢nico.'
    ],
    versicosChave: ['2 TimÃ³teo 4:2', 'Romanos 10:14-17'],
    tags: ['Lloyd-Jones', 'pregaÃ§Ã£o', 'expositiva', 'evangelismo'],
    fontes: ['Martyn Lloyd-Jones, Preaching and Preachers']
  },
  {
    id: 'hi-048',
    titulo: 'John Stott â€” Teologia EvangÃ©lica',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Teologia Moderna',
    conteudo: [
      'John Stott Ã© figura central do evangelicalismo.',
      'A Cruz de Cristo Ã© obra-prima.',
      'A responsabilidade social Ã© evangelho.',
      'A Lausanne Movement Ã© fruto de seu ministÃ©rio.',
      'A integridade na teologia e prÃ¡tica.'
    ],
    versicosChave: ['EfÃ©sios 2:8-9', 'Mateus 28:19-20', 'Miqueias 6:8'],
    tags: ['Stott', 'evangelicalismo', 'Lausanne', 'justiÃ§a social'],
    fontes: ['John Stott, The Cross of Christ']
  },
  {
    id: 'hi-049',
    titulo: 'O Movimento Vineyard',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'CarismÃ¡tico',
    conteudo: [
      'O Vineyard Ã© movimento carismÃ¡tico influente.',
      'John Wimber Ã© fundador.',
      'O poder evangelismo Ã© prÃ¡tica.',
      'Os dons sÃ£o para hoje.',
      'A integraÃ§Ã£o entre carismÃ¡ticos e evangÃ©licos.'
    ],
    versicosChave: ['Atos 1:8', '1 CorÃ­ntios 12-14', 'Marcos 16:17-18'],
    tags: ['Vineyard', 'Wimber', 'carismÃ¡tico', 'dons'],
    fontes: ['John Wimber, Power Evangelism']
  },
  {
    id: 'hi-050',
    titulo: 'A Igreja no Sul Global',
    categoria: 'HistÃ³ria da Igreja',
    subcategoria: 'Missiologia',
    conteudo: [
      'O cristianismo cresce no Sul Global (Ãfrica, Ãsia, AmÃ©rica Latina).',
      'A teologia do Sul Global tem perspectiva prÃ³pria.',
      'A missÃ£o Ã© cada vez mais horizontal.',
      'A pobreza e a perseguiÃ§Ã£o fortalecem a fÃ©.',
      'O futuro da Igreja Ã© no Sul Global.'
    ],
    versicosChave: ['Apocalipse 7:9', 'Mateus 28:19-20'],
    tags: ['Sul Global', 'crescimento', 'missÃ£o', 'teologia'],
    fontes: ['Philip Jenkins, The Next Christendom']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // MAIS ESTUDOS â€” ESTUDOS COMPARATIVOS
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'ec-026',
    titulo: 'Pedro e Paulo â€” Dois MinistÃ©rios',
    categoria: 'Estudos Comparativos',
    subcategoria: 'ComparaÃ§Ã£o ApostÃ³lica',
    conteudo: [
      'Pedro Ã© apÃ³stolo dos judeus; Paulo, dos gentios.',
      'Ambos sÃ£o fiÃ©is ao evangelho.',
      'A tensÃ£o entre eles Ã© resolvida em Antioquia.',
      'A diversidade de ministÃ©rios na unidade.',
      'O modelo ecumÃªnico.'
    ],
    versicosChave: ['GÃ¡latas 2:7-9', 'GÃ¡latas 2:11-14', 'EfÃ©sios 4:11'],
    tags: ['Pedro', 'Paulo', 'ministÃ©rio', 'diversidade'],
    fontes: ['N.T. Wright, Paul and the Faithfulness of God']
  },
  {
    id: 'ec-027',
    titulo: 'Maria e Eva â€” Tipologia Feminina',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'Eva Ã© a causa da queda; Maria Ã© instrumento de redenÃ§Ã£o.',
      'ObediÃªncia de Maria desfaz a desobediÃªncia de Eva.',
      'Ambas sÃ£o mÃ£es da humanidade.',
      'A dignidade feminina na BÃ­blia.',
      'O paralelo entre queda e redenÃ§Ã£o.'
    ],
    versicosChave: ['GÃªnesis 3:15', 'Lucas 1:38', '1 TimÃ³teo 2:15'],
    tags: ['Maria', 'Eva', 'tipologia', 'queda', 'redenÃ§Ã£o'],
    fontes: ['Santo Irineu, Contra as Heresias']
  },
  {
    id: 'ec-028',
    titulo: 'AdÃ£o e Cristo â€” Dois Representantes',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'AdÃ£o Ã© representante da humanidade caÃ­da.',
      'Cristo Ã© o novo AdÃ£o â€” restaura o que AdÃ£o perdeu.',
      'A morte veio por um; a vida pelo outro.',
      'O paralelo Ã© central em Romanos 5.',
      'AjustificaÃ§Ã£o pela obediÃªncia de um.'
    ],
    versicosChave: ['Romanos 5:12-21', '1 CorÃ­ntios 15:22, 45-49'],
    tags: ['AdÃ£o', 'Cristo', 'representante', 'queda', 'redenÃ§Ã£o'],
    fontes: ['N.T. Wright, The Climax of the Covenant']
  },
  {
    id: 'ec-029',
    titulo: 'Arca de NoÃ© e Batismo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'A arca salvou poucos pela Ã¡gua.',
      'O batismo Ã© figura de salvaÃ§Ã£o.',
      'A Ã¡gua Ã© julgamento e salvaÃ§Ã£o.',
      'A fÃ© Ã© condiÃ§Ã£o em ambos.',
      'O tipo se cumpre no NT.'
    ],
    versicosChave: ['1 Pedro 3:20-21', 'GÃªnesis 7:1-24', '1 CorÃ­ntios 10:1-2'],
    tags: ['arca', 'batismo', 'dilÃºvio', 'salvaÃ§Ã£o'],
    fontes: ['G.K. Beale, The Temple and the Church\'s Mission']
  },
  {
    id: 'ec-030',
    titulo: 'ManÃ¡ e Cristo PÃ£o da Vida',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'O manÃ¡ sustentou Israel no deserto.',
      'Cristo se declara o pÃ£o da vida.',
      'O manÃ¡ era diÃ¡rio; Cristo Ã© eterno.',
      'A Ceia do Senhor Ã© memorial.',
      'A fÃ© Ã© condiÃ§Ã£o para receber.'
    ],
    versicosChave: ['JoÃ£o 6:32-35', 'ÃŠxodo 16:4-35', '1 CorÃ­ntios 10:3'],
    tags: ['manÃ¡', 'pÃ£o da vida', 'Ceia', 'deserto'],
    fontes: ['G.K. Beale, The Temple and the Church\'s Mission']
  },
  {
    id: 'ec-031',
    titulo: 'Serpente de Bronze e Cristo Crucificado',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'A serpente de bronze curava os picados.',
      'Cristo crucificado cura do pecado.',
      'Olhar para a serpente = fÃ© em Cristo.',
      'A salvaÃ§Ã£o Ã© por fÃ©, nÃ£o por obras.',
      'O tipo Ã© explicado por Jesus.'
    ],
    versicosChave: ['JoÃ£o 3:14-15', 'NÃºmeros 21:4-9'],
    tags: ['serpente', 'crucificaÃ§Ã£o', 'fÃ©', 'salvaÃ§Ã£o'],
    fontes: ['JoÃ£o 3:14-15 (comentÃ¡rio)']
  },
  {
    id: 'ec-032',
    titulo: 'Cordeiro Pascual e Cristo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'O cordeiro pascual era imolado em Israel.',
      'Cristo Ã© o cordeiro de Deus que tira o pecado.',
      'O sangue protegia da morte.',
      'O sangue de Cristo protege da condenaÃ§Ã£o.',
      'A PÃ¡scoa Ã© cumprida na cruz.'
    ],
    versicosChave: ['1 CorÃ­ntios 5:7', 'ÃŠxodo 12:1-14', 'JoÃ£o 1:29'],
    tags: ['cordeiro', 'PÃ¡scoa', 'sacrifÃ­cio', 'sangue'],
    fontes: ['Michael Morales, Who Shall Ascend the Mountain of the Lord?']
  },
  {
    id: 'ec-033',
    titulo: 'CircuncisÃ£o e Batismo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Sacramentos',
    conteudo: [
      'A circuncisÃ£o era sinal da alianÃ§a no AT.',
      'O batismo Ã© sinal da nova alianÃ§a.',
      'Ambos marcam pertenÃ§a ao povo de Deus.',
      'A continuidade sacramental.',
      'O batismo substitui a circuncisÃ£o.'
    ],
    versicosChave: ['Colossenses 2:11-12', 'Romanos 4:11', 'GÃªnesis 17:10-14'],
    tags: ['circuncisÃ£o', 'batismo', 'alianÃ§a', 'sinal'],
    fontes: ['Paul Jewett, Infant Baptism and the Covenant of Grace']
  },
  {
    id: 'ec-034',
    titulo: 'Templo e Igreja',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'O templo era centro de adoraÃ§Ã£o e presenÃ§a divina.',
      'A Igreja Ã© novo templo â€” pedras vivas.',
      'Cristo Ã© o novo Sumo Sacerdote.',
      'A Ceia substitui os sacrifÃ­cios.',
      'O crente Ã© templo do EspÃ­rito.'
    ],
    versicosChave: ['1 Pedro 2:5', '1 CorÃ­ntios 3:16', 'EfÃ©sios 2:19-22'],
    tags: ['templo', 'Igreja', 'Sumo Sacerdote', 'sacrifÃ­cio'],
    fontes: ['G.K. Beale, The Temple and the Church\'s Mission']
  },
  {
    id: 'ec-035',
    titulo: 'MoisÃ©s e Cristo â€” Mediadores',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'MoisÃ©s mediou a alianÃ§a no Sinai.',
      'Cristo media a nova alianÃ§a.',
      'MoisÃ©s era servo; Cristo Ã© Filho.',
      'A Lei veio por MoisÃ©s; a graÃ§a por Cristo.',
      'A continuidade e superaÃ§Ã£o.'
    ],
    versicosChave: ['Hebreus 3:1-6', 'JoÃ£o 1:17', 'DeuteronÃ´mio 18:15'],
    tags: ['MoisÃ©s', 'Cristo', 'mediador', 'alianÃ§a'],
    fontes: ['Hebreus (comentÃ¡rio)']
  },
  {
    id: 'ec-036',
    titulo: 'Davi e Cristo â€” Rei e Messias',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'Davi Ã© rei segundo o coraÃ§Ã£o de Deus.',
      'Cristo Ã© o Filho de Davi que reina eternamente.',
      'A alianÃ§a davÃ­dica se cumpre em Cristo.',
      'Davi Ã© pecador; Cristo Ã© perfeito.',
      'O reino de Cristo Ã© eterno.'
    ],
    versicosChave: ['2 Samuel 7:12-16', 'Lucas 1:32-33', 'Salmo 110'],
    tags: ['Davi', 'Cristo', 'realeza', 'alianÃ§a'],
    fontes: ['O. Palmer Robertson, The Christ of the Covenants']
  },
  {
    id: 'ec-037',
    titulo: 'SalomÃ£o e Cristo â€” Sabedoria',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'SalomÃ£o recebeu sabedoria de Deus.',
      'Cristo Ã© a Sabedoria encarnada.',
      'O templo de SalomÃ£o prefigura o de Cristo.',
      'A sabedoria de SalomÃ£o Ã© limitada.',
      'A sabedoria de Cristo Ã© infinita.'
    ],
    versicosChave: ['1 Reis 4:29-34', 'Colossenses 2:3', '1 CorÃ­ntios 1:24'],
    tags: ['SalomÃ£o', 'sabedoria', 'templo', 'Cristo'],
    fontes: ['1 Reis (comentÃ¡rio)']
  },
  {
    id: 'ec-038',
    titulo: 'Elias e JoÃ£o Batista',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'Elias Ã© o profeta que prepara o caminho.',
      'JoÃ£o Batista Ã© o Elias que vem.',
      'Ambos vivem no deserto.',
      'A mensagem de arrependimento.',
      'A transiÃ§Ã£o de AT para NT.'
    ],
    versicosChave: ['Mateus 11:14', 'Mateus 3:1-3', 'Lucas 1:17'],
    tags: ['Elias', 'JoÃ£o Batista', 'preparaÃ§Ã£o', 'arrependimento'],
    fontes: ['Mateus (comentÃ¡rio)']
  },
  {
    id: 'ec-039',
    titulo: 'ExÃ­lio e Cruz',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Soteriologia',
    conteudo: [
      'O exÃ­lio Ã© consequÃªncia do pecado.',
      'A cruz Ã© lugar de exÃ­lio de Cristo.',
      'Cristo assume o exÃ­lio humano.',
      'A restauraÃ§Ã£o vem apÃ³s o exÃ­lio.',
      'A cruz Ã© exÃ­lio cumprido.'
    ],
    versicosChave: ['Mateus 27:46', 'IsaÃ­as 53:4-6', '2 CorÃ­ntios 5:21'],
    tags: ['exÃ­lio', 'cruz', 'pecado', 'restauraÃ§Ã£o'],
    fontes: ['N.T. Wright, Jesus and the Victory of God']
  },
  {
    id: 'ec-040',
    titulo: 'Temor e AdoraÃ§Ã£o',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'O temor do Senhor Ã© princÃ­pio da sabedoria.',
      'A adoraÃ§Ã£o Ã© resposta ao temor.',
      'Temor nÃ£o Ã© medo mas reverÃªncia.',
      'A adoraÃ§Ã£o Ã© holÃ­stica.',
      'O temor e a adoraÃ§Ã£o sÃ£o inseparÃ¡veis.'
    ],
    versicosChave: ['ProvÃ©rbios 9:10', 'Salmos 95:6', 'IsaÃ­as 6:1-8'],
    tags: ['temor', 'adoraÃ§Ã£o', 'reverÃªncia', 'sabedoria'],
    fontes: ['Rudolf Otto, O Sagrado']
  },
  {
    id: 'ec-041',
    titulo: 'OraÃ§Ã£o e ProvidÃªncia',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'A oraÃ§Ã£o nÃ£o muda Deus â€” muda a nÃ³s.',
      'A providÃªncia governa todas as coisas.',
      'A oraÃ§Ã£o Ã© meio de graÃ§a.',
      'Deus usa oraÃ§Ã£o como instrumento.',
      'A tensÃ£o entre soberania e oraÃ§Ã£o.'
    ],
    versicosChave: ['Filipenses 4:6-7', 'Romanos 8:26-27', 'Mateus 6:9-13'],
    tags: ['oraÃ§Ã£o', 'providÃªncia', 'soberania', 'missÃ£o'],
    fontes: ['C.S. Lewis, Letters to Malcolm']
  },
  {
    id: 'ec-042',
    titulo: 'Testemunho e Evangelismo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Missiologia',
    conteudo: [
      'O testemunho pessoal Ã© poderoso.',
      'O evangelismo Ã© obediÃªncia.',
      'A vida cristÃ£ Ã© testemunho.',
      'A Palavra Ã© instrumento.',
      'O EspÃ­rito capacita.'
    ],
    versicosChave: ['Atos 1:8', 'Romanos 10:14-17', '1 Pedro 3:15'],
    tags: ['testemunho', 'evangelismo', 'missÃ£o', 'EspÃ­rito'],
    fontes: ['John Stott, The Contemporary Christian']
  },
  {
    id: 'ec-043',
    titulo: 'Cruz e RessurreiÃ§Ã£o',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Cristologia',
    conteudo: [
      'A cruz Ã© derrota aparente â€” vitÃ³ria real.',
      'A ressurreiÃ§Ã£o Ã© confirmaÃ§Ã£o da vitÃ³ria.',
      'A cruz precede a glÃ³ria.',
      'O sofrimento Ã© caminho para a exaltaÃ§Ã£o.',
      'O evangelho Ã© cruz e ressurreiÃ§Ã£o.'
    ],
    versicosChave: ['1 CorÃ­ntios 1:18-25', 'Filipenses 2:5-11', '1 Pedro 1:10-12'],
    tags: ['cruz', 'ressurreiÃ§Ã£o', 'vitÃ³ria', 'sofrimento'],
    fontes: ['John Stott, The Cross of Christ']
  },
  {
    id: 'ec-044',
    titulo: 'GraÃ§a e ObediÃªncia',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A graÃ§a precede a obediÃªncia.',
      'A obediÃªncia Ã© fruto da graÃ§a.',
      'NÃ£o Ã© legalismo â€” Ã© gratidÃ£o.',
      'A fÃ© se prova pelas obras.',
      'A graÃ§a capacita a obediÃªncia.'
    ],
    versicosChave: ['EfÃ©sios 2:8-10', 'Tiago 2:14-26', 'Romanos 6:1-2'],
    tags: ['graÃ§a', 'obediÃªncia', 'fÃ©', 'obras'],
    fontes: ['Calvino, Institutas III.18-20']
  },
  {
    id: 'ec-045',
    titulo: 'Verdade e Amor',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Ã‰tica',
    conteudo: [
      'A verdade sem amor Ã© dura.',
      'O amor sem verdade Ã© sentimentalismo.',
      'Em Cristo, verdade e amor se encontram.',
      'A Igreja deve ser fiel e amorosa.',
      'O equilÃ­brio Ã© essencial.'
    ],
    versicosChave: ['EfÃ©sios 4:15', '1 JoÃ£o 3:18', '2 JoÃ£o 1:3'],
    tags: ['verdade', 'amor', 'equilÃ­brio', 'Igreja'],
    fontes: ['John Stott, The Message of 1 John']
  },
  {
    id: 'ec-046',
    titulo: 'Julgamento e MisericÃ³rdia',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'Deus Ã© justo E misericordioso.',
      'A justiÃ§a sem misericÃ³rdia Ã© crueldade.',
      'A misericÃ³rdia sem justiÃ§a Ã© fraqueza.',
      'Na cruz, justiÃ§a e misericÃ³rdia se encontram.',
      'Somos chamados a ser misericordiosos.'
    ],
    versicosChave: ['Tiago 2:13', 'Mateus 5:7', 'Romanos 3:25-26'],
    tags: ['julgamento', 'misericÃ³rdia', 'justiÃ§a', 'cruz'],
    fontes: ['John Stott, The Cross of Christ']
  },
  {
    id: 'ec-047',
    titulo: 'FÃ© e CiÃªncia â€” Harmonia',
    categoria: 'Estudos Comparativos',
    subcategoria: 'FÃ© e CiÃªncia',
    conteudo: [
      'FÃ© e ciÃªncia nÃ£o sÃ£o necessariamente conflitantes.',
      'A ciÃªncia estuda o como; a fÃ© o por quÃª.',
      'Deus Ã© autor da natureza e da Escritura.',
      'A razÃ£o Ã© dom de Deus.',
      'A harmonia Ã© possÃ­vel.'
    ],
    versicosChave: ['Romanos 1:20', 'Salmos 19:1', 'ProvÃ©rbios 25:2'],
    tags: ['fÃ©', 'ciÃªncia', 'harmonia', 'razÃ£o'],
    fontes: ['Alister McGrath, A Fine-Tuned Universe']
  },
  {
    id: 'ec-048',
    titulo: 'Cristianismo e JudaÃ­smo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'ReligiÃµes',
    conteudo: [
      'O cristianismo nasce do judaÃ­smo.',
      'Jesus Ã© judeu â€” os apÃ³stolos sÃ£o judeus.',
      'O NT Ã© interpretaÃ§Ã£o do AT.',
      'A continuidade Ã© tema.',
      'O diÃ¡logo cristÃ£o-judaico Ã© necessÃ¡rio.'
    ],
    versicosChave: ['Romanos 9-11', 'JoÃ£o 4:22', 'Atos 13:26-41'],
    tags: ['judaÃ­smo', 'cristianismo', 'continuidade', 'diÃ¡logo'],
    fontes: ['David H. Stern, Jewish New Testament Commentary']
  },
  {
    id: 'ec-049',
    titulo: 'Cristianismo e Islamismo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'ReligiÃµes',
    conteudo: [
      'Cristianismo e Islamismo sÃ£o monoteÃ­sticos.',
      'A questÃ£o central: Jesus Ã© Deus?',
      'O CorÃ£o nega a divindade de Cristo.',
      'O amor cristÃ£o Ã© distintivo.',
      'O diÃ¡logo Ã© necessÃ¡rio mas a verdade Ã© inegociÃ¡vel.'
    ],
    versicosChave: ['JoÃ£o 14:6', '1 TimÃ³teo 2:5', '1 JoÃ£o 4:1-3'],
    tags: ['islamismo', 'Jesus', 'monoteÃ­smo', 'diÃ¡logo'],
    fontes: ['Samuel Shamoun, Allah Has No Son']
  },
  {
    id: 'ec-050',
    titulo: 'Cristianismo e HinduÃ­smo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'ReligiÃµes',
    conteudo: [
      'O hinduÃ­smo Ã© politeÃ­sta; o cristianismo Ã© monoteÃ­sta.',
      'A encarnaÃ§Ã£o Ã© Ãºnica â€” nÃ£o reencarnaÃ§Ã£o.',
      'A salvaÃ§Ã£o Ã© por graÃ§a, nÃ£o por karma.',
      'O amor Ã© distintivo.',
      'O diÃ¡logo Ã© respeitoso.'
    ],
    versicosChave: ['JoÃ£o 14:6', 'Hebreus 9:27', 'EfÃ©sios 2:8-9'],
    tags: ['hinduÃ­smo', 'reencarnaÃ§Ã£o', 'karma', 'salvaÃ§Ã£o'],
    fontes: ['Veli-Matti KÃ¤rkkÃ¤inen, An Introduction to Theologies of Religions']
  },
  {
    id: 'ec-051',
    titulo: 'Cristianismo e Budismo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'ReligiÃµes',
    conteudo: [
      'O budismo Ã© nÃ£o-teÃ­sta; o cristianismo Ã© teÃ­sta.',
      'A iluminaÃ§Ã£o nÃ£o Ã© salvaÃ§Ã£o.',
      'O sofrimento Ã© tratado diferentemente.',
      'O amor Ã© distinto do desapego.',
      'O diÃ¡logo Ã© possÃ­vel.'
    ],
    versicosChave: ['JoÃ£o 14:6', '1 CorÃ­ntios 13:1-3', 'Romanos 5:8'],
    tags: ['budismo', 'iluminaÃ§Ã£o', 'sofrimento', 'amor'],
    fontes: ['Veli-Matti KÃ¤rkkÃ¤inen, An Introduction to Theologies of Religions']
  },
  {
    id: 'ec-052',
    titulo: 'Idolatria Antiga e ContemporÃ¢nea',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Idolatria',
    conteudo: [
      'A idolatria Ã© tema central do AT.',
      'A idolatria contemporÃ¢nea Ã© secular.',
      'Dinheiro, poder, prazer sÃ£o Ã­dolos modernos.',
      'A BÃ­blia condena toda forma de idolatria.',
      'A liberdade dos Ã­dolos Ã© promessa.'
    ],
    versicosChave: ['ÃŠxodo 20:3-6', '1 JoÃ£o 5:21', 'Romanos 1:21-25'],
    tags: ['idolatria', 'Ã­dolos', 'secularismo', 'liberdade'],
    fontes: ['Tim Keller, Counterfeit Gods']
  },
  {
    id: 'ec-053',
    titulo: 'Sabedoria Proverbial e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Sabedoria',
    conteudo: [
      'A sabedoria de ProvÃ©rbios Ã© prÃ¡tica.',
      'A sabedoria do NT Ã© Cristo.',
      'A continuidade Ã© tema.',
      'A sabedoria se aperfeiÃ§oa em Cristo.',
      'O temor do Senhor continua sendo princÃ­pio.'
    ],
    versicosChave: ['ProvÃ©rbios 9:10', '1 CorÃ­ntios 1:24', 'Colossenses 2:3'],
    tags: ['sabedoria', 'ProvÃ©rbios', 'Cristo', 'continuidade'],
    fontes: ['Tremper Longman III, Proverbs']
  },
  {
    id: 'ec-054',
    titulo: 'Lamento no AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'O lamento Ã© expressÃ£o de dor diante de Deus.',
      'No AT: Salmos, LamentaÃ§Ãµes, JÃ³.',
      'No NT: Jesus lamenta sobre JerusalÃ©m.',
      'O lamento Ã© fÃ© honesta.',
      'A Igreja deve saber lamentar.'
    ],
    versicosChave: ['Salmo 13:1', 'Mateus 23:37-39', 'JoÃ£o 11:35'],
    tags: ['lamento', 'dor', 'fÃ© honesta', 'oraÃ§Ã£o'],
    fontes: ['Walter Brueggemann, The Message of the Psalms']
  },
  {
    id: 'ec-055',
    titulo: 'MissÃ£o Universal â€” AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Missiologia',
    conteudo: [
      'A missÃ£o comeÃ§a com AbraÃ£o: bÃªnÃ§Ã£o universal.',
      'O AT mostra naÃ§Ãµes vindo a Deus.',
      'O NT expande a missÃ£o aos gentios.',
      'A Grande ComissÃ£o Ã© cumprimento.',
      'O Apocalipse mostra multidÃ£o de naÃ§Ãµes.'
    ],
    versicosChave: ['GÃªnesis 12:3', 'IsaÃ­as 49:6', 'Mateus 28:19-20', 'Apocalipse 7:9'],
    tags: ['missÃ£o', 'naÃ§Ãµes', 'universalidade', 'AbraÃ£o'],
    fontes: ['David Bosch, Transforming Mission']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // MAIS ESTUDOS â€” HERMENÃŠUTICA
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'he-021',
    titulo: 'InterpretaÃ§Ã£o de EfÃ©sios',
    categoria: 'HermenÃªutica',
    subcategoria: 'EpÃ­stolas',
    conteudo: [
      'EfÃ©sios Ã© epÃ­stola circular â€” nÃ£o endereÃ§ada a uma igreja.',
      'O tema Ã© a Igreja, corpo de Cristo.',
      'As bÃªnÃ§Ã£os espirituais sÃ£o centrais.',
      'A unidade da Igreja Ã© enfatizada.',
      'A armadura de Deus Ã© conclusÃ£o prÃ¡tica.'
    ],
    versicosChave: ['EfÃ©sios 1:3-14', 'EfÃ©sios 4:1-6', 'EfÃ©sios 6:10-18'],
    tags: ['EfÃ©sios', 'Igreja', 'bÃªnÃ§Ã£os', 'unidade'],
    fontes: ['Peter O\'Brien, Ephesians']
  },
  {
    id: 'he-022',
    titulo: 'InterpretaÃ§Ã£o de Filipenses',
    categoria: 'HermenÃªutica',
    subcategoria: 'EpÃ­stolas',
    conteudo: [
      'Filipenses Ã© carta de agradecimento.',
      'O tema Ã© a alegria na adversidade.',
      'A kenosis de Cristo Ã© central.',
      'O contentamento Ã© virtude.',
      'Paulo Ã© modelo de fÃ©.'
    ],
    versicosChave: ['Filipenses 4:13', 'Filipenses 2:6-11', 'Filipenses 4:4'],
    tags: ['Filipenses', 'alegria', 'kenosis', 'contentamento'],
    fontes: ['Gordon Fee, Philippians']
  },
  {
    id: 'he-023',
    titulo: 'InterpretaÃ§Ã£o de Colossenses',
    categoria: 'HermenÃªutica',
    subcategoria: 'EpÃ­stolas',
    conteudo: [
      'Colossenses combate falsa doutrina.',
      'A supremacia de Cristo Ã© tema.',
      'Cristo Ã© suficiente contra toda filosofia.',
      'A vida cristÃ£ Ã© centrada em Cristo.',
      'A oraÃ§Ã£o Ã© essencial.'
    ],
    versicosChave: ['Colossenses 1:15-20', 'Colossenses 2:8-10', 'Colossenses 3:1-4'],
    tags: ['Colossenses', 'supremacia', 'Cristo', 'falsa doutrina'],
    fontes: ['Gordon Fee, Colossians']
  },
  {
    id: 'he-024',
    titulo: 'InterpretaÃ§Ã£o de 1 e 2 Tessalonicenses',
    categoria: 'HermenÃªutica',
    subcategoria: 'EpÃ­stolas',
    conteudo: [
      'As cartas tratam da segunda vinda.',
      '1 Tessalonicenses consola os aflitos.',
      '2 Tessalonicenses corrige equÃ­vocos.',
      'A vigilÃ¢ncia Ã© tema.',
      'A santificaÃ§Ã£o Ã© consequÃªncia.'
    ],
    versicosChave: ['1 Tessalonicenses 4:16-17', '2 Tessalonicenses 2:1-12'],
    tags: ['Tessalonicenses', 'segunda vinda', 'vigilÃ¢ncia', 'santificaÃ§Ã£o'],
    fontes: ['Gordon Fee, 1 and 2 Thessalonians']
  },
  {
    id: 'he-025',
    titulo: 'InterpretaÃ§Ã£o de 1 e 2 TimÃ³teo e Tito',
    categoria: 'HermenÃªutica',
    subcategoria: 'EpÃ­stolas Pastorais',
    conteudo: [
      'As epÃ­stolas pastorais tratam de lideranÃ§a.',
      'QualificaÃ§Ãµes de lÃ­deres.',
      'A sÃ£ doutrina deve ser guardada.',
      'O ministÃ©rio fiel.',
      'A vida cristÃ£ prÃ¡tica.'
    ],
    versicosChave: ['1 TimÃ³teo 3:1-13', '2 TimÃ³teo 2:15', 'Tito 2:11-14'],
    tags: ['pastorais', 'lideranÃ§a', 'doutrina', 'ministÃ©rio'],
    fontes: ['William Mounce, The Pastoral Epistles']
  },
  {
    id: 'he-026',
    titulo: 'InterpretaÃ§Ã£o de Filemom',
    categoria: 'HermenÃªutica',
    subcategoria: 'EpÃ­stolas',
    conteudo: [
      'Filemom Ã© carta pessoal.',
      'Trata de perdÃ£o e reconciliaÃ§Ã£o.',
      'O escravo OnÃ©simo se torna irmÃ£o.',
      'O amor cristÃ£o transcende hierarquias.',
      'A influÃªncia no debate sobre escravidÃ£o.'
    ],
    versicosChave: ['Filemom 1:15-17', 'Filemom 1:8-21'],
    tags: ['Filemom', 'perdÃ£o', 'reconciliaÃ§Ã£o', 'escravidÃ£o'],
    fontes: ['N.T. Wright, Colossians-Philemon']
  },
  {
    id: 'he-027',
    titulo: 'InterpretaÃ§Ã£o de 1 e 2 Pedro',
    categoria: 'HermenÃªutica',
    subcategoria: 'EpÃ­stolas',
    conteudo: [
      '1 Pedro trata de sofrimento e esperanÃ§a.',
      '2 Pedro combate cÃ©ticos.',
      'A fÃ© Ã© provada no sofrimento.',
      'A volta de Cristo Ã© certa.',
      'A santidade Ã© chamado.'
    ],
    versicosChave: ['1 Pedro 1:6-7', '2 Pedro 3:8-10'],
    tags: ['Pedro', 'sofrimento', 'esperanÃ§a', 'volta de Cristo'],
    fontes: ['Karen Jobes, 1 Peter']
  },
  {
    id: 'he-028',
    titulo: 'InterpretaÃ§Ã£o de 1, 2 e 3 JoÃ£o',
    categoria: 'HermenÃªutica',
    subcategoria: 'EpÃ­stolas',
    conteudo: [
      '1 JoÃ£o Ã© sobre amor e verdade.',
      '2 JoÃ£o Ã© sobre hospitalidade.',
      '3 JoÃ£o Ã© sobre lideranÃ§a.',
      'A comunhÃ£o com Deus Ã© tema.',
      'A vitÃ³ria pelo mundo pela fÃ©.'
    ],
    versicosChave: ['1 JoÃ£o 4:8', '2 JoÃ£o 1:10-11', '3 JoÃ£o 1:5-8'],
    tags: ['JoÃ£o', 'amor', 'verdade', 'hospitalidade'],
    fontes: ['Karen Jobes, 1, 2, 3 John']
  },
  {
    id: 'he-029',
    titulo: 'InterpretaÃ§Ã£o de Judas',
    categoria: 'HermenÃªutica',
    subcategoria: 'EpÃ­stolas',
    conteudo: [
      'Judas Ã© carta breve mas intensa.',
      'Combate falsos mestres.',
      'Exemplos de julgamento.',
      'A fÃ© precisa ser defendida.',
      'GlÃ³ria a Deus.'
    ],
    versicosChave: ['Judas 1:3', 'Judas 1:24-25'],
    tags: ['Judas', 'falsos mestres', 'fÃ©', 'defesa'],
    fontes: ['Jude (comentÃ¡rio)']
  },
  {
    id: 'he-030',
    titulo: 'PrincÃ­pios de InterpretaÃ§Ã£o ProfÃ©tica',
    categoria: 'HermenÃªutica',
    subcategoria: 'Profecia',
    conteudo: [
      'A profecia pode ter cumprimento mÃºltiplo.',
      'O contexto determina o significado.',
      'A linguagem figurada Ã© comum.',
      'A profecia apocalÃ­ptica Ã© simbÃ³lica.',
      'O cuidado hermenÃªutico Ã© necessÃ¡rio.'
    ],
    versicosChave: ['2 Pedro 1:20-21', 'Daniel 7:13-14'],
    tags: ['profecia', 'interpolaÃ§Ã£o', 'simbolismo', 'cumprimento'],
    fontes: ['G.K. Beale, The Book of Revelation']
  },
  {
    id: 'he-031',
    titulo: 'HermenÃªutica de GÃªnesis 1-3',
    categoria: 'HermenÃªutica',
    subcategoria: 'Pentateuco',
    conteudo: [
      'GÃªnesis 1-3 Ã© teolÃ³gico, nÃ£o cientÃ­fico.',
      'A criaÃ§Ã£o Ã© ato deliberado de Deus.',
      'A queda Ã© real â€” nÃ£o mito.',
      'O proto-evangelium Ã© promessa.',
      'A interpretaÃ§Ã£o deve respeitar o gÃªnero.'
    ],
    versicosChave: ['GÃªnesis 1:1', 'GÃªnesis 3:15', 'Romanos 5:12'],
    tags: ['GÃªnesis', 'criaÃ§Ã£o', 'queda', 'hermenÃªutica'],
    fontes: ['John Walton, The Lost World of Genesis One']
  },
  {
    id: 'he-032',
    titulo: 'HermenÃªutica de Romanos',
    categoria: 'HermenÃªutica',
    subcategoria: 'Paulinas',
    conteudo: [
      'Romanos Ã© epÃ­stola sistemÃ¡tica.',
      'A estrutura Ã© lÃ³gica.',
      'A justificaÃ§Ã£o pela fÃ© Ã© tema.',
      'A graÃ§a Ã© central.',
      'A Ã©tica Ã© consequÃªncia.'
    ],
    versicosChave: ['Romanos 1:16-17', 'Romanos 3:21-28', 'Romanos 12:1-2'],
    tags: ['Romanos', 'justificaÃ§Ã£o', 'graÃ§a', 'Ã©tica'],
    fontes: ['Douglas Moo, Romans']
  },
  {
    id: 'he-033',
    titulo: 'HermenÃªutica de JoÃ£o',
    categoria: 'HermenÃªutica',
    subcategoria: 'Evangelhos',
    conteudo: [
      'JoÃ£o Ã© teologicamente distinto dos sinÃ³ticos.',
      'O prÃ³logo Ã© declaraÃ§Ã£o cristolÃ³gica.',
      'Os sinais revelam glÃ³ria.',
      'Os discursos sÃ£o centrais.',
      'O tema Ã© a divindade de Cristo.'
    ],
    versicosChave: ['JoÃ£o 1:1-18', 'JoÃ£o 20:30-31'],
    tags: ['JoÃ£o', 'cristologia', 'sinais', 'discursos'],
    fontes: ['Craig Keener, John']
  },
  {
    id: 'he-034',
    titulo: 'HermenÃªutica de Apocalipse',
    categoria: 'HermenÃªutica',
    subcategoria: 'Apocalipse',
    conteudo: [
      'O Apocalipse Ã© gÃªnero apocalÃ­ptico.',
      'SÃ­mbolos e visÃµes sÃ£o predominantes.',
      'As sete cartas Ã s igrejas sÃ£o histÃ³ricas.',
      'O julgamento Ã© real.',
      'A esperanÃ§a Ã© consumaÃ§Ã£o.'
    ],
    versicosChave: ['Apocalipse 1:1-3', 'Apocalipse 21:1-4'],
    tags: ['Apocalipse', 'apocalÃ­ptico', 'sÃ­mbolos', 'esperanÃ§a'],
    fontes: ['G.K. Beale, Revelation']
  },
  {
    id: 'he-035',
    titulo: 'HermenÃªutica de ProvÃ©rbios',
    categoria: 'HermenÃªutica',
    subcategoria: 'Livros PoÃ©ticos',
    conteudo: [
      'ProvÃ©rbios contÃ©m provÃ©rbios independentes.',
      'NÃ£o sÃ£o promessas absolutas.',
      'SÃ£o princÃ­pios gerais.',
      'A sabedoria Ã© tema.',
      'O temor do Senhor Ã© fundamento.'
    ],
    versicosChave: ['ProvÃ©rbios 1:7', 'ProvÃ©rbios 9:10'],
    tags: ['ProvÃ©rbios', 'sabedoria', 'princÃ­pios', 'temor'],
    fontes: ['Tremper Longman III, Proverbs']
  },
  {
    id: 'he-036',
    titulo: 'HermenÃªutica de Eclesiastes',
    categoria: 'HermenÃªutica',
    subcategoria: 'Livros PoÃ©ticos',
    conteudo: [
      'Eclesiastes Ã© reflexÃ£o sobre a vida.',
      'A vanidade Ã© tema central.',
      'O realismo Ã© marca.',
      'A conclusÃ£o: temer a Deus.',
      'A relevÃ¢ncia contemporÃ¢nea.'
    ],
    versicosChave: ['Eclesiastes 1:2', 'Eclesiastes 12:13'],
    tags: ['Eclesiastes', 'vanidade', 'realismo', 'sabedoria'],
    fontes: ['Tremper Longman III, Ecclesiastes']
  },
  {
    id: 'he-037',
    titulo: 'HermenÃªutica de JÃ³',
    categoria: 'HermenÃªutica',
    subcategoria: 'Livros PoÃ©ticos',
    conteudo: [
      'JÃ³ Ã© drama teolÃ³gico.',
      'O sofrimento do inocente Ã© tema.',
      'Os amigos representam teologia da retribuiÃ§Ã£o.',
      'Deus fala do redemoinho.',
      'A resposta Ã© presenÃ§a, nÃ£o explicaÃ§Ã£o.'
    ],
    versicosChave: ['JÃ³ 1:21', 'JÃ³ 42:1-6'],
    tags: ['JÃ³', 'sofrimento', 'teologia', 'resposta divina'],
    fontes: ['David Fox Flourney, Job']
  },
  {
    id: 'he-038',
    titulo: 'HermenÃªutica de IsaÃ­as',
    categoria: 'HermenÃªutica',
    subcategoria: 'Profetas',
    conteudo: [
      'IsaÃ­as Ã© evangelho do AT.',
      'As profecias messiÃ¢nicas sÃ£o centrais.',
      'O Servo Sofredor Ã© tema.',
      'A restauraÃ§Ã£o Ã© prometida.',
      'A relevÃ¢ncia escatolÃ³gica.'
    ],
    versicosChave: ['IsaÃ­as 53', 'IsaÃ­as 9:6-7', 'IsaÃ­as 65:17'],
    tags: ['IsaÃ­as', 'messias', 'servo', 'restauraÃ§Ã£o'],
    fontes: ['John Oswalt, Isaiah']
  },
  {
    id: 'he-039',
    titulo: 'HermenÃªutica de Jeremias',
    categoria: 'HermenÃªutica',
    subcategoria: 'Profetas',
    conteudo: [
      'Jeremias Ã© profeta do exÃ­lio.',
      'A nova alianÃ§a Ã© tema central.',
      'O julgamento Ã© real.',
      'A restauraÃ§Ã£o Ã© prometida.',
      'O choro do profeta Ã© modelo.'
    ],
    versicosChave: ['Jeremias 29:11', 'Jeremias 31:31-34'],
    tags: ['Jeremias', 'nova alianÃ§a', 'exÃ­lio', 'restauraÃ§Ã£o'],
    fontes: ['Jack Lundbom, Jeremiah']
  },
  {
    id: 'he-040',
    titulo: 'HermenÃªutica de Daniel',
    categoria: 'HermenÃªutica',
    subcategoria: 'Profetas',
    conteudo: [
      'Daniel combina narrativa e profecia.',
      'As visÃµes sÃ£o apocalÃ­pticas.',
      'O Filho do Homem Ã© central.',
      'A soberania de Deus Ã© tema.',
      'A escatologia Ã© influente.'
    ],
    versicosChave: ['Daniel 7:13-14', 'Daniel 2:44'],
    tags: ['Daniel', 'apocalipse', 'Filho do Homem', 'soberania'],
    fontes: ['John Goldingay, Daniel']
  },
  {
    id: 'he-041',
    titulo: 'HermenÃªutica de Mateus',
    categoria: 'HermenÃªutica',
    subcategoria: 'Evangelhos',
    conteudo: [
      'Mateus Ã© evangelho para judeus.',
      'A genealogia Ã© importante.',
      'As cinco seÃ§Ãµes sÃ£o estrutura.',
      'O SermÃ£o da Montanha Ã© central.',
      'A Grande ComissÃ£o Ã© conclusÃ£o.'
    ],
    versicosChave: ['Mateus 1:1', 'Mateus 5-7', 'Mateus 28:19-20'],
    tags: ['Mateus', 'judeus', 'genealogia', 'SermÃ£o da Montanha'],
    fontes: ['R.T. France, Matthew']
  },
  {
    id: 'he-042',
    titulo: 'HermenÃªutica de Marcos',
    categoria: 'HermenÃªutica',
    subcategoria: 'Evangelhos',
    conteudo: [
      'Marcos Ã© evangelho mais curto.',
      'Jesus Ã© servo sofredor.',
      'A PaixÃ£o Ã© clÃ­max.',
      'O discipulado Ã© aÃ§Ã£o.',
      'O segredo messiÃ¢nico Ã© tema.'
    ],
    versicosChave: ['Marcos 1:1', 'Marcos 10:45', 'Marcos 15:33-39'],
    tags: ['Marcos', 'servo', 'PaixÃ£o', 'discipulado'],
    fontes: ['Ben Witherington III, Mark']
  },
  {
    id: 'he-043',
    titulo: 'HermenÃªutica de Lucas',
    categoria: 'HermenÃªutica',
    subcategoria: 'Evangelhos',
    conteudo: [
      'Lucas Ã© evangelho universal.',
      'Os marginalizados sÃ£o enfatizados.',
      'O EspÃ­rito Santo Ã© central.',
      'As parÃ¡bolas da misericÃ³rdia.',
      'A oraÃ§Ã£o Ã© modelo.'
    ],
    versicosChave: ['Lucas 1:1-4', 'Lucas 15', 'Lucas 18:1-8'],
    tags: ['Lucas', 'universalidade', 'misericÃ³rdia', 'EspÃ­rito Santo'],
    fontes: ['Joel Green, Luke']
  },
  {
    id: 'he-044',
    titulo: 'HermenÃªutica de Atos',
    categoria: 'HermenÃªutica',
    subcategoria: 'HistÃ³rico',
    conteudo: [
      'Atos Ã© histÃ³ria da Igreja primitiva.',
      'O EspÃ­rito Santo Ã© protagonista.',
      'A expansÃ£o geogrÃ¡fica Ã© tema.',
      'Pedro e Paulo sÃ£o figuras centrais.',
      'A missÃ£o Ã© o fio condutor.'
    ],
    versicosChave: ['Atos 1:8', 'Atos 2:1-4', 'Atos 28:31'],
    tags: ['Atos', 'EspÃ­rito Santo', 'expansÃ£o', 'missÃ£o'],
    fontes: ['Craig Keener, Acts']
  },
  {
    id: 'he-045',
    titulo: 'HermenÃªutica de GÃ¡latas',
    categoria: 'HermenÃªutica',
    subcategoria: 'Paulinas',
    conteudo: [
      'GÃ¡latas Ã© epÃ­stola da liberdade.',
      'A justificaÃ§Ã£o pela fÃ© Ã© tema.',
      'O legalismo Ã© combatido.',
      'A graÃ§a Ã© central.',
      'A liberdade Ã© para servir.'
    ],
    versicosChave: ['GÃ¡latas 2:16', 'GÃ¡latas 5:1', 'GÃ¡latas 5:22-23'],
    tags: ['GÃ¡latas', 'liberdade', 'fÃ©', 'graÃ§a'],
    fontes: ['Timothy Keller, Galatians']
  },
  {
    id: 'he-046',
    titulo: 'HermenÃªutica de 1 CorÃ­ntios',
    categoria: 'HermenÃªutica',
    subcategoria: 'Paulinas',
    conteudo: [
      '1 CorÃ­ntios Ã© carta a igreja problemÃ¡tica.',
      'DivisÃµes, imoralidade, dons.',
      'O amor Ã© tema central.',
      'A ressurreiÃ§Ã£o Ã© fundamentada.',
      'A ordem no culto.'
    ],
    versicosChave: ['1 CorÃ­ntios 13:1-13', '1 CorÃ­ntios 15:1-58'],
    tags: ['CorÃ­ntios', 'amor', 'dons', 'ressurreiÃ§Ã£o'],
    fontes: ['Anthony Thiselton, 1 Corinthians']
  },
  {
    id: 'he-047',
    titulo: 'HermenÃªutica de 2 CorÃ­ntios',
    categoria: 'HermenÃªutica',
    subcategoria: 'Paulinas',
    conteudo: [
      '2 CorÃ­ntios Ã© mais pessoal.',
      'A fraqueza Ã© fortaleza.',
      'A graÃ§a Ã© suficiente.',
      'O ministÃ©rio da reconciliaÃ§Ã£o.',
      'A generosidade.'
    ],
    versicosChave: ['2 CorÃ­ntios 12:9', '2 CorÃ­ntios 5:17-20'],
    tags: ['2 CorÃ­ntios', 'graÃ§a', 'fraqueza', 'reconciliaÃ§Ã£o'],
    fontes: ['Frank Matera, 2 Corinthians']
  },
  {
    id: 'he-048',
    titulo: 'HermenÃªutica de EfÃ©sios',
    categoria: 'HermenÃªutica',
    subcategoria: 'Paulinas',
    conteudo: [
      'EfÃ©sios Ã© epÃ­stola dos cÃ©us.',
      'As bÃªnÃ§Ã£os espirituais sÃ£o centrais.',
      'A Igreja Ã© corpo de Cristo.',
      'A armadura de Deus.',
      'A unidade Ã© tema.'
    ],
    versicosChave: ['EfÃ©sios 1:3-14', 'EfÃ©sios 6:10-18'],
    tags: ['EfÃ©sios', 'bÃªnÃ§Ã£os', 'Igreja', 'armadura'],
    fontes: ['Peter O\'Brien, Ephesians']
  },
  {
    id: 'he-049',
    titulo: 'HermenÃªutica de Filipenses',
    categoria: 'HermenÃªutica',
    subcategoria: 'Paulinas',
    conteudo: [
      'Filipenses Ã© carta de alegria.',
      'A kenosis Ã© central.',
      'O contentamento Ã© virtude.',
      'Paulo Ã© modelo.',
      'A comunhÃ£o Ã© tema.'
    ],
    versicosChave: ['Filipenses 4:13', 'Filipenses 2:6-11'],
    tags: ['Filipenses', 'alegria', 'kenosis', 'contentamento'],
    fontes: ['Gordon Fee, Philippians']
  },
  {
    id: 'he-050',
    titulo: 'HermenÃªutica de Colossenses',
    categoria: 'HermenÃªutica',
    subcategoria: 'Paulinas',
    conteudo: [
      'Colossenses declara a supremacia de Cristo.',
      'A falsa doutrina Ã© combatida.',
      'A vida cristÃ£ Ã© centrada em Cristo.',
      'A oraÃ§Ã£o Ã© essencial.',
      'A suficiÃªncia de Cristo.'
    ],
    versicosChave: ['Colossenses 1:15-20', 'Colossenses 2:8-10'],
    tags: ['Colossenses', 'supremacia', 'Cristo', 'falsa doutrina'],
    fontes: ['Gordon Fee, Colossians']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // MAIS 55 ESTUDOS FINAIS PARA ATINGIR 400+
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'extra-001',
    titulo: 'A Imagem de Deus no Homem',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'O ser humano foi criado Ã  imagem e semelhanÃ§a de Deus.',
      'A imagem inclui: razÃ£o, personalidade, capacidade moral, relacionamento.',
      'O pecado corrompeu mas nÃ£o destruiu a imagem.',
      'A imagem Ã© restaurada em Cristo.',
      'A dignidade humana decorre da imagem divina.'
    ],
    versicosChave: ['GÃªnesis 1:26-27', 'GÃªnesis 5:1-3', 'Colossenses 3:10', 'Tiago 3:9'],
    tags: ['imagem de Deus', 'dignidade', 'criaÃ§Ã£o', 'humanidade'],
    fontes: ['Calvino, Institutas I.15', 'John Kilner, Dignity and Destiny']
  },
  {
    id: 'extra-002',
    titulo: 'O Chamado de Deus Ã  VocaÃ§Ã£o',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'Todo crente Ã© chamado por Deus para servir.',
      'A vocaÃ§Ã£o nÃ£o Ã© apenas ministerial â€” Ã© toda a vida.',
      'O chamado precede a capacitaÃ§Ã£o.',
      'A obediÃªncia Ã© resposta ao chamado.',
      'A vocaÃ§Ã£o Ã© para a glÃ³ria de Deus.'
    ],
    versicosChave: ['Romanos 8:28-30', '1 Tessalonicenses 5:24', '2 TimÃ³teo 1:9'],
    tags: ['vocaÃ§Ã£o', 'chamado', 'serviÃ§o', 'obediÃªncia'],
    fontes: ['Os Guinness, The Call']
  },
  {
    id: 'extra-003',
    titulo: 'A OraÃ§Ã£o do Senhor â€” Modelo de OraÃ§Ã£o',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'O Pai Nosso Ã© o modelo de oraÃ§Ã£o.',
      'Inclui: adoraÃ§Ã£o, petiÃ§Ã£o, confissÃ£o, proteÃ§Ã£o.',
      'A oraÃ§Ã£o Ã© comunhÃ£o com Deus.',
      'Deus Ã© Pai â€” intimidade e reverÃªncia.',
      'A oraÃ§Ã£o Ã© essencial para vida cristÃ£.'
    ],
    versicosChave: ['Mateus 6:9-13', 'Lucas 11:1-4'],
    tags: ['Pai Nosso', 'oraÃ§Ã£o', 'modelo', 'comunhÃ£o'],
    fontes: ['Martin Luther, A Simple Way to Pray']
  },
  {
    id: 'extra-004',
    titulo: 'A Humildade â€” Virtude CristÃ£',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ã‰tica CristÃ£',
    conteudo: [
      'A humildade Ã© reconhecer nossa dependÃªncia de Deus.',
      'Cristo Ã© modelo de humildade.',
      'A humildade nÃ£o Ã© fraqueza â€” Ã© forÃ§a.',
      'Deus resiste aos soberbos e dÃ¡ graÃ§a aos humildes.',
      'A humildade Ã© fruto do EspÃ­rito.'
    ],
    versicosChave: ['Filipenses 2:3-8', 'Tiago 4:6', '1 Pedro 5:5-6'],
    tags: ['humildade', 'virtude', 'Cristo modelo', 'graa'],
    fontes: ['C.S. Lewis, A Problem of Pain']
  },
  {
    id: 'extra-005',
    titulo: 'A PerseveranÃ§a na FÃ©',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A perseveranÃ§a Ã© evidÃªncia de fÃ© verdadeira.',
      'Deus guarda os Seus eleitos.',
      'O crente persevera porque Deus persevera nele.',
      'As provaÃ§Ãµes testam e refinam a fÃ©.',
      'A perseveranÃ§a produz carÃ¡ter e esperanÃ§a.'
    ],
    versicosChave: ['Romanos 5:3-5', 'Tiago 1:2-4', 'Hebreus 12:1-3'],
    tags: ['perseveranÃ§a', 'fÃ©', 'provaÃ§Ãµes', 'carÃ¡ter'],
    fontes: ['Tom Schreiner, The Race Set Before Us']
  },
  {
    id: 'extra-006',
    titulo: 'O Testemunho CristÃ£o',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Missiologia',
    conteudo: [
      'O testemunho Ã© compartilhar o que Deus fez.',
      'A vida cristÃ£ Ã© testemunho.',
      'O testemunho deve ser honesto e humilde.',
      'O EspÃ­rito Santo capacita.',
      'O testemunho Ã© meio de evangelismo.'
    ],
    versicosChave: ['Atos 1:8', '1 Pedro 3:15', 'Romanos 10:14-17'],
    tags: ['testemunho', 'evangelismo', 'vida cristÃ£', 'EspÃ­rito'],
    fontes: ['John Stott, The Contemporary Christian']
  },
  {
    id: 'extra-007',
    titulo: 'A Comunidade CristÃ£',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A comunidade Ã© essencial para fÃ© cristÃ£.',
      'NÃ£o hÃ¡ cristianismo solitÃ¡rio.',
      'A comunhÃ£o dos santos Ã© realidade.',
      'O amor fraternal Ã© marca.',
      'A responsabilidade mÃºtua.'
    ],
    versicosChave: ['Hebreus 10:24-25', 'Atos 2:42-47', '1 JoÃ£o 1:3'],
    tags: ['comunidade', 'comunhÃ£o', 'amor', 'responsabilidade'],
    fontes: ['Dietrich Bonhoeffer, Life Together']
  },
  {
    id: 'extra-008',
    titulo: 'A Disciplina CristÃ£',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'A disciplina Ã© caminho para a santidade.',
      'Inclui: oraÃ§Ã£o, jejum, leitura da BÃ­blia, partilha.',
      'A disciplina nÃ£o Ã© legalismo â€” Ã© graÃ§a.',
      'Deus disciplina os filhos.',
      'A disciplina Ã© para crescimento.'
    ],
    versicosChave: ['1 TimÃ³teo 4:7-8', 'Hebreus 12:10-11', '1 CorÃ­ntios 9:24-27'],
    tags: ['disciplina', 'crescimento', 'santidade', 'prÃ¡ticas espirituais'],
    fontes: ['Richard Foster, Celebration of Discipline']
  },
  {
    id: 'extra-009',
    titulo: 'A EsperanÃ§a CristÃ£',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A esperanÃ§a cristÃ£ Ã© certeza, nÃ£o desejo.',
      'Ela se baseia na ressurreiÃ§Ã£o de Cristo.',
      'A esperanÃ§a Ã© viva e ativa.',
      'Ela sustenta no sofrimento.',
      'A esperanÃ§a Ã© para sempre.'
    ],
    versicosChave: ['Romanos 8:24-25', '1 Pedro 1:3-5', '1 CorÃ­ntios 15:19-20'],
    tags: ['esperanÃ§a', 'ressurreiÃ§Ã£o', 'futuro', 'sustento'],
    fontes: ['N.T. Wright, Surprised by Hope']
  },
  {
    id: 'extra-010',
    titulo: 'A Alegria CristÃ£',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'A alegria Ã© fruto do EspÃ­rito.',
      'NÃ£o depende de circunstÃ¢ncias.',
      'A alegria Ã© fortaleza.',
      'Deus Ã© alegria do nosso gozo.',
      'A alegria se manifesta em comunidade.'
    ],
    versicosChave: ['Filipenses 4:4', 'Nehemias 8:10', 'GÃ¡latas 5:22'],
    tags: ['alegria', 'gozo', 'EspÃ­rito', 'fortaleza'],
    fontes: ['John Piper, When I Don\'t Desire God']
  },
  {
    id: 'extra-011',
    titulo: 'A ObediÃªncia CristÃ£',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ã‰tica CristÃ£',
    conteudo: [
      'A obediÃªncia Ã© resposta ao amor de Deus.',
      'NÃ£o Ã© legalismo â€” Ã© gratidÃ£o.',
      'A obediÃªncia Ã© prueba de fÃ©.',
      'Deus obedece pelo EspÃ­rito.',
      'A obediÃªncia traz bÃªnÃ§Ã£o.'
    ],
    versicosChave: ['JoÃ£o 14:15', '1 JoÃ£o 5:3', 'Romanos 6:16-18'],
    tags: ['obediÃªncia', 'fÃ©', 'amor', 'gratidÃ£o'],
    fontes: ['John Stott, The Message of Romans']
  },
  {
    id: 'extra-012',
    titulo: 'A Generosidade CristÃ£',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ã‰tica CristÃ£',
    conteudo: [
      'A generosidade Ã© virtude cristÃ£.',
      'Deus Ã© o doador de tudo.',
      'Dar Ã© mais abenÃ§oado que receber.',
      'A generosidade libera do apego.',
      'A oferenda Ã© ato de adoraÃ§Ã£o.'
    ],
    versicosChave: ['2 CorÃ­ntios 9:6-11', 'Atos 20:35', 'Lucas 6:38'],
    tags: ['generosidade', 'dÃ¡diva', 'oferta', 'liberdade'],
    fontes: ['Randy Alcorn, The Treasure Principle']
  },
  {
    id: 'extra-013',
    titulo: 'A PaciÃªncia CristÃ£',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ã‰tica CristÃ£',
    conteudo: [
      'A paciÃªncia Ã© fruto do EspÃ­rito.',
      'Deus Ã© paciente conosco.',
      'A paciÃªncia produz maturidade.',
      'O sofrimento produz paciÃªncia.',
      'A paciÃªncia Ã© fortaleza.'
    ],
    versicosChave: ['Romanos 5:3-4', 'Tiago 1:3-4', 'GÃ¡latas 5:22'],
    tags: ['paciÃªncia', 'sofrimento', 'maturidade', 'EspÃ­rito'],
    fontes: ['Dallas Willard, Renovation of the Heart']
  },
  {
    id: 'extra-014',
    titulo: 'A Bondade CristÃ£',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ã‰tica CristÃ£',
    conteudo: [
      'A bondade Ã© fruto do EspÃ­rito.',
      'Deus Ã© bondade em essÃªncia.',
      'A bondade se manifesta em aÃ§Ã£o.',
      'Bondade nÃ£o Ã© fraqueza â€” Ã© forÃ§a moral.',
      'A bondade transforma relacionamentos.'
    ],
    versicosChave: ['GÃ¡latas 5:22', 'EfÃ©sios 5:9', 'Romanos 12:21'],
    tags: ['bondade', 'virtude', 'EspÃ­rito', 'transformaÃ§Ã£o'],
    fontes: ['Dallas Willard, Renovation of the Heart']
  },
  {
    id: 'extra-015',
    titulo: 'A Fidelidade CristÃ£',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ã‰tica CristÃ£',
    conteudo: [
      'A fidelidade Ã© compromisso com Deus e com os outros.',
      'Deus Ã© fiel â€” podemos confiar.',
      'A fidelidade no pequeno leva ao grande.',
      'A fidelidade Ã© testemunho.',
      'Deus recompensa a fidelidade.'
    ],
    versicosChave: ['Mateus 25:21', '1 CorÃ­ntios 4:2', '2 TimÃ³teo 2:13'],
    tags: ['fidelidade', 'compromisso', 'confianÃ§a', 'testemunho'],
    fontes: ['J.I. Packer, Knowing God']
  },
  {
    id: 'extra-016',
    titulo: 'A Verdade CristÃ£',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Bibliologia',
    conteudo: [
      'A verdade Ã© essencial para a fÃ©.',
      'Cristo Ã© a verdade.',
      'A Escritura Ã© verdade.',
      'A verdade liberta.',
      'A verdade deve ser dita com amor.'
    ],
    versicosChave: ['JoÃ£o 14:6', 'JoÃ£o 8:32', 'EfÃ©sios 4:15'],
    tags: ['verdade', 'Cristo', 'Escritura', 'libertaÃ§Ã£o'],
    fontes: ['Francis Schaepper, True Spirituality']
  },
  {
    id: 'extra-017',
    titulo: 'A JustiÃ§a CristÃ£',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ã‰tica CristÃ£',
    conteudo: [
      'A justiÃ§a Ã© atributo divino.',
      'Deus exige justiÃ§a dos homens.',
      'A justiÃ§a social Ã© obrigaÃ§Ã£o.',
      'A justiÃ§a se pratica em amor.',
      'A justiÃ§a Ã© promessa de Deus.'
    ],
    versicosChave: ['Miqueias 6:8', 'AmÃ³s 5:24', 'Mateus 25:31-46'],
    tags: ['justiÃ§a', 'Ã©tica social', 'Deus justo', 'responsabilidade'],
    fontes: ['Tim Keller, Generous Justice']
  },
  {
    id: 'extra-018',
    titulo: 'A Paz CristÃ£',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ã‰tica CristÃ£',
    conteudo: [
      'A paz Ã© fruto do EspÃ­rito.',
      'Cristo Ã© nosso paz.',
      'A paz nÃ£o Ã© ausÃªncia de conflito â€” Ã© presenÃ§a de justiÃ§a.',
      'Os pacificadores sÃ£o bem-aventurados.',
      'A paz Ã© missÃ£o da Igreja.'
    ],
    versicosChave: ['EfÃ©sios 2:14', 'Mateus 5:9', 'GÃ¡latas 5:22'],
    tags: ['paz', 'EspÃ­rito', 'pacificadores', 'justiÃ§a'],
    fontes: ['John Stott, The Message of the Sermon on the Mount']
  },
  {
    id: 'extra-019',
    titulo: 'O PerdÃ£o CristÃ£o',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ã‰tica CristÃ£',
    conteudo: [
      'O perdÃ£o Ã© essencial para o cristÃ£o.',
      'Deus perdoa em Cristo.',
      'Somos chamados a perdoar.',
      'O perdÃ£o nÃ£o Ã© esquecimento â€” Ã© libertaÃ§Ã£o.',
      'O perdÃ£o restaura relacionamentos.'
    ],
    versicosChave: ['EfÃ©sios 4:32', 'Mateus 6:14-15', 'Colossenses 3:13'],
    tags: ['perdÃ£o', 'reconciliaÃ§Ã£o', 'libertaÃ§Ã£o', 'relacionamentos'],
    fontes: ['Timothy Keller, Forgive']
  },
  {
    id: 'extra-020',
    titulo: 'A GratidÃ£o CristÃ£',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'A gratidÃ£o Ã© resposta Ã  graÃ§a de Deus.',
      'Tudo Ã© dom de Deus.',
      'A gratidÃ£o transforma a perspectiva.',
      'A gratidÃ£o Ã© adoraÃ§Ã£o.',
      'Em toda coisa dÃ¡ graÃ§as.'
    ],
    versicosChave: ['1 Tessalonicenses 5:18', 'Colossenses 3:15-17', 'Salmos 100'],
    tags: ['gratidÃ£o', 'graÃ§a', 'adoraÃ§Ã£o', 'perspectiva'],
    fontes: ['Robert Emmons, Thanks!']
  },
  {
    id: 'extra-021',
    titulo: 'A Santidade Pessoal',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A santidade Ã© chamado para todo crente.',
      'Sem santidade ninguÃ©m verÃ¡ o Senhor.',
      'A santidade Ã© obra do EspÃ­rito.',
      'A santidade Ã© progressiva.',
      'A santidade se pratica em comunidade.'
    ],
    versicosChave: ['Hebreus 12:14', '1 Tessalonicenses 4:3-7', '1 Pedro 1:15-16'],
    tags: ['santidade', 'chamado', 'EspÃ­rito', 'progresso'],
    fontes: ['J.C. Ryle, Holiness']
  },
  {
    id: 'extra-022',
    titulo: 'O JuÃ­zo dos Crentes',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'Os crentes comparecerÃ£o diante do tribunal de Cristo.',
      'NÃ£o Ã© para condenaÃ§Ã£o mas para recompensa.',
      'As obras serÃ£o provadas.',
      'A salvaÃ§Ã£o nÃ£o depende das obras.',
      'A recompensa Ã© proporcional Ã  fidelidade.'
    ],
    versicosChave: ['2 CorÃ­ntios 5:10', '1 CorÃ­ntios 3:10-15', 'Romanos 14:10-12'],
    tags: ['juÃ­zo', 'crentes', 'recompensa', 'obras'],
    fontes: ['G.E. Ladd, A Theology of the New Testament']
  },
  {
    id: 'extra-023',
    titulo: 'A GlÃ³ria de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A glÃ³ria de Deus Ã© a manifestaÃ§Ã£o de Sua majestade.',
      'Tudo existe para a glÃ³ria de Deus.',
      'A criaÃ§Ã£o revela a Sua glÃ³ria.',
      'O pecado ofusca a glÃ³ria.',
      'A salvaÃ§Ã£o restaura a glÃ³ria.'
    ],
    versicosChave: ['Salmos 19:1', 'Romanos 3:23', '1 CorÃ­ntios 10:31'],
    tags: ['glÃ³ria', 'majestade', 'criaÃ§Ã£o', 'salvaÃ§Ã£o'],
    fontes: ['A.W. Tozer, The Knowledge of the Holy']
  },
  {
    id: 'extra-024',
    titulo: 'A VocaÃ§Ã£o Ministerial',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'O ministÃ©rio Ã© chamado de Deus.',
      'Pastores, mestres, evangelistas sÃ£o dons para a Igreja.',
      'O ministÃ©rio Ã© serviÃ§o, nÃ£o poder.',
      'A qualificaÃ§Ã£o Ã© carÃ¡ter, nÃ£o habilidade.',
      'O ministÃ©rio Ã© temporÃ¡rio â€” o Reino Ã© eterno.'
    ],
    versicosChave: ['EfÃ©sios 4:11-12', '1 Pedro 5:1-4', '1 TimÃ³teo 3:1-13'],
    tags: ['ministÃ©rio', 'vocaÃ§Ã£o', 'lideranÃ§a', 'serviÃ§o'],
    fontes: ['Edmund Clowney, The Church']
  },
  {
    id: 'extra-025',
    titulo: 'A Eternidade com Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A eternidade Ã© comunhÃ£o perfeita com Deus.',
      'NÃ£o haverÃ¡ mais lÃ¡grimas.',
      'A presenÃ§a de Deus Ã© o cÃ©u.',
      'O crente viverÃ¡ para sempre.',
      'A eternidade Ã© inÃ­cio, nÃ£o fim.'
    ],
    versicosChave: ['Apocalipse 21:3-4', 'JoÃ£o 14:1-3', '1 CorÃ­ntios 13:12'],
    tags: ['eternidade', 'cÃ©u', 'comunhÃ£o', 'presenÃ§a'],
    fontes: ['Randy Alcorn, Heaven']
  },
  {
    id: 'extra-026',
    titulo: 'A Criatividade CristÃ£',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Cultura',
    conteudo: [
      'Deus Ã© Criador â€” a criatividade Ã© reflexo divino.',
      'A arte Ã© forma de adoraÃ§Ã£o.',
      'A cultura Ã© campo de missÃ£o.',
      'O cristÃ£o deve criar com excelÃªncia.',
      'A beleza Ã© qualidade divina.'
    ],
    versicosChave: ['GÃªnesis 1:1', 'Salmos 19:1', 'Colossenses 3:23'],
    tags: ['criatividade', 'arte', 'cultura', 'adoraÃ§Ã£o'],
    fontes: ['Francis Schaepper, Art and the Bible']
  },
  {
    id: 'extra-027',
    titulo: 'A Tecnologia e a FÃ©',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Cultura Digital',
    conteudo: [
      'A tecnologia Ã© ferramenta â€” neutra em si.',
      'Pode ser usada para o bem ou para o mal.',
      'O discernimento Ã© necessÃ¡rio.',
      'A tecnologia nÃ£o substitui relacionamentos.',
      'A fÃ© deve guiar o uso da tecnologia.'
    ],
    versicosChave: ['Colossenses 3:17', '1 CorÃ­ntios 10:31'],
    tags: ['tecnologia', 'fÃ©', 'discernimento', 'cultura'],
    fontes: ['Andy Crouch, The Tech-Wise Family']
  },
  {
    id: 'extra-028',
    titulo: 'A Responsabilidade Social',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'JustiÃ§a Social',
    conteudo: [
      'A responsabilidade social Ã© evangelho em prÃ¡tica.',
      'Deus defende os oprimidos.',
      'A Igreja Ã© luz e sal do mundo.',
      'A caridade e a justiÃ§a sÃ£o inseparÃ¡veis.',
      'O compromisso social Ã© fÃ© em aÃ§Ã£o.'
    ],
    versicosChave: ['Mateus 5:13-16', 'Tiago 2:15-17', 'Miqueias 6:8'],
    tags: ['responsabilidade social', 'justiÃ§a', 'caridade', 'fÃ©'],
    fontes: ['Tim Keller, Generous Justice']
  },
  {
    id: 'extra-029',
    titulo: 'O Cuidado dos Idosos',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Ã‰tica CristÃ£',
    conteudo: [
      'O idoso Ã© digno de respeito e honra.',
      'A experiÃªncia Ã© tesouro.',
      'O cuidado dos pais Ã© mandamento.',
      'A solidÃ£o dos idosos Ã© preocupaÃ§Ã£o.',
      'A Igreja deve acolher os idosos.'
    ],
    versicosChave: ['LevÃ­tico 19:32', 'EfÃ©sios 6:2', 'Salmos 71:18'],
    tags: ['idosos', 'respeito', 'honor', 'cuidado'],
    fontes: ['John Piper, What the Christian Owe the City']
  },
  {
    id: 'extra-030',
    titulo: 'A CrianÃ§a e o Reino',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'FamÃ­lia',
    conteudo: [
      'Jesus valorizou as crianÃ§as.',
      'O Reino Ã© de tais como estas.',
      'A educaÃ§Ã£o das crianÃ§as Ã© prioridade.',
      'A oraÃ§Ã£o por eles Ã© necessÃ¡ria.',
      'A proteÃ§Ã£o Ã© responsabilidade.'
    ],
    versicosChave: ['Mateus 19:14', 'Marcos 10:14', 'DeuteronÃ´mio 6:6-7'],
    tags: ['crianÃ§as', 'Reino', 'educaÃ§Ã£o', 'proteÃ§Ã£o'],
    fontes: ['Sally Lloyd-Jones, The Jesus Storybook Bible']
  },
  {
    id: 'extra-031',
    titulo: 'A EvangelizaÃ§Ã£o Urbana',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Missiologia',
    conteudo: [
      'As cidades sÃ£o campos missionÃ¡rios.',
      'A diversidade cultural Ã© oportunidade.',
      'A pobreza urbana Ã© desafio.',
      'A missÃ£o urbana Ã© holÃ­stica.',
      'A contextualizaÃ§Ã£o Ã© necessÃ¡ria.'
    ],
    versicosChave: ['Atos 17:16-34', 'Mateus 28:19-20'],
    tags: ['urbano', 'evangelizaÃ§Ã£o', 'cidade', 'contextualizaÃ§Ã£o'],
    fontes: ['Darrell Guder, Missional Church']
  },
  {
    id: 'extra-032',
    titulo: 'A EvangelizaÃ§Ã£o Rural',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Missiologia',
    conteudo: [
      'O mundo rural Ã© frequentemente negligenciado.',
      'A cultura rural tem necessidades prÃ³prias.',
      'A encarnaÃ§Ã£o Ã© modelo.',
      'A comunidade rural Ã© forte.',
      'A missÃ£o rural requer criatividade.'
    ],
    versicosChave: ['Mateus 9:36-38', 'Lucas 10:1-12'],
    tags: ['rural', 'evangelizaÃ§Ã£o', 'comunidade', 'criatividade'],
    fontes: ['Ralph Winter, Perspectives on the World Christian Movement']
  },
  {
    id: 'extra-033',
    titulo: 'A Jovem GeraÃ§Ã£o e a FÃ©',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Cultura',
    conteudo: [
      'A jovem geraÃ§Ã£o busca autenticidade.',
      'O nominalismo Ã© desafio.',
      'A comunidade Ã© importante.',
      'A relevÃ¢ncia cultural Ã© necessÃ¡ria.',
      'A transmissÃ£o da fÃ© Ã© responsabilidade.'
    ],
    versicosChave: ['DeuteronÃ´mio 6:6-7', 'ProvÃ©rbios 22:6', '2 TimÃ³teo 2:2'],
    tags: ['jovens', 'geraÃ§Ã£o', 'fÃ©', 'autenticidade'],
    fontes: ['David Kinnaman, You Lost Me']
  },
  {
    id: 'extra-034',
    titulo: 'A CiÃªncia da ComputaÃ§Ã£o e a FÃ©',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'FÃ© e CiÃªncia',
    conteudo: [
      'A ciÃªncia da computaÃ§Ã£o Ã© ferramenta poderosa.',
      'Pode ser usada para evangelismo e educaÃ§Ã£o.',
      'A Ã©tica digital Ã© necessÃ¡ria.',
      'A inteligÃªncia artificial levanta questÃµes.',
      'A fÃ© deve guiar a inovaÃ§Ã£o.'
    ],
    versicosChave: ['Colossenses 3:17', '1 CorÃ­ntios 10:31'],
    tags: ['computaÃ§Ã£o', 'tecnologia', 'Ã©tica digital', 'inovaÃ§Ã£o'],
    fontes: ['Cal Newport, Digital Minimalism']
  },
  {
    id: 'extra-035',
    titulo: 'A Psicologia e a FÃ©',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'FÃ© e CiÃªncia',
    conteudo: [
      'A psicologia e a fÃ© nÃ£o sÃ£o necessariamente conflitantes.',
      'Deus usa meios para curar.',
      'A sabedoria bÃ­blica Ã© fundamento.',
      'A saÃºde mental Ã© importante.',
      'O aconselhamento bÃ­blico Ã© valioso.'
    ],
    versicosChave: ['ProvÃ©rbios 11:14', 'ProvÃ©rbios 15:22', 'Filipenses 4:6-7'],
    tags: ['psicologia', 'fÃ©', 'saÃºde mental', 'aconselhamento'],
    fontes: ['Ed Welch, Blame It on the Brain?']
  },
  {
    id: 'extra-036',
    titulo: 'A Filosofia e a FÃ©',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'FÃ© e CiÃªncia',
    conteudo: [
      'A filosofia Ã© busca da verdade.',
      'A fÃ© ilumina a razÃ£o.',
      'A apologÃ©tica usa a filosofia.',
      'O cristianismo Ã© racional.',
      'A verdade transcende a filosofia.'
    ],
    versicosChave: ['Colossenses 2:8', 'Romanos 1:20', '1 CorÃ­ntios 1:20-25'],
    tags: ['filosofia', 'fÃ©', 'razÃ£o', 'verdade'],
    fontes: ['William Lane Craig, Reasonable Faith']
  },
  {
    id: 'extra-037',
    titulo: 'A HistÃ³ria e a FÃ©',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'FÃ© e CiÃªncia',
    conteudo: [
      'A histÃ³ria Ã© teatro da aÃ§Ã£o divina.',
      'Deus age na histÃ³ria.',
      'A Escritura Ã© documento histÃ³rico.',
      'A fÃ© Ã© baseada em fatos histÃ³ricos.',
      'A histÃ³ria caminha para o Reino.'
    ],
    versicosChave: ['EfÃ©sios 1:10', 'Apocalipse 11:15', 'Daniel 2:44'],
    tags: ['histÃ³ria', 'fÃ©', 'providÃªncia', 'Reino'],
    fontes: ['N.T. Wright, The New Testament and the People of God']
  },
  {
    id: 'extra-038',
    titulo: 'A Sociologia e a FÃ©',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'FÃ© e CiÃªncia',
    conteudo: [
      'A sociologia estuda as sociedades.',
      'A Igreja Ã© comunidade sociolÃ³gica.',
      'A missÃ£o Ã© contextual.',
      'A cultura influencia a fÃ©.',
      'A fÃ© transforma sociedades.'
    ],
    versicosChave: ['Mateus 5:13-16', 'Atos 2:42-47'],
    tags: ['sociologia', 'Igreja', 'cultura', 'missÃ£o'],
    fontes: ['Robert Woodberry, The Missionary Roots of Liberal Democracy']
  },
  {
    id: 'extra-039',
    titulo: 'A Economia CristÃ£',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Ã‰tica PÃºblica',
    conteudo: [
      'A economia deve servir ao bem comum.',
      'A avareza Ã© pecado.',
      'A generosidade Ã© virtude.',
      'A justiÃ§a econÃ´mica Ã© chamado.',
      'O trabalho Ã© dignidade.'
    ],
    versicosChave: ['Lucas 12:15', '2 CorÃ­ntios 9:6-11', 'ProvÃ©rbios 3:9-10'],
    tags: ['economia', 'generosidade', 'justiÃ§a', 'trabalho'],
    fontes: ['Tim Keller, Every Good Endeavor']
  },
  {
    id: 'extra-040',
    titulo: 'A PolÃ­tica CristÃ£',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Ã‰tica PÃºblica',
    conteudo: [
      'A polÃ­tica Ã© esfera de responsabilidade.',
      'O Reino de Deus transcende partidos.',
      'A justiÃ§a Ã© busca comum.',
      'A obediÃªncia a Deus Ã© suprema.',
      'A participaÃ§Ã£o Ã© dever cÃ­vico.'
    ],
    versicosChave: ['Mateus 22:21', 'Romanos 13:1-7', 'Atos 5:29'],
    tags: ['polÃ­tica', 'justiÃ§a', 'Reino', 'obediÃªncia'],
    fontes: ['James Davison Hunter, To Change the World']
  },
  {
    id: 'extra-041',
    titulo: 'A EducaÃ§Ã£o CristÃ£ no SÃ©culo XXI',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'EducaÃ§Ã£o',
    conteudo: [
      'A educaÃ§Ã£o Ã© essencial para a fÃ©.',
      'O desafio do relativismo.',
      'A formaÃ§Ã£o integral Ã© necessÃ¡ria.',
      'A tecnologia transforma a educaÃ§Ã£o.',
      'A fÃ© Ã© racional e relacional.'
    ],
    versicosChave: ['ProvÃ©rbios 4:7', '2 TimÃ³teo 2:15', 'Filipenses 4:8'],
    tags: ['educaÃ§Ã£o', 'fÃ©', 'relativismo', 'tecnologia'],
    fontes: ['Albert Mohler, Truth Lies']
  },
  {
    id: 'extra-042',
    titulo: 'A Arte e a FÃ©',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Cultura',
    conteudo: [
      'A arte Ã© expressÃ£o da criatividade divina.',
      'A mÃºsica Ã© adoraÃ§Ã£o.',
      'A literatura comunica verdade.',
      'A arte Ã© missÃ£o.',
      'A beleza Ã© qualidade divina.'
    ],
    versicosChave: ['Salmos 150:3-5', 'Colossenses 3:23', 'ÃŠxodo 31:1-11'],
    tags: ['arte', 'mÃºsica', 'literatura', 'adoraÃ§Ã£o'],
    fontes: ['Francis Schaepper, Art and the Bible']
  },
  {
    id: 'extra-043',
    titulo: 'A ComunicaÃ§Ã£o CristÃ£',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Cultura',
    conteudo: [
      'A comunicaÃ§Ã£o Ã© essencial para o evangelho.',
      'A verdade deve ser comunicada com amor.',
      'A mÃ­dia Ã© ferramenta.',
      'A escuta Ã© parte da comunicaÃ§Ã£o.',
      'A comunicaÃ§Ã£o transforma relacionamentos.'
    ],
    versicosChave: ['EfÃ©sios 4:15', 'EfÃ©sios 4:29', 'ProvÃ©rbios 18:21'],
    tags: ['comunicaÃ§Ã£o', 'verdade', 'amor', 'mÃ­dia'],
    fontes: ['John Stott, The Contemporary Christian']
  },
  {
    id: 'extra-044',
    titulo: 'A LideranÃ§a CristÃ£',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A lideranÃ§a cristÃ£ Ã© serviÃ§o.',
      'Cristo Ã© modelo de lideranÃ§a.',
      'O carÃ¡ter Ã© mais importante que a habilidade.',
      'A lideranÃ§a Ã© responsabilidade.',
      'A oraÃ§Ã£o Ã© essencial.'
    ],
    versicosChave: ['Marcos 10:42-45', '1 Pedro 5:1-4', '1 TimÃ³teo 3:1-13'],
    tags: ['lideranÃ§a', 'serviÃ§o', 'carÃ¡ter', 'responsabilidade'],
    fontes: ['John Maxwell, The 21 Irrefutable Laws of Leadership']
  },
  {
    id: 'extra-045',
    titulo: 'A SoluÃ§Ã£o dos Conflitos',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Ã‰tica CristÃ£',
    conteudo: [
      'O conflito Ã© realidade humana.',
      'O evangelho Ã© ministÃ©rio de reconciliaÃ§Ã£o.',
      'O perdÃ£o Ã© essencial.',
      'A comunicaÃ§Ã£o Ã© chave.',
      'A mediaÃ§Ã£o Ã© bÃ­blica.'
    ],
    versicosChave: ['Mateus 18:15-17', 'EfÃ©sios 4:25-32', 'Romanos 12:17-21'],
    tags: ['conflito', 'reconciliaÃ§Ã£o', 'perdÃ£o', 'mediaÃ§Ã£o'],
    fontes: ['Ken Sande, The Peace Maker']
  },
  {
    id: 'extra-046',
    titulo: 'A FormaÃ§Ã£o de CarÃ¡ter',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'O carÃ¡ter Ã© fruto do EspÃ­rito.',
      'A formaÃ§Ã£o Ã© processo.',
      'As provaÃ§Ãµes refinam o carÃ¡ter.',
      'A obediÃªncia forma o carÃ¡ter.',
      'O carÃ¡ter Ã© testemunho.'
    ],
    versicosChave: ['GÃ¡latas 5:22-23', 'Romanos 5:3-5', 'Tiago 1:2-4'],
    tags: ['carÃ¡ter', 'EspÃ­rito', 'provaÃ§Ãµes', 'formaÃ§Ã£o'],
    fontes: ['Dallas Willard, Renovation of the Heart']
  },
  {
    id: 'extra-047',
    titulo: 'A Discipulagem',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Missiologia',
    conteudo: [
      'A discipulagem Ã© o objetivo da missÃ£o.',
      'Fazer discÃ­pulos Ã© mandamento.',
      'A discipulagem Ã© relacional.',
      'O exemplo Ã© mais forte que palavras.',
      'A comunidade Ã© contexto.'
    ],
    versicosChave: ['Mateus 28:19-20', '2 TimÃ³teo 2:2'],
    tags: ['discipulagem', 'missÃ£o', 'relacional', 'exemplo'],
    fontes: ['Dallas Willard, The Great Omission']
  },
  {
    id: 'extra-048',
    titulo: 'A EvangelizaÃ§Ã£o Pessoal',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Missiologia',
    conteudo: [
      'A evangelizaÃ§Ã£o pessoal Ã© essencial.',
      'A relaÃ§Ã£o precede a mensagem.',
      'A escuta Ã© importante.',
      'O testemunho Ã© persuasivo.',
      'O EspÃ­rito capacita.'
    ],
    versicosChave: ['Romanos 10:14-17', '1 Pedro 3:15', 'Atos 1:8'],
    tags: ['evangelizaÃ§Ã£o', 'pessoal', 'testemunho', 'EspÃ­rito'],
    fontes: ['Greg Laurie, Essentials']
  },
  {
    id: 'extra-049',
    titulo: 'A AdoraÃ§Ã£o ContemporÃ¢nea',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A adoraÃ§Ã£o deve ser reverente e relevante.',
      'A mÃºsica Ã© parte da adoraÃ§Ã£o.',
      'A Palavra Ã© central.',
      'A comunhÃ£o Ã© essencial.',
      'A adoraÃ§Ã£o Ã© holÃ­stica.'
    ],
    versicosChave: ['JoÃ£o 4:23-24', 'EfÃ©sios 5:19-20', 'Colossenses 3:16'],
    tags: ['adoraÃ§Ã£o', 'culto', 'mÃºsica', 'Palavra'],
    fontes: ['Robert Webber, Worship Is a Verb']
  },
  {
    id: 'extra-050',
    titulo: 'A MissÃ£o Integral',
    categoria: 'QuestÃµes ContemporÃ¢neas',
    subcategoria: 'Missiologia',
    conteudo: [
      'A missÃ£o inclui palavras e obras.',
      'O evangelho Ã© para toda a vida.',
      'A justiÃ§a social Ã© parte da missÃ£o.',
      'A compaixÃ£o Ã© evidÃªncia de fÃ©.',
      'A missÃ£o Ã© holÃ­stica.'
    ],
    versicosChave: ['Mateus 25:31-46', 'Lucas 4:18-19', 'Tiago 2:15-17'],
    tags: ['missÃ£o integral', 'justiÃ§a social', 'compaixÃ£o', 'holÃ­stica'],
    fontes: ['Chris Wright, The Mission of God']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // ESTUDOS FINAIS
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'final-001',
    titulo: 'A GraÃ§a Santificadora',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A graÃ§a santificadora transforma o carÃ¡ter do crente.',
      'NÃ£o Ã© apenas perdÃ£o mas transformaÃ§Ã£o.',
      'O EspÃ­rito Santo Ã© o agente da santificaÃ§Ã£o.',
      'A santificaÃ§Ã£o Ã© progressiva.',
      'A graÃ§a capacita o que a lei exige.'
    ],
    versicosChave: ['Tito 3:5', '1 Tessalonicenses 4:3', 'EfÃ©sios 2:10'],
    tags: ['graÃ§a', 'santificaÃ§Ã£o', 'transformaÃ§Ã£o', 'EspÃ­rito Santo'],
    fontes: ['John Murray, Redemption Accomplished']
  },
  {
    id: 'final-002',
    titulo: 'A FÃ© Viva e Ativa',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A fÃ© verdadeira nunca estÃ¡ sÃ³.',
      'A fÃ© se prova pelas obras.',
      'A fÃ© Ã© confianÃ§a viva em Cristo.',
      'A fÃ© transforma a vida.',
      'A fÃ© Ã© dom de Deus.'
    ],
    versicosChave: ['Tiago 2:14-26', 'GÃ¡latas 5:6', 'EfÃ©sios 2:8-9'],
    tags: ['fÃ©', 'obras', 'vida', 'transformaÃ§Ã£o'],
    fontes: ['Calvino, Institutas III.2']
  },
  {
    id: 'final-003',
    titulo: 'A EsperanÃ§a no Sofrimento',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'O sofrimento Ã© realidade humana.',
      'A esperanÃ§a cristÃ£ nÃ£o anula a dor.',
      'Deus estÃ¡ presente no sofrimento.',
      'O sofrimento produz carÃ¡ter.',
      'A glÃ³ria futura supera o sofrimento presente.'
    ],
    versicosChave: ['Romanos 8:18', '2 CorÃ­ntios 4:17', '1 Pedro 1:6-7'],
    tags: ['sofrimento', 'esperanÃ§a', 'carÃ¡ter', 'glÃ³ria'],
    fontes: ['C.S. Lewis, The Problem of Pain']
  },
  {
    id: 'final-004',
    titulo: 'O Amor Incondicional',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'O amor de Deus Ã© incondicional.',
      'Ele nos amou quando ainda Ã©ramos pecadores.',
      'O amor nÃ£o depende de nossa dignidade.',
      'O amor se manifesta na cruz.',
      'Somos chamados a amar como fomos amados.'
    ],
    versicosChave: ['Romanos 5:8', '1 JoÃ£o 4:19', 'JoÃ£o 3:16'],
    tags: ['amor', 'incondicional', 'cruz', 'exemplo'],
    fontes: ['Anders Nygren, Agape and Eros']
  },
  {
    id: 'final-005',
    titulo: 'A JustificaÃ§Ã£o pela FÃ© Somente',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A justificaÃ§Ã£o Ã© por fÃ© somente.',
      'NÃ£o pelas obras da lei.',
      'A fÃ© Ã© meio, nÃ£o mÃ©rito.',
      'A justiÃ§a Ã© imputada.',
      'A justificaÃ§Ã£o Ã© certeza.'
    ],
    versicosChave: ['Romanos 3:28', 'GÃ¡latas 2:16', 'EfÃ©sios 2:8-9'],
    tags: ['justificaÃ§Ã£o', 'fÃ© somente', 'imputaÃ§Ã£o', 'certeza'],
    fontes: ['Lutero, Galatas ComentÃ¡rio']
  },
  {
    id: 'final-006',
    titulo: 'A PerseveranÃ§a dos Santos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'Deus guarda os Seus eleitos.',
      'NinguÃ©m pode arrancÃ¡-los das Suas mÃ£os.',
      'A perseveranÃ§a Ã© evidÃªncia de fÃ©.',
      'Deus Ã© fiel para completar o que comeÃ§ou.',
      'A perseveranÃ§a Ã© motivada pela esperanÃ§a.'
    ],
    versicosChave: ['JoÃ£o 10:27-30', 'Filipenses 1:6', 'Romanos 8:38-39'],
    tags: ['perseveranÃ§a', 'seguranÃ§a', 'fidelidade', 'eleiÃ§Ã£o'],
    fontes: ['Calvino, Institutas III.24']
  },
  {
    id: 'final-007',
    titulo: 'A Soberania de Deus na HistÃ³ria',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'Deus governa todas as coisas.',
      'Nada acontece fora do Seu controle.',
      'A histÃ³ria caminha para o Seu propÃ³sito.',
      'Deus usa atÃ© o mal para um bem maior.',
      'A soberania Ã© fonte de seguranÃ§a.'
    ],
    versicosChave: ['EfÃ©sios 1:11', 'Romanos 8:28', 'Daniel 4:35'],
    tags: ['soberania', 'histÃ³ria', 'propÃ³sito', 'seguranÃ§a'],
    fontes: ['Calvino, Institutas I.16']
  },
  {
    id: 'final-008',
    titulo: 'A GraÃ§a que Salva',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A salvaÃ§Ã£o Ã© pela graÃ§a de Deus.',
      'NÃ£o Ã© mÃ©rito humano.',
      'A graÃ§a Ã© gratuita e suficiente.',
      'A graÃ§a transforma vidas.',
      'A graÃ§a Ã© fonte de gratidÃ£o.'
    ],
    versicosChave: ['EfÃ©sios 2:8-9', 'Tito 3:5', 'Romanos 5:8'],
    tags: ['graÃ§a', 'salvaÃ§Ã£o', 'gratuidade', 'transformaÃ§Ã£o'],
    fontes: ['Agostinho, De Gratia et Libero Arbitrio']
  },
  {
    id: 'final-009',
    titulo: 'A Vida Eterna em Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A vida eterna comeÃ§a agora, nÃ£o apenas no cÃ©u.',
      'Ela Ã© conhecimento de Deus.',
      'Ela se manifesta em amor e obediÃªncia.',
      'Ela Ã© certeza para quem crÃª.',
      'Ela se consumarÃ¡ na ressurreiÃ§Ã£o.'
    ],
    versicosChave: ['JoÃ£o 17:3', 'JoÃ£o 10:28', '1 JoÃ£o 5:11-13'],
    tags: ['vida eterna', 'conhecimento', 'certeza', 'ressurreiÃ§Ã£o'],
    fontes: ['G.E. Ladd, A Theology of the New Testament']
  },
  {
    id: 'final-010',
    titulo: 'A MissÃ£o da Igreja no Mundo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A missÃ£o Ã© a razÃ£o de ser da Igreja.',
      'Fazer discÃ­pulos Ã© o mandamento.',
      'A missÃ£o Ã© holÃ­stica.',
      'O EspÃ­rito capacita.',
      'A missÃ£o Ã© para todas as naÃ§Ãµes.'
    ],
    versicosChave: ['Mateus 28:19-20', 'Atos 1:8', 'Romanos 10:14-15'],
    tags: ['missÃ£o', 'discipulado', 'holÃ­stica', 'EspÃ­rito'],
    fontes: ['David Bosch, Transforming Mission']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // TRINDADE - ESTUDOS DETALHADOS (3 estudos)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'trin-001',
    titulo: 'A Doutrina da Trindade â€” Fundamentos BÃ­blicos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Trindade',
    conteudo: [
      'A doutrina da Trindade afirma que hÃ¡ um Ãºnico Deus que subsiste em trÃªs pessoas distintas: Pai, Filho e EspÃ­rito Santo. Cada pessoa Ã© plenamente Deus, e hÃ¡ um sÃ³ Deus verdadeiro. Esta nÃ£o Ã© uma especulaÃ§Ã£o filosÃ³fica, mas a leitura fiel da revelaÃ§Ã£o bÃ­blica.',
      'No Antigo Testamento, a monoteÃ­smo Ã© radicalmente afirmado: "Ouve, Israel, o Senhor nosso Deus Ã© o Ãºnico Senhor" (Dt 6:4). Contudo, multiplicidade interna jÃ¡ se manifesta: o anjo do Senhor Ã© distinto de JavÃ©, o EspÃ­rito de Deus atua criadoramente, e a sabedoria personificada aparece em ProvÃ©rbios 8.',
      'No Novo Testamento, a Trindade aparece no batismo de Jesus (Mt 3:16-17), na Grande ComissÃ£o (Mt 28:19), na bÃªnÃ§Ã£o apostÃ³lica (2 Co 13:14) e em diversas fÃ³rmulas litÃºrgicas. Jesus afirma claramente sua unidade com o Pai: "Eu e o Pai somos um" (Jo 10:30).',
      'O EspÃ­rito Santo Ã© pessoal e divino: fala, ensina, consola, intercede. Atribuem-se a Ele obras divinas: criaÃ§Ã£o, inspiraÃ§Ã£o, regeneraÃ§Ã£o. Sua procession do Pai (e do Filho no Credo de CalcedÃ´nia) Ã© debatida, mas Ã© fato que Ele Ã© pessoa plena da Trindade.',
      'A Trindade nÃ£o Ã© contradiÃ§Ã£o lÃ³gica: Ã© mistÃ©rio que transcende a razÃ£o. NÃ£o Ã© trÃªs deuses, nem trÃªs modos de um Deus. Ã‰ um Deus em trÃªs pessoas subsistentes, co-iguais, co-eternas, co-essenciais. A economia da salvaÃ§Ã£o revela cada pessoa em operaÃ§Ã£o distinta, mas nunca separada.'
    ],
    versicosChave: ['Mateus 28:19', '2 CorÃ­ntios 13:14', 'JoÃ£o 10:30', 'GÃªnesis 1:26', 'IsaÃ­as 48:16'],
    tags: ['trindade', 'monoteÃ­smo', 'Pai', 'Filho', 'EspÃ­rito Santo', 'unidade'],
    fontes: ['Wayne Grudem, Teologia SistemÃ¡tica', 'Millard Erickson, Christian Theology', 'Karl Barth, Church Dogmatics I/1']
  },
  {
    id: 'trin-002',
    titulo: 'A Trindade na HistÃ³ria da Igreja â€” ConcÃ­lios e DefiniÃ§Ãµes',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Trindade',
    conteudo: [
      'A formulaÃ§Ã£o trinitÃ¡ria nÃ£o foi inventada por filÃ³sofos, mas foi o resultado de sÃ©culos de leitura da Escritura e do combate Ã s heresias que ameaÃ§avam a fÃ© cristÃ£. Os primeiros Pais apologistas jÃ¡ afirmavam a divindade do Logos e a aÃ§Ã£o do EspÃ­rito.',
      'O ConcÃ­lio de NicÃ©ia (325) condenou o arianismo, que negava a plena divindade do Filho. O termo "homoousios" (da mesma substÃ¢ncia) foi adotado para afirmar que o Filho Ã© plenamente Deus, nÃ£o uma criatura, por mais exaltada que seja. AtanÃ¡sio foi o principal defensor da fÃ© nicena.',
      'O ConcÃ­lio de Constantinopla (381) completou a obra de NicÃ©ia, afirmando a divindade do EspÃ­rito Santo contra os macedÃ´nios (pneumatÃ´macos), que O tratavam como criatura. O Credo Niceno-Constantinopolitano, usado atÃ© hoje, cristalizou a doutrina.',
      'Os CapadÃ³cios (BasÃ­lio de Cesareia, GregÃ³rio de Nazianzo, GregÃ³rio de Nissa) desenvolveram a distinÃ§Ã£o entre "essÃªncia" (ousia) e "pessoa" (hypostasis), distinguindo a identidade pessoal das pessoas trinitÃ¡rias. Agostinho, no Ocidente, contribuiu com a analogia psicolÃ³gica do amor.',
      'A heresia modalista (Sabelianismo) via as trÃªs pessoas como modos temporais de um Deus uno. O triteÃ­smo via trÃªs deuses. A ortodoxia nicena permaneceu como ponto de equilÃ­brio: trÃªs pessoas, uma essÃªncia. Esta formulaÃ§Ã£o tem resistido por mil e setecentos anos.'
    ],
    versicosChave: ['JoÃ£o 1:1-3', 'Atos 5:3-4', 'Mateus 3:16-17', 'Hebreus 1:3', 'JoÃ£o 15:26'],
    tags: ['Niceia', 'Constantinopla', 'homoousios', 'CapadÃ³cios', 'arianismo', 'modalismo'],
    fontes: ['Jaroslav Pelikan, The Christian Tradition I', 'Lewis Ayres, Nicaea and its Legacy', 'Richard Rubenstein, When Jesus Became God']
  },
  {
    id: 'trin-003',
    titulo: 'A Trindade e a Vida CristÃ£ â€” AplicaÃ§Ãµes PrÃ¡ticas',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Trindade',
    conteudo: [
      'A doutrina da Trindade nÃ£o Ã© mera especulaÃ§Ã£o acadÃªmica; ela molda toda a vida cristÃ£. A experiÃªncia de salvaÃ§Ã£o Ã© trinitÃ¡ria: o Pai planeja a redenÃ§Ã£o, o Filho a executa na cruz, o EspÃ­rito a aplica nos coraÃ§Ãµes.',
      'Na oraÃ§Ã£o, entramos em comunhÃ£o com o Deus triÃºno. Pelo EspÃ­rito, oramos ao Pai em nome do Filho. A Trindade Ã© o contexto eterno da vida devocional. A oraÃ§Ã£o de Jesus em JoÃ£o 17 revela a intimidade trinitÃ¡ria que somos convidados a participar.',
      'A comunidade cristÃ£ Ã© imagem da Trindade. Assim como as pessoas divinas vivem em comunhÃ£o de amor, a Igreja Ã© chamada a viver em koinonia â€” comunhÃ£o, participaÃ§Ã£o, mutualidade. A solidÃ£o Ã© anti-trinitÃ¡ria.',
      'O amor cristÃ£o tem seu modelo na Trindade. O Pai ama o Filho, o Filho ama o Pai, e o EspÃ­rito Ã© o vÃ­nculo desse amor. Quando amamos, participamos do amor eterno que circula na vida divina. Todo amor genuÃ­no Ã© reflexo do amor trinitÃ¡rio.',
      'A missÃ£o Ã© trinitÃ¡ria: somos enviados pelo Filho como o Filho foi enviado pelo Pai, no poder do EspÃ­rito (Jo 20:21). A Grande ComissÃ£o Ã© obra da Trindade. Evangelizar Ã© convidar pessoas a entrar na comunhÃ£o com o Deus triÃºno.'
    ],
    versicosChave: ['JoÃ£o 17:20-23', 'Mateus 28:19', 'EfÃ©sios 2:18', 'Romanos 8:26-27', 'GÃ¡latas 4:6'],
    tags: ['aplicaÃ§Ã£o', 'oraÃ§Ã£o', 'comunhÃ£o', 'amor', 'missÃ£o', 'vida cristÃ£'],
    fontes: ['Garry Williams, Gospel Coalition Essays on the Trinity', 'Fred Sanders, The Deep Things of God', 'Leon Morris, The Gospel According to John']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // EXPIAÃ‡ÃƒO (2 estudos)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'exp-001',
    titulo: 'A ExpiaÃ§Ã£o Substitutiva â€” O CoraÃ§Ã£o do Evangelho',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Cristologia',
    conteudo: [
      'A expiaÃ§Ã£o substitutiva Ã© a doutrina de que Cristo morreu no lugar dos pecadores, carregando sobre Si a penalidade que nos era devida. "Ele foi ferido pelas nossas transgressÃµes" (Is 53:5) Ã© a declaraÃ§Ã£o clÃ¡ssica desta verdade.',
      'A metÃ¡fora do "Cordeiro de Deus que tira o pecado do mundo" (Jo 1:29) ecoa o sistema sacrificial do Antigo Testamento. O sangue dos animais cobria o pecado (Hb 9:22), mas o sangue de Cristo o remove definitivamente, porque Ele Ã© o Cordeiro sem mÃ¡cula (1 Pe 1:19).',
      'Paulo apresenta a justificaÃ§Ã£o pela fÃ© baseada na morte propiciatÃ³ria: "Deus o propÃ´s como propiciaÃ§Ã£o pela fÃ© no seu sangue" (Rm 3:25). A propiciaÃ§Ã£o satisfaz a ira de Deus contra o pecado, removendo o obstÃ¡culo Ã  comunhÃ£o.',
      'A cruz nÃ£o Ã© apenas exemplo de amor (embora tambÃ©m o seja), mas substituiÃ§Ã£o penal. Cristo "se fez pecado por nÃ³s" (2 Co 5:21), "maldito em nosso lugar" (Gl 3:13). Ele sofreu o que nÃ³s merecÃ­amos, para que recebÃªssemos o que Ele merecia (2 Co 5:21).',
      'ImplicaÃ§Ãµes pastorais: a expiaÃ§Ã£o substitutiva oferece seguranÃ§a ao crente. Nenhuma condenaÃ§Ã£o pesa sobre o justificado, porque Cristo jÃ¡ pagou. A santificaÃ§Ã£o flui da gratidÃ£o, nÃ£o do medo. A missÃ£o Ã© motivada pela grandeza do sacrifÃ­cio.'
    ],
    versicosChave: ['IsaÃ­as 53:5', 'Romanos 3:25', '2 CorÃ­ntios 5:21', 'GÃ¡latas 3:13', '1 Pedro 1:18-19'],
    tags: ['expiaÃ§Ã£o', 'substituiÃ§Ã£o', 'propiciaÃ§Ã£o', 'sangue', 'justificaÃ§Ã£o', 'cruz'],
    fontes: ['John Stott, A Cruz de Cristo', 'R.C. Sproul, The Truth of the Cross', 'Leon Morris, The Apostolic Preaching of the Cross']
  },
  {
    id: 'exp-002',
    titulo: 'Teorias da ExpiaÃ§Ã£o ao Longo da HistÃ³ria',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Cristologia',
    conteudo: [
      'A Igreja refletiu sobre o significado da cruz ao longo dos sÃ©culos, desenvolvendo vÃ¡rias teorias da expiaÃ§Ã£o. Cada uma captura um aspecto da verdade bÃ­blica, mas nenhuma esgota o mistÃ©rio.',
      'A teoria do resgate (OrÃ­genes, GregÃ³rio de Nissa) via a morte de Cristo como pagamento a SatanÃ¡s pelo direito sobre os pecadores. A limitaÃ§Ã£o Ã© fazer do diabo o destinatÃ¡rio do pagamento, mas o valor estÃ¡ em afirmar a realidade da libertaÃ§Ã£o.',
      'A teoria da satisfaÃ§Ã£o (Anselmo, Cur Deus Homo, 1098) viu a morte de Cristo como reparaÃ§Ã£o da honra de Deus ofendida pelo pecado. Cristo, como Deus-homem, ofereceu Ã  divindade algo de valor infinito. Esta teoria dominou a Idade MÃ©dia.',
      'A Reforma reformulada a teoria como substituiÃ§Ã£o penal: Cristo nÃ£o apenas satisfez a honra, mas pagou a pena devida pelos pecadores. Calvino, Lutero e os reformados enfatizaram que a justificaÃ§Ã£o se baseia na imputaÃ§Ã£o da obediÃªncia ativa e passiva de Cristo.',
      'A teoria exemplar (Abelardo, SocÃ­nio) via a cruz como exemplo de amor, nÃ£o como sacrifÃ­cio substitutivo. Os reformados combateram-na por reduzir a obra de Cristo aæ¦œæ · moral. A teoria do governo (Grotius) tentou um meio-termo, vendo a morte de Cristo como demonstraÃ§Ã£o da seriedade da lei divina.'
    ],
    versicosChave: ['Romanos 5:8-9', 'Hebreus 9:14', '1 JoÃ£o 2:2', '1 Pedro 3:18', 'EfÃ©sios 5:2'],
    tags: ['teorias', 'resgate', 'satisfaÃ§Ã£o', 'substituiÃ§Ã£o penal', 'exemplar', 'Anselmo'],
    fontes: ['Gustaf AulÃ©n, Christus Victor', 'John McIntyre, The Shape of Soteriology', 'H. D. McDonald, The Atonement of the Death of Christ']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // ELEIÃ‡ÃƒO (2 estudos)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'ele-001',
    titulo: 'A EleiÃ§Ã£o Incondicional â€” O Decreto Eterno de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A eleiÃ§Ã£o Ã© o ato eterno de Deus de escolher, em Cristo, alguns para a salvaÃ§Ã£o, antes da fundaÃ§Ã£o do mundo. Paulo afirma: "nos escolheu nele antes da fundaÃ§Ã£o do mundo" (Ef 1:4). A eleiÃ§Ã£o Ã© incondicional, nÃ£o baseada em obras previstas.',
      'A base da eleiÃ§Ã£o Ã© a livre soberania de Deus, nÃ£o a fÃ© prevista nem as obras meritÃ³rias. Romanos 9:11-13 mostra que JacÃ³ foi escolhido antes de nascer, "para que o propÃ³sito de Deus segundo a eleiÃ§Ã£o permanecesse".',
      'A eleiÃ§Ã£o Ã© em Cristo: "nos escolheu nele". NÃ£o Ã© uma seleÃ§Ã£o arbitrÃ¡ria, mas a escolha de pessoas para serem conformadas Ã  imagem do Filho (Rm 8:29). Cristo Ã© o fundamento e o critÃ©rio da eleiÃ§Ã£o.',
      'A objeÃ§Ã£o calvinista ao arminianismo: a fÃ© nÃ£o pode ser a causa da eleiÃ§Ã£o, porque a fÃ© Ã© dom de Deus (Ef 2:8). Logo, se a fÃ© Ã© dom, e a fÃ© Ã© condiÃ§Ã£o da eleiÃ§Ã£o, entÃ£o Deus escolhe com base em algo que Ele mesmo dÃ¡ â€” o que torna a escolha arbitrÃ¡ria de qualquer forma.',
      'ImplicaÃ§Ãµes pastorais: a eleiÃ§Ã£o Ã© fonte de seguranÃ§a, nÃ£o de orgulho. O crente nÃ£o se gloria em ter sido escolhido, mas no Deus que escolheu. A eleiÃ§Ã£o Ã© mistÃ©rio que humilha e consola: nÃ£o somos salvos por nossa decisÃ£o, mas pelo decreto eterno.'
    ],
    versicosChave: ['EfÃ©sios 1:4-5', 'Romanos 9:11-13', '2 Tessalonicenses 2:13', '1 Pedro 1:2', 'JoÃ£o 15:16'],
    tags: ['eleiÃ§Ã£o', 'predestinaÃ§Ã£o', 'decreto', 'soberania', 'reforma'],
    fontes: ['JoÃ£o Calvino, Institutas III.21-24', 'Jonathan Edwards, Freedom of the Will', 'John Piper, The Pleasures of God']
  },
  {
    id: 'ele-002',
    titulo: 'EleiÃ§Ã£o e EvangelizaÃ§Ã£o â€” O EquilÃ­brio BÃ­blico',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A eleiÃ§Ã£o e a evangelizaÃ§Ã£o nÃ£o se contradizem; ambas sÃ£o ensinadas na Escritura. Deus elege soberanamente, mas tambÃ©m ordena que o evangelho seja pregado a toda criatura. O crente na eleiÃ§Ã£o nÃ£o Ã© passivo na missÃ£o.',
      'Jesus une os dois: "NÃ£o fostes vÃ³s que me escolhestes a mim; pelo contrÃ¡rio, eu vos escolhi a vÃ³s outros e vos designei para que vades e deis fruto" (Jo 15:16). A escolha precede a missÃ£o, mas a missÃ£o Ã© o fruto da escolha.',
      'A eleiÃ§Ã£o nÃ£o anula a responsabilidade humana. Paulo, sabendo-se enviado aos eleitos, pregava a todos (At 18:9-10). A soberania divina e a instrumentalidade humana coexistem na economia da salvaÃ§Ã£o.',
      'O arminianismo vÃª a eleiÃ§Ã£o como condicional â€” Deus elege com base na fÃ© prevista. Isto preserva a liberdade humana, mas enfraquece a soberania divina. O calvinismo vÃª a eleiÃ§Ã£o como incondicional â€” Deus elege soberanamente, e a fÃ© Ã© o fruto, nÃ£o a causa.',
      'Praticamente, a doutrina da eleiÃ§Ã£o deve produzir zelo missionÃ¡rio, nÃ£o apatia. Se Deus elegeu, hÃ¡ eleitos em todo lugar â€” nossa tarefa Ã© buscÃ¡-los pelo evangelho. Os puritanos, que criam na eleiÃ§Ã£o incondicional, foram os maiores missionÃ¡rios de sua Ã©poca.'
    ],
    versicosChave: ['JoÃ£o 15:16', 'Atos 18:9-10', 'Romanos 10:14-15', '2 TimÃ³teo 2:10', '1 Tessalonicenses 1:4-5'],
    tags: ['eleiÃ§Ã£o', 'evangelizaÃ§Ã£o', 'missÃ£o', 'livre arbÃ­trio', 'cooperaÃ§Ã£o'],
    fontes: ['Iain Murray, Spurgeon v. Hyper-Calvinism', 'John Stott, A FÃ© CristÃ£ em Busca de Novos Rumos', 'Michael Horton, Putting Amazing Back Into Grace']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // PERSEVERANÃ‡A DOS SANTOS (1 estudo)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'pers-001',
    titulo: 'A PerseveranÃ§a dos Santos â€” SeguranÃ§a Eterna do Crente',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A perseveranÃ§a dos santos (ou preservaÃ§Ã£o divina) Ã© a doutrina de que aqueles que foram verdadeiramente regenerados por Deus perseverarÃ£o na fÃ© atÃ© o fim. A salvaÃ§Ã£o Ã© obra de Deus, do princÃ­pio ao fim, e Ele Ã© fiel para completar o que comeÃ§ou.',
      'Paulo garante: "Aquele que comeÃ§ou a boa obra em vÃ³s hÃ¡ de completÃ¡-la atÃ© ao dia de Cristo Jesus" (Fp 1:6). A salvaÃ§Ã£o Ã© da graÃ§a, e a graÃ§a que salva Ã© a graÃ§a que sustenta. Deus nÃ£o comeÃ§a uma obra para abandonÃ¡-la no meio.',
      'Jesus afirma a seguranÃ§a dos Seus: "Eu dou-lhes a vida eterna, e jamais perecerÃ£o; ninguÃ©m as arrebatarÃ¡ da minha mÃ£o" (Jo 10:28). A salvaÃ§Ã£o Ã© dom do Pai ao Filho, e o Filho a preserva.',
      'O texto de Romanos 8:30 forma a "cadeia de ouro" da salvaÃ§Ã£o: a quem Deus predestinou, chamou, justificou e glorificou. Cada elo do processo Ã© obra de Deus. A glorificaÃ§Ã£o Ã© tÃ£o certa quanto a justificaÃ§Ã£o, porque vem da mesma mÃ£o soberana.',
      'ObjeÃ§Ãµes comuns: e os que "desistem"? Os reformados respondem: a fÃ© que desiste nÃ£o era fÃ© salvÃ­fica. A perseveranÃ§a Ã© evidÃªncia da regeneraÃ§Ã£o. Quem nasce de Deus, o EspÃ­rito o sustenta. NÃ£o por mÃ©rito do crente, mas pela fidelidade do Deus que chamou.'
    ],
    versicosChave: ['Filipenses 1:6', 'JoÃ£o 10:28-29', 'Romanos 8:30', '1 Pedro 1:5', 'Judas 1:24'],
    tags: ['perseveranÃ§a', 'seguranÃ§a', 'preservaÃ§Ã£o', 'fidelidade', 'graÃ§a'],
    fontes: ['JoÃ£o Calvino, Institutas III.24', 'Anthony Hoekema, Saved by Grace', 'Robert Peterson, Eternal Security']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // BATISMO (2 estudos)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'bat-001',
    titulo: 'O Batismo CristÃ£o â€” Significado e Modo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Sacramentos',
    conteudo: [
      'O batismo Ã© o sacramento da iniciaÃ§Ã£o cristÃ£, instituÃ­do por Cristo na Grande ComissÃ£o: "Batizando-os em nome do Pai, e do Filho, e do EspÃ­rito Santo" (Mt 28:19). Ã‰ o sinal de entrada no corpo de Cristo e na comunidade da fÃ©.',
      'O simbolismo Ã© rico: o batismo representa a morte e ressurreiÃ§Ã£o de Cristo (Rm 6:3-4), a purificaÃ§Ã£o do pecado (At 2:38), a circuncisÃ£o do coraÃ§Ã£o (Cl 2:11-12) e a nova criaÃ§Ã£o (Gl 3:27). Ã‰ morrer para o pecado e viver para Deus.',
      'O modo do batismo divide a cristandade: imersÃ£o, aspersÃ£o e efusÃ£o sÃ£o praticadas. Os batistas defendem a imersÃ£o como Ãºnico modo vÃ¡lido, argumentando que o grego "baptizo" significa imergir, e que os simbolismos de morte e ressurreiÃ§Ã£o exigem submersÃ£o.',
      'Os pedobatistas (que batizam crianÃ§as) defendem a aspersÃ£o ou efusÃ£o, argumentando que a circuncisÃ£o do Antigo Testamento Ã© prefiguraÃ§Ã£o do batismo, e que a alianÃ§a se estende aos filhos dos crentes (At 2:38-39; 16:15,33; 1 Co 7:14).',
      'Independentemente do modo, o batismo Ã© ordenado por Cristo, Ã© sinal de graÃ§a, Ã© administrado uma vez, e Ã© sinal de ingresso na comunidade da fÃ©. Sua teologia nÃ£o substitui a fÃ©, mas a expressa publicamente.'
    ],
    versicosChave: ['Mateus 28:19', 'Romanos 6:3-4', 'Atos 2:38', 'Colossenses 2:12', 'GÃ¡latas 3:27'],
    tags: ['batismo', 'sacramento', 'iniciaÃ§Ã£o', 'imersÃ£o', 'aspersÃ£o', 'alianÃ§a'],
    fontes: ['Wayne Grudem, Teologia SistemÃ¡tica', 'G.R. Beasley-Murray, Baptism in the New Testament', 'John Murray, Christian Baptism']
  },
  {
    id: 'bat-002',
    titulo: 'O Batismo de CrianÃ§as â€” Debate HistÃ³rico-TeolÃ³gico',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Sacramentos',
    conteudo: [
      'O batismo de crianÃ§as (pedobatismo) Ã© praticado pela maioria das tradiÃ§Ãµes cristÃ£s: catÃ³lica, ortodoxa, luterana, reformada, anglicana, metodista. Os batistas e algumas igrejas evangÃ©licas o rejeitam, praticando o batismo de crentes (credobatismo).',
      'Os argumentos a favor do pedobatismo: 1) A alianÃ§a abraÃ¢mica incluÃ­a os filhos (Gn 17:7-12); 2) Atos 16:15 (LÃ­dia e sua casa) e 16:33 (o carcereiro e sua casa) mencionam batismos domÃ©sticos; 3) 1 Co 7:14 indica que os filhos dos crentes sÃ£o "santos"; 4) A teologia reformada vÃª continuidade entre Antigo e Novo Testamento.',
      'Os argumentos a favor do credobatismo: 1) NÃ£o hÃ¡ mandamento explÃ­cito de batizar crianÃ§as; 2) O exemplo do Novo Testamento mostra crentes sendo batizados apÃ³s a conversÃ£o; 3) O batismo pressupÃµe fÃ© pessoal (Mc 16:16; At 2:41); 4) A teologia batista vÃª a igreja como comunidade de crentes professos.',
      'Calvino e os reformados viram a circuncisÃ£o como prefiguraÃ§Ã£o do batismo. Assim como os filhos dos hebreus eram circuncidados a partir de AbraÃ£o, os filhos dos crentes sÃ£o batizados na nova alianÃ§a. A continuidade da alianÃ§a sustenta o pedobatismo.',
      'A questÃ£o Ã© eclesiologicamente importante: pedobatistas veem a Igreja como continuidade de Israel e a alianÃ§a abraÃ¢mica; credobatistas veem a Igreja como nova entidade de crentes professos. Ambas as posiÃ§Ãµes tÃªm argumentos exegÃ©ticos sÃ³lidos, e o debate continua na cristandade.'
    ],
    versicosChave: ['GÃªnesis 17:7-12', 'Atos 2:38-39', 'Atos 16:15', '1 CorÃ­ntios 7:14', 'Colossenses 2:11-12'],
    tags: ['pedobatismo', 'credobatismo', 'crianÃ§as', 'alianÃ§a', 'circuncisÃ£o'],
    fontes: ['JoÃ£o Calvino, Institutas IV.16', 'Karl Barth, Church Dogmatics IV/4', 'David Wright, What Has Infant Baptism Done to Baptism?']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // CEIA DO SENHOR (2 estudos)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'ceia-001',
    titulo: 'A Ceia do Senhor â€” InstituiÃ§Ã£o e Significado',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Sacramentos',
    conteudo: [
      'A Ceia do Senhor (Eucaristia, Santa Ceia, ComunhÃ£o) foi instituÃ­da por Cristo na noite da PÃ¡scoa, pouco antes de Sua crucifixÃ£o. "Isto Ã© o meu corpo... isto Ã© o meu sangue" (Mt 26:26-28) Ã© a declaraÃ§Ã£o central do sacramento.',
      'O pÃ£o representa o corpo de Cristo, partido por nÃ³s. O vinho representa o sangue da nova alianÃ§a, derramado para remissÃ£o dos pecados. Os elementos sÃ£o sinais visÃ­veis de uma graÃ§a invisÃ­vel â€” o sacrifÃ­cio de Cristo aplicado ao crente.',
      'A Ceia Ã© memorial: "Fazei isto em memÃ³ria de mim" (1 Co 11:24). A Igreja recorda a morte salvÃ­fica de Cristo toda vez que parte o pÃ£o. A Ceia nÃ£o acrescenta nada ao sacrifÃ­cio de Cristo, mas o atualiza na experiÃªncia dos fiÃ©is.',
      'A Ceia Ã© comunhÃ£o: "O pÃ£o que partimos nÃ£o Ã© porventura a comunhÃ£o do corpo de Cristo?" (1 Co 10:16). Participamos da morte de Cristo pela fÃ©, e somos unidos a Ele e aos irmÃ£os. A Ceia Ã© comunhÃ£o vertical e horizontal.',
      'A Ceia Ã© proclamaÃ§Ã£o: "Porque todas as vezes que comerdes deste pÃ£o e beberdes deste cÃ¡lice, anunciais a morte do Senhor" (1 Co 11:26). Cada celebraÃ§Ã£o Ã© um sermÃ£o visÃ­vel do evangelho, atÃ© que Ele venha. A Ceia tem dimensÃ£o escatolÃ³gica.'
    ],
    versicosChave: ['Mateus 26:26-28', '1 CorÃ­ntios 11:23-26', '1 CorÃ­ntios 10:16-17', 'JoÃ£o 6:53-58', 'Lucas 22:19-20'],
    tags: ['ceia', 'eucaristia', 'sacramento', 'comunhÃ£o', 'memorial', 'sangue'],
    fontes: ['JoÃ£o Calvino, Institutas IV.17', 'Thomas Cranmer, Book of Common Prayer', 'Herman Bavinck, Reformed Dogmatics IV']
  },
  {
    id: 'ceia-002',
    titulo: 'A PresenÃ§a de Cristo na Ceia â€” VisÃµes HistÃ³ricas',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Sacramentos',
    conteudo: [
      'A questÃ£o da presenÃ§a de Cristo na Ceia divide a cristandade em quatro grandes visÃµes: transubstanciaÃ§Ã£o, consubstanciaÃ§Ã£o, presenÃ§a espiritual e memorialismo. Cada uma interpreta "isto Ã© o meu corpo" Ã  sua maneira.',
      'A transubstanciaÃ§Ã£o (catolicismo romano) ensina que a substÃ¢ncia do pÃ£o se converte no corpo de Cristo, e a do vinho em Seu sangue, permanecendo apenas as aparÃªncias (espÃ©cies). Foi definida oficialmente no IV ConcÃ­lio de LatrÃ£o (1215) e reafirmada em Trento.',
      'A consubstanciaÃ§Ã£o (Lutero) ensina que Cristo estÃ¡ presente "em, com e sob" o pÃ£o e o vinho, sem que estes deixem de ser pÃ£o e vinho. Lutero usou a analogia do ferro em brasa: o ferro estÃ¡ no fogo, e o fogo no ferro, sem se misturarem.',
      'A presenÃ§a espiritual (Calvino, reformados) ensina que Cristo estÃ¡ presente pelo EspÃ­rito, e que os crentes sÃ£o elevados ao cÃ©u para participar do Seu corpo glorificado. O pÃ£o e o vinho permanecem pÃ£o e vinho, mas sÃ£o meios pelos quais recebemos a Cristo pela fÃ©.',
      'O memorialismo (Zwinglio, batistas reformados) entende "isto Ã©" como "isto significa", e vÃª a Ceia como memorial obediencial, sem presenÃ§a especial de Cristo. Os elementos permanecem sÃ­mbolos. A presenÃ§a Ã© pela fÃ©, nÃ£o objetivamente nos elementos.'
    ],
    versicosChave: ['Mateus 26:26', '1 CorÃ­ntios 11:24-25', 'JoÃ£o 6:63', 'Atos 3:21', 'Hebreus 1:3'],
    tags: ['transubstanciaÃ§Ã£o', 'consubstanciaÃ§Ã£o', 'presenÃ§a espiritual', 'memorialismo', 'Lutero', 'Calvino', 'Zwinglio'],
    fontes: ['JoÃ£o Calvino, Institutas IV.17', 'Heinrich Heppe, Reformed Dogmatics', 'David Willis-Watkins, The Lutheran Reformation']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // ESCATOLOGIA DETALHADA (3 estudos)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'esc-001',
    titulo: 'O Arrebatamento da Igreja â€” PrÃ©, Mid ou PÃ³s-Tribulacionismo',
    categoria: 'Escatologia',
    subcategoria: 'Eventos Finais',
    conteudo: [
      'O arrebatamento (raptura) Ã© o evento em que Cristo vem para tirar Sua Igreja do mundo antes da ira escatolÃ³gica. As visÃµes principais diferem quanto ao momento: prÃ©-tribulacionismo, mid-tribulacionismo e pÃ³s-tribulacionismo.',
      'O prÃ©-tribulacionismo ensina que a Igreja serÃ¡ arrebatada antes da tribulaÃ§Ã£o de sete anos. Os argumentos: 1) A Igreja Ã© distinta de Israel; 2) 1 Ts 4:13-18 indica um arrebatamento iminente; 3) Apocalipse menciona a Igreja apenas atÃ© o capÃ­tulo 3, ausente da tribulaÃ§Ã£o; 4) Deus nÃ£o destina Sua Igreja Ã  ira (1 Ts 5:9).',
      'O mid-tribulacionismo ensina que o arrebatamento ocorre no meio da tribulaÃ§Ã£o (apÃ³s 3,5 anos). Os argumentos: 1) Apocalipse 11:12 menciona dois profetas "subindo ao cÃ©u"; 2) Daniel 7:25 menciona "um tempo, dois tempos e metade de um tempo" como metade da tribulaÃ§Ã£o; 3) A Igreja passa por provaÃ§Ã£o, mas nÃ£o pela ira final.',
      'O pÃ³s-tribulacionismo ensina que a Igreja passa por toda a tribulaÃ§Ã£o e Ã© arrebatada no final, para encontrar Cristo na Sua segunda vinda. Os argumentos: 1) 2 Ts 2:1-4 indica que Cristo sÃ³ vem apÃ³s a apostasia e a revelaÃ§Ã£o do anticristo; 2) A Igreja passa por perseguiÃ§Ã£o sempre; 3) NÃ£o hÃ¡ separaÃ§Ã£o clara entre a Igreja e Israel.',
      'A posiÃ§Ã£o prÃ©-tribulacional tem sido a mais popular no evangelicalismo, especialmente no meio das assemblÃ©ias e dos batistas. Os prÃ©-milenistas geralmente a defendem. Os amilenistas e pÃ³s-milenistas tendem a rejeitar a ideia de arrebatamento secreto, vendo a vinda de Cristo como evento Ãºnico e visÃ­vel.'
    ],
    versicosChave: ['1 Tessalonicenses 4:13-18', 'Apocalipse 3:10', '1 Tessalonicenses 5:9', '2 Tessalonicenses 2:1-4', 'Mateus 24:36-44'],
    tags: ['arrebatamento', 'raptura', 'tribulaÃ§Ã£o', 'prÃ©-tribulacionismo', 'pÃ³s-tribulacionismo', 'escatologia'],
    fontes: ['John Walvoord, The Rapture Question', 'George Eldon Ladd, The Blessed Hope', 'Craig Keener, Matthew (IVP)']
  },
  {
    id: 'esc-002',
    titulo: 'A Grande TribulaÃ§Ã£o â€” PerÃ­odo de AngÃºstia e PurificaÃ§Ã£o',
    categoria: 'Escatologia',
    subcategoria: 'Eventos Finais',
    conteudo: [
      'A Grande TribulaÃ§Ã£o Ã© o perÃ­odo final de sete anos, descrito em Daniel 9:24-27 e Apocalipse 6-19. SerÃ¡ um tempo de angÃºstia sem paralelo na histÃ³ria (Dn 12:1; Mt 24:21), com a manifestaÃ§Ã£o plena do anticristo e a ira de Deus sobre a humanidade rebelde.',
      'Daniel 9:24-27 profetiza "setenta semanas" (anos), das quais 69 foram cumpridas na primeira vinda de Cristo. A 70Âª semana (sete anos) Ã© a tribulaÃ§Ã£o, cortada ao meio (3,5 anos) pela "abominaÃ§Ã£o da desolaÃ§Ã£o" (Dn 9:27; Mt 24:15).',
      'No meio da tribulaÃ§Ã£o, o anticristo profanarÃ¡ o templo reconstruÃ­do em JerusalÃ©m, exigindo adoraÃ§Ã£o. Este evento ("abominaÃ§Ã£o da desolaÃ§Ã£o") marca o inÃ­cio da "grande tribulaÃ§Ã£o" (Mt 24:21), os Ãºltimos 3,5 anos de intenso sofrimento.',
      'As pragas do Apocalipse (selos, trombetas, taÃ§as) descrevem juÃ­zos progressivos sobre a Terra. Os 144.000 judeus selados (Ap 7:1-8) e as duas testemunhas (Ap 11) atuam durante este perÃ­odo. A "mulher" de Apocalipse 12 representa Israel, perseguida pelo dragÃ£o.',
      'A Igreja, segundo o prÃ©-tribulacionismo, Ã© tirada antes deste perÃ­odo. Segundo o pÃ³s-tribulacionismo, ela passa por ele. De qualquer forma, Deus preserva um remanescente fiel. O objetivo da tribulaÃ§Ã£o Ã© o juÃ­zo da humanidade rebelde e a purificaÃ§Ã£o do povo de Deus.'
    ],
    versicosChave: ['Daniel 9:24-27', 'Mateus 24:15-21', 'Apocalipse 7:14', 'Apocalipse 11:2-3', 'Apocalipse 13:5-7'],
    tags: ['tribulaÃ§Ã£o', 'anticristo', 'Daniel', '70 semanas', 'abominaÃ§Ã£o', 'selos', 'trombetas'],
    fontes: ['RenÃ© Pache, O Retorno de Jesus Cristo', 'John Walvoord, The Revelation of Jesus Christ', 'Merrill Tenney, Interpreting Revelation']
  },
  {
    id: 'esc-003',
    titulo: 'O MilÃªnio â€” Amilenismo, PrÃ©-milenismo e PÃ³s-milenismo',
    categoria: 'Escatologia',
    subcategoria: 'Eventos Finais',
    conteudo: [
      'Apocalipse 20:1-6 menciona um "mil anos" seis vezes, gerando intenso debate na Igreja. TrÃªs posiÃ§Ãµes principais: amilenismo (nÃ£o hÃ¡ milÃªnio literal), prÃ©-milenismo (milÃªnio literal antes da eternidade) e pÃ³s-milenismo (milÃªnio antes da segunda vinda).',
      'O amilenismo (Agostinho, muitos reformados) entende os mil anos como o perÃ­odo entre a primeira e a segunda vinda de Cristo, ou como a condiÃ§Ã£o atual da Igreja, na qual Cristo reina espiritualmente. Os dois ressurreiÃ§Ãµes sÃ£o a regeneraÃ§Ã£o e a ressurreiÃ§Ã£o corporal. O nÃºmero 1000 Ã© simbÃ³lico, nÃ£o literal.',
      'O prÃ©-milenismo (literalistas, dispensacionalistas, primitivos) entende os mil anos como um reinado literal de Cristo na Terra apÃ³s Sua segunda vinda, com os santos ressurrectos reinando com Ele por mil anos. Ocorre entre a primeira e a segunda ressurreiÃ§Ã£o (separadas por mil anos).',
      'O pÃ³s-milenismo (otimistas, vitoriosos) entende os mil anos como uma era de ouro da Igreja, antes da segunda vinda, em que o evangelho prevalecerÃ¡ no mundo. ApÃ³s este perÃ­odo, Cristo voltarÃ¡. Foi popular entre os puritanos e no evangelicalismo do sÃ©culo 19.',
      'ImplicaÃ§Ãµes pastorais: o prÃ©-milenismo enfatiza a esperanÃ§a da vinda iminente; o amilenismo enfatiza a realidade presente do reino; o pÃ³s-milenismo enfatiza o otimismo da missÃ£o. Todas as posiÃ§Ãµes tÃªm apoio exegÃ©tico respeitÃ¡vel, e o debate continua.'
    ],
    versicosChave: ['Apocalipse 20:1-6', '1 CorÃ­ntios 15:24-28', 'Mateus 5:5', 'IsaÃ­as 65:17-25', '2 Pedro 3:8'],
    tags: ['milÃªnio', 'amilenismo', 'prÃ©-milenismo', 'pÃ³s-milenismo', 'reino', 'escatologia'],
    fontes: ['Anthony Hoekema, The Bible and the Future', 'George Eldon Ladd, The Blessed Hope', 'Herman Ridderbos, The Coming of the Kingdom']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // VIDA DEVOCIONAL (2 estudos)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'dev-001',
    titulo: 'A OraÃ§Ã£o â€” ComunhÃ£o com o Pai',
    categoria: 'Vida CristÃ£',
    subcategoria: 'DevoÃ§Ã£o',
    conteudo: [
      'A oraÃ§Ã£o Ã© a comunhÃ£o do crente com Deus. Ã‰ diÃ¡logo, nÃ£o monÃ³logo. Jesus ensinou a orar com a paternidade de Deus em vista: "Pai nosso, que estÃ¡s nos cÃ©us" (Mt 6:9). A intimidade filial Ã© o fundamento da oraÃ§Ã£o cristÃ£.',
      'Os elementos da oraÃ§Ã£o cristÃ£: adoraÃ§Ã£o (reconhecer quem Deus Ã©), confissÃ£o (admitir o pecado), aÃ§Ã£o de graÃ§as (gratidÃ£o pelas bÃªnÃ§Ã£os), sÃºplica (pedir necessidades) e intercessÃ£o (orar pelos outros). A OraÃ§Ã£o do Senhor cobre todas essas dimensÃµes.',
      'As condiÃ§Ãµes da oraÃ§Ã£o eficaz: 1) FÃ© em Deus (Tg 1:6-7); 2) Permanecer em Cristo (Jo 15:7); 3) Pedir conforme a vontade de Deus (1 Jo 5:14); 4) NÃ£o pedir com motivos errados (Tg 4:3); 5) Humildade e arrependimento (Lc 18:9-14).',
      'As oraÃ§Ãµes do AT e do NT revelam profundidade. MoisÃ©s intercedeu por Israel (ÃŠx 32:11-14). Davi clamou do fundo do vale (Sl 130). Daniel orou trÃªs vezes ao dia (Dn 6:10). Paulo pediu que os crentes orassem por ele (Ef 6:18-20).',
      'A oraÃ§Ã£o persistente: Jesus ensinou a parÃ¡bola da viÃºva e do juiz (Lc 18:1-8) para encorajar a oraÃ§Ã£o constante. NÃ£o Ã© que Deus precise ser importunado, mas nossa perseveranÃ§a Ã© disciplina da alma. OraÃ§Ã£o Ã© relacionamento, nÃ£o mÃ¡gica.'
    ],
    versicosChave: ['Mateus 6:9-13', 'Filipenses 4:6-7', '1 Tessalonicenses 5:17', 'Hebreus 4:16', 'Salmos 145:18'],
    tags: ['oraÃ§Ã£o', 'Pai nosso', 'intercessÃ£o', 'fÃ©', 'comunhÃ£o', 'perseveranÃ§a'],
    fontes: ['Andrew Murray, Com Cristo na Escola de OraÃ§Ã£o', 'John Bunyan, O Peregrino', 'E.M. Bounds, Power Through Prayer']
  },
  {
    id: 'dev-002',
    titulo: 'A Leitura BÃ­blica â€” A Palavra como PÃ£o DiÃ¡rio',
    categoria: 'Vida CristÃ£',
    subcategoria: 'DevoÃ§Ã£o',
    conteudo: [
      'A leitura regular da BÃ­blia Ã© essencial para a vida cristÃ£. Jesus respondeu Ã  tentaÃ§Ã£o com "EstÃ¡ escrito" (Mt 4:4). A Palavra de Deus Ã© o pÃ£o do espÃ­rito, a espada do crente, o espelho da alma, e o combustÃ­vel da fÃ©.',
      'Como ler a BÃ­blia com proveito: 1) Ore antes de ler, pedindo iluminaÃ§Ã£o do EspÃ­rito; 2) Leia com reverÃªncia, como Palavra de Deus; 3) Leia com regularidade, em plano sistemÃ¡tico; 4) Leia com atenÃ§Ã£o, meditando no texto; 5) Leia com obediÃªncia, aplicando Ã  vida.',
      'A leitura devocional difere do estudo exegÃ©tico. A primeira visa comunhÃ£o com Deus; o segundo, entendimento do texto. Ambas sÃ£o necessÃ¡rias, mas tÃªm objetivos distintos. A leitura devocional nÃ£o substitui o estudo aprofundado, e vice-versa.',
      'Os benefÃ­cios da leitura bÃ­blica regular: 1) SantificaÃ§Ã£o â€” "santifica-os na verdade" (Jo 17:17); 2) ConsolaÃ§Ã£o â€” "para que tenhais esperanÃ§a" (Rm 15:4); 3) DireÃ§Ã£o â€” "lÃ¢mpada para os meus pÃ©s" (Sl 119:105); 4) Defesa â€” contra o erro e o pecado.',
      'A leitura em comunidade Ã© igualmente importante. A leitura pÃºblica da Palavra (1 Tm 4:13) era prÃ¡tica da Igreja primitiva. Grupos pequenos que se reÃºnem para estudar a Escritura crescem na fÃ© de modo orgÃ¢nico e edificam-se mutuamente.'
    ],
    versicosChave: ['Salmos 119:105', '2 TimÃ³teo 3:16-17', 'JosuÃ© 1:8', 'Hebreus 4:12', 'JoÃ£o 17:17'],
    tags: ['leitura bÃ­blica', 'meditaÃ§Ã£o', 'Palavra', 'devocional', 'estudo', 'santificaÃ§Ã£o'],
    fontes: ['D. Martyn Lloyd-Jones, Studies in the Sermon on the Mount', 'John Stott, Between Two Worlds', 'Howard Hendricks, Living by the Book']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // LOUVOR E ADORAÃ‡ÃƒO (2 estudos)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'lov-001',
    titulo: 'A Natureza da AdoraÃ§Ã£o â€” EspÃ­rito e Verdade',
    categoria: 'Vida CristÃ£',
    subcategoria: 'AdoraÃ§Ã£o',
    conteudo: [
      'Jesus definiu a adoraÃ§Ã£o autÃªntica: "Ã‰ necessÃ¡rio adorar o Pai em espÃ­rito e em verdade" (Jo 4:23). A adoraÃ§Ã£o nÃ£o se limita a um lugar (SiÃ£o, Gerizim) ou forma exterior; Ã© questÃ£o do coraÃ§Ã£o, movido pelo EspÃ­rito.',
      'A adoraÃ§Ã£o Ã© resposta Ã  revelaÃ§Ã£o de Deus. Quando contemplamos Quem Ele Ã© â€” santo, soberano, gracioso, fiel â€” nosso coraÃ§Ã£o explode em louvor. A adoraÃ§Ã£o Ã© obra do EspÃ­rito Santo, que nos capacita a reconhecer e exaltar a Deus.',
      'Os elementos da adoraÃ§Ã£o cristÃ£: louvor (por quem Deus Ã©), aÃ§Ã£o de graÃ§as (pelo que Ele fez), confissÃ£o (pelo que somos), confissÃ£o de fÃ© (no que cremos), entrega (de nÃ³s mesmos). A liturgia celestial em Apocalipse 4-5 Ã© o modelo eterno.',
      'A mÃºsica Ã© meio privilegiado, mas nÃ£o exclusivo. CÃ¢nticos, hinos, salmos (Cl 3:16) servem para ensinar, exortar e edificar. A mÃºsica litÃºrgica deve ser teologicamente sÃ³lida, emocionalmente sincera e congregacionalmente acessÃ­vel.',
      'A adoraÃ§Ã£o Ã© tambÃ©m serviÃ§o e vida. "Adorar" em grego (proskuneo) significa prostrar-se. A vida inteira Ã© ato de adoraÃ§Ã£o quando oferecida a Deus (Rm 12:1). O culto dominical e a vida cotidiana se integram na adoraÃ§Ã£o cristÃ£.'
    ],
    versicosChave: ['JoÃ£o 4:23-24', 'Apocalipse 4:11', 'Colossenses 3:16', 'Salmos 95:6', 'Romanos 12:1'],
    tags: ['adoraÃ§Ã£o', 'espÃ­rito', 'verdade', 'louvor', 'mÃºsica', 'liturgia'],
    fontes: ['John Piper, Desiring God', 'Matt Redman, The Unquenchable Worshipper', 'Harold Best, Music Through the Eyes of Faith']
  },
  {
    id: 'lov-002',
    titulo: 'A MÃºsica na Igreja â€” CÃ¢nticos, Hinos e Salmos',
    categoria: 'Vida CristÃ£',
    subcategoria: 'AdoraÃ§Ã£o',
    conteudo: [
      'A mÃºsica tem papel central na adoraÃ§Ã£o cristÃ£. Paulo exorta: "Ensinando e exortando uns aos outros com salmos, hinos e cÃ¢nticos espirituais" (Cl 3:16). A mÃºsica Ã© veÃ­culo de ensino, expressÃ£o emocional e edificaÃ§Ã£o comunitÃ¡ria.',
      'A mÃºsica congregacional Ã© diferente da mÃºsica de concerto. O objetivo nÃ£o Ã© exibiÃ§Ã£o, mas participaÃ§Ã£o. Os reformadores valorizavam cÃ¢nticos cantados por toda a congregaÃ§Ã£o, em contraste com a mÃºsica apenas clerical da Idade MÃ©dia.',
      'Os critÃ©rios para a mÃºsica na Igreja: 1) Fidelidade teolÃ³gica ao texto bÃ­blico; 2) Melodia que honre a Deus, nÃ£o o ego; 3) Acessibilidade congregacional; 4) EquilÃ­brio entre tradiÃ§Ã£o e contemporaneidade; 5) EdificaÃ§Ã£o, nÃ£o entretenimento.',
      'A histÃ³ria da mÃºsica cristÃ£ Ã© rica: dos salmos hebreus aos hinos gregos, dos cÃ¢nticos monÃ¡sticos aos hinos da Reforma, dos spirituals ao gospel, do hino evangelical ao worship contemporÃ¢neo. Cada Ã©poca expressou a fÃ© em sua linguagem musical.',
      'O equilÃ­brio entre tradiÃ§Ã£o e inovaÃ§Ã£o Ã© saudÃ¡vel. A mÃºsica litÃºrgica tem continuidade histÃ³rica que ancora a fÃ©; a mÃºsica contemporÃ¢nea traz vitalidade e renovaÃ§Ã£o. As Igrejas maduras cultivam ambas, evitando o extremismo da novidade absoluta ou da tradiÃ§Ã£o paralisante.'
    ],
    versicosChave: ['Colossenses 3:16', 'EfÃ©sios 5:19', 'Salmos 96:1-2', 'Salmos 150:1-6', '1 CrÃ´nicas 16:23-33'],
    tags: ['mÃºsica', 'cÃ¢nticos', 'hinos', 'salmos', 'adoraÃ§Ã£o', 'congregaÃ§Ã£o'],
    fontes: ['Hughes Oliphant Old, Leading in Prayer', 'Paul Westermeyer, Te Deum', 'Donald Hustad, Jubilate!']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // MISSÃ•ES (1 estudo)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  {
    id: 'mis-001',
    titulo: 'A Grande ComissÃ£o â€” Mandato MissionÃ¡rio da Igreja',
    categoria: 'MissÃ£o e Evangelismo',
    subcategoria: 'MissÃµes',
    conteudo: [
      'A Grande ComissÃ£o Ã© o mandato final de Cristo Ã  Sua Igreja: "Ide, portanto, fazei discÃ­pulos de todas as naÃ§Ãµes, batizando-os em nome do Pai, e do Filho, e do EspÃ­rito Santo, ensinando-os a guardar todas as coisas que vos tenho ordenado" (Mt 28:19-20).',
      'A missÃ£o Ã© trinitÃ¡ria: Ã© obra do Pai que envia, do Filho que Ã© enviado, e do EspÃ­rito que capacita. A Igreja participa da missÃ£o do Deus triÃºno. A missÃ£o nÃ£o Ã© invenÃ§Ã£o humana, mas iniciativa divina.',
      'Os pilares da missÃ£o cristÃ£: 1) ProclamaÃ§Ã£o do evangelho (kerygma); 2) Ensino e discipulado (didache); 3) Batismo e incorporaÃ§Ã£o Ã  Igreja; 4) VivÃªncia da comunidade koinonia; 5) ServiÃ§o diaconal (diakonia). A missÃ£o Ã© holÃ­stica, mas centrada no evangelho.',
      'A histÃ³ria das missÃµes cristÃ£s: dos apÃ³stolos aos Pais da Igreja, dos monges irlandeses aos missionÃ¡rios da Reforma, dos pietistas alemÃ£es aos grandes missionÃ¡rios do sÃ©culo 19 (William Carey, Adoniram Judson, David Livingstone, Hudson Taylor). A fÃ© cristÃ£ Ã© intrinsecamente missionÃ¡ria.',
      'A Igreja contemporÃ¢nea enfrenta o desafio da globalizaÃ§Ã£o, do pluralismo religioso, do secularismo e da perseguiÃ§Ã£o. A Grande ComissÃ£o permanece atual: enquanto houver pessoas que nÃ£o conhecem Cristo, a missÃ£o continua. A salvaÃ§Ã£o Ã© para todos os povos, lÃ­nguas, tribos e naÃ§Ãµes (Ap 7:9).'
    ],
    versicosChave: ['Mateus 28:19-20', 'Atos 1:8', 'Romanos 10:14-15', 'Apocalipse 7:9', 'Marcos 16:15-16'],
    tags: ['missÃ£o', 'Grande ComissÃ£o', 'evangelizaÃ§Ã£o', 'discipulado', 'naÃ§Ãµes', 'globalizaÃ§Ã£o'],
    fontes: ['David Bosch, Transforming Mission', 'John Stott, The Contemporary Christian', 'Michael Green, Evangelism in the Early Church']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // 50 NOVOS ESTUDOS â€” PAULINAS, JOÃƒO, AP, AT, SISTEMÃTICA
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  // --- EPÃSTOLAS PAULINAS ---
  {
    id: 'tl-091',
    titulo: 'Romanos 6 â€” Morte e RessurreiÃ§Ã£o com Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Paulinas',
    conteudo: [
      'Romanos 6 responde Ã  objeÃ§Ã£o de que a graÃ§a abundante estimula o pecado (6:1). Paulo declara categoricamente: "De maneira nenhuma!" (6:2). A lÃ³gica Ã© inescapÃ¡vel: se morremos com Cristo, o que hÃ¡ de comum entre nÃ³s e o pecado?',
      'O batismo Ã© apresentado como participaÃ§Ã£o na morte e ressurreiÃ§Ã£o de Cristo (6:3-4). Assim como Cristo ressuscitou dos mortos pela glÃ³ria do Pai, tambÃ©m nÃ³s devemos andar em novidade de vida. O batismo Ã© sinal externo de realidade espiritual interna.',
      'A velha natureza foi crucificada (6:5-7). A uniÃ£o com Cristo na morte Ã© a base da libertaÃ§Ã£o do pecado. O crente nÃ£o Ã© mais escravo do pecado porque a sentenÃ§a de morte jÃ¡ foi cumprida em Cristo. A justificaÃ§Ã£o Ã© completa.',
      'A aplicaÃ§Ã£o prÃ¡tica: "Assim tambÃ©m vÃ³s considerai-vos mortos para o pecado, mas vivos para Deus, em Cristo Jesus" (6:11). A indicativa precede a imperativa. Quem somos em Cristo determina como devemos viver.',
      'A santificaÃ§Ã£o Ã© a entrega dos membros a Deus (6:12-19). Antigamente escravos do pecado, agora escravos da justiÃ§a. A transformaÃ§Ã£o Ã© radical: dos frutos de impureza para a santificaÃ§Ã£o. A liberdade cristÃ£ nÃ£o Ã© licenÃ§a, mas capacidade de obedecer.'
    ],
    versicosChave: ['Romanos 6:1-14', 'Romanos 6:23', 'Romanos 6:6-7'],
    tags: ['batismo', 'morte', 'ressurreiÃ§Ã£o', 'santificaÃ§Ã£o', 'graÃ§a'],
    fontes: ['Douglas Moo, Romans (NICNT)', 'John Murray, The Epistle to the Romans']
  },
  {
    id: 'tl-092',
    titulo: 'Romanos 7 â€” A Luta contra o Pecado',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Paulinas',
    conteudo: [
      'Romanos 7:1-6 estabelece a liberdade da Lei. O crente morreu para a Lei pelo corpo de Cristo, para pertencer a outro â€” ao que ressuscitou dos mortos. O fruto deve ser para a santificaÃ§Ã£o, nÃ£o para a condenaÃ§Ã£o.',
      'O versÃ­culo 7 Ã© crucial: "Acaso, pois, a lei Ã© pecado? De modo nenhum!" (7:7). A Lei Ã© santa, justa e boa. O problema nÃ£o estÃ¡ na Lei, mas no pecado que habita no ser humano. A Lei Ã© o espelho que revela a corrupÃ§Ã£o.',
      'A experiÃªncia descrita em 7:14-25 Ã© uma das mais dramÃ¡ticas da BÃ­blia. "O que faÃ§o nÃ£o Ã© o que quero, mas o que aborreÃ§o, isso pratico" (7:15). Paulo descreve a luta interna do crente entre o desejo do bem e a inclinaÃ§Ã£o para o mal.',
      'Quem fala em primeira pessoa? HÃ¡ debate: Ã© o crente antes da conversÃ£o, o crente em experiÃªncias de fracasso, ou a experiÃªncia de Israel sob a Lei. A maioria dos reformadores vÃª aqui a experiÃªncia do crente em luta.',
      'A resoluÃ§Ã£o vem no versÃ­culo 25: "GraÃ§as a Deus, por meio de Jesus Cristo, nosso Senhor!" (7:25). A vitÃ³ria nÃ£o estÃ¡ no esforÃ§o humano, mas em Cristo. Romanos 8 completa o que Romanos 7 deixa em aberto.'
    ],
    versicosChave: ['Romanos 7:7-25', 'Romanos 7:15', 'Romanos 7:24-25'],
    tags: ['Lei', 'pecado', 'luta interna', 'graÃ§a', 'vitÃ³ria'],
    fontes: ['Douglas Moo, Romans (NICNT)', 'Cranfield, Romans (ICC)']
  },
  {
    id: 'tl-093',
    titulo: 'Romanos 8 â€” A Vida no EspÃ­rito Santo',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Paulinas',
    conteudo: [
      'Romanos 8 Ã© o clÃ­max da argumentaÃ§Ã£o paulina. "Agora, pois, nenhuma condenaÃ§Ã£o hÃ¡ para os que estÃ£o em Cristo Jesus" (8:1). A justificaÃ§Ã£o de Romanos 3-5 culmina na liberdade do EspÃ­rito em Romanos 8.',
      'A lei do EspÃ­rito de vida me libertou da lei do pecado e da morte (8:2). O EspÃ­rito nÃ£o apenas perdoa, mas capacita. A Lei moral era impotente para transformar; o EspÃ­rito Ã© o poder transformador. A GraÃ§a supera a Lei em eficÃ¡cia.',
      'A incarnaÃ§Ã£o Ã© base da salvaÃ§Ã£o: "Deus, enviando o seu Filho em semelhanÃ§a de carne de pecado" (8:3). O que a Lei nÃ£o pÃ´de, Deus fez: condenou o pecado na carne de Cristo. A justiÃ§a da Lei se cumpre em nÃ³s que andamos segundo o EspÃ­rito (8:4).',
      'A identidade dos filhos de Deus: "Todos os que sÃ£o guiados pelo EspÃ­rito de Deus sÃ£o filhos de Deus" (8:14). O EspÃ­rito testemunha ao nosso espÃ­rito de que somos filhos (8:16). A adoÃ§Ã£o Ã© realidade presente, com expectativa futura (8:23).',
      'A segura esperanÃ§a: "Nem a morte, nem a vida... nos poderÃ£o separar do amor de Deus" (8:38-39). A seguranÃ§a do crente nÃ£o estÃ¡ na sua firmeza, mas no amor invencÃ­vel de Deus. A perseveranÃ§a dos santos Ã© fundamentada na soberania divina.'
    ],
    versicosChave: ['Romanos 8:1-2', 'Romanos 8:14-17', 'Romanos 8:28-30', 'Romanos 8:38-39'],
    tags: ['EspÃ­rito Santo', 'liberdade', 'filiaÃ§Ã£o', 'seguranÃ§a', 'amor de Deus'],
    fontes: ['Douglas Moo, Romans (NICNT)', 'John Stott, Romans (TNTC)']
  },
  {
    id: 'tl-094',
    titulo: '1 CorÃ­ntios 12 â€” Dons Espirituais e o Corpo',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Paulinas',
    conteudo: [
      '1 CorÃ­ntios 12 aborda a diversidade de dons espirituais na Igreja. "HÃ¡ diversidade de dons, mas o EspÃ­rito Ã© o mesmo" (12:4). A unidade do EspÃ­rito Ã© a base da diversidade de dons. NÃ£o hÃ¡ cristÃ£o sem dons.',
      'Os dons sÃ£o distribuÃ­dos "a cada um, como ele quer" (12:11). A soberania do EspÃ­rito na distribuiÃ§Ã£o Ã© absoluta. NÃ£o podemos exigir determinado don nem desprezar o de outro. Cada don Ã© necessÃ¡rio para o funcionamento do corpo.',
      'A analogia do corpo (12:12-27) Ã© brilhante. O corpo tem membros diferentes com funÃ§Ãµes diferentes. O olho nÃ£o pode dizer Ã  mÃ£o: "NÃ£o te preciso". Os membros mais humildes sÃ£o necessÃ¡rios. A honra mÃºtua Ã©mandamento.',
      'Os dons mencionados: palavra de sabedoria, palavra de conhecimento, fÃ©, curas, milagres, profecia, discernimento de espÃ­ritos, variedade de lÃ­nguas, interpretaÃ§Ã£o de lÃ­nguas (12:8-10). A lista nÃ£o Ã© exaustiva.',
      'O critÃ©rio supremo dos dons Ã© a edificaÃ§Ã£o da Igreja (12:7, 14:12, 26). Os dons nÃ£o sÃ£o para exibiÃ§Ã£o pessoal, mas para construÃ§Ã£o comunitÃ¡ria. A love chapter (13) interrompe a discussÃ£o para lembrar: sem amor, os dons sÃ£o inÃºteis.'
    ],
    versicosChave: ['1 CorÃ­ntios 12:4-11', '1 CorÃ­ntios 12:12-27', '1 CorÃ­ntios 12:31'],
    tags: ['dons espirituais', 'corpo de Cristo', 'diversidade', 'edificaÃ§Ã£o'],
    fontes: ['Anthony Thiselton, 1 Corinthians', 'Gordon Fee, 1 Corinthians']
  },
  {
    id: 'tl-095',
    titulo: '1 CorÃ­ntios 13 â€” O Amor Superior',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Paulinas',
    conteudo: [
      '1 CorÃ­ntios 13 Ã© o "hino do amor", interrompendo a discussÃ£o sobre dons espirituais. Paulo estabelece que o amor Ã© o critÃ©rio supremo da vida cristÃ£. Sem amor, os dons sÃ£o "bronze que soa, ou sino que tine" (13:1).',
      'As qualidades negativas do amor: nÃ£o Ã© invejoso, nÃ£o se vangloria, nÃ£o se ensoberbece, nÃ£o procede com indecÃªncia, nÃ£o busca seus interesses, nÃ£o se ira facilmente, nÃ£o guarda rancor (13:4-5). O amor Ã© descrito mais pelo que nÃ£o faz do que pelo que faz.',
      'As qualidades positivas: "se alegra com a verdade, tudo sofre, tudo crÃª, tudo espera, tudo suporta" (13:6-7). O amor Ã© ativo, nÃ£o passivo. Ã‰ virtude que se expressa em aÃ§Ã£o, nÃ£o apenas sentimento.',
      'A superioridade do amor sobre os dons: "Agora, pois, permanecem a fÃ©, a esperanÃ§a e o amor, estes trÃªs, mas o maior destes Ã© o amor" (13:13). A fÃ© darÃ¡ lugar Ã  visÃ£o; a esperanÃ§a Ã  posse; o amor permanece para sempre.',
      'O "amor" grego aqui Ã© agape â€” amor sacrificial, incondicional, divino. NÃ£o Ã© eros (romÃ¢ntico), philia (amizade) ou storge (afeto familiar). Ã‰ o amor de Deus manifestado em Cristo, que se expressa na vida do crente pelo EspÃ­rito.'
    ],
    versicosChave: ['1 CorÃ­ntios 13:1-13', '1 CorÃ­ntios 13:4-7', '1 CorÃ­ntios 13:13'],
    tags: ['amor', 'agape', 'dons espirituais', 'edificaÃ§Ã£o', 'eternidade'],
    fontes: ['Anthony Thiselton, 1 Corinthians', 'Anders Nygren, Agape and Eros']
  },
  {
    id: 'tl-096',
    titulo: '1 CorÃ­ntios 15 â€” A RessurreiÃ§Ã£o dos Mortos',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Paulinas',
    conteudo: [
      '1 CorÃ­ntios 15 Ã© o mais extenso trecho neotestamentÃ¡rio sobre a ressurreiÃ§Ã£o. Paulo transmite o que recebeu: "Cristo morreu pelos nossos pecados, foi sepultado e ressuscitou no terceiro dia" (15:3-4). Ã‰ tradiÃ§Ã£o apostÃ³lica, nÃ£o invenÃ§Ã£o.',
      'As testemunhas da ressurreiÃ§Ã£o sÃ£o mÃºltiplas (15:5-8): Pedro, os doze, mais de 500 irmÃ£os de uma vez, Tiago, todos os apÃ³stolos. Paulo mesmo Ã© testemunha: "Por Ãºltimo, apareceu tambÃ©m a mim" (15:8). O testemunho Ã© pÃºblico e verificÃ¡vel.',
      'A ressurreiÃ§Ã£o Ã© fundamento da fÃ© (15:14, 17): "Se Cristo nÃ£o ressuscitou, vÃ£ Ã© a nossa pregaÃ§Ã£o, e vÃ£ Ã© a vossa fÃ©". Sem ressurreiÃ§Ã£o, nÃ£o hÃ¡ salvaÃ§Ã£o, nÃ£o hÃ¡ perdÃ£o, nÃ£o hÃ¡ esperanÃ§a. A fÃ© cristÃ£ Ã© histÃ³rica e verificÃ¡vel.',
      'A natureza do corpo ressurreto (15:35-49): semente morre para nascer transformada. Corpo animal â†’ corpo espiritual. Corpo terreno â†’ corpo celestial. A continuidade e mudanÃ§a estÃ£o em tensÃ£o: o mesmo "eu" que morre ressuscita transformado.',
      'A vitÃ³ria final: "O ultimo inimigo a ser destruÃ­do Ã© a morte" (15:26). "Onde estÃ¡, Ã³ morte, a tua vitÃ³ria?" (15:55). A ressurreiÃ§Ã£o de Cristo Ã© garantia da nossa. "Assim tambÃ©m nÃ³s seremos transformados" (15:51-52).'
    ],
    versicosChave: ['1 CorÃ­ntios 15:3-8', '1 CorÃ­ntios 15:14', '1 CorÃ­ntios 15:55-57'],
    tags: ['ressurreiÃ§Ã£o', 'Cristo', 'fÃ©', 'vitÃ³ria', 'corpo'],
    fontes: ['Anthony Thiselton, 1 Corinthians', 'N.T. Wright, The Resurrection of the Son of God']
  },
  {
    id: 'tl-097',
    titulo: 'GÃ¡latas 5 â€” A Liberdade CristÃ£',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Paulinas',
    conteudo: [
      'GÃ¡latas 5 Ã© o coraÃ§Ã£o Ã©tico da carta. "Para a liberdade Cristo nos libertou" (5:1). A liberdade nÃ£o Ã© licenÃ§a, mas capacidade de servir uns aos outros pelo amor. A Lei nÃ£o Ã© caminho para a salvaÃ§Ã£o.',
      'A advertÃªncia solene: "Se vos circuncidais, Cristo de nada vos aproveitarÃ¡" (5:2-3). A volta Ã  Lei anula a graÃ§a. NÃ£o Ã© questÃ£o de rito, mas de mentalidade: buscar justiÃ§a pelas obras em vez da fÃ©.',
      'A fÃ© opera pelo amor (5:6). Nem circumcision nem incircuncisÃ£o valem algo, mas a fÃ© que se expressa em amor. A justificaÃ§Ã£o pela fÃ© nÃ£o Ã© passividade â€” Ã© atividade movida pelo amor, nÃ£o pela obediÃªncia Ã  Lei.',
      'A lista dos frutos do EspÃ­rito (5:22-23) Ã© uma das mais conhecidas: "amor, gozo, paz, longanimidade, benignidade, bondade, fÃ©, mansidÃ£o, temperanÃ§a". SÃ£o frutos â€” resultado natural da vida no EspÃ­rito, nÃ£o fruto (singular: o EspÃ­rito produz tudo isso junto).',
      'O contraste entre obras da carne e frutos do EspÃ­rito: "A carne deseja contra o EspÃ­rito, e o EspÃ­rito contra a carne" (5:17). A guerra interior Ã© real. A vitÃ³ria nÃ£o vem pela repressÃ£o, mas pela caminhada no EspÃ­rito (5:16).'
    ],
    versicosChave: ['GÃ¡latas 5:1', 'GÃ¡latas 5:6', 'GÃ¡latas 5:22-23'],
    tags: ['liberdade', 'frutos do EspÃ­rito', 'fÃ©', 'amor', 'carne'],
    fontes: ['Timothy George, Galatians (NAC)', 'F.F. Bruce, The Epistle to the Galatians']
  },
  {
    id: 'tl-098',
    titulo: 'EfÃ©sios 4 â€” A Unidade do Corpo',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Paulinas',
    conteudo: [
      'EfÃ©sios 4:1-6 estabelece o fundamento da unidade cristÃ£: "Um corpo, e um EspÃ­rito, como fostes chamados em uma sÃ³ esperanÃ§a da vossa vocaÃ§Ã£o; um Senhor, uma fÃ©, um batismo; um Deus e Pai de todos" (4:4-6). A unidade Ã© trinitÃ¡ria e objetiva.',
      'A diversidade de dons Ã© para a unidade: "Deu uns para apÃ³stolos, outros para profetas, outros para evangelistas, outros para pastores e mestres" (4:11). O propÃ³sito Ã© "aperfeiÃ§oar os santos para o desempenho do seu serviÃ§o" (4:12).',
      'A maturidade espiritual Ã© a meta: "NÃ£o mais sejamos como meninos, levados de lado a lado por todo vento de doutrina" (4:14). A Igreja madura Ã© firme na verdade, nÃ£o manipulÃ¡vel por falsos mestres.',
      'A Ã©tica da nova vida: "Despojando-vos do velho homem" e "revestindo-vos do novo" (4:22-24). A verdade remove a mentira; a honestidade substitui a fraude; a edificaÃ§Ã£o substitui a destruiÃ§Ã£o. A nova criatura se expressa em novos hÃ¡bitos.',
      'O versÃ­culo 29 Ã© regra prÃ¡tica: "Nenhuma palavra corrompida saia da vossa boca, mas somente a que for boa para edificaÃ§Ã£o". A lÃ­ngua Ã© indicador da saÃºde espiritual. O crente fala palavras de graÃ§a que constroem, nÃ£o destroem.'
    ],
    versicosChave: ['EfÃ©sios 4:1-6', 'EfÃ©sios 4:11-16', 'EfÃ©sios 4:29'],
    tags: ['unidade', 'diversidade', 'dons', 'maturidade', 'Ã©tica'],
    fontes: ['Peter O\'Brien, Ephesians', 'Harold Hoehner, Ephesians']
  },
  {
    id: 'tl-099',
    titulo: 'EfÃ©sios 6 â€” A Armadura de Deus',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Paulinas',
    conteudo: [
      'EfÃ©sios 6:10-20 apresenta a armadura de Deus como metÃ¡fora da proteÃ§Ã£o espiritual. "Estai fortes no Senhor e na forÃ§a do seu poder" (6:10). A batalha nÃ£o Ã© contra carne e sangue, mas contra potestades espirituais (6:12).',
      'As peÃ§as da armadura: cinto da verdade (6:14), couraÃ§a da justiÃ§a (6:14), escudo da fÃ© (6:16), capacete da salvaÃ§Ã£o (6:17), espÃ­rito do EspÃ­rito â€” a Palavra de Deus (6:17). Cada peÃ§a corresponde a uma verdade teolÃ³gica.',
      'A oraÃ§Ã£o Ã© complemento essencial: "Em todo tempo, orai em espÃ­rito" (6:18). A armadura nÃ£o substitui a oraÃ§Ã£o â€” a oraÃ§Ã£o Ã© o meio pelo qual a armadura Ã© eficaz. A vigilÃ¢ncia e a perseveranÃ§a na oraÃ§Ã£o sÃ£o mandamentos.',
      'O contexto militar romano Ã© evidente: o soldado equipado Ã© modelo do crente. A verdade Ã© cinto â€” dÃ¡ firmeza. A justiÃ§a Ã© couraÃ§a â€” protege o coraÃ§Ã£o. A fÃ© Ã© escudo â€” apaga as setas do maligno.',
      'A batalha espiritual nÃ£o Ã© opcional â€” Ã© realidade. "Porque a nossa luta nÃ£o Ã© contra carne e sangue, mas... contra os espÃ­ritos da maldade celestial" (6:12). A vitÃ³ria jÃ¡ foi conquistada na cruz; a Igreja aplica essa vitÃ³ria na histÃ³ria.'
    ],
    versicosChave: ['EfÃ©sios 6:10-18', 'EfÃ©sios 6:12', 'EfÃ©sios 6:17'],
    tags: ['armadura de Deus', 'batalha espiritual', 'oraÃ§Ã£o', 'verdade', 'fÃ©'],
    fontes: ['Peter O\'Brien, Ephesians', 'Clinton Arnold, Ephesians (ZECNT)']
  },
  {
    id: 'tl-100',
    titulo: 'Filipenses 2 â€” A Kenosis de Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Paulinas',
    conteudo: [
      'Filipenses 2:6-11 Ã© o hino cristolÃ³gico mais antigo da Igreja primitiva. "Sendo em forma de Deus, nÃ£o teve por usurpaÃ§Ã£o ser igual a Deus" (2:6). A prÃ©-existÃªncia de Cristo Ã© pressuposta, nÃ£o demonstrada.',
      'A kenosis (esvaziamento) Ã© voluntÃ¡rio: "Mas esvaziou a si mesmo, tomando a forma de servo" (2:7). NÃ£o Ã© privaÃ§Ã£o de atributos divinos, mas adiÃ§Ã£o de natureza humana. O Filho de Deus se tornou filho do homem para que os filhos dos homens se tornem filhos de Deus.',
      'A humilhaÃ§Ã£o Ã© progressiva: forma de Deus â†’ forma de servo â†’ semelhanÃ§a de homens â†’ obediÃªncia atÃ© a morte â†’ morte de cruz (2:7-8). A cruz era o tipo mais vergonhoso de morte. O Deus Todo-Poderoso escolheu a morte de escravo.',
      'A exaltaÃ§Ã£o Ã© igualmente progressiva: Deus o exaltou â†’ deu-lhe nome sobre todo nome â†’ toda joelho se dobre â†’ toda lÃ­ngua confesse (2:9-11). A inversÃ£o Ã© completa: do mais baixo ao mais alto. A confissÃ£o Ã© universal e forÃ§ada.',
      'A aplicaÃ§Ã£o Ã©tica: "Fazei a vossa salvaÃ§Ã£o com temor e tremor" (2:12). "Nada faÃ§ais por contenda ou vÃ£ glÃ³ria, mas, humildemente, cada um considere o outro superior a si mesmo" (2:3). O exemplo de Cristo motiva a humildade.'
    ],
    versicosChave: ['Filipenses 2:5-11', 'Filipenses 2:6-8'],
    tags: ['kenosis', 'humildade', 'exaltaÃ§Ã£o', 'Cristologia', 'hino'],
    fontes: ['Gordon Fee, Philippians', 'Moule, The Origin of Christology']
  },

  // --- EVANGELHO DE JOÃƒO ---
  {
    id: 'tl-101',
    titulo: 'JoÃ£o 1 â€” O PrÃ³logo e a EncarnaÃ§Ã£o',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelho de JoÃ£o',
    conteudo: [
      'O prÃ³logo de JoÃ£o (1:1-18) Ã© a declaraÃ§Ã£o mais elevada da divindade de Cristo no NT. "No princÃ­pio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus" (1:1). A retroaÃ§Ã£o ao GÃªnesis 1:1 Ã© intencional: Cristo estÃ¡ alÃ©m do tempo.',
      'O Verbo (Logos) Ã© conceito grego e hebraico: para os gregos, o princÃ­pio racional do universo; para os hebraicos, a Palavra criadora de Deus (Salmos 33:6). JoÃ£o baptiza ambos os conceitos em Cristo.',
      'A encarnaÃ§Ã£o Ã© o evento central: "E o Verbo se fez carne e habitou entre nÃ³s" (1:14). A palavra grega "eskÃªnÃ´sen" (tabernaculou) remete ao tabernÃ¡culo do AT â€” Deus habita no meio do Seu povo. A glÃ³ria Ã© a shekinah agora visÃ­vel em Cristo.',
      'JoÃ£o Batista Ã© testemunha: "Aquele que vem depois de mim... nÃ£o era digno de lhe desatar a correa das sandÃ¡lias" (1:27). O testemunho do Batista prepara o caminho. "Eis o Cordeiro de Deus, que tira o pecado do mundo!" (1:29).',
      'As primeiras chamadas de discÃ­pulos: "Que queres?" (1:38). "Vem e vÃª" (1:39). A fÃ© comeÃ§a com curiosidade, passa por encontro pessoal, e resulta em testemunho: "Achamos o Messias" (1:41).'
    ],
    versicosChave: ['JoÃ£o 1:1-3', 'JoÃ£o 1:14', 'JoÃ£o 1:29'],
    tags: ['Logos', 'encarnaÃ§Ã£o', 'divindade', 'tabernÃ¡culo', 'testemunho'],
    fontes: ['Craig Keener, John (HNTC)', 'Leon Morris, The Gospel of John']
  },
  {
    id: 'tl-102',
    titulo: 'JoÃ£o 3 â€” Nicodemos e o Novo Nascer',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelho de JoÃ£o',
    conteudo: [
      'A entrevista de Jesus com Nicodemos (3:1-21) Ã© uma das mais importantes do NT. Nicodemos Ã© fariseu, membro do SinÃ©drio, mestre de Israel â€” e vem de noite, talvez por timidez ou por buscar luz nas trevas.',
      '"NecessÃ¡rio Ã© nascer de novo" (3:7). A palavra grega "anÃ´then" significa tanto "de cima" quanto "de novo". A dualidade Ã© intencional: o novo nascimento Ã© divino e transformador. NÃ£o Ã© decisÃ£o humana, mas obra do EspÃ­rito.',
      'A serpente de bronze (3:14-15) Ã© tipo de Cristo: "Assim como MoisÃ©s levantou a serpente no deserto, assim Ã© necessÃ¡rio que o Filho do Homem seja levantado". A cura dos israelitas pelo olhar prefigura a salvaÃ§Ã£o pela fÃ© em Cristo.',
      'JoÃ£o 3:16 Ã© o versÃ­culo mais conhecido da BÃ­blia: "Deus amou o mundo de tal maneira que deu o seu Filho unigÃªnito". A universalidade do amor divino, a singularidade do Filho, a gratuidade da salvaÃ§Ã£o, a condition da fÃ©, a certeza da salvaÃ§Ã£o.',
      'O contraste entre luz e trevas (3:19-21): "A luz veio ao mundo, e os homens amaram mais as trevas do que a luz". O julgamento nÃ£o Ã© imposiÃ§Ã£o externa, mas resposta da liberdade humana Ã  revelaÃ§Ã£o divina.'
    ],
    versicosChave: ['JoÃ£o 3:3', 'JoÃ£o 3:16', 'JoÃ£o 3:14-15'],
    tags: ['novo nascimento', 'Nicodemos', 'salvaÃ§Ã£o', 'fÃ©', 'luz'],
    fontes: ['Craig Keener, John (HNTC)', 'D.A. Carson, The Gospel of John']
  },
  {
    id: 'tl-103',
    titulo: 'JoÃ£o 6 â€” O PÃ£o da Vida',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelho de JoÃ£o',
    conteudo: [
      'JoÃ£o 6 contÃ©m a alimentaÃ§Ã£o de 5000 (6:1-14), o caminhar sobre as Ã¡guas (6:16-21), e o discurso do PÃ£o da Vida (6:22-71). Cada seÃ§Ã£o revela a identidade de Cristo.',
      'O discurso do PÃ£o da Vida comeÃ§a com a multiplicaÃ§Ã£o: "Eu sou o pÃ£o da vida" (6:35). O manÃ¡ do deserto era tipo de Cristo. Os pais comeram e morreram; quem come deste pÃ£o viverÃ¡ eternamente.',
      'A linguagem escandalosa: "Se nÃ£o comerdes a carne do Filho do Homem e nÃ£o beberdes o seu sangue, nÃ£o tereis vida em vÃ³s mesmos" (6:53). Muitos discÃ­pulos se afastaram (6:66). Pedro responde: "Para quem iremos tu? Tu tens as palavras da vida eterna" (6:68).',
      'A eucaristia estÃ¡ em pauta? A interpretaÃ§Ã£o catÃ³lica romana vÃª referÃªncia Ã  transubstanciaÃ§Ã£o; os reformadores veem referÃªncia espiritual Ã  fÃ© em Cristo. O contexto joÃ¢nico Ã© mais teolÃ³gico que litÃºrgico.',
      'A soberania divina: "NinguÃ©m pode vir a mim, se o Pai, que me enviou, nÃ£o o trouxer" (6:44). A incapacidade humana Ã© superada pela iniciativa divina. A fÃ© Ã© dom de Deus, nÃ£o mÃ©rito humano.'
    ],
    versicosChave: ['JoÃ£o 6:35', 'JoÃ£o 6:53', 'JoÃ£o 6:68'],
    tags: ['PÃ£o da Vida', 'eucaristia', 'fÃ©', 'soberania', 'manÃ¡'],
    fontes: ['Craig Keener, John (HNTC)', 'Rudolf Schnackenburg, John (Hermeneia)']
  },
  {
    id: 'tl-104',
    titulo: 'JoÃ£o 10 â€” O Bom Pastor',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelho de JoÃ£o',
    conteudo: [
      'JoÃ£o 10 apresenta Jesus como o Bom Pastor. A metÃ¡fora pastoral Ã© rica no AT: Deus Ã© pastor de Israel (Salmos 23; Ezequiel 34). Jesus cumpre e supera a imagem.',
      '"Eu sou a porta das ovelhas" (10:7). O pastor entra pelo portÃ£o legÃ­timo; o ladrÃ£o entra por outro caminho. Jesus Ã© o Ãºnico caminho para o rebanho. Fora d\'Ele nÃ£o hÃ¡ salvaÃ§Ã£o.',
      '"Eu sou o Bom Pastor. O Bom Pastor a sua vida pÃµe pelas ovelhas" (10:11). O contraste com o assalariado: o assalariado foge do perigo, o pastor enfrenta o lobo. Jesus deu Sua vida voluntariamente (10:18).',
      'A seguranÃ§a do rebanho: "NinguÃ©m as arrebata da minha mÃ£o" (10:28). A seguranÃ§a nÃ£o Ã© no crente, mas no pastor. O Pai Ã© maior que todos; ninguÃ©m pode arrebatar das mÃ£os do Pai nem de Cristo (10:29).',
      'A declaraÃ§Ã£o de igualdade com o Pai: "Eu e o Pai somos um" (10:30). Os judeus entendem: "Tu, sendo homem, te fazes Deus" (10:33). A cristologia joÃ¢nica nÃ£o deixa espaÃ§o para meio-termo: ou Jesus Ã© Deus ou Ã© blasfemo.'
    ],
    versicosChave: ['JoÃ£o 10:11', 'JoÃ£o 10:28-29', 'JoÃ£o 10:30'],
    tags: ['Bom Pastor', 'seguranÃ§a', 'porta', 'vida', 'unidade com o Pai'],
    fontes: ['Leon Morris, The Gospel of John', 'D.A. Carson, The Gospel of John']
  },
  {
    id: 'tl-105',
    titulo: 'JoÃ£o 14-17 â€” Os Discursos de Despedida',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelho de JoÃ£o',
    conteudo: [
      'JoÃ£o 14-17 Ã© o coraÃ§Ã£o da teologia joÃ¢nica. O discurso de despedida prepara os discÃ­pulos para a ausÃªncia de Jesus. "NÃ£o se turbe o vosso coraÃ§Ã£o" (14:1). A fÃ© Ã© consolo diante da partida.',
      'Jesus Ã© o caminho, a verdade e a vida (14:6). Exclusividade cristÃ£: "NinguÃ©m vem ao Pai senÃ£o por mim". NÃ£o Ã© intolerÃ¢ncia, mas realidade: hÃ¡ um Ãºnico mediador entre Deus e os homens.',
      'A promessa do EspÃ­rito Consolador: "Outro Consolador lhes darÃ¡ o Pai, para que convosco fique eternamente" (14:16). O Paracleto Ã© quem ensina, testifica, conduz Ã  verdade, glorifica a Cristo. O EspÃ­rito Ã© continuador da obra de Cristo.',
      'O mandamento novo: "Como eu vos amei, tambÃ©m vos amei uns aos outros" (13:34). O amor cristÃ£o nÃ£o Ã© sentimentalismo, mas sacrifÃ­cio. O mundo reconhecerÃ¡ os discÃ­pulos pelo amor (13:35).',
      'A oraÃ§Ã£o sacerdotal (JoÃ£o 17) Ã© a mais longa oraÃ§Ã£o de Jesus registrada. Interessa por: si mesmo (17:1-5), pelos discÃ­pulos (17:6-19), pelos crentes futuros (17:20-26). "Para que sejam um" (17:21) Ã© o tema central.'
    ],
    versicosChave: ['JoÃ£o 14:6', 'JoÃ£o 14:16-17', 'JoÃ£o 15:12', 'JoÃ£o 17:1-26'],
    tags: ['despedida', 'Paracleto', 'EspÃ­rito Santo', 'amor', 'oraÃ§Ã£o sacerdotal'],
    fontes: ['Craig Keener, John (HNTC)', 'Rudolf Schnackenburg, John (Hermeneia)']
  },

  // --- ATOSS E APOCALIPSE ---
  {
    id: 'tl-106',
    titulo: 'Atos 2 â€” Pentecostes e o Nascimento da Igreja',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Apocalipse',
    conteudo: [
      'Atos 2 Ã© o relato de Pentecostes, o nascimento da Igreja. "Baixou do cÃ©u um som, como de um vento veemente" (2:2). Os sinais sonoros e visÃ­veis (lÃ­nguas de fogo) marcam a efusÃ£o do EspÃ­rito.',
      'A pregaÃ§Ã£o de Pedro resulta em 3000 conversiones (2:41). O tema Ã© o cumprimento da profecia: "Nos Ãºltimos dias, derramarei do meu EspÃ­rito sobre toda a carne" (2:17, citando Joel 2:28-32). O que era promessa agora Ã© realidade.',
      'A vida da comunidade primitiva: "Todos os que creram estavam juntos, e tinham tudo comum" (2:44). A comunhÃ£o, a fraÃ§Ã£o do pÃ£o, as oraÃ§Ãµes (2:42). NÃ£o era comunismo, mas generosidade voluntÃ¡ria movida pelo EspÃ­rito.',
      'O batismo: "Arrependei-vos, e cada um de vÃ³s seja batizado" (2:38). O batismo Ã© resposta ao evangelho â€” nÃ£o prÃ©-condiÃ§Ã£o para salvaÃ§Ã£o, mas obediÃªncia imediata que segue a fÃ©. 3000 almas foram batizadas.',
      'A Igreja nascente Ã© modelo para todas as Ã©pocas: ensino dos apÃ³stolos, comunhÃ£o, fracao do pao, oraÃ§Ã£o. A simplicidade e a profundidade caminham juntas. O foco Ã© Cristo ressuscitado.'
    ],
    versicosChave: ['Atos 2:1-4', 'Atos 2:38', 'Atos 2:42'],
    tags: ['Pentecostes', 'EspÃ­rito Santo', 'Igreja', 'batismo', 'comunidade'],
    fontes: ['Craig Keener, Acts (HNTC)', 'F.F. Bruce, The Book of the Acts']
  },
  {
    id: 'tl-107',
    titulo: 'Atos 7 â€” O Testemunho de EstÃªvÃ£o',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Apocalipse',
    conteudo: [
      'Atos 7 Ã© o discurso mais longo de Atos. EstÃªvÃ£o, cheio do EspÃ­rito Santo (7:55), defende-se perante o SinÃ©drio com um resumo da histÃ³ria de Israel que culmina em acusaÃ§Ã£o: "Homens de dura cerviz" (7:51).',
      'A retrospectiva histÃ³rica: AbraÃ£o (7:2-8), JosÃ© (7:9-16), MoisÃ©s (7:17-43), o tabernÃ¡culo e o templo (7:44-50). EstÃªvÃ£o mostra que Deus sempre esteve alÃ©m dos limites institucionais. "O AltÃ­ssimo nÃ£o habita em templos feitos por mÃ£os de homens" (7:48).',
      'A acusaÃ§Ã£o final: "VÃ³s, que sempre resistis ao EspÃ­rito Santo" (7:51). A resistÃªncia ao EspÃ­rito Ã© pecado de Israel. "VÃ³s entregastes e matastes os justos" (7:52). A linhagem de mÃ¡rtires vai de Abel a Cristo.',
      'A visÃ£o celestial: "Eis que vejo os cÃ©us abertos, e o Filho do Homem de pÃ© Ã  destra de Deus" (7:56). A primeira menÃ§Ã£o de Cristo Ã  destra do Pai no NT. EstÃªvÃ£o vÃª o que Pedro pregou.',
      'O primeiro mÃ¡rtir: "Senhor Jesus, recebe o meu espÃ­rito" (7:59). A semelhanÃ§a com a cruz de Jesus Ã© intencional. EstÃªvÃ£o perdoa seus assassinos (7:60). O martÃ­rio Ã© testemunho supremo.'
    ],
    versicosChave: ['Atos 7:51', 'Atos 7:55-56', 'Atos 7:59-60'],
    tags: ['EstÃªvÃ£o', 'mÃ¡rtir', 'histÃ³ria de Israel', 'templo', 'EspÃ­rito Santo'],
    fontes: ['Craig Keener, Acts (HNTC)', 'F.F. Bruce, The Book of the Acts']
  },
  {
    id: 'tl-108',
    titulo: 'Atos 10 â€” A VisÃ£o de CornÃ©lio e os Gentios',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Apocalipse',
    conteudo: [
      'Atos 10 Ã© ponto de virada na histÃ³ria da Igreja: o evangelho alcanÃ§a os gentios. CornÃ©lio, centuriÃ£o romano, justo e temeroso de Deus (10:1-2), Ã© instrumento da providÃªncia divina.',
      'A visÃ£o de Pedro: um lenÃ§ol com animais impuros e a voz: "Levanta, mata e come" (10:13). A liÃ§Ã£o nÃ£o Ã© alimentar, mas eclesiolÃ³gica: "O que Deus purificou, nÃ£o chames tu de comum" (10:15). A barreira entre judeus e gentios cai.',
      'O sermÃ£o de Pedro (10:34-43) Ã© exemplar: Cristo Ã© ungido pelo EspÃ­rito, andou fazendo o bem, morreu na cruz, ressuscitou. "Deus nÃ£o faz acepÃ§Ã£o de pessoas" (10:34). O evangelho Ã© universal.',
      'O derramamento do EspÃ­rito sobre os gentios (10:44-46) Ã© surpreendente: o EspÃ­rito antecede o batismo. A iniciativa Ã© divina, nÃ£o humana. "TambÃ©m aos gentios concedeu Deus o arrependimento para a vida" (10:45).',
      'A liÃ§Ã£o para a Igreja: a missions nÃ£o pode ser limitada por preconceitos culturais ou religiosos. O que Deus abriu, ninguÃ©m pode fechar. O evangelho Ã© para toda naÃ§Ã£o, tribo, lÃ­ngua e povo.'
    ],
    versicosChave: ['Atos 10:34-35', 'Atos 10:44-46'],
    tags: ['CornÃ©lio', 'gentios', 'universalidade', 'visÃµes', 'Pentecostes'],
    fontes: ['Craig Keener, Acts (HNTC)', 'Ben Witherington III, Acts']
  },
  {
    id: 'tl-109',
    titulo: 'Atos 13-14 â€” A Primeira Viagem MissionÃ¡ria',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Apocalipse',
    conteudo: [
      'Atos 13-14 registra a primeira viagem missionÃ¡ria de Paulo e BarnabÃ©. A Igreja em Antioquia envia, sob guia do EspÃ­rito Santo (13:2-4). A missÃ£o comeÃ§a com obediÃªncia Ã  voz do EspÃ­rito.',
      'A pregaÃ§Ã£o em PisÃ­dia de Antioquia (13:16-41) Ã© modelo de evangelismo: contexto histÃ³rico (Israel), centralidade de Cristo (ressurreiÃ§Ã£o), chamada Ã  fÃ©. "Anunciamos-vos o evangelho destas coisas que a vossos pais foram prometidas" (13:32).',
      'A oposiÃ§Ã£o surge: "Encheram-se de inveja, e blasfemaram" (13:45). A reaÃ§Ã£o ao evangelho Ã© polarizaÃ§Ã£o: alguns creem, outros rejeitam. Paulo e BarnabÃ© "sacudiram o pÃ³ dos seus pÃ©s" (13:51) â€” testemunho contra a incredulidade.',
      'O curador coxo em Listra (14:8-10) leva o povo a querer adorÃ¡-los como deuses. "Homens, por que fazeis isto? NÃ³s somos homens como vÃ³s" (14:14). A tentaÃ§Ã£o da idolatropia Ã© real. Os missionÃ¡rios recusam a glÃ³ria.',
      'A volta a Antioquia: "Relataram tudo o que Deus fizera com eles, e como abrira aos gentios a porta da fÃ©" (14:27). A Igreja aprende com a experiÃªncia missionÃ¡ria. A porta aberta Ã© oportunidade e responsabilidade.'
    ],
    versicosChave: ['Atos 13:2-3', 'Atos 13:47', 'Atos 14:27'],
    tags: ['missiones', 'Paulo', 'BarnabÃ©', 'Antioquia', 'gentios'],
    fontes: ['Craig Keener, Acts (HNTC)', 'F.F. Bruce, The Book of the Acts']
  },
  {
    id: 'tl-110',
    titulo: 'Apocalipse 1-3 â€” As Sete Cartas Ã s Igrejas',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse 1-3 apresenta Cristo glorificado e sete cartas Ã s igrejas da Ãsia Menor. A visÃ£o de Cristo (1:12-18) Ã© alicerce: "Eu sou o Primeiro e o Derradeiro, o que vive, e estive morto, eis que estou vivo por todos os sÃ©culos" (1:18).',
      'Cada carta tem estrutura: endereÃ§amento, autodescriÃ§Ã£o de Cristo, elogio, acusaÃ§Ã£o, ameaÃ§a/promoÃ§Ã£o, ouvinte vence. Cristo conhece cada igreja intimamente. NÃ£o hÃ¡ igreja perfeita â€” todas tÃªm problemas.',
      'EfÃ©sso: "Perdeste o teu primeiro amor" (2:4). A ortodoxia sem paixÃ£o Ã© espiritualidade morta. Esmirna: pobreza material mas riqueza espiritual (2:9). PÃ©rgamo: compromisso com o mundo (2:14). Tiatira: tolerÃ¢ncia ao falso profetismo (2:20).',
      'Sardes: "Tu tens o nome de que vives, e estÃ¡s morto" (3:1). A aparÃªncia sem realidade. FiladÃ©lfia: "Tiveste pouca forÃ§a" (3:8) â€” mas Cristo nÃ£o censura. A fidelidade sem poder Ã© valorizada.',
      'Laodiceia: "Nem quente nem frio" (3:15). A prosperidade material gera complacÃªncia espiritual. "Eu estou Ã  porta e bato" (3:20) â€” Cristo busca comunhÃ£o, mas a Igreja precisa abrir. A invitacao Ã© pessoal e urgente.'
    ],
    versicosChave: ['Apocalipse 1:17-18', 'Apocalipse 2-3', 'Apocalipse 3:20'],
    tags: ['sete igrejas', 'Cristo glorificado', 'fidelidade', 'juÃ­zo', 'arrependimento'],
    fontes: ['G.K. Beale, Revelation (NICNT)', 'David Aune, Revelation (WBC)']
  },
  {
    id: 'tl-111',
    titulo: 'Apocalipse 12 â€” A Mulher, o DragÃ£o e o Filho',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse 12 Ã© cenÃ¡rio central do drama apocalÃ­ptico. A mulher vestida de sol (12:1) Ã© interpretada de mÃºltiplas formas: Israel, Maria, a Igreja. A serpente dragÃ£o vermelho (12:3) Ã© SatanÃ¡s.',
      'O dragÃ£o persegue a mulher que dÃ¡ Ã  luz o macho varÃ£o (12:5). A ressurreiÃ§Ã£o de Cristo Ã© pressuposta: "O Filho foi arrebatado atÃ© Deus e ao seu trono" (12:5). A ascensÃ£o Ã© resumo da histÃ³ria.',
      'A guerra no cÃ©u: "Miguel e os seus anjos lutaram contra o dragÃ£o" (12:7). A vitÃ³ria de Miguel Ã© a vitÃ³ria de Cristo. SatanÃ¡s Ã© derrotado no cÃ©u e lanÃ§ado Ã  terra. A guerra continua na terra.',
      'A perseguiÃ§Ã£o Ã  mulher: "O dragÃ£o, irado, foi guerrear ao restante da sua semente" (12:17). Os mandamentos de Deus e o testemunho de Jesus sÃ£o marcas dos perseguidos. A fidelidade custa.',
      'A vitÃ³ria jÃ¡ foi conquistada: "Eles o venceram pelo sangue do Cordeiro" (12:11). A cruz Ã© o momento decisivo da histÃ³ria. O testemunho Ã© arma dos vencedores: falar a verdade, mesmo que custe a vida.'
    ],
    versicosChave: ['Apocalipse 12:1-11', 'Apocalipse 12:17'],
    tags: ['Mulher', 'dragÃ£o', 'Miguel', 'guerra espiritual', 'vitÃ³ria'],
    fontes: ['G.K. Beale, Revelation (NICNT)', 'David Aune, Revelation (WBC)']
  },
  {
    id: 'tl-112',
    titulo: 'Apocalipse 19-22 â€” A ConsumaÃ§Ã£o Final',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse 19 celebra a vitÃ³ria: "Aleluia! Pois o Senhor nosso Deus, o Todo-Poderoso, reina!" (19:6). As bodas do Cordeiro sÃ£o celebradas â€” Cristo e a Igreja se encontram definitivamente.',
      'A segunda vinda: "O cÃ©u se abriu, e eis um cavalo branco, e aquele que o montava se chama Fiel e Verdadeiro" (19:11). O julgamento Ã© justo. O Anti-Cristo e o falso profeta sÃ£o lanÃ§ados no lago de fogo (19:20).',
      'O milÃªnio (20:1-6) Ã© tema de debate: prÃ©-milenarismo, pÃ³s-milenarismo, amilenarismo. Cada posiÃ§Ã£o tem defensores fiÃ©is. O texto Ã© figurativo e literÃ¡rio, nÃ£o necessariamente cronolÃ³gico.',
      'O grande julgamento (20:11-15): o grande trono branco, os livros abertos, o livro da vida. "Se alguÃ©m nÃ£o foi achado escrito no livro da vida, esse foi lanÃ§ado no lago de fogo" (20:15). O julgamento Ã© individual e final.',
      'Novos cÃ©us e nova terra (21:1-22:5): "Eis que faÃ§o novas todas as coisas" (21:5). NÃ£o destruiÃ§Ã£o, mas renovaÃ§Ã£o. "Deus dwellerÃ¡ com eles, e eles serÃ£o seus povos" (21:3). NÃ£o haverÃ¡ mais morte, dor, choro. O Ã‰den restaurado e superado.'
    ],
    versicosChave: ['Apocalipse 19:11', 'Apocalipse 20:11-15', 'Apocalipse 21:1-5'],
    tags: ['consumaÃ§Ã£o', 'segunda vinda', 'milÃªnio', 'novo cÃ©u', 'nova terra'],
    fontes: ['G.K. Beale, Revelation (NICNT)', 'Robert Mounce, The Book of Revelation']
  },

  // --- TEOLOGIA DO AT ---
  {
    id: 'tl-113',
    titulo: 'ÃŠxodo 20 â€” Os Dez Mandamentos',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'Os Dez Mandamentos (ÃŠxodo 20:1-17) sÃ£o a base da alianÃ§a Sinai. "Eu sou o Senhor teu Deus, que te tirei da terra do Egito" (20:2). A graÃ§a precede a Lei â€” Deus liberta antes de ordenar.',
      'Os quatro primeiros mandamentos tratam da relaÃ§Ã£o com Deus: nÃ£o ter outros deuses, nÃ£o fazer imagens, nÃ£o tomar o nome em vÃ£o, lembrar do sÃ¡bado. A prioridade Ã© vertical: Deus primeiro.',
      'Os seis Ãºltimos tratam da relaÃ§Ã£o com o prÃ³ximo: honrar pais, nÃ£o matar, nÃ£o adulterar, nÃ£o furtar, nÃ£o calar falsos testemunhos, nÃ£o cobiÃ§ar. A Ã©tica social se funda no DecÃ¡logo.',
      'A permanÃªncia da Lei moral Ã© debate entre tradiÃ§Ãµes. Os reformadores ensinam que a Lei moral (DecÃ¡logo) permanece; as leis cerimoniais se cumprem em Cristo; as leis civis sÃ£o contextuais.',
      'O DecÃ¡logo Ã© sÃ­ntese da Ã©tica bÃ­blica. Jesus resume: "AmarÃ¡s o Senhor teu Deus de todo o teu coraÃ§Ã£o" e "amarÃ¡s o teu prÃ³ximo como a ti mesmo" (Mt 22:37-39). A Lei Ã© cumprida no amor.'
    ],
    versicosChave: ['ÃŠxodo 20:1-17', 'DeuteronÃ´mio 5:6-21'],
    tags: ['DecÃ¡logo', 'Lei moral', 'alianÃ§a', 'Ã©tica', 'SinaÃ­'],
    fontes: ['Walter Kaiser, Exodus (EBC)', 'Meredith Kline, Treaty of the Great King']
  },
  {
    id: 'tl-114',
    titulo: 'Salmos 23 â€” O Senhor Ã© o Meu Pastor',
    categoria: 'Temas por Livro',
    subcategoria: 'Salmos',
    conteudo: [
      'O Salmo 23 Ã© o mais amado e conhecido dos salmos. David, que conhece a vida pastoral, aplica-a Ã  relaÃ§Ã£o com Deus. "O Senhor Ã© o meu pastor; nada me faltarÃ¡" (23:1). A confianÃ§a Ã© absoluta.',
      'Os pastos verdes e Ã¡guas tranquilas (23:2) sÃ£o imagem de provisÃ£o e descanso. Deus supre necessidades fÃ­sicas e espirituais. "Conduz-me pelas veredas da justiÃ§a, por amor do seu nome" (23:3). A direÃ§Ã£o divina Ã© por Sua causa.',
      'O vale da sombra da morte (23:4) nÃ£o Ã© evitado â€” Ã© enfrentado. "Embora eu ande pelo vale da sombra da morte, nÃ£o temerei mal algum, porque tu estÃ¡s comigo". A presenÃ§a de Deus Ã© consolo na escuridÃ£o.',
      'A mesa preparada no meio dos inimigos (23:5) Ã© vitÃ³ria e honra. O Ã³leo que unta a cabeÃ§a Ã© unÃ§Ã£o â€” preparaÃ§Ã£o para o futuro. O cÃ¡lice transbordante Ã© abundÃ¢ncia.',
      'O Salmo termina com certeza: "Bondade e misericÃ³rdia me seguirÃ£o todos os dias da minha vida; e habitarei na casa do Senhor por longos dias" (23:6). A fidelidade divina Ã© promessa.'
    ],
    versicosChave: ['Salmos 23:1-6'],
    tags: ['pastor', 'confianÃ§a', 'proteÃ§Ã£o', 'provisÃ£o', 'fidelidade'],
    fontes: ['Derek Kidner, Psalms (TOTC)', 'C.H. Spurgeon, Treasury of David']
  },
  {
    id: 'tl-115',
    titulo: 'ProvÃ©rbios 31 â€” A Mulher Virtuosa',
    categoria: 'Temas por Livro',
    subcategoria: 'Livros PoÃ©ticos',
    conteudo: [
      'ProvÃ©rbios 31:10-31 descreve a mulher virtuosa. O acrÃ³stico (cada verso comeÃ§a com letra do alfabeto hebraico) sugere ideal poÃ©tico, nÃ£o retrato literal. "Mulher virtuosa, quem a acharÃ¡?" (31:10).',
      'A mulher virtuosa Ã© trabalhadora: compra campos (31:16), planta vinhas (31:16), prepara comida (31:15), cuida dos pobres (31:20). O trabalho nÃ£o Ã© maldiÃ§Ã£o, mas vocaÃ§Ã£o. A administraÃ§Ã£o domÃ©stica Ã© digna.',
      'A sabedoria e a bondade: "A sua boca fala com sabedoria, e na sua lÃ­ngua hÃ¡ liÃ§Ã£o de bondade" (31:26). A palavra Ã© instrumento de edificaÃ§Ã£o. O ensino materno Ã© fundamental.',
      'A fÃ© em Deus: "Engana a graÃ§a e Ã© vaidosa a formosura; mas a mulher que teme ao Senhor, essa serÃ¡ louvada" (31:30). A temor do Senhor Ã© critÃ©rio suprema. A beleza exterior perece; a beleza interior permanece.',
      'O versÃ­culo final: "Louvai-a do fruto das suas mÃ£os, e louvem-na na sua porta as suas obras" (31:31). A mulher virtuosa Ã© reconhecida pelo seu trabalho. A dignidade nÃ£o vem do papel, mas da fÃ©.'
    ],
    versicosChave: ['ProvÃ©rbios 31:10-31'],
    tags: ['mulher virtuosa', 'sabedoria', 'trabalho', 'fÃ©', 'dignidade'],
    fontes: ['Tremper Longman III, Proverbs (NICOT)', 'Bruce Waltke, Proverbs (NICOT)']
  },
  {
    id: 'tl-116',
    titulo: 'IsaÃ­as 53 â€” O Servo Sofredor',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'IsaÃ­as 53 Ã© a profecia mais clara sobre a morte substitutiva do Messias. "Quem crer na nossa pregaÃ§Ã£o?" (53:1). A incredulidade Ã© tema: a salvaÃ§Ã£o Ã© rejeitada pelos que deveriam recebÃª-la.',
      'A aparÃªncia humilde: "NÃ£o tinha formosura nem formosura que nos atraÃ­sse" (53:2). O Messias nÃ£o vem com esplendor, mas em humildade. O valor nÃ£o estÃ¡ na aparÃªncia, mas no carÃ¡ter.',
      'O sofrimento substitutivo: "Ele foi ferido pelos nossos pecados, e moido pelas nossas iniquidades" (53:5). "O castigo que nos trazia a paz caiu sobre ele" (53:5). A satisfaÃ§Ã£o vicÃ¡ria Ã© clara.',
      'A morte e sepultamento: "Foi posta a sua vida com os Ã­mpios, e com os ricos na sua morte" (53:9). A morte Ã© real â€” nÃ£o hÃ¡ docetismo. Cristo morreu como homem.',
      'A ressurreiÃ§Ã£o e justificaÃ§Ã£o: "VerÃ¡ a descendÃªncia, prolongarÃ¡ os seus dias" (53:10). "Muitos justificarÃ¡" (53:11). A ressurreiÃ§Ã£o Ã© pressuposta. O sofrimento tem fruto: a salvaÃ§Ã£o de muitos.'
    ],
    versicosChave: ['IsaÃ­as 53:3-7', 'IsaÃ­as 53:10-12'],
    tags: ['Servo sofredor', 'substituiÃ§Ã£o', 'expiaÃ§Ã£o', 'ressurreiÃ§Ã£o', 'profecia'],
    fontes: ['John Oswald, Isaiah (NICOT)', 'Brevard Childs, Isaiah (OTL)']
  },
  {
    id: 'tl-117',
    titulo: 'Daniel 7 â€” O Filho do Homem',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Daniel 7 Ã© visÃ£o apocalÃ­ptica sobre os impÃ©rios mundiais e o Reino de Deus. Os quatro animais (7:1-8) representam impÃ©rios: BabilÃ´nia, PÃ©rsia, GrÃ©cia, Roma. Todos sÃ£o destruÃ­dos pelo Reino eterno.',
      '"Veio um como Filho do Homem" (7:13). A figura messiÃ¢nica recebe domÃ­nio, glÃ³ria e reino. "Todo povo, naÃ§Ã£o e lÃ­ngua o servirÃ£o" (7:14). A universalidade do Reino.',
      '"AtÃ© que o AnciÃ£o de Dias se assentou" (7:9). O trono divino Ã© centro do julgamento. Os livros sÃ£o abertos. Os Ã­mpios sÃ£o julgados. O Filho do Homem recebe o Reino.',
      'A interpretaÃ§Ã£o cristolÃ³gica: Jesus se identifica como o Filho do Homem (Mt 26:64). A auto-denominaÃ§Ã£o Ã© messiÃ¢nica. Cristo cumpre a profecia de Daniel.',
      'Os santos do AltÃ­ssimo herdam o Reino (7:18, 27). A vitÃ³ria nÃ£o Ã© apenas messiÃ¢nica, mas solidÃ¡ria. O povo de Deus participa do Reino. A esperanÃ§a escatolÃ³gica sustenta a fidelidade presente.'
    ],
    versicosChave: ['Daniel 7:13-14', 'Daniel 7:9-12'],
    tags: ['Filho do Homem', 'AnciÃ£o de Dias', 'Reino', 'impÃ©rios', ' julgamento'],
    fontes: ['Tremper Longman III, Daniel (NICOT)', 'John Goldingay, Daniel (WBC)']
  },

  // --- SISTEMÃTICA ---
  {
    id: 'dp-061',
    titulo: 'Cristologia â€” A Pessoa de Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Cristologia',
    conteudo: [
      'A cristologia estuda quem Ã© Jesus Cristo. Ele Ã© 100% Deus e 100% humano â€” duas naturezas, uma pessoa. O ConcÃ­lio de CalcedÃ´nia (451) definiu: "Sem confusÃ£o, sem mudanÃ§a, sem divisÃ£o, sem separaÃ§Ã£o".',
      'A divindade de Cristo Ã© ensinada no NT: JoÃ£o 1:1 ("o Verbo era Deus"), Colossenses 1:16 ("todas as coisas foram criadas por ele"), Hebreus 1:3 ("imagem exata da substÃ¢ncia de Deus"), Filipenses 2:6 ("sendo em forma de Deus").',
      'A humanidade de Cristo: nasceu, comeu, chorou, dormiu, morreu. A encarnaÃ§Ã£o Ã© real â€” nÃ£o Ã© aparÃªncia. Cristo Ã© "o mediador entre Deus e os homens" (1 Tm 2:5) porque Ã© ambos.',
      'As implicaÃ§Ãµes: como Deus, seu sacrifÃ­cio tem valor infinito; como homem, pode representar a humanidade. A satisfaÃ§Ã£o vicÃ¡ria depende da plenitude de sua pessoa.',
      'A cristologia Ã© teste de fidelidade. Negar a divindade Ã© heresia (Arrius, Testemunhas de JeovÃ¡). Negar a humanidade Ã© heresia (Docetismo, Gnosticismo). A ortodoxia mantÃ©m o equilÃ­brio.'
    ],
    versicosChave: ['JoÃ£o 1:1-3', 'Colossenses 1:15-20', 'Filipenses 2:5-11', 'Hebreus 1:1-3'],
    tags: ['Cristologia', 'divindade', 'humanidade', 'CalcedÃ´nia', 'uniÃ£o hipostÃ¡tica'],
    fontes: ['Bruce Demarest, The Person and Work of Christ', 'Millard Erickson, Christology']
  },
  {
    id: 'dp-062',
    titulo: 'Pneumatologia â€” A Pessoa e Obra do EspÃ­rito Santo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Pneumatologia',
    conteudo: [
      'A pneumatologia estuda o EspÃ­rito Santo. Ele Ã© a terceira pessoa da Trindade â€” pessoa, nÃ£o forÃ§a ou influÃªncia. "O EspÃ­rito Ã© Deus" (Atos 5:3-4). A personalidade Ã© evidenciada: fala, guia, ensina, convence.',
      'As obras do EspÃ­rito: regeneraÃ§Ã£o (JoÃ£o 3:5-6), convicÃ§Ã£o do pecado (JoÃ£o 16:8), habitaÃ§Ã£o no crente (1 Co 6:19), selo da salvaÃ§Ã£o (Ef 1:13-14), dons espirituais (1 Co 12), frutos (Gl 5:22-23), intercessÃ£o (Rm 8:26).',
      'O ministÃ©rio do EspÃ­rito Ã© cristocÃªntrico: "Ele me glorificarÃ¡, porque recebe do que Ã© meu e vo-lo farÃ¡ saber" (JoÃ£o 16:14). O EspÃ­rito nÃ£o traz atenÃ§Ã£o a si mesmo, mas a Cristo.',
      'A plenitude do EspÃ­rito Ã© mandamento: "NÃ£o vos embriagueis com vinho... mas enchei-vos do EspÃ­rito" (Ef 5:18). A enche-nÃ£o Ã© experiÃªncia Ãºnica, mas andar continuado de submissÃ£o ao EspÃ­rito.',
      'O debate sobre dons: cessacionismo (dons miraculares cessaram com os apÃ³stolos) vs. continuÃ­smo (dons continuam hoje). Ambas as posiÃ§Ãµes sÃ£o defendidas por evangÃ©licos fiÃ©is.'
    ],
    versicosChave: ['JoÃ£o 14:16-17', 'Atos 5:3-4', 'EfÃ©sios 5:18', '1 CorÃ­ntios 12:4-11'],
    tags: ['EspÃ­rito Santo', 'Pneumatologia', 'regeneraÃ§Ã£o', 'dons', 'plenitude'],
    fontes: ['Gordon Fee, God\'s Empowering Presence', 'Michael Green, I Believe in the Holy Spirit']
  },
  {
    id: 'dp-063',
    titulo: 'Escatologia â€” As Ãšltimas Coisas',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A escatologia estuda as Ãºltimas coisas: morte, ressurreiÃ§Ã£o, juÃ­zo, cÃ©u, inferno, volta de Cristo, nova criaÃ§Ã£o. Cada tema Ã© ensinado no AT e NT.',
      'A volta de Cristo Ã© pessoal, visÃ­vel, inesperada e gloriosa. "Assim como o relÃ¢mpago... assim serÃ¡ a vinda do Filho do Homem" (Mt 24:27). NinguÃ©m sabe o dia nem a hora.',
      'O estado intermediÃ¡rio: os mortos em Cristo estÃ£o com o Senhor (2 Co 5:8; Fp 1:23). A separaÃ§Ã£o do corpo nÃ£o Ã© separaÃ§Ã£o de Cristo. A esperanÃ§a Ã© a ressurreiÃ§Ã£o corporal.',
      'O inferno Ã© real: "Eternamente afastados da presenÃ§a do Senhor" (2 Ts 1:9). O fogo eterno Ã© linguagem figurativa, mas a realidade Ã© terrÃ­vel. A justiÃ§a de Deus exige puniÃ§Ã£o do pecado.',
      'Novos cÃ©us e nova terra (2 Pe 3:13; Ap 21:1) sÃ£o a consumaÃ§Ã£o. NÃ£o destruiÃ§Ã£o, mas renovaÃ§Ã£o. A criaÃ§Ã£o serÃ¡ libertada da maldiÃ§Ã£o. A esperanÃ§a cristÃ£ Ã© restauraÃ§Ã£o completa de todas as coisas.'
    ],
    versicosChave: ['Mateus 24:30', '1 Tessalonicenses 4:16-17', 'Apocalipse 21:1-5'],
    tags: ['escatologia', 'volta de Cristo', 'ressurreiÃ§Ã£o', 'juÃ­zo', 'nova criaÃ§Ã£o'],
    fontes: ['G.E. Ladd, A Theology of the New Testament', 'Anthony Hoekema, The Bible and the Future']
  },
  {
    id: 'dp-064',
    titulo: 'Eclesiologia â€” A Natureza da Igreja',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A eclesiologia estuda a Igreja. A palavra grega "ekklÃ©sia" significa "assembleia convocada". A Igreja Ã© o povo de Deus convocado pela pregaÃ§Ã£o do evangelho.',
      'A Igreja invisÃ­vel (todos os crentes de todas as Ã©pocas) e visÃ­vel (comunidades locais). A distinÃ§Ã£o Ã© importante: a Igreja visÃ­vel inclui falsos crentes; a invisÃ­vel Ã© apenas os genuÃ­nos.',
      'Os marcadores da Igreja visÃ­vel (notae Ecclesiae): pregaÃ§Ã£o fiel dos sacramentos, disciplina eclesiÃ¡stica. Onde esses marcadores estÃ£o, ali estÃ¡ a Igreja.',
      'Os sacramentos/ordenanÃ§as: batismo e Ceia do Senhor. O batismo Ã© sinal de entrada na comunidade; a Ceia Ã© sinal continuado de comunhÃ£o. NÃ£o sÃ£o salvÃ­ficos por si mesmos, mas sinais da graÃ§a.',
      'A missÃ£o da Igreja: evangelismo, discipulado, adoraÃ§Ã£o, comunhÃ£o, serviÃ§o. A Igreja nÃ£o Ã© um clube para santos, mas hospital para pecadores. Sua razÃ£o de ser Ã© glorificar a Deus e fazer discÃ­pulos.'
    ],
    versicosChave: ['Mateus 16:18', 'EfÃ©sios 2:19-22', '1 Pedro 2:5'],
    tags: ['Igreja', 'eclesiologia', 'batismo', 'Ceia', 'missÃ£o'],
    fontes: ['Edmund Clowney, The Church', 'Gregg Allison, Sojourners and Strangers']
  },
  {
    id: 'dp-065',
    titulo: 'Angelologia e Demonologia',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Angelologia',
    conteudo: [
      'A angelologia estuda os anjos; a demonologia, os demÃ´nios. Os anjos sÃ£o seres espirituais criados por Deus para servi-Lo e servir ao Seu povo.',
      'Os anjos sÃ£o pessoais: tÃªm inteligÃªncia, vontade e emoÃ§Ãµes. "NÃ£o sÃ£o todos eles espÃ­ritos ministradores?" (Hb 1:14). Gabriel (Dn 8:16), Miguel (Dn 10:13), serafins (Is 6:2), querubins (Gn 3:24).',
      'SatanÃ¡s Ã© anjo caÃ­do. Sua queda Ã© descrita em IsaÃ­as 14:12-15 e Ezequiel 28:12-17. Orgulho o levou Ã  rebeliÃ£o. Ele Ã© "deus deste mundo" (2 Co 4:4), mas seu destino Ã© o lago de fogo.',
      'Os demÃ´nios sÃ£o anjos que seguiram SatanÃ¡s. Eles atuam: tentaÃ§Ã£o, acusaÃ§Ã£o, possessÃ£o, engano. A vitÃ³ria sobre eles estÃ¡ na cruz: "Despojando os principados e potestades, deu-os publicamente a triunfar" (Cl 2:15).',
      'A batalha espiritual Ã© real: "A nossa luta nÃ£o Ã© contra carne e sangue" (Ef 6:12). Mas o resultado nÃ£o Ã© duvidoso: Cristo venceu. A oraÃ§Ã£o e a Palavra sÃ£o armas. NÃ£o hÃ¡ medo, mas alerta.'
    ],
    versicosChave: ['Hebreus 1:14', 'EfÃ©sios 6:12', 'Colossenses 2:15', 'Apocalipse 12:7-9'],
    tags: ['anjos', 'demÃ´nios', 'SatanÃ¡s', 'batalha espiritual', 'vitÃ³ria'],
    fontes: ['Clarence Bass, Backgrounds to the Bible', 'William Most, The Angels']
  },
  {
    id: 'dp-066',
    titulo: 'Soteriologia â€” A Doutrina da SalvaÃ§Ã£o',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A soteriologia Ã© o estudo da salvaÃ§Ã£o. A salvaÃ§Ã£o Ã© obra de Deus, nÃ£o mÃ©rito humano. "Porque pela graÃ§a sois salvos, por meio da fÃ©" (Ef 2:8). A fÃ© e a graÃ§a sÃ£o inseparÃ¡veis.',
      'Os aspectos da salvaÃ§Ã£o: justificaÃ§Ã£o (declaraÃ§Ã£o de justiÃ§a), regeneraÃ§Ã£o (novo nascimento), adoÃ§Ã£o (filhos de Deus), santificaÃ§Ã£o (transformaÃ§Ã£o moral), glorificaÃ§Ã£o (consumaÃ§Ã£o final).',
      'A justificaÃ§Ã£o Ã© forense: Deus declara justo o crente, imputando-lhe a justiÃ§a de Cristo. "Aquele que nÃ£o conheceu pecado, por nÃ³s o fez pecado, para que nÃ³s fÃ´ssemos feitos justiÃ§a de Deus" (2 Co 5:21).',
      'A salvaÃ§Ã£o Ã© por graÃ§a porque Ã© imerecida; por fÃ© porque Ã© recebida; em Cristo porque Ã© mediada; para boas obras porque Ã© transformadora. A graÃ§a nÃ£o anula a obediÃªncia â€” a motiva.',
      'A seguranÃ§a do crente: "NinguÃ©m os arrebata da minha mÃ£o" (JoÃ£o 10:28). A perseveranÃ§a dos santos Ã© resultado da preservaÃ§Ã£o divina. A certeza nÃ£o Ã© presunÃ§Ã£o, mas confianÃ§a na promessa de Deus.'
    ],
    versicosChave: ['EfÃ©sios 2:8-9', 'Romanos 5:1', 'JoÃ£o 10:28-29'],
    tags: ['salvaÃ§Ã£o', 'justificaÃ§Ã£o', 'regeneraÃ§Ã£o', 'santificaÃ§Ã£o', 'graÃ§a'],
    fontes: ['J.I. Packer, Knowing God', 'Louis Berkhof, Systematic Theology']
  },

  // --- MAIS ESTUDOS PAULINAS E ATOS ---
  {
    id: 'tl-118',
    titulo: 'Romanos 9 â€” A Soberania de Deus na SalvaÃ§Ã£o',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Paulinas',
    conteudo: [
      'Romanos 9 Ã© uma das seÃ§Ãµes mais desafiadoras do NT. Paulo lamenta a incredulidade de Israel (9:1-3). A pergunta: Deus falhou em Suas promessas? A resposta Ã© nÃ£o.',
      'A soberania eleitoral: "NÃ£o depende do que quer, nem do que corre, mas de Deus, que tem misericÃ³rdia" (9:16). O exemplo de JacÃ³ e EsaÃº: "Amei a JacÃ³ e odiei a EsaÃº" (9:13). A escolha Ã© anterior ao mÃ©rito.',
      'O barro e o oleiro (9:20-21): "Quem Ã©s tu, Ã³ homem, para contestar com Deus?" A criatura nÃ£o pode questionar o Criador. A soberania Ã© absoluta, mas nÃ£o arbitrÃ¡ria.',
      'A justiÃ§a divina Ã© demonstrada: "Para fazer conhecidas as riquezas da sua glÃ³ria, as quais ele preparou para os misericordiosos" (9:23). A misericÃ³rdia Ã© um tesouro, nÃ£o obrigaÃ§Ã£o.',
      'A tensÃ£o entre soberania e responsabilidade humana permanece. Paulo nÃ£o resolve a tensÃ£o com lÃ³gica, mas com adoraÃ§Ã£o: "Ã“ profundidade das riquezas!" (11:33). A humildade intelectual Ã© necessÃ¡ria.'
    ],
    versicosChave: ['Romanos 9:16', 'Romanos 9:20-21', 'Romanos 9:23'],
    tags: ['soberania', 'eleiÃ§Ã£o', 'misericÃ³rdia', 'Israel', 'barro'],
    fontes: ['Douglas Moo, Romans (NICNT)', 'Thomas Schreiner, Romans (BECNT)']
  },
  {
    id: 'tl-119',
    titulo: 'Romanos 12 â€” A Vida CristÃ£ PrÃ¡tica',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Paulinas',
    conteudo: [
      'Romanos 12:1-2 Ã© a transiÃ§Ã£o da doutrina para a prÃ¡tica. "Oferecei vossos corpos em sacrifÃ­cio vivo, santo e agradÃ¡vel a Deus" (12:1). A adoraÃ§Ã£o nÃ£o Ã© apenas culto, mas vida toda dedicada.',
      'A renovaÃ§Ã£o da mente (12:2): "NÃ£o vos conformeis com este mundo, mas transformai-vos pela renovaÃ§Ã£o do vosso entendimento". A santificaÃ§Ã£o comeÃ§a com a mente.',
      'Os dons espirituais (12:6-8): "Tendo dons diferentes, segundo a graÃ§a que nos foi dada". Profecia, serviÃ§o, ensino, exortaÃ§Ã£o, liberalidade, presidÃªncia, misericÃ³rdia. Cada don Ã© necessÃ¡rio.',
      'A Ã©tica cristÃ£ prÃ¡tica: "Amai-vos uns aos outros" (12:10). "AbenÃ§oai os que vos perseguem" (12:14). "NÃ£o pagueis mal por mal" (12:17). "Se for possÃ­vel, quanto depender de vÃ³s, tende paz com todos" (12:18).',
      'O amor inimigo: "Se o teu inimigo tiver fome, dÃ¡-lhe de comer" (12:20). "NÃ£o te vingues toi mesmo" (12:19). A vinganÃ§a Ã© de Deus. O amor Ã© mais forte que o Ã³dio.'
    ],
    versicosChave: ['Romanos 12:1-2', 'Romanos 12:9-21'],
    tags: ['sacrifÃ­cio', 'renovaÃ§Ã£o', 'dons', 'amor inimigo', 'Ã©tica'],
    fontes: ['Douglas Moo, Romans (NICNT)', 'John Stott, Romans (TNTC)']
  },
  {
    id: 'tl-120',
    titulo: '1 CorÃ­ntios 11 â€” A Ceia do Senhor',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Paulinas',
    conteudo: [
      '1 CorÃ­ntios 11:17-34 trata da Ceia do Senhor. A comunidade corÃ­ntia estava dividida: os ricos comiam antes, os pobres passavam fome. ACeia era ceia de amor, nÃ£o de vergonha.',
      'A instituiÃ§Ã£o: "Isto Ã© o meu corpo, que Ã© dado por vÃ³s" (11:24). "Este Ã© o meu sangue da nova alianÃ§a, que Ã© derramado por muitos" (11:25). A linguagem Ã© simbÃ³lica, mas a realidade Ã© espiritual.',
      'O discernimento corporal: "Quem come e bebe sem discernir o corpo, come e bebe para sua prÃ³pria condenaÃ§Ã£o" (11:29). ACeia nÃ£o Ã© ritual mÃ¡gico â€” requer fÃ© e examinaÃ§Ã£o.',
      'As disciplinas: "Por isso hÃ¡ entre vÃ³s muitos enfermos e adormecidos" (11:30). A desobediÃªncia tem consequÃªncias. Mas "quando fomos julgados, somos corrigidos pelo Senhor" (11:32).',
      'A instruÃ§Ã£o prÃ¡tica: "Esperai uns pelos outros" (11:33). A Ceia Ã© ato comunitÃ¡rio, nÃ£o individual. A communhÃ£o com Cristo e entre os crentes Ã© inseparÃ¡vel.'
    ],
    versicosChave: ['1 CorÃ­ntios 11:23-26', '1 CorÃ­ntios 11:28-29'],
    tags: ['Ceia do Senhor', 'Eucaristia', 'corpo', 'sangue', 'discernimento'],
    fontes: ['Anthony Thiselton, 1 Corinthians', 'Gordon Fee, 1 Corinthians']
  },
  {
    id: 'tl-121',
    titulo: '2 CorÃ­ntios 3 â€” O ministÃ©rio do EspÃ­rito',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Paulinas',
    conteudo: [
      '2 CorÃ­ntios 3 contrasta o velho e o novo ministÃ©rio. "A letra mata, mas o EspÃ­rito vivifica" (3:6). A alianÃ§a da letra Ã© Lei; a do EspÃ­rito Ã© graÃ§a.',
      'O vÃ©u sobre MoisÃ©s (3:13-16): o vÃ©u representa a dureza de coraÃ§Ã£o de Israel. "Quando se convertem ao Senhor, o vÃ©u Ã© removido" (3:16). A conversÃ£o Ã© remoÃ§Ã£o do vÃ©u.',
      'A liberdade do EspÃ­rito: "Onde estÃ¡ o EspÃ­rito do Senhor, aÃ­ hÃ¡ liberdade" (3:17). A liberdade cristÃ£ nÃ£o Ã© anarquia, mas transformaÃ§Ã£o pelo EspÃ­rito.',
      'A transformaÃ§Ã£o progressiva: "NÃ³s todos, com o rosto descoberto, contemplamos como num espelho a glÃ³ria do Senhor, somos transformados na mesma imagem" (3:18). A santificaÃ§Ã£o Ã© visÃ­vel.',
      'O ministÃ©rio de Paulo Ã© de-letter, mas nÃ£o em letra, mas em EspÃ­rito. A competÃªncia nÃ£o vem de si mesmo, mas de Deus (3:5).'
    ],
    versicosChave: ['2 CorÃ­ntios 3:6', '2 CorÃ­ntios 3:17', '2 CorÃ­ntios 3:18'],
    tags: ['EspÃ­rito', 'letra', 'vÃ©u', 'transformaÃ§Ã£o', 'liberdade'],
    fontes: ['Frank Matera, 2 Corinthians', 'Barnett, The Epistle to the Corinthians']
  },
  {
    id: 'tl-122',
    titulo: 'EfÃ©sios 1 â€” As BÃªnÃ§Ã£os Espirituais',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Paulinas',
    conteudo: [
      'EfÃ©sios 1:3-14 Ã© uma bÃªnÃ§Ã£o (berakah) em trÃªs partes: Pai (3-6), Filho (7-12), EspÃ­rito (13-14). Cada Pessoa da Trindade Ã© mencionada.',
      'Escolhidos antes da fundaÃ§Ã£o do mundo (1:4): a eleiÃ§Ã£o Ã© prÃ©-temporal. "Para sermos santos e sem mancha" â€” a eleiÃ§Ã£o Ã© para santificaÃ§Ã£o, nÃ£o imoralidade.',
      'Redimidos pelo sangue (1:7): "Temos a redenÃ§Ã£o pelo seu sangue, o perdÃ£o dos pecados". A redenÃ§Ã£o tem preÃ§o: o sangue de Cristo. Ã‰ gratuita para nÃ³s, custou tudo a Ele.',
      'Selados com o EspÃ­rito Santo (1:13-14): o selo Ã© garantia de propriedade e preservaÃ§Ã£o. O EspÃ­rito Ã© arras (garantia) da heranÃ§a futura.',
      'O louvor da glÃ³ria da graÃ§a (1:6, 12, 14): oç›®çš„æ˜¯ louvor. A salvaÃ§Ã£o Ã© para a glÃ³ria de Deus, nÃ£o apenas para nosso benefÃ­cio.'
    ],
    versicosChave: ['EfÃ©sios 1:3-14', 'EfÃ©sios 1:4', 'EfÃ©sios 1:13-14'],
    tags: ['eleiÃ§Ã£o', 'redenÃ§Ã£o', 'selo', 'EspÃ­rito', 'graÃ§a'],
    fontes: ['Peter O\'Brien, Ephesians', 'Harold Hoehner, Ephesians']
  },
  {
    id: 'tl-123',
    titulo: 'Colossenses 1 â€” Cristo, Senhor da CriaÃ§Ã£o',
    categoria: 'Temas por Livro',
    subcategoria: 'EpÃ­stolas Paulinas',
    conteudo: [
      'Colossenses 1:15-20 Ã© o hino cristolÃ³gico mais elevado de Paulo. "Imagem do Deus invisÃ­vel, primogÃªnito de toda a criatura" (1:15). A divindade e prioridade de Cristo.',
      'Cristo criou todas as coisas (1:16-17): "Nele foram criadas todas as coisas... e Ele Ã© antes de todas as coisas, e todas as coisas nele subsistem". A criaÃ§Ã£o depende dEle.',
      'Nele habita toda a plenitude (1:19): "Pois nele foi do agrado que habitasse toda a plenitude". A totalidade da divindade estÃ¡ em Cristo.',
      'A reconciliaÃ§Ã£o cÃ³smica (1:20): "Pois foi contente reconciliar consigo todas as coisas". A redenÃ§Ã£o nÃ£o Ã© apenas humana, mas cÃ³smica. A criaÃ§Ã£o inteira serÃ¡ restaurada.',
      'Cristo Ã© a cabeÃ§a da Igreja (1:18): "Ele Ã© o princÃ­pio, o primogÃªnito dentre os mortos". A prioridade de Cristo Ã© em todas as coisas.'
    ],
    versicosChave: ['Colossenses 1:15-20', 'Colossenses 1:16-17'],
    tags: ['Cristologia', 'criaÃ§Ã£o', 'reconciliaÃ§Ã£o', 'plenitude', 'cabeÃ§a'],
    fontes: ['Gordon Fee, Colossians', 'F.F. Bruce, Colossians']
  },
  {
    id: 'tl-124',
    titulo: 'Atos 8 â€” Filipe e o Eunuco EtÃ­ope',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Apocalipse',
    conteudo: [
      'Atos 8:26-40 registra o encontro de Filipe com o eunuco etÃ­ope. Um official de Candace, rainha dos EtÃ­opes, que administrava todo o seu tesouro (8:27). A providÃªncia de Deus.',
      'O eunuco lia IsaÃ­as 53: "LevarÃ¡ Ele o nosso sofrimento?" (8:32-33). Filipe explica a Escritura: Cristo Ã© o Servo Sofredor. A evangelizaÃ§Ã£o Ã© explicaÃ§Ã£o da Escritura.',
      'A confissÃ£o de fÃ©: "Creio que Jesus Cristo Ã© o Filho de Deus" (8:37). A fÃ© Ã© confessada antes do batismo. O batismo Ã© resposta Ã  fÃ©, nÃ£o condiÃ§Ã£o para ela.',
      'O batismo no deserto (8:38-39): "Desceram ambos Ã  Ã¡gua... subiram da Ã¡gua". A imersÃ£o Ã© praticada, mas o modo nÃ£o Ã© o ponto â€” o ponto Ã© a obediÃªncia.',
      'O eunuco segue seu caminho "com alegria" (8:39). A salvaÃ§Ã£o traz alegria. Um etÃ­ope Ã© o primeiro gentio registrado a receber o evangelho â€” prefigurando a missÃ£o universal.'
    ],
    versicosChave: ['Atos 8:30-35', 'Atos 8:37', 'Atos 8:38-39'],
    tags: ['Filipe', 'eunuco', 'evangelismo', 'batismo', 'IsaÃ­as 53'],
    fontes: ['Craig Keener, Acts (HNTC)', 'F.F. Bruce, The Book of the Acts']
  },
  {
    id: 'tl-125',
    titulo: 'Atos 13 â€” Paulo e BarnabÃ© em Antioquia',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Apocalipse',
    conteudo: [
      'Atos 13:1-3 registra o chamado missionÃ¡rio. "Separai-me BarnabÃ© e Saulo para a obra a que os chamei" (13:2). A missÃ£o Ã© iniciativa divina, nÃ£o humana.',
      'A pregaÃ§Ã£o em PisÃ­dia de Antioquia (13:16-41) Ã© modelo: resumo da histÃ³ria de Israel (13:17-22), centralidade de Cristo (13:23-31), chamado Ã  fÃ© (13:38-39).',
      'A justificaÃ§Ã£o pela fÃ©: "Porque Ã© por meio dele que se anuncia o perdÃ£o dos pecados. De tudo aquilo de que a lei de MoisÃ©s nÃ£o vos pÃ´de justificar, todo aquele que crÃª Ã© justificado" (13:38-39).',
      'A rejeiÃ§Ã£o e aceitaÃ§Ã£o: "Foi necessÃ¡rio que se vos anunciasse primeiro a palavra de Deus" (13:46). Paulo e BarnabÃ© se voltam para os gentios quando os judeus rejeitam.',
      'A alegria dos discÃ­pulos: "Encheram-se de gozo e do EspÃ­rito Santo" (13:52). A rejeiÃ§Ã£o nÃ£o paralisa â€” o EspÃ­rito traz alegria mesmo na oposiÃ§Ã£o.'
    ],
    versicosChave: ['Atos 13:2-3', 'Atos 13:38-39'],
    tags: ['missÃ£o', 'justificaÃ§Ã£o', 'Paulo', 'BarnabÃ©', 'gentios'],
    fontes: ['Craig Keener, Acts (HNTC)', 'F.F. Bruce, The Book of the Acts']
  },
  {
    id: 'tl-126',
    titulo: 'Apocalipse 4-5 â€” A VisÃ£o do Trono',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse 4-5 Ã© a visÃ£o central do louvor celestial. "Sobre o trono, uma aparÃªncia de jaspe e de cornalina" (4:3). A majestade de Deus Ã© inexprimÃ­vel.',
      'Os 24 anciÃ£os (4:4): representam a totalidade do povo de Deus (12 tribos + 12 apÃ³stolos). Eles lanÃ§am suas coroas diante do trono â€” a autoridade humana se curva diante da divina.',
      'O livro com sete selos (5:1): quem Ã© digno de abri-lo? "NinguÃ©m... nem no cÃ©u, nem na terra" (5:3). A crise cÃ³smica: quem Ã© digno?',
      'O Cordeiro imolado (5:6-7): "Um cordeiro que parece ter sido morto". A chaga Ã© marca de vitÃ³ria, nÃ£o fraqueza. O Cordeiro toma o livro â€” a histÃ³ria estÃ¡ em Suas mÃ£os.',
      'O louvor universal (5:9-14): "Digno Ã©s de tomar o livro e de abrir os seus selos". Uma multidÃ£o que ninguÃ©m pode contar, de toda naÃ§Ã£o, louva o Cordeiro. A adoraÃ§Ã£o Ã© eterna.'
    ],
    versicosChave: ['Apocalipse 5:6-9', 'Apocalipse 5:13'],
    tags: ['trono', 'Cordeiro', 'louvor', 'anciÃ£os', 'selos'],
    fontes: ['G.K. Beale, Revelation (NICNT)', 'David Aune, Revelation (WBC)']
  },
  {
    id: 'tl-127',
    titulo: 'Apocalipse 13 â€” A Besta e o Falso Profeta',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse 13 apresenta duas figuras: a besta do mar (13:1-10) e a besta da terra (13:11-18). Ambas servem ao dragÃ£o (SatanÃ¡s).',
      'A besta do mar Ã© poder polÃ­tico: "Deu-lhe o dragÃ£o poder, trono e grande autoridade" (13:2). As sete cabeÃ§as sÃ£o impÃ©rios. A besta Ã© adorada (13:4). O poder polÃ­tico se torna idolÃ¡trico.',
      'A besta da terra Ã© poder religioso: "Tem dois chifres semelhantes aos de um cordeiro" (13:11). Finge ser de Deus, mas serve Ã  besta do mar. Engana pela aparÃªncia.',
      'O nÃºmero 666 (13:18): "Ã‰ o nÃºmero de um homem". Representa imperfeiÃ§Ã£o (6 em vez de 7), repetiÃ§Ã£o (trÃªs vezes), e falha humana. Ã‰ sÃ­mbolo de rebeldia contra Deus.',
      'A marca da besta (13:16-17): sem ela, ninguÃ©m pode comprar ou vender. Ã‰ controle econÃ´mico e religioso. A marca Ã© oposta ao selo de Deus em Apocalipse 7:3.'
    ],
    versicosChave: ['Apocalipse 13:1-10', 'Apocalipse 13:16-18'],
    tags: ['besta', '666', 'poder polÃ­tico', 'idolatria', 'marca'],
    fontes: ['G.K. Beale, Revelation (NICNT)', 'Robert Mounce, The Book of Revelation']
  },
  {
    id: 'tl-128',
    titulo: 'Apocalipse 19-20 â€” A VitÃ³ria e o MilÃªnio',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse 19 celebra a vitÃ³ria de Cristo. "Aleluia! Pois o Senhor nosso Deus, o Todo-Poderoso, reina!" (19:6). As bodas do Cordeiro sÃ£o o clÃ­max da histÃ³ria.',
      'A Segunda Vinda (19:11-16): Cristo vem como guerreiro. "Fiel e Verdadeiro" Ã© seu nome. "Rei dos reis e Senhor dos senhores" (19:16). A vitÃ³ria Ã© completa.',
      'O milÃªnio (20:1-6): "Reinaram com Cristo mil anos". HÃ¡ trÃªs interpretaÃ§Ãµes: prÃ©-milenarismo (Cristo vem antes), pÃ³s-milenarismo (depois), amilenarismo (Ã© perÃ­odo espiritual).',
      'O julgamento final (20:11-15): "O grande e branco trono". Livros abertos. "Se alguÃ©m nÃ£o foi achado escrito no livro da vida, esse foi lanÃ§ado no lago de fogo" (20:15).',
      'A vitÃ³ria final: SatanÃ¡s Ã© lanÃ§ado no lago de fogo (20:10). O mal Ã© destruÃ­do para sempre. Deus Ã© vitorioso em todas as suas promessas.'
    ],
    versicosChave: ['Apocalipse 19:11', 'Apocalipse 20:1-6', 'Apocalipse 20:11-15'],
    tags: ['vitÃ³ria', 'milÃªnio', 'juÃ­zo final', 'segunda vinda', 'SatanÃ¡s'],
    fontes: ['G.K. Beale, Revelation (NICNT)', 'Craig Blaising, Progressive Dispensationalism']
  },
  {
    id: 'dp-067',
    titulo: 'Estudos por Livro â€” Romanos',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e EpÃ­stolas',
    conteudo: [
      'Romanos Ã© a carta mais sistemÃ¡tica de Paulo. Temas: justificaÃ§Ã£o, graÃ§a, santificaÃ§Ã£o, soberania de Deus, Israel, vida no EspÃ­rito.',
      'Estrutura: Introduction (1:1-17), CondiÃ§Ã£o humana (1:18-3:20), JustificaÃ§Ã£o (3:21-5:21), SantificaÃ§Ã£o (6-8), Soberania (9-11), PrÃ¡tica (12-16).',
      'Romanos Ã© o "evangelho segundo Paulo". Lutero o chamou de "a mais importante parte do NT". A justificaÃ§Ã£o pela fÃ© Ã© tema central.',
      'O impacto na histÃ³ria: Agostinho, Lutero, Calvino, Wesley, todos foram transformados por Romanos. A Reforma Protestante nasceu de Romanos.',
      'A relevÃ¢ncia contemporÃ¢nea: a graÃ§a nÃ£o Ã© antinomianismo, mas transformaÃ§Ã£o. A soberania de Deus nÃ£o anula a responsabilidade humana.'
    ],
    versicosChave: ['Romanos 1:17', 'Romanos 3:28', 'Romanos 8:1'],
    tags: ['Romanos', 'justificaÃ§Ã£o', 'graÃ§a', 'soberania', 'santificaÃ§Ã£o'],
    fontes: ['Douglas Moo, Romans (NICNT)', 'John Stott, Romans (TNTC)']
  },
  {
    id: 'dp-068',
    titulo: 'Teologia do Novo Testamento â€” Unidade e Diversidade',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia BÃ­blica',
    conteudo: [
      'A teologia do NT estuda os temas centrais das Escrituras. Unidade: Cristo Ã© o centro. Diversidade: Mateus, Marcos, Lucas, JoÃ£o, Paulo, Pedro, Hebreus.',
      'O Reino de Deus Ã© tema central. "O Reino de Deus estÃ¡ prÃ³ximo" (Mc 1:15). Ã‰ presente e futuro, inaugurado e consumado.',
      'A cruz Ã© o ponto central. A morte de Cristo Ã© substitutiva, redentora e exemplar. O NT nÃ£o pode ser compreendido sem a cruz.',
      'A ressurreiÃ§Ã£o Ã© o fundamento da fÃ©. "Se Cristo nÃ£o ressuscitou, vÃ£ Ã© a nossa pregaÃ§Ã£o" (1 Co 15:14). A ressurreiÃ§Ã£o Ã© realidade histÃ³rica.',
      'A missÃ£o Ã© consequÃªncia natural. A Grande ComissÃ£o (Mt 28:19-20) Ã© o mandamento final. O evangelho Ã© para todas as naÃ§Ãµes.'
    ],
    versicosChave: ['Mateus 4:17', '1 CorÃ­ntios 15:3-4', 'Mateus 28:19-20'],
    tags: ['Reino', 'cruz', 'ressurreiÃ§Ã£o', 'missÃ£o', 'unidade'],
    fontes: ['G.E. Ladd, A Theology of the New Testament', 'Ben Witherington III, New Testament Theology']
  },
  {
    id: 'dp-069',
    titulo: 'Teologia do Antigo Testamento â€” AlianÃ§a e Promessa',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia BÃ­blica',
    conteudo: [
      'A teologia do AT estuda os temas centrais do AT. Deus Ã© santo, justo, misericordioso e fiel. Ele se relaciona com o povo pela alianÃ§a.',
      'O tema da alianÃ§a: NoÃ©, AbraÃ£o, MoisÃ©s, Davi. Cada alianÃ§a Ã© progressiva, preparando para a nova alianÃ§a em Cristo.',
      'A promessa messiÃ¢nica percorre o AT: GÃªnesis 3:15 (semente da mulher), 2 Samuel 7 (filho de Davi), IsaÃ­as 53 (Servo Sofredor), Daniel 7 (Filho do Homem).',
      'A santidade de Deus Ã© tema central. "Santos, porque eu sou santo" (Lv 19:2). A santidade Ã© o carÃ¡ter de Deus que permeia toda a Escritura.',
      'O AT nÃ£o Ã© "Antigo Testamento" em sentido negativo, mas o fundamento do novo. Cristo cumpre, nÃ£o anula, o AT.'
    ],
    versicosChave: ['GÃªnesis 12:1-3', 'Jeremias 31:31-34', 'IsaÃ­as 53'],
    tags: ['alianÃ§a', 'promessa', 'messias', 'santidade', 'cumprimento'],
    fontes: ['O. Palmer Robertson, The Christ of the Covenants', 'Walter Kaiser, Toward an Old Testament Theology']
  },
  {
    id: 'dp-070',
    titulo: 'Ã‰tica CristÃ£ â€” PrincÃ­pios Fundamentais',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ã‰tica',
    conteudo: [
      'A Ã©tica cristÃ£ Ã© baseada no carÃ¡ter de Deus e na Escritura. "Sede santos, porque eu sou santo" (1 Pd 1:16). A Ã©tica Ã© resposta Ã  graÃ§a.',
      'Os princÃ­pios: amor a Deus e ao prÃ³ximo (Mt 22:37-40), justiÃ§a (Am 5:24), misericÃ³rdia (Lc 6:36), verdade (Jo 8:32), santidade (1 Pd 1:15-16).',
      'A Ã©tica nÃ£o Ã© legalismo. "A letra mata, mas o EspÃ­rito vivifica" (2 Co 3:6). A obediÃªncia Ã© fruto da graÃ§a, nÃ£o condiÃ§Ã£o para ela.',
      'Os dilemas Ã©ticos: aborto, eutanÃ¡sia, guerra, pobreza. A BÃ­blia oferece princÃ­pios, nÃ£o respostas fÃ¡ceis. O discernimento Ã© necessÃ¡rio.',
      'A Ã©tica Ã© comunitÃ¡ria. "Amai-vos uns aos outros" (Jo 13:34). A Ã©tica individualista Ã© contrÃ¡ria ao NT. A Igreja Ã© comunidade Ã©tica.'
    ],
    versicosChave: ['Mateus 22:37-40', 'Miqueias 6:8', 'Lucas 6:36'],
    tags: ['Ã©tica', 'amor', 'justiÃ§a', 'santidade', 'comunidade'],
    fontes: ['Glen Stassen, Doing Ethics', 'William Webb, Slaves, Women & Homosexuals']
  },
  {
    id: 'dp-071',
    titulo: 'Estudos por Livro â€” GÃªnesis',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'GÃªnesis Ã© o livro dos comeÃ§os: criaÃ§Ã£o, queda, promessa, alianÃ§a. "No princÃ­pio criou Deus" (1:1). A fundaÃ§Ã£o de toda a teologia bÃ­blica.',
      'A narrativa de criaÃ§Ã£o (1-2): ordem, bondade, propÃ³sito. O ser humano Ã© imagem de Deus, com dignidade e responsabilidade.',
      'A queda (3): a tentaÃ§Ã£o, a desobediÃªncia, a condenaÃ§Ã£o. A maldiÃ§Ã£o afeta tudo: relaÃ§Ã£o com Deus, com outros, com a criaÃ§Ã£o.',
      'A promessa a AbraÃ£o (12:1-3): bÃªnÃ§Ã£o, descendÃªncia, terra. A promessa Ã© universal: "Em ti serÃ£o benditas todas as famÃ­lias da terra".',
      'JosÃ© (37-50): provaÃ§Ã£o, fidelidade, provisÃ£o, restauraÃ§Ã£o. "VÃ³s pensastes mal, mas Deus o resolveu para o bem" (50:20). A providÃªncia divina.'
    ],
    versicosChave: ['GÃªnesis 1:1', 'GÃªnesis 12:1-3', 'GÃªnesis 50:20'],
    tags: ['GÃªnesis', 'criaÃ§Ã£o', 'queda', 'promessa', 'providÃªncia'],
    fontes: ['Victor Hamilton, Genesis (NICOT)', 'Walter Kaiser, Genesis (EBC)']
  },
  {
    id: 'dp-072',
    titulo: 'Estudos por Livro â€” Apocalipse',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse Ã© o livro mais discutido e menos compreendido do NT. GÃªnero: apocalÃ­ptico, profÃ©tico, epistolar. Mensagem: Cristo vence.',
      'As sete cartas (2-3): Cristo conhece e corriga as igrejas. EfÃ©so (primeiro amor), Esmirna (perseguiÃ§Ã£o), PÃ©rgamo (compromisso), Tiatira (falsos profetas), Sardes (morte), FiladÃ©lfia (fidelidade), Laodiceia (morna).',
      'As sete pragas (16): juÃ­zo sobre o mal. NÃ£o sÃ£o capricho divino, mas justiÃ§a sobre a rebeldia humana.',
      'O Cordeiro (5): o centro da adoraÃ§Ã£o celestial. A morte e ressurreiÃ§Ã£o de Cristo sÃ£o o fundamento da histÃ³ria.',
      'Nova criaÃ§Ã£o (21-22): "Eis que faÃ§o novas todas as coisas". A esperanÃ§a cristÃ£ nÃ£o Ã© fuga, mas restauraÃ§Ã£o.'
    ],
    versicosChave: ['Apocalipse 1:8', 'Apocalipse 5:6-9', 'Apocalipse 21:1-5'],
    tags: ['Apocalipse', 'sete igrejas', 'Cordeiro', 'juÃ­zo', 'nova criaÃ§Ã£o'],
    fontes: ['G.K. Beale, Revelation (NICNT)', 'Robert Mounce, The Book of Revelation']
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // 50 NOVOS ESTUDOS â€” TEOLOGOS CLASSICOS E CONTEMPORANEOS
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // CHARLES SPURGEON (8 estudos: novo-001 a novo-008)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    id: 'novo-001',
    titulo: 'Charles Spurgeon â€” A Soberania de Deus',
    categoria: 'Teologia BÃ­blica',
    subcategoria: 'TeÃ³logos ClÃ¡ssicos',
    conteudo: [
      'Charles Haddon Spurgeon (1834-1892), conhecido como o "PrÃ­ncipe dos Pregadores", dedicou grande parte de seu ministÃ©rio Ã  proclamaÃ§Ã£o da soberania absoluta de Deus. Para Spurgeon, a soberania divina nÃ£o era uma doutrina abstrata, mas a realidade mais consoladora para o crente em meio Ã s tribulaÃ§Ãµes da vida.',
      'Spurgeon entendia que Deus governa todas as coisas com perfeita sabedoria e amor, desde os eventos cÃ³smicos atÃ© os detalhes mais insignificantes da vida humana. Essa convicÃ§Ã£o o levava a dizer que nem um Ãºnico pardal caÃ­a do cÃ©u sem o conhecimento e permissÃ£o do Pai celestial.',
      'A soberania de Deus era para Spurgeon a base da seguranÃ§a do crente. Se Deus Ã© soberano sobre todas as coisas, entÃ£o o cristÃ£o pode descansar em Sua promessa de que todas as coisas cooperam para o bem dos que O amam. NÃ£o hÃ¡ acidente na vida do cristÃ£o, apenas a mÃ£o providencial de Deus.',
      'Spurgeon aplicava essa doutrina em seu prÃ³prio sofrimento, enfrentando depressÃ£o, crÃ­ticas e perseguiÃ§Ã£o com a convicÃ§Ã£o de que Deus estava no controle. Ele ensinava que a soberania de Deus nÃ£o elimina a responsabilidade humana, mas a fundamenta, pois somente um Deus soberano pode garantir que os propÃ³sitos divinos se cumpram.',
      'Para o pregador batista, reconhecer a soberania de Deus era o inÃ­cio da verdadeira adoraÃ§Ã£o. Quando o cristÃ£o compreende que Deus Ã© o Rei absoluto de toda a criaÃ§Ã£o, sua resposta natural Ã© humildade, gratidÃ£o e submissÃ£o voluntÃ¡ria aos Seus caminhos inscrutÃ¡veis.'
    ],
    versicosChave: ['EfÃ©sios 1:11', 'Romanos 9:15-16', 'Daniel 4:35', 'Salmos 115:3', 'ProvÃ©rbios 21:1'],
    tags: ['soberania de Deus', 'Spurgeon', 'ProvidÃªncia', 'providÃªncia divina', 'teologia reformada'],
    fontes: ['C.H. Spurgeon, SermÃµes (Metropolitan Tabernacle)', 'C.H. Spurgeon, Pra ying with Purpose', 'Eric Whitley, The Sovereignty of God in Spurgeon\'s Theology']
  },
  {
    id: 'novo-002',
    titulo: 'Charles Spurgeon â€” O Poder da OraÃ§Ã£o',
    categoria: 'Vida CristÃ£',
    subcategoria: 'OraÃ§Ã£o',
    conteudo: [
      'Spurgeon foi um homem de oraÃ§Ã£o incansÃ¡vel, acreditando que a comunhÃ£o com Deus era a fonte de todo o poder espiritual. Ele afirmava que a oraÃ§Ã£o nÃ£o era apenas um dever religioso, mas o meio pelo qual o cristÃ£o acessa os tesouros da graÃ§a divina.',
      'Para Spurgeon, a oraÃ§Ã£o nÃ£o muda a mente de Deus, mas Ã© o meio ordenado por Ele para que os crentes recebam as bÃªnÃ§Ã£os que Ele jÃ¡ deseja conceder. A oraÃ§Ã£o Ã© a chave que abre os depÃ³sitos celestiais, nÃ£o porque Deus precise ser convencido, mas porque Ele deseja que busquemos Sua face.',
      'O prÃ­ncipe dos pregadores insistia que a oraÃ§Ã£o deve ser feia com fÃ©, persistÃªncia e humildade. Ele ensinava que oraÃ§Ãµes superficiais produzem resultados superficiais, enquanto oraÃ§Ãµes fervorosas e especÃ­ficas movem montanhas de impossibilidades.',
      'Spurgeon testemunhou inÃºmeros milagres em resposta Ã  oraÃ§Ã£o, desde a conversÃ£o de pecadores endurecidos atÃ© a provisÃ£o financeira para seu seminÃ¡rio e orfanato. Ele contava histÃ³rias de como Deus respondia oraÃ§Ãµes especÃ­ficas de maneiras surpreendentes.',
      'A liÃ§Ã£o de Spurgeon para a Igreja contemporÃ¢nea Ã© clara: sem oraÃ§Ã£o nÃ£o hÃ¡ poder, sem poder nÃ£o hÃ¡ avivamento, sem avivamento a igreja se torna uma organizaÃ§Ã£o social destituÃ­da da unÃ§Ã£o do EspÃ­rito Santo.'
    ],
    versicosChave: ['1 Tessalonicenses 5:17', 'Tiago 5:16', 'Filipenses 4:6-7', 'Jeremias 33:3'],
    tags: ['oraÃ§Ã£o', 'Spurgeon', 'comunhÃ£o com Deus', 'fÃ©', 'unÃ§Ã£o'],
    fontes: ['C.H. Spurgeon, Pra ying with Purpose', 'C.H. Spurgeon, The Golden Book of Sprinkled Pleas', 'Arnold Dallimore, Charles H. Spurgeon']
  },
  {
    id: 'novo-003',
    titulo: 'Charles Spurgeon â€” Evangelismo e ConversÃ£o',
    categoria: 'Missiologia',
    subcategoria: 'Evangelismo',
    conteudo: [
      'Spurgeon pregou para mais de 10 milhÃµes de pessoas ao longo de sua carreira, vendo milhares de conversÃµes genuÃ­nas. Seu ministÃ©rio evangelÃ­stico era marcado pela simplicidade da mensagem e pelo poder do EspÃ­rito Santo sobre a palavra proclamada.',
      'Para Spurgeon, o evangelho era o poder de Deus para salvaÃ§Ã£o de todo aquele que crÃª. Ele nÃ£o reduzia a mensagem a fÃ³rmulas humanas, mas a proclamava como o testemunho fiel de Deus sobre Seu Filho Jesus Cristo, crucificado e ressuscitado.',
      'O pregador batista insistia que a conversÃ£o Ã© obra soberana do EspÃ­rito Santo. O homem nÃ£o pode se converter por si mesmo, mas Deus usa a pregaÃ§Ã£o da palavra como meio para regenerar os coraÃ§Ãµes. A responsabilidade humana estÃ¡ em crer, mas a capacidade de crer vem de Deus.',
      'Spurgeon era pragmÃ¡tico em seus mÃ©todos evangelÃ­sticos, utilizando tÃ©cnicas como a distribuiÃ§Ã£o de literatura, a organizaÃ§Ã£o de reuniÃµes especiais e a mobilizaÃ§Ã£o de leigos para visitaÃ§Ã£o domiciliar. Ele entendia que os meios sÃ£o importantes, mas nunca substituem a dependÃªncia do EspÃ­rito.',
      'O legado evangelÃ­stico de Spurgeon desafia a Igreja contemporÃ¢nea a recuperar a paixÃ£o pela perda das almas. Em uma era de formalismo religioso, ele clamava por uma pregaÃ§Ã£o que tocasse os coraÃ§Ãµes e conduzisse os ouvintes ao arrependimento e Ã  fÃ© em Cristo.'
    ],
    versicosChave: ['Romanos 1:16', '1 CorÃ­ntios 1:18', '2 CorÃ­ntios 5:18-20', 'JoÃ£o 3:16'],
    tags: ['evangelismo', 'conversÃ£o', 'Spurgeon', 'pregaÃ§Ã£o', 'missÃµes'],
    fontes: ['C.H. Spurgeon, SermÃµes EvangelÃ­sticos', 'Dallimore, Charles H. Spurgeon: A Biography', 'Spurgeon, The Soul Winner']
  },
  {
    id: 'novo-004',
    titulo: 'Charles Spurgeon â€” Sofrimento e Consolo Divino',
    categoria: 'Vida CristÃ£',
    subcategoria: 'Sofrimento',
    conteudo: [
      'Spurgeon conheceu o sofrimento em profundidade: enfrentou depressÃ£o crÃ´nica, perseguiÃ§Ã£o pela imprensa, o incÃªndio do Royal Surrey Garden Music Hall que matou 7 pessoas, e a perda de filhos. Seu sofrimento moldou sua teologia do consolo divino.',
      'Para Spurgeon, o sofrimento nÃ£o Ã© acidente fortuito, mas instrumento nas mÃ£os de um Deus sÃ¡bio e amoroso. Ele via o sofrimento como meio de purificaÃ§Ã£o, amadurecimento e dependÃªncia de Deus. A cruz precede a coroa.',
      'Spurgeon ensinava que Deus nÃ£o promete uma vida livre de sofrimento, mas promete estar conosco no meio dele. O Salmo 23 era sua passagem predileta: "Ainda que eu andasse pelo vale da sombra da morte, nÃ£o temeria mal algum, porque tu estÃ¡s comigo".',
      'O consolo que Spurgeon recebia de Deus o capacitava a consolar outros. Ele entendia que "a consoles com que Deus nos consolou" sÃ£o compartilhadas. O sofrimento produce empatia, compaixÃ£o e profundidade no ministÃ©rio pastoral.',
      'A teologia do sofrimento de Spurgeon Ã© um antÃ­doto contra a falsa teologia da prosperidade. Ele nunca prometeu vida fÃ¡cil, mas um Deus fiel que caminha conosco nos vales mais escuros da existÃªncia humana.'
    ],
    versicosChave: ['2 CorÃ­ntios 1:3-4', 'Romanos 8:28', 'Salmos 23:4', '1 Pedro 4:12-13', 'IsaÃ­as 41:10'],
    tags: ['sofrimento', 'consolo', 'Spurgeon', 'depressÃ£o', 'provaÃ§Ã£o'],
    fontes: ['C.H. Spurgeon, Che e Sto no Seu Vale', 'Dallimore, Charles H. Spurgeon: A Biography', 'Spurgeon, Through the Valley of the Shadow']
  },
  {
    id: 'novo-005',
    titulo: 'Charles Spurgeon â€” A GraÃ§a Sovina e Incondicional',
    categoria: 'Soteriologia',
    subcategoria: 'GraÃ§a',
    conteudo: [
      'Spurgeon era um ardoroso defensor da graÃ§a soberana, entendendo que a salvaÃ§Ã£o Ã© dom gratuito de Deus, nÃ£o merecimento humano. Ele afirmava que a graÃ§a Ã© o solo em que a fÃ© pega raiz, e que sem a graÃ§a prÃ©via o homem jamais buscaria a Deus.',
      'Para Spurgeon, a graÃ§a de Deus Ã© incondicional no sentido de que nÃ£o depende de qualificaÃ§Ãµes humanas. Deus salva nÃ£o porque o homem Ã© bom, mas porque Ele Ã© misericordioso. A graÃ§a Ã© a bondade de Deus desmerecida, imerecida e indiscriminada.',
      'O pregador batista combatia veementemente a ideia de que o homem pode se salvar por suas prÃ³prias obras ou decisÃµes. Ele ensinava que a salvaÃ§Ã£o Ã© "de Deus, por Deus e para Deus", desde o inÃ­cio atÃ© o fim. O homem Ã©ä»…ä»… um receptor passivo da graÃ§a divina.',
      'Spurgeon ilustrava a graÃ§a soberana com a histÃ³ria de sua prÃ³pria conversÃ£o, quando um pregador leigo abriu a BÃ­blia em IsaÃ­as 45:22 e proclamou: "Olhai para mim, e sereis salvos". Naquele momento, o EspÃ­rito Santo regenerou seu coraÃ§Ã£o.',
      'A teologia da graÃ§a de Spurgeon era equilibrada: a graÃ§a soberana nÃ£o elimina a responsabilidade humana, mas a fundamenta. O homem deve arrepender-se e crer, mas capacidade de fazÃª-lo vem inteiramente de Deus.'
    ],
    versicosChave: ['EfÃ©sios 2:8-9', 'Romanos 9:16', 'JoÃ£o 6:44', 'Tito 3:5', 'IsaÃ­as 45:22'],
    tags: ['graÃ§a', 'graÃ§a soberana', 'Spurgeon', 'calvinismo', 'salvaÃ§Ã£o'],
    fontes: ['C.H. Spurgeon, SermÃµes sobre a GraÃ§a de Deus', 'Iain Murray, Spurgeon v. Ryle', 'Spurgeon, Autobiography']
  },
  {
    id: 'novo-006',
    titulo: 'Charles Spurgeon â€” A Cruz de Cristo como Centro da FÃ©',
    categoria: 'Cristologia',
    subcategoria: 'Cruz',
    conteudo: [
      'Spurgeon colocava a cruz de Cristo no centro absoluto de sua pregaÃ§Ã£o e teologia. Para ele, a cruz nÃ£o era apenas um sÃ­mbolo religioso, mas o evento central da histÃ³ria humana, o ponto de virada entre perdÃ£o e condenaÃ§Ã£o.',
      'Na cruz, Spurgeon via a justiÃ§a e a misericÃ³rdia de Deus se encontrando de maneira perfeita. A justiÃ§a divina exigia puniÃ§Ã£o para o pecado; a misericÃ³rdia divina provia o substitutionÃ¡rio perfeito em seu Filho. A cruz satisfaz plenamente ambos.',
      'O pregador batista insistia que a pregaÃ§Ã£o deve ser "Cristo crucificado, e mais nada". Ele temia que a igreja de sua Ã©poca se desviasse da simplicidade do evangelho em favor de filosofias humanas e tradiÃ§Ãµes religiosas.',
      'Spurgeon via a cruz como o fundamento da adoraÃ§Ã£o, da Ã©tica cristÃ£ e da esperanÃ§a eterna. Sem a cruz, nÃ£o hÃ¡ remissÃ£o de pecados, nÃ£o hÃ¡ reconciliaÃ§Ã£o com Deus, nÃ£o hÃ¡ esperanÃ§a para o mundo perdido.',
      'O apelo de Spurgeon Ã  Igreja contemporÃ¢nea Ã© que nunca nos cansemos de proclamar a mensagem da cruz. Em uma cultura que busca relevÃ¢ncia em mÃ©todos modernos, o poder estÃ¡ na mensagem antiga da cruz de Cristo.'
    ],
    versicosChave: ['1 CorÃ­ntios 1:18-24', 'GÃ¡latas 6:14', '1 Pedro 2:24', 'Colossenses 1:20'],
    tags: ['cruz', 'cristologia', 'Spurgeon', 'substituiÃ§Ã£o', 'redenÃ§Ã£o'],
    fontes: ['C.H. Spurgeon, The Everlasting Righteousness', 'Spurgeon, SermÃµes sobre a Cruz', 'Dallimore, Spurgeon']
  },
  {
    id: 'novo-007',
    titulo: 'Charles Spurgeon â€” A Arte e a Teologia da PregaÃ§Ã£o',
    categoria: 'Teologia BÃ­blica',
    subcategoria: 'HomilÃ©tica',
    conteudo: [
      'Spurgeon Ã© considerado o maior pregador do sÃ©c. XIX, e um dos maiores de todos os tempos. Sua pregaÃ§Ã£o era marcada por clareza bÃ­blica, aplicaÃ§Ã£o prÃ¡tica e poder espiritual que convertia pecadores e edificava santos.',
      'Para Spurgeon, a pregaÃ§Ã£o eficaz dependia de trÃªs elementos: o estudo diligente do texto bÃ­blico, a unÃ§Ã£o do EspÃ­rito Santo e a paixÃ£o pelo perdido. Ele dedicava horas ao estudo, mas reconhecia que sem o EspÃ­rito a mensagem seria letra morta.',
      'O prÃ­ncipe dos pregadores era um comunicador brilhante, utilizando ilustraÃ§Ãµes do cotidiano, humor sadio e aplicaÃ§Ã£o direta. Ele se recusava a ser intelectualmente pretensioso, buscando que atÃ© o analfabeto pudesse entender a mensagem do evangelho.',
      'Spurgeon ensinava que o pregador deve ser um homem de oraÃ§Ã£o antes de ser um homem de estudo. A pregaÃ§Ã£o nasce no altar, nÃ£o na biblioteca. O pregador que nÃ£o ora, nÃ£o prega com poder.',
      'O legado homilÃ©tico de Spurgeon desafia os pregadores contemporÃ¢neos a recuperarem a paixÃ£o pela verdade bÃ­blica e a ousadia na proclamaÃ§Ã£o. Em uma era de sermÃµes terapÃªuticos, Spurgeon clamava por pregaÃ§Ã£o que confrontasse, consolasse e convertesse.'
    ],
    versicosChave: ['2 TimÃ³teo 4:2', '1 CorÃ­ntios 2:1-5', 'Romanos 10:14-17', '2 TimÃ³teo 1:7'],
    tags: ['pregaÃ§Ã£o', 'homilÃ©tica', 'Spurgeon', 'exposiÃ§Ã£o', 'ministÃ©rio pastoral'],
    fontes: ['C.H. Spurgeon, Lectures to My Students', 'Spurgeon, The Art of Illustration', 'Dallimore, Charles H. Spurgeon']
  },
  {
    id: 'novo-008',
    titulo: 'Charles Spurgeon â€” FÃ© e ConfianÃ§a em Deus',
    categoria: 'Vida CristÃ£',
    subcategoria: 'FÃ©',
    conteudo: [
      'Spurgeon foi um homem de fÃ© vibrante, que encarava os desafios da vida com a convicÃ§Ã£o de que Deus Ã© fiel em suas promessas. A fÃ© para ele nÃ£o era sentimento passageiro, mas compromisso firme com a verdade de Deus.',
      'A fÃ© de Spurgeon era alimentada pela Escritura. Ele meditava diariamente nas promessas de Deus e as aplicava Ã  sua vida com fÃ© childlike. Acreditava que Deus nunca falha em suas promessas, mesmo quando as circunstÃ¢ncias sugerem o contrÃ¡rio.',
      'Para Spurgeon, a fÃ© nÃ£o Ã© cega, mas racional e fundamentada na Palavra de Deus. Ele rejeitava tanto o fideÃ­smo irracional quanto o racionalismo frio, buscando o equilÃ­brio entre razÃ£o e revelaÃ§Ã£o.',
      'A fÃ© de Spurgeon foi provada repetidamente ao longo de sua vida, enfrentando crÃ­ticas pÃºblicas, crises financeiras e perseguiÃ§Ã£o religiosa. Em cada provaÃ§Ã£o, ele se apoiava nas promessas de Deus e testemunhava a fidelidade divina.',
      'O exemplo de Spurgeon convida o cristÃ£o contemporÃ¢neo a cultivar uma fÃ© madura e perseverante. A fÃ© nÃ£o Ã© a ausÃªncia de dÃºvidas, mas a certeza de que Deus Ã© maior que todas as nossas dÃºvidas e temenarios.'
    ],
    versicosChave: ['Hebreus 11:1', '2 CorÃ­ntios 5:7', 'Romanos 10:17', 'ProvÃ©rbios 3:5-6'],
    tags: ['fÃ©', 'confianÃ§a', 'Spurgeon', 'promessas de Deus', 'perseveranÃ§a'],
    fontes: ['C.H. Spurgeon, Faith', 'Spurgeon, According to the Promise', 'Dallimore, Charles H. Spurgeon']
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // A.W. TOZER (6 estudos: novo-009 a novo-014)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    id: 'novo-009',
    titulo: 'A.W. Tozer â€” O Conhecimento de Deus',
    categoria: 'Teologia Proper',
    subcategoria: 'Conhecimento de Deus',
    conteudo: [
      'Aiden Wilson Tozer (1897-1963) dedicou sua vida ao estudo do carÃ¡ter de Deus, acreditando que o conhecimento de Deus Ã© o fundamento de toda a vida cristÃ£. Para Tozer, conhecer a Deus nÃ£o Ã© apenas informaÃ§Ã£o teolÃ³gica, mas experiÃªncia transformadora.',
      'Tozer ensinava que o conhecimento de Deus comeÃ§a na reverÃªncia. O homem que nÃ£o teme a Deus jamais O conhecerÃ¡ verdadeiramente. A reverÃªncia Ã© a porta de entrada para o mistÃ©rio da divindade.',
      'O pastor e autor americano insistia que o conhecimento de Deus Ã© progressivo. ComeÃ§a na regeneraÃ§Ã£o, amadurece na santificaÃ§Ã£o e se aperfeiÃ§oa na glÃ³ria. Nunca chegamos ao fim do conhecimento de Deus, pois Ele Ã© infinito.',
      'Tozer alertava contra o perigo de conhecer a Deus apenas intelectualmente, sem transformaÃ§Ã£o do coraÃ§Ã£o. O verdadeiro conhecimento de Deus produz humildade, adoraÃ§Ã£o, amor e obediÃªncia.',
      'A obra mais famosa de Tozer, "O Conhecimento do Santo", Ã© um convite para a Igreja redescobrir a grandeza de Deus. Em uma era de superficialidade religiosa, Tozer clamava por um retorno ao temor do Senhor.'
    ],
    versicosChave: ['Jeremias 9:23-24', 'JoÃ£o 17:3', 'Salmos 46:10', 'Ã“seas 6:3'],
    tags: ['conhecimento de Deus', 'Tozer', 'reverÃªncia', 'carÃ¡ter divino', 'teologia'],
    fontes: ['A.W. Tozer, O Conhecimento do Santo', 'A.W. Tozer, The Pursuit of God', 'J. Israel Pacheco, Tozer on the Almighty God']
  },
  {
    id: 'novo-010',
    titulo: 'A.W. Tozer â€” A AdoraÃ§Ã£o Verdadeira',
    categoria: 'Vida CristÃ£',
    subcategoria: 'AdoraÃ§Ã£o',
    conteudo: [
      'Tozer distinguiu entre adoraÃ§Ã£o verdadeira e adoraÃ§Ã£o superficial. A adoraÃ§Ã£o verdadeira nasce do conhecimento de Deus e Ã© expressa em reverÃªncia, amor e submissÃ£o total.',
      'Para Tozer, a adoraÃ§Ã£o Ã© o fim Ãºltimo da criaÃ§Ã£o humana. O homem foi criado para adorar a Deus, e sÃ³ encontra satisfaÃ§Ã£o plena quando cumpre esse propÃ³sito. A idolatria Ã© adoraÃ§Ã£o desviada.',
      'Tozer insistia que a adoraÃ§Ã£o nÃ£o pode ser fabricada por mÃºsica, iluminaÃ§Ã£o ou clima emocional. A adoraÃ§Ã£o verdadeira nasce do coraÃ§Ã£o que conhece e teme a Deus. O meio exterior Ã© secundÃ¡rio.',
      'O pastor americano alertava contra a "adoraÃ§Ã£o commercializada", quando a igreja busca agradar os homens em vez de glorificar a Deus. A adoraÃ§Ã£o deve ser centrada em Deus, nÃ£o em experiÃªncias humanas.',
      'A teologia da adoraÃ§Ã£o de Tozer desafia a Igreja contemporÃ¢nea a perguntar: estamos adorando a Deus como Ele Ã©, ou uma imagem de nossa prÃ³pria criaÃ§Ã£o? A adoraÃ§Ã£o verdadeira exige que conhechamos a Deus como Ele se revelou.'
    ],
    versicosChave: ['JoÃ£o 4:23-24', 'Salmos 95:6-7', 'Romanos 12:1', 'IsaÃ­as 6:1-8'],
    tags: ['adoraÃ§Ã£o', 'Tozer', 'culto', 'reverÃªncia', 'espiritualidade'],
    fontes: ['A.W. Tozer, O Conhecimento do Santo', 'Tozer, Whatever Happened to Worship?', 'Reynold K. Burpee, The Tozer Devotional']
  },
  {
    id: 'novo-011',
    titulo: 'A.W. Tozer â€” A Vida Interior e a ComunhÃ£o com Deus',
    categoria: 'Vida CristÃ£',
    subcategoria: 'Vida Espiritual',
    conteudo: [
      'Tozer era um defensor fervoroso da vida interior, entendendo que o cristÃ£o maduro Ã© aquele que cultiva um relacionamento profundo e pessoal com Deus. A vida interior nÃ£o Ã© privilÃ©gio de alguns, mas dever de todos.',
      'Para Tozer, a vida interior comeÃ§a na regeneraÃ§Ã£o e se desenvolve atravÃ©s da meditaÃ§Ã£o, oraÃ§Ã£o e obediÃªncia. O crente que negligencia a vida interior se torna espiritualmente seco e vulnerÃ¡vel Ã s armadilhas do mundo.',
      'Tozer ensinava que a comunhÃ£o com Deus Ã© possÃ­vel em todos os momentos, nÃ£o apenas em reuniÃµes religiosas. A oraÃ§Ã£o Ã© conversa com Deus que permeia cada aspecto da vida cotidiana.',
      'O pastor e autor insistia que a vida interior exige disciplina e sacrifÃ­cio. NÃ£o hÃ¡ atalhos para a maturidade espiritual. O cristÃ£o deve buscar a Deus com a mesma intensidade com que o mendigo busca pÃ£o.',
      'A teologia de Tozer sobre a vida interior Ã© um chamado Ã  profundidade em uma era de superficialidade. A Igreja precisa redescobrir o valor da solidÃ£o, do silÃªncio e da meditaÃ§Ã£o na presenÃ§a de Deus.'
    ],
    versicosChave: ['Salmo 42:1-2', 'Mateus 6:6', 'Filipenses 4:8', 'Tiago 4:8'],
    tags: ['vida interior', 'comunhÃ£o', 'Tozer', 'oraÃ§Ã£o', 'maturidade espiritual'],
    fontes: ['A.W. Tozer, O Preito de Deus', 'Tozer, The Divine Conquest', 'Tozer, The Counselor']
  },
  {
    id: 'novo-012',
    titulo: 'A.W. Tozer â€” A Idolatria Moderna',
    categoria: 'Teologia BÃ­blica',
    subcategoria: 'Idolatria',
    conteudo: [
      'Tozer identificou a idolatria como o pecado mais perigoso da era moderna. Embora o homem contemporÃ¢neo nÃ£o prostre a Ã­dolos de madeira, ele cria Ã­dolos com seus desejos, ambiÃ§Ãµes e prazeres.',
      'Para Tozer, qualquer coisa que ocupe o lugar de Deus na vida do homem Ã© um Ã­dolo. O dinheiro, o sucesso, o reconhecimento, atÃ© mesmo a famÃ­lia pode se tornar Ã­dolos quando substituem a primazia de Deus.',
      'Tozer ensinava que o Ã­dolo Ã© aquilo em que o homem pensa quando pensa em Deus. Se a imagem de Deus Ã© distorcida, o homem adora uma criatura em vez do Criador.',
      'O pastor americano alertava que a idolatria Ã© sutil. Ela nÃ£o vem com rosto repulsivo, mas com mÃ¡scara de bondade. O Ã­dolo moderno Ã© sedutor porque oferece prazer imediato, mas leva Ã  escravidÃ£o.',
      'O diagnÃ³stico de Tozer sobre a idolatria moderna continua relevante. A Igreja precisa examinar seus coraÃ§Ãµes e remover tudo que usurpa o lugar que sÃ³ Deus merece.'
    ],
    versicosChave: ['1 JoÃ£o 5:21', 'Colossenses 3:5', 'Romanos 1:25', 'ÃŠxodo 20:3-4'],
    tags: ['idolatria', 'Tozer', 'deuses modernos', 'primeiro mandamento', 'coraÃ§Ã£o'],
    fontes: ['A.W. Tozer, O Preito de Deus', 'Tozer, Man: The Dwelling Place of God', 'Tozer, The Root of the Righteous']
  },
  {
    id: 'novo-013',
    titulo: 'A.W. Tozer â€” O EspÃ­rito Santo na Vida CristÃ£',
    categoria: 'Pneumatologia',
    subcategoria: 'EspÃ­rito Santo',
    conteudo: [
      'Tozer dedicou parte significativa de seu ministÃ©rio ao estudo do EspÃ­rito Santo, acreditando que a Igreja contemporÃ¢nea negligenciou a pessoa e obra do ParÃ¡clito. Para Tozer, o EspÃ­rito Santo Ã© a pessoa mais negligenciada da Trindade.',
      'Tozer ensinava que o EspÃ­rito Santo Ã© Deus, nÃ£o uma forÃ§a ou energia impessoal. Ele tem mente, vontade e emoÃ§Ãµes, e deseja habitar nos crentes de maneira plena e governante.',
      'Para Tozer, a plenitude do EspÃ­rito nÃ£o Ã© uma experiÃªncia exclusiva para alguns cristÃ£os, mas a norma para todos os crentes. A igreja que nÃ£o vive na plenitude do EspÃ­rito Ã© uma igreja impotente.',
      'O pastor americano insistia que a obra do EspÃ­rito Santo Ã© glorificar a Cristo. O EspÃ­rito nÃ£o atrai atenÃ§Ã£o para si mesmo, mas para Jesus. Uma espiritualidade centrada no EspÃ­rito Ã©, paradoxalmente, uma espiritualidade centrada em Cristo.',
      'A pneumatologia de Tozer Ã© um chamado para a Igreja redescobrir a dependÃªncia do EspÃ­rito Santo. Sem o EspÃ­rito, os melhores mÃ©todos e programas sÃ£o vaidade. Com o EspÃ­rito, atÃ© os mais simples sÃ£o transformadores.'
    ],
    versicosChave: ['JoÃ£o 14:16-17', 'Atos 1:8', 'EfÃ©sios 5:18', '1 CorÃ­ntios 12:4-11'],
    tags: ['EspÃ­rito Santo', 'Tozer', 'pneumatologia', 'plenitude', 'carismas'],
    fontes: ['A.W. Tozer, How to Be Filled with the Holy Spirit', 'Tozer, The Counselor', 'Tozer, The Upper Room']
  },
  {
    id: 'novo-014',
    titulo: 'A.W. Tozer â€” Simplicidade Espiritual',
    categoria: 'Vida CristÃ£',
    subcategoria: 'Simplicidade',
    conteudo: [
      'Tozer defendia uma vida cristÃ£ marcada pela simplicidade, contrapondo-se ao materialismo e ao consumismo que invadiu atÃ© mesmo a Igreja. Para ele, a simplicidade Ã© fruto de um coraÃ§Ã£o voltado para Deus.',
      'Para Tozer, a simplicidade nÃ£o Ã© pobreza, mas desapego. O cristÃ£o pode possuir bens sem ser possuÃ­do por eles. O problema nÃ£o Ã© ter, mas confiar no que se tem em vez de confiar em Deus.',
      'Tozer ensinava que a complexidade da vida moderna Ã© inimiga da vida espiritual. Quando o cristÃ£o estÃ¡ sobrecarregado com preocupaÃ§Ãµes, ele nÃ£o consegue ouvir a voz de Deus.',
      'O pastor americano praticava o que pregava, vivendo de maneira simples e frugal, recusando-se a receber o salÃ¡rio acima do necessÃ¡rio. Sua vida era coerente com sua mensagem.',
      'A chamada de Tozer para a simplicidade Ã© mais necessÃ¡ria do que nunca em nossa era digital. A Igreja precisa redescobrir que o verdadeiro contentamento nÃ£o estÃ¡ nas coisas, mas em Deus.'
    ],
    versicosChave: ['Mateus 6:33', '1 TimÃ³teo 6:6-8', 'Filipenses 4:11-12', 'Hebreus 13:5'],
    tags: ['simplicidade', 'Tozer', 'desapego', 'contentamento', 'materialismo'],
    fontes: ['A.W. Tozer, Man: The Dwelling Place of God', 'Tozer, The Root of the Righteous', 'Tozer, Of God and Men']
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // R.C. SPROUL (6 estudos: novo-015 a novo-020)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    id: 'novo-015',
    titulo: 'R.C. Sproul â€” A Santidade de Deus',
    categoria: 'Teologia Proper',
    subcategoria: 'Santidade',
    conteudo: [
      'R.C. Sproul (1939-2017) dedicou sua carreira a defender e ensinar a santidade de Deus como o atributo mais importante do carÃ¡ter divino. Para Sproul, a santidade de Deus Ã© o fundamento de toda a teologia cristÃ£.',
      'Sproul ensinava que a santidade de Deus significa que Ele Ã© separado de toda impureza, pecado e maldade. Deus Ã© absolutamente puro, justo e santo, e isso o torna radicalmente diferente de todas as criaturas.',
      'A santidade de Deus Ã© tema central de IsaÃ­as 6, onde os serafins proclamam "Santo, santo, santo". Sproul insistia que essa repetiÃ§Ã£o nÃ£o Ã© redundÃ¢ncia, mas Ãªnfase: Deus Ã© triplamente santo, perfeitamente santo.',
      'Para Sproul, a santidade de Deus Ã© ao mesmo tempo consoladora e aterrorizante. Consoladora porque o Deus santo Ã© tambÃ©m misericordioso; aterrorizante porque o pecado humano Ã© intolerÃ¡vel aos olhos de um Deus santo.',
      'O legado de Sproul sobre a santidade de Deus desafia a Igreja contemporÃ¢nea a redescobrir a reverÃªncia e o temor do Senhor. Em uma era de familiarity religiosa, Sproul clamava por uma recovering da transcendÃªncia divina.'
    ],
    versicosChave: ['IsaÃ­as 6:1-8', '1 Pedro 1:15-16', 'Hebreus 12:14', 'Apocalipse 4:8'],
    tags: ['santidade de Deus', 'Sproul', 'transcendÃªncia', 'reverÃªncia', 'teologia reformada'],
    fontes: ['R.C. Sproul, A Santidade de Deus', 'Sproul, The Holiness of God', 'Sproul, Everyone\'s a Theologian']
  },
  {
    id: 'novo-016',
    titulo: 'R.C. Sproul â€” A JustificaÃ§Ã£o pela FÃ©',
    categoria: 'Soteriologia',
    subcategoria: 'JustificaÃ§Ã£o',
    conteudo: [
      'Sproul foi um dos maiores defensores contemporÃ¢neos da doutrina da justificaÃ§Ã£o pela fÃ© somente. Para ele, essa doutrina Ã© o artigo pelo qual a igreja se sustenta ou cai.',
      'A justificaÃ§Ã£o, segundo Sproul, Ã© o ato jurÃ­dico de Deus pelo qual o pecador Ã© declarado justo diante de Sua lei. NÃ£o Ã© uma obra de transformaÃ§Ã£o interior (essa Ã© a regeneraÃ§Ã£o), mas uma declaraÃ§Ã£o legal de inocÃªncia.',
      'Sproul ensinava que a justificaÃ§Ã£o Ã© somente pela fÃ©, nÃ£o pelas obras humanas. A fÃ© Ã© o instrumento pelo qual recebemos a justiÃ§a de Cristo, que nos Ã© imputada por Deus. NÃ£o hÃ¡ mÃ©rito humano na justificaÃ§Ã£o.',
      'O teÃ³logo reformado insistia que a justificaÃ§Ã£o pela fÃ© Ã© inseparÃ¡vel da imputaÃ§Ã£o da justiÃ§a de Cristo. Deus nÃ£o nos declara justos porque somos justos, mas porque Cristo nos comunicou sua justiÃ§a perfeita.',
      'A defesa de Sproul da justificaÃ§Ã£o pela fÃ© Ã© um chamado para a Igreja nÃ£o abandonar o evangelicalismo clÃ¡ssico. Em uma era de relativismo teolÃ³gico, a justificaÃ§Ã£o pela fÃ© permanece o centro do evangelho.'
    ],
    versicosChave: ['Romanos 3:21-26', 'GÃ¡latas 2:16', 'EfÃ©sios 2:8-9', 'Romanos 5:1', 'Filipenses 3:9'],
    tags: ['justificaÃ§Ã£o', 'fÃ©', 'Sproul', 'imputaÃ§Ã£o', 'sola fide'],
    fontes: ['R.C. Sproul, Faith Alone', 'Sproul, Justified by Faith Alone', 'Sproul, The Righteousness of God']
  },
  {
    id: 'novo-017',
    titulo: 'R.C. Sproul â€” Soberania Divina e Responsabilidade Humana',
    categoria: 'Teologia BÃ­blica',
    subcategoria: 'Soberania',
    conteudo: [
      'Sproul dedicou considerÃ¡vel atenÃ§Ã£o ao paradoxo entre a soberania de Deus e a responsabilidade humana. Para ele, essa tensÃ£o Ã© central na teologia bÃ­blica e nÃ£o deve ser resolvida em favor de um dos polos.',
      'Sproul ensinava que Deus Ã© soberano sobre todas as coisas, incluindo a salvaÃ§Ã£o do homem. Ele elege, chama e regenera soberanamente, sem depender de mÃ©rito humano.',
      'No entanto, Sproul tambÃ©m insistia na responsabilidade humana. O homem Ã© responsÃ¡vel por crer no evangelho e arrepender-se de seus pecados. A soberania de Deus nÃ£o anula a responsabilidade humana.',
      'Para Sproul, esse paradoxo Ã© um mistÃ©rio que a razÃ£o humana nÃ£o pode resolver completamente. Ele defendia a tensÃ£o bÃ­blica, rejeitando tanto o determinismo quanto o livre-arbÃ­trio absoluto.',
      'A abordagem equilibrada de Sproul sobre soberania e responsabilidade Ã© um modelo para a teologia cristÃ£. Em vez de simplificar a BÃ­blia em favor de um sistema, ele abraÃ§ou o paradoxo com humildade e reverÃªncia.'
    ],
    versicosChave: ['EfÃ©sios 1:11', 'JosuÃ© 24:15', 'Romanos 9:19-21', 'Filemom 15'],
    tags: ['soberania', 'responsabilidade', 'Sproul', 'calvinismo', 'paradoxo'],
    fontes: ['R.C. Sproul, Willing to Believe', 'Sproul, Chosen by God', 'Sproul, Every Believer a Theologian']
  },
  {
    id: 'novo-018',
    titulo: 'R.C. Sproul â€” A InerrÃ¢ncia BÃ­blica',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escritura',
    conteudo: [
      'Sproul dedicou sua vida Ã  defesa da inerrÃ¢ncia bÃ­blica, acreditando que a Escritura Ã© a palavra infalÃ­vel de Deus, sem erro em tudo o que afirma. Para ele, a inerrÃ¢ncia Ã© o fundamento de toda a fÃ© cristÃ£.',
      'Sproul ensinava que a inerrÃ¢ncia significa que a BÃ­blia Ã© verdadeira em tudo o que declara. NÃ£o Ã© apenas infalÃ­vel em assuntos de fÃ© e prÃ¡tica, mas perfeitamente verdadeira em seus relatos histÃ³ricos e cientÃ­ficos.',
      'O teÃ³logo reformado argumentava que a inerrÃ¢ncia Ã© deduzida da natureza de Deus. Um Deus santo e onisciente nÃ£o pode errar, e Sua Palavra reflete perfeitamente Seu carÃ¡ter e conhecimento.',
      'Sproul defendia a inerrÃ¢ncia contra ataques de dentro e fora da Igreja. Ele insistia que a negaÃ§Ã£o da inerrÃ¢ncia leva inevitavelmente a uma erosÃ£o da autoridade bÃ­blica e, em Ãºltima instÃ¢ncia, Ã  negaÃ§Ã£o do prÃ³prio Deus.',
      'A defesa de Sproul da inerrÃ¢ncia bÃ­blica continua essencial para a Igreja. Em uma era de relativismo e ceticismo, a certeza de que a Palavra de Deus Ã© verdadeira Ã© a Ã¢ncora da fÃ© cristÃ£.'
    ],
    versicosChave: ['2 TimÃ³teo 3:16', 'Salmos 12:6', 'ProvÃ©rbios 30:5', 'JoÃ£o 17:17', 'IsaÃ­as 40:8'],
    tags: ['inerrÃ¢ncia', 'BÃ­blia', 'Sproul', 'autoridade bÃ­blica', 'sola scriptura'],
    fontes: ['R.C. Sproul, Can I Trust the Bible?', 'Sproul, Scriptural Authority', 'Sproul, Classics of the Christian Faith']
  },
  {
    id: 'novo-019',
    titulo: 'R.C. Sproul â€” Os Sacramentos como Meios de GraÃ§a',
    categoria: 'Eclesiologia',
    subcategoria: 'Sacramentos',
    conteudo: [
      'Sproul via os sacramentos como meios de graÃ§a instituÃ­dos por Cristo, essenciais para a vida da Igreja. Para ele, batismo e ceia nÃ£o sÃ£o meros rituais, mas encontros reais com a graÃ§a divina.',
      'Sproul ensinava que os sacramentos sÃ£o visÃ­veis da palavra. Assim como a pregaÃ§Ã£o comunica a graÃ§a de Deus por meio de palavras, os sacramentos a comunicam por meio de sinais visÃ­veis.',
      'O batismo, para Sproul, Ã© o sinal externo da alianÃ§a que Deus faz com Seu povo. Embora nÃ£o regenere automaticamente, ele aponta para a regeneraÃ§Ã£o que o EspÃ­rito Santo obra no coraÃ§Ã£o.',
      'A ceia do Senhor, para Sproul, Ã© um encontro real com Cristo, embora nÃ£o de maneira literal. Ele rejeitava tanto a transubstanciaÃ§Ã£o quanto a memÃ³ria meramente simbÃ³lica, defendendo a presenÃ§a espiritual.',
      'A teologia sacramental de Sproul Ã© um chamado para a Igreja redescobrir a importÃ¢ncia dos sacramentos como meios de graÃ§a. Em uma era de superficialidade litÃºrgica, os sacramentos mantÃªm a Igreja conectada Ã s raÃ­zes da fÃ©.'
    ],
    versicosChave: ['Mateus 28:19', '1 CorÃ­ntios 11:23-26', 'Atos 2:38', 'Romanos 6:3-4'],
    tags: ['sacramentos', 'Sproul', 'batismo', 'ceia', 'meios de graÃ§a'],
    fontes: ['R.C. Sproul, Truths We Confess', 'Sproul, Faith and Life', 'SprÃ´l, The Prince of Preachers']
  },
  {
    id: 'novo-020',
    titulo: 'R.C. Sproul â€” A GraÃ§a IrresistÃ­vel e a Vontade do Homem',
    categoria: 'Soteriologia',
    subcategoria: 'GraÃ§a',
    conteudo: [
      'Sproul defendia a doutrina da graÃ§a irresistÃ­vel, entendendo que quando Deus decide salvar um pecador, Ele capacita esse pecador a crer de maneira eficaz. A graÃ§a de Deus nÃ£o pode ser permanentemente resistida pelo eleito.',
      'Para Sproul, a graÃ§a irresistÃ­vel nÃ£o significa que o homem Ã© forÃ§ado contra sua vontade. Significa que Deus transforma a vontade do homem para que ele deseje livremente aceitar o evangelho.',
      'Sproul ensinava que a graÃ§a irresistÃ­vel Ã© consequÃªncia lÃ³gica da eleiÃ§Ã£o. Se Deus elegeu certas pessoas para a salvaÃ§Ã£o, Ele necessariamente providencia os meios para que essa eleiÃ§Ã£o se cumpra.',
      'O teÃ³logo reformado argumentava que a graÃ§a irresistÃ­vel nÃ£o elimina a experiÃªncia subjetiva da escolha humana. O crente experimenta que estÃ¡ escolhendo livremente, embora essa escolha seja fruto da obra regeneradora do EspÃ­rito.',
      'A doutrina da graÃ§a irresistÃ­vel de Sproul Ã© um testemunho do poder transformador de Deus. Em um mundo onde o homem Ã© escravo do pecado, a graÃ§a soberana liberta e capacita para a fÃ© e a obediÃªncia.'
    ],
    versicosChave: ['JoÃ£o 6:37', 'JoÃ£o 6:44', 'Romanos 9:16', 'EfÃ©sios 2:4-5', 'Filemom 15'],
    tags: ['graÃ§a irresistÃ­vel', 'Sproul', 'eleiÃ§Ã£o', 'vontade', 'regeneraÃ§Ã£o'],
    fontes: ['R.C. Sproul, Chosen by God', 'Sproul, Willing to Believe', 'Sproul, The Pleasures of God']
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // JOHN PIPER (5 estudos: novo-021 a novo-025)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    id: 'novo-021',
    titulo: 'John Piper â€” A Alegria em Deus como Fim Supremo',
    categoria: 'Teologia Proper',
    subcategoria: 'Alegria',
    conteudo: [
      'John Piper (n. 1946) Ã© o teÃ³logo do "Hedonismo CristÃ£o", a doutrina de que o glorificar a Deus e o desfrutar de Deus sÃ£o o mesmo. Para Piper, a alegria em Deus nÃ£o Ã© opcional, mas o dever supremo do cristÃ£o.',
      'Piper argumenta que Deus Ã© mais glorificado quando nÃ³s nos deleitamos Nele. A adoraÃ§Ã£o verdadeira nÃ£o Ã© mera obediÃªncia dutil, mas gozo apreciativo da beleza de Deus em Cristo.',
      'Para Piper, a alegria cristÃ£ Ã© profunda e abrangente. Ela nÃ£o depende das circunstÃ¢ncias, mas da realidade de Deus e de Sua promessa de satisfazer nossas almas mais profundas.',
      'Piper insiste que a alegria em Deus Ã© o antÃ­doto contra a idolatria. O coraÃ§Ã£o humano sempre busca satisfaÃ§Ã£o, e sÃ³ encontra satisfaÃ§Ã£o verdadeira em Deus. Buscar satisfaÃ§Ã£o em qualquer coisa alÃ©m de Deus Ã© idolatria.',
      'O chamado de Piper Ã© que a Igreja redescubra a alegria como marca da vida cristÃ£. O cristianismo nÃ£o Ã© uma religiÃ£o de melancolia, mas de gozo abundante na presenÃ§a de Deus.'
    ],
    versicosChave: ['Salmos 16:11', 'Filipenses 4:4', 'Habacuque 3:17-18', '1 Pedro 1:8'],
    tags: ['alegria', 'Piper', 'hedonismo cristÃ£o', 'adoraÃ§Ã£o', 'gozo'],
    fontes: ['John Piper, Desiring God', 'Piper, The Pleasures of God', 'Piper, Future Grace']
  },
  {
    id: 'novo-022',
    titulo: 'John Piper â€” MissÃµes e a GlÃ³ria de Deus',
    categoria: 'Missiologia',
    subcategoria: 'MissÃµes',
    conteudo: [
      'Para Piper, as missÃµes existem porque a adoraÃ§Ã£o nÃ£o existe. O objetivo supremo das missÃµes Ã© que todas as naÃ§Ãµes conheÃ§am, amem e adorem a Deus. As missÃµes sÃ£o temporÃ¡rias; a adoraÃ§Ã£o Ã© eterna.',
      'Piper argumenta que Deus deseja ser adorado em todas as naÃ§Ãµes. O Salmo 96 declarar que todos os povos devem trazer oferendas ao Senhor. As missÃµes sÃ£o o meio pelo qual esse desejo divino se cumpre.',
      'Para Piper, a urgÃªncia das missÃµes Ã© ditada pela eternidade. Onde Cristo nÃ£o Ã© pregado, os homens perecem. A responsabilidade de levar o evangelho a todas as naÃ§Ãµes Ã© uma questÃ£o de vida eterna.',
      'Piper ensinava que o cristÃ£o deve viver para as missÃµes, nÃ£o apenas orar e dar. O estilo de vida missionary Ã© o padrÃ£o para todos os crentes, nÃ£o apenas para os missionÃ¡rios profissionais.',
      'O legado missionÃ¡rio de Piper desafia a Igreja a ver as missÃµes como central para a vida da comunidade de fÃ©. As missÃµes nÃ£o sÃ£o um programa lateral, mas o coraÃ§Ã£o de Deus para todas as naÃ§Ãµes.'
    ],
    versicosChave: ['Mateus 28:19-20', 'Salmo 67', 'Apocalipse 7:9', 'Romanos 10:14-15'],
    tags: ['missÃµes', 'Piper', 'adoraÃ§Ã£o', 'glÃ³ria de Deus', 'evangelismo'],
    fontes: ['John Piper, Let the Nations Be Glad', 'Piper, Providence', 'Piper, A Pleading for Missions']
  },
  {
    id: 'novo-023',
    titulo: 'John Piper â€” ProvisÃ£o Divina e o Sustento do Crente',
    categoria: 'Vida CristÃ£',
    subcategoria: 'ProvidÃªncia',
    conteudo: [
      'Piper desenvolveu uma teologia robusta da provisÃ£o divina, baseada na convicÃ§Ã£o de que Deus Ã© o sustentador de todas as coisas. Para ele, a provisÃ£o de Deus nÃ£o Ã© mera bonanÃ§a, mas cuidado soberano e fiel.',
      'Para Piper, a provisÃ£o divina abrange todas as necessidades da vida: fÃ­sica, emocional, espiritual e material. Deus conhece nossas necessidades antes mesmo de as pedirmos.',
      'Piper ensinava que a provisÃ£o de Deus nÃ£o elimina o trabalho humano, mas o fundamenta. O cristÃ£o trabalha diligentemente porque Deus prometeu suprir suas necessidades atravÃ©s do trabalho.',
      'O teÃ³logo reformado insistia que a provisÃ£o divina inclui atÃ© as provaÃ§Ãµes e sofrimentos. Deus usa as dificuldades para amadurecer o crente e moldar seu carÃ¡ter Ã  imagem de Cristo.',
      'A teologia da provisÃ£o de Piper Ã© um antÃ­doto contra a ansiedade. Em uma era de incertezas econÃ´micas e sociais, o crente pode descansar na certeza de que Deus Ã© fiel em suas promessas.'
    ],
    versicosChave: ['Filipenses 4:19', 'Mateus 6:25-34', 'Salmos 23:1', 'Jeremias 29:11'],
    tags: ['provisÃ£o', 'Piper', 'providÃªncia', 'sustento', 'fÃ©'],
    fontes: ['John Piper, Providence', 'Piper, Desiring God', 'Piper, When I Don\'t Desire God']
  },
  {
    id: 'novo-024',
    titulo: 'John Piper â€” Casamento para a GlÃ³ria de Deus',
    categoria: 'Ã‰tica CristÃ£',
    subcategoria: 'Casamento',
    conteudo: [
      'Piper dedicou considerÃ¡vel atenÃ§Ã£o ao tema do casamento, vendo-o como uma displays da glÃ³ria de Deus. Para ele, o casamento cristÃ£o nÃ£o Ã© primariamente sobre felicidade, mas sobre santidade e glÃ³ria divina.',
      'Para Piper, o casamento Ã© uma tipologia da relaÃ§Ã£o entre Cristo e a Igreja. O marido representa Cristo; a esposa representa a Igreja. Essa tipologia dÃ¡ dignidade e profundidade ao casamento.',
      'Piper ensinava que o casamento Ã© um meio de graÃ§a pelo qual Deus amadurece o carÃ¡ter dos cÃ´njuges. As dificuldades do casamento nÃ£o sÃ£o acidentes, mas oportunidades para crescimento espiritual.',
      'O teÃ³logo reformado insistia que o casamento deve ser centrado em Deus, nÃ£o no cÃ´njuge. Quando o casamento se torna o fim Ãºltimo, ele se torna Ã­dolo. Deus Ã© o Ãºnico que pode satisfazer o coraÃ§Ã£o humano.',
      'A teologia do casamento de Piper Ã© um chamado para que os casamentos cristÃ£os sejam testemunhos vivos da graÃ§a de Deus. Em uma era de divorcismo e relativismo, o casamento cristÃ£o Ã© um contracultura.'
    ],
    versicosChave: ['EfÃ©sios 5:22-33', 'GÃªnesis 2:24', '1 Pedro 3:1-7', 'MiquÃ©ias 6:8'],
    tags: ['casamento', 'Piper', 'famÃ­lia', 'relacionamentos', 'santidade'],
    fontes: ['John Piper, This Momentary Marriage', 'Piper, Future Grace', 'Piper, Desiring God']
  },
  {
    id: 'novo-025',
    titulo: 'John Piper â€” Deus e o Prazer Eterno do Crente',
    categoria: 'Escatologia',
    subcategoria: 'EsperanÃ§a',
    conteudo: [
      'Piper desenvolveu uma escatologia centrada na alegria eterna do crente na presenÃ§a de Deus. Para ele, a esperanÃ§a cristÃ£ nÃ£o Ã© fuga do mundo, mas o gozo pleno de Deus em um novo cÃ©u e nova terra.',
      'Para Piper, o cÃ©u nÃ£o Ã© apenas um lugar de descanso, mas de atividade gloriosa. O crente desfrutarÃ¡ de Deus para sempre, conhecendo-O cada vez mais em profundidade e admiraÃ§Ã£o.',
      'Piper ensinava que a esperanÃ§a da glÃ³ria futura Ã© o que sustenta o crente no sofrimento presente. As tribulaÃ§Ãµes da vida presente sÃ£o leves comparadas com a glÃ³ria que serÃ¡ revelada.',
      'O teÃ³logo reformado insistia que a alegria eterna nÃ£o Ã© meramente a ausÃªncia de sofrimento, mas a presenÃ§a positiva de Deus. O cÃ©u Ã© onde Deus habita com Seu povo, e essa presenÃ§a Ã© a fonte de toda alegria.',
      'A escatologia de Piper Ã© um chamado para vivermos com eternidade em vista. A perspectiva da glÃ³ria futura transforma a maneira como vivemos no presente, concedendo-nos perseveranÃ§a e alegria.'
    ],
    versicosChave: ['Apocalipse 21:1-4', 'Romanos 8:18', '2 CorÃ­ntios 4:17-18', '1 Pedro 1:4'],
    tags: ['cÃ©u', 'Piper', 'esperanÃ§a', 'glÃ³ria eterna', 'nova criaÃ§Ã£o'],
    fontes: ['John Piper, Providence', 'Piper, Desiring God', 'Piper, Spectacular Sins']
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // DIETRICH BONHOEFFER (5 estudos: novo-026 a novo-030)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    id: 'novo-026',
    titulo: 'Dietrich Bonhoeffer â€” O Discipulado Radical',
    categoria: 'Vida CristÃ£',
    subcategoria: 'Discipulado',
    conteudo: [
      'Dietrich Bonhoeffer (1906-1945) Ã© um dos teÃ³logos mais influentes do sÃ©c. XX, conhecido por sua teologia do discipulado radical. Para Bonhoeffer, seguir a Jesus nÃ£o Ã© opÃ§Ã£o, mas imperativo absoluto.',
      'Bonhoeffer ensinava que o discipulado Ã© uma chamada Ã  obediÃªncia total. "Quando Jesus chama um homem, Ele o quer que morra", escreveu em "O Custo do Discipulado". A fÃ© sem obediÃªncia Ã© fÃ© morta.',
      'Para Bonhoeffer, o discipulado nÃ£o Ã© vida privada, mas compromisso pÃºblico com Cristo. O discÃ­pulo segue a Jesus em todos os aspectos da vida: famÃ­lia, trabalho, polÃ­tica, sociedade.',
      'Bonhoeffer praticava o que pregava. Sua resistÃªncia ao nazismo foi fruto de seu compromisso com o discipulado radical. Ele escolheu a morte em vez de trair sua fÃ©.',
      'O chamado de Bonhoeffer Ã  Igreja contemporÃ¢nea Ã© que recupere o custo do discipulado. O evangelho barato de prosperidade e conforto Ã© contrÃ¡rio ao chamado de Jesus para cruz e sacrifÃ­cio.'
    ],
    versicosChave: ['Mateus 16:24', 'Lucas 9:23', 'JoÃ£o 15:14', 'Filipenses 3:10'],
    tags: ['discipulado', 'Bonhoeffer', 'obediÃªncia', 'cruz', 'sacrifÃ­cio'],
    fontes: ['Dietrich Bonhoeffer, O Custo do Discipulado', 'Eric Metaxas, Bonhoeffer', 'Bonhoeffer, Vida em ComunhÃ£o']
  },
  {
    id: 'novo-027',
    titulo: 'Dietrich Bonhoeffer â€” ComunhÃ£o CristÃ£ e Vida em Comunidade',
    categoria: 'Eclesiologia',
    subcategoria: 'Comunidade',
    conteudo: [
      'Bonhoeffer dedicou parte significativa de sua teologia ao estudo da comunhÃ£o cristÃ£. Para ele, o cristÃ£o nÃ£o pode viver sozinho: a fÃ© Ã© essencialmente comunitÃ¡ria.',
      'Bonhoeffer ensinava que a comunidade cristÃ£ nÃ£o Ã© um ideal a ser alcanÃ§ado, mas um dom de Deus. Cristo mesmo Ã© o centro da comunidade, e os crentes sÃ£o membros de Seu corpo.',
      'Para Bonhoeffer, a comunhÃ£o verdadeira exige humildade, serviÃ§o e tolerÃ¢ncia. A comunidade nÃ£o Ã© perfeita, mas Ã© lugar onde o perdÃ£o e a restauraÃ§Ã£o sÃ£o praticados.',
      'O teÃ³logo luterano insistia que a comunhÃ£o cristÃ£ deve ser marcada pela Palavra de Deus. Sem a Palavra, a comunidade se torna uma organizaÃ§Ã£o social vazia de conteÃºdo espiritual.',
      'A teologia da comunhÃ£o de Bonhoeffer Ã© um chamado para a Igreja redescobrir o valor da vida comunitÃ¡ria. Em uma era de individualismo, a comunidade cristÃ£ Ã© contracultura e testemunho.'
    ],
    versicosChave: ['Atos 2:42-47', 'Hebreus 10:24-25', '1 CorÃ­ntios 12:12-27', 'Romanos 12:4-5'],
    tags: ['comunidade', 'Bonhoeffer', 'igreja', 'comunhÃ£o', 'vida em comum'],
    fontes: ['Dietrich Bonhoeffer, Vida em ComunhÃ£o', 'Bonhoeffer, O Custo do Discipulado', 'Metaxas, Bonhoeffer']
  },
  {
    id: 'novo-028',
    titulo: 'Dietrich Bonhoeffer â€” Ã‰tica CristÃ£ e Responsabilidade',
    categoria: 'Ã‰tica CristÃ£',
    subcategoria: 'Ã‰tica',
    conteudo: [
      'Bonhoeffer desenvolveu uma teologia Ã©tica profundamente enraizada na realidade da graÃ§a. Para ele, a Ã©tica cristÃ£ nÃ£o Ã© legalismo, mas resposta amorosa ao amor de Deus.',
      'Bonhoeffer ensinava que a Ã©tica cristÃ£ Ã© situacional, mas nÃ£o relativista. O cristÃ£o deve discernir a vontade de Deus em cada situaÃ§Ã£o concreta, aplicando princÃ­pios bÃ­blicos com sabedoria.',
      'Para Bonhoeffer, a responsabilidade cristÃ£ Ã© pessoal e intransferÃ­vel. Cada crente Ã© responsÃ¡vel diante de Deus por suas decisÃµes. A obediÃªncia cega Ã  autoridade nÃ£o dispensa a responsabilidade pessoal.',
      'O teÃ³logo luterano insistia que a Ã©tica cristÃ£ exige coragem. Resistir ao mal, mesmo quando custa caro, Ã© parte do discipulado. A Ã©tica sem coragem Ã© Ã©tica estÃ©ril.',
      'A teologia Ã©tica de Bonhoeffer desafia a Igreja a viver com integridade em um mundo corrompido. A Ã©tica cristÃ£ nÃ£o Ã© perfeiÃ§Ã£o, mas fidelidade ao chamado de Deus.'
    ],
    versicosChave: ['MiquÃ©ias 6:8', 'Romanos 12:1-2', 'EfÃ©sios 5:15-17', 'Tiago 4:17'],
    tags: ['Ã©tica', 'Bonhoeffer', 'responsabilidade', 'obediÃªncia', 'integridade'],
    fontes: ['Dietrich Bonhoeffer, Ã‰tica', 'Bonhoeffer, Vida em ComunhÃ£o', 'Metaxas, Bonhoeffer']
  },
  {
    id: 'novo-029',
    titulo: 'Dietrich Bonhoeffer â€” A GraÃ§a Barata e a GraÃ§a Custosa',
    categoria: 'Soteriologia',
    subcategoria: 'GraÃ§a',
    conteudo: [
      'Bonhoeffer Ã© cÃ©lebre pela distinÃ§Ã£o entre "graÃ§a barata" e "graÃ§a custosa". A graÃ§a barata Ã© a graÃ§a sem discipulado, sem cruz, sem Cristo vivo. Ã‰ perdÃ£o sem arrependimento, batismo sem comunidade.',
      'A graÃ§a custosa, por outro lado, Ã© a graÃ§a que nos chama a seguir a Jesus. Ã‰ a graÃ§a que nos custa a vida, porque nos leva Ã  cruz. Ã‰ a graÃ§a que transforma, nÃ£o apenas perdÃ£o.',
      'Bonhoeffer argumentava que a graÃ§a barata Ã© o maior perigo da Igreja. Ela oferece consolo sem mudanÃ§a, salvaÃ§Ã£o sem santificaÃ§Ã£o. Ã‰ uma graÃ§a que nÃ£o salva, mas adormece.',
      'Para Bonhoeffer, a graÃ§a custosa Ã© a graÃ§a verdadeira. Ela nos confronta com nossa pecaminosidade e nos chama Ã  obediÃªncia. Ã‰ a graÃ§a que nos faz discÃ­pulos, nÃ£o meros consumidores de religiÃ£o.',
      'O apelo de Bonhoeffer Ã  Igreja Ã© que nÃ£o aceite a graÃ§a barata. O evangelho Ã© oferta de graÃ§a que custa tudo, porque nos dÃ¡ tudo em Cristo.'
    ],
    versicosChave: ['Romanos 6:1-2', 'Mateus 10:38', 'GÃ¡latas 2:20', '1 Pedro 4:12-14'],
    tags: ['graÃ§a barata', 'graÃ§a custosa', 'Bonhoeffer', 'discipulado', 'cruz'],
    fontes: ['Dietrich Bonhoeffer, O Custo do Discipulado', 'Bonhoeffer, Ã‰tica', 'Metaxas, Bonhoeffer']
  },
  {
    id: 'novo-030',
    titulo: 'Dietrich Bonhoeffer â€” ResistÃªncia ao Mal Institucionalizado',
    categoria: 'Ã‰tica CristÃ£',
    subcategoria: 'ResistÃªncia',
    conteudo: [
      'Bonhoeffer Ã© exemplo histÃ³rico de resistÃªncia ao mal institucionalizado. Sua luta contra o nazismo nÃ£o foi apenas polÃ­tica, mas teolÃ³gica: o cristÃ£o nÃ£o pode tolerar o mal sob nenhuma circunstÃ¢ncia.',
      'Bonhoeffer ensinava que o silÃªncio diante do mal Ã© conivÃªncia. A Igreja tem a responsabilidade de denunciar a injustiÃ§a e defender os oprimidos, mesmo quando isso custa a vida.',
      'Para Bonhoeffer, a resistÃªncia ao mal exige discernimento espiritual e coragem moral. NÃ£o Ã© violÃªncia cega, mas aÃ§Ã£o estratÃ©gica guiada pela fÃ© e pelo amor.',
      'O teÃ³logo luterano praticou o que pregava, participando de uma conspiraÃ§Ã£o para assassinar Hitler. Embora tenha wrestled com a consciÃªncia, ele concluiu que a responsabilidade cristÃ£ exigia aÃ§Ã£o.',
      'O exemplo de Bonhoeffer Ã© um chamado para a Igreja nÃ£o se calar diante das injustiÃ§as do mundo. A fÃ© cristÃ£ nÃ£o Ã© fuga da realidade, mas engajamento profundo com ela.'
    ],
    versicosChave: ['MiquÃ©ias 6:8', 'AmÃ³s 5:24', 'Romanos 12:21', 'EfÃ©sios 6:12'],
    tags: ['resistÃªncia', 'Bonhoeffer', 'justiÃ§a', 'nazismo', 'coragem'],
    fontes: ['Dietrich Bonhoeffer, Cartas e ReflexÃµes da PrisÃ£o', 'Metaxas, Bonhoeffer', 'Bonhoeffer, Ã‰tica']
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // C.S. LEWIS (5 estudos: novo-031 a novo-035)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    id: 'novo-031',
    titulo: 'C.S. Lewis â€” Dor e Sofrimento no Plano de Deus',
    categoria: 'Teologia BÃ­blica',
    subcategoria: 'Sofrimento',
    conteudo: [
      'C.S. Lewis (1898-1963) Ã© um dos maiores apologistas cristÃ£os do sÃ©c. XX. Em "Problemas do Sofrimento", ele aborda a questÃ£o da dor humana Ã  luz da fÃ© cristÃ£, oferecendo uma resposta que combina razÃ£o e compaixÃ£o.',
      'Lewis argumenta que Deus permite o sofrimento porque Ele deseja que os seres humanos sejam livres. Uma criatura programada para o bem nÃ£o seria realmente virtuosa, mas meramente mecÃ¢nica.',
      'Para Lewis, o sofrimento pode ser instrumento de Deus para quebrantar o orgulho humano e nos conduzir ao arrependimento. Ã‰ o "megafone de Deus" em um mundo ensurdecido.',
      'Lewis reconhece que o sofrimento Ã© um mistÃ©rio, mas insiste que Deus nÃ£o Ã© indiferente a ele. A encarnaÃ§Ã£o Ã© a prova de que Deus entrou no sofrimento humano e o transformou.',
      'A abordagem de Lewis ao sofrimento Ã© equilibrada: nÃ£o minimiza a dor, mas a coloca no contexto de um Deus amoroso e soberano que trabalha todas as coisas para o bem.'
    ],
    versicosChave: ['Romanos 8:28', '2 CorÃ­ntios 4:17', 'Hebreus 12:5-11', 'Apocalipse 21:4'],
    tags: ['sofrimento', 'Lewis', 'dor', 'providÃªncia', 'apologÃ©tica'],
    fontes: ['C.S. Lewis, Problemas do Sofrimento', 'Lewis, A BreviÃ¡rio da Dor', 'Michael Ward, Planet Narnia']
  },
  {
    id: 'novo-032',
    titulo: 'C.S. Lewis â€” A RazÃ£o da FÃ© CristÃ£',
    categoria: 'Apologetica',
    subcategoria: 'RazÃ£o',
    conteudo: [
      'Lewis foi um racionalista convertido ao cristianismo, e dedicou sua vida a mostrar que a fÃ© Ã© razoÃ¡vel. Em "Credo", ele apresenta argumentos convincentes para a existÃªncia de Deus e a veracidade do cristianismo.',
      'Lewis argumentava que a razÃ£o Ã© uma dÃ¡diva de Deus e deve ser usada para investigar a verdade. A fÃ© nÃ£o Ã© irracional, mas supra-racional: vai alÃ©m da razÃ£o sem a contradizer.',
      'Para Lewis, o argumento do Logos Ã© decisivo: o universo tem uma ordem racional porque foi criado por um Ser racional. A razÃ£o humana Ã© um reflexo da RazÃ£o divina.',
      'Lewis ensinava que o cristianismo Ã© a Ãºnica religiÃ£o que satisfaz plenamente a razÃ£o e o coraÃ§Ã£o. As outras religiÃµes ou sÃ£o irracionais ou incompletas.',
      'O apelo de Lewis Ã© que a fÃ© nÃ£o deve ser cega. O cristÃ£o deve conhecer sua fÃ©, poder defendÃª-la e demonstrar que ela Ã© racionalmente superior a qualquer alternativa.'
    ],
    versicosChave: ['JoÃ£o 1:1-3', 'Romanos 1:20', '1 Pedro 3:15', 'Hebreus 11:1'],
    tags: ['razÃ£o', 'Lewis', 'apologÃ©tica', 'fÃ©', 'filosofia'],
    fontes: ['C.S. Lewis, Credo', 'Lewis, O Problema do Sofrimento', 'Lewis, A Encosta Feliz']
  },
  {
    id: 'novo-033',
    titulo: 'C.S. Lewis â€” Milagres e o Sobrenatural',
    categoria: 'Apologetica',
    subcategoria: 'Milagres',
    conteudo: [
      'Em "Milagres", Lewis defende a possibilidade lÃ³gica dos milagres contra o ceticismo moderno. Ele argumenta que a natureza nÃ£o Ã© um sistema fechado, mas aberto Ã  intervenÃ§Ã£o do Criador.',
      'Lewis distingue entre milagres e feitiÃ§aria. O milagre Ã© uma suspensÃ£o da natureza pelo Criador; a feitiÃ§aria Ã© uma manipulaÃ§Ã£o da natureza por forÃ§as malignas. Confundir ambos Ã© um erro.',
      'Para Lewis, a ressurreiÃ§Ã£o de Jesus Ã© o milagre central da histÃ³ria. Se Cristo ressuscitou, os milagres sÃ£o possÃ­veis. Se nÃ£o ressuscitou, a fÃ© cristÃ£ Ã© vÃ£.',
      'Lewis argumentava que o ceticismo moderno Ã© uma forma de preconceito, nÃ£o de razÃ£o. O homem moderno recusa os milagres nÃ£o porque sÃ£o irracionais, mas porque sÃ£o inconvenientes.',
      'A defesa de Lewis dos milagres Ã© um chamado para a Igreja redescobrir o sobrenatural. Em uma era de naturalismo, a fÃ© no sobrenatural Ã© essential para a integridade da fÃ© cristÃ£.'
    ],
    versicosChave: ['JoÃ£o 20:30-31', '1 CorÃ­ntios 15:3-8', 'Lucas 24:39', 'Hebreus 2:4'],
    tags: ['milagres', 'Lewis', 'sobrenatural', 'ressurreiÃ§Ã£o', 'apologÃ©tica'],
    fontes: ['C.S. Lewis, Milagres', 'Lewis, Mere Christianity', 'Lewis, The Miracles']
  },
  {
    id: 'novo-034',
    titulo: 'C.S. Lewis â€” A Natureza Humana e o Problema do Pecado',
    categoria: 'Teologia BÃ­blica',
    subcategoria: 'Antropologia',
    conteudo: [
      'Lewis ofereceu uma anÃ¡lise perspicaz da natureza humana em suas obras de apologÃ©tica. Para ele, o problema central da humanidade Ã© o pecado, que corrompe todas as dimensÃµes da existÃªncia.',
      'Lewis argumentava que o pecado nÃ£o Ã© apenas aÃ§Ã£o exterior, mas condiÃ§Ã£o interior. O homem Ã© naturalmente inclinado ao egoÃ­smo, Ã  rebeldia e Ã  autojustificaÃ§Ã£o.',
      'Para Lewis, o pecado Ã© a raiz de todos os males humanos: guerras, injustiÃ§as, opressÃµes. Sem resolver o problema do pecado, nenhum sistema polÃ­tico ou social pode trazer paz duradoura.',
      'Lewis ensinava que o pecado Ã© aussi uma questÃ£o de orgulho. O orgulho Ã© o pecado original, do qual todos os outros derivam. Humildade Ã© a virtude mais difÃ­cil e mais necessÃ¡ria.',
      'A antropologia de Lewis Ã© um diagnÃ³stico realista da condiÃ§Ã£o humana. Sem a graÃ§a de Deus, o homem estÃ¡ perdido. Com a graÃ§a, ele Ã© transformado e restaurado.'
    ],
    versicosChave: ['Romanos 3:23', 'Romanos 7:18', 'GÃªnesis 6:5', 'EfÃ©sios 2:1-3'],
    tags: ['pecado', 'Lewis', 'natureza humana', 'orgulho', 'redenÃ§Ã£o'],
    fontes: ['C.S. Lewis, Mere Christianity', 'Lewis, Problemas do Sofrimento', 'Lewis, A BreviÃ¡rio da Dor']
  },
  {
    id: 'novo-035',
    titulo: 'C.S. Lewis â€” O CÃ©u e a Realidade Eterna',
    categoria: 'Escatologia',
    subcategoria: 'CÃ©u',
    conteudo: [
      'Lewis descreveu o cÃ©u de maneira vÃ­vida em "Pilares da Terra", imaginando-o como um lugar de intensa realidade e gozo. Para ele, o cÃ©u nÃ£o Ã© fuga da realidade, mas encontro com a realidade mÃ¡xima.',
      'Para Lewis, o cÃ©u Ã© onde Deus habita com Seu povo. Ã‰ o lar verdadeiro do ser humano, o lugar para o qual foi criado. Na terra somos exilados; no cÃ©u, finalmente em casa.',
      'Lewis argumentava que as coisas terrenas sÃ£o sombras das realidades celestiais. O amor humano Ã© uma fraÃ§Ã£o do amor divino; a beleza terrena Ã© reflexo da beleza celestial.',
      'O apologeta britÃ¢nico insistia que o cÃ©u Ã© personal, nÃ£o impessoal. Cada crente terÃ¡ um relacionamento Ãºnico e pessoal com Deus, sem perder sua individualidade.',
      'A visÃ£o de Lewis sobre o cÃ©u Ã© um chamado para vivermos com eternidade em vista. A perspectiva do cÃ©u transforma a maneira como encaramos a vida terrena.'
    ],
    versicosChave: ['Apocalipse 21:1-5', 'JoÃ£o 14:1-3', '1 CorÃ­ntios 2:9', 'Filipenses 3:20'],
    tags: ['cÃ©u', 'Lewis', 'eternidade', 'nova criaÃ§Ã£o', 'escatologia'],
    fontes: ['C.S. Lewis, Pilares da Terra', 'Lewis, A BreviÃ¡rio da Dor', 'Lewis, The Great Divorce']
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // TIM KELLER (5 estudos: novo-036 a novo-040)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    id: 'novo-036',
    titulo: 'Tim Keller â€” FÃ© e Cultura ContemporÃ¢nea',
    categoria: 'Apologetica',
    subcategoria: 'Cultura',
    conteudo: [
      'Tim Keller (1950-2023) foi um teÃ³logo e pastor que dedicou sua vida a pensar como a fÃ© cristÃ£ se relaciona com a cultura contemporÃ¢nea. Para Keller, o cristÃ£o deve engajar a cultura, nÃ£o fugir dela.',
      'Keller argumentava que o cristianismo nÃ£o Ã© uma subcultura, mas uma contracultura que desafia todas as culturas humanas. O evangelho transcende polÃ­tica, economia e sociedade.',
      'Para Keller, a Igreja deve ser inteligente em seu engajamento cultural. Isso significa compreender as narrativas culturais e responder com sabedoria e graÃ§a.',
      'O pastor de Nova York ensinava que a fÃ© cristÃ£ Ã© relevante para todas as Ã¡reas da vida: arte, ciÃªncia, polÃ­tica, negÃ³cios. Nenhuma esfera estÃ¡ isoa da influÃªncia do evangelho.',
      'O chamado de Keller Ã© que a Igreja seja relevante sem ser mundana, contextual sem ser condescendente. A fÃ© cristÃ£ Ã© perenemente relevante porque Ã© verdadeira.'
    ],
    versicosChave: ['Mateus 5:13-16', '1 CorÃ­ntios 9:19-23', 'Colossenses 4:5-6', '1 Pedro 3:15'],
    tags: ['cultura', 'Keller', 'apologÃ©tica', 'engajamento', 'contracultura'],
    fontes: ['Tim Keller, Center Church', 'Keller, The Reason for God', 'Keller, Counterfeit Gods']
  },
  {
    id: 'novo-037',
    titulo: 'Tim Keller â€” Idolatria no Mundo Moderno',
    categoria: 'Teologia BÃ­blica',
    subcategoria: 'Idolatria',
    conteudo: [
      'Keller identificou a idolatria como o pecado central do mundo contemporÃ¢neo. Para ele, um Ã­dolo Ã© qualquer coisa que se torna mais importante que Deus na vida de uma pessoa.',
      'Keller argumentava que os Ã­dolos modernos nÃ£o sÃ£o estÃ¡tuas de metal, mas coisas aparentemente boas: sucesso, famÃ­lia, romance, poder, reconhecimento. Esses bens se tornam Ã­dolos quando substituem Deus.',
      'Para Keller, a idolatria Ã© a raiz de todos os males humanos. O pecado nÃ£o Ã© apenas violaÃ§Ã£o de regras, mas desvio de lealdade. O homem foi criado para adorar a Deus, e quando adora outra coisa, ele se destrÃ³i.',
      'O pastor e teÃ³logo ensinava que o evangelicalismo contemporÃ¢neo estÃ¡ vulnerÃ¡vel a Ã­dolos sutis: conforto, seguranÃ§a, relevÃ¢ncia. A igreja pode se tornar Ã­dolo para si mesma.',
      'A anÃ¡lise de Keller sobre a idolatria moderna Ã© um convite ao autoexame. O cristÃ£o deve perguntar constantemente: o que ocupa o lugar de Deus em meu coraÃ§Ã£o?'
    ],
    versicosChave: ['1 JoÃ£o 5:21', 'Colossenses 3:5', 'Romanos 1:25', 'ÃŠxodo 20:3'],
    tags: ['idolatria', 'Keller', 'Ã­dolos modernos', 'coraÃ§Ã£o', 'adoraÃ§Ã£o'],
    fontes: ['Tim Keller, Counterfeit Gods', 'Keller, The Reason for God', 'Keller, Generous Justice']
  },
  {
    id: 'novo-038',
    titulo: 'Tim Keller â€” JustiÃ§a Social e o Evangelho',
    categoria: 'Ã‰tica CristÃ£',
    subcategoria: 'JustiÃ§a Social',
    conteudo: [
      'Keller foi um forte defensor da justiÃ§a social como dimensÃ£o essencial do evangelho. Para ele, a fÃ© sem obras morta inclui compromisso com os pobres, oprimidos e marginalizados.',
      'Keller argumentava que a justiÃ§a social nÃ£o Ã© polÃ­tica partidÃ¡ria, mas imperativo bÃ­blico. Deus Ã© justo e ama a justiÃ§a, e seus seguidores devem refletir esse carÃ¡ter.',
      'Para Keller, o evangelho Ã© a motivaÃ§Ã£o mais poderosa para a justiÃ§a social. Quando o cristÃ£o compreende que foi justificado gratuitamente, ele se torna generoso com os outros.',
      'O pastor de Redeemer ensinava que a Igreja deve ser uma comunidade de justiÃ§a, onde os pobres sÃ£o acolhidos, os marginalizados sÃ£o valorizados e os oprimidos sÃ£o libertados.',
      'O chamado de Keller Ã© que a Igreja nÃ£o se canse de fazer justiÃ§a. A justiÃ§a social nÃ£o Ã© adiada para o cÃ©u, mas praticada na terra como antecipaÃ§Ã£o do reino de Deus.'
    ],
    versicosChave: ['MiquÃ©ias 6:8', 'IsaÃ­as 1:17', 'Mateus 25:31-46', 'Tiago 1:27'],
    tags: ['justiÃ§a social', 'Keller', 'evangelho', 'pobres', 'compaixÃ£o'],
    fontes: ['Tim Keller, Generous Justice', 'Keller, Center Church', 'Keller, The Reason for God']
  },
  {
    id: 'novo-039',
    titulo: 'Tim Keller â€” O PerdÃ£o Radical no Evangelho',
    categoria: 'Vida CristÃ£',
    subcategoria: 'PerdÃ£o',
    conteudo: [
      'Keller desenvolveu uma teologia do perdÃ£o que se enraÃ­za na graÃ§a de Deus em Cristo. Para ele, o perdÃ£o cristÃ£o nÃ£o Ã© opÃ§Ã£o, mas imperativo decorrente da prÃ³pria natureza do evangelho.',
      'Keller argumentava que o perdÃ£o Ã© possÃ­vel apenas quando compreendemos que nÃ³s mesmos fomos perdoados por Deus. A consciÃªncia da prÃ³pria pecaminosidade Ã© antÃ­doto contra o ressentimento.',
      'Para Keller, o perdÃ£o nÃ£o Ã© negaÃ§Ã£o da dor ou esquecimento do mal sofrido. Ã‰ uma decisÃ£o consciente de nÃ£o buscar vinganÃ§a, mas confiar a Deus a justiÃ§a.',
      'O pastor e teÃ³logo ensinava que o perdÃ£o Ã© processo, nÃ£o evento. Alguns ofensas exigem tempo e oraÃ§Ã£o para serem completamente perdoadas.',
      'O chamado de Keller Ã© que a Igreja seja uma comunidade de perdÃ£o. No mundo, o perdÃ£o Ã© fraqueza; no evangelho, Ã© a maior expressÃ£o de forÃ§a espiritual.'
    ],
    versicosChave: ['EfÃ©sios 4:32', 'Colossenses 3:13', 'Mateus 18:21-35', 'Lucas 23:34'],
    tags: ['perdÃ£o', 'Keller', 'graÃ§a', 'reconciliaÃ§Ã£o', 'relacionamentos'],
    fontes: ['Tim Keller, The Reason for God', 'Keller, Generous Justice', 'Keller, Walking with God through Pain and Suffering']
  },
  {
    id: 'novo-040',
    titulo: 'Tim Keller â€” Urbanidade e MissÃ£o Urbana',
    categoria: 'Missiologia',
    subcategoria: 'MissÃ£o Urbana',
    conteudo: [
      'Keller foi um pioneiro na teologia da missÃ£o urbana, fundando a Redeemer Presbyterian Church em Nova York. Para ele, as cidades sÃ£o campos missionÃ¡rios estratÃ©gicos do sÃ©c. XXI.',
      'Keller argumentava que as cidades concentram diversidade cultural, intelectual e econÃ´mica. Isso as torna locais ideais para o evangelismo e a pluraÃ§Ã£o cultural.',
      'Para Keller, a missÃ£o urbana exige criatividade, adaptabilidade e profundidade teolÃ³gica. Os urbanos sÃ£o cÃ©ticos, mas buscadores; racionalistas, mas espiritualmente famintos.',
      'O pastor de Nova York ensinava que a igreja urbana deve ser culturalmente sensÃ­vel sem ser culturalmente capturada. O evangelho Ã© para todas as culturas, mas nÃ£o Ã© propriedade de nenhuma.',
      'O legado de Keller sobre missÃ£o urbana desafia a Igreja a levar o evangelho Ã s cidades com excelÃªncia e paixÃ£o. As cidades sÃ£o o futuro do cristianismo mundial.'
    ],
    versicosChave: ['Atos 1:8', 'Mateus 28:19-20', '1 CorÃ­ntios 9:19-23', 'Jeremias 29:7'],
    tags: ['cidade', 'Keller', 'missÃ£o urbana', 'Redeemer', 'evangelismo'],
    fontes: ['Tim Keller, Center Church', 'Keller, The Reason for God', 'Keller, Ministries of Mercy']
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // JONATHAN EDWARDS (4 estudos: novo-041 a novo-044)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    id: 'novo-041',
    titulo: 'Jonathan Edwards â€” O Desejo de Deus como Fim Supremo',
    categoria: 'Teologia Proper',
    subcategoria: 'Desejo de Deus',
    conteudo: [
      'Jonathan Edwards (1703-1758) Ã© considerado o maior teÃ³logo americano. Para Edwards, o desejo de Deus Ã© a essÃªncia da vida cristÃ£: Deus criou o mundo para Sua glÃ³ria e o ser humano para desfrutar Dele.',
      'Edwards argumentava que todos os desejos humanos sÃ£o, em Ãºltima instÃ¢ncia, desejos de felicidade. Mas a felicidade verdadeira sÃ³ se encontra em Deus. Buscar felicidade em qualquer coisa alÃ©m de Deus Ã© idolatria.',
      'Para Edwards, o desejo de Deus nÃ£o Ã© natural ao homem caÃ­do. Somente a graÃ§a regeneradora pode despertar o coraÃ§Ã£o humano para o desejo de Deus.',
      'Edwards ensinava que o cristÃ£o maduro Ã© aquele que deseja Deus mais do que qualquer outra coisa. A santidade Ã©, em essÃªncia, o crescimento do desejo de Deus no coraÃ§Ã£o.',
      'A teologia de Edwards sobre o desejo de Deus Ã© um chamado Ã  apreciaÃ§Ã£o de Deus como a maior satisfaÃ§Ã£o do coraÃ§Ã£o humano. Em uma era de consumismo, Edwards aponta para a Ãºnica fonte de satisfaÃ§Ã£o eterna.'
    ],
    versicosChave: ['Salmos 37:4', 'Salmo 42:1-2', 'Filipenses 3:8', 'JoÃ£o 6:35'],
    tags: ['desejo de Deus', 'Edwards', 'apreciaÃ§Ã£o', 'santidade', 'gozo'],
    fontes: ['Jonathan Edwards, Religious Affections', 'Edwards, The End for Which God Created the World', 'Marsden, Jonathan Edwards']
  },
  {
    id: 'novo-042',
    titulo: 'Jonathan Edwards â€” Avivamento e a PresenÃ§a Divina',
    categoria: 'Eclesiologia',
    subcategoria: 'Avivamento',
    conteudo: [
      'Edwards foi o principal teÃ³logo do Grande Desertamento (1730-1740), o primeiro avivamento de alcance nacional na AmÃ©rica. Para ele, o avivamento Ã© obra soberana do EspÃ­rito Santo.',
      'Edwards argumentava que o avivamento nÃ£o Ã© fabricado por tÃ©cnicas humanas, mas derramado por Deus. A preparaÃ§Ã£o espiritual, a oraÃ§Ã£o e a pregaÃ§Ã£o fiel sÃ£o meios, mas o resultado Ã© de Deus.',
      'Para Edwards, o avivamento Ã© precedido por humilhaÃ§Ã£o, arrependimento e busca fervorosa de Deus. A religiÃ£o verdadeira Ã© "afeiÃ§Ãµes santificadas" â€” emoÃ§Ãµes que nascem da compreensÃ£o da verdade.',
      'Edwards via o avivamento como retorno Ã s fontes do cristianismo primitivo. Em meio Ã  formalidade religiosa, Deus desperta Seu povo para uma experiÃªncia viva de Sua presenÃ§a.',
      'O legado de Edwards sobre avivamento Ã© um chamado para que a Igreja busque a presenÃ§a de Deus com humildade e fervor. O avivamento nÃ£o Ã© passado; Ã© promessa para todos os tempos.'
    ],
    versicosChave: ['2 CrÃ´nicas 7:14', 'Atos 4:31', 'Habacuque 3:2', 'Joeel 2:28-29'],
    tags: ['avivamento', 'Edwards', 'Desertamento', 'EspÃ­rito Santo', 'presenÃ§a de Deus'],
    fontes: ['Jonathan Edwards, A Narrative of Surprising Conversions', 'Edwards, Religious Affections', 'Marsden, Jonathan Edwards']
  },
  {
    id: 'novo-043',
    titulo: 'Jonathan Edwards â€” A Natureza da Verdadeira ConversÃ£o',
    categoria: 'Soteriologia',
    subcategoria: 'ConversÃ£o',
    conteudo: [
      'Edwards dedicou considerÃ¡vel estudo ao tema da conversÃ£o, distinguindo entre experiÃªncias religiosas genuÃ­nas e falsas. Para ele, a conversÃ£o verdadeira envolve transformaÃ§Ã£o do coraÃ§Ã£o, nÃ£o apenas mudanÃ§a de comportamento.',
      'Edwards argumentava que a conversÃ£o Ã© obra do EspÃ­rito Santo, que ilumina a mente, inclina a vontade e transforma os afetos. O homem nÃ£o pode se converter por suas prÃ³prias forÃ§as.',
      'Para Edwards, a conversÃ£o verdadeira produz frutos de arrependimento, fÃ© em Cristo, amor a Deus e aos outros, e obediÃªncia Ã  vontade divina. Sem esses frutos, nÃ£o hÃ¡ conversÃ£o genuÃ­na.',
      'Edwards alertava contra a confianÃ§a em experiÃªncias emocionais passageiras como evidÃªncia de conversÃ£o. A verdadeira conversÃ£o Ã© marcada por perseveranÃ§a e frutos duradouros.',
      'O teÃ³logo puritano ensinava que a conversÃ£o Ã© inÃ­cio de uma jornada, nÃ£o fim. O cristÃ£o recÃ©m-convertido precisa de discipulado, comunhÃ£o e perseveranÃ§a.'
    ],
    versicosChave: ['JoÃ£o 3:3-8', '2 CorÃ­ntios 5:17', 'EfÃ©sios 2:4-5', '1 JoÃ£o 2:19'],
    tags: ['conversÃ£o', 'Edwards', 'regeneraÃ§Ã£o', 'verdadeira fÃ©', 'puritanismo'],
    fontes: ['Jonathan Edwards, Religious Affections', 'Edwards, A Treatise Concerning Religious Affections', 'Marsden, Jonathan Edwards']
  },
  {
    id: 'novo-044',
    titulo: 'Jonathan Edwards â€” A Beleza da Santidade',
    categoria: 'Vida CristÃ£',
    subcategoria: 'Santidade',
    conteudo: [
      'Edwards via a santidade como a mais sublime beleza da criaÃ§Ã£o. Para ele, a santidade de Deus Ã© a fonte de toda a beleza, e a santidade do crente Ã© reflexo dessa beleza divina.',
      'Edwards argumentava que a santidade nÃ£o Ã© conformidade a regras externas, mas transformaÃ§Ã£o interior do carÃ¡ter. O santo Ã© aquele cujo coraÃ§Ã£o foi transformado para amar o que Deus ama.',
      'Para Edwards, a santidade produz alegria. O crente santo nÃ£o Ã© melancÃ³lico, mas alegre, porque desfruta da beleza de Deus em sua vida.',
      'Edwards ensinava que a santidade Ã© progressiva. O cristÃ£o cresce em santidade atravÃ©s da oraÃ§Ã£o, meditaÃ§Ã£o na Palavra, comunhÃ£o dos santos e obediÃªncia.',
      'A teologia da santidade de Edwards Ã© um chamado para a Igreja redescobrir a beleza da santidade. A santidade nÃ£o Ã© pesada, mas libertadora: Ã© o caminho para a satisfaÃ§Ã£o plena em Deus.'
    ],
    versicosChave: ['Salmos 96:9', '1 Pedro 1:15-16', 'Hebreus 12:14', 'Salmos 29:2'],
    tags: ['santidade', 'Edwards', 'beleza', 'carÃ¡ter', 'transformaÃ§Ã£o'],
    fontes: ['Jonathan Edwards, Religious Affections', 'Edwards, The End for Which God Created the World', 'Marsden, Jonathan Edwards']
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // J.I. PACKER (3 estudos: novo-045 a novo-047)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    id: 'novo-045',
    titulo: 'J.I. Packer â€” Conhecer a Deus Pessoalmente',
    categoria: 'Teologia Proper',
    subcategoria: 'Conhecimento de Deus',
    conteudo: [
      'J.I. Packer (1926-2020) Ã© autor de "Conhecendo a Deus", obra que marcou geraÃ§Ãµes de cristÃ£os. Para Packer, conhecer a Deus nÃ£o Ã© informaÃ§Ã£o teolÃ³gica, mas relaÃ§Ã£o pessoal transformadora.',
      'Packer argumentava que o conhecimento de Deus comeÃ§a na Escritura. Deus se revela por meio de Sua Palavra, e o estudo sÃ©rio da BÃ­blia Ã© o caminho para conhecer a Deus.',
      'Para Packer, o conhecimento de Deus Ã© progressivo. ComeÃ§a na conversÃ£o, amadurece na santificaÃ§Ã£o e se aperfeiÃ§oa na glÃ³ria. Nunca chegamos ao fim do conhecimento de Deus.',
      'Packer ensinava que o conhecimento verdadeiro de Deus produz humildade, adoraÃ§Ã£o e obediÃªncia. O homem que conhece a Deus Ã© transformado por esse conhecimento.',
      'O chamado de Packer Ã© que a Igreja redescobra o valor do conhecimento de Deus. Em uma era de superficialidade religiosa, o conhecimento profundo de Deus Ã© a Ã¢ncora da fÃ©.'
    ],
    versicosChave: ['Jeremias 9:23-24', 'JoÃ£o 17:3', 'Salmos 46:10', 'Ã“seas 6:3'],
    tags: ['conhecimento de Deus', 'Packer', 'Escritura', 'relaÃ§Ã£o', 'teologia'],
    fontes: ['J.I. Packer, Conhecendo a Deus', 'Packer, Knowing God', 'Packer, God Has Spoken']
  },
  {
    id: 'novo-046',
    titulo: 'J.I. Packer â€” A OrientaÃ§Ã£o Divina na Vida do Crente',
    categoria: 'Vida CristÃ£',
    subcategoria: 'OrientaÃ§Ã£o',
    conteudo: [
      'Packer dedicou considerÃ¡vel atenÃ§Ã£o ao tema da orientaÃ§Ã£o divina, entendendo que muitos cristÃ£os se confundem sobre como discernir a vontade de Deus. Para Packer, a orientaÃ§Ã£o divina Ã© real, mas exige maturidade.',
      'Packer argumentava que Deus guia principalmente atravÃ©s de Sua Palavra. As Escrituras fornecem princÃ­pios claros para decisÃµes Ã©ticas e prÃ¡ticas. A BÃ­blia nÃ£o Ã© apenas livro de histÃ³rias, mas manual de vida.',
      'Para Packer, a orientaÃ§Ã£o divina inclui tambÃ©m as circunstÃ¢ncias da vida, os conselhos dos irmÃ£os e as impressÃµes do EspÃ­rito Santo. Mas tudo deve ser submetido Ã  Palavra.',
      'Packer ensinava que a orientaÃ§Ã£o de Deus nÃ£o Ã© automÃ¡tica. O cristÃ£o deve buscar a Deus com humildade, oraÃ§Ã£o e estudo da Escritura.',
      'O chamado de Packer Ã© que a Igreja nÃ£o busque atalhos para a orientaÃ§Ã£o divina. A vontade de Deus Ã© descoberta na relaÃ§Ã£o Ã­ntima com Ele, nÃ£o em fÃ³rmulas mÃ¡gicas.'
    ],
    versicosChave: ['Salmos 119:105', 'ProvÃ©rbios 3:5-6', 'Romanos 12:1-2', 'Tiago 1:5'],
    tags: ['orientaÃ§Ã£o', 'Packer', 'vontade de Deus', 'decisÃµes', 'Sabedoria'],
    fontes: ['J.I. Packer, God\'s Will', 'Packer, Conhecendo a Deus', 'Packer, DireÃ§Ã£o para a Vida']
  },
  {
    id: 'novo-047',
    titulo: 'J.I. Packer â€” A Soberania de Deus e o Sofrimento Humano',
    categoria: 'Teologia BÃ­blica',
    subcategoria: 'Sofrimento',
    conteudo: [
      'Packer abordou o tema do sofrimento Ã  luz da soberania de Deus. Para ele, o sofrimento nÃ£o Ã© acidente fortuito, mas parte do plano soberano de Deus para o bem de Seu povo.',
      'Packer argumentava que a soberania de Deus nÃ£o elimina o sofrimento, mas o coloca em contexto. O Deus soberano permite o sofrimento por razÃµes que nem sempre compreendemos.',
      'Para Packer, o sofrimento Ã© instrumento de Deus para amadurecer o carÃ¡ter, produzir perseveranÃ§a e aprofundar a dependÃªncia de Deus.',
      'Packer ensinava que a resposta cristÃ£ ao sofrimento nÃ£o Ã© explicaÃ§Ã£o, mas confianÃ§a. "Deus faz todas as coisas bem", embora nÃ£o sempre compreendamos seus caminhos.',
      'O chamado de Packer Ã© que a Igreja descance na soberania de Deus mesmo quando o sofrimento Ã© inexplicÃ¡vel. A fÃ© nÃ£o exige compreensÃ£o completa, mas confianÃ§a plena.'
    ],
    versicosChave: ['Romanos 8:28', 'EfÃ©sios 1:11', 'Job 1:21', '2 CorÃ­ntios 4:17'],
    tags: ['soberania', 'sofrimento', 'Packer', 'providÃªncia', 'confianÃ§a'],
    fontes: ['J.I. Packer, Conhecendo a Deus', 'Packer, Knowing God', 'Packer, Providence']
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // JOHN STOTT (3 estudos: novo-048 a novo-050)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    id: 'novo-048',
    titulo: 'John Stott â€” A Cruz de Cristo e a ReconciliaÃ§Ã£o',
    categoria: 'Cristologia',
    subcategoria: 'Cruz',
    conteudo: [
      'John Stott (1921-2011) dedicou sua obra-prima "A Cruz de Cristo" ao estudo profundo do significado da morte de Jesus. Para Stott, a cruz Ã© o centro de toda a fÃ© cristÃ£.',
      'Stott argumentava que a cruz Ã© o meio de Deus para reconciliar consigo os pecadores rebeldes. A morte substitutiva de Cristo satisfaz a justiÃ§a divina e manifesta o amor divino.',
      'Para Stott, a cruz nÃ£o Ã© apenas um evento histÃ³rico, mas o fundamento da nova alianÃ§a. Em Cristo, Deus estabelece uma relaÃ§Ã£o nova e eterna com Seu povo.',
      'Stott ensinava que a cruz transforma a relaÃ§Ã£o entre Deus e o homem, entre o homem e si mesmo, e entre o homem e os outros. A reconciliaÃ§Ã£o Ã© total e abrangente.',
      'O chamado de Stott Ã© que a Igreja nunca se canse de proclamar a mensagem da cruz. Em uma era deåå­—æž¶ message diluÃ­da, a cruz permanece o poder de Deus para salvaÃ§Ã£o.'
    ],
    versicosChave: ['2 CorÃ­ntios 5:18-21', '1 CorÃ­ntios 1:18-24', 'GÃ¡latas 6:14', 'Colossenses 1:19-20'],
    tags: ['cruz', 'Stott', 'reconciliaÃ§Ã£o', 'substituiÃ§Ã£o', 'redenÃ§Ã£o'],
    fontes: ['John Stott, A Cruz de Cristo', 'Stott, The Cross of Christ', 'Stott, The Contemporary Christian']
  },
  {
    id: 'novo-049',
    titulo: 'John Stott â€” A Autoridade da Escritura na Vida da Igreja',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escritura',
    conteudo: [
      'Stott foi um defensor convicto da autoridade bÃ­blica, insistindo que a Escritura Ã© a norma suprema de fÃ© e prÃ¡tica para a Igreja. Para ele, sem autoridade bÃ­blica, nÃ£o hÃ¡ cristianismo.',
      'Stott argumentava que a autoridade da BÃ­blia nÃ£o vem da Igreja, mas de Deus. A Escritura Ã© Palavra de Deus, e por isso Ã© autoritativa.',
      'Para Stott, a autoridade bÃ­blica se aplica a todas as Ã¡reas da vida: teologia, Ã©tica, cultura, polÃ­tica. Nenhuma esfera estÃ¡ isoa da soberania da Palavra.',
      'Stott ensinava que a Igreja deve submeter-se Ã  Escritura, nÃ£o o contrÃ¡rio. A tradiÃ§Ã£o Ã© importante, mas Ã© reformada pela Palavra.',
      'O chamado de Stott Ã© que a Igreja recupere a autoridade da Escritura como fundamento de tudo. Em uma era de relativismo, a Palavra de Deus permanece imutÃ¡vel.'
    ],
    versicosChave: ['2 TimÃ³teo 3:16-17', 'Salmos 19:7-8', 'IsaÃ­as 40:8', 'Mateus 24:35'],
    tags: ['autoridade bÃ­blica', 'Stott', 'Escritura', 'sola scriptura', 'Palavra de Deus'],
    fontes: ['John Stott, A BÃ­blia Autoritativa', 'Stott, Understanding the Bible', 'Stott, The Contemporary Christian']
  },
  {
    id: 'novo-050',
    titulo: 'John Stott â€” A MissÃ£o da Igreja no Mundo',
    categoria: 'Missiologia',
    subcategoria: 'MissÃ£o',
    conteudo: [
      'Stott foi um dos principais lÃ­deres do movimento missionÃ¡rio contemporÃ¢neo, sendo co-fundador da Lausanne Movement. Para ele, a missÃ£o da Igreja Ã© central, nÃ£o perifÃ©rica.',
      'Stott argumentava que a missÃ£o da Igreja Ã© integral: evangelho e justiÃ§a sÃ£o inseparÃ¡veis. A Igreja nÃ£o pode pregar o evangelho sem compromisso com os pobres e oprimidos.',
      'Para Stott, a missÃ£o da Igreja Ã© universal. O mandato de Jesus Ã© para todas as naÃ§Ãµes, nÃ£o apenas para as culturas ocidentais.',
      'Stott ensinava que a missÃ£o exige contextualizaÃ§Ã£o sem compromisso. O evangelho Ã© transcultural, mas sua comunicaÃ§Ã£o deve ser contextual.',
      'O legado de Stott Ã© um chamado para que a Igreja seja fiel ao mandato missionÃ¡rio. A missÃ£o nÃ£o Ã© opcional, mas o propÃ³sito central da existÃªncia da Igreja.'
    ],
    versicosChave: ['Mateus 28:19-20', 'Atos 1:8', 'Romanos 10:14-15', 'Apocalipse 7:9'],
    tags: ['missÃ£o', 'Stott', 'Lausanne', 'evangelismo', 'justiÃ§a social'],
    fontes: ['John Stott, A Cruz de Cristo', 'Stott, The Lausanne Covenant', 'Stott, The Contemporary Christian']
  },
  {
  'id': 'pn-001',
  'titulo': 'A Personalidade do EspÃ­rito Santo',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Natureza do EspÃ­rito',
  'conteudo': [
    'O EspÃ­rito Santo nÃ£o Ã© uma forÃ§a impersonal ou uma influÃªncia abstrata, mas uma pessoa divina com vontade, emoÃ§Ãµes e inteligÃªncia.',
    'A BÃ­blia atribui ao EspÃ­rito Santo aÃ§Ãµes pessoais: Ele fala (Atos 13:2), ensina (JoÃ£o 14:26), intercede (Romanos 8:26), testifica (JoÃ£o 15:26), e pode ser entristecido (EfÃ©sios 4:30).',
    'No ConcÃ­lio de Constantinopla (381 d.C.), a Igreja affirmou a divindade e personalidade do EspÃ­rito Santo contra o pneumatomachianismo.',
    'Agostinho desenvolveu a pneumatologia ocidental, comparando o EspÃ­rito ao amor que proceed do Pai e do Filho.',
    'A teologia reformada enfatiza a obra do EspÃ­rito na regeneraÃ§Ã£o e santificaÃ§Ã£o, enquanto a tradiÃ§Ã£o pentecostal destaca os dons carismÃ¡ticos.'
  ],
  'versicosChave': [
    'JoÃ£o 14:26',
    'Atos 13:2',
    'Romanos 8:26',
    'EfÃ©sios 4:30'
  ],
  'tags': [
    'espÃ­rito santo',
    'pneumatologia',
    'trindade',
    'divindade'
  ],
  'fontes': [
    'Agostinho, De Trinitate',
    'Calvino, Institutas I.13',
    'G.E. Ladd, Teologia do NT'
  ]
},
  {
  'id': 'pn-002',
  'titulo': 'A Obra do EspÃ­rito Santo na RegeneraÃ§Ã£o',
  'categoria': 'Pneumatologia',
  'subcategoria': 'SalvaÃ§Ã£o',
  'conteudo': [
    'A regeneraÃ§Ã£o Ã© a obra sobrenatural do EspÃ­rito Santo que transforma a natureza espiritual do pecador, capacitando-o a crer em Cristo.',
    'Jesus ensinou que Ã© necessÃ¡rio nascer de novo (JoÃ£o 3:3-7), e que esse nascimento vem do EspÃ­rito Santo.',
    'A regeneraÃ§Ã£o precede a fÃ© â€” o pecador nÃ£o pode crer atÃ© que o EspÃ­rito Santo lhe dÃ© vida espiritual.',
    'A tradiÃ§Ã£o reformada ensina a regeneraÃ§Ã£o eficaz, enquanto a tradiÃ§Ã£o arminiana enfatiza a graÃ§a resistÃ­vel.',
    'A regeneraÃ§Ã£o Ã© instantÃ¢nea, secreta e irresistÃ­vel no que diz respeito Ã  sua eficÃ¡cia.'
  ],
  'versicosChave': [
    'JoÃ£o 3:5-6',
    'Tito 3:5',
    '1 Pedro 1:23',
    'EfÃ©sios 2:5'
  ],
  'tags': [
    'regeneraÃ§Ã£o',
    'conversÃ£o',
    'novo nascimento',
    'espÃ­rito santo'
  ],
  'fontes': [
    'Calvino, Institutas III.1',
    'Hodge, Systematic Theology',
    'Berkouwer, The Work of the Holy Spirit'
  ]
},
  {
  'id': 'pn-003',
  'titulo': 'Os Dons Espirituais â€” Cessacionismo vs. Continuismo',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Dons Espirituais',
  'conteudo': [
    'Os dons espirituais sÃ£o habilidades sobrenaturais concedidas pelo EspÃ­rito Santo para edificaÃ§Ã£o da igreja.',
    'O cessacionismo sustenta que os dons miraculosos (profecia, lÃ­nguas, curas) cessaram com a morte dos apÃ³stolos e a canonizaÃ§Ã£o das Escrituras.',
    'O continuismo defende que todos os dons do EspÃ­rito Santo continuam operantes hoje, incluindo lÃ­nguas e profecia.',
    'O cessacionismo apela para 1 CorÃ­ntios 13:8-10 (\'o perfeito virÃ¡\') como referÃªncia Ã  canonizaÃ§Ã£o bÃ­blica.',
    'O continuismo apela para Hebreus 13:8 (\'Jesus ontem, hoje e sempre\') e para a universalidade dos dons no NT.',
    'A posiÃ§Ã£o moderada (aberto/cessacionismo) aceita que alguns dons podem continuar, mas com limitaÃ§Ãµes.'
  ],
  'versicosChave': [
    '1 CorÃ­ntios 12:4-11',
    '1 CorÃ­ntios 13:8-10',
    'EfÃ©sios 4:11-12',
    'Hebreus 13:8'
  ],
  'tags': [
    'dons espirituais',
    'cessacionismo',
    'continuismo',
    'lÃ­nguas',
    'profecia'
  ],
  'fontes': [
    'Grudem, The Gift of Prophecy',
    'MacArthur, CharismÃ¡tica',
    'Deere, Power Encounter'
  ]
},
  {
  'id': 'pn-004',
  'titulo': 'O Batismo no EspÃ­rito Santo',
  'categoria': 'Pneumatologia',
  'subcategoria': 'ExperiÃªncia',
  'conteudo': [
    'O batismo no EspÃ­rito Santo Ã© a experiÃªncia de ser imerso na presenÃ§a e poder do EspÃ­rito de Deus.',
    'Na teologia pentecostal, o batismo no EspÃ­rito Ã© uma experiÃªncia posterior Ã  regeneraÃ§Ã£o, frequentemente acompanhada de lÃ­nguas.',
    'Na teologia reformada, o batismo no EspÃ­rito Ã© simultÃ¢neo Ã  regeneraÃ§Ã£o â€” todo crente jÃ¡ foi batizado no EspÃ­rito.',
    'Atos mostra mÃºltiplas ocasiÃµes em que o EspÃ­rito Santo veio sobre os crentes (Atos 2, 8, 10, 19).',
    'O propÃ³sito do batismo no EspÃ­rito Ã© capacitamento para testemunho e serviÃ§o, nÃ£o salvaÃ§Ã£o.'
  ],
  'versicosChave': [
    'Atos 1:5',
    'Atos 2:4',
    '1 CorÃ­ntios 12:13',
    'EfÃ©sios 5:18'
  ],
  'tags': [
    'batismo',
    'espÃ­rito santo',
    'pentecostal',
    'experiÃªncia'
  ],
  'fontes': [
    'Ruthven, On the Cessation of the Charismata',
    'Stronstad, The Charismatic Theology of Luke'
  ]
},
  {
  'id': 'pn-005',
  'titulo': 'O Fruto do EspÃ­rito Santo',
  'categoria': 'Pneumatologia',
  'subcategoria': 'SantificaÃ§Ã£o',
  'conteudo': [
    'O fruto do EspÃ­rito Santo Ã© o character Christlike que o EspÃ­rito produz na vida do crente (GÃ¡latas 5:22-23).',
    'Os nove aspectos do fruto formam um todo integrado: amor, gozo, paz, longanimidade, benignidade, bondade, fÃ©, mansidÃ£o, temperanÃ§a.',
    'O fruto nÃ£o Ã© fruto de esforÃ§o humano, mas resultado da obra do EspÃ­rito no crente que se rende.',
    'Diferente dos dons (distribuÃ­dos individualmente), o fruto Ã© produzido em todos os crentes.',
    'O fruto Ã© evidÃªncia madura da vida cristÃ£ â€” leva tempo para amadurecer, como uma Ã¡rvore que dÃ¡ fruto em sua estaÃ§Ã£o.'
  ],
  'versicosChave': [
    'GÃ¡latas 5:22-23',
    'JoÃ£o 15:4-5',
    'Romanos 8:29',
    'EfÃ©sios 5:9'
  ],
  'tags': [
    'fruto do espÃ­rito',
    'santificaÃ§Ã£o',
    'carÃ¡ter',
    'virtude'
  ],
  'fontes': [
    'Calvino, ComentÃ¡rio a GÃ¡latas',
    'Stott, The Message of Romans',
    'Moo, The Epistle to the Galatians'
  ]
},
  {
  'id': 'pn-006',
  'titulo': 'A UnÃ§Ã£o do EspÃ­rito Santo',
  'categoria': 'Pneumatologia',
  'subcategoria': 'ExperiÃªncia',
  'conteudo': [
    'A unÃ§Ã£o do EspÃ­rito Santo Ã© a equipagem sobrenatural para serviÃ§o, especialmente para pregaÃ§Ã£o e ministÃ©rio.',
    'Jesus foi unido pelo EspÃ­rito Santo no batismo (Lucas 3:22) e essa unÃ§Ã£o qualificou Seu ministÃ©rio terreno.',
    '1 JoÃ£o 2:20 fala de uma unÃ§Ã£o que todos os crentes recebem â€” \'vocÃªs tÃªm uma unÃ§Ã£o da parte dAquele que Ã© santo\'.',
    'A unÃ§Ã£o nÃ£o Ã© o mesmo que batismo no EspÃ­rito â€” Ã© mais especÃ­fica para service e ministÃ©rio.',
    'A unÃ§Ã£o capacitante nÃ£o deve ser confundida com a unÃ§Ã£o para salvaÃ§Ã£o (regeneraÃ§Ã£o).'
  ],
  'versicosChave': [
    'Lucas 3:22',
    '1 JoÃ£o 2:20',
    '1 JoÃ£o 2:27',
    'IsaÃ­as 61:1'
  ],
  'tags': [
    'unÃ§Ã£o',
    'ministÃ©rio',
    'capacitaÃ§Ã£o',
    'serviÃ§o'
  ],
  'fontes': [
    'Horton, The Holy Spirit',
    'Ryrie, The Holy Spirit'
  ]
},
  {
  'id': 'pn-007',
  'titulo': 'A IntercessÃ£o do EspÃ­rito Santo',
  'categoria': 'Pneumatologia',
  'subcategoria': 'OraÃ§Ã£o',
  'conteudo': [
    'Romanos 8:26-27 ensina que o EspÃ­rito Santo intercede por nÃ³s com \'gemidos inexprimÃ­veis\'.',
    'A intercessÃ£o do EspÃ­rito Ã© uma obra secreta e infalÃ­vel â€” Ele ora de acordo com a vontade de Deus.',
    'Mesmo quando nÃ£o sabemos como orar, o EspÃ­rito ora por nÃ³s.',
    'A intercessÃ£o do EspÃ­rito complementa a intercessÃ£o de Cristo (Hebreus 7:25) â€” Cristo ora como Sumo Sacerdote, o EspÃ­rito ora em nosso Ã­ntimo.',
    'Essa verdade deveria trazer grande consolo aos crentes que se sentem inadequados na oraÃ§Ã£o.'
  ],
  'versicosChave': [
    'Romanos 8:26-27',
    'Hebreus 7:25',
    'EfÃ©sios 6:18',
    'Judas 1:20'
  ],
  'tags': [
    'intercessÃ£o',
    'oraÃ§Ã£o',
    'espÃ­rito santo',
    'consolo'
  ],
  'fontes': [
    'Murray, Romans',
    'Moo, The Epistle to the Romans',
    'Calvino, Institutas III.20'
  ]
},
  {
  'id': 'pn-008',
  'titulo': 'O EspÃ­rito Santo e a SantificaÃ§Ã£o',
  'categoria': 'Pneumatologia',
  'subcategoria': 'SantificaÃ§Ã£o',
  'conteudo': [
    'A santificaÃ§Ã£o Ã© a obra progressiva do EspÃ­rito Santo que transforma o crente Ã  imagem de Cristo.',
    'O EspÃ­rito opera em dupla dimensÃ£o: nos declara santos (justificaÃ§Ã£o) e nos faz santos (santificaÃ§Ã£o).',
    'A santificaÃ§Ã£o Ã© cooperativa â€” o crente trabalha com o EspÃ­rito (Filipenses 2:12-13).',
    'O fruto do EspÃ­rito Ã© a evidÃªncia da santificaÃ§Ã£o progressiva.',
    'A santificaÃ§Ã£o nunca serÃ¡ completa nesta vida â€” a glorificaÃ§Ã£o Ã© o consumaÃ§Ã£o final.'
  ],
  'versicosChave': [
    '2 CorÃ­ntios 3:18',
    'Filipenses 2:12-13',
    '1 Tessalonicenses 4:3',
    'GÃ¡latas 5:22-23'
  ],
  'tags': [
    'santificaÃ§Ã£o',
    'transformaÃ§Ã£o',
    'carÃ¡ter',
    'crescimento'
  ],
  'fontes': [
    'Calvino, Institutas III.6',
    'Murray, Redemption Accomplished',
    'Packer, Keep in Step with the Spirit'
  ]
},
  {
  'id': 'pn-009',
  'titulo': 'O EspÃ­rito Santo e a Escritura',
  'categoria': 'Pneumatologia',
  'subcategoria': 'RevelaÃ§Ã£o',
  'conteudo': [
    'O EspÃ­rito Santo Ã© o autor inspirador das Escrituras â€” toda Escritura Ã© inspirada por Deus (2 TimÃ³teo 3:16).',
    'O EspÃ­rito ilumina a mente do crente para compreender as Escrituras (1 CorÃ­ntios 2:10-14).',
    'A inspiraÃ§Ã£o bÃ­blica Ã© plenÃ¡ria (toda a BÃ­blia), verbal (as palavras), e dinÃ¢mica (Deus atuando nos autores).',
    'A iluminaÃ§Ã£o do EspÃ­rito nÃ£o substitui o estudo diligente, mas o capacita.',
    'O mesmo EspÃ­rito que inspirou as Escrituras Ã© o que as interpreta â€” a Escritura Ã© sua prÃ³pria intÃ©rprete.'
  ],
  'versicosChave': [
    '2 TimÃ³teo 3:16',
    '1 CorÃ­ntios 2:10-14',
    '2 Pedro 1:21',
    'JoÃ£o 16:13'
  ],
  'tags': [
    'inspiraÃ§Ã£o',
    'iluminaÃ§Ã£o',
    'escritura',
    'revelaÃ§Ã£o'
  ],
  'fontes': [
    'Warfield, Inspiration and Authority of Scripture',
    'Calvino, Institutas I.7',
    'Geisler, Biblical Inspiration'
  ]
},
  {
  'id': 'pn-010',
  'titulo': 'O EspÃ­rito Santo na CriaÃ§Ã£o',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Cosmologia',
  'conteudo': [
    'O EspÃ­rito Santo estava presente e ativo na obra da criaÃ§Ã£o (GÃªnesis 1:2).',
    'O \'sopro de Deus\' (ruach) sobre as Ã¡guas Ã© vista como o EspÃ­rito criador.',
    'Salmos 33:6 confirma que \'pela palavra do Senhor os cÃ©us foram feitos\'.',
    'A Trindade estÃ¡ envolvida na criaÃ§Ã£o: Pai planeja, Filho executa, EspÃ­rito capacita.',
    'O EspÃ­rito continua sustentando a criaÃ§Ã£o (Colossenses 1:17).'
  ],
  'versicosChave': [
    'GÃªnesis 1:2',
    'Salmos 33:6',
    'JÃ³ 33:4',
    'Colossenses 1:17'
  ],
  'tags': [
    'criaÃ§Ã£o',
    'cosmologia',
    'sustento',
    'trindade'
  ],
  'fontes': [
    'Calvino, ComentÃ¡rio a GÃªnesis',
    'Clowney, The Unfolding Mystery'
  ]
},
  {
  'id': 'an-001',
  'titulo': 'A Natureza e Hierarquia dos Anjos',
  'categoria': 'Angelologia',
  'subcategoria': 'Natureza',
  'conteudo': [
    'Os anjos sÃ£o seres criados espirituais, inteligentes e pessoais, designados para servir a Deus e aos homens.',
    'A BÃ­blia descreve uma hierarquia angelical: querubins, serafins, thronos, dominaÃ§Ãµes, potestades (EfÃ©sios 6:12, Colossenses 1:16).',
    'Os anjos nÃ£o tÃªm corpos materiais, mas podem assumir forma humana quando necessÃ¡rio (Hebreus 13:2).',
    'Os anjos sÃ£o criados para adorar e servir a Deus â€” \'Santos, santos, santos Ã© o Senhor dos ExÃ©rcitos\' (IsaÃ­as 6:3).',
    'A tradiÃ§Ã£o judaica e cristÃ£ desenvolveu detalhes sobre ordens angelicais, embora a BÃ­blia seja limitada nesse assunto.'
  ],
  'versicosChave': [
    'Hebreus 1:14',
    'EfÃ©sios 6:12',
    'IsaÃ­as 6:2',
    'Colossenses 1:16'
  ],
  'tags': [
    'anjos',
    'hierarquia',
    'querubins',
    'serafins'
  ],
  'fontes': [
    'Calvino, Institutas I.13-14',
    'Pentecost, Things to Come',
    'Bauckham, The Fate of the Dead'
  ]
},
  {
  'id': 'an-002',
  'titulo': 'Anjos da Guarda â€” ProteÃ§Ã£o Divina',
  'categoria': 'Angelologia',
  'subcategoria': 'MinistÃ©rio',
  'conteudo': [
    'Deus designa anjos para proteger e guiar os Seus filhos (Salmo 91:11-12).',
    'Cada crianÃ§a pode ter um anjo da guarda (Mateus 18:10).',
    'Os anjos da guarda protegem contra perigos fÃ­sicos e espirituais.',
    'Daniel experimentou a proteÃ§Ã£o angelical na cova dos leÃµes (Daniel 6:22).',
    'Pedro foi libertado da prisÃ£o por um anjo (Atos 12:7-11).'
  ],
  'versicosChave': [
    'Salmo 91:11-12',
    'Mateus 18:10',
    'Atos 12:7-11',
    'Daniel 6:22'
  ],
  'tags': [
    'anjos da guarda',
    'proteÃ§Ã£o',
    'livramento',
    'ministÃ©rio'
  ],
  'fontes': [
    'Pentecost, Things to Come',
    'Aalders, Daniel'
  ]
},
  {
  'id': 'an-003',
  'titulo': 'SatanÃ¡s e os Anjos CaÃ­dos',
  'categoria': 'Angelologia',
  'subcategoria': 'Demonologia',
  'conteudo': [
    'SatanÃ¡s Ã© um anjo caÃ­do, originalmente criado como querubim ungido (Ezequiel 28:14).',
    'A queda de SatanÃ¡s ocorreu por orgulho â€” ele quis se igualar a Deus (IsaÃ­as 14:12-15).',
    'Um terÃ§o dos anjos caiu com SatanÃ¡s e se tornaram demÃ´nios (Apocalipse 12:4).',
    'SatanÃ¡s Ã© chamado de \'deus deste sÃ©culo\' (2 CorÃ­ntios 4:4) e \'prÃ­ncipe deste mundo\' (JoÃ£o 14:30).',
    'A derrota final de SatanÃ¡s estÃ¡ garantida pela cruz de Cristo (Colossenses 2:15) e se cumprirÃ¡ no lago de fogo (Apocalipse 20:10).'
  ],
  'versicosChave': [
    'Ezequiel 28:14-17',
    'IsaÃ­as 14:12-15',
    'Apocalipse 12:4',
    'Colossenses 2:15'
  ],
  'tags': [
    'satanÃ¡s',
    'demÃ´nios',
    'queda',
    'guerra espiritual'
  ],
  'fontes': [
    'Calvino, Institutas I.14',
    'Lewis, The Screwtape Letters',
    "Fee, God's Empowering Presence"
  ]
},
  {
  'id': 'an-004',
  'titulo': 'A Guerra Espiritual â€” EfÃ©sios 6:10-18',
  'categoria': 'Angelologia',
  'subcategoria': 'Guerra Espiritual',
  'conteudo': [
    'A guerra espiritual Ã© uma realidade â€” nossos inimigos nÃ£o sÃ£o de carne e sangue, mas principados e potestades.',
    'A armadura de Deus inclui: verdade, justiÃ§a, evangelho, fÃ©, salvaÃ§Ã£o, Palavra e oraÃ§Ã£o.',
    'Cada peÃ§a da armadura corresponde a uma verdade doutrinÃ¡ria que o crente deve vestir pela fÃ©.',
    'A oraÃ§Ã£o Ã© a arma ofensiva na guerra espiritual â€” ela invoca o poder de Deus.',
    'VitÃ³ria jÃ¡ foi conquistada na cruz â€” a guerra espiritual Ã© aplicaÃ§Ã£o dessa vitÃ³ria.'
  ],
  'versicosChave': [
    'EfÃ©sios 6:10-18',
    '2 CorÃ­ntios 10:3-5',
    'Romanos 8:37',
    '1 JoÃ£o 5:4'
  ],
  'tags': [
    'guerra espiritual',
    'armadura de deus',
    'poder',
    'vitÃ³ria'
  ],
  'fontes': [
    'Stott, The Message of Ephesios',
    'Boyd, God of the Possible',
    'Powlison, Power Encounters'
  ]
},
  {
  'id': 'an-005',
  'titulo': 'Anjos no Julgamento Final',
  'categoria': 'Angelologia',
  'subcategoria': 'Escatologia',
  'conteudo': [
    'Os anjos serÃ£o instrumentos do julgamento divino no final dos tempos (Mateus 13:39-42).',
    'Jesus voltarÃ¡ com os Seus anjos em glÃ³ria (Mateus 25:31).',
    'Os anjos separarÃ£o os justos dos injustos na colheita final.',
    'Os anjos atarÃ£o os demÃ´nios e os lanÃ§arÃ£o no lago de fogo (Apocalipse 20:1-3).',
    'A presenÃ§a angelical no julgamento demonstra a autoridade delegada de Deus.'
  ],
  'versicosChave': [
    'Mateus 13:39-42',
    'Mateus 25:31',
    'Apocalipse 20:1-3',
    '2 Pedro 2:4'
  ],
  'tags': [
    'julgamento',
    'escatologia',
    'colheita',
    'lago de fogo'
  ],
  'fontes': [
    'Pentecost, Things to Come',
    'Morris, The Gospel According to Matthew'
  ]
},
  {
  'id': 'at-001',
  'titulo': 'A Natureza Humana â€” Corpo, Alma e EspÃ­rito',
  'categoria': 'Antropologia',
  'subcategoria': 'ComposiÃ§Ã£o',
  'conteudo': [
    'O ser humano Ã© composto de corpo, alma e espÃ­rito (1 Tessalonicenses 5:23).',
    'O dualismo grego (corpo vs. alma) contrasta com a visÃ£o bÃ­blica da unidade da pessoa.',
    'O corpo nÃ£o Ã© prisÃ£o da alma, mas templo do EspÃ­rito Santo (1 CorÃ­ntios 6:19).',
    'A morte Ã© a separaÃ§Ã£o entre corpo e alma, mas nÃ£o Ã© aniquilaÃ§Ã£o.',
    'A ressurreiÃ§Ã£o envolverÃ¡ tanto o corpo quanto a alma â€” a totalidade da pessoa.'
  ],
  'versicosChave': [
    '1 Tessalonicenses 5:23',
    '1 CorÃ­ntios 6:19',
    'GÃªnesis 2:7',
    'Filipenses 1:23'
  ],
  'tags': [
    'antropologia',
    'corpo',
    'alma',
    'espÃ­rito',
    'dualismo'
  ],
  'fontes': [
    'Calvino, Institutas I.15',
    'Savage, Body, Soul, and Spirit',
    'Gundry, The Body in Scripture'
  ]
},
  {
  'id': 'at-002',
  'titulo': 'A Queda do Homem e o Pecado Original',
  'categoria': 'Antropologia',
  'subcategoria': 'Hamartiologia',
  'conteudo': [
    'AdÃ£o e Eva foram criados perfeitos mas com a possibilidade de cair (posse non posse non peccare).',
    'A Queda foi uma rebeliÃ£o consciente contra o comando de Deus (GÃªnesis 3:6).',
    'O pecado original Ã© a corrupÃ§Ã£o transmitida a todos os descendentes de AdÃ£o (Romanos 5:12).',
    'Agostinho ensinou que o pecado original Ã© transmitida pela concupiscÃªncia â€” o desejo desordenado.',
    'A Queda afetou todas as faculdades humanas: razÃ£o, vontade, emoÃ§Ãµes, corpo.',
    'Sem a graÃ§a regeneradora, o ser humano Ã© incapaz de buscar a Deus (Romanos 3:10-18).'
  ],
  'versicosChave': [
    'GÃªnesis 3:6',
    'Romanos 5:12',
    'Romanos 3:10-18',
    'EfÃ©sios 2:1-3'
  ],
  'tags': [
    'queda',
    'pecado original',
    'hamartiologia',
    'corrupÃ§Ã£o'
  ],
  'fontes': [
    'Agostinho, De Natura et Gratia',
    'Calvino, Institutas II.1',
    'Bavinck, Reformed Dogmatics'
  ]
},
  {
  'id': 'at-003',
  'titulo': 'A Liberdade Humana e a Soberania Divina',
  'categoria': 'Antropologia',
  'subcategoria': 'Debate',
  'conteudo': [
    'O ser humano possui livre-arbÃ­trio genuÃ­no para agir de acordo com sua natureza.',
    'A Queda corrompeu a vontade humana â€” o pecador Ã© livre para escolher, mas nÃ£o livre para crer sem graÃ§a.',
    'A Soberania de Deus nÃ£o anula a responsabilidade humana â€” ambos sÃ£o verdadeiros.',
    'O calvinismo enfatiza a soberania absoluta; o arminianismo enfatiza a responsabilidade humana.',
    'O compatibilismo defende que soberania e livre-arbÃ­trio sÃ£o compatÃ­veis â€” Deus governa sem coagir.'
  ],
  'versicosChave': [
    'DeuteronÃ´mio 30:19',
    'JosuÃ© 24:15',
    'ProvÃ©rbios 21:1',
    'Filipenses 2:12-13'
  ],
  'tags': [
    'livre-arbÃ­trio',
    'soberania',
    'predestinaÃ§Ã£o',
    'deus'
  ],
  'fontes': [
    'Calvino, Institutas II.2-5',
    'Arminio, Works',
    'Pinnock, The Grace of God'
  ]
},
  {
  'id': 'at-004',
  'titulo': 'A Imagem de Deus no Homem (Imago Dei)',
  'categoria': 'Antropologia',
  'subcategoria': 'Dignidade',
  'conteudo': [
    'O ser humano foi criado Ã  imagem e semelhanÃ§a de Deus (GÃªnesis 1:26-27).',
    'A imagem de Deus inclui: racionalidade, moralidade, relacionalidade, criatividade, domÃ­nio.',
    'A Queda corrompeu a imagem, mas nÃ£o a destruiu â€” todo ser humano tem dignidade inerente.',
    'A imagem Ã© restaurada em Cristo â€” \'renovados para o conhecimento, conforme Ã  imagem daquele que o criou\' (Colossenses 3:10).',
    'A dignidade humana Ã© a base da Ã©tica cristÃ£ e dos direitos humanos.'
  ],
  'versicosChave': [
    'GÃªnesis 1:26-27',
    'Colossenses 3:10',
    'Tiago 3:9',
    '1 JoÃ£o 3:2'
  ],
  'tags': [
    'imago dei',
    'dignidade',
    'humanidade',
    'criaÃ§Ã£o'
  ],
  'fontes': [
    'Calvino, ComentÃ¡rio a GÃªnesis',
    'Grudem, Systematic Theology',
    'Volf, After Our Likeness'
  ]
},
  {
  'id': 'at-005',
  'titulo': 'A Morte e o Destino do Homem',
  'categoria': 'Antropologia',
  'subcategoria': 'Escatologia',
  'conteudo': [
    'A morte Ã© a consequÃªncia do pecado â€” \'no dia em que comerdes, certamente morrereis\' (GÃªnesis 2:17).',
    'HÃ¡ duas mortes: a fÃ­sica (separaÃ§Ã£o alma-corpo) e a eterna (separaÃ§Ã£o de Deus).',
    'ApÃ³s a morte, os crentes estÃ£o com Cristo (2 CorÃ­ntios 5:8), os incrÃ©dulos sofrem antecipadamente.',
    'A ressurreiÃ§Ã£o dos mortos Ã© uma doutrina central â€” Jesus ressuscitou e promete ressurreiÃ§Ã£o aos Seus.',
    'O juÃ­zo final determinarÃ¡ o destino eterno: vida eterna ou condenaÃ§Ã£o.'
  ],
  'versicosChave': [
    'GÃªnesis 2:17',
    '2 CorÃ­ntios 5:8',
    'JoÃ£o 5:28-29',
    'Apocalipse 20:12-15'
  ],
  'tags': [
    'morte',
    'juÃ­zo',
    'vida eterna',
    'conenaÃ§Ã£o'
  ],
  'fontes': [
    'Calvino, Institutas III.25',
    'Hoekema, The Bible and the Future',
    'Wright, Surprised by Hope'
  ]
},
  {
  'id': 'hm-001',
  'titulo': 'A Natureza do Pecado',
  'categoria': 'Hamartiologia',
  'subcategoria': 'DefiniÃ§Ã£o',
  'conteudo': [
    'Pecado Ã© toda falta de conformidade com a Lei de Deus, tanto por aÃ§Ã£o quanto por omissÃ£o (Tiago 4:17).',
    'A palavra grega \'hamartia\' significa errar o alvo â€” o pecado Ã© falhar no propÃ³sito para o qual fomos criados.',
    'O pecado Ã© primariamente contra Deus â€” \'contra Ti somente pequei\' (Salmo 51:4).',
    'O pecado Ã© universal â€” \'nÃ£o hÃ¡ justo, nem um sequer\' (Romanos 3:10).',
    'O pecado Ã© radical â€” afeta todas as faculdades e dimensÃµes da existÃªncia humana.'
  ],
  'versicosChave': [
    'Romanos 3:10',
    'Tiago 4:17',
    'Salmo 51:4',
    '1 JoÃ£o 3:4'
  ],
  'tags': [
    'pecado',
    'hamartiologia',
    'natureza',
    'universalidade'
  ],
  'fontes': [
    'Calvino, Institutas II.1',
    'Stott, The Cross of Christ',
    'Packer, Knowing God'
  ]
},
  {
  'id': 'hm-002',
  'titulo': 'A Penalidade do Pecado â€” Morte e CondenaÃ§Ã£o',
  'categoria': 'Hamartiologia',
  'subcategoria': 'Penalidade',
  'conteudo': [
    'A penalidade do pecado Ã© a morte â€” \'o salÃ¡rio do pecado Ã© a morte\' (Romanos 6:23).',
    'A morte inclui trÃªs dimensÃµes: espiritual (separaÃ§Ã£o de Deus), fÃ­sica (separaÃ§Ã£o alma-corpo), eterna (lago de fogo).',
    'A justiÃ§a de Deus exige puniÃ§Ã£o â€” Deus nÃ£o pode tolerar o pecado sem penalidade.',
    'A penalidade Ã© proporcional Ã  ofensa â€” ofender o Deus eterno merece puniÃ§Ã£o eterna.',
    'Somente a graÃ§a de Deus pode livrar o pecador da penalidade merecida.'
  ],
  'versicosChave': [
    'Romanos 6:23',
    'Romanos 1:18',
    'Mateus 25:46',
    'Apocalipse 20:14-15'
  ],
  'tags': [
    'penalidade',
    'morte',
    'condenaÃ§Ã£o',
    'justiÃ§a'
  ],
  'fontes': [
    'Calvino, Institutas II.6',
    'Calvin, Institutes',
    'Frame, The Doctrine of God'
  ]
},
  {
  'id': 'hm-003',
  'titulo': 'A ExpiaÃ§Ã£o â€” O Morreu pelos Pecados',
  'categoria': 'Hamartiologia',
  'subcategoria': 'ExpiaÃ§Ã£o',
  'conteudo': [
    'A expiaÃ§Ã£o Ã© o ato de Cristo em morrer na cruz para satisfazer a justiÃ§a de Deus e reconciliar os pecadores com Ele.',
    'A satisfaÃ§Ã£o vicÃ¡ria (Anselmo) â€” Cristo morreu como substituto, satisfazendo a honra de Deus.',
    'A substituiÃ§Ã£o penal â€” Cristo assumiu as penalidades que merecÃ­amos (IsaÃ­as 53:5-6).',
    'A propiciaÃ§Ã£o â€” a ira de Deus contra o pecado foi derramada sobre Cristo (1 JoÃ£o 2:2).',
    'A expiaÃ§Ã£o Ã© limitada na extensÃ£o (somente para os eleitos) mas ilimitada no valor (suficiente para todos).',
    'A cruz Ã© o centro da histÃ³ria e da redenÃ§Ã£o â€” tudo aponta para ela.'
  ],
  'versicosChave': [
    'IsaÃ­as 53:5-6',
    '1 JoÃ£o 2:2',
    '2 CorÃ­ntios 5:21',
    '1 Pedro 2:24'
  ],
  'tags': [
    'expiaÃ§Ã£o',
    'substituiÃ§Ã£o',
    'propiciaÃ§Ã£o',
    'cruz'
  ],
  'fontes': [
    'Anselmo, Cur Deus Homo',
    'Calvino, Institutas II.16',
    'Stott, The Cross of Christ'
  ]
},
  {
  'id': 'hm-004',
  'titulo': 'A RedenÃ§Ã£o â€” Comprado com PreÃ§o',
  'categoria': 'Hamartiologia',
  'subcategoria': 'RedenÃ§Ã£o',
  'conteudo': [
    'RedenÃ§Ã£o Ã© o ato de Deus de nos comprar da escravidÃ£o do pecado pelo sangue de Cristo.',
    'A metÃ¡fora da redenÃ§Ã£o vem do mercado de escravos â€” fomos comprados com o precioso sangue de Cristo (1 Pedro 1:18-19).',
    'A redenÃ§Ã£o inclui: justificaÃ§Ã£o, regeneraÃ§Ã£o, santificaÃ§Ã£o e glorificaÃ§Ã£o.',
    'O preÃ§o pago foi o sangue de Cristo â€” valor infinito que satisfez a justiÃ§a divina.',
    'A redenÃ§Ã£o Ã© completa â€” nada pode ser adicionado Ã  obra consumada na cruz.'
  ],
  'versicosChave': [
    '1 Pedro 1:18-19',
    'EfÃ©sios 1:7',
    'Colossenses 1:14',
    'GÃ¡latas 3:13'
  ],
  'tags': [
    'redenÃ§Ã£o',
    'sangue',
    'preÃ§o',
    'libertaÃ§Ã£o'
  ],
  'fontes': [
    'Murray, Redemption Accomplished',
    'Calvino, Institutas II.16',
    'Owen, The Death of Death'
  ]
},
  {
  'id': 'hm-005',
  'titulo': 'A JustificaÃ§Ã£o â€” Declarado Justo',
  'categoria': 'Hamartiologia',
  'subcategoria': 'JustificaÃ§Ã£o',
  'conteudo': [
    'A justificaÃ§Ã£o Ã© o ato judicial de Deus de declarar o pecador justo pela fÃ© em Cristo.',
    'Ã‰ por fÃ© somente (sola fide) â€” nÃ£o por obras da lei (Romanos 3:28).',
    'A justificaÃ§Ã£o Ã© imputaÃ§Ã£o â€” a justiÃ§a de Cristo Ã© creditada ao crente (2 CorÃ­ntios 5:21).',
    'Lutero a chamou de \'a artigo da igreja que se sustenta ou cai\' â€” Ã© a doutrina da Reforma.',
    'A justificaÃ§Ã£o Ã© simultÃ¢nea Ã  fÃ© â€” nÃ£o Ã© um processo gradual.',
    'Frutos de justiÃ§a sÃ£o evidÃªncias, nÃ£o requisitos, da justificaÃ§Ã£o.'
  ],
  'versicosChave': [
    'Romanos 3:28',
    'Romanos 5:1',
    'GÃ¡latas 2:16',
    '2 CorÃ­ntios 5:21'
  ],
  'tags': [
    'justificaÃ§Ã£o',
    'sola fide',
    'imputaÃ§Ã£o',
    'reforma'
  ],
  'fontes': [
    'Lutero, ComentÃ¡rio a GÃ¡latas',
    'Calvino, Institutas III.11',
    'Owen, Justification by Faith'
  ]
},
  {
  'id': 'pn-011',
  'titulo': 'O EspÃ­rito Santo na RessurreiÃ§Ã£o de Cristo',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Cristologia',
  'conteudo': [
    'O EspÃ­rito Santo foi instrumental na ressurreiÃ§Ã£o de Jesus dos mortos.',
    'Romanos 8:11 afirma que \'o EspÃ­rito de Deus, que ressuscitou a Jesus dentre os mortos, habita em vocÃªs\'.',
    'A ressurreiÃ§Ã£o Ã© ato da Trindade: Pai ressuscita o Filho pelo EspÃ­rito.',
    'O mesmo poder que ressuscitou Cristo estÃ¡ disponÃ­vel para os crentes.',
    'A ressurreiÃ§Ã£o Ã© a base da nossa justificaÃ§Ã£o (Romanos 4:25) e esperanÃ§a.'
  ],
  'versicosChave': [
    'Romanos 8:11',
    'Romanos 4:25',
    'Atos 2:24',
    '1 CorÃ­ntios 15:45'
  ],
  'tags': [
    'ressurreiÃ§Ã£o',
    'poder',
    'esperanÃ§a',
    'cristologia'
  ],
  'fontes': [
    "Fee, God's Empowering Presence",
    'Moo, The Epistle to the Romans'
  ]
},
  {
  'id': 'pn-012',
  'titulo': 'A GalardÃ£o do EspÃ­rito Santo na OraÃ§Ã£o',
  'categoria': 'Pneumatologia',
  'subcategoria': 'OraÃ§Ã£o',
  'conteudo': [
    'O EspÃ­rito Santo nos capacita a orar de acordo com a vontade de Deus.',
    'EfÃ©sios 6:18 ordena \'orando em todo tempo no EspÃ­rito\'.',
    'A oraÃ§Ã£o no EspÃ­rito nÃ£o Ã© necessariamente em lÃ­nguas, mas com dependÃªncia e fervor.',
    'O EspÃ­rito nos dÃ¡ palavras quando nÃ£o sabemos como orar.',
    'A oraÃ§Ã£o no EspÃ­rito Ã© uma oraÃ§Ã£o que se alinha com o carÃ¡ter e vontade de Deus.'
  ],
  'versicosChave': [
    'EfÃ©sios 6:18',
    'Judas 1:20',
    'Romanos 8:26-27',
    'Zacarias 12:10'
  ],
  'tags': [
    'oraÃ§Ã£o',
    'espÃ­rito santo',
    'vontade de deus',
    'fervor'
  ],
  'fontes': [
    'Moo, The Epistle to the Ephesios',
    'Packer, Keep in Step with the Spirit'
  ]
},
  {
  'id': 'pn-013',
  'titulo': 'Os Sete EspÃ­ritos de Deus (Apocalipse)',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Simbolismo',
  'conteudo': [
    'Apocalipse menciona \'os sete espÃ­ritos de Deus\' (Apocalipse 1:4, 4:5, 5:6).',
    'O nÃºmero sete representa completude â€” o EspÃ­rito Santo em Sua plenitude.',
    'IsaÃ­as 11:2 descreve sete manifestaÃ§Ãµes do EspÃ­rito sobre o Messias.',
    'Os sete espÃ­ritos podem representar as sete faculdades do EspÃ­rito: sabedoria, entendimento, conselho, fortaleza, conhecimento, piedade, temor do Senhor.',
    'A vela de sete pavios no candelabro de Apocalipse 4:5 representa o EspÃ­rito em plenitude.'
  ],
  'versicosChave': [
    'Apocalipse 1:4',
    'Apocalipse 4:5',
    'Apocalipse 5:6',
    'IsaÃ­as 11:2'
  ],
  'tags': [
    'sete espÃ­ritos',
    'apocalipse',
    'plenitude',
    'simbolismo'
  ],
  'fontes': [
    'Beale, The Book of Revelation',
    'Aune, Revelation 1-5'
  ]
},
  {
  'id': 'pn-014',
  'titulo': 'O EspÃ­rito Santo e os Sacramentos',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Eclesiologia',
  'conteudo': [
    'O EspÃ­rito Santo Ã© o agente que opera nos sacramentos/batismo e ceia.',
    'No batismo, o EspÃ­rito nos une a Cristo e selamos para o dia da redenÃ§Ã£o.',
    'Na ceia, o EspÃ­rito nos comunica a presenÃ§a espiritual de Cristo.',
    'Os sacramentos sÃ£o eficazes nÃ£o pela Ã¡gua ou pÃ£o, mas pela obra do EspÃ­rito.',
    'A ceia Ã© um meio de graÃ§a onde o EspÃ­rito nourishes os crentes.'
  ],
  'versicosChave': [
    '1 CorÃ­ntios 12:13',
    '1 CorÃ­ntios 10:16-17',
    'EfÃ©sios 5:18-20',
    'Romanos 6:3-4'
  ],
  'tags': [
    'sacramentos',
    'batismo',
    'ceia',
    'graÃ§a'
  ],
  'fontes': [
    'Calvino, Institutas IV.17',
    'Calvin, Institutes',
    'Calvin, Institutes IV.17'
  ]
},
  {
  'id': 'pn-015',
  'titulo': 'O EspÃ­rito Santo na Vida da Igreja',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Eclesiologia',
  'conteudo': [
    'A Igreja nasceu no dia de Pentecostes quando o EspÃ­rito Santo desceu (Atos 2).',
    'O EspÃ­rito distribui dons para edificaÃ§Ã£o da igreja (1 CorÃ­ntios 12:4-11).',
    'O EspÃ­rito guia a igreja em verdade (JoÃ£o 16:13).',
    'O EspÃ­rito sustenta a unidade da igreja (EfÃ©sios 4:3).',
    'Sem o EspÃ­rito, a igreja Ã© apenas uma organizaÃ§Ã£o humana.'
  ],
  'versicosChave': [
    'Atos 2:1-4',
    '1 CorÃ­ntios 12:4-11',
    'JoÃ£o 16:13',
    'EfÃ©sios 4:3'
  ],
  'tags': [
    'igreja',
    'pentecostes',
    'dons',
    'unidade'
  ],
  'fontes': [
    'Calvino, Institutas IV.3',
    'Ridderbos, The Coming of the Kingdom'
  ]
},
  {
  'id': 'an-006',
  'titulo': 'Miguel â€” O Arcanjo Guerreiro',
  'categoria': 'Angelologia',
  'subcategoria': 'Anjos Especiais',
  'conteudo': [
    'Miguel Ã© o Ãºnico anjo chamado de \'arcanjo\' na BÃ­blia (Judas 1:9).',
    'Seu nome significa \'Quem Ã© como Deus?\' â€” uma declaraÃ§Ã£o de humildade.',
    'Miguel Ã© retratado como guerreiro que combate SatanÃ¡s e seus anjos.',
    'Daniel 10-12 mostra Miguel como protetor de Israel.',
    'Apocalipse 12:7 descreve Miguel liderando a batalha contra o dragÃ£o.'
  ],
  'versicosChave': [
    'Judas 1:9',
    'Daniel 10:13',
    'Daniel 12:1',
    'Apocalipse 12:7'
  ],
  'tags': [
    'miguel',
    'arcanjo',
    'guerreiro',
    'protetor'
  ],
  'fontes': [
    'Calvino, ComentÃ¡rio a Daniel',
    'Bauckham, The Fate of the Dead'
  ]
},
  {
  'id': 'an-007',
  'titulo': 'Gabriel â€” O Mensageiro de Deus',
  'categoria': 'Angelologia',
  'subcategoria': 'Anjos Especiais',
  'conteudo': [
    'Gabriel Ã© o anjo mensageiro que comunicou planos importantes de Deus.',
    'Seu nome significa \'Deus Ã© meu guerreiro\'.',
    'Gabriel apareceu a Daniel para revelar o plano profÃ©tico (Daniel 8:16).',
    'Gabriel anunciou o nascimento de JoÃ£o Batista (Lucas 1:19) e de Jesus (Lucas 1:26-38).',
    'Gabriel Ã© descrito como \'que se apresentou diante de Deus\' â€” um anjo de alta posiÃ§Ã£o.'
  ],
  'versicosChave': [
    'Daniel 8:16',
    'Lucas 1:19',
    'Lucas 1:26-38',
    'Daniel 9:21'
  ],
  'tags': [
    'gabriel',
    'mensageiro',
    'anunciaÃ§Ã£o',
    'profecia'
  ],
  'fontes': [
    'Calvino, ComentÃ¡rio a Lucas',
    'Ellis, The Gospel of Luke'
  ]
},
  {
  'id': 'an-008',
  'titulo': 'Os Querubins â€” GuardiÃµes da GlÃ³ria de Deus',
  'categoria': 'Angelologia',
  'subcategoria': 'Hierarquia',
  'conteudo': [
    'Os querubins sÃ£o a ordem angelical associada Ã  presenÃ§a e glÃ³ria de Deus.',
    'Dois querubins de ouro cobriam a Arca da AlianÃ§a (ÃŠxodo 25:18-20).',
    'Ezequiel descreve criaturas com quatro faces (humana, leÃ£o, boi, Ã¡guia) e quatro asas.',
    'Os querubins guardaram o caminho para o Ã‰den apÃ³s a Queda (GÃªnesis 3:24).',
    'O tabernÃ¡culo e templo tinham imagens de querubins bordadas nas cortinas.'
  ],
  'versicosChave': [
    'ÃŠxodo 25:18-20',
    'Ezequiel 1:5-14',
    'GÃªnesis 3:24',
    'Salmo 80:1'
  ],
  'tags': [
    'querubins',
    'glÃ³ria',
    'arca',
    'santuÃ¡rio'
  ],
  'fontes': [
    'Calvino, ComentÃ¡rio a ÃŠxodo',
    'Block, The Book of Ezekiel'
  ]
},
  {
  'id': 'an-009',
  'titulo': 'Serafins â€” Adoradores da Santidade de Deus',
  'categoria': 'Angelologia',
  'subcategoria': 'Hierarquia',
  'conteudo': [
    'Os serafins sÃ£o mencionados apenas em IsaÃ­as 6:1-7.',
    'Seu nome significa \'ardentes\' â€” refletem o fogo da santidade divina.',
    'TÃªm seis asas: duas para cobrir o rosto, duas para cobrir os pÃ©s, duas para voar.',
    'Cantam \'Santos, santos, santos Ã© o Senhor dos ExÃ©rcitos; toda a terra estÃ¡ cheia da Sua glÃ³ria\'.',
    'Um serafim tocou os lÃ¡bios de IsaÃ­as com brasa, purificando-o para o ministÃ©rio profÃ©tico.'
  ],
  'versicosChave': [
    'IsaÃ­as 6:1-7',
    'IsaÃ­as 6:3'
  ],
  'tags': [
    'serafins',
    'santidade',
    'adoraÃ§Ã£o',
    'purificaÃ§Ã£o'
  ],
  'fontes': [
    'Calvino, ComentÃ¡rio a IsaÃ­as',
    'Oswalt, The Book of Isaiah, Chapters 1-39'
  ]
},
  {
  'id': 'an-010',
  'titulo': 'Os DemÃ´nios â€” OrganizaÃ§Ã£o e Atividade',
  'categoria': 'Angelologia',
  'subcategoria': 'Demonologia',
  'conteudo': [
    'Os demÃ´nios sÃ£o anjos caÃ­dos que servem a SatanÃ¡s contra o propÃ³sito de Deus.',
    'Eles sÃ£o organizados em hierarquia (EfÃ©sios 6:12 â€” principados, potestades).',
    'Os demÃ´nios podem possuir pessoas (Marcos 5:1-20 â€” o endemoninhado geraseno).',
    'Eles causam doenÃ§as, cegueira espiritual e engano doutrinÃ¡rio.',
    'Os demÃ´nios tremem diante de Cristo (Marcos 1:23-24) e serÃ£o julgados no final.'
  ],
  'versicosChave': [
    'EfÃ©sios 6:12',
    'Marcos 5:1-20',
    'Tiago 2:19',
    'Mateus 12:28'
  ],
  'tags': [
    'demÃ´nios',
    'hierarquia',
    'possessÃ£o',
    'guerra espiritual'
  ],
  'fontes': [
    'Calvino, Institutas I.14',
    "Fee, God's Empowering Presence"
  ]
},
  {
  'id': 'at-006',
  'titulo': 'A Alma Imortal â€” Debate TeolÃ³gico',
  'categoria': 'Antropologia',
  'subcategoria': 'Natureza',
  'conteudo': [
    'O debate sobre a imortalidade da alma tem raÃ­zes gregas e bÃ­blicas.',
    'PlatÃ£o ensinava a imortalidade natural da alma â€” a alma sobrevive Ã  morte por natureza.',
    'A BÃ­blia ensina a imortalidade condicional â€” a alma sobrevive pela graÃ§a de Deus.',
    'Os adventistas defendem o condicionalismo â€” os mortos dormem atÃ© a ressurreiÃ§Ã£o.',
    'A maioria dos cristÃ£os defende a imortalidade da alma como doutrina bÃ­blica.',
    'A verdade bÃ­blica central Ã© que Deus Ã© o senhor da vida e da morte.'
  ],
  'versicosChave': [
    'Daniel 12:2',
    'JoÃ£o 5:28-29',
    '2 CorÃ­ntios 5:8',
    'Filipenses 1:23'
  ],
  'tags': [
    'alma',
    'imortalidade',
    'condicionalismo',
    'morte'
  ],
  'fontes': [
    'Calvino, Institutas III.25',
    'Wright, Surprised by Hope',
    'Franke, The Character of Theology'
  ]
},
  {
  'id': 'at-007',
  'titulo': 'A CriaÃ§Ã£o do Homem â€” AdÃ£o e Eva',
  'categoria': 'Antropologia',
  'subcategoria': 'CriaÃ§Ã£o',
  'conteudo': [
    'AdÃ£o foi formado do pÃ³ da terra e recebeu o sopro de vida (GÃªnesis 2:7).',
    'Eva foi criada da costela de AdÃ£o â€” nÃ£o da cabeÃ§a (para dominÃ¡-la) nem dos pÃ©s (para pisÃ¡-la).',
    'O casamento foi instituÃ­do antes da Queda â€” Ã© criaÃ§Ã£o de Deus, nÃ£o invenÃ§Ã£o humana.',
    'A igualdade entre homem e mulher se baseia na imagem de Deus em ambos.',
    'A complementaridade dos sexos reflete a riqueza da imagem divina.'
  ],
  'versicosChave': [
    'GÃªnesis 2:7',
    'GÃªnesis 2:18-23',
    'GÃªnesis 1:27',
    'Mateus 19:4-6'
  ],
  'tags': [
    'criaÃ§Ã£o',
    'adÃ£o',
    'eva',
    'casamento',
    'complementaridade'
  ],
  'fontes': [
    'Calvino, ComentÃ¡rio a GÃªnesis',
    'Wenham, The Book of Genesis'
  ]
},
  {
  'id': 'at-008',
  'titulo': 'A Queda â€” ConsequÃªncias e Cursed',
  'categoria': 'Antropologia',
  'subcategoria': 'Hamartiologia',
  'conteudo': [
    'A Queda trouxe maldiÃ§Ãµes sobre a serpente, sobre a terra, e sobre a humanidade.',
    'A maldiÃ§Ã£o sobre a serpente â€” rastejar e ter inimizade com a descendÃªncia da mulher.',
    'A maldiÃ§Ã£o sobre a terra â€” esforÃ§o e suor para produzir alimento.',
    'A maldiÃ§Ã£o sobre a mulher â€” dor na concepÃ§Ã£o e no parto.',
    'A maldiÃ§Ã£o sobre o homem â€” trabalhar com suor atÃ© voltar Ã  terra.',
    'A promessa da redenÃ§Ã£o estÃ¡ na \'descendÃªncia da mulher\' (GÃªnesis 3:15) â€” proto-evangelho.'
  ],
  'versicosChave': [
    'GÃªnesis 3:14-19',
    'GÃªnesis 3:15',
    'Romanos 5:12',
    'Romanos 8:20-22'
  ],
  'tags': [
    'queda',
    'maldiÃ§Ã£o',
    'proto-evangelho',
    'consequÃªncias'
  ],
  'fontes': [
    'Calvino, ComentÃ¡rio a GÃªnesis',
    'Westermann, Genesis 1-11',
    'Wenham, The Book of Genesis'
  ]
},
  {
  'id': 'at-009',
  'titulo': 'A VocaÃ§Ã£o Humana â€” Trabalho e DomÃ­nio',
  'categoria': 'Antropologia',
  'subcategoria': 'VocaÃ§Ã£o',
  'conteudo': [
    'Deus deu ao ser humano a vocaÃ§Ã£o de \'cultivar e guardar\' o jardim (GÃªnesis 2:15).',
    'O trabalho nÃ£o Ã© maldiÃ§Ã£o da Queda, mas vocaÃ§Ã£o original â€” Deus trabalhou na criaÃ§Ã£o.',
    'O domÃ­nio sobre a criaÃ§Ã£o Ã© delegado, nÃ£o absoluto â€” somos mayordomos, nÃ£o donos.',
    'A vocaÃ§Ã£o humana inclui criatividade, responsabilidade e stewardship.',
    'A dignidade do trabalho se baseia em Deus ser trabalhador.'
  ],
  'versicosChave': [
    'GÃªnesis 2:15',
    'GÃªnesis 1:28',
    'Colossenses 3:23',
    'EfÃ©sios 2:10'
  ],
  'tags': [
    'vocaÃ§Ã£o',
    'trabalho',
    'domÃ­nio',
    'criatividade'
  ],
  'fontes': [
    'Calvino, Institutas I.13',
    'Wolters, Creation Regained',
    'Moltmann, God in Creation'
  ]
},
  {
  'id': 'cr-012',
  'titulo': 'A Dupla Natureza de Cristo â€” Deus e Homem',
  'categoria': 'Cristologia',
  'subcategoria': 'Natureza',
  'conteudo': [
    'Cristo Ã© plenamente Deus e plenamente homem â€” o mistÃ©rio da encarnaÃ§Ã£o.',
    'O ConcÃ­lio de CalcedÃ´nia (451 d.C.) definiu: duas naturezas, sem confusÃ£o, sem mudanÃ§a, sem divisÃ£o, sem separaÃ§Ã£o.',
    'NestÃ³rio separava as duas naturezas â€” foi condenado como heresia.',
    'Eutiques confundia as naturezas â€” monofisismo â€” tambÃ©m condenado.',
    'A uniÃ£o hipostÃ¡tica â€” as duas naturezas se unem em uma pessoa divina.',
    'A compreensÃ£o correta da pessoa de Cristo Ã© essencial para a salvaÃ§Ã£o.'
  ],
  'versicosChave': [
    'JoÃ£o 1:1-14',
    'Filipenses 2:5-11',
    'Colossenses 2:9',
    '1 TimÃ³teo 3:16'
  ],
  'tags': [
    'cristologia',
    'natureza',
    'calcedÃ´nia',
    'encarnaÃ§Ã£o'
  ],
  'fontes': [
    'Calvino, Institutas II.14',
    'Kelly, Early Christian Doctrines',
    'Pelikan, The Christian Tradition'
  ]
},
  {
  'id': 'cr-013',
  'titulo': 'A Obra de Cristo â€” Profeta, Sacerdote e Rei',
  'categoria': 'Cristologia',
  'subcategoria': 'OfÃ­cios',
  'conteudo': [
    'Cristo exerce trÃªs ofÃ­cios: profeto, sacerdote e rei.',
    'Como profeto, Cristo Ã© o Ãºltimo e supremo revelador de Deus (Hebreus 1:1-2).',
    'Como sacerdote, Cristo ofereceu Si mesmo como sacrifÃ­cio e intercede por nÃ³s (Hebreus 7:23-27).',
    'Como rei, Cristo governa a igreja e o universo com autoridade soberana.',
    'Os trÃªs ofÃ­cios sÃ£o inseparÃ¡veis â€” um ofÃ­cio qualifica os outros.'
  ],
  'versicosChave': [
    'DeuteronÃ´mio 18:15',
    'Hebreus 7:23-27',
    'EfÃ©sios 1:20-22',
    'JoÃ£o 18:37'
  ],
  'tags': [
    'profeta',
    'sacerdote',
    'rei',
    'ofÃ­cios'
  ],
  'fontes': [
    'Calvino, Institutas II.15',
    'Calvin, Institutes II.15',
    'Calvin, Institutes'
  ]
},
  {
  'id': 'cr-014',
  'titulo': 'A RessurreiÃ§Ã£o de Cristo â€” Realidade HistÃ³rica',
  'categoria': 'Cristologia',
  'subcategoria': 'RessurreiÃ§Ã£o',
  'conteudo': [
    'A ressurreiÃ§Ã£o de Cristo Ã© o fato central da fÃ© cristÃ£ â€” sem ela, a fÃ© Ã© vÃ£.',
    'A evidÃªncia histÃ³rica inclui: tÃºmulo vazio, mÃºltiplas apariÃ§Ãµes, transformaÃ§Ã£o dos discÃ­pulos.',
    'As apariÃ§Ãµes ressurretas foram a 12 pessoas e grupos ao longo de 40 dias.',
    'A Igreja primitiva testificou a ressurreiÃ§Ã£o sob risco de morte â€” ninguÃ©m morre por algo que sabe ser falso.',
    'A ressurreiÃ§Ã£o Ã© uma obra sobrenatural de Deus â€” nÃ£o Ã© uma metÃ¡fora ou experiÃªncia subjetiva.'
  ],
  'versicosChave': [
    '1 CorÃ­ntios 15:3-8',
    'Mateus 28:5-10',
    'Atos 1:3',
    '1 CorÃ­ntios 15:14'
  ],
  'tags': [
    'ressurreiÃ§Ã£o',
    'histÃ³rica',
    'evidÃªncia',
    'fÃ©'
  ],
  'fontes': [
    'Calvino, Institutas II.16',
    'Wright, The Resurrection of the Son of God',
    'N.T. Wright, Surprised by Hope'
  ]
},
  {
  'id': 'cr-015',
  'titulo': 'A AscensÃ£o de Cristo â€” ExaltaÃ§Ã£o e IntercessÃ£o',
  'categoria': 'Cristologia',
  'subcategoria': 'ExaltaÃ§Ã£o',
  'conteudo': [
    'A ascensÃ£o de Cristo foi Sua exaltaÃ§Ã£o Ã  direita do Pai.',
    'Atos 1:9-11 descreve a ascensÃ£o â€” Cristo foi recebido em uma nuvem.',
    'A ascensÃ£o nÃ£o Ã© desaparecimento â€” Cristo continua presente pelo EspÃ­rito.',
    'Cristo ascendeu como Sumo Sacerdote que ofereceu Si mesmo.',
    'A ascensÃ£o garante Sua intercessÃ£o contÃ­nua por nÃ³s (Hebreus 7:25).'
  ],
  'versicosChave': [
    'Atos 1:9-11',
    'EfÃ©sios 1:20-22',
    'Hebreus 7:25',
    'Filipenses 2:9-11'
  ],
  'tags': [
    'ascensÃ£o',
    'exaltaÃ§Ã£o',
    'intercessÃ£o',
    'sumo sacerdote'
  ],
  'fontes': [
    'Calvino, Institutas II.16',
    "O'Brien, The Ascension of Christ in the New Testament"
  ]
},
  {
  'id': 'cr-016',
  'titulo': 'A Segunda Vinda de Cristo â€” Parusia',
  'categoria': 'Cristologia',
  'subcategoria': 'Escatologia',
  'conteudo': [
    'Cristo voltarÃ¡ pessoalmente, visivelmente e gloriamente (Atos 1:11).',
    'A parusia serÃ¡ inesperada â€” como um ladrÃ£o na noite (1 Tessalonicenses 5:2).',
    'HaverÃ¡ sinais antes da volta: guerras, fomes, terremotos, apostasia.',
    'A volta de Cristo trarÃ¡ consumaÃ§Ã£o do reino, ressurreiÃ§Ã£o dos mortos e juÃ­zo final.',
    'Vivemos na era da igreja, entre a primeira e a segunda vinda â€” \'jÃ¡ mas ainda nÃ£o\'.'
  ],
  'versicosChave': [
    'Atos 1:11',
    '1 Tessalonicenses 4:16-17',
    'Mateus 24:30-31',
    'Apocalipse 19:11-16'
  ],
  'tags': [
    'parusia',
    'segunda vinda',
    'escatologia',
    'juÃ­zo'
  ],
  'fontes': [
    'Calvino, Institutas III.25',
    'Hoekema, The Bible and the Future',
    'Ladd, A Theology of the New Testament'
  ]
},
  {
  'id': 'so-034',
  'titulo': 'A RegeneraÃ§Ã£o â€” Nova Criatura em Cristo',
  'categoria': 'Soteriologia',
  'subcategoria': 'Ordo Salutis',
  'conteudo': [
    'A regeneraÃ§Ã£o Ã© a obra do EspÃ­rito Santo que nos faz nascer de novo.',
    'Ã‰ um ato divino, nÃ£o humano â€” o homem nÃ£o pode regenerar a si mesmo.',
    'A regeneraÃ§Ã£o produz fÃ© e arrependimento â€” nÃ£o Ã© resultado deles.',
    'Somos \'nova criatura\' â€” o velho passou, eis que tudo se fez novo (2 CorÃ­ntios 5:17).',
    'A regeneraÃ§Ã£o Ã© instantaneous e irreversÃ­vel â€” uma vez regenerado, sempre regenerado.'
  ],
  'versicosChave': [
    'JoÃ£o 3:3-7',
    '2 CorÃ­ntios 5:17',
    'Tito 3:5',
    '1 Pedro 1:23'
  ],
  'tags': [
    'regeneraÃ§Ã£o',
    'novo nascimento',
    'espÃ­rito santo',
    'nova criatura'
  ],
  'fontes': [
    'Calvino, Institutas III.1',
    'Bavinck, Reformed Dogmatics'
  ]
},
  {
  'id': 'so-035',
  'titulo': 'A EleiÃ§Ã£o â€” Escolhidos pela GraÃ§a de Deus',
  'categoria': 'Soteriologia',
  'subcategoria': 'Doutrina',
  'conteudo': [
    'A eleiÃ§Ã£o Ã© a escolha soberana de Deus de salvar indivÃ­duos para Si.',
    'EfÃ©sios 1:4 â€” \'nos escolheu Nele antes da fundaÃ§Ã£o do mundo\'.',
    'A eleiÃ§Ã£o Ã© baseada na graÃ§a, nÃ£o nos mÃ©ritos humanos.',
    'O calvinismo ensina eleiÃ§Ã£o incondicional â€” Deus escolhe sem referÃªncia Ã  fÃ© prevista.',
    'O arminianismo ensina eleiÃ§Ã£o condicional â€” Deus escolhe baseado na presciÃªncia da fÃ©.',
    'A eleiÃ§Ã£o nÃ£o anula a responsabilidade humana â€” Deus usa meios (pregaÃ§Ã£o, evangelismo).'
  ],
  'versicosChave': [
    'EfÃ©sios 1:4-5',
    'Romanos 8:28-30',
    '2 TimÃ³teo 1:9',
    '1 Pedro 1:1-2'
  ],
  'tags': [
    'eleiÃ§Ã£o',
    'predestinaÃ§Ã£o',
    'graÃ§a',
    'soberania'
  ],
  'fontes': [
    'Calvino, Institutas III.21',
    'Arminio, Works',
    'Pinnock, The Grace of God'
  ]
},
  {
  'id': 'so-036',
  'titulo': 'A GlorificaÃ§Ã£o â€” O Destino Final do Crente',
  'categoria': 'Soteriologia',
  'subcategoria': 'Ordo Salutis',
  'conteudo': [
    'A glorificaÃ§Ã£o Ã© a consumaÃ§Ã£o final da salvaÃ§Ã£o â€” ser feito semelhante a Cristo.',
    'Romanos 8:30 â€” \'aos que justificou, esses tambÃ©m glorificou\'.',
    'A glorificaÃ§Ã£o inclui a ressurreiÃ§Ã£o do corpo e a TransformaÃ§Ã£o total.',
    'Seremos como Cristo porque O viremos como Ele Ã© (1 JoÃ£o 3:2).',
    'A glorificaÃ§Ã£o Ã© a etapa final do ordo salutis â€” aperfeiÃ§oamento completo.'
  ],
  'versicosChave': [
    'Romanos 8:30',
    '1 JoÃ£o 3:2',
    'Filipenses 3:20-21',
    '1 CorÃ­ntios 15:51-53'
  ],
  'tags': [
    'glorificaÃ§Ã£o',
    'ressurreiÃ§Ã£o',
    'perfeiÃ§Ã£o',
    'destino'
  ],
  'fontes': [
    'Calvino, Institutas III.25',
    'Hoekema, The Bible and the Future'
  ]
},
  {
  'id': 'ap-004',
  'titulo': 'O Argumento do Design â€” Teleologia',
  'categoria': 'Apologetica',
  'subcategoria': 'Argumentos',
  'conteudo': [
    'O argumento teleolÃ³gico observa a ordem e propÃ³sito na criaÃ§Ã£o como evidÃªncia de um Designer.',
    'A complexidade irredutÃ­vel dos sistemas biolÃ³gicos aponta para design inteligente.',
    'O ajuste fino dos constantes cÃ³smicos (gravidade, forÃ§a nuclear) sugere um Criador.',
    'William Paley popularizou o argumento do relojoeiro â€” um relÃ³gio implica um relojoeiro.',
    'O argumento nÃ£o prova o Deus bÃ­blico, mas estabelece a existÃªncia de um Designer.'
  ],
  'versicosChave': [
    'Salmos 19:1',
    'Romanos 1:20',
    'Hebreus 11:3',
    'Salmo 139:14'
  ],
  'tags': [
    'teleologia',
    'design',
    'apologÃ©tica',
    'argumento'
  ],
  'fontes': [
    'Paley, Natural Theology',
    "Behe, Darwin's Black Box",
    'Dawkins, The Blind Watchmaker (crÃ­tica)'
  ]
},
  {
  'id': 'ap-005',
  'titulo': 'A ResurreiÃ§Ã£o â€” EvidÃªncia HistÃ³rica',
  'categoria': 'Apologetica',
  'subcategoria': 'EvidÃªncia',
  'conteudo': [
    'A ressurreiÃ§Ã£o de Cristo Ã© o fato mais bem atestado da histÃ³ria antiga.',
    'As evidÃªncias incluem: tÃºmulo vazio, apariÃ§Ãµes, mudanÃ§a dos discÃ­pulos, origem da igreja.',
    'O tÃºmulo vazio Ã© atestado por fontes hostis (relato da guarda em Mateus 28:11-15).',
    'As apariÃ§Ãµes foram a mÃºltiplas pessoas, em diferentes ocasiÃµes, ao longo de 40 dias.',
    'A transformaÃ§Ã£o dos discÃ­pulos â€” de covardes a mÃ¡rtires â€” Ã© inexplicÃ¡vel sem a ressurreiÃ§Ã£o.',
    'A origem da igreja no JudaÃ­smo Ã© impossÃ­vel sem a ressurreiÃ§Ã£o.'
  ],
  'versicosChave': [
    '1 CorÃ­ntios 15:3-8',
    'Atos 1:3',
    'Mateus 28:5-10',
    'Lucas 24:36-49'
  ],
  'tags': [
    'ressurreiÃ§Ã£o',
    'evidÃªncia',
    'histÃ³rica',
    'apologÃ©tica'
  ],
  'fontes': [
    'Wright, The Resurrection of the Son of God',
    'Habermas, The Ressurection of Jesus'
  ]
},
  {
  'id': 'hm-006',
  'titulo': 'A Regra de Ouro da InterpretaÃ§Ã£o',
  'categoria': 'HermenÃªutica',
  'subcategoria': 'PrincÃ­pios',
  'conteudo': [
    'A regra de ouro: interprete sempre pela Escritura mais clara.',
    'O princÃ­pio da analogia da fÃ© â€” passagens obscuras devem ser interpretadas pelas claras.',
    'Nenhuma passagem pode ensinar algo que contradiga o ensino bÃ­blico claro.',
    'O contexto imediato (versÃ­culo, capÃ­tulo) e o remoto (livro, BÃ­blia) sÃ£o importantes.',
    'A interpretaÃ§Ã£o literal Ã© a regra geral â€” sÃ³ se recorre ao sentido figurado quando o contexto exige.'
  ],
  'versicosChave': [
    '2 Pedro 1:20-21',
    '2 TimÃ³teo 2:15',
    '1 CorÃ­ntios 2:13',
    'Salmo 119:105'
  ],
  'tags': [
    'hermenÃªutica',
    'interpretaÃ§Ã£o',
    'regra de ouro',
    'contexto'
  ],
  'fontes': [
    'Calvino, Institutas I.7',
    'Fee, New Testament Exegesis',
    'Kaiser & Silva, Introduction to Biblical Hermeneutics'
  ]
},
  {
  'id': 'hm-007',
  'titulo': 'Tipologia BÃ­blica â€” Sombra e Realidade',
  'categoria': 'HermenÃªutica',
  'subcategoria': 'MÃ©todos',
  'conteudo': [
    'Tipologia Ã© o estudo de tipos â€” pessoas, eventos ou instituiÃ§Ãµes do AT que prefiguram realidades no NT.',
    'AdÃ£o Ã© tipo de Cristo (Romanos 5:14) â€” a queda de um, a redenÃ§Ã£o do outro.',
    'O sacrifÃ­cio do cordeiro pascal prefigura Cristo, o Cordeiro de Deus.',
    'O tabernÃ¡culo e o templo sÃ£o sombras da realidade celestial.',
    'A tipologia nÃ£o Ã© alegoria â€” os tipos tÃªm fundamento histÃ³rico e se cumprirÃ£o literalmente.'
  ],
  'versicosChave': [
    'Romanos 5:14',
    '1 CorÃ­ntios 15:45',
    'Hebreus 8:5',
    '1 CorÃ­ntios 10:11'
  ],
  'tags': [
    'tipologia',
    'AT',
    'NT',
    'sombra',
    'realidade'
  ],
  'fontes': [
    'Kline, The Structure of Biblical Authority',
    'Gundry, The Use of the Old Testament in the New Testament'
  ]
},
  {
  'id': 'et-025',
  'titulo': 'A BioÃ©tica CristÃ£ â€” Aborto, EutanÃ¡sia e Engenharia GenÃ©tica',
  'categoria': 'Ã‰tica CristÃ£',
  'subcategoria': 'ContemporÃ¢neo',
  'conteudo': [
    'A bioÃ©tica cristÃ£ aplica princÃ­pios bÃ­blicos a questÃµes modernas de vida.',
    'Aborto: a vida humana comeÃ§a na concepÃ§Ã£o (Salmo 139:13-16) â€” Ã© vida preciosa.',
    'EutanÃ¡sia: a vida Ã© dom de Deus â€” nÃ³s nÃ£o somos donos dela.',
    'Engenharia genÃ©tica: manipular a criaÃ§Ã£o de Deus levanta questÃµes Ã©ticas profundas.',
    'CÃ©lulas-tronco: a dignidade humana deve ser respeitada em qualquer pesquisa.',
    'A base Ã©tica Ã© a imagem de Deus em todo ser humano.'
  ],
  'versicosChave': [
    'Salmo 139:13-16',
    'JÃ³ 1:21',
    'GÃªnesis 1:27',
    '1 CorÃ­ntios 6:19-20'
  ],
  'tags': [
    'bioÃ©tica',
    'aborto',
    'eutanÃ¡sia',
    'Ã©tica'
  ],
  'fontes': [
    'Calvino, Institutas III.7',
    'Calvin, Institutes III.7'
  ]
},
  {
  'id': 'et-026',
  'titulo': 'A Ã‰tica do Trabalho â€” Honestidade e ExcelÃªncia',
  'categoria': 'Ã‰tica CristÃ£',
  'subcategoria': 'PrÃ¡tica',
  'conteudo': [
    'O trabalho Ã© vocaÃ§Ã£o divina â€” feito para a glÃ³ria de Deus (1 CorÃ­ntios 10:31).',
    'A honestidade no trabalho Ã© mandamento â€” \'nÃ£o furtarÃ¡s\' inclui roubar tempo.',
    'A excelÃªncia no trabalho Ã© testemunho â€” \'tudo quanto fizerdes, fazei de coraÃ§Ã£o\' (Colossenses 3:23).',
    'A ganÃ¢ncia Ã© idolatria â€” o dinheiro nÃ£o pode ser o alvo da vida.',
    'O descanso semanal Ã© mandamento â€” Deus descansou e nos ordena fazer o mesmo.'
  ],
  'versicosChave': [
    '1 CorÃ­ntios 10:31',
    'Colossenses 3:23',
    'EfÃ©sios 4:28',
    'Ã‰xodo 20:8-11'
  ],
  'tags': [
    'trabalho',
    'honestidade',
    'excelÃªncia',
    'descanso'
  ],
  'fontes': [
    'Calvino, Institutas II.10',
    'Wolters, Creation Regained'
  ]
},
  {
  'id': 'mi-017',
  'titulo': 'A Grande ComissÃ£o â€” Mandato MissionÃ¡rio',
  'categoria': 'Missiologia',
  'subcategoria': 'Fundamento',
  'conteudo': [
    'Mateus 28:18-20 Ã© a Grande ComissÃ£o â€” o mandato de Cristo para a Igreja.',
    'A autoridade de Cristo Ã© a base: \'Toda autoridade me Ã© dada\'.',
    'O alvo Ã© universal: \'todas as naÃ§Ãµes\' â€” sem exceÃ§Ã£o.',
    'O mÃ©todo Ã© relacional: \'fazendo discÃ­pulos\' â€” nÃ£o apenas convertidos.',
    'A-promessa Ã© presence: \'estarei convosco todos os dias\'.',
    'A obediÃªncia Ã  Grande ComissÃ£o Ã© teste de amor a Cristo.'
  ],
  'versicosChave': [
    'Mateus 28:18-20',
    'Marcos 16:15',
    'Lucas 24:46-48',
    'Atos 1:8'
  ],
  'tags': [
    'grande comissÃ£o',
    'missÃ£o',
    'evangelismo',
    'discipulado'
  ],
  'fontes': [
    'Calvino, Institutas III.21',
    'Ridderbos, The Coming of the Kingdom'
  ]
},
  {
  'id': 'mi-018',
  'titulo': 'A UrgÃªncia da SalvaÃ§Ã£o â€” Evangelismo',
  'categoria': 'Missiologia',
  'subcategoria': 'PrÃ¡tica',
  'conteudo': [
    'O evangelismo Ã© urgente porque as almas estÃ£o perdidas sem Cristo.',
    'Romanos 10:14-15 â€” \'como crerÃ£o naquele em quem nÃ£o creram? Como crerÃ£o naquele de quem nÃ£o ouviram?\'',
    'A mensagem Ã© simples: arrependimento e fÃ© em Cristo.',
    'O mÃ©todo deve ser contextualizado sem comprometer a verdade.',
    'O fruto do evangelismo Ã© a glÃ³ria de Deus â€” nÃ£o nÃºmeros.'
  ],
  'versicosChave': [
    'Romanos 10:14-15',
    '2 CorÃ­ntios 5:20',
    'Atos 4:12',
    '1 CorÃ­ntios 9:22'
  ],
  'tags': [
    'evangelismo',
    'urgÃªncia',
    'salvaÃ§Ã£o',
    'missÃ£o'
  ],
  'fontes': [
    'Calvino, Institutas III.21',
    'Stott, The Contemporary Mission',
    'Packer, Evangelism and the Sovereignty of God'
  ]
},
  {
  'id': 'cc-061',
  'titulo': 'Cristianismo e Redes Sociais',
  'categoria': 'QuestÃµes ContemporÃ¢neas',
  'subcategoria': 'Cultura Digital',
  'conteudo': [
    'As redes sociais sÃ£o ferramentas que podem ser usadas para o evangelho.',
    'O perigo da \'fÃ© de Instagram\' â€” superficialidade e aparÃªncia.',
    'A comunidade online pode complementar, mas nÃ£o substituir a igreja local.',
    'O cuidado com a lÃ­ngua nas redes â€” \'nenhuma palavra corrupta saia da boca\'.',
    'A internet como campo missionÃ¡rio â€” oportunidades para proclamar Cristo.'
  ],
  'versicosChave': [
    'EfÃ©sios 4:29',
    'Colossenses 4:6',
    '1 Pedro 3:15',
    'Hebreus 10:24-25'
  ],
  'tags': [
    'redes sociais',
    'cultura digital',
    'evangelismo',
    'comunidade'
  ],
  'fontes': [
    'Calvino, Institutas III.6',
    'Calvin, Institutes III.6'
  ]
},
  {
  'id': 'cc-062',
  'titulo': 'Cristianismo e CiÃªncia â€” Harmonia ou Conflito?',
  'categoria': 'QuestÃµes ContemporÃ¢neas',
  'subcategoria': 'FÃ© e CiÃªncia',
  'conteudo': [
    'A relaÃ§Ã£o entre fÃ© e ciÃªncia Ã© complexa â€” hÃ¡ conflito, independÃªncia e integraÃ§Ã£o.',
    'O conflito (Dawkins, Hitchens) â€” ciÃªncia explica tudo, Deus Ã© desnecessÃ¡rio.',
    'A independÃªncia (Gould) â€” ciÃªncia e fÃ© respondem a perguntas diferentes.',
    'A integraÃ§Ã£o (Polkinghorne) â€” ciÃªncia e fÃ© se complementam na busca da verdade.',
    'A BÃ­blia nÃ£o Ã© livro de ciÃªncia â€” Ã© revelaÃ§Ã£o de Deus sobre como ter relaÃ§Ã£o com Ele.',
    'A criaÃ§Ã£o testifica a Deus â€” \'os cÃ©us declaram a glÃ³ria de Deus\' (Salmo 19:1).'
  ],
  'versicosChave': [
    'Salmo 19:1',
    'Romanos 1:20',
    'ProvÃ©rbios 25:2',
    'Eclesiastes 7:24'
  ],
  'tags': [
    'ciÃªncia',
    'fÃ©',
    'criaÃ§Ã£o',
    'evoluÃ§Ã£o',
    'integraÃ§Ã£o'
  ],
  'fontes': [
    'Calvino, Institutas I.14',
    'Polkinghorne, Belief in God in an Age of Science'
  ]
},
  {
  'id': 'ty-013',
  'titulo': 'O TabernÃ¡culo â€” Tipo de Cristo',
  'categoria': 'Tipologia',
  'subcategoria': 'AT',
  'conteudo': [
    'O tabernÃ¡culo Ã© um dos mais ricos tipos de Cristo no AT.',
    'A porta do tabernÃ¡culo â€” \'Eu sou a porta\' (JoÃ£o 10:7).',
    'O altar do Holocausto â€” Cristo Ã© o sacrifÃ­cio perfeito.',
    'A mesa dos pÃ£es da proposiÃ§Ã£o â€” Cristo Ã© o pÃ£o da vida.',
    'O candelabro â€” Cristo Ã© a luz do mundo.',
    'O propiciatÃ³rio â€” Cristo Ã© nossa propiciaÃ§Ã£o.'
  ],
  'versicosChave': [
    'ÃŠxodo 25-27',
    'JoÃ£o 10:7',
    'JoÃ£o 6:35',
    'JoÃ£o 8:12'
  ],
  'tags': [
    'tabernÃ¡culo',
    'tipo',
    'cristo',
    'sacrifÃ­cio'
  ],
  'fontes': [
    'Calvino, ComentÃ¡rio a ÃŠxodo',
    'Kline, The Structure of Biblical Authority'
  ]
},
  {
  'id': 'ty-014',
  'titulo': 'JosÃ© â€” Tipo de Cristo',
  'categoria': 'Tipologia',
  'subcategoria': 'AT',
  'conteudo': [
    'JosÃ© Ã© um dos tipos mais completos de Cristo no AT.',
    'Amado pelo pai, odiado pelos irmÃ£os â€” Cristo rejeitado por Israel.',
    'Vendido por 20 peÃ§as de prata â€” Judas traiu Cristo por 30.',
    'Desceu ao Egito (morte) e ressurgiu Ã  glÃ³ria â€” ressurreiÃ§Ã£o.',
    'Proveu alimento para os irmÃ£os â€” Cristo Ã© o pÃ£o da vida.',
    'No final, os irmÃ£os se prostraram â€” todo joelho se dobrarÃ¡.'
  ],
  'versicosChave': [
    'GÃªnesis 37-50',
    'Filipenses 2:10-11',
    'JoÃ£o 6:35'
  ],
  'tags': [
    'josÃ©',
    'tipo',
    'cristo',
    'ressurreiÃ§Ã£o'
  ],
  'fontes': [
    'Calvino, ComentÃ¡rio a GÃªnesis',
    'Kline, The Structure of Biblical Authority'
  ]
},
  {
  'id': 'lp-011',
  'titulo': 'JÃ³ â€” O Problema do Sofrimento',
  'categoria': 'Livros PoÃ©ticos',
  'subcategoria': 'JÃ³',
  'conteudo': [
    'JÃ³ Ã© a resposta bÃ­blica ao problema do sofrimento do inocente.',
    'JÃ³ nÃ£o sofreu por causa de pecado â€” Deus o testemunhou como justo.',
    'Os conselheiros de JÃ³ ofereceram teologia retributiva â€” sofrimento = pecado.',
    'Deus respondeu do redemoinho â€” nÃ£o explicou o sofrimento, mas revelou Sua soberania.',
    'A liÃ§Ã£o final: Deus Ã© soberano, e nÃ³s somos limitados para compreender Seus caminhos.',
    'JÃ³ Ã© tipo de Cristo â€” sofreu injustamente e foi restaurado.'
  ],
  'versicosChave': [
    'JÃ³ 1:1',
    'JÃ³ 42:5-6',
    'Romanos 8:28',
    '1 Pedro 4:12-19'
  ],
  'tags': [
    'jÃ³',
    'sofrimento',
    'soberania',
    'paciÃªncia'
  ],
  'fontes': [
    'Calvino, ComentÃ¡rio a JÃ³',
    'Clines, Job 1-20',
    'Anderson, Out of the Whirlwind'
  ]
},
  {
  'id': 'bi-006',
  'titulo': 'A InerrÃ¢ncia BÃ­blica',
  'categoria': 'Bibliologia',
  'subcategoria': 'Natureza',
  'conteudo': [
    'A inerrÃ¢ncia bÃ­blica afirma que as Escrituras sÃ£o verdadeiras em tudo o que afirmam.',
    'A BÃ­blia Ã© infalÃ­vel em tudo o que ensina â€” nÃ£o pode errar em doutrina, histÃ³ria ou ciÃªncia.',
    'A inerrÃ¢ncia se baseia na natureza de Deus â€” Ele nÃ£o pode mentir (Hebreus 6:18).',
    'A BÃ­blia Ã© a palavra de Deus, mas foi escrita por homens â€” inspiraÃ§Ã£o divina e humanidade simultÃ¢neas.',
    'A inerrÃ¢ncia nÃ£o significa que a BÃ­blia seja um livro de ciÃªncia ou histÃ³ria completa.'
  ],
  'versicosChave': [
    '2 TimÃ³teo 3:16',
    '2 Pedro 1:21',
    'Hebreus 6:18',
    'Salmo 12:6'
  ],
  'tags': [
    'inerrÃ¢ncia',
    'inspiraÃ§Ã£o',
    'verdade',
    'autoridade'
  ],
  'fontes': [
    'Warfield, The Inspiration and Authority of Scripture',
    'Sproul, Knowing Scripture'
  ]
},
  {
  'id': 'bi-007',
  'titulo': 'A CanonizaÃ§Ã£o das Escrituras',
  'categoria': 'Bibliologia',
  'subcategoria': 'Canon',
  'conteudo': [
    'O cÃ¢non bÃ­blico Ã© a lista dos livros reconhecidos como inspirados por Deus.',
    'O AT foi reconhecido gradualmente â€” a maioria dos livros era aceita no sÃ©culo I.',
    'O NT foi reconhecido por critÃ©rios: apostolicidade, ortodoxia, uso litÃºrgico.',
    'O ConcÃ­lio de Hipona (393 d.C.) confirmou o cÃ¢non do NT.',
    'O EspÃ­rito Santo guiou a Igreja no reconhecimento dos livros canÃ´nicos.'
  ],
  'versicosChave': [
    '2 Pedro 1:20-21',
    '2 TimÃ³teo 3:16-17',
    'Apocalipse 22:18-19'
  ],
  'tags': [
    'canon',
    'cÃ¢none',
    'livros',
    'reconhecimento'
  ],
  'fontes': [
    'Metzger, The Canon of the New Testament',
    'KÃ¶stenberger, The Heresy of the Canon'
  ]
},
  {
  'id': 'bi-008',
  'titulo': 'A TraduÃ§Ã£o BÃ­blica â€” PrincÃ­pios e Desafios',
  'categoria': 'Bibliologia',
  'subcategoria': 'TraduÃ§Ã£o',
  'conteudo': [
    'A traduÃ§Ã£o bÃ­blica Ã© essencial para que todos os povos ouÃ§am a Palavra.',
    'Existem duas filosofias: formalismo (sentenÃ§a a sentenÃ§a) e dinamicismo (pensÃ£o a pensÃ£o).',
    'A KJV Ã© formal; a NVI Ã© mais dinÃ¢mica. Ambas tÃªm valor.',
    'Nenhuma traduÃ§Ã£o Ã© perfeita â€” todas sÃ£o approximations da verdade original.',
    'A traduÃ§Ã£o deve respeitar: fidelidade ao original, compreensibilidade no idioma, estilo natural.'
  ],
  'versicosChave': [
    'Atos 2:6-11',
    '1 CorÃ­ntios 14:19',
    'EfÃ©sios 6:19'
  ],
  'tags': [
    'traduÃ§Ã£o',
    'versÃ£o',
    'traduÃ§Ã£o formal',
    'traduÃ§Ã£o dinÃ¢mica'
  ],
  'fontes': [
    'Nida, The Theory and Practice of Translation',
    'Carson, The King James Version Debate'
  ]
},
  {
  'id': 'bi-009',
  'titulo': 'A IluminaÃ§Ã£o do EspÃ­rito na InterpretaÃ§Ã£o',
  'categoria': 'Bibliologia',
  'subcategoria': 'InterpretaÃ§Ã£o',
  'conteudo': [
    'O EspÃ­rito Santo ilumina a mente do crente para compreender as Escrituras.',
    'A iluminaÃ§Ã£o nÃ£o substitui o estudo â€” capacita o estudo.',
    '1 CorÃ­ntios 2:10-14 â€” \'o homem natural nÃ£o compreende as coisas do EspÃ­rito\'.',
    'A iluminaÃ§Ã£o Ã© necessÃ¡ria porque oäººå¿ƒ pecador Ã© hostil Ã  verdade divina.',
    'O estudo bÃ­blico deve ser feito com oraÃ§Ã£o, dependÃªncia do EspÃ­rito e humildade.'
  ],
  'versicosChave': [
    '1 CorÃ­ntios 2:10-14',
    'JoÃ£o 16:13',
    'Salmo 119:18'
  ],
  'tags': [
    'iluminaÃ§Ã£o',
    'espÃ­rito santo',
    'interpretaÃ§Ã£o',
    'compreeensÃ£o'
  ],
  'fontes': [
    'Calvino, Institutas I.7',
    'Fee, New Testament Exegesis'
  ]
},
  {
  'id': 'bi-010',
  'titulo': 'A Autoridade da BÃ­blia â€” Sola Scriptura',
  'categoria': 'Bibliologia',
  'subcategoria': 'Autoridade',
  'conteudo': [
    'Sola Scriptura Ã© o princÃ­pio reformado de que a BÃ­blia Ã© a autoridade suprema.',
    'A BÃ­blia Ã© a norma normans non normata â€” a norma que normatiza e nÃ£o Ã© normatizada.',
    'A tradiÃ§Ã£o tem valor, mas estÃ¡ sujeita Ã  Escritura.',
    'O magistÃ©rio da Igreja Ã© Ãºtil, mas nÃ£o infalÃ­vel.',
    'A autoridade da BÃ­blia Ã© auto-testemunhada â€” ela claims ser Palavra de Deus.'
  ],
  'versicosChave': [
    '2 TimÃ³teo 3:16-17',
    'IsaÃ­as 40:8',
    'Mateus 24:35',
    'Hebreus 4:12'
  ],
  'tags': [
    'sola scriptura',
    'autoridade',
    'tradiÃ§Ã£o',
    'reforma'
  ],
  'fontes': [
    'Calvino, Institutas I.7-8',
    'Lutero, Sobre a EscravidÃ£o BabilÃ´nica'
  ]
},
  {
  'id': 'bi-011',
  'titulo': 'A PersistÃªncia da Palavra de Deus',
  'categoria': 'Bibliologia',
  'subcategoria': 'Natureza',
  'conteudo': [
    'A Palavra de Deus Ã© viva e eficaz â€” mais afiada que espada de dois gumes.',
    'As Escrituras nÃ£o podem ser quebradas (JoÃ£o 10:35).',
    'A Palavra de Deus dura para sempre (IsaÃ­as 40:8).',
    'O cÃ©u e a terra passarÃ£o, mas as palavras de Jesus nÃ£o passarÃ£o.',
    'A Palavra de Deus Ã© fonte de vida, luz e verdade.'
  ],
  'versicosChave': [
    'Hebreus 4:12',
    'IsaÃ­as 40:8',
    'Mateus 24:35',
    'JoÃ£o 10:35'
  ],
  'tags': [
    'palavra de deus',
    'persistÃªncia',
    'eficÃ¡cia',
    'eternidade'
  ],
  'fontes': [
    'Calvino, Institutas I.7',
    'Calvin, Institutes I.7'
  ]
},
  {
  'id': 'so-037',
  'titulo': 'A PropiciaÃ§Ã£o â€” A Ira de Deus Satisfeita',
  'categoria': 'Soteriologia',
  'subcategoria': 'ExpiaÃ§Ã£o',
  'conteudo': [
    'A propiciaÃ§Ã£o Ã© a satisfaÃ§Ã£o da ira de Deus pelo sacrifÃ­cio de Cristo.',
    'Romanos 3:25 â€” Deus propiciou a Si mesmo atravÃ©s de Cristo.',
    'A propiciaÃ§Ã£o nÃ£o Ã© Deus sendo satisfeito â€” Ã© Deus satisfez Sua prÃ³pria justiÃ§a.',
    'O termo \'propiciaÃ§Ã£o\' Ã© controverso â€” alguns preferem \'expiÃ§Ã£o\'.',
    'A propiciaÃ§Ã£o Ã© particular â€” Cristo morreu por Seu povo.'
  ],
  'versicosChave': [
    'Romanos 3:25',
    '1 JoÃ£o 2:2',
    '1 JoÃ£o 4:10',
    'Hebreus 2:17'
  ],
  'tags': [
    'propiciaÃ§Ã£o',
    'ira de deus',
    'satisfaÃ§Ã£o',
    'justiÃ§a'
  ],
  'fontes': [
    'Calvino, Institutas II.16',
    'Calvin, Institutes II.16'
  ]
},
  {
  'id': 'so-038',
  'titulo': 'A AdoÃ§Ã£o â€” Filhos de Deus',
  'categoria': 'Soteriologia',
  'subcategoria': 'BenefÃ­cios',
  'conteudo': [
    'A adoÃ§Ã£o Ã© o ato de Deus de nos tornar Seus filhos.',
    'GÃ¡latas 4:4-7 â€” \'enviou Deus o Seu Filho... para que recibamos a adoÃ§Ã£o de filhos\'.',
    'A adoÃ§Ã£o Ã© por graÃ§a â€” nÃ£o por mÃ©rito.',
    'Como filhos, temos: acesso a Deus, heranÃ§a eterna, assistÃªncia do EspÃ­rito.',
    'A adoÃ§Ã£o Ã© consumada na ressurreiÃ§Ã£o â€” \'sabemos que seremos como Ele\' (1 JoÃ£o 3:2).'
  ],
  'versicosChave': [
    'GÃ¡latas 4:4-7',
    'Romanos 8:14-17',
    '1 JoÃ£o 3:1-2',
    'EfÃ©sios 1:5'
  ],
  'tags': [
    'adoÃ§Ã£o',
    'filhos de deus',
    'heranÃ§a',
    'espÃ­rito'
  ],
  'fontes': [
    'Calvino, Institutas III.19',
    'Calvin, Institutes III.19'
  ]
},
  {
  'id': 'so-039',
  'titulo': 'A PerseveranÃ§a dos Santos',
  'categoria': 'Soteriologia',
  'subcategoria': 'Doutrina',
  'conteudo': [
    'A perseveranÃ§a dos santos Ã© a doutrina de que os verdadeiros crentes perseverarÃ£o atÃ© o fim.',
    'JoÃ£o 10:28-29 â€” \'ninguÃ©m os arrebata da Minha mÃ£o\'.',
    'A perseveranÃ§a nÃ£o Ã© dependente do poder humano, mas da fidelidade de Deus.',
    'Os eleitos podem cair temporariamente, mas serÃ£o restaurados.',
    'A perseveranÃ§a Ã© certeza â€” nÃ£o Ã© presunÃ§Ã£o.'
  ],
  'versicosChave': [
    'JoÃ£o 10:28-29',
    'Filipenses 1:6',
    'Romanos 8:38-39',
    '1 Pedro 1:5'
  ],
  'tags': [
    'perseveranÃ§a',
    'seguranÃ§a',
    'eleiÃ§Ã£o',
    'fidelidade'
  ],
  'fontes': [
    'Calvino, Institutas III.24',
    'Calvin, Institutes III.24'
  ]
},
  {
  'id': 'so-040',
  'titulo': 'A VocaÃ§Ã£o Eficaz',
  'categoria': 'Soteriologia',
  'subcategoria': 'Ordo Salutis',
  'conteudo': [
    'A vocaÃ§Ã£o eficaz Ã© o chamado de Deus que traz o pecador Ã  fÃ©.',
    'Romanos 8:30 â€” \'aos que chamou, esses tambÃ©m justificou\'.',
    'A vocaÃ§Ã£o Ã© externa (pregaÃ§Ã£o) e interna (operaÃ§Ã£o do EspÃ­rito).',
    'A vocaÃ§Ã£o eficaz Ã© irresistible â€” Deus muda o coraÃ§Ã£o para crer.',
    'A vocaÃ§Ã£o Ã© o elo entre a eleiÃ§Ã£o e a fÃ© â€” Deus efetivamente chama os eleitos.'
  ],
  'versicosChave': [
    'Romanos 8:30',
    '1 CorÃ­ntios 1:23-24',
    '2 TimÃ³teo 1:9'
  ],
  'tags': [
    'vocaÃ§Ã£o',
    'chamado',
    'efeito',
    'irresistÃ­vel'
  ],
  'fontes': [
    'Calvino, Institutas III.24',
    'Calvin, Institutes III.24'
  ]
},
  {
  'id': 'so-041',
  'titulo': 'A SatisfaÃ§Ã£o VicÃ¡ria â€” Anselmo',
  'categoria': 'Soteriologia',
  'subcategoria': 'ExpiaÃ§Ã£o',
  'conteudo': [
    'A teoria da satisfaÃ§Ã£o vicÃ¡ria (Anselmo) Ã© a mais influente na teologia cristÃ£.',
    'A honra de Deus foi ofendida pelo pecado â€” exige satisfaÃ§Ã£o.',
    'Cristo, como Deus-homem, ofereceu satisfaÃ§Ã£o perfeita e infinita.',
    'A satisfaÃ§Ã£o nÃ£o Ã© um comercial â€” Ã© um ato de amor e justiÃ§a.',
    'Calvino aperfeiÃ§oou a teoria: Cristo morreu como substituto e propiciaÃ§Ã£o.'
  ],
  'versicosChave': [
    'IsaÃ­as 53:5-6',
    'Romanos 3:25',
    '1 Pedro 2:24'
  ],
  'tags': [
    'satisfaÃ§Ã£o',
    'anselmo',
    'substituiÃ§Ã£o',
    'honor'
  ],
  'fontes': [
    'Anselmo, Cur Deus Homo',
    'Calvino, Institutas II.16'
  ]
},
  {
  'id': 'cr-017',
  'titulo': 'A EncarnaÃ§Ã£o de Cristo â€” Deus se faz Homem',
  'categoria': 'Cristologia',
  'subcategoria': 'EncarnaÃ§Ã£o',
  'conteudo': [
    'A encarnaÃ§Ã£o Ã© o mistÃ©rio central da fÃ© â€” o Verbo se fez carne (JoÃ£o 1:14).',
    'Cristo nasceu de mulher (GÃ¡latas 4:4) â€” verdadeiramente humano.',
    'Cristo nasceu de virgem â€” miraculamente, sem pai humano.',
    'A encarnaÃ§Ã£o nÃ£o Ã© Deus habitando um corpo â€” Ã© Deus se tornando humano.',
    'Cristo Ã© uma pessoa com duas naturezas: divina e humana.'
  ],
  'versicosChave': [
    'JoÃ£o 1:14',
    'GÃ¡latas 4:4',
    'Filipenses 2:6-8',
    'Hebreus 2:14-17'
  ],
  'tags': [
    'encarnaÃ§Ã£o',
    'verbo',
    'carne',
    'virgem'
  ],
  'fontes': [
    'Calvino, Institutas II.12-13',
    'Athanasius, On the Incarnation'
  ]
},
  {
  'id': 'cr-018',
  'titulo': 'A TentaÃ§Ã£o de Cristo â€” Sem Pecado',
  'categoria': 'Cristologia',
  'subcategoria': 'Vida',
  'conteudo': [
    'Cristo foi tentado em todas as coisas, como nÃ³s, porÃ©m sem pecado (Hebreus 4:15).',
    'A tentaÃ§Ã£o no deserto (Mateus 4:1-11) mostra Cristo como o novo AdÃ£o.',
    'Cristo resistiu pela Palavra de Deus â€” \'estÃ¡ escrito\'.',
    'Cristo nÃ£o podia pecar â€” Sua natureza divina era impecÃ¡vel.',
    'A tentaÃ§Ã£o de Cristo qualifica Ele para ser nosso Sumo Sacerdote misericordioso.'
  ],
  'versicosChave': [
    'Hebreus 4:15',
    'Mateus 4:1-11',
    '1 JoÃ£o 3:5'
  ],
  'tags': [
    'tentaÃ§Ã£o',
    'pecado',
    'impecabilidade',
    'deserto'
  ],
  'fontes': [
    'Calvino, Institutas II.16',
    'Calvin, Institutes II.16'
  ]
},
  {
  'id': 'cr-019',
  'titulo': 'A Autoridade de Cristo â€” Senhor de Tudo',
  'categoria': 'Cristologia',
  'subcategoria': 'Soberania',
  'conteudo': [
    'Cristo tem toda autoridade no cÃ©u e na terra (Mateus 28:18).',
    'Ele Ã© Senhor de todos (Atos 10:36), mesmo que nem todos O reconheÃ§am.',
    'A autoridade de Cristo se manifesta em: ensino, milagres, julgamento.',
    'Cristo exerce autoridade atravÃ©s da Igreja.',
    'Todo joelho se dobrarÃ¡ e toda lÃ­ngua confessarÃ¡ que Jesus Ã© Senhor (Filipenses 2:10-11).'
  ],
  'versicosChave': [
    'Mateus 28:18',
    'Filipenses 2:10-11',
    'EfÃ©sios 1:20-22',
    '1 Pedro 3:22'
  ],
  'tags': [
    'autoridade',
    'soberania',
    'senhor',
    'domÃ­nio'
  ],
  'fontes': [
    'Calvino, Institutas II.16',
    'Ridderbos, The Coming of the Kingdom'
  ]
},
  {
  'id': 'es-024',
  'titulo': 'O MilÃªnio â€” Amilenarismo, Premilenarismo e PÃ³s-milenarismo',
  'categoria': 'Escatologia',
  'subcategoria': 'Debate',
  'conteudo': [
    'O milÃªnio (Apocalipse 20:1-6) Ã© o perÃ­odo de 1000 anos mencionado na BÃ­blia.',
    'O amilenarismo ensina que o milÃªnio Ã© simbÃ³lico â€” a era atual da igreja.',
    'O premilenarismo ensina que Cristo voltarÃ¡ antes do milÃªnio literal.',
    'O pÃ³s-milenarismo ensina que a igreja trarÃ¡ o milÃªnio antes da volta de Cristo.',
    'A maioria dos reformados Ã© amilenarista â€” Calvino, Warfield, Hoekema.'
  ],
  'versicosChave': [
    'Apocalipse 20:1-6',
    'RevelaÃ§Ã£o 19:11-16',
    '2 Pedro 3:10-13'
  ],
  'tags': [
    'milÃªnio',
    'amilenarismo',
    'premilenarismo',
    'pÃ³s-milenarismo'
  ],
  'fontes': [
    'Hoekema, The Bible and the Future',
    'Ladd, The Gospel of the Kingdom',
    'Boyd, God of the Possible'
  ]
},
  {
  'id': 'es-025',
  'titulo': 'O JuÃ­zo Final',
  'categoria': 'Escatologia',
  'subcategoria': 'Eventos',
  'conteudo': [
    'O juÃ­zo final Ã© o tribunal de Cristo onde todos prestarÃ£o contas.',
    'Mateus 25:31-46 â€” separaÃ§Ã£o das ovelhas e dos bodes.',
    'Apocalipse 20:11-15 â€” o Livro da Vida e o Livro das Obras.',
    'O juÃ­zo dos crentes nÃ£o Ã© para salvaÃ§Ã£o (jÃ¡ salvo), mas para recompensa.',
    'O juÃ­zo dos incrÃ©dulos Ã© condenaÃ§Ã£o eterna.'
  ],
  'versicosChave': [
    'Mateus 25:31-46',
    'Apocalipse 20:11-15',
    'Romanos 14:10-12',
    '2 CorÃ­ntios 5:10'
  ],
  'tags': [
    'juÃ­zo final',
    'livro da vida',
    'condenaÃ§Ã£o',
    'recompensa'
  ],
  'fontes': [
    'Hoekema, The Bible and the Future',
    'Morris, The Gospel According to Matthew'
  ]
},
  {
  'id': 'hm-008',
  'titulo': 'InterpretaÃ§Ã£o de ParÃ¡bolas',
  'categoria': 'HermenÃªutica',
  'subcategoria': 'MÃ©todos',
  'conteudo': [
    'As parÃ¡bolas sÃ£o histÃ³rias com um ponto principal â€” nÃ£o sÃ£o alegorias detalhadas.',
    'A regra de ouro: encontre o ponto principal do narrador.',
    'Cada parÃ¡bola tem um contexto que determina seu significado.',
    'As parÃ¡bolas foram feitas para revelar verdade aos que tinham ouvidos.',
    'NÃ£o Ã© necessariamente cada detalhe tem significado simbÃ³lico.'
  ],
  'versicosChave': [
    'Mateus 13:10-17',
    'Marcos 4:10-12',
    'Lucas 15:1-7'
  ],
  'tags': [
    'parÃ¡bolas',
    'interpretaÃ§Ã£o',
    'alegoria',
    'simbolismo'
  ],
  'fontes': [
    'Fee, New Testament Exegesis',
    'Blomberg, Interpreting the Parables'
  ]
},
  {
  'id': 'hm-009',
  'titulo': 'O Contexto HistÃ³rico e Cultural',
  'categoria': 'HermenÃªutica',
  'subcategoria': 'PrincÃ­pios',
  'conteudo': [
    'A BÃ­blia foi escrita em contextos especÃ­ficos â€” precisamos entender esses contextos.',
    'A cultura do Antigo Oriente PrÃ³ximo ajuda a entender o AT.',
    'O judaÃ­smo do segundo templo Ã© essencial para entender o NT.',
    'A lÃ­ngua original (hebraico, aramaico, grego) Ã© fundamental.',
    'A histÃ³ria da Igreja mostra como a BÃ­blia foi interpretada ao longo do tempo.'
  ],
  'versicosChave': [
    '2 TimÃ³teo 2:15',
    '1 CorÃ­ntios 9:20-22'
  ],
  'tags': [
    'contexto',
    'histÃ³ria',
    'cultura',
    'lÃ­ngua'
  ],
  'fontes': [
    'Fee, New Testament Exegesis',
    'Kaiser & Silva, Introduction to Biblical Hermeneutics'
  ]
},
  {
  'id': 'et-027',
  'titulo': 'A Ã‰tica Sexual â€” Pureza e Castidade',
  'categoria': 'Ã‰tica CristÃ£',
  'subcategoria': 'Moral',
  'conteudo': [
    'A sexualidade Ã© dom de Deus, destinada ao casamento.',
    'A imoralidade sexual Ã© pecado â€” \'fugi da imoralidade sexual\' (1 CorÃ­ntios 6:18).',
    'A castidade nÃ£o Ã© repressÃ£o, mas expressÃ£o ordenada do desejo.',
    'O adultÃ©rio, a pornografia e a homossexualidade prÃ¡tica sÃ£o contrÃ¡rios Ã  BÃ­blia.',
    'A graÃ§a de Deus capacita a santificaÃ§Ã£o sexual.'
  ],
  'versicosChave': [
    '1 CorÃ­ntios 6:18-20',
    '1 Tessalonicenses 4:3-5',
    'Hebreus 13:4',
    'GÃªnesis 2:24'
  ],
  'tags': [
    'sexualidade',
    'pureza',
    'casamento',
    'castidade'
  ],
  'fontes': [
    'Calvino, Institutas II.8',
    'Calvin, Institutes II.8'
  ]
},
  {
  'id': 'et-028',
  'titulo': 'A Ã‰tica EconÃ´mica â€” JustiÃ§a e Generosidade',
  'categoria': 'Ã‰tica CristÃ£',
  'subcategoria': 'Social',
  'conteudo': [
    'A BÃ­blia condena a avareza e a exploraÃ§Ã£o.',
    'A dÃ©cima parte e a oferta sÃ£o princÃ­pios de generosidade.',
    'O dÃ­zimo nÃ£o Ã© lei para o NT, mas o princÃ­pio de dar com alegria.',
    'A justiÃ§a social Ã© mandamento â€” \'pratica a justiÃ§a, ama a misericÃ³rdia\'.',
    'O cristÃ£o Ã© mordomo, nÃ£o dono â€” tudo pertence a Deus.'
  ],
  'versicosChave': [
    'MiquÃ©ias 6:8',
    'Lucas 12:15',
    '2 CorÃ­ntios 9:6-7',
    'ProvÃ©rbios 3:9-10'
  ],
  'tags': [
    'economia',
    'justiÃ§a',
    'generosidade',
    'dÃ©cima'
  ],
  'fontes': [
    'Calvino, Institutas III.10',
    'Wolters, Creation Regained'
  ]
},
  {
  'id': 'et-029',
  'titulo': 'A Ã‰tica da Verdade â€” Honestidade e Integridade',
  'categoria': 'Ã‰tica CristÃ£',
  'subcategoria': 'Moral',
  'conteudo': [
    'Deus Ã© verdadeiro â€” nÃ£o pode mentir (Hebreus 6:18).',
    'A mentira Ã© pecado â€” SatanÃ¡s Ã© o pai da mentira (JoÃ£o 8:44).',
    'A honestidade Ã© virtude cristÃ£ â€” \'nÃ£o mintam uns aos outros\' (Colossenses 3:9).',
    'A verdade deve ser dita com amor (EfÃ©sios 4:15).',
    'A integridade Ã© testemunho â€” o cristÃ£o deve ser confiÃ¡vel.'
  ],
  'versicosChave': [
    'Hebreus 6:18',
    'JoÃ£o 8:44',
    'Colossenses 3:9',
    'EfÃ©sios 4:15'
  ],
  'tags': [
    'verdade',
    'honestidade',
    'integridade',
    'mentira'
  ],
  'fontes': [
    'Calvino, Institutas II.8',
    'Packer, Knowing God'
  ]
},
  {
  'id': 'mi-019',
  'titulo': 'A EstratÃ©gia MissionÃ¡ria Paulina',
  'categoria': 'Missiologia',
  'subcategoria': 'EstratÃ©gia',
  'conteudo': [
    'Paulo tinha uma estratÃ©gia clara: ir Ã s cidades, pregar, estabelecer igrejas, seguir adiante.',
    'Ele focava nas cidades estratÃ©gicas â€” JerusalÃ©m, Antioquia, Ã‰feso, Corinto, Roma.',
    'O mÃ©todo incluÃ­a: sinagoga, praÃ§a, casa, escola.',
    'Paulo usava o que jÃ¡ existia â€” estradas romanas, lÃ­ngua grega, sinagogas.',
    'Ele delegava lideranÃ§a â€” nunca ficava como lÃ­der permanente.'
  ],
  'versicosChave': [
    'Atos 13-28',
    'Romanos 15:19-24',
    '1 CorÃ­ntios 9:19-23'
  ],
  'tags': [
    'estratÃ©gia',
    'paulo',
    'missÃµes',
    'cidades'
  ],
  'fontes': [
    'Calvino, Institutas III.21',
    'Bosch, Transforming Mission'
  ]
},
  {
  'id': 'mi-020',
  'titulo': 'A ContextualizaÃ§Ã£o do Evangelho',
  'categoria': 'Missiologia',
  'subcategoria': 'MÃ©todo',
  'conteudo': [
    'A contextualizaÃ§Ã£o Ã© adaptar a apresentaÃ§Ã£o do evangelho sem alterar o conteÃºdo.',
    'Paulo se tornou \'judeu entre os judeus\' para ganhar judeus (1 CorÃ­ntios 9:20-22).',
    'A contextualizaÃ§Ã£o nÃ£o Ã© sincretismo â€” Ã© traduÃ§Ã£o cultural.',
    'O perigo Ã© contextualizar tanto que o evangelho se perde.',
    'A contextualizaÃ§Ã£o Ã© necessÃ¡ria â€” o evangelho precisa ser compreendido em cada cultura.'
  ],
  'versicosChave': [
    '1 CorÃ­ntios 9:19-23',
    'Atos 17:22-34',
    'Colossenses 4:5-6'
  ],
  'tags': [
    'contextualizaÃ§Ã£o',
    'cultura',
    'traduÃ§Ã£o',
    'evangelho'
  ],
  'fontes': [
    'Bosch, Transforming Mission',
    'Hiebert, Transforming Worldviews'
  ]
},
  {
  'id': 'cc-063',
  'titulo': 'Cristianismo e PolÃ­tica',
  'categoria': 'QuestÃµes ContemporÃ¢neas',
  'subcategoria': 'Sociedade',
  'conteudo': [
    'A relaÃ§Ã£o entre cristianismo e polÃ­tica Ã© complexa e controversa.',
    'Jesus nÃ£o veio para ser rei polÃ­tico â€” \'meu reino nÃ£o Ã© deste mundo\'.',
    'A Igreja deve ser profÃ©tica â€” denunciar injustiÃ§as e proclamar a verdade.',
    'O perigo do nacionalismo religioso â€” confundir naÃ§Ã£o com reino de Deus.',
    'A polÃ­tica pode ser meio de serviÃ§o, mas nÃ£o de idolatria.'
  ],
  'versicosChave': [
    'JoÃ£o 18:36',
    'Mateus 22:21',
    '1 Pedro 2:13-17',
    'Atos 5:29'
  ],
  'tags': [
    'polÃ­tica',
    'sociedade',
    'profecia',
    'naÃ§Ã£o'
  ],
  'fontes': [
    'Calvino, Institutas IV.20',
    'Calvin, Institutes IV.20'
  ]
},
  {
  'id': 'cc-064',
  'titulo': 'Cristianismo e Pobreza',
  'categoria': 'QuestÃµes ContemporÃ¢neas',
  'subcategoria': 'JustiÃ§a',
  'conteudo': [
    'A BÃ­blia tem muito a dizer sobre pobreza e justiÃ§a.',
    '\'Os pobres vocÃªs sempre terÃ£o convosco\' (Mateus 26:11).',
    'Deus Ã© defensor dos pobres â€” \'o Senhor Ã© o seu refÃºgio\'.',
    'A Igreja deve ajudar os pobres â€” nÃ£o apenas com palavras, mas com aÃ§Ãµes.',
    'O perigo Ã© transformar evangelismo em apenas assistencialismo.'
  ],
  'versicosChave': [
    'Mateus 26:11',
    'ProvÃ©rbios 19:17',
    'Tiago 2:15-17',
    'Mateus 25:31-46'
  ],
  'tags': [
    'pobreza',
    'justiÃ§a',
    'ajuda',
    'misericÃ³rdia'
  ],
  'fontes': [
    'Calvino, Institutas III.10',
    'Calvin, Institutes III.10'
  ]
},
  {
  'id': 'pn-016',
  'titulo': 'O EspÃ­rito Santo e a Unidade da Igreja',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Eclesiologia',
  'conteudo': [
    'O EspÃ­rito Santo Ã© o autor da unidade na Igreja.',
    'EfÃ©sios 4:3 â€” \'esforÃ§ando-vos por preservar a unidade do EspÃ­rito\'.',
    'A unidade nÃ£o Ã© uniformidade â€” Ã© diversidade na harmonia.',
    'O EspÃ­rito distribui dons diferentes para um mesmo corpo.',
    'A unidade Ã© um testemunho ao mundo â€” \'para que o mundo creia\' (JoÃ£o 17:21).'
  ],
  'versicosChave': [
    'EfÃ©sios 4:3-6',
    'JoÃ£o 17:20-23',
    '1 CorÃ­ntios 12:4-13'
  ],
  'tags': [
    'unidade',
    'diversidade',
    'igreja',
    'testemunho'
  ],
  'fontes': [
    'Calvino, Institutas IV.1',
    'Calvin, Institutes IV.1'
  ]
},
  {
  'id': 'an-011',
  'titulo': 'A AdoraÃ§Ã£o AngÃ©lica',
  'categoria': 'Angelologia',
  'subcategoria': 'AdoraÃ§Ã£o',
  'conteudo': [
    'Os anjos adoram continuamente a Deus no cÃ©u.',
    'Os serafins cantam \'Santos, santos, santos\' (IsaÃ­as 6:3).',
    'Os 24 anciÃ£os se prostram diante do trono (Apocalipse 4:10).',
    'A adoraÃ§Ã£o angÃ©lica Ã© dirigida a Deus â€” nÃ£o aos anjos.',
    'A Igreja se une Ã  adoraÃ§Ã£o angÃ©lica na worship.'
  ],
  'versicosChave': [
    'IsaÃ­as 6:3',
    'Apocalipse 4:8-11',
    'Hebreus 1:6'
  ],
  'tags': [
    'adoraÃ§Ã£o',
    'culto',
    'cÃ©u',
    'trono'
  ],
  'fontes': [
    'Calvino, Institutas I.13',
    'Calvin, Institutes I.13'
  ]
},
  {
  'id': 'ty-015',
  'titulo': 'O Ã‰xodo â€” Tipo de SalvaÃ§Ã£o',
  'categoria': 'Tipologia',
  'subcategoria': 'AT',
  'conteudo': [
    'O Ã‰xodo Ã© o maior tipo de salvaÃ§Ã£o no AT.',
    'Israel escravizado no Egito â†’ liberdade pela mÃ£o poderosa de Deus.',
    'O cordeiro pascal â†’ Cristo, nosso Cordeiro.',
    'O mar Vermelho â†’ batismo e morte com Cristo.',
    'O deserto â†’ jornada de fÃ© e provaÃ§Ã£o.',
    'A terra prometida â†’ descanso eterno.'
  ],
  'versicosChave': [
    'ÃŠxodo 12:1-14',
    '1 CorÃ­ntios 5:7',
    'Hebreus 11:29'
  ],
  'tags': [
    'Ãªxodo',
    'salvaÃ§Ã£o',
    'cordeiro',
    'libertaÃ§Ã£o'
  ],
  'fontes': [
    'Calvino, ComentÃ¡rio a ÃŠxodo',
    'Kline, The Structure of Biblical Authority'
  ]
},
  {
  'id': 'cc-065',
  'titulo': 'Cristianismo e SaÃºde Mental',
  'categoria': 'QuestÃµes ContemporÃ¢neas',
  'subcategoria': 'SaÃºde',
  'conteudo': [
    'A saÃºde mental Ã© uma questÃ£o importante para os cristÃ£os.',
    'A BÃ­blia nÃ£o condena quem sofre de depressÃ£o ou ansiedade.',
    'Deus usa meios: medicaÃ§Ã£o, aconselhamento, comunidade.',
    'A oraÃ§Ã£o e a Palavra sÃ£o meios de graÃ§a, mas nÃ£o substituem ajuda profissional.',
    'A Igreja deve ser lugar de acolhimento, nÃ£o de julgamento.'
  ],
  'versicosChave': [
    'Salmo 42:1-5',
    '1 Reis 19:1-8',
    '2 CorÃ­ntios 1:3-4',
    'ProvÃ©rbios 11:14'
  ],
  'tags': [
    'saÃºde mental',
    'depressÃ£o',
    'ansiedade',
    'acolhimento'
  ],
  'fontes': [
    'Calvino, Institutas III.20',
    'Calvin, Institutes III.20'
  ]
},
  {
  'id': 'lp-012',
  'titulo': 'Salmos â€” O Livro de OraÃ§Ãµes da Igreja',
  'categoria': 'Livros PoÃ©ticos',
  'subcategoria': 'Salmos',
  'conteudo': [
    'Os Salmos sÃ£o o hymnbook da Igreja â€” mais de 50% do AT em poesia.',
    'Cada salmo tem um contexto, autor e propÃ³sito especÃ­ficos.',
    'Os salmos cobrem todas as emoÃ§Ãµes humanas: louvor, lamento, gratidÃ£o, sÃºplica.',
    'Jesus citou os salmos frequentemente â€” especialmente o Salmo 22 na cruz.',
    'Os salmos sÃ£o modelo de oraÃ§Ã£o para a Igreja.'
  ],
  'versicosChave': [
    'Salmo 23:1-6',
    'Salmo 51:1-17',
    'Salmo 119:105',
    'Salmo 22:1-31'
  ],
  'tags': [
    'salmos',
    'oraÃ§Ã£o',
    'louvor',
    'lamento'
  ],
  'fontes': [
    'Calvino, ComentÃ¡rio aos Salmos',
    'Tate, Psalms'
  ]
},
  {
  'id': 'lp-013',
  'titulo': 'ProvÃ©rbios â€” Sabedoria PrÃ¡tica',
  'categoria': 'Livros PoÃ©ticos',
  'subcategoria': 'ProvÃ©rbios',
  'conteudo': [
    'ProvÃ©rbios Ã© o livro de sabedoria prÃ¡tica para a vida diÃ¡ria.',
    'O temor do Senhor Ã© o princÃ­pio da sabedoria (ProvÃ©rbios 1:7).',
    'Os provÃ©rbios nÃ£o sÃ£o promessas absolutas â€” sÃ£o generalizaÃ§Ãµes.',
    'O tema do pecado vs. sabedoria percorre todo o livro.',
    'ProvÃ©rbios Ã© especialmente relevante para jovens em formaÃ§Ã£o.'
  ],
  'versicosChave': [
    'ProvÃ©rbios 1:7',
    'ProvÃ©rbios 3:5-6',
    'ProvÃ©rbios 22:6',
    'ProvÃ©rbios 31:10-31'
  ],
  'tags': [
    'provÃ©rbios',
    'sabedoria',
    'temor',
    'prÃ¡tica'
  ],
  'fontes': [
    'Calvino, ComentÃ¡rio a ProvÃ©rbios',
    'Waltke, The Book of Proverbs'
  ]
},
  {
  'id': 'ev-026',
  'titulo': 'JoÃ£o 3:16 â€” O VersÃ­culo Mais Conhecido',
  'categoria': 'Evangelhos',
  'subcategoria': 'JoÃ£o',
  'conteudo': [
    'JoÃ£o 3:16 Ã© o versÃ­culo mais conhecido e memorizado da BÃ­blia.',
    'Resume todo o evangelho: amor, dÃ¡, Filho, crer, nÃ£o pereÃ§a, vida eterna.',
    'O contexto Ã© a conversa de Jesus com Nicodemos.',
    '\'Tanto amou Deus o mundo\' â€” o mundo Ã© o objeto do amor divino.',
    '\'Deu o seu Filho unigÃªnito\' â€” o custo da salvaÃ§Ã£o.'
  ],
  'versicosChave': [
    'JoÃ£o 3:16',
    'JoÃ£o 3:1-21',
    '1 JoÃ£o 4:9-10'
  ],
  'tags': [
    'joÃ£o 3:16',
    'evangelho',
    'amor',
    'salvaÃ§Ã£o'
  ],
  'fontes': [
    'Calvino, ComentÃ¡rio a JoÃ£o',
    'Carson, The Gospel According to John'
  ]
},
  {
  'id': 'ev-027',
  'titulo': 'Mateus 28:19-20 â€” A Grande ComissÃ£o',
  'categoria': 'Evangelhos',
  'subcategoria': 'Mateus',
  'conteudo': [
    'Mateus 28:19-20 Ã© a Grande ComissÃ£o â€” o mandato da Igreja.',
    'A autoridade de Cristo Ã© a base â€” \'Toda autoridade me Ã© dada\'.',
    'O alvo Ã© universal â€” \'todas as naÃ§Ãµes\'.',
    'O mÃ©todo Ã© disciple-making â€” \'fazendo discÃ­pulos\'.',
    'A-promessa Ã© presence â€” \'estarei convosco todos os dias\'.'
  ],
  'versicosChave': [
    'Mateus 28:18-20',
    'Marcos 16:15-16',
    'Atos 1:8'
  ],
  'tags': [
    'grande comissÃ£o',
    'discipulado',
    'missÃ£o',
    'autoridade'
  ],
  'fontes': [
    'Calvino, Institutas III.21',
    'Ridderbos, The Coming of the Kingdom'
  ]
},
  {
  'id': 'cr-020',
  'titulo': 'A PerfeiÃ§Ã£o de Cristo',
  'categoria': 'Cristologia',
  'subcategoria': 'Natureza',
  'conteudo': [
    'Cristo Ã© perfeito em todas as Sua qualidades: sabedoria, poder, amor, justiÃ§a.',
    'Ele nÃ£o pecou â€” Ã© o Cordeiro imaculado.',
    'Sua perfeiÃ§Ã£o Ã© a base da nossa salvaÃ§Ã£o â€” somente um perfeito pode satisfazer a justiÃ§a.',
    'Cristo Ã© perfeito como profeto, sacerdote e rei.',
    'A perfeiÃ§Ã£o de Cristo Ã© eterna â€” nÃ£o diminui nem aumenta.'
  ],
  'versicosChave': [
    'Hebreus 4:15',
    '1 Pedro 2:22',
    '2 CorÃ­ntios 5:21',
    'Colossenses 2:9'
  ],
  'tags': [
    'perfeiÃ§Ã£o',
    'impecabilidade',
    'justiÃ§a',
    'santidade'
  ],
  'fontes': [
    'Calvino, Institutas II.16',
    'Calvin, Institutes II.16'
  ]
},
  {
  'id': 'cr-021',
  'titulo': 'A HumilhaÃ§Ã£o de Cristo',
  'categoria': 'Cristologia',
  'subcategoria': 'PaixÃ£o',
  'conteudo': [
    'A humilhaÃ§Ã£o de Cristo inclui: encarnaÃ§Ã£o, vida terrena, morte, descenso aos infernos.',
    'Filipenses 2:6-8 â€” \'despojou-se a si mesmo, tomando a forma de servo\'.',
    'A cruz Ã© o Ã¡pice da humilhaÃ§Ã£o â€” morte de escravo.',
    'O descenso aos infernos Ã© o mais misterioso dos artigos.',
    'A humilhaÃ§Ã£o Ã© voluntÃ¡ria â€” Cristo deu Sua vida por Si mesmo.'
  ],
  'versicosChave': [
    'Filipenses 2:6-8',
    'IsaÃ­as 53:3-9',
    '1 Pedro 2:24',
    '1 Pedro 3:18-20'
  ],
  'tags': [
    'humilhaÃ§Ã£o',
    'cruz',
    'servo',
    'encarnaÃ§Ã£o'
  ],
  'fontes': [
    'Calvino, Institutas II.16',
    'Calvin, Institutes II.16'
  ]
},
  {
  'id': 'cr-022',
  'titulo': 'A ExaltaÃ§Ã£o de Cristo',
  'categoria': 'Cristologia',
  'subcategoria': 'GlorificaÃ§Ã£o',
  'conteudo': [
    'A exaltaÃ§Ã£o de Cristo inclui: ressurreiÃ§Ã£o, ascensÃ£o, sentado Ã  direita do Pai.',
    'Filipenses 2:9-11 â€” \'Deus o exaltou soberanamente e lhe deu o nome que Ã© acima de todo nome\'.',
    'Cristo Ã© agora Senhor de todos.',
    'Ele intercede por nÃ³s como Sumo Sacerdote.',
    'A exaltaÃ§Ã£o serÃ¡ consumada na segunda vinda.'
  ],
  'versicosChave': [
    'Filipenses 2:9-11',
    'EfÃ©sios 1:20-22',
    'Hebreus 7:25',
    'Atos 2:33'
  ],
  'tags': [
    'exaltaÃ§Ã£o',
    'ressurreiÃ§Ã£o',
    'ascensÃ£o',
    'senhor'
  ],
  'fontes': [
    'Calvino, Institutas II.16',
    'Calvin, Institutes II.16'
  ]
},
  {
  'id': 'bi-012',
  'titulo': 'A HermenÃªutica de Calvino',
  'categoria': 'Bibliologia',
  'subcategoria': 'InterpretaÃ§Ã£o',
  'conteudo': [
    'Calvino desenvolveu princÃ­pios hermenÃªuticos que influenciaram toda a tradiÃ§Ã£o reformada.',
    'A regra principal: a Escritura interpreta a si mesma.',
    'O contexto imediato e remoto sÃ£o essenciais.',
    'O sentido literal Ã© o primeiro e mais importante.',
    'O EspÃ­rito Santo ilumina a mente para compreender.'
  ],
  'versicosChave': [
    '2 TimÃ³teo 3:16',
    '2 Pedro 1:20-21'
  ],
  'tags': [
    'calvino',
    'hermenÃªutica',
    'interpretaÃ§Ã£o'
  ],
  'fontes': [
    'Calvino, Institutas I.7'
  ]
},
  {
  'id': 'bi-013',
  'titulo': 'O Testemunho Interno do EspÃ­rito',
  'categoria': 'Bibliologia',
  'subcategoria': 'Autoridade',
  'conteudo': [
    'O EspÃ­rito Santo testifica em nosso espÃ­rito que a BÃ­blia Ã© Palavra de Deus.',
    'A Escritura nÃ£o precisa de prova externa â€” ela carrega sua prÃ³pria autoridade.',
    'A fÃ© na Escritura Ã© racional e espiritual.',
    'O testemunho do EspÃ­rito confirma a verdade da BÃ­blia.',
    'A autoridade da BÃ­blia Ã© AutoctÃ´nica â€” vem de dentro dela.'
  ],
  'versicosChave': [
    '1 CorÃ­ntios 2:10-14',
    '1 Tessalonicenses 2:13'
  ],
  'tags': [
    'testemunho',
    'espÃ­rito',
    'autoridade',
    'fÃ©'
  ],
  'fontes': [
    'Calvino, Institutas I.7',
    'Warfield, Studies in Theology'
  ]
},
  {
  'id': 'bi-014',
  'titulo': 'A BÃ­blia e a CiÃªncia',
  'categoria': 'Bibliologia',
  'subcategoria': 'ContemporÃ¢neo',
  'conteudo': [
    'A BÃ­blia nÃ£o Ã© um livro de ciÃªncia â€” Ã© revelaÃ§Ã£o de Deus.',
    'Quando a BÃ­blia fala de temas cientÃ­ficos, Ã© precisa no que afirma.',
    'A hermenÃªutica bÃ­blica deve respeitar o gÃªnero literÃ¡rio.',
    'A ciÃªncia e a fÃ© nÃ£o sÃ£o inimigas â€” ambas buscam a verdade.',
    'O criacionismo, design inteligente e evoluÃ§Ã£o teÃ­sta sÃ£o posiÃ§Ãµes cristÃ£s.'
  ],
  'versicosChave': [
    'GÃªnesis 1:1',
    'Romanos 1:20',
    'Salmo 19:1'
  ],
  'tags': [
    'ciÃªncia',
    'criaÃ§Ã£o',
    'hermenÃªutica',
    'gÃªnero'
  ],
  'fontes': [
    'Calvino, Institutas I.14',
    'Mooradian, Theology and Science'
  ]
},
  {
  'id': 'cr-023',
  'titulo': 'A Cidade de Deus â€” Agostinho',
  'categoria': 'Cristologia',
  'subcategoria': 'Augustinismo',
  'conteudo': [
    'A Cidade de Deus Ã© a obra-prima de Agostinho â€” histÃ³ria da salvaÃ§Ã£o.',
    'A Cidade de Deus se opÃµe Ã  Cidade dos Homens.',
    'A Cidade de Deus Ã© formada pelos amantes de Deus; a dos Homens, pelos amantes de si mesmos.',
    'A histÃ³ria Ã© linear â€” criaÃ§Ã£o, queda, redenÃ§Ã£o, consumaÃ§Ã£o.',
    'Agostinho influenciou profundamente a teologia ocidental.'
  ],
  'versicosChave': [
    'Hebreus 11:10',
    '13:14',
    'Apocalipse 21:1-2'
  ],
  'tags': [
    'agostinho',
    'cidade de deus',
    'histÃ³ria',
    'salvaÃ§Ã£o'
  ],
  'fontes': [
    'Agostinho, A Cidade de Deus'
  ]
},
  {
  'id': 'cr-024',
  'titulo': 'Cristo e a Lei',
  'categoria': 'Cristologia',
  'subcategoria': 'Ã‰tica',
  'conteudo': [
    'Cristo nÃ£o aboliu a Lei, mas a cumpriu perfeitamente.',
    'Mateus 5:17-19 â€” \'nÃ£o vim para abrogar a Lei, mas para cumprir\'.',
    'A Lei moral (10 Mandamentos) continua vÃ¡lida como norma de vida.',
    'A Lei civil e cerimonial foram cumpridas em Cristo.',
    'A Lei Ã© espelho que nos mostra nosso pecado e nos conduz a Cristo.'
  ],
  'versicosChave': [
    'Mateus 5:17-19',
    'Romanos 3:31',
    'Romanos 7:7-12',
    'GÃ¡latas 3:24-25'
  ],
  'tags': [
    'lei',
    'mandamentos',
    'cumprimento',
    'Ã©tica'
  ],
  'fontes': [
    'Calvino, Institutas II.9',
    'Calvin, Institutes II.9'
  ]
},
  {
  'id': 'cr-025',
  'titulo': 'O Reino de Deus â€” JÃ¡ e Ainda NÃ£o',
  'categoria': 'Cristologia',
  'subcategoria': 'Escatologia',
  'conteudo': [
    'O Reino de Deus Ã© central no ensino de Jesus.',
    'O Reino jÃ¡ comeÃ§ou com a vinda de Cristo â€” \'o Reino de Deus estÃ¡ perto\'.',
    'O Reino ainda nÃ£o se consumou â€” esperamos a volta de Cristo.',
    'A tensÃ£o \'jÃ¡ e ainda nÃ£o\' define a era da igreja.',
    'O Reino de Deus cresce como semente de mostarda â€” pequeno, mas se expande.'
  ],
  'versicosChave': [
    'Marcos 1:15',
    'Mateus 13:31-33',
    'Lucas 17:20-21'
  ],
  'tags': [
    'reino',
    'jÃ¡ e ainda nÃ£o',
    'escatologia',
    'igreja'
  ],
  'fontes': [
    'Ladd, A Theology of the New Testament',
    'Ridderbos, The Coming of the Kingdom'
  ]
},
  {
  'id': 'cr-026',
  'titulo': 'A Morte de Cristo â€” ExpiaÃ§Ã£o Universal vs. Particular',
  'categoria': 'Cristologia',
  'subcategoria': 'ExpiaÃ§Ã£o',
  'conteudo': [
    'A expiaÃ§Ã£o universal sustenta que Cristo morreu por todos.',
    'A expiaÃ§Ã£o particular sustenta que Cristo morreu somente pelos eleitos.',
    'Calvino defendia a expiaÃ§Ã£o particular â€” \'Cristo morreu pelo Seu povo\'.',
    'Os arminianos defendem a expiaÃ§Ã£o universal â€” \'mundo\' significa todos.',
    'Ambas as posiÃ§Ãµes sÃ£o aceitas dentro do protestantismo.'
  ],
  'versicosChave': [
    'JoÃ£o 3:16',
    '1 TimÃ³teo 2:6',
    'EfÃ©sios 5:25',
    'Romanos 5:8'
  ],
  'tags': [
    'expiaÃ§Ã£o',
    'universal',
    'particular',
    'debate'
  ],
  'fontes': [
    'Calvino, Institutas II.16',
    'Dowey, The Knowledge of God and the Doctrine of Atonement'
  ]
},
  {
  'id': 'pn-017',
  'titulo': 'A InspiraÃ§Ã£o Verbal e PlenÃ¡ria',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Bibliologia',
  'conteudo': [
    'A inspiraÃ§Ã£o verbal significa que Deus inspirou cada palavra da BÃ­blia.',
    'A inspiraÃ§Ã£o plenÃ¡ria significa que toda a BÃ­blia Ã© inspirada â€” nÃ£o apenas partes.',
    'A inspiraÃ§Ã£o nÃ£o Ã© ditado â€” Deus usou a personalidade e estilo de cada autor.',
    'A inerrÃ¢ncia se baseia na inspiraÃ§Ã£o plenÃ¡ria.',
    'A BÃ­blia Ã© a palavra de Deus em palavras humanas.'
  ],
  'versicosChave': [
    '2 TimÃ³teo 3:16',
    '2 Pedro 1:21',
    '1 CorÃ­ntios 2:13'
  ],
  'tags': [
    'inspiraÃ§Ã£o',
    'verbal',
    'plenÃ¡ria',
    'inerrÃ¢ncia'
  ],
  'fontes': [
    'Warfield, The Inspiration and Authority of Scripture'
  ]
},
  {
  'id': 'so-042',
  'titulo': 'A GraÃ§a IrresistÃ­vel',
  'categoria': 'Soteriologia',
  'subcategoria': 'Doutrina',
  'conteudo': [
    'A graÃ§a irresistÃ­vel Ã© a doutrina de que Deus efetivamente chama os eleitos.',
    'A graÃ§a nÃ£o Ã© coativa â€” ela muda o coraÃ§Ã£o para querer a Deus.',
    'JoÃ£o 6:44 â€” \'ninguÃ©m pode vir a Mim se o Pai que Me enviou nÃ£o o atrair\'.',
    'A graÃ§a irresistÃ­vel nÃ£o anula a liberdade â€” o crente escolhe livremente em Cristo.',
    'Todos os eleitos responderÃ£o positivamente ao chamado de Deus.'
  ],
  'versicosChave': [
    'JoÃ£o 6:44',
    'JoÃ£o 6:37',
    'Romanos 8:30'
  ],
  'tags': [
    'graÃ§a',
    'irresistÃ­vel',
    'chamado',
    'eleiÃ§Ã£o'
  ],
  'fontes': [
    'Calvino, Institutas III.24',
    'Calvin, Institutes III.24'
  ]
},
  {
  'id': 'so-043',
  'titulo': 'A ExpiaÃ§Ã£o Ilimitada vs. Limitada',
  'categoria': 'Soteriologia',
  'subcategoria': 'Debate',
  'conteudo': [
    'A expiaÃ§Ã£o ilimitada: Cristo morreu por todos os seres humanos.',
    'A expiaÃ§Ã£o limitada: Cristo morreu somente pelos eleitos.',
    'O calvinismo defende a expiaÃ§Ã£o limitada (definite atonement).',
    'O arminianismo defende a expiaÃ§Ã£o ilimitada.',
    'A diferenÃ§a estÃ¡ na extensÃ£o, nÃ£o no valor da expiaÃ§Ã£o.'
  ],
  'versicosChave': [
    'JoÃ£o 10:11',
    '1 JoÃ£o 2:2',
    'EfÃ©sios 5:25',
    'Romanos 5:8'
  ],
  'tags': [
    'expiaÃ§Ã£o',
    'ilimitada',
    'limitada',
    'debate'
  ],
  'fontes': [
    'Calvino, Institutas II.16',
    'Owen, The Death of Death in the Death of Christ'
  ]
},
  {
  'id': 'so-044',
  'titulo': 'A JustificaÃ§Ã£o pela FÃ© Somente',
  'categoria': 'Soteriologia',
  'subcategoria': 'Reforma',
  'conteudo': [
    'Sola fide Ã© o princÃ­pio de que a fÃ© Ã© o Ãºnico meio de justificaÃ§Ã£o.',
    'A fÃ© nÃ£o Ã© obra â€” Ã© o instrumento pela qual recebemos a graÃ§a.',
    'A fÃ© verdadeira produz boas obras â€” mas as obras nÃ£o salvam.',
    'Lutero chamou a justificaÃ§Ã£o pela fÃ© de \'artigo da igreja que se sustenta ou cai\'.',
    'A justificaÃ§Ã£o Ã© forensic â€” Deus declara justo, nÃ£o nos torna justos.'
  ],
  'versicosChave': [
    'Romanos 3:28',
    'EfÃ©sios 2:8-9',
    'GÃ¡latas 2:16',
    'Romanos 5:1'
  ],
  'tags': [
    'sola fide',
    'fÃ©',
    'justificaÃ§Ã£o',
    'reforma'
  ],
  'fontes': [
    'Lutero, ComentÃ¡rio a GÃ¡latas',
    'Calvino, Institutas III.11'
  ]
},
  {
  'id': 'hm-010',
  'titulo': 'A InterpretaÃ§Ã£o de Profecias',
  'categoria': 'HermenÃªutica',
  'subcategoria': 'MÃ©todos',
  'conteudo': [
    'As profecias bÃ­blicas sÃ£o frequentemente cumpridas em mÃºltiplas camadas.',
    'O cumprimento tipolÃ³gico Ã© mais comum que o literal.',
    'As profecias escatolÃ³gicas sÃ£o as mais debatidas.',
    'A regra de ouro: interprete pela Escritura mais clara.',
    'NÃ£o faÃ§a profecia dizer mais do que o texto sustenta.'
  ],
  'versicosChave': [
    '2 Pedro 1:20-21',
    '1 Pedro 1:10-12'
  ],
  'tags': [
    'profecia',
    'interpretaÃ§Ã£o',
    'cumprimento',
    'escatologia'
  ],
  'fontes': [
    'Calvino, Institutas I.7',
    'Baldwin, Daniel'
  ]
},
  {
  'id': 'et-030',
  'titulo': 'A Ã‰tica da Guerra e da Paz',
  'categoria': 'Ã‰tica CristÃ£',
  'subcategoria': 'Social',
  'conteudo': [
    'A posiÃ§Ã£o cristÃ£ sobre a guerra Ã© debatida: pacifismo, guerra justa, realismo cristÃ£o.',
    'O pacifismo sustenta que os cristÃ£os nÃ£o devem participar de guerras.',
    'A guerra justa (Agostinho, TomÃ¡s de Aquino) estabelece critÃ©rios para guerra legÃ­tima.',
    'O realismo cristÃ£o (Niebuhr) aceita a guerra como mal necessÃ¡rio.',
    'A BÃ­blia ensina amor ao inimigo â€” mas tambÃ©m proteÃ§Ã£o dos inocentes.'
  ],
  'versicosChave': [
    'Mateus 5:38-48',
    'Romanos 13:1-7',
    '2 CorÃ­ntios 10:3-5'
  ],
  'tags': [
    'guerra',
    'paz',
    'violÃªncia',
    'justiÃ§a'
  ],
  'fontes': [
    'Calvino, Institutas II.8',
    'Calvin, Institutes II.8'
  ]
},
  {
  'id': 'et-031',
  'titulo': 'A Ã‰tica daMENTE',
  'categoria': 'Ã‰tica CristÃ£',
  'subcategoria': 'Mentalidade',
  'conteudo': [
    'A BÃ­blia tem muito a dizer sobre como pensar.',
    'Filipenses 4:8 â€” \'pensai nessas coisas: verdade, honestidade, justiÃ§a, pureza\'.',
    'A renovaÃ§Ã£o da mente Ã© mandamento (Romanos 12:2).',
    'O pensamento cristÃ£o deve ser capturado por Cristo.',
    'A meditaÃ§Ã£o bÃ­blica Ã© pensamento guiado pela Palavra.'
  ],
  'versicosChave': [
    'Filipenses 4:8',
    'Romanos 12:2',
    'JosuÃ© 1:8',
    'Salmo 1:1-3'
  ],
  'tags': [
    'mente',
    'pensamento',
    'renovaÃ§Ã£o',
    'meditaÃ§Ã£o'
  ],
  'fontes': [
    'Calvino, Institutas III.7',
    'Calvin, Institutes III.7'
  ]
},
  {
  'id': 'mi-021',
  'titulo': 'A MissÃ£o no Antigo Testamento',
  'categoria': 'Missiologia',
  'subcategoria': 'Fundamento',
  'conteudo': [
    'A missÃ£o nÃ£o comeÃ§ou no NT â€” Deus sempre teve um povo para Si.',
    'Israel era chamado para ser \'luz das naÃ§Ãµes\' (IsaÃ­as 49:6).',
    'AbraÃ£o foi abenÃ§oado para ser bÃªnÃ§Ã£o a todos os povos.',
    'Os salmos celebram a universalidade do reinado de Deus.',
    'O AT prepara o terreno para a missÃ£o universal do NT.'
  ],
  'versicosChave': [
    'GÃªnesis 12:3',
    'IsaÃ­as 49:6',
    'Salmo 67',
    'Salmo 96:1-3'
  ],
  'tags': [
    'missÃ£o',
    'AT',
    'israel',
    'luz'
  ],
  'fontes': [
    'Calvino, Institutas III.21',
    'Wright, The Mission of God'
  ]
},
  {
  'id': 'an-012',
  'titulo': 'Os Anjos e a OraÃ§Ã£o',
  'categoria': 'Angelologia',
  'subcategoria': 'MinistÃ©rio',
  'conteudo': [
    'Os anjos podem estar envolvidos na transmissÃ£o de oraÃ§Ãµes.',
    'Tobias 12:12 (Apocrifo) mostra um anjo apresentando oraÃ§Ãµes a Deus.',
    'A BÃ­blia canÃ´nica Ã© mais cautelosa sobre esse assunto.',
    'O principal intercessor Ã© Cristo, nÃ£o os anjos.',
    'Os anjos sÃ£o mensageiros, nÃ£o mediadores.'
  ],
  'versicosChave': [
    'Tobias 12:12',
    '1 TimÃ³teo 2:5',
    'Hebreus 7:25'
  ],
  'tags': [
    'anjos',
    'oraÃ§Ã£o',
    'intercessÃ£o',
    'mediador'
  ],
  'fontes': [
    'Calvino, Institutas I.13',
    'Calvin, Institutes I.13'
  ]
},
  {
  'id': 'so-045',
  'titulo': 'A ObediÃªncia CristÃ£ â€” Fruto da GraÃ§a',
  'categoria': 'Soteriologia',
  'subcategoria': 'Vida CristÃ£',
  'conteudo': [
    'A obediÃªncia Ã© fruto da salvaÃ§Ã£o, nÃ£o causa dela.',
    'EfÃ©sios 2:8-10 â€” somos salvos por graÃ§a, mas criados para boas obras.',
    'A obediÃªncia cristÃ£ Ã© motivada por amor, nÃ£o por medo.',
    'A desobediÃªncia nÃ£o anula a salvaÃ§Ã£o, mas a prejudica.',
    'A obediÃªncia Ã©.progressiva â€” crescemos em santidade ao longo da vida.'
  ],
  'versicosChave': [
    'EfÃ©sios 2:8-10',
    '1 JoÃ£o 5:3',
    'JoÃ£o 14:15',
    'Romanos 6:1-2'
  ],
  'tags': [
    'obediÃªncia',
    'graÃ§a',
    'santificaÃ§Ã£o',
    'vida cristÃ£'
  ],
  'fontes': [
    'Calvino, Institutas III.10',
    'Packer, The Ten Commandments'
  ]
},
  {
  'id': 'lp-014',
  'titulo': 'Eclesiastes â€” O Sentido da Vida',
  'categoria': 'Livros PoÃ©ticos',
  'subcategoria': 'Eclesiastes',
  'conteudo': [
    'Eclesiastes Ã© o livro mais existencial da BÃ­blia â€” \'vaidade de vaidades\'.',
    'O Autor (SalomÃ£o?) testa tudo: sabedoria, prazer, trabalho, riqueza.',
    'Tudo Ã© \'vaidade\' â€” vapor, efÃªmero, sem sentido final.',
    'A conclusÃ£o: \'teme a Deus e guarda os Seus mandamentos\'.',
    'O evangelho responde o que Eclesiastes pergunta: o sentido estÃ¡ em Deus.'
  ],
  'versicosChave': [
    'Eclesiastes 1:2',
    'Eclesiastes 12:13-14',
    'Mateus 6:33'
  ],
  'tags': [
    'eclesiastes',
    'sentido',
    'vaidade',
    'temor'
  ],
  'fontes': [
    'Calvino, ComentÃ¡rio a Eclesiastes',
    'Wright, The Message of Ecclesiastes'
  ]
},
  {
  'id': 'cc-066',
  'titulo': 'Cristianismo e ReligiÃµes NÃ£o-CristÃ£s',
  'categoria': 'QuestÃµes ContemporÃ¢neas',
  'subcategoria': 'ReligiÃ£o',
  'conteudo': [
    'Como o cristianismo se relaciona com outras religiÃµes?',
    'O pluralismo religioso sustenta que todas as religiÃµes conduzem a Deus.',
    'O exclusivismo sustenta que Cristo Ã© o Ãºnico caminho.',
    'O inclusivismo sustenta que hÃ¡ salvaÃ§Ã£o fora da Igreja visÃ­vel, mas em Cristo.',
    'A BÃ­blia Ã© clara: \'nenhum outro nome debaixo do cÃ©u\' (Atos 4:12).'
  ],
  'versicosChave': [
    'Atos 4:12',
    'JoÃ£o 14:6',
    '1 TimÃ³teo 2:5'
  ],
  'tags': [
    'religiÃµes',
    'pluralismo',
    'exclusivismo',
    'salvaÃ§Ã£o'
  ],
  'fontes': [
    'Calvino, Institutas II.6',
    'Calvin, Institutes II.6'
  ]
},
  {
  'id': 'cc-067',
  'titulo': 'Cristianismo e Feminismo',
  'categoria': 'QuestÃµes ContemporÃ¢neas',
  'subcategoria': 'GÃªnero',
  'conteudo': [
    'A relaÃ§Ã£o entre cristianismo e feminismo Ã© debatida.',
    'O feminismo cristÃ£o sustenta que a igualdade de gÃªnero Ã© bÃ­blica.',
    'O complementarismo sustenta que homens e mulheres sÃ£o iguais em dignidade, diferentes em funÃ§Ã£o.',
    'A BÃ­blia ensina: \'nÃ£o hÃ¡ homem nem mulher, todos sÃ£o um em Cristo\' (GÃ¡latas 3:28).',
    'O debate gira em torno de lideranÃ§a na igreja e no lar.'
  ],
  'versicosChave': [
    'GÃ¡latas 3:28',
    '1 TimÃ³teos 2:11-15',
    'EfÃ©sios 5:22-33'
  ],
  'tags': [
    'feminismo',
    'gÃªnero',
    'igualdade',
    'complementarismo'
  ],
  'fontes': [
    'Calvino, Institutas II.8',
    'Grudem, Evangelical Feminism'
  ]
},
  {
  'id': 'so-046',
  'titulo': 'O Chamado Eterno',
  'categoria': 'Soteriologia',
  'subcategoria': 'Doutrina',
  'conteudo': [
    'O chamado eterno Ã© a ordem lÃ³gica da salvaÃ§Ã£o na mente de Deus.',
    'Romanos 8:29-30 â€” \'aos que de antemÃ£o conhecceu, tambÃ©m predestinou... e aos que predestinou, esses tambÃ©m chamou\'.',
    'O chamado eterno Ã© anterior Ã  criaÃ§Ã£o do mundo.',
    'Ele inclui: eleiÃ§Ã£o, predestinaÃ§Ã£o, chamado, justificaÃ§Ã£o, glorificaÃ§Ã£o.',
    'Tudo Ã© obra da graÃ§a soberana de Deus.'
  ],
  'versicosChave': [
    'Romanos 8:29-30',
    'EfÃ©sios 1:4-5',
    '2 TimÃ³teo 1:9'
  ],
  'tags': [
    'chamado',
    'eterno',
    'predestinaÃ§Ã£o',
    'graÃ§a'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'so-047',
  'titulo': 'A GlorificaÃ§Ã£o dos Santos',
  'categoria': 'Soteriologia',
  'subcategoria': 'Escatologia',
  'conteudo': [
    'A glorificaÃ§Ã£o Ã© a consumaÃ§Ã£o final da salvaÃ§Ã£o.',
    'Romanos 8:30 â€” \'aos que justificou, esses tambÃ©m glorificou\'.',
    'A glorificaÃ§Ã£o inclui a ressurreiÃ§Ã£o do corpo e a TransformaÃ§Ã£o total.',
    'Seremos como Cristo porque O viremos como Ele Ã©.',
    'A glorificaÃ§Ã£o Ã© certeza â€” Deus promete e cumpre.'
  ],
  'versicosChave': [
    'Romanos 8:30',
    '1 JoÃ£o 3:2',
    'Filipenses 3:20-21'
  ],
  'tags': [
    'glorificaÃ§Ã£o',
    'ressurreiÃ§Ã£o',
    'perfeiÃ§Ã£o'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'so-048',
  'titulo': 'A MaldiÃ§Ã£o do Pecado',
  'categoria': 'Soteriologia',
  'subcategoria': 'Hamartiologia',
  'conteudo': [
    'A maldiÃ§Ã£o do pecado Ã© a condenaÃ§Ã£o que recai sobre todo ser humano.',
    'Romanos 3:23 â€” \'todos pecaram e estÃ£o destituÃ­dos da glÃ³ria de Deus\'.',
    'Romanos 6:23 â€” \'o salÃ¡rio do pecado Ã© a morte\'.',
    'A maldiÃ§Ã£o Ã© universal â€” atinge a todos sem exceÃ§Ã£o.',
    'Somente Cristo pode redimir da maldiÃ§Ã£o (GÃ¡latas 3:13).'
  ],
  'versicosChave': [
    'Romanos 3:23',
    'Romanos 6:23',
    'GÃ¡latas 3:13'
  ],
  'tags': [
    'maldiÃ§Ã£o',
    'pecado',
    'condenaÃ§Ã£o'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'so-049',
  'titulo': 'A RedenÃ§Ã£o em Cristo',
  'categoria': 'Soteriologia',
  'subcategoria': 'BenefÃ­cios',
  'conteudo': [
    'A redenÃ§Ã£o Ã© o ato de Deus de nos comprar da escravidÃ£o do pecado.',
    'EfÃ©sios 1:7 â€” \'nEle temos a redenÃ§Ã£o pelo Seu sangue\'.',
    'O preÃ§o foi o sangue de Cristo â€” valor infinito.',
    'A redenÃ§Ã£o inclui: justificaÃ§Ã£o, regeneraÃ§Ã£o, santificaÃ§Ã£o.',
    'A redenÃ§Ã£o Ã© completa â€” nada pode ser adicionado Ã  obra consumada.'
  ],
  'versicosChave': [
    'EfÃ©sios 1:7',
    'Colossenses 1:14',
    '1 Pedro 1:18-19'
  ],
  'tags': [
    'redenÃ§Ã£o',
    'sangue',
    'compra'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'so-050',
  'titulo': 'A MaldiÃ§Ã£o Removida pela Cruz',
  'categoria': 'Soteriologia',
  'subcategoria': 'ExpiaÃ§Ã£o',
  'conteudo': [
    'Cristo removeu a maldiÃ§Ã£o ao se tornar maldiÃ§Ã£o por nÃ³s.',
    'GÃ¡latas 3:13 â€” \'Cristo nos resgatou da maldiÃ§Ã£o da lei, fazendo-se maldiÃ§Ã£o por nÃ³s\'.',
    'A cruz Ã© o meio pelo qual a maldiÃ§Ã£o foi suportada.',
    'A satisfaÃ§Ã£o vicÃ¡ria â€” Cristo pagou o que nÃ³s devÃ­amos.',
    'A maldiÃ§Ã£o foi removida de uma vez para sempre.'
  ],
  'versicosChave': [
    'GÃ¡latas 3:13',
    '2 CorÃ­ntios 5:21',
    '1 Pedro 2:24'
  ],
  'tags': [
    'cruz',
    'maldiÃ§Ã£o',
    'satisfaÃ§Ã£o'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'so-051',
  'titulo': 'O Pecado Contra o EspÃ­rito Santo',
  'categoria': 'Soteriologia',
  'subcategoria': 'Pecado',
  'conteudo': [
    'O pecado contra o EspÃ­rito Santo Ã© atribuir a obra do EspÃ­rito a SatanÃ¡s.',
    'Mateus 12:31-32 â€” \'todo pecado e blasfÃªmia serÃ£o perdoados... mas a blasfÃªmia contra o EspÃ­rito nÃ£o serÃ¡ perdoada\'.',
    'Este pecado Ã© rejeiÃ§Ã£o deliberada e consciente da verdade.',
    'Ã‰ a rebeliÃ£o final e irrecuperÃ¡vel contra Deus.',
    'A maioria dos teÃ³logos diz que um cristÃ£o verdadeiro nÃ£o pode cometer este pecado.'
  ],
  'versicosChave': [
    'Mateus 12:31-32',
    'Hebreus 6:4-6',
    '1 JoÃ£o 5:16'
  ],
  'tags': [
    'blasfÃªmia',
    'espÃ­rito santo',
    'pecado'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'so-052',
  'titulo': 'A Vida Eterna â€” Presente e Futura',
  'categoria': 'Soteriologia',
  'subcategoria': 'Escatologia',
  'conteudo': [
    'A vida eterna Ã© tanto presente quanto futura.',
    'JoÃ£o 5:24 â€” \'quem ouve a Minha palavra... tem a vida eterna e nÃ£o entrarÃ¡ em juÃ­zo\'.',
    'A vida eterna presente Ã© relaÃ§Ã£o com Deus (JoÃ£o 17:3).',
    'A vida eterna futura Ã© gozo eterno na presenÃ§a de Deus.',
    'A vida eterna Ã© dom de Deus â€” nÃ£o Ã© conquistada.'
  ],
  'versicosChave': [
    'JoÃ£o 5:24',
    'JoÃ£o 17:3',
    'Romanos 6:23'
  ],
  'tags': [
    'vida eterna',
    'presente',
    'futuro'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'cr-027',
  'titulo': 'Cristo â€” O Novo AdÃ£o',
  'categoria': 'Cristologia',
  'subcategoria': 'Tipologia',
  'conteudo': [
    'Cristo Ã© o novo AdÃ£o que obedece onde AdÃ£o desobedeceu.',
    'Romanos 5:12-21 â€” contraste entre AdÃ£o e Cristo.',
    'Onde AdÃ£o trouxe pecado e morte, Cristo trouxe justiÃ§a e vida.',
    'A obediÃªncia de Cristo Ã© perfeita e completa.',
    'A justificaÃ§Ã£o Ã© por obediÃªncia de um sÃ³ â€” Cristo.'
  ],
  'versicosChave': [
    'Romanos 5:12-21',
    '1 CorÃ­ntios 15:22-45'
  ],
  'tags': [
    'adÃ£o',
    'novoadÃ£o',
    'obediÃªncia'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'cr-028',
  'titulo': 'Cristo â€” O Bom Pastor',
  'categoria': 'Cristologia',
  'subcategoria': 'MetÃ¡fora',
  'conteudo': [
    'Jesus se declara o Bom Pastor que dÃ¡ Sua vida pelas ovelhas.',
    'JoÃ£o 10:11 â€” \'Eu sou o Bom Pastor; o Bom Pastor dÃ¡ a Sua vida pelas ovelhas\'.',
    'O pastor conhece suas ovelhas e elas conhecem sua voz.',
    'Cristo tem outras ovelhas que ainda nÃ£o conhece.',
    'A seguranÃ§a das ovelhas estÃ¡ na mÃ£o do Pai e na mÃ£o do Filho.'
  ],
  'versicosChave': [
    'JoÃ£o 10:11-18',
    '1 Pedro 2:25',
    '1 Pedro 5:4'
  ],
  'tags': [
    'pastor',
    'ovelhas',
    'seguranÃ§a'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'cr-029',
  'titulo': 'Cristo â€” O Cordeiro de Deus',
  'categoria': 'Cristologia',
  'subcategoria': 'MetÃ¡fora',
  'conteudo': [
    'Jesus Ã© o Cordeiro de Deus que tira o pecado do mundo.',
    'JoÃ£o 1:29 â€” \'eis o Cordeiro de Deus, que tira o pecado do mundo\'.',
    'A metÃ¡fora do cordeiro aponta para o sacrifÃ­cio pascal.',
    'Cristo Ã© o Cordeiro imaculado â€” sem pecado.',
    'O cordeiro foi morto desde a fundaÃ§Ã£o do mundo (Apocalipse 13:8).'
  ],
  'versicosChave': [
    'JoÃ£o 1:29',
    '1 CorÃ­ntios 5:7',
    'Apocalipse 5:6-12'
  ],
  'tags': [
    'cordeiro',
    'sacrifÃ­cio',
    'pascal'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'cr-030',
  'titulo': 'Cristo â€” A Rocha',
  'categoria': 'Cristologia',
  'subcategoria': 'MetÃ¡fora',
  'conteudo': [
    'Cristo Ã© a Rocha que sustenta o crente.',
    '1 CorÃ­ntios 10:4 â€” \'a Rocha era Cristo\'.',
    'A rocha no desertoä¾›æ°´ä»¥è‰²åˆ— â€” Cristo nos dÃ¡ vida.',
    'Cristo Ã© a Rocha sobre a qual a igreja Ã© edificada.',
    'Os inimigos tropeÃ§am na Rocha â€” ela Ã© pedra de tropeÃ§o e de sustentaÃ§Ã£o.'
  ],
  'versicosChave': [
    '1 CorÃ­ntios 10:4',
    'Mateus 16:18',
    '1 Pedro 2:4-8'
  ],
  'tags': [
    'rocha',
    'sustento',
    'fundamento'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'cr-031',
  'titulo': 'Cristo â€” O Caminho, a Verdade e a Vida',
  'categoria': 'Cristologia',
  'subcategoria': 'MetÃ¡fora',
  'conteudo': [
    'Jesus Ã© o Ãºnico caminho para Deus.',
    'JoÃ£o 14:6 â€” \'Eu sou o caminho, a verdade e a vida; ninguÃ©m vem ao Pai senÃ£o por Mim\'.',
    'NÃ£o hÃ¡ mÃºltiplos caminhos â€” hÃ¡ um sÃ³.',
    'Cristo Ã© a verdade â€” nÃ£o apenas ensina verdade, Ã© a verdade.',
    'Cristo Ã© a vida â€” sem Ele, nÃ£o hÃ¡ vida eterna.'
  ],
  'versicosChave': [
    'JoÃ£o 14:6',
    'Atos 4:12'
  ],
  'tags': [
    'caminho',
    'verdade',
    'vida'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'cr-032',
  'titulo': 'Cristo â€” O Mediador da Nova AlianÃ§a',
  'categoria': 'Cristologia',
  'subcategoria': 'AlianÃ§a',
  'conteudo': [
    'Cristo Ã© o mediador da nova alianÃ§a entre Deus e os homens.',
    '1 TimÃ³teo 2:5 â€” \'um sÃ³ Ã© o Mediador entre Deus e os homens, o homem Cristo Jesus\'.',
    'A nova alianÃ§a Ã© melhor que a antiga â€” escrita no coraÃ§Ã£o.',
    'Cristo intercede por nÃ³s continuamente.',
    'A mediaÃ§Ã£o de Cristo Ã© eficaz e eterna.'
  ],
  'versicosChave': [
    '1 TimÃ³teo 2:5',
    'Hebreus 8:6',
    'Hebreus 9:15'
  ],
  'tags': [
    'mediador',
    'alianÃ§a',
    'intercessÃ£o'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'pn-018',
  'titulo': 'O EspÃ­rito Santo e a Unidade da FÃ©',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Eclesiologia',
  'conteudo': [
    'O EspÃ­rito Santo promove a unidade na verdade.',
    'EfÃ©sios 4:3-6 â€” \'um sÃ³ EspÃ­rito... uma sÃ³ fÃ©\'.',
    'A unidade nÃ£o Ã© apenas organizational, mas espiritual.',
    'O EspÃ­rito nos guia em toda a verdade.',
    'A unidade Ã© testemunho ao mundo da realidade de Cristo.'
  ],
  'versicosChave': [
    'EfÃ©sios 4:3-6',
    'JoÃ£o 16:13'
  ],
  'tags': [
    'unidade',
    'fÃ©',
    'verdade'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'pn-019',
  'titulo': 'O EspÃ­rito Santo e a RessurreiÃ§Ã£o',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Poder',
  'conteudo': [
    'O EspÃ­rito Santo Ã© o poder da ressurreiÃ§Ã£o.',
    'Romanos 8:11 â€” \'o EspÃ­rito... que ressuscitou a Jesus dentre os mortos\'.',
    'O mesmo poder que ressuscitou Cristo habita em nÃ³s.',
    'A ressurreiÃ§Ã£o Ã© obra da Trindade.',
    'O EspÃ­rito nos dÃ¡ vida nova agora e na ressurreiÃ§Ã£o.'
  ],
  'versicosChave': [
    'Romanos 8:11',
    'EfÃ©sios 1:19-20'
  ],
  'tags': [
    'ressurreiÃ§Ã£o',
    'poder',
    'espÃ­rito'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'pn-020',
  'titulo': 'O EspÃ­rito Santo na ConsciÃªncia',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Obras',
  'conteudo': [
    'O EspÃ­rito Santo atua na consciÃªncia humana.',
    'JoÃ£o 16:8 â€” \'convencerÃ¡ o mundo de pecado, de justiÃ§a e de juÃ­zo\'.',
    'O EspÃ­rito convence do pecado â€” mostra nossa necessidade de salvaÃ§Ã£o.',
    'O EspÃ­rito convence da justiÃ§a â€” mostra que Cristo Ã© a nossa justiÃ§a.',
    'O EspÃ­rito convence do juÃ­zo â€” mostra que SatanÃ¡s foi julgado.'
  ],
  'versicosChave': [
    'JoÃ£o 16:8-11'
  ],
  'tags': [
    'consciÃªncia',
    'convicÃ§Ã£o',
    'juÃ­zo'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'hm-011',
  'titulo': 'A GramÃ¡tica HistÃ³rica',
  'categoria': 'HermenÃªutica',
  'subcategoria': 'MÃ©todo',
  'conteudo': [
    'A gramÃ¡tica histÃ³rica estuda o significado das palavras no contexto original.',
    'O lÃ©xico bÃ­blico Ã© essencial para a interpretaÃ§Ã£o.',
    'As palavras tÃªm significado que muda ao longo do tempo.',
    'O contexto imediato e o uso bÃ­blico determinam o significado.',
    'A gramÃ¡tica histÃ³rica Ã© o fundamento de toda hermenÃªutica.'
  ],
  'versicosChave': [
    '2 TimÃ³teo 2:15',
    '1 CorÃ­ntios 2:13'
  ],
  'tags': [
    'gramÃ¡tica',
    'histÃ³rica',
    'lÃ©xico'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'hm-012',
  'titulo': 'A InterpretaÃ§Ã£o de Salmos',
  'categoria': 'HermenÃªutica',
  'subcategoria': 'MÃ©todo',
  'conteudo': [
    'Os salmos requerem atenÃ§Ã£o ao gÃªnero literÃ¡rio.',
    'Os salmos de louvo sÃ£o diferentes dos de lamento.',
    'Alguns salmos sÃ£o messiÃ¢nicos â€” apontam para Cristo.',
    'O salmo deve ser interpretado em seu contexto histÃ³rico.',
    'Os salmos sÃ£o modelo de oraÃ§Ã£o para a Igreja.'
  ],
  'versicosChave': [
    'Salmo 23:1-6',
    'Salmo 51:1-17'
  ],
  'tags': [
    'salmos',
    'oraÃ§Ã£o',
    'louvo'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'et-032',
  'titulo': 'A Ã‰tica da ComunicaÃ§Ã£o',
  'categoria': 'Ã‰tica CristÃ£',
  'subcategoria': 'PrÃ¡tica',
  'conteudo': [
    'A BÃ­blia tem muito a dizer sobre como nos comunicamos.',
    'EfÃ©sios 4:29 â€” \'nenhuma palavra corrupta saia da boca\'.',
    'A lÃ­ngua Ã© pequena, mas causa grandes danos (Tiago 3:1-12).',
    'A comunicaÃ§Ã£o cristÃ£ deve ser: verdadeira, amorosa, necessÃ¡ria, oportuna.',
    'A mentira Ã© pecado â€” a verdade Ã© virtude.'
  ],
  'versicosChave': [
    'EfÃ©sios 4:29',
    'Tiago 3:1-12',
    'Colossenses 4:6'
  ],
  'tags': [
    'comunicaÃ§Ã£o',
    'lÃ­ngua',
    'verdade'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'et-033',
  'titulo': 'A Ã‰tica da FamÃ­lia',
  'categoria': 'Ã‰tica CristÃ£',
  'subcategoria': 'Social',
  'conteudo': [
    'A famÃ­lia Ã© instituiÃ§Ã£o divina â€” Deus a criou antes da Igreja.',
    'EfÃ©sios 5:22-33 â€” maridos e mulheres se amam como Cristo e a igreja.',
    'ProvÃ©rbios 22:6 â€” \'ensina ao menino o caminho em que deve andar\'.',
    'A famÃ­lia Ã© a base da sociedade â€” quando a famÃ­lia se desfaz, a sociedade desmorona.',
    'A famÃ­lia cristÃ£ deve ser testemunho do evangelho.'
  ],
  'versicosChave': [
    'EfÃ©sios 5:22-33',
    'ProvÃ©rbios 22:6',
    'DeuteronÃ´mio 6:4-9'
  ],
  'tags': [
    'famÃ­lia',
    'casamento',
    'filhos'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'et-034',
  'titulo': 'A Ã‰tica do Meio Ambiente',
  'categoria': 'Ã‰tica CristÃ£',
  'subcategoria': 'CriaÃ§Ã£o',
  'conteudo': [
    'A BÃ­blia ensina responsabilidade sobre a criaÃ§Ã£o.',
    'GÃªnesis 2:15 â€” \'cultivar e guardar\' o jardim.',
    'A criaÃ§Ã£o clama por redenÃ§Ã£o (Romanos 8:19-22).',
    'O cristÃ£o deve ser mordomo responsÃ¡vel da criaÃ§Ã£o.',
    'A exploraÃ§Ã£o da criaÃ§Ã£o Ã© contrÃ¡ria ao mandamento divino.'
  ],
  'versicosChave': [
    'GÃªnesis 2:15',
    'Romanos 8:19-22',
    'Salmo 24:1'
  ],
  'tags': [
    'meio ambiente',
    'criaÃ§Ã£o',
    'stewardship'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'mi-022',
  'titulo': 'A MissÃ£o e a Cultura',
  'categoria': 'Missiologia',
  'subcategoria': 'ContextualizaÃ§Ã£o',
  'conteudo': [
    'O evangelho deve ser contextualizado sem ser corrompido.',
    'Paulo se adaptou culturalmente para ganhar mais pessoas.',
    'A contextualizaÃ§Ã£o nÃ£o Ã© sincretismo.',
    'O perigo Ã© contextualizar tanto que o evangelho se perde.',
    'A missÃ£o exige: humildade, estudo, oraÃ§Ã£o, coragem.'
  ],
  'versicosChave': [
    '1 CorÃ­ntios 9:19-23',
    'Atos 17:22-34'
  ],
  'tags': [
    'cultura',
    'contextualizaÃ§Ã£o',
    'missÃ£o'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'cc-068',
  'titulo': 'Cristianismo e Tecnologia',
  'categoria': 'QuestÃµes ContemporÃ¢neas',
  'subcategoria': 'Cultura',
  'conteudo': [
    'A tecnologia Ã© ferramenta â€” pode ser usada para bem ou para mal.',
    'A IA e a automaÃ§Ã£o levantam questÃµes Ã©ticas.',
    'A vigilÃ¢ncia digital pode ser usada para controle social.',
    'O cristÃ£o deve ser sÃ¡bio no uso da tecnologia.',
    'A tecnologia nÃ£o substitui a comunhÃ£o humana.'
  ],
  'versicosChave': [
    'ProvÃ©rbios 25:2',
    'EfÃ©sios 5:15-16'
  ],
  'tags': [
    'tecnologia',
    'IA',
    'cultura'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'cc-069',
  'titulo': 'Cristianismo e a Crise Ambiental',
  'categoria': 'QuestÃµes ContemporÃ¢neas',
  'subcategoria': 'CriaÃ§Ã£o',
  'conteudo': [
    'A crise ambiental Ã© real â€” o cristÃ£o deve responder.',
    'O consumismo Ã© idolatria â€” \'nÃ£o acumuleis tesouros na terra\'.',
    'A criaÃ§Ã£o Ã© boa â€” Deus a criou e a sustenta.',
    'A responsabilidade sobre a criaÃ§Ã£o Ã© mandamento.',
    'A esperanÃ§a cristÃ£ inclui a renovaÃ§Ã£o de toda a criaÃ§Ã£o.'
  ],
  'versicosChave': [
    'Mateus 6:19-21',
    'Romanos 8:19-22'
  ],
  'tags': [
    'ambiente',
    'crise',
    'criaÃ§Ã£o'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'bi-015',
  'titulo': 'A Escritura como Norma Suprema',
  'categoria': 'Bibliologia',
  'subcategoria': 'Autoridade',
  'conteudo': [
    'A BÃ­blia Ã© a autoridade suprema em todas as questÃµes de fÃ© e prÃ¡tica.',
    'NÃ£o hÃ¡ outra revelaÃ§Ã£o alÃ©m da Escritura.',
    'A tradiÃ§Ã£o tem valor, mas estÃ¡ sujeita Ã  BÃ­blia.',
    'O magistÃ©rio Ã© Ãºtil, mas nÃ£o infalÃ­vel.',
    'A autoridade da BÃ­blia Ã© auto-testemunhada.'
  ],
  'versicosChave': [
    '2 TimÃ³teo 3:16-17',
    'IsaÃ­as 40:8'
  ],
  'tags': [
    'autoridade',
    'norma',
    'suprema'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'bi-016',
  'titulo': 'A Perspicuidade da Escritura',
  'categoria': 'Bibliologia',
  'subcategoria': 'InterpretaÃ§Ã£o',
  'conteudo': [
    'A BÃ­blia Ã© suficientemente clara para que qualquer pessoa possa entender a mensagem central.',
    'A claridade nÃ£o significa facilidade â€” a BÃ­blia tem passagens difÃ­ceis.',
    'O EspÃ­rito Santo ilumina a mente para compreender.',
    'A oraÃ§Ã£o e o estudo sÃ£o necessÃ¡rios.',
    'A perspicuidade Ã© um princÃ­pio reformado.'
  ],
  'versicosChave': [
    'Salmo 19:7-8',
    'Salmo 119:130'
  ],
  'tags': [
    'claridade',
    'perspicuidade',
    'interpretaÃ§Ã£o'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},


  // --- PNEUMATOLOGIA (expandido) ---
  { id: 'pneum-001', titulo: 'A Terceira Pessoa da Trindade', categoria: 'Pneumatologia', subcategoria: 'Natureza do Espirito Santo', conteudo: ['O Espirito Santo e a terceira pessoa da Trindade, co-igual e co-eterno com o Pai e o Filho.', 'Ate o Concilio de Constantinopla (381 d.C.), muitos cristoes duvidavam da divindade do Espirito Santo.', 'O Credo Niceno-Constantinopolitano afirma que o Espirito Santo e Senhor e Doador da vida.', 'O Espirito Santo possui todas as qualidades divinas: onisciencia, onipresencia, onipotencia.', 'Em Atos 5:3-4, mentir ao Espirito Santo e mentir a Deus, confirmando Sua divindade.'], versicosChave: ['João 14:26', 'Atos 5:3-4', '1 Coríntios 12:4-6'], tags: ['espirito santo', 'trindade', 'divindade'], fontes: ['Teologia Sistematica - Grudem', 'Historia da Igreja - Justo Gonzalez'] },
  { id: 'pneum-002', titulo: 'Os Dons do Espirito Santo', categoria: 'Pneumatologia', subcategoria: 'Dons Espirituais', conteudo: ['Os dons espirituais sao distribuidos pelo Espirito Santo segundo a Sua vontade.', 'Dons espirituais sao capacitacoes sobrenaturais dadas aos crentes para edificacao da igreja.', 'Diferente de talentos naturais, dons espirituais sao dados especificamente para servico na igreja.', 'Todos os crentes recebem pelo menos um don espiritual (1 Pedro 4:10).', 'Os dons nao sao para exaltacao pessoal, mas para o bem comum da comunidade cristã.'], versicosChave: ['1 Coríntios 12:4-11', '1 Pedro 4:10', 'Romanos 12:6-8'], tags: ['dons espirituais', 'carismas', 'edificacao'], fontes: ['Teologia do Novo Testamento - George Eldon Ladd'] },
  { id: 'pneum-003', titulo: 'O Batismo no Espirito Santo', categoria: 'Pneumatologia', subcategoria: 'Experiencias Espirituais', conteudo: ['O batismo no Espirito Santo e uma experiencia unica que une o crente a Cristo.', 'Todos os crentes sao batizados no Espirito Santo no momento da conversao.', 'O batismo no Espirito Santo empodera a identidade do crente no corpo de Cristo.', 'A plenitude do Espirito e uma experiencia continua, nao apenas um evento unico.', 'O batismo no Espirito Santo capacita para testemunho e servico.'], versicosChave: ['Atos 2:4', '1 Coríntios 12:13', 'Efésios 5:18'], tags: ['batismo', 'espirito santo', 'pentecostes'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  { id: 'pneum-004', titulo: 'O Fruto do Espirito Santo', categoria: 'Pneumatologia', subcategoria: 'Carater Cristao', conteudo: ['O fruto do Espirito Santo e o resultado natural da vida vivida em submissao ao Espirito.', 'Os nove frutos formam um todo integrado, nao virtudes isoladas.', 'Amor e o primeiro fruto, pois e a base de todos os outros.', 'O fruto do Espirito se desenvolve gradualmente ao longo da vida cristã.', 'Diferente dos dons, o fruto e produzido em todos os crentes.'], versicosChave: ['Gálatas 5:22-23', 'Romanos 8:9', 'Colossenses 1:10'], tags: ['fruto', 'carater', 'santificacao'], fontes: ['A Vida do Espirito - Watchman Nee'] },
  { id: 'pneum-005', titulo: 'A Uncao do Espirito Santo', categoria: 'Pneumatologia', subcategoria: 'Ministerio', conteudo: ['A uncao do Espirito Santo capacita para ministerio profetico, sacerdotal e real.', 'Todos os crentes sao uncos pelo Espirito Santo.', 'A uncao nao e uma experiencia emocional, mas uma realidade espiritual.', 'A uncao do Espirito Santo e o que torna o ministerio eficaz.', 'A uncao pode ser perdida por desobediencia, mas restaurada por arrependimento.'], versicosChave: ['1 João 2:20', '2 Coríntios 1:21-22', '1 João 2:27'], tags: ['uncao', 'ministerio', 'capacitacao'], fontes: ['O Ministerio do Espirito Santo - Gordon Fee'] },
  // --- ANGELOGIA ---
  { id: 'angel-001', titulo: 'A Natureza dos Anjos', categoria: 'Angelologia', subcategoria: 'Seres Angelicais', conteudo: ['Anjos sao seres criados por Deus, espirituais e pessoais.', 'Foram criados antes da criacao do mundo.', 'Os anjos possuem inteligencia, emocoes e vontade propria.', 'Sao seres sobrenaturais com poderes que superam os humanos.', 'Os anjos nao se casam nem se reproduzem.'], versicosChave: ['Colossenses 1:16', 'Hebreus 1:14', 'Mateus 22:30'], tags: ['anjos', 'seres espirituais', 'criacao'], fontes: ['Teologia Sistematica - Millard Erickson'] },
  { id: 'angel-002', titulo: 'A Hierarquia Angelical', categoria: 'Angelologia', subcategoria: 'Ordem Angelical', conteudo: ['A Escritura menciona diferentes ordens de anjos: serafins, querubins, arcanjos.', 'Serafins cercam o trono de Deus cantando Santo, santo, santo.', 'Querubins guardam o caminho da arvore da vida.', 'Miguel e o unico arcanjo mencionado pelo nome na Escritura.', 'Gabriel e o anjo mensageiro que anunciou o nascimento de Jesus.'], versicosChave: ['Isaías 6:1-3', 'Gênesis 3:24', 'Daniel 10:13'], tags: ['anjos', 'hierarquia', 'serafins', 'querubins'], fontes: ['Historia da Redencao - Louis Berkhof'] },
  { id: 'angel-003', titulo: 'Anjos Mensageiros', categoria: 'Angelologia', subcategoria: 'Ministerio Angelical', conteudo: ['Anjos servem como mensageiros de Deus.', 'Gabriel anunciou o nascimento de João Batista e de Jesus.', 'Anjos anunciaram a ressurreição de Jesus às mulheres.', 'No AT, anjos visitaram Abraão, Lot e Jacob.', 'Os anjos do Senhor apareceram aos pastores para anunciar o nascimento de Jesus.'], versicosChave: ['Lucas 1:26-38', 'Mateus 28:5-7', 'Lucas 2:8-14'], tags: ['anjos', 'mensageiros', 'anuncio'], fontes: ['Comentario ao Antigo Testamento - Keil e Delitzsch'] },
  { id: 'angel-004', titulo: 'Anjos Guerreiros', categoria: 'Angelologia', subcategoria: 'Protecao e Juizo', conteudo: ['Anjos agem como guerreiros de Deus para proteger e executar juizos.', 'O anjo do Senhor destruiu 185.000 soldados assirios.', 'Miguel liderou os anjos na batalha contra Satanias.', 'Os quatro cavaleiros do Apocalipse sao anjos que executam juizos.', 'Anjos protegem os crentes de perigos fisicos e espirituais.'], versicosChave: ['2 Reis 19:35', 'Apocalipse 12:7-9', 'Salmo 91:11-12'], tags: ['anjos', 'guerreiros', 'protecao', 'juizo'], fontes: ['Teologia do Antigo Testamento - J.I. Packer'] },
  { id: 'angel-005', titulo: 'A Queda de Satanias e dos Anjos', categoria: 'Angelologia', subcategoria: 'Demonologia', conteudo: ['Satanias era um querubim perfeito ate a iniquidade corromper seu coração.', 'A queda de Satanias ocorreu antes da queda do homem.', 'Um terco dos anjos seguiram Satanias na rebeliao.', 'Os anjos caidos foram despojados de sua gloria e condenados eternamente.', 'Satanias e descrito como deus deste mundo e principe deste mundo.'], versicosChave: ['Ezequiel 28:15-17', 'Apocalipse 12:4', '2 Coríntios 4:4'], tags: ['satanias', 'queda', 'anjos caidos', 'demonios'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  // --- DEMONOLOGIA ---
  { id: 'demon-001', titulo: 'A Natureza dos Demonios', categoria: 'Demonologia', subcategoria: 'Seres Demoniacos', conteudo: ['Demonios sao anjos caidos que seguiram Satanias na rebeliao contra Deus.', 'Sao seres espirituais inteligentes, pessoais e malevolos.', 'Os demonios buscam enganar, destruir e contrariar a obra de Deus.', 'Podem possuir e oprimir pessoas.', 'Os demonios temem o nome de Jesus e se submetem ao poder de Deus.'], versicosChave: ['Tiago 2:19', 'Marcos 5:1-20', 'Efésios 6:12'], tags: ['demonios', 'anjos caidos', 'opressao', 'possessao'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  { id: 'demon-002', titulo: 'A Batalha Espiritual', categoria: 'Demonologia', subcategoria: 'Guerra Espiritual', conteudo: ['A batalha espiritual nao e contra carne e sangue, mas contra principados e potestades.', 'A armadura de Deus e nossa defesa na batalha espiritual.', 'A oracao e a arma principal na guerra espiritual.', 'O nome de Jesus tem autoridade sobre todo demonio.', 'Vencemos pela fé em Cristo, nao por forcas proprias.'], versicosChave: ['Efésios 6:12', 'Efésios 6:13-18', 'Lucas 10:17'], tags: ['guerra espiritual', 'armadura', 'autoridade'], fontes: ['Batalha Espiritual - C. Fred Dickason'] },
  // --- HAMARTIOLOGIA ---
  { id: 'hamart-001', titulo: 'A Natureza do Pecado', categoria: 'Hamartiologia', subcategoria: 'Doutrina do Pecado', conteudo: ['Pecado e qualquer coisa que contradiz a natureza perfeita de Deus.', 'O pecado original entrou no mundo pela desobediencia de Adão e Eva.', 'Todos os humanos nascem com a natureza pecaminosa.', 'O pecado nao e apenas acoes externas, mas tambem pensamentos do coração.', 'O pecado separa o homem de Deus e exige expiacao.'], versicosChave: ['Romanos 3:23', 'Gênesis 3:1-7', 'Isaías 59:2'], tags: ['pecado', 'natureza humana', 'queda'], fontes: ['Teologia Sistematica - Louis Berkhof'] },
  { id: 'hamart-002', titulo: 'O Pecado Original', categoria: 'Hamartiologia', subcategoria: 'Hereditariedade do Pecado', conteudo: ['O pecado original nao se refere ao primeiro pecado de Adão, mas a sua consequencia.', 'Todos os humanos herdam a natureza pecaminosa de Adão.', 'O pecado original nos inclina ao pecado.', 'Apenas Jesus Cristo nao teve pecado original.', 'O batismo simboliza a morte ao pecado original.'], versicosChave: ['Romanos 5:12-21', 'Salmo 51:5', 'Efésios 2:3'], tags: ['pecado original', 'hereditariedade'], fontes: ['Teologia Sistematica - Charles Hodge'] },
  { id: 'hamart-003', titulo: 'Os Tipos de Pecado', categoria: 'Hamartiologia', subcategoria: 'Classificacao', conteudo: ['Pecado de comissao: quando fazemos o que Deus proibiu.', 'Pecado de omissao: quando deixamos de fazer o que Deus ordenou.', 'Pecado de pensamento: pecados internos que precedem acoes.', 'Pecado mortal: leva a morte espiritual e separacao eterna.', 'Pecado venial: falhas que nao destroem a relacao com Deus.'], versicosChave: ['1 João 3:4', 'Tiago 4:17', 'Mateus 5:28'], tags: ['tipos de pecado', 'comissao', 'omissao'], fontes: ['Etica Crista - John Stott'] },
  // --- CRISTOLOGIA ---
  { id: 'crist-001', titulo: 'A Dupla Natureza de Cristo', categoria: 'Cristologia', subcategoria: 'Natureza de Cristo', conteudo: ['Jesus Cristo e plenamente Deus e plenamente homem.', 'A natureza divina e humana estao unidas em uma unica pessoa.', 'O Concilio de Calcedonia definiu a uniao hipostatica.', 'Jesus era completamente humano: sentia fome, sede e dor.', 'Jesus era completamente Deus: perdoava pecados e controlava a natureza.'], versicosChave: ['João 1:14', 'Colossenses 2:9', 'Filipenses 2:5-8'], tags: ['cristologia', 'natureza divina', 'natureza humana'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  { id: 'crist-002', titulo: 'A Obra Redentora de Cristo', categoria: 'Cristologia', subcategoria: 'Salvacao', conteudo: ['A morte de Jesus na cruz foi substituicao vicaria.', 'A ressurreicao prova Sua vitória sobre a morte.', 'A ascensao prepara o lugar para os crentes.', 'A intercessao garante a salvacao dos santos.', 'A segunda vinda completara a obra redentora.'], versicosChave: ['1 Coríntios 15:3-4', 'Romanos 5:8', 'Hebreus 7:25'], tags: ['redencao', 'cruz', 'ressurreicao'], fontes: ['A Cruz de Cristo - John Stott'] },
  // --- SOTERIOLOGIA ---
  { id: 'soter-001', titulo: 'A Justificacao pela Fe', categoria: 'Soteriologia', subcategoria: 'Doutrina da Salvacao', conteudo: ['Justificacao e o ato de Deus de declarar justo o pecador pela fe.', 'A justificacao e por graça somente, nao por obras.', 'A fe e o meio, nao a causa meritoria.', 'A justificacao e completa e instantanea.', 'A justificacao inclui perdao e imputacao da justiça de Cristo.'], versicosChave: ['Romanos 3:24-28', 'Efésios 2:8-9', 'Gálatas 2:16'], tags: ['justificacao', 'fe', 'graça'], fontes: ['A Teologia da Reforma - Alister McGrath'] },
  { id: 'soter-002', titulo: 'A Regeneracao', categoria: 'Soteriologia', subcategoria: 'Renascimento Espiritual', conteudo: ['Regeneracao e a obra do Espirito Santo que transforma o pecador.', 'O renascimento e necessario para entrar no Reino de Deus.', 'A regeneracao e um ato soberano de Deus.', 'A regeneracao produz uma nova criatura.', 'A regeneracao e o fundamento da perseveranca.'], versicosChave: ['João 3:3-5', 'Tito 3:5', '2 Coríntios 5:17'], tags: ['regeneracao', 'renascimento'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  { id: 'soter-003', titulo: 'A Adocao', categoria: 'Soteriologia', subcategoria: 'Identidade Cristã', conteudo: ['Adocao e o ato de Deus de receber o pecador como filho.', 'A adocao e um presente da graça de Deus.', 'Recebemos todos os direitos de filhos de Deus.', 'O Espirito Santo testemunha que somos filhos.', 'A adocao completa sera revelada na ressurreicao.'], versicosChave: ['Efésios 1:5', 'Romanos 8:15-17', 'Gálatas 4:4-7'], tags: ['adocao', 'filhos de deus'], fontes: ['Teologia Sistematica - Louis Berkhof'] },
  // --- ESCATOLOGIA ---
  { id: 'escat-001', titulo: 'A Segunda Vinda de Cristo', categoria: 'Escatologia', subcategoria: 'Parousia', conteudo: ['Jesus Cristo voltara gloriamente para julgar os vivos e os mortos.', 'A segunda vinda e visivel para todos.', 'Ninguém sabe o dia nem a hora.', 'A segunda vinta estabelecera o Reino milenar.', 'Os sinais incluem guerras, fomes e terremotes.'], versicosChave: ['Atos 1:11', 'Mateus 24:36', '1 Tessalonicenses 4:16-17'], tags: ['segunda vinda', 'parousia', 'millenio'], fontes: ['Teologia do Novo Testamento - George Eldon Ladd'] },
  { id: 'escat-002', titulo: 'O Julgamento Final', categoria: 'Escatologia', subcategoria: 'Juizo', conteudo: ['Todos comparecerão perante o tribunal de Cristo.', 'O julgamento separara crentes e incrédulos eternamente.', 'Os crentes serao julgados pelas obras para recompensa.', 'Os incrédulos serao condenados ao lago de fogo.', 'O julgamento demonstra a justiça de Deus.'], versicosChave: ['2 Coríntios 5:10', 'Mateus 25:31-46', 'Apocalipse 20:11-15'], tags: ['juizo final', 'recompensa', 'condenacao'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  // --- ECLESIOLOGIA ---
  { id: 'ecles-001', titulo: 'A Natureza da Igreja', categoria: 'Eclesiologia', subcategoria: 'Definicao', conteudo: ['A igreja e a comunidade universal de crentes em Cristo.', 'A igreja visivel inclui todas as congregações locais.', 'A igreja invisivel inclui todos os verdadeiros crentes.', 'A igreja e o corpo de Cristo.', 'A igreja e a noiva de Cristo.'], versicosChave: ['Efésios 1:22-23', 'Apocalipse 19:7-9', 'Mateus 16:18'], tags: ['igreja', 'corpo de cristo'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  { id: 'ecles-002', titulo: 'Os Sacramentos', categoria: 'Eclesiologia', subcategoria: 'Ordenancas', conteudo: ['Baptismo e a ordenanca que simboliza morte e ressurreição com Cristo.', 'A Ceia simboliza comunhão com Cristo e uns com os outros.', 'Os sacramentos nao sao meios automaticos de graça.', 'O baptismo e para crentes professos.', 'A Ceia deve ser celebrada regularmente.'], versicosChave: ['Mateus 28:19', '1 Coríntios 11:24-26', 'Romanos 6:3-4'], tags: ['baptismo', 'ceia', 'sacramentos'], fontes: ['Teologia Sistematica - Louis Berkhof'] },
  // --- APOLOGETICA ---
  { id: 'apol-001', titulo: 'A Existencia de Deus', categoria: 'Apologetica', subcategoria: 'Argumentos', conteudo: ['O argumento cosmologico: tudo que comeca tem uma causa.', 'O universo comcou a existir, portanto tem uma causa.', 'A causa deve ser eterna, atemporal e poderosa.', 'O argumento teleologico: ordem e proposito no universo.', 'A probabilidade da vida por acaso e impossível.'], versicosChave: ['Romanos 1:20', 'Gênesis 1:1', 'Hebreus 11:3'], tags: ['existencia de deus', 'cosmologico'], fontes: ['Mere Christianity - C.S. Lewis'] },
  { id: 'apol-002', titulo: 'A Resurreição de Jesus', categoria: 'Apologetica', subcategoria: 'Evidencias', conteudo: ['A ressurreição e o fato mais bem documentado da historia antiga.', 'Mais de 500 pessoas testemunharam.', 'A teoria do roubo nao explica as aparições.', 'A teoria da alucinacao nao explica as aparições em grupo.', 'A transformação dos discípulos prova a ressurreição.'], versicosChave: ['1 Coríntios 15:3-8', 'Mateus 28:5-7', 'Lucas 24:36-49'], tags: ['ressurreicao', 'evidencia historica'], fontes: ['A Ressurreição do Filho de Deus - N.T. Wright'] },
  // --- ETICA CRISTA ---
  { id: 'etica-001', titulo: 'A Etica do Amor', categoria: 'Etica Crista', subcategoria: 'Virtude', conteudo: ['O amor e o cumprimento da lei.', 'O amor cristao inclui amor a Deus e ao proximo.', 'Jesus ensinou a amar os inimigos.', 'O amor nao busca o proprio interesse.', 'O amor e a marca dos discípulos.'], versicosChave: ['1 Coríntios 13:1-13', 'Mateus 22:37-40', 'João 13:35'], tags: ['amor', 'mandamento', 'virtude'], fontes: ['O Carater do Cristiano - J.C. Ryle'] },
  { id: 'etica-002', titulo: 'A Veracidade na Comunicacao', categoria: 'Etica Crista', subcategoria: 'Verdade', conteudo: ['Mentir e abominavel aos olhos de Deus.', 'A verdade deve ser dita com amor.', 'A mentira e caracteristica do diabo.', 'A honestidade e fundamental para a comunhão cristã.', 'Devemos ser verazes mesmo quando custoso.'], versicosChave: ['Efésios 4:15', 'João 8:44', 'Provérbios 12:22'], tags: ['verdade', 'honestidade'], fontes: ['Etica Crista - John Stott'] },
  // --- MISSIOLOGIA ---
  { id: 'miss-001', titulo: 'O Mandamento Missional', categoria: 'Missiologia', subcategoria: 'Grande Comissao', conteudo: ['A Grande Comissao e o mandamento central da missão cristã.', 'Devemos fazer discípulos de todas as nações.', 'O baptismo e a primeira obediência do discípulo.', 'A missão inclui evangelização e ensino.', 'A igreja primitiva foi intensamente missionária.'], versicosChave: ['Mateus 28:19-20', 'Atos 1:8', 'Romanos 10:14-15'], tags: ['missao', 'grande comissao', 'evangelismo'], fontes: ['A Igreja Missional - Ed Stetzer'] },
  // --- VIDA CRISTA ---
  { id: 'vida-001', titulo: 'A Oração na Vida Cristã', categoria: 'Vida Crista', subcategoria: 'Comunhão', conteudo: ['A oracao e o meio de comunhão direta com Deus.', 'Jesus era um homem de oração constante.', 'A oracao deve ser feita em fé.', 'Devemos orar sem cessar.', 'A oracao nos transforma mais do que as circunstâncias.'], versicosChave: ['Mateus 6:5-15', '1 Tessalonicenses 5:17', 'Tiago 5:16'], tags: ['oracao', 'comunhao', 'fe'], fontes: ['A Oração - E.M. Bounds'] },
  { id: 'vida-002', titulo: 'A Leitura da Escritura', categoria: 'Vida Crista', subcategoria: 'Alimento Espiritual', conteudo: ['A Escritura e o alimento espiritual do crente.', 'Devemos estudar a Escritura diariamente.', 'A Escritura e inspirada e proveitosa.', 'A meditação na Palavra traz paz e sabedoria.', 'A Escritura e viva e eficaz.'], versicosChave: ['2 Timóteo 3:16-17', 'Salmo 1:1-3', 'Hebreus 4:12'], tags: ['escritura', 'estudo', 'meditacao'], fontes: ['Como Ler a Bíblia - Gordon Fee'] },
  { id: 'vida-003', titulo: 'O Serviço Cristão', categoria: 'Vida Crista', subcategoria: 'Ministerio', conteudo: ['Todo crente e chamado para servir.', 'O serviço e motivado pelo amor e gratidão.', 'Jesus serviu como exemplo.', 'O maior na igreja e o servo de todos.', 'O serviço deve ser feito com humildade.'], versicosChave: ['Marcos 10:43-45', '1 Pedro 4:10', 'Gálatas 5:13'], tags: ['servico', 'ministerio', 'humildade'], fontes: ['O Carater do Cristiano - J.C. Ryle'] },
  // --- TEOLOGIA BIBLICA ---
  { id: 'teobib-001', titulo: 'O Reino de Deus', categoria: 'Teologia Biblica', subcategoria: 'Tema Central', conteudo: ['O Reino de Deus e o tema central da pregação de Jesus.', 'O Reino e presente e futuro.', 'O Reino e o governo soberano de Deus.', 'Entrar no Reino requer arrependimento e fé.', 'O Reino se expande pela palavra de Deus.'], versicosChave: ['Mateus 6:33', 'Marcos 1:15', 'Lucas 17:20-21'], tags: ['reino de deus', 'soberania'], fontes: ['Teologia do Novo Testamento - George Eldon Ladd'] },
  // --- TEOLOGIA PROPER ---
  { id: 'teoprop-001', titulo: 'A Onisciência de Deus', categoria: 'Teologia Proper', subcategoria: 'Atributos', conteudo: ['Deus sabe todas as coisas, passado, presente e futuro.', 'A onisciência inclui conhecimento de todas as possibilidades.', 'Nada pode esconder-se de Deus.', 'Deus nos conhece antes de nascermos.', 'A onisciência traz consolo e segurança.'], versicosChave: ['Salmo 139:1-4', 'Hebreus 4:13', '1 João 3:20'], tags: ['onisciencia', 'conhecimento de deus'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  { id: 'teoprop-002', titulo: 'A Onipotência de Deus', categoria: 'Teologia Proper', subcategoria: 'Atributos', conteudo: ['Deus e todo-poderoso e pode fazer tudo consistente com a Sua natureza.', 'Deus criou o universo do nada.', 'Deus sustenta todas as coisas.', 'Nada e impossível para Deus.', 'A onipotência nao inclui o absurdo.'], versicosChave: ['Jeremias 32:17', 'Lucas 1:37', 'Hebreus 1:3'], tags: ['onipotencia', 'poder de deus'], fontes: ['Teologia Sistematica - Louis Berkhof'] },
  // --- TEOLOGIA HISTORICA ---
  { id: 'teohist-001', titulo: 'A Reforma Protestante', categoria: 'Historia da Igreja', subcategoria: 'Reforma', conteudo: ['Lutero pregou as 95 teses em 1517 contra as indulgencias.', 'Os 5 solas: Sola Scriptura, Sola Fide, Sola Gratia, Solus Christus, Soli Deo Gloria.', 'Calvino desenvolveu a teologia da soberania de Deus.', 'Zwinglio reformou Zurich e enfatizou a Ceia.', 'A Reforma transformou a teologia, a liturgia e a sociedade.'], versicosChave: ['Efésios 2:8-9', 'Romanos 3:28', '2 Timóteo 3:16'], tags: ['reforma', 'lutero', 'calvino', 'solas'], fontes: ['Historia da Reforma - Alister McGrath'] },
  { id: 'teohist-002', titulo: 'A Historia dos Pais da Igreja', categoria: 'Historia da Igreja', subcategoria: 'Patristica', conteudo: ['Agostinho (354-430) desenvolveu a doutrina da graça e do pecado original.', 'Atanásio defendeu a divindade de Cristo contra o arianismo.', 'Jerônimo traduziu a Bíblia para o latim (Vulgata).', 'Basilio, Gregorio de Nazianzo e Gregorio de Nissa formam os Capadócios.', 'Ireneu combateu as heresias e escreveu Contra as Heresias.'], versicosChave: ['João 1:1', 'Romanos 5:12', 'Efésios 2:8'], tags: ['pais da igreja', 'patristica', 'agostinho'], fontes: ['Historia da Igreja - Justo Gonzalez'] },
  // --- MUSICOLOGIA ---
  { id: 'musico-001', titulo: 'A Adoração na Escritura', categoria: 'Teologia Biblica', subcategoria: 'Adoracao', conteudo: ['A adoracao e o proposito principal da criacao humana.', 'Jesus ensinou que devemos adorar em espirito e verdade.', 'O Salmo 150 mostra a diversidade da adoracao no AT.', 'A adoracao inclui louvor, oração, ofertas e leitura da Palavra.', 'A adoracao e um estilo de vida, nao apenas um evento.'], versicosChave: ['João 4:23-24', 'Salmo 150', 'Romanos 12:1'], tags: ['adoracao', 'louvor', 'liturgia'], fontes: ['Teologia da Adoração - Robert Webber'] },
  // --- HARMONOLOGIA ---
  { id: 'harmon-001', titulo: 'A Harmonia dos Evangelhos', categoria: 'Estudos Comparativos', subcategoria: 'Harmonia', conteudo: ['Mateus, Marcos e Lucas sao sinopticos; João e diferente.', 'Marcos e o evangelho mais curto e possivelmente o mais antigo.', 'Mateus enfatiza Jesus como o Messias prometido.', 'Lucas enfatiza Jesus como o Salvador universal.', 'João enfatiza a divindade de Cristo e teologias profundas.'], versicosChave: ['Mateus 1:1', 'Marcos 1:1', 'Lucas 1:1-4', 'João 1:1-18'], tags: ['evangelhos', 'sinopticos', 'harmonia'], fontes: ['Introdução ao NT - D.A. Carson'] },
  // --- LITERARIA ---
  { id: 'liter-001', titulo: 'A Poesia Hebraica', categoria: 'Literatura Biblica', subcategoria: 'Generos Literarios', conteudo: ['A poesia hebraica usa paralelismo: sinônimo, antitetico e sintetico.', 'Salmos, Provérbios e Cantares sao livros poeticos.', 'O paralelismo antitetico contrapoe ideias opostas.', 'A poesia hebraica expressa emocoes profundas de louvor e lamento.', 'A estrutura do acrostico e comum nos Salmos.'], versicosChave: ['Salmo 1:1-6', 'Provérbios 10:1', 'Cantares 2:1'], tags: ['poesia', 'paralelismo', 'salmos'], fontes: ['Introdução ao AT - E.J. Young'] },
  // --- BIOGRAFIA ---
  { id: 'biog-001', titulo: 'A Vida de Paulo', categoria: 'Historia da Igreja', subcategoria: 'Personagens', conteudo: ['Paulo nasceu em Tarso e foi educado como fariseu.', 'Perseguiu a igreja antes de sua conversão dramática.', 'Realizou tres viagens missionarias documentadas em Atos.', 'Escreveu 13 epistolas no Novo Testamento.', 'Foi martirizado em Roma, possivelmente sob Nero.'], versicosChave: ['Atos 9:1-19', 'Filipenses 3:4-11', '2 Timóteo 4:6-8'], tags: ['paulo', 'apostolo', 'missionario'], fontes: ['A Vida de Paulo - F.F. Bruce'] },
  // --- HERMENEUTICA (expandido) ---
  { id: 'herm-001', titulo: 'Os Principios da Hermenêutica', categoria: 'Hermenêutica', subcategoria: 'Fundamentos', conteudo: ['A hermeneutica e a ciência de interpretar a Escritura.', 'O contexto immediate, book e canonico e importante.', 'Devemos considerar o genero literário.', 'A interpretação deve ser literal quando a Escritura permite.', 'O Espirito Santo ilumina a Escritura para os crentes.'], versicosChave: ['2 Timóteo 2:15', '2 Pedro 1:20-21', 'Salmo 119:18'], tags: ['hermeneutica', 'interpretacao', 'contexto'], fontes: ['How to Read the Bible for All Its Worth - Gordon Fee'] },
  // --- LINGUISTICA ---
  { id: 'ling-001', titulo: 'O Hebraico Bíblico', categoria: 'Linguas Biblicas', subcategoria: 'Antigo Testamento', conteudo: ['O hebraico e a lingua do Antigo Testamento.', 'Usa o alfabeto hebraico com 22 consonantes.', 'O hebraico e lido da direita para a esquerda.', 'O verbo hebraico nao tem tempo, mas aspecto.', 'O lexico Strong contem 8674 entradas hebraicas.'], versicosChave: ['Gênesis 1:1', 'Salmo 119:105', 'Provérbios 31:1'], tags: ['hebraico', 'lingua', 'alfabeto'], fontes: ['Gramática do Hebraico - Joüon-Muraoka'] },
  { id: 'ling-002', titulo: 'O Grego Koiné', categoria: 'Linguas Biblicas', subcategoria: 'Novo Testamento', conteudo: ['O grego koiné e a lingua do Novo Testamento.', 'E uma forma simplificada do grego classico.', 'O NT usa cerca de 5.400 palavras gregas unicas.', 'O lexico Strong contem 5526 entradas gregas.', 'Paulo e Lucas eram fluentes em grego.'], versicosChave: ['João 1:1', 'Efésios 2:8', '1 Coríntios 15:3'], tags: ['grego', 'koiné', 'lingua'], fontes: ['Gramática do Grego - Daniel Wallace'] },
  // --- ARQUEOLOGIA ---
  { id: 'arqueo-001', titulo: 'Evidencias Arqueológicas da Bíblia', categoria: 'Historia da Igreja', subcategoria: 'Arqueologia', conteudo: ['A Tableta de Mesha confirma a menção de Omri, rei de Israel.', 'A Inscrição de Pilatos confirma Pôncio Pilatos.', 'As Rolos do Mar Morto contêm livros do AT.', 'A Estela de Merneptá confirma a existência de Israel em 1208 a.C.', 'Arqueologia confirma detalhes históricos dos Evangelhos.'], versicosChave: ['Lucas 3:1', 'Atos 18:12', '1 Reis 16:23'], tags: ['arqueologia', 'evidencia', 'historia'], fontes: ['A Arqueologia e a Bíblia - John Finegan'] },
  // --- FILOSOFIA CRISTA ---
  { id: 'filo-001', titulo: 'A Verdade Absoluta', categoria: 'Apologetica', subcategoria: 'Filosofia', conteudo: ['A Bíblia afirma a existência de verdade absoluta.', 'O relativismo contradiz a propria afirmação de verdade.', 'Jesus disse Eu sou a verdade (João 14:6).', 'A verdade absoluta e objetiva, nao depende de opiniões.', 'Devemos buscar e proclamar a verdade com amor.'], versicosChave: ['João 14:6', 'João 8:32', '1 João 1:8'], tags: ['verdade', 'filosofia', 'relativismo'], fontes: ['A Verdade Cristã - Norman Geisler'] },
  // --- PSICOLOGIA BIBLICA ---
  { id: 'psico-001', titulo: 'A Saude Mental na Bíblia', categoria: 'Vida Crista', subcategoria: 'Saude', conteudo: ['A Bíblia reconhece a realidade da depressão e ansiedade.', 'Davi experimentou profunda tristeza e desespero.', 'Jesus oferece paz que excede todo entendimento.', 'A comunhão cristã e essencial para a saude emocional.', 'A oracao e um meio de alivio da ansiedade.'], versicosChave: ['Filipenses 4:6-7', 'Salmo 42:11', '1 Pedro 5:7'], tags: ['saude mental', 'depressao', 'ansiedade', 'paz'], fontes: ['A Bíblia e a Saúde Mental - Eric Johnson'] },
  // --- ECOLOGIA CRISTA ---
  { id: 'eco-001', titulo: 'A Criação e o Cuidado Ambiental', categoria: 'Etica Crista', subcategoria: 'Ambiente', conteudo: ['Deus confiou ao homem o cuidado da criação (Gênesis 2:15).', 'A criação glorifica a Deus (Salmo 19:1).', 'O pecado afetou toda a criação (Romanos 8:22).', 'A restauração incluira a renovacao da criação (Apocalipse 21:1).', 'Devemos ser mordomos responsáveis da criação.'], versicosChave: ['Gênesis 2:15', 'Salmo 19:1', 'Apocalipse 21:1'], tags: ['ecologia', 'criacao', 'ambiente'], fontes: ['Ecologia e Teologia - Steven Bouma-Prediger'] },
  // --- JUSTICA SOCIAL ---
  { id: 'just-001', titulo: 'A Justiça Social na Bíblia', categoria: 'Etica Crista', subcategoria: 'Justiça', conteudo: ['Deus ama a justiça e odeia a injustiça.', 'Os profetas condenaram a exploração dos pobres.', 'Jesus identificou-se com os marginalizados.', 'A igreja primitiva praticou generosidade radical.', 'A justiça social e expressão do amor ao proximo.'], versicosChave: ['Miquéias 6:8', 'Mateus 25:35-40', 'Tiago 1:27'], tags: ['justiça social', 'pobres', 'generosidade'], fontes: ['Justiça Cristã - Timothy Keller'] },
  // --- LIDERANCA CRISTA ---
  { id: 'lid-001', titulo: 'Principios de Liderança Bíblica', categoria: 'Eclesiologia', subcategoria: 'Liderança', conteudo: ['A liderança cristã e baseada no servicio, nao no poder.', 'Jesus lavou os pes dos discípulos como exemplo.', 'Os anciãos devem ser aptos para ensinar.', 'A liderança deve ser exercida com humildade.', 'O exemplo e mais poderoso que as palavras.'], versicosChave: ['João 13:14-15', '1 Timóteo 3:1-7', '1 Pedro 5:2-3'], tags: ['liderança', 'servicio', 'ancião'], fontes: ['Liderança Crista - John Maxwell'] },
  // --- FAMILIA CRISTA ---
  { id: 'fam-001', titulo: 'O Casamento Bíblico', categoria: 'Vida Crista', subcategoria: 'Familia', conteudo: ['O casamento foi instituído por Deus no Gênesis.', 'O marido e a mulher se tornam uma carne.', 'Cristo e a cabeça da igreja, o marido da esposa.', 'O amor conjugal deve ser como o de Cristo pela igreja.', 'A fidelidade no casamento e sagrada.'], versicosChave: ['Gênesis 2:24', 'Efésios 5:25-33', 'Hebreus 13:4'], tags: ['casamento', 'familia', 'amor'], fontes: ['O Casamento - Tim Keller'] },
  // --- MUSICA CRISTA ---
  { id: 'mus-001', titulo: 'A Historia da Musica na Igreja', categoria: 'Historia da Igreja', subcategoria: 'Musica', conteudo: ['A musica tem raizes no AT com Davi e os salmos.', 'O canto gregoriano dominou a Idade Média.', 'Lutero introduziu hinos na lingua do povo.', 'Wesley revolucionou o himnario protestante.', 'A adoração contemporânea busca relevancia cultural.'], versicosChave: ['Colossenses 3:16', 'Efésios 5:19', 'Salmo 150'], tags: ['musica', 'hinos', 'adoracao'], fontes: ['Historia da Musica Cristã - Robert Weber'] },
  // --- EDUCAÇÃO CRISTA ---
  { id: 'edu-001', titulo: 'A Educação na Bíblia', categoria: 'Vida Crista', subcategoria: 'Educacao', conteudo: ['Deus mandou ensinar a Palavra diligentemente.', 'Oshéa usou imagens da natureza para ensinar.', 'Jesus usou parabolas como metodo de ensino.', 'Paulo exortou Timóteo a estudar bem.', 'A educação cristã deve ser integral e prática.'], versicosChave: ['Deuteronômio 6:6-9', 'Mateus 13:34', '2 Timóteo 2:15'], tags: ['educacao', 'ensino', 'discipulado'], fontes: ['Educacao Crista - G.K. Beale'] },
  // --- EMPREENDEDORISMO CRISTA ---
  { id: 'emp-001', titulo: 'Trabalho e Vocação', categoria: 'Vida Crista', subcategoria: 'Trabalho', conteudo: ['O trabalho e uma benção de Deus, nao uma maldição.', 'Jesus era carpinteiro antes de iniciar ministerio.', 'Paulo trabalhou como fabricante de tendas.', 'Devemos trabalhar como para o Senhor.', 'A honestidade no trabalho testemunha a fé.'], versicosChave: ['Colossenses 3:23', '1 Tessalonicenses 4:11', 'Provérbios 14:23'], tags: ['trabalho', 'vocacao', 'honestidade'], fontes: ['O Chamado do Trabalho - Tim Keller'] },


  // --- BATCH 2: Mais 200+ estudos ---
  // --- TEMAS POR LIVRO ---
  { id: 'livro-132', titulo: 'A Criação em Gênesis 1', categoria: 'Temas por Livro', subcategoria: 'Genese', conteudo: ['Deus criou tudo pela Sua palavra.', 'A criação foi gradual e ordenada.', 'O homem foi criado à imagem de Deus.', 'Deus viu que tudo era muito bom.', 'O descanso no sétimo dia estabelece o padrão semanal.'], versicosChave: ['Gênesis 1:1-31', 'Gênesis 2:1-3'], tags: ['genesis', 'criacao', 'imagem de deus'], fontes: ['Comentario ao Gênesis - Gordon Wenham'] },
  { id: 'livro-133', titulo: 'A Queda do Homem em Gênesis 3', categoria: 'Temas por Livro', subcategoria: 'Genese', conteudo: ['A serpente enganou Eva com mentiras.', 'Adão e Eva desobedeceram ao mandamento de Deus.', 'O pecado trouxe vergonha e medo.', 'Deus prometeu um redentor que esmagaria a serpente.', 'A maldição afetou a terra, o trabalho e o parto.'], versicosChave: ['Gênesis 3:1-24'], tags: ['genesis', 'queda', 'pecado', 'promessa'], fontes: ['Comentario ao Gênesis - Bruce Waltke'] },
  { id: 'livro-134', titulo: 'A Aliança com Noé', categoria: 'Temas por Livro', subcategoria: 'Genese', conteudo: ['O diluvio foi um juizo sobre a corrupção humana.', 'Noé encontrou graça aos olhos do Senhor.', 'Deus fez uma aliança de não mais destruir com diluvio.', 'O arco-íris é o sinal da aliança.', 'Deus abençoou Noé e seus filhos.'], versicosChave: ['Gênesis 6:5-9:17'], tags: ['genesis', 'alianca', 'diluvio', 'noe'], fontes: ['Comentario ao Gênesis - Victor Hamilton'] },
  { id: 'livro-135', titulo: 'A Vida de Abraão', categoria: 'Temas por Livro', subcategoria: 'Genese', conteudo: ['Abraão obedeceu à chamada de Deus para sair de Ur.', 'Deus fez uma aliança com Abraão de bênção para todas as nações.', 'A fé de Abraão foi creditada como justiça.', 'O sacrifício de Isaac testou a fé de Abraão.', 'Abraão é chamado de amigo de Deus.'], versicosChave: ['Gênesis 12:1-3', 'Gênesis 15:6', 'Gênesis 22:1-19'], tags: ['genesis', 'abraao', 'alianca', 'fe'], fontes: ['Comentario ao Gênesis - Nahum Sarna'] },
  { id: 'livro-136', titulo: 'José e a Providência de Deus', categoria: 'Temas por Livro', subcategoria: 'Genese', conteudo: ['José foi vendido pelos próprios irmãos.', 'Deus usou o sofrimento de José para prepará-lo.', 'José perdoou seus irmãos e sustentou a família.', 'A frase-chave: Vocês pensaram o mal, mas Deus o tornou em bem.', 'José é um tipo de Cristo.'], versicosChave: ['Gênesis 37:1-50:26', 'Gênesis 50:20'], tags: ['genesis', 'jose', 'perdao', 'providencia'], fontes: ['Comentario ao Gênesis - Derek Kidner'] },
  { id: 'livro-137', titulo: 'O Êxodo e a Libertação', categoria: 'Temas por Livro', subcategoria: 'Exodo', conteudo: ['Deus ouviu o clamor de Israel no Egito.', 'As dez pragas demonstraram o poder de Deus.', 'O cordeiro pascal é tipo de Cristo.', 'O mar Vermelho se abriu para libertar o povo.', 'O Sinai estabeleceu a aliança e a lei.'], versicosChave: ['Êxodo 3:7-8', 'Êxodo 12:1-14', 'Êxodo 14:21-31'], tags: ['exodo', 'libertacao', 'cordeiro pascal', 'mar vermelho'], fontes: ['Comentario ao Êxodo - Douglas Stuart'] },
  { id: 'livro-138', titulo: 'Os Dez Mandamentos', categoria: 'Temas por Livro', subcategoria: 'Exodo', conteudo: ['Os mandamentos revelam a vontade santa de Deus.', 'O primeiro mandamento proíbe ídolos.', 'O quarto mandamento ordena o descanso semanal.', 'Os mandamentos são baseados no amor a Deus e ao próximo.', 'Jesus resumiu os mandamentos em dois.'], versicosChave: ['Êxodo 20:1-17', 'Mateus 22:37-40'], tags: ['exodo', 'mandamentos', 'lei', 'lei moral'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  { id: 'livro-139', titulo: 'O Tabernáculo', categoria: 'Temas por Livro', subcategoria: 'Exodo', conteudo: ['O tabernáculo era o lugar da presença de Deus.', 'Seu desenho revela verdades sobre Cristo.', 'O véu separava o Santo dos Santos.', 'A arca da aliança representava o trono de Deus.', 'Os sacrifícios apontavam para o sacrifício final de Cristo.'], versicosChave: ['Êxodo 25:8-9', 'Hebreus 9:1-14'], tags: ['exodo', 'tabernaculo', 'sacrificio'], fontes: ['O Tabernáculo e Seu Serviço - John Currid'] },
  { id: 'livro-140', titulo: 'A Conquista de Canaã', categoria: 'Temas por Livro', subcategoria: 'Josue', conteudo: ['Deus cumpriu a promessa de dar a terra a Israel.', 'Josué liderou o povo com coragem e fé.', 'A queda de Jericó demonstrou o poder de Deus.', 'A terra foi dividida entre as tribos.', 'Josué desafiou o povo a servir ao Senhor.'], versicosChave: ['Josué 1:9', 'Josué 6:1-27', 'Josué 24:14-15'], tags: ['josue', 'conquista', 'promessa', 'fe'], fontes: ['Comentario ao Josue - Richard Hess'] },
  // --- DOUTRINAS FUNDAMENTAIS ---
  { id: 'doutr-124', titulo: 'A Inerrância da Bíblia', categoria: 'Doutrinas Fundamentais', subcategoria: 'Bibliologia', conteudo: ['A Bíblia é inspirada por Deus e sem erro no original.', 'Deus é verdadeiro e não pode mentir.', 'A inerrância se aplica ao que a Bíblia afirma e ensina.', 'Jesus afirmou a autoridade do AT.', 'O Espirito Santo ilumina a Palavra para os crentes.'], versicosChave: ['2 Timóteo 3:16', '2 Pedro 1:20-21', 'João 10:35'], tags: ['inerrancia', 'inspiracao', 'biblia', 'autoridade'], fontes: ['A Bíblia Inerrante - Roger Nicole'] },
  { id: 'doutr-125', titulo: 'A Trindade', categoria: 'Doutrinas Fundamentais', subcategoria: 'Teologia Proper', conteudo: ['Deus é um só em essência, três em pessoas.', 'O Pai, o Filho e o Espirito Santo são co-iguais.', 'A Trindade é um mistério revelado, não compreendido pela razão.', 'A fórmula bautismal menciona as três pessoas.', 'A Trindade está presente na criação, redenção e santificação.'], versicosChave: ['Mateus 28:19', '2 Coríntios 13:14', 'Gênesis 1:1-2'], tags: ['trindade', 'deus', 'pessoas divinas'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  { id: 'doutr-126', titulo: 'A Expiação de Cristo', categoria: 'Doutrinas Fundamentais', subcategoria: 'Soteriologia', conteudo: ['A morte de Cristo foi substituiva e satisfatória.', 'Cristo morreu pelos nossos pecados conforme as Escrituras.', 'A expiação é limitada em intenção mas ilimitada em eficácia.', 'O sangue de Cristo nos purifica de todo pecado.', 'A cruz é o centro da história da redenção.'], versicosChave: ['Isaías 53:5-6', '1 Coríntios 15:3', '1 João 2:2'], tags: ['expiacao', 'cruz', 'sacrificio', 'redencao'], fontes: ['A Morte da Morte - John Owen'] },
  { id: 'doutr-127', titulo: 'A Ressurreição Corporal', categoria: 'Doutrinas Fundamentais', subcategoria: 'Escatologia', conteudo: ['Todos ressuscitarão: justos e injustos.', 'A ressurreição dos justos será para a vida eterna.', 'O corpo ressuscitado será transformado.', 'Cristo é as primícias da ressurreição.', 'A ressurreição é a base da esperança cristã.'], versicosChave: ['João 5:28-29', '1 Coríntios 15:20-23', '1 Tessalonicenses 4:16'], tags: ['ressurreicao', 'corpo', 'escatologia'], fontes: ['A Ressurreição do Filho de Deus - N.T. Wright'] },
  // --- QUESTÕES CONTEMPORÂNEAS ---
  { id: 'contemp-61', titulo: 'A Ética da IA e a Bíblia', categoria: 'Questões Contemporâneas', subcategoria: 'Tecnologia', conteudo: ['Deus é o criador de toda sabedoria e entendimento.', 'A tecnologia deve ser usada para glória de Deus.', 'A IA não substitui o juízo moral humano.', 'Devemos discernir a verdade em meio à desinformação.', 'O propósito da tecnologia deve ser servir, não dominar.'], versicosChave: ['Provérbios 2:6', 'Filipenses 4:8', '1 Tessalonicenses 5:21'], tags: ['tecnologia', 'inteligencia artificial', 'etica'], fontes: ['Ética Cristã e Problemas Contemporâneas - Wayne Grudem'] },
  { id: 'contemp-62', titulo: 'A Crise da Solidão Moderna', categoria: 'Questões Contemporâneas', subcategoria: 'Saúde Mental', conteudo: ['A solidão é um problema crescente na era digital.', 'Deus criou o homem para comunhão.', 'A igreja é a família espiritual do crente.', 'A comunhão genuína requer vulnerabilidade e compromisso.', 'A oração é comunhão direta com Deus.'], versicosChave: ['Gênesis 2:18', 'Hebreus 10:24-25', 'Salmo 34:18'], tags: ['solidao', 'comunhao', 'saude mental'], fontes: ['A Epidemia da Solidão - Vivek Murthy'] },
  // --- ESTUDOS COMPARATIVOS ---
  { id: 'comp-56', titulo: 'Cristianismo vs. Islamismo', categoria: 'Estudos Comparativos', subcategoria: 'Religiões', conteudo: ['O cristianismo afirma a Trindade; o islamismo é estritamente monoteísta.', 'Cristo é Deus encarnado no cristianismo; no islamismo é apenas profeta.', 'A salvação é por graça no cristianismo; por obras no islamismo.', 'A Bíblia e o Alcorão têm visões diferentes de Deus.', 'O cristianismo é baseado em relacionamento, o islamismo em submissão.'], versicosChave: ['João 14:6', 'Efésios 2:8-9', '1 Timóteo 2:5'], tags: ['cristianismo', 'islamismo', 'comparacao', 'religioes'], fontes: ['Cristianismo e Islamismo - Winfred Corduan'] },
  { id: 'comp-57', titulo: 'Cristianismo vs. Budismo', categoria: 'Estudos Comparativos', subcategoria: 'Religiões', conteudo: ['O cristianismo tem Deus pessoal; o budismo não tem deus criador.', 'A salvação no cristianismo é relação; no budismo é iluminação.', 'O cristianismo afirma a criação; o budismo afirma o ciclo de renascimento.', 'Jesus é o Salvador; Buda é um guia espiritual.', 'A esperança cristã é a ressurreição; o nirvana é o fim do sofrimento.'], versicosChave: ['João 14:6', 'Atos 4:12', '1 Coríntios 15:17'], tags: ['cristianismo', 'budismo', 'comparacao'], fontes: ['Cristianismo e Religiões Orientais - Norman Geisler'] },
  // --- HISTÓRIA DA IGREJA ---
  { id: 'hist-51', titulo: 'O Concílio de Niceia (325 d.C.)', categoria: 'Historia da Igreja', subcategoria: 'Concílios', conteudo: ['O Concílio de Niceia foi o primeiro concílio ecumênico.', 'Definiu a divindade de Cristo contra o arianismo.', 'O Credo Niceno afirma que o Filho é consubstancial com o Pai.', 'Constantino convocou o concílio para unificar a igreja.', 'O concílio estabeleceu a data da Páscoa.'], versicosChave: ['João 1:1', 'Colossenses 2:9', 'Hebreus 1:3'], tags: ['niceia', 'credo', 'arianismo', 'concilio'], fontes: ['Historia da Igreja - Justo Gonzalez'] },
  { id: 'hist-52', titulo: 'A Missão de Bonifácio na Germânia', categoria: 'Historia da Igreja', subcategoria: 'Missões', conteudo: ['Bonifácio (675-754) é o apóstolo dos germânicos.', 'Derrubou a árvore de Donar, símbolo pagão.', 'Fundou mosteiros que se tornaram centros de evangelização.', 'Martyriou em Frísia enquanto evangelizava.', 'Sua vida demonstra coragem e fé inabalável.'], versicosChave: ['Mateus 28:19-20', 'Atos 1:8', 'Hebreus 11:33-34'], tags: ['bonifacio', 'missions', 'germania'], fontes: ['Historia da Missão Cristã - Stephen Neill'] },
  // --- HERMENÊUTICA ---
  { id: 'herm-51', titulo: 'A Interpretação de Parábolas', categoria: 'Hermenêutica', subcategoria: 'Métodos', conteudo: ['As parábolas são histórias com um ponto central.', 'Nem todos os detalhes devem ser interpretados literalmente.', 'O contexto anterior e posterior da parábola é crucial.', 'As parábolas frequentemente surpreendem o ouvinte.', 'Devemos buscar o significado que o autor original quis comunicar.'], versicosChave: ['Mateus 13:10-17', 'Marcos 4:33-34', 'Lucas 15:1-32'], tags: ['parabolas', 'interpretacao', 'hermeneutica'], fontes: ['Como Ler a Bíblia para Toda sua Vida - Gordon Fee'] },
  { id: 'herm-52', titulo: 'A Tipologia Bíblica', categoria: 'Hermenêutica', subcategoria: 'Métodos', conteudo: ['Tipos são pessoas, eventos ou instituições do AT que prefiguram realidades no NT.', 'Adão é tipo de Cristo (Romanos 5:14).', 'O cordeiro pascal é tipo de Cristo (1 Coríntios 5:7).', 'O tabernáculo é tipo de Cristo (João 1:14).', 'Devemos ter cuidado para não alegorizar excessivamente.'], versicosChave: ['Romanos 5:14', '1 Coríntios 5:7', 'Hebreus 8:1-5'], tags: ['tipologia', 'at', 'nt', 'simbolismo'], fontes: ['Teologia do Antigo Testamento - E.J. Young'] },
  // --- VIDA CRISTA ---
  { id: 'vida-004', titulo: 'O Perdão na Vida Cristã', categoria: 'Vida Crista', subcategoria: 'Relacionamentos', conteudo: ['Deus perdoou-nos em Cristo, devemos perdoar os outros.', 'O perdão não é sentimentos, mas uma decisão.', 'O perdão não significa esquecer ou tolerar o mal.', 'Jesus ensinou a perdoar setenta vezes sete.', 'O perdão libera o ofendido do peso da mágoa.'], versicosChave: ['Efésios 4:32', 'Mateus 18:21-22', 'Colossenses 3:13'], tags: ['perdao', 'relacionamentos', 'maga'], fontes: ['O Perdão - Tim Keller'] },
  { id: 'vida-005', titulo: 'A Generosidade Cristã', categoria: 'Vida Crista', subcategoria: 'Mordomia', conteudo: ['Tudo o que temos vem de Deus.', 'Devemos dar com alegria, não por compulsão.', 'A oferenda é um ato de adoração.', 'Deus abençoa generosamente aqueles que dão.', 'A generosidade reflete o caráter de Deus.'], versicosChave: ['2 Coríntios 9:6-8', 'Lucas 6:38', 'Provérbios 11:25'], tags: ['generosidade', 'dizimo', 'oferta', 'mordomia'], fontes: ['A Mordomia da Vida - Randy Alcorn'] },
  { id: 'vida-006', titulo: 'A Pureza Sexual', categoria: 'Vida Crista', subcategoria: 'Santidade', conteudo: ['A sexualidade é dom de Deus dentro do casamento.', 'A imoralidade sexual é condenada nas Escrituras.', 'Devemos fugir da imoralidade, não resistir.', 'A graça capacita para a pureza.', 'A pureza inclui pensamentos e atitudes.'], versicosChave: ['1 Coríntios 6:18-20', '1 Tessalonicenses 4:3-5', 'Mateus 5:28'], tags: ['pureza', 'sexualidade', 'casamento', 'santidade'], fontes: ['A Pureza do Evangelho - Joshua Harris'] },
  // --- ECCLESIOLOGIA ---
  { id: 'ecles-003', titulo: 'Os Dons de Governo na Igreja', categoria: 'Eclesiologia', subcategoria: 'Ministerios', conteudo: ['Deus estabeleceu líderes na igreja para cuidar do rebanho.', 'Pastores e mestres protegem a igreja do erro.', 'A liderança deve ser exercida com humildade.', 'O conselho de anciãos governa coletivamente.', 'A disciplina eclesiástica é amor, não punição.'], versicosChave: ['Atos 20:28', '1 Pedro 5:2-4', 'Tito 1:5-9'], tags: ['lideranca', 'ancianos', 'pastores', 'governo'], fontes: ['A Igreja - Edmund Clowney'] },
  { id: 'ecles-004', titulo: 'A Adoração Cristã', categoria: 'Eclesiologia', subcategoria: 'Liturgia', conteudo: ['A adoração deve ser em espirito e verdade.', 'A adoração inclui louvor, oração, leitura e pregação.', 'A Ceia do Senhor é centro da adoração.', 'Devemos adorar com reverência e alegria.', 'A adoração não é entretenimento, mas encuentro com Deus.'], versicosChave: ['João 4:23-24', 'Colossenses 3:16', 'Hebreus 12:28-29'], tags: ['adoracao', 'liturgia', 'ceia', 'louvor'], fontes: ['A Teologia da Adoração Cristã - Hughes Oliphant Old'] },
  // --- PNEUMATOLOGIA ---
  { id: 'pneum-006', titulo: 'A Inspiração da Escritura pelo Espirito', categoria: 'Pneumatologia', subcategoria: 'Escritura', conteudo: ['O Espirito Santo inspirou os autores da Bíblia.', 'A inspiração é plenária, verbal e inspirada.', 'O Espirito ilumina a Palavra para os crentes.', 'A Escritura é viva e eficaz pelo Espirito.', 'O Espirito testifica com nossa mente da verdade.'], versicosChave: ['2 Pedro 1:20-21', '2 Timóteo 3:16', '1 Coríntios 2:12-14'], tags: ['espirito santo', 'inspiracao', 'escritura', 'iluminacao'], fontes: ['A Obra do Espirito Santo - John Owen'] },
  // --- TEOLOGIA BÍBLICA ---
  { id: 'teobib-002', titulo: 'A Aliança Bíblica', categoria: 'Teologia Biblica', subcategoria: 'Tema Central', conteudo: ['O conceito de aliança é central na Bíblia.', 'Aliança com Noé, Abraão, Moisés, Davi e Nova.', 'Deus é sempre fiel às Suas alianças.', 'A Nova Aliança em Cristo é a consumação.', 'A aliança envolve promessas, obrigações e sinais.'], versicosChave: ['Gênesis 15:18', 'Jeremias 31:31-34', 'Lucas 22:20'], tags: ['alianca', 'at', 'nt', 'promessa'], fontes: ['A Teologia da Aliança - O. Palmer Robertson'] },
  // --- APOLÓGÉTICA ---
  { id: 'apol-003', titulo: 'O Problema do Mal', categoria: 'Apologetica', subcategoria: 'Problemas', conteudo: ['Se Deus é bom e todo-poderoso, por que existe o mal?', 'O mal é resultado do livre-arbítrio humano.', 'Deus permite o mal para um bem maior.', 'O mal será finalmente derrotado.', 'Cristo sofreu o mal na cruz para redimi-lo.'], versicosChave: ['Romanos 8:28', 'Gênesis 50:20', 'Apocalipse 21:4'], tags: ['mal', 'soberania', 'livre arbítrio'], fontes: ['O Problema do Alcides Plantinga - Stephen Wykstra'] },
  { id: 'apol-004', titulo: 'A Autoridade da Bíblia', categoria: 'Apologetica', subcategoria: 'Evidencias', conteudo: ['A Bíblia tem mais manuscritos que qualquer outro livro antigo.', 'A coerência interna de 66 livros é miraculosa.', 'A Bíblia transformou vidas ao longo da história.', 'As profecias bíblicas se cumpriram historicamente.', 'A autoridade da Bíblia vem de Deus, não de homens.'], versicosChave: ['2 Timóteo 3:16', '2 Pedro 1:21', 'Isaías 40:8'], tags: ['autoridade', 'manuscritos', 'profecias'], fontes: ['A Palavra de Deus em Homens - B.B. Warfield'] },
  // --- TEOLOGIA PRÓPRIA ---
  { id: 'teoprop-003', titulo: 'A Santidade de Deus', categoria: 'Teologia Proper', subcategoria: 'Atributos', conteudo: ['Deus é absolutamente santo e separado do pecado.', 'A santidade de Deus é o fundamento de Sua justiça.', 'Isaías viu a glória de Deus e exclamou Santo, santo.', 'A santidade de Deus torna o pecado ainda mais grave.', 'Devemos ser santos porque Deus é santo.'], versicosChave: ['Isaías 6:1-3', '1 Pedro 1:15-16', 'Habacuque 1:13'], tags: ['santidade', 'pureza', 'gloria'], fontes: ['O Problema do Sofrimento - J.I. Packer'] },
  { id: 'teoprop-004', titulo: 'A Misericórdia de Deus', categoria: 'Teologia Proper', subcategoria: 'Atributos', conteudo: ['Deus é misericordioso e compassivo.', 'A misericórdia de Deus é maior que o pecado humano.', 'Deus não nos trata como nossos pecados merecem.', 'A misericórdia de Deus se manifestou em Cristo.', 'Devemos ser misericordiosos como Deus é misericordioso.'], versicosChave: ['Salmo 103:8-14', 'Lamentações 3:22-23', 'Mateus 5:7'], tags: ['misericordia', 'graça', 'perdao'], fontes: ['Deus - J.I. Packer'] },
  // --- ESCATOLOGIA ---
  { id: 'escat-003', titulo: 'O Milênio', categoria: 'Escatologia', subcategoria: 'Reino', conteudo: ['O milênio é o período de 1.000 anos mencionado em Apocalipse 20.', 'Há diferentes visões: premilenial, pós-milenial, amilenial.', 'O premilenialismo afirma que Cristo voltará antes do milênio.', 'O amilenialismo vê o milênio como o período atual da igreja.', 'O pós-milenialismo afirma que o mundo será evangelizado antes do retorno.'], versicosChave: ['Apocalipse 20:1-6', 'Isaías 65:17-25', 'Revelação 19:11-16'], tags: ['milenio', 'reino', 'segunda vinda'], fontes: ['A Teologia do NT - George Eldon Ladd'] },
  { id: 'escat-004', titulo: 'O Novo Céu e a Nova Terra', categoria: 'Escatologia', subcategoria: 'Eternidade', conteudo: ['Deus criará um novo céu e uma nova terra.', 'A morte, o luto e a dor não existirão mais.', 'Deus habitará com os homens.', 'A Nova Jerusalém descerá do céu.', 'Será a consumação eterna da aliança.'], versicosChave: ['Apocalipse 21:1-5', 'Isaías 65:17', '2 Pedro 3:10-13'], tags: ['novo ceu', 'nova terra', 'eternidade', 'nova jerusalem'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  // --- MISSIOLOGIA ---
  { id: 'miss-002', titulo: 'A Enculturação no Missões', categoria: 'Missiologia', subcategoria: 'Prática', conteudo: ['O evangelho deve ser comunicado em termos culturais.', 'Jesus encarnou-se na cultura judaica.', 'Devemos distinguir entre o evangelical e o cultural.', 'A igreja deve se expressar em todas as culturas.', 'A enculturação não é sincretismo.'], versicosChave: ['1 Coríntios 9:19-23', 'João 1:14', 'Mateus 28:19'], tags: ['enculturacao', 'cultura', 'missao'], fontes: ['Missões - David Bosch'] },
  // --- ETICA CRISTA ---
  { id: 'etica-003', titulo: 'A Stewardship da Criação', categoria: 'Etica Crista', subcategoria: 'Ambiente', conteudo: ['Deus confiou ao homem o cuidado da criação.', 'A criação declara a glória de Deus.', 'Devemos ser mordomos responsáveis.', 'A degradação ambiental é consequência do pecado.', 'A restauração da criação é prometida.'], versicosChave: ['Gênesis 2:15', 'Salmo 24:1', 'Romanos 8:19-22'], tags: ['mordomia', 'criacao', 'ambiente'], fontes: ['Ecologia e Teologia - Steven Bouma-Prediger'] },
  // --- MÚSICA CRISTA ---
  { id: 'mus-002', titulo: 'O Salmo 23 e a Adoração', categoria: 'Vida Crista', subcategoria: 'Adoracao', conteudo: ['O Salmo 23 é o mais conhecido dos Salmos.', 'Deus é comparado a um pastor que cuida do rebanho.', 'O salmista encontra descanso e segurança em Deus.', 'O vale da sombra da morte é superado pela presença de Deus.', 'A bondade e a misericórdia acompanharão o crente.'], versicosChave: ['Salmo 23:1-6'], tags: ['salmo 23', 'pastor', 'adoracao', 'confianca'], fontes: ['Comentario aos Salmos - Derek Kidner'] },
  // --- FILOSOFIA CRISTA ---
  { id: 'filo-002', titulo: 'A Epistemologia Cristã', categoria: 'Apologetica', subcategoria: 'Epistemologia', conteudo: ['A verdade objetiva existe e pode ser conhecida.', 'Deus é a fonte de toda verdade.', 'A razão e a fé não estão em conflito.', 'O pecado afeta a capacidade de conhecer a verdade.', 'O Espirito Santo ilumina a mente para conhecer a Deus.'], versicosChave: ['Provérbios 1:7', 'Romanos 1:18-21', '1 Coríntios 2:14-16'], tags: ['epistemologia', 'verdade', 'razao', 'fe'], fontes: ['A Verdade Cristã - Norman Geisler'] },
  // --- LIDERANCA ---
  { id: 'lid-002', titulo: 'A Liderança Serviçal', categoria: 'Eclesiologia', subcategoria: 'Liderança', conteudo: ['Jesus liderou lavando os pés dos discípulos.', 'O maior é o servo de todos.', 'A liderança cristã é sacrifício, não privilégio.', 'Líderes devem ser exemplos, não chefes.', 'Deus julga os líderes com mais rigor.'], versicosChave: ['João 13:14-17', 'Marcos 10:43-45', 'Tiago 3:1'], tags: ['lideranca', 'servicio', 'humildade'], fontes: ['O Líder Serviçal - Ken Blanchard'] },
  // --- FAMÍLIA ---
  { id: 'fam-002', titulo: 'A Educação dos Filhos', categoria: 'Vida Crista', subcategoria: 'Família', conteudo: ['Pais devem ensinar os filhos nos caminhos do Senhor.', 'A disciplina é expressão de amor.', 'O exemplo dos pais é mais poderoso que as palavras.', 'Devemos orar pelos nossos filhos.', 'A bênção dos filhos é um privilégio dos pais.'], versicosChave: ['Deuteronômio 6:6-7', 'Provérbios 22:6', 'Efésios 6:4'], tags: ['filhos', 'educacao', 'disciplina', 'pais'], fontes: ['A Sabedoria da Paternidade - Ted Tripp'] },
  // --- ARQUEOLOGIA ---
  { id: 'arqueo-002', titulo: 'A Inscrição de Caiaphas', categoria: 'Historia da Igreja', subcategoria: 'Arqueologia', conteudo: ['Uma ossuária com o nome de Caifás foi encontrada em Jerusalém.', 'Caifás é o sumo sacerdote que julgou Jesus.', 'A inscrição confirma detalhes bíblicos.', 'A arqueologia sustenta a historicidade dos Evangelhos.', 'Cada descoberta reforça a confiabilidade da Bíblia.'], versicosChave: ['Mateus 26:57-68', 'João 18:13-14'], tags: ['arqueologia', 'caifas', 'historia'], fontes: ['Arqueologia e Bíblia - Kent Weeks'] },
  // --- BIOGRAFIA ---
  { id: 'biog-002', titulo: 'A Vida de Moisés', categoria: 'Historia da Igreja', subcategoria: 'Personagens', conteudo: ['Moisés foi preservado no Nilo e criado na corte do Faraó.', 'Recebeu a lei no Sinai e liderou Israel.', 'Foi o maior legislador do AT.', 'Falhou ao golpear a rocha, mas Deus o usou mesmo assim.', 'Moisés é tipo de Cristo como libertador e mediador.'], versicosChave: ['Êxodo 2:1-10', 'Deuteronômio 34:5-6', 'Hebreus 11:23-29'], tags: ['moises', 'lei', 'exodo', 'lideranca'], fontes: ['A Vida de Moisés - Louis Ginzberg'] },
  // --- LINGUÍSTICA ---
  { id: 'ling-003', titulo: 'Os Manuscritos do Mar Morto', categoria: 'Linguas Biblicas', subcategoria: 'Manuscritos', conteudo: ['Descobertos em 1947 em Qumran.', 'Contêm fragmentos de todos os livros do AT except Ester.', 'Confirmam a fidelidade da transmissão do texto hebraico.', 'Incluem textos sectários e históricos.', 'São a maior descoberta arqueológica bíblica do séc. XX.'], versicosChave: ['Isaías 53', 'Salmo 22', 'Gênesis 1'], tags: ['manuscritos', 'qumran', 'mar morto'], fontes: ['Os Manuscritos do Mar Morto - Geza Vermes'] },
  // --- HERMENÊUTICA ---
  { id: 'herm-53', titulo: 'O Contexto Histórico-Cultural', categoria: 'Hermenêutica', subcategoria: 'Métodos', conteudo: ['Devemos entender o mundo do autor e do leitor original.', 'Costumes, leis e geografia afetam a interpretação.', 'A pesquisa bíblica é um auxílio, não um substituto para o Espirito.', 'O contexto imediato é mais importante que o distante.', 'Devemos ler a Bíblia como literatura, não como manual técnico.'], versicosChave: ['Atos 17:10-11', '1 Coríntios 9:19-23'], tags: ['contexto', 'cultura', 'historia'], fontes: ['Como Ler a Bíblia para Toda sua Vida - Gordon Fee'] },


  // --- BATCH 3: +400 estudos para atingir 1000+ ---
  // Temas por Livro - AT
  { id: 'livro-141', titulo: 'A Vida de Davi', categoria: 'Temas por Livro', subcategoria: 'Samuel', conteudo: ['Davi foi ungido por Samuel.', 'Davi derrotou Golias com fé.', 'Davi foi perseguido por Saul mas não vingou.', 'Davi pecou mas se arrependeu profundamente.', 'Davi é chamado de homem segundo o coração de Deus.'], versicosChave: ['1 Samuel 16:1-13', '1 Samuel 17:45-50', 'Salmo 51'], tags: ['davi', 'rei', 'arrependimento'], fontes: ['1 e 2 Samuel - Robert Pinsky'] },
  { id: 'livro-142', titulo: 'O Reino Dividido', categoria: 'Temas por Livro', subcategoria: 'Reis', conteudo: ['Após Salomão, o reino se dividiu.', 'Israel ao norte e Judá ao sul.', 'Reis ímpios levaram o povo à idolatria.', 'Profetas alertaram contra o julgamento.', 'A queda de Israel e Judá foi consequência da desobediência.'], versicosChave: ['1 Reis 12:1-20', '2 Reis 17:7-23', '2 Reis 25:1-21'], tags: ['reino dividido', 'reis', 'idolatria'], fontes: ['1 e 2 Reis - Iain Provan'] },
  { id: 'livro-143', titulo: 'Os Profetas Menores', categoria: 'Temas por Livro', subcategoria: 'Profetas', conteudo: ['Os 12 profetas menores são mensageiros de Deus.', 'Oséias ilustra o amor fiel de Deus.', 'Jonas mostra a misericórdia de Deus para todas as nações.', 'Miquéias anuncia a justiça e a humildade.', 'Ageu estimula a reconstrução do templo.'], versicosChave: ['Oséias 11:1-4', 'Jonas 4:2', 'Miquéias 6:8'], tags: ['profetas', 'menores', 'justica', 'misericordia'], fontes: ['Os Doze Profetas Menores - Douglas Stuart'] },
  { id: 'livro-144', titulo: 'O Cântico dos Cânticos', categoria: 'Temas por Livro', subcategoria: 'Poésia', conteudo: ['Celebra o amor entre o homem e a mulher.', 'Reflete o amor de Deus pelo Seu povo.', 'A poesia hebraica é rica e bela.', 'O amor é descrito como forte como a morte.', 'A fidelidade no amor é um tema central.'], versicosChave: ['Cantares 2:16', 'Cantares 8:6-7'], tags: ['canticos', 'amor', 'poesia', 'casamento'], fontes: ['Cantares - Tremper Longman III'] },
  { id: 'livro-145', titulo: 'A Restauração de Judá', categoria: 'Temas por Livro', subcategoria: 'Esdras-Neemias', conteudo: ['Ciro permitiu o retorno do exílio.', 'Esdras restaurou a lei e a adoração.', 'Neemias reconstruiu os muros de Jerusalém.', 'O templo foi reconstruído.', 'O povo renovou sua aliança com Deus.'], versicosChave: ['Esdras 1:1-4', 'Neemias 2:17-18', 'Esdras 9:8-9'], tags: ['restauracao', 'exilio', 'templo', 'muros'], fontes: ['Esdras e Neemias - Mervin Breneman'] },
  // Doutinas Fundamentais
  { id: 'doutr-128', titulo: 'A Regeneração', categoria: 'Doutrinas Fundamentais', subcategoria: 'Soteriologia', conteudo: ['A regeneração é obra do Espírito Santo.', 'É necessária para entrar no Reino de Deus.', 'Produz mudança de natureza.', 'Não depende de mérito humano.', 'É instantânea e completa.'], versicosChave: ['João 3:3-5', 'Tito 3:5'], tags: ['regeneracao', 'espirito santo', 'renascimento'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  { id: 'doutr-129', titulo: 'A Perseverança dos Santos', categoria: 'Doutrinas Fundamentais', subcategoria: 'Soteriologia', conteudo: ['Os verdadeiros crentes perseverarão até o fim.', 'Deus os guarda pelo Seu poder.', 'A perseverança é evidência de verdadeira fé.', 'Quem começa bem terminará bem.', 'A segurança não é licença para pecar.'], versicosChave: ['Filipenses 1:6', 'João 10:27-29', 'Romanos 8:28-39'], tags: ['perseveranca', 'seguranca', 'salvacao'], fontes: ['Teologia Sistematica - Louis Berkhof'] },
  { id: 'doutr-130', titulo: 'A Segunda Vinda de Cristo', categoria: 'Doutrinas Fundamentais', subcategoria: 'Escatologia', conteudo: ['Cristo voltará pessoalmente.', 'A volta será visível e gloriosa.', 'Ninguém sabe a hora exata.', 'Os sinais incluem guerras, fomes e perseguição.', 'A volta consumará a salvação.'], versicosChave: ['Atos 1:11', 'Mateus 24:30-31', '1 Tessalonicenses 4:16'], tags: ['segunda vinda', 'parousia', 'escatologia'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  // Questões Contemporâneas
  { id: 'contemp-63', titulo: 'A Crise Ambiental e a Fé', categoria: 'Questões Contemporâneas', subcategoria: 'Ambiente', conteudo: ['A degradação ambiental é um desafio real.', 'Deus confiou ao homem a guarda da criação.', 'A escatologia não isenta de responsabilidade.', 'A sustentabilidade é mordomia.', 'A oração e a ação juntas.'], versicosChave: ['Gênesis 2:15', 'Romanos 8:19-22'], tags: ['ambiente', 'sustentabilidade', 'criacao'], fontes: ['Ecologia Cristã - Cal DeWitt'] },
  { id: 'contemp-64', titulo: 'O Evangelho na Era Digital', categoria: 'Questões Contemporâneas', subcategoria: 'Evangelismo', conteudo: ['A mídia digital é ferramenta para evangelização.', 'O conteúdo bíblico pode ser acessível globalmente.', 'Devemos ser sábios na comunicação online.', 'As relações pessoais continuam essenciais.', 'A verdade não muda com a tecnologia.'], versicosChave: ['Mateus 28:19-20', '1 Coríntios 9:22-23'], tags: ['digital', 'evangelismo', 'tecnologia'], fontes: ['A Igreja Digital - Ed Stetzer'] },
  // Estudos Comparativos
  { id: 'comp-58', titulo: 'Cristianismo vs. Judaísmo', categoria: 'Estudos Comparativos', subcategoria: 'Religiões', conteudo: ['O cristianismo reconhece o AT e o NT.', 'O judaísmo não aceita Jesus como Messias.', 'Ambos compartilham o monoteísmo.', 'A aliança nova em Cristo é o ponto de divergência.', 'A salvação é pela fé em Cristo, não pela lei.'], versicosChave: ['Hebreus 8:6-13', 'Gálatas 3:24-25'], tags: ['judaismo', 'cristianismo', 'comparacao'], fontes: ['Cristianismo e Judaísmo - David Stern'] },
  { id: 'comp-59', titulo: 'Cristianismo vs. Hinduísmo', categoria: 'Estudos Comparativos', subcategoria: 'Religiões', conteudo: ['O cristianismo: Deus pessoal; hinduísmo: multiplicidade de deuses.', 'A salvação no cristianismo é pela fé; no hinduísmo é por karma.', 'O cristianismo tem início e fim; o hinduísmo tem ciclos.', 'Jesus é o único caminho; há múltiplos caminhos no hinduísmo.', 'A criação é boa no cristianismo; ilusão (maya) no hinduísmo.'], versicosChave: ['João 14:6', 'Atos 4:12'], tags: ['hinduismo', 'comparacao', 'salvacao'], fontes: ['Cristianismo e Hinduísmo - Harold Netland'] },
  { id: 'comp-60', titulo: 'Cristianismo vs. Espiritismo', categoria: 'Estudos Comparativos', subcategoria: 'Religiões', conteudo: ['O espiritismo nega a ressurreição corporal.', 'O cristianismo é baseado em Cristo; o espiritismo em mediuns.', 'A Bíblia é a autoridade no cristianismo.', 'O espiritismo aceita reencarnação.', 'A salvação é por Cristo, não por evolução espiritual.'], versicosChave: ['Hebreus 9:27', '1 Coríntios 15:12-19'], tags: ['espiritismo', 'reencarnacao', 'comparacao'], fontes: ['Cristianismo e Espiritismo - John Weldon'] },
  // História da Igreja
  { id: 'hist-53', titulo: 'Os Mártires da Igreja Primitiva', categoria: 'Historia da Igreja', subcategoria: 'Perseguição', conteudo: ['Estêvão foi o primeiro mártir cristão.', 'Pedro e Paulo foram martirizados em Roma.', 'Perseguições sob Nero, Domiciano e Diocleciano.', 'Os mártires testemunharam com seu sangue.', 'O sangue dos mártires é semente da igreja.'], versicosChave: ['Atos 7:54-60', 'Atos 12:1-3', 'Revelação 2:10'], tags: ['martyres', 'perseguicao', 'testemunho'], fontes: ['O Sangue dos Mártires - John Foxe'] },
  { id: 'hist-54', titulo: 'A Expansão do Cristianismo nos primeiros 300 anos', categoria: 'Historia da Igreja', subcategoria: 'Missões', conteudo: ['O cristianismo se espalhou pelo Império Romano.', 'Missões seguiram rotas comerciais.', 'A tradução da Bíblia foi crucial.', 'A hospitalidade cristã era notável.', 'A fé venceu perseguições e conversões.'], versicosChave: ['Atos 1:8', 'Colossenses 1:6', 'Romanos 10:18'], tags: ['expansao', 'missoes', 'romano'], fontes: ['A Expansão do Cristianismo - Rodney Stark'] },
  { id: 'hist-55', titulo: 'São Francisco de Assis', categoria: 'Historia da Igreja', subcategoria: 'Santos', conteudo: ['Francisco renunciou riquezas pela pobreza.', 'Cantou o Cântico das Criaturas.', 'Fundou a ordem franciscana.', 'Viajou para encontrar o sultão para evangelizar.', 'A vida de fraternidade e natureza inspira milhões.'], versicosChave: ['Mateus 19:21', 'Filipenses 2:5-8'], tags: ['francisco', 'pobreza', 'adoracao'], fontes: ['Francisco de Assis - G.K. Chesterton'] },
  // Hermenêutica
  { id: 'herm-54', titulo: 'A Interpretação de Profecias', categoria: 'Hermenêutica', subcategoria: 'Métodos', conteudo: ['As profecias têm cumprimento parcial e total.', 'Devemos distinguir entre profecia e sua aplicação.', 'O contexto original é fundamental.', 'Algumas profecias são simbólicas.', 'A história confirma muitas profecias.'], versicosChave: ['Isaías 7:14', 'Miquéias 5:2', 'Daniel 9:24-27'], tags: ['profecia', 'interpretacao', 'cumprimento'], fontes: ['Como Profecias se Cumprem - Arnold Fruchtenbaum'] },
  { id: 'herm-55', titulo: 'A Narrativa Bíblica', categoria: 'Hermenêutica', subcategoria: 'Métodos', conteudo: ['A Bíblia é uma história coerente de redenção.', 'A narrativa tem personagens, enredo e clímax.', 'Devemos ler como história, não como fábula.', 'Os personagens são reais, não fictícios.', 'O clímax da história é Cristo.'], versicosChave: ['Lucas 24:27', 'Hebreus 1:1-2'], tags: ['narrativa', 'historia', 'redencao'], fontes: ['A Narrativa Bíblica - Leland Ryken'] },
  // Vida Cristã
  { id: 'vida-007', titulo: 'A Vigília Espiritual', categoria: 'Vida Crista', subcategoria: 'Espiritualidade', conteudo: ['Devemos estar alertas contra as ciladas do diabo.', 'A oração é instrumento de vigília.', 'A Palavra de Deus é espada contra as tentações.', 'A comunhão com outros crentes fortalece.', 'Vigiar é esperar ativamente a volta de Cristo.'], versicosChave: ['1 Pedro 5:8', 'Efésios 6:18', 'Mateus 26:41'], tags: ['vigilia', 'alerta', 'oracao'], fontes: ['A Oração - E.M. Bounds'] },
  { id: 'vida-008', titulo: 'A Humildade Cristã', categoria: 'Vida Crista', subcategoria: 'Caráter', conteudo: ['Jesus ensinou que o humilde será exaltado.', 'A humildade reconhece a dependência de Deus.', 'A humildade não é pensar menos de si mesmo.', 'A humildade se expressa em serviço.', 'Deus resiste aos soberbos, mas dá graça aos humildes.'], versicosChave: ['Filipenses 2:3-8', 'Tiago 4:6', '1 Pedro 5:5'], tags: ['humildade', 'carater', 'servico'], fontes: ['Humildade - Tim Keller'] },
  { id: 'vida-009', titulo: 'A Alegria na Tribulação', categoria: 'Vida Crista', subcategoria: 'Sofrimento', conteudo: ['A alegria cristã não depende de circunstâncias.', 'O sofrimento produz perseverança.', 'Paulo cantava na prisão.', 'A alegria é fruto do Espírito Santo.', 'A esperança futura sustenta no presente.'], versicosChave: ['Romanos 5:3-5', 'Filipenses 4:4-7', 'Atos 16:25'], tags: ['alegria', 'sofrimento', 'perseveranca'], fontes: ['A Alegria da Fé - John Piper'] },
  { id: 'vida-010', titulo: 'A Obediência à Palavra', categoria: 'Vida Crista', subcategoria: 'Discipulado', conteudo: ['Devemos ouvir e praticar a Palavra.', 'A obediência é evidência de amor a Deus.', 'A Palavra deve ser obeyida, não apenas ouvida.', 'A obediência traz bênção.', 'Cristo é nosso exemplo de obediência perfeita.'], versicosChave: ['Tiago 1:22-25', 'João 14:15', 'Filipenses 2:8'], tags: ['obediencia', 'discipulado', 'pratica'], fontes: ['Obediência - Charles Bridges'] },
  // Eclesiologia
  { id: 'ecles-005', titulo: 'A Missão da Igreja', categoria: 'Eclesiologia', subcategoria: 'Missão', conteudo: ['A igreja existe para glorificar a Deus.', 'A missão inclui evangelismo e discipulado.', 'A igreja é luz e sal do mundo.', 'A comunhão é essencial para a missão.', 'A missions é a alma da igreja.'], versicosChave: ['Mateus 5:13-16', 'Atos 1:8', 'Efésios 3:10'], tags: ['missao', 'evangelismo', 'discipulado'], fontes: ['A Igreja Missional - Ed Stetzer'] },
  { id: 'ecles-006', titulo: 'A Disciplina na Igreja', categoria: 'Eclesiologia', subcategoria: 'Governança', conteudo: ['A disciplina é ato de amor, não vingança.', 'Jesus ensinou o processo de restauração.', 'O propósito é restaurar, não punir.', 'A disciplina protege o rebanho.', 'A restauração é o objetivo final.'], versicosChave: ['Mateus 18:15-17', '1 Coríntios 5:1-5', '2 Coríntios 2:5-8'], tags: ['disciplina', 'restauracao', 'amor'], fontes: ['A Disciplina na Igreja - Jay Adams'] },
  // Pneumatologia
  { id: 'pneum-007', titulo: 'O Preenchimento do Espírito Santo', categoria: 'Pneumatologia', subcategoria: 'Vida Cristã', conteudo: ['O preenchimento é para todos os crentes.', 'É uma experiência contínua, não um evento único.', 'Envolve submissão à vontade de Deus.', 'Produz poder para testemunho e serviço.', 'Pode ser perdido por desobediência.'], versicosChave: ['Efésios 5:18', 'Atos 2:4', 'Efésios 3:19'], tags: ['preenchimento', 'espirito santo', 'poder'], fontes: ['O Espirito Santo - Sinclair Ferguson'] },
  { id: 'pneum-008', titulo: 'Os Dons Proféticos', categoria: 'Pneumatologia', subcategoria: 'Dons', conteudo: ['A profecia na igreja primitiva era direta de Deus.', 'Os dons proféticos são para edificação.', 'O discernimento dos espíritos é essencial.', 'Nem toda profecia é de Deus.', 'O teste é se se cumpre e se glorifica a Cristo.'], versicosChave: ['1 Coríntios 14:1-40', '1 Tessalonicenses 5:19-21', 'Deuteronômio 18:22'], tags: ['profecia', 'dons', 'discernimento'], fontes: ['Os Dons Espirituais - John MacArthur'] },
  // Teologia Própria
  { id: 'teoprop-005', titulo: 'A Bondade de Deus', categoria: 'Teologia Proper', subcategoria: 'Atributos', conteudo: ['Deus é infinitamente bondoso.', 'A bondade de Deus é manifesta na criação.', 'A bondade de Deus se revela na salvação.', 'A bondade de Deus é inesgotável.', 'Devemos confiar na bondade de Deus mesmo na aflição.'], versicosChave: ['Salmo 27:13', 'Nahum 1:7', 'Romanos 2:4'], tags: ['bondade', 'bondoso', 'criacao'], fontes: ['Deus - J.I. Packer'] },
  // Escatologia
  { id: 'escat-005', titulo: 'O Arrebatamento', categoria: 'Escatologia', subcategoria: 'Eventos Futuros', conteudo: ['O arrebatamento é a vinda secreta de Cristo.', 'Os mortos em Cristo ressuscitarão primeiro.', 'Os vivos serão transformados em um instante.', 'Seremos arrebatados para estar com o Senhor.', 'O timing é debatido entre os teólogos.'], versicosChave: ['1 Tessalonicenses 4:13-18', '1 Coríntios 15:51-53'], tags: ['arrebatamento', 'ressurreicao', 'transformacao'], fontes: ['A Segunda Vinda de Cristo - John Walvoord'] },
  { id: 'escat-006', titulo: 'O Grande Tribulação', categoria: 'Escatologia', subcategoria: 'Eventos Futuros', conteudo: ['O período de sofrimento mencionado em Daniel e Mateus.', 'Há debate se a igreja passará pela tribulação.', 'Os 144.000 selados são de Israel.', 'O anti-cristro governará o mundo.', 'A tribulação culmina na volta de Cristo.'], versicosChave: ['Mateus 24:21', 'Daniel 12:1', 'Apocalipse 7:1-8'], tags: ['tribulacao', 'anti-cristro', 'apocalipse'], fontes: ['O Grande Tribulação - John Walvoord'] },
  // Apologética
  { id: 'apol-005', titulo: 'A Confiança nos Manuscritos Bíblicos', categoria: 'Apologetica', subcategoria: 'Evidencias', conteudo: ['Temos mais de 5.800 manuscritos gregos do NT.', 'As variações textuais são mínimas e não afetam doutrinas.', 'Os manuscritos são mais numerosos que outros livros antigos.', 'As traduções são baseadas em manuscritos confiáveis.', 'A Bíblia é o livro mais bem preservado da história.'], versicosChave: ['2 Timóteo 3:16', '2 Pedro 1:21'], tags: ['manuscritos', 'textual', 'confianca'], fontes: ['O Texto do NT - Bruce Metzger'] },
  // Ética Cristã
  { id: 'etica-004', titulo: 'A Bioética Cristã', categoria: 'Etica Crista', subcategoria: 'Bioética', conteudo: ['A vida humana é sagrada desde a concepção.', 'A euthanásia contradiz a soberania de Deus.', 'A engenharia genética levanta questões éticas.', 'A dignidade humana vem de Deus.', 'Devemos agir com sabedoria e compaixão.'], versicosChave: ['Salmo 139:13-16', 'Jeremias 1:5', 'Gênesis 1:27'], tags: ['bioetica', 'vida', 'eugenica'], fontes: ['Ética Cristã - Wayne Grudem'] },
  // Missiologia
  { id: 'miss-003', titulo: 'O Crescimento da Igreja no Sul Global', categoria: 'Missiologia', subcategoria: 'Missões', conteudo: ['A igreja cresce mais na Ásia e África.', 'O evangelho é contextualizado, não culturalizado.', 'O liderado nativo é essencial.', 'A perseguição fortalece a igreja.', 'As missões estão se tornando mais globais.'], versicosChave: ['Apocalipse 7:9', 'Mateus 24:14', 'Salmo 2:8'], tags: ['crescimento', 'sul global', 'missao'], fontes: ['O Futuro do Cristianismo - Philip Jenkins'] },
  // Família
  { id: 'fam-003', titulo: 'O Divórcio e o Novo Testamento', categoria: 'Vida Crista', subcategoria: 'Família', conteudo: ['Jesus ensinou que o casamento é para sempre.', 'O divórcio é permitido em caso de imoralidade.', 'Paulo permite o divórcio em caso de abandono.', 'O divórcio não é o ideal de Deus.', 'A restauração é sempre preferível.'], versicosChave: ['Mateus 19:3-9', '1 Coríntios 7:10-16'], tags: ['divorcio', 'casamento', 'restauracao'], fontes: ['O Divórcio - David Instone-Brewer'] },
  // Liderança
  { id: 'lid-003', titulo: 'A Pregação Bíblica', categoria: 'Eclesiologia', subcategoria: 'Ministério', conteudo: ['A pregação é central na adoração cristã.', 'Devemos pregar a Palavra, não opiniões.', 'A pregação deve ser expositiva e aplicada.', 'O pregador deve viver o que prega.', 'O Espirito Santo é o verdadeiro pregador.'], versicosChave: ['2 Timóteo 4:2-4', 'Atos 2:42', '1 Coríntios 1:23-25'], tags: ['pregacao', 'ministerio', 'expositoria'], fontes: ['Pregação - Haddon Robinson'] },
  // Música
  { id: 'mus-003', titulo: 'A Adoração Contemporânea', categoria: 'Vida Crista', subcategoria: 'Adoração', conteudo: ['A adoração deve ser relevante sem ser superficial.', 'A letra é mais importante que a melodia.', 'A adoração deve ser centrada em Cristo.', 'Todas as gerações têm algo a contribuir.', 'A tradição e a inovação podem coexistir.'], versicosChave: ['Colossenses 3:16', 'Efésios 5:19', 'Salmo 33:3'], tags: ['adoracao', 'contemporanea', 'louvor'], fontes: ['Adorando ao Deus Vivente - Matt Redman'] },
  // Educação
  { id: 'edu-002', titulo: 'O Ensino de Jesus', categoria: 'Vida Crista', subcategoria: 'Ensino', conteudo: ['Jesus usou parabolas como método principal.', 'O ensino era prático e transformador.', 'Jesus fazia perguntas para estimular o pensamento.', 'O ensino era autoritário e único.', 'O exemplo de Jesus complementava Suas palavras.'], versicosChave: ['Mateus 13:34-35', 'Marcos 1:22', 'Lucas 24:27'], tags: ['ensino', 'parabolas', 'jesus'], fontes: ['O Ensino de Jesus - Klyne Snodgrass'] },
  // Teologia Bíblica
  { id: 'teobib-003', titulo: 'O Cordeiro de Deus', categoria: 'Teologia Biblica', subcategoria: 'Tema Central', conteudo: ['O tema do cordeiro percorre toda a Bíblia.', 'O cordeiro pascal no Êxodo prefigura Cristo.', 'Isaías descreve o servo como cordeiro conduzido ao matadouro.', 'João Batista chama Jesus de Cordeiro de Deus.', 'O Cordeiro é o centro da adoração no Apocalipse.'], versicosChave: ['João 1:29', 'Isaías 53:7', 'Apocalipse 5:12-13'], tags: ['cordeiro', 'sacrificio', 'expiacao'], fontes: ['O Cordeiro - Brian Rosner'] },
  // Tipologia
  { id: 'tipo-001', titulo: 'Adão e Cristo', categoria: 'Estudos Comparativos', subcategoria: 'Tipologia', conteudo: ['Adão é o primeiro homem; Cristo é o último Adão.', 'O pecado de Adão trouxe morte; a obediência de Cristo traz vida.', 'Em Adão todos morrem; em Cristo todos vivem.', 'Adão falhou onde Cristo venceu.', 'A typologia é explicada por Paulo em Romanos 5.'], versicosChave: ['Romanos 5:12-21', '1 Coríntios 15:22, 45-49'], tags: ['adam', 'cristo', 'tipologia', 'typologia'], fontes: ['Teologia do NT - George Eldon Ladd'] },
  { id: 'tipo-002', titulo: 'Moisés e Cristo', categoria: 'Estudos Comparativos', subcategoria: 'Tipologia', conteudo: ['Moisés libertou Israel da escravidão; Cristo do pecado.', 'Moisés deu a lei; Cristo é a consumação da lei.', 'Moisés mediou a aliança; Cristo é o mediador da nova aliança.', 'Moisés era fiel em toda a casa de Deus.', 'Cristo é superior a Moisés como Filho sobre a casa.'], versicosChave: ['Hebreus 3:1-6', 'Deuteronômio 18:15-18'], tags: ['moises', 'cristo', 'tipologia', 'mediador'], fontes: ['Teologia do NT - George Eldon Ladd'] },
  // Harmoniologia
  { id: 'harmon-002', titulo: 'A Harmonia das Resurreições', categoria: 'Estudos Comparativos', subcategoria: 'Harmonia', conteudo: ['Mateus, Marcos, Lucas e João relatam a ressurreição.', 'Há pequenas diferenças nas narrativas.', 'As diferenças são complementares, não contraditórias.', 'A mensagem central é a mesma: Cristo ressuscitou.', 'A ressurreição é o fundamento da fé cristã.'], versicosChave: ['Mateus 28:1-10', 'Marcos 16:1-8', 'Lucas 24:1-12', 'João 20:1-18'], tags: ['ressurreicao', 'harmonia', 'evangelhos'], fontes: ['Harmonia dos Evangelhos - Robert Stein'] },
  // Literatura
  { id: 'liter-002', titulo: 'Os Gêneros Literários da Bíblia', categoria: 'Literatura Biblica', subcategoria: 'Gêneros', conteudo: ['A Bíblia contém: narrativa, poesia, profecia, epístola, apocalipse.', 'Cada gênero tem regras de interpretação.', 'O AT usa mais narrativa e poesia.', 'O NT usa mais epístolas e narrativa.', 'Reconhecer o gênero é essencial para a hermenêutica.'], versicosChave: ['2 Timóteo 3:16', 'Salmo 1:1-2'], tags: ['generos', 'literatura', 'interpretacao'], fontes: ['Literatura e Interpretação Bíblica - Leland Ryken'] },
  // Filosofia
  { id: 'filo-003', titulo: 'A Cosmovisão Cristã', categoria: 'Apologetica', subcategoria: 'Cosmovisão', conteudo: ['A cosmovisão cristã é monoteísta e teleológica.', 'Deus criou o universo com propósito.', 'A história tem direção e destino.', 'O mal é real mas temporário.', 'A verdade objetiva existe e é conhecível.'], versicosChave: ['Gênesis 1:1', 'João 1:1-3', 'Colossenses 1:16-17'], tags: ['cosmovisao', 'filosofia', 'proposito'], fontes: ['Cosmovisão Cristã - Charles Colson'] },
  // Psicologia
  { id: 'psico-002', titulo: 'A Dependência de Deus', categoria: 'Vida Crista', subcategoria: 'Espiritualidade', conteudo: ['Devemos confiar em Deus em todas as coisas.', 'A autossuficiência é pecado.', 'Deus supre todas as necessidades.', 'A oração expressa nossa dependência.', 'A fé é confiança prática em Deus.'], versicosChave: ['Provérbios 3:5-6', 'Filipenses 4:19', 'Mateus 6:25-34'], tags: ['dependencia', 'confianca', 'fe'], fontes: ['Dependente de Deus - Jon Bloom'] },
  // Ecologia
  { id: 'eco-002', titulo: 'A Teologia da Criação', categoria: 'Teologia Biblica', subcategoria: 'Criação', conteudo: ['Deus criou tudo e declarou que era bom.', 'A criação declara a glória de Deus.', 'A criação foi afetada pela queda.', 'Haverá renovação da criação.', 'Devemos cuidar da criação como mordomos.'], versicosChave: ['Gênesis 1:1, 31', 'Salmo 19:1', 'Romanos 8:19-22'], tags: ['criacao', 'teologia', 'ecologia'], fontes: ['Teologia da Criação - Henri Blocher'] },
  // Justiça Social
  { id: 'just-002', titulo: 'A Missão da Igreja com os Pobres', categoria: 'Eclesiologia', subcategoria: 'Missão', conteudo: ['Jesus identificou-se com os pobres.', 'A igreja deve servir os marginalizados.', 'O amor ao próximo inclui ação social.', 'A evangelização e a ação social são complementares.', 'A justiça é característica do Reino de Deus.'], versicosChave: ['Mateus 25:35-40', 'Tiago 1:27', 'Miquéias 6:8'], tags: ['pobres', 'justiça social', 'missao'], fontes: ['Ministério aos Pobres - Robert Lupton'] },
  // Arqueologia
  { id: 'arqueo-003', titulo: 'A Estela de Tel Dan', categoria: 'Historia da Igreja', subcategoria: 'Arqueologia', conteudo: ['Descoberta em 1993, menciona a "casa de Davi".', 'É a primeira referência extrabíblica a Davi.', 'Confirma a existência histórica do rei Davi.', 'A arqueologia sustenta o relato bíblico.', 'Cada descoberta reforça a confiabilidade da Bíblia.'], versicosChave: ['2 Samuel 7:12-16', '1 Crônicas 17:11-14'], tags: ['arqueologia', 'davi', 'tel dan'], fontes: ['Arqueologia e Bíblia - Bryant Wood'] },
  // Biografias
  { id: 'biog-003', titulo: 'A Vida de Pedro', categoria: 'Historia da Igreja', subcategoria: 'Personagens', conteudo: ['Pedro era pescador chamado por Jesus.', 'Confessou Jesus como o Cristo.', 'Negou Jesus três vezes mas se arrependeu.', 'Foi líder da igreja primitiva em Jerusalém.', 'Pregou o primeiro sermão em Pentecostes.'], versicosChave: ['Mateus 16:16', 'Lucas 22:54-62', 'Atos 2:14-41'], tags: ['pedro', 'apostolo', 'lideranca'], fontes: ['Pedro - Fleming Revell'] },
  { id: 'biog-004', titulo: 'A Vida de Paulo', categoria: 'Historia da Igreja', subcategoria: 'Personagens', conteudo: ['Paulo nasceu em Tarso, fariseu e cidadão romano.', 'Perseguiu a igreja antes da conversão.', 'Fez três viagens missionarias.', 'Escreveu 13 epistolas.', 'Foi martirizado em Roma.'], versicosChave: ['Atos 9:1-19', 'Atos 13-28', '2 Timóteo 4:6-8'], tags: ['paulo', 'missionario', 'epistolas'], fontes: ['Paulo - F.F. Bruce'] },
  // Linguística
  { id: 'ling-004', titulo: 'A Tradução da Bíblia', categoria: 'Linguas Biblicas', subcategoria: 'Tradução', conteudo: ['A Septuaginta (LXX) é a tradução grega do AT.', 'A Vulgata de Jerônimo é a tradução latina.', 'Lutero traduziu a Bíblia para o alemão.', 'A King James Version é a tradução inglesa mais famosa.', 'A tradução em língua vernácula é essencial para acessibilidade.'], versicosChave: ['2 Coríntios 3:6', '1 Coríntios 14:19'], tags: ['traducao', 'lingua', 'acessibilidade'], fontes: ['A Palavra Traduzida - Leland Ryken'] },
  // Hermenêutica
  { id: 'herm-56', titulo: 'A Gramática Histórica', categoria: 'Hermenêutica', subcategoria: 'Métodos', conteudo: ['A gramática histórica busca o significado original.', 'Considera o vocabulário, sintaxe e contexto.', 'Usa dicionários e léxicos bíblicos.', 'O objetivo é entender como o autor original foi compreendido.', 'É a base para qualquer interpretação válida.'], versicosChave: ['2 Timóteo 2:15', '1 Coríntios 2:13'], tags: ['gramatica', 'historica', 'interpretacao'], fontes: ['Gramática Histórica do AT - Paul Joüon'] },
  // Práticas Cristãs
  { id: 'prat-001', titulo: 'O Jejum na Vida Cristã', categoria: 'Vida Crista', subcategoria: 'Práticas', conteudo: ['O jejum é prática de disciplina espiritual.', 'Jesus jejuou quarenta dias no deserto.', 'O jejum deve ser voluntário e privado.', 'Não é para ser visto pelos homens.', 'O jejum foca em Deus, não em sacrifício pessoal.'], versicosChave: ['Mateus 6:16-18', 'Mateus 4:1-2', 'Isaías 58:6-8'], tags: ['jejum', 'disciplina', 'espiritualidade'], fontes: ['Os Disciplinas Espirituais - Dallas Willard'] },
  { id: 'prat-002', titulo: 'A Confissão de Pecados', categoria: 'Vida Crista', subcategoria: 'Práticas', conteudo: ['Devemos confessar pecados a Deus regularmente.', 'A confissão é baseada na graça, não em obras.', 'Devemos confessar uns aos outros.', 'A confissão traz restauração.', 'Deus é fiel e justo para perdoar.'], versicosChave: ['1 João 1:9', 'Tiago 5:16', 'Salmo 32:3-5'], tags: ['confissao', 'perdao', 'restauracao'], fontes: ['Confissão - Tullian Tchividjian'] },
  // Temas Teológicos
  { id: 'tema-001', titulo: 'O Reino de Deus e Seu Reino', categoria: 'Teologia Biblica', subcategoria: 'Reino', conteudo: ['O Reino de Deus é governo soberano de Deus.', 'O Reino é presente e futuro.', 'O Reino se expande pela Palavra.', 'O Reino transforma sociedades.', 'O Reino culminará no Reino eterno.'], versicosChave: ['Mateus 6:33', 'Marcos 1:15', 'Lucas 17:20-21'], tags: ['reino', 'governo', 'futuro'], fontes: ['A Teologia do Reino - George Ladd'] },
  { id: 'tema-002', titulo: 'A Nova Aliança', categoria: 'Teologia Biblica', subcategoria: 'Aliança', conteudo: ['A Nova Aliança foi prometida por Jeremias.', 'Cristo é o mediador da Nova Aliança.', 'A Nova Aliança escreve a lei no coração.', 'O perdão é completo e definitivo.', 'O Espirito habita nos crentes.'], versicosChave: ['Jeremias 31:31-34', 'Hebreus 8:6-13', 'Lucas 22:20'], tags: ['alianca nova', 'perdao', 'espirito'], fontes: ['A Teologia da Aliança - O. Palmer Robertson'] },
  { id: 'tema-003', titulo: 'A Glória de Deus', categoria: 'Teologia Proper', subcategoria: 'Glória', conteudo: ['A glória de Deus é a manifestação de Sua majestade.', 'Toda a criação declara a glória de Deus.', 'A glória de Deus é o proposito da história.', 'Devemos viver para a glória de Deus.', 'A glória de Deus se revela plenamente em Cristo.'], versicosChave: ['Salmo 19:1', 'Efésios 3:20-21', 'João 1:14'], tags: ['gloria', 'majestade', 'proposito'], fontes: ['A Glória de Deus - John Piper'] },


  // --- BATCH 4: +330 estudos para atingir 1000+ ---
  // Mais Temas por Livro
  { id: 'livro-146', titulo: 'A Criacao do Universo', categoria: 'Temas por Livro', subcategoria: 'Genese', conteudo: ['Deus criou os céus e a terra pelo Seu poder.', 'A criação foi ordenada e gradual.', 'A palavra de Deus trouxe tudo à existência.', 'O universo testemunha a glória de Deus.', 'A criação é um ato de amor e sabedoria.'], versicosChave: ['Gênesis 1:1', 'Hebreus 11:3', 'Salmo 19:1'], tags: ['genesis', 'criacao', 'universo'], fontes: ['Comentario ao Gênesis - Gordon Wenham'] },
  { id: 'livro-147', titulo: 'O Diluvio Universal', categoria: 'Temas por Livro', subcategoria: 'Genese', conteudo: ['O diluvio foi juizo sobre a corrupção humana.', 'Noé achou graça aos olhos do Senhor.', 'Deus preservou a vida por meio de uma arca.', 'O diluvio renovou a terra.', 'A aliança pós-diluvio é um símbolo de misericórdia.'], versicosChave: ['Gênesis 6:5-8', 'Gênesis 7:1-24', 'Gênesis 9:8-17'], tags: ['genesis', 'diluvio', 'juizo', 'alianca'], fontes: ['Comentario ao Gênesis - Victor Hamilton'] },
  { id: 'livro-148', titulo: 'A Torre de Babel', categoria: 'Temas por Livro', subcategoria: 'Genese', conteudo: ['A Torre de Babel foi tentativa de rebelião humana.', 'O orgulho levou os homens a se rebelarem.', 'Deus confundiu as línguas.', 'A dispersão foi consequência do pecado.', 'A diversidade linguística é obra de Deus.'], versicosChave: ['Gênesis 11:1-9'], tags: ['babel', 'linguas', 'orgulho'], fontes: ['Comentario ao Gênesis - Nahum Sarna'] },
  { id: 'livro-149', titulo: 'A Aliança Abraâmica', categoria: 'Temas por Livro', subcategoria: 'Genese', conteudo: ['Deus fez uma aliança incondicional com Abraão.', 'Prometeu descendência, terra e bênção.', 'A fé de Abraão foi creditada como justiça.', 'O sacrifício de Isaac testou a fé.', 'Em tua semente serão benditas todas as nações.'], versicosChave: ['Gênesis 12:1-3', 'Gênesis 15:6', 'Gênesis 22:18'], tags: ['alianca', 'abraao', 'fe', 'promessa'], fontes: ['Comentario ao Gênesis - Bruce Waltke'] },
  { id: 'livro-150', titulo: 'Os Dez Mandamentos', categoria: 'Temas por Livro', subcategoria: 'Exodo', conteudo: ['Os mandamentos revelam a vontade santa de Deus.', 'O primeiro mandamento proíbe outros deuses.', 'O quarto mandamento ordena o descanso.', 'Os mandamentos são baseados no amor.', 'Jesus resumiu os mandamentos em dois.'], versicosChave: ['Êxodo 20:1-17', 'Mateus 22:37-40'], tags: ['mandamentos', 'lei', 'amor'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  { id: 'livro-151', titulo: 'O Êxodo do Egito', categoria: 'Temas por Livro', subcategoria: 'Exodo', conteudo: ['Deus ouviu o clamor de Israel.', 'As dez pragas demonstraram o poder de Deus.', 'O cordeiro pascal é tipo de Cristo.', 'O mar Vermelho se abriu.', 'O Sinai estabeleceu a aliança.'], versicosChave: ['Êxodo 3:7-8', 'Êxodo 12:1-14', 'Êxodo 14:21-31'], tags: ['exodo', 'libertacao', 'pragas'], fontes: ['Comentario ao Êxodo - Douglas Stuart'] },
  { id: 'livro-152', titulo: 'A Conquista de Canaã sob Josué', categoria: 'Temas por Livro', subcategoria: 'Josue', conteudo: ['Deus cumpriu a promessa da terra.', 'Josué liderou com coragem.', 'A queda de Jericó demonstrou o poder de Deus.', 'A terra foi dividida entre as tribos.', 'Josué desafiou o povo a servir ao Senhor.'], versicosChave: ['Josué 1:9', 'Josué 6:1-27', 'Josué 24:14-15'], tags: ['josue', 'conquista', 'coragem'], fontes: ['Comentario ao Josué - Richard Hess'] },
  { id: 'livro-153', titulo: 'Os Juízes de Israel', categoria: 'Temas por Livro', subcategoria: 'Juizes', conteudo: ['Israel caiu em idolatria repetidamente.', 'Deus levantou juízes para libertar.', 'O ciclo: pecado, clamor, libertação.', 'Gideão derrotou os midianitas com 300 homens.', 'Sansão foi o último e mais controverso juiz.'], versicosChave: ['Juízes 2:11-19', 'Juízes 7:1-25', 'Juízes 13-16'], tags: ['juizes', 'libertacao', 'ciclo'], fontes: ['Comentario aos Juízes - Robert Boling'] },
  { id: 'livro-154', titulo: 'Rute: Lealdade e Redenção', categoria: 'Temas por Livro', subcategoria: 'Rute', conteudo: ['Rute permaneceu fiel à sua sogra.', 'A lealdade de Rute foi recompensada.', 'Rute é ancestral de Davi e de Jesus.', 'O amor de Deus se manifesta na história humana.', 'Rute é um exemplo de fé e obediência.'], versicosChave: ['Rute 1:16-17', 'Rute 4:14-17', 'Mateus 1:5'], tags: ['rute', 'lealdade', 'redencao', 'ancestral'], fontes: ['Comentario a Rute - Robert Hubbard'] },
  // Mais Doutinas
  { id: 'doutr-131', titulo: 'A Justificação pela Fé', categoria: 'Doutrinas Fundamentais', subcategoria: 'Soteriologia', conteudo: ['A justificação é ato legal de Deus.', 'O pecador é declarado justo pela fé.', 'A justiça é imputada, não infundida.', 'A fé é o meio, não a causa da justificação.', 'A justificação traz paz com Deus.'], versicosChave: ['Romanos 3:24-28', 'Gálatas 2:16', 'Efésios 2:8-9'], tags: ['justificacao', 'fe', 'graça'], fontes: ['A Teologia da Reforma - Alister McGrath'] },
  { id: 'doutr-132', titulo: 'A Sanctificação', categoria: 'Doutrinas Fundamentais', subcategoria: 'Soteriologia', conteudo: ['A sanctificação é processo de tornar-se santo.', 'Começa na conversão e continua toda a vida.', 'O Espirito Santo é o agente da sanctificação.', 'A Palavra de Deus é instrumento.', 'A sanctificação é progressiva mas incompleta nesta vida.'], versicosChave: ['1 Tessalonicenses 4:3', 'Filipenses 1:6', 'Hebreus 12:14'], tags: ['santificacao', 'santidade', 'crescimento'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  { id: 'doutr-133', titulo: 'A Glorificação', categoria: 'Doutrinas Fundamentais', subcategoria: 'Escatologia', conteudo: ['A glorificação é a consumação da salvação.', 'Ocrente receberá um corpo glorificado.', 'Não haverá mais pecado nem sofrimento.', 'A glorificação completa a redenção.', 'Seremos como Cristo.'], versicosChave: ['Romanos 8:30', '1 Coríntios 15:51-57', '1 João 3:2'], tags: ['glorificacao', 'corpo glorificado', 'eternidade'], fontes: ['Teologia Sistematica - Louis Berkhof'] },
  { id: 'doutr-134', titulo: 'A Eleição', categoria: 'Doutrinas Fundamentais', subcategoria: 'Soteriologia', conteudo: ['Deus escolheu certos para salvação em Cristo.', 'A eleição é baseada na graça, não em méritos.', 'A eleição é soberana e gratuita.', 'A eleição não anula a responsabilidade humana.', 'A eleição glorifica a graça de Deus.'], versicosChave: ['Efésios 1:4-5', 'Romanos 8:29-30', '1 Pedro 1:1-2'], tags: ['eleicao', 'soberania', 'graca'], fontes: ['A Eleição - Arthur Pink'] },
  // Mais Questões Contemporâneas
  { id: 'contemp-65', titulo: 'A Crise da Pós-Modernidade', categoria: 'Questões Contemporâneas', subcategoria: 'Cultura', conteudo: ['O relativismo desafia a verdade objetiva.', 'A pós-modernidade questiona todas as narrativas.', 'O cristianismo oferece verdade absoluta.', 'Devemos ser sábios na comunicação.', 'O evangelho é relevante para cada cultura.'], versicosChave: ['João 8:32', 'João 14:6', '1 Pedro 3:15'], tags: ['pos-modernidade', 'verdade', 'cultura'], fontes: ['A Verdade Cristã - Norman Geisler'] },
  { id: 'contemp-66', titulo: 'O Evangelho e o Feminismo', categoria: 'Questões Contemporâneas', subcategoria: 'Gênero', conteudo: ['A Bíblia afirma a igualdade de valor entre homens e mulheres.', 'Diferentes funções não significam desigualdade.', 'Jesus tratou mulheres com respeito.', 'O papel da mulher na igreja é debatido.', 'O evangelho liberta e dignifica.'], versicosChave: ['Gálatas 3:28', 'Gênesis 1:27', 'Mateus 28:1-10'], tags: ['feminismo', 'genero', 'igualdade'], fontes: ['Mulheres na Bíblia - Christine Pohl'] },
  { id: 'contemp-67', titulo: 'O Evangelho e a Política', categoria: 'Questões Contemporâneas', subcategoria: 'Sociedade', conteudo: ['O Reino de Deus transcende partidos políticos.', 'Devemos ser cidadãos fiéis.', 'A justiça é preocupação de Deus.', 'Devemos orar por governantes.', 'A igreja não deve se alinhar a ideologias.'], versicosChave: ['Romanos 13:1-7', '1 Timóteo 2:1-2', 'Filipenses 3:20'], tags: ['politica', 'cidadania', 'justica'], fontes: ['O Reino e o Poder - James Hunter'] },
  // Mais Estudos Comparativos
  { id: 'comp-61', titulo: 'Cristianismo vs. Testemunhas de Jeová', categoria: 'Estudos Comparativos', subcategoria: 'Seitas', conteudo: ['As TJ negam a divindade de Cristo.', 'A Bíblia usada pelas TJ é diferente.', 'A TJ ensina que apenas 144.000 serão salvos.', 'A TJ não acredita na ressurreição corporal.', 'O evangelho da TJ é diferente do bíblico.'], versicosChave: ['João 1:1', '1 Coríntios 15:12-19', '2 João 1:7'], tags: ['testemunhas', 'seitas', 'cristologia'], fontes: ['Cristianismo e Seitas - Walter Martin'] },
  { id: 'comp-62', titulo: 'Cristianismo vs. Mórmons', categoria: 'Estudos Comparativos', subcategoria: 'Seitas', conteudo: ['Os Mórmons aceitam mais escrituras além da Bíblia.', 'A trindade mórmon é diferente da bíblica.', 'O Mórmon ensina que Deus foi um homem.', 'O Mórmon ensina a exaltação do homem.', 'O evangelho mórmon é outro evangelho.'], versicosChave: ['Gálatas 1:6-9', '2 Coríntios 11:3-4', 'Isaías 43:10'], tags: ['mormons', 'seitas', 'evangelho'], fontes: ['Cristianismo e Seitas - Walter Martin'] },
  { id: 'comp-63', titulo: 'Cristianismo vs. Ciência Cristã', categoria: 'Estudos Comparativos', subcategoria: 'Seitas', conteudo: ['A Ciência Cristã nega a realidade do pecado e da doença.', 'Jesus é apenas um modelo, não o Salvador.', 'A cura vem da mudança de pensamento.', 'A Bíblia é interpretada alegoricamente.', 'O pecado e a morte são ilusões.'], versicosChave: ['1 João 1:8', 'Hebreus 9:27', 'Romanos 3:23'], tags: ['ciencia crista', 'seitas', 'pecado'], fontes: ['Cristianismo e Seitas - Walter Martin'] },
  // Mais História da Igreja
  { id: 'hist-56', titulo: 'A Queda de Constantinopla (1453)', categoria: 'Historia da Igreja', subcategoria: 'Eventos', conteudo: ['Constantinopla caiu para os otomanos.', 'O fim do Império Bizantino.', 'Muitos estudiosos fugiram para o Ocidente.', 'A fuga contribuiu para o Renascimento.', 'A queda marcou o fim da Idade Média.'], versicosChave: ['Eclesiastes 3:1-8'], tags: ['constantinopla', 'ottomanos', 'renascimento'], fontes: ['Historia da Igreja - Justo Gonzalez'] },
  { id: 'hist-57', titulo: 'A Contra-Reforma', categoria: 'Historia da Igreja', subcategoria: 'Reforma', conteudo: ['O Concílio de Trento (1545-1563) respondeu à Reforma.', 'A Companhia de Jesus (jesuítas) foi fundada.', 'A Inquisição foi intensificada.', 'A Igreja Católica se reformou internamente.', 'A Contra-Reforma moldou o catolicismo moderno.'], versicosChave: ['Efésios 2:8-9', 'Romanos 3:28'], tags: ['contra-reforma', 'trento', 'jesuitas'], fontes: ['Historia da Reforma - Alister McGrath'] },
  { id: 'hist-58', titulo: 'O Avivamento de Azuza (1906)', categoria: 'Historia da Igreja', subcategoria: 'Avivamentos', conteudo: ['O Avivamento de Azuza marcou o início do pentecostalismo.', 'Charles Parham e William Seymour foram líderes.', 'Fala em línguas e curas foram relatadas.', 'O movimento se espalhou globalmente.', 'O pentecostalismo é hoje o maior movimento cristão.'], versicosChave: ['Atos 2:1-4', 'Atos 10:44-46'], tags: ['avivamento', 'pentecostal', 'azuza'], fontes: ['Historia do Pentecostalismo - Allan Anderson'] },
  // Mais Hermenêutica
  { id: 'herm-57', titulo: 'A Interpretação de Salmos', categoria: 'Hermenêutica', subcategoria: 'Métodos', conteudo: ['Os Salmos são orações e louvores inspirados.', 'Devemos entender o contexto histórico.', 'Alguns Salmos são messiânicos.', 'A interpretação deve considerar o gênero poético.', 'Aplicar os Salmos à vida cristã.'], versicosChave: ['Salmo 1:1-6', 'Salmo 22:1', 'Salmo 110:1'], tags: ['salmos', 'interpretacao', 'oracao'], fontes: ['Como Interpretar os Salmos - Tremper Longman III'] },
  { id: 'herm-58', titulo: 'A Interpretação de Apocalipse', categoria: 'Hermenêutica', subcategoria: 'Métodos', conteudo: ['Apocalipse usa simbolismo apocalíptico.', 'O livro foi escrito para igrejas perseguidas.', 'Há diferentes abordagens interpretativas.', 'O tema central é a vitória de Cristo.', 'Devemos ler com reverência e discernimento.'], versicosChave: ['Apocalipse 1:1-3', 'Apocalipse 22:18-19'], tags: ['apocalipse', 'simbolismo', 'interpretacao'], fontes: ['Como Interpretar Apocalipse - Craig Keener'] },
  // Mais Vida Cristã
  { id: 'vida-011', titulo: 'A Gratidão na Vida Cristã', categoria: 'Vida Crista', subcategoria: 'Atitude', conteudo: ['A gratidão é atitude fundamental do cristão.', 'Devemos dar graças em todas as coisas.', 'A gratidão reconhece a bondade de Deus.', 'A ingratidão é pecado.', 'A gratidão transforma nossa perspectiva.'], versicosChave: ['1 Tessalonicenses 5:18', 'Colossenses 3:15-17', 'Efésios 5:20'], tags: ['gratidao', 'oracao', 'atitude'], fontes: ['A Gratidão - Dennis F. Kinlaw'] },
  { id: 'vida-012', titulo: 'O Contentamento', categoria: 'Vida Crista', subcategoria: 'Atitude', conteudo: ['O contentamento é aprendido, não natural.', 'Paulo aprendeu a contentar-se.', 'O contentamento não depende de posses.', 'Deus supre todas as necessidades.', 'A ganância é inimiga do contentamento.'], versicosChave: ['Filipenses 4:11-13', '1 Timóteo 6:6-10', 'Hebreus 13:5'], tags: ['contentamento', 'ganancia', 'paz'], fontes: ['Contentamento - Kevin DeYoung'] },
  { id: 'vida-013', titulo: 'A Paciência', categoria: 'Vida Crista', subcategoria: 'Caráter', conteudo: ['A paciência é fruto do Espírito Santo.', 'Deus é paciente conosco.', 'A paciência é produzida pelo sofrimento.', 'Devemos ser pacientes uns com os outros.', 'A paciência prepara para a eternidade.'], versicosChave: ['Gálatas 5:22', 'Romanos 5:3-5', 'Tiago 1:3-4'], tags: ['paciencia', 'fruto', 'sofrimento'], fontes: ['A Paciência - Thomas Watson'] },
  { id: 'vida-014', titulo: 'A Coragem na Adversidade', categoria: 'Vida Crista', subcategoria: 'Força', conteudo: ['Deus não nos deu espírito de covardia.', 'Devemos ser fortes e corajosos.', 'A coragem vem da presença de Deus.', 'Deus está conosco nas tribulações.', 'A vitória já foi conquistada em Cristo.'], versicosChave: ['Josué 1:9', '2 Timóteo 1:7', 'Romanos 8:31'], tags: ['coragem', 'força', 'adversidade'], fontes: ['A Coragem de Ser - Paul Tillich'] },
  { id: 'vida-015', titulo: 'A Simplicidade', categoria: 'Vida Crista', subcategoria: 'Mordomia', conteudo: ['Devemos ser simples em nossos desejos.', 'A simplicidade liberta da avareza.', 'Devemos buscar primeiro o Reino.', 'A generosidade é expressão de simplicidade.', 'Deus é nosso tesouro supremo.'], versicosChave: ['Mateus 6:19-21', '1 Timóteo 6:6-8', 'Filipenses 4:12'], tags: ['simplicidade', 'mordomia', 'generosidade'], fontes: ['A Simplicidade - Richard Foster'] },
  // Mais Eclesiologia
  { id: 'ecles-007', titulo: 'A Ceia do Senhor', categoria: 'Eclesiologia', subcategoria: 'Sacramento', conteudo: ['A Ceia é memorial da morte de Cristo.', 'O pão e o vinho representam o corpo e o sangue.', 'Devemos examinar-nos antes de participar.', 'É comunhão com Cristo e uns com os outros.', 'Celebramos até que Ele venha.'], versicosChave: ['1 Coríntios 11:23-26', 'Mateus 26:26-29'], tags: ['ceia', 'memorial', 'comunhao'], fontes: ['A Ceia do Senhor - Thomas Schreiner'] },
  { id: 'ecles-008', titulo: 'O Baptismo', categoria: 'Eclesiologia', subcategoria: 'Sacramento', conteudo: ['O baptismo é ordenança de Cristo.', 'Simboliza morte e ressurreição com Cristo.', 'É para crentes professos.', 'Demonstra obediência pública.', 'A água não salva, mas simboliza a salvação.'], versicosChave: ['Mateus 28:19', 'Romanos 6:3-4', 'Atos 2:38'], tags: ['baptismo', 'obediencia', 'simbolo'], fontes: ['O Baptismo - Daniel Akin'] },
  // Mais Pneumatologia
  { id: 'pneum-009', titulo: 'O Consolo do Espírito Santo', categoria: 'Pneumatologia', subcategoria: 'Ministério', conteudo: ['O Espírito Santo é chamado de Paráclito.', 'Ele consola os crentes em tribulações.', 'Guia em toda a verdade.', 'Lembra das palavras de Jesus.', 'Intercede por nós com suspiros indizíveis.'], versicosChave: ['João 14:16-17', 'João 16:7-15', 'Romanos 8:26-27'], tags: ['espirito santo', 'consolador', 'paracletos'], fontes: ['O Espirito Santo - R. Sproul'] },
  { id: 'pneum-010', titulo: 'O Dádiva do Espírito Santo', categoria: 'Pneumatologia', subcategoria: 'Dons', conteudo: ['O Espírito distribui dons para edificação da igreja.', 'Nem todos recebem os mesmos dons.', 'O amor é mais importante que os dons.', 'Os dons são para serviço, não exibição.', 'Os dons operam segundo a soberania de Deus.'], versicosChave: ['1 Coríntios 12:4-11', '1 Coríntios 13:1-3'], tags: ['dons', 'espirito santo', 'edificacao'], fontes: ['Os Dons Espirituais - John MacArthur'] },
  // Mais Teologia Própria
  { id: 'teoprop-006', titulo: 'A Onipresença de Deus', categoria: 'Teologia Proper', subcategoria: 'Atributos', conteudo: ['Deus está presente em todos os lugares.', 'A onipresença traz consolo aos aflitos.', 'Nenhum lugar está oculto de Deus.', 'Deus está presente em toda a criação.', 'A onipresença é base para a oração.'], versicosChave: ['Salmo 139:7-12', 'Jeremias 23:23-24', 'Mateus 28:20'], tags: ['onipresença', 'presença', 'oracao'], fontes: ['Deus - J.I. Packer'] },
  { id: 'teoprop-007', titulo: 'A Imutabilidade de Deus', categoria: 'Teologia Proper', subcategoria: 'Atributos', conteudo: ['Deus não muda em Sua natureza.', 'Suas promessas são firmes.', 'Sua justiça e amor são constantes.', 'A imutabilidade é base da nossa segurança.', 'Deus é o mesmo ontem, hoje e sempre.'], versicosChave: ['Malaquias 3:6', 'Hebreus 13:8', 'Números 23:19'], tags: ['imutabilidade', 'constancia', 'firmesa'], fontes: ['Deus - A.W. Tozer'] },
  // Mais Escatologia
  { id: 'escat-007', titulo: 'O Julgamento das Nações', categoria: 'Escatologia', subcategoria: 'Juizo', conteudo: ['Cristo julgará as nações na Sua volta.', 'As nações serão separadas como ovelhas e cabras.', 'O critério é o tratamento dado aos irmãos.', 'O julgamento será justo e imparcial.', 'As nações trarão suas honras à Nova Jerusalém.'], versicosChave: ['Mateus 25:31-46', 'Apocalipse 21:24-26'], tags: ['juizo', 'nacoes', 'ovelhas', 'cabras'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  { id: 'escat-008', titulo: 'O Reino Milenar', categoria: 'Escatologia', subcategoria: 'Reino', conteudo: ['Cristo reinará na terra por 1.000 anos.', 'Satanás será preso durante o milênio.', 'Os santos ressuscitados reinarão com Cristo.', 'A terra será renovada parcialmente.', 'O Reino milenar antecede o Reino eterno.'], versicosChave: ['Apocalipse 20:1-6', 'Isaías 65:17-25'], tags: ['millenio', 'reino', 'reinado'], fontes: ['A Segunda Vinda de Cristo - John Walvoord'] },
  // Mais Apologética
  { id: 'apol-006', titulo: 'A Existência de Deus e a Ciência', categoria: 'Apologetica', subcategoria: 'Evidências', conteudo: ['A ciência não contradiz necessariamente Deus.', 'O argumento do design é fortalecido pela ciência.', 'A origem do universo aponta para um Criador.', 'A complexidade da vida aponta para Inteligência.', 'A ciência e a fé podem coexistir.'], versicosChave: ['Romanos 1:20', 'Salmo 19:1', 'Hebreus 11:3'], tags: ['ciencia', 'design', 'criador'], fontes: ['Deus e a Ciência - Alister McGrath'] },
  { id: 'apol-007', titulo: 'A Resurreição e a História', categoria: 'Apologetica', subcategoria: 'Evidências', conteudo: ['A ressurreição é o fato mais bem documentado.', 'Mais de 500 testemunhas.', 'A tumba estava vazia.', 'As aparições foram a grupos e indivíduos.', 'A transformação dos apóstolos é evidência.'], versicosChave: ['1 Coríntios 15:3-8', 'Lucas 24:36-49'], tags: ['ressurreicao', 'historia', 'testemunhas'], fontes: ['A Ressurreição do Filho de Deus - N.T. Wright'] },
  // Mais Ética
  { id: 'etica-005', titulo: 'A Ética do Trabalho', categoria: 'Etica Crista', subcategoria: 'Trabalho', conteudo: ['O trabalho é dom de Deus.', 'Devemos trabalhar com excelência.', 'A honestidade é essencial.', 'O trabalho deve glorificar a Deus.', 'Devemos tratar trabalhadores com justiça.'], versicosChave: ['Colossenses 3:23', 'Provérbios 14:23', 'Efésios 4:28'], tags: ['trabalho', 'etica', 'honestidade'], fontes: ['O Chamado do Trabalho - Tim Keller'] },
  { id: 'etica-006', titulo: 'A Ética da Comunicação', categoria: 'Etica Crista', subcategoria: 'Comunicação', conteudo: ['A mentira é pecado.', 'A verdade deve ser dita com amor.', 'Devemos ser pessoas de palavra.', 'A calúnia destrói relacionamentos.', 'A edificação deve ser o objetivo da comunicação.'], versicosChave: ['Efésios 4:25, 29', 'Colossenses 4:6', 'Provérbios 12:22'], tags: ['comunicacao', 'verdade', 'amor'], fontes: ['Palavras que Constroem - Gary Chapman'] },
  // Mais Missiologia
  { id: 'miss-004', titulo: 'A História das Missões', categoria: 'Missiologia', subcategoria: 'História', conteudo: ['As missões começaram no AT com Israel.', 'Jesus enviou os 72 discípulos.', 'Paulo é o maior missionário do NT.', 'As missões se expandiram na era moderna.', 'William Carey é o pai das missões modernas.'], versicosChave: ['Mateus 28:19-20', 'Atos 13:1-3', 'Romanos 10:14-15'], tags: ['missoes', 'historia', 'carey'], fontes: ['Historia das Missões - Stephen Neill'] },
  { id: 'miss-005', titulo: 'A Missão na Cultura Pop', categoria: 'Missiologia', subcategoria: 'Contemporânea', conteudo: ['A cultura pop é campo missionário.', 'Devemos entender a cultura para comunicar o evangelho.', 'Jesus usou parabolas — linguagem da cultura.', 'O evangelho é relevante para toda cultura.', 'Devemos ser sábios, não ingênuos.'], versicosChave: ['1 Coríntios 9:19-23', 'Mateus 28:19'], tags: ['cultura pop', 'missao', 'contextualizacao'], fontes: ['A Igreja e a Cultura - David Wells'] },
  // Mais Família
  { id: 'fam-004', titulo: 'A Vida Cristã no Casamento', categoria: 'Vida Crista', subcategoria: 'Família', conteudo: ['O casamento é reflexo do amor de Cristo pela igreja.', 'A comunicação é essencial.', 'O perdão é indispensável.', 'O tempo juntos fortalece o casamento.', 'Deus é o centro do casamento cristão.'], versicosChave: ['Efésios 5:22-33', 'Colossenses 3:18-19', '1 Pedro 3:1-7'], tags: ['casamento', 'comunicacao', 'perdao'], fontes: ['O Casamento - Tim Keller'] },
  { id: 'fam-005', titulo: 'A Família como Igreja Doméstica', categoria: 'Vida Crista', subcategoria: 'Família', conteudo: ['A família é a primeira unidade da igreja.', 'Os pais são sacerdotes no lar.', 'A adoração familiar é essencial.', 'A educação espiritual começa em casa.', 'A família é fortalecida pela comunhão.'], versicosChave: ['Deuteronômio 6:6-7', 'Efésios 6:1-4', 'Atos 16:31'], tags: ['familia', 'igreja domestica', 'adoracao'], fontes: ['A Igreja no Lar - Francis Schaeffer'] },
  // Mais Liderança
  { id: 'lid-004', titulo: 'A Liderança Feminina na Bíblia', categoria: 'Eclesiologia', subcategoria: 'Mulheres', conteudo: ['Deborah liderou Israel como juíza.', 'Priscila ensinou Apolós.', 'Nóe foi diaconisa na igreja.', 'As mulheres tinham papéis variados no NT.', 'O debate sobre liderança feminina continua.'], versicosChave: ['Juízes 4:4-5', 'Atos 18:26', 'Romanos 16:1-7'], tags: ['mulheres', 'lideranca', 'debate'], fontes: ['Mulheres na Bíblia - Wayne Grudem'] },
  // Mais Arqueologia
  { id: 'arqueo-004', titulo: 'A Inscrição de Pilatos', categoria: 'Historia da Igreja', subcategoria: 'Arqueologia', conteudo: ['Uma inscrição com o nome de Pôncio Pilatos foi encontrada.', 'Confirma a existência histórica de Pilatos.', 'Sustenta o relato evangélico.', 'A arqueologia confirma detalhes bíblicos.', 'Cada descoberta aumenta a confiabilidade.'], versicosChave: ['Lucas 3:1', 'Atos 4:27'], tags: ['arqueologia', 'pilatos', 'historia'], fontes: ['Arqueologia e Bíblia - Kent Weeks'] },
  // Mais Biografias
  { id: 'biog-005', titulo: 'A Vida de João, o Apóstolo', categoria: 'Historia da Igreja', subcategoria: 'Personagens', conteudo: ['João era chamado de discípulo amado.', 'Escreveu o Evangelho, epistolas e Apocalipse.', 'Foi o único apóstolo que não foi martirizado.', 'Envelheceu e morreu em Éfeso.', 'Sua teologia é centrada no amor.'], versicosChave: ['João 13:23', 'João 21:20-24', '1 João 4:8'], tags: ['joao', 'apostolo', 'amor'], fontes: ['João - Leon Morris'] },
  // Mais Teologia Bíblica
  { id: 'teobib-004', titulo: 'O Servo Sofredor', categoria: 'Teologia Biblica', subcategoria: 'Messias', conteudo: ['Isaías 53 descreve o servo sofredor.', 'O servo carregará os pecados de muitos.', 'Será ferido e transgredido.', 'O servo será como ovelha ao matadouros.', 'Através de seu sofrimento, justificará muitos.'], versicosChave: ['Isaías 53:1-12', '1 Pedro 2:24-25'], tags: ['servo sofredor', 'messias', 'isaias 53'], fontes: ['Teologia do Antigo Testamento - E.J. Young'] },
  { id: 'teobib-005', titulo: 'O Filho do Homem', categoria: 'Teologia Biblica', subcategoria: 'Messias', conteudo: ['Jesus se autodenominou Filho do Homem.', 'O título vem de Daniel 7:13-14.', 'Indica autoridade e identidade messiânica.', 'Filho do Homem enfatiza humanidade e divindade.', 'O Filho do Homem virá em glória.'], versicosChave: ['Daniel 7:13-14', 'Marcos 14:62', 'Mateus 26:64'], tags: ['filho do homem', 'messias', 'daniel'], fontes: ['Teologia do NT - George Eldon Ladd'] },
  // Mais Literatura
  { id: 'liter-003', titulo: 'A Parábola do Filho Pródigo', categoria: 'Literatura Biblica', subcategoria: 'Parábolas', conteudo: ['A parábola mais conhecida de Jesus.', 'O filho mais novo desperdiça sua herança.', 'O pai o recebe de braços abertos.', 'Representa o amor de Deus pelos pecadores.', 'O filho mais velho representa a religiosidade farisaica.'], versicosChave: ['Lucas 15:11-32'], tags: ['parabola', 'filho prodigio', 'perdao'], fontes: ['O Deus Pródigo - Tim Keller'] },
  { id: 'liter-004', titulo: 'A Parábola do Bom Samaritano', categoria: 'Literatura Biblica', subcategoria: 'Parábolas', conteudo: ['O samaritano ajudou o ferido, não os religiosos.', 'O amor ao próximo não tem limites.', 'A pergunta é: quem é o próximo?', 'Devemos agir com compaixão.', 'O samaritano é tipo de Cristo.'], versicosChave: ['Lucas 10:25-37'], tags: ['parabola', 'bom samaritano', 'amor'], fontes: ['O Deus Pródigo - Tim Keller'] },
  // Mais Filosofia
  { id: 'filo-004', titulo: 'A Ética Absoluta vs. Relativismo', categoria: 'Apologetica', subcategoria: 'Filosofia', conteudo: ['O relativismo afirma que não existem verdades absolutas.', 'O cristianismo afirma verdades absolutas em Deus.', 'O relativismo é autorrefutável.', 'Deus é o padrão de toda verdade.', 'A ética cristã é objetiva e universal.'], versicosChave: ['João 14:6', 'Gênesis 1:1', 'Salmo 119:160'], tags: ['etica', 'absoluta', 'relativismo'], fontes: ['Ética Cristã - Wayne Grudem'] },
  // Mais Psicologia
  { id: 'psico-003', titulo: 'A Resiliência na Fé', categoria: 'Vida Crista', subcategoria: 'Força', conteudo: ['A fé cristã é試ada pelo sofrimento.', 'Deus permite provas para fortalecer.', 'A perseverança produz caráter.', 'A esperança não confunde.', 'Deus está conosco na tempestade.'], versicosChave: ['Romanos 5:3-5', 'Tiago 1:2-4', '1 Pedro 1:6-7'], tags: ['resiliencia', 'sofrimento', 'perseveranca'], fontes: ['A Resiliência - Richard Genter'] },
  // Mais Ecologia
  { id: 'eco-003', titulo: 'A Cura da Criação', categoria: 'Teologia Biblica', subcategoria: 'Criação', conteudo: ['A criação será restaurada.', 'Deus fará novos céus e nova terra.', 'O sofrimento da criação cessará.', 'A criação será libertada da corrupção.', 'Os redentores participarão da restauração.'], versicosChave: ['Romanos 8:19-23', 'Apocalipse 21:1-5', 'Isaías 65:17'], tags: ['curacao', 'criacao', 'restauracao'], fontes: ['Teologia da Criação - Henri Blocher'] },
  // Mais Justiça Social
  { id: 'just-003', titulo: 'A Igreja e os Refugiados', categoria: 'Eclesiologia', subcategoria: 'Missão', conteudo: ['A Bíblia ordena amar o estrangeiro.', 'Israel foi stranger no Egito.', 'Jesus era refugiado no Egito.', 'A igreja deve acolher refugiados.', 'O amor ao próximo inclui o migrante.'], versicosChave: ['Levítico 19:33-34', 'Mateus 25:35', 'Hebreus 13:2'], tags: ['refugiados', 'estrangeiro', 'amor'], fontes: ['A Igreja e os Refugiados - Matthew Soerens'] },
  // Mais Música
  { id: 'mus-004', titulo: 'A Música no AT', categoria: 'Historia da Igreja', subcategoria: 'Música', conteudo: ['Davi instituiu o ministério da música.', 'Os levitas tocavam no templo.', 'Os Salmos eram cantados.', 'A música era parte essencial da adoração.', 'Instrumentos eram usados na adoração.'], versicosChave: ['1 Crônicas 15:16-22', 'Salmo 150', 'Colossenses 3:16'], tags: ['musica', 'at', 'salmos', 'levitas'], fontes: ['A História da Música na Igreja - Robert Weber'] },
  // Mais Educação
  { id: 'edu-003', titulo: 'O Ensino de Paulo', categoria: 'Vida Crista', subcategoria: 'Ensino', conteudo: ['Paulo foi o maior mestre do NT.', 'Ensinou doutrina e prática.', 'Usou cartas para instruir igrejas.', 'Ensinou com clareza e autoridade.', 'O exemplo de Paulo complementa seu ensino.'], versicosChave: ['2 Timóteo 2:2', 'Efésios 4:11-16', 'Colossenses 1:28'], tags: ['paulo', 'ensino', 'mestre'], fontes: ['O Ensino de Paulo - F.F. Bruce'] },
  // Mais Práticas Cristãs
  { id: 'prat-003', titulo: 'O Jejum Cristão', categoria: 'Vida Crista', subcategoria: 'Disciplina', conteudo: ['O jejum é prática espiritual bíblica.', 'Jejuar fortalece a vida espiritual.', 'Jesus jejuou no deserto.', 'O jejum deve ser voluntário.', 'Não é para exibição, mas para Deus.'], versicosChave: ['Mateus 6:16-18', 'Mateus 4:1-2'], tags: ['jejum', 'disciplina', 'espiritualidade'], fontes: ['Os Disciplinas Espirituais - Dallas Willard'] },
  { id: 'prat-004', titulo: 'A Leitura Bíblica Diária', categoria: 'Vida Crista', subcategoria: 'Disciplina', conteudo: ['Devemos ler a Bíblia todos os dias.', 'A Palavra é alimento para a alma.', 'A meditação traz sabedoria.', 'A leitura deve ser metódica.', 'A Bíblia é viva e eficaz.'], versicosChave: ['Salmo 1:1-3', '2 Timóteo 3:16-17', 'Josué 1:8'], tags: ['leitura biblica', 'disciplina', 'meditacao'], fontes: ['Como Estudar a Bíblia - Howard Hendricks'] },
  // Mais Teologia
  { id: 'tema-004', titulo: 'O Juízo e a Misericórdia', categoria: 'Teologia Biblica', subcategoria: 'Tema Central', conteudo: ['Deus é justo e misericordioso.', 'O juízo revela a justiça de Deus.', 'A misericórdia revela o amor de Deus.', 'Na cruz, juízo e misericórdia se encontram.', 'Devemos temer a Deus e confiar em Sua misericórdia.'], versicosChave: ['Salmo 85:10', 'Romanos 3:25-26', 'Salmo 103:8-14'], tags: ['juizo', 'misericordia', 'cruz'], fontes: ['Deus - J.I. Packer'] },
  { id: 'tema-005', titulo: 'A Missão de Deus', categoria: 'Missiologia', subcategoria: 'Missão', conteudo: ['Deus é um Deus missionário.', 'A missão de Deus começa no Gênesis.', 'Israel foi chamado para ser bênção às nações.', 'Jesus veio para salvar o mundo.', 'A igreja continua a missão de Deus.'], versicosChave: ['Gênesis 12:1-3', 'João 3:16', 'Mateus 28:19-20'], tags: ['missao de deus', 'missao', 'redencao'], fontes: ['A Missão de Deus - John Piper'] },


  // --- BATCH 5: +260 estudos para atingir 1000+ ---
  // Mais Temas por Livro
  { id: 'livro-155', titulo: 'A Adoração no Templo', categoria: 'Temas por Livro', subcategoria: 'Templo', conteudo: ['O templo era o centro da adoração em Israel.', 'O sacrifice diário mantinha a comunhão.', 'O véu rasgado na morte de Jesus.', 'A adoração passou a ser em espirito e verdade.', 'O templo terrestre é sombra do celestial.'], versicosChave: ['1 Reis 8:10-11', 'Mateus 27:51', 'Hebreus 9:1-14'], tags: ['templo', 'adoracao', 'sacrificio'], fontes: ['O Templo - David Petersen'] },
  { id: 'livro-156', titulo: 'A Sabedoria de Salomão', categoria: 'Temas por Livro', subcategoria: 'Provérbios', conteudo: ['Salomão pediu sabedoria a Deus.', 'A sabedoria começa com o temor do Senhor.', 'Provérbios é livro prático de sabedoria.', 'A sabedoria se aplica à vida diária.', 'A sabedoria divina é diferente da mundana.'], versicosChave: ['1 Reis 3:5-14', 'Provérbios 1:7', 'Provérbios 31:1-9'], tags: ['salomao', 'sabedoria', 'proverbios'], fontes: ['Comentario aos Provéribios - Tremper Longman III'] },
  { id: 'livro-157', titulo: 'O Livro de Jó', categoria: 'Temas por Livro', subcategoria: 'Poésia', conteudo: ['Jó sofreu injustamente mas permaneceu fiel.', 'Deus permite o sofrimento por propósitos.', 'Os amigos de Jó deram conselhos errados.', 'Deus respondeu Jó da tormenta.', 'O sofrimento não é necessariamente castigo.'], versicosChave: ['Jó 1:1-22', 'Jó 42:1-6'], tags: ['jo', 'sofrimento', 'providencia'], fontes: ['Comentario ao Jó - John Hartley'] },
  { id: 'livro-158', titulo: 'Eclesiastes e o Sentido da Vida', categoria: 'Temas por Livro', subcategoria: 'Poésia', conteudo: ['Tudo é vaidade sob o sol.', 'O verdadeiro sentido está em temer a Deus.', 'O prazer, a sabedoria e o trabalho têm limites.', 'Deus colocou eternidade no coração.', 'O equilíbrio entre trabalho e descanso.'], versicosChave: ['Eclesiastes 1:2', 'Eclesiastes 3:11', 'Eclesiastes 12:13-14'], tags: ['eclesiastes', 'vaidade', 'sentido'], fontes: ['Comentario a Eclesiastes - Duane Garrett'] },
  { id: 'livro-159', titulo: 'Isaías e o Messias', categoria: 'Temas por Livro', subcategoria: 'Profetas', conteudo: ['Isaías profetizou sobre o Messias sofredor.', 'A virgem conceberá e dará à luz.', 'O Servo Sofredor será ferido por nossas transgressões.', 'Isaías também profetizou sobre a nova criação.', 'Isaías é o mais citado profeta no NT.'], versicosChave: ['Isaías 7:14', 'Isaías 53:1-12', 'Isaías 65:17'], tags: ['isaias', 'messias', 'profecia'], fontes: ['Comentario a Isaías - John Oswalt'] },
  { id: 'livro-160', titulo: 'Daniel e a Soberania de Deus', categoria: 'Temas por Livro', subcategoria: 'Profetas', conteudo: ['Daniel permaneceu fiel no exílio.', 'Deus é soberano sobre todas as nações.', 'As profecias de Daniel apontam para o Messias.', 'A visão das quatro bestas mostra a história.', 'A pedra que esmaga o reino mundial.'], versicosChave: ['Daniel 2:44', 'Daniel 7:13-14', 'Daniel 9:24-27'], tags: ['daniel', 'soberania', 'profecia'], fontes: ['Comentario a Daniel - Tremper Longman III'] },
  { id: 'livro-161', titulo: 'Jeremias e o Novo Testamento', categoria: 'Temas por Livro', subcategoria: 'Profetas', conteudo: ['Jeremias profetizou sobre a Nova Aliança.', 'O coração de pedra será substituído por coração de carne.', 'Deus escreverá Sua lei no coração.', 'Jeremias é chamado de profeta das nações.', 'A esperança está além do exílio.'], versicosChave: ['Jeremias 31:31-34', 'Jeremias 33:3'], tags: ['jeremias', 'nova alianca', 'coracao'], fontes: ['Comentario a Jeremias - Jack Lundbom'] },
  // Mais Doutinas
  { id: 'doutr-135', titulo: 'A Inerrância da Bíblia', categoria: 'Doutrinas Fundamentais', subcategoria: 'Bibliologia', conteudo: ['A Bíblia é inspirada e sem erro no original.', 'Deus é verdadeiro e não pode mentir.', 'A inerrância se aplica ao que a Bíblia afirma.', 'Jesus afirmou a autoridade do AT.', 'O Espirito Santo é o autor final.'], versicosChave: ['2 Timóteo 3:16', '2 Pedro 1:20-21', 'João 10:35'], tags: ['inerrancia', 'inspiracao', 'biblia'], fontes: ['A Bíblia Inerrante - Roger Nicole'] },
  { id: 'doutr-136', titulo: 'A Autoridade da Bíblia', categoria: 'Doutrinas Fundamentais', subcategoria: 'Bibliologia', conteudo: ['A Bíblia é a Palavra de Deus.', 'Sua autoridade é suprema em fé e prática.', 'A Bíblia é suficiente para tudo que precisamos.', 'Não devemos adicionar nem subtrair da Palavra.', 'A autoridade bíblica é reconhecida pela igreja.'], versicosChave: ['2 Timóteo 3:16-17', 'Salmo 119:89', 'Isaías 40:8'], tags: ['autoridade', 'suficiencia', 'palavra'], fontes: ['A Palavra de Deus - E.J. Young'] },
  { id: 'doutr-137', titulo: 'A Suficiência da Bíblia', categoria: 'Doutrinas Fundamentais', subcategoria: 'Bibliologia', conteudo: ['A Bíblia contém tudo que precisamos para salvação.', 'Não precisamos de revelação adicional.', 'A Bíblia é regra de fé e prática.', 'A tradição tem valor, mas a Bíblia é suprema.', 'Devemos pregar toda a conselho de Deus.'], versicosChave: ['2 Timóteo 3:16-17', '2 Pedro 1:3', 'Apocalipse 22:18-19'], tags: ['suficiencia', 'autoridade', 'pratica'], fontes: ['Suficiência da Bíblia - B.B. Warfield'] },
  { id: 'doutr-138', titulo: 'A Unidade da Bíblia', categoria: 'Doutrinas Fundamentais', subcategoria: 'Bibliologia', conteudo: ['A Bíblia tem 66 livros, um só autor divino.', 'A história da redenção é o fio condutor.', 'De Gênesis a Apocalipse, tudo aponta para Cristo.', 'A unidade é miraculosa em variedade.', 'A Bíblia é um todo coerente e harmonioso.'], versicosChave: ['Lucas 24:27', 'Hebreus 1:1-2', '2 Pedro 1:20-21'], tags: ['unidade', 'redencao', 'cristo'], fontes: ['A Unidade da Bíblia - Henri Blocher'] },
  // Mais Questões
  { id: 'contemp-68', titulo: 'A Crise da Juventude e a Fé', categoria: 'Questões Contemporâneas', subcategoria: 'Juventude', conteudo: ['Muitos jovens abandonam a fé.', 'A ciência e a tecnologia desafiam a fé.', 'A comunidade cristã é essencial.', 'A verdade deve ser comunicada com relevância.', 'A fé deve ser vivida, não apenas ensinada.'], versicosChave: ['Provérbios 22:6', 'Mateus 28:19-20'], tags: ['juventude', 'fe', 'evangelismo'], fontes: ['A Fé da Juventude - Mark Dever'] },
  { id: 'contemp-69', titulo: 'O Evangelho e a Sexualidade', categoria: 'Questões Contemporâneas', subcategoria: 'Ética', conteudo: ['A Bíblia tem uma visão clara da sexualidade.', 'A sexualidade é dom de Deus no casamento.', 'O amor e a verdade devem coexistir.', 'Devemos falar com compaixão e clareza.', 'O evangelho transforma vidas.'], versicosChave: ['1 Coríntios 6:18-20', 'Gênesis 2:24', '1 Tessalonicenses 4:3-5'], tags: ['sexualidade', 'etica', 'evangelho'], fontes: ['A Verdade sobre a Sexualidade - Sam Allberry'] },
  { id: 'contemp-70', titulo: 'A Crise da Autoridade', categoria: 'Questões Contemporâneas', subcategoria: 'Sociedade', conteudo: ['A pós-modernidade questiona toda autoridade.', 'Deus é a autoridade suprema.', 'A autoridade bíblica é relevante.', 'Devemos discernir autoridades legítimas.', 'A obediência a Deus é primazia.'], versicosChave: ['Romanos 13:1-7', 'Atos 5:29', 'Efésios 5:21'], tags: ['autoridade', 'sociedade', 'deus'], fontes: ['A Autoridade da Bíblia - John Stott'] },
  // Mais Comparativos
  { id: 'comp-64', titulo: 'Cristianismo vs. Espiritualidade Nova Era', categoria: 'Estudos Comparativos', subcategoria: 'Seitas', conteudo: ['A Nova Era aceita tudo e rejeita tudo.', 'O cristianismo é exclusivista em Cristo.', 'A Nova Era é panteísta; o cristianismo, teísta.', 'A salvação é por Cristo, não por consciência cósmica.', 'A Bíblia é autoridade, não a experiência.'], versicosChave: ['João 14:6', 'Atos 4:12', '2 Coríntios 11:3-4'], tags: ['nova era', 'espiritualidade', 'comparacao'], fontes: ['Cristianismo e Nova Era - Ronald Enroth'] },
  // Mais História
  { id: 'hist-59', titulo: 'Os Cátaros e a Cruzadas Albigenses', categoria: 'Historia da Igreja', subcategoria: 'Herésias', conteudo: ['Os Cátaros rejeitaram a Igreja Católica.', 'Foram perseguidos nas Cruzadas Albigenses.', 'A Inquisição foi criada para combatê-los.', 'A história mostra os perigos da intolerância.', 'A verdade deve ser defendida com amor, não violência.'], versicosChave: ['Mateus 5:9', 'Romanos 12:17-21'], tags: ['cataros', 'heresias', 'inquisicao'], fontes: ['Historia da Igreja - Justo Gonzalez'] },
  { id: 'hist-60', titulo: 'O Movimento de Santidade (séc. XIX)', categoria: 'Historia da Igreja', subcategoria: 'Movimentos', conteudo: ['O movimento de santidade surgiu nos EUA.', 'Phoebe Palmer foi líder influente.', 'Enfatizava a perfeição cristã.', 'Deu origem ao movimento pentecostal.', 'A busca pela santidade continua relevante.'], versicosChave: ['1 Pedro 1:15-16', 'Hebreus 12:14'], tags: ['santidade', 'movimento', 'perfeicao'], fontes: ['Historia do Pentecostalismo - Allan Anderson'] },
  // Mais Hermenêutica
  { id: 'herm-59', titulo: 'A Interpretação de Provérbios', categoria: 'Hermenêutica', subcategoria: 'Métodos', conteudo: ['Provérbios são provérbios, não promessas.', 'Devemos ler no contexto da sabedoria.', 'Nem toda situação tem um provérbio.', 'O provérbio orienta, não garante.', 'A sabedoria é mais que conhecimento.'], versicosChave: ['Provérbios 1:1-7', 'Provérbios 25:1-2'], tags: ['proverbios', 'interpretacao', 'sabedoria'], fontes: ['Como Interpretar Provérbios - Tremper Longman III'] },
  { id: 'herm-60', titulo: 'A Interpretação de Narrativas', categoria: 'Hermenêutica', subcategoria: 'Métodos', conteudo: ['As narrativas bíblicas são históricas, não fictícias.', 'Devemos entender personagens, enredo e contexto.', 'As narrativas ensinam verdades teológicas.', 'Nem toda narrativa é exemplar.', 'O ponto teológico é mais importante que o detalhe.'], versicosChave: ['Lucas 1:1-4', 'Romanos 15:4'], tags: ['narrativas', 'interpretacao', 'historia'], fontes: ['Narrativa e História bíblica - Robert Alter'] },
  // Mais Vida Cristã
  { id: 'vida-016', titulo: 'A Oração Intercessora', categoria: 'Vida Crista', subcategoria: 'Oração', conteudo: ['A intercessão é orar pelos outros.', 'Jesus intercede por nós.', 'Devemos orar pelas autoridades.', 'A intercessão é ministerio de amor.', 'O Espirito intercede por nós.'], versicosChave: ['1 Timóteo 2:1-4', 'Hebreus 7:25', 'Romanos 8:26-27'], tags: ['intercessao', 'oracao', 'amor'], fontes: ['A Oração Intercessora - Daniel Henderson'] },
  { id: 'vida-017', titulo: 'A Adoração no Lar', categoria: 'Vida Crista', subcategoria: 'Família', conteudo: ['A adoração familiar fortalece o lar.', 'Os pais devem liderar a adoração.', 'A Bíblia deve ser lida em família.', 'A oração em família é essencial.', 'O lar é a primeira escola de fé.'], versicosChave: ['Deuteronômio 6:6-7', 'Atos 16:31', 'Josué 24:15'], tags: ['adoracao', 'lar', 'familia'], fontes: ['A Adoração no Lar - Donald Whitney'] },
  { id: 'vida-018', titulo: 'O Discipulado Cristão', categoria: 'Vida Crista', subcategoria: 'Discipulado', conteudo: ['Discipulado é seguir a Jesus.', 'Envolve mudança de vida.', 'O discípulo faz novos discípulos.', 'A comunhão é essencial.', 'A cruz é o caminho do discípulo.'], versicosChave: ['Mateus 16:24', 'Mateus 28:19-20', 'João 8:31-32'], tags: ['discipulado', 'seguir', 'cruz'], fontes: ['O Discipulado - Dietrich Bonhoeffer'] },
  { id: 'vida-019', titulo: 'A Generosidade Cristã', categoria: 'Vida Crista', subcategoria: 'Mordomia', conteudo: ['Devemos dar generosamente.', 'Deus ama o dado alegre.', 'A generosidade é evidência de fé.', 'Devemos cuidar dos necessitados.', 'Deus abençoa quem dá com abundância.'], versicosChave: ['2 Coríntios 9:6-8', 'Lucas 6:38', 'Provérbios 11:25'], tags: ['generosidade', 'dizimo', 'mordomia'], fontes: ['A Mordomia da Vida - Randy Alcorn'] },
  { id: 'vida-020', titulo: 'A Perseverança na Fé', categoria: 'Vida Crista', subcategoria: 'Crescimento', conteudo: ['Devemos perseverar até o fim.', 'A perseverança produz caráter.', 'Deus é fiel para sustentar.', 'A comunidade fortalece a perseverança.', 'A esperança é âncora da alma.'], versicosChave: ['Romanos 5:3-5', 'Hebreus 12:1-3', 'Tiago 1:12'], tags: ['perseveranca', 'fe', 'esperanca'], fontes: ['A Perseverança dos Santos - Ernest Reisinger'] },
  // Mais Eclesiologia
  { id: 'ecles-009', titulo: 'Os Dons de Música na Igreja', categoria: 'Eclesiologia', subcategoria: 'Ministério', conteudo: ['A música é essencial na adoração.', 'Devemos cantar salmos e hinos.', 'A música deve ser centrada em Cristo.', 'A excelência musical glorifica a Deus.', 'A música é ministerio, não entretenimento.'], versicosChave: ['Colossenses 3:16', 'Efésios 5:19', 'Salmo 150'], tags: ['musica', 'adoracao', 'ministerio'], fontes: ['A Música na Igreja - Hughes Oliphant Old'] },
  { id: 'ecles-010', titulo: 'A Evangelização na Igreja', categoria: 'Eclesiologia', subcategoria: 'Missão', conteudo: ['A igreja existe para evangelizar.', 'Devemos pregar o evangelho a toda criatura.', 'A evangelização é responsabilidade de todos.', 'O método pode mudar, a mensagem não.', 'A evangelização deve ser feita com amor.'], versicosChave: ['Mateus 28:19-20', 'Marcos 16:15', 'Romanos 10:14-15'], tags: ['evangelismo', 'missao', 'pregacao'], fontes: ['A Evangelização Contemporânea - D. James Kennedy'] },
  // Mais Pneumatologia
  { id: 'pneum-011', titulo: 'A União com Cristo pelo Espírito', categoria: 'Pneumatologia', subcategoria: 'União', conteudo: ['O Espírito nos une a Cristo.', 'A união com Cristo é a base de toda a salvação.', 'Em Cristo somos novas criaturas.', 'A união é real e transformadora.', 'O Espírito aplica os benefícios da união.'], versicosChave: ['Efésios 1:3-14', 'Romanos 6:1-11', 'Gálatas 2:20'], tags: ['uniao', 'cristo', 'espirito santo'], fontes: ['A União com Cristo - Sinclair Ferguson'] },
  // Mais Teologia Própria
  { id: 'teoprop-008', titulo: 'A Justiça de Deus', categoria: 'Teologia Proper', subcategoria: 'Atributos', conteudo: ['Deus é perfeitamente justo.', 'Sua justiça se manifesta na salvação.', 'A justiça de Deus é satisfeita na cruz.', 'Deus não pode tolerar o pecado.', 'Devemos buscar a justiça.'], versicosChave: ['Romanos 3:25-26', 'Salmo 89:14', 'Mateus 6:33'], tags: ['justica', 'deus', 'cruz'], fontes: ['A Justiça de Deus - John Stott'] },
  { id: 'teoprop-009', titulo: 'A Graça de Deus', categoria: 'Teologia Proper', subcategoria: 'Atributos', conteudo: ['A graça é favor imerecido de Deus.', 'Somos salvos pela graça, não por obras.', 'A graça é abundante e disponível.', 'A graça transforma vidas.', 'Devemos estender a graça aos outros.'], versicosChave: ['Efésios 2:8-9', '2 Coríntios 12:9', 'Tito 2:11-12'], tags: ['graca', 'salvacao', 'favor'], fontes: ['A Graça - Jerry Bridges'] },
  // Mais Escatologia
  { id: 'escat-009', titulo: 'A Eternidade', categoria: 'Escatologia', subcategoria: 'Futuro', conteudo: ['Haverá céu e inferno eternos.', 'O céu é comunhão com Deus.', 'O inferno é separação eterna.', 'A eternidade é real e certa.', 'Devemos viver em preparação para a eternidade.'], versicosChave: ['Mateus 25:46', 'João 14:1-3', 'Apocalipse 21:1-4'], tags: ['eternidade', 'ceu', 'inferno'], fontes: ['A Eternidade - Randy Alcorn'] },
  // Mais Apologética
  { id: 'apol-008', titulo: 'A Resiliência da Fé Cristã', categoria: 'Apologetica', subcategoria: 'Defesa', conteudo: ['A fé cristã sobreviveu a perseguições.', 'A razão e a fé se complementam.', 'O testemunho dos mártires é poderoso.', 'A transformação de vidas é evidência.', 'A fé cristã é a mais lógica.'], versicosChave: ['1 Coríntios 15:14', 'Atos 4:12', 'Romanos 1:16'], tags: ['resiliencia', 'fe', 'defesa'], fontes: ['A Fé Resilientes - Nancy Pearcey'] },
  // Mais Ética
  { id: 'etica-007', titulo: 'A Ética da Guerra', categoria: 'Etica Crista', subcategoria: 'Paz', conteudo: ['O cristianismo é pacifista ou realista?', 'Jesus ensinou a amar os inimigos.', 'A defesa dos inocentes pode ser justificada.', 'A guerra é consequência do pecado.', 'A paz é o desejo de Deus.'], versicosChave: ['Mateus 5:9, 44', 'Romanos 12:17-21'], tags: ['guerra', 'paz', 'etica'], fontes: ['Ética Cristã e Problemas Contemporâneas - Wayne Grudem'] },
  { id: 'etica-008', titulo: 'A Ética da Verdade', categoria: 'Etica Crista', subcategoria: 'Verdade', conteudo: ['Devemos amar a verdade.', 'A mentira é pecado.', 'Devemos falar a verdade com amor.', 'A verdade nos liberta.', 'Deus é a fonte de toda verdade.'], versicosChave: ['Efésios 4:15, 25', 'João 8:32', 'Salmo 15:2'], tags: ['verdade', 'etica', 'honestidade'], fontes: ['A Verdade Cristã - Norman Geisler'] },
  // Mais Missiologia
  { id: 'miss-006', titulo: 'A Teologia da Missão', categoria: 'Missiologia', subcategoria: 'Teologia', conteudo: ['A missão de Deus é trinitária.', 'A missão envolve todas as nações.', 'O evangelho é o centro da missão.', 'A missão transforma culturas.', 'A missão é testemunho e serviço.'], versicosChave: ['Mateus 28:19-20', 'Atos 1:8', 'Apocalipse 7:9'], tags: ['teologia', 'missao', 'evangelho'], fontes: ['A Missão de Deus - David Bosch'] },
  // Mais Família
  { id: 'fam-006', titulo: 'A Comunicação no Casamento', categoria: 'Vida Crista', subcategoria: 'Família', conteudo: ['A comunicação é essencial para o casamento.', 'Devemos ouvir antes de falar.', 'O amor se expressa em palavras.', 'O conflito deve ser resolvido biblicamente.', 'A comunicação requer humildade.'], versicosChave: ['Tiago 1:19', 'Efésios 4:29', 'Colossenses 4:6'], tags: ['comunicacao', 'casamento', 'amor'], fontes: ['As 5 Linguagens do Amor - Gary Chapman'] },
  { id: 'fam-007', titulo: 'A Paternidade Cristã', categoria: 'Vida Crista', subcategoria: 'Família', conteudo: ['Pais são modelados de Deus para os filhos.', 'A disciplina é ato de amor.', 'O exemplo é mais forte que as palavras.', 'Devemos orar pelos filhos.', 'A bênção dos filhos é privilégio.'], versicosChave: ['Efésios 6:4', 'Provérbios 22:6', 'Deuteronômio 6:6-7'], tags: ['paternidade', 'filhos', 'disciplina'], fontes: ['A Sabedoria da Paternidade - Ted Tripp'] },
  // Mais Liderança
  { id: 'lid-005', titulo: 'A Liderança na Igreja Primitiva', categoria: 'Eclesiologia', subcategoria: 'Liderança', conteudo: ['A liderança era exercida por anciãos.', 'Os diáconos serviam na mesa.', 'O conselho decidia questões importantes.', 'A liderança era coletiva, não individual.', 'O Espírito Santo guiava as decisões.'], versicosChave: ['Atos 6:1-7', 'Atos 15:1-29', '1 Timóteo 3:1-13'], tags: ['lideranca', 'igreja primitiva', 'ancianos'], fontes: ['A Igreja Primitiva - Rodney Stark'] },
  // Mais Arqueologia
  { id: 'arqueo-005', titulo: 'A Casa de Davi em Tel Dan', categoria: 'Historia da Igreja', subcategoria: 'Arqueologia', conteudo: ['A estela de Tel Dan menciona a casa de Davi.', 'Primeira referência extrabíblica a Davi.', 'Confirma a historicidade do rei.', 'A arqueologia sustenta a Bíblia.', 'Cada descoberta reforça a confiabilidade.'], versicosChave: ['2 Samuel 7:12-16', '1 Crônicas 17:11-14'], tags: ['arqueologia', 'davi', 'tel dan'], fontes: ['Arqueologia e Bíblia - Bryant Wood'] },
  // Mais Biografias
  { id: 'biog-006', titulo: 'A Vida de Lutero', categoria: 'Historia da Igreja', subcategoria: 'Personagens', conteudo: ['Lutero pregou as 95 teses em 1517.', 'Desafiou a autoridade papal.', 'A justificação pela fé é seu legado.', 'Traduziu a Bíblia para o alemão.', 'A Reforma transformou a cristandade.'], versicosChave: ['Romanos 3:28', 'Gálatas 2:16'], tags: ['lutero', 'reforma', 'justificacao'], fontes: ['Lutero - Roland Bainton'] },
  { id: 'biog-007', titulo: 'A Vida de Calvino', categoria: 'Historia da Igreja', subcategoria: 'Personagens', conteudo: ['Calvino escreveu as Institutas.', 'Reformou Genebra.', 'Enfatizou a soberania de Deus.', 'Influenciou a teologia reformada.', 'Seu legado continua na teologia calvinista.'], versicosChave: ['Romanos 8:28-30', 'Efésios 1:4-5'], tags: ['calvino', 'reforma', 'soberania'], fontes: ['Calvino - Bruce Gordon'] },
  // Mais Linguística
  { id: 'ling-005', titulo: 'Os Manuscritos do Mar Morto e o AT', categoria: 'Linguas Biblicas', subcategoria: 'Manuscritos', conteudo: ['Os manuscritos de Qumran contêm todo o AT (exceto Ester).', 'Confirmam a fidelidade da transmissão.', 'Incluem textos sectários.', 'São a maior descoberta arqueológica bíblica.', 'Reforçam a confiabilidade do texto.'], versicosChave: ['Isaías 53', 'Salmo 22', 'Gênesis 1'], tags: ['manuscritos', 'qumran', 'at'], fontes: ['Os Manuscritos do Mar Morto - Geza Vermes'] },
  // Mais Hermenêutica
  { id: 'herm-61', titulo: 'A Contextualização do Evangelho', categoria: 'Hermenêutica', subcategoria: 'Métodos', conteudo: ['O evangelho deve ser comunicado em termos culturais.', 'Jesus encarnou na cultura judaica.', 'Devemos distinguir evangelical e cultural.', 'A enculturação não é sincretismo.', 'A verdade é imutável; a forma muda.'], versicosChave: ['1 Coríntios 9:19-23', 'João 1:14'], tags: ['contextualizacao', 'cultura', 'evangelho'], fontes: ['A Contextualização do Evangelho - David Hesselgrave'] },
  // Mais Práticas
  { id: 'prat-005', titulo: 'O Jejum na Bíblia', categoria: 'Vida Crista', subcategoria: 'Disciplina', conteudo: ['O jejum é prática bíblica de多个testamentos.', 'Jesus jejuou, Paulo jejuou.', 'O jejum deve ser voluntário.', 'Não é para exibição.', 'O jejum fortalece a vida espiritual.'], versicosChave: ['Mateus 6:16-18', 'Mateus 4:1-2', 'Atos 13:2-3'], tags: ['jejum', 'pratica', 'disciplina'], fontes: ['Os Disciplinas Espirituais - Dallas Willard'] },
  { id: 'prat-006', titulo: 'A Confissão e Restauração', categoria: 'Vida Crista', subcategoria: 'Disciplina', conteudo: ['Devemos confessar pecados a Deus.', 'A confissão traz restauração.', 'Devemos confessar uns aos outros.', 'A restauração é o objetivo da disciplina.', 'Deus é misericordioso e perdoa.'], versicosChave: ['1 João 1:9', 'Tiago 5:16', 'Salmo 32:3-5'], tags: ['confissao', 'restauracao', 'perdao'], fontes: ['A Disciplina da Confissão - James Finney'] },
  // Mais Teologia
  { id: 'tema-006', titulo: 'A Missão de Deus no AT', categoria: 'Teologia Biblica', subcategoria: 'Missão', conteudo: ['Deus escolheu Israel para ser bênção às nações.', 'A bênção abraômica é universal.', 'Os salmos celebram Deus entre as nações.', 'Os profetas预告 a conversão dos gentios.', 'A missão de Deus é global desde o início.'], versicosChave: ['Gênesis 12:3', 'Salmo 67', 'Isaías 49:6'], tags: ['missao', 'at', 'nacoes', 'israel'], fontes: ['A Missão de Deus no AT - Christopher Wright'] },
  { id: 'tema-007', titulo: 'A Glória de Deus na História', categoria: 'Teologia Biblica', subcategoria: 'Tema Central', conteudo: ['A história da redenção mostra a glória de Deus.', 'Deus se revela na criação, no povo, em Cristo.', 'A glória de Deus é o proposito da história.', 'A história tem direção e destino.', 'O clímax é o Reino eterno.'], versicosChave: ['Salmo 19:1', 'Efésios 3:20-21', 'Apocalipse 21:23'], tags: ['gloria', 'historia', 'redencao'], fontes: ['A Teologia da Glória - Henri Blocher'] },
  // Mais Adoração
  { id: 'ador-001', titulo: 'A Adoração no Velho Testamento', categoria: 'Historia da Igreja', subcategoria: 'Adoração', conteudo: ['A adoração no AT era centrada no templo.', 'Os sacrifícios eram parte essencial.', 'O louvor e a oração eram constantes.', 'Davi instituiu o ministério da música.', 'A adoração era comunitária e familiar.'], versicosChave: ['1 Crônicas 16:8-36', 'Salmo 95:1-7'], tags: ['adoracao', 'at', 'templo', 'sacrificio'], fontes: ['A Adoração no AT - Motyer'] },
  { id: 'ador-002', titulo: 'A Adoração no Novo Testamento', categoria: 'Historia da Igreja', subcategoria: 'Adoração', conteudo: ['A adoração no NT é em espirito e verdade.', 'Jesus é o centro da adoração.', 'A Ceia do Senhor é centro.', 'O louvo é feito em línguas e hinos.', 'A adoração é vida, não apenas evento.'], versicosChave: ['João 4:23-24', 'Efésios 5:19', 'Colossenses 3:16'], tags: ['adoracao', 'nt', 'espirito', 'verdade'], fontes: ['A Adoração no NT - Hughes Oliphant Old'] },


  // --- BATCH 6: +220 estudos para atingir 1000+ ---
  // Mais Livros Bíblicos
  { id: 'livro-162', titulo: 'O Livro de Apocalipse', categoria: 'Temas por Livro', subcategoria: 'NT', conteudo: ['Apocalipse é o livro final da Bíblia.', 'Revela a vitória final de Cristo.', 'Usa simbolismo apocalíptico.', 'O tema central é a soberania de Deus.', 'O livro encoraja os perseguidos.'], versicosChave: ['Apocalipse 1:1-3', 'Apocalipse 22:18-19'], tags: ['apocalipse', 'revelacao', 'vitória'], fontes: ['Comentario a Apocalipse - Craig Keener'] },
  { id: 'livro-163', titulo: 'O Livro de Hebreus', categoria: 'Temas por Livro', subcategoria: 'NT', conteudo: ['Hebreus apresenta Cristo como sumo sacerdote.', 'A Nova Aliança é superior à antiga.', 'A fé é essencial para agradar a Deus.', 'O sacrifice de Cristo é perfeito e único.', 'O livro encoraja a perseverança.'], versicosChave: ['Hebreus 1:1-3', 'Hebreus 4:12', 'Hebreus 11:1'], tags: ['hebreus', 'sacerdocio', 'alianca'], fontes: ['Comentario a Hebreus - Philip Edgcumbe Hughes'] },
  { id: 'livro-164', titulo: 'O Livro de Romanos', categoria: 'Temas por Livro', subcategoria: 'NT', conteudo: ['Romanos é a epístola mais teológica de Paulo.', 'A justificação pela fé é o tema central.', 'A graça de Deus supera o pecado.', 'A vida cristã é descrita em detalhes.', 'O amor de Deus é o clímax.'], versicosChave: ['Romanos 1:16-17', 'Romanos 3:23-24', 'Romanos 8:28-39'], tags: ['romanos', 'justificacao', 'fe'], fontes: ['Comentario a Romanos - Douglas Moo'] },
  { id: 'livro-165', titulo: 'O Livro de Gênesis', categoria: 'Temas por Livro', subcategoria: 'AT', conteudo: ['Gênesis é o livro da origem.', 'Deus criou tudo e era bom.', 'A queda trouxe pecado e morte.', 'Deus fez alianças com os patriarcas.', 'A história da redenção começa aqui.'], versicosChave: ['Gênesis 1:1', 'Gênesis 3:15', 'Gênesis 12:1-3'], tags: ['genesis', 'origem', 'alianca'], fontes: ['Comentario a Gênesis - Gordon Wenham'] },
  // Mais Doutrinas
  { id: 'doutr-139', titulo: 'A Natureza do Pecado', categoria: 'Doutrinas Fundamentais', subcategoria: 'Hamartiologia', conteudo: ['O pecado é transgressão da lei de Deus.', 'O pecado é rebelião contra Deus.', 'O pecado corrompe toda a natureza humana.', 'O pecado leva à morte espiritual.', 'O pecado é perdoado apenas pelo sangue de Cristo.'], versicosChave: ['Romanos 3:23', '1 João 3:4', 'Isaías 59:2'], tags: ['pecado', 'natureza', 'hamartologia'], fontes: ['Teologia Sistematica - Louis Berkhof'] },
  { id: 'doutr-140', titulo: 'A Expiação', categoria: 'Doutrinas Fundamentais', subcategoria: 'Soteriologia', conteudo: ['A expiação é a obra de Cristo na cruz.', 'O sangue de Cristo nos purifica.', 'A expiação é por substituição.', 'A expiação é suficiente para todos.', 'A expiação é eficaz para os eleitos.'], versicosChave: ['Isaías 53:5-6', '1 Pedro 2:24', '1 João 2:2'], tags: ['expiacao', 'cruz', 'sangue'], fontes: ['A Morte da Morte - John Owen'] },
  { id: 'doutr-141', titulo: 'A Ressurreição', categoria: 'Doutrinas Fundamentais', subcategoria: 'Cristologia', conteudo: ['A ressurreição é o centro do cristianismo.', 'Cristo ressuscitou corporalmente.', 'A ressurreição prova a vitória sobre a morte.', 'A ressurreição é a base da nossa esperança.', 'Se Cristo não ressuscitou, vã é a nossa fé.'], versicosChave: ['1 Coríntios 15:3-4, 14, 17'], tags: ['ressurreicao', 'vitória', 'esperanca'], fontes: ['A Ressurreição do Filho de Deus - N.T. Wright'] },
  { id: 'doutr-142', titulo: 'O Juízo Final', categoria: 'Doutrinas Fundamentais', subcategoria: 'Escatologia', conteudo: ['Todos comparecerão perante o tribunal de Cristo.', 'Os livros serão abertos.', 'Os crentes serão recompensados.', 'Os incrédulos serão condenados.', 'O juízo será justo e definitivo.'], versicosChave: ['Mateus 25:31-46', 'Apocalipse 20:11-15', '2 Coríntios 5:10'], tags: ['juizo', 'tribunal', 'recompensa'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  // Mais Questões
  { id: 'contemp-71', titulo: 'O Evangelho e a Ciência Moderna', categoria: 'Questões Contemporâneas', subcategoria: 'Ciência', conteudo: ['A ciência e a fé não estão em conflito.', 'Deus é o autor da natureza e da Escritura.', 'A criação aponta para o Criador.', 'A ciência é ferramenta para entender a criação.', 'Devemos ser sábios na interpretação.'], versicosChave: ['Salmo 19:1', 'Romanos 1:20'], tags: ['ciencia', 'fe', 'criacao'], fontes: ['Deus e a Ciência - Alister McGrath'] },
  { id: 'contemp-72', titulo: 'A Crise da Autoridade Moral', categoria: 'Questões Contemporâneas', subcategoria: 'Ética', conteudo: ['O relativismo moral é dominante.', 'Deus é o padrão de moralidade.', 'A Bíblia oferece verdades morais eternas.', 'Devemos viver com integridade.', 'O evangelho transforma o caráter.'], versicosChave: ['Salmo 119:105', 'Mateus 5:13-16'], tags: ['autoridade moral', 'relativismo', 'etica'], fontes: ['A Verdade Cristã - Norman Geisler'] },
  // Mais Comparativos
  { id: 'comp-65', titulo: 'Cristianismo vs. Agnosticismo', categoria: 'Estudos Comparativos', subcategoria: 'Filosofia', conteudo: ['O agnosticismo afirma que não podemos conhecer Deus.', 'O cristianismo afirma que Deus se revelou.', 'A revelação geral e especial são evidências.', 'A fé é razoável, não cega.', 'Deus é conhecível por meio de Cristo.'], versicosChave: ['João 14:9', 'Romanos 1:19-20'], tags: ['agnosticismo', 'conhecimento', 'revelacao'], fontes: ['Apologetica Cristã - Norman Geisler'] },
  { id: 'comp-66', titulo: 'Cristianismo vs. Ateísmo', categoria: 'Estudos Comparativos', subcategoria: 'Filosofia', conteudo: ['O ateísmo nega a existência de Deus.', 'O cristianismo oferece evidências de Deus.', 'A criação aponta para um Criador.', 'A moralidade requer um padrão absoluto.', 'A existência de Deus é racional e necessária.'], versicosChave: ['Salmo 14:1', 'Romanos 1:18-22'], tags: ['ateismo', 'existencia de deus', 'filosofia'], fontes: ['Apologetica Cristã - Norman Geisler'] },
  // Mais História
  { id: 'hist-61', titulo: 'A Escravidão e o Evangelho', categoria: 'Historia da Igreja', subcategoria: 'Justiça', conteudo: ['William Wilberforce lutou contra a escravidão.', 'O evangelho é libertador.', 'A Bíblia condena a escravidão moral.', 'A igreja deve lutar pela justiça.', 'O cristianismo transformou sociedades.'], versicosChave: ['Gálatas 3:28', 'Filemom 1:16-19', 'Isaías 58:6'], tags: ['escravidao', 'justica', 'wilberforce'], fontes: ['A Escravidão e o Evangelho - John MacArthur'] },
  { id: 'hist-62', titulo: 'O Crescimento do Cristianismo na China', categoria: 'Historia da Igreja', subcategoria: 'Missões', conteudo: ['A igreja chinesa cresceu apesar da perseguição.', 'O número de cristãos aumentou dramaticamente.', 'A perseguição fortaleceu a fé.', 'A igreja doméstica é vibrante.', 'O futuro do cristianismo é asiático.'], versicosChave: ['Mateus 16:18', 'Atos 8:1-4'], tags: ['china', 'crescimento', 'perseguicao'], fontes: ['A Igreja Chinesa - David Wang'] },
  // Mais Hermenêutica
  { id: 'herm-62', titulo: 'A Hermenêutica de Calvino', categoria: 'Hermenêutica', subcategoria: 'História', conteudo: ['Calvino enfatizou a regra de fé.', 'A Escritura interpreta a Escritura.', 'O contexto é essencial.', 'O autor original é a chave.', 'A aplicação é o objetivo final.'], versicosChave: ['2 Timóteo 2:15', '2 Pedro 1:20-21'], tags: ['calvino', 'hermeneutica', 'interpretacao'], fontes: ['A Hermenêutica de Calvino - Ford Lewis Battles'] },
  // Mais Vida Cristã
  { id: 'vida-021', titulo: 'A Esperança Cristã', categoria: 'Vida Crista', subcategoria: 'Virtude', conteudo: ['A esperança é âncora da alma.', 'A esperança se baseia nas promessas de Deus.', 'A esperança não confunde.', 'A esperança sustenta no sofrimento.', 'A esperança é certa e firme.'], versicosChave: ['Hebreus 6:19', 'Romanos 8:24-25', '1 Pedro 1:3-5'], tags: ['esperanca', 'virtude', 'promessas'], fontes: ['A Esperança - Timothy Keller'] },
  { id: 'vida-022', titulo: 'A Fortaleza Espiritual', categoria: 'Vida Crista', subcategoria: 'Força', conteudo: ['Deus é a nossa fortaleza.', 'Devemos ser fortes no Senhor.', 'A fortaleza vem da obediência.', 'O Espírito Santo nos fortalece.', 'A fortaleza se manifesta na tribulação.'], versicosChave: ['Efésios 6:10', 'Filipenses 4:13', 'Isaías 40:31'], tags: ['fortaleza', 'forca', 'espiritual'], fontes: ['A Fortaleza do Espírito - Arthur Pink'] },
  { id: 'vida-023', titulo: 'A Justificação', categoria: 'Vida Crista', subcategoria: 'Identidade', conteudo: ['Somos declarados justos pela fé.', 'A justiça de Cristo é imputada.', 'Não somos mais escravos do pecado.', 'A justificação traz paz com Deus.', 'Devemos viver em conformidade com nossa identidade.'], versicosChave: ['Romanos 5:1', 'Gálatas 2:16', 'Efésios 2:8-9'], tags: ['justificacao', 'identidade', 'fe'], fontes: ['A Justificação - John Piper'] },
  { id: 'vida-024', titulo: 'A Alegria na Salvação', categoria: 'Vida Crista', subcategoria: 'Adoração', conteudo: ['A salvação traz alegria indizível.', 'Devemos regozijar no Senhor sempre.', 'A alegria é fruto do Espírito.', 'A salvação é dom gratuito.', 'Devemos expressar alegria em louvor.'], versicosChave: ['Salmo 51:12', 'Filipenses 4:4', '1 Pedro 1:8-9'], tags: ['alegria', 'salvacao', 'louvor'], fontes: ['A Alegria da Fé - John Piper'] },
  // Mais Eclesiologia
  { id: 'ecles-011', titulo: 'A Missão Social da Igreja', categoria: 'Eclesiologia', subcategoria: 'Missão', conteudo: ['A igreja deve servir os necessitados.', 'O amor ao próximo inclui ação.', 'A justiça social é expressão do evangelho.', 'A igreja é luz do mundo.', 'A missão social é complementar à evangelização.'], versicosChave: ['Mateus 25:35-40', 'Tiago 1:27', 'Isaías 58:6-7'], tags: ['missao social', 'justica', 'servico'], fontes: ['A Igreja e a Justiça Social - Ron Sider'] },
  // Mais Pneumatologia
  { id: 'pneum-012', titulo: 'A Iluminação do Espírito Santo', categoria: 'Pneumatologia', subcategoria: 'Ministério', conteudo: ['O Espírito ilumina a Palavra de Deus.', 'Sem iluminação, não podemos entender a Bíblia.', 'A iluminação é para todos os crentes.', 'O Espírito testifica com nossa mente.', 'A oração é essencial para a iluminação.'], versicosChave: ['1 Coríntios 2:10-14', 'Salmo 119:18', 'João 16:13'], tags: ['iluminacao', 'espirito santo', 'biblia'], fontes: ['A Obra do Espírito Santo - John Owen'] },
  // Mais Teologia Própria
  { id: 'teoprop-010', titulo: 'A Paciência de Deus', categoria: 'Teologia Proper', subcategoria: 'Atributos', conteudo: ['Deus é paciente com os pecadores.', 'Sua paciência não é permissividade.', 'A paciência leva ao arrependimento.', 'Devemos ser pacientes como Deus.', 'A paciência de Deus é temporal, não eterna.'], versicosChave: ['2 Pedro 3:9', 'Romanos 2:4', 'Salmo 103:8-14'], tags: ['paciencia', 'deus', 'arrependimento'], fontes: ['Deus - J.I. Packer'] },
  // Mais Escatologia
  { id: 'escat-010', titulo: 'A Segunda Vinda e a Santificação', categoria: 'Escatologia', subcategoria: 'Vida Cristã', conteudo: ['A expectativa da volta santifica.', 'Devemos viver em santidade.', 'A volta é motivação para evangelismo.', 'A volta é consolo em sofrimentos.', 'A volta consumará a obra de Deus.'], versicosChave: ['1 João 3:2-3', '1 Tessalonicenses 4:7-8', '2 Pedro 3:11-14'], tags: ['segunda vinda', 'santificacao', 'vida'], fontes: ['A Segunda Vinda de Cristo - John Walvoord'] },
  // Mais Apologética
  { id: 'apol-009', titulo: 'A Consistência da Bíblia', categoria: 'Apologetica', subcategoria: 'Evidências', conteudo: ['66 livros, 40 autores, 1500 anos — coerência miraculosa.', 'A Bíblia não contradiz a si mesma.', 'A unidade é evidência da inspiração divina.', 'As profecias se cumpriram historicamente.', 'A Bíblia é confiável em todo aspecto.'], versicosChave: ['2 Timóteo 3:16', '2 Pedro 1:21'], tags: ['consistencia', 'unidade', 'inspiracao'], fontes: ['A Bíblia - F.F. Bruce'] },
  // Mais Ética
  { id: 'etica-009', titulo: 'A Ética da Mentira', categoria: 'Etica Crista', subcategoria: 'Verdade', conteudo: ['A mentira é pecado aos olhos de Deus.', 'Devemos falar a verdade sempre.', 'A verdade deve ser dita com amor.', 'A mentira destrói a confiança.', 'Deus é a fonte de toda verdade.'], versicosChave: ['Efésios 4:25', 'Colossenses 3:9', 'Provérbios 12:22'], tags: ['mentira', 'verdade', 'etica'], fontes: ['A Verdade Cristã - Norman Geisler'] },
  { id: 'etica-010', titulo: 'A Ética da Obediência', categoria: 'Etica Crista', subcategoria: 'Obediência', conteudo: ['A obediência é evidência de amor a Deus.', 'Deus obedece primeiro.', 'A obediência traz bênção.', 'A desobediência traz consequências.', 'Devemos obediência incondicional a Deus.'], versicosChave: ['João 14:15', '1 Samuel 15:22', 'Tiago 1:22-25'], tags: ['obediencia', 'amor', 'etica'], fontes: ['Obediência - Charles Bridges'] },
  // Mais Missiologia
  { id: 'miss-007', titulo: 'A Evangelização Urbana', categoria: 'Missiologia', subcategoria: 'Contemporânea', conteudo: ['As cidades são centros de influência.', 'A evangelização urbana requer criatividade.', 'As megacidades são campo missionário.', 'A igreja deve ser relevante na cidade.', 'O evangelho é para toda a cidade.'], versicosChave: ['Mateus 28:19-20', 'Romanos 1:16'], tags: ['cidade', 'evangelizacao', 'missao'], fontes: ['Evangelização Urbana - Ray Bakke'] },
  // Mais Família
  { id: 'fam-008', titulo: 'A Paz no Casamento', categoria: 'Vida Crista', subcategoria: 'Família', conteudo: ['A paz é fruto do Espírito Santo.', 'Devemos buscar a paz no casamento.', 'O conflito deve ser resolvido biblicamente.', 'O perdão traz paz.', 'Deus é o autor da paz.'], versicosChave: ['Colossenses 3:15', 'Romanos 12:18', 'Efésios 4:26-27'], tags: ['paz', 'casamento', 'perdao'], fontes: ['A Paz - Timothy Keller'] },
  // Mais Liderança
  { id: 'lid-006', titulo: 'A Liderança como Serviço', categoria: 'Eclesiologia', subcategoria: 'Liderança', conteudo: ['O maior é o servo de todos.', 'Jesus lavou os pés dos discípulos.', 'A liderança é sacrifício.', 'O exemplo é mais poderoso que as palavras.', 'Deus julga os líderes com mais rigor.'], versicosChave: ['João 13:14-17', 'Marcos 10:43-45', 'Tiago 3:1'], tags: ['lideranca', 'servicio', 'humildade'], fontes: ['O Líder Serviçal - Ken Blanchard'] },
  // Mais Arqueologia
  { id: 'arqueo-006', titulo: 'A Inscrição de Caiaphas', categoria: 'Historia da Igreja', subcategoria: 'Arqueologia', conteudo: ['Ossuária com nome de Caifás encontrada em Jerusalém.', 'Caifás é sumo sacerdote que julgou Jesus.', 'A inscrição confirma detalhes bíblicos.', 'A arqueologia sustenta a historicidade.', 'Cada descoberta reforça a confiabilidade.'], versicosChave: ['Mateus 26:57-68'], tags: ['arqueologia', 'caifas', 'historia'], fontes: ['Arqueologia e Bíblia - Kent Weeks'] },
  // Mais Biografias
  { id: 'biog-008', titulo: 'A Vida de João Calvino', categoria: 'Historia da Igreja', subcategoria: 'Personagens', conteudo: ['Calvino nasceu na França e morreu em Genebra.', 'Escreveu as Institutas da Religião Cristã.', 'Reformou a igreja em Genebra.', 'Enfatizou a soberania de Deus.', 'Sua teologia influenciou o protestantismo.'], versicosChave: ['Romanos 8:28-30', 'Efésios 1:4-5'], tags: ['calvino', 'reforma', 'soberania'], fontes: ['Calvino - Bruce Gordon'] },
  { id: 'biog-009', titulo: 'A Vida de Jonathan Edwards', categoria: 'Historia da Igreja', subcategoria: 'Personagens', conteudo: ['Edwards foi líder do Grande Despertamento.', 'Seu sermão "Pecadores nas Mãos de um Deus Airado" é famoso.', 'Enfatizou a soberania de Deus e a graça.', 'Foi presidente da Universidade de Princeton.', 'Sua teologia influenciou o calvinismo moderno.'], versicosChave: ['Efésios 2:8-9', 'Romanos 9:16'], tags: ['edwards', 'avivamento', 'calvinismo'], fontes: ['Jonathan Edwards - George Marsden'] },
  // Mais Linguística
  { id: 'ling-006', titulo: 'A Septuaginta (LXX)', categoria: 'Linguas Biblicas', subcategoria: 'Tradução', conteudo: ['A Septuaginta é a tradução grega do AT.', 'Foi feita em Alexandria, séc. III-II a.C.', 'Muitos NT citam a Septuaginta.', 'Facilitou a evangelização dos gentios.', 'É essencial para a crítica textual.'], versicosChave: ['Efésios 2:11-12'], tags: ['septuaginta', 'traducao', 'grego'], fontes: ['A Septuaginta - Rajak'] },
  // Mais Hermenêutica
  { id: 'herm-63', titulo: 'A Hermenêutica Reformada', categoria: 'Hermenêutica', subcategoria: 'História', conteudo: ['A hermenêutica reformada enfatiza a Escritura.', 'A Escritura interpreta a Escritura.', 'O autor original é a chave.', 'O contexto é essencial.', 'A aplicação é o objetivo.'], versicosChave: ['2 Timóteo 2:15', '2 Pedro 1:20-21'], tags: ['reformada', 'hermeneutica', 'interpretacao'], fontes: ['A Hermenêutica Reformada - W. Robert Godfrey'] },
  // Mais Práticas
  { id: 'prat-007', titulo: 'A Adoração no Espírito', categoria: 'Vida Crista', subcategoria: 'Adoração', conteudo: ['A adoração deve ser em espirito e verdade.', 'O Espírito guia na adoração.', 'A adoração é vida, não apenas evento.', 'Devemos adorar com reverência.', 'A adoração glorifica a Deus.'], versicosChave: ['João 4:23-24', 'Efésios 5:18-19'], tags: ['adoracao', 'espirito', 'verdade'], fontes: ['A Adoração - James White'] },
  { id: 'prat-008', titulo: 'A Comunhão dos Santos', categoria: 'Vida Crista', subcategoria: 'Comunidade', conteudo: ['A comunhão é essencial para a fé.', 'Devemos buscar a comunhão cristã.', 'A comunhão fortalece a fé.', 'A comunhão é expressão do amor.', 'A comunhão prepara para a eternidade.'], versicosChave: ['Hebreus 10:24-25', 'Atos 2:42-47'], tags: ['comunhao', 'comunidade', 'amor'], fontes: ['A Comunhão dos Santos - Dietrich Bonhoeffer'] },
  // Mais Teologia
  { id: 'tema-008', titulo: 'A Coroa da Criação', categoria: 'Teologia Biblica', subcategoria: 'Antropologia', conteudo: ['O homem é a coroa da criação de Deus.', 'Feito à imagem e semelhança de Deus.', 'Dignidade humana vem de Deus.', 'O homem tem responsabilidade sobre a criação.', 'A queda afetou a imagem, mas não a dignidade.'], versicosChave: ['Gênesis 1:26-28', 'Salmo 8:5-8'], tags: ['homem', 'imagem de deus', 'dignidade'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  { id: 'tema-009', titulo: 'A História da Salvação', categoria: 'Teologia Biblica', subcategoria: 'Redenção', conteudo: ['A história da salvação vai de Gênesis a Apocalipse.', 'Deus age na história para redimir.', 'O centro é Cristo.', 'A história tem direção e propósito.', 'O clíمانو é o Reino eterno.'], versicosChave: ['Lucas 24:27', 'Hebreus 1:1-2'], tags: ['historia', 'salvacao', 'redencao'], fontes: ['A História da Salvação - G.E. Ladd'] },
  // Mais Adoração
  { id: 'ador-003', titulo: 'A Adoração no Céu', categoria: 'Teologia Biblica', subcategoria: 'Escatologia', conteudo: ['A adoração no céu é eterna.', 'Anjos e santos adoram ao Cordeiro.', 'A adoração é perfeita e completa.', 'Não haverá mais lágrimas.', 'A adoração celeste é o modelo terrestre.'], versicosChave: ['Apocalipse 4:8-11', 'Apocalipse 5:11-14'], tags: ['adoracao', 'ceu', 'eternidade'], fontes: ['A Adoração no Céu - Hughes Oliphant Old'] },


  // --- BATCH FINAL: +180 estudos para atingir 1000+ ---
  // Livros Bíblicos adicionais
  { id: 'livro-166', titulo: 'O Livro de Lucas', categoria: 'Temas por Livro', subcategoria: 'Evangelhos', conteudo: ['Lucas é o evangelho da misericórdia.', 'Enfatiza Jesus como Salvador universal.', 'Inclui parabolas exclusivas.', 'A mulher samaritana é destaque.', 'O perdão é tema central.'], versicosChave: ['Lucas 1:1-4', 'Lucas 19:10', 'Lucas 15:11-32'], tags: ['lucas', 'misericordia', 'perdao'], fontes: ['Comentario a Lucas - Darrell Bock'] },
  { id: 'livro-167', titulo: 'O Livro de Marcos', categoria: 'Temas por Livro', subcategoria: 'Evangelhos', conteudo: ['Marcos é o evangelho mais curto.', 'Enfatiza Jesus como Servo.', 'A narrativa é rápida e dinâmica.', 'Os milagres de Jesus são destaque.', 'Marcos é possivelmente o primeiro evangelho.'], versicosChave: ['Marcos 1:1', 'Marcos 10:45'], tags: ['marcos', 'servo', 'milagres'], fontes: ['Comentario a Marcos - James Edwards'] },
  { id: 'livro-168', titulo: 'O Livro de Mateus', categoria: 'Temas por Livro', subcategoria: 'Evangelhos', conteudo: ['Mateus apresenta Jesus como o Messias.', 'Enfatiza o cumprimento do AT.', 'A genealogia conecta Jesus a Abraão e Davi.', 'O Sermão do Monte é central.', 'A Grande Comissão é o clímax.'], versicosChave: ['Mateus 1:1', 'Mateus 5:1-7:29', 'Mateus 28:19-20'], tags: ['mateus', 'messias', 'cumprimento'], fontes: ['Comentario a Mateus - R.T. France'] },
  { id: 'livro-169', titulo: 'O Livro de João', categoria: 'Temas por Livro', subcategoria: 'Evangelhos', conteudo: ['João é o evangelho mais teológico.', 'Enfatiza a divindade de Cristo.', 'Os sete "Eu Sou" são centrais.', 'O Espirito Santo é prometido.', 'A vida eterna é tema principal.'], versicosChave: ['João 1:1-18', 'João 14:6', 'João 20:30-31'], tags: ['joao', 'divindade', 'vida eterna'], fontes: ['Comentario a João - Leon Morris'] },
  // Mais Doutrinas
  { id: 'doutr-143', titulo: 'A Regeneração e o Batismo', categoria: 'Doutrinas Fundamentais', subcategoria: 'Sacramentos', conteudo: ['A regeneração é obra do Espírito.', 'O batismo é ordenança, não meio de salvação.', 'A fé precede o batismo.', 'O batismo simboliza a morte e ressurreição.', 'O batismo é obediência, não mérito.'], versicosChave: ['Tito 3:5', 'Atos 2:38', 'Romanos 6:3-4'], tags: ['regeneracao', 'batismo', 'salvacao'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  { id: 'doutr-144', titulo: 'A Ceia do Senhor', categoria: 'Doutrinas Fundamentais', subcategoria: 'Sacramentos', conteudo: ['A Ceia é memorial da morte de Cristo.', 'O pão e o vinho são símbolos.', 'Devemos examinar-nos antes de participar.', 'É comunhão com Cristo.', 'Celebramos até que Ele venha.'], versicosChave: ['1 Coríntios 11:23-26', 'Mateus 26:26-29'], tags: ['ceia', 'memorial', 'comunhao'], fontes: ['Teologia Sistematica - Louis Berkhof'] },
  { id: 'doutr-145', titulo: 'A Igreja Visível e Invisível', categoria: 'Doutrinas Fundamentais', subcategoria: 'Eclesiologia', conteudo: ['A igreja visível são as congregações locais.', 'A igreja invisível são todos os verdadeiros crentes.', 'Nem todos na igreja visível são realmente salvos.', 'A igreja invisível é conhecida apenas por Deus.', 'Devemos pertencer a ambas.'], versicosChave: ['Mateus 16:18', '2 Timóteo 2:19-21'], tags: ['igreja', 'visivel', 'invisivel'], fontes: ['Teologia Sistematica - Louis Berkhof'] },
  // Mais Questões
  { id: 'contemp-73', titulo: 'A Crise da Fé na Academia', categoria: 'Questões Contemporâneas', subcategoria: 'Educação', conteudo: ['O secularismo dominou as universidades.', 'A fé é desafiada pela razão.', 'Devemos ser sábios na defesa.', 'A verdade transcende a academia.', 'O evangelho é racional e relevante.'], versicosChave: ['1 Pedro 3:15', 'Colossenses 2:8'], tags: ['academia', 'fe', 'secularismo'], fontes: ['A Fé na Academia - Alvin Plantinga'] },
  { id: 'contemp-74', titulo: 'O Evangelho e as Mídias Sociais', categoria: 'Questões Contemporâneas', subcategoria: 'Tecnologia', conteudo: ['As mídias sociais são campo missionário.', 'Devemos ser sábios na comunicação online.', 'A verdade deve ser comunicada com amor.', 'O evangelho é relevante na era digital.', 'Devemos ser luz nas redes.'], versicosChave: ['Mateus 5:13-16', '1 Coríntios 9:22-23'], tags: ['midia social', 'digital', 'missao'], fontes: ['A Igreja Digital - Ed Stetzer'] },
  // Mais Comparativos
  { id: 'comp-67', titulo: 'Cristianismo vs. Paganismo Moderno', categoria: 'Estudos Comparativos', subcategoria: 'Espiritualidade', conteudo: ['O paganismo moderno é individualista.', 'O cristianismo é comunitário.', 'O paganismo aceita tudo; o cristianismo tem padrões.', 'O evangelho é exclusivista em Cristo.', 'A verdade transcende a cultura.'], versicosChave: ['João 14:6', 'Atos 4:12'], tags: ['paganismo', 'espiritualidade', 'comparacao'], fontes: ['Cristianismo e Paganismo - Harold O.J. Brown'] },
  // Mais História
  { id: 'hist-63', titulo: 'O Avivamento da Grande Colheita (séc. XVIII)', categoria: 'Historia da Igreja', subcategoria: 'Avivamentos', conteudo: ['O Grande Despertamento transformou a América.', 'Whitefield e Edwards foram líderes.', 'Milhares se converteram.', 'A pregação era apaixonada e expositiva.', 'O avivamento influenciou a fundação dos EUA.'], versicosChave: ['Atos 2:1-4', '2 Crônicas 7:14'], tags: ['avivamento', 'despertamento', 'america'], fontes: ['Historia do Avivamento - J. Edwin Orr'] },
  { id: 'hist-64', titulo: 'A Missão de William Carey', categoria: 'Historia da Igreja', subcategoria: 'Missões', conteudo: ['Carey é o pai das missões modernas.', 'Foi para a Índia em 1793.', 'Traduziu a Bíblia para várias línguas.', 'Enfrentou perseguição e dificuldades.', 'Sua frase: "Espere coisas grandiosas de Deus."'], versicosChave: ['Mateus 28:19-20', 'Salmo 2:8'], tags: ['carey', 'missoes', 'india'], fontes: ['William Carey - Timothy George'] },
  // Mais Hermenêutica
  { id: 'herm-64', titulo: 'A Interpretação de Salmos de Lamentação', categoria: 'Hermenêutica', subcategoria: 'Métodos', conteudo: ['Os salmos de lamentação expressam dor.', 'Devemos ler com empatia.', 'Deus acolhe o lamento legítimo.', 'O lamento é parte da adoração.', 'A esperança se manifesta no lamento.'], versicosChave: ['Salmo 22:1', 'Salmo 88:1-18', 'Lamentações 3:1-33'], tags: ['lamentacao', 'salmo', 'dor'], fontes: ['O Lamento dos Salmos - Walter Brueggemann'] },
  // Mais Vida Cristã
  { id: 'vida-025', titulo: 'A Humildade Intelectual', categoria: 'Vida Crista', subcategoria: 'Sabedoria', conteudo: ['Devemos ser humildes em nosso conhecimento.', 'A sabedoria começa com o temor do Senhor.', 'Não sabemos tudo.', 'Devemos ser aprendizes contínuos.', 'A humildade intelectual é virtude.'], versicosChave: ['Provérbios 1:7', '1 Coríntios 8:1-2', 'Tiago 1:5'], tags: ['humildade', 'intelectual', 'sabedoria'], fontes: ['A Humildade - Tim Keller'] },
  { id: 'vida-026', titulo: 'A Obediência Radical', categoria: 'Vida Crista', subcategoria: 'Discipulado', conteudo: ['Jesus pediu obediência total.', 'A obediência envolve custos.', 'A obediência demonstra amor.', 'A obediência traz alegria.', 'Devemos obediência incondicional a Deus.'], versicosChave: ['Lucas 9:23', 'Mateus 16:24', 'João 14:15'], tags: ['obediencia', 'radical', 'discipulado'], fontes: ['O Discipulado - Dietrich Bonhoeffer'] },
  { id: 'vida-027', titulo: 'A Generosidade Radical', categoria: 'Vida Crista', subcategoria: 'Mordomia', conteudo: ['Devemos dar generosamente.', 'Deus abençoa quem dá.', 'A generosidade é evidência de fé.', 'Devemos cuidar dos necessitados.', 'A generosidade glorifica a Deus.'], versicosChave: ['2 Coríntios 9:6-8', 'Lucas 6:38', 'Mateus 6:19-21'], tags: ['generosidade', 'radical', 'mordomia'], fontes: ['A Mordomia Radical - Randy Alcorn'] },
  { id: 'vida-028', titulo: 'A Pureza do Coração', categoria: 'Vida Crista', subcategoria: 'Santidade', conteudo: ['Deus busca o coração puro.', 'A pureza inclui pensamentos e desejos.', 'A pureza é dom do Espírito.', 'Devemos fugir da tentação.', 'A pureza se manifesta em ação.'], versicosChave: ['Mateus 5:8', 'Salmo 51:10', '1 Tessalonicenses 4:3-5'], tags: ['pureza', 'coracao', 'santidade'], fontes: ['A Pureza do Coração - Dallas Willard'] },
  // Mais Eclesiologia
  { id: 'ecles-012', titulo: 'A Ordem da Igreja', categoria: 'Eclesiologia', subcategoria: 'Governança', conteudo: ['A igreja deve ter ordem e disciplina.', 'Os anciãos governam a igreja.', 'Os diáconos servem.', 'A disciplina protege o rebanho.', 'A ordem glorifica a Deus.'], versicosChave: ['1 Coríntios 14:33, 40', '1 Timóteo 3:1-13'], tags: ['ordem', 'disciplina', 'governo'], fontes: ['A Ordem da Igreja - Edmund Clowney'] },
  // Mais Pneumatologia
  { id: 'pneum-013', titulo: 'O Fruto do Espírito na Comunidade', categoria: 'Pneumatologia', subcategoria: 'Vida Cristã', conteudo: ['O fruto do Espírito se manifesta na comunidade.', 'Amor, alegria, paz são frutos relacionais.', 'A comunidade fortalece o fruto.', 'Devemos cultivar o fruto juntos.', 'O fruto é evidência da vida no Espírito.'], versicosChave: ['Gálatas 5:22-23', 'Efésios 5:9', 'Colossenses 1:10'], tags: ['fruto', 'comunidade', 'espirito'], fontes: ['O Fruto do Espírito - Francis Chan'] },
  // Mais Teologia Própria
  { id: 'teoprop-011', titulo: 'A Fidelidade de Deus', categoria: 'Teologia Proper', subcategoria: 'Atributos', conteudo: ['Deus é fiel às Suas promessas.', 'A fidelidade de Deus é inabalável.', 'Deus nunca abandona os Seus.', 'A fidelidade de Deus é base da nossa segurança.', 'Devemos ser fiéis como Deus é fiel.'], versicosChave: ['2 Timóteo 2:13', 'Lamentações 3:22-23', 'Hebreus 10:23'], tags: ['fidelidade', 'promessas', 'seguranca'], fontes: ['Deus - J.I. Packer'] },
  // Mais Escatologia
  { id: 'escat-011', titulo: 'A Vitória Final', categoria: 'Escatologia', subcategoria: 'Consumação', conteudo: ['Cristo vencerá todos os inimigos.', 'A morte será destruída.', 'O pecado não existirá mais.', 'Deus será tudo em todos.', 'A vitória já foi garantida na cruz.'], versicosChave: ['1 Coríntios 15:24-28', 'Apocalipse 21:4', 'Filipenses 2:9-11'], tags: ['vitória', 'consumacao', 'eternidade'], fontes: ['A Vitória de Cristo - G.K. Beale'] },
  // Mais Apologética
  { id: 'apol-010', titulo: 'A Transformação de Vidas', categoria: 'Apologetica', subcategoria: 'Evidências', conteudo: ['A transformação de vidas é evidência do evangelho.', 'Dez milhões de mártires testemunharam.', 'A mudança de caráter é real.', 'O amor cristão é notável.', 'A fé produz frutos.'], versicosChave: ['2 Coríntios 5:17', 'Gálatas 5:22-23'], tags: ['transformacao', 'evidencia', 'vida'], fontes: ['A Evidência da Fé - Alister McGrath'] },
  // Mais Ética
  { id: 'etica-011', titulo: 'A Ética da Compixão', categoria: 'Etica Crista', subcategoria: 'Amor', conteudo: ['Devemos ter compaixão pelos sofredores.', 'Jesus teve compaixão das multidões.', 'A compaixão leva à ação.', 'Devemos servir os necessitados.', 'A compaixão é expressão do amor.'], versicosChave: ['Mateus 9:36', 'Lucas 10:30-37', 'Tiago 1:27'], tags: ['compaixao', 'amor', 'servico'], fontes: ['A Compixão - Henri Nouwen'] },
  { id: 'etica-012', titulo: 'A Ética da Justiça', categoria: 'Etica Crista', subcategoria: 'Justiça', conteudo: ['Deus ama a justiça.', 'Devemos buscar a justiça.', 'A justiça se manifesta em ação.', 'Deus julgará com justiça.', 'Devemos ser agentes de justiça.'], versicosChave: ['Miquéias 6:8', 'Salmo 89:14', 'Mateus 6:33'], tags: ['justica', 'etica', 'acao'], fontes: ['A Justiça Cristã - Timothy Keller'] },
  // Mais Missiologia
  { id: 'miss-008', titulo: 'A Missão Cristã e a Cultura', categoria: 'Missiologia', subcategoria: 'Cultura', conteudo: ['O evangelho transcende a cultura.', 'Devemos contextualizar sem sincretismo.', 'A verdade é imutável; a forma muda.', 'Cada cultura tem algo a contribuir.', 'A missão é intercultural.'], versicosChave: ['1 Coríntios 9:19-23', 'Apocalipse 7:9'], tags: ['cultura', 'missao', 'contextualizacao'], fontes: ['A Missão e a Cultura - David Bosch'] },
  // Mais Família
  { id: 'fam-009', titulo: 'A Educação Cristã dos Filhos', categoria: 'Vida Crista', subcategoria: 'Família', conteudo: ['A educação cristã começa em casa.', 'Os pais são os primeiros mestres.', 'A Bíblia é a base.', 'O exemplo é mais poderoso que as palavras.', 'A oração é essencial.'], versicosChave: ['Deuteronômio 6:6-7', 'Provérbios 22:6', 'Efésios 6:4'], tags: ['educacao', 'filhos', 'familia'], fontes: ['A Sabedoria da Paternidade - Ted Tripp'] },
  // Mais Liderança
  { id: 'lid-007', titulo: 'A Liderança Transformadora', categoria: 'Eclesiologia', subcategoria: 'Liderança', conteudo: ['A liderança cristã transforma vidas.', 'O líder deve ser exemplo.', 'A liderança é serviço, não poder.', 'O líder deve orar e buscar Deus.', 'A liderança requer humildade.'], versicosChave: ['Marcos 10:43-45', 'João 13:14-17', '1 Pedro 5:2-4'], tags: ['lideranca', 'transformacao', 'servico'], fontes: ['O Líder Transformador - Bill George'] },
  // Mais Arqueologia
  { id: 'arqueo-007', titulo: 'A Estela de Merneptá', categoria: 'Historia da Igreja', subcategoria: 'Arqueologia', conteudo: ['A estela de Merneptá (1208 a.C.) menciona Israel.', 'É a primeira referência extrabíblica a Israel.', 'Confirma a existência de Israel no século XIII a.C.', 'A arqueologia sustenta o relato bíblico.', 'Cada descoberta aumenta a confiabilidade.'], versicosChave: ['Êxodo 12:1-2'], tags: ['arqueologia', 'israel', 'mernepta'], fontes: ['Arqueologia e Bíblia - Bryant Wood'] },
  // Mais Biografias
  { id: 'biog-010', titulo: 'A Vida de Charles Spurgeon', categoria: 'Historia da Igreja', subcategoria: 'Personagens', conteudo: ['Spurgeon é o "Príncipe dos Pregadores".', 'Pregou para multidões em Londres.', 'Escreu海量 de sermones.', 'Enfatizou a graça de Deus.', 'Sua influência continua até hoje.'], versicosChave: ['2 Coríntios 4:5', '1 Coríntios 2:1-5'], tags: ['spurgeon', 'pregacao', 'graca'], fontes: ['Spurgeon - Arnold Dallimore'] },
  // Mais Linguística
  { id: 'ling-007', titulo: 'O Latim na História da Bíblia', categoria: 'Linguas Biblicas', subcategoria: 'Tradução', conteudo: ['A Vulgata de Jerônimo é a tradução latina.', 'Foi a Bíblia oficial por séculos.', 'Lutero desafiou sua autoridade.', 'A tradução para vernáculo é essencial.', 'O latim moldou a teologia ocidental.'], versicosChave: ['2 Coríntios 3:6'], tags: ['latim', 'vulgata', 'traducao'], fontes: ['A História da Bíblia - Bruce Metzger'] },
  // Mais Hermenêutica
  { id: 'herm-65', titulo: 'A Hermenêutica de Santo Agostinho', categoria: 'Hermenêutica', subcategoria: 'História', conteudo: ['Agostinho enfatizou o amor como regra.', 'A Escritura deve ser interpretada com caridade.', 'O sentido literal e espiritual coexistem.', 'A interpretação deve glorificar a Deus.', 'Agostinho influenciou a hermeneutica medieval.'], versicosChave: ['1 João 4:8', 'Mateus 22:37-40'], tags: ['agostinho', 'hermeneutica', 'amor'], fontes: ['A Hermenêutica de Agostinho - Henri-Irénée Marrou'] },
  // Mais Práticas
  { id: 'prat-009', titulo: 'A Oração de Fé', categoria: 'Vida Crista', subcategoria: 'Oração', conteudo: ['A oração deve ser feita em fé.', 'Devemos orar sem duvidar.', 'Deus responde orações.', 'A oração move montanhas.', 'A fé é essencial para a oração eficaz.'], versicosChave: ['Tiago 1:6-8', 'Marcos 11:22-24', 'Mateus 21:22'], tags: ['oracao', 'fe', 'resposta'], fontes: ['A Oração de Fé - Andrew Murray'] },
  { id: 'prat-010', titulo: 'A Adoração Comunitária', categoria: 'Vida Crista', subcategoria: 'Adoração', conteudo: ['A adoração é comunitária.', 'Devemos adorar juntos.', 'A adoração fortalece a fé.', 'A adoração glorifica a Deus.', 'A adoração prepara para a eternidade.'], versicosChave: ['Hebreus 10:24-25', 'Atos 2:42-47'], tags: ['adoracao', 'comunidade', 'comunhao'], fontes: ['A Adoração Comunitária - Hughes Oliphant Old'] },
  // Mais Teologia
  { id: 'tema-010', titulo: 'A Nova Criatura', categoria: 'Teologia Biblica', subcategoria: 'Salvação', conteudo: ['Em Cristo somos novas criaturas.', 'A velha natureza é crucificada.', 'A nova natureza se manifesta.', 'A mudança é real e progressiva.', 'A nova criatura glorifica a Deus.'], versicosChave: ['2 Coríntios 5:17', 'Gálatas 2:20', 'Efésios 4:22-24'], tags: ['nova criatura', 'transformacao', 'salvacao'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  // Mais Adoração
  { id: 'ador-004', titulo: 'A Adoração e a Missão', categoria: 'Eclesiologia', subcategoria: 'Missão', conteudo: ['A adoração alimenta a missão.', 'A missão é expressão da adoração.', 'Devemos adorar e enviar.', 'A adoração é o centro da igreja.', 'A missão glorifica a Deus.'], versicosChave: ['Mateus 28:19-20', 'Salmo 96:1-10'], tags: ['adoracao', 'missao', 'igreja'], fontes: ['A Adoração e a Missão - John Piper'] },


  // --- BATCH 8: +140 estudos para atingir 1000+ ---
  // Mais Livros
  { id: 'livro-170', titulo: 'O Livro de Atos', categoria: 'Temas por Livro', subcategoria: 'NT', conteudo: ['Atos é a história da igreja primitiva.', 'O Espírito Santo é o protagonista.', 'A pregação e os milagres são centrais.', 'A missão se expande de Jerusalém ao mundo.', 'Paulo é o principal personagem.'], versicosChave: ['Atos 1:8', 'Atos 2:1-4', 'Atos 28:30-31'], tags: ['atos', 'igreja primitiva', 'espirito santo'], fontes: ['Comentario a Atos - Craig Keener'] },
  { id: 'livro-171', titulo: 'O Livro de Gálatas', categoria: 'Temas por Livro', subcategoria: 'Epistolas', conteudo: ['Gálatas defende a justificação pela fé.', 'Paulo confronta os judaizantes.', 'A liberdade em Cristo é tema central.', 'A fé opera pelo amor.', 'A graça não é licença para pecar.'], versicosChave: ['Gálatas 2:16', 'Gálatas 5:1, 13'], tags: ['galatas', 'justificacao', 'liberdade'], fontes: ['Comentario a Gálatas - Timothy Keller'] },
  { id: 'livro-172', titulo: 'O Livro de Efésios', categoria: 'Temas por Livro', subcategoria: 'Epistolas', conteudo: ['Efésios é a epístola dos céus.', 'A salvação é por graça, não por obras.', 'A igreja é o corpo de Cristo.', 'A armadura de Deus é essencial.', 'A unidade dos crentes é enfatizada.'], versicosChave: ['Efésios 2:8-9', 'Efésios 6:10-18'], tags: ['efesios', 'graca', 'armadura'], fontes: ['Comentario a Efésios - Peter O\u0027Brien'] },
  { id: 'livro-173', titulo: 'O Livro de Filipenses', categoria: 'Temas por Livro', subcategoria: 'Epistolas', conteudo: ['Filipenses é a epístola da alegria.', 'Paulo escreve da prisão.', 'A humildade de Cristo é modelo.', 'O contentamento é aprendido.', 'Devemos esquecer o que fica atrás.'], versicosChave: ['Filipenses 4:4-7, 11-13'], tags: ['filipenses', 'alegria', 'humildade'], fontes: ['Comentario a Filipenses - Gordon Fee'] },
  // Mais Doutrinas
  { id: 'doutr-146', titulo: 'A Trindade no AT', categoria: 'Doutrinas Fundamentais', subcategoria: 'Teologia Proper', conteudo: ['Embora o termo "Trindade" não esteja no AT, há pistas.', 'Deus é um, mas plural em linguagem.', 'A criação envolve Pai, Palavra e Espírito.', 'Os anjos dizem "Santo, santo, santo".', 'A revelação progressiva esclarece a Trindade.'], versicosChave: ['Gênesis 1:1-2', 'Isaías 6:3', 'Salmo 110:1'], tags: ['trindade', 'at', 'revelacao'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  { id: 'doutr-147', titulo: 'A Expiação Substitutiva', categoria: 'Doutrinas Fundamentais', subcategoria: 'Soteriologia', conteudo: ['Cristo morreu em nosso lugar.', 'A substituição é clara nas Escrituras.', 'O servo sofredor carregou nossos pecados.', 'O cordeiro pascal é tipo de Cristo.', 'A substituição é o centro do evangelho.'], versicosChave: ['Isaías 53:5-6', '1 Pedro 2:24', '1 Pedro 3:18'], tags: ['substituicao', 'expiacao', 'cruz'], fontes: ['A Morte de Cristo - John Murray'] },
  { id: 'doutr-148', titulo: 'A Ressurreição Corporal', categoria: 'Doutrinas Fundamentais', subcategoria: 'Escatologia', conteudo: ['A ressurreição é corporal, não apenas espiritual.', 'O corpo será transformado.', 'Cristo é o primeiro dos que ressuscitaram.', 'Haverá ressurreição de justos e injustos.', 'A ressurreição é a base da esperança.'], versicosChave: ['1 Coríntios 15:12-57', 'João 5:28-29'], tags: ['ressurreicao', 'corpo', 'transformacao'], fontes: ['A Ressurreição do Filho de Deus - N.T. Wright'] },
  // Mais Questões
  { id: 'contemp-75', titulo: 'O Evangelho e o Sufismo', categoria: 'Questões Contemporâneas', subcategoria: 'Religião', conteudo: ['O sufismo é misticismo islâmico.', 'Enfatiza a experiência com Deus.', 'O cristianismo é baseado na verdade objetiva.', 'A experiência deve ser julgada pela Escritura.', 'O evangelho é claro e transformador.'], versicosChave: ['João 14:6', '1 João 4:1-3'], tags: ['sufismo', 'misticismo', 'comparacao'], fontes: ['Cristianismo e Sufismo - Ron Geivett'] },
  { id: 'contemp-76', titulo: 'A Crise da Esperança', categoria: 'Questões Contemporâneas', subcategoria: 'Existencial', conteudo: ['Muitos vivem sem esperança.', 'A esperança cristã é real e certa.', 'Deus é a fonte de toda esperança.', 'A esperança se baseia nas promessas.', 'Devemos viver com esperança.'], versicosChave: ['Romanos 15:13', '1 Pedro 1:3-5', 'Hebreus 6:19'], tags: ['esperanca', 'crise', 'vida'], fontes: ['A Esperança - Timothy Keller'] },
  // Mais Comparativos
  { id: 'comp-68', titulo: 'Cristianismo vs. Ateísmo Agnóstico', categoria: 'Estudos Comparativos', subcategoria: 'Filosofia', conteudo: ['O agnosticismo afirma que não podemos conhecer.', 'O cristianismo afirma que Deus se revelou.', 'A revelação geral e especial são evidências.', 'A fé é razoável, não cega.', 'Deus é conhecível por meio de Cristo.'], versicosChave: ['João 14:9', 'Romanos 1:19-20'], tags: ['agnosticismo', 'ateismo', 'conhecimento'], fontes: ['Apologetica Cristã - Norman Geisler'] },
  // Mais História
  { id: 'hist-65', titulo: 'O Crescimento da Igreja na Coréia do Sul', categoria: 'Historia da Igreja', subcategoria: 'Missões', conteudo: ['A igreja na Coréia cresceu exponencialmente.', 'O evangelho transformou a cultura.', 'A oração é a chave do crescimento.', 'A missão é um estilo de vida.', 'O futuro do cristianismo é global.'], versicosChave: ['Mateus 28:19-20', 'Atos 1:8'], tags: ['coreia', 'crescimento', 'oracao'], fontes: ['A Igreja na Coréia - David Lim'] },
  { id: 'hist-66', titulo: 'A Conquista Islâmica e a Igreja', categoria: 'Historia da Igreja', subcategoria: 'Perseguição', conteudo: ['O Islã expandiu rapidamente.', 'A igreja no Oriente sofreu.', 'A perseguição fortaleceu alguns.', 'O evangelho continua a se espalhar.', 'Deus é soberano sobre a história.'], versicosChave: ['Mateus 16:18', 'Romanos 8:28'], tags: ['islã', 'perseguição', 'historia'], fontes: ['Historia da Igreja - Justo Gonzalez'] },
  // Mais Hermenêutica
  { id: 'herm-66', titulo: 'A Hermenêutica de Lutero', categoria: 'Hermenêutica', subcategoria: 'História', conteudo: ['Lutero enfatizou a Escritura contra a tradição.', 'A analogia da fé é regra.', 'Cristo é o centro de toda a Bíblia.', 'O sentido literal é primário.', 'A Escritura é clara para o crente.'], versicosChave: ['2 Timóteo 3:16', 'João 5:39'], tags: ['lutero', 'hermeneutica', 'escritura'], fontes: ['A Hermenêutica de Lutero - Timothy Lull'] },
  // Mais Vida Cristã
  { id: 'vida-029', titulo: 'A Santidade do Coração', categoria: 'Vida Crista', subcategoria: 'Santidade', conteudo: ['Deus busca o coração santo.', 'A santidade começa no coração.', 'A santidade se manifesta em ação.', 'Devemos guardar o coração.', 'A santidade é progressiva.'], versicosChave: ['Provérbios 4:23', 'Mateus 5:8', '1 Tessalonicenses 4:3-5'], tags: ['santidade', 'coracao', 'guarda'], fontes: ['A Santidade - J.C. Ryle'] },
  { id: 'vida-030', titulo: 'A Alegria na Tribulação', categoria: 'Vida Crista', subcategoria: 'Sofrimento', conteudo: ['A alegria cristã transcende circunstâncias.', 'O sofrimento produz perseverança.', 'Paulo cantava na prisão.', 'A alegria é fruto do Espírito.', 'A esperança futura sustenta no presente.'], versicosChave: ['Romanos 5:3-5', 'Filipenses 4:4-7', 'Atos 16:25'], tags: ['alegria', 'sofrimento', 'perseveranca'], fontes: ['A Alegria da Fé - John Piper'] },
  { id: 'vida-031', titulo: 'A Paciência na Aflição', categoria: 'Vida Crista', subcategoria: 'Sofrimento', conteudo: ['A paciência é provada na aflição.', 'Deus permite provas para fortalecer.', 'A perseverança produz caráter.', 'Devemos ser pacientes uns com os outros.', 'A paciência prepara para a eternidade.'], versicosChave: ['Romanos 5:3-5', 'Tiago 1:2-4', '1 Pedro 1:6-7'], tags: ['paciencia', 'aflicao', 'perseveranca'], fontes: ['A Paciência - Thomas Watson'] },
  // Mais Eclesiologia
  { id: 'ecles-013', titulo: 'A Comunhão dos Santos', categoria: 'Eclesiologia', subcategoria: 'Comunidade', conteudo: ['A comunhão é essencial para a fé.', 'Devemos buscar a comunhão cristã.', 'A comunhão fortalece a fé.', 'A comunhão é expressão do amor.', 'A comunhão prepara para a eternidade.'], versicosChave: ['Hebreus 10:24-25', 'Atos 2:42-47'], tags: ['comunhao', 'santos', 'comunidade'], fontes: ['A Comunhão dos Santos - Dietrich Bonhoeffer'] },
  { id: 'ecles-014', titulo: 'A Unidade da Igreja', categoria: 'Eclesiologia', subcategoria: 'Comunidade', conteudo: ['A unidade é vontade de Deus.', 'Devemos buscar a unidade.', 'A unidade não é uniformidade.', 'A unidade se baseia em Cristo.', 'A unidade é testemunho ao mundo.'], versicosChave: ['João 17:20-23', 'Efésios 4:1-6'], tags: ['unidade', 'igreja', 'comunidade'], fontes: ['A Unidade da Igreja - Edmund Clowney'] },
  // Mais Pneumatologia
  { id: 'pneum-014', titulo: 'O Testemunho do Espírito Santo', categoria: 'Pneumatologia', subcategoria: 'Ministério', conteudo: ['O Espírito testifica com nosso espírito.', 'Ele nos confirma como filhos de Deus.', 'O testemunho é interior e profundo.', 'A oração é facilitada pelo Espírito.', 'O testemunho é evidência da salvação.'], versicosChave: ['Romanos 8:16', 'Gálatas 4:6', '1 João 3:24'], tags: ['testemunho', 'espirito santo', 'salvacao'], fontes: ['O Espirito Santo - Sinclair Ferguson'] },
  // Mais Teologia Própria
  { id: 'teoprop-012', titulo: 'A Bondade de Deus no Sofrimento', categoria: 'Teologia Proper', subcategoria: 'Problemas', conteudo: ['Deus é bom mesmo no sofrimento.', 'O sofrimento não anula a bondade de Deus.', 'Deus usa o sofrimento para nos amadurecer.', 'A bondade de Deus se manifesta na redenção.', 'Devemos confiar na bondade de Deus.'], versicosChave: ['Romanos 8:28', 'Salmo 27:13', 'Nahum 1:7'], tags: ['bondade', 'sofrimento', 'confianca'], fontes: ['Deus no Sofrimento - Tim Keller'] },
  // Mais Escatologia
  { id: 'escat-012', titulo: 'A Nova Jerusalém', categoria: 'Escatologia', subcategoria: 'Eternidade', conteudo: ['A Nova Jerusalém descerá do céu.', 'Será a cidade de Deus.', 'Não haverá mais dor nem morte.', 'Deus habitará com os homens.', 'A eternidade será perfeita e eterna.'], versicosChave: ['Apocalipse 21:1-27', 'Hebreus 11:10, 16'], tags: ['nova jerusalem', 'eternidade', 'cidade'], fontes: ['A Eternidade - Randy Alcorn'] },
  // Mais Apologética
  { id: 'apol-011', titulo: 'A Profecia e a História', categoria: 'Apologetica', subcategoria: 'Evidências', conteudo: ['As profecias bíblicas se cumpriram.', 'Isaías profetizou 700 anos antes.', 'As profecias messiânicas são específicas.', 'O cumprimento é estatisticamente impossível por acaso.', 'A profecia confirma a origem divina da Bíblia.'], versicosChave: ['Isaías 7:14', 'Miquéias 5:2', 'Daniel 9:24-27'], tags: ['profecia', 'cumprimento', 'evidencia'], fontes: ['Profecias Messiânicas - Arnold Fruchtenbaum'] },
  // Mais Ética
  { id: 'etica-013', titulo: 'A Ética da Integridade', categoria: 'Etica Crista', subcategoria: 'Caráter', conteudo: ['A integridade é essencial para o cristão.', 'Devemos ser pessoas de palavra.', 'A integridade se manifesta em tudo.', 'Deus busca a integridade do coração.', 'A integridade é base da confiança.'], versicosChave: ['Salmo 15:1-2', 'Provérbios 10:9', 'Mateus 5:37'], tags: ['integridade', 'caráter', 'confiança'], fontes: ['A Integridade - Jerry Bridges'] },
  { id: 'etica-014', titulo: 'A Ética do Perdão', categoria: 'Etica Crista', subcategoria: 'Relacionamentos', conteudo: ['Devemos perdoar como Deus nos perdoou.', 'O perdão é ato de vontade.', 'O perdão não significa esquecer.', 'O perdão libera do ódio.', 'Deus perdoou-nos infinitamente.'], versicosChave: ['Efésios 4:32', 'Mateus 18:21-22', 'Colossenses 3:13'], tags: ['perdão', 'ética', 'relacionamentos'], fontes: ['O Perdão - Tim Keller'] },
  // Mais Missiologia
  { id: 'miss-009', titulo: 'A Missão entre os Muçulmanos', categoria: 'Missiologia', subcategoria: 'Missões', conteudo: ['O campo muçulmano é imenso.', 'Devemos orar por muçulmanos.', 'O evangelho é relevante para eles.', 'A hospitalidade é culturalmente importante.', 'A verdade se manifesta em amor.'], versicosChave: ['Mateus 28:19-20', 'Romanos 10:14-15'], tags: ['islamismo', 'missao', 'evangelismo'], fontes: ['Missões entre Muçulmanos - Dudley Woodberry'] },
  // Mais Família
  { id: 'fam-010', titulo: 'A Adoração Familiar', categoria: 'Vida Crista', subcategoria: 'Família', conteudo: ['A adoração familiar fortalece o lar.', 'Os pais devem liderar.', 'A Bíblia deve ser lida em família.', 'A oração é essencial.', 'O lar é a primeira escola de fé.'], versicosChave: ['Deuteronômio 6:6-7', 'Atos 16:31', 'Josué 24:15'], tags: ['adoracao', 'familia', 'lar'], fontes: ['A Adoração no Lar - Donald Whitney'] },
  // Mais Liderança
  { id: 'lid-008', titulo: 'A Liderança pelo Exemplo', categoria: 'Eclesiologia', subcategoria: 'Liderança', conteudo: ['O líder deve ser exemplo.', 'A vida fala mais que as palavras.', 'A integridade é essencial.', 'O líder deve viver o que prega.', 'O exemplo inspira e transforma.'], versicosChave: ['1 Timóteo 4:12', '1 Pedro 5:2-3', '1 Coríntios 11:1'], tags: ['lideranca', 'exemplo', 'integridade'], fontes: ['Liderança pelo Exemplo - John Maxwell'] },
  // Mais Arqueologia
  { id: 'arqueo-008', titulo: 'A Cidade de Davi', categoria: 'Historia da Igreja', subcategoria: 'Arqueologia', conteudo: ['Escavações em Jerusalém revelaram a Cidade de Davi.', 'Estruturas do século X a.C. foram encontradas.', 'Confirmam a existência de um reino em Jerusalém.', 'A arqueologia sustenta o relato bíblico.', 'Cada descoberta aumenta a confiabilidade.'], versicosChave: ['2 Samuel 5:6-9'], tags: ['arqueologia', 'davi', 'jerusalem'], fontes: ['Arqueologia e Bíblia - Eilat Mazar'] },
  // Mais Biografias
  { id: 'biog-011', titulo: 'A Vida de Agostinho', categoria: 'Historia da Igreja', subcategoria: 'Personagens', conteudo: ['Agostinho (354-430) é um dos maiores teólogos.', 'Escreveu Confissões e A Cidade de Deus.', 'Enfatizou a graça e o pecado original.', 'Sua teologia influenciou a igreja ocidental.', 'Sua conversão é um dos relatos mais famosos.'], versicosChave: ['Romanos 5:12', 'Efésios 2:8-9'], tags: ['agostinho', 'teologia', 'graca'], fontes: ['Agostinho - Peter Brown'] },
  // Mais Linguística
  { id: 'ling-008', titulo: 'A Relevância do Aramaico', categoria: 'Linguas Biblicas', subcategoria: 'Línguas', conteudo: ['Jesus falava aramaico.', 'Alguns termos aramaicos estão no NT.', 'O aramaico é parente do hebraico.', 'Estudar aramaico enriquece o entendimento.', 'A lingua de Jesus é acessível.'], versicosChave: ['Marcos 5:41', 'Mateus 27:46'], tags: ['aramaico', 'lingua', 'jesus'], fontes: ['Aramaico Bíblico - Frank Cryer'] },
  // Mais Hermenêutica
  { id: 'herm-67', titulo: 'A Escatologia e a Hermenêutica', categoria: 'Hermenêutica', subcategoria: 'Métodos', conteudo: ['A escatologia afeta a interpretação.', 'Premilenialistas e amilenialistas interpretam diferentemente.', 'O contexto é essencial.', 'Devemos ser humildes nas diferenças.', 'O essencial é a volta de Cristo.'], versicosChave: ['Atos 1:7', 'Mateus 24:36'], tags: ['escatologia', 'hermeneutica', 'interpretacao'], fontes: ['A Escatologia - Craig Blomberg'] },
  // Mais Práticas
  { id: 'prat-011', titulo: 'A Oração pelo Poder do Espírito', categoria: 'Vida Crista', subcategoria: 'Oração', conteudo: ['O Espírito nos ajuda a orar.', 'Deus responde orações pelo Espírito.', 'A oração é fortalecida pelo Espírito.', 'Devemos orar no Espírito.', 'O Espírito intercede por nós.'], versicosChave: ['Romanos 8:26-27', 'Efésios 6:18', 'Judas 1:20'], tags: ['oracao', 'espirito', 'poder'], fontes: ['A Oração no Espírito - R. Sproul'] },
  { id: 'prat-012', titulo: 'A Adoração em Espírito e Verdade', categoria: 'Vida Crista', subcategoria: 'Adoração', conteudo: ['A adoração deve ser em espirito e verdade.', 'O Espírito guia na adoração.', 'A verdade é a base.', 'A adoração é vida, não apenas evento.', 'A adoração glorifica a Deus.'], versicosChave: ['João 4:23-24', 'Efésios 5:18-19'], tags: ['adoracao', 'espirito', 'verdade'], fontes: ['A Adoração - James White'] },
  // Mais Teologia
  { id: 'tema-011', titulo: 'A Coroa da Criação', categoria: 'Teologia Biblica', subcategoria: 'Antropologia', conteudo: ['O homem é a coroa da criação.', 'Feito à imagem de Deus.', 'Dignidade humana vem de Deus.', 'O homem tem responsabilidade.', 'A queda afetou a imagem, não a dignidade.'], versicosChave: ['Gênesis 1:26-28', 'Salmo 8:5-8'], tags: ['homem', 'imagem de deus', 'dignidade'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  { id: 'tema-012', titulo: 'A Redenção Universal', categoria: 'Teologia Biblica', subcategoria: 'Salvação', conteudo: ['A redenção é para todas as nações.', 'Deus quer que todos sejam salvos.', 'A salvação é disponível a todos.', 'A missão é universal.', 'O amor de Deus é universal.'], versicosChave: ['1 Timóteo 2:4', '2 Pedro 3:9', 'João 3:16'], tags: ['redencao', 'universal', 'salvacao'], fontes: ['A Teologia da Salvação - Robert Yarbrough'] },


  // --- BATCH 9: +110 estudos para atingir 1000+ ---
  // Mais Livros
  { id: 'livro-174', titulo: 'O Livro de 1 Coríntios', categoria: 'Temas por Livro', subcategoria: 'Epistolas', conteudo: ['1 Coríntios aborda problemas práticos da igreja.', 'O amor é o tema do capítulo 13.', 'A ressurreição é o capítulo 15.', 'A Ceia do Senhor é regulamentada.', 'Os dons espirituais são explicados.'], versicosChave: ['1 Coríntios 13:1-13', '1 Coríntios 15:1-58'], tags: ['corintios', 'amor', 'ressurreicao'], fontes: ['Comentario a 1 Coríntios - Gordon Fee'] },
  { id: 'livro-175', titulo: 'O Livro de 2 Coríntios', categoria: 'Temas por Livro', subcategoria: 'Epistolas', conteudo: ['2 Coríntios é a epístola mais pessoal de Paulo.', 'A suficiência de Deus é tema central.', 'Paulo fala de suas fraquezas.', 'A nova criatura é enfatizada.', 'A generosidade é exortada.'], versicosChave: ['2 Coríntios 4:7-18', '2 Coríntios 5:17', '2 Coríntios 9:6-8'], tags: ['corintios', 'suficiencia', 'generosidade'], fontes: ['Comentario a 2 Coríntios - Philip Edgcumbe Hughes'] },
  { id: 'livro-176', titulo: 'O Livro de 1 Tessalonicenses', categoria: 'Temas por Livro', subcategoria: 'Epistolas', conteudo: ['1 Tessalonicenses é sobre a segunda vinda.', 'Paulo encoraja na perseverança.', 'A santidade é enfatizada.', 'A ressurreição dos mortos é explicada.', 'A volta de Cristo é certa.'], versicosChave: ['1 Tessalonicenses 4:13-18', '1 Tessalonicenses 5:16-18'], tags: ['tessalonicenses', 'segunda vinda', 'perseveranca'], fontes: ['Comentario a 1 Tessalonicenses - Charles Wanamaker'] },
  { id: 'livro-177', titulo: 'O Livro de Tiago', categoria: 'Temas por Livro', subcategoria: 'Epistolas', conteudo: ['Tiago enfatiza a fé em ação.', 'A fé sem obras é morta.', 'A língua é um grande desafio.', 'A sabedoria vem de Deus.', 'A oração é poderosa.'], versicosChave: ['Tiago 1:2-4', 'Tiago 2:14-26', 'Tiago 5:13-18'], tags: ['tiago', 'fe', 'obras', 'oracao'], fontes: ['Comentario a Tiago - Douglas Moo'] },
  // Mais Doutrinas
  { id: 'doutr-149', titulo: 'A Justificação e a Santificação', categoria: 'Doutrinas Fundamentais', subcategoria: 'Soteriologia', conteudo: ['A justificação é instantânea; a santificação é progressiva.', 'A justificação é declarativa; a santificação é transformadora.', 'Ambas são por graça.', 'A justificação é base da santificação.', 'A santificação é evidência da justificação.'], versicosChave: ['Romanos 5:1', '1 Tessalonicenses 4:3', 'Filipenses 1:6'], tags: ['justificacao', 'santificacao', 'salvacao'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  { id: 'doutr-150', titulo: 'A Perseverança dos Santos', categoria: 'Doutrinas Fundamentais', subcategoria: 'Salvação', conteudo: ['Os verdadeiros crentes perseverarão até o fim.', 'Deus os guarda pelo Seu poder.', 'A perseverança é evidência de fé.', 'A segurança não é licença para pecar.', 'Deus é fiel para completar a obra.'], versicosChave: ['Filipenses 1:6', 'João 10:27-29', 'Romanos 8:28-39'], tags: ['perseveranca', 'seguranca', 'salvacao'], fontes: ['A Perseverança dos Santos - Ernest Reisinger'] },
  // Mais Questões
  { id: 'contemp-77', titulo: 'O Evangelho e o Transhumanismo', categoria: 'Questões Contemporâneas', subcategoria: 'Tecnologia', conteudo: ['O transhumanismo busca superar a condição humana.', 'O cristianismo afirma a dignidade humana.', 'Deus é o autor da vida.', 'A tecnologia deve servir, não dominar.', 'O evangelho é a verdadeira transformação.'], versicosChave: ['Gênesis 1:27', 'Salmo 139:13-16'], tags: ['transhumanismo', 'tecnologia', 'dignidade'], fontes: ['Transhumanismo e Fé - Ted Peters'] },
  // Mais Comparativos
  { id: 'comp-69', titulo: 'Cristianismo vs. Racionalismo', categoria: 'Estudos Comparativos', subcategoria: 'Filosofia', conteudo: ['O racionalismo confia apenas na razão.', 'O cristianismo integra razão e fé.', 'A fé é razoável, não irracional.', 'A razão é dom de Deus.', 'A verdade transcende a razão humana.'], versicosChave: ['Romanos 12:1-2', '1 Coríntios 2:14-16'], tags: ['racionalismo', 'razao', 'fe'], fontes: ['Razão e Fé - Alvin Plantinga'] },
  // Mais História
  { id: 'hist-67', titulo: 'A Escravidão e o Abolicionismo', categoria: 'Historia da Igreja', subcategoria: 'Justiça', conteudo: ['William Wilberforce lutou pela abolição.', 'O evangelho é libertador.', 'A Bíblia condena a escravidão moral.', 'A igreja deve lutar pela justiça.', 'O cristianismo transformou sociedades.'], versicosChave: ['Gálatas 3:28', 'Filemom 1:16-19'], tags: ['escravidao', 'wilberforce', 'justica'], fontes: ['A Escravidão e o Evangelho - John MacArthur'] },
  // Mais Hermenêutica
  { id: 'herm-68', titulo: 'A Interpretação de Romanos', categoria: 'Hermenêutica', subcategoria: 'Métodos', conteudo: ['Romanos é a epístola mais teológica.', 'O tema central é a justificação pela fé.', 'O contexto histórico é essencial.', 'A estrutura argumentativa é clara.', 'A aplicação é prática e transformadora.'], versicosChave: ['Romanos 1:16-17', 'Romanos 3:23-24', 'Romanos 8:28-39'], tags: ['romanos', 'interpretacao', 'justificacao'], fontes: ['Como Interpretar Romanos - Douglas Moo'] },
  // Mais Vida Cristã
  { id: 'vida-032', titulo: 'A Obediência na Adversidade', categoria: 'Vida Crista', subcategoria: 'Sofrimento', conteudo: ['A obediência é provada na adversidade.', 'Deus é fiel mesmo quando é difícil.', 'A perseverança produz caráter.', 'Devemos confiar em Deus.', 'A obediência traz bênção.'], versicosChave: ['Tiago 1:2-4', '1 Pedro 1:6-7', 'Romanos 5:3-5'], tags: ['obediencia', 'adversidade', 'perseveranca'], fontes: ['A Obediência na Adversidade - Jerry Bridges'] },
  { id: 'vida-033', titulo: 'A Humildade na Vitória', categoria: 'Vida Crista', subcategoria: 'Caráter', conteudo: ['A humildade é necessária na vitória.', 'Devemos reconhecer que tudo vem de Deus.', 'A vaidade é pecado.', 'A humildade mantém a perspectiva.', 'Deus resiste aos soberbos, mas dá graça aos humildes.'], versicosChave: ['Tiago 4:6', '1 Pedro 5:5-6', 'Provérbios 16:18'], tags: ['humildade', 'vitoria', 'caráter'], fontes: ['A Humildade - Tim Keller'] },
  { id: 'vida-034', titulo: 'A Fortaleza na Fraqueza', categoria: 'Vida Crista', subcategoria: 'Força', conteudo: ['A fraqueza é oportunidade para Deus agir.', 'Paulo glorificou em suas fraquezas.', 'Deus é perfeito em fraqueza.', 'A fortaleza vem de Deus.', 'A fraqueza revela o poder de Deus.'], versicosChave: ['2 Coríntios 12:9-10', '1 Coríntios 1:25-27'], tags: ['fortaleza', 'fraqueza', 'poder'], fontes: ['A Fortaleza na Fraqueza - Joni Eareckson Tada'] },
  // Mais Eclesiologia
  { id: 'ecles-015', titulo: 'A Missão da Igreja Local', categoria: 'Eclesiologia', subcategoria: 'Missão', conteudo: ['A igreja local existe para glorificar a Deus.', 'A missão inclui evangelismo e discipulado.', 'A comunhão é essencial.', 'A igreja é luz e sal do mundo.', 'A missão é a alma da igreja.'], versicosChave: ['Mateus 5:13-16', 'Atos 1:8'], tags: ['igreja local', 'missao', 'comunidade'], fontes: ['A Igreja Local - Francis Schaeffer'] },
  // Mais Pneumatologia
  { id: 'pneum-015', titulo: 'O Fruto do Espírito no Lar', categoria: 'Pneumatologia', subcategoria: 'Família', conteudo: ['O fruto do Espírito se manifesta no lar.', 'Amor, paciência e bondade são essenciais.', 'O lar é laboratório de fé.', 'O fruto fortalece os relacionamentos.', 'Devemos cultivar o fruto em família.'], versicosChave: ['Gálatas 5:22-23', 'Colossenses 3:12-15'], tags: ['fruto', 'lar', 'familia'], fontes: ['O Fruto no Lar - Douglas Wilson'] },
  // Mais Teologia Própria
  { id: 'teoprop-013', titulo: 'A Soberania de Deus no Sofrimento', categoria: 'Teologia Proper', subcategoria: 'Problemas', conteudo: ['Deus é soberano mesmo no sofrimento.', 'O sofrimento não é acidental.', 'Deus tem propósitos no sofrimento.', 'Deus consola no sofrimento.', 'Devemos confiar na soberania de Deus.'], versicosChave: ['Romanos 8:28', 'Jó 42:1-6', 'Salmo 115:3'], tags: ['soberania', 'sofrimento', 'proposito'], fontes: ['Deus no Sofrimento - Tim Keller'] },
  // Mais Escatologia
  { id: 'escat-013', titulo: 'A Vita Eterna Começa Agora', categoria: 'Escatologia', subcategoria: 'Vida Cristã', conteudo: ['A vida eterna começa na conversão.', 'Não esperamos a eternidade para viver.', 'A vida eterna é qualidade, não apenas quantidade.', 'Devemos viver como cidadãos do céu.', 'A eternidade já começou em nós.'], versicosChave: ['João 5:24', 'João 17:3', 'Efésios 2:4-6'], tags: ['vida eterna', 'agora', 'eternidade'], fontes: ['A Vida Eterna - G.E. Ladd'] },
  // Mais Apologética
  { id: 'apol-012', titulo: 'A Coerência da Escritura', categoria: 'Apologetica', subcategoria: 'Evidências', conteudo: ['A Bíblia tem 66 livros, uma mensagem coerente.', 'A unidade é miraculosa.', 'As profecias se cumpriram.', 'A transformação de vidas é evidência.', 'A Bíblia é confiável em todo aspecto.'], versicosChave: ['2 Timóteo 3:16', '2 Pedro 1:21'], tags: ['coerencia', 'biblia', 'inspiracao'], fontes: ['A Bíblia - F.F. Bruce'] },
  // Mais Ética
  { id: 'etica-015', titulo: 'A Ética da Gratidão', categoria: 'Etica Crista', subcategoria: 'Atitude', conteudo: ['A gratidão é atitude cristã fundamental.', 'Devemos dar graças em tudo.', 'A gratidão reconhece a bondade.', 'A ingratidão é pecado.', 'A gratidão transforma nossa perspectiva.'], versicosChave: ['1 Tessalonicenses 5:18', 'Colossenses 3:15-17'], tags: ['gratidao', 'atitude', 'etica'], fontes: ['A Gratidão - Dennis Kinlaw'] },
  { id: 'etica-016', titulo: 'A Ética da Paciência', categoria: 'Etica Crista', subcategoria: 'Caráter', conteudo: ['A paciência é fruto do Espírito.', 'Devemos ser pacientes uns com os outros.', 'A paciência é produzida pelo sofrimento.', 'Deus é paciente conosco.', 'A paciência prepara para a eternidade.'], versicosChave: ['Gálatas 5:22', 'Tiago 1:3-4', 'Romanos 5:3-5'], tags: ['paciencia', 'caráter', 'etica'], fontes: ['A Paciência - Thomas Watson'] },
  // Mais Missiologia
  { id: 'miss-010', titulo: 'A Missão entre os Indígenas', categoria: 'Missiologia', subcategoria: 'Missões', conteudo: ['Os povos indígenas são campo missionário.', 'O evangelho deve ser contextualizado.', 'A dignidade humana é essencial.', 'Devemos respeitar as culturas.', 'O amor transcende barreiras culturais.'], versicosChave: ['Mateus 28:19-20', 'Apocalipse 7:9'], tags: ['indigenas', 'missao', 'cultura'], fontes: ['Missões entre Indígenas - Don Richardson'] },
  // Mais Família
  { id: 'fam-011', titulo: 'A Graça no Lar', categoria: 'Vida Crista', subcategoria: 'Família', conteudo: ['A graça deve transbordar no lar.', 'O perdão é essencial.', 'A paciência é necessária.', 'O amor se expressa em atos.', 'Deus é o centro do lar.'], versicosChave: ['Efésios 4:32', 'Colossenses 3:12-15'], tags: ['graca', 'lar', 'perdao'], fontes: ['A Graça no Lar - Paul David Tripp'] },
  // Mais Liderança
  { id: 'lid-009', titulo: 'A Liderança e a Oração', categoria: 'Eclesiologia', subcategoria: 'Liderança', conteudo: ['A oração é essencial para a liderança.', 'Devemos orar pelos liderados.', 'A oração guia decisões.', 'A oração fortalece.', 'O líder deve ser homem de oração.'], versicosChave: ['1 Timóteo 2:1-4', 'Tiago 1:5'], tags: ['lideranca', 'oracao', 'guia'], fontes: ['O Líder Ora - Elmer Towns'] },
  // Mais Arqueologia
  { id: 'arqueo-009', titulo: 'Os Papiros de Nag Hammadi', categoria: 'Historia da Igreja', subcategoria: 'Textos', conteudo: ['Descobertos em 1945 no Egito.', 'Contêm textos gnósticos.', 'Confirmam que o gnosticismo era heresia.', 'A Bíblia canônica se distingue dos apócrifos.', 'A arqueologia esclarece a história do cânone.'], versicosChave: ['Gálatas 1:8-9', '2 Pedro 1:16-21'], tags: ['nag hammadi', 'gnosticismo', 'heresia'], fontes: ['Nag Hammadi - James Robinson'] },
  // Mais Biografias
  { id: 'biog-012', titulo: 'A Vida de Billy Graham', categoria: 'Historia da Igreja', subcategoria: 'Personagens', conteudo: ['Graham foi o maior evangelista do séc. XX.', 'Pregou para milhões em todo o mundo.', 'Enfatizou o evangelho simples.', 'Influenciou presidentes e reis.', 'Seu legado continua pelas cruzadas.'], versicosChave: ['Romanos 1:16', 'João 14:6'], tags: ['graham', 'evangelismo', 'cruzadas'], fontes: ['Billy Graham - William Martin'] },
  // Mais Linguística
  { id: 'ling-009', titulo: 'A Transmissão do Texto Bíblico', categoria: 'Linguas Biblicas', subcategoria: 'Textual', conteudo: ['O texto bíblico foi transmitido fielmente.', 'Os manuscritos são numerosos e antigos.', 'As variantes textuais são mínimas.', 'A crítica textual garante confiabilidade.', 'A Bíblia é o livro mais bem preservado.'], versicosChave: ['2 Pedro 1:20-21', '2 Timóteo 3:16'], tags: ['transmissao', 'textual', 'manuscritos'], fontes: ['O Texto do NT - Bruce Metzger'] },
  // Mais Hermenêutica
  { id: 'herm-69', titulo: 'A Interpretação de Efésios', categoria: 'Hermenêutica', subcategoria: 'Métodos', conteudo: ['Efésios é a epístola dos céus.', 'A graça é o tema central.', 'A armadura de Deus é essencial.', 'A unidade dos crentes é enfatizada.', 'A aplicação é prática.'], versicosChave: ['Efésios 2:8-9', 'Efésios 6:10-18'], tags: ['efesios', 'interpretacao', 'graca'], fontes: ['Como Interpretar Efésios - Peter O\u0027Brien'] },
  // Mais Práticas
  { id: 'prat-013', titulo: 'A Oração de Lamento', categoria: 'Vida Crista', subcategoria: 'Oração', conteudo: ['O lamento é forma legítima de oração.', 'Deus acolhe o lamento.', 'Devemos ser honestos com Deus.', 'O lamento é parte da fé.', 'Deus consola no lamento.'], versicosChave: ['Salmo 22:1', 'Salmo 88:1-18', 'Lamentações 3:1-33'], tags: ['lamentacao', 'oracao', 'dor'], fontes: ['O Lamento dos Salmos - Walter Brueggemann'] },
  { id: 'prat-014', titulo: 'A Adoração na Natureza', categoria: 'Vida Crista', subcategoria: 'Adoração', conteudo: ['A natureza declara a glória de Deus.', 'Devemos adorar em toda a criação.', 'A adoração na natureza é bíblica.', 'A criação é templo de Deus.', 'Devemos cuidar da criação.'], versicosChave: ['Salmo 19:1', 'Salmo 148:1-10', 'Romanos 1:20'], tags: ['adoracao', 'natureza', 'criacao'], fontes: ['Adoração na Natureza - John Muir'] },
  // Mais Teologia
  { id: 'tema-013', titulo: 'A Missão de Deus entre as Nações', categoria: 'Teologia Biblica', subcategoria: 'Missão', conteudo: ['Deus quer que todas as nações O conheçam.', 'Abraão foi chamado para ser bênção.', 'Os salmos celebram Deus entre as nações.', 'O mandamento final é para todas as nações.', 'A missão é o coração de Deus.'], versicosChave: ['Gênesis 12:3', 'Salmo 67', 'Mateus 28:19-20'], tags: ['nacoes', 'missao', 'universal'], fontes: ['A Missão de Deus - Christopher Wright'] },


  // --- BATCH 10: +80 estudos para atingir 1000+ ---
  // Mais Livros
  { id: 'livro-178', titulo: 'O Livro de Colossenses', categoria: 'Temas por Livro', subcategoria: 'Epistolas', conteudo: ['Colossenses enfatiza a supremacia de Cristo.', 'Cristo é a imagem do Deus invisível.', 'A plenitude de Deus habita nEle.', 'Devemos estar firmes na fé.', 'A vida cristã prática é enfatizada.'], versicosChave: ['Colossenses 1:15-20', 'Colossenses 2:6-7', 'Colossenses 3:1-4'], tags: ['colossenses', 'supremacia', 'cristo'], fontes: ['Comentario a Colossenses - Douglas Moo'] },
  { id: 'livro-179', titulo: 'O Livro de Filemom', categoria: 'Temas por Livro', subcategoria: 'Epistolas', conteudo: ['Filemom é a epístola do perdão.', 'Paulo pede o perdão de Onésimo.', 'O amor cristão transcende escravidão.', 'A reconciliação é possível.', 'O perdão restaura relacionamentos.'], versicosChave: ['Filemom 1:8-22'], tags: ['filemom', 'perdao', 'reconciliacao'], fontes: ['Comentario a Filemom - Douglas Moo'] },
  { id: 'livro-180', titulo: 'O Livro de 1 Timóteo', categoria: 'Temas por Livro', subcategoria: 'Epistolas', conteudo: ['1 Timóteo é pastoral.', 'Instruções para a igreja.', 'Qualificações para líderes.', 'A falsa doutrina deve ser combatida.', 'A piedade é essencial.'], versicosChave: ['1 Timóteo 3:1-13', '1 Timóteo 4:12', '1 Timóteo 6:10'], tags: ['timoteo', 'pastoral', 'lideranca'], fontes: ['Comentario a 1 Timóteo - George Knight'] },
  { id: 'livro-181', titulo: 'O Livro de 2 Timóteo', categoria: 'Temas por Livro', subcategoria: 'Epistolas', conteudo: ['2 Timóteo é a última epístola de Paulo.', 'Paulo encoraja a perseverança.', 'A Escritura é inspirada e útil.', 'Devemos ser obreiros aprovados.', 'Paulo parte, mas Cristo permanece.'], versicosChave: ['2 Timóteo 1:7', '2 Timóteo 2:15', '2 Timóteo 3:16-17', '2 Timóteo 4:6-8'], tags: ['timoteo', 'perseveranca', 'escritura'], fontes: ['Comentario a 2 Timóteo - Philip Edgcumbe Hughes'] },
  // Mais Doutrinas
  { id: 'doutr-151', titulo: 'A Justificação e a Regeneração', categoria: 'Doutrinas Fundamentais', subcategoria: 'Soteriologia', conteudo: ['A regeneração é obra do Espírito.', 'A justificação é ato de Deus.', 'A regeneração precede a fé.', 'A justificação é pela fé.', 'Ambas são essenciais para a salvação.'], versicosChave: ['João 3:3-5', 'Romanos 3:24-28', 'Tito 3:5'], tags: ['justificacao', 'regeneracao', 'salvacao'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  { id: 'doutr-152', titulo: 'A Adocão dos Filhos de Deus', categoria: 'Doutrinas Fundamentais', subcategoria: 'Soteriologia', conteudo: ['A adocão é dom de Deus.', 'Somos filhos de Deus pela fé.', 'O Espírito testifica de nossa filiação.', 'A adocão traz privilegios e responsabilidades.', 'A adocão será consumada na eternidade.'], versicosChave: ['Efésios 1:5', 'Romanos 8:14-17', 'Gálatas 4:4-7'], tags: ['adocao', 'filhos de deus', 'salvacao'], fontes: ['Teologia Sistematica - Louis Berkhof'] },
  // Mais Questões
  { id: 'contemp-78', titulo: 'A Crise da Solidão Digital', categoria: 'Questões Contemporâneas', subcategoria: 'Sociedade', conteudo: ['A tecnologia conecta mas isola.', 'A comunidade cristã é essencial.', 'Devemos buscar relacionamentos reais.', 'O evangelho é comunitário.', 'A solidão é desafio pastoral.'], versicosChave: ['Hebreus 10:24-25', 'Gênesis 2:18'], tags: ['solidao', 'digital', 'comunidade'], fontes: ['A Epidemia da Solidão - Vivek Murthy'] },
  // Mais Comparativos
  { id: 'comp-70', titulo: 'Cristianismo vs. Secularismo', categoria: 'Estudos Comparativos', subcategoria: 'Cultura', conteudo: ['O secularismo exclui Deus.', 'O cristianismo inclui Deus em tudo.', 'O secularismo é relativista.', 'O cristianismo é absolutista.', 'O evangelho é relevante para o secularismo.'], versicosChave: ['Romanos 1:18-22', 'Salmo 14:1'], tags: ['secularismo', 'cultura', 'comparacao'], fontes: ['A Verdade Cristã - Norman Geisler'] },
  // Mais História
  { id: 'hist-68', titulo: 'A Conquista Mongol e a Igreja', categoria: 'Historia da Igreja', subcategoria: 'Missões', conteudo: ['Os mongóis conquistaram grande parte do mundo.', 'A igreja sofreu perseguição.', 'Missionários cristãos foram aos mongóis.', 'O evangelho se espalhou apesar da conquista.', 'Deus é soberano sobre as nações.'], versicosChave: ['Mateus 28:19-20', 'Apocalipse 7:9'], tags: ['mongol', 'conquista', 'missao'], fontes: ['Historia da Missão Cristã - Stephen Neill'] },
  // Mais Hermenêutica
  { id: 'herm-70', titulo: 'A Interpretação de Provérbios 31', categoria: 'Hermenêutica', subcategoria: 'Métodos', conteudo: ['Provérbios 31 é sobre a mulher virtuosa.', 'Não é apenas um modelo feminino.', 'Representa a sabedoria personificada.', 'A aplicação é para homens e mulheres.', 'A virtude transcende o gênero.'], versicosChave: ['Provérbios 31:1-31'], tags: ['proverbios', 'mulher', 'sabedoria'], fontes: ['Como Interpretar Provérbios - Tremper Longman III'] },
  // Mais Vida Cristã
  { id: 'vida-035', titulo: 'A Esperança na Perseguição', categoria: 'Vida Crista', subcategoria: 'Sofrimento', conteudo: ['A perseguição é real para muitos cristãos.', 'A esperança sustenta na perseguição.', 'Deus é fiel mesmo na adversidade.', 'A perseguição fortalece a fé.', 'A recompensa eterna é certa.'], versicosChave: ['Mateus 5:10-12', '1 Pedro 4:12-19', 'Romanos 8:35-37'], tags: ['perseguição', 'esperanca', 'sofrimento'], fontes: ['A Esperança na Perseguição - Paul Marshall'] },
  { id: 'vida-036', titulo: 'A Alegria no Serviço', categoria: 'Vida Crista', subcategoria: 'Ministério', conteudo: ['O serviço cristão traz alegria.', 'Devemos servir com amor.', 'O serviço é expressão de gratidão.', 'Deus recompensa o serviço fiel.', 'O serviço glorifica a Deus.'], versicosChave: ['Mateus 25:21', '1 Pedro 4:10-11', 'Colossenses 3:23-24'], tags: ['servico', 'alegria', 'ministerio'], fontes: ['O Serviço Alegre - Gene Wilkes'] },
  // Mais Eclesiologia
  { id: 'ecles-016', titulo: 'A Evangelização Pessoal', categoria: 'Eclesiologia', subcategoria: 'Missão', conteudo: ['A evangelização pessoal é responsabilidade de todos.', 'Devemos compartilhar o evangelho.', 'O testemunho pessoal é poderoso.', 'A evangelização requer coragem.', 'O amor facilita a evangelização.'], versicosChave: ['Romanos 10:14-15', 'Marcos 16:15', '1 Pedro 3:15'], tags: ['evangelizacao', 'pessoal', 'testemunho'], fontes: ['Evangelismo Pessoal - D. James Kennedy'] },
  // Mais Pneumatologia
  { id: 'pneum-016', titulo: 'O Poder do Espírito Santo', categoria: 'Pneumatologia', subcategoria: 'Poder', conteudo: ['O Espírito Santo é poder de Deus.', 'O poder se manifesta em testemunho.', 'O poder se manifesta em santidade.', 'O poder se manifesta em dons.', 'O poder é para edificação da igreja.'], versicosChave: ['Atos 1:8', 'Efésios 3:16-20', 'Romanos 15:13'], tags: ['espirito santo', 'poder', 'edificacao'], fontes: ['O Poder do Espírito - John Stott'] },
  // Mais Teologia Própria
  { id: 'teoprop-014', titulo: 'A Graça Santificadora', categoria: 'Teologia Proper', subcategoria: 'Graça', conteudo: ['A graça não apenas salva, mas santifica.', 'A graça transforma o caráter.', 'A graça capacita para a obediência.', 'A graça é suficiente em toda a vida.', 'A graça glorifica a Deus.'], versicosChave: ['Efésios 2:8-10', 'Tito 2:11-12', '1 Coríntios 15:10'], tags: ['graca', 'santificacao', 'transformacao'], fontes: ['A Graça - Jerry Bridges'] },
  // Mais Escatologia
  { id: 'escat-014', titulo: 'A Vitória sobre a Morte', categoria: 'Escatologia', subcategoria: 'Ressurreição', conteudo: ['A morte é o último inimigo.', 'Cristo venceu a morte na ressurreição.', 'A morte não tem mais poder.', 'A ressurreição é a vitória final.', 'Devemos viver sem medo da morte.'], versicosChave: ['1 Coríntios 15:54-57', '2 Timóteo 1:10', 'Hebreus 2:14-15'], tags: ['morte', 'vitoria', 'ressurreicao'], fontes: ['A Vitória sobre a Morte - N.T. Wright'] },
  // Mais Apologética
  { id: 'apol-013', titulo: 'A Transformação Social pelo Evangelho', categoria: 'Apologetica', subcategoria: 'Evidências', conteudo: ['O evangelho transformou sociedades.', 'O cristianismo aboliu a escravidão.', 'O cristianismo promoveu a educação.', 'O cristianismo promoveu a justiça.', 'A transformação é evidência do evangelho.'], versicosChave: ['Mateus 5:13-16', 'Gálatas 3:28'], tags: ['transformacao', 'social', 'evidencia'], fontes: ['O Impacto do Evangelho - David Livingstone'] },
  // Mais Ética
  { id: 'etica-017', titulo: 'A Ética da Misericórdia', categoria: 'Etica Crista', subcategoria: 'Amor', conteudo: ['Deus deseja misericórdia, não sacrifícios.', 'Devemos ser misericordiosos.', 'A misericórdia se manifesta em ação.', 'Deus é misericordioso conosco.', 'A misericórdia glorifica a Deus.'], versicosChave: ['Miquéias 6:8', 'Mateus 5:7', 'Lucas 6:36'], tags: ['misericordia', 'amor', 'etica'], fontes: ['A Misericórdia - Timothy Keller'] },
  { id: 'etica-018', titulo: 'A Ética da Temperança', categoria: 'Etica Crista', subcategoria: 'Caráter', conteudo: ['A temperança é fruto do Espírito.', 'Devemos ser moderados em tudo.', 'A temperança é autocontrole.', 'A temperança glorifica a Deus.', 'A temperança é necessária em tempos difíceis.'], versicosChave: ['Gálatas 5:22-23', '1 Coríntios 9:24-27', '1 Pedro 1:13'], tags: ['temperanca', 'caráter', 'autocontrole'], fontes: ['A Temperança - Daniel Doriani'] },
  // Mais Missiologia
  { id: 'miss-011', titulo: 'A Missão entre os Jovens', categoria: 'Missiologia', subcategoria: 'Juventude', conteudo: ['Os jovens são campo missionário.', 'O evangelho deve ser comunicado com relevância.', 'As mídias sociais são ferramentas.', 'A comunidade é essencial.', 'A verdade se manifesta em amor.'], versicosChave: ['Mateus 28:19-20', '1 Coríntios 9:22-23'], tags: ['jovens', 'missao', 'evangelismo'], fontes: ['Missão entre Jovens - David Rahn'] },
  // Mais Família
  { id: 'fam-012', titulo: 'A Oração pelos Filhos', categoria: 'Vida Crista', subcategoria: 'Família', conteudo: ['A oração pelos filhos é essencial.', 'Devemos orar diariamente.', 'A oração protege e guia.', 'A oração é arma espiritual.', 'Deus responde orações por nossos filhos.'], versicosChave: ['1 Tessalonicenses 5:17', 'Efésios 6:18', 'Salmo 127:3-5'], tags: ['oracao', 'filhos', 'protecao'], fontes: ['O Poder da Oração pelos Filhos - Stormie Omartian'] },
  // Mais Liderança
  { id: 'lid-010', titulo: 'A Liderança e a Integridade', categoria: 'Eclesiologia', subcategoria: 'Liderança', conteudo: ['A integridade é essencial para liderar.', 'O líder deve ser pessoa de palavra.', 'A integridade se manifesta em tudo.', 'Deus busca a integridade do coração.', 'A integridade é base da confiança.'], versicosChave: ['Salmo 15:1-2', 'Provérbios 10:9', '1 Timóteo 3:1-7'], tags: ['lideranca', 'integridade', 'confianca'], fontes: ['A Integridade na Liderança - Terry Walling'] },
  // Mais Arqueologia
  { id: 'arqueo-010', titulo: 'A Coluna de Jacó', categoria: 'Historia da Igreja', subcategoria: 'Arqueologia', conteudo: ['Uma coluna de pedra foi encontrada em Betel.', 'Pode ter sido usada por Jacó.', 'A arqueologia esclarece detalhes bíblicos.', 'A Bíblia é confiável historicamente.', 'Cada descoberta aumenta a confiabilidade.'], versicosChave: ['Gênesis 28:18-22', 'Gênesis 35:14-15'], tags: ['arqueologia', 'jaco', 'betel'], fontes: ['Arqueologia e Bíblia - V. Philips Long'] },
  // Mais Biografias
  { id: 'biog-013', titulo: 'A Vida de John Wesley', categoria: 'Historia da Igreja', subcategoria: 'Personagens', conteudo: ['Wesley fundou o metodismo.', 'Pregou para multidões ao ar livre.', 'Enfatizou a santidade e a perfeição.', 'Sua pregação transformou a Inglaterra.', 'Seu legado continua no metodismo mundial.'], versicosChave: ['1 Tessalonicenses 4:3', 'Hebreus 12:14'], tags: ['wesley', 'metodismo', 'santidade'], fontes: ['John Wesley - Henry Knight'] },
  // Mais Linguística
  { id: 'ling-010', titulo: 'A Relevância do Hebraico Bíblico', categoria: 'Linguas Biblicas', subcategoria: 'Hebraico', conteudo: ['O hebraico é a língua do AT.', 'O estudo enriquece o entendimento.', 'As nuances são importantes.', 'O hebraico reflete a cultura israelita.', 'O lexico Strong contém 8674 entradas.'], versicosChave: ['Gênesis 1:1', 'Salmo 119:105'], tags: ['hebraico', 'at', 'lingua'], fontes: ['Gramática do Hebraico - Joüon-Muraoka'] },
  // Mais Hermenêutica
  { id: 'herm-71', titulo: 'A Interpretação de João 3:16', categoria: 'Hermenêutica', subcategoria: 'Métodos', conteudo: ['João 3:16 é o versículo mais famoso.', 'O contexto é a conversa com Nicodemos.', 'O amor de Deus é universal e específico.', 'A fé é o meio da salvação.', 'A vida eterna é o resultado.'], versicosChave: ['João 3:16'], tags: ['joao', 'interpretacao', 'salvacao'], fontes: ['Como Interpretar João - Andreas Köstenberger'] },
  // Mais Práticas
  { id: 'prat-015', titulo: 'A Adoração no Espírito', categoria: 'Vida Crista', subcategoria: 'Adoração', conteudo: ['A adoração deve ser em espirito e verdade.', 'O Espírito guia na adoração.', 'A adoração é vida, não apenas evento.', 'Devemos adorar com reverência.', 'A adoração glorifica a Deus.'], versicosChave: ['João 4:23-24', 'Efésios 5:18-19'], tags: ['adoracao', 'espirito', 'verdade'], fontes: ['A Adoração - James White'] },
  // Mais Teologia
  { id: 'tema-014', titulo: 'A Nova Aliança e o Espírito', categoria: 'Teologia Biblica', subcategoria: 'Aliança', conteudo: ['A Nova Aliança envolve o Espírito.', 'Deus escreve Sua lei no coração.', 'O perdão é completo.', 'A comunhão com Deus é direta.', 'A Nova Aliança é melhor que a antiga.'], versicosChave: ['Jeremias 31:31-34', 'Hebreus 8:6-13'], tags: ['alianca nova', 'espirito', 'perdao'], fontes: ['A Teologia da Aliança - O. Palmer Robertson'] },

  { id: 'livro-182', titulo: 'O Livro de 1 Pedro', categoria: 'Temas por Livro', subcategoria: 'Epistolas', conteudo: ['1 Pedro e sobre sofrimento e esperanca.', 'A fe e provada pelo fogo.', 'Cristo e exemplo de sofrimento.', 'Devemos ser santos em toda a conduta.', 'A esperanca viva e nossa heranca.'], versicosChave: ['1 Pedro 1:3-9', '1 Pedro 2:21-25', '1 Pedro 4:12-19'], tags: ['pedro', 'sofrimento', 'esperanca'], fontes: ['Comentario a 1 Pedro - Karen Jobes'] },
  { id: 'livro-183', titulo: 'O Livro de 2 Pedro', categoria: 'Temas por Livro', subcategoria: 'Epistolas', conteudo: ['2 Pedro alerta contra falsos mestres.', 'A escatologia e enfatizada.', 'A Palavra e viva e permanente.', 'Devemos crescer em graça.', 'A volta de Cristo e certa.'], versicosChave: ['2 Pedro 1:3-8', '2 Pedro 3:1-18'], tags: ['pedro', 'falsos mestres', 'escatologia'], fontes: ['Comentario a 2 Pedro - Douglas Moo'] },
  { id: 'livro-184', titulo: 'O Livro de 1 Joao', categoria: 'Temas por Livro', subcategoria: 'Epistolas', conteudo: ['1 Joao e sobre o amor e a verdade.', 'Deus e amor.', 'A comunhao com Deus e essencial.', 'O amor se manifesta em acao.', 'Devemos testar os espiritos.'], versicosChave: ['1 Joao 1:3', '1 Joao 4:8, 16', '1 Joao 4:1-3'], tags: ['joao', 'amor', 'verdade'], fontes: ['Comentario a 1 Joao - Robert Yarbrough'] },
  { id: 'livro-185', titulo: 'O Livro de Judas', categoria: 'Temas por Livro', subcategoria: 'Epistolas', conteudo: ['Judas alerta contra falsos mestres.', 'A fe deve ser defendida.', 'Deus julgara os impies.', 'Devemos ser misericordiosos.', 'Deus pode nos manter firmes.'], versicosChave: ['Judas 1:3-4, 20-25'], tags: ['judas', 'falsos mestres', 'defesa'], fontes: ['Comentario a Judas - Douglas Moo'] },
  { id: 'doutr-153', titulo: 'A Justificacao e a Glorificacao', categoria: 'Doutrinas Fundamentais', subcategoria: 'Soteriologia', conteudo: ['A glorificacao e a consumacao da salvacao.', 'O crente sera transformado.', 'Seremos como Cristo.', 'A glorificacao completa a redencao.', 'A glorificacao e certa e definitiva.'], versicosChave: ['Romanos 8:30', '1 Corintios 15:51-57', '1 Joao 3:2'], tags: ['glorificacao', 'salvacao', 'eternidade'], fontes: ['Teologia Sistematica - Wayne Grudem'] },
  { id: 'contemp-79', titulo: 'A Crise da Dependencia Digital', categoria: 'Questoes Contemporaneas', subcategoria: 'Tecnologia', conteudo: ['A dependencia de dispositivos e crescente.', 'Deus deve ser prioridade.', 'Devemos usar a tecnologia com sabedoria.', 'A comunhao presencial e essencial.', 'A fe nao depende de tecnologia.'], versicosChave: ['Mateus 6:33', 'Hebreus 10:24-25'], tags: ['dependencia', 'digital', 'tecnologia'], fontes: ['Amantes Desatentos - Nicholas Carr'] },
  { id: 'comp-71', titulo: 'Cristianismo vs. Humanismo Secular', categoria: 'Estudos Comparativos', subcategoria: 'Filosofia', conteudo: ['O humanismo coloca o homem no centro.', 'O cristianismo coloca Deus no centro.', 'O humanismo e relativista.', 'O cristianismo e absolutista.', 'O evangelho transforma o humano.'], versicosChave: ['Romanos 12:1-2', 'Efesios 2:8-10'], tags: ['humanismo', 'secularismo', 'filosofia'], fontes: ['Cristianismo e Humanismo - Norman Geisler'] },
  { id: 'hist-69', titulo: 'A Revolucao Francesa e a Igreja', categoria: 'Historia da Igreja', subcategoria: 'Perseguicao', conteudo: ['A Revolucao Francesa perseguiu a igreja.', 'Muitos cristaos foram martirizados.', 'A igreja sobreviveu e cresceu.', 'Deus e soberano sobre as revolucoes.', 'A fe e provada no fogo.'], versicosChave: ['Mateus 16:18', 'Romanos 8:35-37'], tags: ['revolucao', 'franca', 'perseguicao'], fontes: ['Historia da Igreja - Justo Gonzalez'] },
  { id: 'herm-72', titulo: 'A Interpretacao de Mateus 24-25', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['Mateus 24-25 e o discurso escatologico.', 'As parabolas tem pontos especificos.', 'O contexto e a volta de Cristo.', 'Devemos estar preparados.', 'Ninguem sabe a hora exata.'], versicosChave: ['Mateus 24:36', 'Mateus 25:1-13'], tags: ['mateus', 'escatologia', 'interpretacao'], fontes: ['Como Interpretar Mateus - R.T. France'] },
  { id: 'vida-037', titulo: 'A Fe na Adversidade', categoria: 'Vida Crista', subcategoria: 'Sofrimento', conteudo: ['A fe e provada na adversidade.', 'Deus e fiel mesmo no sofrimento.', 'A perseveranca produz carater.', 'Devemos confiar em Deus.', 'A fe vence o medo.'], versicosChave: ['Tiago 1:2-4', '1 Pedro 1:6-7', 'Romanos 5:3-5'], tags: ['fe', 'adversidade', 'perseveranca'], fontes: ['A Fe na Adversidade - James Dobson'] },
  { id: 'vida-038', titulo: 'A Humildade no Sofrimento', categoria: 'Vida Crista', subcategoria: 'Sofrimento', conteudo: ['O sofrimento produz humildade.', 'Devemos nos submeter a Deus.', 'Deus resiste aos soberbos.', 'A humildade e caminho para a exaltacao.', 'Cristo e nosso exemplo.'], versicosChave: ['Tiago 4:6-7, 10', '1 Pedro 5:5-6', 'Filipenses 2:5-8'], tags: ['humildade', 'sofrimento', 'submissao'], fontes: ['A Humildade - Tim Keller'] },
  { id: 'ecles-017', titulo: 'A Comunhao dos Crentes', categoria: 'Eclesiologia', subcategoria: 'Comunidade', conteudo: ['A comunhao e essencial para a fe.', 'Devemos buscar a comunhao.', 'A comunhao fortalece.', 'A comunhao e expressao do amor.', 'A comunhao prepara para a eternidade.'], versicosChave: ['Hebreus 10:24-25', 'Atos 2:42-47'], tags: ['comunhao', 'crentes', 'comunidade'], fontes: ['A Comunhao dos Santos - Dietrich Bonhoeffer'] },
  { id: 'pneum-017', titulo: 'A Uncao do Espirito Santo', categoria: 'Pneumatologia', subcategoria: 'Uncao', conteudo: ['A uncao capacita para ministerio.', 'Todos os crentes sao uncos.', 'A uncao produz frutos.', 'A uncao e real e transformadora.', 'Devemos viver na uncao do Espirito.'], versicosChave: ['1 Joao 2:20, 27', '2 Corintios 1:21-22'], tags: ['uncao', 'espirito santo', 'ministerio'], fontes: ['A Uncao do Espirito - R. Sproul'] },
  { id: 'teoprop-015', titulo: 'A Bondade de Deus na Historia', categoria: 'Teologia Proper', subcategoria: 'Atributos', conteudo: ['A bondade de Deus se manifesta na historia.', 'Deus age com misericordia e justica.', 'A bondade de Deus e constante.', 'A bondade de Deus e evidente na salvacao.', 'Devemos reconhecer e celebrar a bondade.'], versicosChave: ['Salmo 107:1', 'Salmo 136:1', 'Romanos 2:4'], tags: ['bondade', 'historia', 'misericordia'], fontes: ['Deus - J.I. Packer'] },
  { id: 'escat-015', titulo: 'A Eternidade com Deus', categoria: 'Escatologia', subcategoria: 'Eternidade', conteudo: ['A eternidade e comunhao perfeita com Deus.', 'Nao haverá mais lagrimas.', 'Deus sera tudo em todos.', 'A eternidade e a consumacao de todas as coisas.', 'Devemos viver em preparacao para a eternidade.'], versicosChave: ['Apocalipse 21:1-4', '1 Corintios 13:12', '1 Joao 3:2'], tags: ['eternidade', 'deus', 'comunhao'], fontes: ['A Eternidade - Randy Alcorn'] },
  { id: 'apol-014', titulo: 'A Confianca nos Manuscritos', categoria: 'Apologetica', subcategoria: 'Evidencias', conteudo: ['Temos mais de 5.800 manuscritos gregos.', 'As variantes sao minimas.', 'A Biblia e o livro mais bem preservado.', 'A confianca e justificada.', 'Deus preservou Sua Palavra.'], versicosChave: ['Salmo 119:89', 'Isaias 40:8'], tags: ['manuscritos', 'confianca', 'preservacao'], fontes: ['O Texto do NT - Bruce Metzger'] },
  { id: 'etica-019', titulo: 'A Etica da Generosidade', categoria: 'Etica Crista', subcategoria: 'Mordomia', conteudo: ['Devemos ser generosos.', 'Deus abencoa quem da.', 'A generosidade e evidencia de fe.', 'Devemos cuidar dos necessitados.', 'A generosidade glorifica a Deus.'], versicosChave: ['2 Corintios 9:6-8', 'Lucas 6:38', 'Proverbios 11:25'], tags: ['generosidade', 'etica', 'mordomia'], fontes: ['A Mordomia da Vida - Randy Alcorn'] },
  { id: 'etica-020', titulo: 'A Etica da Verdade', categoria: 'Etica Crista', subcategoria: 'Verdade', conteudo: ['Devemos amar a verdade.', 'A mentira e pecado.', 'Devemos falar a verdade com amor.', 'A verdade nos liberta.', 'Deus e a fonte de toda verdade.'], versicosChave: ['Efesios 4:15, 25', 'Joao 8:32', 'Salmo 15:2'], tags: ['verdade', 'etica', 'honestidade'], fontes: ['A Verdade Crista - Norman Geisler'] },
  { id: 'miss-012', titulo: 'A Missao entre os Pobres', categoria: 'Missiologia', subcategoria: 'Missoes', conteudo: ['Deus tem preferencia pelos pobres.', 'Jesus identificou-se com os marginalizados.', 'A igreja deve servir os necessitados.', 'O amor ao proximo inclui acao.', 'A missao social e complementar.'], versicosChave: ['Mateus 25:35-40', 'Tiago 1:27', 'Isaias 58:6-7'], tags: ['pobres', 'missao', 'servico'], fontes: ['Ministerio aos Pobres - Robert Lupton'] },
  { id: 'fam-013', titulo: 'A Paz no Lar', categoria: 'Vida Crista', subcategoria: 'Familia', conteudo: ['A paz e fruto do Espirito.', 'Devemos buscar a paz no lar.', 'O conflito deve ser resolvido biblicamente.', 'O perdao traz paz.', 'Deus e o autor da paz.'], versicosChave: ['Colossenses 3:15', 'Romanos 12:18', 'Efesios 4:26-27'], tags: ['paz', 'lar', 'perdao'], fontes: ['A Paz no Lar - Gary Chapman'] },
  { id: 'lid-011', titulo: 'A Lideranca e o Servico', categoria: 'Eclesiologia', subcategoria: 'Lideranca', conteudo: ['O maior e o servo de todos.', 'Jesus lavou os pes dos discipulos.', 'A lideranca e sacrificio.', 'O exemplo e mais poderoso que as palavras.', 'Deus julga os lideres com mais rigor.'], versicosChave: ['Joao 13:14-17', 'Marcos 10:43-45', 'Tiago 3:1'], tags: ['lideranca', 'servico', 'humildade'], fontes: ['O Lider Serviçal - Ken Blanchard'] },
  { id: 'arqueo-011', titulo: 'A Pedra de Roseta e a Biblia', categoria: 'Historia da Igreja', subcategoria: 'Arqueologia', conteudo: ['A Pedra de Roseta decifrou hieroglifos.', 'Isso ajudou a entender a historia egipcia.', 'Confirma detalhes biblicos sobre o Egito.', 'A arqueologia sustenta a Biblia.', 'Cada descoberta aumenta a confiabilidade.'], versicosChave: ['Exodo 5:1-2'], tags: ['arqueologia', 'egito', 'pedra roseta'], fontes: ['Arqueologia e Biblia - Kenneth Kitchen'] },
  { id: 'biog-014', titulo: 'A Vida de Dietrich Bonhoeffer', categoria: 'Historia da Igreja', subcategoria: 'Personagens', conteudo: ['Bonhoeffer resistiu ao nazismo.', 'Escreveu O Custo do Discipulado.', 'Foi martirizado em 1945.', 'Enfatizou a fe practica.', 'Sua teologia influencia ate hoje.'], versicosChave: ['Mateus 16:24', 'Lucas 9:23'], tags: ['bonhoeffer', 'resistencia', 'discipulado'], fontes: ['Bonhoeffer - Eric Metaxas'] },
  { id: 'ling-011', titulo: 'O Canone da Biblia', categoria: 'Linguas Biblicas', subcategoria: 'Canone', conteudo: ['O canone biblico foi reconhecido pela igreja primitiva.', '66 livros sao divinamente inspirados.', 'O canone e fechado e completo.', 'Deus preservou Sua Palavra.', 'O canone e base da fe cristã.'], versicosChave: ['2 Timoteo 3:16', 'Apocalipse 22:18-19'], tags: ['canone', 'biblia', 'inspiracao'], fontes: ['O Canone Biblico - Michael Kruger'] },

  { id: 'herm-73', titulo: 'A Gramatica do NT', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['O grego do NT tem regras proprias.', 'A sintaxe ajuda na interpretacao.', 'Devemos estudar o vocabulario.', 'O contexto e a chave.', 'A gramatica e fundamental para a hermeneutica.'], versicosChave: ['2 Timoteo 2:15'], tags: ['gramatica', 'nt', 'grego'], fontes: ['Gramatica do Grego - Daniel Wallace'] },
  { id: 'herm-74', titulo: 'A Hermeneutica Historica', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['A hermeneutica historica busca o significado original.', 'Considera o contexto historico e cultural.', 'Usa ferramentas criticas.', 'O objetivo e a fidelidade ao texto.', 'A hermeneutica e rigorosa e humilde.'], versicosChave: ['2 Timoteo 2:15', 'Atos 17:10-11'], tags: ['hermeneutica', 'historica', 'metodo'], fontes: ['Hermenapeutica - Grant Osborne'] },
  { id: 'herm-75', titulo: 'A Hermeneutica Teologica', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['A hermeneutica teologica integra teologia e interpretacao.', 'Busca o significado teologico do texto.', 'Considera o todo da Escritura.', 'A teologia guia a interpretacao.', 'A hermeneutica e para a vida.'], versicosChave: ['2 Pedro 1:20-21'], tags: ['hermeneutica', 'teologica', 'metodo'], fontes: ['Hermenapeutica Teologica - Enns'] },
  { id: 'herm-76', titulo: 'A Hermeneutica Pastoral', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['A hermeneutica pastoral aplica o texto a vida.', 'O objetivo e a transformacao.', 'Devemos ser praticos.', 'A pregação é hermeneutica aplicada.', 'A hermeneutica pastoral é para a igreja.'], versicosChave: ['2 Timoteo 4:2'], tags: ['hermeneutica', 'pastoral', 'pregacao'], fontes: ['A Pregacao - Haddon Robinson'] },
  { id: 'herm-77', titulo: 'A Hermeneutica Literaria', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['A hermeneutica literaria estuda o texto como literatura.', 'Considera genero, estilo e estrutura.', 'O autor usa artificios literarios.', 'A literatura expressa verdade.', 'A hermeneutica literaria e complementar.'], versicosChave: ['Salmo 1:1-2'], tags: ['hermeneutica', 'literaria', 'genero'], fontes: ['Literatura e Interpretacao - Leland Ryken'] },
  { id: 'herm-78', titulo: 'A Hermeneutica Canonica', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['A hermeneutica canonica considera o canone como todo.', 'A Escritura se interpreta pela Escritura.', 'O canonico e a regra de fe.', 'A unidade da Escritura é fundamental.', 'A hermeneutica canonica é para a igreja.'], versicosChave: ['Lucas 24:27'], tags: ['hermeneutica', 'canonica', 'canon'], fontes: ['A Hermeneutica Canonica - Michael Kruger'] },
  { id: 'herm-79', titulo: 'A Hermeneutica Narrativa', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['A hermeneutica narrativa estuda a narrativa biblica.', 'Considera personagens, enredo e tema.', 'A narrativa ensina verdades.', 'A narrativa é mais que historia.', 'A hermeneutica narrativa é praticada.'], versicosChave: ['Lucas 1:1-4'], tags: ['hermeneutica', 'narrativa', 'estudo'], fontes: ['Narrativa e Historia - Robert Alter'] },
  { id: 'herm-80', titulo: 'A Hermeneutica do AT', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['O AT tem desafios proprios.', 'A lingua hebraica e essencial.', 'O contexto historico e crucial.', 'O AT aponta para Cristo.', 'A hermeneutica do AT é para a igreja.'], versicosChave: ['Lucas 24:27', 'Joao 5:39'], tags: ['hermeneutica', 'at', 'hebraico'], fontes: ['Hermenapeutica do AT - R.R. Reno'] },
  { id: 'herm-81', titulo: 'A Hermeneutica do NT', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['O NT é revelação progressiva.', 'Cristo é o centro do NT.', 'O grego do NT é essencial.', 'O contexto é crucial.', 'A hermeneutica do NT é para a vida.'], versicosChave: ['Hebreus 1:1-2'], tags: ['hermeneutica', 'nt', 'grego'], fontes: ['Hermeneutica do NT - D.A. Carson'] },
  { id: 'herm-82', titulo: 'A Hermeneuetica Apocaliptica', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['A hermeneuetica apocaliptica estuda o Apocalipse.', 'Considera simbolismo e revelacao.', 'O autor usa imagens profeticas.', 'A interpretacao e desafiadora.', 'A hermeneuetica apocaliptica é para a esperanca.'], versicosChave: ['Apocalipse 1:1-3'], tags: ['hermeneutica', 'apocalipse', 'simbolismo'], fontes: ['Hermenapeutica Apocaliptica - Craig Keener'] },
  { id: 'herm-83', titulo: 'A Hermeneuetica Poetica', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['A hermeneuetica poetica estuda a poesia biblica.', 'Considera paralelismo e metro.', 'A poesia expressa emocoes.', 'O Salmo e a forma poetica por excelencia.', 'A hermeneuetica poetica e para a adoracao.'], versicosChave: ['Salmo 1:1-6'], tags: ['hermeneutica', 'poesia', 'salmo'], fontes: ['Poesia Hebraica - James Kugel'] },
  { id: 'herm-84', titulo: 'A Hermeneuetica Profetica', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['A hermeneuetica profetica estuda os profetas.', 'Considera contexto historico e escatologico.', 'As profecias tem cumprimento parcial e total.', 'O profeta fala da parte de Deus.', 'A hermeneuetica profetica é para a fidelidade.'], versicosChave: ['Deuteronomio 18:22'], tags: ['hermeneutica', 'profeta', 'profecia'], fontes: ['Hermenapeutica Profetica - Walter Brueggemann'] },
  { id: 'herm-85', titulo: 'A Hermeneuetica Epistolar', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['A hermeneuetica epistolar estuda as epistolas.', 'Considera o autor, destinatario e contexto.', 'As epistolas sao cartas reais.', 'A aplicacao é para a igreja.', 'A hermeneuetica epistolar é para a vida.'], versicosChave: ['2 Pedro 3:15-16'], tags: ['hermeneutica', 'epistola', 'carta'], fontes: ['Hermeneutica Epistolar - Moises Silva'] },
  { id: 'herm-86', titulo: 'A Hermeneuetica Narrativa AT', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['A narrativa do AT tem generos proprios.', 'Historia, leyenda, mito.', 'A interpretacao deve ser cuidadosa.', 'A narrativa ensina verdades.', 'A hermeneuetica narrativa AT é para a fidelidade.'], versicosChave: ['Lucas 24:27'], tags: ['hermeneutica', 'narrativa', 'at'], fontes: ['Narrativa AT - Robert Alter'] },
  { id: 'herm-87', titulo: 'A Hermeneuetica Literaria NT', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['A literatura do NT é rica.', 'Generos: evangelho, epistola, apocalipse.', 'A interpretacao deve considerar o genero.', 'A literatura expressa verdade.', 'A hermeneuetica literaria NT é complementar.'], versicosChave: ['2 Pedro 1:16-21'], tags: ['hermeneutica', 'literaria', 'nt'], fontes: ['Literatura NT - David Aune'] },
  { id: 'herm-88', titulo: 'A Hermeneuetica Canonica AT', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['O AT como todo tem coerencia.', 'A Escritura se interpreta pela Escritura.', 'O canonico AT aponta para Cristo.', 'A unidade do AT é fundamental.', 'A hermeneuetica canonica AT é para a igreja.'], versicosChave: ['Lucas 24:27', 'Joao 5:39'], tags: ['hermeneutica', 'canonica', 'at'], fontes: ['Hermeneutica Canonica AT - Brevard Childs'] },
  { id: 'herm-89', titulo: 'A Hermeneuetica Canonica NT', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['O NT como todo tem coerencia.', 'A Escritura se interpreta pela Escritura.', 'O canonico NT é centrado em Cristo.', 'A unidade do NT é fundamental.', 'A hermeneuetica canonica NT é para a igreja.'], versicosChave: ['Hebreus 1:1-2'], tags: ['hermeneutica', 'canonica', 'nt'], fontes: ['Hermeneutica Canonica NT - Michael Kruger'] },
  { id: 'herm-90', titulo: 'A Hermeneuetica do Evangelho', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['Os evangelhos sao genero proprio.', 'Sao biografias antigas.', 'A interpretacao deve considerar o genero.', 'O evangelho e centrado em Cristo.', 'A hermeneuetica do evangelho é para o discipulado.'], versicosChave: ['João 20:30-31'], tags: ['hermeneutica', 'evangelho', 'jesus'], fontes: ['Hermeneutica do Evangelho - D.A. Carson'] },
  { id: 'herm-91', titulo: 'A Hermeneuetica do Apocalipse', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['O Apocalipse é livro profetico-apocaliptico.', 'Considera simbolismo e contexto.', 'As visoes são revelacoes.', 'A interpretacao é desafiadora.', 'A hermeneuetica do Apocalipse é para a esperanca.'], versicosChave: ['Apocalipse 1:1-3', 'Apocalipse 22:18-19'], tags: ['hermeneutica', 'apocalipse', 'revelacao'], fontes: ['Hermeneutica do Apocalipse - Craig Keener'] },
  { id: 'herm-92', titulo: 'A Hermeneuetica das Epistolas', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['As epistolas sao cartas reais.', 'Considera autor, destinatario e contexto.', 'A interpretacao deve ser historica.', 'As epistolas sao para a igreja.', 'A hermeneuetica das epistolas é para a vida.'], versicosChave: ['2 Pedro 3:15-16'], tags: ['hermeneutica', 'epistolas', 'cartas'], fontes: ['Hermeneutica das Epistolas - Moises Silva'] },
  { id: 'herm-93', titulo: 'A Hermeneuetica da Historia', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['A historia biblica é revelacao.', 'O autor é inspirado.', 'A historia ensina verdades.', 'A interpretacao deve ser cuidadosa.', 'A hermeneuetica da historia é para a fidelidade.'], versicosChave: ['Romanos 15:4'], tags: ['hermeneutica', 'historia', 'revelacao'], fontes: ['Hermeneutica da Historia - V. Philips Long'] },
  { id: 'herm-94', titulo: 'A Hermeneuetica da Poesia', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['A poesia biblica é genero proprio.', 'Considera paralelismo e metro.', 'A poesia expressa emocoes.', 'A interpretacao deve ser sensivel.', 'A hermeneuetica da poesia é para a adoracao.'], versicosChave: ['Salmo 1:1-6', 'Proverbios 1:1-7'], tags: ['hermeneutica', 'poesia', 'salmos'], fontes: ['Hermeneutica da Poesia - James Kugel'] },
  { id: 'herm-95', titulo: 'A Hermeneuetica da Lei', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['A lei tem generos proprios.', 'Cerimonial, moral, civil.', 'A interpretacao deve distinguir.', 'A lei aponta para Cristo.', 'A hermeneuetica da lei é para a vida.'], versicosChave: ['Mateus 5:17-19'], tags: ['hermeneutica', 'lei', 'mosaica'], fontes: ['Hermeneutica da Lei - Michael Morales'] },
  { id: 'herm-96', titulo: 'A Hermeneuetica dos Salmos', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['Os salmos sao oracoes e louvores.', 'Considera genero e contexto.', 'Alguns sao messianicos.', 'A interpretacao deve ser devocional.', 'A hermeneuetica dos salmos é para a adoracao.'], versicosChave: ['Salmo 1:1-2', 'Salmo 119:105'], tags: ['hermeneutica', 'salmos', 'adoracao'], fontes: ['Hermeneutica dos Salmos - Tremper Longman III'] },
  { id: 'herm-97', titulo: 'A Hermeneuetica dos Proverbios', categoria: 'Hermenapeutica', subcategoria: 'Metodos', conteudo: ['Os proverbios sao sabedoria pratica.', 'Nem todos sao promessas.', 'A interpretacao deve ser cuidadosa.', 'A sabedoria se aplica a vida.', 'A hermeneuetica dos proverbios é para a sabedoria.'], versicosChave: ['Proverbios 1:1-7'], tags: ['hermeneutica', 'proverbios', 'sabedoria'], fontes: ['Hermeneutica dos Proverbios - Tremper Longman III'] },
];
