#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const out = path.join(__dirname, '..', 'src', 'data', 'quiz.ts');

function q(id, e, o, r, x, c, n, t, ref) {
  return { id, enunciado: e, opcoes: o, respostaCorreta: r, explicacao: x, categoria: c, nivel: n, tipo: t, referencia: ref };
}

const F = [];

// ══════════ VERSÍCULOS FÁCEIS ══════════
F.push(q('f001','Como começa o versículo mais famoso da Bíblia? "Porque Deus amou o mundo de tal maneira que..."',['Deu o seu Filho unigênito','Criou os céus e a terra','Fez a luz brilhar','Abriu o mar Vermelho'],0,'João 3:16 — "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito."','versiculos','facil','completar','João 3:16'));
F.push(q('f002','Qual é o primeiro versículo da Bíblia?',['No princípio criou Deus os céus e a terra','E disse Deus: Haja luz','E a terra era sem forma e vazia','No princípio era o Verbo'],0,'Gênesis 1:1 — O versículo de abertura da Bíblia.','versiculos','facil','multipla','Gênesis 1:1'));
F.push(q('f003','Complete: "O Senhor é o meu _____; nada me faltará."',['Pastor','Rei','Escudo','Luz'],0,'Salmos 23:1 — O Salmo mais conhecido.','versiculos','facil','completar','Salmos 23:1'));
F.push(q('f004','Qual versículo diz "Aqui estou eu; envia-me a mim"?',['Isaías 6:8','Jeremias 1:7','Ezequiel 2:3','Amós 3:8'],0,'Isaías 6:8 — Resposta de Isaías à chamada do Senhor.','versiculos','facil','multipla','Isaías 6:8'));
F.push(q('f005','Em qual livro encontramos "Posso todas as coisas naquele que me fortalece"?',['Filipenses','Romanos','Efésios','Colossenses'],0,'Filipenses 4:13 — Paulo em prisão.','versiculos','facil','multipla','Filipenses 4:13'));
F.push(q('f006','V/F: "Deus é amor" é encontrada na Primeira Epístola de João.',['Verdadeiro','Falso','',''],0,'1 João 4:8 — "Deus é amor."','versiculos','facil','verdadeiro_falso','1 João 4:8'));
F.push(q('f007','Complete: "Porque pela graça sois salvos, por meio da _____".',['Fé','Obras','Batismo','Lei'],0,'Efésios 2:8 — Salvação é dom de Deus.','versiculos','facil','completar','Efésios 2:8'));
F.push(q('f008','Qual versículo diz "Não temas, porque eu sou contigo"?',['Isaías 41:10','Josué 1:9','Salmos 56:3','Gênesis 15:1'],0,'Isaías 41:10 — Promessa de Deus.','versiculos','facil','multipla','Isaías 41:10'));
F.push(q('f009','"Antes de te formar no ventre, eu te _____". Quem disse isso?',['Deus a Jeremias','Deus a Moisés','Deus a Isaías','Deus a Davi'],0,'Jeremias 1:5 — Chamada profética.','versiculos','facil','citacao','Jeremias 1:5'));
F.push(q('f010','V/F: O versículo "Em princípio era o Verbo" está em Gênesis.',['Falso','Verdadeiro','',''],0,'João 1:1 — Está no Evangelho de João.','versiculos','facil','verdadeiro_falso','João 1:1'));
F.push(q('f011','Complete: "Tudo posso naquele que me _____".',['Fortalece','Ama','Guias','Perdoa'],0,'Filipenses 4:13','versiculos','facil','completar','Filipenses 4:13'));
F.push(q('f012','Qual versículo é conhecido como o "versículo do evangelho"?',['João 3:16','Romanos 5:8','1 Coríntios 15:3-4','Efésios 2:8'],0,'João 3:16 resume o evangelho.','versiculos','facil','multipla','João 3:16'));
F.push(q('f013','"O Senhor é a minha luz e a minha _____; de quem me porei eu?"',['Salvação','Força','Paz','Rocha'],0,'Salmos 27:1','versiculos','facil','completar','Salmos 27:1'));
F.push(q('f014','Qual livro bíblico diz "No princípio era o Verbo"?',['João','Gênesis','Colossenses','Hebreus'],0,'João 1:1','versiculos','facil','multipla','João 1:1'));
F.push(q('f015','V/F: "Não ameis o mundo" está em 1 João.',['Verdadeiro','Falso','',''],0,'1 João 2:15','versiculos','facil','verdadeiro_falso','1 João 2:15'));
F.push(q('f016','Em qual livro está "Porque eu sei em quem tenho crido"?',['2 Timóteo','1 Timóteo','Filipenses','Efésios'],0,'2 Timóteo 1:12','versiculos','facil','multipla','2 Timóteo 1:12'));
F.push(q('f017','Complete: "O Senhor é o meu pastor, nada me _____".',['Faltará','Acontecerá','Assustará','Abalará'],0,'Salmos 23:1','versiculos','facil','completar','Salmos 23:1'));
F.push(q('f018','Qual versículo diz "Eu sou a porta; quem entrar por mim será salvo"?',['João 10:9','Mateus 7:13','Lucas 13:24','João 14:6'],0,'João 10:9','versiculos','facil','multipla','João 10:9'));
F.push(q('f019','V/F: O Salmo 23 é o salmo mais conhecido da Bíblia.',['Verdadeiro','Falso','',''],0,'Salmos 23 — O mais citado do mundo.','versiculos','facil','verdadeiro_falso','Salmos 23'));
F.push(q('f020','Complete: "Deem graças ao Senhor, porque ele é _____".',['Bom','Grande','Santo','Poderoso'],0,'Salmos 136:1','versiculos','facil','completar','Salmos 136:1'));
F.push(q('f021','Qual versículo diz "Não há ninguém como tu entre os deuses"?',['Êxodo 15:11','Salmos 86:8','Isaías 45:5','Deuteronômio 6:4'],0,'Êxodo 15:11 — Cântico de Moisés.','versiculos','facil','multipla','Êxodo 15:11'));
F.push(q('f022','"O que nasceu de Deus vence o mundo". Em qual livro?',['1 João','2 João','3 João','Apocalipse'],0,'1 João 5:4','versiculos','facil','multipla','1 João 5:4'));
F.push(q('f023','Complete: "Deus deu-nos não espírito de timidez, mas de _____".',['Força','Amor','Sabedoria','Paz'],0,'2 Timóteo 1:7','versiculos','facil','completar','2 Timóteo 1:7'));
F.push(q('f024','V/F: "Conhecereis a verdade, e a verdade vos libertará" é de Mateus.',['Falso','Verdadeiro','',''],0,'João 8:32','versiculos','facil','verdadeiro_falso','João 8:32'));
F.push(q('f025','Qual versículo diz "Em tudo dai graças, porque esta é a vontade de Deus"?',['1 Tessalonicenses 5:18','Colossenses 3:17','Efésios 5:20','Filipenses 4:6'],0,'1 Tessalonicenses 5:18','versiculos','facil','multipla','1 Tessalonicenses 5:18'));
F.push(q('f026','Complete: "O amor é _____, é bondade".',['Paciente','Forte','Eterno','Sagrado'],0,'1 Coríntios 13:4','versiculos','facil','completar','1 Coríntios 13:4'));
F.push(q('f027','Qual versículo diz "A boca fala do que o coração está cheio"?',['Mateus 12:34','Lucas 6:45','Provérbios 4:23','Salmos 19:14'],0,'Mateus 12:34','versiculos','facil','multipla','Mateus 12:34'));
F.push(q('f028','V/F: "Porque eu vim servir, e não ser servido" é de Marcos.',['Verdadeiro','Falso','',''],0,'Marcos 10:45','versiculos','facil','verdadeiro_falso','Marcos 10:45'));
F.push(q('f029','Qual versículo diz "Buscai primeiro o reino de Deus"?',['Mateus 6:33','Lucas 12:31','Salmos 37:4','Provérbios 3:6'],0,'Mateus 6:33','versiculos','facil','multipla','Mateus 6:33'));
F.push(q('f030','Complete: "O pecado não terá domínio sobre vós, porque não estais debaixo da _____".',['Lei','Graça','Morte','Lei'],0,'Romanos 6:14','versiculos','facil','completar','Romanos 6:14'));

