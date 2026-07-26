export interface QuizQuestion {
  id: string;
  pergunta: string;
  opções: string[];
  respostaCorreta: number;
  explicação: string;
}

export interface CursoAula {
  id: string;
  título: string;
  tipo: 'texto' | 'quiz' | 'video';
  duração: string;
  conteúdo?: string;
  videoUrl?: string;
  videoTítulo?: string;
  versículosChave?: { ref: string; texto: string }[];
  perguntas?: QuizQuestion[];
}

export interface CursoModulo {
  id: string;
  título: string;
  descrição: string;
  ícone: string;
  aulas: CursoAula[];
}

export interface Curso {
  id: string;
  título: string;
  descrição: string;
  instrutor: string;
  duração: string;
  nível: 'iniciante' | 'intermediário' | 'avançado';
  categoria: string;
  certificado: boolean;
  módulos: CursoModulo[];
}

import { CURSO_FUNDAMENTOS } from './_curso_fundamentos';
import { CURSO_HERMENEUTICA } from './_curso_hermenutica';
import { CURSO_EVANGELHOS } from './_curso_evangelhos';
import { CURSO_EXODO } from './_curso_exodo';
import { CURSO_SALMOS } from './_curso_salmos';
import { CURSO_ROMANOS } from './_curso_romanos';
import { CURSO_APOCALIPSE } from './_curso_apocalipse';

