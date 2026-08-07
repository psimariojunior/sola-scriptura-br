import { VersicoEstudo } from './versiculosEstudoTypes';

const registro: Record<string, VersicoEstudo> = {};

function addVS(
  capitulo: number, v: number,
  titulo: string, contextoHistorico: string,
  contextoLiterario: string, significadoTeologico: string,
  aplicacoes: string[], perguntasEstudo: string[],
  versiculosConexoes: string[]
) {
  registro[`${capitulo}:${v}`] = {
    livro: 'sl', capitulo, versiculo: v, titulo,
    contextoHistorico, contextoLiterario, significadoTeologico,
    aplicacoes, perguntasEstudo, versiculosConexoes
  };
}

addVS(1, 1,
  "A bem-aventurança do justo que se aparta do mal",
  "Escrito possivelmente por Davi ou por um autor posterior durante o exílio, este salmo de abertura do Saltério serve como introdução temática de todo o Livro I (Salmos 1–41). Reflete o período monárquico tardio ou pós-exílico, quando Israel buscava reafirmar a identidade nacional pela Torá.",
  "Salmo sapiencial (de sabedoria) que estabelece um contraste dualístico entre dois caminhos: o do justo e do ímpio. É o \"portal\" do Saltério, preparando o leitor para meditar na Lei de Deus. A estrutura hebraica usa paralelismo antitético perfeito.",
  "A bênção (ashrei) do justo não depende de mérito humano, mas de uma postura de rejeição deliberada ao conselho dos ímpios. O verbo \"caminha\" (halak) indica direção de vida, não incidente isolado. Cristo cumpre perfeitamente este ideal — Ele é o justo por excelência que não se desviou (Hb 4:15). Em Cristo, o crente é declarado justo e capacitado a caminhar neste caminho.",
  ["Identifique quais \"conselhos dos ímpios\" influenciam suas decisões diárias e tome uma atitude concreta de afastamento.","Cultive uma fellowship com pessoas que temem a Deus, evitando o caminho da maldade por associação.","Reflita se há áreas da sua vida onde você \"se assenta\" (estabilidade) em lugar que desagrada a Deus."],
  ["Quais são as \"estradas dos pecadores\" que nossos filhos enfrentam hoje?","Como um cristão pode se \"assentar na roda dos escarnecedores\" sem perceber?","Que diferença existe entre evitar o mal e buscar ativamente a justiça?"],
  ["Josué 1:8","Provérbios 4:14-15","Mt 7:13-14"]
);

addVS(1, 3,
  "A árvore plantada junto às águas — fruto e estabilidade",
  "A imagem da árvore ribeirinha evoca o Jardim do Éden (Gn 2:10) e a fertilidade do Vale do Jordão. No Oriente Antigo, água era sinônimo de vida e prosperidade. O justo é comparado a uma árvore de viveiro, não a uma planta selvagem.",
  "O paralelismo antitético é completado: enquanto o ímpio é \"palha ao vento\" (imprevisível, sem raiz), o justo é enraizado e fértil. A imagem de \"fruto no seu tempo\" (betho) sugere paciência e maturidade — não produção forçada.",
  "O fruto do justo não é resultado de esforço próprio, mas de conexão com a fonte de água (Deus). Jesus usa a mesma imagem em Jo 15:4-5 — \"sem mim nada podem fazer\". A estabilidade do justo não significa ausência de problemas, mas capacidade de prosperar mesmo em tempos difíceis (Jr 17:7-8).",
  ["Permita que a Palavra de Deus seja sua \"fonte d'água\" diária — estabeleça um tempo fixo de leitura e meditação.","Não se preocupe com resultados imediatos: o fruto \"no seu tempo\" indica que Deus trabalha segundo Seu cronograma.","Seja paciente consigo mesmo: árvores levam anos para dar fruto abundante. O crescimento espiritual é gradual."],
  ["O que significa, na prática, ser \"planted\" (plantado) e não \"flutuante\" na fé?","Por que o texto diz \"no seu tempo\" e não \"imediatamente\"?","Como a imagem da árvore se conecta com a parábola do semeador (Mt 13)?"],
  ["Jr 17:7-8","Jo 15:4-5","Ef 3:17"]
);

addVS(1, 6,
  "O Senhor conhece o caminho dos justos — cuidado soberano",
  "O verbo hebraico \"yada\" (conhecer) aqui significa conhecimento íntimo, relacional — como em Gn 18:19 (\"pois o conheço\"). Não é meramente informativo, mas de cuidado pessoal. A sentença final do salmo sintetiza todo o contraste.",
  "O Salmo 1 termina com um veredicto: Deus supervisiona o caminho dos justos (proteção), mas o caminho dos ímpios \"perece\" (avoth — se desfaz como fumaça). O julgamento final é certo, mesmo que temporariamente não pareça.",
  "O \"conhecimento\" de Deus sobre o justo é relacional e protetor — o mesmo verbo usado em Amós 3:2 (\"só a vós outros eu conheci de todos os povos da terra\"). A destruição dos ímpios não é arbitrária, mas consequência de sua rebelião. Cristo é o Juiz final que separa os dois caminhos (Mt 25:31-46).",
  ["Confie que Deus observa seu caminho mesmo quando você não vê resposta imediata.","Lembre-se de que a prosperidade temporária dos ímpios não é o julgamento final — Deus tem um \"fim\" para tudo.","Viva de modo que seu \"caminho\" seja acessível ao olhar de Deus — transparência e integridade."],
  ["Como o conceito de Deus \"conhecer\" o caminho dos justos se diferencia de simplesmente \"saber\"?","Por que os ímpios parecem prosperar se Deus os \"não conhece\"?","Qual é a esperança cristã para aqueles que veem a injustiça prevalecer?"],
  ["Amós 3:2","Mt 25:31-46","2 Tm 2:19"]
);

addVS(2, 1,
  "A revolta das nações contra o Ungido de Deus",
  "Este salmo real messiânico provavelmente foi usado nas coroações de reis de Judá. A pergunta retórica inicial (\"Por que se amotinam os povos?\") reflete um cenário geopolítico onde as nações vizinhas resistiam à soberania de Israel e de seu Deus.",
  "É o segundo salmo de introdução do Saltério (junto com o Sl 1). Enquanto o Sl 1 fala do indivíduo justo, o Sl 2 fala do Rei Messias e da soberania divina sobre as nações. A estrutura progressiva vai da revolta à sentença divina à vitória final.",
  "A \"unção\" (messias/chrismos) aplica primariamente ao rei de Israel, mas aponta profeticamente a Jesus Cristo — o Ungido supremo. A frase \"Tu és o meu Filho\" (v. 7) é citada em Atos 13:33 e Hebreus 1:5 como cumprimento em Cristo.",
  ["Reconheça que a história humana tem um propósito divino — mesmo quando as nações parecem caóticas.","Não se desespere com injustiças políticas: Deus tem o último veredicto.","Entenda que a perseguição ao povo de Deus é, na verdade, rebelião contra o próprio Criador."],
  ["Como o conceito de \"ungido\" (messias) se aplica a Cristo além do contexto israelita?","Por que as nações se rebelam contra Deus se Ele é todo-poderoso?","Que conforto isso traz para cristãos que vivem sob regimes hostis à fé?"],
  ["Atos 13:33","Hb 1:5","Ap 11:15"]
);

addVS(2, 7,
  "Tu és o meu Filho — decreto eterno de filiação",
  "Esta frase é um decreto divino proferido no momento da coroação do rei messiânico. No contexto israelita, o rei era chamado \"filho de Deus\" por representação (2 Sm 7:14). A linguagem é de aliança: Deus estabelece uma relação paterno-filial com o Ungido.",
  "Este verso é o centro teológico do Salmo 2. A declaração divina de filiação é o fundamento da autoridade messiânica. Paulo citou este texto no evangelismo em Antioquia da Pisídia (At 13:33), aplicando-o à ressurreição de Jesus.",
  "A filiação messiânica não é apenas título honorífico — é natureza ontológica. Jesus é Filho de Deus por eterna geração, não por adoção. Hebreus expande isso em Hb 1:5-6, mostrando que o Filho é superior aos anjos. Para o crente, há uma filiação derivada: somos filhos por adoção em Cristo (Gl 4:4-7).",
  ["Aprofunde sua compreensão do que significa ser \"filho de Deus\" — não apenas titular, mas identidade transformada.","Reflita sobre a autoridade que vem da filiação divina: você não precisa buscar validação no mundo.","Celebre o fato de que Jesus, como Filho primogênito, garante sua herança eterna."],
  ["Qual a diferença entre a filiação de Cristo e a filiação do crente?","Como a ressurreição prova que Jesus é o Filho de Deus?","O que significa, na prática, viver como \"filho de Deus\" no dia a dia?"],
  ["2 Sm 7:14","At 13:33","Rm 8:14-17"]
);

addVS(2, 12,
  "Beijai o Filho — homenagem e adoração ao Messias",
  "A expressão \"beijai o filho\" (nashqu-bar) é uma fórmula de homenagem feudal: o vassalo beija a mão ou o anel do senhor como sinal de submissão. A alternativa é \"se irrita\" — o verbo hebraico sugere destruição repentina.",
  "O Salmo 2 fecha com um convite e uma advertência. A adoração ao Filho é a resposta correta à soberania divina. A \"ira a caminho\" refere-se ao julgamento messiânico que Jesus descreveu em Mt 25:31-46.",
  "A adoração ao Filho não é opcional — é o único caminho de fuga da ira vindoura. Em Atos 4:12, Pedro declara que \"não há salvação em nenhum outro\". A \"rocha\" (sela) pode referir-se a Deus como refúgio seguro.",
  ["Reconheça que adorar a Jesus não é apenas cantar — é submeter toda sua vida à Sua autoridade.","A advertência deste verso é séria: rejeitar o Filho tem consequências eternas.","A \"rocha\" é lugar de refúgio — busque Nele como proteção no meio das tempestades da vida."],
  ["Que significa, na prática, \"beijar o Filho\" hoje?","Como o conceito de \"ira a caminho\" se equilibra com a graça de Cristo?","De que maneira a adoração coletiva da igreja é uma expressão deste versículo?"],
  ["Mt 25:31-46","At 4:12","Ap 22:20"]
);

addVS(8, 1,
  "Ó Senhor, nosso Senhor — a majestade do nome divino",
  "Este salmo de louvor à criação é atribuído a Davi e pode ter sido composto ao contemplar o céu noturno no deserto de Judá. O nome \"YHWH Adonai\" combina o Tetragrama (aliança) com \"Senhor\" (soberania universal).",
  "O Salmo 8 é um hino à criação que enquadra a dignidade humana dentro da soberania de Deus. A estrutura em tríade: louvor (v.1), criação (v.2-3), humanidade (v.4-6), reflexão (v.8-9).",
  "A pergunta retórica \"Que é o homem?\" (mah-enosh) revela a maravilha de Deus se importar com seres finitos. A resposta está em Gênesis 1:26-28 — a imagem de Deus (imago Dei) confere dignidade ontológica a todo ser humano.",
  ["Contemple a criação como revelação do caráter de Deus — não apenas como recurso a ser explorado.","Reflita sobre o privilégio de ser feito à imagem de Deus — isso impõe responsabilidade e dignidade.","Reconheça que a humanidade é o ápice da criação de Deus, não um acidente."],
  ["Por que Deus usa coisas \"fracas\" para confundir as fortes (v. 2)?","Como a \"imagem de Deus\" se aplica a todos os seres humanos, mesmo os que não creem?","Que responsabilidade o domínio sobre a criação traz para os cristãos hoje?"],
  ["Gn 1:26-28","1 Co 1:27-29","Hb 2:6-9"]
);

