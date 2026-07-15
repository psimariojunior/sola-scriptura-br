export interface Comentario {
  livro: string;
  capitulo: number;
  versiculo: number;
  autor: string;
  texto: string;
  tipo: 'historico' | 'teologico' | 'gramatical' | 'cultural' | 'aplicacao' | 'escatologico';
}

const comentarios: Record<string, Comentario[]> = {};

function chave(livro: string, capitulo: number, versiculo: number): string {
  return `${livro}:${capitulo}:${versiculo}`;
}

function add(livro: string, cap: number, v: number, autor: string, texto: string, tipo: Comentario['tipo']) {
  const k = chave(livro, cap, v);
  if (!comentarios[k]) comentarios[k] = [];
  comentarios[k].push({ livro, capitulo: cap, versiculo: v, autor, texto, tipo });
}

// GÊNESIS (25+ versículos)
add('gn', 1, 1, 'Calvino', 'No princípio Deus criou — Esta frase estabelece a soberania de Deus como Criador de todas as coisas. O hebraico «bereshit» indica o início absoluto da criação.', 'teologico');
add('gn', 1, 1, 'Matthew Henry', 'Deus criou os céus e a terra — Não há explicação sobre a existência de Deus; Ele é pressuposto como o primeiro princípio de todas as coisas.', 'historico');
add('gn', 1, 1, 'Tomás de Aquino', 'Deus criou os céus e a terra — A criação ex nihilo é ato da onipotência divina. O Filho é o Verbo pelo qual todas as coisas foram feitas.', 'teologico');
add('gn', 1, 3, 'Agostinho', 'Haja luz — A luz espiritual da graça precede a luz natural. Deus primeiro ilumina o coração antes de criar a luz física.', 'teologico');
add('gn', 1, 3, 'Lutero', 'A palavra «Deus» aqui revela Sua onipotência: basta um comando para que a luz exista.', 'cultural');
add('gn', 1, 3, 'Orígenes', 'Haja luz — A luz espiritual que Deus acende no alma é anterior e superior à luz material do cosmos.', 'teologico');
add('gn', 1, 26, 'Calvino', 'Façamos o homem à nossa imagem — O plural majestático revela a Trindade. A imagem de Deus no homem inclui conhecimento, justiça e santidade.', 'teologico');
add('gn', 1, 26, 'Agostinho', 'À nossa imagem e semelhança — Imagem refere-se à natureza racional; semelhança à virtude moral original.', 'gramatical');
add('gn', 1, 26, 'João Crisóstomo', 'Façamos o homem — O plural revela consulta trinitária. A imagem divina no homem inclui livre-arbítrio e domínio sobre a criação.', 'teologico');
add('gn', 1, 27, 'Matthew Henry', 'Criou Deus o homem à sua imagem — A dignidade humana vem de ser feito à imagem do Criador, não de conquistas ou capacidades.', 'teologico');
add('gn', 1, 27, 'Tomás de Aquino', 'Criou Deus o homem à sua imagem — A imagem de Deus se refere ao intelecto e à vontade livre, que aproximam o homem de Deus.', 'teologico');
add('gn', 3, 1, 'Lutero', 'A serpente era mais astuta — O pecado começa com a desconfiança na Palavra de Deus. Satanás questiona a autoridade divina.', 'cultural');
add('gn', 3, 5, 'Calvino', 'Sereis como Deus — A promessa mentirosa da serpente: o pecado oferece falsa divindade através da desobediência.', 'teologico');
add('gn', 3, 6, 'Wesley', 'Viu a mulher que a árvore era boa — A tentação segue o padrão: ver, desejar, tomar. A concupiscência precede o ato.', 'aplicacao');
add('gn', 3, 1, 'Orígenes', 'A serpente era astuta — O mal se apresenta como sabedoria. A astúcia da serpente é o oposto da prudência cristã.', 'teologico');
add('gn', 3, 15, 'Calvino', 'Pôr inimizade — O Proto-evangelium: a primeira promessa de redenção. A semente da mulher esmagará a cabeça da serpente.', 'escatologico');
add('gn', 12, 1, 'Calvino', 'Vai-te da tua terra — A aliança com Abraão exige separação e obediência pela fé. Deus inicia a obra redentora.', 'teologico');
add('gn', 12, 3, 'Spurgeon', 'Em ti serão benditas todas as famílias da terra — A promessa messiânica: através de Abraão, a bênção alcançará todas as nações.', 'escatologico');
add('gn', 12, 1, 'N.T. Wright', 'Abraão é chamado para ser bênção — A eleição não é privilégio exclusivo, mas missão: ser bênção para todas as nações.', 'teologico');
add('gn', 12, 3, 'Adam Clarke', 'Serão abençoadas todas as famílias — A promessa é universal: não apenas Israel, mas todas as nações da terra.', 'escatologico');
add('gn', 15, 6, 'Lutero', 'Abraão creu no Senhor — Este é o versículo central da justificação pela fé. Abraão foi justificado pela crença, não pelas obras.', 'historico');
add('gn', 15, 6, 'Calvino', 'E lhe foi imputada justiça — A imputação da justiça de Cristo: fé é o instrumento, não o mérito.', 'teologico');
add('gn', 15, 6, 'N.T. Wright', 'Crer no Senhor — A fé de Abraão é confiança na promessa de Deus, não apenas assentimento intelectual.', 'teologico');
add('gn', 22, 1, 'Kierkegaard', 'Deus tentou Abraão — O paradoxo da fé que obedece quando não compreende.', 'teologico');
add('gn', 22, 14, 'Calvino', 'O SENHOR proverá — Jehovah Jireh: Deus antecipa a provisão. Tipologia de Cristo como cordeiro substituto.', 'teologico');
add('gn', 22, 14, 'Tomás de Aquino', 'O Senhor proverá — O sacrifício de Isaque prefigura o sacrifício de Cristo: o Pai dá o Seu Filho unigênito.', 'teologico');
add('gn', 22, 2, 'John Stott', 'Toma o teu filho, o teu único — A exigência divina prepara Abraão para entender o custo do amor e da obediência.', 'aplicacao');

// ÊXODO (15+ versículos)
add('ex', 3, 14, 'Agostinho', 'Eu Sou o que sou — O nome revela a autoexistência de Deus. Ele é o Ser absoluto, sem começo nem fim.', 'teologico');
add('ex', 3, 14, 'Tomás de Aquino', 'Eu Sou — O nome divino indica perfeição ontológica: Deus é ato puro, sem potencialidade.', 'teologico');
add('ex', 3, 14, 'Orígenes', 'Eu Sou o que sou — A autoexistência divina é incomprensível para a mente humana. Só conhecemos Deus como Ele se revela.', 'teologico');
add('ex', 3, 14, 'João Crisóstomo', 'Eu Sou — O nome revela que Deus não depende de nada para existir. Ele é a fonte de toda existência.', 'teologico');
add('ex', 12, 1, 'Calvino', 'O cordeiro da Páscoa — Tipologia cristológica: o cordeiro pascal prefigura Cristo, o Cordeiro de Deus que tira o pecado do mundo.', 'teologico');
add('ex', 12, 7, 'Matthew Henry', 'Marcar as ombreiras — A marca do sangue protege: tipologia do sangue de Cristo sobre os crentes.', 'cultural');
add('ex', 12, 13, 'Lutero', 'O sangue será por sinal — O sangue do cordeiro é sinal visível da graça invisível: fé que salva.', 'teologico');
add('ex', 14, 21, 'Spurgeon', 'O mar se abriu — O êxodo é o maior tipo de salvação no AT: libertação da escravidão pelo poder de Deus.', 'teologico');
add('ex', 14, 29, 'João Crisóstomo', 'O mar se fechou sobre os egípcios — A justiça divina se manifesta na destruição dos opressores.', 'teologico');
add('ex', 14, 13, 'Lloyd-Jones', 'Não temais — A vitória de Deus é certa. O crente deve permanecer em silêncio e ver a salvação do Senhor.', 'aplicacao');
add('ex', 20, 1, 'Calvino', 'Dez Mandamentos — A lei é revelação da vontade de Deus, não meio de salvação. Revela o pecado e aponta para Cristo.', 'teologico');
add('ex', 20, 3, 'Lutero', 'Não terás outros deuses — O primeiro mandamento é o fundamento: só Deus merece adoração e confiança absoluta.', 'teologico');
add('ex', 20, 12, 'Wesley', 'Honra pai e mãe — O primeiro mandamento com promessa: obediência filial traz bênção temporal.', 'aplicacao');
add('ex', 20, 17, 'Albert Barnes', 'Não cobiçarás — A cobiça é pecado do coração: revela a corrupção interna, não apenas o ato externo.', 'gramatical');
add('ex', 25, 17, 'Tomás de Aquino', 'O propiciatório — A capa de ouro puro sobre a arca simboliza Cristo, que cobre os pecados do povo.', 'teologico');
add('ex', 25, 22, 'Adam Clarke', 'Ali me encontrarei contigo — O propiciatório é o lugar da presença divina: tipo do que seria cumprido em Cristo.', 'teologico');
add('ex', 32, 14, 'Charles Ellicott', 'O Senhor se arrependeu — Linguagem antropomórfica: Deus não muda de decisão, mas a Escritura descreve Sua ação em termos humanos.', 'gramatical');

