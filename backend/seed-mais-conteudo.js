const { Pool } = require('pg');
const crypto = require('crypto');

const DATABASE_URL = process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_n1SVsKwYfW7U@ep-shiny-sound-att6ki1l-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const SLUGS_LIVROS = [
  'genesis', 'exodo', 'salmos',
  'mateus', 'joao', 'romanos',
  '1-corintios', 'efesios', 'filipenses',
  'hebreus', 'apocalipse',
];

async function buscarIds(c) {
  const trRes = await c.query("SELECT id FROM traducoes WHERE sigla = 'NVI' LIMIT 1");
  if (trRes.rows.length === 0) throw new Error('Tradução NVI não encontrada');
  const NVI = trRes.rows[0].id;

  const lvRes = await c.query(
    `SELECT id, slug, testamento_id FROM livros WHERE slug = ANY($1::text[])`,
    [SLUGS_LIVROS]
  );
  const livros = {};
  const testamentoDoLivro = {};
  lvRes.rows.forEach(r => {
    livros[r.slug] = r.id;
    testamentoDoLivro[r.slug] = r.testamento_id;
  });

  const ttRes = await c.query('SELECT id, slug FROM testamentos');
  const testamentos = {};
  ttRes.rows.forEach(r => { testamentos[r.slug] = r.id; });

  return { NVI, livros, testamentos, testamentoDoLivro };
}

async function buscarOuCriarCapitulos(c, ids) {
  const capitulosParaInserir = [
    ['genesis', 3, 24],
    ['exodo', 20, 26],
    ['salmos', 1, 6],
    ['salmos', 91, 16],
    ['mateus', 5, 48],
    ['mateus', 6, 34],
    ['mateus', 28, 20],
    ['joao', 3, 36],
    ['joao', 14, 31],
    ['romanos', 1, 32],
    ['romanos', 3, 31],
    ['romanos', 10, 21],
    ['1-corintios', 13, 13],
    ['efesios', 2, 22],
    ['filipenses', 4, 23],
    ['hebreus', 11, 40],
    ['apocalipse', 21, 27],
  ];

  for (const [slug, numero, total] of capitulosParaInserir) {
    const livroId = ids.livros[slug];
    if (!livroId) continue;
    await c.query(
      `INSERT INTO capitulos (id, livro_id, numero, total_versiculos)
       VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING`,
      [crypto.randomUUID(), livroId, numero, total]
    );
  }

  const capsRes = await c.query('SELECT id, livro_id, numero FROM capitulos');
  const capsMap = {};
  capsRes.rows.forEach(r => { capsMap[`${r.livro_id}-${r.numero}`] = r.id; });
  return capsMap;
}

