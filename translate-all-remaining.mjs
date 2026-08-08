import fs from 'fs';
const path = 'C:\\Sola Scriptura BR\\src\\data\\comentarios.ts';
let content = fs.readFileSync(path, 'utf8');
let count = 0;

const translations = [
  // These use actual newlines as found in the file
];

// Instead of matching full text, match unique substrings
const simpleReplacements = [
  // Genesis
  ["Isaac and Rebekah are, at length, happily brought together. Observe", "Isaque e Rebeca são, finalmente, felizes juntos. Observe"],
  ["He went out to meditate, or pray, in the field, at the even-tide", "Saiu para meditar ou orar no campo, ao entardecer"],
  ["Here is, I. The respect which Joseph, as a subject, showed to his prince", "Aqui está: I. O respeito que José, como súdito, demonstrou a seu príncipe"],
  
  // Exodus
  ["Further directions concerning the dedicating of their firstborn to God", "Mais direções concernentes à dedicação dos primogênitos a Deus"],
  ["The firstlings of their cattle were to be dedicated to God, as part of their possessions", "Os primogênitos de seus gados deviam ser dedicados a Deus, como parte de suas posses"],
  ["Here is, I. A strict command for the sanctification of the sabbath day", "Aqui está: I. Uma ordem estrita para a santificação do dia de sábado"],
  ["The law of the sabbath had been given them before any other law, by was of preparation", "A lei do sábado havia sido dada antes de qualquer outra lei, como preparação"],
  ["This is the latter part of the law of the trespass-offering", "Esta é a última parte da lei da oferta pela transgressão"],
  ["The former part, which concerned trespasses about holy things, we had in the close of the foregoing chapter", "A primeira parte, que concernia transgressões sobre coisas santas, tivemos no final do capítulo anterior"],
  ["this concerns trespasses in common cases", "esta diz respeito a transgressões em casos comuns"],
  
  // Numbers
  ["The sudden death of the ten evil spies", "A morte súbita dos dez espiões malignos"],
  ["While the sentence was passing upon the people, before it was published, they died of the plague before the Lord", "Enquanto a sentença era pronunciada sobre o povo, antes de ser publicada, morreram da praga diante do Senhor"],
  ["God hereby showed his particular displeasure against those who sinned and made Israel to sin", "Deus aqui mostrou seu descontentamento particular contra aqueles que pecaram e fizeram Israel pecar"],
  ["The office of prophets was both to bless and to prophesy in the name of the Lord", "O ofício dos profetas era tanto abençoar quanto profetizar em nome do Senhor"],
  ["Balaam, as a prophet, per force had blessed Israel; here he foretels future events", "Balaão, como profeta, havia abençoado Israel por força; aqui ele prevê eventos futuros"],
  
  // Joshua
  ["The Gibeonites desire to make peace with Israel, being alarmed by the tidings they heard of the destruction of Jericho", "Os gibeonitas desejam fazer a paz com Israel, alarmados pelas notícias que ouviram da destruição de Jericó"],
  ["Other people heard those tidings, and were irritated thereby to the more hostility", "Outros povos ouviram essas notícias e foram irritados por elas para maior hostilidade"],
  
  // Judges
  ["Deborah stirs up herself and Barak to celebrate this victory in the most solemn manner", "Débora desperta a si mesma e a Baraque para celebrar esta vitória da maneira mais solene"],
  ["to the glory of God and the honour of Israel, for the encouragement of their friends", "para a glória de Deus e a honra de Israel, para encorajar seus amigos"],
  ["The cognizance God took of the cries of Israel, when at length they were directed towards him", "O reconhecimento que Deus fez dos gritos de Israel, quando finalmente foram dirigidos a ele"],
  ["Though in their prosperity they had neglected him and made court to his rivals", "Embora em sua prosperidade tivessem negligenciado e feito corte a seus rivais"],
  ["The princes and people of Gilead we left, in the close of the foregoing chapter, consulting about the choice of a general", "Deixamos os príncipes e o povo de Gileade, no final do capítulo anterior, consultando sobre a escolha de um general"],
  ["Here is, I. Samson violently pursued by the Philistine", "Aqui está: I. Sansão perseguido violentamente pelos filisteus"],
  ["They went up in a body, a more formidable force than they had together when Samson smote them hip and thigh", "Subiram em corpo, uma força mais formidável do que quando Sansão os feriu na coxa e na nádega"],
  ["Here is, I. The great wickedness of the men of Gibeah", "Aqui está: I. A grande maldade dos homens de Gaibeá"],
  ["One could not imagine that ever it should enter into the heart of men that had the use of human reason", "Não se poderia imaginar que jamais entrasse no coração de homens que tinham o uso da razão humana"],
  
  // Ruth
  ["Now Boaz himself appears, and a great deal of decency there appears in his carriage both towards his own servants and towards this poor stranger", "Agora Boaz aparece, e muita decência aparece em sua conduta tanto para com seus servos quanto para com esta pobre estrangeira"],
  
  // 1 Samuel
  ["Here is a short account of the issue of this battle", "Aqui está um breve relato do resultado desta batalha"],
  ["Israel was smitten, the army dispersed and totally routed, not retiring into the camp, as before", "Israel foi derrotado, o exército disperso e totalmente derrotado, não se retirando para o acampamento, como antes"],
  ["David, in distress, flies in the tabernacle of God, now pitched at Nob", "Davi, em aflição, foge para o tabernáculo de Deus, agora acampado em Nob"],
  ["Since Shiloh was forsaken, the tabernacle was often removed", "Desde que Siló foi abandonado, o tabernáculo era frequentemente removido"],
  ["Now we find why the prophet Gad (by divine direction, no doubt) ordered David to go into the land of Judah", "Agora descobrimos por que o profeta Gad (por direção divina, sem dúvida) ordenou a Davi ir para a terra de Judá"],
  ["since Saul neglected the public safety, he might take care of it", "já que Saul negligenciava a segurança pública, ele pudesse cuidar dela"],
  ["David absconding. He abode in a wilderness, in a mountain", "Davi escondido. Ele permaneceu em um deserto, em uma montanha"],
  ["We must here, 1. Commend his eminent virtues, his humility, modesty, fidelity to his prince", "Devemos aqui: 1. Apreciar suas virtudes eminentes, sua humildade, modéstia, fidelidade a seu príncipe"],
  ["The scripture makes no mention of the souls of Saul and his sons, what became of them after they were dead", "A Escritura não faz menção das almas de Saul e seus filhos, o que aconteceu com eles após a morte"],
  ["secret things belong not to us", "coisas secretas não nos pertencem"],
  ["How they were basely abused", "Como foram covardemente maltratados"],
  ["The humble address of all the tribes to David, beseeching him to take upon him the government", "O humilde endereçamento de todas as tribos a Davi, suplicando-lhe que assumisse o governo"],
  ["for they were now as sheep having no shepherd", "pois estavam agora como ovelhas sem pastor"],
  ["We read before how kind David was to Mephibosheth the son of Jonathan", "Lemos antes como Davi foi bondoso com Mefibosete, filho de Jônatas"],
  ["how he prudently entrusted his servant Ziba with the management of his estate", "como prudentemente confiou a seu servo Ziba o gerenciamento de sua propriedade"],
  
  // 1 Kings
  ["We have here, I. The tidings of Solomon", "Temos aqui: I. As notícias de Salomão"],
  ["The preferment of Benaiah and Zadok, two faithful friends to Solomon and his government", "A promoção de Benaías e Zadoc, dois fiéis amigos de Salomão e seu governo"],
  ["Joab being put to death, Benaiah was advanced to be general of the forces in his room", "Joabe sendo morto, Benaías foi avançado a general das forças em seu lugar"],
  ["The performance of the agreement between Solomon and Hiram", "O cumprimento do acordo entre Salomão e Hirão"],
  ["Each of the parties made good his engagement", "Cada uma das partes cumpriu seu compromisso"],
  ["Hiram delivered Solomon the timber, according to his bargain", "Hirão entregou a Salomão a madeira, conforme seu acordo"],
  ["The temple is called the house of the Lord", "O templo é chamado de casa do Senhor"],
  ["Directed and modelled by him. Infinite Wisdom was the architect", "Dirigido e modelado por ele. A Sabedoria Infinita era o arquiteto"],
  ["gave David the plan or pattern by the Spirit", "deu a Davi o plano ou modelo pelo Espírito"],
  ["The word God sent to Solomon, when he was engaged in building the temple", "A palavra que Deus enviou a Salomão, quando estava envolvido na construção do templo"],
  ["God let him know that he took notice of what he was doing", "Deus fez saber que notava o que ele estava fazendo"],
  ["None employ themselves better than they do who are employed in building up the house of God", "Ninguém se emprega melhor do que aqueles que se empregam em construir a casa de Deus"],
  ["The temple, though richly beautified, yet while it was without the ark was like a body without a soul", "O templo, embora ricamente embelezado, enquanto sem a arca era como um corpo sem alma"],
  ["or a candlestick without a candle", "ou um candelabro sem vela"],
  ["or (to speak more properly) a house without an inhabitant", "ou (para falar mais propriamente) uma casa sem habitante"],
  ["We are now to take a view of the miserable state of Israel, while the kingdom of Judah was happy under Asa", "Agora devemos considerar o estado miserável de Israel, enquanto o reino de Judá era feliz sob Asá"],
  ["Here Micaiah does well, but, as is common, suffers ill for so doing", "Aqui Micaías faz bem, mas, como é comum, sofre mal por fazer assim"],
  ["how faithfully he delivered his message, as one that was more solicitous to please God than to humour either the king or the people", "como fielmente entregou sua mensagem, como alguém mais zeloso em agradar a Deus do que em agradar ao rei ou ao povo"],
  ["How the siege of Samaria was raised in the evening, at the edge of night", "Como o cerco de Samaria foi levantado ao anoitecer, à beira da noite"],
  ["not by might or power, but by the Spirit of the Lord of hosts", "não por força ou poder, mas pelo Espírito do Senhor dos Exércitos"],
  ["We may suppose it was designed when they had finished the solemnity of the king", "Podemos supor que foi designado quando terminaram a solenidade do rei"],
  ["Here are three kings brought to their graves in these few verses", "Aqui temos três reis levados aos seus túmulos nestes poucos versículos"],
  ["We attended his funeral once before", "Assistimos a seu funeral antes"],
  ["The preferment of Benaiah and Zadok", "A promoção de Benaías e Zadoc"],
  ["two faithful friends to Solomon and his government", "dois fiéis amigos de Salomão e seu governo"],
  
  // 2 Kings
  ["An embassy sent to Hezekiah by the king of Babylon, to congratulate him on his recovery", "Uma embaixada enviada a Ezequias pelo rei da Babilônia, para felicita-lo por sua recuperação"],
  ["The kings of Babylon had hitherto been only deputies and tributaries to the kings of Assyria", "Os reis da Babilônia haviam sido até agora apenas delegados e tributários dos reis da Assíria"],
  ["Here is the doom of Judah and Jerusalem read, and it is heavy doom", "Aqui está a sentença de Judá e Jerusalém lida, e é uma sentença pesada"],
  ["The prophets were sent, in the first place, to teach them the knowledge of God", "Os profetas foram enviados, em primeiro lugar, para ensinar-lhes o conhecimento de Deus"],
  ["to remind them of their duty and direct them in it", "lembrá-los de seu dever e direcioná-los nele"],
  ["This should have been the history of king Jehoiachin", "Esta deveria ter sido a história do rei Jeoaquim"],
  
  // 1 Chronicles
  ["The priests and Levites were more concerned than any other Israelites to preserve their pedigree clear", "Os sacerdotes e levitas estavam mais preocupados do que quaisquer outros israelitas em preservar sua genealogia clara"],
  ["and to be able to prove it, because all the honours and privileges of their office depended upon it", "e serem capazes de prová-la, porque todas as honras e privilégios de seu ofício dependiam dela"],
  ["From the triumph of the Philistines over the body of Saul we may learn", "Do triunfo dos filisteus sobre o corpo de Saul podemos aprender"],
  ["That the greater dignity men are advanced to the greater disgrace they are in danger of falling into", "Que quanto maior a dignidade a que os homens são elevados, maior o perigo de queda em desgraça"],
  ["Here is, I. David's interview with Jonathan", "Aqui está: I. A entrevista de Davi com Jônatas"],
  ["The Philistines were nearly subdued", "Os filisteus estavam quase subjugados"],
  ["as in the destruction of the Canaanites by Joshua the sons of Anak were last subdued", "como na destruição canaanita por Josué os filhos de Anaque foram os últimos subjugados"],
  ["so here in the conquest of the Philistines the giants were last subdued", "assim aqui na conquista dos filisteus os gigantes foram os últimos subjugados"],
  ["The crown entailed, according to the divine appointment", "A coroa legada, de acordo com a designação divina"],
  ["David made Solomon king, not to reign with him, or reign under him, but only to reign after him", "Davi fez Salomão rei, não para reinar com ele, ou reinar sob ele, mas apenas para reinar após ele"],
  ["Here is, 1. Solomon's instructions to the builders of the temple", "Aqui está: 1. As instruções de Salomão para os construtores do templo"],
  ["The return which Huram made to Solomon", "O retorno que Hurão fez a Salomão"],
  ["Though Solomon was a man of great learning and knowledge, yet he spent his days, not in contemplation, but in action", "Embora Salomão fosse um homem de grande aprendizado e conhecimento, ele passou seus dias, não em contemplação, mas em ação"],
  
  // 2 Chronicles
  ["This passage of story had been largely considered in the Kings", "Esta passagem da história havia sido amplamente considerada nos Reis"],
  ["because our Saviour has proposed it as an example to us in our enquiries after him", "porque nosso Salvador a propôs como exemplo para nós em nossas buscas por ele"],
  ["The people pleased", "O povo satisfeito"],
  ["When the king stood at his pillar, whose right it was to stand there", "Quando o rei ficou em sua coluna, cujo direito era estar lá"],
  ["all the people of the land rejoiced to see a rod sprung out of the stem of Jesse", "todo o povo da terra se alegrou ao ver um rebento brotar do tronco de Jessé"],
  ["Here is the only blot we find on the name of king Uzziah", "Aqui está a única mancha que encontramos no nome do rei Ozias"],
  ["Whoredom, murder, oppression, persecution, and especially idolatry, gave character to the worst of the kings", "Prostituição, assassinato, opressão, perseguição, e especialmente idolatria, deram caráter aos piores dos reis"],
  ["Here is, I. A passover resolved upon", "Aqui está: I. Uma Páscoa decidida"],
  ["That annual feast was instituted as a memorial of the bringing of the children of Israel out of Egypt", "Aquela festa anual foi instituída como memorial da saída dos filhos de Israel do Egito"],
  
  // Proverbs
  ["A plain intimation what a hard thing it is to find a truly ingenious industrious man", "Uma clara indicação de quão difícil é encontrar um homem verdadeiramente engenhoso e industrioso"],
  ["The people will have cause to rejoice or mourn according as their rulers are righteous or wicked", "O povo terá motivo para se alegrar ou lamentar de acordo com seus governantes serem justos ou perversos"],
  ["if the righteous be in authority, sin will be punished and restrained", "se os justos estiverem na autoridade, o pecado será punido e contido"],
  ["if the wicked get power in their hands, wickedness will abound", "se os perversos obtiverem poder em suas mãos, a maldade abundará"],
  ["The good character of a wise and virtuous man implied", "O bom caráter de um homem sábio e virtuoso implícito"],
  ["He is one that has rule over his own spirit", "É alguém que tem domínio sobre seu próprio espírito"],
  ["he maintains the government of himself, and of his own appetites and passions", "mantém o governo de si mesmo, e de seus apetites e paixões"],
  ["and does not suffer them to rebel against reason and conscience", "e não permite que se rebellem contra a razão e a consciência"],
  
  // Ecclesiastes
  ["An encomium of wisdom, that is, of true piety, guided in all its exercises by prudence and discretion", "Um elogio da sabedoria, isto é, da verdadeira piedade, guiada em todos os seus exercícios pela prudência e discrição"],
  ["The wise man is the good man, that knows God and glorifies him", "O homem sábio é o homem bom, que conhece Deus e o glorifica"],
  ["An admonition both to old people and to young people, to think of dying, and get ready for it", "Uma admoestação tanto para pessoas idosas quanto para jovens, para pensar na morte, e se preparar para ela"],
  ["Having by many excellent precepts taught us how to live well, the preacher comes now, towards the close of his discourse, to teach us how to die well", "Depois de nos ensinar por muitos excelentes preceitos como viver bem, o pregador vem agora, para o final de seu discurso, para nos ensinar como morrer bem"],
  
  // Isaiah
  ["The name of the prophet, Isaiah, or Jesahiahu", "O nome do profeta, Isaías, ou Jesaias"],
  ["which, in the New Testament is read Esaias", "que no Novo Testamento é lido como Esaias"],
  ["His name signifies the salvation of the Lord", "Seu nome significa a salvação do Senhor"],
  ["a proper name for a prophet by whom God gives knowledge of salvation to his people", "um nome próprio para um profeta por quem Deus dá conhecimento da salvação a seu povo"],
  ["The woeful degeneracy of Judah and Jerusalem is sadly lamented", "A lamentável degeneração de Judá e Jerusalém é tristemente lamentada"],
  ["What the royal city had been, a faithful city, faithful to God and the interests of his kingdom among men", "O que a cidade real havia sido, uma cidade fiel, fiel a Deus e aos interesses de seu reino entre os homens"],
  
  // Jeremiah
  ["God appeals to all the neighbours, nay, to the whole world, concerning the equity of his proceedings against Judah and Jerusalem", "Deus apela a todos os vizinhos, sim, ao mundo inteiro, sobre a equidade de seus procedimentos contra Judá e Jerusalém"],
  ["God threatening the destruction of a sinful people", "Deus ameaçando a destruição de um povo pecaminoso"],
  ["He has borne long with them, but they are still more and more provoking, and therefore now their ruin is resolved on", "Ele suportou por muito tempo, mas eles ainda são cada vez mais provocadores, e portanto agora sua ruína está resolvida"],
  ["They shall be quite stripped of all their comforts", "Serão completamente despojados de todos os seus confortos"],
  ["The prophet here, as prosecutor in God's name, arraigns the sinners of Judah and Jerusalem", "O profeta aqui, como promotor em nome de Deus, acusa os pecadores de Judá e Jerusalém"],
  ["Jeremiah's imprisonment by Pashur the priest", "O encarceramento de Jeremias pelo sacerdote Pasur"],
  
  // Ezekiel
  ["The casting of these three faithful servants of God into the fiery furnace", "O lançamento desses três fiéis servos de Deus na fornalha de fogo"],
  ["Nebuchadnezzar had himself known and owned so much of the true God", "Nabucodonosor havia conhecido e reconhecido tanto do verdadeiro Deus"],
  ["The strict observations that were made, on inspecting their bodies, by the princes and governors", "As observações estritas que foram feitas, ao inspecionar seus corpos, pelos príncipes e governadores"],
  ["That indeed a notable miracle has been done is manifest, and we cannot deny it", "Que de fato um notável milagre foi feito é manifesto, e não podemos negá-lo"],
  
  // Daniel
  ["The date of this vision", "A data desta visão"],
  ["It was in the third year of the reign of Belshazzar", "Foi no terceiro ano do reinado de Belsazar"],
  ["which proved to be his last year, as many reckon", "que se revelou ser seu último ano, como muitos calculam"],
  ["That Daniel might not be surprised at the destruction of Babylon, now at hand", "Para que Daniel não fosse surpreendido pela destruição da Babilônia, agora iminente"],
  ["God gives him a foresight of the destruction of other kingdoms hereafter", "Deus lhe dá um pressentimento da destruição de outros reinos no futuro"],
  
  // Hosea
  ["Two evil things, both Judah and Ephraim are here charged with", "Duas coisas más, tanto Judá quanto Efraim são aqui acusados"],
  ["That they were not firm to their own convictions, but were unsteady, unstable as water", "Que não foram firmes em suas próprias convicções, mas foram instáveis, instáveis como água"],
  ["What shall I do unto thee?", "Que farei a ti?"],
  ["This is a strange expression. Can Infinite Wisdom be at a loss what to do?", "Esta é uma expressão estranha. A Sabedoria Infinita pode estar em dúvida sobre o que fazer?"],
  
  // Amos
  ["A very terrible threatening of destruction approaching", "Uma ameaça muito terrível de destruição se aproximando"],
  ["Since they would not take the right course to obtain the favour of God", "Como não quiseram tomar o caminho certo para obter o favor de Deus"],
  ["God would take an effectual course to make them feel the weight of his displeasure", "Deus tomaria uma course eficaz para fazê-los sentir o peso de seu descontentamento"],
  ["The threatening is introduced with more than ordinary solemnity, to strike an awe upon them", "A ameaça é introduzida com mais solenidade do que o habitual, para infundir temor neles"],
  
  // Jonah
  ["The honour God put upon Jonah, in giving him a commission to go and prophesy against Nineveh", "A honra que Deus colocou sobre Jônatas, ao dar-lhe uma comissão para ir e profetizar contra Nínive"],
  ["Jonah signifies a dove, a proper name for all God's messengers", "Jônatas significa pomba, um nome próprio para todos os mensageiros de Deus"],
  
  // Micah
  ["The abasement and distress of Zion", "A humilhação e aflição de Sião"],
  ["The Jewish nation, for many years before the captivity, dwindled, and fell into disgrace", "A nação judaica, por muitos anos antes do cativeiro, diminuiu e caiu em desgraça"],
  
  // Habakkuk
  ["The prefaces to the message are very solemn and such as may engage our most serious attention", "Os preâmbulos da mensagem são muito solenes e tais que podem merecer nossa mais séria atenção"],
  ["The people are commanded to give audience", "O povo é ordenado a dar ouvidos"],
  ["What the prophet speaks he speaks from God, and in his name", "O que o profeta fala ele fala de Deus, e em seu nome"],
  
  // Zechariah
  ["A prophecy, I. Of the sufferings of Christ, of him who was to be pierced", "Uma profecia: I. Do sofrimento de Cristo, daquele que seria traspassado"],
  ["The Jewish teachers had corrupted many of the commandments, by interpreting them more loosely than they were intended", "Os mestres judeus haviam corrompido muitos dos mandamentos, interpretando-os mais livremente do que pretendiam"],
  
  // Matthew
  ["Christ in his own country", "Cristo em sua própria terra"],
  ["He went about doing good, yet left not any place till he had finished his testimony there", "Ele andava fazendo o bem, mas não deixou nenhum lugar até completar seu testemunho ali"],
  ["Christ does not take refusers at their first word, but repeats his offers to those who have often repulsed them", "Cristo não aceita recusas na primeira palavra, mas repete suas ofertas àqueles que frequentemente as rejeitaram"],
  
  // Romans
  ["The person who writes the epistle described", "A pessoa que escreve a epístola descrita"],
  ["Paul, a servant of Jesus Christ; this is his title of honour, which he glories in", "Paulo, servo de Jesus Cristo; este é seu título de honra, no qual se gloria"],
  ["Called to be an apostle", "Chamado a ser apóstolo"],
  ["Here the apostle proves that Abraham was justified not by works, but by faith", "Aqui o apóstolo prova que Abraão foi justificado não por obras, mas por fé"],
  ["Those that of all men contended most vigorously for a share in righteousness by the privileges they enjoyed", "Aqueles que entre todos os homens mais vigorosamente contestaram por uma parte na justiça pelos privilégios que desfrutavam"],
  ["were the Jews, and therefore he appeals to the case of Abraham their father", "eram os judeus, e portanto ele apela para o caso de Abraão, o pai deles"],
  ["In these words the apostle describes a fourth illustrious branch of the happiness of believers, namely, a title to the future glory", "Nestas palavras o apóstolo descreve uma quarta ilustre ramificação da felicidade dos crentes, a saber, um título para a glória futura"],
  ["This is fitly annexed to our sonship; for as the adoption of sons entitles us to that glory, so the disposition of sons fits and prepares us for it", "Isso é convenientemente anexado à nossa filiação; pois assim como a adoção de filhos nos dá direito àquela glória, assim a disposição de filhos nos prepara e nos qualifica para ela"],
  ["If children, then heirs", "Se filhos, então herdeiros"],
  ["In earthly inheritances this rule does not hold, only the first-born are heirs", "Em heranças terrestres essa regra não se sustenta, apenas os primogênitos são herdeiros"],
  ["but the church is a church of first-born, for they are all heirs", "mas a igreja é uma igreja de primogênitos, pois todos são herdeiros"],
  ["We are here taught a lesson of sobriety and godliness in ourselves", "Somos aqui ensinados uma lição de sobriedade e piedade em nós mesnos"],
  ["Our main care must be to look to ourselves", "Nossa principal preocupação deve ser cuidar de nós mesmos"],
  ["Four things we are here taught, as a Christian's duty", "Quatro coisas somos aqui ensinados, como dever do cristão"],
  
  // 1 Corinthians
  ["Here is another prayer directed to God, as the God of hope", "Aqui há outra oração dirigida a Deus, como o Deus da esperança"],
  ["it is, as the former, for spiritual blessings", "é, como a anterior, por bênçãos espirituais"],
  ["these are the best blessings, and to be first and chiefly prayed for", "estas são as melhores bênçãos, e devem ser primeiramente e principalmente pedido"],
  ["He addresses himself to God, as the God of hope", "Ele se dirige a Deus, como o Deus da esperança"],
  ["It is good in prayer to fasten upon those names, titles, and attributes of God, which are most suitable to the errand we come upon", "É bom na oração fixar-se naqueles nomes, títulos e atributos de Deus, que são mais adequados ao motivo pelo qual viemos"],
  ["Here the apostle gives an account of his ministry among them", "Aqui o apóstolo dá um relato de seu ministério entre eles"],
  ["He thanks God he had baptized but a few among them", "Ele dá graças a Deus por ter batizado apenas poucos entre eles"],
  ["But how was this a proper matter for thankfulness?", "Mas como isso era assunto apropriado para gratidão?"],
  ["Was it not a part of the apostolical commission to baptize all nations?", "Não fazia parte da comissão apostólica batizar todas as nações?"],
  ["And could Paul give thanks to God for his own neglect of duty?", "E Paulo poderia dar graças a Deus por sua própria negligência do dever?"],
  ["He is not to be understood as giving thanks for any neglect, but for preventing the imputation of it", "Ele não deve ser entendido como dando graças por qualquer negligência, mas por prevenir a imputação dela"],
  ["He determined to know nothing among them but Jesus Christ and him crucified", "Ele determinou não saber nada entre eles senão Jesus Cristo e este crucificado"],
  ["Christ, in his person and offices, is the sum and substance of the gospel", "Cristo, em sua pessoa e ofícios, é a soma e substância do evangelho"],
  ["Here the apostle informs us what foundation he had laid at the bottom of all his labours among them", "Aqui o apóstolo nos informa qual fundamento ele havia lançado no fundo de todos os seus labores entre eles"],
  ["even Jesus Christ, the chief corner-stone", "mesmo Jesus Cristo, a pedra angular principal"],
  ["Upon this foundation all the faithful ministers of Christ build", "Sobre este fundamento todos os fiéis ministros de Cristo constroem"],
  ["Other foundation can no man lay besides what is laid", "Ninguém pode lançar outro fundamento além do que foi lançado"],
  ["The doctrine of our Saviour and his mediation is the principal doctrine of the gospel", "A doutrina de nosso Salvador e sua mediação é a principal doutrina do evangelho"],
  ["He tells them of his having sent Timothy to them", "Ele lhes conta de ter enviado Timóteo a eles"],
  ["to bring them into remembrance of his ways in Christ, as he taught every where in every church", "para lembrá-los de seus caminhos em Cristo, como ensinou em toda parte em cada igreja"],
  ["Those who have had ever so good teaching are apt to forget, and need to have their memories refreshed", "Aqueles que tiveram um ensino muito bom são propensos a esquecer, e precisam ter suas memórias renovadas"],
  ["The same truth, taught over again, if it give no new light, may make new and quickening impressions", "A mesma verdade, ensinada novamente, se não dá nova luz, pode fazer novas e vivificantes impressões"],
  ["He takes occasion to warn them against many heinous evils, to which they had been formerly addicted", "Ele aproveita para alertá-los contra muitos males graves, aos quais anteriormente eram viciados"],
  ["that such sinners should not inherit the kingdom of God", "que tais pecadores não herdarão o reino de Deus"],
  ["The unrighteous shall not inherit the kingdom of God", "Os injustos não herdarão o reino de Deus"],
  ["shall not be owned as true members of his church on earth, nor admitted as glorious members of the church in heaven", "não serão reconhecidos como verdadeiros membros de sua igreja na terra, nem admitidos como gloriosos membros da igreja no céu"],
  ["He takes occasion to advise them to continue in the state and condition in which Christianity found them", "Ele aproveita para aconselhá-los a continuarem no estado e condição em que o cristianismo os encontrou"],
  ["Our states and circumstances in this world are distributions of divine Providence", "Nossos estados e circunstâncias neste mundo são distribuições da Providência Divina"],
  ["This fixes the bounds of men's dwelling", "Isso fixa os limites da morada dos homens"],
  ["He hints at the great encouragement he had to act in this manner", "Ele insinua o grande encorajamento que tinha para agir desta maneira"],
  ["He had a glorious prize, an incorruptible crown, in view", "Ele tinha um prêmio glorioso, uma coroa incorruptível, em vista"],
  ["Upon this head he compares himself to the racers and combatants in the Isthmian games", "Nesse assunto ele se compara aos corredores e competidores nos jogos Ístmicos"],
  ["an allusion well known to the Corinthians, because they were celebrated in their neighbourhood", "uma alusão bem conhecida dos coríntios, porque eram celebrados em sua vizinhança"],
  ["Know you not that those who run in a race run all, but one obtaineth the prize?", "Não sabeis que aqueles que correm numa pista correm todos, mas apenas um recebe o prêmio?"],
  ["The apostle urges the general caution against idolatry", "O apóstolo insta o aviso geral contra a idolatria"],
  ["in the particular case of eating the heathen sacrifices as such", "no caso particular de comer os sacrifícios pagãos como tais"],
  ["I speak to wise men, judge you what I say", "Falo a homens sábios, vós mesmos julgai o que digo"],
  
  // 2 Corinthians
  ["an apology for seeming to commend himself", "uma desculpa por parecer elogiar a si mesmo"],
  ["He thought it convenient to protest his sincerity to them", "Ele achou conveniente protestar sua sinceridade a eles"],
  ["because there were some at Corinth who endeavoured to blast his reputation", "porque havia alguns em Corinto que se esforçavam para destruir sua reputação"],
  ["yet he was not desirous of vain-glory", "no entanto ele não era desejoso de vanglória"],
  ["He neither needed nor desired any verbal commendation to them", "Ele não precisava nem desejava nenhuma recomendação verbal a eles"],
  ["nor letters testimonial from them, as some others did", "nem cartas de recomendação deles, como outros faziam"],
  ["meaning the false apostles or teachers", "significando os falsos apóstolos ou mestres"],
  ["Here the apostle makes a comparison between the Old Testament and the New", "Aqui o apóstolo faz uma comparação entre o Antigo e o Novo Testamento"],
  ["the law of Moses and the gospel of Jesus Christ", "a lei de Moisés e o evangelho de Jesus Cristo"],
  ["that they were able ministers of the New Testament", "que eram ministros competentes do Novo Testamento"],
  ["He distinguishes between the letter and the spirit even of the New Testament", "Ele distingue entre a letra e o espírito mesmo do Novo Testamento"],
  ["The apostle commends the brethren who were sent to them to collect their charity", "O apóstolo recomenda os irmãos que foram enviados a eles para coletar sua caridade"],
  ["He commends Titus", "Ele recomenda a Tito"],
  ["For his earnest care and great concern of heart for them", "Por seu zeloso cuidado e grande preocupação de coração por eles"],
  ["and desire in all things to promote their welfare", "e desejo em todas as coisas promover seu bem-estar"],
  ["The apostle speaks very respectfully to the Corinthians, and with great skill", "O apóstolo fala muito respeitosamente aos coríntios, e com grande habilidade"],
  ["while he seems to excuse his urging them so earnestly to charity, still presses them thereto", "enquanto parece desculpar-se por instá-los com tanta insistência à caridade, ainda assim os pressiona para ela"],
  ["It was needless to press them with further arguments to afford relief to their poor brethren", "Era desnecessário pressioná-los com mais argumentos para oferecer alívio a seus irmãos pobres"],
  ["He knew their forwardness", "Ele conhecia sua prontidão"],
  ["Do you look on things after the outward appearance?", "Vós olhais as coisas pela aparência externa?"],
  ["Is this a fit measure or rule to make an estimate of things or persons by", "É esta uma medida ou regra adequada para fazer uma estimativa de coisas ou pessoas"],
  ["and to judge between me and my adversaries", "e julgar entre mim e meus adversários"],
  ["In outward appearance, Paul was mean and despicable with some", "Na aparência externa, Paulo era baixo e desprezível para alguns"],
  ["he did not make a figure, as perhaps some of his competitors might do", "ele não fazia figura, como talvez alguns de seus competidores faziam"],
  ["Would to God you could bear with me a little in my folly", "Quem dera que pudésseis suportar-me um pouco em minha tolice"],
  ["He calls this folly, because too often it is really no better", "Ele chama isso de tolice, porque frequentemente realmente não é melhor"],
  ["As much against the grain as it is with a proud man to acknowledge his infirmities", "Tanto contra a natureza quanto é para um orgulhoso reconhecer suas fraquezas"],
  ["so much against the grain is it with a vain man to acknowledge his good qualities", "tanto contra a natureza quanto é para um vaidoso reconhecer suas boas qualidades"],
  ["Here the apostle gives a large account of his own qualifications, labours, and sufferings", "Aqui o apóstolo dá um largo relato de suas próprias qualificações, labores e sofrimentos"],
  ["not out of pride or vain-glory, but to the honour of God", "não por orgulho ou vanglória, mas para a honra de Deus"],
  ["who had enabled him to do and suffer so much for the cause of Christ", "que o havia capacitado a fazer e sofrer tanto pela causa de Cristo"],
  ["wherein he excelled the false apostles", "em que ele excedia os falsos apóstolos"],
  ["who would lessen his character and usefulness among the Corinthians", "que diminuíam seu caráter e utilidade entre os coríntios"],
  ["He mentions the privileges of his birth", "Ele menciona os privilégios de seu nascimento"],
  ["which were equal to any they could pretend to", "que eram iguais a qualquer que eles pudessem pretender"],
  ["He was a Hebrew of the Hebrews", "Ele era hebreu dos hebreus"],
  
  // Galatians
  ["He puts them in mind of what they were before their conversion to the faith of Christ", "Ele lhes lembra do que eram antes de sua conversão à fé de Cristo"],
  ["and what a blessed change their conversion had made upon them", "e que mudança abençoada sua conversão havia feito neles"],
  ["thence endeavours to convince them of their great weakness in hearkening to those who would bring them under the bondage of the law of Moses", "daí esforça-se para convencê-los de sua grande fraqueza em dar ouvidos àqueles que queriam trazê-los sob a escravidão da lei de Moisés"],
  ["He reminds them of their past state and behaviour", "Ele lhes lembra de seu estado e comportamento passado"],
  ["Then they knew not God; they were grossly ignorant of the true God", "Então eles não conheciam a Deus; eram grosseiramente ignorantes do verdadeiro Deus"],
  
  // Ephesians
  ["Put on therefore bowels of mercy", "Vesti-vos, portanto, de entranhas de misericórdia"],
  ["We must not only put off anger and wrath, but we must put on compassion and kindness", "Não devemos apenas despir a ira e a indignação, mas devemos vestir a compaixão e a bondade"],
  ["not only cease to do evil, but learn to do well", "não apenas cessar de fazer o mal, mas aprender a fazer o bem"],
  ["not only not do hurt to any, but do what good we can to all", "não apenas não fazer mal a ninguém, mas fazer todo o bem que pudermos a todos"],
  ["The argument here used to enforce the exhortation is very affecting", "O argumento aqui usado para reforçar a exortação é muito comovente"],
  ["Those who are holy are the elect of God", "Aqueles que são santos são os eleitos de Deus"],
  ["and those who are the elect of God are truly holy", "e aqueles que são os eleitos de Deus são verdadeiramente santos"],
  ["Walk in wisdom towards those who are without", "Procedei com sabedoria para com aqueles de fora"],
  ["Be careful, in all your converse with them, to get no hurt by them", "Tende cuidado, em todos os vossos convívios com eles, para não receber dano deles"],
  ["or contract any of their customs", "ou contrair quaisquer de seus costumes"],
  ["for evil communications corrupt good manners", "porque más comunicações corrompem bons costumes"],
  ["and to do no hurt to them", "e para não fazer mal a eles"],
  ["or increase their prejudices against religion", "ou aumentar seus preconceitos contra a religião"],
  
  // Philippians
  ["Here we have an account of Paul's journey to Rome", "Aqui temos um relato da viagem de Paulo a Roma"],
  ["In these verses the apostle again tells the Thessalonians of his earnest and constant prayer for them", "Nestes versículos o apóstolo novamente diz aos tessalonicenses de sua oração sincera e constante por eles"],
  ["He could not be present with them, yet he had a constant remembrance of them", "Ele não podia estar presente com eles, mas tinha constante lembrança deles"],
  ["they were much upon his thoughts", "eles estavam muito em seus pensamentos"],
  ["he wished them well, and could not express his good-will and good wishes to them better than in earnest constant prayer to God for them", "ele desejava-lhes o bem, e não podia expressar seus bons desejos e votos a eles melhor do que em oração sincera e constante a Deus por eles"],
  ["The believing thoughts and expectation of the second coming of Christ should put us upon prayer to God", "Os pensamentos crentes e a expectativa da segunda vinda de Cristo devem nos levar à oração a Deus"],
  
  // 1 Thessalonians
  ["Here is, I. The inscription of the epistle, from whom it is sent", "Aqui está: I. A inscrição da epístola, de quem é enviada"],
  ["Paul an apostle of Jesus Christ, constituted an apostle by the commandment of God our Saviour", "Paulo, apóstolo de Jesus Cristo, constituído apóstolo pelo mandamento de Deus, nosso Salvador"],
  ["and Lord Jesus Christ", "e Senhor Jesus Cristo"],
  ["His credentials were unquestionable", "Suas credenciais eram inquestionáveis"],
  ["He had not only a commission, but a commandment", "Ele não tinha apenas uma comissão, mas um mandamento"],
  ["not only from God our Saviour, but from Jesus Christ", "não apenas de Deus, nosso Salvador, mas de Jesus Cristo"],
  ["he was a preacher of the gospel of Christ", "ele era pregador do evangelho de Cristo"],
  ["and a minister of the kingdom of Christ", "e ministro do reino de Cristo"],
  ["God is our Saviour", "Deus é nosso Salvador"],
  ["Jesus Christ is our hope", "Jesus Cristo é a nossa esperança"],
  
  // 1 Timothy
  ["Here the apostle instructs Timothy how to guard against the judaizing teachers", "Aqui o apóstolo instrui Timóteo como se guardar contra os mestres judaizantes"],
  ["or others who mingled fables and endless genealogies with the gospel", "ou outros que misturavam fábulas e genealogias intermináveis com o evangelho"],
  ["He shows the use of the law, and the glory of the gospel", "Ele mostra o uso da lei, e a glória do evangelho"],
  ["The end of the commandment is charity, or love", "O fim do mandamento é a caridade, ou amor"],
  ["The main scope and drift of the divine law are to engage us to the love of God and one another", "O principal objetivo e tendência da lei divina é nos engajar no amor a Deus e uns aos outros"],
  ["He returns thanks to Jesus Christ for putting him into the ministry", "Ele dá graças a Jesus Cristo por colocá-lo no ministério"],
  ["It is Christ's prerogative to put men into the ministry", "É prerrogativa de Cristo colocar homens no ministério"],
  ["It is his gift that they are fit for it", "É seu dom que eles sejam aptos para isso"],
  ["Ministers are reprovers by office", "Os ministros são repreendedores por ofício"],
  ["it is a part, though the least pleasing part, of their office", "é uma parte, embora a menos agradável parte, de seu ofício"],
  ["they are to preach the word, to reprove and rebuke", "eles devem pregar a palavra, repreender e repreender"],
  ["A great difference is to be made in our reproofs, according to the age, quality, and other circumstances, of the persons rebuked", "Uma grande diferença deve ser feita em nossas repreensões, de acordo com a idade, qualidade e outras circunstâncias, das pessoas repreendidas"],
  
  // 2 Timothy
  ["Here is, I. The inscription of the epistle", "Aqui está: I. A inscrição da epístola"],
  ["Paul calls himself an apostle by the will of God", "Paulo se chama apóstolo pela vontade de Deus"],
  ["merely by the good pleasure of God, and by his grace", "meramente pelo bom prazer de Deus, e por sua graça"],
  ["which he professes himself unworthy of", "da qual ele professa ser indigno"],
  ["According to the promise of life which is in Christ Jesus", "De acordo com a promessa de vida que está em Cristo Jesus"],
  ["The gospel is the promise of life in Christ Jesus", "O evangelho é a promessa de vida em Cristo Jesus"],
  ["life is the end, and Christ the way", "a vida é o fim, e Cristo o caminho"],
  ["I put thee in remembrance", "Eu te lembro"],
  ["The best men need remanners", "Os melhores homens precisam de lembranças"],
  ["what we know we should be reminded of", "do que sabemos devemos ser lembrados"],
  ["He exhorts him to stir up the gift of God that was in him", "Ele o exorta a avivar o dom de Deus que estava nele"],
  ["Stir it up as fire under the embers", "Aviva-o como fogo sob as brasas"],
  
  // Titus
  ["Here is the preface to the epistle, showing", "Aqui está o preâmbulo da epístola, mostrando"],
  ["Paul, a Gentile name taken by the apostle of the Gentiles", "Paulo, um nome gentio tomado pelo apóstolo dos gentios"],
  ["Ministers will accommodate even smaller matters, so that they may be any furthering of acceptance in their work", "Os ministros se adaptarão a assuntos menores, para que possam facilitar a aceitação em seu trabalho"],
  ["When the Jews rejected the gospel, and the Gentiles received it", "Quando os judeus rejeitaram o evangelho, e os gentios o receberam"],
  ["we read no more of this apostle by his Jewish name Saul, but by his Roman one, Paul", "não lemos mais deste apóstolo por seu nome judaico Saul, mas por seu nome romano, Paulo"],
  ["A servant of God, and an apostle of Jesus Christ", "Um servo de Deus, e apóstolo de Jesus Cristo"],
  ["The apostle here gives Titus directions about ordination", "O apóstolo aqui dá a Tito direções sobre ordenação"],
  ["showing whom he should ordain, and whom not", "mostrando quem ele deveria ordenar, e quem não"],
  ["Their qualifications respecting their life and manners", "Suas qualificações referentes a sua vida e costumes"],
  ["more general: If any be blameless", "mais geral: Se alguém for irrepreensível"],
  ["not absolutely without fault, so none are", "não absolutamente sem falta, pois ninguém é"],
  
  // Hebrews
  ["The apostle, having proved the pre-eminence of the gospel above the law", "O apóstolo, tendo provado a preeminência do evangelho acima da lei"],
  ["from the pre-eminence of the Lord Jesus Christ above the prophets", "da preeminência do Senhor Jesus Cristo acima dos profetas"],
  ["now proceeds to show that he is much superior not only to the prophets, but to the angels themselves", "agora prossegue para mostrar que ele é muito superior não apenas aos profetas, mas aos próprios anjos"],
  ["In this he obviates an objection that the Jewish zealots would be ready to make", "Nisso ele previne uma objeção que os zelotes judeus estariam prontos a fazer"],
  ["that the law was not only delivered by men, but ordained by angels", "que a lei não foi apenas entregue por homens, mas ordenada por anjos"],
  ["who attended at the giving forth of the law", "que compareceram na entrega da lei"],
  ["The apostle, having applied himself to the fears of the Hebrews", "O apóstolo, tendo se dirigido aos medos dos hebreus"],
  ["in order to excite their diligence and prevent their apostasy", "para estimular sua diligência e prevenir sua apostasia"],
  ["now proceeds to apply himself to their hopes", "agora prossegue para se dirigir às suas esperanças"],
  ["and candidly declares the good hope he had concerning them", "e candidamente declara a boa esperança que tinha a respeito deles"],
  ["that they would persevere", "de que eles perseverariam"],
  ["But beloved, we are persuaded better things of you", "Mas amados, somos persuadidos de melhores coisas a vosso respeito"],
  ["things that accompany salvation", "coisas que acompanham a salvação"],
  ["though we thus speak", "embora assim falemos"],
  ["The apostle undertakes to deliver to us the mind and meaning of the Holy Ghost", "O apóstolo se propõe a nos entregar o pensamento e o significado do Espírito Santo"],
  ["in all the ordinances of the tabernacle and legal economy", "em todos os ordenanças do tabernáculo e economia legal"],
  ["comprehending both place and worship", "abrangendo tanto o lugar quanto a adoração"],
  ["The scriptures of the Old Testament were given by inspiration of God", "As Escrituras do Antigo Testamento foram dadas por inspiração de Deus"],
  ["holy men of old spoke and wrote as the Holy Ghost directed them", "homens santos do passado falaram e escreveram como o Espírito Santo os dirigia"],
  ["And these Old Testament records are of great use and significancy", "E estes registros do Antigo Testamento são de grande uso e significância"],
  ["not only to those who first received them", "não apenas para aqueles que primeiro os receberam"],
  ["but even to Christians, who ought not to satisfy themselves with the letter of the law", "mas até para cristãos, que não devem se satisfazer com a letra da lei"],
  ["The design of Christ in giving himself for us is that he may purchase to himself a peculiar people, zealous of good works", "O desígnio de Cristo em dar a si mesmo por nós é que ele possa adquirir para si um povo particular, zeloso de boas obras"],
  ["The apostle calls the believing Hebrews to the performance of many excellent duties", "O apóstolo convoca os hebreus crentes ao cumprimento de muitos excelentes deveres"],
  ["To brotherly love, by which he does not only mean a general affection to all men, as our brethren by nature", "Ao amor fraternal, pelo qual ele não significa apenas uma afeição geral a todos os homens, como nossos irmãos por natureza"],
  ["all made of the same blood", "todos feitos do mesmo sangue"],
  ["nor that more limited affection which is due to those who are of the same immediate parents", "nem aquela afeição mais limitada que se deve àqueles que são dos mesmos pais imediatos"],
  ["We are required to restrain the workings of passion", "Somos solicitados a restringir os trabalhos da paixão"],
  ["This lesson we should learn under afflictions", "Esta lição devemos aprender sob aflições"],
  ["and this we shall learn if we are indeed begotten again by the word of truth", "e isso aprenderemos se fomos realmente gerados de novo pela palavra da verdade"],
  ["An angry and hasty spirit is soon provoked to ill things by afflictions", "Um espírito irascível e apressado é logo provocado a más coisas pelas aflições"],
  ["and errors and ill opinions become prevalent through the workings of our own vile and vain affections", "e erros e más opiniões se tornam prevalentes através dos trabalhos de nossas próprias vilas e vãs afeições"],
  ["but the renewing grace of God and the word of the gospel teach us to subdue them", "mas a graça renovadora de Deus e a palavra do evangelho nos ensinam a subjugá-las"],
  
  // James
  ["Here we may observe, I. The persons to whom this exhortation is given", "Aqui podemos observar: I. As pessoas a quem esta exortação é dada"],
  ["to the presbyters, pastors, and spiritual guides of the church", "aos presbíteros, pastores e guias espirituais da igreja"],
  ["elders by office, rather than by age", "anciãos por ofício, mais do que por idade"],
  ["ministers of those churches to whom he wrote this epistle", "ministros daquelas igrejas às quais escreveu esta epístola"],
  ["The person who gives this exhortation - the apostle Peter", "A pessoa que dá esta exortação - o apóstolo Pedro"],
  ["he was their brother-presbyter or fellow-elder", "ele era seu irmão-presbítero ou co-ancião"],
  ["and so puts nothing upon them but what he was ready to perform himself", "e assim não lhes impõe nada que ele não estivesse pronto a cumprir"],
  ["He was also a witness of the sufferings of Christ", "Ele também foi testemunha dos sofrimentos de Cristo"],
  ["and a partaker of the glory that shall be revealed", "e participante da glória que será revelada"],
  
  // 1 Peter
  ["In these words the apostle lays down another argument to prove the truth and reality of the gospel", "Nestas palavras o apóstolo estabelece outro argumento para provar a verdade e realidade do evangelho"],
  ["and intimates that this second proof is more strong and convincing than the former", "e intima que esta segunda prova é mais forte e convincente do que a anterior"],
  ["and more unanswerably makes out that the doctrine of the power and coming of our Lord Jesus Christ is not a mere fable", "e mais irrefutavelmente demonstra que a doutrina do poder e vinda de nosso Senhor Jesus Cristo não é mera fábula"],
  ["or cunning contrivance of men", "ou ardiloso artifício de homens"],
  ["but the wise and wonderful counsel of the holy and gracious God", "mas o sábio e maravilhoso conselho do santo e gracioso Deus"],
  ["For this is foretold by the prophets and penmen of the Old Testament", "Pois isso é predito pelos profetas e escribas do Antigo Testamento"],
  ["who spoke and wrote under the influence and inspiration of the Holy Ghost", "que falaram e escreveram sob a influência e inspiração do Espírito Santo"],
  ["The apostle omits his name and character", "O apóstolo omite seu nome e caráter"],
  ["either out of humility, or as being willing that the Christian reader should be swayed by the light and weight of the things written rather than by the name", "ou por humildade, ou como disposto a que o leitor cristão seja influenciado pela luz e peso das coisas escritas em vez do nome"],
  
  // 1 John
  ["In these verses the apostle encourages the disciples against the fear and danger of this seducing antichristian spirit", "Nestes versículos o apóstolo encoraja os discípulos contra o medo e perigo deste espírito sedutor anticristão"],
  ["He assures them of a more divine principle in them", "Ele os assegura de um princípio mais divino neles"],
  ["You are of God, little children", "Vós sois de Deus, filhinhos"],
  ["and have overcome them", "e vencestes a eles"],
  ["because greater is he that is in you than he that is in the world", "porque maior é o que está em vós do que o que está no mundo"],
  
  // Revelation
  ["The apostle concludes this letter, 1. With an adjournment of many things to personal conference", "O apóstolo conclui esta carta: 1. Com o adiamento de muitas coisas para conferência pessoal"],
  ["Having many things to write unto you I would not write with paper and ink", "Tendo muitas coisas para escrever-vos não quis escrever com papel e tinta"],
  ["but I trust to come unto you, and speak face to face, that our joy may be full", "mas confio em ir ter convosco, e falar face a face, para que vossa alegria seja cheia"],
  ["Here it is supposed that some things are better spoken than written", "Aqui se supõe que algumas coisas são melhor faladas do que escritas"],
  ["The use of pen and ink may be a mercy and a pleasure", "O uso da pena e tinta pode ser uma misericórdia e um prazer"],
  ["but a personal interview may be more so", "mas uma entrevista pessoal pode ser mais ainda"],
  ["The apostle was not yet too old for travel", "O apóstolo não era ainda velho demais para viajar"],
  ["nor consequently for travelling service", "e consequentemente para serviço de viagem"],
  ["Here we have, I. What we may call the pedigree of this book", "Aqui temos: I. O que podemos chamar de genealogia deste livro"],
  ["It is the revelation of Jesus Christ", "É a revelação de Jesus Cristo"],
  ["The whole Bible is so", "Toda a Bíblia é"],
  ["for all revelation comes through Christ and all centres in him", "pois toda revelação vem através de Cristo e tudo nele se centra"],
  ["and especially in these last days God has spoken to us by his Son", "e especialmente nestes últimos dias Deus nos falou por seu Filho"],
  ["Christ, as the king of his church, has been pleased thus far to let his church know", "Cristo, como rei de sua igreja, teve a bondsade de até aqui fazer saber à sua igreja"],
  ["by what rules and methods he will proceed in his government", "por quais regras e métodos ele procederá em seu governo"],
  ["The form of each epistle is very much the same", "A forma de cada epístola é muito semelhante"],
  ["To the angel of the church of Thyatira", "Ao anjo da igreja de Tiatira"],
  ["The apostle beholds this book taken into the hands of the Lord Jesus Christ", "O apóstolo contempla este livro tomado nas mãos do Senhor Jesus Cristo"],
  ["in order to its being unsealed and opened by him", "para ser des selado e aberto por ele"],
  ["Here Christ is described, 1. By his place and station", "Aqui Cristo é descrito: 1. Por seu lugar e posição"],
  ["In the midst of the throne, and of the four beasts, and of the elders", "No meio do trono, e dos quatro seres viventes, e dos anciãos"],
  ["He was on the same throne with the Father", "Ele estava no mesmo trono com o Pai"],
  ["he was nearer to him than either the elders or ministers of the churches", "ele estava mais perto dele do que os anciãos ou ministros das igrejas"],
  ["In this time of treading down, God has reserved to himself his faithful witnesses", "Neste tempo de pisar, Deus reservou para si seus fiéis testemunhas"],
  ["who will not fail to attest the truth of his word and worship", "que não falharão em atestar a verdade de sua palavra e adoração"],
  ["and the excellency of his ways", "e a excelência de seus caminhos"],
  ["The number of these witnesses: it is but a small number and yet it is sufficient", "O número dessas testemunhas: é apenas um número pequeno e ainda assim é suficiente"],
  ["Many will own and acknowledge Christ in times of prosperity who will desert and deny him in times of persecution", "Muitos possuirão e reconhecerão Cristo em tempos de prosperidade que o desertarão e negarão em tempos de perseguição"],
  ["one witness, when the cause is upon trial, is worth many at other times", "uma testemunha, quando a causa está em julgamento, vale muitas em outros tempos"],
];

for (const [eng, pt] of simpleReplacements) {
  if (content.includes(eng)) {
    content = content.replace(eng, pt);
    count++;
  }
}

fs.writeFileSync(path, content, 'utf8');
console.log(`Translated ${count} comments`);