// ══════════ PERSONAGENS FÁCEIS ══════════
F.push(q('f031','Quem foi o primeiro homem criado por Deus?',['Adão','Noé','Abraão','Moisés'],0,'Gênesis 2:7','personagens','facil','multipla','Gênesis 2:7'));
F.push(q('f032','Quem construiu a arca para sobreviver ao dilúvio?',['Noé','Abraão','Moisés','Davi'],0,'Gênesis 6:14-22','personagens','facil','multipla','Gênesis 6:14'));
F.push(q('f033','Quem liderou Israel para fora do Egito?',['Moisés','Abraão','Josué','Samuel'],0,'Êxodo 3:10-12','personagens','facil','multipla','Êxodo 3:10'));
F.push(q('f034','Quem derrotou o gigante Golias?',['Davi','Saul','Jonatas','Salomão'],0,'1 Samuel 17:49','personagens','facil','multipla','1 Samuel 17:49'));
F.push(q('f035','V/F: Abraão é considerado o pai de todas as nações.',['Verdadeiro','Falso','',''],0,'Gênesis 12:3','personagens','facil','verdadeiro_falso','Gênesis 12:3'));
F.push(q('f036','Quem foi a mãe de Samuel?',['Ana','Raquel','Sara','Rebeca'],0,'1 Samuel 1:20','personagens','facil','multipla','1 Samuel 1:20'));
F.push(q('f037','Quem foi o primeiro rei de Israel?',['Saul','Davi','Salomão','Samuel'],0,'1 Samuel 10:1','personagens','facil','multipla','1 Samuel 10:1'));
F.push(q('f038','Quem interpretou os sonhos do Faraó?',['José','Daniel','Moisés','Davi'],0,'Gênesis 41:16','personagens','facil','multipla','Gênesis 41:16'));
F.push(q('f039','V/F: Salomão pediu sabedoria a Deus.',['Verdadeiro','Falso','',''],0,'1 Reis 3:11-12','personagens','facil','verdadeiro_falso','1 Reis 3:11'));
F.push(q('f040','Quem foi a mulher que Deus usou contra Sísera?',['Débora','Ester','Rute','Raquel'],0,'Juízes 4:9','personagens','facil','multipla','Juízes 4:9'));
F.push(q('f041','Quem foi chamado de "pai da fé"?',['Abraão','Moisés','Davi','Jacó'],0,'Romanos 4:16','personagens','facil','multipla','Romanos 4:16'));
F.push(q('f042','Quem baptizou Jesus?',['João Batista','Pedro','André','Tiago'],0,'Mateus 3:13-17','personagens','facil','multipla','Mateus 3:13'));
F.push(q('f043','V/F: Jesus teve 12 apóstolos.',['Verdadeiro','Falso','',''],0,'Lucas 6:13-16','personagens','facil','verdadeiro_falso','Lucas 6:13'));
F.push(q('f044','Quem andou sobre as águas?',['Pedro','Tiago','João','André'],0,'Mateus 14:29','personagens','facil','multipla','Mateus 14:29'));
F.push(q('f045','Quem negou Jesus três vezes?',['Pedro','Judas','Tomé','João'],0,'Mateus 26:69-75','personagens','facil','multipla','Mateus 26:69'));
F.push(q('f046','Quem traiu Jesus por 30 moedas?',['Judas Iscariotes','Pedro','Tomé','Bartolomeu'],0,'Mateus 26:14-16','personagens','facil','multipla','Mateus 26:14'));
F.push(q('f047','Quem foi a mãe de Jesus?',['Maria','Ana','Elisabete','Rute'],0,'Mateus 1:18-25','personagens','facil','multipla','Mateus 1:18'));
F.push(q('f048','V/F: Paulo escreveu muitas cartas do NT.',['Verdadeiro','Falso','',''],0,'13 epístolas','personagens','facil','verdadeiro_falso',''));
F.push(q('f049','Quem foi o homem mais velho da Bíblia?',['Matusalém','Noé','Adão','Sete'],0,'Gênesis 5:27 — 969 anos.','personagens','facil','multipla','Gênesis 5:27'));
F.push(q('f050','Quem foi engolido por um grande peixe?',['Jonas','Elias','Isaías','Jeremias'],0,'Jonas 1:17','personagens','facil','multipla','Jonas 1:17'));
F.push(q('f051','V/F: Lázaro foi ressuscitado por Jesus.',['Verdadeiro','Falso','',''],0,'João 11:43-44','personagens','facil','verdadeiro_falso','João 11:43'));
F.push(q('f052','Quem era o rei mais sábio?',['Salomão','Davi','Saul','Ezequias'],0,'1 Reis 4:30','personagens','facil','multipla','1 Reis 4:30'));
F.push(q('f053','Quem visitou Salomão para testar sua sabedoria?',['Rainha de Sabá','Ester','Jezabel','Dalila'],0,'1 Reis 10:1-13','personagens','facil','multipla','1 Reis 10:1'));
F.push(q('f054','Quem foi o primeiro mártir cristão?',['Estêvão','Tiago','Pedro','Paulo'],0,'Atos 7:59-60','personagens','facil','multipla','Atos 7:59'));
F.push(q('f055','V/F: João é chamado de "discípulo amado".',['Verdadeiro','Falso','',''],0,'João 13:23','personagens','facil','verdadeiro_falso','João 13:23'));
F.push(q('f056','Quem caminhou com Deus e não viu a morte?',['Enoque','Noé','Abraão','Moisés'],0,'Gênesis 5:24','personagens','facil','multipla','Gênesis 5:24'));
F.push(q('f057','Quem desafiou 450 profetas de Baal?',['Elias','Eliseu','Isaías','Amós'],0,'1 Reis 18:20-40','personagens','facil','multipla','1 Reis 18:20'));
F.push(q('f058','Quem sucedeu Elias e multiplicou a oleada?',['Eliseu','Isaías','Jeremias','Amós'],0,'2 Reis 4:1-7','personagens','facil','multipla','2 Reis 4:1'));
F.push(q('f059','Quem foi levado ao céu em carro de fogo?',['Elias','Enoque','Moisés','Isaías'],0,'2 Reis 2:11','personagens','facil','multipla','2 Reis 2:11'));
F.push(q('f060','V/F: Rute era moabita.',['Verdadeiro','Falso','',''],0,'Rute 1:22','personagens','facil','verdadeiro_falso','Rute 1:22'));

