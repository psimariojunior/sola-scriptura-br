// Batch 3: More translations
import { readFileSync, writeFileSync } from 'fs';

const filePath = 'src/data/comentarios.ts';
let content = readFileSync(filePath, 'utf-8');

const translations = {
  "Here is the first mention we have in scripture of an angel\\":
    "Aqui é a primeira menção que temos nas Escrituras de um anjo...",
  
  "Here is, I. The continuance of the covenant, intimated in three things: - 1. It is established; not to be altered nor revoked. It is fixed, it is ratified, it is made as firm as the divine power and t...":
    "Aqui está, I. A continuidade da aliança, indicada em três coisas: - 1. Está estabelecida; não para ser alterada nem revogada. Está fixada, está ratificada, está tornada firme quanto o poder divino e a t...",
  
  "Here is, I. The humble request which Abraham made to his neighbours, the Hittites, for a burying-place among them, Gen 23:3, Gen 23:4. It was strange he had this to do now; but we are to impute it rat...":
    "Aqui está, I. O humilde pedido que Abraão fez a seus vizinhos, os heteus, para um lugar de sepultamento entre eles, Gn 23:3, Gn 23:4. Era estranho ele ter que fazer isso agora; mas devemos imputar isso mais...",
  
  "Isaac and Rebekah are, at length, happily brought together. Observe,\\\\nI. Isaac was well employed when he met Rebekah: He went out to meditate, or pray, in the field, at the even-tide, Gen 24:62, Ge...":
    "Isaque e Rebeca estão, finalmente, felizes juntos. Observemos, I. Isaque estava bem empregado quando encontrou Rebeca: Ele saiu para meditar, ou orar, no campo, ao entardecer, Gn 24:62, Gn...",
  
  "Here, I. God tried Isaac by his providence. Isaac had been trained up in a believing dependence upon the divine grant of the land of Canaan to him and his heirs; yet now there is a famine in the land,...":
    "Aqui, I. Deus provou Isaque por sua providência. Isaque havia sido criado em uma dependência crente na dádiva divina da terra de Canaã para ele e seus herdeiros; mas agora há uma fome na terra,...",
  
  "God manifested himself and his favour to Jacob when he was asleep and purely passive; for the spirit, like the wind, blows when and where he listeth, and God\\":
    "Deus se manifestou e seu favor a Jacó quando ele estava dormindo e puramente passivo; pois o espírito, como o vento, sopra quando e onde ele quer, e Deus...",
  
  "Here is, I. The verifying of Joseph\\":
    "Aqui está, I. A verificação da inocência de José...",
  
  "Here is, I. The recommending of Joseph to Pharaoh for an interpreter. The chief butler did it more in compliment to Pharaoh, to oblige him, than in gratitude to Joseph, or in compassion for his case. ...":
    "Aqui está, I. A recomendação de José a Faraó como intérprete. O copeiro-mor fez isso mais por elogio a Faraó, para agradá-lo, do que por gratidão a José, ou por compaixão de seu caso....",
  
  "Observe here, I. The building of Joseph\\":
    "Observemos aqui, I. A construção da família de José...",
  
  "Here is, I. The penitent reflection Joseph\\":
    "Aqui está, I. A reflexão penitente de José sobre seus sonhos...",
  
  "Here is, I. The great respect that Joseph\\":
    "Aqui está, I. O grande respeito que José...",
  
  "Here is, 1. The kindness of Pharaoh to Joseph, and to his relations for his sake: he bade his brethren welcome (Gen 45:16), though it was a time of scarcity, and they were likely to be a charge to him...":
    "Aqui está, 1. A bondade de Faraó para com José, e para com seus parentes por sua causa: ele deu as boas-vindas a seus irmãos (Gn 45:16), embora fosse um tempo de escassez, e eles provavelmente seriam um encargo para ele...",
  
  "Here is, I. The respect which Joseph, as a subject, showed to his prince. Though he was his favourite, and prime-minister of state, and had had particular orders from him to send for his father down t...":
    "Aqui está, I. O respeito que José, como súdito, demonstrou a seu príncipe. Embora fosse seu favorito, e primeiro-ministro de estado, e tivesse tido ordens particulares dele para trazer seu pai para baixo...",
  
  "Here is, I. The summing up of the blessings of Jacob\\":
    "Aqui está, I. O resumo das bênçãos de Jacó sobre seus doze filhos...",
  
  "Here is, I. The prolonging of Joseph\\":
    "Aqui está, I. A prolongação da vida de José...",
  
  "Here is, I. A general declaration of the wrath of God against Pharaoh for his obstinacy. Though God has hardened his heart (Exo 9:12), yet Moses must repeat his applications to him; God suspends his g...":
    "Aqui está, I. Uma declaração geral da ira de Deus contra Faraó por sua obstinação. Embora Deus tenha endurecido seu coração (Êx 9:12), ainda assim Moisés deve repetir suas aplicações a ele; Deus suspende sua g...",
  
  "Here is, I. The invasion of the land by the locusts - God\\":
    "Aqui está, I. A invasão da terra pelos gafanhotos — Deus...",
  
  "Here we have,\\\\nI. Further directions concerning the dedicating of their firstborn to God. 1. The firstlings of their cattle were to be dedicated to God, as part of their possessions. Those of clean...":
    "Aqui temos, I. Mais direções concernentes à dedicação de seus primogênitos a Deus. 1. Os primogênitos de seu gado deviam ser dedicados a Deus, como parte de suas posses. Aqueles dos animais limpos...",
  
  "Now they begin to be provided for by the immediate hand of God.\\\\nI. He makes them a feast, at night, of delicate fowl, feathered fowl (Psa 78:27), therefore not locusts, as some think; quails, or p...":
    "Agora eles começam a ser providenciados pela mão imediata de Deus. I. Ele lhes faz um banquete, à noite, de aves delicadas, aves penadas (Sl 78:27), portanto não gafanhotos, como alguns pensam; codornizes, ou p...",
  
  "Here is, I. A strict command for the sanctification of the sabbath day, Exo 31:13-17. The law of the sabbath had been given them before any other law, by way of preparation (Exo 16:23); it had been in...":
    "Aqui está, I. Um estrito mandamento para a santificação do dia de sábado, Êx 31:13-17. A lei do sábado havia sido dada a eles antes de qualquer outra lei, por meio de preparação (Êx 16:23); ela havia sido...",
  
  "The walls of the court, or church-yard, were like the rest curtains or hangings, made according to the appointment, Exo 27:9, etc. This represented the state of the Old Testament church: it was a gard...":
    "As paredes do pátio, ou cemitério, eram como o resto das cortinas ou cortinados, feitos de acordo com a designação, Êx 27:9, etc. Isso representava o estado da igreja do Antigo Testamento: era um jard...",
  
  "The materials and furniture of the tabernacle had been viewed severally and approved, and now they must be put together. 1. God here directs Moses to set up the tabernacle and the utensils of it in th...":
    "Os materiais e o mobiliário do tabernáculo haviam sido vistos individualmente e aprovados, e agora devem ser colocados juntos. 1. Deus aqui dirige Moisés a erguer o tabernáculo e seus utensílios no...",
  
  "Here, I. Leaven and honey are forbidden to be put in any of their meat-offerings: No leaven, nor any honey, in any offering made by fire, Lev 2:11. 1. The leaven was forbidden in remembrance of the un...":
    "Aqui, I. Fermento e mel são proibidos de serem colocados em qualquer uma de suas ofertas de comida: Sem fermento, nem mel, em qualquer oferta feita pelo fogo, Lv 2:11. 1. O fermento foi proibido em memória da des...",
  
  "The burnt-offerings had regard to God as in himself the best of beings, most perfect and excellent; they were purely expressive of adoration, and therefore were wholly burnt. But the peace-offerings h...":
    "Os holocaustos tinham relação com Deus como em si mesmo o melhor dos seres, mais perfeito e excelente; eram puramente expressivos de adoração, e portanto foram queimados inteiramente. Mas as ofertas de paz h...",
  
  "The laws contained in the first three chapters seem to have been delivered to Moses at one time. Here begin the statutes of another session, another day. From the throne of glory between the cherubim ...":
    "As leis contidas nos três primeiros capítulos parecem ter sido entregues a Moisés de uma vez. Aqui começam os estatutos de outra sessão, outro dia. Do trono de glória entre os querubins...",
  
  "This is the latter part of the law of the trespass-offering: the former part, which concerned trespasses about holy things, we had in the close of the foregoing chapter; this concerns trespasses in co...":
    "Esta é a parte posterior da lei da oferta de trespasso: a parte anterior, que concernia trespasses sobre coisas sagradas, tivemos no fechamento do capítulo anterior; esta concerna trespasses em co...",
  
  "Here is, I. The exposition of this law, or a key to let us into the meaning of it. It was not intended merely for a bill of fare, or as the directions of a physician about their diet, but God would he...":
    "Aqui está, I. A exposição desta lei, ou uma chave para nos permitir entrar em seu significado. Ela não se destinava apenas a uma lista de preços, ou como as direções de um médico sobre sua dieta, mas Deus queria que...",
  
  "Here, I. It is supposed that the plague of the leprosy was not an incurable disease. Uzziah\\":
    "Aqui, I. É suposto que a praga da lepra não era uma doença incurável. Uzias...",
  
  "The high priest having presented unto the Lord the expiatory sacrifices, by the sprinkling of their blood, the remainder of which, it is probable, he poured out at the foot of the brazen altar, 1. He ...":
    "O sumo sacerdote tendo apresentado ao Senhor os sacrifícios expiatórios, pela aspersão de seu sangue, o restante do qual, provavelmente, ele derramou aos pés do altar de bronze, 1. Ele...",
  
  "This statute obliged all the people of Israel to bring all their sacrifices to God\\":
    "Este estatuto obrigou todo o povo de Israel a trazer todos os seus sacrifícios a Deus...",
  
  "Here again the feasts are called the feasts of the Lord, because he appointed them. Jeroboam\\":
    "Aqui novamente as festas são chamadas as festas do Senhor, porque ele as designou. Jeroboão...",
  
  "Here is the institution of the feast of pentecost, or weeks, as it is called (Deu 16:9), because it was observed fifty days, or seven weeks, after the passover. It is also called the feast of harvest,...":
    "Aqui está a instituição da festa de Pentecostes, ou semanas, como é chamada (Dt 16:9), porque era observada cinquenta dias, ou sete semanas, após a Páscoa. É também chamada a festa da colheita,...",
  
  "Here, I. The priests, among other good offices which they were to do, are appointed solemnly to bless the people in the name of the Lord, Num 6:23. It was part of their work, Deu 21:5. Hereby God put ...":
    "Aqui, I. Os sacerdotes, entre outros bons serviços que deviam fazer, são designados solenemente para abençoar o povo em nome do Senhor, Nm 6:23. Era parte de seu trabalho, Dt 21:5. Por meio disso Deus colocou...",
  
  "Here we have,\\\\nI. An order given for the solemnization of the passover, the day twelvemonth after they came out of Egypt, on the fourteenth day of the first month of the second year, some days befo...":
    "Aqui temos, I. Uma ordem dada para a solenização da Páscoa, doze meses depois que saíram do Egito, no décimo quarto dia do primeiro mês do segundo ano, alguns dias antes...",
  
  "Here is, I. The sudden death of the ten evil spies. While the sentence was passing upon the people, before it was published, they died of the plague before the Lord, Num 14:36, Num 14:37. Now,\\\\n1. ...":
    "Aqui está, I. A morte súbita dos dez espias maus. Enquanto a sentença era pronunciada contra o povo, antes que fosse publicada, eles morreram da praga perante o Senhor, Nm 14:36, Nm 14:37. Agora, 1....",
  
  "Here is, I. The insolence of Dathan and Abiram, and their treasonable remonstrance. Moses had heard what Korah had to say, and had answered it; now he summons Dathan and Abiram to bring in their compl...":
    "Aqui está, I. A insolência de Datã e Abirão, e sua traiçoeira representação. Moisés havia ouvido o que Corá tinha a dizer, e havia respondido; agora ele convoca Datã e Abirão para trazerem sua compl...",
  
  "Here is, I. A new rebellion raised the very next day against Moses and Aaron. Be astonished, O heavens, at this, and wonder, O earth! Was there ever such an instance of the incurable corruption of sin...":
    "Aqui está, I. Uma nova rebelião erguida no dia seguinte contra Moisés e Arão. Admirem-se, ó céus, com isso, e maravilhem-se, ó terra! Já houve tal instância da incurável corrupção do pecado...",
  
  "Here is, I. The fatigue of Israel by a long march round the land of Edom, because they could not obtain passage through it the nearest way: The soul of the people was much discouraged because of the w...":
    "Aqui está, I. O cansaço de Israel por uma longa marcha ao redor da terra de Edom, porque não puderam obter passagem por ela pelo caminho mais curto: A alma do povo estava muito desencorajada por causa do c...",
  
  "The office of prophets was both to bless and to prophesy in the name of the Lord. Balaam, as a prophet, per force had blessed Israel; here he foretels future events.\\\\nI. His preface is much the sam...":
    "O ofício dos profetas era tanto abençoar quanto profetizar em nome do Senhor. Balaão, como profeta, à força havia abençoado Israel; aqui ele prevê eventos futuros. I. Sua introdução é muito semel...",
  
  "Here is, I. A short account of the long stay of Israel in the wilderness: We compassed Mount Seir many days, Deu 2:1. Nearly thirty-eight years they wandered in the deserts of Seir; probably in some o...":
    "Aqui está, I. Um breve relato da longa permanência de Israel no deserto: Circundamos o Monte Seir muitos dias, Dt 2:1. Quase trinta e oito anos eles vagaram nos desertos de Seir; provavelmente em algum o...",
  
  "Here, 1. Moses summons the assembly. He called all Israel; not only the elders, but, it is likely, as many of the people as could come within hearing, Deu 5:1. The greatest of them were not above God\\":
    "Aqui, 1. Moisés convoca a assembleia. Ele chamou todo Israel; não apenas os anciãos, mas, é provável, quantos do pudo pudessem ouvir, Dt 5:1. Os maiores deles não estavam acima de Deus...",
  
  "Here is, I. A repetition of the law that had been given concerning Hebrew servants who had sold themselves for servants, or were sold by their parents through extreme poverty, or were sold by the cour...":
    "Aqui está, I. Uma repetição da lei que havia sido dada concernente a servos hebreus que se haviam vendido como servos, ou foram vendidos por seus pais por extrema pobreza, ou foram vendidos pelo cour...",
  
  "Here is, 1. A repetition of the law concerning the firstlings of their cattle, that, if they were males, they were to be sanctified to the Lord (Deu 15:19), in remembrance of, and in thankfulness for,...":
    "Aqui está, 1. Uma repetição da lei concernente aos primogênitos de seu gado, que, se fossem machos, deviam ser santificados ao Senhor (Dt 15:19), em memória de, e em gratidão por,...",
  
  "Here is a statute for the preventing of frauds and perjuries; for the divine law takes care of men\\":
    "Aqui está um estatuto para a prevenção de fraudes e perjúrios; pois a lei divina cuida dos homens...",
  
  "Here is, I. A commanding preface or introduction to this song of Moses, Deu 32:1, Deu 32:2. He begins, 1. With a solemn appeal to heaven and earth concerning the truth and importance of what he was ab...":
    "Aqui está, I. Uma imponente introdução ou prefácio a este cântico de Moisés, Dt 32:1, Dt 32:2. Ele começa, 1. Com uma solene apelação aos céus e à terra concernente à verdade e importância do que ele estava ab...",
  
  "We may well imagine how busy Joshua and all the men of war were while they were passing over Jordan, when besides their own marching into an enemy\\":
    "Podemos muito bem imaginar como Josué e todos os homens de guerra estavam ocupados enquanto cruzavam o Jordão, quando além de sua própria marcha em direção a um território inimigo...",
  
  "Here, I. The Gibeonites desire to make peace with Israel, being alarmed by the tidings they heard of the destruction of Jericho, Jos 9:3. Other people heard those tidings, and were irritated thereby t...":
    "Aqui, I. Os gibeonitas desejam fazer paz com Israel, tendo sido alarmados pelas notícias que ouviram da destruição de Jericó, Js 9:3. Outros povos ouviram essas notícias, e foram irritados por isso...",
  
  "Here, I. Deborah stirs up herself and Barak to celebrate this victory in the most solemn manner, to the glory of God and the honour of Israel, for the encouragement of their friends and the greater co...":
    "Aqui, I. Débora se excita a si mesma e a Baraque para celebrar esta vitória da maneira mais solena, para a glória de Deus e a honra de Israel, para o encorajamento de seus amigos e o maior co...",
  
  "Observe here, I. The cognizance God took of the cries of Israel, when at length they were directed towards him. Though in their prosperity they had neglected him and made court to his rivals, and thou...":
    "Observemos aqui, I. O reconhecimento que Deus fez dos clamores de Israel, quando finalmente foram dirigidos a ele. Embora em sua prosperidade tivessem negligenciado o e feito corte a seus rivais, e thou...",
  
  "The princes and people of Gilead we left, in the close of the foregoing chapter, consulting about the choice of a general, having come to this resolve, that whoever would undertake to lead their force...":
    "Os príncipes e o povo de Gileade deixamos, no final do capítulo anterior, consultando sobre a escolha de um general, tendo chegado a esta resolução, de que qualquer um que se oferecesse para liderar suas forças...",
  
  "Here is, I. Samson violently pursued by the Philistine. They went up in a body, a more formidable force than they had together when Samson smote them hip and thigh; and they pitched in Judah, and spre...":
    "Aqui está, I. Sansão violentamente perseguido pelos filisteus. Eles subiram em grupo, uma força mais formidável do que tinham quando Sansão os feriu no quadril e na coxa; e acamparam em Judá, e spr...",
  
  "Here is, 1. Samson\\":
    "Aqui está, 1. Sansão...",
  
  "Here is, I. The great wickedness of the men of Gibeah. One could not imagine that ever it should enter into the heart of men that had the use of human reason, of Israelites that had the benefit of div...":
    "Aqui está, I. A grande maldade dos homens de Gibeá. Não se poderia imaginar que isso algum dia entrasse no coração de homens que tinham o uso da razão humana, de israelitas que tinham o benefício da div...",
  
  "Now Boaz himself appears, and a great deal of decency there appears in his carriage both towards his own servants and towards this poor stranger.\\\\nI. Towards his own servants, and those that were e...":
    "Agora o próprio Boaz aparece, e grande decoro aparece em sua conduta tanto para com seus próprios servos quanto para com esta pobre estrangeira. I. Para com seus próprios servos, e aqueles que eram e...",
  
  "Here, I. Ruth finishes her day\\":
    "Aqui, I. Rute termina seu dia de colheita...",
  
  "Here is, I. The message which, after all this introduction, God delivered to Samuel concerning Eli\\":
    "Aqui está, I. A mensagem que, depois de toda essa introdução, Deus entregou a Samuel concernente a Eli...",
  
  "Here is a short account of the issue of this battle.\\\\\\\\nI. Israel was smitten, the army dispersed and totally routed, not retiring into the camp, as before (Sa1 4:2) when they hoped to rally again, b...":
    "Aqui está um breve relato do resultado desta batalha. I. Israel foi ferido, o exército disperso e totalmente derrotado, não se retirando para o acampamento, como antes (1 Sm 4:2) quando esperavam se reagrupar novamente, b...",
  
  "Here, I. Samuel, in God\\":
    "Aqui, I. Samuel, em nome de Deus...",
  
  "Here is, 1. Jonathan\\":
    "Aqui está, 1. Jônatas...",
  
  "Here, I. David, in distress, flies in the tabernacle of God, now pitched at Nob, supposed to be a city in the tribe of Benjamin. Since Shiloh was forsaken, the tabernacle was often removed, though the...":
    "Aqui, I. David, em angústia, foge para o tabernáculo de Deus, agora acampado em Nob, supostamente uma cidade na tribo de Benjamim. Desde que Siló foi abandonado, o tabernáculo foi frequentemente removido, embora a...",
  
  "Now we find why the prophet Gad (by divine direction, no doubt) ordered David to go into the land of Judah, Sa1 22:5. It was that, since Saul neglected the public safety, he might take care of it, not...":
    "Agora descobrimos por que o profeta Gad (por direção divina, sem dúvida) ordenou a David que fosse para a terra de Judá, 1 Sm 22:5. Foi porque, já que Saul negligenciava a segurança pública, ele poderia cuidar dela, não...",
  
  "Here is, I. David absconding. He abode in a wilderness, in a mountain (Sa1 23:14), in a wood, Sa1 23:15. We must here, 1. Commend his eminent virtues, his humility, modesty, fidelity to his prince, an...":
    "Aqui está, I. David se escondendo. Ele habitava em um deserto, em um monte (1 Sm 23:14), em um bosque, 1 Sm 23:15. Devemos aqui, 1. Elogiar suas virtudes eminentes, sua humildade, modéstia, fidelidade a seu príncipe, an...",
  
  "Here is an account of David\\":
    "Aqui está um relato da bravura de Davi...",
  
  "The scripture makes no mention of the souls of Saul and his sons, what became of them after they were dead (secret things belong not to us), but of their bodies only.\\\\nI. How they were basely abuse...":
    "A Escritura não faz menção das almas de Saul e de seus filhos, o que aconteceu com eles depois que morreram (coisas secretas não nos pertencem), mas apenas de seus corpos. I. Como foram abusados covardemente...",
  
  "Here is, I. The humble address of all the tribes to David, beseeching him to take upon him the government (for they were now as sheep having no shepherd), and owning him for their king. Though David m...":
    "Aqui está, I. O humilde endereçamento de todas as tribos a Davi, suplicando-lhe que assumisse o governo (pois eles eram agora como ovelhas sem pastor), e reconhecendo-o como seu rei. Embora David m...",
  
  "Here is, I. David\\":
    "Aqui está, I. Davi...",
  
  "Here is, 1. The court made to David by the king of Hamath, who, it seems was at this time at war with the king of Zobah. He hearing of David\\":
    "Aqui está, 1. A corte feita a Davi pelo rei de Hamate, que, parece, estava nesta época em guerra com o rei de Zoba. Ele ouvindo falar de Davi...",
  
  "The matter is here settled concerning Mephibosheth. 1. This grant of his father\\":
    "O assunto é aqui resolvido concernente a Mefibóste. 1. Esta concessão de seu pai...",
  
  "Here is, I. The fright that David was put into by a false report brought to Jerusalem that Absalom had slain all the king\\":
    "Aqui está, I. O susto em que David foi colocado por um falso relato trazido a Jerusalém de que Absalão havia matado todos os do rei...",
  
  "Here we have, I. The fidelity of the priests and Levites and their firm adherence to David and his interest. They knew David\\":
    "Aqui temos, I. A fidelidade dos sacerdotes e levitas e sua firme adesão a Davi e a seus interesses. Eles conheciam Davi...",
  
  "We read before how kind David was to Mephibosheth the son of Jonathan, how he prudently entrusted his servant Ziba with the management of his estate, while he generously entertained him at his own tab...":
    "Leemos antes como Davi foi bondoso para com Mefibóste, filho de Jônatas, como ele prudentemente confiou a seu servo Ziba o gerenciamento de sua propriedade, enquanto generosamente o hospedava em sua própria tab...",
  
  "Here is an account of the state of David\\":
    "Aqui está um relato do estado do coração de Davi...",
  
  "Here we have, I. Saul\\":
    "Aqui temos, I. Saul...",
  
  "We have here,\\\\nI. The tidings of Solomon\\":
    "Temos aqui, I. As notícias da ascensão de Salomão ao trono...",
  
  "Here is, I. Solomon\\":
    "Aqui está, I. Salomão...",
  
  "Here is, I. The preferment of Benaiah and Zadok, two faithful friends to Solomon and his government, Kg1 2:35. Joab being put to death, Benaiah was advanced to be general of the forces in his room, an...":
    "Aqui está, I. A promoção de Benáias e Zadoc, dois fiéis amigos de Salomão e de seu governo, 1 Rs 2:35. Joabe sendo morto, Benáias foi avançado a general das forças em seu lugar, an...",
  
  "Here is, I. The performance of the agreement between Solomon and Hiram. Each of the parties made good his engagement. 1. Hiram delivered Solomon the timber, according to his bargain, Kg1 5:10. The tre...":
    "Aqui está, I. A realização do acordo entre Salomão e Hirão. Cada uma das partes cumpriu seu compromisso. 1. Hirão entregou a Salomão a madeira, de acordo com seu acordo, 1 Rs 5:10. A tre...",
  
  "Here, I. The temple is called the house of the Lord (Kg1 6:1), because it was, 1. Directed and modelled by him. Infinite Wisdom was the architect, and gave David the plan or pattern by the Spirit, not...":
    "Aqui, I. O templo é chamado a casa do Senhor (1 Rs 6:1), porque era, 1. Direcionado e modelado por ele. A Sabedoria Infinita era o arquiteto, e deu a Davi o plano ou modelo pelo Espírito, não...",
};

let translatedCount = 0;
for (const [english, portuguese] of Object.entries(translations)) {
  if (content.includes(english)) {
    content = content.replace(english, portuguese);
    translatedCount++;
  }
}

writeFileSync(filePath, content, 'utf-8');
console.log(`Batch 3: Translated ${translatedCount} comments`);