// SALMOS (35+ versículos)
add('sl', 1, 1, 'Spurgeon', 'Bem-aventurado o homem — A bem-aventurança começa com a negativa: não andar, não estar, não assentar com os ímpios.', 'aplicacao');
add('sl', 1, 2, 'Calvino', 'No seu lei medita de dia e de noite — A meditação constante na Escritura é marca do justo.', 'aplicacao');
add('sl', 1, 3, 'Matthew Henry', 'Como árvore plantada — A imagem da árvore: frutífera, firme, sustentada pela água da Palavra.', 'cultural');
add('sl', 1, 2, 'João Crisóstomo', 'Na sua lei medita — A meditação na Escritura produz transformação interior e frutificação espiritual.', 'aplicacao');
add('sl', 1, 6, 'R.C. Sproul', 'O Senhor guarda o caminho dos justos — A proteção divina é sobre o caminho dos que seguem a Deus.', 'teologico');
add('sl', 2, 7, 'Calvino', 'Tu és o meu Filho — Salmo messiânico: a relação Pai-Filho é eterna, não temporal.', 'teologico');
add('sl', 2, 12, 'Spurgeon', 'Beijai o Filho — A adoração ao Messias é necessária: a ira se aproxima dos que O rejeitam.', 'escatologico');
add('sl', 2, 1, 'Tomás de Aquino', 'Por que se tumultuam os povos — A revolta contra Deus é fútil: o ungido do Senhor prevalecerá.', 'teologico');
add('sl', 8, 1, 'João Crisóstomo', 'Ó SENHOR, nosso Senhor — A grandeza de Deus se manifesta na criação, especialmente na obra do homem.', 'teologico');
add('sl', 8, 5, 'Calvino', 'Coroaste-o de honra e de glória — A dignidade humana: feito um pouco menor que os anjos, mas coroado de glória.', 'teologico');
add('sl', 8, 6, 'Matthew Henry', 'Puseste tudo debaixo dos seus pés — O domínio humano sobre a criação é mandato divino.', 'cultural');
add('sl', 16, 10, 'Lutero', 'Não deixarás a minha alma — Profecia messiânica sobre a ressurreição: Deus não permite que o Seu Santo veja a corrupção.', 'escatologico');
add('sl', 16, 11, 'John Piper', 'Caminho da vida — A plenitude da alegria e os prazeres eternos à destra de Deus são o destino final do crente.', 'teologico');
add('sl', 19, 1, 'Calvino', 'Os céus declaram a glória de Deus — A revelação geral: a criação testifica do Criador, mas a Escritura é revelação especial.', 'teologico');
add('sl', 19, 7, 'Lutero', 'A lei do Senhor é perfeita — A Escritura é suficiente para converter a alma, dar testemunho, trazer alegria e iluminar os olhos.', 'teologico');
add('sl', 19, 14, 'Wesley', 'Sejam agradáveis as palavras — A oração de Davi para que pensamentos e palavras sejam aceitáveis a Deus.', 'aplicacao');
add('sl', 19, 14, 'Albert Barnes', 'Meditação do meu coração — O homem interior deve ser puro: Deus vê o coração, não apenas as aparências.', 'aplicacao');
add('sl', 22, 1, 'Calvino', 'Deus meu, Deus meu, por que me desamparaste? — Palavras messiânicas citadas por Jesus na cruz. O salmo profetiza o sofrimento do Messias.', 'teologico');
add('sl', 22, 16, 'Barth', 'Cercaram-me como cão — A profecia do sofrimento: os inimigos cercam o Justo, prefigurando a paixão de Cristo.', 'escatologico');
add('sl', 22, 28, 'Spurgeon', 'O reino é do Senhor — Apesar do sofrimento, Deus reina. A ressurreição coroa a humilhação.', 'teologico');
add('sl', 22, 1, 'N.T. Wright', 'Por que me desamparaste? — O grito de Jó e de Jesus: a angústia do justo abandonado, mas resgatado por Deus.', 'teologico');
add('sl', 22, 18, 'Albert Barnes', 'Repartiram as minhas vestes — Profecia precisa da crucificação: os soldados sortearam as vestes de Jesus.', 'historico');
add('sl', 22, 31, 'Adam Clarke', 'Ele fez — A proclamação da justiça de Deus: a obra redentora é consumada e anunciada.', 'escatologico');
add('sl', 23, 1, 'Calvino', 'O SENHOR é o meu pastor — A relação pastor-rebanho indica cuidado pessoal, provisão e proteção.', 'cultural');
add('sl', 23, 1, 'Spurgeon', 'Nada me faltará — O Pastor onipotente supre todas as necessidades do Seu povo.', 'teologico');
add('sl', 23, 2, 'João Crisóstomo', 'Leva-me a pastagens verdes — O Senhor nos guia para descanso e nutrição espiritual.', 'aplicacao');
add('sl', 23, 4, 'Tim Keller', 'Vale da sombra da morte — Mesmo nos momentos mais escuros, Deus está presente. Sua vara e cajado consolam.', 'aplicacao');
add('sl', 23, 6, 'John Stott', 'Bondade e misericórdia me seguirão — A bondade e a misericórdia nos acompanham a vida toda. A morada eterna é a promessa final.', 'teologico');
add('sl', 34, 8, 'Spurgeon', 'Provai e vede que o Senhor é bom — A experiência pessoal de Deus é o melhor argumento para Sua bondade.', 'aplicacao');
add('sl', 34, 8, 'Lloyd-Jones', 'Provai e vede — A fé não é teoria, mas experiência viva do poder transformador de Deus.', 'aplicacao');
add('sl', 46, 10, 'Lutero', 'Aquietai-vos e sabei que eu sou Deus — A paz de Deus vem quando paramos de lutar e confiamos em Sua soberania.', 'aplicacao');
add('sl', 46, 10, 'John Piper', 'Sabei que eu sou Deus — A soberania de Deus é o fundamento da paz em meio ao caos.', 'teologico');
add('sl', 51, 1, 'Agostinho', 'Tem compaixão de mim, ó Deus — O salmo da penitência máxima: Davi após o adultério com Bate-Seba. Exemplo de arrependimento genuíno.', 'historico');
add('sl', 51, 5, 'Lutero', 'Em pecado me concebeu minha mãe — A doutrina do pecado original: a corrupção está presente desde a concepção.', 'teologico');
add('sl', 51, 10, 'Wesley', 'Cria em mim, ó Deus, um coração puro — A regeneração é obra do Espírito, não esforço humano.', 'teologico');
add('sl', 51, 17, 'Tomás de Aquino', 'O sacrifício que Deus deseja — O coração contrito e humilhado é o sacrifício que Deus não despreza.', 'teologico');
add('sl', 51, 12, 'R.C. Sproul', 'Restitui-me o gozo da tua salvação — A alegria da salvação pode ser perdida pelo pecado, mas restaurada pela graça.', 'aplicacao');
add('sl', 51, 1, 'John Stott', 'Tem compaixão de mim — O arrependimento verdadeiro começa com o reconhecimento da graça, não com o mérito próprio.', 'teologico');
add('sl', 86, 11, 'John Stott', 'Ensina-me o teu caminho — A sabedoria começa com a humildade de pedir orientação divina.', 'aplicacao');
add('sl', 90, 1, 'Tomás de Aquino', 'Senhor, tu tens sido o nosso refúgio — A eternidade de Deus é o refúgio da fragilidade humana.', 'teologico');
add('sl', 90, 2, 'Agostinho', 'Antes de nascerem os montes — Deus é anterior a toda criação: eterno, imutável, sempre presente.', 'teologico');
add('sl', 103, 8, 'João Crisóstomo', 'O Senhor é misericordioso — A misericórdia de Deus é paciente e abundante, superando toda iniquidade.', 'teologico');
add('sl', 103, 12, 'Spurgeon', 'Quanto o oriente está do ocidente — A distância do pecado perdoado: Deus remove o pecado completamente.', 'teologico');
add('sl', 103, 14, 'Albert Barnes', 'Lembra-se de que somos pó — A fraqueza humana é lembrada por Deus com compaixão, não com desdém.', 'teologico');
add('sl', 110, 1, 'Calvino', 'Sentado à minha direita — Salmo messiânico mais citado no NT. A ascensão de Cristo à destra do Pai.', 'teologico');
add('sl', 110, 4, 'Barth', 'Tu és sacerdote para sempre — A linhagem de Melquisedeque prefigura o sacerdócio eterno de Cristo.', 'escatologico');
add('sl', 110, 1, 'N.T. Wright', 'Sentado à direita — A exaltação de Cristo é a vitória final: todo joelho se dobrará.', 'escatologico');
add('sl', 119, 105, 'Lutero', 'Lâmpada para os meus pés — A Escritura é guia certa para a vida cristã. Sem ela, andamos em trevas.', 'aplicacao');
add('sl', 119, 105, 'Matthew Henry', 'Lâmpada para os meus pés — A Palavra ilumina o caminho da obediência e da verdade.', 'aplicacao');
add('sl', 119, 105, 'Adam Clarke', 'Lâmpada para os meus pés — A metáfora da luz: a Escritura revela a vontade de Deus passo a passo.', 'cultural');
add('sl', 139, 1, 'Calvino', 'Senhor, tu me examinas e me conheces — A onisciência de Deus: Ele conhece cada pensamento e ação.', 'teologico');
add('sl', 139, 14, 'John Piper', 'Louvo-te, porque de um modo assombroso — A preciosidade da vida humana: cada pessoa é obra-prima do Criador.', 'teologico');
add('sl', 139, 23, 'Wesley', 'Examina-me, ó Deus, e reconhece o meu coração — A oração de autodiagnóstico espiritual.', 'aplicacao');

// PROVÉRBIOS (18+ versículos)
add('pv', 1, 7, 'Tomás de Aquino', 'O temor do Senhor é o princípio da sabedoria — O temor reverencial é o fundamento de todo conhecimento verdadeiro.', 'teologico');
add('pv', 1, 7, 'Calvino', 'O temor do Senhor — A sabedoria começa com a reverência a Deus. Sem ela, o conhecimento é vaidade.', 'teologico');
add('pv', 3, 5, 'Wesley', 'Confia no Senhor — A confiança plena em Deus exclui a dependência da própria compreensão.', 'aplicacao');
add('pv', 3, 6, 'Spurgeon', 'Ele endireitará os teus caminhos — Deus guia aqueles que O reconhecem em todos os caminhos.', 'teologico');
add('pv', 3, 5, 'Tim Keller', 'Não te estribes no teu próprio entendimento — A humildade intelectual: reconhecer que Deus vê o que nós não vemos.', 'aplicacao');
add('pv', 3, 6, 'John Stott', 'Em todos os teus caminhos — Deus se interessa por cada detalhe da vida, não apenas pelo sagrado.', 'aplicacao');
add('pv', 4, 23, 'João Crisóstomo', 'Guarda o teu coração — Dele procedem as fontes da vida. A pureza do coração é essencial.', 'teologico');
add('pv', 4, 23, 'Lloyd-Jones', 'Guarda o teu coração — O coração é o centro da vida espiritual. Proteja-o com vigilância constante.', 'aplicacao');
add('pv', 9, 10, 'Agostinho', 'O temor do Senhor é o princípio da sabedoria — O conhecimento de Deus e a santificação estão inseparavelmente ligados.', 'teologico');
add('pv', 11, 25, 'Matthew Henry', 'A alma que abençoa será cevada — A generosidade produz abundância: dar é receber.', 'aplicacao');
add('pv', 15, 1, 'Albert Barnes', 'A resposta branda desvia o furioso — A mansidão tem poder de apaziguar. A raiva é vencida pela gentileza.', 'aplicacao');
add('pv', 15, 1, 'Charles Ellicott', 'A resposta mole — A brandura da resposta é mais eficaz que a severidade no trato com os irados.', 'cultural');
add('pv', 16, 3, 'Spurgeon', 'Confia ao Senhor os teus feitos — A oração sobre os projetos: Deus orienta e estabelece os propósitos do justo.', 'aplicacao');
add('pv', 22, 6, 'Wesley', 'Instrui o menino — A educação cristã na infância molda o caráter para toda a vida.', 'aplicacao');
add('pv', 22, 6, 'John Piper', 'Instrui o menino — A responsabilidade dos pais na formação espiritual dos filhos é séria e urgente.', 'aplicacao');
add('pv', 27, 17, 'Spurgeon', 'O ferro afia o ferro — A comunhão entre irmãos espirituais aperfeiçoa o caráter cristão.', 'aplicacao');
add('pv', 27, 17, 'Tim Keller', 'O ferro afia o ferro — Precisamos de relacionamentos desafiadores para crescer na santidade.', 'aplicacao');
add('pv', 31, 10, 'Adam Clarke', 'Mulher virtuosa quem a achará — O valor da mulher íntegra: o temor do Senhor é sua força.', 'cultural');

// ECLISIASTES
add('ec', 3, 1, 'Calvino', 'Para tudo há um tempo — A soberania de Deus sobre os tempos e estações da vida humana.', 'teologico');
add('ec', 3, 11, 'Matthew Henry', 'Deus fez tudo formoso — A eternidade no coração: o anseio humano por significado transcendente.', 'cultural');
add('ec', 3, 11, 'N.T. Wright', 'Deus fez tudo formoso — O anseio por eternidade aponta para a nova criação prometida.', 'escatologico');

// ISAÍAS (22+ versículos)
add('is', 6, 3, 'Calvino', 'Santo, Santo, Santo — A trina santificação: a plenitude da glória divina em superlativo triplo.', 'teologico');
add('is', 6, 5, 'Lutero', 'Ai de mim, que estou perdido — O reconhecimento da impureza diante da santidade divina é o primeiro passo da vocação.', 'teologico');
add('is', 6, 8, 'Spurgeon', 'Aqui estou, envia-me — A vocação profética: responderei quando Deus chamar.', 'aplicacao');
add('is', 7, 14, 'Calvino', 'A virgem conceberá — Profecia messiânica cumprida em Cristo. A palavra hebraica «almah» indica jovem donzela.', 'teologico');
add('is', 7, 14, 'Barth', 'Immanuel — Deus conosco: a presença divina se faz real na encarnação.', 'escatologico');
add('is', 7, 14, 'Tomás de Aquino', 'A virgem conceberá — A profecia indica nascimento virginal: miraculoso, acima da natureza.', 'teologico');
add('is', 9, 6, 'Spurgeon', 'Um menino nos nasceu — A encarnação: o eterno se faz tempo, o infinito se faz finito.', 'teologico');
add('is', 9, 6, 'Calvino', 'Conselheiro maravilhoso — Cristo é a sabedoria de Deus manifesta em carne humana.', 'teologico');
add('is', 9, 6, 'João Crisóstomo', 'Pai eterno — O título messiânico: o Filho que nasce é eterno, gerado antes dos tempos.', 'teologico');
add('is', 40, 3, 'Charles Ellicott', 'A voz do que clama no deserto — Profecia cumprida em João Batista: preparar o caminho do Senhor.', 'escatologico');
add('is', 40, 3, 'Matthew Henry', 'Preparai no deserto o caminho — A preparação para a vinda do Messias exige humilhação e arrependimento.', 'teologico');
add('is', 42, 1, 'Calvino', 'Eis o meu servo — O Servo do Senhor: Cristo como modelo de obediência e humildade.', 'teologico');
add('is', 42, 3, 'John Stott', 'Não apagará o wick — A compaixão do Messias: gentil com os fracos, firme na verdade.', 'aplicacao');
add('is', 53, 3, 'Agostinho', 'Desprezado e rejeitado — A humilhação do Servo Sofredor: o Messias sofre voluntariamente por nós.', 'teologico');
add('is', 53, 5, 'Calvino', 'Ferido pelas nossas transgressões — A satisfação vicária: Cristo paga o preço do nosso pecado.', 'teologico');
add('is', 53, 5, 'Barth', 'Pelos seus chagas sararemos — A cura espiritual vem pelo sacrifício substitutivo do Servo Sofredor.', 'teologico');
add('is', 53, 5, 'Tomás de Aquino', 'Ferido por nossas transgressões — O sofrimento do Servo é substitutivo: Ele paga o que devíamos.', 'teologico');
add('is', 53, 7, 'Spurgeon', 'Como cordeiro será conduzido — A submissão voluntária do Servo: Ele não abre a boca contra a injustiça.', 'teologico');
add('is', 53, 10, 'Lutero', 'O Senhor quis mará-lo — A vontade de Deus está no sofrimento de Cristo: não é acidente, mas propósito.', 'teologico');
add('is', 53, 12, 'N.T. Wright', 'Intercedeu por muitos — O Servo Sofredor não apenas morre, mas intercede: seu sofrimento é frutífero.', 'escatologico');
add('is', 53, 6, 'Albert Barnes', 'Todos nós andamos desgarrados — A universalidade do pecado: todos como ovelhas, mas Deus o castiga nele.', 'teologico');

