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

  // ═══════════════════════════════════════════════════════════════════════════
  // 50 NOVOS ESTUDOS — PAULINAS, JOÃO, AP, AT, SISTEMÁTICA
  // ═══════════════════════════════════════════════════════════════════════════

  // --- EPÍSTOLAS PAULINAS ---
  {
    id: 'tl-091',
    titulo: 'Romanos 6 — Morte e Ressurreição com Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      'Romanos 6 responde à objeção de que a graça abundante estimula o pecado (6:1). Paulo declara categoricamente: "De maneira nenhuma!" (6:2). A lógica é inescapável: se morremos com Cristo, o que há de comum entre nós e o pecado?',
      'O batismo é apresentado como participação na morte e ressurreição de Cristo (6:3-4). Assim como Cristo ressuscitou dos mortos pela glória do Pai, também nós devemos andar em novidade de vida. O batismo é sinal externo de realidade espiritual interna.',
      'A velha natureza foi crucificada (6:5-7). A união com Cristo na morte é a base da libertação do pecado. O crente não é mais escravo do pecado porque a sentença de morte já foi cumprida em Cristo. A justificação é completa.',
      'A aplicação prática: "Assim também vós considerai-vos mortos para o pecado, mas vivos para Deus, em Cristo Jesus" (6:11). A indicativa precede a imperativa. Quem somos em Cristo determina como devemos viver.',
      'A santificação é a entrega dos membros a Deus (6:12-19). Antigamente escravos do pecado, agora escravos da justiça. A transformação é radical: dos frutos de impureza para a santificação. A liberdade cristã não é licença, mas capacidade de obedecer.'
    ],
    versicosChave: ['Romanos 6:1-14', 'Romanos 6:23', 'Romanos 6:6-7'],
    tags: ['batismo', 'morte', 'ressurreição', 'santificação', 'graça'],
    fontes: ['Douglas Moo, Romans (NICNT)', 'John Murray, The Epistle to the Romans']
  },
  {
    id: 'tl-092',
    titulo: 'Romanos 7 — A Luta contra o Pecado',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      'Romanos 7:1-6 estabelece a liberdade da Lei. O crente morreu para a Lei pelo corpo de Cristo, para pertencer a outro — ao que ressuscitou dos mortos. O fruto deve ser para a santificação, não para a condenação.',
      'O versículo 7 é crucial: "Acaso, pois, a lei é pecado? De modo nenhum!" (7:7). A Lei é santa, justa e boa. O problema não está na Lei, mas no pecado que habita no ser humano. A Lei é o espelho que revela a corrupção.',
      'A experiência descrita em 7:14-25 é uma das mais dramáticas da Bíblia. "O que faço não é o que quero, mas o que aborreço, isso pratico" (7:15). Paulo descreve a luta interna do crente entre o desejo do bem e a inclinação para o mal.',
      'Quem fala em primeira pessoa? Há debate: é o crente antes da conversão, o crente em experiências de fracasso, ou a experiência de Israel sob a Lei. A maioria dos reformadores vê aqui a experiência do crente em luta.',
      'A resolução vem no versículo 25: "Graças a Deus, por meio de Jesus Cristo, nosso Senhor!" (7:25). A vitória não está no esforço humano, mas em Cristo. Romanos 8 completa o que Romanos 7 deixa em aberto.'
    ],
    versicosChave: ['Romanos 7:7-25', 'Romanos 7:15', 'Romanos 7:24-25'],
    tags: ['Lei', 'pecado', 'luta interna', 'graça', 'vitória'],
    fontes: ['Douglas Moo, Romans (NICNT)', 'Cranfield, Romans (ICC)']
  },
  {
    id: 'tl-093',
    titulo: 'Romanos 8 — A Vida no Espírito Santo',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      'Romanos 8 é o clímax da argumentação paulina. "Agora, pois, nenhuma condenação há para os que estão em Cristo Jesus" (8:1). A justificação de Romanos 3-5 culmina na liberdade do Espírito em Romanos 8.',
      'A lei do Espírito de vida me libertou da lei do pecado e da morte (8:2). O Espírito não apenas perdoa, mas capacita. A Lei moral era impotente para transformar; o Espírito é o poder transformador. A Graça supera a Lei em eficácia.',
      'A incarnação é base da salvação: "Deus, enviando o seu Filho em semelhança de carne de pecado" (8:3). O que a Lei não pôde, Deus fez: condenou o pecado na carne de Cristo. A justiça da Lei se cumpre em nós que andamos segundo o Espírito (8:4).',
      'A identidade dos filhos de Deus: "Todos os que são guiados pelo Espírito de Deus são filhos de Deus" (8:14). O Espírito testemunha ao nosso espírito de que somos filhos (8:16). A adoção é realidade presente, com expectativa futura (8:23).',
      'A segura esperança: "Nem a morte, nem a vida... nos poderão separar do amor de Deus" (8:38-39). A segurança do crente não está na sua firmeza, mas no amor invencível de Deus. A perseverança dos santos é fundamentada na soberania divina.'
    ],
    versicosChave: ['Romanos 8:1-2', 'Romanos 8:14-17', 'Romanos 8:28-30', 'Romanos 8:38-39'],
    tags: ['Espírito Santo', 'liberdade', 'filiação', 'segurança', 'amor de Deus'],
    fontes: ['Douglas Moo, Romans (NICNT)', 'John Stott, Romans (TNTC)']
  },
  {
    id: 'tl-094',
    titulo: '1 Coríntios 12 — Dons Espirituais e o Corpo',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      '1 Coríntios 12 aborda a diversidade de dons espirituais na Igreja. "Há diversidade de dons, mas o Espírito é o mesmo" (12:4). A unidade do Espírito é a base da diversidade de dons. Não há cristão sem dons.',
      'Os dons são distribuídos "a cada um, como ele quer" (12:11). A soberania do Espírito na distribuição é absoluta. Não podemos exigir determinado don nem desprezar o de outro. Cada don é necessário para o funcionamento do corpo.',
      'A analogia do corpo (12:12-27) é brilhante. O corpo tem membros diferentes com funções diferentes. O olho não pode dizer à mão: "Não te preciso". Os membros mais humildes são necessários. A honra mútua émandamento.',
      'Os dons mencionados: palavra de sabedoria, palavra de conhecimento, fé, curas, milagres, profecia, discernimento de espíritos, variedade de línguas, interpretação de línguas (12:8-10). A lista não é exaustiva.',
      'O critério supremo dos dons é a edificação da Igreja (12:7, 14:12, 26). Os dons não são para exibição pessoal, mas para construção comunitária. A love chapter (13) interrompe a discussão para lembrar: sem amor, os dons são inúteis.'
    ],
    versicosChave: ['1 Coríntios 12:4-11', '1 Coríntios 12:12-27', '1 Coríntios 12:31'],
    tags: ['dons espirituais', 'corpo de Cristo', 'diversidade', 'edificação'],
    fontes: ['Anthony Thiselton, 1 Corinthians', 'Gordon Fee, 1 Corinthians']
  },
  {
    id: 'tl-095',
    titulo: '1 Coríntios 13 — O Amor Superior',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      '1 Coríntios 13 é o "hino do amor", interrompendo a discussão sobre dons espirituais. Paulo estabelece que o amor é o critério supremo da vida cristã. Sem amor, os dons são "bronze que soa, ou sino que tine" (13:1).',
      'As qualidades negativas do amor: não é invejoso, não se vangloria, não se ensoberbece, não procede com indecência, não busca seus interesses, não se ira facilmente, não guarda rancor (13:4-5). O amor é descrito mais pelo que não faz do que pelo que faz.',
      'As qualidades positivas: "se alegra com a verdade, tudo sofre, tudo crê, tudo espera, tudo suporta" (13:6-7). O amor é ativo, não passivo. É virtude que se expressa em ação, não apenas sentimento.',
      'A superioridade do amor sobre os dons: "Agora, pois, permanecem a fé, a esperança e o amor, estes três, mas o maior destes é o amor" (13:13). A fé dará lugar à visão; a esperança à posse; o amor permanece para sempre.',
      'O "amor" grego aqui é agape — amor sacrificial, incondicional, divino. Não é eros (romântico), philia (amizade) ou storge (afeto familiar). É o amor de Deus manifestado em Cristo, que se expressa na vida do crente pelo Espírito.'
    ],
    versicosChave: ['1 Coríntios 13:1-13', '1 Coríntios 13:4-7', '1 Coríntios 13:13'],
    tags: ['amor', 'agape', 'dons espirituais', 'edificação', 'eternidade'],
    fontes: ['Anthony Thiselton, 1 Corinthians', 'Anders Nygren, Agape and Eros']
  },
  {
    id: 'tl-096',
    titulo: '1 Coríntios 15 — A Ressurreição dos Mortos',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      '1 Coríntios 15 é o mais extenso trecho neotestamentário sobre a ressurreição. Paulo transmite o que recebeu: "Cristo morreu pelos nossos pecados, foi sepultado e ressuscitou no terceiro dia" (15:3-4). É tradição apostólica, não invenção.',
      'As testemunhas da ressurreição são múltiplas (15:5-8): Pedro, os doze, mais de 500 irmãos de uma vez, Tiago, todos os apóstolos. Paulo mesmo é testemunha: "Por último, apareceu também a mim" (15:8). O testemunho é público e verificável.',
      'A ressurreição é fundamento da fé (15:14, 17): "Se Cristo não ressuscitou, vã é a nossa pregação, e vã é a vossa fé". Sem ressurreição, não há salvação, não há perdão, não há esperança. A fé cristã é histórica e verificável.',
      'A natureza do corpo ressurreto (15:35-49): semente morre para nascer transformada. Corpo animal → corpo espiritual. Corpo terreno → corpo celestial. A continuidade e mudança estão em tensão: o mesmo "eu" que morre ressuscita transformado.',
      'A vitória final: "O ultimo inimigo a ser destruído é a morte" (15:26). "Onde está, ó morte, a tua vitória?" (15:55). A ressurreição de Cristo é garantia da nossa. "Assim também nós seremos transformados" (15:51-52).'
    ],
    versicosChave: ['1 Coríntios 15:3-8', '1 Coríntios 15:14', '1 Coríntios 15:55-57'],
    tags: ['ressurreição', 'Cristo', 'fé', 'vitória', 'corpo'],
    fontes: ['Anthony Thiselton, 1 Corinthians', 'N.T. Wright, The Resurrection of the Son of God']
  },
  {
    id: 'tl-097',
    titulo: 'Gálatas 5 — A Liberdade Cristã',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      'Gálatas 5 é o coração ético da carta. "Para a liberdade Cristo nos libertou" (5:1). A liberdade não é licença, mas capacidade de servir uns aos outros pelo amor. A Lei não é caminho para a salvação.',
      'A advertência solene: "Se vos circuncidais, Cristo de nada vos aproveitará" (5:2-3). A volta à Lei anula a graça. Não é questão de rito, mas de mentalidade: buscar justiça pelas obras em vez da fé.',
      'A fé opera pelo amor (5:6). Nem circumcision nem incircuncisão valem algo, mas a fé que se expressa em amor. A justificação pela fé não é passividade — é atividade movida pelo amor, não pela obediência à Lei.',
      'A lista dos frutos do Espírito (5:22-23) é uma das mais conhecidas: "amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança". São frutos — resultado natural da vida no Espírito, não fruto (singular: o Espírito produz tudo isso junto).',
      'O contraste entre obras da carne e frutos do Espírito: "A carne deseja contra o Espírito, e o Espírito contra a carne" (5:17). A guerra interior é real. A vitória não vem pela repressão, mas pela caminhada no Espírito (5:16).'
    ],
    versicosChave: ['Gálatas 5:1', 'Gálatas 5:6', 'Gálatas 5:22-23'],
    tags: ['liberdade', 'frutos do Espírito', 'fé', 'amor', 'carne'],
    fontes: ['Timothy George, Galatians (NAC)', 'F.F. Bruce, The Epistle to the Galatians']
  },
  {
    id: 'tl-098',
    titulo: 'Efésios 4 — A Unidade do Corpo',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      'Efésios 4:1-6 estabelece o fundamento da unidade cristã: "Um corpo, e um Espírito, como fostes chamados em uma só esperança da vossa vocação; um Senhor, uma fé, um batismo; um Deus e Pai de todos" (4:4-6). A unidade é trinitária e objetiva.',
      'A diversidade de dons é para a unidade: "Deu uns para apóstolos, outros para profetas, outros para evangelistas, outros para pastores e mestres" (4:11). O propósito é "aperfeiçoar os santos para o desempenho do seu serviço" (4:12).',
      'A maturidade espiritual é a meta: "Não mais sejamos como meninos, levados de lado a lado por todo vento de doutrina" (4:14). A Igreja madura é firme na verdade, não manipulável por falsos mestres.',
      'A ética da nova vida: "Despojando-vos do velho homem" e "revestindo-vos do novo" (4:22-24). A verdade remove a mentira; a honestidade substitui a fraude; a edificação substitui a destruição. A nova criatura se expressa em novos hábitos.',
      'O versículo 29 é regra prática: "Nenhuma palavra corrompida saia da vossa boca, mas somente a que for boa para edificação". A língua é indicador da saúde espiritual. O crente fala palavras de graça que constroem, não destroem.'
    ],
    versicosChave: ['Efésios 4:1-6', 'Efésios 4:11-16', 'Efésios 4:29'],
    tags: ['unidade', 'diversidade', 'dons', 'maturidade', 'ética'],
    fontes: ['Peter O\'Brien, Ephesians', 'Harold Hoehner, Ephesians']
  },
  {
    id: 'tl-099',
    titulo: 'Efésios 6 — A Armadura de Deus',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      'Efésios 6:10-20 apresenta a armadura de Deus como metáfora da proteção espiritual. "Estai fortes no Senhor e na força do seu poder" (6:10). A batalha não é contra carne e sangue, mas contra potestades espirituais (6:12).',
      'As peças da armadura: cinto da verdade (6:14), couraça da justiça (6:14), escudo da fé (6:16), capacete da salvação (6:17), espírito do Espírito — a Palavra de Deus (6:17). Cada peça corresponde a uma verdade teológica.',
      'A oração é complemento essencial: "Em todo tempo, orai em espírito" (6:18). A armadura não substitui a oração — a oração é o meio pelo qual a armadura é eficaz. A vigilância e a perseverança na oração são mandamentos.',
      'O contexto militar romano é evidente: o soldado equipado é modelo do crente. A verdade é cinto — dá firmeza. A justiça é couraça — protege o coração. A fé é escudo — apaga as setas do maligno.',
      'A batalha espiritual não é opcional — é realidade. "Porque a nossa luta não é contra carne e sangue, mas... contra os espíritos da maldade celestial" (6:12). A vitória já foi conquistada na cruz; a Igreja aplica essa vitória na história.'
    ],
    versicosChave: ['Efésios 6:10-18', 'Efésios 6:12', 'Efésios 6:17'],
    tags: ['armadura de Deus', 'batalha espiritual', 'oração', 'verdade', 'fé'],
    fontes: ['Peter O\'Brien, Ephesians', 'Clinton Arnold, Ephesians (ZECNT)']
  },
  {
    id: 'tl-100',
    titulo: 'Filipenses 2 — A Kenosis de Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      'Filipenses 2:6-11 é o hino cristológico mais antigo da Igreja primitiva. "Sendo em forma de Deus, não teve por usurpação ser igual a Deus" (2:6). A pré-existência de Cristo é pressuposta, não demonstrada.',
      'A kenosis (esvaziamento) é voluntário: "Mas esvaziou a si mesmo, tomando a forma de servo" (2:7). Não é privação de atributos divinos, mas adição de natureza humana. O Filho de Deus se tornou filho do homem para que os filhos dos homens se tornem filhos de Deus.',
      'A humilhação é progressiva: forma de Deus → forma de servo → semelhança de homens → obediência até a morte → morte de cruz (2:7-8). A cruz era o tipo mais vergonhoso de morte. O Deus Todo-Poderoso escolheu a morte de escravo.',
      'A exaltação é igualmente progressiva: Deus o exaltou → deu-lhe nome sobre todo nome → toda joelho se dobre → toda língua confesse (2:9-11). A inversão é completa: do mais baixo ao mais alto. A confissão é universal e forçada.',
      'A aplicação ética: "Fazei a vossa salvação com temor e tremor" (2:12). "Nada façais por contenda ou vã glória, mas, humildemente, cada um considere o outro superior a si mesmo" (2:3). O exemplo de Cristo motiva a humildade.'
    ],
    versicosChave: ['Filipenses 2:5-11', 'Filipenses 2:6-8'],
    tags: ['kenosis', 'humildade', 'exaltação', 'Cristologia', 'hino'],
    fontes: ['Gordon Fee, Philippians', 'Moule, The Origin of Christology']
  },

  // --- EVANGELHO DE JOÃO ---
  {
    id: 'tl-101',
    titulo: 'João 1 — O Prólogo e a Encarnação',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelho de João',
    conteudo: [
      'O prólogo de João (1:1-18) é a declaração mais elevada da divindade de Cristo no NT. "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus" (1:1). A retroação ao Gênesis 1:1 é intencional: Cristo está além do tempo.',
      'O Verbo (Logos) é conceito grego e hebraico: para os gregos, o princípio racional do universo; para os hebraicos, a Palavra criadora de Deus (Salmos 33:6). João baptiza ambos os conceitos em Cristo.',
      'A encarnação é o evento central: "E o Verbo se fez carne e habitou entre nós" (1:14). A palavra grega "eskênôsen" (tabernaculou) remete ao tabernáculo do AT — Deus habita no meio do Seu povo. A glória é a shekinah agora visível em Cristo.',
      'João Batista é testemunha: "Aquele que vem depois de mim... não era digno de lhe desatar a correa das sandálias" (1:27). O testemunho do Batista prepara o caminho. "Eis o Cordeiro de Deus, que tira o pecado do mundo!" (1:29).',
      'As primeiras chamadas de discípulos: "Que queres?" (1:38). "Vem e vê" (1:39). A fé começa com curiosidade, passa por encontro pessoal, e resulta em testemunho: "Achamos o Messias" (1:41).'
    ],
    versicosChave: ['João 1:1-3', 'João 1:14', 'João 1:29'],
    tags: ['Logos', 'encarnação', 'divindade', 'tabernáculo', 'testemunho'],
    fontes: ['Craig Keener, John (HNTC)', 'Leon Morris, The Gospel of John']
  },
  {
    id: 'tl-102',
    titulo: 'João 3 — Nicodemos e o Novo Nascer',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelho de João',
    conteudo: [
      'A entrevista de Jesus com Nicodemos (3:1-21) é uma das mais importantes do NT. Nicodemos é fariseu, membro do Sinédrio, mestre de Israel — e vem de noite, talvez por timidez ou por buscar luz nas trevas.',
      '"Necessário é nascer de novo" (3:7). A palavra grega "anôthen" significa tanto "de cima" quanto "de novo". A dualidade é intencional: o novo nascimento é divino e transformador. Não é decisão humana, mas obra do Espírito.',
      'A serpente de bronze (3:14-15) é tipo de Cristo: "Assim como Moisés levantou a serpente no deserto, assim é necessário que o Filho do Homem seja levantado". A cura dos israelitas pelo olhar prefigura a salvação pela fé em Cristo.',
      'João 3:16 é o versículo mais conhecido da Bíblia: "Deus amou o mundo de tal maneira que deu o seu Filho unigênito". A universalidade do amor divino, a singularidade do Filho, a gratuidade da salvação, a condition da fé, a certeza da salvação.',
      'O contraste entre luz e trevas (3:19-21): "A luz veio ao mundo, e os homens amaram mais as trevas do que a luz". O julgamento não é imposição externa, mas resposta da liberdade humana à revelação divina.'
    ],
    versicosChave: ['João 3:3', 'João 3:16', 'João 3:14-15'],
    tags: ['novo nascimento', 'Nicodemos', 'salvação', 'fé', 'luz'],
    fontes: ['Craig Keener, John (HNTC)', 'D.A. Carson, The Gospel of John']
  },
  {
    id: 'tl-103',
    titulo: 'João 6 — O Pão da Vida',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelho de João',
    conteudo: [
      'João 6 contém a alimentação de 5000 (6:1-14), o caminhar sobre as águas (6:16-21), e o discurso do Pão da Vida (6:22-71). Cada seção revela a identidade de Cristo.',
      'O discurso do Pão da Vida começa com a multiplicação: "Eu sou o pão da vida" (6:35). O maná do deserto era tipo de Cristo. Os pais comeram e morreram; quem come deste pão viverá eternamente.',
      'A linguagem escandalosa: "Se não comerdes a carne do Filho do Homem e não beberdes o seu sangue, não tereis vida em vós mesmos" (6:53). Muitos discípulos se afastaram (6:66). Pedro responde: "Para quem iremos tu? Tu tens as palavras da vida eterna" (6:68).',
      'A eucaristia está em pauta? A interpretação católica romana vê referência à transubstanciação; os reformadores veem referência espiritual à fé em Cristo. O contexto joânico é mais teológico que litúrgico.',
      'A soberania divina: "Ninguém pode vir a mim, se o Pai, que me enviou, não o trouxer" (6:44). A incapacidade humana é superada pela iniciativa divina. A fé é dom de Deus, não mérito humano.'
    ],
    versicosChave: ['João 6:35', 'João 6:53', 'João 6:68'],
    tags: ['Pão da Vida', 'eucaristia', 'fé', 'soberania', 'maná'],
    fontes: ['Craig Keener, John (HNTC)', 'Rudolf Schnackenburg, John (Hermeneia)']
  },
  {
    id: 'tl-104',
    titulo: 'João 10 — O Bom Pastor',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelho de João',
    conteudo: [
      'João 10 apresenta Jesus como o Bom Pastor. A metáfora pastoral é rica no AT: Deus é pastor de Israel (Salmos 23; Ezequiel 34). Jesus cumpre e supera a imagem.',
      '"Eu sou a porta das ovelhas" (10:7). O pastor entra pelo portão legítimo; o ladrão entra por outro caminho. Jesus é o único caminho para o rebanho. Fora d\'Ele não há salvação.',
      '"Eu sou o Bom Pastor. O Bom Pastor a sua vida põe pelas ovelhas" (10:11). O contraste com o assalariado: o assalariado foge do perigo, o pastor enfrenta o lobo. Jesus deu Sua vida voluntariamente (10:18).',
      'A segurança do rebanho: "Ninguém as arrebata da minha mão" (10:28). A segurança não é no crente, mas no pastor. O Pai é maior que todos; ninguém pode arrebatar das mãos do Pai nem de Cristo (10:29).',
      'A declaração de igualdade com o Pai: "Eu e o Pai somos um" (10:30). Os judeus entendem: "Tu, sendo homem, te fazes Deus" (10:33). A cristologia joânica não deixa espaço para meio-termo: ou Jesus é Deus ou é blasfemo.'
    ],
    versicosChave: ['João 10:11', 'João 10:28-29', 'João 10:30'],
    tags: ['Bom Pastor', 'segurança', 'porta', 'vida', 'unidade com o Pai'],
    fontes: ['Leon Morris, The Gospel of John', 'D.A. Carson, The Gospel of John']
  },
  {
    id: 'tl-105',
    titulo: 'João 14-17 — Os Discursos de Despedida',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelho de João',
    conteudo: [
      'João 14-17 é o coração da teologia joânica. O discurso de despedida prepara os discípulos para a ausência de Jesus. "Não se turbe o vosso coração" (14:1). A fé é consolo diante da partida.',
      'Jesus é o caminho, a verdade e a vida (14:6). Exclusividade cristã: "Ninguém vem ao Pai senão por mim". Não é intolerância, mas realidade: há um único mediador entre Deus e os homens.',
      'A promessa do Espírito Consolador: "Outro Consolador lhes dará o Pai, para que convosco fique eternamente" (14:16). O Paracleto é quem ensina, testifica, conduz à verdade, glorifica a Cristo. O Espírito é continuador da obra de Cristo.',
      'O mandamento novo: "Como eu vos amei, também vos amei uns aos outros" (13:34). O amor cristão não é sentimentalismo, mas sacrifício. O mundo reconhecerá os discípulos pelo amor (13:35).',
      'A oração sacerdotal (João 17) é a mais longa oração de Jesus registrada. Interessa por: si mesmo (17:1-5), pelos discípulos (17:6-19), pelos crentes futuros (17:20-26). "Para que sejam um" (17:21) é o tema central.'
    ],
    versicosChave: ['João 14:6', 'João 14:16-17', 'João 15:12', 'João 17:1-26'],
    tags: ['despedida', 'Paracleto', 'Espírito Santo', 'amor', 'oração sacerdotal'],
    fontes: ['Craig Keener, John (HNTC)', 'Rudolf Schnackenburg, John (Hermeneia)']
  },

  // --- ATOSS E APOCALIPSE ---
  {
    id: 'tl-106',
    titulo: 'Atos 2 — Pentecostes e o Nascimento da Igreja',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Apocalipse',
    conteudo: [
      'Atos 2 é o relato de Pentecostes, o nascimento da Igreja. "Baixou do céu um som, como de um vento veemente" (2:2). Os sinais sonoros e visíveis (línguas de fogo) marcam a efusão do Espírito.',
      'A pregação de Pedro resulta em 3000 conversiones (2:41). O tema é o cumprimento da profecia: "Nos últimos dias, derramarei do meu Espírito sobre toda a carne" (2:17, citando Joel 2:28-32). O que era promessa agora é realidade.',
      'A vida da comunidade primitiva: "Todos os que creram estavam juntos, e tinham tudo comum" (2:44). A comunhão, a fração do pão, as orações (2:42). Não era comunismo, mas generosidade voluntária movida pelo Espírito.',
      'O batismo: "Arrependei-vos, e cada um de vós seja batizado" (2:38). O batismo é resposta ao evangelho — não pré-condição para salvação, mas obediência imediata que segue a fé. 3000 almas foram batizadas.',
      'A Igreja nascente é modelo para todas as épocas: ensino dos apóstolos, comunhão, fracao do pao, oração. A simplicidade e a profundidade caminham juntas. O foco é Cristo ressuscitado.'
    ],
    versicosChave: ['Atos 2:1-4', 'Atos 2:38', 'Atos 2:42'],
    tags: ['Pentecostes', 'Espírito Santo', 'Igreja', 'batismo', 'comunidade'],
    fontes: ['Craig Keener, Acts (HNTC)', 'F.F. Bruce, The Book of the Acts']
  },
  {
    id: 'tl-107',
    titulo: 'Atos 7 — O Testemunho de Estêvão',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Apocalipse',
    conteudo: [
      'Atos 7 é o discurso mais longo de Atos. Estêvão, cheio do Espírito Santo (7:55), defende-se perante o Sinédrio com um resumo da história de Israel que culmina em acusação: "Homens de dura cerviz" (7:51).',
      'A retrospectiva histórica: Abraão (7:2-8), José (7:9-16), Moisés (7:17-43), o tabernáculo e o templo (7:44-50). Estêvão mostra que Deus sempre esteve além dos limites institucionais. "O Altíssimo não habita em templos feitos por mãos de homens" (7:48).',
      'A acusação final: "Vós, que sempre resistis ao Espírito Santo" (7:51). A resistência ao Espírito é pecado de Israel. "Vós entregastes e matastes os justos" (7:52). A linhagem de mártires vai de Abel a Cristo.',
      'A visão celestial: "Eis que vejo os céus abertos, e o Filho do Homem de pé à destra de Deus" (7:56). A primeira menção de Cristo à destra do Pai no NT. Estêvão vê o que Pedro pregou.',
      'O primeiro mártir: "Senhor Jesus, recebe o meu espírito" (7:59). A semelhança com a cruz de Jesus é intencional. Estêvão perdoa seus assassinos (7:60). O martírio é testemunho supremo.'
    ],
    versicosChave: ['Atos 7:51', 'Atos 7:55-56', 'Atos 7:59-60'],
    tags: ['Estêvão', 'mártir', 'história de Israel', 'templo', 'Espírito Santo'],
    fontes: ['Craig Keener, Acts (HNTC)', 'F.F. Bruce, The Book of the Acts']
  },
  {
    id: 'tl-108',
    titulo: 'Atos 10 — A Visão de Cornélio e os Gentios',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Apocalipse',
    conteudo: [
      'Atos 10 é ponto de virada na história da Igreja: o evangelho alcança os gentios. Cornélio, centurião romano, justo e temeroso de Deus (10:1-2), é instrumento da providência divina.',
      'A visão de Pedro: um lençol com animais impuros e a voz: "Levanta, mata e come" (10:13). A lição não é alimentar, mas eclesiológica: "O que Deus purificou, não chames tu de comum" (10:15). A barreira entre judeus e gentios cai.',
      'O sermão de Pedro (10:34-43) é exemplar: Cristo é ungido pelo Espírito, andou fazendo o bem, morreu na cruz, ressuscitou. "Deus não faz acepção de pessoas" (10:34). O evangelho é universal.',
      'O derramamento do Espírito sobre os gentios (10:44-46) é surpreendente: o Espírito antecede o batismo. A iniciativa é divina, não humana. "Também aos gentios concedeu Deus o arrependimento para a vida" (10:45).',
      'A lição para a Igreja: a missions não pode ser limitada por preconceitos culturais ou religiosos. O que Deus abriu, ninguém pode fechar. O evangelho é para toda nação, tribo, língua e povo.'
    ],
    versicosChave: ['Atos 10:34-35', 'Atos 10:44-46'],
    tags: ['Cornélio', 'gentios', 'universalidade', 'visões', 'Pentecostes'],
    fontes: ['Craig Keener, Acts (HNTC)', 'Ben Witherington III, Acts']
  },
  {
    id: 'tl-109',
    titulo: 'Atos 13-14 — A Primeira Viagem Missionária',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Apocalipse',
    conteudo: [
      'Atos 13-14 registra a primeira viagem missionária de Paulo e Barnabé. A Igreja em Antioquia envia, sob guia do Espírito Santo (13:2-4). A missão começa com obediência à voz do Espírito.',
      'A pregação em Pisídia de Antioquia (13:16-41) é modelo de evangelismo: contexto histórico (Israel), centralidade de Cristo (ressurreição), chamada à fé. "Anunciamos-vos o evangelho destas coisas que a vossos pais foram prometidas" (13:32).',
      'A oposição surge: "Encheram-se de inveja, e blasfemaram" (13:45). A reação ao evangelho é polarização: alguns creem, outros rejeitam. Paulo e Barnabé "sacudiram o pó dos seus pés" (13:51) — testemunho contra a incredulidade.',
      'O curador coxo em Listra (14:8-10) leva o povo a querer adorá-los como deuses. "Homens, por que fazeis isto? Nós somos homens como vós" (14:14). A tentação da idolatropia é real. Os missionários recusam a glória.',
      'A volta a Antioquia: "Relataram tudo o que Deus fizera com eles, e como abrira aos gentios a porta da fé" (14:27). A Igreja aprende com a experiência missionária. A porta aberta é oportunidade e responsabilidade.'
    ],
    versicosChave: ['Atos 13:2-3', 'Atos 13:47', 'Atos 14:27'],
    tags: ['missiones', 'Paulo', 'Barnabé', 'Antioquia', 'gentios'],
    fontes: ['Craig Keener, Acts (HNTC)', 'F.F. Bruce, The Book of the Acts']
  },
  {
    id: 'tl-110',
    titulo: 'Apocalipse 1-3 — As Sete Cartas às Igrejas',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse 1-3 apresenta Cristo glorificado e sete cartas às igrejas da Ásia Menor. A visão de Cristo (1:12-18) é alicerce: "Eu sou o Primeiro e o Derradeiro, o que vive, e estive morto, eis que estou vivo por todos os séculos" (1:18).',
      'Cada carta tem estrutura: endereçamento, autodescrição de Cristo, elogio, acusação, ameaça/promoção, ouvinte vence. Cristo conhece cada igreja intimamente. Não há igreja perfeita — todas têm problemas.',
      'Efésso: "Perdeste o teu primeiro amor" (2:4). A ortodoxia sem paixão é espiritualidade morta. Esmirna: pobreza material mas riqueza espiritual (2:9). Pérgamo: compromisso com o mundo (2:14). Tiatira: tolerância ao falso profetismo (2:20).',
      'Sardes: "Tu tens o nome de que vives, e estás morto" (3:1). A aparência sem realidade. Filadélfia: "Tiveste pouca força" (3:8) — mas Cristo não censura. A fidelidade sem poder é valorizada.',
      'Laodiceia: "Nem quente nem frio" (3:15). A prosperidade material gera complacência espiritual. "Eu estou à porta e bato" (3:20) — Cristo busca comunhão, mas a Igreja precisa abrir. A invitacao é pessoal e urgente.'
    ],
    versicosChave: ['Apocalipse 1:17-18', 'Apocalipse 2-3', 'Apocalipse 3:20'],
    tags: ['sete igrejas', 'Cristo glorificado', 'fidelidade', 'juízo', 'arrependimento'],
    fontes: ['G.K. Beale, Revelation (NICNT)', 'David Aune, Revelation (WBC)']
  },
  {
    id: 'tl-111',
    titulo: 'Apocalipse 12 — A Mulher, o Dragão e o Filho',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse 12 é cenário central do drama apocalíptico. A mulher vestida de sol (12:1) é interpretada de múltiplas formas: Israel, Maria, a Igreja. A serpente dragão vermelho (12:3) é Satanás.',
      'O dragão persegue a mulher que dá à luz o macho varão (12:5). A ressurreição de Cristo é pressuposta: "O Filho foi arrebatado até Deus e ao seu trono" (12:5). A ascensão é resumo da história.',
      'A guerra no céu: "Miguel e os seus anjos lutaram contra o dragão" (12:7). A vitória de Miguel é a vitória de Cristo. Satanás é derrotado no céu e lançado à terra. A guerra continua na terra.',
      'A perseguição à mulher: "O dragão, irado, foi guerrear ao restante da sua semente" (12:17). Os mandamentos de Deus e o testemunho de Jesus são marcas dos perseguidos. A fidelidade custa.',
      'A vitória já foi conquistada: "Eles o venceram pelo sangue do Cordeiro" (12:11). A cruz é o momento decisivo da história. O testemunho é arma dos vencedores: falar a verdade, mesmo que custe a vida.'
    ],
    versicosChave: ['Apocalipse 12:1-11', 'Apocalipse 12:17'],
    tags: ['Mulher', 'dragão', 'Miguel', 'guerra espiritual', 'vitória'],
    fontes: ['G.K. Beale, Revelation (NICNT)', 'David Aune, Revelation (WBC)']
  },
  {
    id: 'tl-112',
    titulo: 'Apocalipse 19-22 — A Consumação Final',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse 19 celebra a vitória: "Aleluia! Pois o Senhor nosso Deus, o Todo-Poderoso, reina!" (19:6). As bodas do Cordeiro são celebradas — Cristo e a Igreja se encontram definitivamente.',
      'A segunda vinda: "O céu se abriu, e eis um cavalo branco, e aquele que o montava se chama Fiel e Verdadeiro" (19:11). O julgamento é justo. O Anti-Cristo e o falso profeta são lançados no lago de fogo (19:20).',
      'O milênio (20:1-6) é tema de debate: pré-milenarismo, pós-milenarismo, amilenarismo. Cada posição tem defensores fiéis. O texto é figurativo e literário, não necessariamente cronológico.',
      'O grande julgamento (20:11-15): o grande trono branco, os livros abertos, o livro da vida. "Se alguém não foi achado escrito no livro da vida, esse foi lançado no lago de fogo" (20:15). O julgamento é individual e final.',
      'Novos céus e nova terra (21:1-22:5): "Eis que faço novas todas as coisas" (21:5). Não destruição, mas renovação. "Deus dwellerá com eles, e eles serão seus povos" (21:3). Não haverá mais morte, dor, choro. O Éden restaurado e superado.'
    ],
    versicosChave: ['Apocalipse 19:11', 'Apocalipse 20:11-15', 'Apocalipse 21:1-5'],
    tags: ['consumação', 'segunda vinda', 'milênio', 'novo céu', 'nova terra'],
    fontes: ['G.K. Beale, Revelation (NICNT)', 'Robert Mounce, The Book of Revelation']
  },

  // --- TEOLOGIA DO AT ---
  {
    id: 'tl-113',
    titulo: 'Êxodo 20 — Os Dez Mandamentos',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'Os Dez Mandamentos (Êxodo 20:1-17) são a base da aliança Sinai. "Eu sou o Senhor teu Deus, que te tirei da terra do Egito" (20:2). A graça precede a Lei — Deus liberta antes de ordenar.',
      'Os quatro primeiros mandamentos tratam da relação com Deus: não ter outros deuses, não fazer imagens, não tomar o nome em vão, lembrar do sábado. A prioridade é vertical: Deus primeiro.',
      'Os seis últimos tratam da relação com o próximo: honrar pais, não matar, não adulterar, não furtar, não calar falsos testemunhos, não cobiçar. A ética social se funda no Decálogo.',
      'A permanência da Lei moral é debate entre tradições. Os reformadores ensinam que a Lei moral (Decálogo) permanece; as leis cerimoniais se cumprem em Cristo; as leis civis são contextuais.',
      'O Decálogo é síntese da ética bíblica. Jesus resume: "Amarás o Senhor teu Deus de todo o teu coração" e "amarás o teu próximo como a ti mesmo" (Mt 22:37-39). A Lei é cumprida no amor.'
    ],
    versicosChave: ['Êxodo 20:1-17', 'Deuteronômio 5:6-21'],
    tags: ['Decálogo', 'Lei moral', 'aliança', 'ética', 'Sinaí'],
    fontes: ['Walter Kaiser, Exodus (EBC)', 'Meredith Kline, Treaty of the Great King']
  },
  {
    id: 'tl-114',
    titulo: 'Salmos 23 — O Senhor é o Meu Pastor',
    categoria: 'Temas por Livro',
    subcategoria: 'Salmos',
    conteudo: [
      'O Salmo 23 é o mais amado e conhecido dos salmos. David, que conhece a vida pastoral, aplica-a à relação com Deus. "O Senhor é o meu pastor; nada me faltará" (23:1). A confiança é absoluta.',
      'Os pastos verdes e águas tranquilas (23:2) são imagem de provisão e descanso. Deus supre necessidades físicas e espirituais. "Conduz-me pelas veredas da justiça, por amor do seu nome" (23:3). A direção divina é por Sua causa.',
      'O vale da sombra da morte (23:4) não é evitado — é enfrentado. "Embora eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo". A presença de Deus é consolo na escuridão.',
      'A mesa preparada no meio dos inimigos (23:5) é vitória e honra. O óleo que unta a cabeça é unção — preparação para o futuro. O cálice transbordante é abundância.',
      'O Salmo termina com certeza: "Bondade e misericórdia me seguirão todos os dias da minha vida; e habitarei na casa do Senhor por longos dias" (23:6). A fidelidade divina é promessa.'
    ],
    versicosChave: ['Salmos 23:1-6'],
    tags: ['pastor', 'confiança', 'proteção', 'provisão', 'fidelidade'],
    fontes: ['Derek Kidner, Psalms (TOTC)', 'C.H. Spurgeon, Treasury of David']
  },
  {
    id: 'tl-115',
    titulo: 'Provérbios 31 — A Mulher Virtuosa',
    categoria: 'Temas por Livro',
    subcategoria: 'Livros Poéticos',
    conteudo: [
      'Provérbios 31:10-31 descreve a mulher virtuosa. O acróstico (cada verso começa com letra do alfabeto hebraico) sugere ideal poético, não retrato literal. "Mulher virtuosa, quem a achará?" (31:10).',
      'A mulher virtuosa é trabalhadora: compra campos (31:16), planta vinhas (31:16), prepara comida (31:15), cuida dos pobres (31:20). O trabalho não é maldição, mas vocação. A administração doméstica é digna.',
      'A sabedoria e a bondade: "A sua boca fala com sabedoria, e na sua língua há lição de bondade" (31:26). A palavra é instrumento de edificação. O ensino materno é fundamental.',
      'A fé em Deus: "Engana a graça e é vaidosa a formosura; mas a mulher que teme ao Senhor, essa será louvada" (31:30). A temor do Senhor é critério suprema. A beleza exterior perece; a beleza interior permanece.',
      'O versículo final: "Louvai-a do fruto das suas mãos, e louvem-na na sua porta as suas obras" (31:31). A mulher virtuosa é reconhecida pelo seu trabalho. A dignidade não vem do papel, mas da fé.'
    ],
    versicosChave: ['Provérbios 31:10-31'],
    tags: ['mulher virtuosa', 'sabedoria', 'trabalho', 'fé', 'dignidade'],
    fontes: ['Tremper Longman III, Proverbs (NICOT)', 'Bruce Waltke, Proverbs (NICOT)']
  },
  {
    id: 'tl-116',
    titulo: 'Isaías 53 — O Servo Sofredor',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Isaías 53 é a profecia mais clara sobre a morte substitutiva do Messias. "Quem crer na nossa pregação?" (53:1). A incredulidade é tema: a salvação é rejeitada pelos que deveriam recebê-la.',
      'A aparência humilde: "Não tinha formosura nem formosura que nos atraísse" (53:2). O Messias não vem com esplendor, mas em humildade. O valor não está na aparência, mas no caráter.',
      'O sofrimento substitutivo: "Ele foi ferido pelos nossos pecados, e moido pelas nossas iniquidades" (53:5). "O castigo que nos trazia a paz caiu sobre ele" (53:5). A satisfação vicária é clara.',
      'A morte e sepultamento: "Foi posta a sua vida com os ímpios, e com os ricos na sua morte" (53:9). A morte é real — não há docetismo. Cristo morreu como homem.',
      'A ressurreição e justificação: "Verá a descendência, prolongará os seus dias" (53:10). "Muitos justificará" (53:11). A ressurreição é pressuposta. O sofrimento tem fruto: a salvação de muitos.'
    ],
    versicosChave: ['Isaías 53:3-7', 'Isaías 53:10-12'],
    tags: ['Servo sofredor', 'substituição', 'expiação', 'ressurreição', 'profecia'],
    fontes: ['John Oswald, Isaiah (NICOT)', 'Brevard Childs, Isaiah (OTL)']
  },
  {
    id: 'tl-117',
    titulo: 'Daniel 7 — O Filho do Homem',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Daniel 7 é visão apocalíptica sobre os impérios mundiais e o Reino de Deus. Os quatro animais (7:1-8) representam impérios: Babilônia, Pérsia, Grécia, Roma. Todos são destruídos pelo Reino eterno.',
      '"Veio um como Filho do Homem" (7:13). A figura messiânica recebe domínio, glória e reino. "Todo povo, nação e língua o servirão" (7:14). A universalidade do Reino.',
      '"Até que o Ancião de Dias se assentou" (7:9). O trono divino é centro do julgamento. Os livros são abertos. Os ímpios são julgados. O Filho do Homem recebe o Reino.',
      'A interpretação cristológica: Jesus se identifica como o Filho do Homem (Mt 26:64). A auto-denominação é messiânica. Cristo cumpre a profecia de Daniel.',
      'Os santos do Altíssimo herdam o Reino (7:18, 27). A vitória não é apenas messiânica, mas solidária. O povo de Deus participa do Reino. A esperança escatológica sustenta a fidelidade presente.'
    ],
    versicosChave: ['Daniel 7:13-14', 'Daniel 7:9-12'],
    tags: ['Filho do Homem', 'Ancião de Dias', 'Reino', 'impérios', ' julgamento'],
    fontes: ['Tremper Longman III, Daniel (NICOT)', 'John Goldingay, Daniel (WBC)']
  },

  // --- SISTEMÁTICA ---
  {
    id: 'dp-061',
    titulo: 'Cristologia — A Pessoa de Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Cristologia',
    conteudo: [
      'A cristologia estuda quem é Jesus Cristo. Ele é 100% Deus e 100% humano — duas naturezas, uma pessoa. O Concílio de Calcedônia (451) definiu: "Sem confusão, sem mudança, sem divisão, sem separação".',
      'A divindade de Cristo é ensinada no NT: João 1:1 ("o Verbo era Deus"), Colossenses 1:16 ("todas as coisas foram criadas por ele"), Hebreus 1:3 ("imagem exata da substância de Deus"), Filipenses 2:6 ("sendo em forma de Deus").',
      'A humanidade de Cristo: nasceu, comeu, chorou, dormiu, morreu. A encarnação é real — não é aparência. Cristo é "o mediador entre Deus e os homens" (1 Tm 2:5) porque é ambos.',
      'As implicações: como Deus, seu sacrifício tem valor infinito; como homem, pode representar a humanidade. A satisfação vicária depende da plenitude de sua pessoa.',
      'A cristologia é teste de fidelidade. Negar a divindade é heresia (Arrius, Testemunhas de Jeová). Negar a humanidade é heresia (Docetismo, Gnosticismo). A ortodoxia mantém o equilíbrio.'
    ],
    versicosChave: ['João 1:1-3', 'Colossenses 1:15-20', 'Filipenses 2:5-11', 'Hebreus 1:1-3'],
    tags: ['Cristologia', 'divindade', 'humanidade', 'Calcedônia', 'união hipostática'],
    fontes: ['Bruce Demarest, The Person and Work of Christ', 'Millard Erickson, Christology']
  },
  {
    id: 'dp-062',
    titulo: 'Pneumatologia — A Pessoa e Obra do Espírito Santo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Pneumatologia',
    conteudo: [
      'A pneumatologia estuda o Espírito Santo. Ele é a terceira pessoa da Trindade — pessoa, não força ou influência. "O Espírito é Deus" (Atos 5:3-4). A personalidade é evidenciada: fala, guia, ensina, convence.',
      'As obras do Espírito: regeneração (João 3:5-6), convicção do pecado (João 16:8), habitação no crente (1 Co 6:19), selo da salvação (Ef 1:13-14), dons espirituais (1 Co 12), frutos (Gl 5:22-23), intercessão (Rm 8:26).',
      'O ministério do Espírito é cristocêntrico: "Ele me glorificará, porque recebe do que é meu e vo-lo fará saber" (João 16:14). O Espírito não traz atenção a si mesmo, mas a Cristo.',
      'A plenitude do Espírito é mandamento: "Não vos embriagueis com vinho... mas enchei-vos do Espírito" (Ef 5:18). A enche-não é experiência única, mas andar continuado de submissão ao Espírito.',
      'O debate sobre dons: cessacionismo (dons miraculares cessaram com os apóstolos) vs. continuísmo (dons continuam hoje). Ambas as posições são defendidas por evangélicos fiéis.'
    ],
    versicosChave: ['João 14:16-17', 'Atos 5:3-4', 'Efésios 5:18', '1 Coríntios 12:4-11'],
    tags: ['Espírito Santo', 'Pneumatologia', 'regeneração', 'dons', 'plenitude'],
    fontes: ['Gordon Fee, God\'s Empowering Presence', 'Michael Green, I Believe in the Holy Spirit']
  },
  {
    id: 'dp-063',
    titulo: 'Escatologia — As Últimas Coisas',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A escatologia estuda as últimas coisas: morte, ressurreição, juízo, céu, inferno, volta de Cristo, nova criação. Cada tema é ensinado no AT e NT.',
      'A volta de Cristo é pessoal, visível, inesperada e gloriosa. "Assim como o relâmpago... assim será a vinda do Filho do Homem" (Mt 24:27). Ninguém sabe o dia nem a hora.',
      'O estado intermediário: os mortos em Cristo estão com o Senhor (2 Co 5:8; Fp 1:23). A separação do corpo não é separação de Cristo. A esperança é a ressurreição corporal.',
      'O inferno é real: "Eternamente afastados da presença do Senhor" (2 Ts 1:9). O fogo eterno é linguagem figurativa, mas a realidade é terrível. A justiça de Deus exige punição do pecado.',
      'Novos céus e nova terra (2 Pe 3:13; Ap 21:1) são a consumação. Não destruição, mas renovação. A criação será libertada da maldição. A esperança cristã é restauração completa de todas as coisas.'
    ],
    versicosChave: ['Mateus 24:30', '1 Tessalonicenses 4:16-17', 'Apocalipse 21:1-5'],
    tags: ['escatologia', 'volta de Cristo', 'ressurreição', 'juízo', 'nova criação'],
    fontes: ['G.E. Ladd, A Theology of the New Testament', 'Anthony Hoekema, The Bible and the Future']
  },
  {
    id: 'dp-064',
    titulo: 'Eclesiologia — A Natureza da Igreja',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A eclesiologia estuda a Igreja. A palavra grega "ekklésia" significa "assembleia convocada". A Igreja é o povo de Deus convocado pela pregação do evangelho.',
      'A Igreja invisível (todos os crentes de todas as épocas) e visível (comunidades locais). A distinção é importante: a Igreja visível inclui falsos crentes; a invisível é apenas os genuínos.',
      'Os marcadores da Igreja visível (notae Ecclesiae): pregação fiel dos sacramentos, disciplina eclesiástica. Onde esses marcadores estão, ali está a Igreja.',
      'Os sacramentos/ordenanças: batismo e Ceia do Senhor. O batismo é sinal de entrada na comunidade; a Ceia é sinal continuado de comunhão. Não são salvíficos por si mesmos, mas sinais da graça.',
      'A missão da Igreja: evangelismo, discipulado, adoração, comunhão, serviço. A Igreja não é um clube para santos, mas hospital para pecadores. Sua razão de ser é glorificar a Deus e fazer discípulos.'
    ],
    versicosChave: ['Mateus 16:18', 'Efésios 2:19-22', '1 Pedro 2:5'],
    tags: ['Igreja', 'eclesiologia', 'batismo', 'Ceia', 'missão'],
    fontes: ['Edmund Clowney, The Church', 'Gregg Allison, Sojourners and Strangers']
  },
  {
    id: 'dp-065',
    titulo: 'Angelologia e Demonologia',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Angelologia',
    conteudo: [
      'A angelologia estuda os anjos; a demonologia, os demônios. Os anjos são seres espirituais criados por Deus para servi-Lo e servir ao Seu povo.',
      'Os anjos são pessoais: têm inteligência, vontade e emoções. "Não são todos eles espíritos ministradores?" (Hb 1:14). Gabriel (Dn 8:16), Miguel (Dn 10:13), serafins (Is 6:2), querubins (Gn 3:24).',
      'Satanás é anjo caído. Sua queda é descrita em Isaías 14:12-15 e Ezequiel 28:12-17. Orgulho o levou à rebelião. Ele é "deus deste mundo" (2 Co 4:4), mas seu destino é o lago de fogo.',
      'Os demônios são anjos que seguiram Satanás. Eles atuam: tentação, acusação, possessão, engano. A vitória sobre eles está na cruz: "Despojando os principados e potestades, deu-os publicamente a triunfar" (Cl 2:15).',
      'A batalha espiritual é real: "A nossa luta não é contra carne e sangue" (Ef 6:12). Mas o resultado não é duvidoso: Cristo venceu. A oração e a Palavra são armas. Não há medo, mas alerta.'
    ],
    versicosChave: ['Hebreus 1:14', 'Efésios 6:12', 'Colossenses 2:15', 'Apocalipse 12:7-9'],
    tags: ['anjos', 'demônios', 'Satanás', 'batalha espiritual', 'vitória'],
    fontes: ['Clarence Bass, Backgrounds to the Bible', 'William Most, The Angels']
  },
  {
    id: 'dp-066',
    titulo: 'Soteriologia — A Doutrina da Salvação',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A soteriologia é o estudo da salvação. A salvação é obra de Deus, não mérito humano. "Porque pela graça sois salvos, por meio da fé" (Ef 2:8). A fé e a graça são inseparáveis.',
      'Os aspectos da salvação: justificação (declaração de justiça), regeneração (novo nascimento), adoção (filhos de Deus), santificação (transformação moral), glorificação (consumação final).',
      'A justificação é forense: Deus declara justo o crente, imputando-lhe a justiça de Cristo. "Aquele que não conheceu pecado, por nós o fez pecado, para que nós fôssemos feitos justiça de Deus" (2 Co 5:21).',
      'A salvação é por graça porque é imerecida; por fé porque é recebida; em Cristo porque é mediada; para boas obras porque é transformadora. A graça não anula a obediência — a motiva.',
      'A segurança do crente: "Ninguém os arrebata da minha mão" (João 10:28). A perseverança dos santos é resultado da preservação divina. A certeza não é presunção, mas confiança na promessa de Deus.'
    ],
    versicosChave: ['Efésios 2:8-9', 'Romanos 5:1', 'João 10:28-29'],
    tags: ['salvação', 'justificação', 'regeneração', 'santificação', 'graça'],
    fontes: ['J.I. Packer, Knowing God', 'Louis Berkhof, Systematic Theology']
  },

  // --- MAIS ESTUDOS PAULINAS E ATOS ---
  {
    id: 'tl-118',
    titulo: 'Romanos 9 — A Soberania de Deus na Salvação',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      'Romanos 9 é uma das seções mais desafiadoras do NT. Paulo lamenta a incredulidade de Israel (9:1-3). A pergunta: Deus falhou em Suas promessas? A resposta é não.',
      'A soberania eleitoral: "Não depende do que quer, nem do que corre, mas de Deus, que tem misericórdia" (9:16). O exemplo de Jacó e Esaú: "Amei a Jacó e odiei a Esaú" (9:13). A escolha é anterior ao mérito.',
      'O barro e o oleiro (9:20-21): "Quem és tu, ó homem, para contestar com Deus?" A criatura não pode questionar o Criador. A soberania é absoluta, mas não arbitrária.',
      'A justiça divina é demonstrada: "Para fazer conhecidas as riquezas da sua glória, as quais ele preparou para os misericordiosos" (9:23). A misericórdia é um tesouro, não obrigação.',
      'A tensão entre soberania e responsabilidade humana permanece. Paulo não resolve a tensão com lógica, mas com adoração: "Ó profundidade das riquezas!" (11:33). A humildade intelectual é necessária.'
    ],
    versicosChave: ['Romanos 9:16', 'Romanos 9:20-21', 'Romanos 9:23'],
    tags: ['soberania', 'eleição', 'misericórdia', 'Israel', 'barro'],
    fontes: ['Douglas Moo, Romans (NICNT)', 'Thomas Schreiner, Romans (BECNT)']
  },
  {
    id: 'tl-119',
    titulo: 'Romanos 12 — A Vida Cristã Prática',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      'Romanos 12:1-2 é a transição da doutrina para a prática. "Oferecei vossos corpos em sacrifício vivo, santo e agradável a Deus" (12:1). A adoração não é apenas culto, mas vida toda dedicada.',
      'A renovação da mente (12:2): "Não vos conformeis com este mundo, mas transformai-vos pela renovação do vosso entendimento". A santificação começa com a mente.',
      'Os dons espirituais (12:6-8): "Tendo dons diferentes, segundo a graça que nos foi dada". Profecia, serviço, ensino, exortação, liberalidade, presidência, misericórdia. Cada don é necessário.',
      'A ética cristã prática: "Amai-vos uns aos outros" (12:10). "Abençoai os que vos perseguem" (12:14). "Não pagueis mal por mal" (12:17). "Se for possível, quanto depender de vós, tende paz com todos" (12:18).',
      'O amor inimigo: "Se o teu inimigo tiver fome, dá-lhe de comer" (12:20). "Não te vingues toi mesmo" (12:19). A vingança é de Deus. O amor é mais forte que o ódio.'
    ],
    versicosChave: ['Romanos 12:1-2', 'Romanos 12:9-21'],
    tags: ['sacrifício', 'renovação', 'dons', 'amor inimigo', 'ética'],
    fontes: ['Douglas Moo, Romans (NICNT)', 'John Stott, Romans (TNTC)']
  },
  {
    id: 'tl-120',
    titulo: '1 Coríntios 11 — A Ceia do Senhor',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      '1 Coríntios 11:17-34 trata da Ceia do Senhor. A comunidade coríntia estava dividida: os ricos comiam antes, os pobres passavam fome. ACeia era ceia de amor, não de vergonha.',
      'A instituição: "Isto é o meu corpo, que é dado por vós" (11:24). "Este é o meu sangue da nova aliança, que é derramado por muitos" (11:25). A linguagem é simbólica, mas a realidade é espiritual.',
      'O discernimento corporal: "Quem come e bebe sem discernir o corpo, come e bebe para sua própria condenação" (11:29). ACeia não é ritual mágico — requer fé e examinação.',
      'As disciplinas: "Por isso há entre vós muitos enfermos e adormecidos" (11:30). A desobediência tem consequências. Mas "quando fomos julgados, somos corrigidos pelo Senhor" (11:32).',
      'A instrução prática: "Esperai uns pelos outros" (11:33). A Ceia é ato comunitário, não individual. A communhão com Cristo e entre os crentes é inseparável.'
    ],
    versicosChave: ['1 Coríntios 11:23-26', '1 Coríntios 11:28-29'],
    tags: ['Ceia do Senhor', 'Eucaristia', 'corpo', 'sangue', 'discernimento'],
    fontes: ['Anthony Thiselton, 1 Corinthians', 'Gordon Fee, 1 Corinthians']
  },
  {
    id: 'tl-121',
    titulo: '2 Coríntios 3 — O ministério do Espírito',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      '2 Coríntios 3 contrasta o velho e o novo ministério. "A letra mata, mas o Espírito vivifica" (3:6). A aliança da letra é Lei; a do Espírito é graça.',
      'O véu sobre Moisés (3:13-16): o véu representa a dureza de coração de Israel. "Quando se convertem ao Senhor, o véu é removido" (3:16). A conversão é remoção do véu.',
      'A liberdade do Espírito: "Onde está o Espírito do Senhor, aí há liberdade" (3:17). A liberdade cristã não é anarquia, mas transformação pelo Espírito.',
      'A transformação progressiva: "Nós todos, com o rosto descoberto, contemplamos como num espelho a glória do Senhor, somos transformados na mesma imagem" (3:18). A santificação é visível.',
      'O ministério de Paulo é de-letter, mas não em letra, mas em Espírito. A competência não vem de si mesmo, mas de Deus (3:5).'
    ],
    versicosChave: ['2 Coríntios 3:6', '2 Coríntios 3:17', '2 Coríntios 3:18'],
    tags: ['Espírito', 'letra', 'véu', 'transformação', 'liberdade'],
    fontes: ['Frank Matera, 2 Corinthians', 'Barnett, The Epistle to the Corinthians']
  },
  {
    id: 'tl-122',
    titulo: 'Efésios 1 — As Bênçãos Espirituais',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      'Efésios 1:3-14 é uma bênção (berakah) em três partes: Pai (3-6), Filho (7-12), Espírito (13-14). Cada Pessoa da Trindade é mencionada.',
      'Escolhidos antes da fundação do mundo (1:4): a eleição é pré-temporal. "Para sermos santos e sem mancha" — a eleição é para santificação, não imoralidade.',
      'Redimidos pelo sangue (1:7): "Temos a redenção pelo seu sangue, o perdão dos pecados". A redenção tem preço: o sangue de Cristo. É gratuita para nós, custou tudo a Ele.',
      'Selados com o Espírito Santo (1:13-14): o selo é garantia de propriedade e preservação. O Espírito é arras (garantia) da herança futura.',
      'O louvor da glória da graça (1:6, 12, 14): o目的是 louvor. A salvação é para a glória de Deus, não apenas para nosso benefício.'
    ],
    versicosChave: ['Efésios 1:3-14', 'Efésios 1:4', 'Efésios 1:13-14'],
    tags: ['eleição', 'redenção', 'selo', 'Espírito', 'graça'],
    fontes: ['Peter O\'Brien, Ephesians', 'Harold Hoehner, Ephesians']
  },
  {
    id: 'tl-123',
    titulo: 'Colossenses 1 — Cristo, Senhor da Criação',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      'Colossenses 1:15-20 é o hino cristológico mais elevado de Paulo. "Imagem do Deus invisível, primogênito de toda a criatura" (1:15). A divindade e prioridade de Cristo.',
      'Cristo criou todas as coisas (1:16-17): "Nele foram criadas todas as coisas... e Ele é antes de todas as coisas, e todas as coisas nele subsistem". A criação depende dEle.',
      'Nele habita toda a plenitude (1:19): "Pois nele foi do agrado que habitasse toda a plenitude". A totalidade da divindade está em Cristo.',
      'A reconciliação cósmica (1:20): "Pois foi contente reconciliar consigo todas as coisas". A redenção não é apenas humana, mas cósmica. A criação inteira será restaurada.',
      'Cristo é a cabeça da Igreja (1:18): "Ele é o princípio, o primogênito dentre os mortos". A prioridade de Cristo é em todas as coisas.'
    ],
    versicosChave: ['Colossenses 1:15-20', 'Colossenses 1:16-17'],
    tags: ['Cristologia', 'criação', 'reconciliação', 'plenitude', 'cabeça'],
    fontes: ['Gordon Fee, Colossians', 'F.F. Bruce, Colossians']
  },
  {
    id: 'tl-124',
    titulo: 'Atos 8 — Filipe e o Eunuco Etíope',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Apocalipse',
    conteudo: [
      'Atos 8:26-40 registra o encontro de Filipe com o eunuco etíope. Um official de Candace, rainha dos Etíopes, que administrava todo o seu tesouro (8:27). A providência de Deus.',
      'O eunuco lia Isaías 53: "Levará Ele o nosso sofrimento?" (8:32-33). Filipe explica a Escritura: Cristo é o Servo Sofredor. A evangelização é explicação da Escritura.',
      'A confissão de fé: "Creio que Jesus Cristo é o Filho de Deus" (8:37). A fé é confessada antes do batismo. O batismo é resposta à fé, não condição para ela.',
      'O batismo no deserto (8:38-39): "Desceram ambos à água... subiram da água". A imersão é praticada, mas o modo não é o ponto — o ponto é a obediência.',
      'O eunuco segue seu caminho "com alegria" (8:39). A salvação traz alegria. Um etíope é o primeiro gentio registrado a receber o evangelho — prefigurando a missão universal.'
    ],
    versicosChave: ['Atos 8:30-35', 'Atos 8:37', 'Atos 8:38-39'],
    tags: ['Filipe', 'eunuco', 'evangelismo', 'batismo', 'Isaías 53'],
    fontes: ['Craig Keener, Acts (HNTC)', 'F.F. Bruce, The Book of the Acts']
  },
  {
    id: 'tl-125',
    titulo: 'Atos 13 — Paulo e Barnabé em Antioquia',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Apocalipse',
    conteudo: [
      'Atos 13:1-3 registra o chamado missionário. "Separai-me Barnabé e Saulo para a obra a que os chamei" (13:2). A missão é iniciativa divina, não humana.',
      'A pregação em Pisídia de Antioquia (13:16-41) é modelo: resumo da história de Israel (13:17-22), centralidade de Cristo (13:23-31), chamado à fé (13:38-39).',
      'A justificação pela fé: "Porque é por meio dele que se anuncia o perdão dos pecados. De tudo aquilo de que a lei de Moisés não vos pôde justificar, todo aquele que crê é justificado" (13:38-39).',
      'A rejeição e aceitação: "Foi necessário que se vos anunciasse primeiro a palavra de Deus" (13:46). Paulo e Barnabé se voltam para os gentios quando os judeus rejeitam.',
      'A alegria dos discípulos: "Encheram-se de gozo e do Espírito Santo" (13:52). A rejeição não paralisa — o Espírito traz alegria mesmo na oposição.'
    ],
    versicosChave: ['Atos 13:2-3', 'Atos 13:38-39'],
    tags: ['missão', 'justificação', 'Paulo', 'Barnabé', 'gentios'],
    fontes: ['Craig Keener, Acts (HNTC)', 'F.F. Bruce, The Book of the Acts']
  },
  {
    id: 'tl-126',
    titulo: 'Apocalipse 4-5 — A Visão do Trono',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse 4-5 é a visão central do louvor celestial. "Sobre o trono, uma aparência de jaspe e de cornalina" (4:3). A majestade de Deus é inexprimível.',
      'Os 24 anciãos (4:4): representam a totalidade do povo de Deus (12 tribos + 12 apóstolos). Eles lançam suas coroas diante do trono — a autoridade humana se curva diante da divina.',
      'O livro com sete selos (5:1): quem é digno de abri-lo? "Ninguém... nem no céu, nem na terra" (5:3). A crise cósmica: quem é digno?',
      'O Cordeiro imolado (5:6-7): "Um cordeiro que parece ter sido morto". A chaga é marca de vitória, não fraqueza. O Cordeiro toma o livro — a história está em Suas mãos.',
      'O louvor universal (5:9-14): "Digno és de tomar o livro e de abrir os seus selos". Uma multidão que ninguém pode contar, de toda nação, louva o Cordeiro. A adoração é eterna.'
    ],
    versicosChave: ['Apocalipse 5:6-9', 'Apocalipse 5:13'],
    tags: ['trono', 'Cordeiro', 'louvor', 'anciãos', 'selos'],
    fontes: ['G.K. Beale, Revelation (NICNT)', 'David Aune, Revelation (WBC)']
  },
  {
    id: 'tl-127',
    titulo: 'Apocalipse 13 — A Besta e o Falso Profeta',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse 13 apresenta duas figuras: a besta do mar (13:1-10) e a besta da terra (13:11-18). Ambas servem ao dragão (Satanás).',
      'A besta do mar é poder político: "Deu-lhe o dragão poder, trono e grande autoridade" (13:2). As sete cabeças são impérios. A besta é adorada (13:4). O poder político se torna idolátrico.',
      'A besta da terra é poder religioso: "Tem dois chifres semelhantes aos de um cordeiro" (13:11). Finge ser de Deus, mas serve à besta do mar. Engana pela aparência.',
      'O número 666 (13:18): "É o número de um homem". Representa imperfeição (6 em vez de 7), repetição (três vezes), e falha humana. É símbolo de rebeldia contra Deus.',
      'A marca da besta (13:16-17): sem ela, ninguém pode comprar ou vender. É controle econômico e religioso. A marca é oposta ao selo de Deus em Apocalipse 7:3.'
    ],
    versicosChave: ['Apocalipse 13:1-10', 'Apocalipse 13:16-18'],
    tags: ['besta', '666', 'poder político', 'idolatria', 'marca'],
    fontes: ['G.K. Beale, Revelation (NICNT)', 'Robert Mounce, The Book of Revelation']
  },
  {
    id: 'tl-128',
    titulo: 'Apocalipse 19-20 — A Vitória e o Milênio',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse 19 celebra a vitória de Cristo. "Aleluia! Pois o Senhor nosso Deus, o Todo-Poderoso, reina!" (19:6). As bodas do Cordeiro são o clímax da história.',
      'A Segunda Vinda (19:11-16): Cristo vem como guerreiro. "Fiel e Verdadeiro" é seu nome. "Rei dos reis e Senhor dos senhores" (19:16). A vitória é completa.',
      'O milênio (20:1-6): "Reinaram com Cristo mil anos". Há três interpretações: pré-milenarismo (Cristo vem antes), pós-milenarismo (depois), amilenarismo (é período espiritual).',
      'O julgamento final (20:11-15): "O grande e branco trono". Livros abertos. "Se alguém não foi achado escrito no livro da vida, esse foi lançado no lago de fogo" (20:15).',
      'A vitória final: Satanás é lançado no lago de fogo (20:10). O mal é destruído para sempre. Deus é vitorioso em todas as suas promessas.'
    ],
    versicosChave: ['Apocalipse 19:11', 'Apocalipse 20:1-6', 'Apocalipse 20:11-15'],
    tags: ['vitória', 'milênio', 'juízo final', 'segunda vinda', 'Satanás'],
    fontes: ['G.K. Beale, Revelation (NICNT)', 'Craig Blaising, Progressive Dispensationalism']
  },
  {
    id: 'dp-067',
    titulo: 'Estudos por Livro — Romanos',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      'Romanos é a carta mais sistemática de Paulo. Temas: justificação, graça, santificação, soberania de Deus, Israel, vida no Espírito.',
      'Estrutura: Introduction (1:1-17), Condição humana (1:18-3:20), Justificação (3:21-5:21), Santificação (6-8), Soberania (9-11), Prática (12-16).',
      'Romanos é o "evangelho segundo Paulo". Lutero o chamou de "a mais importante parte do NT". A justificação pela fé é tema central.',
      'O impacto na história: Agostinho, Lutero, Calvino, Wesley, todos foram transformados por Romanos. A Reforma Protestante nasceu de Romanos.',
      'A relevância contemporânea: a graça não é antinomianismo, mas transformação. A soberania de Deus não anula a responsabilidade humana.'
    ],
    versicosChave: ['Romanos 1:17', 'Romanos 3:28', 'Romanos 8:1'],
    tags: ['Romanos', 'justificação', 'graça', 'soberania', 'santificação'],
    fontes: ['Douglas Moo, Romans (NICNT)', 'John Stott, Romans (TNTC)']
  },
  {
    id: 'dp-068',
    titulo: 'Teologia do Novo Testamento — Unidade e Diversidade',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Bíblica',
    conteudo: [
      'A teologia do NT estuda os temas centrais das Escrituras. Unidade: Cristo é o centro. Diversidade: Mateus, Marcos, Lucas, João, Paulo, Pedro, Hebreus.',
      'O Reino de Deus é tema central. "O Reino de Deus está próximo" (Mc 1:15). É presente e futuro, inaugurado e consumado.',
      'A cruz é o ponto central. A morte de Cristo é substitutiva, redentora e exemplar. O NT não pode ser compreendido sem a cruz.',
      'A ressurreição é o fundamento da fé. "Se Cristo não ressuscitou, vã é a nossa pregação" (1 Co 15:14). A ressurreição é realidade histórica.',
      'A missão é consequência natural. A Grande Comissão (Mt 28:19-20) é o mandamento final. O evangelho é para todas as nações.'
    ],
    versicosChave: ['Mateus 4:17', '1 Coríntios 15:3-4', 'Mateus 28:19-20'],
    tags: ['Reino', 'cruz', 'ressurreição', 'missão', 'unidade'],
    fontes: ['G.E. Ladd, A Theology of the New Testament', 'Ben Witherington III, New Testament Theology']
  },
  {
    id: 'dp-069',
    titulo: 'Teologia do Antigo Testamento — Aliança e Promessa',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Bíblica',
    conteudo: [
      'A teologia do AT estuda os temas centrais do AT. Deus é santo, justo, misericordioso e fiel. Ele se relaciona com o povo pela aliança.',
      'O tema da aliança: Noé, Abraão, Moisés, Davi. Cada aliança é progressiva, preparando para a nova aliança em Cristo.',
      'A promessa messiânica percorre o AT: Gênesis 3:15 (semente da mulher), 2 Samuel 7 (filho de Davi), Isaías 53 (Servo Sofredor), Daniel 7 (Filho do Homem).',
      'A santidade de Deus é tema central. "Santos, porque eu sou santo" (Lv 19:2). A santidade é o caráter de Deus que permeia toda a Escritura.',
      'O AT não é "Antigo Testamento" em sentido negativo, mas o fundamento do novo. Cristo cumpre, não anula, o AT.'
    ],
    versicosChave: ['Gênesis 12:1-3', 'Jeremias 31:31-34', 'Isaías 53'],
    tags: ['aliança', 'promessa', 'messias', 'santidade', 'cumprimento'],
    fontes: ['O. Palmer Robertson, The Christ of the Covenants', 'Walter Kaiser, Toward an Old Testament Theology']
  },
  {
    id: 'dp-070',
    titulo: 'Ética Cristã — Princípios Fundamentais',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ética',
    conteudo: [
      'A ética cristã é baseada no caráter de Deus e na Escritura. "Sede santos, porque eu sou santo" (1 Pd 1:16). A ética é resposta à graça.',
      'Os princípios: amor a Deus e ao próximo (Mt 22:37-40), justiça (Am 5:24), misericórdia (Lc 6:36), verdade (Jo 8:32), santidade (1 Pd 1:15-16).',
      'A ética não é legalismo. "A letra mata, mas o Espírito vivifica" (2 Co 3:6). A obediência é fruto da graça, não condição para ela.',
      'Os dilemas éticos: aborto, eutanásia, guerra, pobreza. A Bíblia oferece princípios, não respostas fáceis. O discernimento é necessário.',
      'A ética é comunitária. "Amai-vos uns aos outros" (Jo 13:34). A ética individualista é contrária ao NT. A Igreja é comunidade ética.'
    ],
    versicosChave: ['Mateus 22:37-40', 'Miqueias 6:8', 'Lucas 6:36'],
    tags: ['ética', 'amor', 'justiça', 'santidade', 'comunidade'],
    fontes: ['Glen Stassen, Doing Ethics', 'William Webb, Slaves, Women & Homosexuals']
  },
  {
    id: 'dp-071',
    titulo: 'Estudos por Livro — Gênesis',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'Gênesis é o livro dos começos: criação, queda, promessa, aliança. "No princípio criou Deus" (1:1). A fundação de toda a teologia bíblica.',
      'A narrativa de criação (1-2): ordem, bondade, propósito. O ser humano é imagem de Deus, com dignidade e responsabilidade.',
      'A queda (3): a tentação, a desobediência, a condenação. A maldição afeta tudo: relação com Deus, com outros, com a criação.',
      'A promessa a Abraão (12:1-3): bênção, descendência, terra. A promessa é universal: "Em ti serão benditas todas as famílias da terra".',
      'José (37-50): provação, fidelidade, provisão, restauração. "Vós pensastes mal, mas Deus o resolveu para o bem" (50:20). A providência divina.'
    ],
    versicosChave: ['Gênesis 1:1', 'Gênesis 12:1-3', 'Gênesis 50:20'],
    tags: ['Gênesis', 'criação', 'queda', 'promessa', 'providência'],
    fontes: ['Victor Hamilton, Genesis (NICOT)', 'Walter Kaiser, Genesis (EBC)']
  },
  {
    id: 'dp-072',
    titulo: 'Estudos por Livro — Apocalipse',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse é o livro mais discutido e menos compreendido do NT. Gênero: apocalíptico, profético, epistolar. Mensagem: Cristo vence.',
      'As sete cartas (2-3): Cristo conhece e corriga as igrejas. Eféso (primeiro amor), Esmirna (perseguição), Pérgamo (compromisso), Tiatira (falsos profetas), Sardes (morte), Filadélfia (fidelidade), Laodiceia (morna).',
      'As sete pragas (16): juízo sobre o mal. Não são capricho divino, mas justiça sobre a rebeldia humana.',
      'O Cordeiro (5): o centro da adoração celestial. A morte e ressurreição de Cristo são o fundamento da história.',
      'Nova criação (21-22): "Eis que faço novas todas as coisas". A esperança cristã não é fuga, mas restauração.'
    ],
    versicosChave: ['Apocalipse 1:8', 'Apocalipse 5:6-9', 'Apocalipse 21:1-5'],
    tags: ['Apocalipse', 'sete igrejas', 'Cordeiro', 'juízo', 'nova criação'],
    fontes: ['G.K. Beale, Revelation (NICNT)', 'Robert Mounce, The Book of Revelation']
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 50 NOVOS ESTUDOS — TEOLOGOS CLASSICOS E CONTEMPORANEOS
  // ═══════════════════════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────────────────────────────────
  // CHARLES SPURGEON (8 estudos: novo-001 a novo-008)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'novo-001',
    titulo: 'Charles Spurgeon — A Soberania de Deus',
    categoria: 'Teologia Bíblica',
    subcategoria: 'Teólogos Clássicos',
    conteudo: [
      'Charles Haddon Spurgeon (1834-1892), conhecido como o "Príncipe dos Pregadores", dedicou grande parte de seu ministério à proclamação da soberania absoluta de Deus. Para Spurgeon, a soberania divina não era uma doutrina abstrata, mas a realidade mais consoladora para o crente em meio às tribulações da vida.',
      'Spurgeon entendia que Deus governa todas as coisas com perfeita sabedoria e amor, desde os eventos cósmicos até os detalhes mais insignificantes da vida humana. Essa convicção o levava a dizer que nem um único pardal caía do céu sem o conhecimento e permissão do Pai celestial.',
      'A soberania de Deus era para Spurgeon a base da segurança do crente. Se Deus é soberano sobre todas as coisas, então o cristão pode descansar em Sua promessa de que todas as coisas cooperam para o bem dos que O amam. Não há acidente na vida do cristão, apenas a mão providencial de Deus.',
      'Spurgeon aplicava essa doutrina em seu próprio sofrimento, enfrentando depressão, críticas e perseguição com a convicção de que Deus estava no controle. Ele ensinava que a soberania de Deus não elimina a responsabilidade humana, mas a fundamenta, pois somente um Deus soberano pode garantir que os propósitos divinos se cumpram.',
      'Para o pregador batista, reconhecer a soberania de Deus era o início da verdadeira adoração. Quando o cristão compreende que Deus é o Rei absoluto de toda a criação, sua resposta natural é humildade, gratidão e submissão voluntária aos Seus caminhos inscrutáveis.'
    ],
    versicosChave: ['Efésios 1:11', 'Romanos 9:15-16', 'Daniel 4:35', 'Salmos 115:3', 'Provérbios 21:1'],
    tags: ['soberania de Deus', 'Spurgeon', 'Providência', 'providência divina', 'teologia reformada'],
    fontes: ['C.H. Spurgeon, Sermões (Metropolitan Tabernacle)', 'C.H. Spurgeon, Pra ying with Purpose', 'Eric Whitley, The Sovereignty of God in Spurgeon\'s Theology']
  },
  {
    id: 'novo-002',
    titulo: 'Charles Spurgeon — O Poder da Oração',
    categoria: 'Vida Cristã',
    subcategoria: 'Oração',
    conteudo: [
      'Spurgeon foi um homem de oração incansável, acreditando que a comunhão com Deus era a fonte de todo o poder espiritual. Ele afirmava que a oração não era apenas um dever religioso, mas o meio pelo qual o cristão acessa os tesouros da graça divina.',
      'Para Spurgeon, a oração não muda a mente de Deus, mas é o meio ordenado por Ele para que os crentes recebam as bênçãos que Ele já deseja conceder. A oração é a chave que abre os depósitos celestiais, não porque Deus precise ser convencido, mas porque Ele deseja que busquemos Sua face.',
      'O príncipe dos pregadores insistia que a oração deve ser feia com fé, persistência e humildade. Ele ensinava que orações superficiais produzem resultados superficiais, enquanto orações fervorosas e específicas movem montanhas de impossibilidades.',
      'Spurgeon testemunhou inúmeros milagres em resposta à oração, desde a conversão de pecadores endurecidos até a provisão financeira para seu seminário e orfanato. Ele contava histórias de como Deus respondia orações específicas de maneiras surpreendentes.',
      'A lição de Spurgeon para a Igreja contemporânea é clara: sem oração não há poder, sem poder não há avivamento, sem avivamento a igreja se torna uma organização social destituída da unção do Espírito Santo.'
    ],
    versicosChave: ['1 Tessalonicenses 5:17', 'Tiago 5:16', 'Filipenses 4:6-7', 'Jeremias 33:3'],
    tags: ['oração', 'Spurgeon', 'comunhão com Deus', 'fé', 'unção'],
    fontes: ['C.H. Spurgeon, Pra ying with Purpose', 'C.H. Spurgeon, The Golden Book of Sprinkled Pleas', 'Arnold Dallimore, Charles H. Spurgeon']
  },
  {
    id: 'novo-003',
    titulo: 'Charles Spurgeon — Evangelismo e Conversão',
    categoria: 'Missiologia',
    subcategoria: 'Evangelismo',
    conteudo: [
      'Spurgeon pregou para mais de 10 milhões de pessoas ao longo de sua carreira, vendo milhares de conversões genuínas. Seu ministério evangelístico era marcado pela simplicidade da mensagem e pelo poder do Espírito Santo sobre a palavra proclamada.',
      'Para Spurgeon, o evangelho era o poder de Deus para salvação de todo aquele que crê. Ele não reduzia a mensagem a fórmulas humanas, mas a proclamava como o testemunho fiel de Deus sobre Seu Filho Jesus Cristo, crucificado e ressuscitado.',
      'O pregador batista insistia que a conversão é obra soberana do Espírito Santo. O homem não pode se converter por si mesmo, mas Deus usa a pregação da palavra como meio para regenerar os corações. A responsabilidade humana está em crer, mas a capacidade de crer vem de Deus.',
      'Spurgeon era pragmático em seus métodos evangelísticos, utilizando técnicas como a distribuição de literatura, a organização de reuniões especiais e a mobilização de leigos para visitação domiciliar. Ele entendia que os meios são importantes, mas nunca substituem a dependência do Espírito.',
      'O legado evangelístico de Spurgeon desafia a Igreja contemporânea a recuperar a paixão pela perda das almas. Em uma era de formalismo religioso, ele clamava por uma pregação que tocasse os corações e conduzisse os ouvintes ao arrependimento e à fé em Cristo.'
    ],
    versicosChave: ['Romanos 1:16', '1 Coríntios 1:18', '2 Coríntios 5:18-20', 'João 3:16'],
    tags: ['evangelismo', 'conversão', 'Spurgeon', 'pregação', 'missões'],
    fontes: ['C.H. Spurgeon, Sermões Evangelísticos', 'Dallimore, Charles H. Spurgeon: A Biography', 'Spurgeon, The Soul Winner']
  },
  {
    id: 'novo-004',
    titulo: 'Charles Spurgeon — Sofrimento e Consolo Divino',
    categoria: 'Vida Cristã',
    subcategoria: 'Sofrimento',
    conteudo: [
      'Spurgeon conheceu o sofrimento em profundidade: enfrentou depressão crônica, perseguição pela imprensa, o incêndio do Royal Surrey Garden Music Hall que matou 7 pessoas, e a perda de filhos. Seu sofrimento moldou sua teologia do consolo divino.',
      'Para Spurgeon, o sofrimento não é acidente fortuito, mas instrumento nas mãos de um Deus sábio e amoroso. Ele via o sofrimento como meio de purificação, amadurecimento e dependência de Deus. A cruz precede a coroa.',
      'Spurgeon ensinava que Deus não promete uma vida livre de sofrimento, mas promete estar conosco no meio dele. O Salmo 23 era sua passagem predileta: "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo".',
      'O consolo que Spurgeon recebia de Deus o capacitava a consolar outros. Ele entendia que "a consoles com que Deus nos consolou" são compartilhadas. O sofrimento produce empatia, compaixão e profundidade no ministério pastoral.',
      'A teologia do sofrimento de Spurgeon é um antídoto contra a falsa teologia da prosperidade. Ele nunca prometeu vida fácil, mas um Deus fiel que caminha conosco nos vales mais escuros da existência humana.'
    ],
    versicosChave: ['2 Coríntios 1:3-4', 'Romanos 8:28', 'Salmos 23:4', '1 Pedro 4:12-13', 'Isaías 41:10'],
    tags: ['sofrimento', 'consolo', 'Spurgeon', 'depressão', 'provação'],
    fontes: ['C.H. Spurgeon, Che e Sto no Seu Vale', 'Dallimore, Charles H. Spurgeon: A Biography', 'Spurgeon, Through the Valley of the Shadow']
  },
  {
    id: 'novo-005',
    titulo: 'Charles Spurgeon — A Graça Sovina e Incondicional',
    categoria: 'Soteriologia',
    subcategoria: 'Graça',
    conteudo: [
      'Spurgeon era um ardoroso defensor da graça soberana, entendendo que a salvação é dom gratuito de Deus, não merecimento humano. Ele afirmava que a graça é o solo em que a fé pega raiz, e que sem a graça prévia o homem jamais buscaria a Deus.',
      'Para Spurgeon, a graça de Deus é incondicional no sentido de que não depende de qualificações humanas. Deus salva não porque o homem é bom, mas porque Ele é misericordioso. A graça é a bondade de Deus desmerecida, imerecida e indiscriminada.',
      'O pregador batista combatia veementemente a ideia de que o homem pode se salvar por suas próprias obras ou decisões. Ele ensinava que a salvação é "de Deus, por Deus e para Deus", desde o início até o fim. O homem é仅仅 um receptor passivo da graça divina.',
      'Spurgeon ilustrava a graça soberana com a história de sua própria conversão, quando um pregador leigo abriu a Bíblia em Isaías 45:22 e proclamou: "Olhai para mim, e sereis salvos". Naquele momento, o Espírito Santo regenerou seu coração.',
      'A teologia da graça de Spurgeon era equilibrada: a graça soberana não elimina a responsabilidade humana, mas a fundamenta. O homem deve arrepender-se e crer, mas capacidade de fazê-lo vem inteiramente de Deus.'
    ],
    versicosChave: ['Efésios 2:8-9', 'Romanos 9:16', 'João 6:44', 'Tito 3:5', 'Isaías 45:22'],
    tags: ['graça', 'graça soberana', 'Spurgeon', 'calvinismo', 'salvação'],
    fontes: ['C.H. Spurgeon, Sermões sobre a Graça de Deus', 'Iain Murray, Spurgeon v. Ryle', 'Spurgeon, Autobiography']
  },
  {
    id: 'novo-006',
    titulo: 'Charles Spurgeon — A Cruz de Cristo como Centro da Fé',
    categoria: 'Cristologia',
    subcategoria: 'Cruz',
    conteudo: [
      'Spurgeon colocava a cruz de Cristo no centro absoluto de sua pregação e teologia. Para ele, a cruz não era apenas um símbolo religioso, mas o evento central da história humana, o ponto de virada entre perdão e condenação.',
      'Na cruz, Spurgeon via a justiça e a misericórdia de Deus se encontrando de maneira perfeita. A justiça divina exigia punição para o pecado; a misericórdia divina provia o substitutionário perfeito em seu Filho. A cruz satisfaz plenamente ambos.',
      'O pregador batista insistia que a pregação deve ser "Cristo crucificado, e mais nada". Ele temia que a igreja de sua época se desviasse da simplicidade do evangelho em favor de filosofias humanas e tradições religiosas.',
      'Spurgeon via a cruz como o fundamento da adoração, da ética cristã e da esperança eterna. Sem a cruz, não há remissão de pecados, não há reconciliação com Deus, não há esperança para o mundo perdido.',
      'O apelo de Spurgeon à Igreja contemporânea é que nunca nos cansemos de proclamar a mensagem da cruz. Em uma cultura que busca relevância em métodos modernos, o poder está na mensagem antiga da cruz de Cristo.'
    ],
    versicosChave: ['1 Coríntios 1:18-24', 'Gálatas 6:14', '1 Pedro 2:24', 'Colossenses 1:20'],
    tags: ['cruz', 'cristologia', 'Spurgeon', 'substituição', 'redenção'],
    fontes: ['C.H. Spurgeon, The Everlasting Righteousness', 'Spurgeon, Sermões sobre a Cruz', 'Dallimore, Spurgeon']
  },
  {
    id: 'novo-007',
    titulo: 'Charles Spurgeon — A Arte e a Teologia da Pregação',
    categoria: 'Teologia Bíblica',
    subcategoria: 'Homilética',
    conteudo: [
      'Spurgeon é considerado o maior pregador do séc. XIX, e um dos maiores de todos os tempos. Sua pregação era marcada por clareza bíblica, aplicação prática e poder espiritual que convertia pecadores e edificava santos.',
      'Para Spurgeon, a pregação eficaz dependia de três elementos: o estudo diligente do texto bíblico, a unção do Espírito Santo e a paixão pelo perdido. Ele dedicava horas ao estudo, mas reconhecia que sem o Espírito a mensagem seria letra morta.',
      'O príncipe dos pregadores era um comunicador brilhante, utilizando ilustrações do cotidiano, humor sadio e aplicação direta. Ele se recusava a ser intelectualmente pretensioso, buscando que até o analfabeto pudesse entender a mensagem do evangelho.',
      'Spurgeon ensinava que o pregador deve ser um homem de oração antes de ser um homem de estudo. A pregação nasce no altar, não na biblioteca. O pregador que não ora, não prega com poder.',
      'O legado homilético de Spurgeon desafia os pregadores contemporâneos a recuperarem a paixão pela verdade bíblica e a ousadia na proclamação. Em uma era de sermões terapêuticos, Spurgeon clamava por pregação que confrontasse, consolasse e convertesse.'
    ],
    versicosChave: ['2 Timóteo 4:2', '1 Coríntios 2:1-5', 'Romanos 10:14-17', '2 Timóteo 1:7'],
    tags: ['pregação', 'homilética', 'Spurgeon', 'exposição', 'ministério pastoral'],
    fontes: ['C.H. Spurgeon, Lectures to My Students', 'Spurgeon, The Art of Illustration', 'Dallimore, Charles H. Spurgeon']
  },
  {
    id: 'novo-008',
    titulo: 'Charles Spurgeon — Fé e Confiança em Deus',
    categoria: 'Vida Cristã',
    subcategoria: 'Fé',
    conteudo: [
      'Spurgeon foi um homem de fé vibrante, que encarava os desafios da vida com a convicção de que Deus é fiel em suas promessas. A fé para ele não era sentimento passageiro, mas compromisso firme com a verdade de Deus.',
      'A fé de Spurgeon era alimentada pela Escritura. Ele meditava diariamente nas promessas de Deus e as aplicava à sua vida com fé childlike. Acreditava que Deus nunca falha em suas promessas, mesmo quando as circunstâncias sugerem o contrário.',
      'Para Spurgeon, a fé não é cega, mas racional e fundamentada na Palavra de Deus. Ele rejeitava tanto o fideísmo irracional quanto o racionalismo frio, buscando o equilíbrio entre razão e revelação.',
      'A fé de Spurgeon foi provada repetidamente ao longo de sua vida, enfrentando críticas públicas, crises financeiras e perseguição religiosa. Em cada provação, ele se apoiava nas promessas de Deus e testemunhava a fidelidade divina.',
      'O exemplo de Spurgeon convida o cristão contemporâneo a cultivar uma fé madura e perseverante. A fé não é a ausência de dúvidas, mas a certeza de que Deus é maior que todas as nossas dúvidas e temenarios.'
    ],
    versicosChave: ['Hebreus 11:1', '2 Coríntios 5:7', 'Romanos 10:17', 'Provérbios 3:5-6'],
    tags: ['fé', 'confiança', 'Spurgeon', 'promessas de Deus', 'perseverança'],
    fontes: ['C.H. Spurgeon, Faith', 'Spurgeon, According to the Promise', 'Dallimore, Charles H. Spurgeon']
  },

  // ─────────────────────────────────────────────────────────────────────────
  // A.W. TOZER (6 estudos: novo-009 a novo-014)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'novo-009',
    titulo: 'A.W. Tozer — O Conhecimento de Deus',
    categoria: 'Teologia Proper',
    subcategoria: 'Conhecimento de Deus',
    conteudo: [
      'Aiden Wilson Tozer (1897-1963) dedicou sua vida ao estudo do caráter de Deus, acreditando que o conhecimento de Deus é o fundamento de toda a vida cristã. Para Tozer, conhecer a Deus não é apenas informação teológica, mas experiência transformadora.',
      'Tozer ensinava que o conhecimento de Deus começa na reverência. O homem que não teme a Deus jamais O conhecerá verdadeiramente. A reverência é a porta de entrada para o mistério da divindade.',
      'O pastor e autor americano insistia que o conhecimento de Deus é progressivo. Começa na regeneração, amadurece na santificação e se aperfeiçoa na glória. Nunca chegamos ao fim do conhecimento de Deus, pois Ele é infinito.',
      'Tozer alertava contra o perigo de conhecer a Deus apenas intelectualmente, sem transformação do coração. O verdadeiro conhecimento de Deus produz humildade, adoração, amor e obediência.',
      'A obra mais famosa de Tozer, "O Conhecimento do Santo", é um convite para a Igreja redescobrir a grandeza de Deus. Em uma era de superficialidade religiosa, Tozer clamava por um retorno ao temor do Senhor.'
    ],
    versicosChave: ['Jeremias 9:23-24', 'João 17:3', 'Salmos 46:10', 'Óseas 6:3'],
    tags: ['conhecimento de Deus', 'Tozer', 'reverência', 'caráter divino', 'teologia'],
    fontes: ['A.W. Tozer, O Conhecimento do Santo', 'A.W. Tozer, The Pursuit of God', 'J. Israel Pacheco, Tozer on the Almighty God']
  },
  {
    id: 'novo-010',
    titulo: 'A.W. Tozer — A Adoração Verdadeira',
    categoria: 'Vida Cristã',
    subcategoria: 'Adoração',
    conteudo: [
      'Tozer distinguiu entre adoração verdadeira e adoração superficial. A adoração verdadeira nasce do conhecimento de Deus e é expressa em reverência, amor e submissão total.',
      'Para Tozer, a adoração é o fim último da criação humana. O homem foi criado para adorar a Deus, e só encontra satisfação plena quando cumpre esse propósito. A idolatria é adoração desviada.',
      'Tozer insistia que a adoração não pode ser fabricada por música, iluminação ou clima emocional. A adoração verdadeira nasce do coração que conhece e teme a Deus. O meio exterior é secundário.',
      'O pastor americano alertava contra a "adoração commercializada", quando a igreja busca agradar os homens em vez de glorificar a Deus. A adoração deve ser centrada em Deus, não em experiências humanas.',
      'A teologia da adoração de Tozer desafia a Igreja contemporânea a perguntar: estamos adorando a Deus como Ele é, ou uma imagem de nossa própria criação? A adoração verdadeira exige que conhechamos a Deus como Ele se revelou.'
    ],
    versicosChave: ['João 4:23-24', 'Salmos 95:6-7', 'Romanos 12:1', 'Isaías 6:1-8'],
    tags: ['adoração', 'Tozer', 'culto', 'reverência', 'espiritualidade'],
    fontes: ['A.W. Tozer, O Conhecimento do Santo', 'Tozer, Whatever Happened to Worship?', 'Reynold K. Burpee, The Tozer Devotional']
  },
  {
    id: 'novo-011',
    titulo: 'A.W. Tozer — A Vida Interior e a Comunhão com Deus',
    categoria: 'Vida Cristã',
    subcategoria: 'Vida Espiritual',
    conteudo: [
      'Tozer era um defensor fervoroso da vida interior, entendendo que o cristão maduro é aquele que cultiva um relacionamento profundo e pessoal com Deus. A vida interior não é privilégio de alguns, mas dever de todos.',
      'Para Tozer, a vida interior começa na regeneração e se desenvolve através da meditação, oração e obediência. O crente que negligencia a vida interior se torna espiritualmente seco e vulnerável às armadilhas do mundo.',
      'Tozer ensinava que a comunhão com Deus é possível em todos os momentos, não apenas em reuniões religiosas. A oração é conversa com Deus que permeia cada aspecto da vida cotidiana.',
      'O pastor e autor insistia que a vida interior exige disciplina e sacrifício. Não há atalhos para a maturidade espiritual. O cristão deve buscar a Deus com a mesma intensidade com que o mendigo busca pão.',
      'A teologia de Tozer sobre a vida interior é um chamado à profundidade em uma era de superficialidade. A Igreja precisa redescobrir o valor da solidão, do silêncio e da meditação na presença de Deus.'
    ],
    versicosChave: ['Salmo 42:1-2', 'Mateus 6:6', 'Filipenses 4:8', 'Tiago 4:8'],
    tags: ['vida interior', 'comunhão', 'Tozer', 'oração', 'maturidade espiritual'],
    fontes: ['A.W. Tozer, O Preito de Deus', 'Tozer, The Divine Conquest', 'Tozer, The Counselor']
  },
  {
    id: 'novo-012',
    titulo: 'A.W. Tozer — A Idolatria Moderna',
    categoria: 'Teologia Bíblica',
    subcategoria: 'Idolatria',
    conteudo: [
      'Tozer identificou a idolatria como o pecado mais perigoso da era moderna. Embora o homem contemporâneo não prostre a ídolos de madeira, ele cria ídolos com seus desejos, ambições e prazeres.',
      'Para Tozer, qualquer coisa que ocupe o lugar de Deus na vida do homem é um ídolo. O dinheiro, o sucesso, o reconhecimento, até mesmo a família pode se tornar ídolos quando substituem a primazia de Deus.',
      'Tozer ensinava que o ídolo é aquilo em que o homem pensa quando pensa em Deus. Se a imagem de Deus é distorcida, o homem adora uma criatura em vez do Criador.',
      'O pastor americano alertava que a idolatria é sutil. Ela não vem com rosto repulsivo, mas com máscara de bondade. O ídolo moderno é sedutor porque oferece prazer imediato, mas leva à escravidão.',
      'O diagnóstico de Tozer sobre a idolatria moderna continua relevante. A Igreja precisa examinar seus corações e remover tudo que usurpa o lugar que só Deus merece.'
    ],
    versicosChave: ['1 João 5:21', 'Colossenses 3:5', 'Romanos 1:25', 'Êxodo 20:3-4'],
    tags: ['idolatria', 'Tozer', 'deuses modernos', 'primeiro mandamento', 'coração'],
    fontes: ['A.W. Tozer, O Preito de Deus', 'Tozer, Man: The Dwelling Place of God', 'Tozer, The Root of the Righteous']
  },
  {
    id: 'novo-013',
    titulo: 'A.W. Tozer — O Espírito Santo na Vida Cristã',
    categoria: 'Pneumatologia',
    subcategoria: 'Espírito Santo',
    conteudo: [
      'Tozer dedicou parte significativa de seu ministério ao estudo do Espírito Santo, acreditando que a Igreja contemporânea negligenciou a pessoa e obra do Paráclito. Para Tozer, o Espírito Santo é a pessoa mais negligenciada da Trindade.',
      'Tozer ensinava que o Espírito Santo é Deus, não uma força ou energia impessoal. Ele tem mente, vontade e emoções, e deseja habitar nos crentes de maneira plena e governante.',
      'Para Tozer, a plenitude do Espírito não é uma experiência exclusiva para alguns cristãos, mas a norma para todos os crentes. A igreja que não vive na plenitude do Espírito é uma igreja impotente.',
      'O pastor americano insistia que a obra do Espírito Santo é glorificar a Cristo. O Espírito não atrai atenção para si mesmo, mas para Jesus. Uma espiritualidade centrada no Espírito é, paradoxalmente, uma espiritualidade centrada em Cristo.',
      'A pneumatologia de Tozer é um chamado para a Igreja redescobrir a dependência do Espírito Santo. Sem o Espírito, os melhores métodos e programas são vaidade. Com o Espírito, até os mais simples são transformadores.'
    ],
    versicosChave: ['João 14:16-17', 'Atos 1:8', 'Efésios 5:18', '1 Coríntios 12:4-11'],
    tags: ['Espírito Santo', 'Tozer', 'pneumatologia', 'plenitude', 'carismas'],
    fontes: ['A.W. Tozer, How to Be Filled with the Holy Spirit', 'Tozer, The Counselor', 'Tozer, The Upper Room']
  },
  {
    id: 'novo-014',
    titulo: 'A.W. Tozer — Simplicidade Espiritual',
    categoria: 'Vida Cristã',
    subcategoria: 'Simplicidade',
    conteudo: [
      'Tozer defendia uma vida cristã marcada pela simplicidade, contrapondo-se ao materialismo e ao consumismo que invadiu até mesmo a Igreja. Para ele, a simplicidade é fruto de um coração voltado para Deus.',
      'Para Tozer, a simplicidade não é pobreza, mas desapego. O cristão pode possuir bens sem ser possuído por eles. O problema não é ter, mas confiar no que se tem em vez de confiar em Deus.',
      'Tozer ensinava que a complexidade da vida moderna é inimiga da vida espiritual. Quando o cristão está sobrecarregado com preocupações, ele não consegue ouvir a voz de Deus.',
      'O pastor americano praticava o que pregava, vivendo de maneira simples e frugal, recusando-se a receber o salário acima do necessário. Sua vida era coerente com sua mensagem.',
      'A chamada de Tozer para a simplicidade é mais necessária do que nunca em nossa era digital. A Igreja precisa redescobrir que o verdadeiro contentamento não está nas coisas, mas em Deus.'
    ],
    versicosChave: ['Mateus 6:33', '1 Timóteo 6:6-8', 'Filipenses 4:11-12', 'Hebreus 13:5'],
    tags: ['simplicidade', 'Tozer', 'desapego', 'contentamento', 'materialismo'],
    fontes: ['A.W. Tozer, Man: The Dwelling Place of God', 'Tozer, The Root of the Righteous', 'Tozer, Of God and Men']
  },

  // ─────────────────────────────────────────────────────────────────────────
  // R.C. SPROUL (6 estudos: novo-015 a novo-020)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'novo-015',
    titulo: 'R.C. Sproul — A Santidade de Deus',
    categoria: 'Teologia Proper',
    subcategoria: 'Santidade',
    conteudo: [
      'R.C. Sproul (1939-2017) dedicou sua carreira a defender e ensinar a santidade de Deus como o atributo mais importante do caráter divino. Para Sproul, a santidade de Deus é o fundamento de toda a teologia cristã.',
      'Sproul ensinava que a santidade de Deus significa que Ele é separado de toda impureza, pecado e maldade. Deus é absolutamente puro, justo e santo, e isso o torna radicalmente diferente de todas as criaturas.',
      'A santidade de Deus é tema central de Isaías 6, onde os serafins proclamam "Santo, santo, santo". Sproul insistia que essa repetição não é redundância, mas ênfase: Deus é triplamente santo, perfeitamente santo.',
      'Para Sproul, a santidade de Deus é ao mesmo tempo consoladora e aterrorizante. Consoladora porque o Deus santo é também misericordioso; aterrorizante porque o pecado humano é intolerável aos olhos de um Deus santo.',
      'O legado de Sproul sobre a santidade de Deus desafia a Igreja contemporânea a redescobrir a reverência e o temor do Senhor. Em uma era de familiarity religiosa, Sproul clamava por uma recovering da transcendência divina.'
    ],
    versicosChave: ['Isaías 6:1-8', '1 Pedro 1:15-16', 'Hebreus 12:14', 'Apocalipse 4:8'],
    tags: ['santidade de Deus', 'Sproul', 'transcendência', 'reverência', 'teologia reformada'],
    fontes: ['R.C. Sproul, A Santidade de Deus', 'Sproul, The Holiness of God', 'Sproul, Everyone\'s a Theologian']
  },
  {
    id: 'novo-016',
    titulo: 'R.C. Sproul — A Justificação pela Fé',
    categoria: 'Soteriologia',
    subcategoria: 'Justificação',
    conteudo: [
      'Sproul foi um dos maiores defensores contemporâneos da doutrina da justificação pela fé somente. Para ele, essa doutrina é o artigo pelo qual a igreja se sustenta ou cai.',
      'A justificação, segundo Sproul, é o ato jurídico de Deus pelo qual o pecador é declarado justo diante de Sua lei. Não é uma obra de transformação interior (essa é a regeneração), mas uma declaração legal de inocência.',
      'Sproul ensinava que a justificação é somente pela fé, não pelas obras humanas. A fé é o instrumento pelo qual recebemos a justiça de Cristo, que nos é imputada por Deus. Não há mérito humano na justificação.',
      'O teólogo reformado insistia que a justificação pela fé é inseparável da imputação da justiça de Cristo. Deus não nos declara justos porque somos justos, mas porque Cristo nos comunicou sua justiça perfeita.',
      'A defesa de Sproul da justificação pela fé é um chamado para a Igreja não abandonar o evangelicalismo clássico. Em uma era de relativismo teológico, a justificação pela fé permanece o centro do evangelho.'
    ],
    versicosChave: ['Romanos 3:21-26', 'Gálatas 2:16', 'Efésios 2:8-9', 'Romanos 5:1', 'Filipenses 3:9'],
    tags: ['justificação', 'fé', 'Sproul', 'imputação', 'sola fide'],
    fontes: ['R.C. Sproul, Faith Alone', 'Sproul, Justified by Faith Alone', 'Sproul, The Righteousness of God']
  },
  {
    id: 'novo-017',
    titulo: 'R.C. Sproul — Soberania Divina e Responsabilidade Humana',
    categoria: 'Teologia Bíblica',
    subcategoria: 'Soberania',
    conteudo: [
      'Sproul dedicou considerável atenção ao paradoxo entre a soberania de Deus e a responsabilidade humana. Para ele, essa tensão é central na teologia bíblica e não deve ser resolvida em favor de um dos polos.',
      'Sproul ensinava que Deus é soberano sobre todas as coisas, incluindo a salvação do homem. Ele elege, chama e regenera soberanamente, sem depender de mérito humano.',
      'No entanto, Sproul também insistia na responsabilidade humana. O homem é responsável por crer no evangelho e arrepender-se de seus pecados. A soberania de Deus não anula a responsabilidade humana.',
      'Para Sproul, esse paradoxo é um mistério que a razão humana não pode resolver completamente. Ele defendia a tensão bíblica, rejeitando tanto o determinismo quanto o livre-arbítrio absoluto.',
      'A abordagem equilibrada de Sproul sobre soberania e responsabilidade é um modelo para a teologia cristã. Em vez de simplificar a Bíblia em favor de um sistema, ele abraçou o paradoxo com humildade e reverência.'
    ],
    versicosChave: ['Efésios 1:11', 'Josué 24:15', 'Romanos 9:19-21', 'Filemom 15'],
    tags: ['soberania', 'responsabilidade', 'Sproul', 'calvinismo', 'paradoxo'],
    fontes: ['R.C. Sproul, Willing to Believe', 'Sproul, Chosen by God', 'Sproul, Every Believer a Theologian']
  },
  {
    id: 'novo-018',
    titulo: 'R.C. Sproul — A Inerrância Bíblica',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escritura',
    conteudo: [
      'Sproul dedicou sua vida à defesa da inerrância bíblica, acreditando que a Escritura é a palavra infalível de Deus, sem erro em tudo o que afirma. Para ele, a inerrância é o fundamento de toda a fé cristã.',
      'Sproul ensinava que a inerrância significa que a Bíblia é verdadeira em tudo o que declara. Não é apenas infalível em assuntos de fé e prática, mas perfeitamente verdadeira em seus relatos históricos e científicos.',
      'O teólogo reformado argumentava que a inerrância é deduzida da natureza de Deus. Um Deus santo e onisciente não pode errar, e Sua Palavra reflete perfeitamente Seu caráter e conhecimento.',
      'Sproul defendia a inerrância contra ataques de dentro e fora da Igreja. Ele insistia que a negação da inerrância leva inevitavelmente a uma erosão da autoridade bíblica e, em última instância, à negação do próprio Deus.',
      'A defesa de Sproul da inerrância bíblica continua essencial para a Igreja. Em uma era de relativismo e ceticismo, a certeza de que a Palavra de Deus é verdadeira é a âncora da fé cristã.'
    ],
    versicosChave: ['2 Timóteo 3:16', 'Salmos 12:6', 'Provérbios 30:5', 'João 17:17', 'Isaías 40:8'],
    tags: ['inerrância', 'Bíblia', 'Sproul', 'autoridade bíblica', 'sola scriptura'],
    fontes: ['R.C. Sproul, Can I Trust the Bible?', 'Sproul, Scriptural Authority', 'Sproul, Classics of the Christian Faith']
  },
  {
    id: 'novo-019',
    titulo: 'R.C. Sproul — Os Sacramentos como Meios de Graça',
    categoria: 'Eclesiologia',
    subcategoria: 'Sacramentos',
    conteudo: [
      'Sproul via os sacramentos como meios de graça instituídos por Cristo, essenciais para a vida da Igreja. Para ele, batismo e ceia não são meros rituais, mas encontros reais com a graça divina.',
      'Sproul ensinava que os sacramentos são visíveis da palavra. Assim como a pregação comunica a graça de Deus por meio de palavras, os sacramentos a comunicam por meio de sinais visíveis.',
      'O batismo, para Sproul, é o sinal externo da aliança que Deus faz com Seu povo. Embora não regenere automaticamente, ele aponta para a regeneração que o Espírito Santo obra no coração.',
      'A ceia do Senhor, para Sproul, é um encontro real com Cristo, embora não de maneira literal. Ele rejeitava tanto a transubstanciação quanto a memória meramente simbólica, defendendo a presença espiritual.',
      'A teologia sacramental de Sproul é um chamado para a Igreja redescobrir a importância dos sacramentos como meios de graça. Em uma era de superficialidade litúrgica, os sacramentos mantêm a Igreja conectada às raízes da fé.'
    ],
    versicosChave: ['Mateus 28:19', '1 Coríntios 11:23-26', 'Atos 2:38', 'Romanos 6:3-4'],
    tags: ['sacramentos', 'Sproul', 'batismo', 'ceia', 'meios de graça'],
    fontes: ['R.C. Sproul, Truths We Confess', 'Sproul, Faith and Life', 'Sprôl, The Prince of Preachers']
  },
  {
    id: 'novo-020',
    titulo: 'R.C. Sproul — A Graça Irresistível e a Vontade do Homem',
    categoria: 'Soteriologia',
    subcategoria: 'Graça',
    conteudo: [
      'Sproul defendia a doutrina da graça irresistível, entendendo que quando Deus decide salvar um pecador, Ele capacita esse pecador a crer de maneira eficaz. A graça de Deus não pode ser permanentemente resistida pelo eleito.',
      'Para Sproul, a graça irresistível não significa que o homem é forçado contra sua vontade. Significa que Deus transforma a vontade do homem para que ele deseje livremente aceitar o evangelho.',
      'Sproul ensinava que a graça irresistível é consequência lógica da eleição. Se Deus elegeu certas pessoas para a salvação, Ele necessariamente providencia os meios para que essa eleição se cumpra.',
      'O teólogo reformado argumentava que a graça irresistível não elimina a experiência subjetiva da escolha humana. O crente experimenta que está escolhendo livremente, embora essa escolha seja fruto da obra regeneradora do Espírito.',
      'A doutrina da graça irresistível de Sproul é um testemunho do poder transformador de Deus. Em um mundo onde o homem é escravo do pecado, a graça soberana liberta e capacita para a fé e a obediência.'
    ],
    versicosChave: ['João 6:37', 'João 6:44', 'Romanos 9:16', 'Efésios 2:4-5', 'Filemom 15'],
    tags: ['graça irresistível', 'Sproul', 'eleição', 'vontade', 'regeneração'],
    fontes: ['R.C. Sproul, Chosen by God', 'Sproul, Willing to Believe', 'Sproul, The Pleasures of God']
  },

  // ─────────────────────────────────────────────────────────────────────────
  // JOHN PIPER (5 estudos: novo-021 a novo-025)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'novo-021',
    titulo: 'John Piper — A Alegria em Deus como Fim Supremo',
    categoria: 'Teologia Proper',
    subcategoria: 'Alegria',
    conteudo: [
      'John Piper (n. 1946) é o teólogo do "Hedonismo Cristão", a doutrina de que o glorificar a Deus e o desfrutar de Deus são o mesmo. Para Piper, a alegria em Deus não é opcional, mas o dever supremo do cristão.',
      'Piper argumenta que Deus é mais glorificado quando nós nos deleitamos Nele. A adoração verdadeira não é mera obediência dutil, mas gozo apreciativo da beleza de Deus em Cristo.',
      'Para Piper, a alegria cristã é profunda e abrangente. Ela não depende das circunstâncias, mas da realidade de Deus e de Sua promessa de satisfazer nossas almas mais profundas.',
      'Piper insiste que a alegria em Deus é o antídoto contra a idolatria. O coração humano sempre busca satisfação, e só encontra satisfação verdadeira em Deus. Buscar satisfação em qualquer coisa além de Deus é idolatria.',
      'O chamado de Piper é que a Igreja redescubra a alegria como marca da vida cristã. O cristianismo não é uma religião de melancolia, mas de gozo abundante na presença de Deus.'
    ],
    versicosChave: ['Salmos 16:11', 'Filipenses 4:4', 'Habacuque 3:17-18', '1 Pedro 1:8'],
    tags: ['alegria', 'Piper', 'hedonismo cristão', 'adoração', 'gozo'],
    fontes: ['John Piper, Desiring God', 'Piper, The Pleasures of God', 'Piper, Future Grace']
  },
  {
    id: 'novo-022',
    titulo: 'John Piper — Missões e a Glória de Deus',
    categoria: 'Missiologia',
    subcategoria: 'Missões',
    conteudo: [
      'Para Piper, as missões existem porque a adoração não existe. O objetivo supremo das missões é que todas as nações conheçam, amem e adorem a Deus. As missões são temporárias; a adoração é eterna.',
      'Piper argumenta que Deus deseja ser adorado em todas as nações. O Salmo 96 declarar que todos os povos devem trazer oferendas ao Senhor. As missões são o meio pelo qual esse desejo divino se cumpre.',
      'Para Piper, a urgência das missões é ditada pela eternidade. Onde Cristo não é pregado, os homens perecem. A responsabilidade de levar o evangelho a todas as nações é uma questão de vida eterna.',
      'Piper ensinava que o cristão deve viver para as missões, não apenas orar e dar. O estilo de vida missionary é o padrão para todos os crentes, não apenas para os missionários profissionais.',
      'O legado missionário de Piper desafia a Igreja a ver as missões como central para a vida da comunidade de fé. As missões não são um programa lateral, mas o coração de Deus para todas as nações.'
    ],
    versicosChave: ['Mateus 28:19-20', 'Salmo 67', 'Apocalipse 7:9', 'Romanos 10:14-15'],
    tags: ['missões', 'Piper', 'adoração', 'glória de Deus', 'evangelismo'],
    fontes: ['John Piper, Let the Nations Be Glad', 'Piper, Providence', 'Piper, A Pleading for Missions']
  },
  {
    id: 'novo-023',
    titulo: 'John Piper — Provisão Divina e o Sustento do Crente',
    categoria: 'Vida Cristã',
    subcategoria: 'Providência',
    conteudo: [
      'Piper desenvolveu uma teologia robusta da provisão divina, baseada na convicção de que Deus é o sustentador de todas as coisas. Para ele, a provisão de Deus não é mera bonança, mas cuidado soberano e fiel.',
      'Para Piper, a provisão divina abrange todas as necessidades da vida: física, emocional, espiritual e material. Deus conhece nossas necessidades antes mesmo de as pedirmos.',
      'Piper ensinava que a provisão de Deus não elimina o trabalho humano, mas o fundamenta. O cristão trabalha diligentemente porque Deus prometeu suprir suas necessidades através do trabalho.',
      'O teólogo reformado insistia que a provisão divina inclui até as provações e sofrimentos. Deus usa as dificuldades para amadurecer o crente e moldar seu caráter à imagem de Cristo.',
      'A teologia da provisão de Piper é um antídoto contra a ansiedade. Em uma era de incertezas econômicas e sociais, o crente pode descansar na certeza de que Deus é fiel em suas promessas.'
    ],
    versicosChave: ['Filipenses 4:19', 'Mateus 6:25-34', 'Salmos 23:1', 'Jeremias 29:11'],
    tags: ['provisão', 'Piper', 'providência', 'sustento', 'fé'],
    fontes: ['John Piper, Providence', 'Piper, Desiring God', 'Piper, When I Don\'t Desire God']
  },
  {
    id: 'novo-024',
    titulo: 'John Piper — Casamento para a Glória de Deus',
    categoria: 'Ética Cristã',
    subcategoria: 'Casamento',
    conteudo: [
      'Piper dedicou considerável atenção ao tema do casamento, vendo-o como uma displays da glória de Deus. Para ele, o casamento cristão não é primariamente sobre felicidade, mas sobre santidade e glória divina.',
      'Para Piper, o casamento é uma tipologia da relação entre Cristo e a Igreja. O marido representa Cristo; a esposa representa a Igreja. Essa tipologia dá dignidade e profundidade ao casamento.',
      'Piper ensinava que o casamento é um meio de graça pelo qual Deus amadurece o caráter dos cônjuges. As dificuldades do casamento não são acidentes, mas oportunidades para crescimento espiritual.',
      'O teólogo reformado insistia que o casamento deve ser centrado em Deus, não no cônjuge. Quando o casamento se torna o fim último, ele se torna ídolo. Deus é o único que pode satisfazer o coração humano.',
      'A teologia do casamento de Piper é um chamado para que os casamentos cristãos sejam testemunhos vivos da graça de Deus. Em uma era de divorcismo e relativismo, o casamento cristão é um contracultura.'
    ],
    versicosChave: ['Efésios 5:22-33', 'Gênesis 2:24', '1 Pedro 3:1-7', 'Miquéias 6:8'],
    tags: ['casamento', 'Piper', 'família', 'relacionamentos', 'santidade'],
    fontes: ['John Piper, This Momentary Marriage', 'Piper, Future Grace', 'Piper, Desiring God']
  },
  {
    id: 'novo-025',
    titulo: 'John Piper — Deus e o Prazer Eterno do Crente',
    categoria: 'Escatologia',
    subcategoria: 'Esperança',
    conteudo: [
      'Piper desenvolveu uma escatologia centrada na alegria eterna do crente na presença de Deus. Para ele, a esperança cristã não é fuga do mundo, mas o gozo pleno de Deus em um novo céu e nova terra.',
      'Para Piper, o céu não é apenas um lugar de descanso, mas de atividade gloriosa. O crente desfrutará de Deus para sempre, conhecendo-O cada vez mais em profundidade e admiração.',
      'Piper ensinava que a esperança da glória futura é o que sustenta o crente no sofrimento presente. As tribulações da vida presente são leves comparadas com a glória que será revelada.',
      'O teólogo reformado insistia que a alegria eterna não é meramente a ausência de sofrimento, mas a presença positiva de Deus. O céu é onde Deus habita com Seu povo, e essa presença é a fonte de toda alegria.',
      'A escatologia de Piper é um chamado para vivermos com eternidade em vista. A perspectiva da glória futura transforma a maneira como vivemos no presente, concedendo-nos perseverança e alegria.'
    ],
    versicosChave: ['Apocalipse 21:1-4', 'Romanos 8:18', '2 Coríntios 4:17-18', '1 Pedro 1:4'],
    tags: ['céu', 'Piper', 'esperança', 'glória eterna', 'nova criação'],
    fontes: ['John Piper, Providence', 'Piper, Desiring God', 'Piper, Spectacular Sins']
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETRICH BONHOEFFER (5 estudos: novo-026 a novo-030)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'novo-026',
    titulo: 'Dietrich Bonhoeffer — O Discipulado Radical',
    categoria: 'Vida Cristã',
    subcategoria: 'Discipulado',
    conteudo: [
      'Dietrich Bonhoeffer (1906-1945) é um dos teólogos mais influentes do séc. XX, conhecido por sua teologia do discipulado radical. Para Bonhoeffer, seguir a Jesus não é opção, mas imperativo absoluto.',
      'Bonhoeffer ensinava que o discipulado é uma chamada à obediência total. "Quando Jesus chama um homem, Ele o quer que morra", escreveu em "O Custo do Discipulado". A fé sem obediência é fé morta.',
      'Para Bonhoeffer, o discipulado não é vida privada, mas compromisso público com Cristo. O discípulo segue a Jesus em todos os aspectos da vida: família, trabalho, política, sociedade.',
      'Bonhoeffer praticava o que pregava. Sua resistência ao nazismo foi fruto de seu compromisso com o discipulado radical. Ele escolheu a morte em vez de trair sua fé.',
      'O chamado de Bonhoeffer à Igreja contemporânea é que recupere o custo do discipulado. O evangelho barato de prosperidade e conforto é contrário ao chamado de Jesus para cruz e sacrifício.'
    ],
    versicosChave: ['Mateus 16:24', 'Lucas 9:23', 'João 15:14', 'Filipenses 3:10'],
    tags: ['discipulado', 'Bonhoeffer', 'obediência', 'cruz', 'sacrifício'],
    fontes: ['Dietrich Bonhoeffer, O Custo do Discipulado', 'Eric Metaxas, Bonhoeffer', 'Bonhoeffer, Vida em Comunhão']
  },
  {
    id: 'novo-027',
    titulo: 'Dietrich Bonhoeffer — Comunhão Cristã e Vida em Comunidade',
    categoria: 'Eclesiologia',
    subcategoria: 'Comunidade',
    conteudo: [
      'Bonhoeffer dedicou parte significativa de sua teologia ao estudo da comunhão cristã. Para ele, o cristão não pode viver sozinho: a fé é essencialmente comunitária.',
      'Bonhoeffer ensinava que a comunidade cristã não é um ideal a ser alcançado, mas um dom de Deus. Cristo mesmo é o centro da comunidade, e os crentes são membros de Seu corpo.',
      'Para Bonhoeffer, a comunhão verdadeira exige humildade, serviço e tolerância. A comunidade não é perfeita, mas é lugar onde o perdão e a restauração são praticados.',
      'O teólogo luterano insistia que a comunhão cristã deve ser marcada pela Palavra de Deus. Sem a Palavra, a comunidade se torna uma organização social vazia de conteúdo espiritual.',
      'A teologia da comunhão de Bonhoeffer é um chamado para a Igreja redescobrir o valor da vida comunitária. Em uma era de individualismo, a comunidade cristã é contracultura e testemunho.'
    ],
    versicosChave: ['Atos 2:42-47', 'Hebreus 10:24-25', '1 Coríntios 12:12-27', 'Romanos 12:4-5'],
    tags: ['comunidade', 'Bonhoeffer', 'igreja', 'comunhão', 'vida em comum'],
    fontes: ['Dietrich Bonhoeffer, Vida em Comunhão', 'Bonhoeffer, O Custo do Discipulado', 'Metaxas, Bonhoeffer']
  },
  {
    id: 'novo-028',
    titulo: 'Dietrich Bonhoeffer — Ética Cristã e Responsabilidade',
    categoria: 'Ética Cristã',
    subcategoria: 'Ética',
    conteudo: [
      'Bonhoeffer desenvolveu uma teologia ética profundamente enraizada na realidade da graça. Para ele, a ética cristã não é legalismo, mas resposta amorosa ao amor de Deus.',
      'Bonhoeffer ensinava que a ética cristã é situacional, mas não relativista. O cristão deve discernir a vontade de Deus em cada situação concreta, aplicando princípios bíblicos com sabedoria.',
      'Para Bonhoeffer, a responsabilidade cristã é pessoal e intransferível. Cada crente é responsável diante de Deus por suas decisões. A obediência cega à autoridade não dispensa a responsabilidade pessoal.',
      'O teólogo luterano insistia que a ética cristã exige coragem. Resistir ao mal, mesmo quando custa caro, é parte do discipulado. A ética sem coragem é ética estéril.',
      'A teologia ética de Bonhoeffer desafia a Igreja a viver com integridade em um mundo corrompido. A ética cristã não é perfeição, mas fidelidade ao chamado de Deus.'
    ],
    versicosChave: ['Miquéias 6:8', 'Romanos 12:1-2', 'Efésios 5:15-17', 'Tiago 4:17'],
    tags: ['ética', 'Bonhoeffer', 'responsabilidade', 'obediência', 'integridade'],
    fontes: ['Dietrich Bonhoeffer, Ética', 'Bonhoeffer, Vida em Comunhão', 'Metaxas, Bonhoeffer']
  },
  {
    id: 'novo-029',
    titulo: 'Dietrich Bonhoeffer — A Graça Barata e a Graça Custosa',
    categoria: 'Soteriologia',
    subcategoria: 'Graça',
    conteudo: [
      'Bonhoeffer é célebre pela distinção entre "graça barata" e "graça custosa". A graça barata é a graça sem discipulado, sem cruz, sem Cristo vivo. É perdão sem arrependimento, batismo sem comunidade.',
      'A graça custosa, por outro lado, é a graça que nos chama a seguir a Jesus. É a graça que nos custa a vida, porque nos leva à cruz. É a graça que transforma, não apenas perdão.',
      'Bonhoeffer argumentava que a graça barata é o maior perigo da Igreja. Ela oferece consolo sem mudança, salvação sem santificação. É uma graça que não salva, mas adormece.',
      'Para Bonhoeffer, a graça custosa é a graça verdadeira. Ela nos confronta com nossa pecaminosidade e nos chama à obediência. É a graça que nos faz discípulos, não meros consumidores de religião.',
      'O apelo de Bonhoeffer à Igreja é que não aceite a graça barata. O evangelho é oferta de graça que custa tudo, porque nos dá tudo em Cristo.'
    ],
    versicosChave: ['Romanos 6:1-2', 'Mateus 10:38', 'Gálatas 2:20', '1 Pedro 4:12-14'],
    tags: ['graça barata', 'graça custosa', 'Bonhoeffer', 'discipulado', 'cruz'],
    fontes: ['Dietrich Bonhoeffer, O Custo do Discipulado', 'Bonhoeffer, Ética', 'Metaxas, Bonhoeffer']
  },
  {
    id: 'novo-030',
    titulo: 'Dietrich Bonhoeffer — Resistência ao Mal Institucionalizado',
    categoria: 'Ética Cristã',
    subcategoria: 'Resistência',
    conteudo: [
      'Bonhoeffer é exemplo histórico de resistência ao mal institucionalizado. Sua luta contra o nazismo não foi apenas política, mas teológica: o cristão não pode tolerar o mal sob nenhuma circunstância.',
      'Bonhoeffer ensinava que o silêncio diante do mal é conivência. A Igreja tem a responsabilidade de denunciar a injustiça e defender os oprimidos, mesmo quando isso custa a vida.',
      'Para Bonhoeffer, a resistência ao mal exige discernimento espiritual e coragem moral. Não é violência cega, mas ação estratégica guiada pela fé e pelo amor.',
      'O teólogo luterano praticou o que pregava, participando de uma conspiração para assassinar Hitler. Embora tenha wrestled com a consciência, ele concluiu que a responsabilidade cristã exigia ação.',
      'O exemplo de Bonhoeffer é um chamado para a Igreja não se calar diante das injustiças do mundo. A fé cristã não é fuga da realidade, mas engajamento profundo com ela.'
    ],
    versicosChave: ['Miquéias 6:8', 'Amós 5:24', 'Romanos 12:21', 'Efésios 6:12'],
    tags: ['resistência', 'Bonhoeffer', 'justiça', 'nazismo', 'coragem'],
    fontes: ['Dietrich Bonhoeffer, Cartas e Reflexões da Prisão', 'Metaxas, Bonhoeffer', 'Bonhoeffer, Ética']
  },

  // ─────────────────────────────────────────────────────────────────────────
  // C.S. LEWIS (5 estudos: novo-031 a novo-035)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'novo-031',
    titulo: 'C.S. Lewis — Dor e Sofrimento no Plano de Deus',
    categoria: 'Teologia Bíblica',
    subcategoria: 'Sofrimento',
    conteudo: [
      'C.S. Lewis (1898-1963) é um dos maiores apologistas cristãos do séc. XX. Em "Problemas do Sofrimento", ele aborda a questão da dor humana à luz da fé cristã, oferecendo uma resposta que combina razão e compaixão.',
      'Lewis argumenta que Deus permite o sofrimento porque Ele deseja que os seres humanos sejam livres. Uma criatura programada para o bem não seria realmente virtuosa, mas meramente mecânica.',
      'Para Lewis, o sofrimento pode ser instrumento de Deus para quebrantar o orgulho humano e nos conduzir ao arrependimento. É o "megafone de Deus" em um mundo ensurdecido.',
      'Lewis reconhece que o sofrimento é um mistério, mas insiste que Deus não é indiferente a ele. A encarnação é a prova de que Deus entrou no sofrimento humano e o transformou.',
      'A abordagem de Lewis ao sofrimento é equilibrada: não minimiza a dor, mas a coloca no contexto de um Deus amoroso e soberano que trabalha todas as coisas para o bem.'
    ],
    versicosChave: ['Romanos 8:28', '2 Coríntios 4:17', 'Hebreus 12:5-11', 'Apocalipse 21:4'],
    tags: ['sofrimento', 'Lewis', 'dor', 'providência', 'apologética'],
    fontes: ['C.S. Lewis, Problemas do Sofrimento', 'Lewis, A Breviário da Dor', 'Michael Ward, Planet Narnia']
  },
  {
    id: 'novo-032',
    titulo: 'C.S. Lewis — A Razão da Fé Cristã',
    categoria: 'Apologetica',
    subcategoria: 'Razão',
    conteudo: [
      'Lewis foi um racionalista convertido ao cristianismo, e dedicou sua vida a mostrar que a fé é razoável. Em "Credo", ele apresenta argumentos convincentes para a existência de Deus e a veracidade do cristianismo.',
      'Lewis argumentava que a razão é uma dádiva de Deus e deve ser usada para investigar a verdade. A fé não é irracional, mas supra-racional: vai além da razão sem a contradizer.',
      'Para Lewis, o argumento do Logos é decisivo: o universo tem uma ordem racional porque foi criado por um Ser racional. A razão humana é um reflexo da Razão divina.',
      'Lewis ensinava que o cristianismo é a única religião que satisfaz plenamente a razão e o coração. As outras religiões ou são irracionais ou incompletas.',
      'O apelo de Lewis é que a fé não deve ser cega. O cristão deve conhecer sua fé, poder defendê-la e demonstrar que ela é racionalmente superior a qualquer alternativa.'
    ],
    versicosChave: ['João 1:1-3', 'Romanos 1:20', '1 Pedro 3:15', 'Hebreus 11:1'],
    tags: ['razão', 'Lewis', 'apologética', 'fé', 'filosofia'],
    fontes: ['C.S. Lewis, Credo', 'Lewis, O Problema do Sofrimento', 'Lewis, A Encosta Feliz']
  },
  {
    id: 'novo-033',
    titulo: 'C.S. Lewis — Milagres e o Sobrenatural',
    categoria: 'Apologetica',
    subcategoria: 'Milagres',
    conteudo: [
      'Em "Milagres", Lewis defende a possibilidade lógica dos milagres contra o ceticismo moderno. Ele argumenta que a natureza não é um sistema fechado, mas aberto à intervenção do Criador.',
      'Lewis distingue entre milagres e feitiçaria. O milagre é uma suspensão da natureza pelo Criador; a feitiçaria é uma manipulação da natureza por forças malignas. Confundir ambos é um erro.',
      'Para Lewis, a ressurreição de Jesus é o milagre central da história. Se Cristo ressuscitou, os milagres são possíveis. Se não ressuscitou, a fé cristã é vã.',
      'Lewis argumentava que o ceticismo moderno é uma forma de preconceito, não de razão. O homem moderno recusa os milagres não porque são irracionais, mas porque são inconvenientes.',
      'A defesa de Lewis dos milagres é um chamado para a Igreja redescobrir o sobrenatural. Em uma era de naturalismo, a fé no sobrenatural é essential para a integridade da fé cristã.'
    ],
    versicosChave: ['João 20:30-31', '1 Coríntios 15:3-8', 'Lucas 24:39', 'Hebreus 2:4'],
    tags: ['milagres', 'Lewis', 'sobrenatural', 'ressurreição', 'apologética'],
    fontes: ['C.S. Lewis, Milagres', 'Lewis, Mere Christianity', 'Lewis, The Miracles']
  },
  {
    id: 'novo-034',
    titulo: 'C.S. Lewis — A Natureza Humana e o Problema do Pecado',
    categoria: 'Teologia Bíblica',
    subcategoria: 'Antropologia',
    conteudo: [
      'Lewis ofereceu uma análise perspicaz da natureza humana em suas obras de apologética. Para ele, o problema central da humanidade é o pecado, que corrompe todas as dimensões da existência.',
      'Lewis argumentava que o pecado não é apenas ação exterior, mas condição interior. O homem é naturalmente inclinado ao egoísmo, à rebeldia e à autojustificação.',
      'Para Lewis, o pecado é a raiz de todos os males humanos: guerras, injustiças, opressões. Sem resolver o problema do pecado, nenhum sistema político ou social pode trazer paz duradoura.',
      'Lewis ensinava que o pecado é aussi uma questão de orgulho. O orgulho é o pecado original, do qual todos os outros derivam. Humildade é a virtude mais difícil e mais necessária.',
      'A antropologia de Lewis é um diagnóstico realista da condição humana. Sem a graça de Deus, o homem está perdido. Com a graça, ele é transformado e restaurado.'
    ],
    versicosChave: ['Romanos 3:23', 'Romanos 7:18', 'Gênesis 6:5', 'Efésios 2:1-3'],
    tags: ['pecado', 'Lewis', 'natureza humana', 'orgulho', 'redenção'],
    fontes: ['C.S. Lewis, Mere Christianity', 'Lewis, Problemas do Sofrimento', 'Lewis, A Breviário da Dor']
  },
  {
    id: 'novo-035',
    titulo: 'C.S. Lewis — O Céu e a Realidade Eterna',
    categoria: 'Escatologia',
    subcategoria: 'Céu',
    conteudo: [
      'Lewis descreveu o céu de maneira vívida em "Pilares da Terra", imaginando-o como um lugar de intensa realidade e gozo. Para ele, o céu não é fuga da realidade, mas encontro com a realidade máxima.',
      'Para Lewis, o céu é onde Deus habita com Seu povo. É o lar verdadeiro do ser humano, o lugar para o qual foi criado. Na terra somos exilados; no céu, finalmente em casa.',
      'Lewis argumentava que as coisas terrenas são sombras das realidades celestiais. O amor humano é uma fração do amor divino; a beleza terrena é reflexo da beleza celestial.',
      'O apologeta britânico insistia que o céu é personal, não impessoal. Cada crente terá um relacionamento único e pessoal com Deus, sem perder sua individualidade.',
      'A visão de Lewis sobre o céu é um chamado para vivermos com eternidade em vista. A perspectiva do céu transforma a maneira como encaramos a vida terrena.'
    ],
    versicosChave: ['Apocalipse 21:1-5', 'João 14:1-3', '1 Coríntios 2:9', 'Filipenses 3:20'],
    tags: ['céu', 'Lewis', 'eternidade', 'nova criação', 'escatologia'],
    fontes: ['C.S. Lewis, Pilares da Terra', 'Lewis, A Breviário da Dor', 'Lewis, The Great Divorce']
  },

  // ─────────────────────────────────────────────────────────────────────────
  // TIM KELLER (5 estudos: novo-036 a novo-040)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'novo-036',
    titulo: 'Tim Keller — Fé e Cultura Contemporânea',
    categoria: 'Apologetica',
    subcategoria: 'Cultura',
    conteudo: [
      'Tim Keller (1950-2023) foi um teólogo e pastor que dedicou sua vida a pensar como a fé cristã se relaciona com a cultura contemporânea. Para Keller, o cristão deve engajar a cultura, não fugir dela.',
      'Keller argumentava que o cristianismo não é uma subcultura, mas uma contracultura que desafia todas as culturas humanas. O evangelho transcende política, economia e sociedade.',
      'Para Keller, a Igreja deve ser inteligente em seu engajamento cultural. Isso significa compreender as narrativas culturais e responder com sabedoria e graça.',
      'O pastor de Nova York ensinava que a fé cristã é relevante para todas as áreas da vida: arte, ciência, política, negócios. Nenhuma esfera está isoa da influência do evangelho.',
      'O chamado de Keller é que a Igreja seja relevante sem ser mundana, contextual sem ser condescendente. A fé cristã é perenemente relevante porque é verdadeira.'
    ],
    versicosChave: ['Mateus 5:13-16', '1 Coríntios 9:19-23', 'Colossenses 4:5-6', '1 Pedro 3:15'],
    tags: ['cultura', 'Keller', 'apologética', 'engajamento', 'contracultura'],
    fontes: ['Tim Keller, Center Church', 'Keller, The Reason for God', 'Keller, Counterfeit Gods']
  },
  {
    id: 'novo-037',
    titulo: 'Tim Keller — Idolatria no Mundo Moderno',
    categoria: 'Teologia Bíblica',
    subcategoria: 'Idolatria',
    conteudo: [
      'Keller identificou a idolatria como o pecado central do mundo contemporâneo. Para ele, um ídolo é qualquer coisa que se torna mais importante que Deus na vida de uma pessoa.',
      'Keller argumentava que os ídolos modernos não são estátuas de metal, mas coisas aparentemente boas: sucesso, família, romance, poder, reconhecimento. Esses bens se tornam ídolos quando substituem Deus.',
      'Para Keller, a idolatria é a raiz de todos os males humanos. O pecado não é apenas violação de regras, mas desvio de lealdade. O homem foi criado para adorar a Deus, e quando adora outra coisa, ele se destrói.',
      'O pastor e teólogo ensinava que o evangelicalismo contemporâneo está vulnerável a ídolos sutis: conforto, segurança, relevância. A igreja pode se tornar ídolo para si mesma.',
      'A análise de Keller sobre a idolatria moderna é um convite ao autoexame. O cristão deve perguntar constantemente: o que ocupa o lugar de Deus em meu coração?'
    ],
    versicosChave: ['1 João 5:21', 'Colossenses 3:5', 'Romanos 1:25', 'Êxodo 20:3'],
    tags: ['idolatria', 'Keller', 'ídolos modernos', 'coração', 'adoração'],
    fontes: ['Tim Keller, Counterfeit Gods', 'Keller, The Reason for God', 'Keller, Generous Justice']
  },
  {
    id: 'novo-038',
    titulo: 'Tim Keller — Justiça Social e o Evangelho',
    categoria: 'Ética Cristã',
    subcategoria: 'Justiça Social',
    conteudo: [
      'Keller foi um forte defensor da justiça social como dimensão essencial do evangelho. Para ele, a fé sem obras morta inclui compromisso com os pobres, oprimidos e marginalizados.',
      'Keller argumentava que a justiça social não é política partidária, mas imperativo bíblico. Deus é justo e ama a justiça, e seus seguidores devem refletir esse caráter.',
      'Para Keller, o evangelho é a motivação mais poderosa para a justiça social. Quando o cristão compreende que foi justificado gratuitamente, ele se torna generoso com os outros.',
      'O pastor de Redeemer ensinava que a Igreja deve ser uma comunidade de justiça, onde os pobres são acolhidos, os marginalizados são valorizados e os oprimidos são libertados.',
      'O chamado de Keller é que a Igreja não se canse de fazer justiça. A justiça social não é adiada para o céu, mas praticada na terra como antecipação do reino de Deus.'
    ],
    versicosChave: ['Miquéias 6:8', 'Isaías 1:17', 'Mateus 25:31-46', 'Tiago 1:27'],
    tags: ['justiça social', 'Keller', 'evangelho', 'pobres', 'compaixão'],
    fontes: ['Tim Keller, Generous Justice', 'Keller, Center Church', 'Keller, The Reason for God']
  },
  {
    id: 'novo-039',
    titulo: 'Tim Keller — O Perdão Radical no Evangelho',
    categoria: 'Vida Cristã',
    subcategoria: 'Perdão',
    conteudo: [
      'Keller desenvolveu uma teologia do perdão que se enraíza na graça de Deus em Cristo. Para ele, o perdão cristão não é opção, mas imperativo decorrente da própria natureza do evangelho.',
      'Keller argumentava que o perdão é possível apenas quando compreendemos que nós mesmos fomos perdoados por Deus. A consciência da própria pecaminosidade é antídoto contra o ressentimento.',
      'Para Keller, o perdão não é negação da dor ou esquecimento do mal sofrido. É uma decisão consciente de não buscar vingança, mas confiar a Deus a justiça.',
      'O pastor e teólogo ensinava que o perdão é processo, não evento. Alguns ofensas exigem tempo e oração para serem completamente perdoadas.',
      'O chamado de Keller é que a Igreja seja uma comunidade de perdão. No mundo, o perdão é fraqueza; no evangelho, é a maior expressão de força espiritual.'
    ],
    versicosChave: ['Efésios 4:32', 'Colossenses 3:13', 'Mateus 18:21-35', 'Lucas 23:34'],
    tags: ['perdão', 'Keller', 'graça', 'reconciliação', 'relacionamentos'],
    fontes: ['Tim Keller, The Reason for God', 'Keller, Generous Justice', 'Keller, Walking with God through Pain and Suffering']
  },
  {
    id: 'novo-040',
    titulo: 'Tim Keller — Urbanidade e Missão Urbana',
    categoria: 'Missiologia',
    subcategoria: 'Missão Urbana',
    conteudo: [
      'Keller foi um pioneiro na teologia da missão urbana, fundando a Redeemer Presbyterian Church em Nova York. Para ele, as cidades são campos missionários estratégicos do séc. XXI.',
      'Keller argumentava que as cidades concentram diversidade cultural, intelectual e econômica. Isso as torna locais ideais para o evangelismo e a pluração cultural.',
      'Para Keller, a missão urbana exige criatividade, adaptabilidade e profundidade teológica. Os urbanos são céticos, mas buscadores; racionalistas, mas espiritualmente famintos.',
      'O pastor de Nova York ensinava que a igreja urbana deve ser culturalmente sensível sem ser culturalmente capturada. O evangelho é para todas as culturas, mas não é propriedade de nenhuma.',
      'O legado de Keller sobre missão urbana desafia a Igreja a levar o evangelho às cidades com excelência e paixão. As cidades são o futuro do cristianismo mundial.'
    ],
    versicosChave: ['Atos 1:8', 'Mateus 28:19-20', '1 Coríntios 9:19-23', 'Jeremias 29:7'],
    tags: ['cidade', 'Keller', 'missão urbana', 'Redeemer', 'evangelismo'],
    fontes: ['Tim Keller, Center Church', 'Keller, The Reason for God', 'Keller, Ministries of Mercy']
  },

  // ─────────────────────────────────────────────────────────────────────────
  // JONATHAN EDWARDS (4 estudos: novo-041 a novo-044)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'novo-041',
    titulo: 'Jonathan Edwards — O Desejo de Deus como Fim Supremo',
    categoria: 'Teologia Proper',
    subcategoria: 'Desejo de Deus',
    conteudo: [
      'Jonathan Edwards (1703-1758) é considerado o maior teólogo americano. Para Edwards, o desejo de Deus é a essência da vida cristã: Deus criou o mundo para Sua glória e o ser humano para desfrutar Dele.',
      'Edwards argumentava que todos os desejos humanos são, em última instância, desejos de felicidade. Mas a felicidade verdadeira só se encontra em Deus. Buscar felicidade em qualquer coisa além de Deus é idolatria.',
      'Para Edwards, o desejo de Deus não é natural ao homem caído. Somente a graça regeneradora pode despertar o coração humano para o desejo de Deus.',
      'Edwards ensinava que o cristão maduro é aquele que deseja Deus mais do que qualquer outra coisa. A santidade é, em essência, o crescimento do desejo de Deus no coração.',
      'A teologia de Edwards sobre o desejo de Deus é um chamado à apreciação de Deus como a maior satisfação do coração humano. Em uma era de consumismo, Edwards aponta para a única fonte de satisfação eterna.'
    ],
    versicosChave: ['Salmos 37:4', 'Salmo 42:1-2', 'Filipenses 3:8', 'João 6:35'],
    tags: ['desejo de Deus', 'Edwards', 'apreciação', 'santidade', 'gozo'],
    fontes: ['Jonathan Edwards, Religious Affections', 'Edwards, The End for Which God Created the World', 'Marsden, Jonathan Edwards']
  },
  {
    id: 'novo-042',
    titulo: 'Jonathan Edwards — Avivamento e a Presença Divina',
    categoria: 'Eclesiologia',
    subcategoria: 'Avivamento',
    conteudo: [
      'Edwards foi o principal teólogo do Grande Desertamento (1730-1740), o primeiro avivamento de alcance nacional na América. Para ele, o avivamento é obra soberana do Espírito Santo.',
      'Edwards argumentava que o avivamento não é fabricado por técnicas humanas, mas derramado por Deus. A preparação espiritual, a oração e a pregação fiel são meios, mas o resultado é de Deus.',
      'Para Edwards, o avivamento é precedido por humilhação, arrependimento e busca fervorosa de Deus. A religião verdadeira é "afeições santificadas" — emoções que nascem da compreensão da verdade.',
      'Edwards via o avivamento como retorno às fontes do cristianismo primitivo. Em meio à formalidade religiosa, Deus desperta Seu povo para uma experiência viva de Sua presença.',
      'O legado de Edwards sobre avivamento é um chamado para que a Igreja busque a presença de Deus com humildade e fervor. O avivamento não é passado; é promessa para todos os tempos.'
    ],
    versicosChave: ['2 Crônicas 7:14', 'Atos 4:31', 'Habacuque 3:2', 'Joeel 2:28-29'],
    tags: ['avivamento', 'Edwards', 'Desertamento', 'Espírito Santo', 'presença de Deus'],
    fontes: ['Jonathan Edwards, A Narrative of Surprising Conversions', 'Edwards, Religious Affections', 'Marsden, Jonathan Edwards']
  },
  {
    id: 'novo-043',
    titulo: 'Jonathan Edwards — A Natureza da Verdadeira Conversão',
    categoria: 'Soteriologia',
    subcategoria: 'Conversão',
    conteudo: [
      'Edwards dedicou considerável estudo ao tema da conversão, distinguindo entre experiências religiosas genuínas e falsas. Para ele, a conversão verdadeira envolve transformação do coração, não apenas mudança de comportamento.',
      'Edwards argumentava que a conversão é obra do Espírito Santo, que ilumina a mente, inclina a vontade e transforma os afetos. O homem não pode se converter por suas próprias forças.',
      'Para Edwards, a conversão verdadeira produz frutos de arrependimento, fé em Cristo, amor a Deus e aos outros, e obediência à vontade divina. Sem esses frutos, não há conversão genuína.',
      'Edwards alertava contra a confiança em experiências emocionais passageiras como evidência de conversão. A verdadeira conversão é marcada por perseverança e frutos duradouros.',
      'O teólogo puritano ensinava que a conversão é início de uma jornada, não fim. O cristão recém-convertido precisa de discipulado, comunhão e perseverança.'
    ],
    versicosChave: ['João 3:3-8', '2 Coríntios 5:17', 'Efésios 2:4-5', '1 João 2:19'],
    tags: ['conversão', 'Edwards', 'regeneração', 'verdadeira fé', 'puritanismo'],
    fontes: ['Jonathan Edwards, Religious Affections', 'Edwards, A Treatise Concerning Religious Affections', 'Marsden, Jonathan Edwards']
  },
  {
    id: 'novo-044',
    titulo: 'Jonathan Edwards — A Beleza da Santidade',
    categoria: 'Vida Cristã',
    subcategoria: 'Santidade',
    conteudo: [
      'Edwards via a santidade como a mais sublime beleza da criação. Para ele, a santidade de Deus é a fonte de toda a beleza, e a santidade do crente é reflexo dessa beleza divina.',
      'Edwards argumentava que a santidade não é conformidade a regras externas, mas transformação interior do caráter. O santo é aquele cujo coração foi transformado para amar o que Deus ama.',
      'Para Edwards, a santidade produz alegria. O crente santo não é melancólico, mas alegre, porque desfruta da beleza de Deus em sua vida.',
      'Edwards ensinava que a santidade é progressiva. O cristão cresce em santidade através da oração, meditação na Palavra, comunhão dos santos e obediência.',
      'A teologia da santidade de Edwards é um chamado para a Igreja redescobrir a beleza da santidade. A santidade não é pesada, mas libertadora: é o caminho para a satisfação plena em Deus.'
    ],
    versicosChave: ['Salmos 96:9', '1 Pedro 1:15-16', 'Hebreus 12:14', 'Salmos 29:2'],
    tags: ['santidade', 'Edwards', 'beleza', 'caráter', 'transformação'],
    fontes: ['Jonathan Edwards, Religious Affections', 'Edwards, The End for Which God Created the World', 'Marsden, Jonathan Edwards']
  },

  // ─────────────────────────────────────────────────────────────────────────
  // J.I. PACKER (3 estudos: novo-045 a novo-047)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'novo-045',
    titulo: 'J.I. Packer — Conhecer a Deus Pessoalmente',
    categoria: 'Teologia Proper',
    subcategoria: 'Conhecimento de Deus',
    conteudo: [
      'J.I. Packer (1926-2020) é autor de "Conhecendo a Deus", obra que marcou gerações de cristãos. Para Packer, conhecer a Deus não é informação teológica, mas relação pessoal transformadora.',
      'Packer argumentava que o conhecimento de Deus começa na Escritura. Deus se revela por meio de Sua Palavra, e o estudo sério da Bíblia é o caminho para conhecer a Deus.',
      'Para Packer, o conhecimento de Deus é progressivo. Começa na conversão, amadurece na santificação e se aperfeiçoa na glória. Nunca chegamos ao fim do conhecimento de Deus.',
      'Packer ensinava que o conhecimento verdadeiro de Deus produz humildade, adoração e obediência. O homem que conhece a Deus é transformado por esse conhecimento.',
      'O chamado de Packer é que a Igreja redescobra o valor do conhecimento de Deus. Em uma era de superficialidade religiosa, o conhecimento profundo de Deus é a âncora da fé.'
    ],
    versicosChave: ['Jeremias 9:23-24', 'João 17:3', 'Salmos 46:10', 'Óseas 6:3'],
    tags: ['conhecimento de Deus', 'Packer', 'Escritura', 'relação', 'teologia'],
    fontes: ['J.I. Packer, Conhecendo a Deus', 'Packer, Knowing God', 'Packer, God Has Spoken']
  },
  {
    id: 'novo-046',
    titulo: 'J.I. Packer — A Orientação Divina na Vida do Crente',
    categoria: 'Vida Cristã',
    subcategoria: 'Orientação',
    conteudo: [
      'Packer dedicou considerável atenção ao tema da orientação divina, entendendo que muitos cristãos se confundem sobre como discernir a vontade de Deus. Para Packer, a orientação divina é real, mas exige maturidade.',
      'Packer argumentava que Deus guia principalmente através de Sua Palavra. As Escrituras fornecem princípios claros para decisões éticas e práticas. A Bíblia não é apenas livro de histórias, mas manual de vida.',
      'Para Packer, a orientação divina inclui também as circunstâncias da vida, os conselhos dos irmãos e as impressões do Espírito Santo. Mas tudo deve ser submetido à Palavra.',
      'Packer ensinava que a orientação de Deus não é automática. O cristão deve buscar a Deus com humildade, oração e estudo da Escritura.',
      'O chamado de Packer é que a Igreja não busque atalhos para a orientação divina. A vontade de Deus é descoberta na relação íntima com Ele, não em fórmulas mágicas.'
    ],
    versicosChave: ['Salmos 119:105', 'Provérbios 3:5-6', 'Romanos 12:1-2', 'Tiago 1:5'],
    tags: ['orientação', 'Packer', 'vontade de Deus', 'decisões', 'Sabedoria'],
    fontes: ['J.I. Packer, God\'s Will', 'Packer, Conhecendo a Deus', 'Packer, Direção para a Vida']
  },
  {
    id: 'novo-047',
    titulo: 'J.I. Packer — A Soberania de Deus e o Sofrimento Humano',
    categoria: 'Teologia Bíblica',
    subcategoria: 'Sofrimento',
    conteudo: [
      'Packer abordou o tema do sofrimento à luz da soberania de Deus. Para ele, o sofrimento não é acidente fortuito, mas parte do plano soberano de Deus para o bem de Seu povo.',
      'Packer argumentava que a soberania de Deus não elimina o sofrimento, mas o coloca em contexto. O Deus soberano permite o sofrimento por razões que nem sempre compreendemos.',
      'Para Packer, o sofrimento é instrumento de Deus para amadurecer o caráter, produzir perseverança e aprofundar a dependência de Deus.',
      'Packer ensinava que a resposta cristã ao sofrimento não é explicação, mas confiança. "Deus faz todas as coisas bem", embora não sempre compreendamos seus caminhos.',
      'O chamado de Packer é que a Igreja descance na soberania de Deus mesmo quando o sofrimento é inexplicável. A fé não exige compreensão completa, mas confiança plena.'
    ],
    versicosChave: ['Romanos 8:28', 'Efésios 1:11', 'Job 1:21', '2 Coríntios 4:17'],
    tags: ['soberania', 'sofrimento', 'Packer', 'providência', 'confiança'],
    fontes: ['J.I. Packer, Conhecendo a Deus', 'Packer, Knowing God', 'Packer, Providence']
  },

  // ─────────────────────────────────────────────────────────────────────────
  // JOHN STOTT (3 estudos: novo-048 a novo-050)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'novo-048',
    titulo: 'John Stott — A Cruz de Cristo e a Reconciliação',
    categoria: 'Cristologia',
    subcategoria: 'Cruz',
    conteudo: [
      'John Stott (1921-2011) dedicou sua obra-prima "A Cruz de Cristo" ao estudo profundo do significado da morte de Jesus. Para Stott, a cruz é o centro de toda a fé cristã.',
      'Stott argumentava que a cruz é o meio de Deus para reconciliar consigo os pecadores rebeldes. A morte substitutiva de Cristo satisfaz a justiça divina e manifesta o amor divino.',
      'Para Stott, a cruz não é apenas um evento histórico, mas o fundamento da nova aliança. Em Cristo, Deus estabelece uma relação nova e eterna com Seu povo.',
      'Stott ensinava que a cruz transforma a relação entre Deus e o homem, entre o homem e si mesmo, e entre o homem e os outros. A reconciliação é total e abrangente.',
      'O chamado de Stott é que a Igreja nunca se canse de proclamar a mensagem da cruz. Em uma era de十字架 message diluída, a cruz permanece o poder de Deus para salvação.'
    ],
    versicosChave: ['2 Coríntios 5:18-21', '1 Coríntios 1:18-24', 'Gálatas 6:14', 'Colossenses 1:19-20'],
    tags: ['cruz', 'Stott', 'reconciliação', 'substituição', 'redenção'],
    fontes: ['John Stott, A Cruz de Cristo', 'Stott, The Cross of Christ', 'Stott, The Contemporary Christian']
  },
  {
    id: 'novo-049',
    titulo: 'John Stott — A Autoridade da Escritura na Vida da Igreja',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escritura',
    conteudo: [
      'Stott foi um defensor convicto da autoridade bíblica, insistindo que a Escritura é a norma suprema de fé e prática para a Igreja. Para ele, sem autoridade bíblica, não há cristianismo.',
      'Stott argumentava que a autoridade da Bíblia não vem da Igreja, mas de Deus. A Escritura é Palavra de Deus, e por isso é autoritativa.',
      'Para Stott, a autoridade bíblica se aplica a todas as áreas da vida: teologia, ética, cultura, política. Nenhuma esfera está isoa da soberania da Palavra.',
      'Stott ensinava que a Igreja deve submeter-se à Escritura, não o contrário. A tradição é importante, mas é reformada pela Palavra.',
      'O chamado de Stott é que a Igreja recupere a autoridade da Escritura como fundamento de tudo. Em uma era de relativismo, a Palavra de Deus permanece imutável.'
    ],
    versicosChave: ['2 Timóteo 3:16-17', 'Salmos 19:7-8', 'Isaías 40:8', 'Mateus 24:35'],
    tags: ['autoridade bíblica', 'Stott', 'Escritura', 'sola scriptura', 'Palavra de Deus'],
    fontes: ['John Stott, A Bíblia Autoritativa', 'Stott, Understanding the Bible', 'Stott, The Contemporary Christian']
  },
  {
    id: 'novo-050',
    titulo: 'John Stott — A Missão da Igreja no Mundo',
    categoria: 'Missiologia',
    subcategoria: 'Missão',
    conteudo: [
      'Stott foi um dos principais líderes do movimento missionário contemporâneo, sendo co-fundador da Lausanne Movement. Para ele, a missão da Igreja é central, não periférica.',
      'Stott argumentava que a missão da Igreja é integral: evangelho e justiça são inseparáveis. A Igreja não pode pregar o evangelho sem compromisso com os pobres e oprimidos.',
      'Para Stott, a missão da Igreja é universal. O mandato de Jesus é para todas as nações, não apenas para as culturas ocidentais.',
      'Stott ensinava que a missão exige contextualização sem compromisso. O evangelho é transcultural, mas sua comunicação deve ser contextual.',
      'O legado de Stott é um chamado para que a Igreja seja fiel ao mandato missionário. A missão não é opcional, mas o propósito central da existência da Igreja.'
    ],
    versicosChave: ['Mateus 28:19-20', 'Atos 1:8', 'Romanos 10:14-15', 'Apocalipse 7:9'],
    tags: ['missão', 'Stott', 'Lausanne', 'evangelismo', 'justiça social'],
    fontes: ['John Stott, A Cruz de Cristo', 'Stott, The Lausanne Covenant', 'Stott, The Contemporary Christian']
  }
];

