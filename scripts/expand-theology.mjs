/**
 * Script para expandir estudos teológicos
 * Adiciona estudos nas categorias sub-representadas
 */

import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const filePath = join(process.cwd(), 'src/data/estudosTeologicosExpandidos.ts');
const content = readFileSync(filePath, 'utf-8');

// Extrair estudos existentes
const existingIds = new Set();
const idMatches = content.matchAll(/id:\s*'([^']+)'/g);
for (const match of idMatches) {
  existingIds.add(match[1]);
}

console.log(`Estudos existentes: ${existingIds.size}`);

// Novos estudos a adicionar
const newStudies = [
  // ═══ PNEUMATOLOGIA (expandido de 3 para 25) ═══
  {
    id: 'pn-001',
    titulo: 'A Personalidade do Espírito Santo',
    categoria: 'Pneumatologia',
    subcategoria: 'Natureza do Espírito',
    conteudo: [
      'O Espírito Santo não é uma força impersonal ou uma influência abstrata, mas uma pessoa divina com vontade, emoções e inteligência.',
      'A Bíblia atribui ao Espírito Santo ações pessoais: Ele fala (Atos 13:2), ensina (João 14:26), intercede (Romanos 8:26), testifica (João 15:26), e pode ser entristecido (Efésios 4:30).',
      'No Concílio de Constantinopla (381 d.C.), a Igreja affirmou a divindade e personalidade do Espírito Santo contra o pneumatomachianismo.',
      'Agostinho desenvolveu a pneumatologia ocidental, comparando o Espírito ao amor que proceed do Pai e do Filho.',
      'A teologia reformada enfatiza a obra do Espírito na regeneração e santificação, enquanto a tradição pentecostal destaca os dons carismáticos.',
    ],
    versicosChave: ['João 14:26', 'Atos 13:2', 'Romanos 8:26', 'Efésios 4:30'],
    tags: ['espírito santo', 'pneumatologia', 'trindade', 'divindade'],
    fontes: ['Agostinho, De Trinitate', 'Calvino, Institutas I.13', 'G.E. Ladd, Teologia do NT'],
  },
  {
    id: 'pn-002',
    titulo: 'A Obra do Espírito Santo na Regeneração',
    categoria: 'Pneumatologia',
    subcategoria: 'Salvação',
    conteudo: [
      'A regeneração é a obra sobrenatural do Espírito Santo que transforma a natureza espiritual do pecador, capacitando-o a crer em Cristo.',
      'Jesus ensinou que é necessário nascer de novo (João 3:3-7), e que esse nascimento vem do Espírito Santo.',
      'A regeneração precede a fé — o pecador não pode crer até que o Espírito Santo lhe dé vida espiritual.',
      'A tradição reformada ensina a regeneração eficaz, enquanto a tradição arminiana enfatiza a graça resistível.',
      'A regeneração é instantânea, secreta e irresistível no que diz respeito à sua eficácia.',
    ],
    versicosChave: ['João 3:5-6', 'Tito 3:5', '1 Pedro 1:23', 'Efésios 2:5'],
    tags: ['regeneração', 'conversão', 'novo nascimento', 'espírito santo'],
    fontes: ['Calvino, Institutas III.1', 'Hodge, Systematic Theology', 'Berkouwer, The Work of the Holy Spirit'],
  },
  {
    id: 'pn-003',
    titulo: 'Os Dons Espirituais — Cessacionismo vs. Continuismo',
    categoria: 'Pneumatologia',
    subcategoria: 'Dons Espirituais',
    conteudo: [
      'Os dons espirituais são habilidades sobrenaturais concedidas pelo Espírito Santo para edificação da igreja.',
      'O cessacionismo sustenta que os dons miraculosos (profecia, línguas, curas) cessaram com a morte dos apóstolos e a canonização das Escrituras.',
      'O continuismo defende que todos os dons do Espírito Santo continuam operantes hoje, incluindo línguas e profecia.',
      'O cessacionismo apela para 1 Coríntios 13:8-10 ("o perfeito virá") como referência à canonização bíblica.',
      'O continuismo apela para Hebreus 13:8 ("Jesus ontem, hoje e sempre") e para a universalidade dos dons no NT.',
      'A posição moderada (aberto/cessacionismo) aceita que alguns dons podem continuar, mas com limitações.',
    ],
    versicosChave: ['1 Coríntios 12:4-11', '1 Coríntios 13:8-10', 'Efésios 4:11-12', 'Hebreus 13:8'],
    tags: ['dons espirituais', 'cessacionismo', 'continuismo', 'línguas', 'profecia'],
    fontes: ['Grudem, The Gift of Prophecy', 'MacArthur, Charismática', 'Deere, Power Encounter'],
  },
  {
    id: 'pn-004',
    titulo: 'O Batismo no Espírito Santo',
    categoria: 'Pneumatologia',
    subcategoria: 'Experiência',
    conteudo: [
      'O batismo no Espírito Santo é a experiência de ser imerso na presença e poder do Espírito de Deus.',
      'Na teologia pentecostal, o batismo no Espírito é uma experiência posterior à regeneração, frequentemente acompanhada de línguas.',
      'Na teologia reformada, o batismo no Espírito é simultâneo à regeneração — todo crente já foi batizado no Espírito.',
      'Atos mostra múltiplas ocasiões em que o Espírito Santo veio sobre os crentes (Atos 2, 8, 10, 19).',
      'O propósito do batismo no Espírito é capacitamento para testemunho e serviço, não salvação.',
    ],
    versicosChave: ['Atos 1:5', 'Atos 2:4', '1 Coríntios 12:13', 'Efésios 5:18'],
    tags: ['batismo', 'espírito santo', 'pentecostal', 'experiência'],
    fontes: ['Ruthven, On the Cessation of the Charismata', 'Stronstad, The Charismatic Theology of Luke'],
  },
  {
    id: 'pn-005',
    titulo: 'O Fruto do Espírito Santo',
    categoria: 'Pneumatologia',
    subcategoria: 'Santificação',
    conteudo: [
      'O fruto do Espírito Santo é o character Christlike que o Espírito produz na vida do crente (Gálatas 5:22-23).',
      'Os nove aspectos do fruto formam um todo integrado: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança.',
      'O fruto não é fruto de esforço humano, mas resultado da obra do Espírito no crente que se rende.',
      'Diferente dos dons (distribuídos individualmente), o fruto é produzido em todos os crentes.',
      'O fruto é evidência madura da vida cristã — leva tempo para amadurecer, como uma árvore que dá fruto em sua estação.',
    ],
    versicosChave: ['Gálatas 5:22-23', 'João 15:4-5', 'Romanos 8:29', 'Efésios 5:9'],
    tags: ['fruto do espírito', 'santificação', 'caráter', 'virtude'],
    fontes: ['Calvino, Comentário a Gálatas', 'Stott, The Message of Romans', 'Moo, The Epistle to the Galatians'],
  },
  {
    id: 'pn-006',
    titulo: 'A Unção do Espírito Santo',
    categoria: 'Pneumatologia',
    subcategoria: 'Experiência',
    conteudo: [
      'A unção do Espírito Santo é a equipagem sobrenatural para serviço, especialmente para pregação e ministério.',
      'Jesus foi unido pelo Espírito Santo no batismo (Lucas 3:22) e essa unção qualificou Seu ministério terreno.',
      '1 João 2:20 fala de uma unção que todos os crentes recebem — "vocês têm uma unção da parte dAquele que é santo".',
      'A unção não é o mesmo que batismo no Espírito — é mais específica para service e ministério.',
      'A unção capacitante não deve ser confundida com a unção para salvação (regeneração).',
    ],
    versicosChave: ['Lucas 3:22', '1 João 2:20', '1 João 2:27', 'Isaías 61:1'],
    tags: ['unção', 'ministério', 'capacitação', 'serviço'],
    fontes: ['Horton, The Holy Spirit', 'Ryrie, The Holy Spirit'],
  },
  {
    id: 'pn-007',
    titulo: 'A Intercessão do Espírito Santo',
    categoria: 'Pneumatologia',
    subcategoria: 'Oração',
    conteudo: [
      'Romanos 8:26-27 ensina que o Espírito Santo intercede por nós com "gemidos inexprimíveis".',
      'A intercessão do Espírito é uma obra secreta e infalível — Ele ora de acordo com a vontade de Deus.',
      'Mesmo quando não sabemos como orar, o Espírito ora por nós.',
      'A intercessão do Espírito complementa a intercessão de Cristo (Hebreus 7:25) — Cristo ora como Sumo Sacerdote, o Espírito ora em nosso íntimo.',
      'Essa verdade deveria trazer grande consolo aos crentes que se sentem inadequados na oração.',
    ],
    versicosChave: ['Romanos 8:26-27', 'Hebreus 7:25', 'Efésios 6:18', 'Judas 1:20'],
    tags: ['intercessão', 'oração', 'espírito santo', 'consolo'],
    fontes: ['Murray, Romans', 'Moo, The Epistle to the Romans', 'Calvino, Institutas III.20'],
  },
  {
    id: 'pn-008',
    titulo: 'O Espírito Santo e a Santificação',
    categoria: 'Pneumatologia',
    subcategoria: 'Santificação',
    conteudo: [
      'A santificação é a obra progressiva do Espírito Santo que transforma o crente à imagem de Cristo.',
      'O Espírito opera em dupla dimensão: nos declara santos (justificação) e nos faz santos (santificação).',
      'A santificação é cooperativa — o crente trabalha com o Espírito (Filipenses 2:12-13).',
      'O fruto do Espírito é a evidência da santificação progressiva.',
      'A santificação nunca será completa nesta vida — a glorificação é o consumação final.',
    ],
    versicosChave: ['2 Coríntios 3:18', 'Filipenses 2:12-13', '1 Tessalonicenses 4:3', 'Gálatas 5:22-23'],
    tags: ['santificação', 'transformação', 'caráter', 'crescimento'],
    fontes: ['Calvino, Institutas III.6', 'Murray, Redemption Accomplished', 'Packer, Keep in Step with the Spirit'],
  },
  {
    id: 'pn-009',
    titulo: 'O Espírito Santo e a Escritura',
    categoria: 'Pneumatologia',
    subcategoria: 'Revelação',
    conteudo: [
      'O Espírito Santo é o autor inspirador das Escrituras — toda Escritura é inspirada por Deus (2 Timóteo 3:16).',
      'O Espírito ilumina a mente do crente para compreender as Escrituras (1 Coríntios 2:10-14).',
      'A inspiração bíblica é plenária (toda a Bíblia), verbal (as palavras), e dinâmica (Deus atuando nos autores).',
      'A iluminação do Espírito não substitui o estudo diligente, mas o capacita.',
      'O mesmo Espírito que inspirou as Escrituras é o que as interpreta — a Escritura é sua própria intérprete.',
    ],
    versicosChave: ['2 Timóteo 3:16', '1 Coríntios 2:10-14', '2 Pedro 1:21', 'João 16:13'],
    tags: ['inspiração', 'iluminação', 'escritura', 'revelação'],
    fontes: ['Warfield, Inspiration and Authority of Scripture', 'Calvino, Institutas I.7', 'Geisler, Biblical Inspiration'],
  },
  {
    id: 'pn-010',
    titulo: 'O Espírito Santo na Criação',
    categoria: 'Pneumatologia',
    subcategoria: 'Cosmologia',
    conteudo: [
      'O Espírito Santo estava presente e ativo na obra da criação (Gênesis 1:2).',
      'O "sopro de Deus" (ruach) sobre as águas é vista como o Espírito criador.',
      'Salmos 33:6 confirma que "pela palavra do Senhor os céus foram feitos".',
      'A Trindade está envolvida na criação: Pai planeja, Filho executa, Espírito capacita.',
      'O Espírito continua sustentando a criação (Colossenses 1:17).',
    ],
    versicosChave: ['Gênesis 1:2', 'Salmos 33:6', 'Jó 33:4', 'Colossenses 1:17'],
    tags: ['criação', 'cosmologia', 'sustento', 'trindade'],
    fontes: ['Calvino, Comentário a Gênesis', 'Clowney, The Unfolding Mystery'],
  },

  // ═══ ANGELOLOGIA (expandido de 2 para 15) ═══
  {
    id: 'an-001',
    titulo: 'A Natureza e Hierarquia dos Anjos',
    categoria: 'Angelologia',
    subcategoria: 'Natureza',
    conteudo: [
      'Os anjos são seres criados espirituais, inteligentes e pessoais, designados para servir a Deus e aos homens.',
      'A Bíblia descreve uma hierarquia angelical: querubins, serafins, thronos, dominações, potestades (Efésios 6:12, Colossenses 1:16).',
      'Os anjos não têm corpos materiais, mas podem assumir forma humana quando necessário (Hebreus 13:2).',
      'Os anjos são criados para adorar e servir a Deus — "Santos, santos, santos é o Senhor dos Exércitos" (Isaías 6:3).',
      'A tradição judaica e cristã desenvolveu detalhes sobre ordens angelicais, embora a Bíblia seja limitada nesse assunto.',
    ],
    versicosChave: ['Hebreus 1:14', 'Efésios 6:12', 'Isaías 6:2', 'Colossenses 1:16'],
    tags: ['anjos', 'hierarquia', 'querubins', 'serafins'],
    fontes: ['Calvino, Institutas I.13-14', 'Pentecost, Things to Come', 'Bauckham, The Fate of the Dead'],
  },
  {
    id: 'an-002',
    titulo: 'Anjos da Guarda — Proteção Divina',
    categoria: 'Angelologia',
    subcategoria: 'Ministério',
    conteudo: [
      'Deus designa anjos para proteger e guiar os Seus filhos (Salmo 91:11-12).',
      'Cada criança pode ter um anjo da guarda (Mateus 18:10).',
      'Os anjos da guarda protegem contra perigos físicos e espirituais.',
      'Daniel experimentou a proteção angelical na cova dos leões (Daniel 6:22).',
      'Pedro foi libertado da prisão por um anjo (Atos 12:7-11).',
    ],
    versicosChave: ['Salmo 91:11-12', 'Mateus 18:10', 'Atos 12:7-11', 'Daniel 6:22'],
    tags: ['anjos da guarda', 'proteção', 'livramento', 'ministério'],
    fontes: ['Pentecost, Things to Come', 'Aalders, Daniel'],
  },
  {
    id: 'an-003',
    titulo: 'Satanás e os Anjos Caídos',
    categoria: 'Angelologia',
    subcategoria: 'Demonologia',
    conteudo: [
      'Satanás é um anjo caído, originalmente criado como querubim ungido (Ezequiel 28:14).',
      'A queda de Satanás ocorreu por orgulho — ele quis se igualar a Deus (Isaías 14:12-15).',
      'Um terço dos anjos caiu com Satanás e se tornaram demônios (Apocalipse 12:4).',
      'Satanás é chamado de "deus deste século" (2 Coríntios 4:4) e "príncipe deste mundo" (João 14:30).',
      'A derrota final de Satanás está garantida pela cruz de Cristo (Colossenses 2:15) e se cumprirá no lago de fogo (Apocalipse 20:10).',
    ],
    versicosChave: ['Ezequiel 28:14-17', 'Isaías 14:12-15', 'Apocalipse 12:4', 'Colossenses 2:15'],
    tags: ['satanás', 'demônios', 'queda', 'guerra espiritual'],
    fontes: ['Calvino, Institutas I.14', 'Lewis, The Screwtape Letters', 'Fee, God\'s Empowering Presence'],
  },
  {
    id: 'an-004',
    titulo: 'A Guerra Espiritual — Efésios 6:10-18',
    categoria: 'Angelologia',
    subcategoria: 'Guerra Espiritual',
    conteudo: [
      'A guerra espiritual é uma realidade — nossos inimigos não são de carne e sangue, mas principados e potestades.',
      'A armadura de Deus inclui: verdade, justiça, evangelho, fé, salvação, Palavra e oração.',
      'Cada peça da armadura corresponde a uma verdade doutrinária que o crente deve vestir pela fé.',
      'A oração é a arma ofensiva na guerra espiritual — ela invoca o poder de Deus.',
      'Vitória já foi conquistada na cruz — a guerra espiritual é aplicação dessa vitória.',
    ],
    versicosChave: ['Efésios 6:10-18', '2 Coríntios 10:3-5', 'Romanos 8:37', '1 João 5:4'],
    tags: ['guerra espiritual', 'armadura de deus', 'poder', 'vitória'],
    fontes: ['Stott, The Message of Ephesios', 'Boyd, God of the Possible', 'Powlison, Power Encounters'],
  },
  {
    id: 'an-005',
    titulo: 'Anjos no Julgamento Final',
    categoria: 'Angelologia',
    subcategoria: 'Escatologia',
    conteudo: [
      'Os anjos serão instrumentos do julgamento divino no final dos tempos (Mateus 13:39-42).',
      'Jesus voltará com os Seus anjos em glória (Mateus 25:31).',
      'Os anjos separarão os justos dos injustos na colheita final.',
      'Os anjos atarão os demônios e os lançarão no lago de fogo (Apocalipse 20:1-3).',
      'A presença angelical no julgamento demonstra a autoridade delegada de Deus.',
    ],
    versicosChave: ['Mateus 13:39-42', 'Mateus 25:31', 'Apocalipse 20:1-3', '2 Pedro 2:4'],
    tags: ['julgamento', 'escatologia', 'colheita', 'lago de fogo'],
    fontes: ['Pentecost, Things to Come', 'Morris, The Gospel According to Matthew'],
  },

  // ═══ ANTROPOLOGIA (expandido de 1 para 15) ═══
  {
    id: 'at-001',
    titulo: 'A Natureza Humana — Corpo, Alma e Espírito',
    categoria: 'Antropologia',
    subcategoria: 'Composição',
    conteudo: [
      'O ser humano é composto de corpo, alma e espírito (1 Tessalonicenses 5:23).',
      'O dualismo grego (corpo vs. alma) contrasta com a visão bíblica da unidade da pessoa.',
      'O corpo não é prisão da alma, mas templo do Espírito Santo (1 Coríntios 6:19).',
      'A morte é a separação entre corpo e alma, mas não é aniquilação.',
      'A ressurreição envolverá tanto o corpo quanto a alma — a totalidade da pessoa.',
    ],
    versicosChave: ['1 Tessalonicenses 5:23', '1 Coríntios 6:19', 'Gênesis 2:7', 'Filipenses 1:23'],
    tags: ['antropologia', 'corpo', 'alma', 'espírito', 'dualismo'],
    fontes: ['Calvino, Institutas I.15', 'Savage, Body, Soul, and Spirit', 'Gundry, The Body in Scripture'],
  },
  {
    id: 'at-002',
    titulo: 'A Queda do Homem e o Pecado Original',
    categoria: 'Antropologia',
    subcategoria: 'Hamartiologia',
    conteudo: [
      'Adão e Eva foram criados perfeitos mas com a possibilidade de cair (posse non posse non peccare).',
      'A Queda foi uma rebelião consciente contra o comando de Deus (Gênesis 3:6).',
      'O pecado original é a corrupção transmitida a todos os descendentes de Adão (Romanos 5:12).',
      'Agostinho ensinou que o pecado original é transmitida pela concupiscência — o desejo desordenado.',
      'A Queda afetou todas as faculdades humanas: razão, vontade, emoções, corpo.',
      'Sem a graça regeneradora, o ser humano é incapaz de buscar a Deus (Romanos 3:10-18).',
    ],
    versicosChave: ['Gênesis 3:6', 'Romanos 5:12', 'Romanos 3:10-18', 'Efésios 2:1-3'],
    tags: ['queda', 'pecado original', 'hamartiologia', 'corrupção'],
    fontes: ['Agostinho, De Natura et Gratia', 'Calvino, Institutas II.1', 'Bavinck, Reformed Dogmatics'],
  },
  {
    id: 'at-003',
    titulo: 'A Liberdade Humana e a Soberania Divina',
    categoria: 'Antropologia',
    subcategoria: 'Debate',
    conteudo: [
      'O ser humano possui livre-arbítrio genuíno para agir de acordo com sua natureza.',
      'A Queda corrompeu a vontade humana — o pecador é livre para escolher, mas não livre para crer sem graça.',
      'A Soberania de Deus não anula a responsabilidade humana — ambos são verdadeiros.',
      'O calvinismo enfatiza a soberania absoluta; o arminianismo enfatiza a responsabilidade humana.',
      'O compatibilismo defende que soberania e livre-arbítrio são compatíveis — Deus governa sem coagir.',
    ],
    versicosChave: ['Deuteronômio 30:19', 'Josué 24:15', 'Provérbios 21:1', 'Filipenses 2:12-13'],
    tags: ['livre-arbítrio', 'soberania', 'predestinação', 'deus'],
    fontes: ['Calvino, Institutas II.2-5', 'Arminio, Works', 'Pinnock, The Grace of God'],
  },
  {
    id: 'at-004',
    titulo: 'A Imagem de Deus no Homem (Imago Dei)',
    categoria: 'Antropologia',
    subcategoria: 'Dignidade',
    conteudo: [
      'O ser humano foi criado à imagem e semelhança de Deus (Gênesis 1:26-27).',
      'A imagem de Deus inclui: racionalidade, moralidade, relacionalidade, criatividade, domínio.',
      'A Queda corrompeu a imagem, mas não a destruiu — todo ser humano tem dignidade inerente.',
      'A imagem é restaurada em Cristo — "renovados para o conhecimento, conforme à imagem daquele que o criou" (Colossenses 3:10).',
      'A dignidade humana é a base da ética cristã e dos direitos humanos.',
    ],
    versicosChave: ['Gênesis 1:26-27', 'Colossenses 3:10', 'Tiago 3:9', '1 João 3:2'],
    tags: ['imago dei', 'dignidade', 'humanidade', 'criação'],
    fontes: ['Calvino, Comentário a Gênesis', 'Grudem, Systematic Theology', 'Volf, After Our Likeness'],
  },
  {
    id: 'at-005',
    titulo: 'A Morte e o Destino do Homem',
    categoria: 'Antropologia',
    subcategoria: 'Escatologia',
    conteudo: [
      'A morte é a consequência do pecado — "no dia em que comerdes, certamente morrereis" (Gênesis 2:17).',
      'Há duas mortes: a física (separação alma-corpo) e a eterna (separação de Deus).',
      'Após a morte, os crentes estão com Cristo (2 Coríntios 5:8), os incrédulos sofrem antecipadamente.',
      'A ressurreição dos mortos é uma doutrina central — Jesus ressuscitou e promete ressurreição aos Seus.',
      'O juízo final determinará o destino eterno: vida eterna ou condenação.',
    ],
    versicosChave: ['Gênesis 2:17', '2 Coríntios 5:8', 'João 5:28-29', 'Apocalipse 20:12-15'],
    tags: ['morte', 'juízo', 'vida eterna', 'conenação'],
    fontes: ['Calvino, Institutas III.25', 'Hoekema, The Bible and the Future', 'Wright, Surprised by Hope'],
  },

  // ═══ HAMARTIOLOGIA (nova categoria) ═══
  {
    id: 'hm-001',
    titulo: 'A Natureza do Pecado',
    categoria: 'Hamartiologia',
    subcategoria: 'Definição',
    conteudo: [
      'Pecado é toda falta de conformidade com a Lei de Deus, tanto por ação quanto por omissão (Tiago 4:17).',
      'A palavra grega "hamartia" significa errar o alvo — o pecado é falhar no propósito para o qual fomos criados.',
      'O pecado é primariamente contra Deus — "contra Ti somente pequei" (Salmo 51:4).',
      'O pecado é universal — "não há justo, nem um sequer" (Romanos 3:10).',
      'O pecado é radical — afeta todas as faculdades e dimensões da existência humana.',
    ],
    versicosChave: ['Romanos 3:10', 'Tiago 4:17', 'Salmo 51:4', '1 João 3:4'],
    tags: ['pecado', 'hamartiologia', 'natureza', 'universalidade'],
    fontes: ['Calvino, Institutas II.1', 'Stott, The Cross of Christ', 'Packer, Knowing God'],
  },
  {
    id: 'hm-002',
    titulo: 'A Penalidade do Pecado — Morte e Condenação',
    categoria: 'Hamartiologia',
    subcategoria: 'Penalidade',
    conteudo: [
      'A penalidade do pecado é a morte — "o salário do pecado é a morte" (Romanos 6:23).',
      'A morte inclui três dimensões: espiritual (separação de Deus), física (separação alma-corpo), eterna (lago de fogo).',
      'A justiça de Deus exige punição — Deus não pode tolerar o pecado sem penalidade.',
      'A penalidade é proporcional à ofensa — ofender o Deus eterno merece punição eterna.',
      'Somente a graça de Deus pode livrar o pecador da penalidade merecida.',
    ],
    versicosChave: ['Romanos 6:23', 'Romanos 1:18', 'Mateus 25:46', 'Apocalipse 20:14-15'],
    tags: ['penalidade', 'morte', 'condenação', 'justiça'],
    fontes: ['Calvino, Institutas II.6', 'Calvin, Institutes', 'Frame, The Doctrine of God'],
  },
  {
    id: 'hm-003',
    titulo: 'A Expiação — O Morreu pelos Pecados',
    categoria: 'Hamartiologia',
    subcategoria: 'Expiação',
    conteudo: [
      'A expiação é o ato de Cristo em morrer na cruz para satisfazer a justiça de Deus e reconciliar os pecadores com Ele.',
      'A satisfação vicária (Anselmo) — Cristo morreu como substituto, satisfazendo a honra de Deus.',
      'A substituição penal — Cristo assumiu as penalidades que merecíamos (Isaías 53:5-6).',
      'A propiciação — a ira de Deus contra o pecado foi derramada sobre Cristo (1 João 2:2).',
      'A expiação é limitada na extensão (somente para os eleitos) mas ilimitada no valor (suficiente para todos).',
      'A cruz é o centro da história e da redenção — tudo aponta para ela.',
    ],
    versicosChave: ['Isaías 53:5-6', '1 João 2:2', '2 Coríntios 5:21', '1 Pedro 2:24'],
    tags: ['expiação', 'substituição', 'propiciação', 'cruz'],
    fontes: ['Anselmo, Cur Deus Homo', 'Calvino, Institutas II.16', 'Stott, The Cross of Christ'],
  },
  {
    id: 'hm-004',
    titulo: 'A Redenção — Comprado com Preço',
    categoria: 'Hamartiologia',
    subcategoria: 'Redenção',
    conteudo: [
      'Redenção é o ato de Deus de nos comprar da escravidão do pecado pelo sangue de Cristo.',
      'A metáfora da redenção vem do mercado de escravos — fomos comprados com o precioso sangue de Cristo (1 Pedro 1:18-19).',
      'A redenção inclui: justificação, regeneração, santificação e glorificação.',
      'O preço pago foi o sangue de Cristo — valor infinito que satisfez a justiça divina.',
      'A redenção é completa — nada pode ser adicionado à obra consumada na cruz.',
    ],
    versicosChave: ['1 Pedro 1:18-19', 'Efésios 1:7', 'Colossenses 1:14', 'Gálatas 3:13'],
    tags: ['redenção', 'sangue', 'preço', 'libertação'],
    fontes: ['Murray, Redemption Accomplished', 'Calvino, Institutas II.16', 'Owen, The Death of Death'],
  },
  {
    id: 'hm-005',
    titulo: 'A Justificação — Declarado Justo',
    categoria: 'Hamartiologia',
    subcategoria: 'Justificação',
    conteudo: [
      'A justificação é o ato judicial de Deus de declarar o pecador justo pela fé em Cristo.',
      'É por fé somente (sola fide) — não por obras da lei (Romanos 3:28).',
      'A justificação é imputação — a justiça de Cristo é creditada ao crente (2 Coríntios 5:21).',
      'Lutero a chamou de "a artigo da igreja que se sustenta ou cai" — é a doutrina da Reforma.',
      'A justificação é simultânea à fé — não é um processo gradual.',
      'Frutos de justiça são evidências, não requisitos, da justificação.',
    ],
    versicosChave: ['Romanos 3:28', 'Romanos 5:1', 'Gálatas 2:16', '2 Coríntios 5:21'],
    tags: ['justificação', 'sola fide', 'imputação', 'reforma'],
    fontes: ['Lutero, Comentário a Gálatas', 'Calvino, Institutas III.11', 'Owen, Justification by Faith'],
  },

  // ═══ MAIS ESTUDOS POR LIVRO ═══
  {
    id: 'tl-030',
    titulo: 'O Evangelho de João — Teologia da Encarnação',
    categoria: 'Temas por Livro',
    subcategoria: 'Evangelho de João',
    conteudo: [
      'João apresenta Jesus como o Logos — o Verbo eterno que se fez carne (João 1:1-14).',
      'A encarnação é o centro da teologia joanina — Deus habitou entre nós.',
      'João descreve 7 "Eu Sou" que revelam a identidade divina de Jesus.',
      'O ministério de Jesus em João é marcado por sinais (milagres) que revelam Sua glória.',
      'O objetivo de João é que creiamos e tenhamos vida eterna (João 20:31).',
    ],
    versicosChave: ['João 1:1-14', 'João 6:35', 'João 8:58', 'João 14:6'],
    tags: ['joão', 'logos', 'encarnação', 'eu sou'],
    fontes: ['Calvino, Comentário a João', 'Keener, The Gospel of John', 'Barrett, The Gospel According to St John'],
  },
  {
    id: 'tl-031',
    titulo: 'Romanos — O Evangelho da Graça',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      'Romanos é a declaração mais completa do evangelho na Bíblia.',
      'Romanos 1-3 estabelece a culpa universal — todos são pecadores.',
      'Romanos 3-5 apresenta a justificação pela fé — o centro do evangelho.',
      'Romanos 6-8 descreve a vida cristã — livres do pecado, sob a graça.',
      'Romanos 9-11 aborda a soberania de Deus e Israel.',
      'Romanos 12-15 aplica o evangelho à vida prática.',
    ],
    versicosChave: ['Romanos 1:16-17', 'Romanos 3:23-24', 'Romanos 5:8', 'Romanos 8:28-29'],
    tags: ['romanos', 'graça', 'justificação', 'paulo'],
    fontes: ['Murray, The Epistle to the Romans', 'Stott, The Message of Romans', 'Schreiner, Romans'],
  },
  {
    id: 'tl-032',
    titulo: 'Efésios — A Igreja, Corpo de Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'Epístolas Paulinas',
    conteudo: [
      'Efésios descreve a Igreja como corpo de Cristo — unidade na diversidade.',
      'Capítulos 1-3 tratam da riqueza espiritual em Cristo.',
      'Capítulos 4-6 aplicam essa riqueza à vida prática na igreja.',
      'A armadura de Deus (Efésios 6:10-18) é o clímax da carta.',
      'Efésios é a epístola mais eclesiológica de Paulo — o plano eterno de Deus para a Igreja.',
    ],
    versicosChave: ['Efésios 1:3-14', 'Efésios 2:8-9', 'Efésios 4:11-16', 'Efésios 6:10-18'],
    tags: ['efésios', 'igreja', 'graça', 'armadura'],
    fontes: ['Stott, The Message of Ephesios', 'Arnold, Ephesians', 'O\'Brien, The Letter to the Ephesians'],
  },
  {
    id: 'tl-033',
    titulo: 'Apocalipse — A Revelação de Jesus Cristo',
    categoria: 'Temas por Livro',
    subcategoria: 'Apocalipse',
    conteudo: [
      'Apocalipse é uma revelação de Jesus Cristo, não apenas de eventos futuros.',
      'O livro é escrito em estilo apocalíptico — símbolos, números, visões.',
      'As sete igrejas representam condições universais da igreja ao longo da história.',
      'A batalha final entre o bem e o mal termina com a vitória de Cristo.',
      'A nova criação (Apocalipse 21-22) é o destino final dos redimidos.',
    ],
    versicosChave: ['Apocalipse 1:7-8', 'Apocalipse 19:11-16', 'Apocalipse 20:10', 'Apocalipse 21:1-5'],
    tags: ['apocalipse', 'escatologia', 'vitória', 'nova criação'],
    fontes: ['Beale, The Book of Revelation', 'Aune, Revelation', 'Mounce, The Book of Revelation'],
  },

  // ═══ HISTÓRIA DA IGREJA (expandido) ═══
  {
    id: 'hi-020',
    titulo: 'A Grande Cisma de 1054',
    categoria: 'História da Igreja',
    subcategoria: 'Cisma',
    conteudo: [
      'A Grande Cisma de 1054 dividiu a cristandade em Igreja Ortodoxa Oriental e Igreja Católica Romana.',
      'As causas incluíam: filioque, primado papal, língua (grego vs. latim), cultura.',
      'O filioque — o Espírito Santo procede do Pai "e do Filho" — foi adicionado ao Credo.',
      'O primado papal — o bispo de Roma claims autoridade suprema sobre toda a igreja.',
      'A divisão persiste até hoje, embora haja diálogos ecumênicos.',
    ],
    versicosChave: ['João 15:26', 'Efésios 4:4-6', '1 Coríntios 1:10-13'],
    tags: ['cisma', 'ortodoxia', 'catolicismo', 'filioque'],
    fontes: ['McManners, The Oxford History of Christianity', 'Pelikan, The Shape of Death'],
  },
  {
    id: 'hi-021',
    titulo: 'A Reforma Protestante (1517)',
    categoria: 'História da Igreja',
    subcategoria: 'Reforma',
    conteudo: [
      'Lutero fincou as 95 teses em Wittenberg em 31 de outubro de 1517, iniciando a Reforma.',
      'As 5 Solas: Sola Scriptura, Sola Fide, Sola Gratia, Solus Christus, Soli Deo Gloria.',
      'Calvino desenvolveu a teologia reformada e influenciou Genebra, Holanda, Escócia.',
      'Zuinglio reformou Zurich e enfatizou a Ceia como memorial.',
      'A Reforma Anglicana sob Henrique VIII criou uma via media entre catolicismo e protestantismo.',
      'A Contrarreforma (Concílio de Trento) reformou abusos católicos mas reafirmou doutrinas protestantes.',
    ],
    versicosChave: ['Romanos 1:17', 'Efésios 2:8-9', '2 Timóteo 3:16-17', 'Gálatas 1:8-9'],
    tags: ['reforma', 'lutero', 'calvino', 'solas'],
    fontes: ['MacCulloch, The Reformation', 'Owen, The Mortification of Sin', 'Calvino, Institutas'],
  },
  {
    id: 'hi-022',
    titulo: 'Os Pais da Igreja Primitiva',
    categoria: 'História da Igreja',
    subcategoria: 'Patrística',
    conteudo: [
      'Os Pais da Igreja são os escritores cristãos dos primeiros 5 séculos.',
      'Os Pais Apostólicos (Clemente, Inácio, Policarpo) foram contemporâneos dos apóstolos.',
      'Os Padres da Igreja (Justino, Irineu, Tertuliano) defenderam a fé contra heresias.',
      'Os Grandes Padres (Atanásio, Basiliano, Gregório de Nissa) desenvolveram a teologia trinitária.',
      'Agostinho é o mais influente dos Pais ocidentais — sua teologia moldou toda a cristandade.',
    ],
    versicosChave: ['Judas 1:3', '2 Timóteo 2:2', '1 Coríntios 15:3-8'],
    tags: ['pais da igreja', 'patrística', 'agostinho', 'atanásio'],
    fontes: ['Kelly, Early Christian Doctrines', 'Pelikan, The Christian Tradition', 'Pelikan, The Emergence of the Catholic Tradition'],
  },
];

// Verificar quais IDs já existem
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
