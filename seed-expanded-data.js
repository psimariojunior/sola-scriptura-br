const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/bible_scholar';

const lexiconEntries = [
  { strong: 'G26', idioma: 'grego', lemma: 'ἀγάπη', transliteracao: 'agapē', classeGramatical: 'substantivo', definicao: 'Amor divino, amor incondicional', significados: ['amor', 'afeição', 'benevolência divina'], totalOcorrencias: 116 },
  { strong: 'G25', idioma: 'grego', lemma: 'ἀγαπάω', transliteracao: 'agapaō', classeGramatical: 'verbo', definicao: 'Amar com amor divino', significados: ['amar', 'estimar'], totalOcorrencias: 143 },
  { strong: 'G1249', idioma: 'grego', lemma: 'διάκονος', transliteracao: 'diakonos', classeGramatical: 'substantivo', definicao: 'Servo, ministro, diácono', significados: ['servo', 'ministro', 'diácono'], totalOcorrencias: 29 },
  { strong: 'G5485', idioma: 'grego', lemma: 'χάρις', transliteracao: 'charis', classeGramatical: 'substantivo', definicao: 'Graça, favor imerecido', significados: ['graça', 'favor', 'benção'], totalOcorrencias: 155 },
  { strong: 'G4102', idioma: 'grego', lemma: 'πίστις', transliteracao: 'pistis', classeGramatical: 'substantivo', definicao: 'Fé, crença, confiança', significados: ['fé', 'confiança', 'fidelidade'], totalOcorrencias: 244 },
  { strong: 'G165', idioma: 'grego', lemma: 'αἰών', transliteracao: 'aiōn', classeGramatical: 'substantivo', definicao: 'Era, eternidade, século', significados: ['eternidade', 'século', 'era'], totalOcorrencias: 128 },
  { strong: 'G2316', idioma: 'grego', lemma: 'θεός', transliteracao: 'theos', classeGramatical: 'substantivo', definicao: 'Deus, divindade', significados: ['Deus', 'divindade'], totalOcorrencias: 1317 },
  { strong: 'G2962', idioma: 'grego', lemma: 'κύριος', transliteracao: 'kyrios', classeGramatical: 'substantivo', definicao: 'Senhor, mestre, dono', significados: ['Senhor', 'Mestre', 'dono'], totalOcorrencias: 717 },
  { strong: 'G5547', idioma: 'grego', lemma: 'Χριστός', transliteracao: 'Christos', classeGramatical: 'substantivo', definicao: 'Cristo, o Ungido', significados: ['Cristo', 'Messias', 'Ungido'], totalOcorrencias: 531 },
  { strong: 'G4151', idioma: 'grego', lemma: 'πνεῦμα', transliteracao: 'pneuma', classeGramatical: 'substantivo', definicao: 'Espírito, sopro, vento', significados: ['Espírito', 'sopro', 'vento'], totalOcorrencias: 379 },
  { strong: 'H3068', idioma: 'hebraico', lemma: 'יהוה', transliteracao: 'YHWH', classeGramatical: 'nome próprio', definicao: 'O SENHOR, nome pessoal de Deus', significados: ['SENHOR', 'Yahweh', 'Eu Sou'], totalOcorrencias: 6828 },
  { strong: 'H430', idioma: 'hebraico', lemma: 'אֱלֹהִים', transliteracao: 'Elohim', classeGramatical: 'substantivo', definicao: 'Deus, deuses, juízes', significados: ['Deus', 'divindade', 'seres celestiais'], totalOcorrencias: 2602 },
  { strong: 'H136', idioma: 'hebraico', lemma: 'אֲדֹנָי', transliteracao: 'Adonai', classeGramatical: 'substantivo', definicao: 'Senhor, Soberano', significados: ['Senhor', 'Soberano', 'Mestre'], totalOcorrencias: 431 },
  { strong: 'H157', idioma: 'hebraico', lemma: 'אָהַב', transliteracao: 'ahav', classeGramatical: 'verbo', definicao: 'Amar, gostar de', significados: ['amar', 'querer bem'], totalOcorrencias: 251 },
  { strong: 'H2617', idioma: 'hebraico', lemma: 'חֵסֵד', transliteracao: 'chesed', classeGramatical: 'substantivo', definicao: 'Misericórdia, bondade leal, amor covenantal', significados: ['misericórdia', 'bondade', 'amor leal', 'graça'], totalOcorrencias: 248 },
  { strong: 'H6918', idioma: 'hebraico', lemma: 'קָדוֹשׁ', transliteracao: 'qadosh', classeGramatical: 'adjetivo', definicao: 'Santo, sagrado, separado', significados: ['santo', 'sagrado', 'puro'], totalOcorrencias: 116 },
  { strong: 'H6944', idioma: 'hebraico', lemma: 'קֹדֶשׁ', transliteracao: 'qodesh', classeGramatical: 'substantivo', definicao: 'Santidade, santuário', significados: ['santidade', 'santuário', 'consagração'], totalOcorrencias: 469 },
  { strong: 'H6666', idioma: 'hebraico', lemma: 'צְדָקָה', transliteracao: 'tsedaqah', classeGramatical: 'substantivo', definicao: 'Justiça, retidão, justificação', significados: ['justiça', 'retidão', 'salvação'], totalOcorrencias: 157 },
  { strong: 'H7965', idioma: 'hebraico', lemma: 'שָׁלוֹם', transliteracao: 'shalom', classeGramatical: 'substantivo', definicao: 'Paz, completo, bem-estar', significados: ['paz', 'bem-estar', 'saúde', 'completo'], totalOcorrencias: 237 },
  { strong: 'H8085', idioma: 'hebraico', lemma: 'שָׁמַע', transliteracao: 'shama', classeGramatical: 'verbo', definicao: 'Ouvir, escutar, obedecer', significados: ['ouvir', 'escutar', 'obedecer'], totalOcorrencias: 1159 },
  { strong: 'H1288', idioma: 'hebraico', lemma: 'בָּרַךְ', transliteracao: 'barak', classeGramatical: 'verbo', definicao: 'Abençoar, ajoelhar-se', significados: ['abençoar', 'louvar', 'adorar'], totalOcorrencias: 330 },
  { strong: 'H2398', idioma: 'hebraico', lemma: 'חָטָא', transliteracao: 'chata', classeGramatical: 'verbo', definicao: 'Pecar, errar o alvo', significados: ['pecar', 'errar', 'falhar'], totalOcorrencias: 238 },
  { strong: 'H2403', idioma: 'hebraico', lemma: 'חַטָּאת', transliteracao: 'chatta\'at', classeGramatical: 'substantivo', definicao: 'Pecado, oferta pelo pecado', significados: ['pecado', 'oferta pelo pecado', 'culpa'], totalOcorrencias: 296 },
  { strong: 'H3467', idioma: 'hebraico', lemma: 'יָשַׁע', transliteracao: 'yasha', classeGramatical: 'verbo', definicao: 'Salvar, libertar, livrar', significados: ['salvar', 'libertar', 'livrar', 'dar vitória'], totalOcorrencias: 213 },
  { strong: 'H3444', idioma: 'hebraico', lemma: 'יְשׁוּעָה', transliteracao: 'yeshuah', classeGramatical: 'substantivo', definicao: 'Salvação, libertação, vitória', significados: ['salvação', 'libertação', 'vitória', 'auxílio'], totalOcorrencias: 78 },
  { strong: 'H7225', idioma: 'hebraico', lemma: 'רֵאשִׁית', transliteracao: 'reshit', classeGramatical: 'substantivo', definicao: 'Princípio, primícias, primeiro', significados: ['princípio', 'primícias', 'melhor'], totalOcorrencias: 51 },
  { strong: 'H8451', idioma: 'hebraico', lemma: 'תּוֹרָה', transliteracao: 'torah', classeGramatical: 'substantivo', definicao: 'Lei, instrução, ensino', significados: ['lei', 'instrução', 'ensino', 'Torá'], totalOcorrencias: 220 },
];

