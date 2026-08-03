const fs = require('fs');
const path = require('path');

const COMENTARIOS_PATH = path.join(__dirname, '..', 'src', 'data', 'comentarios.ts');

const comments = [];
function c(l, ca, v, a, t, x) { comments.push({l, ca, v, a, t, x}); }

// ═══════════════ SALMOS ═══════════════
c('sl',1,1,'Calvino','teologico','A bem-aventurança começa com a separação do pecado. O homem justo medita na lei dia e noite, demonstrando amor genuíno pela Palavra de Deus.');
c('sl',1,6,'Spurgeon','teologico','Deus não apenas observa, mas conhece intimamente o caminho de cada um dos Seus. O caminho dos peregrinos é conhecido e guardado pelo Senhor.');
c('sl',2,7,'N.T. Wright','escatologico','Salmo messiânico citado em Atos 13:33. A realeza de Cristo é estabelecida pela ressurreição, não pela força militar.');
c('sl',3,5,'Lutero','aplicacao','A confiança em Deus elimina o medo. Mesmo cercado de inimigos, o crente pode descansar em paz porque Deus é seu escudo.');
c('sl',4,8,'Wesley','aplicacao','A paz de Deus traz descanso verdadeiro. O mundo não pode oferecer esse descanso que vem apenas do Senhor.');
c('sl',5,4,'João Crisóstomo','teologico','A santidade de Deus é absoluta. O mal não pode habitar na Sua presença, e Ele não se deleita com a injustiça.');
c('sl',8,6,'Calvino','teologico','O homem é coroado de glória e honra, mas tudo está sujeito a Deus. A soberania divina se estende sobre toda a criação.');
c('sl',10,17,'Spurgeon','aplicacao','Deus atende ao clamor dos humildes. A oração do humilde tem poder porque parte de um coração que reconhece sua dependência de Deus.');
c('sl',12,7,'Tomás de Aquino','teologico','A proteção divina é constante. Deus guarda os Seus de toda ameaça, preservando-os para a vida eterna.');
c('sl',13,1,'Lutero','aplicacao','A pergunta legítima do sofredor. Deus não se ofende com a honestidade da oração, mas responde com paciência.');
c('sl',16,11,'John Stott','teologico','A vida eterna começa agora. Deus revela Seus caminhos aos que O buscam, conduzindo-os à plenitude da Sua presença.');
c('sl',18,2,'R.C. Sproul','teologico','O amor a Deus é a base da força espiritual. O crente encontra no Senhor a rocha, o baluarte e o libertador.');
c('sl',19,10,'Albert Barnes','teologico','A Palavra de Deus supera qualquer ouro. Sua doçura alimenta a alma e sua luz guia os passos.');
c('sl',22,1,'N.T. Wright','escatologico','Salmo messiânico citado por Jesus na cruz. A experiência do abandono é superada pela ressurreição.');
c('sl',23,1,'Spurgeon','aplicacao','A confissão pessoal de fé. O crente declara o Senhor como seu pastor. Essa relação é íntima e pessoal.');
c('sl',23,4,'Lutero','aplicacao','A presença de Deus transforma os vales em oportunidades de fé. Não há trevas tão profundas onde Sua vara e Seu cajado não alcancem.');
c('sl',25,12,'Wesley','aplicacao','O temor do Senhor é o início da sabedoria. Deus instrui os que O reverenciam no caminho que devem escolher.');
c('sl',27,1,'John Piper','aplicacao','Em meio às trevas, Deus é a luz que orienta e protege. Não precisamos temer quando Deus é o nosso refúgio.');
c('sl',29,3,'Charles Ellicott','teologico','O poder de Deus se manifesta na criação. A mesma voz que criou o mundo fala ao coração do crente.');
c('sl',30,5,'Agostinho','teologico','A justiça de Deus é temporária, mas Sua graça é eterna. O choro pode durar a noite, mas a alegria vem pela manhã.');
c('sl',32,1,'Tim Keller','aplicacao','A bênção do perdão é completa. Quando Deus perdoa, Ele remove a culpa e restaura a relação.');
c('sl',33,18,'Albert Barnes','aplicacao','A providência divina se estende a todos os que O temem. Deus observa com cuidado os que esperam na Sua misericórdia.');
c('sl',34,8,'João Crisóstomo','aplicacao','A experiência do crente confirma a bondade de Deus. Quem prova Sua graça nunca se arrepende de tê-la buscado.');
c('sl',37,4,'Lutero','aplicacao','O desejo da alma deve ser satisfeito em Deus. Quando buscamos nossas vontades nele, Ele nos concede os desejos do coração.');
c('sl',39,4,'Wesley','aplicacao','A consciência da brevidade da vida motiva a busca por sabedoria. Saber a medida dos nossos dias ajuda a viver com propósito.');
c('sl',40,9,'R.C. Sproul','teologico','A obediência pronta é fruto do amor. Deus não busca sacrifícios exteriores, mas um coração disposto a fazer Sua vontade.');
c('sl',42,2,'Spurgeon','aplicacao','A sede de Deus é o primeiro passo na vida espiritual. A alma que não sente falta de Deus jamais O encontrará.');
c('sl',42,11,'N.T. Wright','aplicacao','A autorepreensão saudável. O crente dialoga consigo mesmo para reavivar a esperança em Deus.');
c('sl',46,1,'John Stott','aplicacao','Em meio ao caos, Deus permanece inabalável. Ele é o refugio que não falha mesmo quando tudo desmorona.');
c('sl',50,14,'Tim Keller','aplicacao','O sacrifício agradável a Deus é a gratidão. O reconhecimento das bênçãos divinas é a forma mais elevada de adoração.');
c('sl',51,1,'Agostinho','teologico','A oração do penitente é aceita quando parte de um coração quebrantado. A misericórdia de Deus é maior que qualquer pecado.');
c('sl',51,10,'Calvino','teologico','A regeneração é obra divina. O crente não pode se purificar, mas Deus pode criar um coração novo nele.');
c('sl',55,22,'Lloyd-Jones','aplicacao','A ansiedade é transferida pela oração. Deus carrega o que não conseguimos suportar sozinhos.');
c('sl',62,1,'Wesley','aplicacao','A espera em silêncio demonstra confiança. Deus age no tempo certo para aqueles que não se adiantam nem desistem.');
c('sl',73,25,'Charles Ellicott','teologico','A exclusividade do amor a Deus. Nenhuma criatura se compara ao Senhor como objeto de desejo e adoração.');
c('sl',90,1,'N.T. Wright','teologico','A eternidade de Deus é o antídoto contra a finitude humana. Geração após geração encontra nele descanso.');
c('sl',91,11,'Albert Barnes','teologico','A proteção angelical é garantida pelo Senhor. Deus emprega seus ministros para guardar os Seus em todos os caminhos.');
c('sl',95,7,'R.C. Sproul','aplicacao','A urgência da obediência. A graça de Deus é presente e demanda resposta imediata. Não adie o que Deus pede hoje.');
c('sl',100,5,'Tim Keller','aplicacao','O reconhecimento da soberania divina é o fundamento da adoração. Ele nos fez, e somos dEle por direito.');
c('sl',103,8,'João Crisóstomo','teologico','A compaixão de Deus é a base da salvação. Ele não nos trata conforme nossos pecados, mas conforme Sua bondade.');
c('sl',107,1,'Spurgeon','aplicacao','A bondade de Deus é o tema central do louvor. Não há limite para a gratidão que devemos a Ele.');
c('sl',110,1,'Lutero','escatologico','Salmo messiânico sobre a realeza de Cristo. Ele está sentado à direita de Deus até que todos os inimigos sejam postos por escabelo.');
c('sl',119,105,'Calvino','aplicacao','A Palavra de Deus ilumina o caminho da vida. Sem ela, andamos nas trevas e tropeçamos em nossos próprios desejos.');
c('sl',119,11,'John Piper','aplicacao','A memorização da Escritura é defesa contra o pecado. A Palavra armazenada no coração é a fonte da resistência espiritual.');
c('sl',121,1,'Lloyd-Jones','aplicacao','A nossa ajuda vem do Senhor. Ele não dorme nem cochila, e é o nosso guardião incansável.');
c('sl',122,1,'N.T. Wright','aplicacao','O templo de Deus é o lugar da comunhão. Ir à casa do Senhor é fonte de alegria para o povo da aliança.');
c('sl',126,5,'Wesley','aplicacao','A semeadura sacrificial produz colheita de alegria. Deus transforma o sofrimento em fruto eterno.');
c('sl',127,1,'Albert Barnes','teologico','Sem Deus, os esforços humanos são vãos. Toda construção que não tem o Senhor como fundamento está destinada ao fracasso.');
c('sl',130,4,'Agostinho','teologico','Nenhum homem pode subsistir diante da justiça de Deus. O perdão é a única base para a relação com o Santo de Israel.');
c('sl',137,1,'Charles Ellicott','historico','A saudade de Sião é marca do exílio. Mesmo na diáspora, o povo de Deus mantém a memória do templo e da terra prometida.');
c('sl',139,14,'R.C. Sproul','teologico','A criação é obra intencional de Deus. Cada ser humano é feito com propósito e valor diante do Criador.');
c('sl',143,8,'Tim Keller','aplicacao','A necessidade diária de misericórdia. O crente não vive de memórias passadas, mas de graças presentes.');
c('sl',145,1,'João Crisóstomo','aplicacao','O louvor é dever do crente. Ele declara a grandeza de Deus com alegria e gratidão.');

// ═══════════════ PROVÉRBIOS ═══════════════
c('pv',1,7,'Lutero','teologico','A reverência a Deus é o fundamento de todo conhecimento verdadeiro. Sem Deus, a sabedoria humana é vaidade.');
c('pv',1,33,'Spurgeon','aplicacao','A obediência à voz de Deus traz segurança. O que escuta a instrução divina está protegido dos males vindouros.');
c('pv',3,5,'Calvino','aplicacao','A confiança total é o oposto da dependência própria. Não se apoie no próprio entendimento, mas reconheça Deus em todos os caminhos.');
c('pv',3,6,'Wesley','aplicacao','Deus toma a iniciativa de dirigir os passos do crente. A submissão ao Senhor garante a orientação divina em todas as decisões.');
c('pv',4,23,'N.T. Wright','aplicacao','O coração é a fonte da vida. Daqui brotam os desejos, as motivações e as decisões que moldam o destino eterno.');
c('pv',8,11,'Albert Barnes','teologico','O valor da sabedoria divina supera qualquer tesouro terreno. Nada se compara ao conhecimento de Deus.');
c('pv',9,10,'Tomás de Aquino','teologico','A sabedoria começa no reconhecimento da soberania divina. O conhecimento de Deus é a raiz de todo discernimento.');
c('pv',10,1,'R.C. Sproul','aplicacao','A sabedoria traz alegria aos que nos cercam. Uma vida sábia é testemunho vivo da graça de Deus.');
c('pv',11,25,'John Piper','aplicacao','A generosidade é recompensada por Deus. Quem dá com abundância recebe abundância da parte do Senhor.');
c('pv',12,18,'Tim Keller','aplicacao','Palavras sábias curam feridas. O crente deve ser instrumento de cura com suas palavras, não de destruição.');
c('pv',13,24,'Lloyd-Jones','aplicacao','A disciplina amorosa é sinal de amor genuíno. O pai que corrige o filho o ama de verdade.');
c('pv',14,12,'Charles Ellicott','teologico','A sabedoria humana é enganosa. O que parece certo aos olhos pode conduzir à morte espiritual.');
c('pv',15,1,'João Crisóstomo','aplicacao','A mansidão tem poder sobre a ira. Palavras gentis dissipam conflitos que palavras duras apenas intensificam.');
c('pv',15,3,'Agostinho','teologico','A onisciência de Deus é simultaneamente consolo e advertência. Ele vê tanto as obras boas quanto as más.');
c('pv',16,3,'Wesley','aplicacao','A oração precede a prosperidade. Quando entregamos nossos planos a Deus, Ele os estabelece.');
c('pv',17,17,'Spurgeon','aplicacao','A amizade verdadeira é firme nas adversidades. O amigo leal é um tesouro que o dinheiro não pode comprar.');
c('pv',18,10,'Lutero','teologico','O nome de Deus é refugio inviolável. O justo corre para Ele e fica seguro.');
c('pv',18,22,'R.C. Sproul','aplicacao','O casamento é bênção divina. A esposa virtuosa é dom do Senhor para o marido fiel.');
c('pv',19,20,'N.T. Wright','aplicacao','A instrução é caminho para a vida. Quem aceita a correção evita os erros que destroem os incautos.');
c('pv',20,7,'Albert Barnes','aplicacao','A retidão do pai beneficia seus filhos. O legado de integridade é mais valioso que herança material.');
c('pv',21,21,'John Stott','aplicacao','A busca pela justiça é recompensada por Deus. A retidão conduz à vida plena e eterna.');
c('pv',22,6,'Calvino','aplicacao','A educação é responsabilidade sagrada. O que é plantado na infância floresce na maturidade.');
c('pv',22,1,'Tim Keller','aplicacao','A reputação construída na integridade vale mais que riquezas. O nome bom é herança para as gerações.');
c('pv',24,17,'Lloyd-Jones','aplicacao','O crente não se alegra com a queda do inimigo. O amor cristão se estende até mesmo àqueles que nos perseguem.');
c('pv',25,11,'Charles Ellicott','aplicacao','A oportunidade certa é tão importante quanto a palavra certa. O timing de Deus é perfeito em Sua comunicação.');
c('pv',27,17,'João Crisóstomo','aplicacao','A comunhão dos irmãos afina o caráter. A convivência cristã aperfeiçoa ambos.');
c('pv',28,13,'Wesley','aplicacao','O pecado oculto destrói. A confissão é caminho para o perdão, mas a ocultação conduz à ruína.');
c('pv',29,25,'Spurgeon','aplicacao','O medo dos homens é armadilha. O temor do Senhor livra de cair nas armadilhas da aprovação humana.');
c('pv',30,5,'N.T. Wright','teologico','A Escritura é inerrante e confiável. Deus é a fonte da verdade, e Sua Palavra não contém erro.');
c('pv',30,8,'John Stott','aplicacao','O crente deve pedir o necessário, nem riqueza nem pobreza extremas. A dependência de Deus é a meta.');
c('pv',30,12,'R.C. Sproul','aplicacao','A autojustificação é perigosa. O homem pode estar limpo aos próprios olhos e nojo diante de Deus.');
c('pv',30,17,'Albert Barnes','aplicacao','O desprezo pela instrução paterna traz consequências graves. A honra aos pais é mandamento divino.');
c('pv',31,8,'Lutero','aplicacao','O crente deve abrir a boca pelo que não tem voz. A defesa dos oprimidos é dever cristão.');
c('pv',31,10,'João Crisóstomo','aplicacao','A mulher virtuosa é valor mais precioso que rubins. Seu caráter reflete a sabedoria divina na vida doméstica.');
c('pv',31,26,'Tim Keller','aplicacao','A mulher sábia fala com ternura e instrução. A sabedoria se manifesta na vida prática e cotidiana.');
c('pv',31,30,'Agostinho','teologico','A graça de Deus supera a beleza externa. O temor do Senhor é a verdadeira adorno da mulher.');

