/**
 * Script para expandir estudos teológicos - Lote 2
 */

import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const filePath = join(process.cwd(), 'src/data/estudosTeologicosExpandidos.ts');
const content = readFileSync(filePath, 'utf-8');

const existingIds = new Set();
const idMatches = content.matchAll(/id:\s*'([^']+)'/g);
for (const match of idMatches) {
  existingIds.add(match[1]);
}

console.log(`Estudos existentes: ${existingIds.size}`);

const newStudies = [
  // ═══ MAIS PNEUMATOLOGIA ═══
  {
    id: 'pn-011',
    titulo: 'O Espírito Santo na Ressurreição de Cristo',
    categoria: 'Pneumatologia',
    subcategoria: 'Cristologia',
    conteudo: [
      'O Espírito Santo foi instrumental na ressurreição de Jesus dos mortos.',
      'Romanos 8:11 afirma que "o Espírito de Deus, que ressuscitou a Jesus dentre os mortos, habita em vocês".',
      'A ressurreição é ato da Trindade: Pai ressuscita o Filho pelo Espírito.',
      'O mesmo poder que ressuscitou Cristo está disponível para os crentes.',
      'A ressurreição é a base da nossa justificação (Romanos 4:25) e esperança.',
    ],
    versicosChave: ['Romanos 8:11', 'Romanos 4:25', 'Atos 2:24', '1 Coríntios 15:45'],
    tags: ['ressurreição', 'poder', 'esperança', 'cristologia'],
    fontes: ['Fee, God\'s Empowering Presence', 'Moo, The Epistle to the Romans'],
  },
  {
    id: 'pn-012',
    titulo: 'A Galardão do Espírito Santo na Oração',
    categoria: 'Pneumatologia',
    subcategoria: 'Oração',
    conteudo: [
      'O Espírito Santo nos capacita a orar de acordo com a vontade de Deus.',
      'Efésios 6:18 ordena "orando em todo tempo no Espírito".',
      'A oração no Espírito não é necessariamente em línguas, mas com dependência e fervor.',
      'O Espírito nos dá palavras quando não sabemos como orar.',
      'A oração no Espírito é uma oração que se alinha com o caráter e vontade de Deus.',
    ],
    versicosChave: ['Efésios 6:18', 'Judas 1:20', 'Romanos 8:26-27', 'Zacarias 12:10'],
    tags: ['oração', 'espírito santo', 'vontade de deus', 'fervor'],
    fontes: ['Moo, The Epistle to the Ephesios', 'Packer, Keep in Step with the Spirit'],
  },
  {
    id: 'pn-013',
    titulo: 'Os Sete Espíritos de Deus (Apocalipse)',
    categoria: 'Pneumatologia',
    subcategoria: 'Simbolismo',
    conteudo: [
      'Apocalipse menciona "os sete espíritos de Deus" (Apocalipse 1:4, 4:5, 5:6).',
      'O número sete representa completude — o Espírito Santo em Sua plenitude.',
      'Isaías 11:2 descreve sete manifestações do Espírito sobre o Messias.',
      'Os sete espíritos podem representar as sete faculdades do Espírito: sabedoria, entendimento, conselho, fortaleza, conhecimento, piedade, temor do Senhor.',
      'A vela de sete pavios no candelabro de Apocalipse 4:5 representa o Espírito em plenitude.',
    ],
    versicosChave: ['Apocalipse 1:4', 'Apocalipse 4:5', 'Apocalipse 5:6', 'Isaías 11:2'],
    tags: ['sete espíritos', 'apocalipse', 'plenitude', 'simbolismo'],
    fontes: ['Beale, The Book of Revelation', 'Aune, Revelation 1-5'],
  },
  {
    id: 'pn-014',
    titulo: 'O Espírito Santo e os Sacramentos',
    categoria: 'Pneumatologia',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'O Espírito Santo é o agente que opera nos sacramentos/batismo e ceia.',
      'No batismo, o Espírito nos une a Cristo e selamos para o dia da redenção.',
      'Na ceia, o Espírito nos comunica a presença espiritual de Cristo.',
      'Os sacramentos são eficazes não pela água ou pão, mas pela obra do Espírito.',
      'A ceia é um meio de graça onde o Espírito nourishes os crentes.',
    ],
    versicosChave: ['1 Coríntios 12:13', '1 Coríntios 10:16-17', 'Efésios 5:18-20', 'Romanos 6:3-4'],
    tags: ['sacramentos', 'batismo', 'ceia', 'graça'],
    fontes: ['Calvino, Institutas IV.17', 'Calvin, Institutes', 'Calvin, Institutes IV.17'],
  },
  {
    id: 'pn-015',
    titulo: 'O Espírito Santo na Vida da Igreja',
    categoria: 'Pneumatologia',
    subcategoria: 'Eclesiologia',
    conteudo: [
      'A Igreja nasceu no dia de Pentecostes quando o Espírito Santo desceu (Atos 2).',
      'O Espírito distribui dons para edificação da igreja (1 Coríntios 12:4-11).',
      'O Espírito guia a igreja em verdade (João 16:13).',
      'O Espírito sustenta a unidade da igreja (Efésios 4:3).',
      'Sem o Espírito, a igreja é apenas uma organização humana.',
    ],
    versicosChave: ['Atos 2:1-4', '1 Coríntios 12:4-11', 'João 16:13', 'Efésios 4:3'],
    tags: ['igreja', 'pentecostes', 'dons', 'unidade'],
    fontes: ['Calvino, Institutas IV.3', 'Ridderbos, The Coming of the Kingdom'],
  },

  // ═══ MAIS ANGELOLOGIA ═══
  {
    id: 'an-006',
    titulo: 'Miguel — O Arcanjo Guerreiro',
    categoria: 'Angelologia',
    subcategoria: 'Anjos Especiais',
    conteudo: [
      'Miguel é o único anjo chamado de "arcanjo" na Bíblia (Judas 1:9).',
      'Seu nome significa "Quem é como Deus?" — uma declaração de humildade.',
      'Miguel é retratado como guerreiro que combate Satanás e seus anjos.',
      'Daniel 10-12 mostra Miguel como protetor de Israel.',
      'Apocalipse 12:7 descreve Miguel liderando a batalha contra o dragão.',
    ],
    versicosChave: ['Judas 1:9', 'Daniel 10:13', 'Daniel 12:1', 'Apocalipse 12:7'],
    tags: ['miguel', 'arcanjo', 'guerreiro', 'protetor'],
    fontes: ['Calvino, Comentário a Daniel', 'Bauckham, The Fate of the Dead'],
  },
  {
    id: 'an-007',
    titulo: 'Gabriel — O Mensageiro de Deus',
    categoria: 'Angelologia',
    subcategoria: 'Anjos Especiais',
    conteudo: [
      'Gabriel é o anjo mensageiro que comunicou planos importantes de Deus.',
      'Seu nome significa "Deus é meu guerreiro".',
      'Gabriel apareceu a Daniel para revelar o plano profético (Daniel 8:16).',
      'Gabriel anunciou o nascimento de João Batista (Lucas 1:19) e de Jesus (Lucas 1:26-38).',
      'Gabriel é descrito como "que se apresentou diante de Deus" — um anjo de alta posição.',
    ],
    versicosChave: ['Daniel 8:16', 'Lucas 1:19', 'Lucas 1:26-38', 'Daniel 9:21'],
    tags: ['gabriel', 'mensageiro', 'anunciação', 'profecia'],
    fontes: ['Calvino, Comentário a Lucas', 'Ellis, The Gospel of Luke'],
  },
  {
    id: 'an-008',
    titulo: 'Os Querubins — Guardiões da Glória de Deus',
    categoria: 'Angelologia',
    subcategoria: 'Hierarquia',
    conteudo: [
      'Os querubins são a ordem angelical associada à presença e glória de Deus.',
      'Dois querubins de ouro cobriam a Arca da Aliança (Êxodo 25:18-20).',
      'Ezequiel descreve criaturas com quatro faces (humana, leão, boi, águia) e quatro asas.',
      'Os querubins guardaram o caminho para o Éden após a Queda (Gênesis 3:24).',
      'O tabernáculo e templo tinham imagens de querubins bordadas nas cortinas.',
    ],
    versicosChave: ['Êxodo 25:18-20', 'Ezequiel 1:5-14', 'Gênesis 3:24', 'Salmo 80:1'],
    tags: ['querubins', 'glória', 'arca', 'santuário'],
    fontes: ['Calvino, Comentário a Êxodo', 'Block, The Book of Ezekiel'],
  },
  {
    id: 'an-009',
    titulo: 'Serafins — Adoradores da Santidade de Deus',
    categoria: 'Angelologia',
    subcategoria: 'Hierarquia',
    conteudo: [
      'Os serafins são mencionados apenas em Isaías 6:1-7.',
      'Seu nome significa "ardentes" — refletem o fogo da santidade divina.',
      'Têm seis asas: duas para cobrir o rosto, duas para cobrir os pés, duas para voar.',
      'Cantam "Santos, santos, santos é o Senhor dos Exércitos; toda a terra está cheia da Sua glória".',
      'Um serafim tocou os lábios de Isaías com brasa, purificando-o para o ministério profético.',
    ],
    versicosChave: ['Isaías 6:1-7', 'Isaías 6:3'],
    tags: ['serafins', 'santidade', 'adoração', 'purificação'],
    fontes: ['Calvino, Comentário a Isaías', 'Oswalt, The Book of Isaiah, Chapters 1-39'],
  },
  {
    id: 'an-010',
    titulo: 'Os Demônios — Organização e Atividade',
    categoria: 'Angelologia',
    subcategoria: 'Demonologia',
    conteudo: [
      'Os demônios são anjos caídos que servem a Satanás contra o propósito de Deus.',
      'Eles são organizados em hierarquia (Efésios 6:12 — principados, potestades).',
      'Os demônios podem possuir pessoas (Marcos 5:1-20 — o endemoninhado geraseno).',
      'Eles causam doenças, cegueira espiritual e engano doutrinário.',
      'Os demônios tremem diante de Cristo (Marcos 1:23-24) e serão julgados no final.',
    ],
    versicosChave: ['Efésios 6:12', 'Marcos 5:1-20', 'Tiago 2:19', 'Mateus 12:28'],
    tags: ['demônios', 'hierarquia', 'possessão', 'guerra espiritual'],
    fontes: ['Calvino, Institutas I.14', 'Fee, God\'s Empowering Presence'],
  },

  // ═══ MAIS ANTROPOLOGIA ═══
  {
    id: 'at-006',
    titulo: 'A Alma Imortal — Debate Teológico',
    categoria: 'Antropologia',
    subcategoria: 'Natureza',
    conteudo: [
      'O debate sobre a imortalidade da alma tem raízes gregas e bíblicas.',
      'Platão ensinava a imortalidade natural da alma — a alma sobrevive à morte por natureza.',
      'A Bíblia ensina a imortalidade condicional — a alma sobrevive pela graça de Deus.',
      'Os adventistas defendem o condicionalismo — os mortos dormem até a ressurreição.',
      'A maioria dos cristãos defende a imortalidade da alma como doutrina bíblica.',
      'A verdade bíblica central é que Deus é o senhor da vida e da morte.',
    ],
    versicosChave: ['Daniel 12:2', 'João 5:28-29', '2 Coríntios 5:8', 'Filipenses 1:23'],
    tags: ['alma', 'imortalidade', 'condicionalismo', 'morte'],
    fontes: ['Calvino, Institutas III.25', 'Wright, Surprised by Hope', 'Franke, The Character of Theology'],
  },
  {
    id: 'at-007',
    titulo: 'A Criação do Homem — Adão e Eva',
    categoria: 'Antropologia',
    subcategoria: 'Criação',
    conteudo: [
      'Adão foi formado do pó da terra e recebeu o sopro de vida (Gênesis 2:7).',
      'Eva foi criada da costela de Adão — não da cabeça (para dominá-la) nem dos pés (para pisá-la).',
      'O casamento foi instituído antes da Queda — é criação de Deus, não invenção humana.',
      'A igualdade entre homem e mulher se baseia na imagem de Deus em ambos.',
      'A complementaridade dos sexos reflete a riqueza da imagem divina.',
    ],
    versicosChave: ['Gênesis 2:7', 'Gênesis 2:18-23', 'Gênesis 1:27', 'Mateus 19:4-6'],
    tags: ['criação', 'adão', 'eva', 'casamento', 'complementaridade'],
    fontes: ['Calvino, Comentário a Gênesis', 'Wenham, The Book of Genesis'],
  },
  {
    id: 'at-008',
    titulo: 'A Queda — Consequências e Cursed',
    categoria: 'Antropologia',
    subcategoria: 'Hamartiologia',
    conteudo: [
      'A Queda trouxe maldições sobre a serpente, sobre a terra, e sobre a humanidade.',
      'A maldição sobre a serpente — rastejar e ter inimizade com a descendência da mulher.',
      'A maldição sobre a terra — esforço e suor para produzir alimento.',
      'A maldição sobre a mulher — dor na concepção e no parto.',
      'A maldição sobre o homem — trabalhar com suor até voltar à terra.',
      'A promessa da redenção está na "descendência da mulher" (Gênesis 3:15) — proto-evangelho.',
    ],
    versicosChave: ['Gênesis 3:14-19', 'Gênesis 3:15', 'Romanos 5:12', 'Romanos 8:20-22'],
    tags: ['queda', 'maldição', 'proto-evangelho', 'consequências'],
    fontes: ['Calvino, Comentário a Gênesis', 'Westermann, Genesis 1-11', 'Wenham, The Book of Genesis'],
  },
  {
    id: 'at-009',
    titulo: 'A Vocação Humana — Trabalho e Domínio',
    categoria: 'Antropologia',
    subcategoria: 'Vocação',
    conteudo: [
      'Deus deu ao ser humano a vocação de "cultivar e guardar" o jardim (Gênesis 2:15).',
      'O trabalho não é maldição da Queda, mas vocação original — Deus trabalhou na criação.',
      'O domínio sobre a criação é delegado, não absoluto — somos mayordomos, não donos.',
      'A vocação humana inclui criatividade, responsabilidade e stewardship.',
      'A dignidade do trabalho se baseia em Deus ser trabalhador.',
    ],
    versicosChave: ['Gênesis 2:15', 'Gênesis 1:28', 'Colossenses 3:23', 'Efésios 2:10'],
    tags: ['vocação', 'trabalho', 'domínio', 'criatividade'],
    fontes: ['Calvino, Institutas I.13', 'Wolters, Creation Regained', 'Moltmann, God in Creation'],
  },

  // ═══ MAIS CRISTOLOGIA ═══
  {
    id: 'cr-012',
    titulo: 'A Dupla Natureza de Cristo — Deus e Homem',
    categoria: 'Cristologia',
    subcategoria: 'Natureza',
    conteudo: [
      'Cristo é plenamente Deus e plenamente homem — o mistério da encarnação.',
      'O Concílio de Calcedônia (451 d.C.) definiu: duas naturezas, sem confusão, sem mudança, sem divisão, sem separação.',
      'Nestório separava as duas naturezas — foi condenado como heresia.',
      'Eutiques confundia as naturezas — monofisismo — também condenado.',
      'A união hipostática — as duas naturezas se unem em uma pessoa divina.',
      'A compreensão correta da pessoa de Cristo é essencial para a salvação.',
    ],
    versicosChave: ['João 1:1-14', 'Filipenses 2:5-11', 'Colossenses 2:9', '1 Timóteo 3:16'],
    tags: ['cristologia', 'natureza', 'calcedônia', 'encarnação'],
    fontes: ['Calvino, Institutas II.14', 'Kelly, Early Christian Doctrines', 'Pelikan, The Christian Tradition'],
  },
  {
    id: 'cr-013',
    titulo: 'A Obra de Cristo — Profeta, Sacerdote e Rei',
    categoria: 'Cristologia',
    subcategoria: 'Ofícios',
    conteudo: [
      'Cristo exerce três ofícios: profeto, sacerdote e rei.',
      'Como profeto, Cristo é o último e supremo revelador de Deus (Hebreus 1:1-2).',
      'Como sacerdote, Cristo ofereceu Si mesmo como sacrifício e intercede por nós (Hebreus 7:23-27).',
      'Como rei, Cristo governa a igreja e o universo com autoridade soberana.',
      'Os três ofícios são inseparáveis — um ofício qualifica os outros.',
    ],
    versicosChave: ['Deuteronômio 18:15', 'Hebreus 7:23-27', 'Efésios 1:20-22', 'João 18:37'],
    tags: ['profeta', 'sacerdote', 'rei', 'ofícios'],
    fontes: ['Calvino, Institutas II.15', 'Calvin, Institutes II.15', 'Calvin, Institutes'],
  },
  {
    id: 'cr-014',
    titulo: 'A Ressurreição de Cristo — Realidade Histórica',
    categoria: 'Cristologia',
    subcategoria: 'Ressurreição',
    conteudo: [
      'A ressurreição de Cristo é o fato central da fé cristã — sem ela, a fé é vã.',
      'A evidência histórica inclui: túmulo vazio, múltiplas aparições, transformação dos discípulos.',
      'As aparições ressurretas foram a 12 pessoas e grupos ao longo de 40 dias.',
      'A Igreja primitiva testificou a ressurreição sob risco de morte — ninguém morre por algo que sabe ser falso.',
      'A ressurreição é uma obra sobrenatural de Deus — não é uma metáfora ou experiência subjetiva.',
    ],
    versicosChave: ['1 Coríntios 15:3-8', 'Mateus 28:5-10', 'Atos 1:3', '1 Coríntios 15:14'],
    tags: ['ressurreição', 'histórica', 'evidência', 'fé'],
    fontes: ['Calvino, Institutas II.16', 'Wright, The Resurrection of the Son of God', 'N.T. Wright, Surprised by Hope'],
  },
  {
    id: 'cr-015',
    titulo: 'A Ascensão de Cristo — Exaltação e Intercessão',
    categoria: 'Cristologia',
    subcategoria: 'Exaltação',
    conteudo: [
      'A ascensão de Cristo foi Sua exaltação à direita do Pai.',
      'Atos 1:9-11 descreve a ascensão — Cristo foi recebido em uma nuvem.',
      'A ascensão não é desaparecimento — Cristo continua presente pelo Espírito.',
      'Cristo ascendeu como Sumo Sacerdote que ofereceu Si mesmo.',
      'A ascensão garante Sua intercessão contínua por nós (Hebreus 7:25).',
    ],
    versicosChave: ['Atos 1:9-11', 'Efésios 1:20-22', 'Hebreus 7:25', 'Filipenses 2:9-11'],
    tags: ['ascensão', 'exaltação', 'intercessão', 'sumo sacerdote'],
    fontes: ['Calvino, Institutas II.16', 'O\'Brien, The Ascension of Christ in the New Testament'],
  },
  {
    id: 'cr-016',
    titulo: 'A Segunda Vinda de Cristo — Parusia',
    categoria: 'Cristologia',
    subcategoria: 'Escatologia',
    conteudo: [
      'Cristo voltará pessoalmente, visivelmente e gloriamente (Atos 1:11).',
      'A parusia será inesperada — como um ladrão na noite (1 Tessalonicenses 5:2).',
      'Haverá sinais antes da volta: guerras, fomes, terremotos, apostasia.',
      'A volta de Cristo trará consumação do reino, ressurreição dos mortos e juízo final.',
      'Vivemos na era da igreja, entre a primeira e a segunda vinda — "já mas ainda não".',
    ],
    versicosChave: ['Atos 1:11', '1 Tessalonicenses 4:16-17', 'Mateus 24:30-31', 'Apocalipse 19:11-16'],
    tags: ['parusia', 'segunda vinda', 'escatologia', 'juízo'],
    fontes: ['Calvino, Institutas III.25', 'Hoekema, The Bible and the Future', 'Ladd, A Theology of the New Testament'],
  },

  // ═══ ECLESIOLOGIA ═══
  {
    id: 'ec-018',
    titulo: 'A Natureza da Igreja — Corpo e Noiva de Cristo',
    categoria: 'Eclesiologia',
    subcategoria: 'Natureza',
    conteudo: [
      'A Igreja é o corpo de Cristo — Sua manifestação visível e encarnada no mundo.',
      'Eclesiologicamente, a Igreja tem duas dimensões: universal (todos os crentes) e local (congregação específica).',
      'A Igreja é a noiva de Cristo que será apresentada sem mancha (Efésios 5:27).',
      'A Igreja é o templo de Deus — Deus habita nela pelo Espírito.',
      'A Igreja é a coluna e firmamento da verdade — sustenta a verdade de Deus no mundo.',
    ],
    versicosChave: ['Efésios 1:22-23', 'Efésios 5:25-27', '1 Coríntios 3:16', '1 Timóteo 3:15'],
    tags: ['igreja', 'corpo', 'noiva', 'templo'],
    fontes: ['Calvino, Institutas IV.1', 'Ridderbos, The Coming of the Kingdom'],
  },
  {
    id: 'ec-019',
    titulo: 'Os Meios de Graça — Palavra, Batismo e Ceia',
    categoria: 'Eclesiologia',
    subcategoria: 'Prática',
    conteudo: [
      'Os meios de graça são os canais instituídos por Deus para comunicar Sua graça.',
      'A Palavra de Deus é o meio de graça principal — fé vem pelo ouvir (Romanos 10:17).',
      'O batismo é o sinal de entrada na aliança — não salva, mas testifica a salvação.',
      'A ceia é o memorial da morte de Cristo — communhão espiritual com Ele.',
      'A oração não é tecnicamente meio de graça, mas é meio de comunhão com Deus.',
      'A pregação da Palavra é o meio primordial pelo qual Deus opera na Igreja.',
    ],
    versicosChave: ['Romanos 10:17', 'Mateus 28:19-20', '1 Coríntios 11:23-26', 'Atos 2:42'],
    tags: ['meios de graça', 'palavra', 'batismo', 'ceia'],
    fontes: ['Calvino, Institutas IV.14-19', 'Calvin, Institutes IV.14-19'],
  },

  // ═══ SOTERIOLOGIA ═══
  {
    id: 'so-034',
    titulo: 'A Regeneração — Nova Criatura em Cristo',
    categoria: 'Soteriologia',
    subcategoria: 'Ordo Salutis',
    conteudo: [
      'A regeneração é a obra do Espírito Santo que nos faz nascer de novo.',
      'É um ato divino, não humano — o homem não pode regenerar a si mesmo.',
      'A regeneração produz fé e arrependimento — não é resultado deles.',
      'Somos "nova criatura" — o velho passou, eis que tudo se fez novo (2 Coríntios 5:17).',
      'A regeneração é instantaneous e irreversível — uma vez regenerado, sempre regenerado.',
    ],
    versicosChave: ['João 3:3-7', '2 Coríntios 5:17', 'Tito 3:5', '1 Pedro 1:23'],
    tags: ['regeneração', 'novo nascimento', 'espírito santo', 'nova criatura'],
    fontes: ['Calvino, Institutas III.1', 'Bavinck, Reformed Dogmatics'],
  },
  {
    id: 'so-035',
    titulo: 'A Eleição — Escolhidos pela Graça de Deus',
    categoria: 'Soteriologia',
    subcategoria: 'Doutrina',
    conteudo: [
      'A eleição é a escolha soberana de Deus de salvar indivíduos para Si.',
      'Efésios 1:4 — "nos escolheu Nele antes da fundação do mundo".',
      'A eleição é baseada na graça, não nos méritos humanos.',
      'O calvinismo ensina eleição incondicional — Deus escolhe sem referência à fé prevista.',
      'O arminianismo ensina eleição condicional — Deus escolhe baseado na presciência da fé.',
      'A eleição não anula a responsabilidade humana — Deus usa meios (pregação, evangelismo).',
    ],
    versicosChave: ['Efésios 1:4-5', 'Romanos 8:28-30', '2 Timóteo 1:9', '1 Pedro 1:1-2'],
    tags: ['eleição', 'predestinação', 'graça', 'soberania'],
    fontes: ['Calvino, Institutas III.21', 'Arminio, Works', 'Pinnock, The Grace of God'],
  },
  {
    id: 'so-036',
    titulo: 'A Glorificação — O Destino Final do Crente',
    categoria: 'Soteriologia',
    subcategoria: 'Ordo Salutis',
    conteudo: [
      'A glorificação é a consumação final da salvação — ser feito semelhante a Cristo.',
      'Romanos 8:30 — "aos que justificou, esses também glorificou".',
      'A glorificação inclui a ressurreição do corpo e a Transformação total.',
      'Seremos como Cristo porque O viremos como Ele é (1 João 3:2).',
      'A glorificação é a etapa final do ordo salutis — aperfeiçoamento completo.',
    ],
    versicosChave: ['Romanos 8:30', '1 João 3:2', 'Filipenses 3:20-21', '1 Coríntios 15:51-53'],
    tags: ['glorificação', 'ressurreição', 'perfeição', 'destino'],
    fontes: ['Calvino, Institutas III.25', 'Hoekema, The Bible and the Future'],
  },

  // ═══ APOLÓGETICA ═══
  {
    id: 'ap-004',
    titulo: 'O Argumento do Design — Teleologia',
    categoria: 'Apologetica',
    subcategoria: 'Argumentos',
    conteudo: [
      'O argumento teleológico observa a ordem e propósito na criação como evidência de um Designer.',
      'A complexidade irredutível dos sistemas biológicos aponta para design inteligente.',
      'O ajuste fino dos constantes cósmicos (gravidade, força nuclear) sugere um Criador.',
      'William Paley popularizou o argumento do relojoeiro — um relógio implica um relojoeiro.',
      'O argumento não prova o Deus bíblico, mas estabelece a existência de um Designer.',
    ],
    versicosChave: ['Salmos 19:1', 'Romanos 1:20', 'Hebreus 11:3', 'Salmo 139:14'],
    tags: ['teleologia', 'design', 'apologética', 'argumento'],
    fontes: ['Paley, Natural Theology', 'Behe, Darwin\'s Black Box', 'Dawkins, The Blind Watchmaker (crítica)'],
  },
  {
    id: 'ap-005',
    titulo: 'A Resurreição — Evidência Histórica',
    categoria: 'Apologetica',
    subcategoria: 'Evidência',
    conteudo: [
      'A ressurreição de Cristo é o fato mais bem atestado da história antiga.',
      'As evidências incluem: túmulo vazio, aparições, mudança dos discípulos, origem da igreja.',
      'O túmulo vazio é atestado por fontes hostis (relato da guarda em Mateus 28:11-15).',
      'As aparições foram a múltiplas pessoas, em diferentes ocasiões, ao longo de 40 dias.',
      'A transformação dos discípulos — de covardes a mártires — é inexplicável sem a ressurreição.',
      'A origem da igreja no Judaísmo é impossível sem a ressurreição.',
    ],
    versicosChave: ['1 Coríntios 15:3-8', 'Atos 1:3', 'Mateus 28:5-10', 'Lucas 24:36-49'],
    tags: ['ressurreição', 'evidência', 'histórica', 'apologética'],
    fontes: ['Wright, The Resurrection of the Son of God', 'Habermas, The Ressurection of Jesus'],
  },

  // ═══ HARMENOÊUTICA ═══
  {
    id: 'hm-006',
    titulo: 'A Regra de Ouro da Interpretação',
    categoria: 'Hermenêutica',
    subcategoria: 'Princípios',
    conteudo: [
      'A regra de ouro: interprete sempre pela Escritura mais clara.',
      'O princípio da analogia da fé — passagens obscuras devem ser interpretadas pelas claras.',
      'Nenhuma passagem pode ensinar algo que contradiga o ensino bíblico claro.',
      'O contexto imediato (versículo, capítulo) e o remoto (livro, Bíblia) são importantes.',
      'A interpretação literal é a regra geral — só se recorre ao sentido figurado quando o contexto exige.',
    ],
    versicosChave: ['2 Pedro 1:20-21', '2 Timóteo 2:15', '1 Coríntios 2:13', 'Salmo 119:105'],
    tags: ['hermenêutica', 'interpretação', 'regra de ouro', 'contexto'],
    fontes: ['Calvino, Institutas I.7', 'Fee, New Testament Exegesis', 'Kaiser & Silva, Introduction to Biblical Hermeneutics'],
  },
  {
    id: 'hm-007',
    titulo: 'Tipologia Bíblica — Sombra e Realidade',
    categoria: 'Hermenêutica',
    subcategoria: 'Métodos',
    conteudo: [
      'Tipologia é o estudo de tipos — pessoas, eventos ou instituições do AT que prefiguram realidades no NT.',
      'Adão é tipo de Cristo (Romanos 5:14) — a queda de um, a redenção do outro.',
      'O sacrifício do cordeiro pascal prefigura Cristo, o Cordeiro de Deus.',
      'O tabernáculo e o templo são sombras da realidade celestial.',
      'A tipologia não é alegoria — os tipos têm fundamento histórico e se cumprirão literalmente.',
    ],
    versicosChave: ['Romanos 5:14', '1 Coríntios 15:45', 'Hebreus 8:5', '1 Coríntios 10:11'],
    tags: ['tipologia', 'AT', 'NT', 'sombra', 'realidade'],
    fontes: ['Kline, The Structure of Biblical Authority', 'Gundry, The Use of the Old Testament in the New Testament'],
  },

  // ═══ ÉTICA CRISTÃ ═══
  {
    id: 'et-025',
    titulo: 'A Bioética Cristã — Aborto, Eutanásia e Engenharia Genética',
    categoria: 'Ética Cristã',
    subcategoria: 'Contemporâneo',
    conteudo: [
      'A bioética cristã aplica princípios bíblicos a questões modernas de vida.',
      'Aborto: a vida humana começa na concepção (Salmo 139:13-16) — é vida preciosa.',
      'Eutanásia: a vida é dom de Deus — nós não somos donos dela.',
      'Engenharia genética: manipular a criação de Deus levanta questões éticas profundas.',
      'Células-tronco: a dignidade humana deve ser respeitada em qualquer pesquisa.',
      'A base ética é a imagem de Deus em todo ser humano.',
    ],
    versicosChave: ['Salmo 139:13-16', 'Jó 1:21', 'Gênesis 1:27', '1 Coríntios 6:19-20'],
    tags: ['bioética', 'aborto', 'eutanásia', 'ética'],
    fontes: ['Calvino, Institutas III.7', 'Calvin, Institutes III.7'],
  },
  {
    id: 'et-026',
    titulo: 'A Ética do Trabalho — Honestidade e Excelência',
    categoria: 'Ética Cristã',
    subcategoria: 'Prática',
    conteudo: [
      'O trabalho é vocação divina — feito para a glória de Deus (1 Coríntios 10:31).',
      'A honestidade no trabalho é mandamento — "não furtarás" inclui roubar tempo.',
      'A excelência no trabalho é testemunho — "tudo quanto fizerdes, fazei de coração" (Colossenses 3:23).',
      'A ganância é idolatria — o dinheiro não pode ser o alvo da vida.',
      'O descanso semanal é mandamento — Deus descansou e nos ordena fazer o mesmo.',
    ],
    versicosChave: ['1 Coríntios 10:31', 'Colossenses 3:23', 'Efésios 4:28', 'Éxodo 20:8-11'],
    tags: ['trabalho', 'honestidade', 'excelência', 'descanso'],
    fontes: ['Calvino, Institutas II.10', 'Wolters, Creation Regained'],
  },

  // ═══ MISSIONOLOGIA ═══
  {
    id: 'mi-017',
    titulo: 'A Grande Comissão — Mandato Missionário',
    categoria: 'Missiologia',
    subcategoria: 'Fundamento',
    conteudo: [
      'Mateus 28:18-20 é a Grande Comissão — o mandato de Cristo para a Igreja.',
      'A autoridade de Cristo é a base: "Toda autoridade me é dada".',
      'O alvo é universal: "todas as nações" — sem exceção.',
      'O método é relacional: "fazendo discípulos" — não apenas convertidos.',
      'A-promessa é presence: "estarei convosco todos os dias".',
      'A obediência à Grande Comissão é teste de amor a Cristo.',
    ],
    versicosChave: ['Mateus 28:18-20', 'Marcos 16:15', 'Lucas 24:46-48', 'Atos 1:8'],
    tags: ['grande comissão', 'missão', 'evangelismo', 'discipulado'],
    fontes: ['Calvino, Institutas III.21', 'Ridderbos, The Coming of the Kingdom'],
  },
  {
    id: 'mi-018',
    titulo: 'A Urgência da Salvação — Evangelismo',
    categoria: 'Missiologia',
    subcategoria: 'Prática',
    conteudo: [
      'O evangelismo é urgente porque as almas estão perdidas sem Cristo.',
      'Romanos 10:14-15 — "como crerão naquele em quem não creram? Como crerão naquele de quem não ouviram?"',
      'A mensagem é simples: arrependimento e fé em Cristo.',
      'O método deve ser contextualizado sem comprometer a verdade.',
      'O fruto do evangelismo é a glória de Deus — não números.',
    ],
    versicosChave: ['Romanos 10:14-15', '2 Coríntios 5:20', 'Atos 4:12', '1 Coríntios 9:22'],
    tags: ['evangelismo', 'urgência', 'salvação', 'missão'],
    fontes: ['Calvino, Institutas III.21', 'Stott, The Contemporary Mission', 'Packer, Evangelism and the Sovereignty of God'],
  },

  // ═══ HISTÓRIA DA IGREJA ═══
  {
    id: 'hi-023',
    titulo: 'O Avivamento Metodista (século XVIII)',
    categoria: 'História da Igreja',
    subcategoria: 'Avivamentos',
    conteudo: [
      'O avivamento metodista sob John Wesley transformou a Inglaterra.',
      'Wesley pregava arrependimento ao ar livre — "o mundo é minha paróquia".',
      'OMethodismo enfatizava a santificação e a perfeição cristã.',
      'O avivamento incluía: conversões massivas, santificação de vida, ativismo social.',
      'OMethodismo influenciou o evangelismo mundial e o protestantismo social.',
    ],
    versicosChave: ['2 Crônicas 7:14', 'Atos 19:18-20', 'Miquéias 6:8'],
    tags: ['avivamento', 'wesley', 'metodismo', 'santificação'],
    fontes: ['Hutchinson, The Modern Church', 'Bebbington, Evangelicalism in Modern Britain'],
  },
  {
    id: 'hi-024',
    titulo: 'O Concílio de Niceia (325 d.C.)',
    categoria: 'História da Igreja',
    subcategoria: 'Concílios',
    conteudo: [
      'O Concílio de Niceia foi o primeiro concílio ecumênico da Igreja.',
      'Foi convocado pelo imperador Constantino para resolver a controvérsia ariana.',
      'O arianismo ensinava que o Filho era criado — "houve um tempo em que Ele não existia".',
      'O Concílio afirmou que o Filho é homoousios (da mesma substância) com o Pai.',
      'O Credo de Niceia é a base da fé trinitária cristã.',
    ],
    versicosChave: ['João 1:1-3', 'Colossenses 1:15-17', 'Hebreus 1:3'],
    tags: ['niceia', 'trindade', 'arianismo', 'credo'],
    fontes: ['Kelly, Early Christian Doctrines', 'Pelikan, The Emergence of the Catholic Tradition'],
  },

  // ═══ CONTEMPORÂNEO ═══
  {
    id: 'cc-061',
    titulo: 'Cristianismo e Redes Sociais',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Cultura Digital',
    conteudo: [
      'As redes sociais são ferramentas que podem ser usadas para o evangelho.',
      'O perigo da "fé de Instagram" — superficialidade e aparência.',
      'A comunidade online pode complementar, mas não substituir a igreja local.',
      'O cuidado com a língua nas redes — "nenhuma palavra corrupta saia da boca".',
      'A internet como campo missionário — oportunidades para proclamar Cristo.',
    ],
    versicosChave: ['Efésios 4:29', 'Colossenses 4:6', '1 Pedro 3:15', 'Hebreus 10:24-25'],
    tags: ['redes sociais', 'cultura digital', 'evangelismo', 'comunidade'],
    fontes: ['Calvino, Institutas III.6', 'Calvin, Institutes III.6'],
  },
  {
    id: 'cc-062',
    titulo: 'Cristianismo e Ciência — Harmonia ou Conflito?',
    categoria: 'Questões Contemporâneas',
    subcategoria: 'Fé e Ciência',
    conteudo: [
      'A relação entre fé e ciência é complexa — há conflito, independência e integração.',
      'O conflito (Dawkins, Hitchens) — ciência explica tudo, Deus é desnecessário.',
      'A independência (Gould) — ciência e fé respondem a perguntas diferentes.',
      'A integração (Polkinghorne) — ciência e fé se complementam na busca da verdade.',
      'A Bíblia não é livro de ciência — é revelação de Deus sobre como ter relação com Ele.',
      'A criação testifica a Deus — "os céus declaram a glória de Deus" (Salmo 19:1).',
    ],
    versicosChave: ['Salmo 19:1', 'Romanos 1:20', 'Provérbios 25:2', 'Eclesiastes 7:24'],
    tags: ['ciência', 'fé', 'criação', 'evolução', 'integração'],
    fontes: ['Calvino, Institutas I.14', 'Polkinghorne, Belief in God in an Age of Science'],
  },

  // ═══ TIPOLOGIA ═══
  {
    id: 'ty-013',
    titulo: 'O Tabernáculo — Tipo de Cristo',
    categoria: 'Tipologia',
    subcategoria: 'AT',
    conteudo: [
      'O tabernáculo é um dos mais ricos tipos de Cristo no AT.',
      'A porta do tabernáculo — "Eu sou a porta" (João 10:7).',
      'O altar do Holocausto — Cristo é o sacrifício perfeito.',
      'A mesa dos pães da proposição — Cristo é o pão da vida.',
      'O candelabro — Cristo é a luz do mundo.',
      'O propiciatório — Cristo é nossa propiciação.',
    ],
    versicosChave: ['Êxodo 25-27', 'João 10:7', 'João 6:35', 'João 8:12'],
    tags: ['tabernáculo', 'tipo', 'cristo', 'sacrifício'],
    fontes: ['Calvino, Comentário a Êxodo', 'Kline, The Structure of Biblical Authority'],
  },
  {
    id: 'ty-014',
    titulo: 'José — Tipo de Cristo',
    categoria: 'Tipologia',
    subcategoria: 'AT',
    conteudo: [
      'José é um dos tipos mais completos de Cristo no AT.',
      'Amado pelo pai, odiado pelos irmãos — Cristo rejeitado por Israel.',
      'Vendido por 20 peças de prata — Judas traiu Cristo por 30.',
      'Desceu ao Egito (morte) e ressurgiu à glória — ressurreição.',
      'Proveu alimento para os irmãos — Cristo é o pão da vida.',
      'No final, os irmãos se prostraram — todo joelho se dobrará.',
    ],
    versicosChave: ['Gênesis 37-50', 'Filipenses 2:10-11', 'João 6:35'],
    tags: ['josé', 'tipo', 'cristo', 'ressurreição'],
    fontes: ['Calvino, Comentário a Gênesis', 'Kline, The Structure of Biblical Authority'],
  },

  // ═══ LIVROS POÉTICOS ═══
  {
    id: 'lp-011',
    titulo: 'Jó — O Problema do Sofrimento',
    categoria: 'Livros Poéticos',
    subcategoria: 'Jó',
    conteudo: [
      'Jó é a resposta bíblica ao problema do sofrimento do inocente.',
      'Jó não sofreu por causa de pecado — Deus o testemunhou como justo.',
      'Os conselheiros de Jó ofereceram teologia retributiva — sofrimento = pecado.',
      'Deus respondeu do redemoinho — não explicou o sofrimento, mas revelou Sua soberania.',
      'A lição final: Deus é soberano, e nós somos limitados para compreender Seus caminhos.',
      'Jó é tipo de Cristo — sofreu injustamente e foi restaurado.',
    ],
    versicosChave: ['Jó 1:1', 'Jó 42:5-6', 'Romanos 8:28', '1 Pedro 4:12-19'],
    tags: ['jó', 'sofrimento', 'soberania', 'paciência'],
    fontes: ['Calvino, Comentário a Jó', 'Clines, Job 1-20', 'Anderson, Out of the Whirlwind'],
  },
];

// Filtrar apenas IDs novos
const toAdd = newStudies.filter(s => !existingIds.has(s.id));
console.log(`Novos estudos a adicionar: ${toAdd.length}`);

if (toAdd.length === 0) {
  console.log('Nenhum estudo novo para adicionar.');
  process.exit(0);
}

// Adicionar ao final do array
const insertPoint = content.lastIndexOf('];');
const newContent = content.slice(0, insertPoint) + 
  toAdd.map(s => `  ${JSON.stringify(s, null, 2).replace(/"/g, "'")},`).join('\n') + 
  '\n' + content.slice(insertPoint);

writeFileSync(filePath, newContent, 'utf-8');
console.log(`Arquivo atualizado com ${toAdd.length} novos estudos.`);