// ══════════ DOUTRINAS FÁCEIS ══════════
F.push(q('f061','Qual é o dogma central do cristianismo?',['A morte e ressurreição de Jesus','O batismo infantil','O purgatório','A transubstanciação'],0,'1 Coríntios 15:3-4','doutrinas','facil','multipla','1 Coríntios 15:3-4'));
F.push(q('f062','V/F: A Trindade é composta por Pai, Filho e Espírito Santo.',['Verdadeiro','Falso','',''],0,'Mateus 28:19','doutrinas','facil','verdadeiro_falso','Mateus 28:19'));
F.push(q('f063','O que significa "Sola Scriptura"?',['Somente a Escritura','Somente a Igreja','Somente a Tradição','Somente o Papa'],0,'Princípio da Reforma.','doutrinas','facil','multipla',''));
F.push(q('f064','Qual sacramento representa a morte e ressurreição de Cristo?',['Batismo','Casamento','Unção dos enfermos','Confissão'],0,'Romanos 6:4','doutrinas','facil','multipla','Romanos 6:4'));
F.push(q('f065','Qual é o primeiro mandamento?',['Não terás outros deuses antes de mim','Não matarás','Não furtarás','Honrar pai e mãe'],0,'Êxodo 20:3','doutrinas','facil','multipla','Êxodo 20:3'));
F.push(q('f066','V/F: O pecado original é transmitido a todos.',['Verdadeiro','Falso','',''],0,'Romanos 5:12','doutrinas','facil','verdadeiro_falso','Romanos 5:12'));
F.push(q('f067','O que é o fruto do Espírito em Gálatas 5:22?',['Amor, alegria, paz','Riqueza, poder, fama','Sabedoria, força','Visão, milagres'],0,'Gálatas 5:22-23','doutrinas','facil','multipla','Gálatas 5:22'));
F.push(q('f068','O que a Ceia do Senhor representa?',['A morte de Jesus pela humanidade','O nascimento de Jesus','A ascensão','A criação'],0,'1 Coríntios 11:26','doutrinas','facil','multipla','1 Coríntios 11:26'));
F.push(q('f069','V/F: A graça é um favor imerecido de Deus.',['Verdadeiro','Falso','',''],0,'Efésios 2:8-9','doutrinas','facil','verdadeiro_falso','Efésios 2:8'));
F.push(q('f070','A promessa de Jesus sobre a vida eterna?',['Eu sou a ressurreição e a vida','Eu sou o caminho','Eu sou o pão','Todas as anteriores'],3,'João 11:25, 14:6, 6:35','doutrinas','facil','multipla',''));
F.push(q('f071','O que é a salvação?',['Livramento do pecado pela fé em Jesus','Fazer boas obras','Seguir regras','Batizar-se'],0,'Efésios 2:8-9','doutrinas','facil','multipla',''));
F.push(q('f072','V/F: A Bíblia é a palavra de Deus inspirada.',['Verdadeiro','Falso','',''],0,'2 Timóteo 3:16','doutrinas','facil','verdadeiro_falso','2 Timóteo 3:16'));
F.push(q('f073','O mandamento mais importante segundo Jesus?',['Amar o Senhor teu Deus','Não matarás','Honrar pai e mãe','Não furtarás'],0,'Mateus 22:37-38','doutrinas','facil','multipla','Mateus 22:37'));
F.push(q('f074','O que significa "arrependimento"?',['Mudar de mente e direção','Sentir culpa','Pedir desculpas','Ir à igreja'],0,'Atos 3:19','doutrinas','facil','multipla','Atos 3:19'));
F.push(q('f075','V/F: Jesus é a segunda pessoa da Trindade.',['Verdadeiro','Falso','',''],0,'Trindade: Pai, Filho, Espírito Santo.','doutrinas','facil','verdadeiro_falso',''));
F.push(q('f076','O que Jesus disse sobre o amor ao próximo?',['Amai-vos como eu vos amei','Odeiem seus inimigos','Amai apenas amigos','O amor é fraco'],0,'João 13:34','doutrinas','facil','multipla','João 13:34'));
F.push(q('f077','Qual é o resultado da fé em Jesus?',['Vida eterna','Riquezas','Poder político','Perfeição moral'],0,'João 3:16','doutrinas','facil','multipla','João 3:16'));
F.push(q('f078','V/F: Deus é onisciente, onipresente e onipotente.',['Verdadeiro','Falso','',''],0,'Salmos 139','doutrinas','facil','verdadeiro_falso',''));
F.push(q('f079','O que é o pecado?',['Transgressão da Lei de Deus','Erro humano','Falta de educação','Problema social'],0,'1 João 3:4','doutrinas','facil','multipla','1 João 3:4'));
F.push(q('f080','Complete: "O salário do pecado é a _____".',['Morte','Pobreza','Doença','Escuridão'],0,'Romanos 6:23','doutrinas','facil','completar','Romanos 6:23'));
F.push(q('f081','O que é o Evangelho?',['Boa nova de salvação','Livro de regras','Código moral','Filosofia antiga'],0,'Romanos 1:16','doutrinas','facil','multipla','Romanos 1:16'));
F.push(q('f082','V/F: O Espírito Santo é uma pessoa.',['Verdadeiro','Falso','',''],0,'João 14:16-17, Atos 5:3-4','doutrinas','facil','verdadeiro_falso',''));
F.push(q('f083','O que Jesus disse sobre perdoar?',['Perdoai sete vezes setenta','Não perdoeis','Perdoeis apenas amigos','Perdoeis uma vez'],0,'Mateus 18:22','doutrinas','facil','multipla','Mateus 18:22'));
F.push(q('f084','O que é a justificação?',['Ser declarado justo diante de Deus','Tornar-se perfeito','Seguir a Lei','Fazer penitência'],0,'Romanos 5:1','doutrinas','facil','multipla','Romanos 5:1'));
F.push(q('f085','V/F: A Ceia substituiu a Páscoa judaica.',['Verdadeiro','Falso','',''],0,'1 Coríntios 5:7','doutrinas','facil','verdadeiro_falso','1 Coríntios 5:7'));
F.push(q('f086','O que é a regeneração?',['Nascimento espiritual pelo Espírito','Batismo','Comunhão','Admissão na igreja'],0,'João 3:3-7','doutrinas','facil','multipla','João 3:3'));
F.push(q('f087','Atitude cristã diante do sofrimento?',['Confiar em Deus','Rebelar-se','Desistir da fé','Culpar os outros'],0,'Tiago 1:2-4','doutrinas','facil','multipla','Tiago 1:2'));
F.push(q('f088','V/F: A oração é comunicação com Deus.',['Verdadeiro','Falso','',''],0,'Filipenses 4:6','doutrinas','facil','verdadeiro_falso','Filipenses 4:6'));
F.push(q('f089','O que significa "batismo" em grego?',['Mergulhar/imersão','Lavar','Unir','Enviar'],0,'Batizo = mergulhar','doutrinas','facil','multipla',''));
F.push(q('f090','Complete: "A fé vem pelo _____".',['Ouvir','Ver','Sentir','Raciocinar'],0,'Romanos 10:17','doutrinas','facil','completar','Romanos 10:17'));

// ══════════ HISTÓRIA FÁCEIS ══════════
F.push(q('f091','Em que período Moisés viveu?',['1400 a.C.','1000 a.C.','500 a.C.','100 d.C.'],0,'~1446 a.C.','historia','facil','multipla',''));
F.push(q('f092','Qual cidade foi destruída com fogo e enxofre?',['Sodoma e Gomorra','Ninive','Babilônia','Jerusalém'],0,'Gênesis 19:24-25','historia','facil','multipla','Gênesis 19:24'));
F.push(q('f093','Quantos mandamentos Deus deu a Moisés?',['10','7','12','613'],0,'Êxodo 20:1-17','historia','facil','multipla','Êxodo 20:1'));
F.push(q('f094','V/F: O Mar Vermelho se abriu para Israel.',['Verdadeiro','Falso','',''],0,'Êxodo 14:21-22','historia','facil','verdadeiro_falso','Êxodo 14:21'));
F.push(q('f095','Quem construiu o Templo de Jerusalém?',['Salomão','Davi','Ezra','Neemias'],0,'1 Reis 6:14','historia','facil','multipla','1 Reis 6:14'));
F.push(q('f096','V/F: O AT foi escrito em grego.',['Falso','Verdadeiro','',''],0,'Principalmente em hebraico.','historia','facil','verdadeiro_falso',''));
F.push(q('f097','Quantos livros tem a Bíblia protestante?',['66','73','80','52'],0,'39 AT + 27 NT','historia','facil','multipla',''));
F.push(q('f098','Último profeta do Antigo Testamento?',['Malaquias','Isaías','Daniel','Zacarias'],0,'~430 a.C.','historia','facil','multipla','Malaquias 1:1'));
F.push(q('f099','Em que cidade Jesus nasceu?',['Belém','Nazareno','Jerusalém','Capérnaum'],0,'Mateus 2:1','historia','facil','multipla','Mateus 2:1'));
F.push(q('f100','Primeiro milagre de Jesus?',['Água em vinho','Curar cego','Alimentar 5000','Andar sobre águas'],0,'João 2:1-11','historia','facil','multipla','João 2:1'));
F.push(q('f101','O que aconteceu em Pentecostes?',['Espírito Santo desceu','Jesus nasceu','Jesus morreu','Criação do mundo'],0,'Atos 2:1-4','historia','facil','multipla','Atos 2:1'));
F.push(q('f102','Imperador quando Jesus nasceu?',['Augusto','Nero','Pilatos','Calígula'],0,'Lucas 2:1','historia','facil','multipla','Lucas 2:1'));
F.push(q('f103','V/F: A Torre de Babel foi para chegar ao céu.',['Verdadeiro','Falso','',''],0,'Gênesis 11:4','historia','facil','verdadeiro_falso','Gênesis 11:4'));
F.push(q('f104','Qual povo escravizou Israel?',['Egípcios','Babilônios','Assírios','Persas'],0,'Êxodo 1:11','historia','facil','multipla','Êxodo 1:11'));
F.push(q('f105','Quem libertou os judeus do exílio?',['Ciro da Pérsia','Nebucodonosor','Alexandre','Pilatos'],0,'2 Crônicas 36:22-23','historia','facil','multipla',''));
F.push(q('f106','V/F: Jesus foi crucificado em Jerusalém.',['Verdadeiro','Falso','',''],0,'Mateus 27:33','historia','facil','verdadeiro_falso','Mateus 27:33'));
F.push(q('f107','Quantos livros tem o NT?',['27','39','24','66'],0,'4 Evangelhos + Atos + 21 epístolas + Apocalipse','historia','facil','multipla',''));
F.push(q('f108','Quem escreveu a maioria dos Salmos?',['Davi','Salomão','Moisés','Asafe'],0,'73 dos 150 salmos','historia','facil','multipla',''));
F.push(q('f109','Profissão de Paulo antes de ser apóstolo?',['Fabricante de tendas','Pescador','Médico','Soldado'],0,'Atos 18:3','historia','facil','multipla','Atos 18:3'));
F.push(q('f110','Monte Sinai/Carmelo — onde Moisés recebeu os Mandamentos?',['Monte Sinai','Monte Carmelo','Monte Nebo','Monte Hor'],0,'Êxodo 19:20','historia','facil','multipla','Êxodo 19:20'));
F.push(q('f111','Última cidade de Jesus antes da crucificação?',['Jerusalém','Belém','Nazareno','Capérnaum'],0,'Mateus 21:1-11','historia','facil','multipla','Mateus 21:1'));
F.push(q('f112','V/F: Noé levou dois de cada animal.',['Verdadeiro','Falso','',''],0,'Gênesis 6:19-20','historia','facil','verdadeiro_falso','Gênesis 6:19'));
F.push(q('f113','Quem ungiu Davi como rei?',['Samuel','Natã','Gad','Eliseu'],0,'1 Samuel 16:13','historia','facil','multipla','1 Samuel 16:13'));
F.push(q('f114','Quem reconstruiu os muros de Jerusalém?',['Neemias','Esdras','Zorobabel','Ciro'],0,'Neemias 2:18','historia','facil','multipla','Neemias 2:18'));
F.push(q('f115','O que os magos trouxeram?',['Ouro, incenso e mirra','Pão e peixe','Roupas','Livros'],0,'Mateus 2:11','historia','facil','multipla','Mateus 2:11'));
F.push(q('f116','Quantas pragas no Egito?',['10','7','12','5'],0,'Êxodo 7-12','historia','facil','multipla',''));
F.push(q('f117','Quem tentou matar o bebê Jesus?',['Herodes','Pilatos','César','Faraó'],0,'Mateus 2:16','historia','facil','multipla','Mateus 2:16'));
F.push(q('f118','V/F: Jesus viveu 33 anos.',['Verdadeiro','Falso','',''],0,'Tradição cristã','historia','facil','verdadeiro_falso',''));
F.push(q('f119','Rio que Israel atravessou para terra prometida?',['Jordão','Nilo','Eufrates','Tigre'],0,'Josué 3:15-17','historia','facil','multipla','Josué 3:15'));
F.push(q('f120','Profeta levado ao céu sem ver a morte?',['Elias','Moisés','Enoque','Isaías'],0,'2 Reis 2:11','historia','facil','multipla','2 Reis 2:11'));