async function seedVersiculos(c, ids, capsMap) {
  console.log('Inserindo mais versículos NVI...');
  const inserts = [];
  const v = (slug, cap, num, texto) => {
    const livroId = ids.livros[slug];
    if (!livroId) return null;
    const testamentoId = ids.testamentoDoLivro[slug];
    const capId = capsMap[`${livroId}-${cap}`] || null;
    return c.query(
      `INSERT INTO versiculos (id, livro_id, capitulo_id, capitulo_numero, numero, texto, traducao_id, testamento_id)
       VALUES ($1, $2, $3::uuid, $4, $5, $6, $7, $8) ON CONFLICT DO NOTHING`,
      [crypto.randomUUID(), livroId, capId, cap, num, texto, ids.NVI, testamentoId]
    ).catch(() => {});
  };

  // Gênesis 3 (1-24 completos)
  [
    [1, 'A serpente era o mais astuto de todos os animais do campo que o Senhor Deus tinha feito. Ela perguntou à mulher: "Deus disse realmente: Não comam de nenhum fruto das árvores do jardim?"'],
    [2, 'A mulher respondeu à serpente: "Podemos comer do fruto das árvores do jardim,'],
    [3, 'mas Deus disse: Não comam do fruto da árvore que está no meio do jardim, nem toquem nele; do contrário, vocês morrerão".'],
    [4, '"É certo que não morrerão", disse a serpente à mulher.'],
    [5, '"Deus sabe que, no dia em que dele comerem, seus olhos se abrirão, e vocês serão como Deus, conhecendo o bem e o mal."'],
    [6, 'Quando a mulher viu que a árvore parecia agradável ao paladar e era atraente aos olhos, e que a árvore era desejável para dela se obter discernimento, tomou do seu fruto, comeu-o e o deu a seu marido, que também comeu.'],
    [7, 'Os olhos dos dois se abriram, e perceberam que estavam nus; então juntaram folhas de figueira para cobrir-se.'],
    [8, 'Ouvindo o homem e sua mulher os passos do Senhor Deus que andava pelo jardim quando soprava a brisa do dia, esconderam-se entre as árvores do jardim para fugir da presença do Senhor Deus.'],
    [9, 'Mas o Senhor Deus chamou o homem, perguntando: "Onde está você?"'],
    [10, 'Ele respondeu: "Ouvi teus passos no jardim e fiquei com medo, porque estava nu; por isso me escondi."'],
    [11, 'E Deus perguntou: "Quem lhe disse que você estava nu? Você comeu do fruto da árvore da qual proibi você de comer?"'],
    [12, 'O homem respondeu: "A mulher que me deste por companheira, ela me deu do fruto da árvore, e eu comi."'],
    [13, 'O Senhor Deus perguntou à mulher: "Que é isso que você fez?" A mulher respondeu: "A serpente me enganou, e eu comi."'],
    [14, 'O Senhor Deus disse à serpente: "Já que você fez isso, maldita é você entre todos os rebanhos e entre todos os animais do campo! Sobre o seu ventre você rastejará, e pó comerá todos os dias da sua vida.'],
    [15, 'Porei inimizade entre você e a mulher, entre a sua descendência e o descendente dela; este lhe ferirá a cabeça, e você lhe ferirá o calcanhar."'],
    [16, 'À mulher ele disse: "Multiplicarei grandemente o seu sofrimento na gravidez; com dores você dará à luz filhos. Seu desejo será para o seu marido, e ele a dominará."'],
    [17, 'E ao homem ele declarou: "Já que você ouviu a sua mulher e comeu do fruto da árvore da qual eu lhe ordenara dizendo: Não coma dela, maldita é a terra por sua causa; com sofrimento você se alimentará dela todos os dias da sua vida.'],
    [18, 'Ela lhe produzirá espinhos e cardos, e você comerá das plantas do campo.'],
    [19, 'Com o suor do seu rosto você comerá o seu pão, até que volte à terra, pois dela você foi tirado; porque você é pó e ao pó voltará."'],
    [20, 'O homem chamou sua esposa Eva, porque ela seria mãe de todos os viventes.'],
    [21, 'O Senhor Deus fez roupas de pele e com elas vestiu o homem e sua mulher.'],
    [22, 'E o Senhor Deus declarou: "Eis que o homem se tornou como um de nós, conhecendo o bem e o mal. Agora, pois, cuidemos que ele não estenda a mão e tome também da árvore da vida, e coma e viva para sempre."'],
    [23, 'E o Senhor Deus o expulsou do jardim do Éden, para cultivar a terra da qual fora tirado.'],
    [24, 'Tendo expulsado o homem, colocou ao oriente do jardim do Éden querubins e uma espada fulgurante que se movia em todas as direções, para guardar o caminho da árvore da vida.'],
  ].forEach(([num, texto]) => inserts.push(v('genesis', 3, num, texto)));

  // Êxodo 20 (1-17) - Os 10 Mandamentos
  [
    [1, 'E falou Deus todas estas palavras:'],
    [2, '"Eu sou o Senhor, o seu Deus, que o tirou do Egito, da terra da escravidão.'],
    [3, 'Não terá outros deuses além de mim.'],
    [4, 'Não fará para vocês imagem esculpida, nem semelhança alguma do que há em cima dos céus, nem embaixo na terra, nem nas águas debaixo da terra.'],
    [5, 'Não se prostrará diante deles nem lhes prestará culto, porque eu, o Senhor, o seu Deus, sou Deus zeloso, que castigo os filhos pelos pecados de seus pais até a terceira e quarta geração daqueles que me rejeitam,'],
    [6, 'mas trato com bondade mil gerações daqueles que me amam e guardam os meus mandamentos.'],
    [7, 'Não tomarás em vão o nome do Senhor, o teu Deus, pois o Senhor não deixará impune quem tomar o seu nome em vão.'],
    [8, 'Lembra-te do dia de sábado, para santificá-lo.'],
    [9, 'Trabalharás seis dias e neles farás todos os teus trabalhos,'],
    [10, 'mas o sétimo dia é o sábado dedicado ao Senhor, o teu Deus. Nesse dia não farás trabalho algum, nem tu, nem teus filhos ou filhas, nem teus servos ou servas, nem teus animais, nem os estrangeiros que morarem em tuas cidades.'],
    [11, 'Pois em seis dias o Senhor fez os céus e a terra, o mar e tudo o que neles existe, mas no sétimo dia descansou. Por isso o Senhor abençoou o dia de sábado e o santificou.'],
    [12, 'Honra teu pai e tua mãe, a fim de que tenhas vida longa na terra que o Senhor, o teu Deus, te dá.'],
    [13, 'Não matarás.'],
    [14, 'Não adulterarás.'],
    [15, 'Não furtarás.'],
    [16, 'Não darás falso testemunho contra o teu próximo.'],
    [17, 'Não cobiçarás a casa do teu próximo. Não cobiçarás a mulher do teu próximo, nem seus servos ou servas, nem seu boi ou jumento, nem coisa alguma que lhe pertença."'],
  ].forEach(([num, texto]) => inserts.push(v('exodo', 20, num, texto)));

  // Salmos 1 (1-6)
  [
    [1, 'Feliz o homem que não segue o conselho dos ímpios, não imita a conduta dos pecadores, nem se assenta na roda dos zombadores;'],
    [2, 'antes, o seu prazer está na lei do Senhor, e nessa lei medita dia e noite.'],
    [3, 'É como árvore plantada à beira de águas correntes: no tempo certo dá o seu fruto, suas folhas nunca murcham, e tudo o que faz prospera.'],
    [4, 'Não é assim com os ímpios! São como a palha que o vento leva.'],
    [5, 'Por isso os ímpios não resistirão no juízo, nem os pecadores na assembleia dos justos.'],
    [6, 'Pois o Senhor cuida do caminho dos justos, mas o caminho dos ímpios leva à destruição.'],
  ].forEach(([num, texto]) => inserts.push(v('salmos', 1, num, texto)));

  // Salmos 91 (1-16 completos)
  [
    [1, 'Aquele que habita no abrigo do Altíssimo e descansa à sombra do Todo-poderoso,'],
    [2, 'pode dizer ao Senhor: "Tu és o meu refúgio e a minha fortaleza, o meu Deus, em quem confio".'],
    [3, 'Ele o livrará do laço do caçador e do peste mortífero.'],
    [4, 'Cobrir-o-á com as suas penas, e sob as suas asas você encontrará refúgio; a fidelidade dele será o seu escudo protetor.'],
    [5, 'Você não temerá o pavor da noite, nem a flecha que voa de dia,'],
    [6, 'nem a peste que se move sorrateira nas trevas, nem a praga que devasta ao meio-dia.'],
    [7, 'Mil poderão cair ao seu lado, dez mil à sua direita, mas você não será atingido.'],
    [8, 'Não recolherá nenhum mal; com os seus olhos você verá o castigo dos ímpios.'],
    [9, 'Já que você fez do Senhor o seu refúgio, do Altíssimo a sua habitação,'],
    [10, 'nenhum mal o atingirá, desgraça alguma chegará à sua casa.'],
    [11, 'Pois a seus anjos ele dará ordens a seu respeito, para que o guardem em todos os seus caminhos;'],
    [12, 'com as mãos eles o sustentarão, para que você não tropece em alguma pedra.'],
    [13, 'Com o pé você pisará o leão e a cobra; pisará o leão forte e a serpente.'],
    [14, '"Porque ele me ama, eu o resgatarei; protegê-lo-ei, pois confia no meu nome.'],
    [15, 'Ele clamará a mim, e eu lhe responderei; na adversidade estarei com ele, livrá-lo-ei e o cobrirei de honra.'],
    [16, 'Vida longa darei a ele, e mostrarei a ele a minha salvação."'],
  ].forEach(([num, texto]) => inserts.push(v('salmos', 91, num, texto)));

  // Mateus 5 (1-12) - Bem-aventuranças
  [
    [1, 'Vendo as multidões, Jesus subiu ao monte e se assentou. Seus discípulos aproximaram-se dele,'],
    [2, 'e ele começou a ensiná-los, dizendo:'],
    [3, '"Felizes os pobres em espírito, porque deles é o Reino dos céus.'],
    [4, 'Felizes os que choram, porque serão consolados.'],
    [5, 'Felizes os humildes, porque herdarão a terra.'],
    [6, 'Felizes os que têm fome e sede de justiça, porque serão satisfeitos.'],
    [7, 'Felizes os misericordiosos, porque alcançarão misericórdia.'],
    [8, 'Felizes os puros de coração, porque verão a Deus.'],
    [9, 'Felizes os pacificadores, porque serão chamados filhos de Deus.'],
    [10, 'Felizes os perseguidos por causa da justiça, porque deles é o Reino dos céus.'],
    [11, 'Felizes são vocês quando, por minha causa, os insultarem, os perseguirem e levantarem todo tipo de calúnia contra vocês.'],
    [12, 'Alegrem-se e exultem, porque é grande a recompensa de vocês nos céus; pois da mesma forma perseguiram os profetas que viveram antes de vocês.'],
  ].forEach(([num, texto]) => inserts.push(v('mateus', 5, num, texto)));

  // Mateus 6 (9-13) - Pai Nosso
  [
    [9, 'Portanto, vocês orem assim: "Pai nosso, que estás nos céus! Santificado seja o teu nome.'],
    [10, 'Venha o teu Reino; seja feita a tua vontade, assim na terra como no céu.'],
    [11, 'O pão nosso de cada dia dá-nos hoje;'],
    [12, 'perdoa as nossas dívidas, assim como nós temos perdoado aos nossos devedores.'],
    [13, 'E não nos deixes cair em tentação, mas livra-nos do mal, porque teu é o Reino, o poder e a glória para sempre. Amém."'],
  ].forEach(([num, texto]) => inserts.push(v('mateus', 6, num, texto)));

  // Mateus 28 (18-20) - Grande Comissão
  [
    [18, 'Então, Jesus aproximou-se deles e disse: "Foi-me dada toda a autoridade no céu e na terra.'],
    [19, 'Portanto, vão e façam discípulos de todas as nações, batizando-os em nome do Pai e do Filho e do Espírito Santo,'],
    [20, 'ensinando-os a obedecer a tudo o que eu lhes ordenei. E eu estarei com vocês sempre, até o fim dos tempos."'],
  ].forEach(([num, texto]) => inserts.push(v('mateus', 28, num, texto)));

  // João 3 (1-21)
  [
    [1, 'Houve um homem chamado Nicodemos, um dos fariseus, membro do Conselho judaico.'],
    [2, 'Ele veio a Jesus, à noite, e disse: "Rabi, sabemos que és um mestre vindo da parte de Deus; pois ninguém pode realizar esses sinais que tu realizas, se Deus não estiver com ele".'],
    [3, 'Respondeu Jesus: "Na verdade, na verdade te digo que ninguém pode ver o Reino de Deus, se não nascer de novo".'],
    [4, 'Nicodemos perguntou: "Como um homem pode nascer, sendo velho? É claro que não pode entrar pela segunda vez no ventre de sua mãe e nascer!"'],
    [5, 'Jesus respondeu: "Na verdade, na verdade te digo que ninguém pode entrar no Reino de Deus, se não nascer da água e do Espírito.'],
    [6, 'O que nasce da carne é carne, mas o que nasce do Espírito é espírito.'],
    [7, 'Não te admires de que eu te tenha dito: É necessário que vocês nasçam de novo.'],
    [8, 'O vento sopra onde quer; ouves o seu som, mas não sabes de onde vem nem para onde vai. Assim é todo o que nasce do Espírito".'],
    [9, 'Nicodemos perguntou: "Como pode isso acontecer?"'],
    [10, 'Disse Jesus: "Tu és mestre em Israel e não compreendes essas coisas?'],
    [11, 'Na verdade, na verdade te digo que nós falamos do que sabemos e testemunhamos o que vimos; mas vocês não aceitam o nosso testemunho.'],
    [12, 'Se vos falei de coisas terrenas e vocês não crêem, como crerão se vos falar das celestiais?'],
    [13, 'Ninguém subiu ao céu, a não ser aquele que desceu do céu, o Filho do homem.'],
    [14, 'Do mesmo modo que Moisés levantou a serpente no deserto, assim é necessário que o Filho do homem seja levantado,'],
    [15, 'para que todo o que nele crê tenha a vida eterna.'],
    [16, 'Porque Deus amou o mundo de tal maneira que deu o seu Filho Unigênito, para que todo o que nele crê não pereça, mas tenha a vida eterna.'],
    [17, 'Porque Deus enviou o seu Filho ao mundo, não para condenar o mundo, mas para que este seja salvo por intermédio dele.'],
    [18, 'Quem nele crê não é condenado; mas quem não crê já está condenado, por não crer no nome do Filho Unigênito de Deus.'],
    [19, 'Este é o julgamento: a luz veio ao mundo, mas os homens amaram as trevas e não a luz, porque as suas obras eram más.'],
    [20, 'Quem pratica o mal odeia a luz e não se aproxima dela, para que as suas obras não sejam expostas.'],
    [21, 'Mas quem pratica a verdade aproxima-se da luz, a fim de que as suas obras sejam manifestas, pois são feitas em Deus".'],
  ].forEach(([num, texto]) => inserts.push(v('joao', 3, num, texto)));

  // João 14 (1-6, 15-18, 27)
  [
    [1, '"Não se perturbe o coração de vocês. Creiam em Deus; creiam também em mim.'],
    [2, 'Na casa de meu Pai há muitas moradas; se não fosse assim, eu lhes teria dito. Vou preparar-lhes lugar.'],
    [3, 'E, se eu for e lhes preparar lugar, voltarei e os levarei para mim, para que onde eu estiver, vocês também estejam.'],
    [4, 'Vocês conhecem o caminho para o lugar aonde vou".'],
    [5, 'Tomé perguntou: "Senhor, não sabemos para onde vais; como podemos conhecer o caminho?"'],
    [6, 'Respondeu Jesus: "Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai, a não ser por mim.'],
    [15, 'Se vocês me amam, obedecerão aos meus mandamentos.'],
    [16, 'E eu pedirei ao Pai, e ele lhes dará outro Conselheiro, para estar com vocês para sempre,'],
    [17, 'o Espírito da verdade, que o mundo não pode receber, porque não o vê nem o conhece. Mas vocês o conhecem, pois ele vive com vocês e estará em vocês.'],
    [18, 'Não os deixarei órfãos; voltarei para vocês.'],
    [27, 'Deixo-lhes a paz; a minha paz lhes dou. Não a dou como o mundo a dá. Não se perturbe o coração de vocês, nem tenham medo."'],
  ].forEach(([num, texto]) => inserts.push(v('joao', 14, num, texto)));

  // Romanos 1 (16-17)
  [
    [16, 'Não me envergonho do evangelho, porque é o poder de Deus para a salvação de todo aquele que crê: primeiro do judeu, depois do grego.'],
    [17, 'Pois no evangelho é revelada a justiça de Deus, uma justiça que do princípio ao fim é pela fé, como está escrito: "O justo viverá pela fé".'],
  ].forEach(([num, texto]) => inserts.push(v('romanos', 1, num, texto)));

  // Romanos 3 (21-26)
  [
    [21, 'Mas agora se manifestou uma justiça que vem de Deus, independente da lei, da qual testemunham a Lei e os Profetas,'],
    [22, 'justiça de Deus mediante a fé em Jesus Cristo para todos os que crêem. Não há distinção,'],
    [23, 'pois todos pecaram e carecem da glória de Deus;'],
    [24, 'sendo justificados gratuitamente por sua graça, mediante a redenção que há em Cristo Jesus.'],
    [25, 'Deus o ofereceu como sacrifício expiatório, mediante a fé em seu sangue, para demonstrar a sua justiça. Em sua tolerância, ele havia deixado impunes os pecados anteriormente cometidos;'],
    [26, 'mas, no tempo presente, ele o ofereceu para demonstrar a sua justiça, a fim de ser justo e justificador daquele que tem fé em Jesus.'],
  ].forEach(([num, texto]) => inserts.push(v('romanos', 3, num, texto)));

  // Romanos 10 (9-13)
  [
    [9, 'Se você confessar com a sua boca: "Jesus é Senhor", e crer em seu coração que Deus o ressuscitou dos mortos, será salvo.'],
    [10, 'Pois é com o coração que se crê para justiça, e com a boca se faz confissão para salvação.'],
    [11, 'Como diz a Escritura: "Todo o que nele crê jamais será envergonhado".'],
    [12, 'Não há diferença entre judeu e grego, pois todos têm o mesmo Senhor, que é generoso com todos os que o invocam;'],
    [13, 'pois "todo aquele que invocar o nome do Senhor será salvo".'],
  ].forEach(([num, texto]) => inserts.push(v('romanos', 10, num, texto)));

  // 1 Coríntios 13 (1-13) - O Amor
  [
    [1, 'Ainda que eu fale as línguas dos homens e dos anjos, se não tiver amor, serei como o bronze que ressoa ou como o címbalo que retine.'],
    [2, 'Ainda que eu tenha o dom de profetizar e conheça todos os mistérios e toda a ciência, e tenha uma fé tal que transporte montanhas, se não tiver amor, nada sou.'],
    [3, 'Ainda que eu dê aos pobres tudo o que possuo e entregue o meu corpo para ser queimado, se não tiver amor, nada disso me aproveita.'],
    [4, 'O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha.'],
    [5, 'Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor.'],
    [6, 'O amor não se alegra com a injustiça, mas se alegra com a verdade.'],
    [7, 'Tudo sofre, tudo crê, tudo espera, tudo suporta.'],
    [8, 'O amor nunca falha; mas, havendo profecias, desaparecerão; havendo línguas, cessarão; havendo ciência, desaparecerá.'],
    [9, 'Pois, em parte, conhecemos e, em parte, profetizamos;'],
    [10, 'mas, quando vier o que é perfeito, o que é em parte desaparecerá.'],
    [11, 'Quando eu era menino, falava como menino, pensava como menino, raciocinava como menino. Quando me tornei homem, deixei para trás as coisas de menino.'],
    [12, 'Agora, vemos apenas um reflexo obscuro num espelho; mas, então, veremos face a face. Agora, conheço em parte; mas, então, conhecerei plenamente, da mesma forma como sou plenamente conhecido.'],
    [13, 'Assim, permanecem estas três coisas: a fé, a esperança e o amor. A maior delas, porém, é o amor.'],
  ].forEach(([num, texto]) => inserts.push(v('1-corintios', 13, num, texto)));

  // Efésios 2 (8-10)
  [
    [8, 'Porque pela graça sois salvos, mediante a fé; e isto não vem de vós; é dom de Deus;'],
    [9, 'não de obras, para que ninguém se glorie.'],
    [10, 'Pois somos criação de Deus realizada em Cristo Jesus para fazermos boas obras, as quais Deus preparou antes para nós as praticarmos.'],
  ].forEach(([num, texto]) => inserts.push(v('efesios', 2, num, texto)));

  // Filipenses 4 (6-8, 13)
  [
    [6, 'Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus.'],
    [7, 'E a paz de Deus, que excede todo o entendimento, guardará o coração e a mente de vocês em Cristo Jesus.'],
    [8, 'Finalmente, irmãos, tudo o que for verdadeiro, tudo o que for nobre, tudo o que for correto, tudo o que for puro, tudo o que for amável, tudo o que for de boa fama, se houver algo de excelente ou digno de louvor, pensem nessas coisas.'],
    [13, 'Tudo posso naquele que me fortalece.'],
  ].forEach(([num, texto]) => inserts.push(v('filipenses', 4, num, texto)));

  // Hebreus 11 (1-6) - A Fé
  [
    [1, 'Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não vêem.'],
    [2, 'Por meio dela, os antigos receberam bom testemunho.'],
    [3, 'Pela fé entendemos que o universo foi formado pela palavra de Deus, de modo que o que se vê não foi feito do que é visível.'],
    [4, 'Pela fé, Abel ofereceu a Deus um sacrifício superior ao de Caim. Pela fé, ele foi aprovado como justo, recebendo de Deus o testemunho de que o seu sacrifício foi aceito; e por meio dela, mesmo depois de morrer, ainda fala.'],
    [5, 'Pela fé, Enoque foi trasladado desta vida para não mais ver a morte: "não foi encontrado, porque Deus o havia trasladado". Antes de ser trasladado, recebeu o testemunho de que tinha agradado a Deus.'],
    [6, 'Sem fé é impossível agradar a Deus, pois quem dele se aproxima precisa crer que ele existe e que recompensa aqueles que o buscam.'],
  ].forEach(([num, texto]) => inserts.push(v('hebreus', 11, num, texto)));

  // Apocalipse 21 (1-4)
  [
    [1, 'Vi um novo céu e uma nova terra, porque o primeiro céu e a primeira terra tinham desaparecido, e o mar já não existia.'],
    [2, 'Vi a Cidade Santa, a nova Jerusalém, que descia do céu, da parte de Deus, preparada como uma noiva belamente adornada para o seu noivo.'],
    [3, 'Então ouvi uma forte voz que vinha do trono e dizia: "Agora o tabernáculo de Deus está com os homens, com os quais ele viverá. Eles serão os seus povos; o próprio Deus estará com eles e será o seu Deus.'],
    [4, 'Ele enxugará dos seus olhos toda lágrima. Não haverá mais morte, nem tristeza, nem choro, nem dor, porque a antiga ordem já passou".'],
  ].forEach(([num, texto]) => inserts.push(v('apocalipse', 21, num, texto)));

  const resultados = await Promise.all(inserts.filter(Boolean));
  console.log(`  ${resultados.length} versículos processados`);
}