addVS(8, 5,
  "Coroado de glória e de honra — a dignidade humana",
  "O Salmo 8:5 usa a linguagem de coroação real: \"glória\" (havod) e \"honra\" (hadar) são termos normalmente reservados a Deus. O ser humano é colocado como vice-regente divino na terra — uma posição de imensa dignidade.",
  "O autor sapiencial reflete sobre a paradoxal condição humana: pouco menor que os anjos (ou \"deuses\", Elohim), mas coroado de glória. A expressão \"menos que os deuses\" pode referir-se aos deuses pagãos do Oriente Antigo.",
  "Hebreus 2:6-9 cita este texto aplicando-o a Cristo como o Homem original que cumpriu o domínio sobre a criação. A coroa de glória que o homem perdeu por meio do pecado é restaurada em Cristo — o novo Adão.",
  ["Veja a si mesmo e aos outros como \"coroados de glória\" — isso transforma a forma como tratamos cada pessoa.","Reconheça que o domínio sobre a criação é uma responsabilidade, não uma licença para exploração.","Entenda que, em Cristo, a dignidade perdida por Adão é restaurada."],
  ["Como a doutrina da imago Dei se contrapõe a ideologias racistas ou classistas?","Por que Hebreus aplica este salmo a Cristo e não apenas à humanidade?","Que responsabilidades ecológicas isso impõe aos cristãos?"],
  ["Gn 1:26","Fp 2:6-8","1 Co 15:27"]
);

addVS(16, 1,
  "Protege-me, ó Deus — refúgio no Deus vivo",
  "Dav escreveu este salmo miktam (inscrição enigmática) possivelmente durante um período de perseguição — talvez quando Saul o perseguia ou durante a rebelião de Absalão. A expressão \"Deus vivo\" (Elohim Chai) contrasta com os deuses mortos dos pagãos.",
  "O Salmo 16 é um salmo de confiança e profecia messiânica. A estrutura inclui: súplica (v.1-2), afirmação de lealdade (v.3-4), proclamação de bênçãos (v.5-6), orientação divina (v.7-8), esperança de ressurreição (v.9-11).",
  "A expressão \"Deus vivo\" é teologicamente rica: o Deus de Israel não é uma estátua, mas uma Pessoa ativa e presente. Em Atos 14:15, Paulo usa essa mesma ideia ao pregar em Listra.",
  ["Ao enfrentar ameaças, lembre-se de que o Deus vivo é seu refúgio — não seus próprios recursos.","Declare sua total dependência de Deus: \"Não tenho outro bem senão ti\" — isso liberta da ganância material.","Cultive a consciência do Deus vivo no dia a dia — não apenas nas crises."],
  ["O que significa chamar Deus de \"Deus vivo\" em contraste com os \"deuses\" do mundo?","Como se aplica, hoje, a afirmação de que Deus é a nossa \"porção\"?","Que bases temos para confiar em Deus como refúgio em tempos de perigo?"],
  ["Dt 32:47","At 14:15","1 Ts 1:9"]
);

addVS(16, 10,
  "Não deixarás minha alma no Sheol — promessa de ressurreição",
  "Este é um dos versículos messiânicos mais importantes do Antigo Testamento. No contexto israelita, Sheol era o mundo dos mortos — um lugar sombrio e sem retorno. Davi, falando inspirado, faz uma declaração que transcende sua experiência.",
  "O Salmo 16:10 é citado duas vezes no Novo Testamento como profecia de ressurreição: Pedro em Atos 2:25-27 e Paulo em Atos 13:35-37. Ambos argumentam que Davi não pode falar de si mesmo, pois morreu e viu a corrupção.",
  "O verbo \"deixar\" (azab) indica abandono voluntário — Deus não abandonaria Seu Santo à corrupção. A expressão \"ver decomposição\" (shachath) confirma que se trata de ressurreição física, não apenas espiritual.",
  ["A ressurreição não é uma metáfora — é um fato histórico que fundamenta toda a fé cristã.","Meditar na ressurreição de Cristo traz esperança diante da mortalidade e do luto.","A vitória sobre a corrupção é garantia de que o crente também será ressuscitado."],
  ["Por que Pedro argumenta que Davi não pode falar de si mesmo neste versículo?","Como a ressurreição física de Cristo se diferencia de uma \"ressurreição espiritual\" simbólica?","Que implicações práticas a ressurreição tem para a forma como vivemos hoje?"],
  ["At 2:25-27","At 13:35-37","1 Co 15:20-23"]
);

addVS(19, 1,
  "Os céus declaram a glória de Deus — revelação geral",
  "Este hino de Davi abre com uma das mais belas declarações de teologia natural da Bíblia. Os céus (shamayim) são testemunhas silenciosos mas universais da glória divina. No contexto do Oriente Antigo, onde os céus eram adorados como deuses, Davi os declara meras criaturas que apontam para o Criador.",
  "O Salmo 19 tem duas partes perfeitas: revelação geral (v.1-6 — céus) e revelação especial (v.7-14 — Lei). A transição ocorre no verso 7, mas o verso 14 conecta ambas as partes.",
  "A palavra \"declara\" (mesapar) significa \"conta a história\" — os céus narram continuamente a glória de Deus. Não há dia em que sua voz não seja ouvida (Rm 10:18).",
  ["Observe a criação como testemunho diário da grandeza de Deus — não ignore os céus.","Entenda que ninguém tem desculpa para não reconhecer a Deus: a criação é uma \"pregação\" universal.","Combine a reverência pela criação com o estudo da Palavra — ambos são revelação divina."],
  ["Como a teologia natural se relaciona com a teologia especial?","Por que a criação pode ser uma \"voz\" mesmo sem palavras?","Que limitações a revelação na criação tem em relação à revelação bíblica?"],
  ["Rm 1:19-20","Rm 10:18","Hb 1:1-2"]
);

addVS(19, 7,
  "A Lei do Senhor é perfeita — revelação especial",
  "Aqui começa a segunda parte do Salmo 19, que exalta a Torá (Lei instrucional). Cada atributo da Lei é expresso com um substantivo diferente: \"perfeita\" (temimah), \"segura\" (amanah), \"reta\" (mesharim), \"pura\" (barah).",
  "A Lei de Deus não é apenas um código legal — é um presente divino. Os sete sinônimos para a Palavra (Lei, testemunho, mandamentos, preceito, temor, juízo, palavra) refletem a riqueza da revelação de Deus.",
  "Jesus declarou que não veio abolir a Lei, mas cumprir (Mt 5:17-18). A Lei é \"perfeita\" porque revela o caráter perfeito de Deus e o padrão perfeito de justiça.",
  ["Veja a Bíblia não como um fardo legal, mas como um presente perfeito de Deus para sua vida.","Permita que a Palavra \"converta\" sua alma — transforme sua mentalidade, não apenas seu comportamento.","Reconheça que a Palavra faz até o \"simples\" (peti) sábio — não é preciso ser erudito para entender a Deus."],
  ["Por que o salmista usa tantos sinônimos para a Palavra de Deus?","Como a Lei pode ser \"perfeita\" e ao mesmo tempo \"fraca pela carne\" (Rm 8:3)?","Que relação existe entre a Palavra e a sabedoria do simples?"],
  ["Mt 5:17-18","Rm 7:12","Sl 119:130"]
);

addVS(19, 14,
  "As palavras da minha boca — oração de integridade",
  "O Salmo 19 encerra com uma oração pessoal que conecta as duas partes do salmo: a criação (v.1-6) e a Lei (v.7-14). O \"penar\" ou \"meditação\" (rigeri) é o pensamento interior que precede a palavra.",
  "A expressão \"sejam agradáveis\" (ratzoth) é a mesma usada para sacrifício aceitável no culto. Assim como os animais eram aceitos no altar, as palavras e pensamentos do salmista devem ser agradáveis a Deus.",
  "Jesus ensinou que \"da abundância do coração fala a boca\" (Mt 12:34). O salmista pede que sua fala reflita seu coração consagrado.",
  ["Antes de falar, pergunte: \"Isso será agradável a Deus?\"","Cultive uma vida de meditação para que a palavra que sai reflita um coração transformado.","Entenda que a integridade começa no pensamento — \"o penar do meu coração\" precisa ser santo."],
  ["Por que o salmista conecta a meditação com a fala?","Como isso se relaciona com o ensino de Jesus sobre as palavras do coração (Mt 12:34)?","Que \"sacrifício\" de palavras Deus deseja de nós hoje?"],
  ["Mt 12:34","1 Sm 15:22","Ef 4:29"]
);

addVS(22, 1,
  "Meu Deus, por que me desamparaste? — o grito da cruz",
  "Dav escreveu este salmo de lamento sob inspiração messiânica. Embora possa ter refletido um sofrimento pessoal, o cumprimento literal e detalhado na crucificação de Jesus (Mt 27:46) prova autoria divina.",
  "O Salmo 22 é o primeiro dos Sete Salmos da Cruz — palavras de Jesus na cruz. A estrutura vai do lamento profundo (v.1-21) à vitória e louvor (v.22-31). Jesus cita o verso 1 em Mt 27:46.",
  "O grito de Jesus não indica que Deus realmente o abandonou — mas que Ele experimentou, em Si mesmo, o peso do pecado da humanidade (2 Co 5:21). A pergunta \"por que\" (lamah) expressa agonía existencial, não dúvida teológica.",
  ["Reconheça que até Jesus experimentou a sensação de abandono — isso valida sua própria dor.","A graça não elimina o sofrimento, mas o enquadra em um propósito redentor.","O \"desamparo\" sentido é diferente do abandono real — Deus jamais o deixará (Dt 31:6)."],
  ["Como Jesus pôde sentir-se abandonado se era Deus?","Qual a diferença entre sentir abandono e ser realmente abandonado por Deus?","Como o exemplo de Jesus nos ensina a orar em tempos de escuridão espiritual?"],
  ["Mt 27:46","2 Co 5:21","Dt 31:6"]
);

addVS(22, 18,
  "Repartiram entre si as minhas vestes — a sorte pela túnica",
  "O verso 22:18 descreve com precisão o evento registrado em Mt 27:35 e Jo 19:23-24. Os soldados romanos sortearam a túnica sem costura de Jesus, cumprindo profecia centenária.",
  "O detalhamento da partilha das vestes é uma das profecias mais específicas do Antigo Testamento sobre a paixão. A túnica \"sem costura\" (tunicam textam) pode aludir ao vestido do sumo sacerdote (Lv 16:4).",
  "O cumprimento literal destas profecias demonstra que a morte de Jesus não foi acidental, mas parte do eterno decreto de redenção de Deus (At 2:23).",
  ["Estude as profecias messiânicas cumpridas — isso fortalece a fé na veracidade do evangelho.","Reconheça que o sofrimento de Jesus foi voluntário e planejado — Ele não foi vítima, mas oferente.","Contemple o cuidado de Deus em registrar cada detalhe do cumprimento profético."],
  ["Por que Deus permitiu que profecias tão específicas fossem registradas séculos antes?","Como o conhecimento dessas profecias impacta sua confiança nas Escrituras?","Que paralelos existem entre a túnica sem costura e o ofício sacerdotal de Cristo?"],
  ["Mt 27:35","Jo 19:23-24","Lv 16:4"]
);

addVS(22, 27,
  "Todos os confins da terra se lembrarão — a universalidade da salvação",
  "Após o clímax do sofrimento, o salmo transita para triunfo universal. A partícula \"todo\" (kol) aparece cinco vezes neste versículo — uma ênfase absoluta na universalidade da adoração resultante da obra de Cristo.",
  "O Salmo 22:26-31 é um dos hinos mais exaltantes do Saltério. A转变为 do lamento ao louvor universal reflete a obra completa de Cristo: sofrimento → ressurreição → exaltação → universalidade.",
  "O versículo antecipa a Grande Comissão (Mt 28:19) e a visão de Apocalipse 7:9-10 — uma multidão de todas as nações diante do trono.",
  ["Ampare sua visão de Deus: Ele deseja que todas as nações O adorem, não apenas sua igreja local.","A ceia do Senhor é uma antecipação do banquete messiânico — celebre com reverência.","Reze pelas nações: cada povo está nos planos redentores de Deus."],
  ["Como a universalidade da adoração se relaciona com a Grande Comissão?","Que papel a ceia do Senhor tem como antecipação deste banquete?","Como isso deve mudar nossa visão de missões e evangelismo?"],
  ["Mt 28:19","Ap 7:9-10","1 Tm 2:4"]
);