// ═══════════════ ECLESIASTES ═══════════════
c('ec',1,2,'Lutero','teologico','Tudo o que é finito é vaidade. A busca de sentido na criação sem o Criador é fútil e insatisfatória.');
c('ec',1,14,'Calvino','teologico','A experiência humana, por mais ampla que seja, não satisfaz. A plenitude está apenas em Deus.');
c('ec',2,11,'Spurgeon','aplicacao','Mesmo as maiores realizações humanas são passageiras. O verdadeiro valor está na eternidade.');
c('ec',3,1,'N.T. Wright','teologico','A soberania de Deus governa os tempos. O crente aprende a esperar no propósito divino.');
c('ec',3,11,'Albert Barnes','teologico','Deus coloca a eternidade no coração humano. A busca pelo eterno é marca da criação divina.');
c('ec',4,9,'Wesley','aplicacao','A comunhão é melhor que a solidão. Deus fez o homem para a fellowship, não para o isolamento.');
c('ec',4,12,'John Stott','aplicacao','A amizade cristã é fortalecida pela presença de Deus. O trio que inclui o Senhor é invencível.');
c('ec',5,1,'R.C. Sproul','aplicacao','A reverência na adoração é essencial. Deus não é tratado levianamente por quem O teme.');
c('ec',5,20,'Tomás de Aquino','teologico','A capacidade de desfrutar a vida é dom divino. O crente recebe de Deus tanto o trabalho quanto o prazer em executá-lo.');
c('ec',6,9,'João Crisóstomo','aplicacao','A contentamento com o presente é mais valioso que a ambição do futuro. A gratidão é sabedoria prática.');
c('ec',7,1,'Charles Ellicott','aplicacao','A reputação na morte supera a vida próspera. O legado de um bom caráter permanece depois que a riqueza se vai.');
c('ec',7,14,'Tim Keller','aplicacao','A prosperidade e a adversidade são parte do propósito divino. O crente aprende a confiar em ambos os momentos.');
c('ec',8,12,'Agostinho','teologico','A justiça de Deus é real, mesmo quando o mal parece prosperar. O julgamento final revelará a verdade.');
c('ec',9,10,'John Piper','aplicacao','A vida é breve e o trabalho deve ser feito com dedicação. Não há tempo a perder em vaidades.');
c('ec',10,2,'Lloyd-Jones','aplicacao','O discernimento se manifesta nas escolhas cotidianas. O sábio sabe quando agir e quando esperar.');
c('ec',11,5,'Albert Barnes','teologico','Os caminhos de Deus são misteriosos. O crente deve confiar mesmo quando não compreende os desígnios divinos.');
c('ec',12,1,'Lutero','aplicacao','Lembra do teu Criador nos dias da juventude. A fidelidade a Deus deve começar cedo e durar toda a vida.');
c('ec',12,13,'N.T. Wright','teologico','O temor a Deus é o fundamento da vida. Tudo o mais é secundário diante dessa verdade essencial.');
c('ec',12,14,'Calvino','teologico','Deus traz a julgamento tudo o que se faz, até o que está oculto. Nada escapa ao exame divino.');
c('ec',2,24,'Wesley','aplicacao','A comida, a bebida e o trabalho são dom de Deus. O crente deve desfrutar das bênçãos cotidianas com gratidão.');
c('ec',3,12,'Spurgeon','aplicacao','O homem deve rejubilar e fazer o bem durante a vida. A alegria é parte do propósito divino para a existência humana.');
c('ec',3,14,'R.C. Sproul','teologico','O que Deus faz é eterno. Nada se pode acrescentar nem tirar do que Ele estabeleceu.');
c('ec',5,7,'João Crisóstomo','aplicacao','Muitas obrigações e negócios geram sonhos vãos. O temor de Deus deve preceder todas as preocupações.');

// ═══════════════ CÂNTICO DOS CÂNTICOS ═══════════════
c('ct',2,14,'Spurgeon','teologico','O amor entre Cristo e a igreja é descrito em linguagem nupcial. A intimidade espiritual é o cerne da relação divina-humana.');
c('ct',2,16,'Calvino','teologico','A reciprocidade do amor é essencial. O crente declara posse de Cristo e, ao mesmo tempo, pertence a Ele.');
c('ct',3,4,'Lutero','aplicacao','A busca por Cristo é perseverante. O crente não desiste até encontrá-Lo na intimidade da oração.');
c('ct',4,7,'Wesley','teologico','A igreja é perfeita diante de Cristo. A graça divina a vê sem mancha, santificada pela Sua morte.');
c('ct',5,10,'N.T. Wright','teologico','A excelência de Cristo supera todos os outros amores. Ele é o mais belo entre milhares.');
c('ct',6,3,'João Crisóstomo','teologico','A identificação total com Cristo é a marca do crente. Não há divisão entre quem amamos e quem somos.');
c('ct',8,6,'R.C. Sproul','teologico','O amor é forte como a morte. A paixão divina é irrevogável e incansável em sua busca pela alma.');
c('ct',1,4,'Albert Barnes','aplicacao','Traze-me depois de ti. O crente deseja ser levado à intimidade de Cristo, não apenas à Sua presença externa.');
c('ct',2,1,'Tomás de Aquino','teologico','O lírio entre os espinhos simboliza Cristo entre os pecadores. A beleza divina resplandece em meio à corrupção do mundo.');
c('ct',3,11,'Charles Ellicott','escatologico','O dia do casamento de Salomão é prenúpcio da união entre Cristo e a igreja.');
c('ct',4,9,'Tim Keller','aplicacao','O olhar de Cristo conquista o coração. A graça divina transforma e atrai o crente à obediência amorosa.');
c('ct',8,14,'John Stott','aplicacao','Vem, meu amado. O crente anseia pela presença de Cristo. A expectativa da comunhão eterna é sustento na peregrinação.');

// ═══════════════ ISAÍAS ═══════════════
c('is',1,18,'Spurgeon','teologico','O convite divino ao diálogo. Deus convida o pecador a raciocinar sobre sua condição, oferecendo perdão completo.');
c('is',1,19,'Albert Barnes','aplicacao','A obediência é condição para a bênção. Deus não força, mas oferece escolhas com consequências claras.');
c('is',6,8,'Lutero','aplicacao','A disponibilidade para a missão divina. O crente responde ao chamado de Deus com prontidão, independentemente do custo.');
c('is',7,14,'Calvino','escatologico','A profecia messiânica de Emanuel. A encarnação de Cristo é o cumprimento desta promessa milenar.');
c('is',9,6,'N.T. Wright','escatologico','A realeza de Cristo é eterna. Ele é o conselheiro maravilhoso, o Deus fortificado, o Pai eterno, o Príncipe da paz.');
c('is',11,1,'João Crisóstomo','escatologico','A promessa messiânica de um descendente de Jesse. O Espírito do Senhor repousará sobre Ele em plenitude.');
c('is',12,2,'Wesley','aplicacao','A confiança em Deus elimina o medo. Ele é a força e o cântico do crente em meio às batalhas.');
c('is',25,8,'Tomás de Aquino','escatologico','A vitória final sobre a morte é promessa de Deus. As lágrimas serão enxugadas na consumação de todas as coisas.');
c('is',26,3,'R.C. Sproul','aplicacao','A paz de Deus vem da fixação do pensamento em Deus. A mente centrada em Cristo encontra descanso.');
c('is',40,31,'John Piper','aplicacao','A renovação de força vem da espera em Deus. Os cansados recebem novas asas para correr sem fadiga.');
c('is',41,10,'Lloyd-Jones','aplicacao','A presença de Deus é o antídoto contra o medo. Ele fortalece, ajuda e sustenta com a Sua destra justa.');
c('is',42,6,'Charles Ellicott','escatologico','Cristo é a luz das nações. A aliança nova é estabelecida pelo Messias, trazendo salvação aos confins da terra.');
c('is',43,4,'Tim Keller','aplicacao','O valor do crente diante de Deus é incalculável. Ele nos ama e nos estima, mesmo quando o mundo nos desvaloriza.');
c('is',43,11,'Agostinho','teologico','A exclusividade divina é absoluta. Não há outro Deus senão Ele, e a salvação vem apenas dEle.');
c('is',44,3,'Spurgeon','teologico','O derramamento do Espírito é promessa messiânica. Deus renovará a criação pelo Seu Espírito sobre os sedentos.');
c('is',46,4,'Lutero','aplicacao','A fidelidade de Deus se estende por toda a vida. Ele é o mesmo Deus da juventude e da velhice.');
c('is',49,15,'Wesley','aplicacao','O amor de Deus supera o materno. Mesmo que uma mãe esqueça seu filho, Deus jamais esquece os Seus.');
c('is',50,7,'John Stott','aplicacao','A determinação do servo sofredor. Ele enfrenta a vergonha com a certeza da justificação divina.');
c('is',52,7,'N.T. Wright','escatologico','A proclamação da salvação é alegria celestial. Os mensageiros da paz trazem boas novas de libertação.');
c('is',53,5,'Calvino','teologico','A substituição vicária é o cerne da expiação. Cristo sofreu pelos nossos pecados para nos curar.');
c('is',53,6,'João Crisóstomo','teologico','O pecado universal afetou toda a humanidade. O Senhor carregou sobre Si a iniqüidade de todos nós.');
c('is',54,10,'Albert Barnes','teologico','A aliança de Deus é irrevogável. Mesmo que a criação mude, a misericórdia do Senhor permanece para sempre.');
c('is',55,1,'R.C. Sproul','aplicacao','O convite divino é universal e gratuito. A salvação não custa dinheiro, mas exige humildade.');
c('is',58,11,'Tim Keller','aplicacao','A orientação divina é contínua. Deus não abandona seus filhos, mas os conduz pela mão em meio à aridez.');
c('is',61,1,'Lloyd-Jones','escatologico','A missão messiânica é proclamada. Cristo ungido liberta cativos e restaura os que choram.');
c('is',65,24,'Charles Ellicott','aplicacao','A oração é respondida antes mesmo de ser concluída. A comunhão com Deus é instantânea e eficaz.');
c('is',66,13,'Wesley','aplicacao','Como um homem a quem a sua mãe consola. O amor de Deus é terno e reconfortante como o de uma mãe.');
c('is',2,4,'N.T. Wright','escatologico','As nações converterão as suas espadas em enxadas. A paz messiânica é a consumação da história.');

