"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  BookOpen, ChevronLeft, ChevronRight, Search, X, Languages,
  MapPin, Users, ExternalLink, Link2, Copy, Share2, Heart,
  ScrollText, BookMarked, MessageCircle, Sparkles, Star
} from "lucide-react";
import { getCrossReferences } from "@/lib/cross-references";
import { LEXICON_DATA, LexiconEntry } from "@/lib/lexicon-data";
import { fetchParallel, getBookId, getMorphology } from "@/lib/bolls-api";

const COMMENTARIES: Record<string, { autor: string; titulo: string; conteudo: string }[]> = {
  "Gênesis 1:1": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Aqui vemos o início de todas as coisas — tempo, espaço, matéria. Deus, que é eterno, resolveu manifestar seu poder criativo. O nome Elohim (plural) sugere a Trindade. A criação foi um ato soberano e gratuito da vontade divina. 'No princípio Deus criou' — este é o fundamento de toda a revelação, o primeiro artigo da fé: que o mundo não é eterno, nem produto do acaso, mas criado por um Deus pessoal e poderoso." },
  ],
  "Gênesis 1:26": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Chegamos agora à obra-prima da criação: o homem. Feito à imagem e semelhança de Deus — não em aparência física, mas em santidade, sabedoria e domínio. O conselho divino ('Façamos o homem') aponta para a Trindade. O homem foi criado para ter comunhão com Deus, para refletir sua glória e para exercer domínio sobre a criação como vice-regente de Deus." },
    { autor: "John Calvin", titulo: "Comentário", conteudo: "A imagem de Deus no homem consiste na retidão original, no conhecimento, na justiça e na santidade verdadeiras. O homem foi formado diferente dos animais: não apenas um corpo animado, mas um espírito imortal dotado de entendimento." },
  ],
  "Gênesis 1:27": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Macho e fêmea os criou. O casamento foi designado por Deus, não como uma invenção humana, mas como uma instituição divina. A igualdade diante de Deus é aqui estabelecida: ambos foram criados à imagem de Deus, ambos são portadores de dignidade e valor." },
  ],
  "Gênesis 2:7": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "O homem foi feito do pó da terra — lembrança de sua origem humilde e fragilidade. Mas Deus soprou em suas narinas o fôlego de vida, e o homem se tornou alma vivente. O corpo é terreno, a alma é celestial. O contato direto de Deus com Adão mostra sua intimidade e amor na criação. Não somos apenas matéria; temos em nós o sopro divino." },
  ],
  "Gênesis 3:15": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Este é o protoevangelho — a primeira promessa do Evangelho. A semente da mulher (Cristo) esmagará a cabeça da serpente (Satanás). Há inimizade entre as duas sementes: a igreja e o mundo. Cristo veio para destruir as obras do diabo. Na cruz, ele feriu a cabeça da serpente, embora seu calcanhar tenha sido ferido. Esta é a primeira pregação do Evangelho na história." },
    { autor: "John Wesley", titulo: "Comentário", conteudo: "Aqui está a primeira promessa de Cristo, o fundamento de todas as profecias que se seguiram. A semente da mulher é Cristo; a semente da serpente são os ímpios. A inimizade entre eles durará até o fim." },
  ],
  "Gênesis 12:1": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Deus chama Abrão para sair de sua terra, de sua parentela e da casa de seu pai. A fé é uma resposta ao chamado de Deus, que exige separação. Abrão obedeceu sem saber para onde ia — esta é a essência da fé: confiar na palavra de Deus mais do que na vista. Deus prova nossa fé chamando-nos para fora de nossa zona de conforto." },
  ],
  "Gênesis 12:3": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Em ti serão benditas todas as famílias da terra. Esta é a promessa do Messias, cumprida em Cristo (Gálatas 3:8). A bênção de Abraão é para todas as nações. O evangelho não é apenas para os judeus, mas para todos os povos. Em Cristo, as barreiras nacionais e étnicas são derrubadas." },
  ],
  "Gênesis 15:6": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Abraão creu em Deus, e isso lhe foi imputado como justiça. Aqui está a grande doutrina da justificação pela fé. O patriarca foi justificado não por obras, mas pela fé. Antes da circuncisão, antes da lei, Abraão foi salvo pela fé — mostrando que a salvação sempre foi pela graça mediante a fé." },
    { autor: "Charles Spurgeon", titulo: "Comentário", conteudo: "A fé de Abraão não era uma fé vazia, mas uma fé que se apegava à promessa de Deus. E Deus, em sua graça, contou essa fé como justiça. Não por causa do mérito da fé, mas por causa da fidelidade de Deus à sua promessa." },
  ],
  "Gênesis 22:14": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Jeová-Jiré — o Senhor proverá. Este nome memorável foi dado por Abraão no monte Moriá. Deus proveu um cordeiro no lugar de Isaque, apontando para o Cordeiro de Deus que tira o pecado do mundo. A fé de Abraão foi provada ao máximo, e Deus honrou essa fé. Não retes teu filho, teu único filho — palavras que ecoam o próprio sacrifício do Pai celestial." },
  ],
  "Êxodo 3:14": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "EU SOU O QUE SOU. Este é o nome eterno de Deus. Ele é autoexistente, imutável, eterno, auto-suficiente. Não deriva seu ser de ninguém; ele é a fonte de todo ser. 'EU SOU' — presente contínuo, indicando que Deus é sempre o mesmo, ontem, hoje e eternamente. Em Cristo, este nome é reivindicado: 'Antes que Abraão existisse, EU SOU'." },
  ],
  "Êxodo 12:13": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "O sangue do cordeiro pascal é um tipo claro de Cristo, o Cordeiro de Deus. Quando Deus vê o sangue, passa por cima. A salvação não é pelo mérito, mas pelo sangue. Onde o sangue é aplicado pela fé, a ira de Deus passa. A Páscoa é um memorial que aponta para a cruz, onde o verdadeiro Cordeiro de Deus foi imolado." },
  ],
  "Êxodo 20:3": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "O primeiro mandamento — não terás outros deuses diante de mim. Deus reclama para si o primeiro e o melhor lugar. Nenhum rival pode dividir seu trono. Este mandamento exige devoção exclusiva. O pecado mais fundamental é o orgulho e a independência que colocam algo no lugar de Deus." },
  ],
  "Levítico 19:18": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Amarás o teu próximo como a ti mesmo. Este é o segundo grande mandamento, segundo Jesus. O amor ao próximo é a evidência do amor a Deus. Como a ti mesmo — naturalmente nos amamos, cuidamos de nós, protegemo-nos. Assim devemos amar os outros. Este amor prático é o cumprimento da lei." },
  ],
  "Números 6:24": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "A bênção sacerdotal é uma fonte de conforto inesgotável. O Senhor te abençoe e te guarde — proteção. O Senhor faça resplandecer o seu rosto sobre ti — favor. O Senhor sobre ti levante o seu rosto — intimidade. E te dê a paz — a plenitude de todo bem. Cada pessoa da Trindade está envolvida nesta bênção." },
  ],
  "Deuteronômio 6:4": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Ouve, Israel: o Senhor nosso Deus é o único Senhor. O Shema é a grande confissão de fé de Israel. A unicidade de Deus é a verdade fundamental da revelação. Amarás o Senhor teu Deus de todo o teu coração, de toda a tua alma e de todo o teu poder. O amor a Deus deve ser total, abrangendo cada aspecto do ser." },
  ],
  "Josué 1:9": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Esforça-te e tem bom ânimo; não pasmes, nem te espantes, porque o Senhor teu Deus é contigo por onde quer que andares. A presença de Deus é o fundamento da coragem. Josué enfrentou uma tarefa imensa, mas a promessa de Deus era maior. O mesmo Deus que estava com Moisés está conosco. A coragem cristã nasce da confiança na presença divina." },
  ],
  "1 Samuel 15:22": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Eis que o obedecer é melhor do que o sacrificar. Deus não se agrada de rituais vazios. A obediência à sua palavra vale mais que todos os holocaustos. Saul aprendeu esta lição tarde demais. Deus quer o coração, não apenas a cerimônia. A teimosia e a rebelião são como o pecado de feitiçaria." },
  ],
  "2 Samuel 7:16": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "A aliança davídica é o fundamento da esperança messiânica. Deus prometeu a Davi um trono eterno. Esta promessa se cumpriu em Jesus Cristo, o Filho de Davi, cujo reino não terá fim. A fidelidade de Deus às suas promessas é a âncora da nossa esperança." },
  ],
  "1 Reis 8:27": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Salomão, na dedicação do templo, reconhece que os céus dos céus não podem conter a Deus. O templo não é uma habitação para Deus, mas um lugar de encontro entre Deus e seu povo. Deus é transcendente — não pode ser limitado a um edifício. No entanto, ele se inclina para ouvir as orações de seu povo." },
  ],
  "Salmos 1:1": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Bem-aventurado o homem que não anda segundo o conselho dos ímpios. A bem-aventurança começa com a negação — o que evitamos. O caminho do justo é negativo (o que não faz) e positivo (o que ama: a lei do Senhor). A prosperidade do justo é como árvore plantada junto a ribeiros de águas: firme, frutífera, perene." },
  ],
  "Salmos 23:1": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "O Senhor é o meu Pastor; nada me faltará. O salmo mais amado da Bíblia começa com uma relação pessoal: 'meu Pastor'. Davi era pastor e sabia o que um bom pastor faz: guiar, prover, proteger. Cristo é o Bom Pastor que dá a vida pelas ovelhas. Esta confiança pessoal é a fonte da paz que permeia todo o salmo." },
    { autor: "Charles Spurgeon", titulo: "Comentário", conteudo: "Este salmo é uma pérola, e sua doçura é inexprimível. Cada palavra brilha como uma gema. 'O Senhor é o meu Pastor' — eis o título principal, do qual fluem todas as bênçãos subsequentes. Se o Senhor é meu Pastor, então certamente nada me faltará de tudo o que é verdadeiramente bom." },
  ],
  "Salmos 51:10": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Cria em mim, ó Deus, um coração puro. Davi, após seu pecado, anseia pela renovação espiritual. Ele não pede apenas perdão, mas transformação. 'Cria' — bara, o mesmo verbo da criação original. Só Deus pode criar um coração novo. O arrependimento genuíno busca não apenas o perdão, mas a pureza interior." },
  ],
  "Salmos 119:105": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho. A palavra de Deus é suficiente para guiar-nos na vida. Ilumina o caminho para que não tropecemos. Não é uma luz de holofote que mostra todo o futuro, mas uma lâmpada que ilumina o próximo passo. Caminhamos por fé, não por vista, guiados pela palavra." },
  ],
  "Provérbios 1:7": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "O temor do Senhor é o princípio da sabedoria. A verdadeira sabedoria não começa com o intelecto, mas com a reverência a Deus. O temor não é medo servil, mas amor reverente e submissão. Os insensatos desprezam a sabedoria e a instrução. A porta de entrada para o conhecimento real é o temor de Deus." },
  ],
  "Provérbios 3:5": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Confia no Senhor de todo o teu corão, e não te estribes no teu próprio entendimento. A confiança em Deus deve ser total, não parcial. Nosso entendimento é limitado e falho; o de Deus é perfeito. Reconhece-o em todos os teus caminhos — viver em constante dependência de Deus é o caminho da direção divina." },
  ],
  "Isaías 7:14": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Eis que a virgem conceberá e dará à luz um filho, e lhe chamará Emanuel, 'Deus conosco'. Esta profecia, cumprida em Jesus, é uma das mais preciosas do Antigo Testamento. Deus prometeu um sinal: o nascimento virginal do Messias. Emanuel — Deus conosco — é o nome que resume o Evangelho. Em Cristo, Deus habitou entre nós." },
  ],
  "Isaías 9:6": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Porque um menino nos nasceu, um filho se nos deu. O governo está sobre seus ombros. Seus nomes revelam sua natureza divina: Maravilhoso, Conselheiro, Deus Forte, Pai da Eternidade, Príncipe da Paz. Cada nome é uma promessa. Ele é Deus Forte — plenamente divino. Príncipe da Paz — o reino messiânico é um reino de paz." },
  ],
  "Isaías 53:5": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Ele foi ferido pelas nossas transgressões, moído pelas nossas iniquidades. O castigo que nos traz a paz estava sobre ele, e por suas pisaduras fomos sarados. Este é o coração do Evangelho: o sofrimento vicário do Servo. Cristo levou nossos pecados em seu corpo no madeiro. A cura da nossa alma veio através de suas feridas." },
    { autor: "Charles Spurgeon", titulo: "Comentário", conteudo: "Aqui está o sangue da nova aliança, o preço da nossa redenção. Cada palavra deste versículo é carregada de significado: ferido, moído, castigo, pisaduras. Ele foi moído como grão no moinho da ira divina, para que nós pudéssemos ser pão para a vida eterna." },
  ],
  "Isaías 55:1": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Ó vós, todos os que tendes sede, vinde às águas. O convite do Evangelho é universal e gratuito. Não há dinheiro, não há preço — a salvação é pela graça. A sede espiritual é a condição para receber. Quem tem sede pode vir. A água da vida é gratuita para todos. Este é o chamado misericordioso de Deus a uma humanidade sedenta." },
  ],
  "Isaías 61:1": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "O Espírito do Senhor Deus está sobre mim. Jesus aplicou esta passagem a si mesmo na sinagoga de Nazaré. O Espírito Santo ungiu Cristo para pregar boas novas aos pobres, curar os quebrantados, proclamar liberdade aos cativos. Esta é a declaração de missão do Messias, o manifesto do Reino de Deus." },
  ],
  "Jeremias 29:11": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Porque eu bem sei os pensamentos que penso de vós, diz o Senhor: pensamentos de paz e não de mal, para vos dar o fim que esperais. Deus tem um plano bom para seu povo, mesmo no exílio. Os pensamentos de Deus para nós são de paz, não de calamidade. A soberania de Deus opera em todas as circunstâncias para o bem daqueles que o amam." },
  ],
  "Ezequiel 36:26": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Dar-vos-ei um coração novo e porei dentro de vós um espírito novo. Esta é a promessa da nova aliança, a regeneração pelo Espírito Santo. O coração de pedra — insensível, duro, resistente — será removido. O coração de carne — sensível, vivo, responsivo — será dado. Deus não apenas reforma o exterior, mas transforma o interior." },
  ],
  "Daniel 3:17": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Eis que o nosso Deus a quem nós servimos pode nos livrar. A fé dos três jovens é exemplar: eles confiam no poder de Deus para livrar, mas também na soberania de Deus se ele não livrar. 'Se não' — a fé não depende das circunstâncias. Deus é digno de adoração independentemente de sua intervenção. Esta é a fé que vence o mundo." },
  ],
  "Oseias 6:6": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Pois misericórdia quero, e não sacrifício, e o conhecimento de Deus, mais do que holocaustos. Deus prefere o coração ao ritual. O amor leal e o conhecimento pessoal de Deus valem mais que todos os holocaustos. Jesus citou este versículo para ensinar que a compaixão é mais importante que a cerimônia." },
  ],
  "Miqueias 6:8": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Ele te declarou, ó homem, o que é bom; e que é o que o Senhor pede de ti: que pratiques a justiça, ames a misericórdia e andes humildemente com o teu Deus. Três grandes exigências: justiça nas relações sociais, misericórdia para com os necessitados e humildade diante de Deus. A religião verdadeira é prática, compassiva e humilde." },
  ],
  "Malaquias 3:10": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Trazei todos os dízimos à casa do tesouro. Deus desafia seu povo a prová-lo: 'Vede se não vos abrirei as janelas do céu'. A mordomia é um ato de fé. Honrar a Deus com os bens traz bênção abundante. A promessa de Deus é generosa; ele não pode ser superado em generosidade." },
  ],
  "Mateus 5:3": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Bem-aventurados os pobres de espírito, porque deles é o reino dos céus. As bem-aventuranças descrevem o caráter do cidadão do Reino. Pobre de espírito não significa covarde, mas humilde — aquele que reconhece sua total dependência de Deus. Os humildes herdam o Reino, enquanto os soberbos são excluídos." },
    { autor: "John Wesley", titulo: "Comentário", conteudo: "Pobres de espírito são aqueles que se esvaziam de si mesmos, que não confiam em sua própria justiça, que são humildes diante de Deus. O Reino pertence a eles porque eles não confiam em riquezas ou méritos próprios." },
  ],
  "Mateus 5:44": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Amai os vossos inimigos e orai pelos que vos perseguem. Esta é a ética suprema do Reino. O amor de Deus é perfeito: ele faz nascer o sol sobre maus e bons. O discípulo de Cristo deve refletir esse amor. Não é vingança ou ódio que vence o mal, mas o amor sacrificial." },
  ],
  "Mateus 6:9": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Portanto, vós orareis assim: Pai nosso que estás nos céus, santificado seja o teu nome. O Pai-Nosso é o modelo da oração cristã. Começa com a adoração, reconhecendo Deus como Pai — uma relação de intimidade e confiança. Santificado seja o teu nome — a oração deve buscar primeiro a glória de Deus." },
  ],
  "Mateus 11:28": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei. Este é o convite misericordioso de Cristo. O cansaço espiritual e o peso do pecado são a condição. Jesus promete alívio, não através da remoção de todo trabalho, mas através do jugo suave e do fardo leve. Em Cristo encontramos descanso para a alma." },
  ],
  "Mateus 22:37": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Amarás o Senhor teu Deus de todo o teu coração, e de toda a tua alma, e de todo o teu pensamento. Este é o primeiro e grande mandamento. O amor a Deus deve ser total — coração (emoções), alma (vontade) e pensamento (intelecto). Não há compartimentos na vida cristã; Deus deve ser amado com todo o nosso ser." },
  ],
  "Mateus 28:18": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Toda a autoridade me foi dada no céu e na terra. Portanto, ide, fazei discípulos de todas as nações. A Grande Comissão baseia-se na autoridade de Cristo. O discipulado é o coração da missão: não apenas converter, mas ensinar a obedecer. A promessa final — 'Eis que estou convosco todos os dias' — é o selo da comissão." },
  ],
  "Marcos 10:45": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Porque o Filho do Homem também não veio para ser servido, mas para servir e dar a sua vida em resgate de muitos. O Servo sofredor é o Rei. Jesus inverteu a pirâmide do poder: a grandeza no Reino é medida pelo serviço. O resgate foi pago — não a Satanás, mas à justiça divina. A vida de Cristo foi o preço da nossa libertação." },
  ],
  "Lucas 2:10": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Eis que vos trago boas novas de grande alegria, que será para todo o povo: é que hoje vos nasceu o Salvador, que é Cristo, o Senhor. O anúncio angelical aos pastores é o primeiro sermão do Natal. Boas novas, grande alegria, Salvador — estas palavras resumem o Evangelho. O nascimento de Cristo é a boa notícia que transforma a história." },
  ],
  "Lucas 15:11": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "A parábola do filho pródigo é o Evangelho dentro do Evangelho. Mostra o amor do Pai celestial que espera, que corre, que abraça, que restaura. O filho mais novo representa o pecador arrependido; o mais velho, o fariseu autojusto. O Pai é Deus, cujo amor é maior que nosso pecado. Ele nos recebe de braços abertos." },
  ],
  "Lucas 19:10": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Porque o Filho do Homem veio buscar e salvar o que se havia perdido. Esta é a declaração de missão de Jesus. Buscar — ele toma a iniciativa. Salvar — o objetivo é a redenção. O perdido — o alvo é o pecador. Zaqueu experimentou esta verdade: Jesus veio para sua casa e para sua salvação." },
  ],
  "João 1:1": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus. Este é o fundamento do Evangelho de João. O Verbo (Logos) é eterno — 'no princípio era'. É pessoal — 'estava com Deus'. É divino — 'era Deus'. A mesma palavra que criou o universo se fez carne e habitou entre nós. Cristo é a Palavra eterna de Deus, a expressão perfeita do Pai." },
    { autor: "John Calvin", titulo: "Comentário", conteudo: "João começa com a eternidade do Verbo para estabelecer sua divindade. Ele não começou a existir quando o Evangelho foi escrito; ele existia desde o princípio com Deus. E este Verbo é Deus — não inferior ao Pai, mas igual em essência e glória." },
  ],
  "João 1:14": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "E o Verbo se fez carne e habitou entre nós. O mistério mais profundo da fé cristã: Deus se fez homem. O Logos eterno assumiu a natureza humana. 'Habitou' — literalmente, 'armou sua tenda' entre nós. A glória divina foi vista na pessoa de Jesus — cheio de graça e verdade. A encarnação é o centro da história da redenção." },
  ],
  "João 3:16": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna. Este é o Evangelho em miniatura, o texto mais amado da Bíblia. O amor de Deus é a fonte — amor que dá, amor sacrificial. O Filho único foi dado. A condição é crer. O resultado é vida eterna. Deus não enviou seu Filho para condenar, mas para salvar." },
    { autor: "Charles Spurgeon", titulo: "Comentário", conteudo: "Este versículo é a Bíblia em miniatura. Contém o coração do Evangelho: o amor de Deus, o dom de Cristo, o chamado à fé e a promessa da vida eterna. Se todo o texto se perdesse e este versículo permanecesse, ainda teríamos boas novas suficientes para a salvação." },
    { autor: "John Wesley", titulo: "Comentário", conteudo: "Deus amou o mundo — não apenas os judeus, mas toda a humanidade. Este amor não foi provocado por mérito em nós, mas nasceu da própria natureza de Deus, que é amor. O dom do Filho é a expressão máxima desse amor." },
  ],
  "João 8:32": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "E conhecereis a verdade, e a verdade vos libertará. A verdade não é apenas uma proposição, mas uma Pessoa — Cristo é o caminho, a verdade e a vida. O conhecimento da verdade traz libertação: liberdade do pecado, da ignorância, da morte. A verdade de Cristo liberta a alma da escravidão espiritual." },
  ],
  "João 10:11": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Eu sou o bom Pastor; o bom Pastor dá a sua vida pelas ovelhas. Jesus é o pastor que ama, protege, guia e morre por suas ovelhas. Ao contrário do mercenário que foge quando o perigo vem, Cristo enfrenta o lobo. Ele conhece suas ovelhas individualmente. O pastor dá a vida — voluntariamente, sacrificialmente, amorosamente." },
  ],
  "João 14:6": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Eu sou o caminho, e a verdade, e a vida. Ninguém vem ao Pai senão por mim. Jesus é o caminho — não um caminho, mas o único caminho. Ele é a verdade — a realidade que dissipa toda ilusão. Ele é a vida — a fonte da vida eterna. A exclusividade de Cristo é clara: ninguém vem ao Pai senão por ele." },
  ],
  "João 15:5": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Eu sou a videira, vós as varas. Quem permanece em mim, e eu nele, dá muito fruto. Sem mim nada podeis fazer. A união com Cristo é a fonte da vida espiritual. A vara não pode frutificar por si mesma; depende inteiramente da videira. A vida cristã é de dependência total de Cristo. Separados dele, somos estéreis." },
  ],
  "Atos 1:8": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Mas recebereis poder, ao descer sobre vós o Espírito Santo, e sereis minhas testemunhas. O poder do Espírito é para testemunho. A igreja não começa com o poder humano, mas com o poder divino. Jerusalém, Judéia, Samaria, confins da terra — o testemunho se expande em círculos concêntricos. O Pentecostes inverte Babel: as línguas dispersas são unidas no Evangelho." },
  ],
  "Atos 2:1": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "O Pentecostes é o nascimento da igreja. O Espírito Santo veio como vento impetuoso e línguas de fogo. Todos foram cheios do Espírito. As línguas representam o poder de comunicar o Evangelho a todas as nações. Pedro, que antes negara Cristo, agora prega com ousadia. O Pentecostes é a festa da colheita — a primeira colheita da igreja foi de três mil almas." },
  ],
  "Romanos 3:23": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Porque todos pecaram e destituídos estão da glória de Deus. O diagnóstico universal: cada pessoa, sem exceção, está sob o poder do pecado. Não há distinção entre judeu e gentio. 'Destituídos' — não apenas carentes, mas radicalmente privados da glória de Deus. Este versículo prepara o caminho para a solução gloriosa: a justificação pela graça." },
  ],
  "Romanos 5:8": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Deus prova o seu amor para conosco pelo fato de ter Cristo morrido por nós, sendo nós ainda pecadores. O amor de Deus não é uma resposta ao nosso mérito, mas à nossa miséria. 'Sendo nós ainda pecadores' — antes da conversão, antes do arrependimento, enquanto éramos inimigos, Cristo morreu por nós. Esta é a profundidade do amor divino." },
  ],
  "Romanos 6:23": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus nosso Senhor. O pecado merece o salário — justiça retributiva. A graça oferece o dom — generosidade imerecida. Morte é o que merecemos; vida eterna é o que recebemos. O contraste não poderia ser maior: salário vs. dom, morte vs. vida, merecimento vs. graça." },
  ],
  "Romanos 8:1": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Portanto, agora nenhuma condenação há para os que estão em Cristo Jesus. Este é o grito de liberdade do Evangelho. Não há condenação para aqueles que estão em Cristo. A justificação é completa. A dívida foi paga. O tribunal divino pronunciou a sentença: 'Inocente'. Não por mérito próprio, mas por causa da obra consumada de Cristo." },
  ],
  "Romanos 8:28": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito. 'Todas as coisas' — tanto as agradáveis quanto as dolorosas. 'Contribuem' — cooperam em harmonia. 'Para o bem' — nosso bem espiritual e eterno. 'Os que amam a Deus' — os que são chamados segundo seu propósito. A soberania de Deus opera em todas as circunstâncias." },
  ],
  "Romanos 8:31": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Se Deus é por nós, quem será contra nós? O argumento irrefutável: Deus está do nosso lado. Ele não poupou seu próprio Filho — que mais poderia negar? Justificação, intercessão, amor incondicional — estas são as certezas que fundamentam a segurança eterna do crente." },
  ],
  "Romanos 10:9": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Se com a tua boca confessares a Jesus como Senhor, e em teu coração creres que Deus o ressuscitou dos mortos, serás salvo. Confissão com a boca e fé no coração — estas são as duas marcas da salvação. A ressurreição é o fundamento da fé cristã. A confissão pública de Cristo é a evidência da fé interior." },
  ],
  "Romanos 12:1": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Rogo-vos, pois, irmãos, pela compaixão de Deus, que apresenteis os vossos corpos em sacrifício vivo, santo e agradável a Deus, que é o vosso culto racional. O culto verdadeiro não é ritual, mas oferta pessoal. Corpo — toda a nossa vida prática. Sacrifício vivo — em contraste com os sacrifícios mortos do AT. Culto racional — inteligente, consciente, deliberado." },
  ],
  "1 Coríntios 10:13": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Deus é fiel, o qual não permitirá que sejais tentados acima do que podeis suportar, mas com a tentação também proverá o livramento. A fidelidade de Deus é nossa garantia na tentação. Ele conhece nossos limites. A tentação não é desculpa para o pecado, pois Deus sempre provê uma saída. A provação é permitida, mas também controlada." },
  ],
  "1 Coríntios 13:4": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "O amor é paciente, é benigno; o amor não arde em ciúmes, não se ufana, não se ensoberbece. O amor é mais que sentimento — é conduta. Paciente — sofre longo tempo. Benigno — ativamente bom. Sem inveja, sem orgulho. Este amor é o fruto do Espírito, a marca do verdadeiro discípulo. O capítulo 13 é o hino do amor, o caminho mais excelente." },
    { autor: "John Wesley", titulo: "Comentário", conteudo: "A fé pode existir sem o amor, mas não é nada. A esperança pode existir sem o amor, mas não é nada. O amor é a plenitude da lei, a perfeição da religião. Todas as virtudes sem o amor são como corpo sem alma." },
  ],
  "2 Coríntios 5:17": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Se alguém está em Cristo, é nova criatura; as coisas antigas já passaram; eis que se fizeram novas. A conversão é uma nova criação — tão sobrenatural quanto a criação original. O passado de pecado é superado. O novo começo em Cristo é real e transformador. Não apenas reforma, mas regeneração. Em Cristo, somos recriados para uma vida nova." },
  ],
  "Gálatas 2:20": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Já estou crucificado com Cristo; e vivo, não mais eu, mas Cristo vive em mim. O cristão morreu com Cristo para a lei e para o pecado. A vida cristã não é autoesforço, mas Cristo vivendo através de nós. A fé é o canal pelo qual a vida de Cristo flui. Esta é a vida de união mística com Cristo: crucificados com ele, vivendo por ele." },
  ],
  "Gálatas 5:22": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Mas o fruto do Espírito é: amor, alegria, paz, longanimidade, benignidade, bondade, fidelidade, mansidão, domínio próprio. Contra estas coisas não há lei. O fruto é único — o Espírito produz todas estas virtudes como um todo integrado. Não são obras humanas, mas o resultado da presença do Espírito. Nove características que formam o caráter de Cristo em nós." },
  ],
  "Efésios 1:3": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Bendito o Deus e Pai de nosso Senhor Jesus Cristo, que nos abençoou com toda sorte de bênção espiritual nas regiões celestiais em Cristo. A salvação é do começo ao fim obra da Trindade. O Pai nos elegeu, o Filho nos redimiu, o Espírito nos selou. Bênção espiritual — não material, mas celestial. Em Cristo — toda bênção está em Cristo." },
  ],
  "Efésios 2:8": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Mas Deus, sendo rico em misericórdia, pelo muito amor com que nos amou, estando nós mortos em nossos delitos, nos deu vida juntamente com Cristo. Pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. A salvação é inteiramente pela graça. Nem obras, nem mérito. Deus tomou a iniciativa quando estávamos mortos — incapazes de contribuir." },
    { autor: "Charles Spurgeon", titulo: "Comentário", conteudo: "A graça é o único motivo da salvação. Não merecimento, não esforço humano, mas o favor imerecido de Deus. A fé é apenas o canal, não a causa. O dom é gratuito, ou não seria dom. Se por obras, não é graça; se por graça, não é por obras." },
  ],
  "Efésios 4:11": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Ele mesmo deu uns como apóstolos, outros como profetas, outros como evangelistas, e outros como pastores e mestres. Cristo, o Cabeça da igreja, concede dons ministeriais. Os ofícios são para o aperfeiçoamento dos santos, para a obra do ministério, para a edificação do corpo de Cristo. O ministério cristão não é invenção humana, mas doação divina." },
  ],
  "Efésios 6:10": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Revesti-vos de toda a armadura de Deus, para que possais estar firmes contra as ciladas do diabo. A vida cristã é um combate espiritual. Nossa luta não é contra carne e sangue, mas contra potestades espirituais. A armadura de Deus é a provisão divina para a guerra espiritual: verdade, justiça, evangelho, fé, salvação, palavra de Deus e oração." },
  ],
  "Filipenses 1:21": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Porque para mim o viver é Cristo, e o morrer é lucro. Paulo resume sua vida em uma frase. Cristo é o centro, o conteúdo e o propósito de sua existência. A morte não é perda, mas ganho — porque significa estar com Cristo. O cristão vive para Cristo e morre para estar com Cristo. Ambas as opções são boas; servir a Cristo na terra ou estar com Cristo no céu." },
  ],
  "Filipenses 2:5": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "De sorte que haja em vós o mesmo sentimento que houve em Cristo Jesus. A humildade de Cristo é o modelo para a igreja. Ele, sendo Deus, esvaziou-se, tomou a forma de servo, humilhou-se até a morte de cruz. Por isso Deus o exaltou soberanamente. O caminho para a exaltação é a humildade. A vida cristã é moldada pela cruz." },
  ],
  "Filipenses 4:13": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Tudo posso naquele que me fortalece. Paulo não estava dizendo que podia fazer qualquer coisa que quisesse, mas que podia enfrentar qualquer circunstância — fome ou fartura, abundância ou escassez — através da força que Cristo lhe dava. O contentamento cristão é aprendido através da dependência de Cristo. Em Cristo, temos força para todas as situações." },
  ],
  "Colossenses 1:15": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Ele é a imagem do Deus invisível, o primogênito de toda a criação. Cristo é a imagem visível do Deus invisível. Nele vemos o Pai. Ele é superior a toda a criação, pois todas as coisas foram criadas por ele e para ele. Ele é antes de todas as coisas, e nele tudo subsiste. A supremacia de Cristo é a doutrina central desta passagem." },
  ],
  "Colossenses 3:1": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Se, pois, fostes ressuscitados com Cristo, buscai as coisas que são de cima, onde Cristo está assentado à destra de Deus. A ressurreição espiritual com Cristo deve resultar em busca das realidades celestiais. Nossa vida está escondida com Cristo em Deus. A vida cristã é orientada para o alto, não para as coisas terrenas." },
  ],
  "1 Tessalonicenses 4:16": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "O Senhor mesmo descerá dos céus com alarido, com voz de arcanjo e com a trombeta de Deus; e os que morreram em Cristo ressuscitarão primeiro. A esperança da igreja é a volta de Cristo. A ressurreição dos mortos em Cristo, o arrebatamento dos vivos, o encontro com o Senhor nos ares — esta é a nossa consolação. Consolem-se uns aos outros com estas palavras." },
  ],
  "1 Timóteo 2:5": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Porque há um só Deus e um só Mediador entre Deus e os homens, Jesus Cristo homem. A unicidade de Deus e a unicidade do Mediador são fundamentos da fé cristã. Cristo é o único caminho ao Pai. Ele é plenamente homem para representar-nos, plenamente Deus para salvar-nos. Nenhum outro mediador é necessário." },
  ],
  "2 Timóteo 3:16": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção, para a educação na justiça. A inspiração divina é o fundamento da autoridade das Escrituras. 'Inspirada por Deus' — literalmente, soprada por Deus. A Escritura é útil para quatro propósitos: doutrina, repreensão, correção e instrução em justiça." },
  ],
  "Hebreus 1:1": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Havendo Deus, antigamente, falado muitas vezes e de muitas maneiras aos pais, pelos profetas, a nós falou-nos nestes últimos dias pelo Filho. A revelação progressiva de Deus culmina em Cristo. Os profetas falaram parcialmente; o Filho é a revelação completa. Cristo é superior aos profetas, aos anjos, a Moisés. Nele, Deus falou final e perfeitamente." },
  ],
  "Hebreus 4:12": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Porque a palavra de Deus é viva e eficaz, e mais cortante do que qualquer espada de dois gumes, e penetra até à divisão da alma e do espírito. A palavra de Deus não é letra morta, mas poder vivo. Ela discerne os pensamentos e intenções do coração. Nada está oculto diante dela. A palavra nos confronta, nos expõe, nos transforma." },
  ],
  "Hebreus 11:1": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "A fé é a certeza de coisas que se esperam, a convicção de fatos que se não veem. Fé não é credulidade cega, mas confiança fundamentada na fidelidade de Deus. Certeza — a substância do que esperamos. Convicção — a evidência do que não vemos. A fé dá realidade ao invisível e certeza ao futuro. Os heróis da fé viveram por esta confiança." },
    { autor: "Charles Spurgeon", titulo: "Comentário", conteudo: "A fé é a alma que vê o invisível, que ouve o inaudível, que crê no impossível. Ela é a substância — a realidade subjacente — das coisas esperadas. Sem fé é impossível agradar a Deus. A fé é o fundamento de toda a vida espiritual." },
  ],
  "Hebreus 12:1": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Portanto, nós também, pois que estamos rodeados de uma tão grande nuvem de testemunhas, deixemos todo o peso e o pecado que tão de perto nos rodeia, e corramos com perseverança a carreira que nos está proposta. A vida cristã é uma corrida de resistência. As testemunhas do capítulo 11 nos encorajam. Devemos deixar o peso das preocupações e o pecado. Olhando para Jesus, o autor e consumador da fé." },
  ],
  "Tiago 1:2": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Meus irmãos, tende por motivo de grande alegria o passardes por várias provações. A perspectiva cristã sobre o sofrimento é paradoxal: alegria na tribulação. A provação produz perseverança; a perseverança produz maturidade. A alegria não vem da dor em si, mas do resultado que ela produz. A fé testada torna-se fé fortalecida." },
  ],
  "Tiago 2:17": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Assim também a fé, se não tiver obras, é morta em si mesma. A fé verdadeira produz obras. Não somos salvos pelas obras, mas somos salvos para as obras. A fé sem obras é mera crença intelectual, que os demônios também têm. A fé de Abraão foi demonstrada por suas obras. A prova da fé genuína é uma vida transformada." },
  ],
  "1 Pedro 2:9": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Vós, porém, sois a geração eleita, o sacerdócio real, a nação santa, o povo adquirido, para que anuncieis as virtudes daquele que vos chamou das trevas para a sua maravilhosa luz. Quatro títulos gloriosos da igreja: eleita, real, santa, adquirida. Um propósito: proclamar o Evangelho. A identidade cristã é definida pelo chamado de Deus: das trevas para a luz." },
  ],
  "1 Pedro 5:7": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós. Deus se importa conosco. O convite é para lançar — ativamente, deliberadamente — todas as nossas preocupações sobre ele. Ansiedade é um fardo pesado demais para carregarmos sozinhos. O cuidado de Deus por nós é a razão da nossa confiança." },
  ],
  "1 João 1:9": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda a injustiça. A confissão é o caminho do perdão. Deus é fiel à sua promessa e justo com base na obra de Cristo. O perdão não é automático, mas prometido mediante confissão. A purificação é completa — de toda a injustiça." },
  ],
  "1 João 4:8": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Deus é amor. Não apenas Deus ama, mas ele é amor em sua essência. O amor não é um atributo entre outros; é a própria natureza de Deus. O amor de Deus foi manifestado no envio de seu Filho. Quem não ama não conhece a Deus. O amor é a prova do conhecimento genuíno de Deus." },
  ],
  "1 João 4:19": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Nós amamos porque ele nos amou primeiro. O amor humano a Deus é sempre resposta ao amor divino. Ele tomou a iniciativa. Antes de amarmos, fomos amados. Nosso amor a Deus e ao próximo é reflexo do amor que recebemos. A fonte do amor é Deus. Sem o amor dele, não podemos amar verdadeiramente." },
  ],
  "Apocalipse 1:8": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Eu sou o Alfa e o Ômega, o princípio e o fim, diz o Senhor, aquele que é, que era e que há de vir, o Todo-Poderoso. Cristo é o Senhor soberano da história. Alfa e Ômega — a primeira e última letras do alfabeto grego — indicam sua eternidade e abrangência. Ele é, era e há de vir — presente, passado e futuro são iguais para ele. Ele é o Todo-Poderoso — nada está além de seu controle." },
  ],
  "Apocalipse 3:20": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Eis que estou à porta e bato. Se alguém ouvir a minha voz e abrir a porta, entrarei em sua casa e cearei com ele, e ele comigo. Cristo bate pacientemente na porta do coração. A imagem é de intimidade e comunhão. Ele não arromba a porta; espera que abramos. A resposta é individual: 'se alguém'. A comunhão com Cristo é a maior bênção da vida cristã." },
  ],
  "Apocalipse 21:1": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Vi um novo céu e uma nova terra. Porque já o primeiro céu e a primeira terra passaram, e o mar já não existe. A consumação da redenção inclui a renovação da criação. Não aniquilação, mas transformação. A nova Jerusalém desce do céu, Deus habita com seu povo, toda lágrima é enxugada, a morte é vencida. Eis que faço novas todas as coisas." },
  ],
  "Apocalipse 22:12": [
    { autor: "Matthew Henry", titulo: "Comentário", conteudo: "Eis que venho sem demora. A minha recompensa está comigo para retribuir a cada um segundo as suas obras. A promessa da volta de Cristo encerra a Bíblia como um selo de esperança. Maranata — o Senhor vem. A resposta do crente é: 'Vem, Senhor Jesus'. A Bíblia termina com um convite e uma promessa: a graça do Senhor Jesus Cristo seja com todos." },
  ],
};