addVS(23, 1,
  "O Senhor é o meu pastor — relação pessoal e providência",
  "Dav, que era pastor antes de ser rei, escreveu a partir da experiência familiar com o pastoreio. O salmo reflete um período de paz e gratidão — possivelmente após consolidar seu reino.",
  "O Salmo 23 é o mais conhecido de todos os salmos. A estrutura em três partes: Deus como pastor (v.1-3), caminho de fé (v.4-5), casa do Pai (v.6). A primeira pessoa (\"meu\") transforma doutrina abstrata em experiência íntima.",
  "Jesus se autodenomina \"o Bom Pastor\" (Jo 10:11), cumprindo o papel de Deus no Salmo 23. A relação pastor-rebanho implica cuidado, provisão, proteção e guia.",
  ["Reconheça que Deus não é apenas \"o\" pastor, mas \"o meu\" pastor — faça dele uma posse pessoal.","Quando enfrentar tempestades, lembre-se de que o pastor precede o rebanho — Ele já passou pelo vale.","Descanse na certeza de que a provisão de Deus é suficiente — \"não terei falta\" é uma promessa."],
  ["Por que Davi, sendo rei, escolhe a imagem humilde de pastor para Deus?","Como Jesus cumpre e aprofunda o papel de pastor do Salmo 23?","O que significa, na prática, dizer \"não terei falta\" quando vivemos escassez?"],
  ["Jo 10:11-14","1 Pd 2:25","Is 40:11"]
);

addVS(23, 4,
  "Mesmo que eu ande pelo vale da sombra da morte — fé no escuro",
  "O \"vale da sombra da morte\" (gey tsalmaveth) evoca os desfilheiros escuros e perigosos de Judá, onde predadores se escondiam. É uma imagem de perigo real e morte iminente.",
  "O salmista não diz \"se eu passar\", mas \"quando eu andar\" — aceita a realidade do sofrimento. A presença do \"cajado\" (shevet) e da \"vara\" (misheneth) indica que o pastor guia e corrige.",
  "Este verso é um dos mais citados em funerais, mas seu verdadeiro significado é de esperança ativa: \"não temo\" (lo yira) porque \"estás comigo\". A presença de Deus no sofrimento é mais valiosa que a ausência de sofrimento.",
  ["Não fuja dos \"vales\" — é neles que a presença de Deus é mais intensamente experimentada.","O cajado e a vara são instrumentos de proteção e guia — aceite o governo de Deus mesmo quando dói.","Na escuridão, a certeza de \"tu estás comigo\" é mais suficiente que qualquer luz artificial."],
  ["Por que o salmista muda de \"ele\" para \"tu\" no verso 4?","Como a presença de Deus no sofrimento transforma a experiência de dor?","Que significa, teologicamente, que Jesus desceu ao \"vale da sombra da morte\" por nós?"],
  ["Is 43:2","Mt 27:46","2 Co 4:8-10"]
);

addVS(23, 6,
  "A bondade e a misericórdia me seguirão — a eternidade com Deus",
  "O salmo conclui com a certeza de que a bondade (chesed — amor leal da aliança) e a misericórdia (rachamim — compaixão materna) seguirão o crente. O verbo \"seguirão\" (radaph) é o mesmo usado para perseguidores — agora são as bênçãos que perseguem o justo.",
  "A \"casa do Senhor\" (beth YHWH) pode referir-se ao templo, mas aponta para a morada eterna. A expressão \"por longos dias\" (orekh yamim) indica eternidade.",
  "A declaração final é uma antecipação do céu: viver na casa do Senhor para sempre (Jo 14:2-3). Em Cristo, temos a garantia de que \"nada nos separará do amor de Deus\" (Rm 8:38-39).",
  ["Viva com a consciência de que a bondade de Deus não é passageira — ela o segue em todas as circunstâncias.","A \"casa do Senhor\" é nossa morada eterna — use as realidades temporárias sem apego excessivo.","Permita que a certeza da eternidade transforme sua perspectiva sobre os problemas presentes."],
  ["A bondade de Deus é condicional ou incondicional? O que o salmo diz?","Como a promessa da casa eterna nos ajuda a enfrentar a perda de entes queridos?","Que diferença faz viver com a certeza de \"morrerei na casa do Senhor\"?"],
  ["Rm 8:38-39","Jo 14:2-3","2 Co 4:16-18"]
);

addVS(27, 1,
  "O Senhor é a minha luz — vitória e coragem",
  "Dav escreveu este salmo de confiança em meio à perseguição. A expressão \"a minha luz\" (ori) pode aludir à coluna de fogo que guiava Israel no deserto.",
  "O Salmo 27 é um salmo de confiança messiânica. A declaração inicial é uma profissão de fé absoluta: o Senhor é luz (direção), salvação (livramento), fortaleza (proteção).",
  "Jesus se autodenomina \"a Luz do mundo\" (Jo 8:12), cumprindo o papel de luz do Salmo 27. A confiança do salmista não se baseia em circunstâncias, mas na natureza de Deus.",
  ["Declare em voz alta: \"O Senhor é a minha luz e salvação\" — há poder na confissão de fé.","Quando o medo vier, pergunte: \"De quem eu deveria ter medo?\" — a resposta sempre apontará para a soberania de Deus.","Permita que a presença de Deus seja mais desejável que qualquer vitória sobre inimigos."],
  ["Por que o salmista deseja \"habitar na casa do Senhor\" mais do que vitória sobre seus inimigos?","Que significa Jesus ser \"a Luz do mundo\" em contraste com a luz meramente da criação?","Como a confissão de fé pode ser uma ferramenta espiritual contra o medo?"],
  ["Jo 8:12","Is 60:1-2","1 Jo 1:5"]
);

addVS(27, 10,
  "Pai e mãe me deixaram, mas o Senhor me receberá — órfãos amados",
  "A expressão \"pai e mãe me deixaram\" (azav) é a mesma usada para abandono. Pode referir-se a rejeição familiar, exílio, ou morte dos pais. A promessa divina de \"me receberá\" (yakachath) indica acolhimento legal e familiar.",
  "Este verso é uma das mais belas declarações de adoção espiritual da Bíblia. Mesmo que todos os laços humanos se desfaçam, Deus permanece como Pai.",
  "Jesus, que foi rejeitado pelos seus (Jo 1:11), compreende perfeitamente a dor do abandono e oferece uma família eterna.",
  ["Se você sofreu rejeição familiar, saiba que Deus é um Pai que nunca abandona seus filhos.","A adoção espiritual em Cristo é mais real e duradoura que qualquer laço biológico.","Cuide dos órfãos e rejeitados: você pode ser a manifestação física do acolhimento de Deus."],
  ["Como a promessa de acolhimento divino se aplica a quem sofreu abandono familiar?","Que paralelos existem entre a adoção terrena e a adoção espiritual?","Como Jesus, que foi rejeitado pelos seus, compreende a dor de quem é rejeitado?"],
  ["Rm 8:15-17","Gl 4:4-7","Jo 1:11"]
);

addVS(27, 13,
  "Creio que verei a bondade do Senhor — fé perseverante",
  "O salmista declara sua convicção: \"acredito\" (he'emanti) — verbo de fé ativa. A \"bondade do Senhor\" (tuv YHWH) refere-se à bondade terrestre e eterna.",
  "O verso 14 é um dos mais memoráveis: \"Esperai no Senhor\" (kavvah YHWH) — o verbo é repetido para enfatizar perseverança.",
  "A fé do salmista não é cega — é baseada no caráter de Deus. A declaração \"creio que verei a bondade\" é uma antecipação da fé: confiar mesmo sem ver (Hb 11:1).",
  ["Mantenha sua fé mesmo quando Deus parece distante — a bondade ainda está a caminho.","Repetir a si mesmo \"esperai no Senhor\" pode ser um mantra de fé em tempos difíceis.","A perseverança não é passividade — é continuar confiando enquanto espera ativamente."],
  ["A \"bondade do Senhor\" aqui é terrestre ou celestial? Por quê?","Como a espera ativa se diferencia da passividade resignada?","Que papel a perseverança da fé tem na vida cristã madura?"],
  ["Hb 11:1","Is 40:31","Gl 6:9"]
);

addVS(32, 1,
  "Bem-aventurado o transgressor perdoado — a graça da remissão",
  "Dav escreveu este salmo como resposta ao perdão pelo pecado com Bate-Seba e o assassinato de Urias (2 Sm 11-12). O título \"miktam\" pode indicar uma inscrição enigmática ou preciosa.",
  "O Salmo 32 é um dos Sete Penitenciais (junto com Sl 6, 38, 51, 102, 130, 143). Paulo cita Sl 32:1-4 em Rm 4:7-8 para ensinar a justificação pela fé.",
  "A \"bem-aventurança\" (ashrei) abrange aquele cuja transgressão é perdoada, cujo pecado é coberto, e cujo espírito não tem engano. A cobertura do pecado não significa escondê-lo, mas Deus o remove do crente.",
  ["Reconheça que a bem-aventurança do perdão é para aqueles que confessam, não que escondem.","A confissão é o primeiro passo para a restauração — não espere que a culpa desapareça sozinha.","A \"cobertura\" do pecado por Deus é completa — não há condenação para os que estão em Cristo."],
  ["Por que Paulo cita este salmo para falar de justificação pela fé?","Qual a diferença entre \"perdoar\" e \"cobrir\" o pecado?","Por que a confissão é necessária se Deus já sabe de tudo?"],
  ["Rm 4:7-8","1 Jo 1:9","Rm 8:1"]
);

addVS(32, 5,
  "Confessei o meu pecado — o caminho da restauração",
  "Este verso é o coração do Salmo 32. Davi descreve o processo: confissão → perdão → restauração. O verbo \"confessei\" (hodithi) significa declarar publicamente, não apenas reconhecer internamente.",
  "A experiência de Davi é paradigmática: antes da confissão (v.3-4), seu corpo definha como estio. Depois da confissão (v.5), há libertação imediata.",
  "O processo descrito por Davi é o modelo para toda restauração espiritual: reconhecimento, confissão, arrependimento, perdão, alegria.",
  ["Não adie a confissão: a culpa escondida corrói a saúde física e espiritual.","Confesse especificamente — não diga apenas \"perdoe-me\", mas nomeie o pecado concreto.","Receba o perdão de Deus como fato consumado — não volte a carregar o que Ele já removeu."],
  ["A confissão deve ser pública ou privada? Quando cada uma é apropriada?","Por que a culpa não confessada afeta até a saúde física?","Como a confissão se relaciona com a restauração de relacionamentos humanos?"],
  ["1 Jo 1:9","Tg 5:16","Mt 6:12"]
);

addVS(32, 7,
  "Tu és o meu esconderijo — proteção e canção",
  "A expressão \"esconderijo\" (sether) e \"proteção\" (magen) evocam as cavernas e fortalezas naturais de Judá. Davi, que se escondeu em Adullam (1 Sm 22:1), conhece o valor de um refúgio seguro.",
  "O verso 7 é uma declaração de fé que antecede a instrução divina (v.8-9). Deus não apenas perdoa — Ele protege e dá canção de libertação.",
  "A proteção de Deus não é estática — Ele \"cercar\" com canções. Deus transforma a adversidade em adoração.",
  ["Em tempos de ameaça, busque Deus como esconderijo — não seus próprios recursos.","Permita que Deus transforme suas lágrimas em cânticos — Ele é especialista em redenção.","Reconheça que a canção de livramento é tanto uma expressão de fé quanto um meio de vitória."],
  ["Como Deus transforma o sofrimento em \"canção\"?","Que exemplos bíblicos mostram adoração em meio à adversidade?","O que significa Deus ser um \"esconderijo\" para o cristão hoje?"],
  ["Ex 15:1-2","At 16:25","Is 12:2"]
);