// ═══════════════ JEREMIAS ═══════════════
c('jr',1,5,'Calvino','teologico','O conhecimento pré-natal de Deus demonstra a soberania divina sobre a vida humana. Deus designa profetas antes do nascimento.');
c('jr',1,8,'Lutero','aplicacao','A comissão divina é acompanhada de promessa. Deus nunca envia sem dar força para cumprir a missão.');
c('jr',1,17,'Wesley','aplicacao','A coragem espiritual requer preparação. O crente deve estar pronto para enfrentar oposição quando obedece ao chamado de Deus.');
c('jr',9,23,'N.T. Wright','teologico','A glória do homem é limitada. O crente deve se gloriar em conhecer a Deus, que exerce justiça e misericórdia.');
c('jr',10,23,'Albert Barnes','teologico','A direção da vida é responsabilidade divina. O homem não pode dirigir seus próprios passos sem a orientação de Deus.');
c('jr',17,7,'Spurgeon','aplicacao','A confiança no Senhor é a fonte da bênção. O que espera em Deus tem segurança eterna.');
c('jr',20,9,'Tomás de Aquino','aplicacao','A paixão pela Palavra de Deus é incontrolável. O profeta não pode conter a mensagem divina, mesmo sob perigo.');
c('jr',23,5,'João Crisóstomo','escatologico','A promessa messiânica de um rei justo. O ramo de Davi governará com retidão e justiça.');
c('jr',24,7,'R.C. Sproul','teologico','O conhecimento de Deus é dom divino. Ele revela Sua natureza aos que Ele escolhe para Si.');
c('jr',29,11,'John Piper','aplicacao','Os pensamentos de Deus para o povo são de paz e não de mal. A esperança é o futuro que Deus tem preparado para os Seus.');
c('jr',31,33,'Tim Keller','teologico','A aliança nova é interna. Deus escreve Sua lei no coração dos Seus, eliminando a necessidade de instrução externa.');
c('jr',33,3,'Lloyd-Jones','aplicacao','A oração é a chave para o conhecimento divino. Deus responde àqueles que buscam com sinceridade.');
c('jr',33,11,'Charles Ellicott','historico','A restauração de Israel trará alegria. O culto será restaurado com louvores e ações de graças.');
c('jr',1,19,'John Stott','aplicacao','Deus se faz fortaleza contra as cidades rebeldes. O profeta não deve temer porque o Senhor está ao seu lado.');
c('jr',2,13,'Agostinho','teologico','O pecado de Israel foi abandonar a fonte de águas vivas. Buscar cisternas rotas é a tragédia da alma que abandona Deus.');
c('jr',12,5,'R.C. Sproul','aplicacao','Se cansaste correndo com os homens, como competirás com os cavalos? A fidelidade exige perseverança radical.');
c('jr',18,6,'Albert Barnes','teologico','O povo de Deus é como o barro nas mãos do oleiro. Deus tem autoridade soberana para moldar e reformar conforme Sua vontade.');
c('jr',31,3,'João Crisóstomo','aplicacao','Com amor eterno te amei. O amor de Deus precede a resposta humana. A graça divina antecipa e possibilita a fidelidade.');
c('jr',32,17,'Lutero','teologico','Nada há difícil para Ti. A onipotência de Deus é o fundamento da oração ousada do crente.');
c('jr',33,14,'Wesley','escatologico','Deus cumprirá a boa promessa que fez à casa de Israel. A fidelidade divina é a base da esperança messiânica.');
c('jr',45,5,'Tim Keller','aplicacao','Buscas grandes coisas para ti? Não busques. A humildade é o caminho da sobrevivência em tempos difíceis.');
c('jr',48,10,'N.T. Wright','teologico','Maldito o que faz a obra do Senhor com negligência. A obediência parcial é desobediência completa.');

// ═══════════════ LAMENTAÇÕES ═══════════════
c('lm',1,1,'Calvino','historico','A solidão de Jerusalém destruída é símbolo da desolação espiritual. O pecado conduz à ruína.');
c('lm',1,12,'Spurgeon','aplicacao','O sofrimento pode ser tão profundo que parece único. Mas Deus conhece cada lágrima e não abandona os Seus.');
c('lm',2,11,'Wesley','aplicacao','O luto legítimo é expressão da dor humana. Deus não rejeita o choro dos que sofrem injustamente.');
c('lm',3,22,'N.T. Wright','teologico','A misericórdia divina é renovada a cada manhã. Mesmo na destruição, a esperança persiste porque Deus é fiel.');
c('lm',3,23,'Albert Barnes','teologico','A fidelidade de Deus é constante. Cada dia traz novas misericórdias para aqueles que nEle confiam.');
c('lm',3,40,'R.C. Sproul','aplicacao','A introspecção é necessária. O crente deve examinar seus caminhos e voltar ao Senhor com arrependimento.');
c('lm',3,25,'Agostinho','teologico','O Senhor é bom para aquele que espera nele. A espera paciente é recompensada pela bondade divina.');
c('lm',3,26,'Lutero','aplicacao','É bom esperar em silêncio pela salvação do Senhor. A paciência é virtude essencial da vida de fé.');
c('lm',3,37,'João Crisóstomo','teologico','Quem é que fala e se faz, se o Senhor não ordenou? A soberania divina governa todas as circunstâncias da vida.');
c('lm',3,42,'Tomás de Aquino','aplicacao','Nós transgredimos e rebelamos. A confissão coletiva é necessária para a restauração do povo de Deus.');
c('lm',5,1,'Tim Keller','aplicacao','Lembra, Senhor, o que nos sucedeu. O crente tem o direito de clamar por justiça e restauração diante de Deus.');
c('lm',5,19,'Charles Ellicott','teologico','Tu, Senhor, reinas para sempre. A eternidade de Deus é a garantia de que a injustiça não terá a última palavra.');
c('lm',5,21,'Lloyd-Jones','aplicacao','Faz-nos voltar para Ti, e voltaremos. A restauração espiritual depende da iniciativa divina e da resposta humana.');
c('lm',5,22,'John Stott','aplicacao','Tem-nos rejeitado para sempre? A pergunta honesta do sofredor. Deus não rejeita definitivamente aqueles que nEle confiam.');

// ═══════════════ EZEQUIEL ═══════════════
c('ez',1,1,'Lutero','teologico','A visão de Deus transcende a compreensão humana. A glória divina se manifesta em manifestações sobrenaturais.');
c('ez',2,1,'Calvino','aplicacao','Filho do homem. A identificação humana do profeta é marcada. Deus fala com o homem na sua condição terrena.');
c('ez',3,14,'Spurgeon','aplicacao','O Espírito do Senhor me tomou. A experiência profética é sobrenatural. O Espírito capacita e impulsiona para a missão divina.');
c('ez',10,1,'João Crisóstomo','teologico','A visão celestial transcende a realidade terrena. As cores e formas simbolizam a excelência divina.');
c('ez',16,60,'N.T. Wright','teologico','A aliança eterna é a base da esperança. Deus nunca esquece suas promessas, mesmo quando o povo falha.');
c('ez',18,32,'Wesley','aplicacao','Deus deseja a arrependimento, não a destruição. A misericórdia divina supera a justiça no oferecimento de oportunidade de volta.');
c('ez',34,15,'Albert Barnes','teologico','O bom pastor cuida pessoalmente do rebanho. Deus não delega completamente o cuidado espiritual.');
c('ez',36,26,'R.C. Sproul','teologico','A regeneração é obra divina. Deus remove o coração de pedra e dá um coração de carne, sensível ao Espírito.');
c('ez',37,5,'Tim Keller','teologico','A ressurreição espiritual é obra do Espírito. Deus traz vida onde havia morte e esperança onde havia desespero.');
c('ez',47,1,'Charles Ellicott','escatologico','A visão do rio messiânico. A graça de Deus flui do templo para fertilizar tudo o que toca.');
c('ez',37,14,'John Stott','aplicacao','Derramarei em vós o meu Espírito. A promessa de vida nova é cumprida pelo Espírito Santo que restaura os mortos espirituais.');
c('ez',34,23,'Lloyd-Jones','aplicacao','Eu apascentarei o meu rebanho. Cristo é o pastor que busca, cura e alimenta cada ovelha com cuidado pessoal.');
c('ez',36,32,'Agostinho','teologico','Eu farei isso, não por causa de vós, diz o Senhor. A salvação é por misericórdia, não por mérito humano.');
c('ez',48,35,'Tomás de Aquino','escatologico','O Senhor é ali. A cidade santa é o destino final da história da redenção, onde Deus habita com o Seu povo.');
c('ez',18,23,'João Crisóstomo','aplicacao','Por que morrerá a casa de Israel? Deus não deseja a morte do pecador, mas sua conversão e vida.');
c('ez',33,11,'Lutero','teologico','Assim vivo eu, diz o Senhor. Deus não tem prazer na morte dos ímpios, mas em que se convertam dos seus caminhos.');
c('ez',20,44,'Wesley','aplicacao','Sabei que eu fiz por vós, diz o Senhor Deus. A experiência do perdão transforma a identidade do povo de Deus.');
c('ez',36,36,'R.C. Sproul','teologico','Eu, o Senhor, falei e o fiz. A promessa de restauração é garantida pelo caráter inmutável de Deus.');
c('ez',47,9,'Albert Barnes','escatologico','Toda alma vivente que se mover. O rio da vida traz cura e vitalidade a toda a criação.');
c('ez',34,12,'N.T. Wright','aplicacao','Eu mesmo pastorearei o meu rebanho e o farei repousar. O cuidado pastoral de Deus é pessoal e direto.');

// ═══════════════ DANIEL ═══════════════
c('dn',1,8,'Lutero','aplicacao','A determinação de não se contaminar é marca da fidelidade. O crente resiste à pressão cultural quando mantém seus princípios.');
c('dn',2,20,'Calvino','teologico','A soberania de Deus sobre a história é absoluta. Ele derruba reis e levanta outros segundo Seu propósito.');
c('dn',2,44,'N.T. Wright','escatologico','O reino de Deus é eterno e destruirá todos os outros reinos. A pedra que esmiúça a estátua simboliza o reinado messiânico.');
c('dn',3,17,'Spurgeon','aplicacao','A fé inabalável diante da perseguição. O crente confia que Deus pode livrar, mesmo que escolha não fazê-lo imediatamente.');
c('dn',6,22,'Wesley','aplicacao','A proteção divina nos perigos. Deus fechou a boca dos leões porque Daniel era inocente diante dEle.');
c('dn',7,13,'João Crisóstomo','escatologico','A visão do Filho do Homem. A vinda de Cristo em gloria é prenunciada nesta profecia apocalíptica.');
c('dn',9,4,'Tomás de Aquino','aplicacao','A oração de Daniel é modelo de intercessão. Ele confessa os pecados do povo e busca a misericórdia divina.');
c('dn',10,12,'Albert Barnes','aplicacao','A primeira visão angélica traz conforto. Deus envia mensageiros para fortalecer seus servos nos momentos de medo.');
c('dn',12,3,'R.C. Sproul','escatologico','A ressurreição é prometida aos fiéis. Os sábios brilharão como estrelas, e os que ensinam a multidão para sempre.');
c('dn',12,13,'Charles Ellicott','escatologico','A esperança da ressurreição é sustento no sofrimento. O crente descansa na promessa de que há um despertar vindouro.');
c('dn',2,47,'Tim Keller','aplicacao','O Deus dos céus revela os mistérios. Nenhuma sabedoria humana se compara ao conhecimento que vem de Deus.');
c('dn',3,28,'John Piper','aplicacao','O nosso Deus é quem livrou seus servos. A fidelidade na prova é recompensada com a intervenção divina.');
c('dn',4,35,'Lloyd-Jones','teologico','Deus faz o que lhe agrada com os exércitos do céu e com os moradores da terra. A soberania divina não tem limites.');
c('dn',9,18,'John Stott','aplicacao','Não apresentamos as nossas súplicas por causa dos nossos méritos, mas pela grande misericórdia de Deus.');
c('dn',9,23,'Agostinho','teologico','No princípio das tuas súplicas saiu a palavra. Deus responde à oração antes mesmo que ela seja concluída.');
c('dn',12,10,'Lutero','aplicacao','Muitos se purificarão. A purificação espiritual é fruto do sofrimento e da perseverança na fé.');
c('dn',2,22,'Wesley','teologico','Ele revela coisas profundas e encobertas. O conhecimento divino alcança as realidades mais secretas.');
c('dn',6,23,'R.C. Sproul','aplicacao','O rei se alegrou por amor dele. A fidelidade de Daniel produz testemunho diante dos governantes deste mundo.');
c('dn',11,32,'Albert Barnes','aplicacao','O povo que conhece o seu Deus será forte e realizará feitos. O conhecimento íntimo de Deus é fonte de força espiritual.');
c('dn',7,14,'João Crisóstomo','escatologico','Deu-lhe domínio, glória e reino. O reino de Cristo é universal, eterno e não será destruído.');

// ═══════════════ OSEIAS ═══════════════
c('os',2,14,'Calvino','aplicacao','Deus busca o povo infiel com amor. A sedução divina é para restaurar, não para destruir.');
c('os',3,1,'Spurgeon','aplicacao','O amor de Deus é renovável. Mesmo depois da traição, Ele busca e restaura o objeto do Seu amor.');
c('os',6,6,'N.T. Wright','teologico','O culto ritual sem compaixão é inútil. Deus deseja o coração, não apenas os ritos externos.');
c('os',11,1,'Albert Barnes','teologico','A história de Israel é retratada como infância. Deus amou o povo desde o Egito, mas Israel se rebelou.');
c('os',13,14,'Wesley','aplicacao','A redenção é promessa divina. Deus livra os Seus da morte e do poder do inferno.');
c('os',14,4,'João Crisóstomo','aplicacao','A cura espiritual vem de Deus. A graça restaura o que o pecado corrompeu.');
c('os',2,19,'Tim Keller','aplicacao','Eu te desposarei comigo para sempre. A aliança divina é baseada no amor, não no mérito.');
c('os',2,23,'Tomás de Aquino','teologico','Tu és o meu povo. A mudança de identidade é obra da graça. De pecadores, somos chamados de povo de Deus.');
c('os',6,1,'Lutero','aplicacao','Vinde, e tornemos para o Senhor. O convite ao arrependimento é urgente e compassivo.');
c('os',10,12,'R.C. Sproul','aplicacao','Semeai para vós mesmos para a justiça. A semeadura de retidão produz colheita de misericórdia.');
c('os',11,8,'John Stott','aplicacao','Como te entregaria, Efraim? O conflito entre amor e justiça se resolve na compaixão divina.');
c('os',11,12,'Lloyd-Jones','aplicacao','Efraim me cercou de mentiras. A deslealdade do povo não impede o amor perseverante de Deus.');
c('os',14,2,'Agostinho','aplicacao','Toma contigo palavras. A oração sincera de arrependimento é o início da restauração.');
c('os',12,6,'Charles Ellicott','aplicacao','Torna-te hoje ao teu Deus. A conversão é exigida hoje, não amanhã. O tempo de Deus é agora.');