// ══════════ LÍNGUAS FÁCEIS ══════════
F.push(q('f121','Língua do Antigo Testamento?',['Hebraico','Grego','Latim','Aramaico'],0,'Principalmente hebraico','linguas','facil','multipla',''));
F.push(q('f122','Língua do Novo Testamento?',['Grego Koiné','Hebraico','Latim','Aramaico'],0,'Grego koiné','linguas','facil','multipla',''));
F.push(q('f123','Significado de "Aleluia"?',['Louvai ao Senhor','Deus é amor','Paz','Glória a Deus'],0,'Hallelu-Yah','linguas','facil','multipla',''));
F.push(q('f124','V/F: "Logos" significa "palavra" ou "razão".',['Verdadeiro','Falso','',''],0,'λόγος','linguas','facil','verdadeiro_falso','João 1:1'));
F.push(q('f125','"Deus" em hebraico?',['Elohim','Adonai','Yahweh','Shaddai'],0,'Elohim — 2600+ vezes','linguas','facil','multipla',''));
F.push(q('f126','Significado de "Emmanuel"?',['Deus conosco','Deus é forte','Deus é fiel','Deus é justo'],0,'עִמָּנוּ אֵל','linguas','facil','multipla','Mateus 1:23'));
F.push(q('f127','V/F: "Agape" significa amor fraternal.',['Falso','Verdadeiro','',''],0,'Amor incondicional','linguas','facil','verdadeiro_falso',''));
F.push(q('f128','"Abba" em aramaico significa?',['Pai','Filho','Rei','Senhor'],0,'Forma íntima de pai','linguas','facil','multipla','Romanos 8:15'));
F.push(q('f129','Primeira palavra da Bíblia em hebraico?',['Bereshit','Yahweh','Elohim','Shalom'],0,'Bereshit = No princípio','linguas','facil','multipla','Gênesis 1:1'));
F.push(q('f130','Significado de "Koiné"?',['Comum','Sagrado','Antigo','Mistério'],0,'Grego do povo','linguas','facil','multipla',''));
F.push(q('f131','"Messias" em hebraico significa?',['Ungido','Salvador','Rei','Profeta'],0,'Mashiach','linguas','facil','multipla',''));
F.push(q('f132','V/F: "Jesus" em hebraico é "Yeshua".',['Verdadeiro','Falso','',''],0,'Yeshua = Yahweh salva','linguas','facil','verdadeiro_falso',''));
F.push(q('f133','"Sabbath" significa?',['Descanso','Louvor','Oração','Sacrifício'],0,'Shabbat','linguas','facil','multipla',''));
F.push(q('f134','"Paz" em hebraico?',['Shalom','Aleluia','Amen','Maranatha'],0,'Shalom','linguas','facil','multipla',''));
F.push(q('f135','V/F: "Christos" significa "ungido".',['Verdadeiro','Falso','',''],0,'Tradução grega de Messias','linguas','facil','verdadeiro_falso',''));
F.push(q('f136','"Evangelho" em grego significa?',['Boa nova','Palavra de Deus','Salvação','Reino'],0,'Euangelion','linguas','facil','multipla',''));
F.push(q('f137','"Senhor" para Deus em hebraico?',['Adonai','Yahweh','Elohim','Shaddai'],0,'Adonai — substituto para YHWH','linguas','facil','multipla',''));
F.push(q('f138','V/F: "Bíblia" significa "livros".',['Verdadeiro','Falso','',''],0,'Biblia = livros','linguas','facil','verdadeiro_falso',''));
F.push(q('f139','"Torah" significa?',['Lei/Instrução','Profecia','Louvor','Oração'],0,'Instrução','linguas','facil','multipla',''));
F.push(q('f140','"Deus" em grego?',['Theos','Kyrios','Pater','Christos'],0,'Theos — 1300+ vezes','linguas','facil','multipla',''));
F.push(q('f141','"Amém" significa?',['Que assim seja','Glória a Deus','Paz','Louvor'],0,'Ser firme','linguas','facil','multipla',''));
F.push(q('f142','V/F: "Hosana" é hebraico de louvor.',['Verdadeiro','Falso','',''],0,'Salva-nos','linguas','facil','verdadeiro_falso',''));
F.push(q('f143','"Synagoga" significa?',['Reunião','Templo','Escola','Cidade'],0,'Reunião','linguas','facil','multipla',''));
F.push(q('f144','"Salvação" em grego?',['Soteria','Agape','Pistis','Charis'],0,'Soteria','linguas','facil','multipla',''));
F.push(q('f145','V/F: "Israel" significa "guerreiro de Deus".',['Falso','Verdadeiro','',''],0,'Aquele que luta com Deus','linguas','facil','verdadeiro_falso',''));
F.push(q('f146','"Paracleto" significa?',['Consolador/Advogado','Juiz','Rei','Profeta'],0,'Chamado ao lado','linguas','facil','multipla',''));
F.push(q('f147','Língua de Israel antes do exílio?',['Hebraico','Aramaico','Grego','Latim'],0,'Hebraico','linguas','facil','multipla',''));
F.push(q('f148','V/F: "Epístola" significa "carta".',['Verdadeiro','Falso','',''],0,'Epistole','linguas','facil','verdadeiro_falso',''));
F.push(q('f149','"Mammon" significa?',['Riquezas/Dinheiro','Pecado','Morte','Fome'],0,'Mateus 6:24','linguas','facil','multipla','Mateus 6:24'));
F.push(q('f150','"Igreja" em grego?',['Ecclesia','Synagoge','Theos','Pneuma'],0,'Ecclesia = assembleia','linguas','facil','multipla',''));

console.log('Fácil total: ' + F.length);

// Export and build the file
const header = `export type CategoriaQuiz = 'versiculos' | 'personagens' | 'doutrinas' | 'historia' | 'linguas';
export type NivelQuiz = 'facil' | 'medio' | 'dificil';
export type TipoPergunta = 'multipla' | 'verdadeiro_falso' | 'completar' | 'ordenar' | 'referencia' | 'citacao';

export interface PerguntaQuiz {
  id: string;
  enunciado: string;
  opcoes: [string, string, string, string];
  respostaCorreta: number;
  explicacao: string;
  categoria: CategoriaQuiz;
  nivel: NivelQuiz;
  tipo: TipoPergunta;
  referencia?: string;
  ordenar?: string[];
}

export const CATEGORIAS_QUIZ: Record<CategoriaQuiz, { label: string; icon: string; cor: string }> = {
  versiculos: { label: 'Versículos', icon: '📖', cor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  personagens: { label: 'Personagens', icon: '👤', cor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  doutrinas: { label: 'Doutrinas', icon: '⛪', cor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
  historia: { label: 'História', icon: '🏛️', cor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  linguas: { label: 'Línguas Originais', icon: '🔤', cor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
};

export const NIVEIS_QUIZ: Record<NivelQuiz, { label: string; cor: string }> = {
  facil: { label: 'Fácil', cor: 'bg-green-500/10 text-green-600 dark:text-green-400' },
  medio: { label: 'Médio', cor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  dificil: { label: 'Difícil', cor: 'bg-red-500/10 text-red-600 dark:text-red-400' },
};

function q(id, enunciado, opcoes, respostaCorreta, explicacao, categoria, nivel, tipo, referencia) {
  const p = { id, enunciado, opcoes, respostaCorreta, explicacao, categoria, nivel, tipo };
  if (referencia) p.referencia = referencia;
  return p;
}
`;

