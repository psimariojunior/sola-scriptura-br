import type { Curso } from './cursos';

export const CURSO_TEOLOGIA_SISTEMATICA: Curso = {
  id: 'teologia-sistematica',
  título: 'Teologia Sistemática: As Grandes Doutrinas da Fé',
  descrição: 'Curso introdutório às grandes doutrinas cristãs (Deus, Cristo, salvação, igreja). Uma aula por tema + avaliação. Não é seminário nem carga horária.',
  instrutor: 'Sola Scriptura',
  duração: 'Introdução',
  nível: 'iniciante',
  categoria: 'Teologia',
  certificado: true,
  módulos: [
    {
      id: 'mod-teo-biblio',
      título: 'Teologia Bíblica',
      descrição: 'Unidade e progressão das Escrituras',
      ícone: '📖',
      aulas: [
        {
          id: 'aula-teo-1-1',
          título: 'Revelação Geral e Especial',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: '## Revelação Geral e Especial\n\nA teologia começa com a pergunta: como conhecemos Deus? A resposta bíblica é dupla: através da revelação geral e da revelação especial.\n\n### Revelação Geral\n\nDeus se revela através da criação: "Porque os atributos invisíveis de Deus, desde a criação do mundo, se veem claramente, sendo percebidos pelas coisas que foram feitas" (Romanos 1:20). A criação testifica da existência, poder e natureza divina.\n\nMas a revelação geral é insuficiente para a salvação. Ela deixa os homens "sem desculpa" (Romanos 1:20), mas não os salvos.\n\n### Revelação Especial\n\nDeus se revelou especialmente através de:\n\n1. **As Escrituras** — a Palavra escrita, infalível e inerrante\n2. **Cristo** — a Palavra viva (João 1:1-14)\n3. **O Espírito Santo** — que ilumina as Escrituras e regenera o coração\n\nA Escritura é a norma suprema de toda a fé e prática. É "lâmpada para os meus pés e luz para o meu caminho" (Salmo 119:105).\n\n### Aplicação\n\nNão podemos conhecer Deus além do que Ele se revelou. Speculações teológicas que vão além da Escritura são perigosas. A humildade epistemológica é essencial.',
          versículosChave: [
            { ref: 'Romanos 1:20', texto: 'Os atributos invisíveis de Deus se veem claramente desde a criação do mundo.' },
            { ref: '2 Timóteo 3:16', texto: 'Toda Escritura é inspirada por Deus e útil para ensinar.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-deus',
      título: 'A Teologia de Deus',
      descrição: 'Monoteísmo, Trindade, atributos divinos',
      ícone: '✝️',
      aulas: [
        {
          id: 'aula-teo-2-1',
          título: 'O Deus Triúno',
          tipo: 'texto',
          duração: '14 min',
          conteúdo: '## O Deus Triúno\n\nA Trindade é o mistério central da fé cristã. Um Deus em três Pessoas — Pai, Filho e Espírito Santo. Não três deuses, não uma pessoa em três modos.\n\n### As bases bíblicas\n\n**Deus é um**: "Ouve, Israel: O Senhor é o nosso Deus, o Senhor é um" (Deuteronômio 6:4).\n\n**Três Pessoas distintas:**\n- **O Pai** é Deus (1 Coríntios 8:6)\n- **O Filho** é Deus (João 1:1, 20:28)\n- **O Espírito Santo** é Deus (Atos 5:3-4)\n\n**As três Pessoas estão na Bíblia juntas:**\n- Batismo de Jesus (Mateus 3:16-17)\n- Grande Comissão (Mateus 28:19)\n- Bênção paulina (2 Coríntios 13:14)\n\n### Por que a Trindade importa?\n\n1. **Relacionamento eterno**: Deus não precisou criar para ter comunhão\n2. **Salvação**: O Pai planeja, o Filho executa, o Espírito aplica\n3. **Adoração**: Adoramos o Pai através do Filho, pelo Espírito\n\n### Aplicação\n\nA Trindade não é um puzzle lógico — é um mistério para adorar. Quando oramos, o Pai nos ouve, o Filho intercede e o Espírito nos guia.',
          versículosChave: [
            { ref: 'Deuteronômio 6:4', texto: 'O Senhor é o nosso Deus, o Senhor é um.' },
            { ref: 'Mateus 28:19', texto: 'Batizando-os em nome do Pai, do Filho e do Espírito Santo.' },
            { ref: '2 Coríntios 13:14', texto: 'A graça do Senhor Jesus Cristo, o amor de Deus e a comunhão do Espírito Santo.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-cristo',
      título: 'A Pessoa de Cristo',
      descrição: 'Humanidade, divindade, ofícios de Cristo',
      ícone: '🐑',
      aulas: [
        {
          id: 'aula-teo-3-1',
          título: 'Cristo: Deus e Homem',
          tipo: 'texto',
          duração: '14 min',
          conteúdo: '## Cristo: Deus e Homem\n\nJesus Cristo é completamente Deus e completamente homem. Esta é a doutrina da hipóstática união — duas naturezas em uma pessoa.\n\n### A divindade de Cristo\n\n- "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus" (João 1:1)\n- Tomé o chama: "Meu Senhor e meu Deus!" (João 20:28)\n- Cristo aceita adoração (Mateus 14:33, 28:9)\n- Perdoa pecados (Marcos 2:5-7)\n- Existe eternamente: "Antes que Abraão existisse, Eu sou" (João 8:58)\n\n### A humanidade de Cristo\n\n- Nasceu de mulher (Gálatas 4:4)\n- Cresceu em sabedoria (Lucas 2:52)\n- Sentiu fome, sede, cansaço, tristeza\n- Morreu (Mateus 27:50)\n- Ressuscitou com um corpo (Lucas 24:39)\n\n### Por que a dupla natureza?\n\n1. **Somente Deus** pode resgatar um valor infinito\n2. **Somente homem** pode morrer pelos homens\n3. **Somente Deus-homem** pode ser mediador entre Deus e os homens\n\n### Os ofícios de Cristo\n\n1. **Profeta**: Revela a vontade de Deus\n2. **Sacerdote**: Oferece sacrifício e intercede\n3. **Rei**: Governa com autoridade\n\n### Aplicação\n\nCristo é nosso Profeta, Sacerdote e Rei. Ele é tudo o que precisamos.',
          versículosChave: [
            { ref: 'João 1:1', texto: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
            { ref: 'João 1:14', texto: 'E o Verbo se fez carne e habitou entre nós.' },
            { ref: 'Hebreus 4:15', texto: 'Não temos um sumo sacerdote que não possa compadecer-se das nossas fraquezas.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-espirito',
      título: 'O Espírito Santo',
      descrição: 'Pessoa, ministérios e frutos do Espírito',
      ícone: '🕊️',
      aulas: [
        {
          id: 'aula-teo-4-1',
          título: 'A Pessoa e a Obra do Espírito Santo',
          tipo: 'texto',
          duração: '14 min',
          conteúdo: '## A Pessoa e a Obra do Espírito Santo\n\nO Espírito Santo é a Pessoa da Trindade mais frequentemente negligenciada, mas é essencial para toda a vida cristã.\n\n### O Espírito é Pessoa\n\nO Espírito não é uma força impersonal — é uma Pessoa divina:\n- Pode ser entristecido (Efésios 4:30)\n- Ensina e lembra (João 14:26)\n- Testifica (Romanos 8:16)\n- Intercede (Romanos 8:26)\n- Fala e guia (Atos 13:2)\n- Tem vontade própria (1 Coríntios 12:11)\n\n### Os ministérios do Espírito\n\n1. **Regeneração**: Nascer de novo (João 3:5-6)\n2. **Batismo**: Incorporação ao corpo de Cristo (1 Coríntios 12:13)\n3. **Habitação**: Presença interior em todo crente (Romanos 8:9)\n4. **Santificação**: Processo de mudança (2 Coríntios 3:18)\n5. **Iluminação**: Entendimento das Escrituras (1 Coríntios 2:10-12)\n6. **Dons espirituais**: Capacitação para serviço (1 Coríntios 12:4-11)\n7. **Guia**: Direcionamento na vida (Gálatas 5:16)\n8. **Intercessão**: Oração por nós (Romanos 8:26-27)\n\n### O fruto do Espírito\n\n"O fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança" (Gálatas 5:22-23). Nota: é "fruto" (singular) — não frutos.\n\n### Aplicação\n\nO Espírito Santo é o agente de Deus em nós. Sem Ele, não há vida cristã.',
          versículosChave: [
            { ref: 'Gálatas 5:22-23', texto: 'O fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança.' },
            { ref: 'Efésios 5:18', texto: 'Enchei-vos do Espírito.' },
            { ref: 'João 14:26', texto: 'O Espírito Santo vos ensinará todas as coisas.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-salvacao',
      título: 'A Salvação',
      descrição: 'Eleição, expiação, justificação, regeneração, santificação',
      ícone: '⚖️',
      aulas: [
        {
          id: 'aula-teo-5-1',
          título: 'Os Momentos da Salvação',
          tipo: 'texto',
          duração: '16 min',
          conteúdo: '## Os Momentos da Salvação\n\nA salvação é o tema central da Bíblia. É um processo que inclui passado, presente e futuro.\n\n### Passado: Justificação\n\n"Justificados gratuitamente pela sua graça, pela redenção que há em Cristo Jesus" (Romanos 3:24). Justificação é a declaração judicial de que somos justos diante de Deus.\n\n**Momentos:**\n1. **Eleição**: Deus nos escolheu em Cristo antes da fundação do mundo (Efésios 1:4)\n2. **Chamado**: O evangelho nos chama (Romanos 8:30)\n3. **Regeneração**: Nascer de novo (João 3:3)\n4. **Fé**: Crer em Cristo (Efésios 2:8)\n5. **Justificação**: Declarados justos (Romanos 5:1)\n\n### Presente: Santificação\n\n"Sanctificados em Cristo Jesus, chamados para serdes santos" (1 Coríntios 1:2). Santificação é o processo de sermos transformados à imagem de Cristo.\n\n### Futuro: Glorificação\n\n"Os que antes ele conheceu, também os predestinou... e os que justificou, também glorificou" (Romanos 8:29-30).\n\n### A segurança da salvação\n\n"Não nos poderá separar do amor de Deus, que está em Cristo Jesus" (Romanos 8:38-39). A segurança depende da fidelidade de Deus.\n\n### Aplicação\n\nA salvação não é apenas um passe para o céu — é uma transformação completa.',
          versículosChave: [
            { ref: 'Romanos 3:24', texto: 'Justificados gratuitamente pela sua graça.' },
            { ref: 'Efésios 2:8', texto: 'Pela graça sois salvos, por meio da fé.' },
            { ref: 'Filipenses 1:6', texto: 'Deus há de completar a boa obra até ao dia de Cristo Jesus.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-igreja',
      título: 'A Igreja',
      descrição: 'Natureza, governo, sacramentos, missão',
      ícone: '⛪',
      aulas: [
        {
          id: 'aula-teo-6-1',
          título: 'A Natureza da Igreja',
          tipo: 'texto',
          duração: '14 min',
          conteúdo: '## A Natureza da Igreja\n\nA palavra grega "ekklésia" significa "assembleia chamada". A igreja não é um prédio — é um povo.\n\n### Igreja visível e invisível\n\n**Invisível**: Todos os crentes verdadeiros, conhecidos apenas por Deus.\n**Visível**: A comunidade local que se reúne para adorar.\n\n### Os sacramentos\n\n**Batismo**: Imersão na água como sinal de união com Cristo.\n**Ceia do Senhor**: Partir do pão e beber do cálice em memória de Cristo.\n\n### A missão da igreja\n\n"Ide, fazei discípulos de todas as nações, batizando-os e ensinando-os" (Mateus 28:19-20).\n\n### Aplicação\n\nA igreja é a família de Deus, o corpo de Cristo, a noiva do Cordeiro.',
          versículosChave: [
            { ref: 'Atos 2:42', texto: 'Era firme no ensino dos apóstolos, na comunhão, na fração do pão e nas orações.' },
            { ref: 'Mateus 28:19-20', texto: 'Ide, fazei discípulos de todas as nações.' },
            { ref: 'Efésios 5:25', texto: 'Cristo amou a igreja e a si mesmo se entregou por ela.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-angelologia',
      título: 'Angelologia e Demonologia',
      descrição: 'Anjos, demônios, Satanás',
      ícone: '👼',
      aulas: [
        {
          id: 'aula-teo-7-1',
          título: 'Anjos e Demônios',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: '## Anjos e Demônios\n\nA Bíblia apresenta um mundo espiritual invisível que interfere no mundo visível.\n\n### Os Anjos\n\n**Funções:**\n1. **Adoração**: "Santo, santo, santo é o Senhor dos Exércitos"\n2. **Proteção**: "Ele ordenará aos seus anjos que te guardem"\n3. **Mensagem**: Gabriel traz anúncios\n4. **Ministério**: "Os anjos são todos espíritos ministradores"\n\n### Os Demônios\n\nAnjos caídos que seguiram Satanás. Atividades: engano, acusação, possessão, doutrinas falsas.\n\n### A batalha espiritual\n\n"A nossa luta não é contra a carne e o sangue, mas contra os principados e potestades" (Efésios 6:12).\n\n### Aplicação\n\nNão devemos ter medo — Cristo venceu. Devemos ser sobrios e vigilantes.',
          versículosChave: [
            { ref: 'Hebreus 1:14', texto: 'Todos não são espíritos ministradores?' },
            { ref: 'Efésios 6:12', texto: 'A nossa luta é contra os principados e potestades.' },
            { ref: '1 Pedro 5:8', texto: 'O vosso adversário anda rugindo.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-antropologia',
      título: 'Antropologia',
      descrição: 'Natureza humana, pecado original, consciência',
      ícone: '🪞',
      aulas: [
        {
          id: 'aula-teo-8-1',
          título: 'A Natureza Humana e o Pecado',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: '## A Natureza Humana e o Pecado\n\nSomos criados à imagem de Deus, mas caídos em pecado.\n\n### A imagem de Deus\n\n"Façamos o homem à nossa imagem" (Gênesis 1:26). A "imago Dei" inclui:\n1. **Racionalidade**\n2. **Moralidade**\n3. **Relacionalidade**\n4. **Criatividade**\n5. **Liberdade**\n\n### O pecado original\n\n"Pelo pecado entrou a morte, e pela morte passou a todos os homens" (Romanos 5:12).\n\nTodos nascemos pecadores — não por imitação, mas por natureza.\n\n### Aplicação\n\nReconhecer a depravação total não é pessimismo — é realismo. E torna a graça necessária e gloriosa.',
          versículosChave: [
            { ref: 'Gênesis 1:27', texto: 'Deus criou o homem à sua imagem.' },
            { ref: 'Romanos 5:12', texto: 'Pelo pecado entrou a morte, e pela morte passou a todos.' },
            { ref: 'Romanos 3:23', texto: 'Todos pecaram e estão destituídos da glória de Deus.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-escatologia',
      título: 'Escatologia',
      descrição: 'Fim das coisas, céu, inferno, novos céus e nova terra',
      ícone: '⏳',
      aulas: [
        {
          id: 'aula-teo-9-1',
          título: 'O Fim das Coisas',
          tipo: 'texto',
          duração: '14 min',
          conteúdo: '## O Fim das Coisas\n\n### A segunda vinda de Cristo\n\n"Assim como Cristo ressuscitou dos mortos, assim também os que dormem em Cristo ressuscitarão primeiro" (1 Tessalonicenses 4:14-17).\n\n### A ressurreição\n\n"É necessário que este corruptível se vista da incorruptibilidade" (1 Coríntios 15:53).\n\n### O juízo\n\n"Haverá uma ressurreição dos justos e dos injustos" (Atos 24:15).\n\n### O céu\n\n"Deus enxugará toda lágrima dos seus olhos" (Apocalipse 21:4). É:\n1. **Presença de Deus**\n2. **Comunhão perfeita**\n3. **Nova criação**\n\n### O inferno\n\nSeparação eterna de Deus. Deus não quer que ninguém pereça, mas respeita a liberdade humana.\n\n### A nova criação\n\n"Vi um novo céu e uma nova terra" (Apocalipse 21:1). Renovação total.\n\n### Aplicação\n\nA escatologia não é curiosidade — é esperança.',
          versículosChave: [
            { ref: '1 Tessalonicenses 4:16-17', texto: 'Seremos arrebatados para estar com o Senhor.' },
            { ref: 'Apocalipse 21:4', texto: 'Enxugará toda lágrima; a morte não haverá mais.' },
            { ref: '1 Coríntios 15:42-44', texto: 'Assim é a ressurreição dos mortos.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-bibliologia',
      título: 'Bibliologia',
      descrição: 'Inspiração, inerrância, autoridade da Bíblia',
      ícone: '📜',
      aulas: [
        {
          id: 'aula-teo-10-1',
          título: 'A Palavra de Deus',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: '## A Palavra de Deus\n\n### Inspiração\n\n"Toda Escritura é inspirada por Deus" (2 Timóteo 3:16). A Bíblia é Palavra de Deus através de palavras humanas.\n\n### Inerrância\n\nA Bíblia não contém erros no que afirma. "A Palavra do Senhor é reta" (Salmo 12:6).\n\n### Autoridade\n\nA Bíblia é a autoridade suprema em:\n1. **Fé**: O que devemos crer\n2. **Prática**: O que devemos fazer\n3. **Salvação**: Como sermos salvos\n\n### Aplicação\n\nA Bíblia não é um livro de fatos — é um livro para ser vivido.',
          versículosChave: [
            { ref: '2 Timóteo 3:16', texto: 'Toda Escritura é inspirada por Deus e útil para ensinar.' },
            { ref: 'Salmo 119:105', texto: 'Lâmpada para os meus pés é tua Palavra.' },
            { ref: '2 Pedro 1:21', texto: 'Homens santos falaram da parte de Deus, movidos pelo Espírito.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-graca',
      título: 'A Graça de Deus',
      descrição: 'Tipos de graça, graça eficaz, graça suficiente',
      ícone: '💧',
      aulas: [
        {
          id: 'aula-teo-11-1',
          título: 'A Graça de Deus',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: '## A Graça de Deus\n\nGraça é o favor imerecido de Deus.\n\n### Tipos de graça\n\n1. **Graça comum**: Compartilhada por todos\n2. **Graça eficaz**: Que regenera e transforma\n3. **Graça perseverante**: Que nos mantém até o fim\n4. **Graça santificadora**: Que nos torna mais como Cristo\n\n### A graça abundante\n\n"Onde o pecado abundou, superabundou a graça" (Romanos 5:20). A graça sempre é maior.\n\n### Aplicação\n\nViver pela graça é viver com gratidão, não com culpa.',
          versículosChave: [
            { ref: 'Efésios 2:8', texto: 'Pela graça sois salvos, por meio da fé; dom de Deus.' },
            { ref: 'Romanos 5:20', texto: 'Onde o pecado abundou, superabundou a graça.' },
            { ref: '2 Coríntios 12:9', texto: 'A minha graça é suficiente para ti.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-oracao',
      título: 'A Oração',
      descrição: 'Natureza da oração, intercessão, guerra espiritual',
      ícone: '🙏',
      aulas: [
        {
          id: 'aula-teo-12-1',
          título: 'A Oração na Vida Cristã',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: '## A Oração na Vida Cristã\n\nA oração é conversa filial com o Pai, pelo Filho, no Espírito — não um mecanismo para dobrar Deus. Jesus ensina a orar (Mt 6:5–15) e ora Ele mesmo (Lc 6:12; Jo 17).\n\n### O Pai Nosso (Mateus 6:9–13)\n\n1. **Adoração**: «Santificado seja o teu nome» — Deus é o centro, não o nosso projeto.\n2. **Reino**: «Venha o teu reino» — pedimos o governo de Deus, não o nosso.\n3. **Provisão**: «O pão nosso de cada dia» — dependência cotidiana, não acumulação ansiosa (cf. Mt 6:25–34).\n4. **Perdão**: «Perdoa-nos… como nós perdoamos» — a oração que recusa perdoar o irmão contradiz o próprio pedido (Mt 6:14–15).\n5. **Proteção**: «Não nos deixes cair em tentação» — humildade diante da carne e do Maligno.\n\n### Tipos na Escritura\n\nAdoração (Sl 95), confissão (Sl 51; 1 Jo 1:9), súplica (Fp 4:6), intercessão (1 Tm 2:1), ação de graças (1 Ts 5:18). «Orai sem cessar» (1 Ts 5:17) é persistência, não tagarelice.\n\n### O que a oração não é\n\nNão é mérito que compra resposta. Não é fórmula mágica. Jesus condena as «vãs repetições» (Mt 6:7). Tiago 4:3 adverte o pedido egoísta.\n\n### Aplicação\n\nOre o Pai Nosso com pausa. Confesse de fato. Interceda por nome. A oração acompanha a Palavra: quem não lê não sabe o que pedir segundo a vontade de Deus (1 Jo 5:14).',
          versículosChave: [
            { ref: 'Mateus 6:9-13', texto: 'Pai nosso que estás nos céus...' },
            { ref: 'Filipenses 4:6', texto: 'Em tudo sejam conhecidas as vossas petições.' },
            { ref: '1 Tessalonicenses 5:17', texto: 'Orai sem cessar.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-etica',
      título: 'Ética Cristã',
      descrição: 'Lei e graça, moralidade, decisões práticas',
      ícone: '⚖️',
      aulas: [
        {
          id: 'aula-teo-13-1',
          título: 'A Ética Cristã',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: '## A Ética Cristã\n\nToda a ética cristã se resume em amar a Deus de todo o coração e ao próximo como a si mesmo (Mt 22:37–40; Lv 19:18). Não é lista solta: nasce da graça que salva (Tt 2:11–12).\n\n### Lei e graça\n\nJesus não aboliu a Lei — cumpriu-a (Mt 5:17). A Lei acusa o pecado (Rm 3:20); a graça justifica e ensina a viver «sóbria, justa e piedosamente». Obedecemos porque fomos salvos, não para nos salvarmos (Ef 2:8–10).\n\n### Princípios\n\n1. **Soberania de Deus** — o bem é o que Deus ama (Mq 6:8).\n2. **Amor ao próximo** — recusa o mal (Rm 13:8–10).\n3. **Verdade** — não mentir (Ef 4:25).\n4. **Santidade** — o corpo como templo (1 Co 6:19–20).\n5. **Justiça** — defender o oprimido sem ódio (Is 1:17).\n\n### Liberdade\n\n«Para a liberdade foi que Cristo nos libertou» (Gl 5:1, 13). Liberdade não é desculpa para a carne: é serviço pelo amor.\n\n### Aplicação\n\nAntes de decidir, pergunte: isto ama a Deus e ao próximo? A ética cristã não é legalismo nem permissividade — é o fruto do Espírito (Gl 5:22–23).',
          versículosChave: [
            { ref: 'Mateus 22:37-39', texto: 'Ama o Senhor teu Deus... ama o teu próximo.' },
            { ref: 'Gálatas 5:13', texto: 'Para a liberdade Cristo nos libertou.' },
            { ref: 'Tito 2:11-12', texto: 'A graça ensina-nos a viver sóbria, justa e piedosa.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-quiz',
      título: 'Avaliação',
      descrição: 'Quiz de introdução às doutrinas — 70% para contar a aula',
      ícone: '🏆',
      aulas: [
        {
          id: 'aula-teo-quiz-final',
          título: 'Avaliação — Teologia sistemática (introdução)',
          tipo: 'quiz',
          duração: '12 min',
          perguntas: [
            {
              id: 'teo-q1',
              pergunta: 'Romanos 1:20 ensina que a criação:',
              opções: ['Salva quem contempla a natureza', 'Deixa o ser humano sem desculpa quanto ao poder de Deus', 'Substitui as Escrituras', 'Prova que todos os deuses são iguais'],
              respostaCorreta: 1,
              explicação: 'A revelação geral mostra o poder e a divindade de Deus, mas não salva; a salvação vem pela Palavra e pela fé em Cristo.',
            },
            {
              id: 'teo-q2',
              pergunta: 'Deuteronômio 6:4 («o Senhor é um») e Mateus 28:19 juntos afirmam:',
              opções: ['Três deuses', 'Um Deus em três Pessoas, confessado no batismo', 'Que o Espírito não é Deus', 'Que o Filho é só um profeta'],
              respostaCorreta: 1,
              explicação: 'O Shema afirma a unicidade; a fórmula batismal nomeia Pai, Filho e Espírito Santo.',
            },
            {
              id: 'teo-q3',
              pergunta: 'João 1:14 («o Verbo se fez carne») afirma principalmente:',
              opções: ['Que Jesus apenas parecia humano', 'A encarnação verdadeira do Filho', 'Que o Verbo deixou de ser Deus', 'Que Maria é co-redentora'],
              respostaCorreta: 1,
              explicação: 'O Verbo eterno assumiu humanidade verdadeira, sem deixar de ser Deus.',
            },
            {
              id: 'teo-q4',
              pergunta: 'Efésios 2:8–9 ensina que a salvação é:',
              opções: ['Salário das obras', 'Pela graça, mediante a fé, não de obras', 'Só para judeus', 'Incerteza até o juízo'],
              respostaCorreta: 1,
              explicação: 'A graça exclui o orgulho das obras como causa da justificação.',
            },
            {
              id: 'teo-q5',
              pergunta: '2 Timóteo 3:16 chama a Escritura de:',
              opções: ['Opinião antiga útil', 'Inspirada por Deus e útil para ensinar', 'Inferior à tradição posterior', 'Apenas o Novo Testamento'],
              respostaCorreta: 1,
              explicação: 'theopneustos: soprada por Deus; o texto serve ao ensino e à correção.',
            },
            {
              id: 'teo-q6',
              pergunta: 'Mateus 6:9–13 (Pai Nosso) começa com:',
              opções: ['Lista de milagres', 'O nome e o reino de Deus, não o eu', 'Promessa de riqueza', 'Condenação dos fariseus'],
              respostaCorreta: 1,
              explicação: 'A oração modelo prioriza o nome, o reino e a vontade do Pai.',
            },
            {
              id: 'teo-q7',
              pergunta: 'Mateus 22:37–39 resume a ética em:',
              opções: ['Jejuar três vezes por semana', 'Amar a Deus e ao próximo', 'Separar-se de todo contato social', 'Guardar só o sábado'],
              respostaCorreta: 1,
              explicação: 'Os dois mandamentos sustentam a Lei e os Profetas.',
            },
            {
              id: 'teo-q8',
              pergunta: 'Atos 5:3–4, ao tratar da mentira de Ananias, identifica o Espírito Santo como:',
              opções: ['Força impessoal', 'Deus a quem se pode mentir', 'Um anjo', 'A memória da igreja'],
              respostaCorreta: 1,
              explicação: 'Mentir ao Espírito é mentir a Deus: o Espírito é Pessoa divina.',
            },
            {
              id: 'teo-q9',
              pergunta: 'Tito 2:11–12 diz que a graça:',
              opções: ['Dispensa a obediência', 'Ensina a viver sóbria, justa e piedosamente', 'Acaba com o sofrimento agora', 'Substitui a Escritura'],
              respostaCorreta: 1,
              explicação: 'A graça que salva também educa a conduta.',
            },
            {
              id: 'teo-q10',
              pergunta: 'Este curso, neste site, é:',
              opções: ['Diploma de seminário com carga horária', 'Introdução às doutrinas, com aulas e quiz na plataforma', 'Equivalência acadêmica', 'Ordenação ministerial'],
              respostaCorreta: 1,
              explicação: 'O certificado atesta a conclusão introdutória nesta plataforma, não um grau.',
            },
          ],
        },
      ],
    },
  ],
};