function getCommentaries(livro: string, capitulo: number, versiculo: number) {
  const key = `${livro} ${capitulo}:${versiculo}`;
  return COMMENTARIES[key] || [];
}

interface Livro {
  id: string;
  nome: string;
  slug: string;
  totalCapitulos: number;
  ordemGeral: number;
}

interface Versiculo {
  id: string;
  numero: number;
  texto: string;
  capituloNumero: number;
}

const BASE_KEY_TERMS: Record<string, { strong: string; original: string; type: "g" | "h"; def: string }> = {
  "Deus": { strong: "H430", original: "Elohim", type: "h", def: "Deus. Nome plural de majestade." },
  "Senhor": { strong: "H3068", original: "YHWH", type: "h", def: "O Senhor. Nome próprio de Deus." },
  "amor": { strong: "G26", original: "agape", type: "g", def: "Amor incondicional, amor sacrificial." },
  "fé": { strong: "G4100", original: "pistis", type: "g", def: "Fé, confiança, crença." },
  "graça": { strong: "G5485", original: "charis", type: "g", def: "Graça, favor imerecido." },
  "Jesus": { strong: "G2424", original: "Iesous", type: "g", def: "Jesus. Nome próprio do Salvador." },
  "Cristo": { strong: "G5547", original: "Christos", type: "g", def: "Cristo, Ungido." },
  "Espírito": { strong: "G4413", original: "pneuma", type: "g", def: "Espírito, sopro." },
  "salvação": { strong: "G4991", original: "soteria", type: "g", def: "Salvação, livramento." },
  "justiça": { strong: "G1343", original: "dikaiosyne", type: "g", def: "Justiça divina." },
  "santo": { strong: "G40", original: "hagios", type: "g", def: "Santo, separado para Deus." },
  "santidade": { strong: "G38", original: "hagios", type: "g", def: "Santo, separado para Deus." },
  "arrependimento": { strong: "G3341", original: "metanoia", type: "g", def: "Arrependimento, mudança de mente." },
  "evangelho": { strong: "G2098", original: "euangelion", type: "g", def: "Boa notícia, evangelho." },
  "igreja": { strong: "G1577", original: "ekklesia", type: "g", def: "Igreja, assembleia." },
  "apóstolo": { strong: "G652", original: "apostolos", type: "g", def: "Apóstolo, enviado." },
  "profeta": { strong: "G4396", original: "prophetes", type: "g", def: "Profeta, porta-voz de Deus." },
  "pecado": { strong: "G266", original: "hamartia", type: "g", def: "Pecado, errar o alvo." },
  "morte": { strong: "G2288", original: "thanatos", type: "g", def: "Morte." },
  "vida": { strong: "G2222", original: "zoe", type: "g", def: "Vida, vida eterna." },
  "luz": { strong: "G5457", original: "phos", type: "g", def: "Luz." },
  "verdade": { strong: "G225", original: "aletheia", type: "g", def: "Verdade." },
  "paz": { strong: "G1515", original: "eirene", type: "g", def: "Paz." },
  "alegria": { strong: "G5479", original: "chara", type: "g", def: "Alegria, gozo." },
  "esperança": { strong: "G1680", original: "elpis", type: "g", def: "Esperança." },
  "criar": { strong: "H1254", original: "bara", type: "h", def: "Criar. Criação divina." },
  "conhecer": { strong: "H3045", original: "yada", type: "h", def: "Conhecer, ter relação íntima." },
  "andar": { strong: "H1981", original: "halak", type: "h", def: "Andar, caminhar." },
  "ouvir": { strong: "H8085", original: "shama", type: "h", def: "Ouvir, obedecer." },
  "dar": { strong: "H5414", original: "natan", type: "h", def: "Dar, conceder." },
  "abençoar": { strong: "H1288", original: "barak", type: "h", def: "Abençoar, elogiar." },
  "servir": { strong: "H183", original: "abad", type: "h", def: "Servir, adorar." },
  "lembrar": { strong: "H2142", original: "zakar", type: "h", def: "Lembrar, mencionar." },
  "salvar": { strong: "H3467", original: "yasha", type: "h", def: "Salvar, livrar." },
  "curar": { strong: "H7495", original: "rapha", type: "h", def: "Curar, restaurar." },
  "misericórdia": { strong: "H2617", original: "chesed", type: "h", def: "Graça, amor leal covenantal." },
  "justificar": { strong: "H6663", original: "tsadaq", type: "h", def: "Justificar, declarar justo." },
  "Torá": { strong: "H8451", original: "torah", type: "h", def: "Lei, instrução divina." },
  "sopro": { strong: "H7307", original: "ruach", type: "h", def: "Espírito, vento, sopro." },
  "alma": { strong: "H5315", original: "nephesh", type: "h", def: "Alma, ser, vida." },
  "pecar": { strong: "G264", original: "hamartano", type: "g", def: "Pecar, errar o alvo." },
  "ressurreição": { strong: "G386", original: "anastasis", type: "g", def: "Ressurreição." },
  "redenção": { strong: "G629", original: "apolytrosis", type: "g", def: "Redenção, libertação." },
  "perdão": { strong: "G859", original: "aphesis", type: "g", def: "Perdão, remissão." },
  "reino": { strong: "G932", original: "basileia", type: "g", def: "Reino de Deus." },
  "rei": { strong: "G935", original: "basileus", type: "g", def: "Rei, soberano." },
  "anjo": { strong: "G32", original: "angelos", type: "g", def: "Anjo, mensageiro celestial." },
  "batismo": { strong: "G908", original: "baptisma", type: "g", def: "Batismo." },
  "batizar": { strong: "G907", original: "baptizo", type: "g", def: "Batizar, imergir." },
  "pão": { strong: "G740", original: "artos", type: "g", def: "Pão, alimento." },
  "sacerdote": { strong: "G2409", original: "hiereus", type: "g", def: "Sacerdote." },
  "templo": { strong: "G2411", original: "hieron", type: "g", def: "Templo." },
  "lei": { strong: "G3551", original: "nomos", type: "g", def: "Lei." },
  "oração": { strong: "G4335", original: "proseuche", type: "g", def: "Oração." },
  "profecia": { strong: "G4394", original: "propheteia", type: "g", def: "Profecia." },
  "sabedoria": { strong: "G4678", original: "sophia", type: "g", def: "Sabedoria." },
  "poder": { strong: "G1411", original: "dynamis", type: "g", def: "Poder, força." },
  "glória": { strong: "G1391", original: "doxa", type: "g", def: "Glória." },
  "consciência": { strong: "G4893", original: "syneidesis", type: "g", def: "Consciência." },
  "diabo": { strong: "G1228", original: "diabolos", type: "g", def: "Diabo, acusador." },
  "Satanás": { strong: "G4567", original: "Satanas", type: "g", def: "Satanás, adversário." },
  "céu": { strong: "G3772", original: "ouranos", type: "g", def: "Céu." },
  "terra": { strong: "H776", original: "eretz", type: "h", def: "Terra, país, solo." },
  "homem": { strong: "H120", original: "adam", type: "h", def: "Homem, humanidade." },
  "filho": { strong: "H1121", original: "ben", type: "h", def: "Filho." },
  "mão": { strong: "H3027", original: "yad", type: "h", def: "Mão, poder." },
  "dia": { strong: "H3117", original: "yom", type: "h", def: "Dia." },
  "palavra": { strong: "H1697", original: "davar", type: "h", def: "Palavra, mandamento." },
  "caminho": { strong: "H1870", original: "derekh", type: "h", def: "Caminho." },
  "bondade": { strong: "H2896", original: "tov", type: "h", def: "Bom, bondade." },
  "fogo": { strong: "H784", original: "esh", type: "h", def: "Fogo." },
  "irmão": { strong: "H251", original: "ach", type: "h", def: "Irmão." },
  "casa": { strong: "H1004", original: "bayit", type: "h", def: "Casa, lar." },
  "coração": { strong: "H3820", original: "lev", type: "h", def: "Coração." },
  "bênção": { strong: "H1293", original: "berakah", type: "h", def: "Bênção." },
  "noite": { strong: "H3915", original: "layil", type: "h", def: "Noite." },
  "justo": { strong: "H6662", original: "tsaddiq", type: "h", def: "Justo." },
  "sacrifício": { strong: "H2077", original: "zebach", type: "h", def: "Sacrifício." },
  "cântico": { strong: "H7892", original: "shir", type: "h", def: "Cântico." },
  "livro": { strong: "H5612", original: "sefer", type: "h", def: "Livro, rolo." },
  "mar": { strong: "H3220", original: "yam", type: "h", def: "Mar." },
  "olho": { strong: "H5869", original: "ayin", type: "h", def: "Olho." },
  "boca": { strong: "H6310", original: "peh", type: "h", def: "Boca." },
  "cidade": { strong: "H5892", original: "ir", type: "h", def: "Cidade." },
  "monte": { strong: "H2022", original: "har", type: "h", def: "Monte, montanha." },
  "povo": { strong: "H5971", original: "am", type: "h", def: "Povo." },
  "nação": { strong: "H1471", original: "goy", type: "h", def: "Nação, gentio." },
  "sangue": { strong: "H1818", original: "dam", type: "h", def: "Sangue." },
  "água": { strong: "H4325", original: "mayim", type: "h", def: "Água." },
  "véu": { strong: "H6532", original: "porekhet", type: "h", def: "Véu." },
  "adoração": { strong: "H7812", original: "shachah", type: "h", def: "Adorar, prostrar-se." },
  "renovar": { strong: "H2318", original: "chadash", type: "h", def: "Renovar, restaurar." },
  "revelação": { strong: "G602", original: "apokalypsis", type: "g", def: "Revelação." },
  "perdoar": { strong: "G863", original: "aphiemi", type: "g", def: "Perdoar, deixar." },
  "testemunho": { strong: "G3142", original: "martyria", type: "g", def: "Testemunho." },
  "iniquidade": { strong: "G458", original: "anomia", type: "g", def: "Iniquidade." },
  "conhecimento": { strong: "G1108", original: "gnosis", type: "g", def: "Conhecimento." },
  "verdadeiro": { strong: "G228", original: "alethinos", type: "g", def: "Verdadeiro, genuíno." },
  "videira": { strong: "G288", original: "ampelos", type: "g", def: "Videira." },
  "restaurar": { strong: "G600", original: "apokathistemi", type: "g", def: "Restaurar." },
};