export const CURSOS: Curso[] = [
  {
    id: 'conhecendo-a-biblia',
    título: 'Conhecendo a Bíblia',
    descrição: 'Os pilares para entender a Bíblia: inspiração, cânon, traduções, divisões e métodos de estudo. O primeiro passo para qualquer crente.',
    instrutor: 'Sola Scriptura',
    duração: '4 semanas',
    nível: 'iniciante',
    categoria: 'Introdução Bíblica',
    certificado: true,
    módulos: [
      {
        id: 'mod-o-que-e-biblia',
        título: 'O Que é a Bíblia?',
        descrição: 'A origem e a natureza das Escrituras',
        ícone: '📖',
        aulas: [
          {
            id: 'aula-1-1',
            título: 'A Bíblia: Palavra de Deus para os homens',
            tipo: 'video',
            duração: '12 min',
            videoUrl: 'https://www.youtube.com/watch?v=nl7lIu3MHK4',
            videoTítulo: 'Revelação, inspiração e iluminação - Bíblia e Teologia com Moises Brasil',
            conteúdo: `## A Bíblia: Palavra de Deus para os homens

A Bíblia não é apenas um livro — é uma biblioteca de 66 livros escritos ao longo de aproximadamente 1.500 anos, por mais de 40 autores, em três idiomas (hebraico, arameu e grego). Apesar de tanta diversidade, ela apresenta uma mensagem única e coerente: o plano redentor de Deus para a humanidade.

### O que a Bíblia afirma sobre si mesma

> "Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção, para a educação na justiça, a fim de que o homem de Deus seja completo e perfeitamente aparelhado para toda boa obra." — 2 Timóteo 3:16-17

Essa passagem é fundamental. Ela nos diz que:

1. **Toda a Escritura é inspirada por Deus** — não só parte dela. O termo grego *theopneustos* significa "soprada por Deus", indicando que as palavras da Bíblia vieram por inspiração divina.
2. **É útil para múltiplos propósitos** — ensino, repreensão, correção e educação. A Bíblia não é teoria; é prática para a vida.
3. **O resultado é um cristão completo** — equipado para toda boa obra.

### Dupla natureza: divina e humana

A Bíblia é ao mesmo tempo **divina** (originada de Deus) e **humana** (escrita por homens). Isso não é uma contradição — é o mistério da inspiração. Deus usou a personalidade, a cultura, o idioma e o estilo de cada autor, sem anular sua individualidade, para produzir exatamente o que Ele queria comunicar.

Imagine um escriba que trabalha com um rei. O rei ditou a mensagem, mas o escriba usou sua própria caligrafia. A mensagem é do rei; a forma é do escriba. Assim funciona a inspiração bíblica.

### Por que isso importa

Se a Bíblia é realmente Palavra de Deus, ela tem autoridade sobre a nossa vida. Não é um livro de sugestões ou sabedoria humana — é a revelação de como Deus quer que vivamos, como podemos conhecê-lo, e o que espera para o futuro.

Estudar a Bíblia não é apenas um exercício intelectual. É o caminho para conhecer a Deus pessoalmente.`,
            versículosChave: [
              { ref: '2 Timóteo 3:16-17', texto: 'Toda a Escritura é inspirada por Deus...' },
              { ref: '2 Pedro 1:20-21', texto: 'Nenhuma profecia da Escritura é de interpretação própria...' },
              { ref: 'Hebreus 4:12', texto: 'Porque a palavra de Deus é viva e eficaz...' },
            ],
          },
          {
            id: 'aula-1-2',
            título: 'Como a Bíblia foi formada: O cânon bíblico',
            tipo: 'video',
            duração: '15 min',
            videoUrl: 'https://www.youtube.com/watch?v=VrfoiblrS4I',
            videoTítulo: 'Como a Bíblia Foi Formada? A História do Cânon das Escrituras - Lécio Ferreira',
            conteúdo: `## Como a Bíblia foi formada: O cânon bíblico

O termo "cânon" vem do grego *kanon*, que significa "régua" ou "padrão". O cânon bíblico é a lista dos livros que reconhecemos como Palavra de Deus. Mas como essa lista foi formada?

### Os 39 livros do Antigo Testamento

Os judeus já reconheciam os livros do AT muito antes de Cristo. O Pentateuco (os 5 livros de Moisés) foi aceito desde o século V a.C. Os profetas e escritos foram sendo reconhecidos ao longo dos séculos. Na época de Jesus, os judeus já tinham uma Bíblia praticamente fechada.

Os 39 livros do AT se dividem em:
- **Pentateuco** (5): Gênesis a Deuteronômio
- **Históricos** (12): Josué a Ester
- **Poéticos** (5): Jó a Cântico dos Cânticos
- **Proféticos Maiores** (5): Isaías a Daniel
- **Proféticos Menores** (12): Oseias a Malaquias

### Os 27 livros do Novo Testamento

O NT foi formado mais rapidamente. As cartas de Paulo já circulavam nas igrejas desde a década de 50 d.C. Os evangelhos foram escritos entre 60-100 d.C. A igreja primitiva usou três critérios para aceitar um livro no cânon:

1. **Origem apostólica** — escrito por um apóstolo ou muito próximo de um
2. **Uso na igreja** — era lido nas reuniões desde cedo
3. **Consistência** — estava de acordo com a já recebida

### Livros que não entraram

Alguns livros como o Pastor de Hermas, a Epístola de Barnabas e o Didache foram usados pela igreja antiga, mas não foram incluídos no cânon. Eles podem ser úteis para o estudo histórico, mas não são considerados Palavra de Deus inspirada.

### Por que o cânon importa

O cânon nos dá segurança. Sabemos que temos exatamente o que Deus quis comunicar — nem mais, nem menos. A Bíblia é um livro fechado e completo.`,
            versículosChave: [
              { ref: 'Apocalipse 22:18-19', texto: 'Se alguém acrescentar alguma coisa...' },
              { ref: 'Lucas 24:27', texto: 'E, começando por Moisés...' },
            ],
          },
        ],
      },
      {
        id: 'mod-traduções',
        título: 'Traduções e Versões',
        descrição: 'Entenda as diferenças entre as traduções bíblicas',
        ícone: '🌍',
        aulas: [
          {
            id: 'aula-2-1',
            título: 'Por que existem tantas traduções?',
            tipo: 'video',
            duração: '12 min',
            videoUrl: 'https://www.youtube.com/watch?v=1vnuVNZ1A8Q',
            videoTítulo: 'Qual a melhor tradução da Bíblia? - Luiz Sayão',
            conteúdo: `## Por que existem tantas traduções?

Você já deve ter notado que existem dezenas de traduções da Bíblia em português: ARA, ACF, ARC, NVI, KJA, NBV... Por que tanta variedade? A resposta é simples: porque traduzir é um trabalho complexo.

### Os três grandes desafios da tradução

**1. Palavras sem equivalente exato**

Muitas palavras do hebraico e grego não tem tradução direta. A palavra hebraica *hesed*, por exemplo, é traduzida como "amor", "bondade", "misericórdia" ou "lealdade", dependendo do contexto. Cada tradução escolhe a palavra que melhor se encaixa.

**2. Estruturas gramaticais diferentes**

O grego do NT tem frases longas com subordinadas encadeadas. O português prefere frases curtas. O tradutor precisa decidir entre fidelidade ao original e clareza em português.

**3. Público-alvo**

Uma tradução para estudiosos (como a ARA) prioriza fidelidade ao original. Uma tradução para o público geral (como a NVI) prioriza clareza. Nenhuma é "errada" — são abordagens diferentes.

### Principais traduções em português

| Tradução | Sigla | Estilo | Público |
|----------|-------|--------|---------|
| Almeida Revista e Atualizada | ARA | Formal, literal | Estudiosos |
| Almeida Corrigida Fiel | ACF | Formal, literal | Estudiosos |
| Nova Versão Internacional | NVI | Equilibrada | Geral |
| King James Atualizada | KJA | Equilibrada | Geral |
| Nova Bíblia do Dia | NBV | Coloquial | Iniciantes |

### Qual a melhor tradução?

A melhor tradução é aquela que você vai ler! Para estudo profundo, ter duas ou três traduções é ideal — comparar a ARA com a NVI, por exemplo, revela nuances que uma só tradução não captura.

A Sola Scriptura oferece 24 traduções para você comparar livremente.`,
            versículosChave: [
              { ref: 'Provérbios 8:11', texto: 'Porque a sabedoria vale mais que as pedras preciosas...' },
            ],
          },
        ],
      },
      {
        id: 'mod-divisões',
        título: 'Divisões da Bíblia',
        descrição: 'AT e NT: estrutura e organização',
        ícone: '📋',
        aulas: [
          {
            id: 'aula-3-1',
            título: 'Estrutura do Antigo Testamento',
            tipo: 'video',
            duração: '10 min',
            videoUrl: 'https://www.youtube.com/watch?v=5BEyw0t_0lw',
            videoTítulo: 'Conhecendo as Escrituras 1 (Antigo Testamento) - Curso Bíblico Online',
            conteúdo: `## Estrutura do Antigo Testamento

O AT contém 39 livros e cobre a história desde a criação (aprox. 4000 a.C.) até cerca de 400 a.C. Ele se divide em quatro grandes blocos:

### 1. Pentateuco (5 livros)
Gênesis, Êxodo, Levítico, Números, Deuteronômio. Escritos por Moisés, narram a criação, os patriarcas, o Egito, o deserto e a Lei. É a fundação de toda a história de Israel.

### 2. Históricos (12 livros)
Josué, Juízes, Rute, 1-2 Samuel, 1-2 Reis, 1-2 Crônicas, Esdras, Neemias, Ester. Narram a conquista da terra, o período dos juízes, a monarquia, o exílio e o retorno.

### 3. Poéticos (5 livros)
Jó, Salmos, Provérbios, Eclesiastes, Cântico dos Cânticos. Livros de reflexão, oração e sabedoria. Os Salmos são o hinário de Israel; os Provérbios são sabedoria prática.

### 4. Proféticos (17 livros)
- **Maiores** (5): Isaías, Jeremias, Lamentações, Ezequiel, Daniel
- **Menores** (12): Oseias até Malaquias

Os profetas falavam em nome de Deus para o povo, muitas vezes denunciando idolatria e anunciando julgamento — mas também apontando para a esperança do Messias.

### O AT aponta para Cristo

Toda a estrutura do AT é um ponteiro para Jesus. O Pentateuco institui sacrifícios que Ele cumpriu. Os históricos mostram um povo que falha sem um rei perfeito. Os poéticos expressam a saudade de Deus. Os profetas anunciam aquele que viria.`,
            versículosChave: [
              { ref: 'Lucas 24:44', texto: 'E disse-lhes: Estas são as palavras que eu vos disse...' },
            ],
          },
          {
            id: 'aula-3-2',
            título: 'Estrutura do Novo Testamento',
            tipo: 'video',
            duração: '10 min',
            videoUrl: 'https://www.youtube.com/watch?v=eQF_lAnjCTA',
            videoTítulo: 'Visão Geral do Novo Testamento - BibleProject Português',
            conteúdo: `## Estrutura do Novo Testamento

O NT contém 27 livros, escritos entre 50 e 100 d.C., e se divide em quatro blocos:

### 1. Evangelhos (4 livros)
Mateus, Marcos, Lucas e João. Narram a vida, ensinos, milagres, morte e ressurreição de Jesus. Mateus apresenta Jesus como o Rei; Marcos como o Servo; Lucas como o Homem Perfeito; João como Deus.

### 2. Histórico (1 livro)
Atos dos Apóstolos. Continua a história de onde os Evangelhos param: da Ascensão de Jesus a chegada do evangelho em Roma. É o "segundo volume" de Lucas.

### 3. Epístolas (21 livros)
- **Paulinas** (13): Romanos a Filemon
- **Generais** (7): Tiago a Judas
- **A Hebreus** (1): Autoria discutida, mas conteúdo claro sobre a superioridade de Cristo

As epístolas são cartas reais enviadas a igrejas e pessoas, abordando problemas práticos, doutrinas e exortações.

### 4. Apocalipse (1 livro)
O único livro profético do NT. Revela o triunfo final de Deus sobre o mal, a volta de Cristo e a eternidade. É cheio de simbolismo do AT, especialmente de Daniel e Ezequiel.

### A narrativa única

Do Gênesis ao Apocalipse, a Bíblia conta uma história: **criação — queda — redenção — restauração**. Jesus é o fio que conecta todos os 66 livros.`,
            versículosChave: [
              { ref: 'João 1:1', texto: 'No princípio era o Verbo...' },
              { ref: 'Apocalipse 22:13', texto: 'Eu sou o Alfa e o Omega...' },
            ],
          },
        ],
      },
      {
        id: 'mod-estudo',
        título: 'Como Estudar a Bíblia',
        descrição: 'Métodos práticos para o dia a dia',
        ícone: '🔍',
        aulas: [
          {
            id: 'aula-4-1',
            título: 'Métodos de estudo bíblico',
            tipo: 'video',
            duração: '15 min',
            videoUrl: 'https://www.youtube.com/watch?v=gqs_vu8AOvs',
            videoTítulo: 'Como Estudar A Bíblia De Forma Eficaz No Dia A Dia? - Hernandes Dias Lopes',
            conteúdo: `## Métodos de estudo bíblico

Existem muitos métodos para estudar a Bíblia. O importante é começar — e manter a consistência. Aqui estão os mais praticados:

### 1. Leitura cronológica
Leia a Bíblia do Gênesis ao Apocalipse, em ordem. É a forma mais simples, mas pode ser desanimador para iniciantes. Dica: comece pelos Evangelhos, depois volte ao AT.

### 2. Leitura por livros
Escolha um livro e leia até terminar. Comece por Marcos (curto e dinâmico) ou Efésios (teológico e prático). Depois vá para livros maiores.

### 3. Estudo temático
Escolha um tema (salvação, oração, profecias) e rastreie pela Bíblia inteira. A Sola Scriptura tem uma seção de tópicos teológicos que facilita isso.

### 4. Estudo por personagens
Escolha um personagem (Abraão, Paulo, Davi) e estude sua vida nos livros onde aparece. Ajuda a entender como Deus trabalha com pessoas reais.

### 5. Estudo de passagem (observação)
Escolha um versículo ou parágrafo e analise profundamente:
- **O que o texto diz?** (observação)
- **O que o texto significa?** (interpretação)
- **O que eu devo fazer?** (aplicação)

Esse método é o mais recomendado para crescimento espiritual.

### Dicas práticas

1. **Tenha um horário fixo** — 15 minutos diários são melhor que 2 horas uma vez por semana
2. **Tenha um diário** — anote o que Deus falou com você
3. **Reze antes de ler** — peça entendimento ao Espírito Santo
4. **Não tenha pressa** — melhor absorver pouco do que ler muito sem entender
5. **Use ferramentas** — concordâncias, comentários, léxico (a Sola Scriptura tem tudo isso)

### O mais importante

O objetivo do estudo bíblico não é acumular informação — é conhecer a Deus. Se você leu a Bíblia e não mudou nada na sua vida, leu errado. A Palavra tem poder para transformar — mas precisa ser aplicada.`,
            versículosChave: [
              { ref: 'Salmo 119:105', texto: 'Lâmpada para os meus pés e luz para o meu caminho.' },
              { ref: 'Tiago 1:22', texto: 'Sede cumpridores da palavra...' },
            ],
          },
        ],
      },
      {
        id: 'mod-avaliacao',
        título: 'Avaliação Final',
        descrição: 'Quiz para liberar o certificado',
        ícone: '🏆',
        aulas: [
          {
            id: 'aula-quiz-final',
            título: 'Avaliação Final — Conhecendo a Bíblia',
            tipo: 'quiz',
            duração: '10 min',
            perguntas: [
              {
                id: 'q1',
                pergunta: 'Qual passagem afirma que "toda a Escritura é inspirada por Deus"?',
                opções: ['Romanos 12:1-2', '2 Timóteo 3:16-17', 'Hebreus 4:12', '2 Pedro 1:21'],
                respostaCorreta: 1,
                explicação: '2 Timóteo 3:16-17 é a passagem clássica sobre a inspiração bíblica. Paulo afirma que "toda a Escritura é inspirada por Deus e útil para o ensino".',
              },
              {
                id: 'q2',
                pergunta: 'Quantos livros tem a Bíblia protestante?',
                opções: ['73 livros', '66 livros', '60 livros', '72 livros'],
                respostaCorreta: 1,
                explicação: 'A Bíblia protestante tem 66 livros: 39 no Antigo Testamento e 27 no Novo Testamento. A Bíblia católica tem 73 (incluindo os deuterocanônicos).',
              },
              {
                id: 'q3',
                pergunta: 'Qual é o primeiro livro do Novo Testamento?',
                opções: ['Marcos', 'Lucas', 'Mateus', 'João'],
                respostaCorreta: 2,
                explicação: 'Mateus é o primeiro livro do NT. Começa com a genealogia de Jesus, conectando-o com o AT e demonstrando que Ele é o Messias prometido.',
              },
              {
                id: 'q4',
                pergunta: 'O que significa a palavra "cânon"?',
                opções: ['Livro sagrado', 'Régua ou padrão', 'Conjunto de leis', 'Escritura antiga'],
                respostaCorreta: 1,
                explicação: 'Cânon vem do grego kanon, que significa "régua" ou "padrão". Refere-se à lista dos livros reconhecidos como Palavra de Deus.',
              },
              {
                id: 'q5',
                pergunta: 'Em quantos idiomas a Bíblia foi originalmente escrita?',
                opções: ['2 idiomas', '3 idiomas', '4 idiomas', '1 idioma'],
                respostaCorreta: 1,
                explicação: 'A Bíblia foi escrita em 3 idiomas: hebraico (AT), arameu (partes de Daniel e Esdras) e grego (NT).',
              },
              {
                id: 'q6',
                pergunta: 'Qual evangelho apresenta Jesus como o Rei dos Judeus?',
                opções: ['Marcos', 'Lucas', 'Mateus', 'João'],
                respostaCorreta: 2,
                explicação: 'Mateus apresenta Jesus como o Messias e Rei, cumprindo as profecias do AT. Por isso começa com a genealogia de Davi.',
              },
              {
                id: 'q7',
                pergunta: 'Quantos evangelhos tem o Novo Testamento?',
                opções: ['3 evangelhos', '4 evangelhos', '5 evangelhos', '6 evangelhos'],
                respostaCorreta: 1,
                explicação: 'São 4 evangelhos: Mateus, Marcos, Lucas e João. Cada um tem um público-alvo e perspectiva diferente sobre a vida de Jesus.',
              },
              {
                id: 'q8',
                pergunta: 'O que a palavra "theopneustos" significa?',
                opções: ['Escrita por homens', 'Soprada por Deus', 'Antiga e valiosa', 'Completa e perfeita'],
                respostaCorreta: 1,
                explicação: 'Theopneustos (θεοπνευστος) significa "soprada por Deus" ou "inspirada por Deus". É o termo usado em 2 Timóteo 3:16.',
              },
              {
                id: 'q9',
                pergunta: 'Qual livro do AT é considerado o "hinário de Israel"?',
                opções: ['Provérbios', 'Salmos', 'Jó', 'Eclesiastes'],
                respostaCorreta: 1,
                explicação: 'Os Salmos são o hinário de Israel. Contém orações, louvores e lamentações que expressam toda a gama de emoções humanas diante de Deus.',
              },
              {
                id: 'q10',
                pergunta: 'Qual é a narrativa que conecta todos os 66 livros da Bíblia?',
                opções: ['Lei e profecia', 'Criação — queda — redenção — restauração', 'História de Israel', 'Vida de Jesus'],
                respostaCorreta: 1,
                explicação: 'A grande narrativa bíblica é: criação (Gênesis), queda (Gn 3), redenção (Cristo) e restauração (Apocalipse). Todos os 66 livros se encaixam nessa história.',
              },
            ],
          },
        ],
      },
    ],
  },
  CURSO_FUNDAMENTOS,
  CURSO_HERMENEUTICA,
  CURSO_EVANGELHOS,
  CURSO_EXODO,
  CURSO_SALMOS,
  CURSO_ROMANOS,
  CURSO_APOCALIPSE,
];
