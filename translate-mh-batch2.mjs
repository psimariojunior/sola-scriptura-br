// Batch 2: More translations for English Matthew Henry comments
import { readFileSync, writeFileSync } from 'fs';

const filePath = 'src/data/comentarios.ts';
let content = readFileSync(filePath, 'utf-8');

const translations = {
  // Long English comments without "Gênesis" prefix
  "Here is, I. A gracious invitation of Noah and his family into a place of safety, now that the flood of waters was coming, Gen 7:1.\\\\\\\\n1. The call itself is very kind, like that of a tender father to his children, to come in doors, when he sees night or a storm coming: Come thou, and all thy house, that small family that thou hast, into the ark. Observe, (1.) Noah did not go into the ark till God bade him; though he knew it was designed for his place of refuge, yet he waited for a renewed command...":
    "Aqui está, I. Um convite gracioso a Noé e a sua família para um lugar de segurança, agora que o dilúvio de águas estava vindo, Gn 7:1. 1. O próprio chamado é muito bondoso, como o de um pai amoroso a seus filhos, para entrarem em casa, quando ele vê a noite ou uma tempestade vindo: Vem tu, e toda a tua casa, aquela pequena família que tens, para a arca. Observe, (1.) Noé não entrou na arca até que Deus lhe mandasse; embora soubesse que ela era designada para seu lugar de refúgio, ainda assim esperou por um renovado mandamento...",
  
  "Here is, I. The date of this great event; this is carefully recorded, for the greater certainty of the story.\\\\\\\\n1. It was in the 600th year of Noah\\":
    "Aqui está, I. A data deste grande evento; isso é cuidadosamente registrado, para maior certeza da história. 1. Foi no 600º ano de Noé...",
  
  "Here is, I. An act of God\\":
    "Aqui está, I. Um ato de Deus...",
  
  "Here is, 1. The ground dry (Gen 8:13), that is, all the water carried off it, which, upon the first day of the first month (a joyful new-year\\":
    "Aqui está, 1. O chão seco (Gn 8:13), isso é, toda a água que se afastou dele, que, no primeiro dia do primeiro mês (um alegre Ano Novo...",
  
  "Here is, I. Abraham\\":
    "Aqui está, I. Abraão...",
  
  "Here is, I. Isaac\\":
    "Aqui está, I. Isaque...",
  
  "Here, I. God reminds Jacob of his vow at Beth-el, and sends him thither to perform it, Gen 35:1. Jacob had said in the day of his distress, If I come again in peace, this stone shall be God\\":
    "Aqui, I. Deus lembra a Jacó de seu voto em Betel, e o envia ali para cumprí-lo, Gn 35:1. Jacó havia dito no dia de sua angústia, Se eu voltar em paz, esta pedra será a casa de Deus...",
  
  "All the stages Israel\\":
    "Todas as etapas da jornada de Israel...",
  
  "Here, we have Simeon and Levi, two of Jacob\\":
    "Aqui temos Simeão e Levi, dois dos filhos de Jacó...",
  
  "Jacob\\":
    "Jacó...",
  
  "Here is, I. Judah\\":
    "Aqui está, I. Judá...",
  
  "Observe here, 1. That only the names of Esau\\":
    "Observemos aqui, 1. Que apenas os nomes dos filhos de Esaú...",
  
  // Job
  "Concerning Job we are here told,\\\\\\\\nI. That he was a man; therefore subject to like passions as we are. He was Ish, a worthy man, a man of note and eminency, a magistrate, a man in authority. The country he lived in was the land of Uz, in the easter...":
    "Concernente a Jó somos aqui informados, I. Que ele era um homem; portanto sujeito a paixões semelhantes às nossas. Ele era Ish, um homem digno, um homem de destaque e eminência, um magistrado, um homem em autoridade. O país em que vivia era a terra de Uz, no orie...",
  
  "We have here a further account of Job\\":
    "Temos aqui um relato adicional sobre Jó...",
  
  "We have here a particular account of Job\\":
    "Temos aqui um relato particular sobre Jó...",
  
  "The devil had done all he desired leave to do against Job, to provoke him to curse God. He had touched all he had, touched it with a witness; he whom the rising sun saw the richest of all the men in the east was before night poor to a proverb. If his...":
    "O diabo havia feito tudo que pediu licença para fazer contra Jó, para provocá-lo a amaldiçoar Deus. Ele havia tocado em tudo que ele tinha, tocado como testemunha; aquele que o sol nascente via como o mais rico de todos os homens do oriente era antes da noite pobre a ponto de provérbio. Se...",
  
  "The devil, having got leave to tear and worry poor Job, presently fell to work with him, as a tormentor first and then as a tempter. His own children he tempts first, and draws them to sin, and afterwards torments, when thereby he has brought them to...":
    "O diabo, tendo obtido licença para dilacerar e assolar o pobre Jó, imediatamente começou a trabalhar com ele, como um atormentador primeiro e depois como um tentador. Seus próprios filhos ele tenta primeiro, e os arrasta ao pecado, e depois os atormenta, quando por meio disso os trouxe ao...",
  
  "We have here an account of the kind visit which Job\\":
    "Temos aqui o relato da bondosa visita que Jó...",
  
  "In these verses,\\\\\\\\nI. Eliphaz excuses the trouble he is now about to give to Job by his discourse (Job 4:2): \"If we assay a word with thee, offer a word of reproof and counsel, wilt thou be grieved and take it ill?\" We have reason to fear thou wilt...":
    "Nestes versículos, I. Elifaz desculpa o incômodo que está prestes a causar a Jó com seu discurso (Jó 4:2): \"Se ousarmos uma palavra contigo, oferecer uma palavra de repreensão e conselho, você ficará aborrecido e levará a mal?\" Temos razão para temer que você...",
  
  "Here, I. Bildad reproves Job for what he had said (Job 8:2), checks his passion, but perhaps (as is too common) with greater passion. We thought Job spoke a great deal of good sense and much to the purpose, and that he had reason and right on his sid...":
    "Aqui, I. Bildade repreende Jó pelo que havia dito (Jó 8:2), restringe sua paixão, mas talvez (como é muito comum) com maior paixão. Pensamos que Jó falou muita coisa sensata e muito ao caso, e que ele tinha razão e direito de seu lado...",
  
  "Here Job touches briefly upon the main point now in dispute between him and his friends. They maintained that those who are righteous and good always prosper in this world, and none but the wicked are in misery and distress; he asserted, on the contr...":
    "Aqui Jó toca brevemente no ponto principal agora em disputa entre ele e seus amigos. Eles sustentavam que aqueles que são justos e bons sempre prosperam neste mundo, e apenas os ímpios estão em miséria e aflição; ele afirmou, pelo contrário...",
  
  "Here is, I. A passionate resolution to persist in his complaint, Job 10:1. Being daunted with the dread of God\\":
    "Aqui está, I. Uma apaixonada resolução de persistir em sua queixa, Jó 10:1. Sendo intimidado com o temor de Deus...",
  
  "In these verses we may observe,\\\\\\\\nI. How Job eyes God as his Creator and preserver, and describes his dependence upon him as the author and upholder of being. This is one of the first things we are all concerned to know and consider.\\\\\\\\n1. Tha...":
    "Nestes versículos podemos observar, I. Como Jó vê Deus como seu Criador e Preservador, e descreve sua dependência dele como o autor e sustentador do ser. Esta é uma das primeiras coisas que todos devemos conhecer e considerar. 1. Que...",
  
  "Here we have,\\\\\\\\nI. Job\\":
    "Aqui temos, I. Jó...",
  
  "The reproofs Job here gives to his friends, whether they were just or no, were very sharp, and may serve for a rebuke to all that are proud and scornful, and an exposure of their folly.\\\\\\\\nI. He upbraids them with their conceitedness of themselves, ...":
    "As repreensões que Jó aqui dá a seus amigos, sejam justas ou não, foram muito severas, e podem servir como repreensão a todos que são orgulhosos e zombeteiros, e como exposição de sua loucura. I. Ele os acusa de sua presunção de si mesmos,...",
  
  "This is a noble discourse of Job\\":
    "Este é um nobre discurso de Jó...",
  
  "Here, I. Job enquires after his sins, and begs to have them discovered to him. He looks up to God, and asks him what was the number of them (How many are my iniquities?) and what were the particulars of them: Make me to know my transgressions, Job 13...":
    "Aqui, I. Jó pergunta sobre seus pecados, e implora que lhe sejam descobertos. Ele olha para Deus, e lhe pergunta qual era o número deles (Quantas são as minhas transgressões?) e quais eram os detalhes deles: Faze-me saber minhas transgressões, Jó 13...",
  
  "We are here led to think,\\\\\\\\nI. Of the original of human life. God is indeed its great original, for he breathed into man the breath of life and in him we live; but we date it from our birth, and thence we must date both its frailty and its pollutio...":
    "Somos aqui levados a pensar, I. Da origem da vida humana. Deus é de fato sua grande origem, pois ele soprou no homem o sôpro da vida e nele vivemos; mas a datamos de nosso nascimento, e daí devemos datar tanto sua fragilidade quanto sua poluição...",
  
  "We have seen what Job has to say concerning life; let us now see what he has to say concerning death, which his thoughts were very much conversant with, now that he was sick and sore. It is not unseasonable, when we are in health, to think of dying; ...":
    "Vimos o que Jó tem a dizer concernente à vida; vejamos agora o que ele tem a dizer concernente à morte, com a qual seus pensamentos estavam muito ocupados, agora que estava doente e machucado. Não é inoportuno, quando estamos em saúde, pensar em morrer;...",
  
  "The rest of Bildad\\":
    "O restante do discurso de Bildade...",
  
  "In all the conferences between Job and his friends we do not find any more weighty and considerable lines than these; would one have expected it? Here is much both of Christ and heaven in these verses: and he that said such things as these declared p...":
    "Em todas as conferências entre Jó e seus amigos não encontramos linhas mais pesadas e consideráveis do que estas; alguém esperaria isso? Aqui há muito tanto de Cristo quanto do céu nestes versículos: e aquele que disse coisas como essas declarou...",
  
  "Here, I. Zophar begins very passionately, and seems to be in a great heat at what Job had said. Being resolved to condemn Job for a bad man, he was much displeased that he talked so like a good man, and, as it should seem, broke in upon him, and bega...":
    "Aqui, I. Zofar começa muito apaixonadamente, e parece estar em grande calor pelo que Jó havia dito. Estando determinado a condenar Jó como um homem mau, ele ficou muito descontente por ele falar como um bom homem, e, ao que parece, interrompeu-o, e come...",
  
  "The instances here given of the miserable condition of the wicked man in this world are expressed with great fulness and fluency of language, and the same thing returned to again and repeated in other words. Let us therefore reduce the particulars to...":
    "As instâncias aqui dadas da condição miserável do homem ímpio neste mundo são expressas com grande plenitude e fluência de linguagem, e a mesma coisa retornada e repetida em outras palavras. Reduzamos portanto os detalhes a...",
  
  "In these verses,\\\\\\\\nI. Job opposes the opinion of his friends, which he saw they still adhered to, that the wicked are sure to fall into such visible and remarkable ruin as Job had now fallen into, and none but the wicked, upon which principle they ...":
    "Nestes versículos, I. Jó se opõe à opinião de seus amigos, que ele viu ainda sustentavam, de que os ímpios estão certos de cair em tal ruína visível e notável como Jó havia caído agora, e apenas os ímpios, sobre o qual princípio eles...",
  
  "Here, I. Job complains that he cannot understand the meaning of God\\":
    "Aqui, I. Jó reclama que não consegue entender o significado dos caminhos de Deus...",
  
  "One would not have thought that Job, when he was in so much pain and misery, could banter his friend as he does here and make himself merry with the impertinency of his discourse. Bildad thought that he had made a fine speech, that the matter was so...":
    "Não se pensaria que Jó, quando estava em tanta dor e miséria, pudesse zombar de seu amigo como faz aqui e se divertir com a impertinência de seu discurso. Bildade pensava que havia feito um bom discurso, que o assunto era tão...",
  
  "The truth received a great deal of light from the dispute between Job and his friends concerning those points about which they differed; but now they are upon a subject in which they were all agreed, the infinite glory and power of God. How does trut...":
    "A verdade recebeu muita luz da disputa entre Jó e seus amigos concernente aos pontos sobre os quais eles discordavam; mas agora estão sobre um assunto no qual todos concordavam, a infinita glória e poder de Deus. Como a verdade...",
  
  "Here Job shows, 1. What a great way the wit of man may go in diving into the depths of nature and seizing the riches of it, what a great deal of knowledge and wealth men may, by their ingenious and industrious searches, make themselves masters of. Bu...":
    "Aqui Jó mostra, 1. Quão longe o engenho humano pode ir em mergulhar nas profundezas da natureza e apoderar-se de suas riquezas, quanta riqueza de conhecimento e riqueza os homens podem, por suas pesquisas engenhosas e industriosas, tornar-se senhores. Mas...",
  
  "The question which Job had asked (Job 28:12) he asks again here; for it is too worthy, too weighty, to be let fall, until we speed in the enquiry. Concerning this we must seek till we find, till we get some satisfactory account of it. By a diligent p...":
    "A pergunta que Jó havia feito (Jó 28:12) ele faz novamente aqui; pois é muito digna, muito pesada, para ser deixada de lado, até que tenhamos sucesso na investigação. Concernente a isso devemos buscar até que encontremos, até que obtenhamos alguma satisfação. Por uma diligente p...",
  
  "We have here Job in a post of honour and power. Though he had comfort enough in his own house, yet he did not confine himself to that. We are not born for ourselves, but for the public. When any business was to be done in the gate, the place of judgm...":
    "Temos aqui Jó em um posto de honra e poder. Embora tivesse consolo suficiente em sua própria casa, ele não se limitou a isso. Não nascemos para nós mesmos, mas para o público. Quando algum negócio devia ser feito no portão, o lugar de julgamento...",
  
  "Here Job makes a very large and sad complaint of the great disgrace he had fallen into, from the height of honour and reputation, which was exceedingly grievous and cutting to such an ingenuous spirit as Job\\":
    "Aqui Jó faz uma queixa muito ampla e triste sobre a grande desgraça em que havia caído, do auge da honra e reputação, que era extremamente dolorosa e cortante para um espírito tão ingênuo como o de Jó...",
  
  "In this second part of Job\\":
    "Nesta segunda parte do discurso de Jó...",
  
  "The lusts of the flesh, and the love of the world, are the two fatal rocks on which multitudes split; against these Job protests he was always careful to stand upon his guard.\\\\\\\\nI. Against the lusts of the flesh. He not only kept himself clear from...":
    "As concupiscências da carne, e o amor ao mundo, são as duas rochas fatais nas quais multidões naufragam; contra essas Jó protesta que sempre foi cuidadoso em manter sua guarda. I. Contra as concupiscências da carne. Ele não apenas se manteve livre de...",
  
  "We have here Job\\":
    "Temos aqui Jó...",
  
  "In these verses,\\\\\\\\nI. Elihu particularly charges Job with some indecent expressions that had dropped from him, reflecting upon the justice and goodness of God in his dealings with him. He does not ground the charge upon report, but was himself an e...":
    "Nestes versículos, I. Eliu acusa particularmente Jó de algumas expressões indecentes que lhe escaparam, refletindo sobre a justiça e bondade de Deus em seus tratos com ele. Ele não fundamenta a acusação em relatos, mas ele próprio foi um...",
  
  "God has spoken once to sinners by their own consciences, to keep them from the paths of the destroyer, but they perceive it not; they are not aware that the checks their own hearts give them in a sinful way are from God, but they are imputed to melan...":
    "Deus falou uma vez aos pecadores por suas próprias consciências, para afastá-los dos caminhos do destruidor, mas eles não percebem; não estão cientes de que as restrições que seus próprios corações lhes dão em um caminho pecaminoso são de Deus, mas são atribuídas a melan...",
  
  "We have here the conclusion of this first part of Elihu\\":
    "Temos aqui a conclusão desta primeira parte do discurso de Eliu...",
  
  "Here, I. Elihu humbly addresses himself to the auditors, and endeavours, like an orator, to gain their good-will and their favourable attention. 1. He calls them wise men, and men that had knowledge, Job 34:2. It is comfortable dealing with such as u...":
    "Aqui, I. Eliu se dirige humildemente aos ouvintes, e se esforça, como um orador, para ganhar sua boa vontade e sua atenção favorável. 1. Ele os chama de homens sábios, e homens que tinham conhecimento, Jó 34:2. É confortável lidar com tais como...",
  
  "The scope of Elihu\\":
    "O objetivo do discurso de Eliu...",
  
  "In these verses,\\\\\\\\nI. Elihu instructs Job what he should say under his affliction, Job 34:31, Job 34:32. Having reproved him for his peevish passionate words, he here puts better words into his mouth. When we reprove for what is amiss we must direc...":
    "Nestes versículos, I. Eliu instrui Jó sobre o que deveria dizer sob sua aflição, Jó 34:31, Jó 34:32. Tendo-o repreendido por suas palavras apaixonadas e teimosas, ele aqui coloca melhores palavras em sua boca. Quando repreendemos pelo que está errado, devemos direc...",
  
  "We have here,\\\\\\\\nI. The bad words which Elihu charges upon Job, Job 35:2, Job 35:3. To evince the badness of them he appeals to Job himself, and his own sober thoughts, in the reflection: Thinkest thou this to be right? This intimates Elihu\\":
    "Temos aqui, I. As más palavras que Eliu imputa a Jó, Jó 35:2, Jó 35:3. Para provar a maldade delas ele apela ao próprio Jó, e a seus próprios pensamentos sóbrios, na reflexão: Pensas que isso está certo? Isso indica que Eliu...",
  
  "Here is, I. Another improper word for which Elihu reproves Job (Job 35:14): Thou sayest thou shalt not see him; that is, 1. \"Thou complainest that thou dost not understand the meaning of his severe dealings with thee, nor discern the drift and design...":
    "Aqui está, I. Outra palavra imprópria pela qual Eliu repreende Jó (Jó 35:14): Tu dizes que não o verás; isso é, 1. \"Tu reclamas que não compreendes o significado de seus tratos severos contigo, nem discernes a tendência e o designio...",
  
  "The changes and extremities of the weather, wet or dry, hot or cold, are the subject of a great deal of our common talk and observation; but how seldom do we think and speak of these things, as Elihu does here, with an awful regard to God the directo...":
    "As mudanças e extremos do tempo, úmido ou seco, quente ou frio, são o assunto de muita nossa conversa e observação comum; mas com que pouca frequência pensamos e falamos dessas coisas, como Eliu faz aqui, com um temor reverente a Deus o diretor...",
  
  "The Lord here proceeds to ask Job many puzzling questions, to convince him of his ignorance, and so to shame him for his folly in prescribing to God. If we will but try ourselves with such interrogatories as these, we shall soon be brought to own tha...":
    "O Senhor aqui prossegue a fazer a Jó muitas perguntas desconcertantes, para convencê-lo de sua ignorância, e assim envergonhá-lo por sua loucura em prescrever a Deus. Se tentarmos a nós mesmos com tais interrogatórios como esses, seremos em breve levados a reconhecer que...",
  
  "God here shows Job what little acquaintance he had with the untamed creatures that run wild in the deserts and live at large, but are the care of the divine Providence. As,\\\\\\\\nI. The wild goats and the hinds. That which is taken notice of concerning...":
    "Deus aqui mostra a Jó quão pouco conhecimento ele tinha das criaturas selvagens que correm pelas florestas e vivem amplamente, mas são o cuidado da Providência Divina. Como, I. Cabras monteses e corças. O que é notado concernente...",
  
  "The ostrich is a wonderful animal, a very large bird, but it never flies. Some have called it a winged camel. God here gives an account of it, and observes,\\\\\\\\nI. Something that it has in common with the peacock, that is, beautiful feathers (Job 39...":
    "A avestruz é um animal maravilhoso, uma ave muito grande, mas nunca voa. Alguns a chamaram de camelo alado. Deus aqui dá um relato dela, e observa, I. Algo que ela tem em comum com o pavão, que são penas belas (Jó 39...",
  
  "The birds of the air are proofs of the wonderful power and providences of God, as well as the beasts of the earth; God here refers particularly to two stately ones: - 1. The hawk, a noble bird of great strength and sagacity, and yet a bird of prey, J...":
    "As aves do céu são provas do poder maravilhoso e da providência de Deus, assim como as bestas da terra; Deus aqui se refere particularmente a duas majestosas: - 1. O falcão, uma ave nobre de grande força e sagacidade, e ainda assim uma ave de rapina, J...",
  
  "Here is, I. A humbling challenge which God gave to Job. After he had heaped up many hard questions upon him, to show him, by his manifest ignorance in the works of nature, what an incompetent judge he was of the methods and designs of Providence, he ...":
    "Aqui está, I. Um desafio humilhante que Deus deu a Jó. Depois de ter acumulado muitas perguntas difíceis sobre ele, para mostrar-lhe, por sua ignorância manifesta nas obras da natureza, quão incompetente juiz ele era dos métodos e desígnios da Providência, ele...",
  
  "The words of Job justifying himself were ended, Job 31:40. After that he said no more to that purport. The words of Job judging and condemning himself began, Job 40:4, Job 40:5. Here he goes on with words to the same purport. Though his patience had ...":
    "As palavras de Jó justificando a si mesmo terminaram, Jó 31:40. Depois disso ele não disse mais nada nesse sentido. As palavras de Jó julgando e condenando a si mesmo começaram, Jó 40:4, Jó 40:5. Aqui ele continua com palavras no mesmo sentido. Embora sua paciência tivesse...",
  
  "Here is, I. The description of the ungodly given, Psa 1:4. 1. In general, they are the reverse of the righteous, both in character and condition: They are not so. The Septuagint emphatically repeats this: Not so the ungodly; they are not so; they are...":
    "Aqui está, I. A descrição dos ímpios dada, Sl 1:4. 1. Em geral, eles são o oposto dos justos, tanto em caráter quanto em condição: Não são assim. A Septuaginta enfaticamente repete isso: Não assim os ímpios; não são assim; eles são...",
  
  "In these verses the psalmist endeavours,\\\\\\\\nI. To convince sinners of the evil and danger of the way they are in, how secure soever they are in that way. Three things he shows them, which, it may be, they are not very willing to see - their wickedne...":
    "Nestes versículos o salmista se esforça, I. Para convencer os pecados do mal e do perigo do caminho em que estão, por mais seguros que estejam nesse caminho. Três coisas ele lhes mostra, que, talvez, não estejam muito dispostos a ver — sua maldade...",
  
  "Here is, I. Holy David himself triumphing in the interest he had in the prayers of good people (Psa 20:6): \"Now know I (I that pen the psalm know it) that the Lord saveth his anointed, because he hath stirred up the hearts of the seed of Jacob to pra...":
    "Aqui está, I. O próprio Davi santo triunfando no interesse que tinha nas orações do povo bom (Sl 20:6): \"Agora eu sei (eu que escrevo o salmo sei disso) que o Senhor salva o seu ungido, porque ele excitou o coração da semente de Jacó para or...",
  
  "In these verses David is very earnest in prayer.\\\\\\\\nI. He prays that God would graciously hear and answer him, now that, in his distress, he called upon him, Psa 28:1, Psa 28:2. Observe his faith in prayer: O Lord, my rock, denoting his belief of Go...":
    "Nestes versículos Davi é muito perseverante na oração. I. Ele ora para que Deus ouça e responda graciosamente, agora que, em sua angústia, ele o invocou, Sl 28:1, Sl 28:2. Observe sua fé na oração: Ó Senhor, minha rocha, denotando sua crença em Deus...",
  
  "In these verses,\\\\\\\\nI. David gives God thanks for the audience of his prayers as affectionately as a few verses before he had begged it: Blessed be the Lord, Psa 28:6. How soon are the saints\\":
    "Nestes versículos, I. Davi dá graças a Deus pela audiência de suas orações tão afetuosamente quanto alguns versículos antes havia suplicado: Bendito seja o Senhor, Sl 28:6. Quão rapidamente os santos...",
  
  "We have, in these verses, an account of three several states that David was in successively, and of the workings of his heart towards God in each of those states - what he said and did, and how his heart stood affected; in the first of these we may s...":
    "Temos, nestes versículos, um relato de três estados pelos quais Davi passou sucessivamente, e dos trabalhos de seu coração para com Deus em cada um desses estados — o que ele disse e fez, e como seu coração estava afetado; no primeiro desses podemos...",
  
  "The psalmist, having meditated upon the work of redemption, and spoken of it in the person of the Messiah, now comes to make improvement of the doctrine of his mediation between us and God, and therefore speaks in his own person. Christ having done h...":
    "O salmista, tendo meditado sobre a obra da redenção, e falado dela na pessoa do Messias, agora vem fazer uso da doutrina de sua mediação entre nós e Deus, e portanto fala em sua própria pessoa. Cristo tendo feito sua...",
  
  "In these verses we have,\\\\\\\\nI. David praying. Prayer is a salve for every sore and a relief to the spirit under every burden: Give ear to my prayer, O God! Psa 55:1, Psa 55:2. He does not set down the petitions he offered up to God in his distress, ...":
    "Nestes versículos temos, I. Davi orando. A oração é um bálsamo para cada ferida e um alívio ao espírito sob cada fardo: Inclina o ouvido à minha oração, ó Deus! Sl 55:1, Sl 55:2. Ele não registra as petições que ofereceu a Deus em sua angústia,...",
  
  "In these verses we have,\\\\\\\\nI. David\\":
    "Nestes versículos temos, I. Davi...",
  
  "In these verses,\\\\\\\\nI. David prays that God would appear in his glory,\\\\\\\\n1. For the confusion of his enemies (Psa 68:1, Psa 68:2): \"Let God arise, as a judge to pass sentence upon them, as a general to take the field and do execution upon them; an...":
    "Nestes versículos, I. Davi ora para que Deus apareça em sua glória, 1. Para a confusão de seus inimigos (Sl 68:1, Sl 68:2): \"Que Deus se levante, como juiz para proferir sentença contra eles, como general para tomar o campo e executar justiça sobre eles; e...",
  
  "The psalmist here, having occasion to give God thanks for the great things he had done for him and his people of late, takes occasion thence to praise him for what he had done for their fathers in the days of old. Fresh mercies should put us in mind ...":
    "O salmista aqui, tendo ocasião de dar graças a Deus pelas grandes coisas que fizera por ele e por seu povo recentemente, toma ocasião disso para louvá-lo pelo que fizera por seus pais nos dias antigos. Misericórdias frescas devem nos lembrar...",
  
  "In these verses,\\\\\\\\nI. The psalmist gives to God the praise of his advancement to honour and power, and the other great things he had done for him and for his people Israel (Psa 75:1): Unto thee, O God! do we give thanks for all the favours thou has...":
    "Nestes versículos, I. O salmista dá a Deus o louvor por sua elevação à honra e poder, e pelas outras grandes coisas que fizera por ele e por seu povo Israel (Sl 75:1): A ti, ó Deus! damos graças por todos os favores que tens...",
  
  "We have here,\\\\\\\\nI. God\\":
    "Temos aqui, I. Deus...",
  
  "The psalmist, having largely shown the blessedness of the God of Israel, here shows the blessedness of the Israel of God. As there is none like unto the God of Jeshurun, so, happy art thou, O Israel! there is none like unto thee, O people! especially...":
    "O salmista, tendo amplamente mostrado a bem-aventurança do Deus de Israel, aqui mostra a bem-aventurança de Israel de Deus. Assim como não há nenhum como o Deus de Jetur, assim, feliz és tu, ó Israel! Não há nenhum como tu, ó povo! Especialmente...",
  
  "The kingdom of the Messiah, like the pillar of cloud and fire, as it has a dark side towards the Egyptians, so it has a bright side towards the Israel of God. It is set up in spite of opposition; and then the earth saw and trembled (Psa 97:4), but Zi...":
    "O reino do Messias, como a coluna de nuvem e fogo, assim como tem um lado escuro em direção aos egípcios, assim tem um lado brilhante em direção a Israel de Deus. É estabelecido apesar da oposição; e então a terra viu e tremeu (Sl 97:4), mas Si...",
  
  "Here is, I. The doctrine of universal providence laid down, Psa 103:19. He has secured the happiness of his peculiar people by promise and covenant, but the order of mankind, and the world in general, he secures by common providence. The Lord has a t...":
    "Aqui está, I. A doutrina da providência universal estabelecida, Sl 103:19. Ele assegurou a felicidade de seu povo peculiar por promessa e aliança, mas a ordem da humanidade, e o mundo em geral, ele assegura pela providência comum. O Senhor tem um t...",
  
  "The title of the psalm being Hallelujah, the psalmist (as every author ought to have) has an eye to his title, and keeps to his text.\\\\\\\\nI. He resolves to praise God himself, Psa 111:1. What duty we call others to we must oblige and excite ourselves...":
    "O título do salmo sendo Aleluia, o salmista (como todo autor deveria ter) tem um olhar para seu título, e mantém seu texto. I. Ele se resolve a louvar a Deus pessoalmente, Sl 111:1. A que dever chamamos os outros, devemos nos obrigar e excitar nós mesmos...",
  
  "In this psalm,\\\\\\\\nI. We are extorted to give glory to God, to give him the glory due to his name.\\\\\\\\n1. The invitation is very pressing: praise you the Lord, and again and again, Praise him, praise him; blessed be his name, for it is to be praised,...":
    "Neste salmo, I. Somos extorquidos a dar glória a Deus, a dar-lhe a glória devida ao seu nome. 1. O convite é muito pressionado: louvai ao Senhor, e novamente e novamente, Louvai-o, louvai-o; bendito seja o seu nome, pois é para ser louvado,...",
  
  "Here is, I. David\\":
    "Aqui está, I. Davi...",
  
  "Observe, I. That those who will make anything to purpose of their religion must first make it their serious and deliberate choice; so David did: I have chosen the way of truth. Note, 1. The way of serious godliness is the way of truth; the principles...":
    "Observe, I. Que aqueles que farão algo de propósito de sua religião devem primeiro fazê-lo sua escolha séria e deliberada; assim Davi fez: Escolhi o caminho da verdade. Observe, 1. O caminho da piedade séria é o caminho da verdade; os princípios...",
  
  "We may hence gather the character of a godly man. 1. He makes the favour of God his felicity: Thou art my portion, O Lord! Others place their happiness in the wealth and honours of this world. Their portion is in this life; they look no further; they...":
    "Daqui podemos reunir o caráter de um homem piedoso. 1. Ele faz o favor de Deus sua felicidade: Tu és a minha porção, ó Senhor! Outros colocam sua felicidade nas riquezas e honras deste mundo. Sua porção é nesta vida; eles não olham além; eles...",
  
  "Here is, 1. The malice of David\\":
    "Aqui está, 1. A malícia dos inimigos de Davi...",
  
  "Here, 1. David makes a thankful acknowledgment of God\\":
    "Aqui, 1. Davi faz uma gratificante declaração do socorro de Deus...",
  
  "Here is, 1. David in care to be found in the way of his duty. His constant desire and design are to keep the testimony of God\\":
    "Aqui está, 1. Davi cuidadoso em ser encontrado no caminho de seu dever. Seu constante desejo e designio são manter o testemunho de Deus...",
  
  "Here is, 1. A very good resolution: \"I will never forget thy precepts, but will always retain a remembrance of and regard to thy word as my rule.\" It is a resolution for perpetuity, never to be altered. Note, The best evidence of our love to the word...":
    "Aqui está, 1. Uma muito boa resolução: \"Nunca me esquecerei dos teus preceitos, mas sempre guardarei a memória e a consideração da tua palavra como minha regra.\" É uma resolução para a perpetuidade, nunca a ser alterada. Observe, A melhor evidência de nosso amor à palavra...",
  
  "Here is, 1. The representation David makes of the sorrowful condition he was in: I am afflicted very much, afflicted in spirit; he seems to mean that especially. He laboured under many discouragements; without were fightings, within were fears. This...":
    "Aqui está, 1. A representação que Davi faz da condição triste em que estava: Sou afligido muito, afligido no espírito; ele parece significar isso especialmente. Ele labutava sob muitos desencorajamentos; de fora havia lutas, de dentro havia medos. Isso...",
  
  "Here is, 1. David\\":
    "Aqui está, 1. Davi...",
  
  "Here David prays for two great spiritual blessings, and is, in this verse, as earnest for the good work of God in him as, in the verse before, for the good-will of God towards him. He prays, 1. For direction in the paths of duty: \"Order my steps in t...":
    "Aqui Davi ora por duas grandes bênçãos espirituais, e é, neste versículo, tão perseverante pela boa obra de Deus nele quanto, no versículo anterior, pela boa vontade de Deus para com ele. Ele ora, 1. Por direção nos caminhos do dever: \"Ordena os meus passos na t...",
  
  "Here is, 1. The righteousness of God, the infinite rectitude and perfection of his nature. As he is what he is, so he is what he should be, and in every thing acts as becomes him; there is nothing wanting, nothing amiss, in God; his will is the etern...":
    "Aqui está, 1. A justiça de Deus, a infinita retidão e perfeição de sua natureza. Como ele é o que é, assim ele é o que deveria ser, e em tudo age como lhe convém; não há nada faltando, nada errado, em Deus; sua vontade é a etern...",
  
  "Here is, 1. David pious and yet poor. He was a man after God\\":
    "Aqui está, 1. Davi piedoso e ainda assim pobre. Ele era um homem segundo o coração de Deus...",
  
  "Here, I. David prays for succour in distress. Is any afflicted? let him pray; let him pray as David does here. 1. He has an eye to God\\":
    "Aqui, I. Davi ora por socorro na aflição. Alguém está afligido? Ore; que ore como Davi faz aqui. 1. Ele tem um olhar para Deus...",
  
  "Here is, 1. A penitent confession: I have gone astray, or wander up and down, like a lost sheep. As unconverted sinners are like lost sheep (Luk 15:4), so weak unsteady saints are like lost sheep, Mat 18:12, Mat 18:13. We are apt to wander like sheep...":
    "Aqui está, 1. Uma confissão penitente: Eu me desviei, ou vaguei de um lado para o outro, como uma ovelha perdida. Assim como pecadores não convertidos são como ovelhas perdidas (Lc 15:4), assim santos fracos e inconstantes são como ovelhas perdidas, Mt 18:12, Mt 18:13. Nós tendemos a vaguear como ovelhas...",
  
  "This psalm teaches us,\\\\\\\\nI. To stay ourselves upon God as a God of power and a God all-sufficient for us. David did so and found the benefit of it. 1. We must not rely upon creatures, upon men and means, instruments and second causes, nor make fles...":
    "Este salmo nos ensina, I. A nos firmarmos em Deus como um Deus de poder e um Deus todo-suficiente para nós. Davi o fez e encontrou o benefício disso. 1. Não devemos confiar em criaturas, em homens e meios, instrumentos e causas secundárias, nem fazer da carne...",
  
  "Here the psalmist further magnifies the great deliverance God had lately wrought for them.\\\\\\\\nI. That their hearts might be the more enlarged in thankfulness to him (Psa 124:6): Blessed be the Lord. God is the author of all our deliverances, and the...":
    "Aqui o salmista ainda mais magnifica a grande libertação que Deus havia operado recentemente para eles. I. Para que seus corações fossem mais amplificados em gratidão a ele (Sl 124:6): Bendito seja o Senhor. Deus é o autor de todas as nossas libertações, e a...",
  
  "Here are three very precious promises made to the people of God, which, though they are designed to secure the welfare of the church in general, may be applied by particular believers to themselves, as other promises of this nature may. Here is,\\\\\\\\n...":
    "Aqui há três promessas muito preciosas feitas ao povo de Deus, que, embora sejam destinadas a assegurar o bem-estar da igreja em geral, podem ser aplicadas por crentes específicos a si mesmos, como outras promessas de natureza semelhante podem. Aqui está...",
  
  "Here is, 1. The prayer the psalmist puts up for the happiness of those that are sincere and constant (Psa 125:4): Do good, O Lord! unto those that are good. This teaches us to pray for all good people, to make supplication for all saints; and we may ...":
    "Aqui está, 1. A oração que o salmista oferece pela felicidade daqueles que são sinceros e constantes (Sl 125:4): Faz bem, ó Senhor! Aos que são bons. Isso nos ensina a orar por todas as pessoas boas, a fazer súplicas por todos os santos; e podemos...",
  
  "In these verses we are taught,\\\\\\\\nI. Whatever condition we are in, though ever so deplorable, to continue calling upon God, Psa 130:1. The best men may sometimes be in the depths, in great trouble and affliction, and utterly at a loss what to do, in...":
    "Nestes versículos somos ensinados, I. Em qualquer condição em que estejamos, embora tão deplorável, continuar invocando Deus, Sl 130:1. Os melhores homens podem às vezes estar nas profundezas, em grande aflição e angústia, e completamente sem saber o que fazer, em...",
  
  "Here, I. The psalmist engages himself to trust in God and to wait for him, Psa 130:5, Psa 130:6. Observe, 1. His dependence upon God, expressed in a climax, it being a song of degrees, or ascents: \"I wait for the Lord; from him I expect relief and...":
    "Aqui, I. O salmista se compromete a confiar em Deus e esperar por ele, Sl 130:5, Sl 130:6. Observe, 1. Sua dependência de Deus, expressa em um clímax, sendo um cântico dos degraus, ou ascensões: \"Eu espero pelo Senhor; dele espero alívio e...",
  
  "Here is, 1. The duty we are called to - to praise the Lord, to praise his name; praise him, and again praise him. We must not only thank him for what he has done for us, but praise him for what he is in himself and has done for others; take all occas...":
    "Aqui está, 1. O dever para o qual somos chamados — louvar o Senhor, louvar seu nome; louvá-lo, e novamente louvá-lo. Não devemos apenas agradecer-lhe pelo que ele fez por nós, mas louvá-lo pelo que ele é em si mesmo e fez por outros; tomar toda occas...",
  
  "In this, as in other things, David was a type of Christ, that he suffered before he reigned, was humbled before he was exalted, and that as there were many who loved and valued him, and sought to do him honour, so there were many who hated and envied...":
    "Nisso, como em outras coisas, Davi era um tipo de Cristo, que sofreu antes de reinar, foi humilhado antes de ser exaltado, e que assim como havia muitos que o amavam e valorizavam, e buscavam honrá-lo, assim havia muitos que o odiavam e invejavam...",
  
  "The psalmist here tells us, for our instruction, 1. How he was disowned and deserted by his friends, Psa 142:4. When he was in favour at court he seemed to have a great interest, but when he was made an out-law, and it was dangerous for any one to ha...":
    "O salmista aqui nos diz, para nossa instrução, 1. Como foi rejeitado e abandonado por seus amigos, Sl 142:4. Quando estava em favor na corte parecia ter grande interesse, mas quando foi feito proibido, e era perigoso para qualquer um ter...",
  
  "Here, I. David humbly begs to be heard (Psa 143:1), not as if he questioned it, but he earnestly desired it, and was in care about it, for, having desired it, and was in care about it, for having directed his prayer, he looked up to see how it sped, ...":
    "Aqui, I. Davi humildemente implora ser ouvido (Sl 143:1), não como se questionasse isso, mas ele earnestly desejava isso, e estava com cuidado sobre isso, pois, tendo desejado isso, e estava com cuidado sobre isso, pois tendo dirigido sua oração, ele olhou para cima para ver como ela progrediu,...",
  
  "Here, I. David acknowledges his dependence upon God and his obligations to him, Psa 144:1, Psa 144:2. A prayer for further mercy is fitly begun with a thanksgiving for former mercy; and when we are waiting upon God to bless us we should stir up ourse...":
    "Aqui, I. Davi reconhece sua dependência de Deus e suas obrigações para com ele, Sl 144:1, Sl 144:2. Uma oração por mais misericórdia é convenientemente iniciada com uma ação de graças por misericórdia anterior; e quando estamos esperando que Deus nos abençoe devemos nos excitar...",
  
  "The entitling of this David\\":
    "A titulação deste salmo de Davi...",
  
  "The greatness and goodness of him who is optimus et maximus - the best and greatest of beings, were celebrated in the former part of the psalm; here, in these verses, we are taught to give him the glory of his kingdom, in the administration of which...":
    "A grandeza e bondade dele que é optimus et maximus — o melhor e maior dos seres, foram celebradas na parte anterior do salmo; aqui, nestes versículos, somos ensinados a dar-lhe a glória de seu reino, na administração do qual...",
  
  "Here is, 1. The just praise of those who improve their opportunities, who take pains to gather and increase what they have, both for soul and body, who provide for hereafter while provision is to be made, who gather in summer, which is gathering time...":
    "Aqui está, 1. O justo louvor daqueles que aproveitam suas oportunidades, que se esforçam para reunir e aumentar o que têm, tanto para a alma quanto para o corpo, que providenciam para o futuro enquanto provisão deve ser feita, que colhem no verão, que é tempo de colheita...",
  
  "Here is, 1. The honour and happiness of the obedient. They will receive commandments; they will take it as a privilege, and really an ease to them, to be under government, which saves them the labour of deliberating and choosing for themselves; and t...":
    "Aqui está, 1. A honra e felicidade dos obedientes. Eles receberão mandamentos; eles o tomarão como um privilégio, e realmente um alívio para eles, estarem sob governo, que os poupa do trabalho de deliberar e escolher por si mesmos; e t...",
  
  "Here is, 1. The bad omen of a kingdom\\":
    "Aqui está, 1. O mau presságio de um reino sem conselho...",
  
  "Here is, 1. A faithful witness commended for an honest man. He that makes conscience of speaking truth, and representing every thing fairly, to the best of his knowledge, whether in judgment or in common conversation, whether he be upon his oath or n...":
    "Aqui está, 1. Um testemunho fiel elogiado como um homem honesto. Aquele que faz consciência de falar a verdade, e representar tudo justamente, ao melhor de seu conhecimento, seja no julgamento ou em conversa comum, seja sob juramento ou n...",
  
  "This observation is applicable,\\\\\\\\nI. To men\\":
    "Esta observação é aplicável, I. Aos homens...",
  
  "By the law of the wise and righteous, here, we may understand either the principles and rules by which they govern themselves or (which comes all to one) the instructions which they give to others, which ought to be as a law to all about them; and if...":
    "Pela lei do justo e sábio, aqui, podemos entender os princípios e regras pelos quais eles governam a si mesmos ou (o que dá no mesmo) as instruções que dão aos outros, que deveriam ser como uma lei para todos ao redor deles; e se...",
  
  "In the administration of justice much depends upon the witnesses, and therefore it is necessary to the common good that witnesses be principled as they ought to be; for, 1. A witness that is conscientious will not dare to give in a testimony that is...":
    "Na administração da justiça muito depende das testemunhas, e portanto é necessário para o bem comum que as testemunhas sejam principiadas como deveriam ser; pois, 1. Uma testemunha que é conscienciosa não ousará dar um testemunho que é...",
  
  "The foregoing verse showed how much our reputation, this how much our health, depends on the good government of our passions and the preserving of the temper of the mind. 1. A healing spirit, made up of love and meekness, a hearty, friendly, cheerful...":
    "O versículo anterior mostrou quão reputação nossa, este quão saúde nossa, depende do bom governo de nossas paixões e da preservação do temperamento do espírito. 1. Um espírito curativo, feito de amor e mansidão, um sincero, amigável, alegre...",
  
  "This is a reason of what was said in the foregoing verse. 1. The sacrifices of the wicked are an abomination to God, not for want of some nice points of ceremony, but because their way, the whole course and tenour of their conversation, is wicked, an...":
    "Esta é uma razão do que foi dito no versículo anterior. 1. Os sacrifícios dos ímpios são uma abominação a Deus, não por falta de alguns pontos cerimoniais, mas porque seu caminho, todo o curso e teor de sua conduta, é ímpio, e...",
  
  "Here is, 1. A good man proved to be a wise man by this, that he governs his tongue well; he that does so the same is a perfect man, Jam 3:2. It is part of the character of a righteous man that being convinced of the account he must give of his words,...":
    "Aqui está, 1. Um bom homem provado ser um sábio por isso, que governa bem sua língua; aquele que faz isso é um homem perfeito, Tg 3:2. É parte do caráter de um homem justo ser convencido da prestação de contas que deve dar de suas palavras,...",
  
  "Here is, 1. The character of a good king, which Solomon intended not for his own praise, but for instruction to his successors, his neighbours, and the viceroys under him. A good king not only does justice, but it is an abomination to him to do other...":
    "Aqui está, 1. O caráter de um bom rei, que Salomão não destinou para seu próprio louvor, mas para instrução a seus sucessores, seus vizinhos, e os vice-reis sob ele. Um bom rei não apenas faz justiça, mas é uma abominação para ele fazer outro...",
  
  "Observe, 1. Wicked children are an affliction to both their parents. They are an occasion of anger to the father (so the word signifies), because they contemn his authority, but of sorrow and bitterness to the mother, because they abuse her tendernes...":
    "Observe, 1. Filhos ímpios são uma aflição para ambos os pais. Eles são ocasião de ira ao pai (assim a palavra significa), porque desprezam sua autoridade, mas de tristeza e amargura à mãe, porque abusam de sua ternura...",
  
  "This justly condemns those who, being employed in the administration of justice, pervert judgment, 1. By conniving at men\\":
    "Isso justamente condena aqueles que, empregados na administração da justiça, pervertem o julgamento, 1. Ao consentirem com os homens...",
  
  "This is designed to rectify men\\":
    "Isso é destinado a retificar os homens...",
  
  "Here is, 1. The character of a good governor: He is a king that deserves to be called so who sits in the throne, not as a throne of honour, to take his ease, and take state upon him, and oblige men to keep their distance, but as a throne of judgment,...":
    "Aqui está, 1. O caráter de um bom governante: Ele é um rei que merece ser chamado assim e que se senta no trono, não como um trono de honra, para descansar, e tomar estado sobre si, e obrigar os homens a manter distância, mas como um trono de julgamento,...",
  
  "This may be taken as showing us, 1. The marks of a wicked man. He that has a high look and a proud heart, that carries himself insolently and scornfully towards both God and man, and that is always ploughing and plotting, designing and devising some...":
    "Isso pode ser tomado como nos mostrando, 1. As marcas de um homem ímpio. Aquele que tem um olhar altivo e um orgulho no coração, que se porta insolentemente e com desprezo tanto para Deus quanto para os homens, e que sempre arando e tramando, projetando e inventando algum...",
  
  "Here is, 1. The power that is commonly found to be in gifts. Nothing is more violent than anger. O the force of strong wrath! And yet a handsome present, prudently managed, will turn away some men\\":
    "Aqui está, 1. O poder que é comumente encontrado nos presentes. Nada é mais violento que a raiva. Ó a força da forte ira! E ainda assim um presente agradável, prudentemente gerenciado, afastará alguns homens...",
  
  "Here is, 1. The qualification of an accomplished, a complete gentleman, that is fit to be employed in public business. He must be an honest man, a man that loves pureness of heart and hates all impurity, not only pure from all fleshly lusts, but from...":
    "Aqui está, 1. A qualificação de um cavalheiro accomplishado, completo, que é apto para ser empregado em negócios públicos. Ele deve ser um homem honesto, um homem que ama a pureza do coração e odeia toda impureza, não apenas puro de todas as concupiscências carnais, mas de...",
  
  "Here is, 1. The special care God takes to preserve knowledge, that is, to keep up religion in the world by keeping up among men the knowledge of himself and of good and evil, notwithstanding the corruption of mankind, and the artifices of Satan to bl...":
    "Aqui está, 1. O cuidado especial que Deus toma para preservar o conhecimento, isso é, para manter a religião no mundo mantendo entre os homens o conhecimento de si mesmo e do bem e do mal, apesar da corrupção da humanidade, e das artimanhas de Satanás para bl...",
  
  "Here is, 1. A plain intimation what a hard thing it is to find a truly ingenious industrious man: \"Seest thou a man diligent in his business? Thou wilt not see many such, so epidemical are dulness and slothfulness.\" He is here commended who lays out...":
    "Aqui está, 1. Uma clara indicação de quão difícil é encontrar um homem verdadeiramente engenhoso e industrioso: \"Vês um homem diligente em seus negócios? Não verás muitos assim, tão epidêmicos são a estupidez e a preguiça.\" Ele é aqui elogiado que se esforça...",
  
  "Here is, 1. A necessary caution against entertaining any favourable thoughts of prospering profaneness: \"Let not thy heart envy sinners; do not grudge them either the liberty they take to sin or the success they are to be pitied rather than envied. T...":
    "Aqui está, 1. Uma cautela necessária contra abrigar quaisquer pensamentos favoráveis de prosperar a profanação: \"Não deixe que seu coração inveje os pecadores; não lhes inveje nem a liberdade que tomam para pecar nem o sucesso, eles são mais para serem compadecidos do que invejados. T...",
  
  "This is spoken, not so much by way of counsel to wicked men (they will not receive instruction, Pro 23:9), but rather in defiance of them, for the encouragement of good people that are threatened by them. See here, 1. The designs of the wicked agains...":
    "Isso é dito, não tanto por conselho aos homens ímpios (eles não receberão instrução, Pv 23:9), mas sim em desafio a eles, para o encorajamento do povo bom que é ameaçado por eles. Veja aqui, 1. Os desígnios dos ímpios contra...",
  
  "Here, 1. The pleasure we are apt to take in the troubles of an enemy is forbidden us. If any have done us an ill turn, or if we bear them ill-will only because they stand in our light or in our way, when any damage comes to them (suppose they fall),...":
    "Aqui, 1. O prazer que tendemos a tomar nos problemas de um inimigo nos é proibido. Se alguém nos fez um mau favor, ou se lhes guardamos má vontade apenas porque nos atrapalham ou estão em nosso caminho, quando qualquer dano lhes acontece (suponha que caiam),...",
  
  "Here, 1. We are allowed a sober and moderate use of the delights of sense: Hast thou found honey? It is not forbidden fruit to thee, as it was to Jonathan; thou mayest eat of it with thanksgiving to God, who, having created things grateful to our sen...":
    "Aqui, 1. Nos é permitido um uso sóbrio e moderado dos prazeres dos sentidos: Tu achaste mel? Não é fruta proibida para ti, como era para Jônatas; podes comer dela com ações de graças a Deus, que, tendo criado coisas agradáveis aos nossos sen...",
  
  "Here see, 1. How we must discourage sin and witness against it, and particularly the sin of slandering and backbiting; we must frown upon it,, and, by giving it an angry countenance, endeavour to put it out of countenance. Slanders would not be so rea...":
    "Aqui vemos, 1. Como devemos desencorajar o pecado e testemunhar contra ele, e particularmente o pecado de caluniar e difamar; devemos franzi-lo, e, dando-lhe um semblante zangado, esforçar-nos para colocá-lo em desgraça. Calúnias não seriam tão rea...",
  
  "Here is, 1. The good character of a wise and virtuous man implied. He is one that has rule over his own spirit; he maintains the government of himself, and of his own appetites and passions, and does not suffer them to rebel against reason and consci...":
    "Aqui está, 1. O bom caráter de um homem sábio e virtuoso implicitado. Ele é aquele que tem governo sobre seu próprio espírito; ele mantém o governo de si mesmo, e de seus próprios apetites e paixões, e não sofre que se rebellem contra a razão e consci...",
  
  "Here, 1. Wicked men are compared to the horse and the ass, so brutish are they, so unreasonable, so unruly, and not to be governed but by force or fear, so low has sin sunk men, so much below themselves. Man indeed is born like the wild ass\\":
    "Aqui, 1. Homens ímpios são comparados ao cavalo e ao jumento, tão brutais são, tão irracionais, tão indômitos, e não podem ser governados senão pela força ou pelo medo, tão baixo o pecado afundou os homens, tão abaixo de si mesmos. O homem de fato nasce como o jumento selvagem...",
  
  "Here is, 1. A spiritual disease supposed, and that is self-conceit: Seest thou a man? Yes, we see many a one, wise in his own conceit, who has some little sense, but is proud of it, thinks it much more than it is, more than any of his neighbours, hav...":
    "Aqui está, 1. Uma doença espiritual suposta, e essa é a presunção: Vês um homem? Sim, vemos muitos um, sábio em sua própria presunção, que tem algum pouco senso, mas é orgulhoso disso, pensa que é muito mais do que é, mais do que qualquer um de seus vizinhos, tend...",
  
  "This also we had before, Pro 20:16. 1. It shows who those are that are hastening to poverty, those that have so little consideration as to be bound for every body that will ask them and those that are given to women. Such as these will take up money...":
    "Isso também tínhamos antes, Pv 20:16. 1. Mostra quem são aqueles que estão se apressando para a pobreza, aqueles que têm tão pouca consideração a ponto de serem fiadores para cada um que lhes pedir e aqueles que são dados às mulheres. Tais como esses tomarão dinheiro...",
  
  "Here is, 1. The doom of seducers, who attempt to draw good people, or those who profess to be such, into sin and mischief, who take pride in causing the righteous to go astray in an evil way, in drawing them into a snare, that they may insult over th...":
    "Aqui está, 1. O destino dos sedutores, que tentam arrastar pessoas boas, ou as que professam ser tais, ao pecado e ao mal, que se orgulham em fazer os justos se desviarem em um caminho maligno, em atraí-las para uma armadilha, para que possam insultá-las...",
  
  "This is what was said before, Pro 28:12, Pro 28:28. 1. The people will have cause to rejoice or mourn according as their rulers are righteous or wicked; for, if the righteous be in authority, sin will be punished and restrained, religion and virtue w...":
    "Isso é o que foi dito antes, Pv 28:12, Pv 28:28. 1. O povo terá motivo para alegrar-se ou lamentar de acordo com se seus governantes são justos ou ímpios; pois, se os justos estiverem em autoridade, o pecado será punido e restringido, a religião e a virtude w...",
  
  "Here is, I. An account of four things that are unsearchable, too wonderful to be fully known. And here,\\\\\\\\n1. The first three are natural things, and are only designed as comparisons for the illustration of the last. We cannot trace, (1.) An eagle i...":
    "Aqui está, I. Um relato de quatro coisas que são insondáveis, maravilhosas demais para serem plenamente conhecidas. E aqui, 1. As três primeiras são coisas naturais, e são apenas projetadas como comparações para a ilustração da última. Não podemos rastrear, (1.) Uma águia em...",
  
  "Here is, I. An encomium of wisdom (Ecc 8:1), that is, of true piety, guided in all its exercises by prudence and discretion. The wise man is the good man, that knows God and glorifies him, knows himself and does well for himself; his wisdom is a grea...":
    "Aqui está, I. Um elogio da sabedoria (Ec 8:1), isso é, da verdadeira piedade, guiada em todos os seus exercícios pela prudência e discrição. O homem sábio é o homem bom, que conhece Deus e o glorifica, conhece a si mesmo e se porta bem; sua sabedoria é uma grea...",
  
  "Here is an admonition both to old people and to young people, to think of dying, and get ready for it. Having by many excellent precepts taught us how to live well, the preacher comes now, towards the close of his discourse, to teach us how to die we...":
    "Aqui há uma admoestação tanto para os velhos quanto para os jovens, para pensar na morte, e se preparar para ela. Tendo-nos ensinado por muitos excelentes preceitos como viver bem, o pregador vem agora, perto do final de seu discurso, para nos ensinar como morrer bem...",
  
  "The great enquiry which Solomon prosecutes in this book is, What is that good which the sons of men should do? Ecc 2:3. What is the true way to true happiness, the certain means to attain our great end? He had in vain sought it among those things whi...":
    "A grande investigação que Salomão prossegue neste livro é: Qual é aquele bem que os filhos dos homens deveriam fazer? Ec 2:3. Qual é o verdadeiro caminho para a verdadeira felicidade, o meio certo para atingir nosso grande objetivo? Ele havia em vão buscado entre aquelas coisas que...",
};

let translatedCount = 0;
for (const [english, portuguese] of Object.entries(translations)) {
  if (content.includes(english)) {
    content = content.replace(english, portuguese);
    translatedCount++;
  }
}

writeFileSync(filePath, content, 'utf-8');
console.log(`Batch 2: Translated ${translatedCount} comments`);
