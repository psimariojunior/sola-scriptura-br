import { Curso } from './cursos';

export const CURSO_EVANGELHOS: Curso = {
  id: 'evangelhos-vida-de-jesus',
  título: 'Evangelhos: A Vida de Jesus',
  descrição: 'Introdução comparativa aos quatro evangelhos — Mateus, Marcos, Lucas e João. Panoramas em vídeo (BibleProject) sem repetir o mesmo iframe em aulas diferentes.',
  instrutor: 'Sola Scriptura',
  duração: 'Introdução',
  nível: 'iniciante',
  categoria: 'Novo Testamento',
  certificado: true,
  módulos: [
    {
      id: 'mod-mateus-rei',
      título: 'Mateus: O Rei dos Judeus',
      descrição: 'O evangelho que apresenta Jesus como o Messias prometido ao povo de Israel',
      ícone: '👑',
      aulas: [
        {
          id: 'aula-ev-1-1',
          título: 'Introdução ao Evangelho de Mateus',
          tipo: 'video',
          videoUrl: 'https://www.youtube.com/watch?v=VskOdIySJQI',
          videoTítulo: 'Mateus 1-13 || Bible Project Português ||',
          duração: '15 min',
          conteúdo: `## Introdução ao Evangelho de Mateus

O evangelho de Mateus é o primeiro livro do Novo Testamento e uma ponte magistral entre o Antigo e o Novo Testamento. Escrito provavelmente entre 60 e 70 d.C., é dirigido principalmente ao público judaico, buscando demonstrar que Jesus de Nazaré é o Messias (Cristo) prometido nas Escrituras hebraicas.

### Autor e público

O autor é Mateus, também chamado de Levi, um coletor de impostos escolhido como discípulo por Jesus (Mateus 9:9). Antes de seguir Jesus, Mateus era odiado por seus compatriotas judeus por trabalhar para o império romano e ser considerado ritualmente impuro. Sua transformação radical é um testemunho do poder de Jesus.

O público-alvo de Mateus são judeus cristãos — pessoas que aceitaram Jesus como Messias, mas que ainda carregavam a cultura, as tradições e as expectativas do judaísmo. Por isso, Mateus faz mais referências ao Antigo Testamento que qualquer outro evangelho — são mais de 60 citações e alusões diretas.

### Tema central: O Rei e seu Reino

Mateus organiza a vida de Jesus em torno de cinco grandes discursos, imitando a estrutura do Pentateuco:

1. **O Sermão do Monte** (caps. 5-7) — A ética do Reino
2. **Discurso missionário** (cap. 10) — O chamado ao serviço
3. **Parábolas do Reino** (cap. 13) — O mistério do Reino
4. **Discurso eclesial** (cap. 18) — A vida na comunidade
5. **Discurso escatológico** (caps. 24-25) — O retorno do Rei

Essa estrutura sugere que Mateus via Jesus como o novo Moisés, trazendo não apenas a Lei, mas o cumprimento da Lei. Enquanto Moisés recebeu os mandamentos no Monte Sinai, Jesus proclama a vontade de Deus no Monte das Oliveiras (ou em uma colina da Galileia).

### Por que Mateus começa com a genealogia?

Ao contrário de Marcos, que começa com o ministério público de Jesus, e de João, que começa com a eternidade, Mateus começa com uma genealogia: "Livro da genealogia de Jesus Cristo, filho de Davi, filho de Abraão" (Mateus 1:1). Isso não é acaso — é estratégia teológica.

A genealogia conecta Jesus diretamente com duas promessas divinas:
- **Abraão**: "Em ti serão abençoadas todas as nações" (Gênesis 12:3)
- **Davi**: "Teu trono será estabelecido para sempre" (2 Samuel 7:16)

Mateus está dizendo: este é o Filho de Abraão que abençoará todas as nações. Este é o Filho de Davi que reinará para sempre. A promessa cumpre-se em Jesus.

### A divisão do Livro

O evangelho de Mateus pode ser dividido em três grandes partes:

1. **A origem e preparação do Rei** (caps. 1-4)
2. **O ministério público do Rei na Galileia** (caps. 5-20)
3. **O ministério final em Jerusalém, paixão e ressurreição** (caps. 21-28)

Essa estrutura geográfica (Galileia → caminho → Jerusalém) acompanha o fluxo narrativo da vida de Jesus e mostra que toda a jornada aponta para a cruz e a ressurreição.

### O cumprimento das profecias

Uma das marcas registras de Mateus é a expressão "para que se cumprisse o que foi dito pelo profeta". Ela aparece pelo menos 11 vezes no evangelho. Mateus entende que a história de Jesus não é aleatória — é o roteiro que Deus escreveu séculos antes através dos profetas.

O nascimento em Belém, a fuga para o Egito, a cura dos enfermos, até mesmo a traição de Judas — tudo estava nas Escrituras. Mateus quer que seus leitores vejam que Jesus não é um impostor ou um rebelde: é o Filho de Deus cumprindo cada detalhe da promessa.

### Relevância para hoje

Embora escrito para judeus, Mateus traz mensagens universais:
- A ética do Reino se aplica a qualquer crente em qualquer cultura
- A Grande Comissão (28:19-20) é o mandato missionário da igreja
- A parábola das ovelhas e dos bodes (25:31-46) nos lembra do julgamento vindouro
- A presença de Jesus "até o fim do mundo" (28:20) é uma promessa de companheirismo

Estudar Mateus é entender que Jesus não veio apenas para salvar — veio para reinar. E esse reino começa no coração de quem O recebe.`,
          versículosChave: [
            { ref: 'Mateus 1:1', texto: 'Livro da genealogia de Jesus Cristo, filho de Davi, filho de Abraão.' },
            { ref: 'Mateus 1:23', texto: 'Eis que a virgem conceberá e dará à luz um filho, e chamará o seu nome Emanuel, que traduzido é: Deus conosco.' },
            { ref: 'Mateus 28:18-19', texto: 'Toda autoridade me é dada no céu e na terra. Ide, portanto, e fazei discípulos de todas as nações.' },
          ],
        },
        {
          id: 'aula-ev-1-2',
          título: 'Genealogia e nascimento: Cumprimento de profecias',
          tipo: 'video',
          duração: '15 min',
          videoUrl: 'https://www.youtube.com/watch?v=ubXUcaXu8bQ',
          videoTítulo: 'Lucas 1-9 || BibleProject Português',
          conteúdo: `## Genealogia e nascimento: Cumprimento de profecias

A genealogia de Jesus em Mateus 1:1-17 e o relato de seu nascimento em Mateus 1:18-25 não são meros dados biográficos — são argumentos teológicos poderosos. Mateus está apresentando evidências de que Jesus é o Messias prometido.

### A estrutura da genealogia

Mateus organiza a genealogia em três grupos de 14 gerações (Mateus 1:17):
1. De Abraão a Davi (14 gerações)
2. De Davi ao exílio na Babilônia (14 gerações)
3. Do exílio a Cristo (14 gerações)

O número 14 tem significado: em hebraico, as letras do nome "Davi" (ד-ו-ד) somam 14 (4+6+4). Mateus está enfatizando que Jesus é o Filho de Davi, o rei prometido.

### Surpresas na genealogia

A genealogia de Mateus inclui quatro mulheres — algo incomum para genealogias judaicas, que eram tipicamente masculinas:

1. **Tamar** (v. 3) — uma cananeia que se passou por prostituta para ter um filho com Judá (Gênesis 38)
2. **Raabe** (v. 5) — uma prostituta de Jericó que ajudou os espias israelitas (Josué 2)
3. **Rute** (v. 5) — uma moabita que se casou com Boaz (Livro de Rute)
4. **Esposa de Urias** (v. 6) — Bate-Seba, com quem Davi cometeu adultério (2 Samuel 11)

Por que incluir essas mulheres? Porque Mateus está mostrando que:
- A linhagem do Messias é universal — não é exclusiva de um grupo étnico
- Deus usa pessoas imperfeitas e de origens diversas para cumprir Seus propósitos
- A graça de Deus transcende barreiras culturais e sociais

### A narrativa do nascimento

Mateus 1:18-25 apresenta o nascimento de Jesus em termos que teriam profundo significado para ouvintes judeus:

**O problema**: Maria estava grávida antes de viver com José. Segundo a Lei de Moisés (Deuteronômio 22:23-24), isso poderia resultar em lapidação. José, sendo justo, queria divorciar-se secretamente para não envergonhar Maria.

**A solução**: Um anjo aparece em sonho a José e explica que a criança foi concebida pelo Espírito Santo (Mateus 1:20). O anjo cita Isaías 7:14 — a profecia de que uma virgem conceberia e daria à luz um filho chamado Emanuel.

**A obediência de José**: José aceita a explicação divina, toma Maria como esposa e não a conhece até que ela desse à luz o primogênito (Mateus 1:25). Mateus acrescenta: "E chamou o seu nome Jesus", que em hebraico (Yeshua) significa "Yahweh salva".

### O cumprimento profético

Mateus cita Isaías 7:14 diretamente (Mateus 1:23): "Eis que a virgem conceberá e dará à luz um filho, e chamará o seu nome Emanuel, que traduzido é: Deus conosco".

A palavra hebraica usada em Isaías 7:14 é *almah*, que significa "jovem mulher". No contexto original, a profecia referia-se a um evento no tempo do rei Acaz. Mateus, sob inspiração do Espírito Santo, vê um cumprimento maior e escatológico em Jesus.

Além disso, Mateus 2:15 cita Oséias 11:1: "Do Egito chamei o meu filho", referindo-se à fuga da família para o Egito. Mateus vê na história de Israel um padrão que se repete em Jesus: Israel foi chamado "filho de Deus" no Êxodo; Jesus é o Filho de Deus perfeito.

### Outros cumprimentos

Mateus registra vários outros cumprimentos no relato do nascimento:
- **Mateus 2:15** — Fuga para o Egito (cita Oséias 11:1)
- **Mateus 2:17-18** — Herodes mata as crianças de Belém (cita Jeremias 31:15)
- **Mateus 2:23** — A família se estabelece em Nazaré (citação de fonte desconhecida)

### O que isso nos ensina

1. **Deus é fiel às suas promessas** — mesmo que levem séculos para se cumprir
2. **O plano de Deus não depende da perfeição humana** — Ele usou pecadores na linhagem de Jesus
3. **Jesus é o centro da história** — toda a narrativa bíblica aponta para Ele
4. **A encarnação é real** — Deus se tornou humano, "Deus conosco"

Estudar a genealogia e o nascimento de Jesus não é tarefa tediosa — é mergulhar no mistério da encarnação e na fidelidade de um Deus que cumpre cada palavra de suas promessas.`,
          versículosChave: [
            { ref: 'Mateus 1:22-23', texto: 'Tudo isso aconteceu para que se cumprisse o que foi dito pelo Senhor, através do profeta: Eis que a virgem conceberá...' },
            { ref: 'Isaías 7:14', texto: 'Portanto, o próprio Senhor vos dará um sinal: Eis que a virgem conceberá e dará à luz um filho.' },
            { ref: 'Mateus 2:15', texto: 'E ficou ali até a morte de Herodes, para que se cumprisse o que foi dito pelo profeta: Do Egito chamei o meu filho.' },
          ],
        },
        {
          id: 'aula-ev-1-3',
          título: 'O Sermão do Monte (caps. 5-7)',
          tipo: 'video',
          duração: '20 min',
          videoUrl: 'https://www.youtube.com/watch?v=1sKMqP2vzQY',
          videoTítulo: 'Mateus 14-28 – BibleProject Português',
          conteúdo: `## O Sermão do Monte (caps. 5-7)

O Sermão do Monte, em Mateus 5-7, é o mais famoso discurso de Jesus e uma das preleções mais conhecidas da história da humanidade. É a "declaração de intenções" do Reino de Deus — a constituição ética do governo do Rei.

### Contexto e estrutura

Jesus vira as expectativas de cabeça para baixo. O povo esperava um Messias político que derrotasse Roma. Em vez disso, Jesus sobe a uma colinha e ensina sobre o coração, a justiça interior e o amor aos inimigos.

O sermão pode ser dividido em três partes:
1. **As Bem-Aventuranças** (5:1-12) — Quem é bem-aventurado no Reino
2. **A ética do Reino** (5:13-48) — Como viver como cidadão do Reino
3. **A prática do Reino** (6:1-7:29) — Oração, jejum, riquezas e julgamento

### As Bem-Aventuranças (5:1-12)

As nove bem-aventuranças são o contrário do que o mundo valoriza:

- "Bem-aventurados os **pobres de espírito**" (5:3) — Não os materialmente pobres, mas os que reconhecem sua necessidade de Deus
- "Bem-aventurados os que **choram**" (5:4) — Não os depressivos, mas os que sentem a dor do pecado
- "Bem-aventurados os **mansos**" (5:5) — Não os fracos, mas os que têm poder e o controlam
- "Bem-aventurados os que **tem fome e sede de justiça**" (5:6) — Os que não se satisfazem com meias-medidas
- "Bem-aventurados os **misericordiosos**" (5:7) — Os que tratam os outros como Deus os tratou
- "Bem-aventurados os **puros de coração**" (5:8) — Os que têm motivações sinceras
- "Bem-aventurados os **pacificadores**" (5:9) — Não os que evitam conflito, mas os que trazem paz verdadeira
- "Bem-aventurados os **perseguidos por causa da justiça**" (5:10) — Sofrimento por seguir a Deus

### A ética do Reino (5:13-48)

Jesus ensina que a ética do Reino vai além da letra da Lei:

**"Ouvistes que foi dito... Eu, porém, vos digo"** (5:21-48) — Essa frase aparece seis vezes. Jesus não está abolindo a Lei, mas revelando sua profundidade:

- O assassinato começa com o ódio (5:21-26)
- O adultério começa com a cobiça (5:27-30)
- O divórcio deve ser sério e responsável (5:31-32)
- O juramento deve ser desnecessário — a palavra basta (5:33-37)
- A retaliação é substituída pela generosidade (5:38-42)
- O amor aos inimigos é a marca do Reino (5:43-48)

### A prática do Reino (6:1-7:29)

**Oração** (6:5-15): Jesus ensina o Pai Nosso, a oração modelo. Não é fórmula mágica — é modelo de relacionamento com Deus. As seis petições cobrem: a glória de Deus, Seu governo, provisão, perdão e proteção espiritual.

**Jejum** (6:16-18): O jejum não é espetáculo — é entre você e Deus. Quem jejua para ser visto já recebeu sua recompensa.

**Riquezas** (6:19-24): "Não acumuleis tesouros na terra" (6:19). Jesus não condena ter bens, mas torná-los o centro da vida. "Onde está o teu tesouro, aí estará o teu coração" (6:21).

**Preocupação** (6:25-34): "Não vos preocupeis com a vossa vida" (6:25). Se Deus veste o lírio do campo e alimenta as aves do céu, Ele cuidará dos seus filhos.

**Julgamento** (7:1-5): "Não julgueis" (7:1) — não significa não discernir, mas não condenar com arrogância. Tire a viga do seu olho antes da palha do irmão.

### O fundamento da sabedoria

O sermão termina com duas parábolas: a casa construída sobre a rocha e a casa construída sobre a areia (7:24-27). A diferença não é ouvir — é praticar. O ouvinte que obedece está firme; o que apenas ouve está condenado.

### Impacto e relevância

O Sermão do Monte já inspirou movimentos de justiça social, resistência pacífica e reforma ética. Martin Luther King Jr., Mahatma Gandhi e muitos outros encontraram nele bases para suas lutas.

Mas o sermão é mais que inspiração social — é o padrão de vida do cidadão do Reino de Deus. Não é impossível sem a graça de Deus. Ele nos dá o Espírito Santo para viver o que Ele exigiu.`,
          versículosChave: [
            { ref: 'Mateus 5:1-2', texto: 'Vendo Jesus a multidão, subiu a um monte, e, assentando-se, aproximaram-se dele os seus discípulos.' },
            { ref: 'Mateus 5:17', texto: 'Não cuideis que vim destruir a Lei ou os Profetas; não vim destruir, mas cumprir.' },
            { ref: 'Mateus 6:33', texto: 'Mas, buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.' },
            { ref: 'Mateus 7:24', texto: 'Qualquer, pois, que ouve estas minhas palavras e as pratica, assemelhar-se-á ao homem prudente, que edificou a sua casa sobre a rocha.' },
          ],
        },
        {
          id: 'aula-ev-1-4',
          título: 'Parábolas do Reino (cap. 13)',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## Parábolas do Reino (cap. 13)

Mateus 13 é o "capítulo das parábolas" — sete histórias que Jesus conta em um único dia para revelar o mistério do Reino de Deus. As parábolas não são fábulas morais; são retratos da realidade espiritual disfarçados de histórias do dia a dia.

### Por que parábolas?

Mateus 13:10-17 explica por que Jesus usa parábolas. Ele não está escondendo a verdade — está revelando-a de forma que só os receptivos podem entender. Para quem tem ouvidos, a parábola ilumina; para quem não tem, esconde.

### As sete parábolas

**1. O Semeador (13:3-9)**

Um homem semeia sementes em quatro tipos de solo:
- **Caminho** → as aves comem (Satanás rouba a Palavra)
- **Pedras** → brota, mas seca (aceitação superficial)
- **Espinhos** → sufocam (distracções mundanas)
- **Boa terra** → produz fruto (coração receptivo)

Jesus explica em 13:18-23. A pergunta não é "qual solo é o mundo?" mas "qual solo sou eu?"

**2. O Joio entre o Trigo (13:24-30)**

Um inimigo semeia joio entre o trigo. Os servos querem arrancar, mas o senhor diz: "Deixai crescer ambos até a colheita." Na separação final, o joio será queimado e o trigo recolhido no celeiro.

Essa parábola ensina paciência. Deus permite que justos e injustos coexistam neste mundo. O julgamento definitivo pertence a Deus.

**3. A Semente de Mostarda (13:31-32)**

A semente mais pequena do campo se torna a maior das árvores. O Reino começa pequeno — um judeu obscuro numa colina da Galileia — e se torna universal. De pequenos começos, grande resultado.

**4. O Fermento (13:33)**

Uma mulher mistura fermento em três medidas de farinha até que tudo leveda. O Reino é como fermento: invisível, mas transformador. Ele permeia toda a sociedade.

**5. O Tesouro Escondido (13:44)**

Um homem encontra um tesouro num campo, vende tudo e compra o campo. O Reino vale mais que tudo o que temos. É um investimento radical.

**6. A Pérola de Grande Preço (13:45-46)**

Um comerciante busca pérolas finas e encontra uma de valor inestimável. Similar à parábola anterior — o Reino é o mais valioso de todos os bens.

**7. A Rede (13:47-50)**

Uma rede lançada ao mar apanha todo tipo de peixe. No fim do mundo, os anjos separarão os maus dos justos. Semelhante à parábola do joio, mas enfatiza o julgamento final.

### A aplicação

Cada parábola desafia o ouvinte a se posicionar. O Reino não é abstrato — é concreto, presente e exige resposta. Jesus termina o capítulo perguntando: "Compreendeis todas essas coisas?" (13:51). Os discípulos dizem sim. Ele conclui: "Todo escriba instruído para o Reino dos céus é semelhante a um homem rico que tira do seu esconderijo coisas novas e antigas" (13:52).

Estudar as parábolas é como abrir um tesouro — sempre há algo novo para descobrir.`,
          versículosChave: [
            { ref: 'Mateus 13:11', texto: 'Porque a vós é dado saber os mistérios do Reino dos céus, mas a eles não é dado.' },
            { ref: 'Mateus 13:31-32', texto: 'O Reino dos céus é semelhante ao grão de mostarda, que um homem toma e semeia no seu campo.' },
            { ref: 'Mateus 13:44', texto: 'O Reino dos céus é semelhante a um tesouro escondido num campo. O qual, quando um homem o acha, esconde-o, e, pela alegria que dele tem, vai e vende tudo o que tem, e compra esse campo.' },
            { ref: 'Mateus 13:49', texto: 'Assim será no fim do mundo: sairão os anjos, e separarão os maus do meio dos justos.' },
          ],
        },
        {
          id: 'aula-ev-1-5',
          título: 'A Grande Comissão (cap. 28)',
          tipo: 'video',
          videoUrl: 'https://www.youtube.com/watch?v=4E-Ju-WKe1k',
          videoTítulo: 'Mateus 14-28 || Bible Project Português ||',
          duração: '15 min',
          conteúdo: `## A Grande Comissão (cap. 28)

Mateus 28:18-20 é o versículo de despedida de Jesus e o mandato missionário da igreja. É tão importante que é chamado de "A Grande Comissão" — a missão que Jesus deixou para todos os seus seguidores até o fim do mundo.

### O contexto da passagem

Jesus ressuscitou. Os discípulos foram à Galileia, conforme Ele havia ordenado (Mateus 28:10). Alguns duvidaram (Mateus 28:17) — o que é reconfortante, porque mostra que a fé não é ausência de dúvida.

Então Jesus se aproxima e pronuncia as palavras finais de Mateus:

> "Toda autoridade me é dada no céu e na terra. Ide, portanto, e fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo, ensinando-os a guardar todas as coisas que vos tenho ordenado. E eis que estou convosco todos os dias, até a consumação do século." — Mateus 28:18-20

### A autoridade de Jesus (v. 18)

"**Toda autoridade** me é dada no céu e na terra." A Grande Comissão não é um pedido gentil — é um comando fundamentado na autoridade suprema. Jesus não pede permissão; Ele exerce autoridade. A missão da igreja não depende da nossa habilidade, mas da autoridade de Cristo.

### A missão: "Fazei discípulos" (v. 19a)

O verbo principal no texto grego é *mathēteusate* — "fazei discípulos". Os outros verbos ("ide", "batizando", "ensinando") são participios que descrevem como fazer discípulos.

Fazer discípulos significa:
1. **Ir** — a missão é ativa, não passiva
2. **Batizar** — incorporar à comunidade visível
3. **Ensinar** — instruir na Palavra de Deus

Não é apenas "evangelizar" ou "fazer redecisões". É um processo completo de formação — do primeiro contato ao discipulado maduro.

### O alvo: "Todas as nações" (v. 19b)

"Atodas as nações" (*panta ta ethnē*) — não apenas judeus, mas todas as etnias, culturas, idiomas. A Grande Comissão quebra o etnocentrismo. O evangelho é universal.

Mateus começa com a genealogia de Abraão (1:1) — "em ti serão abençoadas todas as nações". A Grande Comissão é o cumprimento final dessa promessa. O que começou com um homem em Ur dos Caldeus termina com todas as nações.

### O método: "Batizando-os... ensinando-os" (v. 19-20)

**Batismo**: não é apenas um ritual — é uma declaração pública de fé e incorporação à igreja. Em nome do Pai (criador), do Filho (redentor) e do Espírito Santo (santificador).

**Ensino**: "ensinando-os a guardar todas as coisas que vos tenho ordenado". O discipulado é um processo contínuo de aprendizado e obediência. A fé cristã não é cega — é informada pela Palavra.

### A promessa: "Estou convosco" (v. 20)

"Eis que estou convosco todos os dias, até a consumação do século." A missão não é solitária. Jesus promete presença permanente. Mesmo após a Ascensão, Ele está com a igreja pelo Espírito Santo.

### Aplicação

A Grande Comissão não é apenas para pastores e missionários — é para todo crente. Cada cristão é chamado a:
1. **Ir** ao próximo, ao vizinho, ao colega
2. **Fazer discípulos** — ajudar outros a crescer na fé
3. **Batizar** — guiar pessoas à igreja
4. **Ensinar** — compartilhar o que aprendeu
5. **Confiança** — saber que Jesus está conosco

A igreja que não faz discípulos está desobedecendo ao último e mais importante comando de Jesus.`,
          versículosChave: [
            { ref: 'Mateus 28:18-20', texto: 'Toda autoridade me é dada no céu e na terra. Ide, portanto, e fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo, ensinando-os a guardar todas as coisas que vos tenho ordenado. E eis que estou convosco todos os dias, até a consumação do século.' },
            { ref: 'Mateus 28:17', texto: 'E, vendo-o, o adoraram; mas alguns duvidaram.' },
            { ref: 'Gênesis 12:3', texto: 'Em ti serão abençoadas todas as famílias da terra.' },
          ],
        },
      ],
    },
    {
      id: 'mod-marcos-servo',
      título: 'Marcos: O Servo Sofredor',
      descrição: 'O evangelho mais curto e dinâmico, centrado na ação e no serviço de Jesus',
      ícone: '🕊️',
      aulas: [
        {
          id: 'aula-ev-2-1',
          título: 'Introdução ao Evangelho de Marcos',
          tipo: 'video',
          videoUrl: 'https://www.youtube.com/watch?v=B05lvqNtCpM',
          videoTítulo: 'Quem foi o Jesus Histórico? Existe diferença entre o Jesus Histórico e o Cristo da fé? - Moises Brasil',
          duração: '15 min',
          conteúdo: `## Introdução ao Evangelho de Marcos

Marcos é o mais curto dos quatro evangelhos — apenas 16 capítulos, cerca de 11.000 palavras. É também o mais dinâmico, cheio de ação, ritmo acelerado e linguagem gráfica. Marcos não perde tempo com genealogias ou discursos longos — ele quer mostrar Jesus em ação.

### Autor e data

O autor é João Marcos, mencionado em Atos 12:12 como filho de Maria, cuja casa em Jerusalém era ponto de encontro dos cristãos primitivos. Marcos era sobrinho de Barnabé (Colossenses 4:10) e companheiro de Paulo e Pedro.

A tradição da igreja afirma que Marcos escreveu seu evangelho com base nos ensinos do apóstolo Pedro, que ele serviu como intérprete (1 Pedro 5:13). Pedro era um homem de ação, não de longos discursos — e isso se reflete no evangelho.

A data provável é por volta de 60-65 d.C., antes da destruição de Jerusalém em 70 d.C.

### Público-alvo: Romanos e gentios

Marcos escreveu para cristãos de origem romana/gentia. Isso explica várias características:
- Explica costumes judaicos (7:3-4) — seu público não os conhecia
- Traduz termos aramaicos (5:41 — "Talitha cumi"; 7:34 — "Effatá")
- Não cita profecias do Antigo Testamento com tanta frequência quanto Mateus
- enfatiza a universalidade do evangelho

### Estrutura: O Servo em ação

Marcos não tem a estrutura de cinco discursos como Mateus. Ele usa uma abordagem mais narrativa:

1. **Preparação do servo** (caps. 1-1:13) — Batismo e tentação
2. **Ministério na Galileia** (caps. 1:14-10:52) — Ensinos e milagres
3. **Ministério em Jerusalém** (caps. 11-16) — Paixão e Ressurreição

A palavra "imediatamente" (*euthys*) aparece cerca de 40 vezes em Marcos — mais que em qualquer outro evangelho. Marcos está sempre avançando, sempre em movimento. Jesus não perde um minuto.

### Características únicas de Marcos

**1. O Servo de Isaías 53**

Toda a estrutura de Marcos aponta para Marcos 10:45: "Porque o Filho do Homem não veio para ser servido, mas para servir, e dar a sua vida em resgate por muitos." Essa frase é o tema central do evangelho.

**2. O "Messias secreto"**

Marcos enfatiza que Jesus constantemente pede que as pessoas não divulghe seus milagres (1:44; 7:36; 8:30). Isso não é modéstia — é timing. Jesus não veio apenas para curar, mas para morrer. A revelação pública prematura atrapalharia o plano de salvação.

**3. A incapacidade dos discípulos**

Em Marcos, os discípulos são frequentemente retratados como lentos para entender (4:13; 6:52; 8:17-21). Isso não é uma crítica — é realismo. Mostra que Deus usa pessoas imperfeitas.

**4. A narrativa da paixão**

A segunda metade de Marcos (caps. 11-16) é desproporcionalmente longa — quase metade do evangelho é dedicada à última semana de Jesus. Isso mostra que a cruz é o objetivo central da vinda de Jesus.

### Marcos no contexto dos outros evangelhos

| Característica | Mateus | Marcos | Lucas | João |
|---|---|---|---|---|
| Público | Judeus | Romanos | Gregos | Universal |
| Jesus como... | Rei | Servo | Homem Perfeito | Deus |
| Tamanho | 28 caps | 16 caps | 24 caps | 21 caps |
| Tom | Didático | Ação | Narrativo | Teológico |

### Relevância para hoje

Marcos nos ensina que:
- A fé se manifesta em ação, não apenas em palavras
- O serviço é a marca do discipulado
- A cruz não é fracasso — é o caminho da vitória
- A urgência do evangelho é real — Jesus não perdia tempo
- Mesmo com dúvidas e falhas, Deus usa seus filhos

Estudar Marcos é ver Jesus em movimento — e ser desafiado a se mover também.`,
          versículosChave: [
            { ref: 'Marcos 10:45', texto: 'Porque o Filho do Homem não veio para ser servido, mas para servir, e dar a sua vida em resgate por muitos.' },
            { ref: 'Marcos 1:1', texto: 'Princípio do evangelho de Jesus Cristo, Filho de Deus.' },
            { ref: 'Marcos 16:15', texto: 'Ide por todo o mundo, e pregai o evangelho a toda criatura.' },
          ],
        },
        {
          id: 'aula-ev-2-2',
          título: 'O serviço de Jesus (Marcos 10:45)',
          tipo: 'video',
          duração: '15 min',
          videoUrl: 'https://www.youtube.com/watch?v=EOT1Mo_YERM',
          videoTítulo: 'Evangelho de Marcos – BibleProject Português',
          conteúdo: `## O serviço de Jesus (Marcos 10:45)

Marcos 10:45 é o versículo-chave de todo o evangelho: "Porque o Filho do Homem não veio para ser servido, mas para servir, e dar a sua vida em resgate por muitos." Se Mateus tem a Grande Comissão e João tem a glorificação do Filho, Marcos tem esta frase — a declaração central da missão de Jesus.

### Contexto: A luta pelos cargos

Marcos 10:32-45 narra um dos momentos mais dramáticos e humanos do evangelho. Jesus está a caminho de Jerusalém, onde será crucificado. Os discípulos, no entanto, estão preocupados com quem sentará à direita e à esquerda do Reino (10:37).

Tiago e João pedem os cargos mais altos. Os outros dez ficam indignados — não por causa da injustiça, mas por causa da ambição frustrada. É uma cena vergonhosa: o Mestre falando de morte e ressurreição, e os discípulos brigando por promoção.

### A inversão radical

Jesus chama todos e faz uma declaração que desmonta qualquer estrutura de poder humano:

> "Sabem que os que são considerados governantes das nações dominam sobre elas, e que os seus grandes exercem autoridade sobre elas. Não é assim entre vós; mas, entre vós, quem quiser ser grande, será vosso servo; e, entre vós, quem quiser ser o primeiro, será escravo de todos." (Marcos 10:42-44)

Jesus não está condenando a liderança — está redefine-la. No Reino de Deus, grandeza é medida por serviço, não por cargo.

### O exemplo supremo

Jesus não apenas ensina — Ele exemplifica. "O Filho do Homem não veio para ser servido, mas para servir." A palavra "Filho do Homem" é o título que Jesus mais usou para si mesmo. Vem de Daniel 7:13-14, onde o Filho do Homem recebe autoridade eterna sobre todas as nações.

Mas em Marcos, esse Rei cósmico se ajoelha. Nos capítulos seguintes (Marcos 14-15), Ele lava os pés dos discípulos (no relato de João 13, paralelo à mesma ceia), aceita a traição, é preso, julgado, açoitado e crucificado. O Rei serve até a morte — e a morte de cruz.

### "Dar a sua vida em resgate por muitos"

A palavra grega para "resgate" é *lytron* — um termo de mercado que significava o preço pago para libertar um escravo ou prisioneiro. Jesus não morreu como mártir ou exemplo moral. Ele morreu como pagamento — para libertar humanos da escravidão do pecado.

"Muitos" (*pollōn*) não significa "alguns" — é uma expressão semita para "abundância". Ele deu Sua vida por multidões.

### O que serviço cristão significa

1. **Serviço não é opcional** — é a identidade do cristão
2. **Serviço não é inferior** — é a forma mais elevada de liderança
3. **Serviço custa** — Jesus deu Sua vida; nós somos chamados a dar nossos dias
4. **Serviço não é autoimolação** — Jesus serviu com fronteiras saudáveis
5. **Serviço é motivado pelo evangelho** — não para ganhar pontos, mas porque fomos servidos primeiro

A igreja mais forte é a que mais serve — não a que mais acumula cargos ou títulos.`,
          versículosChave: [
            { ref: 'Marcos 10:45', texto: 'Porque o Filho do Homem não veio para ser servido, mas para servir, e dar a sua vida em resgate por muitos.' },
            { ref: 'Marcos 10:43-44', texto: 'Mas não é assim entre vós; mas, entre vós, quem quiser ser grande, será vosso servo; e, entre vós, quem quiser ser o primeiro, será escravo de todos.' },
            { ref: 'Daniel 7:13-14', texto: 'E foi-lhe dada a soberania, a honra e o reino... o seu domínio é eterno.' },
          ],
        },
        {
          id: 'aula-ev-2-3',
          título: 'Os milagres como evidência (caps. 1-8)',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## Os milagres como evidência (caps. 1-8)

Marcos dedica boa parte de sua narrativa aos milagres de Jesus. Enquanto Mateus foca nos discursos e João na teologia, Marcos quer ver Jesus em ação. Os milagres não são episódios avulsos — são evidências de que o Reino de Deus chegou.

### O primeiro milagre: O homem com espírito imundo (1:21-28)

Jesus ensina na sinagoga de Cafarnaum. Um homem com espírito imundo grita: "Que tens conosco, Jesus nazareno? Vieste para nos destruir?" (1:24). Jesus o repreende e o espírito sai. Todos ficam admirados: "Que é isto? Um ensino novo!" (1:27).

Marcos mostra que o autoridade de Jesus se estende ao mundo espiritual. Os demônios reconhecem quem Ele é antes dos humanos.

### Curando a sogra de Pedro (1:29-31)

Jesus cura a sogra de Pedro de uma febre. O detalhe é significativo: "Ela servia" (*diēkonēi*). A cura não é apenas física — é restauração para o serviço. O mesmo verbo grego que descreve o serviço de Jesus (10:45) aparece aqui.

### A multidão que não se afasta (1:45)

Jesus cura um leproso, que começa a divulgar o fato. A multidão fica tão grande que Jesus não pode mais entrar nas cidades abertamente. Mas isso não o impede — Ele continua pregando ao ar livre.

### A paralisia (2:1-12)

Quatro amigos derrubam o teto de uma casa para levar um paralítico a Jesus. Em vez de curá-lo imediatamente, Jesus diz: "Teus pecados estão perdoados" (2:5). Os escribas pensam: "Blasfêmia!" Jesus responde: "Qual é mais fácil, dizer ao paralítico: Os teus pecados estão perdoados, ou dizer: Levanta-te, toma o teu leito e anda?" (2:9). A cura física é evidência do poder espiritual.

### O homem da mão seca (3:1-6)

Na sinagoga, Jesus cura um homem com a mão seca no sábado. Os fariseus ficam furiosos — não pela cura, mas pela "violação" do sábado. Jesus confronta: "É lícito no sábado fazer o bem ou o mal, salvar a vida ou tirá-la?" (3:4). A religiosidade que se opõe ao bem não é religião de Deus.

### A tempestade calmada (4:35-41)

Jesus dorme no barco durante uma tempestade violenta. Os discípulos o acordam em pânico: "Mestre, não se te dá que pereçamos?" (4:38). Jesus repreende o vento e o mar: "Calma, pega!" (*Sigá, pimou*). O mar se acalma. "Quem é este, pois, que até o vento e o mar lhe obedecem?" (4:41).

Marcos mostra que Jesus tem autoridade sobre a natureza — algo que só Deus tem (Salmos 89:9).

### O endemoninhado Gadara (5:1-20)

Jesus encontra um homem possuído por uma legião de demônios que vive entre os túmulos, gritando e se autodeferindo. Ninguém conseguia controlá-lo. Jesus expulsa os demônios em porcos — e o homem fica "em sã consciência, assentado e bem-vestido" (5:15). A restauração é completa.

### A mulher com fluxo de sangue (5:25-34)

Uma mulher doente há 12 anos toca a borda da capa de Jesus e é curada. Jesus para no meio da multidão e pergunta: "Quem tocou nas minhas vestes?" (5:31). A mulher, com medo, confessa. Jesus diz: "Filha, a tua fé te salvou; vai em paz" (5:34). Ele a chama de "filha" — uma restauração de dignidade.

### A filha de Jairo (5:21-43)

A filha de um líder da sinagoga morre. Jesus vai à casa, segura a mão da menina e diz: "Talitha cumi" (menina, eu te digo, levanta-te). Ela se levanta. Ninguém poderia inventar essa história — Marcos a registra com detalhes pessoais que indicam testemunho ocular.

### Por que milagres importam?

1. **Confirmam a identidade de Jesus** — Ele é quem disse ser
2. **Manifestam o Reino de Deus** — onde Jesus governa, o mal é derrotado
3. **Revelam o caráter de Deus** — misericórdia, compaixão, autoridade
4. **Desafiam a religiosidade vazia** — os milagres frequentemente confrontam os religiosos
5. **Apontam para a cruz** — a maior demonstração de poder é vencer a morte

Os milagres de Marcos não são espetáculo — são evidência.`,
          versículosChave: [
            { ref: 'Marcos 1:27', texto: 'Que é isto? Um ensino novo! Com autoridade manda até nos espíritos imundos, e eles lhe obedecem!' },
            { ref: 'Marcos 2:5', texto: 'Jesus, vendo a fé deles, disse ao paralítico: Filho, estão perdoados os teus pecados.' },
            { ref: 'Marcos 4:39', texto: 'E, despertando, repreendeu o vento, e disse ao mar: Calma, pega! E o vento cessou, e fez-se grande bonança.' },
          ],
        },
        {
          id: 'aula-ev-2-4',
          título: 'A paixão e crucificação (caps. 14-15)',
          tipo: 'video',
          videoUrl: 'https://www.youtube.com/watch?v=ASvvA_0dwtc',
          videoTítulo: 'O julgamento e a morte de Jesus - Moises Brasil',
          duração: '15 min',
          conteúdo: `## A paixão e crucificação (caps. 14-15)

A segunda metade de Marcos (caps. 14-15) é dedicada integralmente à paixão de Jesus. Enquanto a primeira metade mostra Jesus em ação curando e ensinando, a segunda mostra o Servo Sofredor — aquele que dá sua vida por muitos.

### A unção em Betânia (14:3-9)

Uma mulher unge os pés de Jesus com perfume de nardo puro, que valia mais de 300 denários — quase um ano de salário. Os discípulos reclamam: "Para que este desperdício?" (14:4). Jesus responde: "Deixai-a; para que o dia da minha sepultura ela o faça" (14:8). A mulher antecipa a morte de Jesus. Marcos, escrevendo depois da ressurreição, entende: ela ungiu o Cordeiro de Deus.

### A Última Ceia (14:12-26)

A ceia pascal é o contexto da Última Ceia. Jesus está celebrando a Páscoa — o lembrate da libertação do Egito. Mas Ele transforma o ritual: "Isto é o meu corpo" (14:22); "Este é o meu sangue da aliança, que é derramado por muitos" (14:24).

A aliança não é a antiga (Moisés no Sinai) — é nova. O sangue de Jesus inaugura uma nova relação entre Deus e os homens. Jesus antecipa a traição de Pedro e a fuga dos discípulos, mas continua comendo. A ceia é misericórdia mesmo na traição.

### O Getsêmani (14:32-42)

Jesus leva Pedro, Tiago e João ao Getsêmani. Ele começa a "admirar-se e a angustiar-se profundamente" (14:33). A expressão grega *ekthambeisthai* e *ademonein* indicam um terror extremo — algo mais que tristeza. Jesus está enfrentando a separação do Pai pela primeira vez.

Ele reza: "Abba, Pai! Tudo é possível para ti; afasta este cálice de mim; não o que eu quero, mas o que tu queres" (14:36). O "cálice" não é a morte física — é o juízo de Deus contra o pecado que Jesus tomará sobre Si.

Os discípulos dormem três vezes. Jesus diz: "O espírito está pronto, mas a carne é fraca" (14:38). É uma das frases mais honestas da Bíblia.

### A traição e prisão (14:43-52)

Judas trai Jesus com um beijo. A ironia é devastadora: o sinal de amizade é usado para entregar o Amigo. Jesus diz: "Traiçoas o Filho do Homem com um beijo?" (14:45).

Pedro corta a orelha de Malco. Jesus o repreende e cura o servo (14:47). Até na agonia, Jesus serve. Todos fogem — inclusive um jovem que foge nu (14:51-52), possivelmente o próprio Marcos.

### O julgamento (14:53-15:15)

Jesus é julgado pelo Sinédrio (tribunal religioso) e depois por Pilatos (autoridade romana). O julgamento religioso é uma farsa — testemunhas se contradizem, o sumo sacerdote rasga suas vestes de "horror" à blasfêmia, mas é ele quem está blasfemando contra o Filho de Deus.

Pilatos pergunta: "Tu és o Rei dos Judeus?" (15:2). Jesus responde: "Tu o dizes" (15:2). A resposta não é evasiva — é uma declaração de que a verdade está nas palavras de Pilatos, mesmo que ele não as entenda.

Pilatos tenta libertar Jesus (costume pascal), mas a multidão grita: "Crucifica-o!" (15:13). O governador romano, que tinha autoridade para libertar, cede à pressão política.

### A crucificação (15:16-32)

Jesus é açoitado, cuspido, coroado de espinhos e levado a carregar a cruz. A tradição diz que a cruz pesava cerca de 30-60 kg. Simon de Cirene é forçado a carregá-la (15:21) — Marcos registra o nome dos filhos de Simon (Alexandre e Rufo), o que sugere que essas pessoas eram conhecidas na comunidade cristã.

Jesus é crucificado entre dois ladrões (15:27). As pessoas zombam: "Ajudou a outros; não pode ajudar a si mesmo" (15:31). A ironia é perfeita: Ele está ajudando exatamente ao não ajudar a si mesmo.

As trevas cobrem a terra por três horas (15:33). No meio do sofrimento, Jesus grita: "Eli, Eli, lema sabactâni?" (15:34) — "Meu Deus, meu Deus, por que me desamparaste?" (Salmo 22:1). Não é descrença — é a experiência real do abandono quando toma sobre Si os pecados da humanidade.

### A morte (15:37-39)

Jesus dá um grande brado e expira. O véu do templo se rasga de cima a baixo (15:38) — a barreira entre Deus e os homens é destruída para sempre. O centurião romano, que via muitas crucificações, declara: "Este homem era Filho de Deus!" (15:39).

Um gentio — um soldado romano — é o primeiro a reconhecer a identidade divina de Jesus em Marcos. Isso não é acaso: é a missão universal de Jesus se cumprindo.

### A sepultura (15:42-47)

José de Arimateia pede o corpo de Jesus e o sepulta em um túmulo novo, onde ninguém fora posto. Marcos detalha o processo: linho, mirra, a pedra rolada. A morte é real — Jesus não desmaiou, não fingiu. Ele morreu de verdade. Sem ressurreição real, não há salvação.`,
          versículosChave: [
            { ref: 'Marcos 14:36', texto: 'E disse: Abba, Pai! Tudo é possível para ti; afasta este cálice de mim; não o que eu quero, mas o que tu queres.' },
            { ref: 'Marcos 15:34', texto: 'E, à nona hora, Jesus clamarou com grande voz, dizendo: Eloi, Eloi, lema sabactâni? Que quer dizer: Meu Deus, meu Deus, por que me desamparaste?' },
            { ref: 'Marcos 15:39', texto: 'E, vendo o centurião que assim gritou e expirou, disse: Verdadeiramente este homem era Filho de Deus.' },
          ],
        },
        {
          id: 'aula-ev-2-5',
          título: 'A ressurreição e ascensão (cap. 16)',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## A ressurreição e ascensão (cap. 16)

Marcos 16 é um dos capítulos mais debatidos da Bíblia. A versão mais antiga dos manuscritos (como o Código Sinaiticus e o Vaticano) termina em 16:8, com as mulheres fugindo do túmulo com medo. Versões posteriores acrescentam aparições e a ascensão. Vamos estudar o que Marcos realmente escreveu.

### As mulheres no túmulo (16:1-4)

Maria Madalena, Maria, mãe de Tiago, e Salomé levam especiarias para ungir o corpo de Jesus. Elas se preocupam: "Quem nos fará rolar a pedra?" (16:3). A pedra pesava provavelmente entre 1 e 2 toneladas. Mas quando chegam, a pedra já está rolada.

Marcos registra a surpresa delas — a ressurreição não foi um evento que elas esperavam. As mulheres não iam esperando um túmulo vazio; iam esperando um corpo morto. Isso torna o testemunho mais crível — ninguém inventa uma história onde as testemunhas principais estão confusas e com medo.

### O anjo na tumba (16:5-8)

Dentro do túmulo, há um jovem vestido de branco. As mulheres ficam assustadas. O anjo diz: "Não vos assusteis. Buscais a Jesus nazareno, que foi crucificado; não está aqui; ressuscitou!" (16:6).

A proclamação é direta:
1. **Não temam** — a ressurreição é boa notícia, não motivo de pavor
2. **Ele não está aqui** — o túmulo está vazio, não é um erro
3. **Ele ressuscitou** — o verbo *ēgertēi* está no passivo divino — "Deus o ressuscitou"
4. **Vão, digam a Pedro** — Pedro, que o traiu, é o primeiro a ser mencionado. A graça precede a vergonha

"As mulheres saíram, e fugiram do túmulo, porque tremiam e estavam pasmadas; e não disseram nada a ninguém, porque tinham medo" (16:8). Esse é o final original do evangelho de Marcos. É um final abrupto — e isso é significativo.

### Por que esse final?

Marcos não é um escritor ruim — ele é dramático. O final em 16:8 deixa o leitor em suspense: "E agora?" A ressurreição aconteceu, mas a história não terminou. Marcos convida o leitor a participar da narrativa — a ser testemunha.

Alguns estudiosos sugerem que Marcos planejava escrever mais, mas o manuscrito original se perdeu. Outros argumentam que o final intencionalmente deixa a história aberta — porque a história de Jesus continua através da igreja.

### As aparições (se considerarmos 16:9-14)

Se incluirmos os versículos adicionais, Jesus aparece:
1. A Maria Madalena (16:9-11) — ela vai e anuncia aos que estavam com tristeza
2. A dois discípulos no caminho de Emaús (16:12-13) — Ele caminha com eles disfarçado
3. Aos onze discípulos (16:14) — Ele repreende a incredulidade

### A comissão e ascensão (16:15-20)

Jesus ordena: "Ide por todo o mundo, e pregai o evangelho a toda criatura" (16:15). Essa é a versão de Marcos da Grande Comissão.

Depois, Jesus é recebido no céu e assenta-se à direita de Deus (16:19). Marcos não descreve a ascensão em detalhes (Lucas faz isso em Atos 1). Ele foca na proclamação: "E eles, partindo, pregaram por toda a parte, e o Senhor cooperava, confirmando a palavra pelos sinais que se seguiam" (16:20).

### A evidência da ressurreição

Marcos não oferece um tratado teológico sobre a ressurreição — ele oferece fatos:
1. O túmulo estava vazio (16:6)
2. As testemunhas eram mulheres (em cultura onde testemunho feminino era questionado — se fosse invenção, teriam usado homens)
3. As testemunhas estavam confusas e com medo (não é como se fabrica um mito)
4. Jesus apareceu fisicamente (16:9, 12, 14)
5. A igreja nasceu e se espalhou apesar da perseguição

### O que a ressurreição significa

- A morte foi derrotada de vez
- Jesus é quem disse ser — o Filho de Deus
- Os crentes têm esperança de ressurreição própria
- O julgamento final é certo
- O evangelho é verdadeiro e tem poder para salvar

Marcos começa com "Início do evangelho de Jesus Cristo, Filho de Deus" (1:1) e termina com o evangelho sendo pregado a toda criatura. A história de Jesus não terminou — continua em cada geração, em cada discípulo, em cada nação.`,
          versículosChave: [
            { ref: 'Marcos 16:6', texto: 'Não vos assusteis. Buscais a Jesus nazareno, que foi crucificado; não está aqui; ressuscitou.' },
            { ref: 'Marcos 16:15', texto: 'E disse-lhes: Ide por todo o mundo, e pregai o evangelho a toda criatura.' },
            { ref: 'Marcos 16:19', texto: 'E, depois de lhes ter falado, foi recebido no céu, e assentou-se à direita de Deus.' },
          ],
        },
      ],
    },
    {
      id: 'mod-lucas-filho',
      título: 'Lucas: O Filho do Homem',
      descrição: 'O evangelho que enfatiza a humanidade de Jesus, a compaixão e os marginalizados',
      ícone: '🌟',
      aulas: [
        {
          id: 'aula-ev-3-1',
          título: 'Introdução ao Evangelho de Lucas',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## Introdução ao Evangelho de Lucas

Lucas é o evangelho mais literário, mais detalhado e mais focado na humanidade de Jesus. Escrito por um médico gentio, é dirigido a um público grego, e retrata Jesus como o Filho do Homem — perfeito em sua humanidade, cheio de compaixão e misericórdia.

### Autor e data

O autor é Lucas, mencionado em Colossenses 4:14 como "o médico amado". Lucas não era apóstolo — era companheiro de Paulo em suas viagens missionárias (Atos 16:10-17; 20:5-15; 27:1-28:16). Ele escreveu tanto o evangelho quanto Atos dos Apóstolos — dois volumes que formam a história do cristianismo primitivo.

Lucas era um homem culto, meticuloso e detalhista. Ele investigou cuidadosamente antes de escrever (Lucas 1:1-4), entrevistando testemunhas oculares e organizando os relatos em ordem cronológica. Seu evangelho é o mais longo do Novo Testamento.

A data provável é entre 60 e 80 d.C.

### Público-alvo: O mundo grego

Lucas escreveu para Teófilo (1:3), provavelmente um convertido romano/gentio de classe alta. Mas o público real é o mundo grego — pessoas educadas, curiosas, que valorizam história, humanidade e universalismo.

Isso explica por que Lucas:
- Cita menos o Antigo Testamento que Mateus
- enfatiza a universalidade do evangelho (simbólico na genealogia, que vai de Adão — não apenas de Abraão)
- Inclui mais parábolas exclusivas (o Bom Samaritano, o Filho Pródigo, o Rico e Lázaro)
- Destaca o papel das mulheres (Maria, Ana, a viúva de Naim, a pecadora, as discípulas)
- Mostra Jesus preocupado com pobres, marginalizados e pecadores

### Título e tema

O título mais provável é "Evangelho segundo Lucas". O tema pode ser resumido em uma frase: **A salvação de Deus para todos os homens**.

Lucas mostra Jesus como o Filho do Homem — um título que combina:
- Autoridade messiânica (Daniel 7:13-14)
- Humanidade plena (Ele come, bebe, chora, se cansa)
- Universalidade (o Filho do Homem veio para todos)

### Estrutura

1. **Prólogo** (1:1-4) — Introdução histórica
2. **Infância** (1:5-2:52) — Nascimento de Jesus e João Batista
3. **Ministério na Galileia** (3:1-9:50) — Preparação e início
4. **Viagem a Jerusalém** (9:51-19:27) — O caminho da cruz
5. **Ministério em Jerusalém** (19:28-21:38) — Ensinos finais
6. **Paixão e Ressurreição** (22-24) — A morte e vitória

A "viagem a Jerusalém" (9:51-19:27) é exclusiva de Lucas — quase 10 capítulos dedicados ao caminho. É nessa seção que estão a maioria das parábolas exclusivas de Lucas.

### Parábolas exclusivas de Lucas

Lucas preserva parábolas que não aparecem em nenhum outro evangelho:
- **Bom Samaritano** (10:25-37) — quem é o próximo?
- **Filho Pródigo** (15:11-32) — a misericórdia do Pai
- **Rico e Lázaro** (16:19-31) — o destino eterno
- **Juiz injusto** (18:1-8) — a necessidade de orar sempre
- **Fariseu e publicano** (18:9-14) — humildade diante de Deus

### O retrato de Jesus em Lucas

Lucas retrata Jesus como:
- **Amigável com pecadores** — come com publicanos e fariseus
- **Compasivo com marginalizados** — cura leprosos, ressuscita mortos, perdoa adúlteras
- **Homem de oração** — oração é um tema constante (Jesus ora antes de cada decisão importante)
- **Universal** — o evangelho é para judeus e gentios
- **Misericordioso** — mais enfase na graça que na Lei

### Relevância para hoje

Lucas nos ensina que:
- A fé não é para os "certinhos" — é para quem precisa de misericórdia
- Jesus se importa com os pobres e marginalizados
- A oração é central na vida cristã
- O perdão é o coração do evangelho
- A salvação é para todos — sem distinção de raça, classe ou gênero

Se Mateus é o evangelho do Rei, Marcos do Servo, e João de Deus, Lucas é o evangelho da humanidade — daquele que entende nossas dores, nossas dúvidas e nossas necessidades.`,
          versículosChave: [
            { ref: 'Lucas 1:3-4', texto: 'Também eu, depois de ter feito diligente investigação de tudo desde o princípio, resolvi escrever-te ordenadamente, ó excelente Teófilo.' },
            { ref: 'Lucas 19:10', texto: 'Porque o Filho do Homem veio buscar e salvar o que se havia perdido.' },
            { ref: 'Lucas 4:18-19', texto: 'O Espírito do Senhor está sobre mim, porque me ungiu para pregar boas novas aos pobres... para libertar os cativos.' },
          ],
        },
        {
          id: 'aula-ev-3-2',
          título: 'O nascimento narrado (caps. 1-2)',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## O nascimento narrado (caps. 1-2)

Lucas 1-2 é a narrativa mais detalhada do nascimento de Jesus no Novo Testamento. É rica em poesia, profecia e humanidade. Mateus foca em José; Lucas foca em Maria. Juntos, completam o retrato.

### A promessa a Zacarias (1:5-25)

Zacarias e Elisabete são sacerdotes idosos e estéreis — uma dupla vergonha na cultura judaica. Zacarias está servindo no templo quando um anjo aparece: Gabriel. A Elisabete nascerá um filho, João, que preparará o caminho do Senhor.

Zacarias duvida: "Como saberei isso? Pois sou velho, e minha mulher é de idade avançada" (1:18). Gabriel o torna mudo até o nascimento do filho. A incredulidade tem consequências — mas Deus não abandona o projeto.

### O cântico de Zacarias (1:68-79)

Quando João nasce, Zacarias recupera a voz e canta um dos hinos mais belos do AT:

> "Bendito o Senhor, o Deus de Israel, porque visitou e redimiu o seu povo... para nos livrar de nossos inimigos e das mãos de todos os que nos odeiam; para misericordia conosco... para dar ao nosso povo, para conhecer a salvação, pela remissão dos seus pecados" (1:68-77)

O cântico conecta a missão de João com a promessa abraâmica e davídica.

### A Anunciação a Maria (1:26-38)

Gabriel aparece a Maria, uma jovem virgem de Nazaré, noiva de José. A saudação é surpreendente: "Alegre-te, muito graciada, o Senhor é contigo" (1:28). Maria fica perturbada — não de alegria, mas de confusão.

O anjo anuncia: "Conceberás e darás à luz um filho, e chamarás o seu nome Jesus" (1:31). A pergunta de Maria não é de incredulidade, mas de logística: "Como se fará isso, pois não conheço homem?" (1:34).

A resposta é sobrenatural: "O Espírito Santo virá sobre ti, e o poder do Altíssimo te cobrirá com a sua sombra; por isso também o santo que nascer de ti será chamado Filho de Deus" (1:35).

### O cântico de Maria — o Magnificat (1:46-55)

Maria responde com um dos hinos mais revolucionários da Bíblia:

> "A minha alma glorifica ao Senhor, e o meu espírito se alegra em Deus, meu Salvador, porque olhou para a humildade da sua serva... Depois disto, todas as gerações me chamarão bem-aventurada, porque o Todo-Poderoso coisas grandes me fez" (1:46-49)

O Magnificat é um cântico de justiça social:
- Deus derruba os soberbos e exalta os humildes
- Deus satisfaz os famintos e envia embora os ricos
- Deus lembra Sua misericórdia a Abraão e sua descendência

Maria não é uma rainha distante — é uma mulher humilde que entende o plano revolucionário de Deus.

### O nascimento de João (1:57-80)

Elisabete dá à luz João. Os vizinhos querem chamá-lo Zacarias, mas o pai, escrevendo numa tábua, declara: "João é o seu nome" (1:63). A língua se desata, e Zacarias canta.

### O nascimento de Jesus (2:1-20)

Lucas situa o nascimento num contexto histórico: "Saiu um decreto de César Augusto para que se fizesse um censo em toda a terra" (2:1). O império romano, sem saber, cumpre o plano divino: Jesus nasce em Belém, a cidade de Davi, conforme Miquéias 5:2.

Maria deita-o em manjedoura — não há lugar para eles na hospedaria (2:7). A pobreza da família não é acidente — é teologia. O Rei dos reis nasce num estábulo.

Os anjos anunciam aos pastores: "Hoje, na cidade de Davi, vos nasceu o Salvador, que é o Cristo, o Senhor" (2:11). A notícia vai para pastores — pessoas de baixa classe, marginalizadas socialmente. Deus sempre anuncia primeiro aos humildes.

### O cântico dos anjos (2:14)

> "Glória a Deus nas alturas, e na terra paz aos homens, de boa vontade" (2:14)

Essa é a proclamação do nascimento — não para reis e sacerdotes, mas para pastores e marginalizados. A paz de Deus (*shalom*) é para quem a aceita.

### A apresentação no templo (2:21-38)

Jesus é circumcidado e apresentado no templo. Simeão, um justo e devoto, espera a consolação de Israel. Quando vê Jesus, canta o *Nunc Dimittis*: "Agora soltas o teu servo em paz, segundo a tua palavra, porque os meus viram a tua salvação" (2:29-30).

Ana, uma profetisa viúva de 84 anos, também reconhece o Messias. Lucas destaca mulheres idosas e marginalizadas como testemunhas — típico do seu evangelho.

### O menino Jesus no templo (2:41-52)

Aos 12 anos, Jesus fica no templo discutindo com os mestres. Quando Maria e José O encontram, Ele diz: "Por que me procuráveis? Não sabíeis que me cumpria estar na casa do meu Pai?" (2:49). A primeira declaração sobre Sua missão divina.

Lucas conclui: "Jesus crescia em sabedoria, em estatura e em graça diante de Deus e dos homens" (2:52). A incarnação é real — Jesus cresceu, aprendeu, amadureceu como qualquer ser humano.`,
          versículosChave: [
            { ref: 'Lucas 1:37', texto: 'Porque nada é impossível a Deus.' },
            { ref: 'Lucas 1:46-47', texto: 'A minha alma glorifica ao Senhor, e o meu espírito se alegra em Deus, meu Salvador.' },
            { ref: 'Lucas 2:11', texto: 'Hoje, na cidade de Davi, vos nasceu o Salvador, que é o Cristo, o Senhor.' },
            { ref: 'Lucas 2:29-30', texto: 'Agora soltas o teu servo em paz, segundo a tua palavra, porque os meus viram a tua salvação.' },
          ],
        },
        {
          id: 'aula-ev-3-3',
          título: 'Jesus e os marginalizados',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## Jesus e os marginalizados

Uma das marcas mais marcantes do evangelho de Lucas é o retrato de Jesus como alguém que busca os marginalizados, os rejeitados e os pecadores. Enquanto Mateus enfatiza a ética e João a divindade, Lucas enfatiza a compaixão.

### Jesus come com pecadores (5:29-32)

Jesus é convidado para uma ceia na casa de Levi (Mateus), um publicano odiado pelos judeus. Os fariseus e escribas reclamam: "Por que comeis e bebeis com publicanos e pecadores?" (5:30).

Jesus responde: "Não são os sadios que precisam de médico, mas os doentes. Não vim chamar justos, mas pecadores, ao arrependimento" (5:31-32). Jesus não endossa o pecado — Ele entra no meio dele para transformar.

### A mulher pecadora (7:36-50)

Uma mulher "pecadora" entra na casa de um fariseu onde Jesus está jantando. Ela chora, lava os pés de Jesus com suas lágrimas, os enxuga com seus cabelos, e os unge com perfume.

O fariseu pensa: "Se este fosse profeta, saberia quem e que mulher o toca, pois é pecadora" (7:39). Jesus conta a parábola de dois devedores — um perdoa muito, outro pouco. Conclui: "Perdoam-se-lhe muitos pecados porque muito amou" (7:47).

A mulher é identificada como pecadora, mas Lucas nunca diz exatamente que pecados cometeu. A mensagem é: a graça de Deus não tem limites para quem se arrepende.

### O Bom Samaritano (10:25-37)

Um mestre da Lei pergunta: "Quem é o meu próximo?" (10:29). Jesus conta a parábola: um homem é assaltado e deixado à beira da estrada. Um sacerdote e um levita passam — pessoas religiosas que evitam contato com sangue e impurezas. Um samaritano — desprezado pelos judeus — para, cuida do ferido e paga seus cuidados.

A pergunta de Jesus é transformadora: "Qual destes três te parece que foi próximo do que caiu nas mãos dos salteadores?" (10:36). O próximo não é quem recebe ajuda — é quem a dá. E pode ser seu inimigo.

### O Filho Pródigo (15:11-32)

A parábola mais famosa de Jesus, exclusiva de Lucas:

Um filho mais novo pede sua herança, parte para uma terra distante e desperdiça tudo. Quando a fome aperta, ele "foi pegar-se a um daqueles cidadãos daquela terra, que o mandou para os seus campos a alimentar porcos" (15:15). Alimentar porcos é a pior situação para um judeu — é impureza e humilhação absolutas.

"Em si voltando" (15:17), ele decide voltar: "Pai, pequei contra o céu e diante de ti" (15:18). Mas o pai o vê de longe, corre, abraça-o e beija-o (15:20). Antes que o filho termine de pedir desculpas, o pai já está ordenando a festa.

A parábola revela o caráter de Deus:
- Ele espera (o pai olha pela janela)
- Ele corre (inverossímil para um patriarca oriental)
- Ele restaura (o anel, o manto, as sandálias)
- Ele celebra (a festa pelo filho perdido)

O irmão mais velho, que serviu fielmente, se ressente. O pai sai e o persuade: "Tu estás sempre comigo, e tudo o que é meu é teu" (15:31). A misericórdia de Deus é para todos — para o rebelde que volta e para o religioso que reclama.

### Zaqueu (19:1-10)

Zaqueu, chefe dos publicanos, é rico e odiado. Ele sobe numa árvore para ver Jesus. Jesus para e diz: "Zaqueu, desce depressa, porque hoje me convém pousar em tua casa" (19:5). A multidão murmura: "Foi pousar em casa de um pecador" (19:7).

A graça transforma Zaqueu: "Senhor, a metade dos meus bens dou aos pobres, e, se em algo defraudei alguém, restituo quatro tantos" (19:8). Jesus declara: "Hoje houve salvação nesta casa" (19:9).

### O que isso nos ensina

1. **Ninguém é longe demais para a graça** — Jesus vai onde os religiosos não vão
2. **A compaixão não tem fronteiras** — samaritanos, publicanos, pecadores
3. **O perdão é o coração do evangelho** — não a Lei, não a religiosidade
4. **A restauração é completa** — não perdão parcial, mas festa
5. **A graça desafia o legalismo** — os fariseus são frequentemente antagonistas

Se você se sente marginalizado, rejeitado ou indigno — Lucas é o seu evangelho. Jesus veio para você.`,
          versículosChave: [
            { ref: 'Lucas 15:7', texto: 'Assim, vos digo que haverá mais alegria no céu por um pecador que se arrepende do que por noventa e nove justos que não necessitam de arrependimento.' },
            { ref: 'Lucas 15:20', texto: 'Mas, ainda ele longe, o viu o pai, e se moveu de compaixão, e, correndo, lançou-se-lhe ao pescoço, e o beijou.' },
            { ref: 'Lucas 19:10', texto: 'Porque o Filho do Homem veio buscar e salvar o que se havia perdido.' },
            { ref: 'Lucas 10:33', texto: 'Mas um samaritano, de caminho, chegou perto dele, e, vendo-o, moveu-se de compaixão.' },
          ],
        },
        {
          id: 'aula-ev-3-4',
          título: 'Jesus e a oração',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## Jesus e a oração

A oração é um tema central no evangelho de Lucas. Mais que qualquer outro evangelista, Lucas retrata Jesus como um homem de oração — alguém que toma decisões, enfrenta crises e mantém comunhão com o Pai através da oração.

### Onde Jesus ora

Lucas registra mais momentos de oração de Jesus que Mateus e Marcos combinados:

**1. O batismo (3:21)** — Jesus ora enquanto o Espírito Santo desce sobre Ele. A oração precede o ministério público.

**2. O lugar solitário (5:16)** — "Jesus se retirava para lugares solitários e orava." Isso não é exceção — é padrão. A vida pública de Jesus é sustentada pela vida secreta de oração.

**3. Antes de escolher os doze (6:12-16)** — "Jesus saiu a uma montanha para orar, e passou a noite inteira em oração a Deus." Na manhã seguinte, escolhe os doze. A decisão mais importante do ministério é precedida pela oração mais longa registrada.

**4. A transfiguração (9:28-29)** — "Enquanto orava, a aparência do seu rosto se transfigurou." A oração revela a glória. Não é coincidência — a oração nos coloca diante da realidade divina.

**5. Antes de ensinar o Pai Nosso (11:1)** — Os discípulos pedem: "Senhor, ensina-nos a orar." Jesus responde com o Pai Nosso. O ensino mais essencial da oração vem da necessidade dos discípulos.

**6. Alegria em oração (10:21)** — "Na mesma hora Jesus regozijou-se no Espírito Santo." A oração não é só súplica — é alegria, comunhão, louvor.

**7. Em Getsemani (22:39-46)** — A oração mais agonizante da Bíblia: "Pai, se queres, afasta de mim este cálice; contudo, não a minha vontade, mas a tua se cumpra" (22:42). Jesus transpira sangue — a oração de entrega total.

**8. Na cruz (23:34, 46)** — Jesus ora enquanto morre: "Pai, perdoa-lhes, porque não sabem o que fazem" (23:34) e "Pai, nas tuas mãos entrego o meu espírito" (23:46). A oração continua mesmo no sofrimento extremo.

### O Pai Nosso (11:1-4)

Lucas apresenta uma versão mais curta do Pai Nosso que Mateus:

> "Pai, seja santificado o teu nome. Venha o teu reino. Dá-nos o pão necessário dia a dia. Perdoa-nos os nossos pecados, porque também nós perdoamos a todo o que nos deve. E não nos deixes cair em tentação." (11:2-4)

Comparado com Mateus 6:9-13, Lucas omite "Seja feita a tua vontade, assim na terra como no céu" e "Livra-nos do maligno". Isso não é contradição — é contexto diferente. Lucas provavelmente preserva uma versão mais curta e prática.

As seis petições:
1. **Santificação do nome de Deus** —prioridade de Deus sobre nós
2. **Vinda do Reino** — esperança escatológica
3. **Pão necessário** —dependência diária
4. **Perdão** —relação horizontal restaurada
5. **Libertação da tentação** —proteção espiritual

### O ensino sobre oração

Lucas preserva ensinos exclusivos sobre oração:

**1. Parábola do amigo importuno (11:5-8)** — Um homem pede pão emprestado à meia-noite. O amigo não quer abrir, mas, por causa da importunidade, abre. Jesus conclui: "Pedi, e ser-vos-á dado; buscareis, e achareis; batei, e ser-vos-á aberto" (11:9).

**2. O juiz injusto (18:1-8)** — Um juiz que não teme a Deus nem respeita homens acaba atendendo a viúva insistente. "E Deus, porventura, não fará justiça aos seus eleitos, que cloram dia e noite para ele?" (18:7).

**3. O fariseu e o publicano (18:9-14)** — Dois homens oram no templo. O fariseu agradece por não ser como os outros. O publicano diz: "Deus, tem misericórdia de mim, pecador!" Apenas o segundo vai para casa justo.

### O que a oração significa em Lucas

1. **A oração é precedente** — Jesus ora antes de decisões importantes
2. **A oração é frequente** — não é exceção, mas hábito
3. **A oração é honesta** — Jesus expressa medo, angústia e entrega
4. **A oração é para todos** — Jesus ensina aos discípulos
5. **A oração transforma** — a transfiguração, a alegria, a entrega na cruz

Lucas nos mostra que a oração não é técnica — é relacionamento. É falar com o Pai como quem confia, que pede, que obedece, que se entrega.`,
          versículosChave: [
            { ref: 'Lucas 5:16', texto: 'Jesus, porém, frequentemente se retirava para lugares solitários e orava.' },
            { ref: 'Lucas 11:1', texto: 'Aconteceu que, estando Jesus em oração em certo lugar, quando cessou, um dos seus discípulos lhe disse: Senhor, ensina-nos a orar.' },
            { ref: 'Lucas 11:9', texto: 'Pedi, e ser-vos-á dado; buscareis, e achareis; batei, e ser-vos-á aberto.' },
            { ref: 'Lucas 22:42', texto: 'Pai, se queres, afasta de mim este cálice; contudo, não a minha vontade, mas a tua se cumpra.' },
          ],
        },
        {
          id: 'aula-ev-3-5',
          título: 'A ressurreição em Lucas',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## A ressurreição em Lucas

Lucas 24 é o relato mais detalhado e teologicamente rico da ressurreição de Jesus. Enquanto Marcos termina em 16:8 com as mulheres assustadas, Lucas dá a continuação — e é gloriosa.

### As mulheres no túmulo (24:1-12)

Maria Madalena, Joana, Maria, mãe de Tiago e outras mulheres vão ao túmulo com especiarias. A pedra já está rolada. Elas entram, não encontram o corpo de Jesus.

"Dois homens com vestes resplandecentes" aparecem e dizem: "Por que buscais entre os mortos o que está vivo? Não está aqui, mas ressuscitou" (24:5-6). A pergunta é devastadora — se Jesus vive, por que buscar entre os mortos?

As mulheres lembram das palavras de Jesus e vão anunciar aos onze. Mas "esta palavra lhes pareceu incrível, e não lhes creram" (24:11). A incredulidade diante da ressurreição é um tema em todos os evangelhos — mas Lucas é particularmente honesto.

### Os discípulos de Emaús (24:13-35)

Este é o dos relatos mais bonitos do Novo Testamento. Dois discípulos caminham de Jerusalém a Emaús, desanimados. Jesus caminha com eles, mas eles não O reconhecem (24:16).

Jesus pergunta o que os aflige. Um deles responde: "Tu és o único de Jerusalém que não sabes destas coisas que ali aconteceram?" (24:18). Jesus pergunta: "Que coisas?" Eles respondem: "Sobre Jesus de Nazaré, que foi profeta poderoso em obras e palavras... mas nós esperávamos que fosse ele o que resgataria a Israel" (24:19-21).

Jesus os corrige: "Ó insensatos, e de coração tardio para crer em tudo o que os profetas disseram!" (24:25). Então, "principiando por Moisés e por todos os profetas, explicou-lhes o que dele dizia em todas as Escrituras" (24:27).

Quando chegam a Emaús, Jesus faz como se fosse adiante. Eles O convidam a ficar: "Fica conosco, porque é tarde" (24:29). Ao partir, eles O reconhecem: "Não nos ardia o coração em nós, quando nos falava e nos explicava as Escrituras?" (24:32).

A Ceia de Emaús é um micro-evangelho:
- Jesus caminha com os desanimados
- Ele explica as Escrituras
- Ele se revela no partir (no partir do pão)
- A fé nasce da Palavra e da comunhão

### Jesus aparece aos discípulos (24:36-49)

Jesus aparece no meio dos discípulos assustados: "A paz esteja convosco" (24:36). Eles pensam que é espírito. Jesus prova Sua realidade física: "Vede as minhas mãos e os meus pés, que sou eu mesmo; tocai em mim e vede, porque um espírito não tem carne nem ossos, como vedes que eu tenho" (24:39).

Ele come peixe assado (24:42-43) — a ressurreição não é abstrata, é corporal.

Jesus então dá a chave interpretativa da Sua missão:

> "Assim está escrito, e assim cumpria-se que o Cristo havia de padecer e ressuscitar dentre os mortos ao terceiro dia, e que em seu nome se pregasse arrependimento e remissão dos pecados, começando por Jerusalém." (24:46-47)

A ressurreição não é um acidente — é o cumprimento das Escrituras. E ela tem um propósito: arrependimento e remissão dos pecados para todas as nações.

### A ascensão (24:50-53)

Jesus leva os discípulos até Betânia, estende as mãos e os abençoa. Enquanto os abençoa, é elevado ao céu (24:51). Os discípulos voltam a Jerusalém "com grande alegria" (24:52) e ficam "continuamente no templo, louvando e bendizendo a Deus" (24:53).

O evangelho termina com louvor — não com desespero. A ressurreição transformou o medo em alegria, a fuga em adoração.

### A teologia da ressurreição em Lucas

1. **A ressurreição é corporal** — Jesus come, toca, é tocado
2. **A ressurreição é o cumprimento das Escrituras** — não é acidente
3. **A ressurreição é para arrependimento** — muda vidas
4. **A ressurreição é para remissão** — perdoa pecados
5. **A ressurreição é universal** — para todas as nações
6. **A ressurreição é razão de alegria** — não de medo

Lucas nos mostra que a ressurreição não é apenas um evento histórico — é a base de tudo: da fé, da igreja, da missão e da esperança. Se Jesus não ressuscitou, a fé é vã. Mas Ele ressuscitou — e isso muda tudo.`,
          versículosChave: [
            { ref: 'Lucas 24:5-6', texto: 'Por que buscais entre os mortos o que está vivo? Não está aqui, mas ressuscitou.' },
            { ref: 'Lucas 24:27', texto: 'E, principiando por Moisés e por todos os profetas, explicou-lhes o que dele dizia em todas as Escrituras.' },
            { ref: 'Lucas 24:46-47', texto: 'Assim está escrito, e assim cumpria-se que o Cristo havia de padecer e ressuscitar dentre os mortos ao terceiro dia.' },
            { ref: 'Lucas 24:52', texto: 'E, tendo-lhes feito uma inclinação, voltou para Jerusalém com grande alegria.' },
          ],
        },
      ],
    },
    {
      id: 'mod-joao-verbo',
      título: 'João: O Verbo Encarnado',
      descrição: 'O evangelho teológico que proclama a divindade de Jesus — "No princípio era o Verbo"',
      ícone: '✨',
      aulas: [
        {
          id: 'aula-ev-4-1',
          título: 'Introdução ao Evangelho de João',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## Introdução ao Evangelho de João

João é o evangelho mais diferente dos quatro. Enquanto Mateus, Marcos e Lucas (os "sinóticos") compartilham muita matéria comum, João é quase inteiramente independente. É mais teológico, mais simbólico e mais profundo. Se os outros três são retratos, João é um vitral colorido.

### Autor e data

O autor é "o discípulo a quem Jesus amava" (João 13:23; 19:26; 20:2; 21:7, 20) — tradição universal o identifica como João, filho de Zebedeu, irmão de Tiago.

João é o último dos evangelhos a ser escrito, provavelmente entre 85 e 95 d.C. Ele é mais velho que os outros — escreve de memória, refletindo décadas de contemplação teológica.

### Público-alvo

João escreve para cristãos que enfrentam perseguição e dúvida. Seu evangelho é defesa da divindade de Jesus contra seitas que negavam a encarnação (como os docetas, que diziam que Jesus apenas parecia humano).

João também é evangelístico — ele espera que seus leitores creiam e tenham vida eterna (20:31).

### A estrutura teológica

João não é organizado cronologicamente como os sinóticos. Ele reorganiza a vida de Jesus em torno de sete sinais e sete "Eu Sou":

**Sete sinais (milagres):**
1. Transformar água em vinho (2:1-11)
2. Curar o filho do oficial (4:46-54)
3. Curar o paralítico na piscina de Betesda (5:1-15)
4. Multiplicar pães e peixes (6:1-14)
5. Caminhar sobre as águas (6:16-21)
6. Curar o cego de nascença (9:1-41)
7. Ressuscitar Lázaro (11:1-44)

**Sete "Eu Sou":**
1. "Eu sou o pão da vida" (6:35)
2. "Eu sou a luz do mundo" (8:12)
3. "Eu sou a porta" (10:7)
4. "Eu sou o bom pastor" (10:11)
5. "Eu sou a ressurreição e a vida" (11:25)
6. "Eu sou o caminho, a verdade e a vida" (14:6)
7. "Eu sou a videira verdadeira" (15:1)

Os "Eu Sou" (*egō eimi*) são uma referência direta ao nome de Deus em Êxodo 3:14 — "Eu Sou o que Sou". João está afirmando a divindade de Jesus de forma inequívoca.

### Os grandes temas de João

**1. A divindade de Jesus**

João não começa com genealogia ou nascimento — começa com eternidade: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus" (1:1). Jesus não é apenas o Messias — Ele é o Verbo eterno, a Segunda Pessoa da Trindade, criador de todas as coisas.

**2. A encarnação**

"O Verbo se fez carne e habitou entre nós" (1:14). João celebra o mistério de Deus se tornar humano. A palavra grega *eskēnōsen* ("habitou") vem de *skēnē* ("tenda") — Deus montou Sua tenda entre os humanos, como na tenda do encontro no deserto.

**3. A vida eterna**

A expressão "vida eterna" (*zōē aiōnios*) aparece 17 vezes em João. Não é apenas vida futura — é vida presente, abundante, em comunhão com Deus: "Eu vim para que tenham vida, e a tenham em abundância" (10:10).

**4. O Espírito Santo**

João apresenta o Espírito Santo como "Paráclito" — o Consolador, o Advogado (14:16, 26; 15:26; 16:7). O Espírito ensina, recorda, convence e glorifica a Jesus.

**5. O amor**

A última ceia em João (caps. 13-17) é a mais íntima dos quatro evangelhos. Jesus lava os pés dos discípulos, ensina sobre o amor, e ora pela unidade da igreja. O mandamento novo é: "Amai-vos uns aos outros como eu vos amei" (13:34).

### João e os sinóticos

| Aspecto | Sinóticos | João |
|---------|-----------|------|
| Origem eterna de Jesus | Implícita | Explícita |
| Início do ministério | Batismo | Bodas de Caná |
| Duração do ministério | ~1 ano | ~3 anos |
| Ceia de despedida | Páscoa | Dia anterior à Páscoa |
| Cenário da paixão | Getsêmani | Getsêmani + altares |
| Tempo de crucificação | 6ª hora | 6ª hora (joanine) |
| Sepultura | José de Arimateia | José + Nicodemos |

### Por que ler João?

1. É o evangelho mais profundo teologicamente
2. Revela a identidade de Jesus como Deus
3. Oferece a visão mais íntima da última ceia
4. Contém a oração sacerdotal mais bela (cap. 17)
5. É evangelístico — aponta para a fé e a vida eterna

João é o evangelho para quem quer conhecer Jesus não apenas como profeta ou rei, mas como Deus encarnado — o Verbo eterno que veio habitar entre nós.`,
          versículosChave: [
            { ref: 'João 1:1', texto: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
            { ref: 'João 1:14', texto: 'E o Verbo se fez carne, e habitou entre nós, e vimos a sua glória, como a do unigênito do Pai, cheio de graça e de verdade.' },
            { ref: 'João 20:31', texto: 'Mas estes foram escritos para que creiais que Jesus é o Cristo, o Filho de Deus, e, crendo, tenhais vida em seu nome.' },
          ],
        },
        {
          id: 'aula-ev-4-2',
          título: 'O Prólogo (João 1:1-18)',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## O Prólogo (João 1:1-18)

João 1:1-18 é a introdução do evangelho de João — e é um dos textos mais densos, belos e teológicos de toda a Bíblia. São apenas 18 versículos, mas neles cabe a essência do cristianismo: quem é Jesus e o que Ele fez.

### O Verbo eterno (1:1-3)

> "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus. Este era no princípio com Deus. Todas as coisas foram feitas por meio dele, e sem ele nada do que foi feito se fez." (1:1-3)

"No princípio" (*en archē*) ecoa Gênesis 1:1. João está dizendo: antes de tudo — antes do tempo, do espaço, da matéria — o Verbo já existia.

"Verbo" (*logos*) é uma palavra carregada de significado:
- No judaísmo, a "Sabedoria" de Deus é o agente da criação (Proverbios 8:22-31)
- No helenismo, o *logos* é o princípio racional que governa o universo
- João unifica ambas: o Verbo é a expressão pessoal de Deus

O Verbo "estava com Deus" (*pros ton theon*) — há distinção de pessoas. "E o Verbo era Deus" (*theos ēn ho logos*) — há identidade de essência. O Verbo é de mesma substância que o Pai — o que a igreja posteriormente chamaria de *homoousios*.

"Todas as coisas foram feitas por meio dele" — o Verbo é criador. João 1:3 paralleliza Colossenses 1:16 e Hebreus 1:2. Toda a existência depende dEle.

### A vida e a luz (1:4-5)

> "Nele estava a vida, e a vida era a luz dos homens. E a luz resplandece nas trevas, e as trevas não prevaleceram contra ela." (1:4-5)

A vida (*zōē*) não é biológica — é existência espiritual, comunhão com Deus. A luz é conhecimento, verdade, revelação. As trevas são ignorância, pecado, rebelião. E as trevas não venceram — o mal é derrotado.

### João Batista (1:6-8)

> "Houve um homem enviado de Deus, cujo nome era João. Este veio para testemunhar, para que testificasse da luz, para que todos cressem por ele. Ele não era a luz, mas veio para que testificasse da luz." (1:6-8)

João Batista é testemunha — não a luz. Sua função é apontar, não atrair. É uma lição de humildade ministerial.

### A rejeição e a recepção (1:9-13)

> "Era a luz verdadeira, que alumia todo homem que vem ao mundo. No mundo estava, e o mundo foi feito por ele, e o mundo não o conheceu. Veio para o que era seu, e os seus não o receberam. Mas, a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus, aos que creem no seu nome." (1:9-12)

A tragédia da incarnação: o Criador vem à Sua criação e não é reconhecido. Mas para quem O recebe, dá poder (*exousia*) — autoridade, direito — de ser filho de Deus. A filiação divina não é natural, é dada pela fé.

### A encarnação (1:14)

> "E o Verbo se fez carne, e habitou entre nós, e vimos a sua glória, como a do unigênito do Pai, cheio de graça e de verdade." (1:14)

Este é o versículo central do cristianismo. "Se fez carne" (*sarkō egeneto*) — não parecia ser humano, não vestiu humanidade como roupa. Ele *se tornou* carne. A incarnação é real, completa, definitiva.

"Habitou entre nós" (*eskēnōsen en hēmin*) — a palavra vem de *skēnē* ("tenda"). João conecta com a tenda do encontro no deserto (Êxodo 25:8), onde Deus "habitou" no meio de Israel. Agora Deus habita em Jesus — não em tenda de couro, mas em carne humana.

"Vimos a sua glória" — João testemunhou. Não é teoria, é testemunho ocular.

### O testemunho de João (1:15)

> "João testificou dele, e clamou, dizendo: Este era aquele de quem eu disse: Aquele que vem depois de mim é adiante de mim, porque era antes de mim." (1:15)

A paradoxia: Jesus veio depois de João (nascimento), mas é antes de João (eternidade).

### A graça sobre a Lei (1:16-17)

> "Porque da sua plenitude tomamos todos nós, e graça sobre graça. Porque a Lei foi dada por Moisés; a graça e a verdade vieram por Jesus Cristo." (1:16-17)

A Lei revelou o padrão de Deus; a graça de Jesus dá o poder para cumprir. Não é Lei contra graça — é Lei preparando para graça. Moisés deu a sombra; Jesus deu a substância.

### Ninguém viu a Deus (1:18)

> "Ninguém jamais viu a Deus; o unigênito Filho, que está no seio do Pai, esse o fez conhecer." (1:18)

Aqui está a exclusividade de Jesus: Ele é o único que revela o Deus invisível. Não há outro caminho, não há outra revelação. O Verbo encarnado é a revelação suprema de Deus.

### A teologia compacta

Em 18 versículos, João estabelece:
- A eternidade de Jesus (1:1)
- A divindade de Jesus (1:1)
- O papel criador de Jesus (1:3)
- A missão redentora de Jesus (1:9-13)
- A realidade da encarnação (1:14)
- A superioridade da graça sobre a Lei (1:16-17)
- A exclusividade de Jesus como revelador de Deus (1:18)

O Prólogo é o DNA de todo o evangelho. Tudo o que vem depois é expansão dessas 18 palavras.`,
          versículosChave: [
            { ref: 'João 1:1', texto: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
            { ref: 'João 1:14', texto: 'E o Verbo se fez carne, e habitou entre nós.' },
            { ref: 'João 1:12', texto: 'Mas, a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus, aos que creem no seu nome.' },
            { ref: 'João 1:18', texto: 'Ninguém jamais viu a Deus; o unigênito Filho, que está no seio do Pai, esse o fez conhecer.' },
          ],
        },
        {
          id: 'aula-ev-4-3',
          título: 'Os 7 "Eu Sou" de Jesus',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## Os 7 "Eu Sou" de Jesus

Em João, Jesus faz sete declarações "Eu Sou" (*egō eimi*) que ecoam o nome divino revelado a Moisés no Monte Sinai: "Eu Sou o que Sou" (Êxodo 3:14). Cada "Eu Sou" revela um aspecto da identidade de Jesus como Deus encarnado.

### 1. "Eu sou o pão da vida" (6:35)

Contexto: Jesus acaba de multiplicar pães e peixes para 5.000 pessoas. O povo quer mais milagres. Jesus aponta para algo maior: "Eu sou o pão da vida. Quem a mim vem, nunca terá fome; e quem em mim crê, nunca terá sede" (6:35).

Significado: Jesus não é pão material — é sustento espiritual. O homem não vive só de pão, mas de toda palavra que procede da boca de Deus (Deuteronômio 8:3). Jesus é essa palavra — o alimento que satisfaz a alma.

### 2. "Eu sou a luz do mundo" (8:12)

Contexto: Jesus fala durante o Festival dos Tabernáculos, quando grandes candelabros eram acesos no templo, lembrando a coluna de fogo que guiou Israel no deserto.

Significado: A luz é verdade, guia, esperança nas trevas. Sem luz, o homem tropeça, se perde, peca. Jesus é a luz que ilumina o caminho para Deus. "Quem me segue não andará em trevas, mas terá a luz da vida" (8:12).

### 3. "Eu sou a porta" (10:7, 9)

Contexto: Jesus fala sobre o bom pastor e as ovelhas. Ele é tanto o pastor quanto a porta do aprisco.

Significado: As ovelhas entram no aprisco pela porta — a porta é proteção, segurança, acesso. Jesus é o único caminho de acesso a Deus. "Se alguém entrar por mim, será salvo, e entrará e sairá, e achará pastagem" (10:9).

### 4. "Eu sou o bom pastor" (10:11, 14)

Contexto: No judaísmo, Deus é frequentemente comparado a um pastor (Salmos 23; Isaías 40:11; Ezequiel 34). Jesus Se identifica com esse Deus-pastor.

Significado: O bom pastor dá sua vida pelas ovelhas (10:11). O mercenário foge. Jesus conhece Suas ovelhas individualmente (10:14) e é conhecido por elas. O relacionamento é mútuo e pessoal.

### 5. "Eu sou a ressurreição e a vida" (11:25)

Contexto: Jesus está a caminho para ressuscitar Lázaro. Marta O encontra e diz: "Se estivesses aqui, meu irmão não teria morrido." Jesus responde: "Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá" (11:25).

Significado: A ressurreição não é apenas um evento futuro — é uma pessoa. Jesus não apenas ressuscita mortos; Ele *é* a ressurreição. A vida eterna começa agora, não apenas depois da morte.

### 6. "Eu sou o caminho, a verdade e a vida" (14:6)

Contexto: Na última ceia, Jesus prepara os discípulos para Sua partida. Tomé pergunta: "Senhor, não sabemos para onde vais; como podemos saber o caminho?" (14:5).

Significado: A frase mais exclusiva de Jesus. Não diz "eu tenho um caminho" ou "eu conheço a verdade" — diz "eu *sou*". Não há pluralismo aqui: "Ninguém vem ao Pai senão por mim" (14:6). Jesus é o caminho (o acesso), a verdade (a revelação) e a vida (a relação). As três coisas que o homem mais busca — direção, significado e vitalidade — estão em Jesus.

### 7. "Eu sou a videira verdadeira" (15:1)

Contexto: A última ceia, antes do Getsêmani. Jesus é a videira; os discípulos são os ramos.

Significado: No AT, Israel é a videira que falhou (Isaías 5:1-7; Salmos 80:8-16). Jesus é a videira perfeita — o verdadeiro Israel, o que produz fruto. A conexão com Ele é essencial: "Sem mim nada podeis fazer" (15:5). O fruto é o resultado natural da conexão vital com Jesus.

### Os "Eu Sou" sem predicado

Além dos sete, Jesus faz duas declarações "Eu Sou" sem predicado, que são declarações puras de divindade:

- **8:24** — "Se não crerdes que eu sou, morrereis em vossos pecados"
- **8:58** — "Antes que Abraão existisse, eu sou" (*egō eimi*)

A segunda é a mais explosiva. Jesus não diz "eu existia" — diz "eu sou". O tempo verbal grego é presente contínuo: "Eu Sou", o nome de Deus. Os judeus entendem e pegam pedras para apedrejá-Lo (8:59). Eles entenderam perfeitamente: Ele está afirmando ser Deus.

### O significado unificador

Os sete "Eu Sou" revelam que Jesus é:
- **Alimento** — sustento para a alma
- **Luz** — guia na escuridão
- **Porta** — acesso a Deus
- **Pastor** — cuidado pessoal
- **Ressurreição** — vitória sobre a morte
- **Caminho** — rota para o Pai
- **Videira** — fonte de vida

Cada um deles é uma resposta às necessidades mais profundas do coração humano. Jesus não apenas ensina sobre Deus — Ele *é* Deus, suprindo tudo o que precisamos.`,
          versículosChave: [
            { ref: 'João 6:35', texto: 'Eu sou o pão da vida. Quem a mim vem, nunca terá fome; e quem em mim crê, nunca terá sede.' },
            { ref: 'João 8:12', texto: 'Eu sou a luz do mundo. Quem me segue não andará em trevas, mas terá a luz da vida.' },
            { ref: 'João 10:11', texto: 'Eu sou o bom pastor. O bom pastor a sua vida dá pelas ovelhas.' },
            { ref: 'João 11:25', texto: 'Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá.' },
            { ref: 'João 14:6', texto: 'Jesus disse-lhe: Eu sou o caminho, e a verdade, e a vida. Ninguém vem ao Pai senão por mim.' },
            { ref: 'João 15:1', texto: 'Eu sou a videira verdadeira, e o meu Pai é o lavrador.' },
            { ref: 'João 8:58', texto: 'Disse-lhes Jesus: Em verdade, em verdade vos digo que, antes que Abraão existisse, eu sou.' },
          ],
        },
        {
          id: 'aula-ev-4-4',
          título: 'Os 7 sinais milagrosos',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## Os 7 sinais milagrosos

Enquanto os sinóticos relatam dezenas de milagres, João seleciona cuidadosamente sete — os "sinais" (*sēmeia*). A palavra "sinal" é importante: os milagres não são espetáculo, são evidências da identidade e missão de Jesus. Cada sinal aponta para algo maior.

### 1. Transformar água em vinho (2:1-11)

**Contexto:** Bodas de Caná, na Galileia. O vinho acaba — uma vergonha social. Jesus transforma água de rituais de purificação em vinho de qualidade superior.

**O sinal:** A água da Lei (ritualismo vazio) se transforma no vinho da graça (alegria nova). "O princípio dos sinais Jesus o fez em Caná da Galileia, e manifestou a sua glória; e os seus discípulos creram nele" (2:11).

**Significado teológico:** Jesus é o novíssimo — Ele restaura o que falta, transforma o ordinário em extraordinário, e começa Sua vida pública com alegria, não com severidade.

### 2. Curar o filho do oficial (4:46-54)

**Contexto:** Um oficial romano pede que Jesus cure seu filho doente. Jesus diz: "Vai; o teu filho vive" (4:50). O oficial acredita e vai. No caminho, seus servos confirmam: o filho melhorou na mesma hora.

**O sinal:** A cura acontece à distância — Jesus não vai à casa. A palavra de Jesus tem poder sem presença física.

**Significado teológico:** A fé não precisa de verificação visual. "Porque viu o teu filho, e creste" (4:53). A fé se baseia na palavra de Jesus, não nas circunstâncias.

### 3. Curar o paralítico na piscina de Betesda (5:1-15)

**Contexto:** Uma piscina em Jerusalém onde, segundo a tradição, o primeiro a entrar na água quando ela se agitava seria curado. Jesus encontra um homem doente há 38 anos e pergunta: "Quer ser sarado?" (5:6).

**O sinal:** Jesus cura no sábado — um ato deliberado de desafio à religiosidade que impedia o bem.

**Significado teológico:** Jesus tem autoridade sobre a Lei e sobre o sábado. O sábado foi feito para o homem, não o homem para o sábado (Marcos 2:27). A religião que impede a misericórdia é contra Deus.

### 4. Multiplicar pães e peixes (6:1-14)

**Contexto:** 5.000 pessoas em um lugar ermo. Filipe calcula: 200 denários de pão não bastariam. Um menino tem cinco pães de cevada e dois peixes. Jesus multiplica.

**O sinal:** Alimenta uma multidão com quase nada. "Todos se fartaram" (6:13), e sobram 12 cestos — um para cada tribo de Israel.

**Significado teológico:** Jesus é o novo Moisés (que deu maná no deserto), mas maior. O maná era temporário; o pão de Jesus é eterno: "Eu sou o pão da vida" (6:35).

### 5. Caminhar sobre as águas (6:16-21)

**Contexto:** Os discípulos estão no barco, contra a corrente, com o mar agitado. Jesus vem caminhando sobre as águas. Eles ficam com medo. Ele diz: "Sou eu; não temais" (6:20).

**O sinal:** Jesus tem poder sobre a natureza — algo que apenas Deus tem (Jó 9:8; Salmos 77:19).

**Significado teológico:** "Sou eu" (*egō eimi*) — mais uma declaração divina. No AT, Deus caminha sobre as águas (Salmos 77:19). Jesus é Deus.

### 6. Curar o cego de nascença (9:1-41)

**Contexto:** Um homem cego desde o nascimento. Os discípulos perguntam: "Quem pecou, este ou seus pais?" (9:2). Jesus responde: "Nem este pecou, nem seus pais, mas isto aconteceu para que se manifestem nele as obras de Deus" (9:3).

Jesus faz lama com saliva e terra, aplica nos olhos do cego, e manda lava na piscina de Siloé. O homem enxerga.

**O sinal:** A cura é gradual — a fé cresce gradualmente. O cego passa de "um homem chamado Jesus" (9:11) a "profeta" (9:17) a "Senhor" (9:38).

**Significado teológico:** A cegueira física aponta para cegueira espiritual. Os fariseus, que "enxergam", são cegos espiritualmente. O cego, que era cego, vê tanto fisicamente quanto espiritualmente.

### 7. Ressuscitar Lázaro (11:1-44)

**Contexto:** Lázaro, irmão de Marta e Maria, está doente. Jesus espera dois dias antes de ir. Quando chega, Lázaro está morto há quatro dias.

Jesus chora (11:35) — o versículo mais curto da Bíblia, mas o mais humano. Ele chora com quem chora, mesmo sabendo que vai ressuscitar Lázaro.

Jesus manda remover a pedra e brada: "Lázaro, sai!" (11:43). O morto sai, ainda com os panos funerários.

**O sinal:** O maior milagre de Jesus — ressuscitar alguém morto há quatro dias. Não é recuperação, é criação nova.

**Significado teológico:** "Eu sou a ressurreição e a vida" (11:25). Jesus não apenas dá vida — Ele é a vida. E esse sinal prepara a Sua própria ressurreição.

### O padrão dos sinais

Todos os sinais compartilham características:
1. Mostram o poder de Jesus sobre doenças, natureza e morte
2. Revelam a identidade divina de Jesus
3. Exigem fé (frequentemente a fé dos outros)
4. Transformam vidas permanentemente
5. Apontam para algo maior que o milagre em si

João escolheu esses sete porque cada um é um ícone teológico — uma janela para a divindade de Jesus.`,
          versículosChave: [
            { ref: 'João 2:11', texto: 'Este foi o princípio dos sinais Jesus, o de Caná da Galileia, e manifestou a sua glória; e os seus discípulos creram nele.' },
            { ref: 'João 11:25', texto: 'Disse-lhe Jesus: Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá.' },
            { ref: 'João 11:43', texto: 'E, dizendo isto, clamou com grande voz: Lázaro, sai!' },
            { ref: 'João 9:3', texto: 'Nem este pecou, nem seus pais, mas isto aconteceu para que se manifestem nele as obras de Deus.' },
          ],
        },
        {
          id: 'aula-ev-4-5',
          título: 'Quiz Final: Comparação dos 4 Evangelhos',
          tipo: 'quiz',
          duração: '10 min',
          perguntas: [
            {
              id: 'qf-ev-1',
              pergunta: 'Qual evangelho começa com a genealogia de Jesus conectando-o com Abraão e Davi?',
              opções: ['Marcos', 'Lucas', 'Mateus', 'João'],
              respostaCorreta: 2,
              explicação: 'Mateus começa com a genealogia em Mateus 1:1-17, conectando Jesus com Abraão e Davi para mostrar que Ele é o Messias prometido ao povo judeu.',
            },
            {
              id: 'qf-ev-2',
              pergunta: 'Qual evangelho apresenta Jesus como o "Filho do Homem" com ênfase na sua humanidade?',
              opções: ['Mateus', 'João', 'Marcos', 'Lucas'],
              respostaCorreta: 3,
              explicação: 'Lucas retrata Jesus como o Filho do Homem — perfeito em sua humanidade, come, bebe, chora, ora e tem compaixão dos marginalizados. É o evangelho mais focado na humanidade de Jesus.',
            },
            {
              id: 'qf-ev-3',
              pergunta: 'Qual é o versículo-chave de todo o evangelho de Marcos?',
              opções: ['João 1:1', 'Mateus 28:19', 'Marcos 10:45', 'Lucas 24:47'],
              respostaCorreta: 2,
              explicação: 'Marcos 10:45 — "O Filho do Homem não veio para ser servido, mas para servir, e dar a sua vida em resgate por muitos" — é o tema central do evangelho.',
            },
            {
              id: 'qf-ev-4',
              pergunta: 'Qual evangelho tem como público-alvo principal os judeus?',
              opções: ['João', 'Lucas', 'Marcos', 'Mateus'],
              respostaCorreta: 3,
              explicação: 'Mateus foi escrito para cristãos judeus. Por isso tem mais de 60 citações do AT, enfatiza o cumprimento de profecias e apresenta Jesus como o Messias (Cristo) prometido.',
            },
            {
              id: 'qf-ev-5',
              pergunta: 'Em João 1:1, a expressão "o Verbo era Deus" confirma que Jesus:',
              opções: ['É um profeta superior', 'É uma criatura celestial', 'É Deus em essência', 'É anjo de Deus'],
              respostaCorreta: 2,
              explicação: 'João 1:1 declara explicitamente que "o Verbo era Deus" — afirmando a divindade plena de Jesus desde a eternidade.',
            },
            {
              id: 'qf-ev-6',
              pergunta: 'Qual é a parábola exclusiva de Lucas que ensina o perdão incondicional de Deus?',
              opções: ['O Semeador', 'O Filho Pródigo', 'O Bom Samaritano', 'A Pérola de Grande Preço'],
              respostaCorreta: 1,
              explicação: 'O Filho Pródigo (Lucas 15:11-32) é exclusiva de Lucas e revela o coração do Pai que corre, abraça e restaura o filho que volta.',
            },
            {
              id: 'qf-ev-7',
              pergunta: 'Qual dos "Eu Sou" de Jesus em João declara: "Eu sou o caminho, a verdade e a vida"?',
              opções: ['Capítulo 6:35', 'Capítulo 10:11', 'Capítulo 14:6', 'Capítulo 15:1'],
              respostaCorreta: 2,
              explicação: 'João 14:6 — a declaração mais exclusiva de Jesus. Ele não dá um caminho — Ele é o caminho. Não mostra a verdade — Ele é a verdade. Não oferece vida — Ele é a vida.',
            },
            {
              id: 'qf-ev-8',
              pergunta: 'Qual evangelho retrata Jesus como o "Servo Sofredor" baseado em Isaías 53?',
              opções: ['Lucas', 'Mateus', 'João', 'Marcos'],
              respostaCorreta: 3,
              explicação: 'Marcos retrata Jesus como o Servo Sofredor que dá sua vida por muitos. A segunda metade do evangelho é dedicada à paixão e crucificação.',
            },
            {
              id: 'qf-ev-9',
              pergunta: 'Qual evangelho contém o relato mais detalhado do nascimento de Jesus, incluindo o cântico de Maria (Magnificat)?',
              opções: ['Mateus', 'João', 'Lucas', 'Marcos'],
              respostaCorreta: 2,
              explicação: 'Lucas 1-2 é o relato mais detalhado do nascimento, incluindo a Anunciação, o Magnificat (1:46-55), o nascimento em Belém e a apresentação no templo.',
            },
            {
              id: 'qf-ev-10',
              pergunta: 'Qual é o propósito declarado do evangelho de João segundo João 20:31?',
              opções: ['Registrar fatos históricos', 'Ensinar ética cristã', 'Creiam que Jesus é o Cristo e tenham vida', 'Converter os judeus'],
              respostaCorreta: 2,
              explicação: 'João 20:31 declara: "Estes foram escritos para que creiais que Jesus é o Cristo, o Filho de Deus, e, crendo, tenhais vida em seu nome."',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-vida-publica-sinoticos',
      título: 'A Vida Pública de Jesus nos Sinóticos',
      descrição: 'O ministério público de Jesus na Galileia: batismo, tentações, parábolas, milagres e transfiguração — comparando os três evangelhos sinóticos.',
      ícone: '⚡',
      aulas: [
        {
          id: 'aula-ev-5-1',
          título: 'O Batismo e a Tentação: A preparação do Messias',
          tipo: 'texto',
          duração: '15 min',
          versículosChave: [
            { ref: 'Mateus 3:17', texto: 'Este é o meu Filho amado, em quem me complazo.' },
            { ref: 'Mateus 4:11', texto: 'Então o diabo o deixou, e eis que anjos vieram e o serviram.' },
            { ref: 'Lucas 3:22', texto: 'Tu és o meu Filho amado; em ti me complazo.' },
          ],
          conteúdo: `## O Batismo e a Tentação: A preparação do Messias

O batismo de Jesus e a tentação no deserto são dois eventos que inauguram o ministério público do Messias. Todos os três evangelhos sinóticos — Mateus, Marcos e Lucas — registram esses acontecimentos, embora com ênfases diferentes, revelando camadas profundas de significado teológico.

### O relato batismal: Três perspectivas

**Mateus (3:13-17)** apresenta um diálogo entre Jesus e João Batista, onde Jesus insiste em ser batizado para "cumprir toda a justiça". Essa expressão é teologicamente densa — Jesus não precisava de arrepeniança, mas escolheu identificar-se com a humanidade pecadora, anticipando sua morte vicária. A cena se encerra com a Trindade se manifestando: o Espírito descende como pomba, e a voz do Pai declara: "Este é o meu Filho amado".

**Marcos (1:9-11)** é mais conciso, mas inclui um detalhe crucial: Jesus viu "os céus se rasgando". A palavra grega "schizomenous" (σχιζομένους) sugere uma ruptura violenta, uma abertura do próprio céu para permitir a descida do Espírito. Para Marcos, o batismo é o momento em que a barreira entre Deus e a humanidade é rompida na pessoa de Jesus.

**Lucas (3:21-22)** acrescenta que Jesus estava orando quando o céu se abriu, e cita uma variação da declaração divina baseada no Salmo 2:7: "Tu és o meu Filho amado; em ti me complazo". A ênfase na oração de Jesus antes do batismo é típica de Lucas, que retrata Jesus como alguém dependente do Pai em oração constante.

### O confronto com Satanás no deserto

Após o batismo, os três evangelhos narram a tentação de Jesus no deserto, mas com detalhes significativos:

**Marcos (1:12-13)** oferece o relato mais breve — apenas dois versículos. Marcos usa o verbo "ekballei" (ἐκβάλλει), "expulsou", sugerindo que o Espírito empurrou Jesus para o deserto, não como punição, mas como preparação. Marcos também menciona que Jesus estava com as feras e que anjos o serviam, lembrando a harmonia paradisíaca do Gênesis e antecipando a vitória sobre Satanás.

**Mateus (4:1-11)** e **Lucas (4:1-13)** apresentam as três tentações na mesma sequência, mas com uma diferença crucial: Mateus as ordena temporalmente (pão → templo → montanha), enquanto Lucas as reorganiza (pão → montanha → templo). A maioria dos estudiosos acredita que Mateus preserva a ordem cronológica.

### As três tentações e seu significado

A primeira tentação (transformar pedras em pão) ataca a identidade messiânica: "Se tu és o Filho de Deus...". A resposta de Jesus — "Não só de pão vive o homem" (Dt 8:3) — afirma que a obediência a Deus é mais essencial que a satisfação das necessidades físicas.

A segunda tentação (lançar-se do templo) testa a confiança em Deus como espetáculo público. Jesus responde: "Não tentarás o Senhor teu Deus" (Dt 6:16). A verdadeira fé não demanda provas espectaculares.

A terceira tentação (adorar Satanás em troca de todos os reinos) é a mais direta — oferece ao Messias o caminho rápido para a soberania universal sem a cruz. Jesus rejeita com vigor: "AoS teu Senhor Deus adorarás, e só a ele servirás" (Dt 6:13). Esse é o conflito central: Jesus rejeita a soberania que não vem pelo caminho da cruz.

### O significado teológico unitário

O batismo e a tentação formam um arco narrativo perfeito: Jesus recebe a confirmação da identidade divina ("Tu és o meu Filho") e imediatamente enfrenta o questionamento dessa identidade ("Se tu és o Filho de Deus"). A vitória nas tentações demonstra que Jesus é o Filho obediente que Adão e Israel falharam em ser. Enquanto Adão cedeu à tentação no jardim, Jesus vence no deserto. Enquanto Israel falhou no deserto de 40 dias, Jesus persevera por 40 dias. A preparação do Messias é completa: ele está pronto para iniciar a proclamação do Reino.`,
        },
        {
          id: 'aula-ev-5-2',
          título: 'As Parábolas do Reino: Ensinos sobre o Reino de Deus',
          tipo: 'texto',
          duração: '18 min',
          versículosChave: [
            { ref: 'Mateus 13:11', texto: 'A vocês é dado conhecer os mistérios do Reino dos céus.' },
            { ref: 'Marcos 4:30-32', texto: 'A que compararemos o Reino de Deus? É como um grão de mostarda.' },
            { ref: 'Lucas 15:7', texto: 'Assim haverá mais alegria no céu por um pecador que se arrepende.' },
          ],
          conteúdo: `## As Parábolas do Reino: Ensinos sobre o Reino de Deus

As parábolas de Jesus são uma das formas mais poderosas de ensino do Novo Testamento. Nos sinóticos, elas revelam a natureza do Reino de Deus de maneiras que desafiam as expectativas religiosas e sociais da época. Mateus 13, Marcos 4 e Lucas 13-15 concentram a maioria dessas parábolas, cada evangelho organizando-as de forma distinta para seu público específico.

### A Parábola do Semeador (Mt 13:3-23; Mc 4:3-20; Lc 8:5-15)

Esta é a parábola "mãe" de todas as outras — Jesus inclusive fornece sua explicação aos discípulos, algo que faz com poucas parábolas. O semeador semente cai em quatro tipos de solo: caminho, pedras, espinhos e terra boa.

Mateus detalha o significado espiritual de cada solo, refletindo sua preocupação pastoral com a comunidade judaica cristã. Marcos enfatiza que o semeador semeia sem distinção — a palavra de Deus é indiscriminada em sua generosidade. Lucas acrescenta que o semeador semeia "a palavra de Deus", tornando explícito o que é a semente.

O ensino central é que a receptividade da palavra depende do coração do ouvinte, não da qualidade da semente. O mesmo evangelho que transforma vidas pode ser rejeitado por diferentes razões: endurecimento superficial, profundidade falsa, ou preocupações que sufocam o crescimento.

### Joio e Trigo (Mt 13:24-30, 36-43)

Exclusiva de Mateus, esta parábola retrata o Reino misturado com o mal até o julgamento final. O servo quer arrancar o joio, mas o dono proíbe: "Não aconteça que, colhendo o joio, arranqueis também o trigo". A separação só acontecerá na colheita, representada como "o fim do mundo".

Para a comunidade judaica-cristã de Mateus, essa parábola oferecia consolo: os falsos professos e os perseguidores não impedem o plano de Deus. A paciência divina não é fraqueza — é sabedoria que espera o tempo certo da justiça.

### A Parábola da Semente Crescendo Secretamente (Mc 4:26-29)

Marcos preserva essa parábola que não aparece nos outros evangelhos. Ela retrata o crescimento misterioso do Reino: o semeador semeia, dorme e acorda, e a semente cresce "sem que ele saiba como". O mistério está no poder intrínseco da palavra de Deus — ela opera mesmo quando o crente não percebe.

Essa perspectiva é particularmente consoladora para missionários e pastores que trabalham sem ver resultados imediatos. O Reino não depende da nossa eficiência — depende do poder de Deus na semente que plantamos.

### A Semente de Mostarda e o Fermento (Mt 13:31-33; Mc 4:30-32; Lc 13:18-21)

A semente de mostarda, mencionada nos três sinóticos, inverte a expectativa messiânica: o Reino começa como algo microscopico — menor que todas as sementes — e se torna um arbusto onde as aves fazem ninho. O Reino não explode com poder imperial; ele cresce organicamente, de maneira aparentemente insignificante.

Mateus e Lucas adicionam a parábola do fermento: três medidas de farinha fermentam inteiramente. O fermento simboliza a influência transformadora do Reino que penetra toda a massa da sociedade. Não é reforma superficial — é transformação completa.

### O Tesouro e a Pérola (Mt 13:44-46)

Mateus inclui duas parábolas concisas que retratam o valor incomparável do Reino: um homem encontra um tesouro escondido num campo e vende tudo para comprá-lo; um mercador encontra uma pérola de grande preço e faz o mesmo.

Essas parábolas ensinam que o Reino não é uma adição à vida — é uma revolução total. O que possuímos antes torna-se sem valor quando comparado com o que Deus oferece. A alegria de encontrar o tesouro justifica o sacrifício total, não como perda, mas como a melhor troca já feita.

### A Parábola da Ovelha Perdida (Mt 18:12-14; Lc 15:3-7)

Mateus e Lucas registram essa parábola com ênfases diferentes. Mateus foca no pastor que busca "até que a encontre", retratando a persistência de Deus. Lucas enfatiza a alegria no céu quando um pecador se arrepende — um tema central de seu evangelho. Para Lucas, essa parábola responde aos fariseus que criticavam Jesus por comer com pecadores.

### Relevância para a vida cristã

As parábolas do Reino nos lembram que Deus opera de formas surpreendentes: através de pequenos começos, de crescimento paciente, de transformação silenciosa e de encontros que mudam tudo. O Reino não é um sistema de poder humano — é a irrupção do governo de Deus na história, começando no coração humilde que acolhe a semente da palavra.`,
        },
        {
          id: 'aula-ev-5-3',
          título: 'Os Milagres de Jesus: Poder e Compaixão',
          tipo: 'texto',
          duração: '15 min',
          versículosChave: [
            { ref: 'Mateus 8:27', texto: 'Que homem é este, que até os ventos e o mar lhe obedecem?' },
            { ref: 'Marcos 1:32', texto: 'Quando era tarde, depois do sol-posto, trouxeram-lhe todos os enfermos e endemoninhados.' },
            { ref: 'Lucas 7:22', texto: 'Os cegos vêem, os coxos andam, os leprosos são purificados, os surdos ouvem.' },
          ],
          conteúdo: `## Os Milagres de Jesus: Poder e Compaixão

Os milagres de Jesus constituem uma parte substancial dos evangelhos sinóticos — aproximadamente um terço de Mateus e Marcos é dedicado a relatos de milagres. Eles não são meros eventos sobrenaturais para impressionar plateias; são manifestações teológicas do Reino de Deus rompendo na história humana. Cada tipo de milagre comunica algo distinto sobre quem Jesus é e qual é a natureza de seu ministério.

### Classificação dos milagres

Os estudiosos bíblicos classificam os milagres de Jesus em quatro grandes categorias, cada uma presente nos três sinóticos:

**1. Milagres sobre a natureza (poder cósmico):** Jesus calmou a tempestade (Mt 8:23-27; Mc 4:35-41; Lc 8:22-25), andou sobre as águas (Mt 14:22-33; Mc 6:45-52; Lc 6:16-21), multiplicou pães e peixes ( Mt 14:13-21; Mc 6:30-44; Lc 9:10-17), e transformou água em vinho nas bodas de Caná (exclusiva de João, mas paradigmática). Esses milagres revelam Jesus como Senhor da criação, ecoando Deus no Gênesis que domava as águas do caos.

**2. Exorcismos (poder sobre o mal):** Marcos dedica especial atenção a esses milagres — o endemoninhado da sinagoga de Cafarnaum (Mc 1:21-28), o geraseno (Mc 5:1-20), e o menino epilético (Mc 9:14-29). Para Marcos, os exorcismos são a prova central de que o Reino de Deus está avançando contra o reino de Satanás: "Se eu expulso demônios pelo Espírito de Deus, então o Reino de Deus já chegou a vocês" (Mt 12:28).

**3. Cura de doenças (poder sobre o sofrimento):** A leprosa (Mt 8:1-4; Mc 1:40-45; Lc 5:12-14), a sogra de Pedro (Mt 8:14-15; Mc 1:29-31; Lc 4:38-39), o paralítico da capernaumita (Mt 9:1-8; Mc 2:1-12; Lc 5:17-26), a mulher com fluxo de sangue (Mt 9:20-22; Mc 5:25-34; Lc 8:43-48) e Bartimeu (Mt 9:27-31; Mc 10:46-52; Lc 18:35-43). Mateus enfatiza o cumprimento das profecias messiânicas (Isaías 35:5-6), Lucas mostra a compaixão social de Jesus, e Marcos retrata o poder imediato e autoritativo.

**4. Ressurreição de mortos (poder sobre a morte):** A filha de Jairo (Mt 9:18-26; Mc 5:21-43; Lc 8:40-56), o jovem de Nina (Lc 7:11-17) e Lázaro (João 11) são os três casos. A ressurreição da filha de Jairo é compartilhada pelos três sinóticos e é especialmente significativa: Jesus toca a menina morta — algo que ritualmente o contaminaria — e diz: "Talita, kum!" (menina, levanta-te!).

### Análise de milagres específicos

**A cura do leproso (Mt 8:1-4; Mc 1:40-45; Lc 5:12-14):** Marcos registra que Jesus, movido por compaixão (splagchnizomai), estendeu a mão e tocou o leproso — gesto proibido pela Lei. Mateus acrescenta que Jesus ordenou ao leproso que mostrasse-se ao sacerdote "para testemunho", indicando que o milagre não era anti-Lei, mas seu cumprimento.

**O endemoninhado da Gadara (Mt 8:28-34; Mc 5:1-20; Lc 8:26-39):** Marcos fornece o relato mais detalhado: o homem vivia entre os túmulos, era indomável e gritava dia e noite. Jesus pergunta: "Qual é o teu nome?" e ele responde: "Legião, porque somos muitos". O nome coletivo sugere opressão romana (a legião era a unidade militar), criando um paralelo entre a escravidão política e espiritual. A expulsão dos demônios para os porcos demonstra o poder absoluto de Jesus sobre as forças do mal.

**A cura da mulher com fluxo de sangue (Mt 9:20-22; Mc 5:25-34; Lc 8:43-48):** Marcos detalha que a mulher sofreu há 12 anos, gastou tudo com médicos e piorou. Ela toca no "fundo do manto" de Jesus e é curada imediatamente. Jesus para o cortejo funeral, busca a mulher e declara: "A tua fé te salvou". Mateus acrescenta que Jesus a chamou "filha" e Lucas registra sua "alegria" ao ser tocada.

### A teologia dos milagres

Os milagres de Jesus não são demonstrações arbitrárias de poder. Elos são: (1) sinais messiânicos que cumprem profecias do AT; (2) manifestações do Reino que restaura a criação caída; (3) atos de compaixão que dignificam os marginalizados; e (4) revelações da identidade de Jesus como Filho de Deus. Marcos 2:12 resume a resposta correta: "Nunca vimos coisa assim!".`,
        },
        {
          id: 'aula-ev-5-4',
          título: 'A Transfiguração: Glória revelada',
          tipo: 'texto',
          duração: '12 min',
          versículosChave: [
            { ref: 'Mateus 17:2', texto: 'Transfigurou-se diante deles, e o seu rosto resplandeceu como o sol, e as suas vestes se fizeram brancas como a luz.' },
            { ref: 'Marcos 9:2', texto: 'Jesus tomou consigo a Pedro, Tiago e João, e os levou, só a eles, a um lugar apartado.' },
            { ref: 'Lucas 9:35', texto: 'E, falando a voz do céu, dizia: Este é o meu Filho amado; a ele ouvi.' },
          ],
          conteúdo: `## A Transfiguração: Glória revelada

A Transfiguração é um dos eventos mais marcantes dos evangelhos sinóticos — um momento em que a glória divina de Jesus se manifesta plenamente antes da cruz. Registrada em Mateus 17:1-8, Marcos 9:2-8 e Lucas 9:28-36, esta passagem serve como ponte entre o ministério público de Jesus em Galileia e sua jornada rumo a Jerusalém e à paixão.

### O contexto narrativo

Todos os três sinóticos situam a Transfiguraçãologo após a primeira previsão da paixão de Jesus. Mateus registra que Jesus disse: "O Filho do Homem deve sofrer muito, ser rejeitado pelos anciãos, pelos sumos sacerdotes e escribas, ser morto e ressuscitar ao terceiro dia" (Mt 16:21). Marcos e Lucas relatam a mesma declaração. A Transfiguração é, portanto, uma resposta divina à cruz: antes de descrever o sofrimento, Deus revela a glória.

Pedro, Tiago e João são escolhidos como testemunhas — os mesmos três que estarão presentes na agonia no Getsêmani. Marcos acrescenta que Jesus "os levou, só a eles, a um lugar apartado", enfatizando o caráter intimista e privilegiado do evento.

### A manifestação da glória

O relato é descrito com linguagem luminosa: "O rosto de Jesus resplandeceu como o sol" (Mt 17:2) — uma alusão direta à face de Moisés após receber os mandamentos no Sinai (Êxodo 34:29-35). "Suas vestes se fizeram brancas como a luz" (Mt) ou "tão brancas que nenhuma lavadeira na terra poderia assim embranquecê-las" (Mc 9:3). Essa imagem de brancura sobrenatural remete às vestes angelicais e à pureza divina.

Marcos acrescenta um detalhe único: "apareceram-lhe Elias e Moisés, e conversavam com ele" (Mc 9:4). A presença de Moisés (representando a Lei) e Elias (representando os Profetas) indica que toda a Escritura hebraica aponta para Jesus. Lucas registra o conteúdo da conversa: "Falavam da sua partida, que ia consumar em Jerusalém" (Lc 9:31). O tema da conversa é a paixão — a "exodus" (ἐξοδον) de Jesus, o êxodo definitivo que libertará a humanidade.

### A reação de Pedro

Pedro, sem saber o que dizer — e Marcos destaca explicitamente essa hesitação: "SabiaJesus o que dizer, pois estavam atemorizados" — propõe construir três tendas. Mateus e Marcos registram que "ainda estava falando quando uma nuvem luminosa os cobriu", interrompendo o oferecimento de Pedro.

A reação de Pedro é compreensível: ele quer preservar o momento de glória. Mas a Transfiguração não é para ser capturada — é para ser testemunhada. A nuvem luminosa, símbolo da presença divina (shekiná), confirma que o evento tem origem celestial, não terrena.

### A voz do Pai

A declaração do Pai é registrada com uma variação sutil entre os evangelhos: "Este é o meu Filho amado, em quem me complazo" (Mt, Mc) — acrescentando "a ele ouvi" (Mc, Lc), uma referência ao Deuteronômio 18:15 sobre o profeta que Deus levantará. "Este é o meu Filho, o escolhido" (Lc) — usando a palavra "eklektos" (ἐκλεκτός), destacando a eleição divina. Mateus registra "ouvi" como "ouvi-o", sugerindo que Jesus é a Palavra que deve ser escutada.

A exortação final — "Ouvi-o!" — é o comando que resume toda a Teofania: Jesus não é apenas um profeta ou um mestre — é o Filho de Deus cuja autoridade deve ser obedecida. A Transfiguração é um momento de revelação (epifaneia): Deus mostra quem Jesus realmente é para que os discípulos suportem o escândalo da cruz.

### O significado teológico profundo

A Transfiguração comunica verdades fundamentais:

1. **A divindade de Jesus:** A glória que emanava de seu rosto não era refletida — era emanada. Jesus não recebia luz de Deus; Ele era a fonte da luz, igual ao Pai.

2. **A continuidade da história da salvação:** Moisés e Elias testemunham que a Lei e os Profetas se cumprem em Jesus. Não há contradição entre os Testamentos — há continuidade.

3. **A prioridade da cruz:** O conteúdo da conversa é a paixão. A glória não substitui o sofrimento; ela o precede e o sustenta.

4. **A esperança da ressurreição:** O mesmo corpo que será crucificado será transfigurado — a glória que os discípulos veem é a glória da ressurreição que virá.

5. **A autoridade de Jesus:** A voz do Pai estabelece Jesus como o centro da revelação divina: "Ouvi-o!"

A Transfiguração nos lembra que, mesmo no meio do sofrimento e da confusão, a glória de Deus está presente. A cruz não é o fim — é o caminho para a glória. E a glória que vemos na Transfiguração é a mesma glória que um dia será revelada em todos os que creem.`,
        },
        {
          id: 'aula-ev-5-5',
          título: 'Quiz: A Vida Pública de Jesus nos Sinóticos',
          tipo: 'quiz',
          duração: '10 min',
          perguntas: [
            {
              id: 'qf-ev-5-1',
              pergunta: 'O que Jesus quis dizer com "é necessário cumprir toda a justiça" ao ser batizado?',
              opções: ['Jesus era pecador e precisava de purificação', 'Jesus se identificava com a humanidade pecadora e cumpria o plano de Deus', 'Jesus estava sendo batizado como ato político', 'Jesus seguia a tradição judaica sem significado profundo'],
              respostaCorreta: 1,
              explicação: 'Jesus não tinha pecado pessoal, mas ao ser batizado ele se identificava com a humanidade pecadora, antecipando sua morte vicária e cumprindo o plano divino de redenção.',
            },
            {
              id: 'qf-ev-5-2',
              pergunta: 'Qual evangelho apresenta o relato mais breve da tentação de Jesus no deserto?',
              opções: ['Mateus', 'Lucas', 'Marcos', 'Todos são iguais'],
              respostaCorreta: 2,
              explicação: 'Marcos dedica apenas dois versículos (1:12-13) à tentação, focando mais nas consequências do batismo do que no confronto detalhado com Satanás.',
            },
            {
              id: 'qf-ev-5-3',
              pergunta: 'Na Parábola do Semeador, o que representam os espinhos?',
              opções: ['A perseguição do mundo', 'As preocupações desta vida, a sedução das riquezas', 'O diabo que rouba a semente', 'A falta de preparo do ouvinte'],
              respostaCorreta: 1,
              explicação: 'Jesus explica que os espinhos representam "as preocupações desta vida, a sedução das riquezas e os desejos de outras coisas" que sufocam a palavra (Mc 4:19).',
            },
            {
              id: 'qf-ev-5-4',
              pergunta: 'Por que Jesus tocou o leproso antes de curá-lo?',
              opções: ['Para criar espetáculo', 'Para demonstrar que a Lei não o limitava', 'Por compaixão, quebrando a barreira ritual', 'Não há explicação no texto'],
              respostaCorreta: 2,
              explicação: 'Marcos destaca que Jesus foi movido por compaixão (splagchnizomai) e tocou o leproso, algo proibido pela Lei — demonstrando que o amor de Deus ultrapassa as barreiras religiosas.',
            },
            {
              id: 'qf-ev-5-5',
              pergunta: 'O que a parábola da semente de mostarda ensina sobre o Reino de Deus?',
              opções: ['O Reino será dominante como um império', 'O Reino começa pequeno e cresce de forma surpreendente', 'O Reino é irrelevante para a sociedade', 'O Reino depende do poder humano'],
              respostaCorreta: 1,
              explicação: 'A semente de mostarda é a menor das sementes, mas se torna um arbusto grande. Assim é o Reino: começa de forma aparentemente insignificante e se expande de maneiras que surpreendem todos.',
            },
            {
              id: 'qf-ev-5-6',
              pergunta: 'Na Transfiguração, quem apareceu conversando com Jesus?',
              opções: ['Abel e Noé', 'Moisés e Elias', 'Pedro e João', 'Davi e Salomão'],
              respostaCorreta: 1,
              explicação: 'Moisés (representando a Lei) e Elias (representando os Profetas) apareceram, confirmando que toda a Escritura hebraica aponta para Jesus.',
            },
            {
              id: 'qf-ev-5-7',
              pergunta: 'Qual era o conteúdo da conversa entre Jesus, Moisés e Elias na Transfiguração?',
              opções: ['O futuro do império romano', 'A paixão de Jesus em Jerusalém', 'A criação do mundo', 'A Lei de Moisés'],
              respostaCorreta: 1,
              explicação: 'Lucas 9:31 registra que falavam "da sua partida (exodus), que ia consumar em Jerusalém" — referindo-se à paixão e morte de Jesus.',
            },
            {
              id: 'qf-ev-5-8',
              pergunta: 'Na terceira tentação, Satanás ofereceu a Jesus todos os reinos do mundo em troca de quê?',
              opções: ['O poder sobre os anjos', 'Adoração e rendição', 'Sabedoria infinita', 'Riqueza material'],
              respostaCorreta: 1,
              explicação: 'Satanás pediu que Jesus o adorasse (Mt 4:9). Era um atalho para a soberania universal sem passar pela cruz — exatamente o caminho que Jesus recusou.',
            },
            {
              id: 'qf-ev-5-9',
              pergunta: 'O que a voz do Pai diz na Transfiguração, segundo Marcos 9:7?',
              opções: ['"Servi a este homem"', '"Ouvi-o!"', '"Este é o meu servo"', '"Sê o meu profeta"'],
              respostaCorreta: 1,
              explicação: 'A voz do céu declara: "Este é o meu Filho amado; a ele ouvi." O comando final — "Ouvi-o!" — estabelece Jesus como a autoridade suprema que deve ser obedecida.',
            },
            {
              id: 'qf-ev-5-10',
              pergunta: 'Qual parábola retrata o crescimento misterioso do Reino, sem que o ser humano entenda como acontece?',
              opções: ['A Pérola', 'O Tesouro Escondido', 'A Semente Crescendo Secretamente', 'Joio e Trigo'],
              respostaCorreta: 2,
              explicação: 'A parábola exclusiva de Marcos (4:26-29) descreve um homem que semeia, dorme e acorda, e a semente cresce "sem que ele saiba como" — o mistério do poder de Deus na palavra.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-marcos-serviço',
      título: 'O Evangelho de Marcos: Serviço e Soberania',
      descrição: 'A dinâmica narrativa de Marcos: Jesus como Servo Sofredor, o evangelho da ação, as previsões da paixão e o chamado à missão.',
      ícone: '🏃',
      aulas: [
        {
          id: 'aula-ev-6-1',
          título: 'Marcos: O evangelho da ação',
          tipo: 'texto',
          duração: '15 min',
          versículosChave: [
            { ref: 'Marcos 1:22', texto: 'E estavam pasmados com o seu ensino, porque os ensinava como quem tem autoridade.' },
            { ref: 'Marcos 1:41', texto: 'Jesus, movido de compaixão, estendeu a mão, tocou nele e disse: Quero, sê limpo.' },
            { ref: 'Marcos 10:45', texto: 'Porque o Filho do Homem não veio para ser servido, mas para servir, e dar a sua vida em resgate por muitos.' },
          ],
          conteúdo: `## Marcos: O evangelho da ação

Marcos é o mais curto dos quatro evangelhos — apenas 16 capítulos, cerca de 11.000 palavras no original grego — e, paradoxalmente, é provavelmente o mais dinâmico. Seu ritmo acelerado, seu vocabulário repetitivo e sua estrutura narrativa revelam um autor que quer que seus leitores experimentem Jesus não como um filósofo que ensina longos discursos, mas como um homem de ação que transforma vidas com autoridade incomum.

### Autor e contexto

O autor é João Marcos, mencionado no Atos dos Apóstolos (12:12, 25; 15:37-39). Tradição antiga, baseada em Papias (bispo de Hierápolis, ~100 d.C.), afirma que Marcos foi intérprete de Pedro em Roma. Essa conexão explicaria por que o evangelho reflete uma perspectiva petrina — relatos que Pedro provavelmente testemunhou em primeira mão.

O público-alvo são cristãos gentios (não-judeus), provavelmente romanos. Isso se evidencia pela explicação de costumes judaicos (Mc 7:3-4), pela tradução de termos aramaicos como "Talitha kum" (Mc 5:41) e "Ephphatha" (Mc 7:34), e pela ausência de genealogias que interessariam a um público judeu.

### Características únicas de Marcos

**1. O ritmo da narrativa:** Marcos usa a palavra grega "euthus" (εὐθύς), que significa "imediatamente", "logo em seguida", pelo menos 41 vezes — mais que todos os outros evangelhos juntos. Esse advérbio cria um senso de urgência: Jesus age com rapidez e sem hesitação. Não há tempo para filosofar — a ação é imediata.

**2. A brevidade dos discursos:** Enquanto Mateus preserva longos discursos (Sermão do Monte, caps. 5-7), Marcos resume os ensinos de Jesus em frases curtas e memoráveis. O Sermão do Monte é condensado em poucos versículos. Marcos prefere mostrar Jesus agindo, não falando.

**3. A ênfase nos milagres:** Aproximadamente 40% do evangelho é dedicado a milagres — uma proporção maior que em Mateus ou Lucas. Marcos narra mais exorcismos que qualquer outro evangelho, retratando Jesus como o Senhor que derrota Satanás e restaura a humanidade.

**4. O "segredo messiânico":** Após cada milagre ou revelação, Jesus ordena que ninguém divulgue o que aconteceu (Mc 1:44; 5:43; 7:36; 8:30). Esse mistério tem dois propósitos: (1) proteger Jesus de expectativas políticas erradas — o Messias que o povo queria não era o Messias que Deus enviou; e (2) preparar os discípulos para o choque da cruz — a identidade de Jesus só será plenamente compreendida após a ressurreição.

**5. A humanidade de Jesus:** Marcos retrata Jesus com uma humanidade vívida: ele se indigna (Mc 3:5), tem compaixão (Mc 1:41), sente raiva (Mc 10:14), chora (Mc 14:35), e até mesmo se surpreende com a fé do centurião (Mc 6:34). Jesus não é um ser abstrato — é um homem que experimenta as emoções humanas.

### A estrutura do evangelho

A maioria dos estudiosos divide Marcos em duas grandes partes:

**Parte 1 (caps. 1-8):** O ministério de Jesus na Galileia — batismo, curas, exorcismos, ensinos, controvérsias com os fariseus, e a pergunta dos discípulos: "Quem dizem os homens que eu sou?"

**Parte 2 (caps. 8-16):** A jornada rumo a Jerusalém, a paixão, morte e ressurreição — começando com a confissão de Pedro ("Tu és o Cristo") e terminando com o túmulo vazio.

A virada central está em 8:27-30, a confissão de Pedro em Cesareia de Filipe, que divide o evangelho exatamente ao meio. Tudo o que veio antes aponta para esse reconhecimento; tudo o que vem depois prepara para a cruz.

### Marcos e o discipulado

Marcos apresenta o discipulado de forma realista — sem idealizar os apóstolos. Os discípulos de Jesus são retratados como frequentemente incompreensivos (Mc 4:13), cobardes (Mc 14:50-51) e até mesmo traidores (Judas). Essa honestidade é encorajadora: se os íntimos de Jesus falharam, nossas falhas não nos excluem da graça.

O versículo central de todo o evangelho — Marcos 10:45 — sintetiza a missão de Jesus: "O Filho do Homem não veio para ser servido, mas para servir, e dar a sua vida em resgate por muitos." Esse é o modelo que os discípulos são chamados a seguir: serviço que custa tudo.

### Relevância para hoje

Marcos nos convida a ser cristãos de ação — não apenas pessoas que ensinam, mas pessoas que fazem. O Reino de Deus não avança por discursos bonitos, mas por atos de amor, poder e compaixão que transformam vidas. Marcos nos lembra que a fé que não se move é uma fé que ainda não entendeu quem é Jesus.`,
        },
        {
          id: 'aula-ev-6-2',
          título: 'O Servo Sofredor: Profecias de Marcos',
          tipo: 'texto',
          duração: '15 min',
          versículosChave: [
            { ref: 'Marcos 8:31', texto: 'E começou a ensinar-lhes que era necessário que o Filho do Homem padecesse muito.' },
            { ref: 'Marcos 9:31', texto: 'O Filho do Homem está sendo entregue nas mãos dos homens, e o matarão.' },
            { ref: 'Marcos 10:33-34', texto: 'Eis que subimos a Jerusalém, e o Filho do Homem será entregue aos principais sacerdotes.' },
          ],
          conteúdo: `## O Servo Sofredor: Profecias de Marcos

Marcos é o evangelho da paixão. Mais da metade de seu conteúdo (caps. 8-16) é dedicado aos eventos que levam à cruz e à ressurreição. No centro desse movimento estão as três previsões da paixão de Jesus — profecias que os discípulos não conseguem ou não querem compreender, mas que revelam a identidade mais profunda de Jesus como o Servo Sofredor de Isaías.

### As três previsões

**A primeira previsão (Mc 8:31):** "E começou a ensinar-lhes que era necessário (dei) que o Filho do Homem padecesse muito, fosse rejeitado pelos anciãos, pelos sumos sacerdotes e pelos escribas, fosse morto e ressuscitasse ao terceiro dia."

Essa previsão vem imediatamente após a confissão de Pedro em Cesareia de Filipe. O verbo "dei" (δεῖ) em grego é teologicamente carregado — significa não apenas "era necessário", mas "era imperative divino". A paixão de Jesus não é um acidente trágico — é o cumprimento do plano eterno de Deus.

A reação de Pedro é dramática: "Petero, puxando-o, começou a repreendê-lo" (Mc 8:32). Pedro não aceita um Messias que sofre — ele quer um Messias que conquiste. A resposta de Jesus é severa: "Vai-te detrás de mim, Satanás!" (Mc 8:33). O adversário da cruz é, paradoxalmente, o mais fiel dos discípulos.

**A segunda previsão (Mc 9:31):** "O Filho do Homem está sendo entregue (paradidomi — no presente, indicando processo contínuo) nas mãos dos homens, e o matarão; mas, depois de ressuscitado, no terceiro dia."

Marcos usa o verbo no presente — "está sendo entregue" — sugerindo que o processo já está em andamento. A traição não é um evento futuro; é uma realidade presente. Diferente da primeira previsão, Marcos não registra reação dos discípulos, mas menciona que "eles não entenderam essa palavra e temiam perguntar-lhe" (Mc 9:32). O silêncio é mais eloquente que a resistência de Pedro.

**A terceira previsão (Mc 10:33-34):** "Eis que subimos a Jerusalém, e o Filho do Homem será entregue aos principais sacerdotes e aos escribas; eles o condenarão à morte e o entregarão aos gentios. Zombarão dele, cospirão nele, o açoitam e o matarão; mas, ao terceiro dia, ressuscitará."

Essa é a previsão mais detalhada: inclui a traição, o julgamento, a condenação, a crucificação pelos gentios (romanos), a humilhação e a ressurreição. A progressão das três previsões é clara: cada uma é mais específica que a anterior, como se Jesus quisesse que os discípulus não tivessem dúvidas sobre o que estava por vir.

### O discípulo e a cruz

Marcos não apresenta a paixão como algo que acontece apenas com Jesus — é um padrão que se aplica a todos que O seguem. Imediatamente após a terceira previsão, Tiago e João pedem para sentar-se à direita e à esquerda de Jesus no Reino. A resposta de Jesus é direta: "Não sabeis o que pedis. Podeis beber do cálice que eu beberei, ou ser batizados com o batismo com que eu serei batizado?" (Mc 10:38-39).

O "cálice" e o "batismo" são imagens de sofrimento. Jesus não rejeita o pedido — ele o transforma em uma pergunta sobre compromisso. "Podeis beber?" A resposta é um convite ao discipulado radical: seguir Jesus significa compartilhar de sua paixão, não apenas de sua glória.

### A Paixão como narrativa

Os caps. 14-15 de Marcos são o clímax literário do evangelho. Marcos os estrutura como um paralelo preciso com a Última Ceia:

**No Getsêmani (Mc 14:32-42):** Jesus pede que os discípulos "vigiem" (grégorein) três vezes, mas eles adormecem. O verbo "vigiar" é o mesmo usado na parábola do serviço (Mc 13:34-37), criando um contraste trágico: o Mestre ordena vigiar, os servos dormem.

**A prisão (Mc 14:43-52):** Um detalhe único de Marcos — "um jovem que trazia apenas um lençol sobre o corpo nua fugiu, deixando-o" (Mc 14:51-52). Muitos estudiosos identificam esse jovem como o próprio Marcos, inserindo-se sutilmente na narrativa. É o primeiro testemunho ocular: "Eu estava lá".

**O julgamento (Mc 14:53-15:1):** O julgamento é uma farsa jurídica — as testemunhas contradizem-se, o sumo sacerdote rasga suas vestes (sinal de blasfêmia, mas sem direito de condenar à morte), e Jesus é condenado por blasfêmia quando afirma ser o Filho do Homem sentado à direita do Poder.

**A crucificação (Mc 15:22-39):** Marcos relata em apenas 17 versículos a crucificação, o que é extraordinariamente conciso. A brevidade é eloquente — o sofrimento fala por si mesmo. Os três horários de trevas (6ª à 9ª hora) ecoam a escuridão do Sinai (Êxodo 20:21).

**O véu rasgado (Mc 15:38):** O véu do templo rasga-se de cima para baixo — não de baixo para cima como o homem faria. A acessibilidade a Deus não é conquistada por esforço humano; é concedida por misericórdia divina.

### A teologia do Servo Sofredor

Marcos 10:45 é a chave hermenêutica de todo o evangelho. A expressão "em resgate por muitos" (anti pollon, ἀντὶ πολλῶν) usa a preposição "anti" que indica substituição — Jesus morre "no lugar de" muitos. Essa é a teologia da substituição vicária em sua forma mais pura: o Servo sofre pelos outros, não por si mesmo.

A paixão em Marcos não é um fracasso — é a consumação do serviço. O Servo Sofredor dá sua vida "em resgate" (lytron, λύτρον) — uma palavra que remete à liberação de escravos. O que Marcos retrata é um Êxodo definitivo: Jesus liberta a humanidade da escravidão do pecado pelo preço de sua própria vida.`,
        },
        {
          id: 'aula-ev-6-3',
          título: 'Marcos e a Missionologia: Rumo às nações',
          tipo: 'texto',
          duração: '12 min',
          versículosChave: [
            { ref: 'Marcos 16:15', texto: 'Ide por todo o mundo e pregai o evangelho a toda criatura.' },
            { ref: 'Marcos 13:10', texto: 'É necessário que o evangelho seja pregado antes a todas as nações.' },
            { ref: 'Marcos 10:45', texto: 'O Filho do Homem não veio para ser servido, mas para servir, e dar a sua vida em resgate por muitos.' },
          ],
          conteúdo: `## Marcos e a Missionologia: Rumo às nações

Embora Marcos seja o evangelho mais curto do Novo Testamento, ele contém uma das teologias missionárias mais densas e práticas da Bíblia. A compreensão de Marcos sobre a missão de Deus — que se estende das fronteiras de Israel ao mundo inteiro — moldou o cristianismo primitivo e continua inspirando igrejas e missionários hoje.

### O contexto romano de Marcos

Marcos foi escrito para cristãos gentios em Roma — a capital do império mundial. Esse contexto é fundamental: o evangelho que apresenta Jesus como Servo Sofredor é dirigido a pessoas que viviam no centro do poder imperial. A mensagem de Marcos é subversiva: o verdadeiro Rei não é César, mas Jesus, e sua soberania se exercita pelo serviço e pelo sacrifício.

Para os cristãos romanos, perseguidos e marginalizados, Marcos oferece um evangelho de resistência: o Reino de Deus avança não pela força militar, mas pela palavra, pela compaixão e pela fidelidade até a morte. É um evangelho para minorias que改变am o mundo sem violência.

### O evangelismo no ministério de Jesus

Marcos retrata Jesus como um evangelista itinerante que percorre a Galileia "pregando o evangelho de Deus" (Mc 1:14). O verbo "kerusso" (κηρύσσω) — pregar publicamente — aparece mais em Marcos que nos outros sinóticos, enfatizando a natureza proclamadora do ministério de Jesus.

O evangelho que Jesus prega é simples: "O Reino de Deus está próximo; arrependei-vos e crede no evangelho" (Mc 1:15). Dois elementos: (1) a iminência do Reino — Deus está agindo na história agora; e (2) a necessidade de resposta — arrependimento (mudança de direção) e fé (confiança em Deus).

Marcos retrata Jesus como alguém que evangeliza em múltiplos contextos: na sinagoga (Mc 1:21), na praça pública (Mc 2:1), na beira do mar (Mc 4:1), na montanha (Mc 3:13), em casas particulares (Mc 2:15), e até mesmo na beira da estrada (Mc 10:46). O evangelho não é confinado a locais sagrados — ele invade todos os espaços da vida.

### A Grande Comissão em Marcos

O final de Marcos é um dos textos mais discutidos da Bíblia. Os versículos 9-20 (a "Grande Comissão" de Marcos) são considerados por muitos estudiosos como uma adição posterior ao evangelho original, que terminaria em 16:8: "pois tinham medo."

Independentemente dessa questão textual, o conteúdo teológico dos versículos 15-18 é profético:

**"Ide por todo o mundo e pregai o evangelho a toda criatura" (Mc 16:15):** A missão não tem fronteiras geográficas ("todo o mundo") nem étnicas ("toda criatura"). O termo "ktisis" (κτίσις) — criatura — sugere que o evangelho é para toda a criação, não apenas para os judeus. Marcos antecipa a universalidade da Grande Comissão de Mateus 28:19.

**"Quem crer e for batizado será salvo; quem não crer será condenado" (Mc 16:16):** O evangelho de Marcos é inclusivo (para quem crê) e exclusivo (para quem rejeita). A salvação depende da resposta pessoal ao evangelho.

**"Esses sinais seguirão os que crerem" (Mc 16:17):** A missão é acompanhada de poder sobrenatural — não como espetáculo, mas como confirmação da palavra. Marcos apresenta a missão como uma aventura com Deus, não como uma tarefa humana solitária.

### A dispersão dos discípulos

Um tema recorrente em Marcos é o envio dos discípulos em missão. Em Mc 6:7-13, Jesus envia os doze em pares com autoridade sobre os espíritos imundos e instruções práticas: sem provision, sem dinheiro extra, sem sapatos extras, mas com poder para curar e expulsar demônios.

Em Mc 6:30-34, os discípulos voltam e relatam seus feitos. Jesus os leva para descansar — o equilíbrio entre ação e contemplação. Mas a multidão os encontra, e Jesus tem compaixão porque "estavam como ovelhas sem pastor". O descanso é interrompido pela necessidade — o modelo missionário de Marcos inclui sacrifício pessoal.

A dispersão dos discípulos prepara o terreno para a dispersão da igreja primitiva. O livro de Atos narra exatamente isso: os discípulos de Jesus, que começaram na Galileia, levam o evangelho a Jerusalém, Samaria, Antioquia, Roma e além. Marcos documenta o início desse movimento.

### A teologia missionária de Marcos

Marcos apresenta uma teologia missionária coerente e prática:

**1. Missão centrada no evangelho:** O centro não é a igreja, não é a cultura, não é a política — é a mensagem de que o Reino de Deus está próximo em Jesus.

**2. Missão encarnacional:** Jesus não ficou no céu pregando — ele veio à terra, viveu entre os homens, comeu com pecadores e tocou os impuros. A missão é encarnacional quando nos incarnamos nos contextos que servimos.

**3. Missão de serviço:** O versículo central (Mc 10:45) define a missão: servir e dar a vida. Não é uma missão de poder, mas de sacrifício voluntário.

**4. Missão para todos:** Marcos não restringe a missão a uma elite religiosa. A Grande Comissão é para "toda criatura" — sem distinção de raça, classe ou gênero.

**5. Missão com poder:** A missão não é apenas verbal — é acompanhada de sinais que confirmam a autoridade do evangelho.

Marcos nos lembra que a missão não é uma atividade opcional da igreja — é sua razão de existir. O evangelho que recebemos não é para ser guardado, mas compartilhado. E o modelo de Jesus é claro: servir até a morte, e deixar que Deus traga a ressurreição.`,
        },
        {
          id: 'aula-ev-6-4',
          título: 'Quiz: O Evangelho de Marcos',
          tipo: 'quiz',
          duração: '10 min',
          perguntas: [
            {
              id: 'qf-ev-6-1',
              pergunta: 'Qual é o público-alvo principal do evangelho de Marcos?',
              opções: ['Judeus religiosos', 'Cristãos gentios em Roma', 'Fariseus', 'Escolas filosóficas gregas'],
              respostaCorreta: 1,
              explicação: 'Marcos escreve para cristãos gentios, provavelmente em Roma. Isso se evidencia pelas explicações de costumes judaicos, tradução de termos aramaicos e pela ausência de genealogias.',
            },
            {
              id: 'qf-ev-6-2',
              pergunta: 'Qual palavra grega Marcos usa repetidamente para criar um senso de urgência na narrativa?',
              opções: ['Logos', 'Euthus (imediatamente)', 'Agape', 'Pneuma'],
              respostaCorreta: 1,
              explicação: 'Marcos usa "euthus" (εὐθύς) pelo menos 41 vezes — mais que todos os outros evangelhos juntos — criando ritmo acelerado e urgência narrativa.',
            },
            {
              id: 'qf-ev-6-3',
              pergunta: 'O que o "segredo messiânico" em Marcos significa?',
              opções: ['Jesus não queria ser conhecido', 'Jesus protegia a identidade messiânica até a cruz', 'Os discípulos eram burros', 'Era uma prova de humildade'],
              respostaCorreta: 1,
              explicação: 'O "segredo messiânico" protege Jesus de expectativas políticas erradas e prepara os discípulos para o choque da cruz — a identidade divina só será plenamente compreendida após a ressurreição.',
            },
            {
              id: 'qf-ev-6-4',
              pergunta: 'Qual é o versículo central de todo o evangelho de Marcos?',
              opções: ['Marcos 1:15', 'Marcos 8:29', 'Marcos 10:45', 'Marcos 16:15'],
              respostaCorreta: 2,
              explicação: 'Marcos 10:45 — "O Filho do Homem não veio para ser servido, mas para servir, e dar a sua vida em resgate por muitos" — é o tema central de todo o evangelho.',
            },
            {
              id: 'qf-ev-6-5',
              pergunta: 'Quantas vezes Jesus prevê sua paixão em Marcos?',
              opções: ['Uma', 'Duas', 'Três', 'Quatro'],
              respostaCorreta: 2,
              explicação: 'Jesus faz três previsões da paixão em Marcos (8:31, 9:31, 10:33-34), cada uma mais detalhada que a anterior.',
            },
            {
              id: 'qf-ev-6-6',
              pergunta: 'Qual reação Pedro tem à primeira previsão da paixão?',
              opções: ['Aceita com fé', 'Chora amargamente', 'Repreende Jesus', 'Silencia'],
              respostaCorreta: 2,
              explicação: 'Pedro "puxou Jesus e começou a repreendê-lo" (Mc 8:32), não aceitando um Messias que sofre. A resposta de Jesus foi: "Vai-te detrás de mim, Satanás!"',
            },
            {
              id: 'qf-ev-6-7',
              pergunta: 'Qual evento marca a virada central do evangelho de Marcos?',
              opções: ['O batismo', 'A Transfiguração', 'A confissão de Pedro em Cesareia', 'A Última Ceia'],
              respostaCorreta: 2,
              explicação: 'A confissão de Pedro em Cesareia de Filipe (Mc 8:27-30) divide o evangelho em duas partes iguais: ministério na Galileia (caps. 1-8) e jornada rumo à cruz (caps. 8-16).',
            },
            {
              id: 'qf-ev-6-8',
              pergunta: 'O que representa o véu rasgado no templo na crucificação?',
              opções: ['A destruição de Jerusalém', 'O acesso direto a Deus através de Jesus', 'O fim da Lei', 'A morte de César'],
              respostaCorreta: 1,
              explicação: 'O véu rasga-se de cima para baixo — a acessibilidade a Deus não é conquistada por esforço humano, mas concedida por misericórdia divina através da morte de Jesus.',
            },
            {
              id: 'qf-ev-6-9',
              pergunta: 'O que o jovem que foge na prisão de Jesus representa?',
              opções: ['Um anjo', 'O próprio Marcos como testemunha ocular', 'Um fariseu', 'Um escriba'],
              respostaCorreta: 1,
              explicação: 'Muitos estudiosos identificam o jovem de Mc 14:51-52 como o próprio Marcos, inserindo-se sutilmente na narrativa como testemunha ocular do evento.',
            },
            {
              id: 'qf-ev-6-10',
              pergunta: 'Segundo Marcos, qual é a relação entre o evangelho e as nações?',
              opções: ['O evangelho é apenas para judeus', 'O evangelho deve ser pregado antes a todas as nações', 'As nações não precisam do evangelho', 'O evangelho será esquecido pelas nações'],
              respostaCorreta: 1,
              explicação: 'Mc 13:10 declara: "É necessário que o evangelho seja pregado antes a todas as nações" — a missão universal é parte do plano de Deus.',
            },
          ],
        },
      ],
    },
  ],
};