const KEY_TERMS: Record<string, { strong: string; original: string; type: "g" | "h"; def: string }> = (() => {
  const terms = { ...BASE_KEY_TERMS };
  LEXICON_DATA.forEach(entry => {
    const words: string[] = [];
    entry.definicaoCurta.split(",").forEach(w => words.push(w.trim()));
    (entry.significado || []).forEach(w => words.push(w.trim()));
    words.forEach(word => {
      if (word && word.length > 1 && !terms[word]) {
        terms[word] = {
          strong: entry.strong,
          original: entry.lemma,
          type: entry.idioma === "grego" ? "g" : "h",
          def: entry.definicaoCurta,
        };
      }
    });
  });
  return terms;
})();

const KEY_PEOPLE: Record<string, string> = {
  "Abraão": "Pai dos crentes. Chamado por Deus para sair de Ur.",
  "Isaque": "Filho da promessa de Abraão e Sara.",
  "Jacó": "Pai das 12 tribos de Israel.",
  "José": "Vendido como escravo, tornou-se governador do Egito.",
  "Moisés": "Liberador de Israel do Egito. Recebeu os Dez Mandamentos.",
  "Davi": "Segundo rei de Israel. Homem segundo o coração de Deus.",
  "Salomão": "Filho de Davi. Construiu o Templo. Sábio.",
  "Elias": "Profeta que desafiou os profetas de Baal.",
  "Pedro": "Líder dos apóstolos. Primeiro a confessar Jesus.",
  "Paulo": "Apóstolo dos gentios. Escreveu 13 epístolas.",
  "João": "Apóstolo amado. Autor do Evangelho de João e Apocalipse.",
  "Maria": "Mãe de Jesus. Virgem concebeu pelo Espírito Santo.",
  "Daniel": "Judeu exilado na Babilônia. Intérprete de sonhos.",
  "Jonas": "Profeta que fugiu de Deus. Engolido por um grande peixe.",
  "Rute": "Moabita leal. Avó de Davi.",
  "Ester": "Rainha persa que salvou os judeus.",
  "Jó": "Homem justo que sofreu enormemente.",
  "Isaías": "Grande profeta. Profetizou a vinda do Messias.",
  "Jeremias": "Profeta das nações. Chorou sobre Jerusalém.",
  "Noé": "Justo que encontrou graça. Construiu a arca.",
  "Samuel": "Profeta e juiz. Ungiu os primeiros reis de Israel.",
  "Josué": "Sucessor de Moisés. Conduziu Israel à Terra Prometida.",
  "Gideão": "Juiz que libertou Israel dos midianitas com 300 homens.",
  "Sansão": "Juiz de força sobrenatural. Consagrado a Deus.",
  "Lázaro": "Amigo de Jesus. Ressuscitado dentre os mortos.",
  "Timóteo": "Jovem discípulo e companheiro de Paulo.",
  "Tiago": "Líder da igreja de Jerusalém. Autor da epístola.",
  "Marcos": "Evangelista. Autor do Evangelho de Marcos.",
  "Lucas": "Médico amado. Autor do Evangelho de Lucas e Atos.",
  "Mateus": "Publicano chamado por Jesus. Escreveu o Evangelho.",
};