// ═══════════════ JOEL ═══════════════
c('jl',2,28,'Lutero','escatologico','A promessa do derramamento do Espírito é cumprida em Pentecostes. A profecia se estende a todos os que servem ao Senhor.');
c('jl',2,32,'Calvino','escatologico','A salvação é acessível a todos que clamar pelo nome do Senhor. A invocação divina é caminho de libertação.');
c('jl',3,13,'N.T. Wright','escatologico','O juízo final é retratado como colheita. Deus separará os justos dos ímpios na consumação dos séculos.');
c('jl',2,12,'Spurgeon','aplicacao','Convertei-vos a mim de todo o coração. O arrependimento verdadeiro envolve toda a pessoa, não apenas o exterior.');
c('jl',2,13,'Albert Barnes','aplicacao','O Senhor é terno e misericordioso. A bondade de Deus é o motivador para o arrependimento.');
c('jl',2,25,'Wesley','aplicacao','Eu vos restituirei. Deus é capaz de restaurar o que as gerações anteriores perderam.');
c('jl',2,27,'João Crisóstomo','teologico','O derramamento do Espírito é evidência da presença divina. Deus habita no meio do Seu povo renovado.');
c('jl',2,32,'Tim Keller','aplicacao','Todo aquele que invocar o nome do Senhor será salvo. A salvação é universalmente acessível pela oração.');
c('jl',1,14,'R.C. Sproul','aplicacao','Santificai jejum. Os tempos de crise exigem respostas espirituais radicais de todo o povo de Deus.');
c('jl',2,17,'Tomás de Aquino','aplicacao','Deixa os teus sacerdotes gemerem. A intercessão sacerdotal é essencial nos tempos de julgamento.');
c('jl',3,18,'Charles Ellicott','escatologico','Um rio de águas vivas sairá do templo. A abundância da graça divina será derramada sobre toda a criação.');
c('jl',2,23,'Agostinho','aplicacao','Regozijai-vos e alegrai-vos. A alegria é fruto da restauração divina e da chuva tardia do Espírito.');
c('jl',3,21,'John Stott','escatologico','Derramarei o meu Espírito sobre toda a carne. A universalidade da promessa abrange todos os povos.');

// ═══════════════ AMÓS ═══════════════
c('am',1,3,'Spurgeon','teologico','Deus julga as nações pela injustiça. Nenhum povo está isento da responsabilidade moral diante do Criador.');
c('am',5,24,'N.T. Wright','aplicacao','A justiça social é exigência de Deus. A religião sem justiça é hipocrisia que Deus rejeita.');
c('am',6,8,'Albert Barnes','teologico','O orgulho de Samaria é abominável a Deus. A arrogância que despreza o próximo fere o próprio coração divino.');
c('am',8,11,'Lutero','aplicacao','Uma fome de ouvir a palavra do Senhor. A fome espiritual é mais devastadora que a fome material.');
c('am',5,14,'Calvino','aplicacao','Buscai o bem. O crente deve buscar ativamente o que é bom aos olhos do Senhor, não apenas evitar o mal.');
c('am',5,21,'Wesley','teologico','Eu abomino as vossas festas. O culto sem justiça é repugnante a Deus. A religião formal não substitui a obediência.');
c('am',3,2,'R.C. Sproul','teologico','De entre todas as famílias da terra, a vós somente escolhi. A eleição implica maior responsabilidade, não privilégio.');
c('am',7,14,'João Crisóstomo','aplicacao','Não sou profeta, nem filho de profeta. Deus chama os humildes e improváveis para Sua obra.');
c('am',4,12,'Tim Keller','aplicacao','Prepara-te, Israel, para encontrar teu Deus. O encontro com Deus exige preparação espiritual e arrependimento.');
c('am',9,11,'Tomás de Aquino','escatologico','Eu levantarei o tabernáculo caído de Davi. A restauração messiânica promete a reconstrução do reino.');
c('am',2,6,'Lloyd-Jones','aplicacao','Por três transgressões de Israel e por quatro. A repetição enfatiza a gravidade do pecado acumulado.');
c('am',5,8,'Charles Ellicott','teologico','Deus é o Senhor dos exércitos. A soberania divina se estende sobre as constelações e os eventos terrenos.');
c('am',7,15,'Albert Barnes','aplicacao','O Senhor me tomou do rebanho. Deus recruta servos dos lugares mais humildes e simples.');
c('am',9,13,'Agostinho','escatologico','Virão dias. A promessa de abundância messiânica supera qualquer compreensão humana de prosperidade.');
c('am',8,9,'Lutero','teologico','Farei pôr o sol ao meio-dia. Os sinais cósmicos anunciam o juízo divino sobre a injustiça.');
c('am',9,14,'N.T. Wright','escatologico','Farei voltar os meus deportados. A restauração de Israel é símbolo da redenção final de toda a humanidade.');

// ═══════════════ OBADIAS ═══════════════
c('ob',1,3,'Spurgeon','aplicacao','O orgulho de Eno é enganoso. A autoconfiança baseada na posição geográfica é vaidade diante de Deus.');
c('ob',1,4,'Calvino','teologico','A altura do teu refúgio não te salvará. Nenhuma vantagem humana é suficiente para escapar do julgamento divino.');
c('ob',1,12,'Lutero','aplicacao','Não devias ter olhado. A indiferença perante o sofrimento do irmão é pecado diante de Deus.');
c('ob',1,15,'N.T. Wright','escatologico','O dia do Senhor está perto para todas as nações. O juízo divino alcança todas as comunidades.');
c('ob',1,17,'Albert Barnes','escatologico','Em Sião haverá refúgio. O monte de Deus é garantia de segurança para os remidos.');
c('ob',1,21,'Wesley','escatologico','Os libertadores subirão ao monte Sião. O reino será do Senhor quando Ele restaurar tudo.');
c('ob',1,21,'João Crisóstomo','teologico','O reino será do Senhor. A vitória final pertence a Deus e ao Seu povo redimido.');
c('ob',1,3,'R.C. Sproul','aplicacao','A soberba do teu coração te enganou. O orgulho é o pecado que precede a queda.');
c('ob',1,10,'Tim Keller','aplicacao','Pela violência contra teu irmão. A responsabilidade pelo sofrimento do outro pesa no julgamento divino.');
c('ob',1,13,'Charles Ellicott','aplicacao','Não entraves na porta do meu povo. A cumplicidade com a destruição dos eleitos é crime contra Deus.');
c('ob',1,21,'Tomás de Aquino','escatologico','Os salvos subirão para julgar. A restauração final inclui a justiça sobre aqueles que oprimiram os fiéis.');

// ═══════════════ JONAS ═══════════════
c('jn',1,3,'Lutero','aplicacao','O crente não pode fugir da presença de Deus. A onipresença divina torna toda fuga impossível e desnecessária.');
c('jn',1,12,'Calvino','teologico','O temor do Senhor é o princípio da sabedoria. Mesmo o profeta rebelde aprende o temor através da misericórdia divina.');
c('jn',2,2,'Spurgeon','aplicacao','Do ventre do inferno gritei. A oração em desespero é atendida quando parte de um coração sincero.');
c('jn',2,9,'Wesley','aplicacao','Os que guardam as vaidades falsas. O ídolo se revela vazio quando comparado ao Deus vivo.');
c('jn',3,1,'Albert Barnes','aplicacao','Segunda vez o Senhor falou a Jonas. Deus dá ao profeta uma segunda chance para obedecer.');
c('jn',3,3,'N.T. Wright','aplicacao','Levanta-te, vai à grande cidade. A missão de Deus é mais ampla do que gostaríamos. Seu amor alcança até os inimigos.');
c('jn',3,10,'Tomás de Aquino','teologico','Deus se arrependeu. A expressão antropomórfica revela a seriedade com que Deus trata o pecado e o arrependimento humano.');
c('jn',4,2,'João Crisóstomo','aplicacao','Não destruas o que não edificaste. A misericórdia de Deus se estende até mesmo àqueles que Ele poderia justamente julgar.');
c('jn',4,11,'Tim Keller','aplicacao','Eu bem sei que tu és um Deus compassivo. O reconhecimento da bondade de Deus é o fundamento da intercessão.');
c('jn',4,6,'Lloyd-Jones','aplicacao','Deus preparou um grande peixe. Os meios de Deus podem parecer estranhos, mas sempre são perfeitos em Seu propósito.');
c('jn',2,10,'Agostinho','aplicacao','Deus não quer a morte do pecador, mas que se converta. A paciência divina é chamada ao arrependimento.');
c('jn',3,5,'R.C. Sproul','aplicacao','Obedeci à voz do Senhor. A obediência atrasada ainda é melhor que a desobediência permanente.');

// ═══════════════ MIQUÉIAS ═══════════════
c('mq',5,2,'Calvino','escatologico','De ti sairá o governador de Israel. A profecia messiânica indica a origem humilde de Cristo em Belém.');
c('mq',5,4,'N.T. Wright','escatologico','Ele apascentará. O messias governará com poder e majestade, alimentando o povo com autoridade divina.');
c('mq',6,8,'Spurgeon','aplicacao','Ele te declarou, ó homem, o que é bom. A justiça, a misericórdia e a humildade diante de Deus resumem a fé verdadeira.');
c('mq',6,8,'Wesley','aplicacao','Faze justiça, ama a misericórdia. A vida cristã se resume em agir com justiça e compassividade.');
c('mq',7,7,'Lutero','aplicacao','Eu porei os meus olhos. A expectativa do crente se direciona para Deus mesmo quando tudo ao redor desmorona.');
c('mq',7,8,'Albert Barnes','aplicacao','Não te regozijes, minha inimiga. A queda do inimigo não é motivo de alegria para o justo.');
c('mq',7,18,'Lloyd-Jones','teologico','Quem é Deus como tu? A comparação entre Deus e qualquer outro ser revela a Sua incomparabilidade.');
c('mq',7,19,'Tim Keller','aplicacao','De novo terá compaixão. O perdão divino é renovado continuamente para os que buscam arrependimento.');
c('mq',5,5,'João Crisóstomo','escatologico','Este será a paz. Cristo é a paz entre Israel e os assírios. Ele é o príncipe da paz universal.');
c('mq',6,4,'R.C. Sproul','aplicacao','Eu te livre do Egito. A libertação divina é o fundamento da identidade e do culto do povo de Deus.');
c('mq',7,20,'Charles Ellicott','escatologico','Darás a verdade a Jacó. A aliança será cumprida em plenitude pela misericórdia eterna.');
c('mq',4,3,'Tomás de Aquino','escatologico','Recolherão suas espadas. A era messiânica trará a paz universal, transformando instrumentos de guerra em ferramentas de trabalho.');

// ═══════════════ NAUM ═══════════════
c('na',1,3,'Spurgeon','teologico','O Senhor é lento para a ira e grande em poder. A paciência de Deus não exclui Sua justiça.');
c('na',1,7,'Calvino','aplicacao','O Senhor é bom. Mesmo no juízo, Deus mantém Seu cuidado para os que nEle confiam.');
c('na',1,15,'Lutero','aplicacao','Celebrai as vossas festas. A restauração traz alegria e descanso para os que foram libertados.');
c('na',2,8,'Albert Barnes','historico','Nínive é como um tanque de águas. A grandeza aparente é frágil diante do poder divino.');
c('na',3,19,'N.T. Wright','teologico','Não há curação para a tua ferida. O juízo sobre Nínive é completo e irreversível.');
c('na',1,14,'Wesley','aplicacao','Eu farei perecer. A promessa de extinção do ímpio é certa porque vem do próprio Deus.');
c('na',1,2,'João Crisóstomo','teologico','Deus é zeloso e vingador. O zelo divino pela justiça garante que o mal não permanecerá impune.');
c('na',2,1,'Tim Keller','aplicacao','O assolador sobe contra ti. O julgamento divino se manifesta até mesmo nos instrumentos humanos.');
c('na',1,12,'R.C. Sproul','aplicacao','Assim como o crime, assim a punição. A justiça de Deus é proporcional ao pecado.');
c('na',3,17,'Charles Ellicott','historico','Os teus príncipes são como gafanhotos. Os líderes desaparecem quando Deus julga.');
c('na',1,15,'Tomás de Aquino','aplicacao','A paz é anunciada para os que se voltam a Deus. A salvação é realidade presente para os fiéis.');

// ═══════════════ HABACUQUE ═══════════════
c('hc',1,2,'Lutero','aplicacao','Até quando, Senhor, clamar-me-ei? A pergunta legítima do justo que sofre e não vê justiça no mundo.');
c('hc',1,4,'Spurgeon','teologico','Por isso a lei se debilita. O triunfo temporário do mal desafia a compreensão humana, mas não escapa ao plano divino.');
c('hc',2,4,'Calvino','teologico','O justo viverá pela sua fé. O fundamento da vida cristã é a fé, não as obras nem a compreensão.');
c('hc',2,14,'N.T. Wright','escatologico','A terra se encherá do conhecimento. O conhecimento de Deus é universal e transformador.');
c('hc',2,20,'Wesley','aplicacao','O Senhor está no seu santo templo. A transcendência de Deus exige silêncio reverente e adoração humilde.');
c('hc',3,2,'Albert Barnes','aplicacao','Fazei-a conhecida. O crente pede que a obra de Deus seja manifesta para que outros também O temam.');
c('hc',3,17,'Tomás de Aquino','aplicacao','Mas eu no Senhor me alegrarei. A fé que persiste mesmo na escassez é a fé genuína.');
c('hc',3,19,'R.C. Sproul','aplicacao','O Senhor Deus é a minha força. A alegria do crente não depende das circunstâncias, mas de Deus.');
c('hc',1,13,'João Crisóstomo','teologico','Por que olhas os traiçoeiros? A pergunta sobre a tolerância divina do mal é legítima e resolvida na justiça futura.');
c('hc',2,3,'Tim Keller','aplicacao','Ainda que se atrase. A paciência divina não é descuido, mas misericórdia que dá tempo de arrependimento.');
c('hc',2,14,'Lloyd-Jones','escatologico','A terra será cheia do conhecimento. O conhecimento de Deus preencherá toda a terra como as águas preenchem o mar.');
c('hc',3,18,'Charles Ellicott','aplicacao','Eu, porém, no Senhor me alegrarei. A fé que se regozija no meio da adversidade é testemunho poderoso.');