const persons = [
  { nome: 'Adão', nomeOriginal: 'אָדָם', categoria: 'Patriarca', biografia: 'Primeiro homem criado por Deus no Jardim do Éden.', significadoNome: 'Homem, terra, humanidade', referenciasBiblicas: ['Gn 1:26-5:5'] },
  { nome: 'Eva', nomeOriginal: 'חַוָּה', categoria: 'Matriarca', biografia: 'Primeira mulher, mãe de toda humanidade.', significadoNome: 'Vivente, mãe da vida', referenciasBiblicas: ['Gn 2:20-4:25'] },
  { nome: 'Noé', nomeOriginal: 'נֹחַ', categoria: 'Patriarca', biografia: 'Homem justo que construiu a arca e sobreviveu ao dilúvio.', significadoNome: 'Descanso, consolo', referenciasBiblicas: ['Gn 5:28-10:32'] },
  { nome: 'Abraão', nomeOriginal: 'אַבְרָהָם', categoria: 'Patriarca', biografia: 'Pai da nação de Israel, chamado por Deus para ser o progenitor do povo eleito.', significadoNome: 'Pai de multidão', filhos: ['Isaque', 'Ismael'], referenciasBiblicas: ['Gn 11:26-25:10'] },
  { nome: 'Sara', nomeOriginal: 'שָׂרָה', categoria: 'Matriarca', biografia: 'Esposa de Abraão, mãe de Isaque.', significadoNome: 'Princesa, nobre', referenciasBiblicas: ['Gn 11:29-23:20'] },
  { nome: 'Isaque', nomeOriginal: 'יִצְחָק', categoria: 'Patriarca', biografia: 'Filho da promessa de Abraão e Sara, pai de Jacó e Esaú.', significadoNome: 'Riso, ele riu', referenciasBiblicas: ['Gn 17:19-35:29'] },
  { nome: 'Rebeca', nomeOriginal: 'רִבְקָה', categoria: 'Matriarca', biografia: 'Esposa de Isaque, mãe de Jacó e Esaú.', significadoNome: 'Laço, aquela que une', referenciasBiblicas: ['Gn 22:23-27:46'] },
  { nome: 'Jacó', nomeOriginal: 'יַעֲקֹב', categoria: 'Patriarca', biografia: 'Filho de Isaque e Rebeca, depois chamado Israel, pai das doze tribos.', significadoNome: 'Aquele que segura o calcanhar, suplantador', filhos: ['Rúben', 'Simeão', 'Levi', 'Judá', 'Dã', 'Naftali', 'Gade', 'Aser', 'Issacar', 'Zebulom', 'José', 'Benjamim'], referenciasBiblicas: ['Gn 25:21-49:33'] },
  { nome: 'José do Egito', nomeOriginal: 'יוֹסֵף', categoria: 'Patriarca', biografia: 'Filho de Jacó, vendido como escravo no Egito, tornou-se governador.', significadoNome: 'Ele acrescentará', titulos: ['Governador do Egito'], referenciasBiblicas: ['Gn 30:22-50:26'] },
  { nome: 'Moisés', nomeOriginal: 'מֹשֶׁה', categoria: 'Profeta', biografia: 'Grande profeta que libertou Israel do Egito e recebeu a Lei no Sinai.', significadoNome: 'Tirado das águas', titulos: ['Libertador', 'Legislador', 'Profeta'], eventosChave: ['Êxodo do Egito', 'Recepção da Lei', 'Atravessia do Mar Vermelho'], referenciasBiblicas: ['Ex 2:1-Dt 34:12'] },
  { nome: 'Arão', nomeOriginal: 'אַהֲרֹן', categoria: 'Sacerdote', biografia: 'Irmão de Moisés, primeiro sumo sacerdote de Israel.', significadoNome: 'Iluminado, montanha', referenciasBiblicas: ['Ex 4:14-Nm 20:28'] },
  { nome: 'Josué', nomeOriginal: 'יְהוֹשֻׁעַ', categoria: 'Líder Militar', biografia: 'Sucessor de Moisés que conduziu Israel à conquista de Canaã.', significadoNome: 'O SENHOR é salvação', titulos: ['Comandante do Exército de Israel'], eventosChave: ['Conquista de Jericó', 'Conquista de Canaã'], referenciasBiblicas: ['Ex 17:9-Js 24:29'] },
  { nome: 'Débora', nomeOriginal: 'דְּבוֹרָה', categoria: 'Juíza', biografia: 'Profetisa e juíza que liderou Israel à vitória contra Jabim.', significadoNome: 'Abelha', titulos: ['Profetisa', 'Juíza de Israel'], referenciasBiblicas: ['Jz 4:1-5:31'] },
  { nome: 'Sansão', nomeOriginal: 'שִׁמְשׁוֹן', categoria: 'Juiz', biografia: 'Juiz de Israel conhecido por sua força sobrenatural dado por Deus.', significadoNome: 'Pequeno sol, forte', referenciasBiblicas: ['Jz 13:1-16:31'] },
  { nome: 'Rute', nomeOriginal: 'רוּת', categoria: 'Figura Bíblica', biografia: 'Moabita que se tornou bisavó de Davi, exemplo de lealdade e fé.', significadoNome: 'Amizade, companheira', referenciasBiblicas: ['Rt 1:1-4:22'] },
  { nome: 'Samuel', nomeOriginal: 'שְׁמוּאֵל', categoria: 'Profeta', biografia: 'Último juiz de Israel, profeta que ungiu Saul e Davi como reis.', significadoNome: 'Ouvido por Deus', titulos: ['Profeta', 'Juiz', 'Vidente'], referenciasBiblicas: ['1Sm 1:1-25:1'] },
  { nome: 'Davi', nomeOriginal: 'דָּוִד', categoria: 'Rei', biografia: 'Segundo rei de Israel, homem segundo o coração de Deus, ancestral de Jesus.', significadoNome: 'Amado, querido', titulos: ['Rei de Israel', 'Salmista', 'Guerreiro'], eventosChave: ['Vitória sobre Golias', 'Estabelecimento de Jerusalém', 'Aliança Davídica'], referenciasBiblicas: ['Rt 4:17-1Rs 2:10'] },
  { nome: 'Salomão', nomeOriginal: 'שְׁלֹמֹה', categoria: 'Rei', biografia: 'Filho de Davi, conhecido por sua sabedoria e pela construção do Templo.', significadoNome: 'Pacífico', titulos: ['Rei de Israel', 'Sábio'], eventosChave: ['Construção do Templo', 'Juízo de Salomão'], referenciasBiblicas: ['2Sm 12:24-1Rs 11:43'] },
  { nome: 'Elias', nomeOriginal: 'אֵלִיָּהוּ', categoria: 'Profeta', biografia: 'Grande profeta que confrontou os profetas de Baal no Monte Carmelo.', significadoNome: 'Meu Deus é o SENHOR', titulos: ['Profeta de Fogo'], eventosChave: ['Desafio no Monte Carmelo', 'Ascensão ao céu'], referenciasBiblicas: ['1Rs 17:1-2Rs 2:11'] },
  { nome: 'Eliseu', nomeOriginal: 'אֱלִישָׁע', categoria: 'Profeta', biografia: 'Sucessor de Elias, realizou muitos milagres em Israel.', significadoNome: 'Deus é salvação', referenciasBiblicas: ['1Rs 19:16-2Rs 13:21'] },
  { nome: 'Isaías', nomeOriginal: 'יְשַׁעְיָהוּ', categoria: 'Profeta', biografia: 'Grande profeta do Reino do Sul, escreveu sobre o Messias sofredor.', significadoNome: 'O SENHOR é salvação', referenciasBiblicas: ['Is 1:1-66:24'] },
  { nome: 'Jeremias', nomeOriginal: 'יִרְמְיָהוּ', categoria: 'Profeta', biografia: 'Profeta das lágrimas, anunciou o exílio babilônico e a nova aliança.', significadoNome: 'O SENHOR exalta', referenciasBiblicas: ['Jr 1:1-52:34'] },
  { nome: 'Ezequiel', nomeOriginal: 'יְחֶזְקֵאל', categoria: 'Profeta', biografia: 'Profeta sacerdotal do exílio, conhecido por suas visões da glória de Deus.', significadoNome: 'Deus fortalece', referenciasBiblicas: ['Ez 1:1-48:35'] },
  { nome: 'Daniel', nomeOriginal: 'דָּנִיֵּאל', categoria: 'Profeta', biografia: 'Profeta no exílio babilônico, conhecido por sua sabedoria e visões apocalípticas.', significadoNome: 'Deus é meu juiz', titulos: ['Sábio', 'Intérprete de sonhos'], eventosChave: ['Cova dos leões', 'Interpretação dos sonhos de Nabucodonosor'], referenciasBiblicas: ['Dn 1:1-12:13'] },
  { nome: 'Esdras', nomeOriginal: 'עֶזְרָא', categoria: 'Escriba', biografia: 'Escriba e sacerdote que liderou o retorno do exílio e restaurou a Lei.', significadoNome: 'Ajuda, auxílio', referenciasBiblicas: ['Ed 7:1-10:44'] },
  { nome: 'Neemias', nomeOriginal: 'נְחֶמְיָה', categoria: 'Líder Político', biografia: 'Governador que reconstruiu os muros de Jerusalém após o exílio.', significadoNome: 'O SENHOR consola', referenciasBiblicas: ['Ne 1:1-13:31'] },
  { nome: 'Ester', nomeOriginal: 'אֶסְתֵּר', categoria: 'Rainha', biografia: 'Rainha persa que salvou os judeus do extermínio.', significadoNome: 'Estrela, oculta', referenciasBiblicas: ['Et 1:1-10:3'] },
  { nome: 'Jó', nomeOriginal: 'אִיּוֹב', categoria: 'Figura Bíblica', biografia: 'Homem justo que sofreu terríveis provações e manteve sua fé em Deus.', significadoNome: 'Oprimido, perseguido', referenciasBiblicas: ['Jó 1:1-42:17'] },
  { nome: 'Jonas', nomeOriginal: 'יוֹנָה', categoria: 'Profeta', biografia: 'Profeta relutante que pregou arrependimento em Nínive.', significadoNome: 'Pomba', referenciasBiblicas: ['Jn 1:1-4:11'] },
  { nome: 'Maria Mãe de Jesus', nomeOriginal: 'Μαρία', categoria: 'Figura Bíblica', biografia: 'Mãe de Jesus Cristo, escolhida por Deus para dar à luz o Salvador.', significadoNome: 'Amada, senhora', titulos: ['Theotokos', 'Mãe de Deus'], referenciasBiblicas: ['Mt 1:16-Lc 2:52'] },
  { nome: 'José Carpinteiro', nomeOriginal: 'Ἰωσήφ', categoria: 'Figura Bíblica', biografia: 'Pai terreno de Jesus, carpinteiro de Nazaré, homem justo.', significadoNome: 'Deus acrescenta', referenciasBiblicas: ['Mt 1:16-Lc 2:52'] },
  { nome: 'João Batista', nomeOriginal: 'Ἰωάννης', categoria: 'Profeta', biografia: 'Profeta que preparou o caminho para Jesus, batizou-o no Jordão.', significadoNome: 'Deus é gracioso', titulos: ['Profeta', 'Batista', 'Precursor'], referenciasBiblicas: ['Mt 3:1-17'] },
  { nome: 'Pedro', nomeOriginal: 'Πέτρος', categoria: 'Apóstolo', biografia: 'Líder dos apóstolos, pescador chamado por Jesus para ser pescador de homens.', significadoNome: 'Rocha, pedra', titulos: ['Apóstolo', 'Líder da Igreja Primitiva'], eventosChave: ['Confissão de Cesareia', 'Pentecostes', 'Visão do lençol'], referenciasBiblicas: ['Mt 4:18-At 12:17'] },
  { nome: 'João Evangelista', nomeOriginal: 'Ἰωάννης', categoria: 'Apóstolo', biografia: 'Apóstolo amado, autor do Evangelho de João, epístolas e Apocalipse.', significadoNome: 'Deus é gracioso', titulos: ['Apóstolo', 'Evangelista', 'Vidente de Patmos'], referenciasBiblicas: ['Mt 4:21-Ap 22:21'] },
  { nome: 'André', nomeOriginal: 'Ἀνδρέας', categoria: 'Apóstolo', biografia: 'Irmão de Pedro, um dos primeiros discípulos de Jesus.', significadoNome: 'Viril, másculo', referenciasBiblicas: ['Mt 4:18-Jo 12:22'] },
  { nome: 'Tomé', nomeOriginal: 'Θωμᾶς', categoria: 'Apóstolo', biografia: 'Apóstolo conhecido por suas dúvidas sobre a ressurreição de Jesus.', significadoNome: 'Gêmeo', eventosChave: ['Incredulidade e confissão'], referenciasBiblicas: ['Jo 11:16-Jo 20:28'] },
  { nome: 'Mateus', nomeOriginal: 'Ματθαῖος', categoria: 'Apóstolo', biografia: 'Publicano cobrador de impostos que se tornou apóstolo e evangelista.', significadoNome: 'Dom de Deus', referenciasBiblicas: ['Mt 9:9-At 1:13'] },
  { nome: 'Paulo', nomeOriginal: 'Παῦλος', categoria: 'Apóstolo', biografia: 'Apóstolo dos gentios, escreveu 13 epístolas do Novo Testamento.', significadoNome: 'Pequeno, humilde', titulos: ['Apóstolo dos Gentios', 'Missionário'], eventosChave: ['Conversão no caminho de Damasco', 'Três viagens missionárias', 'Naufrágio em Malta'], referenciasBiblicas: ['At 7:58-2Tm 4:22'] },
  { nome: 'Barnabé', nomeOriginal: 'Βαρνάβας', categoria: 'Apóstolo', biografia: 'Companheiro de Paulo em sua primeira viagem missionária, filho da consolação.', significadoNome: 'Filho da consolação', referenciasBiblicas: ['At 4:36-At 15:39'] },
  { nome: 'Timóteo', nomeOriginal: 'Τιμόθεος', categoria: 'Pastor', biografia: 'Jovem cooperador de Paulo, pastor da igreja em Éfeso.', significadoNome: 'Honrado por Deus', referenciasBiblicas: ['At 16:1-2Tm 4:21'] },
  { nome: 'Lucas', nomeOriginal: 'Λουκᾶς', categoria: 'Evangelista', biografia: 'Médico e companheiro de Paulo, autor do Evangelho de Lucas e Atos.', significadoNome: 'Luminoso, iluminado', referenciasBiblicas: ['Cl 4:14-2Tm 4:11'] },
  { nome: 'Marcos', nomeOriginal: 'Μᾶρκος', categoria: 'Evangelista', biografia: 'Autor do Evangelho de Marcos, companheiro de Pedro e Paulo.', significadoNome: 'Martelo, polido', referenciasBiblicas: ['At 12:12-1Pe 5:13'] },
  { nome: 'Estêvão', nomeOriginal: 'Στέφανος', categoria: 'Mártir', biografia: 'Primeiro mártir cristão, um dos sete diáconos da igreja primitiva.', significadoNome: 'Coroa, coroado', titulos: ['Protomártir'], referenciasBiblicas: ['At 6:1-7:60'] },
  { nome: 'Maria Madalena', nomeOriginal: 'Μαρία', categoria: 'Discípula', biografia: 'Discípula fiel que testemunhou a ressurreição de Jesus.', significadoNome: 'Amada, senhora', referenciasBiblicas: ['Lc 8:2-Jo 20:18'] },
  { nome: 'Nicodemos', nomeOriginal: 'Νικόδημος', categoria: 'Fariseu', biografia: 'Fariseu e membro do Sinédrio que visitou Jesus à noite.', significadoNome: 'Vencedor do povo', referenciasBiblicas: ['Jo 3:1-Jo 19:39'] },
  { nome: 'Herodes o Grande', nomeOriginal: 'Ἡρῴδης', categoria: 'Rei', biografia: 'Rei da Judeia que governou no nascimento de Jesus.', significadoNome: 'Herói', referenciasBiblicas: ['Mt 2:1-22'] },
  { nome: 'Pilatos', nomeOriginal: 'Πιλᾶτος', categoria: 'Governante', biografia: 'Governador romano da Judeia que presidiu o julgamento de Jesus.', significadoNome: 'Armado com dardo', referenciasBiblicas: ['Mt 27:1-Jo 19:38'] },
  { nome: 'Caifás', nomeOriginal: 'Καϊάφας', categoria: 'Sacerdote', biografia: 'Sumo sacerdote que presidiu o julgamento religioso de Jesus.', significadoNome: 'Depressão, pedreira', referenciasBiblicas: ['Mt 26:3-Jo 18:14'] },
  { nome: 'Gamaliel', nomeOriginal: 'Γαμαλιήλ', categoria: 'Doutor da Lei', biografia: 'Famoso rabino fariseu, mestre de Paulo, membro do Sinédrio.', significadoNome: 'Recompensa de Deus', referenciasBiblicas: ['At 5:34-At 22:3'] },
  { nome: 'Marta', nomeOriginal: 'Μάρθα', categoria: 'Discípula', biografia: 'Irmã de Lázaro e Maria, serva fiel que hospedava Jesus.', significadoNome: 'Senhora, dona de casa', referenciasBiblicas: ['Lc 10:38-Jo 12:2'] },
  { nome: 'Lázaro de Betânia', nomeOriginal: 'Λάζαρος', categoria: 'Figura Bíblica', biografia: 'Amigo de Jesus que foi ressuscitado dos mortos após quatro dias.', significadoNome: 'Deus ajuda', referenciasBiblicas: ['Jo 11:1-44'] },
  { nome: 'Zaqueu', nomeOriginal: 'Ζακχαῖος', categoria: 'Cobrador de Impostos', biografia: 'Publicano de Jericó que se converteu ao encontrar Jesus.', significadoNome: 'Puro, inocente', referenciasBiblicas: ['Lc 19:1-10'] },
  { nome: 'Lídia', nomeOriginal: 'Λυδία', categoria: 'Empresária', biografia: 'Vendedora de púrpura, primeira convertida na Europa.', significadoNome: 'Da Lídia, região', referenciasBiblicas: ['At 16:14-40'] },
  { nome: 'Cornélio', nomeOriginal: 'Κορνήλιος', categoria: 'Centurião', biografia: 'Centurião romano, primeiro gentio convertido ao cristianismo.', significadoNome: 'Chifre, forte', referenciasBiblicas: ['At 10:1-48'] },
  { nome: 'Apolo', nomeOriginal: 'Ἀπολλώς', categoria: 'Pregador', biografia: 'Judeu eloquente de Alexandria, pregador e mestre do evangelho.', significadoNome: 'Destruidor, enviado', referenciasBiblicas: ['At 18:24-1Co 16:12'] },
  { nome: 'Silas', nomeOriginal: 'Σίλας', categoria: 'Missionário', biografia: 'Companheiro de Paulo em sua segunda viagem missionária.', significadoNome: 'Floresta, madeira', referenciasBiblicas: ['At 15:22-1Pe 5:12'] },
  { nome: 'Tito', nomeOriginal: 'Τίτος', categoria: 'Pastor', biografia: 'Cooperador de Paulo, pastor da igreja em Creta.', significadoNome: 'Honrado, querido', referenciasBiblicas: ['Gl 2:1-Tt 3:15'] },
];

