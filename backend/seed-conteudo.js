const { Pool } = require('pg');
const crypto = require('crypto');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const NVI = '387e47bf-77b6-4f29-bbcc-7cc038313f1d';
const GEN = '25827de0-8d88-48eb-bcc7-aac1b65b0a6c';
const JOAO = '5371e1bb-8574-4c11-9602-ea677b1d7089';
const SL = '04c9db90-e47e-4360-b151-3a415074c481';
const RM = '855e84a4-e896-4cd9-99e8-bfc5b20d4cb3';
const EX = '2b87a470-6288-4cde-8712-d522d96d99a4';
const AT = 'cdec3754-aca1-4e02-8cc2-aec72e4d8857';
const AT_ID = '3adfbeeb-c1d4-497e-b153-444b3c21107b';
const NT_ID = '08da9d12-421f-466f-88b1-11c188b94403';

async function seed() {
  const c = await pool.connect();
  try {
    await seedCapitulos(c);
    await seedVersiculos(c);
    await seedPalavrasGregas(c);
    await seedPalavrasHebraicas(c);
    await seedDoutrinas(c);
    await seedContextosHistoricos(c);
    console.log('Seed de conteúdo concluído!');
  } catch (e) {
    console.error('Erro:', e.message);
  } finally {
    c.release();
    await pool.end();
  }
}

async function seedCapitulos(c) {
  console.log('Inserindo capítulos...');
  const capitulos = [
    [GEN, 1, 31], [GEN, 2, 25], [GEN, 3, 24],
    [JOAO, 1, 51], [JOAO, 3, 36],
    [SL, 23, 6], [SL, 1, 6], [SL, 91, 16],
    [RM, 8, 39], [RM, 1, 32],
    [EX, 3, 22], [EX, 12, 51], [EX, 20, 26],
    [AT, 2, 47],
  ];
  for (const [livroId, num, total] of capitulos) {
    await c.query(
      `INSERT INTO capitulos (id, livro_id, numero, total_versiculos) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING`,
      [crypto.randomUUID(), livroId, num, total]
    );
  }
  console.log(`  ${capitulos.length} capítulos`);
}

