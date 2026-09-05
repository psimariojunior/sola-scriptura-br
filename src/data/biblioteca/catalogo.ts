import type { ObraMeta } from './types';

// ─────────────────────────────────────────────────────────────
// Catálogo da Biblioteca Digital — metadados leves (sem texto integral)
// O conteúdo de cada obra vive em ./obras/<id>.ts (lazy por rota)
// Todos os textos são de domínio público (anterior a 1900)
// ─────────────────────────────────────────────────────────────

export const OBRAS: ObraMeta[] = [
  // ═══════════════════ PAIS DA IGREJA ═══════════════════
  {
    id: 'didache',
    titulo: 'A Doutrina dos Doze Apóstolos',
    tituloOriginal: 'Διδαχὴ Κυρίου διὰ τῶν δώδεκα ἀποστόλων (Didaquê)',
    autor: 'Anônimo (comunidade cristã primitiva)',
    autorVida: 'Comunidade da Síria ou Egito, fim do séc. I',
    ano: 95,
    anoTexto: 'c. 80–110 d.C.',
    categoria: 'pais-igreja',
    dificuldade: 'Iniciante',
    idiomaOriginal: 'Grego koiné',
    edicao: 'integral',
    numCapitulos: 16,
    tempoLeituraMin: 25,
    descricao:
      'O manual cristão mais antigo que existe — instruções de ética, batismo, eucaristia e vida em comunidade, escrito possivelmente antes de parte do Novo Testamento.',
    contexto:
      'Descoberto em 1873 por Filoteu Brenios num mosteiro de Constantinopla, o Didaquê circulava em comunidades cristãs do fim do século I. É o testemunho mais precioso sobre como a fé apostólica era vivida na prática antes de todas as formulações posteriores: como se batizava, como se celebrava a ceia, como se escolhiam líderes.',
    importancia:
      'Para a academia, o Didaquê é peça-chave da literatura subsequental: mostra a transição do cristianismo de seita judaica para igreja gentílica. Sua "doutrina dos dois caminhos" (vida x morte) ecoa o Sermão do Monte, e sua liturgia eucarística é a mais antiga fora do Novo Testamento.',
    citacao: {
      texto:
        'Há dois caminhos: o da vida e o da morte. E grande é a diferença entre os dois.',
      fonte: 'Didaquê 1.1',
    },
    tags: ['liturgia', 'ética', 'subséquental', 'batismo', 'eucaristia'],
    capa: { de: '#8B6914', ate: '#C49A4D', acento: '#F5E6C8' },
  },
  {
    id: 'diogneto',
    titulo: 'Epístola a Diogneto',
    tituloOriginal: 'Πρὸς Διόγνητον Ἐπιστολή',
    autor: 'Anônimo (possivelmente Quadrato ou Panteno)',
    autorVida: 'Alexandria ou Ásia Menor, séc. II',
    ano: 190,
    anoTexto: 'c. 150–200 d.C.',
    categoria: 'pais-igreja',
    dificuldade: 'Iniciante',
    idiomaOriginal: 'Grego koiné',
    edicao: 'integral',
    numCapitulos: 12,
    tempoLeituraMin: 20,
    descricao:
      'A mais bela apologia da antiguidade: um cristão anônimo explica a um pagão ilustre quem são os cristãos — "a alma do mundo". Retratada com uma das páginas mais líricas já escritas sobre a identidade cristã.',
    contexto:
      'Endereçada a certo Diogneto, possivelmente um tutor imperial, a epístola responde a três perguntas clássicas: quem é o Deus dos cristãos, que culto lhe prestam e por que essa religião nova apareceu tão tarde. Sobreviveu por acaso num manuscrito do século XIII, quase destruído em Estrasburgo em 1870.',
    importancia:
      'É o documento mais eloquente da autocompreensão cristã primitiva fora do Novo Testamento. O capítulo 5 ("Os cristãos não se distinguem dos demais homens...") é citado em praticamente toda história da igreja antiga. A teologia do cap. 9 sobre a expiação como "troca admirável" antecipou formulações de Irineu e Atanásio.',
    citacao: {
      texto:
        'Os cristãos não se distinguem dos demais homens, nem por terra, nem por língua, nem por costumes... O que a alma é para o corpo, isso são os cristãos para o mundo.',
      fonte: 'A Diogneto 5–6',
    },
    tags: ['apologética', 'identidade cristã', 'expiação'],
    capa: { de: '#9A6B2F', ate: '#D9B36C', acento: '#FAF0DC' },
  },
  {
    id: 'inacio-romanos',
    titulo: 'Epístola aos Romanos',
    tituloOriginal: 'Πρὸς Ῥωμαίους (Inácio de Antioquia)',
    autor: 'Inácio de Antioquia',
    autorVida: 'c. 35–107 d.C. — terceiro bispo de Antioquia',
    ano: 107,
    anoTexto: 'c. 107 d.C.',
    categoria: 'pais-igreja',
    dificuldade: 'Intermediário',
    idiomaOriginal: 'Grego koiné',
    edicao: 'integral',
    numCapitulos: 10,
    tempoLeituraMin: 15,
    descricao:
      'Escrita "em meio às feras" a caminho do martírio: o bispo Inácio, escoltado para Roma, pede aos cristãos que não impeçam sua morte — "deixem-me ser alimento das feras". Com trechos escolhidos das outras seis epístolas.',
    contexto:
      'Preso na perseguição de Trajano, Inácio escreveu sete cartas enquanto era levado de Antioquia a Roma para ser lançado ao Coliseu. Nelas cunhou pela primeira vez a expressão "Igreja Católica" (universal) e defendeu ferozmente a realidade da encarnação contra os docetas, que negavam que Cristo tivesse corpo verdadeiro.',
    importancia:
      'Inácio é a ponte viva entre a era apostólica e a igreja pós-apostólica: conheceu Policarpo, que conheceu João. Sua teologia do martírio como imitação de Cristo e sua eclesiologia centrada no bispo e na eucaristia moldaram séculos de reflexão. A carta aos Romanos é a mais pessoal e comovente de todas.',
    citacao: {
      texto:
        'Deixem-me ser alimento das feras, por meio das quais me é possível alcançar a Deus. Sou trigo de Deus, e sou moado pelos dentes das feras, para que seja achado pão puro de Cristo.',
      fonte: 'Aos Romanos 4',
    },
    tags: ['martírio', 'encarnação', 'eclesiologia', 'eucaristia'],
    capa: { de: '#7A5C1E', ate: '#B08D3E', acento: '#F0E3C0' },
  },
  {
    id: 'policarpo-martirio',
    titulo: 'O Martírio de Policarpo',
    tituloOriginal: 'Μαρτύριον Πολυκάρπου',
    autor: 'Igreja de Esmirna (relato coletivo)',
    autorVida: 'Esmirna, Ásia Menor — relato de 155 d.C.',
    ano: 155,
    anoTexto: 'c. 155 d.C.',
    categoria: 'pais-igreja',
    dificuldade: 'Iniciante',
    idiomaOriginal: 'Grego koiné',
    edicao: 'selecao',
    numCapitulos: 8,
    tempoLeituraMin: 20,
    descricao:
      'A primeira crônica de martírio da história, enviada pela igreja de Esmirna: a morte serena de Policarpo, discípulo direto do apóstolo João, aos 86 anos, que recusou negar seu Senhor com uma das respostas mais célebres de todos os tempos.',
    contexto:
      'Durante a perseguição do imperador Antonino Pio, o procônsul Statius Quadratus exigia que todos sacrificassem ao imperador. Policarpo, bispo de Esmirna por décadas, foi traído por um escravo e julgado no estádio. O relato foi enviado à igreja de Filomélio e se tornou o arquétipo de todos os martirológios posteriores.',
    importancia:
      'É o documento mais antigo do gênero "atos dos mártires" e fixou a teologia do martírio: imitação de Cristo, recusa ao culto imperial e a distinção entre perseguição justa e fanatismo (o autor critica Quinto, que se ofereceu e apostatou). Registrava também a mais antiga oração eucarística pós-bíblica de que se tem notícia.',
    citacao: {
      texto:
        'Oitenta e seis anos o sirvo, e Ele não me fez mal algum. Como blasfemaria contra o meu Rei que me salvou?',
      fonte: 'Martírio de Policarpo 9',
    },
    tags: ['martírio', 'perseguição', 'Esmirna', 'culto imperial'],
    capa: { de: '#8F4A1F', ate: '#C97B3D', acento: '#F6E3CD' },
  },
  {
    id: 'justino-apologia',
    titulo: 'Primeira Apologia',
    tituloOriginal: 'Πρώτη Ἀπολογία (Justino Mártir)',
    autor: 'Justino Mártir',
    autorVida: 'c. 100–165 d.C. — filósofo convertido, Roma',
    ano: 155,
    anoTexto: 'c. 155 d.C.',
    categoria: 'pais-igreja',
    dificuldade: 'Intermediário',
    idiomaOriginal: 'Grego koiné',
    edicao: 'selecao',
    numCapitulos: 9,
    tempoLeituraMin: 35,
    descricao:
      'Um filósofo pagão convertido defende o cristianismo diante do imperador Antonino Pio — com o primeiro registro histórico detalhado do culto cristão dominical: leitura das Escrituras, pregação, orações, batismo e eucaristia.',
    contexto:
      'Justino, mestre de uma escola filosófica em Roma, vestia o manto de filósofo após sua conversão. Dirigiu duas apologias ao imperador e ao senado, denunciando a injustiça de condenar pessoas apenas pelo nome "cristão", sem crime comprovado. Foi decapitado em 165 sob o prefeito Rustico.',
    importancia:
      'Os capítulos 61–67 são a mais antiga descrição completa da liturgia dominical (com o batismo, as leituras, a oração eucarística e a coleta para os pobres) e são citados em toda história da liturgia. Justino também formula a primeira teologia do "logos spermatikós" — sementes do Verbo na filosofia grega — abrindo o diálogo entre fé e razão.',
    citacao: {
      texto:
        'No dia chamado do sol, reunimo-nos todos num mesmo lugar. Lembram-se dos necessitados, e cada um dá o que quer...',
      fonte: 'Primeira Apologia 67',
    },
    tags: ['apologética', 'liturgia', 'filosofia', 'batismo', 'domingo'],
    capa: { de: '#5C6B2F', ate: '#9AA84A', acento: '#EFF3DA' },
  },
  {
    id: 'agostinho-confissoes',
    titulo: 'Confissões (seleções)',
    tituloOriginal: 'Confessiones',
    autor: 'Santo Agostinho',
    autorVida: '354–430 d.C. — bispo de Hipona, Argélia',
    ano: 398,
    anoTexto: 'c. 397–400 d.C.',
    categoria: 'pais-igreja',
    dificuldade: 'Intermediário',
    idiomaOriginal: 'Latim',
    edicao: 'selecao',
    numCapitulos: 9,
    tempoLeituraMin: 45,
    descricao:
      'A primeira autobiografia interior da história ocidental: Agostinho narra sua juventude inquieta, a busca pela verdade através do maniqueísmo e do neoplatonismo, e a conversão num jardim de Milão que mudou a literatura e a teologia para sempre.',
    contexto:
      'Escrevida poucos anos após sua ordenação episcopal, as Confissões são dirigidas a Deus em segunda pessoa — ousadia literária sem precedentes. Dos 13 livros, os nove primeiros narram a vida até a morte da mãe Mônica; os três últimos são exegese de Gênesis; o décimo, sobre memória, é um tratado filosófico disfarçado de memória.',
    importancia:
      'É simultaneamente obra-prima literária, documento filosófico sobre memória e tempo, e o texto fundador da introspecção ocidental. Lutero era monge agostiniano; a Reforma inteira bebe da teologia da graça de Agostinho contra Pelágio. Pascal, Kierkegaard e Wittgenstein o citam de cor.',
    citacao: {
      texto:
        'Fizeste-nos para ti, e inquieto está o nosso coração enquanto não repousa em ti.',
      fonte: 'Confissões I.1',
    },
    tags: ['autobiografia', 'graça', 'conversão', 'filosofia', 'neoplatonismo'],
    capa: { de: '#6B3A52', ate: '#A85C77', acento: '#F3DCE5' },
  },

  // ═══════════════════ CREDOS E CONFISSÕES ═══════════════════
  {
    id: 'credos-ecumenicos',
    titulo: 'Credos da Igreja Antiga',
    tituloOriginal: 'Symbolum Apostolicum · Nicaenum · Athanasianum',
    autor: 'Igreja antiga (concílios ecumênicos)',
    autorVida: 'Séculos II a V',
    ano: 381,
    anoTexto: '150–451 d.C.',
    categoria: 'credos',
    dificuldade: 'Iniciante',
    idiomaOriginal: 'Grego e latim',
    edicao: 'integral',
    numCapitulos: 5,
    tempoLeituraMin: 20,
    descricao:
      'Os quatro pilares doutrinais do cristianismo histórico: Credo dos Apóstolos, Niceno-Constantinopolitano, Atanasiano e a Definição de Calcedônia — com introdução e notas para cada um.',
    contexto:
      'Os credos nasceram da necessidade de resumir a fé para catecúmenos no batismo e de demarcar a ortodoxia contra heresias cristológicas. O Credo dos Apóstolos consolidou-se no século IV a partir de regras de fé batismais romanas; o Niceno-Constantinopolitano (381) respondeu a Ário; Calcedônia (451) fixou a fórmula das duas naturezas de Cristo em duas naturezas "sem confusão, sem mudança, sem divisão, sem separação".',
    importancia:
      'São os textos mais ecumênicos da história: aceitos por católicos, ortodoxos, luteranos, reformados, anglicanos e evangélicos. Toda teologia cristã posterior é comentário, extensão ou disputa dessas fórmulas. Lutero chamou o Credo Niceno de "o mais glorioso triunfo da fé sobre a terra".',
    citacao: {
      texto:
        'Deus de Deus, Luz de Luz, Deus verdadeiro de Deus verdadeiro, gerado, não criado, consubstancial ao Pai.',
      fonte: 'Credo Niceno-Constantinopolitano',
    },
    tags: ['trindade', 'cristologia', 'concílios', 'ecumenismo'],
    capa: { de: '#1F3A5F', ate: '#3E6B9E', acento: '#DCE9F7' },
  },
  {
    id: 'catecismo-menor-westminster',
    titulo: 'Catecismo Menor de Westminster',
    tituloOriginal: 'The Shorter Catechism',
    autor: 'Assembleia de Westminster',
    autorVida: 'Londres, 1643–1652 — 121 teólogos',
    ano: 1648,
    anoTexto: '1648 d.C.',
    categoria: 'credos',
    dificuldade: 'Intermediário',
    idiomaOriginal: 'Inglês',
    edicao: 'integral',
    numCapitulos: 6,
    tempoLeituraMin: 50,
    descricao:
      'As 107 perguntas e respostas completas do mais célebre catecismo da história — incluindo a resposta considerada a frase mais perfeita já escrita em teologia: "o fim principal do homem é glorificar a Deus e gozá-lo para sempre".',
    contexto:
      'Convocada pelo Parlamento inglês durante a Guerra Civil, a Assembleia de Westminster reuniu puritanos e presbiterianos por dez anos para reformar a igreja inglesa. Além da Confissão de Fé, produziu dois catecismos: o Maior (para púlpito) e o Menor (para famílias), este aprovado em 1648.',
    importancia:
      'Exerceu influência desproporcional sobre o protestantismo de língua inglesa e mundial. Sua primeira pergunta fundou uma teologia inteira da alegria em Deus — "gozá-lo para sempre" (enjoy him forever) — resgatada por Jonathan Edwards e, recentemente, por John Piper. Estrutura pedagógica impecável: o que devemos crer e o que devemos fazer.',
    citacao: {
      texto:
        'Qual é o fim principal do homem? Glorificar a Deus e gozá-lo para sempre.',
      fonte: 'Westminster Menor, Pergunta 1',
    },
    tags: ['catecismo', 'puritanos', 'doutrina', 'dez mandamentos'],
    capa: { de: '#274156', ate: '#51708A', acento: '#DFE9F0' },
  },
  {
    id: 'catecismo-heidelberg',
    titulo: 'Catecismo de Heidelberg (seleções)',
    tituloOriginal: 'Heidelberger Katechismus',
    autor: 'Zacarias Ursino e Gaspar Oleviano',
    autorVida: 'Palatinado, Alemanha — 1563',
    ano: 1563,
    anoTexto: '1563 d.C.',
    categoria: 'credos',
    dificuldade: 'Intermediário',
    idiomaOriginal: 'Alemão',
    edicao: 'selecao',
    numCapitulos: 7,
    tempoLeituraMin: 35,
    descricao:
      'O catecismo mais caloroso já escrito: organizado em "miseração, redenção e gratidão", abre com a pergunta sobre o único consolo na vida e na morte. Seleção dos domingos mais importantes das 129 perguntas.',
    contexto:
      'Encomendado pelo eleitor Frederico III para unir luteranos e reformados no Palatinado, foi escrito primariamente por Ursino, de 28 anos. Dividido em 52 "domingos" para pregação anual, traduzido em dezenas de línguas nos primeiros 50 anos — o best-seller teológico do século XVI.',
    importancia:
      'Sua estrutura tripla (pecado → salvação → gratidão) tornou-se o arquétipo pedagógico da teologia reformada. A pergunta 1 é provavelmente a mais citada de toda a literatura catequética: "Qual o seu único consolo na vida e na morte?". A explicação da justificação pela fé na pergunta 60 é uma joia de precisão teológica.',
    citacao: {
      texto:
        'Que teu único consolo na vida e na morte é: que não sou meu, mas pertenço — de corpo e alma — ao meu fiel Salvador Jesus Cristo.',
      fonte: 'Heidelberg, Pergunta 1',
    },
    tags: ['catecismo', 'reformado', 'justificação', 'consolo'],
    capa: { de: '#5A2D2D', ate: '#9E5656', acento: '#F2DEDE' },
  },

  // ═══════════════════ REFORMA ═══════════════════
  {
    id: 'lutero-95-teses',
    titulo: 'As 95 Teses',
    tituloOriginal: 'Disputatio pro declaratione virtutis indulgentiarum',
    autor: 'Martinho Lutero',
    autorVida: '1483–1546 — monge agostiniano, Wittenberg',
    ano: 1517,
    anoTexto: '31 de outubro de 1517',
    categoria: 'reforma',
    dificuldade: 'Iniciante',
    idiomaOriginal: 'Latim',
    edicao: 'integral',
    numCapitulos: 4,
    tempoLeituraMin: 25,
    descricao:
      'O texto integral das 95 teses afixadas (segundo a tradição) na porta do castelo de Wittenberg — o raio que iniciou a Reforma. Apresentadas em quatro blocos temáticos com introdução histórica.',
    contexto:
      'Lutero, doutor em teologia e professor, escreveu as teses como proposta de debate acadêmico contra o comissário Johann Tetzel, que vendia indulgências para financiar a Basílica de São Pedro em Roma. A frase atribuída a Tetzel — "assim que a moeda no cofre tine, a alma do purgatório salta" — sintetiza o abuso combatido.',
    importancia:
      'Em duas semanas, as teses circularam por toda a Alemanha; em dois meses, pela Europa. Não rompiam ainda com Roma — Lutero chamava o papa de "santíssimo" —, mas a tese 62 ("o verdadeiro tesouro da igreja é o santíssimo Evangelho da glória e graça de Deus") continha a Reforma em germe: sola gratia, sola fide, sola scriptura.',
    citacao: {
      texto:
        'Quando nosso Senhor e Mestre Jesus Cristo disse "arrependei-vos", quis que toda a vida dos fiéis fosse arrependimento.',
      fonte: '95 Teses, Tese 1',
    },
    tags: ['reforma', 'indulgências', 'arrependimento', 'sola fide'],
    capa: { de: '#7A1F1F', ate: '#B04A3A', acento: '#F5DCD6' },
  },
  {
    id: 'lutero-liberdade',
    titulo: 'Sobre a Liberdade do Cristão',
    tituloOriginal: 'Von der Freiheit eines Christenmenschen',
    autor: 'Martinho Lutero',
    autorVida: '1483–1546 — monge agostiniano, Wittenberg',
    ano: 1520,
    anoTexto: 'novembro de 1520',
    categoria: 'reforma',
    dificuldade: 'Iniciante',
    idiomaOriginal: 'Latim e alemão',
    edicao: 'selecao',
    numCapitulos: 7,
    tempoLeituraMin: 35,
    descricao:
      'O tratado mais lírico de Lutero, escrito junto com a carta ao papa Leão X nos dias em que queimava a bula de excomunhão: o cristão é "senhor livre de todas as coisas e não sujeito a ninguém" e, ao mesmo tempo, "servo de todas e sujeito a todos" — pela fé e pelo amor.',
    contexto:
      '1520 foi o ano decisivo: Lutero publicou os três grandes tratados reformadores (À Nobreza Alemã, Cativeiro Babilônico da Igreja e A Liberdade do Cristão). Este último, seu manifesto espiritual, acompanhava a carta de despedida ao papa. Foi excomungado em janeiro de 1521 e compareceu à Dieta de Worms em abril.',
    importancia:
      'Contém a síntese ética da Reforma: a fé liberta da necessidade de mérito, e o amor servo ao próximo sem esperar retorno — a antítese perfeita ao sistema de méritos medieval. A dialética liberdade/servidão influenciou Kierkegaard e toda teologia dialética posterior. É o texto ideal para o primeiro contato com o pensamento maduro de Lutero.',
    citacao: {
      texto:
        'O cristão é senhor livre de todas as coisas e não está sujeito a ninguém. O cristão é servo de todas as coisas e está sujeito a todos.',
      fonte: 'A Liberdade do Cristão, teses 1 e 2',
    },
    tags: ['reforma', 'fé', 'liberdade', 'serviço', 'éticas'],
    capa: { de: '#8B4513', ate: '#C1772F', acento: '#F7E5CF' },
  },
  {
    id: 'calvino-institutas',
    titulo: 'Institutas da Religião Cristã (seleções)',
    tituloOriginal: 'Institutio Christianae Religionis',
    autor: 'João Calvino',
    autorVida: '1509–1564 — reformador de Genebra',
    ano: 1559,
    anoTexto: 'edição final de 1559',
    categoria: 'reforma',
    dificuldade: 'Avançado',
    idiomaOriginal: 'Latim',
    edicao: 'selecao',
    numCapitulos: 8,
    tempoLeituraMin: 50,
    descricao:
      "Passagens dos livros I a III da suma teológica mais influente da Reforma: o conhecimento de Deus e de nós mesmos, a Escritura como óculos, a providência, a depravação e a predestinação — na tradução das passagens mais célebres.",
    contexto:
      'Publicada pela primeira vez em 1536 (Calvino tinha 26 anos) e reescrita por 23 anos até a edição definitiva de 1559, em 80 capítulos. Calvino a ofereceu ao rei Francisco I como defesa dos protestantes franceses perseguidos. É simultaneamente apologia, catecismo e suma — a primeira grande sistemática da era moderna.',
    importancia:
      'Nenhuma obra moldou tanto a teologia reformada e, por consequência, o pensamento político e econômico do mundo atlântico (o "espírito capitalista" de Weber é neto da ética calvinista). A imagem dos "óculos" da Escritura (I.6) e a definição da piedade são marcos da história da teologia. Modelo de clareza: Beza dizia que Calvino era "o mais lírico dos teólogos e o mais teólogo dos líricos".',
    citacao: {
      texto:
        'Sem conhecimento de Deus não há conhecimento de si; sem conhecimento de si não há conhecimento de Deus.',
      fonte: 'Institutas I.1–2',
    },
    tags: ['reforma', 'teologia sistemática', 'providência', 'predestinação'],
    capa: { de: '#3D3D5C', ate: '#6B6B94', acento: '#E3E1F0' },
  },

  // ═══════════════════ ESPIRITUALIDADE CLÁSSICA ═══════════════════
  {
    id: 'imitacao-cristo',
    titulo: 'Imitação de Cristo (seleções)',
    tituloOriginal: 'De Imitatione Christi',
    autor: 'Tomás de Kempis',
    autorVida: 'c. 1380–1471 — cônego regular de Zwolle',
    ano: 1420,
    anoTexto: 'c. 1418–1427',
    categoria: 'espiritualidade',
    dificuldade: 'Iniciante',
    idiomaOriginal: 'Latim',
    edicao: 'selecao',
    numCapitulos: 10,
    tempoLeituraMin: 35,
    descricao:
      'O livro mais lido da história depois da Bíblia: a espiritualidade da devotio moderna em máximas de sabedoria eterna sobre humildade, sofrimento, solidão e amor a Cristo — seleção dos capítulos imortais dos quatro livros.',
    contexto:
      'Escrito provavelmente no mosteiro agostiniano de Agnietenberg, perto de Zwolle (Holanda), por Tomás de Kempis ou seu círculo da devotio moderna — movimento que pregava a imitação prática de Cristo contra o formalismo escolástico. Sobrevivem centenas de manuscritos; foi impresso mais vezes que qualquer outro livro nos primeiros séculos da imprensa.',
    importancia:
      'Traduzido para mais línguas que qualquer livro cristão fora da Bíblia, inspirou de Inácio de Loyola a Thomas Merton. Wesley o lia diariamente; Matthew Arnold chamou-o de "o mais belo tesouro de sabedoria da devoção cristã". Ao lado da Confissão de Agostinho e dos Exercícios de Inácio, forma o tríptico da literatura devocional clássica.',
    citacao: {
      texto:
        'Seguir a Cristo é o sumo da sabedoria. Busca, pois, não o que compreende, mas o que experimentas.',
      fonte: 'Imitação de Cristo II.2',
    },
    tags: ['devotio moderna', 'humildade', 'mística', 'discipulado'],
    capa: { de: '#4A5A2F', ate: '#7E9153', acento: '#EDF2DC' },
  },
  {
    id: 'presenca-deus',
    titulo: 'A Prática da Presença de Deus',
    tituloOriginal: 'La Pratique de la Présence de Dieu',
    autor: 'Irmão Lawrence (Nicolas Herman)',
    autorVida: 'c. 1614–1691 — irmão leigo carmelita, Paris',
    ano: 1691,
    anoTexto: 'cartas de 1666–1691',
    categoria: 'espiritualidade',
    dificuldade: 'Iniciante',
    idiomaOriginal: 'Francês',
    edicao: 'selecao',
    numCapitulos: 6,
    tempoLeituraMin: 25,
    descricao:
      'As cartas e conversas do monge que lavava pratos na cozinha do mosteiro e ali encontrava a Deus tão intimamente quanto no altar — o clássico da espiritualidade no cotidiano, selecionado e comentado.',
    contexto:
      'Nicolas Herman, camponês de Lorraine, serviu como soldado antes de entrar como irmão leigo no mosteiro carmelita de Paris, onde passou décadas trabalhando na cozinha e na sapataria. Suas cartas foram reunidas e publicadas após sua morte pelo abade de Beaufort, tornando-se um dos livros cristãos mais distribuídos da história.',
    importancia:
      'É o texto fundador da "prática da presença" — a espiritualidade do trabalho ordinário que influenciou o metodismo de Wesley, o puritanismo inglês (que publicava traduzido) e a espiritualidade evangélica contemporânea. Sua tese central — que Deus está na panela tanto quanto na pia batismal — democratizou a mística, antes reservada a mosteiros.',
    citacao: {
      texto:
        'O tempo da ação não é diferente do tempo de oração. Possuo Deus tão tranquilo na cozinha, entre as panelas, quanto no altar.',
      fonte: 'Conversas, 4ª máxima',
    },
    tags: ['oração', 'trabalho', 'contemplação', 'cotidiano'],
    capa: { de: '#6B5B2F', ate: '#A2915B', acento: '#F1EDDC' },
  },

  // ═══════════════════ CONTEXTO HISTÓRICO ═══════════════════
  {
    id: 'josefo-quaeda-jerusalem',
    titulo: 'A Queda de Jerusalém',
    tituloOriginal: 'Bellum Judaicum, Livro VI (seleções)',
    autor: 'Flávio Josefo',
    autorVida: '37–c. 100 d.C. — historiador judeu-romano',
    ano: 75,
    anoTexto: 'c. 75 d.C. (eventos de 70 d.C.)',
    categoria: 'historia',
    dificuldade: 'Intermediário',
    idiomaOriginal: 'Grego (edição de matérias aramaicas)',
    edicao: 'selecao',
    numCapitulos: 7,
    tempoLeituraMin: 40,
    descricao:
      'O relato do historiador que testemunhou o cerco de Jerusalém: os sinais sobrenaturais antes da destruição, a fome dentro da cidade, a tomada do Templo no dia 10 de Abib — o evento que Jesus predisse em Lucas 21 e que definiu o judaísmo e o cristianismo para sempre.',
    contexto:
      'Josefo, comandante galileu na Grande Revolta (66–70), foi capturado, previu a vitória de Vespasiano e foi adotado na casa Flávia. Escreveu a Guerra dos Judeus como testemunha ocular — parte como filho, parte como apologista da Roma vencedora. O livro VI narra os cinco meses de cerco de Tito, com números dramáticos: mais de um milhão de mortos segundo seu cálculo.',
    importancia:
      'É a única testemunha historiográfica detalhada da destruição do Segundo Templo, evento que Jesus anuncia nos Evangelhos ("não ficará pedra sobre pedra") e que os estudiosos usam para datar Marcos 13 e Lucas 21. O paralelo entre os "sinais" relatados por Josefo e a linguagem apocalíptica judaica é objeto de debate acadêmico até hoje — leitura obrigatória para exegese do NT.',
    citacao: {
      texto:
        'Todas as calamidades de todos os tempos, desde a criação do mundo, não superaram as de Israel.',
      fonte: 'Guerra dos Judeus VI.8.7 §420',
    },
    tags: ['judaísmo', 'guerra', 'Templo', 'arqueologia', 'profecia'],
    capa: { de: '#5C4033', ate: '#9E7B62', acento: '#EFE3DA' },
  },

  // ═══════════════════ CREDOS E CONFISSÕES (EXPANDIDOS) ═══════════════════
  {
    id: 'confissao-fe-batista-1689',
    titulo: 'Confissão de Fé Batista de 1689',
    tituloOriginal: 'London Baptist Confession of Faith',
    autor: 'Assembleia de Batistas Particulares de Londres',
    autorVida: 'Londres, 1677–1689',
    ano: 1689,
    anoTexto: '1689 d.C.',
    categoria: 'credos',
    dificuldade: 'Avançado',
    idiomaOriginal: 'Inglês',
    edicao: 'selecao',
    numCapitulos: 12,
    tempoLeituraMin: 60,
    descricao:
      'A confissão de fé reformada mais influente do batismo particular: 32 capítulos sistematizando doutrinas da aliança, graça eficaz, perseverança dos santos e governo eclesiástico congregacional. Seleção dos capítulos essenciais.',
    contexto:
      'Redigida em 1677 e adotada publicamente em 1689 por 107 igrejas batistas de Londres, esta confissão é uma adaptação batista da Confissão de Westminster (1646) com modificações no governo eclesiástico (congregacional vs presbiteriano) e na administração do batismo. Tornou-se o padrão doutrinário do baptismo reformado mundial.',
    importancia:
      'É a confissão mais usada em seminários batistas reformados do mundo. Suas definições de aliança, graça eficaz e perseverança dos santos influenciam a teologia batista desde o século XVII. O Capítulo 10 (Sobre a Graça Eficaz) é uma das formulações mais precisas do calvinismo batista.',
    citacao: {
      texto:
        'A graça eficaz de Deus seleciona aqueles que serão salvos; e, dentre eles, todos os que são escolhidos, embora defeats em seus pecados, Ele os chama eficazmente pela Sua Palavra e Seu Espírito.',
      fonte: 'Confissão Batista de 1689, Capítulo 10, §1',
    },
    tags: ['batismo', 'aliança', 'graça', 'perseverança', 'calvinismo'],
    capa: { de: '#2D3748', ate: '#4A5568', acento: '#E2E8F0' },
  },
  {
    id: 'catecismo-westminster-mais',
    titulo: 'Catecismo Maior de Westminster',
    tituloOriginal: 'The Larger Catechism',
    autor: 'Assembleia de Westminster',
    autorVida: 'Londres, 1643–1652',
    ano: 1648,
    anoTexto: '1648 d.C.',
    categoria: 'credos',
    dificuldade: 'Avançado',
    idiomaOriginal: 'Inglês',
    edicao: 'selecao',
    numCapitulos: 10,
    tempoLeituraMin: 70,
    descricao:
      'As 196 perguntas e respostas do Catecismo Maior, destinado ao uso do púlpito e aos pais que catequizam seus filhos. Mais detalhado que o Menor, aprofunda cada ponto da doutrina com base bíblica rigorosa.',
    contexto:
      'Encomendado pelo Parlamento inglês juntamente com o Catecismo Menor, o Maior foi escrito para pastores e professores que precisavam de uma referência mais completa. Enquanto o Menor resume em 107 perguntas, o Maior expande em 196, com citações bíblicas para cada resposta.',
    importancia:
      'É a obra catequética mais completa da tradição reformada. Seus tratados sobre sacramentos, oração e ética cristã são referência em seminários presbiterianos. A Pergunta 159 ("Como devemos orar?") é um dos tratados mais práticos sobre oração já escritos.',
    citacao: {
      texto:
        'Como devemos orar? Respondemos: Como Cristo nos ensinou a orar, não com muitas palavras e repetições vãs, mas com humildade, fervor e perseverança.',
      fonte: 'Catecismo Maior de Westminster, Pergunta 159',
    },
    tags: ['catecismo', 'presbiterianismo', 'oração', 'sacramentos', 'ética'],
    capa: { de: '#1A365D', ate: '#2B6CB0', acento: '#BEE3F8' },
  },
  {
    id: 'confissao-fe-guia',
    titulo: 'Guia do Peregrino (Breve Sumário da Confissão de Fé)',
    tituloOriginal: 'The Pilgrim\'s Progress (Sumário)',
    autor: 'John Bunyan',
    autorVida: '1628–1688 — peregrino batista, Bedford',
    ano: 1678,
    anoTexto: '1678 d.C.',
    categoria: 'credos',
    dificuldade: 'Iniciante',
    idiomaOriginal: 'Inglês',
    edicao: 'selecao',
    numCapitulos: 8,
    tempoLeituraMin: 40,
    descricao:
      'Uma seleção temática das passagens mais significativas do alegado romance mais lido da história cristã depois da Bíblia: a jornada de Cristão da Cidade da Destruição até a Cidade Celestial.',
    contexto:
      'Bunyan escreveu na prisão por pregar sem licença, entre 1675 e 1678. O livro é uma alegoria da vida cristã que combina teologia puritana com narrativa vívida — cada personagem (Desespero, Dúvida, Fiel) é uma experiência espiritual real.',
    importancia:
      'Traduzido para mais de 200 línguas, é a obra mais influente da literatura cristã em inglês. Spurgeon o chamou de "o livro que mais lerias, depois da Bíblia". A alegoria tornou a teologia reformada acessível ao povo comum.',
    citacao: {
      texto:
        'Eu não vi nada do que deixei para trás — mas vejo o que está diante de mim. O caminho é estreito, mas a glória que nos espera é eterna.',
      fonte: 'O Peregrino, Parte I',
    },
    tags: ['alegoria', 'puritanismo', 'peregrinação', 'vida cristã', 'sacramentos'],
    capa: { de: '#5B2333', ate: '#8B3A4A', acento: '#F3E0E5' },
  },
  // ═══════════════════ REFORMA (EXPANDIDO) ═══════════════════
  {
    id: 'lutero-servo-arbitrio',
    titulo: 'Sobre a Servidão da Vontade (De Servo Arbitrio)',
    tituloOriginal: 'De Servo Arbitrio',
    autor: 'Martinho Lutero',
    autorVida: '1483–1546 — monge agostiniano, Wittenberg',
    ano: 1525,
    anoTexto: 'outubro de 1525',
    categoria: 'reforma',
    dificuldade: 'Avançado',
    idiomaOriginal: 'Latim',
    edicao: 'selecao',
    numCapitulos: 8,
    tempoLeituraMin: 50,
    descricao:
      'A resposta mais feroz de Lutero a Erasmo de Roterdã: a vontade humana não é livre mas escrava — cativa do pecado ou cativa da graça. Um dos textos mais ousados sobre a soberania divina e a depravação humana.',
    contexto:
      'Lutero escreveu contra o De Libero Arbitrio de Erasmo (1524), que defendia o livre-arbítrio. Lutero argumentou que Erasmo era "fluido como a água" — incapaz de tomar posição firme. O De Servo Arbitrio é a obra mais sistemática de Lutero sobre predestinação e graça.',
    importancia:
      'É o manifesto teológico mais radical da Reforma sobre a depravação humana. A tese central — "a vontade é escrava" — influenciou Calvino, os puritanos e toda a tradição reformada. O diálogo com Erasmo é um dos mais importantes da história da teologia.',
    citacao: {
      texto:
        'A vontade humana está no meio, entre Deus e o diabo. Se Deus domina, a vontade faz o que Deus quer. Se o diabo domina, faz o que ele quer. Mas nunca é livre.',
      fonte: 'De Servo Arbitrio, §38',
    },
    tags: ['reforma', 'livre-arbítrio', 'predestinação', 'depravação', 'soberania'],
    capa: { de: '#4A1A1A', ate: '#7A2E2E', acento: '#F2DADA' },
  },
  {
    id: 'lutero-liberdade-mais',
    titulo: 'Sobre a Liberdade do Cristão (expansão)',
    tituloOriginal: 'Von der Freiheit eines Christenmenschen',
    autor: 'Martinho Lutero',
    autorVida: '1483–1546 — monge agostiniano, Wittenberg',
    ano: 1520,
    anoTexto: 'novembro de 1520',
    categoria: 'reforma',
    dificuldade: 'Intermediário',
    idiomaOriginal: 'Latim e alemão',
    edicao: 'selecao',
    numCapitulos: 10,
    tempoLeituraMin: 45,
    descricao:
      'Expansão dos capítulos adicionais de A Liberdade do Cristão, incluindo a instrução sobre como o cristão deve usar sua liberdade no serviço ao próximo, a distinção entre liberdade interna e externa, e a ética da responsabilidade social.',
    contexto:
      'Além das 21 teses originais, Lutero expandiu o tratado com aplicações práticas: o cristão é servo de todos no amor, mas senhor de todas na fé. A liberdade cristã não é antinomianismo — é a base para o serviço sacrificial.',
    importancia:
      'Os capítulos adicionais mostram que a teologia da liberdade de Lutero não é individualista: a liberdade é para o próximo. Influenciou a ética social protestante e a doutrina da vocação.',
    citacao: {
      texto:
        'O cristão é senhor de todas as coisas e está sujeito a ninguém — pela fé. E é servo de todas as coisas e está sujeito a todos — pelo amor.',
      fonte: 'A Liberdade do Cristão, teses 13-14',
    },
    tags: ['reforma', 'liberdade', 'amor', 'serviço', 'ética'],
    capa: { de: '#7A4513', ate: '#B86B1F', acento: '#F8E8CF' },
  },
  {
    id: 'calvino-institutas-mais',
    titulo: 'Institutas da Religião Cristã (mais seções)',
    tituloOriginal: 'Institutio Christianae Religionis',
    autor: 'João Calvino',
    autorVida: '1509–1564 — reformador de Genebra',
    ano: 1559,
    anoTexto: 'edição final de 1559',
    categoria: 'reforma',
    dificuldade: 'Avançado',
    idiomaOriginal: 'Latim',
    edicao: 'selecao',
    numCapitulos: 10,
    tempoLeituraMin: 65,
    descricao:
      'Seções adicionais dos Livros III e IV: sobre os sacramentos, a Igreja, o magistrado civil, e a vida cristã prática. A visão completa de Calvino sobre a sociedade e a adoração.',
    contexto:
      'O Livro III trata da recepção da graça (fé, regeneração, oração, justificação) e o Livro IV da Igreja (sacramentos, governo eclesiástico, magistrado). Calvino dedicou o livro ao rei Francisco I como defesa dos protestantes franceses.',
    importancia:
      'As seções sobre sacramentos (IV.14-19) são a base da teologia reformada da Ceia do Senhor. A doutrina do magistrado civil (IV.20) influenciou a teoria política protestante. As páginas sobre oração (III.20) são um dos tratados mais práticos da Reforma.',
    citacao: {
      texto:
      'A Igreja existe onde está a Palavra de Deus pregada e os sacramentos administrados corretamente — não onde há magnificência de edifícios.',
      fonte: 'Institutas IV.1.7',
    },
    tags: ['reforma', 'sacramentos', 'igreja', 'magistrado', 'oração'],
    capa: { de: '#3D3D5C', ate: '#6B6B94', acento: '#E3E1F0' },
  },
  {
    id: 'calvino-comentario-romanos',
    titulo: 'Comentário à Epístola aos Romanos',
    tituloOriginal: 'In Epistolam Pauli ad Romanos Commentarius',
    autor: 'João Calvino',
    autorVida: '1509–1564 — reformador de Genebra',
    ano: 1540,
    anoTexto: '1540 d.C.',
    categoria: 'reforma',
    dificuldade: 'Avançado',
    idiomaOriginal: 'Latim',
    edicao: 'selecao',
    numCapitulos: 8,
    tempoLeituraMin: 55,
    descricao:
      'O comentário mais importante de Calvino, versículo por verso, sobre a epístola que moldou a teologia da Reforma. Inclui a análise de Romanos 3:21-26 (justificação), Romanos 8 (segurança do crente) e Romanos 9-11 (predestinação).',
    contexto:
      'Calvino publicou seu comentário a Romanos em 1540, antes dos Institutos em sua forma final. É uma exposição cuidadosa que combina exegese filológica com aplicação pastoral. Calvino o escreveu para pastores e estudiosos, não apenas para acadêmicos.',
    importancia:
      'O comentário a Romanos de Calvino é considerado uma das melhores exposições da epístola já escritas. Sua análise de Romanos 3:21-26 influenciou toda a tradição reformada. O comentário a Romanos 8 é uma das meditações mais profundas sobre a segurança do crente.',
    citacao: {
      texto:
        'Paulo não ensina que somos justificados pela fé como se a fé em si mesma fosse um mérito — mas porque Cristo é o nosso mérito, que pela fé nos é imputado.',
      fonte: 'Comentário a Romanos 3:26',
    },
    tags: ['comentário', 'romanos', 'justificação', 'predestinação', 'exegese'],
    capa: { de: '#4A3D2F', ate: '#7A6B4E', acento: '#EDE5D6' },
  },
  // ═══════════════════ ESPIRITUALIDADE CLÁSSICA (EXPANDIDO) ═══════════════════
  {
    id: 'spurgeon-sermoes',
    titulo: 'Sermões Escolhidos de Spurgeon',
    tituloOriginal: 'Selected Sermons of C.H. Spurgeon',
    autor: 'Charles Haddon Spurgeon',
    autorVida: '1834–1892 — Príncipe dos Pregadores, Londres',
    ano: 1866,
    anoTexto: '1855–1891',
    categoria: 'espiritualidade',
    dificuldade: 'Iniciante',
    idiomaOriginal: 'Inglês',
    edicao: 'selecao',
    numCapitulos: 10,
    tempoLeituraMin: 50,
    descricao:
      'Uma seleção dos melhores sermões de Spurgeon, incluindo "A Negra Desesperação" (Texto: Mateus 8:12), "Vejam o Cordeiro de Deus" e "A Graça Abundante de Deus" — o púlpito cristão em sua forma mais poderosa.',
    contexto:
      'Spurgeon pregou por 38 anos no Metropolitan Tabernacle em Londres para multidões de 5.000 a 10.000 pessoas, sem microfone. Seus sermões eram publicados na segunda-feira e distribuídos em 43 línguas. Mais de 20 milhões de volumes de seus sermões foram impressos em vida.',
    importancia:
      'Spurgeon é o pregador mais influente da história protestante pós-Reforma. Seus sermões combinam eloquência popular com ortodoxia reformada. A Coleção Completa de seus 3.561 sermões é o maior corpo de pregação cristã já publicado.',
    citacao: {
      texto:
        'O evangelho é simples o suficiente para que a criança o entenda e profundo o suficiente para que o filósofo não o esgote.',
      fonte: 'Sermão, "A Simplicidade do Evangelho"',
    },
    tags: ['pregação', 'evangelismo', 'calvinismo', 'piedade', 'Londres'],
    capa: { de: '#2D3748', ate: '#4A5568', acento: '#E2E8F0' },
  },
  {
    id: 'caminho-santidade',
    titulo: 'O Caminho da Santidade',
    tituloOriginal: 'The Holy Life of the Justified',
    autor: 'John Bunyan',
    autorVida: '1628–1688 — peregrino batista, Bedford',
    ano: 1677,
    anoTexto: '1677 d.C.',
    categoria: 'espiritualidade',
    dificuldade: 'Intermediário',
    idiomaOriginal: 'Inglês',
    edicao: 'selecao',
    numCapitulos: 6,
    tempoLeituraMin: 30,
    descricao:
      'Um tratado breve e poderoso sobre a santificação: como o crente justificado deve viver em santidade prática. Bunyan explora a tensão entre a justificação perfeita e a santificação imperfeita.',
    contexto:
      'Bunyan, preso por 12 anos por pregar sem licença, escreveu sua teologia com a vivacidade de quem a vive na prisão. Este tratado é o complemento teológico de O Peregrino — enquanto o romance mostra a jornada, este tratado explica a teologia.',
    importancia:
      'É uma das melhores exposições práticas da relação entre justificação e santificação. Bunyan mostra que a graça que justifica também santifica — a fé sem obras é morta.',
    citacao: {
      texto:
        'O justo é feito perfeito em Cristo, mas ainda não é perfeito em si mesmo — até que chegue à glória.',
      fonte: 'O Caminho da Santidade, Capítulo 2',
    },
    tags: ['santificação', 'piedade', 'puritanismo', 'vida cristã'],
    capa: { de: '#5B2333', ate: '#8B3A4A', acento: '#F3E0E5' },
  },
  {
    id: 'vida-interior',
    titulo: 'A Vida Interior',
    tituloOriginal: 'Instructions et Maximes sur la Vie Intérieure',
    autor: 'Jacques-Bénigne Bossuet',
    autorVida: '1627–1704 — bispo de Meaux, Francês',
    ano: 1700,
    anoTexto: 'póstumo, 1700',
    categoria: 'espiritualidade',
    dificuldade: 'Intermediário',
    idiomaOriginal: 'Francês',
    edicao: 'selecao',
    numCapitulos: 7,
    tempoLeituraMin: 35,
    descricao:
      'Um guia clássico da vida interior cristã: como cultivar a oração, a humildade e a dependência de Deus. Bossuet ensina que a vida espiritual não é ecstasy mas obediência silenciosa.',
    contexto:
      'Bossuet, bispo de Meaux e um dos maiores oradores franceses, escreveu estas instruções para suas freiras. Publicado postumamente, tornou-se um clássico da espiritualidade católica francesa, ao lado dos escritos de François Fénelon.',
    importancia:
      'É um dos mais belos tratados sobre a vida interior cristã. Bossuet distingue entre misticismo entusiasta e piedade sóbria — a verdadeira vida interior é humildade, silêncio e obediência.',
    citacao: {
      texto:
        'A verdadeira oração não consiste em sentir, mas em se entregar a Deus — mesmo quando nada sentimos.',
      fonte: 'A Vida Interior, Instrução 5',
    },
    tags: ['oração', 'vida interior', 'humildade', 'catolicismo francês', 'misticismo'],
    capa: { de: '#4A3D5C', ate: '#7A5C8B', acento: '#E8E0F0' },
  },
  // ═══════════════════ CARTAS DE PAULO (COLETÂNEA) ═══════════════════
  {
    id: 'cartas-paulo',
    titulo: 'Cartas de Paulo (coletânea temática)',
    tituloOriginal: 'Epistolae Pauli (collectio)',
    autor: 'Paulo de Tarso (e colaboradores)',
    autorVida: 'c. 5–64/67 d.C. — apóstolo dos gentios',
    ano: 55,
    anoTexto: 'c. 50–64 d.C.',
    categoria: 'pais-igreja',
    dificuldade: 'Intermediário',
    idiomaOriginal: 'Grego koiné',
    edicao: 'selecao',
    numCapitulos: 12,
    tempoLeituraMin: 60,
    descricao:
      'Uma coletânea temática das passagens mais influentes das 13 epístolas paulinas, organizadas por tema: justificação (Romanos), amor (1 Coríntios 13), humildade (Filipenses 2), guerra espiritual (Efésios 6), e esperança (1 Tessalonicenses 4).',
    contexto:
      'Paulo escreveu suas cartas para igrejas específicas com problemas concretos — não eram tratados teológicos abstratos. Cada carta reflete o contexto da comunidade, os problemas que enfrentavam e as perguntas que faziam. A coletânea destaca as passagens que moldaram a teologia cristã.',
    importancia:
      'As epístolas paulinas constituem mais de um terço do Novo Testamento e são a base da teologia cristã ocidental. Romanos e Gálatas fundaram a Reforma; 1 Coríntios 13 é o "hino do amor" mais citado; Filipenses 2 é a cristologia mais antiga.',
    citacao: {
      texto:
        'Porque pela graça sois salvos, por meio da fé; e isso não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie.',
      fonte: 'Efésios 2:8-9',
    },
    tags: ['cartas', 'paulo', 'justificação', 'amor', 'cristologia'],
    capa: { de: '#6B4A1E', ate: '#A87830', acento: '#F5E8D2' },
  },

  // ═══════════════════ PAIS DA IGREJA (EXPANDIDO) ═══════════════════
  {
    id: 'origenes-principios',
    titulo: 'Sobre os Primeiros Princípios',
    tituloOriginal: 'De Principiis',
    autor: 'Orígenes de Alexandria',
    autorVida: 'c. 185–254 d.C. — teólogo de Alexandria',
    ano: 250,
    anoTexto: 'c. 230–250 d.C.',
    categoria: 'pais-igreja',
    dificuldade: 'Avançado',
    idiomaOriginal: 'Grego (traduzido ao latim por Rufino)',
    edicao: 'selecao',
    numCapitulos: 6,
    tempoLeituraMin: 40,
    descricao:
      'A primeira tentativa de sistematizar a teologia cristã: Orígenes explora Deus, a criação, o pecado, a encarnação, a ressurreição e o juízo final — com a ousadia de quem pensa sem medo.',
    contexto:
      'Orígenes foi o maior teólogo do séc. III, mas foi condenado postumamente no Concílio de Constantinopla (553) por algumas das suas teses — como a preexistência das almas. O De Principiis é a sua obra sistemática mais importante, preservada em latim por Rufino.',
    importancia:
      'É o primeiro tratado sistemático da história da teologia cristã. A sua metodologia — Escritura, tradição e razão — antecipou em 1.500 anos o método teológico protestante. Influenciou Gregório de Nissa, Basílio e toda a teologia posterior.',
    citacao: {
      texto:
        'Deus criou todas as coisas não porque necessitasse delas, mas porque a bondade não pode ser ociosa.',
      fonte: 'De Principiis II.9',
    },
    tags: ['teologia sistemática', 'trindade', 'criação', 'alegoria'],
    capa: { de: '#4A3D2F', ate: '#7A6B4E', acento: '#EDE5D6' },
  },
  {
    id: 'cipriano-unidade',
    titulo: 'Sobre a Unidade da Igreja',
    tituloOriginal: 'De Unitate Ecclesiae',
    autor: 'Santo Cipriano',
    autorVida: 'c. 210–258 d.C. — bispo de Cartago, mártir',
    ano: 256,
    anoTexto: 'c. 256 d.C.',
    categoria: 'pais-igreja',
    dificuldade: 'Intermediário',
    idiomaOriginal: 'Latim',
    edicao: 'selecao',
    numCapitulos: 5,
    tempoLeituraMin: 30,
    descricao:
      'O tratado mais influente sobre a unidade da igreja na antiguidade: Cipriano argumenta que fora da igreja não há salvação — uma tese que moldou a eclesiologia cristã por séculos.',
    contexto:
      'Cipriano escreveu durante o cisma de Novaciano, que contestava a autoridade do bispo de Roma e a reconciliação dos lapsos (apóstatas que voltaram after perseguição). O De Unitate é a defesa da autoridade episcopal como centro da unidade.',
    importancia:
      'A frase "extra Ecclesiam nulla salus" (fora da igreja não há salvação) tornou-se dogma. O tratado influenciou toda a eclesiologia — tanto católica (autoridade do bispo) quanto protestante (a igreja como comunidade visível).',
    citacao: {
      texto:
        'Cristo fundou a igreja uma — não múltiplas igrejas, mas uma só.',
      fonte: 'De Unitate 6',
    },
    tags: ['eclesiologia', 'unidade', 'bispo', 'cisma'],
    capa: { de: '#5A2D2D', ate: '#9E5656', acento: '#F2DEDE' },
  },
  {
    id: 'gregorio-nissa-moises',
    titulo: 'Vida de Moisés',
    tituloOriginal: 'Vita Moysis',
    autor: 'Santo Gregório de Nissa',
    autorVida: 'c. 335–395 d.C. — bispo de Nissa, Capadócia',
    ano: 380,
    anoTexto: 'c. 380 d.C.',
    categoria: 'pais-igreja',
    dificuldade: 'Avançado',
    idiomaOriginal: 'Grego',
    edicao: 'selecao',
    numCapitulos: 7,
    tempoLeituraMin: 45,
    descricao:
      'A biografia espiritual de Moisés como alegoria da vida contemplativa: Gregório lê a narrativa do Êxodo como itinerário da alma que busca Deus — das águas do Nilo à montanha da transfiguração.',
    contexto:
      'Gregório, bispo de Nissa na Capadócia, era irmão de Basílio e um dos grandes Padres Capadócios. A Vida de Moisés é a sua obra-prima literária e espiritual — uma leitura alegórica que combina exegese, filosofia e mística.',
    importancia:
      'É o texto fundador da mística cristã oriental. A leitura alegórica de Gregório influenciou toda a tradição contemplativa — de Pseudo-Dionísio a Meister Eckhart. A sua teologia da "epektasis" (progresso infinito em direção a Deus) é uma das ideias mais ousadas da história da teologia.',
    citacao: {
      texto:
        'O fogo da sarça é a imagem da encarnação: a natureza divina unida à humana, queimando sem consumir.',
      fonte: 'Vita Moysis II',
    },
    tags: ['mística', 'alegoria', 'Êxodo', 'contemplação'],
    capa: { de: '#3D5C4A', ate: '#5C8B6B', acento: '#E0F0E5' },
  },
  {
    id: 'basilio-espirito-santo',
    titulo: 'Sobre o Espírito Santo',
    tituloOriginal: 'De Spiritu Sancto',
    autor: 'Santo Basílio, o Grande',
    autorVida: 'c. 330–379 d.C. — arcebispo de Cesareia, Capadócia',
    ano: 375,
    anoTexto: 'c. 375 d.C.',
    categoria: 'pais-igreja',
    dificuldade: 'Intermediário',
    idiomaOriginal: 'Grego',
    edicao: 'selecao',
    numCapitulos: 6,
    tempoLeituraMin: 40,
    descricao:
      'A defesa mais eloquente da divindade do Espírito Santo: Basílio argumenta que o Espírito não é uma força impessoal, mas pessoa divina, coeterna e consubstancial ao Pai e ao Filho.',
    contexto:
      'Basílio escreveu contra os pneumatomachos ("combatentes do Espírito"), que negavam a divindade do Espírito Santo. O De Spiritu Sancto é a sua resposta, com base na Escritura, na tradição litúrgica e na experiência da igreja.',
    importancia:
      'O De Spiritu Sancto completou a formulação trinitária iniciada por Atanásio. A distinção de Basílio entre "essência" (ousia) e "pessoa" (hipóstase) é a base da teologia trinitária ortodoxa.',
    citacao: {
      texto:
        'O Espírito Santo não é uma energia impersonal, mas pessoa divina — coeterna e consubstancial ao Pai e ao Filho.',
      fonte: 'De Spiritu Sancto 18',
    },
    tags: ['trindade', 'Espírito Santo', 'pneumatologia', 'liturgia'],
    capa: { de: '#1F3A5F', ate: '#3E6B9E', acento: '#DCE9F7' },
  },
  {
    id: 'ambrosio-deveres',
    titulo: 'Sobre os Deveres dos Ministros',
    tituloOriginal: 'De Officiis Ministrorum',
    autor: 'Santo Ambrósio',
    autorVida: 'c. 340–397 d.C. — bispo de Milão',
    ano: 386,
    anoTexto: 'c. 386 d.C.',
    categoria: 'pais-igreja',
    dificuldade: 'Iniciante',
    idiomaOriginal: 'Latim',
    edicao: 'selecao',
    numCapitulos: 5,
    tempoLeituraMin: 35,
    descricao:
      'O primeiro manual de ética pastoral da história: Ambrósio define os deveres dos sacerdotes — misericórdia, justiça, castidade, paciência — com exemplos bíblicos.',
    contexto:
      'Ambrósio escreveu aos presbíteros de Milão, inspirado nos De Officiis de Cícero — mas substituindo a ética cívica romana pela ética cristã. É o primeiro texto a aplicar a moral evangélica à prática pastoral.',
    importancia:
      'O De Officiis开创了基督教牧灵文学的先河。它影响了金口约翰的《论祭司职》、格里高利·纳齐安的《神学演说》以及整个中世纪的牧灵手册传统。',
    citacao: {
      texto:
        'Cristo lavou os pés dos discípulos — o gesto mais humilde de todos — e disse: "Eu fiz isso para que vós façais o mesmo."',
      fonte: 'De Officiis I.56',
    },
    tags: ['pastoral', 'ética', 'ministério', 'humildade'],
    capa: { de: '#5C3D2F', ate: '#9E6B4E', acento: '#F0E5D6' },
  },
  {
    id: 'jeronimo-cartas',
    titulo: 'Cartas (seleção)',
    tituloOriginal: 'Epistulae',
    autor: 'São Jerônimo',
    autorVida: 'c. 347–420 d.C. — eremita, tradutor da Vulgata',
    ano: 400,
    anoTexto: 'c. 375–420 d.C.',
    categoria: 'pais-igreja',
    dificuldade: 'Iniciante',
    idiomaOriginal: 'Latim',
    edicao: 'selecao',
    numCapitulos: 5,
    tempoLeituraMin: 35,
    descricao:
      'As cartas mais pessoais da antiguidade cristã: Jerônimo aconselha amigas, discute Escritura, polemiza com inimigos — com a eloquência e a acidez que o tornaram o mais polêmico dos Padres.',
    contexto:
      'Jerônimo, tradutor da primeira edição completa da Bíblia em latim (Vulgata), viveu como eremita no deserto da Síria e depois em Belém. Suas 154 cartas sobreviveram e são um tesouro de informação sobre a vida cristã do séc. IV-V.',
    importancia:
      'As cartas de Jerônimo são uma fonte primária para a história da ascese, da monarquia feminina e da tradução bíblica. A carta a Eustóquio é o tratado mais influente sobre a castidade na literatura cristã.',
    citacao: {
      texto:
        'A castidade é uma contínua martírio: cada dia é uma batalha, mas a vitória é eterna.',
      fonte: 'Ep. 22.1',
    },
    tags: ['cartas', 'ascese', 'castidade', 'Vulgata', 'tradução'],
    capa: { de: '#6B5B2F', ate: '#A2915B', acento: '#F1EDDC' },
  },

  // ═══════════════════ ESPIRITUALIDADE CLÁSSICA (EXPANDIDO) ═══════════════════
  {
    id: 'cristao-autentico',
    titulo: 'O Peregrino',
    tituloOriginal: 'The Pilgrim\'s Progress',
    autor: 'John Bunyan',
    autorVida: '1628–1688 — peregrino batista, Bedford',
    ano: 1678,
    anoTexto: '1678 d.C.',
    categoria: 'espiritualidade',
    dificuldade: 'Iniciante',
    idiomaOriginal: 'Inglês',
    edicao: 'integral',
    numCapitulos: 7,
    tempoLeituraMin: 50,
    descricao:
      'O romance alegórico mais lido da história cristã depois da Bíblia: a jornada de Cristão da Cidade da Destruição até a Cidade Celestial, passando pelo Buraco do Desespero, o Vale da Sombra da Morte e a Cruz.',
    contexto:
      'Bunyan escreveu na prisão por pregar sem licença, entre 1675 e 1678. O livro é uma alegoria da vida cristã que combina teologia puritana com narrativa vívida — cada personagem (Desespero, Dúvida, Fiel) é uma experiência espiritual real.',
    importancia:
      'Traduzido para mais de 200 línguas, é a obra mais influente da literatura cristã em inglês. Spurgeon o chamou de "o livro que mais lerias, depois da Bíblia". A alegoria tornou a teologia reformada acessível ao povo comum.',
    citacao: {
      texto:
        'Eu não vi nada do que deixei para trás — mas vejo o que está diante de mim.',
      fonte: 'The Pilgrim\'s Progress, Parte I',
    },
    tags: ['alegoria', 'puritanismo', 'peregrinação', 'vida cristã'],
    capa: { de: '#5B2333', ate: '#8B3A4A', acento: '#F3E0E5' },
  },
  {
    id: 'lewis-cristianismo',
    titulo: 'Cristianismo Puro e Simples',
    tituloOriginal: 'Mere Christianity',
    autor: 'C.S. Lewis',
    autorVida: '1898–1963 — apologista e escritor, Oxford/Cambridge',
    ano: 1952,
    anoTexto: '1952 d.C.',
    categoria: 'espiritualidade',
    dificuldade: 'Iniciante',
    idiomaOriginal: 'Inglês',
    edicao: 'selecao',
    numCapitulos: 6,
    tempoLeituraMin: 45,
    descricao:
      'A defesa do cristianismo mais acessível do século XX: Lewis, ex-ateu, argumenta pela existência de Deus, pela historicidade de Cristo e pela moral cristã — com clareza, humor e profundidade.',
    contexto:
      'Lewis expandiu uma série de rádios da BBC durante a Segunda Guerra Mundial. O livro reúne quatro partes: A Lei da Natureza, O Que os Cristãos Acreditam, A Moral Cristã e Cristo na Nossa Vida.',
    importancia:
      'O Mere Christianity vendeu mais de 5 milhões de cópias e é a porta de entrada para o cristianismo de milhões de pessoas. A sua definição do "trilema louco, mentiroso ou Senhor" é a apologética mais famosa do século XX.',
    citacao: {
      texto:
        'O cristianismo não é apenas uma filosofia: é uma religião — e a religião exige mais do que pensar, exige viver.',
      fonte: 'Mere Christianity, Livro I',
    },
    tags: ['apologética', 'C.S. Lewis', 'conversão', 'ética cristã'],
    capa: { de: '#2D3748', ate: '#4A5568', acento: '#E2E8F0' },
  },
  {
    id: 'lewis-diabo',
    titulo: 'Cartas de um Diabo ao seu Aprendiz',
    tituloOriginal: 'The Screwtape Letters',
    autor: 'C.S. Lewis',
    autorVida: '1898–1963 — apologista e escritor, Oxford/Cambridge',
    ano: 1942,
    anoTexto: '1942 d.C.',
    categoria: 'espiritualidade',
    dificuldade: 'Iniciante',
    idiomaOriginal: 'Inglês',
    edicao: 'selecao',
    numCapitulos: 7,
    tempoLeituraMin: 40,
    descricao:
      'Uma coletânea de cartas de um demônio experiente ao seu aprendiz, ensinando como tentar um cristão — a obra mais engenhosa de Lewis sobre a psicologia do pecado e a natureza da tentação.',
    contexto:
      'Lewis escreveu durante a guerra, publicando anonimamente no The Guardian. O formato epistolar do diabo Screwtape ao jovem Wormwood permite uma sátira brilhante dos vícios humanos.',
    importancia:
      'Os Screwtape Letters é uma das obras mais traduzidas de Lewis e uma introdução brilhante à espiritualidade. O conceito de "graça barata" antecipou o Discipulado de Bonhoeffer.',
    citacao: {
      texto:
        'O melhor é manter o cristianismo nominal: que ele diga que é cristão, mas que viva como os outros.',
      fonte: 'The Screwtape Letters, Carta I',
    },
    tags: ['tentação', 'C.S. Lewis', 'satira', 'espiritualidade'],
    capa: { de: '#4A1A1A', ate: '#7A2E2E', acento: '#F2DADA' },
  },
  {
    id: 'bonhoeffer-discipulado',
    titulo: 'O Custo do Discipulado',
    tituloOriginal: 'Nachfolge (The Cost of Discipleship)',
    autor: 'Dietrich Bonhoeffer',
    autorVida: '1906–1945 — teólogo alemão, mártir do nazismo',
    ano: 1937,
    anoTexto: '1937 d.C.',
    categoria: 'espiritualidade',
    dificuldade: 'Intermediário',
    idiomaOriginal: 'Alemão',
    edicao: 'selecao',
    numCapitulos: 6,
    tempoLeituraMin: 50,
    descricao:
      'A obra que definiu o que significa seguir a Cristo no século XX: a distinção entre graça barata e graça cara, e o chamado à obediência radical que custa a própria vida.',
    contexto:
      'Bonhoeffer escreveu contra o nazismo e contra a igreja alemã que se curvou a Hitler. Publicado em 1937, o livro foi censurado pelo regime e Bonhoeffer foi preso em 1943, executado em 1945.',
    importancia:
      'Nachfolge é a obra mais influente da teologia do século XX sobre discipulado. A distinção entre graça barata e graça cara transformou a reflexão ética cristã. A frase "quando Cristo chama um homem, ele quer que venha e morra" tornou-se o paradigma da ética cristã radical.',
    citacao: {
      texto:
        'Graça barata é aquela que se oferece ao homem sem exigir nada — é a pregação do perdão sem arrependimento.',
      fonte: 'Nachfolge, Capítulo 1',
    },
    tags: ['discipulado', 'grça cara', 'ética', 'Bonhoeffer', 'mártir'],
    capa: { de: '#3D3D5C', ate: '#6B6B94', acento: '#E3E1F0' },
  },
  {
    id: 'spurgeon-manhas',
    titulo: 'Manhãs com Spurgeon',
    tituloOriginal: 'Mornings with Spurgeon',
    autor: 'Charles Haddon Spurgeon',
    autorVida: '1834–1892 — Príncipe dos Pregadores, Londres',
    ano: 1865,
    anoTexto: '1865 d.C.',
    categoria: 'espiritualidade',
    dificuldade: 'Iniciante',
    idiomaOriginal: 'Inglês',
    edicao: 'selecao',
    numCapitulos: 5,
    tempoLeituraMin: 30,
    descricao:
      'Meditações matinais de Spurgeon — pensamentos breves e profundos sobre passagens bíblicas, perfeitos para começar o dia com Deus.',
    contexto:
      'Spurgeon compilou meditações diárias a partir dos seus sermões e escritos. Cada meditação é curta, mas densa — o pregador mais prolífico da história em formato devocional.',
    importancia:
      'Mornings with Spurgeon é um dos livros de devoção mais populares da história protestante. A combinação de profundidade teológica e acessibilidade é a marca registrada de Spurgeon.',
    citacao: {
      texto:
        'O Senhor é o meu pastor — não "pode ser", não "espero que seja", mas "é".',
      fonte: 'Mornings with Spurgeon, Dia 1',
    },
    tags: ['devoção', 'Spurgeon', 'meditação', 'vida cristã'],
    capa: { de: '#4A5A2F', ate: '#7E9153', acento: '#EDF2DC' },
  },
  {
    id: 'baxter-descanso',
    titulo: 'O Descanso dos Santos',
    tituloOriginal: 'The Saints\' Everlasting Rest',
    autor: 'Richard Baxter',
    autorVida: '1615–1691 — puritano, Kidderminster',
    ano: 1650,
    anoTexto: '1650 d.C.',
    categoria: 'espiritualidade',
    dificuldade: 'Intermediário',
    idiomaOriginal: 'Inglês',
    edicao: 'selecao',
    numCapitulos: 5,
    tempoLeituraMin: 40,
    descricao:
      'O tratado mais profundo sobre a vida eterna na literatura puritana: Baxter medita sobre a natureza, a beleza e a eternidade do céu — e convida o leitor a viver para lá.',
    contexto:
      'Baxter, puritano que sofreu perseguição, escreveu o Saints\' Rest como meditação sobre a esperança cristã. O livro foi lido por milhões e traduzido em dezenas de línguas.',
    importancia:
      'O Saints\' Rest é a obra mais influente sobre a vida eterna na tradição puritana. A sua meditação sobre o céu não é escapismo — é motivação para viver santo agora.',
    citacao: {
      texto:
        'O repouso dos santos é o descanso que Deus prometeu aos seus fiéis — não um descanso de preguiça, mas de plenitude.',
      fonte: 'The Saints\' Rest, Capítulo 1',
    },
    tags: ['céu', 'esperança', 'puritanismo', 'eternidade'],
    capa: { de: '#2D4A3D', ate: '#4A7A6B', acento: '#D6F0E3' },
  },

  // ═══════════════════ PREGAÇÃO E HERMENÊUTICA ═══════════════════
  {
    id: 'edwards-pecadores',
    titulo: 'Pecadores nas Mãos de um Deus Irado',
    tituloOriginal: 'Sinners in the Hands of an Angry God',
    autor: 'Jonathan Edwards',
    autorVida: '1703–1758 — teólogo puritano, Massachusetts',
    ano: 1741,
    anoTexto: '4 julho de 1741',
    categoria: 'espiritualidade',
    dificuldade: 'Intermediário',
    idiomaOriginal: 'Inglês',
    edicao: 'integral',
    numCapitulos: 5,
    tempoLeituraMin: 35,
    descricao:
      'O sermoão mais famoso da história americana — pregado em Enfield, Connecticut, durante o Grande Despertar, com ouvintes gemendo e chorando de medo.',
    contexto:
      'Edwards pregou este sermoão durante o Grande Despertar (1739-1743), o avivamento que varreu as colônias americanas. O texto bíblico era Deuteronômio 32:35. O sermoão causou pânico entre os ouvintes.',
    importancia:
      'É o sermoão mais citado da história americana e o exemplo clássico da teologia puritana da independência. A imagem dos pecadores "pendurados sobre o inferno pelas unhas de Deus" tornou-se um marco da retórica religiosa.',
    citacao: {
      texto:
        'Neste momento, inumeráveis almas do mundo invisível estão suspensas pelas unhas de Deus sobre o inferno.',
      fonte: 'Sinners in the Hands, Introdução',
    },
    tags: ['pregação', 'puritanismo', 'juízo', 'Grande Despertar'],
    capa: { de: '#7A1F1F', ate: '#B04A3A', acento: '#F5DCD6' },
  },
  {
    id: 'wesley-sermoes',
    titulo: 'Sermões Selecionados',
    tituloOriginal: 'Sermons on Several Occasions',
    autor: 'John Wesley',
    autorVida: '1703–1791 — fundador do metodismo',
    ano: 1770,
    anoTexto: '1740–1788',
    categoria: 'espiritualidade',
    dificuldade: 'Intermediário',
    idiomaOriginal: 'Inglês',
    edicao: 'selecao',
    numCapitulos: 5,
    tempoLeituraMin: 40,
    descricao:
      'Uma seleção dos sermões mais influentes de Wesley: sobre a graça abrangente, a oração, a santificação, a justiça social e a unidade dos cristãos — os pilares do metodismo.',
    contexto:
      'Wesley pregou mais de 40.000 sermões ao longo de 52 anos. Os seus sermões definiram o metodismo — um movimento de santidade实践 que transformou a Inglaterra e o mundo.',
    importancia:
      'Os sermões de Wesley são a base da teologia metodista. A sua ênfase na santificação, na graça preveniente e na justiça social influenciou o evangelicalismo mundial.',
    citacao: {
      texto:
        'O evangelho é para todos — não apenas para os ricos, não apenas para os pobres, mas para todos.',
      fonte: 'Sermon 87, "On the Grace of Our Lord"',
    },
    tags: ['metodismo', 'Wesley', 'santificação', 'justiça social'],
    capa: { de: '#5C4A2F', ate: '#9E7A5B', acento: '#F0E5D2' },
  },
  {
    id: 'clarke-comentario',
    titulo: 'Prefácio do Comentário Bíblico',
    tituloOriginal: 'Preface to the Commentary on the Bible',
    autor: 'Adam Clarke',
    autorVida: '1762–1832 — teólogo metodista, Irlanda',
    ano: 1810,
    anoTexto: '1810 d.C.',
    categoria: 'espiritualidade',
    dificuldade: 'Avançado',
    idiomaOriginal: 'Inglês',
    edicao: 'selecao',
    numCapitulos: 5,
    tempoLeituraMin: 35,
    descricao:
      'O prefácio do monumental Comentário de Clarke — 8 volumes que levaram 40 anos para serem escritos — com princípios de interpretação bíblica, defesa do estudo das línguas originais e harmonia entre fé e razão.',
    contexto:
      'Clarke, metodista irlandês, começou o seu Comentário em 1790 e só o terminou em 1826, pouco antes de morrer. O prefácio é um manifesto sobre como estudar a Bíblia.',
    importancia:
      'O Commentary of Clarke foi o comentário mais usado no mundo anglófono por um século. O seu prefácio é uma introdução clássica à hermenêutica protestante.',
    citacao: {
      texto:
        'A Escritura é o livro de Deus — e merece o nosso mais profundo estudo, não a nossa superficialidade.',
      fonte: 'Preface to the Commentary',
    },
    tags: ['hermenêutica', 'Comentário', 'línguas originais', 'metodismo'],
    capa: { de: '#4A3D5C', ate: '#7A5C8B', acento: '#E8E0F0' },
  },
];

export const getObraMeta = (id: string): ObraMeta | undefined =>
  OBRAS.find((o) => o.id === id);

export const TOTAL_CAPITULOS = OBRAS.reduce((acc, o) => acc + o.numCapitulos, 0);
export const TOTAL_MINUTOS = OBRAS.reduce((acc, o) => acc + o.tempoLeituraMin, 0);
export const SECULOS_COBERTOS = {
  de: Math.min(...OBRAS.map((o) => o.ano)),
  ate: Math.max(...OBRAS.map((o) => o.ano)),
};
