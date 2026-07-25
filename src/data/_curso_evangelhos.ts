import { Curso } from './cursos';

export const CURSO_EVANGELHOS: Curso = {
  id: 'evangelhos-vida-de-jesus',
  titulo: 'Evangelhos: A Vida de Jesus',
  descricao: 'Estudo comparativo dos quatro evangelhos — Mateus, Marcos, Lucas e João. A pessoa e obra de Cristo.',
  instrutor: 'Sola Scriptura',
  duracao: '8 semanas',
  nivel: 'intermediario',
  categoria: 'Novo Testamento',
  certificado: true,
  modulos: [
    {
      id: 'mod-mateus-rei',
      titulo: 'Mateus: O Rei dos Judeus',
      descricao: 'O evangelho que apresenta Jesus como o Messias prometido ao povo de Israel',
      icone: '👑',
      aulas: [
        {
          id: 'aula-ev-1-1',
          titulo: 'Introdução ao Evangelho de Mateus',
          tipo: 'texto',
          duracao: '15 min',
          conteudo: `## Introdução ao Evangelho de Mateus

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

Essa estrutura sugere que Mateus via Jesus como o novo Moises, trazendo não apenas a Lei, mas o cumprimento da Lei. Enquanto Moises recebeu os mandamentos no Monte Sinai, Jesus proclama a vontade de Deus no Monte das Oliveiras (ou em uma colina da Galileia).

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
          versiculosChave: [
            { ref: 'Mateus 1:1', texto: 'Livro da genealogia de Jesus Cristo, filho de Davi, filho de Abraão.' },
            { ref: 'Mateus 1:23', texto: 'Eis que a virgem conceberá e dará à luz um filho, e chamará o seu nome Emanuel, que traduzido é: Deus conosco.' },
            { ref: 'Mateus 28:18-19', texto: 'Toda autoridade me é dada no céu e na terra. Ide, portanto, e fazei discípulos de todas as nações.' },
          ],
        },
        {
          id: 'aula-ev-1-2',
          titulo: 'Genealogia e nascimento: Cumprimento de profecias',
          tipo: 'texto',
          duracao: '15 min',
          conteudo: `## Genealogia e nascimento: Cumprimento de profecias

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

**O problema**: Maria estava grávida antes de viver com José. Segundo a Lei de Moises (Deuteronômio 22:23-24), isso poderia resultar em lapidação. José, sendo justo, queria divorciar-se secretamente para não envergonhar Maria.

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
          versiculosChave: [
            { ref: 'Mateus 1:22-23', texto: 'Tudo isso aconteceu para que se cumprisse o que foi dito pelo Senhor, através do profeta: Eis que a virgem conceberá...' },
            { ref: 'Isaías 7:14', texto: 'Portanto, o próprio Senhor vos dará um sinal: Eis que a virgem conceberá e dará à luz um filho.' },
            { ref: 'Mateus 2:15', texto: 'E ficou ali até a morte de Herodes, para que se cumprisse o que foi dito pelo profeta: Do Egito chamei o meu filho.' },
          ],
        },
        {
          id: 'aula-ev-1-3',
          titulo: 'O Sermão do Monte (caps. 5-7)',
          tipo: 'texto',
          duracao: '20 min',
          conteudo: `## O Sermão do Monte (caps. 5-7)

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
          versiculosChave: [
            { ref: 'Mateus 5:1-2', texto: 'Vendo Jesus a multidão, subiu a um monte, e, assentando-se, aproximaram-se dele os seus discípulos.' },
            { ref: 'Mateus 5:17', texto: 'Não cuideis que vim destruir a Lei ou os Profetas; não vim destruir, mas cumprir.' },
            { ref: 'Mateus 6:33', texto: 'Mas, buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.' },
            { ref: 'Mateus 7:24', texto: 'Qualquer, pois, que ouve estas minhas palavras e as pratica, assemelhar-se-á ao homem prudente, que edificou a sua casa sobre a rocha.' },
          ],
        },
        {
          id: 'aula-ev-1-4',
          titulo: 'Parábolas do Reino (cap. 13)',
          tipo: 'texto',
          duracao: '15 min',
          conteudo: `## Parábolas do Reino (cap. 13)

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

A semente mais pequena do campo se torna a maior das árvores. O Reino começa pequeno — um judeu obscuro numa colina da Galileia — e se torna universal. Asmall beginnings, grande resultado.

**4. O Fermento (13:33)**

Uma mulher mistura fermento em três medidas de farinha até que tudo leveda. O Reino é como fermento: invisível, mas transformador. Ele permeia toda a sociedade.

**5. O Tesouro Escondido (13:44)**

Um homem encontra um tesouro num campo, vende tudo e compra o campo. O Reino vale mais que tudo o que temos. É um investimento radical.

**6. A Pérola de Grande Preço (13:45-46)**

Um comerciante busca pérolas finas e encontra uma de valor inestimável. Similar à parábola anterior — o Reino é o mais valioso de todos os bens.

**7. A Rede (13:47-50)**

Uha rede lançada ao mar聚集各种各样的鱼。在世界末了，天使将恶人从义人中分别出来。这与荞麦的比喻相似，但强调最终审判。

### A aplicação

Cada parábola desafia o ouvinte a se posicionar. O Reino não é abstrato — é concreto, presente e exige resposta. Jesus termina o capítulo perguntando: "Compreendeis todas essas coisas?" (13:51). Os discípulos dizem sim. Ele conclui: "Todo escriba instruído para o Reino dos céus é semelhante a um homem rico que tira do seu esconderijo coisas novas e antigas" (13:52).

Estudar as parábolas é como abrir um tesouro — sempre há algo novo para descobrir.`,
          versiculosChave: [
            { ref: 'Mateus 13:11', texto: 'Porque a vós é dado saber os mistérios do Reino dos céus, mas a eles não é dado.' },
            { ref: 'Mateus 13:31-32', texto: 'O Reino dos céus é semelhante ao grão de mostarda, que um homem toma e semeia no seu campo.' },
            { ref: 'Mateus 13:44', texto: 'O Reino dos céus é semelhante a um tesouro escondido num campo. O qual, quando um homem o acha, esconde-o, e, pela alegria que dele tem, vai e vende tudo o que tem, e compra esse campo.' },
            { ref: 'Mateus 13:49', texto: 'Assim será no fim do mundo: sairão os anjos, e separarão os maus do meio dos justos.' },
          ],
        },
        {
          id: 'aula-ev-1-5',
          titulo: 'A Grande Comissão (cap. 28)',
          tipo: 'texto',
          duracao: '15 min',
          conteudo: `## A Grande Comissão (cap. 28)

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
          versiculosChave: [
            { ref: 'Mateus 28:18-20', texto: 'Toda autoridade me é dada no céu e na terra. Ide, portanto, e fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo, ensinando-os a guardar todas as coisas que vos tenho ordenado. E eis que estou convosco todos os dias, até a consumação do século.' },
            { ref: 'Mateus 28:17', texto: 'E, vendo-o, o adoraram; mas alguns duvidaram.' },
            { ref: 'Gênesis 12:3', texto: 'Em ti serão abençoadas todas as famílias da terra.' },
          ],
        },
      ],
    },
    {
      id: 'mod-marcos-servo',
      titulo: 'Marcos: O Servo Sofredor',
      descricao: 'O evangelho mais curto e dinâmico, centrado na ação e no serviço de Jesus',
      icone: '🕊️',
      aulas: [
        {
          id: 'aula-ev-2-1',
          titulo: 'Introdução ao Evangelho de Marcos',
          tipo: 'texto',
          duracao: '15 min',
          conteudo: `## Introdução ao Evangelho de Marcos

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

Marcos não tem五段论结构 como Mateus. Ele usa uma abordagem mais narrativa:

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
          versiculosChave: [
            { ref: 'Marcos 10:45', texto: 'Porque o Filho do Homem não veio para ser servido, mas para servir, e dar a sua vida em resgate por muitos.' },
            { ref: 'Marcos 1:1', texto: 'Princípio do evangelho de Jesus Cristo, Filho de Deus.' },
            { ref: 'Marcos 16:15', texto: 'Ide por todo o mundo, e pregai o evangelho a toda criatura.' },
          ],
        },
        {
          id: 'aula-ev-2-2',
          titulo: 'O serviço de Jesus (Marcos 10:45)',
          tipo: 'texto',
          duracao: '15 min',
          conteudo: `## O serviço de Jesus (Marcos 10:45)

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
          versiculosChave: [
            { ref: 'Marcos 10:45', texto: 'Porque o Filho do Homem não veio para ser servido, mas para servir, e dar a sua vida em resgate por muitos.' },
            { ref: 'Marcos 10:43-44', texto: 'Mas não é assim entre vós; mas, entre vós, quem quiser ser grande, será vosso servo; e, entre vós, quem quiser ser o primeiro, será escravo de todos.' },
            { ref: 'Daniel 7:13-14', texto: 'E foi-lhe dada a soberania, a honra e o reino... o seu domínio é eterno.' },
          ],
        },
        {
          id: 'aula-ev-2-3',
          titulo: 'Os milagres como evidência (caps. 1-8)',
          tipo: 'texto',
          duracao: '15 min',
          conteudo: `## Os milagres como evidência (caps. 1-8)

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

Jesus encontra um homem possuído por uma legião de demônios que vive entre os túmulos, gritando e se autodeferindo. Ninguém conseguia控制á-lo. Jesus expulsa os demônios em porcos — e o homem fica "em sã consciência, assentado e bem-vestido" (5:15). A restauração é completa.

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
          versiculosChave: [
            { ref: 'Marcos 1:27', texto: 'Que é isto? Um ensino novo! Com autoridade manda até nos espíritos imundos, e eles lhe obedecem!' },
            { ref: 'Marcos 2:5', texto: 'Jesus, vendo a fé deles, disse ao paralítico: Filho, estão perdoados os teus pecados.' },
            { ref: 'Marcos 4:39', texto: 'E, despertando, repreendeu o vento, e disse ao mar: Calma, pega! E o vento cessou, e fez-se grande bonança.' },
          ],
        },
        {
          id: 'aula-ev-2-4',
          titulo: 'A paixão e crucificação (caps. 14-15)',
          tipo: 'texto',
          duracao: '15 min',
          conteudo: `## A paixão e crucificação (caps. 14-15)

A segunda metade de Marcos (caps. 14-15) é dedicada integralmente à paixão de Jesus. Enquanto a primeira metade mostra Jesus em ação curando e ensinando, a segunda mostra o Servo Sofredor — aquele que dá sua vida por muitos.

### A unção em Betânia (14:3-9)

Uma mulher unge os pés de Jesus com perfume de nardo puro, que valia mais de 300 denários — quase um ano de salário. Os discípulos reclamam: "Para que este desperdício?" (14:4). Jesus responde: "Deixai-a; para que o dia da minha sepultura ela o faça" (14:8). A mulher antecipa a morte de Jesus. Marcos, escrevendo depois da ressurreição, entende: ela ungiu o Cordeiro de Deus.

### A Última Ceia (14:12-26)

A ceia pascal é o contexto da Última Ceia. Jesus está celebrando a Páscoa — o lembrate da libertação do Egito. Mas Ele transforma o ritual: "Isto é o meu corpo" (14:22); "Este é o meu sangue da aliança, que é derramado por muitos" (14:24).

A aliança não é a antiga (Moises no Sinai) — é nova. O sangue de Jesus inaugura uma nova relação entre Deus e os homens. Jesus antecipa a traição de Pedro e a fuga dos discípulos, mas continua comendo. A ceia é misericórdia mesmo na traição.

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
          versiculosChave: [
            { ref: 'Marcos 14:36', texto: 'E disse: Abba, Pai! Tudo é possível para ti; afasta este cálice de mim; não o que eu quero, mas o que tu queres.' },
            { ref: 'Marcos 15:34', texto: 'E, à nona hora, Jesus clamarou com grande voz, dizendo: Eloi, Eloi, lema sabactâni? Que quer dizer: Meu Deus, meu Deus, por que me desamparaste?' },
            { ref: 'Marcos 15:39', texto: 'E, vendo o centurião que assim gritou e expirou, disse: Verdadeiramente este homem era Filho de Deus.' },
          ],
        },
        {
          id: 'aula-ev-2-5',
          titulo: 'A ressurreição e ascensão (cap. 16)',
          tipo: 'texto',
          duracao: '15 min',
          conteudo: `## A ressurreição e ascensão (cap. 16)

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

Alguns estudiosos sugerem que Marcos planejava escribir mais, mas o manuscrito original se perdeu. Outros argumentam que o final intencionalmente deixa a história aberta — porque a história de Jesus continua através da igreja.

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
          versiculosChave: [
            { ref: 'Marcos 16:6', texto: 'Não vos assusteis. Buscais a Jesus nazareno, que foi crucificado; não está aqui; ressuscitou.' },
            { ref: 'Marcos 16:15', texto: 'E disse-lhes: Ide por todo o mundo, e pregai o evangelho a toda criatura.' },
            { ref: 'Marcos 16:19', texto: 'E, depois de lhes ter falado, foi recebido no céu, e assentou-se à direita de Deus.' },
          ],
        },
      ],
    },
    {
      id: 'mod-lucas-filho',
      titulo: 'Lucas: O Filho do Homem',
      descricao: 'O evangelho que enfatiza a humanidade de Jesus, a compaixão e os marginados',
      icone: '🌟',
      aulas: [
        {
          id: 'aula-ev-3-1',
          titulo: 'Introdução ao Evangelho de Lucas',
          tipo: 'texto',
          duracao: '15 min',
          conteudo: `## Introdução ao Evangelho de Lucas

Lucas é o evangelho mais literário, mais detalhado e mais focado na humanidade de Jesus. Escrito por um médico gentio, é dirigido a um público grego, e retrata Jesus como o Filho do Homem — perfeito em sua humanidade, cheio de compaixão e misericórdia.

### Autor e data

O autor é Lucas, mencionado em Colossenses 4:14 como "o médico amado". Lucas não era apóstolo — era companheiro de Paulo em suas viagens missionárias (Atos 16:10-17; 20:5-15; 27:1-28:16). Ele escreveu tanto o evangelho quanto Atos dos Apóstolos — dois volumes que formam a história do cristianismo primitivo.

Lucas era um homem culto, meticulous e detalhista. Ele investigou cuidadosamente antes de escrever (Lucas 1:1-4), interviewando testemunhas oculares e organizando os relatos em ordem cronológica. Seu evangelho é o mais longo do Novo Testamento.

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
4. **Viagem a Jerusalém** (9:51-19:27) — O caminho do十字架
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
- **Prayerful** — oração é um tema constante (Jesus ora antes de cada decisão importante)
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
          versiculosChave: [
            { ref: 'Lucas 1:3-4', texto: 'Também eu, depois de ter feito diligente investigação de tudo desde o princípio, resolvi escrever-te orderly, ó excelente Teófilo.' },
            { ref: 'Lucas 19:10', texto: 'Porque o Filho do Homem veio buscar e salvar o que se havia perdido.' },
            { ref: 'Lucas 4:18-19', texto: 'O Espírito do Senhor está sobre mim, porque me ungiu para pregar boas novas aos pobres... para libertar os cativos.' },
          ],
        },
        {
          id: 'aula-ev-3-2',
          titulo: 'O nascimento narrado (caps. 1-2)',
          tipo: 'texto',
          duracao: '15 min',
          conteudo: `## O nascimento narrado (caps. 1-2)

Lucas 1-2 é a narrativa mais detalhada do nascimento de Jesus no Novo Testamento. É rica em poesia, profecia e humanidade. Mateus foca em José; Lucas foca em Maria. Juntos, completam o retrato.

### A promessa a Zacarias (1:5-25)

Zacarias e Elisabete são sacerdotes idosos e estéreis — uma dupla vergonha na cultura judaica. Zacarias está servindo no templo quando um anjo aparece: Gabriel. A Elisabete nascerá um filho, João, que preparará o caminho do Senhor.

Zacarias duvida: "Como saberei isso? Pois sou velho, e minha mulher é de edad avançada" (1:18). Gabriel o torna mudo até o nascimento do filho. A incredulidade tem consequências — mas Deus não abandona o projeto.

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
          versiculosChave: [
            { ref: 'Lucas 1:37', texto: 'Porque nada é impossível a Deus.' },
            { ref: 'Lucas 1:46-47', texto: 'A minha alma glorifica ao Senhor, e o meu espírito se alegra em Deus, meu Salvador.' },
            { ref: 'Lucas 2:11', texto: 'Hoje, na cidade de Davi, vos nasceu o Salvador, que é o Cristo, o Senhor.' },
            { ref: 'Lucas 2:29-30', texto: 'Agora soltas o teu servo em paz, segundo a tua palavra, porque os meus viram a tua salvação.' },
          ],
        },
        {
          id: 'aula-ev-3-3',
          titulo: 'Jesus e os marginados',
          tipo: 'texto',
          duracao: '15 min',
          conteudo: `## Jesus e os marginados

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
          versiculosChave: [
            { ref: 'Lucas 15:7', texto: 'Assim, vos digo que haverá mais alegria no céu por um pecador que se arrepende do que por noventa e nove justos que não necessitam de arrependimento.' },
            { ref: 'Lucas 15:20', texto: 'Mas, ainda ele longe, o viu o pai, e se moveu de compaixão, e, correndo, lançou-se-lhe ao pescoço, e o beijou.' },
            { ref: 'Lucas 19:10', texto: 'Porque o Filho do Homem veio buscar e salvar o que se havia perdido.' },
            { ref: 'Lucas 10:33', texto: 'Mas um samaritano, de caminho, chegou perto dele, e, vendo-o, moveu-se de compaixão.' },
          ],
        },
        {
          id: 'aula-ev-3-4',
          titulo: 'Jesus e a oração',
          tipo: 'texto',
          duracao: '15 min',
          conteudo: `## Jesus e a oração

A oração é um tema central no evangelho de Lucas. Mais que qualquer outro evangelista, Lucas retrata Jesus como um homem de oração — someone que toma decisões, enfrenta crises e mantém comunhão com o Pai através da oração.

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
          versiculosChave: [
            { ref: 'Lucas 5:16', texto: 'Jesus, porém, frequentemente se retirava para lugares solitários e orava.' },
            { ref: 'Lucas 11:1', texto: 'Aconteceu que, estando Jesus em oração em certo lugar, quando cessou, um dos seus discípulos lhe disse: Senhor, ensina-nos a orar.' },
            { ref: 'Lucas 11:9', texto: 'Pedi, e ser-vos-á dado; buscareis, e achareis; batei, e ser-vos-á aberto.' },
            { ref: 'Lucas 22:42', texto: 'Pai, se queres, afasta de mim este cálice; contudo, não a minha vontade, mas a tua se cumpra.' },
          ],
        },
        {
          id: 'aula-ev-3-5',
          titulo: 'A ressurreição em Lucas',
          tipo: 'texto',
          duracao: '15 min',
          conteudo: `## A ressurreição em Lucas

Lucas 24 é o relato mais detalhado e teologicamente rico da ressurreição de Jesus. Enquanto Marcos termina em 16:8 com as mulheres assustadas, Lucas dá a continuação — e é gloriosa.

### As mulheres no túmulo (24:1-12)

Maria Madalena, Joana, Maria, mãe de Tiago e outras mulheres vão ao túmulo com especiarias. A pedra já está rolada. Elas entram, não encontram o corpo de Jesus.

"Dois homens com vestes resplandecentes" aparecem e dizem: "Por que buscais entre os mortos o que está vivo? Não está aqui, mas ressuscitou" (24:5-6). A pergunta é devastadora — se Jesus vive, por que buscar entre os mortos?

As mulheres lembram das palavras de Jesus e vão anunciar aos onze. Mas "esta palavra lhes pareceu um crebilão, e não lhes creram" (24:11). A incredulidade diante da ressurreição é um tema em todos os evangelhos — mas Lucas é particularmente honesto.

### Os discípulos de Emaús (24:13-35)

Este é o dos relatos mais bonitos do Novo Testamento. Dois discípulos caminham de Jerusalém a Emaús, desanimados. Jesus caminha com eles, mas eles não O reconhecem (24:16).

Jesus pergunta o que os aflige. Um deles responde: "Tu és o único de Jerusalém que não sabes destas coisas que ali aconteceram?" (24:18). Jesus pergunta: "Que coisas?" Eles respondem: "Sobre Jesus de Nazaré, que foi profeta poderoso em obras e palavras... mas nós esperávamos que fosse ele o que resgataria a Israel" (24:19-21).

Jesus os corrige: "Ó insensatos, e de coração tardio para crer em tudo o que os profetas disseram!" (24:25). Então, "principiando por Moises e por todos os profetas, explicou-lhes o que dele dizia em todas as Escrituras" (24:27).

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
          versiculosChave: [
            { ref: 'Lucas 24:5-6', texto: 'Por que buscais entre os mortos o que está vivo? Não está aqui, mas ressuscitou.' },
            { ref: 'Lucas 24:27', texto: 'E, principiando por Moises e por todos os profetas, explicou-lhes o que dele dizia em todas as Escrituras.' },
            { ref: 'Lucas 24:46-47', texto: 'Assim está escrito, e assim cumpria-se que o Cristo havia de padecer e ressuscitar dentre os mortos ao terceiro dia.' },
            { ref: 'Lucas 24:52', texto: 'E, tendo-lhes feito uma inclinação, voltou para Jerusalém com grande alegria.' },
          ],
        },
      ],
    },
    {
      id: 'mod-joao-verbo',
      titulo: 'João: O Verbo Encarnado',
      descricao: 'O evangelho teológico que proclama a divindade de Jesus — "No princípio era o Verbo"',
      icone: '✨',
      aulas: [
        {
          id: 'aula-ev-4-1',
          titulo: 'Introdução ao Evangelho de João',
          tipo: 'texto',
          duracao: '15 min',
          conteudo: `## Introdução ao Evangelho de João

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
2. Curar o filho do official (4:46-54)
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
          versiculosChave: [
            { ref: 'João 1:1', texto: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
            { ref: 'João 1:14', texto: 'E o Verbo se fez carne, e habitou entre nós, e vimos a sua glória, como a do unigênito do Pai, cheio de graça e de verdade.' },
            { ref: 'João 20:31', texto: 'Mas estes foram escritos para que creiais que Jesus é o Cristo, o Filho de Deus, e, crendo, tenhais vida em seu nome.' },
          ],
        },
        {
          id: 'aula-ev-4-2',
          titulo: 'O Prólogo (João 1:1-18)',
          tipo: 'texto',
          duracao: '15 min',
          conteudo: `## O Prólogo (João 1:1-18)

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

> "Porque da sua plenitude tomamos todos nós, e graça sobre graça. Porque a Lei foi dada por Moises; a graça e a verdade vieram por Jesus Cristo." (1:16-17)

A Lei revelou o padrão de Deus; a graça de Jesus dá o poder para cumprir. Não é Lei contra graça — é Lei preparando para graça. Moises deu a sombra; Jesus deu a substância.

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
          versiculosChave: [
            { ref: 'João 1:1', texto: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
            { ref: 'João 1:14', texto: 'E o Verbo se fez carne, e habitou entre nós.' },
            { ref: 'João 1:12', texto: 'Mas, a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus, aos que creem no seu nome.' },
            { ref: 'João 1:18', texto: 'Ninguém jamais viu a Deus; o unigênito Filho, que está no seio do Pai, esse o fez conhecer.' },
          ],
        },
        {
          id: 'aula-ev-4-3',
          titulo: 'Os 7 "Eu Sou" de Jesus',
          tipo: 'texto',
          duracao: '15 min',
          conteudo: `## Os 7 "Eu Sou" de Jesus

Em João, Jesus faz sete declarações "Eu Sou" (*egō eimi*) que ecoam o nome divino revelado a Moises no Monte Sinai: "Eu Sou o que Sou" (Êxodo 3:14). Cada "Eu Sou" revela um aspecto da identidade de Jesus como Deus encarnado.

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
          versiculosChave: [
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
          titulo: 'Os 7 sinais milagrosos',
          tipo: 'texto',
          duracao: '15 min',
          conteudo: `## Os 7 sinais milagrosos

Enquanto os sinóticos relatam dezenas de milagres, João seleciona cuidadosamente sete — os "sinais" (*sēmeia*). A palavra "sinal" é importante: os milagres não são espetáculo, são evidências da identidade e missão de Jesus. Cada sinal aponta para algo maior.

### 1. Transformar água em vinho (2:1-11)

**Contexto:** Bodas de Caná, na Galileia. O vinho acaba — uma vergonha social. Jesus transforma água de rituais de purificação em vinho de qualidade superior.

**O sinal:** A água da Lei (ritualismo vazio) se transforma no vinho da graça (alegria nova). "O princípio dos sinais Jesus o fez em Caná da Galileia, e manifestou a sua glória; e os seus discípulos creram nele" (2:11).

**Significado teológico:** Jesus é o novíssimo — Ele restaura o que falta, transforma o ordinário em extraordinário, e começa Sua vida pública com alegria, não com severidade.

### 2. Curar o filho do official (4:46-54)

**Contexto:** Um official romano pede que Jesus cure seu filho doente. Jesus diz: "Vai; o teu filho vive" (4:50). O official acredita e vai. No caminho, seus servos confirmam: o filho melhorou na mesma hora.

**O sinal:** A cura acontece à distância — Jesus não vai à casa. A palavra de Jesus tem poder sem presença física.

**Significado teológico:** A fé不需要verificação visual. "Porque viu o teu filho, e creste" (4:53). A fé se baseia na palavra de Jesus, não nas circunstâncias.

### 3. Curar o paralítico na piscina de Betesda (5:1-15)

**Contexto:** Uma piscina em Jerusalém onde, segundo a tradição, o primeiro a entrar na água quando ela se agitava seria curado. Jesus encontra um homem doente há 38 anos e pergunta: "Quer ser sarado?" (5:6).

**O sinal:** Jesus cura no sábado — um ato deliberado de desafio à religiosidade que impedia o bem.

**Significado teológico:** Jesus tem autoridade sobre a Lei e sobre o sábado. O sábado foi feito para o homem, não o homem para o sábado (Marcos 2:27). A religião que impede a misericórdia é contra Deus.

### 4. Multiplicar pães e peixes (6:1-14)

**Contexto:** 5.000 pessoas em um lugar ermo. Filipe calcula: 200 denários de pão não bastariam. Um menino tem cinco pães de cevada e dois peixes. Jesus multiplica.

**O sinal:** Alimenta uma multidão com quase nada. "Todos se fartaram" (6:13), e sobram 12 cestos — um para cada tribo de Israel.

**Significado teológico:** Jesus é o novo Moises (que deu maná no deserto), mas maior. O maná era temporário; o pão de Jesus é eterno: "Eu sou o pão da vida" (6:35).

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
          versiculosChave: [
            { ref: 'João 2:11', texto: 'Este foi o princípio dos sinais Jesus, o de Caná da Galileia, e manifestou a sua glória; e os seus discípulos creram nele.' },
            { ref: 'João 11:25', texto: 'Disse-lhe Jesus: Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá.' },
            { ref: 'João 11:43', texto: 'E, dizendo isto, clamou com grande voz: Lázaro, sai!' },
            { ref: 'João 9:3', texto: 'Nem este pecou, nem seus pais, mas isto aconteceu para que se manifestem nele as obras de Deus.' },
          ],
        },
        {
          id: 'aula-ev-4-5',
          titulo: 'Quiz Final: Comparação dos 4 Evangelhos',
          tipo: 'quiz',
          duracao: '10 min',
          perguntas: [
            {
              id: 'qf-ev-1',
              pergunta: 'Qual evangelho começa com a genealogia de Jesus conectando-o com Abraão e Davi?',
              opcoes: ['Marcos', 'Lucas', 'Mateus', 'João'],
              respostaCorreta: 2,
              explicacao: 'Mateus começa com a genealogia em Mateus 1:1-17, conectando Jesus com Abraão e Davi para mostrar que Ele é o Messias prometido ao povo judeu.',
            },
            {
              id: 'qf-ev-2',
              pergunta: 'Qual evangelho apresenta Jesus como o "Filho do Homem" com ênfase na sua humanidade?',
              opcoes: ['Mateus', 'João', 'Marcos', 'Lucas'],
              respostaCorreta: 3,
              explicacao: 'Lucas retrata Jesus como o Filho do Homem — perfeito em sua humanidade, comê, bebe, chora, ora e tem compaixão dos marginados. É o evangelho mais focado na humanidade de Jesus.',
            },
            {
              id: 'qf-ev-3',
              pergunta: 'Qual é o versículo-chave de todo o evangelho de Marcos?',
              opcoes: ['João 1:1', 'Mateus 28:19', 'Marcos 10:45', 'Lucas 24:47'],
              respostaCorreta: 2,
              explicacao: 'Marcos 10:45 — "O Filho do Homem não veio para ser servido, mas para servir, e dar a sua vida em resgate por muitos" — é o tema central do evangelho.',
            },
            {
              id: 'qf-ev-4',
              pergunta: 'Qual evangelho tem como público-alvo principal os judeus?',
              opcoes: ['João', 'Lucas', 'Marcos', 'Mateus'],
              respostaCorreta: 3,
              explicacao: 'Mateus foi escrito para cristãos judeus. Por isso tem mais de 60 citações do AT, enfatiza o cumprimento de profecias e apresenta Jesus como o Messias (Cristo) prometido.',
            },
            {
              id: 'qf-ev-5',
              pergunta: 'Em João 1:1, a expressão "o Verbo era Deus" confirma que Jesus:',
              opcoes: ['É um profeta superior', 'É uma criatura celestial', 'É Deus em essência', 'É anjo de Deus'],
              respostaCorreta: 2,
              explicacao: 'João 1:1 declara explicitamente que "o Verbo era Deus" — afirmando a divindade plena de Jesus desde a eternidade.',
            },
            {
              id: 'qf-ev-6',
              pergunta: 'Qual é a parábola exclusiva de Lucas que ensina o perdão incondicional de Deus?',
              opcoes: ['O Semeador', 'O Filho Pródigo', 'O Bom Samaritano', 'A Pérola de Grande Preço'],
              respostaCorreta: 1,
              explicacao: 'O Filho Pródigo (Lucas 15:11-32) é exclusiva de Lucas e revela o coração do Pai que corre, abraça e restaura o filho que volta.',
            },
            {
              id: 'qf-ev-7',
              pergunta: 'Qual dos "Eu Sou" de Jesus em João declara: "Eu sou o caminho, a verdade e a vida"?',
              opcoes: ['Capítulo 6:35', 'Capítulo 10:11', 'Capítulo 14:6', 'Capítulo 15:1'],
              respostaCorreta: 2,
              explicacao: 'João 14:6 — a declaração mais exclusiva de Jesus. Ele não dá um caminho — Ele é o caminho. Não mostra a verdade — Ele é a verdade. Não oferece vida — Ele é a vida.',
            },
            {
              id: 'qf-ev-8',
              pergunta: 'Qual evangelho retrata Jesus como o "Servo Sofredor" baseado em Isaías 53?',
              opcoes: ['Lucas', 'Mateus', 'João', 'Marcos'],
              respostaCorreta: 3,
              explicacao: 'Marcos retrata Jesus como o Servo Sofredor que dá sua vida por muitos. A segunda metade do evangelho é dedicada à paixão e crucificação.',
            },
            {
              id: 'qf-ev-9',
              pergunta: 'Qual evangelho contém o relato mais detalhado do nascimento de Jesus, incluindo o cântico de Maria (Magnificat)?',
              opcoes: ['Mateus', 'João', 'Lucas', 'Marcos'],
              respostaCorreta: 2,
              explicacao: 'Lucas 1-2 é o relato mais detalhado do nascimento, incluindo a Anunciação, o Magnificat (1:46-55), o nascimento em Belém e a apresentação no templo.',
            },
            {
              id: 'qf-ev-10',
              pergunta: 'Qual é o propósito declarado do evangelho de João segundo João 20:31?',
              opcoes: ['Registrar fatos históricos', 'Ensinar ética cristã', 'Creiam que Jesus é o Cristo e tenham vida', 'Converter os judeus'],
              respostaCorreta: 2,
              explicacao: 'João 20:31 declara: "Estes foram escritos para que creiais que Jesus é o Cristo, o Filho de Deus, e, crendo, tenhais vida em seu nome."',
            },
          ],
        },
      ],
    },
  ],
};