async function seedVersiculos(c) {
  console.log('Inserindo versículos...');

  // Buscar IDs dos capítulos criados
  const capsResult = await c.query('SELECT id, livro_id, numero FROM capitulos');
  const capsMap = {};
  capsResult.rows.forEach(r => { capsMap[`${r.livro_id}-${r.numero}`] = r.id; });
  const versiculos = [
    // Gênesis 1
    [GEN,1,1,'No princípio criou Deus os céus e a terra.'],
    [GEN,1,2,'A terra era sem forma e vazia; trevas cobriam a face do abismo, e o Espírito de Deus se movia sobre a face das águas.'],
    [GEN,1,3,'Disse Deus: "Haja luz", e houve luz.'],
    [GEN,1,4,'Deus viu que a luz era boa, e separou a luz das trevas.'],
    [GEN,1,5,'Deus chamou à luz dia, e às trevas noite. Passaram-se a tarde e a manhã; esse foi o primeiro dia.'],
    [GEN,1,6,'Disse Deus: "Haja entre as águas um firmamento que separe águas de águas".'],
    [GEN,1,7,'Deus fez o firmamento e separou as águas que estavam sob o firmamento das que estavam acima.'],
    [GEN,1,8,'Deus chamou ao firmamento céus. Passaram-se a tarde e a manhã; esse foi o segundo dia.'],
    [GEN,1,9,'Disse também Deus: "Ajuntem-se num só lugar as águas que estão sob o céu, e apareça a parte seca".'],
    [GEN,1,10,'Deus chamou à parte seca terra, e às águas ajuntadas mares. E Deus viu que ficou bom.'],
    [GEN,1,11,'Disse então Deus: "Cubra-se a terra de vegetação: plantas que dêem sementes e árvores frutíferas".'],
    [GEN,1,12,'A terra produziu vegetação: plantas que dão sementes conforme as suas espécies, e árvores. E Deus viu que ficou bom.'],
    [GEN,1,13,'Passaram-se a tarde e a manhã; esse foi o terceiro dia.'],
    [GEN,1,14,'Disse Deus: "Haja luminares no firmamento do céu para separar o dia da noite e sirvam de sinais para as estações, dias e anos."'],
    [GEN,1,15,'E haja luminares no firmamento do céu para iluminar a terra. E assim aconteceu.'],
    [GEN,1,16,'Deus fez os dois grandes luminares: o maior para governar o dia e o menor para governar a noite; fez também as estrelas.'],
    [GEN,1,17,'Deus os colocou no firmamento do céu para iluminar a terra.'],
    [GEN,1,18,'Para governar o dia e a noite, e para separar a luz das trevas. E Deus viu que ficou bom.'],
    [GEN,1,19,'Passaram-se a tarde e a manhã; esse foi o quarto dia.'],
    [GEN,1,20,'Disse também Deus: "Encham-se as águas de seres viventes; e voem as aves sobre a terra, sob o firmamento do céu".'],
    [GEN,1,21,'Deus criou os grandes animais marinhos e todos os seres viventes que se movem nas águas, segundo as suas espécies.'],
    [GEN,1,22,'Deus os abençoou, dizendo: "Sejam férteis e se multipliquem; encham as águas dos mares; e se multipliquem as aves na terra".'],
    [GEN,1,23,'Passaram-se a tarde e a manhã; esse foi o quinto dia.'],
    [GEN,1,24,'Disse também Deus: "Produza a terra seres viventes segundo as suas espécies: animais domésticos, répteis e animais selvagens".'],
    [GEN,1,25,'Deus fez os animais selvagens segundo as suas espécies, os animais domésticos segundo as suas espécies.'],
    [GEN,1,26,'Disse também Deus: "Façamos o homem à nossa imagem, conforme a nossa semelhança".'],
    [GEN,1,27,'Criou Deus o homem à sua imagem, à imagem de Deus o criou; homem e mulher os criou.'],
    [GEN,1,28,'Deus os abençoou, dizendo: "Sejam férteis e se multipliquem. Encham e subjuguem a terra".'],
    [GEN,1,29,'Disse também Deus: "Eu lhes dou todas as plantas que dão sementes sobre a terra e todas as árvores que dão frutos".'],
    [GEN,1,30,'E a todos os animais da terra, a todas as aves do céu e a todos os répteis da terra, dou todo o verde das plantas por alimento".'],
    [GEN,1,31,'Deus viu tudo o que havia feito, e tudo havia ficado muito bom. Passaram-se a tarde e a manhã; esse foi o sexto dia.'],
    // Gênesis 2
    [GEN,2,1,'Assim foram concluídos os céus e a terra, e todo o seu exército.'],
    [GEN,2,2,'No sétimo dia Deus já havia concluído a obra que estava fazendo; por isso, no sétimo dia ele descansou.'],
    [GEN,2,3,'E Deus abençoou o sétimo dia e o santificou, porque nele descansou de toda a obra da criação.'],
    [GEN,2,7,'Então o Senhor Deus formou o homem do pó da terra e soprou em suas narinas o fôlego de vida, e o homem se tornou um ser vivente.'],
    [GEN,2,24,'Por isso, o homem deixa pai e mãe e se une à sua mulher, tornando-se os dois uma só carne.'],
    // João 1
    [JOAO,1,1,'No princípio era aquele que é a Palavra. Ele estava com Deus, e era Deus.'],
    [JOAO,1,2,'Ele estava com Deus no princípio.'],
    [JOAO,1,3,'Todas as coisas foram feitas por intermédio dele; sem ele, nada do que existe foi feito.'],
    [JOAO,1,4,'Nele estava a vida, e esta era a luz dos homens.'],
    [JOAO,1,5,'A luz brilha nas trevas, e as trevas não a extinguiram.'],
    [JOAO,1,14,'Aquele que é a Palavra tornou-se carne e viveu entre nós. Vimos a sua glória, glória como do Unigênito vindo do Pai.'],
    [JOAO,1,18,'Ninguém jamais viu a Deus, mas o Deus Unigênito, que está junto ao Pai, o tornou conhecido.'],
    // João 3
    [JOAO,3,16,'Porque Deus amou o mundo de tal maneira que deu o seu Filho Unigênito, para que todo o que nele crê não pereça, mas tenha a vida eterna.'],
    [JOAO,3,17,'Porque Deus enviou o seu Filho ao mundo, não para condenar o mundo, mas para que este seja salvo por intermédio dele.'],
    // Salmos 23
    [SL,23,1,'O Senhor é o meu pastor; nada me faltará.'],
    [SL,23,2,'Em verdes pastos me faz repousar e me conduz a águas tranquilas.'],
    [SL,23,3,'Restaura-me o vigor e me conduz por veredas justas, por amor do seu nome.'],
    [SL,23,4,'Mesmo quando eu andar por um vale de trevas e morte, não temerei mal nenhum, porque tu estás comigo.'],
    [SL,23,5,'Preparas um banquete para mim à vista dos meus inimigos. Unges a minha cabeça com óleo; o meu cálice transborda.'],
    [SL,23,6,'Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida.'],
    // Salmos 91
    [SL,91,1,'Aquele que habita no abrigo do Altíssimo e descansa à sombra do Todo-poderoso pode dizer ao Senhor: "Tu és o meu refúgio e a minha fortaleza, o meu Deus, em quem confio".'],
    [SL,91,2,'Ele o livrará do laço do caçador e do peste mortífero.'],
    // Romanos 8
    [RM,8,1,'Portanto, agora já nenhuma condenação há para os que estão em Cristo Jesus.'],
    [RM,8,2,'Porque por meio de Cristo Jesus a lei do Espírito de vida me libertou da lei do pecado e da morte.'],
    [RM,8,28,'E sabemos que Deus age em todas as coisas para o bem daqueles que o amam, dos que foram chamados segundo o seu propósito.'],
    [RM,8,29,'Porque os que de antemão conheceu, também os predestinou para serem conformes à imagem de seu Filho.'],
    [RM,8,38,'Pois estou convencido de que nem morte nem vida, nem anjos nem demônios, nem o presente nem o futuro, nem quaisquer poderes.'],
    [RM,8,39,'Nem altura nem profundidade, nem qualquer outra coisa na criação será capaz de nos separar do amor de Deus que está em Cristo Jesus, nosso Senhor.'],
    // Êxodo 3
    [EX,3,14,'Disse Deus a Moisés: "Eu Sou o que Sou. Isto é o que você dirá aos israelitas: Eu Sou me enviou a vocês".'],
    // Êxodo 20
    [EX,20,1,'E falou Deus todas estas palavras:'],
    [EX,20,2,'"Eu sou o Senhor, o seu Deus, que o tirou do Egito, da terra da escravidão".'],
    [EX,20,3,'"Não terá outros deuses além de mim".'],
    // Atos 2
    [AT,2,1,'Ao chegar o dia de Pentecostes, estavam todos reunidos num só lugar.'],
    [AT,2,2,'De repente, veio do céu um som, como de um vento muito forte, e encheu toda a casa onde estavam assentados.'],
    [AT,2,3,'Viram línguas como de fogo, que se separaram e pousaram sobre cada um deles.'],
    [AT,2,4,'Todos ficaram cheios do Espírito Santo e começaram a falar noutras línguas, conforme o Espírito os capacitava.'],
  ];

  for (const [livroId, cap, num, texto] of versiculos) {
    const testeamentoId = livroId === JOAO || livroId === RM || livroId === AT ? NT_ID : AT_ID;
    const capId = capsMap[`${livroId}-${cap}`] || null;
    try {
      await c.query(
        `INSERT INTO versiculos (id, livro_id, capitulo_id, capitulo_numero, numero, texto, traducao_id, testamento_id)
         VALUES ($1,$2,$3::uuid,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING`,
        [crypto.randomUUID(), livroId, capId, cap, num, texto, NVI, testeamentoId]
      );
    } catch (e) { /* versículo já existe */ }
  }
  console.log(`  ${versiculos.length} versículos inseridos`);
}

