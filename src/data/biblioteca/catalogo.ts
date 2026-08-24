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
];

export const getObraMeta = (id: string): ObraMeta | undefined =>
  OBRAS.find((o) => o.id === id);

export const TOTAL_CAPITULOS = OBRAS.reduce((acc, o) => acc + o.numCapitulos, 0);
export const TOTAL_MINUTOS = OBRAS.reduce((acc, o) => acc + o.tempoLeituraMin, 0);
export const SECULOS_COBERTOS = {
  de: Math.min(...OBRAS.map((o) => o.ano)),
  ate: Math.max(...OBRAS.map((o) => o.ano)),
};
