export interface QuizQuestion {
  id: string;
  pergunta: string;
  opcoes: string[];
  respostaCorreta: number;
  explicacao: string;
}

export interface CursoAula {
  id: string;
  titulo: string;
  tipo: 'texto' | 'quiz' | 'video';
  duracao: string;
  conteudo?: string;
  videoUrl?: string;
  videoTitulo?: string;
  versiculosChave?: { ref: string; texto: string }[];
  perguntas?: QuizQuestion[];
}

export interface CursoModulo {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  aulas: CursoAula[];
}

export interface Curso {
  id: string;
  titulo: string;
  descricao: string;
  instrutor: string;
  duracao: string;
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  categoria: string;
  certificado: boolean;
  modulos: CursoModulo[];
}

import { CURSO_FUNDAMENTOS } from './_curso_fundamentos';
import { CURSO_HERMENEUTICA } from './_curso_hermenetica';
import { CURSO_EVANGELHOS } from './_curso_evangelhos';

export const CURSOS: Curso[] = [
  {
    id: 'conhecendo-a-biblia',
    titulo: 'Conhecendo a Biblia',
    descricao: 'Os pilares para entender a Biblia: inspiracao, canon, traducoes, divisoes e metodos de estudo. O primeiro passo para qualquer crente.',
    instrutor: 'Sola Scriptura',
    duracao: '4 semanas',
    nivel: 'iniciante',
    categoria: 'Introducao Biblica',
    certificado: true,
    modulos: [
      {
        id: 'mod-o-que-e-biblia',
        titulo: 'O Que e a Biblia?',
        descricao: 'A origem e a natureza das Escrituras',
        icone: '📖',
        aulas: [
          {
            id: 'aula-1-1',
            titulo: 'A Biblia: Palavra de Deus para os homens',
            tipo: 'texto',
            duracao: '12 min',
            conteudo: `## A Biblia: Palavra de Deus para os homens

A Biblia nao e apenas um livro — e uma biblioteca de 66 livros escritos ao longo de aproximadamente 1.500 anos, por mais de 40 autores, em tres idiomas (hebraico, arameu e grego). Apesar de tanta diversidade, ela apresenta uma mensagem unica e coerente: o plano redentor de Deus para a humanidade.

### O que a Biblia afirma sobre si mesma

> "Toda a Escritura e inspirada por Deus e util para o ensino, para a repreensao, para a correcao, para a educacao na justica, a fim de que o homem de Deus seja completo e perfeitamente aparelhado para toda boa obra." — 2 Timoteo 3:16-17

Essa passagem e fundamental. Ela nos diz que:

1. **Toda a Escritura e inspirada por Deus** — nao so parte dela. O termo grego *theopneustos* significa "soprada por Deus", indicando que as palavras da Biblia vieram por inspiracao divina.
2. **E util para multiplos propositos** — ensino, repreensao, correcao e educacao. A Biblia nao e teoria; e pratica para a vida.
3. **O resultado e um cristao completo** — equipado para toda boa obra.

### Dupla natureza: divina e humana

A Biblia e ao mesmo tempo **divina** (originada de Deus) e **humana** (escrita por homens). Isso nao e uma contradicao — e o misterio da inspiracao. Deus usou a personalidade, a cultura, o idioma e o estilo de cada autor, sem anular sua individualidade, para produzir exatamente o que Ele queria comunicar.

Imagine um escriba que trabalha com um rei. O rei ditou a mensagem, mas o escriba usou sua propria caligrafia. A mensagem e do rei; a forma e do escriba. Assim funciona a inspiracao biblica.

### Por que isso importa

Se a Biblia e realmente Palavra de Deus, ela tem autoridade sobre a nossa vida. Nao e um livro de sugestoes ou sabedoria humana — e a revelacao de como Deus quer que vivamos, como podemos conhece-lo, e o que espera para o futuro.

Estudar a Biblia nao e apenas um exercicio intelectual. E o caminho para conhecer a Deus pessoalmente.`,
            versiculosChave: [
              { ref: '2 Timoteo 3:16-17', texto: 'Toda a Escritura e inspirada por Deus...' },
              { ref: '2 Pedro 1:20-21', texto: 'Nenhuma profecia da Escritura e de interpretacao propria...' },
              { ref: 'Hebreus 4:12', texto: 'Porque a palavra de Deus e viva e eficaz...' },
            ],
          },
          {
            id: 'aula-1-2',
            titulo: 'Como a Biblia foi formada: O canon biblico',
            tipo: 'texto',
            duracao: '15 min',
            conteudo: `## Como a Biblia foi formada: O canon biblico

O termo "canon" vem do grego *kanon*, que significa "regua" ou "padrao". O canon biblico e a lista dos livros que reconhecemos como Palavra de Deus. Mas como essa lista foi formada?

### Os 39 livros do Antigo Testamento

Os judeus ja reconheciam os livros do AT muito antes de Cristo. O Pentateuco (os 5 livros de Moises) foi aceito desde o seculo V a.C. Os profetas e escritos foram sendo reconhecidos ao longo dos seculos. Na epoca de Jesus, os judeus ja tinham uma Biblia praticamente fechada.

Os 39 livros do AT se dividem em:
- **Pentateuco** (5): Genesis a Deuteronomio
- **Historicos** (12): Josue a Ester
- **Poeticos** (5): Jó a Cantico dos Cantico
- **Profeticos Maiores** (5): Isaías a Daniel
- **Profeticos Menores** (12): Oseias a Malaquias

### Os 27 livros do Novo Testamento

O NT foi formado mais rapidamente. As cartas de Paulo ja circulavam nas igrejas desde a decada de 50 d.C. Os evangelhos foram escritos entre 60-100 d.C. A igreja primitiva usou tres criterios para aceitar um livro no canon:

1. **Origem apostolica** — escrito por um apostolo ou muito proximo de um
2. **Uso na igreja** — era lido nas reunioes desde cedo
3. **Consistencia** — estava de acordo com a ja recebida

### Livros que nao entraram

Alguns livros como o Pastor de Hermas, a Epistola de Barnabas e o Didache foram usados pela igreja antiga, mas nao foram incluidos no canon. Eles podem ser uteis para o estudo historico, mas nao sao considerados Palavra de Deus inspirada.

### Por que o canon importa

O canon nos da seguranca. Sabemos que temos exatamente o que Deus quis comunicar — nem mais, nem menos. A Biblia e um livro fechado e completo.`,
            versiculosChave: [
              { ref: 'Apocalipse 22:18-19', texto: 'Se alguem acrescentar alguma coisa...' },
              { ref: 'Lucas 24:27', texto: 'E, comecando por Moises...' },
            ],
          },
        ],
      },
      {
        id: 'mod-traducoes',
        titulo: 'Traducoes e Versoes',
        descricao: 'Entenda as diferencas entre as traducoes biblicas',
        icone: '🌍',
        aulas: [
          {
            id: 'aula-2-1',
            titulo: 'Por que existem tantas traducoes?',
            tipo: 'texto',
            duracao: '12 min',
            conteudo: `## Por que existem tantas traducoes?

Voce ja deve ter notado que existem dezenas de traducoes da Biblia em portugues: ARA, ACF, ARC, NVI, KJA, NBV... Por que tanta variedade? A resposta e simples: porque traduzir e um trabalho complexo.

### Os tres grandes desafios da traducao

**1. Palavras sem equivalente exato**

Muitas palavras do hebraico e grego nao tem traducao direta. A palavra hebraica *hesed*, por exemplo, e traduzida como "amor", "bondade", "misericordia" ou "lealdade", dependendo do contexto. Cada traducao escolhe a palavra que melhor se encaixa.

**2. Estruturas gramaticais diferentes**

O grego do NT tem frases longas com subordinadas encadeadas. O portugues prefere frases curtas. O tradutor precisa decidir entre fidelidade ao original e clareza em portugues.

**3. Publico-alvo**

Uma traducao para estudiosos (como a ARA) prioriza fidelidade ao original. Uma traducao para o publico geral (como a NVI) prioriza clareza. Nenhuma e "errada" — sao abordagens diferentes.

### Principais traducoes em portugues

| Traducao | Sigla | Estilo | Publico |
|----------|-------|--------|---------|
| Almeida Revista e Atualizada | ARA | Formal, literal | Estudiosos |
| Almeida Corrigida Fiel | ACF | Formal, literal | Estudiosos |
| Nova Versao Internacional | NVI | Equilibrada | Geral |
| King James Atualizada | KJA | Equilibrada | Geral |
| Nova Biblia do Dia | NBV | Colloquial | Iniciantes |

### Qual a melhor traducao?

A melhor traducao e aquela que voce vai ler! Para estudo profundo, ter duas ou tres traducoes e ideal — comparar a ARA com a NVI, por exemplo, revela nuances que uma so traducao nao captura.

A Sola Scriptura oferece 24 traducoes para voce comparar livremente.`,
            versiculosChave: [
              { ref: 'Proverbios 8:11', texto: 'Porque a sabedoria vale mais que as pedras preciosas...' },
            ],
          },
        ],
      },
      {
        id: 'mod-divisoes',
        titulo: 'Divisoes da Biblia',
        descricao: 'AT e NT: estrutura e organizacao',
        icone: '📋',
        aulas: [
          {
            id: 'aula-3-1',
            titulo: 'Estrutura do Antigo Testamento',
            tipo: 'texto',
            duracao: '10 min',
            conteudo: `## Estrutura do Antigo Testamento

O AT contem 39 livros e cobre a historia desde a criacao (aprox. 4000 a.C.) ate cerca de 400 a.C. Ele se divide em quatro grandes blocos:

### 1. Pentateuco (5 livros)
Genesis, Exodo, Levitico, Numeros, Deuteronomio. Escritos por Moises, narram a criacao, os patriarcas, o Egito, o deserto e a Lei. E a fundacao de toda a historia de Israel.

### 2. Historicos (12 livros)
Josue, Juizes, Rute, 1-2 Samuel, 1-2 Reis, 1-2 Crônicas, Esdras, Neemias, Ester. Narram a conquista da terra, o periodo dos juizes, a monarquia, o exilio e o retorno.

### 3. Poeticos (5 livros)
Jó, Salmos, Proverbios, Eclesiastes, Cantico dos Cantico. Livros de reflexao, oracao e sabedoria. Os Salmos sao o hineario de Israel; os Proverbios sao sabedoria pratica.

### 4. Profeticos (17 livros)
- **Maiores** (5): Isaías, Jeremias, Lamentações, Ezequiel, Daniel
- **Menores** (12): Oseias ate Malaquias

Os profetas falavam em nome de Deus para o povo, muitas vezes denunciando idolatria e anunciando julgamento — mas tambem apontando para a esperanca do Messias.

### O AT aponta para Cristo

Toda a estrutura do AT e um ponteiro para Jesus. O Pentateuco institui sacrificios que Ele cumpriu. Os historicos mostram um povo que falha sem um rei perfeito. Os poeticos expressam a saudade de Deus. Os profetas anunciam aquele que viria.`,
            versiculosChave: [
              { ref: 'Lucas 24:44', texto: 'E disse-lhes: Estas sao as palavras que eu vos disse...' },
            ],
          },
          {
            id: 'aula-3-2',
            titulo: 'Estrutura do Novo Testamento',
            tipo: 'texto',
            duracao: '10 min',
            conteudo: `## Estrutura do Novo Testamento

O NT contem 27 livros, escritos entre 50 e 100 d.C., e se divide em quatro blocos:

### 1. Evangelhos (4 livros)
Mateus, Marcos, Lucas e Joao. Narram a vida, ensinos, milagres, morte e resurreicao de Jesus. Mateus apresenta Jesus como o Rei; Marcos como o Servo; Lucas como o Homem Perfeito; Joao como Deus.

### 2. Historico (1 livro)
Atos dos Apostolos. Continua a historia de onde os Evangelhos param: da Ascensao de Jesus a chegada do evangelho em Roma. E o "segundo volume" de Lucas.

### 3. Epistolas (21 livros)
- **Paulinas** (13): Romanos a Filemon
- **Generais** (7): Tiago a Judas
- **A Hebreus** (1): Autoria discutida, mas conteudo claro sobre a superioridade de Cristo

As epistolas sao cartas reais enviadas a igrejas e pessoas, abordando problemas praticos, doutrinas e exortacoes.

### 4. Apocalipse (1 livro)
O unico livro profetico do NT. Revela o triunfo final de Deus sobre o mal, a volta de Cristo e a eternidade. E cheio de simbolismo do AT, especialmente de Daniel e Ezequiel.

### A narrativa unica

Do Genesis ao Apocalipse, a Biblia conta uma historia: **criacao — queda — redencao — restauracao**. Jesus e o fio que conecta todos os 66 livros.`,
            versiculosChave: [
              { ref: 'Joao 1:1', texto: 'No principio era o Verbo...' },
              { ref: 'Apocalipse 22:13', texto: 'Eu sou o Alfa e o Omega...' },
            ],
          },
        ],
      },
      {
        id: 'mod-estudo',
        titulo: 'Como Estudar a Biblia',
        descricao: 'Metodos praticos para o dia a dia',
        icone: '🔍',
        aulas: [
          {
            id: 'aula-4-1',
            titulo: 'Metodos de estudo biblico',
            tipo: 'texto',
            duracao: '15 min',
            conteudo: `## Metodos de estudo biblico

Existem muitos metodos para estudar a Biblia. O importante e comecar — e manter a consistencia. Aqui estao os mais praticados:

### 1. Leitura cronologica
Leia a Biblia do Genesis ao Apocalipse, em ordem. E a forma mais simples, mas pode ser desanimador para iniciantes. Dica: comecos pelos Evangelhos, depois volte ao AT.

### 2. Leitura por livros
Escolha um livro e leia ate terminar. Comece por Marcos (curto e dinamico) ou Efesios (teologico e pratico). Depois va para livros maiores.

### 3. Estudo tematico
Escolha um tema (salvacao, oracao, profecias) e rastreie pela Biblia inteira. A Sola Scriptura tem uma secao de topicos teologicos que facilita isso.

### 4. Estudo por personagens
Escolha um personagem (Abraao, Paulo, Davi) e estude sua vida nos livros onde aparece. Ajuda a entender como Deus trabalha com pessoas reais.

### 5. Estudo de passagem (observacao)
Escolha um versiculo ou paragrafo e analise profundamente:
- **O que o texto diz?** (observacao)
- **O que o texto significa?** (interpretacao)
- **O que eu devo fazer?** (aplicacao)

Esse metodo e o mais recomendado para crescimento espiritual.

### Dicas praticas

1. **Tenha um horario fixo** — 15 minutos diarios sao melhor que 2 horas uma vez por semana
2. **Tenha um diario** — anote o que Deus falou com voce
3. **Reze antes de ler** — peca entendimento ao Espirito Santo
4. **Nao tenha pressa** — melhor absorver pouco do que ler muito sem entender
5. **Use ferramentas** — concordancias, comentarios, lexico (a Sola Scriptura tem tudo isso)

### O mais importante

O objetivo do estudo biblico nao e acumular informacao — e conhecer a Deus. Se voce leu a Biblia e nao mudou nada na sua vida, leu errado. A Palavra tem poder para transformar — mas precisa ser aplicada.`,
            versiculosChave: [
              { ref: 'Salmo 119:105', texto: 'Lampada para os meus pes e luz para o meu caminho.' },
              { ref: 'Tiago 1:22', texto: 'Sede cumpridores da palavra...' },
            ],
          },
        ],
      },
      {
        id: 'mod-avaliacao',
        titulo: 'Avaliacao Final',
        descricao: 'Quiz para liberar o certificado',
        icone: '🏆',
        aulas: [
          {
            id: 'aula-quiz-final',
            titulo: 'Avaliacao Final — Conhecendo a Biblia',
            tipo: 'quiz',
            duracao: '10 min',
            perguntas: [
              {
                id: 'q1',
                pergunta: 'Qual passagem afirma que "toda a Escritura e inspirada por Deus"?',
                opcoes: ['Romanos 12:1-2', '2 Timoteo 3:16-17', 'Hebreus 4:12', '2 Pedro 1:21'],
                respostaCorreta: 1,
                explicacao: '2 Timoteo 3:16-17 e a passagem classica sobre a inspiracao biblica. Paulo afirma que "toda a Escritura e inspirada por Deus e util para o ensino".',
              },
              {
                id: 'q2',
                pergunta: 'Quantos livros tem a Biblia protestante?',
                opcoes: ['73 livros', '66 livros', '60 livros', '72 livros'],
                respostaCorreta: 1,
                explicacao: 'A Biblia protestante tem 66 livros: 39 no Antigo Testamento e 27 no Novo Testamento. A Biblia catolica tem 73 (incluindo os deuterocanonicos).',
              },
              {
                id: 'q3',
                pergunta: 'Qual e o primeiro livro do Novo Testamento?',
                opcoes: ['Marcos', 'Lucas', 'Mateus', 'Joao'],
                respostaCorreta: 2,
                explicacao: 'Mateus e o primeiro livro do NT. Comeca com a genealogia de Jesus, conectando-o com o AT e demonstrando que Ele e o Messias prometido.',
              },
              {
                id: 'q4',
                pergunta: 'O que significa a palavra "canon"?',
                opcoes: ['Livro sagrado', 'Regua ou padrao', 'Conjunto de leis', 'Escritura antiga'],
                respostaCorreta: 1,
                explicacao: 'Canon vem do grego kanon, que significa "regua" ou "padrao". Refere-se a lista dos livros reconhecidos como Palavra de Deus.',
              },
              {
                id: 'q5',
                pergunta: 'Em quantos idiomas a Biblia foi originalmente escrita?',
                opcoes: ['2 idiomas', '3 idiomas', '4 idiomas', '1 idioma'],
                respostaCorreta: 1,
                explicacao: 'A Biblia foi escrita em 3 idiomas: hebraico (AT), arameu (partes de Daniel e Esdras) e grego (NT).',
              },
              {
                id: 'q6',
                pergunta: 'Qual evangelical apresenta Jesus como o Rei dos Judeus?',
                opcoes: ['Marcos', 'Lucas', 'Mateus', 'Joao'],
                respostaCorreta: 2,
                explicacao: 'Mateus apresenta Jesus como o Messias e Rei, cumprindo as profecias do AT. Por isso comeca com a genealogia de Davi.',
              },
              {
                id: 'q7',
                pergunta: 'Quantos evangelhos tem o Novo Testamento?',
                opcoes: ['3 evangelhos', '4 evangelhos', '5 evangelhos', '6 evangelhos'],
                respostaCorreta: 1,
                explicacao: 'Sao 4 evangelhos: Mateus, Marcos, Lucas e Joao. Cada um tem um publico-alvo e perspectiva diferente sobre a vida de Jesus.',
              },
              {
                id: 'q8',
                pergunta: 'O que a palavra "theopneustos" significa?',
                opcoes: ['Escrita por homens', 'Soprada por Deus', 'Antiga e valiosa', 'Completa e perfeita'],
                respostaCorreta: 1,
                explicacao: 'Theopneustos (θεοπνευστος) significa "soprada por Deus" ou "inspirada por Deus". E o termo usado em 2 Timoteo 3:16.',
              },
              {
                id: 'q9',
                pergunta: 'Qual livro do AT e considerado o "hineario de Israel"?',
                opcoes: ['Proverbios', 'Salmos', 'Jó', 'Eclesiastes'],
                respostaCorreta: 1,
                explicacao: 'Os Salmos sao o hineario de Israel. Contem oracoes, louvores e lamentacoes que expressam toda a gama de emocoes humanas diante de Deus.',
              },
              {
                id: 'q10',
                pergunta: 'Qual e a narrativa que conecta todos os 66 livros da Biblia?',
                opcoes: ['Lei e profecia', 'Criacao — queda — redencao — restauracao', 'Historia de Israel', 'Vida de Jesus'],
                respostaCorreta: 1,
                explicacao: 'A grande narrativa biblica e: criacao (Genesis), queda (Gn 3), redencao (Cristo) e restauracao (Apocalipse). Todos os 66 livros se encaixam nessa historia.',
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
];
