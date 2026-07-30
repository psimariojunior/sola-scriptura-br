import { Curso } from './cursos';

export const CURSO_FUNDAMENTOS: Curso = {
  id: 'fundamentos-da-fe',
  título: 'Fundamentos da Fé Cristã',
  descrição: 'Os pilares fundamentais do cristianismo: salvação, graça, fé, arrependimento, trindade e a autoridade das Escrituras.',
  instrutor: 'Sola Scriptura',
  duração: '6 semanas',
  nível: 'intermediário',
  categoria: 'Teologia Sistemática',
  certificado: true,
  módulos: [
    {
      id: 'mod-evangelho',
      título: 'O Evangelho de Jesus Cristo',
      descrição: 'Entenda a mensagem central do cristianismo: quem é Deus, qual é o problema da humanidade e qual é a solução em Cristo.',
      ícone: '✝️',
      aulas: [
        {
          id: 'aula-1-1',
          título: 'A Natureza de Deus: Santidade, Amor e Justiça',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## A Natureza de Deus: Santidade, Amor e Justiça

Para entendermos o evangelho, precisamos primeiro entender quem é Deus. A Bíblia revela um Deus que é ao mesmo tempo santo, amor e justo — e essas qualidades não se contradizem, mas se harmonizam perfeitamente.

### A Santidade de Deus

A santidade é a qualidade moral suprema de Deus. Quando a Bíblia diz que Deus é santo, significa que Ele é completamente separado do pecado, puro em todas as suas perfeições.

> "Santo, santo, santo é o Senhor dos Exércitos; a terra toda está cheia da sua glória!" — Isaías 6:3

A tripla repetição de "santo" nas Escrituras (chamada de *trisagion*) indica que a santidade de Deus é a sua qualidade mais enfatizada. Os serafins não cantam "amor, amor, amor" ou "justiça, justiça, justiça" — cantam "santo, santo, santo". Isso mostra que, antes de qualquer outra coisa, Deus é absolutamente santo.

A santidade de Deus tem implicações práticas:
- **Ela nos convence do pecado** — diante da pureza de Deus, vimos nossa impureza (Isaías 6:5)
- **Ela nos dá temor reverente** — não medo paralisante, mas respeito profundo
- **Ela garante que Ele jamais tolerará o mal eternamente**

### O Amor de Deus

O amor de Deus não é um amor fraco ou sentimental. É um amor que se entrega, que busca o bem do objeto amado, mesmo a custo próprio.

> "Nisto conhecemos o amor, em que Jesus Cristo deu a sua vida por nós; assim também nós devemos dar a vida pelos irmãos." — 1 João 3:16

O amor de Deus se manifesta de várias formas:
- **Amor incondicional** — Ele nos ama não porque somos bons, mas porque Ele é bom (Romanos 5:8)
- **Amor que busca** — como o pai do filho pródigo, Deus corre ao encontro do pecador (Lucas 15:20)
- **Amor que sacrifica** — "De tal modo Deus amou o mundo que deu o seu Filho unigênito" (João 3:16)

### A Justiça de Deus

A justiça de Deus significa que Ele age sempre em retidão. Ele não pode simplesmente ignorar o pecado, porque isso seria injusto.

> "Justo és tu, ó Senhor, e reto são os teus julgamentos." — Salmo 119:137

Se um juiz humano visse um criminoso e dissesse "está tudo bem, eu te perdoo" sem nenhuma consequência, seria considerado um juiz corrupto. Da mesma forma, se Deus simplesmente ignorasse o pecado humano, Ele não seria justo — seria cúmplice.

### A Tensão que o Evangelho Resolve

Aqui está o dilema: Deus é santo (odeia o pecado), justo (deve punir o pecado) e amoroso (quer nos salvar). Como Ele resolve isso?

A resposta é a **cruz de Cristo**. Na cruz, a justiça de Deus foi satisfeita (o pecado foi punido) e o amor de Deus se manifestou (Deus pagou o preço Ele mesmo). A cruz não é contradição — é a solução perfeita.

> "Porque a justiça de Deus se revela no evangelho, de fé em fé, como está escrito: Mas o justo viverá pela fé." — Romanos 1:17

Estudar a natureza de Deus não é apenas teologia abstrata — é o fundamento de tudo o que cremos. Se Deus não fosse santo, não haveria padrão moral. Se não fosse justo, não haveria julgamento. Se não fosse amoroso, não haveria salvação.`,
          versículosChave: [
            { ref: 'Isaías 6:3', texto: 'Santo, santo, santo é o Senhor dos Exércitos; a terra toda está cheia da sua glória!' },
            { ref: 'João 3:16', texto: 'Porque Deus tanto amou o mundo que deu o seu Filho unigênito...' },
            { ref: 'Romanos 1:17', texto: 'Mas o justo viverá pela fé.' },
            { ref: '1 Pedro 1:15-16', texto: 'Sejam santos em tudo o que vocês fazem, porque está escrito: Sejam santos, porque eu sou santo.' },
          ],
        },
        {
          id: 'aula-1-2',
          título: 'O Problema do Pecado: Separação e Morte Espiritual',
          tipo: 'video',
          videoUrl: 'https://www.youtube.com/watch?v=2oe6ftQVoto',
          videoTítulo: 'Pecado, iniquidade e impiedade: Qual a diferença? - Moises Brasil',
          duração: '15 min',
          conteúdo: `## O Problema do Pecado: Separação e Morte Espiritual

A humanidade tem um problema sério — e esse problema é o pecado. Não se trata apenas de erros ocasionais ou más escolhas. O pecado é uma condição que afeta toda a nossa existência, nos separando de Deus e nos levando à morte espiritual.

### O que é pecado?

A Bíblia define pecado de várias formas:
- **Transgressão** — violação da lei de Deus (1 João 3:4)
- **Injustiça** — falta de conformidade com a justiça divina (1 João 5:17)
- **Errar o alvo** — o grego *hamartia* significa "errar o mark" (Romanos 3:23)
- **Rebeldia** — insistir nos próprios caminhos (Isaías 53:6)

O pecado não é apenas o que fazemos — é o que somos. A Bíblia ensina que todos nós nascemos com uma natureza pecaminosa. Davi reconheceu isso em Salmo 51:5: "Em pecado me concebeu minha mãe."

### A Queda: Gênesis 3

O pecado entrou no mundo através da desobediência de Adão e Eva no Jardim do Éden. Deus havia dado uma única proibição: "Não comereis da árvore do conhecimento do bem e do mal" (Gênesis 2:17).

A serpente (Satanás) veio com uma tentação que segue o mesmo padrão até hoje:
1. **Duvidar da palavra de Deus** — "É verdade que Deus disse...?"
2. **Negar a consequência** — "De modo nenhum morrereis"
3. **Desejar o proibido** — "viu que era boa aquela árvore"

O resultado foi devastador:
- **Separação de Deus** — Adão e Eva se esconderam e foram expulsos do jardim
- **Morte espiritual** — a comunhão direta com Deus foi cortada
- **Morte física** — introduzida como consequência (Gênesis 3:19)
- **Corrupção transmitida** — todos herdam a natureza pecaminosa (Romanos 5:12)

### As Consequências do Pecado

O pecado tem consequências devastadoras em diversas áreas:

**1. Separação de Deus**
> "Mas as vossas iniquidades fazem separação entre vós e o vosso Deus; os vossos pecados escondem a sua face de vós, para que não ouça." — Isaías 59:2

O pecado cria um abismo entre o homem santo e Deus. Não é Deus que se afasta — somos nós que nos afastamos ao pecar.

**2. Morte Espiritual**
> "Pois o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus, o nosso Senhor." — Romanos 6:23

A "morte" aqui não é apenas a morte física — é a morte da relação com Deus, a incapacidade espiritual de nos conectarmos ao Criador.

**3. Escravidão ao Pecado**
> "Todo aquele que pratica o pecado é escravo do pecado." — João 8:34

O pecado não é apenas um ato — é uma força que nos domina. O homem pecador não pode, por si mesmo, livrar-se do pecado. Ele é escravo.

**4. Julgamento eterno**
> "Está ordenado aos homens que moram uma só vez, e depois disto, o julgamento." — Hebreus 9:27

A consequência final do pecado, sem a intervenção divina, é o julgamento eterno.

### O Pecado Universal

> "Porque todos pecaram e estão destituídos da glória de Deus." — Romanos 3:23

Nenhum ser humano, exceto Jesus, viveu sem pecado. Não existe exceção. Mesmo as "melhores" pessoas pecam regularmente. Isso nos coloca todos na mesma condição: precisamos de um Salvador.

### Por que isso importa

Entender a gravidade do pecado é essencial para apreciar a grandeza da salvação. Quanto mais profundo é o poço, mais incrível é o resgate. O evangelho não faz sentido se não compreendermos primeiro o problema que ele resolve.`,
          versículosChave: [
            { ref: 'Romanos 3:23', texto: 'Porque todos pecaram e estão destituídos da glória de Deus.' },
            { ref: 'Romanos 6:23', texto: 'Pois o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna.' },
            { ref: 'Isaías 59:2', texto: 'Mas as vossas iniquidades fazem separação entre vós e o vosso Deus.' },
            { ref: 'Gênesis 3:15', texto: 'Porei inimizade entre ti e a mulher, entre a tua descendência e a descendência dela.' },
          ],
        },
        {
          id: 'aula-1-3',
          título: 'A Solução em Cristo: Substituição e Expição',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## A Solução em Cristo: Substituição e Expição

Se o problema da humanidade é o pecado com suas consequências de morte e separação, a solução não veio através de esforços humanos, religiões ou filosofias. A solução veio através de uma pessoa: Jesus Cristo.

### O que é Substituição?

O princípio de substituição é central no evangelho. Em vez de nós morrermos pelo nosso pecado, Jesus morreu em nosso lugar. Ele tomou sobre si o castigo que merecíamos.

> "Mas ele foi ferido por causa das nossas rebeliões, esmagado por causa das nossas iniquidades; o castigo que nos trazia a paz estava sobre ele, e pelas suas pisaduras fomos sarados." — Isaías 53:5

Isaías profetizou isso séculos antes de Jesus. O Messias seria ferido *por causa das nossas* rebeliões — não pelas dele. Ele seria esmagado *por causa das nossas* iniquidades — não pelas dele. A substituição é clara: ele pagou o que nós devíamos.

### O que é Expição?

A expiação é o ato de Jesus na cruz que satisfaz a justiça de Deus e remove a culpa do pecado. A palavra "expiar" significa "cobrir" ou "remover".

> "De fato, Cristo morreu uma vez por todas pelos pecados, o justo pelos injustos, para nos conduzir a Deus." — 1 Pedro 3:18

Essa passagem resume todo o evangelho:
- **Cristo morreu** — não foi acidente, foi propósito
- **Uma vez por todas** — o sacrifício é completo e suficiente
- **O justo pelos injustos** — substituição perfeita
- **Para nos conduzir a Deus** — o objetivo é restaurar o relacionamento

### Os Dois Aspectos da Cruz

A obra de Cristo na cruz tem dois aspectos complementares:

**1. Redenção** — Jesus nos comprou de volta da escravidão do pecado
> "Nele temos a redenção pelo seu sangue, o perdão dos pecados, de acordo com as riquezas da sua graça." — Efésios 1:7

Assim como um escravo era comprado para ser libertado, Jesus pagou o preço para nos libertar do pecado.

**2. Reconciliação** — Jesus restaurou a relação entre Deus e o homem
> "Pois Deus estava reconciliando consigo tudo em Cristo, não lhes imputando as suas transgressões." — 2 Coríntios 5:19

A reconciliação remove a inimizade. O que estava separado foi unido. O que estava distante foi aproximado.

### Por que não há outro caminho?

> "Jesus respondeu: Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai senão por mim." — João 14:6

Essa afirmação exclusivista de Jesus não é intolerância — é necessidade. Se o problema é o pecado, e se o salário do pecado é a morte, então apenas alguém que não pecou pode pagar esse salário. Apenas uma vida perfeita e sem pecado pode servir como substituta perfeita.

Nenhuma outra religião oferece um substituto. Em todas as outras, o homem tenta alcançar Deus através de obras, rituais ou méritos. No cristianismo, Deus desceu até o homem na pessoa de Jesus.

### A Resurreição: Prova da Vitória

> "E se Cristo não ressuscitou, é vã a vossa fé, e ainda estais nos vossos pecados." — 1 Coríntios 15:17

A ressurreição é a prova de que a obra de Jesus foi aceita por Deus. Se Ele tivesse morrido e permanecido no túmulo, seria mais um mártir. Mas Ele ressuscitou, vencendo a morte e demonstrando que seu sacrifício foi suficiente.

A cruz sem a ressurreição seria tragédia. A ressurreição transforma a cruz em vitória.`,
          versículosChave: [
            { ref: 'Isaías 53:5', texto: 'Mas ele foi ferido por causa das nossas rebeliões, esmagado por causa das nossas iniquidades.' },
            { ref: '1 Pedro 3:18', texto: 'Cristo morreu uma vez por todas pelos pecados, o justo pelos injustos.' },
            { ref: 'João 14:6', texto: 'Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai senão por mim.' },
            { ref: '1 Coríntios 15:3-4', texto: 'Cristo morreu por nossos pecados, foi sepultado e ressuscitou ao terceiro dia.' },
          ],
        },
        {
          id: 'aula-1-4',
          título: 'O que é Fé?',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: `## O que é Fé?

A fé é o pilar da vida cristã. Sem fé, é impossível agradar a Deus (Hebreus 11:6). Mas o que é fé biblicamente? Não é cega, não é irracional, não é apenas "sentir" algo. A fé bíblica tem conteúdo, fundamento e objeto.

### A Definição Bíblica de Fé

> "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos." — Hebreus 11:1

Essa definição revela três componentes essenciais:

**1. Certeza** — a fé não é duvidosa nem vacilante. É uma convicção firme. O grego *hypostasis* significa "base", "fundamento" ou "convicção". A fé é o fundamento sobre o qual construímos nossa vida.

**2. Esperança** — a fé se estende ao futuro. Ela espera algo que ainda não se realizou, mas que é prometido por Deus. Não é esperança no sentido de "tomara", mas de expectativa confiante baseada na fidelidade de Deus.

**3. Visibilidade** — a fé lida com realidades que não podemos ver com os olhos. Hebreus 11:3 diz que "pela fé entendemos que os mundos foram formados pela palavra de Deus". A fé enxerga além do visível.

### O Objeto da Fé: Em Quem Crer?

A fé não é um poder misterioso que "movemos" pelo pensamento positivo. A fé tem um objeto: Deus e sua palavra. A fé não é crer em algo "a qualquer custo" — é crer *em alguém*: Deus.

> "Sem é impossível agradar-lhe, porque é necessário que aquele que se aproxima de Deus creia que ele existe e que é galardoador dos que o buscam." — Hebreus 11:6

Para agradar a Deus, precisamos:
1. **Crer que Ele existe** — fé em sua existência
2. **Crer que Ele recompensa** — fé em sua bondade

### Exemplos de Fé no Antigo Testamento

O capítulo 11 de Hebreus é o "salão da fama da fé". Veja alguns exemplos:

**Abel** — ofereceu um sacrifício melhor que o de Caim, pela fé (Hebreus 11:4). Sua fé o levou a adorar corretamente.

**Noé** — construiu a arca quando Deus lhe disse, mesmo sem ver chuva (Hebreus 11:7). Sua fé o levou à obediência.

**Abraão** — saiu da sua terra sem saber para onde ia (Hebreus 11:8). Sua fé o levou a seguir a direção divina.

**Sara** — concebeu um filho na velhice, porque julgou fiel aquele que prometeu (Hebreus 11:11). Sua fé a levou a crer no impossível.

### Fé e Conhecimento

A fé bíblica não é contrária à razão. Paulo diz em Romanos 10:17: "A fé vem pelo ouvir, e o ouvir pela palavra de Deus." A fé nasce do conhecimento da Palavra.

Não é fé cega. É fé informada. Quando lemos as promessas de Deus e confiamos nelas, estamos exercendo fé. A fé é racional — tem motivo, tem fundamento, tem objeto.

### Fé em Ação

Tiago 2:17 diz: "Assim também a fé, se não tiver obras, é morta em si mesma." A fé verdadeira produz frutos. Não é uma fé teórica — é uma fé que se manifesta em obediência, amor e ação.

Abraão creu e saiu. Noé creu e construiu. Moisés creu e liderou. A fé sempre se move.`,
          versículosChave: [
            { ref: 'Hebreus 11:1', texto: 'A fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.' },
            { ref: 'Hebreus 11:6', texto: 'Sem é impossível agradar-lhe, porque é necessário que quem se aproxima de Deus creia que ele existe.' },
            { ref: 'Romanos 10:17', texto: 'Assim, a fé vem pelo ouvir, e o ouvir pela palavra de Cristo.' },
            { ref: 'Gênesis 15:6', texto: 'Ele creu no Senhor, que isso lhe foi imputado como justiça.' },
          ],
        },
        {
          id: 'aula-1-5',
          título: 'Fé versus Obras',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## Fé versus Obras

Uma das questões mais debatidas na história da igreja é: somos salvos pela fé ou pelas obras? A Bíblia é clara: somos salvos pela fé, não pelas obras. Mas isso não significa que as obras sejam desnecessárias.

### A Passagem Central: Efésios 2:8-9

> "Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie." — Efésios 2:8-9

Essa passagem é decisiva. Ela afirma claramente:

1. **A salvação vem pela graça** — é um dom gratuito de Deus
2. **A graça opera através da fé** — a fé é o meio pelo qual recebemos
3. **Não é das obras** — não é algo que conquistamos
4. **É dom de Deus** — para que ninguém se glorie

### Paulo em Romanos: Fé Sem Obras

> "Pois sustentamos que o homem é justificado pela fé, independentemente das obras da lei." — Romanos 3:28

Paulo usa Abraão como exemplo. Abraão foi declarado justo quando creu em Deus (Gênesis 15:6), antes de ser circuncidado (Gênesis 17) e antes de oferecer Isaac (Gênesis 22). A justificação veio pela fé, não pelas obras religiosas.

### Tiago e as Obras

Alguns pensam que Tiago contradiz Paulo. Tiago 2:24 diz: "O homem é justificado pelas obras e não somente pela fé." Mas não há contradição — estão falando de coisas diferentes.

**Paulo fala da justificação** — como somos declarados justos diante de Deus. Isso é pela fé.

**Tiago fala da vivificação** — como a fé se manifesta na vida. Uma fé sem obras é uma fé morta.

Tiago não está dizendo que as obras *produzem* salvação, mas que a salvação *produz* obras. Uma fé verdadeira sempre resulta em frutos.

### A Ordem Correta

A ordem bíblica é:
1. **Fé** em Cristo → 2. **Justificação** (declarado justo) → 3. **Obras** (fruto da nova vida)

As obras não são a *causa* da salvação, mas o *fruto* da salvação. Uma pessoa que realmente creu vai, inevitavelmente, produzir frutos de obediência e amor.

### O Equívoco do Legalismo

O legalismo é a ideia de que as obras humanas contribuem para a salvação. É uma tentativa de ganhar o favor de Deus através do esforço próprio. Paulo foi enfático contra isso:

> "Vocês que querem ser justificados pela lei se afastaram de Cristo; vocês caíram da graça." — Gálatas 5:4

O legalismo é perigoso porque:
- **Minimiza a graça** — se podemos "merecer", a graça não é necessária
- **Leva ao orgulho** — "olha o que eu fiz"
- **Não transforma** — a obediência por medo ou obrigação é superficial

### O Equívoco da Antinomia

A antinomia é o extremo oposto: a ideia de que, como somos salvos pela fé, as obras não importam. Também é perigosa:

> "O que dizem eles? Fiquemos pecando, para que a graça abunde? De jeito nenhum! Podemos nós, que morremos para o pecado, viver ainda nele?" — Romanos 6:1-2

Uma fé que não muda nada na vida é uma fé falsa. A verdadeira fé transforma. A graça não é licença para pecar — é poder para viver santamente.

### A Equação Perfeita

A fé é a raiz; a salvação é o tronco; as obras são os frutos. Não separamos fé de obras no sentido de que a fé verdadeira sempre produz obras. Mas a ordem é clara: primeiro fé, depois obras. A fé salva; as obras comprovam.`,
          versículosChave: [
            { ref: 'Efésios 2:8-9', texto: 'Pois pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.' },
            { ref: 'Romanos 3:28', texto: 'Sustentamos que o homem é justificado pela fé, independentemente das obras da lei.' },
            { ref: 'Tiago 2:17', texto: 'Assim também a fé, se não tiver obras, é morta em si mesma.' },
            { ref: 'Gálatas 2:16', texto: 'O homem não é justificado pelas obras da lei, mas pela fé em Jesus Cristo.' },
          ],
        },
        {
          id: 'aula-quiz-1',
          título: 'Quiz: O Evangelho de Jesus Cristo',
          tipo: 'quiz',
          duração: '10 min',
          perguntas: [
            {
              id: 'q1-1',
              pergunta: 'Qual das seguintes qualidades de Deus é enfatizada com a tripla repetição em Isaías 6:3?',
              opções: ['Amor', 'Justiça', 'Santidade', 'Misericórdia'],
              respostaCorreta: 2,
              explicação: 'Isaías 6:3 declara "Santo, santo, santo é o Senhor dos Exércitos". A tripla repetição (trisagion) enfatiza que a santidade é a qualidade suprema e mais enfatizada de Deus nas Escrituras.',
            },
            {
              id: 'q1-2',
              pergunta: 'De acordo com Romanos 3:23, qual é a condição da humanidade?',
              opções: ['Todos são naturalmente bons', 'Todos pecaram e estão destituídos da glória de Deus', 'Apenas alguns pecaram', 'O pecado é apenas um erro de julgamento'],
              respostaCorreta: 1,
              explicação: 'Romanos 3:23 afirma que "todos pecaram e estão destituídos da glória de Deus". Isso inclui toda a humanidade, sem exceção.',
            },
            {
              id: 'q1-3',
              pergunta: 'Qual profeta do Antigo Testamento descreveu o Messias como "ferido por nossas rebeliões"?',
              opções: ['Jeremias', 'Isaías', 'Daniel', 'Ezequiel'],
              respostaCorreta: 1,
              explicação: 'Isaías 53:5 profetiza que "ele foi ferido por causa das nossas rebeliões, esmagado por causa das nossas iniquidades". Essa é uma das profecias messiânicas mais claras.',
            },
            {
              id: 'q1-4',
              pergunta: 'O que significa a palavra grega "hamartia" usada para pecado?',
              opções: ['Rebelião', 'Errar o alvo', 'Injustiça', 'Ingratidão'],
              respostaCorreta: 1,
              explicação: 'Hamartia (ἁμαρτία) significa literalmente "errar o alvo". Indica que o pecado é uma falha em atingir o padrão perfeito de Deus.',
            },
            {
              id: 'q1-5',
              pergunta: 'Segundo Hebreus 11:1, quais são os três componentes da fé?',
              opções: ['Amor, alegria e paz', 'Certeza, esperança e prova do invisível', 'Oração, jejum e evangelismo', 'Leitura, estudo e meditação'],
              respostaCorreta: 1,
              explicação: 'Hebreus 11:1 define a fé como "a certeza daquilo que esperamos e a prova das coisas que não vemos". Fé envolve convicção, expectativa e percepção do invisível.',
            },
            {
              id: 'q1-6',
              pergunta: 'Em Efésios 2:8-9, qual é a fonte da salvação?',
              opções: ['Nossas boas obras', 'A graça de Deus pela fé', 'Nosso arrependimento', 'A obediência à lei'],
              respostaCorreta: 1,
              explicação: 'Efésios 2:8-9 declara: "Pois pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus". A salvação é um dom, não algo que conquistamos.',
            },
            {
              id: 'q1-7',
              pergunta: 'Qual é a relação entre fé e obras, segundo a Bíblia?',
              opções: ['As obras produzem a salvação', 'A fé verdadeira produz obras como fruto', 'Fé e obras são a mesma coisa', 'As obras são desnecessárias para o crente'],
              respostaCorreta: 1,
              explicação: 'Tiago 2:17 ensina que a fé sem obras é morta. A fé verdadeira sempre produz frutos de obediência, mas as obras são resultado, não causa, da salvação.',
            },
            {
              id: 'q1-8',
              pergunta: 'O que Jesus declarou em João 14:6?',
              opções: ['Eu sou o caminho, a verdade e a vida', 'Eu sou a luz do mundo', 'Eu sou o pão da vida', 'Eu sou o bom pastor'],
              respostaCorreta: 0,
              explicação: 'Em João 14:6, Jesus declara: "Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai senão por mim". Essa afirmação estabelece a exclusividade de Cristo como único caminho de salvação.',
            },
            {
              id: 'q1-9',
              pergunta: 'Quem são os patriarcas mencionados como exemplos de fé no capítulo 11 de Hebreus?',
              opções: ['Pedro, Paulo e Tiago', 'Abel, Noé e Abraão', 'Davi, Salomão e Ezequias', 'José, Moisés e Josué'],
              respostaCorreta: 1,
              explicação: 'Hebreus 11 menciona Abel (fé na adoração), Noé (fé na obediência) e Abraão (fé na caminhada) como exemplos fundamentais de fé no AT.',
            },
            {
              id: 'q1-10',
              pergunta: 'Por que Deus não pode simplesmente ignorar o pecado?',
              opções: ['Ele não se importa', 'Porque é justo e deve punir o pecado', 'Porque é fraco', 'Porque os anjos não deixam'],
              respostaCorreta: 1,
              explicação: 'A justiça de Deus exige que o pecado seja punido. Se Ele ignorasse o pecado, não seria justo. A cruz resolve esse dilema: a justiça foi satisfeita e o amor se manifestou.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-salvacao',
      título: 'Salvação e Arrependimento',
      descrição: 'Aprofunde-se nos conceitos de arrependimento, graça, regeneração, justificação, santificação e segurança do crente.',
      ícone: '🙏',
      aulas: [
        {
          id: 'aula-2-1',
          título: 'O que é Arrependimento?',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## O que é Arrependimento?

O arrependimento é uma das palavras mais importantes do Novo Testamento. Muitas pessoas entendem arrependimento como "sentir culpa" ou "chorar pelos pecados". Mas o significado bíblico é muito mais profundo e transformador.

### O Significado Original

A palavra grega para arrependimento é *metanoia* (μετάνοια), que significa literalmente "mudança de mente". Mas não é apenas uma mudança intelectual — é uma mudança de mente que resulta em mudança de direção.

> "Arrependei-vos, pois, e tornai-vos, para que sejam apagados os vossos pecados, para que venham os tempos de refrigerio da presença do Senhor." — Atos 3:19

Essa passagem mostra dois elementos do arrependimento:
1. **Arrependimento** (*metanoeō*) — mudança de mente
2. **Conversão** (*epistrephō*) — mudança de direção (tornar-se)

### O que o Arrependimento NÃO é

É importante desfazer equívocos comuns:

**Não é apenas sentir culpa**
A culpa pode ser um componente emocional, mas o arrependimento é uma decisão da vontade. Uma pessoa pode sentir culpa sem se arrepender de verdade.

**Não é apenas chorar**
Judas chorou, mas não se arrependeu (Mateus 27:3-5). O choro pode ser por ser pego, não pelo pecado em si.

**Não é penitência**
Arrependimento não é "fazer algo para compensar" o pecado. Não éflagelar-se, jejuar como punição, ou obras de reparação. É mudança de direção.

**Não é emoção passageira**
O arrependimento verdadeiro produz mudança duradoura, não apenas um momento emocional.

### O que o Arrependimento É

**1. Reconhecimento do pecado**
Primeiro, precisamos reconhecer que pecamos. Sem esse reconhecimento, não há arrependimento.

> "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça." — 1 João 1:9

**2. Mudança de mentalidade**
A mente muda de "eu sei melhor" para "Deus sabe melhor". De "eu quero o meu caminho" para "eu quero o Seu caminho".

**3. Virar-se do pecado**
O arrependimento implica deixar o pecado. Não basta sentir culpa e continuar pecando. É preciso deixar a direção errada.

**4. Virar-se para Deus**
O arrependimento não é apenas deixar o pecado — é direcionar-se para Deus. É um movimento duplo: das costas para o pecado e o rosto para Deus.

### O Arrependimento na Bíblia

João Batista começou seu ministério com essa mensagem: "Arrependei-vos, porque é chegado o reino dos céus" (Mateus 3:2).

Jesus também começou seu ministério com a mesma mensagem: "Arrependei-vos, porque é chegado o reino dos céus" (Mateus 4:17).

Pedro, no dia de Pentecostes, pregou: "Arrependei-vos e cada um de vós seja batizado em nome de Jesus Cristo, para o perdão dos vossos pecados" (Atos 2:38).

O arrependimento é sempre a porta de entrada na vida cristã.

### Arrependimento: Uma Vez ou Continuamente?

O arrependimento inicial é aquele que nos leva à salvação. Mas o arrependimento continua sendo necessário na vida cristã. Não porque perdemos a salvação, mas porque continuamos pecando e precisamos constantemente nos voltar para Deus.

A vida cristã é um ciclo de queda, arrependimento e restauração. Deus não espera perfeição — espera um coração que se volta para Ele quando falha.`,
          versículosChave: [
            { ref: 'Atos 3:19', texto: 'Arrependei-vos, pois, e tornai-vos, para que sejam apagados os vossos pecados.' },
            { ref: 'Mateus 4:17', texto: 'Arrependei-vos, porque é chegado o reino dos céus.' },
            { ref: '1 João 1:9', texto: 'Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar.' },
            { ref: 'Atos 2:38', texto: 'Arrependei-vos e cada um de vós seja batizado em nome de Jesus Cristo.' },
          ],
        },
        {
          id: 'aula-2-2',
          título: 'A Graça de Deus: Injustificável e Transformadora',
          tipo: 'video',
          videoUrl: 'https://www.youtube.com/watch?v=OycTEfDjja4',
          videoTítulo: 'O que é a GRAÇA DE DEUS - Simples conceito - Moises Brasil',
          duração: '15 min',
          conteúdo: `## A Graça de Deus: Injustificável e Transformadora

A graça é o pilar da salvação cristã. Sem a graça, não há esperança. Mas o que é exatamente graça? E como ela funciona na vida do crente?

### Definição Bíblica de Graça

A graça pode ser definida como **a favor imerecido e inabitável de Deus**. É um amor que não é conquistado, não é merecido e não pode ser retribuído.

> "Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus." — Efésios 2:8

A graça é um **dom**. Um dom, por definição, não pode ser merecido. Se você trabalha pelo salário, não é graça — é pagamento. Se você recebe algo que não trabalhou, isso é graça.

### Os Três Sentidos da Graça

A teologia cristã reconhece três tipos principais de graça:

**1. Graça Comum (ou Graça Preservadora)**
É a graça que Deus concede a todos os seres humanos, crentes e não crentes. Ela inclui:
- A vida e o fôlego
- A chuva e o sol
- A consciência moral
- As leis naturais
- A contenção do mal

> "Ele faz raiar o seu sol sobre maus e bons e chove sobre justos e injustos." — Mateus 5:45

**2. Graça Regeneradora (ou Graça Eficiente)**
É a graça que opera no coração do eleito, trazendo-o à fé e ao arrependimento. É uma graça especial, irresistible, que muda a natureza do pecador.

> "Quando estávamos ainda mortos nos nossos pecados, Deus nos vivificou juntamente com Cristo — pela graça vocês foram salvos." — Efésios 2:5

Essa graça não é uma "oportunidade" que o homem pode aceitar ou rejeitar. É um poder que transforma a vontade do homem, fazendo-o querer e crer.

**3. Graça Sustentadora (ou Graça Santificadora)**
É a graça que sustenta o crente na vida cristã diária. É ela que nos dá forças para resistir ao pecado, perseverar nas dificuldades e crescer em santidade.

> "Minha graça é suficiente para você, pois o meu poder se aperfeiçoa na fraqueza." — 2 Coríntios 12:9

### A Graça não é Pretexto para Pecar

Paulo antecipou essa objeção em Romanos 6:1-2: "Pecaremos para que a graça abunde? De jeito nenhum!"

A graça verdadeira transforma. Uma pessoa que realmente compreendeu a graça de Deus não quer mais pecar — quer agradar ao Deus que a salvou. A graça não é licença para pecar; é poder para viver santamente.

### A Graça e a Lei

A graça não abroga a lei — ela a cumpre. Jesus disse: "Não penseis que eu vim revogar a Lei ou os Profetas; não vim revogar, mas cumprir" (Mateus 5:17).

A lei mostra o padrão de Deus. A graça nos dá poder para alcançar esse padrão. A lei diagnostica a doença; a graça aplica o remédio.

### A Graça é Injustificável

Uma das características mais impressionantes da graça é que ela não pode ser explicada em termos humanos. Por que Deus nos ama? Por que Ele nos salvou? Não há resposta satisfatória além de: "Deus é amor".

> "Mas Deus, sendo rico em misericórdia, pelo seu grande amor com que nos amou, também nos vivificou com Cristo." — Efésios 2:4-5

Não éramos dignos. Não fizéramos nada para merecer. E foi exatamente por isso que a graça opera — porque ela, por definição, não pode ser merecida.`,
          versículosChave: [
            { ref: 'Efésios 2:8-9', texto: 'Pois pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.' },
            { ref: '2 Coríntios 12:9', texto: 'Minha graça é suficiente para você, pois o meu poder se aperfeiçoa na fraqueza.' },
            { ref: 'Romanos 6:1-2', texto: 'Pecaremos para que a graça abunde? De jeito nenhum!' },
            { ref: 'Efésios 2:4-5', texto: 'Deus, sendo rico em misericórdia, pelo seu grande amor, nos vivificou com Cristo.' },
          ],
        },
        {
          id: 'aula-2-3',
          título: 'Regeneração e Justificação',
          tipo: 'video',
          videoUrl: 'https://www.youtube.com/watch?v=cWCBZTHQBOY',
          videoTítulo: 'Soteriologia - A doutrina da salvação - Curso Básico de Teologia - Moises Brasil',
          duração: '15 min',
          conteúdo: `## Regeneração e Justificação

Dois termos teológicos fundamentais para entender a salvação são regeneração e justificação. Embora estejam intimamente ligados, descrevem aspectos diferentes da obra salvadora de Deus.

### O que é Regeneração?

Regeneração é a obra do Espírito Santo que transforma a natureza do pecador, tornando-o uma "nova criatura". É o nascimento espiritual.

> "Jesus respondeu: Em verdade, em verdade te digo que aquele que não nascer de novo não pode ver o reino de Deus." — João 3:3

> "Se alguém está em Cristo, é nova criatura. As coisas antigas já passaram; eis que se fizeram novas todas as coisas." — 2 Coríntios 5:17

A regeneração implica:

**1. Mudança de natureza**
O pecador, que antes amava o pecado e odiava a Deus, passa a amar a Deus e odiar o pecado. Não é apenas mudança de comportamento — é mudança de natureza.

**2. Nascimento espiritual**
Assim como não participamos do nosso nascimento físico, também não participamos do nascimento espiritual. Deus age soberanamente sobre o coração.

**3. Iluminação espiritual**
O regenerado passa a ver as coisas espirituais com clareza. O que antes era loucura (1 Coríntios 2:14) agora faz sentido.

### O que é Justificação?

Justificação é o ato judicial de Deus pela qual Ele declara o pecador justo, com base na obra de Cristo.

> "Sendo, portanto, justificados pela fé, temos paz com Deus por meio de nosso Senhor Jesus Cristo." — Romanos 5:1

A justificação tem vários elementos:

**1. É um ato judicial**
A justificação não é uma experiência subjetiva — é um decreto divino. Deus, como juiz, declara o réu "justo" com base na obra de Cristo.

**2. É por fé, não por obras**
> "Mas, sendo justificados pela fé, independentemente das obras da lei, temos paz com Deus." — Romanos 5:1

Não somos justificados pelo que fazemos, mas pelo que Cristo fez por nós.

**3. É imediata e completa**
A justificação não é gradual. No momento em que cremos, somos declarados justos. Não somos "mais justos" depois de 30 anos de cristianismo — fomos justificados completamente no ato da fé.

**4. Inclui perdão e imputação**
- **Perdão** — as nossas dívidas são canceladas (Colossenses 2:14)
- **Imputação** — a justiça de Cristo é creditada a nós (2 Coríntios 5:21)

### A Diferença entre Regeneração e Justificação

| Regeneração | Justificação |
|---|---|
| É interna | É externa (judicial) |
| Transforma a natureza | Declara o status |
| É subjetiva (experiência) | É objetiva (decreto divino) |
| É pelo Espírito Santo | É pelo Pai, com base na obra do Filho |
| Produz santidade | Produz paz com Deus |

### A Ordem da Salvação (Ordo Salutis)

A ordem bíblica da salvação inclui:
1. **Eleição** — Deus escolhe (Efésios 1:4)
2. **Chamado** — Deus chama (Romanos 8:30)
3. **Regeneração** — Deus transforma (João 3:3)
4. **Fé** — O homem crê (Efésios 2:8)
5. **Justificação** — Deus declara justo (Romanos 5:1)
6. **Adoção** — Deus recebe como filho (Gálatas 4:5)
7. **Santificação** — Crescimento em santidade (1 Tessalonicenses 4:3)
8. **Glorificação** — Plena semelhança com Cristo (Romanos 8:30)

Tudo isso é obra de Deus, do início ao fim. O homem recebe por fé.`,
          versículosChave: [
            { ref: 'João 3:3', texto: 'Aquele que não nascer de novo não pode ver o reino de Deus.' },
            { ref: '2 Coríntios 5:17', texto: 'Se alguém está em Cristo, é nova criatura.' },
            { ref: 'Romanos 5:1', texto: 'Sendo justificados pela fé, temos paz com Deus.' },
            { ref: '2 Coríntios 5:21', texto: 'Deus o que não conheceu pecado fez pecado por nós, para que nele fôssemos feitos justiça de Deus.' },
          ],
        },
        {
          id: 'aula-2-4',
          título: 'Santificação Progressiva',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## Santificação Progressiva

Se a justificação é um ato pontual (o crente é declarado justo no momento da fé), a santificação é um processo contínuo. É a obra do Espírito Santo que nos transforma progressivamente à imagem de Cristo.

### Definição Bíblica

> "Porque esta é a vontade de Deus, a vossa santificação: que vos abstenhais da imoralidade sexual." — 1 Tessalonicenses 4:3

A santificação vem de *hagiasmos* (ἁγιασμός), que significa "ser feito santo" ou "separado para Deus". É um processo que se inicia na regeneração e se completa na glorificação.

### Santificação Posicional vs. Progressiva

**Santificação Posicional (instantânea)**
No momento da justificação, o crente é declarado santo. Essa é a nossa posição em Cristo.

> "Mas, nele, também vocês, que ouviram a palavra da verdade, o evangelho da vossa salvação, e nele também creram, selados com o Espírito Santo da promessa." — Efésios 1:13

Posicionalmente, somos santos. Mas experientialmente, ainda estamos sendo santificados.

**Santificação Progressiva (contínua)**
É o crescimento diário em santidade. É a luta contra o pecado, a obediência crescente, o fruto do Espírito se manifestando.

> "Mas o fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança." — Gálatas 5:22-23

### Como Acontece a Santificação

A santificação tem três componentes:

**1. Obra do Espírito Santo**
O Espírito Santo é o agente da santificação. Ele nos convence do pecado (João 16:8), nos guia à verdade (João 16:13) e produz frutos em nós (Gálatas 5:22-23).

**2. Cooperation humana**
Embora a santificação seja obra de Deus, nós cooperamos:
- Lendo a Palavra (Salmo 119:11)
- Oração constante (1 Tessalonicenses 5:17)
- Gemeledade cristã (Hebreus 10:24-25)
- Obediência ativa (João 14:15)

**3. Disciplina divina**
Deus nos disciplina para nosso crescimento:
> "Mas, se vocês não forem disciplinados por Deus, de quem todos participam, então vocês são bastardos, e não filhos." — Hebreus 12:8

### Os Inimigos da Santificação

- **O pecado indutivo** — pecados que nos desviam do caminho
- **O mundo** — valores e pressões da cultura (1 João 2:15-17)
- **A carne** — a natureza pecaminosa que ainda habita em nós (Romanos 7:15-20)
- **Satanás** — o adversário que nos tenta (1 Pedro 5:8)

### A Meta da Santificação

> "E sabemos que, para os que amam a Deus, todas as coisas contribuem para o bem, para os que são chamados segundo o seu propósito. Porque aos que de antemão conheceu, também os predestinou para serem conformes à imagem de seu Filho." — Romanos 8:28-29

A meta final da santificação é sermos conformados à imagem de Cristo. Esse processo se completa na glorificação, quando veremos Cristo face a face e seremos como Ele (1 João 3:2).

Enquanto estivermos neste mundo, a santificação é progressiva e imperfeita. Mas o Espírito Santo trabalha em nós, e Deus é fiel para completar a obra que começou (Filipenses 1:6).`,
          versículosChave: [
            { ref: '1 Tessalonicenses 4:3', texto: 'Esta é a vontade de Deus, a vossa santificação.' },
            { ref: 'Gálatas 5:22-23', texto: 'O fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé.' },
            { ref: 'Filipenses 1:6', texto: 'Deus, que começou em vós boa obra, a aperfeiçoará até ao dia de Cristo Jesus.' },
            { ref: 'Hebreus 12:14', texto: 'Buscai a paz com todos e a santificação, sem a qual ninguém verá o Senhor.' },
          ],
        },
        {
          id: 'aula-2-5',
          título: 'A Segurança do Crente',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## A Segurança do Crente

Uma das perguntas mais importantes que o cristão pode fazer é: "Posso perder a salvação?" A Bíblia ensina que o crente verdadeiro tem segurança eterna — não por seus méritos, mas pela fidelidade de Deus.

### A Promessa de Jesus

> "Eu lhes dou a vida eterna; elas jamais perecerão e ninguém as arrancará da minha mão. O meu Pai, que elas me deram, é maior do que todos; ninguém pode arrancá-las da mão do meu Pai." — João 10:28-29

Essa passagem é uma das mais fortes sobre a segurança do crente. Jesus afirma:

1. **"Nunca perecerão"** — a promessa é absoluta
2. **"Ninguém as arrancará da minha mão"** — proteção divina
3. **"O Pai é maior que todos"** — dupla garantia (Filho + Pai)

### Romanos 8: A Nada nos Separará

> "Porque estou certo de que, nem a morte, nem a vida, nem os anjos, nem os principados, nem os poderes, nem o presente, nem o porvir, nem a altura, nem a profundidade, nem alguma outra criatura nos poderá separar do amor de Deus, que está em Cristo Jesus nosso Senhor." — Romanos 8:38-39

Paulo lista todas as forças possíveis do universo e conclui: **nada** pode nos separar do amor de Deus em Cristo. Isso é uma garantia absoluta.

### A Obra de Cristo é Completa

Se a nossa salvação dependesse do nosso desempenho, não teríamos segurança. Mas a salvação depende da obra de Cristo — e a obra dele é perfeita e completa.

> "Pois, pela oferta de uma vez por todas, ele aperfeiçoou para sempre os que estão sendo santificados." — Hebreus 10:14

Jesus não começou uma obra que precisa ser completada por nós. Ele completou tudo. Nós recebemos os frutos pela fé.

### O Selamento do Espírito Santo

> "Em ele vocês também, depois que ouviram a palavra da verdade, o evangelho da vossa salvação, e nele creram, foram marcados com o selo do Espírito Santo da promessa." — Efésios 1:13

O selo do Espírito Santo é uma marca de propriedade e garantia. Assim como um selo no mundo antigo garantia a autenticidade de um documento, o Espírito Santo garante que pertencemos a Deus.

### A Intercessão de Cristo

> "Porque Cristo não entrou num santuário feito por mãos, que é uma cópia do verdadeiro, mas no próprio céu, para comparecer agora perante a face do nosso Deus em nosso favor." — Hebreus 9:24

> "Porque é também Cristo que vive nele; e, embora no corpo, vive pela fé no Filho de Deus, que me amou e a si mesmo se entregou por mim." — Gálatas 2:20

Jesus está no céu intercedendo por nós. Enquanto Satanás nos acusa (Apocalipse 12:10), Jesus defende (1 João 2:1).

### Por que Alguns Parecem Perder a Salvação?

Alguns dizem que viam cristãos que "caíram da fé". A Bíblia explica isso de duas formas:

**1. Eram falsos crentes**
> "Sairam de nós, mas não eram de nós; porque, se fossem de nós, teriam permanecido connosco." — 1 João 2:19

Apostasia revela que a pessoa nunca teve fé genuína.

**2. Falta de perseverança temporária**
Alguns podem se afastar temporariamente, mas Deus os traz de volta. A perseverança final é evidência de que a fé era genuína.

### A Segurança não é Motivo para Pecar

A segurança do crente não é licença para viver sem compromisso. A verdadeira compreensão da graça produz gratidão e obediência, não rebeldia. A segurança é fundamento para a obediência, não desculpa para o pecado.`,
          versículosChave: [
            { ref: 'João 10:28-29', texto: 'Ninguém as arrancará da minha mão. O meu Pai é maior que todos.' },
            { ref: 'Romanos 8:38-39', texto: 'Nada nos poderá separar do amor de Deus, que está em Cristo Jesus.' },
            { ref: 'Efésios 1:13', texto: 'Foram marcados com o selo do Espírito Santo da promessa.' },
            { ref: 'Filipenses 1:6', texto: 'Deus, que começou em vós boa obra, a aperfeiçoará até ao dia de Cristo Jesus.' },
          ],
        },
        {
          id: 'aula-quiz-2',
          título: 'Quiz: Salvação e Arrependimento',
          tipo: 'quiz',
          duração: '10 min',
          perguntas: [
            {
              id: 'q2-1',
              pergunta: 'O que significa a palavra grega "metanoia" usada para arrependimento?',
              opções: ['Sentir culpa profunda', 'Chorar pelos pecados', 'Mudança de mente', 'Penitência pública'],
              respostaCorreta: 2,
              explicação: 'Metanoia (μετάνοια) significa literalmente "mudança de mente". O arrependimento bíblico é uma mudança de mentalidade que resulta em mudança de direção.',
            },
            {
              id: 'q2-2',
              pergunta: 'Segundo Efésios 2:8, qual é a fonte da salvação?',
              opções: ['Nossas obras meritórias', 'A graça de Deus pela fé', 'O batismo em águas', 'A obediência à lei moral'],
              respostaCorreta: 1,
              explicação: 'Efésios 2:8 afirma: "Pois pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus".',
            },
            {
              id: 'q2-3',
              pergunta: 'O que a regeneração faz no crente?',
              opções: ['Perdoa os pecados passados', 'Transforma a natureza do pecador em nova criatura', 'Dá dons espirituais', 'Garante prosperidade material'],
              respostaCorreta: 1,
              explicação: 'Regeneração é a obra do Espírito Santo que transforma a natureza do pecador, tornando-o "nova criatura" (2 Coríntios 5:17).',
            },
            {
              id: 'q2-4',
              pergunta: 'Qual é a diferença entre justificação e santificação?',
              opções: ['São a mesma coisa', 'Justificação é pontual, santificação é progressiva', 'Justificação é gradual, santificação é instantânea', 'Santificação é por obras, justificação por fé'],
              respostaCorreta: 1,
              explicação: 'Justificação é um ato pontual (declarado justo), enquanto santificação é um processo contínuo (crescimento em santidade).',
            },
            {
              id: 'q2-5',
              pergunta: 'Segundo João 10:28-29, quem pode arrancar o crente da mão de Jesus?',
              opções: ['Satanás', 'O próprio crente', 'Ninguém', 'Anjos caídos'],
              respostaCorreta: 2,
              explicação: 'Jesus declara: "Ninguém as arrancará da minha mão". A segurança do crente é garantida pelo poder do Filho e do Pai.',
            },
            {
              id: 'q2-6',
              pergunta: 'Qual é o fruto do Espírito mencionado em Gálatas 5:22-23?',
              opções: ['Riqueza, poder e fama', 'Amor, gozo, paz e mais', 'Milagres, profecia e línguas', 'Sabedoria, entendimento e conselho'],
              respostaCorreta: 1,
              explicação: 'O fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão e temperança.',
            },
            {
              id: 'q2-7',
              pergunta: 'O que Romanos 8:38-39 afirma sobre o crente?',
              opções: ['Ele pode perder a salvação se pecar', 'Nada pode separá-lo do amor de Deus em Cristo', 'Ele precisa de boas obras para manter a salvação', 'A salvação depende do arrependimento contínuo'],
              respostaCorreta: 1,
              explicação: 'Paulo lista todas as forças do universo e conclui: "nada nos poderá separar do amor de Deus, que está em Cristo Jesus".',
            },
            {
              id: 'q2-8',
              pergunta: 'Por que algumas pessoas que "saíram da fé" nunca foram salvas?',
              opções: ['Deus as rejeitou', 'Eram falsos crentes, não eram de nós', 'A graça de Deus falhou', 'Elas não foram escolhidas'],
              respostaCorreta: 1,
              explicação: '1 João 2:19 diz: "Sairam de nós, mas não eram de nós; porque, se fossem de nós, teriam permanecido connosco".',
            },
            {
              id: 'q2-9',
              pergunta: 'O que é o selo do Espírito Santo?',
              opções: ['Um dom de cura', 'Uma marca de propriedade e garantia', 'Uma experiência emocional', 'Um conhecimento secreto'],
              respostaCorreta: 1,
              explicação: 'O selo do Espírito Santo (Efésios 1:13) é uma marca de propriedade e garantia de que pertencemos a Deus.',
            },
            {
              id: 'q2-10',
              pergunta: 'A santificação é obra de quem?',
              opções: ['Apenas do crente', 'Apenas do Espírito Santo', 'Do Espírito Santo em cooperação com o crente', 'Da igreja e do pastor'],
              respostaCorreta: 2,
              explicação: 'A santificação é obra do Espírito Santo (Gálatas 5:22-23) em cooperação com o crente que obedece, lê a Bíblia e ora.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-trindade',
      título: 'A Trindade',
      descrição: 'Estude o mistério central da fé cristã: um Deus em três pessoas — Pai, Filho e Espírito Santo.',
      ícone: '🔺',
      aulas: [
        {
          id: 'aula-3-1',
          título: 'Deus Pai: Criador e Soberano',
          tipo: 'video',
          videoUrl: 'https://www.youtube.com/watch?v=z31Tg-HJvQo',
          videoTítulo: 'Introdução e a revelação de Deus - Curso Gratuito de Teologia Trinitária - Moises Brasil',
          duração: '12 min',
          conteúdo: `## Deus Pai: Criador e Soberano

A primeira pessoa da Trindade é Deus Pai — o Criador de todas as coisas, o Soberano do universo, o Pai de todos os crentes.

### O Pai como Criador

> "No princípio, Deus criou os céus e a terra." — Gênesis 1:1

Deus Pai é a fonte primária de toda criação. Gênesis 1 nos mostra Deus falando e as coisas existindo. Sua palavra tem poder criador.

> "Pois, nele foram criadas todas as coisas que há nos céus e na terra, visíveis e invisíveis, sejam tronos, sejam dominações, sejam principados, sejam potestades. Tudo foi criado por meio dele e para ele." — Colossenses 1:16

A criação não foi acidente — foi propósito. Tudo foi criado por Cristo (a segunda pessoa) e para Cristo. O Pai é a origem, o Filho é o agente.

### A Soberania de Deus

A soberania de Deus significa que Ele tem controle absoluto sobre todas as coisas. Nada acontece fora do seu conhecimento ou permissão.

> "O Senhor reina; rejubile a terra; alegrem-se as muitas ilhas!" — Salmo 97:1

A soberania de Deus se manifesta em:
- **Criação** — Ele chamou tudo à existência
- **Providência** — Ele sustenta tudo (Colossenses 1:17)
- **História** — Ele governa os reinos humanos (Daniel 4:17)
- **Salvação** — Ele escolhe e chama os seus (Efésios 1:4-5)

### O Pai como Soberano na Salvação

> "Bendito seja o Deus e Pai de nosso Senhor Jesus Cristo, que nos abençoou com toda bênção espiritual nos lugares celestiais em Cristo. Nele nos escolheu, antes da fundação do mundo, para sermos santos e imaculados perante ele em amor." — Efésios 1:3-4

A soberania de Deus na salvação é um ensino bíblico claro. Antes da criação, Deus já havia escolhido os seus. Não por mérito humano, mas por sua vontade soberana.

### O Pai como Nosso Pai

Quando Jesus ensinou a oração, disse: "Pai nosso que estais nos céus" (Mateus 6:9). Deus não é apenas o Criador distante — é um Pai que se importa com os seus filhos.

> "Vede que geração de amor o Pai nos deu, para que sejamos chamados filhos de Deus; e o somos!" — 1 João 3:1

A adoção como filhos é um dom do Pai. Não nascemos filhos de Deus — somos adotados pela graça, através de Cristo.

### A Relação Pai-Filho

> "Deus, muito mais, não nos poupou a ele próprio, mas o entregou por todos nós, como não nos pouparia também, e nos dará todas as coisas com ele?" — Romanos 8:32

O Pai amou o mundo de tal forma que deu o seu Filho (João 3:16). Essa entrega não foi acidente — foi o eterno decreto de amor do Pai.`,
          versículosChave: [
            { ref: 'Gênesis 1:1', texto: 'No princípio, Deus criou os céus e a terra.' },
            { ref: 'Efésios 1:3-4', texto: 'Ele nos abençoou... Nele nos escolheu antes da fundação do mundo.' },
            { ref: 'Romanos 8:32', texto: 'Deus não o poupou, mas o entregou por todos nós.' },
            { ref: 'Mateus 6:9', texto: 'Pai nosso que estais nos céus.' },
          ],
        },
        {
          id: 'aula-3-2',
          título: 'Jesus Cristo: Deus e Homem — A Cristologia',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## Jesus Cristo: Deus e Homem — A Cristologia

A cristologia é o estudo da pessoa e obra de Jesus Cristo. A pergunta central é: quem é Jesus? A Bíblia responde: Ele é plenamente Deus e plenamente homem — a segunda pessoa da Trindade encarnada.

### Jesus é Deus

> "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus." — João 1:1

João começa seu evangelho afirmando a divindade de Jesus. O Verbo (Cristo) não é uma criatura — Ele é Deus.

> "E, sendo brilhantemente a expressão da sua substância e a representação exata da sua própria essência, e sustentando todas as coisas pela palavra do seu poder..." — Hebreus 1:3

Cristo é a "expressão da substância" de Deus. Não é Deus menor nem Deus diferente — é o mesmo Deus em pessoa.

**Jesus recebeu títulos divinos:**
- "Eu Sou" (João 8:58) — referência ao nome de Deus em Êxodo 3:14
- "Alfa e Omega" (Apocalipse 1:8) — o princípio e o fim
- "Senhor" (Romanos 10:9) — título reservado para Deus
- "Salvador" (Isaías 43:11 — aplicado a Jesus em Lucas 2:11)

**Jesus fez coisas que apenas Deus faz:**
- Perdoou pecados (Marcos 2:5-7) — os escribas reconheceram que isso era blasfêmia se não fosse Deus
- Aceitou adoração (Mateus 14:33) — os anjos rejeitam adoração (Apocalipse 22:8-9)
- Controlou a natureza (Marcos 4:39) — apenas Deus controla o mar
- Conhecia os pensamentos das pessoas (Mateus 9:4) — apenas Deus conhece o coração

### Jesus é Homem

> "E, sendo achado em forma de homem, humilhou-se a si mesmo, sendo obediente até a morte, e morte de cruz." — Filipenses 2:8

Jesus não era um deus aparecendo como homem. Era verdadeiramente humano:
- Nasceu de uma mulher (Gálatas 4:4)
- Cresceu e aprendeu (Lucas 2:52)
- Sentiu fome (Mateus 4:2)
- Sentiu cansaço (João 4:6)
- Sentiu tristeza (João 11:35)
- Sentiu dor (Mateus 27:46)
- Morreu (Mateus 27:50)

### A Natureza Duas de Cristo

A ortodoxia cristã (definida nos concílios de Niceia em 325 d.C. e Calcedônia em 451 d.C.) afirma que Jesus tem duas naturezas — divina e humana — perfeitamente unidas em uma pessoa, sem confusão, sem mudança, sem divisão, sem separação.

Isso significa que Jesus é:
- **Deus perfeito** — toda a plenitude da divindade habita nele (Colossenses 2:9)
- **Homem perfeito** — representante perfeito da humanidade (Hebreus 4:15)
- **Sem pecado** — a única pessoa que viveu sem pecado (2 Coríntios 5:21)

### A Obra de Cristo

A obra de Cristo pode ser resumida em três títulos proféticos:

**1. Profeta** — Ele revelou a verdade de Deus perfeitamente (Deuteronômio 18:15, João 6:14)

**2. Sacerdote** — Ele é o mediador entre Deus e os homens (Hebreus 4:14-15). Ele se ofereceu como sacrifício uma vez por todas (Hebreus 9:26-28).

**3. Rei** — Ele governará eternamente (Lucas 1:33, Apocalipse 19:16). Seu reino é espiritual agora, mas será literal na segunda vinda.

### A Exaltação de Cristo

> "Por isso, Deus o exaltou sobremaneira e lhe deu o nome que está acima de todo nome, para que, no nome de Jesus, se dobre todo joelho nos céus, na terra e debaixo da terra, e toda língua confesse que Jesus Cristo é o Senhor, para a glória de Deus Pai." — Filipenses 2:9-11

Após a morte e ressurreição, Jesus foi exaltado à destra do Pai. Todo joelho se dobrará perante Ele — universalmente, inevitavelmente.`,
          versículosChave: [
            { ref: 'João 1:1', texto: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
            { ref: 'Colossenses 2:9', texto: 'Nele habita corporalmente toda a plenitude da divindade.' },
            { ref: 'Filipenses 2:6-8', texto: 'Existindo em forma de Deus, não teve por usurpação ser igual a Deus, mas esvaziou-se a si mesmo.' },
            { ref: 'Hebreus 4:15', texto: 'Não temos um sumo sacerdote que não possa compadecer-se das nossas fraquezas.' },
          ],
        },
        {
          id: 'aula-3-3',
          título: 'O Espírito Santo: Nosso Consolador',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## O Espírito Santo: Nosso Consolador

O Espírito Santo é a terceira pessoa da Trindade — não uma força, não uma influência, mas uma Pessoa divina com mente, vontade e emoções.

### A Personalidade do Espírito Santo

O Espírito Santo é tratado como pessoa, não como força impersonal:

- **Ele fala** — "O Espírito vos dirá tudo o que vos disse" (João 16:13)
- **Ele guia** — "Quando vier o Espírito da verdade, ele vos guará a toda a verdade" (João 16:13)
- **Ele intercede** — "O Espírito mesmo intercede por nós com gemidos indizíveis" (Romanos 8:26)
- **Ele convence** — "Quando ele vier, convencerá o mundo do pecado" (João 16:8)
- **Ele é triste** — "Não entristeçais o Espírito Santo de Deus" (Efésios 4:30)

Uma força não pode ser entristecida, não pode falar, não pode guiar. Essas são ações de uma pessoa.

### A Divindade do Espírito Santo

O Espírito Santo é plenamente Deus:

> "Não tendes, porém, a vossa carne no domínio do pecado, porque o Espírito habita em vós." — Romanos 8:9

A presença do Espírito em nós é a presença de Deus em nós.

> "Sabes tu que és o templo de Deus e que o Espírito de Deus habita em vós?" — 1 Coríntios 3:16

O Espírito Santo é chamado de "Espírito de Deus" e "Espírito de Cristo" — expressões intercambiáveis que mostram a unidade das três pessoas.

### As Obras do Espírito Santo

**1. Regeneração**
> "Nascido do Espírito" — João 3:6

O Espírito Santo é quem nos faz nascer de novo. É Ele que transforma o coração endurecido em um coração de carne.

**2. Iluminação**
> "Quando, porém, vier o Espírito da verdade, ele vos guará a toda a verdade." — João 16:13

Sem o Espírito, não podemos entender as Escrituras. Ele é quem abre os nossos olhos para a verdade.

**3. Produção de frutos**
> "Mas o fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança." — Gálatas 5:22-23

O fruto do Espírito não é algo que produzimos com esforço — é o resultado natural de um vida conectada ao Espírito.

**4. Dons espirituais**
> "Mas a cada um é dada a manifestação do Espírito, para o que for útil." — 1 Coríntios 12:7

O Espírito distribui dons diferentes a diferentes pessoas para o benefício de todos.

**5. Selo e penhor**
> "Em ele vocês também, depois que ouviram a palavra da verdade, o evangelho da vossa salvação, e nele creram, foram marcados com o selo do Espírito Santo da promessa." — Efésios 1:13

O Espírito Santo é o selo de nossa salvação e o penhor (garantia) da nossa herança eterna.

### Preenchimento do Espírito

> "Não vos embriagueis com vinho, em que há dissolução, mas enchei-vos do Espírito." — Efésios 5:18

Ser cheio do Espírito não é uma experiência única — é uma realidade contínua. Significa estar sob a influência e controle do Espírito em todas as áreas da vida.

O preenchimento do Espírito se manifesta em:
- Louvor e adoração (Efésios 5:19)
- Ação de graças (Efésios 5:20)
- Submissão mútua (Efésios 5:21)
- Testemunho corajoso (Atos 4:31)
- Poder para servir (Atos 1:8)

### O Espírito e a Unidade da Igreja

> "Há um só corpo e um só Espírito." — Efésios 4:4

O Espírito Santo é o elo que une todos os crentes em Cristo. Embora estejamos em lugares diferentes, somos um pelo Espírito.`,
          versículosChave: [
            { ref: 'João 16:13', texto: 'Quando vier o Espírito da verdade, ele vos guará a toda a verdade.' },
            { ref: 'Romanos 8:26', texto: 'O Espírito mesmo intercede por nós com gemidos indizíveis.' },
            { ref: 'Gálatas 5:22-23', texto: 'O fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade.' },
            { ref: 'Efésios 5:18', texto: 'Enchei-vos do Espírito.' },
          ],
        },
        {
          id: 'aula-3-4',
          título: 'A Trindade na Bíblia',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## A Trindade na Bíblia

O termo "Trindade" não aparece na Bíblia, mas o ensino de que Deus é três pessoas em uma substância está claramente presente nas Escrituras. Vejamos as passagens-chave.

### A Fórmula Batismal

> "Portanto, ide, fazei discípulos de todas as nações, batizando-os em nome do Pai, do Filho e do Espírito Santo." — Mateus 28:19

Jesus ordenou que os discípulos batizassem "em nome" (singular) "do Pai, do Filho e do Espírito Santo" (três pessoas). A gramática é significativa:
- **Um nome** — indicando uma essência divina
- **Três pessoas** — Pai, Filho e Espírito Santo

Se fossem três deuses, seria "nos nomes" (plural). Se fosse apenas uma pessoa, não haveria distinção. A formulação pressupõe três pessoas e uma divindade.

### A Benedição Paulina

> "A graça do Senhor Jesus Cristo, e o amor de Deus, e a comunhão do Espírito Santo sejam todos vós." — 2 Coríntios 13:14

Paulo bênção a igreja mencionando três pessoas distintas:
- **Graça** do Senhor Jesus Cristo
- **Amor** de Deus (Pai)
- **Comunhão** do Espírito Santo

Três pessoas, uma bênção — a unidade se manifesta na bênção.

### O Batismo de Jesus

> "E, logo que Jesus foi batizado, subiu logo da água; e eis que se lhe abriram os céus, e viu o Espírito Santo descendo como pomba e vindo sobre ele; e eis que uma voz dos céus dizia: Este é o meu Filho amado, em quem me comprazo." — Mateus 3:16-17

Nesse evento, as três pessoas da Trindade estão presentes simultaneamente:
1. **O Filho** é batizado na água
2. **O Espírito Santo** desce como pomba
3. **O Pai** fala dos céus

### A Praga de 2 Coríntios

> "A graça do Senhor Jesus Cristo, o amor de Deus e a comunhão do Espírito Santo sejam com todos vocês." — 2 Coríntios 13:14

Essa é uma das passagens mais claras, apresentando as três pessoas com atributos distintos e uma comunhão unida.

### 1 Pedro 1:2

> "Conforme a presciência de Deus Pai, pela santificação do Espírito, para a obediência e aspersão do sangue de Jesus Cristo: Multiplique-se a graça e a paz."

Três agentes da salvação:
- **Deus Pai** — presciência (eleição)
- **Espírito Santo** — santificação
- **Jesus Cristo** — sangue (redenção)

### A Passagem mais Completa: Mateus 28:19 + 2 Coríntios 13:14

Essas duas passagens, juntas, dão o quadro mais completo:
- Mateus 28:19 — a fórmula (batismo)
- 2 Coríntios 13:14 — a bênção (comunhão)

Ambas mostram três pessoas distintas agindo em harmonia perfeita, sem hierarquia, sem subordinação — apenas unidade perfeita em propósito e essência.

### Como Entender a Trindade?

A Trindade é um mistério — não pode ser compreendido plenamente pela mente humana. Mas pode ser aceito pela fé. Analogias imperfeitas ajudam:

- **Água** — líquido, gelo, vapor. São três "formas" mas uma substância. (Mas isso sugere que Deus muda de forma, o que não é verdade.)
- **Sol** — o sol, a luz e o calor. Três efeitos distintos de uma fonte. (Mas isso sugere que o Filho e o Espírito são apenas "efeitos", o que também não é verdade.)

A melhor compreensão é aceitar o que a Bíblia ensina: Deus é um em essência, três em pessoa. Não é três deuses (triteísmo), não é uma pessoa mudando de forma (modalismo), não é três "partes" de Deus (tropicismo). É três pessoas plenas e distintas em uma única divindade.`,
          versículosChave: [
            { ref: 'Mateus 28:19', texto: 'Batizando-os em nome do Pai, do Filho e do Espírito Santo.' },
            { ref: '2 Coríntios 13:14', texto: 'A graça do Senhor Jesus Cristo, o amor de Deus e a comunhão do Espírito Santo.' },
            { ref: 'Mateus 3:16-17', texto: 'O Espírito desceu como pomba... e a voz do Pai disse: Este é o meu Filho amado.' },
            { ref: '1 Pedro 1:2', texto: 'Conforme a presciência de Deus Pai, pela santificação do Espírito, para a obediência de Jesus Cristo.' },
          ],
        },
        {
          id: 'aula-3-5',
          título: 'Mitos sobre a Trindade',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## Mitos sobre a Trindade

A Trindade é um dos ensinos mais incompreendidos do cristianismo. Muitos cristãos — e muitos não cristãos — têm ideias erradas sobre o que a Bíblia ensina. Vamos esclarecer os mitos mais comuns.

### Mito 1: "A Trindade significa três deuses"

**Errado.** A Trindade não é triteísmo (três deuses). A Bíblia é clara: há um só Deus.

> "Ouve, Israel: O Senhor, o nosso Deus, é o único Senhor." — Deuteronômio 6:4

> "Sabemos que um só é Deus." — 1 Coríntios 8:6

Há um Deus em três pessoas. As três pessoas compartilham a mesma essência divina. Não são três seres separados — são três manifestações de um mesmo Deus.

### Mito 2: "Jesus é Deus, mas não é o Pai"

**Parcialmente correto.** Jesus é uma pessoa distinta do Pai — isso é verdade. Mas a formulação pode sugerir que o Pai é "mais Deus" que o Filho, o que é falso.

> "Eu e o Pai somos um." — João 10:30

Jesus e o Pai são pessoas distintas, mas são um em essência, poder e natureza. O Filho é tão Deus quanto o Pai.

### Mito 3: "O Espírito Santo é apenas uma força ou energia"

**Errado.** O Espírito Santo é uma pessoa divina, não uma força impersonal.

- Ele tem mente (Romanos 8:27)
- Ele tem vontade (1 Coríntios 12:11)
- Ele pode ser entristecido (Efésios 4:30)
- Ele pode ser mentido (Atos 5:3-4)

Mentir para o Espírito Santo é mentir para Deus — isso mostra que Ele é Deus, não apenas uma força.

### Mito 4: "A Trindade é uma invenção da igreja medieval"

**Errado.** Embora o termo "Trindade" tenha sido usado pela primeira vez por Tertuliano (século III), o ensino está presente nas Escrituras desde o início.

- Mateus 28:19 (século I) — fórmula batismal
- 2 Coríntios 13:14 (século I) — bênção paulina
- 1 Pedro 1:2 (século I) — três agentes da salvação

A igreja primitiva não inventou a Trindade — ela reconheceu o que a Bíblia já ensinava.

### Mito 5: "Os muçulmanos e os cristãos adoram o mesmo Deus"

**Complexo.** Embora muçulmanos, cristãos e judeus se considerem "religiosos abraâmicas", há diferenças fundamentais:

- O Deus cristão é Trindade; o Deus muçulmano não é
- O Deus cristão tem um Filho unigênito; o Islã rejeita isso
- O Deus cristão se revelou em Jesus; o Islã nega a divindade de Jesus

Embora haja sobreposições (ambos são monoteístas, criadores, juízes), as diferenças são significativas.

### Mito 6: "A Trindade é confusa demais para entender"

**Parcialmente verdadeiro.** A Trindade é um mistério — não pode ser completamente compreendido pela mente humana. Mas pode ser aceito pela fé e compreendido em parte pela razão.

Paulo diz: "Ó profundidade das riquezas, tanto da sabedoria como do conhecimento de Deus! Quão insondáveis são os seus juízos, e quão indescritíveis os seus caminhos!" (Romanos 11:33).

Podemos entender o suficiente para crer, mesmo que não possamos entender tudo.

### Mito 7: "A Trindade divide Deus em três partes"

**Errado.** A Trindade não divide Deus em três partes. Cada pessoa da Trindade é plenamente Deus. Não há "terços" de Deus.

O Pai é 100% Deus. O Filho é 100% Deus. O Espírito Santo é 100% Deus. Mas não são três deuses — são uma única divindade em três pessoas.

### Por que isso importa?

A Trindade não é uma questão teológica abstrata. Ela afeta:
- **Nossa adoração** — adoramos Pai, Filho e Espírito
- **Nossa oração** — oramos ao Pai, pelo Filho, no Espírito
- **Nossa salvação** — o Pai elege, o Filho redime, o Espírito regenera
- **Nossa vida cristã** — o Espírito habita em nós para nos guiar

A Trindade é o fundamento de tudo o que cremos e vivemos como cristãos.`,
          versículosChave: [
            { ref: 'Deuteronômio 6:4', texto: 'Ouve, Israel: O Senhor, o nosso Deus, é o único Senhor.' },
            { ref: 'João 10:30', texto: 'Eu e o Pai somos um.' },
            { ref: 'Atos 5:3-4', texto: 'Mentiste ao Espírito Santo... não mentiste a homens, mas a Deus.' },
            { ref: 'Romanos 11:33', texto: 'Ó profundidade das riquezas, tanto da sabedoria como do conhecimento de Deus!' },
          ],
        },
        {
          id: 'aula-quiz-3',
          título: 'Quiz: A Trindade',
          tipo: 'quiz',
          duração: '10 min',
          perguntas: [
            {
              id: 'q3-1',
              pergunta: 'Qual passagem contém a fórmula batismal mencionando Pai, Filho e Espírito Santo?',
              opções: ['João 3:16', 'Mateus 28:19', 'Romanos 8:28', 'Efésios 2:8'],
              respostaCorreta: 1,
              explicação: 'Mateus 28:19 é a fórmula batismal: "Batizando-os em nome do Pai, do Filho e do Espírito Santo".',
            },
            {
              id: 'q3-2',
              pergunta: 'O que João 1:1 afirma sobre o Verbo?',
              opções: ['O Verbo era uma criatura', 'O Verbo era Deus', 'O Verbo era um anjo', 'O Verbo era um profeta'],
              respostaCorreta: 1,
              explicação: 'João 1:1 declara: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus."',
            },
            {
              id: 'q3-3',
              pergunta: 'O Espírito Santo é descrito como:',
              opções: ['Uma força impersonal', 'Uma energia cósmica', 'Uma pessoa divina', 'Um sentimento'],
              respostaCorreta: 2,
              explicação: 'O Espírito Santo é uma pessoa: ele fala (João 16:13), pode ser entristecido (Efésios 4:30) e intercede (Romanos 8:26).',
            },
            {
              id: 'q3-4',
              pergunta: 'No batismo de Jesus (Mateus 3:16-17), quem está presente?',
              opções: ['Apenas Jesus e o Pai', 'Apenas Jesus e o Espírito Santo', 'As três pessoas da Trindade', 'Apenas o Espírito Santo'],
              respostaCorreta: 2,
              explicação: 'O Filho é batizado, o Espírito desce como pomba, e o Pai fala dos céus — as três pessoas estão presentes.',
            },
            {
              id: 'q3-5',
              pergunta: 'A Trindade ensina que Deus é:',
              opções: ['Três deuses diferentes', 'Um Deus em três pessoas', 'Uma pessoa que muda de forma', 'Três partes de um mesmo Deus'],
              respostaCorreta: 1,
              explicação: 'A Trindade é: um Deus em três pessoas — Pai, Filho e Espírito Santo — compartilham a mesma essência divina.',
            },
            {
              id: 'q3-6',
              pergunta: 'Qual passagem afirma "Eu e o Pai somos um"?',
              opções: ['João 1:1', 'João 10:30', 'João 14:6', 'João 3:16'],
              respostaCorreta: 1,
              explicação: 'João 10:30 registra Jesus dizendo: "Eu e o Pai somos um". Isso mostra a unidade de essência entre o Pai e o Filho.',
            },
            {
              id: 'q3-7',
              pergunta: 'Em 2 Coríntios 13:14, qual é a bênção associada ao Espírito Santo?',
              opções: ['A graça', 'O amor', 'A comunhão', 'A paz'],
              respostaCorreta: 2,
              explicação: 'Paulo bênção dizendo: "A graça do Senhor Jesus Cristo, o amor de Deus e a comunhão do Espírito Santo".',
            },
            {
              id: 'q3-8',
              pergunta: 'Por que a Bíblia diz que "mentir ao Espírito Santo" é mentir a Deus (Atos 5:3-4)?',
              opções: ['Porque o Espírito é mais importante que os anjos', 'Porque o Espírito Santo é Deus', 'Porque o Espírito é a mesma pessoa que o Pai', 'Porque o Espírito controla os anjos'],
              respostaCorreta: 1,
              explicação: 'A passagem mostra que mentir ao Espírito Santo é mentir a Deus, confirmando a divindade do Espírito.',
            },
            {
              id: 'q3-9',
              pergunta: 'Qual dos seguintes NÃO é um equívoco sobre a Trindade?',
              opções: ['A Trindade significa três deuses', 'O Espírito Santo é apenas uma força', 'Deus é três pessoas em uma essência', 'A Trindade é uma invenção medieval'],
              respostaCorreta: 2,
              explicação: 'A afirmação correta é que Deus é três pessoas em uma essência. As outras opções são equívocos comuns.',
            },
            {
              id: 'q3-10',
              pergunta: 'Qual é a importância prática da Trindade para o cristão?',
              opções: ['É apenas uma questão teológica abstrata', 'Afeta a adoração, oração, salvação e vida cristã', 'Não tem importância prática', 'Apenas pastores precisam entender'],
              respostaCorreta: 1,
              explicação: 'A Trindade afeta tudo: adoramos Pai, Filho e Espírito; oramos ao Pai pelo Filho no Espírito; somos salvos pela obra das três pessoas.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-biblia-palavra-de-deus',
      título: 'A Bíblia: Palavra de Deus',
      descrição: 'Estude a inspiração, o cânon, a transmissão e a tradução das Escrituras. Entenda por que a Bíblia é confiável e como ela chegou até nós.',
      ícone: '📖',
      aulas: [
        {
          id: 'aula-5-1',
          título: 'Origem e Inspiração das Escrituras',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## Origem e Inspiração das Escrituras

A Bíblia não é um livro comum. Ela não nasceu da imaginação humana, da tradição religiosa ou de uma busca filosófica por sentido. Ela é Palavra de Deus — revelada, inspirada e preservada pelo próprio Criador.

### O que é Inspiração Bíblica?

A inspiração bíblica é o processo pelo qual Deus usou autores humanos, com suas personalidades, estilos e contextos culturais, para produzir exatamente o que Ele quis comunicar, sem erro em suas palavras originais.

> "Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção, para a educação na justiça, a fim de que o homem de Deus seja completo e perfeitamente aparelhado para toda boa obra." — 2 Timóteo 3:16-17

A palavra grega usada por Paulo é *theopneustos* (θεοπνευστος), que significa literalmente "soprada por Deus". Não é "inspirada" no sentido de que alguém teve uma boa ideia. É "soprada" — Deus deu o fôlego, o sopro, o conteúdo mesmo das palavras.

### Três Características da Inspiração

**1. Inspiração Verbal**

A inspiração se estende às próprias palavras, não apenas às ideias gerais. Jesus disse: "Não pensareis que eu vim revogar a Lei ou os Profetas; não vim revogar, mas cumprir. Porque em verdade vos digo que, até que o céu e a terra passem, nem uma jota, nem um traço passará da Lei, até que tudo se cumpra" (Mateus 5:17-18). Até a menor letra hebraica (jota) é mantida por Deus.

**2. Inspiração Plenária**

"Toda a Escritura" — não apenas partes dela. Não apenas os mandamentos, não apenas as profecias, não apenas as histórias. Tudo. O livro de Jó, a genealogia de Mateus, a cantiga de Salomão — tudo é inspirado por Deus e tem propósito.

**3. Inspiração Inerrante**

Se Deus é verdadeiro (Números 23:19) e suas palavras são verdadeiras (Salmo 12:6), então as Escrituras são inerrantes — não contêm erro em seus manuscritos originais. Isso não significa que a Bíblia é um livro de ciência ou história no sentido moderno. Significa que, no que ela afirma, ela não erra.

### A Inspiração não é Ditado Mecânico

Deus não "posicionou a mão" dos autores como um fantasma escrevendo em um papel. Ele usou a personalidade de Paulo, o estilo de Lucas, a poesia de Davi, a sabedoria de Salomão. Cada autor escreveu com seu próprio vocabulário e estrutura — mas o resultado final é exatamente o que Deus queria comunicar.

Pedro afirma: "Nenhuma profecia da Escritura é de interpretação própria, porque a profecia jamais foi produzida por vontade de homens, mas homens santos falaram da parte de Deus, inspirados pelo Espírito Santo" (2 Pedro 1:20-21). A fonte é divina; o canal é humano.

### A Bíblia se Auto-Atestua

A Bíblia é o único livro que se declara Palavra de Deus. Não depende de uma autoridade externa para validá-la. Paulo diz: "Porque a palavra de Deus é viva e eficaz, e mais cortante do que qualquer espada de dois gumes, e penetrante até ao ponto de separar alma e espírito, juntas e medulas, e apta para discernir os pensamentos e propósitos do coração" (Hebreus 4:12).

Essa auto-afirmação não é arrogância — é consistência. A Bíblia cumpre o que anuncia, transforma vidas e resiste ao tempo há milênios.

### Por que isso importa

Se a Bíblia é realmente Palavra de Deus inspirada, ela tem autoridade sobre a nossa vida. Não é um livro de sugestões ou sabedoria humana — é a revelação de como Deus quer que vivamos, como podemos conhecê-lo, e o que Ele preparou para o futuro. A inspiração bíblica é o fundamento de toda a fé cristã.`,
          versículosChave: [
            { ref: '2 Timóteo 3:16', texto: 'Toda a Escritura é inspirada por Deus e útil para o ensino.' },
            { ref: '2 Pedro 1:20-21', texto: 'Homens santos falaram da parte de Deus, inspirados pelo Espírito Santo.' },
            { ref: 'Mateus 5:18', texto: 'Nem uma jota, nem um traço passará da Lei, até que tudo se cumpra.' },
            { ref: 'Hebreus 4:12', texto: 'A palavra de Deus é viva e eficaz.' },
          ],
        },
        {
          id: 'aula-5-2',
          título: 'Canon e Autenticidade: Por que esses 66 livros?',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## Canon e Autenticidade: Por que esses 66 livros?

A Bíblia protestante contém 66 livros — 39 no Antigo Testamento e 27 no Novo Testamento. Mas por que exatamente esses livros? Por que não outros? O processo de formação do cânon bíblico é um dos temas mais importantes da história da igreja.

### O que é Cânon?

A palavra "cânon" vem do grego *kanon* (κανών), que significa "régua" ou "padrão". O cânon bíblico é a lista dos livros reconhecidos como inspirados por Deus, autoritativos para a fé e a prática cristã. Um livro entra no cânon quando a igreja primitiva reconhece nele a voz de Deus.

### O Cânon do Antigo Testamento

O AT foi formado ao longo de séculos. O Pentateuco (Gênesis a Deuteronômio), escrito por Moisés, foi aceito desde o século V a.C. Os livros históricos e poéticos foram sendo reconhecidos gradualmente. Os profetas foram aceitos no século II a.C., quando o cânon hebraico começou a se fechar.

No Concílio de Jamnia (aproximadamente 90 d.C.), os judeus discutiram a extensão do cânon, mas a maioria dos livros já era amplamente aceita. Os 39 livros do AT protestante correspondem exatamente ao cânon hebraico.

A Septuaginta (tradução grega do AT, século III a.C.) incluía livros adicionais (deuterocanônicos), que a igreja católica romana mantém, mas que a Reforma Protestante removeu por não terem sido escritos em hebraico e por não serem reconhecidos como inspirados pelos judeus.

### O Cânon do Novo Testamento

O NT foi formado mais rapidamente. A igreja primitiva usou três critérios fundamentais para aceitar um livro:

**1. Origem Apostólica**

O livro deveria ser escrito por um apóstolo ou por alguém muito próximo a um. Marcos era companheiro de Pedro; Lucas era companheiro de Paulo. A conexão apostólica garantia autenticidade.

**2. Uso Universal na Igreja**

O livro deveria ser lido e aceito nas igrejas desde o início. Não bastava ser popular em uma região — deveria ser reconhecido amplamente.

**3. Consistência Doutrinária**

O livro deveria estar de acordo com a doutrina já recebida. Se contradizia o evangelho pregado pelos apóstolos, não era aceito.

### Livros Rejeitados

Vários livros circulavam na igreja antiga, mas não foram incluídos no cânon: O Pastor de Hermas, a Epístola de Barnabas, o Didache, o Apocalipse de Pedro e outros. Eram úteis para estudo, mas não tinham a autoridade divina dos livros canônicos.

### A Autenticidade das Escrituras

A autenticidade bíblica é sustentada por várias evidências:

- **Evidência manuscrita** — temos mais de 5.800 manuscritos gregos do NT, mais de qualquer outro livro da antiguidade
- **Evidência interna** — a coerência da mensagem ao longo de 1.500 anos e 40 autores
- **Evidência externa** — citações dos Pais da Igreja e descobertas arqueológicas
- **Evidência transformadora** — a Bíblia transformou bilhões de vidas ao longo da história

### Por que isso importa

O cânon nos dá segurança. Sabemos que temos exatamente o que Deus quis comunicar — nem mais, nem menos. A Bíblia é um livro fechado e completo. Não precisamos de outros livros, revelações privadas ou tradições humanas para completar o que Deus já revelou. A Sola Scriptura — a Escritura como única autoridade final — depende da integridade do cânon.`,
          versículosChave: [
            { ref: 'Apocalipse 22:18-19', texto: 'Se alguém acrescentar alguma coisa... Deus o castigará com os pragas.' },
            { ref: 'Lucas 1:1-4', texto: 'Assim também eu resolvi escrever-te, ó excelente Teófilo.' },
            { ref: '1 Tessalonicenses 2:13', texto: 'Recebestes a palavra de Deus, que ouvistes de nós.' },
            { ref: 'Gálatas 1:8', texto: 'Mesmo que nós ou um anjo do céu vos anuncie outro evangelho.' },
          ],
        },
        {
          id: 'aula-5-3',
          título: 'Transmissão e Tradução: Da manuscrito à nossa Bíblia',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: `## Transmissão e Tradução: Da manuscrito à nossa Bíblia

A Bíblia que temos hoje não caiu do céu pronta. Ela passou por um longo processo de cópia, tradução e preservação ao longo de mais de 3.000 anos. Entender esse processo nos dá confiança de que temos uma tradução fiel ao original.

### Os Manuscritos Originais

Os autores bíblicos escrevam em pergaminho, papiro ou outros materiais. Infelizmente, nenhum manuscrito original (*autógrafo*) sobreviveu. O que temos são cópias — milhares de cópias feitas por escribas ao longo dos séculos.

A boa notícia é que temos mais de 5.800 manuscritos gregos do Novo Testamento, além de milhares de traduções antigas (latim, siríaco, copto, etíope). Para efeito de comparação, temos apenas 10 manuscritos de César e 7 de Tácito — e ninguém questiona a autenticidade desses autores.

### O Textus Receptus e o Crítico Textual

O *Textus Receptus* é o texto grego que foi usado para as primeiras traduções da Bíblia, incluindo a King James (1611). Ele foi compilado por Erasmo de Roterdã a partir de manuscritos medievais.

O *texto crítico* (ou *texto-novo*) é a melhor reconstrução do original, feita por estudiosos modernos que compararam milhares de manuscritos, incluindo os mais antigos (o Papiro P75, do século III, e o Códice Sinaitico, do século IV).

Ambos são extremamente fiéis. As diferenças entre eles são mínimas — nenhuma afeta doutrina essential.

### As Grandes Traduções da História

A Bíblia já foi traduzida para mais de 700 idiomas completos e mais de 1.600 parcialmente. Veja as traduções mais importantes:

**Septuaginta (século III a.C.)**

A primeira grande tradução da Bíblia — do hebraico para o grego. Foi usada pelos judeus helenizados e citada pelos apóstolos no Novo Testamento. Mais de 80% das citações do AT no NT são da Septuaginta.

**Vulgata Latina (século IV d.C.)**

Traduzida por Jerônimo, foi a Bíblia da igreja ocidental por mais de 1.000 anos. A Reforma Protestante dependia da Vulgata, mas voltou aos originais hebraico e grego.

**Bíblia de Lutero (1522-1534)**

Martinho Lutero traduziu a Bíblia para o alemão, democratizando o acesso às Escrituras. Foi uma das primeiras traduções modernas baseadas nos originais.

**King James Version (1611)**

Encomendada pelo rei Jaime I da Inglaterra, é uma das traduções mais influentes da história. Durante séculos, foi a Bíblia padrão do mundo anglófono.

**Traduções Modernas em Português**

As principais traduções em português incluem a Almeida Revista e Atualizada (ARA), a Nova Versão Internacional (NVI), a King James Atualizada (KJA) e a Nova Bíblia do Dia (NBV). Cada uma tem seu público e estilo, mas todas são fiéis ao original.

### O Desafio da Tradução

Traduzir a Bíblia é um desafio enorme. Palavras hebraicas como *hesed* ("amor", "bondade", "misericórdia") não têm equivalente perfeito em português. Estruturas gramaticais do grego precisam ser adaptadas. O tradutor sempre precisa escolher entre fidelidade ao original e clareza para o leitor.

### Por que isso importa

Podemos ter confiança de que a Bíblia que temos hoje é fiel aos originais. Não perfeição absoluta dos manuscritos, mas uma transmissão extraordinariamente precisa. Deus providenciou que sua Palavra fosse preservada através dos séculos, para que pudéssemos conhecê-la, amá-la e obedecê-la.`,
          versículosChave: [
            { ref: 'Isaías 40:8', texto: 'A relva seca, a sua floração cai, mas a palavra do nosso Deus subsistirá sempre.' },
            { ref: 'Mateus 24:35', texto: 'O céu e a terra passarão, mas as minhas palavras não passarão.' },
            { ref: '1 Pedro 1:25', texto: 'Mas a palavra do Senhor subsiste para sempre.' },
            { ref: 'Salmos 119:89', texto: 'Para sempre, ó Senhor, está firme a tua palavra nos céus.' },
          ],
        },
        {
          id: 'aula-quiz-biblia',
          título: 'Quiz: A Bíblia — Palavra de Deus',
          tipo: 'quiz',
          duração: '10 min',
          perguntas: [
            {
              id: 'q5-1',
              pergunta: 'O que significa a palavra grega "theopneustos" usada em 2 Timóteo 3:16?',
              opções: ['Escrita por homens santos', 'Soprada por Deus', 'Antiga e sagrada', 'Completa e perfeita'],
              respostaCorreta: 1,
              explicação: 'Theopneustos (θεοπνευστος) significa literalmente "soprada por Deus", indicando que as Escrituras vieram por inspiração divina direta.',
            },
            {
              id: 'q5-2',
              pergunta: 'Quantos livros tem a Bíblia protestante?',
              opções: ['73 livros', '66 livros', '60 livros', '72 livros'],
              respostaCorreta: 1,
              explicação: 'A Bíblia protestante contém 66 livros: 39 no Antigo Testamento e 27 no Novo Testamento.',
            },
            {
              id: 'q5-3',
              pergunta: 'O que significa "inspiração plenária"?',
              opções: ['Apenas as profecias são inspiradas', 'Toda a Escritura é inspirada', 'Apenas o Novo Testamento é inspirado', 'Apenas os livros de Moisés são inspirados'],
              respostaCorreta: 1,
              explicação: 'Inspiração plenária significa que "toda a Escritura" é inspirada por Deus — não apenas partes dela.',
            },
            {
              id: 'q5-4',
              pergunta: 'Quais são os três critérios usados pela igreja primitiva para aceitar um livro no cânon do NT?',
              opções: ['Origem apostólica, uso na igreja e consistência doutrinária', 'Antiguidade, popularidade e milagres', 'Profecia, sabedoria e histórica', 'Língua, local e data'],
              respostaCorreta: 0,
              explicação: 'A igreja primitiva usou origem apostólica, uso universal na igreja e consistência doutrinária como critérios para aceitar livros no cânon.',
            },
            {
              id: 'q5-5',
              pergunta: 'Quantos manuscritos gregos do Novo Testamento sobrevivem?',
              opções: ['Cerca de 100', 'Cerca de 500', 'Mais de 5.800', 'Mais de 10.000'],
              respostaCorreta: 2,
              explicação: 'Existem mais de 5.800 manuscritos gregos do NT, mais de qualquer outro livro da antiguidade, sustentando a fiabilidade do texto.',
            },
            {
              id: 'q5-6',
              pergunta: 'Qual tradução grega do Antigo Testamento foi usada pelos apóstolos?',
              opções: ['Vulgata', 'Textus Receptus', 'Septuaginta', 'Peshitta'],
              respostaCorreta: 2,
              explicação: 'A Septuaginta (século III a.C.) é a tradução grega do AT usada amplamente pelos judeus hellenizados e citada pelos apóstolos no NT.',
            },
            {
              id: 'q5-7',
              pergunta: 'O que 2 Pedro 1:20-21 afirma sobre a origem das profecias?',
              opções: ['Foram escritas por vontade humana', 'Foram produzidas por homens santos movidos pelo Espírito Santo', 'Foram inventadas pelos sacerdotes', 'Foram copiadas de religiões antigas'],
              respostaCorreta: 1,
              explicação: 'Pedro afirma que "homens santos falaram da parte de Deus, inspirados pelo Espírito Santo" — a fonte é divina, o canal é humano.',
            },
            {
              id: 'q5-8',
              pergunta: 'O que é o Textus Receptus?',
              opções: ['Uma tradução latina medieval', 'O texto grego usado para as primeiras traduções modernas', 'Um comentário sobre o AT', 'Uma edição católica da Bíblia'],
              respostaCorreta: 1,
              explicação: 'O Textus Receptus é o texto grego compilado por Erasmo, usado como base para a King James e outras traduções Reformadas.',
            },
            {
              id: 'q5-9',
              pergunta: 'Por que a Septuaginta é importante para o estudo do NT?',
              opções: ['É a única tradução antiga', 'Mais de 80% das citações do AT no NT vêm dela', 'Foi escrita pelos apóstolos', 'É mais precisa que o original hebraico'],
              respostaCorreta: 1,
              explicação: 'A Septuaginta é citada amplamente pelos apóstolos — mais de 80% das referências do AT no NT vêm dessa tradução grega.',
            },
            {
              id: 'q5-10',
              pergunta: 'O que Mateus 24:35 afirma sobre as palavras de Jesus?',
              opções: ['Elas são temporárias', 'Elas passarão com o tempo', 'Elas não passarão jamais', 'Elas serão esquecidas'],
              respostaCorreta: 2,
              explicação: 'Jesus declara: "O céu e a terra passarão, mas as minhas palavras não passarão" — a Palavra de Deus é eterna e inabalável.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-igreja-corpo-de-cristo',
      título: 'A Igreja: Corpo de Cristo',
      descrição: 'Estude a eclesiologia: a natureza da igreja, os sacramentos e a missão cristã. Entenda o que é a igreja e qual é o seu propósito no mundo.',
      ícone: '⛪',
      aulas: [
        {
          id: 'aula-6-1',
          título: 'Natureza da Igreja: Universal e Local',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## Natureza da Igreja: Universal e Local

A palavra "igreja" pode gerar confusão. Quando pensamos em igreja, logo imaginamos um prédio, um culto aos domingos, ou uma organização religiosa. Mas o que a Bíblia realmente ensina sobre a igreja é muito mais profundo e dinâmico.

### O que significa "Igreja"?

A palavra grega é *ekklēsia* (ἐκκλησία), que significa literalmente "assembleia" ou "congregação convocada". Não se refere a um edifício — refere-se a um grupo de pessoas chamadas por Deus.

No AT, o termo hebraico *qahal* (קָהָל) é usado para a assembleia do povo de Israel diante de Deus. No NT, *ekklēsia* é usado tanto para a igreja universal quanto para congregações locais.

### A Igreja Universal

A igreja universal é o conjunto de todos os crentes em Jesus Cristo, de todas as épocas, lugares e denominações. É invisível — somente Deus conhece todos os seus membros.

> "E ele é a cabeça do corpo que é a igreja, o qual é o princípio, o primogênito dentre os mortos, para que em todas as coisas tenha a primazia." — Colossenses 1:18

> "Porque assim como o corpo é um e tem muitos membros, e todos os membros do corpo, sendo muitos, são um corpo, assim também Cristo." — 1 Coríntios 12:12

A igreja universal não depende de uma organização, denominação ou liderança humana. Ela é o Corpo de Cristo — uma realidade espiritual que transcende fronteiras, culturas e tempos.

### A Igreja Local

A igreja local é uma congregação de crentes em um lugar específico, reunidos para adorar, ensinar, fellowship e cumprir a Grande Comissão. É visível — tem reuniões, liderança e organização.

> "À igreja de Deus que está em Corinto, aos santificados em Cristo Jesus, chamados para ser santos, com todos os que em todo lugar invocam o nome do nosso Senhor Jesus Cristo, Senhor deles e nosso." — 1 Coríntios 1:2

Paulo escreve "à igreja... que está em Corinto" — uma congregação local específica. Cada igreja local é uma manifestação da igreja universal.

### A Relação entre Universal e Local

A igreja universal se manifesta em igrejas locais. Assim como um corpo tem muitos membros, a igreja universal tem muitas congregações locais. Nenhuma igreja local é a igreja inteira — mas cada uma é parte dela.

### Os Membros e o Corpo

> "Mas agora são muitos os membros, porém um só corpo." — 1 Coríntios 12:20

Cada crente é um membro do corpo de Cristo. O olho não pode dizer ao pé "não te preciso" (1 Coríntios 12:21). A interdependência é essencial:
- **Diversidade** — cada membro tem dons e funções diferentes
- **Unidade** — todos são parte do mesmo corpo
- **Dependência** — todos precisam uns dos outros
- **Cabeça** — Cristo é a cabeça que governa todo o corpo

### A Igreja Visível e Invisível

A teologia reformada distingue:
- **Igreja invisível** — o conjunto real de eleitos, conhecidos apenas por Deus
- **Igreja visível** — as congregações que podemos ver e participar

Nem todos que participam da igreja visível são realmente salvos (parábola do trigo e o joio, Mateus 13:24-30). Mas todos que são da igreja invisível participam, em algum grau, da igreja visível.

### A Importância da Comunidade

> "Não devemos abandonar a nossa reunião, como é costume de alguns, mas devemos animar-nos uns aos outros, e tanto mais quanto vês que o Dia se aproxima." — Hebreus 10:25

A vida cristã não foi feita para ser vivida no isolamento. A igreja local é o lugar onde aprendemos, crescemos, servimos e amamos uns aos outros.`,
          versículosChave: [
            { ref: 'Colossenses 1:18', texto: 'Ele é a cabeça do corpo que é a igreja.' },
            { ref: '1 Coríntios 12:12', texto: 'Assim como o corpo é um e tem muitos membros, assim também Cristo.' },
            { ref: 'Efésios 1:22-23', texto: 'Deus pôs todas as coisas debaixo dos seus pés e o deu como cabeça sobre todas as coisas à igreja.' },
            { ref: 'Hebreus 10:24-25', texto: 'Não abandonemos a nossa reunião, mas anime-mo-nos.' },
          ],
        },
        {
          id: 'aula-6-2',
          título: 'Os Sacramentos: Batismo e Ceia do Senhor',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## Os Sacramentos: Batismo e Ceia do Senhor

A Bíblia reconhece dois sacramentos (ou ordenanças): o batismo e a Ceia do Senhor. Embora a prática desses sacramentos seja unânime, há diferenças significativas na interpretação do seu significado e eficácia.

### O Batismo

O batismo é o ato de mergulhar (ou aspergir) água sobre uma pessoa, em nome do Pai, do Filho e do Espírito Santo (Mateus 28:19). Jesus foi batizado no Jordão (Mateus 3:13-17), e ordenou que seus discípulos batizassem.

**As diferentes visões do batismo:**

**1. Batismo Infantil (Paedobaptismo)**

Igrejas católicas, luteranas, reformadas, anglicanas e metodistas praticam o batismo de crianças. Os argumentos incluem:
- A substituição da circuncisão pelo batismo (Colossenses 2:11-12)
- O exemplo de batismos de famílias inteiras (Atos 16:33 — a casa de Lídia)
- A continuidade da aliança com as crianças (Atos 2:39 — "a promessa é para vós e para os vossos filhos")

**2. Batismo de Crentes (Credobaptismo)**

Igrejas batistas, pentecostais e许多 outras praticam o batismo apenas de crentes. Os argumentos incluem:
- O modelo bíblico de "crer e ser batizado" (Atos 2:41, 8:36-37)
- O batismo como testemunho público da fé, o que requer compreensão
- A ausência de exemplos claros de batismo infantil no NT

**3. Aspersão ou Imersão?**

- **Imersão** — mergulhar completamente na água (o mais comum no NT)
- **Aspersão** — jogar água sobre a cabeça (prática católica)
- **Aspersão** — derramar água (prática em alguns protestantes)

A palavra grega *baptizō* significa "mergulhar", o que favorece a imersão como prática original.

### A Ceia do Senhor

A Ceia do Senhor (Eucaristia, Santa Ceia) é a relembrança da morte de Jesus, instituída na Última Ceia (Mateus 26:26-29). Jesus tomou o pão, partiu e disse: "Isto é o meu corpo". Tomou o cálice e disse: "Isto é o meu sangue".

**As diferentes visões sobre a Ceia:**

**1. Presença Real (Católica Romana)**

A hetroousi (transubstanciação) ensina que o pão e o vinho se tornam, em substância, o corpo e o sangue de Cristo, mantendo apenas as aparências. Não é uma transformação física — é uma mudança da substância invisível.

**2. Consubstanciação (Luterana)**

Cristo está presente "em, com e sob" os elementos. O pão e o vinho permanecem, mas Cristo está verdadeiramente presente junto com eles.

**3. Visão Espiritual (Calvinista)**

Cristo está presente espiritualmente, não fisicamente. O crente se alimenta de Cristo pela fé, não pelos dentes. O Espírito Santo é o meio da presença.

**4. Memória (Zwingliana)**

A Ceia é uma recordação simbólica da morte de Cristo. O pão e o vinho representam, mas não são o corpo e o sangue. É um memorial, não um sacrifício.

**5. Visão Congregacionalista**

Assembleias de Deus e igrejas não-denominacionais geralmente seguem a visão memorial, enfatizando a proclamação da morte do Senhor até que Ele venha (1 Coríntios 11:26).

### A Unidade nos Sacramentos

Apesar das diferenças, há unidade:
- O batismo e a Ceia são ordenados por Jesus
- São atos públicos de obediência
- São sinais visíveis de uma realidade espiritual
- São praticados pela igreja local ao longo da história

### Por que isso importa

Os sacramentos não salvam — Cristo salva. Mas eles são meios de graça que fortalecem a fé, comunitam a igreja e testemunham ao mundo o que Cristo fez por nós.`,
          versículosChave: [
            { ref: 'Mateus 28:19', texto: 'Batizando-os em nome do Pai, do Filho e do Espírito Santo.' },
            { ref: '1 Coríntios 11:23-26', texto: 'Isto é o meu corpo... Isto é o meu sangue... Fazei isto em memória de mim.' },
            { ref: 'Atos 2:41', texto: 'Receberam a sua palavra e foram batizados.' },
            { ref: 'Romanos 6:4', texto: 'Fomos batizados com ele na morte.' },
          ],
        },
        {
          id: 'aula-6-3',
          título: 'Missões e Evangelismo: A Grande Comissão',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: `## Missões e Evangelismo: A Grande Comissão

A igreja não existe para si mesma. Ela tem uma missão: levar o evangelho a todas as nações, fazendo discípulos de Jesus Cristo. Essa missão é o coração pulsante da vida cristã.

### A Grande Comissão

> "E, indo Jesus, falou-lhes nestas palavras: Foi-me dada toda a autoridade no céu e na terra. Portanto, ide, fazei discípulos de todas as nações, batizando-os em nome do Pai, do Filho e do Espírito Santo, ensinando-os a guardar todas as coisas que vos tenho mandado. E eis que eu convosco estarei todos os dias, até a consumação do século." — Mateus 28:18-20

Essa passagem contém cinco elementos essenciais:

1. **Autoridade** — "Toda a autoridade me foi dada" — Jesus governa
2. **Ir** — "Ide" — é um mandato ativo, não passivo
3. **Fazer discípulos** — "Fazei discípulos" — o objetivo é transformação, não apenas informação
4. **Batizar e ensinar** — "Batizando-os... ensinando-os" — o discipulado é contínuo
5. **Promessa** — "Eu convosco estarei" — Jesus está presente na missão

### Atos 1:8: O Poder para Testemunhar

> "Mas recebereis poder, quando o Espírito Santo descer sobre vós; e sereis minhas testemunhas em Jerusalém, em toda a Judéia e Samaria, e até os confins da terra." — Atos 1:8

Jesus não nos mandou sozinhos. O Espírito Santo é quem nos capacita para testemunhar. A missão depende do poder divino, não da nossa eloquência ou estratégia.

A progressão geográfica é significativa:
- **Jerusalem** — o local próximo, a nossa cidade
- **Judéia e Samaria** — a região, o nosso país
- **Confins da terra** — o mundo inteiro

### A Teologia da Missão

**1. Missão Dei (Missão de Deus)**

A missão não começa com a igreja — começa com Deus. Deus é missions: Ele enviou seu Filho (João 3:16), enviou o Espírito (João 16:7) e envia a igreja (Mateus 28:19). A igreja participa da missão de Deus.

**2. Urgência Escatológica**

Jesus voltará. O tempo é curto. "A ceifa é grande, mas os obreiros são poucos. Portanto, rogai ao Senhor da ceifa que mande obreiros para a sua ceifa" (Mateus 9:37-38). A missão tem urgência porque a eternidade está em jogo.

**3. Universalidade do Evangelho**

"Deus não quer que ninguém pereça, mas que todos se arrependam" (2 Pedro 3:9). O evangelho é para todas as nações, tribos e línguas (Apocalipse 7:9). Nenhum povo deve ser esquecido.

### Evangelismo Pessoal

O evangelismo pessoal é a responsabilidade de cada crente:

> "Porque não me envergonho do evangelho, porque é o poder de Deus para a salvação de todo aquele que crê, primeiro do judeu e também do grego." — Romanos 1:16

Evangelismo envolve:
- **Viver** — uma vida que reflete Cristo (Mateus 5:16)
- **Falar** — compartilhar a história de como Cristo transformou a sua vida
- **Ensinar** — apresentar os fundamentos do evangelho com clareza
- **Oração** — interceder por aqueles que ainda não conhecem a Cristo

### Missões Internacionais

A missão internacional envolve:
- **Ir** — missionaries que deixam o seu país para servir em outro
- **Enviar** — igrejas que apoiam financeira e espiritualmente
- **Orar** — interceder por nações e trabalhadores
- **Aprender** — conhecer outras culturas e línguas

### Por que isso importa

A missão não é uma opção — é uma ordem. Se Cristo é Senhor, Ele tem autoridade para nos mandar. Se o evangelho é verdadeiro, ele precisa ser compartilhado. Se a eternidade é real, a missão é urgente.`,
          versículosChave: [
            { ref: 'Mateus 28:18-20', texto: 'Ide, fazei discípulos de todas as nações, batizando-os em nome do Pai, do Filho e do Espírito Santo.' },
            { ref: 'Atos 1:8', texto: 'Recebereis poder, quando o Espírito Santo descer sobre vós.' },
            { ref: 'Romanos 1:16', texto: 'Não me envergonho do evangelho, porque é o poder de Deus para a salvação.' },
            { ref: '2 Pedro 3:9', texto: 'Deus não quer que ninguém pereça, mas que todos se arrependam.' },
          ],
        },
        {
          id: 'aula-quiz-igreja',
          título: 'Quiz: A Igreja — Corpo de Cristo',
          tipo: 'quiz',
          duração: '10 min',
          perguntas: [
            {
              id: 'q6-1',
              pergunta: 'O que significa a palavra grega "ekklēsia"?',
              opções: ['Edifício sagrado', 'Assembleia convocada', 'Organização religiosa', 'Templo de pedra'],
              respostaCorreta: 1,
              explicação: 'Ekklēsia (ἐκκλησία) significa "assembleia" ou "congregação convocada". Refere-se ao povo, não ao prédio.',
            },
            {
              id: 'q6-2',
              pergunta: 'Qual é a diferença entre a igreja universal e a local?',
              opções: ['A universal é invisível (todos os crentes); a local é visível (congregação específica)', 'A universal é católica; a local é protestante', 'A universal é antiga; a local é moderna', 'Não há diferença'],
              respostaCorreta: 0,
              explicação: 'A igreja universal é o conjunto de todos os crentes, conhecido apenas por Deus. A igreja local é uma congregação específica e visível.',
            },
            {
              id: 'q6-3',
              pergunta: 'Em Mateus 28:19, qual é a fórmula do batismo?',
              opções: ['Em nome de Jesus apenas', 'Em nome do Pai, do Filho e do Espírito Santo', 'Em nome da igreja', 'Em nome dos apóstolos'],
              respostaCorreta: 1,
              explicação: 'Jesus ordenou: "Batizando-os em nome do Pai, do Filho e do Espírito Santo" — a fórmula trinitária.',
            },
            {
              id: 'q6-4',
              pergunta: 'Qual das seguintes visões sobre a Ceia ensina que Cristo está presente espiritualmente, não fisicamente?',
              opções: ['Presença Real católica', 'Consubstanciação luterana', 'Visão espiritual calvinista', 'Memória zwingliana'],
              respostaCorreta: 2,
              explicação: 'A visão calvinista ensina que Cristo está presente espiritualmente, não fisicamente — o crente se alimenta pela fé.',
            },
            {
              id: 'q6-5',
              pergunta: 'Segundo Atos 1:8, de onde o poder para testemunhar vem?',
              opções: ['Da própria igreja', 'Do Espírito Santo', 'Dos líderes religiosos', 'Dos governos'],
              respostaCorreta: 1,
              explicação: 'Jesus afirma: "Recebereis poder, quando o Espírito Santo descer sobre vós." O poder para testemunhar é do Espírito.',
            },
            {
              id: 'q6-6',
              pergunta: 'O que "Missão Dei" significa?',
              opções: ['A missão da igreja é criar prédios', 'A missão começa com Deus, não com a igreja', 'A missão é apenas para pastores', 'A missão é opcional'],
              respostaCorreta: 1,
              explicação: 'Missão Dei reconhece que Deus é missions — Ele enviou o Filho, o Espírito e a igreja. Nós participamos da missão dEle.',
            },
            {
              id: 'q6-7',
              pergunta: 'Qual profeta ensinou que "a relva seca, mas a palavra de Deus subsiste"?',
              opções: ['Jeremias', 'Isaías', 'Daniel', 'Ezequiel'],
              respostaCorreta: 1,
              explicação: 'Isaías 40:8 afirma: "A relva seca, a sua floração cai, mas a palavra do nosso Deus subsistirá sempre."',
            },
            {
              id: 'q6-8',
              pergunta: 'Quantos sacramentos (ou ordenanças) a Bíblia reconhece?',
              opções: ['Sete', 'Dois', 'Cinco', 'Um'],
              respostaCorreta: 1,
              explicação: 'A Bíblia reconhece dois sacramentos: o batismo e a Ceia do Senhor. Outros rituais católicos não têm base bíblica clara.',
            },
            {
              id: 'q6-9',
              pergunta: 'Por que a urgência da missão é tão importante?',
              opções: ['Porque Deus gosta de pressa', 'Porque a eternidade está em jogo e Jesus voltará', 'Porque a igreja precisa de dinheiro', 'Porque os pastores mandam'],
              respostaCorreta: 1,
              explicação: 'A missão é urgente porque há pessoas que precisam ouvir o evangelho antes que Jesus volte. A eternidade de cada pessoa está em jogo.',
            },
            {
              id: 'q6-10',
              pergunta: 'Qual é o objetivo da Grande Comissão?',
              opções: ['Construir prédios', 'Fazer discípulos de todas as nações', 'Aumentar o número de membros', 'Criar denominações'],
              respostaCorreta: 1,
              explicação: 'Mateus 28:19 é claro: "Fazei discípulos de todas as nações." O objetivo é formar seguidores de Cristo, não apenas contabilizar membros.',
            },
          ],
        },
      ],
    },
  ],
};
