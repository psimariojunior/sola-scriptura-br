-- Executar no Console do PostgreSQL no Railway
-- Aba Data > New Query > Cole tudo e clique Run

DO $$
DECLARE
  v_id UUID;
  g_id UUID;
  j_id UUID;
  r_id UUID;
  jo_id UUID;
  rm_id UUID;
  ef_id UUID;
  fp_id UUID;
  tm_id UUID;
  hb_id UUID;
  lj_id UUID;
  ap_id UUID;
  cap_id UUID;
BEGIN

-- Versoes
INSERT INTO bible_versions (id, sigla, nome, idioma, tipo, ano, "ativo", criado_em, atualizado_em) VALUES
(gen_random_uuid(), 'ARA', 'Atualizada Revisada Ampliada', 'portugues', 'protestante', 1993, true, NOW(), NOW())
RETURNING id INTO v_id;

-- Livros principais
INSERT INTO bible_books (id, versao_id, ordem, nome, testamento, genero, autor, "totalCapitulos", criado_em, atualizado_em) VALUES
(gen_random_uuid(), v_id, 1, 'Genesis', 'AT', 'narrativa', 'Moises', 50, NOW(), NOW()) RETURNING id INTO g_id,
(gen_random_uuid(), v_id, 6, 'Josue', 'AT', 'narrativa', 'Josue', 24, NOW(), NOW()) RETURNING id INTO j_id,
(gen_random_uuid(), v_id, 8, 'Rute', 'AT', 'narrativa', 'Desconhecido', 4, NOW(), NOW()) RETURNING id INTO r_id,
(gen_random_uuid(), v_id, 19, 'Salmos', 'AT', 'poesia', 'David', 150, NOW(), NOW()),
(gen_random_uuid(), v_id, 20, 'Proverbios', 'AT', 'sabedoria', 'Salomao', 31, NOW(), NOW()),
(gen_random_uuid(), v_id, 23, 'Isaias', 'AT', 'profetico', 'Isaias', 66, NOW(), NOW()),
(gen_random_uuid(), v_id, 40, 'Mateus', 'NT', 'evangelho', 'Mateus', 28, NOW(), NOW()),
(gen_random_uuid(), v_id, 41, 'Marcos', 'NT', 'evangelho', 'Marcos', 16, NOW(), NOW()),
(gen_random_uuid(), v_id, 42, 'Lucas', 'NT', 'evangelho', 'Lucas', 24, NOW(), NOW()),
(gen_random_uuid(), v_id, 43, 'Joao', 'NT', 'evangelho', 'Joao', 21, NOW(), NOW()) RETURNING id INTO jo_id,
(gen_random_uuid(), v_id, 44, 'Atos', 'NT', 'historia', 'Lucas', 28, NOW(), NOW()),
(gen_random_uuid(), v_id, 45, 'Romanos', 'NT', 'epistola', 'Paulo', 16, NOW(), NOW()) RETURNING id INTO rm_id,
(gen_random_uuid(), v_id, 46, '1 Corintios', 'NT', 'epistola', 'Paulo', 16, NOW(), NOW()),
(gen_random_uuid(), v_id, 47, '2 Corintios', 'NT', 'epistola', 'Paulo', 13, NOW(), NOW()),
(gen_random_uuid(), v_id, 48, 'Galatas', 'NT', 'epistola', 'Paulo', 6, NOW(), NOW()),
(gen_random_uuid(), v_id, 49, 'Efesios', 'NT', 'epistola', 'Paulo', 6, NOW(), NOW()) RETURNING id INTO ef_id,
(gen_random_uuid(), v_id, 50, 'Filipenses', 'NT', 'epistola', 'Paulo', 4, NOW(), NOW()) RETURNING id INTO fp_id,
(gen_random_uuid(), v_id, 52, '1 Tessalonicenses', 'NT', 'epistola', 'Paulo', 5, NOW(), NOW()),
(gen_random_uuid(), v_id, 55, '2 Timoteo', 'NT', 'epistola', 'Paulo', 4, NOW(), NOW()) RETURNING id INTO tm_id,
(gen_random_uuid(), v_id, 58, 'Hebreus', 'NT', 'epistola', 'Desconhecido', 13, NOW(), NOW()) RETURNING id INTO hb_id,
(gen_random_uuid(), v_id, 59, 'Tiago', 'NT', 'epistola', 'Tiago', 5, NOW(), NOW()),
(gen_random_uuid(), v_id, 60, '1 Pedro', 'NT', 'epistola', 'Pedro', 5, NOW(), NOW()),
(gen_random_uuid(), v_id, 62, '1 Joao', 'NT', 'epistola', 'Joao', 5, NOW(), NOW()) RETURNING id INTO lj_id,
(gen_random_uuid(), v_id, 66, 'Apocalipse', 'NT', 'profetico', 'Joao', 22, NOW(), NOW()) RETURNING id INTO ap_id;