const doctrines = [
  { nome: 'Trindade', categoria: 'Teontologia', descricao: 'A doutrina de que Deus é um em essência mas três em pessoas: Pai, Filho e Espírito Santo.', fundamentoScriptureiro: 'Mt 28:19, 2Co 13:14' },
  { nome: 'Inspiração das Escrituras', categoria: 'Bibliologia', descricao: 'A crença de que toda a Escritura é inspirada por Deus.', fundamentoScriptureiro: '2Tm 3:16-17, 2Pe 1:20-21' },
  { nome: 'Justificação pela Fé', categoria: 'Soteriologia', descricao: 'O ato pelo qual Deus declara o pecador justo com base na fé em Jesus Cristo.', fundamentoScriptureiro: 'Rm 3:28, Ef 2:8-9' },
  { nome: 'Encarnação', categoria: 'Cristologia', descricao: 'A doutrina de que Jesus Cristo é verdadeiramente Deus e verdadeiramente homem.', fundamentoScriptureiro: 'Jo 1:14, Fp 2:6-8' },
  { nome: 'Expiação Substitutiva', categoria: 'Cristologia', descricao: 'Cristo morreu em nosso lugar, pagando a penalidade do pecado.', fundamentoScriptureiro: 'Is 53:4-6, 2Co 5:21' },
  { nome: 'Ressurreição de Cristo', categoria: 'Cristologia', descricao: 'Jesus ressuscitou corporalmente dos mortos ao terceiro dia.', fundamentoScriptureiro: '1Co 15:3-8, Mt 28:1-10' },
  { nome: 'Batismo no Espírito Santo', categoria: 'Pneumatologia', descricao: 'A experiência do crente ser cheio do Espírito Santo.', fundamentoScriptureiro: 'At 2:4, At 10:44-46' },
  { nome: 'Dons Espirituais', categoria: 'Pneumatologia', descricao: 'Habilidades sobrenaturais dadas pelo Espírito Santo para edificação da igreja.', fundamentoScriptureiro: '1Co 12:1-11, Rm 12:6-8' },
  { nome: 'Fruto do Espírito', categoria: 'Pneumatologia', descricao: 'Caráter de Cristo desenvolvido no crente pelo Espírito Santo.', fundamentoScriptureiro: 'Gl 5:22-23' },
  { nome: 'Santificação', categoria: 'Soteriologia', descricao: 'O processo pelo qual Deus torna o crente santo e separado para Ele.', fundamentoScriptureiro: '1Ts 4:3, Hb 12:14' },
  { nome: 'Pecado Original', categoria: 'Hamartiologia', descricao: 'O estado de pecado herdado de Adão que afeta toda a humanidade.', fundamentoScriptureiro: 'Rm 5:12-19, Sl 51:5' },
  { nome: 'Graça Salvadora', categoria: 'Soteriologia', descricao: 'O favor imerecido de Deus que traz salvação.', fundamentoScriptureiro: 'Ef 2:8-9, Tt 2:11' },
  { nome: 'Eleição', categoria: 'Soteriologia', descricao: 'A escolha soberana de Deus de certos indivíduos para a salvação.', fundamentoScriptureiro: 'Ef 1:4-5, Rm 8:29-30' },
  { nome: 'Predestinação', categoria: 'Soteriologia', descricao: 'O decreto eterno de Deus pelo qual Ele determinou tudo que acontece.', fundamentoScriptureiro: 'Rm 8:29-30, Ef 1:5' },
  { nome: 'Livre Arbítrio', categoria: 'Antropologia', descricao: 'A capacidade do homem de fazer escolhas livremente.', fundamentoScriptureiro: 'Dt 30:19, Js 24:15' },
  { nome: 'Imagem de Deus', categoria: 'Antropologia', descricao: 'O homem foi criado à imagem e semelhança de Deus.', fundamentoScriptureiro: 'Gn 1:26-27' },
  { nome: 'Igreja Corpo de Cristo', categoria: 'Eclesiologia', descricao: 'A igreja é o corpo espiritual de Cristo na terra.', fundamentoScriptureiro: '1Co 12:12-27, Ef 1:22-23' },
  { nome: 'Sacramentos', categoria: 'Eclesiologia', descricao: 'Ordenanças instituídas por Cristo: Batismo e Ceia do Senhor.', fundamentoScriptureiro: 'Mt 28:19, 1Co 11:23-26' },
  { nome: 'Ceia do Senhor', categoria: 'Eclesiologia', descricao: 'Ordem de Cristo para celebrar sua morte até que Ele venha.', fundamentoScriptureiro: '1Co 11:23-26, Lc 22:19-20' },
  { nome: 'Batismo Cristão', categoria: 'Eclesiologia', descricao: 'Imersão em água simbolizando a morte para o pecado e ressurreição para nova vida.', fundamentoScriptureiro: 'Rm 6:3-4, Mt 28:19' },
  { nome: 'Segunda Vinda', categoria: 'Escatologia', descricao: 'A volta pessoal, visível e gloriosa de Jesus Cristo.', fundamentoScriptureiro: 'At 1:11, Ap 22:20' },
  { nome: 'Ressurreição dos Mortos', categoria: 'Escatologia', descricao: 'A ressurreição corporal dos justos e injustos no fim dos tempos.', fundamentoScriptureiro: 'Jo 5:28-29, 1Co 15:20-23' },
  { nome: 'Juízo Final', categoria: 'Escatologia', descricao: 'O julgamento final de Deus sobre toda a humanidade.', fundamentoScriptureiro: 'Ap 20:11-15, Mt 25:31-46' },
  { nome: 'Céu e Inferno', categoria: 'Escatologia', descricao: 'Estados eternos de bem-aventurança para os justos e punição para os ímpios.', fundamentoScriptureiro: 'Ap 21:1-8, Mt 25:46' },
  { nome: 'Milênio', categoria: 'Escatologia', descricao: 'O reinado de mil anos de Cristo na terra.', fundamentoScriptureiro: 'Ap 20:1-10' },
  { nome: 'Anjos', categoria: 'Angelologia', descricao: 'Seres espirituais criados por Deus para servi-Lo e ministrar aos crentes.', fundamentoScriptureiro: 'Hb 1:14, Sl 103:20' },
  { nome: 'Satanás', categoria: 'Demonologia', descricao: 'Anjo caído que se opõe a Deus e ao seu povo.', fundamentoScriptureiro: 'Is 14:12-15, Ez 28:12-17' },
  { nome: 'Demônios', categoria: 'Demonologia', descricao: 'Anjos caídos que seguem Satanás.', fundamentoScriptureiro: 'Mt 12:24-28, Ef 6:12' },
  { nome: 'Queda do Homem', categoria: 'Hamartiologia', descricao: 'Quando Adão e Eva pecaram, toda humanidade caiu no pecado.', fundamentoScriptureiro: 'Gn 3:1-24, Rm 5:12' },
  { nome: 'Aliança Abraâmica', categoria: 'Teontologia', descricao: 'Aliança de Deus com Abraão prometendo terra, descendência e bênção.', fundamentoScriptureiro: 'Gn 12:1-3, Gn 15:1-21' },
  { nome: 'Aliança Davídica', categoria: 'Teontologia', descricao: 'Promessa de Deus de que o trono de Davi seria estabelecido para sempre.', fundamentoScriptureiro: '2Sm 7:12-16' },
  { nome: 'Nova Aliança', categoria: 'Soteriologia', descricao: 'A aliança prometida através de Jeremias, cumprida em Cristo.', fundamentoScriptureiro: 'Jr 31:31-34, Hb 8:6-13' },
  { nome: 'Lei de Moisés', categoria: 'Teontologia', descricao: 'A Lei dada no Sinai, que revela o padrão de Deus e aponta para Cristo.', fundamentoScriptureiro: 'Ex 20:1-17, Gl 3:24-25' },
  { nome: 'Oração', categoria: 'Teontologia', descricao: 'Comunicação do crente com Deus através de louvor, confissão e petição.', fundamentoScriptureiro: 'Mt 6:5-13, 1Ts 5:17' },
  { nome: 'Adoração', categoria: 'Eclesiologia', descricao: 'A expressão de reverência e amor a Deus em espírito e verdade.', fundamentoScriptureiro: 'Jo 4:23-24, Sl 95:6-7' },
  { nome: 'Missões', categoria: 'Eclesiologia', descricao: 'O mandato de Cristo de pregar o evangelho a todas as criaturas.', fundamentoScriptureiro: 'Mt 28:18-20, At 1:8' },
  { nome: 'Casamento', categoria: 'Antropologia', descricao: 'União sagrada entre um homem e uma mulher estabelecida por Deus.', fundamentoScriptureiro: 'Gn 2:24, Ef 5:22-33' },
  { nome: 'Família', categoria: 'Antropologia', descricao: 'Unidade básica da sociedade estabelecida por Deus.', fundamentoScriptureiro: 'Sl 127:3-5, Ef 6:1-4' },
  { nome: 'Discipulado', categoria: 'Eclesiologia', descricao: 'Processo de seguir Cristo e ajudar outros a segui-Lo.', fundamentoScriptureiro: 'Mt 28:19, Mc 8:34' },
  { nome: 'Amor de Deus', categoria: 'Teontologia', descricao: 'Atributo divino que define a essência de Deus.', fundamentoScriptureiro: '1Jo 4:8-16, Jo 3:16' },
  { nome: 'Justiça de Deus', categoria: 'Teontologia', descricao: 'Atributo divino pelo qual Deus é justo e julga com retidão.', fundamentoScriptureiro: 'Sl 89:14, Rm 3:25-26' },
  { nome: 'Misericórdia de Deus', categoria: 'Teontologia', descricao: 'Compaixão de Deus que não trata o homem como merece.', fundamentoScriptureiro: 'Lm 3:22-23, Ef 2:4-5' },
  { nome: 'Arrependimento', categoria: 'Soteriologia', descricao: 'Mudança de mente e coração que resulta em novo estilo de vida.', fundamentoScriptureiro: 'Mc 1:15, At 3:19' },
  { nome: 'Conversão', categoria: 'Soteriologia', descricao: 'A resposta humana ao chamado de Deus para arrependimento e fé.', fundamentoScriptureiro: 'At 26:20, 1Ts 1:9' },
  { nome: 'Regeneração', categoria: 'Soteriologia', descricao: 'O novo nascimento espiritual operado pelo Espírito Santo.', fundamentoScriptureiro: 'Jo 3:3-8, Tt 3:5' },
  { nome: 'Perseverança dos Santos', categoria: 'Soteriologia', descricao: 'A doutrina de que os verdadeiros crentes perseverarão até o fim.', fundamentoScriptureiro: 'Fp 1:6, Hb 12:1-2' },
  { nome: 'Segurança Eterna', categoria: 'Soteriologia', descricao: 'A certeza de que o crente verdadeiro não pode perder sua salvação.', fundamentoScriptureiro: 'Jo 10:27-29, Rm 8:38-39' },
  { nome: 'Intercessão de Cristo', categoria: 'Cristologia', descricao: 'Jesus intercede pelos crentes à direita do Pai.', fundamentoScriptureiro: 'Rm 8:34, Hb 7:25' },
  { nome: 'Sumo Sacerdócio de Cristo', categoria: 'Cristologia', descricao: 'Jesus é o sumo sacerdote perfeito que entrou no Santo dos Santos celestial.', fundamentoScriptureiro: 'Hb 4:14-16, Hb 9:11-14' },
  { nome: 'Criação', categoria: 'Teontologia', descricao: 'Deus criou todas as coisas do nada em seis dias literais.', fundamentoScriptureiro: 'Gn 1:1-31, Ex 20:11' },
  { nome: 'Providência', categoria: 'Teontologia', descricao: 'A manutenção e governo contínuo de Deus sobre toda a criação.', fundamentoScriptureiro: 'Sl 104:1-35, Mt 6:26-30' },
  { nome: 'Dízimo', categoria: 'Eclesiologia', descricao: 'A devolução a Deus dos primeiros dez por cento da renda.', fundamentoScriptureiro: 'Ml 3:10, 2Co 9:7' },
  { nome: 'Mordomia Cristã', categoria: 'Antropologia', descricao: 'Administração fiel dos recursos que Deus confiou ao homem.', fundamentoScriptureiro: '1Co 4:2, 1Pe 4:10' },
  { nome: 'Pastor', categoria: 'Eclesiologia', descricao: 'Líder espiritual da igreja local responsável por apascentar o rebanho.', fundamentoScriptureiro: '1Tm 3:1-7, 1Pe 5:1-4' },
  { nome: 'Diácono', categoria: 'Eclesiologia', descricao: 'Servo da igreja local que cuida das necessidades práticas.', fundamentoScriptureiro: 'At 6:1-6, 1Tm 3:8-13' },
  { nome: 'Sábado', categoria: 'Eclesiologia', descricao: 'O dia de descanso e adoração estabelecido por Deus.', fundamentoScriptureiro: 'Gn 2:2-3, Ex 20:8-11' },
];