const KEY_LOCATIONS: Record<string, string> = {
  "Jerusalém": "Cidade santa de Israel, sede do Templo.",
  "Belém": "Cidade natal de Jesus. Terra de Davi.",
  "Nazaré": "Cidade onde Jesus cresceu.",
  "Galileia": "Região onde Jesus ministrou intensamente.",
  "Egito": "Império onde Israel foi escravizado.",
  "Sinai": "Montanha onde Moisés recebeu a Lei.",
  "Jordão": "Rio onde Jesus foi batizado.",
  "Samaria": "Região central de Israel. Mista entre judeus e gentios.",
  "Cafarnaum": "Base ministerial de Jesus na Galileia.",
  "Getsêmani": "Jardim onde Jesus orou antes da crucificação.",
  "Calvário": "Local da crucificação de Jesus. Gólgota.",
  "Roma": "Capital do Império Romano.",
  "Damasco": "Cidade onde Paulo se converteu.",
  "Éfeso": "Cidade importante na Ásia Menor. Igreja de Paulo.",
  "Corinto": "Cidade grega importante. Igreja fundada por Paulo.",
  "Babilônia": "Império que exilou Judá. Símbolo de opressão.",
  "Tiro": "Cidade fenícia. Julgada pelos profetas.",
  "Sodoma": "Cidade destruída por fogo. Símbolo de juízo divino.",
  "Betânia": "Aldeia onde Lázaro, Marta e Maria viviam.",
  "Jericó": "Cidade das palmeiras. Primeira conquista de Josué.",
  "Canaã": "Terra prometida por Deus a Abraão.",
  "Sião": "Colina de Jerusalém. Símbolo da presença de Deus.",
  "Armagedom": "Local da batalha final. Monte Megido.",
  "Patmos": "Ilha onde João recebeu o Apocalipse.",
  "Antioquia": "Cidade onde os discípulos foram chamados cristãos.",
  "Filipos": "Cidade macedônia. Primeira igreja na Europa.",
  "Atenas": "Centro cultural grego. Paulo pregou no Areópago.",
  "Gólgota": "Lugar da Caveira. Onde Jesus foi crucificado.",
};