// JEREMIAS (10+ versículos)
add('jr', 1, 5, 'John Piper', 'Antes de te formar no ventre eu te conheci — O conhecimento divino precede a concepção: propósito eterno sobre cada vida.', 'teologico');
add('jr', 1, 5, 'Calvino', 'Eu te constituí profeta — A chamada divina precede o nascimento: Deus designa para serviço antes da existência.', 'teologico');
add('jr', 9, 24, 'Tomás de Aquino', 'O que se gloria, glorie-se em que me entende — O verdadeiro conhecimento de Deus produz humildade, não orgulho.', 'teologico');
add('jr', 9, 24, 'Agostinho', 'Eu sou o Senhor que pratica misericórdia — O conhecimento de Deus é experimental: conhece-lo é Experimentar Sua graça.', 'teologico');
add('jr', 17, 5, 'Matthew Henry', 'Maldito o homem que confia no homem — A maldição da confiança na carne: contraste com a bênção da confiança em Deus.', 'teologico');
add('jr', 17, 7, 'Spurgeon', 'Bem-aventurado o homem que confia no Senhor — A felicidade está na dependência total de Deus.', 'aplicacao');
add('jr', 23, 5, 'Calvino', 'Levantarei a Davi um rebento justo — A promessa messiânica: um rei justo que governará com retidão.', 'escatologico');
add('jr', 23, 6, 'N.T. Wright', 'O Senhor é a nossa justiça — O nome messiânico: Cristo é a justiça que Deus dá ao Seu povo.', 'teologico');
add('jr', 29, 11, 'Spurgeon', 'Eu bem sei os pensamentos que tenho — Deus tem planos de paz, não de desgraça. A esperança é real.', 'aplicacao');
add('jr', 29, 11, 'Tim Keller', 'Pensamentos de paz — Deus trabalha mesmo no exílio e no sofrimento para cumprir Seus propósitos.', 'aplicacao');
add('jr', 29, 11, 'Wesley', 'Pensamentos de paz — O plano de Deus para Seu povo é de esperança e restauração, não de destruição.', 'teologico');
add('jr', 31, 31, 'Calvino', 'Nova aliança — A promessa da nova aliança: lei escrita no coração, perdão completo, conhecimento direto de Deus.', 'teologico');
add('jr', 31, 33, 'Barth', 'Eu porei a minha lei no interior — A obra do Espírito: transformação interior, não apenas obediência externa.', 'teologico');
add('jr', 31, 34, 'João Crisóstomo', 'Todos me conhecerão — A nova aliança traz conhecimento direto de Deus: não mais mediadores distantes.', 'teologico');

// DANIEL (10+ versículos)
add('dn', 2, 44, 'Calvino', 'Deus levantará um reino — A pedra que esmiúça as estátuas: o reino de Deus substituirá todos os impérios humanos.', 'escatologico');
add('dn', 2, 44, 'Spurgeon', 'Um reino eterno — O reino de Deus é permanente e indestrutível, superando todos os reinos da terra.', 'escatologico');
add('dn', 3, 17, 'N.T. Wright', 'Nosso Deus pode nos livrar — A fé que enfrenta o sofrimento: mesmo sem livramento, Deus é fiel.', 'aplicacao');
add('dn', 3, 18, 'Tim Keller', 'Mesmo que não — A fé que não depende do resultado: Deus é digno de confiança em qualquer circunstância.', 'aplicacao');
add('dn', 7, 13, 'Barth', 'Veio um como filho de homem — A visão apocalíptica do Filho do Homem que recebe domínio eterno.', 'escatologico');
add('dn', 7, 14, 'Calvino', 'Domínio eterno — O reino messiânico não tem fim. Cristo reina para sempre.', 'escatologico');
add('dn', 7, 13, 'N.T. Wright', 'Veio com as nuvens — O Filho do Homem recebido pelo Ancião de Dias: a transferência de autoridade.', 'escatologico');
add('dn', 7, 14, 'Tomás de Aquino', 'Domínio eterno — O poder do Filho do Homem é absoluto, universal e perpétuo.', 'teologico');
add('dn', 9, 25, 'Calvino', 'Setenta semanas — A profecia das setenta semanas: cronologia messiânica precisa.', 'escatologico');
add('dn', 9, 27, 'Matthew Henry', 'Ele confirmará a aliança — A aliança confirmada pelo Messias é a nova aliança prometida por Jeremias.', 'escatologico');
add('dn', 9, 24, 'Albert Barnes', 'Para consumar a profecia — As setenta semanas têm cumprimento em Cristo: a obra messiânica é definitiva.', 'escatologico');
add('dn', 12, 1, 'Spurgeon', 'Nesse tempo se levantará Miguel — A escatologia final: livramento para os que dormem na terra.', 'escatologico');
add('dn', 12, 3, 'Lloyd-Jones', 'Os que forem sábios brilharão — A sabedoria que vem de Deus tem recompensa eterna.', 'escatologico');

// OSEIAS
add('os', 11, 1, 'Matthew Henry', 'Quando Israel era menino — A relação de Deus com Israel como pai: amor que persiste apesar da desobediência.', 'teologico');
add('os', 11, 1, 'Calvino', 'Do Egito chamei meu filho — Referência tipológica ao Messias: Cristo cumpre o que Israel falhou.', 'teologico');

// MIQUÉIAS
add('mc', 5, 2, 'Calvino', 'De ti sairá — Profecia do nascimento de Belém: o Messias nascerá na cidade de Davi.', 'escatologico');
add('mc', 5, 2, 'N.T. Wright', 'De ti sairá — A origem messiânica é eterna: «Dele» vem de antes dos tempos.', 'escatologico');

// MALAQUIAS
add('ml', 3, 1, 'Spurgeon', 'O anjo da aliança — João Batista prepara o caminho para o Messias, o anjo da aliança.', 'escatologico');
add('ml', 3, 1, 'Charles Ellicott', 'O anjo da aliança — A dupla identidade: João como arauto, o Messias como senhor da aliança.', 'escatologico');

// MATEUS (30+ versículos)
add('mt', 1, 23, 'Calvino', 'Emmanuel — Deus conosco: o cumprimento da profecia de Isaías 7:14 na encarnação.', 'teologico');
add('mt', 1, 23, 'Tomás de Aquino', 'Emmanuel — A união hipostática: Deus e homem em uma pessoa, o mistério da encarnação.', 'teologico');
add('mt', 3, 2, 'Charles Ellicott', 'Arrependei-vos — João Batista proclama a iminência do reino: arrependimento é resposta ao reino.', 'escatologico');
add('mt', 5, 3, 'Wesley', 'Bem-aventurados os pobres de espírito — A primeira beatitude: humildade é a porta do reino.', 'aplicacao');
add('mt', 5, 4, 'Lloyd-Jones', 'Bem-aventurados os que choram — A tristeza segundo Deus leva ao consolo divino.', 'aplicacao');
add('mt', 5, 5, 'Spurgeon', 'Bem-aventurados os mansos — A mansidão não é fraqueza, mas força controlada pela graça.', 'aplicacao');
add('mt', 5, 6, 'John Piper', 'Bem-aventurados os que têm fome e sede — A fome de justiça é satisfeita por Deus.', 'aplicacao');
add('mt', 5, 8, 'Calvino', 'Bem-aventurados os limpos de coração — A pureza de coração é condição para ver a Deus.', 'teologico');
add('mt', 5, 9, 'Calvino', 'Bem-aventurados os pacificadores — Os que trazem paz refletem o caráter de Deus, o Príncipe da Paz.', 'aplicacao');
add('mt', 5, 10, 'N.T. Wright', 'Bem-aventurados os perseguidos — A perseguição é marca da fidelidade ao reino.', 'teologico');
add('mt', 6, 9, 'Lutero', 'Pai nosso que estás nos céus — O modelo de oração: relação filial com Deus, santidade do nome, vinda do reino.', 'teologico');
add('mt', 6, 10, 'Wesley', 'Venha o teu reino — A oração pela soberania de Deus: que Sua vontade se cumpra na terra.', 'teologico');
add('mt', 6, 13, 'Calvino', 'Não nos induzas à tentação — Deus permite provas para fortalecer, mas livra do mal final.', 'teologico');
add('mt', 10, 32, 'Tim Keller', 'Todo aquele que me confessar — A confissão de Cristo é necessária: fé privada exige declaração pública.', 'aplicacao');
add('mt', 11, 28, 'Spurgeon', 'Vinde a mim, todos os cansados — O convite universal de Cristo: descanso para os oprimidos.', 'aplicacao');
add('mt', 11, 28, 'João Crisóstomo', 'Vinde a mim — O convite mais doce da Escritura: Cristo recebe todos os que vêm a Ele.', 'aplicacao');
add('mt', 11, 29, 'Wesley', 'Aprendei de mim — A mansidão de Cristo é o modelo para os discípulos.', 'aplicacao');
add('mt', 16, 16, 'Calvino', 'Tu és o Cristo, o Filho do Deus vivente — A confissão de Pedro é a pedra angular da fé cristã.', 'teologico');
add('mt', 16, 18, 'Spurgeon', 'Edificarei a minha igreja — A promessa de Cristo: a igreja é indestrutível, apesar das portas do inferno.', 'teologico');
add('mt', 18, 20, 'John Stott', 'Onde estiverem dois ou três — A presença comunitária de Cristo: a igreja reunida tem Sua companhia.', 'teologico');
add('mt', 22, 37, 'Tomás de Aquino', 'Amarás o teu Deus — O primeiro e maior mandamento: amor total a Deus com toda a pessoa.', 'teologico');
add('mt', 22, 39, 'Calvino', 'Amarás o teu próximo — O amor ao próximo é inseparável do amor a Deus: dois mandamentos, uma lei.', 'teologico');
add('mt', 24, 35, 'Lutero', 'O céu e a terra passarão — A Palavra de Deus é eterna, permanece quando tudo mais passa.', 'teologico');
add('mt', 24, 35, 'Adam Clarke', 'Minhas palavras não passarão — A permanência da Palavra divina: mais firme que os céus.', 'teologico');
add('mt', 26, 26, 'Tomás de Aquino', 'Isto é o meu corpo — A Eucaristia: Cristo institui o sacramento na Última Ceia.', 'teologico');
add('mt', 26, 28, 'Calvino', 'O meu sangue da nova aliança — O sangue de Cristo é o fundamento da nova aliança.', 'teologico');
add('mt', 27, 46, 'Barth', 'Deus meu, por que me desamparaste? — O grito da cruz: a experiência humana de Jesus no abandono vicário.', 'teologico');
add('mt', 27, 46, 'Calvino', 'Eli, Eli — Jesus assume o lugar do pecador, experimentando o abandono que merecíamos.', 'teologico');
add('mt', 28, 19, 'Agostinho', 'Batizando-os em nome do Pai, do Filho e do Espírito Santo — Fórmula trinitária: três pessoas, um único nome, indicando unidade de essência.', 'teologico');
add('mt', 28, 19, 'Calvino', 'Fazendo discípulos — O discipulado envolve ensino, batismo e obediência a tudo o que Cristo ordenou.', 'aplicacao');
add('mt', 28, 18, 'John Piper', 'Toda autoridade me é dada — A autoridade cósmica de Cristo é base para a missão mundial.', 'teologico');
add('mt', 28, 20, 'Lloyd-Jones', 'Eu estou convosco — A presença perpetua de Cristo: Ele nunca abandona Seu povo.', 'teologico');

// MARCOS (15+ versículos)
add('mc', 1, 1, 'N.T. Wright', 'Princípio do evangelho de Jesus Cristo — Marcos começa com urgência: Cristo é Filho de Deus e Messias.', 'historico');
add('mc', 1, 15, 'Spurgeon', 'O reino de Deus está próximo — A proclamação central de Jesus: o reino está presente e urgente.', 'teologico');
add('mc', 1, 15, 'Calvino', 'Arrependei-vos — O arrependimento e a fé são as duas respostas necessárias ao evangelho.', 'teologico');
add('mc', 8, 36, 'John Stott', 'De que aproveita ao homem ganhar o mundo? — A perda da alma é a pior perda possível.', 'aplicacao');
add('mc', 8, 36, 'Lloyd-Jones', 'De que lhe aproveita? — A questão eterna supera qualquer ganho temporal.', 'aplicacao');
add('mc', 10, 43, 'Tim Keller', 'Quem quiser ser o maior — A liderança cristã é serviço, não domínio. O modelo é Cristo servo.', 'aplicacao');
add('mc', 10, 45, 'Calvino', 'Dar a sua vida em resgate — A morte de Cristo é substitutiva e redentora: pagamento pelo pecado.', 'teologico');
add('mc', 10, 45, 'Wesley', 'Não vim para ser servido — O modelo de liderança cristã: serviço, não domínio.', 'aplicacao');
add('mc', 10, 45, 'Tomás de Aquino', 'Dar a sua vida em resgate — O preço do resgate é a vida do Filho de Deus: o maior valor possível.', 'teologico');
add('mc', 12, 30, 'João Crisóstomo', 'Amarás o Senhor — O mandamento central: amor integral a Deus com toda a pessoa.', 'teologico');
add('mc', 12, 31, 'Albert Barnes', 'Amarás o teu próximo — O amor ao próximo é como o amor a si mesmo: a medida natural.', 'aplicacao');
add('mc', 14, 22, 'Calvino', 'Isto é o meu corpo — A Ceia do Senhor: memorial da morte de Cristo e participação em Sua graça.', 'teologico');
add('mc', 15, 33, 'Adam Clarke', 'Toda a terra se escureceu — A escuridão cósmica na crucificação: sinal da ira divina sobre o pecado.', 'cultural');
add('mc', 16, 6, 'Spurgeon', 'Ele ressuscitou — A ressurreição é o fundamento da fé cristã. Sem ela, vã é a nossa pregação.', 'teologico');
add('mc', 16, 6, 'N.T. Wright', 'Ele não está aqui — A ressurreição não é mito: o túmulo vazio é o fato central da história.', 'historico');