const crossReferences = [
  { origemRef: 'Gn 1:1', destinoRef: 'Jo 1:1', tipo: 'tematico', descricao: 'O princípio em Gênesis ecoa no prólogo de João sobre o Verbo', relevancia: 0.95 },
  { origemRef: 'Gn 1:1', destinoRef: 'Cl 1:16', tipo: 'tematico', descricao: 'Cristo como agente da criação', relevancia: 0.85 },
  { origemRef: 'Gn 1:3', destinoRef: '2Co 4:6', tipo: 'paralelo', descricao: 'Luz das trevas - criação e novo nascimento', relevancia: 0.75 },
  { origemRef: 'Gn 1:26', destinoRef: 'Sl 8:5', tipo: 'paralelo', descricao: 'Criação do homem à imagem de Deus', relevancia: 0.85 },
  { origemRef: 'Gn 2:7', destinoRef: '1Co 15:45', tipo: 'paralelo', descricao: 'Adão e Cristo - almas viventes e vivificantes', relevancia: 0.85 },
  { origemRef: 'Gn 2:24', destinoRef: 'Mt 19:5', tipo: 'paralelo', descricao: 'Jesus cita Gênesis sobre o casamento', relevancia: 0.95 },
  { origemRef: 'Gn 3:15', destinoRef: 'Rm 16:20', tipo: 'profecia', descricao: 'Proto-evangelho - descendente da mulher esmaga a cabeça da serpente', relevancia: 0.95 },
  { origemRef: 'Gn 12:3', destinoRef: 'Gl 3:8', tipo: 'cumprimento', descricao: 'Todas as nações abençoadas em Abraão - cumprido em Cristo', relevancia: 0.90 },
  { origemRef: 'Gn 15:6', destinoRef: 'Rm 4:3', tipo: 'paralelo', descricao: 'Abraão creu e foi justificado - justificação pela fé', relevancia: 0.95 },
  { origemRef: 'Gn 22:8', destinoRef: 'Jo 1:29', tipo: 'profecia', descricao: 'Deus proverá o Cordeiro - tipologia de Cristo', relevancia: 0.90 },
  { origemRef: 'Ex 3:14', destinoRef: 'Jo 8:58', tipo: 'paralelo', descricao: 'EU SOU - o nome divino aplicado por Jesus', relevancia: 0.90 },
  { origemRef: 'Ex 12:5', destinoRef: '1Pe 1:19', tipo: 'profecia', descricao: 'Cordeiro sem defeito - tipo de Cristo', relevancia: 0.85 },
  { origemRef: 'Ex 12:13', destinoRef: '1Co 5:7', tipo: 'cumprimento', descricao: 'Cristo nossa Páscoa foi sacrificado', relevancia: 0.85 },
  { origemRef: 'Lv 19:18', destinoRef: 'Mt 22:39', tipo: 'paralelo', descricao: 'Amar ao próximo como a si mesmo', relevancia: 0.90 },
  { origemRef: 'Nm 21:8-9', destinoRef: 'Jo 3:14', tipo: 'profecia', descricao: 'Serpente de bronze elevada - tipo de Cristo crucificado', relevancia: 0.90 },
  { origemRef: 'Dt 6:4', destinoRef: 'Mc 12:29', tipo: 'paralelo', descricao: 'Ouve Israel, o SENHOR nosso Deus é o único SENHOR', relevancia: 0.85 },
  { origemRef: 'Dt 18:15', destinoRef: 'At 3:22', tipo: 'cumprimento', descricao: 'Profeta como Moisés - cumprido em Cristo', relevancia: 0.85 },
  { origemRef: 'Dt 21:23', destinoRef: 'Gl 3:13', tipo: 'cumprimento', descricao: 'Maldito o que for pendurado no madeiro', relevancia: 0.85 },
  { origemRef: 'Sl 2:2', destinoRef: 'At 4:26', tipo: 'cumprimento', descricao: 'Os reis se levantam contra o Ungido', relevancia: 0.80 },
  { origemRef: 'Sl 2:7', destinoRef: 'Hb 1:5', tipo: 'cumprimento', descricao: 'Tu és meu Filho, hoje te gerei', relevancia: 0.85 },
  { origemRef: 'Sl 16:10', destinoRef: 'At 13:35', tipo: 'cumprimento', descricao: 'Não permitirás que teu Santo veja corrupção', relevancia: 0.90 },
  { origemRef: 'Sl 22:1', destinoRef: 'Mt 27:46', tipo: 'profecia', descricao: 'Deus meu, Deus meu, por que me desamparaste', relevancia: 0.95 },
  { origemRef: 'Sl 22:16', destinoRef: 'Jo 20:25', tipo: 'profecia', descricao: 'Transpassaram minhas mãos e meus pés', relevancia: 0.90 },
  { origemRef: 'Sl 22:18', destinoRef: 'Mt 27:35', tipo: 'profecia', descricao: 'Repartiram entre si minhas vestes', relevancia: 0.90 },
  { origemRef: 'Sl 23:1', destinoRef: 'Jo 10:11', tipo: 'paralelo', descricao: 'O SENHOR é meu pastor - Jesus o bom pastor', relevancia: 0.90 },
  { origemRef: 'Sl 110:1', destinoRef: 'At 2:34', tipo: 'profecia', descricao: 'Disse o Senhor ao meu Senhor', relevancia: 0.90 },
  { origemRef: 'Sl 110:4', destinoRef: 'Hb 7:17', tipo: 'profecia', descricao: 'Tu és sacerdote eternamente segundo a ordem de Melquisedeque', relevancia: 0.90 },
  { origemRef: 'Is 6:1-3', destinoRef: 'Jo 12:41', tipo: 'paralelo', descricao: 'Isaías viu a glória de Cristo', relevancia: 0.80 },
  { origemRef: 'Is 7:14', destinoRef: 'Mt 1:23', tipo: 'cumprimento', descricao: 'A virgem conceberá - cumprido em Jesus', relevancia: 0.95 },
  { origemRef: 'Is 9:6', destinoRef: 'Lc 2:11', tipo: 'cumprimento', descricao: 'Um menino nos nasceu', relevancia: 0.95 },
  { origemRef: 'Is 40:3', destinoRef: 'Mc 1:3', tipo: 'cumprimento', descricao: 'Voz do que clama no deserto - João Batista', relevancia: 0.90 },
  { origemRef: 'Is 42:1', destinoRef: 'Mt 12:18', tipo: 'cumprimento', descricao: 'Eis aqui meu Servo - aplicado a Jesus', relevancia: 0.85 },
  { origemRef: 'Is 53:1', destinoRef: 'Jo 12:38', tipo: 'cumprimento', descricao: 'Quem creu em nossa pregação', relevancia: 0.85 },
  { origemRef: 'Is 53:4-5', destinoRef: '1Pe 2:24', tipo: 'cumprimento', descricao: 'Ele tomou nossas enfermidades', relevancia: 0.95 },
  { origemRef: 'Is 53:6', destinoRef: 'Rm 3:23', tipo: 'paralelo', descricao: 'Todos andávamos desgarrados como ovelhas', relevancia: 0.85 },
  { origemRef: 'Is 53:7', destinoRef: 'At 8:32', tipo: 'cumprimento', descricao: 'Como cordeiro mudo perante seus tosquiadores', relevancia: 0.90 },
  { origemRef: 'Is 53:12', destinoRef: 'Lc 22:37', tipo: 'cumprimento', descricao: 'Intercedeu pelos transgressores', relevancia: 0.85 },
  { origemRef: 'Is 61:1', destinoRef: 'Lc 4:18', tipo: 'cumprimento', descricao: 'Jesus lê Isaías na sinagoga e aplica a Si mesmo', relevancia: 0.95 },
  { origemRef: 'Jr 31:31-34', destinoRef: 'Hb 8:8-12', tipo: 'profecia', descricao: 'Nova aliança prometida e cumprida em Cristo', relevancia: 0.95 },
  { origemRef: 'Ez 36:26', destinoRef: '2Co 5:17', tipo: 'paralelo', descricao: 'Coração de pedra por coração de carne - nova criação', relevancia: 0.80 },
  { origemRef: 'Dn 7:13', destinoRef: 'Mt 26:64', tipo: 'profecia', descricao: 'Filho do Homem vindo nas nuvens', relevancia: 0.90 },
  { origemRef: 'Dn 9:24-27', destinoRef: 'Mt 24:15', tipo: 'profecia', descricao: 'Setenta semanas determinadas sobre o teu povo', relevancia: 0.85 },
  { origemRef: 'Os 11:1', destinoRef: 'Mt 2:15', tipo: 'cumprimento', descricao: 'Do Egito chamei meu filho', relevancia: 0.85 },
  { origemRef: 'Jl 2:28', destinoRef: 'At 2:17', tipo: 'cumprimento', descricao: 'Derramarei do meu Espírito sobre toda carne', relevancia: 0.95 },
  { origemRef: 'Mq 5:2', destinoRef: 'Mt 2:6', tipo: 'cumprimento', descricao: 'Belém profetizada como local de nascimento do Messias', relevancia: 0.95 },
  { origemRef: 'Hc 2:4', destinoRef: 'Rm 1:17', tipo: 'paralelo', descricao: 'O justo viverá pela fé', relevancia: 0.95 },
  { origemRef: 'Ml 3:1', destinoRef: 'Mt 11:10', tipo: 'cumprimento', descricao: 'Mensageiro prepara o caminho - João Batista', relevancia: 0.90 },
  { origemRef: 'Ml 4:5', destinoRef: 'Mt 17:11', tipo: 'cumprimento', descricao: 'Elias virá primeiro - cumprido em João Batista', relevancia: 0.85 },
  { origemRef: 'Mt 3:2', destinoRef: 'Mc 1:15', tipo: 'paralelo', descricao: 'Arrependei-vos porque é chegado o Reino', relevancia: 0.90 },
  { origemRef: 'Mt 3:11', destinoRef: 'At 1:5', tipo: 'paralelo', descricao: 'Batismo com o Espírito Santo', relevancia: 0.85 },
  { origemRef: 'Mt 4:4', destinoRef: 'Dt 8:3', tipo: 'paralelo', descricao: 'Nem só de pão viverá o homem', relevancia: 0.85 },
  { origemRef: 'Mt 5:44', destinoRef: 'Rm 12:14', tipo: 'paralelo', descricao: 'Amai vossos inimigos', relevancia: 0.85 },
  { origemRef: 'Mt 16:16', destinoRef: 'Jo 6:69', tipo: 'paralelo', descricao: 'Tu és o Cristo, o Filho do Deus vivo', relevancia: 0.90 },
  { origemRef: 'Mt 16:18', destinoRef: 'Ef 2:20', tipo: 'paralelo', descricao: 'Edificarei minha igreja sobre esta pedra', relevancia: 0.85 },
  { origemRef: 'Mt 22:37', destinoRef: 'Dt 6:5', tipo: 'paralelo', descricao: 'Amarás o Senhor teu Deus de todo o coração', relevancia: 0.90 },
  { origemRef: 'Mt 26:26-28', destinoRef: 'Lc 22:19-20', tipo: 'paralelo', descricao: 'Instituição da Ceia do Senhor', relevancia: 0.95 },
  { origemRef: 'Mt 27:51', destinoRef: 'Hb 10:19-20', tipo: 'paralelo', descricao: 'Véu do templo rasgado - acesso direto a Deus', relevancia: 0.85 },
  { origemRef: 'Mt 28:18', destinoRef: 'Fp 2:9-11', tipo: 'paralelo', descricao: 'Toda autoridade dada a Jesus', relevancia: 0.85 },
  { origemRef: 'Mt 28:19', destinoRef: 'Mc 16:15', tipo: 'paralelo', descricao: 'Ide por todo o mundo e pregai o evangelho', relevancia: 0.90 },
  { origemRef: 'Lc 1:31', destinoRef: 'Is 7:14', tipo: 'cumprimento', descricao: 'Anunciação da virgem', relevancia: 0.85 },
  { origemRef: 'Lc 15:11-32', destinoRef: 'Rm 5:8', tipo: 'paralelo', descricao: 'Parábola do filho pródigo - amor de Deus', relevancia: 0.80 },
  { origemRef: 'Jo 1:1', destinoRef: '1Jo 1:1', tipo: 'paralelo', descricao: 'Verbo da vida desde o princípio', relevancia: 0.85 },
  { origemRef: 'Jo 1:12', destinoRef: 'Gl 3:26', tipo: 'paralelo', descricao: 'Poder de ser filhos de Deus', relevancia: 0.85 },
  { origemRef: 'Jo 1:29', destinoRef: '1Pe 1:18-19', tipo: 'paralelo', descricao: 'Cordeiro de Deus que tira o pecado do mundo', relevancia: 0.90 },
  { origemRef: 'Jo 3:3', destinoRef: '1Pe 1:23', tipo: 'paralelo', descricao: 'Nascer de novo - regeneração pela Palavra', relevancia: 0.85 },
  { origemRef: 'Jo 3:16', destinoRef: 'Rm 5:8', tipo: 'paralelo', descricao: 'Deus amou o mundo de tal maneira', relevancia: 0.95 },
  { origemRef: 'Jo 10:9', destinoRef: 'Jo 14:6', tipo: 'paralelo', descricao: 'Porta e Caminho para o Pai', relevancia: 0.80 },
  { origemRef: 'Jo 10:27-28', destinoRef: 'Rm 8:38-39', tipo: 'paralelo', descricao: 'Segurança eterna nas mãos do Pastor', relevancia: 0.85 },
  { origemRef: 'Jo 14:6', destinoRef: 'At 4:12', tipo: 'paralelo', descricao: 'Único caminho para o Pai', relevancia: 0.90 },
  { origemRef: 'Jo 14:16', destinoRef: 'Jo 16:7', tipo: 'paralelo', descricao: 'Promessa do Espírito Santo Consolador', relevancia: 0.85 },
  { origemRef: 'Jo 15:5', destinoRef: 'Gl 2:20', tipo: 'paralelo', descricao: 'Cristo vive em mim - união com Cristo', relevancia: 0.80 },
  { origemRef: 'Jo 20:22', destinoRef: 'At 2:4', tipo: 'paralelo', descricao: 'Recebei o Espírito Santo', relevancia: 0.85 },
  { origemRef: 'At 1:8', destinoRef: 'Mt 28:19', tipo: 'paralelo', descricao: 'Sereis minhas testemunhas', relevancia: 0.90 },
  { origemRef: 'At 2:38', destinoRef: 'Mc 16:16', tipo: 'paralelo', descricao: 'Arrependei-vos e sede batizados', relevancia: 0.85 },
  { origemRef: 'At 4:12', destinoRef: '1Tm 2:5', tipo: 'paralelo', descricao: 'Único Mediador entre Deus e os homens', relevancia: 0.85 },
  { origemRef: 'At 16:31', destinoRef: 'Rm 10:9', tipo: 'paralelo', descricao: 'Crê no Senhor Jesus e serás salvo', relevancia: 0.85 },
  { origemRef: 'Rm 1:16', destinoRef: '1Co 1:18', tipo: 'paralelo', descricao: 'Poder de Deus para salvação', relevancia: 0.85 },
  { origemRef: 'Rm 3:10', destinoRef: 'Sl 14:1', tipo: 'paralelo', descricao: 'Não há justo, nem um sequer', relevancia: 0.80 },
  { origemRef: 'Rm 3:23', destinoRef: 'Is 53:6', tipo: 'paralelo', descricao: 'Todos pecaram', relevancia: 0.85 },
  { origemRef: 'Rm 4:25', destinoRef: 'Is 53:5', tipo: 'paralelo', descricao: 'Entregue por nossas transgressões', relevancia: 0.85 },
  { origemRef: 'Rm 5:1', destinoRef: 'Ef 2:14', tipo: 'paralelo', descricao: 'Paz com Deus pela fé', relevancia: 0.85 },
  { origemRef: 'Rm 5:8', destinoRef: '1Jo 4:10', tipo: 'paralelo', descricao: 'Deus prova seu amor para conosco', relevancia: 0.90 },
  { origemRef: 'Rm 5:12', destinoRef: '1Co 15:21', tipo: 'paralelo', descricao: 'Por um homem entrou o pecado', relevancia: 0.85 },
  { origemRef: 'Rm 6:23', destinoRef: 'Ef 2:8-9', tipo: 'paralelo', descricao: 'Salário do pecado é morte, dom gratuito é vida', relevancia: 0.90 },
  { origemRef: 'Rm 8:1', destinoRef: 'Jo 3:18', tipo: 'paralelo', descricao: 'Nenhuma condenação para os que estão em Cristo', relevancia: 0.85 },
  { origemRef: 'Rm 8:28', destinoRef: 'Ef 1:11', tipo: 'paralelo', descricao: 'Tudo coopera para o bem', relevancia: 0.85 },
  { origemRef: 'Rm 8:32', destinoRef: 'Jo 3:16', tipo: 'paralelo', descricao: 'Não poupou seu próprio Filho', relevancia: 0.85 },
  { origemRef: 'Rm 10:9', destinoRef: 'Fp 2:11', tipo: 'paralelo', descricao: 'Confessar que Jesus é o Senhor', relevancia: 0.85 },
  { origemRef: 'Rm 12:1', destinoRef: '1Pe 2:5', tipo: 'paralelo', descricao: 'Sacrifício vivo', relevancia: 0.75 },
  { origemRef: '1Co 1:30', destinoRef: '2Co 5:21', tipo: 'paralelo', descricao: 'Cristo feito sabedoria, justiça, santificação, redenção', relevancia: 0.85 },
  { origemRef: '1Co 5:7', destinoRef: 'Ex 12:3-13', tipo: 'paralelo', descricao: 'Cristo nossa Páscoa', relevancia: 0.85 },
  { origemRef: '1Co 11:23-26', destinoRef: 'Mt 26:26-28', tipo: 'paralelo', descricao: 'Instituição eucarística', relevancia: 0.90 },
  { origemRef: '1Co 13:12', destinoRef: '1Jo 3:2', tipo: 'paralelo', descricao: 'Veremos face a face', relevancia: 0.85 },
  { origemRef: '1Co 15:14', destinoRef: 'Rm 4:25', tipo: 'paralelo', descricao: 'Se Cristo não ressuscitou é vã nossa fé', relevancia: 0.90 },
  { origemRef: '2Co 5:17', destinoRef: 'Gl 6:15', tipo: 'paralelo', descricao: 'Nova criatura em Cristo', relevancia: 0.85 },
  { origemRef: '2Co 5:18-19', destinoRef: 'Rm 5:10', tipo: 'paralelo', descricao: 'Ministério da reconciliação', relevancia: 0.80 },
  { origemRef: 'Gl 2:16', destinoRef: 'Rm 3:28', tipo: 'paralelo', descricao: 'Justificação pela fé', relevancia: 0.90 },
  { origemRef: 'Gl 3:13', destinoRef: 'Dt 21:23', tipo: 'cumprimento', descricao: 'Cristo nos redimiu da maldição da lei', relevancia: 0.85 },
  { origemRef: 'Gl 3:28', destinoRef: 'Cl 3:11', tipo: 'paralelo', descricao: 'Unidade em Cristo', relevancia: 0.85 },
  { origemRef: 'Gl 5:1', destinoRef: 'Jo 8:32', tipo: 'paralelo', descricao: 'Liberdade cristã', relevancia: 0.75 },
  { origemRef: 'Gl 5:16', destinoRef: 'Rm 8:5', tipo: 'paralelo', descricao: 'Andar no Espírito', relevancia: 0.80 },
  { origemRef: 'Gl 5:22-23', destinoRef: 'Ef 5:9', tipo: 'paralelo', descricao: 'Fruto do Espírito', relevancia: 0.85 },
  { origemRef: 'Ef 1:4', destinoRef: '1Pe 1:20', tipo: 'paralelo', descricao: 'Eleitos em Cristo antes da fundação do mundo', relevancia: 0.80 },
  { origemRef: 'Ef 1:7', destinoRef: 'Cl 1:14', tipo: 'paralelo', descricao: 'Redenção pelo sangue', relevancia: 0.85 },
  { origemRef: 'Ef 2:8-9', destinoRef: '2Tm 1:9', tipo: 'paralelo', descricao: 'Salvos pela graça mediante a fé', relevancia: 0.95 },
  { origemRef: 'Ef 4:11', destinoRef: '1Co 12:28', tipo: 'paralelo', descricao: 'Dons ministeriais', relevancia: 0.85 },
  { origemRef: 'Ef 5:25', destinoRef: 'Ap 19:7', tipo: 'paralelo', descricao: 'Cristo amou a igreja', relevancia: 0.80 },
  { origemRef: 'Ef 6:10-18', destinoRef: '1Ts 5:8', tipo: 'paralelo', descricao: 'Armadura de Deus', relevancia: 0.80 },
  { origemRef: 'Fp 2:5-8', destinoRef: '2Co 8:9', tipo: 'paralelo', descricao: 'Mente de Cristo', relevancia: 0.85 },
  { origemRef: 'Fp 3:20', destinoRef: 'Ef 2:19', tipo: 'paralelo', descricao: 'Cidadania nos céus', relevancia: 0.75 },
  { origemRef: 'Fp 4:4', destinoRef: '1Ts 5:16', tipo: 'paralelo', descricao: 'Alegrai-vos sempre no Senhor', relevancia: 0.80 },
  { origemRef: 'Fp 4:6-7', destinoRef: '1Pe 5:7', tipo: 'paralelo', descricao: 'Ansiedade substituída por oração', relevancia: 0.80 },
  { origemRef: 'Cl 1:15', destinoRef: '2Co 4:4', tipo: 'paralelo', descricao: 'Cristo imagem do Deus invisível', relevancia: 0.85 },
  { origemRef: 'Cl 1:20', destinoRef: 'Ef 1:10', tipo: 'paralelo', descricao: 'Reconciliar todas as coisas por Cristo', relevancia: 0.75 },
  { origemRef: '1Tm 2:5', destinoRef: 'Hb 9:15', tipo: 'paralelo', descricao: 'Único Mediador', relevancia: 0.80 },
  { origemRef: '2Tm 3:16', destinoRef: '2Pe 1:21', tipo: 'paralelo', descricao: 'Inspiração das Escrituras', relevancia: 0.85 },
  { origemRef: 'Hb 1:1-2', destinoRef: 'Jo 1:1', tipo: 'paralelo', descricao: 'Deus falou pelos profetas, agora pelo Filho', relevancia: 0.80 },
  { origemRef: 'Hb 1:3', destinoRef: 'Cl 1:15', tipo: 'paralelo', descricao: 'Resplendor da glória de Deus', relevancia: 0.85 },
  { origemRef: 'Hb 4:12', destinoRef: 'Ef 6:17', tipo: 'paralelo', descricao: 'Palavra de Deus viva e eficaz', relevancia: 0.85 },
  { origemRef: 'Hb 4:15', destinoRef: 'Is 53:3', tipo: 'paralelo', descricao: 'Sumo sacerdote compadecido', relevancia: 0.80 },
  { origemRef: 'Hb 9:22', destinoRef: 'Lv 17:11', tipo: 'paralelo', descricao: 'Sem derramamento de sangue não há remissão', relevancia: 0.80 },
  { origemRef: 'Hb 11:1', destinoRef: 'Rm 8:24', tipo: 'paralelo', descricao: 'Fé é o firme fundamento', relevancia: 0.85 },
  { origemRef: 'Hb 11:6', destinoRef: 'Rm 14:23', tipo: 'paralelo', descricao: 'Sem fé é impossível agradar a Deus', relevancia: 0.85 },
  { origemRef: 'Hb 12:1-2', destinoRef: 'Fp 3:13-14', tipo: 'paralelo', descricao: 'Corrida da fé', relevancia: 0.80 },
  { origemRef: 'Hb 13:8', destinoRef: 'Ap 1:8', tipo: 'paralelo', descricao: 'Cristo ontem, hoje e para sempre', relevancia: 0.85 },
  { origemRef: 'Tg 1:2-4', destinoRef: 'Rm 5:3-4', tipo: 'paralelo', descricao: 'Alegria nas tribulações', relevancia: 0.75 },
  { origemRef: 'Tg 2:17', destinoRef: 'Ef 2:10', tipo: 'paralelo', descricao: 'Fé sem obras é morta', relevancia: 0.80 },
  { origemRef: '1Pe 2:9', destinoRef: 'Ap 1:6', tipo: 'paralelo', descricao: 'Sacerdócio real, nação santa', relevancia: 0.80 },
  { origemRef: '1Jo 1:7', destinoRef: 'Hb 9:14', tipo: 'paralelo', descricao: 'Sangue de Jesus nos purifica', relevancia: 0.85 },
  { origemRef: '1Jo 4:8', destinoRef: 'Jo 3:16', tipo: 'paralelo', descricao: 'Deus é amor', relevancia: 0.90 },
  { origemRef: 'Ap 1:8', destinoRef: 'Is 44:6', tipo: 'paralelo', descricao: 'Alfa e Ômega - o primeiro e o último', relevancia: 0.85 },
  { origemRef: 'Ap 21:1', destinoRef: 'Is 65:17', tipo: 'cumprimento', descricao: 'Novos céus e nova terra', relevancia: 0.85 },
  { origemRef: 'Ap 21:4', destinoRef: 'Is 25:8', tipo: 'cumprimento', descricao: 'Deus enxugará toda lágrima', relevancia: 0.85 },
  { origemRef: 'Ap 22:20', destinoRef: '1Co 16:22', tipo: 'paralelo', descricao: 'Vem, Senhor Jesus', relevancia: 0.80 },
];