addVS(34, 1,
  "Louvarei ao Senhor a todo tempo — gratidão permanente",
  "Dav escreveu este salmo acrostico (cada verso começa com letra do alfabeto hebraico) depois de fingir loucura diante de Abimeleque, que o expulsou (1 Sm 21:10-15).",
  "O Salmo 34 é um salmo de louvor e instrução sapiencial. A estrutura acrostica facilita memorização. A declaração \"a todo tempo\" (bethol-haeth) inclui tempos bons e maus.",
  "Jesus citou Sl 34:20 em Jo 19:36 para mostrar que nenhum osso de Jesus foi quebrado — mais uma profecia messiânica cumprida literalmente.",
  ["Estabeleça um hábito de louvor que não dependa de circunstâncias — louve quando faz sol e quando chove.","A gratidão permanente é uma armadura contra a ansiedade e a amargura.","Reflita sobre como Deus o livrou em momentos difíceis — isso fortalece o louvor futuro."],
  ["Por que o louvor deve ser constante e não apenas em momentos bons?","Como o exemplo de David na corte de Abimeleque nos ensina sobre fé em situações absurdas?","Que relação existe entre louvar \"a todo tempo\" e a soberania de Deus?"],
  ["1 Sm 21:10-15","Jo 19:36","1 Ts 5:16-18"]
);

addVS(34, 8,
  "Provai e vede que o Senhor é bom — experiência da bondade divina",
  "A instrução \"provai\" (taamu) é um verbo gastronômico — degustar. O salmista convida a uma experiência pessoal da bondade de Deus, não apenas intelectual.",
  "Este verso é uma ponte entre a experiência pessoal (v.1-3) e a instrução coletiva (v.4-7). A convite à \"prova\" é experimental, não acadêmica.",
  "O convite divino à experiência pessoal é um dos mais poderosos apelos da Escritura. Assim como o crente prova a comida antes de afirmar que é boa, deve experimentar a bondade de Deus na prática.",
  ["Não aceite a bondade de Deus apenas como doutrina — experimente-a na prática.","Comece pela oração simples: \"Senhor, mostre-me tua bondade\" — Ele responderá.","Reconheça que a fé experimental não é emocionalismo — é baseada em fatos, não sentimentos."],
  ["A experiência pessoal pode ser uma base válida para a fé teológica?","Como \"provar a bondade de Deus\" se diferencia de \"testar a Deus\"?","Que exemplos bíblicos mostram pessoas que \"provaram\" e viram a bondade de Deus?"],
  ["1 Pd 2:3","Jo 10:10","Ef 3:17-19"]
);

addVS(34, 18,
  "O Senhor está perto dos quebrantados — a proximidade divina",
  "O verbo \"perto\" (qarov) indica proximidade geográfica e relacional. \"Quebrantados de coração\" (nishbaré-leb) descreve pessoas com espíritos destroçados — não por pecado, mas por sofrimento.",
  "O Salmo 34:18 é uma das mais ternas declarações de Deus sobre os sofredores. A imagem do Deus transcendente se aproximando dos frágeis e quebrantados é central no cristianismo.",
  "Jesus chorou diante do túmulo de Lázaro (Jo 11:35) — Ele compartilha nossa dor. O crente não sofre sozinho.",
  ["Se você está quebrantado, saiba que Deus não está distante — Ele está ao seu lado.","Não tenha vergonha de sua fragilidade: é nela que a proximidade de Deus se manifesta.","Sirva aos quebrantados — você pode ser a presença física de Deus para eles."],
  ["Por que Deus está perto dos quebrantados e não dos \"fortes\"?","Como Jesus demonstrou essa proximidade durante Sua terra?","Que conforto traz saber que o sofrimento não afasta, mas aproxima de Deus?"],
  ["Is 57:15","Jo 11:35","2 Co 1:3-4"]
);

addVS(46, 1,
  "Deus é o nosso refúgio e fortaleza — segurança absoluta",
  "O Salmo 46 é atribuído aos \"filhos de Corá\" e foi possivelmente composto após uma vitória militar de Israel — talvez a derrota do exército assírio de Senaqueribe em 701 a.C. (2 Rs 19:35).",
  "O Salmo 46 é um hino de confiança que inspirou o hino \"Um Forte Refúgio é o Nosso Deus\" de Lutero. A estrutura em três partes, cada uma terminando com \"o Senhor dos Exércitos está conosco\" (v.7, 11).",
  "Deus não é apenas um refúgio ocasionais — Ele é \"o nosso refúgio\" (artigo definido = permanente). Jesus é nosso refúgio eterno (Hb 6:18).",
  ["Declare que Deus é seu refúgio mesmo quando as circunstâncias parecem desmoronar.","Recorra a Ele como fortaleza ativa — não apenas refúgio passivo, mas fonte de força para enfrentar o combate.","Repita \"o Senhor dos Exércitos está conosco\" em tempos de crise — há poder na proclamação."],
  ["Que diferença faz Deus ser \"o nosso refúgio\" e não apenas \"um refúgio\"?","Como a doutrina da presença de Deus (\"está conosco\") transforma o medo?","Que relação existe entre refúgio e fortaleza na vida espiritual?"],
  ["Hb 6:18","Is 25:4","2 Sm 22:2-3"]
);

addVS(46, 10,
  "Aquietai-vos e sabei que eu sou Deus — silêncio perante a soberania",
  "A exortação \"aquietai-vos\" (harpu) pode ser traduzida como \"parem\", \"cessem\", \"entrem em silêncio\". O contexto militar sugere: \"Parem de lutar e reconheçam que Deus já venceu\".",
  "O verso 10 é um dos mais citados e mais mal compreendidos da Bíblia. Não é um convite ao quietismo ou à passividade — é um apelo à confiança na soberania de Deus.",
  "Aquieta-se diante de Deus é um ato de fé que reconhece que Ele é Deus e nós não.",
  ["Pratique o silêncio diante de Deus — não apenas fale, mas ouça.","Quando a ansiedade atacar, repita: \"Aquietai-vos e sabei que eu sou Deus\" — isso traz paz.","Reconheça que não é sua responsabilidade controlar tudo — Deus já tem o controle."],
  ["A \"quietação\" do verso 10 é passividade ou fé ativa?","Como a soberania de Deus se relaciona com a responsabilidade humana?","Que práticas concretas podem ajudar a \"aquitar-se\" diante de Deus no dia a dia?"],
  ["Fp 4:6-7","Is 30:15","Zc 4:6"]
);

addVS(51, 1,
  "Tende misericórdia de mim, ó Deus — o clamor do arrependido",
  "Dav escreveu este salmo após o confronto do profeta Natã sobre seu pecado com Bate-Seba e o assassinato de Urias (2 Sm 11-12; 12:1-25). É o mais profundo registro de arrependimento da Bíblia.",
  "O Salmo 51 é o mais importante dos Sete Penitenciais e o mais citado sobre arrependimento. A estrutura: súplica (v.1-2), reconhecimento do pecado (v.3-6), pedido de purificação (v.7-9), pedido de restauração (v.10-12), oferecimento espiritual (v.13-17), oração por Sião (v.18-19).",
  "Dav não diz \"pecado contra Bate-Seba\" — diz \"pecado contra ti, somente contra ti\" (v.4). Isso não minimiza o pecado contra os outros, mas reconhece que todo pecado é, em última análise, rebelião contra Deus.",
  ["Reconheça que o pecado, mesmo contra pessoas, é primariamente ofensa a Deus.","Não minimize nem magnifique seus pecados — trate-os como Davi: com honestidade diante da graça de Deus.","A misericórdia de Deus não tem limite — não importa o que você tenha feito, Ele pode perdoar."],
  ["Como Davi pôde dizer \"pecado contra ti somente\" se feriu outras pessoas?","A misericórdia de Deus tem limites? Ou é realmente infinita?","Que relação existe entre arrependimento genuíno e restauração?"],
  ["2 Sm 12:13","Rm 5:20","1 Jo 1:9"]
);

addVS(51, 7,
  "Lava-me, e ficarei mais branco que a neve — purificação completa",
  "A imagem da \"hissope\" (ezov) conecta-se à purificação do leproso (Lv 14:6-7) e à Páscoa (Ex 12:22). Davi usa linguagem litúrgica para descrever sua necessidade de purificação divina.",
  "O pedido de \"lavar\" e \"limpar\" (v.7) é de purificação ritual e moral. A comparação com a neve indica que a graça de Deus não apenas remove a mancha, mas restaura a pureza original.",
  "Isaías usou imagens semelhantes: \"Ainda que os vossos pecados sejam como a escarlata, se tornarão brancos como a neve\" (Is 1:18).",
  ["Peça a Deus purificação específica — não aceite uma fé genérica e superficial.","Reconheça que a purificação é obra de Deus, não mérito humano — não tente \"lavar a si mesmo\".","Permita que o sangue de Cristo cubra suas manchas — Ele é a hissope perfeita."],
  ["A hissope do Antigo Testamento aponta para qual sacramento ou realidade no Novo?","Como o \"ficar mais branco que a neve\" se relaciona com a justificação?","A purificação divina é instantânea ou um processo? Ambas, como?"],
  ["Is 1:18","Jo 13:8","1 Jo 1:7"]
);

addVS(51, 10,
  "Cria em mim um coração puro — renovação interior",
  "O verbo \"criar\" (bara) é o mesmo usado na criação do mundo (Gn 1:1) — indica criação ex nihilo, do nada. Davi não pede \"conserto\" ou \"melhoria\", mas uma nova criação.",
  "Este é um dos versículos mais poderosos sobre transformação interior. A \"criação\" de um coração novo antecipa a nova aliança de Jeremias 31:31-34.",
  "Jesus ensinou que \"do coração procedem os maus pensamentos\" (Mt 15:19) — o problema é a raiz, não os frutos. A solução divina não é reforma externa, mas transformação interior.",
  ["Reconheça que a transformação real começa no coração — não em comportamento externo.","Permita que Deus crie algo novo em você — não tente consertar o velho.","A oração por um \"coração puro\" é a oração mais profunda que pode ser feita."],
  ["A \"criação\" do coração novo é gradual ou instantânea?","Como a nova aliança de Jeremias se cumpre no crente?","Que relação existe entre \"coração puro\" e \"coração quebrantado\" (v.17)?"],
  ["Jr 31:31-34","2 Co 5:17","Ez 36:26"]
);

addVS(51, 17,
  "Um espírito quebrantado não desprezarás — a oferenda que Deus aceita",
  "Dav reconhece que Deus não deseja sacrifícios externos (holocaustos, ofertas) sem coração arrependido. A \"quebrantamento\" (nishbar) é a ruptura da autoconfiança e do orgulho.",
  "Este verso é um dos mais radicais do Antigo Testamento: Deus rejeita sacrifícios rituais em favor do arrependimento sincero. Jesus repetiu essa ideia: \"Misericórdia quero, e não sacrifício\" (Mt 9:13).",
  "O \"espírito quebrantado\" é a precondição para a restauração. Assim como a terra precisa ser revirada antes de ser semeada, o coração precisa ser quebrantado antes de ser reconstruído.",
  ["Deus não deseja performance religiosa — Ele deseja um coração sincero e quebrantado.","Humilhe-se diante de Deus antes de apresentar pedidos — a postura importa.","Reconheça que o arrependimento não é sentimentos passageiros, mas uma mudança de direção."],
  ["Por que Deus rejeita sacrifícios externos sem coração interior?","Que significa \"espírito quebrantado\" na prática do dia a dia?","Como a humildade se relaciona com a graça de Deus?"],
  ["Mt 9:13","Is 57:15","Tg 4:6"]
);

addVS(62, 1,
  "Verdadeiramente em silêncio está a minha alma — confiança absoluta",
  "Dav escreveu este salmo de confiança em meio à perseguição. A expressão \"em silêncio\" (dumiyyah) pode ser traduzida como \"quietude\" ou \"espera expectante\".",
  "O Salmo 62 é uma meditação sobre a suficiência de Deus. A repetição de \"somente em Deus\" (v.1, 2, 5, 6) cria um ritmo de confiança.",
  "A expressão \"quietude\" (dumiyyah) pode ser raiz de \"Davi\" (David = amado). Assim como o nome de Davi significa \"amado\", sua alma encontra quietude em Deus.",
  ["Pratique o silêncio diante de Deus — nem toda oração precisa de palavras.","Reconheça que as pessoas são \"vaidade\" (hevel) — não colocam sua esperança nelas.","Declare que sua salvação vem \"somente de Deus\" — não de seu próprio esforço."],
  ["O silêncio diante de Deus é uma forma de oração?","Por que o salmista insiste em que as pessoas são \"vaidade\"?","Que significa, na prática, confiar \"somente em Deus\" no dia a dia?"],
  ["1 Rs 19:11-12","Lm 3:25-26","Fp 4:6-7"]
);