-- Livros restantes (AT)
INSERT INTO bible_books (id, versao_id, ordem, nome, testamento, genero, autor, "totalCapitulos", criado_em, atualizado_em) VALUES
(gen_random_uuid(), v_id, 2, 'Exodo', 'AT', 'lei', 'Moises', 40, NOW(), NOW()),
(gen_random_uuid(), v_id, 3, 'Levitico', 'AT', 'lei', 'Moises', 27, NOW(), NOW()),
(gen_random_uuid(), v_id, 4, 'Numeros', 'AT', 'lei', 'Moises', 36, NOW(), NOW()),
(gen_random_uuid(), v_id, 5, 'Deuteronomio', 'AT', 'lei', 'Moises', 34, NOW(), NOW()),
(gen_random_uuid(), v_id, 7, 'Juizes', 'AT', 'narrativa', 'Desconhecido', 21, NOW(), NOW()),
(gen_random_uuid(), v_id, 9, '1 Samuel', 'AT', 'narrativa', 'Samuel', 31, NOW(), NOW()),
(gen_random_uuid(), v_id, 10, '2 Samuel', 'AT', 'narrativa', 'Gad/Natan', 24, NOW(), NOW()),
(gen_random_uuid(), v_id, 11, '1 Reis', 'AT', 'narrativa', 'Desconhecido', 22, NOW(), NOW()),
(gen_random_uuid(), v_id, 12, '2 Reis', 'AT', 'narrativa', 'Desconhecido', 25, NOW(), NOW()),
(gen_random_uuid(), v_id, 13, '1 Cronicas', 'AT', 'historia', 'Esdras', 29, NOW(), NOW()),
(gen_random_uuid(), v_id, 14, '2 Cronicas', 'AT', 'historia', 'Esdras', 36, NOW(), NOW()),
(gen_random_uuid(), v_id, 15, 'Esdras', 'AT', 'historia', 'Esdras', 10, NOW(), NOW()),
(gen_random_uuid(), v_id, 16, 'Neemias', 'AT', 'historia', 'Neemias', 13, NOW(), NOW()),
(gen_random_uuid(), v_id, 17, 'Ester', 'AT', 'narrativa', 'Desconhecido', 10, NOW(), NOW()),
(gen_random_uuid(), v_id, 18, 'Jo', 'AT', 'poesia', 'Moises', 42, NOW(), NOW()),
(gen_random_uuid(), v_id, 21, 'Eclesiastes', 'AT', 'sabedoria', 'Salomao', 12, NOW(), NOW()),
(gen_random_uuid(), v_id, 22, 'Cantares', 'AT', 'poesia', 'Salomao', 8, NOW(), NOW()),
(gen_random_uuid(), v_id, 24, 'Jeremias', 'AT', 'profetico', 'Jeremias', 52, NOW(), NOW()),
(gen_random_uuid(), v_id, 25, 'Lamentacoes', 'AT', 'poesia', 'Jeremias', 5, NOW(), NOW()),
(gen_random_uuid(), v_id, 26, 'Ezequiel', 'AT', 'profetico', 'Ezequiel', 48, NOW(), NOW()),
(gen_random_uuid(), v_id, 27, 'Daniel', 'AT', 'profetico', 'Daniel', 12, NOW(), NOW()),
(gen_random_uuid(), v_id, 28, 'Oseias', 'AT', 'profetico', 'Oseias', 14, NOW(), NOW()),
(gen_random_uuid(), v_id, 29, 'Joel', 'AT', 'profetico', 'Joel', 3, NOW(), NOW()),
(gen_random_uuid(), v_id, 30, 'Amos', 'AT', 'profetico', 'Amos', 9, NOW(), NOW()),
(gen_random_uuid(), v_id, 31, 'Obadias', 'AT', 'profetico', 'Obadias', 1, NOW(), NOW()),
(gen_random_uuid(), v_id, 32, 'Jonas', 'AT', 'narrativa', 'Jonas', 4, NOW(), NOW()),
(gen_random_uuid(), v_id, 33, 'Miqueias', 'AT', 'profetico', 'Miqueias', 7, NOW(), NOW()),
(gen_random_uuid(), v_id, 34, 'Naum', 'AT', 'profetico', 'Naum', 3, NOW(), NOW()),
(gen_random_uuid(), v_id, 35, 'Habacuque', 'AT', 'profetico', 'Habacuque', 3, NOW(), NOW()),
(gen_random_uuid(), v_id, 36, 'Sofonias', 'AT', 'profetico', 'Sofonias', 3, NOW(), NOW()),
(gen_random_uuid(), v_id, 37, 'Ageu', 'AT', 'profetico', 'Ageu', 2, NOW(), NOW()),
(gen_random_uuid(), v_id, 38, 'Zacarias', 'AT', 'profetico', 'Zacarias', 14, NOW(), NOW()),
(gen_random_uuid(), v_id, 39, 'Malaquias', 'AT', 'profetico', 'Malaquias', 4, NOW(), NOW()),
(gen_random_uuid(), v_id, 51, 'Colossenses', 'NT', 'epistola', 'Paulo', 4, NOW(), NOW()),
(gen_random_uuid(), v_id, 53, '2 Tessalonicenses', 'NT', 'epistola', 'Paulo', 3, NOW(), NOW()),
(gen_random_uuid(), v_id, 54, '1 Timoteo', 'NT', 'epistola', 'Paulo', 6, NOW(), NOW()),
(gen_random_uuid(), v_id, 56, 'Tito', 'NT', 'epistola', 'Paulo', 3, NOW(), NOW()),
(gen_random_uuid(), v_id, 57, 'Filemom', 'NT', 'epistola', 'Paulo', 1, NOW(), NOW()),
(gen_random_uuid(), v_id, 61, '2 Pedro', 'NT', 'epistola', 'Pedro', 3, NOW(), NOW()),
(gen_random_uuid(), v_id, 63, '2 Joao', 'NT', 'epistola', 'Joao', 1, NOW(), NOW()),
(gen_random_uuid(), v_id, 64, '3 Joao', 'NT', 'epistola', 'Joao', 1, NOW(), NOW()),
(gen_random_uuid(), v_id, 65, 'Judas', 'NT', 'epistola', 'Judas', 1, NOW(), NOW());