const commentaries = [
  { titulo: 'A Criação dos Céus e da Terra', autor: 'Matthew Henry', tradicao: 'reformada', livro: 'Gênesis', capitulo: 1, versiculo: 1, conteudo: 'As primeiras palavras da Escritura são de conforto e segurança. Deus, em Sua infinita sabedoria e bondade, criou todas as coisas do nada. O começo da Bíblia nos leva ao começo de todas as coisas, apontando para Aquele que não tem princípio. A criação nos ensina sobre o poder, a sabedoria e a bondade de Deus.', contextoHistorico: 'Moisés escreve o relato da criação para o povo de Israel recém-liberto do Egito.', aplicacao: 'Devemos reconhecer Deus como Criador e Senhor de nossas vidas.' },
  { titulo: 'A Criação do Homem', autor: 'Matthew Henry', tradicao: 'reformada', livro: 'Gênesis', capitulo: 1, versiculo: 26, conteudo: 'O homem foi criado à imagem e semelhança de Deus, uma dignidade que nenhuma outra criatura recebeu. Fomos feitos para refletir a glória de Deus, para ter domínio sobre a criação e para ter comunhão com o Criador. A imagem de Deus no homem consiste em santidade e retidão.', contextoHistorico: 'O clímax da narrativa da criação demonstra o cuidado especial de Deus ao formar o homem.', aplicacao: 'Nosso valor deriva de sermos criados à imagem de Deus, o que nos confere dignidade e responsabilidade.' },
  { titulo: 'A Queda do Homem', autor: 'Matthew Henry', tradicao: 'reformada', livro: 'Gênesis', capitulo: 3, versiculo: 6, conteudo: 'A tentação de Eva pela serpente e sua queda, seguida por Adão, trouxe o pecado e a morte ao mundo. Vemos aqui a sutileza de Satanás ao distorcer as palavras de Deus e semear dúvida. O homem, em sua soberba, desobedeceu ao mandamento claro de Deus e colheu as amargas consequências.', contextoHistorico: 'O primeiro ato de desobediência humana no Jardim do Éden.', aplicacao: 'Devemos nos guardar das tentações de Satanás e permanecer firmes na Palavra de Deus.' },
  { titulo: 'A Aliança com Abraão', autor: 'Matthew Henry', tradicao: 'reformada', livro: 'Gênesis', capitulo: 12, versiculo: 1, conteudo: 'A chamada de Abrão é um marco na história da redenção. Deus escolhe um homem para ser o pai de uma nação através da qual todas as famílias da terra seriam abençoadas. A fé de Abraão respondeu ao chamado divino, deixando sua terra e parentes para seguir a direção de Deus.', contextoHistorico: 'Deus separa um povo para Si, começando com Abraão, em meio a um mundo idólatra.', aplicacao: 'A fé genuína se manifesta em obediência ao chamado de Deus, mesmo quando não vemos o caminho completo.' },
  { titulo: 'O Êxodo do Egito', autor: 'Matthew Henry', tradicao: 'reformada', livro: 'Êxodo', capitulo: 12, versiculo: 31, conteudo: 'A libertação de Israel do Egito pela poderosa mão de Deus é um tipo da nossa redenção em Cristo. O sangue do cordeiro pascal nas portas protegeu os primogênitos de Israel, apontando para o Cordeiro de Deus que tira o pecado do mundo. Faraó finalmente deixou o povo ir, mas não sem antes experimentar as poderosas pragas do Senhor.', contextoHistorico: 'Deus liberta Israel da escravidão egípcia após 430 anos.', aplicacao: 'Assim como Deus libertou Israel, Ele nos liberta da escravidão do pecado pelo sangue de Cristo.' },
  { titulo: 'A Entrega da Lei', autor: 'Matthew Henry', tradicao: 'reformada', livro: 'Êxodo', capitulo: 20, versiculo: 1, conteudo: 'Deus dá a Lei no Monte Sinai com grande majestade e poder. Os Dez Mandamentos resumem os deveres do homem para com Deus e para com o próximo. A Lei revela o padrão santo de Deus e nos convence do pecado, levando-nos a Cristo.', contextoHistorico: 'Israel acampa ao pé do Sinai, e Deus estabelece Sua aliança com o povo.', aplicacao: 'A Lei nos mostra nossa necessidade da graça de Deus em Cristo.' },
  { titulo: 'Davi e Golias', autor: 'Matthew Henry', tradicao: 'reformada', livro: '1 Samuel', capitulo: 17, versiculo: 45, conteudo: 'Davi, com sua fé inabalável em Deus, enfrenta o gigante filisteu Golias. Não confia em armas humanas, mas no nome do Senhor dos Exércitos. Esta vitória prefigura a vitória de Cristo sobre Satanás e nos ensina que Deus escolhe os fracos para confundir os fortes.', contextoHistorico: 'Os filisteus desafiam Israel, e o jovem Davi se apresenta como campeão de Israel.', aplicacao: 'Quando enfrentamos gigantes, devemos confiar no poder de Deus, não em nossa própria força.' },
  { titulo: 'O Bom Pastor', autor: 'Matthew Henry', tradicao: 'reformada', livro: 'Salmos', capitulo: 23, versiculo: 1, conteudo: 'O SENHOR é o meu Pastor; nada me faltará. O salmo mais amado da Escritura nos apresenta a provisão, proteção e presença constante de Deus. Como ovelhas de Seu pasto, temos tudo o que necessitamos para a vida e piedade. Mesmo no vale da sombra da morte, não tememos mal algum, porque Ele está conosco.', contextoHistorico: 'Davi reflete sobre sua experiência como pastor e a aplica ao cuidado de Deus por Seu povo.', aplicacao: 'Podemos descansar na certeza de que Deus supre todas as nossas necessidades.' },
  { titulo: 'O Messias Sofredor', autor: 'Matthew Henry', tradicao: 'reformada', livro: 'Isaías', capitulo: 53, versiculo: 4, conteudo: 'O profeta Isaías descreve o sofrimento vicário do Messias com detalhes impressionantes. Ele tomou sobre Si as nossas enfermidades e levou as nossas dores. Foi traspassado pelas nossas transgressões e moído pelas nossas iniquidades. O castigo que nos traz a paz estava sobre Ele, e pelas Suas feridas fomos sarados.', contextoHistorico: 'Profecia escrita aproximadamente 700 anos antes do nascimento de Cristo.', aplicacao: 'A salvação foi comprada pelo sofrimento vicário de Cristo em nosso lugar.' },
  { titulo: 'O Sermão do Monte', autor: 'Matthew Henry', tradicao: 'reformada', livro: 'Mateus', capitulo: 5, versiculo: 1, conteudo: 'Jesus ensina as bem-aventuranças, descrevendo o caráter dos cidadãos do Reino dos Céus. Os pobres de espírito, os que choram, os mansos, os que têm fome e sede de justiça são declarados bem-aventurados. Este sermão estabelece a ética do Reino, que supera a justiça dos escribas e fariseus.', contextoHistorico: 'Jesus ensina a multidão no monte, revelando a verdadeira interpretação da Lei.', aplicacao: 'O verdadeiro discípulo de Cristo vive segundo os valores do Reino, que contrastam com os valores do mundo.' },
  { titulo: 'A Conversão de Paulo', autor: 'Matthew Henry', tradicao: 'reformada', livro: 'Atos', capitulo: 9, versiculo: 3, conteudo: 'Saulo de Tarso, perseguidor da igreja, encontra o Cristo ressurreto no caminho de Damasco. Uma luz do céu o rodeia, e ele cai por terra, ouvindo a voz do Senhor. Esta conversão dramática demonstra o poder transformador da graça de Deus e o chamado de um apóstolo para os gentios.', contextoHistorico: 'A perseguição dos cristãos por Saulo é interrompida por um encontro direto com Cristo.', aplicacao: 'Não há pecador tão endurecido que a graça de Deus não possa alcançar e transformar.' },
  { titulo: 'O Amor Ágape', autor: 'Matthew Henry', tradicao: 'reformada', livro: '1 Coríntios', capitulo: 13, versiculo: 4, conteudo: 'Paulo descreve o amor como o caminho mais excelente, superior aos dons espirituais. O amor é paciente, benigno, não arde em ciúmes, não se ufana, não se ensoberbece. O amor jamais acaba; profecias desaparecerão, línguas cessarão, conhecimento passará. A fé, a esperança e o amor permanecem, mas o maior destes é o amor.', contextoHistorico: 'Paulo corrige a igreja de Corinto que supervalorizava os dons espirituais.', aplicacao: 'O amor deve ser a marca distintiva de todo cristão e de toda igreja.' },
  { titulo: 'A Graça Salvadora', autor: 'Matthew Henry', tradicao: 'reformada', livro: 'Efésios', capitulo: 2, versiculo: 8, conteudo: 'Pela graça sois salvos, mediante a fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie. Paulo enfatiza que a salvação é inteiramente obra de Deus, do começo ao fim. A fé é o canal através do qual recebemos a graça, mas até a fé é dom de Deus.', contextoHistorico: 'Paulo escreve aos efésios explicando a obra da salvação em Cristo.', aplicacao: 'Nossa salvação é completamente pela graça, eliminando todo orgulho humano e dando toda glória a Deus.' },
  { titulo: 'A Ressurreição de Cristo', autor: 'Matthew Henry', tradicao: 'reformada', livro: 'Mateus', capitulo: 28, versiculo: 5, conteudo: 'O anjo do Senhor remove a pedra do sepulcro e anuncia às mulheres que Jesus ressuscitou. O túmulo vazio é a prova incontestável da vitória de Cristo sobre a morte. A ressurreição é o selo divino que confirma a identidade de Cristo como Filho de Deus e a eficácia de Sua obra expiatória.', contextoHistorico: 'No terceiro dia após a crucificação, as mulheres visitam o sepulcro e encontram-no vazio.', aplicacao: 'A ressurreição de Cristo é a garantia da nossa própria ressurreição e da vitória final sobre a morte.' },
  { titulo: 'Pentecostes', autor: 'Matthew Henry', tradicao: 'reformada', livro: 'Atos', capitulo: 2, versiculo: 1, conteudo: 'No dia de Pentecostes, o Espírito Santo desce sobre os apóstolos como línguas de fogo, capacitando-os para testemunhar em várias línguas. Pedro prega com ousadia, e cerca de três mil almas são convertidas. A igreja cristã nasce com poder, marcada pela comunhão, ensino, oração e sinais.', contextoHistorico: 'O cumprimento da promessa de Jesus sobre o envio do Espírito Santo.', aplicacao: 'O mesmo Espírito que capacitou a igreja primitiva nos capacita hoje para o testemunho de Cristo.' },
  { titulo: 'A Nova Jerusalém', autor: 'Matthew Henry', tradicao: 'reformada', livro: 'Apocalipse', capitulo: 21, versiculo: 1, conteudo: 'João vê novos céus e nova terra, e a cidade santa, a Nova Jerusalém, descendo do céu da parte de Deus. Deus habitará com os homens, e não haverá mais morte, nem pranto, nem dor. Tudo será feito novo. A promessa final de Deus é a restauração completa de toda a criação.', contextoHistorico: 'A visão final de João na ilha de Patmos revela o destino glorioso do povo de Deus.', aplicacao: 'Nossa esperança está na consumação do Reino de Deus, quando habitaremos eternamente com Ele.' },
  { titulo: 'O Novo Nascimento', autor: 'Matthew Henry', tradicao: 'reformada', livro: 'João', capitulo: 3, versiculo: 3, conteudo: 'Jesus ensina Nicodemos sobre a necessidade do novo nascimento. O que é nascido da carne é carne, mas o que é nascido do Espírito é espírito. A regeneração é obra soberana do Espírito Santo, que sopra onde quer. Nicodemos, mestre em Israel, precisava aprender esta verdade fundamental.', contextoHistorico: 'Nicodemos, fariseu e membro do Sinédrio, visita Jesus à noite.', aplicacao: 'Para ver o Reino de Deus é necessário nascer de novo pelo poder do Espírito Santo.' },
  { titulo: 'A Ceia do Senhor', autor: 'Matthew Henry', tradicao: 'reformada', livro: '1 Coríntios', capitulo: 11, versiculo: 23, conteudo: 'Paulo transmite a tradição da Ceia do Senhor, recebida diretamente do Senhor. Na noite em que foi traído, Jesus tomou o pão e o cálice, instituindo este sacramento em memória de Sua morte. Participar da Ceia é proclamar a morte do Senhor até que Ele venha, examinando-nos a nós mesmos.', contextoHistorico: 'Paulo corrige abusos na celebração da Ceia do Senhor em Corinto.', aplicacao: 'A Ceia do Senhor nos convida a lembrar do sacrifício de Cristo e a examinar nossos corações.' },
];

