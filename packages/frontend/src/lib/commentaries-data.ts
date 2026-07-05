export interface Comentario {
  autor: string;
  titulo: string;
  conteudo: string;
  contextoHistorico?: string;
  aplicacao?: string;
}

export const COMMENTARIES: Record<string, Comentario[]> = {
  "Gênesis 1:1": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "A grande obra criadora de Deus é aqui apresentada. O primeiro versículo da Bíblia é a fundação de toda a revelação divina. Deus, que é eterno e autoexistente, criou todas as coisas do nada pelo poder da sua palavra. Esta verdade fundamental distingue a fé bíblica de toda filosofia humana.",
      contextoHistorico: "Moisés escreveu o Gênesis para o povo de Israel recém-liberto do Egito, para estabelecer as bases da teologia da criação.",
      aplicacao: "A criação nos lembra que tudo pertence a Deus e que nossa existência depende inteiramente dele."
    },
    {
      autor: "João Calvino",
      titulo: "Institutas",
      conteudo: "Moisés mostra que o mundo foi criado por Deus, não gerado por si mesmo. A eternidade do mundo é refutada, e o Deus verdadeiro é distinguido de todas as imaginações humanas."
    }
  ],
  "Gênesis 3:15": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "O primeiro evangelho é proclamado aqui. A semente da mulher ferirá a cabeça da serpente. Esta é a primeira promessa do Messias, que nasceria de uma mulher e destruiria as obras do diabo. Deus, em sua justiça, pronuncia julgamento; em sua misericórdia, oferece esperança.",
      aplicacao: "Em meio ao juízo, Deus sempre preserva um remanescente e uma promessa de redenção."
    }
  ],
  "Gênesis 12:1-3": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Deus chama Abrão para sair de sua terra e parentela, prometendo fazer dele uma grande nação. Nele seriam benditas todas as famílias da terra. Esta é a fundação da aliança abraâmica, que aponta para Cristo, em quem todas as promessas encontram seu cumprimento.",
      contextoHistorico: "Abraão vivia em Ur dos Caldeus, uma civilização idólatra. Deus o separou para ser o pai do povo da aliança.",
      aplicacao: "A fé de Abraão nos ensina a obedecer ao chamado de Deus mesmo quando não vemos o destino completo."
    }
  ],
  "Êxodo 3:14": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "EU SOU O QUE SOU. Este é o nome eterno e autoexistente de Deus. Ele não depende de nada fora de si mesmo. Este nome revela a imutabilidade, a eternidade e a suficiência de Deus. Jesus apropriou este nome para si mesmo, declarando sua divindade.",
      aplicacao: "Podemos confiar naquele que é o mesmo ontem, hoje e eternamente."
    }
  ],
  "Êxodo 20:1-17": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Deus entrega os Dez Mandamentos a Moisés no Monte Sinai. A lei moral resume o dever do homem para com Deus e para com o próximo. Os primeiros quatro mandamentos tratam de nosso amor a Deus; os últimos seis, de nosso amor ao próximo. A lei nos conduz a Cristo, pois revela nossa incapacidade de cumpri-la perfeitamente.",
      contextoHistorico: "Israel havia saído do Egito e estava acampado ao pé do Sinai. Deus estabeleceu sua aliança com a nação.",
      aplicacao: "A lei não é meio de salvação, mas espelho que revela nosso pecado e nossa necessidade de graça."
    }
  ],
  "Levítico 19:18": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Amarás o teu próximo como a ti mesmo. Este é o grande mandamento moral que resume nosso dever para com o próximo. Jesus o citou como o segundo maior mandamento. O amor ao próximo é a evidência do amor a Deus.",
      aplicacao: "O amor verdadeiro não é sentimento, mas ação que busca o bem do outro."
    }
  ],
  "Números 6:24-26": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "A bênção sacerdotal é uma das mais belas passagens das Escrituras. O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti e tenha misericórdia de ti; o Senhor sobre ti levante o seu rosto e te dê a paz. É uma bênção trina que ecoa a Trindade.",
      aplicacao: "Esta bênção nos assegura que Deus é a fonte de toda proteção, graça e paz."
    }
  ],
  "Deuteronômio 6:4-5": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Ouve, Israel, o Senhor nosso Deus é o único Senhor. Amarás o Senhor teu Deus de todo o teu coração, de toda a tua alma e de toda a tua força. O Shema é a grande confissão de fé de Israel. O monoteísmo bíblico é a base de toda a revelação.",
      contextoHistorico: "Moisés exorta a nova geração antes de entrar em Canaã, advertindo contra a idolatria.",
      aplicacao: "O amor a Deus deve ser total e exclusivo, ocupando o centro de nossa existência."
    }
  ],
  "Deuteronômio 7:9": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Deus é fiel, guarda a aliança e a misericórdia até mil gerações com aqueles que o amam e guardam seus mandamentos. A fidelidade de Deus é a âncora de nossa esperança. Ele não é como os homens, que mudam e falham.",
      aplicacao: "Nossa confiança está na fidelidade imutável de Deus, não em nossos méritos variáveis."
    }
  ],
  "Josué 1:9": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Sê forte e corajoso; não temas, nem te espantes, porque o Senhor teu Deus é contigo por onde quer que andares. Deus encoraja Josué a assumir a liderança de Israel após Moisés. A coragem do servo de Deus vem da presença de Deus, não de suas próprias capacidades.",
      contextoHistorico: "Josué estava prestes a conduzir Israel na conquista de Canaã, uma tarefa sobre-humana.",
      aplicacao: "A presença de Deus é o fundamento de toda coragem verdadeira."
    }
  ],
  "Salmos 1:1-3": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Bem-aventurado o homem que não anda segundo o conselho dos ímpios, nem se detém no caminho dos pecadores, nem se assenta na roda dos escarnecedores. Antes, o seu prazer está na lei do Senhor, e nela medita de dia e de noite. Este salmo contrasta o justo e o ímpio, estabelecendo o tema de todo o Saltério.",
      aplicacao: "A felicidade verdadeira não está em seguir a multidão, mas em deleitar-se na Palavra de Deus."
    }
  ],
  "Salmos 19:1": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Os céus declaram a glória de Deus e o firmamento anuncia a obra das suas mãos. A criação é uma revelação universal e contínua do poder e da divindade de Deus. Todos os povos, em todos os tempos, têm testemunho suficiente nas obras criadas.",
      aplicacao: "A natureza é o primeiro livro de Deus, apontando para seu Criador."
    }
  ],
  "Salmos 23:1-6": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "O Senhor é o meu pastor, nada me faltará. Este salmo é o mais amado de todos, uma doce expressão de confiança na provisão divina. O relacionamento de Deus com seu povo é como o de um pastor com suas ovelhas. Ele guia, supre, protege e restaura. A mesa preparada na presença dos inimigos fala da graça Triunfante.",
      aplicacao: "Em cada estação da vida, desde os verdes pastos até o vale da sombra da morte, o Bom Pastor está conosco."
    },
    {
      autor: "Carlos Spurgeon",
      titulo: "Tesouro de Davi",
      conteudo: "Este salmo é o mais doce de todos os salmos. Cada palavra é uma pérola. Davi escreveu esta joia da experiência pessoal. O Senhor é meu pastor — isso é fato; nada me faltará — isso é fé."
    }
  ],
  "Salmos 24:1": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Do Senhor é a terra e a sua plenitude, o mundo e aqueles que nele habitam. Deus é o proprietário absoluto de todas as coisas. Nós somos apenas mordomos e administradores dos bens que nos foram confiados.",
      aplicacao: "Viver com a consciência de que tudo pertence a Deus transforma nossa relação com as posses."
    }
  ],
  "Salmos 27:1": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "O Senhor é a minha luz e a minha salvação; a quem temerei? O Senhor é a fortaleza da minha vida; de quem me recearei? A confiança em Deus elimina o medo dos homens. Se Deus é por nós, quem será contra nós?",
      aplicacao: "A luz de Deus dissipa todas as trevas do medo e da incerteza."
    }
  ],
  "Salmos 34:8": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Provai e vede que o Senhor é bom. Davi nos convida a experimentar pessoalmente a bondade de Deus. Não é um convite para um conhecimento teórico, mas experimental. Bem-aventurado o homem que confia nele.",
      aplicacao: "O conhecimento de Deus não é apenas intelectual; é provado na experiência diária de fé."
    }
  ],
  "Salmos 46:10": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Aquietai-vos e sabei que eu sou Deus. Em meio ao caos e às guerras das nações, Deus chama seu povo ao sossego e à confiança. O conhecimento de Deus que traz paz não vem da agitação, mas da contemplação silenciosa de sua majestade.",
      aplicacao: "A quietude diante de Deus é o remédio para a ansiedade da alma."
    }
  ],
  "Salmos 51:10": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Cria em mim, ó Deus, um coração puro e renova dentro de mim um espírito estável. Davi, após seu grande pecado com Bate-Seba, clama por restauração. Ele sabe que apenas Deus pode criar um coração novo. O arrependimento genuíno busca não apenas o perdão, mas a transformação interior.",
      contextoHistorico: "Davi escreveu este salmo após o profeta Natã confrontá-lo sobre seu adultério e assassinato.",
      aplicacao: "O pecado nos corrompe profundamente; somente a graça criadora de Deus pode nos renovar."
    }
  ],
  "Salmos 119:105": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Lâmpada para os meus pés é a tua palavra e luz para o meu caminho. A Palavra de Deus ilumina cada passo de nossa jornada. Não nos dá um mapa completo do futuro, mas luz suficiente para o próximo passo. O salmista celebra o poder orientador das Escrituras.",
      aplicacao: "A Bíblia não responde todas as curiosidades, mas ilumina todas as necessidades do nosso caminho."
    }
  ],
  "Provérbios 1:7": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "O temor do Senhor é o princípio do conhecimento. A verdadeira sabedoria começa com uma atitude reverente para com Deus. O tolo despreza a sabedoria e a instrução. Salomão estabelece que todo conhecimento verdadeiro está enraizado no temor a Deus.",
      aplicacao: "Sem o temor do Senhor, todo conhecimento é superficial e enganoso."
    }
  ],
  "Provérbios 3:5-6": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas. Confiar em Deus significa depender dele em vez de nossa própria sabedoria limitada.",
      aplicacao: "A confiança em Deus não é apenas para as grandes decisões, mas para cada passo do caminho."
    }
  ],
  "Provérbios 9:10": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "O temor do Senhor é o princípio da sabedoria, e o conhecimento do Santo é o entendimento. Sabedoria e conhecimento são inseparáveis. Conhecer a Deus é a mais alta forma de entendimento. Tudo o mais é secundário.",
      aplicacao: "A busca pelo conhecimento de Deus é a mais nobre empreitada humana."
    }
  ],
  "Isaías 9:6": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Porque um menino nos nasceu, um filho se nos deu. O governo está sobre os seus ombros. Ele será chamado Maravilhoso, Conselheiro, Deus Forte, Pai da Eternidade, Príncipe da Paz. Profecia magnífica do nascimento do Messias. Cada título revela um aspecto da glória de Cristo.",
      contextoHistorico: "Isaías profetizou em tempos de crise e escuridão, anunciando luz e esperança através do Messias vindouro.",
      aplicacao: "Em Cristo, todas as necessidades humanas encontram provisão divina."
    }
  ],
  "Isaías 40:31": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Os que esperam no Senhor renovarão as suas forças. Subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão. A esperança em Deus não é passiva, mas uma expectativa ativa que traz renovação espiritual.",
      aplicacao: "A espera em Deus não é vazia; é o tempo em que ele renova nossas forças."
    }
  ],
  "Isaías 43:2": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Quando passares pelas águas, eu serei contigo; quando pelos rios, eles não te submergirão. Deus não promete evitar as tribulações, mas promete estar presente nelas. As provações não nos destruirão porque o Senhor está conosco.",
      aplicacao: "A presença de Deus nas tribulações é melhor do que a ausência de problemas."
    }
  ],
  "Jeremias 29:11": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Eu é que sei os pensamentos que tenho a vosso respeito, pensamentos de paz e não de mal, para vos dar o fim que desejais. Deus conforta seu povo exilado na Babilônia com uma promessa de futuro. Seus planos são de restauração, não de abandono.",
      contextoHistorico: "Os judeus estavam cativos na Babilônia por setenta anos. Deus lhes assegura que o exílio não é o fim.",
      aplicacao: "Mesmo em meio ao juízo, Deus mantém seus propósitos de graça para seu povo."
    }
  ],
  "Lamentações 3:22-23": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "As misericórdias do Senhor são a causa de não sermos consumidos, porque as suas misericórdias não têm fim; renovam-se cada manhã. Grande é a tua fidelidade. Jeremias, no auge da tristeza pela destruição de Jerusalém, ancora sua esperança na fidelidade de Deus.",
      aplicacao: "Cada novo dia traz renovadas misericórdias de Deus. Nossa esperança não está nas circunstâncias, mas no caráter imutável de Deus."
    }
  ],
  "Ezequiel 36:26-27": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Dar-vos-ei coração novo e porei dentro de vós espírito novo. Tirarei o coração de pedra e vos darei coração de carne. Porei dentro de vós o meu Espírito. Esta é a promessa da nova aliança: regeneração interior pela obra do Espírito Santo.",
      aplicacao: "A verdadeira mudança não é externa, mas interna, operada pelo Espírito de Deus."
    }
  ],
  "Daniel 6:22": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "O meu Deus enviou o seu anjo e fechou a boca dos leões. Daniel, fiel a Deus, é lançado na cova dos leões por decreto dos invejosos. Deus honra a fidelidade de seu servo e o livra miraculosamente.",
      contextoHistorico: "Daniel, já idoso, servia no império persa. Seus inimigos tramaram sua queda usando sua fidelidade a Deus.",
      aplicacao: "A fidelidade a Deus pode nos levar à cova dos leões, mas o mesmo Deus que nos acompanha também nos livra."
    }
  ],
  "Oséias 6:6": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Misericórdia quero, não sacrifício; conhecimento de Deus, mais do que holocaustos. Deus deseja um coração arrependido e fiel, não rituais vazios. A religião sem amor a Deus e ao próximo é morta.",
      aplicacao: "Deus prefere obediência sincera a cerimônias externas."
    }
  ],
  "Miqueias 6:8": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Ele te declarou, ó homem, o que é bom e o que o Senhor pede de ti: que pratiques a justiça, ames a misericórdia e andes humildemente com o teu Deus. Aqui está o resumo de toda a religião prática: justiça com os outros, compaixão pelos necessitados e humildade diante de Deus.",
      aplicacao: "A verdadeira espiritualidade não se mede por rituais, mas por justiça, misericórdia e humildade."
    }
  ],
  "Malaquias 3:6": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Eu, o Senhor, não mudo. Por isso, vós, ó filhos de Jacó, não sois consumidos. A imutabilidade de Deus é a garantia de sua fidelidade. Se Deus mudasse, já teria nos consumido por nossos pecados. Mas ele permanece fiel mesmo quando somos infiéis.",
      aplicacao: "Nossa segurança está no Deus que não muda."
    }
  ],
  "Mateus 4:4": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Nem só de pão viverá o homem, mas de toda palavra que sai da boca de Deus. Jesus, ao ser tentado por Satanás no deserto, cita Deuteronômio. A vida verdadeira não se sustenta apenas de alimento material, mas da Palavra de Deus.",
      contextoHistorico: "Jesus jejuou quarenta dias no deserto antes de iniciar seu ministério público. Satanás o tentou no ponto de sua fraqueza física.",
      aplicacao: "A Palavra de Deus é alimento essencial para nossa alma, tão necessário quanto o pão para o corpo."
    }
  ],
  "Mateus 5:3-12": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "As Bem-aventuranças são a constituição do Reino de Deus. Jesus declara bem-aventurados os pobres de espírito, os que choram, os mansos, os que têm fome e sede de justiça, os misericordiosos, os puros de coração, os pacificadores e os perseguidos. O Reino de Deus opera por valores inversos aos do mundo.",
      aplicacao: "A felicidade verdadeira não está na posse, mas na humildade; não no poder, mas na pureza."
    }
  ],
  "Mateus 11:28": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei. Jesus faz o convite mais doce do evangelho. O alívio que ele oferece não é apenas para o cansaço físico, mas para o peso do pecado e o fardo das tradições religiosas.",
      aplicacao: "Cristo não nos oferece um fardo mais leve, mas nos tira o fardo e nos dá descanso verdadeiro."
    }
  ],
  "Mateus 22:37-39": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Jesus resume toda a lei em dois mandamentos: amar a Deus sobre todas as coisas e amar ao próximo como a si mesmo. Destes dois mandamentos dependem toda a lei e os profetas. O amor é o cumprimento de toda a lei moral.",
      aplicacao: "O amor a Deus e ao próximo é a essência de toda obediência verdadeira."
    }
  ],
  "Mateus 28:18-20": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "A Grande Comissão: Jesus recebe toda a autoridade nos céus e na terra e envia seus discípulos a fazer discípulos de todas as nações. O batismo em nome da Trindade e o ensino de tudo o que ele ordenou. Esta comissão é a base da missão da igreja até o fim dos tempos.",
      aplicacao: "A igreja não tem opção senão obedecer à ordem de Cristo de levar o evangelho a todas as nações."
    }
  ],
  "Marcos 10:45": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "O Filho do Homem não veio para ser servido, mas para servir e dar a sua vida em resgate de muitos. Jesus redefine grandeza como serviço sacrificial. Ele mesmo é o exemplo supremo de humildade e entrega.",
      aplicacao: "A verdadeira grandeza no Reino de Deus é medida pelo serviço, não pela posição."
    }
  ],
  "Marcos 16:15": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Ide por todo o mundo e pregai o evangelho a toda criatura. A ordem é universal, o alcance é global. Nenhuma barreira geográfica, cultural ou étnica pode limitar a propagação do evangelho.",
      aplicacao: "O evangelho é para todos os povos, e todos os crentes são chamados a participar desta missão."
    }
  ],
  "Lucas 2:10-11": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Não temais, porque eis que vos trago boa nova de grande alegria, que será para todo o povo: é que hoje vos nasceu o Salvador, que é Cristo, o Senhor. O anúncio do nascimento de Jesus é a boa nova mais alegre que o mundo já ouviu.",
      contextoHistorico: "Pastores nos campos de Belém recebem a visita angelical. O Salvador não nasce em um palácio, mas em uma estrebaria.",
      aplicacao: "O advento de Cristo é a fonte de toda alegria verdadeira para todos os povos."
    }
  ],
  "Lucas 6:31": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "A regra de ouro: como quereis que os homens vos façam, fazei-lhes também vós da mesma maneira. Jesus ensina que o amor ao próximo se expressa na prática. Esta regra resume a ética do Reino.",
      aplicacao: "Tratar os outros como gostaríamos de ser tratados é o padrão mínimo do amor cristão."
    }
  ],
  "Lucas 9:23": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Se alguém quer vir após mim, negue-se a si mesmo, tome cada dia a sua cruz e siga-me. O discipulado tem um custo: renúncia própria, aceitação do sofrimento e obediência contínua. Não há discipulado sem cruz.",
      aplicacao: "Seguir a Cristo não é um complemento à vida, mas uma reorientação total da existência."
    }
  ],
  "Lucas 15:11-32": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "A parábola do filho pródigo é a mais bela ilustração do amor de Deus pelos pecadores. O filho mais novo pede sua herança, a desperdiça e chega à miséria. Ao voltar arrependido, o pai o recebe de braços abertos. O filho mais velho representa os fariseus que não compreendem a graça.",
      aplicacao: "Deus é um Pai amoroso que sempre espera e recebe de volta os filhos arrependidos."
    }
  ],
  "Lucas 19:10": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Porque o Filho do Homem veio buscar e salvar o que se havia perdido. Esta é a declaração da missão de Cristo. Ele veio para os perdidos, os marginalizados, os pecadores. Zaqueu, o publicano, é um exemplo vivo desta missão.",
      aplicacao: "Ninguém está tão perdido que não possa ser encontrado e salvo por Jesus."
    }
  ],
  "João 1:1": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus. João abre seu evangelho com a mais sublime declaração da divindade de Cristo. O Verbo é eterno, pessoal e divino. Ele estava com o Pai antes da criação e é ele mesmo Deus.",
      aplicacao: "Cristo não é uma criatura; ele é o Criador eterno, Deus manifestado em carne."
    },
    {
      autor: "João Calvino",
      titulo: "Comentário de João",
      conteudo: "João eleva nossa mente acima do mundo e nos leva ao céu, para que contemplemos a glória eterna de Cristo."
    }
  ],
  "João 1:12": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Mas a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus, aos que creem no seu nome. A fé em Cristo nos concede o privilégio inefável de nos tornarmos filhos de Deus. Não por mérito próprio, mas pela adoção graciosa de Deus.",
      aplicacao: "A filiação divina não é um direito de nascimento natural, mas um dom recebido pela fé."
    }
  ],
  "João 3:16": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Aqui está o evangelho em miniatura. Deus amou o mundo caído com um amor imenso, eterno e gratuito. Não amou porque éramos dignos, mas porque Ele é amor. Deu o que tinha de mais precioso: Seu Filho unigênito. O propósito? Que todo aquele que crê não pereça, mas tenha vida eterna.",
      contextoHistorico: "Jesus explica a Nicodemos o plano da salvação, contrastando a velha aliança com a nova.",
      aplicacao: "Devemos responder a este amor com fé pessoal e gratidão."
    },
    {
      autor: "João Calvino",
      titulo: "Comentário de João",
      conteudo: "Cristo torna Deus conhecido como Pai, não de todos indiscriminadamente, mas daqueles que creem."
    }
  ],
  "João 8:32": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Conhecereis a verdade, e a verdade vos libertará. Jesus promete libertação através do conhecimento da verdade. Esta não é verdade abstrata, mas a verdade pessoal que é Cristo. A liberdade verdadeira é libertação do pecado, não permissão para pecar.",
      aplicacao: "A liberdade que Cristo dá não é para fazer o que queremos, mas para viver como devemos."
    }
  ],
  "João 10:10": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Eu vim para que tenham vida e a tenham em abundância. Jesus é o Bom Pastor que dá a vida pelas ovelhas. O ladrão vem para roubar, matar e destruir. Cristo vem para dar vida plena, abundante e eterna.",
      aplicacao: "A vida em Cristo não é mera existência, mas vida transbordante de propósito e alegria."
    }
  ],
  "João 14:6": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai senão por mim. Jesus faz a mais exclusiva das afirmações. Ele não é um caminho entre muitos, mas o único caminho para Deus. Ele é a verdade encarnada e a fonte de toda vida.",
      aplicacao: "A salvação não é encontrada em filosofias, religiões ou boas obras, mas exclusivamente em Jesus Cristo."
    }
  ],
  "João 15:5": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Eu sou a videira, vós as varas. Quem permanece em mim e eu nele, esse dá muito fruto, porque sem mim nada podeis fazer. O segredo da vida cristã frutífera é a união vital com Cristo. Separados dele, nada podemos fazer de valor espiritual.",
      aplicacao: "O fruto cristão não é produzido por esforço próprio, mas pela conexão vital com Cristo."
    }
  ],
  "João 20:31": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Estes, porém, foram escritos para que creiais que Jesus é o Cristo, o Filho de Deus, e para que, crendo, tenhais vida em seu nome. João declara o propósito claro de seu evangelho: gerar fé em Cristo e, pela fé, vida eterna.",
      aplicacao: "A Bíblia foi escrita não apenas para informar, mas para transformar pela fé em Cristo."
    }
  ],
  "Atos 1:8": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Recebereis poder ao descer sobre vós o Espírito Santo e sereis minhas testemunhas tanto em Jerusalém como em toda a Judeia e Samaria e até aos confins da terra. Jesus promete o poder do Espírito para a missão. O testemunho começa no lugar onde estamos e se expande até os confins do mundo.",
      aplicacao: "O poder para testemunhar não vem de nossa capacidade, mas do Espírito Santo."
    }
  ],
  "Atos 2:38": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Arrependei-vos, e cada um de vós seja batizado em nome de Jesus Cristo para remissão dos vossos pecados, e recebereis o dom do Espírito Santo. Pedro proclama o caminho da salvação no dia de Pentecostes. Arrependimento, fé, batismo e o dom do Espírito.",
      contextoHistorico: "Pedro prega após a descida do Espírito Santo, e três mil almas se convertem.",
      aplicacao: "O arrependimento é o primeiro passo para a vida nova em Cristo."
    }
  ],
  "Atos 4:12": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Não há salvação em nenhum outro; porque abaixo do céu não há nenhum outro nome dado entre os homens pelo qual devamos ser salvos. Pedro e João afirmam a exclusividade de Cristo para a salvação. Este é o fundamento da fé apostólica.",
      aplicacao: "A salvação é encontrada exclusivamente em Jesus Cristo."
    }
  ],
  "Romanos 1:16": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Não me envergonho do evangelho, porque é o poder de Deus para salvação de todo aquele que crê, primeiro do judeu e também do grego. Paulo declara seu orgulho no evangelho. O evangelho não é mera mensagem, mas poder divino em ação.",
      aplicacao: "O evangelho não envergonha porque é o próprio poder de Deus operando salvação."
    }
  ],
  "Romanos 3:23": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Todos pecaram e destituídos estão da glória de Deus. Este é o diagnóstico universal da condição humana. Não há distinção entre judeus e gentios; todos estão sob o pecado. A glória de Deus para a qual fomos criados foi perdida pelo pecado.",
      aplicacao: "O reconhecimento do pecado é o primeiro passo para compreender a necessidade da graça."
    }
  ],
  "Romanos 6:23": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "O salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus, nosso Senhor. O contraste é absoluto: merecemos a morte, mas Deus nos oferece a vida. Salário implica merecimento; dom implica graça.",
      aplicacao: "A salvação não é conquistada, é recebida como dom."
    }
  ],
  "Romanos 8:28": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito. Esta é uma das promessas mais consoladoras das Escrituras. Não que todas as coisas sejam boas em si mesmas, mas Deus as faz cooperar para o bem final de seu povo.",
      aplicacao: "A soberania de Deus garante que mesmo os eventos dolorosos têm um propósito redentor."
    }
  ],
  "Romanos 8:31": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Se Deus é por nós, quem será contra nós? Esta é a pergunta retórica mais triunfante da Bíblia. Se o Deus soberano está ao nosso lado, nenhum adversário pode nos derrotar. A segurança do crente está na aliança de Deus.",
      aplicacao: "A maior segurança não está na ausência de inimigos, mas na presença de Deus."
    }
  ],
  "Romanos 8:38-39": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Nem a morte, nem a vida, nem anjos, nem principados, nem potestades, nem o presente, nem o porvir, nem altura, nem profundidade, nem qualquer outra criatura poderá separar-nos do amor de Deus que está em Cristo Jesus, nosso Senhor. O hino triunfante do amor inquebrável de Deus em Cristo.",
      aplicacao: "Nada em toda a criação pode romper o vínculo de amor que Deus estabeleceu conosco em Cristo."
    }
  ],
  "Romanos 10:9": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Se confessares com a tua boca que Jesus é Senhor e creres em teu coração que Deus o ressuscitou dentre os mortos, serás salvo. A salvação envolve confissão pública e fé interior. Não é apenas crença intelectual, mas compromisso pessoal com Cristo como Senhor.",
      aplicacao: "A fé genuína se expressa em confissão pública e submissão a Cristo como Senhor."
    }
  ],
  "Romanos 12:1": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Rogo-vos, pois, irmãos, pela compaixão de Deus, que apresenteis os vossos corpos em sacrifício vivo, santo e agradável a Deus, que é o vosso culto racional. Paulo conclui a doutrina e inicia a exortação prática. A resposta adequada à misericórdia de Deus é a entrega total de nossa vida.",
      aplicacao: "O culto verdadeiro não é ritual, mas a entrega completa de nossa existência a Deus."
    }
  ],
  "1 Coríntios 2:9": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Nem olhos viram, nem ouvidos ouviram, nem jamais penetrou em coração humano o que Deus tem preparado para aqueles que o amam. As realidades espirituais ultrapassam a compreensão humana. A revelação divina supera toda expectativa e imaginação.",
      aplicacao: "A glória futura que nos aguarda excede nossa capacidade de compreensão."
    }
  ],
  "1 Coríntios 10:13": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Fiel é Deus, que não permitirá que sejais tentados além das vossas forças; antes, com a tentação, dará também o livramento, para que a possais suportar. Deus estabelece limites para as tentações que enfrentamos. Ele sempre provê o escape.",
      aplicacao: "Nenhuma tentação é maior do que a graça que Deus nos dá para vencê-la."
    }
  ],
  "1 Coríntios 13:4-7": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "O amor é paciente, é benigno; o amor não arde em ciúmes, não se ufana, não se ensoberbece. Não se conduz inconvenientemente, não busca os seus interesses, não se exaspera, não ressente o mal. Tudo sofre, tudo crê, tudo espera, tudo suporta. O hino do amor ágape é a mais bela descrição do caráter cristão.",
      aplicacao: "O amor não é um sentimento, mas um conjunto de virtudes praticadas na vida diária."
    }
  ],
  "1 Coríntios 15:3-4": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Cristo morreu pelos nossos pecados, segundo as Escrituras; foi sepultado e ressuscitou ao terceiro dia, segundo as Escrituras. Paulo resume o evangelho que recebeu e transmitiu. A morte e ressurreição de Cristo são o fundamento da fé cristã.",
      aplicacao: "O evangelho não é uma invenção humana, mas a revelação divina do plano da salvação."
    }
  ],
  "2 Coríntios 4:17-18": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "A nossa leve e momentânea tribulação produz para nós eterno peso de glória, acima de toda comparação. Atentando nós, não nas coisas que se veem, mas nas que se não veem. As tribulações terrenas são leves comparadas à glória eterna.",
      aplicacao: "A perspectiva eterna transforma nossa avaliação dos sofrimentos presentes."
    }
  ],
  "2 Coríntios 5:17": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Se alguém está em Cristo, é nova criatura; as coisas antigas já passaram; eis que se fizeram novas. A conversão é uma nova criação, não uma reforma superficial. Em Cristo, recebemos uma nova identidade, novas prioridades e uma nova vida.",
      aplicacao: "A vida cristã não é melhorar o velho homem, mas tornar-se uma nova criação em Cristo."
    }
  ],
  "Gálatas 2:20": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Estou crucificado com Cristo; logo, já não sou eu quem vive, mas Cristo vive em mim; e esse viver que agora tenho na carne, vivo pela fé no Filho de Deus, que me amou e a si mesmo se entregou por mim. Paulo expressa a união mística com Cristo. Sua identidade está completamente unida à de Cristo.",
      aplicacao: "A vida cristã não é imitação de Cristo, mas habitação de Cristo em nós."
    }
  ],
  "Gálatas 5:22-23": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "O fruto do Espírito é amor, alegria, paz, longanimidade, benignidade, bondade, fidelidade, mansidão, domínio próprio. Contra estas coisas não há lei. As virtudes cristãs não são produzidas pelo esforço humano, mas pelo Espírito Santo que habita no crente.",
      aplicacao: "O caráter cristão é o resultado natural da presença do Espírito Santo na vida do crente."
    }
  ],
  "Efésios 1:3": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Bendito o Deus e Pai de nosso Senhor Jesus Cristo, que nos abençoou com todas as bênçãos espirituais nas regiões celestiais em Cristo. Paulo começa com uma doxologia que celebra as riquezas da graça divina em Cristo.",
      aplicacao: "Toda bênção espiritual que possuímos tem sua origem em Deus e vem através de Cristo."
    }
  ],
  "Efésios 2:8-9": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Pela graça sois salvos, mediante a fé; e isto não vem de vós, é dom de Deus; não de obras, para que ninguém se glorie. A salvação é inteiramente obra de Deus. A graça é a fonte, a fé é o meio, e a exclusão das obras elimina qualquer base para orgulho humano.",
      aplicacao: "A salvação é tão gratuita que só pode ser recebida, jamais merecida."
    }
  ],
  "Efésios 4:11-13": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Cristo concedeu dons aos homens: apóstolos, profetas, evangelistas, pastores e mestres, com vistas ao aperfeiçoamento dos santos para a obra do ministério, para a edificação do corpo de Cristo. Os dons ministeriais são dados para o crescimento e amadurecimento da igreja.",
      aplicacao: "Os líderes não existem para si mesmos, mas para equipar o povo de Deus para o serviço."
    }
  ],
  "Efésios 5:18": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Não vos embriagueis com vinho, no qual há dissolução, mas enchei-vos do Espírito. O contraste entre a embriaguez carnal e a plenitude espiritual. Ser cheio do Espírito não é uma experiência opcional, mas uma ordem para todo crente.",
      aplicacao: "A plenitude do Espírito é o segredo de uma vida cristã vitoriosa."
    }
  ],
  "Efésios 6:12": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "A nossa luta não é contra o sangue e a carne, mas contra os principados, potestades, contra os dominadores deste mundo tenebroso, contra as forças espirituais do mal nas regiões celestiais. Paulo revela a verdadeira natureza do conflito espiritual.",
      aplicacao: "O maior combate do cristão não é contra pessoas, mas contra forças espirituais do mal."
    }
  ],
  "Filipenses 1:6": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Estou certo de que aquele que começou boa obra em vós há de completá-la até o dia de Cristo Jesus. Paulo expressa sua confiança na perseverança final dos santos. A obra que Deus começa, ele mesmo a completa.",
      aplicacao: "Nossa segurança não está em nossa fidelidade, mas na fidelidade de Deus que completa o que começou."
    }
  ],
  "Filipenses 2:5-8": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Tende em vós o mesmo sentimento que houve também em Cristo Jesus, que, subsistindo em forma de Deus, não considerou o ser igual a Deus algo a que devia apegar-se, mas esvaziou-se a si mesmo, assumindo a forma de servo. O hino da encarnação celebra a humilhação voluntária de Cristo.",
      aplicacao: "A humildade de Cristo é o padrão para todas as nossas relações."
    }
  ],
  "Filipenses 4:6-7": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Não andeis ansiosos por coisa alguma; antes, em tudo, pela oração e súplica, com ação de graças, sejam conhecidas as vossas petições diante de Deus. E a paz de Deus, que excede todo entendimento, guardará os vossos corações e as vossas mentes em Cristo Jesus.",
      aplicacao: "O remédio para a ansiedade não é a ausência de problemas, mas a presença da paz de Deus."
    }
  ],
  "Filipenses 4:13": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Tudo posso naquele que me fortalece. Paulo declara sua suficiência em Cristo para enfrentar qualquer circunstância. Não é uma promessa de poder ilimitado para realizar qualquer desejo, mas de graça suficiente para cada situação.",
      aplicacao: "A força de Cristo é suficiente para cada circunstância que enfrentamos."
    }
  ],
  "Colossenses 1:15-17": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Ele é a imagem do Deus invisível, o primogênito de toda a criação; pois nele foram criadas todas as coisas, nos céus e na terra, visíveis e invisíveis. Ele é antes de todas as coisas, e nele tudo subsiste. Paulo exalta a supremacia e a suficiência de Cristo sobre toda a criação.",
      aplicacao: "Cristo não é apenas o Criador, mas também o sustentador de todo o universo."
    }
  ],
  "Colossenses 3:1-2": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Se fostes ressuscitados com Cristo, buscai as coisas do alto, onde Cristo está assentado à destra de Deus. Pensai nas coisas do alto, não nas que são da terra. A ressurreição com Cristo implica uma nova orientação de vida.",
      aplicacao: "A vida cristã é caracterizada por prioridades celestiais, não terrenas."
    }
  ],
  "1 Tessalonicenses 4:16-17": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "O Senhor mesmo descerá do céu com grande clamor, com voz de arcanjo e com trombeta de Deus, e os mortos em Cristo ressuscitarão primeiro. Depois, nós, os vivos, seremos arrebatados juntamente com eles nas nuvens, ao encontro do Senhor nos ares.",
      aplicacao: "A esperança da volta de Cristo é o consolo da igreja diante da morte."
    }
  ],
  "1 Tessalonicenses 5:16-18": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Regozijai-vos sempre. Orai sem cessar. Em tudo, dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco. Três mandamentos breves que resumem a vida cristã: alegria constante, oração contínua e gratidão em todas as circunstâncias.",
      aplicacao: "A gratidão não depende das circunstâncias, mas da vontade de Deus."
    }
  ],
  "1 Timóteo 2:5": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Há um só Deus e um só Mediador entre Deus e os homens, Cristo Jesus, homem. A unicidade de Deus exige unicidade de mediador. Cristo, verdadeiro Deus e verdadeiro homem, é o único que pode reconciliar-nos com Deus.",
      aplicacao: "Não precisamos de outros mediadores além de Cristo Jesus."
    }
  ],
  "2 Timóteo 1:7": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Deus não nos deu espírito de covardia, mas de poder, de amor e de moderação. Paulo encoraja Timóteo a não se envergonhar do evangelho. O espírito que Deus dá não produz medo, mas ousadia, amor e disciplina.",
      aplicacao: "O medo não vem de Deus; ele nos dá poder para testemunhar com coragem."
    }
  ],
  "2 Timóteo 3:16-17": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção, para a educação na justiça, a fim de que o homem de Deus seja perfeito e perfeitamente habilitado para toda boa obra. A doutrina da inspiração das Escrituras e sua utilidade prática para a vida cristã.",
      aplicacao: "A Bíblia é suficiente para nos equipar completamente para a vida que Deus nos chama a viver."
    }
  ],
  "Hebreus 1:1-2": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Havendo Deus, outrora, falado, muitas vezes e de muitas maneiras, aos pais, pelos profetas, nestes últimos dias, nos falou pelo Filho. A progressão da revelação divina culmina em Cristo. Ele é a palavra final e definitiva de Deus para a humanidade.",
      aplicacao: "Cristo é a revelação suprema e final de Deus."
    }
  ],
  "Hebreus 4:12": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "A palavra de Deus é viva, e eficaz, e mais cortante do que qualquer espada de dois gumes, e penetra até à divisão da alma e do espírito, e das juntas e medulas, e é apta para discernir os pensamentos e propósitos do coração. A Palavra de Deus não é um livro morto, mas viva e operante.",
      aplicacao: "A Palavra de Deus nos confronta, nos examina e nos transforma interiormente."
    }
  ],
  "Hebreus 11:1": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "A fé é a certeza de coisas que se esperam, a convicção de fatos que se não veem. Esta é a definição bíblica clássica da fé. Ela opera no presente em direção ao futuro e lida com realidades invisíveis.",
      aplicacao: "A fé não é crença sem evidência, mas confiança baseada na fidelidade de Deus."
    }
  ],
  "Hebreus 12:1-2": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Tendo tão grande nuvem de testemunhas ao nosso redor, desembaraçando-nos de todo peso e do pecado que tão de perto nos rodeia, corramos com perseverança a carreira que nos está proposta, olhando para Jesus, autor e consumador da fé.",
      aplicacao: "Para correr bem a vida cristã, precisamos olhar para Jesus, não para as circunstâncias."
    }
  ],
  "Hebreus 13:8": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Jesus Cristo é o mesmo ontem, hoje e eternamente. A imutabilidade de Cristo é a base de nossa confiança. Em um mundo de constantes mudanças, ele permanece o mesmo.",
      aplicacao: "Podemos confiar em Cristo porque ele não muda."
    }
  ],
  "Tiago 1:2-4": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Tende por motivo de grande alegria, meus irmãos, quando passardes por várias provações, sabendo que a provação da vossa fé produz perseverança; e a perseverança tenha a sua obra perfeita, para que sejais perfeitos e íntegros, em nada deficientes.",
      aplicacao: "As provações não são acidentes, mas instrumentos de Deus para nosso amadurecimento espiritual."
    }
  ],
  "Tiago 2:17": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "A fé, se não tiver obras, é morta em si mesma. Tiago não contradiz Paulo; ele complementa. A fé verdadeira é ativa e se manifesta em boas obras. Obras não salvam, mas evidenciam a fé salvadora.",
      aplicacao: "A fé genuína produz frutos visíveis de obediência."
    }
  ],
  "Tiago 4:6": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Deus resiste aos soberbos, mas dá graça aos humildes. O orgulho é o maior obstáculo à graça de Deus. A humildade é a porta para receber o favor divino.",
      aplicacao: "Quanto mais nos humilhamos diante de Deus, mais graça recebemos."
    }
  ],
  "1 Pedro 2:9": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Vós sois raça eleita, sacerdócio real, nação santa, povo de propriedade exclusiva de Deus, a fim de proclamardes as virtudes daquele que vos chamou das trevas para a sua maravilhosa luz. Pedro descreve a identidade e o propósito da igreja com linguagem do Antigo Testamento.",
      aplicacao: "A igreja é chamada das trevas para a luz com o propósito de proclamar as excelências de Deus."
    }
  ],
  "1 Pedro 5:7": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós. O convite é para transferir nossas preocupações para Deus. Ele não apenas pode, mas deseja cuidar de nós.",
      aplicacao: "Não fomos projetados para carregar o peso da ansiedade sozinhos."
    }
  ],
  "2 Pedro 1:20-21": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Nenhuma profecia da Escritura é de particular interpretação; porque nunca jamais qualquer profecia foi dada por vontade humana, mas homens santos falaram da parte de Deus movidos pelo Espírito Santo. A origem divina das Escrituras é a garantia de sua autoridade.",
      aplicacao: "A Bíblia não é produto da vontade humana, mas da inspiração divina."
    }
  ],
  "2 Pedro 3:9": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "O Senhor não retarda a sua promessa, como alguns a julgam demorada; mas é longânimo para convosco, não querendo que nenhum pereça, mas que todos cheguem ao arrependimento. A demora da volta de Cristo não é atraso, mas paciência divina para dar oportunidade ao arrependimento.",
      aplicacao: "Cada dia de espera é uma oportunidade para o arrependimento."
    }
  ],
  "1 João 1:5": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Deus é luz, e não há nele treva nenhuma. João resume o caráter moral de Deus. Luz representa pureza, verdade e santidade. Treva representa pecado, ignorância e maldade.",
      aplicacao: "Andar na luz significa viver em verdade, pureza e comunhão com Deus."
    }
  ],
  "1 João 1:9": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça. A confissão é o caminho para o perdão. Deus não apenas perdoa, mas também purifica.",
      aplicacao: "A confissão sincera é sempre recebida pelo perdão fiel de Deus."
    }
  ],
  "1 João 4:8": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Aquele que não ama não conhece a Deus, porque Deus é amor. João não diz que Deus tem amor, mas que ele é amor. O amor não é um atributo entre outros, mas a essência do caráter divino.",
      aplicacao: "O amor não é apenas o que Deus faz, mas quem Deus é."
    }
  ],
  "1 João 5:11-12": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Deus nos deu a vida eterna, e esta vida está no seu Filho. Quem tem o Filho tem a vida; quem não tem o Filho de Deus não tem a vida. A vida eterna não é uma possessão separada de Cristo; ela está nele.",
      aplicacao: "A vida eterna não é algo que recebemos de Cristo; é a própria vida de Cristo em nós."
    }
  ],
  "Apocalipse 1:3": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Bem-aventurado aquele que lê e bem-aventurados os que ouvem as palavras desta profecia e guardam as coisas que nela estão escritas, porque o tempo está próximo. O livro do Apocalipse não é para curiosidade, mas para obediência.",
      aplicacao: "A bênção prometida não é para quem especula sobre o futuro, mas para quem guarda a palavra."
    }
  ],
  "Apocalipse 21:1": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Vi novo céu e nova terra, porque o primeiro céu e a primeira terra passaram, e o mar já não existe. João contempla a consumação final de todas as coisas. A criação será renovada, e a habitação de Deus será com os homens.",
      aplicacao: "Nossa esperança não está na destruição do mundo, mas na sua renovação gloriosa."
    }
  ],
  "Apocalipse 22:20": [
    {
      autor: "Matthew Henry",
      titulo: "Comentário Bíblico",
      conteudo: "Aquele que dá testemunho destas coisas diz: Certamente venho sem demora. Amém. Vem, Senhor Jesus! A última palavra da Bíblia é uma promessa e uma oração. Cristo promete voltar, e a igreja responde com anseio.",
      aplicacao: "A vida da igreja é marcada pela expectativa vigilante da volta de Cristo."
    }
  ],
};

export function getCommentaries(livro: string, capitulo: number, versiculo: number): Comentario[] {
  const key = `${livro} ${capitulo}:${versiculo}`;
  return COMMENTARIES[key] || [];
}