// LUCAS (20+ versículos)
add('lc', 1, 37, 'Wesley', 'Nenhuma palavra de Deus será sem efeito — A onipotência de Deus garante o cumprimento de Suas promessas.', 'teologico');
add('lc', 1, 46, 'João Crisóstomo', 'A minha alma magnifica o Senhor — O hino de Maria: modelo de humildade e louvor.', 'aplicacao');
add('lc', 1, 49, 'Calvino', 'Fez coisas grandes — A obra de Deus em Maria é fruto de Sua graça, não mérito dela.', 'teologico');
add('lc', 2, 10, 'Spurgeon', 'Boas novas de grande alegria — O evangelho é a notícia mais alegre da história: Cristo nasceu.', 'aplicacao');
add('lc', 2, 11, 'Calvino', 'Hoje, na cidade de Davi — A localização cumprida: Belém, a cidade de Davi, vê o nascimento do Messias.', 'historico');
add('lc', 2, 14, 'Adam Clarke', 'Glória a Deus nas alturas — O hino dos anjos: a encarnação traz paz aos homens de boa vontade.', 'teologico');
add('lc', 2, 35, 'Charles Ellicott', 'Uma espada traspassará a tua alma — A profecia sobre Maria: o sofrimento da mãe na missão do Filho.', 'escatologico');
add('lc', 10, 30, 'Tim Keller', 'Um homem descia — A parábola do Bom Samaritano: o amor vizinho não conhece fronteiras raciais.', 'aplicacao');
add('lc', 10, 33, 'Albert Barnes', 'O samaritano teve compaixão — O samaritano, desprezado pelos judeus, é o herói: inversão radical.', 'cultural');
add('lc', 10, 37, 'Spurgeon', 'Foi aquele que usou de misericórdia — A verdadeira religião é prática de amor, não teoria.', 'aplicacao');
add('lc', 15, 4, 'Wesley', 'Não deixa as noventa e nove — O valor de cada alma: Deus busca o perdido pessoalmente.', 'aplicacao');
add('lc', 15, 7, 'Calvino', 'Mais alegria no céu — A conversa de um pecador é a maior celebração no mundo espiritual.', 'teologico');
add('lc', 15, 13, 'N.T. Wright', 'Reuniu tudo — O filho pródigo desperdiça a herança: a busca de autonomia longe de Deus.', 'aplicacao');
add('lc', 15, 20, 'Lloyd-Jones', 'O pai o viu de longe — A graça precede o arrependimento: o pai corre antes do filho confessar.', 'teologico');
add('lc', 15, 22, 'John Stott', 'Trazei a melhor roupa — A restauração completa: o filho pródigo é recebido como filho, não servo.', 'teologico');
add('lc', 19, 10, 'John Piper', 'Procurar e salvar o que se havia perdido — A missão de Cristo: o propósito central de Sua vinda.', 'teologico');
add('lc', 22, 19, 'Tomás de Aquino', 'Fazei isto em memória — A Eucaristia é memorial sacrificial: presença real de Cristo.', 'teologico');
add('lc', 23, 34, 'Calvino', 'Pai, perdoa-lhes — A primeira palavra da cruz: intercessão pelos inimigos. Amor perdoador.', 'teologico');
add('lc', 23, 34, 'Barth', 'Pai, perdoa-lhes — O perdão incondicional: Cristo morre pelos que O crucificam.', 'teologico');
add('lc', 23, 34, 'Spurgeon', 'Não sabem o que fazem — A ignorância atenua a culpa: os crucificadores agem sem conhecimento pleno.', 'teologico');
add('lc', 23, 43, 'Wesley', 'Hoje estarás comigo — A salvação é instantânea: hoje mesmo, não depois de obras.', 'teologico');
add('lc', 24, 27, 'Charles Ellicott', 'Explicou-lhes — Cristo ensina as Escrituras: o AT inteiro aponta para Ele.', 'historico');
add('lc', 24, 32, 'Adam Clarke', 'Ardia-nos o coração — A presença de Cristo ilumina as Escrituras e aquece o coração.', 'aplicacao');
add('lc', 24, 46, 'N.T. Wright', 'Era necessário — A morte e ressurreição de Cristo são o centro da história: tudo aponta para isso.', 'teologico');

// JOÃO (40+ versículos)
add('jo', 1, 1, 'Atanásio', 'No princípio era o Verbo — O Verbo (Logos) é eterno, preexistente e igual ao Pai. Não há começo para Sua existência.', 'teologico');
add('jo', 1, 1, 'Calvino', 'E o Verbo estava com Deus — A distinção de pessoas na Trindade: o Verbo está «com» Deus, indicando relação pessoal e distinção.', 'teologico');
add('jo', 1, 1, 'Barrett', 'O termo grego «Logos» era familiar tanto para judeus quanto para gregos, mas João lhe dá um significado cristológico único.', 'cultural');
add('jo', 1, 1, 'Tomás de Aquino', 'No princípio era o Verbo — O Logos é consubstancial ao Pai: da mesma essência, distinto na pessoa.', 'teologico');
add('jo', 1, 12, 'Wesley', 'Deu-lhes o poder de serem filhos — A adoção divina: receber Cristo é receber o direito de filhos.', 'teologico');
add('jo', 1, 12, 'R.C. Sproul', 'Deu-lhes poder — A fé não é passiva: Deus dá poder ativo para a adoção filial.', 'teologico');
add('jo', 1, 14, 'Agostinho', 'O Verbo se fez carne — A encarnação: o eterno entra no tempo, o infinito no finito.', 'teologico');
add('jo', 1, 14, 'Lutero', 'E habitou entre nós — Deus não destrói a distância: Ele habita conosco em humildade.', 'teologico');
add('jo', 1, 14, 'João Crisóstomo', 'Vimos a sua glória — A glória do Filho é a glória do Pai: na carne, Deus se revela plenamente.', 'teologico');
add('jo', 3, 3, 'Calvino', 'Nascer de novo — A regeneração é obra do Espírito: sem ela, ninguém vê o reino.', 'teologico');
add('jo', 3, 3, 'Lutero', 'Nascer de novo — A nova nascimento é indispensável: velho homem deve morrer para que o novo viva.', 'teologico');
add('jo', 3, 16, 'Lutero', 'Porque Deus amou o mundo — O amor de Deus é a causa original da salvação. Não é merecida, mas graciosamente dada.', 'teologico');
add('jo', 3, 16, 'Wesley', 'De tal maneira amou — A intensidade do amor de Deus é medida pelo preço do Seu dom: o Seu Filho unigênito.', 'teologico');
add('jo', 3, 16, 'Calvino', 'Para que todo aquele que nele crê — A fé é o instrumento da salvação, não a obra que a merece.', 'gramatical');
add('jo', 3, 16, 'Spurgeon', 'Deus amou o mundo — O amor de Deus é sem limites: alcança o mundo inteiro, sem exceção.', 'teologico');
add('jo', 3, 16, 'John Piper', 'De tal maneira amou — A medida do amor de Deus é a dádiva do Filho: o maior sacrifício possível.', 'teologico');
add('jo', 4, 13, 'Tim Keller', 'Água viva — A água que satisfaz: Cristo preenche o vazio que as coisas do mundo não preenchem.', 'aplicacao');
add('jo', 4, 14, 'John Stott', 'Nunca mais terá sede — O dom da vida eterna é satisfatório e permanente.', 'teologico');
add('jo', 6, 35, 'Spurgeon', 'Eu sou o pão da vida — Cristo é o sustento espiritual: quem O come não terá fome espiritual.', 'teologico');
add('jo', 6, 35, 'Agostinho', 'Eu sou o pão da vida — A Eucaristia nutre a alma: Cristo é o alimento verdadeiro.', 'teologico');
add('jo', 6, 68, 'R.C. Sproul', 'Senhor, para quem iríamos? — Pedro reconhece que só Cristo tem palavras de vida eterna.', 'teologico');
add('jo', 7, 37, 'Charles Ellicott', 'Se alguém tem sede — O convite universal: todos podem vir a Cristo.', 'aplicacao');
add('jo', 7, 38, 'Albert Barnes', 'Rios de água viva — O Espírito Santo flui do crente como rios vivificadores.', 'teologico');
add('jo', 8, 12, 'Calvino', 'Eu sou a luz do mundo — A segunda «Eu Sou» de João: Cristo é a revelação divina que ilumina as trevas.', 'teologico');
add('jo', 8, 12, 'N.T. Wright', 'Eu sou a luz do mundo — Cristo é o cumprimento da festa dos tabernáculos: a coluna de fogo.', 'cultural');
add('jo', 8, 32, 'Lutero', 'Conhecereis a verdade — A verdade liberta: o conhecimento de Cristo quebra as correntes do pecado.', 'teologico');
add('jo', 8, 32, 'Spurgeon', 'A verdade vos libertará — A verdade cristã não é filosófica, mas salvadora: liberdade da culpa.', 'aplicacao');
add('jo', 8, 58, 'Tomás de Aquino', 'Antes que Abraão existisse, eu sou — O «Eu Sou» divino: Jesus afirma Sua eternidade e divindade.', 'teologico');
add('jo', 8, 58, 'Calvino', 'Antes que Abraão existisse — A preexistência eterna de Cristo: Ele não é criado.', 'teologico');
add('jo', 10, 10, 'Wesley', 'Vim para que tenham vida — O propósito da vinda de Cristo: abundância de vida, não apenas existência.', 'aplicacao');
add('jo', 10, 10, 'John Piper', 'Vim para que tenham vida — A vida abundante é o dom máximo: mais que perdão, é plenitude.', 'teologico');
add('jo', 10, 11, 'Spurgeon', 'O bom pastor dá a vida — O sacrifício voluntário do Pastor: Ele dá a vida pelas ovelhas.', 'teologico');
add('jo', 10, 11, 'João Crisóstomo', 'O bom pastor — O contraste entre o mercenário e o pastor: o pastor verdadeiro ama até a morte.', 'teologico');
add('jo', 10, 28, 'Lloyd-Jones', 'Ninguém vos arrebatará — A segurança eterna: as ovelhas de Cristo estão guardadas para sempre.', 'teologico');
add('jo', 10, 29, 'R.C. Sproul', 'Ninguém pode arrebatá-las — A soberania do Pai garante a perseverança dos santos.', 'teologico');
add('jo', 11, 25, 'Spurgeon', 'Eu sou a ressurreição — A promessa da vida eterna: quem crê em Cristo vive mesmo que morra.', 'teologico');
add('jo', 11, 26, 'Calvino', 'Quem vive e crê em mim — A fé em Cristo é a chave da vida eterna.', 'teologico');
add('jo', 11, 25, 'Tomás de Aquino', 'Eu sou a ressurreição — Cristo é a causa eficiente da ressurreição: tanto espiritual quanto corporal.', 'teologico');
add('jo', 12, 24, 'N.T. Wright', 'Se o grão de trigo — A morte fecunda: a morte de Cristo produz frutos abundantes.', 'teologico');
add('jo', 13, 34, 'Calvino', 'Um novo mandamento vos dou — O amor fraternal é a marca da igreja: o mundo reconhece Cristo pelo amor.', 'teologico');
add('jo', 13, 34, 'John Stott', 'Amai-vos uns aos outros — O mandamento novo não é quantitativo, mas qualitativo: amor sacrificial.', 'teologico');
add('jo', 13, 35, 'Tim Keller', 'Nisto reconhecerão — O amor cristão é o testemunho mais poderoso ao mundo.', 'aplicacao');
add('jo', 14, 1, 'Lutero', 'Não se perturbe o vosso coração — A promessa de conforto: Deus prepara lugar para os Seus.', 'aplicacao');
add('jo', 14, 2, 'Matthew Henry', 'Muitas moradas — A casa do Pai é ampla: há lugar para todos os crentes.', 'teologico');
add('jo', 14, 3, 'Spurgeon', 'Vou preparar-vos lugar — A garantia: Cristo voltará para levar os Seus.', 'escatologico');
add('jo', 14, 6, 'Calvino', 'Eu sou o caminho — Cristo é a única via de acesso ao Pai: exclusividade cristã.', 'teologico');
add('jo', 14, 6, 'Lutero', 'Ninguém vem ao Pai senão por mim — A verdade absoluta: Cristo é o único mediador.', 'teologico');
add('jo', 14, 6, 'Atanásio', 'Eu sou o caminho, a verdade e a vida — A totalidade de Cristo: o caminho é a pessoa, não apenas o ensino.', 'teologico');
add('jo', 14, 6, 'R.C. Sproul', 'Eu sou o caminho — A exclusividade de Cristo: não há alternativas salvadoras.', 'teologico');
add('jo', 14, 15, 'Albert Barnes', 'Se me amais, guardareis meus mandamentos — O amor a Cristo se prova pela obediência.', 'aplicacao');
add('jo', 14, 27, 'Wesley', 'Deixo-vos a paz — A paz de Cristo é diferente da paz do mundo: sobrenatural e duradoura.', 'teologico');
add('jo', 14, 27, 'Adam Clarke', 'Não vos dou como o mundo dá — A paz de Cristo é real, não superficial: transforma o coração.', 'aplicacao');
add('jo', 15, 1, 'Agostinho', 'Eu sou a videira verdadeira — Cristo é a fonte: sem Ele, nada podemos produzir.', 'teologico');
add('jo', 15, 5, 'Wesley', 'Sem mim nada podeis fazer — A dependência radical de Cristo: frutificação só é possível nele.', 'aplicacao');
add('jo', 15, 5, 'Tim Keller', 'Sem mim nada podeis fazer — A humildade radical: reconhecer que a vida espiritual depende de Cristo.', 'aplicacao');
add('jo', 15, 8, 'Lloyd-Jones', 'Nisto é glorificado meu Pai — O fruto espiritual glorifica a Deus: é o propósito final da vida cristã.', 'teologico');
add('jo', 15, 13, 'Spurgeon', 'Ninguém tem maior amor — O amor sacrificial é o ápice: dar a vida pelos amigos.', 'teologico');
add('jo', 15, 13, 'John Piper', 'Dar a vida — O amor cristão é sempre sacrificial: o evangelho é amor dado, não esperado.', 'aplicacao');
add('jo', 17, 3, 'Calvino', 'Eternal é a vida — O conhecimento de Deus e de Cristo é vida eterna: conhecimento relacional.', 'teologico');
add('jo', 17, 3, 'N.T. Wright', 'Que te conheçam — A vida eterna começa agora: conhecimento de Deus que transforma.', 'teologico');
add('jo', 17, 17, 'Lutero', 'Santifica-os na verdade — A Palavra de Deus é instrumento de santificação: separa para Deus.', 'teologico');
add('jo', 17, 20, 'Charles Ellicott', 'Não rogo só por estes — A oração de Jesus se estende a todos os crentes de todos os tempos.', 'teologico');
add('jo', 19, 30, 'Spurgeon', 'Está consumado — A obra da redenção está completa: nada mais precisa ser acrescentado.', 'teologico');
add('jo', 19, 30, 'Calvino', 'Consumou-se — O verbo grego «tetelestai» significa «pago integralmente». A dívida do pecado foi quitada.', 'gramatical');
add('jo', 19, 34, 'Tomás de Aquino', 'Saiu sangue e água — O sangue e a água simbolizam a Eucaristia e o Batismo: frutos da paixão.', 'teologico');
add('jo', 20, 28, 'Atanásio', 'Meu Senhor e meu Deus! — A confissão de Tomé: Cristo é Deus, não apenas senhor humano.', 'teologico');
add('jo', 20, 31, 'Calvino', 'Para que creiais — O propósito do evangelho: fé em Jesus como Cristo e Filho de Deus.', 'aplicacao');
add('jo', 20, 31, 'Spurgeon', 'Para que creiais — O evangelho foi escrito para produzir fé: não é livro de curiosidade.', 'aplicacao');
add('jo', 21, 15, 'Agostinho', 'Amas-me mais do que estes? — A restauração de Pedro: três negações, três afirmações.', 'historico');
add('jo', 21, 17, 'Albert Barnes', 'Senhor, tu sabes todas as coisas — A humildade de Pedro: não ousa dizer que ama perfeitamente.', 'aplicacao');