-- Capitulos para Joao e Romanos
INSERT INTO bible_chapters (id, livro_id, numero, criado_em, atualizado_em) VALUES
(gen_random_uuid(), jo_id, 1, NOW(), NOW()) RETURNING id INTO cap_id,
(gen_random_uuid(), jo_id, 3, NOW(), NOW()),
(gen_random_uuid(), jo_id, 8, NOW(), NOW()),
(gen_random_uuid(), jo_id, 10, NOW(), NOW()),
(gen_random_uuid(), jo_id, 11, NOW(), NOW()),
(gen_random_uuid(), jo_id, 14, NOW(), NOW()),
(gen_random_uuid(), rm_id, 3, NOW(), NOW()),
(gen_random_uuid(), rm_id, 5, NOW(), NOW()),
(gen_random_uuid(), rm_id, 6, NOW(), NOW()),
(gen_random_uuid(), rm_id, 8, NOW(), NOW()) RETURNING id INTO cap_id,
(gen_random_uuid(), rm_id, 10, NOW(), NOW()),
(gen_random_uuid(), rm_id, 12, NOW(), NOW()),
(gen_random_uuid(), ef_id, 2, NOW(), NOW()),
(gen_random_uuid(), fp_id, 4, NOW(), NOW()),
(gen_random_uuid(), tm_id, 3, NOW(), NOW()),
(gen_random_uuid(), hb_id, 1, NOW(), NOW()),
(gen_random_uuid(), hb_id, 4, NOW(), NOW()),
(gen_random_uuid(), hb_id, 11, NOW(), NOW()),
(gen_random_uuid(), lj_id, 1, NOW(), NOW()),
(gen_random_uuid(), lj_id, 4, NOW(), NOW()),
(gen_random_uuid(), ap_id, 3, NOW(), NOW()),
(gen_random_uuid(), ap_id, 21, NOW(), NOW());