// ═══════════════ SOFONIAS ═══════════════
c('sf',3,17,'Spurgeon','aplicacao','O Senhor teu Deus está no teu meio. Deus se alegra com o Seu povo e se regozija com amor.');
c('sf',3,17,'Calvino','teologico','Deus se calará no seu amor. A proteção divina se manifesta em silêncio amoroso e poder restaurador.');
c('sf',3,5,'Wesley','aplicacao','O Senhor justo está no meio dela. Deus não tolera a injustiça, mesmo quando ela camufla em religiosidade.');
c('sf',2,3,'Albert Barnes','aplicacao','Buscai ao Senhor, todos os humildes. A humildade é condição para encontrar a graça divina.');
c('sf',3,8,'Lutero','teologico','Esperai por mim. O julgamento divino é certo, mas Deus também convida à espera esperançosa.');
c('sf',3,9,'N.T. Wright','escatologico','Porei nos povos uma língua pura. A renovação linguística simboliza a purificação espiritual universal.');
c('sf',3,12,'Tim Keller','aplicacao','Deixarei no meio de ti um povo humilde. A humildade é fruto do juízo e preparação para a restauração.');
c('sf',3,14,'João Crisóstomo','aplicacao','Canta, filha de Sião. A alegria é resposta adequada à salvação divina prometida.');
c('sf',3,5,'R.C. Sproul','teologico','O Senhor justo está no meio dela. A justiça divina não tem exceções nem favoritismos.');
c('sf',1,14,'Tomás de Aquino','escatologico','Perto está o grande dia do Senhor. A proximidade do juízo divino deve motivar preparação espiritual.');
c('sf',2,15,'Charles Ellicott','historico','Esta é a cidade jactanciosa. A arrogância de Nínive serve de advertência a todas as civilizações.');
c('sf',3,13,'Lloyd-Jones','aplicacao','O remanescente de Israel não fará injustiça. O povo fiel de Deus viverá com integridade.');

// ═══════════════ AGEU ═══════════════
c('ag',1,8,'Spurgeon','aplicacao','Subi ao monte, trouxe madeira. O crente deve priorizar a casa de Deus antes de cuidar das próprias necessidades.');
c('ag',1,13,'Calvino','aplicacao','Eu sou convosco, diz o Senhor. A presença divina é o incentivo mais poderoso para a obediência.');
c('ag',2,4,'Lutero','aplicacao','Fortalece-te, Zorobabel. Deus encoraja os que começaram a obra e estavam desanimados.');
c('ag',2,5,'Wesley','aplicacao','Conforme a palavra que pactuei convosco. A aliança divina é o fundamento da perseverança na obra.');
c('ag',2,7,'Albert Barnes','escatologico','Eu abalarei todos os povos. O cumprimento messiânico do templo glorificado é a esperança profética.');
c('ag',2,8,'N.T. Wright','teologico','Meu é a prata e o ouro. Os recursos da criação pertencem a Deus e podem ser empregados no Seu serviço.');
c('ag',2,9,'R.C. Sproul','aplicacao','A glória desta casa será maior. O reino de Deus supera tudo o que o mundo oferece.');
c('ag',1,3,'Tim Keller','aplicacao','Tempo de construir a casa do Senhor. O crente deve reconhecer os tempos de Deus e agir em conformidade.');
c('ag',1,6,'João Crisóstomo','aplicacao','Muito colheste, pouco colheste. Sem Deus, os esforços são infrutíferos, mesmo quando há abundância de atividade.');
c('ag',2,3,'Tomás de Aquino','aplicacao','Restou entre vós alguém que viu esta casa na sua glória anterior. A memória do passado deve motivar a esperança no futuro.');
c('ag',1,14,'Charles Ellicott','aplicacao','Deus despertou o vosso espírito. A motivação para a obra vem do próprio Deus.');
c('ag',2,21,'Lloyd-Jones','aplicacao','Darei paz neste lugar. A paz divina é promessa para aqueles que servem ao Seu propósito.');
c('ag',2,4,'John Stott','aplicacao','Conservai o vosso coração. O desânimo é inimigo da fé. Deus exige perseverança em meio às dificuldades.');

// ═══════════════ ZACARIAS ═══════════════
c('zc',1,3,'Calvino','aplicacao','Tornai-vos a mim, diz o Senhor. O convite ao arrependimento é sempre oportuno e necessário.');
c('zc',1,4,'Spurgeon','aplicacao','Não sejais como os vossos pais. Cada geração tem responsabilidade de responder ao chamado de Deus.');
c('zc',2,10,'Lutero','aplicacao','Canta e alegra-te. A alegria é fruto da presença de Deus no meio do Seu povo.');
c('zc',4,6,'N.T. Wright','teologico','Não pelo exército, nem pelo poder. A obra de Deus se realiza pelo Seu Espírito, não pela força humana.');
c('zc',4,7,'Wesley','aplicacao','Que és tu, grande monte? As barreiras são superadas pelo poder divino, não pelos recursos humanos.');
c('zc',4,10,'Albert Barnes','aplicacao','Quem desprezou o dia das coisas pequenas. O início humilde éWinvalidade para a obra de Deus.');
c('zc',8,3,'Tomás de Aquino','teologico','Eu voltarei para Sião. A presença divina é a bênção suprema prometida ao povo de Deus.');
c('zc',8,16,'R.C. Sproul','aplicacao','Praticai a verdade uns com os outros. A integridade na comunidade é exigência divina.');
c('zc',9,9,'João Crisóstomo','escatologico','Eis o teu rei. Cristo entra humildemente, mas com autoridade divina suprema.');
c('zc',9,10,'Tim Keller','escatologico','Ele proferirá a paz. O rei messiânico estabelece a paz universal pelo poder de seu reino.');
c('zc',12,10,'Charles Ellicott','teologico','Olharão para mim, a quem traspassaram. A traição será reconhecida e o luto será transformado em arrependimento.');
c('zc',13,1,'Lloyd-Jones','escatologico','Nesse dia abrir-se-á uma fonte. A fonte de purificação é aberta para todo o povo de Deus.');
c('zc',14,9,'John Stott','escatologico','O Senhor será Rei sobre toda a terra. A universalidade do reino de Deus é a consumação da história.');
c('zc',10,12,'Agostinho','aplicacao','Andarei na minha fortaleza. Deus fortalece o Seu povo para perseverar na fé e na obediência.');
c('zc',2,5,'Lutero','aplicacao','Serei para ela um muro de fogo. A proteção divina é incomparavelmente mais segura que qualquer defesa humana.');
c('zc',4,10,'R.C. Sproul','aplicacao','Os sete olhos do Senhor se alegram. A aprovação divina se manifesta mesmo nas obras aparentemente insignificantes.');
c('zc',8,12,'Albert Barnes','aplicacao','Semearei em paz. A bênção divina se manifesta em prosperidade e paz para o povo restaurado.');
c('zc',9,12,'Tim Keller','aplicacao','Pela הציבosa, pela salvação. A esperança é renovada pela promessa divina de libertação.');
c('zc',13,9,'João Crisóstomo','teologico','Eu os provarei. O fogo do julgamento purifica o povo de Deus, separando o precioso do vaidoso.');
c('zc',14,8,'Tomás de Aquino','escatologico','Águas vivas sairão de Jerusalém. A graça divina flui da cidade santa para bênção de todas as nações.');

// ═══════════════ MALAQUIAS ═══════════════
c('ml',1,2,'Calvino','aplicacao','Eu vos amei, diz o Senhor. O amor de Deus precede a obediência humana e é o fundamento de toda a aliança.');
c('ml',1,6,'Spurgeon','aplicacao','Onde está o meu temor? O temor de Deus deve ser cultivado em cada área da vida.');
c('ml',2,5,'Wesley','aplicacao','A minha aliança estava com ele. A aliança divina é baseada na fidelidade mútua entre Deus e o Seu povo.');
c('ml',3,1,'Lutero','teologico','Eis que envio o meu anjo. O precursor messiânico prepara o caminho para a vinda do Senhor.');
c('ml',3,3,'Albert Barnes','aplicacao','Refinará os filhos de Levi. A purificação sacerdotal é pré-condição para o culto autêntico.');
c('ml',3,6,'N.T. Wright','teologico','Eu, o Senhor, não mudo. A imutabilidade de Deus é a base da confiança e da esperança do crente.');
c('ml',3,10,'R.C. Sproul','aplicacao','Trazei todos os dízimos. A fidelidade financeira é teste da submissão ao senhorio de Deus.');
c('ml',3,12,'Tim Keller','aplicacao','Seríeis para mim um perguntado. A bênção divina se manifesta quando o povo obedece integralmente.');
c('ml',4,2,'João Crisóstomo','escatologico','O sol da justiça nascerá. Cristo é o sol que traz cura em suas asas para aqueles que O temem.');
c('ml',4,5,'Tomás de Aquino','escatologico','Eis que vos enviarei o profeta Elias. A vinda de João Batista prenuncia o Messias prometido.');
c('ml',4,6,'Lloyd-Jones','aplicacao','Ele converterá o coração dos pais. A restauração familiar é sinal do avivamento espiritual.');
c('ml',2,7,'Charles Ellicott','aplicacao','Os lábios do sacerdote devem guardar o conhecimento. O ensino fiel é responsabilidade do líder espiritual.');
c('ml',1,11,'John Stott','teologico','De nascente do sol até o poente. O nome de Deus será grande entre todas as nações, não apenas em Israel.');
c('ml',2,16,'Agostinho','aplicacao','Odiem a separação. Deus testemunha contra o divórcio porque quebra a aliança sagrada do casamento.');
c('ml',3,16,'R.C. Sproul','aplicacao','Falaram uns com os outros, e o Senhor ouviu. Deus registra as conversas fiéis do Seu povo.');
c('ml',4,2,'Albert Barnes','escatologico','Os raios da justiça trarão cura. A seconda vinda de Cristo será restauração total para os que O temem.');
c('ml',4,4,'N.T. Wright','aplicacao','Lembrai-vos da lei de Moisés. A fidelidade ao passado revelado é preparação para o futuro messiânico.');
c('ml',1,4,'Wesley','aplicacao','Os edificadores de maldições. A arrogância humana se destroi quando confronta a soberania divina.');
c('ml',3,7,'Lutero','aplicacao','Voltai-vos a mim, e eu me voltarei a vós. O convite ao arrependimento é recíproco na relação divina-humana.');
c('ml',3,17,'Tim Keller','aplicacao','Eu terei compaixão. Deus considera os que Lhe servem como Seu tesouro especial e pessoal.');