async function seedPalavrasGregas(c) {
  console.log('Inserindo mais palavras gregas (Strong)...');
  const palavras = [
    ['G1849', 'ἐξουσία', 'exousia', 'exousia', 'ex-oo-see-ah', 'autoridade', 'Autoridade, poder, direito de agir; liberdade, jurisdição', 'substantivo feminino', 'substantivo', 108],
    ['G935', 'βασιλεύς', 'basileus', 'basileus', 'bas-il-yoos', 'rei', 'Rei, soberano, monarca; título de Cristo como Rei dos reis', 'substantivo masculino', 'substantivo', 115],
    ['G5207', 'υἱός', 'huios', 'huios', 'hwee-os', 'filho', 'Filho, descendente; termo usado para Cristo como Filho de Deus', 'substantivo masculino', 'substantivo', 377],
    ['G3962', 'πατήρ', 'patēr', 'pater', 'pat-ayr', 'pai', 'Pai, progenitor; título de Deus como Pai', 'substantivo masculino', 'substantivo', 413],
    ['G1135', 'γυνή', 'gynē', 'gyne', 'goo-nay', 'mulher', 'Mulher, esposa; termo genérico para fêmea', 'substantivo feminino', 'substantivo', 215],
    ['G444', 'ἄνθρωπος', 'anthrōpos', 'anthropos', 'anth-ro-pos', 'homem', 'Homem, ser humano, humanidade; distinto de animais', 'substantivo masculino', 'substantivo', 550],
    ['G3588', 'ὁ', 'ho', 'ho', 'ho', 'o/a (artigo)', 'Artigo definido grego: o, a, os, as; frequente em todas as declinações', 'artigo definido', 'artigo', 9800],
    ['G2532', 'καί', 'kai', 'kai', 'kahee', 'e', 'Conjunção copulativa: e, também, mesmo; partícula de ligação', 'conjunção copulativa', 'conjunção', 9284],
    ['G1063', 'γάρ', 'gar', 'gar', 'gar', 'porque', 'Conjunção causal: pois, porque; introduz explicação ou razão', 'conjunção causal', 'conjunção', 671],
    ['G3756', 'οὐ', 'ou', 'ou', 'oo', 'não', 'Partícula negativa: não, de modo algum; negação direta do indicativo', 'partícula negativa', 'partícula', 1470],
    ['G1510', 'εἰμί', 'eimi', 'eimi', 'i-mee', 'ser', 'Verbo de ligação: ser, existir, estar; verbo copulativo fundamental', 'verbo (presente indicativo)', 'verbo', 2462],
    ['G3004', 'λέγω', 'legō', 'lego', 'leg-o', 'dizer', 'Dizer, falar, chamar; verbo de discurso muito comum', 'verbo (vários tempos)', 'verbo', 2354],
    ['G2064', 'ἔρχομαι', 'erchomai', 'erchomai', 'er-khom-ahee', 'vir', 'Vir, chegar, ir; movimento em direção ao falante', 'verbo (presente médio)', 'verbo', 632],
    ['G4160', 'ποιέω', 'poieō', 'poieo', 'poy-eh-o', 'fazer', 'Fazer, produzir, realizar, criar; verbo de ação', 'verbo (vários tempos)', 'verbo', 568],
    ['G1096', 'γίνομαι', 'ginomai', 'ginomai', 'ghin-om-ahee', 'tornar-se', 'Tornar-se, vir a ser, acontecer, nascer; mudança de estado', 'verbo (presente médio)', 'verbo', 669],
    ['G2192', 'ἔχω', 'echō', 'echo', 'ekh-o', 'ter', 'Ter, possuir, segurar; verbo de posse ou estado', 'verbo (presente ativo)', 'verbo', 708],
    ['G1492', 'εἴδω', 'eido', 'eido', 'i-do', 'saber/ver', 'Saber por percepção, ver; forma perfeita com sentido presente', 'verbo (perfeito com pres.)', 'verbo', 667],
    ['G2065', 'ἐρωτάω', 'erōtaō', 'erotao', 'er-o-tah-o', 'pedir', 'Pedir, rogar, questionar; solicitar como igual a igual', 'verbo (presente ativo)', 'verbo', 63],
    ['G615', 'ἀπόλλυμι', 'apollumi', 'apollumi', 'ap-ol-loo-mee', 'perecer', 'Perecer, destruir, arruinar; perder completamente', 'verbo (presente médio)', 'verbo', 90],
    ['G4982', 'σῴζω', 'sōzō', 'sozo', 'sode-zo', 'salvar', 'Salvar, resgatar, curar, libertar; salvação espiritual e física', 'verbo (presente ativo)', 'verbo', 106],
    ['G3860', 'παραδίδωμι', 'paradidōmi', 'paradidomi', 'par-ad-id-o-mee', 'entregar', 'Entregar, transmitir, trair, permitir; dar a outro', 'verbo (presente ativo)', 'verbo', 119],
    ['G1453', 'ἐγείρω', 'egeirō', 'egeiro', 'eg-i-ro', 'ressuscitar', 'Levantar, despertar, ressuscitar; levantar dos mortos', 'verbo (presente ativo)', 'verbo', 144],
    ['G600', 'ἀποκρίνομαι', 'apokrinomai', 'apokrinomai', 'ap-ok-ree-nom-ahee', 'responder', 'Responder, replicar; dar uma resposta a uma pergunta', 'verbo (presente médio)', 'verbo', 231],
    ['G3000', 'λαλέω', 'laleō', 'laleo', 'lal-eh-o', 'falar', 'Falar, proferir, conversar; emitir sons articulados', 'verbo (presente ativo)', 'verbo', 296],
    ['G1125', 'γράφω', 'graphō', 'grapho', 'graf-o', 'escrever', 'Escrever, registrar, redigir; comunicar por escrito', 'verbo (presente ativo)', 'verbo', 191],
    ['G3708', 'ὁράω', 'horaō', 'horao', 'hor-ah-o', 'ver', 'Ver, perceber, contemplar; visão física e espiritual', 'verbo (vários tempos)', 'verbo', 469],
    ['G191', 'ἀκούω', 'akouō', 'akouo', 'ak-oo-o', 'ouvir', 'Ouvir, escutar, compreender; percepção auditiva', 'verbo (presente ativo)', 'verbo', 528],
    ['G1364', 'διότι', 'dioti', 'dioti', 'dee-ot-ee', 'porque', 'Conjunção causal: porque, porquanto; introduz causa mais forte que gar', 'conjunção causal', 'conjunção', 12],
    ['G2443', 'ἵνα', 'hina', 'hina', 'hin-ah', 'para que', 'Conjunção final: para que, a fim de que; introduz propósito ou resultado', 'conjunção final', 'conjunção', 673],
    ['G1487', 'εἰ', 'ei', 'ei', 'i', 'se', 'Conjunção condicional: se, caso; introduz condição', 'conjunção condicional', 'conjunção', 502],
    ['G3754', 'ὅτι', 'hoti', 'hoti', 'hot-ee', 'que', 'Conjunção: que, porque, pois; introduz conteúdo ou causal', 'conjunção (complementadora)', 'conjunção', 1296],
    ['G1161', 'δέ', 'de', 'de', 'deh', 'mas', 'Partícula adversativa: mas, porém, e; transição ou contraste leve', 'partícula adversativa', 'partícula', 2792],
    ['G3767', 'οὖν', 'oun', 'oun', 'oon', 'portanto', 'Partícula inferencial: portanto, então, assim; indica conclusão', 'partícula inferencial', 'partícula', 499],
    ['G1065', 'γέ', 'ge', 'ge', 'gheh', 'certamente', 'Partícula enfática: certamente, pelo menos, mesmo; reforça a palavra precedente', 'partícula enfática', 'partícula', 19],
    ['G5124', 'οὗτος', 'houtos', 'houtos', 'hoo-tos', 'este', 'Pronome demonstrativo: este, esta, isto; aponta para o próximo', 'pronome demonstrativo', 'pronome', 1390],
    ['G1565', 'ἐκεῖνος', 'ekeinos', 'ekeinos', 'ek-i-nos', 'aquele', 'Pronome demonstrativo: aquele, aquela, aquele; aponta para o distante', 'pronome demonstrativo', 'pronome', 265],
    ['G3956', 'πᾶς', 'pas', 'pas', 'pas', 'todo', 'Adjetivo: todo, cada, todos; totalidade ou distribuição', 'adjetivo (vários casos)', 'adjetivo', 1243],
    ['G18', 'ἀγαθός', 'agathos', 'agathos', 'ag-ath-os', 'bom', 'Bom, proveitoso, benéfico; bom em caráter e moralmente', 'adjetivo (vários graus)', 'adjetivo', 102],
    ['G2556', 'κακός', 'kakos', 'kakos', 'kak-os', 'mau', 'Mau, ruim, prejudicial; moralmente ruim ou danoso', 'adjetivo (vários casos)', 'adjetivo', 50],
    ['G227', 'ἀληθινός', 'alēthinos', 'alethinos', 'al-ay-thee-nos', 'verdadeiro', 'Verdadeiro, real, genuíno; oposto ao fingido ou falso', 'adjetivo (vários casos)', 'adjetivo', 28],
    ['G5590', 'ψυχή', 'psychē', 'psyche', 'psoo-khay', 'alma', 'Alma, vida, ser vivente; princípio vital ou a pessoa interior', 'substantivo feminino', 'substantivo', 103],
    ['G4983', 'σωτηρία', 'sōtēria', 'soteria', 'so-tay-ree-ah', 'salvação', 'Salvação, libertação, preservação; livramento do pecado e juízo', 'substantivo feminino', 'substantivo', 46],
    ['G2288', 'θάνατος', 'thanatos', 'thanatos', 'than-at-os', 'morte', 'Morte, morte física ou espiritual; poder da morte', 'substantivo masculino', 'substantivo', 120],
    ['G2222', 'ζωή', 'zōē', 'zoe', 'dzoo-ay', 'vida', 'Vida, vida divina, vida eterna; oposto a thanatos', 'substantivo feminino', 'substantivo', 135],
    ['G3563', 'νοῦς', 'nous', 'nous', 'nooce', 'mente', 'Mente, intelecto, entendimento; faculdade de percepção e pensamento', 'substantivo masculino', 'substantivo', 24],
    ['G2588', 'καρδία', 'kardia', 'kardia', 'kar-dee-ah', 'coração', 'Coração, centro da vida interior; vontade, emoções e pensamento', 'substantivo feminino', 'substantivo', 156],
    ['G4151', 'πνεῦμα', 'pneuma', 'pneuma', 'pnyoo-mah', 'espírito', 'Espírito, vento, fôlego; o Espírito Santo ou espírito humano', 'substantivo neutro', 'substantivo', 379],
    ['G4561', 'σάρξ', 'sarx', 'sarx', 'sarx', 'carne', 'Carne, corpo, natureza humana; distinto de espírito ou pneuma', 'substantivo feminino', 'substantivo', 147],
    ['G372', 'ἀνάστασις', 'anastasis', 'anastasis', 'an-as-tas-is', 'ressurreição', 'Ressurreição, levantamento; levantar dos mortos', 'substantivo feminino', 'substantivo', 42],
    ['G2032', 'ἐπουράνιος', 'epouranios', 'epouranios', 'ep-oo-ran-ee-os', 'celestial', 'Celestial, que vem do céu, pertencente ao céu; oposto ao terrestre', 'adjetivo (vários casos)', 'adjetivo', 19],
    ['G2250', 'ἡμέρα', 'hēmera', 'hemera', 'hay-mer-ah', 'dia', 'Dia, período de tempo; dia natural ou figurado', 'substantivo feminino', 'substantivo', 389],
    ['G3565', 'νύξ', 'nux', 'nux', 'noox', 'noite', 'Noite, período noturno; simbolicamente trevas morais', 'substantivo feminino', 'substantivo', 60],
    ['G4314', 'πρός', 'pros', 'pros', 'pros', 'para', 'Preposição: para, com, ao; indica direção ou relação', 'preposição', 'preposição', 700],
    ['G2114', 'εὐθύς', 'euthys', 'euthys', 'yoo-thoos', 'imediatamente', 'Imediatamente, logo, de pronto; comum no evangelho de Marcos', 'advérbio', 'advérbio', 51],
  ];

  let inseridas = 0;
  for (const p of palavras) {
    const r = await c.query(
      `INSERT INTO palavras_gregas (id, strong, palavra_original, lemma, transliteracao, pronuncia, definicao_curta, definicao_completa, morfologia, classe_gramatical, frequencia_nt)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       ON CONFLICT (strong) DO NOTHING`,
      [crypto.randomUUID(), ...p]
    );
    if (r.rowCount > 0) inseridas++;
  }
  console.log(`  ${palavras.length} palavras gregas tentadas, ${inseridas} novas inseridas`);
}

