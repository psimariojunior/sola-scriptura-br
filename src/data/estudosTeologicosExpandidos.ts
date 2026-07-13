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
  // ═══════════════════════════════════════════════════════════════════════════
  // 1. DOUTRINAS FUNDAMENTAIS — TEOLOGIA PROPER (50 estudos)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'dp-001',
    titulo: 'A Existência de Deus — Argumentos Clássicos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A questão da existência de Deus é uma das mais debatidas na história da filosofia e da teologia. Os argumentos clássicos buscam demonstrar a existência de Deus pela razão humana.',
      'O argumento cosmológico parte do fato de que tudo que começa a existir tem uma causa. Ao retrocedermos na cadeia causal, chegamos a uma Primeira Causa não causada — Deus.',
      'O argumento teleológico observa a ordem e o propósito na criação como evidência de um Designer inteligente. A complexidade do universo aponta para um Criador sábio.',
      'O argumento ontológico, formulado por Anselmo, parte da concepção de Deus como o Ser maior do que o qual nada pode ser pensado. Se Deus existe apenas na mente, poderíamos conceber um ser maior.',
      'O argumento moral postula que a existência de valores morais objetivos exige um fundamento transcendente. Sem Deus, os valores morais são meramente convenções sociais.'
    ],
    versicosChave: ['Romanos 1:20', 'Salmos 14:1', 'Hebreus 11:6', 'Atos 17:28'],
    tags: ['existência de Deus', 'argumentos cosmológico', 'argumento ontológico', 'argumento teleológico', 'apologética'],
    fontes: ['Tomás de Aquino, Suma Teológica', 'Anselmo, Proslogion', 'C.S. Lewis, Credo', 'Alvin Plantinga, God and Other Minds']
  },
  {
    id: 'dp-002',
    titulo: 'A Trindade — Mistério Central da Fé',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A doutrina da Trindade é o mistério central da fé cristã: um único Deus em três pessoas — Pai, Filho e Espírito Santo. Cada pessoa é plenamente Deus.',
      'A formulação trinitária emergiu dos debates cristológicos dos séculos III e IV. O Concílio de Nicéia estabeleceu que o Filho é homoousios com o Pai.',
      'Agostinho desenvolveu a analogia psicológica: a mente se conhece e se ama, gerando verbo e amor. Assim, o Pai gera o Filho, e o Espírito procede do amor mútuo.',
      'A Trindade não é contradição lógica — é paradoxo que transcende a razão. Deus não é três pessoas no sentido humano, mas três relações pessoais em uma essência divina.',
      'A economia da Trindade se manifesta na salvação: o Pai planeja, o Filho executa, o Espírito aplica. Na criação, o Pai cria pelo Filho no Espírito.'
    ],
    versicosChave: ['Mateus 28:19', '2 Coríntios 13:14', 'Gênesis 1:26', 'João 1:1-3'],
    tags: ['trindade', 'pneumatologia', 'cristologia', 'homoousios', 'Niceia'],
    fontes: ['Agostinho, De Trinitate', 'Atanásio, Contra os Arianos', 'Karl Barth, Church Dogmatics I/1']
  },
  {
    id: 'dp-003',
    titulo: 'A Transcendência e Imanência de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'Deus é ao mesmo tempo infinitamente distinto da criação (transcendente) e profundamente presente nela (imanente). Este paradoxo é fundamental para compreender Deus.',
      'A transcendência significa que Deus está além de todas as limitações criadas — tempo, espaço, matéria. É o Deus que habita a luz inacessível.',
      'A imanência significa que Deus está presente em todos os lugares, sustentando a existência do universo. Atos 17:28 declara: Nele vivemos, nos movemos e existimos.',
      'O equilíbrio entre transcendência e imanência evita o panteísmo e o deísmo. O Deus bíblico é pessoal e próximo, mas também sagrado e transcendente.',
      'A transcendência gera reverência e adoração, enquanto a imanência gera intimidade e confiança. A oração é possível porque Deus é imanente.'
    ],
    versicosChave: ['Jeremias 23:23-24', 'Salmos 139:7-12', 'Isaías 57:15', 'Atos 17:28'],
    tags: ['transcendência', 'imanência', 'panteísmo', 'deísmo', 'apofatismo'],
    fontes: ['Agostinho, Confissões', 'Pseudo-Dionísio, Nomes Divinos', 'Paul Tillich, Systematic Theology']
  },
  {
    id: 'dp-004',
    titulo: 'A Onisciência de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A onisciência de Deus significa que Ele sabe todas as coisas — passado, presente e futuro — de forma perfeita e simultânea.',
      'Deus conhece todas as possibilidades e atualidades. Ele sabe o que é, o que foi, o que será e o que poderia ser.',
      'A questão do livre-arbítrio parece conflitar com a onisciência. Se Deus sabe o que faremos, somos realmente livres? A resposta clássica é que Deus sabe sem causar.',
      'A teologia processual propõe que Deus conhece o futuro como possibilidades, não como certezas absolutas.',
      'A onisciência é fonte de consolação: Ele conhece nossas necessidades antes que as peçamos. É também fonte de temor: nada se esconde dEle.'
    ],
    versicosChave: ['Salmos 139:1-6', '1 João 3:20', 'Isaías 46:9-10', 'Hebreus 4:13'],
    tags: ['onisciência', 'omnisciência', 'livre-arbítrio', 'soberania', 'conhecimento de Deus'],
    fontes: ['Agostinho, Confissões', 'Calvino, Institutas I.1', 'Charles Hartshorne, The Divine Relativity']
  },
  {
    id: 'dp-005',
    titulo: 'A Omnipotência de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A omnipotência de Deus significa que Ele pode fazer tudo o que é logicamente possível. Deus não pode fazer o logicamente impossível.',
      'A Bíblia declara que para Deus nada é impossível. Deus criou o universo do nada, sustenta tudo pelo poder da Sua palavra e realizará todas as Suas promessas.',
      'A questão do mal é o principal desafio à omnipotência. Se Deus pode tudo e é bom, por que permite o sofrimento? A teodiceia responde que Deus permite o mal para um bem maior.',
      'A omnipotência não é poder arbitrário, mas poder governado pela sabedoria e pelo amor. Deus não faz o que é contrário à Sua natureza.',
      'Para o crente, a omnipotência é fonte de confiança: Posso todas as coisas naquele que me fortalece.'
    ],
    versicosChave: ['Jeremias 32:17', 'Efésios 1:19-20', 'Lucas 1:37', 'Gênesis 18:14'],
    tags: ['omnipotência', 'poder de Deus', 'teodiceia', 'problema do mal', 'creatio ex nihilo'],
    fontes: ['Tomás de Aquino, Suma Teológica I, q.25', 'C.S. Lewis, O Problema do Sofrimento']
  },
  {
    id: 'dp-006',
    titulo: 'A Santidade de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A santidade de Deus é Seu atributo mais elevado — a separação absoluta de tudo o que é impuro e a perfeição moral absoluta.',
      'A santidade implica Sua justiça: Ele não pode tolerar o pecado. A lei moral é reflexo da Sua santidade.',
      'A ira santa de Deus não é emoção humana, mas Sua oposição moral ao pecado. É expressão de Sua santidade em confronto com o que é mau.',
      'A santidade se manifesta em Sua transcendência e em Sua imanência. O Espírito Santo é o Santo de Deus que habita no crente.',
      'A reverência é a resposta adequada. O temor do Senhor não é medo servil, mas admiração mista com temor, reconhecendo a grandeza divina.'
    ],
    versicosChave: ['Isaías 6:3', '1 Pedro 1:15-16', 'Hebreus 12:14', 'Apocalipse 4:8'],
    tags: ['santidade de Deus', 'justiça divina', 'ira santa', 'serafins', 'santificação'],
    fontes: ['Rudolf Otto, O Sagrado', 'Gordon Kaufman, God the Problem', 'John Murray, Redemption Accomplished']
  },
  {
    id: 'dp-007',
    titulo: 'A Justiça de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A justiça de Deus é a perfeição moral pela qual Ele age em conformidade com a Sua própria natureza santa.',
      'A justiça divina se manifesta de duas formas: retributiva (castigar o pecado) e distributiva (dar a cada um o que merece).',
      'Paulo em Romanos 3 resolve o conflito entre justiça e misericórdia: Deus é justo E justificador daquele que crê em Jesus.',
      'A justificação pela fé é declaração divina de que o crente é justo pela justiça de Cristo imputada.',
      'A justiça de Deus é também o fundamento da esperança escatológica: Deus restaurará todas as coisas e punirá o mal.'
    ],
    versicosChave: ['Romanos 3:21-26', 'Salmos 89:14', 'Isaías 61:8', 'Atos 17:31'],
    tags: ['justiça de Deus', 'justificação', 'propiciação', 'imputação', 'juízo final'],
    fontes: ['Agostinho, De Spiritu et Littera', 'John Stott, The Cross of Christ']
  },
  {
    id: 'dp-008',
    titulo: 'A Misericórdia e Graça de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A misericórdia de Deus é Seu amor para com os miseráveis. A graça é Seu amor gratuito e imerecido.',
      'Misericórdia é não nos dar o que merecemos; graça é nos dar o que não merecemos. Ambas são expressões do amor divino.',
      'A graça tem dimensões: preveniente, regeneradora, justificante, santificadora e glorificadora.',
      'Sola gratia é principio reformado: a salvação é pela graça de Deus, não pelas obras humanas.',
      'A graça não anula a responsabilidade humana — ela a capacita. A graça é gratuita mas não custosa: custou a vida do Filho.'
    ],
    versicosChave: ['Efésios 2:4-5', 'Tito 3:5', 'Romanos 5:8', '1 Pedro 1:10'],
    tags: ['graça', 'misericórdia', 'sola gratia', 'graça preveniente', 'graça regeneradora'],
    fontes: ['Agostinho, De Gratia et Libero Arbitrio', 'Lutero, De servo arbitrio']
  },
  {
    id: 'dp-009',
    titulo: 'A Eternidade e Imutabilidade de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'Deus é eterno — não tem começo nem fim. O tempo é criação de Deus, mas Ele não está sujeito ao tempo.',
      'A imutabilidade significa que Ele não muda em Sua natureza, caráter, propósitos ou promessas.',
      'A imutabilidade não é estagnação — é perfeição constante. Deus não precisa mudar porque é perfeito.',
      'A eternidade é fonte de consolação: Suas promessas são eternas, Seu amor não falha.',
      'A imutabilidade é fundamento de esperança: em um mundo de mudança, Deus é a rocha imóvel.'
    ],
    versicosChave: ['Malaquias 3:6', 'Hebreus 13:8', 'Salmos 90:2', 'Isaías 40:28'],
    tags: ['eternidade', 'imutabilidade', 'imortalidade', 'perfeição divina'],
    fontes: ['Agostinho, Confissões XI', 'A.W. Tozer, The Knowledge of the Holy']
  },
  {
    id: 'dp-010',
    titulo: 'A Soberania de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A soberania de Deus é Seu domínio absoluto sobre toda a criação. Ele governa todas as coisas segundo a Sua vontade.',
      'A soberania se manifesta em decreto (propósito eterno) e providência (execução no tempo).',
      'O calvinismo enfatiza a soberania absoluta; o arminianismo preserva a liberdade humana.',
      'A soberania não anula a responsabilidade humana. Deus usa meios humanos para realizar Seus propósitos.',
      'Para o crente, a soberania é fonte de segurança: nada acontece fora do controle de Deus.'
    ],
    versicosChave: ['Efésios 1:11', 'Romanos 9:19-24', 'Salmos 115:3', 'Daniel 4:35'],
    tags: ['soberania', 'providência', 'decreto divino', 'calvinismo', 'arminianismo'],
    fontes: ['Calvino, Institutas I.16', 'R.C. Sproul, The Holiness of God']
  },
  {
    id: 'dp-011',
    titulo: 'O Amor de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'O amor de Deus é o atributo que fundamenta todos os outros. Deus não apenas ama — Ele é amor (1 João 4:8).',
      'O amor divino é incondicional, inesgotável e universal. Ele amou o mundo de tal maneira que deu o Seu Filho.',
      'O amor de Deus não depende da dignidade do objeto — Ele ama os pecadores. Deus nos amou quando ainda éramos inimigos.',
      'O amor se manifesta na criação, na providência, na redenção e na glificação final.',
      'O crente é chamado a refletir o amor divino: amar a Deus e ao próximo como a si mesmo.'
    ],
    versicosChave: ['1 João 4:8', 'João 3:16', 'Romanos 5:8', 'Efésios 3:17-19'],
    tags: ['amor de Deus', 'agape', 'amor incondicional', 'amor sacrificial'],
    fontes: ['Anders Nygren, Agape and Eros', 'C.S. Lewis, The Four Loves']
  },
  {
    id: 'dp-012',
    titulo: 'A Fidelidade de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A fidelidade de Deus significa que Ele cumpre todas as Suas promessas. Ele é fiel mesmo quando somos infiéis.',
      'A aliança de Deus com Israel é modelo de fidelidade: apesar da desobediência do povo, Deus mantém Suas promessas.',
      'A fidelidade divina é a base da confiança do crente: podemos confiar porque Deus é fiel.',
      'A fidelidade se estende a todas as promessas — desde a criação até a consumação final.',
      'A响应 à fidelidade de Deus é obediência e adoração. O crente responde ao amor com amor, à fidelidade com lealdade.'
    ],
    versicosChave: ['Deuteronômio 7:9', 'Lamentações 3:22-23', '2 Timóteo 2:13', '1 Coríntios 1:9'],
    tags: ['fidelidade', 'aliança', 'promessas de Deus', 'confiabilidade'],
    fontes: ['O. Palmer Robertson, The Christ of the Covenants', 'J.I. Packer, Knowing God']
  },
  {
    id: 'dp-013',
    titulo: 'A Graça Comum',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A graça comum é a bondade de Deus para com todos os seres humanos, independentemente de sua fé.',
      'Ela se manifesta na providência: chuva, sol, alimento, governos, cultura, conhecimento.',
      'A graça comum limita os efeitos do pecado e permite que a civilização exista.',
      'Ela é distinta da graça salvífica — não salva, mas sustenta e beneficia.',
      'Calvino enfatizou a graça comum como base para engajamento cultural e transformação social.'
    ],
    versicosChave: ['Mateus 5:45', 'Atos 14:17', 'Romanos 2:4', 'Gênesis 9:1-3'],
    tags: ['graça comum', 'providência', 'Calvino', 'transformação social'],
    fontes: ['Calvino, Institutas II.2.12', 'Abraham Kuyper, Lectures on Calvinism']
  },
  {
    id: 'dp-014',
    titulo: 'A Graça Especial (Salvífica)',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A graça especial é a obra redentora de Deus que salva os eleitos do pecado e da morte.',
      'Ela inclui: chamado eficaz, regeneração, fé, arrependimento, justificação, santificação e glorificação.',
      'A graça especial é soberana — Deus a confere a quem Ele deseja, não por mérito humano.',
      'Ela é suficiente e eficaz — não pode ser resistida quando Deus a aplica.',
      'A graça especial é o fundamento da certeza da salvação: Deus guardará aqueles que Ele chamou.'
    ],
    versicosChave: ['Efésios 2:8-9', 'Tito 3:5', 'Romanos 8:29-30', 'João 6:44'],
    tags: ['graça especial', 'graça salvífica', 'eleição', 'chamado eficaz'],
    fontes: ['Calvino, Institutas III.24', 'Jonathan Edwards, On the Freedom of the Will']
  },
  {
    id: 'dp-015',
    titulo: 'A Predestinação',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A predestinação é o decreto eterno de Deus de salvar uns e condenar outros. É tema central no debate calvinista-arminiano.',
      'O calvinismo sustenta a predestinação incondicional: Deus escolhe antes da fundação do mundo, sem referência ao mérito.',
      'O arminianismo sustenta a predestinação condicional: Deus prevê quem crerá e os predestina baseado na Sua presciência.',
      'A predestinação não anula a responsabilidade humana — ambos são verdadeiros na Bíblia.',
      'A predestinação é fonte de humildade e gratidão: a salvação é dom de Deus, não conquista humana.'
    ],
    versicosChave: ['Efésios 1:4-5', 'Romanos 8:29-30', '1 Pedro 1:1-2', 'Atos 13:48'],
    tags: ['predestinação', 'eleição', 'calvinismo', 'arminianismo', 'presciência'],
    fontes: ['Calvino, Institutas III.21', 'Arminius, Obras', 'Roger Olson, Against Calvinism']
  },
  {
    id: 'dp-016',
    titulo: 'A Providência de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A providência de Deus é Seu governo contínuo de todas as coisas para realizar Seus propósitos.',
      'Deus governa tudo: nações, natureza, história, destinos individuais. Nada escapa ao Seu controle.',
      'A providência não é fatalismo — Deus usa meios humanos. O crente ora e age porque Deus governa através de instrumentos.',
      'A providência inclui permissão do mal: Deus permite o pecado sem causá-lo, para um bem maior.',
      'A providência é fonte de paz: nada acontece por acaso. Tudo está sob o controle de Deus.'
    ],
    versicosChave: ['Romanos 8:28', 'Efésios 1:11', 'Salmos 104', 'Provérbios 16:9'],
    tags: ['providência', 'governo divino', 'soberania', 'controle total'],
    fontes: ['Calvino, Institutas I.16-19', 'John Piper, Providence']
  },
  {
    id: 'dp-017',
    titulo: 'A Revelação Geral de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A revelação geral é o conhecimento de Deus disponível a todos os seres humanos através da criação e da consciência.',
      'Romanos 1:19-20 declara que a criação revela a existência e os atributos de Deus de forma clara e inescusável.',
      'A consciência moral é evidência de Deus no coração humano — o senso de certo e errado aponta para um Legislador divino.',
      'A revelação geral é suficiente para condenação (deixando o homem sem desculpa) mas não para salvação.',
      'A revelação especial (Escritura e Cristo) é necessária para conhecimento salvífico de Deus.'
    ],
    versicosChave: ['Romanos 1:19-20', 'Salmos 19:1-4', 'Atos 14:17', 'Romanos 2:14-15'],
    tags: ['revelação geral', 'creação', 'consciência', 'apologética'],
    fontes: ['Calvino, Institutas I.5-6', 'John Calvin, Knowledge of God the Creator']
  },
  {
    id: 'dp-018',
    titulo: 'A Revelação Especial — Escritura e Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A revelação especial é Deus se comunicando diretamente — através da Escritura e da pessoa de Jesus Cristo.',
      'Cristo é a Palavra definitiva de Deus — a revelação plena e final. Deus falou de muitas maneiras, mas agora pelo Filho.',
      'A Escritura é Palavra de Deus inspirada, inerrante e suficiente. É regra de fé e prática.',
      'A Escritura e Cristo são inseparáveis: a Bíblia testifica de Cristo, e Cristo autoriza a Bíblia.',
      'A revelação especial é necessária porque a revelação geral é insuficiente para salvação.'
    ],
    versicosChave: ['Hebreus 1:1-2', '2 Timóteo 3:16', 'João 1:1-14', '2 Pedro 1:20-21'],
    tags: ['revelação especial', 'Escritura', 'Cristo', 'inspiração', 'inerrância'],
    fontes: ['B.B. Warfield, Inspiration and Authority', 'Karl Barth, Church Dogmatics I/1']
  },
  {
    id: 'dp-019',
    titulo: 'O Livre-Arbítrio e a Graça',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'O livre-arbítrio é a capacidade humana de escolher entre alternativas. A graça de Deus opera na escolha humana.',
      'O calvinismo sustenta que o livre-arbítrio é escravo — o homem caído não pode escolher a Deus sem a graça regeneradora.',
      'O arminianismo sustenta que a graça preveniente capacita a escolha humana — Deus antecipa Sua graça.',
      'O debate não é se Deus é soberano ou se o homem é livre — ambos são verdadeiros. O mistério permanece.',
      'A prática cristã pressupõe a responsabilidade humana: arrependei-vos, crede, obedecei.'
    ],
    versicosChave: ['Deuteronômio 30:19', 'João 7:17', 'Efésios 2:8-9', 'Filipenses 2:12-13'],
    tags: ['livre-arbítrio', 'graça', 'determinismo', 'calvinismo', 'arminianismo'],
    fontes: ['Jonathan Edwards, Freedom of the Will', 'Roger Olson, Against Calvinism']
  },
  {
    id: 'dp-020',
    titulo: 'A Natureza do Pecado',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'O pecado é rebelião contra Deus — transgressão da Sua lei e ofensa à Sua santidade.',
      'O pecado tem origem na queda (Gênesis 3) — a humanidade herdou uma natureza corrupta.',
      'O pecado é universal: todos pecaram e estão destituídos da glória de Deus.',
      'O pecado afeta toda a pessoa: mente (cegueira espiritual), coração (desejos distorcidos), vontade (incapacidade moral), corpo (mortalidade).',
      'O pecado é grave porque ofende a um Deus santo e separa o homem de Deus.'
    ],
    versicosChave: ['Romanos 3:23', 'Romanos 6:23', 'Gênesis 3:1-24', '1 João 3:4'],
    tags: ['pecado', 'queda', 'natureza pecaminosa', 'separação de Deus'],
    fontes: ['Henri Blocher, Original Sin', 'Calvino, Institutas II.1-3']
  },
  {
    id: 'dp-021',
    titulo: 'A Maldição do Pecado',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A maldição do pecado é a consequência da desobediência humana — morte, sofrimento, separação de Deus.',
      'A maldição se estende a toda a criação — a terra foi amaldiçoada por causa do pecado humano.',
      'Cristo resgatou a humanidade da maldição da lei, fazendo-se maldição por nós na cruz.',
      'A maldição é superada pela bênção em Cristo — a redenção restaura a comunhão com Deus.',
      'A maldição final é o lago de fogo — separação eterna de Deus para os que rejeitam a salvação.'
    ],
    versicosChave: ['Gênesis 3:14-19', 'Gálatas 3:13', 'Romanos 8:20-22', 'Apocalipse 20:10'],
    tags: ['maldição', 'consequências do pecado', 'Gênesis 3', 'redenção da maldição'],
    fontes: ['Henri Blocher, Original Sin', 'John Murray, Redemption Accomplished']
  },
  {
    id: 'dp-022',
    titulo: 'A Expiação de Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A expiação é o ato pelo qual Cristo morreu pelos pecados da humanidade, reconciliando Deus e os homens.',
      'Existem múltiplas teorias: substituição penal, satisfação, ransom, vitória (Christus Victor).',
      'A substituição penal sustenta que Cristo sofreu o castigo que merecíamos. Ele morreu em nosso lugar.',
      'A teoria da satisfação, de Anselmo, sustenta que a ofensa à honra de Deus exigia satisfação perfeita.',
      'Christus Victor enfatiza que Cristo venceu Satanás, a morte e o inferno na cruz.'
    ],
    versicosChave: ['Isaías 53:5', '1 Pedro 2:24', '1 João 4:10', 'Romanos 5:8'],
    tags: ['expiação', 'propiciação', 'satisfação', 'Christus Victor', 'substituição'],
    fontes: ['Anselmo, Cur Deus Homo', 'Gustaf Aulén, Christus Victor', 'John Stott, The Cross of Christ']
  },
  {
    id: 'dp-023',
    titulo: 'A Ressurreição e a Nova Criação',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A ressurreição dos mortos é doutrina central — Cristo ressuscitou, e nós também ressuscitaremos.',
      'A nova criação é a promessa final: novos céus e nova terra, onde a justiça habita.',
      'A ressurreição não é imaterialidade — é transformação corporal. Cristo ressuscitou com corpo glorificado.',
      'A nova criação não é destruição mas restauração — Deus renovará todas as coisas.',
      'A esperança escatológica motiva santificação: se temos esta esperança, purificamo-nos.'
    ],
    versicosChave: ['1 Coríntios 15:20-28', 'Apocalipse 21:1-4', 'Romanos 8:18-25', 'Filipenses 3:20-21'],
    tags: ['ressurreição', 'nova criação', 'escatologia', 'céu', 'restauração'],
    fontes: ['N.T. Wright, The Resurrection of the Son of God', 'G.K. Beale, The Temple and the Church\'s Mission']
  },
  {
    id: 'dp-024',
    titulo: 'O Juízo Final',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'O juízo final é certeza bíblica: todos comparecerão diante do tribunal de Cristo.',
      'Para os crentes, o juízo é de recompensa — não de condenação. Cristo é o juiz justo que recompensa a fidelidade.',
      'Para os incrédulos, o juízo é de condenação eterna — separação de Deus.',
      'O juízo é justo: Deus julga conforme as obras, mas a salvação é por graça.',
      'O juízo é motivo de vigilância: vivamos de modo que não tenhamos vergonha na Sua vinda.'
    ],
    versicosChave: ['Mateus 25:31-46', 'Romanos 14:10-12', '2 Coríntios 5:10', 'Apocalipse 20:11-15'],
    tags: ['juízo final', 'escatologia', 'condenação', 'recompensa', 'tribunal de Cristo'],
    fontes: ['G.E. Ladd, A Theology of the New Testament', 'Robert Mounce, The Book of Revelation']
  },
  {
    id: 'dp-025',
    titulo: 'O Inferno e a Morte Eterna',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'O inferno é realidade bíblica — separação eterna de Deus para os que rejeitam a salvação.',
      'Existem diferentes visões: tortura eterna (tradição predominante), aniquilação (destruição final), universalismo (todos serão salvos).',
      'A Bíblia descreve o inferno como fogo, trevas, gemidos — símbolos de sofrimento e separação.',
      'O inferno é resultado da justiça de Deus: o pecado exige punição. Mas Deus não deseja a morte do ímpio.',
      'A salvação é offers a todos — Deus quer que todos sejam salvos. O inferno é a escolha humana, não o desejo divino.'
    ],
    versicosChave: ['Mateus 25:46', 'Apocalipse 20:10', '2 Tessalonicenses 1:9', '1 Timóteo 2:3-4'],
    tags: ['inferno', 'morte eterna', 'juízo', 'condenação', 'universalismo'],
    fontes: ['Edward Fudge, The Fire That Consumes', 'C.S. Lewis, The Great Divorce']
  },
  {
    id: 'dp-026',
    titulo: 'O Céu e a Glorificação',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'O céu é a comunhão eterna com Deus — a realização de todo desejo humano.',
      'A glorificação é a transformação final dos crentes — corpos glorificados, sem pecado, sem sofrimento.',
      'O céu não é nuvens e harpas — é a presença de Deus. Estar com Cristo é o céu.',
      'A nova terra é parte da esperança cristã — Deus renovará a criação, não a destruirá.',
      'A esperança do céu motiva a santidade: se temos esta herança, vivamos de modo digno.'
    ],
    versicosChave: ['Apocalipse 21:1-4', '1 Coríntios 15:42-57', 'Filipenses 3:20-21', 'João 14:1-3'],
    tags: ['céu', 'glorificação', 'nova terra', 'comunhão eterna', 'corpo glorificado'],
    fontes: ['N.T. Wright, Surprised by Hope', 'Randy Alcorn, Heaven']
  },
  {
    id: 'dp-027',
    titulo: 'A Escatologia Presente — Já mas Ainda Não',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A escatologia cristã é tensional: o Reino de Deus já está presente mas ainda não se consumou.',
      'O Reino já está presente em Cristo: Ele venceu Satanás, inaugurou o Reino, enviou o Espírito.',
      'O Reino ainda não se consumou: o pecado, a morte e o sofrimento ainda existem.',
      'A Igreja vive nesta tensão: já salvos mas ainda esperando a plena salvação.',
      'Esta tensão é.fonte de esperança e missionarismo — proclamamos o Reino que já começou e aguardamos o que virá.'
    ],
    versicosChave: ['Mateus 12:28', 'Marcos 1:15', 'Romanos 8:23', '1 Coríntios 15:20-26'],
    tags: ['já mas ainda não', 'Reino presente', 'escatologia', 'tensão escatológica'],
    fontes: ['G.E. Ladd, A Theology of the New Testament', 'Oscar Cullmann, Christ and Time']
  },
  {
    id: 'dp-028',
    titulo: 'Analogia Fidei — A Escritura Interpreta a Escritura',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Bibliologia',
    conteudo: [
      'A analogia da fé é princípio hermenêutico: partes da Bíblia devem ser interpretadas à luz de outras partes.',
      'A Bíblia tem unidade — Deus é o autor único de todas as Escrituras. Não há contradição real.',
      'Os textos mais claros devem guiar a interpretação dos mais difíceis.',
      'A analogia da fé evita interpretações isoladas que contradizem o ensino bíblico como um todo.',
      'Este princípio é fundamental para a hermenêutica reformada e para a ecumenicidade.'
    ],
    versicosChave: ['2 Pedro 1:20-21', '2 Timóteo 3:16-17', 'João 10:35', 'Lucas 24:27'],
    tags: ['analogia da fé', 'hermenêutica', 'unidade bíblica', 'interpretação'],
    fontes: ['Calvino, Institutas I.14', 'Geerhardus Vos, Biblical Theology']
  },
  {
    id: 'dp-029',
    titulo: 'Historicidade da Resurreição de Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Cristologia',
    conteudo: [
      'A historicidade da ressurreição é questão central para a fé cristã. Se Cristo não ressuscitou, vã é a fé.',
      'As evidências incluem: túmulo vazio, aparições múltiplas, transformação dos discípulos e origem da Igreja.',
      'As aparições foram a diversas pessoas: Pedro, os doze, mais de 500, Tiago, Paulo.',
      'A transformação dos discípulos é evidência poderosa — de Covardes a Mártires.',
      'Nenhuma explicação alternativa satisfaz todos os fatos: roubo do corpo, alucinação, mito.'
    ],
    versicosChave: ['1 Coríntios 15:3-8', 'Mateus 28:1-10', 'Lucas 24:13-35', 'João 20:24-29'],
    tags: ['ressurreição', 'evidências históricas', 'túmulo vazio', 'aparições'],
    fontes: ['N.T. Wright, The Resurrection of the Son of God', 'Gary Habermas, The Risen Jesus and Future Hope']
  },
  {
    id: 'dp-030',
    titulo: 'A Segunda Vinda de Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A segunda vinda de Cristo é promessa certa: Assim como o viram subir, assim voltarão.',
      'Será visível, gloriosa, poderosa e inesperada. Todos verão a vinda do Filho do Homem.',
      'Os sinais incluem: evangelização mundial, guerras, terremotes, apostasia, persegução.',
      'A segunda vinda é consumação da história — Cristo estabelecerá o Reino pleno.',
      'Vigiar e orar é a resposta adequada: não sabemos o dia nem a hora.'
    ],
    versicosChave: ['Mateus 24:30-31', '1 Tessalonicenses 4:16-17', 'Atos 1:11', 'Apocalipse 1:7'],
    tags: ['segunda vinda', 'parousia', 'escatologia', 'sinais', 'vigilância'],
    fontes: ['G.E. Ladd, The Blessed Hope', 'George Eldon Ladd, The Gospel of the Kingdom']
  },
  {
    id: 'dp-031',
    titulo: 'O Milênio — Reino Milenar de Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'O milênio é o período de 1000 anos mencionado em Apocalipse 20. Existem três visões principais.',
      'O pré-milenarismo sustenta que Cristo voltará antes do milênio, estabelecendo Seu reino visível na terra.',
      'O pós-milenarismo sustenta que o mundo será cristianizado antes do retorno de Cristo.',
      'O amilenarismo sustenta que o milênio é período espiritual simbólico — o reinho atual de Cristo no céu.',
      'A Bíblia não é clara sobre a ordem dos eventos — a unidade na fé é mais importante que acordo cronológico.'
    ],
    versicosChave: ['Apocalipse 20:1-6', 'Isaías 11:6-9', 'Revelação 20:4', '2 Pedro 3:10-13'],
    tags: ['milênio', 'pré-milenarismo', 'pós-milenarismo', 'amilenarismo'],
    fontes: ['Robert Gundry, The Church and the Tribulation', 'George Eldon Ladd, The Gospel of the Kingdom']
  },
  {
    id: 'dp-032',
    titulo: 'A Comunhão dos Santos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A comunhão dos santos é a unidade espiritual de todos os crentes em Cristo, vivos e mortos.',
      'Não há separação entre Igreja terrena e celestial — todos são um em Cristo.',
      'A comunhão se manifesta na oração, na adoração, no testemunho e na partilha de dons.',
      'Os santos falecidos continuam conosco em Cristo — não estão ausentes, mas presentes no Senhor.',
      'Esta comunhão é.fonte de fortalecimento: não estamos sozinhos — somos multidão de testemunhas.'
    ],
    versicosChave: ['Hebreus 12:1', 'Efésios 4:4-6', 'Romanos 12:4-5', '1 Coríntios 12:12-27'],
    tags: ['comunhão dos santos', 'Igreja invisível', 'unidade espiritual'],
    fontes: ['Calvino, Institutas IV.1', 'Henri de Lubac, Catholicism']
  },
  {
    id: 'dp-033',
    titulo: 'A Oração — Comunhão com Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'A oração é comunhão direta com Deus — falar e ouvir, pedir e agradecer, confessar e adorar.',
      'O modelo de oração é o Pai Nosso (Mateus 6:9-13) — adoração, petição, confissão, proteção.',
      'A oração não muda Deus — muda a pessoa que ora. Ela é meio de graça pelo qual crescemos em comunhão.',
      'A oração deve ser constante (1 Tessalonicenses 5:17), cheia de fé (Tiago 1:6) e submissa à vontade de Deus.',
      'O Espírito Santo intercede por nós com gemidos inexprimíveis (Romanos 8:26-27).'
    ],
    versicosChave: ['Mateus 6:9-13', '1 Tessalonicenses 5:17', 'Romanos 8:26-27', 'Tiago 5:16'],
    tags: ['oração', 'comunhão', 'Pai Nosso', 'intercessão', 'Espírito Santo'],
    fontes: ['Martin Luther, A Simple Way to Pray', 'Richard Foster, Prayer']
  },
  {
    id: 'dp-034',
    titulo: 'A Adoração — O Propósito da Vida',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'A adoração é reconhecer o valor supremo de Deus e responder com reverência, amor e obediência.',
      'A adoração não é apenas música — é toda a vida vivida para a glória de Deus.',
      'A adoração espiritual é em espírito e em verdade (João 4:23-24) — autêntica e fundamentada na verdade bíblica.',
      'A adoração coletiva na Igreja é central — não é opcional mas necessária.',
      'O céu é adoração eterna — a vida cristã é preparação para a adoração final.'
    ],
    versicosChave: ['João 4:23-24', 'Romanos 12:1-2', 'Salmos 95:6', 'Apocalipse 4:8-11'],
    tags: ['adoração', 'culto', 'glória de Deus', 'vida cristã'],
    fontes: ['John Piper, Let the Nations Be Glad', 'Ralph P. Martin, Worship in the Early Church']
  },
  {
    id: 'dp-035',
    titulo: 'O Discipulado — Seguindo a Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'O discipulado é seguir a Cristo como Senhor — não apenas crer, mas obedecer e transformar-se.',
      'Jesus chamou para seguir: Venhe depois de mim. O discipulado é relacionamento pessoal com Cristo.',
      'O custo do discipulado é alto: negar-se a si mesmo, tomar a cruz, perder a vida para encontrá-la.',
      'O discipulado é comunitário — não é individualismo. Fazemos discípulos em comunhão.',
      'O discipulado é processo de transformação à imagem de Cristo — crescer em graça e conhecimento.'
    ],
    versicosChave: ['Mateus 16:24', 'Lucas 9:23', 'Mateus 28:19-20', '2 Coríntios 3:18'],
    tags: ['discipulado', 'seguir a Cristo', 'cruz', 'transformação', 'comunidade'],
    fontes: ['Dietrich Bonhoeffer, O Custo do Discipulado', 'Dallas Willard, The Great Omission']
  },
  {
    id: 'dp-036',
    titulo: 'A Consciência — Guia Moral Interior',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ética Cristã',
    conteudo: [
      'A consciência é a faculdade moral que distingue certo de errado. É dom de Deus, mas pode ser educada.',
      'A consciência não é infalível — pode ser corrompida pelo pecado, pela cultura, pela falsa religião.',
      'A consciência deve ser formada pela Palavra de Deus — não apenas pela tradição ou sentimento.',
      'Paulo distingue boa consciência (formada pela verdade) de má consciência (defeituosa).',
      'A liberdade de consciência é direito cristão — ninguém deve ser forçado contra sua consciência.'
    ],
    versicosChave: ['Romanos 2:14-15', '1 Timóteo 1:5', 'Hebreus 9:14', '1 Coríntios 8:7'],
    tags: ['consciência', 'ética', 'liberdade de consciência', 'moralidade'],
    fontes: ['Calvino, Institutas III.20', 'Martin Luther, A Libertation do Livre Arbítrio']
  },
  {
    id: 'dp-037',
    titulo: 'A Santificação Progressiva',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A santificação progressiva é o crescimento contínuo em santidade pela graça de Deus.',
      'Não é perfeição instantânea mas processo gradual — morrer para o pecado e viver para a justiça.',
      'O meio da santificação inclui: Palavra de Deus, oração, comunhão dos santos, sacramentos, obediência.',
      'O Espírito Santo é o agente da santificação — Ele transforma a vida do crente.',
      'A santificação é cooperativa: Deus opera, o crente obedece.'
    ],
    versicosChave: ['1 Tessalonicenses 4:3', 'Filipenses 2:12-13', 'Hebreus 12:14', '2 Coríntios 3:18'],
    tags: ['santificação', 'crescimento espiritual', 'progresso', 'processo'],
    fontes: ['John Owen, Mortificação do Pecado', 'J.I. Packer, Keep in Step with the Spirit']
  },
  {
    id: 'dp-038',
    titulo: 'A Justificação — Declaração de Justiça',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A justificação é declaração judicial de Deus de que o pecador é justo pela fé em Cristo.',
      'Não é transformação moral (isso é santificação) — é mudança de status diante de Deus.',
      'A imputação é central: a justiça de Cristo é creditada ao crente; o pecado é creditado a Cristo.',
      'A fé é meio, não mérito. Somos justificados pela fé sem as obras da lei.',
      'A justificação é certeza: quem crê tem justiça de Deus e não será condenado.'
    ],
    versicosChave: ['Romanos 3:21-28', 'Gálatas 2:16', 'Efésios 2:8-9', 'Romanos 5:1'],
    tags: ['justificação', 'imputação', 'fé', 'justiça de Cristo', 'sola fide'],
    fontes: ['Lutero, Galatas Comentário', 'Michael Horton, Justification']
  },
  {
    id: 'dp-039',
    titulo: 'A adoção — Filhos de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A adoção é o ato pelo qual Deus nos torna Seus filhos — não por natureza, mas por graça.',
      'A adoção inclui: perdão, nova identidade, herança, acesso direto a Deus, assistência do Espírito.',
      'O Espírito Santo testifica com nosso espírito de que somos filhos de Deus (Romanos 8:16).',
      'A adoção é presente e futura: já somos filhos, mas aguardamos a plena manifestação.',
      'A adoção é fonte de segurança: nada pode nos separar do amor de Deus em Cristo.'
    ],
    versicosChave: ['Romanos 8:14-17', 'Gálatas 4:4-7', 'Efésios 1:5', '1 João 3:1-2'],
    tags: ['adoção', 'filiação divina', 'filhos de Deus', 'herança'],
    fontes: ['Calvino, Institutas III.17', 'J.I. Packer, Knowing God']
  },
  {
    id: 'dp-040',
    titulo: 'A Redenção — Compra da Liberdade',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A redenção é o ato pelo qual Cristo nos resgatou da escravidão do pecado pelo Seu sangue.',
      'A metáfora redentora vem do mercado de escravos — Cristo pagou o preço para nos libertar.',
      'O preço foi Sua própria vida — o sangue precioso de Cristo.',
      'A redenção é completa: passada (libertados do poder do pecado), presente (libertados da escravidão), futura (libertados da presença do pecado).',
      'A redenção é universal em offer mas eficaz nos eleitos.'
    ],
    versicosChave: ['Efésios 1:7', '1 Pedro 1:18-19', 'Colossenses 1:13-14', 'Efésios 2:12'],
    tags: ['redenção', 'resgate', 'sangue de Cristo', 'libertação'],
    fontes: ['John Murray, Redemption Accomplished and Applied', 'Calvino, Institutas II.16']
  },
  {
    id: 'dp-041',
    titulo: 'A Reconciliação — Restauração da Amizade',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A reconciliação é a restauração da relação entre Deus e os homens, que estava quebrada pelo pecado.',
      'O homem era inimigo de Deus — a reconciliação remove a hostilidade e restaura a amizade.',
      'Cristo é o meio da reconciliação: pela cruz, Ele satisfez a justiça divina e removeu o obstáculo.',
      'A reconciliação é iniciativa divina — Deus nos reconciliou consigo em Cristo.',
      'A reconciliação implica reconciliação mútua: reconciliados com Deus, devemos reconciliar uns com os outros.'
    ],
    versicosChave: ['2 Coríntios 5:18-20', 'Romanos 5:10', 'Efésios 2:14-16', 'Colossenses 1:19-22'],
    tags: ['reconciliação', 'inimizade', 'paz com Deus', 'ministério da reconciliação'],
    fontes: ['Calvino, Institutas II.16', 'John Stott, The Cross of Christ']
  },
  {
    id: 'dp-042',
    titulo: 'A Glorificação — Plenitude Final',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A glorificação é a etapa final da salvação — transformação completa à imagem de Cristo.',
      'Inclui: corpos glorificados, ausência total de pecado, plena presença de Deus.',
      'A glorificação é certa para todos os crentes — Deus começará e completará a boa obra.',
      'A glorificação é simultânea com a ressurreição — transformação instantânea.',
      'A glorificação é o culminar da obra redentora — a criação restaurada em plenitude.'
    ],
    versicosChave: ['Romanos 8:30', '1 Coríntios 15:51-57', 'Filipenses 3:20-21', '1 João 3:2'],
    tags: ['glorificação', 'transformação', 'corpo glorificado', 'consumação'],
    fontes: ['John Murray, Redemption Accomplished', 'N.T. Wright, Surprised by Hope']
  },
  {
    id: 'dp-043',
    titulo: 'A Fé — Confiança em Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A fé é confiança pessoal em Deus e em Sua Palavra — não apenas conhecimento intelectual.',
      'A fé inclui: conhecimento (assentimento), confiança (fidúcia) e compromisso (obediência).',
      'A fé é dom de Deus, não mérito humano — Deus a concede para que creiamos.',
      'A fé se prova pelas obras — não é sentimento subjetivo mas vida transformada.',
      'A fé é meio da salvação — pela fé recebemos a justiça de Cristo.'
    ],
    versicosChave: ['Hebreus 11:1', 'Romanos 10:17', 'Efésios 2:8-9', 'Tiago 2:14-26'],
    tags: ['fé', 'confiança', 'crença', 'obediência', 'dom de Deus'],
    fontes: ['Calvino, Institutas III.2', 'W.G.T. Shedd, Dogmatic Theology']
  },
  {
    id: 'dp-044',
    titulo: 'O Arrependimento — Volta para Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'O arrependimento é mudança de mente que resulta em mudança de direção — voltar-se de Deus para o pecado.',
      'O arrependimento é obra do Espírito Santo — Ele convence do pecado e conduz ao arrependimento.',
      'O arrependimento verdadeiro inclui: reconhecimento do pecado, arrependimento, confissão e abandono do pecado.',
      'O arrependimento não é sentimento passageiro mas mudança de vida.',
      'O arrependimento é chamado constante: Arrependei-vos, porque é chegado o Reino.'
    ],
    versicosChave: ['Atos 2:38', 'Mateus 4:17', '2 Coríntios 7:10', '1 João 1:8-9'],
    tags: ['arrependimento', 'conversão', 'mudança', 'confissão', 'perdão'],
    fontes: ['Calvino, Institutas III.3', 'Donald Bloesch, The Holy Spirit']
  },
  {
    id: 'dp-045',
    titulo: 'A Perseverança dos Santos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A perseverança dos santos sustenta que todos os que são verdadeiramente regenerados perseverarão até o fim.',
      'Deus guarda os Seus eleitos — ninguém pode arrancá-los das Suas mãos.',
      'A perseverança não é presunção — é confiança na fidelidade de Deus, manifestada em obediência.',
      'Os que apostatam provam que nunca foram verdadeiramente regenerados.',
      'A perseverança é motivada pela esperança: Deus é fiel e completará o que começou.'
    ],
    versicosChave: ['João 10:27-30', 'Filipenses 1:6', 'Romanos 8:38-39', '1 João 2:19'],
    tags: ['perseverança', 'segurança eterna', 'fidelidade de Deus', 'eleição'],
    fontes: ['Calvino, Institutas III.24', 'Tom Schreiner, The Race Set Before Us']
  },
  {
    id: 'dp-046',
    titulo: 'A Unidade da Igreja',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A unidade da Igreja é vontade de Cristo: Para que todos sejam um.',
      'A unidade não é uniformidade — pode haver diversidade sem comprometimento da unidade essencial.',
      'A divisão da Igreja é escândalo que fere o testemunho cristão.',
      'A unidade é escatológica — será plena no céu. Na terra, buscamos sem comprometer a verdade.',
      'O diálogo ecumênico deve ser conduzido com amor e verdade.'
    ],
    versicosChave: ['João 17:20-23', 'Efésios 4:1-6', '1 Coríntios 1:10', 'Filipenses 2:1-4'],
    tags: ['unidade', 'ecumenismo', 'divisão', 'diversidade', 'comunhão'],
    fontes: ['Miroslav Volf, After Our Likeness', 'Lesslie Newbigin, The Gospel in a Pluralist Society']
  },
  {
    id: 'dp-047',
    titulo: 'A Disciplina Eclesiástica',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A disciplina eclesiástica é responsabilidade da Igreja de manter a pureza doutrinal e moral.',
      'A disciplina tem dois tipos: formativa (ensino correto) e corretiva (repreensão e restauração)',
      'O objetivo não é punição mas restauração — trazer o pecador de volta.',
      'Mateus 18:15-20 é o modelo bíblico: confronto privado, testemunhas, igreja, excomunhão.',
      'A disciplina é ato de amor — proteger a Igreja e buscar o bem do pecador.'
    ],
    versicosChave: ['Mateus 18:15-20', '1 Coríntios 5:1-13', '2 Tessalonicenses 3:6-15', 'Gálatas 6:1'],
    tags: ['disciplina', 'restauração', 'pureza da Igreja', 'excomunhão'],
    fontes: ['Calvino, Institutas IV.12', 'Jonathan Leeman, Church Discipline']
  },
  {
    id: 'dp-048',
    titulo: 'A Igreja Local e a Igreja Universal',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A Igreja universal é o corpo de Cristo composto por todos os crentes de todos os tempos e lugares.',
      'A Igreja local é a expressão concreta da Igreja em um lugar específico — assembleia de crentes.',
      'A Igreja local é imagem da universal — não substitui mas representa.',
      'A Igreja local deve buscar pureza, verdade e amor — reflexo da Igreja perfeita.',
      'A comunhão entre Igrejas locais é expressão da unidade universal.'
    ],
    versicosChave: ['Efésios 4:4-6', 'Hebreus 10:24-25', 'Mateus 16:18', 'Efésios 2:19-22'],
    tags: ['igreja local', 'igreja universal', 'comunhão', 'assembleia'],
    fontes: ['Edmund Clowney, The Church', 'Veli-Matti Kärkkäinen, An Introduction to Ecclesiology']
  },
  {
    id: 'dp-049',
    titulo: 'Os Sacramentos — Batismo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'O batismo é sinal externo de graça interna — identificação com Cristo na morte e ressurreição.',
      'Sepultados com Ele no batismo. O batismo é ato de obediência e testemunho público.',
      'A questão batismal divide: pedobatismo (crentes e filhos) versus credobatismo (apenas crentes).',
      'O batismo não salva — é sinal de salvação já recebida pela fé.',
      'O batismo é marca de pertença à Igreja — incorporação ao corpo de Cristo.'
    ],
    versicosChave: ['Mateus 28:19', 'Romanos 6:3-4', 'Atos 2:38', 'Colossenses 2:12'],
    tags: ['batismo', 'sacramento', 'pedobatismo', 'credobatismo', 'identificação'],
    fontes: ['Calvino, Institutas IV.15', 'Paul Jewett, Infant Baptism and the Covenant of Grace']
  },
  {
    id: 'dp-050',
    titulo: 'Os Sacramentos — Ceia do Senhor',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A Ceia do Senhor é commemoração da morte de Cristo e antecipação daCeia celestial.',
      'Fazei isto em memória de mim. A Ceia é memorial, comunhão e antecipação.',
      'As visões variam: transubstanciação (católica), consubstanciação (luterana), memorialismo (Zwinglio).',
      'A Ceia não é sacrifício repetido — é commemoração do sacrifício único de Cristo.',
      'A Ceia é ato comunitário — celebração da Igreja em comunhão com Cristo e uns com os outros.'
    ],
    versicosChave: ['1 Coríntios 11:23-26', 'Mateus 26:26-29', 'Lucas 22:19-20', 'João 6:53-56'],
    tags: ['Ceia do Senhor', 'Eucaristia', 'comunhão', 'memorial', 'sacramento'],
    fontes: ['Calvino, Institutas IV.17', 'John Jeffery, A Theological Guide to Calvin\'s Institutes']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ANGELOLOGIA / DEMONOLOGIA
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'ad-001',
    titulo: 'A Natureza e Hierarquia dos Anjos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Angelologia',
    conteudo: [
      'Os anjos são seres espirituais criados por Deus para servi-Lo e servir aos homens.',
      'A hierarquia inclui querubins, serafins, arcanjos e anjos da presença.',
      'Os anjos são pessoais — têm nomes, inteligência, vontade e emoções.',
      'A Bíblia não apoia a adoração de anjos — eles são servos, não objeto de culto.',
      'O estudo dos anjos revela a realidade espiritual invisível.'
    ],
    versicosChave: ['Hebreus 1:14', 'Efésios 6:12', 'Apocalipse 4:8', 'Lucas 1:26-38'],
    tags: ['anjos', 'hierarquia angelical', 'querubins', 'serafins', 'realidade espiritual'],
    fontes: ['Agostinho, De Civitate Dei', 'Tomás de Aquino, Suma Teológica I, q.50-64']
  },
  {
    id: 'ad-002',
    titulo: 'Satanás e os Demônios',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Demonologia',
    conteudo: [
      'Satanás é um anjo caído, originalmente belo e poderoso. Sua queda é por orgulho.',
      'Satanás tem múltiplos títulos: Adversário, Diabo, Tentador, Príncipe deste mundo.',
      'Os demônios são anjos caídos que atuam na tentação e opressão.',
      'A vitória sobre Satanás foi conquistada na cruz.',
      'O crente pode resistir a Satanás pela fé, oração e Palavra.'
    ],
    versicosChave: ['Efésios 6:11-18', '1 Pedro 5:8', 'Tiago 4:7', 'Apocalipse 12:9'],
    tags: ['satanás', 'demônios', 'caída', 'tentação', 'guerra espiritual'],
    fontes: ['Michael Heiser, The Unseen Realm', 'Gregory Boyd, God at War']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BIBLIOLOGIA
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'bi-001',
    titulo: 'A Inspiração da Escritura',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Bibliologia',
    conteudo: [
      'A inspiração significa que Deus é o autor último das Escrituras, usando homens como instrumentos.',
      'A inspiração verbal plenária sustenta que cada palavra é inspirada.',
      'A inspiração não é ditado mecânico — Deus usou personalidade e estilo de cada autor.',
      'A inerrância sustenta que a Bíblia, no original, é verdadeira em tudo.',
      'A teologia liberal reduz a Bíblia a documento humano — a ortodoxia sustenta a superintendência divina.'
    ],
    versicosChave: ['2 Timóteo 3:16', '2 Pedro 1:20-21', 'Hebreus 4:12', 'Salmos 19:7'],
    tags: ['inspiração', 'inerrância', 'infalibilidade', 'verbal plenária'],
    fontes: ['B.B. Warfield, Inspiration and Authority', 'Kevin DeYoung, Taking God at His Word']
  },
  {
    id: 'bi-002',
    titulo: 'A Autoridade da Escritura',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Bibliologia',
    conteudo: [
      'A autoridade da Escritura significa que a Bíblia é Palavra de Deus com direito de governar fé e prática.',
      'Sola Scriptura é principio reformado: a Bíblia é autoridade infalível.',
      'A autoridade não vem da Igreja, mas de Deus que a inspirou.',
      'A autoridade se estende a toda a Escritura — Antigo e Novo Testamento.',
      'A secularização desafia a Bíblia — a resposta é hermenêutica madura.'
    ],
    versicosChave: ['2 Pedro 1:20-21', 'João 10:35', 'Isaías 40:8', 'Mateus 24:35'],
    tags: ['autoridade bíblica', 'sola Scriptura', 'inerrância'],
    fontes: ['Lutero, A Captividade Babilônica', 'Calvino, Institutas I.7-8']
  },
  {
    id: 'bi-003',
    titulo: 'Princípios Hermenêuticos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Bibliologia',
    conteudo: [
      'A hermenêutica é a arte de interpretar a Bíblia. Princípios fundamentais incluem contextualização e analogia da fé.',
      'A interpretação literal (gramatical-histórica) busca o sentido que o autor quis comunicar.',
      'O AT deve ser interpretado à luz do NT — Cristo é o centro.',
      'Os gêneros literários requerem métodos diferentes.',
      'A interpretação depende da tradição da Igreja.'
    ],
    versicosChave: ['2 Timóteo 2:15', '1 Coríntios 2:12-14', 'Lucas 24:27'],
    tags: ['hermenêutica', 'interpretação', 'literal', 'gramatical-histórico'],
    fontes: ['D.A. Carson, Exegetical Fallacies', 'Gordon Fee, How to Read the Bible for All Its Worth']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. TEMAS POR LIVRO (100+ estudos)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'tl-001',
    titulo: 'Gênesis — Criação e Ordem Cósmica',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'Gênesis 1-2 apresenta a criação do universo por Deus com ordem, propósito e bondade.',
      'Deus cria pela Sua palavra e mostra-se pessoal. O homem é a culminação — criado à imagem de Deus.',
      'O relato não é livro científico mas teológico. Responde a quem e por quê.',
      'A criação é gratuita — criou por amor, para comunhão.',
      'O descanso no sétimo dia é padrão criacional — ritmo de trabalho e descanso.'
    ],
    versicosChave: ['Gênesis 1:1-31', 'Gênesis 2:1-3', 'Colossenses 1:16'],
    tags: ['Gênesis', 'criação', 'imagem de Deus', 'sábado'],
    fontes: ['Victor Hamilton, Genesis (NICOT)', 'Gordon Wenham, Genesis (WBC)']
  },
  {
    id: 'tl-002',
    titulo: 'Gênesis — A Queda e o Pecado',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'Gênesis 3 narra a queda: tentação, desobediência e consequências.',
      'O pecado é rebelião — querer ser como Deus. É a raiz de todo mal.',
      'As consequências são universais: morte, corrupção, maldição.',
      'Gênesis 3:15 é o proto-evangelium — primeira promessa messiânica.',
      'A graça está presente mesmo no julgamento.'
    ],
    versicosChave: ['Gênesis 3:1-24', 'Romanos 5:12', 'Gênesis 3:15'],
    tags: ['queda', 'pecado', 'proto-evangelium', 'Adão e Eva'],
    fontes: ['Gordon Wenham, Genesis (WBC)', 'Henri Blocher, Original Sin']
  },
  {
    id: 'tl-003',
    titulo: 'Gênesis — Aliança e Promessa',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'O tema da aliança percorre Gênesis: Adão, Noé, Abraão, Isaac, Jacó.',
      'A aliança com Abraão é central: promessa de terra, descendência e bênção universal.',
      'A aliança é incondicional em suas promessas.',
      'A descendência é singular e plural — há A descendência que é Cristo.',
      'As alianças são fiéis embora o homem falhe.'
    ],
    versicosChave: ['Gênesis 12:1-3', 'Gênesis 15:6', 'Gálatas 3:16'],
    tags: ['aliança', 'Abraão', 'promessa', 'descendência'],
    fontes: ['O. Palmer Robertson, The Christ of the Covenants']
  },
  {
    id: 'tl-004',
    titulo: 'Êxodo — Libertação e Páscoa',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'O Êxodo é evento fundante — libertação da escravidão por Deus.',
      'A Páscoa é sacrifício central: o cordeiro imolado protege da sentença.',
      'As dez pragas são julgamento contra os deuses do Egito.',
      'A travessia do Mar Vermelho é batismo de Israel.',
      'A libertação é paradigmática para toda a salvação.'
    ],
    versicosChave: ['Êxodo 3:7-8', 'Êxodo 12:1-14', '1 Coríntios 5:7'],
    tags: ['Êxodo', 'libertação', 'Páscoa', 'cordeiro pascual'],
    fontes: ['Douglas Stuart, Exodus (NICOT)']
  },
  {
    id: 'tl-005',
    titulo: 'Êxodo — A Lei e os Dez Mandamentos',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'A entrega da Lei no Sinai é ápice da aliança.',
      'Os Dez Mandamentos são o resumo da lei moral de Deus.',
      'A Lei tem múltiplas funções: revela, acusa, guia, prepara para Cristo.',
      'A relação Lei-Evangelho é central no protestantismo.',
      'A Lei é expressão de santidade e amor divinos.'
    ],
    versicosChave: ['Êxodo 20:1-17', 'Romanos 7:7-12', 'Gálatas 3:24'],
    tags: ['lei', 'dez mandamentos', 'aliança', 'lei moral'],
    fontes: ['Michael Morales, Who Shall Ascend the Mountain of the Lord?']
  },
  {
    id: 'tl-006',
    titulo: 'Salmos — Adoração e Louvor',
    categoria: 'Temas por Livro',
    subcategoria: 'Livros Poéticos',
    conteudo: [
      'Os Salmos são o hinário de Israel — 150 cânticos que expressam toda a gama de emoções.',
      'O louvor é resposta à grandeza de Deus. Não depende de circunstâncias.',
      'O lamento é expressão honesta de dor diante de Deus. 1/3 dos Salmos são de lamento.',
      'O Salmo 23 expressa confiança em Deus como pastor.',
      'Os Salmos messiânicos apontam para Cristo.'
    ],
    versicosChave: ['Salmo 150:6', 'Salmo 23:1', 'Salmo 22:1-31'],
    tags: ['salmos', 'louvor', 'lamento', 'Salmo 23', 'messianismo'],
    fontes: ['Claus Westermann, Praise and Lament in the Psalms']
  },
  {
    id: 'tl-007',
    titulo: 'Livro de Jó — Sofrimento e Soberania',
    categoria: 'Temas por Livro',
    subcategoria: 'Livros Poéticos',
    conteudo: [
      'Jó é a mais profunda reflexão sobre o sofrimento do inocente.',
      'Os amigos oferecem teologia da retribuição — mas Jó é justo.',
      'Deus fala do redemoinho — não responde diretamente mas revela Sua soberania.',
      'O tema é: Deus governa com sabedoria mesmo quando não entendemos.',
      'O sofrimento pode ser instrumento de Deus para aprofundar a fé.'
    ],
    versicosChave: ['Jó 1:21', 'Jó 19:25-27', 'Jó 42:1-6'],
    tags: ['Jó', 'sofrimento', 'soberania', 'redenção'],
    fontes: ['David Fox Flourney, Job (Interpretation)']
  },
  {
    id: 'tl-008',
    titulo: 'Provérbios — Sabedoria Prática',
    categoria: 'Temas por Livro',
    subcategoria: 'Livros Poéticos',
    conteudo: [
      'Provérbios é manual de sabedoria prática. O temor do Senhor é princípio da sabedoria.',
      'A sabedoria bíblica não é erudição mas discernimento para viver bem.',
      'Os provérbios são ensinos concisos sobre conduta.',
      'A sabedoria começa com o temor do Senhor.',
      'Provérbios é relevante para vida contemporânea.'
    ],
    versicosChave: ['Provérbios 1:7', 'Provérbios 9:10', 'Provérbios 3:5-6'],
    tags: ['provérbios', 'sabedoria', 'temor do Senhor'],
    fontes: ['Tremper Longman III, Proverbs (Baker)']
  },
  {
    id: 'tl-009',
    titulo: 'Isaías — O Profeta Messiânico',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Isaías é o evangelho do AT — profecias messiânicas mais detalhadas.',
      'Os Serviços do Senhor descrevem a obra redentora do Messias.',
      'Isaías 53 descreve a morte substitutiva.',
      'A visão do templo revela a santidade de Deus.',
      'O livro tem relevância escatológica: novos céus e nova terra.'
    ],
    versicosChave: ['Isaías 53:5', 'Isaías 9:6', 'Isaías 7:14'],
    tags: ['Isaías', 'messias', 'servo sofredor', 'nascimento virginal'],
    fontes: ['John Oswalt, Isaiah (NICOT)']
  },
  {
    id: 'tl-010',
    titulo: 'Jeremias — Nova Aliança e Restauração',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Jeremias profetizou nos últimos anos antes do exílio.',
      'Jeremias 29:11 é promessa de futuro.',
      'A nova aliança de Jeremias 31 é central — Deus escreverá Sua lei nos corações.',
      'Jeremias é o profeta do choro.',
      'A mensagem é: julgamento é real, mas restauração é possível.'
    ],
    versicosChave: ['Jeremias 29:11', 'Jeremias 31:31-34', 'Lamentações 3:22-23'],
    tags: ['Jeremias', 'nova aliança', 'restauração', 'exílio'],
    fontes: ['Jack Lundbom, Jeremiah (Anchor)']
  },
  {
    id: 'tl-011',
    titulo: 'Daniel — Soberania e Escatologia',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Daniel profetizou no exílio babilônico.',
      'Daniel 7:13-14 descreve o Filho do Homem.',
      'Daniel 9:24-27 é profecia das 70 semanas.',
      'A fidelidade na Babilônia é modelo de resistência.',
      'Daniel é fonte de escatologia apocalíptica.'
    ],
    versicosChave: ['Daniel 7:13-14', 'Daniel 2:44', 'Daniel 9:24-27'],
    tags: ['Daniel', 'escatologia', 'Filho do Homem', 'soberania'],
    fontes: ['John Goldingay, Daniel (WBC)']
  },
  {
    id: 'tl-012',
    titulo: 'Mateus — O Evangelho do Reino',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'Mateus apresenta Jesus como Messias prometido.',
      'As cinco seções refletem os cinco livros de Moisés.',
      'O tema central é o Reino dos Céus.',
      'Mateus enfatiza a universalidade da missão.',
      'A Grande Comissão é para todas as nações.'
    ],
    versicosChave: ['Mateus 1:1', 'Mateus 16:16', 'Mateus 28:18-20'],
    tags: ['Mateus', 'messias', 'reino', 'Grande Comissão'],
    fontes: ['R.T. France, Matthew (NICOT)']
  },
  {
    id: 'tl-013',
    titulo: 'Marcos — O Evangelho da Ação',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'Marcos é o evangelho mais curto e dinâmico.',
      'Jesus é servo sofredor.',
      'O messianismo secreto é tema.',
      'Marcos enfatiza a Paixão.',
      'O discipulado é ação, não apenas conhecimento.'
    ],
    versicosChave: ['Marcos 1:1', 'Marcos 10:45', 'Marcos 8:27-30'],
    tags: ['Marcos', 'servo', 'Paixão', 'segredo messiânico'],
    fontes: ['Ben Witherington III, The Gospel of Mark']
  },
  {
    id: 'tl-014',
    titulo: 'Lucas — O Evangelho Universal',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'Lucas destaca Jesus como Salvador de todos.',
      'Enfatiza a universalidade: gentios, mulheres, pobres.',
      'O Espírito Santo é mais enfatizado.',
      'As parábolas do Bom Samaritano e Filho Pródigo.',
      'O evangelho transcende fronteiras.'
    ],
    versicosChave: ['Lucas 2:32', 'Lucas 4:18-19', 'Lucas 19:10'],
    tags: ['Lucas', 'universalidade', 'Espírito Santo', 'pobres'],
    fontes: ['Joel Green, Luke (NICOT)']
  },
  {
    id: 'tl-015',
    titulo: 'João — O Evangelho da Divindade',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'João apresenta Jesus como Verbo eterno.',
      'Os sete Eu Sou revelam Sua identidade.',
      'Os sinais revelam Sua glória.',
      'O amor é tema central.',
      'João é relevante para apologetia.'
    ],
    versicosChave: ['João 1:1-3', 'João 3:16', 'João 14:6'],
    tags: ['João', 'divindade', 'Eu Sou', 'amor', 'sinais'],
    fontes: ['Craig Keener, John (HNTC)']
  },
  {
    id: 'tl-016',
    titulo: 'Atos — A Igreja em Expansão',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      'Atos narra a expansão da Igreja de Jerusalém ao mundo.',
      'O Espírito Santo é protagonista.',
      'A transição de religião judaica para fé universal.',
      'Pedro e Paulo são instrumentos.',
      'Atos é relevante para missiologia.'
    ],
    versicosChave: ['Atos 1:8', 'Atos 2:1-4', 'Atos 28:31'],
    tags: ['Atos', 'Espírito Santo', 'Igreja primitiva', 'missionário'],
    fontes: ['Craig Keener, Acts (HNTC)']
  },
  {
    id: 'tl-017',
    titulo: 'Romanos — O Evangelho Sistemático',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      'Romanos é a epístola mais sistemática de Paulo.',
      'O justo viverá pela fé.',
      'Romanos 8 é o capítulo mais elevado.',
      'A tensão entre graça e justiça.',
      'Israel e gentios no plano de Deus.'
    ],
    versicosChave: ['Romanos 1:16-17', 'Romanos 5:8', 'Romanos 8:1'],
    tags: ['Romanos', 'justificação', 'fé', 'graça'],
    fontes: ['Douglas Moo, Romans (NICNT)']
  },
  {
    id: 'tl-018',
    titulo: '1 e 2 Coríntios — A Igreja Imperfeita',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      '1 Coríntios é carta a igreja problemática.',
      'O amor de 1 Coríntios 13 é o capítulo mais belo.',
      '1 Coríntios 15 é exposição da ressurreição.',
      '2 Coríntios é mais pessoal.',
      'As epístolas são relevantes para Igreja contemporânea.'
    ],
    versicosChave: ['1 Coríntios 13:4-7', '1 Coríntios 15:3-8', '2 Coríntios 12:9'],
    tags: ['Coríntios', 'Igreja', 'amor', 'ressurreição'],
    fontes: ['Anthony Thiselton, 1 Corinthians (NIGTC)']
  },
  {
    id: 'tl-019',
    titulo: 'Gálatas — Liberdade na Graça',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      'Gálatas é a epístola da liberdade cristã.',
      'A justificação pela fé é tema central.',
      'A tensão entre graça e legalismo.',
      'O fruto do Espírito é definido.',
      'A liberdade é para servir.'
    ],
    versicosChave: ['Gálatas 2:16', 'Gálatas 5:1', 'Gálatas 5:22-23'],
    tags: ['Gálatas', 'liberdade', 'graça', 'legalismo'],
    fontes: ['Timothy Keller, Galatians For You']
  },
  {
    id: 'tl-020',
    titulo: 'Efésios — A Igreja, Corpo de Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      'Efésios é a epístola dos céus.',
      'Bênçãos espirituais e unidade da Igreja.',
      'A armadura de Deus.',
      'Vida no Espírito.',
      'A Igreja é corpo de Cristo.'
    ],
    versicosChave: ['Efésios 2:8-9', 'Efésios 6:10-18', 'Efésios 4:4-6'],
    tags: ['Efésios', 'Igreja', ' bênçãos', 'armadura'],
    fontes: ['Peter O\'Brien, Ephesians (PNTC)']
  },
  {
    id: 'tl-021',
    titulo: 'Filipenses — Alegria na Adversidade',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      'Filipenses é a epístola da alegria.',
      'Paulo escreve da prisão com gozo.',
      'O hino cristológico de Filipenses 2.',
      'O contentamento em toda circunstância.',
      'Posso todas as coisas naquele que me fortalece.'
    ],
    versicosChave: ['Filipenses 4:13', 'Filipenses 2:6-11', 'Filipenses 4:4'],
    tags: ['Filipenses', 'alegria', 'kenosis', 'contentamento'],
    fontes: ['Gordon Fee, Philippians (NICNT)']
  },
  {
    id: 'tl-022',
    titulo: 'Colossenses — A Supremacia de Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      'Colossenses declara a supremacia de Cristo sobre toda a criação.',
      'Cristo é imagem do Deus invisível.',
      'A plenitude da divindade habita Nele.',
      'A falsa filosofia é combatida.',
      'A vida cristã é centrada em Cristo.'
    ],
    versicosChave: ['Colossenses 1:15-20', 'Colossenses 2:9-10', 'Colossenses 3:1-4'],
    tags: ['Colossenses', 'supremacia', 'Cristo', 'plenitude'],
    fontes: ['Gordon Fee, Colossians (NICNT)']
  },
  {
    id: 'tl-023',
    titulo: '1 Tessalonicenses — A Esperança da Volta de Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      '1 Tessalonicenses é a epístola mais antiga de Paulo.',
      'O tema central é a segunda vinda de Cristo.',
      'Consolo para os que perderam entes queridos.',
      'Vigilância e santificação.',
      'A esperança motiva a santidade.'
    ],
    versicosChave: ['1 Tessalonicenses 4:16-17', '1 Tessalonicenses 5:1-11'],
    tags: ['Tessalonicenses', 'segunda vinda', 'esperança', 'vigilância'],
    fontes: ['Gordon Fee, 1 and 2 Thessalonians (NICNT)']
  },
  {
    id: 'tl-024',
    titulo: 'Hebreus — A Superioridade de Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Gerais',
    conteudo: [
      'Hebreus declara a superioridade de Cristo sobre tudo.',
      'Cristo é superior aos anjos, Moisés, Aarão.',
      'O novo testamento é superior ao antigo.',
      'O santuário celestial é o verdadeiro.',
      'A fé é o tema conclusivo (Hebreus 11).'
    ],
    versicosChave: ['Hebreus 1:1-3', 'Hebreus 4:14-16', 'Hebreus 11:1'],
    tags: ['Hebreus', 'superioridade', 'sumo sacerdote', 'fé'],
    fontes: ['Craig Koester, Hebrews (Anchor)']
  },
  {
    id: 'tl-025',
    titulo: 'Tiago — Fé Viva e Obras',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Gerais',
    conteudo: [
      'Tiago é manual de ética cristã.',
      'Fé sem obras é morta.',
      'A religião pura é visitar órfãos e viúvas.',
      'A língua é pequena mas causa grandes danos.',
      'A paciência no sofrimento.'
    ],
    versicosChave: ['Tiago 2:17', 'Tiago 1:27', 'Tiago 3:5-6'],
    tags: ['Tiago', 'fé', 'obras', 'ética', 'língua'],
    fontes: ['Douglas Moo, The Letter of James (PNTC)']
  },
  {
    id: 'tl-026',
    titulo: '1 Pedro — Sofrimento e Esperança',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Gerais',
    conteudo: [
      '1 Pedro é escrito a cristãos sofrendo perseguição.',
      'O sofrimento é provação de fé.',
      'Cristo é exemplo de sofrimento injusto.',
      'A esperança viva é fundamento da fé.',
      'Sacerdócio real de todos os crentes.'
    ],
    versicosChave: ['1 Pedro 2:9', '1 Pedro 4:12-13', '1 Pedro 1:3'],
    tags: ['1 Pedro', 'sofrimento', 'esperança', 'sacerdócio'],
    fontes: ['Karen Jobes, 1 Peter (Baker)']
  },
  {
    id: 'tl-027',
    titulo: '1 João — Amor e Verdade',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Gerais',
    conteudo: [
      '1 João é carta de amor e verdade.',
      'Deus é amor.',
      'O amor se prova em ação, não em palavras.',
      'Andar na luz é andar em obediência.',
      'A vitória sobre o mundo pela fé.'
    ],
    versicosChave: ['1 João 4:8', '1 João 1:7', '1 João 5:4'],
    tags: ['1 João', 'amor', 'verdade', 'luz', 'vitória'],
    fontes: ['Karen Jobes, 1, 2, 3 John (ZECNT)']
  },
  {
    id: 'tl-028',
    titulo: 'Apocalipse — Revelação e Esperança',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse é revelação de Jesus Cristo.',
      'O Cordeiro é vitorioso.',
      'O julgamento é certo.',
      'Novos céus e nova terra.',
      'A esperança é consumação do Reino.'
    ],
    versicosChave: ['Apocalipse 1:1-3', 'Apocalipse 5:6-14', 'Apocalipse 21:1-4'],
    tags: ['Apocalipse', 'revelação', 'esperança', 'juízo', 'consumação'],
    fontes: ['G.K. Beale, Revelation (NICNT)']
  },
  {
    id: 'tl-029',
    titulo: 'Números — Peregrinação e Desobediência',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'Números narra a peregrinação de Israel no deserto.',
      'A desobediência gera julgamento — 40 anos de deserto.',
      'A serpente de bronze é tipo de Cristo.',
      'Balaão e as bênçãos inesperadas.',
      'Deus fiel apesar da infidelidade humana.'
    ],
    versicosChave: ['Números 14:33-34', 'Números 21:8-9', 'João 3:14-15'],
    tags: ['Números', 'peregrinação', 'desobediência', 'serpente de bronze'],
    fontes: ['Gordon Wenham, Numbers (TOTC)']
  },
  {
    id: 'tl-030',
    titulo: 'Deuteronômio — Renovação da Aliança',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'Deuteronômio é renovação da aliança antes da entrada em Canaã.',
      'O Shema é declaração central da fé.',
      'A lei é resumida em amor a Deus e ao próximo.',
      'Moisés prepara Josué para a liderança.',
      'As bênçãos e maldições da aliança.'
    ],
    versicosChave: ['Deuteronômio 6:4-5', 'Deuteronômio 30:19', 'Mateus 22:37-40'],
    tags: ['Deuteronômio', 'aliança', 'Shema', 'lei', 'amor'],
    fontes: ['Walter Brueggemann, Deuteronomy (Interpretation)']
  },
  {
    id: 'tl-031',
    titulo: 'Josué — Conquista e Fidelidade',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      'Josué narra a conquista de Canaã.',
      'Deus cumple a promessa feita a Abraão.',
      'A fé de Raabe é exemplo.',
      'Escolhe hoje a quem serviris.',
      'A terra descanso é dádiva de Deus.'
    ],
    versicosChave: ['Josué 1:9', 'Josué 24:15', 'Josué 21:45'],
    tags: ['Josué', 'conquista', 'promessa', 'fidelidade'],
    fontes: ['Richard Hess, Joshua (TOTC)']
  },
  {
    id: 'tl-032',
    titulo: 'Juízes — Círculo de Desobediência',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      'Juízes mostra o ciclo: pecado, julgamento, clamor, libertação.',
      'Não havia rei em Israel — cada um fazia o que parecia certo.',
      'Deus levanta libertadores imperfeitos.',
      'A graça de Deus mesmo no julgamento.',
      'A necessidade de um Rei perfeito.'
    ],
    versicosChave: ['Juízes 2:11-19', 'Juízes 21:25'],
    tags: ['Juízes', 'desobediência', 'ciclo', 'libertadores'],
    fontes: ['Barry Webb, The Book of Judges (NICOT)']
  },
  {
    id: 'tl-033',
    titulo: 'Rute — Graça e Redenção',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      'Rute é história de graça e lealdade.',
      'A gentia Rute entra no povo de Deus.',
      'Boaz é redentor — tipo de Cristo.',
      'A linhagem de Davi e de Cristo.',
      'A providência de Deus no cotidiano.'
    ],
    versicosChave: ['Rute 1:16-17', 'Rute 4:14-16', 'Mateus 1:5'],
    tags: ['Rute', 'graça', 'redenção', 'Boaz', 'linhagem'],
    fontes: ['Daniel Block, Ruth (NICOT)']
  },
  {
    id: 'tl-034',
    titulo: '1 Samuel — Realeza e Profecia',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      '1 Samuel marca a transição de juízes para monarquia.',
      'Samuel é o último juiz e primeiro profeta.',
      'Saul é rei escolhido mas rejeitado.',
      'Davi é rei segundo o coração de Deus.',
      'Deus vê o coração, não a aparência.'
    ],
    versicosChave: ['1 Samuel 16:7', '1 Samuel 8:4-7', '1 Samuel 3:10'],
    tags: ['Samuel', 'realeza', 'profecia', 'Davi', 'Saul'],
    fontes: ['V. Philips Long, 1 Samuel (TOTC)']
  },
  {
    id: 'tl-035',
    titulo: '2 Samuel — A Aliança Davídica',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      '2 Samuel descreve o reinado de Davi.',
      'A aliança com Davi é central.',
      'O pecado de Davi e suas consequências.',
      'Absalão e a rebelião.',
      'A fidelidade de Deus apesar da infidelidade humana.'
    ],
    versicosChave: ['2 Samuel 7:12-16', '2 Samuel 22:31', '2 Samuel 12:13'],
    tags: ['Davi', 'aliança', 'reinado', 'pecado', 'restauração'],
    fontes: ['Robert Bergen, 1, 2 Samuel (NAC)']
  },
  {
    id: 'tl-036',
    titulo: '1 Reis — O Templo e a Divisão',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      '1 Reis narra a construção do templo por Salomão.',
      'A sabedoria de Salomão é dádiva divina.',
      'A divisão do reino após Salomão.',
      'Elias confronta os profetas de Baal.',
      'A fidelidade em tempos de idolatria.'
    ],
    versicosChave: ['1 Reis 8:27-30', '1 Reis 18:37-39', '1 Reis 11:9-13'],
    tags: ['Salomão', 'templo', 'divisão', 'Elias'],
    fontes: ['Paul House, 1, 2 Kings (NAC)']
  },
  {
    id: 'tl-037',
    titulo: '2 Reis — Exílio e Julgamento',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      '2 Reis narra o exílio de Israel e Judá.',
      'A queda de Samaria (722 a.C.).',
      'A queda de Jerusalém (586 a.C.).',
      'A fidelidade de Deus nas promessas de julgamento.',
      'A esperança de restauração.'
    ],
    versicosChave: ['2 Reis 17:7-23', '2 Reis 25:1-21'],
    tags: ['exílio', 'julgamento', 'Samaria', 'Jerusalém'],
    fontes: ['Paul House, 1, 2 Kings (NAC)']
  },
  {
    id: 'tl-038',
    titulo: 'Crônicas — Revisão Teológica',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      'Crônicas é revisão teológica da história de Israel.',
      'Ênfase no templo e na adoração.',
      'A linhagem de Davi e a promessa messiânica.',
      'A restauração após o exílio.',
      'A centralidade de Jerusalém.'
    ],
    versicosChave: ['1 Crônicas 17:11-14', '2 Crônicas 7:14', '2 Crônicas 6:41-42'],
    tags: ['Crônicas', 'templo', 'adoração', 'restauração'],
    fontes: ['Craig Jester, 1 Chronicles (BCOT)']
  },
  {
    id: 'tl-039',
    titulo: 'Esdras e Neemias — Restauração',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      'Esdras e Neemias narram a restauração pós-exílio.',
      'Esdra é escriba e reformador.',
      'Neemias reconstrói os muros de Jerusalém.',
      'A leitura pública da Lei.',
      'A restauração física e espiritual.'
    ],
    versicosChave: ['Esdras 7:10', 'Neemias 2:17-18', 'Neemias 8:8-10'],
    tags: ['Esdras', 'Neemias', 'restauração', 'muros', 'Lei'],
    fontes: ['Louis C. Hartman and Alexander A. Di Lella, The Book of Tobit']
  },
  {
    id: 'tl-040',
    titulo: 'Ester — Providência e Coragem',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      'Ester é história de providência divina em Persia.',
      'O nome de Deus não é mencionado mas Sua presença é evidente.',
      'Ester arriscam a vida por seu povo.',
      'Purim é celebração da libertação.',
      'Deus usa circunstâncias para cumprir Seus propósitos.'
    ],
    versicosChave: ['Ester 4:14', 'Ester 7:3-4'],
    tags: ['Ester', 'providência', 'coragem', 'Purim'],
    fontes: ['Karen Jobes, Esther (NICOT)']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. QUESTÕES CONTEMPORÂNEAS (50+ estudos)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'qc-001',
    titulo: 'Ética Cristã e Moralidade Absoluta',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ética Cristã',
    conteudo: [
      'A ética cristã se fundamenta na natureza de Deus e na Sua Palavra.',
      'O relativismo moral contemporâneo desafia a noção de verdade absoluta.',
      'A Bíblia apresenta padrões morais universais — não convenções culturais.',
      'A ética cristã é baseada no amor: a Deus e ao próximo.',
      'A consciência formada pela Palavra é guia moral.'
    ],
    versicosChave: ['Mateus 22:37-40', 'Romanos 12:1-2', 'Filipenses 4:8'],
    tags: ['ética', 'moralidade', 'absolutismo', 'relativismo'],
    fontes: ['David Wells, The Courage to Be Protestant', 'Francis Schaeffer, How Should We Then Live?']
  },
  {
    id: 'qc-002',
    titulo: 'Bioética — Vida, Morte e Dignidade',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Bioética',
    conteudo: [
      'A bioética cristã defende a dignidade da vida humana desde a concepção.',
      'O aborto é rejeitado pela tradição cristã como interrupção injustificada da vida.',
      'A eutanásia contradiz a soberania de Deus sobre a vida e a morte.',
      'A engenharia genética levanta questões sobre manipulação da criação.',
      'A cura de doenças é chamado — mas a dignidade humana é sagrada.'
    ],
    versicosChave: ['Salmos 139:13-16', 'Jeremias 1:5', 'Deuteronômio 32:39'],
    tags: ['bioética', 'aborto', 'eutanásia', 'dignidade', 'vida'],
    fontes: ['John Kilner, Dignity and Destiny', ' Nigel Cameron, Will Christians be Biotech\'s Best Hope?']
  },
  {
    id: 'qc-003',
    titulo: 'Justiça Social — Pobres e Oprimidos',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Justiça Social',
    conteudo: [
      'A justiça social é chamamento bíblico — Deus defende os oprimidos.',
      'Os profetas denunciam a exploração dos pobres.',
      'Jesus trouxe boa notícia aos pobres.',
      'A Igreja é chamada a ser voz dos sem voz.',
      'A justiça social não é política mas fé prática.'
    ],
    versicosChave: ['Miqueias 6:8', 'Isaías 1:17', 'Mateus 25:31-46', 'Tiago 2:15-17'],
    tags: ['justiça social', 'pobres', 'oprimidos', 'profecia', 'missão'],
    fontes: ['Tim Keller, Generous Justice', 'John Stott, Issues Facing Christians Today']
  },
  {
    id: 'qc-004',
    titulo: 'Cuidado com a Criação — Ecologia Cristã',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ecologia',
    conteudo: [
      'A criação é dom de Deus — somos mordomos, não donos.',
      'O mandato de dominar não é exploração mas cuidado responsável.',
      'A destruição ambiental é desobediência ao chamado de cuidar.',
      'O futuro é nova criação — Deus restaurará todas as coisas.',
      'A responsabilidade ambiental é fé em ação.'
    ],
    versicosChave: ['Gênesis 1:28', 'Gênesis 2:15', 'Romanos 8:19-22', 'Apocalipse 21:1'],
    tags: ['ecologia', 'criação', 'cuidado', 'meio ambiente', 'mordomia'],
    fontes: ['Cal DeWitt, Earth-Wise', 'Loren Wilkinson, Earthkeeping']
  },
  {
    id: 'qc-005',
    titulo: 'Religião e Ciência — Fé e Razão',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Fé e Ciência',
    conteudo: [
      'Fé e ciência não são necessariamente conflitantes.',
      'A ciência responde ao como; a fé ao por quê.',
      'O criacionismo, o design inteligente e a evolução teísta são posições cristãs.',
      'A Bíblia não é livro científico — é revelação de Deus.',
      'A razão é dom de Deus para ser usada em serviço da fé.'
    ],
    versicosChave: ['Romanos 1:20', 'Provérbios 25:2', 'Salmos 19:1'],
    tags: ['ciência', 'fé', 'razão', 'criacionismo', 'design inteligente'],
    fontes: ['Alister McGrath, A Fine-Tuned Universe', 'John Polkinghorne, Science and Creation']
  },
  {
    id: 'qc-006',
    titulo: 'Pluralismo Religioso',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Pluralismo',
    conteudo: [
      'O pluralismo sustenta que todas as religiões são caminhos para Deus.',
      'A Bíblia afirma a exclusividade de Cristo: não há salvação em nenhum outro.',
      'O diálogo inter-religioso é necessário, mas sem comprometer a verdade.',
      'O relativismo religioso é incompatível com o cristianismo.',
      'O amor ao próximo não implica concordância com todas as crenças.'
    ],
    versicosChave: ['João 14:6', 'Atos 4:12', '1 Timóteo 2:5'],
    tags: ['pluralismo', 'exclusivismo', 'inclusivismo', 'diálogo'],
    fontes: ['Lesslie Newbigin, The Gospel in a Pluralist Society', 'Jenkins, The Next Christendom']
  },
  {
    id: 'qc-007',
    titulo: 'Evangelismo e Missões',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Missiologia',
    conteudo: [
      'O evangelismo é proclamação do evangelho para salvação.',
      'As missões são extensão da Grande Comissão.',
      'O evangelismo deve ser contextual sem perder a verdade.',
      'O testemunho vivo é mais persuasivo que argumentos.',
      'A oração é fundamento da missão.'
    ],
    versicosChave: ['Mateus 28:19-20', 'Atos 1:8', 'Romanos 10:14-15'],
    tags: ['evangelismo', 'missões', 'Grande Comissão', 'contextualização'],
    fontes: ['John Piper, Let the Nations Be Glad', 'David Bosch, Transforming Mission']
  },
  {
    id: 'qc-008',
    titulo: 'Cultura Cristã — Engajamento Cultural',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Cultura',
    conteudo: [
      'A Igreja deve engajar a cultura sem ser absorvida por ela.',
      'A anticultura cristã é withdraw; a aculturação é compromisso.',
      'A transformação cultural é chamado — sal da terra e luz do mundo.',
      'As artes, ciências e política são esferas de influência cristã.',
      'O discernimento cultural é necessário.'
    ],
    versicosChave: ['Mateus 5:13-16', 'Romanos 12:2', '1 Coríntios 9:19-23'],
    tags: ['cultura', 'engajamento', 'transformação', 'arte', 'política'],
    fontes: ['Abraham Kuyper, Lectures on Calvinism', 'James Davison Hunter, To Change the World']
  },
  {
    id: 'qc-009',
    titulo: 'Mídia Digital e Fé',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Cultura Digital',
    conteudo: [
      'A mídia digital é ferramenta de evangelismo e comunhão.',
      'Os perigos incluem: distração, superficialidade, vício.',
      'O uso da tecnologia deve glorificar a Deus.',
      'A comunidade online não substitui a comunidade presencial.',
      'O discernimento digital é necessário.'
    ],
    versicosChave: ['1 Coríntios 10:31', 'Efésios 5:15-17', 'Colossenses 3:17'],
    tags: ['mídia', 'digital', 'tecnologia', 'comunicação'],
    fontes: ['Tony Reinke, Twitterpated', 'Andy Crouch, The Tech-Wise Family']
  },
  {
    id: 'qc-010',
    titulo: 'Fé e Política',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ética Pública',
    conteudo: [
      'A fé cristã tem implicações políticas — mas não é partidária.',
      'O Reino de Deus transcende partidos e ideologias.',
      'Os cristãos devem buscar justiça em todas as esferas.',
      'A lealdade máxima é a Cristo, não a partido.',
      'A participação política é responsabilidade cívica.'
    ],
    versicosChave: ['Mateus 22:21', 'Romanos 13:1-7', 'Atos 5:29'],
    tags: ['política', 'justiça', 'Reino de Deus', 'cidadania'],
    fontes: ['Andy Crouch, The Tech-Wise Family', 'James Davison Hunter, To Change the World']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. HISTÓRIA DA IGREJA (50+ estudos)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'hi-001',
    titulo: 'Os Pais da Igreja Primitiva',
    categoria: 'História da Igreja',
    subcategoria: 'Patrística',
    conteudo: [
      'Os Pais da Igreja são os teólogos dos primeiros séculos do cristianismo.',
      'Os Apóstolicos (Clemente, Inácio, Policarpo) foram contemporâneos dos apóstolos.',
      'Os Ante-Nicenos (Justino, Irineu, Tertuliano) combateram heresias.',
      'Os Nicenos (Atanásio, Basílio, Gregório) definiram a Trindade.',
      'Os Padres do Deserto (Cristão, Atanásio) influenciaram a espiritualidade.'
    ],
    versicosChave: ['2 Tessalonicenses 2:15', 'Judas 1:3', '2 Timóteo 2:2'],
    tags: ['Pais da Igreja', 'Patrística', 'heresias', 'Trindade'],
    fontes: ['J.N.D. Kelly, Early Christian Doctrines', 'Justino, Primeira Apologia']
  },
  {
    id: 'hi-002',
    titulo: 'Santo Agostinho — Graça e Cidade de Deus',
    categoria: 'História da Igreja',
    subcategoria: 'Patrística',
    conteudo: [
      'Agostinho é o pai do Ocidente cristão. Suas Confissões são autobiografia espiritual.',
      'A graça soberana é tema central — Deus precede o homem em tudo.',
      'A Cidade de Deus contrasta com a cidade dos homens.',
      'O pecado original é herança de Adão.',
      'A predestinação e a perseverança dos santos.'
    ],
    versicosChave: ['Romanos 5:12', 'Efésios 2:4-5', 'João 6:44'],
    tags: ['Agostinho', 'graça', 'pecado original', 'Cidade de Deus'],
    fontes: ['Agostinho, Confissões', 'Agostinho, A Cidade de Deus']
  },
  {
    id: 'hi-003',
    titulo: 'Os Concílios Ecumênicos',
    categoria: 'História da Igreja',
    subcategoria: 'Concílios',
    conteudo: [
      'Os concílios definiram a doutrina cristã contra heresias.',
      'Nicéia (325) — divindade de Cristo contra o arianismo.',
      'Constantinopla (381) — divindade do Espírito Santo.',
      'Éfeso (431) — Maria como Theotokos.',
      'Calcedônia (451) — duas naturezas de Cristo.'
    ],
    versicosChave: ['Efésios 2:20', '1 Timóteo 3:15', 'Judas 1:3'],
    tags: ['concílios', 'Nicéia', 'Constantinopla', 'Calcedônia', 'doutrina'],
    fontes: ['J.N.D. Kelly, Early Christian Doctrines', 'Richard Hanson, The Search for the Christian Doctrine of God']
  },
  {
    id: 'hi-004',
    titulo: 'São Tomás de Aquino — Fé e Razão',
    categoria: 'História da Igreja',
    subcategoria: 'Escolástica',
    conteudo: [
      'Tomás de Aquino sintetizou fé e razão na Suma Teológica.',
      'A existência de Deus pode ser demonstrada pela razão.',
      'A graça não destrói a natureza mas a aperfeiçoa.',
      'A virtude da caridade é forma de todas as virtudes.',
      'Os cinco caminhos para provar a existência de Deus.'
    ],
    versicosChave: ['Romanos 1:20', '1 Coríntios 13:2', 'Hebreus 11:6'],
    tags: ['Tomás de Aquino', 'escolástica', 'fé e razão', 'Suma Teológica'],
    fontes: ['Tomás de Aquino, Suma Teológica', 'G.K. Chesterton, St. Thomas Aquinas']
  },
  {
    id: 'hi-005',
    titulo: 'Martin Lutero e a Reforma Protestante',
    categoria: 'História da Igreja',
    subcategoria: 'Reforma',
    conteudo: [
      'Lutero pregou as 95 teses em 1517, iniciando a Reforma.',
      'As cinco solas: sola Scriptura, sola gratia, sola fide, solus Christus, sola Deo gloria.',
      'A justificação pela fé é o artigo da queda ou ascensão da Igreja.',
      'A tradução da Bíblia para o alemão democratizou o acesso à Palavra.',
      'A Reforma restaurou o evangelho bíblico.'
    ],
    versicosChave: ['Romanos 1:17', 'Efésios 2:8-9', 'Gálatas 2:16'],
    tags: ['Lutero', 'Reforma', 'sola fide', 'sola Scriptura'],
    fontes: ['Lutero, 95 Teses', 'Roland Bainton, Here I Stand']
  },
  {
    id: 'hi-006',
    titulo: 'João Calvino — Soberania e Reforma',
    categoria: 'História da Igreja',
    subcategoria: 'Reforma',
    conteudo: [
      'Calvino é autor das Institutas da Religião Cristã.',
      'A soberania de Deus é tema central.',
      'A disciplina eclesiástica é essencial para a Igreja.',
      'A predestinação e a eleição.',
      'O influência de Calvino sobre o protestantismo mundial.'
    ],
    versicosChave: ['Efésios 1:11', 'Romanos 8:29-30', 'Efésios 2:8-9'],
    tags: ['Calvino', 'Reforma', 'soberania', 'Institutas'],
    fontes: ['Calvino, Institutas', 'Bruce Gordon, Calvin']
  },
  {
    id: 'hi-007',
    titulo: 'John Wesley e o Metodismo',
    categoria: 'História da Igreja',
    subcategoria: 'Avivamentos',
    conteudo: [
      'Wesley é fundador do metodismo. Sua teologia enfatiza a santificação.',
      'A graça preveniente capacita a resposta humana.',
      'A perfeição cristã é meta — amor perfeito.',
      'O método metodista incluía pequenos grupos e disciplina.',
      'O avivamento metodista transformou a Inglaterra.'
    ],
    versicosChave: ['1 Tessalonicenses 4:3', '1 Coríntios 13:1-3', 'Hebreus 12:14'],
    tags: ['Wesley', 'metodismo', 'santificação', 'avivamento'],
    fontes: ['John Wesley, Sermons', 'Albert Outler, John Wesley']
  },
  {
    id: 'hi-008',
    titulo: 'Dietrich Bonhoeffer — Graça Custosa',
    categoria: 'História da Igreja',
    subcategoria: 'Teologia Moderna',
    conteudo: [
      'Bonhoeffer é teólogo luterano martirizado pelo nazismo.',
      'A graça custosa é semipreço — Deus nos chama a seguir.',
      'O discipulado radical é central em sua teologia.',
      'A Comunidade Eclesiástica é experiência de fé compartilhada.',
      'A resistência ao mal é responsabilidade cristã.'
    ],
    versicosChave: ['Mateus 16:24', 'Lucas 9:23', 'Romanos 12:1-2'],
    tags: ['Bonhoeffer', 'graça custosa', 'discipulado', 'resistência'],
    fontes: ['Dietrich Bonhoeffer, O Custo do Discipulado', 'Eric Metaxas, Bonhoeffer']
  },
  {
    id: 'hi-009',
    titulo: 'Karl Barth — Teologia Dialética',
    categoria: 'História da Igreja',
    subcategoria: 'Teologia Moderna',
    conteudo: [
      'Barth é o maior teólogo do século XX.',
      'Deus é totalmente diferente (totaliter aliter) e totalmente próximo.',
      'Cristo é a Palavra de Deus — a Bíblia é testemunha.',
      'A teologia dialética contrapõe a razão humana à revelação divina.',
      'O Evangelho contra a cultura.'
    ],
    versicosChave: ['João 1:1-14', 'Hebreus 1:1-2', '1 Coríntios 1:18-25'],
    tags: ['Barth', 'teologia dialética', 'revelação', 'Cristo'],
    fontes: ['Karl Barth, Church Dogmatics', 'Eberhard Busch, Karl Barth: His Life from Letters and Autobiographical Texts']
  },
  {
    id: 'hi-010',
    titulo: 'O Movimento Pentecostal',
    categoria: 'História da Igreja',
    subcategoria: 'Avivamentos',
    conteudo: [
      'O pentecostalismo nasceu no início do século XX (Azusa Street, 1906).',
      'Enfatiza: batismo no Espírito, dons espirituais, cura divina.',
      'A experiência espiritual é central — línguas como evidência.',
      'O pentecostalismo é o movimento cristão de maior crescimento.',
      'Desafios: teologia da prosperidade, emocionalismo.'
    ],
    versicosChave: ['Atos 2:1-4', '1 Coríntios 12-14', 'Marcos 16:17-18'],
    tags: ['pentecostalismo', 'carismático', 'dons', 'Espírito Santo'],
    fontes: ['Harold Berg, The Pentecostal Movement', 'Allan Anderson, An Introduction to Pentecostalism']
  },
  {
    id: 'hi-011',
    titulo: 'As Cruzadas — Fé e Violência',
    categoria: 'História da Igreja',
    subcategoria: 'Medieval',
    conteudo: [
      'As cruzadas foram expedições militares para recuperar a Terra Santa.',
      'A motivação era religiosa — libertar os locais sagrados.',
      'A violência das cruzadas é contrária ao evangelho.',
      'O diálogo cristão-islâmico sofreu com as cruzadas.',
      'A lição: a fé não pode ser imposta pela força.'
    ],
    versicosChave: ['Mateus 26:52', 'Romanos 12:17-21', 'João 18:36'],
    tags: ['cruzadas', 'violência', 'Terra Santa', 'diálogo'],
    fontes: ['Thomas Asbridge, The Crusades', 'Riley-Smith, What Were the Crusades?']
  },
  {
    id: 'hi-012',
    titulo: 'A Inquisição — Fé e Poder',
    categoria: 'História da Igreja',
    subcategoria: 'Medieval',
    conteudo: [
      'A Inquisição foi tribunal eclesiástico para combater heresias.',
      'A tortura e morte de acusados são manchas na história da Igreja.',
      'A busca por pureza doutrinal se tornou perseguição.',
      'A lição: o evangelho se propaga pelo amor, não pela força.',
      'O arrependimento da Igreja é necessário.'
    ],
    versicosChave: ['Mateus 7:1-5', 'Romanos 14:1-4', 'Gálatas 5:1'],
    tags: ['Inquisição', 'heresias', 'perseguição', 'liberdade'],
    fontes: ['Henry Kamen, The Spanish Inquisition']
  },
  {
    id: 'hi-013',
    titulo: 'O Movimento Puritano',
    categoria: 'História da Igreja',
    subcategoria: 'Reforma',
    conteudo: [
      'Os puritanos buscavam purificar a Igreja Anglicana de práticas católicas.',
      'Enfatizavam: pregação fiel, disciplina, santificação.',
      'A influência puritana nos EUA é enorme.',
      'A teologia puritana é reformada.',
      'A vida devocional era intensa.'
    ],
    versicosChave: ['2 Coríntios 7:1', '1 Pedro 1:15-16', 'Romanos 12:1-2'],
    tags: ['puritanos', 'santificação', 'disciplina', 'teologia reformada'],
    fontes: ['J.I. Packer, A Quest for Godliness', 'Baxter, The Saints\' Everlasting Rest']
  },
  {
    id: 'hi-014',
    titulo: 'O Avivamento de Gales (1904-1905)',
    categoria: 'História da Igreja',
    subcategoria: 'Avivamentos',
    conteudo: [
      'O avivamento de Gales transformou o país espiritualmente.',
      'Liderado por Evan Roberts, jovem de 26 anos.',
      'A oração e a confissão de pecados foram centrais.',
      'Milhares foram convertidos.',
      'O avivamento teve impacto social — redução da criminalidade.'
    ],
    versicosChave: ['2 Crônicas 7:14', 'Joel 2:28-29', 'Atos 2:17'],
    tags: ['avivamento', 'Gales', 'Evan Roberts', 'oração'],
    fontes: ['Eifion Evans, The Welsh Revival']
  },
  {
    id: 'hi-015',
    titulo: 'O Movimento Missionário Moderno',
    categoria: 'História da Igreja',
    subcategoria: 'Missiologia',
    conteudo: [
      'William Carey é considerado o pai do missionarismo moderno.',
      'A Grande Comissão é o fundamento da missão.',
      'O séc. XIX viu explosão missionária mundial.',
      'A contextualização é desafio constante.',
      'O missionarismo moderno é holístico — palavra e obra.'
    ],
    versicosChave: ['Mateus 28:19-20', 'Atos 1:8', 'Romanos 10:14-15'],
    tags: ['missionarismo', 'William Carey', 'contextualização', 'Grande Comissão'],
    fontes: ['Timothy C. Tennent, Invitation to World Missions']
  },
  {
    id: 'hi-016',
    titulo: 'O Concílio de Trento — Resposta Católica',
    categoria: 'História da Igreja',
    subcategoria: 'Contrarreforma',
    conteudo: [
      'O Concílio de Trento (1545-1563) foi resposta da Igreja Católica à Reforma.',
      'Reafirma: sete sacramentos, transubstanciação, mérito.',
      'A justificação é cooperação entre graça e obras.',
      'A Escritura e a Tradição são fontes de revelação.',
      'A reforma interna da Igreja.'
    ],
    versicosChave: ['Tiago 2:14-26', 'Hebreus 13:17', 'Efésios 2:8-9'],
    tags: ['Trento', 'Contrarreforma', 'Catolicismo', 'justificação'],
    fontes: ['O\'Malley, Trent: What Happened at the Council']
  },
  {
    id: 'hi-017',
    titulo: 'Soren Kierkegaard — Fé e Existência',
    categoria: 'História da Igreja',
    subcategoria: 'Filosofia Cristã',
    conteudo: [
      'Kierkegaard é pai do existencialismo cristão.',
      'A fé é salto paradoxal — não racionalidade.',
      'O cavaleiro da fé obedece incondicionalmente.',
      'A angústia existencial é realidade humana.',
      'A comunicação indireta é método teológico.'
    ],
    versicosChave: ['Hebreus 11:1', 'Gênesis 22:1-14', 'Mateus 16:24'],
    tags: ['Kierkegaard', 'existencialismo', 'fé', 'paradoxo'],
    fontes: ['Kierkegaard, Meditations Devotionais', 'Kierkegaard, Temor e Tremor']
  },
  {
    id: 'hi-018',
    titulo: 'A Escatologia do Milênio — Debate Histórico',
    categoria: 'História da Igreja',
    subcategoria: 'Escatologia',
    conteudo: [
      'O debate milenarista percorre a história da Igreja.',
      'O premilenarismo era predominante nos primeiros séculos.',
      'Agostinho influenciou o amilenarismo.',
      'A Reforma adotou principalmente o amilenarismo.',
      'O premilenarismo dispensacionalista surgiu no séc. XIX.'
    ],
    versicosChave: ['Apocalipse 20:1-6', 'Isaías 11:6-9'],
    tags: ['milênio', 'premilenarismo', 'amilenarismo', 'dispensacionalismo'],
    fontes: ['George Eldon Ladd, The Gospel of the Kingdom']
  },
  {
    id: 'hi-019',
    titulo: 'O Movimento de Santidade',
    categoria: 'História da Igreja',
    subcategoria: 'Avivamentos',
    conteudo: [
      'O movimento de santidade surgiu no séc. XIX.',
      'Enfatizava a santificação completa como experiência segunda.',
      'Wesley é a raiz teológica.',
      'O pentecostalismo é herdeiro do movimento de santidade.',
      'A busca por perfeição cristã.'
    ],
    versicosChave: ['1 Tessalonicenses 4:3', 'Hebreus 12:14', '1 Pedro 1:15-16'],
    tags: ['santidade', 'santificação', 'Wesley', 'perfeição'],
    fontes: ['Timothy Smith, The Revival of Religion in America']
  },
  {
    id: 'hi-020',
    titulo: 'A Igreja Primitiva — Vida e Organização',
    categoria: 'História da Igreja',
    subcategoria: 'Patrística',
    conteudo: [
      'A Igreja primitiva viveu em comunhão, partilha e oração.',
      'A organização incluía bispos, presbíteros e diáconos.',
      'A liturgia era simples: Palavra, oração, Ceia.',
      'A perseguição fortaleceu a fé.',
      'A tradição apostólica é fundamento da Igreja.'
    ],
    versicosChave: ['Atos 2:42-47', '1 Timóteo 3:1-13', 'Filipenses 1:5'],
    tags: ['Igreja primitiva', 'organização', 'liturgia', 'perseguição'],
    fontes: ['Oskar Skarsaune, In the Shadow of the Temple']
  },
  {
    id: 'hi-021',
    titulo: 'São Francisco de Assis — Pobreza e Amor',
    categoria: 'História da Igreja',
    subcategoria: 'Medieval',
    conteudo: [
      'Francisco é modelo de pobreza evangélica e amor à criação.',
      'Abandonou riqueza para seguir a Cristo.',
      'A ordem franciscana renovou a Igreja medieval.',
      'O Cantico das Criaturas celebra a criação.',
      'O ecumenismo e o diálogo inter-religioso.'
    ],
    versicosChave: ['Mateus 5:3', 'Mateus 19:21', 'Lucas 12:33'],
    tags: ['Francisco', 'pobreza', 'criação', 'franciscanos'],
    fontes: ['G.K. Chesterton, St. Francis of Assisi']
  },
  {
    id: 'hi-022',
    titulo: 'A Escravidão e a Igreja',
    categoria: 'História da Igreja',
    subcategoria: 'Justiça Social',
    conteudo: [
      'A Igreja teve papel ambíguo na escravidão.',
      'Alguns cristãos combateram a escravidão (Wesley, Wilberforce).',
      'A teologia da escravidão foi usada para justificá-la.',
      'O movimento abolicionista era cristão.',
      'A lição: a Bíblia é contra toda forma de opressão.'
    ],
    versicosChave: ['Filemom 1:16-21', 'Gálatas 3:28', 'Isaías 58:6'],
    tags: ['escravidão', 'abolicionismo', 'justiça', 'Wilberforce'],
    fontes: ['David Brion Davis, Inhuman Bondage']
  },
  {
    id: 'hi-023',
    titulo: 'O Movimiento da Teologia da Libertação',
    categoria: 'História da Igreja',
    subcategoria: 'Teologia Moderna',
    conteudo: [
      'A teologia da libertação surgiu na América Latina nos anos 60.',
      'Gustavo Gutiérrez é principal expoente.',
      'A opção preferencial pelos pobres.',
      'A leitura da Bíblia a partir dos oprimidos.',
      'O debatete entre marxismo e cristianismo.'
    ],
    versicosChave: ['Lucas 4:18-19', 'Mateus 25:31-46', 'Isaías 61:1'],
    tags: ['teologia da libertação', 'Gutiérrez', 'pobres', 'América Latina'],
    fontes: ['Gustavo Gutiérrez, A Theology of Liberation']
  },
  {
    id: 'hi-024',
    titulo: 'A Igreja Ortodoxa — Tradição e Liturgia',
    categoria: 'História da Igreja',
    subcategoria: 'Ortodoxia',
    conteudo: [
      'A Igreja Ortodoxa preserva a tradição dos primeiros séculos.',
      'A liturgia é central — a Divina Liturgia é mistério.',
      'A iconografia é teologia visual.',
      'A theosis (divinização) é meta da vida cristã.',
      'A unidade entre Igreja Ortodoxa e Católica é buscada.'
    ],
    versicosChave: ['2 Tessalonicenses 2:15', '1 Coríntios 11:2', '2 Pedro 1:4'],
    tags: ['Ortodoxia', 'liturgia', 'theosis', 'tradição'],
    fontes: ['Timothy Ware, The Orthodox Church']
  },
  {
    id: 'hi-025',
    titulo: 'O Ecumenismo Moderno',
    categoria: 'História da Igreja',
    subcategoria: 'Ecumenismo',
    conteudo: [
      'O ecumenismo busca a unidade visível da Igreja.',
      'O Concílio Vaticano II abriu diálogo.',
      'O Conselho Mundial de Igrejas (1948).',
      'Diferenças doutrinais persistem.',
      'A unidade é dom de Deus que requer cooperação humana.'
    ],
    versicosChave: ['João 17:20-23', 'Efésios 4:1-6'],
    tags: ['ecumenismo', 'unidade', 'Vaticano II', 'diálogo'],
    fontes: ['John Moltmann, The Church in the Power of the Spirit']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. ESTUDOS COMPARATIVOS (50+ estudos)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'ec-001',
    titulo: 'Comparação entre os Quatro Evangelhos',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Comparação Sinótica',
    conteudo: [
      'Mateus, Marcos e Lucas são sinóticos — narram a mesma história com ênfases diferentes.',
      'João é distinto — apresentação teológica mais elevada.',
      'Mateus enfatiza Jesus como Messias; Marcos como servo; Lucas como Salvador universal.',
      'João declara a divindade de Cristo no prólogo.',
      'As harmonias buscam unificar os relatos.'
    ],
    versicosChave: ['Mateus 1:1', 'Marcos 1:1', 'Lucas 1:1-4', 'João 1:1-3'],
    tags: ['evangelhos', 'sinóticos', 'comparação', 'harmonia'],
    fontes: ['Donald Hagner, Matthew (WBC)', 'Craig Keener, Matthew (HNTC)']
  },
  {
    id: 'ec-002',
    titulo: 'Criação em Gênesis e Ciência Moderna',
    categoria: 'Estudos Comparativos',
    subcategoria: 'AT e Ciência',
    conteudo: [
      'Gênesis 1-2 apresenta o relato da criação.',
      'Existem múltiplas interpretações: literal, literária, framework.',
      'A ciência moderna desafia interpretações literalistas.',
      'A teologia da criação não depende de cronologia.',
      'Deus é autor da natureza e da Escritura — não pode haver conflito real.'
    ],
    versicosChave: ['Gênesis 1:1', 'Salmos 19:1', 'Romanos 1:20'],
    tags: ['criação', 'Gênesis', 'ciência', 'evolução', 'framework'],
    fontes: ['Henri Blocher, In the Beginning', 'John Walton, The Lost World of Genesis One']
  },
  {
    id: 'ec-003',
    titulo: 'Alianças do Antigo e Novo Testamento',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Alianças',
    conteudo: [
      'As alianças do AT (Noé, Abraão, Moisés, Davi) preparam para a nova aliança.',
      'A nova aliança em Cristo cumpre e supera as anteriores.',
      'A continuidade é tema: a lei se cumpre no evangelho.',
      'A descontinuidade: a nova aliança é melhor.',
      'Cristo é o mediador da nova aliança.'
    ],
    versicosChave: ['Jeremias 31:31-34', 'Hebreus 8:6-13', 'Lucas 22:20'],
    tags: ['alianças', 'AT', 'NT', 'nova aliança', 'cumprimento'],
    fontes: ['O. Palmer Robertson, The Christ of the Covenants']
  },
  {
    id: 'ec-004',
    titulo: 'Temas Mesianos — AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Messianismo',
    conteudo: [
      'As profecias messiânicas do AT se cumprem em Cristo.',
      'Isaías 53 descreve a morte substitutiva.',
      'Salmo 22 antecipa a crucificação.',
      'Daniel 7:13-14 descreve o Filho do Homem.',
      'Cristo cumpre todas as profecias.'
    ],
    versicosChave: ['Isaías 53', 'Salmo 22', 'Daniel 7:13-14', 'Mateus 26:64'],
    tags: ['messianismo', 'profecia', 'cumprimento', 'Isaías', 'Salmo'],
    fontes: ['Walter Kaiser, The Messiah in the Old Testament']
  },
  {
    id: 'ec-005',
    titulo: 'Sofrimento no AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tematica',
    conteudo: [
      'O sofrimento é tema que percorre toda a Bíblia.',
      'No AT: Jó, Salmos de lamento, profetas.',
      'No NT: Cristo é o sofredor por excelência.',
      'O sofrimento tem sentido redentor em Cristo.',
      'A esperança é vitória sobre o sofrimento.'
    ],
    versicosChave: ['Jó 1:21', 'Isaías 53:5', 'Filipenses 3:10', 'Romanos 8:18'],
    tags: ['sofrimento', 'redenção', 'lamento', 'Cristo'],
    fontes: ['Claus Westermann, Praise and Lament in the Psalms']
  },
  {
    id: 'ec-006',
    titulo: 'Lei no AT e Graça no NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Lei e Graça',
    conteudo: [
      'A relação entre Lei e Evangelho é central no cristianismo.',
      'A Lei revela o pecado; o Evangelho mostra o Salvador.',
      'A Lei não é anulada mas cumprida em Cristo.',
      'Graça não é antinomianismo — a obediência continua.',
      'A Lei moral permanece; as cerimônias se cumprem.'
    ],
    versicosChave: ['Mateus 5:17-20', 'Romanos 7:7-12', 'Gálatas 3:24'],
    tags: ['lei', 'graça', 'cumprimento', 'evangelho'],
    fontes: ['Calvino, Institutas II.7-8']
  },
  {
    id: 'ec-007',
    titulo: 'Reis de Israel e Reinado de Cristo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Realeza',
    conteudo: [
      'Os reis de Israel são prefigurações de Cristo.',
      'Davi é o rei segundo o coração de Deus.',
      'Salomão é rei de sabedoria; Cristo é Sabedoria.',
      'Os reis fracassam; Cristo é Rei perfeito.',
      'O Reino de Cristo é eterno e universal.'
    ],
    versicosChave: ['2 Samuel 7:12-16', 'Salmo 110:1', 'Lucas 1:32-33'],
    tags: ['realeza', 'Davi', 'Salomão', 'Cristo Rei'],
    fontes: ['O. Palmer Robertson, The Christ of the Covenants']
  },
  {
    id: 'ec-008',
    titulo: 'Tipologias Bíblicas — Tipos e Antitipos',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'Tipologia é estudo de prefigurações no AT que se cumprem no NT.',
      'Adão é tipo de Cristo (Romanos 5:14).',
      'O cordeiro pascual é tipo de Cristo (1 Coríntios 5:7).',
      'O maná é tipo de Cristo pão da vida (João 6:32-35).',
      'A serpente de bronze é tipo de Cristo (João 3:14).'
    ],
    versicosChave: ['Romanos 5:14', '1 Coríntios 5:7', 'João 6:35', 'João 3:14'],
    tags: ['tipologia', 'AT', 'NT', 'prefiguração', 'cumprimento'],
    fontes: ['G.K. Beale, The Temple and the Church\'s Mission']
  },
  {
    id: 'ec-009',
    titulo: 'Adoração no AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Liturgia',
    conteudo: [
      'A adoração no AT incluía templo, sacrifícios, festas.',
      'No NT, a adoração é em espírito e verdade.',
      'Cristo é o novo templo — comunhão direta com Deus.',
      'A Ceia do Senhor substitui os sacrifícios.',
      'A adoração é holística — toda a vida.'
    ],
    versicosChave: ['João 4:23-24', 'Hebreus 9:11-14', 'Romanos 12:1-2'],
    tags: ['adoração', 'templo', 'sacrifícios', 'espírito e verdade'],
    fontes: ['Ralph P. Martin, Worship in the Early Church']
  },
  {
    id: 'ec-010',
    titulo: 'Profecia no AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Profecia',
    conteudo: [
      'O AT contém profecias messiânicas detalhadas.',
      'O NT cumpre e interpreta as profecias.',
      'Cristo é o profeta por excelência.',
      'A profecia no NT é continuada na Igreja.',
      'O padrão: revelação → cumprimento → interpretação.'
    ],
    versicosChave: ['Deuteronômio 18:15', 'Atos 3:22-23', 'Hebreus 1:1-2'],
    tags: ['profecia', 'messias', 'cumprimento', 'revelação'],
    fontes: ['Walter Kaiser, The Messiah in the Old Testament']
  },
  {
    id: 'ec-011',
    titulo: 'Sacramentos — Prefigurações no AT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Sacramentos',
    conteudo: [
      'O batismo tem prefigurações: dilúvio, Mar Vermelho, circuncisão.',
      'A Ceia tem prefigurações: Páscoa, maná, águas amargas.',
      'Os sacramentos do AT são tipos dos do NT.',
      'A continuidade é sinal de graça.',
      'A superação: Cristo é a realidade, os sacramentos são sinais.'
    ],
    versicosChave: ['1 Coríntios 10:1-4', '1 Coríntios 5:7', 'Romanos 6:3-4'],
    tags: ['sacramentos', 'batismo', 'Ceia', 'tipologia'],
    fontes: ['Michael Morales, Who Shall Ascend the Mountain of the Lord?']
  },
  {
    id: 'ec-012',
    titulo: 'Justiça no AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Justiça',
    conteudo: [
      'A justiça no AT é mantida pela lei.',
      'A justiça no NT é imputada pela fé.',
      'Cristo cumpre a justiça da lei.',
      'A justiça de Deus se revela na cruz.',
      'A justiça é tanto imputada quanto transformadora.'
    ],
    versicosChave: ['Romanos 3:21-26', 'Gálatas 3:24', 'Mateus 5:17'],
    tags: ['justiça', 'lei', 'fé', 'imputação', 'cumprimento'],
    fontes: ['Michael Horton, Justification']
  },
  {
    id: 'ec-013',
    titulo: 'Misericórdia no AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Misericórdia',
    conteudo: [
      'A misericórdia de Deus é tema que percorre toda a Bíblia.',
      'No AT: Deus se arrepende, perdoa, restaura.',
      'No NT: Cristo é a misericórdia encarnada.',
      'A misericórdia não anula a justiça — é cumprida nela.',
      'Somos chamados a ser misericordiosos.'
    ],
    versicosChave: ['Salmos 103:8-13', 'Lucas 6:36', 'Tiago 2:13'],
    tags: ['misericórdia', 'perdão', 'compaixão', 'misericórdia encarnada'],
    fontes: ['Agostinho, De Trinitate']
  },
  {
    id: 'ec-014',
    titulo: 'Espírito Santo no AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Pneumatologia',
    conteudo: [
      'No AT, o Espírito atuava de forma especial e temporária.',
      'No NT, Ele habita permanentemente nos crentes.',
      'A efusão do Espírito em Pentecostes é marco.',
      'A continuidade: Deus sempre esteve presente.',
      'A superança: a habitação permanente é nova.'
    ],
    versicosChave: ['Atos 2:1-4', 'João 14:16-17', 'Romanos 8:9'],
    tags: ['Espírito Santo', 'Pentecostes', 'habitação', 'continuidade'],
    fontes: ['Gordon Fee, God\'s Empowering Presence']
  },
  {
    id: 'ec-015',
    titulo: 'Adoração — Templo e Igreja',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'O templo do AT era centro de adoração e sacrifício.',
      'A Igreja é o novo templo — construída de pedras vivas.',
      'Cristo é o novo Sumo Sacerdote.',
      'Os sacrifícios foram cumpridos na cruz.',
      'A Igreja é sacerdócio real.'
    ],
    versicosChave: ['1 Pedro 2:5', 'Efésios 2:19-22', 'Hebreus 9:11-14'],
    tags: ['templo', 'Igreja', 'sacerdócio', 'sacrifício'],
    fontes: ['G.K. Beale, The Temple and the Church\'s Mission']
  },
  {
    id: 'ec-016',
    titulo: 'Esperança no AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Escatologia',
    conteudo: [
      'A esperança no AT é messiânica — espera do Messias.',
      'A esperança no NT é escatológica — espera da volta de Cristo.',
      'A continuidade: Deus cumprirá Suas promessas.',
      'A superança: o Reino já começou.',
      'A esperança é certeza, não wishful thinking.'
    ],
    versicosChave: ['Isaías 9:6-7', 'Mateus 12:28', '1 Tessalonicenses 4:16-17'],
    tags: ['esperança', 'messias', 'segunda vinda', 'Reino'],
    fontes: ['G.E. Ladd, A Theology of the New Testament']
  },
  {
    id: 'ec-017',
    titulo: 'Pecado e Redenção — Narrativa Bíblica',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Redenção',
    conteudo: [
      'A narrativa bíblica é: criação → queda → redenção → consumação.',
      'O pecado corrompe tudo; a redenção restaura tudo.',
      'Cristo é o centro da narrativa redentora.',
      'A história não é cíclica — é linear e teleológica.',
      'O fim é restauração completa.'
    ],
    versicosChave: ['Gênesis 3:15', 'Romanos 5:12-21', 'Apocalipse 21:1-4'],
    tags: ['narrativa', 'pecado', 'redenção', 'consumação'],
    fontes: ['Graeme Goldsworthy, According to Plan']
  },
  {
    id: 'ec-018',
    titulo: 'Amor no AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Ética',
    conteudo: [
      'O amor a Deus e ao próximo é central em ambas as alianças.',
      'O AT ordena: Amarás o Senhor teu Deus. Amarás o próximo.',
      'Jesus resumo a lei no duplo mandamento do amor.',
      'O amor cristão (agape) é sacrificial.',
      'O amor é a marca dos discípulos.'
    ],
    versicosChave: ['Deuteronômio 6:5', 'Levítico 19:18', 'Mateus 22:37-40', 'João 13:34-35'],
    tags: ['amor', 'mandamento', 'agape', 'duplo mandamento'],
    fontes: ['Anders Nygren, Agape and Eros']
  },
  {
    id: 'ec-019',
    titulo: 'Sofrimento de Cristo — Profecia e Cumprimento',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Cristologia',
    conteudo: [
      'O sofrimento de Cristo é profetizado no AT.',
      'Isaías 53 é a profecia mais clara.',
      'Salmo 22 antecipa a crucificação.',
      'Zacarias 12:10 prevê o ferimento.',
      'O NT cumpre todas as profecias.'
    ],
    versicosChave: ['Isaías 53:3-7', 'Salmo 22:16-18', 'Zacarias 12:10'],
    tags: ['sofrimento', 'profecia', 'Isaías 53', 'crucificação'],
    fontes: ['Walter Kaiser, The Messiah in the Old Testament']
  },
  {
    id: 'ec-020',
    titulo: 'Deus como Pai — AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'Deus é chamado de Pai no AT — geralmente como criador e provedor.',
      'No NT, Jesus intensifica a relação: Abba, Pai.',
      'A paternidade de Deus é amor, cuidado, autoridade.',
      'A adoção nos torna filhos.',
      'A relação Pai-Filho-Espírito é Trindade.'
    ],
    versicosChave: ['Isaías 63:16', 'Romanos 8:15', 'Gálatas 4:4-6', 'João 20:17'],
    tags: ['Pai', 'paternidade', 'Abba', 'filiação', 'Trindade'],
    fontes: ['Agostinho, De Trinitate']
  },
  {
    id: 'ec-021',
    titulo: 'Juízo no AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Escatologia',
    conteudo: [
      'O juízo é tema que percorre toda a Bíblia.',
      'No AT: dilúvio, exílio, destruição do templo.',
      'No NT: Cristo é juiz final.',
      'O juízo é justo e final.',
      'A graça precede o julgamento.'
    ],
    versicosChave: ['Gênesis 6-9', 'Mateus 25:31-46', 'Atos 17:31'],
    tags: ['juízo', 'dilúvio', 'exílio', 'juízo final'],
    fontes: ['Robert Mounce, The Book of Revelation']
  },
  {
    id: 'ec-022',
    titulo: 'Aliança com Abraão e Fé em Cristo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Alianças',
    conteudo: [
      'Abraão creu em Deus e lhe foi imputado justiça.',
      'A fé de Abraão é modelo para todos.',
      'Cristo é a descendência prometida.',
      'A bênção de Abraão se estende a todas as nações.',
      'Somos filhos de Abraão pela fé.'
    ],
    versicosChave: ['Gênesis 15:6', 'Gálatas 3:7-9', 'Romanos 4:16-25'],
    tags: ['Abraão', 'fé', 'imputação', 'aliança', 'filhos'],
    fontes: ['O. Palmer Robertson, The Christ of the Covenants']
  },
  {
    id: 'ec-023',
    titulo: 'Lei Moral — Permanência e Aplicação',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Ética',
    conteudo: [
      'A lei moral (Decálogo) é permanente.',
      'As leis cerimoniais se cumprem em Cristo.',
      'As leis civis são contextuais.',
      'O amor é a forma da lei.',
      'A obediência é resposta à graça.'
    ],
    versicosChave: ['Mateus 5:17-20', 'Romanos 13:8-10', 'Gálatas 5:14'],
    tags: ['lei moral', 'Decálogo', 'permanência', 'amor'],
    fontes: ['Calvino, Institutas II.7-8']
  },
  {
    id: 'ec-024',
    titulo: 'Salvação — Liberdade do Egito e em Cristo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A libertação do Egito é tipo da salvação em Cristo.',
      'Escravidão → liberdade; condenação → justiça.',
      'O batismo é passagem do Mar Vermelho.',
      'O maná é tipo de Cristo pão da vida.',
      'A peregrinação é a vida cristã.'
    ],
    versicosChave: ['Êxodo 3:7-8', '1 Coríntios 10:1-4', 'Romanos 6:3-4'],
    tags: ['Êxodo', 'salvação', 'libertação', 'batismo', 'tipo'],
    fontes: ['Michael Morales, Who Shall Ascend the Mountain of the Lord?']
  },
  {
    id: 'ec-025',
    titulo: 'Promessas Abraâmicas e o Grande Comissão',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Missiologia',
    conteudo: [
      'A promessa a Abraão é bênção universal.',
      'A Grande Comissão é o cumprimento.',
      'De Abraão a todas as nações.',
      'O evangelho é para todos os povos.',
      'A missão é continuada da promessa.'
    ],
    versicosChave: ['Gênesis 12:3', 'Mateus 28:19-20', 'Gálatas 3:8'],
    tags: ['Abraão', 'promessa', 'missão', 'nações', 'Grande Comissão'],
    fontes: ['O. Palmer Robertson, The Christ of the Covenants']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. HERMENÊUTICA (50+ estudos)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'he-001',
    titulo: 'Interpretação Literal — Método Gramatical-Histórico',
    categoria: 'Hermenêutica',
    subcategoria: 'Métodos',
    conteudo: [
      'O método literal busca o sentido que o autor quis comunicar ao leitor original.',
      'Respeita o contexto, o gênero literário e a linguagem.',
      'Não é literalismo — reconhece metáforas, alegorias, parábolas.',
      'É o método predominante na Reforma Protestantista.',
      'A Bíblia é interpreta por ela mesma — analogia da fé.'
    ],
    versicosChave: ['2 Timóteo 2:15', '2 Pedro 1:20-21'],
    tags: ['literal', 'gramatical-histórico', 'método', 'contexto'],
    fontes: ['D.A. Carson, Exegetical Fallacies']
  },
  {
    id: 'he-002',
    titulo: 'Gêneros Literários na Bíblia',
    categoria: 'Hermenêutica',
    subcategoria: 'Gêneros',
    conteudo: [
      'A Bíblia contém múltiplos gêneros: história, poesia, profecia, epístola, apocalipse.',
      'Cada gênero requer método interpretativo diferente.',
      'Uma parábola não é história literal.',
      'Um salmo não é doutrina sistemática.',
      'O gênero é chave para interpretação correta.'
    ],
    versicosChave: ['Eclesiastes 3:1-8', 'Salmos 1:1', 'Mateus 13:1-9'],
    tags: ['gêneros', 'história', 'poesia', 'profecia', 'epístola'],
    fontes: ['Gordon Fee, How to Read the Bible for All Its Worth']
  },
  {
    id: 'he-003',
    titulo: 'Contexto Histórico-Cultural',
    categoria: 'Hermenêutica',
    subcategoria: 'Contexto',
    conteudo: [
      'Entender o contexto histórico-cultural é essencial para interpretação.',
      'A Bíblia foi escrita em culturas específicas.',
      'Costumes, idiomas e situações influenciam o significado.',
      'A pesquisa bíblica (background study) é necessária.',
      'Contextualização é adaptar a mensagem sem perder a verdade.'
    ],
    versicosChave: ['1 Coríntios 9:19-23', 'Atos 17:16-34'],
    tags: ['contexto', 'história', 'cultura', 'contextualização'],
    fontes: ['Craig Keener, Backgrounds to the New Testament']
  },
  {
    id: 'he-004',
    titulo: 'Línguas Originais — Hebraico e Grego',
    categoria: 'Hermenêutica',
    subcategoria: 'Línguas',
    conteudo: [
      'O hebraico é a língua do AT — rica em imagens e paradoxos.',
      'O grego do NT é koiné — língua comum do império romano.',
      'O aramaico aparece em Daniel e palavras de Jesus.',
      'Estudar as línguas originais é útil mas não indispensável.',
      'Traduções fiéis são confiáveis para a maioria dos crentes.'
    ],
    versicosChave: ['1 Coríntios 14:1-5', 'Efésios 4:11-12'],
    tags: ['hebraico', 'grego', 'aramaico', 'línguas', 'tradução'],
    fontes: ['Mounce, Basics of Biblical Greek', 'Pratico and Van Pelt, Basics of Biblical Hebrew']
  },
  {
    id: 'he-005',
    titulo: 'Crítica Textual — Manuscritos e Variantes',
    categoria: 'Hermenêutica',
    subcategoria: 'Crítica Textual',
    conteudo: [
      'A crítica textual busca estabelecer o texto original das Escrituras.',
      'Temos milhares de manuscritos — mais do que qualquer outro documento antigo.',
      'As variantes são poucas e não afetam doutrinas essenciais.',
      'O Novo Testamento é o documento mais bem atestado da antiguidade.',
      'A tradução Reina-Valera é baseada em manuscritos confiáveis.'
    ],
    versicosChave: ['2 Pedro 1:20-21', 'Apocalipse 22:18-19'],
    tags: ['crítica textual', 'manuscritos', 'variantes', 'texto original'],
    fontes: ['Bruce Metzger, The Text of the New Testament', 'Daniel Wallace, Revisiting the Corruption of the New Testament']
  },
  {
    id: 'he-006',
    titulo: 'Interpretação Alegórica — Uso e Limites',
    categoria: 'Hermenêutica',
    subcategoria: 'Métodos',
    conteudo: [
      'A interpretação alegórica busca significados além do literal.',
      'Foi predominante nos Padres da Igreja (Orígenes, Clemente).',
      'O perigo é subjetividade — cada um vê o que quer.',
      'A alegoria legítima é aquela que o texto permite.',
      'O método literal é mais confiável.'
    ],
    versicosChave: ['Gálatas 4:21-31', '2 Coríntios 3:14-16'],
    tags: ['alegoria', 'Orígenes', 'Padres', 'método'],
    fontes: ['Henri Blocher, In the Beginning']
  },
  {
    id: 'he-007',
    titulo: 'Tipologia — Prefigurações Bíblicas',
    categoria: 'Hermenêutica',
    subcategoria: 'Métodos',
    conteudo: [
      'A tipologia estuda prefigurações no AT que se cumprem no NT.',
      'É diferente de alegoria — é baseada no texto bíblico.',
      'Exemplos: Adão-Cristo, Arca-Batismo, Páscoa-Ceia.',
      'A tipologia é legítima quando o NT confirma.',
      'Enriquece a compreensão bíblica.'
    ],
    versicosChave: ['Romanos 5:14', '1 Coríntios 10:1-4', 'Hebreus 9:11-14'],
    tags: ['tipologia', 'prefiguração', 'AT', 'NT', 'cumprimento'],
    fontes: ['G.K. Beale, The Temple and the Church\'s Mission']
  },
  {
    id: 'he-008',
    titulo: 'Narrativa Bíblica — Interpretação Narrativa',
    categoria: 'Hermenêutica',
    subcategoria: 'Métodos',
    conteudo: [
      'A interpretação narrativa respeita a narrativa como gênero.',
      'Personagens, enredo, tema e cenário são elementos-chave.',
      'A narrativa bíblica tem unidade — aponta para Cristo.',
      'A moral da história deve ser extraída com cuidado.',
      'A Bíblia é história que se torna teologia.'
    ],
    versicosChave: ['Lucas 24:27', '1 Coríntios 10:11'],
    tags: ['narrativa', 'história', 'personagens', 'enredo'],
    fontes: ['Leland Ryken, How to Read the Bible as Literature']
  },
  {
    id: 'he-009',
    titulo: 'Poesia Hebraica — Paralelismo e Imagem',
    categoria: 'Hermenêutica',
    subcategoria: 'Poesia',
    conteudo: [
      'A poesia hebraica usa paralelismo: sinônimo, antitético, sintético.',
      'As imagens são vívidas e concretas.',
      'O Salmo 23 usa metáfora pastoral.',
      'A poesia expressa emoção, não apenas doutrina.',
      'A interpretação deve respeitar o gênero poético.'
    ],
    versicosChave: ['Salmo 23:1-6', 'Salmo 119:105', 'Provérbios 3:5-6'],
    tags: ['poesia', 'paralelismo', 'metáfora', 'imagem'],
    fontes: ['Claus Westermann, Praise and Lament in the Psalms']
  },
  {
    id: 'he-010',
    titulo: 'Profecia — Literal e Simbólica',
    categoria: 'Hermenêutica',
    subcategoria: 'Profecia',
    conteudo: [
      'A profecia pode ser literal (Isaías 53) ou simbólica (Apocalipse).',
      'O contexto determina a interpretação.',
      'As profecias messiânicas são tipicamente literais.',
      'O Apocalipse usa simbolismo apocalíptico.',
      'O cuidado hermenêutico é necessário.'
    ],
    versicosChave: ['Isaías 53:5', 'Apocalipse 1:1-3', 'Daniel 7:13-14'],
    tags: ['profecia', 'literal', 'simbólico', 'Apocalipse'],
    fontes: ['G.K. Beale, Revelation (NICNT)']
  },
  {
    id: 'he-011',
    titulo: 'Parábolas de Jesus — Interpretação',
    categoria: 'Hermenêutica',
    subcategoria: 'Gêneros',
    conteudo: [
      'As parábolas são histórias com lição moral ou espiritual.',
      'Cada parábola tem ponto central — não devemos detalhar demais.',
      'O contexto revela o significado.',
      'As parábolas são sobre o Reino de Deus.',
      'Devemos buscar o significado do autor, não inventar.'
    ],
    versicosChave: ['Mateus 13:10-17', 'Lucas 15:11-32'],
    tags: ['parábolas', 'Reino', 'Jesus', 'interpretação'],
    fontes: ['Klyne Snodgrass, Stories with Intent']
  },
  {
    id: 'he-012',
    titulo: 'Hebreus — Hermenêutica do Novo Testamento',
    categoria: 'Hermenêutica',
    subcategoria: 'Hermenêutica NT',
    conteudo: [
      'Hebreus é exemplo de hermenêutica do NT aplicando o AT.',
      'Cristo é superior a anjos, Moisés, Aarão.',
      'O novo testamento é superior ao antigo.',
      'A continuidade é tema central.',
      'O método é tipológico e christocentric.'
    ],
    versicosChave: ['Hebreus 1:1-3', 'Hebreus 8:6-13'],
    tags: ['Hebreus', 'hermenêutica', 'AT', 'superioridade'],
    fontes: ['Craig Koester, Hebrews (Anchor)']
  },
  {
    id: 'he-013',
    titulo: 'Paulo e a Lei — Hermenêutica Paulina',
    categoria: 'Hermenêutica',
    subcategoria: 'Hermenêutica NT',
    conteudo: [
      'Paulo tem hermenêutica própria da Lei.',
      'A lei é pedagogo para Cristo.',
      'A justificação é pela fé, não pela lei.',
      'A lei moral permanece, as cerimônias cessam.',
      'O equilíbrio entre graça e obediência.'
    ],
    versicosChave: ['Gálatas 3:24', 'Romanos 7:7-12', 'Romanos 10:4'],
    tags: ['Paulo', 'lei', 'justificação', 'hermenêutica'],
    fontes: ['N.T. Wright, Paul and the Faithfulness of God']
  },
  {
    id: 'he-014',
    titulo: 'Cristologia da Escritura — Unidade e Diversidade',
    categoria: 'Hermenêutica',
    subcategoria: 'Cristologia',
    conteudo: [
      'Cristo é o centro de toda a Escritura.',
      'A cristologia se desenvolve progressivamente.',
      'O AT prefigura; o NT declara.',
      'Cada livro contribui para a cristologia.',
      'A unidade cristológica é fundamental.'
    ],
    versicosChave: ['Lucas 24:27', 'João 5:39', 'Hebreus 1:1-2'],
    tags: ['Cristo', 'cristologia', 'unidade', 'progressão'],
    fontes: ['Graeme Goldsworthy, According to Plan']
  },
  {
    id: 'he-015',
    titulo: 'Interpretação do Apocalipse',
    categoria: 'Hermenêutica',
    subcategoria: 'Apocalipse',
    conteudo: [
      'O Apocalipse é gênero apocalíptico — símbolos e visões.',
      'Existem quatro abordagens: preterista, historicista, futurista, idealista.',
      'O símbolo deve ser interpretado pelo contexto.',
      'A mensagem é de esperança e juízo.',
      'Cristo é vitorioso sobre todas as forças do mal.'
    ],
    versicosChave: ['Apocalipse 1:1-3', 'Apocalipse 22:18-19'],
    tags: ['Apocalipse', 'símbolos', 'visões', 'esperança'],
    fontes: ['G.K. Beale, Revelation (NICNT)']
  },
  {
    id: 'he-016',
    titulo: 'Interpretação de Eclesiastes',
    categoria: 'Hermenêutica',
    subcategoria: 'Livros Poéticos',
    conteudo: [
      'Eclesiastes é gênero sapiencial — reflexão sobre a vida.',
      'O tema é a vanidade (hevel) de tudo sob o sol.',
      'A conclusão: temer a Deus e guardar os mandamentos.',
      'O pessimismo é aparente — é realismo fé.',
      'A relevância para a vida contemporânea.'
    ],
    versicosChave: ['Eclesiastes 1:2', 'Eclesiastes 12:13'],
    tags: ['eclesiastes', 'vanidade', 'sabedoria', 'realismo'],
    fontes: ['Tremper Longman III, Ecclesiastes (NICOT)']
  },
  {
    id: 'he-017',
    titulo: 'Salmos de Lamento — Interpretação',
    categoria: 'Hermenêutica',
    subcategoria: 'Poesia',
    conteudo: [
      'Os Salmos de lamento expressam dor e busca por Deus.',
      'Estrutura: invocação, queixa, confiança, petição, louvor.',
      'Lamentar não é falta de fé — é fé honesta.',
      'O louvor no final é resposta de fé.',
      'Relevância para o sofrimento humano.'
    ],
    versicosChave: ['Salmo 13:1-6', 'Salmo 22:1-31', 'Salmo 88:1'],
    tags: ['lamento', 'dor', 'louvor', 'esperança'],
    fontes: ['Walter Brueggemann, The Message of the Psalms']
  },
  {
    id: 'he-018',
    titulo: 'Profecias Messiânicas — Hermenêutica',
    categoria: 'Hermenêutica',
    subcategoria: 'Profecia',
    conteudo: [
      'As profecias messiânicas são literais e simbólicas.',
      'O contexto revela o cumprimento.',
      'Cristo é o centro das profecias.',
      'O NT cumpre e interpreta o AT.',
      'A unidade profética é evidência divina.'
    ],
    versicosChave: ['Isaías 53', 'Salmo 22', 'Daniel 7:13-14'],
    tags: ['messias', 'profecia', 'cumprimento', 'AT', 'NT'],
    fontes: ['Walter Kaiser, The Messiah in the Old Testament']
  },
  {
    id: 'he-019',
    titulo: 'Ética no AT e NT — Continuidade',
    categoria: 'Hermenêutica',
    subcategoria: 'Ética',
    conteudo: [
      'A ética bíblica tem continuidade e mudança.',
      'O amor é a forma da lei.',
      'A justiça é tema permanente.',
      'A misericórdia transcende rituais.',
      'A ética cristã é centrada em Cristo.'
    ],
    versicosChave: ['Mateus 22:37-40', 'Romanos 13:8-10', 'Tiago 2:8'],
    tags: ['ética', 'lei', 'amor', 'justiça', 'continuidade'],
    fontes: ['Calvino, Institutas II.7-8']
  },
  {
    id: 'he-020',
    titulo: 'Hermenêutica Reformada — Princípios',
    categoria: 'Hermenêutica',
    subcategoria: 'Reforma',
    conteudo: [
      'A hermenêutica reformada enfatiza: analogia da fé, senso comum, oração.',
      'A Bíblia interpreta a Bíblia.',
      'O Espírito Santo ilumina a compreensão.',
      'A Igreja é comunidade de interpretação.',
      'O objetivo é glorificar a Deus e edificar o povo.'
    ],
    versicosChave: ['2 Timóteo 2:15', '1 Coríntios 2:12-14', 'Salmos 119:18'],
    tags: ['reforma', 'hermenêutica', 'analogia', 'iluminação'],
    fontes: ['Calvino, Institutas I.14']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIS ESTUDOS — TEOLOGIA PROPER
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'dp-051',
    titulo: 'A Omnipresença de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'Deus está presente em todos os lugares ao mesmo tempo.',
      'Não há lugar onde Deus não esteja — nem o céu nem o inferno.',
      'A omnipresença não é panteísmo — Deus está em toda parte mas não é tudo.',
      'Para o crente, a omnipresença é consolo: Deus está presente na dor e na alegria.',
      'Para o ímpio, é temor: não há esconderijo do olhar divino.'
    ],
    versicosChave: ['Salmos 139:7-12', 'Jeremias 23:23-24', 'Provérbios 15:3'],
    tags: ['onipresença', 'presença de Deus', 'transcendência', 'imanência'],
    fontes: ['A.W. Tozer, The Knowledge of the Holy']
  },
  {
    id: 'dp-052',
    titulo: 'A Graça Irresistível',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A graça irresistível é a capacitação divina que inclina o coração humano para aceitar o evangelho.',
      'Quando Deus chama eficazmente, o homem responde positivamente.',
      'Não é coerção — é transformação do desejo.',
      'A graça não anula a liberdade — ela a restaura.',
      'A pessoa regenerada deseja a Deus porque sua natureza foi transformada.'
    ],
    versicosChave: ['João 6:37', 'João 6:44', 'Filipenses 2:13', 'Romanos 9:16'],
    tags: ['graça irresistível', 'chamado eficaz', 'regeneração', 'calvinismo'],
    fontes: ['Calvino, Institutas III.24', 'Jonathan Edwards, On the Freedom of the Will']
  },
  {
    id: 'dp-053',
    titulo: 'A Eleição Incondicional',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A eleição incondicional sustenta que Deus escolhe os eleitos sem referência a mérito ou fé prevista.',
      'A escolha é baseada no bom prazer da Sua vontade.',
      'A eleição é para salvação e santificação.',
      'A reprovação é justa — os réus são culpados.',
      'A eleição humilha o orgulho e exalta a graça.'
    ],
    versicosChave: ['Efésios 1:4-5', 'Romanos 9:11-13', '1 Pedro 1:1-2', '2 Timóteo 1:9'],
    tags: ['eleição', 'incondicional', 'decreto', 'predestinação'],
    fontes: ['Calvino, Institutas III.21-24', 'Theodore Beza, On the Election of the Apostles']
  },
  {
    id: 'dp-054',
    titulo: 'A Substituição Penal',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A substituição penal sustenta que Cristo sofreu o castigo que nós merecíamos.',
      'Ele morreu em nosso lugar — assumindo a ira divina.',
      'A satisfação plena foi oferecida na cruz.',
      'O pecado foi transferido a Cristo; a justiça a nós.',
      'Esta é a compreensão predominante da expiação.'
    ],
    versicosChave: ['Isaías 53:5', '2 Coríntios 5:21', '1 Pedro 2:24', 'Romanos 3:25'],
    tags: ['substituição penal', 'expiação', 'ira de Deus', 'satisfação'],
    fontes: ['John Stott, The Cross of Christ', 'Roger Nicole, The Nature of the Atonement']
  },
  {
    id: 'dp-055',
    titulo: 'A Descida aos Infernos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Cristologia',
    conteudo: [
      'O credo declara que Cristo desceu aos infernos — interpretado como descida aos mortos.',
      'Não é sofrimento adicional mas proclamação de vitória.',
      'Cristo pregou aos espíritos em prisão (1 Pedro 3:19).',
      'A descida completa a condição humana.',
      'Cristo é Senhor mesmo no mundo dos mortos.'
    ],
    versicosChave: ['1 Pedro 3:18-20', 'Efésios 4:8-10', 'Filipenses 2:10-11'],
    tags: ['descida aos infernos', 'credo', '1 Pedro', 'vitória'],
    fontes: ['Hans Urs von Balthasar, Mysterium Paschale']
  },
  {
    id: 'dp-056',
    titulo: 'A Intercessão de Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Cristologia',
    conteudo: [
      'Cristo intercede por nós à destra do Pai.',
      'Sua intercessão é baseada em Sua obra consumada.',
      'Ele é Sumo Sacerdote que compreende nossas fraquezas.',
      'A intercessão é garantia de nossa salvação.',
      'Nada pode nos separar do amor de Deus em Cristo.'
    ],
    versicosChave: ['Romanos 8:34', 'Hebreus 7:25', '1 João 2:1', 'Hebreus 4:14-16'],
    tags: ['intercessão', 'sumo sacerdote', 'destra de Deus', 'oração'],
    fontes: ['Calvino, Institutas II.16', 'Hebreus (comentário)']
  },
  {
    id: 'dp-057',
    titulo: 'A Volta de Cristo em Glória',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A volta de Cristo será visível, literal, pessoal e gloriosa.',
      'Todos verão a vinda do Filho do Homem.',
      'A volta é certa — não é possibility mas certeza.',
      'Os sinais precedem a volta, mas o dia e hora são desconhecidos.',
      'A volta é motivação para santidade e missionarismo.'
    ],
    versicosChave: ['Mateus 24:30', 'Atos 1:11', '1 Tessalonicenses 4:16-17', 'Apocalipse 1:7'],
    tags: ['volta de Cristo', 'parousia', 'segunda vinda', 'visível', 'gloriosa'],
    fontes: ['G.E. Ladd, The Blessed Hope']
  },
  {
    id: 'dp-058',
    titulo: 'A Ressurreição dos Mortos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A ressurreição dos mortos é certeza — todos ressuscitarão.',
      'A dos justos é para vida eterna; a dos injustos para condenação.',
      'A ressurreição é corporal — corpos transformados.',
      'Cristo é o primeiro dos que dormem.',
      'A ressurreição é fundamento da esperança cristã.'
    ],
    versicosChave: ['João 5:28-29', '1 Coríntios 15:20-23', 'Daniel 12:2', 'Atos 24:15'],
    tags: ['ressurreição', 'mortos', 'vida eterna', 'condenação'],
    fontes: ['N.T. Wright, The Resurrection of the Son of God']
  },
  {
    id: 'dp-059',
    titulo: 'O Novo Céu e a Nova Terra',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A consumação final é a restauração de todas as coisas.',
      'Novos céus e nova terra — não destruição mas renovação.',
      'Deus habitará com os homens.',
      'Não haverá mais morte, dor nem choro.',
      'A esperança cristã é restauração completa.'
    ],
    versicosChave: ['Apocalipse 21:1-5', 'Romanos 8:19-22', '2 Pedro 3:10-13', 'Isaías 65:17'],
    tags: ['nova criação', 'renovação', 'consumação', 'esperança'],
    fontes: ['N.T. Wright, Surprised by Hope', 'G.K. Beale, The Temple and the Church\'s Mission']
  },
  {
    id: 'dp-060',
    titulo: 'A Missão da Igreja',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A missão é a razão de ser da Igreja.',
      'A Grande Comissão é o mandato: fazer discípulos.',
      'A missão inclui evangelismo e serviço.',
      'A Igreja nasceu como comunidade missionária.',
      'A contextualização é desafio constante.'
    ],
    versicosChave: ['Mateus 28:19-20', 'Atos 1:8', 'Romanos 10:14-15'],
    tags: ['missão', 'evangelismo', 'discipulado', 'Grande Comissão'],
    fontes: ['David Bosch, Transforming Mission']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIS ESTUDOS — TEMAS POR LIVRO
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'tl-041',
    titulo: 'Levítico — Santidade e Sacrificação',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'Levítico é o livro da santidade — como o povo se aproxima de Deus santo.',
      'Os sacrifícios apontam para Cristo — cordeiro imolado.',
      'As leis de pureza revelam a santidade de Deus.',
      'O Dia da Expiação é tipo de redenção em Cristo.',
      'A santidade é chamado para todo o povo.'
    ],
    versicosChave: ['Levítico 19:2', 'Levítico 16:1-34', 'Hebreus 9:11-14'],
    tags: ['Levítico', 'santidade', 'sacrifício', 'pureza'],
    fontes: ['Gordon Wenham, Leviticus (NICOT)']
  },
  {
    id: 'tl-042',
    titulo: 'Juízes — Círculo de Pecado',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      'O ciclo de Juízes: pecado → julgamento → clamor → libertação.',
      'Cada juiz é instrumento imperfeito de Deus.',
      'A ausência de rei leva a anarquia moral.',
      'Deus não desiste do Seu povo.',
      'A necessidade de um Rei perfeito — Cristo.'
    ],
    versicosChave: ['Juízes 2:11-19', 'Juízes 21:25', '1 Samuel 8:5-7'],
    tags: ['Juízes', 'ciclo', 'pecado', 'libertadores'],
    fontes: ['Barry Webb, The Book of Judges']
  },
  {
    id: 'tl-043',
    titulo: 'Rute — Graça Gentia',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      'Rute, moabita, entra no povo de Deus pela graça.',
      'A lealdade de Rute é exemplar.',
      'Boaz é redentor — tipo de Cristo.',
      'A linhagem messiânica inclui gentios.',
      'A providência de Deus no cotidiano.'
    ],
    versicosChave: ['Rute 1:16-17', 'Mateus 1:5', 'Lucas 3:32'],
    tags: ['Rute', 'gentios', 'graça', 'redenção', 'Boaz'],
    fontes: ['Daniel Block, Ruth (NICOT)']
  },
  {
    id: 'tl-044',
    titulo: '1 Crônicas — Adoração e Genealogias',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      'As genealogias mostram continuidade e propósito divino.',
      'A adoração no templo é central.',
      'Davi é organizador da adoração.',
      'A bênção final é paz e prosperidade.',
      'A restauração pós-exílio é tema.'
    ],
    versicosChave: ['1 Crônicas 16:8-36', '2 Crônicas 7:14', '1 Crônicas 29:10-20'],
    tags: ['Crônicas', 'adoração', 'genealogias', 'Davi'],
    fontes: ['J. Barton Payne, 1 Chronicles (WBC)']
  },
  {
    id: 'tl-045',
    titulo: 'Esdras — Reforma e Leitura da Lei',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      'Esdra é escriba e reformador.',
      'A leitura pública da Lei transforma o povo.',
      'A confissão de pecados e separação.',
      'A restauração do culto.',
      'A fidelidade à Palavra de Deus.'
    ],
    versicosChave: ['Esdras 7:10', 'Esdras 8:21-23', 'Neemias 8:8-10'],
    tags: ['Esdras', 'reforma', 'Lei', 'confissão'],
    fontes: ['Ralph Klein, 1 Chronicles (OTL)']
  },
  {
    id: 'tl-046',
    titulo: 'Neemias — Reconstrução e Oração',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      'Neemias reconstrói os muros de Jerusalém.',
      'A oração é central em sua liderança.',
      'A oposição é enfrentada com fé e trabalho.',
      'A Lei é lida e obedecida.',
      'A restauração física e espiritual.'
    ],
    versicosChave: ['Neemias 1:4-11', 'Neemias 2:17-18', 'Neemias 4:14'],
    tags: ['Neemias', 'oração', 'muros', 'liderança'],
    fontes: ['J.A. Thompson, The Book of Jeremiah (NICOT)']
  },
  {
    id: 'tl-047',
    titulo: 'Ester — Providência Divina',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      'O nome de Deus não aparece mas Sua providência é evidente.',
      'Ester arriscam a vida por Seu povo.',
      'Mardoqueu e Hamã — o conflito entre bem e mal.',
      'Purim é celebração da libertação.',
      'Deus usa circunstâncias para cumprir propósitos.'
    ],
    versicosChave: ['Ester 4:14', 'Ester 7:3-4', 'Ester 9:22'],
    tags: ['Ester', 'providência', 'coragem', 'Purim'],
    fontes: ['Karen Jobes, Esther (NICOT)']
  },
  {
    id: 'tl-048',
    titulo: 'Eclesiastes — Vanidade e Sentido',
    categoria: 'Temas por Livro',
    subcategoria: 'Livros Poéticos',
    conteudo: [
      'Tudo sob o sol é vaidade — não pessimismo mas realismo.',
      'A busca pelo sentido da vida.',
      'O contentamento nos dons de Deus.',
      'A mortalidade é realidade.',
      'A conclusão: temer a Deus.'
    ],
    versicosChave: ['Eclesiastes 1:2', 'Eclesiastes 3:11', 'Eclesiastes 12:13'],
    tags: ['eclesiastes', 'vanidade', 'sentido', 'contentamento'],
    fontes: ['Tremper Longman III, Ecclesiastes']
  },
  {
    id: 'tl-049',
    titulo: 'Cânticos — Amor e Relacionamento',
    categoria: 'Temas por Livro',
    subcategoria: 'Livros Poéticos',
    conteudo: [
      'O Cântico dos Cânticos é poesia de amor.',
      'O amor humano é celebrado como dom de Deus.',
      'A interpretação alegórica vê Cristo e a Igreja.',
      'A interpretação literal vê o amor conjugal.',
      'O amor é forte como a morte.'
    ],
    versicosChave: ['Cânticos 8:6', 'Cânticos 2:16', 'Efésios 5:25-32'],
    tags: ['Cânticos', 'amor', 'casamento', 'relacionamento'],
    fontes: ['Richard Hess, Song of Songs (Baker)']
  },
  {
    id: 'tl-050',
    titulo: 'Lamentações — Dor e Esperança',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Lamentações é lamento pela destruição de Jerusalém.',
      'As lágrimas de Jeremias são modelo de lamento.',
      'As misericórdias de Deus se renovam a cada manhã.',
      'O julgamento é real mas não é o fim.',
      'A esperança está em Deus.'
    ],
    versicosChave: ['Lamentações 3:22-23', 'Lamentações 3:1-21', 'Lamentações 5:1-22'],
    tags: ['Lamentações', 'lamento', 'esperança', 'destruição'],
    fontes: ['Lamentações (comentário)']
  },
  {
    id: 'tl-051',
    titulo: 'Oséias — Amor Infinito',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Deus como marido fiel de Israel infiel.',
      'O amor de Deus persiste apesar da traição.',
      'A restauração é prometida.',
      'A fidelidade divina é tema central.',
      'O amor redentor transcunde o pecado.'
    ],
    versicosChave: ['Oséias 11:8', 'Oséias 3:1', 'Oséias 14:4'],
    tags: ['Oséias', 'amor', 'fidelidade', 'restauração'],
    fontes: ['Douglas Stuart, Hosea (NICOT)']
  },
  {
    id: 'tl-052',
    titulo: 'Amós — Justiça Social',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Amós é profeta da justiça social.',
      'Deus exige justiça, não apenas ritual.',
      'A exploração dos pobres é pecado.',
      'Deixe correr a justiça como água.',
      'O julgamento é certo para os opressores.'
    ],
    versicosChave: ['Amós 5:24', 'Amós 6:4-7', 'Amós 2:6-7'],
    tags: ['Amós', 'justiça social', 'pobres', 'opressão'],
    fontes: ['Jack Crenshaw, Amós (WBC)']
  },
  {
    id: 'tl-053',
    titulo: 'Miqueias — Justiça, Misericórdia e Humildade',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Miqueias resume a fé: justiça, misericórdia e humildade.',
      'O julgamento é para os poderosos.',
      'A esperança vem de Belém.',
      'A restauração é prometida.',
      'Deus é pastor de Seu povo.'
    ],
    versicosChave: ['Miqueias 6:8', 'Miqueias 5:2', 'Miqueias 7:18-20'],
    tags: ['Miqueias', 'justiça', 'misericórdia', 'Belém'],
    fontes: ['Bruce Waltke, Micah (NICOT)']
  },
  {
    id: 'tl-054',
    titulo: 'Jonas — Misericórdia Universal',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Jonas resiste à missão — mas Deus persiste.',
      'Nínive se arrepende e Deus se arrepende do julgamento.',
      'A misericórdia de Deus transcende fronteiras.',
      'Jonas ensina sobre a universalidade da graça.',
      'A obediência ao chamado divino.'
    ],
    versicosChave: ['Jonas 4:11', 'Jonas 2:2', 'Jonas 3:10'],
    tags: ['Jonas', 'misericórdia', 'universalidade', 'obediência'],
    fontes: ['Douglas Stuart, Hosea-Jonah (NICOT)']
  },
  {
    id: 'tl-055',
    titulo: 'Habacuque — Fé no Meio do Caos',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Habacuque questiona Deus sobre a injustiça.',
      'Deus responde: o justo viverá pela fé.',
      'A fé transcende as circunstâncias.',
      'A confiança em meio ao sofrimento.',
      'O julgamento é certo — mas a fé persiste.'
    ],
    versicosChave: ['Habacuque 2:4', 'Habacuque 3:17-19', 'Romanos 1:17'],
    tags: ['Habacuque', 'fé', 'injustiça', 'esperança'],
    fontes: ['O. Palmer Robertson, The Books of Nahum, Habakkuk, and Zephaniah']
  },
  {
    id: 'tl-056',
    titulo: 'Zacarias — Profecias Messiânicas',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Zacarias contém profecias messiânicas detalhadas.',
      'O rei humilde montado em jumento.',
      'O pastor ferido.',
      'A fonte aberta para pecado.',
      'O Senhor virá como rei justo.'
    ],
    versicosChave: ['Zacarias 9:9', 'Zacarias 12:10', 'Zacarias 13:1'],
    tags: ['Zacarias', 'messias', 'profecia', 'jumento'],
    fontes: ['Robert Merrill, Zechariah (NICOT)']
  },
  {
    id: 'tl-057',
    titulo: 'Malaquias — A Última Profecia',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Malaquias é o último profeta do AT.',
      'O julgamento sobre a infidelidade.',
      'O mensageiro que prepara o caminho.',
      'A oferta de justiça.',
      'O dia do Senhor virá.'
    ],
    versicosChave: ['Malaquias 3:1', 'Malaquias 4:2', 'Malaquias 1:6-14'],
    tags: ['Malaquias', 'profecia', 'mensageiro', 'juízo'],
    fontes: ['Robert Hill, Malachi (AB)']
  },
  {
    id: 'tl-058',
    titulo: 'Mateus — Sermão da Montanha',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'O Sermão da Montanha é constituição do Reino.',
      'As bem-aventuranças são retrato do discípulo.',
      'A ética do Reino é superior à da lei.',
      'O amor aos inimigos é radical.',
      'A perfeição do Pai como modelo.'
    ],
    versicosChave: ['Mateus 5:1-12', 'Mateus 5:48', 'Mateus 6:33'],
    tags: ['Sermão da Montanha', 'bem-aventuranças', 'ética', 'Reino'],
    fontes: ['John Stott, The Message of the Sermon on the Mount']
  },
  {
    id: 'tl-059',
    titulo: 'Mateus — Parábolas do Reino',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'Mateus 13 contém as principais parábolas.',
      'O semeador — diferentes receptividades.',
      'O joio — coexistência de bons e maus.',
      'O grão de mostarda — crescimento gradual.',
      'O fermento — transformação oculta.'
    ],
    versicosChave: ['Mateus 13:1-52', 'Mateus 13:31-33', 'Mateus 13:44-46'],
    tags: ['parábolas', 'Reino', 'crescimento', 'transformação'],
    fontes: ['Klyne Snodgrass, Stories with Intent']
  },
  {
    id: 'tl-060',
    titulo: 'Marcos — A Paixão de Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'A Paixão é o clímax do evangelho de Marcos.',
      'A ceia do Senhor é estabelecida.',
      'O getsêmani revela o sofrimento.',
      'A crucificação e morte.',
      'O túmulo vazio — início da vitória.'
    ],
    versicosChave: ['Marcos 14:22-25', 'Marcos 15:33-39', 'Marcos 16:1-8'],
    tags: ['Paixão', 'ceia', 'crucificação', 'túmulo vazio'],
    fontes: ['Ben Witherington III, The Gospel of Mark']
  },
  {
    id: 'tl-061',
    titulo: 'Lucas — Magnificat e Cânticos',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'Lucas contém os cânticos da infância.',
      'O Magnificat de Maria é cântico revolucionário.',
      'O Benedictus de Zacarias.',
      'O Nunc Dimittis de Simeão.',
      'A poesia da salvação.'
    ],
    versicosChave: ['Lucas 1:46-55', 'Lucas 1:67-79', 'Lucas 2:29-32'],
    tags: ['Magnificat', 'cânticos', 'infância', 'Maria'],
    fontes: ['Joel Green, Luke (NICOT)']
  },
  {
    id: 'tl-062',
    titulo: 'Lucas — Parábolas da Misericórdia',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'Lucas enfatiza as parábolas da misericórdia.',
      'O Bom Samaritano — amor ao próximo.',
      'O Filho Pródigo — misericórdia paterna.',
      'A ovelha perdida — busca divina.',
      'A dracma perdida — valor do que é perdido.'
    ],
    versicosChave: ['Lucas 10:25-37', 'Lucas 15:11-32', 'Lucas 15:1-7'],
    tags: ['parábolas', 'misericórdia', 'Bom Samaritano', 'Filho Pródigo'],
    fontes: ['Klyne Snodgrass, Stories with Intent']
  },
  {
    id: 'tl-063',
    titulo: 'João — Sete Milagres (Sinais)',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'João seleciona sete sinais que revelam a glória de Jesus.',
      'Água em vinho (2), cura do filho (4), cura do paralítico (5)',
      'Alimentação de 5000 (6), caminhar sobre águas (6), cura do cego (9), ressurreição de Lázaro (11).',
      'Cada sinal aponta para uma dimensão da divindade.',
      'Os sinais conduzem à fé.'
    ],
    versicosChave: ['João 20:30-31', 'João 2:11', 'João 11:4'],
    tags: ['sinais', 'milagres', 'João', 'divindade'],
    fontes: ['Craig Keener, John (HNTC)']
  },
  {
    id: 'tl-064',
    titulo: 'João — Disursos de Despedida',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'João 13-17 é o discurso de despedida.',
      'O lava-pés como modelo de serviço.',
      'O Consolador (Espírito Santo) é prometido.',
      'O novo mandamento do amor.',
      'A oração sacerdotal de João 17.'
    ],
    versicosChave: ['João 13:34-35', 'João 14:16-17', 'João 17:1-26'],
    tags: ['despedida', 'Espírito Santo', 'amor', 'oração sacerdotal'],
    fontes: ['Craig Keener, John (HNTC)']
  },
  {
    id: 'tl-065',
    titulo: 'Atos — O Espírito Santo na Igreja',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      'O Espírito Santo é protagonista de Atos.',
      'Efusão em Pentecostes (2), Samaria (8), Cornélio (10), Éfeso (19).',
      'O Espírito guia, capacita e envia.',
      'A expansão geográfica segue o guia do Espírito.',
      'A Igreja nascente é modelo de dependência do Espírito.'
    ],
    versicosChave: ['Atos 2:1-4', 'Atos 1:8', 'Atos 13:2-4'],
    tags: ['Espírito Santo', 'Pentecostes', 'expansão', 'guia'],
    fontes: ['Gordon Fee, The Empowering Presence of the Holy Spirit']
  },
  {
    id: 'tl-066',
    titulo: 'Atos — A Perseguição e a Missão',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      'A perseguição espalha a Igreja.',
      'Estêvão é o primeiro mártir.',
      'Paulo persegue e é convertido.',
      'A missão avança apesar da oposição.',
      'O sangue dos mártires é semente da Igreja.'
    ],
    versicosChave: ['Atos 8:1', 'Atos 7:54-60', 'Atos 9:1-19'],
    tags: ['perseguição', 'mártires', 'Estêvão', 'Paulo'],
    fontes: ['Craig Keener, Acts (HNTC)']
  },
  {
    id: 'tl-067',
    titulo: 'Romanos — A Queda e a Graça',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      'Romanos 1-3 apresenta a queda universal.',
      'Romanos 3-5 apresenta a justificação pela fé.',
      'Romanos 6-8 apresenta a vida no Espírito.',
      'A transição da morte para a vida.',
      'A graça transforma a condição humana.'
    ],
    versicosChave: ['Romanos 3:23', 'Romanos 5:8', 'Romanos 8:1-2'],
    tags: ['queda', 'graça', 'justificação', 'Espírito'],
    fontes: ['Douglas Moo, Romans (NICNT)']
  },
  {
    id: 'tl-068',
    titulo: 'Romanos — Israel e os Gentios',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      'Romanos 9-11 trata do papel de Israel na história da salvação.',
      'Deus não rejeitou Seu povo.',
      'Os gentios são enxertados na oliveira.',
      'A restauração de Israel é prometida.',
      'A soberania e a responsabilidade humana.'
    ],
    versicosChave: ['Romanos 9:6-8', 'Romanos 11:25-27', 'Romanos 11:17-24'],
    tags: ['Israel', 'gentios', 'soberania', 'restauração'],
    fontes: ['Douglas Moo, Romans (NICNT)']
  },
  {
    id: 'tl-069',
    titulo: '1 Coríntios — Dons Espirituais',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      '1 Coríntios 12-14 trata dos dons espirituais.',
      'A diversidade de dons para edificação da Igreja.',
      'O amor é o critério supremo.',
      'A ordem no culto é necessária.',
      'Os dons são para serviço, não exaltação.'
    ],
    versicosChave: ['1 Coríntios 12:4-11', '1 Coríntios 13:1-13', '1 Coríntios 14:40'],
    tags: ['dons espirituais', 'amor', 'ordem', 'culto'],
    fontes: ['Anthony Thiselton, 1 Corinthians']
  },
  {
    id: 'tl-070',
    titulo: '2 Coríntios — Consolação e Força',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      '2 Coríntios é a epístola mais pessoal de Paulo.',
      'A graça é suficiente na fraqueza.',
      'O ministério da reconciliação.',
      'A nova criatura em Cristo.',
      'A generosidade é principio cristão.'
    ],
    versicosChave: ['2 Coríntios 12:9', '2 Coríntios 5:17', '2 Coríntios 5:18-20'],
    tags: ['2 Coríntios', 'graça', 'força', 'reconciliação'],
    fontes: ['Frank Matera, 2 Corinthians']
  },
  {
    id: 'tl-071',
    titulo: 'Efésios — As Bênçãos Espirituais',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      'Efésios 1 lista bênçãos espirituais em Cristo.',
      'Escolhidos antes da fundação do mundo.',
      'Redimidos pelo sangue de Cristo.',
      'Selados com o Espírito Santo.',
      'Herança garantida até a redenção final.'
    ],
    versicosChave: ['Efésios 1:3-14', 'Efésios 1:4', 'Efésios 1:13-14'],
    tags: ['bênçãos', 'eleição', 'redenção', 'selo do Espírito'],
    fontes: ['Peter O\'Brien, Ephesians']
  },
  {
    id: 'tl-072',
    titulo: 'Filipenses — A Kenosis de Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      'Filipenses 2:6-11 é o hino cristológico mais antigo.',
      'Cristo se esvaziou voluntariamente.',
      'Assumiu forma de servo.',
      'Foi humilhado até a morte de cruz.',
      'Exaltado ao nome acima de todo nome.'
    ],
    versicosChave: ['Filipenses 2:6-11', 'Filipenses 2:7-8'],
    tags: ['kenosis', 'humildade', 'exaltação', 'hino cristológico'],
    fontes: ['Gordon Fee, Philippians']
  },
  {
    id: 'tl-073',
    titulo: 'Colossenses — Cristo, Image de Deus',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      'Cristo é imagem do Deus invisível.',
      'Primogênito de toda a criatura.',
      'Nele habita toda a plenitude.',
      'A cabeça de toda a Igreja.',
      'A suficiência de Cristo contra falsos mestres.'
    ],
    versicosChave: ['Colossenses 1:15-20', 'Colossenses 2:9-10', 'Colossenses 3:1-4'],
    tags: ['Cristo', 'imagem', 'plenitude', 'suficiência'],
    fontes: ['Gordon Fee, Colossians']
  },
  {
    id: 'tl-074',
    titulo: '1 Tessalonicenses — A Volta de Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      '1 Tessalonicenses é a epístola mais antiga.',
      'O tema é a segunda vinda.',
      'Consolo para os que perderam entes queridos.',
      'Vigilância e santificação.',
      'A esperança motiva a santidade.'
    ],
    versicosChave: ['1 Tessalonicenses 4:16-17', '1 Tessalonicenses 5:1-11'],
    tags: ['segunda vinda', 'esperança', 'vigilância', 'consolo'],
    fontes: ['Gordon Fee, 1 and 2 Thessalonians']
  },
  {
    id: 'tl-075',
    titulo: '2 Tessalonicenses — A Volta e a Vigilância',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      '2 Tessalonicenses corrige equívocos sobre a volta.',
      'O dia do Senhor virá inesperadamente.',
      'O Homem da Iniquidade será revelado.',
      'A fidelidade no trabalho é enfatizada.',
      'A vigilância é constante.'
    ],
    versicosChave: ['2 Tessalonicenses 2:1-12', '2 Tessalonicenses 3:6-15'],
    tags: ['volta de Cristo', 'vigilância', 'Homem da Iniquidade'],
    fontes: ['Gordon Fee, 1 and 2 Thessalonians']
  },
  {
    id: 'tl-076',
    titulo: '1 Timóteo — Pastoral e Liderança',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Pastorais',
    conteudo: [
      '1 Timóteo é carta pastoral sobre liderança na Igreja.',
      'Qualificações de bispos e diáconos.',
      'A sã doutrina deve ser guardada.',
      'A luta pela fé.',
      'A generosidade e a temperança.'
    ],
    versicosChave: ['1 Timóteo 3:1-13', '1 Timóteo 4:1-5', '1 Timóteo 6:10'],
    tags: ['pastoral', 'liderança', 'bispos', 'diáconos'],
    fontes: ['William Mounce, 1 Timothy (WBC)']
  },
  {
    id: 'tl-077',
    titulo: '2 Timóteo — A Coroa da Justiça',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Pastorais',
    conteudo: [
      '2 Timóteo é a última carta de Paulo.',
      'O ministério fiel apesar da oposição.',
      'A Palavra de Deus é viva e eficaz.',
      'A coroa da justiça está guardada.',
      'Paulo exemplifica a fidelidade até o fim.'
    ],
    versicosChave: ['2 Timóteo 4:7-8', '2 Timóteo 3:16-17', '2 Timóteo 2:15'],
    tags: ['fidelidade', 'Palavra de Deus', 'coroa', 'ministério'],
    fontes: ['William Mounce, 2 Timothy (WBC)']
  },
  {
    id: 'tl-078',
    titulo: 'Tito — A Sã Doutrina',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Pastorais',
    conteudo: [
      'Tito é carta pastoral para a ilha de Creta.',
      'A sã doutrina gera boa conduta.',
      'Qualificações de líderes.',
      'A graça nos ensina a viver.',
      'As boas obras são fruto da fé.'
    ],
    versicosChave: ['Tito 2:11-14', 'Tito 3:5-7', 'Tito 1:5-9'],
    tags: ['Tito', 'sã doutrina', 'graça', 'boas obras'],
    fontes: ['Daniel Wallace, 1 Timothy (WBC)']
  },
  {
    id: 'tl-079',
    titulo: 'Filemom — Perdão e Reconciliação',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Pessoais',
    conteudo: [
      'Filemom é carta pessoal sobre perdão.',
      'Onésimo, escravo fugido, se tornou crente.',
      'Paulo pede recepção de Onésimo como irmão.',
      'O perdão cristão é radical.',
      'A reconciliação é princípio do evangelho.'
    ],
    versicosChave: ['Filemom 1:15-17', 'Filemom 1:8-21'],
    tags: ['Filemom', 'perdão', 'reconciliação', 'escravidão'],
    fontes: ['N.T. Wright, The Epistles of Paul to the Colossians and to Philemon']
  },
  {
    id: 'tl-080',
    titulo: 'Hebreus — O Novo Testamento',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Gerais',
    conteudo: [
      'Hebreus declara a superioridade do novo testamento.',
      'Cristo é superior a todos os mediadores anteriores.',
      'O sacrifício de Cristo é único e perfeito.',
      'O santuário celestial é o verdadeiro.',
      'A fé é o fundamento.'
    ],
    versicosChave: ['Hebreus 8:6-13', 'Hebreus 9:11-14', 'Hebreus 10:10-14'],
    tags: ['novo testamento', 'superioridade', 'sacrifício', 'santuário'],
    fontes: ['Craig Koester, Hebrews']
  },
  {
    id: 'tl-081',
    titulo: 'Hebreus 11 — A Galeria da Fé',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Gerais',
    conteudo: [
      'Hebreus 11 lista heróis da fé.',
      'Abel, Enoque, Noé, Abraão, Sara.',
      'A fé é certeza do que se espera.',
      'A fé se prova na obediência.',
      'Somos cercados de nuvem de testemunhas.'
    ],
    versicosChave: ['Hebreus 11:1', 'Hebreus 11:6', 'Hebreus 12:1-2'],
    tags: ['fé', 'heróis', 'testemunhas', 'exemplo'],
    fontes: ['Craig Koester, Hebrews']
  },
  {
    id: 'tl-082',
    titulo: 'Tiago — Fé e Obras',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Gerais',
    conteudo: [
      'Tiago combate a fé sem obras.',
      'A fé viva se prova pelas obras.',
      'A língua é pequena mas causa grandes danos.',
      'A paciência no sofrimento.',
      'A oração do justo é eficaz.'
    ],
    versicosChave: ['Tiago 2:14-26', 'Tiago 3:1-12', 'Tiago 5:13-18'],
    tags: ['fé', 'obras', 'língua', 'oração'],
    fontes: ['Douglas Moo, James']
  },
  {
    id: 'tl-083',
    titulo: '1 Pedro — Sofrimento e Glória',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Gerais',
    conteudo: [
      'O sofrimento precede a glória.',
      'Cristo é exemplo de sofrimento injusto.',
      'A esperança viva é fundamento.',
      'O sacerdócio real.',
      'A graça de Deus sustenta.'
    ],
    versicosChave: ['1 Pedro 1:6-7', '1 Pedro 2:21-25', '1 Pedro 4:12-13'],
    tags: ['sofrimento', 'glória', 'esperança', 'sacerdócio'],
    fontes: ['Karen Jobes, 1 Peter']
  },
  {
    id: 'tl-084',
    titulo: '2 Pedro — A Volta Certa',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Gerais',
    conteudo: [
      '2 Pedro combate céticos sobre a volta.',
      'O Senhor é paciente — não deseja que pereça.',
      'Haverá novos céus e nova terra.',
      'A Palavra de Deus é eterna.',
      'Crescei na graça e no conhecimento.'
    ],
    versicosChave: ['2 Pedro 3:8-10', '2 Pedro 3:13', '2 Pedro 3:18'],
    tags: ['volta de Cristo', 'paciência', 'juízo', 'nova criação'],
    fontes: ['Peter Davids, 2 Peter (NICNT)']
  },
  {
    id: 'tl-085',
    titulo: '1 João — Amor e Verdade',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Gerais',
    conteudo: [
      'Deus é amor — a mais profunda definição.',
      'O amor se prova em ação.',
      'Andar na luz é andar em obediência.',
      'A vitória sobre o mundo pela fé.',
      'A comunhão com Deus e uns com os outros.'
    ],
    versicosChave: ['1 João 4:8', '1 João 4:19-21', '1 João 1:5-7'],
    tags: ['amor', 'verdade', 'luz', 'vitória', 'comunhão'],
    fontes: ['Karen Jobes, 1, 2, 3 John']
  },
  {
    id: 'tl-086',
    titulo: '2 e 3 João — Verdade e Hospitalidade',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Gerais',
    conteudo: [
      '2 João enfatiza a verdade e o amor.',
      '3 João é sobre hospitalidade.',
      'A falsa doutrina deve ser rejeitada.',
      'O amor não tolera o erro doutrinal.',
      'A hospitalidade é virtude cristã.'
    ],
    versicosChave: ['2 João 1:10-11', '3 João 1:5-8'],
    tags: ['verdade', 'hospitalidade', 'falsa doutrina'],
    fontes: ['Karen Jobes, 1, 2, 3 John']
  },
  {
    id: 'tl-087',
    titulo: 'Judas — Contenda pela Fé',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Gerais',
    conteudo: [
      'Judas é alerta contra falsos mestres.',
      'A fé precisa ser defendida.',
      'Exemplos de julgamento sobre desobedientes.',
      'Deus é fiel para guardar.',
      'Glória a Deus em todas as coisas.'
    ],
    versicosChave: ['Judas 1:3', 'Judas 1:24-25'],
    tags: ['Judas', 'fé', 'falsos mestres', 'defesa'],
    fontes: ['Jude (comentário)']
  },
  {
    id: 'tl-088',
    titulo: 'Apocalipse — As Sete Igrejas',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'As sete cartas às igrejas da Ásia.',
      'Eféso: perdeu o primeiro amor.',
      'Esmirna: perseguição e fidelidade.',
      'Pérgamo: compromisso com o mundo.',
      'Tiatira: tolerância ao erro.',
      'Sardes: morte espiritual.',
      'Filadélfia: fidelidade sem poder.',
      'Laodiceia: morna e arrogante.'
    ],
    versicosChave: ['Apocalipse 2-3', 'Apocalipse 3:14-22'],
    tags: ['sete igrejas', 'cartas', 'fidelidade', 'correção'],
    fontes: ['G.K. Beale, Revelation']
  },
  {
    id: 'tl-089',
    titulo: 'Apocalipse — O Cordeiro e o Trono',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'O Cordeiro é centro da adoração celestial.',
      'O trono de Deus é centro do cosmos.',
      'A adoração dos 24 anciãos e dos quatro seres viventes.',
      'O Cordeiro foi morto mas está de pé.',
      'A vitória é certa.'
    ],
    versicosChave: ['Apocalipse 4-5', 'Apocalipse 5:6-14'],
    tags: ['Cordeiro', 'trono', 'adoração', 'vitória'],
    fontes: ['G.K. Beale, Revelation']
  },
  {
    id: 'tl-090',
    titulo: 'Apocalipse — O Julgamento Final',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'O julgamento das nações.',
      'O grande trono branco.',
      'O livro da vida.',
      'A segunda morte.',
      'Novos céus e nova terra.'
    ],
    versicosChave: ['Apocalipse 20:11-15', 'Apocalipse 21:1-8'],
    tags: ['juízo', 'trono branco', 'livro da vida', 'consumação'],
    fontes: ['G.K. Beale, Revelation']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIS ESTUDOS — QUESTÕES CONTEMPORÂNEAS
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'qc-011',
    titulo: 'Economia e Fé Cristã',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ética Pública',
    conteudo: [
      'A fé cristã tem implicações econômicas.',
      'A avareza é pecado; a generosidade é virtude.',
      'A riqueza não é mau mas pode ser tentação.',
      'O trabalho é chamado de Deus.',
      'A justiça econômica é obrigação.'
    ],
    versicosChave: ['1 Timóteo 6:10', '2 Coríntios 9:6-11', 'Provérbios 3:9-10'],
    tags: ['economia', 'generosidade', 'trabalho', 'justiça'],
    fontes: ['Tim Keller, Generous Justice']
  },
  {
    id: 'qc-012',
    titulo: 'Ciência e Criação — Perspectivas Cristãs',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Fé e Ciência',
    conteudo: [
      'Existem múltiplas perspectivas cristãs sobre ciência e criação.',
      'O criacionismo de terra jovem sustenta 6 dias literais.',
      'O evolução teísta vê Deus usando evolução.',
      'O design inteligente observa complexidade irredutível.',
      'A teologia não é ciência e a ciência não é teologia.'
    ],
    versicosChave: ['Gênesis 1:1', 'Salmos 19:1', 'Romanos 1:20'],
    tags: ['ciência', 'criação', 'evolução', 'design inteligente'],
    fontes: ['Alister McGrath, A Fine-Tuned Universe']
  },
  {
    id: 'qc-013',
    titulo: 'Aborto e Dignidade Humana',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Bioética',
    conteudo: [
      'O aborto é questão ética central.',
      'A vida humana começa na concepção.',
      'Deus forma o feto no ventre materno.',
      'A dignidade humana é inegociável.',
      'A Igreja defende a vida e acolhe arrependidos.'
    ],
    versicosChave: ['Salmos 139:13-16', 'Jeremias 1:5', 'Lucas 1:41-44'],
    tags: ['aborto', 'dignidade', 'vida', 'concepção'],
    fontes: ['John Kilner, Dignity and Destiny']
  },
  {
    id: 'qc-014',
    titulo: 'Eutanásia e Soberania de Deus',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Bioética',
    conteudo: [
      'A eutanásia contradiz a soberania de Deus.',
      'A vida e a morte estão nas mãos de Deus.',
      'O sofrimento tem sentido em Cristo.',
      'O cuidado paliativo é alternativa cristã.',
      'A dignidade humana até a morte.'
    ],
    versicosChave: ['Deuteronômio 32:39', 'Jó 1:21', 'Salmos 31:15'],
    tags: ['eutanásia', 'morte', 'soberania', 'cuidado paliativo'],
    fontes: ['Nigel Cameron, Will Christians be Biotech\'s Best Hope?']
  },
  {
    id: 'qc-015',
    titulo: 'Engenharia Genética e Manipulação',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Bioética',
    conteudo: [
      'A engenharia genética levanta questões éticas.',
      'Manipular a criação pode ser arrogância humana.',
      'A cura de doenças é chamado.',
      'Os limites devem ser respeitados.',
      'A dignidade humana não pode ser comprometida.'
    ],
    versicosChave: ['Gênesis 1:26-28', 'Gênesis 2:7'],
    tags: ['engenharia genética', 'manipulação', 'ética', 'criação'],
    fontes: ['Nigel Cameron, Will Christians be Biotech\'s Best Hope?']
  },
  {
    id: 'qc-016',
    titulo: 'Drogas e Dependência',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ética Cristã',
    conteudo: [
      'O uso de drogas é contrário ao chamado de santificação.',
      'A dependência é escravidão — Cristo liberta.',
      'A Igreja deve acolher e ajudar dependentes.',
      'O corpo é templo do Espírito Santo.',
      'A libertação é possível pela graça.'
    ],
    versicosChave: ['1 Coríntios 6:19-20', 'João 8:36', 'Gálatas 5:1'],
    tags: ['drogas', 'dependência', 'libertação', 'santificação'],
    fontes: ['David Powlison, Power Encounters']
  },
  {
    id: 'qc-017',
    titulo: 'Casamento e Família',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Família',
    conteudo: [
      'O casamento é instituição divina.',
      'A família é base da sociedade.',
      'O amor conjugal reflete Cristo e a Igreja.',
      'A educação dos filhos é responsabilidade.',
      'A família cristã é testemunho do evangelho.'
    ],
    versicosChave: ['Efésios 5:22-33', 'Provérbios 22:6', 'Deuteronômio 6:6-7'],
    tags: ['casamento', 'família', 'educação', 'amor'],
    fontes: ['John Piper, This Momentary Marriage']
  },
  {
    id: 'qc-018',
    titulo: 'Divórcio e Novas Uniões',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Família',
    conteudo: [
      'O divórcio é permitido mas não desejado por Deus.',
      'Jesus restringe as causas do divórcio.',
      'O adultério é quebra da aliança.',
      'A restauração é sempre preferível.',
      'A graça de Deus alcança todos os fracassos.'
    ],
    versicosChave: ['Mateus 19:3-9', 'Malaquias 2:14-16', 'Romanos 8:1'],
    tags: ['divórcio', 'aliança', 'adultério', 'restauração'],
    fontes: ['David Instone-Brewer, Divorce and Remarriage in the Bible']
  },
  {
    id: 'qc-019',
    titulo: 'Homossexualidade e Bíblia',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ética Cristã',
    conteudo: [
      'A Bíblia condena a prática homossexual.',
      'O casamento é entre homem e mulher.',
      'As pessoas com atração pelo mesmo sexo são chamadas à castidade.',
      'A Igreja acolhe todos com amor e verdade.',
      'A transformação é possível pelo Espírito.'
    ],
    versicosChave: ['Romanos 1:26-27', '1 Coríntios 6:9-11', 'Gênesis 2:24'],
    tags: ['homossexualidade', 'ética', 'casamento', 'castidade'],
    fontes: ['Robert Gagnon, The Bible and Homosexual Practice']
  },
  {
    id: 'qc-020',
    titulo: 'Transgênero e Identidade',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ética Cristã',
    conteudo: [
      'Deus criou o ser humano como macho e fêmea.',
      'A identidade de gênero é designação divina.',
      'A disforia de gênero é realidade humana.',
      'A Igreja acolhe com amor e verdade.',
      'A identidade verdadeira está em Cristo.'
    ],
    versicosChave: ['Gênesis 1:27', 'Mateus 19:4', 'Gálatas 3:28'],
    tags: ['transgênero', 'identidade', 'gênero', 'criação'],
    fontes: ['Mark Yarhouse, Understanding Gender Dysphoria']
  },
  {
    id: 'qc-021',
    titulo: 'Raça e Reconciliação',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Justiça Social',
    conteudo: [
      'A reconciliação racial é evangelho em ação.',
      'Em Cristo não há distinção racial.',
      'O racismo é pecado.',
      'A Igreja é chamada à diversidade.',
      'A justiça é demanda bíblica.'
    ],
    versicosChave: ['Gálatas 3:28', 'Efésios 2:14-16', 'Apocalipse 7:9'],
    tags: ['raça', 'reconciliação', 'diversidade', 'justiça'],
    fontes: ['John Piper, Bloodlines']
  },
  {
    id: 'qc-022',
    titulo: 'Pobreza e Desigualdade',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Justiça Social',
    conteudo: [
      'A pobreza é consequência do pecado e da injustiça.',
      'Deus defende os pobres.',
      'A Igreja tem responsabilidade social.',
      'A caridade não basta — a justiça é necessária.',
      'A opção pelos pobres é bíblica.'
    ],
    versicosChave: ['Miqueias 6:8', 'Mateus 25:31-46', 'Tiago 2:15-17'],
    tags: ['pobreza', 'desigualdade', 'justiça', 'caridade'],
    fontes: ['Tim Keller, Generous Justice']
  },
  {
    id: 'qc-023',
    titulo: 'Violência e Não-Violência',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ética Cristã',
    conteudo: [
      'A Bíblia ensina amor aos inimigos.',
      'A não-violência é ideal, mas há exceções (legítima defesa, governo).',
      'Cristo é o modelo de não-violência.',
      'A paz é fruto da justiça.',
      'A guerra é tragédia — último recurso.'
    ],
    versicosChave: ['Mateus 5:38-48', 'Romanos 12:17-21', 'Romanos 13:1-7'],
    tags: ['violência', 'não-violência', 'paz', 'guerra'],
    fontes: ['John Howard Yoder, The Politics of Jesus']
  },
  {
    id: 'qc-024',
    titulo: 'Morte e Luto',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ética Cristã',
    conteudo: [
      'A morte é inimigo — mas Cristo a venceu.',
      'O luto é legítimo e necessário.',
      'A esperança cristã não anula a dor.',
      'A comunhão dos santos consola.',
      'A ressurreição é certeza.'
    ],
    versicosChave: ['1 Coríntios 15:55-57', '1 Tessalonicenses 4:13-14', 'João 11:25-26'],
    tags: ['morte', 'luto', 'esperança', 'ressurreição'],
    fontes: ['Nicholas Wolterstorff, Lament for a Son']
  },
  {
    id: 'qc-025',
    titulo: 'Suicídio e Saúde Mental',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Saúde Mental',
    conteudo: [
      'O suicídio é tragédia — não é condenação eterna.',
      'A doença mental é realidade humana.',
      'Deus tem misericórdia de todos.',
      'A Igreja deve acolher e não julgar.',
      'A saúde mental é responsabilidade.'
    ],
    versicosChave: ['Salmos 34:18', '2 Coríntios 1:3-4', 'Mateus 11:28-30'],
    tags: ['suicídio', 'saúde mental', 'luto', 'acolhimento'],
    fontes: ['Edward Snowden, Suicide and the Church']
  },
  {
    id: 'qc-026',
    titulo: 'Cultura da Morte vs. Cultura da Vida',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Bioética',
    conteudo: [
      'A cultura da morte inclui aborto, eutanásia, pena de morte.',
      'A cultura da vida defende a dignidade humana.',
      'Cristo é a vida — Ele veio para que tenhamos vida em abundância.',
      'A Igreja é defensora da vida.',
      'Cada vida é dom de Deus.'
    ],
    versicosChave: ['João 10:10', 'Salmos 139:13-16', 'Jeremias 1:5'],
    tags: ['cultura da vida', 'dignidade', 'aborto', 'eutanásia'],
    fontes: ['John Paul II, Evangelium Vitae']
  },
  {
    id: 'qc-027',
    titulo: 'Ética Ambiental Cristã',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ecologia',
    conteudo: [
      'O cuidado com a criação é mandamento divino.',
      'A exploração ambiental é desobediência.',
      'A justiça ambiental atinge os pobres primeiro.',
      'A esperança é nova criação.',
      'A responsabilidade é para as futuras gerações.'
    ],
    versicosChave: ['Gênesis 2:15', 'Romanos 8:19-22', 'Apocalipse 21:1-5'],
    tags: ['ecologia', 'meio ambiente', 'justiça ambiental', 'responsabilidade'],
    fontes: ['Calvin DeWitt, Earth-Wise']
  },
  {
    id: 'qc-028',
    titulo: 'Educação Cristã',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Família',
    conteudo: [
      'A educação é responsabilidade dos pais.',
      'A formação cristã deve ser integral.',
      'A escola cristã é ministério legítimo.',
      'A Bíblia é fundamento de todo conhecimento.',
      'O ensino doméstico é opção válida.'
    ],
    versicosChave: ['Deuteronômio 6:6-7', 'Provérbios 22:6', '2 Timóteo 3:16-17'],
    tags: ['educação', 'formação', 'escola', 'ensino doméstico'],
    fontes: ['Susan Wise Bauer, The Well-Trained Mind']
  },
  {
    id: 'qc-029',
    titulo: 'Mídia e Formação da Opinião',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Cultura Digital',
    conteudo: [
      'A mídia influencia pensamento e comportamento.',
      'O cristão deve ser critico diante da mídia.',
      'A verdade é comprometida pela desinformação.',
      'A mídia pode ser usada para o bem.',
      'O discernimento é necessário.'
    ],
    versicosChave: ['Filipenses 4:8', 'Efésios 5:15-17', '1 Tessalonicenses 5:21'],
    tags: ['mídia', 'desinformação', 'discernimento', 'verdade'],
    fontes: ['Andy Crouch, The Tech-Wise Family']
  },
  {
    id: 'qc-030',
    titulo: 'Globalização e Fé',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Cultura',
    conteudo: [
      'A globalização traz desafios e oportunidades.',
      'O evangelho é universal — transcende culturas.',
      'O pluralismo religioso aumenta.',
      'A missão é cada vez mais necessária.',
      'A identidade cristã não é cultural mas transcendente.'
    ],
    versicosChave: ['Mateus 28:19-20', 'Apocalipse 7:9', 'Gálatas 3:28'],
    tags: ['globalização', 'pluralismo', 'missionário', 'cultura'],
    fontes: ['Samuel Escobar, The New Global Mission']
  },
  {
    id: 'qc-031',
    titulo: 'Tecnologia e Transhumanismo',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Bioética',
    conteudo: [
      'O transhumanismo busca melhorar o ser humano pela tecnologia.',
      'A dignidade humana não pode ser melhorada artificialmente.',
      'Deus é o criador — não devemos nos tornar deuses.',
      'A tecnologia é ferramenta, não salvação.',
      'O limites éticos devem ser respeitados.'
    ],
    versicosChave: ['Gênesis 3:5', 'Salmos 100:3', 'Atos 17:28'],
    tags: ['transhumanismo', 'tecnologia', 'dignidade', 'limites'],
    fontes: ['Francis Schaeffer, How Should We Then Live?']
  },
  {
    id: 'qc-032',
    titulo: 'Ética no Trabalho',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ética Cristã',
    conteudo: [
      'O trabalho é chamado de Deus — não maldição.',
      'A ética trabalhista é exigência bíblica.',
      'A honestidade no trabalho é virtude.',
      'O descanso semanal é mandamento.',
      'O trabalho é forma de adoração.'
    ],
    versicosChave: ['Gênesis 2:15', 'Colossenses 3:23-24', 'Êxodo 20:8-11'],
    tags: ['trabalho', 'ética', 'honestidade', 'descanso'],
    fontes: ['Tim Keller, Every Good Endeavor']
  },
  {
    id: 'qc-033',
    titulo: 'Corrupção e Justiça',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Justiça Social',
    conteudo: [
      'A corrupção é pecado contra a justiça.',
      'Deus detesta a injustiça.',
      'A Igreja deve ser luz em meio à corrupção.',
      'A transparência é virtude.',
      'A justiça é responsabilidade de todos.'
    ],
    versicosChave: ['Miqueias 6:8', 'Amós 5:24', 'Provérbios 11:3'],
    tags: ['corrupção', 'justiça', 'transparência', 'ética'],
    fontes: ['Tim Keller, Generous Justice']
  },
  {
    id: 'qc-034',
    titulo: 'Migração e Refugiados',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Justiça Social',
    conteudo: [
      'A migração é realidade global.',
      'A Bíblia exige hospedagem do estrangeiro.',
      'Refugiados são dignos de compaixão.',
      'Deus é refúgio do oprimido.',
      'A Igreja deve acolher.'
    ],
    versicosChave: ['Levítico 19:33-34', 'Hebreus 13:2', 'Mateus 25:35'],
    tags: ['migração', 'refugiados', 'hospedagem', 'compaixão'],
    fontes: ['Matthew Soerens, Welcoming the Stranger']
  },
  {
    id: 'qc-035',
    titulo: 'Mentalidade de Consumo',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ética Cristã',
    conteudo: [
      'O consumismo é contrário à fé.',
      'A ganância é pecado.',
      'A generosidade liberta.',
      'A simplicidade é virtude.',
      'O contentamento é fruto do Espírito.'
    ],
    versicosChave: ['Lucas 12:15', '1 Timóteo 6:6-10', 'Hebreus 13:5'],
    tags: ['consumismo', 'ganância', 'generosidade', 'contentamento'],
    fontes: ['Tim Keller, Counterfeit Gods']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIS ESTUDOS — HISTÓRIA DA IGREJA
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'hi-026',
    titulo: 'Orígenes — Filosofia e Teologia',
    categoria: 'História da Igreja',
    subcategoria: 'Patrística',
    conteudo: [
      'Orígenes é o primeiro grande sistemático cristão.',
      'A alegoria é método predominante.',
      'A preexistência das almas é ensino controverso.',
      'A redenção universal é possibilidade.',
      'A Filocalia é obra de espiritualidade.'
    ],
    versicosChave: ['João 1:1-3', 'Romanos 8:29', '1 Coríntios 15:28'],
    tags: ['Orígenes', 'alegoria', 'patrística', 'sistemático'],
    fontes: ['Henri Crouzel, Origen']
  },
  {
    id: 'hi-027',
    titulo: 'São Basílio — O Espírito Santo',
    categoria: 'História da Igreja',
    subcategoria: 'Patrística',
    conteudo: [
      'Basílio defendeu a divindade do Espírito Santo.',
      'De Spiritu Sancto é obra fundamental.',
      'A Trindade é comunhão de amor.',
      'A vida monástica é exemplo.',
      'A hospitalidade é virtude.'
    ],
    versicosChave: ['Atos 5:3-4', 'Mateus 28:19', '2 Coríntios 13:14'],
    tags: ['Basílio', 'Espírito Santo', 'Trindade', 'monasticismo'],
    fontes: ['Basílio, De Spiritu Sancto']
  },
  {
    id: 'hi-028',
    titulo: 'Gregório de Nissa — Contemplação',
    categoria: 'História da Igreja',
    subcategoria: 'Patrística',
    conteudo: [
      'Gregório de Nissa é mestre da contemplação.',
      'A vida de Moisés é modelo espiritual.',
      'O conhecimento de Deus é infinito.',
      'A ascensão espiritual é progresso.',
      'A pureza do coração é meta.'
    ],
    versicosChave: ['Êxodo 33:20', 'Salmos 46:10', 'Mateus 5:8'],
    tags: ['Gregório', 'contemplação', 'vida espiritual', 'ascensão'],
    fontes: ['Gregório de Nissa, Vida de Moisés']
  },
  {
    id: 'hi-029',
    titulo: 'Agostinho — Graça e Conversão',
    categoria: 'História da Igreja',
    subcategoria: 'Patrística',
    conteudo: [
      'As Confissões são autobiografia espiritual.',
      'A conversão é obra da graça divina.',
      'O pecado original corrompe toda a natureza.',
      'A graça precede o mérito.',
      'O amor é fundamento da ética.'
    ],
    versicosChave: ['Romanos 5:12', 'Efésios 2:4-5', 'João 6:44'],
    tags: ['Agostinho', 'graça', 'conversão', 'pecado original'],
    fontes: ['Agostinho, Confissões']
  },
  {
    id: 'hi-030',
    titulo: 'Pedro Lombardo — Sentenças',
    categoria: 'História da Igreja',
    subcategoria: 'Escolástica',
    conteudo: [
      'Pedro Lombardo compilou as Sentenças.',
      'A obra é compêndio teológico medieval.',
      'Cobre: Deus, criação, pecado, virtudes, sacramentos.',
      'Tornou-se texto de referência nas universidades.',
      'A teologia é ciência da fé.'
    ],
    versicosChave: ['2 Timóteo 2:15', 'Hebreus 11:6'],
    tags: ['Lombardo', 'Sentenças', 'escolástica', 'universidades'],
    fontes: ['Peter Lombard, Four Books of Sentences']
  },
  {
    id: 'hi-031',
    titulo: 'Bernardo de Claraval — Amor e Contemplação',
    categoria: 'História da Igreja',
    subcategoria: 'Medieval',
    conteudo: [
      'Bernardo é mestre de contemplação.',
      'O amor divino é tema central.',
      'Os sermões sobre o Cântico dos Cânticos.',
      'A vida monástica é chamado.',
      'A influência na espiritualidade medieval.'
    ],
    versicosChave: ['Cânticos 8:6', '1 João 4:8'],
    tags: ['Bernardo', 'contemplação', 'amor divino', 'monasticismo'],
    fontes: ['Bernard of Clairvaux, On the Song of Songs']
  },
  {
    id: 'hi-032',
    titulo: 'Francisco de Assis — Pobreza e Cantico',
    categoria: 'História da Igreja',
    subcategoria: 'Medieval',
    conteudo: [
      'Francisco abandona riqueza para seguir a Cristo.',
      'A ordem franciscana renova a Igreja.',
      'O Cântico das Criaturas celebra a criação.',
      'O amor aos pobres e marginalizados.',
      'A humildade como virtude suprema.'
    ],
    versicosChave: ['Mateus 5:3', 'Mateus 19:21', 'Lucas 12:33'],
    tags: ['Francisco', 'pobreza', 'criação', 'franciscanos'],
    fontes: ['G.K. Chesterton, St. Francis of Assisi']
  },
  {
    id: 'hi-033',
    titulo: 'Tomás de Aquino — Fé e Razão',
    categoria: 'História da Igreja',
    subcategoria: 'Escolástica',
    conteudo: [
      'Tomás de Aquino sintetizou Aristóteles e Cristianismo.',
      'A Suma Teológica é obra-prima.',
      'Os cinco caminhos para provar a existência de Deus.',
      'A graça aperfeiçoa a natureza.',
      'A caridade é forma de todas as virtudes.'
    ],
    versicosChave: ['Romanos 1:20', '1 Coríntios 13:2', 'Hebreus 11:6'],
    tags: ['Tomás de Aquino', 'escolástica', 'Suma', 'fé e razão'],
    fontes: ['Tomás de Aquino, Suma Teológica']
  },
  {
    id: 'hi-034',
    titulo: 'Lutero e a Justificação pela Fé',
    categoria: 'História da Igreja',
    subcategoria: 'Reforma',
    conteudo: [
      'A torre experiência de Lutero revelou a justificação pela fé.',
      'Sola fide é principio central.',
      'A liberdade do cristão.',
      'A autoridade da Escritura.',
      'A tradução da Bíblia.'
    ],
    versicosChave: ['Romanos 1:17', 'Gálatas 2:16', 'Efésios 2:8-9'],
    tags: ['Lutero', 'justificação', 'fé', 'Reforma'],
    fontes: ['Lutero, Sobre a Liberdade do Cristão']
  },
  {
    id: 'hi-035',
    titulo: 'Calvino e as Institutas',
    categoria: 'História da Igreja',
    subcategoria: 'Reforma',
    conteudo: [
      'As Institutas são manual de teologia cristã.',
      'O conhecimento de Deus e de nós mesmos.',
      'A soberania de Deus é tema central.',
      'A disciplina eclesiástica.',
      'O influência global do calvinismo.'
    ],
    versicosChave: ['Efésios 1:11', 'Romanos 8:29-30', 'Efésios 2:8-9'],
    tags: ['Calvino', 'Institutas', 'soberania', 'Reforma'],
    fontes: ['Calvino, Institutas da Religião Cristã']
  },
  {
    id: 'hi-036',
    titulo: 'Zwinglio e a Reforma Suíça',
    categoria: 'História da Igreja',
    subcategoria: 'Reforma',
    conteudo: [
      'Zwinglio reformou Zurique.',
      'A Ceia é memorial, não transubstanciação.',
      'A pregação é central.',
      'A iconoclastia é prática.',
      'A influência na Reforma suíça.'
    ],
    versicosChave: ['1 Coríntios 11:23-26', 'Mateus 26:26-29'],
    tags: ['Zwinglio', 'Reforma', 'Suíça', 'Ceia'],
    fontes: ['W. P. Stephens, The Theology of Huldrych Zwingli']
  },
  {
    id: 'hi-037',
    titulo: 'Melanchton — O Professor da Reforma',
    categoria: 'História da Igreja',
    subcategoria: 'Reforma',
    conteudo: [
      'Melanchton é professor e sistematizador.',
      'A Augsburg Confession é sua obra.',
      'A harmonização entre fé e razão.',
      'A educação é ministério.',
      'A influência na teologia luterana.'
    ],
    versicosChave: ['2 Timóteo 2:15', 'Provérbios 9:10'],
    tags: ['Melanchton', 'Augsburg', 'educação', 'luteranismo'],
    fontes: ['Melanchton, Augsburg Confession']
  },
  {
    id: 'hi-038',
    titulo: 'Os Mártires Anabatistas',
    categoria: 'História da Igreja',
    subcategoria: 'Reforma',
    conteudo: [
      'Os anabatistas sofreram perseguição de católicos e protestantes.',
      'O batismo de crentes era prática controversa.',
      'A separação Igreja-Estado.',
      'A não-violência era princípio.',
      'O martyrs mirror é compilação de mártires.'
    ],
    versicosChave: ['Mateus 5:38-48', 'Romanos 12:17-21'],
    tags: ['anabatistas', 'mártires', 'batismo', 'não-violência'],
    fontes: ['The Martyrs Mirror']
  },
  {
    id: 'hi-039',
    titulo: 'Jonathan Edwards — Avivamento e Graça',
    categoria: 'História da Igreja',
    subcategoria: 'Avivamentos',
    conteudo: [
      'Edwards é teólogo do Grande Despertamento.',
      'O pecado nas mãos de um Deus irado é sermão famoso.',
      'A graça é irresistível.',
      'A religião é afeições santificadas.',
      'O influência no avivamento americano.'
    ],
    versicosChave: ['Efésios 2:4-5', 'João 6:44', 'Romanos 9:16'],
    tags: ['Edwards', 'avivamento', 'graça', 'despertamento'],
    fontes: ['Jonathan Edwards, Religious Affections']
  },
  {
    id: 'hi-040',
    titulo: 'Charles Spurgeon — Príncipe dos Pregadores',
    categoria: 'História da Igreja',
    subcategoria: 'Avivamentos',
    conteudo: [
      'Spurgeon é o maior pregador batista do séc. XIX.',
      'A pregação expositiva é central.',
      'O Metropolitan Tabernacle é modelo de igreja.',
      'A seminário de Spurgeon forma pastores.',
      'A influência global do ministério.'
    ],
    versicosChave: ['2 Timóteo 4:2', 'Romanos 10:14-17'],
    tags: ['Spurgeon', 'pregação', 'batista', 'avivamento'],
    fontes: ['Spurgeon, Sermons']
  },
  {
    id: 'hi-041',
    titulo: 'Oxford Movement — Renovação Anglo-Católica',
    categoria: 'História da Igreja',
    subcategoria: 'Movimentos',
    conteudo: [
      'O Oxford Movement buscou renovar a Igreja Anglicana.',
      'O retorno à tradição patrística.',
      'A liturgia é central.',
      'A Newman é figura principal.',
      'A influência na Igreja Anglicana.'
    ],
    versicosChave: ['2 Tessalonicenses 2:15', '1 Coríntios 11:2'],
    tags: ['Oxford', 'Anglicana', 'tradição', 'liturgia'],
    fontes: ['Newman, Apologia Pro Vita Sua']
  },
  {
    id: 'hi-042',
    titulo: 'O Movimento Socialdo',
    categoria: 'História da Igreja',
    subcategoria: 'Movimentos',
    conteudo: [
      'O Movimento Socialdo buscava justiça social no séc. XIX.',
      'William Wilberforce combateu a escravidão.',
      'A salvação social é extensão do evangelho.',
      'A Igreja tem responsabilidade social.',
      'A ética cristã na política.'
    ],
    versicosChave: ['Miqueias 6:8', 'Isaías 1:17', 'Mateus 25:31-46'],
    tags: ['movimento social', 'Wilberforce', 'escravidão', 'justiça social'],
    fontes: ['Timothy Larson, Steel Pilgrims']
  },
  {
    id: 'hi-043',
    titulo: 'O Concílio Vaticano II',
    categoria: 'História da Igreja',
    subcategoria: 'Catolicismo',
    conteudo: [
      'O Vaticano II (1962-65) renovou a Igreja Católica.',
      'A liturgia vernacular.',
      'O diálogo ecumênico.',
      'A dignidade da consciência.',
      'A leitura da Bíblia.'
    ],
    versicosChave: ['João 17:20-23', 'Efésios 4:1-6'],
    tags: ['Vaticano II', 'Catolicismo', 'renovação', 'ecumenismo'],
    fontes: ['Concílio Vaticano II, documentos']
  },
  {
    id: 'hi-044',
    titulo: 'Mother Teresa — Serviço aos Pobres',
    categoria: 'História da Igreja',
    subcategoria: 'Servo',
    conteudo: [
      'Mother Teresa dedicou sua vida aos pobres de Calcutá.',
      'A ordem das Missionárias da Caridade.',
      'O serviço aos últimos é serviço a Cristo.',
      'A pobreza voluntária é testemunho.',
      'A influência global do ministério.'
    ],
    versicosChave: ['Mateus 25:31-46', 'Lucas 12:33'],
    tags: ['Mother Teresa', 'pobres', 'serviço', 'Calcutá'],
    fontes: ['Mother Teresa, Come Be My Light']
  },
  {
    id: 'hi-045',
    titulo: 'Billy Graham — Evangelista Global',
    categoria: 'História da Igreja',
    subcategoria: 'Avivamentos',
    conteudo: [
      'Billy Graham é o maior evangelista do séc. XX.',
      'As cruzadas mundiais alcançaram milhões.',
      'A simplicidade do evangelho.',
      'A influência na cultura cristã.',
      'A integridade no ministério.'
    ],
    versicosChave: ['João 3:16', 'Mateus 28:19-20', 'Romanos 10:9-10'],
    tags: ['Billy Graham', 'evangelismo', 'cruzadas', 'missão'],
    fontes: ['Billy Graham, Just As I Am']
  },
  {
    id: 'hi-046',
    titulo: 'Corrie ten Boom — Perdão e Resistência',
    categoria: 'História da Igreja',
    subcategoria: 'Mártir',
    conteudo: [
      'Corrie ten Boom escondeu judeus durante o Holocausto.',
      'A resistência ao nazismo.',
      'O perdão é central em sua mensagem.',
      'A casa do esconderijo é testemunho.',
      'A influência global do ministério.'
    ],
    versicosChave: ['Mateus 5:44', 'Romanos 12:17-21', 'Hebreus 13:2'],
    tags: ['Corrie ten Boom', 'Holocausto', 'perdão', 'resistência'],
    fontes: ['Corrie ten Boom, The Hiding Place']
  },
  {
    id: 'hi-047',
    titulo: 'Martyn Lloyd-Jones — Pregação Expositiva',
    categoria: 'História da Igreja',
    subcategoria: 'Movimentos',
    conteudo: [
      'Lloyd-Jones é modelo de pregação expositiva.',
      'O Evangelho e Deus Soberano.',
      'A pregação é meio de graça.',
      'A dependência do Espírito.',
      'O influência no evangelismo britânico.'
    ],
    versicosChave: ['2 Timóteo 4:2', 'Romanos 10:14-17'],
    tags: ['Lloyd-Jones', 'pregação', 'expositiva', 'evangelismo'],
    fontes: ['Martyn Lloyd-Jones, Preaching and Preachers']
  },
  {
    id: 'hi-048',
    titulo: 'John Stott — Teologia Evangélica',
    categoria: 'História da Igreja',
    subcategoria: 'Teologia Moderna',
    conteudo: [
      'John Stott é figura central do evangelicalismo.',
      'A Cruz de Cristo é obra-prima.',
      'A responsabilidade social é evangelho.',
      'A Lausanne Movement é fruto de seu ministério.',
      'A integridade na teologia e prática.'
    ],
    versicosChave: ['Efésios 2:8-9', 'Mateus 28:19-20', 'Miqueias 6:8'],
    tags: ['Stott', 'evangelicalismo', 'Lausanne', 'justiça social'],
    fontes: ['John Stott, The Cross of Christ']
  },
  {
    id: 'hi-049',
    titulo: 'O Movimento Vineyard',
    categoria: 'História da Igreja',
    subcategoria: 'Carismático',
    conteudo: [
      'O Vineyard é movimento carismático influente.',
      'John Wimber é fundador.',
      'O poder evangelismo é prática.',
      'Os dons são para hoje.',
      'A integração entre carismáticos e evangélicos.'
    ],
    versicosChave: ['Atos 1:8', '1 Coríntios 12-14', 'Marcos 16:17-18'],
    tags: ['Vineyard', 'Wimber', 'carismático', 'dons'],
    fontes: ['John Wimber, Power Evangelism']
  },
  {
    id: 'hi-050',
    titulo: 'A Igreja no Sul Global',
    categoria: 'História da Igreja',
    subcategoria: 'Missiologia',
    conteudo: [
      'O cristianismo cresce no Sul Global (África, Ásia, América Latina).',
      'A teologia do Sul Global tem perspectiva própria.',
      'A missão é cada vez mais horizontal.',
      'A pobreza e a perseguição fortalecem a fé.',
      'O futuro da Igreja é no Sul Global.'
    ],
    versicosChave: ['Apocalipse 7:9', 'Mateus 28:19-20'],
    tags: ['Sul Global', 'crescimento', 'missão', 'teologia'],
    fontes: ['Philip Jenkins, The Next Christendom']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIS ESTUDOS — ESTUDOS COMPARATIVOS
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'ec-026',
    titulo: 'Pedro e Paulo — Dois Ministérios',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Comparação Apostólica',
    conteudo: [
      'Pedro é apóstolo dos judeus; Paulo, dos gentios.',
      'Ambos são fiéis ao evangelho.',
      'A tensão entre eles é resolvida em Antioquia.',
      'A diversidade de ministérios na unidade.',
      'O modelo ecumênico.'
    ],
    versicosChave: ['Gálatas 2:7-9', 'Gálatas 2:11-14', 'Efésios 4:11'],
    tags: ['Pedro', 'Paulo', 'ministério', 'diversidade'],
    fontes: ['N.T. Wright, Paul and the Faithfulness of God']
  },
  {
    id: 'ec-027',
    titulo: 'Maria e Eva — Tipologia Feminina',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'Eva é a causa da queda; Maria é instrumento de redenção.',
      'Obediência de Maria desfaz a desobediência de Eva.',
      'Ambas são mães da humanidade.',
      'A dignidade feminina na Bíblia.',
      'O paralelo entre queda e redenção.'
    ],
    versicosChave: ['Gênesis 3:15', 'Lucas 1:38', '1 Timóteo 2:15'],
    tags: ['Maria', 'Eva', 'tipologia', 'queda', 'redenção'],
    fontes: ['Santo Irineu, Contra as Heresias']
  },
  {
    id: 'ec-028',
    titulo: 'Adão e Cristo — Dois Representantes',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'Adão é representante da humanidade caída.',
      'Cristo é o novo Adão — restaura o que Adão perdeu.',
      'A morte veio por um; a vida pelo outro.',
      'O paralelo é central em Romanos 5.',
      'Ajustificação pela obediência de um.'
    ],
    versicosChave: ['Romanos 5:12-21', '1 Coríntios 15:22, 45-49'],
    tags: ['Adão', 'Cristo', 'representante', 'queda', 'redenção'],
    fontes: ['N.T. Wright, The Climax of the Covenant']
  },
  {
    id: 'ec-029',
    titulo: 'Arca de Noé e Batismo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'A arca salvou poucos pela água.',
      'O batismo é figura de salvação.',
      'A água é julgamento e salvação.',
      'A fé é condição em ambos.',
      'O tipo se cumpre no NT.'
    ],
    versicosChave: ['1 Pedro 3:20-21', 'Gênesis 7:1-24', '1 Coríntios 10:1-2'],
    tags: ['arca', 'batismo', 'dilúvio', 'salvação'],
    fontes: ['G.K. Beale, The Temple and the Church\'s Mission']
  },
  {
    id: 'ec-030',
    titulo: 'Maná e Cristo Pão da Vida',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'O maná sustentou Israel no deserto.',
      'Cristo se declara o pão da vida.',
      'O maná era diário; Cristo é eterno.',
      'A Ceia do Senhor é memorial.',
      'A fé é condição para receber.'
    ],
    versicosChave: ['João 6:32-35', 'Êxodo 16:4-35', '1 Coríntios 10:3'],
    tags: ['maná', 'pão da vida', 'Ceia', 'deserto'],
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
      'Olhar para a serpente = fé em Cristo.',
      'A salvação é por fé, não por obras.',
      'O tipo é explicado por Jesus.'
    ],
    versicosChave: ['João 3:14-15', 'Números 21:4-9'],
    tags: ['serpente', 'crucificação', 'fé', 'salvação'],
    fontes: ['João 3:14-15 (comentário)']
  },
  {
    id: 'ec-032',
    titulo: 'Cordeiro Pascual e Cristo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'O cordeiro pascual era imolado em Israel.',
      'Cristo é o cordeiro de Deus que tira o pecado.',
      'O sangue protegia da morte.',
      'O sangue de Cristo protege da condenação.',
      'A Páscoa é cumprida na cruz.'
    ],
    versicosChave: ['1 Coríntios 5:7', 'Êxodo 12:1-14', 'João 1:29'],
    tags: ['cordeiro', 'Páscoa', 'sacrifício', 'sangue'],
    fontes: ['Michael Morales, Who Shall Ascend the Mountain of the Lord?']
  },
  {
    id: 'ec-033',
    titulo: 'Circuncisão e Batismo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Sacramentos',
    conteudo: [
      'A circuncisão era sinal da aliança no AT.',
      'O batismo é sinal da nova aliança.',
      'Ambos marcam pertença ao povo de Deus.',
      'A continuidade sacramental.',
      'O batismo substitui a circuncisão.'
    ],
    versicosChave: ['Colossenses 2:11-12', 'Romanos 4:11', 'Gênesis 17:10-14'],
    tags: ['circuncisão', 'batismo', 'aliança', 'sinal'],
    fontes: ['Paul Jewett, Infant Baptism and the Covenant of Grace']
  },
  {
    id: 'ec-034',
    titulo: 'Templo e Igreja',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'O templo era centro de adoração e presença divina.',
      'A Igreja é novo templo — pedras vivas.',
      'Cristo é o novo Sumo Sacerdote.',
      'A Ceia substitui os sacrifícios.',
      'O crente é templo do Espírito.'
    ],
    versicosChave: ['1 Pedro 2:5', '1 Coríntios 3:16', 'Efésios 2:19-22'],
    tags: ['templo', 'Igreja', 'Sumo Sacerdote', 'sacrifício'],
    fontes: ['G.K. Beale, The Temple and the Church\'s Mission']
  },
  {
    id: 'ec-035',
    titulo: 'Moisés e Cristo — Mediadores',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'Moisés mediou a aliança no Sinai.',
      'Cristo media a nova aliança.',
      'Moisés era servo; Cristo é Filho.',
      'A Lei veio por Moisés; a graça por Cristo.',
      'A continuidade e superação.'
    ],
    versicosChave: ['Hebreus 3:1-6', 'João 1:17', 'Deuteronômio 18:15'],
    tags: ['Moisés', 'Cristo', 'mediador', 'aliança'],
    fontes: ['Hebreus (comentário)']
  },
  {
    id: 'ec-036',
    titulo: 'Davi e Cristo — Rei e Messias',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'Davi é rei segundo o coração de Deus.',
      'Cristo é o Filho de Davi que reina eternamente.',
      'A aliança davídica se cumpre em Cristo.',
      'Davi é pecador; Cristo é perfeito.',
      'O reino de Cristo é eterno.'
    ],
    versicosChave: ['2 Samuel 7:12-16', 'Lucas 1:32-33', 'Salmo 110'],
    tags: ['Davi', 'Cristo', 'realeza', 'aliança'],
    fontes: ['O. Palmer Robertson, The Christ of the Covenants']
  },
  {
    id: 'ec-037',
    titulo: 'Salomão e Cristo — Sabedoria',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'Salomão recebeu sabedoria de Deus.',
      'Cristo é a Sabedoria encarnada.',
      'O templo de Salomão prefigura o de Cristo.',
      'A sabedoria de Salomão é limitada.',
      'A sabedoria de Cristo é infinita.'
    ],
    versicosChave: ['1 Reis 4:29-34', 'Colossenses 2:3', '1 Coríntios 1:24'],
    tags: ['Salomão', 'sabedoria', 'templo', 'Cristo'],
    fontes: ['1 Reis (comentário)']
  },
  {
    id: 'ec-038',
    titulo: 'Elias e João Batista',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'Elias é o profeta que prepara o caminho.',
      'João Batista é o Elias que vem.',
      'Ambos vivem no deserto.',
      'A mensagem de arrependimento.',
      'A transição de AT para NT.'
    ],
    versicosChave: ['Mateus 11:14', 'Mateus 3:1-3', 'Lucas 1:17'],
    tags: ['Elias', 'João Batista', 'preparação', 'arrependimento'],
    fontes: ['Mateus (comentário)']
  },
  {
    id: 'ec-039',
    titulo: 'Exílio e Cruz',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Soteriologia',
    conteudo: [
      'O exílio é consequência do pecado.',
      'A cruz é lugar de exílio de Cristo.',
      'Cristo assume o exílio humano.',
      'A restauração vem após o exílio.',
      'A cruz é exílio cumprido.'
    ],
    versicosChave: ['Mateus 27:46', 'Isaías 53:4-6', '2 Coríntios 5:21'],
    tags: ['exílio', 'cruz', 'pecado', 'restauração'],
    fontes: ['N.T. Wright, Jesus and the Victory of God']
  },
  {
    id: 'ec-040',
    titulo: 'Temor e Adoração',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'O temor do Senhor é princípio da sabedoria.',
      'A adoração é resposta ao temor.',
      'Temor não é medo mas reverência.',
      'A adoração é holística.',
      'O temor e a adoração são inseparáveis.'
    ],
    versicosChave: ['Provérbios 9:10', 'Salmos 95:6', 'Isaías 6:1-8'],
    tags: ['temor', 'adoração', 'reverência', 'sabedoria'],
    fontes: ['Rudolf Otto, O Sagrado']
  },
  {
    id: 'ec-041',
    titulo: 'Oração e Providência',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'A oração não muda Deus — muda a nós.',
      'A providência governa todas as coisas.',
      'A oração é meio de graça.',
      'Deus usa oração como instrumento.',
      'A tensão entre soberania e oração.'
    ],
    versicosChave: ['Filipenses 4:6-7', 'Romanos 8:26-27', 'Mateus 6:9-13'],
    tags: ['oração', 'providência', 'soberania', 'missão'],
    fontes: ['C.S. Lewis, Letters to Malcolm']
  },
  {
    id: 'ec-042',
    titulo: 'Testemunho e Evangelismo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Missiologia',
    conteudo: [
      'O testemunho pessoal é poderoso.',
      'O evangelismo é obediência.',
      'A vida cristã é testemunho.',
      'A Palavra é instrumento.',
      'O Espírito capacita.'
    ],
    versicosChave: ['Atos 1:8', 'Romanos 10:14-17', '1 Pedro 3:15'],
    tags: ['testemunho', 'evangelismo', 'missão', 'Espírito'],
    fontes: ['John Stott, The Contemporary Christian']
  },
  {
    id: 'ec-043',
    titulo: 'Cruz e Ressurreição',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Cristologia',
    conteudo: [
      'A cruz é derrota aparente — vitória real.',
      'A ressurreição é confirmação da vitória.',
      'A cruz precede a glória.',
      'O sofrimento é caminho para a exaltação.',
      'O evangelho é cruz e ressurreição.'
    ],
    versicosChave: ['1 Coríntios 1:18-25', 'Filipenses 2:5-11', '1 Pedro 1:10-12'],
    tags: ['cruz', 'ressurreição', 'vitória', 'sofrimento'],
    fontes: ['John Stott, The Cross of Christ']
  },
  {
    id: 'ec-044',
    titulo: 'Graça e Obediência',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A graça precede a obediência.',
      'A obediência é fruto da graça.',
      'Não é legalismo — é gratidão.',
      'A fé se prova pelas obras.',
      'A graça capacita a obediência.'
    ],
    versicosChave: ['Efésios 2:8-10', 'Tiago 2:14-26', 'Romanos 6:1-2'],
    tags: ['graça', 'obediência', 'fé', 'obras'],
    fontes: ['Calvino, Institutas III.18-20']
  },
  {
    id: 'ec-045',
    titulo: 'Verdade e Amor',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Ética',
    conteudo: [
      'A verdade sem amor é dura.',
      'O amor sem verdade é sentimentalismo.',
      'Em Cristo, verdade e amor se encontram.',
      'A Igreja deve ser fiel e amorosa.',
      'O equilíbrio é essencial.'
    ],
    versicosChave: ['Efésios 4:15', '1 João 3:18', '2 João 1:3'],
    tags: ['verdade', 'amor', 'equilíbrio', 'Igreja'],
    fontes: ['John Stott, The Message of 1 John']
  },
  {
    id: 'ec-046',
    titulo: 'Julgamento e Misericórdia',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'Deus é justo E misericordioso.',
      'A justiça sem misericórdia é crueldade.',
      'A misericórdia sem justiça é fraqueza.',
      'Na cruz, justiça e misericórdia se encontram.',
      'Somos chamados a ser misericordiosos.'
    ],
    versicosChave: ['Tiago 2:13', 'Mateus 5:7', 'Romanos 3:25-26'],
    tags: ['julgamento', 'misericórdia', 'justiça', 'cruz'],
    fontes: ['John Stott, The Cross of Christ']
  },
  {
    id: 'ec-047',
    titulo: 'Fé e Ciência — Harmonia',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Fé e Ciência',
    conteudo: [
      'Fé e ciência não são necessariamente conflitantes.',
      'A ciência estuda o como; a fé o por quê.',
      'Deus é autor da natureza e da Escritura.',
      'A razão é dom de Deus.',
      'A harmonia é possível.'
    ],
    versicosChave: ['Romanos 1:20', 'Salmos 19:1', 'Provérbios 25:2'],
    tags: ['fé', 'ciência', 'harmonia', 'razão'],
    fontes: ['Alister McGrath, A Fine-Tuned Universe']
  },
  {
    id: 'ec-048',
    titulo: 'Cristianismo e Judaísmo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Religiões',
    conteudo: [
      'O cristianismo nasce do judaísmo.',
      'Jesus é judeu — os apóstolos são judeus.',
      'O NT é interpretação do AT.',
      'A continuidade é tema.',
      'O diálogo cristão-judaico é necessário.'
    ],
    versicosChave: ['Romanos 9-11', 'João 4:22', 'Atos 13:26-41'],
    tags: ['judaísmo', 'cristianismo', 'continuidade', 'diálogo'],
    fontes: ['David H. Stern, Jewish New Testament Commentary']
  },
  {
    id: 'ec-049',
    titulo: 'Cristianismo e Islamismo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Religiões',
    conteudo: [
      'Cristianismo e Islamismo são monoteísticos.',
      'A questão central: Jesus é Deus?',
      'O Corão nega a divindade de Cristo.',
      'O amor cristão é distintivo.',
      'O diálogo é necessário mas a verdade é inegociável.'
    ],
    versicosChave: ['João 14:6', '1 Timóteo 2:5', '1 João 4:1-3'],
    tags: ['islamismo', 'Jesus', 'monoteísmo', 'diálogo'],
    fontes: ['Samuel Shamoun, Allah Has No Son']
  },
  {
    id: 'ec-050',
    titulo: 'Cristianismo e Hinduísmo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Religiões',
    conteudo: [
      'O hinduísmo é politeísta; o cristianismo é monoteísta.',
      'A encarnação é única — não reencarnação.',
      'A salvação é por graça, não por karma.',
      'O amor é distintivo.',
      'O diálogo é respeitoso.'
    ],
    versicosChave: ['João 14:6', 'Hebreus 9:27', 'Efésios 2:8-9'],
    tags: ['hinduísmo', 'reencarnação', 'karma', 'salvação'],
    fontes: ['Veli-Matti Kärkkäinen, An Introduction to Theologies of Religions']
  },
  {
    id: 'ec-051',
    titulo: 'Cristianismo e Budismo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Religiões',
    conteudo: [
      'O budismo é não-teísta; o cristianismo é teísta.',
      'A iluminação não é salvação.',
      'O sofrimento é tratado diferentemente.',
      'O amor é distinto do desapego.',
      'O diálogo é possível.'
    ],
    versicosChave: ['João 14:6', '1 Coríntios 13:1-3', 'Romanos 5:8'],
    tags: ['budismo', 'iluminação', 'sofrimento', 'amor'],
    fontes: ['Veli-Matti Kärkkäinen, An Introduction to Theologies of Religions']
  },
  {
    id: 'ec-052',
    titulo: 'Idolatria Antiga e Contemporânea',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Idolatria',
    conteudo: [
      'A idolatria é tema central do AT.',
      'A idolatria contemporânea é secular.',
      'Dinheiro, poder, prazer são ídolos modernos.',
      'A Bíblia condena toda forma de idolatria.',
      'A liberdade dos ídolos é promessa.'
    ],
    versicosChave: ['Êxodo 20:3-6', '1 João 5:21', 'Romanos 1:21-25'],
    tags: ['idolatria', 'ídolos', 'secularismo', 'liberdade'],
    fontes: ['Tim Keller, Counterfeit Gods']
  },
  {
    id: 'ec-053',
    titulo: 'Sabedoria Proverbial e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Sabedoria',
    conteudo: [
      'A sabedoria de Provérbios é prática.',
      'A sabedoria do NT é Cristo.',
      'A continuidade é tema.',
      'A sabedoria se aperfeiçoa em Cristo.',
      'O temor do Senhor continua sendo princípio.'
    ],
    versicosChave: ['Provérbios 9:10', '1 Coríntios 1:24', 'Colossenses 2:3'],
    tags: ['sabedoria', 'Provérbios', 'Cristo', 'continuidade'],
    fontes: ['Tremper Longman III, Proverbs']
  },
  {
    id: 'ec-054',
    titulo: 'Lamento no AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'O lamento é expressão de dor diante de Deus.',
      'No AT: Salmos, Lamentações, Jó.',
      'No NT: Jesus lamenta sobre Jerusalém.',
      'O lamento é fé honesta.',
      'A Igreja deve saber lamentar.'
    ],
    versicosChave: ['Salmo 13:1', 'Mateus 23:37-39', 'João 11:35'],
    tags: ['lamento', 'dor', 'fé honesta', 'oração'],
    fontes: ['Walter Brueggemann, The Message of the Psalms']
  },
  {
    id: 'ec-055',
    titulo: 'Missão Universal — AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Missiologia',
    conteudo: [
      'A missão começa com Abraão: bênção universal.',
      'O AT mostra nações vindo a Deus.',
      'O NT expande a missão aos gentios.',
      'A Grande Comissão é cumprimento.',
      'O Apocalipse mostra multidão de nações.'
    ],
    versicosChave: ['Gênesis 12:3', 'Isaías 49:6', 'Mateus 28:19-20', 'Apocalipse 7:9'],
    tags: ['missão', 'nações', 'universalidade', 'Abraão'],
    fontes: ['David Bosch, Transforming Mission']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIS ESTUDOS — HERMENÊUTICA
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'he-021',
    titulo: 'Interpretação de Efésios',
    categoria: 'Hermenêutica',
    subcategoria: 'Epístolas',
    conteudo: [
      'Efésios é epístola circular — não endereçada a uma igreja.',
      'O tema é a Igreja, corpo de Cristo.',
      'As bênçãos espirituais são centrais.',
      'A unidade da Igreja é enfatizada.',
      'A armadura de Deus é conclusão prática.'
    ],
    versicosChave: ['Efésios 1:3-14', 'Efésios 4:1-6', 'Efésios 6:10-18'],
    tags: ['Efésios', 'Igreja', 'bênçãos', 'unidade'],
    fontes: ['Peter O\'Brien, Ephesians']
  },
  {
    id: 'he-022',
    titulo: 'Interpretação de Filipenses',
    categoria: 'Hermenêutica',
    subcategoria: 'Epístolas',
    conteudo: [
      'Filipenses é carta de agradecimento.',
      'O tema é a alegria na adversidade.',
      'A kenosis de Cristo é central.',
      'O contentamento é virtude.',
      'Paulo é modelo de fé.'
    ],
    versicosChave: ['Filipenses 4:13', 'Filipenses 2:6-11', 'Filipenses 4:4'],
    tags: ['Filipenses', 'alegria', 'kenosis', 'contentamento'],
    fontes: ['Gordon Fee, Philippians']
  },
  {
    id: 'he-023',
    titulo: 'Interpretação de Colossenses',
    categoria: 'Hermenêutica',
    subcategoria: 'Epístolas',
    conteudo: [
      'Colossenses combate falsa doutrina.',
      'A supremacia de Cristo é tema.',
      'Cristo é suficiente contra toda filosofia.',
      'A vida cristã é centrada em Cristo.',
      'A oração é essencial.'
    ],
    versicosChave: ['Colossenses 1:15-20', 'Colossenses 2:8-10', 'Colossenses 3:1-4'],
    tags: ['Colossenses', 'supremacia', 'Cristo', 'falsa doutrina'],
    fontes: ['Gordon Fee, Colossians']
  },
  {
    id: 'he-024',
    titulo: 'Interpretação de 1 e 2 Tessalonicenses',
    categoria: 'Hermenêutica',
    subcategoria: 'Epístolas',
    conteudo: [
      'As cartas tratam da segunda vinda.',
      '1 Tessalonicenses consola os aflitos.',
      '2 Tessalonicenses corrige equívocos.',
      'A vigilância é tema.',
      'A santificação é consequência.'
    ],
    versicosChave: ['1 Tessalonicenses 4:16-17', '2 Tessalonicenses 2:1-12'],
    tags: ['Tessalonicenses', 'segunda vinda', 'vigilância', 'santificação'],
    fontes: ['Gordon Fee, 1 and 2 Thessalonians']
  },
  {
    id: 'he-025',
    titulo: 'Interpretação de 1 e 2 Timóteo e Tito',
    categoria: 'Hermenêutica',
    subcategoria: 'Epístolas Pastorais',
    conteudo: [
      'As epístolas pastorais tratam de liderança.',
      'Qualificações de líderes.',
      'A sã doutrina deve ser guardada.',
      'O ministério fiel.',
      'A vida cristã prática.'
    ],
    versicosChave: ['1 Timóteo 3:1-13', '2 Timóteo 2:15', 'Tito 2:11-14'],
    tags: ['pastorais', 'liderança', 'doutrina', 'ministério'],
    fontes: ['William Mounce, The Pastoral Epistles']
  },
  {
    id: 'he-026',
    titulo: 'Interpretação de Filemom',
    categoria: 'Hermenêutica',
    subcategoria: 'Epístolas',
    conteudo: [
      'Filemom é carta pessoal.',
      'Trata de perdão e reconciliação.',
      'O escravo Onésimo se torna irmão.',
      'O amor cristão transcende hierarquias.',
      'A influência no debate sobre escravidão.'
    ],
    versicosChave: ['Filemom 1:15-17', 'Filemom 1:8-21'],
    tags: ['Filemom', 'perdão', 'reconciliação', 'escravidão'],
    fontes: ['N.T. Wright, Colossians-Philemon']
  },
  {
    id: 'he-027',
    titulo: 'Interpretação de 1 e 2 Pedro',
    categoria: 'Hermenêutica',
    subcategoria: 'Epístolas',
    conteudo: [
      '1 Pedro trata de sofrimento e esperança.',
      '2 Pedro combate céticos.',
      'A fé é provada no sofrimento.',
      'A volta de Cristo é certa.',
      'A santidade é chamado.'
    ],
    versicosChave: ['1 Pedro 1:6-7', '2 Pedro 3:8-10'],
    tags: ['Pedro', 'sofrimento', 'esperança', 'volta de Cristo'],
    fontes: ['Karen Jobes, 1 Peter']
  },
  {
    id: 'he-028',
    titulo: 'Interpretação de 1, 2 e 3 João',
    categoria: 'Hermenêutica',
    subcategoria: 'Epístolas',
    conteudo: [
      '1 João é sobre amor e verdade.',
      '2 João é sobre hospitalidade.',
      '3 João é sobre liderança.',
      'A comunhão com Deus é tema.',
      'A vitória pelo mundo pela fé.'
    ],
    versicosChave: ['1 João 4:8', '2 João 1:10-11', '3 João 1:5-8'],
    tags: ['João', 'amor', 'verdade', 'hospitalidade'],
    fontes: ['Karen Jobes, 1, 2, 3 John']
  },
  {
    id: 'he-029',
    titulo: 'Interpretação de Judas',
    categoria: 'Hermenêutica',
    subcategoria: 'Epístolas',
    conteudo: [
      'Judas é carta breve mas intensa.',
      'Combate falsos mestres.',
      'Exemplos de julgamento.',
      'A fé precisa ser defendida.',
      'Glória a Deus.'
    ],
    versicosChave: ['Judas 1:3', 'Judas 1:24-25'],
    tags: ['Judas', 'falsos mestres', 'fé', 'defesa'],
    fontes: ['Jude (comentário)']
  },
  {
    id: 'he-030',
    titulo: 'Princípios de Interpretação Profética',
    categoria: 'Hermenêutica',
    subcategoria: 'Profecia',
    conteudo: [
      'A profecia pode ter cumprimento múltiplo.',
      'O contexto determina o significado.',
      'A linguagem figurada é comum.',
      'A profecia apocalíptica é simbólica.',
      'O cuidado hermenêutico é necessário.'
    ],
    versicosChave: ['2 Pedro 1:20-21', 'Daniel 7:13-14'],
    tags: ['profecia', 'interpolação', 'simbolismo', 'cumprimento'],
    fontes: ['G.K. Beale, The Book of Revelation']
  },
  {
    id: 'he-031',
    titulo: 'Hermenêutica de Gênesis 1-3',
    categoria: 'Hermenêutica',
    subcategoria: 'Pentateuco',
    conteudo: [
      'Gênesis 1-3 é teológico, não científico.',
      'A criação é ato deliberado de Deus.',
      'A queda é real — não mito.',
      'O proto-evangelium é promessa.',
      'A interpretação deve respeitar o gênero.'
    ],
    versicosChave: ['Gênesis 1:1', 'Gênesis 3:15', 'Romanos 5:12'],
    tags: ['Gênesis', 'criação', 'queda', 'hermenêutica'],
    fontes: ['John Walton, The Lost World of Genesis One']
  },
  {
    id: 'he-032',
    titulo: 'Hermenêutica de Romanos',
    categoria: 'Hermenêutica',
    subcategoria: 'Paulinas',
    conteudo: [
      'Romanos é epístola sistemática.',
      'A estrutura é lógica.',
      'A justificação pela fé é tema.',
      'A graça é central.',
      'A ética é consequência.'
    ],
    versicosChave: ['Romanos 1:16-17', 'Romanos 3:21-28', 'Romanos 12:1-2'],
    tags: ['Romanos', 'justificação', 'graça', 'ética'],
    fontes: ['Douglas Moo, Romans']
  },
  {
    id: 'he-033',
    titulo: 'Hermenêutica de João',
    categoria: 'Hermenêutica',
    subcategoria: 'Evangelhos',
    conteudo: [
      'João é teologicamente distinto dos sinóticos.',
      'O prólogo é declaração cristológica.',
      'Os sinais revelam glória.',
      'Os discursos são centrais.',
      'O tema é a divindade de Cristo.'
    ],
    versicosChave: ['João 1:1-18', 'João 20:30-31'],
    tags: ['João', 'cristologia', 'sinais', 'discursos'],
    fontes: ['Craig Keener, John']
  },
  {
    id: 'he-034',
    titulo: 'Hermenêutica de Apocalipse',
    categoria: 'Hermenêutica',
    subcategoria: 'Apocalipse',
    conteudo: [
      'O Apocalipse é gênero apocalíptico.',
      'Símbolos e visões são predominantes.',
      'As sete cartas às igrejas são históricas.',
      'O julgamento é real.',
      'A esperança é consumação.'
    ],
    versicosChave: ['Apocalipse 1:1-3', 'Apocalipse 21:1-4'],
    tags: ['Apocalipse', 'apocalíptico', 'símbolos', 'esperança'],
    fontes: ['G.K. Beale, Revelation']
  },
  {
    id: 'he-035',
    titulo: 'Hermenêutica de Provérbios',
    categoria: 'Hermenêutica',
    subcategoria: 'Livros Poéticos',
    conteudo: [
      'Provérbios contém provérbios independentes.',
      'Não são promessas absolutas.',
      'São princípios gerais.',
      'A sabedoria é tema.',
      'O temor do Senhor é fundamento.'
    ],
    versicosChave: ['Provérbios 1:7', 'Provérbios 9:10'],
    tags: ['Provérbios', 'sabedoria', 'princípios', 'temor'],
    fontes: ['Tremper Longman III, Proverbs']
  },
  {
    id: 'he-036',
    titulo: 'Hermenêutica de Eclesiastes',
    categoria: 'Hermenêutica',
    subcategoria: 'Livros Poéticos',
    conteudo: [
      'Eclesiastes é reflexão sobre a vida.',
      'A vanidade é tema central.',
      'O realismo é marca.',
      'A conclusão: temer a Deus.',
      'A relevância contemporânea.'
    ],
    versicosChave: ['Eclesiastes 1:2', 'Eclesiastes 12:13'],
    tags: ['Eclesiastes', 'vanidade', 'realismo', 'sabedoria'],
    fontes: ['Tremper Longman III, Ecclesiastes']
  },
  {
    id: 'he-037',
    titulo: 'Hermenêutica de Jó',
    categoria: 'Hermenêutica',
    subcategoria: 'Livros Poéticos',
    conteudo: [
      'Jó é drama teológico.',
      'O sofrimento do inocente é tema.',
      'Os amigos representam teologia da retribuição.',
      'Deus fala do redemoinho.',
      'A resposta é presença, não explicação.'
    ],
    versicosChave: ['Jó 1:21', 'Jó 42:1-6'],
    tags: ['Jó', 'sofrimento', 'teologia', 'resposta divina'],
    fontes: ['David Fox Flourney, Job']
  },
  {
    id: 'he-038',
    titulo: 'Hermenêutica de Isaías',
    categoria: 'Hermenêutica',
    subcategoria: 'Profetas',
    conteudo: [
      'Isaías é evangelho do AT.',
      'As profecias messiânicas são centrais.',
      'O Servo Sofredor é tema.',
      'A restauração é prometida.',
      'A relevância escatológica.'
    ],
    versicosChave: ['Isaías 53', 'Isaías 9:6-7', 'Isaías 65:17'],
    tags: ['Isaías', 'messias', 'servo', 'restauração'],
    fontes: ['John Oswalt, Isaiah']
  },
  {
    id: 'he-039',
    titulo: 'Hermenêutica de Jeremias',
    categoria: 'Hermenêutica',
    subcategoria: 'Profetas',
    conteudo: [
      'Jeremias é profeta do exílio.',
      'A nova aliança é tema central.',
      'O julgamento é real.',
      'A restauração é prometida.',
      'O choro do profeta é modelo.'
    ],
    versicosChave: ['Jeremias 29:11', 'Jeremias 31:31-34'],
    tags: ['Jeremias', 'nova aliança', 'exílio', 'restauração'],
    fontes: ['Jack Lundbom, Jeremiah']
  },
  {
    id: 'he-040',
    titulo: 'Hermenêutica de Daniel',
    categoria: 'Hermenêutica',
    subcategoria: 'Profetas',
    conteudo: [
      'Daniel combina narrativa e profecia.',
      'As visões são apocalípticas.',
      'O Filho do Homem é central.',
      'A soberania de Deus é tema.',
      'A escatologia é influente.'
    ],
    versicosChave: ['Daniel 7:13-14', 'Daniel 2:44'],
    tags: ['Daniel', 'apocalipse', 'Filho do Homem', 'soberania'],
    fontes: ['John Goldingay, Daniel']
  },
  {
    id: 'he-041',
    titulo: 'Hermenêutica de Mateus',
    categoria: 'Hermenêutica',
    subcategoria: 'Evangelhos',
    conteudo: [
      'Mateus é evangelho para judeus.',
      'A genealogia é importante.',
      'As cinco seções são estrutura.',
      'O Sermão da Montanha é central.',
      'A Grande Comissão é conclusão.'
    ],
    versicosChave: ['Mateus 1:1', 'Mateus 5-7', 'Mateus 28:19-20'],
    tags: ['Mateus', 'judeus', 'genealogia', 'Sermão da Montanha'],
    fontes: ['R.T. France, Matthew']
  },
  {
    id: 'he-042',
    titulo: 'Hermenêutica de Marcos',
    categoria: 'Hermenêutica',
    subcategoria: 'Evangelhos',
    conteudo: [
      'Marcos é evangelho mais curto.',
      'Jesus é servo sofredor.',
      'A Paixão é clímax.',
      'O discipulado é ação.',
      'O segredo messiânico é tema.'
    ],
    versicosChave: ['Marcos 1:1', 'Marcos 10:45', 'Marcos 15:33-39'],
    tags: ['Marcos', 'servo', 'Paixão', 'discipulado'],
    fontes: ['Ben Witherington III, Mark']
  },
  {
    id: 'he-043',
    titulo: 'Hermenêutica de Lucas',
    categoria: 'Hermenêutica',
    subcategoria: 'Evangelhos',
    conteudo: [
      'Lucas é evangelho universal.',
      'Os marginalizados são enfatizados.',
      'O Espírito Santo é central.',
      'As parábolas da misericórdia.',
      'A oração é modelo.'
    ],
    versicosChave: ['Lucas 1:1-4', 'Lucas 15', 'Lucas 18:1-8'],
    tags: ['Lucas', 'universalidade', 'misericórdia', 'Espírito Santo'],
    fontes: ['Joel Green, Luke']
  },
  {
    id: 'he-044',
    titulo: 'Hermenêutica de Atos',
    categoria: 'Hermenêutica',
    subcategoria: 'Histórico',
    conteudo: [
      'Atos é história da Igreja primitiva.',
      'O Espírito Santo é protagonista.',
      'A expansão geográfica é tema.',
      'Pedro e Paulo são figuras centrais.',
      'A missão é o fio condutor.'
    ],
    versicosChave: ['Atos 1:8', 'Atos 2:1-4', 'Atos 28:31'],
    tags: ['Atos', 'Espírito Santo', 'expansão', 'missão'],
    fontes: ['Craig Keener, Acts']
  },
  {
    id: 'he-045',
    titulo: 'Hermenêutica de Gálatas',
    categoria: 'Hermenêutica',
    subcategoria: 'Paulinas',
    conteudo: [
      'Gálatas é epístola da liberdade.',
      'A justificação pela fé é tema.',
      'O legalismo é combatido.',
      'A graça é central.',
      'A liberdade é para servir.'
    ],
    versicosChave: ['Gálatas 2:16', 'Gálatas 5:1', 'Gálatas 5:22-23'],
    tags: ['Gálatas', 'liberdade', 'fé', 'graça'],
    fontes: ['Timothy Keller, Galatians']
  },
  {
    id: 'he-046',
    titulo: 'Hermenêutica de 1 Coríntios',
    categoria: 'Hermenêutica',
    subcategoria: 'Paulinas',
    conteudo: [
      '1 Coríntios é carta a igreja problemática.',
      'Divisões, imoralidade, dons.',
      'O amor é tema central.',
      'A ressurreição é fundamentada.',
      'A ordem no culto.'
    ],
    versicosChave: ['1 Coríntios 13:1-13', '1 Coríntios 15:1-58'],
    tags: ['Coríntios', 'amor', 'dons', 'ressurreição'],
    fontes: ['Anthony Thiselton, 1 Corinthians']
  },
  {
    id: 'he-047',
    titulo: 'Hermenêutica de 2 Coríntios',
    categoria: 'Hermenêutica',
    subcategoria: 'Paulinas',
    conteudo: [
      '2 Coríntios é mais pessoal.',
      'A fraqueza é fortaleza.',
      'A graça é suficiente.',
      'O ministério da reconciliação.',
      'A generosidade.'
    ],
    versicosChave: ['2 Coríntios 12:9', '2 Coríntios 5:17-20'],
    tags: ['2 Coríntios', 'graça', 'fraqueza', 'reconciliação'],
    fontes: ['Frank Matera, 2 Corinthians']
  },
  {
    id: 'he-048',
    titulo: 'Hermenêutica de Efésios',
    categoria: 'Hermenêutica',
    subcategoria: 'Paulinas',
    conteudo: [
      'Efésios é epístola dos céus.',
      'As bênçãos espirituais são centrais.',
      'A Igreja é corpo de Cristo.',
      'A armadura de Deus.',
      'A unidade é tema.'
    ],
    versicosChave: ['Efésios 1:3-14', 'Efésios 6:10-18'],
    tags: ['Efésios', 'bênçãos', 'Igreja', 'armadura'],
    fontes: ['Peter O\'Brien, Ephesians']
  },
  {
    id: 'he-049',
    titulo: 'Hermenêutica de Filipenses',
    categoria: 'Hermenêutica',
    subcategoria: 'Paulinas',
    conteudo: [
      'Filipenses é carta de alegria.',
      'A kenosis é central.',
      'O contentamento é virtude.',
      'Paulo é modelo.',
      'A comunhão é tema.'
    ],
    versicosChave: ['Filipenses 4:13', 'Filipenses 2:6-11'],
    tags: ['Filipenses', 'alegria', 'kenosis', 'contentamento'],
    fontes: ['Gordon Fee, Philippians']
  },
  {
    id: 'he-050',
    titulo: 'Hermenêutica de Colossenses',
    categoria: 'Hermenêutica',
    subcategoria: 'Paulinas',
    conteudo: [
      'Colossenses declara a supremacia de Cristo.',
      'A falsa doutrina é combatida.',
      'A vida cristã é centrada em Cristo.',
      'A oração é essencial.',
      'A suficiência de Cristo.'
    ],
    versicosChave: ['Colossenses 1:15-20', 'Colossenses 2:8-10'],
    tags: ['Colossenses', 'supremacia', 'Cristo', 'falsa doutrina'],
    fontes: ['Gordon Fee, Colossians']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIS 55 ESTUDOS FINAIS PARA ATINGIR 400+
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'extra-001',
    titulo: 'A Imagem de Deus no Homem',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'O ser humano foi criado à imagem e semelhança de Deus.',
      'A imagem inclui: razão, personalidade, capacidade moral, relacionamento.',
      'O pecado corrompeu mas não destruiu a imagem.',
      'A imagem é restaurada em Cristo.',
      'A dignidade humana decorre da imagem divina.'
    ],
    versicosChave: ['Gênesis 1:26-27', 'Gênesis 5:1-3', 'Colossenses 3:10', 'Tiago 3:9'],
    tags: ['imagem de Deus', 'dignidade', 'criação', 'humanidade'],
    fontes: ['Calvino, Institutas I.15', 'John Kilner, Dignity and Destiny']
  },
  {
    id: 'extra-002',
    titulo: 'O Chamado de Deus à Vocação',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'Todo crente é chamado por Deus para servir.',
      'A vocação não é apenas ministerial — é toda a vida.',
      'O chamado precede a capacitação.',
      'A obediência é resposta ao chamado.',
      'A vocação é para a glória de Deus.'
    ],
    versicosChave: ['Romanos 8:28-30', '1 Tessalonicenses 5:24', '2 Timóteo 1:9'],
    tags: ['vocação', 'chamado', 'serviço', 'obediência'],
    fontes: ['Os Guinness, The Call']
  },
  {
    id: 'extra-003',
    titulo: 'A Oração do Senhor — Modelo de Oração',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'O Pai Nosso é o modelo de oração.',
      'Inclui: adoração, petição, confissão, proteção.',
      'A oração é comunhão com Deus.',
      'Deus é Pai — intimidade e reverência.',
      'A oração é essencial para vida cristã.'
    ],
    versicosChave: ['Mateus 6:9-13', 'Lucas 11:1-4'],
    tags: ['Pai Nosso', 'oração', 'modelo', 'comunhão'],
    fontes: ['Martin Luther, A Simple Way to Pray']
  },
  {
    id: 'extra-004',
    titulo: 'A Humildade — Virtude Cristã',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ética Cristã',
    conteudo: [
      'A humildade é reconhecer nossa dependência de Deus.',
      'Cristo é modelo de humildade.',
      'A humildade não é fraqueza — é força.',
      'Deus resiste aos soberbos e dá graça aos humildes.',
      'A humildade é fruto do Espírito.'
    ],
    versicosChave: ['Filipenses 2:3-8', 'Tiago 4:6', '1 Pedro 5:5-6'],
    tags: ['humildade', 'virtude', 'Cristo modelo', 'graa'],
    fontes: ['C.S. Lewis, A Problem of Pain']
  },
  {
    id: 'extra-005',
    titulo: 'A Perseverança na Fé',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A perseverança é evidência de fé verdadeira.',
      'Deus guarda os Seus eleitos.',
      'O crente persevera porque Deus persevera nele.',
      'As provações testam e refinam a fé.',
      'A perseverança produz caráter e esperança.'
    ],
    versicosChave: ['Romanos 5:3-5', 'Tiago 1:2-4', 'Hebreus 12:1-3'],
    tags: ['perseverança', 'fé', 'provações', 'caráter'],
    fontes: ['Tom Schreiner, The Race Set Before Us']
  },
  {
    id: 'extra-006',
    titulo: 'O Testemunho Cristão',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Missiologia',
    conteudo: [
      'O testemunho é compartilhar o que Deus fez.',
      'A vida cristã é testemunho.',
      'O testemunho deve ser honesto e humilde.',
      'O Espírito Santo capacita.',
      'O testemunho é meio de evangelismo.'
    ],
    versicosChave: ['Atos 1:8', '1 Pedro 3:15', 'Romanos 10:14-17'],
    tags: ['testemunho', 'evangelismo', 'vida cristã', 'Espírito'],
    fontes: ['John Stott, The Contemporary Christian']
  },
  {
    id: 'extra-007',
    titulo: 'A Comunidade Cristã',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A comunidade é essencial para fé cristã.',
      'Não há cristianismo solitário.',
      'A comunhão dos santos é realidade.',
      'O amor fraternal é marca.',
      'A responsabilidade mútua.'
    ],
    versicosChave: ['Hebreus 10:24-25', 'Atos 2:42-47', '1 João 1:3'],
    tags: ['comunidade', 'comunhão', 'amor', 'responsabilidade'],
    fontes: ['Dietrich Bonhoeffer, Life Together']
  },
  {
    id: 'extra-008',
    titulo: 'A Disciplina Cristã',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'A disciplina é caminho para a santidade.',
      'Inclui: oração, jejum, leitura da Bíblia, partilha.',
      'A disciplina não é legalismo — é graça.',
      'Deus disciplina os filhos.',
      'A disciplina é para crescimento.'
    ],
    versicosChave: ['1 Timóteo 4:7-8', 'Hebreus 12:10-11', '1 Coríntios 9:24-27'],
    tags: ['disciplina', 'crescimento', 'santidade', 'práticas espirituais'],
    fontes: ['Richard Foster, Celebration of Discipline']
  },
  {
    id: 'extra-009',
    titulo: 'A Esperança Cristã',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A esperança cristã é certeza, não desejo.',
      'Ela se baseia na ressurreição de Cristo.',
      'A esperança é viva e ativa.',
      'Ela sustenta no sofrimento.',
      'A esperança é para sempre.'
    ],
    versicosChave: ['Romanos 8:24-25', '1 Pedro 1:3-5', '1 Coríntios 15:19-20'],
    tags: ['esperança', 'ressurreição', 'futuro', 'sustento'],
    fontes: ['N.T. Wright, Surprised by Hope']
  },
  {
    id: 'extra-010',
    titulo: 'A Alegria Cristã',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'A alegria é fruto do Espírito.',
      'Não depende de circunstâncias.',
      'A alegria é fortaleza.',
      'Deus é alegria do nosso gozo.',
      'A alegria se manifesta em comunidade.'
    ],
    versicosChave: ['Filipenses 4:4', 'Nehemias 8:10', 'Gálatas 5:22'],
    tags: ['alegria', 'gozo', 'Espírito', 'fortaleza'],
    fontes: ['John Piper, When I Don\'t Desire God']
  },
  {
    id: 'extra-011',
    titulo: 'A Obediência Cristã',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ética Cristã',
    conteudo: [
      'A obediência é resposta ao amor de Deus.',
      'Não é legalismo — é gratidão.',
      'A obediência é prueba de fé.',
      'Deus obedece pelo Espírito.',
      'A obediência traz bênção.'
    ],
    versicosChave: ['João 14:15', '1 João 5:3', 'Romanos 6:16-18'],
    tags: ['obediência', 'fé', 'amor', 'gratidão'],
    fontes: ['John Stott, The Message of Romans']
  },
  {
    id: 'extra-012',
    titulo: 'A Generosidade Cristã',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ética Cristã',
    conteudo: [
      'A generosidade é virtude cristã.',
      'Deus é o doador de tudo.',
      'Dar é mais abençoado que receber.',
      'A generosidade libera do apego.',
      'A oferenda é ato de adoração.'
    ],
    versicosChave: ['2 Coríntios 9:6-11', 'Atos 20:35', 'Lucas 6:38'],
    tags: ['generosidade', 'dádiva', 'oferta', 'liberdade'],
    fontes: ['Randy Alcorn, The Treasure Principle']
  },
  {
    id: 'extra-013',
    titulo: 'A Paciência Cristã',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ética Cristã',
    conteudo: [
      'A paciência é fruto do Espírito.',
      'Deus é paciente conosco.',
      'A paciência produz maturidade.',
      'O sofrimento produz paciência.',
      'A paciência é fortaleza.'
    ],
    versicosChave: ['Romanos 5:3-4', 'Tiago 1:3-4', 'Gálatas 5:22'],
    tags: ['paciência', 'sofrimento', 'maturidade', 'Espírito'],
    fontes: ['Dallas Willard, Renovation of the Heart']
  },
  {
    id: 'extra-014',
    titulo: 'A Bondade Cristã',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ética Cristã',
    conteudo: [
      'A bondade é fruto do Espírito.',
      'Deus é bondade em essência.',
      'A bondade se manifesta em ação.',
      'Bondade não é fraqueza — é força moral.',
      'A bondade transforma relacionamentos.'
    ],
    versicosChave: ['Gálatas 5:22', 'Efésios 5:9', 'Romanos 12:21'],
    tags: ['bondade', 'virtude', 'Espírito', 'transformação'],
    fontes: ['Dallas Willard, Renovation of the Heart']
  },
  {
    id: 'extra-015',
    titulo: 'A Fidelidade Cristã',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ética Cristã',
    conteudo: [
      'A fidelidade é compromisso com Deus e com os outros.',
      'Deus é fiel — podemos confiar.',
      'A fidelidade no pequeno leva ao grande.',
      'A fidelidade é testemunho.',
      'Deus recompensa a fidelidade.'
    ],
    versicosChave: ['Mateus 25:21', '1 Coríntios 4:2', '2 Timóteo 2:13'],
    tags: ['fidelidade', 'compromisso', 'confiança', 'testemunho'],
    fontes: ['J.I. Packer, Knowing God']
  },
  {
    id: 'extra-016',
    titulo: 'A Verdade Cristã',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Bibliologia',
    conteudo: [
      'A verdade é essencial para a fé.',
      'Cristo é a verdade.',
      'A Escritura é verdade.',
      'A verdade liberta.',
      'A verdade deve ser dita com amor.'
    ],
    versicosChave: ['João 14:6', 'João 8:32', 'Efésios 4:15'],
    tags: ['verdade', 'Cristo', 'Escritura', 'libertação'],
    fontes: ['Francis Schaepper, True Spirituality']
  },
  {
    id: 'extra-017',
    titulo: 'A Justiça Cristã',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ética Cristã',
    conteudo: [
      'A justiça é atributo divino.',
      'Deus exige justiça dos homens.',
      'A justiça social é obrigação.',
      'A justiça se pratica em amor.',
      'A justiça é promessa de Deus.'
    ],
    versicosChave: ['Miqueias 6:8', 'Amós 5:24', 'Mateus 25:31-46'],
    tags: ['justiça', 'ética social', 'Deus justo', 'responsabilidade'],
    fontes: ['Tim Keller, Generous Justice']
  },
  {
    id: 'extra-018',
    titulo: 'A Paz Cristã',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ética Cristã',
    conteudo: [
      'A paz é fruto do Espírito.',
      'Cristo é nosso paz.',
      'A paz não é ausência de conflito — é presença de justiça.',
      'Os pacificadores são bem-aventurados.',
      'A paz é missão da Igreja.'
    ],
    versicosChave: ['Efésios 2:14', 'Mateus 5:9', 'Gálatas 5:22'],
    tags: ['paz', 'Espírito', 'pacificadores', 'justiça'],
    fontes: ['John Stott, The Message of the Sermon on the Mount']
  },
  {
    id: 'extra-019',
    titulo: 'O Perdão Cristão',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ética Cristã',
    conteudo: [
      'O perdão é essencial para o cristão.',
      'Deus perdoa em Cristo.',
      'Somos chamados a perdoar.',
      'O perdão não é esquecimento — é libertação.',
      'O perdão restaura relacionamentos.'
    ],
    versicosChave: ['Efésios 4:32', 'Mateus 6:14-15', 'Colossenses 3:13'],
    tags: ['perdão', 'reconciliação', 'libertação', 'relacionamentos'],
    fontes: ['Timothy Keller, Forgive']
  },
  {
    id: 'extra-020',
    titulo: 'A Gratidão Cristã',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'A gratidão é resposta à graça de Deus.',
      'Tudo é dom de Deus.',
      'A gratidão transforma a perspectiva.',
      'A gratidão é adoração.',
      'Em toda coisa dá graças.'
    ],
    versicosChave: ['1 Tessalonicenses 5:18', 'Colossenses 3:15-17', 'Salmos 100'],
    tags: ['gratidão', 'graça', 'adoração', 'perspectiva'],
    fontes: ['Robert Emmons, Thanks!']
  },
  {
    id: 'extra-021',
    titulo: 'A Santidade Pessoal',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A santidade é chamado para todo crente.',
      'Sem santidade ninguém verá o Senhor.',
      'A santidade é obra do Espírito.',
      'A santidade é progressiva.',
      'A santidade se pratica em comunidade.'
    ],
    versicosChave: ['Hebreus 12:14', '1 Tessalonicenses 4:3-7', '1 Pedro 1:15-16'],
    tags: ['santidade', 'chamado', 'Espírito', 'progresso'],
    fontes: ['J.C. Ryle, Holiness']
  },
  {
    id: 'extra-022',
    titulo: 'O Juízo dos Crentes',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'Os crentes comparecerão diante do tribunal de Cristo.',
      'Não é para condenação mas para recompensa.',
      'As obras serão provadas.',
      'A salvação não depende das obras.',
      'A recompensa é proporcional à fidelidade.'
    ],
    versicosChave: ['2 Coríntios 5:10', '1 Coríntios 3:10-15', 'Romanos 14:10-12'],
    tags: ['juízo', 'crentes', 'recompensa', 'obras'],
    fontes: ['G.E. Ladd, A Theology of the New Testament']
  },
  {
    id: 'extra-023',
    titulo: 'A Glória de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A glória de Deus é a manifestação de Sua majestade.',
      'Tudo existe para a glória de Deus.',
      'A criação revela a Sua glória.',
      'O pecado ofusca a glória.',
      'A salvação restaura a glória.'
    ],
    versicosChave: ['Salmos 19:1', 'Romanos 3:23', '1 Coríntios 10:31'],
    tags: ['glória', 'majestade', 'criação', 'salvação'],
    fontes: ['A.W. Tozer, The Knowledge of the Holy']
  },
  {
    id: 'extra-024',
    titulo: 'A Vocação Ministerial',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'O ministério é chamado de Deus.',
      'Pastores, mestres, evangelistas são dons para a Igreja.',
      'O ministério é serviço, não poder.',
      'A qualificação é caráter, não habilidade.',
      'O ministério é temporário — o Reino é eterno.'
    ],
    versicosChave: ['Efésios 4:11-12', '1 Pedro 5:1-4', '1 Timóteo 3:1-13'],
    tags: ['ministério', 'vocação', 'liderança', 'serviço'],
    fontes: ['Edmund Clowney, The Church']
  },
  {
    id: 'extra-025',
    titulo: 'A Eternidade com Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A eternidade é comunhão perfeita com Deus.',
      'Não haverá mais lágrimas.',
      'A presença de Deus é o céu.',
      'O crente viverá para sempre.',
      'A eternidade é início, não fim.'
    ],
    versicosChave: ['Apocalipse 21:3-4', 'João 14:1-3', '1 Coríntios 13:12'],
    tags: ['eternidade', 'céu', 'comunhão', 'presença'],
    fontes: ['Randy Alcorn, Heaven']
  },
  {
    id: 'extra-026',
    titulo: 'A Criatividade Cristã',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Cultura',
    conteudo: [
      'Deus é Criador — a criatividade é reflexo divino.',
      'A arte é forma de adoração.',
      'A cultura é campo de missão.',
      'O cristão deve criar com excelência.',
      'A beleza é qualidade divina.'
    ],
    versicosChave: ['Gênesis 1:1', 'Salmos 19:1', 'Colossenses 3:23'],
    tags: ['criatividade', 'arte', 'cultura', 'adoração'],
    fontes: ['Francis Schaepper, Art and the Bible']
  },
  {
    id: 'extra-027',
    titulo: 'A Tecnologia e a Fé',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Cultura Digital',
    conteudo: [
      'A tecnologia é ferramenta — neutra em si.',
      'Pode ser usada para o bem ou para o mal.',
      'O discernimento é necessário.',
      'A tecnologia não substitui relacionamentos.',
      'A fé deve guiar o uso da tecnologia.'
    ],
    versicosChave: ['Colossenses 3:17', '1 Coríntios 10:31'],
    tags: ['tecnologia', 'fé', 'discernimento', 'cultura'],
    fontes: ['Andy Crouch, The Tech-Wise Family']
  },
  {
    id: 'extra-028',
    titulo: 'A Responsabilidade Social',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Justiça Social',
    conteudo: [
      'A responsabilidade social é evangelho em prática.',
      'Deus defende os oprimidos.',
      'A Igreja é luz e sal do mundo.',
      'A caridade e a justiça são inseparáveis.',
      'O compromisso social é fé em ação.'
    ],
    versicosChave: ['Mateus 5:13-16', 'Tiago 2:15-17', 'Miqueias 6:8'],
    tags: ['responsabilidade social', 'justiça', 'caridade', 'fé'],
    fontes: ['Tim Keller, Generous Justice']
  },
  {
    id: 'extra-029',
    titulo: 'O Cuidado dos Idosos',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ética Cristã',
    conteudo: [
      'O idoso é digno de respeito e honra.',
      'A experiência é tesouro.',
      'O cuidado dos pais é mandamento.',
      'A solidão dos idosos é preocupação.',
      'A Igreja deve acolher os idosos.'
    ],
    versicosChave: ['Levítico 19:32', 'Efésios 6:2', 'Salmos 71:18'],
    tags: ['idosos', 'respeito', 'honor', 'cuidado'],
    fontes: ['John Piper, What the Christian Owe the City']
  },
  {
    id: 'extra-030',
    titulo: 'A Criança e o Reino',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Família',
    conteudo: [
      'Jesus valorizou as crianças.',
      'O Reino é de tais como estas.',
      'A educação das crianças é prioridade.',
      'A oração por eles é necessária.',
      'A proteção é responsabilidade.'
    ],
    versicosChave: ['Mateus 19:14', 'Marcos 10:14', 'Deuteronômio 6:6-7'],
    tags: ['crianças', 'Reino', 'educação', 'proteção'],
    fontes: ['Sally Lloyd-Jones, The Jesus Storybook Bible']
  },
  {
    id: 'extra-031',
    titulo: 'A Evangelização Urbana',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Missiologia',
    conteudo: [
      'As cidades são campos missionários.',
      'A diversidade cultural é oportunidade.',
      'A pobreza urbana é desafio.',
      'A missão urbana é holística.',
      'A contextualização é necessária.'
    ],
    versicosChave: ['Atos 17:16-34', 'Mateus 28:19-20'],
    tags: ['urbano', 'evangelização', 'cidade', 'contextualização'],
    fontes: ['Darrell Guder, Missional Church']
  },
  {
    id: 'extra-032',
    titulo: 'A Evangelização Rural',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Missiologia',
    conteudo: [
      'O mundo rural é frequentemente negligenciado.',
      'A cultura rural tem necessidades próprias.',
      'A encarnação é modelo.',
      'A comunidade rural é forte.',
      'A missão rural requer criatividade.'
    ],
    versicosChave: ['Mateus 9:36-38', 'Lucas 10:1-12'],
    tags: ['rural', 'evangelização', 'comunidade', 'criatividade'],
    fontes: ['Ralph Winter, Perspectives on the World Christian Movement']
  },
  {
    id: 'extra-033',
    titulo: 'A Jovem Geração e a Fé',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Cultura',
    conteudo: [
      'A jovem geração busca autenticidade.',
      'O nominalismo é desafio.',
      'A comunidade é importante.',
      'A relevância cultural é necessária.',
      'A transmissão da fé é responsabilidade.'
    ],
    versicosChave: ['Deuteronômio 6:6-7', 'Provérbios 22:6', '2 Timóteo 2:2'],
    tags: ['jovens', 'geração', 'fé', 'autenticidade'],
    fontes: ['David Kinnaman, You Lost Me']
  },
  {
    id: 'extra-034',
    titulo: 'A Ciência da Computação e a Fé',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Fé e Ciência',
    conteudo: [
      'A ciência da computação é ferramenta poderosa.',
      'Pode ser usada para evangelismo e educação.',
      'A ética digital é necessária.',
      'A inteligência artificial levanta questões.',
      'A fé deve guiar a inovação.'
    ],
    versicosChave: ['Colossenses 3:17', '1 Coríntios 10:31'],
    tags: ['computação', 'tecnologia', 'ética digital', 'inovação'],
    fontes: ['Cal Newport, Digital Minimalism']
  },
  {
    id: 'extra-035',
    titulo: 'A Psicologia e a Fé',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Fé e Ciência',
    conteudo: [
      'A psicologia e a fé não são necessariamente conflitantes.',
      'Deus usa meios para curar.',
      'A sabedoria bíblica é fundamento.',
      'A saúde mental é importante.',
      'O aconselhamento bíblico é valioso.'
    ],
    versicosChave: ['Provérbios 11:14', 'Provérbios 15:22', 'Filipenses 4:6-7'],
    tags: ['psicologia', 'fé', 'saúde mental', 'aconselhamento'],
    fontes: ['Ed Welch, Blame It on the Brain?']
  },
  {
    id: 'extra-036',
    titulo: 'A Filosofia e a Fé',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Fé e Ciência',
    conteudo: [
      'A filosofia é busca da verdade.',
      'A fé ilumina a razão.',
      'A apologética usa a filosofia.',
      'O cristianismo é racional.',
      'A verdade transcende a filosofia.'
    ],
    versicosChave: ['Colossenses 2:8', 'Romanos 1:20', '1 Coríntios 1:20-25'],
    tags: ['filosofia', 'fé', 'razão', 'verdade'],
    fontes: ['William Lane Craig, Reasonable Faith']
  },
  {
    id: 'extra-037',
    titulo: 'A História e a Fé',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Fé e Ciência',
    conteudo: [
      'A história é teatro da ação divina.',
      'Deus age na história.',
      'A Escritura é documento histórico.',
      'A fé é baseada em fatos históricos.',
      'A história caminha para o Reino.'
    ],
    versicosChave: ['Efésios 1:10', 'Apocalipse 11:15', 'Daniel 2:44'],
    tags: ['história', 'fé', 'providência', 'Reino'],
    fontes: ['N.T. Wright, The New Testament and the People of God']
  },
  {
    id: 'extra-038',
    titulo: 'A Sociologia e a Fé',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Fé e Ciência',
    conteudo: [
      'A sociologia estuda as sociedades.',
      'A Igreja é comunidade sociológica.',
      'A missão é contextual.',
      'A cultura influencia a fé.',
      'A fé transforma sociedades.'
    ],
    versicosChave: ['Mateus 5:13-16', 'Atos 2:42-47'],
    tags: ['sociologia', 'Igreja', 'cultura', 'missão'],
    fontes: ['Robert Woodberry, The Missionary Roots of Liberal Democracy']
  },
  {
    id: 'extra-039',
    titulo: 'A Economia Cristã',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ética Pública',
    conteudo: [
      'A economia deve servir ao bem comum.',
      'A avareza é pecado.',
      'A generosidade é virtude.',
      'A justiça econômica é chamado.',
      'O trabalho é dignidade.'
    ],
    versicosChave: ['Lucas 12:15', '2 Coríntios 9:6-11', 'Provérbios 3:9-10'],
    tags: ['economia', 'generosidade', 'justiça', 'trabalho'],
    fontes: ['Tim Keller, Every Good Endeavor']
  },
  {
    id: 'extra-040',
    titulo: 'A Política Cristã',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ética Pública',
    conteudo: [
      'A política é esfera de responsabilidade.',
      'O Reino de Deus transcende partidos.',
      'A justiça é busca comum.',
      'A obediência a Deus é suprema.',
      'A participação é dever cívico.'
    ],
    versicosChave: ['Mateus 22:21', 'Romanos 13:1-7', 'Atos 5:29'],
    tags: ['política', 'justiça', 'Reino', 'obediência'],
    fontes: ['James Davison Hunter, To Change the World']
  },
  {
    id: 'extra-041',
    titulo: 'A Educação Cristã no Século XXI',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Educação',
    conteudo: [
      'A educação é essencial para a fé.',
      'O desafio do relativismo.',
      'A formação integral é necessária.',
      'A tecnologia transforma a educação.',
      'A fé é racional e relacional.'
    ],
    versicosChave: ['Provérbios 4:7', '2 Timóteo 2:15', 'Filipenses 4:8'],
    tags: ['educação', 'fé', 'relativismo', 'tecnologia'],
    fontes: ['Albert Mohler, Truth Lies']
  },
  {
    id: 'extra-042',
    titulo: 'A Arte e a Fé',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Cultura',
    conteudo: [
      'A arte é expressão da criatividade divina.',
      'A música é adoração.',
      'A literatura comunica verdade.',
      'A arte é missão.',
      'A beleza é qualidade divina.'
    ],
    versicosChave: ['Salmos 150:3-5', 'Colossenses 3:23', 'Êxodo 31:1-11'],
    tags: ['arte', 'música', 'literatura', 'adoração'],
    fontes: ['Francis Schaepper, Art and the Bible']
  },
  {
    id: 'extra-043',
    titulo: 'A Comunicação Cristã',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Cultura',
    conteudo: [
      'A comunicação é essencial para o evangelho.',
      'A verdade deve ser comunicada com amor.',
      'A mídia é ferramenta.',
      'A escuta é parte da comunicação.',
      'A comunicação transforma relacionamentos.'
    ],
    versicosChave: ['Efésios 4:15', 'Efésios 4:29', 'Provérbios 18:21'],
    tags: ['comunicação', 'verdade', 'amor', 'mídia'],
    fontes: ['John Stott, The Contemporary Christian']
  },
  {
    id: 'extra-044',
    titulo: 'A Liderança Cristã',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A liderança cristã é serviço.',
      'Cristo é modelo de liderança.',
      'O caráter é mais importante que a habilidade.',
      'A liderança é responsabilidade.',
      'A oração é essencial.'
    ],
    versicosChave: ['Marcos 10:42-45', '1 Pedro 5:1-4', '1 Timóteo 3:1-13'],
    tags: ['liderança', 'serviço', 'caráter', 'responsabilidade'],
    fontes: ['John Maxwell, The 21 Irrefutable Laws of Leadership']
  },
  {
    id: 'extra-045',
    titulo: 'A Solução dos Conflitos',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ética Cristã',
    conteudo: [
      'O conflito é realidade humana.',
      'O evangelho é ministério de reconciliação.',
      'O perdão é essencial.',
      'A comunicação é chave.',
      'A mediação é bíblica.'
    ],
    versicosChave: ['Mateus 18:15-17', 'Efésios 4:25-32', 'Romanos 12:17-21'],
    tags: ['conflito', 'reconciliação', 'perdão', 'mediação'],
    fontes: ['Ken Sande, The Peace Maker']
  },
  {
    id: 'extra-046',
    titulo: 'A Formação de Caráter',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'O caráter é fruto do Espírito.',
      'A formação é processo.',
      'As provações refinam o caráter.',
      'A obediência forma o caráter.',
      'O caráter é testemunho.'
    ],
    versicosChave: ['Gálatas 5:22-23', 'Romanos 5:3-5', 'Tiago 1:2-4'],
    tags: ['caráter', 'Espírito', 'provações', 'formação'],
    fontes: ['Dallas Willard, Renovation of the Heart']
  },
  {
    id: 'extra-047',
    titulo: 'A Discipulagem',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Missiologia',
    conteudo: [
      'A discipulagem é o objetivo da missão.',
      'Fazer discípulos é mandamento.',
      'A discipulagem é relacional.',
      'O exemplo é mais forte que palavras.',
      'A comunidade é contexto.'
    ],
    versicosChave: ['Mateus 28:19-20', '2 Timóteo 2:2'],
    tags: ['discipulagem', 'missão', 'relacional', 'exemplo'],
    fontes: ['Dallas Willard, The Great Omission']
  },
  {
    id: 'extra-048',
    titulo: 'A Evangelização Pessoal',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Missiologia',
    conteudo: [
      'A evangelização pessoal é essencial.',
      'A relação precede a mensagem.',
      'A escuta é importante.',
      'O testemunho é persuasivo.',
      'O Espírito capacita.'
    ],
    versicosChave: ['Romanos 10:14-17', '1 Pedro 3:15', 'Atos 1:8'],
    tags: ['evangelização', 'pessoal', 'testemunho', 'Espírito'],
    fontes: ['Greg Laurie, Essentials']
  },
  {
    id: 'extra-049',
    titulo: 'A Adoração Contemporânea',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A adoração deve ser reverente e relevante.',
      'A música é parte da adoração.',
      'A Palavra é central.',
      'A comunhão é essencial.',
      'A adoração é holística.'
    ],
    versicosChave: ['João 4:23-24', 'Efésios 5:19-20', 'Colossenses 3:16'],
    tags: ['adoração', 'culto', 'música', 'Palavra'],
    fontes: ['Robert Webber, Worship Is a Verb']
  },
  {
    id: 'extra-050',
    titulo: 'A Missão Integral',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Missiologia',
    conteudo: [
      'A missão inclui palavras e obras.',
      'O evangelho é para toda a vida.',
      'A justiça social é parte da missão.',
      'A compaixão é evidência de fé.',
      'A missão é holística.'
    ],
    versicosChave: ['Mateus 25:31-46', 'Lucas 4:18-19', 'Tiago 2:15-17'],
    tags: ['missão integral', 'justiça social', 'compaixão', 'holística'],
    fontes: ['Chris Wright, The Mission of God']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ESTUDOS FINAIS
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'final-001',
    titulo: 'A Graça Santificadora',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A graça santificadora transforma o caráter do crente.',
      'Não é apenas perdão mas transformação.',
      'O Espírito Santo é o agente da santificação.',
      'A santificação é progressiva.',
      'A graça capacita o que a lei exige.'
    ],
    versicosChave: ['Tito 3:5', '1 Tessalonicenses 4:3', 'Efésios 2:10'],
    tags: ['graça', 'santificação', 'transformação', 'Espírito Santo'],
    fontes: ['John Murray, Redemption Accomplished']
  },
  {
    id: 'final-002',
    titulo: 'A Fé Viva e Ativa',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A fé verdadeira nunca está só.',
      'A fé se prova pelas obras.',
      'A fé é confiança viva em Cristo.',
      'A fé transforma a vida.',
      'A fé é dom de Deus.'
    ],
    versicosChave: ['Tiago 2:14-26', 'Gálatas 5:6', 'Efésios 2:8-9'],
    tags: ['fé', 'obras', 'vida', 'transformação'],
    fontes: ['Calvino, Institutas III.2']
  },
  {
    id: 'final-003',
    titulo: 'A Esperança no Sofrimento',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'O sofrimento é realidade humana.',
      'A esperança cristã não anula a dor.',
      'Deus está presente no sofrimento.',
      'O sofrimento produz caráter.',
      'A glória futura supera o sofrimento presente.'
    ],
    versicosChave: ['Romanos 8:18', '2 Coríntios 4:17', '1 Pedro 1:6-7'],
    tags: ['sofrimento', 'esperança', 'caráter', 'glória'],
    fontes: ['C.S. Lewis, The Problem of Pain']
  },
  {
    id: 'final-004',
    titulo: 'O Amor Incondicional',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'O amor de Deus é incondicional.',
      'Ele nos amou quando ainda éramos pecadores.',
      'O amor não depende de nossa dignidade.',
      'O amor se manifesta na cruz.',
      'Somos chamados a amar como fomos amados.'
    ],
    versicosChave: ['Romanos 5:8', '1 João 4:19', 'João 3:16'],
    tags: ['amor', 'incondicional', 'cruz', 'exemplo'],
    fontes: ['Anders Nygren, Agape and Eros']
  },
  {
    id: 'final-005',
    titulo: 'A Justificação pela Fé Somente',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A justificação é por fé somente.',
      'Não pelas obras da lei.',
      'A fé é meio, não mérito.',
      'A justiça é imputada.',
      'A justificação é certeza.'
    ],
    versicosChave: ['Romanos 3:28', 'Gálatas 2:16', 'Efésios 2:8-9'],
    tags: ['justificação', 'fé somente', 'imputação', 'certeza'],
    fontes: ['Lutero, Galatas Comentário']
  },
  {
    id: 'final-006',
    titulo: 'A Perseverança dos Santos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'Deus guarda os Seus eleitos.',
      'Ninguém pode arrancá-los das Suas mãos.',
      'A perseverança é evidência de fé.',
      'Deus é fiel para completar o que começou.',
      'A perseverança é motivada pela esperança.'
    ],
    versicosChave: ['João 10:27-30', 'Filipenses 1:6', 'Romanos 8:38-39'],
    tags: ['perseverança', 'segurança', 'fidelidade', 'eleição'],
    fontes: ['Calvino, Institutas III.24']
  },
  {
    id: 'final-007',
    titulo: 'A Soberania de Deus na História',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'Deus governa todas as coisas.',
      'Nada acontece fora do Seu controle.',
      'A história caminha para o Seu propósito.',
      'Deus usa até o mal para um bem maior.',
      'A soberania é fonte de segurança.'
    ],
    versicosChave: ['Efésios 1:11', 'Romanos 8:28', 'Daniel 4:35'],
    tags: ['soberania', 'história', 'propósito', 'segurança'],
    fontes: ['Calvino, Institutas I.16']
  },
  {
    id: 'final-008',
    titulo: 'A Graça que Salva',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A salvação é pela graça de Deus.',
      'Não é mérito humano.',
      'A graça é gratuita e suficiente.',
      'A graça transforma vidas.',
      'A graça é fonte de gratidão.'
    ],
    versicosChave: ['Efésios 2:8-9', 'Tito 3:5', 'Romanos 5:8'],
    tags: ['graça', 'salvação', 'gratuidade', 'transformação'],
    fontes: ['Agostinho, De Gratia et Libero Arbitrio']
  },
  {
    id: 'final-009',
    titulo: 'A Vida Eterna em Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A vida eterna começa agora, não apenas no céu.',
      'Ela é conhecimento de Deus.',
      'Ela se manifesta em amor e obediência.',
      'Ela é certeza para quem crê.',
      'Ela se consumará na ressurreição.'
    ],
    versicosChave: ['João 17:3', 'João 10:28', '1 João 5:11-13'],
    tags: ['vida eterna', 'conhecimento', 'certeza', 'ressurreição'],
    fontes: ['G.E. Ladd, A Theology of the New Testament']
  },
  {
    id: 'final-010',
    titulo: 'A Missão da Igreja no Mundo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A missão é a razão de ser da Igreja.',
      'Fazer discípulos é o mandamento.',
      'A missão é holística.',
      'O Espírito capacita.',
      'A missão é para todas as nações.'
    ],
    versicosChave: ['Mateus 28:19-20', 'Atos 1:8', 'Romanos 10:14-15'],
    tags: ['missão', 'discipulado', 'holística', 'Espírito'],
    fontes: ['David Bosch, Transforming Mission']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TRINDADE - ESTUDOS DETALHADOS (3 estudos)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'trin-001',
    titulo: 'A Doutrina da Trindade — Fundamentos Bíblicos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Trindade',
    conteudo: [
      'A doutrina da Trindade afirma que há um único Deus que subsiste em três pessoas distintas: Pai, Filho e Espírito Santo. Cada pessoa é plenamente Deus, e há um só Deus verdadeiro. Esta não é uma especulação filosófica, mas a leitura fiel da revelação bíblica.',
      'No Antigo Testamento, a monoteísmo é radicalmente afirmado: "Ouve, Israel, o Senhor nosso Deus é o único Senhor" (Dt 6:4). Contudo, multiplicidade interna já se manifesta: o anjo do Senhor é distinto de Javé, o Espírito de Deus atua criadoramente, e a sabedoria personificada aparece em Provérbios 8.',
      'No Novo Testamento, a Trindade aparece no batismo de Jesus (Mt 3:16-17), na Grande Comissão (Mt 28:19), na bênção apostólica (2 Co 13:14) e em diversas fórmulas litúrgicas. Jesus afirma claramente sua unidade com o Pai: "Eu e o Pai somos um" (Jo 10:30).',
      'O Espírito Santo é pessoal e divino: fala, ensina, consola, intercede. Atribuem-se a Ele obras divinas: criação, inspiração, regeneração. Sua procession do Pai (e do Filho no Credo de Calcedônia) é debatida, mas é fato que Ele é pessoa plena da Trindade.',
      'A Trindade não é contradição lógica: é mistério que transcende a razão. Não é três deuses, nem três modos de um Deus. É um Deus em três pessoas subsistentes, co-iguais, co-eternas, co-essenciais. A economia da salvação revela cada pessoa em operação distinta, mas nunca separada.'
    ],
    versicosChave: ['Mateus 28:19', '2 Coríntios 13:14', 'João 10:30', 'Gênesis 1:26', 'Isaías 48:16'],
    tags: ['trindade', 'monoteísmo', 'Pai', 'Filho', 'Espírito Santo', 'unidade'],
    fontes: ['Wayne Grudem, Teologia Sistemática', 'Millard Erickson, Christian Theology', 'Karl Barth, Church Dogmatics I/1']
  },
  {
    id: 'trin-002',
    titulo: 'A Trindade na História da Igreja — Concílios e Definições',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Trindade',
    conteudo: [
      'A formulação trinitária não foi inventada por filósofos, mas foi o resultado de séculos de leitura da Escritura e do combate às heresias que ameaçavam a fé cristã. Os primeiros Pais apologistas já afirmavam a divindade do Logos e a ação do Espírito.',
      'O Concílio de Nicéia (325) condenou o arianismo, que negava a plena divindade do Filho. O termo "homoousios" (da mesma substância) foi adotado para afirmar que o Filho é plenamente Deus, não uma criatura, por mais exaltada que seja. Atanásio foi o principal defensor da fé nicena.',
      'O Concílio de Constantinopla (381) completou a obra de Nicéia, afirmando a divindade do Espírito Santo contra os macedônios (pneumatômacos), que O tratavam como criatura. O Credo Niceno-Constantinopolitano, usado até hoje, cristalizou a doutrina.',
      'Os Capadócios (Basílio de Cesareia, Gregório de Nazianzo, Gregório de Nissa) desenvolveram a distinção entre "essência" (ousia) e "pessoa" (hypostasis), distinguindo a identidade pessoal das pessoas trinitárias. Agostinho, no Ocidente, contribuiu com a analogia psicológica do amor.',
      'A heresia modalista (Sabelianismo) via as três pessoas como modos temporais de um Deus uno. O triteísmo via três deuses. A ortodoxia nicena permaneceu como ponto de equilíbrio: três pessoas, uma essência. Esta formulação tem resistido por mil e setecentos anos.'
    ],
    versicosChave: ['João 1:1-3', 'Atos 5:3-4', 'Mateus 3:16-17', 'Hebreus 1:3', 'João 15:26'],
    tags: ['Niceia', 'Constantinopla', 'homoousios', 'Capadócios', 'arianismo', 'modalismo'],
    fontes: ['Jaroslav Pelikan, The Christian Tradition I', 'Lewis Ayres, Nicaea and its Legacy', 'Richard Rubenstein, When Jesus Became God']
  },
  {
    id: 'trin-003',
    titulo: 'A Trindade e a Vida Cristã — Aplicações Práticas',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Trindade',
    conteudo: [
      'A doutrina da Trindade não é mera especulação acadêmica; ela molda toda a vida cristã. A experiência de salvação é trinitária: o Pai planeja a redenção, o Filho a executa na cruz, o Espírito a aplica nos corações.',
      'Na oração, entramos em comunhão com o Deus triúno. Pelo Espírito, oramos ao Pai em nome do Filho. A Trindade é o contexto eterno da vida devocional. A oração de Jesus em João 17 revela a intimidade trinitária que somos convidados a participar.',
      'A comunidade cristã é imagem da Trindade. Assim como as pessoas divinas vivem em comunhão de amor, a Igreja é chamada a viver em koinonia — comunhão, participação, mutualidade. A solidão é anti-trinitária.',
      'O amor cristão tem seu modelo na Trindade. O Pai ama o Filho, o Filho ama o Pai, e o Espírito é o vínculo desse amor. Quando amamos, participamos do amor eterno que circula na vida divina. Todo amor genuíno é reflexo do amor trinitário.',
      'A missão é trinitária: somos enviados pelo Filho como o Filho foi enviado pelo Pai, no poder do Espírito (Jo 20:21). A Grande Comissão é obra da Trindade. Evangelizar é convidar pessoas a entrar na comunhão com o Deus triúno.'
    ],
    versicosChave: ['João 17:20-23', 'Mateus 28:19', 'Efésios 2:18', 'Romanos 8:26-27', 'Gálatas 4:6'],
    tags: ['aplicação', 'oração', 'comunhão', 'amor', 'missão', 'vida cristã'],
    fontes: ['Garry Williams, Gospel Coalition Essays on the Trinity', 'Fred Sanders, The Deep Things of God', 'Leon Morris, The Gospel According to John']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EXPIAÇÃO (2 estudos)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'exp-001',
    titulo: 'A Expiação Substitutiva — O Coração do Evangelho',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Cristologia',
    conteudo: [
      'A expiação substitutiva é a doutrina de que Cristo morreu no lugar dos pecadores, carregando sobre Si a penalidade que nos era devida. "Ele foi ferido pelas nossas transgressões" (Is 53:5) é a declaração clássica desta verdade.',
      'A metáfora do "Cordeiro de Deus que tira o pecado do mundo" (Jo 1:29) ecoa o sistema sacrificial do Antigo Testamento. O sangue dos animais cobria o pecado (Hb 9:22), mas o sangue de Cristo o remove definitivamente, porque Ele é o Cordeiro sem mácula (1 Pe 1:19).',
      'Paulo apresenta a justificação pela fé baseada na morte propiciatória: "Deus o propôs como propiciação pela fé no seu sangue" (Rm 3:25). A propiciação satisfaz a ira de Deus contra o pecado, removendo o obstáculo à comunhão.',
      'A cruz não é apenas exemplo de amor (embora também o seja), mas substituição penal. Cristo "se fez pecado por nós" (2 Co 5:21), "maldito em nosso lugar" (Gl 3:13). Ele sofreu o que nós merecíamos, para que recebêssemos o que Ele merecia (2 Co 5:21).',
      'Implicações pastorais: a expiação substitutiva oferece segurança ao crente. Nenhuma condenação pesa sobre o justificado, porque Cristo já pagou. A santificação flui da gratidão, não do medo. A missão é motivada pela grandeza do sacrifício.'
    ],
    versicosChave: ['Isaías 53:5', 'Romanos 3:25', '2 Coríntios 5:21', 'Gálatas 3:13', '1 Pedro 1:18-19'],
    tags: ['expiação', 'substituição', 'propiciação', 'sangue', 'justificação', 'cruz'],
    fontes: ['John Stott, A Cruz de Cristo', 'R.C. Sproul, The Truth of the Cross', 'Leon Morris, The Apostolic Preaching of the Cross']
  },
  {
    id: 'exp-002',
    titulo: 'Teorias da Expiação ao Longo da História',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Cristologia',
    conteudo: [
      'A Igreja refletiu sobre o significado da cruz ao longo dos séculos, desenvolvendo várias teorias da expiação. Cada uma captura um aspecto da verdade bíblica, mas nenhuma esgota o mistério.',
      'A teoria do resgate (Orígenes, Gregório de Nissa) via a morte de Cristo como pagamento a Satanás pelo direito sobre os pecadores. A limitação é fazer do diabo o destinatário do pagamento, mas o valor está em afirmar a realidade da libertação.',
      'A teoria da satisfação (Anselmo, Cur Deus Homo, 1098) viu a morte de Cristo como reparação da honra de Deus ofendida pelo pecado. Cristo, como Deus-homem, ofereceu à divindade algo de valor infinito. Esta teoria dominou a Idade Média.',
      'A Reforma reformulada a teoria como substituição penal: Cristo não apenas satisfez a honra, mas pagou a pena devida pelos pecadores. Calvino, Lutero e os reformados enfatizaram que a justificação se baseia na imputação da obediência ativa e passiva de Cristo.',
      'A teoria exemplar (Abelardo, Socínio) via a cruz como exemplo de amor, não como sacrifício substitutivo. Os reformados combateram-na por reduzir a obra de Cristo a榜样 moral. A teoria do governo (Grotius) tentou um meio-termo, vendo a morte de Cristo como demonstração da seriedade da lei divina.'
    ],
    versicosChave: ['Romanos 5:8-9', 'Hebreus 9:14', '1 João 2:2', '1 Pedro 3:18', 'Efésios 5:2'],
    tags: ['teorias', 'resgate', 'satisfação', 'substituição penal', 'exemplar', 'Anselmo'],
    fontes: ['Gustaf Aulén, Christus Victor', 'John McIntyre, The Shape of Soteriology', 'H. D. McDonald, The Atonement of the Death of Christ']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ELEIÇÃO (2 estudos)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'ele-001',
    titulo: 'A Eleição Incondicional — O Decreto Eterno de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A eleição é o ato eterno de Deus de escolher, em Cristo, alguns para a salvação, antes da fundação do mundo. Paulo afirma: "nos escolheu nele antes da fundação do mundo" (Ef 1:4). A eleição é incondicional, não baseada em obras previstas.',
      'A base da eleição é a livre soberania de Deus, não a fé prevista nem as obras meritórias. Romanos 9:11-13 mostra que Jacó foi escolhido antes de nascer, "para que o propósito de Deus segundo a eleição permanecesse".',
      'A eleição é em Cristo: "nos escolheu nele". Não é uma seleção arbitrária, mas a escolha de pessoas para serem conformadas à imagem do Filho (Rm 8:29). Cristo é o fundamento e o critério da eleição.',
      'A objeção calvinista ao arminianismo: a fé não pode ser a causa da eleição, porque a fé é dom de Deus (Ef 2:8). Logo, se a fé é dom, e a fé é condição da eleição, então Deus escolhe com base em algo que Ele mesmo dá — o que torna a escolha arbitrária de qualquer forma.',
      'Implicações pastorais: a eleição é fonte de segurança, não de orgulho. O crente não se gloria em ter sido escolhido, mas no Deus que escolheu. A eleição é mistério que humilha e consola: não somos salvos por nossa decisão, mas pelo decreto eterno.'
    ],
    versicosChave: ['Efésios 1:4-5', 'Romanos 9:11-13', '2 Tessalonicenses 2:13', '1 Pedro 1:2', 'João 15:16'],
    tags: ['eleição', 'predestinação', 'decreto', 'soberania', 'reforma'],
    fontes: ['João Calvino, Institutas III.21-24', 'Jonathan Edwards, Freedom of the Will', 'John Piper, The Pleasures of God']
  },
  {
    id: 'ele-002',
    titulo: 'Eleição e Evangelização — O Equilíbrio Bíblico',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A eleição e a evangelização não se contradizem; ambas são ensinadas na Escritura. Deus elege soberanamente, mas também ordena que o evangelho seja pregado a toda criatura. O crente na eleição não é passivo na missão.',
      'Jesus une os dois: "Não fostes vós que me escolhestes a mim; pelo contrário, eu vos escolhi a vós outros e vos designei para que vades e deis fruto" (Jo 15:16). A escolha precede a missão, mas a missão é o fruto da escolha.',
      'A eleição não anula a responsabilidade humana. Paulo, sabendo-se enviado aos eleitos, pregava a todos (At 18:9-10). A soberania divina e a instrumentalidade humana coexistem na economia da salvação.',
      'O arminianismo vê a eleição como condicional — Deus elege com base na fé prevista. Isto preserva a liberdade humana, mas enfraquece a soberania divina. O calvinismo vê a eleição como incondicional — Deus elege soberanamente, e a fé é o fruto, não a causa.',
      'Praticamente, a doutrina da eleição deve produzir zelo missionário, não apatia. Se Deus elegeu, há eleitos em todo lugar — nossa tarefa é buscá-los pelo evangelho. Os puritanos, que criam na eleição incondicional, foram os maiores missionários de sua época.'
    ],
    versicosChave: ['João 15:16', 'Atos 18:9-10', 'Romanos 10:14-15', '2 Timóteo 2:10', '1 Tessalonicenses 1:4-5'],
    tags: ['eleição', 'evangelização', 'missão', 'livre arbítrio', 'cooperação'],
    fontes: ['Iain Murray, Spurgeon v. Hyper-Calvinism', 'John Stott, A Fé Cristã em Busca de Novos Rumos', 'Michael Horton, Putting Amazing Back Into Grace']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PERSEVERANÇA DOS SANTOS (1 estudo)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'pers-001',
    titulo: 'A Perseverança dos Santos — Segurança Eterna do Crente',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A perseverança dos santos (ou preservação divina) é a doutrina de que aqueles que foram verdadeiramente regenerados por Deus perseverarão na fé até o fim. A salvação é obra de Deus, do princípio ao fim, e Ele é fiel para completar o que começou.',
      'Paulo garante: "Aquele que começou a boa obra em vós há de completá-la até ao dia de Cristo Jesus" (Fp 1:6). A salvação é da graça, e a graça que salva é a graça que sustenta. Deus não começa uma obra para abandoná-la no meio.',
      'Jesus afirma a segurança dos Seus: "Eu dou-lhes a vida eterna, e jamais perecerão; ninguém as arrebatará da minha mão" (Jo 10:28). A salvação é dom do Pai ao Filho, e o Filho a preserva.',
      'O texto de Romanos 8:30 forma a "cadeia de ouro" da salvação: a quem Deus predestinou, chamou, justificou e glorificou. Cada elo do processo é obra de Deus. A glorificação é tão certa quanto a justificação, porque vem da mesma mão soberana.',
      'Objeções comuns: e os que "desistem"? Os reformados respondem: a fé que desiste não era fé salvífica. A perseverança é evidência da regeneração. Quem nasce de Deus, o Espírito o sustenta. Não por mérito do crente, mas pela fidelidade do Deus que chamou.'
    ],
    versicosChave: ['Filipenses 1:6', 'João 10:28-29', 'Romanos 8:30', '1 Pedro 1:5', 'Judas 1:24'],
    tags: ['perseverança', 'segurança', 'preservação', 'fidelidade', 'graça'],
    fontes: ['João Calvino, Institutas III.24', 'Anthony Hoekema, Saved by Grace', 'Robert Peterson, Eternal Security']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BATISMO (2 estudos)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'bat-001',
    titulo: 'O Batismo Cristão — Significado e Modo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Sacramentos',
    conteudo: [
      'O batismo é o sacramento da iniciação cristã, instituído por Cristo na Grande Comissão: "Batizando-os em nome do Pai, e do Filho, e do Espírito Santo" (Mt 28:19). É o sinal de entrada no corpo de Cristo e na comunidade da fé.',
      'O simbolismo é rico: o batismo representa a morte e ressurreição de Cristo (Rm 6:3-4), a purificação do pecado (At 2:38), a circuncisão do coração (Cl 2:11-12) e a nova criação (Gl 3:27). É morrer para o pecado e viver para Deus.',
      'O modo do batismo divide a cristandade: imersão, aspersão e efusão são praticadas. Os batistas defendem a imersão como único modo válido, argumentando que o grego "baptizo" significa imergir, e que os simbolismos de morte e ressurreição exigem submersão.',
      'Os pedobatistas (que batizam crianças) defendem a aspersão ou efusão, argumentando que a circuncisão do Antigo Testamento é prefiguração do batismo, e que a aliança se estende aos filhos dos crentes (At 2:38-39; 16:15,33; 1 Co 7:14).',
      'Independentemente do modo, o batismo é ordenado por Cristo, é sinal de graça, é administrado uma vez, e é sinal de ingresso na comunidade da fé. Sua teologia não substitui a fé, mas a expressa publicamente.'
    ],
    versicosChave: ['Mateus 28:19', 'Romanos 6:3-4', 'Atos 2:38', 'Colossenses 2:12', 'Gálatas 3:27'],
    tags: ['batismo', 'sacramento', 'iniciação', 'imersão', 'aspersão', 'aliança'],
    fontes: ['Wayne Grudem, Teologia Sistemática', 'G.R. Beasley-Murray, Baptism in the New Testament', 'John Murray, Christian Baptism']
  },
  {
    id: 'bat-002',
    titulo: 'O Batismo de Crianças — Debate Histórico-Teológico',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Sacramentos',
    conteudo: [
      'O batismo de crianças (pedobatismo) é praticado pela maioria das tradições cristãs: católica, ortodoxa, luterana, reformada, anglicana, metodista. Os batistas e algumas igrejas evangélicas o rejeitam, praticando o batismo de crentes (credobatismo).',
      'Os argumentos a favor do pedobatismo: 1) A aliança abraâmica incluía os filhos (Gn 17:7-12); 2) Atos 16:15 (Lídia e sua casa) e 16:33 (o carcereiro e sua casa) mencionam batismos domésticos; 3) 1 Co 7:14 indica que os filhos dos crentes são "santos"; 4) A teologia reformada vê continuidade entre Antigo e Novo Testamento.',
      'Os argumentos a favor do credobatismo: 1) Não há mandamento explícito de batizar crianças; 2) O exemplo do Novo Testamento mostra crentes sendo batizados após a conversão; 3) O batismo pressupõe fé pessoal (Mc 16:16; At 2:41); 4) A teologia batista vê a igreja como comunidade de crentes professos.',
      'Calvino e os reformados viram a circuncisão como prefiguração do batismo. Assim como os filhos dos hebreus eram circuncidados a partir de Abraão, os filhos dos crentes são batizados na nova aliança. A continuidade da aliança sustenta o pedobatismo.',
      'A questão é eclesiologicamente importante: pedobatistas veem a Igreja como continuidade de Israel e a aliança abraâmica; credobatistas veem a Igreja como nova entidade de crentes professos. Ambas as posições têm argumentos exegéticos sólidos, e o debate continua na cristandade.'
    ],
    versicosChave: ['Gênesis 17:7-12', 'Atos 2:38-39', 'Atos 16:15', '1 Coríntios 7:14', 'Colossenses 2:11-12'],
    tags: ['pedobatismo', 'credobatismo', 'crianças', 'aliança', 'circuncisão'],
    fontes: ['João Calvino, Institutas IV.16', 'Karl Barth, Church Dogmatics IV/4', 'David Wright, What Has Infant Baptism Done to Baptism?']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CEIA DO SENHOR (2 estudos)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'ceia-001',
    titulo: 'A Ceia do Senhor — Instituição e Significado',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Sacramentos',
    conteudo: [
      'A Ceia do Senhor (Eucaristia, Santa Ceia, Comunhão) foi instituída por Cristo na noite da Páscoa, pouco antes de Sua crucifixão. "Isto é o meu corpo... isto é o meu sangue" (Mt 26:26-28) é a declaração central do sacramento.',
      'O pão representa o corpo de Cristo, partido por nós. O vinho representa o sangue da nova aliança, derramado para remissão dos pecados. Os elementos são sinais visíveis de uma graça invisível — o sacrifício de Cristo aplicado ao crente.',
      'A Ceia é memorial: "Fazei isto em memória de mim" (1 Co 11:24). A Igreja recorda a morte salvífica de Cristo toda vez que parte o pão. A Ceia não acrescenta nada ao sacrifício de Cristo, mas o atualiza na experiência dos fiéis.',
      'A Ceia é comunhão: "O pão que partimos não é porventura a comunhão do corpo de Cristo?" (1 Co 10:16). Participamos da morte de Cristo pela fé, e somos unidos a Ele e aos irmãos. A Ceia é comunhão vertical e horizontal.',
      'A Ceia é proclamação: "Porque todas as vezes que comerdes deste pão e beberdes deste cálice, anunciais a morte do Senhor" (1 Co 11:26). Cada celebração é um sermão visível do evangelho, até que Ele venha. A Ceia tem dimensão escatológica.'
    ],
    versicosChave: ['Mateus 26:26-28', '1 Coríntios 11:23-26', '1 Coríntios 10:16-17', 'João 6:53-58', 'Lucas 22:19-20'],
    tags: ['ceia', 'eucaristia', 'sacramento', 'comunhão', 'memorial', 'sangue'],
    fontes: ['João Calvino, Institutas IV.17', 'Thomas Cranmer, Book of Common Prayer', 'Herman Bavinck, Reformed Dogmatics IV']
  },
  {
    id: 'ceia-002',
    titulo: 'A Presença de Cristo na Ceia — Visões Históricas',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Sacramentos',
    conteudo: [
      'A questão da presença de Cristo na Ceia divide a cristandade em quatro grandes visões: transubstanciação, consubstanciação, presença espiritual e memorialismo. Cada uma interpreta "isto é o meu corpo" à sua maneira.',
      'A transubstanciação (catolicismo romano) ensina que a substância do pão se converte no corpo de Cristo, e a do vinho em Seu sangue, permanecendo apenas as aparências (espécies). Foi definida oficialmente no IV Concílio de Latrão (1215) e reafirmada em Trento.',
      'A consubstanciação (Lutero) ensina que Cristo está presente "em, com e sob" o pão e o vinho, sem que estes deixem de ser pão e vinho. Lutero usou a analogia do ferro em brasa: o ferro está no fogo, e o fogo no ferro, sem se misturarem.',
      'A presença espiritual (Calvino, reformados) ensina que Cristo está presente pelo Espírito, e que os crentes são elevados ao céu para participar do Seu corpo glorificado. O pão e o vinho permanecem pão e vinho, mas são meios pelos quais recebemos a Cristo pela fé.',
      'O memorialismo (Zwinglio, batistas reformados) entende "isto é" como "isto significa", e vê a Ceia como memorial obediencial, sem presença especial de Cristo. Os elementos permanecem símbolos. A presença é pela fé, não objetivamente nos elementos.'
    ],
    versicosChave: ['Mateus 26:26', '1 Coríntios 11:24-25', 'João 6:63', 'Atos 3:21', 'Hebreus 1:3'],
    tags: ['transubstanciação', 'consubstanciação', 'presença espiritual', 'memorialismo', 'Lutero', 'Calvino', 'Zwinglio'],
    fontes: ['João Calvino, Institutas IV.17', 'Heinrich Heppe, Reformed Dogmatics', 'David Willis-Watkins, The Lutheran Reformation']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ESCATOLOGIA DETALHADA (3 estudos)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'esc-001',
    titulo: 'O Arrebatamento da Igreja — Pré, Mid ou Pós-Tribulacionismo',
    categoria: 'Escatologia',
    subcategoria: 'Eventos Finais',
    conteudo: [
      'O arrebatamento (raptura) é o evento em que Cristo vem para tirar Sua Igreja do mundo antes da ira escatológica. As visões principais diferem quanto ao momento: pré-tribulacionismo, mid-tribulacionismo e pós-tribulacionismo.',
      'O pré-tribulacionismo ensina que a Igreja será arrebatada antes da tribulação de sete anos. Os argumentos: 1) A Igreja é distinta de Israel; 2) 1 Ts 4:13-18 indica um arrebatamento iminente; 3) Apocalipse menciona a Igreja apenas até o capítulo 3, ausente da tribulação; 4) Deus não destina Sua Igreja à ira (1 Ts 5:9).',
      'O mid-tribulacionismo ensina que o arrebatamento ocorre no meio da tribulação (após 3,5 anos). Os argumentos: 1) Apocalipse 11:12 menciona dois profetas "subindo ao céu"; 2) Daniel 7:25 menciona "um tempo, dois tempos e metade de um tempo" como metade da tribulação; 3) A Igreja passa por provação, mas não pela ira final.',
      'O pós-tribulacionismo ensina que a Igreja passa por toda a tribulação e é arrebatada no final, para encontrar Cristo na Sua segunda vinda. Os argumentos: 1) 2 Ts 2:1-4 indica que Cristo só vem após a apostasia e a revelação do anticristo; 2) A Igreja passa por perseguição sempre; 3) Não há separação clara entre a Igreja e Israel.',
      'A posição pré-tribulacional tem sido a mais popular no evangelicalismo, especialmente no meio das assembléias e dos batistas. Os pré-milenistas geralmente a defendem. Os amilenistas e pós-milenistas tendem a rejeitar a ideia de arrebatamento secreto, vendo a vinda de Cristo como evento único e visível.'
    ],
    versicosChave: ['1 Tessalonicenses 4:13-18', 'Apocalipse 3:10', '1 Tessalonicenses 5:9', '2 Tessalonicenses 2:1-4', 'Mateus 24:36-44'],
    tags: ['arrebatamento', 'raptura', 'tribulação', 'pré-tribulacionismo', 'pós-tribulacionismo', 'escatologia'],
    fontes: ['John Walvoord, The Rapture Question', 'George Eldon Ladd, The Blessed Hope', 'Craig Keener, Matthew (IVP)']
  },
  {
    id: 'esc-002',
    titulo: 'A Grande Tribulação — Período de Angústia e Purificação',
    categoria: 'Escatologia',
    subcategoria: 'Eventos Finais',
    conteudo: [
      'A Grande Tribulação é o período final de sete anos, descrito em Daniel 9:24-27 e Apocalipse 6-19. Será um tempo de angústia sem paralelo na história (Dn 12:1; Mt 24:21), com a manifestação plena do anticristo e a ira de Deus sobre a humanidade rebelde.',
      'Daniel 9:24-27 profetiza "setenta semanas" (anos), das quais 69 foram cumpridas na primeira vinda de Cristo. A 70ª semana (sete anos) é a tribulação, cortada ao meio (3,5 anos) pela "abominação da desolação" (Dn 9:27; Mt 24:15).',
      'No meio da tribulação, o anticristo profanará o templo reconstruído em Jerusalém, exigindo adoração. Este evento ("abominação da desolação") marca o início da "grande tribulação" (Mt 24:21), os últimos 3,5 anos de intenso sofrimento.',
      'As pragas do Apocalipse (selos, trombetas, taças) descrevem juízos progressivos sobre a Terra. Os 144.000 judeus selados (Ap 7:1-8) e as duas testemunhas (Ap 11) atuam durante este período. A "mulher" de Apocalipse 12 representa Israel, perseguida pelo dragão.',
      'A Igreja, segundo o pré-tribulacionismo, é tirada antes deste período. Segundo o pós-tribulacionismo, ela passa por ele. De qualquer forma, Deus preserva um remanescente fiel. O objetivo da tribulação é o juízo da humanidade rebelde e a purificação do povo de Deus.'
    ],
    versicosChave: ['Daniel 9:24-27', 'Mateus 24:15-21', 'Apocalipse 7:14', 'Apocalipse 11:2-3', 'Apocalipse 13:5-7'],
    tags: ['tribulação', 'anticristo', 'Daniel', '70 semanas', 'abominação', 'selos', 'trombetas'],
    fontes: ['René Pache, O Retorno de Jesus Cristo', 'John Walvoord, The Revelation of Jesus Christ', 'Merrill Tenney, Interpreting Revelation']
  },
  {
    id: 'esc-003',
    titulo: 'O Milênio — Amilenismo, Pré-milenismo e Pós-milenismo',
    categoria: 'Escatologia',
    subcategoria: 'Eventos Finais',
    conteudo: [
      'Apocalipse 20:1-6 menciona um "mil anos" seis vezes, gerando intenso debate na Igreja. Três posições principais: amilenismo (não há milênio literal), pré-milenismo (milênio literal antes da eternidade) e pós-milenismo (milênio antes da segunda vinda).',
      'O amilenismo (Agostinho, muitos reformados) entende os mil anos como o período entre a primeira e a segunda vinda de Cristo, ou como a condição atual da Igreja, na qual Cristo reina espiritualmente. Os dois ressurreições são a regeneração e a ressurreição corporal. O número 1000 é simbólico, não literal.',
      'O pré-milenismo (literalistas, dispensacionalistas, primitivos) entende os mil anos como um reinado literal de Cristo na Terra após Sua segunda vinda, com os santos ressurrectos reinando com Ele por mil anos. Ocorre entre a primeira e a segunda ressurreição (separadas por mil anos).',
      'O pós-milenismo (otimistas, vitoriosos) entende os mil anos como uma era de ouro da Igreja, antes da segunda vinda, em que o evangelho prevalecerá no mundo. Após este período, Cristo voltará. Foi popular entre os puritanos e no evangelicalismo do século 19.',
      'Implicações pastorais: o pré-milenismo enfatiza a esperança da vinda iminente; o amilenismo enfatiza a realidade presente do reino; o pós-milenismo enfatiza o otimismo da missão. Todas as posições têm apoio exegético respeitável, e o debate continua.'
    ],
    versicosChave: ['Apocalipse 20:1-6', '1 Coríntios 15:24-28', 'Mateus 5:5', 'Isaías 65:17-25', '2 Pedro 3:8'],
    tags: ['milênio', 'amilenismo', 'pré-milenismo', 'pós-milenismo', 'reino', 'escatologia'],
    fontes: ['Anthony Hoekema, The Bible and the Future', 'George Eldon Ladd, The Blessed Hope', 'Herman Ridderbos, The Coming of the Kingdom']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VIDA DEVOCIONAL (2 estudos)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'dev-001',
    titulo: 'A Oração — Comunhão com o Pai',
    categoria: 'Vida Cristã',
    subcategoria: 'Devoção',
    conteudo: [
      'A oração é a comunhão do crente com Deus. É diálogo, não monólogo. Jesus ensinou a orar com a paternidade de Deus em vista: "Pai nosso, que estás nos céus" (Mt 6:9). A intimidade filial é o fundamento da oração cristã.',
      'Os elementos da oração cristã: adoração (reconhecer quem Deus é), confissão (admitir o pecado), ação de graças (gratidão pelas bênçãos), súplica (pedir necessidades) e intercessão (orar pelos outros). A Oração do Senhor cobre todas essas dimensões.',
      'As condições da oração eficaz: 1) Fé em Deus (Tg 1:6-7); 2) Permanecer em Cristo (Jo 15:7); 3) Pedir conforme a vontade de Deus (1 Jo 5:14); 4) Não pedir com motivos errados (Tg 4:3); 5) Humildade e arrependimento (Lc 18:9-14).',
      'As orações do AT e do NT revelam profundidade. Moisés intercedeu por Israel (Êx 32:11-14). Davi clamou do fundo do vale (Sl 130). Daniel orou três vezes ao dia (Dn 6:10). Paulo pediu que os crentes orassem por ele (Ef 6:18-20).',
      'A oração persistente: Jesus ensinou a parábola da viúva e do juiz (Lc 18:1-8) para encorajar a oração constante. Não é que Deus precise ser importunado, mas nossa perseverança é disciplina da alma. Oração é relacionamento, não mágica.'
    ],
    versicosChave: ['Mateus 6:9-13', 'Filipenses 4:6-7', '1 Tessalonicenses 5:17', 'Hebreus 4:16', 'Salmos 145:18'],
    tags: ['oração', 'Pai nosso', 'intercessão', 'fé', 'comunhão', 'perseverança'],
    fontes: ['Andrew Murray, Com Cristo na Escola de Oração', 'John Bunyan, O Peregrino', 'E.M. Bounds, Power Through Prayer']
  },
  {
    id: 'dev-002',
    titulo: 'A Leitura Bíblica — A Palavra como Pão Diário',
    categoria: 'Vida Cristã',
    subcategoria: 'Devoção',
    conteudo: [
      'A leitura regular da Bíblia é essencial para a vida cristã. Jesus respondeu à tentação com "Está escrito" (Mt 4:4). A Palavra de Deus é o pão do espírito, a espada do crente, o espelho da alma, e o combustível da fé.',
      'Como ler a Bíblia com proveito: 1) Ore antes de ler, pedindo iluminação do Espírito; 2) Leia com reverência, como Palavra de Deus; 3) Leia com regularidade, em plano sistemático; 4) Leia com atenção, meditando no texto; 5) Leia com obediência, aplicando à vida.',
      'A leitura devocional difere do estudo exegético. A primeira visa comunhão com Deus; o segundo, entendimento do texto. Ambas são necessárias, mas têm objetivos distintos. A leitura devocional não substitui o estudo aprofundado, e vice-versa.',
      'Os benefícios da leitura bíblica regular: 1) Santificação — "santifica-os na verdade" (Jo 17:17); 2) Consolação — "para que tenhais esperança" (Rm 15:4); 3) Direção — "lâmpada para os meus pés" (Sl 119:105); 4) Defesa — contra o erro e o pecado.',
      'A leitura em comunidade é igualmente importante. A leitura pública da Palavra (1 Tm 4:13) era prática da Igreja primitiva. Grupos pequenos que se reúnem para estudar a Escritura crescem na fé de modo orgânico e edificam-se mutuamente.'
    ],
    versicosChave: ['Salmos 119:105', '2 Timóteo 3:16-17', 'Josué 1:8', 'Hebreus 4:12', 'João 17:17'],
    tags: ['leitura bíblica', 'meditação', 'Palavra', 'devocional', 'estudo', 'santificação'],
    fontes: ['D. Martyn Lloyd-Jones, Studies in the Sermon on the Mount', 'John Stott, Between Two Worlds', 'Howard Hendricks, Living by the Book']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LOUVOR E ADORAÇÃO (2 estudos)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'lov-001',
    titulo: 'A Natureza da Adoração — Espírito e Verdade',
    categoria: 'Vida Cristã',
    subcategoria: 'Adoração',
    conteudo: [
      'Jesus definiu a adoração autêntica: "É necessário adorar o Pai em espírito e em verdade" (Jo 4:23). A adoração não se limita a um lugar (Sião, Gerizim) ou forma exterior; é questão do coração, movido pelo Espírito.',
      'A adoração é resposta à revelação de Deus. Quando contemplamos Quem Ele é — santo, soberano, gracioso, fiel — nosso coração explode em louvor. A adoração é obra do Espírito Santo, que nos capacita a reconhecer e exaltar a Deus.',
      'Os elementos da adoração cristã: louvor (por quem Deus é), ação de graças (pelo que Ele fez), confissão (pelo que somos), confissão de fé (no que cremos), entrega (de nós mesmos). A liturgia celestial em Apocalipse 4-5 é o modelo eterno.',
      'A música é meio privilegiado, mas não exclusivo. Cânticos, hinos, salmos (Cl 3:16) servem para ensinar, exortar e edificar. A música litúrgica deve ser teologicamente sólida, emocionalmente sincera e congregacionalmente acessível.',
      'A adoração é também serviço e vida. "Adorar" em grego (proskuneo) significa prostrar-se. A vida inteira é ato de adoração quando oferecida a Deus (Rm 12:1). O culto dominical e a vida cotidiana se integram na adoração cristã.'
    ],
    versicosChave: ['João 4:23-24', 'Apocalipse 4:11', 'Colossenses 3:16', 'Salmos 95:6', 'Romanos 12:1'],
    tags: ['adoração', 'espírito', 'verdade', 'louvor', 'música', 'liturgia'],
    fontes: ['John Piper, Desiring God', 'Matt Redman, The Unquenchable Worshipper', 'Harold Best, Music Through the Eyes of Faith']
  },
  {
    id: 'lov-002',
    titulo: 'A Música na Igreja — Cânticos, Hinos e Salmos',
    categoria: 'Vida Cristã',
    subcategoria: 'Adoração',
    conteudo: [
      'A música tem papel central na adoração cristã. Paulo exorta: "Ensinando e exortando uns aos outros com salmos, hinos e cânticos espirituais" (Cl 3:16). A música é veículo de ensino, expressão emocional e edificação comunitária.',
      'A música congregacional é diferente da música de concerto. O objetivo não é exibição, mas participação. Os reformadores valorizavam cânticos cantados por toda a congregação, em contraste com a música apenas clerical da Idade Média.',
      'Os critérios para a música na Igreja: 1) Fidelidade teológica ao texto bíblico; 2) Melodia que honre a Deus, não o ego; 3) Acessibilidade congregacional; 4) Equilíbrio entre tradição e contemporaneidade; 5) Edificação, não entretenimento.',
      'A história da música cristã é rica: dos salmos hebreus aos hinos gregos, dos cânticos monásticos aos hinos da Reforma, dos spirituals ao gospel, do hino evangelical ao worship contemporâneo. Cada época expressou a fé em sua linguagem musical.',
      'O equilíbrio entre tradição e inovação é saudável. A música litúrgica tem continuidade histórica que ancora a fé; a música contemporânea traz vitalidade e renovação. As Igrejas maduras cultivam ambas, evitando o extremismo da novidade absoluta ou da tradição paralisante.'
    ],
    versicosChave: ['Colossenses 3:16', 'Efésios 5:19', 'Salmos 96:1-2', 'Salmos 150:1-6', '1 Crônicas 16:23-33'],
    tags: ['música', 'cânticos', 'hinos', 'salmos', 'adoração', 'congregação'],
    fontes: ['Hughes Oliphant Old, Leading in Prayer', 'Paul Westermeyer, Te Deum', 'Donald Hustad, Jubilate!']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MISSÕES (1 estudo)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'mis-001',
    titulo: 'A Grande Comissão — Mandato Missionário da Igreja',
    categoria: 'Missão e Evangelismo',
    subcategoria: 'Missões',
    conteudo: [
      'A Grande Comissão é o mandato final de Cristo à Sua Igreja: "Ide, portanto, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo, ensinando-os a guardar todas as coisas que vos tenho ordenado" (Mt 28:19-20).',
      'A missão é trinitária: é obra do Pai que envia, do Filho que é enviado, e do Espírito que capacita. A Igreja participa da missão do Deus triúno. A missão não é invenção humana, mas iniciativa divina.',
      'Os pilares da missão cristã: 1) Proclamação do evangelho (kerygma); 2) Ensino e discipulado (didache); 3) Batismo e incorporação à Igreja; 4) Vivência da comunidade koinonia; 5) Serviço diaconal (diakonia). A missão é holística, mas centrada no evangelho.',
      'A história das missões cristãs: dos apóstolos aos Pais da Igreja, dos monges irlandeses aos missionários da Reforma, dos pietistas alemães aos grandes missionários do século 19 (William Carey, Adoniram Judson, David Livingstone, Hudson Taylor). A fé cristã é intrinsecamente missionária.',
      'A Igreja contemporânea enfrenta o desafio da globalização, do pluralismo religioso, do secularismo e da perseguição. A Grande Comissão permanece atual: enquanto houver pessoas que não conhecem Cristo, a missão continua. A salvação é para todos os povos, línguas, tribos e nações (Ap 7:9).'
    ],
    versicosChave: ['Mateus 28:19-20', 'Atos 1:8', 'Romanos 10:14-15', 'Apocalipse 7:9', 'Marcos 16:15-16'],
    tags: ['missão', 'Grande Comissão', 'evangelização', 'discipulado', 'nações', 'globalização'],
    fontes: ['David Bosch, Transforming Mission', 'John Stott, The Contemporary Christian', 'Michael Green, Evangelism in the Early Church']
  },
];