addVS(62, 8,
  "Deleitai-vos nele — confiança compartilhada",
  "O verbo \"deleitar\" (agalu) significa regozijar-se, exultar. A exortação é para que todo o povo confie em Deus, não apenas o salmista.",
  "O verso 8 é uma exortação comunitária: a confiança em Deus não é apenas individual, mas coletiva. A \"corrente\" (shepha) indica abundância — Deus derrama graça sobre quem nEle confia.",
  "Jesus ensinou que o Pai celestial dá boas coisas aos que Lhe pedem (Mt 7:11).",
  ["Compartilhe sua fé: invite outros a se deleitarem em Deus.","Não guarde para si as bênçãos de Deus — sejam canais, não reservatórios.","Despeje seus fardos diante de Deus — Ele é capaz de carregá-los."],
  ["Que significa \"derramar sua alma\" diante de Deus?","Como a confiança comunitária em Deus se manifesta na igreja hoje?","Por que Deus é a única \"corrente\" que nunca seca?"],
  ["Mt 7:11","At 2:44-47","Is 55:1"]
);

addVS(73, 1,
  "Bondade para com os puros de coração — o questionamento justo",
  "Asá, líder do culto no templo, escreveu este salmo sapiencial que enfrenta diretamente o problema da teodiceia: por que os ímpios prosperam enquanto os justos sofrem?",
  "O Salmo 73 é o mais importante salmo sapiencial sobre a prosperidade dos ímpios. A estrutura: perigo de tropeço (v.1-14), revelação no santuário (v.15-20), arrependimento (v.21-28).",
  "A crise de Asá é universal: \"Por que o justo sofre e o ímpio prospera?\" A resposta não vem da filosofia, mas da presença de Deus no santuário.",
  ["Quando a injustiça parecer prevalecer, lembre-se de que Deus tem um julgamento final.","Não tropece na prosperidade temporária dos ímpios — o fim deles é destruição.","Busque a presença de Deus no santuário (igreja, oração, Palavra) para ganhar perspectiva eterna."],
  ["Por que a prosperidade dos ímpios é um \"escândalo\" para os justos?","Como a perspectiva eterna transforma a avaliação do sofrimento presente?","Que significa \"entrar no santuário\" hoje — em termos práticos?"],
  ["Jr 12:1-2","Hb 10:30-31","Lc 16:19-31"]
);

addVS(73, 25,
  "Quem terei eu nos céus senão ti? — a porção eterna",
  "Após a crise resolvida, Asá faz a declaração mais profunda do salmo: Deus é sua porção (cheleq). A expressão \"porção\" era usada para a herança tribal (Js 14:4).",
  "O verso 25-26 é a culminação teológica do salmo. A pergunta retórica (\"Quem terei eu senão ti?\") revela que nada na criação pode substituir Deus.",
  "Asá descobriu que a verdadeira riqueza não é material, mas relacional. Paulo fez a mesma descoberta: \"Para mim, o viver é Cristo, e o morrer é lucro\" (Fp 1:21).",
  ["Examine: se Deus fosse tirado de sua vida, o que restaria? Se a resposta é \"muito\", repriorize.","Reconheça que as \"porções\" materiais são temporárias — invista na porção eterna.","Declare: \"Deus é a porção do meu coração\" — isso liberta da ganância e da ansiedade."],
  ["A \"porção\" de Deus é suficiente para preencher o vazio da alma humana?","Como Paulo conecta a \"porção\" de Deus com o sofrimento e a contentamento?","Que substitutos para Deus as pessoas modernas usam como \"porção\"?"],
  ["Dt 10:9","Fp 1:21","Lc 12:15-21"]
);

addVS(90, 1,
  "Senhor, tu tens sido o nosso refúgio — a eternidade de Deus",
  "Moisés escreveu este salmo, o mais antigo do Saltério, provavelmente durante os 40 anos no deserto. A referência à eternidade de Deus (\"antes que os montes nascessem\") contrasta com a finitude humana.",
  "O Salmo 90 é o único salmo atribuído a Moisés. É um salmo de lamento coletivo sobre a finitude humana diante da eternidade de Deus.",
  "A expressão \"refúgio\" (maon) indica morada permanente — Deus é o lar eterno de Seu povo.",
  ["Meditação sobre a mortalidade não é morbidez — é sabedoria que prioriza o que realmente importa.","Peça a Deus \"sabedoria\" para usar bem o tempo que lhe resta.","Reconheça que a eternidade de Deus é sua segurança — mesmo que a vida terrena seja breve."],
  ["Como a consciência da mortalidade deveria afetar nossas prioridades diárias?","A oração \"ensina-nos a contar os nossos dias\" implica que não sabemos fazê-lo naturalmente?","Que relação existe entre a eternidade de Deus e nossa esperança de ressurreição?"],
  ["Jm 4:14","1 Ts 5:1-2","Ec 12:1"]
);

addVS(90, 12,
  "Ensina-nos a contar os nossos dias — a sabedoria da finitude",
  "A oração de Moisés pede \"sabedoria do coração\" (chokmath-leb) — não apenas inteligência, mas discernimento profundo. \"Contar os nossos dias\" significa reconhecer a brevidade da vida.",
  "O verso 12 é a resposta sabia à realidade apresentada nos versos anteriores: a vida humana é como a erva que seca (v.5-6).",
  "A oração por \"sabedoria para contar os dias\" é profundamente prática: se você soubesse que morreria amanhã, o que faria hoje?",
  ["Liste 3 prioridades que mudariam se você soubesse que tem apenas 1 ano de vida.","Que atividades diárias são \"contagem de dias\" sábia, e quais são desperdício?","Como a eternidade com Deus transforma a maneira como encaramos a morte?"],
  ["Como a consciência da mortalidade deveria afetar nossas prioridades diárias?","A oração \"ensina-nos a contar os nossos dias\" implica que não sabemos fazê-lo naturalmente?","Que relação existe entre a eternidade de Deus e nossa esperança de ressurreição?"],
  ["Jm 4:14","1 Ts 5:1-2","Ec 12:1"]
);

addVS(91, 1,
  "Quem habita ao abrigo do Altíssimo — proteção divina",
  "O autor deste salmo é incerto (pode ser Moisés ou Davi). A expressão \"no segredo do Altíssimo\" (seter elyon) evoca o Santo dos Santos — o lugar mais sagrado do templo.",
  "O Salmo 91 é o \"salmo de proteção\" mais conhecido da Bíblia. A estrutura: descrição do protegido (v.1-2), promessas de proteção (v.3-13), resposta de Deus (v.14-16). Jesus citou v.11-12 quando Satanás o tentou no deserto.",
  "O \"habitar\" (yashav) indica residência permanente, não visita ocasional. A proteção divina não é para quem passa por Deus, mas para quem Nele vive.",
  ["Habite em Deus permanentemente — a proteção é para quem reside, não para quem visita.","Não teste Deus presunçosamente (Mt 4:6) — a proteção divina não anula a responsabilidade humana.","Declare: \"O Senhor é o meu refúgio\" — a fé confessada fortalece a confiança."],
  ["Habitar em Deus implica que tipo de vida diária?","Por que Satanás citou este salmo para tentar Jesus?","A proteção divina é absoluta ou condicional? Há limites?"],
  ["Mt 4:5-7","Ef 6:10-18","1 Rs 19:11-12"]
);

addVS(91, 4,
  "Com as suas penas te cobrirá — proteção maternal",
  "A imagem das \"penas\" (kanaph) evoca uma ave protegendo seus filhotes sob suas asas. A mesma palavra é usada para as \"asas\" do propiciatório (Ex 25:20).",
  "O verso 4 introduz imagens de proteção familiar: escudo, armadura, cobertura. A ave que cobre seus filhotes com as penas é uma imagem oriental clássica de cuidado maternal.",
  "Jesus usou a imagem das asas de Deus para proteger Jerusalém: \"Quantas vezes quis reunir teus filhos, como uma galinha ajunta seus pintos debaixo das asas\" (Mt 23:37).",
  ["Reconheça que a proteção de Deus inclui ternura — não é apenas força bruta.","Veja a Deus como um cuidador materno — isso não diminui Sua masculinidade, mas revela Sua multifacetada natureza.","Descanse sob \"as asas\" de Deus em tempos de tempestade."],
  ["A imagem materna de Deus é encontrada em outros textos bíblicos?","Como Jesus usou a imagem das \"asas\" em Mt 23:37?","Que conforto a proteção \"maternal\" de Deus traz para quem sofre?"],
  ["Mt 23:37","Is 49:15","Rm 8:38-39"]
);

addVS(95, 1,
  "Vinde, exultemos no Senhor — chamado à adoração",
  "Este salmo de adoração é possivelmente da época do exílio ou pós-exílio, quando Israel reconstruía o templo. A exortação \"vinde\" (nervamos) é um convite comunitário à adoração.",
  "O Salmo 95 combina louvor (v.1-7a) e advertência (v.7b-11). A transição ocorre no verso 7: \"Hoje, se ouvirdes a sua voz\" → \"Não endureçais o vosso coração\".",
  "A \"rocha da salvação\" (tsur yeshuati) antecipa a rocha de Paulo em 1 Co 10:4 — Cristo.",
  ["A adoração não é apenas cantar — é inclinar-se diante da soberania de Deus.","Reconheça que há uma advertência grave: endurecimento do coração é real e perigoso.","Combine louvor e obediência — a adoração genuína leva à mudança de vida."],
  ["O que significa, na prática, \"endurecer o coração\" hoje?","Por que o salmista conecta louvor com advertência?","Como a advertência de Hebreus se aplica à igreja contemporânea?"],
  ["Hb 3:7-8","1 Co 10:4","Is 29:13"]
);

addVS(95, 7,
  "Hoje, se ouvirdes a sua voz — o perigo do endurecimento",
  "O \"hoje\" (hayom) é urgente: a oportunidade de arrependimento é agora, não amanhã. O endurecimento do coração (qasah) é gradual.",
  "O verso 7b-11 é uma advertência baseada na história: Israel no deserto tropeçou por incredulidade apesar de ter visto os milagres de Deus.",
  "Jesus também alertou: \"Se hoje ouvirdes a sua voz, não endureçais os vossos corações\" (Hb 3:15).",
  ["Não adie a obediência: cada postpone endurece o coração.","Reflita se há áreas onde você tem ignorado consistentemente a voz de Deus.","Reconheça que a graça tem um \"hoje\" — a paciência de Deus não é eterna sem resposta."],
  ["O endurecimento do coração é gradual ou instantâneo?","Como a história de Israel no deserto se aplica aos cristãos hoje?","O que distingue \"duvidar\" de \"endurecer o coração\"?"],
  ["Hb 3:15","Nm 14:1-4","Ef 4:17-19"]
);

addVS(100, 1,
  "Gritai de júbilo ao Senhor — adoração com alegria",
  "Este salmo de louvor é um convite universal a toda a terra para adorar ao Criador. Pode ter sido usado nos festivais do templo, especialmente na Festa dos Tabernáculos.",
  "O Salmo 100 é o hino de louvor mais conciso do Saltério. A estrutura: convite ao louvor (v.1-2), reconhecimento de Deus como Criador e Pastor (v.3), ações de graças e louvor (v.4-5).",
  "O \"gritai de júbilo\" (ariyu) é um grito de vitória, não apenas de alegria.",
  ["Entre no culto com alegria — não como espectador, mas como participante ativo.","Reconheça que a adoração é um privilégio, não um fardo.","Permita que a alegria da salvação transpareça em seu louvor."],
  ["A adoração deve ser sempre alegre? E quando estamos tristes?","O que significa \"entrar com júbilo\" na prática do culto dominical?","Como o reconhecimento de Deus como \"Criador e Pastor\" transforma a adoração?"],
  ["Jo 4:23-24","Fp 4:4","Sl 95:1-2"]
);

