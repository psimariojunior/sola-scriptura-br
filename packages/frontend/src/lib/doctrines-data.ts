export interface Doutrina {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  fundamento: string;
  versiculosChave: string[];
  autoridadesTeologicas?: string[];
  detalhe: string;
  objecoes?: { objecao: string; resposta: string }[];
  citacoesPatristicas?: { autor: string; citacao: string }[];
  topicosRelacionados?: string[];
}

export const DOCTRINAS: Doutrina[] = [
  {
    id: "bibliologia",
    nome: "Bibliologia — Doutrina das Escrituras",
    categoria: "revelacao",
    descricao: "A doutrina da inspiração, inerrância e autoridade da Bíblia Sagrada",
    fundamento: "Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção, para a educação na justiça",
    versiculosChave: [
      "2 Timóteo 3:16-17",
      "2 Pedro 1:20-21",
      "Mateus 5:17-18",
      "João 10:35",
      "Apocalipse 22:18-19"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "João Calvino", "B. B. Warfield"],
    detalhe: "A Bibliologia estabelece que as Escrituras são a Palavra de Deus escrita, inspirada pelo Espírito Santo através de autores humanos. O cânon bíblico é reconhecido pela igreja como a regra de fé e prática, possuindo autoridade suprema sobre a consciência e a doutrina. A inspiração estende-se a cada palavra (inspiração verbal e plenária), garantindo que os manuscritos originais são inerrantes em tudo o que afirmam. A suficiência das Escrituras significa que a Bíblia contém tudo o que é necessário para a salvação e a vida piedosa, não necessitando de revelações adicionais.",
    objecoes: [
      {
        objecao: "A Bíblia contém contradições históricas e científicas.",
        resposta: "As supostas contradições resolvem-se quando se consideram o contexto histórico, o gênero literário e a intenção do autor. A inerrância aplica-se aos manuscritos originais, não às cópias posteriores. Ciência e Escritura não se contradizem quando ambas são corretamente interpretadas, pois Deus é autor de ambas as revelações."
      },
      {
        objecao: "A Bíblia foi escrita por homens e reflete apenas suas opiniões.",
        resposta: "A inspiração bíblica é dual: Deus utilizou as personalidades, estilos e contextos dos autores humanos, mas o Espírito Santo supervisionou o processo para que o resultado final fosse precisamente a Palavra de Deus. A unidade doutrinária e as profecias cumpridas testemunham sua origem divina."
      }
    ],
    citacoesPatristicas: [
      {
        autor: "Agostinho de Hipona",
        citacao: "Acreditamos nos apóstolos, mas é para crer nas Escrituras que eles nos enviaram."
      },
      {
        autor: "Atanásio de Alexandria",
        citacao: "Estes são os livros do Antigo e do Novo Testamento, fontes da salvação, nos quais se encontra a doutrina da piedade."
      }
    ],
    topicosRelacionados: ["inspiracao-verbal", "inerrancia-biblica", "revelacao-especial", "hermeneutica"]
  },
  {
    id: "revelacao-geral",
    nome: "Revelação Geral",
    categoria: "revelacao",
    descricao: "O testemunho de Deus na criação, na consciência e na história",
    fundamento: "Os céus proclamam a glória de Deus, e o firmamento anuncia as obras das suas mãos",
    versiculosChave: [
      "Salmo 19:1-4",
      "Romanos 1:19-20",
      "Atos 14:15-17",
      "Atos 17:24-28",
      "Salmo 8:3-4"
    ],
    autoridadesTeologicas: ["Tomás de Aquino", "João Calvino"],
    detalhe: "A revelação geral é o conhecimento de Deus acessível a todas as pessoas através da natureza, da história e da consciência moral. Tomás de Aquino argumentou que a existência de Deus pode ser demonstrada racionalmente através das cinco vias cosmológicas. Calvino, embora valorizasse a revelação geral, insistiu que ela é insuficiente para a salvação, servindo apenas para deixar o homem sem desculpa. A revelação geral fornece a base para a responsabilidade moral universal e aponta para o Criador, mas não comunica o evangelho redentor.",
    topicosRelacionados: ["revelacao-especial", "teologia-propria", "graca-comum"]
  },
  {
    id: "revelacao-especial",
    nome: "Revelação Especial",
    categoria: "revelacao",
    descricao: "A revelação direta de Deus através de sonhos, profecias, milagres, Cristo e as Escrituras",
    fundamento: "Havendo Deus antigamente falado, muitas vezes e de muitas maneiras, aos pais, pelos profetas, a nós falou-nos nestes últimos dias pelo Filho",
    versiculosChave: [
      "Hebreus 1:1-2",
      "Deuteronômio 18:18-22",
      "João 14:26",
      "Apocalipse 1:1-3",
      "João 16:12-15"
    ],
    autoridadesTeologicas: ["Francisco Turretini", "Herman Bavinck"],
    detalhe: "A revelação especial consiste na comunicação direta e proposicional de Deus à humanidade, incluindo teofanias, profecias, milagres, a encarnação de Cristo e a inspiração escriturística. Diferentemente da revelação geral, que é contínua e universal, a revelação especial é histórica e redentora, culminando em Jesus Cristo, a Palavra viva. Esta revelação é necessária para a salvação, pois comunica verdades que a razão natural não pode alcançar, como a Trindade, a encarnação e a expiação vicária. A revelação especial cessou com o fechamento do cânon apostólico, sendo preservada nas Escrituras.",
    topicosRelacionados: ["bibliologia", "revelacao-geral", "cristologia", "inspiracao-verbal"]
  },
  {
    id: "inspiracao-verbal",
    nome: "Inspiração Verbal e Plenária",
    categoria: "revelacao",
    descricao: "Cada palavra das Escrituras é inspirada por Deus em todo o seu conteúdo",
    fundamento: "Porque nunca jamais qualquer profecia foi dada por vontade humana, mas homens santos falaram da parte de Deus movidos pelo Espírito Santo",
    versiculosChave: [
      "2 Pedro 1:20-21",
      "1 Coríntios 2:12-13",
      "Jeremias 1:9",
      "Êxodo 20:1",
      "Isaías 59:21"
    ],
    autoridadesTeologicas: ["B. B. Warfield", "Charles Hodge"],
    detalhe: "A inspiração verbal e plenária afirma que o Espírito Santo supervisionou cada palavra dos escritores bíblicos, utilizando suas personalidades e estilos, mas garantindo que o texto resultante fosse exatamente a Palavra de Deus. 'Verbal' significa que a inspiração se estende à escolha das palavras, não apenas aos conceitos. 'Plenária' indica que toda a Escritura, não apenas partes, é igualmente inspirada. Esta doutrina não implica ditado mecânico; antes, reconhece uma cooperação orgânica entre o autor humano e o Divino, resultando em um texto simultaneamente humano e divino.",
    topicosRelacionados: ["bibliologia", "inerrancia-biblica", "revelacao-especial"]
  },
  {
    id: "inerrancia-biblica",
    nome: "Inerrância Bíblica",
    categoria: "revelacao",
    descricao: "A Bíblia não contém erro nos manuscritos originais em tudo o que afirma",
    fundamento: "Toda palavra de Deus é pura; escudo é para os que confiam nele",
    versiculosChave: [
      "Provérbios 30:5-6",
      "Salmo 12:6",
      "Números 23:19",
      "Tito 1:2",
      "Mateus 5:18"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "B. B. Warfield"],
    detalhe: "A inerrância bíblica é a doutrina de que as Escrituras, em seus manuscritos autógrafos originais, são completamente verdadeiras em todas as afirmações que fazem, sejam elas históricas, científicas, geográficas ou teológicas. Esta verdade não é anulada pela presença de linguagem fenomenológica (descrições da natureza como percebida) ou por aproximações numéricas comuns na época. A inerrância é uma consequência lógica da inspiração divina — se Deus é verdadeiro e Ele inspirou as Escrituras, então Sua Palavra é verdadeira. A Confissão de Fé de Westminster declara que a Bíblia é 'isenta de todo erro'.",
    objecoes: [
      {
        objecao: "A Bíblia contém erros históricos e científicos que invalidam a inerrância.",
        resposta: "Muitas supostas discrepâncias resolvem-se com melhor compreensão do contexto histórico e das convenções literárias antigas. Erros aparentes geralmente refletem interpretações inadequadas, não erros no texto. A arqueologia tem confirmado repetidamente a precisão histórica das Escrituras."
      },
      {
        objecao: "A inerrância aplica-se apenas a questões de fé e prática, não a história ou ciência.",
        resposta: "A Bíblia mesma nunca faz esta distinção. Jesus e os apóstolos trataram as narrativas históricas do Antigo Testamento como factualmente verdadeiras. Se a Bíblia erra em questões históricas, sua autoridade em questões de fé fica comprometida."
      }
    ],
    citacoesPatristicas: [
      {
        autor: "Agostinho de Hipona",
        citacao: "Somente àqueles livros das Escrituras, que são chamados canônicos, aprendi a dispensar tal honra que creio firmemente que nenhum de seus autores errou em nada ao escrevê-los."
      }
    ],
    topicosRelacionados: ["bibliologia", "inspiracao-verbal", "revelacao-especial"]
  },
  {
    id: "teologia-propria",
    nome: "Teologia Própria — A Natureza de Deus",
    categoria: "deus",
    descricao: "O estudo do ser, existência e atributos essenciais de Deus",
    fundamento: "O Senhor é Deus; não há outro fora dele",
    versiculosChave: [
      "Deuteronômio 6:4",
      "Êxodo 3:14",
      "Isaías 45:5-6",
      "João 4:24",
      "1 Timóteo 6:15-16"
    ],
    autoridadesTeologicas: ["Tomás de Aquino", "João Calvino", "Anselmo de Cantuária"],
    detalhe: "A Teologia Própria investiga a existência, essência e atributos de Deus. Deus é espírito infinito, perfeito e autoexistente (aseidade), transcendente e imanente, eterno e imutável. Anselmo definiu Deus como 'aquele ser maior do qual nada pode ser concebido'. Os atributos de Deus dividem-se em comunicáveis (amor, justiça, misericórdia) e incomunicáveis (onisciência, onipotência, onipresença). A teologia reformada enfatiza a glória de Deus como o fim último de toda a criação, enquanto a teologia oriental destaca a distinção entre a essência incognoscível de Deus e suas energias reveladas.",
    objecoes: [
      {
        objecao: "A existência de Deus não pode ser provada racionalmente.",
        resposta: "Embora a existência de Deus não possa ser demonstrada matematicamente, argumentos filosóficos como cosmológico, teleológico e moral fornecem evidências convincentes. Paulo afirma que a criação torna a existência de Deus evidente (Romanos 1:19-20). A fé não é um salto irracional, mas confiança baseada em evidências."
      },
      {
        objecao: "Se Deus é bom e onipotente, por que existe o mal?",
        resposta: "O problema do mal é complexo, mas a resposta cristã inclui: (1) Deus criou um mundo bom com livre-arbítrio; (2) o mal resulta da queda; (3) Deus usa o mal para propósitos maiores que não compreendemos plenamente; (4) Deus vence o mal definitivamente na cruz e na consumação final."
      }
    ],
    citacoesPatristicas: [
      {
        autor: "Atanásio de Alexandria",
        citacao: "Deus é bom, ou melhor, é a fonte da bondade."
      },
      {
        autor: "Gregório de Nazianzo",
        citacao: "Deus é luz inacessível, incompreensível, eterno, que não pode ser circunscrito pelo tempo ou pelo espaço."
      }
    ],
    topicosRelacionados: ["trindade", "soberania-deus", "atributos-comunicaveis", "atributos-incomunicaveis"]
  },
  {
    id: "trindade",
    nome: "Trindade — Um Deus em Três Pessoas",
    categoria: "deus",
    descricao: "A doutrina de que Deus é um em essência e três em pessoas: Pai, Filho e Espírito Santo",
    fundamento: "Ide, portanto, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo",
    versiculosChave: [
      "Mateus 28:19",
      "2 Coríntios 13:14",
      "João 1:1-3",
      "João 15:26",
      "1 Pedro 1:2"
    ],
    autoridadesTeologicas: ["Atanásio de Alexandria", "Agostinho de Hipona", "Karl Barth"],
    detalhe: "A Trindade é o mistério central da fé cristã: um só Deus em três pessoas consubstanciais e coeternas. O Pai é Deus, o Filho é Deus e o Espírito Santo é Deus, mas não há três deuses, e sim um único Deus triúno. Cada pessoa possui toda a plenitude da divindade, mas elas se distinguem por suas relações eternas: o Pai gera o Filho, o Filho é gerado pelo Pai, e o Espírito Santo procede do Pai e do Filho (filioque). O Credo Atanasiano formula esta doutrina com precisão: 'Adoramos um Deus em Trindade e Trindade em Unidade'.",
    objecoes: [
      {
        objecao: "A Trindade é uma contradição lógica: 1 = 3.",
        resposta: "Não há contradição porque não se afirma que Deus é um e três no mesmo sentido. Deus é um em essência (o que Ele é) e três em pessoa (quem Ele é). Isto não viola o princípio da não-contradição, pois os termos 'essência' e 'pessoa' não são idênticos. É um mistério, não uma contradição."
      }
    ],
    citacoesPatristicas: [
      {
        autor: "Atanásio de Alexandria",
        citacao: "Nós cremos em um só Deus, Pai onipotente, e em um só Senhor Jesus Cristo, o Filho de Deus, e no Espírito Santo. Não três deuses, mas um só Deus."
      },
      {
        autor: "Agostinho de Hipona",
        citacao: "No Pai está a unidade, no Filho a igualdade, no Espírito Santo o vínculo da unidade e da igualdade."
      }
    ],
    topicosRelacionados: ["teologia-propria", "cristologia", "pneumatologia"]
  },
  {
    id: "soberania-deus",
    nome: "Soberania de Deus",
    categoria: "deus",
    descricao: "O governo absoluto e universal de Deus sobre toda a criação",
    fundamento: "O Senhor estabeleceu o seu trono nos céus, e o seu reino domina sobre tudo",
    versiculosChave: [
      "Salmo 103:19",
      "Daniel 4:34-35",
      "Efésios 1:11",
      "Isaías 46:9-10",
      "Romanos 8:28"
    ],
    autoridadesTeologicas: ["João Calvino", "Jonathan Edwards"],
    detalhe: "A soberania de Deus significa que Ele é o governante supremo sobre toda a criação, exercendo sua vontade sem restrição externa. Deus decreta todas as coisas que acontecem, inclusive a salvação dos eleitos (predestinação) e a permissão do mal para propósitos maiores. Esta doutrina não nega a liberdade humana ou a realidade das causas secundárias; antes, estabelece que Deus governa todas as coisas por sua providência, de modo que mesmo os atos maus são direcionados para o bem final. A soberania divina é fonte de conforto para os crentes, pois assegura que nenhum poder no universo está fora do controle de Deus.",
    topicosRelacionados: ["providencia", "predestinacao", "teologia-propria"]
  },
  {
    id: "providencia",
    nome: "Providência de Deus",
    categoria: "deus",
    descricao: "O sustento, preservação e governo contínuo de Deus sobre toda a criação",
    fundamento: "Ele é antes de todas as coisas, e nele tudo subsiste",
    versiculosChave: [
      "Colossenses 1:16-17",
      "Mateus 10:29-31",
      "Atos 17:24-25",
      "Salmo 104:27-30",
      "Hebreus 1:3"
    ],
    autoridadesTeologicas: ["Tomás de Aquino", "Herman Bavinck"],
    detalhe: "A providência divina é a obra contínua de Deus na preservação, concorrência e governo de todas as criaturas e eventos. A preservação mantém a existência do universo; a concorrência é a cooperação de Deus com as causas secundárias; o governo dirige todas as coisas para o fim determinado por Deus. A providência não anula o livre-arbítrio nem transforma Deus em autor do pecado. A doutrina oferece segurança aos crentes de que todas as circunstâncias, mesmo as adversas, servem a propósitos redentores. Como ensina Romanos 8:28, 'todas as coisas cooperam para o bem daqueles que amam a Deus'.",
    topicosRelacionados: ["soberania-deus", "graca-comum", "teologia-propria"]
  },
  {
    id: "atributos-comunicaveis",
    nome: "Atributos Comunicáveis de Deus",
    categoria: "deus",
    descricao: "Atributos divinos que são refletidos de forma limitada na criatura humana",
    fundamento: "O Senhor é misericordioso e compassivo; longânimo e muito benigno",
    versiculosChave: [
      "Êxodo 34:6-7",
      "Salmo 145:8-9",
      "1 João 4:8",
      "Isaías 30:18",
      "Miqueias 7:18"
    ],
    autoridadesTeologicas: ["Tomás de Aquino", "Stephen Charnock"],
    detalhe: "Os atributos comunicáveis são perfeições divinas que Deus compartilha conosco em medida finita, incluindo amor, justiça, misericórdia, graça, bondade, verdade e sabedoria. O amor (ágape) é a benevolência incondicional de Deus; a justiça é sua retidão moral que recompensa o bem e pune o mal; a misericórdia é a compaixão divina para com os miseráveis; a graça é o favor imerecido concedido aos pecadores. Embora possuamos imagens imperfeitas destes atributos, em Deus eles existem em perfeição absoluta e harmonia. A história da redenção demonstra como justiça e misericórdia encontram-se na cruz de Cristo.",
    topicosRelacionados: ["teologia-propria", "atributos-incomunicaveis", "amor-deus"]
  },
  {
    id: "atributos-incomunicaveis",
    nome: "Atributos Incomunicáveis de Deus",
    categoria: "deus",
    descricao: "Atributos divinos que pertencem exclusivamente a Deus e não podem ser compartilhados",
    fundamento: "Grande é o Senhor e mui digno de louvor; a sua grandeza é insondável",
    versiculosChave: [
      "Salmo 145:3",
      "1 Reis 8:27",
      "Salmo 90:2",
      "Malaquias 3:6",
      "Jó 42:2"
    ],
    autoridadesTeologicas: ["Tomás de Aquino", "Anselmo de Cantuária"],
    detalhe: "Os atributos incomunicáveis são aqueles que pertencem exclusivamente a Deus e que não encontram paralelo na criação. Incluem a onipotência (Deus pode fazer tudo o que é logicamente possível e coerente com sua natureza), a onisciência (Deus conhece todas as coisas, passadas, presentes e futuras, reais e possíveis), a onipresença (Deus está presente em todos os lugares em toda a plenitude de seu ser), a eternidade (Deus existe fora das limitações temporais), a imutabilidade (Deus não muda em seu ser, atributos ou propósitos) e a aseidade (autoexistência). Estes atributos distinguem radicalmente o Criador da criatura e fundamentam a adoração.",
    topicosRelacionados: ["teologia-propria", "atributos-comunicaveis", "soberania-deus"]
  },
  {
    id: "santidade-deus",
    nome: "Santidade de Deus",
    categoria: "deus",
    descricao: "A perfeita pureza moral e separação de Deus de todo o mal",
    fundamento: "Santo, santo, santo é o Senhor dos Exércitos; toda a terra está cheia da sua glória",
    versiculosChave: [
      "Isaías 6:1-5",
      "Levítico 19:2",
      "1 Pedro 1:15-16",
      "Apocalipse 4:8",
      "Habacuque 1:13"
    ],
    autoridadesTeologicas: ["R. C. Sproul", "Jonathan Edwards"],
    detalhe: "A santidade de Deus é o atributo central que permeia todos os outros — é a própria majestade divina em sua pureza moral absoluta. O termo hebraico qadosh significa 'separado' ou 'cortado', indicando a transcendência de Deus e sua separação do pecado. A visão de Isaías no templo (Isaías 6) demonstra que a santidade divina produz tanto temor quanto purificação. A santidade de Deus é o fundamento da ética bíblica: 'Sede santos, porque eu sou santo'. Na teologia reformada, a santidade de Deus é a base para a expiação — o pecado deve ser tratado porque Deus é santo e não pode tolerar o mal.",
    topicosRelacionados: ["teologia-propria", "atributos-comunicaveis", "santificacao"]
  },
  {
    id: "amor-deus",
    nome: "Amor de Deus — Ágape Divino",
    categoria: "deus",
    descricao: "O amor incondicional, benevolente e sacrificial de Deus pela humanidade",
    fundamento: "Porque Deus amou ao mundo de tal maneira que deu o seu Filho unigênito, para que todo o que nele crê não pereça, mas tenha a vida eterna",
    versiculosChave: [
      "João 3:16",
      "1 João 4:8-10",
      "Romanos 5:8",
      "Jeremias 31:3",
      "Sofonias 3:17"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "Tomás de Aquino", "Karl Barth"],
    detalhe: "O amor de Deus (ágape) é a perfeição divina pela qual Deus se doa livre e sacrificialmente às suas criaturas. Diferentemente do amor humano (eros ou philia), o ágape divino não é despertado pelo valor do objeto amado, mas flui da própria natureza de Deus como amor. Este amor manifesta-se na criação, na providência, na eleição e supremamente na obra redentora de Cristo. Agostinho viu o amor como o próprio ser de Deus: 'Deus é amor'. O amor divino não é sentimentalismo, mas uma determinação santa de buscar o bem do outro, mesmo ao custo do auto-sacrifício. A cruz é a demonstração suprema do amor ágape.",
    objecoes: [
      {
        objecao: "Se Deus é amor, por que Ele envia pessoas para o inferno?",
        resposta: "O amor de Deus não é sentimentalismo divorciado de sua justiça e santidade. O amor divino inclui o desejo pelo bem do outro, e a justiça é parte desse bem. Deus respeita o livre-arbítrio humano e a rejeição deliberada de seu amor leva à separação eterna. A seriedade do inferno reflete a seriedade do pecado e a santidade de Deus."
      }
    ],
    citacoesPatristicas: [
      {
        autor: "Agostinho de Hipona",
        citacao: "Deus ama cada um de nós como se fôssemos o único, mas ama todos como se todos fossem um."
      }
    ],
    topicosRelacionados: ["teologia-propria", "atributos-comunicaveis", "soteriologia"]
  },
  {
    id: "cristologia",
    nome: "Cristologia — Pessoa e Obra de Cristo",
    categoria: "cristo",
    descricao: "A doutrina de Jesus Cristo, sua natureza divino-humana e sua obra redentora",
    fundamento: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus",
    versiculosChave: [
      "João 1:1-14",
      "Filipenses 2:5-11",
      "Colossenses 1:15-20",
      "Hebreus 1:1-4",
      "1 Timóteo 2:5"
    ],
    autoridadesTeologicas: ["Atanásio de Alexandria", "Cirilo de Alexandria", "João Calvino"],
    detalhe: "A Cristologia investiga a identidade e a obra de Jesus Cristo, afirmando que Ele é verdadeiro Deus e verdadeiro homem em uma só pessoa para sempre. O Concílio de Calcedônia (451 d.C.) definiu que Cristo é uma pessoa com duas naturezas, divina e humana, 'sem confusão, sem mudança, sem divisão, sem separação'. Como Deus, Cristo criou o universo e sustenta todas as coisas; como homem, experimentou fome, sede, cansaço e morte. A união hipostática — a união das duas naturezas na pessoa do Verbo — é o mistério central da Cristologia. Sua obra inclui a encarnação, vida perfeita, expiação vicária, ressurreição, ascensão e intercessão contínua.",
    objecoes: [
      {
        objecao: "Jesus foi apenas um grande profeta moral, não Deus.",
        resposta: "Jesus afirmou ser Deus (João 8:58; 10:30), perdoou pecados (Marcos 2:5-7) e aceitou adoração (Mateus 28:9). Se Ele não era Deus, então era um lunático ou um impostor — a opção 'grande mestre' não é logicamente coerente (o trilema de C. S. Lewis). A ressurreição confirma suas alegações divinas."
      },
      {
        objecao: "Como Jesus pode ser simultaneamente Deus e homem?",
        resposta: "Isto é um mistério revelado, não uma contradição. As duas naturezas unem-se na pessoa do Verbo sem se misturarem ou se anularem. Cristo age ora segundo sua natureza divina (ressuscitar os mortos), ora segundo sua natureza humana (sentir fome), mas sempre como uma única pessoa."
      }
    ],
    citacoesPatristicas: [
      {
        autor: "Atanásio de Alexandria",
        citacao: "O Verbo se fez carne para que nós, os homens, fôssemos feitos deuses."
      },
      {
        autor: "Cirilo de Alexandria",
        citacao: "Uma é a natureza do Verbo de Deus encarnado."
      }
    ],
    topicosRelacionados: ["encarnacao", "nascimento-virginal", "expiacao", "ressurreicao"]
  },
  {
    id: "encarnacao",
    nome: "Encarnação — Deus Feito Homem",
    categoria: "cristo",
    descricao: "O ato eterno do Filho de Deus assumir a natureza humana",
    fundamento: "E o Verbo se fez carne e habitou entre nós, cheio de graça e de verdade",
    versiculosChave: [
      "João 1:14",
      "Filipenses 2:6-7",
      "Hebreus 2:14-15",
      "Gálatas 4:4-5",
      "1 Timóteo 3:16"
    ],
    autoridadesTeologicas: ["Atanásio de Alexandria", "Tomás de Aquino"],
    detalhe: "A encarnação é o ato pelo qual o Filho eterno de Deus assumiu a natureza humana sem cessar de ser Deus, unindo a divindade à humanidade em sua pessoa para sempre. O Verbo não se tornou uma pessoa humana, mas assumiu a natureza humana em união com sua pessoa divina. A encarnação foi necessária para a salvação: somente Deus poderia satisfazer a justiça divina e somente o homem deveria pagar pelo pecado humano. Atanásio formulou o princípio clássico: 'o que não é assumido não é curado' — Cristo assumiu a plena humanidade para redimir o ser humano por completo. A encarnação continua para sempre; Cristo permanece eternamente Deus-homem.",
    topicosRelacionados: ["cristologia", "nascimento-virginal", "expiacao"]
  },
  {
    id: "nascimento-virginal",
    nome: "Nascimento Virginal de Cristo",
    categoria: "cristo",
    descricao: "Jesus foi concebido pelo Espírito Santo e nasceu da virgem Maria",
    fundamento: "Eis que a virgem conceberá e dará à luz um filho, e ele será chamado pelo nome de Emanuel",
    versiculosChave: [
      "Mateus 1:18-25",
      "Lucas 1:26-35",
      "Isaías 7:14",
      "Gálatas 4:4",
      "Jeremias 31:22"
    ],
    autoridadesTeologicas: ["Inácio de Antioquia", "Agostinho de Hipona"],
    detalhe: "O nascimento virginal é a doutrina de que Jesus Cristo foi concebido no ventre de Maria pelo poder do Espírito Santo, sem intervenção de homem. Esta concepção milagrosa assegura que Jesus não herdou a natureza pecaminosa transmitida pela descendência natural de Adão. O nascimento virginal demonstra que a salvação é obra de Deus, não do esforço humano. A profecia de Isaías 7:14 (a virgem conceberá) encontra seu cumprimento explícito em Mateus e Lucas. Esta doutrina é afirmada por todas as principais tradições cristãs e está contida nos credos apostólico e niceno.",
    objecoes: [
      {
        objecao: "O nascimento virginal é uma lenda emprestada de mitologias pagãs.",
        resposta: "As narrativas de Mateus e Lucas são sóbrias e historicamente ancoradas, diferindo radicalmente das lendas mitológicas de deuses que se uniam a mortais. O tratamento de Maria e José nas narrativas é judaico e monoteísta. A igreja primitiva, vivendo em contexto onde estas acusações circulavam, jamais negou o nascimento virginal."
      }
    ],
    citacoesPatristicas: [
      {
        autor: "Inácio de Antioquia",
        citacao: "Nosso Deus, Jesus Cristo, foi levado no ventre de Maria, segundo a dispensação de Deus, da semente de Davi, mas do Espírito Santo."
      }
    ],
    topicosRelacionados: ["cristologia", "encarnacao", "pneumatologia"]
  },
  {
    id: "vida-cristo",
    nome: "Vida de Cristo — Perfeita Obediência",
    categoria: "cristo",
    descricao: "A vida de perfeita obediência de Jesus à lei de Deus",
    fundamento: "Porque também Cristo padeceu uma vez pelos pecados, o justo pelos injustos, para levar-nos a Deus",
    versiculosChave: [
      "Hebreus 4:15",
      "Mateus 5:17-18",
      "Lucas 2:52",
      "João 8:28-29",
      "1 Pedro 2:21-23"
    ],
    autoridadesTeologicas: ["Tomás de Aquino", "João Calvino"],
    detalhe: "A vida de Cristo foi caracterizada pela obediência perfeita e contínua à vontade do Pai, servindo como o cumprimento da lei e o modelo supremo de santidade humana. A teologia reformada distingue entre a obediência ativa (cumprimento perfeito da lei) e a obediência passiva (submissão à morte). A obediência ativa de Cristo é imputada ao crente como justiça. Jesus viveu cada fase da vida humana em santidade, desde a infância até a idade adulta, demonstrando como o ser humano foi originalmente projetado para viver em comunhão com Deus. Seus ensinos, milagres e caráter confirmam sua identidade divina.",
    topicosRelacionados: ["cristologia", "justificacao", "santificacao"]
  },
  {
    id: "expiacao",
    nome: "Expiação — Morte Substitutiva de Cristo",
    categoria: "cristo",
    descricao: "A morte sacrificial de Cristo como substituto pelos pecadores",
    fundamento: "Cristo nos resgatou da maldição da lei, fazendo-se maldição por nós",
    versiculosChave: [
      "Isaías 53:4-6",
      "2 Coríntios 5:21",
      "1 Pedro 2:24",
      "Romanos 3:25-26",
      "Hebreus 9:11-14"
    ],
    autoridadesTeologicas: ["Anselmo de Cantuária", "João Calvino", "John Owen"],
    detalhe: "A expiação é a obra de Cristo na cruz pela qual Ele satisfez a justiça divina e reconciliou os pecadores com Deus. Anselmo, em 'Cur Deus Homo', propôs a teoria da satisfação: o pecado desonra a Deus, exigindo satisfação que o homem não pode oferecer; somente Deus-homem poderia oferecê-la. Calvino desenvolveu a teoria da substituição penal: Cristo suportou a pena do pecado em lugar dos eleitos. A expiação inclui propiciação (apaziguamento da ira divina), redenção (pagamento do resgate) e reconciliação (restauração do relacionamento). A morte de Cristo foi vicária (em favor de outros), satisfatória (plenamente suficiente) e eficaz (realmente redime os que creem).",
    objecoes: [
      {
        objecao: "É imoral Deus punir um inocente no lugar dos culpados.",
        resposta: "A substituição penal não é transferência de culpa para um terceiro relutante. Cristo voluntariamente ofereceu-se como substituto, agindo como o segundo Adão e representante da humanidade. Sua identificação conosco é tão completa que Ele pode representar-nos. A justiça divina não é violada, mas satisfeita pela própria Pessoa divina que a exige."
      }
    ],
    citacoesPatristicas: [
      {
        autor: "Atanásio de Alexandria",
        citacao: "Cristo morreu por todos, para que, vivendo todos nele, morrêssemos para o pecado e vivêssemos para a justiça."
      },
      {
        autor: "Gregório de Nazianzo",
        citacao: "Oferecemos a Cristo crucificado, não um novo sacrifício, mas o mesmo sacrifício que Ele ofereceu."
      }
    ],
    topicosRelacionados: ["cristologia", "justificacao", "soteriologia"]
  },
  {
    id: "ressurreicao",
    nome: "Ressurreição de Cristo",
    categoria: "cristo",
    descricao: "A vitória corporal de Jesus sobre a morte ao terceiro dia",
    fundamento: "Não está aqui; ressurgiu: como disse! Vinde ver o lugar onde o Senhor jazia",
    versiculosChave: [
      "Mateus 28:1-10",
      "1 Coríntios 15:3-8",
      "Romanos 6:4-5",
      "João 20:24-29",
      "Atos 2:22-24"
    ],
    autoridadesTeologicas: ["Paulo de Tarso", "N. T. Wright"],
    detalhe: "A ressurreição de Cristo é a vitória corporal e histórica sobre a morte, ocorrendo no terceiro dia após sua crucificação. Não foi mera reanimação espiritual ou ressurreição simbólica: o túmulo estava vazio, as aparições foram físicas (Cristo comeu e foi tocado) e corporais (embora glorificadas). A ressurreição é a confirmação divina da identidade de Cristo, a validação de sua obra expiatória e a garantia da nossa própria ressurreição futura. Paulo argumenta em 1 Coríntios 15 que, se Cristo não ressuscitou, a fé cristã é vã. A ressurreição é o evento central da história da salvação, inaugurando a nova criação e derrotando definitivamente o poder da morte.",
    objecoes: [
      {
        objecao: "A ressurreição foi uma alucinação dos discípulos ou um mito criado posteriormente.",
        resposta: "A teoria da alucinação não explica aparições a grupos (mais de 500 pessoas), a um cético como Paulo, nem a um incrédulo como Tiago. O túmulo vazio é atestado por fontes amigas e hostis. A transformação radical dos discípulos — de medrosos a pregadores destemidos — é inexplicável se a ressurreição fosse uma farsa."
      }
    ],
    citacoesPatristicas: [
      {
        autor: "Inácio de Antioquia",
        citacao: "Cristo ressuscitou verdadeiramente dos mortos, tendo-o ressuscitado o Pai, que também nos ressuscitará em Jesus Cristo."
      }
    ],
    topicosRelacionados: ["cristologia", "ascensao", "glorificacao"]
  },
  {
    id: "ascensao-exaltacao",
    nome: "Ascensão e Exaltação de Cristo",
    categoria: "cristo",
    descricao: "A ascensão corporal de Cristo ao céu e sua exaltação à destra de Deus",
    fundamento: "Ora, o Senhor Jesus, depois de lhes ter falado, foi recebido no céu e assentou-se à direita de Deus",
    versiculosChave: [
      "Atos 1:9-11",
      "Efésios 1:20-23",
      "Filipenses 2:9-11",
      "Hebreus 1:3",
      "Hebreus 4:14-16"
    ],
    autoridadesTeologicas: ["João Calvino", "Tomás de Aquino"],
    detalhe: "A ascensão de Cristo ocorreu quarenta dias após a ressurreição, quando Ele subiu corporalmente ao céu diante dos apóstolos. A exaltação de Cristo à destra do Pai significa sua entronização como Senhor universal e Cabeça da igreja. Desta posição de glória, Cristo exerce seu ofício real (governando todas as coisas), profético (derramando o Espírito) e sacerdotal (intercedendo pelos santos). A ascensão não significa ausência, pois Cristo está presente conosco pelo Espírito. Sua intercessão contínua é o fundamento da perseverança dos santos. A ascensão é a garantia de que os crentes também serão glorificados com Ele.",
    topicosRelacionados: ["cristologia", "ressurreicao", "segunda-vinda"]
  },
  {
    id: "segunda-vinda",
    nome: "Segunda Vinda de Cristo",
    categoria: "cristo",
    descricao: "O retorno pessoal, visível e glorioso de Jesus Cristo no fim dos tempos",
    fundamento: "Porque o Senhor mesmo, dada a sua palavra de ordem, ouvida a voz do arcanjo, e ressoada a trombeta de Deus, descerá dos céus",
    versiculosChave: [
      "1 Tessalonicenses 4:16-17",
      "Mateus 24:29-31",
      "Atos 1:10-11",
      "Apocalipse 19:11-16",
      "Tito 2:13"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "John Gill"],
    detalhe: "A segunda vinda de Cristo é o evento escatológico central no qual Jesus retornará pessoal, visível e gloriosamente para completar a redenção, julgar os vivos e os mortos e estabelecer plenamente o reino de Deus. Diferentemente de sua primeira vinda em humildade, a segunda vinda será em poder e glória majestosa. As opiniões variam quanto ao timing em relação à tribulação (pré-tribulacionismo, mid-tribulacionismo, pós-tribulacionismo) e ao milênio (pré-milenismo, pós-milenismo, amilenismo), mas todas as tradições ortodoxas afirmam a realidade e a iminência do retorno de Cristo. A segunda vinda é a 'bendita esperança' da igreja.",
    topicosRelacionados: ["cristologia", "escatologia", "arrebatamento", "milênio"]
  },
  {
    id: "pneumatologia",
    nome: "Pneumatologia — Pessoa e Obra do Espírito Santo",
    categoria: "espirito",
    descricao: "A doutrina da terceira pessoa da Trindade, o Espírito Santo",
    fundamento: "Mas o Consolador, o Espírito Santo, a quem o Pai enviará em meu nome, esse vos ensinará todas as coisas",
    versiculosChave: [
      "João 14:16-17",
      "João 16:7-15",
      "Atos 2:1-4",
      "1 Coríntios 12:4-11",
      "Romanos 8:26-27"
    ],
    autoridadesTeologicas: ["Basílio Magno", "Agostinho de Hipona", "Yves Congar"],
    detalhe: "A Pneumatologia estuda a identidade e a obra do Espírito Santo, a terceira pessoa da Trindade, que procede do Pai e do Filho (filioque) e é consubstancial e coeterna com ambos. O Espírito Santo não é uma força impessoal, mas uma pessoa divina com vontade, intelecto e emoções, que age na criação, na inspiração das Escrituras, na concepção virginal, no ministério de Cristo, na regeneração, na habitação do crente, na distribuição de dons e na santificação da igreja. Basílio Magno, em seu tratado 'Sobre o Espírito Santo', demonstrou que o Espírito deve ser adorado e glorificado juntamente com o Pai e o Filho.",
    objecoes: [
      {
        objecao: "O Espírito Santo é apenas uma força ou energia de Deus, não uma pessoa.",
        resposta: "O Novo Testamento atribui ao Espírito características pessoais: Ele fala (Atos 13:2), ensina (João 14:26), guia (Romanos 8:14), intercede (Romanos 8:26), pode ser entristecido (Efésios 4:30) e distribuí dons como quer (1 Coríntios 12:11). Uma força impessoal não realiza estas ações."
      }
    ],
    citacoesPatristicas: [
      {
        autor: "Basílio Magno",
        citacao: "O Espírito Santo é a fonte da santificação, a luz intelectual que dá a todo ser racional a manifestação da verdade."
      }
    ],
    topicosRelacionados: ["trindade", "regeneracao", "dons-espirito", "fruto-espirito"]
  },
  {
    id: "regeneracao",
    nome: "Regeneração — Novo Nascimento pelo Espírito",
    categoria: "espirito",
    descricao: "A obra soberana do Espírito Santo que vivifica espiritualmente o pecador morto",
    fundamento: "Em verdade, em verdade te digo: quem não nascer da água e do Espírito não pode entrar no reino de Deus",
    versiculosChave: [
      "João 3:3-8",
      "Ezequiel 36:26-27",
      "Tito 3:5-6",
      "2 Coríntios 5:17",
      "Efésios 2:4-5"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "João Calvino"],
    detalhe: "A regeneração é a obra monergística do Espírito Santo pela qual Ele comunica vida espiritual a uma pessoa espiritualmente morta em pecados. Diferentemente da conversão (que é a resposta humana de fé e arrependimento), a regeneração é exclusivamente divina — o novo nascimento é uma criação soberana, não uma cooperação. Deus remove o coração de pedra e dá um coração de carne (Ezequiel 36), capacitando a pessoa a crer e arrepender-se. A regeneração é instantânea, não processual, e resulta em uma nova natureza que deseja a santidade. Este é o início da vida cristã e o fundamento de toda santificação subsequente.",
    topicosRelacionados: ["pneumatologia", "soteriologia", "vocacao-eficaz"]
  },
  {
    id: "habitacao-espirito",
    nome: "Habitação do Espírito Santo",
    categoria: "espirito",
    descricao: "A presença permanente do Espírito Santo no crente como selo e garantia",
    fundamento: "Não sabeis que sois santuário de Deus e que o Espírito de Deus habita em vós?",
    versiculosChave: [
      "1 Coríntios 3:16-17",
      "Romanos 8:9-11",
      "Efésios 1:13-14",
      "João 14:16-17",
      "2 Coríntios 1:21-22"
    ],
    autoridadesTeologicas: ["João Calvino", "John Owen"],
    detalhe: "A habitação do Espírito Santo refere-se à presença permanente e pessoal da terceira pessoa da Trindade em cada crente. O Espírito habita no crente como templo vivo, santificando-o, guiando-o, confortando-o e capacitando-o para a vida cristã. O selo do Espírito é a marca de propriedade divina e a garantia (arrabão) da herança futura. Diferentemente do Antigo Testamento, onde o Espírito vinha sobre pessoas específicas para tarefas específicas e podia retirar-se, na Nova Aliança o Espírito habita permanentemente em todos os crentes. Entristecer ou apagar o Espírito é possível, mas sua habitação não é revogada.",
    topicosRelacionados: ["pneumatologia", "santificacao", "perseveranca"]
  },
  {
    id: "dons-espirito",
    nome: "Dons do Espírito Santo — Carismas",
    categoria: "espirito",
    descricao: "As capacitações sobrenaturais concedidas pelo Espírito para edificação da igreja",
    fundamento: "Mas um só e o mesmo Espírito realiza todas estas coisas, distribuindo-as, como lhe apraz, a cada um, individualmente",
    versiculosChave: [
      "1 Coríntios 12:4-11",
      "Romanos 12:6-8",
      "Efésios 4:11-13",
      "1 Pedro 4:10-11",
      "1 Coríntios 14:1-5"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "Tomás de Aquino"],
    detalhe: "Os dons do Espírito (charismata) são capacitações sobrenaturais distribuídas soberanamente pelo Espírito Santo a cada crente para o serviço na edificação do corpo de Cristo. Incluem dons de fala (profecia, ensino, exortação), dons de poder (fé, curas, milagres) e dons de revelação (sabedoria, ciência, discernimento). As listas em Romanos 12, 1 Coríntios 12 e Efésios 4 não são exaustivas e se sobrepõem parcialmente. Todos os crentes recebem pelo menos um dom, e cada dom é importante para o funcionamento saudável da igreja. O dom supremo, sem o qual todos os outros perdem o valor, é o amor (1 Coríntios 13).",
    objecoes: [
      {
        objecao: "Os dons de sinais (línguas, profecia, curas) cessaram com os apóstolos.",
        resposta: "A posição cessacionista argumenta que estes dons foram sinais apostólicos temporários. No entanto, a continuacionista aponta que o Novo Testamento não limita estes dons à era apostólica e que manifestações do Espírito têm ocorrido ao longo da história da igreja. A questão permanece debatida entre tradições teológicas."
      }
    ],
    topicosRelacionados: ["pneumatologia", "eclesiologia", "fruto-espirito"]
  },
  {
    id: "fruto-espirito",
    nome: "Fruto do Espírito — Caráter Cristão",
    categoria: "espirito",
    descricao: "As virtudes morais produzidas na vida do crente pelo Espírito Santo",
    fundamento: "Mas o fruto do Espírito é: amor, alegria, paz, longanimidade, benignidade, bondade, fidelidade, mansidão, domínio próprio",
    versiculosChave: [
      "Gálatas 5:22-23",
      "João 15:1-8",
      "Colossenses 3:12-14",
      "2 Pedro 1:5-8",
      "Efésios 5:8-10"
    ],
    autoridadesTeologicas: ["Tomás de Aquino", "John Wesley"],
    detalhe: "O fruto do Espírito é o caráter moral de Cristo sendo formado no crente através da obra progressiva do Espírito Santo. Diferentemente dos dons, que são capacitações para o serviço, o fruto é o caráter santo que reflete a natureza de Deus. Os nove virtudes listados em Gálatas 5 são um retrato de Cristo formado em nós. O fruto é produzido não pelo esforço humano isolado, mas pela permanência em Cristo (João 15) e pela caminhada no Espírito. Enquanto os dons variam entre crentes, o fruto deve ser cultivado por todos. A santidade prática é o objetivo da obra santificadora do Espírito.",
    topicosRelacionados: ["pneumatologia", "santificacao", "vida-crista"]
  },
  {
    id: "soteriologia",
    nome: "Soteriologia — Doutrina da Salvação",
    categoria: "salvacao",
    descricao: "O estudo da obra redentora de Deus em Cristo para a salvação dos pecadores",
    fundamento: "Porque pela graça sois salvos, mediante a fé; e isto não vem de vós, é dom de Deus; não de obras, para que ninguém se glorie",
    versiculosChave: [
      "Efésios 2:8-9",
      "Romanos 3:21-26",
      "Tito 3:4-7",
      "Atos 4:12",
      "João 14:6"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "Tomás de Aquino", "João Calvino"],
    detalhe: "A Soteriologia examina o plano redentor de Deus, a aplicação da obra expiatória de Cristo ao pecador através do Espírito Santo. A salvação é um processo que inclui a eleição eterna, a vocação eficaz, a regeneração, a conversão (fé e arrependimento), a justificação, a santificação, a perseverança e a glorificação. As tradições divergem quanto ao papel da vontade humana: o Calvinismo enfatiza a soberania divina na eleição incondicional e na graça irresistível; o Arminianismo destaca a responsabilidade humana e a eleição condicional baseada na presciência divina. A salvação é exclusivamente pela graça mediante a fé em Cristo.",
    objecoes: [
      {
        objecao: "Todas as religiões levam a Deus; Jesus é apenas um caminho entre muitos.",
        resposta: "Jesus afirmou exclusividade: 'Eu sou o caminho, a verdade e a vida; ninguém vem ao Pai senão por mim' (João 14:6). Os apóstolos pregaram que 'não há salvação em nenhum outro' (Atos 4:12). A singularidade de Cristo baseia-se em sua identidade divino-humana e em sua obra expiatória única."
      }
    ],
    citacoesPatristicas: [
      {
        autor: "Agostinho de Hipona",
        citacao: "Deus não nos salva porque somos bons; Ele nos salva para nos tornar bons."
      }
    ],
    topicosRelacionados: ["predestinacao", "justificacao", "santificacao", "glorificacao"]
  },
  {
    id: "predestinacao",
    nome: "Predestinação e Eleição",
    categoria: "salvacao",
    descricao: "O decreto eterno de Deus pelo qual Ele escolhe alguns para a salvação",
    fundamento: "Assim como nos escolheu nele antes da fundação do mundo, para sermos santos e irrepreensíveis perante ele",
    versiculosChave: [
      "Efésios 1:4-5",
      "Romanos 8:29-30",
      "Romanos 9:14-24",
      "João 6:37-40",
      "2 Timóteo 1:9"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "João Calvino", "Jacob Armínio"],
    detalhe: "A predestinação é o decreto eterno de Deus pelo qual Ele determinou o destino final de cada pessoa. A teologia reformada, seguindo Calvino, afirma a dupla predestinação: Deus elegeu incondicionalmente alguns para a salvação e predestinou outros para a condenação justa por seus pecados (reprovação). O Arminianismo sustenta que a eleição é condicional, baseada na presciência divina da fé humana. O debate centra-se na tensão entre soberania divina e responsabilidade humana. O propósito da eleição é a glória de Deus e a garantia da salvação dos eleitos, que perseverarão até o fim.",
    objecoes: [
      {
        objecao: "A predestinação torna Deus injusto e anula a responsabilidade humana.",
        resposta: "Paulo responde a esta objeção em Romanos 9: 'Quem és tu, ó homem, para discutires com Deus?' A predestinação não anula a responsabilidade, pois os meios (pregação, fé, arrependimento) também são decretados por Deus. A eleição é pela graça, não por mérito, e Deus não é injusto por mostrar misericórdia a quem quer."
      }
    ],
    topicosRelacionados: ["soteriologia", "soberania-deus", "vocacao-eficaz"]
  },
  {
    id: "vocacao-eficaz",
    nome: "Vocação Eficaz — O Chamado de Deus",
    categoria: "salvacao",
    descricao: "O chamado irresistível do Espírito Santo que traz o eleito à salvação",
    fundamento: "E aos que predestinou, a esses também chamou; e aos que chamou, a esses também justificou; e aos que justificou, a esses também glorificou",
    versiculosChave: [
      "Romanos 8:29-30",
      "João 6:44-45",
      "Mateus 11:28-30",
      "Atos 16:14",
      "1 Coríntios 1:22-24"
    ],
    autoridadesTeologicas: ["João Calvino", "Jonathan Edwards"],
    detalhe: "A vocação eficaz (ou graça irresistível) é a obra do Espírito Santo pela qual Ele chama o eleito de maneira poderosa e eficaz para a salvação. Diferencia-se do chamado externo (a pregação do evangelho) que pode ser rejeitado. A vocação eficaz opera internamente, regenerando o coração e convictando a vontade, de modo que a pessoa vem a Cristo livre e voluntariamente. Edwards explicou que a graça irresistível não viola a vontade, mas a inclina soberanamente para o bem. Lídia (Atos 16) é exemplo bíblico: 'o Senhor lhe abriu o coração para atender às coisas que Paulo dizia'.",
    topicosRelacionados: ["soteriologia", "predestinacao", "regeneracao"]
  },
  {
    id: "justificacao",
    nome: "Justificação — Declarado Justo",
    categoria: "salvacao",
    descricao: "O ato judicial de Deus pelo qual Ele declara o pecador justo com base na justiça de Cristo",
    fundamento: "Sendo justificados gratuitamente, por sua graça, mediante a redenção que há em Cristo Jesus",
    versiculosChave: [
      "Romanos 3:21-28",
      "Romanos 5:1-2",
      "Gálatas 2:15-16",
      "Filipenses 3:8-9",
      "2 Coríntios 5:21"
    ],
    autoridadesTeologicas: ["Martinho Lutero", "João Calvino"],
    detalhe: "A justificação é um ato forense (legal) de Deus, não um processo interno. Pela justificação, Deus declara o pecador justo com base na justiça de Cristo imputada (creditada) ao crente e recebida pela fé. A justiça de Cristo é dupla: sua obediência ativa (cumprimento perfeito da lei) é imputada ao crente, e sua obediência passiva (morte substitutiva) satisfaz a pena devida. Lutero chamou a justificação de 'artigo pelo qual a igreja permanece de pé ou cai'. Diferentemente da santificação (que torna o crente internamente justo), a justificação é uma declaração externa e instantânea, completa e perfeita, que não aumenta nem diminui.",
    objecoes: [
      {
        objecao: "A justificação pela fé sola anula a necessidade de boas obras.",
        resposta: "Paulo responde que a fé salvífica não é uma fé morta, mas uma fé que opera pelo amor (Gálatas 5:6). Somos justificados pela fé somente, mas a fé que justifica nunca está só — é acompanhada de boas obras como evidência necessária. Tiago ensina que a fé sem obras é morta (Tiago 2:17-26)."
      }
    ],
    citacoesPatristicas: [
      {
        autor: "Agostinho de Hipona",
        citacao: "A lei foi dada para que a graça fosse buscada; a graça foi dada para que a lei fosse cumprida."
      },
      {
        autor: "Tomás de Aquino",
        citacao: "A justificação do ímpio é o maior dos milagres de Deus."
      }
    ],
    topicosRelacionados: ["soteriologia", "santificacao", "expiacao"]
  },
  {
    id: "santificacao",
    nome: "Santificação — Tornar-se Santo",
    categoria: "salvacao",
    descricao: "O processo progressivo pelo qual o crente é transformado à imagem de Cristo",
    fundamento: "Segui a paz com todos e a santificação, sem a qual ninguém verá o Senhor",
    versiculosChave: [
      "Hebreus 12:14",
      "1 Tessalonicenses 4:3-7",
      "2 Coríntios 3:18",
      "Romanos 6:11-14",
      "Efésios 4:22-24"
    ],
    autoridadesTeologicas: ["John Owen", "John Wesley"],
    detalhe: "A santificação é a obra de Deus e do crente pela qual o caráter de Cristo é progressivamente formado no cristão. Distingue-se da justificação (que é instantânea e forense) por ser processual e interna. A santificação tem aspectos posicionais (o crente é santo em Cristo), progressivos (crescimento contínuo em graça) e final (completa conformidade a Cristo na glória). Wesley ensinou a possibilidade da perfeição cristã (santidade total) nesta vida pela graça divina, enquanto a tradição reformada enfatiza que o velho homem permanece até a morte. A santificação envolve mortificação do pecado e vivificação da justiça.",
    objecoes: [
      {
        objecao: "Se sou salvo pela graça, não preciso me preocupar com a santidade.",
        resposta: "A graça que salva é a mesma que santifica. Efésios 2:8-10 vincula salvação pela graça com boas obras preparadas por Deus. A santificação é evidência da salvação genuína, não opcional. 'Sem a santificação ninguém verá o Senhor' (Hebreus 12:14)."
      }
    ],
    topicosRelacionados: ["soteriologia", "justificacao", "vida-crista", "fruto-espirito"]
  },
  {
    id: "perseveranca",
    nome: "Perseverança dos Santos — Segurança Eterna",
    categoria: "salvacao",
    descricao: "A doutrina de que os verdadeiros crentes perseverarão na fé até o fim",
    fundamento: "A minha alma se apega a ti; a tua destra me sustenta",
    versiculosChave: [
      "João 10:27-29",
      "Romanos 8:35-39",
      "Filipenses 1:6",
      "1 Pedro 1:3-5",
      "Judas 24"
    ],
    autoridadesTeologicas: ["João Calvino", "Charles Spurgeon"],
    detalhe: "A perseverança dos santos é a doutrina reformada de que aqueles que são verdadeiramente regenerados e justificados serão preservados por Deus e perseverarão na fé até o fim, não podendo perder-se totalmente nem finalmente. Esta segurança baseia-se no poder de Deus, na intercessão de Cristo e na habitação do Espírito. Os que parecem crer e depois apostatam demonstram que nunca foram verdadeiramente regenerados (1 João 2:19). O Arminianismo alerta contra o antinomianismo e ensina que a segurança eterna depende da fé contínua. Ambas as posições concordam que a perseverança é necessária e que os crentes devem lutar pela fé.",
    objecoes: [
      {
        objecao: "Se uma vez salvo sempre salvo, posso viver em pecado sem consequências.",
        resposta: "A verdadeira segurança produz santidade, não licenciosidade. A doutrina reformada não diz que a profissão de fé inicial garante salvação independentemente do caráter posterior. A perseverança é evidenciada pela vida de obediência. Aqueles que vivem deliberadamente em pecado demonstram que não são genuinamente convertidos."
      }
    ],
    citacoesPatristicas: [
      {
        autor: "Agostinho de Hipona",
        citacao: "Deus nos dá a perseverança final para que não caiamos; e Ele nos dá gratuitamente."
      }
    ],
    topicosRelacionados: ["soteriologia", "santificacao", "seguranca-eterna"]
  },
  {
    id: "glorificacao",
    nome: "Glorificação — O Corpo Redimido",
    categoria: "salvacao",
    descricao: "A etapa final da salvação quando o crente recebe um corpo ressurreto e glorificado",
    fundamento: "Eis que vos digo um mistério: nem todos dormiremos, mas todos seremos transformados",
    versiculosChave: [
      "1 Coríntios 15:51-54",
      "Romanos 8:18-23",
      "Filipenses 3:20-21",
      "1 João 3:2",
      "2 Coríntios 5:1-5"
    ],
    autoridadesTeologicas: ["Tomás de Aquino", "N. T. Wright"],
    detalhe: "A glorificação é o ato final da salvação, no qual os crentes receberão corpos ressuscitados, imortais e incorruptíveis, à semelhança do corpo glorificado de Cristo. Este corpo será contínuo com o corpo atual (identidade preservada) mas transformado (qualidade aperfeiçoada). A glorificação completa a obra redentora, libertando o crente de toda a presença e efeitos do pecado. Inclui a redenção do corpo (Romanos 8:23) e a plena conformidade à imagem de Cristo. A criação material também será libertada da corrupção e compartilhará da glória dos filhos de Deus, inaugurando os novos céus e nova terra.",
    topicosRelacionados: ["soteriologia", "ressurreicao", "novos-ceus"]
  },
  {
    id: "arrependimento",
    nome: "Arrependimento — Mudança de Mente e Coração",
    categoria: "salvacao",
    descricao: "A mudança radical de mente, coração e direção em resposta ao chamado de Deus",
    fundamento: "Arrependei-vos, pois, e convertei-vos, para que sejam cancelados os vossos pecados",
    versiculosChave: [
      "Atos 3:19",
      "2 Coríntios 7:9-10",
      "Marcos 1:14-15",
      "Salmo 51:1-4",
      "Romanos 2:4"
    ],
    autoridadesTeologicas: ["João Calvino", "John Wesley"],
    detalhe: "O arrependimento é uma mudança radical de mente e coração em relação ao pecado e a Deus. Inclui três elementos: intelectual (reconhecimento do pecado como ofensa a Deus), emocional (tristeza segundo Deus pelo pecado) e volitivo (afastamento do pecado e busca da santidade). O arrependimento não é mero remorso ou medo das consequências, mas uma transformação interior que resulta em frutos práticos. Calvino via o arrependimento como a conversão contínua da vida a Deus, não apenas um evento inicial. O arrependimento genuíno é dom de Deus (Atos 11:18) e acompanha a fé salvadora como dois lados da mesma moeda.",
    topicosRelacionados: ["soteriologia", "conversao", "santificacao"]
  },
  {
    id: "eclesiologia",
    nome: "Eclesiologia — Natureza da Igreja",
    categoria: "igreja",
    descricao: "A doutrina da igreja como corpo de Cristo e povo de Deus",
    fundamento: "Vós, porém, sois raça eleita, sacerdócio real, nação santa, povo de propriedade exclusiva de Deus",
    versiculosChave: [
      "1 Pedro 2:9-10",
      "Efésios 1:22-23",
      "Efésios 4:11-16",
      "1 Coríntios 12:12-27",
      "Mateus 16:17-19"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "João Calvino", "Hans Küng"],
    detalhe: "A Eclesiologia estuda a origem, natureza, marcas, ofícios e destino da igreja. A igreja é a comunidade dos chamados para fora do mundo (ekklesia), o corpo de Cristo do qual Ele é a cabeça, o templo do Espírito Santo e o povo da Nova Aliança. As marcas da igreja verdadeira, segundo os credos reformados, são a pregação pura da Palavra, a administração correta dos sacramentos e a disciplina eclesiástica fiel. A igreja é una (corpo de Cristo), santa (separada para Deus), católica (universal) e apostólica (fundada sobre os apóstolos). As formas de governo incluem episcopal, presbiteriana e congregacional.",
    objecoes: [
      {
        objecao: "É possível ser cristão sem fazer parte de uma igreja organizada.",
        resposta: "Embora a salvação seja individual, a vida cristã é inerentemente comunitária. O Novo Testamento não conhece cristãos isolados — os crentes são membros do corpo de Cristo. A igreja é o meio designado por Deus para o crescimento, o serviço, os sacramentos e a disciplina. Abandonar a igreja é desobedecer a Cristo que a amou e se entregou por ela."
      }
    ],
    citacoesPatristicas: [
      {
        autor: "Cipriano de Cartago",
        citacao: "Não pode ter Deus por Pai quem não tem a Igreja por mãe."
      },
      {
        autor: "Agostinho de Hipona",
        citacao: "A Igreja é a cidade de Deus, peregrina no mundo, mas cidadã do céu."
      }
    ],
    topicosRelacionados: ["batismo", "ceia-senhor", "governo-igreja", "missiologia"]
  },
  {
    id: "batismo",
    nome: "Batismo — Sacramento da Identificação",
    categoria: "igreja",
    descricao: "O rito de iniciação cristã que simboliza a identificação com Cristo na morte e ressurreição",
    fundamento: "Portanto, ide, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo",
    versiculosChave: [
      "Mateus 28:19-20",
      "Romanos 6:3-4",
      "Atos 2:38-39",
      "Gálatas 3:27",
      "Colossenses 2:12"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "João Calvino", "Ulrico Zuínglio"],
    detalhe: "O batismo é o sacramento da iniciação na igreja cristã, ordenado por Cristo, que simboliza a união do crente com Cristo em sua morte, sepultamento e ressurreição. As tradições divergem quanto ao modo (imersão, aspersão ou efusão) e aos sujeitos (crentes ou crianças). Os pedobatistas (católicos, reformados, luteranos) batizam crianças com base na continuidade da aliança; os batistas e anabatistas batizam somente crentes professos. O batismo não salva ex opere operato, mas é sinal e selo da graça da aliança, recebido pela fé. A maioria concorda que o batismo substitui a circuncisão como sinal da nova aliança.",
    topicosRelacionados: ["eclesiologia", "ceia-senhor", "sacramentos"]
  },
  {
    id: "ceia-senhor",
    nome: "Ceia do Senhor — Eucaristia",
    categoria: "igreja",
    descricao: "O sacramento memorial da morte de Cristo e a comunhão do corpo de Cristo",
    fundamento: "E, tomando um pão, tendo dado graças, o partiu e lhes deu, dizendo: Isto é o meu corpo oferecido por vós; fazei isto em memória de mim",
    versiculosChave: [
      "Lucas 22:19-20",
      "1 Coríntios 11:23-29",
      "João 6:53-58",
      "Atos 2:42",
      "1 Coríntios 10:16-17"
    ],
    autoridadesTeologicas: ["Tomás de Aquino", "Martinho Lutero", "Ulrico Zuínglio"],
    detalhe: "A Ceia do Senhor (Eucaristia, Santa Comunhão) é o sacramento ordenado por Cristo no qual os crentes participam do pão e do cálice em memória de sua morte. As interpretações divergem: a transubstanciação católica afirma que o pão e o vinho tornam-se literalmente o corpo e sangue de Cristo; a consubstanciação luterana sustenta que Cristo está 'em, com e sob' os elementos; a presença espiritual reformada (Calvino) ensina uma comunhão espiritual real com Cristo; a posição memorialista (Zuínglio) vê os elementos apenas como símbolos. A Ceia é alimento espiritual, memorial, proclamação da morte de Cristo e antecipação do banquete messiânico futuro.",
    topicosRelacionados: ["eclesiologia", "batismo", "adoracao"]
  },
  {
    id: "governo-igreja",
    nome: "Governo da Igreja",
    categoria: "igreja",
    descricao: "A estrutura de liderança e administração da igreja local e universal",
    fundamento: "E ele mesmo concedeu uns como apóstolos, outros como profetas, outros como evangelistas, outros como pastores e mestres",
    versiculosChave: [
      "1 Timóteo 3:1-13",
      "Tito 1:5-9",
      "Atos 14:23",
      "Efésios 4:11-12",
      "Hebreus 13:7-17"
    ],
    autoridadesTeologicas: ["João Calvino", "Richard Hooker"],
    detalhe: "O governo eclesiástico define a estrutura de liderança da igreja. Os três sistemas principais são: (1) Episcopal — governo por bispos em sucessão apostólica, com autoridade hierárquica; (2) Presbiteriano — governo por presbíteros eleitos, com conexão entre igrejas através de assembleias; (3) Congregacional — autonomia da igreja local com governo pela congregação. As qualificações bíblicas para pastores/presbíteros (1 Timóteo 3, Tito 1) enfatizam caráter moral, capacidade de ensino e liderança familiar. A disciplina eclesiástica (Mateus 18:15-20) é essencial para a pureza e saúde da igreja.",
    topicosRelacionados: ["eclesiologia", "missiologia", "adoracao"]
  },
  {
    id: "missiologia",
    nome: "Missiologia — A Missão da Igreja",
    categoria: "igreja",
    descricao: "O estudo da missão da igreja no mundo, incluindo evangelismo e discipulado",
    fundamento: "Ide, portanto, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo; ensinando-os a guardar todas as coisas que vos tenho ordenado",
    versiculosChave: [
      "Mateus 28:18-20",
      "Atos 1:8",
      "2 Coríntios 5:18-20",
      "Romanos 10:13-15",
      "Isaías 49:6"
    ],
    autoridadesTeologicas: ["William Carey", "John R. Mott", "Lesslie Newbigin"],
    detalhe: "A Missiologia estuda a natureza, base bíblica, história e métodos da missão cristã. A missão da igreja fundamenta-se na Grande Comissão de Cristo, que ordena fazer discípulos de todas as nações. A missão inclui evangelismo (proclamação do evangelho), discipulado (ensino e formação), plantação de igrejas e serviço social como expressão do amor de Cristo. William Carey, pai das missões modernas, argumentou que a Grande Comissão permanece obrigatória para a igreja de todas as épocas. A contextualização do evangelho sem comprometer seu conteúdo essencial é o desafio central da missiologia contemporânea.",
    topicosRelacionados: ["eclesiologia", "adoracao", "evangelismo"]
  },
  {
    id: "adoracao",
    nome: "Adoração — Culto a Deus",
    categoria: "igreja",
    descricao: "A resposta de amor, reverência e serviço ao Deus triúno",
    fundamento: "Deus é espírito, e é necessário que os seus adoradores o adorem em espírito e em verdade",
    versiculosChave: [
      "João 4:23-24",
      "Salmo 95:6-7",
      "Hebreus 12:28-29",
      "Romanos 12:1-2",
      "Colossenses 3:16-17"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "João Calvino"],
    detalhe: "A adoração é a resposta total do ser humano a Deus em reconhecimento de sua glória, majestade e santidade. Inclui culto comunitário (louvor, oração, pregação, sacramentos) e devoção pessoal (adoração, serviço, obediência). Calvino enfatizou o princípio regulador do culto — somente o que é ordenado por Deus deve ser incluído no culto público. A adoração verdadeira envolve o coração (espírito) e o conteúdo correto (verdade), centrando-se em Deus e não na experiência humana. A adoração é tanto um ato quanto um estilo de vida: oferecer o corpo como sacrifício vivo é adoração espiritual (Romanos 12:1).",
    topicosRelacionados: ["eclesiologia", "espiritualidade", "vida-crista"]
  },
  {
    id: "escatologia",
    nome: "Escatologia — Estudo das Últimas Coisas",
    categoria: "futuro",
    descricao: "A doutrina dos eventos finais da história e da consumação do reino de Deus",
    fundamento: "Porque assim como em Adão todos morrem, assim também todos serão vivificados em Cristo",
    versiculosChave: [
      "1 Coríntios 15:20-28",
      "Apocalipse 21:1-5",
      "Daniel 12:1-3",
      "Mateus 24:3-14",
      "2 Pedro 3:8-13"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "Herman Bavinck", "N. T. Wright"],
    detalhe: "A Escatologia investiga os eventos finais da história individual (morte, estado intermediário) e universal (segunda vinda, ressurreição, juízo, estado eterno). A escatologia pode ser já/ainda não — o reino de Deus foi inaugurado na primeira vinda de Cristo (já presente) mas será consumado na segunda vinda (ainda futuro). As principais abordagens hermenêuticas do Apocalipse incluem preterismo (eventos do primeiro século), historicismo (história da igreja), futurismo (eventos futuros) e idealismo (princípios espirituais atemporais). O objetivo da escatologia não é a curiosidade sobre o futuro, mas a esperança que produz santidade e perseverança.",
    objecoes: [
      {
        objecao: "A esperança da volta de Cristo tem sido adiada por dois milênios.",
        resposta: "Pedro responde que para o Senhor um dia é como mil anos (2 Pedro 3:8). A 'demora' é expressão da paciência de Deus, dando tempo para o arrependimento. Cada geração deve viver na expectativa iminente do retorno de Cristo, que virá como ladrão de noite."
      }
    ],
    citacoesPatristicas: [
      {
        autor: "Irineu de Lyon",
        citacao: "O Verbo de Deus virá sobre as nuvens do céu, para ressuscitar os santos e estabelecer o reino do Pai."
      }
    ],
    topicosRelacionados: ["segunda-vinda", "arrebatamento", "milênio", "juizo-final"]
  },
  {
    id: "morte-estado-intermediario",
    nome: "Morte e Estado Intermediário",
    categoria: "futuro",
    descricao: "A condição da alma entre a morte física e a ressurreição final",
    fundamento: "Temos, porém, confiança e desejamos antes deixar esta habitação do corpo e habitar com o Senhor",
    versiculosChave: [
      "2 Coríntios 5:6-8",
      "Filipenses 1:21-23",
      "Lucas 16:19-31",
      "Lucas 23:43",
      "Apocalipse 6:9-11"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "Tomás de Aquino"],
    detalhe: "O estado intermediário é a existência consciente da alma entre a morte e a ressurreição do corpo. A teologia católica romana ensina o purgatório como lugar de purificação para almas que morrem em graça mas não plenamente purificadas. A teologia reformada rejeita o purgatório como não bíblico e ensina que os crentes vão imediatamente à presença de Cristo (céu) e os incrédulos ao Hades (lugar de tormento). O estado intermediário é consciente, mas incompleto, pois a alma aguarda a ressurreição corporal. A morte não é aniquilação, mas separação — do corpo para a alma, e espiritualmente de Deus para os perdidos.",
    topicosRelacionados: ["escatologia", "ressurreicao", "juizo-final"]
  },
  {
    id: "arrebatamento",
    nome: "Arrebatamento da Igreja",
    categoria: "futuro",
    descricao: "O encontro dos crentes com Cristo nos ares por ocasião de sua vinda",
    fundamento: "Porque o Senhor mesmo, dada a sua palavra de ordem, ouvida a voz do arcanjo, e ressoada a trombeta de Deus, descerá dos céus, e os mortos em Cristo ressuscitarão primeiro; depois, nós, os vivos, os que ficarmos, seremos arrebatados juntamente com eles, entre nuvens, para o encontro do Senhor nos ares",
    versiculosChave: [
      "1 Tessalonicenses 4:13-18",
      "1 Coríntios 15:50-54",
      "João 14:1-3",
      "Apocalipse 3:10",
      "Lucas 21:34-36"
    ],
    autoridadesTeologicas: ["John Nelson Darby", "C. I. Scofield", "J. Dwight Pentecost"],
    detalhe: "O arrebatamento é o evento em que os crentes em Cristo serão arrebatados para encontrar o Senhor nos ares na sua vinda. As interpretações quanto ao timing em relação à tribulação variam: pré-tribulacionismo (antes da tribulação, posição popularizada por Darby e Scofield), mid-tribulacionismo (no meio da tribulação) e pós-tribulacionismo (após a tribulação mas antes do milênio). O pré-tribulacionista distingue o arrebatamento (para os crentes, a qualquer momento, invisível) da segunda vinda (para julgar e reinar, visível). O pós-tribulacionista vê ambos como o mesmo evento. Independentemente da posição, o arrebatamento é fonte de consolação para a igreja.",
    objecoes: [
      {
        objecao: "A doutrina do arrebatamento secreto foi inventada no século XIX.",
        resposta: "Embora Darby tenha sistematizado a distinção entre arrebatamento e segunda vinda, a expectativa do encontro com Cristo nos ares está claramente em 1 Tessalonicenses 4. Pais da igreja como Efrém da Síria (século IV) escreveram sobre o arrebatamento dos santos. A novidade de uma doutrina não determina sua verdade."
      }
    ],
    topicosRelacionados: ["escatologia", "segunda-vinda", "tribulacao"]
  },
  {
    id: "tribulacao",
    nome: "Tribulação — Período de Angústia",
    categoria: "futuro",
    descricao: "O período de juízo divino e sofrimento sem precedentes antes do fim",
    fundamento: "Porque nesse tempo haverá grande tribulação, como desde o princípio do mundo até agora não tem havido e nem jamais haverá",
    versiculosChave: [
      "Mateus 24:21-22",
      "Apocalipse 7:13-14",
      "Jeremias 30:7",
      "Daniel 12:1",
      "Apocalipse 6:1-17"
    ],
    autoridadesTeologicas: ["John Walvoord", "Robert Gundry"],
    detalhe: "A tribulação (ou grande tribulação) é um período futuro de juízo divino sem precedentes sobre a terra. Os pré-tribulacionistas crêem que a igreja será arrebatada antes deste período de sete anos (baseado em Daniel 9:24-27), enquanto os pós-tribulacionistas ensinam que a igreja passará pela tribulação mas será protegida. O período inclui os selos, trombetas e taças do Apocalipse, culminando na batalha do Armagedom. A tribulação serve para julgar a incredulidade, purificar Israel e trazer conversões de última hora. Anticristo e falso profeta emergirão como líderes mundiais. O período termina com a vinda visível de Cristo.",
    topicosRelacionados: ["escatologia", "arrebatamento", "milênio", "segunda-vinda"]
  },
  {
    id: "milenio",
    nome: "Milênio — Reino de Mil Anos",
    categoria: "futuro",
    descricao: "O reinado de Cristo na terra por mil anos entre a tribulação e o estado eterno",
    fundamento: "Bem-aventurado e santo é aquele que tem parte na primeira ressurrição; sobre esses a segunda morte não tem autoridade; mas serão sacerdotes de Deus e de Cristo e reinarão com ele durante mil anos",
    versiculosChave: [
      "Apocalipse 20:1-6",
      "Isaías 11:6-9",
      "Miqueias 4:1-4",
      "Zacarias 14:9-11",
      "Salmo 72:7-11"
    ],
    autoridadesTeologicas: ["Justino Mártir", "Agostinho de Hipona", "George Ladd"],
    detalhe: "O milênio é o período de mil anos do reinado de Cristo mencionado em Apocalipse 20. Três interpretações principais: (1) Pré-milenismo histórico — Cristo voltará antes do milênio para reinar literalmente na terra; (2) Pós-milenismo — a igreja estabelecerá o reino através da pregação do evangelho, e Cristo voltará após o milênio; (3) Amilenismo — o milênio é simbólico do período atual entre as duas vindas, durante o qual Cristo reina do céu com os santos. O amilenismo de Agostinho tornou-se a visão dominante na igreja medieval. O pré-milenismo enfatiza a esperança literal do reinado terreno de Cristo.",
    topicosRelacionados: ["escatologia", "segunda-vinda", "tribulacao", "novos-ceus"]
  },
  {
    id: "ressurreicao-mortos",
    nome: "Ressurreição dos Mortos",
    categoria: "futuro",
    descricao: "A ressurreição corporal de todos os mortos, justos e injustos",
    fundamento: "Não vos admireis disto, porque vem a hora em que todos os que se acham nos túmulos ouvirão a sua voz e sairão: os que tiverem feito o bem, para a ressurreição da vida; e os que tiverem praticado o mal, para a ressurreição do juízo",
    versiculosChave: [
      "João 5:28-29",
      "Daniel 12:2",
      "1 Coríntios 15:35-44",
      "Atos 24:15",
      "Apocalipse 20:11-15"
    ],
    autoridadesTeologicas: ["Justino Mártir", "Agostinho de Hipona", "N. T. Wright"],
    detalhe: "A ressurreição dos mortos é a doutrina de que todos os seres humanos serão corporalmente ressuscitados no fim dos tempos. Os justos ressuscitarão para a vida eterna e os injustos para o juízo. O corpo ressurreto será um corpo transformado, não mera reanimação do cadáver — será incorruptível, glorificado e adequado à existência eterna. A ressurreição de Cristo é o protótipo e a garantia da ressurreição dos crentes. Paulo argumenta que sem a ressurreição corporal, a fé cristã é vã. A ressurreição não é uma reencarnação (a alma retorna para um novo corpo), mas a redenção do mesmo corpo, transformado.",
    topicosRelacionados: ["escatologia", "glorificacao", "juizo-final"]
  },
  {
    id: "juizo-final",
    nome: "Juízo Final — Grande Trono Branco",
    categoria: "futuro",
    descricao: "O julgamento final de toda a humanidade diante do trono de Deus",
    fundamento: "E vi um grande trono branco e aquele que estava assentado sobre ele, de cuja presença fugiram a terra e o céu, e não se achou lugar para eles",
    versiculosChave: [
      "Apocalipse 20:11-15",
      "Mateus 25:31-46",
      "Romanos 14:10-12",
      "2 Coríntios 5:10",
      "João 12:48"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "Jonathan Edwards"],
    detalhe: "O juízo final é o tribunal universal de Deus no qual todos os seres humanos prestarão contas de suas obras. Os crentes são julgados com base na justiça imputada de Cristo e suas obras evidenciam a fé salvífica; os incrédulos são julgados segundo suas obras e condenados com base na justiça divina. O Grande Trono Branco é o julgamento final dos ímpios, após o milênio. A condenação eterna (inferno, lago de fogo) é a segunda morte — separação consciente e eterna de Deus. A doutrina do juízo afirma a justiça moral de Deus e a seriedade do pecado, motivando o arrependimento e a evangelização.",
    objecoes: [
      {
        objecao: "Um Deus de amor não pode condenar pessoas ao inferno eterno.",
        resposta: "Deus é santo e justo, e o pecado contra um Deus infinito merece punição infinita. Jesus falou mais sobre o inferno do que sobre o céu. A doutrina do inferno não contradiz o amor divino — o amor respeita a liberdade humana e a dignidade da escolha. Aqueles que rejeitam Deus conscientemente recebem a consequência de sua rejeição."
      },
      {
        objecao: "A punição eterna é desproporcional ao pecado humano finito.",
        resposta: "A gravidade do pecado é determinada pela dignidade da pessoa ofendida. O pecado contra o Deus infinito é infinitamente grave. Além disso, o pecado no inferno continua, e a alma permanece em rebelião, tornando a punição justa e contínua. A doutrina do aniquilacionismo (alma deixaria de existir) enfraquece a seriedade do pecado."
      }
    ],
    citacoesPatristicas: [
      {
        autor: "Irineu de Lyon",
        citacao: "Aos que perseveram no amor, Ele concede a vida eterna; aos que perseveram no pecado, o fogo eterno."
      }
    ],
    topicosRelacionados: ["escatologia", "ressurreicao", "inferno"]
  },
  {
    id: "novos-ceus",
    nome: "Novos Céus e Nova Terra",
    categoria: "futuro",
    descricao: "A renovação final da criação após o juízo final",
    fundamento: "E vi novo céu e nova terra, porque o primeiro céu e a primeira terra passaram, e o mar já não existe",
    versiculosChave: [
      "Apocalipse 21:1-4",
      "Isaías 65:17-25",
      "2 Pedro 3:10-13",
      "Romanos 8:19-23",
      "Apocalipse 22:1-5"
    ],
    autoridadesTeologicas: ["Irineu de Lyon", "N. T. Wright"],
    detalhe: "Os novos céus e nova terra são o estado final e eterno dos redimidos, a consumação do propósito redentor de Deus. A criação material, libertada da corrupção, será renovada e transformada, não aniquilada. Nesta nova criação, Deus habitará pessoalmente com seu povo, enxugando toda lágrima e eliminando a morte, o luto, o pranto e a dor. A Nova Jerusalém desce do céu como a união final do céu e da terra. A teologia atual (N. T. Wright) enfatiza que o destino cristão não é 'ir para o céu' eternamente, mas participar da nova terra renovada onde Deus habita conosco. A árvore da vida e o rio da vida simbolizam a vitalidade eterna.",
    objecoes: [
      {
        objecao: "O foco no céu torna os cristãos indiferentes às questões terrenas.",
        resposta: "A esperança escatológica, corretamente entendida, impulsiona o engajamento presente. A nova criação valida o valor do mundo material e da cultura. Os cristãos são chamados a antecipar o reino futuro através da justiça, misericórdia e cuidado com a criação, pois o destino da terra não é a destruição, mas a redenção."
      }
    ],
    citacoesPatristicas: [
      {
        autor: "Irineu de Lyon",
        citacao: "Não é a substância da criação que será destruída, mas a qualidade e o modo de sua existência que serão transformados."
      }
    ],
    topicosRelacionados: ["escatologia", "glorificacao", "milênio"]
  },
  {
    id: "antropologia-biblica",
    nome: "Antropologia Bíblica — Natureza do Homem",
    categoria: "antropologia",
    descricao: "O estudo da origem, natureza e destino do ser humano à luz das Escrituras",
    fundamento: "E criou Deus o homem à sua imagem; à imagem de Deus o criou; homem e mulher os criou",
    versiculosChave: [
      "Gênesis 1:26-27",
      "Gênesis 2:7",
      "Salmo 8:3-6",
      "1 Tessalonicenses 5:23",
      "Hebreus 4:12"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "Tomás de Aquino"],
    detalhe: "A Antropologia Bíblica examina o ser humano como criatura feita à imagem de Deus, composta de corpo e alma (ou corpo, alma e espírito). A visão dicotômica distingue entre o corpo material e a alma/espírito imaterial; a tricotômica distingue corpo, alma e espírito como três partes. O ser humano foi criado em santidade original e livre-arbítrio, capaz de não pecar. O homem é simultaneamente pó da terra (humildade) e imagem de Deus (dignidade). A sexualidade como homem e mulher reflete a imagem relacional de Deus. A antropologia informa a ética, a política e a teologia prática, definindo o que significa ser humano em relação a Deus, ao próximo e à criação.",
    topicosRelacionados: ["imagem-deus", "queda", "pecado-original"]
  },
  {
    id: "imagem-deus",
    nome: "Imagem de Deus — Imago Dei",
    categoria: "antropologia",
    descricao: "A semelhança com Deus impressa no ser humano na criação",
    fundamento: "E disse Deus: Façamos o homem à nossa imagem, conforme a nossa semelhança",
    versiculosChave: [
      "Gênesis 1:26-27",
      "Gênesis 9:6",
      "Colossenses 3:9-10",
      "Efésios 4:22-24",
      "1 Coríntios 11:7"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "João Calvino", "Karl Barth"],
    detalhe: "A imagem de Deus (imago Dei) é o que distingue os seres humanos do restante da criação, conferindo-lhes dignidade inalienável. A imagem é entendida de várias formas: substancial (racionalidade, livre-arbítrio, alma imortal), relacional (a capacidade de relacionar-se com Deus e com o próximo), funcional (domínio sobre a criação como vice-regentes de Deus) e cristológica (Cristo é a verdadeira imagem, e nós somos conformados a Ele). A imagem foi marcantemente danificada pela queda, mas não totalmente perdida (Gênesis 9:6). A redenção em Cristo restaura progressivamente a imagem de Deus no crente, e será plenamente restaurada na glorificação.",
    topicosRelacionados: ["antropologia-biblica", "queda", "cristologia"]
  },
  {
    id: "queda-homem",
    nome: "Queda do Homem",
    categoria: "antropologia",
    descricao: "A entrada do pecado no mundo através da desobediência de Adão",
    fundamento: "Portanto, assim como por um só homem entrou o pecado no mundo, e pelo pecado, a morte, assim também a morte passou a todos os homens, porque todos pecaram",
    versiculosChave: [
      "Romanos 5:12-14",
      "Gênesis 3:1-19",
      "1 Coríntios 15:21-22",
      "Eclesiastes 7:29",
      "2 Coríntios 11:3"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "João Calvino"],
    detalhe: "A queda do homem refere-se ao evento histórico narrado em Gênesis 3, no qual Adão e Eva desobedeceram a Deus ao comer do fruto proibido, introduzindo o pecado e a morte na experiência humana. A tentação veio de Satanás na forma da serpente, que seduziu Eva com a promessa de ser como Deus. O pecado humano não foi mero erro, mas rebelião deliberada contra o mandamento divino. As consequências da queda incluem a corrupção da natureza humana, a ruptura do relacionamento com Deus, a maldição sobre a criação e a propagação do pecado a toda a raça humana. A queda explica a condição humana universal de pecado e a necessidade de redenção sobrenatural.",
    topicosRelacionados: ["antropologia-biblica", "pecado-original", "hamartiologia", "soteriologia"]
  },
  {
    id: "hamartiologia",
    nome: "Hamartiologia — Doutrina do Pecado",
    categoria: "antropologia",
    descricao: "O estudo da origem, natureza e consequências do pecado",
    fundamento: "Todo aquele que pratica o pecado também transgride a lei, porque o pecado é a transgressão da lei",
    versiculosChave: [
      "1 João 3:4",
      "Romanos 3:9-20",
      "Romanos 6:23",
      "Jeremias 17:9",
      "Tiago 1:13-15"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "John Owen", "Jonathan Edwards"],
    detalhe: "A Hamartiologia é o estudo da natureza e extensão do pecado. O pecado pode ser definido como falta de conformidade com a lei moral de Deus, seja por atos (comissão) ou por omissão. Inclui o pecado original (natureza pecaminosa herdada), pecados atuais (atos específicos de desobediência) e o estado de culpa e corrupção que afeta todo ser humano desde a queda. A teologia reformada enfatiza a depravação total: o pecado afeta todo o ser humano (intelecto, vontade, emoções), embora não impeça totalmente a graça comum. O pecado é mais que mero erro ou fraqueza — é rebelião contra Deus que merece juízo. A solução para o pecado não é mero esforço moral, mas a obra redentora de Cristo aplicada pelo Espírito.",
    objecoes: [
      {
        objecao: "O pecado é apenas um conceito cultural ultrapassado ou neuroses psicológicas.",
        resposta: "Reduzir o pecado a condicionamento social ou doença mental ignora a realidade da culpa moral e da responsabilidade pessoal. A consciência universal de culpa aponta para uma realidade moral objetiva. A solução cristã (perdão e transformação) é mais profunda que a mera terapia ou reforma social."
      }
    ],
    topicosRelacionados: ["antropologia-biblica", "queda", "pecado-original", "soteriologia"]
  },
  {
    id: "pecado-original",
    nome: "Pecado Original",
    categoria: "antropologia",
    descricao: "A transmissão da culpa e corrupção de Adão a toda a humanidade",
    fundamento: "Pois assim como, pela desobediência de um só homem, muitos se tornaram pecadores, assim também, pela obediência de um só, muitos se tornarão justos",
    versiculosChave: [
      "Romanos 5:18-19",
      "Salmo 51:5",
      "Efésios 2:1-3",
      "Gênesis 8:21",
      "João 3:6"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "Tomás de Aquino", "João Calvino"],
    detalhe: "O pecado original é a doutrina de que toda a humanidade nasce em estado de pecado e culpa devido à queda de Adão, o representante federal da raça humana. Adão agiu como cabeça representativa (visão federalista), e seu pecado é imputado a todos os seus descendentes. Consequências incluem: culpa imputada, natureza corrupta (concupiscência), separação de Deus e sujeição à morte. Agostinho formulou esta doutrina contra Pelágio, que negava o pecado original. O pecado original não significa que o ser humano não possa fazer nenhum bem (graça comum permite obras externamente boas), mas que não pode fazer o bem salvífico sem a graça regeneradora.",
    topicosRelacionados: ["hamartiologia", "queda", "antropologia-biblica", "graca-comum"]
  },
  {
    id: "graca-comum",
    nome: "Graça Comum e Graça Especial",
    categoria: "antropologia",
    descricao: "A bondade de Deus para com toda a criação e a graça redentora para os eleitos",
    fundamento: "Ele faz nascer o seu sol sobre maus e bons e vir chuva sobre justos e injustos",
    versiculosChave: [
      "Mateus 5:43-45",
      "Salmo 145:9",
      "Atos 14:16-17",
      "Romanos 2:14-15",
      "Gênesis 39:5"
    ],
    autoridadesTeologicas: ["João Calvino", "Abraham Kuyper", "Cornelius Van Til"],
    detalhe: "A graça comum é a benevolência universal de Deus para com toda a criação, pela qual Ele sustenta a ordem, refreia o pecado, concede bênçãos temporais e capacita a cultura humana. Diferencia-se da graça especial/eficaz, que é redentora e concedida somente aos eleitos para a salvação. Calvino ensinou que a graça comum explica as virtudes e realizações dos não crentes. Kuyper desenvolveu o conceito de 'graça comum' para fundamentar o engajamento cristão na cultura. A graça comum não salva, mas torna a vida em sociedade possível e permite o desenvolvimento da ciência, arte e governo. A graça especial opera internamente para regenerar, justificar e santificar o eleito.",
    topicosRelacionados: ["antropologia-biblica", "providencia", "soteriologia"]
  },
  {
    id: "angelologia",
    nome: "Angelologia — Doutrina dos Anjos",
    categoria: "angelologia",
    descricao: "O estudo dos seres angelicais, sua natureza, classificação e ministério",
    fundamento: "Bendizei ao Senhor, anjos seus, valentes em poder, que executais as suas ordens, obedecendo à voz da sua palavra",
    versiculosChave: [
      "Salmo 103:20-21",
      "Colossenses 1:16",
      "Hebreus 1:13-14",
      "Jó 38:4-7",
      "Apocalipse 5:11-12"
    ],
    autoridadesTeologicas: ["Tomás de Aquino", "João Calvino", "Karl Barth"],
    detalhe: "A Angelologia investiga a natureza e obra dos anjos, seres espirituais criados por Deus para servi-Lo e ministrar aos herdeiros da salvação. Os anjos são espíritos sem corpo, imortais, dotados de inteligência e vontade, e organizados em hierarquias (querubins, serafins, arcanjos, anjos). Tomás de Aquino desenvolveu uma angelologia complexa, com nove ordens celestes. Os anjos bons perseveraram em obediência e foram confirmados em graça. Eles adoram a Deus continuamente, protegem os crentes (anjos da guarda), executam juízos divinos e participarão dos eventos escatológicos. O culto aos anjos é proibido (Colossenses 2:18); eles devem ser respeitados, não adorados.",
    topicosRelacionados: ["demoniologia", "batalha-espiritual", "anjos-bons"]
  },
  {
    id: "anjos-bons",
    nome: "Anjos Bons — Natureza e Ministério",
    categoria: "angelologia",
    descricao: "Os anjos que permaneceram fiéis a Deus e seu serviço no plano redentor",
    fundamento: "Não são todos eles espíritos ministradores, enviados para serviço a favor dos que hão de herdar a salvação?",
    versiculosChave: [
      "Hebreus 1:14",
      "Salmo 91:11-12",
      "Daniel 10:10-14",
      "Lucas 1:11-20",
      "Atos 12:5-11"
    ],
    autoridadesTeologicas: ["Tomás de Aquino", "Billy Graham"],
    detalhe: "Os anjos bons são ministros de Deus que executam sua vontade e servem aos crentes. Eles incluem arcanjos (Miguel, Gabriel), querubins (guardam a santidade de Deus) e serafins (adoram perpetuamente). Seu ministério inclui: adoração celestial contínua, proteção e livramento dos santos, revelação de mensagens divinas, execução de juízos, assistência na conversão e ministério no momento da morte dos crentes (Lucas 16:22). Os anjos da guarda (Mateus 18:10) são uma tradição bem atestada na igreja primitiva, embora a identificação individual seja especulativa. Os anjos aprenderam sobre a multiforme sabedoria de Deus através da igreja (Efésios 3:10).",
    topicosRelacionados: ["angelologia", "batalha-espiritual", "adoracao"]
  },
  {
    id: "satanas",
    nome: "Satanás — Queda e Obra Atual",
    categoria: "angelologia",
    descricao: "O adversário de Deus e da humanidade, sua origem, queda e atividades",
    fundamento: "Sede sóbrios e vigilantes. O diabo, vosso adversário, anda em derredor, como leão que ruge procurando alguém para devorar",
    versiculosChave: [
      "1 Pedro 5:8",
      "Isaías 14:12-15",
      "Ezequiel 28:12-17",
      "Apocalipse 12:7-9",
      "Jó 1:6-12"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "Tomás de Aquino", "C. S. Lewis"],
    detalhe: "Satanás (Lúcifer) era originalmente um anjo perfeito e glorioso que se rebelou contra Deus por orgulho, desejando ser igual ao Altíssimo (Isaías 14, Ezequiel 28). Sua queda arrastou um terço dos anjos (Apocalipse 12:4). Atualmente, Satanás atua como acusador, tentador, enganador e adversário, cegando os incrédulos e tentando os crentes. Ele é o 'deus deste século' (2 Coríntios 4:4) e príncipe das potestades do ar. Entretanto, sua derrota foi garantida na cruz (Colossenses 2:15) e será consumada no lago de fogo (Apocalipse 20:10). O poder de Satanás é limitado pela soberania de Deus. C. S. Lewis alertou contra os dois erros opostos: negar sua existência ou ter obsessão mórbida por ele.",
    objecoes: [
      {
        objecao: "Satanás é uma personificação mitológica do mal, não um ser real.",
        resposta: "Jesus falou de Satanás como uma pessoa real (João 8:44, Lucas 10:18) e foi tentado por ele no deserto (Mateus 4). O Novo Testamento consistentemente trata Satanás como um ser pessoal, não simbólico. Negar sua existência é ignorar a realidade espiritual do mal e a estratégia do próprio diabo de esconder-se."
      }
    ],
    topicosRelacionados: ["angelologia", "demoniologia", "batalha-espiritual", "queda"]
  },
  {
    id: "demoniologia",
    nome: "Demonologia — Demônios e Seus Poderes",
    categoria: "angelologia",
    descricao: "O estudo dos anjos caídos e sua influência no mundo",
    fundamento: "Porque a nossa luta não é contra o sangue e a carne, e sim contra os principados e potestades, contra os dominadores deste mundo tenebroso",
    versiculosChave: [
      "Efésios 6:10-12",
      "Mateus 8:28-34",
      "Marcos 5:1-20",
      "Marcos 9:14-29",
      "Lucas 10:17-20"
    ],
    autoridadesTeologicas: ["Orígenes", "Tomás de Aquino"],
    detalhe: "A Demonologia é o estudo dos anjos caídos (demônios) que seguiram Satanás em sua rebelião. Os demônios são seres espirituais inteligentes e poderosos, que operam sob a liderança de Satanás para se opor ao reino de Deus. Eles podem influenciar mentes e corpos, causar doenças, promover falsas doutrinas e oprimir pessoas. A possessão demoníaca (habitação de um demônio no corpo de uma pessoa) é distinta da opressão (influência externa). O ministério de libertação de Jesus e dos apóstolos demonstra autoridade sobre os demônios. Embora poderosos, os demônios são limitados por Deus e foram derrotados por Cristo na cruz. Os crentes recebem autoridade em Cristo para resistir ao diabo (Tiago 4:7).",
    topicosRelacionados: ["angelologia", "satanas", "batalha-espiritual"]
  },
  {
    id: "batalha-espiritual",
    nome: "Batalha Espiritual — Conflito Cósmico",
    categoria: "angelologia",
    descricao: "A guerra espiritual entre o reino de Deus e as forças das trevas",
    fundamento: "Revesti-vos de toda a armadura de Deus, para poderdes ficar firmes contra as ciladas do diabo",
    versiculosChave: [
      "Efésios 6:10-18",
      "2 Coríntios 10:3-5",
      "1 Pedro 5:8-9",
      "Tiago 4:7-8",
      "Romanos 16:20"
    ],
    autoridadesTeologicas: ["John Owen", "Watchman Nee"],
    detalhe: "A batalha espiritual refere-se ao conflito contínuo entre as forças do reino de Deus e os poderes das trevas, que ocorre nas esferas celestial e terrena. O crente é chamado a estar preparado com a armadura de Deus (Efésios 6), incluindo o cinto da verdade, couraça da justiça, sapatos do evangelho, escudo da fé, capacete da salvação e espada do Espírito. A batalha não é física, mas espiritual — envolve oração, resistência ao pecado, proclamação da verdade e fé na vitória de Cristo. O excesso de ênfase em estratégias de guerra espiritual pode desviar o foco da suficiência de Cristo, mas negligenciar a realidade espiritual do conflito também é perigoso. A vitória final pertence ao Cordeiro.",
    objecoes: [
      {
        objecao: "A linguagem de batalha espiritual é metafórica e superada.",
        resposta: "O Novo Testamento usa consistentemente a linguagem de guerra espiritual como realidade objetiva, não mera metáfora. Efésios 6, 2 Coríntios 10 e 1 Pedro 5 tratam o conflito espiritual como uma experiência real do crente. Ignorar esta dimensão é deixar-se vulnerável aos ataques do inimigo."
      }
    ],
    topicosRelacionados: ["angelologia", "satanas", "demoniologia", "vida-crista"]
  },
  {
    id: "teologia-alianca",
    nome: "Teologia da Aliança",
    categoria: "salvacao",
    descricao: "A interpretação bíblica centrada no conceito de aliança divina",
    fundamento: "Estabelecerei a minha aliança entre mim e ti e a tua descendência no decurso das suas gerações, aliança perpétua",
    versiculosChave: [
      "Gênesis 17:7-8",
      "Jeremias 31:31-34",
      "Lucas 22:20",
      "Gálatas 3:15-18",
      "Hebreus 8:6-13"
    ],
    autoridadesTeologicas: ["João Calvino", "Herman Witsius", "Meredith Kline"],
    detalhe: "A Teologia da Aliança é um sistema hermenêutico que organiza as Escrituras em torno de alianças divinas. Geralmente distingue três alianças: a Aliança da Redenção (entre o Pai e o Filho na eternidade), a Aliança das Obras (com Adão no Éden, condicionada à obediência) e a Aliança da Graça (com os eleitos em Cristo, baseada na graça). A Lei de Moisés é interpretada como uma administração particular da Aliança da Graça, não uma aliança de obras alternativa. A Teologia da Aliança enfatiza a unidade orgânica das Escrituras e a continuidade entre o Antigo e o Novo Testamento. O batismo infantil é praticado como sinal da Aliança da Graça, correspondente à circuncisão.",
    objecoes: [
      {
        objecao: "A Teologia da Aliança impõe um sistema artificial sobre o texto bíblico.",
        resposta: "O próprio termo 'aliança' (berith/diatheke) é central na narrativa bíblica, ocorrendo centenas de vezes. Jesus instituiu a 'nova aliança' (Lucas 22:20), e Paulo contrasta as alianças em Gálatas e 2 Coríntios. A Teologia da Aliança busca explicitar o que está implícito no texto, não impor um sistema estranho."
      }
    ],
    topicosRelacionados: ["dispensacionalismo", "hermeneutica", "batismo"]
  },
  {
    id: "dispensacionalismo",
    nome: "Dispensacionalismo",
    categoria: "futuro",
    descricao: "Sistema hermenêutico que distingue dispensações na administração divina",
    fundamento: "Porque, se a rejeição deles é a reconciliação do mundo, que será o seu senão a vida dentre os mortos?",
    versiculosChave: [
      "Romanos 11:25-27",
      "Daniel 9:24-27",
      "Apocalipse 4:1",
      "Gálatas 3:24-25",
      "Colossenses 1:25-27"
    ],
    autoridadesTeologicas: ["John Nelson Darby", "C. I. Scofield", "Charles Ryrie"],
    detalhe: "O Dispensacionalismo é um sistema teológico que divide a história em dispensações — períodos distintos nos quais Deus administra seu relacionamento com a humanidade de maneiras diferentes. O dispensacionalismo clássico (Scofield) reconhece sete dispensações: Inocência, Consciência, Governo Humano, Promessa, Lei, Graça e Reino Milenial. Distingue-se da Teologia da Aliança por manter uma distinção clara entre Israel e a igreja, interpretar as profecias do Antigo Testamento literalmente para Israel e crer em um arrebatamento pré-tribulacional. O dispensacionalismo progressivo mantém a distinção Israel-igreja mas vê mais continuidade na salvação. A popularidade do dispensacionalismo deve-se especialmente à Bíblia de Scofield.",
    objecoes: [
      {
        objecao: "O dispensacionalismo é recente demais para ser uma doutrina válida.",
        resposta: "Embora sistematizado por Darby no século XIX, elementos dispensacionais (distinção entre eras) aparecem em Pais da Igreja como Justino Mártir e Irineu. A antiguidade não é o único teste de verdade doutrinária; a fidelidade às Escrituras é o critério principal."
      }
    ],
    topicosRelacionados: ["teologia-alianca", "escatologia", "arrebatamento", "milênio"]
  },
  {
    id: "hermeneutica",
    nome: "Hermenêutica — Interpretação Bíblica",
    categoria: "revelacao",
    descricao: "A ciência e arte da interpretação das Escrituras",
    fundamento: "Ora, o homem natural não aceita as coisas do Espírito de Deus, porque lhe são loucura; e não pode entendê-las, porque elas se discernem espiritualmente",
    versiculosChave: [
      "1 Coríntios 2:12-14",
      "Neemias 8:8",
      "Lucas 24:27",
      "Atos 17:11",
      "2 Timóteo 2:15"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "Tomás de Aquino", "F. F. Bruce"],
    detalhe: "A Hermenêutica é a disciplina da interpretação bíblica, definindo princípios para compreender corretamente o significado das Escrituras. Princípios fundamentais incluem: interpretação gramático-histórica (significado segundo o contexto linguístico e histórico), analogia da fé (a Escritura interpreta a Escritura), consideração do gênero literário (narrativa, poesia, profecia, epístola, apocalíptico) e a necessidade da iluminação do Espírito Santo. Agostinho, em 'De Doctrina Christiana', estabeleceu princípios hermenêuticos fundamentais, incluindo a regra do amor. A hermenêutica contemporânea debate questões de pré-compreensão, leitor e comunidade interpretativa.",
    topicosRelacionados: ["bibliologia", "revelacao-especial", "teologia"]
  },
  {
    id: "teologia-oracao",
    nome: "Teologia da Oração",
    categoria: "igreja",
    descricao: "A doutrina e prática da comunicação do crente com Deus",
    fundamento: "Pedi, e dar-se-vos-á; buscai, e encontrareis; batei, e abrir-se-vos-á",
    versiculosChave: [
      "Mateus 7:7-11",
      "Mateus 6:5-15",
      "Romanos 8:26-27",
      "1 Tessalonicenses 5:16-18",
      "Lucas 18:1-8"
    ],
    autoridadesTeologicas: ["Evágrio Pôntico", "Tomás de Aquino", "John Bunyan"],
    detalhe: "A Teologia da Oração examina a natureza, propósito e prática da oração como comunicação com Deus. A oração é ao mesmo tempo um dom divino e uma disciplina humana — o Espírito Santo nos capacita a orar, e somos chamados a perseverar. A oração inclui adoração, confissão, ação de graças e súplica (o modelo ACTS). A oração do Pai Nosso é o paradigma ensinado por Jesus. Debates teológicos incluem a relação entre oração e soberania divina, o propósito da oração (mudar-nos ou mudar as circunstâncias?), e a oração de intercessão. Tomás de Aquino via a oração como um ato da virtude da religião. Evágrio chamou a oração de 'o mais elevado dos ministérios do intelecto'.",
    topicosRelacionados: ["adoracao", "providencia", "espiritualidade"]
  },
  {
    id: "vida-crista",
    nome: "Vida Cristã e Santidade Prática",
    categoria: "salvacao",
    descricao: "A vida de discipulado, obediência e crescimento na graça",
    fundamento: "Portanto, como recebestes Cristo Jesus, o Senhor, assim andai nele, nele radicados, edificados e confirmados na fé",
    versiculosChave: [
      "Colossenses 2:6-7",
      "Romanos 12:1-2",
      "2 Pedro 3:18",
      "Efésios 5:1-2",
      "1 João 2:1-6"
    ],
    autoridadesTeologicas: ["Tomás de Kempis", "John Bunyan", "Dietrich Bonhoeffer"],
    detalhe: "A vida cristã é a existência transformada do crente que responde à graça de Deus através da fé ativa, obediência e crescimento espiritual. Inclui disciplinas espirituais: oração, leitura bíblica, jejum, comunhão, serviço e testemunho. Tomás de Kempis, em 'Imitação de Cristo', enfatizou a humildade e a devoção interior. Bonhoeffer alertou contra a 'graça barata' — a ilusão de que a salvação não exige transformação radical. O discipulado é o processo de aprender de Cristo e seguir seus passos. A santidade prática não é legalismo (salvação por obras), mas a manifestação necessária da fé viva. A vida cristã é vivida em comunidade, na igreja local, com os meios da graça.",
    objecoes: [
      {
        objecao: "A vida cristã é impossível de viver — sou fraco demais.",
        resposta: "A vida cristã não é vivida por força própria, mas pelo poder do Espírito Santo que habita no crente. Deus não nos chama para o que Ele não nos capacita. A graça é suficiente e o poder de Deus aperfeiçoa-se na fraqueza (2 Coríntios 12:9). O crescimento é progressivo, não instantâneo."
      }
    ],
    citacoesPatristicas: [
      {
        autor: "Gregório de Nissa",
        citacao: "A vida cristã é uma contínua ascensão, onde cada degrau alcançado revela novos horizontes de santidade."
      }
    ],
    topicosRelacionados: ["santificacao", "adoracao", "fruto-espirito"]
  },
  {
    id: "teologia-propria-deus-pai",
    nome: "Deus Pai — A Primeira Pessoa da Trindade",
    categoria: "deus",
    descricao: "A pessoa do Pai como fonte e origem da divindade",
    fundamento: "Para nós, todavia, há um só Deus, o Pai, de quem são todas as coisas e para quem existimos",
    versiculosChave: [
      "1 Coríntios 8:6",
      "João 6:27",
      "Efésios 4:6",
      "Mateus 6:9",
      "Romanos 8:14-15"
    ],
    autoridadesTeologicas: ["Atanásio de Alexandria", "Agostinho de Hipona"],
    detalhe: "Deus Pai é a primeira pessoa da Trindade, o princípio sem princípio (agennetos), que gera o Filho eternamente e, juntamente com o Filho, espira o Espírito Santo. As Escrituras revelam Deus como Pai em três sentidos: Pai de nosso Senhor Jesus Cristo (relação trinitária), Pai dos crentes (relação adotiva) e Pai da criação (relação criacional). A paternidade de Deus é fonte de toda paternidade na terra (Efésios 3:14-15). Jesus ensinou os discípulos a dirigirem-se a Deus como 'Pai nosso' (Abba), indicando intimidade e confiança. O Pai é o autor da eleição, o planejador da redenção e o destinatário final da glória.",
    topicosRelacionados: ["trindade", "teologia-propria", "adoracao"]
  },
  {
    id: "adoracao-angelica",
    nome: "Adoração Angélica e Liturgia Celestial",
    categoria: "angelologia",
    descricao: "A adoração contínua dos anjos diante do trono de Deus",
    fundamento: "E os quatro seres viventes, tendo cada um deles seis asas, estão cheios de olhos ao redor e por dentro; e não têm descanso, nem de dia nem de noite, proclamando: Santo, santo, santo é o Senhor Deus, o Todo-Poderoso",
    versiculosChave: [
      "Apocalipse 4:8-11",
      "Isaías 6:1-4",
      "Salmo 148:1-2",
      "Neemias 9:6",
      "Apocalipse 5:11-14"
    ],
    autoridadesTeologicas: ["Pseudo-Dionísio", "Tomás de Aquino"],
    detalhe: "A adoração angélica é o modelo supremo de adoração, na qual os anjos e seres celestiais rendem louvor perpétuo a Deus. O livro de Apocalipse descreve a liturgia celestial: os quatro seres viventes (serafins), os vinte e quatro anciãos e miríades de anjos proclamam a santidade, glória e dignidade de Deus e do Cordeiro. A adoração terrena da igreja é uma participação antecipada nesta liturgia celestial. Pseudo-Dionísio, o Areopagita, descreveu as hierarquias celestes e seu papel na mediação da iluminação divina. O Sanctus ('Santo, santo, santo') da liturgia eucarística conecta a adoração terrena com a celestial.",
    topicosRelacionados: ["angelologia", "adoracao", "anjos-bons"]
  },
  {
    id: "estado-humilde-cristo",
    nome: "Estado de Humilhação de Cristo",
    categoria: "cristo",
    descricao: "O rebaixamento voluntário de Cristo da glória à humilhação",
    fundamento: "Antes, a si mesmo se esvaziou, assumindo a forma de servo, tornando-se em semelhança de homens; e, reconhecido em figura humana, a si mesmo se humilhou, tornando-se obediente até à morte, e morte de cruz",
    versiculosChave: [
      "Filipenses 2:6-8",
      "2 Coríntios 8:9",
      "João 1:14",
      "Lucas 2:7",
      "Mateus 27:46"
    ],
    autoridadesTeologicas: ["Tomás de Aquino", "Martinho Lutero"],
    detalhe: "O estado de humilhação de Cristo é o período desde sua encarnação até sua morte e sepultamento, no qual Ele voluntariamente abriu mão das prerrogativas de sua glória divina. Inclui seu nascimento humilde, sujeição à lei, sofrimento, tentação, solidão, rejeição e morte. A kenosis (esvaziamento de Filipenses 2) não significa que Cristo deixou de ser Deus, mas que Ele ocultou sua glória e assumiu a forma de servo. Lutero desenvolveu a teologia da cruz (theologia crucis), que reconhece Deus escondido no sofrimento. A humilhação de Cristo é o padrão para a vida cristã: 'tende em vós o mesmo sentimento que houve em Cristo Jesus'.",
    topicosRelacionados: ["cristologia", "encarnacao", "expiacao"]
  },
  {
    id: "milagres-cristo",
    nome: "Milagres de Cristo como Sinais do Reino",
    categoria: "cristo",
    descricao: "Os milagres de Jesus como demonstrações do poder do Reino de Deus",
    fundamento: "Homens israelitas, atendei a estas palavras: Jesus, o Nazareno, homem aprovado por Deus diante de vós com milagres, prodígios e sinais, os quais Deus realizou por intermédio dele entre vós",
    versiculosChave: [
      "Atos 2:22",
      "João 20:30-31",
      "Mateus 11:2-6",
      "João 2:11",
      "Lucas 7:18-23"
    ],
    autoridadesTeologicas: ["Agostinho de Hipona", "C. S. Lewis"],
    detalhe: "Os milagres de Cristo não são meras demonstrações de poder, mas sinais que apontam para a identidade de Jesus e a chegada do Reino de Deus. O evangelho de João os chama de 'sinais' (semeia) que revelam a glória de Cristo e provocam fé. Os milagres incluem curas, exorcismos, poder sobre a natureza (acalmar a tempestade, multiplicar pães), ressurreição de mortos e domínio sobre forças espirituais. C. S. Lewis, em 'Milagres', argumentou que os milagres de Cristo não violam as leis da natureza, mas são a intrusão do Criador que renova a ordem natural. Os milagres autenticam a mensagem de Cristo e demonstram a derrota do pecado, da doença e da morte.",
    topicosRelacionados: ["cristologia", "reino-deus", "pneumatologia"]
  },
  {
    id: "reino-deus",
    nome: "Reino de Deus — Soberania Escatológica",
    categoria: "futuro",
    descricao: "O domínio real de Deus já inaugurado e ainda não consumado",
    fundamento: "O tempo está cumprido, e o reino de Deus está próximo; arrependei-vos e crede no evangelho",
    versiculosChave: [
      "Marcos 1:15",
      "Mateus 6:9-10",
      "Romanos 14:17",
      "Apocalipse 11:15",
      "Lucas 17:20-21"
    ],
    autoridadesTeologicas: ["George Ladd", "N. T. Wright"],
    detalhe: "O Reino de Deus (basileia tou theou) é o tema central da pregação de Jesus, referindo-se ao domínio dinâmico de Deus sobre seu povo e sobre toda a criação. A teologia do 'já e ainda não' (inaugurada mas não consumada) descreve a tensão escatológica: o Reino foi inaugurado na primeira vinda de Cristo (presente) mas será consumado na segunda vinda (futuro). O Reino não é equivalente à igreja (que é sua comunidade visível), nem a uma utopia política. O Reino manifesta-se onde quer que a vontade de Deus é feita. Os milagres de Jesus são sinais do Reino. A entrada no Reino requer novo nascimento (João 3:3).",
    topicosRelacionados: ["escatologia", "milênio", "vida-crista", "missiologia"]
  },
  {
    id: "criacao",
    nome: "Criação — Origem do Universo",
    categoria: "deus",
    descricao: "O ato trinitário de Deus de criar o universo do nada",
    fundamento: "No princípio, criou Deus os céus e a terra",
    versiculosChave: [
      "Gênesis 1:1-31",
      "João 1:1-3",
      "Salmo 33:6-9",
      "Colossenses 1:15-16",
      "Hebreus 11:3"
    ],
    autoridadesTeologicas: ["Basílio Magno", "Agostinho de Hipona", "João Calvino"],
    detalhe: "A criação é o ato livre e soberano de Deus, que trouxe o universo à existência do nada (creatio ex nihilo). Deus não criou por necessidade ou para suprir alguma deficiência, mas para manifestar sua glória e bondade. A criação é trinitária: o Pai cria por meio do Filho e pelo Espírito Santo. A criação foi declarada 'muito boa' por Deus, indicando sua perfeição original. As interpretações dos dias de Gênesis incluem: literal 24 horas, dia-era (cada dia representa uma era), estrutura literária (quadro de seis dias como artifício literário) e o criacionismo evolutivo (Deus guiou processos evolutivos). A criação é distinta de Deus porém dependente Dele.",
    topicosRelacionados: ["teologia-propria", "antropologia-biblica", "providencia"]
  }
];

export const CATEGORIAS: { id: string; nome: string; cor: string; descricao: string }[] = [
  { id: "revelacao", nome: "Revelação", cor: "#3b82f6", descricao: "Como Deus se revela à humanidade" },
  { id: "deus", nome: "Deus", cor: "#8b5cf6", descricao: "A natureza e atributos de Deus" },
  { id: "cristo", nome: "Cristo", cor: "#ec4899", descricao: "A pessoa e obra de Jesus Cristo" },
  { id: "espirito", nome: "Espírito Santo", cor: "#06b6d4", descricao: "A terceira pessoa da Trindade" },
  { id: "salvacao", nome: "Salvação", cor: "#10b981", descricao: "O plano da redenção" },
  { id: "igreja", nome: "Igreja", cor: "#f59e0b", descricao: "O Corpo de Cristo" },
  { id: "futuro", nome: "Escatologia", cor: "#ef4444", descricao: "As últimas coisas" },
  { id: "antropologia", nome: "Homem e Pecado", cor: "#6366f1", descricao: "A natureza humana e o pecado" },
  { id: "angelologia", nome: "Anjos e Demônios", cor: "#f97316", descricao: "Seres espirituais" },
];