async function seedPalavrasGregas(c) {
  console.log('Inserindo palavras gregas (Strong)...');
  await c.query(`DELETE FROM palavras_gregas`);
  const palavras = [
    ['G2424','Ἰησοῦς','Iēsous','Iesous','ee-ay-sooce','Jesus','Jesus (Yeshua), nome próprio do Filho de Deus','substantivo próprio','nome próprio',617],
    ['G5547','Χριστός','Christos','Christos','khris-tos','Cristo','Ungido, Messias','substantivo','substantivo',555],
    ['G2316','θεός','theos','theos','theh-os','Deus','Deus, divindade, o Deus supremo','substantivo','substantivo',1317],
    ['G3056','λόγος','logos','logos','log-os','Palavra','Palavra, razão, discurso, a Palavra divina (Cristo)','substantivo','substantivo',330],
    ['G26','ἀγαπάω','agapaō','agapao','ag-ap-ah-o','amar','Amar de forma sacrificial e incondicional','verbo','verbo',null],
    ['G4151','πνεῦμα','pneuma','pneuma','pnyoo-mah','espírito','Espírito, vento, fôlego; o Espírito Santo','substantivo','substantivo',379],
    ['G2222','ζωή','zōē','zoe','dzoo-ay','vida','Vida, vida divina, vida eterna','substantivo','substantivo',135],
    ['G5457','φῶς','phōs','phos','foce','luz','Luz, luminosidade; metaforicamente a luz divina','substantivo','substantivo',73],
    ['G4102','πίστις','pistis','pistis','pis-tis','fé','Fé, convicção, confiança em Deus','substantivo','substantivo',243],
    ['G5485','χάρις','charis','charis','khar-ece','graça','Graça, favor imerecido, bondade','substantivo','substantivo',155],
    ['G2962','κύριος','kyrios','kyrios','koo-ree-os','Senhor','Senhor, mestre, autoridade suprema','substantivo','substantivo',717],
    ['G1124','γραφή','graphē','graphe','graf-ay','escritura','Escritura, texto sagrado, o registro escrito','substantivo','substantivo',50],
    ['G932','βασιλεία','basileia','basileia','bas-il-i-ah','reino','Reino, domínio, reinado (especialmente o de Deus)','substantivo','substantivo',162],
    ['G5337','φόβος','phobos','phobos','fob-os','temor','Temor, medo, reverência (a Deus)','substantivo','substantivo',47],
    ['G25','ἀγάπη','agapē','agape','ag-ah-pay','amor','Amor divino, amor sacrificial, amor ágape','substantivo','substantivo',116],
  ];
  for (const p of palavras) {
    await c.query(
      `INSERT INTO palavras_gregas (id,strong,palavra_original,lemma,transliteracao,pronuncia,definicao_curta,definicao_completa,morfologia,classe_gramatical,frequencia_nt)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT (strong) DO NOTHING`,
      [crypto.randomUUID(), ...p]
    );
  }
  console.log(`  ${palavras.length} palavras gregas`);
}