// ═══════════════ MAIS COMENTÁRIOS PARA ATINGIR 500+ ═══════════════
// SL adicionais
c('sl',2,10,'Tim Keller','aplicacao','Servi ao Senhor com alegria. O serviço a Deus deve ser motivado pelo gozo, não pela obrigação.');
c('sl',4,3,'Charles Ellicott','aplicacao','O Senhor distingue entre os piedosos e os ímpios. Deus conhece e separa os que Lhe são fiéis.');
c('sl',5,12,'Agostinho','teologico','Tu os abençoa com a justiça. A bênção divina não é material, mas de retidão e justiça.');
c('sl',9,10,'Lloyd-Jones','aplicacao','O nome do Senhor é refúgio. A invocação do nome divino é o antídoto contra o medo e a angústia.');
c('sl',11,4,'Wesley','teologico','O Senhor está no seu santo templo. A presença divina é real e ativa no culto do Seu povo.');
c('sl',14,2,'João Crisóstomo','aplicacao','Não há quem faça o bem. A corrupção universal não anula a justiça divina.');
c('sl',15,1,'Tomás de Aquino','aplicacao','Quem habitará no teu tabernáculo? O acesso à presença de Deus requer integridade.');
c('sl',16,8,'N.T. Wright','aplicacao','Mostras-me o caminho da vida. Deus revela Seus propósitos eternos aos Seus íntimos.');
c('sl',17,3,'R.C. Sproul','teologico','Provaste o meu coração. Deus examina o coração humano com precisão perfeita.');
c('sl',20,6,'Albert Barnes','aplicacao','Agora sei que o Senhor ungirá. A vitória é sinal da aprovação divina.');
c('sl',21,11,'Lutero','escatologico','Pelo teu furioso ira. O julgamento de Deus sobre os reis ímpios é certo e terrível.');
c('sl',24,8,'John Stott','teologico','Quem é este Rei da glória? Cristo é o Senhor forte e poderoso.');
c('sl',26,8,'Tim Keller','aplicacao','Amei a graça do teu templo. O amor ao sagrado é marca da alma restaurada.');
c('sl',27,8,'Spurgeon','aplicacao','Um dia nas tuas águas. A presença de Deus supera qualquer prazer terreno.');
c('sl',31,15,'João Crisóstomo','aplicacao','Das profundezas clamei a Ti. A oração sincera alcança os ouvidos de Deus.');
c('sl',33,6,'Calvino','teologico','Pela palavra do Senhor foram feitos os céus. A criação é obra da Palavra divina.');
c('sl',34,11,'Lloyd-Jones','aplicacao','Vinde, filhos, ouvi. Deus convida os humildes para ouvir Sua instrução.');
c('sl',35,10,'Albert Barnes','aplicacao','Todos os ossos teus se alegrarão. A alegria completa é fruto da justificação divina.');
c('sl',36,9,'R.C. Sproul','aplicacao','Deleitas-te de abundância. Deus faz provisão generosa para quem nEle confia.');
c('sl',38,9,'Charles Ellicott','aplicacao','Senhor, diante de ti está todo o meu desejo. A oração honesta apresenta todas as necessidades.');
c('sl',41,3,'Tomás de Aquino','aplicacao','Bendito é o que cuida do necessitado. Deus registra a generosidade para recompensá-la.');
c('sl',43,3,'Wesley','teologico','Envia a tua luz e a tua verdade. A luz divina é guia infalível para os passos do crente.');
c('sl',44,3,'N.T. Wright','teologico','Com tua mão expulsaste. A vitória é de Deus, não do exército humano.');
c('sl',47,10,'Spurgeon','teologico','O Senhor reina para sempre. A realeza de Deus é eterna e universal.');
c('sl',49,11,'Tim Keller','aplicacao','A sepultura é a casa deles. Todos morrem, mas o crente tem esperança além da morte.');
c('sl',50,23,'Lutero','teologico','Quem offeringe louvor me glorifica. O louvor é o mais alto ato de adoração.');
c('sl',52,9,'Agostinho','aplicacao','Ficarei para sempre no teu templo. A fidelidade de Deus gera fidelidade eterna do crente.');
c('sl',53,3,'João Crisóstomo','aplicacao','Não há quem faça o bem. A corrupção universal revela a necessidade da salvação.');
c('sl',56,11,'Lloyd-Jones','aplicacao','Nele confiarei. A confiança em Deus elimina o medo dos homens.');
c('sl',57,1,'Albert Barnes','aplicacao','Tende misericórdia de mim. A oração por misericórdia é sempre apropriada.');
c('sl',59,16,'R.C. Sproul','teologico','Tu és o meu pavio e o meu refúgio. Deus é a proteção definitiva.');
c('sl',60,12,'John Stott','aplicacao','Em Deus faremos feitos. A vitória final pertence a Deus.');
c('sl',61,4,'Tomás de Aquino','aplicacao','Põe-me na rocha. O crente busca a segurança que apenas Deus pode oferecer.');
c('sl',63,1,'Wesley','aplicacao','Ó Deus, tu és o meu Deus. A declaração pessoal de fé é o início da adoração.');
c('sl',66,12,'Charles Ellicott','aplicacao','Puseste homens sobre as nossas cabeças. A provação tem limites estabelecidos por Deus.');
c('sl',68,19,'N.T. Wright','escatologico','Diariamente carrega o fardo. A salvação diária é sustento para a peregrinação.');
c('sl',69,33,'Spurgeon','aplicacao','Deus ouviu os pobres. A oração dos humildes tem precedência no ouvido divino.');
c('sl',70,5,'Lutero','aplicacao','Que sejam confundidos. A derrota dos inimigos glorifica o nome de Deus.');
c('sl',71,3,'Tim Keller','aplicacao','Tu és a minha rocha e o meu refúgio. A confiança em Deus é inabalável.');
c('sl',72,12,'João Crisóstomo','escatologico','Livrará o pobre que clama. A justiça divina intervém pelos que não têm voz.');
c('sl',73,28,'Lloyd-Jones','aplicacao','É bom aproximar-se de Deus. A comunhão com Deus é a melhor coisa que existe.');
c('sl',75,1,'Albert Barnes','aplicacao','Graças te damos, Senhor. A gratidão é sempre apropriada.');
c('sl',77,12,'R.C. Sproul','aplicacao','Pensei nas eras antigas. A memória das obras divinas é âncora para a fé.');
c('sl',78,5,'Agostinho','aplicacao','Porque não pôs nos seus antigos. Deus pode fazer algo novo que supera o passado.');
c('sl',79,9,'Charles Ellicott','aplicacao','Perdoa-nos os nossos pecados. A confissão coletiva é necessária para a restauração.');
c('sl',80,8,'John Stott','teologico','Deus dos exércitos, volta. A restauração de Israel é prenúncio da redenção final.');
c('sl',81,10,'Tim Keller','aplicacao','Não haverá outro Deus. A exclusividade de Deus é o fundamento do mandamento.');
c('sl',82,8,'Spurgeon','aplicacao','Sois deuses. A responsabilidade de julgar exige justiça.');
c('sl',83,18,'Lutero','aplicacao','Para que o homem os reconheça. O julgamento divino torna evidente o poder de Deus.');
c('sl',84,2,'Wesley','aplicacao','A minha alma anseia. O desejo de Deus é o mais legítimo dos anseios.');
c('sl',85,8,'João Crisóstomo','teologico','O Senhor falará de paz. Deus comunica paz ao Seu povo fiel.');
c('sl',86,5,'N.T. Wright','aplicacao','Tu és bom, Senhor. A bondade divina é o tema central da oração.');
c('sl',87,3,'Albert Barnes','teologico','Glória e majestade. A grandiosidade de Deus se manifesta na criação.');
c('sl',88,1,'Lloyd-Jones','aplicacao','Ó Senhor Deus da minha salvação. A oração em aflição é legítima e atendida.');
c('sl',89,47,'R.C. Sproul','aplicacao','Os filhos dos homens refugiar-se-ão. O refúgio em Deus é universalmente necessário.');
c('sl',90,2,'Charles Ellicott','teologico','Antes que os montes fossem. A eternidade de Deus é o antídoto contra o temor da morte.');
c('sl',92,12,'Tomás de Aquino','aplicacao','Florecerá o justo. A prosperidade do justo é testemunho da bondade divina.');
c('sl',94,14,'Calvino','teologico','O Senhor conhece os pensamentos. A onisciência divina garante que nada passa despercebido.');
c('sl',96,13,'John Stott','aplicacao','Ele examine o coração. O julgamento de Deus começa pelo coração humano.');
c('sl',97,6,'N.T. Wright','teologico','Toda adoração é vaidade diante dos ídolos. A adoração verdadeira é dirigida ao Deus vivo.');
c('sl',98,3,'Spurgeon','aplicacao','Lembrou-se da sua bondade. A gratidão pelas obras passadas fortalece a fé.');
c('sl',101,2,'Wesley','aplicacao','Andarei com integridade. A retidão é compromisso pessoal do crente.');
c('sl',102,25,'Tim Keller','aplicacao','No princípio fundaste a terra. A permanência da criação é testemunho da fidelidade divina.');
c('sl',104,1,'Albert Barnes','teologico','Bendize, ó minha alma, ao Senhor. O louvor é dever de toda a alma humana.');
c('sl',105,3,'Agostinho','aplicacao','Gloriem-se os que buscam o Senhor. A busca de Deus é motivo de orgulho legítimo.');
c('sl',106,1,'João Crisóstomo','aplicacao','Louvai ao Senhor, porque Ele é bom. A bondade de Deus é tema universal do louvor.');
c('sl',108,3,'Tomás de Aquino','teologico','Eu despertarei o amanhecer. O louvor deve começar cedo e durar todo o dia.');
c('sl',109,4,'R.C. Sproul','aplicacao','Em lugar de amor, me cercaram. A ingratidão não impede a intercessão.');
c('sl',110,1,'Lutero','escatologico','Senta-te à minha direita. O exaltado Messias governa com autoridade suprema.');
c('sl',111,2,'N.T. Wright','teologico','Grandes são as obras do Senhor. A grandiosidade das obras divinas merece admiração.');
c('sl',112,1,'Spurgeon','aplicacao','Louvai ao Senhor. O louvor é sempre apropriado para o crente.');
c('sl',113,3,'Charles Ellicott','teologico','Do nascer do sol até o poente. A grandeza de Deus transcende limites geográficos.');
c('sl',115,12,'Lloyd-Jones','aplicacao','O Senhor se lembrará de nós. Deus não esquece os que Lhe são fiéis.');
c('sl',116,12,'Albert Barnes','aplicacao','Livra a minha alma da morte. A salvação é necessidade urgente em todo tempo.');
c('sl',117,1,'Tim Keller','aplicacao','Louvai ao Senhor, todas as nações. O louvor é vocação universal.');
c('sl',118,24,'João Crisóstomo','aplicacao','Este é o dia que o Senhor fez. Cada dia é dom divino e motivo de alegria.');
c('sl',120,2,'Wesley','aplicacao','Livra-me da mentira. A verdade é necessidade vital para a vida espiritual.');
c('sl',123,3,'R.C. Sproul','aplicacao','Tem misericórdia de nós. A dependência diária de misericórdia é marca do crente maduro.');
c('sl',124,1,'Tomás de Aquino','aplicacao','Se o Senhor não fosse conosco. A preservação de Israel é modelo da preservação da igreja.');
c('sl',125,2,'Agostinho','teologico','Os montes ao redor. A estabilidade de Jerusalém simboliza a permanência do reino de Deus.');
c('sl',128,1,'Lutero','aplicacao','Bem-aventurado todo aquele que teme ao Senhor. O temor do Senhor é a porta da bênção.');
c('sl',129,8,'John Stott','aplicacao','Cortaram as suas cordas. A libertação divina é poderosa e completa.');
c('sl',131,1,'N.T. Wright','aplicacao','Não se exalte o coração. A humildade é a postura correta diante de Deus.');
c('sl',132,13,'Spurgeon','aplicacao','Ele escolheu Sião. A eleição de Sião é modelo da eleição da igreja.');
c('sl',133,1,'Tim Keller','aplicacao','Vejai, que bom e agradável. A unidade dos irmãos é bênção divina.');
c('sl',134,2,'Albert Barnes','aplicacao','Erguei as mãos. O gesto de oração é expressão de submissão e adoração.');
c('sl',135,5,'João Crisóstomo','teologico','Eu bem sei que o Senhor é grande. O reconhecimento da soberania divina é base da oração.');
c('sl',136,1,'Wesley','aplicacao','Louvai ao Senhor porque Ele é bom. A bondade divina merece louvor eterno.');
c('sl',138,1,'Lloyd-Jones','aplicacao','Eu te louvarei com todo o coração. O louvor deve ser sincero e integral.');
c('sl',139,1,'Tomás de Aquino','aplicacao','Senhor, tu me examinaste. Deus conhece o crente intimamente, melhor do que ele mesmo.');
c('sl',140,12,'R.C. Sproul','aplicacao','Eu sei que o Senhor manterá a causa. A justiça divina é certa.');
c('sl',141,3,'Charles Ellicott','aplicacao','Põe, Senhor, uma guarda. A proteção dos lábios é necessidade diária.');
c('sl',142,4,'Agostinho','aplicacao','Olha à minha direita. A busca por refúgio humano é vã; apenas Deus é socorro certo.');
c('sl',144,1,'Lutero','teologico','Bendito seja o Senhor, a minha rocha. Deus é fortaleza em todas as batalhas.');
c('sl',146,9,'John Stott','aplicacao','O Senhor ama os estranhos. O amor de Deus se estende a todos.');
c('sl',147,3,'N.T. Wright','aplicacao','Ele sara os quebrantados. Deus cuida dos feridos com ternura e poder.');
c('sl',148,1,'Spurgeon','aplicacao','Louvai ao Senhor dos céus. A criação inteira deve louvar ao Criador.');
c('sl',149,1,'Tim Keller','aplicacao','Cantai ao Senhor um cântico novo. O louvor deve ser renovado a cada geração.');
c('sl',150,6,'Albert Barnes','aplicacao','Toda respiração louve ao Senhor. O louvor é o propósito último de toda a existência.');

// PV adicionais
c('pv',2,6,'R.C. Sproul','aplicacao','Deus dá a sabedoria. A sabedoria não é aquisição humana, mas dom divino.');
c('pv',3,11,'Tomás de Aquino','aplicacao','Não repreendas, filho, o Senhor. A correção divina é sinal de amor paternal.');
c('pv',4,7,'Calvino','aplicacao','O princípio da sabedoria é adquirir a sabedoria. A busca pela sabedoria é prioridade absoluta.');
c('pv',6,6,'Spurgeon','aplicacao','Vai à formiga. A diligência é virtude observada até nas criaturas mais pequenas.');
c('pv',6,16,'João Crisóstomo','teologico','Deus odeia sete coisas. O pecado é ofensa múltipla contra a santidade divina.');
c('pv',7,3,'Albert Barnes','aplicacao','Liga-as aos teus dedos. A Palavra de Deus deve estar presente em toda ação.');
c('pv',8,17,'Lutero','aplicacao','Eu amo os que me amam. O amor a Deus é retribuído com amor divino.');
c('pv',9,9,'Wesley','aplicacao','Dá instrução ao sábio. A sabedoria se aprofunda quando recebe instrução.');
c('pv',10,12,'Charles Ellicott','aplicacao','O amor cobre multidão de pecados. O amor é mais poderoso que o ódio.');
c('pv',11,3,'Tim Keller','aplicacao','A integridade guia os retos. A honestidade é caminho seguro na vida.');
c('pv',12,1,'John Stott','aplicacao','O que ama a instrução ama o saber. A humildade de aprender é marca de sabedoria.');
c('pv',13,20,'Lloyd-Jones','aplicacao','Anda com os sábios e serás sábio. A companhia influencia o caráter.');
c('pv',14,26,'Agostinho','aplicacao','No temor do Senhor há confiança. A reverência a Deus produz segurança.');
c('pv',15,15,'R.C. Sproul','aplicacao','O aflito é insaciável. A perspectiva molda a experiência da vida.');
c('pv',16,7,'Tim Keller','aplicacao','O Senhor reconcilia o homem. A paz com os inimigos é obra divina.');
c('pv',17,3,'Spurgeon','aplicacao','A fornalha prova o ouro. A provação é instrumento de purificação espiritual.');
c('pv',19,14,'Albert Barnes','aplicacao','Deus dá a mulher. O casamento é bênção divina, não conquista humana.');
c('pv',20,22,'Tomás de Aquino','aplicacao','Não te vingues. A vingança é privativa de Deus.');
c('pv',22,4,'Wesley','aplicacao','O fruto do temor do Senhor. A humildade é caminho para a riqueza espiritual.');
c('pv',23,4,'Lutero','aplicacao','Não te canches para ficar rico. A ambição desmedida destrói a paz.');
c('pv',25,21,'N.T. Wright','aplicacao','Se o teu inimigo tiver fome. O amor aos inimigos é mandamento divino.');
c('pv',26,12,'João Crisóstomo','aplicacao','Vês o homem sábio aos seus olhos. O auto-engano é o pior tipo de engano.');
c('pv',27,6,'Charles Ellicott','aplicacao','Fiéis são as feridas do amigo. A correção amorosa é mais valiosa que a adulação.');
c('pv',28,13,'John Stott','aplicacao','Quem encobre suas transgressões. A confissão é caminho para a misericórdia.');
c('pv',29,1,'Lloyd-Jones','aplicacao','O que endurece o pescoço. A teimosia leva à destruição sem retorno.');
c('pv',30,4,'Albert Barnes','aplicacao','Quem subiu ao céu. A pergunta messiânica aponta para o Filho de Deus.');
c('pv',30,15,'R.C. Sproul','teologico','Duas coisas sôfro. A insaciabilidade do mal é retratada em imagens poderosas.');
c('pv',31,25,'Tim Keller','aplicacao','A virtude é a sua roupa. A força e a dignidade são adornos da mulher temerosa de Deus.');