-- Versiculos-chave
INSERT INTO bible_verses (id, versao_id, livro_id, capitulo_id, numero, texto, criado_em, atualizado_em)
SELECT gen_random_uuid(), v_id, b.id, c.id, 1, t.texto, NOW(), NOW()
FROM (VALUES
  ('Joao', 1, 1, 'No principio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.'),
  ('Joao', 3, 16, 'Porque assim amou Deus o mundo, que deu o seu Filho unigenito, para que todo aquele que nele cre nao pereca, mas tenha a vida eterna.'),
  ('Joao', 8, 32, 'E conhecereis a verdade, e a verdade vos libertara.'),
  ('Joao', 11, 25, 'Disse-lhe Jesus: Eu sou a ressurreicao e a vida; quem cre em mim, ainda que morra, vivera.'),
  ('Joao', 14, 6, 'Disse-lhe Jesus: Eu sou o caminho, e a verdade, e a vida; ninguem vem ao Pai senao por mim.'),
  ('Joao', 14, 27, 'Deixo-vos a paz, a minha paz vos dou; nao vo-la dou como o mundo a da.'),
  ('Romanos', 3, 23, 'Porque todos pecaram e destituidos estao da gloria de Deus.'),
  ('Romanos', 5, 8, 'Mas Deus prova o seu amor por nos em que Cristo morreu por nos, sendo nos ainda pecadores.'),
  ('Romanos', 6, 23, 'Porque o salario do pecado e a morte, mas o dom gratuito de Deus e a vida eterna em Cristo Jesus, nosso Senhor.'),
  ('Romanos', 8, 1, 'Portanto, agora nenhuma condenacao ha para os que estao em Cristo Jesus.'),
  ('Romanos', 8, 28, 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.'),
  ('Romanos', 10, 9, 'Se, pois, confessares com a tua boca que Jesus e o Senhor, e creres no teu coracao que Deus o ressuscitou dos mortos, seras salvo.'),
  ('Efesios', 2, 8, 'Pela graca sois salvos, por meio da fe; e isto nao vem de vos, e dom de Deus.'),
  ('Filipenses', 4, 13, 'Posso todas as coisas naquele que me fortalece.'),
  ('2 Timoteo', 3, 16, 'Toda a Escritura e divinamente inspirada, e proveitosa para ensinar, para repreender, para corrigir, para instruir em justica.'),
  ('Hebreus', 1, 1, 'Muitas vezes, e de muitas maneiras, falou Deus aos nossos pais, por intermedio dos profetas.'),
  ('Hebreus', 4, 12, 'A palavra de Deus e viva, e eficaz, e mais cortante do que qualquer espada de dois gumes.'),
  ('Hebreus', 11, 1, 'A fe e a certeza daquilo que esperamos, e a prova das coisas que nao vemos.'),
  ('1 Joao', 1, 9, 'Se confessarmos os nossos pecados, ele e fiel e justo para nos perdoar.'),
  ('1 Joao', 4, 8, 'Quem nao ama nao conhece a Deus, porque Deus e amor.')
) AS t(livro_nome, cap, num, texto)
JOIN bible_books b ON b.nome = t.livro_nome AND b.versao_id = v_id
JOIN bible_chapters c ON c.livro_id = b.id AND c.numero = t.cap;

-- Doutrinas
INSERT INTO doctrines (id, nome, categoria, descricao, "fundamentoScriptureiro", "referenciasChave", criado_em, atualizado_em) VALUES
(gen_random_uuid(), 'Bibliologia', 'Revelacao', 'Inspiracao, inerrancia e autoridade das Escrituras.', '2 Timoteo 3:16', '["2 Timoteo 3:16","2 Pedro 1:20-21"]', NOW(), NOW()),
(gen_random_uuid(), 'Cristologia', 'Cristo', 'Pessoa e obra de Cristo: natureza divina e humana, encarnacao, expiacao.', 'Joao 1:1-14', '["Joao 1:1-14","Colossenses 1:15-20"]', NOW(), NOW()),
(gen_random_uuid(), 'Soteriologia', 'Salvacao', 'Pecado, graca, fe, justificacao, regeneracao, santificacao.', 'Efesios 2:8-9', '["Efesios 2:8-9","Romanos 3:23-24"]', NOW(), NOW()),
(gen_random_uuid(), 'Pneumatologia', 'Espirito Santo', 'Personalidade, divindade, obras e dons do Espirito Santo.', 'Joao 14:16-17', '["Joao 14:16-17","Atos 1:8"]', NOW(), NOW()),
(gen_random_uuid(), 'Eclesiologia', 'Igreja', 'Natureza, missao, governanca e sacramentos da igreja.', 'Mateus 16:18', '["Mateus 16:18","Efesios 5:25-27"]', NOW(), NOW()),
(gen_random_uuid(), 'Escatologia', 'Futuras Coisas', 'Retorno de Cristo, julgamento, milenio, ceu e inferno.', 'Apocalipse 21:1', '["Apocalipse 21:1","1 Tessalonicenses 4:16-17"]', NOW(), NOW()),
(gen_random_uuid(), 'Teologia Proper', 'Deus', 'Atributos de Deus: soberania, santidade, amor, justica, misericordia.', 'Exodo 34:6-7', '["Exodo 34:6-7","Salmo 145:8-9"]', NOW(), NOW()),
(gen_random_uuid(), 'Hamartiologia', 'Pecado', 'Origem, natureza e efeito do pecado na humanidade.', 'Romanos 5:12', '["Romanos 5:12","Gênesis 3:1-19"]', NOW(), NOW());

-- Lexico grego
INSERT INTO lexicon_entries (id, strong, idioma, lemma, transliteracao, "classeGramatical", definicao, significados, "totalOcorrencias", criado_em, atualizado_em) VALUES
(gen_random_uuid(), 'G3056', 'grego', 'logos', 'logos', 'substantivo', 'Palavra, razao, discurso. Refere-se a Cristo como a Palavra eterna de Deus.', '["palavra","razao","verbo","discurso"]', 330, NOW(), NOW()),
(gen_random_uuid(), 'G26', 'grego', 'agape', 'agape', 'substantivo', 'Amor incondicional, amor sacrificial. O tipo mais elevado de amor no NT.', '["amor","caridade","afeicao"]', 116, NOW(), NOW()),
(gen_random_uuid(), 'G4100', 'grego', 'pistis', 'pistis', 'substantivo', 'Fe, confianca, crenca. Confidence em Deus e na sua Palavra.', '["fe","crenca","confianca"]', 243, NOW(), NOW()),
(gen_random_uuid(), 'G2316', 'grego', 'theos', 'theos', 'substantivo', 'Deus. O ser supremo, criador e sustentador de todas as coisas.', '["Deus"]', 1343, NOW(), NOW()),
(gen_random_uuid(), 'G2424', 'grego', 'Iesous', 'Iesous', 'substantivo', 'Jesus. Nome proprio do Salvador, significando Senhor salva.', '["Jesus","Salvador"]', 973, NOW(), NOW()),
(gen_random_uuid(), 'G5485', 'grego', 'charis', 'charis', 'substantivo', 'Graça, favor, gratidao. A graça imerecida de Deus para a salvacao.', '["graca","favor","gratidao"]', 155, NOW(), NOW());

-- Lexico hebraico
INSERT INTO lexicon_entries (id, strong, idioma, lemma, transliteracao, "classeGramatical", definicao, significados, "totalOcorrencias", criado_em, atualizado_em) VALUES
(gen_random_uuid(), 'H430', 'hebraico', 'Elohim', 'Elohim', 'substantivo', 'Deus. Nome plural de majestade usado para o Deus verdadeiro.', '["Deus","criador"]', 2606, NOW(), NOW()),
(gen_random_uuid(), 'H3068', 'hebraico', 'YHWH', 'YHWH', 'substantivo', 'O Senhor. Nome proprio de Deus, o Deus covenantal de Israel.', '["Senhor","Jehova"]', 6828, NOW(), NOW()),
(gen_random_uuid(), 'H1254', 'hebraico', 'bara', 'bara', 'verbo', 'Criar. Usado exclusivamente para a criacao divina.', '["criar","formar"]', 48, NOW(), NOW()),
(gen_random_uuid(), 'H2617', 'hebraico', 'chesed', 'chesed', 'substantivo', 'Graça, misericordia, amor leal. Amor covenantal de Deus.', '["graca","misericordia","amor leal"]', 245, NOW(), NOW());

-- Personagens
INSERT INTO bible_persons (id, nome, nomeOriginal, categoria, biografia, "significadoNome", pai, filhos, titulos, "eventosChave", "referenciasBiblicas", criado_em, atualizado_em) VALUES
(gen_random_uuid(), 'Abraao', 'Abraham', 'patriarca', 'Pai dos crentes. Chamado por Deus para sair de Ur.', 'Pai de muitas nações', 'Tere', '["Isaque","Ismael"]', '["Pai dos crentes"]', '["Chamado por Deus","Alianca com Deus"]', '["Gen 12:1-3","Gen 15:6"]', NOW(), NOW()),
(gen_random_uuid(), 'Moises', 'Moshe', 'profeta', 'Lider que libertou Israel do Egito.', 'Tirado das aguas', 'Amram', '["Gerson","Eliezer"]', '["Libertador","Legislador"]', '["Exodo do Egito","Recebimento da Lei"]', '["Exodo 2:1-10","Exodo 20:1-17"]', NOW(), NOW()),
(gen_random_uuid(), 'Davi', 'David', 'rei', 'Segundo rei de Israel, ancestral de Jesus.', 'Amado', 'Jesse', '["Salomao","Absalao"]', '["Rei de Israel"]', '["Derrotou Golias","Reinado em Jerusalém"]', '["1 Samuel 17","2 Samuel 7"]', NOW(), NOW()),
(gen_random_uuid(), 'Jesus Cristo', 'Yeshua', 'messias', 'Filho de Deus encarnado, Salvador da humanidade.', 'Salvador', 'Jose', '[]', '["Salvador","Messias","Rei dos Reis"]', '["Nascimento em Belem","Crucificacao","Ressurreicao"]', '["Mateus 1:21","Joao 1:1"]', NOW(), NOW()),
(gen_random_uuid(), 'Paulo', 'Paulus', 'apostolo', 'Apostolo dos gentios, autor de 13 epistolas.', 'Pequeno', 'Fariseu', '[]', '["Apostolo dos Gentios"]', '["Conversao em Damasco","Missões"]', '["Atos 9:1-19","Romanos 1:1"]', NOW(), NOW()),
(gen_random_uuid(), 'Pedro', 'Kepha', 'apostolo', 'Lider dos apostolos, pescador chamado por Jesus.', 'Pedra', 'Joao', '["Jose","Simao"]', '["Apostolo","Pregador"]', '["Chamado por Jesus","Pentecostes"]', '["Mateus 16:18","Atos 2:14"]', NOW(), NOW());

-- Localizacoes
INSERT INTO bible_locations (id, nome, nomeOriginal, tipo, latitude, longitude, descricao, "referenciasBiblicas", criado_em, atualizado_em) VALUES
(gen_random_uuid(), 'Jerusalem', 'Yerushalayim', 'cidade', 31.7683, 35.2137, 'Cidade santa de Israel, sede do templo.', '["Mateus 16:21","Apocalipse 21:2"]', NOW(), NOW()),
(gen_random_uuid(), 'Belem', 'Belehem', 'cidade', 31.7049, 35.2078, 'Cidade de Davi, local de nascimento de Jesus.', '["Miqueias 5:2","Mateus 2:1"]', NOW(), NOW()),
(gen_random_uuid(), 'Nazare', 'Natzeret', 'cidade', 32.6996, 35.3035, 'Cidade onde Jesus cresceu.', '["Mateus 2:23","Lucas 2:39"]', NOW(), NOW()),
(gen_random_uuid(), 'Galileia', 'Galil', 'regiao', 32.8, 35.5, 'Regiao no norte de Israel, palco de muitos milagres.', '["Mateus 4:12-16"]', NOW(), NOW()),
(gen_random_uuid(), 'Egito', 'Mizrayim', 'pais', 30.0, 31.0, 'Imperio onde Israel foi escravizado.', '["Gen 12:10","Exodo 12:41"]', NOW(), NOW());

END $$;
