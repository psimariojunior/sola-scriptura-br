// Script to translate all English Matthew Henry comments to PT-BR
import { readFileSync, writeFileSync } from 'fs';

const filePath = 'src/data/comentarios.ts';
let content = readFileSync(filePath, 'utf-8');

// Translation map: English text -> Portuguese translation
// Keys are the exact English text portions that need to be replaced
const translations = {
  // Genesis 1
  "Gênesis 1:6 — Matthew Henry: We have here an account of the second day s work, the creation of the firmament, in which observe, 1. The command of Deus concerning...":
    "Gênesis 1:6 — Mateus Henry: Temos aqui o relato do trabalho do segundo dia, a criação do firmamento, no qual observamos, 1. O comando de Deus concernente...",
  
  "Gênesis 1:9 — Matthew Henry: The third day s work is related in these verses - the forming of the sea and the dry land, and the making of the...":
    "Gênesis 1:9 — Mateus Henry: O trabalho do terceiro dia é relatado nestes versículos — a formação do mar e da terra seca, e a criação dos...",
  
  "Gênesis 1:14 — Matthew Henry: This is the history of the fourth day s work, the creating of the sun, moon, and stars, which are here accounted for, not as...":
    "Gênesis 1:14 — Mateus Henry: Esta é a história do trabalho do quarto dia, a criação do sol, da lua e das estrelas, que são aqui explicadas, não como...",
  
  "Gênesis 1:20 — Matthew Henry: Each day, hitherto, has produced very noble and excellent beings, which we can never sufficiently admire; but we do not read of the creation of...":
    "Gênesis 1:20 — Mateus Henry: Cada dia, até agora, produziu seres muito nobres e excelentes, que nunca podemos admirar o suficiente; mas não lemos sobre a criação dos...",
  
  "Gênesis 1:24 — Matthew Henry: We have here the first part of the sixth day s work. The sea was, the day before, replenished with its fish, and the air...":
    "Gênesis 1:24 — Mateus Henry: Temos aqui a primeira parte do trabalho do sexto dia. O mar fora, no dia anterior, povoado com seus peixes, e o ar...",
  
  "Gênesis 1:29 — Matthew Henry: We have here the third part of the sixth day s work, which was not any new creation, but a gracious provision of food for...":
    "Gênesis 1:29 — Mateus Henry: Temos aqui a terceira parte do trabalho do sexto dia, que não foi nenhuma nova criação, mas uma graciosa provisão de alimento para...",
  
  "Gênesis 1:31 — Matthew Henry: We have here the approbation and conclusion of the whole work of creation. As for Deus, his work is perfect; and if he begin he...":
    "Gênesis 1:31 — Mateus Henry: Temos aqui a aprovação e a conclusão de toda a obra da criação. Quanto a Deus, a sua obra é perfeita; e se ele começa, ele...",
  
  // Genesis 2
  "Gênesis 2:1 — Matthew Henry: We have here, I. The settlement of o reino of nature, in Deus s resting from the work of creation, Gen 2:1, Gen 2:2. Here...":
    "Gênesis 2:1 — Mateus Henry: Temos aqui, I. O estabelecimento do reino da natureza, no descanso de Deus da obra da criação, Gn 2:1, Gn 2:2. Aqui...",
  
  "Gênesis 2:4 — Matthew Henry: In these verses, I. Here is a name given to the Creator which we have not yet met with, and that is Jehovah - the...":
    "Gênesis 2:4 — Mateus Henry: Nestes versículos, I. Aqui há um nome dado ao Criador que ainda não encontramos, e esse é Jeová — o...",
  
  "Gênesis 2:8 — Matthew Henry: Man consisting of body and soul, a body made out of the earth and a rational immortal soul the breath of heaven, we have, in...":
    "Gênesis 2:8 — Mateus Henry: O homem consistindo de corpo e alma, um corpo feito do pó da terra e uma alma racional imortal, o sopro do céu, temos, em...",
  
  "Gênesis 2:16 — Matthew Henry: Observe here, I. Deus s authority over man, as a creature that had reason and freedom of will. o Senhor Deus commanded the man, who...":
    "Gênesis 2:16 — Mateus Henry: Observemos aqui, I. A autoridade de Deus sobre o homem, como criatura dotada de razão e liberdade de vontade. O Senhor Deus ordenou ao homem, que...",
  
  "Gênesis 2:21 — Matthew Henry: Here we have, I. The making of the woman, to be a help-meet for Adam. This was done upon the sixth day, as was also...":
    "Gênesis 2:21 — Mateus Henry: Aqui temos, I. A criação da mulher, para ser uma ajudadora compatível para Adão. Isso foi feito no sexto dia, como também...",
  
  // Genesis 3
  "Gênesis 3:9 — Matthew Henry: We have here the arraignment of these deserters before the righteous Judge of heaven and earth, who, though he is not tied to observe formalities,...":
    "Gênesis 3:9 — Mateus Henry: Temos aqui o julgamento desses desertores diante do Justo Juiz do céu e da terra, que, embora não seja obrigado a observar formalidades,...",
  
  "Gênesis 3:11 — Matthew Henry: We have here the offenders found guilty by their own confession, and yet endeavouring to excuse and extenuate their fault. They could not confess and...":
    "Gênesis 3:11 — Mateus Henry: Temos aqui os transgressores achados culpados por sua própria confissão, e ainda assim tentando desculpar e amenizar sua falta. Eles não podiam confessar e...",
  
  "Gênesis 3:14 — Matthew Henry: The prisoners being found guilty by their own confession, besides the personal and infallible knowledge of the Judge, and nothing material being offered in arrest...":
    "Gênesis 3:14 — Mateus Henry: Os prisioneiros tendo sido achados culpados por sua própria confissão, além do conhecimento pessoal e infalível do Juiz, e nada material sendo oferecido em defesa...",
  
  "Gênesis 3:16 — Matthew Henry: We have here the sentence passed upon the woman for her sin. Two things she is condemned to: a state of sorrow, and a state...":
    "Gênesis 3:16 — Mateus Henry: Temos aqui a sentença pronunciada contra a mulher por seu pecado. Duas coisas ela é condenada: um estado de dor, e um estado...",
  
  "Gênesis 3:17 — Matthew Henry: We have here the sentence passed upon Adam, which is prefaced with a recital of his crime: Because thou hast hearkened to the voice of...":
    "Gênesis 3:17 — Mateus Henry: Temos aqui a sentença pronunciada contra Adão, que é precedida por um relato de seu crime: Porque tu ouviste a voz de...",
  
  "Gênesis 3:20 — Matthew Henry: Deus having named the man, and called him Adam, which signifies red earth, Adam, in further token of dominion, named the woman, and called her...":
    "Gênesis 3:20 — Mateus Henry: Deus tendo dado nome ao homem, e chamado-o Adão, que significa terra vermelha, Adão, em sinal adicional de domínio, deu nome à mulher, e chamou-a...",
  
  "Gênesis 3:21 — Matthew Henry: We have here a further instance of Deus s care concerning our first parents, notwithstanding their sin. Though he corrects his disobedient children, and put...":
    "Gênesis 3:21 — Mateus Henry: Temos aqui uma nova instância do cuidado de Deus para com nossos primeiros pais, apesar de seu pecado. Embora ele corrija seus filhos desobedientes, e ponha...",
  
  "Gênesis 3:22 — Matthew Henry: Sentence being passed upon the offenders, we have here execution, in part, done upon them immediately. Observe here,\\ I. How they were justly disgraced and...":
    "Gênesis 3:22 — Mateus Henry: Sentença tendo sido pronunciada contra os transgressores, temos aqui a execução, em parte, realizada sobre eles imediatamente. Observemos aqui, I. Como foram justamente envergonhados e...",
  
  // Genesis 4
  "Gênesis 4:1 — Matthew Henry: Adam and Eve had many sons and daughters, Gen 5:4. But Cain and Abel seem to have been the two eldest. Some think they were...":
    "Gênesis 4:1 — Mateus Henry: Adão e Eva tiveram muitos filhos e filhas, Gn 5:4. Mas Caim e Abel parecem ter sido os dois mais velhos. Alguns pensam que foram...",
  
  "Here we have, I. The devotions of Cain and Abel. In process of time, when they had made some improvement in their respective callings (Heb. At the end of days, either at the end of the year, when they kept their feast of in-gathering or perhaps an annual fast in remembrance of the fall, or at the end of the days of the week, the seventh day, which was the sabbath) - at some set time, Cain and Abel brought to Adam, as the priest of the family, each of them an offering to the Lord, for the doin...":
    "Aqui temos, I. As devoções de Caim e Abel. Com o passar do tempo, quando fizeram algum progresso em suas respectivas vocações (Heb. Ao fim dos dias, seja ao fim do ano, quando celebravam sua festa da colheita ou talvez um jejum anual em memória da queda, ou ao fim dos dias da semana, o sétimo dia, que era o sábado) — em algum momento estabelecido, Caim e Abel trouxeram a Adão, como sacerdote da família, cada um uma oferta ao Senhor, pela execução...",
  
  "Gênesis 4:6 — Matthew Henry: Deus is here reasoning with Cain, to convince him of the sin and folly of his anger and discontent, and to bring him into a...":
    "Gênesis 4:6 — Mateus Henry: Deus está aqui raciocinando com Caim, para convencê-lo do pecado e da loucura de sua raiva e descontentamento, e trazê-lo a um...",
  
  "Gênesis 4:8 — Matthew Henry: We have here the progress of Cain s anger, and the issue of it in Abel s murder, which may be considered two ways: -...":
    "Gênesis 4:8 — Mateus Henry: Temos aqui o progresso da raiva de Caim, e o desfecho dela no assassinato de Abel, que pode ser considerado de duas maneiras: -...",
  
  "Gênesis 4:9 — Matthew Henry: We have here a full account of the trial and condemnation of the first murderer. Civil courts of judicature not being yet erected for this...":
    "Gênesis 4:9 — Mateus Henry: Temos aqui um relato completo do julgamento e condenação do primeiro assassino. Os tribunais civis de justiça ainda não haviam sido erguidos para isso...",
  
  "Gênesis 4:13 — Matthew Henry: We have here a further account of the proceedings against Cain.\\ I. Here is Cain s complaint of the sentence passed upon him, as hard...":
    "Gênesis 4:13 — Mateus Henry: Temos aqui um relato adicional dos procedimentos contra Caim. I. Aqui está a reclamação de Caim sobre a sentença pronunciada contra ele, como dura...",
  
  "Gênesis 4:16 — Matthew Henry: We have here a further account of Cain, and what became of him after he was rejected of Deus.\\ I. He tamely submitted to that...":
    "Gênesis 4:16 — Mateus Henry: Temos aqui um relato adicional sobre Caim, e o que aconteceu com ele depois de ser rejeitado por Deus. I. Ele submeteu-se mansamente àquele...",
  
  "Gênesis 4:19 — Matthew Henry: We have here some particulars concerning Lamech, the seventh from Adam in the line of Cain. Observe,\\ I. His marrying two wives. It was one...":
    "Gênesis 4:19 — Mateus Henry: Temos aqui alguns detalhes sobre Lameque, o sétimo a partir de Adão na linhagem de Caim. Observemos, I. Sua tomada de duas esposas. Foi uma...",
  
  "Gênesis 4:23 — Matthew Henry: By this speech of Lamech, which is here recorded, and probably was much talked of in those times, he further appears to have been a...":
    "Gênesis 4:23 — Mateus Henry: Pelo discurso de Lameque, que é aqui registrado, e que provavelmente foi muito comentado naqueles tempos, ele aparece ainda mais como um...",
  
  "This is the first mention of Adam in the story of this chapter. No question, the murder of Abel, and the impenitence and apostasy of Cain, were a very great grief to him and Eve, and the more because their own wickedness did now correct them and their backslidings did reprove them. Their folly had given sin and death entrance into the world; and now they smarted by it, being, by means thereof, deprived of both their sons in one day, Gen 27:45. When parents are grieved by their children\\":
    "Esta é a primeira menção de Adão na história deste capítulo. Sem dúvida, o assassinato de Abel, e a impenitência e apostasia de Caim, foram uma grande tristeza para ele e Eva, e mais ainda porque sua própria maldade agora os corrigia e suas apostasias os reprovavam. Sua loucura havia dado entrada ao pecado e à morte no mundo; e agora eles sofriam com isso, sendo, por meio disso, privados de ambos os filhos em um dia, Gn 27:45. Quando os pais são entristecidos pela maldade dos filhos...",
  
  // Genesis 5
  "Gênesis 5:1 — Matthew Henry: The first words of the chapter are the title or argument of the whole chapter: it is the book of the generations of Adam; it...":
    "Gênesis 5:1 — Mateus Henry: As primeiras palavras do capítulo são o título ou argumento de todo o capítulo: é o livro das gerações de Adão; ele...",
  
  "Gênesis 5:6 — Matthew Henry: We have here all that the Holy Ghost thought fit to leave upon record concerning five of the patriarchs before the flood, Seth, Enos, Cainan,...":
    "Gênesis 5:6 — Mateus Henry: Temos aqui tudo que o Espírito Santo achou por bem registrar sobre cinco dos patriarcas antes do dilúvio, Sete, Enos, Cainan,...",
  
  "Gênesis 5:21 — Matthew Henry: The accounts here run on for several generations without any thing remarkable, or any variation but of the names and numbers; but at length there...":
    "Gênesis 5:21 — Mateus Henry: Os relatos seguem por várias gerações sem nada de notável, ou qualquer variação além dos nomes e números; mas ao final há...",
  
  "Gênesis 5:25 — Matthew Henry: Concerning Methuselah observe, 1. The signification of his name, which some think was prophetical, his father Enoch being a prophet. Methuselah signifies, he dies, or...":
    "Gênesis 5:25 — Mateus Henry: Concernente a Matusalém, observemos, 1. O significado de seu nome, que alguns acham que era profético, seu pai Enoque sendo profeta. Matusalém significa, ele morre, ou...",
  
  "Gênesis 5:28 — Matthew Henry: Here we have the first mention of Noah, of whom we shall read much in the following chapters. Observe,\\ I. His name, with the reason...":
    "Gênesis 5:28 — Mateus Henry: Aqui temos a primeira menção de Noé, sobre quem leremos muito nos capítulos seguintes. Observemos, I. Seu nome, com a razão...",
  
  // Genesis 6
  "Gênesis 6:1 — Matthew Henry: For the glory of Deus s justice, and for warning to a wicked world, before the history of the ruin of the old world, we...":
    "Gênesis 6:1 — Mateus Henry: Para a glória da justiça de Deus, e como advertência ao mundo perverso, antes da história da ruína do mundo antigo, nós...",
  
  "Gênesis 6:3 — Matthew Henry: This comes in here as a token of Deus s displeasure at those who married strange wives; he threatens to withdraw from them his Spirit,...":
    "Gênesis 6:3 — Mateus Henry: Isso aparece aqui como sinal do desagrado de Deus para com aqueles que se casavam com mulheres estranhas; ele ameaça retirar deles o seu Espírito,...",
  
  "Gênesis 6:4 — Matthew Henry: We have here a further account of the corruption of the old world. When the sons of Deus had matched with the daughters of men,...":
    "Gênesis 6:4 — Mateus Henry: Temos aqui um relato adicional da corrupção do mundo antigo. Quando os filhos de Deus se casaram com as filhas dos homens,...",
  
  "Gênesis 6:6 — Matthew Henry: Here is, I. Deus s resentment of man s wickedness. He did not see it as an unconcerned spectator, but as one injured and affronted...":
    "Gênesis 6:6 — Mateus Henry: Aqui está, I. O resentimento de Deus pela maldade dos homens. Ele não a via como um espectador indiferente, mas como um ofendido e ultrajado...",
  
  "Gênesis 6:11 — Matthew Henry: The wickedness of that generation is here again spoken of, either as a foil to Noah s piety - he was just and perfect, when...":
    "Gênesis 6:11 — Mateus Henry: A maldade dessa geração é aqui novamente mencionada, seja como contraste à piedade de Noé — ele era justo e perfeito, quando...",
  
  "Gênesis 6:13 — Matthew Henry: Here it appears indeed that Noah found grace in the eyes of o Senhor. Deus s favour to him was plainly intimated in what he...":
    "Gênesis 6:13 — Mateus Henry: Aqui se vê que Noé achou graça aos olhos do Senhor. O favor de Deus para com ele foi claramente indicado no que ele...",
  
  "Gênesis 6:22 — Matthew Henry: Noah s care and diligence in building the ark may be considered, 1. As an effect of his faith in the word of Deus. Deus...":
    "Gênesis 6:22 — Mateus Henry: O cuidado e a diligência de Noé na construção da arca podem ser considerados, 1. Como efeito de sua fé na palavra de Deus. Deus...",
  
  // Genesis 7
  "Gênesis 7:5 — Matthew Henry: Here is Noah s ready obedience to the commands that Deus gave him. Observe, 1. He went into the ark, upon notice that the flood...":
    "Gênesis 7:5 — Mateus Henry: Aqui está a pronta obediência de Noé aos mandamentos que Deus lhe deu. Observemos, 1. Ele entrou na arca, ao receber aviso de que o dilúvio...",
  
  "Gênesis 7:13 — Matthew Henry: Here is repeated what was related before of Noah s entrance into the ark, with his family and creatures that were marked for preservation. Now,\\...":
    "Gênesis 7:13 — Mateus Henry: Aqui se repete o que foi relatado antes sobre a entrada de Noé na arca, com sua família e criaturas que estavam marcadas para preservação. Agora,...",
  
  "Gênesis 7:17 — Matthew Henry: We are here told,\\ I. How long the flood was increasing - forty days, Gen 7:17. The profane world, who believed not that it would...":
    "Gênesis 7:17 — Mateus Henry: Somos aqui informados, I. Por quanto tempo o dilúvio foi aumentando — quarenta dias, Gn 7:17. O mundo profano, que não acreditava que isso...",
  
  "Gênesis 7:21 — Matthew Henry: Here is, I. The general destruction of all flesh by the waters of the flood. Come, and see the desolations which Deus makes in the...":
    "Gênesis 7:21 — Mateus Henry: Aqui está, I. A destruição geral de toda a carne pelas águas do dilúvio. Venham, e vejam as devastações que Deus faz na...",
  
  // Genesis 8
  "Gênesis 8:4 — Matthew Henry: Here we have the effects and evidences of the ebbing of the waters. 1. The ark rested. This was some satisfaction to Noah, to feel...":
    "Gênesis 8:4 — Mateus Henry: Aqui temos os efeitos e evidências do refluente das águas. 1. A arca repousou. Isso foi uma certa satisfação para Noé, sentir...",
  
  "Gênesis 8:6 — Matthew Henry: We have here an account of the spies which Noah sent forth to bring him intelligence from abroad, a raven and a dove. Observe here,\\...":
    "Gênesis 8:6 — Mateus Henry: Temos aqui o relato dos espias que Noé enviou para trazer-lhe notícias de fora, um corvo e um pombo. Observemos aqui,...",
  
  "Gênesis 8:15 — Matthew Henry: Here is, I. Noah s dismission out of the ark, Gen 8:15-17. Observe, 1. Noah did not stir till Deus bade him. As he had...":
    "Gênesis 8:15 — Mateus Henry: Aqui está, I. A dispensação de Noé da arca, Gn 8:15-17. Observemos, 1. Noé não se moveu até que Deus lhe mandasse. Assim como ele tinha...",
  
  "Gênesis 8:20 — Matthew Henry: Here is, I. Noah s thankful acknowledgment of Deus s favour to him, in completing the mercy of his deliverance, Gen 8:20. 1. He built...":
    "Gênesis 8:20 — Mateus Henry: Aqui está, I. A agradecida declaração de Noé do favor de Deus para com ele, ao completar a misericórdia de sua libertação, Gn 8:20. 1. Ele construiu...",
  
  // Genesis 9
  "Gênesis 9:1 — Matthew Henry: We read, in the close of the foregoing chapter, the very kind things which Deus said in his heart, concerning the remnant of mankind which...":
    "Gênesis 9:1 — Mateus Henry: Leemos, no fechamento do capítulo anterior, as coisas muito bondosas que Deus disse em seu coração, concernentes ao remanescente da humanidade que...",
  
  "Gênesis 9:8 — Matthew Henry: Here is, I. The general establishment of Deus s covenant with this new world, and the extent of that covenant, Gen 9:9, Gen 9:10. Here...":
    "Gênesis 9:8 — Mateus Henry: Aqui está, I. O estabelecimento geral da aliança de Deus com este novo mundo, e a extensão dessa aliança, Gn 9:9, Gn 9:10. Aqui...",
  
  "Gênesis 9:12 — Matthew Henry: Articles of agreement among men are usually sealed, that the covenants may be the more solemn, and the performances of the covenants the more sure,...":
    "Gênesis 9:12 — Mateus Henry: Os artigos de acordo entre os homens são geralmente selados, para que as alianças sejam mais solenes, e o cumprimento das alianças mais seguro,...",
  
  "Gênesis 9:18 — Matthew Henry: Here is, I. Noah s family and employment. The names of his sons are again mentioned (Gen 9:18, Gen 9:19) as those from whom the...":
    "Gênesis 9:18 — Mateus Henry: Aqui está, I. A família e o emprego de Noé. Os nomes de seus filhos são novamente mencionados (Gn 9:18, Gn 9:19) como aqueles dos quais a...",
  
  "Gênesis 9:24 — Matthew Henry: Here, I. Noah comes to himself: He awoke from his wine. Sleep cured him, and, we may suppose, so cured him that he never relapsed...":
    "Gênesis 9:24 — Mateus Henry: Aqui, I. Noé volta a si: Ele acordou de seu vinho. O sono o curou, e, podemos supor, o curou de modo que nunca mais recaiu...",
  
  "Gênesis 9:28 — Matthew Henry: Here see, 1. How Deus prolonged the life of Noah; he lived 950 years, twenty more than Adam and but nineteen less than Methuselah: this...":
    "Gênesis 9:28 — Mateus Henry: Aqui vemos, 1. Como Deus prolongou a vida de Noé; ele viveu 950 anos, vinte a mais que Adão e apenas dezenove a menos que Matusalém: isso...",
  
  // Genesis 10
  "Gênesis 10:1 — Matthew Henry: Moses begins with Japheth s family, either because he was the eldest, or because his family lay remotest from Israel and had least concern with...":
    "Gênesis 10:1 — Mateus Henry: Moisés começa com a família de Jafé, seja porque ele era o mais velho, ou porque sua família ficava mais distante de Israel e tinha menos relação com...",
  
  "Gênesis 10:6 — Matthew Henry: That which is observable and improvable in these verses is the account here given of Nimrod, Gen 10:8-10. He is here represented as a great...":
    "Gênesis 10:6 — Mateus Henry: O que é observável e aproveitável nestes versículos é o relato aqui dado sobre Nimrod, Gn 10:8-10. Ele é aqui representado como um grande...",
  
  "Gênesis 10:15 — Matthew Henry: Observe here, 1. The account of the posterity of Canaan, of the families and nations that descended from him, and of the land they possessed,...":
    "Gênesis 10:15 — Mateus Henry: Observemos aqui, 1. O relato da posteridade de Canaã, das famílias e nações que dele descendiam, e da terra que possuíam,...",
  
  "Gênesis 10:21 — Matthew Henry: Two things especially are observable in this account of the posterity of Shem: - \\ I. The description of Shem, Gen 10:21. We have not...":
    "Gênesis 10:21 — Mateus Henry: Duas coisas são especialmente observáveis neste relato da posteridade de Sem: - I. A descrição de Sem, Gn 10:21. Não temos...",
  
  // Genesis 11
  "Gênesis 11:1 — Matthew Henry: The close of the foregoing chapter tells us that by the sons of Noah, or among the sons of Noah, the nations were divided in...":
    "Gênesis 11:1 — Mateus Henry: O fechamento do capítulo anterior nos diz que pelos filhos de Noé, ou entre os filhos de Noé, as nações foram divididas em...",
  
  "Gênesis 11:5 — Matthew Henry: We have here the quashing of the project of the Babel-builders, and the turning of the counsel of those froward men headlong, that Deus s...":
    "Gênesis 11:5 — Mateus Henry: Temos aqui a supressão do projeto dos construtores de Babel, e a reversão do conselho daqueles homens obstinados de cabeça, para que a justiça de Deus...",
  
  "Gênesis 11:10 — Matthew Henry: We have here a genealogy, not an endless genealogy, for here it ends in Abram, the friend of Deus, and leads further to Christ, the...":
    "Gênesis 11:10 — Mateus Henry: Temos aqui uma genealogia, não uma genealogia interminável, pois aqui ela termina em Abraão, o amigo de Deus, e leva adiante a Cristo, o...",
  
  "Gênesis 11:27 — Matthew Henry: Here begins the story of Abram, whose name is famous, henceforward, in both Testaments. We have here,\\ I. His country: Ur of the Chaldees. This...":
    "Gênesis 11:27 — Mateus Henry: Aqui começa a história de Abraão, cujo nome é famoso, daqui em diante, em ambos os Testamentos. Temos aqui, I. Sua pátria: Ur dos Caldeus. Esta...",
  
  // Genesis 12
  "Gênesis 12:6 — Matthew Henry: One would have expected that Abram having had such an extraordinary call to Canaan some great event should have followed upon his arrival there, that...":
    "Gênesis 12:6 — Mateus Henry: Esperar-se-ia que, tendo Abraão recebido uma chamada tão extraordinária para Canaã, algum grande evento deveria ter se seguido à sua chegada lá, que...",
  
  "Gênesis 12:10 — Matthew Henry: Here is, I. A famine in the land of Canaan, a grievous famine. That fruitful land was turned into barrenness, not only to punish the...":
    "Gênesis 12:10 — Mateus Henry: Aqui está, I. Uma fome na terra de Canaã, uma fome grave. Aquela terra fértil foi transformada em esterilidade, não apenas para punir os...",
  
  "Gênesis 12:14 — Matthew Henry: Here is, I. The danger Sarai was in of having her chastity violated by the king of Egypt: and without doubt the peril of sin...":
    "Gênesis 12:14 — Mateus Henry: Aqui está, I. O perigo em que Sarai estava de ter sua castidade violada pelo rei do Egito: e sem dúvida o perigo do pecado...",
  
  // Genesis 13
  "Gênesis 13:1 — Matthew Henry: I. Here is Abram s return out of Egypt, Gen 13:1. He came himself and brought all his with him back again to Canaan. Note,...":
    "Gênesis 13:1 — Mateus Henry: I. Aqui está o retorno de Abraão do Egito, Gn 13:1. Ele veio pessoalmente e trouxe tudo consigo de volta a Canaã. Observe,...",
  
  "Gênesis 13:5 — Matthew Henry: We have here an unhappy falling out between Abram and Lot, who had hitherto been inseparable companions (see Gen 13:1, and Gen 12:4), but now...":
    "Gênesis 13:5 — Mateus Henry: Temos aqui uma infeliz separação entre Abraão e Ló, que até então haviam sido companheiros inseparáveis (veja Gn 13:1, e Gn 12:4), mas agora...",
  
  "Gênesis 13:10 — Matthew Henry: We have here the choice that Lot made when he parted from Abram. Upon this occasion, one would have expected, 1. That he should have...":
    "Gênesis 13:10 — Mateus Henry: Temos aqui a escolha que Ló fez quando se separou de Abraão. Nesta ocasião, esperar-se-ia, 1. Que ele deveria ter...",
  
  "Gênesis 13:14 — Matthew Henry: We have here an account of a gracious visit which Deus paid to Abram, to confirm the promise to him and his. Observe,\\ I. When...":
    "Gênesis 13:14 — Mateus Henry: Temos aqui o relato de uma visita graciosa que Deus fez a Abraão, para confirmar a promessa a ele e aos seus. Observemos, I. Quando...",
  
  // Genesis 14
  "Gênesis 14:1 — Matthew Henry: We have here an account of the first war that ever we read of in scripture, which (though the wars of the nations make the...":
    "Gênesis 14:1 — Mateus Henry: Temos aqui o relato da primeira guerra que lemos nas Escrituras, que (embora as guerras das nações façam a...",
  
  "Gênesis 14:13 — Matthew Henry: We have here an account of the only military action we ever find Abram engaged in, and this he was prompted to, not by his...":
    "Gênesis 14:13 — Mateus Henry: Temos aqui o relato da única ação militar em que encontramos Abraão envolvido, e ele foi impulsionado a isso, não por sua...",
  
  "Gênesis 14:17 — Matthew Henry: This paragraph begins with the mention of the respect which the king of Sodom paid to Abram at his return from the slaughter of the...":
    "Gênesis 14:17 — Mateus Henry: Este parágrafo começa com a menção do respeito que o rei de Sodoma prestou a Abraão em seu retorno do massacre dos...",
  
  "Gênesis 14:21 — Matthew Henry: We have here an account of what passed between Abram and the king of Sodom, who succeeded him that fell in the battle (Gen 14:10),...":
    "Gênesis 14:21 — Mateus Henry: Temos aqui o relato do que passou entre Abraão e o rei de Sodoma, que sucedeu aquele que caiu na batalha (Gn 14:10),...",
  
  // Genesis 15
  "Gênesis 15:1 — Matthew Henry: Observe here, I. The time when Deus made this treaty with Abram: After these things. 1. After that famous act of generous charity which Abram...":
    "Gênesis 15:1 — Mateus Henry: Observemos aqui, I. O momento em que Deus fez esta aliança com Abraão: Depois dessas coisas. 1. Depois daquele famoso ato de caridade generosa que Abraão...",
  
  "Gênesis 15:2 — Matthew Henry: We have here the assurance given to Abram of a numerous offspring which should descend from him, in which observe,\\ I. Abram s repeated complaint,...":
    "Gênesis 15:2 — Mateus Henry: Temos aqui a garantia dada a Abraão de uma numerosa progênie que deveria dele descender, na qual observamos, I. A repetida reclamação de Abraão,...",
  
  "Gênesis 15:7 — Matthew Henry: We have here the assurance given to Abram of the land of Canaan for an inheritance.\\ I. Deus declares his purpose concerning it, Gen 15:7....":
    "Gênesis 15:7 — Mateus Henry: Temos aqui a garantia dada a Abraão da terra de Canaã como herança. I. Deus declara seu propósito concernente a ela, Gn 15:7....",
  
  "Gênesis 15:12 — Matthew Henry: We have here a full and particular discovery made to Abram of Deus s purposes concerning his seed. Observe,\\ I. The time when Deus came...":
    "Gênesis 15:12 — Mateus Henry: Temos aqui uma descoberta completa e particular feita a Abraão sobre os propósitos de Deus concernentes à sua semente. Observemos, I. O momento em que Deus veio...",
  
  "Gênesis 15:17 — Matthew Henry: Here is, I. The covenant ratified (Gen 15:17); the sign which Abram desired was given, at length, when the sun had gone down, so that...":
    "Gênesis 15:17 — Mateus Henry: Aqui está, I. A aliança ratificada (Gn 15:17); o sinal que Abraão desejava foi dado, finalmente, quando o sol já havia se posto, de modo que...",
  
  // Genesis 16
  "Gênesis 16:1 — Matthew Henry: We have here the marriage of Abram to Hagar, who was his secondary wife. Herein, though some excuse may be made for him, he cannot...":
    "Gênesis 16:1 — Mateus Henry: Temos aqui o casamento de Abraão com Agar, que era sua esposa secundária. Nisso, embora alguma desculpa possa ser feita por ele, ele não pode...",
  
  "Gênesis 16:4 — Matthew Henry: We have here the immediate bad consequences of Abram s unhappy marriage to Hagar. A great deal of mischief it made quickly. When we do...":
    "Gênesis 16:4 — Mateus Henry: Temos aqui as imediatas más consequências do infeliz casamento de Abraão com Agar. Uma grande quantidade de males causou rapidamente. Quando nós fazemos...",
  
  "Gênesis 16:10 — Matthew Henry: We may suppose that the angel having given Hagar that good counsel (Gen 16:9) to return to her mistress she immediately promised to do so,...":
    "Gênesis 16:10 — Mateus Henry: Podemos supor que o anjo tendo dado a Agar aquele bom conselho (Gn 16:9) de retornar à sua senhora, ela imediatamente prometeu fazê-lo,...",
  
  "Gênesis 16:15 — Matthew Henry: It is here taken for granted, though not expressly recorded, that Hagar did as the angel commanded her, returning to here mistress and submitting herself;...":
    "Gênesis 16:15 — Mateus Henry: É aqui dado como certo, embora não registrado expressamente, que Agar fez como o anjo lhe ordenou, retornando à sua senhora e submetendo-se;...",
  
  // Genesis 17
  "Gênesis 17:1 — Matthew Henry: Here is, I. The time when Deus made Abram this gracious visit: When he was ninety-nine years old, full thirteen years after the birth of...":
    "Gênesis 17:1 — Mateus Henry: Aqui está, I. O momento em que Deus fez esta visita graciosa a Abraão: Quando ele tinha noventa e nove anos de idade, treze anos completos após o nascimento de...",
  
  "Gênesis 17:4 — Matthew Henry: The promise here is introduced with solemnity: \"As for me,\" says the great Deus, \"behold, behold and admire it, behold and be assured of it,...":
    "Gênesis 17:4 — Mateus Henry: A promessa aqui é introduzida com solenidade: \"Quanto a mim,\" diz o grande Deus, \"eis, eis e admirem, eis e estejam certos de que,...",
  
  "Gênesis 17:15 — Matthew Henry: Here is, I. The promise made to Abraham of a son by Sarai, that son in whom the promise made to him should be fulfilled,...":
    "Gênesis 17:15 — Mateus Henry: Aqui está, I. A promessa feita a Abraão de um filho por Sarai, aquele filho no qual a promessa feita a ele seria cumprida,...",
  
  "Gênesis 17:23 — Matthew Henry: We have here Abraham s obedience to the law of circumcision. He himself and all his family were circumcised, so receiving the token of the...":
    "Gênesis 17:23 — Mateus Henry: Temos aqui a obediência de Abraão à lei da circuncisão. Ele próprio e toda a sua família foram circuncidados, recebendo assim o sinal da...",
  
  // Genesis 18
  "Gênesis 18:1 — Matthew Henry: The appearance of Deus to Abraham seems to have had in it more of freedom and familiarity, and less of grandeur and majesty, than those...":
    "Gênesis 18:1 — Mateus Henry: A aparição de Deus a Abraão parece ter tido mais liberdade e familiaridade, e menos grandeur e majestade, do que aquelas...",
  
  "Gênesis 18:9 — Matthew Henry: These heavenly guests (being sent to confirm the promise lately made to Abraham, that he should have a son by Sarah), while they are receiving...":
    "Gênesis 18:9 — Mateus Henry: Estes hóspedes celestiais (enviados para confirmar a promessa recentemente feita a Abraão, de que ele teria um filho com Sara), enquanto estavam recebendo...",
  
  "Gênesis 18:16 — Matthew Henry: The messengers from heaven had now despatched one part of their business, which was an errand of grace to Abraham and Sarah, and which they...":
    "Gênesis 18:16 — Mateus Henry: Os mensageiros do céu haviam agora despachado uma parte de seus negócios, que era uma missão de graça para Abraão e Sara, e que eles...",
  
  "Gênesis 18:23 — Matthew Henry: Communion with Deus is kept up by the word and by prayer. In the word Deus speaks to us; in prayer we speak to him....":
    "Gênesis 18:23 — Mateus Henry: A comunhão com Deus é mantida pela palavra e pela oração. Na palavra Deus nos fala; na oração nós falamos com ele....",
  
  // Genesis 19
  "Gênesis 19:1 — Matthew Henry: These angels, it is likely, were two of the three that had just before been with Abraham, the two created angels that were sent to...":
    "Gênesis 19:1 — Mateus Henry: Estes anjos, provavelmente, eram dois dos três que haviam estado com Abraão pouco antes, os dois anjos criados que foram enviados para...",
  
  "Gênesis 19:4 — Matthew Henry: Now it appeared, beyond contradiction, that the cry of Sodom was no louder than there was cause for. This night s work was enough to...":
    "Gênesis 19:4 — Mateus Henry: Agora ficou evidente, sem contradição, que o clamor de Sodoma não era maior do que havia motivo. O trabalho desta noite foi suficiente para...",
  
  "Gênesis 19:12 — Matthew Henry: We have here the preparation for Lot s deliverance.\\ I. Notice is given him of the approach of Sodom s ruin: We will destroy this...":
    "Gênesis 19:12 — Mateus Henry: Temos aqui os preparativos para a libertação de Ló. I. Aviso lhe é dado da aproximação da ruína de Sodoma: Destruiremos esta...",
  
  "Gênesis 19:15 — Matthew Henry: Here is, I. The rescue of Lot out of Sodom. Thought there were not ten righteous men in Sodom, for whose sakes it might be...":
    "Gênesis 19:15 — Mateus Henry: Aqui está, I. O resgate de Ló de Sodoma. Embora não houvesse dez justos em Sodoma, por cujo amor poderia ser...",
  
  "Gênesis 19:24 — Matthew Henry: Then, when Lot had got safely into Zoar, then this ruin came; for good men are taken away from the evil to come. Then, when...":
    "Gênesis 19:24 — Mateus Henry: Então, quando Ló havia chegado com segurança a Zoar, então veio esta ruína; pois os bons são tirados do mal que há de vir. Então, quando...",
  
  "Gênesis 19:26 — Matthew Henry: This also is written for our admonition. Our Saviour refers to it (Luk 17:32), Remember Lot s wife. As by the example of Sodom the...":
    "Gênesis 19:26 — Mateus Henry: Isso também foi escrito para nossa advertência. Nosso Salvador se refere a isso (Lc 17:32), Lembrem-se da esposa de Ló. Assim como pelo exemplo de Sodoma a...",
  
  "Gênesis 19:27 — Matthew Henry: Our communion with Deus consists in our gracious regard to him and his gracious regard to us; we have here therefore the communion that was...":
    "Gênesis 19:27 — Mateus Henry: Nossa comunhão com Deus consiste em nosso gracioso cuidado para com ele e seu gracioso cuidado para conosco; temos aqui portanto a comunhão que foi...",
  
  "Gênesis 19:30 — Matthew Henry: Here is, I. The great trouble and distress that Lot was brought into after his deliverance, Gen 19:30. 1. He was frightened out of Zoar,...":
    "Gênesis 19:30 — Mateus Henry: Aqui está, I. A grande angústia e aflição em que Ló foi colocado após sua libertação, Gn 19:30. 1. Ele foi assustado para fora de Zoar,...",
  
  // Genesis 20
  "Gênesis 20:1 — Matthew Henry: Here is, 1. Abraham s removal from Mamre, where he had lived nearly twenty years, into the country of the Philistines: He sojourned in Gerar,...":
    "Gênesis 20:1 — Mateus Henry: Aqui está, 1. A mudança de Abraão de Mamre, onde havia vivido quase vinte anos, para o país dos Filisteus: Ele peregrinou em Gerar,...",
  
  "Gênesis 20:3 — Matthew Henry: It appears by this that Deus revealed himself by dreams (which evidenced themselves to be divine and supernatural) not only to his servants the prophets,...":
    "Gênesis 20:3 — Mateus Henry: Parece por isso que Deus se revelava por sonhos (que se demonstravam divinos e sobrenaturais) não apenas a seus servos os profetas,...",
  
  "Gênesis 20:14 — Matthew Henry: Here is, I. The kindness of a prince which Abimelech showed to Abraham. See how unjust Abraham s jealousies were. He fancied that if they...":
    "Gênesis 20:14 — Mateus Henry: Aqui está, I. A bondade de um príncipe que Abimeleque demonstrou a Abraão. Veja como as suspeitas de Abraão foram injustas. Ele imaginou que se eles...",
  
  // Genesis 21
  "Gênesis 21:1 — Matthew Henry: Long-looked-for comes at last. The vision concerning the promised seed is for an appointed time, and now, at the end, it speaks, and does not...":
    "Gênesis 21:1 — Mateus Henry: O que se esperou por muito tempo vem finalmente. A visão concernente à semente prometida é para um tempo determinado, e agora, ao final, ela fala, e não...",
  
  "Gênesis 21:9 — Matthew Henry: The casting out of Ishmael is here considered of, and resolved on.\\ I. Ishmael himself gave the occasion by some affronts he gave to Isaac...":
    "Gênesis 21:9 — Mateus Henry: A expulsão de Ismael é aqui considerada, e decidida. I. O próprio Ismael deu a ocasião por algumas ofensas que deu a Isaque...",
  
  "Gênesis 21:14 — Matthew Henry: Here is, I. The casting out of the bond-woman, and her son from the family of Abraham, Gen 21:14. Abraham s obedience to the divine...":
    "Gênesis 21:14 — Mateus Henry: Aqui está, I. A expulsão da escrava e de seu filho da família de Abraão, Gn 21:14. A obediência de Abraão ao divino...",
  
  "Gênesis 21:22 — Matthew Henry: We have here an account of the treaty between Abimelech and Abraham, in which appears the accomplishment of that promise (Gen 12:2) that Deus would...":
    "Gênesis 21:22 — Mateus Henry: Temos aqui o relato do tratado entre Abimeleque e Abraão, no qual aparece o cumprimento daquela promessa (Gn 12:2) de que Deus...",
  
  "Gênesis 21:33 — Matthew Henry: Observe, 1. Abraham, having got into a good neighbourhood, knew when he was well off, and continued a great while there. There he planted a...":
    "Gênesis 21:33 — Mateus Henry: Observemos, 1. Abraão, tendo se estabelecido em um bom bairro, sabia quando estava bem, e permaneceu por muito tempo ali. Ali ele plantou um...",
  
  // Genesis 22
  "Gênesis 22:3 — Matthew Henry: We have here Abraham s obedience to this severe command. Being tried, he offered up Isaac, Heb 11:17. Observe,\\ I. The difficulties which he broke...":
    "Gênesis 22:3 — Mateus Henry: Temos aqui a obediência de Abraão a este severo mandamento. Sendo provado, ele ofereceu Isaque, Hb 11:17. Observemos, I. As dificuldades que ele superou...",
  
  "Gênesis 22:11 — Matthew Henry: Hitherto this story has been very melancholy, and seemed to hasten towards a most tragical period; but here the sky suddenly clears up, the sun...":
    "Gênesis 22:11 — Mateus Henry: Até aqui esta história foi muito melancólica, e parecia se apressar em direção a um final trágico; mas aqui o céu de repente se aclara, o sol...",
  
  "Gênesis 22:15 — Matthew Henry: Abraham s obedience was graciously accepted; but this was not all: here we have it recompensed, abundantly recompensed, before he stirred from the place; probably...":
    "Gênesis 22:15 — Mateus Henry: A obediência de Abraão foi graciosamente aceita; mas isso não foi tudo: aqui temos ela recompensada, abundantemente recompensada, antes que ele se movesse do lugar; provavelmente...",
  
  "Gênesis 22:20 — Matthew Henry: This is recorded here, 1. To show that though Abraham saw his own family highly dignified with peculiar privileges, admitted into covenant, and blessed with...":
    "Gênesis 22:20 — Mateus Henry: Isso é registrado aqui, 1. Para mostrar que, embora Abraão visse sua própria família altamente dignificada com privilégios peculiares, admitida na aliança, e abençoada com...",
  
  // Genesis 23
  "Gênesis 23:1 — Matthew Henry: We have here, 1. Sarah s age, Gen 23:1. Almost forty years before, she had called herself old, Gen 18:12. Old people will die never...":
    "Gênesis 23:1 — Mateus Henry: Temos aqui, 1. A idade de Sara, Gn 23:1. Quase quarenta anos antes, ela se chamara de velha, Gn 18:12. Os velhos morrem nunca...",
  
  "Gênesis 23:16 — Matthew Henry: We have here the conclusion of the treaty between Abraham and Ephron about the burying-place. The bargain was publicly made before all the neighbours, in...":
    "Gênesis 23:16 — Mateus Henry: Temos aqui a conclusão do tratado entre Abraão e Efron sobre o lugar de sepultamento. O acordo foi feito publicamente diante de todos os vizinhos, em...",
  
  // Genesis 24
  "Gênesis 24:1 — Matthew Henry: Three things we may observe here concerning Abraham: - \\ I. The care he took of a good son, to get him married, well married....":
    "Gênesis 24:1 — Mateus Henry: Três coisas podemos observar aqui concernentes a Abraão: - I. O cuidado que ele teve com um bom filho, para casá-lo, bem casado....",
  
  "Gênesis 24:10 — Matthew Henry: Abraham s servant now begins to make a figure in this story; and, though he is not named, yet much is here recorded to his...":
    "Gênesis 24:10 — Mateus Henry: O servo de Abraão agora começa a se destacar nesta história; e, embora não seja nomeado, muito é aqui registrado para sua...",
  
  "Gênesis 24:29 — Matthew Henry: We have here the making up of the marriage between Isaac and Rebekah. It is related very largely and particularly, even to the minute circumstances,...":
    "Gênesis 24:29 — Mateus Henry: Temos aqui a formalização do casamento entre Isaque e Rebeca. É relatado muito amplamente e particularmente, até as circunstâncias mais minuciosas,...",
  
  "Gênesis 24:54 — Matthew Henry: Rebekah is here taking leave of her father s house; and 1. Abraham s servant presses for a dismission. Though he and his company were...":
    "Gênesis 24:54 — Mateus Henry: Rebeca está aqui se despedindo da casa de seu pai; e 1. O servo de Abraão pressiona por uma despedida. Embora ele e sua companhia fossem...",
  
  // Genesis 25
  "Gênesis 25:1 — Matthew Henry: Abraham lived, after the marriage of Isaac, thirty-five years, and all that is recorded concerning him during the time lies here in a very few...":
    "Gênesis 25:1 — Mateus Henry: Abraão viveu, após o casamento de Isaque, trinta e cinco anos, e tudo que é registrado concernente a ele durante esse tempo está aqui em muito poucas...",
  
  "Gênesis 25:11 — Matthew Henry: Immediately after the account of Abraham s death, Moses begins the story of Isaac (Gen 25:11), and tells us where he dwelt and how remarkably...":
    "Gênesis 25:11 — Mateus Henry: Imediatamente após o relato da morte de Abraão, Moisés começa a história de Isaque (Gn 25:11), e nos diz onde ele habitava e como notavelmente...",
  
  "Gênesis 25:19 — Matthew Henry: We have here an account of the birth of Jacob and Esau, the twin sons of Isaac and Rebekah: their entrance into the world was...":
    "Gênesis 25:19 — Mateus Henry: Temos aqui o relato do nascimento de Jacó e Esaú, os filhos gêmeos de Isaque e Rebeca: sua entrada no mundo foi...",
  
  "Gênesis 25:29 — Matthew Henry: We have here a bargain made between Jacob and Esau about the birthright, which was Esau s by providence but Jacob s by promise. It...":
    "Gênesis 25:29 — Mateus Henry: Temos aqui um acordo feito entre Jacó e Esaú sobre o direito de primogenitura, que era de Esaú por providência mas de Jacó por promessa. Isso...",
  
  // Genesis 26
  "Gênesis 26:6 — Matthew Henry: Isaac had now laid aside all thoughts of going to Egypt, and, in obedience to the heavenly vision, sets up his staff in Gerar, the...":
    "Gênesis 26:6 — Mateus Henry: Isaque havia agora abandonado todos os pensamentos de ir ao Egito, e, em obediência à visão celeste, plantou sua tenda em Gerar, a...",
  
  "Gênesis 26:12 — Matthew Henry: Here we have,\\ I. The tokens of Deus s good-will to Isaac. He blessed him, and prospered him, and made all that he had to...":
    "Gênesis 26:12 — Mateus Henry: Aqui temos, I. Os sinais da boa vontade de Deus para com Isaque. Ele o abençoou, e o prosperou, e fez tudo que ele tinha...",
  
  "Gênesis 26:26 — Matthew Henry: We have here the contests that had been between Isaac and the Philistines issuing in a happy peace and reconciliation.\\ I. Abimelech pays a friendly...":
    "Gênesis 26:26 — Mateus Henry: Temos aqui os contestos que haviam havido entre Isaque e os Filisteus resultando em uma feliz paz e reconciliação. I. Abimeleque faz uma amigável...",
  
  "Gênesis 26:34 — Matthew Henry: Here is, 1. Esau s foolish marriage - foolish, some think, in marrying two wives together, for which perhaps he is called a fornicator (Heb...":
    "Gênesis 26:34 — Mateus Henry: Aqui está, 1. O tolo casamento de Esaú — tolo, alguns pensam, em casar duas mulheres juntas, pelo que talvez seja chamado de adúltero (Hb...",
  
  // Genesis 27
  "Gênesis 27:6 — Matthew Henry: Rebekah is here contriving to procure for Jacob the blessing which was designed for Esau; and here,\\ I. The end was good, for she was...":
    "Gênesis 27:6 — Mateus Henry: Rebeca está aqui tramando para conseguir para Jacó a bênção que era destinada a Esaú; e aqui, I. O fim era bom, pois ela estava...",
  
  "Gênesis 27:18 — Matthew Henry: Observe here, I. The art and assurance with which Jacob managed this intrigue. Who would have thought that this plain man could have played his...":
    "Gênesis 27:18 — Mateus Henry: Observemos aqui, I. A arte e a confiança com que Jacó gerenciou este estratagema. Quem teria pensado que este homem simples poderia ter representado seu...",
  
  "Gênesis 27:30 — Matthew Henry: Here is, I. The covenant-blessing denied to Esau. He that made so light of the birthright would now have inherited the blessing, but he was...":
    "Gênesis 27:30 — Mateus Henry: Aqui está, I. A bênção da aliança negada a Esaú. Aquele que fez tão pouco caso do direito de primogenitura agora teria herdado a bênção, mas ele foi...",
  
  "Gênesis 27:41 — Matthew Henry: Here is, I. The malice Esau bore to Jacob upon account of the blessing which he had obtained, Gen 27:41. Thus he went in the...":
    "Gênesis 27:41 — Mateus Henry: Aqui está, I. A malícia que Esaú nutria contra Jacó por causa da bênção que este havia obtido, Gn 27:41. Assim ele seguia no...",
  
  // Genesis 28
  "Gênesis 28:1 — Matthew Henry: Jacob had no sooner obtained the blessing than immediately he was forced to flee from his country; and, as it if were not enough that...":
    "Gênesis 28:1 — Mateus Henry: Jacó não havia obtido a bênção quando imediatamente foi forçado a fugir de sua pátria; e, como se não bastasse que...",
  
  "Gênesis 28:6 — Matthew Henry: This passage concerning Esau comes in in the midst of Jacob s story, either, 1. To show the influence of a good example. Esau, though...":
    "Gênesis 28:6 — Mateus Henry: Esta passagem concernente a Esaú aparece no meio da história de Jacó, seja, 1. Para mostrar a influência de um bom exemplo. Esaú, embora...",
  
  "Gênesis 28:10 — Matthew Henry: We have here Jacob upon his journey towards Syria, in a very desolate condition, like one that was sent to seek his fortune; but we...":
    "Gênesis 28:10 — Mateus Henry: Temos aqui Jacó em sua jornada em direção à Síria, em uma condição muito desolada, como alguém enviado para buscar sua fortuna; mas nós...",
  
  // Genesis 29
  "Gênesis 29:9 — Matthew Henry: Here we see, 1. Rachel s humility and industry: She kept her father s sheep (Gen 29:9), that is, she took the care of them,...":
    "Gênesis 29:9 — Mateus Henry: Aqui vemos, 1. A humildade e a indústria de Raquel: Ela guardava as ovelhas de seu pai (Gn 29:9), isso é, ela cuidava delas,...",
  
  "Gênesis 29:15 — Matthew Henry: Here is, I. The fair contract made between Laban and Jacob, during the month that Jacob spent there as a guest, Gen 29:14. It seems...":
    "Gênesis 29:15 — Mateus Henry: Aqui está, I. O justo contrato feito entre Lâbano e Jacó, durante o mês que Jacó passou ali como hóspede, Gn 29:14. Parece...",
  
  "Gênesis 29:31 — Matthew Henry: We have here the birth of four of Jacob s sons, all by Leah. Observe, 1. That Leah, who was less beloved, was blessed with...":
    "Gênesis 29:31 — Mateus Henry: Temos aqui o nascimento de quatro dos filhos de Jacó, todos por Lia. Observemos, 1. Que Lia, que era menos amada, foi abençoada com...",
  
  // Genesis 30
  "Gênesis 30:1 — Matthew Henry: We have here the bad consequences of that strange marriage which Jacob made with the two sisters. Here is,\\ I. An unhappy disagreement between him...":
    "Gênesis 30:1 — Mateus Henry: Temos aqui as más consequências daquele estranho casamento que Jacó fez com as duas irmãs. Aqui está, I. Uma infeliz discórdia entre ele...",
  
  "Gênesis 30:14 — Matthew Henry: Here is, I. Leah fruitful again, after she had, for some time, left off bearing. Jacob, it should seem, associated more with Rachel than with...":
    "Gênesis 30:14 — Mateus Henry: Aqui está, I. Lia fértil novamente, depois de ter, por algum tempo, parado de dar à luz. Jacó, ao que parece, associava mais com Raquel do que com...",
  
  "Gênesis 30:25 — Matthew Henry: We have here,\\ I. Jacob s thoughts of home. He faithfully served his time out with Laban, even his second apprenticeship, though he was an...":
    "Gênesis 30:25 — Mateus Henry: Temos aqui, I. Os pensamentos de Jacó sobre o lar. Ele serviu fielmente seu tempo com Lâbano, até seu segundo aprendizado, embora fosse um...",
  
  "Gênesis 30:37 — Matthew Henry: Here is Jacob s honest policy to make his bargain more advantageous to himself than it was likely to be. If he had not taken...":
    "Gênesis 30:37 — Mateus Henry: Aqui está a política honesta de Jacó para tornar seu acordo mais vantajoso para si do que provavelmente seria. Se ele não tivesse tomado...",
  
  // Genesis 31
  "Gênesis 31:1 — Matthew Henry: Jacob is here taking up a resolution immediately to quit his uncle s service, to take what he had and go back to Canaan. This...":
    "Gênesis 31:1 — Mateus Henry: Jacó está aqui tomando a decisão de imediato de deixar o serviço de seu tio, para levar o que tinha e voltar a Canaã. Isso...",
  
  "Gênesis 31:17 — Matthew Henry: Here is, I. Jacob s flight from Laban. We may suppose he had been long considering of it, and casting about in his mind respecting...":
    "Gênesis 31:17 — Mateus Henry: Aqui está, I. A fuga de Jacó de Lâbano. Podemos supor que ele havia considerado isso por muito tempo, e ponderado em sua mente concernente...",
  
  "Gênesis 31:25 — Matthew Henry: We have here the reasoning, not to say the rallying, that took place between Laban and Jacob at their meeting, in that mountain which was...":
    "Gênesis 31:25 — Mateus Henry: Temos aqui o raciocínio, para não dizer o confronto, que teve lugar entre Lâbano e Jacó em seu encontro, naquele monte que era...",
  
  "Gênesis 31:43 — Matthew Henry: We have here the compromising of the matter between Laban and Jacob. Laban had nothing to say in reply to Jacob s remonstrance: he could...":
    "Gênesis 31:43 — Mateus Henry: Temos aqui a solução do assunto entre Lâbano e Jacó. Lâbano nada tinha a dizer em resposta à representação de Jacó: ele podia...",
  
  // Genesis 32
  "Gênesis 32:1 — Matthew Henry: Jacob, having got clear of Laban, pursues his journey homewards towards Canaan: when Deus has helped us through difficulties we should go on our way...":
    "Gênesis 32:1 — Mateus Henry: Jacó, tendo se livrado de Lâbano, prossegue sua jornada de volta para Canaã: quando Deus nos ajudou a superar dificuldades, devemos seguir nosso caminho...",
  
  "Gênesis 32:3 — Matthew Henry: Now that Jacob was re-entering Canaan Deus, by the vision of angels, reminded him of the friends he had when he left it, and thence...":
    "Gênesis 32:3 — Mateus Henry: Agora que Jacó estava readentrando em Canaã, Deus, pela visão dos anjos, lembrou-o dos amigos que ele tinha quando deixou-a, e daí...",
  
  "Gênesis 32:9 — Matthew Henry: Our rule is to call upon Deus in the time of trouble; we have here an example to this rule, and the success encourages us...":
    "Gênesis 32:9 — Mateus Henry: Nossa regra é invocar Deus no tempo de aflição; temos aqui um exemplo desta regra, e o sucesso nos encoraja...",
  
  "Gênesis 32:13 — Matthew Henry: Jacob, having piously made Deus his friend by a prayer, is here prudently endeavouring to make Esau his friend by a present. He had prayed...":
    "Gênesis 32:13 — Mateus Henry: Jacó, tendo piedosamente feito Deus seu amigo pela oração, está aqui prudentemente tentando fazer Esaú seu amigo com um presente. Ele havia orado...",
  
  "Gênesis 32:24 — Matthew Henry: We have here the remarkable story of Jacob s wrestling with the angel and prevailing, which is referred to, Hos 12:4. Very early in the...":
    "Gênesis 32:24 — Mateus Henry: Temos aqui a notável história da luta de Jacó com o anjo e sua vitória, que é referida em Os 12:4. Muito cedo na...",
  
  // Genesis 33
  "Gênesis 33:1 — Matthew Henry: Here, I. Jacob discovered Esau s approach, Gen 33:1. Some think that his lifting up his eyes denotes his cheerfulness and confidence, in opposition to...":
    "Gênesis 33:1 — Mateus Henry: Aqui, I. Jacó avistou a aproximação de Esaú, Gn 33:1. Alguns pensam que sua elevação dos olhos denota sua alegurança e confiança, em oposição a...",
  
  "Gênesis 33:5 — Matthew Henry: We have here the discourse between the two brothers at their meeting, which is very free and friendly, without the least intimation of the old...":
    "Gênesis 33:5 — Mateus Henry: Temos aqui o discurso entre os dois irmãos em seu encontro, que é muito livre e amigável, sem a menor intimação da antiga...",
  
  "Gênesis 33:16 — Matthew Henry: Here, 1. Jacob comes to Succoth. Having in a friendly manner parted with Esau, who had gone to his own country (Gen 33:16), he comes...":
    "Gênesis 33:16 — Mateus Henry: Aqui, 1. Jacó chega a Sucote. Tendo de maneira amigável se despedido de Esaú, que havia ido a seu próprio país (Gn 33:16), ele chega...",
  
  // Genesis 34
  "Gênesis 34:1 — Matthew Henry: Dinah was, for aught that appears, Jacob s only daughter, and we may suppose her therefore the mother s fondling and the darling of the...":
    "Gênesis 34:1 — Mateus Henry: Dina era, pelo que aparece, a única filha de Jacó, e podemos supor portanto a mimalha da mãe e a querida da...",
  
  "Gênesis 34:18 — Matthew Henry: Here, 1. Hamor and Shechem gave consent themselves to be circumcised, Gen 34:18, Gen 34:19. To this perhaps they were moved, not only by the...":
    "Gênesis 34:18 — Mateus Henry: Aqui, 1. Hamor e Shequem deram seu próprio consentimento para serem circuncidados, Gn 34:18, Gn 34:19. Para isso talvez foram movidos, não apenas pela...",
  
  // Genesis 35
  "Gênesis 35:6 — Matthew Henry: Jacob and his retinue having safely arrived at Bethel, we are here told what passed there.\\ I. There he built an altar (Gen 35:7), and...":
    "Gênesis 35:6 — Mateus Henry: Jacó e sua comitiva tendo chegado com segurança a Betel, somos aqui informados do que aconteceu ali. I. Ali ele construiu um altar (Gn 35:7), e...",
  
  "Gênesis 35:16 — Matthew Henry: We have here the story of the death of Rachel, the beloved wife of Jacob. 1. She fell in travail by the way, not able...":
    "Gênesis 35:16 — Mateus Henry: Temos aqui a história da morte de Raquel, a amada esposa de Jacó. 1. Ela entrou em trabalho de parto pelo caminho, não conseguindo...",
  
  "Gênesis 35:21 — Matthew Henry: Here is, 1. Jacob s removal, Gen 35:21. He also, as his fathers, sojourned in the land of promise as in a strange country, and...":
    "Gênesis 35:21 — Mateus Henry: Aqui está, 1. A mudança de Jacó, Gn 35:21. Ele também, como seus pais, peregrinou na terra da promessa como em país estrangeiro, e...",
  
  // Genesis 36
  "Gênesis 36:1 — Matthew Henry: Observe here, 1. Concerning Esau himself, Gen 36:1. He is called Edom (and again, Gen 36:8), that name by which was perpetuated the remembrance of...":
    "Gênesis 36:1 — Mateus Henry: Observemos aqui, 1. Concernente ao próprio Esaú, Gn 36:1. Ele é chamado Edom (e novamente, Gn 36:8), aquele nome pelo qual foi perpetuada a lembrança de...",
  
  "Gênesis 36:20 — Matthew Henry: In the midst of this genealogy of the Edomites here is inserted the genealogy of the Horites, those Canaanites, or Hittites (compare Gen 26:34), that...":
    "Gênesis 36:20 — Mateus Henry: No meio desta genealogia dos edomitas é inserida a genealogia dos horitas, aqueles cananeus, ou hititas (compare Gn 26:34), que...",
  
  "Gênesis 36:31 — Matthew Henry: By degrees, it seems, the Edomites wormed out the Horites, obtained full possession of the country, and had a government of their own. 1. They...":
    "Gênesis 36:31 — Mateus Henry: Aos poucos, parece, os edomitas expulsaram os horitas, obtiveram posse total do país, e tiveram um governo próprio. 1. Eles...",
  
  // Genesis 37
  "Gênesis 37:5 — Matthew Henry: Here, I. Joseph relates the prophetical dreams he had, Gen 37:6, Gen 37:7, Gen 37:9, Gen 37:10. Though he was now very young (about seventeen...":
    "Gênesis 37:5 — Mateus Henry: Aqui, I. José relata os sonhos proféticos que teve, Gn 37:6, Gn 37:7, Gn 37:9, Gn 37:10. Embora fosse ainda muito jovem (cerca de dezessete...",
  
  "Gênesis 37:12 — Matthew Henry: Here is, I. The kind visit which Joseph, in obedience to his father s command, made to his brethren, who were feeding the flock at...":
    "Gênesis 37:12 — Mateus Henry: Aqui está, I. A bondosa visita que José, em obediência ao mandamento de seu pai, fez a seus irmãos, que estavam apasentando o rebanho em...",
  
  "Gênesis 37:23 — Matthew Henry: We have here the execution of their plot against Joseph. 1. They stripped him, each striving to seize the envied coat of many colours, Gen...":
    "Gênesis 37:23 — Mateus Henry: Temos aqui a execução de seu plano contra José. 1. Eles o despiram, cada um esforçando-se para agarrar a invejada túnica de muitas cores, Gn...",
  
  "Gênesis 37:31 — Matthew Henry: I. Joseph would soon be missed, great enquiry would be made for him, and therefore his brethren have a further design, to make the world...":
    "Gênesis 37:31 — Mateus Henry: I. José seria em breve sentido falta, grande investigação seria feita por ele, e portanto seus irmãos têm um plano adicional, para fazer o mundo...",
  
  // Genesis 38
  "Gênesis 38:1 — Matthew Henry: Here is, 1. Judah s foolish friendship with a Canaanite-man. He went down from his brethren, and withdrew for a time from their society and...":
    "Gênesis 38:1 — Mateus Henry: Aqui está, 1. A tola amizade de Judá com um homem cananeu. Ele desceu de seus irmãos, e se afastou por um tempo de sua sociedade e...",
  
  "Gênesis 38:12 — Matthew Henry: It is a very ill-favoured story that is here told concerning Judah; one would not have expected such folly in Israel. Judah had buried his...":
    "Gênesis 38:12 — Mateus Henry: É uma história muito desfavorável que é aqui contada concernente a Judá; não se esperaria tal loucura em Israel. Judá havia sepultado seu...",
  
  // Genesis 39
  "Gênesis 39:1 — Matthew Henry: Here is, I. Joseph bought (Gen 39:1), and he that bought him, whatever he gave for him, had a good bargain of him; it was...":
    "Gênesis 39:1 — Mateus Henry: Aqui está, I. José comprado (Gn 39:1), e aquele que o comprou, o que quer que tenha dado por ele, fez um bom negócio com ele; foi...",
};

// Process the content
let translatedCount = 0;
let notFoundCount = 0;
const notFound = [];

for (const [english, portuguese] of Object.entries(translations)) {
  if (content.includes(english)) {
    content = content.replace(english, portuguese);
    translatedCount++;
  } else {
    notFoundCount++;
    notFound.push(english.substring(0, 80) + '...');
  }
}

writeFileSync(filePath, content, 'utf-8');

console.log(`Translation complete!`);
console.log(`Translated: ${translatedCount} comments`);
console.log(`Not found: ${notFoundCount} comments`);
if (notFound.length > 0) {
  console.log(`\nNot found entries (first 10):`);
  notFound.slice(0, 10).forEach(n => console.log(`  - ${n}`));
}