async function seedPalavrasHebraicas(c) {
  console.log('Inserindo palavras hebraicas (Strong)...');
  await c.query(`DELETE FROM palavras_hebraicas`);
  const palavras = [
    ['H430','אֱלֹהִים','Elohim','elohim','el-o-heem','Deus','Deus, o Deus supremo; plural indicando majestade','substantivo','substantivo',2606],
    ['H3068','יְהֹוָה','YHWH','Yahweh','yeh-ho-vaw','SENHOR','O nome pessoal de Deus, o Eu Sou','substantivo próprio','nome próprio',6519],
    ['H7225','רֵאשִׁית','reshith','reshit','ray-sheeth','princípio','Primeiro, melhor, começo, principal','substantivo','substantivo',51],
    ['H1254','בָּרָא','bara','bara','baw-raw','criar','Criar (apenas Deus como sujeito), formar','verbo','verbo',54],
    ['H8064','שָׁמַיִם','shamayim','shamayim','shaw-mah-yim','céus','Céus, firmamento, morada de Deus','substantivo','substantivo',420],
    ['H776','אֶרֶץ','erets','erets','eh-rets','terra','Terra, país, solo, mundo','substantivo','substantivo',2504],
    ['H7307','רוּחַ','ruach','ruach','roo-akh','espírito','Espírito, vento, fôlego, mente','substantivo','substantivo',378],
    ['H1696','דָּבָר','dabar','dabar','daw-bawr','palavra','Palavra, discurso, coisa, mandamento','substantivo','substantivo',1442],
    ['H539','אָמַן','aman','aman','aw-man','crer','Crer, confiar, ter fé, ser fiel','verbo','verbo',100],
    ['H2617','חֶסֶד','chesed','chesed','kheh-sed','misericórdia','Misericórdia, amor leal, bondade, graça','substantivo','substantivo',248],
    ['H120','אָדָם','adam','adam','aw-dawm','homem','Homem, humanidade, Adão','substantivo','substantivo',553],
    ['H2421','חָיָה','chayah','chayah','khaw-yaw','viver','Viver, ter vida, reviver','verbo','verbo',259],
    ['H8416','תֹּהוּ','tohu','tohu','to-hoo','sem forma','Sem forma, vazio, caos, confusão','substantivo','substantivo',20],
    ['H2822','חֹשֶׁךְ','choshek','choshek','kho-shek','trevas','Trevas, escuridão, obscuridade','substantivo','substantivo',80],
  ];
  for (const p of palavras) {
    await c.query(
      `INSERT INTO palavras_hebraicas (id,strong,palavra_original,lemma,transliteracao,pronuncia,definicao_curta,definicao_completa,morfologia,classe_gramatical,frequencia_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT (strong) DO NOTHING`,
      [crypto.randomUUID(), ...p]
    );
  }
  console.log(`  ${palavras.length} palavras hebraicas`);
}