async function seedPalavrasHebraicas(c) {
  console.log('Inserindo mais palavras hebraicas (Strong)...');
  const palavras = [
    ['H1391', 'גִּבֹּר', 'Gibbor', 'gibbor', 'ghib-bore', 'valente', 'Valente, herói, homem forte; guerreiro poderoso', 'substantivo masculino', 'substantivo', 159],
    ['H136', 'אֲדֹנָי', 'Adonai', 'adonai', 'ad-o-noy', 'Senhor', 'Senhor, meu Senhor; título divino de soberania e domínio', 'substantivo masculino plural', 'substantivo', 439],
    ['H352', 'אַיִל', 'ayil', 'ayil', 'ah-yil', 'forte', 'Forte, carneiro, árvore forte; símbolo de força e poder', 'substantivo masculino', 'substantivo', 162],
    ['H2416', 'חַי', 'chay', 'chay', 'khai', 'vivo', 'Vivo, ser vivente, animado; que tem vida', 'adjetivo / substantivo', 'adjetivo', 503],
    ['H6213', 'עָשָׂה', 'asah', 'asah', 'aw-saw', 'fazer', 'Fazer, produzir, realizar, criar; verbo de ação comum no AT', 'verbo (Qal)', 'verbo', 2629],
    ['H1961', 'הָיָה', 'hayah', 'hayah', 'haw-yaw', 'ser', 'Ser, tornar-se, acontecer, existir; verbo de estado fundamental', 'verbo (Qal)', 'verbo', 3561],
    ['H559', 'אָמַר', 'amar', 'amar', 'aw-mar', 'dizer', 'Dizer, falar, declarar, pensar; verbo de discurso muito comum', 'verbo (Qal)', 'verbo', 4938],
    ['H8085', 'שָׁמַע', 'shama', 'shama', 'shaw-mah', 'ouvir', 'Ouvir, escutar, obedecer; percepção auditiva e obediência', 'verbo (Qal)', 'verbo', 1159],
    ['H7200', 'רָאָה', 'raah', 'raah', 'raw-aw', 'ver', 'Ver, perceber, contemplar, profetizar; visão física e espiritual', 'verbo (Qal)', 'verbo', 1313],
    ['H3045', 'יָדַע', 'yada', 'yada', 'yaw-dah', 'saber', 'Saber, conhecer, perceber, experimentar; conhecimento íntimo', 'verbo (Qal)', 'verbo', 947],
    ['H3426', 'יָרֵא', 'yare', 'yare', 'yaw-ray', 'temer', 'Temer, reverenciar, ter medo; temor reverente a Deus', 'verbo (Qal)', 'verbo', 378],
    ['H157', 'אָהַב', 'ahab', 'ahab', 'aw-hab', 'amar', 'Amar, desejar, afeiçoar-se; amor humano e divino', 'verbo (Qal)', 'verbo', 212],
    ['H7999', 'שָׁלַם', 'shalam', 'shalam', 'shaw-lam', 'paz', 'Estar completo, em paz, recompensar; raiz de shalom', 'verbo (Qal)', 'verbo', 240],
    ['H6635', 'צֶדֶק', 'tsedeq', 'tsedeq', 'tseh-dek', 'justiça', 'Justiça, retidão, o que é correto; padrão divino de retidão', 'substantivo masculino', 'substantivo', 116],
    ['H4941', 'מִשְׁפָּט', 'mishpat', 'mishpat', 'mish-pawt', 'juízo', 'Juízo, julgamento, decisão, direito, ordenança; ato judicial', 'substantivo masculino', 'substantivo', 418],
    ['H8451', 'תּוֹרָה', 'torah', 'torah', 'to-raw', 'lei', 'Lei, instrução, direção, ensino; a Lei de Deus (Pentateuco)', 'substantivo feminino', 'substantivo', 219],
    ['H7376', 'קָרַב', 'karav', 'qarab', 'kaw-rab', 'chegar', 'Chegar, aproximar-se, apresentar; trazer para perto', 'verbo (Qal)', 'verbo', 282],
    ['H5012', 'נָבָא', 'naba', 'naba', 'naw-baw', 'profetizar', 'Profetizar, falar como profeta, declarar sob inspiração', 'verbo (Nifal/Hifil)', 'verbo', 115],
    ['H7925', 'שָׂכַל', 'sakal', 'sakal', 'saw-kal', 'entender', 'Entender, ter discernimento, ser prudente; sabedoria prática', 'verbo (Qal)', 'verbo', 79],
    ['H6437', 'פָּלַל', 'palal', 'palal', 'paw-lal', 'orar', 'Orar, interceder, julgar; raiz de tefilah (oração)', 'verbo (Hitpael)', 'verbo', 84],
    ['H7854', 'שָׂטָן', 'satan', 'satan', 'saw-tawn', 'adversário', 'Adversário, acusador, oponente; título e nome próprio do Diabo', 'substantivo masculino / nome próprio', 'substantivo', 27],
    ['H7356', 'רַחַם', 'racham', 'racham', 'rakh-am', 'misericordioso', 'Misericordioso, compassivo, enternecer-se; amor materno e divino', 'verbo (Qal/Piel)', 'verbo', 47],
    ['H6664', 'צְדָקָה', 'tsedakah', 'tsedakah', 'tsed-aw-kaw', 'retidão', 'Retidão, justiça, atos justos; frequentemente dádiva aos pobres', 'substantivo feminino', 'substantivo', 152],
    ['H2620', 'חָסָה', 'chasah', 'chasah', 'khaw-saw', 'confiar', 'Confiar, refugiar-se, abrigar-se; buscar proteção', 'verbo (Qal)', 'verbo', 36],
    ['H3498', 'יָתַר', 'yathar', 'yathar', 'yaw-thar', 'abandonar', 'Deixar, abandonar, ser deixado para trás; permanecer após outros partirem', 'verbo (Qal)', 'verbo', 107],
    ['H4672', 'מָצָא', 'matsa', 'matsa', 'maw-tsaw', 'encontrar', 'Encontrar, alcançar, descobrir, ocorrer; vir a existir ou localizar', 'verbo (Qal)', 'verbo', 649],
    ['H5975', 'עָלָה', 'alah', 'alah', 'aw-law', 'subir', 'Subir, ascender, levar; movimento para cima ou sacrifício queimado', 'verbo (Qal)', 'verbo', 878],
    ['H3381', 'יָרַד', 'yarad', 'yarad', 'yaw-rad', 'descer', 'Descer, ir abaixo, cair; movimento para baixo', 'verbo (Qal)', 'verbo', 380],
    ['H3318', 'יָצָא', 'yatsa', 'yatsa', 'yaw-tsaw', 'sair', 'Sair, partir, proceder, ir adiante; movimento para fora', 'verbo (Qal)', 'verbo', 1074],
    ['H3423', 'יָרַשׁ', 'yarash', 'yarash', 'yaw-rash', 'possuir', 'Possuir, herdar, tomar posse, desapossar; herdar uma terra', 'verbo (Qal)', 'verbo', 261],
    ['H2403', 'חָטָא', 'chata', 'chata', 'khaw-taw', 'pecar', 'Pecar, errar o alvo, cometer falta; ofender contra Deus ou homem', 'verbo (Qal)', 'verbo', 238],
    ['H6680', 'צוּר', 'tsur', 'tsur', 'tsoor', 'rocha', 'Rocha, penhasco, força; metáfora de Deus como refúgio seguro', 'substantivo masculino', 'substantivo', 75],
    ['H5375', 'נָשָׂא', 'nasa', 'nasa', 'naw-saw', 'carregar', 'Levantar, carregar, suportar, perdoar; elevar ou tomar sobre si', 'verbo (Qal)', 'verbo', 654],
  ];

  let inseridas = 0;
  for (const p of palavras) {
    const r = await c.query(
      `INSERT INTO palavras_hebraicas (id, strong, palavra_original, lemma, transliteracao, pronuncia, definicao_curta, definicao_completa, morfologia, classe_gramatical, frequencia_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       ON CONFLICT (strong) DO NOTHING`,
      [crypto.randomUUID(), ...p]
    );
    if (r.rowCount > 0) inseridas++;
  }
  console.log(`  ${palavras.length} palavras hebraicas tentadas, ${inseridas} novas inseridas`);
}

async function seed() {
  const c = await pool.connect();
  try {
    console.log('Conectado ao banco. Iniciando seed de MAIS conteúdo...');
    const ids = await buscarIds(c);
    console.log(`  NVI: ${ids.NVI}`);
    console.log(`  Livros encontrados: ${Object.keys(ids.livros).join(', ')}`);

    const capsMap = await buscarOuCriarCapitulos(c, ids);
    await seedVersiculos(c, ids, capsMap);
    await seedPalavrasGregas(c);
    await seedPalavrasHebraicas(c);

    console.log('Seed de MAIS conteúdo concluído com sucesso!');
  } catch (e) {
    console.error('Erro no seed:', e.message);
    console.error(e.stack);
  } finally {
    c.release();
    await pool.end();
  }
}

seed();