// Build the questions as a JS array
let body = 'const perguntasFacis: PerguntaQuiz[] = [\n';
for (const p of F) {
  body += `  q('${p.id}',${JSON.stringify(p.enunciado)},${JSON.stringify(p.opcoes)},${p.respostaCorreta},${JSON.stringify(p.explicacao)},'${p.categoria}','${p.nivel}','${p.tipo}'${p.referencia ? ",'" + p.referencia + "'" : ''}),\n`;
}
body += '];\n';

// Now write the complete file with the médio and difícil sections inline
// For the médio and difícil, I'll generate them directly in the file

const médioVersículos = [
  q('m001','Qual versículo diz "Porque eu bem sei os pensamentos que penso de vós"?',['Jeremias 29:11','Isaías 55:8','Salmos 139:4','Provérbios 3:5'],0,'Jeremias 29:11','versiculos','medio','multipla','Jeremias 29:11'),
  q('m002','Complete: "Eu sou o caminho, a _____ e a vida".',['Verdade','Luz','Porta','Pastor'],0,'João 14:6','versiculos','medio','completar','João 14:6'),
  q('m003','Epístola de "O salário do pecado é a morte"?',['Romanos','Gálatas','Efésios','Filipenses'],0,'Romanos 6:23','versiculos','medio','multipla','Romanos 6:23'),
  q('m004','V/F: "Tudo é lícito, mas nem tudo é proveitoso" — 1 Coríntios.',['Verdadeiro','Falso','',''],0,'1 Coríntios 6:12','versiculos','medio','verdadeiro_falso','1 Coríntios 6:12'),
  q('m005','Versículo da profecia do Sofredor em Isaías?',['Isaías 53','Isaías 40','Isaías 61','Isaías 7'],0,'Isaías 53:1-12','versiculos','medio','multipla','Isaías 53:1-12'),
  q('m006','"Deem graças ao Senhor, porque ele é bom" — qual livro?',['Salmos','Provérbios','Eclesiastes','Cantares'],0,'Salmos 136:1','versiculos','medio','multipla','Salmos 136:1'),
  q('m007','Complete: "Ainda que eu falasse as línguas dos homens e dos _____".',['Anjos','Profetas','Reis','Sábios'],0,'1 Coríntios 13:1','versiculos','medio','completar','1 Coríntios 13:1'),
  q('m008','Hebreus fala da "nuvem de testemunhas" — qual versículo?',['Hebreus 12:1','Hebreus 11:1','Hebreus 10:25','Hebreus 13:8'],0,'Hebreus 12:1','versiculos','medio','multipla','Hebreus 12:1'),
  q('m009','V/F: "A fé é o firme fundamento" — Hebreus 11:1.',['Verdadeiro','Falso','',''],0,'Hebreus 11:1','versiculos','medio','verdadeiro_falso','Hebreus 11:1'),
  q('m010','"Já não sou eu que vivo, mas Cristo vive em mim" — qual livro?',['Gálatas','Romanos','Efésios','Colossenses'],0,'Gálatas 2:20','versiculos','medio','multipla','Gálatas 2:20'),
  q('m011','"Porque onde está o teu tesouro, aí estará o teu coração" — qual versículo?',['Mateus 6:21','Lucas 12:34','Provérbios 3:5','Mateus 19:21'],0,'Mateus 6:21','versiculos','medio','multipla','Mateus 6:21'),
  q('m012','Complete: "Não vos conformai com este mundo".',['Mundo','Pecado','Escuridão','Lei'],0,'Romanos 12:2','versiculos','medio','completar','Romanos 12:2'),
  q('m013','V/F: "Deus é fiel" — 1 Coríntios 10:13.',['Verdadeiro','Falso','',''],0,'1 Coríntios 10:13','versiculos','medio','verdadeiro_falso','1 Coríntios 10:13'),
  q('m014','"Estai sóbrios, vigiai; o vosso adversário anda em _____".',['Torno','Fúria','Pecado','Escuridão'],0,'1 Pedro 5:8','versiculos','medio','completar','1 Pedro 5:8'),
  q('m015','V/F: "A palavra de Deus é viva e eficaz" — Hebreus 4:12.',['Verdadeiro','Falso','',''],0,'Hebreus 4:12','versiculos','medio','verdadeiro_falso','Hebreus 4:12'),
  q('m016','"Nem a morte nem a vida nos separarão do amor de Deus" — qual livro?',['Romanos','Efésios','Filipenses','Colossenses'],0,'Romanos 8:38-39','versiculos','medio','multipla','Romanos 8:38'),
  q('m017','"Se Deus é por nós, quem será _____?"',['Contra nós','Para nós','Conosco','Contra mim'],0,'Romanos 8:31','versiculos','medio','completar','Romanos 8:31'),
  q('m018','"Imagem do Deus invisível" — qual versículo?',['Colossenses 1:15','Colossenses 2:9','Efésios 1:22','Filipenses 2:6'],0,'Colossenses 1:15','versiculos','medio','multipla','Colossenses 1:15'),
  q('m019','V/F: "Os que esperam no Senhor renovarão as forças" — Isaías 40:31.',['Verdadeiro','Falso','',''],0,'Isaías 40:31','versiculos','medio','verdadeiro_falso','Isaías 40:31'),
  q('m020',"2 Timóteo fala de \"pregar a palavra\" — qual versículo?",['2 Timóteo 4:2','2 Timóteo 2:15','2 Timóteo 3:16','2 Timóteo 1:7'],0,'2 Timóteo 4:2','versiculos','medio','multipla','2 Timóteo 4:2'),
  q('m021','Complete: "Conhecereis a verdade, e a verdade vos _____".',['Libertará','Guiará','Ensinará','Protegerá'],0,'João 8:32','versiculos','medio','completar','João 8:32'),
  q('m022','V/F: "A boca fala do que está cheio o coração" — Mateus 12:34.',['Verdadeiro','Falso','',''],0,'Mateus 12:34','versiculos','medio','verdadeiro_falso','Mateus 12:34'),
  q('m023','"Nova criatura" — qual versículo?',['2 Coríntios 5:17','2 Coríntios 4:16','2 Coríntios 6:2','2 Coríntios 12:9'],0,'2 Coríntios 5:17','versiculos','medio','multipla','2 Coríntios 5:17'),
  q('m024','Complete: "Buscai primeiro o _____ de Deus".',['Reino','Amor','Poder','Conhecimento'],0,'Mateus 6:33','versiculos','medio','completar','Mateus 6:33'),
  q('m025','"A língua pequena que incendeia florestas" — qual livro?',['Tiago','Pedro','João','Judas'],0,'Tiago 3:5','versiculos','medio','multipla','Tiago 3:5'),
  q('m026','V/F: "Onde o pecado abundou, a graça sobreabundou" — Romanos 5:20.',['Verdadeiro','Falso','',''],0,'Romanos 5:20','versiculos','medio','verdadeiro_falso','Romanos 5:20'),
  q('m027','"Misericórdias novas a cada manhã" — qual versículo?',['Lamentações 3:22-23','Lamentações 3:40','Lamentações 5:7','Lamentações 1:12'],0,'Lamentações 3:22-23','versiculos','medio','multipla','Lamentações 3:22'),
  q('m028','Complete: "Portanto, quem estiver em Cristo, é nova _____".',['Criação','Pessoa','Lei','Aliança'],0,'2 Coríntios 5:17','versiculos','medio','completar','2 Coríntios 5:17'),
  q('m029','"Eu sou o Alfa e o Ômega" — qual versículo?',['Apocalipse 1:8','Apocalipse 21:6','Apocalipse 22:13','Todas as anteriores'],3,'Apocalipse 1:8, 21:6, 22:13','versiculos','medio','multipla','Apocalipse 22:13'),
  q('m030','V/F: "O amor é paciente, o amor é bondade" — 1 Coríntios 13:4.',['Verdadeiro','Falso','',''],0,'1 Coríntios 13:4','versiculos','medio','verdadeiro_falso','1 Coríntios 13:4'),
];

