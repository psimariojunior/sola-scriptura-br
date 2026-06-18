const { Pool } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_n1SVsKwYfW7U@ep-shiny-sound-att6ki1l-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function seed() {
  const client = await pool.connect();
  try {
    console.log('Conectado ao banco. Iniciando seed...');

    await seedTestamentos(client);
    await seedTraducoes(client);
    await seedLivros(client);
    await seedPlanosLeitura(client);
    await seedDoutrinasCategorias(client);
    await seedLocalizacoes(client);
    await seedPersonagens(client);
    await seedEventosHistoricos(client);

    console.log('Seed concluído com sucesso!');
  } catch (erro) {
    console.error('Erro no seed:', erro.message);
  } finally {
    client.release();
    await pool.end();
  }
}

async function seedTestamentos(client) {
  console.log('Inserindo testamentos...');
  await client.query(`DELETE FROM livros`);
  await client.query(`DELETE FROM testamentos`);
  const at = await client.query(`
    INSERT INTO testamentos (id, nome, slug, ordem, total_livros)
    VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    [crypto.randomUUID(), 'Antigo Testamento', 'antigo-testamento', 1, 39]
  );
  const nt = await client.query(`
    INSERT INTO testamentos (id, nome, slug, ordem, total_livros)
    VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    [crypto.randomUUID(), 'Novo Testamento', 'novo-testamento', 2, 27]
  );
  console.log(`  Testamentos: ${at.rows[0].id}, ${nt.rows[0].id}`);
  return { atId: at.rows[0].id, ntId: nt.rows[0].id };
}