async function seedDoutrinas(c) {
  console.log('Inserindo doutrinas...');
  await c.query(`DELETE FROM doutrinas`);
  const cats = await c.query('SELECT id, slug FROM categorias_doutrina');
  const map = {};
  cats.rows.forEach(r => map[r.slug] = r.id);

  const doutrinas = [
    ['Inspiração das Escrituras','inspiracao-das-escrituras',map['bibliologia'],'A Bíblia é divinamente inspirada por Deus, sendo a autoridade máxima para fé e prática.','2 Timóteo 3:16; 2 Pedro 1:21'],
    ['Inerrância Bíblica','inerrancia-biblica',map['bibliologia'],'As Escrituras, nos autógrafos originais, não contêm erros em matéria de fé, história ou ciência.','Salmos 19:7; Provérbios 30:5'],
    ['Trindade','trindade',map['teontologia'],'Deus é um em essência e três em pessoas: Pai, Filho e Espírito Santo.','Deuteronômio 6:4; Mateus 28:19; 2 Coríntios 13:13'],
    ['Soberania de Deus','soberania-de-deus',map['teontologia'],'Deus é soberano sobre toda a criação, governando todas as coisas segundo a sua vontade.','Salmos 115:3; Isaías 46:10; Efésios 1:11'],
    ['Deidade de Cristo','deidade-de-cristo',map['cristologia'],'Jesus Cristo é plenamente Deus e plenamente homem, a segunda pessoa da Trindade.','João 1:1,14; Colossenses 2:9; Filipenses 2:6'],
    ['Encarnação','encarnacao',map['cristologia'],'O Verbo eterno se fez carne, nascendo da virgem Maria.','João 1:14; Filipenses 2:7-8'],
    ['Expiação','expiacao',map['soteriologia'],'Cristo morreu como substituto pelos pecadores, satisfazendo a justiça de Deus.','Isaías 53:5; Romanos 3:25; 1 Pedro 2:24'],
    ['Justificação pela Fé','justificacao-pela-fe',map['soteriologia'],'O pecador é justificado diante de Deus pela fé em Cristo, não pelas obras.','Romanos 3:28; Gálatas 2:16; Efésios 2:8-9'],
    ['Eleição','eleicao',map['soteriologia'],'Deus escolheu em Cristo, antes da fundação do mundo, os que seriam salvos.','Efésios 1:4; Romanos 8:29; 1 Pedro 1:2'],
    ['Novo Nascimento','novo-nascimento',map['soteriologia'],'A regeneração é obra soberana do Espírito Santo, que concede nova vida ao pecador.','João 3:3-8; Tito 3:5; 1 Pedro 1:23'],
    ['Igreja','igreja',map['eclesiologia'],'A igreja é o corpo de Cristo, composta de todos os redimidos.','Efésios 1:22-23; 1 Coríntios 12:13'],
    ['Sacramentos','sacramentos',map['eclesiologia'],'Cristo instituiu dois sacramentos: batismo e ceia do Senhor.','Mateus 28:19; 1 Coríntios 11:23-26'],
    ['Segunda Vinda','segunda-vinda',map['escatologia'],'Cristo voltará pessoalmente e visivelmente para julgar os vivos e os mortos.','Atos 1:11; 1 Tessalonicenses 4:16'],
    ['Milênio','milenio',map['escatologia'],'Diferentes tradições interpretam o reinado milenar de Cristo de formas distintas.','Apocalipse 20:1-6'],
    ['Existência dos Anjos','existencia-dos-anjos',map['angelologia'],'Anjos são seres espirituais criados por Deus, que o servem e ministram aos salvos.','Salmos 103:20; Hebreus 1:14'],
  ];

  for (const d of doutrinas) {
    await c.query(
      `INSERT INTO doutrinas (id,nome,slug,definicao,base_scriptura,categoria_id)
       VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT DO NOTHING`,
      [crypto.randomUUID(), d[0], d[1], d[3], d[4], d[2]]
    );
  }
  console.log(`  ${doutrinas.length} doutrinas`);
}