async function seed() {
  const client = new Client({ connectionString: DATABASE_URL });
  await client.connect();
  console.log('Connected to database');

  console.log('Inserting lexicon entries...');
  for (const entry of lexiconEntries) {
    await client.query(
      INSERT INTO lexicon_entries (strong, idioma, lemma, transliteracao, classe_gramatical, definicao, definicao_original, fonte, significados, ocorrencias, total_ocorrencias, criado_em, atualizado_em)
       VALUES (\, \, \, \, \, \, \, \, \::jsonb, \::jsonb, \, NOW(), NOW())
       ON CONFLICT (strong) DO NOTHING,
      [
        entry.strong, entry.idioma, entry.lemma, entry.transliteracao || null,
        entry.classeGramatical || null, entry.definicao, null, null,
        JSON.stringify(entry.significados || []), JSON.stringify([]),
        entry.totalOcorrencias || 0,
      ]
    );
  }
  console.log(Inserted  lexicon entries);

  console.log('Inserting persons...');
  for (const p of persons) {
    await client.query(
      INSERT INTO bible_persons (nome, nome_original, categoria, biografia, significado_nome, pai, mae, filhos, titulos, eventos_chave, ano_nascimento, ano_morte, referencias_biblicas, criado_em, atualizado_em)
       VALUES (\, \, \, \, \, \, \, \::jsonb, \::jsonb, \::jsonb, \, \, \::jsonb, NOW(), NOW())
       ON CONFLICT DO NOTHING,
      [
        p.nome, p.nomeOriginal || null, p.categoria || null, p.biografia || null,
        p.significadoNome || null, null, null,
        JSON.stringify(p.filhos || []), JSON.stringify(p.titulos || []),
        JSON.stringify(p.eventosChave || []), p.anoNascimento || null,
        p.anoMorte || null, JSON.stringify(p.referenciasBiblicas || []),
      ]
    );
  }
  console.log(Inserted  persons);

  console.log('Inserting doctrines...');
  for (const d of doctrines) {
    await client.query(
      INSERT INTO doctrines (nome, categoria, descricao, fundamento_scriptureiro, tradicoes, debates_teologicos, referencias_chave, criado_em, atualizado_em)
       VALUES (\, \, \, \, \::jsonb, \::jsonb, \::jsonb, NOW(), NOW())
       ON CONFLICT (nome) DO NOTHING,
      [
        d.nome, d.categoria, d.descricao, d.fundamentoScriptureiro || null,
        JSON.stringify({}), JSON.stringify([]), JSON.stringify([]),
      ]
    );
  }
  console.log(Inserted  doctrines);

  console.log('Inserting cross-references...');
  for (const ref of crossReferences) {
    await client.query(
      INSERT INTO cross_references (origem_ref, destino_ref, tipo, descricao, relevancia, criado_em, atualizado_em)
       VALUES (\, \, \, \, \, NOW(), NOW())
       ON CONFLICT DO NOTHING,
      [ref.origemRef, ref.destinoRef, ref.tipo, ref.descricao || null, ref.relevancia || 1.0]
    );
  }
  console.log(Inserted  cross-references);

  console.log('Inserting commentaries...');
  for (const c of commentaries) {
    await client.query(
      INSERT INTO commentaries (titulo, autor, tradicao, livro, capitulo, versiculo, conteudo, contexto_historico, aplicacao, referencias, publico, criado_em, atualizado_em)
       VALUES (\, \, \, \, \, \, \, \, \, \::jsonb, \, NOW(), NOW())
       ON CONFLICT DO NOTHING,
      [
        c.titulo, c.autor, c.tradicao, c.livro, c.capitulo, c.versiculo,
        c.conteudo, c.contextoHistorico || null, c.aplicacao || null,
        JSON.stringify([]), true,
      ]
    );
  }
  console.log(Inserted  commentaries);

  await client.end();
  console.log('Seeding complete!');
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