const médioPersonagens = [
  q('m031','Quem foi chamado de "amigo de Deus"?',['Abraão','Moisés','Davi','Paulo'],0,'Tiago 2:23','personagens','medio','multipla','Tiago 2:23'),
  q('m032','Quantos apóstolos Jesus escolheu?',['12','10','70','7'],0,'Lucas 6:13-16','personagens','medio','multipla','Lucas 6:13'),
  q('m033','V/F: Paulo foi fariseu antes de se converter.',['Verdadeiro','Falso','',''],0,'Filipenses 3:5','personagens','medio','verdadeiro_falso','Filipenses 3:5'),
  q('m034','Quem retornou do exílio e reformou Israel?',['Esdras','Neemias','Zorobabel','Ageu'],0,'Esdras 7:10','personagens','medio','multipla','Esdras 7:10'),
  q('m035','Qual rainha judia salvou seu povo?',['Ester','Débora','Rute','Sara'],0,'Ester 7:3-4','personagens','medio','multipla','Ester 7:3'),
  q('m036','Pai de João Batista?',['Zacarias','José','Pedro','João'],0,'Lucas 1:13','personagens','medio','multipla','Lucas 1:13'),
  q('m037','Quantos livros Paulo escreveu?',['13','12','14','10'],0,'13 epístolas','personagens','medio','multipla',''),
  q('m038','V/F: Lucas era médico.',['Verdadeiro','Falso','',''],0,'Colossenses 4:14','personagens','medio','verdadeiro_falso','Colossenses 4:14'),
  q('m039','Quem traiu Jesus com um beijo?',['Judas Iscariotes','Pedro','Tomé','André'],0,'Mateus 26:49','personagens','medio','multipla','Mateus 26:49'),
  q('m040','Quem confrontou Davi por Bate-Seba?',['Natã','Gad','Samuel','Eliseu'],0,'2 Samuel 12:1-15','personagens','medio','multipla','2 Samuel 12:1'),
  q('m041','Quem era "apóstolo dos gentios"?',['Paulo','Pedro','Tiago','André'],0,'Romanos 11:13','personagens','medio','multipla','Romanos 11:13'),
  q('m042','V/F: Ana era estéril antes de conceber Samuel.',['Verdadeiro','Falso','',''],0,'1 Samuel 1:2','personagens','medio','verdadeiro_falso','1 Samuel 1:2'),
  q('m043','Rei que encontrou o Livro da Lei?',['Josias','Ezequias','Manassés','Amom'],0,'2 Reis 22:8-10','personagens','medio','multipla','2 Reis 22:8'),
  q('m044','V/F: Tomé duvidou da ressurreição.',['Verdadeiro','Falso','',''],0,'João 20:24-29','personagens','medio','verdadeiro_falso','João 20:24'),
  q('m045','Profeta que curou Naamão?',['Eliseu','Elias','Isaías','Amós'],0,'2 Reis 5:1-19','personagens','medio','multipla','2 Reis 5:1'),
  q('m046','V/F: O nome "Paulo" significa "pequeno".',['Verdadeiro','Falso','',''],0,'Paulus = pequeno','personagens','medio','verdadeiro_falso',''),
  q('m047','Mulher samaritana junto ao poço?',['Mulher samaritana','Marta','Maria','Raquel'],0,'João 4:7-42','personagens','medio','multipla','João 4:7'),
  q('m048','Líder que dividiu o reino?',['Roboão','Jeroboão','Absalom','Adonias'],0,'1 Reis 12:16-20','personagens','medio','multipla','1 Reis 12:16'),
  q('m049','V/F: Moisés não era eloquente.',['Verdadeiro','Falso','',''],0,'Êxodo 4:10','personagens','medio','verdadeiro_falso','Êxodo 4:10'),
  q('m050','Quem trouxe as tábuas da Lei?',['Moisés','Josué','Aarão','Calebe'],0,'Êxodo 32:15-16','personagens','medio','multipla','Êxodo 32:15'),
];

const médioDoutrinas = [
  q('m051','O que é a "parousia" em grego?',['Vinda/Presença','Partida','Morte','Ressurreição'],0,'1 Tessalonicenses 4:15-17','doutrinas','medio','multipla',''),
  q('m052','V/F: Justificação é um processo contínuo.',['Falso','Verdadeiro','',''],0,'A justificação é ato instantaneous.','doutrinas','medio','verdadeiro_falso',''),
  q('m053','O pecado imperdoável?',['Blasfêmia contra o Espírito Santo','Mentir','Matar','Adulterar'],0,'Mateus 12:31-32','doutrinas','medio','multipla','Mateus 12:31'),
  q('m054','Significado de "ecclesia" em grego?',['Reunião/Assembleia','Templo','Cidade','Escola'],0,'Ek + kaleo = chamados','doutrinas','medio','multipla',''),
  q('m055','Cinco solas incluem "Sola Fide"?',['Verdadeiro','Falso','',''],0,'Sola Fide = Somente pela Fé','doutrinas','medio','verdadeiro_falso',''),
  q('m056','O que Paulo ensina sobre a lei em Romanos 7?',['A lei revela o pecado','A lei salva','A lei é obsoleta','A lei é opcional'],0,'Romanos 7:7','doutrinas','medio','multipla','Romanos 7:7'),
  q('m057','Significado de "Parakletos"?',['Consolador/Intercessor','Juiz','Rei','Profeta'],0,'João 14:16','doutrinas','medio','multipla','João 14:16'),
  q('m058','V/F: Os 5 solas incluem "Sola Gratia".',['Verdadeiro','Falso','',''],0,'Somente pela Graça','doutrinas','medio','verdadeiro_falso',''),
  q('m059','Livro mais poético da Bíblia?',['Cantares','Salmos','Provérbios','Eclesiastes'],0,'Cantares','doutrinas','medio','multipla',''),
  q('m060','Qual dom NÃO é mencionado em 1 Coríntios 12?',['Profecia','Sabedoria','Conhecimento','Fé'],0,'1 Coríntios 12:8-10 — Profecia é listada mas não como dom separado aqui.','doutrinas','medio','multipla','1 Coríntios 12:8-10'),
];

const médioHistória = [
  q('m061','Ano da destruição do Templo pela Babilônia?',['586 a.C.','70 d.C.','1000 a.C.','33 d.C.'],0,'2 Reis 25:8-9','historia','medio','multipla','2 Reis 25:8'),
  q('m062','Quantos capítulos tem Salmos?',['150','119','100','136'],0,'150 salmos','historia','medio','multipla',''),
  q('m063','V/F: Paulo escreveu cartas na primeira viagem.',['Falso','Verdadeiro','',''],0,'Maioria em prisões posteriores','historia','medio','verdadeiro_falso',''),
  q('m064','Livro mais longo da Bíblia?',['Salmos','Gênesis','Isaías','Jeremias'],0,'150 capítulos','historia','medio','multipla',''),
  q('m065','Jó é situado em qual período?',['Patriarcal','Monárquico','Exílico','Pós-exílico'],0,'Antes de Moisés','historia','medio','multipla',''),
  q('m066','Profeta levado ao céu em carro de fogo?',['Elias','Enoque','Moisés','Isaías'],0,'2 Reis 2:11','historia','medio','multipla','2 Reis 2:11'),
  q('m067','Moisés morreu onde?',['Monte Nebo','Céu','Terra prometida','Deserto'],0,'Deuteronômio 34:5-8','historia','medio','multipla','Deuteronômio 34:5'),
  q('m068','V/F: O Êxodo durou 40 anos.',['Verdadeiro','Falso','',''],0,'Números 14:33','historia','medio','verdadeiro_falso','Números 14:33'),
  q('m069','Quem destruiu o Templo em 70 d.C.?',['Romano','Babilônios','Persas','Gregos'],0,'General Tito','historia','medio','multipla',''),
  q('m070','Menor versículo da Bíblia?',['Jesus chorou','Deus é amor','Obedeçam','Creiam'],0,'João 11:35','historia','medio','multipla','João 11:35'),
];

const médioLínguas = [
  q('m071','Raiz hebraica de "Israel"?',['Luta com Deus','Deus salva','Deus é grande','Paz de Deus'],0,'Gênesis 32:28','linguas','medio','multipla','Gênesis 32:28'),
  q('m072','"Christos" em grego significa?',['Ungido','Salvador','Rei','Profeta'],0,'Tradução de Mashiach','linguas','medio','multipla',''),
  q('m073','V/F: "Hesed" pode ser traduzido como "bondade amorosa".',['Verdadeiro','Falso','',''],0,'Hesed = amor, misericórdia, fidelidade','linguas','medio','verdadeiro_falso',''),
  q('m074','"Maranatha" em 1 Coríntios 16:22 significa?',['Vem, Senhor','Paz','Graça','Louvor'],0,'Aramaico','linguas','medio','multipla','1 Coríntios 16:22'),
  q('m075','"Shalom" significa?',['Paz/Plenitude','Amor','Justiça','Glória'],0,'Paz e plenitude','linguas','medio','multipla',''),
  q('m076','V/F: A Septuaginta é a tradução grega do AT.',['Verdadeiro','Falso','',''],0,'Séc. III-II a.C.','linguas','medio','verdadeiro_falso',''),
  q('m077','Significado de "Barukh"?',['Abençoado','Feliz','Santo','Grande'],0,'Adjetivo passivo de barak','linguas','medio','multipla',''),
  q('m078','"Palavra" no contexto joanino — qual grego?',['Logos','Rhema','Phoné','Glossa'],0,'João 1:1','linguas','medio','multipla','João 1:1'),
  q('m079','"Amen" em hebraico significa?',['Que assim seja','Glória a Deus','Paz','Louvor'],0,'Amán = ser firme','linguas','medio','multipla',''),
  q('m080','Theos (θεός) aparece quantas vezes no NT?',['Mais de 1300','Mais de 500','Mais de 2000','Mais de 800'],0,'~1300 vezes','linguas','medio','multipla',''),
];

