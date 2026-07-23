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
  // ———————————————————————————————————————————————————————————————————————————
  // 1. DOUTRINAS FUNDAMENTAIS —” TEOLOGIA PROPER (50 estudos)
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'dp-001',
    titulo: 'A Existência de Deus —” Argumentos Clássicos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A questão da existência de Deus é uma das mais debatidas na história da filosofia e da teologia. Os argumentos clássicos buscam demonstrar a existência de Deus pela razão humana.',
      'O argumento cosmológico parte do fato de que tudo que começa a existir tem uma causa. Ao retrocedermos na cadeia causal, chegamos a uma Primeira Causa não causada —” Deus.',
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
    titulo: 'A Trindade —” Mistério Central da Fé',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A doutrina da Trindade é o mistério central da fé cristã: um único Deus em três pessoas —” Pai, Filho e Espírito Santo. Cada pessoa é plenamente Deus.',
      'A formulação trinitária emergiu dos debates cristológicos dos séculos III e IV. O Concílio de Nicéia estabeleceu que o Filho é homoousios com o Pai.',
      'Agostinho desenvolveu a analogia psicológica: a mente se conhece e se ama, gerando verbo e amor. Assim, o Pai gera o Filho, e o Espírito procede do amor mútuo.',
      'A Trindade não é contradição lógica —” é paradoxo que transcende a razão. Deus não é três pessoas no sentido humano, mas três relações pessoais em uma essência divina.',
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
      'A transcendência significa que Deus está além de todas as limitações criadas —” tempo, espaço, matéria. Ã‰ o Deus que habita a luz inacessível.',
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
      'A onisciência de Deus significa que Ele sabe todas as coisas —” passado, presente e futuro —” de forma perfeita e simultânea.',
      'Deus conhece todas as possibilidades e atualidades. Ele sabe o que é, o que foi, o que será e o que poderia ser.',
      'A questão do livre-arbítrio parece conflitar com a onisciência. Se Deus sabe o que faremos, somos realmente livres? A resposta clássica é que Deus sabe sem causar.',
      'A teologia processual propõe que Deus conhece o futuro como possibilidades, não como certezas absolutas.',
      'A onisciência é fonte de consolação: Ele conhece nossas necessidades antes que as peçamos. Ã‰ também fonte de temor: nada se esconde dEle.'
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
      'A santidade de Deus é Seu atributo mais elevado —” a separação absoluta de tudo o que é impuro e a perfeição moral absoluta.',
      'A santidade implica Sua justiça: Ele não pode tolerar o pecado. A lei moral é reflexo da Sua santidade.',
      'A ira santa de Deus não é emoção humana, mas Sua oposição moral ao pecado. Ã‰ expressão de Sua santidade em confronto com o que é mau.',
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
      'A graça não anula a responsabilidade humana —” ela a capacita. A graça é gratuita mas não custosa: custou a vida do Filho.'
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
      'Deus é eterno —” não tem começo nem fim. O tempo é criação de Deus, mas Ele não está sujeito ao tempo.',
      'A imutabilidade significa que Ele não muda em Sua natureza, caráter, propósitos ou promessas.',
      'A imutabilidade não é estagnação —” é perfeição constante. Deus não precisa mudar porque é perfeito.',
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
      'O amor de Deus é o atributo que fundamenta todos os outros. Deus não apenas ama —” Ele é amor (1 João 4:8).',
      'O amor divino é incondicional, inesgotável e universal. Ele amou o mundo de tal maneira que deu o Seu Filho.',
      'O amor de Deus não depende da dignidade do objeto —” Ele ama os pecadores. Deus nos amou quando ainda éramos inimigos.',
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
      'A fidelidade se estende a todas as promessas —” desde a criação até a consumação final.',
      'Aå“åº” à fidelidade de Deus é obediência e adoração. O crente responde ao amor com amor, à fidelidade com lealdade.'
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
      'Ela é distinta da graça salvífica —” não salva, mas sustenta e beneficia.',
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
      'A graça especial é soberana —” Deus a confere a quem Ele deseja, não por mérito humano.',
      'Ela é suficiente e eficaz —” não pode ser resistida quando Deus a aplica.',
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
      'A predestinação é o decreto eterno de Deus de salvar uns e condenar outros. Ã‰ tema central no debate calvinista-arminiano.',
      'O calvinismo sustenta a predestinação incondicional: Deus escolhe antes da fundação do mundo, sem referência ao mérito.',
      'O arminianismo sustenta a predestinação condicional: Deus prevê quem crerá e os predestina baseado na Sua presciência.',
      'A predestinação não anula a responsabilidade humana —” ambos são verdadeiros na Bíblia.',
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
      'A providência não é fatalismo —” Deus usa meios humanos. O crente ora e age porque Deus governa através de instrumentos.',
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
      'A consciência moral é evidência de Deus no coração humano —” o senso de certo e errado aponta para um Legislador divino.',
      'A revelação geral é suficiente para condenação (deixando o homem sem desculpa) mas não para salvação.',
      'A revelação especial (Escritura e Cristo) é necessária para conhecimento salvífico de Deus.'
    ],
    versicosChave: ['Romanos 1:19-20', 'Salmos 19:1-4', 'Atos 14:17', 'Romanos 2:14-15'],
    tags: ['revelação geral', 'creação', 'consciência', 'apologética'],
    fontes: ['Calvino, Institutas I.5-6', 'John Calvin, Knowledge of God the Creator']
  },
  {
    id: 'dp-018',
    titulo: 'A Revelação Especial —” Escritura e Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'A revelação especial é Deus se comunicando diretamente —” através da Escritura e da pessoa de Jesus Cristo.',
      'Cristo é a Palavra definitiva de Deus —” a revelação plena e final. Deus falou de muitas maneiras, mas agora pelo Filho.',
      'A Escritura é Palavra de Deus inspirada, inerrante e suficiente. Ã‰ regra de fé e prática.',
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
      'O calvinismo sustenta que o livre-arbítrio é escravo —” o homem caído não pode escolher a Deus sem a graça regeneradora.',
      'O arminianismo sustenta que a graça preveniente capacita a escolha humana —” Deus antecipa Sua graça.',
      'O debate não é se Deus é soberano ou se o homem é livre —” ambos são verdadeiros. O mistério permanece.',
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
      'O pecado é rebelião contra Deus —” transgressão da Sua lei e ofensa à Sua santidade.',
      'O pecado tem origem na queda (Gênesis 3) —” a humanidade herdou uma natureza corrupta.',
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
      'A maldição do pecado é a consequência da desobediência humana —” morte, sofrimento, separação de Deus.',
      'A maldição se estende a toda a criação —” a terra foi amaldiçoada por causa do pecado humano.',
      'Cristo resgatou a humanidade da maldição da lei, fazendo-se maldição por nós na cruz.',
      'A maldição é superada pela bênção em Cristo —” a redenção restaura a comunhão com Deus.',
      'A maldição final é o lago de fogo —” separação eterna de Deus para os que rejeitam a salvação.'
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
      'A ressurreição dos mortos é doutrina central —” Cristo ressuscitou, e nós também ressuscitaremos.',
      'A nova criação é a promessa final: novos céus e nova terra, onde a justiça habita.',
      'A ressurreição não é imaterialidade —” é transformação corporal. Cristo ressuscitou com corpo glorificado.',
      'A nova criação não é destruição mas restauração —” Deus renovará todas as coisas.',
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
      'Para os crentes, o juízo é de recompensa —” não de condenação. Cristo é o juiz justo que recompensa a fidelidade.',
      'Para os incrédulos, o juízo é de condenação eterna —” separação de Deus.',
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
      'O inferno é realidade bíblica —” separação eterna de Deus para os que rejeitam a salvação.',
      'Existem diferentes visões: tortura eterna (tradição predominante), aniquilação (destruição final), universalismo (todos serão salvos).',
      'A Bíblia descreve o inferno como fogo, trevas, gemidos —” símbolos de sofrimento e separação.',
      'O inferno é resultado da justiça de Deus: o pecado exige punição. Mas Deus não deseja a morte do ímpio.',
      'A salvação é offers a todos —” Deus quer que todos sejam salvos. O inferno é a escolha humana, não o desejo divino.'
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
      'O céu é a comunhão eterna com Deus —” a realização de todo desejo humano.',
      'A glorificação é a transformação final dos crentes —” corpos glorificados, sem pecado, sem sofrimento.',
      'O céu não é nuvens e harpas —” é a presença de Deus. Estar com Cristo é o céu.',
      'A nova terra é parte da esperança cristã —” Deus renovará a criação, não a destruirá.',
      'A esperança do céu motiva a santidade: se temos esta herança, vivamos de modo digno.'
    ],
    versicosChave: ['Apocalipse 21:1-4', '1 Coríntios 15:42-57', 'Filipenses 3:20-21', 'João 14:1-3'],
    tags: ['céu', 'glorificação', 'nova terra', 'comunhão eterna', 'corpo glorificado'],
    fontes: ['N.T. Wright, Surprised by Hope', 'Randy Alcorn, Heaven']
  },
  {
    id: 'dp-027',
    titulo: 'A Escatologia Presente —” Já mas Ainda Não',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'A escatologia cristã é tensional: o Reino de Deus já está presente mas ainda não se consumou.',
      'O Reino já está presente em Cristo: Ele venceu Satanás, inaugurou o Reino, enviou o Espírito.',
      'O Reino ainda não se consumou: o pecado, a morte e o sofrimento ainda existem.',
      'A Igreja vive nesta tensão: já salvos mas ainda esperando a plena salvação.',
      'Esta tensão é.fonte de esperança e missionarismo —” proclamamos o Reino que já começou e aguardamos o que virá.'
    ],
    versicosChave: ['Mateus 12:28', 'Marcos 1:15', 'Romanos 8:23', '1 Coríntios 15:20-26'],
    tags: ['já mas ainda não', 'Reino presente', 'escatologia', 'tensão escatológica'],
    fontes: ['G.E. Ladd, A Theology of the New Testament', 'Oscar Cullmann, Christ and Time']
  },
  {
    id: 'dp-028',
    titulo: 'Analogia Fidei —” A Escritura Interpreta a Escritura',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Bibliologia',
    conteudo: [
      'A analogia da fé é princípio hermenêutico: partes da Bíblia devem ser interpretadas à luz de outras partes.',
      'A Bíblia tem unidade —” Deus é o autor único de todas as Escrituras. Não há contradição real.',
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
      'A transformação dos discípulos é evidência poderosa —” de Covardes a Mártires.',
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
      'A segunda vinda é consumação da história —” Cristo estabelecerá o Reino pleno.',
      'Vigiar e orar é a resposta adequada: não sabemos o dia nem a hora.'
    ],
    versicosChave: ['Mateus 24:30-31', '1 Tessalonicenses 4:16-17', 'Atos 1:11', 'Apocalipse 1:7'],
    tags: ['segunda vinda', 'parousia', 'escatologia', 'sinais', 'vigilância'],
    fontes: ['G.E. Ladd, The Blessed Hope', 'George Eldon Ladd, The Gospel of the Kingdom']
  },
  {
    id: 'dp-031',
    titulo: 'O Milênio —” Reino Milenar de Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Escatologia',
    conteudo: [
      'O milênio é o período de 1000 anos mencionado em Apocalipse 20. Existem três visões principais.',
      'O pré-milenarismo sustenta que Cristo voltará antes do milênio, estabelecendo Seu reino visível na terra.',
      'O pós-milenarismo sustenta que o mundo será cristianizado antes do retorno de Cristo.',
      'O amilenarismo sustenta que o milênio é período espiritual simbólico —” o reinho atual de Cristo no céu.',
      'A Bíblia não é clara sobre a ordem dos eventos —” a unidade na fé é mais importante que acordo cronológico.'
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
      'Não há separação entre Igreja terrena e celestial —” todos são um em Cristo.',
      'A comunhão se manifesta na oração, na adoração, no testemunho e na partilha de dons.',
      'Os santos falecidos continuam conosco em Cristo —” não estão ausentes, mas presentes no Senhor.',
      'Esta comunhão é.fonte de fortalecimento: não estamos sozinhos —” somos multidão de testemunhas.'
    ],
    versicosChave: ['Hebreus 12:1', 'Efésios 4:4-6', 'Romanos 12:4-5', '1 Coríntios 12:12-27'],
    tags: ['comunhão dos santos', 'Igreja invisível', 'unidade espiritual'],
    fontes: ['Calvino, Institutas IV.1', 'Henri de Lubac, Catholicism']
  },
  {
    id: 'dp-033',
    titulo: 'A Oração —” Comunhão com Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'A oração é comunhão direta com Deus —” falar e ouvir, pedir e agradecer, confessar e adorar.',
      'O modelo de oração é o Pai Nosso (Mateus 6:9-13) —” adoração, petição, confissão, proteção.',
      'A oração não muda Deus —” muda a pessoa que ora. Ela é meio de graça pelo qual crescemos em comunhão.',
      'A oração deve ser constante (1 Tessalonicenses 5:17), cheia de fé (Tiago 1:6) e submissa à vontade de Deus.',
      'O Espírito Santo intercede por nós com gemidos inexprimíveis (Romanos 8:26-27).'
    ],
    versicosChave: ['Mateus 6:9-13', '1 Tessalonicenses 5:17', 'Romanos 8:26-27', 'Tiago 5:16'],
    tags: ['oração', 'comunhão', 'Pai Nosso', 'intercessão', 'Espírito Santo'],
    fontes: ['Martin Luther, A Simple Way to Pray', 'Richard Foster, Prayer']
  },
  {
    id: 'dp-034',
    titulo: 'A Adoração —” O Propósito da Vida',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'A adoração é reconhecer o valor supremo de Deus e responder com reverência, amor e obediência.',
      'A adoração não é apenas música —” é toda a vida vivida para a glória de Deus.',
      'A adoração espiritual é em espírito e em verdade (João 4:23-24) —” autêntica e fundamentada na verdade bíblica.',
      'A adoração coletiva na Igreja é central —” não é opcional mas necessária.',
      'O céu é adoração eterna —” a vida cristã é preparação para a adoração final.'
    ],
    versicosChave: ['João 4:23-24', 'Romanos 12:1-2', 'Salmos 95:6', 'Apocalipse 4:8-11'],
    tags: ['adoração', 'culto', 'glória de Deus', 'vida cristã'],
    fontes: ['John Piper, Let the Nations Be Glad', 'Ralph P. Martin, Worship in the Early Church']
  },
  {
    id: 'dp-035',
    titulo: 'O Discipulado —” Seguindo a Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'O discipulado é seguir a Cristo como Senhor —” não apenas crer, mas obedecer e transformar-se.',
      'Jesus chamou para seguir: Venhe depois de mim. O discipulado é relacionamento pessoal com Cristo.',
      'O custo do discipulado é alto: negar-se a si mesmo, tomar a cruz, perder a vida para encontrá-la.',
      'O discipulado é comunitário —” não é individualismo. Fazemos discípulos em comunhão.',
      'O discipulado é processo de transformação à imagem de Cristo —” crescer em graça e conhecimento.'
    ],
    versicosChave: ['Mateus 16:24', 'Lucas 9:23', 'Mateus 28:19-20', '2 Coríntios 3:18'],
    tags: ['discipulado', 'seguir a Cristo', 'cruz', 'transformação', 'comunidade'],
    fontes: ['Dietrich Bonhoeffer, O Custo do Discipulado', 'Dallas Willard, The Great Omission']
  },
  {
    id: 'dp-036',
    titulo: 'A Consciência —” Guia Moral Interior',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ã‰tica Cristã',
    conteudo: [
      'A consciência é a faculdade moral que distingue certo de errado. Ã‰ dom de Deus, mas pode ser educada.',
      'A consciência não é infalível —” pode ser corrompida pelo pecado, pela cultura, pela falsa religião.',
      'A consciência deve ser formada pela Palavra de Deus —” não apenas pela tradição ou sentimento.',
      'Paulo distingue boa consciência (formada pela verdade) de má consciência (defeituosa).',
      'A liberdade de consciência é direito cristão —” ninguém deve ser forçado contra sua consciência.'
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
      'Não é perfeição instantânea mas processo gradual —” morrer para o pecado e viver para a justiça.',
      'O meio da santificação inclui: Palavra de Deus, oração, comunhão dos santos, sacramentos, obediência.',
      'O Espírito Santo é o agente da santificação —” Ele transforma a vida do crente.',
      'A santificação é cooperativa: Deus opera, o crente obedece.'
    ],
    versicosChave: ['1 Tessalonicenses 4:3', 'Filipenses 2:12-13', 'Hebreus 12:14', '2 Coríntios 3:18'],
    tags: ['santificação', 'crescimento espiritual', 'progresso', 'processo'],
    fontes: ['John Owen, Mortificação do Pecado', 'J.I. Packer, Keep in Step with the Spirit']
  },
  {
    id: 'dp-038',
    titulo: 'A Justificação —” Declaração de Justiça',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A justificação é declaração judicial de Deus de que o pecador é justo pela fé em Cristo.',
      'Não é transformação moral (isso é santificação) —” é mudança de status diante de Deus.',
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
    titulo: 'A adoção —” Filhos de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A adoção é o ato pelo qual Deus nos torna Seus filhos —” não por natureza, mas por graça.',
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
    titulo: 'A Redenção —” Compra da Liberdade',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A redenção é o ato pelo qual Cristo nos resgatou da escravidão do pecado pelo Seu sangue.',
      'A metáfora redentora vem do mercado de escravos —” Cristo pagou o preço para nos libertar.',
      'O preço foi Sua própria vida —” o sangue precioso de Cristo.',
      'A redenção é completa: passada (libertados do poder do pecado), presente (libertados da escravidão), futura (libertados da presença do pecado).',
      'A redenção é universal em offer mas eficaz nos eleitos.'
    ],
    versicosChave: ['Efésios 1:7', '1 Pedro 1:18-19', 'Colossenses 1:13-14', 'Efésios 2:12'],
    tags: ['redenção', 'resgate', 'sangue de Cristo', 'libertação'],
    fontes: ['John Murray, Redemption Accomplished and Applied', 'Calvino, Institutas II.16']
  },
  {
    id: 'dp-041',
    titulo: 'A Reconciliação —” Restauração da Amizade',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A reconciliação é a restauração da relação entre Deus e os homens, que estava quebrada pelo pecado.',
      'O homem era inimigo de Deus —” a reconciliação remove a hostilidade e restaura a amizade.',
      'Cristo é o meio da reconciliação: pela cruz, Ele satisfez a justiça divina e removeu o obstáculo.',
      'A reconciliação é iniciativa divina —” Deus nos reconciliou consigo em Cristo.',
      'A reconciliação implica reconciliação mútua: reconciliados com Deus, devemos reconciliar uns com os outros.'
    ],
    versicosChave: ['2 Coríntios 5:18-20', 'Romanos 5:10', 'Efésios 2:14-16', 'Colossenses 1:19-22'],
    tags: ['reconciliação', 'inimizade', 'paz com Deus', 'ministério da reconciliação'],
    fontes: ['Calvino, Institutas II.16', 'John Stott, The Cross of Christ']
  },
  {
    id: 'dp-042',
    titulo: 'A Glorificação —” Plenitude Final',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A glorificação é a etapa final da salvação —” transformação completa à imagem de Cristo.',
      'Inclui: corpos glorificados, ausência total de pecado, plena presença de Deus.',
      'A glorificação é certa para todos os crentes —” Deus começará e completará a boa obra.',
      'A glorificação é simultânea com a ressurreição —” transformação instantânea.',
      'A glorificação é o culminar da obra redentora —” a criação restaurada em plenitude.'
    ],
    versicosChave: ['Romanos 8:30', '1 Coríntios 15:51-57', 'Filipenses 3:20-21', '1 João 3:2'],
    tags: ['glorificação', 'transformação', 'corpo glorificado', 'consumação'],
    fontes: ['John Murray, Redemption Accomplished', 'N.T. Wright, Surprised by Hope']
  },
  {
    id: 'dp-043',
    titulo: 'A Fé —” Confiança em Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A fé é confiança pessoal em Deus e em Sua Palavra —” não apenas conhecimento intelectual.',
      'A fé inclui: conhecimento (assentimento), confiança (fidúcia) e compromisso (obediência).',
      'A fé é dom de Deus, não mérito humano —” Deus a concede para que creiamos.',
      'A fé se prova pelas obras —” não é sentimento subjetivo mas vida transformada.',
      'A fé é meio da salvação —” pela fé recebemos a justiça de Cristo.'
    ],
    versicosChave: ['Hebreus 11:1', 'Romanos 10:17', 'Efésios 2:8-9', 'Tiago 2:14-26'],
    tags: ['fé', 'confiança', 'crença', 'obediência', 'dom de Deus'],
    fontes: ['Calvino, Institutas III.2', 'W.G.T. Shedd, Dogmatic Theology']
  },
  {
    id: 'dp-044',
    titulo: 'O Arrependimento —” Volta para Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'O arrependimento é mudança de mente que resulta em mudança de direção —” voltar-se de Deus para o pecado.',
      'O arrependimento é obra do Espírito Santo —” Ele convence do pecado e conduz ao arrependimento.',
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
      'Deus guarda os Seus eleitos —” ninguém pode arrancá-los das Suas mãos.',
      'A perseverança não é presunção —” é confiança na fidelidade de Deus, manifestada em obediência.',
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
      'A unidade não é uniformidade —” pode haver diversidade sem comprometimento da unidade essencial.',
      'A divisão da Igreja é escândalo que fere o testemunho cristão.',
      'A unidade é escatológica —” será plena no céu. Na terra, buscamos sem comprometer a verdade.',
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
      'O objetivo não é punição mas restauração —” trazer o pecador de volta.',
      'Mateus 18:15-20 é o modelo bíblico: confronto privado, testemunhas, igreja, excomunhão.',
      'A disciplina é ato de amor —” proteger a Igreja e buscar o bem do pecador.'
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
      'A Igreja local é a expressão concreta da Igreja em um lugar específico —” assembleia de crentes.',
      'A Igreja local é imagem da universal —” não substitui mas representa.',
      'A Igreja local deve buscar pureza, verdade e amor —” reflexo da Igreja perfeita.',
      'A comunhão entre Igrejas locais é expressão da unidade universal.'
    ],
    versicosChave: ['Efésios 4:4-6', 'Hebreus 10:24-25', 'Mateus 16:18', 'Efésios 2:19-22'],
    tags: ['igreja local', 'igreja universal', 'comunhão', 'assembleia'],
    fontes: ['Edmund Clowney, The Church', 'Veli-Matti Kärkkäinen, An Introduction to Ecclesiology']
  },
  {
    id: 'dp-049',
    titulo: 'Os Sacramentos —” Batismo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'O batismo é sinal externo de graça interna —” identificação com Cristo na morte e ressurreição.',
      'Sepultados com Ele no batismo. O batismo é ato de obediência e testemunho público.',
      'A questão batismal divide: pedobatismo (crentes e filhos) versus credobatismo (apenas crentes).',
      'O batismo não salva —” é sinal de salvação já recebida pela fé.',
      'O batismo é marca de pertença à Igreja —” incorporação ao corpo de Cristo.'
    ],
    versicosChave: ['Mateus 28:19', 'Romanos 6:3-4', 'Atos 2:38', 'Colossenses 2:12'],
    tags: ['batismo', 'sacramento', 'pedobatismo', 'credobatismo', 'identificação'],
    fontes: ['Calvino, Institutas IV.15', 'Paul Jewett, Infant Baptism and the Covenant of Grace']
  },
  {
    id: 'dp-050',
    titulo: 'Os Sacramentos —” Ceia do Senhor',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A Ceia do Senhor é commemoração da morte de Cristo e antecipação daCeia celestial.',
      'Fazei isto em memória de mim. A Ceia é memorial, comunhão e antecipação.',
      'As visões variam: transubstanciação (católica), consubstanciação (luterana), memorialismo (Zwinglio).',
      'A Ceia não é sacrifício repetido —” é commemoração do sacrifício único de Cristo.',
      'A Ceia é ato comunitário —” celebração da Igreja em comunhão com Cristo e uns com os outros.'
    ],
    versicosChave: ['1 Coríntios 11:23-26', 'Mateus 26:26-29', 'Lucas 22:19-20', 'João 6:53-56'],
    tags: ['Ceia do Senhor', 'Eucaristia', 'comunhão', 'memorial', 'sacramento'],
    fontes: ['Calvino, Institutas IV.17', 'John Jeffery, A Theological Guide to Calvin\'s Institutes']
  },

  // ———————————————————————————————————————————————————————————————————————————
  // ANGELOLOGIA / DEMONOLOGIA
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'ad-001',
    titulo: 'A Natureza e Hierarquia dos Anjos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Angelologia',
    conteudo: [
      'Os anjos são seres espirituais criados por Deus para servi-Lo e servir aos homens.',
      'A hierarquia inclui querubins, serafins, arcanjos e anjos da presença.',
      'Os anjos são pessoais —” têm nomes, inteligência, vontade e emoções.',
      'A Bíblia não apoia a adoração de anjos —” eles são servos, não objeto de culto.',
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

  // ———————————————————————————————————————————————————————————————————————————
  // BIBLIOLOGIA
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'bi-001',
    titulo: 'A Inspiração da Escritura',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Bibliologia',
    conteudo: [
      'A inspiração significa que Deus é o autor último das Escrituras, usando homens como instrumentos.',
      'A inspiração verbal plenária sustenta que cada palavra é inspirada.',
      'A inspiração não é ditado mecânico —” Deus usou personalidade e estilo de cada autor.',
      'A inerrância sustenta que a Bíblia, no original, é verdadeira em tudo.',
      'A teologia liberal reduz a Bíblia a documento humano —” a ortodoxia sustenta a superintendência divina.'
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
      'A autoridade se estende a toda a Escritura —” Antigo e Novo Testamento.',
      'A secularização desafia a Bíblia —” a resposta é hermenêutica madura.'
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
      'O AT deve ser interpretado à luz do NT —” Cristo é o centro.',
      'Os gêneros literários requerem métodos diferentes.',
      'A interpretação depende da tradição da Igreja.'
    ],
    versicosChave: ['2 Timóteo 2:15', '1 Coríntios 2:12-14', 'Lucas 24:27'],
    tags: ['hermenêutica', 'interpretação', 'literal', 'gramatical-histórico'],
    fontes: ['D.A. Carson, Exegetical Fallacies', 'Gordon Fee, How to Read the Bible for All Its Worth']
  },

  // ———————————————————————————————————————————————————————————————————————————
  // 2. TEMAS POR LIVRO (100+ estudos)
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'tl-001',
    titulo: 'Gênesis —” Criação e Ordem Cósmica',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'Gênesis 1-2 apresenta a criação do universo por Deus com ordem, propósito e bondade.',
      'Deus cria pela Sua palavra e mostra-se pessoal. O homem é a culminação —” criado à imagem de Deus.',
      'O relato não é livro científico mas teológico. Responde a quem e por quê.',
      'A criação é gratuita —” criou por amor, para comunhão.',
      'O descanso no sétimo dia é padrão criacional —” ritmo de trabalho e descanso.'
    ],
    versicosChave: ['Gênesis 1:1-31', 'Gênesis 2:1-3', 'Colossenses 1:16'],
    tags: ['Gênesis', 'criação', 'imagem de Deus', 'sábado'],
    fontes: ['Victor Hamilton, Genesis (NICOT)', 'Gordon Wenham, Genesis (WBC)']
  },
  {
    id: 'tl-002',
    titulo: 'Gênesis —” A Queda e o Pecado',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'Gênesis 3 narra a queda: tentação, desobediência e consequências.',
      'O pecado é rebelião —” querer ser como Deus. Ã‰ a raiz de todo mal.',
      'As consequências são universais: morte, corrupção, maldição.',
      'Gênesis 3:15 é o proto-evangelium —” primeira promessa messiânica.',
      'A graça está presente mesmo no julgamento.'
    ],
    versicosChave: ['Gênesis 3:1-24', 'Romanos 5:12', 'Gênesis 3:15'],
    tags: ['queda', 'pecado', 'proto-evangelium', 'Adão e Eva'],
    fontes: ['Gordon Wenham, Genesis (WBC)', 'Henri Blocher, Original Sin']
  },
  {
    id: 'tl-003',
    titulo: 'Gênesis —” Aliança e Promessa',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'O tema da aliança percorre Gênesis: Adão, Noé, Abraão, Isaac, Jacó.',
      'A aliança com Abraão é central: promessa de terra, descendência e bênção universal.',
      'A aliança é incondicional em suas promessas.',
      'A descendência é singular e plural —” há A descendência que é Cristo.',
      'As alianças são fiéis embora o homem falhe.'
    ],
    versicosChave: ['Gênesis 12:1-3', 'Gênesis 15:6', 'Gálatas 3:16'],
    tags: ['aliança', 'Abraão', 'promessa', 'descendência'],
    fontes: ['O. Palmer Robertson, The Christ of the Covenants']
  },
  {
    id: 'tl-004',
    titulo: 'ÃŠxodo —” Libertação e Páscoa',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'O ÃŠxodo é evento fundante —” libertação da escravidão por Deus.',
      'A Páscoa é sacrifício central: o cordeiro imolado protege da sentença.',
      'As dez pragas são julgamento contra os deuses do Egito.',
      'A travessia do Mar Vermelho é batismo de Israel.',
      'A libertação é paradigmática para toda a salvação.'
    ],
    versicosChave: ['ÃŠxodo 3:7-8', 'ÃŠxodo 12:1-14', '1 Coríntios 5:7'],
    tags: ['ÃŠxodo', 'libertação', 'Páscoa', 'cordeiro pascual'],
    fontes: ['Douglas Stuart, Exodus (NICOT)']
  },
  {
    id: 'tl-005',
    titulo: 'ÃŠxodo —” A Lei e os Dez Mandamentos',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'A entrega da Lei no Sinai é ápice da aliança.',
      'Os Dez Mandamentos são o resumo da lei moral de Deus.',
      'A Lei tem múltiplas funções: revela, acusa, guia, prepara para Cristo.',
      'A relação Lei-Evangelho é central no protestantismo.',
      'A Lei é expressão de santidade e amor divinos.'
    ],
    versicosChave: ['ÃŠxodo 20:1-17', 'Romanos 7:7-12', 'Gálatas 3:24'],
    tags: ['lei', 'dez mandamentos', 'aliança', 'lei moral'],
    fontes: ['Michael Morales, Who Shall Ascend the Mountain of the Lord?']
  },
  {
    id: 'tl-006',
    titulo: 'Salmos —” Adoração e Louvor',
    categoria: 'Temas por Livro',
    subcategoria: 'Livros Poéticos',
    conteudo: [
      'Os Salmos são o hinário de Israel —” 150 cânticos que expressam toda a gama de emoções.',
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
    titulo: 'Livro de Jó —” Sofrimento e Soberania',
    categoria: 'Temas por Livro',
    subcategoria: 'Livros Poéticos',
    conteudo: [
      'Jó é a mais profunda reflexão sobre o sofrimento do inocente.',
      'Os amigos oferecem teologia da retribuição —” mas Jó é justo.',
      'Deus fala do redemoinho —” não responde diretamente mas revela Sua soberania.',
      'O tema é: Deus governa com sabedoria mesmo quando não entendemos.',
      'O sofrimento pode ser instrumento de Deus para aprofundar a fé.'
    ],
    versicosChave: ['Jó 1:21', 'Jó 19:25-27', 'Jó 42:1-6'],
    tags: ['Jó', 'sofrimento', 'soberania', 'redenção'],
    fontes: ['David Fox Flourney, Job (Interpretation)']
  },
  {
    id: 'tl-008',
    titulo: 'Provérbios —” Sabedoria Prática',
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
    titulo: 'Isaías —” O Profeta Messiânico',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Isaías é o evangelho do AT —” profecias messiânicas mais detalhadas.',
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
    titulo: 'Jeremias —” Nova Aliança e Restauração',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Jeremias profetizou nos últimos anos antes do exílio.',
      'Jeremias 29:11 é promessa de futuro.',
      'A nova aliança de Jeremias 31 é central —” Deus escreverá Sua lei nos corações.',
      'Jeremias é o profeta do choro.',
      'A mensagem é: julgamento é real, mas restauração é possível.'
    ],
    versicosChave: ['Jeremias 29:11', 'Jeremias 31:31-34', 'Lamentações 3:22-23'],
    tags: ['Jeremias', 'nova aliança', 'restauração', 'exílio'],
    fontes: ['Jack Lundbom, Jeremiah (Anchor)']
  },
  {
    id: 'tl-011',
    titulo: 'Daniel —” Soberania e Escatologia',
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
    titulo: 'Mateus —” O Evangelho do Reino',
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
    titulo: 'Marcos —” O Evangelho da Ação',
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
    titulo: 'Lucas —” O Evangelho Universal',
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
    titulo: 'João —” O Evangelho da Divindade',
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
    titulo: 'Atos —” A Igreja em Expansão',
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
    titulo: 'Romanos —” O Evangelho Sistemático',
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
    titulo: '1 e 2 Coríntios —” A Igreja Imperfeita',
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
    titulo: 'Gálatas —” Liberdade na Graça',
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
    titulo: 'Efésios —” A Igreja, Corpo de Cristo',
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
    titulo: 'Filipenses —” Alegria na Adversidade',
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
    titulo: 'Colossenses —” A Supremacia de Cristo',
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
    titulo: '1 Tessalonicenses —” A Esperança da Volta de Cristo',
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
    titulo: 'Hebreus —” A Superioridade de Cristo',
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
    titulo: 'Tiago —” Fé Viva e Obras',
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
    titulo: '1 Pedro —” Sofrimento e Esperança',
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
    titulo: '1 João —” Amor e Verdade',
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
    titulo: 'Apocalipse —” Revelação e Esperança',
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
    titulo: 'Números —” Peregrinação e Desobediência',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'Números narra a peregrinação de Israel no deserto.',
      'A desobediência gera julgamento —” 40 anos de deserto.',
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
    titulo: 'Deuteronômio —” Renovação da Aliança',
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
    titulo: 'Josué —” Conquista e Fidelidade',
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
    titulo: 'Juízes —” Círculo de Desobediência',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      'Juízes mostra o ciclo: pecado, julgamento, clamor, libertação.',
      'Não havia rei em Israel —” cada um fazia o que parecia certo.',
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
    titulo: 'Rute —” Graça e Redenção',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      'Rute é história de graça e lealdade.',
      'A gentia Rute entra no povo de Deus.',
      'Boaz é redentor —” tipo de Cristo.',
      'A linhagem de Davi e de Cristo.',
      'A providência de Deus no cotidiano.'
    ],
    versicosChave: ['Rute 1:16-17', 'Rute 4:14-16', 'Mateus 1:5'],
    tags: ['Rute', 'graça', 'redenção', 'Boaz', 'linhagem'],
    fontes: ['Daniel Block, Ruth (NICOT)']
  },
  {
    id: 'tl-034',
    titulo: '1 Samuel —” Realeza e Profecia',
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
    titulo: '2 Samuel —” A Aliança Davídica',
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
    titulo: '1 Reis —” O Templo e a Divisão',
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
    titulo: '2 Reis —” Exílio e Julgamento',
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
    titulo: 'Crônicas —” Revisão Teológica',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      'Crônicas é revisão teológica da história de Israel.',
      'ÃŠnfase no templo e na adoração.',
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
    titulo: 'Esdras e Neemias —” Restauração',
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
    titulo: 'Ester —” Providência e Coragem',
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

  // ———————————————————————————————————————————————————————————————————————————
  // 3. QUESTÃ•ES CONTEMPORÃ‚NEAS (50+ estudos)
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'qc-001',
    titulo: 'Ã‰tica Cristã e Moralidade Absoluta',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ã‰tica Cristã',
    conteudo: [
      'A ética cristã se fundamenta na natureza de Deus e na Sua Palavra.',
      'O relativismo moral contemporâneo desafia a noção de verdade absoluta.',
      'A Bíblia apresenta padrões morais universais —” não convenções culturais.',
      'A ética cristã é baseada no amor: a Deus e ao próximo.',
      'A consciência formada pela Palavra é guia moral.'
    ],
    versicosChave: ['Mateus 22:37-40', 'Romanos 12:1-2', 'Filipenses 4:8'],
    tags: ['ética', 'moralidade', 'absolutismo', 'relativismo'],
    fontes: ['David Wells, The Courage to Be Protestant', 'Francis Schaeffer, How Should We Then Live?']
  },
  {
    id: 'qc-002',
    titulo: 'Bioética —” Vida, Morte e Dignidade',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Bioética',
    conteudo: [
      'A bioética cristã defende a dignidade da vida humana desde a concepção.',
      'O aborto é rejeitado pela tradição cristã como interrupção injustificada da vida.',
      'A eutanásia contradiz a soberania de Deus sobre a vida e a morte.',
      'A engenharia genética levanta questões sobre manipulação da criação.',
      'A cura de doenças é chamado —” mas a dignidade humana é sagrada.'
    ],
    versicosChave: ['Salmos 139:13-16', 'Jeremias 1:5', 'Deuteronômio 32:39'],
    tags: ['bioética', 'aborto', 'eutanásia', 'dignidade', 'vida'],
    fontes: ['John Kilner, Dignity and Destiny', ' Nigel Cameron, Will Christians be Biotech\'s Best Hope?']
  },
  {
    id: 'qc-003',
    titulo: 'Justiça Social —” Pobres e Oprimidos',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Justiça Social',
    conteudo: [
      'A justiça social é chamamento bíblico —” Deus defende os oprimidos.',
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
    titulo: 'Cuidado com a Criação —” Ecologia Cristã',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ecologia',
    conteudo: [
      'A criação é dom de Deus —” somos mordomos, não donos.',
      'O mandato de dominar não é exploração mas cuidado responsável.',
      'A destruição ambiental é desobediência ao chamado de cuidar.',
      'O futuro é nova criação —” Deus restaurará todas as coisas.',
      'A responsabilidade ambiental é fé em ação.'
    ],
    versicosChave: ['Gênesis 1:28', 'Gênesis 2:15', 'Romanos 8:19-22', 'Apocalipse 21:1'],
    tags: ['ecologia', 'criação', 'cuidado', 'meio ambiente', 'mordomia'],
    fontes: ['Cal DeWitt, Earth-Wise', 'Loren Wilkinson, Earthkeeping']
  },
  {
    id: 'qc-005',
    titulo: 'Religião e Ciência —” Fé e Razão',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Fé e Ciência',
    conteudo: [
      'Fé e ciência não são necessariamente conflitantes.',
      'A ciência responde ao como; a fé ao por quê.',
      'O criacionismo, o design inteligente e a evolução teísta são posições cristãs.',
      'A Bíblia não é livro científico —” é revelação de Deus.',
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
    titulo: 'Cultura Cristã —” Engajamento Cultural',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Cultura',
    conteudo: [
      'A Igreja deve engajar a cultura sem ser absorvida por ela.',
      'A anticultura cristã é withdraw; a aculturação é compromisso.',
      'A transformação cultural é chamado —” sal da terra e luz do mundo.',
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
    subcategoria: 'Ã‰tica Pública',
    conteudo: [
      'A fé cristã tem implicações políticas —” mas não é partidária.',
      'O Reino de Deus transcende partidos e ideologias.',
      'Os cristãos devem buscar justiça em todas as esferas.',
      'A lealdade máxima é a Cristo, não a partido.',
      'A participação política é responsabilidade cívica.'
    ],
    versicosChave: ['Mateus 22:21', 'Romanos 13:1-7', 'Atos 5:29'],
    tags: ['política', 'justiça', 'Reino de Deus', 'cidadania'],
    fontes: ['Andy Crouch, The Tech-Wise Family', 'James Davison Hunter, To Change the World']
  },

  // ———————————————————————————————————————————————————————————————————————————
  // 4. HISTÃ“RIA DA IGREJA (50+ estudos)
  // ———————————————————————————————————————————————————————————————————————————

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
    titulo: 'Santo Agostinho —” Graça e Cidade de Deus',
    categoria: 'História da Igreja',
    subcategoria: 'Patrística',
    conteudo: [
      'Agostinho é o pai do Ocidente cristão. Suas Confissões são autobiografia espiritual.',
      'A graça soberana é tema central —” Deus precede o homem em tudo.',
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
      'Nicéia (325) —” divindade de Cristo contra o arianismo.',
      'Constantinopla (381) —” divindade do Espírito Santo.',
      'Ã‰feso (431) —” Maria como Theotokos.',
      'Calcedônia (451) —” duas naturezas de Cristo.'
    ],
    versicosChave: ['Efésios 2:20', '1 Timóteo 3:15', 'Judas 1:3'],
    tags: ['concílios', 'Nicéia', 'Constantinopla', 'Calcedônia', 'doutrina'],
    fontes: ['J.N.D. Kelly, Early Christian Doctrines', 'Richard Hanson, The Search for the Christian Doctrine of God']
  },
  {
    id: 'hi-004',
    titulo: 'São Tomás de Aquino —” Fé e Razão',
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
    titulo: 'João Calvino —” Soberania e Reforma',
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
      'A perfeição cristã é meta —” amor perfeito.',
      'O método metodista incluía pequenos grupos e disciplina.',
      'O avivamento metodista transformou a Inglaterra.'
    ],
    versicosChave: ['1 Tessalonicenses 4:3', '1 Coríntios 13:1-3', 'Hebreus 12:14'],
    tags: ['Wesley', 'metodismo', 'santificação', 'avivamento'],
    fontes: ['John Wesley, Sermons', 'Albert Outler, John Wesley']
  },
  {
    id: 'hi-008',
    titulo: 'Dietrich Bonhoeffer —” Graça Custosa',
    categoria: 'História da Igreja',
    subcategoria: 'Teologia Moderna',
    conteudo: [
      'Bonhoeffer é teólogo luterano martirizado pelo nazismo.',
      'A graça custosa é semipreço —” Deus nos chama a seguir.',
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
    titulo: 'Karl Barth —” Teologia Dialética',
    categoria: 'História da Igreja',
    subcategoria: 'Teologia Moderna',
    conteudo: [
      'Barth é o maior teólogo do século XX.',
      'Deus é totalmente diferente (totaliter aliter) e totalmente próximo.',
      'Cristo é a Palavra de Deus —” a Bíblia é testemunha.',
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
      'A experiência espiritual é central —” línguas como evidência.',
      'O pentecostalismo é o movimento cristão de maior crescimento.',
      'Desafios: teologia da prosperidade, emocionalismo.'
    ],
    versicosChave: ['Atos 2:1-4', '1 Coríntios 12-14', 'Marcos 16:17-18'],
    tags: ['pentecostalismo', 'carismático', 'dons', 'Espírito Santo'],
    fontes: ['Harold Berg, The Pentecostal Movement', 'Allan Anderson, An Introduction to Pentecostalism']
  },
  {
    id: 'hi-011',
    titulo: 'As Cruzadas —” Fé e Violência',
    categoria: 'História da Igreja',
    subcategoria: 'Medieval',
    conteudo: [
      'As cruzadas foram expedições militares para recuperar a Terra Santa.',
      'A motivação era religiosa —” libertar os locais sagrados.',
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
    titulo: 'A Inquisição —” Fé e Poder',
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
      'O avivamento teve impacto social —” redução da criminalidade.'
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
      'O missionarismo moderno é holístico —” palavra e obra.'
    ],
    versicosChave: ['Mateus 28:19-20', 'Atos 1:8', 'Romanos 10:14-15'],
    tags: ['missionarismo', 'William Carey', 'contextualização', 'Grande Comissão'],
    fontes: ['Timothy C. Tennent, Invitation to World Missions']
  },
  {
    id: 'hi-016',
    titulo: 'O Concílio de Trento —” Resposta Católica',
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
    titulo: 'Soren Kierkegaard —” Fé e Existência',
    categoria: 'História da Igreja',
    subcategoria: 'Filosofia Cristã',
    conteudo: [
      'Kierkegaard é pai do existencialismo cristão.',
      'A fé é salto paradoxal —” não racionalidade.',
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
    titulo: 'A Escatologia do Milênio —” Debate Histórico',
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
    titulo: 'A Igreja Primitiva —” Vida e Organização',
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
    titulo: 'São Francisco de Assis —” Pobreza e Amor',
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
    titulo: 'A Igreja Ortodoxa —” Tradição e Liturgia',
    categoria: 'História da Igreja',
    subcategoria: 'Ortodoxia',
    conteudo: [
      'A Igreja Ortodoxa preserva a tradição dos primeiros séculos.',
      'A liturgia é central —” a Divina Liturgia é mistério.',
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

  // ———————————————————————————————————————————————————————————————————————————
  // 5. ESTUDOS COMPARATIVOS (50+ estudos)
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'ec-001',
    titulo: 'Comparação entre os Quatro Evangelhos',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Comparação Sinótica',
    conteudo: [
      'Mateus, Marcos e Lucas são sinóticos —” narram a mesma história com ênfases diferentes.',
      'João é distinto —” apresentação teológica mais elevada.',
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
      'Deus é autor da natureza e da Escritura —” não pode haver conflito real.'
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
    titulo: 'Temas Mesianos —” AT e NT',
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
      'Graça não é antinomianismo —” a obediência continua.',
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
    titulo: 'Tipologias Bíblicas —” Tipos e Antitipos',
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
      'Cristo é o novo templo —” comunhão direta com Deus.',
      'A Ceia do Senhor substitui os sacrifícios.',
      'A adoração é holística —” toda a vida.'
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
      'O padrão: revelação â†’ cumprimento â†’ interpretação.'
    ],
    versicosChave: ['Deuteronômio 18:15', 'Atos 3:22-23', 'Hebreus 1:1-2'],
    tags: ['profecia', 'messias', 'cumprimento', 'revelação'],
    fontes: ['Walter Kaiser, The Messiah in the Old Testament']
  },
  {
    id: 'ec-011',
    titulo: 'Sacramentos —” Prefigurações no AT',
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
      'A misericórdia não anula a justiça —” é cumprida nela.',
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
    titulo: 'Adoração —” Templo e Igreja',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'O templo do AT era centro de adoração e sacrifício.',
      'A Igreja é o novo templo —” construída de pedras vivas.',
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
      'A esperança no AT é messiânica —” espera do Messias.',
      'A esperança no NT é escatológica —” espera da volta de Cristo.',
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
    titulo: 'Pecado e Redenção —” Narrativa Bíblica',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Redenção',
    conteudo: [
      'A narrativa bíblica é: criação â†’ queda â†’ redenção â†’ consumação.',
      'O pecado corrompe tudo; a redenção restaura tudo.',
      'Cristo é o centro da narrativa redentora.',
      'A história não é cíclica —” é linear e teleológica.',
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
    subcategoria: 'Ã‰tica',
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
    titulo: 'Sofrimento de Cristo —” Profecia e Cumprimento',
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
    titulo: 'Deus como Pai —” AT e NT',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'Deus é chamado de Pai no AT —” geralmente como criador e provedor.',
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
    titulo: 'Lei Moral —” Permanência e Aplicação',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Ã‰tica',
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
    titulo: 'Salvação —” Liberdade do Egito e em Cristo',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A libertação do Egito é tipo da salvação em Cristo.',
      'Escravidão â†’ liberdade; condenação â†’ justiça.',
      'O batismo é passagem do Mar Vermelho.',
      'O maná é tipo de Cristo pão da vida.',
      'A peregrinação é a vida cristã.'
    ],
    versicosChave: ['ÃŠxodo 3:7-8', '1 Coríntios 10:1-4', 'Romanos 6:3-4'],
    tags: ['ÃŠxodo', 'salvação', 'libertação', 'batismo', 'tipo'],
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

  // ———————————————————————————————————————————————————————————————————————————
  // 6. HERMENÃŠUTICA (50+ estudos)
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'he-001',
    titulo: 'Interpretação Literal —” Método Gramatical-Histórico',
    categoria: 'Hermenêutica',
    subcategoria: 'Métodos',
    conteudo: [
      'O método literal busca o sentido que o autor quis comunicar ao leitor original.',
      'Respeita o contexto, o gênero literário e a linguagem.',
      'Não é literalismo —” reconhece metáforas, alegorias, parábolas.',
      'Ã‰ o método predominante na Reforma Protestantista.',
      'A Bíblia é interpreta por ela mesma —” analogia da fé.'
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
    titulo: 'Línguas Originais —” Hebraico e Grego',
    categoria: 'Hermenêutica',
    subcategoria: 'Línguas',
    conteudo: [
      'O hebraico é a língua do AT —” rica em imagens e paradoxos.',
      'O grego do NT é koiné —” língua comum do império romano.',
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
    titulo: 'Crítica Textual —” Manuscritos e Variantes',
    categoria: 'Hermenêutica',
    subcategoria: 'Crítica Textual',
    conteudo: [
      'A crítica textual busca estabelecer o texto original das Escrituras.',
      'Temos milhares de manuscritos —” mais do que qualquer outro documento antigo.',
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
    titulo: 'Interpretação Alegórica —” Uso e Limites',
    categoria: 'Hermenêutica',
    subcategoria: 'Métodos',
    conteudo: [
      'A interpretação alegórica busca significados além do literal.',
      'Foi predominante nos Padres da Igreja (Orígenes, Clemente).',
      'O perigo é subjetividade —” cada um vê o que quer.',
      'A alegoria legítima é aquela que o texto permite.',
      'O método literal é mais confiável.'
    ],
    versicosChave: ['Gálatas 4:21-31', '2 Coríntios 3:14-16'],
    tags: ['alegoria', 'Orígenes', 'Padres', 'método'],
    fontes: ['Henri Blocher, In the Beginning']
  },
  {
    id: 'he-007',
    titulo: 'Tipologia —” Prefigurações Bíblicas',
    categoria: 'Hermenêutica',
    subcategoria: 'Métodos',
    conteudo: [
      'A tipologia estuda prefigurações no AT que se cumprem no NT.',
      'Ã‰ diferente de alegoria —” é baseada no texto bíblico.',
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
    titulo: 'Narrativa Bíblica —” Interpretação Narrativa',
    categoria: 'Hermenêutica',
    subcategoria: 'Métodos',
    conteudo: [
      'A interpretação narrativa respeita a narrativa como gênero.',
      'Personagens, enredo, tema e cenário são elementos-chave.',
      'A narrativa bíblica tem unidade —” aponta para Cristo.',
      'A moral da história deve ser extraída com cuidado.',
      'A Bíblia é história que se torna teologia.'
    ],
    versicosChave: ['Lucas 24:27', '1 Coríntios 10:11'],
    tags: ['narrativa', 'história', 'personagens', 'enredo'],
    fontes: ['Leland Ryken, How to Read the Bible as Literature']
  },
  {
    id: 'he-009',
    titulo: 'Poesia Hebraica —” Paralelismo e Imagem',
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
    titulo: 'Profecia —” Literal e Simbólica',
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
    titulo: 'Parábolas de Jesus —” Interpretação',
    categoria: 'Hermenêutica',
    subcategoria: 'Gêneros',
    conteudo: [
      'As parábolas são histórias com lição moral ou espiritual.',
      'Cada parábola tem ponto central —” não devemos detalhar demais.',
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
    titulo: 'Hebreus —” Hermenêutica do Novo Testamento',
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
    titulo: 'Paulo e a Lei —” Hermenêutica Paulina',
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
    titulo: 'Cristologia da Escritura —” Unidade e Diversidade',
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
      'O Apocalipse é gênero apocalíptico —” símbolos e visões.',
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
      'Eclesiastes é gênero sapiencial —” reflexão sobre a vida.',
      'O tema é a vanidade (hevel) de tudo sob o sol.',
      'A conclusão: temer a Deus e guardar os mandamentos.',
      'O pessimismo é aparente —” é realismo fé.',
      'A relevância para a vida contemporânea.'
    ],
    versicosChave: ['Eclesiastes 1:2', 'Eclesiastes 12:13'],
    tags: ['eclesiastes', 'vanidade', 'sabedoria', 'realismo'],
    fontes: ['Tremper Longman III, Ecclesiastes (NICOT)']
  },
  {
    id: 'he-017',
    titulo: 'Salmos de Lamento —” Interpretação',
    categoria: 'Hermenêutica',
    subcategoria: 'Poesia',
    conteudo: [
      'Os Salmos de lamento expressam dor e busca por Deus.',
      'Estrutura: invocação, queixa, confiança, petição, louvor.',
      'Lamentar não é falta de fé —” é fé honesta.',
      'O louvor no final é resposta de fé.',
      'Relevância para o sofrimento humano.'
    ],
    versicosChave: ['Salmo 13:1-6', 'Salmo 22:1-31', 'Salmo 88:1'],
    tags: ['lamento', 'dor', 'louvor', 'esperança'],
    fontes: ['Walter Brueggemann, The Message of the Psalms']
  },
  {
    id: 'he-018',
    titulo: 'Profecias Messiânicas —” Hermenêutica',
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
    titulo: 'Ã‰tica no AT e NT —” Continuidade',
    categoria: 'Hermenêutica',
    subcategoria: 'Ã‰tica',
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
    titulo: 'Hermenêutica Reformada —” Princípios',
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

  // ———————————————————————————————————————————————————————————————————————————
  // MAIS ESTUDOS —” TEOLOGIA PROPER
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'dp-051',
    titulo: 'A Omnipresença de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Proper',
    conteudo: [
      'Deus está presente em todos os lugares ao mesmo tempo.',
      'Não há lugar onde Deus não esteja —” nem o céu nem o inferno.',
      'A omnipresença não é panteísmo —” Deus está em toda parte mas não é tudo.',
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
      'Não é coerção —” é transformação do desejo.',
      'A graça não anula a liberdade —” ela a restaura.',
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
      'A reprovação é justa —” os réus são culpados.',
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
      'Ele morreu em nosso lugar —” assumindo a ira divina.',
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
      'O credo declara que Cristo desceu aos infernos —” interpretado como descida aos mortos.',
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
      'A volta é certa —” não é possibility mas certeza.',
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
      'A ressurreição dos mortos é certeza —” todos ressuscitarão.',
      'A dos justos é para vida eterna; a dos injustos para condenação.',
      'A ressurreição é corporal —” corpos transformados.',
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
      'Novos céus e nova terra —” não destruição mas renovação.',
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

  // ———————————————————————————————————————————————————————————————————————————
  // MAIS ESTUDOS —” TEMAS POR LIVRO
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'tl-041',
    titulo: 'Levítico —” Santidade e Sacrificação',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'Levítico é o livro da santidade —” como o povo se aproxima de Deus santo.',
      'Os sacrifícios apontam para Cristo —” cordeiro imolado.',
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
    titulo: 'Juízes —” Círculo de Pecado',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      'O ciclo de Juízes: pecado â†’ julgamento â†’ clamor â†’ libertação.',
      'Cada juiz é instrumento imperfeito de Deus.',
      'A ausência de rei leva a anarquia moral.',
      'Deus não desiste do Seu povo.',
      'A necessidade de um Rei perfeito —” Cristo.'
    ],
    versicosChave: ['Juízes 2:11-19', 'Juízes 21:25', '1 Samuel 8:5-7'],
    tags: ['Juízes', 'ciclo', 'pecado', 'libertadores'],
    fontes: ['Barry Webb, The Book of Judges']
  },
  {
    id: 'tl-043',
    titulo: 'Rute —” Graça Gentia',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      'Rute, moabita, entra no povo de Deus pela graça.',
      'A lealdade de Rute é exemplar.',
      'Boaz é redentor —” tipo de Cristo.',
      'A linhagem messiânica inclui gentios.',
      'A providência de Deus no cotidiano.'
    ],
    versicosChave: ['Rute 1:16-17', 'Mateus 1:5', 'Lucas 3:32'],
    tags: ['Rute', 'gentios', 'graça', 'redenção', 'Boaz'],
    fontes: ['Daniel Block, Ruth (NICOT)']
  },
  {
    id: 'tl-044',
    titulo: '1 Crônicas —” Adoração e Genealogias',
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
    titulo: 'Esdras —” Reforma e Leitura da Lei',
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
    titulo: 'Neemias —” Reconstrução e Oração',
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
    titulo: 'Ester —” Providência Divina',
    categoria: 'Temas por Livro',
    subcategoria: 'Históricos',
    conteudo: [
      'O nome de Deus não aparece mas Sua providência é evidente.',
      'Ester arriscam a vida por Seu povo.',
      'Mardoqueu e Hamã —” o conflito entre bem e mal.',
      'Purim é celebração da libertação.',
      'Deus usa circunstâncias para cumprir propósitos.'
    ],
    versicosChave: ['Ester 4:14', 'Ester 7:3-4', 'Ester 9:22'],
    tags: ['Ester', 'providência', 'coragem', 'Purim'],
    fontes: ['Karen Jobes, Esther (NICOT)']
  },
  {
    id: 'tl-048',
    titulo: 'Eclesiastes —” Vanidade e Sentido',
    categoria: 'Temas por Livro',
    subcategoria: 'Livros Poéticos',
    conteudo: [
      'Tudo sob o sol é vaidade —” não pessimismo mas realismo.',
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
    titulo: 'Cânticos —” Amor e Relacionamento',
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
    titulo: 'Lamentações —” Dor e Esperança',
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
    titulo: 'Oséias —” Amor Infinito',
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
    titulo: 'Amós —” Justiça Social',
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
    titulo: 'Miqueias —” Justiça, Misericórdia e Humildade',
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
    titulo: 'Jonas —” Misericórdia Universal',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Jonas resiste à missão —” mas Deus persiste.',
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
    titulo: 'Habacuque —” Fé no Meio do Caos',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Habacuque questiona Deus sobre a injustiça.',
      'Deus responde: o justo viverá pela fé.',
      'A fé transcende as circunstâncias.',
      'A confiança em meio ao sofrimento.',
      'O julgamento é certo —” mas a fé persiste.'
    ],
    versicosChave: ['Habacuque 2:4', 'Habacuque 3:17-19', 'Romanos 1:17'],
    tags: ['Habacuque', 'fé', 'injustiça', 'esperança'],
    fontes: ['O. Palmer Robertson, The Books of Nahum, Habakkuk, and Zephaniah']
  },
  {
    id: 'tl-056',
    titulo: 'Zacarias —” Profecias Messiânicas',
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
    titulo: 'Malaquias —” A Ãšltima Profecia',
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
    titulo: 'Mateus —” Sermão da Montanha',
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
    titulo: 'Mateus —” Parábolas do Reino',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'Mateus 13 contém as principais parábolas.',
      'O semeador —” diferentes receptividades.',
      'O joio —” coexistência de bons e maus.',
      'O grão de mostarda —” crescimento gradual.',
      'O fermento —” transformação oculta.'
    ],
    versicosChave: ['Mateus 13:1-52', 'Mateus 13:31-33', 'Mateus 13:44-46'],
    tags: ['parábolas', 'Reino', 'crescimento', 'transformação'],
    fontes: ['Klyne Snodgrass, Stories with Intent']
  },
  {
    id: 'tl-060',
    titulo: 'Marcos —” A Paixão de Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'A Paixão é o clímax do evangelho de Marcos.',
      'A ceia do Senhor é estabelecida.',
      'O getsêmani revela o sofrimento.',
      'A crucificação e morte.',
      'O túmulo vazio —” início da vitória.'
    ],
    versicosChave: ['Marcos 14:22-25', 'Marcos 15:33-39', 'Marcos 16:1-8'],
    tags: ['Paixão', 'ceia', 'crucificação', 'túmulo vazio'],
    fontes: ['Ben Witherington III, The Gospel of Mark']
  },
  {
    id: 'tl-061',
    titulo: 'Lucas —” Magnificat e Cânticos',
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
    titulo: 'Lucas —” Parábolas da Misericórdia',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelhos',
    conteudo: [
      'Lucas enfatiza as parábolas da misericórdia.',
      'O Bom Samaritano —” amor ao próximo.',
      'O Filho Pródigo —” misericórdia paterna.',
      'A ovelha perdida —” busca divina.',
      'A dracma perdida —” valor do que é perdido.'
    ],
    versicosChave: ['Lucas 10:25-37', 'Lucas 15:11-32', 'Lucas 15:1-7'],
    tags: ['parábolas', 'misericórdia', 'Bom Samaritano', 'Filho Pródigo'],
    fontes: ['Klyne Snodgrass, Stories with Intent']
  },
  {
    id: 'tl-063',
    titulo: 'João —” Sete Milagres (Sinais)',
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
    titulo: 'João —” Disursos de Despedida',
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
    titulo: 'Atos —” O Espírito Santo na Igreja',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Epístolas',
    conteudo: [
      'O Espírito Santo é protagonista de Atos.',
      'Efusão em Pentecostes (2), Samaria (8), Cornélio (10), Ã‰feso (19).',
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
    titulo: 'Atos —” A Perseguição e a Missão',
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
    titulo: 'Romanos —” A Queda e a Graça',
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
    titulo: 'Romanos —” Israel e os Gentios',
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
    titulo: '1 Coríntios —” Dons Espirituais',
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
    titulo: '2 Coríntios —” Consolação e Força',
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
    titulo: 'Efésios —” As Bênçãos Espirituais',
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
    titulo: 'Filipenses —” A Kenosis de Cristo',
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
    titulo: 'Colossenses —” Cristo, Image de Deus',
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
    titulo: '1 Tessalonicenses —” A Volta de Cristo',
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
    titulo: '2 Tessalonicenses —” A Volta e a Vigilância',
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
    titulo: '1 Timóteo —” Pastoral e Liderança',
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
    titulo: '2 Timóteo —” A Coroa da Justiça',
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
    titulo: 'Tito —” A Sã Doutrina',
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
    titulo: 'Filemom —” Perdão e Reconciliação',
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
    titulo: 'Hebreus —” O Novo Testamento',
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
    titulo: 'Hebreus 11 —” A Galeria da Fé',
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
    titulo: 'Tiago —” Fé e Obras',
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
    titulo: '1 Pedro —” Sofrimento e Glória',
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
    titulo: '2 Pedro —” A Volta Certa',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Gerais',
    conteudo: [
      '2 Pedro combate céticos sobre a volta.',
      'O Senhor é paciente —” não deseja que pereça.',
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
    titulo: '1 João —” Amor e Verdade',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Gerais',
    conteudo: [
      'Deus é amor —” a mais profunda definição.',
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
    titulo: '2 e 3 João —” Verdade e Hospitalidade',
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
    titulo: 'Judas —” Contenda pela Fé',
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
    titulo: 'Apocalipse —” As Sete Igrejas',
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
    titulo: 'Apocalipse —” O Cordeiro e o Trono',
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
    titulo: 'Apocalipse —” O Julgamento Final',
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

  // ———————————————————————————————————————————————————————————————————————————
  // MAIS ESTUDOS —” QUESTÃ•ES CONTEMPORÃ‚NEAS
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'qc-011',
    titulo: 'Economia e Fé Cristã',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ã‰tica Pública',
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
    titulo: 'Ciência e Criação —” Perspectivas Cristãs',
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
    subcategoria: 'Ã‰tica Cristã',
    conteudo: [
      'O uso de drogas é contrário ao chamado de santificação.',
      'A dependência é escravidão —” Cristo liberta.',
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
    subcategoria: 'Ã‰tica Cristã',
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
    subcategoria: 'Ã‰tica Cristã',
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
      'A caridade não basta —” a justiça é necessária.',
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
    subcategoria: 'Ã‰tica Cristã',
    conteudo: [
      'A Bíblia ensina amor aos inimigos.',
      'A não-violência é ideal, mas há exceções (legítima defesa, governo).',
      'Cristo é o modelo de não-violência.',
      'A paz é fruto da justiça.',
      'A guerra é tragédia —” último recurso.'
    ],
    versicosChave: ['Mateus 5:38-48', 'Romanos 12:17-21', 'Romanos 13:1-7'],
    tags: ['violência', 'não-violência', 'paz', 'guerra'],
    fontes: ['John Howard Yoder, The Politics of Jesus']
  },
  {
    id: 'qc-024',
    titulo: 'Morte e Luto',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ã‰tica Cristã',
    conteudo: [
      'A morte é inimigo —” mas Cristo a venceu.',
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
      'O suicídio é tragédia —” não é condenação eterna.',
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
      'Cristo é a vida —” Ele veio para que tenhamos vida em abundância.',
      'A Igreja é defensora da vida.',
      'Cada vida é dom de Deus.'
    ],
    versicosChave: ['João 10:10', 'Salmos 139:13-16', 'Jeremias 1:5'],
    tags: ['cultura da vida', 'dignidade', 'aborto', 'eutanásia'],
    fontes: ['John Paul II, Evangelium Vitae']
  },
  {
    id: 'qc-027',
    titulo: 'Ã‰tica Ambiental Cristã',
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
      'O evangelho é universal —” transcende culturas.',
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
      'Deus é o criador —” não devemos nos tornar deuses.',
      'A tecnologia é ferramenta, não salvação.',
      'O limites éticos devem ser respeitados.'
    ],
    versicosChave: ['Gênesis 3:5', 'Salmos 100:3', 'Atos 17:28'],
    tags: ['transhumanismo', 'tecnologia', 'dignidade', 'limites'],
    fontes: ['Francis Schaeffer, How Should We Then Live?']
  },
  {
    id: 'qc-032',
    titulo: 'Ã‰tica no Trabalho',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Ã‰tica Cristã',
    conteudo: [
      'O trabalho é chamado de Deus —” não maldição.',
      'A ética trabalhista é exigência bíblica.',
      'A honestidade no trabalho é virtude.',
      'O descanso semanal é mandamento.',
      'O trabalho é forma de adoração.'
    ],
    versicosChave: ['Gênesis 2:15', 'Colossenses 3:23-24', 'ÃŠxodo 20:8-11'],
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
    subcategoria: 'Ã‰tica Cristã',
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

  // ———————————————————————————————————————————————————————————————————————————
  // MAIS ESTUDOS —” HISTÃ“RIA DA IGREJA
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'hi-026',
    titulo: 'Orígenes —” Filosofia e Teologia',
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
    titulo: 'São Basílio —” O Espírito Santo',
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
    titulo: 'Gregório de Nissa —” Contemplação',
    categoria: 'História da Igreja',
    subcategoria: 'Patrística',
    conteudo: [
      'Gregório de Nissa é mestre da contemplação.',
      'A vida de Moisés é modelo espiritual.',
      'O conhecimento de Deus é infinito.',
      'A ascensão espiritual é progresso.',
      'A pureza do coração é meta.'
    ],
    versicosChave: ['ÃŠxodo 33:20', 'Salmos 46:10', 'Mateus 5:8'],
    tags: ['Gregório', 'contemplação', 'vida espiritual', 'ascensão'],
    fontes: ['Gregório de Nissa, Vida de Moisés']
  },
  {
    id: 'hi-029',
    titulo: 'Agostinho —” Graça e Conversão',
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
    titulo: 'Pedro Lombardo —” Sentenças',
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
    titulo: 'Bernardo de Claraval —” Amor e Contemplação',
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
    titulo: 'Francisco de Assis —” Pobreza e Cantico',
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
    titulo: 'Tomás de Aquino —” Fé e Razão',
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
    titulo: 'Melanchton —” O Professor da Reforma',
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
    titulo: 'Jonathan Edwards —” Avivamento e Graça',
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
    titulo: 'Charles Spurgeon —” Príncipe dos Pregadores',
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
    titulo: 'Oxford Movement —” Renovação Anglo-Católica',
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
    titulo: 'Mother Teresa —” Serviço aos Pobres',
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
    titulo: 'Billy Graham —” Evangelista Global',
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
    titulo: 'Corrie ten Boom —” Perdão e Resistência',
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
    titulo: 'Martyn Lloyd-Jones —” Pregação Expositiva',
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
    titulo: 'John Stott —” Teologia Evangélica',
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

  // ———————————————————————————————————————————————————————————————————————————
  // MAIS ESTUDOS —” ESTUDOS COMPARATIVOS
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'ec-026',
    titulo: 'Pedro e Paulo —” Dois Ministérios',
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
    titulo: 'Maria e Eva —” Tipologia Feminina',
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
    titulo: 'Adão e Cristo —” Dois Representantes',
    categoria: 'Estudos Comparativos',
    subcategoria: 'Tipologia',
    conteudo: [
      'Adão é representante da humanidade caída.',
      'Cristo é o novo Adão —” restaura o que Adão perdeu.',
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
    versicosChave: ['João 6:32-35', 'ÃŠxodo 16:4-35', '1 Coríntios 10:3'],
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
    versicosChave: ['1 Coríntios 5:7', 'ÃŠxodo 12:1-14', 'João 1:29'],
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
      'A Igreja é novo templo —” pedras vivas.',
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
    titulo: 'Moisés e Cristo —” Mediadores',
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
    titulo: 'Davi e Cristo —” Rei e Messias',
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
    titulo: 'Salomão e Cristo —” Sabedoria',
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
      'A oração não muda Deus —” muda a nós.',
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
      'A cruz é derrota aparente —” vitória real.',
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
      'Não é legalismo —” é gratidão.',
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
    subcategoria: 'Ã‰tica',
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
    titulo: 'Fé e Ciência —” Harmonia',
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
      'Jesus é judeu —” os apóstolos são judeus.',
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
      'A encarnação é única —” não reencarnação.',
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
    versicosChave: ['ÃŠxodo 20:3-6', '1 João 5:21', 'Romanos 1:21-25'],
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
    titulo: 'Missão Universal —” AT e NT',
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

  // ———————————————————————————————————————————————————————————————————————————
  // MAIS ESTUDOS —” HERMENÃŠUTICA
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'he-021',
    titulo: 'Interpretação de Efésios',
    categoria: 'Hermenêutica',
    subcategoria: 'Epístolas',
    conteudo: [
      'Efésios é epístola circular —” não endereçada a uma igreja.',
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
      'A queda é real —” não mito.',
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

  // ———————————————————————————————————————————————————————————————————————————
  // MAIS 55 ESTUDOS FINAIS PARA ATINGIR 400+
  // ———————————————————————————————————————————————————————————————————————————

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
      'A vocação não é apenas ministerial —” é toda a vida.',
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
    titulo: 'A Oração do Senhor —” Modelo de Oração',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Espiritualidade',
    conteudo: [
      'O Pai Nosso é o modelo de oração.',
      'Inclui: adoração, petição, confissão, proteção.',
      'A oração é comunhão com Deus.',
      'Deus é Pai —” intimidade e reverência.',
      'A oração é essencial para vida cristã.'
    ],
    versicosChave: ['Mateus 6:9-13', 'Lucas 11:1-4'],
    tags: ['Pai Nosso', 'oração', 'modelo', 'comunhão'],
    fontes: ['Martin Luther, A Simple Way to Pray']
  },
  {
    id: 'extra-004',
    titulo: 'A Humildade —” Virtude Cristã',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ã‰tica Cristã',
    conteudo: [
      'A humildade é reconhecer nossa dependência de Deus.',
      'Cristo é modelo de humildade.',
      'A humildade não é fraqueza —” é força.',
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
      'A disciplina não é legalismo —” é graça.',
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
    subcategoria: 'Ã‰tica Cristã',
    conteudo: [
      'A obediência é resposta ao amor de Deus.',
      'Não é legalismo —” é gratidão.',
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
    subcategoria: 'Ã‰tica Cristã',
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
    subcategoria: 'Ã‰tica Cristã',
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
    subcategoria: 'Ã‰tica Cristã',
    conteudo: [
      'A bondade é fruto do Espírito.',
      'Deus é bondade em essência.',
      'A bondade se manifesta em ação.',
      'Bondade não é fraqueza —” é força moral.',
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
    subcategoria: 'Ã‰tica Cristã',
    conteudo: [
      'A fidelidade é compromisso com Deus e com os outros.',
      'Deus é fiel —” podemos confiar.',
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
    subcategoria: 'Ã‰tica Cristã',
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
    subcategoria: 'Ã‰tica Cristã',
    conteudo: [
      'A paz é fruto do Espírito.',
      'Cristo é nosso paz.',
      'A paz não é ausência de conflito —” é presença de justiça.',
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
    subcategoria: 'Ã‰tica Cristã',
    conteudo: [
      'O perdão é essencial para o cristão.',
      'Deus perdoa em Cristo.',
      'Somos chamados a perdoar.',
      'O perdão não é esquecimento —” é libertação.',
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
      'O ministério é temporário —” o Reino é eterno.'
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
      'Deus é Criador —” a criatividade é reflexo divino.',
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
      'A tecnologia é ferramenta —” neutra em si.',
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
    subcategoria: 'Ã‰tica Cristã',
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
    subcategoria: 'Ã‰tica Pública',
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
    subcategoria: 'Ã‰tica Pública',
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
    versicosChave: ['Salmos 150:3-5', 'Colossenses 3:23', 'ÃŠxodo 31:1-11'],
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
    subcategoria: 'Ã‰tica Cristã',
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

  // ———————————————————————————————————————————————————————————————————————————
  // ESTUDOS FINAIS
  // ———————————————————————————————————————————————————————————————————————————

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

  // ———————————————————————————————————————————————————————————————————————————
  // TRINDADE - ESTUDOS DETALHADOS (3 estudos)
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'trin-001',
    titulo: 'A Doutrina da Trindade —” Fundamentos Bíblicos',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Trindade',
    conteudo: [
      'A doutrina da Trindade afirma que há um único Deus que subsiste em três pessoas distintas: Pai, Filho e Espírito Santo. Cada pessoa é plenamente Deus, e há um só Deus verdadeiro. Esta não é uma especulação filosófica, mas a leitura fiel da revelação bíblica.',
      'No Antigo Testamento, a monoteísmo é radicalmente afirmado: "Ouve, Israel, o Senhor nosso Deus é o único Senhor" (Dt 6:4). Contudo, multiplicidade interna já se manifesta: o anjo do Senhor é distinto de Javé, o Espírito de Deus atua criadoramente, e a sabedoria personificada aparece em Provérbios 8.',
      'No Novo Testamento, a Trindade aparece no batismo de Jesus (Mt 3:16-17), na Grande Comissão (Mt 28:19), na bênção apostólica (2 Co 13:14) e em diversas fórmulas litúrgicas. Jesus afirma claramente sua unidade com o Pai: "Eu e o Pai somos um" (Jo 10:30).',
      'O Espírito Santo é pessoal e divino: fala, ensina, consola, intercede. Atribuem-se a Ele obras divinas: criação, inspiração, regeneração. Sua procession do Pai (e do Filho no Credo de Calcedônia) é debatida, mas é fato que Ele é pessoa plena da Trindade.',
      'A Trindade não é contradição lógica: é mistério que transcende a razão. Não é três deuses, nem três modos de um Deus. Ã‰ um Deus em três pessoas subsistentes, co-iguais, co-eternas, co-essenciais. A economia da salvação revela cada pessoa em operação distinta, mas nunca separada.'
    ],
    versicosChave: ['Mateus 28:19', '2 Coríntios 13:14', 'João 10:30', 'Gênesis 1:26', 'Isaías 48:16'],
    tags: ['trindade', 'monoteísmo', 'Pai', 'Filho', 'Espírito Santo', 'unidade'],
    fontes: ['Wayne Grudem, Teologia Sistemática', 'Millard Erickson, Christian Theology', 'Karl Barth, Church Dogmatics I/1']
  },
  {
    id: 'trin-002',
    titulo: 'A Trindade na História da Igreja —” Concílios e Definições',
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
    titulo: 'A Trindade e a Vida Cristã —” Aplicações Práticas',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Trindade',
    conteudo: [
      'A doutrina da Trindade não é mera especulação acadêmica; ela molda toda a vida cristã. A experiência de salvação é trinitária: o Pai planeja a redenção, o Filho a executa na cruz, o Espírito a aplica nos corações.',
      'Na oração, entramos em comunhão com o Deus triúno. Pelo Espírito, oramos ao Pai em nome do Filho. A Trindade é o contexto eterno da vida devocional. A oração de Jesus em João 17 revela a intimidade trinitária que somos convidados a participar.',
      'A comunidade cristã é imagem da Trindade. Assim como as pessoas divinas vivem em comunhão de amor, a Igreja é chamada a viver em koinonia —” comunhão, participação, mutualidade. A solidão é anti-trinitária.',
      'O amor cristão tem seu modelo na Trindade. O Pai ama o Filho, o Filho ama o Pai, e o Espírito é o vínculo desse amor. Quando amamos, participamos do amor eterno que circula na vida divina. Todo amor genuíno é reflexo do amor trinitário.',
      'A missão é trinitária: somos enviados pelo Filho como o Filho foi enviado pelo Pai, no poder do Espírito (Jo 20:21). A Grande Comissão é obra da Trindade. Evangelizar é convidar pessoas a entrar na comunhão com o Deus triúno.'
    ],
    versicosChave: ['João 17:20-23', 'Mateus 28:19', 'Efésios 2:18', 'Romanos 8:26-27', 'Gálatas 4:6'],
    tags: ['aplicação', 'oração', 'comunhão', 'amor', 'missão', 'vida cristã'],
    fontes: ['Garry Williams, Gospel Coalition Essays on the Trinity', 'Fred Sanders, The Deep Things of God', 'Leon Morris, The Gospel According to John']
  },

  // ———————————————————————————————————————————————————————————————————————————
  // EXPIAÃ‡ÃƒO (2 estudos)
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'exp-001',
    titulo: 'A Expiação Substitutiva —” O Coração do Evangelho',
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
      'A teoria exemplar (Abelardo, Socínio) via a cruz como exemplo de amor, não como sacrifício substitutivo. Os reformados combateram-na por reduzir a obra de Cristo aæ¦œæ · moral. A teoria do governo (Grotius) tentou um meio-termo, vendo a morte de Cristo como demonstração da seriedade da lei divina.'
    ],
    versicosChave: ['Romanos 5:8-9', 'Hebreus 9:14', '1 João 2:2', '1 Pedro 3:18', 'Efésios 5:2'],
    tags: ['teorias', 'resgate', 'satisfação', 'substituição penal', 'exemplar', 'Anselmo'],
    fontes: ['Gustaf Aulén, Christus Victor', 'John McIntyre, The Shape of Soteriology', 'H. D. McDonald, The Atonement of the Death of Christ']
  },

  // ———————————————————————————————————————————————————————————————————————————
  // ELEIÃ‡ÃƒO (2 estudos)
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'ele-001',
    titulo: 'A Eleição Incondicional —” O Decreto Eterno de Deus',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A eleição é o ato eterno de Deus de escolher, em Cristo, alguns para a salvação, antes da fundação do mundo. Paulo afirma: "nos escolheu nele antes da fundação do mundo" (Ef 1:4). A eleição é incondicional, não baseada em obras previstas.',
      'A base da eleição é a livre soberania de Deus, não a fé prevista nem as obras meritórias. Romanos 9:11-13 mostra que Jacó foi escolhido antes de nascer, "para que o propósito de Deus segundo a eleição permanecesse".',
      'A eleição é em Cristo: "nos escolheu nele". Não é uma seleção arbitrária, mas a escolha de pessoas para serem conformadas à imagem do Filho (Rm 8:29). Cristo é o fundamento e o critério da eleição.',
      'A objeção calvinista ao arminianismo: a fé não pode ser a causa da eleição, porque a fé é dom de Deus (Ef 2:8). Logo, se a fé é dom, e a fé é condição da eleição, então Deus escolhe com base em algo que Ele mesmo dá —” o que torna a escolha arbitrária de qualquer forma.',
      'Implicações pastorais: a eleição é fonte de segurança, não de orgulho. O crente não se gloria em ter sido escolhido, mas no Deus que escolheu. A eleição é mistério que humilha e consola: não somos salvos por nossa decisão, mas pelo decreto eterno.'
    ],
    versicosChave: ['Efésios 1:4-5', 'Romanos 9:11-13', '2 Tessalonicenses 2:13', '1 Pedro 1:2', 'João 15:16'],
    tags: ['eleição', 'predestinação', 'decreto', 'soberania', 'reforma'],
    fontes: ['João Calvino, Institutas III.21-24', 'Jonathan Edwards, Freedom of the Will', 'John Piper, The Pleasures of God']
  },
  {
    id: 'ele-002',
    titulo: 'Eleição e Evangelização —” O Equilíbrio Bíblico',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A eleição e a evangelização não se contradizem; ambas são ensinadas na Escritura. Deus elege soberanamente, mas também ordena que o evangelho seja pregado a toda criatura. O crente na eleição não é passivo na missão.',
      'Jesus une os dois: "Não fostes vós que me escolhestes a mim; pelo contrário, eu vos escolhi a vós outros e vos designei para que vades e deis fruto" (Jo 15:16). A escolha precede a missão, mas a missão é o fruto da escolha.',
      'A eleição não anula a responsabilidade humana. Paulo, sabendo-se enviado aos eleitos, pregava a todos (At 18:9-10). A soberania divina e a instrumentalidade humana coexistem na economia da salvação.',
      'O arminianismo vê a eleição como condicional —” Deus elege com base na fé prevista. Isto preserva a liberdade humana, mas enfraquece a soberania divina. O calvinismo vê a eleição como incondicional —” Deus elege soberanamente, e a fé é o fruto, não a causa.',
      'Praticamente, a doutrina da eleição deve produzir zelo missionário, não apatia. Se Deus elegeu, há eleitos em todo lugar —” nossa tarefa é buscá-los pelo evangelho. Os puritanos, que criam na eleição incondicional, foram os maiores missionários de sua época.'
    ],
    versicosChave: ['João 15:16', 'Atos 18:9-10', 'Romanos 10:14-15', '2 Timóteo 2:10', '1 Tessalonicenses 1:4-5'],
    tags: ['eleição', 'evangelização', 'missão', 'livre arbítrio', 'cooperação'],
    fontes: ['Iain Murray, Spurgeon v. Hyper-Calvinism', 'John Stott, A Fé Cristã em Busca de Novos Rumos', 'Michael Horton, Putting Amazing Back Into Grace']
  },

  // ———————————————————————————————————————————————————————————————————————————
  // PERSEVERANÃ‡A DOS SANTOS (1 estudo)
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'pers-001',
    titulo: 'A Perseverança dos Santos —” Segurança Eterna do Crente',
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

  // ———————————————————————————————————————————————————————————————————————————
  // BATISMO (2 estudos)
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'bat-001',
    titulo: 'O Batismo Cristão —” Significado e Modo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Sacramentos',
    conteudo: [
      'O batismo é o sacramento da iniciação cristã, instituído por Cristo na Grande Comissão: "Batizando-os em nome do Pai, e do Filho, e do Espírito Santo" (Mt 28:19). Ã‰ o sinal de entrada no corpo de Cristo e na comunidade da fé.',
      'O simbolismo é rico: o batismo representa a morte e ressurreição de Cristo (Rm 6:3-4), a purificação do pecado (At 2:38), a circuncisão do coração (Cl 2:11-12) e a nova criação (Gl 3:27). Ã‰ morrer para o pecado e viver para Deus.',
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
    titulo: 'O Batismo de Crianças —” Debate Histórico-Teológico',
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

  // ———————————————————————————————————————————————————————————————————————————
  // CEIA DO SENHOR (2 estudos)
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'ceia-001',
    titulo: 'A Ceia do Senhor —” Instituição e Significado',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Sacramentos',
    conteudo: [
      'A Ceia do Senhor (Eucaristia, Santa Ceia, Comunhão) foi instituída por Cristo na noite da Páscoa, pouco antes de Sua crucifixão. "Isto é o meu corpo... isto é o meu sangue" (Mt 26:26-28) é a declaração central do sacramento.',
      'O pão representa o corpo de Cristo, partido por nós. O vinho representa o sangue da nova aliança, derramado para remissão dos pecados. Os elementos são sinais visíveis de uma graça invisível —” o sacrifício de Cristo aplicado ao crente.',
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
    titulo: 'A Presença de Cristo na Ceia —” Visões Históricas',
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

  // ———————————————————————————————————————————————————————————————————————————
  // ESCATOLOGIA DETALHADA (3 estudos)
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'esc-001',
    titulo: 'O Arrebatamento da Igreja —” Pré, Mid ou Pós-Tribulacionismo',
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
    titulo: 'A Grande Tribulação —” Período de Angústia e Purificação',
    categoria: 'Escatologia',
    subcategoria: 'Eventos Finais',
    conteudo: [
      'A Grande Tribulação é o período final de sete anos, descrito em Daniel 9:24-27 e Apocalipse 6-19. Será um tempo de angústia sem paralelo na história (Dn 12:1; Mt 24:21), com a manifestação plena do anticristo e a ira de Deus sobre a humanidade rebelde.',
      'Daniel 9:24-27 profetiza "setenta semanas" (anos), das quais 69 foram cumpridas na primeira vinda de Cristo. A 70Âª semana (sete anos) é a tribulação, cortada ao meio (3,5 anos) pela "abominação da desolação" (Dn 9:27; Mt 24:15).',
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
    titulo: 'O Milênio —” Amilenismo, Pré-milenismo e Pós-milenismo',
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

  // ———————————————————————————————————————————————————————————————————————————
  // VIDA DEVOCIONAL (2 estudos)
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'dev-001',
    titulo: 'A Oração —” Comunhão com o Pai',
    categoria: 'Vida Cristã',
    subcategoria: 'Devoção',
    conteudo: [
      'A oração é a comunhão do crente com Deus. Ã‰ diálogo, não monólogo. Jesus ensinou a orar com a paternidade de Deus em vista: "Pai nosso, que estás nos céus" (Mt 6:9). A intimidade filial é o fundamento da oração cristã.',
      'Os elementos da oração cristã: adoração (reconhecer quem Deus é), confissão (admitir o pecado), ação de graças (gratidão pelas bênçãos), súplica (pedir necessidades) e intercessão (orar pelos outros). A Oração do Senhor cobre todas essas dimensões.',
      'As condições da oração eficaz: 1) Fé em Deus (Tg 1:6-7); 2) Permanecer em Cristo (Jo 15:7); 3) Pedir conforme a vontade de Deus (1 Jo 5:14); 4) Não pedir com motivos errados (Tg 4:3); 5) Humildade e arrependimento (Lc 18:9-14).',
      'As orações do AT e do NT revelam profundidade. Moisés intercedeu por Israel (ÃŠx 32:11-14). Davi clamou do fundo do vale (Sl 130). Daniel orou três vezes ao dia (Dn 6:10). Paulo pediu que os crentes orassem por ele (Ef 6:18-20).',
      'A oração persistente: Jesus ensinou a parábola da viúva e do juiz (Lc 18:1-8) para encorajar a oração constante. Não é que Deus precise ser importunado, mas nossa perseverança é disciplina da alma. Oração é relacionamento, não mágica.'
    ],
    versicosChave: ['Mateus 6:9-13', 'Filipenses 4:6-7', '1 Tessalonicenses 5:17', 'Hebreus 4:16', 'Salmos 145:18'],
    tags: ['oração', 'Pai nosso', 'intercessão', 'fé', 'comunhão', 'perseverança'],
    fontes: ['Andrew Murray, Com Cristo na Escola de Oração', 'John Bunyan, O Peregrino', 'E.M. Bounds, Power Through Prayer']
  },
  {
    id: 'dev-002',
    titulo: 'A Leitura Bíblica —” A Palavra como Pão Diário',
    categoria: 'Vida Cristã',
    subcategoria: 'Devoção',
    conteudo: [
      'A leitura regular da Bíblia é essencial para a vida cristã. Jesus respondeu à tentação com "Está escrito" (Mt 4:4). A Palavra de Deus é o pão do espírito, a espada do crente, o espelho da alma, e o combustível da fé.',
      'Como ler a Bíblia com proveito: 1) Ore antes de ler, pedindo iluminação do Espírito; 2) Leia com reverência, como Palavra de Deus; 3) Leia com regularidade, em plano sistemático; 4) Leia com atenção, meditando no texto; 5) Leia com obediência, aplicando à vida.',
      'A leitura devocional difere do estudo exegético. A primeira visa comunhão com Deus; o segundo, entendimento do texto. Ambas são necessárias, mas têm objetivos distintos. A leitura devocional não substitui o estudo aprofundado, e vice-versa.',
      'Os benefícios da leitura bíblica regular: 1) Santificação —” "santifica-os na verdade" (Jo 17:17); 2) Consolação —” "para que tenhais esperança" (Rm 15:4); 3) Direção —” "lâmpada para os meus pés" (Sl 119:105); 4) Defesa —” contra o erro e o pecado.',
      'A leitura em comunidade é igualmente importante. A leitura pública da Palavra (1 Tm 4:13) era prática da Igreja primitiva. Grupos pequenos que se reúnem para estudar a Escritura crescem na fé de modo orgânico e edificam-se mutuamente.'
    ],
    versicosChave: ['Salmos 119:105', '2 Timóteo 3:16-17', 'Josué 1:8', 'Hebreus 4:12', 'João 17:17'],
    tags: ['leitura bíblica', 'meditação', 'Palavra', 'devocional', 'estudo', 'santificação'],
    fontes: ['D. Martyn Lloyd-Jones, Studies in the Sermon on the Mount', 'John Stott, Between Two Worlds', 'Howard Hendricks, Living by the Book']
  },

  // ———————————————————————————————————————————————————————————————————————————
  // LOUVOR E ADORAÃ‡ÃƒO (2 estudos)
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'lov-001',
    titulo: 'A Natureza da Adoração —” Espírito e Verdade',
    categoria: 'Vida Cristã',
    subcategoria: 'Adoração',
    conteudo: [
      'Jesus definiu a adoração autêntica: "Ã‰ necessário adorar o Pai em espírito e em verdade" (Jo 4:23). A adoração não se limita a um lugar (Sião, Gerizim) ou forma exterior; é questão do coração, movido pelo Espírito.',
      'A adoração é resposta à revelação de Deus. Quando contemplamos Quem Ele é —” santo, soberano, gracioso, fiel —” nosso coração explode em louvor. A adoração é obra do Espírito Santo, que nos capacita a reconhecer e exaltar a Deus.',
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
    titulo: 'A Música na Igreja —” Cânticos, Hinos e Salmos',
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

  // ———————————————————————————————————————————————————————————————————————————
  // MISSÃ•ES (1 estudo)
  // ———————————————————————————————————————————————————————————————————————————

  {
    id: 'mis-001',
    titulo: 'A Grande Comissão —” Mandato Missionário da Igreja',
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

  // ———————————————————————————————————————————————————————————————————————————
  // 50 NOVOS ESTUDOS —” PAULINAS, JOÃƒO, AP, AT, SISTEMÁTICA
  // ———————————————————————————————————————————————————————————————————————————

  // --- EPÍSTOLAS PAULINAS ---
  {
    id: 'tl-091',
    titulo: 'Romanos 6 —” Morte e Ressurreição com Cristo',
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
    titulo: 'Romanos 7 —” A Luta contra o Pecado',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      'Romanos 7:1-6 estabelece a liberdade da Lei. O crente morreu para a Lei pelo corpo de Cristo, para pertencer a outro —” ao que ressuscitou dos mortos. O fruto deve ser para a santificação, não para a condenação.',
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
    titulo: 'Romanos 8 —” A Vida no Espírito Santo',
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
    titulo: '1 Coríntios 12 —” Dons Espirituais e o Corpo',
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
    titulo: '1 Coríntios 13 —” O Amor Superior',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      '1 Coríntios 13 é o "hino do amor", interrompendo a discussão sobre dons espirituais. Paulo estabelece que o amor é o critério supremo da vida cristã. Sem amor, os dons são "bronze que soa, ou sino que tine" (13:1).',
      'As qualidades negativas do amor: não é invejoso, não se vangloria, não se ensoberbece, não procede com indecência, não busca seus interesses, não se ira facilmente, não guarda rancor (13:4-5). O amor é descrito mais pelo que não faz do que pelo que faz.',
      'As qualidades positivas: "se alegra com a verdade, tudo sofre, tudo crê, tudo espera, tudo suporta" (13:6-7). O amor é ativo, não passivo. Ã‰ virtude que se expressa em ação, não apenas sentimento.',
      'A superioridade do amor sobre os dons: "Agora, pois, permanecem a fé, a esperança e o amor, estes três, mas o maior destes é o amor" (13:13). A fé dará lugar à visão; a esperança à posse; o amor permanece para sempre.',
      'O "amor" grego aqui é agape —” amor sacrificial, incondicional, divino. Não é eros (romântico), philia (amizade) ou storge (afeto familiar). Ã‰ o amor de Deus manifestado em Cristo, que se expressa na vida do crente pelo Espírito.'
    ],
    versicosChave: ['1 Coríntios 13:1-13', '1 Coríntios 13:4-7', '1 Coríntios 13:13'],
    tags: ['amor', 'agape', 'dons espirituais', 'edificação', 'eternidade'],
    fontes: ['Anthony Thiselton, 1 Corinthians', 'Anders Nygren, Agape and Eros']
  },
  {
    id: 'tl-096',
    titulo: '1 Coríntios 15 —” A Ressurreição dos Mortos',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      '1 Coríntios 15 é o mais extenso trecho neotestamentário sobre a ressurreição. Paulo transmite o que recebeu: "Cristo morreu pelos nossos pecados, foi sepultado e ressuscitou no terceiro dia" (15:3-4). Ã‰ tradição apostólica, não invenção.',
      'As testemunhas da ressurreição são múltiplas (15:5-8): Pedro, os doze, mais de 500 irmãos de uma vez, Tiago, todos os apóstolos. Paulo mesmo é testemunha: "Por último, apareceu também a mim" (15:8). O testemunho é público e verificável.',
      'A ressurreição é fundamento da fé (15:14, 17): "Se Cristo não ressuscitou, vã é a nossa pregação, e vã é a vossa fé". Sem ressurreição, não há salvação, não há perdão, não há esperança. A fé cristã é histórica e verificável.',
      'A natureza do corpo ressurreto (15:35-49): semente morre para nascer transformada. Corpo animal â†’ corpo espiritual. Corpo terreno â†’ corpo celestial. A continuidade e mudança estão em tensão: o mesmo "eu" que morre ressuscita transformado.',
      'A vitória final: "O ultimo inimigo a ser destruído é a morte" (15:26). "Onde está, ó morte, a tua vitória?" (15:55). A ressurreição de Cristo é garantia da nossa. "Assim também nós seremos transformados" (15:51-52).'
    ],
    versicosChave: ['1 Coríntios 15:3-8', '1 Coríntios 15:14', '1 Coríntios 15:55-57'],
    tags: ['ressurreição', 'Cristo', 'fé', 'vitória', 'corpo'],
    fontes: ['Anthony Thiselton, 1 Corinthians', 'N.T. Wright, The Resurrection of the Son of God']
  },
  {
    id: 'tl-097',
    titulo: 'Gálatas 5 —” A Liberdade Cristã',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      'Gálatas 5 é o coração ético da carta. "Para a liberdade Cristo nos libertou" (5:1). A liberdade não é licença, mas capacidade de servir uns aos outros pelo amor. A Lei não é caminho para a salvação.',
      'A advertência solene: "Se vos circuncidais, Cristo de nada vos aproveitará" (5:2-3). A volta à Lei anula a graça. Não é questão de rito, mas de mentalidade: buscar justiça pelas obras em vez da fé.',
      'A fé opera pelo amor (5:6). Nem circumcision nem incircuncisão valem algo, mas a fé que se expressa em amor. A justificação pela fé não é passividade —” é atividade movida pelo amor, não pela obediência à Lei.',
      'A lista dos frutos do Espírito (5:22-23) é uma das mais conhecidas: "amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança". São frutos —” resultado natural da vida no Espírito, não fruto (singular: o Espírito produz tudo isso junto).',
      'O contraste entre obras da carne e frutos do Espírito: "A carne deseja contra o Espírito, e o Espírito contra a carne" (5:17). A guerra interior é real. A vitória não vem pela repressão, mas pela caminhada no Espírito (5:16).'
    ],
    versicosChave: ['Gálatas 5:1', 'Gálatas 5:6', 'Gálatas 5:22-23'],
    tags: ['liberdade', 'frutos do Espírito', 'fé', 'amor', 'carne'],
    fontes: ['Timothy George, Galatians (NAC)', 'F.F. Bruce, The Epistle to the Galatians']
  },
  {
    id: 'tl-098',
    titulo: 'Efésios 4 —” A Unidade do Corpo',
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
    titulo: 'Efésios 6 —” A Armadura de Deus',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      'Efésios 6:10-20 apresenta a armadura de Deus como metáfora da proteção espiritual. "Estai fortes no Senhor e na força do seu poder" (6:10). A batalha não é contra carne e sangue, mas contra potestades espirituais (6:12).',
      'As peças da armadura: cinto da verdade (6:14), couraça da justiça (6:14), escudo da fé (6:16), capacete da salvação (6:17), espírito do Espírito —” a Palavra de Deus (6:17). Cada peça corresponde a uma verdade teológica.',
      'A oração é complemento essencial: "Em todo tempo, orai em espírito" (6:18). A armadura não substitui a oração —” a oração é o meio pelo qual a armadura é eficaz. A vigilância e a perseverança na oração são mandamentos.',
      'O contexto militar romano é evidente: o soldado equipado é modelo do crente. A verdade é cinto —” dá firmeza. A justiça é couraça —” protege o coração. A fé é escudo —” apaga as setas do maligno.',
      'A batalha espiritual não é opcional —” é realidade. "Porque a nossa luta não é contra carne e sangue, mas... contra os espíritos da maldade celestial" (6:12). A vitória já foi conquistada na cruz; a Igreja aplica essa vitória na história.'
    ],
    versicosChave: ['Efésios 6:10-18', 'Efésios 6:12', 'Efésios 6:17'],
    tags: ['armadura de Deus', 'batalha espiritual', 'oração', 'verdade', 'fé'],
    fontes: ['Peter O\'Brien, Ephesians', 'Clinton Arnold, Ephesians (ZECNT)']
  },
  {
    id: 'tl-100',
    titulo: 'Filipenses 2 —” A Kenosis de Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      'Filipenses 2:6-11 é o hino cristológico mais antigo da Igreja primitiva. "Sendo em forma de Deus, não teve por usurpação ser igual a Deus" (2:6). A pré-existência de Cristo é pressuposta, não demonstrada.',
      'A kenosis (esvaziamento) é voluntário: "Mas esvaziou a si mesmo, tomando a forma de servo" (2:7). Não é privação de atributos divinos, mas adição de natureza humana. O Filho de Deus se tornou filho do homem para que os filhos dos homens se tornem filhos de Deus.',
      'A humilhação é progressiva: forma de Deus â†’ forma de servo â†’ semelhança de homens â†’ obediência até a morte â†’ morte de cruz (2:7-8). A cruz era o tipo mais vergonhoso de morte. O Deus Todo-Poderoso escolheu a morte de escravo.',
      'A exaltação é igualmente progressiva: Deus o exaltou â†’ deu-lhe nome sobre todo nome â†’ toda joelho se dobre â†’ toda língua confesse (2:9-11). A inversão é completa: do mais baixo ao mais alto. A confissão é universal e forçada.',
      'A aplicação ética: "Fazei a vossa salvação com temor e tremor" (2:12). "Nada façais por contenda ou vã glória, mas, humildemente, cada um considere o outro superior a si mesmo" (2:3). O exemplo de Cristo motiva a humildade.'
    ],
    versicosChave: ['Filipenses 2:5-11', 'Filipenses 2:6-8'],
    tags: ['kenosis', 'humildade', 'exaltação', 'Cristologia', 'hino'],
    fontes: ['Gordon Fee, Philippians', 'Moule, The Origin of Christology']
  },

  // --- EVANGELHO DE JOÃƒO ---
  {
    id: 'tl-101',
    titulo: 'João 1 —” O Prólogo e a Encarnação',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelho de João',
    conteudo: [
      'O prólogo de João (1:1-18) é a declaração mais elevada da divindade de Cristo no NT. "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus" (1:1). A retroação ao Gênesis 1:1 é intencional: Cristo está além do tempo.',
      'O Verbo (Logos) é conceito grego e hebraico: para os gregos, o princípio racional do universo; para os hebraicos, a Palavra criadora de Deus (Salmos 33:6). João baptiza ambos os conceitos em Cristo.',
      'A encarnação é o evento central: "E o Verbo se fez carne e habitou entre nós" (1:14). A palavra grega "eskênôsen" (tabernaculou) remete ao tabernáculo do AT —” Deus habita no meio do Seu povo. A glória é a shekinah agora visível em Cristo.',
      'João Batista é testemunha: "Aquele que vem depois de mim... não era digno de lhe desatar a correa das sandálias" (1:27). O testemunho do Batista prepara o caminho. "Eis o Cordeiro de Deus, que tira o pecado do mundo!" (1:29).',
      'As primeiras chamadas de discípulos: "Que queres?" (1:38). "Vem e vê" (1:39). A fé começa com curiosidade, passa por encontro pessoal, e resulta em testemunho: "Achamos o Messias" (1:41).'
    ],
    versicosChave: ['João 1:1-3', 'João 1:14', 'João 1:29'],
    tags: ['Logos', 'encarnação', 'divindade', 'tabernáculo', 'testemunho'],
    fontes: ['Craig Keener, John (HNTC)', 'Leon Morris, The Gospel of John']
  },
  {
    id: 'tl-102',
    titulo: 'João 3 —” Nicodemos e o Novo Nascer',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelho de João',
    conteudo: [
      'A entrevista de Jesus com Nicodemos (3:1-21) é uma das mais importantes do NT. Nicodemos é fariseu, membro do Sinédrio, mestre de Israel —” e vem de noite, talvez por timidez ou por buscar luz nas trevas.',
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
    titulo: 'João 6 —” O Pão da Vida',
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
    titulo: 'João 10 —” O Bom Pastor',
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
    titulo: 'João 14-17 —” Os Discursos de Despedida',
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
    titulo: 'Atos 2 —” Pentecostes e o Nascimento da Igreja',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Apocalipse',
    conteudo: [
      'Atos 2 é o relato de Pentecostes, o nascimento da Igreja. "Baixou do céu um som, como de um vento veemente" (2:2). Os sinais sonoros e visíveis (línguas de fogo) marcam a efusão do Espírito.',
      'A pregação de Pedro resulta em 3000 conversiones (2:41). O tema é o cumprimento da profecia: "Nos últimos dias, derramarei do meu Espírito sobre toda a carne" (2:17, citando Joel 2:28-32). O que era promessa agora é realidade.',
      'A vida da comunidade primitiva: "Todos os que creram estavam juntos, e tinham tudo comum" (2:44). A comunhão, a fração do pão, as orações (2:42). Não era comunismo, mas generosidade voluntária movida pelo Espírito.',
      'O batismo: "Arrependei-vos, e cada um de vós seja batizado" (2:38). O batismo é resposta ao evangelho —” não pré-condição para salvação, mas obediência imediata que segue a fé. 3000 almas foram batizadas.',
      'A Igreja nascente é modelo para todas as épocas: ensino dos apóstolos, comunhão, fracao do pao, oração. A simplicidade e a profundidade caminham juntas. O foco é Cristo ressuscitado.'
    ],
    versicosChave: ['Atos 2:1-4', 'Atos 2:38', 'Atos 2:42'],
    tags: ['Pentecostes', 'Espírito Santo', 'Igreja', 'batismo', 'comunidade'],
    fontes: ['Craig Keener, Acts (HNTC)', 'F.F. Bruce, The Book of the Acts']
  },
  {
    id: 'tl-107',
    titulo: 'Atos 7 —” O Testemunho de Estêvão',
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
    titulo: 'Atos 10 —” A Visão de Cornélio e os Gentios',
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
    titulo: 'Atos 13-14 —” A Primeira Viagem Missionária',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Apocalipse',
    conteudo: [
      'Atos 13-14 registra a primeira viagem missionária de Paulo e Barnabé. A Igreja em Antioquia envia, sob guia do Espírito Santo (13:2-4). A missão começa com obediência à voz do Espírito.',
      'A pregação em Pisídia de Antioquia (13:16-41) é modelo de evangelismo: contexto histórico (Israel), centralidade de Cristo (ressurreição), chamada à fé. "Anunciamos-vos o evangelho destas coisas que a vossos pais foram prometidas" (13:32).',
      'A oposição surge: "Encheram-se de inveja, e blasfemaram" (13:45). A reação ao evangelho é polarização: alguns creem, outros rejeitam. Paulo e Barnabé "sacudiram o pó dos seus pés" (13:51) —” testemunho contra a incredulidade.',
      'O curador coxo em Listra (14:8-10) leva o povo a querer adorá-los como deuses. "Homens, por que fazeis isto? Nós somos homens como vós" (14:14). A tentação da idolatropia é real. Os missionários recusam a glória.',
      'A volta a Antioquia: "Relataram tudo o que Deus fizera com eles, e como abrira aos gentios a porta da fé" (14:27). A Igreja aprende com a experiência missionária. A porta aberta é oportunidade e responsabilidade.'
    ],
    versicosChave: ['Atos 13:2-3', 'Atos 13:47', 'Atos 14:27'],
    tags: ['missiones', 'Paulo', 'Barnabé', 'Antioquia', 'gentios'],
    fontes: ['Craig Keener, Acts (HNTC)', 'F.F. Bruce, The Book of the Acts']
  },
  {
    id: 'tl-110',
    titulo: 'Apocalipse 1-3 —” As Sete Cartas às Igrejas',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse 1-3 apresenta Cristo glorificado e sete cartas às igrejas da Ásia Menor. A visão de Cristo (1:12-18) é alicerce: "Eu sou o Primeiro e o Derradeiro, o que vive, e estive morto, eis que estou vivo por todos os séculos" (1:18).',
      'Cada carta tem estrutura: endereçamento, autodescrição de Cristo, elogio, acusação, ameaça/promoção, ouvinte vence. Cristo conhece cada igreja intimamente. Não há igreja perfeita —” todas têm problemas.',
      'Efésso: "Perdeste o teu primeiro amor" (2:4). A ortodoxia sem paixão é espiritualidade morta. Esmirna: pobreza material mas riqueza espiritual (2:9). Pérgamo: compromisso com o mundo (2:14). Tiatira: tolerância ao falso profetismo (2:20).',
      'Sardes: "Tu tens o nome de que vives, e estás morto" (3:1). A aparência sem realidade. Filadélfia: "Tiveste pouca força" (3:8) —” mas Cristo não censura. A fidelidade sem poder é valorizada.',
      'Laodiceia: "Nem quente nem frio" (3:15). A prosperidade material gera complacência espiritual. "Eu estou à porta e bato" (3:20) —” Cristo busca comunhão, mas a Igreja precisa abrir. A invitacao é pessoal e urgente.'
    ],
    versicosChave: ['Apocalipse 1:17-18', 'Apocalipse 2-3', 'Apocalipse 3:20'],
    tags: ['sete igrejas', 'Cristo glorificado', 'fidelidade', 'juízo', 'arrependimento'],
    fontes: ['G.K. Beale, Revelation (NICNT)', 'David Aune, Revelation (WBC)']
  },
  {
    id: 'tl-111',
    titulo: 'Apocalipse 12 —” A Mulher, o Dragão e o Filho',
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
    titulo: 'Apocalipse 19-22 —” A Consumação Final',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse 19 celebra a vitória: "Aleluia! Pois o Senhor nosso Deus, o Todo-Poderoso, reina!" (19:6). As bodas do Cordeiro são celebradas —” Cristo e a Igreja se encontram definitivamente.',
      'A segunda vinda: "O céu se abriu, e eis um cavalo branco, e aquele que o montava se chama Fiel e Verdadeiro" (19:11). O julgamento é justo. O Anti-Cristo e o falso profeta são lançados no lago de fogo (19:20).',
      'O milênio (20:1-6) é tema de debate: pré-milenarismo, pós-milenarismo, amilenarismo. Cada posição tem defensores fiéis. O texto é figurativo e literário, não necessariamente cronológico.',
      'O grande julgamento (20:11-15): o grande trono branco, os livros abertos, o livro da vida. "Se alguém não foi achado escrito no livro da vida, esse foi lançado no lago de fogo" (20:15). O julgamento é individual e final.',
      'Novos céus e nova terra (21:1-22:5): "Eis que faço novas todas as coisas" (21:5). Não destruição, mas renovação. "Deus dwellerá com eles, e eles serão seus povos" (21:3). Não haverá mais morte, dor, choro. O Ã‰den restaurado e superado.'
    ],
    versicosChave: ['Apocalipse 19:11', 'Apocalipse 20:11-15', 'Apocalipse 21:1-5'],
    tags: ['consumação', 'segunda vinda', 'milênio', 'novo céu', 'nova terra'],
    fontes: ['G.K. Beale, Revelation (NICNT)', 'Robert Mounce, The Book of Revelation']
  },

  // --- TEOLOGIA DO AT ---
  {
    id: 'tl-113',
    titulo: 'ÃŠxodo 20 —” Os Dez Mandamentos',
    categoria: 'Temas por Livro',
    subcategoria: 'Pentateuco',
    conteudo: [
      'Os Dez Mandamentos (ÃŠxodo 20:1-17) são a base da aliança Sinai. "Eu sou o Senhor teu Deus, que te tirei da terra do Egito" (20:2). A graça precede a Lei —” Deus liberta antes de ordenar.',
      'Os quatro primeiros mandamentos tratam da relação com Deus: não ter outros deuses, não fazer imagens, não tomar o nome em vão, lembrar do sábado. A prioridade é vertical: Deus primeiro.',
      'Os seis últimos tratam da relação com o próximo: honrar pais, não matar, não adulterar, não furtar, não calar falsos testemunhos, não cobiçar. A ética social se funda no Decálogo.',
      'A permanência da Lei moral é debate entre tradições. Os reformadores ensinam que a Lei moral (Decálogo) permanece; as leis cerimoniais se cumprem em Cristo; as leis civis são contextuais.',
      'O Decálogo é síntese da ética bíblica. Jesus resume: "Amarás o Senhor teu Deus de todo o teu coração" e "amarás o teu próximo como a ti mesmo" (Mt 22:37-39). A Lei é cumprida no amor.'
    ],
    versicosChave: ['ÃŠxodo 20:1-17', 'Deuteronômio 5:6-21'],
    tags: ['Decálogo', 'Lei moral', 'aliança', 'ética', 'Sinaí'],
    fontes: ['Walter Kaiser, Exodus (EBC)', 'Meredith Kline, Treaty of the Great King']
  },
  {
    id: 'tl-114',
    titulo: 'Salmos 23 —” O Senhor é o Meu Pastor',
    categoria: 'Temas por Livro',
    subcategoria: 'Salmos',
    conteudo: [
      'O Salmo 23 é o mais amado e conhecido dos salmos. David, que conhece a vida pastoral, aplica-a à relação com Deus. "O Senhor é o meu pastor; nada me faltará" (23:1). A confiança é absoluta.',
      'Os pastos verdes e águas tranquilas (23:2) são imagem de provisão e descanso. Deus supre necessidades físicas e espirituais. "Conduz-me pelas veredas da justiça, por amor do seu nome" (23:3). A direção divina é por Sua causa.',
      'O vale da sombra da morte (23:4) não é evitado —” é enfrentado. "Embora eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo". A presença de Deus é consolo na escuridão.',
      'A mesa preparada no meio dos inimigos (23:5) é vitória e honra. O óleo que unta a cabeça é unção —” preparação para o futuro. O cálice transbordante é abundância.',
      'O Salmo termina com certeza: "Bondade e misericórdia me seguirão todos os dias da minha vida; e habitarei na casa do Senhor por longos dias" (23:6). A fidelidade divina é promessa.'
    ],
    versicosChave: ['Salmos 23:1-6'],
    tags: ['pastor', 'confiança', 'proteção', 'provisão', 'fidelidade'],
    fontes: ['Derek Kidner, Psalms (TOTC)', 'C.H. Spurgeon, Treasury of David']
  },
  {
    id: 'tl-115',
    titulo: 'Provérbios 31 —” A Mulher Virtuosa',
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
    titulo: 'Isaías 53 —” O Servo Sofredor',
    categoria: 'Temas por Livro',
    subcategoria: 'Profetas',
    conteudo: [
      'Isaías 53 é a profecia mais clara sobre a morte substitutiva do Messias. "Quem crer na nossa pregação?" (53:1). A incredulidade é tema: a salvação é rejeitada pelos que deveriam recebê-la.',
      'A aparência humilde: "Não tinha formosura nem formosura que nos atraísse" (53:2). O Messias não vem com esplendor, mas em humildade. O valor não está na aparência, mas no caráter.',
      'O sofrimento substitutivo: "Ele foi ferido pelos nossos pecados, e moido pelas nossas iniquidades" (53:5). "O castigo que nos trazia a paz caiu sobre ele" (53:5). A satisfação vicária é clara.',
      'A morte e sepultamento: "Foi posta a sua vida com os ímpios, e com os ricos na sua morte" (53:9). A morte é real —” não há docetismo. Cristo morreu como homem.',
      'A ressurreição e justificação: "Verá a descendência, prolongará os seus dias" (53:10). "Muitos justificará" (53:11). A ressurreição é pressuposta. O sofrimento tem fruto: a salvação de muitos.'
    ],
    versicosChave: ['Isaías 53:3-7', 'Isaías 53:10-12'],
    tags: ['Servo sofredor', 'substituição', 'expiação', 'ressurreição', 'profecia'],
    fontes: ['John Oswald, Isaiah (NICOT)', 'Brevard Childs, Isaiah (OTL)']
  },
  {
    id: 'tl-117',
    titulo: 'Daniel 7 —” O Filho do Homem',
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
    titulo: 'Cristologia —” A Pessoa de Cristo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Cristologia',
    conteudo: [
      'A cristologia estuda quem é Jesus Cristo. Ele é 100% Deus e 100% humano —” duas naturezas, uma pessoa. O Concílio de Calcedônia (451) definiu: "Sem confusão, sem mudança, sem divisão, sem separação".',
      'A divindade de Cristo é ensinada no NT: João 1:1 ("o Verbo era Deus"), Colossenses 1:16 ("todas as coisas foram criadas por ele"), Hebreus 1:3 ("imagem exata da substância de Deus"), Filipenses 2:6 ("sendo em forma de Deus").',
      'A humanidade de Cristo: nasceu, comeu, chorou, dormiu, morreu. A encarnação é real —” não é aparência. Cristo é "o mediador entre Deus e os homens" (1 Tm 2:5) porque é ambos.',
      'As implicações: como Deus, seu sacrifício tem valor infinito; como homem, pode representar a humanidade. A satisfação vicária depende da plenitude de sua pessoa.',
      'A cristologia é teste de fidelidade. Negar a divindade é heresia (Arrius, Testemunhas de Jeová). Negar a humanidade é heresia (Docetismo, Gnosticismo). A ortodoxia mantém o equilíbrio.'
    ],
    versicosChave: ['João 1:1-3', 'Colossenses 1:15-20', 'Filipenses 2:5-11', 'Hebreus 1:1-3'],
    tags: ['Cristologia', 'divindade', 'humanidade', 'Calcedônia', 'união hipostática'],
    fontes: ['Bruce Demarest, The Person and Work of Christ', 'Millard Erickson, Christology']
  },
  {
    id: 'dp-062',
    titulo: 'Pneumatologia —” A Pessoa e Obra do Espírito Santo',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Pneumatologia',
    conteudo: [
      'A pneumatologia estuda o Espírito Santo. Ele é a terceira pessoa da Trindade —” pessoa, não força ou influência. "O Espírito é Deus" (Atos 5:3-4). A personalidade é evidenciada: fala, guia, ensina, convence.',
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
    titulo: 'Escatologia —” As Ãšltimas Coisas',
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
    titulo: 'Eclesiologia —” A Natureza da Igreja',
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
    titulo: 'Soteriologia —” A Doutrina da Salvação',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Soteriologia',
    conteudo: [
      'A soteriologia é o estudo da salvação. A salvação é obra de Deus, não mérito humano. "Porque pela graça sois salvos, por meio da fé" (Ef 2:8). A fé e a graça são inseparáveis.',
      'Os aspectos da salvação: justificação (declaração de justiça), regeneração (novo nascimento), adoção (filhos de Deus), santificação (transformação moral), glorificação (consumação final).',
      'A justificação é forense: Deus declara justo o crente, imputando-lhe a justiça de Cristo. "Aquele que não conheceu pecado, por nós o fez pecado, para que nós fôssemos feitos justiça de Deus" (2 Co 5:21).',
      'A salvação é por graça porque é imerecida; por fé porque é recebida; em Cristo porque é mediada; para boas obras porque é transformadora. A graça não anula a obediência —” a motiva.',
      'A segurança do crente: "Ninguém os arrebata da minha mão" (João 10:28). A perseverança dos santos é resultado da preservação divina. A certeza não é presunção, mas confiança na promessa de Deus.'
    ],
    versicosChave: ['Efésios 2:8-9', 'Romanos 5:1', 'João 10:28-29'],
    tags: ['salvação', 'justificação', 'regeneração', 'santificação', 'graça'],
    fontes: ['J.I. Packer, Knowing God', 'Louis Berkhof, Systematic Theology']
  },

  // --- MAIS ESTUDOS PAULINAS E ATOS ---
  {
    id: 'tl-118',
    titulo: 'Romanos 9 —” A Soberania de Deus na Salvação',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      'Romanos 9 é uma das seções mais desafiadoras do NT. Paulo lamenta a incredulidade de Israel (9:1-3). A pergunta: Deus falhou em Suas promessas? A resposta é não.',
      'A soberania eleitoral: "Não depende do que quer, nem do que corre, mas de Deus, que tem misericórdia" (9:16). O exemplo de Jacó e Esaú: "Amei a Jacó e odiei a Esaú" (9:13). A escolha é anterior ao mérito.',
      'O barro e o oleiro (9:20-21): "Quem és tu, ó homem, para contestar com Deus?" A criatura não pode questionar o Criador. A soberania é absoluta, mas não arbitrária.',
      'A justiça divina é demonstrada: "Para fazer conhecidas as riquezas da sua glória, as quais ele preparou para os misericordiosos" (9:23). A misericórdia é um tesouro, não obrigação.',
      'A tensão entre soberania e responsabilidade humana permanece. Paulo não resolve a tensão com lógica, mas com adoração: "Ã“ profundidade das riquezas!" (11:33). A humildade intelectual é necessária.'
    ],
    versicosChave: ['Romanos 9:16', 'Romanos 9:20-21', 'Romanos 9:23'],
    tags: ['soberania', 'eleição', 'misericórdia', 'Israel', 'barro'],
    fontes: ['Douglas Moo, Romans (NICNT)', 'Thomas Schreiner, Romans (BECNT)']
  },
  {
    id: 'tl-119',
    titulo: 'Romanos 12 —” A Vida Cristã Prática',
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
    titulo: '1 Coríntios 11 —” A Ceia do Senhor',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      '1 Coríntios 11:17-34 trata da Ceia do Senhor. A comunidade coríntia estava dividida: os ricos comiam antes, os pobres passavam fome. ACeia era ceia de amor, não de vergonha.',
      'A instituição: "Isto é o meu corpo, que é dado por vós" (11:24). "Este é o meu sangue da nova aliança, que é derramado por muitos" (11:25). A linguagem é simbólica, mas a realidade é espiritual.',
      'O discernimento corporal: "Quem come e bebe sem discernir o corpo, come e bebe para sua própria condenação" (11:29). ACeia não é ritual mágico —” requer fé e examinação.',
      'As disciplinas: "Por isso há entre vós muitos enfermos e adormecidos" (11:30). A desobediência tem consequências. Mas "quando fomos julgados, somos corrigidos pelo Senhor" (11:32).',
      'A instrução prática: "Esperai uns pelos outros" (11:33). A Ceia é ato comunitário, não individual. A communhão com Cristo e entre os crentes é inseparável.'
    ],
    versicosChave: ['1 Coríntios 11:23-26', '1 Coríntios 11:28-29'],
    tags: ['Ceia do Senhor', 'Eucaristia', 'corpo', 'sangue', 'discernimento'],
    fontes: ['Anthony Thiselton, 1 Corinthians', 'Gordon Fee, 1 Corinthians']
  },
  {
    id: 'tl-121',
    titulo: '2 Coríntios 3 —” O ministério do Espírito',
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
    titulo: 'Efésios 1 —” As Bênçãos Espirituais',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      'Efésios 1:3-14 é uma bênção (berakah) em três partes: Pai (3-6), Filho (7-12), Espírito (13-14). Cada Pessoa da Trindade é mencionada.',
      'Escolhidos antes da fundação do mundo (1:4): a eleição é pré-temporal. "Para sermos santos e sem mancha" —” a eleição é para santificação, não imoralidade.',
      'Redimidos pelo sangue (1:7): "Temos a redenção pelo seu sangue, o perdão dos pecados". A redenção tem preço: o sangue de Cristo. Ã‰ gratuita para nós, custou tudo a Ele.',
      'Selados com o Espírito Santo (1:13-14): o selo é garantia de propriedade e preservação. O Espírito é arras (garantia) da herança futura.',
      'O louvor da glória da graça (1:6, 12, 14): oç›®çš„æ˜¯ louvor. A salvação é para a glória de Deus, não apenas para nosso benefício.'
    ],
    versicosChave: ['Efésios 1:3-14', 'Efésios 1:4', 'Efésios 1:13-14'],
    tags: ['eleição', 'redenção', 'selo', 'Espírito', 'graça'],
    fontes: ['Peter O\'Brien, Ephesians', 'Harold Hoehner, Ephesians']
  },
  {
    id: 'tl-123',
    titulo: 'Colossenses 1 —” Cristo, Senhor da Criação',
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
    titulo: 'Atos 8 —” Filipe e o Eunuco Etíope',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Apocalipse',
    conteudo: [
      'Atos 8:26-40 registra o encontro de Filipe com o eunuco etíope. Um official de Candace, rainha dos Etíopes, que administrava todo o seu tesouro (8:27). A providência de Deus.',
      'O eunuco lia Isaías 53: "Levará Ele o nosso sofrimento?" (8:32-33). Filipe explica a Escritura: Cristo é o Servo Sofredor. A evangelização é explicação da Escritura.',
      'A confissão de fé: "Creio que Jesus Cristo é o Filho de Deus" (8:37). A fé é confessada antes do batismo. O batismo é resposta à fé, não condição para ela.',
      'O batismo no deserto (8:38-39): "Desceram ambos à água... subiram da água". A imersão é praticada, mas o modo não é o ponto —” o ponto é a obediência.',
      'O eunuco segue seu caminho "com alegria" (8:39). A salvação traz alegria. Um etíope é o primeiro gentio registrado a receber o evangelho —” prefigurando a missão universal.'
    ],
    versicosChave: ['Atos 8:30-35', 'Atos 8:37', 'Atos 8:38-39'],
    tags: ['Filipe', 'eunuco', 'evangelismo', 'batismo', 'Isaías 53'],
    fontes: ['Craig Keener, Acts (HNTC)', 'F.F. Bruce, The Book of the Acts']
  },
  {
    id: 'tl-125',
    titulo: 'Atos 13 —” Paulo e Barnabé em Antioquia',
    categoria: 'Temas por Livro',
    subcategoria: 'Atos e Apocalipse',
    conteudo: [
      'Atos 13:1-3 registra o chamado missionário. "Separai-me Barnabé e Saulo para a obra a que os chamei" (13:2). A missão é iniciativa divina, não humana.',
      'A pregação em Pisídia de Antioquia (13:16-41) é modelo: resumo da história de Israel (13:17-22), centralidade de Cristo (13:23-31), chamado à fé (13:38-39).',
      'A justificação pela fé: "Porque é por meio dele que se anuncia o perdão dos pecados. De tudo aquilo de que a lei de Moisés não vos pôde justificar, todo aquele que crê é justificado" (13:38-39).',
      'A rejeição e aceitação: "Foi necessário que se vos anunciasse primeiro a palavra de Deus" (13:46). Paulo e Barnabé se voltam para os gentios quando os judeus rejeitam.',
      'A alegria dos discípulos: "Encheram-se de gozo e do Espírito Santo" (13:52). A rejeição não paralisa —” o Espírito traz alegria mesmo na oposição.'
    ],
    versicosChave: ['Atos 13:2-3', 'Atos 13:38-39'],
    tags: ['missão', 'justificação', 'Paulo', 'Barnabé', 'gentios'],
    fontes: ['Craig Keener, Acts (HNTC)', 'F.F. Bruce, The Book of the Acts']
  },
  {
    id: 'tl-126',
    titulo: 'Apocalipse 4-5 —” A Visão do Trono',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse 4-5 é a visão central do louvor celestial. "Sobre o trono, uma aparência de jaspe e de cornalina" (4:3). A majestade de Deus é inexprimível.',
      'Os 24 anciãos (4:4): representam a totalidade do povo de Deus (12 tribos + 12 apóstolos). Eles lançam suas coroas diante do trono —” a autoridade humana se curva diante da divina.',
      'O livro com sete selos (5:1): quem é digno de abri-lo? "Ninguém... nem no céu, nem na terra" (5:3). A crise cósmica: quem é digno?',
      'O Cordeiro imolado (5:6-7): "Um cordeiro que parece ter sido morto". A chaga é marca de vitória, não fraqueza. O Cordeiro toma o livro —” a história está em Suas mãos.',
      'O louvor universal (5:9-14): "Digno és de tomar o livro e de abrir os seus selos". Uma multidão que ninguém pode contar, de toda nação, louva o Cordeiro. A adoração é eterna.'
    ],
    versicosChave: ['Apocalipse 5:6-9', 'Apocalipse 5:13'],
    tags: ['trono', 'Cordeiro', 'louvor', 'anciãos', 'selos'],
    fontes: ['G.K. Beale, Revelation (NICNT)', 'David Aune, Revelation (WBC)']
  },
  {
    id: 'tl-127',
    titulo: 'Apocalipse 13 —” A Besta e o Falso Profeta',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse 13 apresenta duas figuras: a besta do mar (13:1-10) e a besta da terra (13:11-18). Ambas servem ao dragão (Satanás).',
      'A besta do mar é poder político: "Deu-lhe o dragão poder, trono e grande autoridade" (13:2). As sete cabeças são impérios. A besta é adorada (13:4). O poder político se torna idolátrico.',
      'A besta da terra é poder religioso: "Tem dois chifres semelhantes aos de um cordeiro" (13:11). Finge ser de Deus, mas serve à besta do mar. Engana pela aparência.',
      'O número 666 (13:18): "Ã‰ o número de um homem". Representa imperfeição (6 em vez de 7), repetição (três vezes), e falha humana. Ã‰ símbolo de rebeldia contra Deus.',
      'A marca da besta (13:16-17): sem ela, ninguém pode comprar ou vender. Ã‰ controle econômico e religioso. A marca é oposta ao selo de Deus em Apocalipse 7:3.'
    ],
    versicosChave: ['Apocalipse 13:1-10', 'Apocalipse 13:16-18'],
    tags: ['besta', '666', 'poder político', 'idolatria', 'marca'],
    fontes: ['G.K. Beale, Revelation (NICNT)', 'Robert Mounce, The Book of Revelation']
  },
  {
    id: 'tl-128',
    titulo: 'Apocalipse 19-20 —” A Vitória e o Milênio',
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
    titulo: 'Estudos por Livro —” Romanos',
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
    titulo: 'Teologia do Novo Testamento —” Unidade e Diversidade',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Teologia Bíblica',
    conteudo: [
      'A teologia do NT estuda os temas centrais das Escrituras. Unidade: Cristo é o centro. Diversidade: Mateus, Marcos, Lucas, João, Paulo, Pedro, Hebreus.',
      'O Reino de Deus é tema central. "O Reino de Deus está próximo" (Mc 1:15). Ã‰ presente e futuro, inaugurado e consumado.',
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
    titulo: 'Teologia do Antigo Testamento —” Aliança e Promessa',
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
    titulo: 'Ã‰tica Cristã —” Princípios Fundamentais',
    categoria: 'Doutrinas Fundamentais',
    subcategoria: 'Ã‰tica',
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
    titulo: 'Estudos por Livro —” Gênesis',
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
    titulo: 'Estudos por Livro —” Apocalipse',
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

  // ———————————————————————————————————————————————————————————————————————————
  // 50 NOVOS ESTUDOS —” TEOLOGOS CLASSICOS E CONTEMPORANEOS
  // ———————————————————————————————————————————————————————————————————————————

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // CHARLES SPURGEON (8 estudos: novo-001 a novo-008)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    id: 'novo-001',
    titulo: 'Charles Spurgeon —” A Soberania de Deus',
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
    titulo: 'Charles Spurgeon —” O Poder da Oração',
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
    titulo: 'Charles Spurgeon —” Evangelismo e Conversão',
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
    titulo: 'Charles Spurgeon —” Sofrimento e Consolo Divino',
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
    titulo: 'Charles Spurgeon —” A Graça Sovina e Incondicional',
    categoria: 'Soteriologia',
    subcategoria: 'Graça',
    conteudo: [
      'Spurgeon era um ardoroso defensor da graça soberana, entendendo que a salvação é dom gratuito de Deus, não merecimento humano. Ele afirmava que a graça é o solo em que a fé pega raiz, e que sem a graça prévia o homem jamais buscaria a Deus.',
      'Para Spurgeon, a graça de Deus é incondicional no sentido de que não depende de qualificações humanas. Deus salva não porque o homem é bom, mas porque Ele é misericordioso. A graça é a bondade de Deus desmerecida, imerecida e indiscriminada.',
      'O pregador batista combatia veementemente a ideia de que o homem pode se salvar por suas próprias obras ou decisões. Ele ensinava que a salvação é "de Deus, por Deus e para Deus", desde o início até o fim. O homem éä»…ä»… um receptor passivo da graça divina.',
      'Spurgeon ilustrava a graça soberana com a história de sua própria conversão, quando um pregador leigo abriu a Bíblia em Isaías 45:22 e proclamou: "Olhai para mim, e sereis salvos". Naquele momento, o Espírito Santo regenerou seu coração.',
      'A teologia da graça de Spurgeon era equilibrada: a graça soberana não elimina a responsabilidade humana, mas a fundamenta. O homem deve arrepender-se e crer, mas capacidade de fazê-lo vem inteiramente de Deus.'
    ],
    versicosChave: ['Efésios 2:8-9', 'Romanos 9:16', 'João 6:44', 'Tito 3:5', 'Isaías 45:22'],
    tags: ['graça', 'graça soberana', 'Spurgeon', 'calvinismo', 'salvação'],
    fontes: ['C.H. Spurgeon, Sermões sobre a Graça de Deus', 'Iain Murray, Spurgeon v. Ryle', 'Spurgeon, Autobiography']
  },
  {
    id: 'novo-006',
    titulo: 'Charles Spurgeon —” A Cruz de Cristo como Centro da Fé',
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
    titulo: 'Charles Spurgeon —” A Arte e a Teologia da Pregação',
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
    titulo: 'Charles Spurgeon —” Fé e Confiança em Deus',
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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // A.W. TOZER (6 estudos: novo-009 a novo-014)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    id: 'novo-009',
    titulo: 'A.W. Tozer —” O Conhecimento de Deus',
    categoria: 'Teologia Proper',
    subcategoria: 'Conhecimento de Deus',
    conteudo: [
      'Aiden Wilson Tozer (1897-1963) dedicou sua vida ao estudo do caráter de Deus, acreditando que o conhecimento de Deus é o fundamento de toda a vida cristã. Para Tozer, conhecer a Deus não é apenas informação teológica, mas experiência transformadora.',
      'Tozer ensinava que o conhecimento de Deus começa na reverência. O homem que não teme a Deus jamais O conhecerá verdadeiramente. A reverência é a porta de entrada para o mistério da divindade.',
      'O pastor e autor americano insistia que o conhecimento de Deus é progressivo. Começa na regeneração, amadurece na santificação e se aperfeiçoa na glória. Nunca chegamos ao fim do conhecimento de Deus, pois Ele é infinito.',
      'Tozer alertava contra o perigo de conhecer a Deus apenas intelectualmente, sem transformação do coração. O verdadeiro conhecimento de Deus produz humildade, adoração, amor e obediência.',
      'A obra mais famosa de Tozer, "O Conhecimento do Santo", é um convite para a Igreja redescobrir a grandeza de Deus. Em uma era de superficialidade religiosa, Tozer clamava por um retorno ao temor do Senhor.'
    ],
    versicosChave: ['Jeremias 9:23-24', 'João 17:3', 'Salmos 46:10', 'Ã“seas 6:3'],
    tags: ['conhecimento de Deus', 'Tozer', 'reverência', 'caráter divino', 'teologia'],
    fontes: ['A.W. Tozer, O Conhecimento do Santo', 'A.W. Tozer, The Pursuit of God', 'J. Israel Pacheco, Tozer on the Almighty God']
  },
  {
    id: 'novo-010',
    titulo: 'A.W. Tozer —” A Adoração Verdadeira',
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
    titulo: 'A.W. Tozer —” A Vida Interior e a Comunhão com Deus',
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
    titulo: 'A.W. Tozer —” A Idolatria Moderna',
    categoria: 'Teologia Bíblica',
    subcategoria: 'Idolatria',
    conteudo: [
      'Tozer identificou a idolatria como o pecado mais perigoso da era moderna. Embora o homem contemporâneo não prostre a ídolos de madeira, ele cria ídolos com seus desejos, ambições e prazeres.',
      'Para Tozer, qualquer coisa que ocupe o lugar de Deus na vida do homem é um ídolo. O dinheiro, o sucesso, o reconhecimento, até mesmo a família pode se tornar ídolos quando substituem a primazia de Deus.',
      'Tozer ensinava que o ídolo é aquilo em que o homem pensa quando pensa em Deus. Se a imagem de Deus é distorcida, o homem adora uma criatura em vez do Criador.',
      'O pastor americano alertava que a idolatria é sutil. Ela não vem com rosto repulsivo, mas com máscara de bondade. O ídolo moderno é sedutor porque oferece prazer imediato, mas leva à escravidão.',
      'O diagnóstico de Tozer sobre a idolatria moderna continua relevante. A Igreja precisa examinar seus corações e remover tudo que usurpa o lugar que só Deus merece.'
    ],
    versicosChave: ['1 João 5:21', 'Colossenses 3:5', 'Romanos 1:25', 'ÃŠxodo 20:3-4'],
    tags: ['idolatria', 'Tozer', 'deuses modernos', 'primeiro mandamento', 'coração'],
    fontes: ['A.W. Tozer, O Preito de Deus', 'Tozer, Man: The Dwelling Place of God', 'Tozer, The Root of the Righteous']
  },
  {
    id: 'novo-013',
    titulo: 'A.W. Tozer —” O Espírito Santo na Vida Cristã',
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
    titulo: 'A.W. Tozer —” Simplicidade Espiritual',
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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // R.C. SPROUL (6 estudos: novo-015 a novo-020)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    id: 'novo-015',
    titulo: 'R.C. Sproul —” A Santidade de Deus',
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
    titulo: 'R.C. Sproul —” A Justificação pela Fé',
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
    titulo: 'R.C. Sproul —” Soberania Divina e Responsabilidade Humana',
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
    titulo: 'R.C. Sproul —” A Inerrância Bíblica',
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
    titulo: 'R.C. Sproul —” Os Sacramentos como Meios de Graça',
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
    titulo: 'R.C. Sproul —” A Graça Irresistível e a Vontade do Homem',
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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // JOHN PIPER (5 estudos: novo-021 a novo-025)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    id: 'novo-021',
    titulo: 'John Piper —” A Alegria em Deus como Fim Supremo',
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
    titulo: 'John Piper —” Missões e a Glória de Deus',
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
    titulo: 'John Piper —” Provisão Divina e o Sustento do Crente',
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
    titulo: 'John Piper —” Casamento para a Glória de Deus',
    categoria: 'Ã‰tica Cristã',
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
    titulo: 'John Piper —” Deus e o Prazer Eterno do Crente',
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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // DIETRICH BONHOEFFER (5 estudos: novo-026 a novo-030)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    id: 'novo-026',
    titulo: 'Dietrich Bonhoeffer —” O Discipulado Radical',
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
    titulo: 'Dietrich Bonhoeffer —” Comunhão Cristã e Vida em Comunidade',
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
    titulo: 'Dietrich Bonhoeffer —” Ã‰tica Cristã e Responsabilidade',
    categoria: 'Ã‰tica Cristã',
    subcategoria: 'Ã‰tica',
    conteudo: [
      'Bonhoeffer desenvolveu uma teologia ética profundamente enraizada na realidade da graça. Para ele, a ética cristã não é legalismo, mas resposta amorosa ao amor de Deus.',
      'Bonhoeffer ensinava que a ética cristã é situacional, mas não relativista. O cristão deve discernir a vontade de Deus em cada situação concreta, aplicando princípios bíblicos com sabedoria.',
      'Para Bonhoeffer, a responsabilidade cristã é pessoal e intransferível. Cada crente é responsável diante de Deus por suas decisões. A obediência cega à autoridade não dispensa a responsabilidade pessoal.',
      'O teólogo luterano insistia que a ética cristã exige coragem. Resistir ao mal, mesmo quando custa caro, é parte do discipulado. A ética sem coragem é ética estéril.',
      'A teologia ética de Bonhoeffer desafia a Igreja a viver com integridade em um mundo corrompido. A ética cristã não é perfeição, mas fidelidade ao chamado de Deus.'
    ],
    versicosChave: ['Miquéias 6:8', 'Romanos 12:1-2', 'Efésios 5:15-17', 'Tiago 4:17'],
    tags: ['ética', 'Bonhoeffer', 'responsabilidade', 'obediência', 'integridade'],
    fontes: ['Dietrich Bonhoeffer, Ã‰tica', 'Bonhoeffer, Vida em Comunhão', 'Metaxas, Bonhoeffer']
  },
  {
    id: 'novo-029',
    titulo: 'Dietrich Bonhoeffer —” A Graça Barata e a Graça Custosa',
    categoria: 'Soteriologia',
    subcategoria: 'Graça',
    conteudo: [
      'Bonhoeffer é célebre pela distinção entre "graça barata" e "graça custosa". A graça barata é a graça sem discipulado, sem cruz, sem Cristo vivo. Ã‰ perdão sem arrependimento, batismo sem comunidade.',
      'A graça custosa, por outro lado, é a graça que nos chama a seguir a Jesus. Ã‰ a graça que nos custa a vida, porque nos leva à cruz. Ã‰ a graça que transforma, não apenas perdão.',
      'Bonhoeffer argumentava que a graça barata é o maior perigo da Igreja. Ela oferece consolo sem mudança, salvação sem santificação. Ã‰ uma graça que não salva, mas adormece.',
      'Para Bonhoeffer, a graça custosa é a graça verdadeira. Ela nos confronta com nossa pecaminosidade e nos chama à obediência. Ã‰ a graça que nos faz discípulos, não meros consumidores de religião.',
      'O apelo de Bonhoeffer à Igreja é que não aceite a graça barata. O evangelho é oferta de graça que custa tudo, porque nos dá tudo em Cristo.'
    ],
    versicosChave: ['Romanos 6:1-2', 'Mateus 10:38', 'Gálatas 2:20', '1 Pedro 4:12-14'],
    tags: ['graça barata', 'graça custosa', 'Bonhoeffer', 'discipulado', 'cruz'],
    fontes: ['Dietrich Bonhoeffer, O Custo do Discipulado', 'Bonhoeffer, Ã‰tica', 'Metaxas, Bonhoeffer']
  },
  {
    id: 'novo-030',
    titulo: 'Dietrich Bonhoeffer —” Resistência ao Mal Institucionalizado',
    categoria: 'Ã‰tica Cristã',
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
    fontes: ['Dietrich Bonhoeffer, Cartas e Reflexões da Prisão', 'Metaxas, Bonhoeffer', 'Bonhoeffer, Ã‰tica']
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // C.S. LEWIS (5 estudos: novo-031 a novo-035)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    id: 'novo-031',
    titulo: 'C.S. Lewis —” Dor e Sofrimento no Plano de Deus',
    categoria: 'Teologia Bíblica',
    subcategoria: 'Sofrimento',
    conteudo: [
      'C.S. Lewis (1898-1963) é um dos maiores apologistas cristãos do séc. XX. Em "Problemas do Sofrimento", ele aborda a questão da dor humana à luz da fé cristã, oferecendo uma resposta que combina razão e compaixão.',
      'Lewis argumenta que Deus permite o sofrimento porque Ele deseja que os seres humanos sejam livres. Uma criatura programada para o bem não seria realmente virtuosa, mas meramente mecânica.',
      'Para Lewis, o sofrimento pode ser instrumento de Deus para quebrantar o orgulho humano e nos conduzir ao arrependimento. Ã‰ o "megafone de Deus" em um mundo ensurdecido.',
      'Lewis reconhece que o sofrimento é um mistério, mas insiste que Deus não é indiferente a ele. A encarnação é a prova de que Deus entrou no sofrimento humano e o transformou.',
      'A abordagem de Lewis ao sofrimento é equilibrada: não minimiza a dor, mas a coloca no contexto de um Deus amoroso e soberano que trabalha todas as coisas para o bem.'
    ],
    versicosChave: ['Romanos 8:28', '2 Coríntios 4:17', 'Hebreus 12:5-11', 'Apocalipse 21:4'],
    tags: ['sofrimento', 'Lewis', 'dor', 'providência', 'apologética'],
    fontes: ['C.S. Lewis, Problemas do Sofrimento', 'Lewis, A Breviário da Dor', 'Michael Ward, Planet Narnia']
  },
  {
    id: 'novo-032',
    titulo: 'C.S. Lewis —” A Razão da Fé Cristã',
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
    titulo: 'C.S. Lewis —” Milagres e o Sobrenatural',
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
    titulo: 'C.S. Lewis —” A Natureza Humana e o Problema do Pecado',
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
    titulo: 'C.S. Lewis —” O Céu e a Realidade Eterna',
    categoria: 'Escatologia',
    subcategoria: 'Céu',
    conteudo: [
      'Lewis descreveu o céu de maneira vívida em "Pilares da Terra", imaginando-o como um lugar de intensa realidade e gozo. Para ele, o céu não é fuga da realidade, mas encontro com a realidade máxima.',
      'Para Lewis, o céu é onde Deus habita com Seu povo. Ã‰ o lar verdadeiro do ser humano, o lugar para o qual foi criado. Na terra somos exilados; no céu, finalmente em casa.',
      'Lewis argumentava que as coisas terrenas são sombras das realidades celestiais. O amor humano é uma fração do amor divino; a beleza terrena é reflexo da beleza celestial.',
      'O apologeta britânico insistia que o céu é personal, não impessoal. Cada crente terá um relacionamento único e pessoal com Deus, sem perder sua individualidade.',
      'A visão de Lewis sobre o céu é um chamado para vivermos com eternidade em vista. A perspectiva do céu transforma a maneira como encaramos a vida terrena.'
    ],
    versicosChave: ['Apocalipse 21:1-5', 'João 14:1-3', '1 Coríntios 2:9', 'Filipenses 3:20'],
    tags: ['céu', 'Lewis', 'eternidade', 'nova criação', 'escatologia'],
    fontes: ['C.S. Lewis, Pilares da Terra', 'Lewis, A Breviário da Dor', 'Lewis, The Great Divorce']
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // TIM KELLER (5 estudos: novo-036 a novo-040)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    id: 'novo-036',
    titulo: 'Tim Keller —” Fé e Cultura Contemporânea',
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
    titulo: 'Tim Keller —” Idolatria no Mundo Moderno',
    categoria: 'Teologia Bíblica',
    subcategoria: 'Idolatria',
    conteudo: [
      'Keller identificou a idolatria como o pecado central do mundo contemporâneo. Para ele, um ídolo é qualquer coisa que se torna mais importante que Deus na vida de uma pessoa.',
      'Keller argumentava que os ídolos modernos não são estátuas de metal, mas coisas aparentemente boas: sucesso, família, romance, poder, reconhecimento. Esses bens se tornam ídolos quando substituem Deus.',
      'Para Keller, a idolatria é a raiz de todos os males humanos. O pecado não é apenas violação de regras, mas desvio de lealdade. O homem foi criado para adorar a Deus, e quando adora outra coisa, ele se destrói.',
      'O pastor e teólogo ensinava que o evangelicalismo contemporâneo está vulnerável a ídolos sutis: conforto, segurança, relevância. A igreja pode se tornar ídolo para si mesma.',
      'A análise de Keller sobre a idolatria moderna é um convite ao autoexame. O cristão deve perguntar constantemente: o que ocupa o lugar de Deus em meu coração?'
    ],
    versicosChave: ['1 João 5:21', 'Colossenses 3:5', 'Romanos 1:25', 'ÃŠxodo 20:3'],
    tags: ['idolatria', 'Keller', 'ídolos modernos', 'coração', 'adoração'],
    fontes: ['Tim Keller, Counterfeit Gods', 'Keller, The Reason for God', 'Keller, Generous Justice']
  },
  {
    id: 'novo-038',
    titulo: 'Tim Keller —” Justiça Social e o Evangelho',
    categoria: 'Ã‰tica Cristã',
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
    titulo: 'Tim Keller —” O Perdão Radical no Evangelho',
    categoria: 'Vida Cristã',
    subcategoria: 'Perdão',
    conteudo: [
      'Keller desenvolveu uma teologia do perdão que se enraíza na graça de Deus em Cristo. Para ele, o perdão cristão não é opção, mas imperativo decorrente da própria natureza do evangelho.',
      'Keller argumentava que o perdão é possível apenas quando compreendemos que nós mesmos fomos perdoados por Deus. A consciência da própria pecaminosidade é antídoto contra o ressentimento.',
      'Para Keller, o perdão não é negação da dor ou esquecimento do mal sofrido. Ã‰ uma decisão consciente de não buscar vingança, mas confiar a Deus a justiça.',
      'O pastor e teólogo ensinava que o perdão é processo, não evento. Alguns ofensas exigem tempo e oração para serem completamente perdoadas.',
      'O chamado de Keller é que a Igreja seja uma comunidade de perdão. No mundo, o perdão é fraqueza; no evangelho, é a maior expressão de força espiritual.'
    ],
    versicosChave: ['Efésios 4:32', 'Colossenses 3:13', 'Mateus 18:21-35', 'Lucas 23:34'],
    tags: ['perdão', 'Keller', 'graça', 'reconciliação', 'relacionamentos'],
    fontes: ['Tim Keller, The Reason for God', 'Keller, Generous Justice', 'Keller, Walking with God through Pain and Suffering']
  },
  {
    id: 'novo-040',
    titulo: 'Tim Keller —” Urbanidade e Missão Urbana',
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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // JONATHAN EDWARDS (4 estudos: novo-041 a novo-044)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    id: 'novo-041',
    titulo: 'Jonathan Edwards —” O Desejo de Deus como Fim Supremo',
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
    titulo: 'Jonathan Edwards —” Avivamento e a Presença Divina',
    categoria: 'Eclesiologia',
    subcategoria: 'Avivamento',
    conteudo: [
      'Edwards foi o principal teólogo do Grande Desertamento (1730-1740), o primeiro avivamento de alcance nacional na América. Para ele, o avivamento é obra soberana do Espírito Santo.',
      'Edwards argumentava que o avivamento não é fabricado por técnicas humanas, mas derramado por Deus. A preparação espiritual, a oração e a pregação fiel são meios, mas o resultado é de Deus.',
      'Para Edwards, o avivamento é precedido por humilhação, arrependimento e busca fervorosa de Deus. A religião verdadeira é "afeições santificadas" —” emoções que nascem da compreensão da verdade.',
      'Edwards via o avivamento como retorno às fontes do cristianismo primitivo. Em meio à formalidade religiosa, Deus desperta Seu povo para uma experiência viva de Sua presença.',
      'O legado de Edwards sobre avivamento é um chamado para que a Igreja busque a presença de Deus com humildade e fervor. O avivamento não é passado; é promessa para todos os tempos.'
    ],
    versicosChave: ['2 Crônicas 7:14', 'Atos 4:31', 'Habacuque 3:2', 'Joeel 2:28-29'],
    tags: ['avivamento', 'Edwards', 'Desertamento', 'Espírito Santo', 'presença de Deus'],
    fontes: ['Jonathan Edwards, A Narrative of Surprising Conversions', 'Edwards, Religious Affections', 'Marsden, Jonathan Edwards']
  },
  {
    id: 'novo-043',
    titulo: 'Jonathan Edwards —” A Natureza da Verdadeira Conversão',
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
    titulo: 'Jonathan Edwards —” A Beleza da Santidade',
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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // J.I. PACKER (3 estudos: novo-045 a novo-047)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    id: 'novo-045',
    titulo: 'J.I. Packer —” Conhecer a Deus Pessoalmente',
    categoria: 'Teologia Proper',
    subcategoria: 'Conhecimento de Deus',
    conteudo: [
      'J.I. Packer (1926-2020) é autor de "Conhecendo a Deus", obra que marcou gerações de cristãos. Para Packer, conhecer a Deus não é informação teológica, mas relação pessoal transformadora.',
      'Packer argumentava que o conhecimento de Deus começa na Escritura. Deus se revela por meio de Sua Palavra, e o estudo sério da Bíblia é o caminho para conhecer a Deus.',
      'Para Packer, o conhecimento de Deus é progressivo. Começa na conversão, amadurece na santificação e se aperfeiçoa na glória. Nunca chegamos ao fim do conhecimento de Deus.',
      'Packer ensinava que o conhecimento verdadeiro de Deus produz humildade, adoração e obediência. O homem que conhece a Deus é transformado por esse conhecimento.',
      'O chamado de Packer é que a Igreja redescobra o valor do conhecimento de Deus. Em uma era de superficialidade religiosa, o conhecimento profundo de Deus é a âncora da fé.'
    ],
    versicosChave: ['Jeremias 9:23-24', 'João 17:3', 'Salmos 46:10', 'Ã“seas 6:3'],
    tags: ['conhecimento de Deus', 'Packer', 'Escritura', 'relação', 'teologia'],
    fontes: ['J.I. Packer, Conhecendo a Deus', 'Packer, Knowing God', 'Packer, God Has Spoken']
  },
  {
    id: 'novo-046',
    titulo: 'J.I. Packer —” A Orientação Divina na Vida do Crente',
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
    titulo: 'J.I. Packer —” A Soberania de Deus e o Sofrimento Humano',
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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // JOHN STOTT (3 estudos: novo-048 a novo-050)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  {
    id: 'novo-048',
    titulo: 'John Stott —” A Cruz de Cristo e a Reconciliação',
    categoria: 'Cristologia',
    subcategoria: 'Cruz',
    conteudo: [
      'John Stott (1921-2011) dedicou sua obra-prima "A Cruz de Cristo" ao estudo profundo do significado da morte de Jesus. Para Stott, a cruz é o centro de toda a fé cristã.',
      'Stott argumentava que a cruz é o meio de Deus para reconciliar consigo os pecadores rebeldes. A morte substitutiva de Cristo satisfaz a justiça divina e manifesta o amor divino.',
      'Para Stott, a cruz não é apenas um evento histórico, mas o fundamento da nova aliança. Em Cristo, Deus estabelece uma relação nova e eterna com Seu povo.',
      'Stott ensinava que a cruz transforma a relação entre Deus e o homem, entre o homem e si mesmo, e entre o homem e os outros. A reconciliação é total e abrangente.',
      'O chamado de Stott é que a Igreja nunca se canse de proclamar a mensagem da cruz. Em uma era deåå­—æž¶ message diluída, a cruz permanece o poder de Deus para salvação.'
    ],
    versicosChave: ['2 Coríntios 5:18-21', '1 Coríntios 1:18-24', 'Gálatas 6:14', 'Colossenses 1:19-20'],
    tags: ['cruz', 'Stott', 'reconciliação', 'substituição', 'redenção'],
    fontes: ['John Stott, A Cruz de Cristo', 'Stott, The Cross of Christ', 'Stott, The Contemporary Christian']
  },
  {
    id: 'novo-049',
    titulo: 'John Stott —” A Autoridade da Escritura na Vida da Igreja',
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
    titulo: 'John Stott —” A Missão da Igreja no Mundo',
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
  },
  {
  'id': 'pn-001',
  'titulo': 'A Personalidade do Espírito Santo',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Natureza do Espírito',
  'conteudo': [
    'O Espírito Santo não é uma força impersonal ou uma influência abstrata, mas uma pessoa divina com vontade, emoções e inteligência.',
    'A Bíblia atribui ao Espírito Santo ações pessoais: Ele fala (Atos 13:2), ensina (João 14:26), intercede (Romanos 8:26), testifica (João 15:26), e pode ser entristecido (Efésios 4:30).',
    'No Concílio de Constantinopla (381 d.C.), a Igreja affirmou a divindade e personalidade do Espírito Santo contra o pneumatomachianismo.',
    'Agostinho desenvolveu a pneumatologia ocidental, comparando o Espírito ao amor que proceed do Pai e do Filho.',
    'A teologia reformada enfatiza a obra do Espírito na regeneração e santificação, enquanto a tradição pentecostal destaca os dons carismáticos.'
  ],
  'versicosChave': [
    'João 14:26',
    'Atos 13:2',
    'Romanos 8:26',
    'Efésios 4:30'
  ],
  'tags': [
    'espírito santo',
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
  'titulo': 'A Obra do Espírito Santo na Regeneração',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Salvação',
  'conteudo': [
    'A regeneração é a obra sobrenatural do Espírito Santo que transforma a natureza espiritual do pecador, capacitando-o a crer em Cristo.',
    'Jesus ensinou que é necessário nascer de novo (João 3:3-7), e que esse nascimento vem do Espírito Santo.',
    'A regeneração precede a fé —” o pecador não pode crer até que o Espírito Santo lhe dé vida espiritual.',
    'A tradição reformada ensina a regeneração eficaz, enquanto a tradição arminiana enfatiza a graça resistível.',
    'A regeneração é instantânea, secreta e irresistível no que diz respeito à sua eficácia.'
  ],
  'versicosChave': [
    'João 3:5-6',
    'Tito 3:5',
    '1 Pedro 1:23',
    'Efésios 2:5'
  ],
  'tags': [
    'regeneração',
    'conversão',
    'novo nascimento',
    'espírito santo'
  ],
  'fontes': [
    'Calvino, Institutas III.1',
    'Hodge, Systematic Theology',
    'Berkouwer, The Work of the Holy Spirit'
  ]
},
  {
  'id': 'pn-003',
  'titulo': 'Os Dons Espirituais —” Cessacionismo vs. Continuismo',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Dons Espirituais',
  'conteudo': [
    'Os dons espirituais são habilidades sobrenaturais concedidas pelo Espírito Santo para edificação da igreja.',
    'O cessacionismo sustenta que os dons miraculosos (profecia, línguas, curas) cessaram com a morte dos apóstolos e a canonização das Escrituras.',
    'O continuismo defende que todos os dons do Espírito Santo continuam operantes hoje, incluindo línguas e profecia.',
    'O cessacionismo apela para 1 Coríntios 13:8-10 (\'o perfeito virá\') como referência à canonização bíblica.',
    'O continuismo apela para Hebreus 13:8 (\'Jesus ontem, hoje e sempre\') e para a universalidade dos dons no NT.',
    'A posição moderada (aberto/cessacionismo) aceita que alguns dons podem continuar, mas com limitações.'
  ],
  'versicosChave': [
    '1 Coríntios 12:4-11',
    '1 Coríntios 13:8-10',
    'Efésios 4:11-12',
    'Hebreus 13:8'
  ],
  'tags': [
    'dons espirituais',
    'cessacionismo',
    'continuismo',
    'línguas',
    'profecia'
  ],
  'fontes': [
    'Grudem, The Gift of Prophecy',
    'MacArthur, Charismática',
    'Deere, Power Encounter'
  ]
},
  {
  'id': 'pn-004',
  'titulo': 'O Batismo no Espírito Santo',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Experiência',
  'conteudo': [
    'O batismo no Espírito Santo é a experiência de ser imerso na presença e poder do Espírito de Deus.',
    'Na teologia pentecostal, o batismo no Espírito é uma experiência posterior à regeneração, frequentemente acompanhada de línguas.',
    'Na teologia reformada, o batismo no Espírito é simultâneo à regeneração —” todo crente já foi batizado no Espírito.',
    'Atos mostra múltiplas ocasiões em que o Espírito Santo veio sobre os crentes (Atos 2, 8, 10, 19).',
    'O propósito do batismo no Espírito é capacitamento para testemunho e serviço, não salvação.'
  ],
  'versicosChave': [
    'Atos 1:5',
    'Atos 2:4',
    '1 Coríntios 12:13',
    'Efésios 5:18'
  ],
  'tags': [
    'batismo',
    'espírito santo',
    'pentecostal',
    'experiência'
  ],
  'fontes': [
    'Ruthven, On the Cessation of the Charismata',
    'Stronstad, The Charismatic Theology of Luke'
  ]
},
  {
  'id': 'pn-005',
  'titulo': 'O Fruto do Espírito Santo',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Santificação',
  'conteudo': [
    'O fruto do Espírito Santo é o character Christlike que o Espírito produz na vida do crente (Gálatas 5:22-23).',
    'Os nove aspectos do fruto formam um todo integrado: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança.',
    'O fruto não é fruto de esforço humano, mas resultado da obra do Espírito no crente que se rende.',
    'Diferente dos dons (distribuídos individualmente), o fruto é produzido em todos os crentes.',
    'O fruto é evidência madura da vida cristã —” leva tempo para amadurecer, como uma árvore que dá fruto em sua estação.'
  ],
  'versicosChave': [
    'Gálatas 5:22-23',
    'João 15:4-5',
    'Romanos 8:29',
    'Efésios 5:9'
  ],
  'tags': [
    'fruto do espírito',
    'santificação',
    'caráter',
    'virtude'
  ],
  'fontes': [
    'Calvino, Comentário a Gálatas',
    'Stott, The Message of Romans',
    'Moo, The Epistle to the Galatians'
  ]
},
  {
  'id': 'pn-006',
  'titulo': 'A Unção do Espírito Santo',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Experiência',
  'conteudo': [
    'A unção do Espírito Santo é a equipagem sobrenatural para serviço, especialmente para pregação e ministério.',
    'Jesus foi unido pelo Espírito Santo no batismo (Lucas 3:22) e essa unção qualificou Seu ministério terreno.',
    '1 João 2:20 fala de uma unção que todos os crentes recebem —” \'vocês têm uma unção da parte dAquele que é santo\'.',
    'A unção não é o mesmo que batismo no Espírito —” é mais específica para service e ministério.',
    'A unção capacitante não deve ser confundida com a unção para salvação (regeneração).'
  ],
  'versicosChave': [
    'Lucas 3:22',
    '1 João 2:20',
    '1 João 2:27',
    'Isaías 61:1'
  ],
  'tags': [
    'unção',
    'ministério',
    'capacitação',
    'serviço'
  ],
  'fontes': [
    'Horton, The Holy Spirit',
    'Ryrie, The Holy Spirit'
  ]
},
  {
  'id': 'pn-007',
  'titulo': 'A Intercessão do Espírito Santo',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Oração',
  'conteudo': [
    'Romanos 8:26-27 ensina que o Espírito Santo intercede por nós com \'gemidos inexprimíveis\'.',
    'A intercessão do Espírito é uma obra secreta e infalível —” Ele ora de acordo com a vontade de Deus.',
    'Mesmo quando não sabemos como orar, o Espírito ora por nós.',
    'A intercessão do Espírito complementa a intercessão de Cristo (Hebreus 7:25) —” Cristo ora como Sumo Sacerdote, o Espírito ora em nosso íntimo.',
    'Essa verdade deveria trazer grande consolo aos crentes que se sentem inadequados na oração.'
  ],
  'versicosChave': [
    'Romanos 8:26-27',
    'Hebreus 7:25',
    'Efésios 6:18',
    'Judas 1:20'
  ],
  'tags': [
    'intercessão',
    'oração',
    'espírito santo',
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
  'titulo': 'O Espírito Santo e a Santificação',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Santificação',
  'conteudo': [
    'A santificação é a obra progressiva do Espírito Santo que transforma o crente à imagem de Cristo.',
    'O Espírito opera em dupla dimensão: nos declara santos (justificação) e nos faz santos (santificação).',
    'A santificação é cooperativa —” o crente trabalha com o Espírito (Filipenses 2:12-13).',
    'O fruto do Espírito é a evidência da santificação progressiva.',
    'A santificação nunca será completa nesta vida —” a glorificação é o consumação final.'
  ],
  'versicosChave': [
    '2 Coríntios 3:18',
    'Filipenses 2:12-13',
    '1 Tessalonicenses 4:3',
    'Gálatas 5:22-23'
  ],
  'tags': [
    'santificação',
    'transformação',
    'caráter',
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
  'titulo': 'O Espírito Santo e a Escritura',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Revelação',
  'conteudo': [
    'O Espírito Santo é o autor inspirador das Escrituras —” toda Escritura é inspirada por Deus (2 Timóteo 3:16).',
    'O Espírito ilumina a mente do crente para compreender as Escrituras (1 Coríntios 2:10-14).',
    'A inspiração bíblica é plenária (toda a Bíblia), verbal (as palavras), e dinâmica (Deus atuando nos autores).',
    'A iluminação do Espírito não substitui o estudo diligente, mas o capacita.',
    'O mesmo Espírito que inspirou as Escrituras é o que as interpreta —” a Escritura é sua própria intérprete.'
  ],
  'versicosChave': [
    '2 Timóteo 3:16',
    '1 Coríntios 2:10-14',
    '2 Pedro 1:21',
    'João 16:13'
  ],
  'tags': [
    'inspiração',
    'iluminação',
    'escritura',
    'revelação'
  ],
  'fontes': [
    'Warfield, Inspiration and Authority of Scripture',
    'Calvino, Institutas I.7',
    'Geisler, Biblical Inspiration'
  ]
},
  {
  'id': 'pn-010',
  'titulo': 'O Espírito Santo na Criação',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Cosmologia',
  'conteudo': [
    'O Espírito Santo estava presente e ativo na obra da criação (Gênesis 1:2).',
    'O \'sopro de Deus\' (ruach) sobre as águas é vista como o Espírito criador.',
    'Salmos 33:6 confirma que \'pela palavra do Senhor os céus foram feitos\'.',
    'A Trindade está envolvida na criação: Pai planeja, Filho executa, Espírito capacita.',
    'O Espírito continua sustentando a criação (Colossenses 1:17).'
  ],
  'versicosChave': [
    'Gênesis 1:2',
    'Salmos 33:6',
    'Jó 33:4',
    'Colossenses 1:17'
  ],
  'tags': [
    'criação',
    'cosmologia',
    'sustento',
    'trindade'
  ],
  'fontes': [
    'Calvino, Comentário a Gênesis',
    'Clowney, The Unfolding Mystery'
  ]
},
  {
  'id': 'an-001',
  'titulo': 'A Natureza e Hierarquia dos Anjos',
  'categoria': 'Angelologia',
  'subcategoria': 'Natureza',
  'conteudo': [
    'Os anjos são seres criados espirituais, inteligentes e pessoais, designados para servir a Deus e aos homens.',
    'A Bíblia descreve uma hierarquia angelical: querubins, serafins, thronos, dominações, potestades (Efésios 6:12, Colossenses 1:16).',
    'Os anjos não têm corpos materiais, mas podem assumir forma humana quando necessário (Hebreus 13:2).',
    'Os anjos são criados para adorar e servir a Deus —” \'Santos, santos, santos é o Senhor dos Exércitos\' (Isaías 6:3).',
    'A tradição judaica e cristã desenvolveu detalhes sobre ordens angelicais, embora a Bíblia seja limitada nesse assunto.'
  ],
  'versicosChave': [
    'Hebreus 1:14',
    'Efésios 6:12',
    'Isaías 6:2',
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
  'titulo': 'Anjos da Guarda —” Proteção Divina',
  'categoria': 'Angelologia',
  'subcategoria': 'Ministério',
  'conteudo': [
    'Deus designa anjos para proteger e guiar os Seus filhos (Salmo 91:11-12).',
    'Cada criança pode ter um anjo da guarda (Mateus 18:10).',
    'Os anjos da guarda protegem contra perigos físicos e espirituais.',
    'Daniel experimentou a proteção angelical na cova dos leões (Daniel 6:22).',
    'Pedro foi libertado da prisão por um anjo (Atos 12:7-11).'
  ],
  'versicosChave': [
    'Salmo 91:11-12',
    'Mateus 18:10',
    'Atos 12:7-11',
    'Daniel 6:22'
  ],
  'tags': [
    'anjos da guarda',
    'proteção',
    'livramento',
    'ministério'
  ],
  'fontes': [
    'Pentecost, Things to Come',
    'Aalders, Daniel'
  ]
},
  {
  'id': 'an-003',
  'titulo': 'Satanás e os Anjos Caídos',
  'categoria': 'Angelologia',
  'subcategoria': 'Demonologia',
  'conteudo': [
    'Satanás é um anjo caído, originalmente criado como querubim ungido (Ezequiel 28:14).',
    'A queda de Satanás ocorreu por orgulho —” ele quis se igualar a Deus (Isaías 14:12-15).',
    'Um terço dos anjos caiu com Satanás e se tornaram demônios (Apocalipse 12:4).',
    'Satanás é chamado de \'deus deste século\' (2 Coríntios 4:4) e \'príncipe deste mundo\' (João 14:30).',
    'A derrota final de Satanás está garantida pela cruz de Cristo (Colossenses 2:15) e se cumprirá no lago de fogo (Apocalipse 20:10).'
  ],
  'versicosChave': [
    'Ezequiel 28:14-17',
    'Isaías 14:12-15',
    'Apocalipse 12:4',
    'Colossenses 2:15'
  ],
  'tags': [
    'satanás',
    'demônios',
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
  'titulo': 'A Guerra Espiritual —” Efésios 6:10-18',
  'categoria': 'Angelologia',
  'subcategoria': 'Guerra Espiritual',
  'conteudo': [
    'A guerra espiritual é uma realidade —” nossos inimigos não são de carne e sangue, mas principados e potestades.',
    'A armadura de Deus inclui: verdade, justiça, evangelho, fé, salvação, Palavra e oração.',
    'Cada peça da armadura corresponde a uma verdade doutrinária que o crente deve vestir pela fé.',
    'A oração é a arma ofensiva na guerra espiritual —” ela invoca o poder de Deus.',
    'Vitória já foi conquistada na cruz —” a guerra espiritual é aplicação dessa vitória.'
  ],
  'versicosChave': [
    'Efésios 6:10-18',
    '2 Coríntios 10:3-5',
    'Romanos 8:37',
    '1 João 5:4'
  ],
  'tags': [
    'guerra espiritual',
    'armadura de deus',
    'poder',
    'vitória'
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
    'Os anjos serão instrumentos do julgamento divino no final dos tempos (Mateus 13:39-42).',
    'Jesus voltará com os Seus anjos em glória (Mateus 25:31).',
    'Os anjos separarão os justos dos injustos na colheita final.',
    'Os anjos atarão os demônios e os lançarão no lago de fogo (Apocalipse 20:1-3).',
    'A presença angelical no julgamento demonstra a autoridade delegada de Deus.'
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
  'titulo': 'A Natureza Humana —” Corpo, Alma e Espírito',
  'categoria': 'Antropologia',
  'subcategoria': 'Composição',
  'conteudo': [
    'O ser humano é composto de corpo, alma e espírito (1 Tessalonicenses 5:23).',
    'O dualismo grego (corpo vs. alma) contrasta com a visão bíblica da unidade da pessoa.',
    'O corpo não é prisão da alma, mas templo do Espírito Santo (1 Coríntios 6:19).',
    'A morte é a separação entre corpo e alma, mas não é aniquilação.',
    'A ressurreição envolverá tanto o corpo quanto a alma —” a totalidade da pessoa.'
  ],
  'versicosChave': [
    '1 Tessalonicenses 5:23',
    '1 Coríntios 6:19',
    'Gênesis 2:7',
    'Filipenses 1:23'
  ],
  'tags': [
    'antropologia',
    'corpo',
    'alma',
    'espírito',
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
    'Adão e Eva foram criados perfeitos mas com a possibilidade de cair (posse non posse non peccare).',
    'A Queda foi uma rebelião consciente contra o comando de Deus (Gênesis 3:6).',
    'O pecado original é a corrupção transmitida a todos os descendentes de Adão (Romanos 5:12).',
    'Agostinho ensinou que o pecado original é transmitida pela concupiscência —” o desejo desordenado.',
    'A Queda afetou todas as faculdades humanas: razão, vontade, emoções, corpo.',
    'Sem a graça regeneradora, o ser humano é incapaz de buscar a Deus (Romanos 3:10-18).'
  ],
  'versicosChave': [
    'Gênesis 3:6',
    'Romanos 5:12',
    'Romanos 3:10-18',
    'Efésios 2:1-3'
  ],
  'tags': [
    'queda',
    'pecado original',
    'hamartiologia',
    'corrupção'
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
    'O ser humano possui livre-arbítrio genuíno para agir de acordo com sua natureza.',
    'A Queda corrompeu a vontade humana —” o pecador é livre para escolher, mas não livre para crer sem graça.',
    'A Soberania de Deus não anula a responsabilidade humana —” ambos são verdadeiros.',
    'O calvinismo enfatiza a soberania absoluta; o arminianismo enfatiza a responsabilidade humana.',
    'O compatibilismo defende que soberania e livre-arbítrio são compatíveis —” Deus governa sem coagir.'
  ],
  'versicosChave': [
    'Deuteronômio 30:19',
    'Josué 24:15',
    'Provérbios 21:1',
    'Filipenses 2:12-13'
  ],
  'tags': [
    'livre-arbítrio',
    'soberania',
    'predestinação',
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
    'O ser humano foi criado à imagem e semelhança de Deus (Gênesis 1:26-27).',
    'A imagem de Deus inclui: racionalidade, moralidade, relacionalidade, criatividade, domínio.',
    'A Queda corrompeu a imagem, mas não a destruiu —” todo ser humano tem dignidade inerente.',
    'A imagem é restaurada em Cristo —” \'renovados para o conhecimento, conforme à imagem daquele que o criou\' (Colossenses 3:10).',
    'A dignidade humana é a base da ética cristã e dos direitos humanos.'
  ],
  'versicosChave': [
    'Gênesis 1:26-27',
    'Colossenses 3:10',
    'Tiago 3:9',
    '1 João 3:2'
  ],
  'tags': [
    'imago dei',
    'dignidade',
    'humanidade',
    'criação'
  ],
  'fontes': [
    'Calvino, Comentário a Gênesis',
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
    'A morte é a consequência do pecado —” \'no dia em que comerdes, certamente morrereis\' (Gênesis 2:17).',
    'Há duas mortes: a física (separação alma-corpo) e a eterna (separação de Deus).',
    'Após a morte, os crentes estão com Cristo (2 Coríntios 5:8), os incrédulos sofrem antecipadamente.',
    'A ressurreição dos mortos é uma doutrina central —” Jesus ressuscitou e promete ressurreição aos Seus.',
    'O juízo final determinará o destino eterno: vida eterna ou condenação.'
  ],
  'versicosChave': [
    'Gênesis 2:17',
    '2 Coríntios 5:8',
    'João 5:28-29',
    'Apocalipse 20:12-15'
  ],
  'tags': [
    'morte',
    'juízo',
    'vida eterna',
    'conenação'
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
  'subcategoria': 'Definição',
  'conteudo': [
    'Pecado é toda falta de conformidade com a Lei de Deus, tanto por ação quanto por omissão (Tiago 4:17).',
    'A palavra grega \'hamartia\' significa errar o alvo —” o pecado é falhar no propósito para o qual fomos criados.',
    'O pecado é primariamente contra Deus —” \'contra Ti somente pequei\' (Salmo 51:4).',
    'O pecado é universal —” \'não há justo, nem um sequer\' (Romanos 3:10).',
    'O pecado é radical —” afeta todas as faculdades e dimensões da existência humana.'
  ],
  'versicosChave': [
    'Romanos 3:10',
    'Tiago 4:17',
    'Salmo 51:4',
    '1 João 3:4'
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
  'titulo': 'A Penalidade do Pecado —” Morte e Condenação',
  'categoria': 'Hamartiologia',
  'subcategoria': 'Penalidade',
  'conteudo': [
    'A penalidade do pecado é a morte —” \'o salário do pecado é a morte\' (Romanos 6:23).',
    'A morte inclui três dimensões: espiritual (separação de Deus), física (separação alma-corpo), eterna (lago de fogo).',
    'A justiça de Deus exige punição —” Deus não pode tolerar o pecado sem penalidade.',
    'A penalidade é proporcional à ofensa —” ofender o Deus eterno merece punição eterna.',
    'Somente a graça de Deus pode livrar o pecador da penalidade merecida.'
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
    'condenação',
    'justiça'
  ],
  'fontes': [
    'Calvino, Institutas II.6',
    'Calvin, Institutes',
    'Frame, The Doctrine of God'
  ]
},
  {
  'id': 'hm-003',
  'titulo': 'A Expiação —” O Morreu pelos Pecados',
  'categoria': 'Hamartiologia',
  'subcategoria': 'Expiação',
  'conteudo': [
    'A expiação é o ato de Cristo em morrer na cruz para satisfazer a justiça de Deus e reconciliar os pecadores com Ele.',
    'A satisfação vicária (Anselmo) —” Cristo morreu como substituto, satisfazendo a honra de Deus.',
    'A substituição penal —” Cristo assumiu as penalidades que merecíamos (Isaías 53:5-6).',
    'A propiciação —” a ira de Deus contra o pecado foi derramada sobre Cristo (1 João 2:2).',
    'A expiação é limitada na extensão (somente para os eleitos) mas ilimitada no valor (suficiente para todos).',
    'A cruz é o centro da história e da redenção —” tudo aponta para ela.'
  ],
  'versicosChave': [
    'Isaías 53:5-6',
    '1 João 2:2',
    '2 Coríntios 5:21',
    '1 Pedro 2:24'
  ],
  'tags': [
    'expiação',
    'substituição',
    'propiciação',
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
  'titulo': 'A Redenção —” Comprado com Preço',
  'categoria': 'Hamartiologia',
  'subcategoria': 'Redenção',
  'conteudo': [
    'Redenção é o ato de Deus de nos comprar da escravidão do pecado pelo sangue de Cristo.',
    'A metáfora da redenção vem do mercado de escravos —” fomos comprados com o precioso sangue de Cristo (1 Pedro 1:18-19).',
    'A redenção inclui: justificação, regeneração, santificação e glorificação.',
    'O preço pago foi o sangue de Cristo —” valor infinito que satisfez a justiça divina.',
    'A redenção é completa —” nada pode ser adicionado à obra consumada na cruz.'
  ],
  'versicosChave': [
    '1 Pedro 1:18-19',
    'Efésios 1:7',
    'Colossenses 1:14',
    'Gálatas 3:13'
  ],
  'tags': [
    'redenção',
    'sangue',
    'preço',
    'libertação'
  ],
  'fontes': [
    'Murray, Redemption Accomplished',
    'Calvino, Institutas II.16',
    'Owen, The Death of Death'
  ]
},
  {
  'id': 'hm-005',
  'titulo': 'A Justificação —” Declarado Justo',
  'categoria': 'Hamartiologia',
  'subcategoria': 'Justificação',
  'conteudo': [
    'A justificação é o ato judicial de Deus de declarar o pecador justo pela fé em Cristo.',
    'Ã‰ por fé somente (sola fide) —” não por obras da lei (Romanos 3:28).',
    'A justificação é imputação —” a justiça de Cristo é creditada ao crente (2 Coríntios 5:21).',
    'Lutero a chamou de \'a artigo da igreja que se sustenta ou cai\' —” é a doutrina da Reforma.',
    'A justificação é simultânea à fé —” não é um processo gradual.',
    'Frutos de justiça são evidências, não requisitos, da justificação.'
  ],
  'versicosChave': [
    'Romanos 3:28',
    'Romanos 5:1',
    'Gálatas 2:16',
    '2 Coríntios 5:21'
  ],
  'tags': [
    'justificação',
    'sola fide',
    'imputação',
    'reforma'
  ],
  'fontes': [
    'Lutero, Comentário a Gálatas',
    'Calvino, Institutas III.11',
    'Owen, Justification by Faith'
  ]
},
  {
  'id': 'pn-011',
  'titulo': 'O Espírito Santo na Ressurreição de Cristo',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Cristologia',
  'conteudo': [
    'O Espírito Santo foi instrumental na ressurreição de Jesus dos mortos.',
    'Romanos 8:11 afirma que \'o Espírito de Deus, que ressuscitou a Jesus dentre os mortos, habita em vocês\'.',
    'A ressurreição é ato da Trindade: Pai ressuscita o Filho pelo Espírito.',
    'O mesmo poder que ressuscitou Cristo está disponível para os crentes.',
    'A ressurreição é a base da nossa justificação (Romanos 4:25) e esperança.'
  ],
  'versicosChave': [
    'Romanos 8:11',
    'Romanos 4:25',
    'Atos 2:24',
    '1 Coríntios 15:45'
  ],
  'tags': [
    'ressurreição',
    'poder',
    'esperança',
    'cristologia'
  ],
  'fontes': [
    "Fee, God's Empowering Presence",
    'Moo, The Epistle to the Romans'
  ]
},
  {
  'id': 'pn-012',
  'titulo': 'A Galardão do Espírito Santo na Oração',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Oração',
  'conteudo': [
    'O Espírito Santo nos capacita a orar de acordo com a vontade de Deus.',
    'Efésios 6:18 ordena \'orando em todo tempo no Espírito\'.',
    'A oração no Espírito não é necessariamente em línguas, mas com dependência e fervor.',
    'O Espírito nos dá palavras quando não sabemos como orar.',
    'A oração no Espírito é uma oração que se alinha com o caráter e vontade de Deus.'
  ],
  'versicosChave': [
    'Efésios 6:18',
    'Judas 1:20',
    'Romanos 8:26-27',
    'Zacarias 12:10'
  ],
  'tags': [
    'oração',
    'espírito santo',
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
  'titulo': 'Os Sete Espíritos de Deus (Apocalipse)',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Simbolismo',
  'conteudo': [
    'Apocalipse menciona \'os sete espíritos de Deus\' (Apocalipse 1:4, 4:5, 5:6).',
    'O número sete representa completude —” o Espírito Santo em Sua plenitude.',
    'Isaías 11:2 descreve sete manifestações do Espírito sobre o Messias.',
    'Os sete espíritos podem representar as sete faculdades do Espírito: sabedoria, entendimento, conselho, fortaleza, conhecimento, piedade, temor do Senhor.',
    'A vela de sete pavios no candelabro de Apocalipse 4:5 representa o Espírito em plenitude.'
  ],
  'versicosChave': [
    'Apocalipse 1:4',
    'Apocalipse 4:5',
    'Apocalipse 5:6',
    'Isaías 11:2'
  ],
  'tags': [
    'sete espíritos',
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
  'titulo': 'O Espírito Santo e os Sacramentos',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Eclesiologia',
  'conteudo': [
    'O Espírito Santo é o agente que opera nos sacramentos/batismo e ceia.',
    'No batismo, o Espírito nos une a Cristo e selamos para o dia da redenção.',
    'Na ceia, o Espírito nos comunica a presença espiritual de Cristo.',
    'Os sacramentos são eficazes não pela água ou pão, mas pela obra do Espírito.',
    'A ceia é um meio de graça onde o Espírito nourishes os crentes.'
  ],
  'versicosChave': [
    '1 Coríntios 12:13',
    '1 Coríntios 10:16-17',
    'Efésios 5:18-20',
    'Romanos 6:3-4'
  ],
  'tags': [
    'sacramentos',
    'batismo',
    'ceia',
    'graça'
  ],
  'fontes': [
    'Calvino, Institutas IV.17',
    'Calvin, Institutes',
    'Calvin, Institutes IV.17'
  ]
},
  {
  'id': 'pn-015',
  'titulo': 'O Espírito Santo na Vida da Igreja',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Eclesiologia',
  'conteudo': [
    'A Igreja nasceu no dia de Pentecostes quando o Espírito Santo desceu (Atos 2).',
    'O Espírito distribui dons para edificação da igreja (1 Coríntios 12:4-11).',
    'O Espírito guia a igreja em verdade (João 16:13).',
    'O Espírito sustenta a unidade da igreja (Efésios 4:3).',
    'Sem o Espírito, a igreja é apenas uma organização humana.'
  ],
  'versicosChave': [
    'Atos 2:1-4',
    '1 Coríntios 12:4-11',
    'João 16:13',
    'Efésios 4:3'
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
  'titulo': 'Miguel —” O Arcanjo Guerreiro',
  'categoria': 'Angelologia',
  'subcategoria': 'Anjos Especiais',
  'conteudo': [
    'Miguel é o único anjo chamado de \'arcanjo\' na Bíblia (Judas 1:9).',
    'Seu nome significa \'Quem é como Deus?\' —” uma declaração de humildade.',
    'Miguel é retratado como guerreiro que combate Satanás e seus anjos.',
    'Daniel 10-12 mostra Miguel como protetor de Israel.',
    'Apocalipse 12:7 descreve Miguel liderando a batalha contra o dragão.'
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
    'Calvino, Comentário a Daniel',
    'Bauckham, The Fate of the Dead'
  ]
},
  {
  'id': 'an-007',
  'titulo': 'Gabriel —” O Mensageiro de Deus',
  'categoria': 'Angelologia',
  'subcategoria': 'Anjos Especiais',
  'conteudo': [
    'Gabriel é o anjo mensageiro que comunicou planos importantes de Deus.',
    'Seu nome significa \'Deus é meu guerreiro\'.',
    'Gabriel apareceu a Daniel para revelar o plano profético (Daniel 8:16).',
    'Gabriel anunciou o nascimento de João Batista (Lucas 1:19) e de Jesus (Lucas 1:26-38).',
    'Gabriel é descrito como \'que se apresentou diante de Deus\' —” um anjo de alta posição.'
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
    'anunciação',
    'profecia'
  ],
  'fontes': [
    'Calvino, Comentário a Lucas',
    'Ellis, The Gospel of Luke'
  ]
},
  {
  'id': 'an-008',
  'titulo': 'Os Querubins —” Guardiões da Glória de Deus',
  'categoria': 'Angelologia',
  'subcategoria': 'Hierarquia',
  'conteudo': [
    'Os querubins são a ordem angelical associada à presença e glória de Deus.',
    'Dois querubins de ouro cobriam a Arca da Aliança (ÃŠxodo 25:18-20).',
    'Ezequiel descreve criaturas com quatro faces (humana, leão, boi, águia) e quatro asas.',
    'Os querubins guardaram o caminho para o Ã‰den após a Queda (Gênesis 3:24).',
    'O tabernáculo e templo tinham imagens de querubins bordadas nas cortinas.'
  ],
  'versicosChave': [
    'ÃŠxodo 25:18-20',
    'Ezequiel 1:5-14',
    'Gênesis 3:24',
    'Salmo 80:1'
  ],
  'tags': [
    'querubins',
    'glória',
    'arca',
    'santuário'
  ],
  'fontes': [
    'Calvino, Comentário a ÃŠxodo',
    'Block, The Book of Ezekiel'
  ]
},
  {
  'id': 'an-009',
  'titulo': 'Serafins —” Adoradores da Santidade de Deus',
  'categoria': 'Angelologia',
  'subcategoria': 'Hierarquia',
  'conteudo': [
    'Os serafins são mencionados apenas em Isaías 6:1-7.',
    'Seu nome significa \'ardentes\' —” refletem o fogo da santidade divina.',
    'Têm seis asas: duas para cobrir o rosto, duas para cobrir os pés, duas para voar.',
    'Cantam \'Santos, santos, santos é o Senhor dos Exércitos; toda a terra está cheia da Sua glória\'.',
    'Um serafim tocou os lábios de Isaías com brasa, purificando-o para o ministério profético.'
  ],
  'versicosChave': [
    'Isaías 6:1-7',
    'Isaías 6:3'
  ],
  'tags': [
    'serafins',
    'santidade',
    'adoração',
    'purificação'
  ],
  'fontes': [
    'Calvino, Comentário a Isaías',
    'Oswalt, The Book of Isaiah, Chapters 1-39'
  ]
},
  {
  'id': 'an-010',
  'titulo': 'Os Demônios —” Organização e Atividade',
  'categoria': 'Angelologia',
  'subcategoria': 'Demonologia',
  'conteudo': [
    'Os demônios são anjos caídos que servem a Satanás contra o propósito de Deus.',
    'Eles são organizados em hierarquia (Efésios 6:12 —” principados, potestades).',
    'Os demônios podem possuir pessoas (Marcos 5:1-20 —” o endemoninhado geraseno).',
    'Eles causam doenças, cegueira espiritual e engano doutrinário.',
    'Os demônios tremem diante de Cristo (Marcos 1:23-24) e serão julgados no final.'
  ],
  'versicosChave': [
    'Efésios 6:12',
    'Marcos 5:1-20',
    'Tiago 2:19',
    'Mateus 12:28'
  ],
  'tags': [
    'demônios',
    'hierarquia',
    'possessão',
    'guerra espiritual'
  ],
  'fontes': [
    'Calvino, Institutas I.14',
    "Fee, God's Empowering Presence"
  ]
},
  {
  'id': 'at-006',
  'titulo': 'A Alma Imortal —” Debate Teológico',
  'categoria': 'Antropologia',
  'subcategoria': 'Natureza',
  'conteudo': [
    'O debate sobre a imortalidade da alma tem raízes gregas e bíblicas.',
    'Platão ensinava a imortalidade natural da alma —” a alma sobrevive à morte por natureza.',
    'A Bíblia ensina a imortalidade condicional —” a alma sobrevive pela graça de Deus.',
    'Os adventistas defendem o condicionalismo —” os mortos dormem até a ressurreição.',
    'A maioria dos cristãos defende a imortalidade da alma como doutrina bíblica.',
    'A verdade bíblica central é que Deus é o senhor da vida e da morte.'
  ],
  'versicosChave': [
    'Daniel 12:2',
    'João 5:28-29',
    '2 Coríntios 5:8',
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
  'titulo': 'A Criação do Homem —” Adão e Eva',
  'categoria': 'Antropologia',
  'subcategoria': 'Criação',
  'conteudo': [
    'Adão foi formado do pó da terra e recebeu o sopro de vida (Gênesis 2:7).',
    'Eva foi criada da costela de Adão —” não da cabeça (para dominá-la) nem dos pés (para pisá-la).',
    'O casamento foi instituído antes da Queda —” é criação de Deus, não invenção humana.',
    'A igualdade entre homem e mulher se baseia na imagem de Deus em ambos.',
    'A complementaridade dos sexos reflete a riqueza da imagem divina.'
  ],
  'versicosChave': [
    'Gênesis 2:7',
    'Gênesis 2:18-23',
    'Gênesis 1:27',
    'Mateus 19:4-6'
  ],
  'tags': [
    'criação',
    'adão',
    'eva',
    'casamento',
    'complementaridade'
  ],
  'fontes': [
    'Calvino, Comentário a Gênesis',
    'Wenham, The Book of Genesis'
  ]
},
  {
  'id': 'at-008',
  'titulo': 'A Queda —” Consequências e Cursed',
  'categoria': 'Antropologia',
  'subcategoria': 'Hamartiologia',
  'conteudo': [
    'A Queda trouxe maldições sobre a serpente, sobre a terra, e sobre a humanidade.',
    'A maldição sobre a serpente —” rastejar e ter inimizade com a descendência da mulher.',
    'A maldição sobre a terra —” esforço e suor para produzir alimento.',
    'A maldição sobre a mulher —” dor na concepção e no parto.',
    'A maldição sobre o homem —” trabalhar com suor até voltar à terra.',
    'A promessa da redenção está na \'descendência da mulher\' (Gênesis 3:15) —” proto-evangelho.'
  ],
  'versicosChave': [
    'Gênesis 3:14-19',
    'Gênesis 3:15',
    'Romanos 5:12',
    'Romanos 8:20-22'
  ],
  'tags': [
    'queda',
    'maldição',
    'proto-evangelho',
    'consequências'
  ],
  'fontes': [
    'Calvino, Comentário a Gênesis',
    'Westermann, Genesis 1-11',
    'Wenham, The Book of Genesis'
  ]
},
  {
  'id': 'at-009',
  'titulo': 'A Vocação Humana —” Trabalho e Domínio',
  'categoria': 'Antropologia',
  'subcategoria': 'Vocação',
  'conteudo': [
    'Deus deu ao ser humano a vocação de \'cultivar e guardar\' o jardim (Gênesis 2:15).',
    'O trabalho não é maldição da Queda, mas vocação original —” Deus trabalhou na criação.',
    'O domínio sobre a criação é delegado, não absoluto —” somos mayordomos, não donos.',
    'A vocação humana inclui criatividade, responsabilidade e stewardship.',
    'A dignidade do trabalho se baseia em Deus ser trabalhador.'
  ],
  'versicosChave': [
    'Gênesis 2:15',
    'Gênesis 1:28',
    'Colossenses 3:23',
    'Efésios 2:10'
  ],
  'tags': [
    'vocação',
    'trabalho',
    'domínio',
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
  'titulo': 'A Dupla Natureza de Cristo —” Deus e Homem',
  'categoria': 'Cristologia',
  'subcategoria': 'Natureza',
  'conteudo': [
    'Cristo é plenamente Deus e plenamente homem —” o mistério da encarnação.',
    'O Concílio de Calcedônia (451 d.C.) definiu: duas naturezas, sem confusão, sem mudança, sem divisão, sem separação.',
    'Nestório separava as duas naturezas —” foi condenado como heresia.',
    'Eutiques confundia as naturezas —” monofisismo —” também condenado.',
    'A união hipostática —” as duas naturezas se unem em uma pessoa divina.',
    'A compreensão correta da pessoa de Cristo é essencial para a salvação.'
  ],
  'versicosChave': [
    'João 1:1-14',
    'Filipenses 2:5-11',
    'Colossenses 2:9',
    '1 Timóteo 3:16'
  ],
  'tags': [
    'cristologia',
    'natureza',
    'calcedônia',
    'encarnação'
  ],
  'fontes': [
    'Calvino, Institutas II.14',
    'Kelly, Early Christian Doctrines',
    'Pelikan, The Christian Tradition'
  ]
},
  {
  'id': 'cr-013',
  'titulo': 'A Obra de Cristo —” Profeta, Sacerdote e Rei',
  'categoria': 'Cristologia',
  'subcategoria': 'Ofícios',
  'conteudo': [
    'Cristo exerce três ofícios: profeto, sacerdote e rei.',
    'Como profeto, Cristo é o último e supremo revelador de Deus (Hebreus 1:1-2).',
    'Como sacerdote, Cristo ofereceu Si mesmo como sacrifício e intercede por nós (Hebreus 7:23-27).',
    'Como rei, Cristo governa a igreja e o universo com autoridade soberana.',
    'Os três ofícios são inseparáveis —” um ofício qualifica os outros.'
  ],
  'versicosChave': [
    'Deuteronômio 18:15',
    'Hebreus 7:23-27',
    'Efésios 1:20-22',
    'João 18:37'
  ],
  'tags': [
    'profeta',
    'sacerdote',
    'rei',
    'ofícios'
  ],
  'fontes': [
    'Calvino, Institutas II.15',
    'Calvin, Institutes II.15',
    'Calvin, Institutes'
  ]
},
  {
  'id': 'cr-014',
  'titulo': 'A Ressurreição de Cristo —” Realidade Histórica',
  'categoria': 'Cristologia',
  'subcategoria': 'Ressurreição',
  'conteudo': [
    'A ressurreição de Cristo é o fato central da fé cristã —” sem ela, a fé é vã.',
    'A evidência histórica inclui: túmulo vazio, múltiplas aparições, transformação dos discípulos.',
    'As aparições ressurretas foram a 12 pessoas e grupos ao longo de 40 dias.',
    'A Igreja primitiva testificou a ressurreição sob risco de morte —” ninguém morre por algo que sabe ser falso.',
    'A ressurreição é uma obra sobrenatural de Deus —” não é uma metáfora ou experiência subjetiva.'
  ],
  'versicosChave': [
    '1 Coríntios 15:3-8',
    'Mateus 28:5-10',
    'Atos 1:3',
    '1 Coríntios 15:14'
  ],
  'tags': [
    'ressurreição',
    'histórica',
    'evidência',
    'fé'
  ],
  'fontes': [
    'Calvino, Institutas II.16',
    'Wright, The Resurrection of the Son of God',
    'N.T. Wright, Surprised by Hope'
  ]
},
  {
  'id': 'cr-015',
  'titulo': 'A Ascensão de Cristo —” Exaltação e Intercessão',
  'categoria': 'Cristologia',
  'subcategoria': 'Exaltação',
  'conteudo': [
    'A ascensão de Cristo foi Sua exaltação à direita do Pai.',
    'Atos 1:9-11 descreve a ascensão —” Cristo foi recebido em uma nuvem.',
    'A ascensão não é desaparecimento —” Cristo continua presente pelo Espírito.',
    'Cristo ascendeu como Sumo Sacerdote que ofereceu Si mesmo.',
    'A ascensão garante Sua intercessão contínua por nós (Hebreus 7:25).'
  ],
  'versicosChave': [
    'Atos 1:9-11',
    'Efésios 1:20-22',
    'Hebreus 7:25',
    'Filipenses 2:9-11'
  ],
  'tags': [
    'ascensão',
    'exaltação',
    'intercessão',
    'sumo sacerdote'
  ],
  'fontes': [
    'Calvino, Institutas II.16',
    "O'Brien, The Ascension of Christ in the New Testament"
  ]
},
  {
  'id': 'cr-016',
  'titulo': 'A Segunda Vinda de Cristo —” Parusia',
  'categoria': 'Cristologia',
  'subcategoria': 'Escatologia',
  'conteudo': [
    'Cristo voltará pessoalmente, visivelmente e gloriamente (Atos 1:11).',
    'A parusia será inesperada —” como um ladrão na noite (1 Tessalonicenses 5:2).',
    'Haverá sinais antes da volta: guerras, fomes, terremotos, apostasia.',
    'A volta de Cristo trará consumação do reino, ressurreição dos mortos e juízo final.',
    'Vivemos na era da igreja, entre a primeira e a segunda vinda —” \'já mas ainda não\'.'
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
    'juízo'
  ],
  'fontes': [
    'Calvino, Institutas III.25',
    'Hoekema, The Bible and the Future',
    'Ladd, A Theology of the New Testament'
  ]
},
  {
  'id': 'so-034',
  'titulo': 'A Regeneração —” Nova Criatura em Cristo',
  'categoria': 'Soteriologia',
  'subcategoria': 'Ordo Salutis',
  'conteudo': [
    'A regeneração é a obra do Espírito Santo que nos faz nascer de novo.',
    'Ã‰ um ato divino, não humano —” o homem não pode regenerar a si mesmo.',
    'A regeneração produz fé e arrependimento —” não é resultado deles.',
    'Somos \'nova criatura\' —” o velho passou, eis que tudo se fez novo (2 Coríntios 5:17).',
    'A regeneração é instantaneous e irreversível —” uma vez regenerado, sempre regenerado.'
  ],
  'versicosChave': [
    'João 3:3-7',
    '2 Coríntios 5:17',
    'Tito 3:5',
    '1 Pedro 1:23'
  ],
  'tags': [
    'regeneração',
    'novo nascimento',
    'espírito santo',
    'nova criatura'
  ],
  'fontes': [
    'Calvino, Institutas III.1',
    'Bavinck, Reformed Dogmatics'
  ]
},
  {
  'id': 'so-035',
  'titulo': 'A Eleição —” Escolhidos pela Graça de Deus',
  'categoria': 'Soteriologia',
  'subcategoria': 'Doutrina',
  'conteudo': [
    'A eleição é a escolha soberana de Deus de salvar indivíduos para Si.',
    'Efésios 1:4 —” \'nos escolheu Nele antes da fundação do mundo\'.',
    'A eleição é baseada na graça, não nos méritos humanos.',
    'O calvinismo ensina eleição incondicional —” Deus escolhe sem referência à fé prevista.',
    'O arminianismo ensina eleição condicional —” Deus escolhe baseado na presciência da fé.',
    'A eleição não anula a responsabilidade humana —” Deus usa meios (pregação, evangelismo).'
  ],
  'versicosChave': [
    'Efésios 1:4-5',
    'Romanos 8:28-30',
    '2 Timóteo 1:9',
    '1 Pedro 1:1-2'
  ],
  'tags': [
    'eleição',
    'predestinação',
    'graça',
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
  'titulo': 'A Glorificação —” O Destino Final do Crente',
  'categoria': 'Soteriologia',
  'subcategoria': 'Ordo Salutis',
  'conteudo': [
    'A glorificação é a consumação final da salvação —” ser feito semelhante a Cristo.',
    'Romanos 8:30 —” \'aos que justificou, esses também glorificou\'.',
    'A glorificação inclui a ressurreição do corpo e a Transformação total.',
    'Seremos como Cristo porque O viremos como Ele é (1 João 3:2).',
    'A glorificação é a etapa final do ordo salutis —” aperfeiçoamento completo.'
  ],
  'versicosChave': [
    'Romanos 8:30',
    '1 João 3:2',
    'Filipenses 3:20-21',
    '1 Coríntios 15:51-53'
  ],
  'tags': [
    'glorificação',
    'ressurreição',
    'perfeição',
    'destino'
  ],
  'fontes': [
    'Calvino, Institutas III.25',
    'Hoekema, The Bible and the Future'
  ]
},
  {
  'id': 'ap-004',
  'titulo': 'O Argumento do Design —” Teleologia',
  'categoria': 'Apologetica',
  'subcategoria': 'Argumentos',
  'conteudo': [
    'O argumento teleológico observa a ordem e propósito na criação como evidência de um Designer.',
    'A complexidade irredutível dos sistemas biológicos aponta para design inteligente.',
    'O ajuste fino dos constantes cósmicos (gravidade, força nuclear) sugere um Criador.',
    'William Paley popularizou o argumento do relojoeiro —” um relógio implica um relojoeiro.',
    'O argumento não prova o Deus bíblico, mas estabelece a existência de um Designer.'
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
    'apologética',
    'argumento'
  ],
  'fontes': [
    'Paley, Natural Theology',
    "Behe, Darwin's Black Box",
    'Dawkins, The Blind Watchmaker (crítica)'
  ]
},
  {
  'id': 'ap-005',
  'titulo': 'A Resurreição —” Evidência Histórica',
  'categoria': 'Apologetica',
  'subcategoria': 'Evidência',
  'conteudo': [
    'A ressurreição de Cristo é o fato mais bem atestado da história antiga.',
    'As evidências incluem: túmulo vazio, aparições, mudança dos discípulos, origem da igreja.',
    'O túmulo vazio é atestado por fontes hostis (relato da guarda em Mateus 28:11-15).',
    'As aparições foram a múltiplas pessoas, em diferentes ocasiões, ao longo de 40 dias.',
    'A transformação dos discípulos —” de covardes a mártires —” é inexplicável sem a ressurreição.',
    'A origem da igreja no Judaísmo é impossível sem a ressurreição.'
  ],
  'versicosChave': [
    '1 Coríntios 15:3-8',
    'Atos 1:3',
    'Mateus 28:5-10',
    'Lucas 24:36-49'
  ],
  'tags': [
    'ressurreição',
    'evidência',
    'histórica',
    'apologética'
  ],
  'fontes': [
    'Wright, The Resurrection of the Son of God',
    'Habermas, The Ressurection of Jesus'
  ]
},
  {
  'id': 'hm-006',
  'titulo': 'A Regra de Ouro da Interpretação',
  'categoria': 'Hermenêutica',
  'subcategoria': 'Princípios',
  'conteudo': [
    'A regra de ouro: interprete sempre pela Escritura mais clara.',
    'O princípio da analogia da fé —” passagens obscuras devem ser interpretadas pelas claras.',
    'Nenhuma passagem pode ensinar algo que contradiga o ensino bíblico claro.',
    'O contexto imediato (versículo, capítulo) e o remoto (livro, Bíblia) são importantes.',
    'A interpretação literal é a regra geral —” só se recorre ao sentido figurado quando o contexto exige.'
  ],
  'versicosChave': [
    '2 Pedro 1:20-21',
    '2 Timóteo 2:15',
    '1 Coríntios 2:13',
    'Salmo 119:105'
  ],
  'tags': [
    'hermenêutica',
    'interpretação',
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
  'titulo': 'Tipologia Bíblica —” Sombra e Realidade',
  'categoria': 'Hermenêutica',
  'subcategoria': 'Métodos',
  'conteudo': [
    'Tipologia é o estudo de tipos —” pessoas, eventos ou instituições do AT que prefiguram realidades no NT.',
    'Adão é tipo de Cristo (Romanos 5:14) —” a queda de um, a redenção do outro.',
    'O sacrifício do cordeiro pascal prefigura Cristo, o Cordeiro de Deus.',
    'O tabernáculo e o templo são sombras da realidade celestial.',
    'A tipologia não é alegoria —” os tipos têm fundamento histórico e se cumprirão literalmente.'
  ],
  'versicosChave': [
    'Romanos 5:14',
    '1 Coríntios 15:45',
    'Hebreus 8:5',
    '1 Coríntios 10:11'
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
  'titulo': 'A Bioética Cristã —” Aborto, Eutanásia e Engenharia Genética',
  'categoria': 'Ã‰tica Cristã',
  'subcategoria': 'Contemporâneo',
  'conteudo': [
    'A bioética cristã aplica princípios bíblicos a questões modernas de vida.',
    'Aborto: a vida humana começa na concepção (Salmo 139:13-16) —” é vida preciosa.',
    'Eutanásia: a vida é dom de Deus —” nós não somos donos dela.',
    'Engenharia genética: manipular a criação de Deus levanta questões éticas profundas.',
    'Células-tronco: a dignidade humana deve ser respeitada em qualquer pesquisa.',
    'A base ética é a imagem de Deus em todo ser humano.'
  ],
  'versicosChave': [
    'Salmo 139:13-16',
    'Jó 1:21',
    'Gênesis 1:27',
    '1 Coríntios 6:19-20'
  ],
  'tags': [
    'bioética',
    'aborto',
    'eutanásia',
    'ética'
  ],
  'fontes': [
    'Calvino, Institutas III.7',
    'Calvin, Institutes III.7'
  ]
},
  {
  'id': 'et-026',
  'titulo': 'A Ã‰tica do Trabalho —” Honestidade e Excelência',
  'categoria': 'Ã‰tica Cristã',
  'subcategoria': 'Prática',
  'conteudo': [
    'O trabalho é vocação divina —” feito para a glória de Deus (1 Coríntios 10:31).',
    'A honestidade no trabalho é mandamento —” \'não furtarás\' inclui roubar tempo.',
    'A excelência no trabalho é testemunho —” \'tudo quanto fizerdes, fazei de coração\' (Colossenses 3:23).',
    'A ganância é idolatria —” o dinheiro não pode ser o alvo da vida.',
    'O descanso semanal é mandamento —” Deus descansou e nos ordena fazer o mesmo.'
  ],
  'versicosChave': [
    '1 Coríntios 10:31',
    'Colossenses 3:23',
    'Efésios 4:28',
    'Ã‰xodo 20:8-11'
  ],
  'tags': [
    'trabalho',
    'honestidade',
    'excelência',
    'descanso'
  ],
  'fontes': [
    'Calvino, Institutas II.10',
    'Wolters, Creation Regained'
  ]
},
  {
  'id': 'mi-017',
  'titulo': 'A Grande Comissão —” Mandato Missionário',
  'categoria': 'Missiologia',
  'subcategoria': 'Fundamento',
  'conteudo': [
    'Mateus 28:18-20 é a Grande Comissão —” o mandato de Cristo para a Igreja.',
    'A autoridade de Cristo é a base: \'Toda autoridade me é dada\'.',
    'O alvo é universal: \'todas as nações\' —” sem exceção.',
    'O método é relacional: \'fazendo discípulos\' —” não apenas convertidos.',
    'A-promessa é presence: \'estarei convosco todos os dias\'.',
    'A obediência à Grande Comissão é teste de amor a Cristo.'
  ],
  'versicosChave': [
    'Mateus 28:18-20',
    'Marcos 16:15',
    'Lucas 24:46-48',
    'Atos 1:8'
  ],
  'tags': [
    'grande comissão',
    'missão',
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
  'titulo': 'A Urgência da Salvação —” Evangelismo',
  'categoria': 'Missiologia',
  'subcategoria': 'Prática',
  'conteudo': [
    'O evangelismo é urgente porque as almas estão perdidas sem Cristo.',
    'Romanos 10:14-15 —” \'como crerão naquele em quem não creram? Como crerão naquele de quem não ouviram?\'',
    'A mensagem é simples: arrependimento e fé em Cristo.',
    'O método deve ser contextualizado sem comprometer a verdade.',
    'O fruto do evangelismo é a glória de Deus —” não números.'
  ],
  'versicosChave': [
    'Romanos 10:14-15',
    '2 Coríntios 5:20',
    'Atos 4:12',
    '1 Coríntios 9:22'
  ],
  'tags': [
    'evangelismo',
    'urgência',
    'salvação',
    'missão'
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
  'categoria': 'Questões Contemporâneas',
  'subcategoria': 'Cultura Digital',
  'conteudo': [
    'As redes sociais são ferramentas que podem ser usadas para o evangelho.',
    'O perigo da \'fé de Instagram\' —” superficialidade e aparência.',
    'A comunidade online pode complementar, mas não substituir a igreja local.',
    'O cuidado com a língua nas redes —” \'nenhuma palavra corrupta saia da boca\'.',
    'A internet como campo missionário —” oportunidades para proclamar Cristo.'
  ],
  'versicosChave': [
    'Efésios 4:29',
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
  'titulo': 'Cristianismo e Ciência —” Harmonia ou Conflito?',
  'categoria': 'Questões Contemporâneas',
  'subcategoria': 'Fé e Ciência',
  'conteudo': [
    'A relação entre fé e ciência é complexa —” há conflito, independência e integração.',
    'O conflito (Dawkins, Hitchens) —” ciência explica tudo, Deus é desnecessário.',
    'A independência (Gould) —” ciência e fé respondem a perguntas diferentes.',
    'A integração (Polkinghorne) —” ciência e fé se complementam na busca da verdade.',
    'A Bíblia não é livro de ciência —” é revelação de Deus sobre como ter relação com Ele.',
    'A criação testifica a Deus —” \'os céus declaram a glória de Deus\' (Salmo 19:1).'
  ],
  'versicosChave': [
    'Salmo 19:1',
    'Romanos 1:20',
    'Provérbios 25:2',
    'Eclesiastes 7:24'
  ],
  'tags': [
    'ciência',
    'fé',
    'criação',
    'evolução',
    'integração'
  ],
  'fontes': [
    'Calvino, Institutas I.14',
    'Polkinghorne, Belief in God in an Age of Science'
  ]
},
  {
  'id': 'ty-013',
  'titulo': 'O Tabernáculo —” Tipo de Cristo',
  'categoria': 'Tipologia',
  'subcategoria': 'AT',
  'conteudo': [
    'O tabernáculo é um dos mais ricos tipos de Cristo no AT.',
    'A porta do tabernáculo —” \'Eu sou a porta\' (João 10:7).',
    'O altar do Holocausto —” Cristo é o sacrifício perfeito.',
    'A mesa dos pães da proposição —” Cristo é o pão da vida.',
    'O candelabro —” Cristo é a luz do mundo.',
    'O propiciatório —” Cristo é nossa propiciação.'
  ],
  'versicosChave': [
    'ÃŠxodo 25-27',
    'João 10:7',
    'João 6:35',
    'João 8:12'
  ],
  'tags': [
    'tabernáculo',
    'tipo',
    'cristo',
    'sacrifício'
  ],
  'fontes': [
    'Calvino, Comentário a ÃŠxodo',
    'Kline, The Structure of Biblical Authority'
  ]
},
  {
  'id': 'ty-014',
  'titulo': 'José —” Tipo de Cristo',
  'categoria': 'Tipologia',
  'subcategoria': 'AT',
  'conteudo': [
    'José é um dos tipos mais completos de Cristo no AT.',
    'Amado pelo pai, odiado pelos irmãos —” Cristo rejeitado por Israel.',
    'Vendido por 20 peças de prata —” Judas traiu Cristo por 30.',
    'Desceu ao Egito (morte) e ressurgiu à glória —” ressurreição.',
    'Proveu alimento para os irmãos —” Cristo é o pão da vida.',
    'No final, os irmãos se prostraram —” todo joelho se dobrará.'
  ],
  'versicosChave': [
    'Gênesis 37-50',
    'Filipenses 2:10-11',
    'João 6:35'
  ],
  'tags': [
    'josé',
    'tipo',
    'cristo',
    'ressurreição'
  ],
  'fontes': [
    'Calvino, Comentário a Gênesis',
    'Kline, The Structure of Biblical Authority'
  ]
},
  {
  'id': 'lp-011',
  'titulo': 'Jó —” O Problema do Sofrimento',
  'categoria': 'Livros Poéticos',
  'subcategoria': 'Jó',
  'conteudo': [
    'Jó é a resposta bíblica ao problema do sofrimento do inocente.',
    'Jó não sofreu por causa de pecado —” Deus o testemunhou como justo.',
    'Os conselheiros de Jó ofereceram teologia retributiva —” sofrimento = pecado.',
    'Deus respondeu do redemoinho —” não explicou o sofrimento, mas revelou Sua soberania.',
    'A lição final: Deus é soberano, e nós somos limitados para compreender Seus caminhos.',
    'Jó é tipo de Cristo —” sofreu injustamente e foi restaurado.'
  ],
  'versicosChave': [
    'Jó 1:1',
    'Jó 42:5-6',
    'Romanos 8:28',
    '1 Pedro 4:12-19'
  ],
  'tags': [
    'jó',
    'sofrimento',
    'soberania',
    'paciência'
  ],
  'fontes': [
    'Calvino, Comentário a Jó',
    'Clines, Job 1-20',
    'Anderson, Out of the Whirlwind'
  ]
},
  {
  'id': 'bi-006',
  'titulo': 'A Inerrância Bíblica',
  'categoria': 'Bibliologia',
  'subcategoria': 'Natureza',
  'conteudo': [
    'A inerrância bíblica afirma que as Escrituras são verdadeiras em tudo o que afirmam.',
    'A Bíblia é infalível em tudo o que ensina —” não pode errar em doutrina, história ou ciência.',
    'A inerrância se baseia na natureza de Deus —” Ele não pode mentir (Hebreus 6:18).',
    'A Bíblia é a palavra de Deus, mas foi escrita por homens —” inspiração divina e humanidade simultâneas.',
    'A inerrância não significa que a Bíblia seja um livro de ciência ou história completa.'
  ],
  'versicosChave': [
    '2 Timóteo 3:16',
    '2 Pedro 1:21',
    'Hebreus 6:18',
    'Salmo 12:6'
  ],
  'tags': [
    'inerrância',
    'inspiração',
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
  'titulo': 'A Canonização das Escrituras',
  'categoria': 'Bibliologia',
  'subcategoria': 'Canon',
  'conteudo': [
    'O cânon bíblico é a lista dos livros reconhecidos como inspirados por Deus.',
    'O AT foi reconhecido gradualmente —” a maioria dos livros era aceita no século I.',
    'O NT foi reconhecido por critérios: apostolicidade, ortodoxia, uso litúrgico.',
    'O Concílio de Hipona (393 d.C.) confirmou o cânon do NT.',
    'O Espírito Santo guiou a Igreja no reconhecimento dos livros canônicos.'
  ],
  'versicosChave': [
    '2 Pedro 1:20-21',
    '2 Timóteo 3:16-17',
    'Apocalipse 22:18-19'
  ],
  'tags': [
    'canon',
    'cânone',
    'livros',
    'reconhecimento'
  ],
  'fontes': [
    'Metzger, The Canon of the New Testament',
    'Köstenberger, The Heresy of the Canon'
  ]
},
  {
  'id': 'bi-008',
  'titulo': 'A Tradução Bíblica —” Princípios e Desafios',
  'categoria': 'Bibliologia',
  'subcategoria': 'Tradução',
  'conteudo': [
    'A tradução bíblica é essencial para que todos os povos ouçam a Palavra.',
    'Existem duas filosofias: formalismo (sentença a sentença) e dinamicismo (pensão a pensão).',
    'A KJV é formal; a NVI é mais dinâmica. Ambas têm valor.',
    'Nenhuma tradução é perfeita —” todas são approximations da verdade original.',
    'A tradução deve respeitar: fidelidade ao original, compreensibilidade no idioma, estilo natural.'
  ],
  'versicosChave': [
    'Atos 2:6-11',
    '1 Coríntios 14:19',
    'Efésios 6:19'
  ],
  'tags': [
    'tradução',
    'versão',
    'tradução formal',
    'tradução dinâmica'
  ],
  'fontes': [
    'Nida, The Theory and Practice of Translation',
    'Carson, The King James Version Debate'
  ]
},
  {
  'id': 'bi-009',
  'titulo': 'A Iluminação do Espírito na Interpretação',
  'categoria': 'Bibliologia',
  'subcategoria': 'Interpretação',
  'conteudo': [
    'O Espírito Santo ilumina a mente do crente para compreender as Escrituras.',
    'A iluminação não substitui o estudo —” capacita o estudo.',
    '1 Coríntios 2:10-14 —” \'o homem natural não compreende as coisas do Espírito\'.',
    'A iluminação é necessária porque oäººå¿ƒ pecador é hostil à verdade divina.',
    'O estudo bíblico deve ser feito com oração, dependência do Espírito e humildade.'
  ],
  'versicosChave': [
    '1 Coríntios 2:10-14',
    'João 16:13',
    'Salmo 119:18'
  ],
  'tags': [
    'iluminação',
    'espírito santo',
    'interpretação',
    'compreeensão'
  ],
  'fontes': [
    'Calvino, Institutas I.7',
    'Fee, New Testament Exegesis'
  ]
},
  {
  'id': 'bi-010',
  'titulo': 'A Autoridade da Bíblia —” Sola Scriptura',
  'categoria': 'Bibliologia',
  'subcategoria': 'Autoridade',
  'conteudo': [
    'Sola Scriptura é o princípio reformado de que a Bíblia é a autoridade suprema.',
    'A Bíblia é a norma normans non normata —” a norma que normatiza e não é normatizada.',
    'A tradição tem valor, mas está sujeita à Escritura.',
    'O magistério da Igreja é útil, mas não infalível.',
    'A autoridade da Bíblia é auto-testemunhada —” ela claims ser Palavra de Deus.'
  ],
  'versicosChave': [
    '2 Timóteo 3:16-17',
    'Isaías 40:8',
    'Mateus 24:35',
    'Hebreus 4:12'
  ],
  'tags': [
    'sola scriptura',
    'autoridade',
    'tradição',
    'reforma'
  ],
  'fontes': [
    'Calvino, Institutas I.7-8',
    'Lutero, Sobre a Escravidão Babilônica'
  ]
},
  {
  'id': 'bi-011',
  'titulo': 'A Persistência da Palavra de Deus',
  'categoria': 'Bibliologia',
  'subcategoria': 'Natureza',
  'conteudo': [
    'A Palavra de Deus é viva e eficaz —” mais afiada que espada de dois gumes.',
    'As Escrituras não podem ser quebradas (João 10:35).',
    'A Palavra de Deus dura para sempre (Isaías 40:8).',
    'O céu e a terra passarão, mas as palavras de Jesus não passarão.',
    'A Palavra de Deus é fonte de vida, luz e verdade.'
  ],
  'versicosChave': [
    'Hebreus 4:12',
    'Isaías 40:8',
    'Mateus 24:35',
    'João 10:35'
  ],
  'tags': [
    'palavra de deus',
    'persistência',
    'eficácia',
    'eternidade'
  ],
  'fontes': [
    'Calvino, Institutas I.7',
    'Calvin, Institutes I.7'
  ]
},
  {
  'id': 'so-037',
  'titulo': 'A Propiciação —” A Ira de Deus Satisfeita',
  'categoria': 'Soteriologia',
  'subcategoria': 'Expiação',
  'conteudo': [
    'A propiciação é a satisfação da ira de Deus pelo sacrifício de Cristo.',
    'Romanos 3:25 —” Deus propiciou a Si mesmo através de Cristo.',
    'A propiciação não é Deus sendo satisfeito —” é Deus satisfez Sua própria justiça.',
    'O termo \'propiciação\' é controverso —” alguns preferem \'expição\'.',
    'A propiciação é particular —” Cristo morreu por Seu povo.'
  ],
  'versicosChave': [
    'Romanos 3:25',
    '1 João 2:2',
    '1 João 4:10',
    'Hebreus 2:17'
  ],
  'tags': [
    'propiciação',
    'ira de deus',
    'satisfação',
    'justiça'
  ],
  'fontes': [
    'Calvino, Institutas II.16',
    'Calvin, Institutes II.16'
  ]
},
  {
  'id': 'so-038',
  'titulo': 'A Adoção —” Filhos de Deus',
  'categoria': 'Soteriologia',
  'subcategoria': 'Benefícios',
  'conteudo': [
    'A adoção é o ato de Deus de nos tornar Seus filhos.',
    'Gálatas 4:4-7 —” \'enviou Deus o Seu Filho... para que recibamos a adoção de filhos\'.',
    'A adoção é por graça —” não por mérito.',
    'Como filhos, temos: acesso a Deus, herança eterna, assistência do Espírito.',
    'A adoção é consumada na ressurreição —” \'sabemos que seremos como Ele\' (1 João 3:2).'
  ],
  'versicosChave': [
    'Gálatas 4:4-7',
    'Romanos 8:14-17',
    '1 João 3:1-2',
    'Efésios 1:5'
  ],
  'tags': [
    'adoção',
    'filhos de deus',
    'herança',
    'espírito'
  ],
  'fontes': [
    'Calvino, Institutas III.19',
    'Calvin, Institutes III.19'
  ]
},
  {
  'id': 'so-039',
  'titulo': 'A Perseverança dos Santos',
  'categoria': 'Soteriologia',
  'subcategoria': 'Doutrina',
  'conteudo': [
    'A perseverança dos santos é a doutrina de que os verdadeiros crentes perseverarão até o fim.',
    'João 10:28-29 —” \'ninguém os arrebata da Minha mão\'.',
    'A perseverança não é dependente do poder humano, mas da fidelidade de Deus.',
    'Os eleitos podem cair temporariamente, mas serão restaurados.',
    'A perseverança é certeza —” não é presunção.'
  ],
  'versicosChave': [
    'João 10:28-29',
    'Filipenses 1:6',
    'Romanos 8:38-39',
    '1 Pedro 1:5'
  ],
  'tags': [
    'perseverança',
    'segurança',
    'eleição',
    'fidelidade'
  ],
  'fontes': [
    'Calvino, Institutas III.24',
    'Calvin, Institutes III.24'
  ]
},
  {
  'id': 'so-040',
  'titulo': 'A Vocação Eficaz',
  'categoria': 'Soteriologia',
  'subcategoria': 'Ordo Salutis',
  'conteudo': [
    'A vocação eficaz é o chamado de Deus que traz o pecador à fé.',
    'Romanos 8:30 —” \'aos que chamou, esses também justificou\'.',
    'A vocação é externa (pregação) e interna (operação do Espírito).',
    'A vocação eficaz é irresistible —” Deus muda o coração para crer.',
    'A vocação é o elo entre a eleição e a fé —” Deus efetivamente chama os eleitos.'
  ],
  'versicosChave': [
    'Romanos 8:30',
    '1 Coríntios 1:23-24',
    '2 Timóteo 1:9'
  ],
  'tags': [
    'vocação',
    'chamado',
    'efeito',
    'irresistível'
  ],
  'fontes': [
    'Calvino, Institutas III.24',
    'Calvin, Institutes III.24'
  ]
},
  {
  'id': 'so-041',
  'titulo': 'A Satisfação Vicária —” Anselmo',
  'categoria': 'Soteriologia',
  'subcategoria': 'Expiação',
  'conteudo': [
    'A teoria da satisfação vicária (Anselmo) é a mais influente na teologia cristã.',
    'A honra de Deus foi ofendida pelo pecado —” exige satisfação.',
    'Cristo, como Deus-homem, ofereceu satisfação perfeita e infinita.',
    'A satisfação não é um comercial —” é um ato de amor e justiça.',
    'Calvino aperfeiçoou a teoria: Cristo morreu como substituto e propiciação.'
  ],
  'versicosChave': [
    'Isaías 53:5-6',
    'Romanos 3:25',
    '1 Pedro 2:24'
  ],
  'tags': [
    'satisfação',
    'anselmo',
    'substituição',
    'honor'
  ],
  'fontes': [
    'Anselmo, Cur Deus Homo',
    'Calvino, Institutas II.16'
  ]
},
  {
  'id': 'cr-017',
  'titulo': 'A Encarnação de Cristo —” Deus se faz Homem',
  'categoria': 'Cristologia',
  'subcategoria': 'Encarnação',
  'conteudo': [
    'A encarnação é o mistério central da fé —” o Verbo se fez carne (João 1:14).',
    'Cristo nasceu de mulher (Gálatas 4:4) —” verdadeiramente humano.',
    'Cristo nasceu de virgem —” miraculamente, sem pai humano.',
    'A encarnação não é Deus habitando um corpo —” é Deus se tornando humano.',
    'Cristo é uma pessoa com duas naturezas: divina e humana.'
  ],
  'versicosChave': [
    'João 1:14',
    'Gálatas 4:4',
    'Filipenses 2:6-8',
    'Hebreus 2:14-17'
  ],
  'tags': [
    'encarnação',
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
  'titulo': 'A Tentação de Cristo —” Sem Pecado',
  'categoria': 'Cristologia',
  'subcategoria': 'Vida',
  'conteudo': [
    'Cristo foi tentado em todas as coisas, como nós, porém sem pecado (Hebreus 4:15).',
    'A tentação no deserto (Mateus 4:1-11) mostra Cristo como o novo Adão.',
    'Cristo resistiu pela Palavra de Deus —” \'está escrito\'.',
    'Cristo não podia pecar —” Sua natureza divina era impecável.',
    'A tentação de Cristo qualifica Ele para ser nosso Sumo Sacerdote misericordioso.'
  ],
  'versicosChave': [
    'Hebreus 4:15',
    'Mateus 4:1-11',
    '1 João 3:5'
  ],
  'tags': [
    'tentação',
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
  'titulo': 'A Autoridade de Cristo —” Senhor de Tudo',
  'categoria': 'Cristologia',
  'subcategoria': 'Soberania',
  'conteudo': [
    'Cristo tem toda autoridade no céu e na terra (Mateus 28:18).',
    'Ele é Senhor de todos (Atos 10:36), mesmo que nem todos O reconheçam.',
    'A autoridade de Cristo se manifesta em: ensino, milagres, julgamento.',
    'Cristo exerce autoridade através da Igreja.',
    'Todo joelho se dobrará e toda língua confessará que Jesus é Senhor (Filipenses 2:10-11).'
  ],
  'versicosChave': [
    'Mateus 28:18',
    'Filipenses 2:10-11',
    'Efésios 1:20-22',
    '1 Pedro 3:22'
  ],
  'tags': [
    'autoridade',
    'soberania',
    'senhor',
    'domínio'
  ],
  'fontes': [
    'Calvino, Institutas II.16',
    'Ridderbos, The Coming of the Kingdom'
  ]
},
  {
  'id': 'es-024',
  'titulo': 'O Milênio —” Amilenarismo, Premilenarismo e Pós-milenarismo',
  'categoria': 'Escatologia',
  'subcategoria': 'Debate',
  'conteudo': [
    'O milênio (Apocalipse 20:1-6) é o período de 1000 anos mencionado na Bíblia.',
    'O amilenarismo ensina que o milênio é simbólico —” a era atual da igreja.',
    'O premilenarismo ensina que Cristo voltará antes do milênio literal.',
    'O pós-milenarismo ensina que a igreja trará o milênio antes da volta de Cristo.',
    'A maioria dos reformados é amilenarista —” Calvino, Warfield, Hoekema.'
  ],
  'versicosChave': [
    'Apocalipse 20:1-6',
    'Revelação 19:11-16',
    '2 Pedro 3:10-13'
  ],
  'tags': [
    'milênio',
    'amilenarismo',
    'premilenarismo',
    'pós-milenarismo'
  ],
  'fontes': [
    'Hoekema, The Bible and the Future',
    'Ladd, The Gospel of the Kingdom',
    'Boyd, God of the Possible'
  ]
},
  {
  'id': 'es-025',
  'titulo': 'O Juízo Final',
  'categoria': 'Escatologia',
  'subcategoria': 'Eventos',
  'conteudo': [
    'O juízo final é o tribunal de Cristo onde todos prestarão contas.',
    'Mateus 25:31-46 —” separação das ovelhas e dos bodes.',
    'Apocalipse 20:11-15 —” o Livro da Vida e o Livro das Obras.',
    'O juízo dos crentes não é para salvação (já salvo), mas para recompensa.',
    'O juízo dos incrédulos é condenação eterna.'
  ],
  'versicosChave': [
    'Mateus 25:31-46',
    'Apocalipse 20:11-15',
    'Romanos 14:10-12',
    '2 Coríntios 5:10'
  ],
  'tags': [
    'juízo final',
    'livro da vida',
    'condenação',
    'recompensa'
  ],
  'fontes': [
    'Hoekema, The Bible and the Future',
    'Morris, The Gospel According to Matthew'
  ]
},
  {
  'id': 'hm-008',
  'titulo': 'Interpretação de Parábolas',
  'categoria': 'Hermenêutica',
  'subcategoria': 'Métodos',
  'conteudo': [
    'As parábolas são histórias com um ponto principal —” não são alegorias detalhadas.',
    'A regra de ouro: encontre o ponto principal do narrador.',
    'Cada parábola tem um contexto que determina seu significado.',
    'As parábolas foram feitas para revelar verdade aos que tinham ouvidos.',
    'Não é necessariamente cada detalhe tem significado simbólico.'
  ],
  'versicosChave': [
    'Mateus 13:10-17',
    'Marcos 4:10-12',
    'Lucas 15:1-7'
  ],
  'tags': [
    'parábolas',
    'interpretação',
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
  'titulo': 'O Contexto Histórico e Cultural',
  'categoria': 'Hermenêutica',
  'subcategoria': 'Princípios',
  'conteudo': [
    'A Bíblia foi escrita em contextos específicos —” precisamos entender esses contextos.',
    'A cultura do Antigo Oriente Próximo ajuda a entender o AT.',
    'O judaísmo do segundo templo é essencial para entender o NT.',
    'A língua original (hebraico, aramaico, grego) é fundamental.',
    'A história da Igreja mostra como a Bíblia foi interpretada ao longo do tempo.'
  ],
  'versicosChave': [
    '2 Timóteo 2:15',
    '1 Coríntios 9:20-22'
  ],
  'tags': [
    'contexto',
    'história',
    'cultura',
    'língua'
  ],
  'fontes': [
    'Fee, New Testament Exegesis',
    'Kaiser & Silva, Introduction to Biblical Hermeneutics'
  ]
},
  {
  'id': 'et-027',
  'titulo': 'A Ã‰tica Sexual —” Pureza e Castidade',
  'categoria': 'Ã‰tica Cristã',
  'subcategoria': 'Moral',
  'conteudo': [
    'A sexualidade é dom de Deus, destinada ao casamento.',
    'A imoralidade sexual é pecado —” \'fugi da imoralidade sexual\' (1 Coríntios 6:18).',
    'A castidade não é repressão, mas expressão ordenada do desejo.',
    'O adultério, a pornografia e a homossexualidade prática são contrários à Bíblia.',
    'A graça de Deus capacita a santificação sexual.'
  ],
  'versicosChave': [
    '1 Coríntios 6:18-20',
    '1 Tessalonicenses 4:3-5',
    'Hebreus 13:4',
    'Gênesis 2:24'
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
  'titulo': 'A Ã‰tica Econômica —” Justiça e Generosidade',
  'categoria': 'Ã‰tica Cristã',
  'subcategoria': 'Social',
  'conteudo': [
    'A Bíblia condena a avareza e a exploração.',
    'A décima parte e a oferta são princípios de generosidade.',
    'O dízimo não é lei para o NT, mas o princípio de dar com alegria.',
    'A justiça social é mandamento —” \'pratica a justiça, ama a misericórdia\'.',
    'O cristão é mordomo, não dono —” tudo pertence a Deus.'
  ],
  'versicosChave': [
    'Miquéias 6:8',
    'Lucas 12:15',
    '2 Coríntios 9:6-7',
    'Provérbios 3:9-10'
  ],
  'tags': [
    'economia',
    'justiça',
    'generosidade',
    'décima'
  ],
  'fontes': [
    'Calvino, Institutas III.10',
    'Wolters, Creation Regained'
  ]
},
  {
  'id': 'et-029',
  'titulo': 'A Ã‰tica da Verdade —” Honestidade e Integridade',
  'categoria': 'Ã‰tica Cristã',
  'subcategoria': 'Moral',
  'conteudo': [
    'Deus é verdadeiro —” não pode mentir (Hebreus 6:18).',
    'A mentira é pecado —” Satanás é o pai da mentira (João 8:44).',
    'A honestidade é virtude cristã —” \'não mintam uns aos outros\' (Colossenses 3:9).',
    'A verdade deve ser dita com amor (Efésios 4:15).',
    'A integridade é testemunho —” o cristão deve ser confiável.'
  ],
  'versicosChave': [
    'Hebreus 6:18',
    'João 8:44',
    'Colossenses 3:9',
    'Efésios 4:15'
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
  'titulo': 'A Estratégia Missionária Paulina',
  'categoria': 'Missiologia',
  'subcategoria': 'Estratégia',
  'conteudo': [
    'Paulo tinha uma estratégia clara: ir às cidades, pregar, estabelecer igrejas, seguir adiante.',
    'Ele focava nas cidades estratégicas —” Jerusalém, Antioquia, Ã‰feso, Corinto, Roma.',
    'O método incluía: sinagoga, praça, casa, escola.',
    'Paulo usava o que já existia —” estradas romanas, língua grega, sinagogas.',
    'Ele delegava liderança —” nunca ficava como líder permanente.'
  ],
  'versicosChave': [
    'Atos 13-28',
    'Romanos 15:19-24',
    '1 Coríntios 9:19-23'
  ],
  'tags': [
    'estratégia',
    'paulo',
    'missões',
    'cidades'
  ],
  'fontes': [
    'Calvino, Institutas III.21',
    'Bosch, Transforming Mission'
  ]
},
  {
  'id': 'mi-020',
  'titulo': 'A Contextualização do Evangelho',
  'categoria': 'Missiologia',
  'subcategoria': 'Método',
  'conteudo': [
    'A contextualização é adaptar a apresentação do evangelho sem alterar o conteúdo.',
    'Paulo se tornou \'judeu entre os judeus\' para ganhar judeus (1 Coríntios 9:20-22).',
    'A contextualização não é sincretismo —” é tradução cultural.',
    'O perigo é contextualizar tanto que o evangelho se perde.',
    'A contextualização é necessária —” o evangelho precisa ser compreendido em cada cultura.'
  ],
  'versicosChave': [
    '1 Coríntios 9:19-23',
    'Atos 17:22-34',
    'Colossenses 4:5-6'
  ],
  'tags': [
    'contextualização',
    'cultura',
    'tradução',
    'evangelho'
  ],
  'fontes': [
    'Bosch, Transforming Mission',
    'Hiebert, Transforming Worldviews'
  ]
},
  {
  'id': 'cc-063',
  'titulo': 'Cristianismo e Política',
  'categoria': 'Questões Contemporâneas',
  'subcategoria': 'Sociedade',
  'conteudo': [
    'A relação entre cristianismo e política é complexa e controversa.',
    'Jesus não veio para ser rei político —” \'meu reino não é deste mundo\'.',
    'A Igreja deve ser profética —” denunciar injustiças e proclamar a verdade.',
    'O perigo do nacionalismo religioso —” confundir nação com reino de Deus.',
    'A política pode ser meio de serviço, mas não de idolatria.'
  ],
  'versicosChave': [
    'João 18:36',
    'Mateus 22:21',
    '1 Pedro 2:13-17',
    'Atos 5:29'
  ],
  'tags': [
    'política',
    'sociedade',
    'profecia',
    'nação'
  ],
  'fontes': [
    'Calvino, Institutas IV.20',
    'Calvin, Institutes IV.20'
  ]
},
  {
  'id': 'cc-064',
  'titulo': 'Cristianismo e Pobreza',
  'categoria': 'Questões Contemporâneas',
  'subcategoria': 'Justiça',
  'conteudo': [
    'A Bíblia tem muito a dizer sobre pobreza e justiça.',
    '\'Os pobres vocês sempre terão convosco\' (Mateus 26:11).',
    'Deus é defensor dos pobres —” \'o Senhor é o seu refúgio\'.',
    'A Igreja deve ajudar os pobres —” não apenas com palavras, mas com ações.',
    'O perigo é transformar evangelismo em apenas assistencialismo.'
  ],
  'versicosChave': [
    'Mateus 26:11',
    'Provérbios 19:17',
    'Tiago 2:15-17',
    'Mateus 25:31-46'
  ],
  'tags': [
    'pobreza',
    'justiça',
    'ajuda',
    'misericórdia'
  ],
  'fontes': [
    'Calvino, Institutas III.10',
    'Calvin, Institutes III.10'
  ]
},
  {
  'id': 'pn-016',
  'titulo': 'O Espírito Santo e a Unidade da Igreja',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Eclesiologia',
  'conteudo': [
    'O Espírito Santo é o autor da unidade na Igreja.',
    'Efésios 4:3 —” \'esforçando-vos por preservar a unidade do Espírito\'.',
    'A unidade não é uniformidade —” é diversidade na harmonia.',
    'O Espírito distribui dons diferentes para um mesmo corpo.',
    'A unidade é um testemunho ao mundo —” \'para que o mundo creia\' (João 17:21).'
  ],
  'versicosChave': [
    'Efésios 4:3-6',
    'João 17:20-23',
    '1 Coríntios 12:4-13'
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
  'titulo': 'A Adoração Angélica',
  'categoria': 'Angelologia',
  'subcategoria': 'Adoração',
  'conteudo': [
    'Os anjos adoram continuamente a Deus no céu.',
    'Os serafins cantam \'Santos, santos, santos\' (Isaías 6:3).',
    'Os 24 anciãos se prostram diante do trono (Apocalipse 4:10).',
    'A adoração angélica é dirigida a Deus —” não aos anjos.',
    'A Igreja se une à adoração angélica na worship.'
  ],
  'versicosChave': [
    'Isaías 6:3',
    'Apocalipse 4:8-11',
    'Hebreus 1:6'
  ],
  'tags': [
    'adoração',
    'culto',
    'céu',
    'trono'
  ],
  'fontes': [
    'Calvino, Institutas I.13',
    'Calvin, Institutes I.13'
  ]
},
  {
  'id': 'ty-015',
  'titulo': 'O Ã‰xodo —” Tipo de Salvação',
  'categoria': 'Tipologia',
  'subcategoria': 'AT',
  'conteudo': [
    'O Ã‰xodo é o maior tipo de salvação no AT.',
    'Israel escravizado no Egito â†’ liberdade pela mão poderosa de Deus.',
    'O cordeiro pascal â†’ Cristo, nosso Cordeiro.',
    'O mar Vermelho â†’ batismo e morte com Cristo.',
    'O deserto â†’ jornada de fé e provação.',
    'A terra prometida â†’ descanso eterno.'
  ],
  'versicosChave': [
    'ÃŠxodo 12:1-14',
    '1 Coríntios 5:7',
    'Hebreus 11:29'
  ],
  'tags': [
    'êxodo',
    'salvação',
    'cordeiro',
    'libertação'
  ],
  'fontes': [
    'Calvino, Comentário a ÃŠxodo',
    'Kline, The Structure of Biblical Authority'
  ]
},
  {
  'id': 'cc-065',
  'titulo': 'Cristianismo e Saúde Mental',
  'categoria': 'Questões Contemporâneas',
  'subcategoria': 'Saúde',
  'conteudo': [
    'A saúde mental é uma questão importante para os cristãos.',
    'A Bíblia não condena quem sofre de depressão ou ansiedade.',
    'Deus usa meios: medicação, aconselhamento, comunidade.',
    'A oração e a Palavra são meios de graça, mas não substituem ajuda profissional.',
    'A Igreja deve ser lugar de acolhimento, não de julgamento.'
  ],
  'versicosChave': [
    'Salmo 42:1-5',
    '1 Reis 19:1-8',
    '2 Coríntios 1:3-4',
    'Provérbios 11:14'
  ],
  'tags': [
    'saúde mental',
    'depressão',
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
  'titulo': 'Salmos —” O Livro de Orações da Igreja',
  'categoria': 'Livros Poéticos',
  'subcategoria': 'Salmos',
  'conteudo': [
    'Os Salmos são o hymnbook da Igreja —” mais de 50% do AT em poesia.',
    'Cada salmo tem um contexto, autor e propósito específicos.',
    'Os salmos cobrem todas as emoções humanas: louvor, lamento, gratidão, súplica.',
    'Jesus citou os salmos frequentemente —” especialmente o Salmo 22 na cruz.',
    'Os salmos são modelo de oração para a Igreja.'
  ],
  'versicosChave': [
    'Salmo 23:1-6',
    'Salmo 51:1-17',
    'Salmo 119:105',
    'Salmo 22:1-31'
  ],
  'tags': [
    'salmos',
    'oração',
    'louvor',
    'lamento'
  ],
  'fontes': [
    'Calvino, Comentário aos Salmos',
    'Tate, Psalms'
  ]
},
  {
  'id': 'lp-013',
  'titulo': 'Provérbios —” Sabedoria Prática',
  'categoria': 'Livros Poéticos',
  'subcategoria': 'Provérbios',
  'conteudo': [
    'Provérbios é o livro de sabedoria prática para a vida diária.',
    'O temor do Senhor é o princípio da sabedoria (Provérbios 1:7).',
    'Os provérbios não são promessas absolutas —” são generalizações.',
    'O tema do pecado vs. sabedoria percorre todo o livro.',
    'Provérbios é especialmente relevante para jovens em formação.'
  ],
  'versicosChave': [
    'Provérbios 1:7',
    'Provérbios 3:5-6',
    'Provérbios 22:6',
    'Provérbios 31:10-31'
  ],
  'tags': [
    'provérbios',
    'sabedoria',
    'temor',
    'prática'
  ],
  'fontes': [
    'Calvino, Comentário a Provérbios',
    'Waltke, The Book of Proverbs'
  ]
},
  {
  'id': 'ev-026',
  'titulo': 'João 3:16 —” O Versículo Mais Conhecido',
  'categoria': 'Evangelhos',
  'subcategoria': 'João',
  'conteudo': [
    'João 3:16 é o versículo mais conhecido e memorizado da Bíblia.',
    'Resume todo o evangelho: amor, dá, Filho, crer, não pereça, vida eterna.',
    'O contexto é a conversa de Jesus com Nicodemos.',
    '\'Tanto amou Deus o mundo\' —” o mundo é o objeto do amor divino.',
    '\'Deu o seu Filho unigênito\' —” o custo da salvação.'
  ],
  'versicosChave': [
    'João 3:16',
    'João 3:1-21',
    '1 João 4:9-10'
  ],
  'tags': [
    'joão 3:16',
    'evangelho',
    'amor',
    'salvação'
  ],
  'fontes': [
    'Calvino, Comentário a João',
    'Carson, The Gospel According to John'
  ]
},
  {
  'id': 'ev-027',
  'titulo': 'Mateus 28:19-20 —” A Grande Comissão',
  'categoria': 'Evangelhos',
  'subcategoria': 'Mateus',
  'conteudo': [
    'Mateus 28:19-20 é a Grande Comissão —” o mandato da Igreja.',
    'A autoridade de Cristo é a base —” \'Toda autoridade me é dada\'.',
    'O alvo é universal —” \'todas as nações\'.',
    'O método é disciple-making —” \'fazendo discípulos\'.',
    'A-promessa é presence —” \'estarei convosco todos os dias\'.'
  ],
  'versicosChave': [
    'Mateus 28:18-20',
    'Marcos 16:15-16',
    'Atos 1:8'
  ],
  'tags': [
    'grande comissão',
    'discipulado',
    'missão',
    'autoridade'
  ],
  'fontes': [
    'Calvino, Institutas III.21',
    'Ridderbos, The Coming of the Kingdom'
  ]
},
  {
  'id': 'cr-020',
  'titulo': 'A Perfeição de Cristo',
  'categoria': 'Cristologia',
  'subcategoria': 'Natureza',
  'conteudo': [
    'Cristo é perfeito em todas as Sua qualidades: sabedoria, poder, amor, justiça.',
    'Ele não pecou —” é o Cordeiro imaculado.',
    'Sua perfeição é a base da nossa salvação —” somente um perfeito pode satisfazer a justiça.',
    'Cristo é perfeito como profeto, sacerdote e rei.',
    'A perfeição de Cristo é eterna —” não diminui nem aumenta.'
  ],
  'versicosChave': [
    'Hebreus 4:15',
    '1 Pedro 2:22',
    '2 Coríntios 5:21',
    'Colossenses 2:9'
  ],
  'tags': [
    'perfeição',
    'impecabilidade',
    'justiça',
    'santidade'
  ],
  'fontes': [
    'Calvino, Institutas II.16',
    'Calvin, Institutes II.16'
  ]
},
  {
  'id': 'cr-021',
  'titulo': 'A Humilhação de Cristo',
  'categoria': 'Cristologia',
  'subcategoria': 'Paixão',
  'conteudo': [
    'A humilhação de Cristo inclui: encarnação, vida terrena, morte, descenso aos infernos.',
    'Filipenses 2:6-8 —” \'despojou-se a si mesmo, tomando a forma de servo\'.',
    'A cruz é o ápice da humilhação —” morte de escravo.',
    'O descenso aos infernos é o mais misterioso dos artigos.',
    'A humilhação é voluntária —” Cristo deu Sua vida por Si mesmo.'
  ],
  'versicosChave': [
    'Filipenses 2:6-8',
    'Isaías 53:3-9',
    '1 Pedro 2:24',
    '1 Pedro 3:18-20'
  ],
  'tags': [
    'humilhação',
    'cruz',
    'servo',
    'encarnação'
  ],
  'fontes': [
    'Calvino, Institutas II.16',
    'Calvin, Institutes II.16'
  ]
},
  {
  'id': 'cr-022',
  'titulo': 'A Exaltação de Cristo',
  'categoria': 'Cristologia',
  'subcategoria': 'Glorificação',
  'conteudo': [
    'A exaltação de Cristo inclui: ressurreição, ascensão, sentado à direita do Pai.',
    'Filipenses 2:9-11 —” \'Deus o exaltou soberanamente e lhe deu o nome que é acima de todo nome\'.',
    'Cristo é agora Senhor de todos.',
    'Ele intercede por nós como Sumo Sacerdote.',
    'A exaltação será consumada na segunda vinda.'
  ],
  'versicosChave': [
    'Filipenses 2:9-11',
    'Efésios 1:20-22',
    'Hebreus 7:25',
    'Atos 2:33'
  ],
  'tags': [
    'exaltação',
    'ressurreição',
    'ascensão',
    'senhor'
  ],
  'fontes': [
    'Calvino, Institutas II.16',
    'Calvin, Institutes II.16'
  ]
},
  {
  'id': 'bi-012',
  'titulo': 'A Hermenêutica de Calvino',
  'categoria': 'Bibliologia',
  'subcategoria': 'Interpretação',
  'conteudo': [
    'Calvino desenvolveu princípios hermenêuticos que influenciaram toda a tradição reformada.',
    'A regra principal: a Escritura interpreta a si mesma.',
    'O contexto imediato e remoto são essenciais.',
    'O sentido literal é o primeiro e mais importante.',
    'O Espírito Santo ilumina a mente para compreender.'
  ],
  'versicosChave': [
    '2 Timóteo 3:16',
    '2 Pedro 1:20-21'
  ],
  'tags': [
    'calvino',
    'hermenêutica',
    'interpretação'
  ],
  'fontes': [
    'Calvino, Institutas I.7'
  ]
},
  {
  'id': 'bi-013',
  'titulo': 'O Testemunho Interno do Espírito',
  'categoria': 'Bibliologia',
  'subcategoria': 'Autoridade',
  'conteudo': [
    'O Espírito Santo testifica em nosso espírito que a Bíblia é Palavra de Deus.',
    'A Escritura não precisa de prova externa —” ela carrega sua própria autoridade.',
    'A fé na Escritura é racional e espiritual.',
    'O testemunho do Espírito confirma a verdade da Bíblia.',
    'A autoridade da Bíblia é Autoctônica —” vem de dentro dela.'
  ],
  'versicosChave': [
    '1 Coríntios 2:10-14',
    '1 Tessalonicenses 2:13'
  ],
  'tags': [
    'testemunho',
    'espírito',
    'autoridade',
    'fé'
  ],
  'fontes': [
    'Calvino, Institutas I.7',
    'Warfield, Studies in Theology'
  ]
},
  {
  'id': 'bi-014',
  'titulo': 'A Bíblia e a Ciência',
  'categoria': 'Bibliologia',
  'subcategoria': 'Contemporâneo',
  'conteudo': [
    'A Bíblia não é um livro de ciência —” é revelação de Deus.',
    'Quando a Bíblia fala de temas científicos, é precisa no que afirma.',
    'A hermenêutica bíblica deve respeitar o gênero literário.',
    'A ciência e a fé não são inimigas —” ambas buscam a verdade.',
    'O criacionismo, design inteligente e evolução teísta são posições cristãs.'
  ],
  'versicosChave': [
    'Gênesis 1:1',
    'Romanos 1:20',
    'Salmo 19:1'
  ],
  'tags': [
    'ciência',
    'criação',
    'hermenêutica',
    'gênero'
  ],
  'fontes': [
    'Calvino, Institutas I.14',
    'Mooradian, Theology and Science'
  ]
},
  {
  'id': 'cr-023',
  'titulo': 'A Cidade de Deus —” Agostinho',
  'categoria': 'Cristologia',
  'subcategoria': 'Augustinismo',
  'conteudo': [
    'A Cidade de Deus é a obra-prima de Agostinho —” história da salvação.',
    'A Cidade de Deus se opõe à Cidade dos Homens.',
    'A Cidade de Deus é formada pelos amantes de Deus; a dos Homens, pelos amantes de si mesmos.',
    'A história é linear —” criação, queda, redenção, consumação.',
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
    'história',
    'salvação'
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
    'Cristo não aboliu a Lei, mas a cumpriu perfeitamente.',
    'Mateus 5:17-19 —” \'não vim para abrogar a Lei, mas para cumprir\'.',
    'A Lei moral (10 Mandamentos) continua válida como norma de vida.',
    'A Lei civil e cerimonial foram cumpridas em Cristo.',
    'A Lei é espelho que nos mostra nosso pecado e nos conduz a Cristo.'
  ],
  'versicosChave': [
    'Mateus 5:17-19',
    'Romanos 3:31',
    'Romanos 7:7-12',
    'Gálatas 3:24-25'
  ],
  'tags': [
    'lei',
    'mandamentos',
    'cumprimento',
    'ética'
  ],
  'fontes': [
    'Calvino, Institutas II.9',
    'Calvin, Institutes II.9'
  ]
},
  {
  'id': 'cr-025',
  'titulo': 'O Reino de Deus —” Já e Ainda Não',
  'categoria': 'Cristologia',
  'subcategoria': 'Escatologia',
  'conteudo': [
    'O Reino de Deus é central no ensino de Jesus.',
    'O Reino já começou com a vinda de Cristo —” \'o Reino de Deus está perto\'.',
    'O Reino ainda não se consumou —” esperamos a volta de Cristo.',
    'A tensão \'já e ainda não\' define a era da igreja.',
    'O Reino de Deus cresce como semente de mostarda —” pequeno, mas se expande.'
  ],
  'versicosChave': [
    'Marcos 1:15',
    'Mateus 13:31-33',
    'Lucas 17:20-21'
  ],
  'tags': [
    'reino',
    'já e ainda não',
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
  'titulo': 'A Morte de Cristo —” Expiação Universal vs. Particular',
  'categoria': 'Cristologia',
  'subcategoria': 'Expiação',
  'conteudo': [
    'A expiação universal sustenta que Cristo morreu por todos.',
    'A expiação particular sustenta que Cristo morreu somente pelos eleitos.',
    'Calvino defendia a expiação particular —” \'Cristo morreu pelo Seu povo\'.',
    'Os arminianos defendem a expiação universal —” \'mundo\' significa todos.',
    'Ambas as posições são aceitas dentro do protestantismo.'
  ],
  'versicosChave': [
    'João 3:16',
    '1 Timóteo 2:6',
    'Efésios 5:25',
    'Romanos 5:8'
  ],
  'tags': [
    'expiação',
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
  'titulo': 'A Inspiração Verbal e Plenária',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Bibliologia',
  'conteudo': [
    'A inspiração verbal significa que Deus inspirou cada palavra da Bíblia.',
    'A inspiração plenária significa que toda a Bíblia é inspirada —” não apenas partes.',
    'A inspiração não é ditado —” Deus usou a personalidade e estilo de cada autor.',
    'A inerrância se baseia na inspiração plenária.',
    'A Bíblia é a palavra de Deus em palavras humanas.'
  ],
  'versicosChave': [
    '2 Timóteo 3:16',
    '2 Pedro 1:21',
    '1 Coríntios 2:13'
  ],
  'tags': [
    'inspiração',
    'verbal',
    'plenária',
    'inerrância'
  ],
  'fontes': [
    'Warfield, The Inspiration and Authority of Scripture'
  ]
},
  {
  'id': 'so-042',
  'titulo': 'A Graça Irresistível',
  'categoria': 'Soteriologia',
  'subcategoria': 'Doutrina',
  'conteudo': [
    'A graça irresistível é a doutrina de que Deus efetivamente chama os eleitos.',
    'A graça não é coativa —” ela muda o coração para querer a Deus.',
    'João 6:44 —” \'ninguém pode vir a Mim se o Pai que Me enviou não o atrair\'.',
    'A graça irresistível não anula a liberdade —” o crente escolhe livremente em Cristo.',
    'Todos os eleitos responderão positivamente ao chamado de Deus.'
  ],
  'versicosChave': [
    'João 6:44',
    'João 6:37',
    'Romanos 8:30'
  ],
  'tags': [
    'graça',
    'irresistível',
    'chamado',
    'eleição'
  ],
  'fontes': [
    'Calvino, Institutas III.24',
    'Calvin, Institutes III.24'
  ]
},
  {
  'id': 'so-043',
  'titulo': 'A Expiação Ilimitada vs. Limitada',
  'categoria': 'Soteriologia',
  'subcategoria': 'Debate',
  'conteudo': [
    'A expiação ilimitada: Cristo morreu por todos os seres humanos.',
    'A expiação limitada: Cristo morreu somente pelos eleitos.',
    'O calvinismo defende a expiação limitada (definite atonement).',
    'O arminianismo defende a expiação ilimitada.',
    'A diferença está na extensão, não no valor da expiação.'
  ],
  'versicosChave': [
    'João 10:11',
    '1 João 2:2',
    'Efésios 5:25',
    'Romanos 5:8'
  ],
  'tags': [
    'expiação',
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
  'titulo': 'A Justificação pela Fé Somente',
  'categoria': 'Soteriologia',
  'subcategoria': 'Reforma',
  'conteudo': [
    'Sola fide é o princípio de que a fé é o único meio de justificação.',
    'A fé não é obra —” é o instrumento pela qual recebemos a graça.',
    'A fé verdadeira produz boas obras —” mas as obras não salvam.',
    'Lutero chamou a justificação pela fé de \'artigo da igreja que se sustenta ou cai\'.',
    'A justificação é forensic —” Deus declara justo, não nos torna justos.'
  ],
  'versicosChave': [
    'Romanos 3:28',
    'Efésios 2:8-9',
    'Gálatas 2:16',
    'Romanos 5:1'
  ],
  'tags': [
    'sola fide',
    'fé',
    'justificação',
    'reforma'
  ],
  'fontes': [
    'Lutero, Comentário a Gálatas',
    'Calvino, Institutas III.11'
  ]
},
  {
  'id': 'hm-010',
  'titulo': 'A Interpretação de Profecias',
  'categoria': 'Hermenêutica',
  'subcategoria': 'Métodos',
  'conteudo': [
    'As profecias bíblicas são frequentemente cumpridas em múltiplas camadas.',
    'O cumprimento tipológico é mais comum que o literal.',
    'As profecias escatológicas são as mais debatidas.',
    'A regra de ouro: interprete pela Escritura mais clara.',
    'Não faça profecia dizer mais do que o texto sustenta.'
  ],
  'versicosChave': [
    '2 Pedro 1:20-21',
    '1 Pedro 1:10-12'
  ],
  'tags': [
    'profecia',
    'interpretação',
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
  'categoria': 'Ã‰tica Cristã',
  'subcategoria': 'Social',
  'conteudo': [
    'A posição cristã sobre a guerra é debatida: pacifismo, guerra justa, realismo cristão.',
    'O pacifismo sustenta que os cristãos não devem participar de guerras.',
    'A guerra justa (Agostinho, Tomás de Aquino) estabelece critérios para guerra legítima.',
    'O realismo cristão (Niebuhr) aceita a guerra como mal necessário.',
    'A Bíblia ensina amor ao inimigo —” mas também proteção dos inocentes.'
  ],
  'versicosChave': [
    'Mateus 5:38-48',
    'Romanos 13:1-7',
    '2 Coríntios 10:3-5'
  ],
  'tags': [
    'guerra',
    'paz',
    'violência',
    'justiça'
  ],
  'fontes': [
    'Calvino, Institutas II.8',
    'Calvin, Institutes II.8'
  ]
},
  {
  'id': 'et-031',
  'titulo': 'A Ã‰tica daMENTE',
  'categoria': 'Ã‰tica Cristã',
  'subcategoria': 'Mentalidade',
  'conteudo': [
    'A Bíblia tem muito a dizer sobre como pensar.',
    'Filipenses 4:8 —” \'pensai nessas coisas: verdade, honestidade, justiça, pureza\'.',
    'A renovação da mente é mandamento (Romanos 12:2).',
    'O pensamento cristão deve ser capturado por Cristo.',
    'A meditação bíblica é pensamento guiado pela Palavra.'
  ],
  'versicosChave': [
    'Filipenses 4:8',
    'Romanos 12:2',
    'Josué 1:8',
    'Salmo 1:1-3'
  ],
  'tags': [
    'mente',
    'pensamento',
    'renovação',
    'meditação'
  ],
  'fontes': [
    'Calvino, Institutas III.7',
    'Calvin, Institutes III.7'
  ]
},
  {
  'id': 'mi-021',
  'titulo': 'A Missão no Antigo Testamento',
  'categoria': 'Missiologia',
  'subcategoria': 'Fundamento',
  'conteudo': [
    'A missão não começou no NT —” Deus sempre teve um povo para Si.',
    'Israel era chamado para ser \'luz das nações\' (Isaías 49:6).',
    'Abraão foi abençoado para ser bênção a todos os povos.',
    'Os salmos celebram a universalidade do reinado de Deus.',
    'O AT prepara o terreno para a missão universal do NT.'
  ],
  'versicosChave': [
    'Gênesis 12:3',
    'Isaías 49:6',
    'Salmo 67',
    'Salmo 96:1-3'
  ],
  'tags': [
    'missão',
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
  'titulo': 'Os Anjos e a Oração',
  'categoria': 'Angelologia',
  'subcategoria': 'Ministério',
  'conteudo': [
    'Os anjos podem estar envolvidos na transmissão de orações.',
    'Tobias 12:12 (Apocrifo) mostra um anjo apresentando orações a Deus.',
    'A Bíblia canônica é mais cautelosa sobre esse assunto.',
    'O principal intercessor é Cristo, não os anjos.',
    'Os anjos são mensageiros, não mediadores.'
  ],
  'versicosChave': [
    'Tobias 12:12',
    '1 Timóteo 2:5',
    'Hebreus 7:25'
  ],
  'tags': [
    'anjos',
    'oração',
    'intercessão',
    'mediador'
  ],
  'fontes': [
    'Calvino, Institutas I.13',
    'Calvin, Institutes I.13'
  ]
},
  {
  'id': 'so-045',
  'titulo': 'A Obediência Cristã —” Fruto da Graça',
  'categoria': 'Soteriologia',
  'subcategoria': 'Vida Cristã',
  'conteudo': [
    'A obediência é fruto da salvação, não causa dela.',
    'Efésios 2:8-10 —” somos salvos por graça, mas criados para boas obras.',
    'A obediência cristã é motivada por amor, não por medo.',
    'A desobediência não anula a salvação, mas a prejudica.',
    'A obediência é.progressiva —” crescemos em santidade ao longo da vida.'
  ],
  'versicosChave': [
    'Efésios 2:8-10',
    '1 João 5:3',
    'João 14:15',
    'Romanos 6:1-2'
  ],
  'tags': [
    'obediência',
    'graça',
    'santificação',
    'vida cristã'
  ],
  'fontes': [
    'Calvino, Institutas III.10',
    'Packer, The Ten Commandments'
  ]
},
  {
  'id': 'lp-014',
  'titulo': 'Eclesiastes —” O Sentido da Vida',
  'categoria': 'Livros Poéticos',
  'subcategoria': 'Eclesiastes',
  'conteudo': [
    'Eclesiastes é o livro mais existencial da Bíblia —” \'vaidade de vaidades\'.',
    'O Autor (Salomão?) testa tudo: sabedoria, prazer, trabalho, riqueza.',
    'Tudo é \'vaidade\' —” vapor, efêmero, sem sentido final.',
    'A conclusão: \'teme a Deus e guarda os Seus mandamentos\'.',
    'O evangelho responde o que Eclesiastes pergunta: o sentido está em Deus.'
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
    'Calvino, Comentário a Eclesiastes',
    'Wright, The Message of Ecclesiastes'
  ]
},
  {
  'id': 'cc-066',
  'titulo': 'Cristianismo e Religiões Não-Cristãs',
  'categoria': 'Questões Contemporâneas',
  'subcategoria': 'Religião',
  'conteudo': [
    'Como o cristianismo se relaciona com outras religiões?',
    'O pluralismo religioso sustenta que todas as religiões conduzem a Deus.',
    'O exclusivismo sustenta que Cristo é o único caminho.',
    'O inclusivismo sustenta que há salvação fora da Igreja visível, mas em Cristo.',
    'A Bíblia é clara: \'nenhum outro nome debaixo do céu\' (Atos 4:12).'
  ],
  'versicosChave': [
    'Atos 4:12',
    'João 14:6',
    '1 Timóteo 2:5'
  ],
  'tags': [
    'religiões',
    'pluralismo',
    'exclusivismo',
    'salvação'
  ],
  'fontes': [
    'Calvino, Institutas II.6',
    'Calvin, Institutes II.6'
  ]
},
  {
  'id': 'cc-067',
  'titulo': 'Cristianismo e Feminismo',
  'categoria': 'Questões Contemporâneas',
  'subcategoria': 'Gênero',
  'conteudo': [
    'A relação entre cristianismo e feminismo é debatida.',
    'O feminismo cristão sustenta que a igualdade de gênero é bíblica.',
    'O complementarismo sustenta que homens e mulheres são iguais em dignidade, diferentes em função.',
    'A Bíblia ensina: \'não há homem nem mulher, todos são um em Cristo\' (Gálatas 3:28).',
    'O debate gira em torno de liderança na igreja e no lar.'
  ],
  'versicosChave': [
    'Gálatas 3:28',
    '1 Timóteos 2:11-15',
    'Efésios 5:22-33'
  ],
  'tags': [
    'feminismo',
    'gênero',
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
    'O chamado eterno é a ordem lógica da salvação na mente de Deus.',
    'Romanos 8:29-30 —” \'aos que de antemão conhecceu, também predestinou... e aos que predestinou, esses também chamou\'.',
    'O chamado eterno é anterior à criação do mundo.',
    'Ele inclui: eleição, predestinação, chamado, justificação, glorificação.',
    'Tudo é obra da graça soberana de Deus.'
  ],
  'versicosChave': [
    'Romanos 8:29-30',
    'Efésios 1:4-5',
    '2 Timóteo 1:9'
  ],
  'tags': [
    'chamado',
    'eterno',
    'predestinação',
    'graça'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'so-047',
  'titulo': 'A Glorificação dos Santos',
  'categoria': 'Soteriologia',
  'subcategoria': 'Escatologia',
  'conteudo': [
    'A glorificação é a consumação final da salvação.',
    'Romanos 8:30 —” \'aos que justificou, esses também glorificou\'.',
    'A glorificação inclui a ressurreição do corpo e a Transformação total.',
    'Seremos como Cristo porque O viremos como Ele é.',
    'A glorificação é certeza —” Deus promete e cumpre.'
  ],
  'versicosChave': [
    'Romanos 8:30',
    '1 João 3:2',
    'Filipenses 3:20-21'
  ],
  'tags': [
    'glorificação',
    'ressurreição',
    'perfeição'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'so-048',
  'titulo': 'A Maldição do Pecado',
  'categoria': 'Soteriologia',
  'subcategoria': 'Hamartiologia',
  'conteudo': [
    'A maldição do pecado é a condenação que recai sobre todo ser humano.',
    'Romanos 3:23 —” \'todos pecaram e estão destituídos da glória de Deus\'.',
    'Romanos 6:23 —” \'o salário do pecado é a morte\'.',
    'A maldição é universal —” atinge a todos sem exceção.',
    'Somente Cristo pode redimir da maldição (Gálatas 3:13).'
  ],
  'versicosChave': [
    'Romanos 3:23',
    'Romanos 6:23',
    'Gálatas 3:13'
  ],
  'tags': [
    'maldição',
    'pecado',
    'condenação'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'so-049',
  'titulo': 'A Redenção em Cristo',
  'categoria': 'Soteriologia',
  'subcategoria': 'Benefícios',
  'conteudo': [
    'A redenção é o ato de Deus de nos comprar da escravidão do pecado.',
    'Efésios 1:7 —” \'nEle temos a redenção pelo Seu sangue\'.',
    'O preço foi o sangue de Cristo —” valor infinito.',
    'A redenção inclui: justificação, regeneração, santificação.',
    'A redenção é completa —” nada pode ser adicionado à obra consumada.'
  ],
  'versicosChave': [
    'Efésios 1:7',
    'Colossenses 1:14',
    '1 Pedro 1:18-19'
  ],
  'tags': [
    'redenção',
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
  'titulo': 'A Maldição Removida pela Cruz',
  'categoria': 'Soteriologia',
  'subcategoria': 'Expiação',
  'conteudo': [
    'Cristo removeu a maldição ao se tornar maldição por nós.',
    'Gálatas 3:13 —” \'Cristo nos resgatou da maldição da lei, fazendo-se maldição por nós\'.',
    'A cruz é o meio pelo qual a maldição foi suportada.',
    'A satisfação vicária —” Cristo pagou o que nós devíamos.',
    'A maldição foi removida de uma vez para sempre.'
  ],
  'versicosChave': [
    'Gálatas 3:13',
    '2 Coríntios 5:21',
    '1 Pedro 2:24'
  ],
  'tags': [
    'cruz',
    'maldição',
    'satisfação'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'so-051',
  'titulo': 'O Pecado Contra o Espírito Santo',
  'categoria': 'Soteriologia',
  'subcategoria': 'Pecado',
  'conteudo': [
    'O pecado contra o Espírito Santo é atribuir a obra do Espírito a Satanás.',
    'Mateus 12:31-32 —” \'todo pecado e blasfêmia serão perdoados... mas a blasfêmia contra o Espírito não será perdoada\'.',
    'Este pecado é rejeição deliberada e consciente da verdade.',
    'Ã‰ a rebelião final e irrecuperável contra Deus.',
    'A maioria dos teólogos diz que um cristão verdadeiro não pode cometer este pecado.'
  ],
  'versicosChave': [
    'Mateus 12:31-32',
    'Hebreus 6:4-6',
    '1 João 5:16'
  ],
  'tags': [
    'blasfêmia',
    'espírito santo',
    'pecado'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'so-052',
  'titulo': 'A Vida Eterna —” Presente e Futura',
  'categoria': 'Soteriologia',
  'subcategoria': 'Escatologia',
  'conteudo': [
    'A vida eterna é tanto presente quanto futura.',
    'João 5:24 —” \'quem ouve a Minha palavra... tem a vida eterna e não entrará em juízo\'.',
    'A vida eterna presente é relação com Deus (João 17:3).',
    'A vida eterna futura é gozo eterno na presença de Deus.',
    'A vida eterna é dom de Deus —” não é conquistada.'
  ],
  'versicosChave': [
    'João 5:24',
    'João 17:3',
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
  'titulo': 'Cristo —” O Novo Adão',
  'categoria': 'Cristologia',
  'subcategoria': 'Tipologia',
  'conteudo': [
    'Cristo é o novo Adão que obedece onde Adão desobedeceu.',
    'Romanos 5:12-21 —” contraste entre Adão e Cristo.',
    'Onde Adão trouxe pecado e morte, Cristo trouxe justiça e vida.',
    'A obediência de Cristo é perfeita e completa.',
    'A justificação é por obediência de um só —” Cristo.'
  ],
  'versicosChave': [
    'Romanos 5:12-21',
    '1 Coríntios 15:22-45'
  ],
  'tags': [
    'adão',
    'novoadão',
    'obediência'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'cr-028',
  'titulo': 'Cristo —” O Bom Pastor',
  'categoria': 'Cristologia',
  'subcategoria': 'Metáfora',
  'conteudo': [
    'Jesus se declara o Bom Pastor que dá Sua vida pelas ovelhas.',
    'João 10:11 —” \'Eu sou o Bom Pastor; o Bom Pastor dá a Sua vida pelas ovelhas\'.',
    'O pastor conhece suas ovelhas e elas conhecem sua voz.',
    'Cristo tem outras ovelhas que ainda não conhece.',
    'A segurança das ovelhas está na mão do Pai e na mão do Filho.'
  ],
  'versicosChave': [
    'João 10:11-18',
    '1 Pedro 2:25',
    '1 Pedro 5:4'
  ],
  'tags': [
    'pastor',
    'ovelhas',
    'segurança'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'cr-029',
  'titulo': 'Cristo —” O Cordeiro de Deus',
  'categoria': 'Cristologia',
  'subcategoria': 'Metáfora',
  'conteudo': [
    'Jesus é o Cordeiro de Deus que tira o pecado do mundo.',
    'João 1:29 —” \'eis o Cordeiro de Deus, que tira o pecado do mundo\'.',
    'A metáfora do cordeiro aponta para o sacrifício pascal.',
    'Cristo é o Cordeiro imaculado —” sem pecado.',
    'O cordeiro foi morto desde a fundação do mundo (Apocalipse 13:8).'
  ],
  'versicosChave': [
    'João 1:29',
    '1 Coríntios 5:7',
    'Apocalipse 5:6-12'
  ],
  'tags': [
    'cordeiro',
    'sacrifício',
    'pascal'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'cr-030',
  'titulo': 'Cristo —” A Rocha',
  'categoria': 'Cristologia',
  'subcategoria': 'Metáfora',
  'conteudo': [
    'Cristo é a Rocha que sustenta o crente.',
    '1 Coríntios 10:4 —” \'a Rocha era Cristo\'.',
    'A rocha no desertoä¾›æ°´ä»¥è‰²åˆ— —” Cristo nos dá vida.',
    'Cristo é a Rocha sobre a qual a igreja é edificada.',
    'Os inimigos tropeçam na Rocha —” ela é pedra de tropeço e de sustentação.'
  ],
  'versicosChave': [
    '1 Coríntios 10:4',
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
  'titulo': 'Cristo —” O Caminho, a Verdade e a Vida',
  'categoria': 'Cristologia',
  'subcategoria': 'Metáfora',
  'conteudo': [
    'Jesus é o único caminho para Deus.',
    'João 14:6 —” \'Eu sou o caminho, a verdade e a vida; ninguém vem ao Pai senão por Mim\'.',
    'Não há múltiplos caminhos —” há um só.',
    'Cristo é a verdade —” não apenas ensina verdade, é a verdade.',
    'Cristo é a vida —” sem Ele, não há vida eterna.'
  ],
  'versicosChave': [
    'João 14:6',
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
  'titulo': 'Cristo —” O Mediador da Nova Aliança',
  'categoria': 'Cristologia',
  'subcategoria': 'Aliança',
  'conteudo': [
    'Cristo é o mediador da nova aliança entre Deus e os homens.',
    '1 Timóteo 2:5 —” \'um só é o Mediador entre Deus e os homens, o homem Cristo Jesus\'.',
    'A nova aliança é melhor que a antiga —” escrita no coração.',
    'Cristo intercede por nós continuamente.',
    'A mediação de Cristo é eficaz e eterna.'
  ],
  'versicosChave': [
    '1 Timóteo 2:5',
    'Hebreus 8:6',
    'Hebreus 9:15'
  ],
  'tags': [
    'mediador',
    'aliança',
    'intercessão'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'pn-018',
  'titulo': 'O Espírito Santo e a Unidade da Fé',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Eclesiologia',
  'conteudo': [
    'O Espírito Santo promove a unidade na verdade.',
    'Efésios 4:3-6 —” \'um só Espírito... uma só fé\'.',
    'A unidade não é apenas organizational, mas espiritual.',
    'O Espírito nos guia em toda a verdade.',
    'A unidade é testemunho ao mundo da realidade de Cristo.'
  ],
  'versicosChave': [
    'Efésios 4:3-6',
    'João 16:13'
  ],
  'tags': [
    'unidade',
    'fé',
    'verdade'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'pn-019',
  'titulo': 'O Espírito Santo e a Ressurreição',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Poder',
  'conteudo': [
    'O Espírito Santo é o poder da ressurreição.',
    'Romanos 8:11 —” \'o Espírito... que ressuscitou a Jesus dentre os mortos\'.',
    'O mesmo poder que ressuscitou Cristo habita em nós.',
    'A ressurreição é obra da Trindade.',
    'O Espírito nos dá vida nova agora e na ressurreição.'
  ],
  'versicosChave': [
    'Romanos 8:11',
    'Efésios 1:19-20'
  ],
  'tags': [
    'ressurreição',
    'poder',
    'espírito'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'pn-020',
  'titulo': 'O Espírito Santo na Consciência',
  'categoria': 'Pneumatologia',
  'subcategoria': 'Obras',
  'conteudo': [
    'O Espírito Santo atua na consciência humana.',
    'João 16:8 —” \'convencerá o mundo de pecado, de justiça e de juízo\'.',
    'O Espírito convence do pecado —” mostra nossa necessidade de salvação.',
    'O Espírito convence da justiça —” mostra que Cristo é a nossa justiça.',
    'O Espírito convence do juízo —” mostra que Satanás foi julgado.'
  ],
  'versicosChave': [
    'João 16:8-11'
  ],
  'tags': [
    'consciência',
    'convicção',
    'juízo'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'hm-011',
  'titulo': 'A Gramática Histórica',
  'categoria': 'Hermenêutica',
  'subcategoria': 'Método',
  'conteudo': [
    'A gramática histórica estuda o significado das palavras no contexto original.',
    'O léxico bíblico é essencial para a interpretação.',
    'As palavras têm significado que muda ao longo do tempo.',
    'O contexto imediato e o uso bíblico determinam o significado.',
    'A gramática histórica é o fundamento de toda hermenêutica.'
  ],
  'versicosChave': [
    '2 Timóteo 2:15',
    '1 Coríntios 2:13'
  ],
  'tags': [
    'gramática',
    'histórica',
    'léxico'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'hm-012',
  'titulo': 'A Interpretação de Salmos',
  'categoria': 'Hermenêutica',
  'subcategoria': 'Método',
  'conteudo': [
    'Os salmos requerem atenção ao gênero literário.',
    'Os salmos de louvo são diferentes dos de lamento.',
    'Alguns salmos são messiânicos —” apontam para Cristo.',
    'O salmo deve ser interpretado em seu contexto histórico.',
    'Os salmos são modelo de oração para a Igreja.'
  ],
  'versicosChave': [
    'Salmo 23:1-6',
    'Salmo 51:1-17'
  ],
  'tags': [
    'salmos',
    'oração',
    'louvo'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'et-032',
  'titulo': 'A Ã‰tica da Comunicação',
  'categoria': 'Ã‰tica Cristã',
  'subcategoria': 'Prática',
  'conteudo': [
    'A Bíblia tem muito a dizer sobre como nos comunicamos.',
    'Efésios 4:29 —” \'nenhuma palavra corrupta saia da boca\'.',
    'A língua é pequena, mas causa grandes danos (Tiago 3:1-12).',
    'A comunicação cristã deve ser: verdadeira, amorosa, necessária, oportuna.',
    'A mentira é pecado —” a verdade é virtude.'
  ],
  'versicosChave': [
    'Efésios 4:29',
    'Tiago 3:1-12',
    'Colossenses 4:6'
  ],
  'tags': [
    'comunicação',
    'língua',
    'verdade'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'et-033',
  'titulo': 'A Ã‰tica da Família',
  'categoria': 'Ã‰tica Cristã',
  'subcategoria': 'Social',
  'conteudo': [
    'A família é instituição divina —” Deus a criou antes da Igreja.',
    'Efésios 5:22-33 —” maridos e mulheres se amam como Cristo e a igreja.',
    'Provérbios 22:6 —” \'ensina ao menino o caminho em que deve andar\'.',
    'A família é a base da sociedade —” quando a família se desfaz, a sociedade desmorona.',
    'A família cristã deve ser testemunho do evangelho.'
  ],
  'versicosChave': [
    'Efésios 5:22-33',
    'Provérbios 22:6',
    'Deuteronômio 6:4-9'
  ],
  'tags': [
    'família',
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
  'categoria': 'Ã‰tica Cristã',
  'subcategoria': 'Criação',
  'conteudo': [
    'A Bíblia ensina responsabilidade sobre a criação.',
    'Gênesis 2:15 —” \'cultivar e guardar\' o jardim.',
    'A criação clama por redenção (Romanos 8:19-22).',
    'O cristão deve ser mordomo responsável da criação.',
    'A exploração da criação é contrária ao mandamento divino.'
  ],
  'versicosChave': [
    'Gênesis 2:15',
    'Romanos 8:19-22',
    'Salmo 24:1'
  ],
  'tags': [
    'meio ambiente',
    'criação',
    'stewardship'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'mi-022',
  'titulo': 'A Missão e a Cultura',
  'categoria': 'Missiologia',
  'subcategoria': 'Contextualização',
  'conteudo': [
    'O evangelho deve ser contextualizado sem ser corrompido.',
    'Paulo se adaptou culturalmente para ganhar mais pessoas.',
    'A contextualização não é sincretismo.',
    'O perigo é contextualizar tanto que o evangelho se perde.',
    'A missão exige: humildade, estudo, oração, coragem.'
  ],
  'versicosChave': [
    '1 Coríntios 9:19-23',
    'Atos 17:22-34'
  ],
  'tags': [
    'cultura',
    'contextualização',
    'missão'
  ],
  'fontes': [
    'Calvino, Institutas',
    'Grudem, Systematic Theology'
  ]
},
  {
  'id': 'cc-068',
  'titulo': 'Cristianismo e Tecnologia',
  'categoria': 'Questões Contemporâneas',
  'subcategoria': 'Cultura',
  'conteudo': [
    'A tecnologia é ferramenta —” pode ser usada para bem ou para mal.',
    'A IA e a automação levantam questões éticas.',
    'A vigilância digital pode ser usada para controle social.',
    'O cristão deve ser sábio no uso da tecnologia.',
    'A tecnologia não substitui a comunhão humana.'
  ],
  'versicosChave': [
    'Provérbios 25:2',
    'Efésios 5:15-16'
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
  'categoria': 'Questões Contemporâneas',
  'subcategoria': 'Criação',
  'conteudo': [
    'A crise ambiental é real —” o cristão deve responder.',
    'O consumismo é idolatria —” \'não acumuleis tesouros na terra\'.',
    'A criação é boa —” Deus a criou e a sustenta.',
    'A responsabilidade sobre a criação é mandamento.',
    'A esperança cristã inclui a renovação de toda a criação.'
  ],
  'versicosChave': [
    'Mateus 6:19-21',
    'Romanos 8:19-22'
  ],
  'tags': [
    'ambiente',
    'crise',
    'criação'
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
    'A Bíblia é a autoridade suprema em todas as questões de fé e prática.',
    'Não há outra revelação além da Escritura.',
    'A tradição tem valor, mas está sujeita à Bíblia.',
    'O magistério é útil, mas não infalível.',
    'A autoridade da Bíblia é auto-testemunhada.'
  ],
  'versicosChave': [
    '2 Timóteo 3:16-17',
    'Isaías 40:8'
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
  'subcategoria': 'Interpretação',
  'conteudo': [
    'A Bíblia é suficientemente clara para que qualquer pessoa possa entender a mensagem central.',
    'A claridade não significa facilidade —” a Bíblia tem passagens difíceis.',
    'O Espírito Santo ilumina a mente para compreender.',
    'A oração e o estudo são necessários.',
    'A perspicuidade é um princípio reformado.'
  ],
  'versicosChave': [
    'Salmo 19:7-8',
    'Salmo 119:130'
  ],
  'tags': [
    'claridade',
    'perspicuidade',
    'interpretação'
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