addVS(100, 3,
  "Reconhei que o Senhor é Deus — identidade do povo",
  "A exortação \"reconhei\" (da'u) é um convite ao conhecimento experiencial, não apenas intelectual. \"Deus, e não nós\" (vah lo anachnu) é uma humilde renúncia à auto-suficiência.",
  "O verso 3 é um chamado à humildade: reconhecer que somos criatura, não Criador. A afirmação \"nós somos o seu povo, e o rebanho do seu pastoreio\" é uma confissão de identidade coletiva.",
  "A humildade de reconhecer que \"nós não somos Deus\" é a base da adoração.",
  ["Reconheça diariamente que sua identidade é \"povo de Deus\" — não por nascimento, mas por graça.","Humilhe-se: você não é o centro — Deus é. Isso liberta da ansiedade e do narcisismo.","Celebre a identidade coletiva: você não é cristão sozinho — é parte do rebanho."],
  ["A humildade de reconhecer que \"nós não somos Deus\" é fácil ou difícil na prática?","Que implicações a identidade de \"rebanho de Deus\" tem para a vida comunitária?","Como o individualismo contemporâneo se choca com a identidade coletiva do povo de Deus?"],
  ["Jo 15:5","1 Pd 2:9","Ef 2:8-9"]
);

addVS(103, 1,
  "Louva, ó minha alma, ao Senhor — autocomando ao louvor",
  "Dav escreveu este salmo de louvor e gratidão, possivelmente em um período de paz e reflexão. O autocomando \"louva, ó minha alma\" é um ato de vontade.",
  "O Salmo 103 é um dos hinos mais exaltantes do Saltério. A estrutura: louvor pessoal (v.1-5), bondades divinas (v.6-10), compaixão (v.11-14), eternidade (v.15-18), soberania (v.19-22).",
  "O autocomando ao louvor é um princípio espiritual: a fé pode comandar as emoções.",
  ["Quando a adoração parecer difícil, comande sua alma: \"Louva, ó minha alma!\"","Reconheça que Deus \"perdoa todas as tuas enfermidades\" — gratidão cura a alma.","Faça uma lista de bênçãos de Deus — isso fortalece o louvor."],
  ["O autocomando ao louvor é eficaz ou é apenas autoengano?","Que bênçãos de Deus você tem esquecido de agradecer?","Como a gratidão disciplinada transforma a perspectiva diária?"],
  ["2 Sm 6:14","1 Ts 5:16-18","Cl 3:16"]
);

addVS(103, 8,
  "Misericordioso e piedoso é o Senhor — a natureza de Deus",
  "O verso 8 descreve a natureza de Deus com quatro atributos: misericordioso (rachum), piedoso (channun), longânimo (erek appayim), e \"grande em bondade\" (rav chesed).",
  "A descrição de Deus como \"misericordioso e piedoso\" antecipa a revelação de Deus a Moisés em Êxodo 34:6 — o versículo mais citado do Antigo Testamento por profetas e sábios.",
  "Jesus demonstrou essa misericórdia em Sua vida terrestre — curando enfermos, perdoando pecadores, comendo com publicanos.",
  ["Reconheça que a misericórdia de Deus não é merecida — é um dom a ser recebido.","Permita que a misericórdia de Deus transforme a forma como você trata os outros.","A longanimidade de Deus é paciência, não indiferença — ele espera arrependimento."],
  ["A misericórdia de Deus é compatível com Sua justiça?","Como a longanimidade de Deus se relaciona com o julgamento final?","Que exemplos de \"misericórdia visceral\" Deus demonstrou na história bíblica?"],
  ["Êx 34:6","Rm 2:4","Mt 9:13"]
);

addVS(103, 12,
  "Quanto o oriente é do ocidente, assim afasta de nós as nossas transgressões — remissão completa",
  "A imagem geográfica é poderosa: o leste e o oeste nunca se encontram — são infinitamente distantes. Assim, Deus afasta o pecado do crente.",
  "A expressão \"tão longe\" (yarchiq) indica remoção completa, não apenas cobertura. O pecado não volta — foi lançado no mar (Mq 7:19).",
  "A bondade de Deus (v.8-10) culmina nesta declaração de remissão total. Assim como o leste e o oeste são direções opostas que nunca se cruzam, o pecado confessado é permanentemente afastado do crente.",
  ["Receba o perdão de Deus como fato consumado — não carregue o que Ele já removeu.","A distância do pecado é infinita — não há necessidade de \"voltar\" ao que foi perdoado.","Perdoe os outros como Deus o perdoou: completamente e sem recordar."],
  ["A remissão do pecado é total ou parcial?","Por que a imagem do leste-oeste é mais poderosa que \"tão longe quanto o mar\"?","Como a justificação se relaciona com a santificação no crente?"],
  ["Rm 8:1","Mq 7:19","Is 43:25"]
);

addVS(107, 1,
  "Louvai ao Senhor, porque ele é bom — convite à gratidão",
  "Este salmo é o primeiro do Livro V do Saltério e marca o início da coleção de hinos de louvor pós-exílico. A exortação \"louvai ao Senhor\" (hodu) é repetida quatro vezes (v.1, 8, 15, 21, 31), cada vez associada a uma situação diferente de livramento.",
  "O Salmo 107 é um salmo de ação de graças coletivo que celebra a fidelidade de Deus no exílio. A estrutura: chamado ao louvor (v.1-3), quatro grupos de redimidos (v.4-32), louvor por provisão (v.33-43).",
  "A expressão \"os que o Senhor resgatou\" (geulim) usa a linguagem de resgate da escravidão. Assim como Deus resgatou Israel do Egito, Ele resgata pessoas de diversas situações: deserto (v.4-9), prisão (v.10-16), doença (v.17-22), tempestade (v.23-32).",
  ["Reconheça que toda sua vida é motivo de ação de graças — não apenas os momentos bons.","Identifique em qual \"grupo\" do salmo você se identifica: deserto, prisão, doença ou tempestade.","A bondade de Deus \"dura para sempre\" — não é passageira."],
  ["Por que o salmista descreve quatro situações diferentes de sofrimento?","A bondade de Deus é condicional ou incondicional?","Como as \"tempestades da vida\" revelam o caráter de Deus?"],
  ["Ex 15:1-2","2 Co 4:8-10","Ef 2:4-5"]
);

addVS(107, 9,
  "Sacieu os famintos — provisão divina em abundância",
  "O verso 9 é a síntese da primeira situação (deserterrantes): Deus sacia quem tem fome. A imagem é tanto literal quanto espiritual — Deus supre necessidades físicas e espirituais.",
  "A declaração \"sacia os famintos\" (hesbi'a re'ebim) é uma das mais belas sobre a provisão de Deus. No deserto, Israel recebia maná — alimento sobrenatural. Assim, Deus sacia hoje as necessidades mais profundas da alma humana.",
  "Jesus se autodenomina \"o pão da vida\" (Jo 6:35) e disse \"bem-aventurados os que têm fome e sede de justiça, porque serão fartos\" (Mt 5:6). A fome espiritual é a precondição para a provisão divina.",
  ["Reconheça sua fome espiritual — não a sacie com substitutos baratos.","A fome de Deus é o primeiro passo para ser saciado por Ele.","Confie que Deus suprirá sua necessidade mais profunda — mesmo que não saiba qual é."],
  ["A fome espiritual é uma bênção ou uma maldição?","Por que Deus só sacia quem tem fome?","Que exemplos bíblicos mostram a provisão divina em situações impossíveis?"],
  ["Mt 5:6","Jo 6:35","Is 55:1-2"]
);

addVS(107, 28,
  "Na sua aflição clamaram ao Senhor, e ele os livrou — livramento nos tempestades",
  "A situação dos marinheiros na tempestade (v.23-32) descreve o perigo da navegação no Mar Mediterrâneo. O \"grito\" (yitzak) é um grito de desespero. A resposta divina é imediata: \"ele faz cessar a tempestade\" e \"as ondas se calam\".",
  "O verso 28 é o clímax da terceira situação: marinheiros em tempestade. O paralelo com Jonas (Jn 2:3-9) e com Jesus calmando a tempestade (Mc 4:35-41) é claro. Deus tem poder absoluto sobre as forças da natureza — e sobre as tempestades da vida.",
  "O verso 29 — \"e faz cessar a tempestade, e se acalmam as ondas\" — é uma declaração de soberania divina sobre o caos. Assim como Deus criou a ordem no início (Gn 1:2), Ele restaura a ordem na vida do crente.",
  ["Em tempos de tempestade, clame a Deus — Ele tem poder sobre toda adversidade.","Reconheça que Deus é mais poderoso que qualquer \"onda\" que ameaça sua vida.","Permita que Deus acalme suas \"ondas\" internas — ansiedade, medo, raiva."],
  ["Por que Deus permite tempestades na vida de Seus filhos?","O que o exemplo de Jesus na tempestade (Mc 4) nos ensina sobre fé?","Como o clamor em tempestade se relaciona com a oração de fé?"],
  ["Mc 4:35-41","Jn 2:1-10","Mt 8:23-27"]
);

addVS(110, 1,
  "Senta-te à minha direita — exaltação messiânica",
  "Este salmo real messiânico é o mais citado no Novo Testamento (27 vezes). Davi, inspirado, faz uma declaração que transcende sua experiência: o Senhor (YHWH) diz ao meu senhor (Adonai — o Messias) que se sente à Sua direita.",
  "O verso 1 é uma das declarações messiânicas mais importantes da Bíblia. A \"direita\" é o lugar de honra, autoridade e poder. Jesus citou este salmo para confundir os fariseus (Mt 22:41-46) e declarou que Ele é o Senhor de Davi.",
  "A exaltação de Cristo à direita de Deus é o cumprimento desta profecia. Hebreus expande: \"Assentou-se à direita do trono da Majestade nos céus\" (Hb 1:3). A posição não é apenas honorífica — é funcional: Cristo intercede por nós (Rm 8:34) e governa com autoridade.",
  ["Reconheça que Jesus não é apenas Salvador — é Senhor sentado à direita do Pai.","A intercessão de Cristo garante que sua oração sempre é ouvida.","A autoridade de Cristo sobre todas as coisas dá segurança ao crente."],
  ["Por que Davi chama o Messias de \"meu senhor\" se é seu filho?","Como a exaltação de Cristo à direita de Deus se relaciona com Sua obra na cruz?","Que implicações a intercessão de Cristo tem para a vida de oração?"],
  ["Mt 22:41-46","At 2:34-35","Hb 1:3"]
);

addVS(110, 4,
  "Tu és sacerdote para sempre — a ordem de Melquisedeque",
  "O verso 4 introduz uma segunda dimensão messiânica: o Messias é não apenas Rei, mas também Sacerdote. A aliança sacerdotal \"segunda ordem de Melquisedeque\" é única — não é baseada na linhagem levítica, mas na justiça e eternidade.",
  "A ordem de Melquisedeque (Gn 14:18-20) é anterior à Lei e superior à Lei. Melquisedeque é rei de justiça e rei de paz — títulos que se aplicam perfeitamente a Cristo. Hebreus argumenta que o sacerdócio levita é temporário, mas o de Melquisedeque é eterno.",
  "Jesus é o Sumo Sacerdote que não precisa oferecer sacrifícios por seus próprios pecados (Hb 4:15) — Ele mesmo é o sacrifício (Hb 9:26). A declaração \"tu és sacerdote para sempre\" garante que Sua intercessão nunca cessa. O crente tem um Advogado perante o Pai (1 Jo 2:1).",
  ["Reconheça que Jesus não é apenas seu Salvador, mas seu Sumo Sacerdote — Ele intercede por você.","A oração não é um monólogo — Cristo a apresenta ao Pai perfeitamente.","O sacerdócio eterno de Cristo garante que a salvação é permanente, não temporária."],
  ["A relação entre realeza e sacerdócio em Cristo é paradoxal?","Por que o sacerdócio de Melquisedeque é superior ao de Arão?","Como a intercessão de Cristo se relaciona com a oração do crente?"],
  ["Gn 14:18-20","Hb 4:14-16","Hb 7:23-25"]
);

