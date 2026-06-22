import { DataSource } from 'typeorm';

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    entities: [__dirname + '/../entities/**/*.entity{.ts,.js}'],
    synchronize: true,
  });

  await dataSource.initialize();
  console.log('DB conectado. Iniciando seed...');

  const query = dataSource.createQueryRunner();
  await query.connect();
  await query.startTransaction();

  try {
    // 1. VERSIONS
    console.log('Criando versoes...');
    const versoes = await query.query(`
      INSERT INTO bible_versions (id, sigla, nome, idioma, tipo, ano, ativo, criado_em, atualizado_em)
      VALUES
        (gen_random_uuid(), 'ARA', 'Atualizada Revisada Ampliada', 'portugues', 'protestante', 1993, true, NOW(), NOW()),
        (gen_random_uuid(), 'NVI', 'Nova Versao Internacional', 'portugues', 'protestante', 2000, true, NOW(), NOW()),
        (gen_random_uuid(), 'ARC', 'Almeida Revista e Corrigida', 'portugues', 'protestante', 1993, true, NOW(), NOW())
      RETURNING id, sigla
    `);
    const versaoAraId = versoes.find((v: any) => v.sigla === 'ARA').id;

    // 2. BOOKS
    console.log('Criando livros...');
    const livrosData = [
      { nome: 'Genesis', slug: 'genesis', ordem: 1, testamento: 'AT', genero: 'narrativa', autor: 'Moises', capitulos: 50 },
      { nome: 'Exodo', slug: 'exodo', ordem: 2, testamento: 'AT', genero: 'narrativa', autor: 'Moises', capitulos: 40 },
      { nome: 'Levitico', slug: 'levitico', ordem: 3, testamento: 'AT', genero: 'lei', autor: 'Moises', capitulos: 27 },
      { nome: 'Numeros', slug: 'numeros', ordem: 4, testamento: 'AT', genero: 'lei', autor: 'Moises', capitulos: 36 },
      { nome: 'Deuteronomio', slug: 'deuteronomio', ordem: 5, testamento: 'AT', genero: 'lei', autor: 'Moises', capitulos: 34 },
      { nome: 'Josue', slug: 'josue', ordem: 6, testamento: 'AT', genero: 'narrativa', autor: 'Josue', capitulos: 24 },
      { nome: 'Juizes', slug: 'juizes', ordem: 7, testamento: 'AT', genero: 'narrativa', autor: 'Desconhecido', capitulos: 21 },
      { nome: 'Rute', slug: 'rute', ordem: 8, testamento: 'AT', genero: 'narrativa', autor: 'Desconhecido', capitulos: 4 },
      { nome: '1 Samuel', slug: '1-samuel', ordem: 9, testamento: 'AT', genero: 'narrativa', autor: 'Samuel/Gad/Natan', capitulos: 31 },
      { nome: '2 Samuel', slug: '2-samuel', ordem: 10, testamento: 'AT', genero: 'narrativa', autor: 'Gad/Natan', capitulos: 24 },
      { nome: '1 Reis', slug: '1-reis', ordem: 11, testamento: 'AT', genero: 'narrativa', autor: 'Desconhecido', capitulos: 22 },
      { nome: '2 Reis', slug: '2-reis', ordem: 12, testamento: 'AT', genero: 'narrativa', autor: 'Desconhecido', capitulos: 25 },
      { nome: '1 Cronicas', slug: '1-cronicas', ordem: 13, testamento: 'AT', genero: 'historia', autor: 'Esdras', capitulos: 29 },
      { nome: '2 Cronicas', slug: '2-cronicas', ordem: 14, testamento: 'AT', genero: 'historia', autor: 'Esdras', capitulos: 36 },
      { nome: 'Esdras', slug: 'esdras', ordem: 15, testamento: 'AT', genero: 'historia', autor: 'Esdras', capitulos: 10 },
      { nome: 'Neemias', slug: 'neemias', ordem: 16, testamento: 'AT', genero: 'historia', autor: 'Neemias', capitulos: 13 },
      { nome: 'Ester', slug: 'ester', ordem: 17, testamento: 'AT', genero: 'narrativa', autor: 'Desconhecido', capitulos: 10 },
      { nome: 'Jo', slug: 'jo', ordem: 18, testamento: 'AT', genero: 'poesia', autor: 'Moises', capitulos: 42 },
      { nome: 'Salmos', slug: 'salmos', ordem: 19, testamento: 'AT', genero: 'poesia', autor: 'David/outros', capitulos: 150 },
      { nome: 'Proverbios', slug: 'proverbios', ordem: 20, testamento: 'AT', genero: 'sabedoria', autor: 'Salomao', capitulos: 31 },
      { nome: 'Eclesiastes', slug: 'eclesiastes', ordem: 21, testamento: 'AT', genero: 'sabedoria', autor: 'Salomao', capitulos: 12 },
      { nome: 'Cantares', slug: 'cantares', ordem: 22, testamento: 'AT', genero: 'poesia', autor: 'Salomao', capitulos: 8 },
      { nome: 'Isaias', slug: 'isaias', ordem: 23, testamento: 'AT', genero: 'profetico', autor: 'Isaias', capitulos: 66 },
      { nome: 'Jeremias', slug: 'jeremias', ordem: 24, testamento: 'AT', genero: 'profetico', autor: 'Jeremias', capitulos: 52 },
      { nome: 'Lamentacoes', slug: 'lamentacoes', ordem: 25, testamento: 'AT', genero: 'poesia', autor: 'Jeremias', capitulos: 5 },
      { nome: 'Ezequiel', slug: 'ezequiel', ordem: 26, testamento: 'AT', genero: 'profetico', autor: 'Ezequiel', capitulos: 48 },
      { nome: 'Daniel', slug: 'daniel', ordem: 27, testamento: 'AT', genero: 'profetico', autor: 'Daniel', capitulos: 12 },
      { nome: 'Oseias', slug: 'oseias', ordem: 28, testamento: 'AT', genero: 'profetico', autor: 'Oseias', capitulos: 14 },
      { nome: 'Joel', slug: 'joel', ordem: 29, testamento: 'AT', genero: 'profetico', autor: 'Joel', capitulos: 3 },
      { nome: 'Amos', slug: 'amos', ordem: 30, testamento: 'AT', genero: 'profetico', autor: 'Amos', capitulos: 9 },
      { nome: 'Obadias', slug: 'obadias', ordem: 31, testamento: 'AT', genero: 'profetico', autor: 'Obadias', capitulos: 1 },
      { nome: 'Jonas', slug: 'jonas', ordem: 32, testamento: 'AT', genero: 'narrativa', autor: 'Jonas', capitulos: 4 },
      { nome: 'Miqueias', slug: 'miqueias', ordem: 33, testamento: 'AT', genero: 'profetico', autor: 'Miqueias', capitulos: 7 },
      { nome: 'Naum', slug: 'naum', ordem: 34, testamento: 'AT', genero: 'profetico', autor: 'Naum', capitulos: 3 },
      { nome: 'Habacuque', slug: 'habacuque', ordem: 35, testamento: 'AT', genero: 'profetico', autor: 'Habacuque', capitulos: 3 },
      { nome: 'Sofonias', slug: 'sofonias', ordem: 36, testamento: 'AT', genero: 'profetico', autor: 'Sofonias', capitulos: 3 },
      { nome: 'Ageu', slug: 'ageu', ordem: 37, testamento: 'AT', genero: 'profetico', autor: 'Ageu', capitulos: 2 },
      { nome: 'Zacarias', slug: 'zacarias', ordem: 38, testamento: 'AT', genero: 'profetico', autor: 'Zacarias', capitulos: 14 },
      { nome: 'Malaquias', slug: 'malaquias', ordem: 39, testamento: 'AT', genero: 'profetico', autor: 'Malaquias', capitulos: 4 },
      { nome: 'Mateus', slug: 'mateus', ordem: 40, testamento: 'NT', genero: 'evangelho', autor: 'Mateus', capitulos: 28 },
      { nome: 'Marcos', slug: 'marcos', ordem: 41, testamento: 'NT', genero: 'evangelho', autor: 'Marcos', capitulos: 16 },
      { nome: 'Lucas', slug: 'lucas', ordem: 42, testamento: 'NT', genero: 'evangelho', autor: 'Lucas', capitulos: 24 },
      { nome: 'Joao', slug: 'joao', ordem: 43, testamento: 'NT', genero: 'evangelho', autor: 'Joao', capitulos: 21 },
      { nome: 'Atos', slug: 'atos', ordem: 44, testamento: 'NT', genero: 'historia', autor: 'Lucas', capitulos: 28 },
      { nome: 'Romanos', slug: 'romanos', ordem: 45, testamento: 'NT', genero: 'epistola', autor: 'Paulo', capitulos: 16 },
      { nome: '1 Corintios', slug: '1-corintios', ordem: 46, testamento: 'NT', genero: 'epistola', autor: 'Paulo', capitulos: 16 },
      { nome: '2 Corintios', slug: '2-corintios', ordem: 47, testamento: 'NT', genero: 'epistola', autor: 'Paulo', capitulos: 13 },
      { nome: 'Galatas', slug: 'galatas', ordem: 48, testamento: 'NT', genero: 'epistola', autor: 'Paulo', capitulos: 6 },
      { nome: 'Efesios', slug: 'efesios', ordem: 49, testamento: 'NT', genero: 'epistola', autor: 'Paulo', capitulos: 6 },
      { nome: 'Filipenses', slug: 'filipenses', ordem: 50, testamento: 'NT', genero: 'epistola', autor: 'Paulo', capitulos: 4 },
      { nome: 'Colossenses', slug: 'colossenses', ordem: 51, testamento: 'NT', genero: 'epistola', autor: 'Paulo', capitulos: 4 },
      { nome: '1 Tessalonicenses', slug: '1-tessalonicenses', ordem: 52, testamento: 'NT', genero: 'epistola', autor: 'Paulo', capitulos: 5 },
      { nome: '2 Tessalonicenses', slug: '2-tessalonicenses', ordem: 53, testamento: 'NT', genero: 'epistola', autor: 'Paulo', capitulos: 3 },
      { nome: '1 Timoteo', slug: '1-timoteo', ordem: 54, testamento: 'NT', genero: 'epistola', autor: 'Paulo', capitulos: 6 },
      { nome: '2 Timoteo', slug: '2-timoteo', ordem: 55, testamento: 'NT', genero: 'epistola', autor: 'Paulo', capitulos: 4 },
      { nome: 'Tito', slug: 'tito', ordem: 56, testamento: 'NT', genero: 'epistola', autor: 'Paulo', capitulos: 3 },
      { nome: 'Filemom', slug: 'filemom', ordem: 57, testamento: 'NT', genero: 'epistola', autor: 'Paulo', capitulos: 1 },
      { nome: 'Hebreus', slug: 'hebreus', ordem: 58, testamento: 'NT', genero: 'epistola', autor: 'Desconhecido', capitulos: 13 },
      { nome: 'Tiago', slug: 'tiago', ordem: 59, testamento: 'NT', genero: 'epistola', autor: 'Tiago', capitulos: 5 },
      { nome: '1 Pedro', slug: '1-pedro', ordem: 60, testamento: 'NT', genero: 'epistola', autor: 'Pedro', capitulos: 5 },
      { nome: '2 Pedro', slug: '2-pedro', ordem: 61, testamento: 'NT', genero: 'epistola', autor: 'Pedro', capitulos: 3 },
      { nome: '1 Joao', slug: '1-joao', ordem: 62, testamento: 'NT', genero: 'epistola', autor: 'Joao', capitulos: 5 },
      { nome: '2 Joao', slug: '2-joao', ordem: 63, testamento: 'NT', genero: 'epistola', autor: 'Joao', capitulos: 1 },
      { nome: '3 Joao', slug: '3-joao', ordem: 64, testamento: 'NT', genero: 'epistola', autor: 'Joao', capitulos: 1 },
      { nome: 'Judas', slug: 'judas', ordem: 65, testamento: 'NT', genero: 'epistola', autor: 'Judas', capitulos: 1 },
      { nome: 'Apocalipse', slug: 'apocalipse', ordem: 66, testamento: 'NT', genero: 'profetico', autor: 'Joao', capitulos: 22 },
    ];

    const livroIds: Record<string, string> = {};
    for (const l of livrosData) {
      const res = await query.query(`
        INSERT INTO bible_books (id, versao_id, ordem, nome, testamento, genero, autor, totalCapitulos, criado_em, atualizado_em)
        VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
        RETURNING id, nome
      `, [versaoAraId, l.ordem, l.nome, l.testamento, l.genero, l.autor, l.capitulos]);
      livroIds[l.slug] = res[0].id;
    }

    // 3. CHAPTERS
    console.log('Criando capitulos...');
    const capituloIds: Record<string, string> = {};
    for (const l of livrosData) {
      for (let c = 1; c <= l.capitulos; c++) {
        const res = await query.query(`
          INSERT INTO bible_chapters (id, livro_id, numero, criado_em, atualizado_em)
          VALUES (gen_random_uuid(), $1, $2, NOW(), NOW())
          RETURNING id
        `, [livroIds[l.slug], c]);
        capituloIds[`${l.slug}-${c}`] = res[0].id;
      }
    }

    // 4. VERSES - Key passages
    console.log('Criando versiculos...');
    const versiculos: Record<string, { livro: string; cap: number; v: number; texto: string }> = {
      'gen-1-1': { livro: 'genesis', cap: 1, v: 1, texto: 'No principio criou Deus os ceus e a terra.' },
      'gen-1-3': { livro: 'genesis', cap: 1, v: 3, texto: 'E disse Deus: Haja luz; e houve luz.' },
      'gen-12-1': { livro: 'genesis', cap: 12, v: 1, texto: 'Disse o Senhor a Abrai: Vai-te da tua terra, da tua parentela e da casa de teu pai, para a terra que eu te mostrarei.' },
      'gen-15-6': { livro: 'genesis', cap: 15, v: 6, texto: 'E creu ele no Senhor, e isso lhe foi imputado por justica.' },
      'gen-22-18': { livro: 'genesis', cap: 22, v: 18, texto: 'Em tua semente serao abencoadas todas as nacoes da terra, porque obedeceste a minha voz.' },
      'ex-3-14': { livro: 'exodo', cap: 3, v: 14, texto: 'Disse Deus a Moises: EU SOU O QUE SOU. E disse: Assim diras aos filhos de Israel: EU SOU me enviou a vós.' },
      'ex-20-3': { livro: 'exodo', cap: 20, v: 3, texto: 'Nao teras outros deuses diante de mim.' },
      'ex-20-13': { livro: 'exodo', cap: 20, v: 13, texto: 'Na mataras.' },
      'is-7-14': { livro: 'isaias', cap: 7, v: 14, texto: 'Por isso o proprio Senhor vos dara um sinal: Eis que a virgem concebera e tera um filho, e chamaras o seu nome Emanuel.' },
      'is-9-6': { livro: 'isaias', cap: 9, v: 6, texto: 'Porque um menino nos nasceu, um filho nos foi dado, e o principado estara sobre os seus ombros; e se chamarao: Conselheiro, Deus Forte, Pai eterno, Principe da paz.' },
      'is-53-5': { livro: 'isaias', cap: 53, v: 5, texto: 'Mas ele foi ferido pelas nossas transgressoes, moido pelas nossas iniquidades; o castigo da nossa paz estava sobre ele, e pelas suas pisaduras fomos curados.' },
      'miq-5-2': { livro: 'miqueias', cap: 5, v: 2, texto: 'Mas tu, Belhem, Efrata, ainda que sejas a menor entre as milhares de Judá, de ti me saira aquele que ha de governar em Israel, cujas saidas sao desde o principio, desde os dias da eternidade.' },
      'sal-23-1': { livro: 'salmos', cap: 23, v: 1, texto: 'O Senhor e o meu pastor; nada me faltara.' },
      'sal-119-105': { livro: 'salmos', cap: 119, v: 105, texto: 'Lampada para os meus pes e a tua palavra, e luz para o meu caminho.' },
      'sal-139-14': { livro: 'salmos', cap: 139, v: 14, texto: 'Eu te louvarei, porque de um modo assombroso, e de uma maneira maravilhosa fui feito; maravilhosas sao as tuas obras, e a minha alma o sabe muito bem.' },
      'prov-3-5': { livro: 'proverbios', cap: 3, v: 5, texto: 'Confia no Senhor de todo o teu coracao, e nao te estribes no teu propio entendimento.' },
      'prov-3-6': { livro: 'proverbios', cap: 3, v: 6, texto: 'Reconhece-o em todos os teus caminhos, e ele endireitara as tuas veredas.' },
      'ec-12-13': { livro: 'eclesiastes', cap: 12, v: 13, texto: 'Ouve-se o fim de todo o assunto: Teme a Deus e guarda os seus mandamentos; porque isso e o dever de todo homem.' },
      'jon-1-1': { livro: 'jonas', cap: 1, v: 1, texto: 'Ela palavra do Senhor veio a Jonas, filho de Amitei, dizendo:' },
      'jon-2-2': { livro: 'jonas', cap: 2, v: 2, texto: 'E clamou Jonas, da barriga do peixe, e disse: Do meu aperto clamei ao Senhor, e ele me ouviu; do ventre do inferno gritei, e tu ouviste a minha voz.' },
      'mt-1-23': { livro: 'mateus', cap: 1, v: 23, texto: 'Eis a virgem estara grávida e tera um filho, e chamarao o seu nome Emanuel, que traduzido e: Deus conosco.' },
      'mt-5-3': { livro: 'mateus', cap: 5, v: 3, texto: 'Bem-aventurados os pobres de espirito, porque deles e o reino dos ceus.' },
      'mt-5-14': { livro: 'mateus', cap: 5, v: 14, texto: 'Vós sois a luz do mundo. Nao pode uma cidade esconder-se sobre um monte elevation.' },
      'mt-6-33': { livro: 'mateus', cap: 6, v: 33, texto: 'Mas, buscai primeiro o reino de Deus, e a sua justica, e todas estas coisas vos serao acrescentadas.' },
      'mt-11-28': { livro: 'mateus', cap: 11, v: 28, texto: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.' },
      'mt-22-37': { livro: 'mateus', cap: 22, v: 37, texto: 'Jesus lhe disse: Amaras o Senhor, teu Deus, de todo o teu coracao, de toda a tua alma e de todo o teu entendimento.' },
      'mt-28-19': { livro: 'mateus', cap: 28, v: 19, texto: 'Ide, portanto, e fazei discipulos de todas as nacoes, baptizando-os em nome do Pai, e do Filho, e do Espirito Santo.' },
      'mc-1-15': { livro: 'marcos', cap: 1, v: 15, texto: 'E dizendo: O tempo esta cumprido, e o reino de Deus esta proximo; arrependei-vos e crei no evangelho.' },
      'mc-16-16': { livro: 'marcos', cap: 16, v: 16, texto: 'Quem crer e for baptizado sera salvo; mas quem nao crer sera condenado.' },
      'lc-1-37': { livro: 'lucas', cap: 1, v: 37, texto: 'Porque ninguna palavra sera impossivel a Deus.' },
      'lc-2-11': { livro: 'lucas', cap: 2, v: 11, texto: 'Porque vos nasceu hoje, na cidade de Davi, o Salvador, que e o Cristo, o Senhor.' },
      'lc-15-7': { livro: 'lucas', cap: 15, v: 7, texto: 'Assim, vos digo que haverá maior alegria no ceu por um pecador que se arrepende do que por noventa e nove justos que nao precisam de arrependimento.' },
      'lc-23-34': { livro: 'lucas', cap: 23, v: 34, texto: 'Disse Jesus: Pai, perdoa-lhes, porque nao sabem o que facem.' },
      'jo-1-1': { livro: 'joao', cap: 1, v: 1, texto: 'No principio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
      'jo-1-14': { livro: 'joao', cap: 1, v: 14, texto: 'E o Verbo se fez carne, e habitou entre nos, e contemplamos a sua gloria, gloria como a do unigénito do Pai, cheio de graca e de verdade.' },
      'jo-3-16': { livro: 'joao', cap: 3, v: 16, texto: 'Porque assim amou Deus o mundo, que deu o seu Filho unigénito, para que todo aquele que nele cre nao pereça, mas tenha a vida eterna.' },
      'jo-8-32': { livro: 'joao', cap: 8, v: 32, texto: 'E conhecereis a verdade, e a verdade vos libertara.' },
      'jo-10-10': { livro: 'joao', cap: 10, v: 10, texto: 'O ladrao nao veio senao para roubar, matar e destruir; eu vim para que tenham vida, e a tenham em abundance.' },
      'jo-11-25': { livro: 'joao', cap: 11, v: 25, texto: 'Disse-lhe Jesus: Eu sou a ressurreicao e a vida; quem crê em mim, ainda que morra, vivera.' },
      'jo-14-6': { livro: 'joao', cap: 14, v: 6, texto: 'Disse-lhe Jesus: Eu sou o caminho, e a verdade, e a vida; ninguem vem ao Pai senao por mim.' },
      'jo-14-27': { livro: 'joao', cap: 14, v: 27, texto: 'Deixo-vos a paz, a minha paz vos dou; nao vo-la dou como o mundo a da. Nao se turbe o vosso coracao, nem se atemorize.' },
      'at-1-8': { livro: 'atos', cap: 1, v: 8, texto: 'Mas recebereis poder, quando o Espirito Santo descer sobre vós, e sereis minhas testemunhas em Jerusalém, em toda a Judeia, na Samaria, e ate os confins da terra.' },
      'at-2-38': { livro: 'atos', cap: 2, v: 38, texto: 'Pedro lhes disse: Arrependei-vos, e cada um de vós seja baptizado em nome de Jesus Cristo, para perdao dos pecados; e recebereis o dom do Espirito Santo.' },
      'at-4-12': { livro: 'atos', cap: 4, v: 12, texto: 'E nao ha salvação em nenhum outro; porque nao ha outro nome debaixo do ceu, dado entre os homens, pelo qual devamos ser salvos.' },
      'rm-3-10': { livro: 'romanos', cap: 3, v: 10, texto: 'Como esta escrito: Nao ha um justo, nem um sequer.' },
      'rm-3-23': { livro: 'romanos', cap: 3, v: 23, texto: 'Porque todos pecaram e destituídos estao da glória de Deus.' },
      'rm-5-8': { livro: 'romanos', cap: 5, v: 8, texto: 'Mas Deus prova o seu amor por nos em que Cristo morreu por nos, sendo nos ainda pecadores.' },
      'rm-6-23': { livro: 'romanos', cap: 6, v: 23, texto: 'Porque o salario do pecado e a morte, mas o dom gratuito de Deus e a vida eterna em Cristo Jesus, nosso Senhor.' },
      'rm-8-1': { livro: 'romanos', cap: 8, v: 1, texto: 'Portanto, agora nenhuma condenação ha para os que estao em Cristo Jesus.' },
      'rm-8-28': { livro: 'romanos', cap: 8, v: 28, texto: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que sao chamados segundo o seu proposito.' },
      'rm-8-38-39': { livro: 'romanos', cap: 8, v: 38, texto: 'Porque estou certo de que, nem a morte, nem a vida, nem anjos, nem principados, nem potestades, nem o presente, nem o porvir, nem a alturas, nem a profundezas, nem alguma outra criatura nos poderá separar do amor de Deus, que esta em Cristo Jesus nosso Senhor.' },
      'rm-10-9': { livro: 'romanos', cap: 10, v: 9, texto: 'Se, pois, confessares com a tua boca que Jesus e o Senhor, e creres no teu coracao que Deus o ressuscitou dos mortos, seras salvo.' },
      'rm-12-2': { livro: 'romanos', cap: 12, v: 2, texto: 'E nao vos conformeis com este mundo, mas transformai-vos pela renovação do vosso entendimento, para que experimenteis qual seja a boa, agradavel, e perfeita vontade de Deus.' },
      '1co-10-13': { livro: '1-corintios', cap: 10, v: 13, texto: 'Nenhuma tentação vos tem alcançado que nao seja humana; e fiel e Deus, que nao vos deixara ser tentados acima do que podeis, mas juntamente com a tentacao preparara o meio de sair, para que a possais suportar.' },
      '1co-13-4': { livro: '1-corintios', cap: 13, v: 4, texto: 'O amor e sofredor, e benigno; o amor nao e invejoso; o amor nao trata com leviandade, nao se ensoberbece.' },
      '1co-15-3-4': { livro: '1-corintios', cap: 15, v: 3, texto: 'Porque antes de tudo vos entreguei o que tambem recebi: que Cristo morreu por nossos pecados, segundo as Escrituras; e que foi sepultado, e que ressuscitou ao terceiro dia, segundo as Escrituras.' },
      '2co-5-17': { livro: '2-corintios', cap: 5, v: 17, texto: 'De sorte que, se alguem esta em Cristo, nova criatura e; as coisas velhas ja passaram; eis que tudo se fez novo.' },
      '2co-12-9': { livro: '2-corintios', cap: 12, v: 9, texto: 'Mas ele me disse: A minha graca e suficiente para ti, porque o meu poder se aperfeiçoa na fraqueza. Portanto, de boa vontade me glorarei mais nas minhas fraquezas, para que repouse em mim o poder de Cristo.' },
      'gl-2-20': { livro: 'galatas', cap: 2, v: 20, texto: 'Ja estou crucificado com Cristo; e nao sou eu que vivo, mas Cristo vive em mim. E a vida que agora vivo na carne, vivo-a na fé no Filho de Deus, o qual me amou, e a si mesmo se entregou por mim.' },
      'gl-5-22-23': { livro: 'galatas', cap: 5, v: 22, texto: 'Mas o fruto do Espirito e: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidao, temperança. Contra estas coisas nao ha lei.' },
      'ef-2-8': { livro: 'efesios', cap: 2, v: 8, texto: 'Porque pela graca sois salvos, por meio da fé; e isto nao vem de vós, e dom de Deus.' },
      'ef-2-9': { livro: 'efesios', cap: 2, v: 9, texto: 'Nao vem das obras, para que ninguem se glorie.' },
      'ef-6-10': { livro: 'efesios', cap: 6, v: 10, texto: 'No demais, irmãos meus, fortalecei-vos no Senhor e na força do seu poder.' },
      'fp-4-13': { livro: 'filipenses', cap: 4, v: 13, texto: 'Posso todas as coisas naquele que me fortalece.' },
      'fp-4-19': { livro: 'filipenses', cap: 4, v: 19, texto: 'E o meu Deus suprirá todas as vossas necessidades segundo a sua riqueza, em glória, por Cristo Jesus.' },
      'cl-3-23': { livro: 'colossenses', cap: 3, v: 23, texto: 'Tudo o que fizerdes, fazei de coracao, como para o Senhor, e nao para os homens.' },
      '1ts-5-16-18': { livro: '1-tessalonicenses', cap: 5, v: 16, texto: 'Regozijai-vos sempre. Orai sem cessar. Em tudo dai graças, porque esta e a vontade de Deus em Cristo Jesus para convosco.' },
      '1tm-2-5': { livro: '1-timoteo', cap: 2, v: 5, texto: 'Porque há um só Deus, e um só mediador entre Deus e os homens, Jesus Cristo homem.' },
      '2tm-3-16': { livro: '2-timoteo', cap: 3, v: 16, texto: 'Toda a Escritura e divinamente inspirada, e proveitosa para ensinar, para repreender, para corrigir, para instruir em justiça.' },
      'hb-1-1': { livro: 'hebreus', cap: 1, v: 1, texto: 'Muitas vezes, e de muitas maneiras, falou Deus aos nossos pais, por intermedio dos profetas.' },
      'hb-4-12': { livro: 'hebreus', cap: 4, v: 12, texto: 'Porque a palavra de Deus e viva, e eficaz, e mais cortante do que qualquer espada de dois gumes, e penetra ate ao ponto de dividir alma e espirito, articulações e medulas, e e apta para discernir os pensamentos e propósitos do coração.' },
      'hb-11-1': { livro: 'hebreus', cap: 11, v: 1, texto: 'Ora, a fé e a certeza daquilo que esperamos, e a prova das coisas que nao vemos.' },
      'hb-12-2': { livro: 'hebreus', cap: 12, v: 2, texto: 'Olhando para Jesus, autor e consumador da fé, o qual, na alegria que lhe foi proposta, suportou a cruz, desprezando o vituperio, e assentou-se a destra do trono de Deus.' },
      'tg-1-5': { livro: 'tiago', cap: 1, v: 5, texto: 'E, se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos da liberalmente, e o nao lança em rosto, e ser-lhe-á dada.' },
      'tg-2-17': { livro: 'tiago', cap: 2, v: 17, texto: 'Assim tambem a fé, se nao tiver obras, e morta em si mesma.' },
      '1pe-5-7': { livro: '1-pedro', cap: 5, v: 7, texto: 'Lançando sobre ele todo o vosso cuidado, porque ele mesmo tem cuidado de vós.' },
      '1jo-1-9': { livro: '1-joao', cap: 1, v: 9, texto: 'Se confessarmos os nossos pecados, ele e fiel e justo para nos perdoar os pecados, e nos purificar de toda a injustiça.' },
      '1jo-4-8': { livro: '1-joao', cap: 4, v: 8, texto: 'Quem nao ama nao conhece a Deus, porque Deus e amor.' },
      '1jo-4-19': { livro: '1-joao', cap: 4, v: 19, texto: 'Nos amamos porque ele nos amou primeiro.' },
      'ap-3-20': { livro: 'apocalipse', cap: 3, v: 20, texto: 'Eis que estou a porta, e bato; se alguem ouvir a minha voz, e abrir a porta, entrarei por ele, e cearei com ele, e ele comigo.' },
      'ap-21-1': { livro: 'apocalipse', cap: 21, v: 1, texto: 'Vi novos ceus e uma nova terra; porque ja os primeiros ceus e a primeira terra passaram, e o mar ja nao existe.' },
      'ap-22-20': { livro: 'apocalipse', cap: 22, v: 20, texto: 'Aquele que testifica estas coisas diz: Certamente, cedo venho. Amen; sim, vem, Senhor Jesus.' },
    };

    for (const [, v] of Object.entries(versiculos)) {
      const livroId = livroIds[v.livro];
      const capId = capituloIds[`${v.livro}-${v.cap}`];
      if (livroId && capId) {
        await query.query(`
          INSERT INTO bible_verses (id, versao_id, livro_id, capitulo_id, numero, texto, criado_em, atualizado_em)
          VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), NOW())
        `, [versaoAraId, livroId, capId, v.v, v.texto]);
      }
    }

    // 5. DOCTRINES
    console.log('Criando doutrinas...');
    await query.query(`
      INSERT INTO doctrines (id, nome, categoria, descricao, fundamentoScriptureiro, referenciasChave, criado_em, atualizado_em) VALUES
      (gen_random_uuid(), 'Bibliologia', 'Revelacao', 'Doutrina sobre a inspiração, inerrancia e autoridade das Escrituras.', '2 Timoteo 3:16; 2 Pedro 1:20-21', '["2 Timoteo 3:16","2 Pedro 1:20-21","Hebreus 4:12"]', NOW(), NOW()),
      (gen_random_uuid(), 'Teologia Proper', 'Deus', 'Estudo dos atributos de Deus: soberania, santidade, amor, justiça, misericórdia.', 'Exodo 34:6-7; Salmo 145:8-9', '["Exodo 34:6-7","Salmo 145:8-9","Isaias 6:3"]', NOW(), NOW()),
      (gen_random_uuid(), 'Cristologia', 'Cristo', 'Doutrina sobre a pessoa e obra de Cristo: natureza divina e humana, encarnação, expiação.', 'Joao 1:1-14; Colossenses 1:15-20', '["Joao 1:1-14","Colossenses 1:15-20","Filipenses 2:5-11"]', NOW(), NOW()),
      (gen_random_uuid(), 'Soteriologia', 'Salvacao', 'Doutrina da salvação: pecado, graça, fé, justificação, regeneração, santificação.', 'Efesios 2:8-9; Romanos 3:23-24', '["Efesios 2:8-9","Romanos 3:23-24","Romanos 8:1"]', NOW(), NOW()),
      (gen_random_uuid(), 'Pneumatologia', 'Espirito Santo', 'Doutrina sobre o Espirito Santo: personalidade, divindade, obras e dons.', 'Joao 14:16-17; Atos 1:8', '["Joao 14:16-17","Atos 1:8","1 Corintios 12:4-11"]', NOW(), NOW()),
      (gen_random_uuid(), 'Eclesiologia', 'Igreja', 'Doutrina sobre a igreja: natureza, missão, governança, sacramentos.', 'Mateus 16:18; Efesios 5:25-27', '["Mateus 16:18","Efesios 5:25-27","Atos 2:42"]', NOW(), NOW()),
      (gen_random_uuid(), 'Escatologia', 'Futuras Coisas', 'Doutrina sobre as últimas coisas: retorno de Cristo, julgamento, milênio, céu e inferno.', 'Apocalipse 21:1-4; 1 Tessalonicenses 4:16-17', '["Apocalipse 21:1-4","1 Tessalonicenses 4:16-17","Mateus 25:31-46"]', NOW(), NOW()),
      (gen_random_uuid(), 'Angelologia', 'Seres Sobrenaturais', 'Doutrina sobre anjos e demônios: natureza, função, batalha espiritual.', 'Efesios 6:12; Salmo 91:11', '["Efesios 6:12","Salmo 91:11","Daniel 10:13"]', NOW(), NOW()),
      (gen_random_uuid(), 'Hamartiologia', 'Pecado', 'Doutrina sobre o pecado: origem, natureza, efeito na humanidade.', 'Romanos 5:12; Gênesis 3:1-19', '["Romanos 5:12","Gênesis 3:1-19","Romanos 3:10"]', NOW(), NOW()),
      (gen_random_uuid(), 'Cristologia - Mesiânica', 'Profecia', 'Profecias messiânicas no Antigo Testamento e seu cumprimento em Cristo.', 'Isaias 53; Miqueias 5:2', '["Isaias 53","Miqueias 5:2","Isaias 7:14"]', NOW(), NOW()),
      (gen_random_uuid(), 'Cosmologia Bíblica', 'Criacao', 'Doutrina sobre a criação: ordem da criação, queda, restauração.', 'Gênesis 1:1; Romanos 8:19-22', '["Gênesis 1:1","Romanos 8:19-22","Apocalipse 21:1"]', NOW(), NOW())
    `);

    // 6. LEXICON - Key Greek words
    console.log('Criando lexico grego...');
    await query.query(`
      INSERT INTO lexicon_entries (id, strong, idioma, lemma, transliteracao, classeGramatical, definicao, significados, totalOcorrencias, criado_em, atualizado_em) VALUES
      (gen_random_uuid(), 'G3056', 'grego', 'logos', 'logos', 'substantivo', 'Palavra, razão, discurso. No NT, refere-se a Cristo como a Palavra eterna de Deus.', '["palavra","razão","verbo","discurso","princípio"]', 330, NOW(), NOW()),
      (gen_random_uuid(), 'G26', 'grego', 'agape', 'agape', 'substantivo', 'Amor incondicional, amor sacrificial. O tipo mais elevado de amor no NT.', '["amor","caridade","afeição"]', 116, NOW(), NOW()),
      (gen_random_uuid(), 'G4100', 'grego', 'pistis', 'pistis', 'substantivo', 'Fé, confiança, crença. Confidence em Deus e na sua Palavra.', '["fé","crença","confiança","fidelidade"]', 243, NOW(), NOW()),
      (gen_random_uuid(), 'G266', 'grego', 'agathos', 'agathos', 'adjetivo', 'Bom, nobre, excelente. Usado para descrever Deus e as boas obras.', '["bom","nobre","excelente","virtuoso"]', 102, NOW(), NOW()),
      (gen_random_uuid(), 'G3779', 'grego', 'huios', 'huios', 'substantivo', 'Filho. Usado para filhos biológicos e espirituais, e especialmente para Cristo.', '["filho","descendente"]', 378, NOW(), NOW()),
      (gen_random_uuid(), 'G2316', 'grego', 'theos', 'theos', 'substantivo', 'Deus. O ser supremo, criador e sustentador de todas as coisas.', '["Deus","Deus verdadeiro"]', 1343, NOW(), NOW()),
      (gen_random_uuid(), 'G5590', 'grego', 'psyche', 'psyche', 'substantivo', 'Alma, vida, ser. O princípio vital do ser humano.', '["alma","vida","ser","espírito"]', 103, NOW(), NOW()),
      (gen_random_uuid(), 'G1510', 'grego', 'eimi', 'eimi', 'verbo', 'Ser, existir. Usado frequentemente por Jesus: EU SOU.', '["sou","existo","estou"]', 2612, NOW(), NOW()),
      (gen_random_uuid(), 'G2424', 'grego', 'Iesous', 'Iesous', 'substantivo', 'Jesus. O nome próprio do Salvador, significando Senhor salva.', '["Jesus","Salvador"]', 973, NOW(), NOW()),
      (gen_random_uuid(), 'G5485', 'grego', 'charis', 'charis', 'substantivo', 'Graça, favor, gratidão. A graça imerecida de Deus para a salvação.', '["graça","favor","gratidão","bondade"]', 155, NOW(), NOW())
    `);

    // 7. LEXICON - Key Hebrew words
    console.log('Criando lexico hebraico...');
    await query.query(`
      INSERT INTO lexicon_entries (id, strong, idioma, lemma, transliteracao, classeGramatical, definicao, significados, totalOcorrencias, criado_em, atualizado_em) VALUES
      (gen_random_uuid(), 'H430', 'hebraico', 'Elohim', 'Elohim', 'substantivo', 'Deus. Nome plural de majestade usado para o Deus verdadeiro.', '["Deus","Deus verdadeiro","criador"]', 2606, NOW(), NOW()),
      (gen_random_uuid(), 'H3068', 'hebraico', 'YHWH', 'YHWH', 'substantivo', 'O Senhor. Nome próprio de Deus, o Deus covenantal de Israel.', '["Senhor","Jeová","Yahweh"]', 6828, NOW(), NOW()),
      (gen_random_uuid(), 'H1254', 'hebraico', 'bara', 'bara', 'verbo', 'Criar. Usado exclusivamente para a criação divina.', '["criar","formar","produzir"]', 48, NOW(), NOW()),
      (gen_random_uuid(), 'H2617', 'hebraico', 'chesed', 'chesed', 'substantivo', 'Graça, misericórdia, amor leal. Amor covenantal de Deus.', '["graça","misericórdia","amor leal","bondade"]', 245, NOW(), NOW()),
      (gen_random_uuid(), 'H7225', 'hebraico', 'reshit', 'reshit', 'substantivo', 'Princípio, primeira parte, primícia.', '["princípio","início","primícia"]', 51, NOW(), NOW()),
      (gen_random_uuid(), 'H853', 'hebraico', 'eth', 'eth', 'partícula', 'Partícula de acusação. Marca o objeto direto.', '["acusa"]', 11, NOW(), NOW()),
      (gen_random_uuid(), 'H175', 'hebraico', 'adam', 'adam', 'substantivo', 'Homem, Adão. O primeiro ser humano criado por Deus.', '["homem","Adão","humanidade"]', 552, NOW(), NOW()),
      (gen_random_uuid(), 'H241', 'hebraico', 'erets', 'erets', 'substantivo', 'Terra, solo, país.', '["terra","solo","país","mundo"]', 2504, NOW(), NOW()),
      (gen_random_uuid(), 'H8064', 'hebraico', 'shamayim', 'shamayim', 'substantivo', 'Céus, céu. O firmamento e a morada de Deus.', '["céus","céu","firmamento"]', 420, NOW(), NOW()),
      (gen_random_uuid(), 'H5414', 'hebraico', 'natan', 'natan', 'verbo', 'Dar, conceder, pôr.', '["dar","conceder","pôr","entregar"]', 880, NOW(), NOW())
    `);

    // 8. PERSONS
    console.log('Criando personagens...');
    await query.query(`
      INSERT INTO bible_persons (id, nome, nomeOriginal, categoria, biografia, significadoNome, pai, filhos, titulos, eventosChave, referenciasBiblicas, criado_em, atualizado_em) VALUES
      (gen_random_uuid(), 'Abraao', 'Abraham', 'patriarca', 'Pai dos crentes. Chamado por Deus para sair de Ur e ir a terra de Canaan. Pai da fé.', 'Pai de muitas nações', 'Tere', '["Isaque","Ismael"]', '["Pai dos crentes","Amigo de Deus"]', '["Chamado por Deus","Aliança com Deus","Sacrifício de Isaque"]', '["Gênesis 12:1-3","Gênesis 15:6","Gênesis 22:1-14"]', NOW(), NOW()),
      (gen_random_uuid(), 'Moises', 'Moshe', 'profeta', 'Líder que libertou Israel do Egito e recebeu a Lei no Sinai.', 'Tirado das águas', 'Amram', '["Gérson","Eliezer"]', '["Libertador","Legislador","Profeta"]', '["Êxodo do Egito","Partida do Mar Vermelho","Recebimento da Lei"]', '["Êxodo 2:1-10","Êxodo 20:1-17","Deuteronômio 34"]', NOW(), NOW()),
      (gen_random_uuid(), 'Davi', 'David', 'rei', 'Segundo rei de Israel, ancestral de Jesus. Homem segundo o coração de Deus.', 'Amado', 'Jesse', '["Salomão","Absalão"]', '["Rei de Israel","Salmoista","Ancestral de Jesus"]', '["Derrotou Golias","Reinado em Jerusalém","Pecado com Bate-Seba"]', '["1 Samuel 17","2 Samuel 7","Salmo 23"]', NOW(), NOW()),
      (gen_random_uuid(), 'Jesus Cristo', 'Yeshua', 'messias', 'O Filho de Deus encarnado, Salvador da humanidade, cumprimento das profecias messiânicas.', 'Salvador', 'José', '[]', '["Salvador","Messias","Rei dos Reis","Cordeiro de Deus"]', '["Nascimento em Belém","Batismo","Crucificação","Ressurreição"]', '["Mateus 1:21","João 1:1","Filipenses 2:5-11"]', NOW(), NOW()),
      (gen_random_uuid(), 'Paulo', 'Paulus', 'apóstolo', 'Apóstolo dos gentios, autor de 13 epístolas. Perseguiu a igreja antes da conversão.', 'Pequeno', 'Fariseu', '[]', '["Apóstolo dos Gentios","Missionário","Autor Epistolar"]', '["Conversão no caminho de Damasco","Missões","Concilio de Jerusalém"]', '["Atos 9:1-19","Romanos 1:1","Efésios 3:8"]', NOW(), NOW()),
      (gen_random_uuid(), 'Pedro', 'Kepha', 'apóstolo', 'Líder dos apóstolos, pescador chamado por Jesus. Primeiro a pregar no Pentecostes.', 'Pedra', 'João', '["José","Simão"]', '["Apóstolo","Pregador","Líder da Igreja"]', '["Chamado por Jesus","Confissão de Cristo","Pentecostes"]', '["Mateus 16:18","Atos 2:14","1 Pedro 1:1"]', NOW(), NOW()),
      (gen_random_uuid(), 'Isaias', 'Yeshayahu', 'profeta', 'Grande profeta do AT, profetizou a vinda do Messias e o sofrimento servo.', 'Salvação do Senhor', 'Amoz', '[]', '["Profeta","Evangelista do AT"]', '["Chamado no templo","Profecia do Servo Sofredor","Profecia da virginidade"]', '["Isaias 6:1-8","Isaias 53","Isaias 7:14"]', NOW(), NOW()),
      (gen_random_uuid(), 'Abel', 'Hevel', 'patriarca', 'Filho de Adão e Eva, primeiro mártir da história. Seu sacrifício foi aceito por Deus.', 'Vapor, vaidade', 'Adão', '[]', '["Mártir","Pastor"]', '["Sacrifício aceito por Deus","Morto por Caim"]', '["Gênesis 4:1-8","Hebreus 11:4"]', NOW(), NOW()),
      (gen_random_uuid(), 'Noé', 'Noach', 'patriarca', 'Homem justo que construiu a arca e sobreviveu ao dilúvio.', 'Descanso, consolo', 'Lameque', '["Sem","Cam","Jafé"]', '["Pai da humanidade pós-dilúvio","Predicador da justiça"]', '["Construção da Arca","Dilúvio","Aliança do arco-íris"]', '["Gênesis 6:9-9:17","Hebreus 11:7"]', NOW(), NOW()),
      (gen_random_uuid(), 'Salomao', 'Shlomo', 'rei', 'Filho de Davi, autor de Provérbios, Eclesiastes e Cantares. Conhecido pela sabedoria.', 'Pacificador', 'Davi', '["Roboão"]', '["Rei de Israel","Sábio","Templo de Salomão"]', '["Construção do Templo","Juízo das duas mães","Sabedoria"]', '["1 Reis 3:5-14","Provérbios 1:1","Cantares 1:1"]', NOW(), NOW())
    `);

    // 9. LOCATIONS
    console.log('Criando localizacoes...');
    await query.query(`
      INSERT INTO bible_locations (id, nome, nomeOriginal, tipo, latitude, longitude, descricao, historia, referenciasBiblicas, criado_em, atualizado_em) VALUES
      (gen_random_uuid(), 'Jerusalem', 'Yerushalayim', 'cidade', 31.7683, 35.2137, 'Cidade santa de Israel, sede do templo e centro do culto.', 'Capital espiritual de Israel, local do templo construído por Salomão.', '["Mateus 16:21","Lucas 24:47","Apocalipse 21:2"]', NOW(), NOW()),
      (gen_random_uuid(), 'Belém', 'Belehem', 'cidade', 31.7049, 35.2078, 'Cidade de Davi, local de nascimento de Jesus.', 'Local de nascimento do Rei Davi e do Messias.', '["Miqueias 5:2","Mateus 2:1","Lucas 2:4-7"]', NOW(), NOW()),
      (gen_random_uuid(), 'Nazare', 'Natzeret', 'cidade', 32.6996, 35.3035, 'Cidade onde Jesus cresceu.', 'Cidade humilde onde Maria e José residiram.', '["Mateus 2:23","Lucas 2:39","Lucas 4:16"]', NOW(), NOW()),
      (gen_random_uuid(), 'Galileia', 'Galil', 'regiao', 32.8, 35.5, 'Região no norte de Israel, palco de muitos milagres de Jesus.', 'Área de ministério público de Jesus.', '["Mateus 4:12-16","Marcos 1:14"]', NOW(), NOW()),
      (gen_random_uuid(), 'Samaria', 'Shomron', 'regiao', 32.28, 35.2, 'Região entre Judeia e Galileia. Centro de adoração mista.', 'Habitada por descendentes misturados de Israel e outras nações.', '["João 4:1-42","Atos 1:8"]', NOW(), NOW()),
      (gen_random_uuid(), 'Egito', 'Mizrayim', 'pais', 30.0, 31.0, 'Império onde Israel foi escravizado e de onde foi libertado.', 'Local da escravidão e do êxodo de Israel.', '["Gênesis 12:10","Êxodo 12:41","Mateus 2:15"]', NOW(), NOW()),
      (gen_random_uuid(), 'Deserto do Sinai', 'Midbar Sinai', 'regiao', 28.5, 33.9, 'Deserto onde Israel vagou 40 anos e recebeu a Lei.', 'Local da aliança e da revelação da Lei.', '["Êxodo 19:1","Números 14:33","Deuteronômio 8:2"]', NOW(), NOW()),
      (gen_random_uuid(), 'Rio Jordão', 'Yarden', 'rio', 31.85, 35.55, 'Rio onde Israel cruzou para entrar em Canaan e onde Jesus foi batizado.', 'Fronteira simbólica de entrada na terra prometida.', '["Josué 3:15-17","Mateus 3:13-17"]', NOW(), NOW()),
      (gen_random_uuid(), 'Piscina de Siloé', 'Shiloach', 'monumento', 31.773, 35.234, 'Piscina em Jerusalém mencionada em João 9.', 'Local onde Jesus curou o cego de nascença.', '["João 9:1-11","Isaías 8:6"]', NOW(), NOW()),
      (gen_random_uuid(), 'Monte das Oliveiras', 'Har HaZeitim', 'montanha', 31.7833, 35.2417, 'Montanha em Jerusalém, local da ascensão de Jesus.', 'Local de或ação, ensino e ascensão de Jesus.', '["Mateus 24:3","Lucas 22:39-46","Atos 1:9-12"]', NOW(), NOW())
    `);

    // 10. CROSS REFERENCES
    console.log('Criando referencias cruzadas...');
    await query.query(`
      INSERT INTO cross_references (id, origemRef, destinoRef, tipo, descricao, criado_em, atualizado_em) VALUES
      (gen_random_uuid(), 'Gen 3:15', 'Gal 4:4', 'profecia-cumprimento', 'A semente da mulher prometida em Gênesis cumpre-se em Cristo.', NOW(), NOW()),
      (gen_random_uuid(), 'Gen 12:3', 'Gal 3:8', 'profecia-cumprimento', 'Abençoamento das nações em Abraão cumpre-se no evangelho.', NOW(), NOW()),
      (gen_random_uuid(), 'Gen 15:6', 'Romanos 4:3', 'citacao', 'Abraham creu e lhe foi imputado justiça -Paulo cita em Romanos.', NOW(), NOW()),
      (gen_random_uuid(), 'Ex 3:14', 'João 8:58', 'tipologia', 'EU SOU de Deus no AT ecoa EU SOU de Jesus no NT.', NOW(), NOW()),
      (gen_random_uuid(), 'Is 7:14', 'Mateus 1:23', 'profecia-cumprimento', 'Profecia da virgem conceber cumpre-se em Maria.', NOW(), NOW()),
      (gen_random_uuid(), 'Is 9:6', 'Lucas 2:11', 'profecia-cumprimento', 'Príncipe da Paz identificado como o Salvador nascido em Belém.', NOW(), NOW()),
      (gen_random_uuid(), 'Is 53:5', '1 Pedro 2:24', 'profecia-cumprimento', 'O Servo Sofredor ferido pelas transgressões cumpre-se na cruz.', NOW(), NOW()),
      (gen_random_uuid(), 'Miq 5:2', 'Mateus 2:6', 'profecia-cumprimento', 'Belém como local de nascimento do governante eterno.', NOW(), NOW()),
      (gen_random_uuid(), 'Sal 22:1', 'Mateus 27:46', 'profecia-cumprimento', 'O Salmo messiânico de clamor é citado por Jesus na cruz.', NOW(), NOW()),
      (gen_random_uuid(), 'Sal 110:1', 'Hebreus 1:13', 'profecia-cumprimento', 'O Messias sentado à direita de Deus, tema central da epístola aos Hebreus.', NOW(), NOW()),
      (gen_random_uuid(), 'João 1:1', '1 João 1:1', 'paralelo', 'O Logos eterno é o Verbo da vida de que os apóstolos testemunharam.', NOW(), NOW()),
      (gen_random_uuid(), 'João 3:16', '1 João 4:9', 'paralelo', 'O amor de Deus em dar o Filho unigénito é tema central de João.', NOW(), NOW()),
      (gen_random_uuid(), 'Romanos 3:23', 'Romanos 6:23', 'paralelo', 'O pecado de todos e a morte vs. a graça de Deus e a vida eterna.', NOW(), NOW()),
      (gen_random_uuid(), 'Efésios 2:8-9', 'Tito 3:5', 'paralelo', 'Salvação pela graça através da fé, não pelas obras.', NOW(), NOW()),
      (gen_random_uuid(), '2 Timoteo 3:16', '2 Pedro 1:20-21', 'paralelo', 'Inspiração divina das Escrituras é tema compartilhado.', NOW(), NOW())
    `);

    await query.commitTransaction();
    console.log('Seed concluido com sucesso!');

  } catch (error) {
    await query.rollbackTransaction();
    console.error('Erro no seed:', error);
    throw error;
  } finally {
    await query.release();
    await dataSource.destroy();
  }
}

seed().catch((err) => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