async function seedTraducoes(client) {
  console.log('Inserindo traduções...');
  await client.query(`DELETE FROM traducoes`);
  const traducoes = [
    ['Nova Versão Internacional', 'NVI', 'pt-BR', 2001, 'IBS', false, true],
    ['Almeida Revista e Atualizada', 'ARA', 'pt-BR', 1993, 'SBB', true, true],
    ['Almeida Corrigida Fiel', 'ACF', 'pt-BR', 1994, 'Trinitariana', true, true],
    ['Nova Tradução na Linguagem de Hoje', 'NTLH', 'pt-BR', 2000, 'SBB', false, true],
    ['King James Version', 'KJV', 'en', 1611, 'Domínio Público', true, true],
  ];
  for (const t of traducoes) {
    await client.query(`
      INSERT INTO traducoes (id, nome, sigla, idioma, ano_publicacao, copyright, licenca_publica, gratuita)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [crypto.randomUUID(), ...t]
    );
  }
  console.log(`  ${traducoes.length} traduções inseridas`);
}

async function seedLivros(client) {
  console.log('Inserindo livros...');
  await client.query(`DELETE FROM livros`);
  const at = await client.query(`SELECT id FROM testamentos WHERE slug='antigo-testamento'`);
  const nt = await client.query(`SELECT id FROM testamentos WHERE slug='novo-testamento'`);
  const atId = at.rows[0].id;
  const ntId = nt.rows[0].id;

  const livrosAT = [
    ['Gênesis','Gn','genesis',1,1,50,'Moisés','~1440 a.C.','Criação, queda, dilúvio, patriarcas'],
    ['Êxodo','Êx','exodo',2,2,40,'Moisés','~1440 a.C.','Libertação do Egito, lei, tabernáculo'],
    ['Levítico','Lv','levitico',3,3,27,'Moisés','~1440 a.C.','Leis sacerdotais, sacrifícios'],
    ['Números','Nm','numeros',4,4,36,'Moisés','~1400 a.C.','Censo, peregrinação no deserto'],
    ['Deuteronômio','Dt','deuteronomio',5,5,34,'Moisés','~1400 a.C.','Últimos discursos de Moisés'],
    ['Josué','Js','josue',6,6,24,'Josué','~1370 a.C.','Conquista da Terra Prometida'],
    ['Juízes','Jz','juizes',7,7,21,'Samuel','~1050 a.C.','Ciclos de juízes em Israel'],
    ['Rute','Rt','rute',8,8,4,'Samuel','~1030 a.C.','Fidelidade, redenção, linhagem de Davi'],
    ['1 Samuel','1Sm','1-samuel',9,9,31,'Samuel','~900 a.C.','Primeiro rei: Saul e Davi'],
    ['2 Samuel','2Sm','2-samuel',10,10,24,'Natan','~900 a.C.','Reinado de Davi'],
    ['1 Reis','1Rs','1-reis',11,11,22,'Jeremias','~560 a.C.','Salomão, divisão do reino'],
    ['2 Reis','2Rs','2-reis',12,12,25,'Jeremias','~560 a.C.','Reinos de Israel e Judá, exílio'],
    ['1 Crônicas','1Cr','1-cronicas',13,13,29,'Esdras','~450 a.C.','Genealogias, reinado de Davi'],
    ['2 Crônicas','2Cr','2-cronicas',14,14,36,'Esdras','~450 a.C.','Templo, reis de Judá'],
    ['Esdras','Ed','esdras',15,15,10,'Esdras','~440 a.C.','Retorno do exílio, reconstrução'],
    ['Neemias','Ne','neemias',16,16,13,'Neemias','~430 a.C.','Reconstrução dos muros'],
    ['Ester','Et','ester',17,17,10,'Mardoqueu','~470 a.C.','Proteção dos judeus na Pérsia'],
    ['Jó','Jó','jo',18,18,42,'Desconhecido','~2000 a.C.','Sofrimento, soberania de Deus'],
    ['Salmos','Sl','salmos',19,19,150,'Vários','~1000 a.C.','Adoração, oração, profecia'],
    ['Provérbios','Pv','proverbios',20,20,31,'Salomão','~900 a.C.','Sabedoria, vida prática'],
    ['Eclesiastes','Ec','eclesiastes',21,21,12,'Salomão','~900 a.C.','Sentido da vida'],
    ['Cânticos','Ct','canticos',22,22,8,'Salomão','~900 a.C.','Amor conjugal, alegoria'],
    ['Isaías','Is','isaias',23,23,66,'Isaías','~680 a.C.','Profecia messiânica, julgamento'],
    ['Jeremias','Jr','jeremias',24,24,52,'Jeremias','~580 a.C.','Profecia antes do exílio'],
    ['Lamentações','Lm','lamentacoes',25,25,5,'Jeremias','~586 a.C.','Luto pela destruição de Jerusalém'],
    ['Ezequiel','Ez','ezequiel',26,26,48,'Ezequiel','~570 a.C.','Profecia no exílio, visões'],
    ['Daniel','Dn','daniel',27,27,12,'Daniel','~530 a.C.','Exílio, visões, fidelidade'],
    ['Oséias','Os','oseias',28,28,14,'Oséias','~720 a.C.','Amor de Deus, infidelidade de Israel'],
    ['Joel','Jl','joel',29,29,3,'Joel','~800 a.C.','Dia do Senhor, pentecostes'],
    ['Amós','Am','amos',30,30,9,'Amós','~750 a.C.','Justiça social, julgamento'],
    ['Obadias','Ob','obadias',31,31,1,'Obadias','~580 a.C.','Julgamento de Edom'],
    ['Jonas','Jn','jonas',32,32,4,'Jonas','~760 a.C.','Missão a Nínive, misericórdia'],
    ['Miqueias','Mq','miqueias',33,33,7,'Miqueias','~700 a.C.','Belém, justiça, misericórdia'],
    ['Naum','Na','naum',34,34,3,'Naum','~650 a.C.','Julgamento de Nínive'],
    ['Habacuque','Hc','habacuque',35,35,3,'Habacuque','~610 a.C.','Fé, justificação, julgamento'],
    ['Sofonias','Sf','sofonias',36,36,3,'Sofonias','~630 a.C.','Dia do Senhor'],
    ['Ageu','Ag','ageu',37,37,2,'Ageu','~520 a.C.','Reconstrução do templo'],
    ['Zacarias','Zc','zacarias',38,38,14,'Zacarias','~510 a.C.','Profecias messiânicas'],
    ['Malaquias','Ml','malaquias',39,39,4,'Malaquias','~430 a.C.','Última profecia do AT'],
  ];

  const livrosNT = [
    ['Mateus','Mt','mateus',1,1,28,'Mateus','~50 d.C.','Evangelho, reino, messias rei'],
    ['Marcos','Mc','marcos',2,2,16,'João Marcos','~55 d.C.','Evangelho, servo, ação'],
    ['Lucas','Lc','lucas',3,3,24,'Lucas','~60 d.C.','Evangelho, filho do homem'],
    ['João','Jo','joao',4,4,21,'João','~85 d.C.','Evangelho, divindade de Cristo'],
    ['Atos','At','atos',5,5,28,'Lucas','~62 d.C.','Igreja primitiva, Espírito Santo'],
    ['Romanos','Rm','romanos',6,6,16,'Paulo','~57 d.C.','Justificação, graça, evangelho'],
    ['1 Coríntios','1Co','1-corintios',7,7,16,'Paulo','~55 d.C.','Problemas da igreja'],
    ['2 Coríntios','2Co','2-corintios',8,8,13,'Paulo','~56 d.C.','Defesa do apostolado'],
    ['Gálatas','Gl','galatas',9,9,6,'Paulo','~49 d.C.','Liberdade em Cristo, lei vs graça'],
    ['Efésios','Ef','efesios',10,10,6,'Paulo','~60 d.C.','Igreja, corpo de Cristo'],
    ['Filipenses','Fp','filipenses',11,11,4,'Paulo','~62 d.C.','Alegria, humildade'],
    ['Colossenses','Cl','colossenses',12,12,4,'Paulo','~60 d.C.','Supremacia de Cristo'],
    ['1 Tessalonicenses','1Ts','1-tessalonicenses',13,13,5,'Paulo','~51 d.C.','Segunda vinda, santificação'],
    ['2 Tessalonicenses','2Ts','2-tessalonicenses',14,14,3,'Paulo','~52 d.C.','Vinda de Cristo, apostasia'],
    ['1 Timóteo','1Tm','1-timoteo',15,15,6,'Paulo','~62 d.C.','Liderança da igreja'],
    ['2 Timóteo','2Tm','2-timoteo',16,16,4,'Paulo','~67 d.C.','Últimas instruções, fidelidade'],
    ['Tito','Tt','tito',17,17,3,'Paulo','~62 d.C.','Liderança, boas obras'],
    ['Filemom','Fm','filemom',18,18,1,'Paulo','~60 d.C.','Perdão, escravo convertido'],
    ['Hebreus','Hb','hebreus',19,19,13,'Desconhecido','~68 d.C.','Supremacia de Cristo, novo pacto'],
    ['Tiago','Tg','tiago',20,20,5,'Tiago','~50 d.C.','Fé prática, sabedoria'],
    ['1 Pedro','1Pe','1-pedro',21,21,5,'Pedro','~63 d.C.','Sofrimento, esperança'],
    ['2 Pedro','2Pe','2-pedro',22,22,3,'Pedro','~66 d.C.','Falsos mestres, segunda vinda'],
    ['1 João','1Jo','1-joao',23,23,5,'João','~90 d.C.','Amor, luz, comunhão'],
    ['2 João','2Jo','2-joao',24,24,1,'João','~90 d.C.','Verdade, amor'],
    ['3 João','3Jo','3-joao',25,25,1,'João','~90 d.C.','Hospitalidade'],
    ['Judas','Jd','judas',26,26,1,'Judas','~68 d.C.','Contenda pela fé'],
    ['Apocalipse','Ap','apocalipse',27,27,22,'João','~95 d.C.','Visões, segunda vinda, novo céu'],
  ];

  for (const l of livrosAT) {
    await client.query(`
      INSERT INTO livros (id, nome, nome_abreviado, slug, ordem_testamento, ordem_geral, total_capitulos, autor, data_escrita, temas_principais, testamento_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [crypto.randomUUID(), l[0], l[1], l[2], l[3], l[3], l[4], l[5], l[6], l[7], atId]
    );
  }
  for (const l of livrosNT) {
    await client.query(`
      INSERT INTO livros (id, nome, nome_abreviado, slug, ordem_testamento, ordem_geral, total_capitulos, autor, data_escrita, temas_principais, testamento_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [crypto.randomUUID(), l[0], l[1], l[2], l[3], l[3] + 39, l[4], l[5], l[6], l[7], ntId]
    );
  }
  console.log(`  ${livrosAT.length + livrosNT.length} livros inseridos`);
}

async function seedPlanosLeitura(client) {
  console.log('Inserindo planos de leitura...');
  await client.query(`DELETE FROM planos_leitura`);
  const planos = [
    ['Bíblia em 1 Ano', 'Leia a Bíblia completa em 365 dias', 365, 3, 'completo', true, '{"tipo":"cronologica"}'],
    ['Novo Testamento em 3 Meses', 'Leia o Novo Testamento em 90 dias', 90, 1, 'novo-testamento', true, '{"tipo":"canonica"}'],
    ['Pentateuco em 30 Dias', 'Estudo dos 5 livros de Moisés em 30 dias', 30, 2, 'pentateuco', true, '{"tipo":"livro"}'],
    ['Salmos em 50 Dias', 'Meditação nos Salmos durante 50 dias', 50, 3, 'sabedoria', true, '{"tipo":"tematico"}'],
    ['Evangelhos em 40 Dias', 'Os 4 Evangelhos em 40 dias', 40, 1, 'evangelhos', true, '{"tipo":"harmonia"}'],
  ];
  for (const p of planos) {
    await client.query(`
      INSERT INTO planos_leitura (id, nome, descricao, total_dias, capitulos_por_dia, categoria, publico, programacao)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [crypto.randomUUID(), ...p]
    );
  }
  console.log(`  ${planos.length} planos inseridos`);
}

async function seedDoutrinasCategorias(client) {
  console.log('Inserindo categorias de doutrina...');
  await client.query(`DELETE FROM categorias_doutrina`);
  const categorias = [
    ['Bibliologia', 'bibliologia', 'Doutrina das Escrituras', 1],
    ['Teontologia', 'teontologia', 'Doutrina de Deus', 2],
    ['Cristologia', 'cristologia', 'Doutrina de Cristo', 3],
    ['Pneumatologia', 'pneumatologia', 'Doutrina do Espírito Santo', 4],
    ['Antropologia', 'antropologia', 'Doutrina do Homem', 5],
    ['Hamartiologia', 'hamartiologia', 'Doutrina do Pecado', 6],
    ['Soteriologia', 'soteriologia', 'Doutrina da Salvação', 7],
    ['Eclesiologia', 'eclesiologia', 'Doutrina da Igreja', 8],
    ['Escatologia', 'escatologia', 'Doutrina das Últimas Coisas', 9],
    ['Angelologia', 'angelologia', 'Doutrina dos Anjos', 10],
  ];
  for (const c of categorias) {
    await client.query(`
      INSERT INTO categorias_doutrina (id, nome, slug, descricao, ordem)
      VALUES ($1,$2,$3,$4,$5)`,
      [crypto.randomUUID(), ...c]
    );
  }
  console.log(`  ${categorias.length} categorias inseridas`);
}

async function seedLocalizacoes(client) {
  console.log('Inserindo localizações bíblicas...');
  await client.query(`DELETE FROM localizacoes`);
  const locs = [
    ['Jerusalém','jerusalem','cidade',31.78,35.22,'Judeia','Israel','Cidade santa, centro religioso'],
    ['Belém','belem','cidade',31.70,35.20,'Judeia','Cisjordânia','Cidade natal de Davi e Jesus'],
    ['Nazaré','nazare','cidade',32.70,35.30,'Galileia','Israel','Cidade onde Jesus cresceu'],
    ['Cafarnaum','cafarnaum','cidade',32.88,35.56,'Galileia','Israel','Centro do ministério de Jesus'],
    ['Damasco','damasco','cidade',33.51,36.29,'Síria','Síria','Cidade mais antiga do mundo'],
    ['Babilônia','babilonia','cidade',32.54,44.42,'Mesopotâmia','Iraque','Exílio dos judeus'],
    ['Nínive','ninive','cidade',36.36,43.13,'Assíria','Iraque','Capital assíria, missão de Jonas'],
    ['Éfeso','efeso','cidade',37.94,27.34,'Ásia Menor','Turquia','Igreja primitiva, cartas de Paulo'],
    ['Corinto','corinto','cidade',37.93,22.93,'Acaia','Grécia','Cartas aos Coríntios'],
    ['Roma','roma','cidade',41.90,12.50,'Itália','Itália','Império Romano, carta aos Romanos'],
    ['Antioquia','antioquia','cidade',36.20,36.16,'Síria','Turquia','Primeira igreja gentílica'],
    ['Mar Vermelho','mar-vermelho','mar',0,0,'Egito/Arábia','—','Travessia do Êxodo'],
    ['Mar da Galileia','mar-galileia','mar',32.83,35.59,'Galileia','Israel','Ministério de Jesus'],
    ['Monte Sinai','sinai','monte',28.54,33.97,'Sinai','Egito','Entrega da Lei'],
    ['Monte das Oliveiras','monte-oliveiras','monte',31.78,35.24,'Judeia','Israel','Ascensão de Jesus'],
  ];
  for (const l of locs) {
    await client.query(`
      INSERT INTO localizacoes (id, nome_portugues, slug, tipo, latitude, longitude, regiao, pais_atual, descricao)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [crypto.randomUUID(), ...l]
    );
  }
  console.log(`  ${locs.length} localizações inseridas`);
}

async function seedPersonagens(client) {
  console.log('Inserindo personagens...');
  await client.query(`DELETE FROM personagens`);
  const personagens = [
    ['Adão','adam','אָדָם','Primeiro homem, criado à imagem de Deus'],
    ['Eva','eva','חַוָּה','Primeira mulher, mãe de todos os viventes'],
    ['Noé','noe','נֹחַ','Construiu a arca, sobreviveu ao dilúvio'],
    ['Abraão','abraao','אַבְרָהָם','Pai da fé, amigo de Deus'],
    ['Isaque','isaque','יִצְחָק','Filho da promessa'],
    ['Jacó','jaco','יַעֲקֹב','Israel, pai das 12 tribos'],
    ['José','jose-1','יוֹסֵף','Governador do Egito, salvador da família'],
    ['Moisés','moises','מֹשֶׁה','Libertador, deu a Lei'],
    ['Josué','josue-p','יְהוֹשֻׁעַ','Conquistou a Terra Prometida'],
    ['Davi','davi','דָּוִד','Rei, homem segundo o coração de Deus'],
    ['Salomão','salomao','שְׁלֹמֹה','Rei sábio, construiu o templo'],
    ['Isaías','isaias-p','יְשַׁעְיָהוּ','Profeta messiânico'],
    ['Daniel','daniel-p','דָּנִיֵּאל','Profeta na Babilônia'],
    ['Ester','ester-p','אֶסְתֵּר','Rainha que salvou seu povo'],
    ['João Batista','joao-batista','יוֹחָנָן','Precursor de Cristo'],
    ['Jesus Cristo','jesus-cristo','יֵשׁוּעַ','Filho de Deus, Salvador'],
    ['Pedro','pedro','Πέτρος','Apóstolo, líder da igreja primitiva'],
    ['Paulo','paulo','Παῦλος','Apóstolo dos gentios'],
    ['João','joao-p','יוֹחָנָן','Discípulo amado, evangelista'],
    ['Maria','maria','Μαρία','Mãe de Jesus'],
  ];
  for (const p of personagens) {
    await client.query(`
      INSERT INTO personagens (id, nome_portugues, slug, nome_hebraico, biografia)
      VALUES ($1,$2,$3,$4,$5)`,
      [crypto.randomUUID(), p[0], p[1], p[2], p[3]]
    );
  }
  console.log(`  ${personagens.length} personagens inseridos`);
}

async function seedEventosHistoricos(client) {
  console.log('Inserindo eventos históricos...');
  await client.query(`DELETE FROM eventos_historicos`);
  const eventos = [
    ['Criação do mundo','criacao','criacao',-4004,null,'AC','Gênesis 1-2'],
    ['Dilúvio','diluvio','diluvio',-2348,null,'AC','Gênesis 6-9'],
    ['Chamada de Abraão','chamada-abraao','patriarcas',-2091,null,'AC','Gênesis 12'],
    ['Êxodo do Egito','exodo','exodo',-1446,null,'AC','Êxodo 12-14'],
    ['Conquista de Canaã','conquista','conquista',-1406,null,'AC','Josué 1-12'],
    ['Reino Unido - Saul','reino-unido','reino-unido',-1050,-1010,'AC','1 Samuel 10'],
    ['Reino de Davi','reino-davi','reino-davi',-1010,-970,'AC','2 Samuel'],
    ['Reino de Salomão','reino-salomao','reino-salomao',-970,-930,'AC','1 Reis 1-11'],
    ['Divisão do Reino','divisao-reino','reino-dividido',-930,null,'AC','1 Reis 12'],
    ['Exílio na Babilônia','exilio-babilonia','exilio',-586,-536,'AC','2 Reis 25'],
    ['Retorno do Exílio','retorno-exilio','restauracao',-536,null,'AC','Esdras 1-2'],
    ['Nascimento de Jesus','nascimento-jesus','nascimento',4,null,'DC','Mateus 1, Lucas 2'],
    ['Ministério de Jesus','ministerio-jesus','ministerio',27,30,'DC','Evangelhos'],
    ['Crucificação','crucificacao','crucificacao',30,null,'DC','João 19'],
    ['Pentecostes','pentecostes','pentecostes',30,null,'DC','Atos 2'],
    ['Conversão de Paulo','conversao-paulo','conversao-paulo',35,null,'DC','Atos 9'],
    ['Primeira viagem missionária','viagem-1','missoes',47,48,'DC','Atos 13-14'],
    ['Destruição de Jerusalém','jerusalem-70','guerra',70,null,'DC','Profecia de Jesus'],
  ];
  for (const e of eventos) {
    await client.query(`
      INSERT INTO eventos_historicos (id, nome, slug, categoria, ano_inicio, ano_fim, era, referencias_biblicas)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [crypto.randomUUID(), e[0], e[1], e[2], e[3], e[4], e[5], JSON.stringify([e[6]])]
    );
  }
  console.log(`  ${eventos.length} eventos inseridos`);
}

seed();