addVS(119, 1,
  "Bem-aventurados os que são íntegros no caminho — a bênção da obediência",
  "O Salmo 119 é o mais longo do Saltério — 176 versos em 22 estrofes, cada uma começando com uma letra do alfabeto hebraico. É um hino de amor à Palavra de Deus. O verso 1 define o tema: a bênção (ashrei) dos íntegros que seguem a Lei.",
  "O Salmo 119 é um acrostico perfeito que demonstra a riqueza da Palavra de Deus. Cada estrofe usa oito sinônimos para a Palavra: lei, testemunho, mandamento, preceito, juízo, palavra, estatuto, caminho.",
  "A \"integridade no caminho\" (tamim baderekh) não é perfeição, mas direção. Assim como um navio mantém o curso mesmo contra ventos, o íntegro mantém a direção da Palavra mesmo em dificuldades.",
  ["Amor à Bíblia não é intelectual — é existencial: viver o que se lê.","A Palavra de Deus é um \"caminho\" — não apenas um livro de regras.","Pratique a integridade: direção consistente, mesmo quando imperfeita."],
  ["A \"integridade\" do verso 1 é perfeição ou direção?","Como os oito sinônimos da Palavra enriquecem nossa compreensão da Bíblia?","A bênção da Palavra é automática ou requer obediência ativa?"],
  ["Mt 5:17-18","Sl 1:1-3","Jo 1:1"]
);

addVS(119, 9,
  "Com que se purificará o jovem o seu caminho — a Palavra como guia",
  "O versículo é uma pergunta sapiencial que encontra resposta na segunda metade: \"Guardando a tua palavra\". A \"purificação\" (zakah) refere-se à direção moral — como um jovem pode manter-se puro num mundo de tentação?",
  "O Salmo 119 é particularmente relevante para a juventude, que enfrenta tentações mais intensas. A Palavra não é apenas regra — é guia, mapa, luz. A pergunta pressupõe que o jovem quer ser puro — e a resposta é prática: meditação diária na Palavra.",
  "Jesus foi encontrado no templo meditando a Lei (Lc 2:46-47) — aos 12 anos. Paulo exortou Timóteo: \"Guarda a norma\" (1 Tm 4:15). A Palavra não apenas informa — ela transforma (Rm 12:2).",
  ["Reconheça que a pureza não vem de esforço próprio, mas de exposição à Palavra.","Estabeleça um hábito de leitura bíblica diária — isso é sua proteção contra a imoralidade.","A Palavra é um \"guião\" para a vida — estude-a como guia, não apenas como literatura."],
  ["A pergunta do verso 9 pressupõe desejo de pureza — e se o desejo não existe?","A Palavra de Deus é suficiente para purificar, ou precisa de outros meios?","Que papel a comunidade cristã tem no processo de purificação do jovem?"],
  ["Jr 17:14","Mt 5:8","1 Pd 1:22"]
);

addVS(119, 105,
  "Lâmpada para os meus pés é a tua palavra — iluminação divina",
  "Esta é talvez a declaração mais conhecida sobre a Bíblia. A \"lâmpada\" (ner) era uma lâmpada de óleo — não iluminava toda a sala, mas apenas os próximos passos. Assim, a Palavra de Deus não revela o futuro todo, mas guia o próximo passo.",
  "O verso 105 é a resposta à pergunta do verso 9. A Palavra não é um farol que ilumina toda a vida de uma vez — é lâmpada que ilumina o caminho passo a passo. A \"luz\" (or) é a mesma usada na criação (Gn 1:3) — Deus ilumina a escuridão com Sua Palavra.",
  "Jesus se autodenomina \"a Luz do mundo\" (Jo 8:12) — Ele é a Palavra viva que ilumina (Jo 1:1-4). A Bíblia é lâmpada porque aponta para Cristo. Assim como uma lâmpada não é a luz, mas a conduz, a Escritura conduz à verdade viva.",
  ["Use a Bíblia como guia diário, não apenas como livro devocional — deixe-a iluminar suas decisões.","A lâmpada ilumina apenas os próximos passos — confie que Deus mostrará o caminho, mesmo sem mostrar o destino.","A Palavra é \"lâmpada\" e \"luz\" — dupla função: guia prático e revelação de Deus."],
  ["A Palavra é \"lâmpada\" e não \"farol\" — qual a diferença?","Como a Palavra ilumina decisões práticas e não apenas verdades abstratas?","A relação entre a Bíblia como \"lâmpada\" e Cristo como \"Luz do mundo\"."],
  ["Jo 8:12","Jo 1:1-4","Sl 19:8"]
);

addVS(121, 1,
  "Levanto os meus olhos para os montes — de onde vem o socorro",
  "O Salmo 121 é um \"cântico de subida\" (shir hama'aloth), cantado por peregrinos a caminho de Jerusalém para as festividades. Os \"montes\" podem representar os lugares altos pagãos ou as montanhas perigosas da Judeia.",
  "O Salmo 121 é o mais conhecido dos Cânticos de Subida. A estrutura em pares: pergunta e resposta (v.1-2), proteção diurna (v.3-4), proteção permanente (v.5-6), proteção total (v.7-8).",
  "A resposta é imediata: \"O meu socorro vem do Senhor\". Os montes não salvam — apenas o Criador dos montes tem poder de socorro.",
  ["Quando as coisas parecerem perigosas, olhe para o Criador, não para as criaturas.","A oração \"de onde vem o meu socorro?\" é a primeira pergunta de fé: reconhecer a necessidade de Deus.","Confie que o Criador dos montes tem poder sobre qualquer \"montanha\" na sua vida."],
  ["A pergunta do verso 1 é de dúvida ou de fé?","Os \"montes\" representam perigos ou falsos deuses?","Como a primeira pergunta do salmo prepara a resposta no verso 2?"],
  ["Dt 12:2-4","Mt 6:25-34","Is 40:31"]
);

addVS(121, 3,
  "Não dará ao teu pé tropeço — proteção diária e contínua",
  "A promessa de que Deus não permite \"tropeço\" (mattot) é de proteção no caminho cotidiano, não apenas em grandes crises. O \"dormir\" e \"adormecer\" (v.3-4) indicam que a proteção divina continua mesmo quando o crente está inconsciente — Deus não dorme.",
  "A proteção de Deus é \"contínua\" (yamiym valaila) — dia e noite. Não há férias divinas. Assim como Deus sustenta o universo continuamente (Cl 1:17), Ele cuida do crente em cada momento.",
  "A declaração \"o teu guardador não dormirá\" (v.3) é uma antropomorfia poderosa: o Deus que não precisa descansar escolhe não dormir para proteger Seu povo.",
  ["Descanse sabendo que Deus não dorme mesmo quando você dorme.","A proteção de Deus é 24 horas — não precisa de \"alarmes\" extras.","Confie que Deus cuida dos detalhes — mesmo dos \"tropeços\" pequenos."],
  ["A proteção divina anula a responsabilidade humana de cuidar de si?","Como \"Deus não dorme\" se relaciona com a onipresença de Deus?","Que conforto a proteção \"dia e noite\" traz para quem sofre de insônia ou ansiedade noturna?"],
  ["Sl 127:1-2","Mc 4:38","Cl 1:17"]
);

addVS(127, 1,
  "Se o Senhor não edificar a casa — a futilidade do esforço sem Deus",
  "Salomão, filho de Davi e autor de Provérbios e Eclesiastes, escreveu este salmo sapiencial que reflete sua experiência com projetos grandiosos (templo, palácio). A \"casa\" pode ser literal (construção) ou figurativa (família, legado).",
  "O Salmo 127 é um dos três Cânticos de Subida de Salomão (junto com Sl 122, 134). A estrutura: esforço vã sem Deus (v.1-2), filhos como bênção (v.3-5). O verso 1 é uma das mais poderosas declarações sobre dependência divina na Bíblia.",
  "O \"em vão\" (shav) significa \"vazio\", \"fútil\", \"sem sentido\". Não se trata de não trabalhar, mas de trabalhar sem Deus como fundamento. Assim como Edom construiu na rocha (Jr 49:16), o crente deve construir sobre a rocha de Cristo (Mt 7:24-27).",
  ["Antes de qualquer grande projeto, pergunte: \"Estou construindo com Deus ou sem Ele?\"","A dependência de Deus não elimina o trabalho — ele o enriquece com propósito.","Reconheça que o descanso (v.2) é dom de Deus — não é preguiça."],
  ["A exortação \"em vão vos levantais de madrugada\" é contra o trabalho duro ou contra a falta de fé?","Como equilibrar dependência de Deus com responsabilidade humana?","O que significa \"construir a casa\" para um cristão hoje?"],
  ["Mt 7:24-27","Gn 2:2","Mt 6:25-34"]
);

addVS(127, 3,
  "Eis que a herança do Senhor são os filhos — bênção familiar",
  "A declaração de que os filhos são \"herança\" (nachalah) e \"fruto do ventre\" (pri-habeten) é uma das mais belas sobre a família na Bíblia. No contexto antigo, os filhos eram bênção material (trabalho) e espiritual (continuação da linhagem).",
  "O verso 3-5 celebra a família como dádiva divina. A metáfora das \"setas na mão do valente\" (v.4) descreve filhos como instrumentos de influência e impacto. Assim como o guerreiro tem poder com suas setas, o pai tem poder espiritual através de seus filhos.",
  "A visão bíblica da família é de bênção, não de fardo. Assim como Deus criou a família no Éden (Gn 2:24), Ele a sustenta e abençoa. Os filhos são \"herança\" porque representam o futuro, a continuidade, e o impacto do legado familiar.",
  ["Valorize seus filhos como herança divina — não como fardos ou extensões de seus próprios desejos.","Reconheça que a influência espiritual dos pais sobre os filhos é mais poderosa que qualquer herança material.","Ore pela educação e proteção dos filhos — eles são \"setas\" que Deus usará."],
  ["A herança dos filhos é condicional à fé dos pais?","Como os filhos são \"setas\" na mão de Deus?","Que implicações a declaração de que filhos são \"herança\" tem para a sociedade contemporânea?"],
  ["Gn 2:24","Dt 6:6-9","Pv 22:6"]
);

addVS(139, 1,
  "Examinaste-me e me conheces — conhecimento divino perfeito",
  "Dav escreveu este salmo de meditação sobre a omnipresença e onisciência de Deus. A expressão \"me examinaste\" (chaqarta) é a mesma usada para exploração geográfica — Deus explorou cada detalhe do ser humano.",
  "O Salmo 139 é uma meditação em quatro partes: onisciência (v.1-6), omnipresença (v.7-12), criação (v.13-18), oração final (v.19-24). A estrutura revela um Deus que está ao mesmo tempo transcendente e íntimo — a maior paradoxo da fé.",
  "O conhecimento de Deus é completo: \"sabes quando me sento e quando me levanto\" (v.2). Não há pensamento, palavra ou ação que Lhe seja oculto. Isso não é assustador — é reconfortante. Deus conhece a fundo e ainda assim ama incondicionalmente (Rm 8:38-39).",
  ["Reconheça que Deus o conhece completamente — isso traz segurança, não medo.","Não há necessidade de \"fingir\" diante de Deus — Ele já sabe tudo.","Use isso como base para uma oração honesta e transparente."],
  ["A onisciência de Deus é reconfortante ou ameaçadora?","Por que Davi afirma que Deus o \"sabe\" antes mesmo de ele falar?","Como o conhecimento completo de Deus se relaciona com o amor incondicional?"],
  ["Rm 8:38-39","1 Jo 3:19-20","Jr 1:5"]
);

addVS(139, 7,
  "Para onde meirei do teu espírito? — a impossibilidade de fugir",
  "A pergunta retórica de Davi é uma das mais poéticas sobre a omnipresença. O \"espírito\" (ruach) aqui pode ser o Espírito de Deus ou o sopro vital divino.",
  "O verso 7-12 descreve a omnipresença de Deus em termos geográficos: céus, Sheol, alvorada, ocaso, extremidades da terra, abismo. Nenhum lugar escapa da presença divina.",
  "Jesus ensinou: \"Onde estiverem dois ou três reunidos em meu nome, ali estou no meio deles\" (Mt 18:20). A presença de Deus não depende de local sagrado — Ele está em todo lugar.",
  ["Não existe \"esconderijo\" da presença de Deus — use isso para transparência, não para medo.","A omnipresença é o maior consolo no sofrimento: Deus está presente até no inferno.","Reconheça que Deus está presente mesmo onde você não O vê — isso fortalece a fé."],
  ["A omnipresença de Deus é um conforto ou uma invasão de privacidade?","Como a presença de Deus no \"Sheol\" (mundo dos mortos) se relaciona com a salvação?","Que implicações a omnipresença tem para a ética e a moralidade?"],
  ["Mt 18:20","Rm 8:38-39","At 17:27-28"]
);

