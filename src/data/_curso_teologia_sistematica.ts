import type { Curso } from './cursos';

export const CURSO_TEOLOGIA_SISTEMATICA: Curso = {
  id: 'teologia-sistematica',
  título: 'Teologia Sistemática: As Grandes Doutrinas da Fé',
  descrição: 'Um percurso completo pelas doutrinas centrais do cristianismo bíblico — de Deus à escatologia, com base nas Escrituras e na tradição confessional.',
  instrutor: 'Sola Scriptura',
  duração: '10 módulos · 10 aulas + avaliação',
  nível: 'avançado',
  categoria: 'Teologia Sistemática',
  certificado: true,
  módulos: [
    {
      id: 'mod-teo-biblio',
      título: 'Bibliologia',
      descrição: 'Inspiração, inerrância e canonicidade das Escrituras',
      ícone: '📖',
      aulas: [
        {
          id: 'aula-teo-1-1',
          título: 'A Palavra de Deus: Inspiração, Inerrância e Canonicidade',
          tipo: 'texto',
          duração: '18 min',
          conteúdo: `A bibliologia ocupa o lugar de honra na teologia sistemática porque toda doutrina subsequente depende da autoridade e confiabilidade das Escrituras. Sem uma bibliologia sólida, a teologia se dissolve em especulação subjetiva. Como declarou B.B. Warfield, "a inspi­ração é a doutrina de que toda a Escritura é dada por inspiração de Deus" — não meramente iluminação humana, mas uma obra sobrenatural do Espírito Santo sobre os autores sagrados, resultando em palavras que são ao mesmo tempo inteiramente humanas e inteiramente divinas.

A palavra grega "theopneustos" (θεόπνευστος), traduzida como "inspirada por Deus" em 2 Timóteo 3:16, significa literalmente "soprada por Deus". Não se trata de uma inspiração genial ou criativa, como a de um poeta, mas de uma 移動 sobrenatural pelo qual Deus comunicou exatamente o que desejava através das personalidades, vocabulários e estilos dos autores humanos. O apóstolo Pedro confirma: "homens santos falaram da parte de Deus, movidos pelo Espírito Santo" (2 Pedro 1:21). O verbo grego "phero" (φέρω) sugere ser levados, carregados — como uma vela é levada pelo vento. Os autores não foram meramente ditadores passivos, nem meramente guias iluminados; foram homens activos cujas faculdades foram sobrenaturalmente guiadas sem serem suprimidas.

A doutrina da inerrância se distingue da infalibilidade embora sejam complementares. A inerrância afirma que as Escrituras, no seu original autógrafo, não contêm erro factual, histórico ou científico. J.I. Packer, no seu clássico "Fundamentals of the Faith", argumenta que a inerrância não é uma pressuposição fundamentalista mas uma consequência lógica da doutrina da inspiração: se Deus é a fonte última da Escritura e Deus não pode errar, então a Escritura não pode errar no que afirma. A Confissão de Westminster (I.8) declara: "As Sagradas Escrituras são o único标准 absoluto, por cuja régl会被.testar-se todas as doutrinas e práticas." A Palavra de Deus é "totalmente suficiente" (sola Scriptura) para一切 necessária de fé e prática.

Spurgeon, o príncipe dos pregadores, resumiu com forceza: "A Bíblia não é uma letra morta sobre o papel; é Palavra viva de Deus, que penetra até ao fundo da alma." Ele advertiu contra o método crítico-negativo que subordina a Escritura à razão humana: "Quando a Bíblia diz 'dize o Senhor', não precisamos perguntar: 'Será mesmo?'"

A canonicidade não foi determinada por conselhos eclesiásticos arbitrários, mas reconhecida pela igreja primitiva à medida que identificava os marcadores de autenticidade apostólica, uso litúrgico, ortodoxia e poder transformador. Os 66 livros da Bíblia são o cânon fechado — não porque a igreja tenha poder para definir o cânon, mas porque o Espírito testificou à igreja sobre a authenticidade destes livros. Como enfatiza Louis Berkhof: "O cânon é a lista dos livros que Deus inspirou; a igreja não criou o cânon, reconheceu-o."

A suficiência da Escritura (sola Scriptura, não sola Scriptura) significa que as Escrituras contêm tudo o que é necessário para a salvação e para a vida cristã. Não precisamos de tradições humanas como fontes adicionais de revelação, embora as tradições históricas da igreja tenham valor subordinado para ilustrar e aplicar o que a Bíblia ensina.

Aplicação prática: A teologia sistemática começa com a Escritura e termina com a Escritura. Cada doutrina deve ser formulada, testada e vivida à luz das Escrituras. A humildade epistemológica exige que reconheçamos os limites da nossa compreensão, mas a confiança epistemológica afirma que Deus falou claramente e que a Sua Palavra é suficiente para guiarmos todas as áreas da vida.`,
          versículosChave: [
            { ref: '2 Timóteo 3:16', texto: 'Toda Escritura é theopneustos — inspirada por Deus e útil para ensinar, para redarguir, para corrigir, para instruir em justiça.' },
            { ref: '2 Pedro 1:21', texto: 'Homens santos falaram da parte de Deus, movidos pelo Espírito Santo.' },
            { ref: 'Salmo 119:105', texto: 'Lâmpada para os meus pés é tua Palavra e luz para o meu caminho.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-deus',
      título: 'Teologia Própria (Deus)',
      descrição: 'Monoteísmo, Trindade, atributos divinos e decretos eternos',
      ícone: '✝️',
      aulas: [
        {
          id: 'aula-teo-2-1',
          título: 'O Deus Triúno: Natureza, Atributos e Decretos',
          tipo: 'texto',
          duração: '18 min',
          conteúdo: `A teologia própria (theologia propera) é o estudo de Deus em Si mesmo — Sua natureza, atributos e relación interna. O ponto de partida é a auto-revelação de Deus nas Escrituras: "Eu sou o que sou" (Êxodo 3:14). Esta declaração, o Tetragrama YHWH, afirma a auto-existência, autosuficiência e imutabilidade de Deus.

O monoteísmo bíblico é radical: "Ouve, Israel: YHWH Elohim, YHWH echad" (Deuteronômio 6:4). O Shema é o confession de fé mais antigo de Israel — um Deus, não muitos. Mas o Novo Testamento revela que este "echad" (אחד — um) é composto de três pessoas divinas distinctas. O Concílio de Niceia (325 d.C.) formulou o termo "homoousios" (ὁμοούσιος — da mesma substância) contra o arianismo, que negava a plena divindade do Filho. A Confissão de Westminster (II.3) declara: "Na unidade da divindade há três pessoas de uma só substância, poder e eternidade — Deus Pai, Deus Filho e Deus Espírito Santo."

João Calvino, nas suas Institutas (I.13.2), escreveu: "A Trindade é o mistério mais sublime que pode ser pensado ou desejado pela mente humana. Não devemos perguntar como pode ser, mas contentarmo-nos com saber que é." Calvino insistia que o conhecimento de Deus não é abstração filosófica mas conhecimento relacional: "Aquele que crê, não crê numa doutrina, mas em Deus."

Os atributos divinos são aquilo que Deus é em Si mesmo. A tradição reformada distingue atributos absolutos (aquilo que Deus é sem referência à criação: eternidade, infinitude, imutabilidade, simplicidade) e atributos relativos (aquilo que Deus é em relação à criação: soberania, bondade, justiça, misericórdia). A soberania de Deus é absoluta: "O Senhor estabeleceu o Seu trono e o Seu reino domina sobre todos" (Salmo 103:19). A justiça de Deus é perfeita: "O Juiz de toda a terra não fará justiça?" (Gênesis 18:25).

Os decretos eternos de Deus são o plano soberano e imutável pelo qual Ele predeterminou tudo o que vai acontecer, de acordo com a Sua vontade soberana, para a Sua glória. A Confissão de Westminster (III.1) declara: "Deus, desde a eternidade, decidiu livre e imutavelmente tudo o que vai acontecer." Estes decretos não são fatalismo pagão — Deus decreta livremente, não por necessidade externa. O decreto da eleição (Efésios 1:4-5) e o decreto da reprovação (Romanos 9:22) são expressões da soberania divina. Como Calvin declarou nas Institutas (III.21.5): "A eleição é o eterno decreto de Deus, pelo qual Ele determinou consigo mesmo o que fará de cada um dos homens. Pois não são todos criados na mesma condição, mas uns são destinados à vida e outros à morte eterna."

A un hipostática união de Deus e homem em Cristo (Cristologia) depende destas bases teológicas. Se Deus não é verdadeiro Deus, Cristo não pode salvar. Se Deus não é verdadeiro homem, Cristo não pode representar-nos. A Trindade é o fundamento da salvação: o Pai planeja, o Filho executa, o Espírito aplica.

Aplicação prática: O conhecimento de Deus não é curiosidade intelectual — é o fundamento da vida cristã. "A vida eterna é que te conheçam a ti, o único Deus verdadeiro, e a Jesus Cristo, a quem enviaste" (João 17:3). Conhecer Deus é adorar, confiar e obedecer.`,
          versículosChave: [
            { ref: 'Deuteronômio 6:4', texto: 'YHWH Elohim, YHWH echad — O Senhor nosso Deus é um Senhor.' },
            { ref: 'Mateus 28:19', texto: 'Batizando-os em nome do Pai, do Filho e do Espírito Santo.' },
            { ref: 'Efésios 1:4-5', texto: 'Nele nos escolheu antes da fundação do mundo, predestinando-nos.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-cristo',
      título: 'Cristologia',
      descrição: 'A pessoa e obra de Cristo: união hipostática, ofícios e satisfiação',
      ícone: '🐑',
      aulas: [
        {
          id: 'aula-teo-3-1',
          título: 'A Pessoa e Obra de Jesus Cristo',
          tipo: 'texto',
          duração: '18 min',
          conteúdo: `A cristologia é o coração da teologia cristã. Sem Cristo, não há cristianismo. O Concílio de Calcedônia (451 d.C.) definiu a união hipostática: "Uma só pessoa e duas naturezas, sem confusão, sem mudança, sem divisão, sem separação." A fórmula calcedoniana distingue quatro heresias: o apolinarismo (Cristo não tinha mente humana), o eutiquianismo (as duas naturezas se confundiam), o nestorianismo (Cristo eram duas pessoas) e o docetismo (Cristo parecia apenas humano).

Francis Turretin, o grande escolástico reformado, escreveu nas suas "Elenctic Theology": "A pessoa de Cristo é o ponto central de toda a religião cristã. Pois se errarmos aqui, erramos em tudo." Turretin insistia que a comunicação de propriedades (communicatio idiomatum) é legítima: aquilo que é verdadeiro de uma natureza pode ser predicado da pessoa inteira. Portanto, podemos dizer que Deus morreu na cruz (Atos 20:28), porque a pessoa que morreu era Deus.

João 1:1-14 é o texto cristológico mais denso do Novo Testamento: "No princípio era o Logos (λόγος), e o Logos estava com Theos, e o Logos era Theos." O verbo "ēn" (ἦν — imperfeito, indicando existência contínua) demonstra a pre-existência eterna do Filho. O Filho não começou a existir em Belém — Ele existiu sempre. "Antes que Abraão existisse, Eu sou" (João 8:58). O "ego eimi" (ἐγώ εἰμι) é uma referência explícita ao nome divino de Êxodo 3:14.

A obra de Cristo é descrita em três ofícios proféticos, sacerdotais e régios. Como Profeta, Cristo é a revelação suprema de Deus (Hebreus 1:1-2). Como Sacerdote, Ele ofereceu a Si mesmo como sacrifício único e perfeito (Hebreus 9:12 — "entrou uma vez por todas no Santo dos Santos, não pelo sangue de bodes e bezerros, mas pelo seu próprio sangue"). Como Rei, Ele governa com autoridade total (Efésios 1:20-22).

A doutrina da satisfação vicária (satisfação substitutionária) ensina que Cristo morreu na cruz como substituto pelos seus eleitos. Isaías 53:5-6 é o texto fundamental: "Ele foi traspassado pelas nossas transgressões, e moído pelas nossas iniquidades; o castigo que nos traz a paz caiu sobre ele, e pelas suas pisaduras fomos sarados." A Confissão de Westminster (VIII.5) declara: "O Senhor Jesus, pela sua obediência perfeita e sacrifício de si mesmo, que foi uma vez por todas feito na cruz, satisfez plenamente a justiça de Deus e comprou uma reconciliação eterna para todos os seus eleitos."

Spurgeon, pregando sobre Isaías 53, exclamou: "Cristo sofreu o que nós merecíamos para que recebêssemos o que Ele merece." A substituição é o âmago do evangelho: o justo pelos injustos (1 Pedro 3:18).

Aplicação prática: O cristão vive com base na obra acabada de Cristo. Não há mérito humano que possa acrescentar à perfeita satisfação de Cristo. A justificação é por fé alone, pela obra de Cristo alone, conforme a Escritura alone.`,
          versículosChave: [
            { ref: 'João 1:1', texto: 'No princípio era o Logos, e o Logos estava com Deus, e o Logos era Deus.' },
            { ref: 'Hebreus 9:12', texto: 'Entrou uma vez por todas no Santo dos Santos, não pelo sangue de bodes, mas pelo seu próprio sangue.' },
            { ref: 'Filipenses 2:6-8', texto: 'Que, subsistindo em forma de Deus, não teve por usurpação ser igual a Deus, mas esvaziou-se a si mesmo.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-espirito',
      título: 'Pneumatologia',
      descrição: 'A pessoa e obra do Espírito Santo na salvação e na vida da igreja',
      ícone: '🕊️',
      aulas: [
        {
          id: 'aula-teo-4-1',
          título: 'A Pessoa e Obra do Espírito Santo',
          tipo: 'texto',
          duração: '18 min',
          conteúdo: `A pneumatologia é a doutrina do Espírito Santo, a terceira Pessoa da Trindade. Ainda que frequentemente negligenciada na história da igreja, o Espírito Santo é o agente vivo de Deus no mundo hoje. João Calvino, nas Institutas (I.13.14), denominou o Espírito como "o testemunho interior" que confirma a Palavra de Deus e regenera o coração humano.

O Espírito Santo é Pessoa, não uma força impessoal. A evidência bíblica é abundante: O Espírito pode ser entristecido (Efésios 4:30 — "não entristeçeis o Espírito Santo de Deus"), pode ser mentido (Atos 5:3-4 — "mentiste ao Espírito Santo... não foste mentindo aos homens, mas a Deus"), tem vontade própria (1 Coríntios 12:11 — "tudo isto opera um e o mesmo Espírito, repartindo particularmente a cada um como quer"), e fala (Atos 13:2 — "Disse o Espírito Santo: Apartai-me Barnabé e Saulo para a obra a que os chamei").

A palavra "Parakletos" (παράκλητος), traduzida como "Paráclito" ou "Consolador" em João 14:16, significa literalmente "chamado ao lado" — um advogado, um defensor, um assistente. Jesus prometeu: "Eu pedirei ao Pai, e ele vos dará outro Paráclito, para que fique convosco para sempre" (João 14:16). O "outro" (allos, não heteros) indica natureza idêntica: o Espírito é da mesma divindade que o Filho.

A obra do Espírito é vasta e multifacetada. A regeneração (paliggenésia — παλιγγενεσία, "novo nascimento") é a obra soberana do Espírito que traz vida espiritual ao coração morto. Jesus disse: "Deveis nascer de novo" (João 3:7). A regeneração não é cooperação — é monergismo divino: "Assim é todo o que nasceu do Espírito" (João 3:8). O teólogo reformado John Murray escreveu: "A regeneração é obra de Deus sem cooperação humana, porque o homem espiritualmente morto não pode cooperar."

A iluminação é a obra do Espírito que capacita o crente a entender as Escrituras. "O Espírito de verdade vos guará para toda a verdade" (João 16:13). Sem a iluminação, a Bíblia permanece letra morta. Owen, no "The Holy Spirit", escreveu: "O Espírito de Deus é o único professor competente das coisas de Deus."

O fruto do Espírito (Gálatas 5:22-23) é a evidência da obra transformadora do Espírito. Nota-se que é "fruto" (singular) — não "frutos" — indicando uma realidade unificada manifestada em múltiplas expressões: amor (agape), gozo (chara), paz (eirene), longanimidade (makrothumia), benignidade (chrēstotēs), bondade (agathōsynē), fé (pistis), mansidão (praÿtēs), temperança (enkrateia).

A unção do Espírito (crisma — χρίσμα) capacita os crentes para testemunho e serviço. "A unção que recebestes dele permanece em vós" (1 João 2:27). Esta unção é distinta dos dons espirituais (charismata) que eram mais evidentes na era apostólica.

A intercessão do Espírito é um dos ministérios mais comfortantes: "O próprio Espírito intercede por nós com gemidos indizíveis" (Romanos 8:26). O Espírito ora por nós quando não sabemos orar, alinhando os nossos desejos com a vontade de Deus.

Aplicação prática: "Enchei-vos do Espírito" (Efésios 5:18) não é um evento único mas uma realidade contínua de submissão ao Espírito. A vida cristã sem a dependência consciente do Espírito é mero formalismo religioso. O Espírito é quem produz santidade, não o esforço humano isolado.`,
          versículosChave: [
            { ref: 'João 14:26', texto: 'O Espírito Santo vos ensinará todas as coisas e vos fará lembrar de tudo o que vos tenho dito.' },
            { ref: 'Romanos 8:26', texto: 'O próprio Espírito intercede por nós com gemidos indizíveis.' },
            { ref: 'Gálatas 5:22-23', texto: 'O fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-antropologia',
      título: 'Antropologia e Hamartiologia',
      descrição: 'A natureza humana, a imagem de Deus e a realidade do pecado',
      ícone: '🪞',
      aulas: [
        {
          id: 'aula-teo-5-1',
          título: 'A Imagem de Deus, a Queda e o Pecado Original',
          tipo: 'texto',
          duração: '18 min',
          conteúdo: `A antropologia teológica estuda o ser humano à luz da revelação divina. O ponto de partida é a criação: "Deus criou o homem à sua imagem; à imagem de Deus o criou; macho e fêmea os criou" (Gênesis 1:27). A "imago Dei" (צלם אלהים) é a doutrina que distingue radicalmente o cristianismo de qualquer antropologia naturalista.

A imagem de Deus inclui, pelo menos, três dimensões. A dimensão relacional: Deus é comunitário em Si mesmo (Trindade), e o ser humano foi criado para comunhão — com Deus e com os outros. A dimensão moral: o ser humano tem consciência, discernimento entre o bem e o mal, e responsabilidade moral. A dimensão racional: capacidade de pensamento abstrato, linguagem, criatividade e domínio responsável sobre a criação. John Frame, na sua "The Doctrine of the Christian Life", argumenta que a imagem de Deus inclui a capacidade de exercer autoridade representativa — o ser humano como vice-regente de Deus na criação.

A queda (Queda de Adão em Gênesis 3) corrompeu profundamente a natureza humana mas não a destruiu. A doutrina da depravação total, correctamente entendida, não significa que o ser humano seja tão mau quanto poderia ser, mas que cada aspecto da sua natureza — razão, vontade, emoções, desejo — foi afetado pelo pecado. Agostinho, nos "Confissões", escreveu: "O desejo desordenado é a causa de todo o pecado. O amor desordenado é a causa de toda a miséria humana." A concupiscência (concupiscentia) — a tendência inata para o pecado — permeia toda a existência humana.

Jonathan Edwards, no "Freedom of the Will", demonstrou que o pecador, antes da regeneração, é genuinamente livre para fazer o que deseja — mas os seus desejos estão tão corrompidos que nunca escolhe livremente a Deus. O pecado original (peccatum originans de Adão, peccatum originatum em nós) é transmitido a toda a humanidade: "Pelo pecado de um só, a morte entrou no mundo" (Romanos 5:12). Agostinho insistiu, contra Pelágio: "Ninguém nasce sem o pecado original; ninguém é baptizado sem o pecado; apenas o perdão os cobre."

A queda explicou o mal no mundo sem culpar Deus. A culpa é do pecado humano, não do Criador. A depravação total não é impotência total — o homem ainda é responsável pelos seus atos porque a responsabilidade acompanha a capacidade de escolher. Mas a capacidade de escolher o bem espiritual está completamente perdida sem a graça regeneradora do Espírito.

Aplicação prática: O reconhecimento da depravação total não é pessimismo — é realismo que torna a graça necessária e gloriosa. Sem pecado grave, a cruz é desnecessária. Sem depravação total, a regeneração é dispensável. A teologia do pecado é o fundamento para a apreciação da graça salvadora.`,
          versículosChave: [
            { ref: 'Gênesis 1:27', texto: 'Deus criou o homem à sua imagem; à imagem de Deus o criou.' },
            { ref: 'Romanos 3:23', texto: 'Todos pecaram e estão destituídos da glória de Deus.' },
            { ref: 'Romanos 5:12', texto: 'Pelo pecado de um só, a morte entrou no mundo; e pela morte passou a todos os homens.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-soteriologia',
      título: 'Soteriologia',
      descrição: 'Eleição, expiação, justificação, regeneração e santificação',
      ícone: '⚖️',
      aulas: [
        {
          id: 'aula-teo-6-1',
          título: 'As Grandes Doutrinas da Salvação',
          tipo: 'texto',
          duração: '18 min',
          conteúdo: `A soteriologia é o estudo da salvação — o tema central da Bíblia e da teologia cristã. A palavra grega "sōtēria" (σωτηρία) abrange todo o alcance da obra redentora de Deus, desde o decreto eterno da eleição até a glorificação final.

A eleição é o decreto soberano de Deus, antes da fundação do mundo, de escolher certos indivíduos para a salvação. A Confissão de Westminster (III.5) declara: "Deus, de entre a massa dos homens pecadores, escolheu em Cristo alguns para a vida eterna e os predestinou." Romanos 9:11-13 é o texto fundamental: "Não depende do desejo nem do esforço humano, mas de Deus, que tem misericórdia." A eleição é incondicional — não baseada na fé prevista ou em qualquer mérito humano — e é "para louvor da glória da Sua graça" (Efésios 1:6).

A expiação limitada (ou redenção particular) afirma que Cristo morreu eficazmente pelos seus eleitos. Mateus 1:28 declara: "O Filho do Homem veio dar a sua vida em resgate por muitos." A Confissão de Westminster (VIII.8) afirma: "A morte do Filho de Deus foi sacrifício e satisfação plena pelo pecado." Spurgeon, pregando, disse: "Se Cristo morreu por todos, então o inferno está cheio de pessoas pelas quais Ele morreu — o que é blasfêmia. Cristo morreu pelos seus eleitos, e a sua morte não foi vã."

A justificação é a declaração judicial de Deus, baseada na justiça imputada de Cristo, pela qual o pecador é declarado justo. Romanos 5:1 é o versículo chave: "Sendo, pois, justificados pela fé, temos paz com Deus." A justificação é forense (forensis — judicial): Deus não nos torna justos internamente nesse momento, mas declara-nos justos com base na justiça de Cristo que nos é imputada. Lutero, no prefácio de Romanos, escreveu: "A justiça de Deus é a justiça passiva, pela qual Deus nos justifica pela fé, sem obras."

A regeneração é a obra monérgica do Espírito Santo que traz vida espiritual ao coração espiritualmente morto. João 3:5-6: "Deveis nascer da água e do Espírito... o que nasce da carne é carne, e o que nasce do Espírito é espírito." A regeneração precede a fé — é a causa, não o efeito, da crença. Packer, em "Knowing God", escreveu: "A regeneração é um ato soberano de Deus que não depende de cooperação humana prévia."

A santificação é o processo contínuo pelo qual o crente é transformado à imagem de Cristo. 2 Coríntios 3:18: "Nós todos, com rosto descoberto, contemplando como num espelho a glória do Senhor, somos transformados de glória em glória na mesma imagem." A santificação é colaborativa: Deus opera (Phil. 2:13 — "Deus é quem opera em vós tanto o querer como o efetuar, para o Seu bom contentamento") e o crente obedece (Filipenses 2:12 — "Operai a vossa salvação com temor e tremendo"). A perseverança dos santos (perseverantia sanctorum) é o ensino de que todos os verdadeiramente regenerados perseverarão até o fim, não por mérito próprio mas pela fidelidade de Deus (João 10:28-29 — "Ninguém vos arrancará da minha mão").

Aplicação prática: A salvação é uma graça monérgica de Deus — o Pai planeja, o Filho redime, o Espírito aplica. Não há mérito humano na salvação. Isto produz humildade no crente e glorifica a Deus. "Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus" (Efésios 2:8).`,
          versículosChave: [
            { ref: 'Efésios 1:4-5', texto: 'Nele nos escolheu antes da fundação do mundo, predestinando-nos para filhos adotivos.' },
            { ref: 'Romanos 5:1', texto: 'Sendo justificados pela fé, temos paz com Deus.' },
            { ref: 'Efésios 2:8', texto: 'Pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-igreja',
      título: 'Eclesiologia',
      descrição: 'A natureza da igreja, sacramentos e governo eclesiástico',
      ícone: '⛪',
      aulas: [
        {
          id: 'aula-teo-7-1',
          título: 'A Natureza da Igreja: Sacramentos, Governo e Missão',
          tipo: 'texto',
          duração: '18 min',
          conteúdo: `A eclesiologia é o estudo da igreja. A palavra grega "ekklēsia" (ἐκκλησία) significa "assembleia convocada" — a convocação de Deus, o povo de Deus reunido. A Confissão de Westminster (XXV.1) declara: "A igreja católica visível é o conjunto de todos os que professam a fé em Cristo e o culto a Deus, e que são regimentados pelo seu santo evangelho."

A tradição reformada distingue a igreja visível e a igreja invisível. A invisível é todos os verdadeiramente regenerados, conhecidos apenas por Deus. A visível é a comunidade congregacional que professa a fé e administra os sacramentos. Nenhuma igreja visível é perfeita — todas contêm tanto trigo quanto joio (Mateus 13:24-30) até o juízo final.

B.B. Warfield, no "The Church and the State", argumentou que a eclesiologia reformada se distingue por enfatizar a soberania de Deus na constituição da igreja. A igreja não é uma organização humana — é a coluna e sustentáculo da verdade (1 Timóteo 3:15). Hodge, nos seus "Systematic Theology", definia a igreja como "a congregação dos fiéis que professam a religião cristã e que se reúnem para adorar a Deus e administrar os sacramentos."

Os sacramentos são sinais visíveis das promessas invisíveis de Deus. A Confissão de Westminster (XXVII.1) declara: "Os sacramentos foram instituídos por Cristo não apenas como um sinal vazio, mas como um selo que nos assegura e significa a graça de Deus." Batismo e Ceia do Senhor são os dois sacramentos reconhecidos pela tradição reformada.

O batismo (baptisma — βάπτισμα) é o sinal de entrada na aliança da graça. A fórmula tripartida de Mateus 28:19 ("batizando-os em nome do Pai, do Filho e do Espírito Santo") vincula o batismo à Trindade. A Confissão de Westminster (XXVIII.1) ensina que o batismo "não é apenas um simples sinal de profissão" mas um sinal e selo da aliança da graça. A questionamento sobre a validade do batismo (credobatismo vs pedobatismo) é uma questão de teologia da aliança: se a aliança inclui os filhos dos crentes como membros da aliança, então o batismo é aplicado aos filhos como sinal da promessa.

A Ceia do Senhor é o memorial da morte de Cristo e antecipação da Sua segunda vinda. 1 Coríntios 11:23-26: "Toda vez que comerdes este pão e beberdes este cálice, anunciais a morte do Senhor até que Ele venha." A presença de Cristo na Ceia é espiritual — Ele está presente pelo Espírito, não na substância do pão e do vinho (contra a transubstanciação católica e a consubstanciação luterana). Calvino escreveu: "O pão e o vinho são sinais visíveis de uma realidade espiritual invisível; Cristo alimenta os crentes espiritualmente pela fé."

O governo da igreja é um tema de intensa discussão na história cristã. A tradição reformada favorece o presbiterianismo: a igreja é governada por presbíteros (anciãos) eleitos pela congregação, formando sessões e presbitérios. A Confissão de Westminster (XXXI) estabelece a autoridade dos concílios e o direito de apelação. Warfield argumentava que o modelo bíblico é de governança colegial, não monárquica.

A missão da igreja é a Grande Comissão: "Ide, fazei discípulos de todas as nações, batizando-os e ensinando-os a guardar todas as coisas que vos tenho mandado" (Mateus 28:19-20). A missão é integral — evangelização, discipulado, justiça social e misericórdia.

Aplicação prática: A igreja não é um clube social nem uma empresa — é a família de Deus, o corpo de Cristo, a noiva do Cordeiro. Participar da igreja é participar do propósito eterno de Deus. "Não deixeis de reunir-vos" (Hebreus 10:25).`,
          versículosChave: [
            { ref: 'Mateus 28:19-20', texto: 'Ide, fazei discípulos de todas as nações, batizando-os e ensinando-os a guardar todas as coisas.' },
            { ref: '1 Coríntios 11:26', texto: 'Toda vez que comerdes este pão e beberdes este cálice, anunciais a morte do Senhor até que Ele venha.' },
            { ref: 'Efésios 5:25', texto: 'Cristo amou a igreja e a si mesmo se entregou por ela.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-escatologia',
      título: 'Escatologia',
      descrição: 'Segunda vinda, ressurreição, juízo final, céu e inferno',
      ícone: '⏳',
      aulas: [
        {
          id: 'aula-teo-8-1',
          título: 'As Últimas Coisas: Segunda Vinda, Ressurreição e Juízo Final',
          tipo: 'texto',
          duração: '18 min',
          conteúdo: `A escatologia (escatos — ἔσχατος, "último") é o estudo das últimas coisas. A doutrina escatológica não é especulação futurista mas esperança concreta que molda a vida presente. A Confissão de Westminster (XXXIII.1) declara: "Deus há de, no dia determinado, que somente Ele conhece, chamar todos os homens perante o tribunal de Cristo, para que cada um receba conforme as suas obras."

A segunda vinda de Cristo é uma das doutrinas mais enfatizadas no Novo Testamento. Atos 1:11: "Este mesmo Jesus, que vos foi elevado para o céu, virá do mesmo modo que o vistes ir para o céu." A vinda será pessoal (Cristo mesmo), visível ("todo o olho O verá" — Apocalipse 1:7), gloriosa (com anjos e poder — Mateus 25:31), e inesperada (como um ladrão — 1 Tessalonicenses 5:2). Hoekema, no "The Bible and the Future", argumenta que a segunda vinda é a consumação de toda a história: "A retorno de Cristo é o acontecimento central da história humana, o ponto culminante para o qual toda a criação se dirige."

A ressurreição dos mortos é uma doutrina essencial. 1 Coríntios 15:42-44: "Assim é a ressurreição dos mortos. É semeado em corrupção, ressuscitará em incorrupção; é semeado em desonra, ressuscitará em glória; é semeado em fraqueza, ressuscitará em poder; é semeado corpo natural, ressuscitará corpo espiritual." O corpo ressurreto não é o corpo atual meramente restaurado, mas transformado — glorificado como o corpo de Cristo ressurreto (Filipenses 3:21).

A Confissão de Westminster (XXXII) declara: "No último dia, os que se acham vivos não serão transformados, mas serão todos transformados; e os que já tiverem morrido serão ressuscitados com os mesmos corpos, embora não com os mesmos qualidades." A ressurreição corporal é essencial — não é sobrevivência espiritual apenas, mas a redenção do corpo (Romanos 8:23).

O juízo final é descrito em Mateus 25:31-46. "Quando o Filho do Homem vier na Sua glória e todos os anjos com Ele, então se assentará no trono da Sua gloria." O juízo não é meramente de obras, mas de fé: "Estas irão para o suplício eterno, mas os justos para a vida eterna" (Mateus 25:46). A Confissão de Westminster (XXXIII.2) declara: "Deus estabeleceu o dia de juízo para que se manifeste a justiça de todos os Seus juízos."

O céu (ou a bem-aventurança dos santos) é a presença eterna de Deus. Apocalipse 21:3: "Eis o tabernáculo de Deus com os homens, e Ele habitará com eles." O céu não é apenas um lugar, mas um estado de comunhão perfeita com Deus. A nova criação (Apocalipse 21:1 — "Vi um novo céu e uma nova terra") não é destruição mas renovação: "Eis que faço novas todas as coisas" (Apocalipse 21:5). Hoekema argumenta que a renovação cósmica é tão importante quanto a salvação individual: "Deus não descarta a criação — Ele a renova."

O inferno (ou a condenação eterna) é descrito como "fogo eterno" (Mateus 25:41) e "esterno" (éxeleusthēsetai — será cortado fora). A doutrina do inferno é a doutrina mais impopular do cristianismo, mas é ensinada por Jesus mais do que por qualquer outro personagem bíblico. A Confissão de Westminster (XXXIII.2) declara que os ímpios "serão lançados no inferno eterno, para serem punidos com uma perdição eterna."

Aplicação prática: A escatologia não é curiosidade profética — é esperança prática. "Enquanto é dia, devemos trabalhar" (João 9:4). A certeza da segunda vinda motiva santidade, urgência missionária e esperança na adversidade.`,
          versículosChave: [
            { ref: '1 Tessalonicenses 4:16-17', texto: 'O próprio Senhor descerá do céu com clamor... os mortos em Cristo ressuscitarão primeiro; depois, nós os que vivemos seremos arrebatados juntamente com eles.' },
            { ref: '1 Coríntios 15:42-44', texto: 'Assim é a ressurreição dos mortos. É semeado em corrupção, ressuscitará em incorrupção.' },
            { ref: 'Apocalipse 21:4', texto: 'Deus enxugará toda lágrima dos seus olhos; e a morte não haverá mais.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-etica',
      título: 'Ética Cristã',
      descrição: 'Lei e graça, santidade prática e a vida da fé',
      ícone: '📖',
      aulas: [
        {
          id: 'aula-teo-9-1',
          título: 'Lei e Graça: A Vida Cristã na Dependência do Espírito',
          tipo: 'texto',
          duração: '18 min',
          conteúdo: `A ética cristã não é um sistema moral autônomo mas o fruto natural da graça que salva. Tito 2:11-12 declara: "A graça de Deus se manifestou para a salvação de todos os homens, ensinando-nos que, renunciando à impiedade e aos desejos mundanos, vivamos neste presente século sóbria, justa e piedosamente." A graça não dispensa a obediência — ela a torna possível e agradável.

A relação entre Lei e Graça é um dos temas centrais do Novo Testamento, particularmente na epístola aos Gálatas. Paulo pergunta: "Pela fé, anulamos a Lei?" E responde: "De modo nenhum! Pelo contrário, firmamos a Lei" (Romanos 3:31). Jesus não aboliu a Lei moral — cumpriu-a (Mateus 5:17). O que mudou com a vinda de Cristo não é a obrigação moral, mas a base da obediência: obedecemos porque fomos salvos, não para nos salvarmos. A Lei como spurius pedagogus (mestre que acusa) continua valendo para condenar o pecado, mas agora o crente está "sob a graça e não sob a Lei" no sentido de não estar sob a condenação da Lei (Romanos 6:14).

O Decálogo (Êxodo 20) continua sendo a base da ética cristã. Os reformadores distinguiam três usos da Lei: o uso civil (restringir o pecado), o uso teológico (convencer de pecado) e o uso didático (guia para a vida do crente). A Confissão de Westminster (XIX.5-6) declara: "Embora os verdadeiros crentes não estejam sob a Lei como covenant de obras, ela é-lhes de grande utilidade e proveito, como regra de vida que lhes revela a vontade de Deus e os deveres que lhes incumbe."

A obediência cristã nasce da gratidão, não do medo. Romanos 12:1: "Apresentai os vossos corpos em sacrifício vivo, santo e agradável a Deus, que é o vosso culto racional." O "logikēn" (λογικόν — racional, lógico, espiritual) culto é aquele que é fruto da mente renovada. "Não vos conformeis com este mundo, mas transformai-vos pela renovação do vosso entendimento" (Romanos 12:2).

As virtudes cristãs são o fruto do Espírito manifestado na vida. A fé, a esperança e o amor (1 Coríntios 13:13) são as virtudes teologais. A justiça, a temperança, a fortaleza e a sabedoria são as virtudes cardinais. Gálatas 5:22-23 enumera o fruto do Espírito: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão e temperança. Estas não são conquistas morais humanas mas frutos do Espírito que opera no crente.

A ética cristã abrange todas as áreas da vida: família (Efésios 5:21-6:4), trabalho (Colossenses 3:23-24), governo (Romanos 13:1-7), justiça social (Provérbios 14:31 — "Quem oprime o pobre zomba do seu Criador"), e vocação. Calvino, nos seus comentários sobre 1 Coríntios, enfatizava que toda a vida é "coram Deo" — diante de Deus. Não há áreas neutras da existência: tudo é para a glória de Deus (1 Coríntios 10:31).

Aplicação prática: A ética cristã não é legalismo nem permissividade. É a vida que flui da graça que salva e do Espírito que guia. "Onde está o Espírito do Senhor, aí há liberdade" (2 Coríntios 3:17). Liberdade não é licença para pecar — é capacidade de amar e servir.`,
          versículosChave: [
            { ref: 'Romanos 6:14', texto: 'Pois não estais sob a Lei, mas sob a graça.' },
            { ref: 'Gálatas 5:22-23', texto: 'O fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança.' },
            { ref: 'Tito 2:11-12', texto: 'A graça de Deus se manifestou, ensinando-nos a viver sóbria, justa e piedosamente.' },
          ],
        },
      ],
    },
    {
      id: 'mod-teo-avaliacao',
      título: 'Avaliação Final',
      descrição: 'Quiz de avaliação — 12 perguntas sobre teologia sistemática avançada',
      ícone: '🏆',
      aulas: [
        {
          id: 'aula-teo-quiz-final',
          título: 'Avaliação Final — Teologia Sistemática',
          tipo: 'quiz',
          duração: '20 min',
          perguntas: [
            {
              id: 'teo-q1',
              pergunta: 'A palavra grega "theopneustos" (θεόπνευστος) em 2 Timóteo 3:16 significa:',
              opções: ['Escrito por homens sábios', 'Inspirado por Deus — soprado por Deus', 'Apenas um livro antigo de sabedoria', 'Ditado sem uso da personalidade humana'],
              respostaCorreta: 1,
              explicação: 'Theopneustos significa "soprada por Deus". A inspiração não é mera ditada, mas o Espírito guiando os autores de forma sobrenatural, mantendo as suas personalidades e estilos.',
            },
            {
              id: 'teo-q2',
              pergunta: 'A fórmula do Concílio de Niceia (325 d.C.) usou o termo "homoousios" (ὁμοούσιος) para afirmar que o Filho:',
              opções: ['É uma criação de Deus Pai', 'É da mesma substância que o Pai', 'É uma manifestação temporal do Pai', 'Tem uma natureza diferente do Pai'],
              respostaCorreta: 1,
              explicação: 'Homoousios significa "da mesma substância". Niceia contra-argumentou o arianismo, que ensinava que o Filho era uma criatura. O Filho é co-eterno e co-igual ao Pai.',
            },
            {
              id: 'teo-q3',
              pergunta: 'A doutrina da depravação total, corretamente entendida, afirma que:',
              opções: ['O ser humano é tão mau quanto pode ser', 'Cada aspecto da natureza humana é afetado pelo pecado, mas a responsabilidade moral continua', 'O livre-arbítrio foi completamente destruído', 'Deus não criou o ser humano bom'],
              respostaCorreta: 1,
              explicação: 'Depravação total significa que o pecado afeta toda a pessoa — mente, vontade, emoções — mas não que o ser humano seja tão mau quanto possível. A responsabilidade moral permanece.',
            },
            {
              id: 'teo-q4',
              pergunta: 'A justificação na teologia reformada é:',
              opções: ['Um processo gradual de transformação moral', 'Uma declaração judicial de justiça baseada na justiça imputada de Cristo', 'A concessão de mérito humano por obras', 'A fusão da natureza divina com a humana no crente'],
              respostaCorreta: 1,
              explicação: 'A justificação é forense — uma declaração judicial. Deus declara o pecador justo com base na justiça de Cristo que lhe é imputada pela fé. É instantânea, não gradual.',
            },
            {
              id: 'teo-q5',
              pergunta: 'A regeneração, ensinada em João 3:5-6, é:',
              opções: ['Uma decisão humana de seguir a Deus', 'Uma obra monérgica do Espírito Santo que traz vida espiritual ao coração morto', 'O baptismo em água como meio de salvação', 'Uma melhoria moral pela educação religiosa'],
              respostaCorreta: 1,
              explicação: 'A regeneração é monérgica — operação exclusiva do Espírito. O homem espiritualmente morto não pode cooperar. "O que nasce do Espírito é espírito" (João 3:6).',
            },
            {
              id: 'teo-q6',
              pergunta: 'A expiação limitada, na tradição reformada, afirma que:',
              opções: ['Cristo morreu apenas pelos pecados leves', 'Cristo morreu eficazmente pelos seus eleitos, não por todos indiscriminadamente', 'A expiação é apenas um símbolo', 'Cristo morreu apenas para perdoar pecados passados'],
              respostaCorreta: 1,
              explicação: 'A expiação limitada (ou redenção particular) ensina que Cristo morreu pelos seus eleitos de forma eficaz. A sua morte não foi vã — alcançou o seu propósito pleno.',
            },
            {
              id: 'teo-q7',
              pergunta: 'A união hipostática, definida no Concílio de Calcedônia (451 d.C.), afirma que Cristo:',
              opções: ['Tem apenas natureza divina', 'Tem apenas natureza humana', 'Tem duas naturezas — divina e humana — sem confusão, mudança, divisão ou separação', 'Sucessivamente era divino e humano'],
              respostaCorreta: 2,
              explicação: 'Calcedônia definiu que Cristo é "um só e mesmo Filho, perfeito em Deus e perfeito em homem... em duas naturezas, sem confusão, sem mudança, sem divisão, sem separação".',
            },
            {
              id: 'teo-q8',
              pergunta: 'O fruto do Espírito (Gálatas 5:22-23) é descrito como:',
              opções: ['Múltiplos frutos que o crente desenvolve pelo esforço próprio', 'Um fruto singular manifestado em múltiplas expressões — amor, gozo, paz, etc.', 'O resultado automático da baptismo em água', 'Dons espirituais para ministry público'],
              respostaCorreta: 1,
              explicação: 'O texto usa o singular "fruto", indicando uma realidade unificada manifestada em múltiplas expressões. É obra do Espírito, não conquista humana.',
            },
            {
              id: 'teo-q9',
              pergunta: 'A Confissão de Westminster declara que os decretos eternos de Deus são:',
              opções: ['Mudados conforme as circunstâncias humanas', 'Imutáveis e livres, estabelecidos para a glória de Deus', 'Apenas previsões divinas, não decretos causais', 'Ilimitados pela soberania de Deus'],
              respostaCorreta: 1,
              explicação: 'A Confissão de Westminster (III.1) declara que Deus decidiu "livre e imutavelmente" tudo o que vai acontecer. Os decretos são eternos, soberanos e para a Sua glória.',
            },
            {
              id: 'teo-q10',
              pergunta: 'A perseverança dos santos, na teologia reformada, significa:',
              opções: ['Os crentes podem perder a salvação se pecarem gravemente', 'Todos os verdadeiramente regenerados perseverarão até o fim pela fidelidade de Deus, não por mérito próprio', 'A salvação depende do esforço humano contínuo', 'Apenas os membros da igreja visível perseveram'],
              respostaCorreta: 1,
              explicação: 'A perseverança dos santos (perseverantia sanctorum) é baseada na fidelidade de Deus, não na nossa. João 10:28-29: "Ninguém vos arrancará da minha mão."',
            },
            {
              id: 'teo-q11',
              pergunta: 'A relação entre Lei e Graça, conforme Paulo em Romanos, é:',
              opções: ['A Lei foi abolido completamente pela vinda de Cristo', 'A Lei como covenant de obras foi substituída, mas como regra de vida continua valendo', 'A Lei e a Graça são idênticas', 'A Lei é apenas para os judeus, não para os cristãos'],
              respostaCorreta: 1,
              explicação: 'Paulo afirma que não estamos "sob a Lei" como covenant de obras (Romanos 6:14), mas a Lei moral continua sendo "santa, justa e boa" (Romanos 7:12) como regra de vida para o crente.',
            },
            {
              id: 'teo-q12',
              pergunta: 'A doutrina da infalibilidade da Escritura, conforme a Confissão de Westminster, afirma que:',
              opções: ['A Bíblia contém erros de origem humana que precisam de correção', 'As Escrituras, no seu original autógrafo, são o padrão infalível de toda a fé e prática', 'A tradição da igreja é superior à Escritura', 'Apenas o Novo Testamento é infalível'],
              respostaCorreta: 1,
              explicação: 'A Confissão de Westminster (I.8) declara: "As Sagradas Escrituras são o padrão absoluto, por cuja regulagem se devem testar todas as doutrinas e práticas." A Escritura é a norma suprema.',
            },
          ],
        },
      ],
    },
  ],
};