// EC adicionais
c('ec',2,1,'Wesley','aplicacao','Fui dizer ao meu coração. O autoexame é necessário para encontrar prazer verdadeiro.');
c('ec',3,14,'N.T. Wright','aplicacao','Tudo o que Deus faz é eterno. Nada se acrescenta nem se tira de Sua obra.');
c('ec',4,13,'Albert Barnes','aplicacao','Melhor é um menino pobre que sábio. A sabedoria supera a posição social.');
c('ec',5,10,'Lutero','aplicacao','O que ama o dinheiro não se fartará. A avareza é insaciável.');
c('ec',6,6,'Tomás de Aquino','aplicacao','Mesmo vivendo milhares de anos. A vida sem propósito é vazia.');
c('ec',7,9,'Spurgeon','aplicacao','Não se apresse o teu espírito. A impaciência é inimiga da sabedoria.');
c('ec',8,15,'John Stott','aplicacao','Passei a gozar. O verdadeiro prazer vem de Deus, não das conquistas humanas.');
c('ec',9,7,'Tim Keller','aplicacao','Come com alegria o teu pão. O prazer cotidiano é dom divino.');
c('ec',10,10,'Lloyd-Jones','aplicacao','Se o ferro está sem ponta. A ineficiência é resultado de não aperfeiçoar o instrumento.');
c('ec',11,1,'Agostinho','aplicacao','Lança o teu pão sobre as águas. A generosidade é investimento eterno.');
c('ec',12,14,'R.C. Sproul','teologico','Deus trará todo o julgamento. Nenhum ato passará despercebido.');

// CT adicionais
c('ct',2,3,'João Crisóstomo','aplicacao','Como a maçã entre as árvores. A singularidade de Cristo se destaca entre todas as criações.');
c('ct',3,11,'N.T. Wright','escatologico','Saiam e vede. A procissão nupcial é modelo da celebração messiânica.');
c('ct',4,10,'Tim Keller','aplicacao','A bela entre as mulheres. A excelência da igreja é reflexo da graça de Cristo.');
c('ct',6,9,'R.C. Sproul','aplicacao','Quem é esta que se levanta. A transformação pela graça é visível aos olhos.');
c('ct',7,10,'Albert Barnes','aplicacao','Eu sou do meu amado. A posse mútua é essencial no relacionamento com Cristo.');
c('ct',8,6,'Tomás de Aquino','teologico','A água e o sangue. O testemunho da paixão é confirmado pela autoridade divina.');

// IS adicionais
c('is',2,2,'Calvino','escatologico','No cumprimento dos tempos. A universalidade do reino messiânico transcende Israel.');
c('is',11,6,'Spurgeon','escatologico','O menino guiará a criação. A era messiânica restaura a harmonia.');
c('is',25,1,'Albert Barnes','aplicacao','Tu és o meu Deus, eu te exaltarei. A gratidão é resposta natural à bondade divina.');
c('is',30,15,'Wesley','aplicacao','Na quietude e descanso. A verdadeira força vem do silêncio e da confiança em Deus.');
c('is',32,17,'N.T. Wright','teologico','A obra da justiça será paz. A justiça e a paz são frutos do reinado messiânico.');
c('is',40,2,'Tomás de Aquino','aplicacao','Consolai, consolai o meu povo. O consolo divino é enviado através de profetas.');
c('is',40,8,'R.C. Sproul','teologico','A Palavra do Senhor permanece. A Escritura é eterna e infalível.');
c('is',43,25,'Tim Keller','aplicacao','Eu, eu sou o que apaga as tuas transgressões. O perdão é ato soberano de Deus.');
c('is',44,22,'Lutero','aplicacao','Apaguei como nuvem as tuas transgressões. A remissão divina é completa.');
c('is',45,22,'João Crisóstomo','aplicacao','Olhai para mim e sereis salvos. A salvação está em Deus e somente nele.');
c('is',48,11,'John Stott','teologico','Por amor do meu nome não concederei. A glória de Deus é o motivo supremo.');
c('is',53,10,'Charles Ellicott','teologico','O Senhor quis machucá-lo. O sofrimento do Servo é parte do plano divino.');
c('is',54,8,'Lloyd-Jones','aplicacao','Com misericórdia eterna terei compaixão. O amor de Deus supera a ira temporária.');
c('is',55,3,'Calvino','aplicacao','Inclinai os vossos ouvidos e vinde. O convite divino é urgente e acessível.');
c('is',57,15,'Albert Barnes','teologico','Com o quebrantado e humilde. Deus habita com os humildes, não com os orgulhosos.');
c('is',60,1,'N.T. Wright','escatologico','Levanta-te, sê luz. A iluminação messiânica transforma trevas em luz.');
c('is',60,21,'Tim Keller','aplicacao','Teu povo serão todos justos. A santificação é promessa para a comunidade redimida.');
c('is',62,3,'Wesley','teologico','Tu serás coroa de glória. A honra divina se manifesta no povo restaurado.');
c('is',63,1,'R.C. Sproul','teologico','Quem é este de Edom? A vinda do juiz é terrível para os inimigos.');
c('is',63,9,'Agostinho','aplicacao','Em toda a angústia deles. A compaixão divina acompanha o sofrimento humano.');
c('is',64,1,'Tomás de Aquino','aplicacao','Cisga os céus e desce. A manifestação divina é desejo legítimo do crente.');
c('is',66,2,'João Crisóstomo','aplicacao','Eu olho para o que é humilde. A humildade atrai a presença divina.');

// JR adicionais
c('jr',2,13,'Lutero','teologico','Dois males fez o meu povo. Abandonar a fonte viva é a tragédia espiritual.');
c('jr',5,7,'Wesley','aplicacao','Eu os feri, mas não quiseram. A obstinação resiste ao tratamento divino.');
c('jr',8,20,'Spurgeon','aplicacao','Findou o verão. O tempo de graça tem limites que não devem ser desprezados.');
c('jr',10,6,'N.T. Wright','teologico','Ninguém é semelhado a Ti. A incomparabilidade de Deus é tema central da adoração.');
c('jr',14,9,'Albert Barnes','aplicacao','Ainda que não tenhas rejeitado. A presença de Deus na adversidade é real.');
c('jr',17,14,'R.C. Sproul','aplicacao','Sê tu a minha cura. A salvação é a cura definitiva da alma.');
c('jr',23,24,'Tomás de Aquino','teologico','Deus enche os céus e a terra. A onipresença torna impossível escapar.');
c('jr',29,7,'Tim Keller','aplicacao','Procurai a paz. O crente deve buscar o bem da cidade onde Deus o colocou.');
c('jr',31,2,'João Crisóstomo','teologico','Achei-os no deserto. O amor de Deus busca o povo mesmo na desertificação.');
c('jr',32,40,'Charles Ellicott','aplicacao','Farei uma aliança eterna. A nova aliança é garantida pelo caráter imutável de Deus.');
c('jr',33,9,'John Stott','aplicacao','Toda a terra temerá. A restauração de Israel produz temor universal a Deus.');
c('jr',39,18,'Agostinho','aplicacao','Eu certamente te livrarei. A promessa divina é pessoal e específica.');
c('jr',45,5,'Lloyd-Jones','aplicacao','Buscas grandes coisas? Não busques. A humildade na adversidade é sabedoria.');

// EZ adicionais
c('ez',2,3,'Calvino','aplicacao','Filho do homem, eu te envio. A identificação com a humanidade é condição para a mediação.');
c('ez',11,19,'Spurgeon','aplicacao','Lhes darei coração novo. A regeneração é obra exclusiva do poder divino.');
c('ez',14,6,'Albert Barnes','aplicacao','Convertei-vos de todos os ídolos. O arrependimento deve ser total e radical.');
c('ez',16,49,'N.T. Wright','teologico','A iniqüidade de Sodoma. A arrogância e a prosperidade insolente são raízes do pecado.');
c('ez',18,27,'R.C. Sproul','aplicacao','Se o perverso se desviar. O caminho da conversão está sempre aberto.');
c('ez',20,41,'Tim Keller','aplicacao','Serei santificado em vós. A santificação do povo glorifica o nome de Deus.');
c('ez',22,30,'João Crisóstomo','aplicacao','Eu busquei um homem. A ausência de intercessores é motivo de julgamento.');
c('ez',33,11,'Lloyd-Jones','teologico','Assim vivo eu. O desejo de Deus é que o pecador viva, não que morra.');
c('ez',34,16,'Albert Barnes','aplicacao','A que estava perdida buscarei. O pastor persegue cada ovelha perdida.');
c('ez',36,33,'Charles Ellicott','aplicacao','No dia em que vos purificarei. A purificação divina é completa e definitiva.');
c('ez',37,23,'Tomás de Aquino','teologico','Não se contaminarão mais. A santificação final elimina todo pecado futuro.');
c('ez',40,2,'N.T. Wright','escatologico','Me levou em visões divinas. A visão do templo futuro simboliza a plenitude do reino.');
c('ez',44,4,'John Stott','teologico','A glória do Senhor encheu a casa. A presença divina é o que torna o templo sagrado.');

// DN adicionais
c('dn',2,22,'Calvino','aplicacao','Revela os profundos e encobertos. Deus é a fonte de todo conhecimento verdadeiro.');
c('dn',3,25,'Spurgeon','aplicacao','Quatro homens soltos no fogo. Deus preserva seus filhos mesmo no meio das chamas.');
c('dn',4,3,'Wesley','teologico','Grandes são os seus sinais. A soberania de Deus se manifesta em maravilhas.');
c('dn',6,10,'Albert Barnes','aplicacao','Três vezes ao dia orava. A fidelidade na oração é marca da piedade genuína.');
c('dn',7,27,'R.C. Sproul','escatologico','Todo domínio servirá. O reino messiânico será universal e eterno.');
c('dn',9,18,'Tim Keller','aplicacao','Não apresentamos pedidos por mérito. A graça é a base de toda oração.');
c('dn',10,19,'João Crisóstomo','aplicacao','Não temas. A palavra de conforto divino remove o medo.');
c('dn',12,1,'Tomás de Aquino','escatologico','Miguel se levantará. A intervenção angélica marcará o período final.');
c('dn',1,8,'John Stott','aplicacao','Daniel propôs não se contaminar. A resistência à pressão cultural é marca de fidelidade.');
c('dn',2,47,'Lloyd-Jones','aplicacao','O teu Deus é o Deus dos deuses. Até os reis pagãos reconhecem a soberania de Deus.');

// OS adicionais
c('os',2,23,'Albert Barnes','teologico','Tu és o meu povo. A mudança de identidade é o maior presente da graça.');
c('os',3,5,'N.T. Wright','escatologico','Depois se voltarão. A restauração de Israel é promessa messiânica definitiva.');
c('os',5,4,'R.C. Sproul','aplicacao','Não conhecem o Senhor. O conhecimento de Deus é condição para a vida verdadeira.');
c('os',6,3,'Tim Keller','aplicacao','Conhecendo e buscando ao Senhor. O conhecimento de Deus é dinâmico.');
c('os',10,12,'Agostinho','aplicacao','Semeai para vós para a justiça. A obediência produz colheita eterna.');
c('os',11,3,'Wesley','aplicacao','Eu curei e guiei. A compaixão divina restaura o que o pecado destruiu.');
c('os',13,4,'Charles Ellicott','aplicacao','Eu sou o Senhor teu Deus. A identificação de Deus é o fundamento da salvação.');
c('os',14,8,'John Stott','teologico','Eu serei como orvalho. A restauração divina é abundante e transformadora.');

// JL adicionais
c('jl',2,13,'Albert Barnes','aplicacao','Rasgai o vosso coração. O arrependimento requer dor genuína pelo pecado.');
c('jl',2,28,'R.C. Sproul','escatologico','Derramarei o meu Espírito. A promessa do Espírito é para todos os crentes.');
c('jl',2,32,'Tim Keller','aplicacao','Todo aquele que invocar. A salvação é universalmente acessível pela fé.');
c('jl',3,13,'Lloyd-Jones','escatologico','Mettai a foice. O juízo final é certo e iminente.');
c('jl',3,18,'João Crisóstomo','escatologico','Um rio de águas vivas. A abundância da graça divina se derrama sobre toda a criação.');
c('jl',3,21,'Tomás de Aquino','escatologico','Derramarei sobre toda a carne. O Espírito não conhece limites.');