addVS(139, 14,
  "Eu te agradeço, porque de um modo assombroso, e tão maravilhoso fui feito — reverência pela criação",
  "A expressão \"de um modo assombroso\" (nora) significa \"terrível\", \"impressionante\", \"maravilhoso\". Davi reconhece que a criação humana é uma obra-prima sobrenatural.",
  "O verso 14-15 descreve o mistério da formação fetal: \"no mais profundo da terra\" (btemunah) pode referir-se ao útero materno ou ao plasma primordial. Davi reconhece que Deus o tecceu \"nas entranhas de minha mãe\" — um conhecimento que antecipa a embriologia moderna.",
  "A declaração de que somos \"maravilhosamente feitos\" é a base bíblica da dignidade humana.",
  ["Agradeça a Deus pelo milagre de sua existência — você não é acidente, é obra-prima.","Reconheça que todo ser humano, independente de condição, é \"maravilhosamente feito\".","A criação humana é um mistério que gera reverência, não explicação completa."],
  ["Como a consciência de ser \"maravilhosamente feito\" afeta a autoestima?","A \"formação nas entranhas\" se refere ao desenvolvimento fetal ou à criação cósmica?","Que implicações éticas a declaração de que toda vida é \"maravilhosa\" traz?"],
  ["Gn 1:27","Ec 11:5","Jr 1:5"]
);

addVS(139, 23,
  "Examina-me, ó Deus, e reconhece o meu coração — oração de transparência",
  "A oração final do salmo é ousada: Davi pede que Deus o examine e teste seus pensamentos. A expressão \"conhece o meu coração\" (da' libbi) é o pedido do oposto do verso 1 — agora é voluntário, não forçado.",
  "O verso 23-24 é a resposta lógica ao conhecimento divino: se Deus sabe tudo, é melhor pedir que Ele revele o que está oculto. A oração é de humildade: \"ve se há em mim caminho de mágoa\".",
  "A oração de transparência é a mais ousada: \"Deus, mostre-me o que eu não quero ver\". Isso requer coragem e fé.",
  ["Ore esta oração com honestidade: \"Deus, examina meu coração e mostra-me o que precisa mudar.\"","A transparência total com Deus é o caminho para a liberdade interior.","Aceite que Deus pode mostrar coisas desconfortáveis — isso é graça, não condenação."],
  ["A oração por autoconhecimento é perigosa?","Como o \"exame\" divino se relaciona com a confissão de pecados?","Que \"caminhos de mágoa\" Deus pode revelar em uma vida?"],
  ["Jr 17:10","Lm 3:40","1 Co 11:28"]
);

addVS(145, 1,
  "Exaltarei o teu nome, ó meu Rei — louvor pessoal",
  "O Salmo 145 é o único salmo de Davi com a inscrição \"Salmo de louvor\" (tehillah). É um acrostico perfeito (22 estrofes, cada uma com letra do alfabeto) que serve como resumo do louvor de todo o Saltério.",
  "O Salmo 145 é um resumo temático do Saltério: louvor pessoal (v.1-2), grandiosidade de Deus (v.3-7), bondade (v.8-9), justiça (v.10-16), proximidade (v.17-20), fidelidade (v.21).",
  "A declaração \"exaltarei o teu nome\" (arimah shimcha) é um ato de vontade: Davi escolhe louvar. O \"nome\" de Deus é Seu caráter revelado — louvar o nome é reconhecer Sua natureza. \"Todo dia\" (bethol-yom) indica disciplina diária.",
  ["Estabeleça um hábito de louvor diário — não dependa de sentimentos para adorar.","Reconheça que o louvor é um privilégio — você pode falar com o Rei do universo.","Reflita sobre os atributos de Deus: quais você mais precisa hoje?"],
  ["Por que este salmo é um acrostico perfeito?","O louvor diário é disciplina ou sentimento?","Quais atributos de Deus são mais relevantes para sua situação atual?"],
  ["Sl 146-150","Mt 6:9-13","Ap 4:8-11"]
);

addVS(145, 8,
  "Misericordioso e piedoso é o Senhor — a natureza revelada",
  "Este verso repete a declaração de Salmo 103:8 — a descrição mais completa do caráter de Deus no Antigo Testamento. A repetição não é acidental: o Louvor de Davi quer enfatizar que a natureza de Deus é misericordiosa e piedosa como fundamento de todo o Seu agir.",
  "Os atributos descritos aqui — misericórdia, piedade, longanimidade, grande em bondade — formam o \"perfil\" do Deus bíblico. Não é um deus distante e frio, mas um Deus que se importa visceralmente com sua criação.",
  "Jesus demonstrou essa natureza em Sua vida terrestre — curando enfermos, perdoando pecadores, comendo com publicanos.",
  ["Reconheça que a misericórdia de Deus é o fundamento de tudo o que Ele faz.","Permita que a misericórdia de Deus transforme a forma como você trata os outros.","Reflita sobre como Deus tem sido misericordioso com você — isso gera gratidão."],
  ["Os atributos de Deus são compatíveis entre si? Misericórdia e justiça podem coexistir?","Como Jesus demonstrou a misericórdia divina em Sua terra?","Que implicações a misericórdia de Deus tem para o julgamento final?"],
  ["Êx 34:6","Rm 2:4","Mt 9:13"]
);

addVS(145, 17,
  "Justo é o Senhor em todos os seus caminhos — justiça e bondade",
  "O verso 17 completa a descrição do caráter de Deus: Ele é justo em tudo que faz. A justiça divina não é arbitrária — é perfeita, santa e amorosa.",
  "A justiça de Deus é o reverso da Sua misericórdia: enquanto a misericórdia não dá o que é merecido, a justiça dá o que é certo. Ambos são perfeitos em Deus.",
  "A justiça de Deus se cumpre na cruz: ali, a justiça e a misericórdia se encontram perfeitamente. Cristo pagou o que a justiça exigia, para que a misericórdia pudesse ser dada.",
  ["Reconheça que a justiça de Deus não é ameaça — é garantia de que o mal será punido e o bem recompensado.","Confie que Deus fará justiça mesmo quando a humanidade não a faz.","Permita que a justiça de Deus guie suas próprias decisões éticas."],
  ["Como a justiça e a misericórdia de Deus se harmonizam na cruz?","A justiça divina é compatível com o perdão de pecados?","Que conforto a justiça de Deus traz para as vítimas de injustiça?"],
  ["Rm 3:25-26","Is 30:18","1 Jo 1:9"]
);

addVS(147, 3,
  "Ele sara os quebrantados de coração — restauração divina",
  "Este verso é uma das mais ternas declarações de Deus como médico da alma. \"Quebrantados de coração\" (nishbaré-leb) descreve pessoas com espíritos destroçados por sofrimento, pecado ou perda.",
  "O Salmo 147 celebra a soberania de Deus na criação (v.1-6) e na provisão (v.7-20). O verso 3 é o coração pastoral do salmo: Deus não apenas governa o universo — Ele cura os corações feridos.",
  "A mesma imagem aparece em Salmo 147:11: \"O Senhor se deleita nos que nele esperam, nos que esperam na sua misericórdia\". A cura divina é um ato de misericórdia, não merecimento.",
  ["Se seu coração está quebrantado, saiba que Deus é o médico que pode restaurá-lo.","A cura divina não é instantânea — às vezes requer processo, mas sempre é completa.","Permita que Deus sara suas feridas emocionais — não as esconda ou as negue."],
  ["A cura de Deus é apenas espiritual ou também emocional e psicológica?","Como a \"quebra\" do coração pode ser o início da restauração?","Que papel a comunidade cristã tem no processo de cura dos quebrantados?"],
  ["Is 61:1","Lc 4:18","Mt 11:28-30"]
);

addVS(147, 11,
  "O Senhor se deleita nos que nele esperam — o prazer de Deus",
  "O verbo \"deleitar\" (ratsah) indica prazer, satisfação, aceitação. Deus não apenas tolera — Ele se deleita naqueles que Nele esperam. A \"esperança\" (yachal) é confiança ativa, não passividade.",
  "A declaração de que Deus \"se deleita\" nos que O buscam é uma das mais encorajadoras da Bíblia. O Criador do universo encontra prazer em relacionamento com criaturas finitas.",
  "A \"esperança na sua misericórdia\" (v.11) é a base da confiança cristã. Não esperamos em nossos méritos, mas na misericórdia de Deus — que é infinita e nunca se esgota.",
  ["Busque Deus não por dever, mas por prazer — Ele se deleita em você.","A esperança em Deus não é passiva — é confiança ativa que transforma o viver diário.","Reconheça que sua esperança não é em si mesmo, mas na misericórdia de Deus — isso humilha e liberta."],
  ["O prazer de Deus nos seus filhos é condicional ou incondicional?","A \"esperança\" bíblica se diferencia do otimismo? Como?","Que significa, na prática, \"esperar na misericórdia de Deus\"?"],
  ["Sl 149:4","Fp 4:4","Rm 8:28"]
);

addVS(150, 1,
  "Louvai ao Deus da nossa salvação — louvor no Santuário",
  "O Salmo 150 é a coroação do Saltério — o hino final que resume todo o Livro V (Salmos 107-150). A referência ao \"santuário\" (miqdash) pode ser o templo terrestre ou a morada celestial.",
  "O Salmo 150 é o mais exuberante e universal de todos os salmos. A estrutura: onde louvar (v.1 — no santuário), por que louvar (v.1 — pelos atos poderosos), como louvar (v.3-5 — com todo instrumento), quem deve louvar (v.6 — tudo o que tem fôlego).",
  "O convite à adoração é limitado apenas pela imaginação: trombeta, harpa, tamborim, dança, instrumentos de cordas, flauta, pratos. A adoração deve ser a mais rica e variada possível.",
  ["Adore com exuberância — a adoração não deve ser monótona ou repetitiva.","Use os recursos que Deus lhe deu: voz, instrumentos, dança, arte — tudo para Sua glória.","Reconheça que a adoração é o destino final da criação — tudo existe para louvar a Deus."],
  ["Por que o Saltério termina com um hino de louvor exuberante?","A variedade de instrumentos sugere que a adoração deve ser culturalmente diversa?","Que relação existe entre o louvor e a \"salvação\" mencionada no verso 1?"],
  ["Sl 150:6","Ap 5:13","Ef 5:19"]
);

addVS(150, 6,
  "Tudo o que tem fôlego louve ao Senhor — o convite universal final",
  "Esta é a última frase do Saltério — e talvez a mais poderosa de toda a Escritura. \"Tudo o que tem fôlego\" (kol-haneshamah) inclui todo ser vivente: humanos, animais, toda criação.",
  "O convite final do Saltério é universal e incondicional: não há restrição de raça, idioma, condição ou espécie. Toda a criação foi feita para louvar ao Criador (Sl 19:1-4, Rm 8:21).",
  "A declaração \"louve ao Senhor\" (halelu-yah) é o refrão final que ecoa por todo o Saltério. É o ponto culminante de 150 salmos, 5 livros, e milênios de história da salvação.",
  ["Reconheça que você foi criado para louvar — isso é sua identidade, não apenas atividade.","O louvor não é opcional — é o destino de toda a criação. Participe desse coro universal.","Encare a vida como um constante \"louvalé\" — cada dia é uma oportunidade de adorar."],
  ["O que significa \"tudo o que tem fôlego\" — inclui animais e anjos?","A criação inteira louvará a Deus? Como isso se cumpre eternamente?","A última frase do Saltério é uma ordem ou um convite? Qual a diferença?"],
  ["Sl 19:1-4","Rm 8:21","Ap 5:13"]
);

export default registro;