async function seedContextosHistoricos(c) {
  console.log('Inserindo contextos históricos...');
  await c.query(`DELETE FROM contextos_historicos`);
  const livros = await c.query('SELECT id, slug FROM livros');
  const map = {};
  livros.rows.forEach(r => map[r.slug] = r.id);

  const contextos = [
    ['genesis','livro','Moisés','~1440 a.C.','Israelitas no deserto','O povo de Israel recém-liberto do Egito necessitava conhecer suas origens e o propósito de Deus.','Egito (escravidão) e deserto do Sinai','Império Egípcio','Faraó (possivelmente Amenófis II ou Tutmosés III)'],
    ['exodo','livro','Moisés','~1440 a.C.','Israelitas no deserto','Registra a libertação do Egito, a aliança no Sinai e a instituição do culto levítico.','Deserto do Sinai','Império Egípcio','Faraó da opressão'],
    ['salmos','livro','Vários autores (Davi, Asaf, filhos de Coré)','~1000-500 a.C.','Comunidade de adoração de Israel','Os salmos eram o hinário de Israel, usados no templo para adoração e oração.','Reino Unido e Reino Dividido','Impérios babilônico e persa (salmos posteriores)','Reis de Israel e Judá'],
    ['joao','livro','João, o apóstolo','~85-90 d.C.','Igrejas da Ásia Menor','Combate ao gnosticismo incipiente e afirma a divindade de Cristo frente às heresias.','Império Romano','Império Romano','Domiciano (perseguição)'],
    ['romanos','livro','Paulo','~57 d.C.','Igreja em Roma','Pablo expõe sistematicamente o evangelho da justificação pela fé, preparando uma visita a Roma.','Império Romano','Império Romano','Nero (início do reinado)'],
    ['atos','livro','Lucas','~62 d.C.','Igrejas em geral','Registra a expansão do evangelho de Jerusalém a Roma, sob a liderança do Espírito Santo.','Império Romano','Império Romano','Cláudio e Nero'],
  ];

  for (const ctx of contextos) {
    const livroId = map[ctx[0]];
    if (!livroId) continue;
    await c.query(
      `INSERT INTO contextos_historicos (id,entidade_tipo,entidade_id,autor,data_estimada,destinatarios,contexto_religioso,contexto_politico,imperios_envolvidos,governantes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [crypto.randomUUID(),'livro',livroId,ctx[1],ctx[2],ctx[3],ctx[4],ctx[5],JSON.stringify([ctx[6]]),JSON.stringify([ctx[7]])]
    );
  }
  console.log(`  ${contextos.length} contextos históricos`);
}

seed();