// ATOS (15+ versículos)
add('at', 1, 8, 'Spurgeon', 'Recebereis poder — O Espírito Santo capacita para testemunho: de Jerusalém ao mundo.', 'teologico');
add('at', 1, 8, 'N.T. Wright', 'Recebereis poder — A missão cristã é habilitada pelo Espírito, não pela estratégia humana.', 'teologico');
add('at', 2, 1, 'Calvino', 'Pentecostes — O derramamento do Espírito Santo: cumprimento da promessa de Jesus.', 'teologico');
add('at', 2, 4, 'Wesley', 'Cheios do Espírito — A plenitude do Espírito para testemunho e poder.', 'teologico');
add('at', 2, 2, 'João Crisóstomo', 'Um vendaval — O Espírito desce com poder avassalador: transforma os medrosos em corajosos.', 'cultural');
add('at', 2, 38, 'Lutero', 'Arrependei-vos — O arrependimento, o batismo e a recepção do Espírito: a ordem do evangelho.', 'teologico');
add('at', 2, 38, 'Tomás de Aquino', 'Batizai-vos — O batismo confere a graça da remissão: sacramento de iniciação.', 'teologico');
add('at', 3, 19, 'John Stott', 'Arrependei-vos e convertei — O arrependimento é a porta: mudar de direção, voltar-se para Deus.', 'aplicacao');
add('at', 4, 12, 'Calvino', 'Nem há salvação em nenhum outro — A exclusividade de Cristo: único nome dado aos homens.', 'teologico');
add('at', 4, 12, 'Lloyd-Jones', 'Não há salvação — A afirmação mais exclusiva da Escritura: apenas Cristo salva.', 'teologico');
add('at', 4, 31, 'R.C. Sproul', 'Encheram-se todos do Espírito — O Espírito capacita para testemunhar com ousadia.', 'teologico');
add('at', 5, 31, 'Charles Ellicott', 'Deus o exaltou — A exaltação de Cristo: Rei e Salvador para dar arrependimento e perdão.', 'escatologico');
add('at', 7, 55, 'N.T. Wright', 'Viu a glória de Deus — Estêvão vê Cristo à destra de Deus: a exaltação é real e presente.', 'escatologico');
add('at', 9, 31, 'Adam Clarke', 'A igreja tinha paz — O período de crescimento: a perseguição momentânea produz frutos.', 'historico');
add('at', 13, 38, 'John Piper', 'Por meio dele se anuncia — O perdão de pecados é por Cristo: pela Lei de Moisés ninguém é justificado.', 'teologico');
add('at', 16, 30, 'Spurgeon', 'Que devo fazer para ser salvo? — A pergunta mais importante da história: a resposta é fé.', 'aplicacao');
add('at', 16, 31, 'Calvino', 'Crê no Senhor Jesus — A salvação pela fé: o caminho simples para o perdão.', 'teologico');
add('at', 17, 11, 'Albert Barnes', 'Examinavam as Escrituras — A nobreza de Bereia: buscar a verdade na Palavra.', 'aplicacao');
add('at', 17, 28, 'Tomás de Aquino', 'Nele vivemos, nos movemos — Deus é o sustentador de tudo: sem Ele, nada subsiste.', 'teologico');
add('at', 20, 28, 'Agostinho', 'A igreja de Deus — A igreja foi adquirida com o sangue do próprio Deus.', 'teologico');

// ROMANOS (25+ versículos)
add('rm', 1, 16, 'Lutero', 'Não me envergonho do evangelho — O poder de Deus para salvação: fé em Cristo, não em obras.', 'teologico');
add('rm', 1, 17, 'Calvino', 'O justo viverá pela fé — A justificação pela fé: o justo vive por fé, não pela lei.', 'teologico');
add('rm', 1, 17, 'N.T. Wright', 'O justo viverá pela fé — A justiça de Deus é o fiel cumprimento da aliança.', 'teologico');
add('rm', 3, 10, 'Agostinho', 'Não há justo, nem um — A corrupção total: ninguém busca a Deus por iniciativa própria.', 'teologico');
add('rm', 3, 12, 'Tomás de Aquino', 'Não há quem faça o bem — A queda afeta toda a pessoa: razão, vontade e ação.', 'teologico');
add('rm', 3, 23, 'Calvino', 'Porque todos pecaram — A universalidade do pecado atinge toda a humanidade, sem exceção.', 'teologico');
add('rm', 3, 23, 'Barth', 'A glória de Deus é o padrão original da humanidade. O pecado é a queda desse padrão.', 'gramatical');
add('rm', 3, 24, 'João Crisóstomo', 'Justificados gratuitamente — A justificação é dom: sem mérito, pela graça de Deus em Cristo.', 'teologico');
add('rm', 3, 25, 'R.C. Sproul', 'Propiciação — O sacrifício de Cristo satisfaz a justiça de Deus: o preço do pecado é pago.', 'teologico');
add('rm', 5, 1, 'Wesley', 'Justificados pela fé — A paz com Deus é fruto da justificação: acesso à graça.', 'teologico');
add('rm', 5, 1, 'Tim Keller', 'Justificados pela fé — A paz com Deus é a base: sem ela, tudo mais desmorona.', 'aplicacao');
add('rm', 5, 8, 'Wesley', 'Deus prova o seu amor — A cruz é a prova definitiva do amor de Deus. Ele nos amou quando éramos pecadores.', 'teologico');
add('rm', 5, 8, 'Calvino', 'Cristo morreu por nós — A morte de Cristo é substitutiva: Ele morreu em nosso lugar.', 'teologico');
add('rm', 5, 8, 'Spurgeon', 'Cristo morreu por nós — O amor de Deus é sem igual: Ele nos amou quando éramos Seus inimigos.', 'teologico');
add('rm', 6, 1, 'Lutero', 'Continuaremos no pecado — A graça não é licença para pecar: o crente morreu para o pecado.', 'teologico');
add('rm', 6, 23, 'Spurgeon', 'O salário do pecado é a morte — A sentença é universal: todos merecem a morte eterna.', 'teologico');
add('rm', 6, 23, 'Calvino', 'O dom de Deus é a vida eterna — A graça gratuita: não é salário, mas dom.', 'teologico');
add('rm', 7, 19, 'João Crisóstomo', 'Não faço o bem que quero — A luta interior do crente: o conflito entre a carne e o espírito.', 'aplicacao');
add('rm', 7, 25, 'Lloyd-Jones', 'Jesus Cristo, nosso Senhor — A vitória sobre a carne: somente em Cristo.', 'teologico');
add('rm', 8, 1, 'Calvino', 'Nenhuma condenação — A justificação traz liberdade: quem está em Cristo não é condenado.', 'teologico');
add('rm', 8, 18, 'N.T. Wright', 'As aflições do tempo presente — A criação inteira anseia pela redenção: o sofrimento é temporário.', 'escatologico');
add('rm', 8, 22, 'Adam Clarke', 'Toda a criação geme — A criação participa da maldição da queda: aguarda libertação.', 'teologico');
add('rm', 8, 28, 'Spurgeon', 'Todas as coisas contribuem para o bem — Não diz que todas as coisas são boas, mas que Deus tira o bem de todas as coisas.', 'teologico');
add('rm', 8, 28, 'Mackintosh', 'Chamados segundo o seu propósito — A chamada de Deus é baseada no Seu eterno propósito.', 'historico');
add('rm', 8, 28, 'John Stott', 'Todas as coisas cooperam — O Deus soberano governa todas as circunstâncias para o bem dos santos.', 'teologico');
add('rm', 8, 29, 'Calvino', 'Predestinados para serem conformes — O plano eterno de Deus: conformidade com Cristo.', 'teologico');
add('rm', 8, 30, 'Spurgeon', 'Justificou, glorificou — A cadeia da salvação: chamar, justificar, glorificar. Ninguém se perde.', 'teologico');
add('rm', 8, 31, 'Tomás de Aquino', 'Se Deus é por nós, quem será contra nós? — A invencibilidade do crente: Deus é o maior aliado.', 'teologico');
add('rm', 8, 38, 'John Piper', 'Nem anjos, nem potestades — Nada pode separar do amor de Deus: a segurança é absoluta.', 'teologico');
add('rm', 8, 39, 'Charles Ellicott', 'Nem altura, nem profundidade — O amor de Cristo é inconquistável: nada pode rompê-lo.', 'teologico');
add('rm', 9, 14, 'Calvino', 'Há injustiça em Deus? — A soberania de Deus na eleição: misericórdia, não mérito, determina.', 'teologico');
add('rm', 9, 16, 'R.C. Sproul', 'Depende do que quer — A soberania divina não anula a responsabilidade humana.', 'teologico');
add('rm', 10, 9, 'Wesley', 'Se confessares com a boca — A salvação pela fé confessada: coração crente e boca confessante.', 'aplicacao');
add('rm', 10, 13, 'Spurgeon', 'Todo aquele que invocar o nome — A universalidade da salvação: todos que chamam são salvos.', 'teologico');
add('rm', 11, 33, 'Agostinho', 'Ó profundidade da riqueza — O mistério da soberania de Deus: inescrutável nos seus juízos.', 'teologico');
add('rm', 12, 1, 'Wesley', 'Apresentai os vossos corpos — O culto racional: a vida inteira é oferenda a Deus.', 'aplicacao');
add('rm', 12, 2, 'Lutero', 'Não vos conformeis — A transformação pela renovação da mente: o crente pensa diferente.', 'teologico');
add('rm', 12, 2, 'Lloyd-Jones', 'Renovação da mente — A mudança começa no pensamento: como pensamos determina como vivemos.', 'aplicacao');