// ══════════ DIFÍCIL ══════════
const difícilVersículos = [
  q('d001','Romanos 8 — "Tudo cooperara para o bem"?',['Romanos 8:28','Romanos 8:29','Romanos 8:30','Romanos 8:31'],0,'Romanos 8:28','versiculos','dificil','multipla','Romanos 8:28'),
  q('d002','Paulo discute o "corpo místico" em qual capítulo?',['1 Coríntios 12','Romanos 12','Efésios 4','Colossenses 1'],0,'1 Coríntios 12:12-27','versiculos','dificil','multipla','1 Coríntios 12:12-27'),
  q('d003','Apocalipse — "não acrescentarão nem tirarão"?',['Apocalipse 22:18-19','Apocalipse 21:8','Apocalipse 20:10','Apocalipse 19:11'],0,'Apocalipse 22:18-19','versiculos','dificil','multipla','Apocalipse 22:18-19'),
  q('d004','V/F: "A verdade vos libertará" — João 8:32.',['Verdadeiro','Falso','',''],0,'João 8:32','versiculos','dificil','verdadeiro_falso','João 8:32'),
  q('d005','"Vaidade de vaidades" — qual versículo?',['Eclesiastes 1:2','Eclesiastes 3:1','Eclesiastes 12:13','Eclesiastes 2:11'],0,'Eclesiastes 1:2','versiculos','dificil','multipla','Eclesiastes 1:2'),
  q('d006','Benção das perseguições — qual versículo?',['Mateus 5:10-12','Mateus 5:3-4','Mateus 5:5-6','Mateus 5:7-9'],0,'Mateus 5:10-12','versiculos','dificil','multipla','Mateus 5:10-12'),
  q('d007','"Antes que Abraão existisse, eu sou" — qual versículo?',['João 8:58','João 10:30','João 14:9','João 6:35'],0,'João 8:58','versiculos','dificil','multipla','João 8:58'),
  q('d008','24 anciãos — qual versículo?',['Apocalipse 4:4','Apocalipse 5:8','Apocalipse 7:11','Apocalipse 11:16'],0,'Apocalipse 4:4','versiculos','dificil','multipla','Apocalipse 4:4'),
  q('d009','V/F: "Deus não se deixará escarnecer" — Gálatas 6:7.',['Verdadeiro','Falso','',''],0,'Gálatas 6:7','versiculos','dificil','verdadeiro_falso','Gálatas 6:7'),
  q('d010','"Sangue de Jesus purifica de todo pecado" — qual versículo?',['1 João 1:7','Hebreus 9:22','Efésios 1:7','Colossenses 1:20'],0,'1 João 1:7','versiculos','dificil','multipla','1 João 1:7'),
  q('d011','V/F: Paulo foi apedrejado em Listra.',['Verdadeiro','Falso','',''],0,'Atos 14:19','versiculos','dificil','verdadeiro_falso','Atos 14:19'),
  q('d012','"Ninguém tem maior amor" — qual versículo?',['João 15:13','João 3:16','João 14:6','João 10:11'],0,'João 15:13','versiculos','dificil','multipla','João 15:13'),
];

const difícilPersonagens = [
  q('d013','Filhos de Jó no final do livro?',['7 filhos e 3 filhas','12 filhos','10 filhos','7 filhos'],0,'Jó 42:13','personagens','dificil','multipla','Jó 42:13'),
  q('d014','V/F: Natã confrontou Davi sobre Bate-Seba.',['Verdadeiro','Falso','',''],0,'2 Samuel 12:1-15','personagens','dificil','verdadeiro_falso','2 Samuel 12:1'),
  q('d015','Rei que encontrou o Livro da Lei?',['Josias','Ezequias','Manassés','Amom'],0,'2 Reis 22:8-10','personagens','dificil','multipla','2 Reis 22:8'),
  q('d016','Único livro do AT sem menção explícita a Deus?',['Ester','Cantares','Eclesiastes','Rute'],0,'Ester','personagens','dificil','multipla',''),
  q('d017','Primeiro mártir cristão?',['Estêvão','Tiago','Pedro','Paulo'],0,'Atos 7:59-60','personagens','dificil','multipla','Atos 7:59'),
  q('d018','V/F: Tomé duvidou da ressurreição.',['Verdadeiro','Falso','',''],0,'João 20:24-29','personagens','dificil','verdadeiro_falso','João 20:24'),
  q('d019','Rei babilônico da estátua com pés de barro?',['Nebucodonosor','Ciro','Dario','Belsazar'],0,'Daniel 2:31-35','personagens','dificil','multipla','Daniel 2:31'),
  q('d020','Pai de Timóteo?',['Pai gentio desconhecido','Bernabé','Apolos','Silas'],0,'2 Timóteo 1:5','personagens','dificil','multipla','2 Timóteo 1:5'),
  q('d021','Quem escreveu Eclesiastes e Provérbios?',['Salomão','Ezra','Moisés','Davi'],0,'Salomão','personagens','dificil','multipla',''),
  q('d022','Profeta que viveu no cativeiro e viu visões de animais?',['Ezequiel','Daniel','Jeremias','Isaías'],0,'Ezequiel 1:4-28','personagens','dificil','multipla','Ezequiel 1:4'),
];

const difícilDoutrinas = [
  q('d023','Incapacidade humana de buscar a Deus — qual conceito?',['Total depravação','Graça irresistível','Expiação limitada','Perseverança dos santos'],0,'TULIP Calvinista','doutrinas','dificil','multipla',''),
  q('d024','V/F: "Hesed" aparece 200+ vezes no AT.',['Verdadeiro','Falso','',''],0,'~245 vezes','doutrinas','dificil','verdadeiro_falso',''),
  q('d025','"Kenosis" em Filipenses 2:7?',['Esvaziamento da divindade','Enchimento do Espírito','Morte do velho homem','Ressurreição'],0,'Filipenses 2:7','doutrinas','dificil','multipla','Filipenses 2:7'),
  q('d026','Ordem correta dos 5 solas?',['Scriptura, Fide, Gratia, Christus, Deo','Fide, Scriptura, Gratia, Deo, Christus','Gratia, Fide, Scriptura, Christus, Deo','Christus, Scriptura, Fide, Gratia, Deo'],0,'Sola Scriptura, Fide, Gratia, Solus Christus, Soli Deo Gloria','doutrinas','dificil','multipla',''),
  q('d027','V/F: "Providência Dei" — Romanos 8:28.',['Verdadeiro','Falso','',''],0,'Provisão divina','doutrinas','dificil','verdadeiro_falso','Romanos 8:28'),
  q('d028','"Propitiação" (ἱλαστήριον) em Romanos 3:25?',['Satisfação da ira divina','Perdão condicional','Expiação parcial','Sacrifício simbólico'],0,'Romanos 3:25','doutrinas','dificil','multipla','Romanos 3:25'),
  q('d029','Ordem dos eventos escatológicos pré-milenista?',['Arrebatamento → Tribulação → Segunda Vinda → Milênio','Milênio → Arrebatamento → Tribulação → Segunda Vinda','Tribulação → Milênio → Arrebatamento → Segunda Vinda','Segunda Vinda → Milênio → Tribulação → Arrebatamento'],0,'Pré-milenismo','doutrinas','dificil','multipla',''),
  q('d030','V/F: Batismo no Espírito é subsequente no pentecostalismo.',['Verdadeiro','Falso','',''],0,'Atos 1:5, 2:4','doutrinas','dificil','verdadeiro_falso','Atos 1:5'),
];