function getLexiconByWord(word: string): LexiconEntry | undefined {
  const lower = word.toLowerCase();
  for (const entry of LEXICON_DATA) {
    if (entry.definicaoCurta.toLowerCase() === lower) return entry;
    if (entry.significado?.some(s => s.toLowerCase() === lower)) return entry;
  }
  return undefined;
}

function getOriginalWords(texto: string, isNT: boolean): { portugues: string; original: string; transliteracao: string; strong: string }[] {
  const palavras = texto.split(/\s+/);
  return palavras.map(p => {
    const limpa = p.replace(/[.,;:!?"'()—–-]/g, "").toLowerCase();
    const entry = LEXICON_DATA.find(e => e.definicaoCurta.toLowerCase() === limpa || e.significado?.some(s => s.toLowerCase() === limpa));
    if (entry && ((isNT && entry.idioma === "grego") || (!isNT && entry.idioma === "hebraico"))) {
      return { portugues: p, original: entry.lemma, transliteracao: entry.transliteracao, strong: entry.strong };
    }
    const term = KEY_TERMS[limpa.charAt(0).toUpperCase() + limpa.slice(1)] || KEY_TERMS[limpa];
    if (term && ((isNT && term.type === "g") || (!isNT && term.type === "h"))) {
      return { portugues: p, original: term.original, transliteracao: "", strong: term.strong };
    }
    return { portugues: p, original: "", transliteracao: "", strong: "" };
  });
}

function analyzeWords(texto: string): { palavra: string; entry?: LexiconEntry; term?: typeof KEY_TERMS[string] }[] {
  const palavras = texto.split(/\s+/);
  return palavras.map(p => {
    const limpa = p.replace(/[.,;:!?"'()—–-]/g, "").toLowerCase();
    const cap = limpa.charAt(0).toUpperCase() + limpa.slice(1);
    const term = KEY_TERMS[cap] || KEY_TERMS[limpa];
    const entry = getLexiconByWord(limpa);
    return { palavra: p, entry, term };
  });
}

function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("bs-favs") || "[]"); } catch { return []; }
}

function toggleFavorite(ref: string) {
  const favs = getFavorites();
  const idx = favs.indexOf(ref);
  if (idx >= 0) favs.splice(idx, 1);
  else favs.push(ref);
  localStorage.setItem("bs-favs", JSON.stringify(favs));
  return favs;
}

const studyTabs = ["Referências", "Original", "Análise", "Comentários"] as const;
type TabType = (typeof studyTabs)[number];

export default function BibliaPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [livroSel, setLivroSel] = useState<Livro | null>(null);
  const [capSel, setCapSel] = useState(1);
  const [versiculos, setVersiculos] = useState<Versiculo[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [termoSel, setTermoSel] = useState<any>(null);
  const [versSel, setVersSel] = useState<any>(null);
  const [sidebar, setSidebar] = useState<"livros" | "lexico" | "estudo">("livros");
  const [interlinear, setInterlinear] = useState(false);
  const [versiculosOrig, setVersiculosOrig] = useState<string[]>([]);
  const [carregandoOrig, setCarregandoOrig] = useState(false);
  const [busca, setBusca] = useState("");
  const [traducoes, setTraducoes] = useState<any[]>([]);
  const [estudoTab, setEstudoTab] = useState<TabType>("Referências");
  const [copied, setCopied] = useState(false);
  const [favoritos, setFavoritos] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/v1/biblia/livros")
      .then(r => r.json())
      .then(data => setLivros(Array.isArray(data) ? data : []))
      .catch(() => {});
    fetch("/api/v1/biblia/traducoes")
      .then(r => r.json())
      .then(data => setTraducoes(Array.isArray(data) ? data : []))
      .catch(() => {});
    setFavoritos(getFavorites());
  }, []);

  const carregarCapitulo = useCallback(async (livro: Livro, cap: number) => {
    setCarregando(true);
    try {
      const res = await fetch(`/api/v1/biblia/livros/${livro.id}/capitulos/${cap}`);
      const data = await res.json();
      setVersiculos(Array.isArray(data.versiculos) ? data.versiculos : Array.isArray(data) ? data : []);
    } catch { setVersiculos([]); }
    setCarregando(false);
  }, []);

  useEffect(() => {
    if (livroSel) carregarCapitulo(livroSel, capSel);
  }, [livroSel, capSel, carregarCapitulo]);

  // Fetch original text for interlinear mode
  useEffect(() => {
    if (!livroSel || !interlinear) { setVersiculosOrig([]); return; }
    const ntBook = livroSel.ordemGeral > 39;
    setCarregandoOrig(true);
    const translation = ntBook ? "TR" : "WLC";
    const bookId = getBookId(livroSel.nome);
    if (!bookId) { setCarregandoOrig(false); return; }
    fetch(`https://bolls.life/get-chapter/${translation}/${bookId}/${capSel}/`)
      .then(r => r.json())
      .then(data => {
        setVersiculosOrig(Array.isArray(data)
          ? data.map((v: any) => typeof v === "string" ? v.trim() : v?.text ?? "")
          : []);
        setCarregandoOrig(false);
      })
      .catch(() => { setVersiculosOrig([]); setCarregandoOrig(false); });
  }, [livroSel, capSel, interlinear]);

  function selecionarLivro(livro: Livro) {
    setLivroSel(livro);
    setCapSel(1);
    setTermoSel(null);
    setVersSel(null);
    setSidebar("estudo");
  }

  const isNT = useMemo(() => {
    if (!livroSel) return true;
    return livroSel.ordemGeral > 39;
  }, [livroSel]);

  function processarTexto(texto: string) {
    const palavras = texto.split(/(\s+|[.,;:!?"'()—–-])/);
    return palavras.map((p, i) => {
      const limpa = p.replace(/[.,;:!?"'()—–-]/g, "");
      const termo = KEY_TERMS[limpa];
      const pessoa = KEY_PEOPLE[limpa];
      const local = KEY_LOCATIONS[limpa];

      if (termo) {
        if (interlinear) {
          return (
            <span key={i} className="inline-flex flex-col items-center mx-0.5 group/inter align-top">
              <span className="text-[9px] font-mono text-primary font-semibold leading-tight">{termo.original}</span>
              <span className="text-[8px] text-muted-foreground leading-tight">{termo.strong}</span>
              <span
                onClick={(e) => { e.stopPropagation(); setTermoSel({ tipo: "termo", ...termo, palavra: limpa }); }}
                className="cursor-pointer text-primary underline decoration-dotted hover:bg-primary/10 rounded px-0.5 transition-colors text-[13px] leading-tight"
                title={`${termo.original} (${termo.strong})`}
              >{p}</span>
            </span>
          );
        }
        return (
          <span
            key={i}
            onClick={(e) => { e.stopPropagation(); setTermoSel({ tipo: "termo", ...termo, palavra: limpa }); }}
            className="cursor-pointer text-primary underline decoration-dotted hover:bg-primary/10 rounded px-0.5 transition-colors"
            title={`${termo.original} (${termo.strong})`}
          >
            {p}
          </span>
        );
      }
      if (pessoa) {
        return (
          <span
            key={i}
            onClick={(e) => { e.stopPropagation(); setTermoSel({ tipo: "pessoa", nome: limpa, desc: pessoa }); }}
            className="cursor-pointer text-blue-600 dark:text-blue-400 underline decoration-dotted hover:bg-blue-500/10 rounded px-0.5 transition-colors font-medium"
          >
            {p}
          </span>
        );
      }
      if (local) {
        return (
          <span
            key={i}
            onClick={(e) => { e.stopPropagation(); setTermoSel({ tipo: "local", nome: limpa, desc: local }); }}
            className="cursor-pointer text-green-600 dark:text-green-400 underline decoration-dotted hover:bg-green-500/10 rounded px-0.5 transition-colors"
          >
            {p}
          </span>
        );
      }
      return <span key={i}>{p}</span>;
    });
  }

  function handleSelectVerse(v: Versiculo) {
    if (versSel?.id === v.id) {
      setVersSel(null);
      return;
    }
    const refs = getCrossReferences(livroSel!.nome, capSel, v.numero);
    setVersSel({ ...v, refs, livro: livroSel!.nome, cap: capSel });
    setTermoSel(null);
    setEstudoTab("Referências");
  }

  function handleCopyVerse() {
    if (!versSel) return;
    const txt = `${versSel.livro} ${versSel.cap}:${versSel.numero} — "${versSel.texto}"`;
    navigator.clipboard.writeText(txt).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  function handleShareVerse() {
    if (!versSel) return;
    const txt = `${versSel.livro} ${versSel.cap}:${versSel.numero} — "${versSel.texto}"`;
    if (navigator.share) {
      navigator.share({ title: "Bible Scholar", text: txt, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(txt).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
    }
  }

  function handleToggleFav() {
    if (!versSel) return;
    const ref = `${versSel.livro} ${versSel.cap}:${versSel.numero}`;
    const favs = toggleFavorite(ref);
    setFavoritos(favs);
  }

  const isFav = useMemo(() => {
    if (!versSel) return false;
    return favoritos.includes(`${versSel.livro} ${versSel.cap}:${versSel.numero}`);
  }, [versSel, favoritos]);

  const at = livros.filter(l => l.ordemGeral <= 39);
  const nt = livros.filter(l => l.ordemGeral > 39);
  const livrosFiltrados = busca
    ? livros.filter(l => l.nome.toLowerCase().includes(busca.toLowerCase()))
    : [];

  return (
    <div className="flex h-[calc(100vh-3rem)] gap-0">
      <div className="w-64 border-r bg-background flex flex-col flex-shrink-0">
        <div className="flex border-b">
          <button
            onClick={() => setSidebar("livros")}
            className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
              sidebar === "livros" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
            }`}
          >
            Livros
          </button>
          <button
            onClick={() => setSidebar("lexico")}
            className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
              sidebar === "lexico" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
            }`}
          >
            Léxico
          </button>
        </div>

        {sidebar === "livros" && (
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  value={busca}
                  onChange={e => setBusca(e.target.value)}
                  placeholder="Buscar livro..."
                  className="w-full border rounded pl-7 pr-3 py-1.5 text-xs"
                />
                {busca && (
                  <button onClick={() => setBusca("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
            {busca ? (
              <div className="p-1">
                {livrosFiltrados.map(l => (
                  <button
                    key={l.id}
                    onClick={() => { selecionarLivro(l); setBusca(""); }}
                    className={`w-full text-left px-3 py-1.5 text-xs rounded transition-colors ${
                      livroSel?.id === l.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                    }`}
                  >
                    {l.nome}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <div className="px-3 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                  <BookOpen className="h-3 w-3" /> Antigo Testamento
                </div>
                <div className="px-1">
                  {at.map(l => (
                    <button
                      key={l.id}
                      onClick={() => selecionarLivro(l)}
                      className={`w-full text-left px-3 py-1 text-xs rounded transition-colors ${
                        livroSel?.id === l.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                      }`}
                    >
                      {l.nome}
                    </button>
                  ))}
                </div>
                <div className="px-3 py-1.5 mt-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                  <BookMarked className="h-3 w-3" /> Novo Testamento
                </div>
                <div className="px-1 pb-4">
                  {nt.map(l => (
                    <button
                      key={l.id}
                      onClick={() => selecionarLivro(l)}
                      className={`w-full text-left px-3 py-1 text-xs rounded transition-colors ${
                        livroSel?.id === l.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                      }`}
                    >
                      {l.nome}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {sidebar === "lexico" && <LexiconSidebar />}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {livroSel && (
          <div className="border-b px-6 py-3 flex items-center justify-between bg-background/95 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold tracking-tight">{livroSel.nome}</h2>
              <span className="text-sm text-muted-foreground font-mono">Capítulo {capSel}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-medium">
                {isNT ? "Grego" : "Hebraico"}
              </span>
              <button
                onClick={() => setInterlinear(!interlinear)}
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium transition-colors ${
                  interlinear ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-primary/10"
                }`}
                title="Alternar modo interlinear (palavras originais)"
              >
                {interlinear ? "Interlinear ON" : "Interlinear"}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCapSel(Math.max(1, capSel - 1))}
                disabled={capSel <= 1}
                className="p-1.5 rounded hover:bg-accent disabled:opacity-30 transition-colors"
                title="Capítulo anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-1 max-h-32 overflow-y-auto px-1">
                {Array.from({ length: livroSel.totalCapitulos }, (_, i) => i + 1).map(c => (
                  <button
                    key={c}
                    onClick={() => setCapSel(c)}
                    className={`w-7 h-7 text-xs rounded transition-colors ${
                      capSel === c ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-accent"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCapSel(Math.min(livroSel.totalCapitulos, capSel + 1))}
                disabled={capSel >= livroSel.totalCapitulos}
                className="p-1.5 rounded hover:bg-accent disabled:opacity-30 transition-colors"
                title="Próximo capítulo"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {!livroSel ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center space-y-3 max-w-md">
                <BookOpen className="h-16 w-16 mx-auto opacity-20" />
                <p className="text-lg font-medium">Selecione um livro para começar</p>
                <p className="text-sm">66 livros com 30.078 versículos disponíveis</p>
                <p className="text-xs text-muted-foreground/60">Clique em palavras destacadas para estudar termos, pessoas e lugares</p>
              </div>
            </div>
          ) : carregando ? (
            <div className="p-6 space-y-3 max-w-3xl mx-auto">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="w-6 h-4 bg-muted rounded" />
                  <div className="flex-1 h-4 bg-muted rounded" style={{ width: `${60 + Math.random() * 30}%` }} />
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto p-8 space-y-1">
              {versiculos.map(v => {
                const refs = getCrossReferences(livroSel!.nome, capSel, v.numero);
                const origText = versiculosOrig[v.numero - 1] || "";
                return (
                  <div
                    key={v.id}
                    className={`flex gap-3 py-1 group hover:bg-accent/50 rounded px-2 -mx-2 transition-all duration-150 cursor-pointer ${
                      versSel?.id === v.id ? "bg-primary/10 ring-1 ring-primary/30 shadow-sm" : ""
                    }`}
                    onClick={() => handleSelectVerse(v)}
                  >
                    <span className="text-xs text-muted-foreground font-mono mt-0.5 w-5 text-right flex-shrink-0 select-none group-hover:text-primary transition-colors">
                      {v.numero}
                    </span>
                    <div className="flex-1 min-w-0">
                      {interlinear && origText && (
                        <p className={`text-[14px] leading-relaxed font-mono text-primary/80 mb-0.5 pb-1 border-b border-primary/10 ${!isNT ? "rtl text-right" : ""}`}
                          dir={!isNT ? "rtl" : "ltr"}>
                          {origText}
                        </p>
                      )}
                      {carregandoOrig && interlinear && !origText && (
                        <p className="text-[11px] text-muted-foreground italic mb-0.5">Carregando texto original...</p>
                      )}
                      <p className="text-[16px] leading-[1.75] tracking-wide">
                        {processarTexto(v.texto)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5">
                      {refs.length > 0 && <Link2 className="h-3 w-3 text-muted-foreground" />}
                    </div>
                  </div>
                );
              })}
              {versiculos.length === 0 && (
                <p className="text-center text-muted-foreground py-8">Nenhum versículo encontrado</p>
              )}
            </div>
          )}
        </div>
      </div>

      {(termoSel || versSel) && (
        <div className="w-80 border-l bg-background overflow-y-auto flex-shrink-0">
          <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur-sm z-10">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              {versSel ? <BookOpen className="h-4 w-4 text-primary" /> : <Languages className="h-4 w-4 text-primary" />}
              Estudo
            </h3>
            <button onClick={() => { setTermoSel(null); setVersSel(null); }} className="p-1 hover:bg-accent rounded transition-colors">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {versSel && (
            <div className="border-b px-4 py-3 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold tracking-tight">{versSel.livro} {versSel.cap}:{versSel.numero}</p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleCopyVerse(); }}
                    className="p-1.5 rounded hover:bg-accent transition-colors"
                    title="Copiar versículo"
                  >
                    {copied ? <Sparkles className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleShareVerse(); }}
                    className="p-1.5 rounded hover:bg-accent transition-colors"
                    title="Compartilhar versículo"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleToggleFav(); }}
                    className={`p-1.5 rounded hover:bg-accent transition-colors ${isFav ? "text-red-500" : ""}`}
                    title={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  >
                    <Heart className={`h-3.5 w-3.5 ${isFav ? "fill-current" : ""}`} />
                  </button>
                </div>
              </div>
              {copied && <p className="text-[10px] text-green-600 font-medium">Copiado!</p>}
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm italic leading-relaxed">"{versSel.texto}"</p>
              </div>
            </div>
          )}

          {versSel && (
            <div className="flex border-b overflow-x-auto">
              {studyTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setEstudoTab(tab)}
                  className={`flex-1 py-2.5 text-[11px] font-medium whitespace-nowrap transition-all ${
                    estudoTab === tab
                      ? "text-primary border-b-2 border-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}

          <div className="p-4 space-y-4 animate-in fade-in duration-200">
            {termoSel && !versSel && (
              <>
                {termoSel.tipo === "termo" && (
                  <>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Languages className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Léxico {termoSel.type === "g" ? "Grego" : "Hebraico"}</span>
                      </div>
                      <p className="text-2xl font-bold font-mono tracking-tight">{termoSel.original}</p>
                      <p className="text-sm text-muted-foreground font-mono">{termoSel.strong}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm font-medium mb-1">Definição</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{termoSel.def}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <p>Clique em outros termos sublinhados no texto para estudá-los.</p>
                    </div>
                  </>
                )}
                {termoSel.tipo === "pessoa" && (
                  <>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span className="text-xs text-muted-foreground">Personagem Bíblico</span>
                      </div>
                      <p className="text-2xl font-bold">{termoSel.nome}</p>
                    </div>
                    <div className="bg-blue-500/5 rounded-lg p-3 border border-blue-500/20">
                      <p className="text-sm leading-relaxed">{termoSel.desc}</p>
                    </div>
                  </>
                )}
                {termoSel.tipo === "local" && (
                  <>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-muted-foreground">Local Bíblico</span>
                      </div>
                      <p className="text-2xl font-bold">{termoSel.nome}</p>
                    </div>
                    <div className="bg-green-500/5 rounded-lg p-3 border border-green-500/20">
                      <p className="text-sm leading-relaxed">{termoSel.desc}</p>
                    </div>
                  </>
                )}
              </>
            )}

            {versSel && estudoTab === "Referências" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Referências Cruzadas</span>
                  </div>
                </div>
                {versSel.refs && versSel.refs.length > 0 ? (
                  <div className="space-y-2">
                    {versSel.refs.map((r: any, i: number) => (
                      <div key={i} className="border rounded-lg p-3 space-y-1 hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-primary">{r.ref}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary font-medium">{r.tipo}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{r.texto}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Link2 className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    <p className="text-xs">Nenhuma referência cruzada encontrada para este versículo.</p>
                  </div>
                )}
              </div>
            )}

            {versSel && estudoTab === "Original" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Languages className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Texto Original — {isNT ? "Grego (NT)" : "Hebraico (AT)"}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  {getOriginalWords(versSel.texto, isNT).map((w, i) => (
                    <div key={i} className="flex items-center gap-2 py-1 border-b border-border/40 last:border-0">
                      <span className="text-xs text-muted-foreground w-5 text-right font-mono">{i + 1}</span>
                      <span className="text-sm flex-1">{w.portugues}</span>
                      {w.original ? (
                        <>
                          <span className="text-sm font-mono text-primary font-medium">{w.original}</span>
                          {w.transliteracao && <span className="text-[10px] text-muted-foreground italic">{w.transliteracao}</span>}
                          <span className="text-[10px] text-muted-foreground font-mono">{w.strong}</span>
                        </>
                      ) : (
                        <span className="text-[10px] text-muted-foreground italic">—</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-[10px] text-muted-foreground bg-muted/50 rounded-lg p-2">
                  <p>O texto original é exibido com base na concordância dos termos em português com o léxico bíblico.</p>
                </div>
              </div>
            )}

            {versSel && estudoTab === "Análise" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ScrollText className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Análise Palavra por Palavra</span>
                  </div>
                </div>
                <div className="space-y-1">
                  {analyzeWords(versSel.texto).map((w, i) => {
                    const entry = w.entry;
                    const term = w.term;
                    return (
                      <div key={i} className="border rounded-lg p-2.5 hover:bg-accent/50 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{w.palavra}</span>
                          <div className="flex items-center gap-1">
                            {term && <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">{term.strong}</span>}
                            {entry && <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary">{entry.strong}</span>}
                          </div>
                        </div>
                        {entry && (
                          <div className="space-y-0.5 text-[11px] text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-primary text-xs">{entry.lemma}</span>
                              {entry.transliteracao && <span className="italic">{entry.transliteracao}</span>}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-1 py-0.5 rounded bg-background border text-[10px]">{entry.classeGramatical}</span>
                              {entry.morfologia?.tempo && <span className="text-[10px]">{entry.morfologia.tempo}</span>}
                              {entry.morfologia?.voz && <span className="text-[10px]">{entry.morfologia.voz}</span>}
                            </div>
                            <p className="text-xs mt-0.5">{entry.definicaoCurta}</p>
                            {entry.definicaoCompleta && (
                              <p className="text-[10px] line-clamp-2">{entry.definicaoCompleta}</p>
                            )}
                          </div>
                        )}
                        {term && !entry && (
                          <div className="text-[11px] text-muted-foreground">
                            <span className="font-mono text-primary text-xs">{term.original}</span>
                            <p className="text-xs mt-0.5">{term.def}</p>
                          </div>
                        )}
                        {!entry && !term && (
                          <p className="text-[10px] text-muted-foreground italic">
                            Palavra funcional — sem entrada lexical específica no léxico.
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {versSel && estudoTab === "Comentários" && (
              <div className="space-y-4 animate-in fadein slide-in-from-top-1 duration-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Comentários</span>
                  </div>
                </div>
                {(() => {
                  const comentarios = getCommentaries(versSel.livro, versSel.cap, versSel.numero);
                  if (comentarios.length > 0) {
                    return (
                      <div className="space-y-3">
                        {comentarios.map((c, i) => (
                          <div key={i} className="border rounded-lg p-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-primary">{c.autor}</span>
                              <span className="text-[10px] text-muted-foreground">{c.titulo}</span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{c.conteudo}</p>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      <p className="text-xs">Nenhum comentário disponível para este versículo.</p>
                      <p className="text-[10px] mt-1">Comentários de Matthew Henry, Charles Spurgeon e John Wesley para mais de 60 passagens-chave.</p>
                    </div>
                  );
                })()}
              </div>
            )}

            {!termoSel && !versSel && (
              <div className="text-center py-8 text-muted-foreground">
                <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Selecione um versículo para ver:</p>
                <ul className="text-xs mt-2 space-y-1">
                  <li>• Referências cruzadas</li>
                  <li>• Texto original (Grego/Hebraico)</li>
                  <li>• Análise palavra por palavra</li>
                  <li>• Comentários de Matthew Henry</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function LexiconSidebar() {
  const [palavras, setPalavras] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState<"grego" | "hebraico">("grego");

  useEffect(() => {
    fetch(`/api/v1/${tipo === "grego" ? "grego" : "hebraico"}/frequentes`)
      .then(r => r.json())
      .then(data => setPalavras(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, [tipo]);

  const filtradas = busca
    ? palavras.filter(p =>
        p.palavraOriginal?.toLowerCase().includes(busca.toLowerCase()) ||
        p.definicaoCurta?.toLowerCase().includes(busca.toLowerCase()) ||
        p.strong?.toLowerCase().includes(busca.toLowerCase())
      )
    : palavras;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex border-b">
        <button
          onClick={() => setTipo("grego")}
          className={`flex-1 py-2 text-xs font-medium transition-colors ${
            tipo === "grego" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
          }`}
        >
          Grego
        </button>
        <button
          onClick={() => setTipo("hebraico")}
          className={`flex-1 py-2 text-xs font-medium transition-colors ${
            tipo === "hebraico" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
          }`}
        >
          Hebraico
        </button>
      </div>
      <div className="p-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar no léxico..."
            className="w-full border rounded pl-7 pr-3 py-1.5 text-xs"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-1">
        {filtradas.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-xs">
            <Languages className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <p>Nenhum termo encontrado</p>
          </div>
        ) : (
          filtradas.map(p => (
            <div key={p.id} className="px-3 py-2 text-xs border-b hover:bg-accent/50 transition-colors cursor-pointer rounded mx-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-primary text-[11px]">{p.strong}</span>
                <span className="font-mono text-sm">{p.palavraOriginal}</span>
              </div>
              <p className="text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">{p.definicaoCurta}</p>
              <div className="flex gap-3 mt-1 text-[10px] text-muted-foreground">
                {p.classeGramatical && <span className="px-1 py-0.5 rounded bg-background border">{p.classeGramatical}</span>}
                {p.frequenciaNt && <span>NT: {p.frequenciaNt}x</span>}
                {p.frequenciaAt && <span>AT: {p.frequenciaAt}x</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