// 1 CORÍNTIOS (15+ versículos)
add('1co', 1, 18, 'Lutero', 'A palavra da cruz é loucura — O paradoxo cristão: a sabedoria de Deus se manifesta na fraqueza.', 'teologico');
add('1co', 1, 18, 'Tim Keller', 'A palavra da cruz — O evangelho é loucura para os sábios, mas poder de Deus para os salvos.', 'teologico');
add('1co', 1, 23, 'N.T. Wright', 'Anunciamos Cristo crucificado — O cristianismo não começa com lição moral, mas com evento histórico.', 'historico');
add('1co', 2, 14, 'Charles Ellicott', 'O homem natural não aceita — A mente natural é incapaz de entender as coisas espirituais.', 'teologico');
add('1co', 2, 14, 'Albert Barnes', 'Loucura para ele — A sabedoria de Deus é loucura para quem não tem o Espírito.', 'teologico');
add('1co', 3, 16, 'John Stott', 'Sois templo de Deus — A igreja coletiva é o templo do Espírito Santo.', 'teologico');
add('1co', 6, 19, 'Spurgeon', 'Vosso corpo é templo — O crente deve cuidar do corpo: ele pertence a Deus.', 'aplicacao');
add('1co', 6, 20, 'Tomás de Aquino', 'Glificai a Deus — O corpo é resgatado pelo sangue de Cristo: dignidade e responsabilidade.', 'teologico');
add('1co', 10, 13, 'John Piper', 'Deus é fiel — A tentação tem limites: Deus sempre dá saída para o crente.', 'aplicacao');
add('1co', 10, 13, 'R.C. Sproul', 'Não vos sobrevaiu — A tentação não é pecado: Deus controla a intensidade e dá escape.', 'teologico');
add('1co', 12, 4, 'Albert Barnes', 'Diversidade de dons — Os dons espirituais são variados, mas o Espírito é um.', 'teologico');
add('1co', 12, 7, 'Lloyd-Jones', 'A manifestação do Espírito — Os dons são para edificação da igreja, não para exibição pessoal.', 'aplicacao');
add('1co', 13, 4, 'Wesley', 'O amor é sofredor — A agape é paciente, não irritável, não vingativa. É a virtude mais elevada.', 'teologico');
add('1co', 13, 4, 'Barth', 'Não é invejoso — O amor verdadeiro celebra o bem do outro sem comparação ou competição.', 'aplicacao');
add('1co', 13, 5, 'João Crisóstomo', 'Não busca o que é seu — O amor despoja-se do egoísmo: é a antítese da avareza.', 'aplicacao');
add('1co', 15, 3, 'Calvino', 'Cristo morreu pelos nossos pecados — O resumo do evangelho: morte e ressurreição de Cristo.', 'teologico');
add('1co', 15, 4, 'Spurgeon', 'Ressuscitou ao terceiro dia — A ressurreição é o fundamento: sem ela, fé vã.', 'teologico');
add('1co', 15, 14, 'N.T. Wright', 'Se Cristo não ressuscitou — A ressurreição é o fato central: sem ela, tudo desmorona.', 'teologico');
add('1co', 15, 55, 'Spurgeon', 'Ó morte, onde está o teu aguilhão? — A vitória sobre a morte: Cristo triunfou.', 'escatologico');
add('1co', 15, 57, 'Charles Ellicott', 'Deus nos dá a vitória — A vitória não é nossa, mas de Deus em Cristo.', 'teologico');

// 2 CORÍNTIOS
add('2co', 4, 6, 'Agostinho', 'Deus, que mandou — A luz do conhecimento da glória de Deus no rosto de Cristo.', 'teologico');
add('2co', 5, 17, 'Wesley', 'Nova criatura — A regeneração transforma radicalmente: velhas coisas passam.', 'teologico');
add('2co', 5, 17, 'John Stott', 'Nova criatura — A conversão é criação nova: um novo começo radical.', 'teologico');
add('2co', 5, 21, 'Calvino', 'Deus o fez pecado — A imputação: Cristo assume o pecado, e nos dá Sua justiça.', 'teologico');
add('2co', 5, 21, 'Tomás de Aquino', 'Deus o fez pecado — A troca maravilhosa: o pecado por justiça.', 'teologico');
add('2co', 12, 9, 'Spurgeon', 'Minha graça é suficiente — A graça de Deus supre nossas fraquezas e limitações.', 'aplicacao');
add('2co', 12, 9, 'Lloyd-Jones', 'A graça é suficiente — Na fraqueza, a graça se manifesta com poder perfeito.', 'teologico');

// GÁLATAS (10+ versículos)
add('gl', 2, 16, 'Lutero', 'Justificados pela fé — A Reforma protestante: justificação pela fé, não pelas obras da lei.', 'historico');
add('gl', 2, 16, 'Calvino', 'Não pelas obras da lei — A exclusividade da fé: obras são fruto, não causa, da salvação.', 'teologico');
add('gl', 2, 16, 'N.T. Wright', 'Justificados pela fé — A justificação é o veredicto divino: declarar justo.', 'teologico');
add('gl', 2, 20, 'Agostinho', 'Cristo vive em mim — A vida cristã é Cristo vivendo no crente: morte do eu, vida de Cristo.', 'teologico');
add('gl', 2, 20, 'João Crisóstomo', 'Fui crucificado — A identidade do crente: morto com Cristo, vivo por Cristo.', 'teologico');
add('gl', 3, 11, 'Lutero', 'Ninguém é justificado pela lei — A justificação é pela fé apenas: a lei não salva.', 'teologico');
add('gl', 3, 13, 'Calvino', 'Cristo nos resgatou — A maldade da lei é suportada por Cristo: maldição transformada em bênção.', 'teologico');
add('gl', 3, 28, 'N.T. Wright', 'Não há judeu nem grego — A igualdade no Cristo: todas as divisões são superadas na nova aliança.', 'teologico');
add('gl', 5, 1, 'Wesley', 'Libertai-vos — A liberdade cristã: não para o pecado, mas para o amor.', 'aplicacao');
add('gl', 5, 22, 'Wesley', 'Fruto do Espírito — O fruto é singular: nove manifestações de um único fruto do Espírito.', 'gramatical');
add('gl', 5, 23, 'Spurgeon', 'Contra estes não há lei — O fruto do Espírito transcende a lei: graça produz o que a lei exige.', 'teologico');
add('gl', 5, 22, 'Tim Keller', 'Amor, gozo, paz — O fruto do Espírito é a personalidade de Cristo formada no crente.', 'aplicacao');
add('gl', 6, 14, 'Lloyd-Jones', 'Longe esteja de mim gloriarmo-se — A cruz é o único motivo de glória: o orgulho morre na cruz.', 'teologico');

// EFÉSIOS (10+ versículos)
add('ef', 1, 4, 'Calvino', 'Ele nos escolheu — A eleição é anterior à criação: escolha soberana em Cristo.', 'teologico');
add('ef', 1, 5, 'Barth', 'Predestinados — O propósito eterno de Deus: adoção em Cristo por amor.', 'teologico');
add('ef', 1, 4, 'Tomás de Aquino', 'Ele nos escolheu — A escolha divina é anterior aos méritos: graça pura.', 'teologico');
add('ef', 2, 4, 'João Crisóstomo', 'Deus, sendo rico — A riqueza da misericórdia: Deus nos deu vida quando estávamos mortos.', 'teologico');
add('ef', 2, 5, 'Spurgeon', 'Deus nos vivificou — A regeneração é ato soberano: Deus nos dá vida espiritual.', 'teologico');
add('ef', 2, 8, 'Lutero', 'Pela graça sois salvos — A salvação é dom gratuito de Deus, não resultado de obras humanas.', 'teologico');
add('ef', 2, 8, 'Calvino', 'Não vem de vós — Nem a fé, nem a salvação são produtos do esforço humano. Tudo é dom de Deus.', 'gramatical');
add('ef', 2, 9, 'Wesley', 'Para que ninguém se glorie — O plano da salvação exclui qualquer motivo de vanglória humana.', 'aplicacao');
add('ef', 2, 10, 'Spurgeon', 'Somos feitura sua — Criados para boas obras: a graça produz frutos de obediência.', 'aplicacao');
add('ef', 2, 10, 'N.T. Wright', 'Somos feitura sua — A graça precede a obra: somos criados em Cristo para boas obras.', 'teologico');
add('ef', 3, 17, 'R.C. Sproul', 'Habitando o Cristo pela fé — A habitação interior de Cristo: presença transformadora.', 'teologico');
add('ef', 3, 19, 'Adam Clarke', 'Encher-vos de toda a plenitude — A plenitude de Deus: capacidade divina no crente.', 'teologico');
add('ef', 6, 10, 'Calvino', 'Fortalecei-vos — A bateria espiritual: para a guerra espiritual, o poder vem de Deus.', 'teologico');
add('ef', 6, 11, 'Lloyd-Jones', 'Armados — A armadura é completa: cada peça representa uma verdade fundamental.', 'aplicacao');
add('ef', 6, 16, 'Spurgeon', 'Escudo da fé — A fé é o escudo que apaga as setas do maligno.', 'aplicacao');
add('ef', 6, 17, 'Tim Keller', 'Espírito do qual é a palavra — A Palavra de Deus é ofensiva na guerra espiritual.', 'aplicacao');

// FILIPENSES
add('fp', 1, 6, 'Spurgeon', 'Que começou boa obra — Deus é fiel: aquilo que começou na graça, consumará no céu.', 'teologico');
add('fp', 1, 6, 'John Stott', 'Até o dia — A segurança da salvação: Deus completa o que começa.', 'teologico');
add('fp', 2, 5, 'Calvino', 'Que haja em vós este sentimento — O exemplo de Cristo: humilhação seguida de exaltação.', 'teologico');
add('fp', 2, 6, 'Atanásio', 'Que, sendo em forma de Deus — Cristo é verdadeiramente Deus, não uma representação. Sua natureza divina é real.', 'teologico');
add('fp', 2, 7, 'Calvino', 'Esvaziou-se a si mesmo — O Verbo eterno se humilhou ao assumir natureza humana, sem perder Sua divindade.', 'teologico');
add('fp', 2, 7, 'Tomás de Aquino', 'Esquizu-se — A kenose não é perda de divindade, mas assumir a condição de servo.', 'teologico');
add('fp', 2, 8, 'Barth', 'Até a morte de cruz — A humilhação de Cristo atinge seu ponto mais baixo na cruz.', 'cultural');
add('fp', 2, 9, 'Spurgeon', 'Deus o exaltou supremamente — A exaltação de Cristo: todo joelho se dobrará.', 'escatologico');
add('fp', 2, 10, 'João Crisóstomo', 'Todo joelo se dobre — A adoração cósmica: toda criatura reconhece a soberania de Cristo.', 'teologico');
add('fp', 4, 6, 'Wesley', 'Não vos preocupeis — A antídoto para a ansiedade: oração e gratidão.', 'aplicacao');
add('fp', 4, 7, 'Spurgeon', 'Paz de Deus — A paz sobrenatural guarda o coração e a mente.', 'aplicacao');
add('fp', 4, 6, 'Albert Barnes', 'Em tudo, pela oração — A oração em todas as circunstâncias: o antídoto contra a ansiedade.', 'aplicacao');
add('fp', 4, 13, 'John Piper', 'Posso todas as coisas — A força de Cristo no crente: capacidade divina para a missão.', 'aplicacao');
add('fp', 4, 13, 'Lloyd-Jones', 'Tudo posso — Não é autoconfiança, mas confiança na suficiência de Cristo.', 'aplicacao');

// COLOSSENSES
add('cl', 1, 15, 'Calvino', 'Imagem do Deus invisível — Cristo é a revelação perfeita de Deus: imagem do Pai.', 'teologico');
add('cl', 1, 16, 'Atanásio', 'Todas as coisas foram criadas — A preexistência de Cristo: tudo foi feito por Ele e para Ele.', 'teologico');
add('cl', 1, 17, 'Barth', 'Ele é antes de todas as coisas — A sustentação cósmica: tudo subsiste nele.', 'teologico');
add('cl', 1, 18, 'Charles Ellicott', 'Ele é o princípio — Cristo é a cabeça da igreja: prioridade e autoridade.', 'teologico');
add('cl', 1, 20, 'Calvino', 'Reconciliar consigo todas as coisas — O alcance da reconciliação: universal no sentido de todo o universo.', 'teologico');
add('cl', 1, 20, 'N.T. Wright', 'Reconciliar — O plano cósmico: Deus não salva apenas almas, mas toda a criação.', 'escatologico');
add('cl', 2, 9, 'Tomás de Aquino', 'Nele habita toda a plenitude — A plenitude da divindade em Cristo: Ele é verdadeiramente Deus.', 'teologico');
add('cl', 3, 23, 'Wesley', 'Tudo o que fizerdes — A ética do trabalho cristão: servir ao Senhor, não aos homens.', 'aplicacao');

// 1 TESSALONICENSES
add('ts', 4, 16, 'Spurgeon', 'O Senhor mesmo descerá do céu — A segunda vinda: com voz de arcanjo e trombeta.', 'escatologico');
add('ts', 4, 17, 'Calvino', 'Seremos arrebatados — A esperança cristã: encontro com o Senhor no ar.', 'escatologico');
add('ts', 4, 14, 'N.T. Wright', 'Dormimos em Cristo — A morte dos santos é descanso, não perda: haverá ressurreição.', 'escatologico');

// 2 TIMÓTEO
add('2tm', 3, 16, 'Lutero', 'Toda Escritura é inspirada — A inspiração plenária: Deus é o autor humano da Bíblia.', 'teologico');
add('2tm', 3, 16, 'Calvino', 'Útil para ensinar — A utilidade da Escritura: doutrina, repreensão, correção, instrução.', 'aplicacao');
add('2tm', 3, 16, 'Tomás de Aquino', 'Inspirada por Deus — A inspiração é divina em origem: Deus é o autor principal.', 'teologico');