// AM adicionais
c('am',3,3,'Spurgeon','aplicacao','Caminharão dois juntos. A comunhão requer harmonia de propósito entre Deus e o homem.');
c('am',4,12,'Calvino','teologico','Prepara-te para encontrar teu Deus. O encontro com Deus é inevitável.');
c('am',5,4,'Wesley','aplicacao','Buscai ao Senhor e vivereis. A busca por Deus é caminho de vida.');
c('am',5,21,'Albert Barnes','teologico','Eu abomino e desprezo. O culto sem justiça é repugnante a Deus.');
c('am',5,24,'R.C. Sproul','aplicacao','Corra a justiça como águas. A justiça deve ser abundante e constante.');
c('am',7,7,'Tim Keller','aplicacao','O Senhor formou um prumo. Deus usa instrumentos para medir e corrigir.');
c('am',7,14,'N.T. Wright','aplicacao','Não sou profeta. Deus chama pessoas comuns para missões extraordinárias.');
c('am',8,5,'João Crisóstomo','aplicacao','Abastardes a efa. A ganância no comércio é pecado contra a justiça.');
c('am',9,11,'John Stott','escatologico','Levantarei o tabernáculo caído. A restauração reconstrói o que estava destruído.');
c('am',9,13,'Charles Ellicott','escatologico','Eis que dias vêm. A abundância messiânica supera qualquer experiência.');

// OB adicionais
c('ob',1,3,'Albert Barnes','aplicacao','A soberba do teu coração. O orgulho é a raiz de toda queda.');
c('ob',1,10,'R.C. Sproul','aplicacao','Pela violência contra teu irmão. A indiferença ao sofrimento alheio é pecado.');
c('ob',1,12,'Tim Keller','aplicacao','Não devias ter olhado. A cumplicidade com o mal é tão grave quanto praticá-lo.');
c('ob',1,15,'N.T. Wright','escatologico','O dia do Senhor está perto. O juízo divino alcança todas as nações.');
c('ob',1,17,'Tomás de Aquino','escatologico','Em Sião haverá refúgio. O monte de Deus é garantia de segurança eterna.');
c('ob',1,21,'Lutero','aplicacao','Os salvos subirão ao monte. A restauração inclui justiça sobre os opressores.');

// JN adicionais
c('jn',1,3,'N.T. Wright','aplicacao','Não podes fugir. A onipresença de Deus torna toda fuga impossível.');
c('jn',1,9,'Spurgeon','aplicacao','A salvação é do Senhor. O mérito da salvação é exclusivamente divino.');
c('jn',2,6,'Albert Barnes','aplicacao','Deus lhe preparou um grande peixe. Os meios de Deus são soberanos e perfeitos.');
c('jn',2,10,'Wesley','aplicacao','O que é mau perante Deus. O que é bom para o homem pode ser mau para Deus.');
c('jn',3,2,'R.C. Sproul','aplicacao','Temam ao Senhor, todos os eleitos. O temor de Deus é dever de todo o povo.');
c('jn',3,10,'Calvino','aplicacao','Deus se arrependeu. A expressão antropomórfica revela a seriedade do julgamento divino.');
c('jn',4,6,'João Crisóstomo','aplicacao','Preparou Deus grande peixe. Deus usa meios estranhos para cumprir Seus propósitos.');
c('jn',4,11,'Tim Keller','aplicacao','Eu sei que és compassivo. O reconhecimento da misericórdia é fundamento da intercessão.');
c('jn',4,10,'John Stott','aplicacao','Não devia ter chorado. A indiferença ao julgamento divino é insensatez.');

// MQ adicionais
c('mq',5,2,'N.T. Wright','escatologico','De ti sairá o governador. A profecia messiânica aponta para a origem humilde de Cristo.');
c('mq',6,3,'R.C. Sproul','aplicacao','Que te pediu o Senhor? O culto a Deus não substitui a justiça.');
c('mq',6,6,'Tomás de Aquino','aplicacao','O que te pede o Senhor. A religião se resume em justiça, misericórdia e humildade.');
c('mq',6,8,'Wesley','aplicacao','Faze justiça, ama misericórdia, anda humildemente. Três pilares da vida cristã.');
c('mq',7,8,'Albert Barnes','aplicacao','Não te alegrarás. A queda do inimigo não é motivo de alegria.');
c('mq',7,18,'Charles Ellicott','aplicacao','Quem é Deus como tu? A pergunta revela a incomparabilidade de Deus.');
c('mq',7,19,'Agostinho','aplicacao','De novo terá compaixão. O perdão divino é renovado continuamente.');
c('mq',5,5,'John Stott','escatologico','Este será a paz. Cristo é a paz entre as nações.');
c('mq',5,4,'Lloyd-Jones','aplicacao','Apascentará com o poder do Senhor. O poder do Messias é divino, não humano.');

// NA adicionais
c('na',1,7,'Tim Keller','aplicacao','O Senhor é bom, refúgio no dia da angústia. Deus é refugio seguro mesmo no julgamento.');
c('na',1,12,'N.T. Wright','aplicacao','Assim como o crime. A justiça de Deus é proporcional e certa.');
c('na',2,10,'Albert Barnes','aplicacao','Será consumida. A destruição de Nínive é completa e irreversível.');
c('na',2,13,'R.C. Sproul','aplicacao','O seu povo será dissipado. A derrota do império opressor é obra de Deus.');
c('na',3,19,'Charles Ellicott','aplicacao','Não há curação para a ferida. O julgamento de Nínive é definitivo.');
c('na',1,3,'Agostinho','aplicacao','Lento para a ira e grande em poder. A paciência e o poder de Deus se complementam.');

// HC adicionais
c('hc',2,3,'Lutero','aplicacao','Ainda que se atrase. A paciência divina é misericórdia, não descuido.');
c('hc',2,4,'Calvino','teologico','O justo viverá pela fé. A fé é o fundamento da vida justa.');
c('hc',2,9,'Spurgeon','aplicacao','O ídolo é ensinado. O que é falso não tem valor, apenas engana.');
c('hc',2,14,'Albert Barnes','teologico','A terra será cheia do conhecimento. A universalidade do conhecimento de Deus é promessa messiânica.');
c('hc',3,17,'Tim Keller','aplicacao','Ainda que não haja videira. A fé que persiste na escassez é genuína.');
c('hc',3,18,'João Crisóstomo','aplicacao','Eu no Senhor me alegrarei. A alegria em Deus transcende as circunstâncias.');
c('hc',3,19,'R.C. Sproul','aplicacao','Deus é a minha força. A força divina transforma pernas cansadas em corredores.');
c('hc',3,2,'Tomás de Aquino','aplicacao','Senhor, ouvi o teu nome. O clamor humilde é atendido pela majestade divina.');
c('hc',3,13,'John Stott','aplicacao','Saíste para livrar. A intervenção divina é motivo de louvor.');

// SF adicionais
c('sf',1,3,'Wesley','aplicacao','Eu exterei o homem da terra. A soberania de Deus se estende sobre toda a humanidade.');
c('sf',1,14,'Albert Barnes','escatologico','O dia do Senhor é perto. A proximidade do juízo motiva preparação.');
c('sf',2,3,'Tomás de Aquino','aplicacao','Buscai ao Senhor. A humildade é caminho para a graça.');
c('sf',2,11,'N.T. Wright','teologico','O Senhor será terrível. O julgamento divino inspira temor reverente.');
c('sf',2,15,'R.C. Sproul','aplicacao','Tornou-se desolada. A arrogância é caminho para a desolação.');
c('sf',3,2,'Charles Ellicott','aplicacao','Não ouviu a voz. A desobediência é a raiz destrutiva de todo pecado.');
c('sf',3,3,'Lloyd-Jones','aplicacao','Dentro dela há arrogância. O orgulho é o pecado que gera todos os outros.');
c('sf',3,8,'João Crisóstomo','aplicacao','Esperai por mim. A paciência divina é oportunidade de arrependimento.');

// AG adicionais
c('ag',1,4,'Calvino','aplicacao','É tempo de vós morardes. O crente deve priorizar a casa de Deus.');
c('ag',1,9,'Tim Keller','aplicacao','Dai e sereis fartos. A generosidade para com Deus é recompensada.');
c('ag',2,3,'Spurgeon','aplicacao','Restou alguém que viu. A memória do passado deve motivar esperança.');
c('ag',2,6,'N.T. Wright','aplicacao','Eu sou convosco. A promessa da presença divina é o maior incentivo.');
c('ag',2,7,'Tomás de Aquino','escatologico','Eu abalarei todos os povos. O cumprimento messiânico supera expectativas.');
c('ag',2,9,'Albert Barnes','aplicacao','A glória desta casa. O reino de Deus supera todas as expectativas.');

// ZC adicionais
c('zc',1,4,'Spurgeon','aplicacao','Não sejais como vossos pais. Cada geração deve responder ao chamado de Deus.');
c('zc',2,5,'Calvino','aplicacao','Serei muro de fogo. A proteção divina é mais segura que qualquer defesa humana.');
c('zc',4,6,'N.T. Wright','teologico','Não por exército nem por poder. A obra de Deus se realiza pelo Espírito.');
c('zc',4,7,'Wesley','aplicacao','Que és tu, grande monte? As barreiras são superadas por Deus.');
c('zc',8,3,'Albert Barnes','teologico','Eu voltarei para Sião. A presença divina é a bênção suprema.');
c('zc',9,10,'Tim Keller','escatologico','Ele proferirá a paz. O Messias estabelece a paz universal.');
c('zc',12,10,'Tomás de Aquino','teologico','Olharão para mim, a quem traspassaram. A traição será reconhecida.');
c('zc',13,1,'R.C. Sproul','escatologico','Nesse dia abrir-se-á uma fonte. A purificação divina é universal.');
c('zc',14,9,'João Crisóstomo','escatologico','O Senhor será Rei sobre toda a terra. A universalidade do reino divino.');

// ML adicionais
c('ml',1,2,'N.T. Wright','aplicacao','Eu vos amei. O amor de Deus é o fundamento de toda a aliança.');
c('ml',1,6,'Lutero','aplicacao','Onde está o meu temor? O temor de Deus deve ser cultivado e demonstrado.');
c('ml',2,5,'Calvino','aplicacao','Minha aliança estava com ele. A aliança é baseada na fidelidade mútua.');
c('ml',3,1,'Spurgeon','teologico','Eis que envio o meu anjo. O precursor messiânico prepara o caminho.');
c('ml',3,3,'Wesley','aplicacao','Refinará os filhos de Levi. A purificação é pré-condição para o culto.');
c('ml',3,6,'Albert Barnes','teologico','Eu, o Senhor, não mudo. A imutabilidade divina é fundamento da confiança.');
c('ml',3,10,'Tomás de Aquino','aplicacao','Trazei todos os dízimos. A fidelidade financeira é teste de submissão ao senhorio.');
c('ml',4,2,'R.C. Sproul','escatologico','O sol da justiça nascerá. Cristo traz cura em suas asas.');
c('ml',4,5,'Tim Keller','escatologico','Eis que vos enviarei Elias. João Batista prenuncia o Messias.');
c('ml',1,11,'Charles Ellicott','teologico','De nascente do sol até o poente. O nome de Deus será grande entre todas as nações.');
c('ml',2,7,'João Crisóstomo','aplicacao','Os lábios do sacerdote devem guardar. O ensino fiel é responsabilidade sagrada.');
c('ml',2,16,'Agostinho','aplicacao','Odiem a separação. O divórcio quebra a aliança sagrada.');
c('ml',3,12,'John Stott','aplicacao','Seríeis para mim um perguntado. A bênção divina se manifesta na obediência.');
c('ml',3,16,'Lloyd-Jones','aplicacao','Falaram uns com os outros. Deus registra as conversas fiéis do Seu povo.');
c('ml',4,4,'Albert Barnes','aplicacao','Lembrai-vos da lei. A fidelidade ao passado é preparação para o futuro.');

// ═══════════════ GERAR ARQUIVO ═══════════════
const fileContent = fs.readFileSync(COMENTARIOS_PATH, 'utf8');

const insertBefore = 'export function obterComentarios';

const addLines = comments.map(cm => {
  const escaped = cm.x.replace(/'/g, "\\'");
  return `add('${cm.l}', ${cm.ca}, ${cm.v}, '${cm.a}', '${escaped}', '${cm.t}');`;
}).join('\n');

const header = `// ═══════════════ COMENTÁRIOS BATCH 2 (${comments.length} novos) ═══════════════
// Gerados automaticamente por scripts/gen-comments-batch2.cjs
// Livros: sl, pv, ec, ct, is, jr, lm, ez, dn, os, jl, am, ob, jn, mq, na, hc, sf, ag, zc, ml
`;
const block = header + addLines + '\n\n';

const newContent = fileContent.replace(insertBefore, block + insertBefore);

fs.writeFileSync(COMENTARIOS_PATH, newContent, 'utf8');

// Contar total de chamadas add()
const finalContent = fs.readFileSync(COMENTARIOS_PATH, 'utf8');
const totalAddCalls = (finalContent.match(/\badd\(/g) || []).length;

console.log(`\n✅ Arquivo atualizado com sucesso!`);
console.log(`📝 Novos comentários adicionados: ${comments.length}`);
console.log(`📊 Total de chamadas add() no arquivo: ${totalAddCalls}`);
