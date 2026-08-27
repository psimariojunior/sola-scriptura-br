import type { EstudoCapitulo, VersiculoChaveCap } from './estudosCapitulo';

function ficha(
  livro: string,
  capitulo: number,
  titulo: string,
  campos: Omit<EstudoCapitulo, 'livro' | 'capitulo' | 'titulo' | 'nivel'>,
): EstudoCapitulo {
  return { livro, capitulo, titulo, nivel: 'profundo', ...campos };
}

function chave(ref: string, texto: string, explicacao: string): VersiculoChaveCap {
  return { referencia: ref, texto, explicacao };
}

/**
 * Fichas escritas à mão para capítulos canônicos centrais.
 * Qualidade de estudo profundo: contexto, estrutura, teologia, aplicação e perguntas específicas.
 * Fontes: Escritura, comentários de domínio público (Henry, Calvino, JFB) e confissões históricas —
 * sem citar autores contemporâneos com falas inventadas.
 */
export const estudosCapituloProfundos: Record<string, EstudoCapitulo> = {
  'gn:1': ficha('gn', 1, 'A criação: Deus fala e o mundo existe', {
    contextoHistorico:
      'Gênesis 1 abre a Torá e o cânon. No antigo Oriente Próximo, cosmogonias pagãs narravam deuses que lutam contra o caos. Moisés (tradição) apresenta um único Deus que cria por Palavra, sem rival, em seis dias de obra e um sétimo de descanso. O texto é teologia da criação, não tratado científico: afirma quem é o Senhor do cosmos.',
    resumo:
      '«No princípio, criou Deus os céus e a terra» (1:1) estabelece que o universo tem origem pessoal, não acaso. Elohim cria (bará) o visível e o invisível; o Espírito paira sobre as águas; a Palavra ordena a luz. Os dias seguem um ritmo de formar e encher: luz e firmamento, terra e astros, peixes e aves, animais e o ser humano. O homem e a mulher são imagem de Deus (imago Dei), com domínio de mordomia, não de tirania. Tudo é «bom»; a criação com o homem é «muito boa». O sábado (2:1–3, fronteira do cap. 1 na perícope) consagra o tempo: a criação aponta para o descanso em Deus. João 1:1–3 e Colossenses 1:16 leem este capítulo cristologicamente: o Verbo é o agente da criação.',
    estrutura: [
      '1:1 — título teológico: Deus cria céus e terra',
      '1:2 — a terra informe; o Espírito sobre as águas',
      '1:3–5 — primeiro dia: luz',
      '1:6–13 — firmamento, terra seca, vegetação',
      '1:14–25 — astros, peixes, aves, animais terrestres',
      '1:26–31 — o ser humano à imagem de Deus; «muito bom»',
    ],
    temas: ['Criação ex nihilo', 'Palavra de Deus', 'Imago Dei', 'Bondade da criação', 'Sábado', 'Soberania'],
    VersiculosChave: [
      chave('Gênesis 1:1', 'No princípio, criou Deus os céus e a terra.', 'Fundamento de toda teologia: Deus é anterior e Senhor de tudo o que existe.'),
      chave('Gênesis 1:26–27', 'Façamos o homem à nossa imagem… macho e fêmea os criou.', 'Dignidade humana e igualdade essencial de homem e mulher como portadores da imagem.'),
      chave('Gênesis 1:31', 'Viu Deus tudo quanto fizera, e eis que era muito bom.', 'A matéria não é má; o mal entra depois, pela desobediência, não pela criação.'),
    ],
    significadoTeologico:
      'A criação é ato livre de amor e poder, não emanação necessária. A pluralidade «façamos» foi lida pela igreja como semente trinitária (sem forçar o hebraico). A imagem inclui conhecimento, justiça e santidade (Ef 4:24; Cl 3:10), corrompidos na queda e restaurados em Cristo. Calvino: Moisés fala ao povo, não aos filósofos; Henry: conhecer a Deus como Criador precede conhecê-Lo como Redentor.',
    palavrasOriginais: ['בְּרֵאשִׁית (bereshit)', 'בָּרָא (bará)', 'אֱלֹהִים (Elohim)', 'צֶלֶם (tselem, imagem)'],
    aplicacaoPratica:
      'Adore o Criador, não a criatura (Rm 1:25). Trate cada pessoa como imagem de Deus. Cuide da criação como mordomo. Descanse: o sábado evangélico é descanso em Cristo (Hb 4) e ritmo de graça contra a idolatria do trabalho.',
    perguntasEstudo: [
      'O que Gn 1 afirma sobre Deus que as cosmogonias pagãs negam?',
      'Qual a diferença entre «bom» e «muito bom» no sexto dia?',
      'O que significa ser imagem de Deus — e o que isso não significa?',
      'Como João 1 e Colossenses 1 leem a criação em Cristo?',
      'Que práticas concretas (adoração, ética, descanso, cuidado da terra) nascem deste capítulo?',
    ],
    fontes: ['Gênesis 1', 'João 1:1–3', 'Colossenses 1:16', 'Comentário de Calvino a Gênesis', 'Matthew Henry'],
  }),

  'gn:2': ficha('gn', 2, 'O jardim, a aliança e o casamento', {
    contextoHistorico:
      'Gênesis 2 retoma a criação com lente complementar: não contradição, mas zoom no sexto dia. O nome YHWH Elohim une o Deus da aliança ao Criador. O jardim no Éden é santuário: rios, árvores, vocação de cultivar e guardar (abad e shamar — verbos depois usados no tabernáculo).',
    resumo:
      'Deus forma o homem do pó e sopra fôlego de vida; o coloca no jardim com liberdade e um limite: a árvore do conhecimento do bem e do mal. A solidão «não é boa» — primeira nota negativa na criação. A mulher é construída da costela: igual em natureza, distinta em pessoa, auxiliar correspondente (ezer kenegdo — auxílio que está diante, não inferioridade). O casamento é aliança de uma só carne, anterior à queda e à Lei. O capítulo fundamenta antropologia, trabalho, casamento e a prova da obediência.',
    estrutura: [
      '2:1–3 — sábado (conclusão da semana criadora)',
      '2:4–7 — formação de Adão do pó',
      '2:8–17 — o jardim, as duas árvores, o mandato e a proibição',
      '2:18–25 — a mulher, o casamento, nudez sem vergonha',
    ],
    temas: ['Aliança das obras', 'Trabalho', 'Casamento', 'Liberdade e limite', 'Santuário no Éden'],
    VersiculosChave: [
      chave('Gênesis 2:7', 'O Senhor Deus formou o homem do pó da terra e soprou em seus narizes o fôlego da vida.', 'O homem é pó e sopro: criatura, não Deus; corpo e vida são dons.'),
      chave('Gênesis 2:16–17', 'De toda árvore… livremente comerás; mas da árvore do conhecimento do bem e do mal, não comerás.', 'Liberdade vasta, limite único: a autoridade de Deus define o bem.'),
      chave('Gênesis 2:24', 'Deixará o homem seu pai e sua mãe e unir-se-á à sua mulher; serão ambos uma só carne.', 'Jesus cita este verso contra o divórcio fácil (Mt 19:4–6): o casamento é instituição criacional.'),
    ],
    significadoTeologico:
      'A teologia reformada viu aqui a «aliança das obras»: vida condicionada à obediência. O segundo Adão cumpre o que o primeiro quebrou (Rm 5; 1 Co 15). O casamento aponta para Cristo e a igreja (Ef 5:31–32) sem reduzir Gn 2 a alegoria que esvazie a história.',
    palavrasOriginais: ['יְהוָה אֱלֹהִים', 'עָפָר (afar, pó)', 'נֶפֶשׁ חַיָּה', 'עֵזֶר כְּנֶגְדּוֹ'],
    aplicacaoPratica:
      'Trabalhe como quem cultiva o jardim de Deus. Honre o casamento. Aceite limites: a liberdade cristã não é autonomia absoluta. Lembre-se de que é pó — e de que o último Adão dá o Espírito (1 Co 15:45).',
    perguntasEstudo: [
      'Como Gn 2 complementa Gn 1 sem contradizê-lo?',
      'Por que o trabalho existe antes da queda?',
      'O que a formação da mulher ensina sobre igualdade e distinção?',
      'Como Jesus e Paulo usam Gn 2:24?',
      'Qual o sentido teológico da única proibição no jardim?',
    ],
    fontes: ['Gênesis 2', 'Mateus 19:4–6', 'Efésios 5:31–32', 'Romanos 5:12–21'],
  }),

  'gn:3': ficha('gn', 3, 'A queda e o protoevangelho', {
    contextoHistorico:
      'Após a bondade da criação, o capítulo 3 explica a origem do mal moral no mundo: não um segundo deus, mas a criatura que duvida da Palavra. A serpente é identificada depois como o diabo (Ap 12:9; 20:2). O diálogo distorce o mandamento, nega o juízo e promete divindade autônoma.',
    resumo:
      'A serpente questiona («é assim que Deus disse?»), distorce e contradiz («certamente não morrereis»). Eva vê, deseja e toma; Adão, presente e silente, come. Abrem-se os olhos para a vergonha, não para a sabedoria. Deus busca («onde estás?»), julga a serpente, a mulher e o homem, e promete: a semente da mulher ferirá a cabeça da serpente (3:15) — o protoevangelho. Túnicas de pele cobrem a nudez: graça que envolve juízo. A expulsão do jardim impede o acesso à árvore da vida em estado caído; querubins guardam o caminho que só Cristo reabre.',
    estrutura: [
      '3:1–7 — tentação, dúvida, transgresão',
      '3:8–13 — busca divina, medo, acusação mútua',
      '3:14–19 — sentenças: serpente, mulher, homem, solo',
      '3:20–24 — nome de Eva, peles, expulsão, querubins',
    ],
    temas: ['Pecado', 'Dúvida da Palavra', 'Vergonha', 'Juízo', 'Protoevangelho', 'Graça no juízo'],
    VersiculosChave: [
      chave('Gênesis 3:6', 'Vendo a mulher que a árvore era boa para se comer… tomou do seu fruto e comeu; e deu também a seu marido, e ele comeu.', 'O pecado entra pela incredulidade que se torna desejo e ato; Adão é cabeça federal (Rm 5:12).'),
      chave('Gênesis 3:15', 'Porei inimizade entre ti e a mulher, entre a tua semente e a sua semente; esta te ferirá a cabeça.', 'Primeira promessa do Redentor: guerra até a vitória do Messias na cruz.'),
      chave('Gênesis 3:21', 'Fez o Senhor Deus a Adão e a sua mulher túnicas de peles, e os vestiu.', 'Cobertura pela morte de um substituto: tipo da justiça imputada em Cristo.'),
    ],
    significadoTeologico:
      'Lutero chamou 3:15 de primeiro sermão evangélico. A morte anunciada é espiritual imediata e física ulterior. A imaginação de Deus permanece, mas a justiça original se perde. Toda a Escritura desdobra a inimizade entre as duas sementes até Apocalipse 12 e 20.',
    palavrasOriginais: ['נָחָשׁ (nachash)', 'זֶרַע (zera, semente)', 'שׁוּף (shuph, ferir)'],
    aplicacaoPratica:
      'Desconfie de toda voz que suaviza o mandamento de Deus. Confesse em vez de acusar o outro. Vista-se da justiça de Cristo, não de folhas de figueira (obras). Espere a vitória final sobre o Maligno.',
    perguntasEstudo: [
      'Como a serpente distorce as palavras de Deus em 2:16–17?',
      'Por que Paulo atribui a Adão, e não a Eva, a entrada do pecado no mundo (Rm 5)?',
      'O que Gn 3:15 promete — e o que ainda não explica?',
      'Qual o significado tipológico das túnicas de pele?',
      'Como a expulsão do Éden relaciona-se com o acesso a Deus em Hebreus 10?',
    ],
    fontes: ['Gênesis 3', 'Romanos 5:12–21', 'Apocalipse 12:9', 'Lutero e Calvino sobre Gn 3:15'],
  }),

  'gn:12': ficha('gn', 12, 'O chamado de Abrão e a bênção das nações', {
    contextoHistorico:
      'Após Babel (Gn 11), Deus não abandona as nações: escolhe um homem de Ur para abençoar todas as famílias da terra. O chamado ocorre em contexto de idolatria mesopotâmica (Js 24:2). A terra de Canaã será palco da promessa, não mero imóvel.',
    resumo:
      'O Senhor manda Abrão sair da parentela rumo a uma terra que Ele mostrará. A promessa tem três fios: descendência, terra e bênção universal (12:1–3). Abrão parte pela fé (Hb 11:8). No Egito, o medo o faz mentir sobre Sara: a eleição não cancela a fraqueza. Mesmo assim, Deus protege a matriarca. O altar e a invocação do nome do Senhor marcam o culto do peregrino. Paulo lê 12:3 em Gálatas 3:8 como evangelho pré-pregado a Abraão.',
    estrutura: [
      '12:1–3 — o chamado e as sete bênçãos',
      '12:4–9 — obediência, Siquém, Betel, altar',
      '12:10–20 — fome, Egito, mentira e livramento',
    ],
    temas: ['Eleição', 'Fé peregrina', 'Bênção às nações', 'Aliança abraâmica', 'Fraqueza do eleito'],
    VersiculosChave: [
      chave('Gênesis 12:1–3', 'Sai da tua terra… em ti serão benditas todas as famílias da terra.', 'Eleição com missão: Abraão não é fim em si; Cristo é a Semente (Gl 3:16).'),
      chave('Gênesis 12:7', 'À tua descendência darei esta terra.', 'A terra é penhor da fidelidade de Deus; o NT universaliza a herança (Rm 4:13; Hb 11:16).'),
    ],
    significadoTeologico:
      'A aliança abraâmica é o tronco de Israel e da igreja. Justificação pela fé (Gn 15:6) já está em germe na partida. A falha no Egito mostra que a promessa depende de Deus, não da perfeição de Abrão.',
    aplicacaoPratica:
      'A fé obedece sem mapa completo. A vocação cristã é ser bênção, não clube. O medo ainda tenta os eleitos; a fidelidade de Deus é maior que nossas mentiras — o que não as justifica.',
    perguntasEstudo: [
      'Quais elementos da promessa em 12:1–3 reaparecem no resto de Gênesis e no NT?',
      'Por que Gálatas 3 chama isso de evangelho anunciado a Abraão?',
      'O que o episódio do Egito ensina sobre fé e medo?',
      'Como o cristão é «filho de Abraão» (Gl 3:7) sem judaizar?',
    ],
    fontes: ['Gênesis 12', 'Gálatas 3:8, 16', 'Hebreus 11:8', 'Josué 24:2'],
  }),

  'gn:15': ficha('gn', 15, 'A aliança cortada e a justiça pela fé', {
    contextoHistorico:
      'Após a vitória sobre os reis (Gn 14), Abrão teme represália e a falta de herdeiro. O rito de animais partidos é forma suzerana do segundo milênio: o que passa entre as peças invoca sobre si a maldição da aliança se falhar.',
    resumo:
      'Deus promete descendência como as estrelas. Abrão crê, e isso lhe é imputado como justiça (15:6) — texto-chave de Romanos 4 e Gálatas 3. O Senhor sozinho, em teofania de forno e tocha, passa entre os animais: a aliança é unilateral em sua garantia. A profecia dos 400 anos no Egito mostra que a fé espera no tempo de Deus. A terra é demarcada da promessa.',
    estrutura: [
      '15:1–6 — temor, promessa de filho, fé imputada',
      '15:7–21 — rito da aliança, profecia do êxodo, limites da terra',
    ],
    temas: ['Justificação pela fé', 'Aliança incondicional', 'Promessa', 'Paciência', 'Teofania'],
    VersiculosChave: [
      chave('Gênesis 15:6', 'Creu Abrão no Senhor, e isso lhe foi imputado como justiça.', 'Paulo: Abraão justificado antes da circuncisão e da Lei (Rm 4). A fé recebe; não compra.'),
    ],
    significadoTeologico:
      'A imputação (chashav) é forense: Deus conta justiça ao que crê na promessa. Calvino e Lutero viram aqui o evangelho. O Deus que passa sozinho entre as peças assume a maldição — cumprida na cruz (Gl 3:13).',
    aplicacaoPratica:
      'A segurança da salvação não está no nosso voto perfeito, mas no Deus que jura por Si mesmo. Creia contra as evidências do relógio. Não acrescente a Lei como fundamento da justificação.',
    perguntasEstudo: [
      'O que Abrão crê, exatamente, em 15:6?',
      'Por que só Deus passa entre os animais?',
      'Como Rm 4 usa este capítulo contra a justiça pelas obras?',
      'Que diferença há entre fé salvadora e otimismo psicológico?',
    ],
    fontes: ['Gênesis 15', 'Romanos 4', 'Gálatas 3:6–14'],
  }),

  'gn:22': ficha('gn', 22, 'A prova de Abraão e o Cordeiro provido', {
    contextoHistorico:
      'A Aquedá (ligadura de Isaque) ocorre após anos de espera pelo filho da promessa. Cultos cananeus conheciam sacrifício infantil; o Deus de Abraão interrompe o gesto e provê o substituto. Moriah será depois associado a Jerusalém (2 Cr 3:1).',
    resumo:
      'Deus pede Isaque, o único, o amado. Abraão parte de madrugada. Ao terceiro dia, vê o lugar. «Deus proverá o cordeiro» (22:8). O anjo detém a faca; um carneiro substitui o filho. O juramento divino confirma a bênção às nações. Hebreus 11:17–19 interpreta: Abraão considerou que Deus podia ressuscitar o filho. João 3:16 ecoa o vocabulário do filho único amado. A tipologia não apaga a história: Isaque vive; o Carneiro definitivo morre.',
    estrutura: [
      '22:1–8 — a ordem, a viagem, a fé que fala',
      '22:9–14 — o altar, a intervenção, YHWH-Jiré',
      '22:15–19 — o juramento e o retorno',
    ],
    temas: ['Prova da fé', 'Substituição', 'Provisão de Deus', 'Filho amado', 'Tipologia da cruz'],
    VersiculosChave: [
      chave('Gênesis 22:8', 'Deus proverá para si o cordeiro para o holocausto, filho meu.', 'Profecia inconsciente: o Pai provê o Cordeiro (Jo 1:29).'),
      chave('Gênesis 22:14', 'O Senhor proverá.', 'Memorial da graça que detém o juízo e substitui o filho.'),
    ],
    significadoTeologico:
      'A fé é obediência que não entende o «como», mas confia no caráter de Deus. A substituição é o coração do evangelho. Henry: o carneiro preso no espinheiro prefigura a coroa de espinhos — leitura homilética legítima se não se impõe como único sentido literal.',
    aplicacaoPratica:
      'Não retenha do Senhor o que Ele deu. A prova não visa destruir a fé, mas revelá-la. Adore o Deus que não poupou o próprio Filho (Rm 8:32).',
    perguntasEstudo: [
      'Como a ordem de Gn 22 se relaciona com a promessa de Gn 15 e 21?',
      'O que Hebreus 11 acrescenta à leitura do episódio?',
      'Onde a substituição aparece neste capítulo?',
      'Como evitar tanto a alegoria selvagem quanto o recusar qualquer tipologia?',
    ],
    fontes: ['Gênesis 22', 'Hebreus 11:17–19', 'Romanos 8:32', 'João 1:29'],
  }),

  'ex:12': ficha('ex', 12, 'A Páscoa: o cordeiro, o sangue e a saída', {
    contextoHistorico:
      'A décima praga cai sobre o Egito. Israel, escravo, recebe um rito que o constituirá como povo redimido: calendário novo, cordeiro sem defeito, sangue nos umbrais, refeição de pressa. A Páscoa torna-se festa perpétua e, no NT, tipo de Cristo (1 Co 5:7; 1 Pe 1:19).',
    resumo:
      'Cada casa toma um cordeiro; o sangue é sinal para o destruidor passar (pesach). O pão ázimo fala de pressa e de ruptura com o fermento do Egito. Primogênitos egípcios morrem; Israel sai com despojos. A redenção é por substituição e por poder. Jesus institui a ceia na Páscoa: o novo êxodo é Sua morte.',
    estrutura: [
      '12:1–28 — instrução da Páscoa e dos pães ázimos',
      '12:29–42 — a morte dos primogênitos e a saída',
      '12:43–51 — estatuto: quem pode comer a Páscoa',
    ],
    temas: ['Redenção', 'Substituição', 'Sangue', 'Memória litúrgica', 'Novo êxodo em Cristo'],
    VersiculosChave: [
      chave('Êxodo 12:13', 'O sangue vos será por sinal… quando eu vir o sangue, passarei.', 'A salvação não está no sentimento da casa, mas no sangue aplicado segundo a Palavra.'),
      chave('Êxodo 12:27', 'É o sacrifício da Páscoa do Senhor, que passou as casas dos filhos de Israel no Egito.', 'O rito narra um ato de Deus, não um mito cíclico.'),
    ],
    significadoTeologico:
      'Sem derramamento de sangue não há remissão (Hb 9:22). O cordeiro deve ser comido: união com a vítima. A igreja anuncia a morte do Senhor até que Ele venha (1 Co 11:26).',
    aplicacaoPratica:
      'Viva como quem foi comprado. Ensine aos filhos o sentido da redenção (12:26–27). A ceia cristã não é nostalgia: é participação no Cordeiro.',
    perguntasEstudo: [
      'Por que o sangue precisa estar visível nos umbrais?',
      'O que o pão ázimo simboliza no êxodo e em 1 Coríntios 5?',
      'Como João 19 e 1 Coríntios 5:7 leem a Páscoa?',
      'Quem era excluído da Páscoa e o que isso ensina sobre a igreja?',
    ],
    fontes: ['Êxodo 12', '1 Coríntios 5:7', 'Hebreus 9:22', '1 Pedro 1:18–19'],
  }),

  'ex:20': ficha('ex', 20, 'Os Dez Mandamentos: a aliança no Sinai', {
    contextoHistorico:
      'Três meses após o êxodo, Israel acampa no Sinai. O Decálogo é o núcleo da aliança: Deus fala «Eu sou o Senhor teu Deus, que te tirei da terra do Egito» — a graça precede a lei. O povo pede mediador; Moisés sobe. As tábuas serão quebradas e reescritas: a lei revela o pecado e precisa de mediador.',
    resumo:
      'Os quatro primeiros mandamentos ordenam o amor a Deus (culto exclusivo, nome, sábado); os seis, o amor ao próximo (família, vida, casamento, propriedade, verdade, desejo). Jesus resume em Dt 6:5 e Lv 19:18 (Mt 22:37–40). O NT não abole a moral da lei; abole a lei como via de justificação (Rm 3:20; 8:4). O sábado cristão cumpre-se no descanso de Cristo, com ritmo de culto e misericórdia.',
    estrutura: [
      '20:1–2 — prólogo da graça',
      '20:3–11 — deveres para com Deus',
      '20:12–17 — deveres para com o próximo',
      '20:18–21 — temor, mediador',
    ],
    temas: ['Aliança', 'Lei moral', 'Graça anterior à lei', 'Mediação', 'Santidade'],
    VersiculosChave: [
      chave('Êxodo 20:2–3', 'Eu sou o Senhor teu Deus… Não terás outros deuses diante de mim.', 'Monoteísmo exclusivo fundado na redenção, não em especulação.'),
      chave('Êxodo 20:17', 'Não cobiçarás.', 'O último mandamento interioriza a lei; Paulo o cita em Rm 7:7.'),
    ],
    significadoTeologico:
      'Calvino distinguiu três usos da lei: freio civil, convicção de pecado, e norma de gratidão para o regenerado. O Decálogo permanece como espelho e guia; Cristo é o cumprimento (Mt 5:17).',
    aplicacaoPratica:
      'Examine o coração, não só os atos. O culto falso e a cobiça são idolatria. A lei envia ao evangelho; o evangelho envia de volta à lei como caminho de amor.',
    perguntasEstudo: [
      'Por que o prólogo (20:2) é indispensável para entender os mandamentos?',
      'Como Jesus aprofunda o Decálogo no Sermão do Monte?',
      'Qual a diferença entre lei como pacto de obras e lei como regra de vida?',
      'O que o nono e o décimo mandamentos exigem na era digital?',
    ],
    fontes: ['Êxodo 20', 'Mateus 5:17–48', 'Romanos 7–8', 'Calvino, Institutas II.vii'],
  }),

  'lv:16': ficha('lv', 16, 'O Dia da Expiação (Yom Kipur)', {
    contextoHistorico:
      'Após a morte de Nadabe e Abiú (Lv 10), o acesso ao Santo dos Santos é regulado. Uma vez por ano o sumo sacerdote entra com sangue. Dois bodes: um para o Senhor (sacrifício), outro para Azazel (remoção do pecado para o deserto). Hebreus 9–10 declara o rito incompleto até Cristo.',
    resumo:
      'Arão oferece por si e pelo povo. O sangue asperge o propiciatório (kapporet). O bode emissário carrega iniquidades confessadas. Jejum e cessar de obras marcam o dia. O capítulo ensina que o pecado contamina o santuário e o povo; só sangue e substituição reabrem a comunhão. Cristo entra no verdadeiro santo lugar com Seu próprio sangue, de uma vez por todas.',
    estrutura: [
      '16:1–10 — vestes, novilho, dois bodes',
      '16:11–19 — sangue no santo dos santos e no altar',
      '16:20–22 — o bode emissário',
      '16:23–34 — estatuto perpétuo',
    ],
    temas: ['Expiação', 'Propiciatório', 'Substituição', 'Santidade', 'Acesso a Deus'],
    VersiculosChave: [
      chave('Levítico 16:30', 'Porque naquele dia se fará expiação por vós, para vos purificar.', 'O objetivo é purificação para comunhão, não magia.'),
      chave('Levítico 17:11', 'A vida da carne está no sangue… o sangue é o que faz expiação.', 'Princípio citado em Hebreus; a vida entregue no lugar da vida devida.'),
    ],
    significadoTeologico:
      'O duplo movimento — sangue para Deus, pecado levado para longe — prefigura justificação e remoção da culpa (Sl 103:12; Jo 1:29). O véu rasgado (Mt 27:51) encerra o regime de Lv 16.',
    aplicacaoPratica:
      'Não entre na presença de Deus de forma leviana. Confie no sangue de Cristo, não em rituais. Viva purificado para o serviço, não para o orgulho.',
    perguntasEstudo: [
      'Por que o sumo sacerdote precisa oferecer primeiro por si mesmo — e como Cristo difere (Hb 7:27)?',
      'O que cada bode representa?',
      'Como Hebreus 9–10 interpreta este capítulo?',
      'O que significa, hoje, «chegar-se com confiança ao trono da graça» (Hb 4:16)?',
    ],
    fontes: ['Levítico 16', 'Hebreus 9–10', 'Mateus 27:51'],
  }),

  'dt:6': ficha('dt', 6, 'O Shema: ouvir, amar, ensinar', {
    contextoHistorico:
      'Moisés, nas planícies de Moabe, renova a aliança com a geração que entrará na terra. O Shema (6:4–9) torna-se a confissão diária de Israel e o primeiro mandamento segundo Jesus (Mc 12:29–30).',
    resumo:
      '«Ouve, Israel: o Senhor nosso Deus é o único Senhor.» O monoteísmo é relacional: amar a Deus com todo o coração, alma e força. A lei deve estar no coração, nas conversas domésticas, nos umbrais — pedagogia total. O perigo da terra é o esquecimento na prosperidade (6:10–12). Temer, servir e não tentar o Senhor (6:16, citado por Jesus no deserto).',
    estrutura: [
      '6:1–3 — o propósito: temor e vida na terra',
      '6:4–9 — Shema e pedagogia da aliança',
      '6:10–19 — alerta contra o esquecimento e a idolatria',
      '6:20–25 — a pergunta do filho e a narrativa da redenção',
    ],
    temas: ['Monoteísmo', 'Amor a Deus', 'Educação dos filhos', 'Memória', 'Obediência'],
    VersiculosChave: [
      chave('Deuteronômio 6:4–5', 'Ouve, Israel… Amarás o Senhor teu Deus de todo o teu coração.', 'Jesus une este verso a Lv 19:18 como resumo da Lei e dos Profetas.'),
    ],
    significadoTeologico:
      'O amor não substitui a obediência: é o seu motor. A justificação é pela fé; o Shema descreve a vida do povo redimido. A unicidade de YHWH fundamenta a recusa de sincretismo.',
    aplicacaoPratica:
      'Catequize a casa. Fale da Palavra no cotidiano, não só no culto. Na prosperidade, lembre o êxodo. Quando o filho perguntar «por quê?», conte a história da graça (6:20–25).',
    perguntasEstudo: [
      'O que «o Senhor é um» afirma contra o politeísmo e o dualismo?',
      'Como Jesus usa Dt 6 na tentação e no grande mandamento?',
      'Por que a prosperidade é tesouro espiritualmente perigoso neste capítulo?',
      'Que práticas familiares concretas o texto ordena?',
    ],
    fontes: ['Deuteronômio 6', 'Marcos 12:29–31', 'Mateus 4:7'],
  }),

  'sl:1': ficha('sl', 1, 'Os dois caminhos: o justo e o ímpio', {
    contextoHistorico:
      'O Salmo 1 abre o saltério como pórtico sapiencial: bem-aventurança, Torá, juízo. Não tem título davídico; funciona como introdução a todo o livro. A imagem da árvore junto a canais ecoa Jr 17:7–8.',
    resumo:
      'Bem-aventurado o que não anda, detém-se nem se assenta no conselho, caminho e assembleia dos ímpios — progressão da complacência. Seu prazer é a lei do Senhor, meditada de dia e de noite. É árvore frutífera; o ímpio é palha que o vento leva. O Senhor conhece o caminho dos justos; o dos ímpios perece. O salmo não ensina salvação por meritocracia: o justo é o que se agrada da Palavra, no povo da aliança — cumprido plenamente no Justo, Cristo, e imputado aos que nEle creem.',
    estrutura: [
      '1:1 — três negações (separação)',
      '1:2 — o prazer na Torá (meditação)',
      '1:3 — a árvore (fruto e estabilidade)',
      '1:4–6 — o ímpio, o juízo, os dois caminhos',
    ],
    temas: ['Bem-aventurança', 'Meditação na Lei', 'Juízo', 'Sabedoria', 'Cristologia do Justo'],
    VersiculosChave: [
      chave('Salmos 1:2', 'Antes, tem o seu prazer na lei do Senhor, e na sua lei medita de dia e de noite.', 'A piedade bíblica é afetiva e intelectual: prazer e ruminação da Palavra.'),
    ],
    significadoTeologico:
      'O saltério inteiro se lê a partir daqui: lamento, louvor e realeza do Messias (Sl 2) no caminho do justo. Agostinho e Calvino viram Cristo como o Justo por excelência.',
    aplicacaoPratica:
      'Escolha companhias e dietas mentais. Medite a Escritura, não a role. Frutifique no tempo de Deus. Lembre o juízo final sem presunção: a justiça é em Cristo.',
    perguntasEstudo: [
      'Qual a progressão dos verbos em 1:1 e o que ela ensina sobre o pecado?',
      'O que é meditar (hagah) na prática?',
      'Como Sl 1 e Sl 2 se leem juntos (o Justo e o Rei)?',
      'Como evitar transformar este salmo em moralismo sem evangelho?',
    ],
    fontes: ['Salmos 1', 'Jeremias 17:7–8', 'Salmos 2', 'Mateus 5:3–12'],
  }),

  'sl:22': ficha('sl', 22, 'O servo sofredor que se torna louvor das nações', {
    contextoHistorico:
      'Salmo de Davi, lamento individual que a igreja sempre leu messianicamente: Jesus o cita na cruz (Mt 27:46). Detalhes (vestes, zombaria, sede, mãos e pés) correspondem à paixão nos evangelhos.',
    resumo:
      '«Deus meu, Deus meu, por que me desamparaste?» — não ateísmo, mas oração no abandono. O sofredor lembra a fidelidade aos pais, descreve inimigos como cães e touros, e de súbito passa ao louvor: a posteridade servirá ao Senhor; todas as famílias da terra se prostrarão. A cruz não é o fim: a ressurreição inaugura o culto universal.',
    estrutura: [
      '22:1–21 — lamento, abandono, inimigos',
      '22:22–31 — voto de louvor, convite às nações, gerações futuras',
    ],
    temas: ['Abandono', 'Paixão de Cristo', 'Lamento que vira louvor', 'Missão às nações'],
    VersiculosChave: [
      chave('Salmos 22:1', 'Deus meu, Deus meu, por que me desamparaste?', 'Jesus assume o salmo: o Justo sofre a ausência judicial que o pecador merecia.'),
      chave('Salmos 22:18', 'Repartem entre si as minhas vestes, e sobre a minha túnica lançam sortes.', 'Cumprido em João 19:24.'),
    ],
    significadoTeologico:
      'A substituição inclui o clamor do abandono. O «tu me respondes» (22:21) antecipa a justificação do Servo (Is 53:11). O fim do salmo é escatológico e missionário.',
    aplicacaoPratica:
      'Ore os lamentos; não finja. Na dor, apegue-se ao Deus dos pais. Anuncie o louvor depois do livramento — inclusive às nações.',
    perguntasEstudo: [
      'Como os evangelhos citam e encenam este salmo?',
      'O abandono de 22:1 contradiz «eu e o Pai somos um»? Como a igreja clássica respondeu?',
      'Qual o papel das nações em 22:27–28?',
      'Como o cristão ora este salmo sem usurpar o lugar único de Cristo?',
    ],
    fontes: ['Salmos 22', 'Mateus 27', 'João 19', 'Isaías 53'],
  }),

  'sl:23': ficha('sl', 23, 'O Senhor é o meu pastor', {
    contextoHistorico:
      'Davi, ex-pastor, canta a providência da aliança. No antigo Oriente o rei era «pastor»; aqui o próprio YHWH pastoreia o indivíduo («meu»). Jesus reivindica o título em João 10.',
    resumo:
      'Nada falta à ovelha cujo pastor é o Senhor: pastos, águas, restauração da alma, veredas de justiça. O vale da sombra da morte não anula a presença («tu estás comigo»). A mesa à vista dos inimigos e o cálice transbordante falam de hospitalidade real. Bondade e misericórdia perseguem; a casa do Senhor é morada para sempre. Henry: não «um pastor», mas «o meu».',
    estrutura: [
      '23:1–3 — o pastor no campo',
      '23:4 — o vale',
      '23:5–6 — o anfitrião no templo/palácio',
    ],
    temas: ['Providência', 'Presença', 'Consolo', 'Hospitalidade divina', 'Esperança eterna'],
    VersiculosChave: [
      chave('Salmos 23:1', 'O Senhor é o meu pastor; nada me faltará.', 'Suficiência da aliança, não promessa de luxo.'),
      chave('Salmos 23:4', 'Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo.', 'A presença, não a ausência de vales, é o consolo.'),
    ],
    significadoTeologico:
      'Cristo é o Bom Pastor que dá a vida pelas ovelhas (Jo 10:11) e o Cordeiro que as apascenta (Ap 7:17). O salmo une cuidado cotidiano e esperança escatológica.',
    aplicacaoPratica:
      'Personalize a fé sem privatizá-la: o pastor tem rebanho. Não tema o vale; tema ficar sem o Pastor. Pratique hospitalidade à semelhança da mesa de 23:5.',
    perguntasEstudo: [
      'O que «nada me faltará» não promete?',
      'Como a mudança de «ele» para «tu» no v. 4 altera a oração?',
      'Que ligação há com João 10 e Apocalipse 7?',
      'Como este salmo consola o luto sem negar a morte?',
    ],
    fontes: ['Salmos 23', 'João 10', 'Apocalipse 7:17', 'Matthew Henry'],
  }),

  'sl:51': ficha('sl', 51, 'O arrependimento de Davi após Bate-Seba', {
    contextoHistorico:
      'Título: quando o profeta Natã foi ter com Davi, depois que pecara com Bate-Seba (2 Sm 11–12). É o modelo clássico de confissão: não desculpa, não cosmética, pedido de espírito novo.',
    resumo:
      'Davi apela à misericórdia (chesed) e à abundância de compaixão. Confessa contra si mesmo: o pecado é contra Deus (51:4), ainda que tenha destruído Urias e Bate-Seba. Pede purificação com hissopo, coração puro, espírito estável, a alegria da salvação. Recusa sacrifício sem espírito quebrantado; então os sacrifícios justos voltarão. O salmo ensina teologia do pecado original («em pecado me concebeu minha mãe») e da graça regeneradora.',
    estrutura: [
      '51:1–6 — apelo e confissão',
      '51:7–12 — purificação e espírito novo',
      '51:13–17 — voto de ensino e culto interior',
      '51:18–19 — Sião e sacrifícios restaurados',
    ],
    temas: ['Arrependimento', 'Pecado contra Deus', 'Coração puro', 'Espírito Santo', 'Culto verdadeiro'],
    VersiculosChave: [
      chave('Salmos 51:10', 'Cria em mim, ó Deus, um coração puro, e renova em mim um espírito estável.', 'Bará, o verbo da criação: só Deus cria coração novo (Ez 36:26).'),
      chave('Salmos 51:17', 'Os sacrifícios para Deus são o espírito quebrantado.', 'O culto sem contrição é rejeitado; a contrição não dispensa a expiação — aponta para ela.'),
    ],
    significadoTeologico:
      'O pecado é ofensa a Deus antes de ser dano social. A regeneração é criação nova. Calvino: Davi não nega o dano ao próximo; concentra a gravidade teológica. Cristo é o hissopo definitivo.',
    aplicacaoPratica:
      'Nomeie o pecado. Não negocie com a culpa por ativismo religioso. Peça o Espírito. Ensine transgressores depois de restaurado (51:13), não antes.',
    perguntasEstudo: [
      'Por que 51:4 diz «contra ti somente», se Urias morreu?',
      'Como este salmo relaciona-se com 2 Samuel 12 e com 1 João 1:9?',
      'O que é um espírito quebrantado — e o que não é (autodepreciação tóxica)?',
      'Como 51:18–19 liga arrependimento pessoal e comunidade?',
    ],
    fontes: ['Salmos 51', '2 Samuel 11–12', 'Ezequiel 36:25–27', '1 João 1:9'],
  }),

  'sl:110': ficha('sl', 110, 'O Senhor diz ao meu Senhor: sacerdote-rei', {
    contextoHistorico:
      'Salmo real davídico, o mais citado no NT. Jesus o usa para mostrar que o Messias é mais que filho de Davi (Mt 22:41–45). Melquisedeque (Gn 14) fundamenta um sacerdócio distinto de Levi.',
    resumo:
      'YHWH fala ao Senhor de Davi: assenta-te à minha direita até que ponha os inimigos por escabelo. Cetro de Sião, povo voluntário, sacerdócio perpétuo segundo Melquisedeque, juízo sobre reis. Hebreus 5–7 constrói a cristologia sacerdotal neste texto. A sessão à direita é a entronização do ressurreto (At 2:34–36).',
    estrutura: [
      '110:1 — oráculo de entronização',
      '110:2–3 — domínio e povo voluntário',
      '110:4 — juramento sacerdotal',
      '110:5–7 — dia da ira e vitória',
    ],
    temas: ['Messias', 'Entronização', 'Sacerdócio de Melquisedeque', 'Juízo', 'Ressurreição'],
    VersiculosChave: [
      chave('Salmos 110:1', 'Disse o Senhor ao meu Senhor: Assenta-te à minha direita.', 'Dois «Senhores»: o Pai e o Messias. Base da pregação apostólica.'),
      chave('Salmos 110:4', 'Tu és sacerdote eternamente, segundo a ordem de Melquisedeque.', 'Sacerdócio real que a Lei levítico não esgota.'),
    ],
    significadoTeologico:
      'Cristo reina agora (já) e vencerá todos os inimigos (ainda não). O cristão é povo voluntário no dia do poder. Não há outro mediador.',
    aplicacaoPratica:
      'Adore o Rei-Sacerdote. Não separe trono e cruz. Viva como voluntário, não como mercenário. Espere o juízo sem vingança pessoal.',
    perguntasEstudo: [
      'Como Jesus usa Sl 110:1 contra os fariseus?',
      'O que Hebreus acrescenta sobre Melquisedeque?',
      'Qual a relação entre 110:1 e a missão da igreja?',
      'Como o «já e ainda não» do reinado consola e corrige o triunfalismo?',
    ],
    fontes: ['Salmos 110', 'Mateus 22:41–45', 'Atos 2:34–36', 'Hebreus 5–7'],
  }),

  'is:6': ficha('is', 6, 'A visão de Isaías: santo, santo, santo', {
    contextoHistorico:
      'Morte do rei Uzias (~740 a.C.). Crise política: o trono humano vacila; Isaías vê o trono verdadeiro. A vocação do profeta ocorre no templo, com serafins e fumaça — teofania que João 12:41 identifica com a glória de Cristo.',
    resumo:
      'O Senhor está exaltado; os serafins clamam «santo» três vezes (plenitude da santidade; a igreja leu a Trindade). Isaías se reconhece homem de lábios impuros no meio de um povo impuro. A brasa do altar toca a boca: expiação antes da missão. O envio é para um ministério de endurecimento judicial (6:9–10), citado por Jesus (Mt 13) e Paulo (At 28). Um remanescente santo permanecerá como toco abatido.',
    estrutura: [
      '6:1–4 — visão da glória',
      '6:5–7 — confissão e purificação',
      '6:8–13 — envio, endurecimento, remanescente',
    ],
    temas: ['Santidade de Deus', 'Vocação', 'Expiação', 'Juízo de endurecimento', 'Remanescente'],
    VersiculosChave: [
      chave('Isaías 6:3', 'Santo, santo, santo é o Senhor dos Exércitos; toda a terra está cheia da sua glória.', 'A santidade de Deus não é um atributo entre outros: é o resplendor de todos.'),
      chave('Isaías 6:8', 'A quem enviarei?… Eis-me aqui, envia-me a mim.', 'A disponibilidade nasce da graça que tocou os lábios, não do voluntarismo ingênuo.'),
    ],
    significadoTeologico:
      'Sem visão de Deus não há verdadeira visão de si. A missão pode ser de juízo, não só de sucesso numérico. João une esta glória ao Filho.',
    aplicacaoPratica:
      'Cultue o Santo. Confesse antes de falar por Deus. Aceite que a Palavra também endurece. Sirva o remanescente fiel sem desprezar o apelo às massas.',
    perguntasEstudo: [
      'Por que a vocação vem depois da morte de Uzias?',
      'Como 6:9–10 pode ser justo da parte de Deus?',
      'Que papel a brasa do altar tem na teologia da missão?',
      'Como João 12 lê Isaías 6?',
    ],
    fontes: ['Isaías 6', 'João 12:37–41', 'Mateus 13:14–15', 'Atos 28:25–27'],
  }),

  'is:53': ficha('is', 53, 'O Servo sofredor: ferido por nossas transgressões', {
    contextoHistorico:
      'Quarto cântico do Servo (Is 52:13–53:12), no bloco da restauração do exílio. Israel sofreu, mas o texto descreve um indivíduo inocente que carrega o pecado de muitos. A igreja apostólica aplicou-o a Jesus (At 8:32–35; 1 Pe 2:22–25).',
    resumo:
      'O Servo cresce como renovo, sem formosura; é desprezado, homem de dores. Levamos a interpretá-lo como ferido por Deus — e de fato o Senhor fez cair sobre Ele a iniquidade de nós todos. Silêncio como cordeiro; sepultura com o rico; prolongará os dias após a morte (ressurreição implícita). Justificará a muitos: o Justo servo. Substituição penal, voluntária e eficaz.',
    estrutura: [
      '52:13–15 — exaltação após a humilhação',
      '53:1–3 — rejeição',
      '53:4–6 — substituição',
      '53:7–9 — silêncio, morte, sepultura',
      '53:10–12 — o propósito do Senhor, justificação de muitos',
    ],
    temas: ['Substituição penal', 'Servo do Senhor', 'Justificação', 'Ressurreição', 'Intercessão'],
    VersiculosChave: [
      chave('Isaías 53:5', 'Ele foi ferido pelas nossas transgressões… o castigo que nos traz a paz estava sobre ele.', 'O «nós» e o «ele» são o coração da expiação.'),
      chave('Isaías 53:11', 'O meu Servo, o Justo, justificará a muitos, porque as iniquidades deles levará sobre si.', 'Justificação pela imputação da obra do Servo.'),
    ],
    significadoTeologico:
      'Lutero e Calvino viram aqui o evangelho do AT. Stott (resumo fiel, não citação forjada): a cruz é amor e juízo. Não há evangelho sem este capítulo.',
    aplicacaoPratica:
      'Pare de justificar-se. Contemplar o Servo produz arrependimento e missão (At 8). Sofra o mal sem vingança, à imitação do Cordeiro — sem fingir que sua dor expia o mundo.',
    perguntasEstudo: [
      'Quem é o «nós» e quem é o Servo no poema?',
      'Como Atos 8 e 1 Pedro 2 usam Isaías 53?',
      'O que 53:10–12 ensina sobre a ressurreição e a vontade do Pai?',
      'Como pregar este texto sem antissemitismo (o Servo não é «os judeus» como vilões)?',
    ],
    fontes: ['Isaías 52:13–53:12', 'Atos 8:32–35', '1 Pedro 2:21–25', 'Romanos 4:25'],
  }),

  'jr:31': ficha('jr', 31, 'A nova aliança escrita no coração', {
    contextoHistorico:
      'Jeremias profetiza no colapso de Judá (séc. VII–VI a.C.). A aliança sinaítica foi quebrada. O oráculo da nova aliança (31:31–34) é o mais longo trecho de AT citado no NT (Hb 8:8–12).',
    resumo:
      'Deus promete restaurar Israel com amor eterno (31:3). Raquel chora os filhos (31:15; citado em Mt 2:18). A nova aliança não é como a do êxodo: a lei no interior, conhecimento de Deus sem mediação meramente externa, perdão definitivo da iniquidade. Em Cristo o cálice é «o novo pacto no meu sangue» (Lc 22:20). Hebreus insiste: o velho é obsoleto como via de acesso; o cumprimento é eclesial e escatológico, sem apagar a fidelidade a Israel (Rm 11).',
    estrutura: [
      '31:1–14 — restauração e alegria',
      '31:15–22 — Raquel, Efraim, volta',
      '31:23–30 — responsabilidade pessoal',
      '31:31–40 — nova aliança e cidade santa',
    ],
    temas: ['Nova aliança', 'Perdão', 'Lei no coração', 'Restauração', 'Esperança no juízo'],
    VersiculosChave: [
      chave('Jeremias 31:31–34', 'Farei uma nova aliança… perdoarei a sua maldade, e não me lembrarei mais dos seus pecados.', 'O núcleo: interiorização da lei e remissão plena.'),
    ],
    significadoTeologico:
      'A nova aliança é trinitária na execução: o Filho derrama o sangue; o Espírito escreve a lei (2 Co 3; Ez 36). Não é antinomismo: é obediência nascida de dentro.',
    aplicacaoPratica:
      'Não viva o cristianismo como contrato externo. Peça o Espírito. Anuncie perdão real. Chore com Raquel — o evangelho não nega o luto — e espere o retorno.',
    perguntasEstudo: [
      'Em que a nova aliança difere da sinaítica segundo Jeremias?',
      'Como Hebreus 8–10 interpreta 31:31–34?',
      'O que significa «não me lembrarei mais» — amnésia divina ou recusa judicial de acusar?',
      'Como Rm 11 e Jr 31 se falam sobre Israel?',
    ],
    fontes: ['Jeremias 31', 'Hebreus 8:8–12', 'Lucas 22:20', '2 Coríntios 3'],
  }),

  'dn:7': ficha('dn', 7, 'O Filho do Homem e os impérios', {
    contextoHistorico:
      'Visão no primeiro ano de Belsazar. Quatro bestas = impérios (paralelo a Dn 2). O «Ancião de Dias» julga; um como Filho do Homem vem com as nuvens e recebe domínio eterno. Jesus toma o título «Filho do Homem» deste capítulo (Mc 14:62).',
    resumo:
      'Do mar (caos das nações) sobem bestas. A quarta é terrível; o chifre pequeno blasfema e persegue os santos. Tronos se põem; os livros se abrem. O Filho do Homem recebe o reino; os santos o possuem. A esperança não é a humanização do império, mas o juízo de Deus e o reinado do Homem celestial.',
    estrutura: [
      '7:1–8 — as quatro bestas',
      '7:9–14 — o juízo e o Filho do Homem',
      '7:15–28 — interpretação: santos, chifre, reino',
    ],
    temas: ['Reino de Deus', 'Filho do Homem', 'Impérios', 'Perseguição', 'Juízo final'],
    VersiculosChave: [
      chave('Daniel 7:13–14', 'Vinha com as nuvens do céu um como o Filho do Homem… o seu domínio é eterno.', 'Cristologia e escatologia unidas: o Homem exaltado reina sobre todos os povos.'),
    ],
    significadoTeologico:
      'Os impérios são bestiais; o reino de Deus é humano no Filho do Homem. A igreja sofre sob o chifre, mas o veredito celestial já foi dado.',
    aplicacaoPratica:
      'Não divinize o Estado. Persevera sob perseguição. Adore o Filho do Homem. Leia as notícias com Dn 7 no bolso: as bestas passam.',
    perguntasEstudo: [
      'Como Dn 2 e Dn 7 se iluminam mutuamente?',
      'Por que Jesus une Sl 110 e Dn 7 em Mc 14:62?',
      'Quem são os «santos do Altíssimo»?',
      'Como evitar tanto a especulação de calendário quanto o esvaziar a visão?',
    ],
    fontes: ['Daniel 7', 'Daniel 2', 'Marcos 14:61–62', 'Apocalipse 13'],
  }),

  'mt:5': ficha('mt', 5, 'O Sermão do Monte: as bem-aventuranças e a lei cumprida', {
    contextoHistorico:
      'Primeiro discurso de Mateus (caps. 5–7). Jesus, como novo Moisés, sobe o monte e ensina os discípulos à vista das multidões. O sermão descreve a justiça do reino — maior que a dos escribas — não um programa político zelote nem um legalismo farisaico.',
    resumo:
      'As bem-aventuranças declaram felizes os pobres de espírito, os que choram, os mansos, os famintos de justiça, os misericordiosos, os puros, os pacificadores, os perseguidos. Sal e luz: a igreja é visível. Jesus não veio revogar a Lei, mas cumpri-la (5:17). As antíteses («ouvistes… eu, porém, vos digo») interiorizam mandamentos: ira, lust, juramento, retaliação, amor ao inimigo. A justiça do reino é impossível sem o novo coração da nova aliança; o sermão envia ao evangelho e depois governa os justificados.',
    estrutura: [
      '5:1–12 — bem-aventuranças',
      '5:13–16 — sal e luz',
      '5:17–20 — cumprimento da Lei',
      '5:21–48 — antíteses: do ato ao coração',
    ],
    temas: ['Reino de Deus', 'Bem-aventuranças', 'Cumprimento da Lei', 'Justiça maior', 'Amor ao inimigo'],
    VersiculosChave: [
      chave('Mateus 5:3', 'Bem-aventurados os pobres de espírito, porque deles é o reino dos céus.', 'A porta do reino é a pobreza confessada, não o mérito.'),
      chave('Mateus 5:17', 'Não vim revogar, mas cumprir.', 'Cristo preenche e realiza a Lei; o discípulo não é antinomista.'),
      chave('Mateus 5:44', 'Amai os vossos inimigos.', 'A semelhança do Pai (5:45–48) é o horizonte, não o prestígio do grupo.'),
    ],
    significadoTeologico:
      'Agostinho e Calvino leram o sermão como ética do regenerado, não como escada para merecer o céu. Lutero enfatizou o uso acusador da lei que leva a Cristo. Ambos os usos são bíblicos se não se excluem.',
    aplicacaoPratica:
      'Examine ira e desejo, não só homicídio e adultério. Seja sal na corrupção e luz na casa. Ore pelos inimigos. Não use 5:48 para desespero: a perfeição do Pai é meta da graça, não pedágio.',
    perguntasEstudo: [
      'Por que as bem-aventuranças começam pela pobreza de espírito?',
      'O que «cumprir a Lei» significa em 5:17–18?',
      'Como as antíteses se relacionam com Êxodo 20?',
      'De que modo 5:43–48 revela o caráter do Pai?',
    ],
    fontes: ['Mateus 5', 'Êxodo 20', 'Jeremias 31:33', 'Romanos 8:4'],
  }),

  'mt:6': ficha('mt', 6, 'O Pai que vê o secreto: oração, jejum e tesouro', {
    contextoHistorico:
      'Continuação do Sermão. Jesus confronta a piedade teatral do primeiro século (e de todos os séculos): esmola, oração e jejum como palco. O Pai vê o secreto. A oração do Pai Nosso é o catecismo da esperança do reino.',
    resumo:
      'A justiça diante dos homens perde o galardão. O Pai Nosso: o nome, o reino, a vontade; o pão, o perdão, a tentação. Perdoar é inseparável de ser perdoado. O jejum sem cara triste. Tesouro no céu contra a idolatria de Mamom. O olho simples. A ansiedade é recusada: o Pai alimenta aves e veste lírios; buscai primeiro o reino. O capítulo une culto secreto e confiança cotidiana.',
    estrutura: [
      '6:1–4 — esmola no secreto',
      '6:5–15 — oração e Pai Nosso',
      '6:16–18 — jejum',
      '6:19–34 — tesouro, olho, Mamom, ansiedade',
    ],
    temas: ['Pai celeste', 'Oração', 'Hipocrisia', 'Perdão', 'Providência', 'Reino primeiro'],
    VersiculosChave: [
      chave('Mateus 6:9–13', 'Pai nosso, que estás nos céus…', 'Oração da família do reino: adoração, missão, dependência, reconciliação, santidade.'),
      chave('Mateus 6:33', 'Buscai primeiro o reino de Deus e a sua justiça.', 'A ordem dos amores cura a ansiedade; não a negação do trabalho.'),
    ],
    significadoTeologico:
      'Deus é Pai — graça da adoção. A oração não informa a omnisciência; forma o filho. Calvino: o Pai Nosso é regra de todas as orações.',
    aplicacaoPratica:
      'Pratique piedade invisível. Ore o Pai Nosso com entendimento. Perdoe. Simplifique tesouros. Troque a ruminação ansiosa pela busca do reino.',
    perguntasEstudo: [
      'O que a hipocrisia de 6:1–18 tem em comum nas três práticas?',
      'Como cada petição do Pai Nosso se liga ao resto do Sermão?',
      'Por que o perdão humano está atado ao perdão divino em 6:14–15?',
      'Como 6:25–34 dialoga com a pobreza real e com a ganância?',
    ],
    fontes: ['Mateus 6', 'Lucas 11:1–4', 'Filipenses 4:6–7'],
  }),

  'mt:28': ficha('mt', 28, 'A ressurreição e a grande comissão', {
    contextoHistorico:
      'Desfecho do evangelho segundo Mateus. O sepulcro selado e a guarda romana (27:62–66) tornam o anúncio da ressurreição um confronto público. A Galileia, lugar do primeiro chamado, é o lugar do envio mundial.',
    resumo:
      'Um anjo rola a pedra; as mulheres são as primeiras testemunhas — no mundo antigo, detalhe constrangedor que favorece historicidade. Jesus encontra-as: «não temais». Os sacerdotes subornam a guarda. Na montanha, o ressurreto declara: toda autoridade no céu e na terra. Ide, fazei discípulos de todas as nações, batizando no nome do Pai, do Filho e do Espírito Santo, ensinando a guardar. «Eis que estou convosco todos os dias.» A missão nasce da autoridade e da presença, não do otimismo humano.',
    estrutura: [
      '28:1–10 — o sepulcro vazio e as mulheres',
      '28:11–15 — o boato dos sacerdotes',
      '28:16–20 — autoridade, discipulado, Trindade, presença',
    ],
    temas: ['Ressurreição', 'Testemunho', 'Trindade', 'Missão', 'Discipulado'],
    VersiculosChave: [
      chave('Mateus 28:18–20', 'Toda a autoridade me foi dada… fazei discípulos… eis que estou convosco.', 'A comissão é cristológica, trinitária e eclesial: batismo e ensino de obediência.'),
    ],
    significadoTeologico:
      'A ressurreição vence a morte e inaugura o envio. O nome triúno no batismo é confissão da igreja antiga. A presença de Emanuel (1:23) se cumpre até a consumação.',
    aplicacaoPratica:
      'Não fique no túmulo vazio como notícia apenas: discipule. Batize e ensine. A autoridade de Cristo calma o medo missionário. Desmente boatos com testemunho e santidade.',
    perguntasEstudo: [
      'Por que Mateus enfatiza as mulheres e o suborno da guarda?',
      'O que é «fazer discípulos» — evangelismo pontual ou formação?',
      'Como 28:19 fundamenta o batismo trinitário?',
      'De que modo 1:23 e 28:20 fecham o evangelho?',
    ],
    fontes: ['Mateus 28', 'Mateus 1:23', 'Daniel 7:14', 'Atos 1:8'],
  }),

  'lc:15': ficha('lc', 15, 'A ovelha, a moeda e o filho perdido', {
    contextoHistorico:
      'Fariseus murmuram porque Jesus recebe pecadores. As três parábolas justificam o ministério da graça: o céu se alegra com um pecador que se arrepende. O filho mais velho expõe a religião do mérito.',
    resumo:
      'O pastor deixa noventa e nove; a mulher varre a casa; o pai corre ao filho que volta. Em cada caso, o perdido é buscado ou recebido com festa. O filho mais novo desperdiça; o mais velho, embora nunca tenha saído, está longe do coração do pai. A justiça própria é tão perdida quanto a libertinagem. O evangelho é a iniciativa do Pai e a festa da restauração.',
    estrutura: [
      '15:1–7 — ovelha',
      '15:8–10 — dracma',
      '15:11–32 — os dois filhos e o pai misericordioso',
    ],
    temas: ['Graça', 'Arrependimento', 'Alegria no céu', 'Justiça própria', 'Filiação'],
    VersiculosChave: [
      chave('Lucas 15:7', 'Haverá alegria no céu por um pecador que se arrepende.', 'O valor de um: a economia do céu não é estatística fria.'),
      chave('Lucas 15:20', 'Estando ele ainda longe, viu-o seu pai, e se moveu de íntima compaixão e, correndo, lançou-se-lhe ao pescoço.', 'A dignidade oriental do pai é quebrada pelo amor que corre.'),
    ],
    significadoTeologico:
      'Deus não é um patrão magoado; é Pai que busca. O filho mais velho é aviso à igreja que murmura contra a graça alheia.',
    aplicacaoPratica:
      'Celebre conversões. Corra ao arrependido. Examine se você é o mais velho. Evangelize como quem busca, não como quem espera na varanda do desprezo.',
    perguntasEstudo: [
      'Como as três parábolas respondem à murmuração de 15:1–2?',
      'O que o filho mais velho revela sobre o pecado religioso?',
      'A festa contradiz a santidade? Como o capítulo une as duas?',
      'Onde você se vê na história — e o que o Pai faz?',
    ],
    fontes: ['Lucas 15', 'Ezequiel 34', '1 Timóteo 1:15'],
  }),

  'jo:1': ficha('jo', 1, 'O Verbo eterno se fez carne', {
    contextoHistorico:
      'Prólogo joanino (1:1–18) ecoa Gn 1 e a sabedoria de Provérbios 8, mas identifica o Logos com uma Pessoa que esteve junto de Deus e era Deus. O restante do capítulo é testemunho de João Batista e o chamado dos primeiros discípulos («vinde e vede»).',
    resumo:
      'No princípio era o Verbo; o Verbo estava com Deus; o Verbo era Deus. Tudo foi feito por Ele. Nele estava a vida; a luz resplandece nas trevas. O Verbo se fez carne e habitou (eskēnōsen, «armou tenda») entre nós; vimos a glória, cheio de graça e verdade. A Lei veio por Moisés; a graça e a verdade, por Jesus Cristo. Ninguém jamais viu a Deus; o Filho unigênito O revelou. João aponta o Cordeiro de Deus. Natanael ouve: «vereis o céu aberto». O capítulo é o fundamento da cristologia nicena: verdadeiro Deus e verdadeiro homem.',
    estrutura: [
      '1:1–18 — prólogo: Logos, carne, glória, revelação',
      '1:19–34 — testemunho de João: Cordeiro e Espírito',
      '1:35–51 — os primeiros discípulos',
    ],
    temas: ['Trindade', 'Encarnação', 'Criação', 'Revelação', 'Cordeiro de Deus', 'Discipulado'],
    VersiculosChave: [
      chave('João 1:1', 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.', 'Eternidade, distinção pessoal e deidade plena do Filho.'),
      chave('João 1:14', 'O Verbo se fez carne e habitou entre nós.', 'Encarnação real, não aparência (contra o docetismo).'),
      chave('João 1:29', 'Eis o Cordeiro de Deus, que tira o pecado do mundo.', 'A missão do encarnado é expiatória e universal no anúncio.'),
    ],
    significadoTeologico:
      'Atanásio: Ele se fez homem para que fôssemos deificados (participação na graça, não fusão ontológica). Westminster: duas naturezas, uma pessoa. Calvino: o Filho se fez Filho do homem para que os filhos dos homens se tornassem filhos de Deus.',
    palavrasOriginais: ['λόγος (logos)', 'σὰρξ (sarx)', 'ἐσκήνωσεν', 'μονογενής', 'ἀμνός'],
    aplicacaoPratica:
      'Adore o Cristo de João 1, não um Jesus reduzido a mestre. Receba-O (1:12). Apontar o Cordeiro é o ministério de todo João Batista contemporâneo. Venha e veja — discipulado começa na presença.',
    perguntasEstudo: [
      'Como 1:1–3 relê Gênesis 1?',
      'O que «habitou entre nós» evoca do tabernáculo?',
      'Qual a diferença entre a Lei mosaica e «graça e verdade» em 1:17 — oposição ou cumprimento?',
      'Como 1:12–13 descreve o novo nascimento, antecipando o cap. 3?',
    ],
    fontes: ['João 1', 'Gênesis 1', 'Êxodo 25–40', 'Atanásio, De Incarnatione', 'Confissão de Westminster VIII'],
  }),

  'jo:3': ficha('jo', 3, 'Nascer do alto e o amor que deu o Filho', {
    contextoHistorico:
      'Nicodemos, fariseu e membro do Sinédrio, vem de noite. O diálogo trata de entrada no reino. João 3:16 resume o evangelho; 3:14 remete à serpente de bronze (Nm 21). O testemunho final de João Batista: «importa que Ele cresça».',
    resumo:
      'Sem nascer da água e do Espírito ninguém vê o reino. O vento (pneuma) sopra onde quer: a regeneração é soberana. O Filho do Homem deve ser levantado para que todo o que crê tenha vida eterna. Deus amou o mundo de tal maneira que deu o Filho unigênito. Quem crê não é julgado; quem não crê já está julgado porque não creu no nome. A luz veio; as trevas amaram mais as trevas. João Batista alegra-se como amigo do noivo.',
    estrutura: [
      '3:1–15 — Nicodemos, novo nascimento, serpente levantada',
      '3:16–21 — o amor do Pai, fé e juízo',
      '3:22–36 — o amigo do noivo e a supremacia do Filho',
    ],
    temas: ['Regeneração', 'Fé', 'Amor de Deus', 'Expiação', 'Juízo', 'Humildade ministerial'],
    VersiculosChave: [
      chave('João 3:5', 'Quem não nascer da água e do Espírito não pode entrar no reino de Deus.', 'Novo nascimento, não reforma moral do velho homem.'),
      chave('João 3:16', 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.', 'O evangelho em uma frase: amor, dádiva, fé, vida eterna.'),
    ],
    significadoTeologico:
      'Lutero: «todo o que crê» exclui as obras como causa. Agostinho: fomos amados quando inimigos. A serpente levantada é tipologia da cruz: olhar e viver.',
    aplicacaoPratica:
      'Não negocie o novo nascimento. Pregue 3:16 sem cortar 3:18–21. Diminua para que Cristo cresça. Explique a fé como receber o Filho dado, não como mérito intelectual.',
    perguntasEstudo: [
      'O que Nicodemos entende e o que não entende?',
      'Como Números 21 ilumina 3:14–15?',
      'O «mundo» em 3:16 é a criação caída amada ou uma categoria étnica?',
      'Por que a incredulidade já é juízo (3:18)?',
    ],
    fontes: ['João 3', 'Números 21:4–9', 'Efésios 2:4–9', '1 João 4:9–10'],
  }),

  'jo:14': ficha('jo', 14, 'O caminho, a verdade, a vida e o outro Consolador', {
    contextoHistorico:
      'Discurso de despedida na ceia (Jo 13–17). Os discípulos estão abalados com a traição e a partida. Jesus consola: crer em Deus e nEle; a casa do Pai; a identidade dEle como único caminho.',
    resumo:
      'Não se turbe o coração. Na casa do Pai há muitas moradas; vou preparar-vos lugar. «Eu sou o caminho, a verdade e a vida; ninguém vem ao Pai senão por mim.» Ver a Jesus é ver o Pai. As obras maiores (14:12) são o fruto da oração no nome e da missão no Espírito. O outro Paráclito, o Espírito da verdade, habitará nos discípulos. Quem ama guarda os mandamentos. A paz de Cristo, não a do mundo. O príncipe deste mundo nada tem em Jesus.',
    estrutura: [
      '14:1–14 — fé, casa do Pai, caminho exclusivo, oração',
      '14:15–26 — amor, obediência, vinda do Espírito',
      '14:27–31 — paz, partida, príncipe deste mundo',
    ],
    temas: ['Cristologia', 'Trindade', 'Espírito Santo', 'Oração', 'Paz', 'Obediência do amor'],
    VersiculosChave: [
      chave('João 14:6', 'Eu sou o caminho, a verdade e a vida.', 'Exclusividade salvadora de Cristo, não intolerância pessoal do discípulo.'),
      chave('João 14:16–17', 'Ele vos dará outro Consolador… o Espírito da verdade.', 'A presença de Jesus continua pelo Espírito habitando a igreja.'),
    ],
    significadoTeologico:
      'Sola Christus. O Espírito é Pessoa, não força. A obediência é evidência do amor, não causa da filiação. Calvino: desviando-se de Cristo, ainda que corra, está fora da estrada.',
    aplicacaoPratica:
      'Consolar angustiados com 14:1–3. Recusar pluralismo soteriológico sem arrogância. Ore no nome de Jesus. Ame pela obediência. Receba a paz que o mundo não fabrica.',
    perguntasEstudo: [
      'Como 14:6 relaciona caminho, verdade e vida?',
      'O que são as «obras maiores» em 14:12?',
      'Qual a relação entre amar a Jesus e guardar os mandamentos?',
      'Como o Paráclito «substitui» e ao mesmo tempo comunica Jesus?',
    ],
    fontes: ['João 14', 'João 16', 'Atos 2', 'Hebreus 10:19–22'],
  }),

  'jo:19': ficha('jo', 19, 'Eis o Homem: a cruz segundo João', {
    contextoHistorico:
      'Paixão sob Pôncio Pilatos. João enfatiza a realeza irônica (púrpura, «rei dos judeus»), o cumprimento da Escritura (vestes, sede, ossos, lance) e o «está consumado». O discípulo amado e as mulheres permanecem.',
    resumo:
      'Açoites, coroa de espinhos, Ecce homo. Pilatos acha Jesus inocente, mas cede à pressão. Crucificado entre dois, Jesus entrega a mãe ao discípulo. «Tenho sede» cumpre o salmo. «Está consumado» (tetelestai): a obra da redenção está completa. Sangue e água do lado aberto. José de Arimateia e Nicodemos sepultam com honra. O Cordeiro de 1:29 é imolado na preparação da Páscoa.',
    estrutura: [
      '19:1–16 — julgamento civil e entrega',
      '19:17–30 — crucificação, Escritura, consumação',
      '19:31–42 — lado aberto, sepultura',
    ],
    temas: ['Expiação', 'Realeza de Cristo', 'Cumprimento da Escritura', 'Consumação', 'Testemunho'],
    VersiculosChave: [
      chave('João 19:30', 'Está consumado.', 'A salvação não fica pendente de suplementos humanos.'),
      chave('João 19:36–37', 'Nenhum osso… olharão para aquele que transpassaram.', 'Páscoa (Ex 12) e Zacarias 12:10 na cruz.'),
    ],
    significadoTeologico:
      'A cruz é trono. O tetelestai encerra o regime de sombras. João vê na morte não acidente, mas «a hora».',
    aplicacaoPratica:
      'Pregue Cristo crucificado. Não acrescente méritos ao «consumado». Permaneça junto à cruz como as mulheres. Honre o corpo de Cristo — o Senhor e a igreja.',
    perguntasEstudo: [
      'Como João mostra que Jesus reina na paixão?',
      'Quais textos do AT se cumprem neste capítulo?',
      'O que «está consumado» significa para a consciência culpada?',
      'Qual o papel de Nicodemos em 19:39 comparado ao cap. 3?',
    ],
    fontes: ['João 19', 'Êxodo 12', 'Salmos 22 e 69', 'Zacarias 12:10'],
  }),

  'at:2': ficha('at', 2, 'O Pentecostes: o Espírito, o sermão e a igreja', {
    contextoHistorico:
      'Cinquenta dias após a Páscoa, festa das primícias e da Lei no judaísmo posterior. Jerusalém cheia de peregrinos. O Espírito prometido (Jl 2; Lc 24:49; At 1:8) desce sobre os cento e vinte.',
    resumo:
      'Vento, línguas como de fogo, idiomas das nações: a maldição de Babel começa a ser revertida no evangelho. Pedro interpreta Joel: nos últimos dias o Espírito é derramado. O sermão: Jesus aprovado por Deus, crucificado pelo plano e pela culpa humana, ressuscitado, exaltado, Senhor e Cristo. «Que faremos?» Arrependei-vos, sede batizados, recebereis o Espírito. Três mil. A igreja persevera na doutrina, comunhão, pão e orações. Sinais, partilha, louvor cotidiano.',
    estrutura: [
      '2:1–13 — o sinal das línguas',
      '2:14–36 — sermão: Joel, Davi, Jesus Senhor',
      '2:37–41 — resposta: arrependimento e batismo',
      '2:42–47 — a vida da igreja primitiva',
    ],
    temas: ['Espírito Santo', 'Cumprimento profético', 'Cristologia', 'Conversão', 'Igreja'],
    VersiculosChave: [
      chave('Atos 2:36', 'Deus o fez Senhor e Cristo a este Jesus que vós crucificastes.', 'O evangelho confronta e oferece perdão no mesmo nome.'),
      chave('Atos 2:42', 'Perseveravam na doutrina dos apóstolos, na comunhão, no partir do pão e nas orações.', 'Quatro marcas irrenunciáveis da igreja.'),
    ],
    significadoTeologico:
      'O Espírito não é espetáculo privado: capacita o testemunho e forma comunidade. O «Senhor e Cristo» é o núcleo kerygmático. A partilha é fruto, não um sistema econômico imposto.',
    aplicacaoPratica:
      'Pregue Escritura cumprida em Cristo. Chame ao arrependimento e ao batismo. Cultive as quatro marcas. Espere o Espírito sem manipular o vento.',
    perguntasEstudo: [
      'Como At 2 cumpre At 1:8 e Joel 2?',
      'Qual a estrutura do sermão de Pedro?',
      'O que 2:39 («a promessa é para vós, vossos filhos…») ensina sobre a aliança?',
      'Como 2:42–47 corrige tanto o individualismo quanto o romantismo da igreja primitiva?',
    ],
    fontes: ['Atos 2', 'Joel 2', 'Salmos 16 e 110', 'Atos 1:8'],
  }),

  'rm:3': ficha('rm', 3, 'Todos pecaram; a justiça de Deus se manifesta', {
    contextoHistorico:
      'Paulo conclui a acusação de Rm 1:18–3:20: gentio e judeu debaixo do pecado. Cita o saltério em cadeia (catena). Então revela o «agora» da justiça de Deus à parte da lei, testemunhada pela Lei e pelos Profetas.',
    resumo:
      'O judeu tem vantagem na Palavra, mas não na isenção do juízo. Ninguém é justo. A lei tapa a boca e traz conhecimento do pecado. Mas agora, justiça de Deus pela fé em Jesus Cristo, para todos os que creem. Justificados gratuitamente pela graça, mediante a redenção; Deus O propôs como propiciação no sangue. Deus é justo e justificador do que tem fé em Jesus. Exclui-se a jactância. A lei é estabelecida, não anulada, pela fé.',
    estrutura: [
      '3:1–8 — objeções sobre a infidelidade de Israel',
      '3:9–20 — ninguém justo; a lei acusa',
      '3:21–26 — o coração da carta: justificação e propiciação',
      '3:27–31 — fé, não jactância; a lei confirmada',
    ],
    temas: ['Pecado universal', 'Justificação pela fé', 'Propiciação', 'Graça', 'Sola fide'],
    VersiculosChave: [
      chave('Romanos 3:23–24', 'Todos pecaram… sendo justificados gratuitamente por sua graça.', 'Diagnóstico universal e remédio gratuito.'),
      chave('Romanos 3:25–26', 'Deus O propôs como propiciação… para ele ser justo e justificador.', 'A cruz resolve a tensão entre a justiça e a justificação do ímpio.'),
    ],
    significadoTeologico:
      'Westminster XI: Deus justifica não infundindo justiça, mas perdoando e imputando a de Cristo. Lutero chamou 3:21–26 de centro da Escritura. A hilastérion (propiciação) ecoa o kapporet de Lv 16.',
    aplicacaoPratica:
      'Cale a jactância. Pregue a lei que acusa e o Cristo que justifica. Não separe graça de sangue. Estabeleça a lei no caminho da gratidão, não do mérito.',
    perguntasEstudo: [
      'Como 3:10–18 usa o AT para fechar toda boca?',
      'O que significa «à parte da lei» e «testemunhada pela lei» ao mesmo tempo?',
      'Propiciação ou expiação — o que 3:25 afirma sobre a ira de Deus?',
      'Como 3:31 evita o antinomismo?',
    ],
    fontes: ['Romanos 3', 'Salmos 14 e 51', 'Levítico 16', 'Confissão de Westminster XI'],
  }),

  'rm:5': ficha('rm', 5, 'Paz com Deus, Adão e Cristo', {
    contextoHistorico:
      'Após a justificação (Rm 3–4, Abraão), Paulo descreve os frutos: paz, acesso, esperança, amor derramado. Depois, a tipologia Adão–Cristo: duas cabeças federais, duas humanidades.',
    resumo:
      'Justificados pela fé, temos paz com Deus e acesso à graça. A tribulação produz perseverança, caráter, esperança. O amor de Deus é derramado pelo Espírito; Cristo morreu por ímpios. Muito mais agora, reconciliados, seremos salvos pela Sua vida. Por um homem o pecado e a morte; por um homem a graça transbordante. A lei entrou para que o delito abundasse; onde o pecado abundou, superabundou a graça — para que reine a vida.',
    estrutura: [
      '5:1–11 — frutos da justificação e reconciliação',
      '5:12–21 — Adão e Cristo: condenação e justificação',
    ],
    temas: ['Paz com Deus', 'Esperança', 'Amor derramado', 'Cabeça federal', 'Superabundância da graça'],
    VersiculosChave: [
      chave('Romanos 5:1', 'Justificados pela fé, temos paz com Deus por nosso Senhor Jesus Cristo.', 'A paz é objetiva (fim da inimizade), não só sentimento.'),
      chave('Romanos 5:8', 'Deus prova o seu amor para conosco em que Cristo morreu por nós, sendo nós ainda pecadores.', 'O amor é demonstrado na cruz, não inferido do conforto.'),
      chave('Romanos 5:19', 'Pela obediência de um serão muitos feitos justos.', 'Imputação da obediência de Cristo, espelho da imputação do pecado de Adão.'),
    ],
    significadoTeologico:
      'Sem Adão federal, a analogia de Paulo desaba. A graça não é empate: é superabundância. A segurança (5:9–10) é «muito mais» a partir da morte já ocorrida.',
    aplicacaoPratica:
      'Viva a paz como status, não como montanha-russa. Glorie-se nas tribulações sem masoquismo: elas trabalham esperança. Recuse o pelagianismo: você nasceu em Adão e, pela fé, está em Cristo.',
    perguntasEstudo: [
      'Qual a diferença entre paz com Deus e a paz de Deus (Fp 4:7)?',
      'Como 5:12–21 explica o mundo e o evangelho?',
      'A graça superabundante incentiva o pecado? Como o cap. 6 responde?',
      'O que 5:6–8 ensina sobre o tempo e o objeto do amor de Deus?',
    ],
    fontes: ['Romanos 5', 'Gênesis 3', '1 Coríntios 15:21–22', 'Isaías 53'],
  }),

  'rm:8': ficha('rm', 8, 'Nenhuma condenação: o Espírito e o amor de Deus', {
    contextoHistorico:
      'Cume da seção Rm 5–8. Após a luta de Rm 7, o Espírito é o ambiente da nova vida. A criação geme; os filhos gemem; o Espírito geme. Nada separa do amor de Deus em Cristo.',
    resumo:
      'Nenhuma condenação para os que estão em Cristo. A lei do Espírito da vida libertou da lei do pecado e da morte. A lei se cumpre em quem anda segundo o Espírito. Filiação, Abba, herança, sofrimento com Cristo. A criação aguarda a revelação dos filhos. O Espírito ajuda na fraqueza e intercede. Todas as coisas cooperam para o bem dos que amam a Deus, chamados segundo o propósito: presciência, predestinação, vocação, justificação, glorificação. Se Deus é por nós, quem será contra nós? Nem a morte nem a vida nos separará do amor de Deus.',
    estrutura: [
      '8:1–17 — Espírito, filiação, herança',
      '8:18–30 — gemidos, esperança, propósito eterno',
      '8:31–39 — o triunfo do amor de Deus',
    ],
    temas: ['Espírito Santo', 'Filiação', 'Esperança cósmica', 'Predestinação', 'Segurança da salvação'],
    VersiculosChave: [
      chave('Romanos 8:1', 'Nenhuma condenação há para os que estão em Cristo Jesus.', 'Veredito celestial já pronunciado.'),
      chave('Romanos 8:28–30', 'Todas as coisas cooperam para o bem… aos que chamou, a esses também justificou.', 'A cadeia da salvação é de Deus; o «bem» é conformidade a Cristo, não conforto burguês.'),
      chave('Romanos 8:38–39', 'Nem a morte, nem a vida… nos poderá separar do amor de Deus.', 'Segurança fundada no amor de Deus, não na nossa constância autônoma.'),
    ],
    significadoTeologico:
      'A justificação (cap. 3–5) e a santificação (cap. 6–8) se unem no Espírito. A predestinação é pastoral: consolo dos sofredores, não curiosidade fria. A criação será libertada: escatologia não é fuga do mundo, mas redenção do cosmos.',
    aplicacaoPratica:
      'Ande no Espírito. Ore «Abba» na fraqueza. Interprete o sofrimento à luz da glória futura. Pregue a segurança sem presunção e a santidade sem terror de condenação.',
    perguntasEstudo: [
      'Como 8:1 responde a 7:24?',
      'O que é «andar segundo o Espírito» em distinção ao entusiasmo vago?',
      'Como 8:18–25 une ecologia e escatologia sem paganizar a criação?',
      'A cadeia de 8:29–30 exclui a responsabilidade humana? Como Paulo pregaria o evangelho então?',
    ],
    fontes: ['Romanos 8', 'Ezequiel 36', 'Gálatas 4:4–7', 'Salmos 44:22'],
  }),

  '1co:13': ficha('1co', 13, 'O caminho excelentíssimo: o amor', {
    contextoHistorico:
      'No meio da discussão sobre dons (caps. 12–14), Paulo insere o hino ao agape. Corinto valorizava línguas e sabedoria retórica; sem amor, tudo é nada. O amor é o critério escatológico: os dons cessam; o amor permanece.',
    resumo:
      'Línguas de anjos, profecia, fé que move montes, esmola e martírio — sem amor, nada. O amor é paciente, benigno, não inveja, não se vangloria, não se ensoberbece, não se porta inconvenientemente, não busca os seus, não se irrita, não suspeita mal, não folga com a injustiça, folga com a verdade; tudo sofre, crê, espera, suporta. O que é em parte será abolido; veremos face a face. Permanecem fé, esperança e amor; o maior é o amor.',
    estrutura: [
      '13:1–3 — o nada sem amor',
      '13:4–7 — o caráter do amor',
      '13:8–13 — o permanente e o transitório',
    ],
    temas: ['Agape', 'Dons espirituais', 'Escatologia', 'Igreja', 'Maturidade'],
    VersiculosChave: [
      chave('1 Coríntios 13:13', 'Agora, pois, permanecem a fé, a esperança e o amor, estes três; mas o maior destes é o amor.', 'O amor é maior porque Deus é amor e porque no céu a fé vira vista e a esperança, posse.'),
    ],
    significadoTeologico:
      'O amor não é sentimento vago: é a vida de Deus no corpo de Cristo. Os dons servem; o amor é a substância. Henry: o amor é o cumprimento da lei (Rm 13:10) no tom da cruz (1 Jo 3:16).',
    aplicacaoPratica:
      'Avalie ministérios pelo amor, não pelo espetáculo. Pratique 13:4–7 em casa e na igreja. Busque dons (14:1) pelo caminho do amor, não contra ele.',
    perguntasEstudo: [
      'Por que o hino está entre os caps. 12 e 14?',
      'O que cada verbo de 13:4–7 corrige em Corinto — e em nós?',
      'Como 13:8–12 informa o debate sobre dons hoje sem dogmatismo secundário?',
      'Por que o amor é maior que a fé e a esperança?',
    ],
    fontes: ['1 Coríntios 13', '1 Coríntios 12–14', 'Romanos 13:8–10', '1 João 4'],
  }),

  '1co:15': ficha('1co', 15, 'A ressurreição: tradição, Adão e vitória', {
    contextoHistorico:
      'Alguns em Corinto diziam não haver ressurreição de mortos — típico do platonismo popular (o corpo como prisão). Paulo responde com a tradição mais antiga (15:3–8), a lógica da fé e a esperança do corpo espiritual (pneumatikon: animado pelo Espírito, não fantasma).',
    resumo:
      'O evangelho recebido: Cristo morreu pelos pecados, segundo as Escrituras, foi sepultado, ressuscitou ao terceiro dia, apareceu a Cefas, aos Doze, a quinhentos, a Tiago, a todos os apóstolos, a Paulo. Sem ressurreição, a fé é vã e ainda estamos nos pecados. Cristo, primícias; depois os que são dEle. O último Adão é espírito vivificante. O mistério: nem todos dormiremos; seremos transformados. A morte é tragada na vitória. Portanto, sede firmes: o trabalho no Senhor não é vão.',
    estrutura: [
      '15:1–11 — o evangelho e as aparições',
      '15:12–34 — se os mortos não ressuscitam',
      '15:35–49 — o corpo da ressurreição',
      '15:50–58 — transformação e hino de vitória',
    ],
    temas: ['Ressurreição', 'Evangelho apostólico', 'Último Adão', 'Escatologia', 'Trabalho no Senhor'],
    VersiculosChave: [
      chave('1 Coríntios 15:3–4', 'Cristo morreu pelos nossos pecados, segundo as Escrituras, e ressuscitou ao terceiro dia.', 'O núcleo irredutível da fé cristã.'),
      chave('1 Coríntios 15:58', 'Sede firmes… sabendo que o vosso trabalho não é vão no Senhor.', 'A doutrina da ressurreição gera ética e perseverança, não evasão.'),
    ],
    significadoTeologico:
      'A ressurreição de Cristo é fato histórico com testemunhas e é primícias da nossa. Negá-la esvazia a cruz. O corpo será glorificado, não descartado.',
    aplicacaoPratica:
      'Pregue 15:3–4. Conforte os que choram com esperança corporal, não só «alma no céu». Trabalhe: nada feito no Senhor se perde. Santidade: o corpo é para o Senhor (6:13) e será ressuscitado.',
    perguntasEstudo: [
      'Por que Paulo lista testemunhas em 15:5–8?',
      'Como 15:21–22 e Rm 5 se iluminam?',
      'O que é o «corpo espiritual» — e o que não é?',
      'Como 15:58 liga dogma e vocação cotidiana?',
    ],
    fontes: ['1 Coríntios 15', 'Isaías 25:8', 'Oseias 13:14', 'Romanos 5'],
  }),

  'ef:2': ficha('ef', 2, 'Mortos, vivificados, um só povo', {
    contextoHistorico:
      'Efésios, carta da igreja na Ásia, celebra a união de judeus e gentios no Cristo cósmico. O cap. 2 descreve a salvação pela graça e a criação de um novo homem, derrubando o muro da cerca.',
    resumo:
      'Mortos em delitos, andando segundo o século, o príncipe das potestades e a carne. Mas Deus, rico em misericórdia, nos vivificou com Cristo: pela graça sois salvos, mediante a fé; isso não vem de vós, é dom; não vem das obras, para que ninguém se glorie. Criados em Cristo para boas obras. Gentios, outrora longe, sem esperança, foram aproximados pelo sangue. Cristo é nossa paz: um novo homem, um Espírito, acesso ao Pai. Templo santo, morada de Deus.',
    estrutura: [
      '2:1–10 — da morte à vida: graça, fé, obras como fruto',
      '2:11–22 — da alienação à cidadania: paz e templo',
    ],
    temas: ['Graça', 'Fé', 'Novas obras', 'Unidade judeu-gentio', 'Igreja como templo'],
    VersiculosChave: [
      chave('Efésios 2:8–9', 'Pela graça sois salvos, por meio da fé… não vem das obras, para que ninguém se glorie.', 'Sola gratia, sola fide; a glória é de Deus.'),
      chave('Efésios 2:14', 'Ele é a nossa paz, o qual de ambos fez um.', 'A cruz derruba hostilidade étnica e ritual no povo de Deus.'),
    ],
    significadoTeologico:
      'A salvação é ressurreição antecipada (2:5–6). As obras não justificam; justificam a vocação (2:10). A eclesiologia é cristológica: a paz é uma Pessoa.',
    aplicacaoPratica:
      'Pregue a gravidade da morte espiritual. Recuse o mérito. Pratique as boas obras preparadas. Derrube muros na igreja: raça, classe, estilo. Viva como pedra do templo, não como consumidor.',
    perguntasEstudo: [
      'Qual o retrato do ser humano em 2:1–3?',
      'Como 2:8–10 une graça e obras sem contradição?',
      'O que era o «muro da separação» e o que restou dele?',
      'Como 2:19–22 descreve a igreja em linguagem de templo?',
    ],
    fontes: ['Efésios 2', 'Isaías 57:19', 'Romanos 3:27–28', '1 Pedro 2:4–10'],
  }),

  'fp:2': ficha('fp', 2, 'A kenosis: de forma de Deus à cruz, e o nome sobre todo nome', {
    contextoHistorico:
      'Paulo, preso, escreve à igreja amada de Filipos. Facções e vaidade ameaçam a unidade (4:2; 2:3). O hino de 2:6–11 (possivelmente pré-paulino) fundamenta a humildade na encarnação e exaltação de Cristo.',
    resumo:
      'Consolo em Cristo, comunhão do Espírito: sede unânimes, nada por partidarismo, cada um olhando para os outros. Tende o sentimento que houve em Cristo: sendo em forma de Deus, não julgou o ser igual a Deus coisa a que se apegar; esvaziou-se, forma de servo, obediente até a morte de cruz. Por isso Deus O exaltou e Lhe deu o nome que está acima de todo nome, para que todo joelho se dobre. Dai à luz a salvação com temor; Deus é quem opera o querer e o efetuar. Brilhai como luzeiros, retenho a palavra da vida. Timóteo e Epafrodito: exemplos de serviço.',
    estrutura: [
      '2:1–5 — apelo à unidade e humildade',
      '2:6–11 — o hino cristológico',
      '2:12–18 — obediência e luzeiros no mundo',
      '2:19–30 — Timóteo e Epafrodito',
    ],
    temas: ['Encarnação', 'Humildade', 'Exaltação', 'Unidade', 'Obediência'],
    VersiculosChave: [
      chave('Filipenses 2:6–8', 'Sendo em forma de Deus… esvaziou-se a si mesmo… até à morte, e morte de cruz.', 'Kenosis: não perda da deidade, mas recusa de autoasserção; assunção da servidão.'),
      chave('Filipenses 2:9–11', 'Deus o exaltou… todo joelho se dobrará.', 'Isaías 45:23 aplicado a Jesus: o nome de YHWH no Filho.'),
    ],
    significadoTeologico:
      'Contra o arianismo: Ele já era em forma de Deus. Contra o docetismo: morte de cruz real. A ética da igreja é cristiforme, não estoica.',
    aplicacaoPratica:
      'Trate a vaidade ministerial como heresia prática. Sirva. Confesse o Senhorio de Jesus. Trabalhe a salvação porque Deus opera em vós — sinergia da graça, não meritocracia.',
    perguntasEstudo: [
      'O que Cristo «não considerou» em 2:6?',
      'Kenosis significa que Ele deixou de ser Deus? Por que não?',
      'Como 2:12–13 evita tanto o quietismo quanto o pelagianismo?',
      'Que papel Timóteo e Epafrodito têm como «comentário vivo» do hino?',
    ],
    fontes: ['Filipenses 2', 'Isaías 45:23', 'João 13', 'Hebreus 12:2'],
  }),

  'hb:11': ficha('hb', 11, 'A fé que vê o invisível: o rol das testemunhas', {
    contextoHistorico:
      'Hebreus anima uma comunidade tentada a voltar ao judaísmo visível (templo, sacerdócio). O cap. 11 mostra que os heróis da antiga aliança já viviam pela fé no que não se via — e não receberam a promessa completa sem nós (11:40).',
    resumo:
      'A fé é o firme fundamento das coisas que se esperam, a prova das que se não veem. Por ela os antigos alcançaram bom testemunho. Criação pela Palavra. Abel, Enoque, Noé, Abraão (peregrino, estrela, Isaque), Sara, Isaque, Jacó, José, Moisés, o êxodo, Jericó, Raabe, juízes, Davi, profetas — e os que foram serrados, sem livramento visível. O mundo não era digno deles. Deus proveu coisa melhor: a consumação em Cristo, para que não fossem aperfeiçoados sem a igreja.',
    estrutura: [
      '11:1–3 — definição e criação',
      '11:4–22 — patriarcas',
      '11:23–31 — Moisés e a conquista',
      '11:32–40 — juízes, reis, mártires, a coisa melhor',
    ],
    temas: ['Fé', 'Peregrinação', 'Promessa', 'Martírio', 'Unidade dos dois testamentos'],
    VersiculosChave: [
      chave('Hebreus 11:1', 'Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.', 'Fé não é salto no absurdo: é confiança na Palavra de Deus sobre o futuro e o invisível.'),
      chave('Hebreus 11:6', 'Sem fé é impossível agradar a Deus.', 'Quem se aproxima deve crer que Ele existe e recompensa os que O buscam.'),
      chave('Hebreus 11:40', 'Deus proveu alguma coisa melhor para nós, para que eles, sem nós, não fossem aperfeiçoados.', 'A história da fé é uma só, consumada em Cristo.'),
    ],
    significadoTeologico:
      'A fé une AT e NT. Os patriarcas viram de longe (11:13); nós vemos o Filho. O cap. 12 dirá: corramos, olhando para Jesus, autor e consumador.',
    aplicacaoPratica:
      'Viva como peregrino. Não exija o visível como condição da obediência. Honre os mártires. Corra no meio da nuvem de testemunhas, os olhos em Cristo, não nos heróis como ídolos.',
    perguntasEstudo: [
      'Como 11:1 se distingue da fé como «otimismo»?',
      'Por que Abraão ocupa o centro do capítulo?',
      'O que fazer com os que não foram livrados (11:35–38)?',
      'Como 11:40 e 12:1–2 se ligam?',
    ],
    fontes: ['Hebreus 11', 'Gênesis 12–22', 'Êxodo 2–14', 'Hebreus 12:1–2'],
  }),

  'ap:21': ficha('ap', 21, 'Céus novos, terra nova e a cidade santa', {
    contextoHistorico:
      'Clímax da revelação a João em Patmos. Após o juízo (cap. 20), a nova criação. A linguagem ecoa Isaías 65–66 e Ezequiel 40–48, transfigurada: não há templo porque Deus e o Cordeiro são o templo.',
    resumo:
      'Céu novo e terra nova; o mar já não existe (caos vencido). A nova Jerusalém desce, adereçada como noiva. Deus habitará com os homens; enxugará toda lágrima; não haverá mais morte, pranto nem dor. «Eis que faço novas todas as coisas.» Aos sedentos, de graça da fonte da vida; aos covardes e abomináveis, a segunda morte. A cidade tem glória de Deus, muralhas, doze portas (tribos) e doze fundamentos (apóstolos): Israel e igreja unidos. Nem sol nem lua: a glória de Deus a ilumina, e o Cordeiro é a lâmpada. Nada impuro entra, só os escritos no livro da vida.',
    estrutura: [
      '21:1–8 — nova criação, noiva, quem herda e quem não',
      '21:9–21 — a cidade medida e adornada',
      '21:22–27 — sem templo, luz do Cordeiro, nações',
    ],
    temas: ['Nova criação', 'Presença de Deus', 'Igreja como noiva', 'Santidade', 'Esperança'],
    VersiculosChave: [
      chave('Apocalipse 21:3–4', 'Eis o tabernáculo de Deus com os homens… e Deus limpará de seus olhos toda lágrima.', 'O fim é comunhão, não mera localização celestial.'),
      chave('Apocalipse 21:5', 'Eis que faço novas todas as coisas.', 'Redenção da criação, não fuga para o éter.'),
    ],
    significadoTeologico:
      'A escatologia cristã é encarnacional até o fim: terra nova, corpo, cidade, nações trazendo glória. A graça («de graça») permanece no estado eterno como caráter do dom. A exclusão do impuro preserva a santidade da comunhão.',
    aplicacaoPratica:
      'Lute e sofra com o fim à vista. Conforte os que choram com 21:4. Evangelize: há quem não entra. Edifique a igreja como quem espera a cidade cujo arquiteto é Deus (Hb 11:10).',
    perguntasEstudo: [
      'O que significa «o mar já não existe»?',
      'Como 21:3 cumpre Êxodo 25:8 e João 1:14?',
      'Por que não há templo na cidade?',
      'Como 21:6–8 une convite gratuito e juízo?',
    ],
    fontes: ['Apocalipse 21', 'Isaías 65:17–19', 'Ezequiel 48', 'João 1:14'],
  }),
};