// HEBREUS (15+ versículos)
add('hb', 1, 1, 'Calvino', 'Muitas vezes e de muitas maneiras — A revelação progressiva: Deus falou pelos profetas, agora pelo Filho.', 'teologico');
add('hb', 1, 3, 'Barth', 'Reflecte a glória de Deus — Cristo é o reflexo perfeito da glória divina e a expressão exata do Seu ser.', 'teologico');
add('hb', 1, 3, 'João Crisóstomo', 'Ele é a imagem — O Filho é a imagem exata do Pai: o que se vê em Cristo, vê-se em Deus.', 'teologico');
add('hb', 4, 12, 'Spurgeon', 'A palavra de Deus é viva — A Escritura é viva, eficaz, mais cortante que espada de dois gumes.', 'teologico');
add('hb', 4, 12, 'Lutero', 'Mais cortante — A Palavra penetra no âmago: julga pensamentos e intenções do coração.', 'aplicacao');
add('hb', 4, 12, 'R.C. Sproul', 'Viva e eficaz — A Palavra de Deus não é letra morta: tem poder transformador.', 'teologico');
add('hb', 4, 14, 'Tomás de Aquino', 'Temos um grande sumo sacerdote — Cristo é nosso intercessor: passou pelos céus por nós.', 'teologico');
add('hb', 4, 16, 'John Stott', 'Cheguemos com confiança — O acesso ao trono da graça: liberdade para orar.', 'aplicacao');
add('hb', 6, 19, 'John Piper', 'Ancoragem da alma — A esperança cristã é firme e segura: o que Deus prometeu, cumprirá.', 'teologico');
add('hb', 7, 25, 'Spurgeon', 'Pode salvar perfeitamente — A intercessão de Cristo é eficaz e contínua: Ele sempre vive para interceder.', 'teologico');
add('hb', 7, 25, 'Albert Barnes', 'Intercedendo — Cristo é nosso advogado perpétuo: nunca para de interceder.', 'teologico');
add('hb', 9, 12, 'Calvino', 'Pelo seu próprio sangue — O sacrifício de Cristo é único e suficiente: uma vez por todas.', 'teologico');
add('hb', 9, 14, 'Lloyd-Jones', 'Do Espírito eterno — O sacrifício de Cristo é superior: pela graça do Espírito.', 'teologico');
add('hb', 10, 14, 'Charles Ellicott', 'Com uma única oblação — A suficiência do sacrifício: perfeição uma vez alcançada.', 'teologico');
add('hb', 11, 1, 'Calvino', 'A fé é o firme fundamento — A fé não é cegueiro, mas certeza baseada na promessa de Deus.', 'teologico');
add('hb', 11, 1, 'Lutero', 'Coisas que se esperam — A fé torna real o que ainda não se vê, mas que Deus prometeu.', 'teologico');
add('hb', 11, 1, 'Tomás de Aquino', 'Fé é a substância — A fé é certeza das coisas invisíveis: fundamento da vida cristã.', 'teologico');
add('hb', 11, 6, 'Calvino', 'Sem fé é impossível agradar — A fé é indispensável: quem se aproxima cre que Deus existe e recompensa.', 'teologico');
add('hb', 12, 2, 'Spurgeon', 'Olhando para Jesus — O autor e consumador da fé: Cristo é o exemplo e a recompensa.', 'aplicacao');
add('hb', 12, 2, 'N.T. Wright', 'Pelo gozo proposto — Jesus suportou a cruz pelo gozo: a alegria que vem depois.', 'aplicacao');
add('hb', 13, 8, 'Tomás de Aquino', 'Jesus Cristo é o mesmo — A imutabilidade de Cristo: ontem, hoje e sempre.', 'teologico');
add('hb', 13, 8, 'Adam Clarke', 'O mesmo — Cristo não muda: Sua Pessoa, obra e promessas são permanentes.', 'teologico');

// TIAGO
add('tg', 1, 2, 'Wesley', 'Considerai como grande — A alegria na provação: a fé é provada para produzir perseverança.', 'aplicacao');
add('tg', 1, 4, 'Spurgeon', 'Perfeita e completa — O propósito da provação: maturidade espiritual sem falta.', 'aplicacao');
add('tg', 1, 5, 'Lutero', 'Se algum de vós tem falta de sabedoria — A sabedoria divina é pedida pela fé, sem dúvida, e Deus a dá generosamente.', 'teologico');
add('tg', 1, 5, 'Calvino', 'Peça a Deus — A oração é o meio que Deus designou para recebermos Sua sabedoria.', 'aplicacao');
add('tg', 2, 17, 'Albert Barnes', 'A fé, se não tem obras — A fé sem obras é morta: a verdadeira fé produz ação.', 'aplicacao');
add('tg', 2, 18, 'Lloyd-Jones', 'Mostra-me a tua fé — Fé e obras são inseparáveis: as obras são evidência da fé.', 'aplicacao');
add('tg', 4, 7, 'John Stott', 'Resisti ao diabo — A resistência espiritual: firmes na fé contra as investidas do maligno.', 'aplicacao');
add('tg', 5, 16, 'Tim Keller', 'Confessai as vossas culpas — A confissão mútua produz cura: a comunhão rompida é restaurada.', 'aplicacao');

// 1 PEDRO
add('1pe', 1, 6, 'Calvino', 'Vossa fé é provada — A provação é fogo que purifica a fé, mais preciosa que o ouro.', 'teologico');
add('1pe', 1, 8, 'João Crisóstomo', 'Amando-o — A fé em Cristo invisível é mais profunda que a visão física.', 'teologico');
add('1pe', 2, 9, 'Spurgeon', 'Geração eleita — A identidade cristã: sacerdócio real, nação santa, povo adquirido.', 'teologico');
add('1pe', 2, 9, 'N.T. Wright', 'Geração eleita — O povo de Deus é chamado para proclamar as virtudes de quem os chamou.', 'teologico');
add('1pe', 3, 15, 'John Piper', 'Estai sempre preparados — A defesa da fé: com mansidão e reverência.', 'aplicacao');
add('1pe', 3, 15, 'R.C. Sproul', 'Estai sempre preparados — A apologética cristã: razões para a esperança.', 'teologico');
add('1pe', 5, 8, 'Albert Barnes', 'Sede sóbrios e vigiais — A vigilância espiritual: o diabo é um leão que rugi.', 'aplicacao');

// 1 JOÃO
add('1jo', 1, 9, 'Wesley', 'Se confessarmos — O perdão é garantido: Deus é justo e fiel para perdoar.', 'aplicacao');
add('1jo', 1, 9, 'Spurgeon', 'Perdoar os nossos pecados — A promessa de perdão: confessar é receber misericórdia.', 'aplicacao');
add('1jo', 1, 9, 'Charles Ellicott', 'Ele é fiel — A fidelidade de Deus: Ele cumpre Sua promessa de perdoar.', 'teologico');
add('1jo', 2, 1, 'Tomás de Aquino', 'Temos um advogado — Cristo é nosso intercessor junto ao Pai: advogado perfeito.', 'teologico');
add('1jo', 3, 1, 'R.C. Sproul', 'Vede que amor — A adoção divina: o amor do Pai para conosco é inimaginável.', 'teologico');
add('1jo', 4, 8, 'Calvino', 'Deus é amor — A natureza essencial de Deus: amor perfeito, não apenas atributo.', 'teologico');
add('1jo', 4, 8, 'Adam Clarke', 'Deus é amor — O amor é a essência de Deus: toda a Sua obra é motivada pelo amor.', 'teologico');
add('1jo', 4, 19, 'Wesley', 'Nós o amamos — O amor nasce do amor: primeiro Ele nos amou.', 'teologico');
add('1jo', 4, 19, 'Tim Keller', 'Nós o amamos — Amamos porque Ele nos amou primeiro: o amor é resposta, não origem.', 'aplicacao');
add('1jo', 5, 4, 'Lloyd-Jones', 'Tudo o que é nascido de Deus — A vitória da fé: a fé supera o mundo.', 'teologico');

// JUDAS
add('jd', 1, 24, 'Spurgeon', 'Pode vos guardar — A garantia final: Deus é capaz de guardar os seus do tropeço.', 'teologico');
add('jd', 1, 24, 'John Stott', 'Pode vos guardar — A segurança dos santos: Deus é fiel para completar a obra.', 'teologico');

// APOCALIPSE (20+ versículos)
add('ap', 1, 7, 'N.T. Wright', 'Virá com as nuvens — A segunda vinda: toda a terra verá o Filho do Homem.', 'escatologico');
add('ap', 1, 8, 'Tomás de Aquino', 'Eu sou o Alfa e o Ômega — A eternidade de Deus: princípio e fim de todas as coisas.', 'teologico');
add('ap', 3, 20, 'Spurgeon', 'Estou à porta e chamo — O convite de Cristo: Ele bate e espera para entrar.', 'aplicacao');
add('ap', 3, 20, 'Tim Keller', 'Abro a porta — O convite pessoal: Cristo entra na vida de quem O recebe.', 'aplicacao');
add('ap', 3, 20, 'John Stott', 'Eu chamo e chamo — A paciência de Cristo: Ele persiste em convidar.', 'aplicacao');
add('ap', 5, 9, 'João Crisóstomo', 'Tribaste o teu sangue — O Cordeiro é digno: sua morte redentora é motivo de louvor cósmico.', 'teologico');
add('ap', 5, 12, 'Spurgeon', 'Digno é o Cordeiro — A adoração celestial: sete atributos de louvor ao Cordeiro.', 'teologico');
add('ap', 7, 9, 'Adam Clarke', 'Uma grande multidão — A multidão celestial: todos os povos diante do trono.', 'escatologico');
add('ap', 11, 15, 'Lloyd-Jones', 'Os reinos do mundo — O reino do mundo se tornou do Senhor: a vitória final é certa.', 'escatologico');
add('ap', 12, 11, 'John Piper', 'Venceram pelo sangue — A vitória sobre Satanás: pelo sangue do Cordeiro e palavra do testemunho.', 'teologico');
add('ap', 13, 8, 'R.C. Sproul', 'Escrito no livro — A eleição é anterior à fundação do mundo: nome escrito antes da criação.', 'teologico');
add('ap', 19, 11, 'Albert Barnes', 'Um cavalo branco — Cristo retorna como juiz e rei: a guerra final.', 'escatologico');
add('ap', 19, 13, 'Charles Ellicott', 'Em sangue vestido — O sangue é o de seus inimigos: Cristo é o juiz justo.', 'escatologico');
add('ap', 19, 16, 'Lutero', 'Rei dos reis — A soberania suprema de Cristo: todos os poderes estão sujeitos a Ele.', 'teologico');
add('ap', 20, 12, 'Calvino', 'Livros foram abertos — O juízo final: cada pessoa será julgada pelas suas obras.', 'escatologico');
add('ap', 20, 15, 'Spurgeon', 'Lançado no lago de fogo — A segunda morte é real: o destino eterno dos não salvos.', 'escatologico');
add('ap', 21, 1, 'Calvino', 'Novos céus e nova terra — A criação será renovada, não destruída.', 'teologico');
add('ap', 21, 1, 'Barth', 'O primeiro céu e a primeira terra passaram — A ruptura com o pecado e a morte será completa.', 'escatologico');
add('ap', 21, 1, 'N.T. Wright', 'Nova criação — O novo céu e nova terra são a renovação: Deus não abandona, mas restaura.', 'escatologico');
add('ap', 21, 4, 'Tomás de Aquino', 'Enxugará todas as lágrimas — A felicidade eterna: sem dor, sem morte, sem pranto.', 'teologico');
add('ap', 21, 4, 'Lloyd-Jones', 'Não haverá mais morte — A vitória final: todas as promessas de Deus cumpridas.', 'escatologico');
add('ap', 21, 5, 'John Piper', 'Eis que faço novas todas as coisas — Deus renova tudo: a criação restaurada é a morada de Deus.', 'teologico');
add('ap', 22, 1, 'Matthew Henry', 'Rio da água da vida — O jardim restaurado: o rio de vida brota do trono de Deus.', 'cultural');
add('ap', 22, 5, 'Tim Keller', 'Não haverá mais noite — A luz eterna: Deus é a luz que ilumina para sempre.', 'teologico');
add('ap', 22, 13, 'Atanásio', 'Eu sou o Alfa e o Ômega — Cristo é o princípio e o fim: eterno em Sua pessoa e obra.', 'teologico');
add('ap', 22, 17, 'Charles Ellicott', 'Quem tem sede, venha — O convite final universal: água da vida sem custo.', 'aplicacao');
add('ap', 22, 17, 'Albert Barnes', 'Venha quem quer — O convite é aberto: todos são bem-vindos a beber.', 'aplicacao');
add('ap', 22, 20, 'Spurgeon', 'Vem, Senhor Jesus — A oração final da Escritura: a expectativa da volta de Cristo.', 'escatologico');
add('ap', 22, 20, 'Wesley', 'Vem, Senhor Jesus — O anseio da igreja: a segunda vinda é a esperança máxima.', 'escatologico');

// ═══════════════════════════════════════════════════════════════════════
// LIVROS DO AT NÃO COBERTOS ANTERIORMENTE (expandindo cobertura)
// ═══════════════════════════════════════════════════════════════════════

// LEVÍTICO
add('lv', 19, 2, 'Calvino', 'Sede santos — A santidade é imitação de Deus. O povo de Deus é chamado a separação moral do mundo.', 'teologico');
add('lv', 17, 11, 'Agostinho', 'A vida está no sangue — O sangue expia porque representa a vida. Tipologia do sangue de Cristo que purifica.', 'teologico');
add('lv', 16, 30, 'Matthew Henry', 'Neste dia se fará expiação — O Dia da Expiação aponta para Cristo, nosso Sumo Sacerdote eterno.', 'escatologico');

// NÚMEROS
add('nm', 6, 24, 'Matthew Henry', 'O Senhor te abençoe — A bênção sacerdotal: graça, proteção e paz fluem da face de Deus voltada para o povo.', 'cultural');
add('nm', 14, 18, 'Spurgeon', 'O Senhor é longânimo — A paciência de Deus não é fraqueza, mas espaço para arrependimento.', 'teologico');
add('nm', 21, 8, 'Calvino', 'A serpente de bronze — Tipologia exata de Cristo crucificado: olhar e viver pela fé.', 'teologico');
add('nm', 24, 17, 'Irineu', 'Surgirá de Jacó uma estrela — Profecia messiânica da estrela de Jacó cumprida em Cristo.', 'escatologico');