const difícilHistória = [
  q('d031','Ano do início da Reforma Protestante?',['1517','1536','1545','1492'],0,'Lutero finou as 95 teses','historia','dificil','multipla',''),
  q('d032','Menor livro do Antigo Testamento?',['Obadias','Ageu','2 João','3 João'],0,'Obadias — 21 versículos','historia','dificil','multipla',''),
  q('d033','V/F: O Concílio de Niceia estabeleceu o cânone.',['Falso','Verdadeiro','',''],0,'Niceia definiu a natureza de Cristo','historia','dificil','verdadeiro_falso',''),
  q('d034','Quantos livros no AT protestante?',['39','46','24','52'],0,'39 livros','historia','dificil','multipla',''),
  q('d035','Quando a Septuaginta foi traduzida?',['300-200 a.C.','500 a.C.','100 d.C.','100 a.C.'],0,'Séc. III-II a.C.','historia','dificil','multipla',''),
  q('d036','V/F: A Septuaginta foi traduzida por 72 sábios.',['Verdadeiro','Falso','',''],0,'LXX = 72','historia','dificil','verdadeiro_falso',''),
  q('d037','Profeta no exílio com visões?',['Daniel','Isaías','Ezequiel','Jeremias'],0,'Daniel — corte babilônica','historia','dificil','multipla',''),
  q('d038','Cidade onde Paulo escreveu a maioria das cartas pastorais?',['Roma','Corinto','Efeso','Antioquia'],0,'Cartas pastorais de Roma','historia','dificil','multipla',''),
  q('d039','Livro que termina com uma pergunta?',['2 Coríntios','1 Tessalonicenses','Filemon','João'],0,'2 Coríntios','historia','dificil','multipla',''),
  q('d040','Em que ano o Concílio de Niceia se reuniu?',['325 d.C.','381 d.C.','451 d.C.','1054 d.C.'],0,'325 d.C.','historia','dificil','multipla',''),
];

const difícilLínguas = [
  q('d041','Raiz de "Jehovah" (YHWH)?',['YHWH — "Eu Sou"','Adonai — "Senhor"','Elohim — "Deus"','El Shaddai — "Todo-Poderoso"'],0,'Do verbo "ser" (hayah)','linguas','dificil','multipla',''),
  q('d042','"Parakletos" literalmente?',['Chamado ao lado/Advogado','Espírito Santo','Consolador','Professor'],0,'Para + kaleo','linguas','dificil','multipla',''),
  q('d043','V/F: "Immanuel" aparece apenas em Isaías e Mateus.',['Verdadeiro','Falso','',''],0,'Isaías 7:14 e Mateus 1:23','linguas','dificil','verdadeiro_falso','Isaías 7:14'),
  q('d044','"Doxa" (δόξα) significa?',['Glória/Esplendor','Poder','Sabedoria','Amor'],0,'Traduz kabod hebraico','linguas','dificil','multipla',''),
  q('d045','"Soteria" (σωτηρία) significa?',['Salvação/Entrega','Perdão','Santificação','Graça'],0,'Conceito completo da salvação','linguas','dificil','multipla',''),
  q('d046','V/F: "Tehillim" significa "Louvores".',['Verdadeiro','Falso','',''],0,'Nome hebraico de Salmos','linguas','dificil','verdadeiro_falso',''),
  q('d047','"Agape" vs "Eros"?',['Amor sacrificial vs. romântico','Amor fraternal vs. romântico','Amor divino vs. humano','Amor incondicional vs. condicional'],0,'Diferentes tipos de amor','linguas','dificil','multipla',''),
  q('d048','"El Roi" (אֵל רֳאִי) significa?',['Deus que vê','Deus forte','Deus eterno','Deus misericordioso'],0,'Gênesis 16:13','linguas','dificil','multipla','Gênesis 16:13'),
  q('d049','"Charis" (χάρις) deu origem a?',['Carisma','Agape','Pistis','Elpis'],0,'Graça = dom espiritual','linguas','dificil','multipla',''),
  q('d050','V/F: "Bíblia" vem de "biblia" = "livros".',['Verdadeiro','Falso','',''],0,'βιβλία = livros','linguas','dificil','verdadeiro_falso',''),
];

// Build médio and difícil sections
let médioBody = 'const perguntasMedias: PerguntaQuiz[] = [\n';
for (const arr of [médioVersículos, médioPersonagens, médioDoutrinas, médioHistória, médioLínguas]) {
  for (const p of arr) {
    médioBody += `  q('${p.id}',${JSON.stringify(p.enunciado)},${JSON.stringify(p.opcoes)},${p.respostaCorreta},${JSON.stringify(p.explicacao)},'${p.categoria}','${p.nivel}','${p.tipo}'${p.referencia ? ",'" + p.referencia + "'" : ''}),\n`;
  }
}
médioBody += '];\n';

let difícilBody = 'const perguntasDificeis: PerguntaQuiz[] = [\n';
for (const arr of [difícilVersículos, difícilPersonagens, difícilDoutrinas, difícilHistória, difícilLínguas]) {
  for (const p of arr) {
    difícilBody += `  q('${p.id}',${JSON.stringify(p.enunciado)},${JSON.stringify(p.opcoes)},${p.respostaCorreta},${JSON.stringify(p.explicacao)},'${p.categoria}','${p.nivel}','${p.tipo}'${p.referencia ? ",'" + p.referencia + "'" : ''}),\n`;
  }
}
difícilBody += '];\n';

const footer = `
export const todasPerguntas: PerguntaQuiz[] = [
  ...perguntasFacis,
  ...perguntasMedias,
  ...perguntasDificeis,
];

export function obterPerguntas(
  nivel?: NivelQuiz,
  categoria?: CategoriaQuiz,
  quantidade: number = 10,
): PerguntaQuiz[] {
  let perguntas = [...todasPerguntas];
  if (nivel) perguntas = perguntas.filter(p => p.nivel === nivel);
  if (categoria) perguntas = perguntas.filter(p => p.categoria === categoria);
  for (let i = perguntas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [perguntas[i], perguntas[j]] = [perguntas[j], perguntas[i]];
  }
  return perguntas.slice(0, quantidade);
}

export function obterPerguntasPorLivro(
  livro: string,
  nivel?: NivelQuiz,
  quantidade: number = 10,
): PerguntaQuiz[] {
  let perguntas = [...todasPerguntas];
  if (nivel) perguntas = perguntas.filter(p => p.nivel === nivel);
  perguntas = perguntas.filter(p => p.referencia && p.referencia.toLowerCase().includes(livro.toLowerCase()));
  for (let i = perguntas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [perguntas[i], perguntas[j]] = [perguntas[j], perguntas[i]];
  }
  return perguntas.slice(0, quantidade);
}

export function obterDesafioDiario(): PerguntaQuiz[] {
  const hoje = new Date();
  const seed = hoje.getFullYear() * 10000 + (hoje.getMonth() + 1) * 100 + hoje.getDate();
  const perguntas = [...todasPerguntas];
  let rng = seed;
  const pseudoRandom = () => { rng = (rng * 1103515245 + 12345) & 0x7fffffff; return rng / 0x7fffffff; };
  for (let i = perguntas.length - 1; i > 0; i--) {
    const j = Math.floor(pseudoRandom() * (i + 1));
    [perguntas[i], perguntas[j]] = [perguntas[j], perguntas[i]];
  }
  return perguntas.slice(0, 15);
}

export const LIVROS_BIBLIA = [
  'Gênesis','Êxodo','Levítico','Números','Deuteronômio',
  'Josué','Juízes','Rute','1 Samuel','2 Samuel',
  '1 Reis','2 Reis','1 Crônicas','2 Crônicas',
  'Esdras','Neemias','Ester','Jó','Salmos',
  'Provérbios','Eclesiastes','Cantares',
  'Isaías','Jeremias','Lamentações','Ezequiel','Daniel',
  'Oséias','Joel','Amós','Obadias','Jonas','Miquéias',
  'Naum','Habacuque','Sofonias','Ageu','Zacarias','Malaquias',
  'Mateus','Marcos','Lucas','João','Atos',
  'Romanos','1 Coríntios','2 Coríntios','Gálatas','Efésios',
  'Filipenses','Colossenses','1 Tessalonicenses','2 Tessalonicenses',
  '1 Timóteo','2 Timóteo','Tito','Filemom','Hebreus',
  'Tiago','1 Pedro','2 Pedro','1 João','2 João','3 João',
  'Judas','Apocalipse',
];
`;

const total = F.length + médioVersículos.length + médioPersonagens.length + médioDoutrinas.length + médioHistória.length + médioLínguas.length + difícilVersículos.length + difícilPersonagens.length + difícilDoutrinas.length + difícilHistória.length + difícilLínguas.length;

const fullFile = header + '\n' + body + '\n' + médioBody + '\n' + difícilBody + '\n' + footer;

fs.writeFileSync(out, fullFile, 'utf8');
console.log('Total questions: ' + total);
console.log('File written to: ' + out);
console.log('File size: ' + Math.round(fullFile.length / 1024) + ' KB');
console.log('Facil: ' + F.length);
console.log('Medio: ' + (médioVersículos.length + médioPersonagens.length + médioDoutrinas.length + médioHistória.length + médioLínguas.length));
console.log('Dificil: ' + (difícilVersículos.length + difícilPersonagens.length + difícilDoutrinas.length + difícilHistória.length + difícilLínguas.length));
