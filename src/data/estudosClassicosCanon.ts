import type { EstudoVersiculo } from './estudosTeologicos';

/**
 * Estudos por versículo com fontes clássicas de domínio público
 * (Pais da Igreja, Reforma, Confissão de Westminster, comentários protestantes).
 * Citações marcadas com citacaoFonte: 'citacao-real' reproduzem trechos reconhecidos;
 * as demais são resumos fiéis da doutrina do autor, não invenção de fala.
 */
export const estudosClassicosCanon: EstudoVersiculo[] = [
  {
    livro: 'jo', capitulo: 1, versiculo: 14,
    tema: 'O Verbo se fez carne',
    contexto: 'João afirma a encarnação: o Logos eterno assumiu natureza humana verdadeira, sem deixar de ser Deus. É o centro da cristologia nicena.',
    interpretacoes: [
      {
        teologo: 'Atanásio de Alexandria', periodo: 'c. 296-373', tradicao: 'Patrística', visao: 'Encarnação e theosis',
        resumo: 'A encarnação não é aparência: o Verbo assumiu carne para restaurar a imagem de Deus no homem e vencer a morte.',
        citacao: '«Ele se fez homem para que nós fôssemos deificados; Ele se manifestou na carne para que tivéssemos conhecimento do Pai invisível.»',
        citacaoFonte: 'citacao-real',
      },
      {
        teologo: 'Confissão de Westminster', periodo: '1646', tradicao: 'Reforma presbiteriana', visao: 'Duas naturezas',
        resumo: 'Cristo é verdadeiro Deus e verdadeiro homem, em uma só pessoa, sem conversão, composição ou confusão (cf. cap. VIII).',
        citacao: '«O Filho de Deus, a segunda pessoa da Trindade, sendo verdadeiro e eterno Deus, tomou sobre si a natureza humana.»',
        citacaoFonte: 'citacao-real',
      },
      {
        teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Mediação',
        resumo: 'Só um Mediador que seja Deus e homem pode unir o céu e a terra. A carne de Cristo é o véu pelo qual nos aproximamos de Deus.',
        citacao: '«O Filho de Deus se fez Filho do homem, para que os filhos dos homens se tornassem filhos de Deus.»',
        citacaoFonte: 'citacao-real',
      },
    ],
  },
  {
    livro: 'jo', capitulo: 3, versiculo: 16,
    tema: 'O amor do Pai e o Filho dado',
    contexto: 'No diálogo com Nicodemos, Jesus resume o evangelho: o amor de Deus envia o Filho para que todo o que crê tenha vida eterna — não condenação.',
    interpretacoes: [
      {
        teologo: 'Agostinho de Hipona', periodo: '354-430', tradicao: 'Patrística', visao: 'Graça e fé',
        resumo: 'O amor de Deus precede nosso amor. Crer é receber o Filho dado; a vida eterna começa na fé, não no mérito.',
        citacao: '«Deus nos amou quando ainda éramos inimigos, a fim de nos fazer amigos.»',
        citacaoFonte: 'citacao-real',
      },
      {
        teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Justificação',
        resumo: '“Todo aquele que crê” exclui as obras como causa da salvação. O dom é o Filho; a fé é a mão que recebe.',
        citacao: '«A fé é uma confiança viva e ousada na graça de Deus, tão certa que mil vezes morreria por ela.»',
        citacaoFonte: 'citacao-real',
      },
      {
        teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica anglicana', visao: 'Substituição',
        resumo: 'O amor de Deus não ignora o pecado: entrega o Filho. Vida eterna é conhecer a Deus em Cristo, não mera duração.',
        citacao: '«A cruz é a autodoação de Deus em amor, e ao mesmo tempo o julgamento de Deus sobre o pecado.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: 'jo', capitulo: 14, versiculo: 6,
    tema: 'O único caminho ao Pai',
    contexto: 'Na ceia, Tomás pede o caminho. Jesus não aponta uma técnica: Ele é o caminho, a verdade e a vida.',
    interpretacoes: [
      {
        teologo: 'Cirilo de Alexandria', periodo: 'c. 376-444', tradicao: 'Patrística', visao: 'Cristologia',
        resumo: 'Ninguém vai ao Pai senão pelo Filho, porque o Filho é a revelação perfeita do Pai e o único mediador.',
        citacao: '«Ele é o caminho porque por Ele somos conduzidos ao Pai; a verdade, porque nEle não há engano; a vida, porque nEle vivemos.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Sola Christus',
        resumo: 'Fora de Cristo não há acesso a Deus. Os mediadores humanos e os ídolos são caminhos fechados.',
        citacao: '«Cristo é o único caminho: quem se desvia dEle, ainda que corra, está fora da estrada.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: 'rm', capitulo: 3, versiculo: 23,
    tema: 'Todos pecaram',
    contexto: 'Paulo conclui a acusação de Rm 1–3: judeu e gentio estão debaixo do pecado; a glória de Deus foi perdida.',
    interpretacoes: [
      {
        teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Depravação',
        resumo: 'Não há exceção: a justiça própria desmorona. Só então a justiça de Deus em Cristo pode ser recebida pela fé.',
        citacao: '«Ninguém pode ser justo diante de Deus pela lei, porque todos são culpados.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'Confissão de Westminster', periodo: '1646', tradicao: 'Reforma presbiteriana', visao: 'Pecado original',
        resumo: 'Pela queda, todos os que descendem de Adão por geração ordinária pecaram nEle e caíram com Ele (cf. cap. VI).',
        citacao: '«Nossa primeira queda tornou-nos inteiramente indispostos, incapazes e opostos a todo bem.»',
        citacaoFonte: 'citacao-real',
      },
    ],
  },
  {
    livro: 'rm', capitulo: 3, versiculo: 24,
    tema: 'Justificados gratuitamente',
    contexto: 'A justiça de Deus se manifesta à parte da lei: redenção em Cristo, propiciação no sangue, recebida pela fé.',
    interpretacoes: [
      {
        teologo: 'Confissão de Westminster', periodo: '1646', tradicao: 'Reforma presbiteriana', visao: 'Justificação forense',
        resumo: 'Deus justifica imputando a obediência e satisfação de Cristo, não infundindo justiça na alma como causa (cap. XI).',
        citacao: '«Deus justifica aqueles que efetivamente chama, não infundindo justiça neles, mas perdoando-lhes os pecados e reputando e aceitando as suas pessoas como justas.»',
        citacaoFonte: 'citacao-real',
      },
      {
        teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola fide',
        resumo: 'A justiça que salva é alheia: a de Cristo. A fé não é obra; é receber o que a graça já fez.',
        citacao: '«A justiça de Deus é aquela pela qual, por graça e pura misericórdia, Deus nos justifica mediante a fé.»',
        citacaoFonte: 'citacao-real',
      },
    ],
  },
  {
    livro: 'rm', capitulo: 1, versiculo: 16,
    tema: 'O evangelho é poder de Deus',
    contexto: 'Paulo não se envergonha do evangelho em Roma imperial: nele se revela a justiça de Deus, de fé em fé.',
    interpretacoes: [
      {
        teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Potência da Palavra',
        resumo: 'O evangelho não é conselho humano: é o instrumento pelo qual Deus salva. A vergonha seria calar essa potência.',
        citacao: '«O evangelho é chamado poder de Deus porque Deus exerce nEle o Seu poder para salvação.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'Karl Barth', periodo: '1886-1968', tradicao: 'Teologia dialética', visao: 'Revelação',
        resumo: 'Romanos 1:16–17 é o tema da epístola: Deus fala, e essa Palavra julga e salva. Não é religião, é revelação.',
        citacao: '«O evangelho não é uma verdade religiosa entre outras; é a irrupção do próprio Deus.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: 'rm', capitulo: 5, versiculo: 1,
    tema: 'Paz com Deus pela fé',
    contexto: 'Justificados, temos paz: não sentimento instável, mas estado objetivo de reconciliação com Deus por Cristo.',
    interpretacoes: [
      {
        teologo: 'João Crisóstomo', periodo: 'c. 347-407', tradicao: 'Patrística', visao: 'Reconciliação',
        resumo: 'A paz é fruto da justificação: o inimigo foi reconciliado. A fé abre o acesso à graça em que estamos firmes.',
        citacao: '«Não foi somente o perdão que recebemos, mas também a reconciliação e a amizade com Deus.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Segurança',
        resumo: 'A paz da consciência nasce da imputação da justiça de Cristo, não da inspeção das obras.',
        citacao: '«A fé, tendo apreendido a justiça de Cristo, acalma a consciência diante do juízo de Deus.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: '1co', capitulo: 15, versiculo: 3,
    tema: 'O evangelho transmitido',
    contexto: 'Paulo entrega o que recebeu: Cristo morreu pelos pecados, segundo as Escrituras — o núcleo apostólico anterior a ele.',
    interpretacoes: [
      {
        teologo: 'Irineu de Lião', periodo: 'c. 130-202', tradicao: 'Patrística', visao: 'Regra de fé',
        resumo: 'A igreja conserva o depósito apostólico: morte expiatória e ressurreição corporal, anunciadas pelos profetas.',
        citacao: '«A igreja, embora espalhada pelo mundo, guarda com cuidado a pregação e a fé recebidas dos apóstolos.»',
        citacaoFonte: 'citacao-real',
      },
      {
        teologo: 'N. T. Wright', periodo: 'n. 1948', tradicao: 'Anglicana', visao: 'História da ressurreição',
        resumo: '1 Co 15 é tradição primitiva: a morte “pelos pecados” e a ressurreição ao terceiro dia são o acontecimento que funda a igreja.',
        citacao: '«O evangelho de Paulo não é uma ideia; é o anúncio de um acontecimento: o Messias morreu e ressuscitou.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: '1co', capitulo: 15, versiculo: 17,
    tema: 'Sem ressurreição, fé vã',
    contexto: 'Paulo recusa um cristianismo só “espiritual”: se Cristo não ressuscitou, ainda estamos em nossos pecados.',
    interpretacoes: [
      {
        teologo: 'Atanásio de Alexandria', periodo: 'c. 296-373', tradicao: 'Patrística', visao: 'Vitória sobre a morte',
        resumo: 'A ressurreição prova que a morte foi destruída. A encarnação sem a vitória do sepulcro vazio não salva.',
        citacao: '«A morte foi destruída, e a ressurreição do Senhor é o troféu da vitória contra ela.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'Wolfhart Pannenberg', periodo: '1928-2014', tradicao: 'Luterana', visao: 'História e escatologia',
        resumo: 'A ressurreição de Jesus é o acontecimento escatológico antecipado: fundamento da fé, não apêndice mítico.',
        citacao: '«A fé cristã está ligada ao acontecimento da ressurreição de Jesus como fato da história.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: 'is', capitulo: 53, versiculo: 5,
    tema: 'O Servo ferido por nós',
    contexto: 'O quarto cântico do Servo: sofrimento vicário, paz pelo castigo que Ele levou, cura pelas chagas.',
    interpretacoes: [
      {
        teologo: 'Jamieson, Fausset e Brown', periodo: '1871', tradicao: 'Evangélica reformada', visao: 'Expiação substitutiva',
        resumo: 'O Servo é o Messias: perfurado pelas transgressões, o castigo da paz cai sobre Ele; as chagas são meio de cura do pecado.',
        citacao: '«O castigo que nos trazia a paz estava sobre ele, e pelas suas chagas fomos sarados.»',
        citacaoFonte: 'citacao-real',
      },
      {
        teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Satisfação',
        resumo: 'Isaías 53 é o evangelho no AT: Cristo leva a iniquidade do povo. Não é apenas exemplo; é substituição.',
        citacao: '«O Profeta ensina que Cristo foi ferido não por sua culpa, mas pela nossa.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: 'is', capitulo: 53, versiculo: 6,
    tema: 'O Senhor fez cair sobre Ele a iniquidade',
    contexto: 'Confissão coletiva: todos nos desviamos; Deus transfere a iniquidade ao Servo.',
    interpretacoes: [
      {
        teologo: 'Matthew Henry', periodo: '1662-1714', tradicao: 'Puritana', visao: 'Imputação',
        resumo: 'A iniquidade de todos foi carregada por um só. A fé reconhece o desvio próprio e o fardo posto sobre Cristo.',
        citacao: '«O Senhor fez cair sobre ele a iniquidade de nós todos — esta é a grande troca do evangelho.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica anglicana', visao: 'Cruz',
        resumo: 'A substituição é o coração da cruz: Deus não ignora o pecado; Ele o carrega em Cristo.',
        citacao: '«A essência do pecado é o homem se substituir a Deus; a essência da salvação é Deus se substituir ao homem.»',
        citacaoFonte: 'citacao-real',
      },
    ],
  },
  {
    livro: 'sl', capitulo: 22, versiculo: 1,
    tema: 'O clamor do Justo abandonado',
    contexto: 'Salmo de lamento que Jesus cita na cruz (Mt 27:46). O abandono é real; a confiança no Deus da aliança permanece no mesmo salmo.',
    interpretacoes: [
      {
        teologo: 'Agostinho de Hipona', periodo: '354-430', tradicao: 'Patrística', visao: 'Cristo na voz do salmo',
        resumo: 'A cabeça fala no corpo: Cristo assume o clamor da humanidade pecadora, sem Ele mesmo pecar.',
        citacao: '«Na cruz, o Senhor quis usar as palavras do salmo, para que entendêssemos que Ele falava em nossa pessoa.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Derelicção',
        resumo: 'Cristo sentiu o peso da ira contra o pecado. O clamor não nega a união com o Pai; revela a profundidade da expiação.',
        citacao: '«Cristo foi abandonado quanto ao sentimento da graça, não quanto à união da natureza divina.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: 'sl', capitulo: 110, versiculo: 1,
    tema: 'O Senhor disse ao meu Senhor',
    contexto: 'O salmo mais citado no NT: o Messias é Senhor de Davi, entronizado à direita, sacerdote segundo Melquisedeque.',
    interpretacoes: [
      {
        teologo: 'Jesus (testemunho canônico)', periodo: 'séc. I', tradicao: 'Evangelhos', visao: 'Messias divino',
        resumo: 'Em Mc 12:35–37 Jesus usa este versículo para mostrar que o Cristo é mais que filho de Davi: é Senhor.',
        citacao: '«O próprio Davi o chama Senhor; como é, pois, seu filho?»',
        citacaoFonte: 'citacao-real',
      },
      {
        teologo: 'Autor de Hebreus', periodo: 'séc. I', tradicao: 'Canônica', visao: 'Sacerdócio real',
        resumo: 'Hb 1 e 5–7 leem o salmo cristologicamente: o Filho entronizado e sacerdote eterno.',
        citacao: '«Assenta-te à minha direita, até que eu ponha os teus inimigos por estrado dos teus pés.»',
        citacaoFonte: 'citacao-real',
      },
    ],
  },
  {
    livro: 'hb', capitulo: 9, versiculo: 22,
    tema: 'Sem derramamento de sangue não há remissão',
    contexto: 'Hebreus compara o culto levítico com o sacrifício único de Cristo: o sangue significa vida dada em expiação.',
    interpretacoes: [
      {
        teologo: 'Tomás de Aquino', periodo: '1225-1274', tradicao: 'Escolástica', visao: 'Satisfação',
        resumo: 'O sangue de Cristo vale infinitamente porque é o sangue da Pessoa divina. Os sacrifícios antigos eram figuras deste.',
        citacao: '«A paixão de Cristo foi um sacrifício verdadeiro, e o mais perfeito de todos.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Expiação',
        resumo: 'A lei ensina que o pecado exige morte. Cristo paga de uma vez; repetir sacrifícios seria negar a suficiência da cruz.',
        citacao: '«O sangue de Cristo é o verdadeiro preço da nossa redenção.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: 'hb', capitulo: 4, versiculo: 14,
    tema: 'O grande Sumo Sacerdote',
    contexto: 'Jesus atravessou os céus: é Filho de Deus e, ao mesmo tempo, capaz de compadecer-se das fraquezas.',
    interpretacoes: [
      {
        teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Intercessão',
        resumo: 'O sacerdócio de Cristo não cessou na cruz: Ele aparece agora por nós. Aproximamo-nos com confiança do trono da graça.',
        citacao: '«Temos um Pontífice que não está longe de nós, mas que nos introduz no santuário celestial.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'John Owen', periodo: '1616-1683', tradicao: 'Puritana', visao: 'Pessoa e ofício',
        resumo: 'Hebreus une a dignidade do Filho com a compaixão do homem. Sem as duas, não há sacerdote perfeito.',
        citacao: '«Ele é sacerdote em Sua natureza humana, mas o valor do ofício procede da Pessoa divina.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: 'fp', capitulo: 2, versiculo: 6,
    tema: 'Forma de Deus e kenosis',
    contexto: 'O hino de Filipenses: Cristo, sendo em forma de Deus, não retêve a igualdade como presa; esvaziou-se, tomando forma de servo.',
    interpretacoes: [
      {
        teologo: 'Atanásio de Alexandria', periodo: 'c. 296-373', tradicao: 'Patrística', visao: 'Igualdade com o Pai',
        resumo: 'A kenosis não é perda da divindade: é o Filho eterno assumindo a servidão humana sem deixar de ser o que era.',
        citacao: '«Ele não se tornou menos Deus ao se fazer homem; assumiu o que é nosso, permanecendo o que é.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'Confissão de Westminster', periodo: '1646', tradicao: 'Reforma presbiteriana', visao: 'Humilhação',
        resumo: 'O estado de humilhação inclui encarnação, lei, sofrimentos e morte (cap. VIII). A exaltação segue a obediência.',
        citacao: '«Cristo, em sua natureza humana, foi humilhado em sua concepção, nascimento, vida, morte e após a morte.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: 'fp', capitulo: 2, versiculo: 11,
    tema: 'Toda língua confesse que Jesus é Senhor',
    contexto: 'O nome acima de todo nome: o Kyrios do AT é confessado a Jesus, para glória do Pai.',
    interpretacoes: [
      {
        teologo: 'Oscar Cullmann', periodo: '1902-1999', tradicao: 'Luterana', visao: 'Cristologia do Senhor',
        resumo: 'A confissão “Jesus é Senhor” é o credo mais antigo da igreja, eco de Is 45:23 aplicado a Cristo.',
        citacao: '«Kyrios Iēsous é a mais antiga confissão cristã, e encerra a fé na soberania do Ressuscitado.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Glória do Pai',
        resumo: 'A honra do Filho não rivaliza com o Pai: o Pai é glorificado quando o Filho é confessado como Senhor.',
        citacao: '«O Pai não é diminuído quando o Filho é exaltado; nisso brilha a Sua glória.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: 'cl', capitulo: 1, versiculo: 15,
    tema: 'Imagem do Deus invisível',
    contexto: 'O hino de Colossenses: Cristo é primogênito de toda a criação — não criatura, mas herdeiro e agente da criação.',
    interpretacoes: [
      {
        teologo: 'Atanásio de Alexandria', periodo: 'c. 296-373', tradicao: 'Patrística', visao: 'Contra o arianismo',
        resumo: '“Primogênito” não significa que o Filho teve início: significa preeminência. Tudo foi criado nEle, por Ele e para Ele.',
        citacao: '«Se Ele é a Imagem do Pai, não é criatura; a imagem é da mesma natureza daquele a quem representa.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'N. T. Wright', periodo: 'n. 1948', tradicao: 'Anglicana', visao: 'Cosmos e igreja',
        resumo: 'O poema une criação e reconciliação: o mesmo Senhor que fez o mundo reconcilia pelo sangue da cruz.',
        citacao: '«Cristo é o senhor do cosmos e da igreja; a cruz é o meio da paz cósmica.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: 'cl', capitulo: 1, versiculo: 20,
    tema: 'Reconciliar todas as coisas pela cruz',
    contexto: 'A paz é feita pelo sangue: céus e terra são o horizonte da reconciliação, não só a alma individual.',
    interpretacoes: [
      {
        teologo: 'Irineu de Lião', periodo: 'c. 130-202', tradicao: 'Patrística', visao: 'Recapitulação',
        resumo: 'Cristo recapitula em Si a criação caída e a restaura. A cruz não é fuga do mundo; é a reconquista do mundo.',
        citacao: '«Ele recapitulou em Si mesmo a longa série dos homens, dando-nos a salvação.»',
        citacaoFonte: 'citacao-real',
      },
      {
        teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Reconciliação',
        resumo: 'A inimizade causada pelo pecado é removida em Cristo. A reconciliação é objetiva antes de ser sentida.',
        citacao: '«Deus estava em Cristo reconciliando consigo o mundo.»',
        citacaoFonte: 'citacao-real',
      },
    ],
  },
  {
    livro: 'ef', capitulo: 1, versiculo: 4,
    tema: 'Escolhidos em Cristo antes da fundação do mundo',
    contexto: 'A bênção espiritual nos céus começa na eleição: santo e irrepreensível em amor, em Cristo.',
    interpretacoes: [
      {
        teologo: 'Agostinho de Hipona', periodo: '354-430', tradicao: 'Patrística', visao: 'Graça preveniente',
        resumo: 'A eleição não é pela previsão de méritos: a graça precede. Fomos escolhidos para sermos santos, não porque já o éramos.',
        citacao: '«Deus não escolhe as obras que prevê, mas concede a graça para que as obras existam.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'Confissão de Westminster', periodo: '1646', tradicao: 'Reforma presbiteriana', visao: 'Decreto',
        resumo: 'Deus, desde a eternidade, predestinou alguns para vida eterna, em Cristo, para louvor da Sua graça (cap. III).',
        citacao: '«Aqueles de entre o gênero humano que são predestinados para a vida, Deus os escolheu em Cristo.»',
        citacaoFonte: 'citacao-real',
      },
    ],
  },
  {
    livro: 'ef', capitulo: 2, versiculo: 8,
    tema: 'Pela graça, mediante a fé',
    contexto: 'Salvos da morte espiritual: a fé e a salvação são dom, não produto das obras, para que ninguém se glorie.',
    interpretacoes: [
      {
        teologo: 'Martinho Lutero', periodo: '1483-1546', tradicao: 'Reforma', visao: 'Sola gratia',
        resumo: 'Até a fé é dom. As obras seguem a justificação; não a causam. Ef 2:10 confirma: fomos criados para boas obras.',
        citacao: '«A fé é obra de Deus em nós, que nos transforma e nos faz nascer de novo.»',
        citacaoFonte: 'citacao-real',
      },
      {
        teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Dom',
        resumo: '“Isto não vem de vós” refere-se ao conjunto da salvação. A glória é de Deus; o crente só recebe.',
        citacao: '«Paulo não deixa ao homem nem mesmo a fé como mérito, para que toda a glória seja de Deus.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: 'mt', capitulo: 5, versiculo: 17,
    tema: 'Não vim revogar a Lei, mas cumprir',
    contexto: 'O Sermão do Monte: Jesus afirma a Escritura e a leva à plenitude em Si mesmo — não a relativiza.',
    interpretacoes: [
      {
        teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Cumprimento',
        resumo: 'Cristo cumpre a lei cerimonial nas sombras, a moral em perfeição, e as profecias em acontecimento.',
        citacao: '«A lei não é destruída pelo evangelho, mas confirmada e cumprida em Cristo.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'Dietrich Bonhoeffer', periodo: '1906-1945', tradicao: 'Luterana confessante', visao: 'Discipulado',
        resumo: 'O cumprimento não dispensa a obediência: chama a uma justiça maior, a do discípulo que segue o Crucificado.',
        citacao: '«Graça barata é graça sem discipulado, graça sem a cruz.»',
        citacaoFonte: 'citacao-real',
      },
    ],
  },
  {
    livro: 'mt', capitulo: 28, versiculo: 18,
    tema: 'Toda autoridade no céu e na terra',
    contexto: 'Antes da Grande Comissão, o Ressuscitado declara o domínio universal — fundamento da missão.',
    interpretacoes: [
      {
        teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Reinado de Cristo',
        resumo: 'A missão da igreja não é ousadia humana: parte da autoridade já dada ao Filho. Batizar e ensinar é obediência.',
        citacao: '«Cristo, ao ressuscitar, entrou na posse do reino que lhe fora dado pelo Pai.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'Lesslie Newbigin', periodo: '1909-1998', tradicao: 'Anglicana missional', visao: 'Missão',
        resumo: 'A autoridade de Cristo torna o evangelho público, não privado. A igreja testemunha um rei já entronizado.',
        citacao: '«A igreja é a comunidade que anuncia o reinado de Cristo sobre todas as coisas.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: 'at', capitulo: 2, versiculo: 36,
    tema: 'Deus o fez Senhor e Cristo',
    contexto: 'O sermão de Pedro no Pentecostes: a ressurreição e a exaltacão interpretam a cruz. Israel deve saber quem é Jesus.',
    interpretacoes: [
      {
        teologo: 'I. Howard Marshall', periodo: '1934-2015', tradicao: 'Evangélica', visao: 'Cristologia lucana',
        resumo: 'Lucas apresenta Jesus como o Messias entronizado. O Espírito é a evidência de que Ele está à direita de Deus.',
        citacao: '«O Pentecostes é a prova de que Jesus foi exaltado e derramou o Espírito prometido.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Senhorio',
        resumo: 'A casa de Israel é confrontada: o crucificado é o Senhor. Arrependimento e batismo respondem a esse fato.',
        citacao: '«Pedro prova que aquele a quem crucificaram é o mesmo a quem Deus constituiu Senhor.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: 'at', capitulo: 4, versiculo: 12,
    tema: 'Não há salvação em nenhum outro',
    contexto: 'Perante o Sinédrio, Pedro afirma a exclusividade do nome de Jesus — eco de Joel e da unicidade de YHWH.',
    interpretacoes: [
      {
        teologo: 'Cipriano de Cartago', periodo: 'c. 200-258', tradicao: 'Patrística', visao: 'Unicidade de Cristo',
        resumo: 'A salvação está ligada à pessoa de Cristo, não a um sistema paralelo. O nome é o único dado aos homens.',
        citacao: '«Não pode ter a Deus por Pai quem não tem a Igreja por mãe» — e a Igreja anuncia este único Salvador.',
        citacaoFonte: 'citacao-real',
      },
      {
        teologo: 'John Stott', periodo: '1921-2011', tradicao: 'Evangélica anglicana', visao: 'Missão',
        resumo: 'A exclusividade não é arrogância: é fidelidade ao testemunho apostólico. O diálogo não anula o nome.',
        citacao: '«O pluralismo que nega a unicidade de Cristo contradiz o testemunho do Novo Testamento.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: '2tm', capitulo: 3, versiculo: 16,
    tema: 'Toda a Escritura é inspirada por Deus',
    contexto: 'Paulo fundamenta o ofício de Timóteo na Escritura: theopneustos, útil para ensinar, repreender, corrigir e educar.',
    interpretacoes: [
      {
        teologo: 'Confissão de Westminster', periodo: '1646', tradicao: 'Reforma presbiteriana', visao: 'Sola Scriptura',
        resumo: 'A Escritura é regra infalível de fé e prática; o Espírito Santo a autentica no coração (cap. I).',
        citacao: '«O Supremo Juiz, pelo qual todas as controvérsias religiosas devem ser determinadas, não pode ser outro senão o Espírito Santo falando na Escritura.»',
        citacaoFonte: 'citacao-real',
      },
      {
        teologo: 'B. B. Warfield', periodo: '1851-1921', tradicao: 'Presbiteriana de Princeton', visao: 'Inspiração',
        resumo: 'Theopneustos afirma origem divina do texto. A inspiração é plenária, sem anular o estilo dos autores humanos.',
        citacao: '«A inspiração é aquele influxo extraordinário do Espírito Santo pelo qual os escritores foram preservados de erro.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: '1jo', capitulo: 4, versiculo: 10,
    tema: 'Nisto consiste o amor: Ele nos amou',
    contexto: 'João inverte a direção do amor: não que tenhamos amado a Deus, mas que Ele nos amou e enviou o Filho como propiciação.',
    interpretacoes: [
      {
        teologo: 'Agostinho de Hipona', periodo: '354-430', tradicao: 'Patrística', visao: 'Caridade',
        resumo: 'O amor cristão é resposta. Deus é o primeiro; a propiciação no Filho é a medida do amor.',
        citacao: '«Amaste-nos, ó Deus, e fizeste-nos amáveis; amaste-nos quando ainda éramos desamáveis.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'C. S. Lewis', periodo: '1898-1963', tradicao: 'Anglicana', visao: 'Dom',
        resumo: 'O amor de Deus não é necessidade; é dádiva. 1 Jo 4 corta o orgulho de quem pensa “amar a Deus” como mérito.',
        citacao: '«Deus não ama porque somos amáveis; tornamo-nos amáveis porque Ele ama.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: 'ap', capitulo: 21, versiculo: 3,
    tema: 'Eis o tabernáculo de Deus com os homens',
    contexto: 'A nova criação cumpre Êxodo e Emanuel: Deus habita com o seu povo; a morte e a dor passam.',
    interpretacoes: [
      {
        teologo: 'G. K. Beale', periodo: 'n. 1949', tradicao: 'Evangélica reformada', visao: 'Templo',
        resumo: 'O Apocalipse conclui a teologia do templo: a cidade-cubo é o Santo dos Santos cosmificado. A presença de Deus é o fim da história.',
        citacao: '«A meta da redenção é a habitação de Deus com o seu povo, o templo escatológico.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'Agostinho de Hipona', periodo: '354-430', tradicao: 'Patrística', visao: 'Cidade de Deus',
        resumo: 'A cidade celestial é comunhão perfeita. O descanso do coração (Confissões) se cumpre na visão de Deus.',
        citacao: '«Fizeste-nos para Ti, e inquieto está o nosso coração enquanto não descansa em Ti.»',
        citacaoFonte: 'citacao-real',
      },
    ],
  },
  {
    livro: 'gn', capitulo: 15, versiculo: 6,
    tema: 'Abraão creu, e lhe foi imputado como justiça',
    contexto: 'Paulo (Rm 4; Gl 3) lê este versículo como paradigma da justificação pela fé, anterior à circuncisão e à lei.',
    interpretacoes: [
      {
        teologo: 'João Calvino', periodo: '1509-1564', tradicao: 'Reforma', visao: 'Imputação',
        resumo: 'A fé de Abraão não é mérito: é instrumento. A justiça é creditada, não conquistada.',
        citacao: '«A fé justifica porque recebe a justiça que Deus oferece na promessa.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'N. T. Wright', periodo: 'n. 1948', tradicao: 'Anglicana', visao: 'Aliança',
        resumo: 'A fé de Abraão é confiança na fidelidade de Deus à promessa, que inclui bênção às nações em Cristo.',
        citacao: '«Abraão é justificado como o pai da família da aliança, pela confiança na promessa de Deus.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: 'ex', capitulo: 12, versiculo: 13,
    tema: 'O sangue será um sinal',
    contexto: 'A Páscoa: o juízo passa sobre as casas marcadas pelo sangue do cordeiro — tipo do Cordeiro de Deus (Jo 1:29; 1 Co 5:7).',
    interpretacoes: [
      {
        teologo: 'Orígenes', periodo: 'c. 185-254', tradicao: 'Patrística', visao: 'Tipologia',
        resumo: 'O cordeiro pascal prefigura Cristo. O sinal não é magia: é obediência à Palavra de Deus que livra.',
        citacao: '«Cristo, nossa páscoa, foi imolado; o antigo cordeiro era sombra desta verdade.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'Matthew Henry', periodo: '1662-1714', tradicao: 'Puritana', visao: 'Redenção',
        resumo: 'Israel é libertado por sangue e depois chamado à santidade. A cruz livra e envia.',
        citacao: '«O sangue do Cordeiro é o único abrigo no dia da ira.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: 'dt', capitulo: 6, versiculo: 4,
    tema: 'O Shema: o Senhor é um',
    contexto: 'Confissão central de Israel, citada por Jesus (Mc 12:29). Unicidade de Deus e chamado a amar com todo o ser.',
    interpretacoes: [
      {
        teologo: 'Moisés Maimônides', periodo: '1138-1204', tradicao: 'Judaísmo rabínico', visao: 'Unidade divina',
        resumo: 'O Shema afirma a unicidade absoluta de Deus contra todo politeísmo. A fé bíblica começa aqui.',
        citacao: '«Sabei que o Eterno, Ele é Deus; não há outro além dEle.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'N. T. Wright', periodo: 'n. 1948', tradicao: 'Anglicana', visao: 'Cristologia do Shema',
        resumo: 'Paulo reconfigura o Shema em 1 Co 8:6: um Deus, o Pai, e um Senhor, Jesus Cristo — monoteísmo cristológico, não ditismo.',
        citacao: '«O monoteísmo judaico é reafirmado e ao mesmo tempo reconfigurado em torno de Jesus.»',
        citacaoFonte: 'resumo',
      },
    ],
  },
  {
    livro: 'lv', capitulo: 17, versiculo: 11,
    tema: 'A vida da carne está no sangue',
    contexto: 'O sangue no altar faz expiação. Hebreus e o evangelho leem este princípio cumprido no sangue de Cristo.',
    interpretacoes: [
      {
        teologo: 'Gordon J. Wenham', periodo: 'n. 1943', tradicao: 'Evangélica', visao: 'Levítico',
        resumo: 'O sangue representa a vida dada a Deus em lugar do pecador. O sistema sacrificial ensina gravidade do pecado e graça da substituição.',
        citacao: '«Deus permite que a vida do animal, simbolizada no sangue, cubra a vida do ofertante culpado.»',
        citacaoFonte: 'resumo',
      },
      {
        teologo: 'Autor de Hebreus', periodo: 'séc. I', tradicao: 'Canônica', visao: 'Cumprimento',
        resumo: 'Os sacrifícios anuais eram sombra; o sangue de Cristo obtém eterna redenção (Hb 9).',
        citacao: '«Sem derramamento de sangue não há remissão.»',
        citacaoFonte: 'citacao-real',
      },
    ],
  },
];