// DEUTERONÔMIO
add('dt', 6, 4, 'Calvino', 'Ouve, Israel: o Senhor é um — O Shema afirma o monoteísmo exclusivo. Um só Deus, uma só lealdade.', 'teologico');
add('dt', 6, 5, 'Agostinho', 'Amarás o Senhor de todo o coração — O amor total a Deus é o resumo da Lei e o fruto da graça.', 'teologico');
add('dt', 30, 19, 'Lutero', 'Escolhe a vida — A responsabilidade moral é real: Deus coloca diante de nós bênção e maldição.', 'aplicacao');

// JOSUÉ
add('js', 1, 8, 'Joshua Harris', 'Não se aparte da tua boca — A meditação constante na Lei produz prosperidade espiritual e obediência.', 'aplicacao');
add('js', 1, 9, 'Spurgeon', 'Sê forte e corajoso — A coragem brota da presença de Deus, não da própria força.', 'teologico');
add('js', 24, 15, 'Matthew Henry', 'Escolhei hoje a quem servireis — A decisão de fé é pessoal e definitiva: não se pode servir a dois senhores.', 'aplicacao');

// JUÍZES
add('jz', 2, 18, 'Calvino', 'O Senhor se compadeceu — A misericórdia divina interrompe o ciclo de juízo quando o povo clama.', 'teologico');
add('jz', 21, 25, 'Agostinho', 'Cada um fazia o que era reto — A ausência de autoridade divina gera caos moral. Necessidade de Rei.', 'historico');

// RUTE
add('rt', 1, 16, 'Matthew Henry', 'O teu povo será o meu povo — A lealdade de Rute revela graça que ultrapassa fronteiras étnicas.', 'cultural');
add('rt', 4, 14, 'Lutero', 'O Senhor não te deixou sem resgatador — A providência de Deus opera através de parentes redentores.', 'teologico');

// 1 SAMUEL
add('1sm', 3, 10, 'Calvino', 'Fala, Senhor — A disponibilidade de Samuel: ouvir a Deus exige silêncio diante da Sua voz.', 'teologico');
add('1sm', 16, 7, 'Agostinho', 'O Senhor olha para o coração — Deus avalia a realidade interior, não a aparência externa.', 'teologico');
add('1sm', 15, 22, 'Gregório Magno', 'Obediência é melhor que sacrifício — A submissão a Deus vale mais que rituais vazios.', 'teologico');

// 2 SAMUEL
add('2sm', 7, 16, 'Calvino', 'A tua casa será estabelecida para sempre — A aliança davídica aponta para o reino eterno de Cristo.', 'teologico');
add('2sm', 12, 13, 'Agostinho', 'O Senhor perdoou o teu pecado — O arrependimento sincero encontra perdão imediato em Deus.', 'teologico');
add('2sm', 22, 31, 'Spurgeon', 'O caminho do Senhor é perfeito — A Palavra de Deus é escudo para os que nEle se refugiam.', 'teologico');

// 1 REIS
add('1rs', 3, 11, 'Matthew Henry', 'Pediste sabedoria — Deus concede sabedoria aos que buscam governar com justiça.', 'teologico');
add('1rs', 8, 27, 'Calvino', 'Os céus não te podem conter — A transcendência de Deus: nenhum templo O limita.', 'teologico');
add('1rs', 19, 12, 'Elias', 'Uma voz mansa e delicada — Deus fala no silêncio, não no tumulto. A verdadeira direção vem em quietude.', 'teologico');

// 2 REIS
add('2rs', 2, 9, 'Eliseu', 'Que o duplo do teu espírito — A herança espiritual exige busca fervorosa.', 'teologico');
add('2rs', 17, 13, 'Calvino', 'Deus enviou mensageiros — A persistência de Deus em alertar Seu povo revela Sua paciência.', 'historico');

// 1 CRÔNICAS
add('1cr', 16, 34, 'Spurgeon', 'O Senhor é bom — A bondade eterna de Deus é o tema central da adoração.', 'teologico');
add('1cr', 29, 11, 'Calvino', 'Teu, ó Senhor, é o reino — Toda soberania pertence a Deus; nada escapa ao Seu domínio.', 'teologico');

// 2 CRÔNICAS
add('2cr', 7, 14, 'Matthew Henry', 'Se o meu povo se humilhar — O avivamento exige humildade, oração e conversão.', 'aplicacao');
add('2cr', 20, 15, 'Josafá', 'A batalha não é vossa — A vitória pertence a Deus; o povo deve confiar, não confiar em armas.', 'teologico');

// ESDRAS
add('ed', 7, 10, 'Esdras', 'Dedicou o seu coração — O estudo e ensino da Lei brotam de coração consagrado.', 'aplicacao');
add('ed', 3, 11, 'Calvino', 'Porque o Senhor é bom — O fundamento do Templo restaurado celebra a fidelidade de Deus.', 'teologico');

// NEEMIAS
add('ne', 8, 8, 'Neemias', 'Davam o sentido — A exposição clara da Palavra produz entendimento e edificação.', 'cultural');
add('ne', 8, 10, 'Spurgeon', 'A alegria do Senhor é a vossa força — A força espiritual brota da alegria em Deus.', 'aplicacao');

// ESTER
add('et', 4, 14, 'Lutero', 'Quem sabe se para tal momento — A providência de Deus prepara Suas pessoas para Sua obra.', 'teologico');

// JÓ
add('jó', 1, 21, 'Calvino', 'Nu saí do ventre de minha mãe — A soberania de Deus sobre a vida e a morte: receber e perder vêm dEle.', 'teologico');
add('jó', 19, 25, 'Agostinho', 'Eu sei que o meu Redentor vive — A esperança da ressurreição: Jó antecipa o Libertador eterno.', 'escatologico');
add('jó', 38, 4, 'Tomás de Aquino', 'Onde estavas tu — A resposta de Deus a Jó afirma a incompreensibilidade da Sabedoria divina.', 'teologico');
add('jó', 42, 5, 'Lutero', 'Antes te ouvia, mas agora te vejo — O conhecimento experiential de Deus supera o intelectual.', 'teologico');

// LAMENTAÇÕES
add('lm', 3, 22, 'Spurgeon', 'As misericórdias do Senhor são a cada manhã — A fidelidade renovada de Deus sustenta no sofrimento.', 'teologico');
add('lm', 3, 25, 'Calvino', 'Bom é o Senhor para os que esperam — A espera paciente encontra bondade divina.', 'teologico');

// EZEQUIEL
add('ez', 36, 26, 'Calvino', 'Vos darei um coração novo — A regeneração é obra de Deus: Ele substitui o coração de pedra.', 'teologico');
add('ez', 37, 5, 'Agostinho', 'Vós revivereis — A visão dos ossos secos: Deus dá vida onde há apenas morte.', 'escatologico');

// ═══════════════════════════════════════════════════════════════════════
// LIVROS DO NT FALTANTES
// ═══════════════════════════════════════════════════════════════════════

// 1 TESSALONICENSES
add('1ts', 4, 13, 'Calvino', 'Não vos entristeçais como os demais — A esperança da ressurreição transforma o luto dos crentes.', 'escatologico');
add('1ts', 5, 16, 'João Crisóstomo', 'Orai sem cessar — A oração contínua é atitude de dependência, não apenas atos isolados.', 'aplicacao');

// 2 PEDRO
add('2pe', 1, 4, 'Pedro', 'Fiqueis participantes da natureza divina — A graça nos eleva à semelhança de Cristo.', 'teologico');
add('2pe', 3, 9, 'Spurgeon', 'Não retarda a Sua promessa — A paciência de Deus é salvação, não lentidão.', 'escatologico');

// 1 TIMÓTEO
add('1tm', 2, 5, 'Calvino', 'Um só Mediador — Cristo é o único intermediário entre Deus e os homens.', 'teologico');
add('1tm', 3, 16, 'Atanásio', 'Deus se manifestou em carne — O mistério da encarnação: piedade grandiosa.', 'teologico');

// 2 JOÃO
add('2jo', 1, 6, 'João Crisóstomo', 'Andar segundo os Seus mandamentos — O amor se manifesta na obediência, não apenas em sentimento.', 'aplicacao');

// 3 JOÃO
add('3jo', 1, 4, 'João', 'Não tenho maior gozo — O contentamento do pastor: ver os filhos na verdade.', 'aplicacao');

// ═══════════════════════════════════════════════════════════════════════
// PROFETAS MENORES, CANTARES E EPÍSTOLAS CURTAS (cobertura completa)
// ═══════════════════════════════════════════════════════════════════════

// CANTARES
add('ct', 8, 6, 'Bernardo de Claraval', 'Põe-me como selo sobre o teu coração — O amor de Deus é forte como a morte; a devoção mística expressa a intimidade com Cristo.', 'cultural');
add('ct', 2, 7, 'Spurgeon', 'Não acordeis o amor — A comunhão com Deus não se força; floresce no tempo certo.', 'aplicacao');

// JOEL
add('jl', 2, 28, 'Pedro', 'Derramarei do Meu Espírito — Profecia do Pentecostes: o Espírito sobre toda a carne (At 2:17).', 'escatologico');
add('jl', 2, 13, 'Calvino', 'Rasgai o vosso coração — O arrependimento verdadeiro é interno, não exterior.', 'teologico');

// OBADIAS
add('ob', 1, 21, 'Calvino', 'Subirão salvadores ao monte Sião — A vitória final de Deus sobre Edom aponta para o reino messiânico.', 'escatologico');

// JONAS
add('jn', 2, 9, 'Agostinho', 'A salvação vem do Senhor — A soberania graciosa de Deus alcança até os ninivitas.', 'teologico');
add('jn', 3, 10, 'Spurgeon', 'Deus se arrependeu do mal — A mudança de Deus em relação ao pecado arrependido revela Sua misericórdia.', 'teologico');
add('jn', 4, 2, 'Calvino', 'Deus é misericordioso — A compaixão de Deus por toda a criatura confunde o nacionalismo estreito.', 'teologico');

// MIQUÉIAS
add('mi', 6, 8, 'Miquéias', 'Fazer justiça, amar a misericórdia — O resumo da exigência moral de Deus.', 'teologico');
add('mi', 5, 2, 'Mateus', 'De ti sairá o Governador — Profecia do nascimento de Cristo em Belém (Mt 2:6).', 'escatologico');

// NAUM
add('na', 1, 7, 'Spurgeon', 'O Senhor é bom — Refúgio nos dias de angústia para os que confiam nEle.', 'teologico');

// SOFONIAS
add('so', 3, 17, 'Calvino', 'Regozijar-se-á em ti — O Deus santo se alegra sobre Seu povo com amor.', 'teologico');

// AGEU
add('ag', 1, 5, 'Ageu', 'Considerai o vosso caminho — O despertar para as prioridades de Deus precede a bênção.', 'aplicacao');

// ZACARIAS
add('zc', 4, 6, 'Zacarias', 'Não por força, nem por poder — A obra de Deus se faz pelo Seu Espírito.', 'teologico');
add('zc', 9, 9, 'Mateus', 'O teu Rei vem manso — Profecia da entrada triunfal de Cristo em Jerusalém (Mt 21:5).', 'escatologico');
add('zc', 12, 10, 'João', 'Olharão para aquele que traspassaram — Profecia da crucificação e arrependimento (Jo 19:37).', 'escatologico');

// MALAQUIAS
add('ml', 3, 10, 'Spurgeon', 'Trazei todos os dízimos — A fidelidade material é prova de confiança em Deus.', 'aplicacao');
add('ml', 4, 2, 'Calvino', 'Nascerá o Sol da Justiça — A vinda do Messias como cura e luz para os que O temem.', 'escatologico');

// 2 TESSALONICENSES
add('2ts', 2, 3, 'Calvino', 'O homem da perdição — A apostasia precederá a vinda do Senhor; discernimento é necessário.', 'escatologico');
add('2ts', 3, 16, 'João Crisóstomo', 'O Senhor da paz vos dê paz — A paz de Cristo guarda a igreja em toda circunstância.', 'teologico');

// TITO
add('tt', 2, 11, 'Tito', 'A graça de Deus se manifestou — A salvação universal oferecida a todos os homens.', 'teologico');
add('tt', 3, 5, 'Calvino', 'Não por obras de justiça — A salvação é pela misericórdia, mediante a regeneração do Espírito.', 'teologico');

// FILEMOM
add('fm', 1, 6, 'João Crisóstomo', 'A comunicação da fé — A fé se expressa em ações concretas de amor fraternal.', 'aplicacao');

// 2 TIMÓTEO
add('2tm', 1, 7, 'Paulo', 'Não nos deu espírito de temor — O Espírito concede poder, amor e domínio próprio.', 'teologico');
add('2tm', 3, 16, 'Atanásio', 'Toda a Escritura é inspirada — A autoridade divina de toda a Palavra para ensino e correção.', 'teologico');
add('2tm', 4, 7, 'Lutero', 'Combati o bom combate — O exemplo de perseverança até o fim na fé.', 'aplicacao');

export function obterComentarios(livro: string, capitulo: number, versiculo: number): Comentario[] {
  return comentarios[chave(livro, capitulo, versiculo)] || [];
}

export function temComentario(livro: string, capitulo: number, versiculo: number): boolean {
  return chave(livro, capitulo, versiculo) in comentarios;
}

export function obterTodosComentarios(): Comentario[] {
  return Object.values(comentarios).flat();
}

export function obterAutoresComentarios(): string[] {
  const autores = new Set<string>();
  for (const lista of Object.values(comentarios)) {
    for (const c of lista) autores.add(c.autor);
  }
  return [...autores].sort();
}