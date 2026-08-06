// ═══════════════════════════════════════════════════════════════════════════
// HERMENÊUTICA AVANÇADA — CRÍTICA TEXTUAL E INTERPRETAÇÃO BÍBLICA
// Nível: Seminário / Pós-graduação
// Conteúdo: Métodos textuais, transmissão manuscrita, hermenêutica科学,
//           aplicação contextual, bibliografia acadêmica
// ═══════════════════════════════════════════════════════════════════════════

import type { SecaoAcademica, ReferenciaBibliografica } from './romanos_academico';

// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO 1: FUNDAMENTOS DA CRÍTICA TEXTUAL
// ═══════════════════════════════════════════════════════════════════════════

export const hermeneuticaModulo1: SecaoAcademica = {
  titulo: '1. Crítica Textual: A Ciência de Estabelecer o Texto',
  subtitulo: 'Manuscritos, Variantes e o Texto do Novo Testamento',
  conteudo: `
## 1.1 O Problema Fundamental

Não possuímos o autógrafo (original escrito pelo autor) de nenhum livro do NT. O que temos são cópias de cópias — manuscritos feitos por escribas ao longo de séculos. A crítica textual busca reconstruir o texto mais próximo do original.

**Dados quantitativos:**
- ~5.800 manuscritos gregos do NT
- ~10.000 manuscritos em latim
- ~9.300 em outras línguas (siríaco, copta, etiópico, armênio, georgiano)
- Total: ~25.000 manuscritos — mais que qualquer outro documento da antiguidade

**Comparação com outros textos clássicos:**
| Autor | Obra | Manuscritos mais antigos | Intervalo temporal |
|-------|------|-------------------------|-------------------|
| Homero | Ilíada | ~2.400 | ~500 a.C. (original ~700 a.C.) |
| Virgílio | Eneida | ~100 | ~400 d.C. (original ~20 a.C.) |
| **NT** | **Total** | **~5.800 gregos** | **~125 d.C. (original ~50-100 d.C.)** |

## 1.2 Categorias de Manuscritos

### 1.2.1 Pergaminhos (Unciais)
- Escritos em letra maiúscula (uncial)
- Datam de 125-800 d.C.
- **Principais:** Codex Sinaiticus (א), Codex Vaticanus (B), Codex Alexandrinus (A), Codex Bezae (D)
- Sinaiticus: descoberto por Tischendorf no Monte Sinai (1859), contém NT completo
- Vaticanus: Vaticano desde 1475, NT incompleto (faltam Pastores e Apocalipse)

### 1.2.2 Manuscritos Minúsculos
- Escritos em letra cursiva (minúscula)
- Datam de 800-1500 d.C.
- ~2.800 manuscritos
- **Exemplos:** Textus Receptus baseado em minúsculos tardios (12-15 séc.)

### 1.2.3 Lecionários
- Coletâneas de leituras para culto
- ~1.800 manuscritos
- Úteis para datar tradições litúrgicas

### 1.2.4 Versões Antigas
- **Latim:** Vetus Itala (antes de 170 d.C.), Vulgata (Jerônimo, 382 d.C.)
- **Siríaco:** Peshita (séc. II), Diatessarão (Tatiano, ~170 d.C.)
- **Copta:** Sahidica (séc. III), Bohairica (séc. IV)
- **Etíope:** ~2.000 manuscritos

## 1.3 Classecação das Variantes

### 1.3.1 Categorias de Textualidade (Aland-Black)
As variantes são classificadas por probabilidade:

| Categoria | Descrição | Exemplo |
|-----------|-----------|---------|
| **I** | Leitura certa | — |
| **II** | Leitura provavelmente certa | — |
| **III** | Leitura igualmente provável | João 1:18 (μονογενὴς θεός vs. μονογενὴς υἱός) |
| **IV** | Leitura provavelmente inferior | — |
| **V** | Leitura quase certamente inferior | 1 João 5:7-8 (Comma Johanneum) |

### 1.3.2 Tipos de Erros de Escritura
1. **Homoioteleuton:** Omissão por palavras com terminação similar (cf. Mateus 13:35 — B vs. א)
2. **Ditografia:** Repetição acidental de palavra ou frase
3. **Metátese:** Transposição de letras (e.g., κόσμον → κοσμόν)
4. **Harmonização:** Adição de material de paralelos sinópticos
5. **Teológica:** Alteração para evitar antropomorfismo ou heresia (e.g., Hebreus 2:9 em Eusébio)

## 1.4 Métodos de Crítica Externa

### 1.4.1 Leção Mais Difícil (Lectio Difficilior)
A leção mais difícil é provavelmente original — os escribas tendiam a "facilitar" o texto, não a complicá-lo.

**Exemplo clássico:** Mateus 24:36
- **Leção fácil:** "Nem o Filho, senão somente o Pai" (adição para evitar subordinação)
- **Leção difícil:** "Nem os anjos, nem o Filho" (omissão original)

### 1.4.2 Leção Mais Breve (Lectio Brevior)
O texto mais curto é provavelmente original — a tendência é adicionar, não omitir.

### 1.4.3 Peso Externo
Manuscritos mais antigos e de tradição independente têm maior autoridade.

## 1.5 O Texto Crítico

### 1.5.1 Textus Receptus (1516-1881)
- Baseado em ~6 minúsculos tardios (12-15 séc.)
- Erasmo compilou a partir de 5 manuscritos em 1516
- Tradução KJV (1611) usou Edição de Beza (1598)
- **Problema:** Reflete a tradição bizantina tardia, não o texto mais antigo

### 1.5.2 Crítica Textual Moderna
- **Nestle-Aland (28ª ed., 2012):** Texto crítico padrão
- **UBS 5 (2014):** Com variações de leitura
- Baseado em papiros antigos (P66, P75, P45) e uncias (א, B)
- Método: conflito de tradições (Alexandrina vs. Ocidental vs. Bizantina vs. Cesariana)

### 1.5.3 Textus Receptus vs. Texto Crítico: Diferenças Significativas
| Passagem | Textus Receptus | Texto Crítico | Significado |
|----------|----------------|---------------|-------------|
| 1 João 5:7-8 | Comma Johanneum (Trindade explícita) | Sem o Comma | ~40 palavras ausentes nos antigos |
| Marcos 16:9-20 | Acabamento longo | Sem esses versos | 12 versões ausentes em Sinaiticus/Vaticanus |
| Atos 20:28 | "igreja de Deus" | "igreja do Senhor" | Variante cristológica |
| Hebreus 1:3 | "sustenta todas as coisas" | "sustenta todas as coisas" | Sem diferença significativa |
  `,
  grego: [
    { termo: 'κεκένωμεν', transliteracao: 'kekénōmen', significado: 'Esvaziou (Filipenses 2:7) — variante textual importante. Sinaiticus tem κενόω (esvaziar), Vaticanus tem κενόω (mesmo verbo, forma diferente). Afeta a cristologia: Cristo se esvaziou (não "tinha forma de Deus" mas "esvaziou-se").', Strong: 2758 },
    { termo: 'μονογενὴς θεός', transliteracao: 'monogenḕs theós', significado: 'Unigênito Deus (João 1:18) — Vaticanus lê "unigênito Deus", Sinaiticus "unigênito Filho". A leção "Deus" é mais difícil (lectio difficilior) e melhor atestada.', Strong: 3439 },
  ],
  citacoes: [
    {
      autor: 'Kurt Aland & Barbara Aland',
      obra: 'The Text of the New Testament',
      ano: 1987,
      pagina: '218',
      editora: 'Eerdmans',
      local: 'Grand Rapids',
      tradutor: 'Erroll F. Rhodes',
      citacao: 'O texto crítico não é um texto definitivo, mas o melhor texto que podemos estabelecer com base na evidência disponível. Novas descobertas podem sempre modificá-lo.',
    },
  ],
  perguntas: [
    'Por que os escribas alteravam o texto? Liste as tendências mais comuns.',
    'Como o Comma Johanneum (1 João 5:7-8) chegou ao Textus Receptus? Qual é o consenso acadêmico atual?',
    'Se o texto original não é acessível, como a crítca textual pode ser "científica"?',
    'Compare as variantes de Marcos 16:9-20. Que implicações pastorais isso tem?',
  ],
  bibliografia: [
    { autor: 'Aland, Kurt & Barbara', obra: 'The Text of the New Testament', ano: 1987, editora: 'Eerdmans', local: 'Grand Rapids', tipo: 'linguistica', nivel: 'avancado' },
    { autor: 'Metzger, Bruce M.', obra: 'A Textual Commentary on the Greek New Testament', ano: 1994, editora: 'Deutsche Bibelgesellschaft', local: 'Stuttgart', tipo: 'linguistica', nivel: 'avancado' },
    { autor: 'Tregelles, Samuel Prideaux', obra: 'The Printed Text of the Greek New Testament', ano: 1854, editora: 'Samuel Bagster', local: 'London', tipo: 'historia', nivel: 'especializado' },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO 2: HERMENÊUTICA HISTÓRICO-CRÍTICA
// ═══════════════════════════════════════════════════════════════════════════

export const hermeneuticaModulo2: SecaoAcademica = {
  titulo: '2. Hermenêutica Histórico-Crítica',
  subtitulo: 'Métodos Científicos de Interpretação Bíblica',
  conteudo: `
## 2.1 A Crítica de Forma (Formgeschichte)

### 2.1.1 Princípios Fundamentais
Desenvolvida por Hermann Gunkel (1862-1932) e Rudolf Bultmann (1884-1976):
- Os textos bíblicos passaram por uma história oral antes de serem escritos
- Cada "forma" (Gattung) tem características literárias e situacionais específicas
- A crítica de forma busca reconstruir o contexto original da tradição oral

### 2.1.2 Formas Literárias no NT
| Forma | Exemplo | Características |
|-------|---------|----------------|
| **Parábola** | O Filho Pródigo (Lucas 15) | Narrativa curta com mensagem surpreendente |
| **Milagre** | Cura do cego (Marcos 10:46-52) | Ato + interpretação fideísta |
| **Ditado** | "Amai vossos inimigos" | Sentença de Jesus |
| **Controvérsia** | Debate sobre o Sábado | Diálogo com autoridades |
| **Apocalipse** | Marcos 13 | Visão simbólica do fim |

### 2.1.3 Limitações da Crítica de Forma
- Tende a atomizar os textos, perdendo o contexto narrativo
- Assume uma "comunidade de redação" (Sitz im Leben) quase sempre hipotética
- Bultmann via "mito" em vez de "história" em Jesus — excesso de demitologização

## 2.2 A Crítica de Fonte (Quellenhypothese)

### 2.2.1 O problema sinóptico
Mateus, Marcos e Lucas compartilham material (890 de 1.101 versos de Marcos estão em Mateus e/ou Lucas). A hipótese das fontes:
- Marcos foi a primeira evangelho (66-70 d.C.)
- Mateus e Lucas usaram Marcos e uma fonte de ditos (Q, de Quelle)
- Mateus e Lucas usaram material independente (M e L)

### 2.2.2 Debates atuais
- A hipótese de Marco Prior é dominante mas não universal
- A "Q" é hipotética — nenhum manuscrito foi encontrado
- Estudos recentes (Goodacre, 2002) questionam a existência de Q

## 2.3 A Crítica de Redação (Redaktionsgeschichte)

### 2.3.1 Princípio
Desenvolvida por Günther Bornkamm, Gerhard Barth e Heinz Joachim Held (1960):
- O evangelista não é meramente compilador, mas teólogo
- As escolhas redacionais revelam a teologia do autor
- Ex: Lucas inclui a parábola do Filho Pródigo (exclusiva lucana) para enfatizar a misericórdia divina

## 2.4 A Crítica da Composição (Kompositionsgeschichte)

### 2.4.1 Abordagem de Martin Dibelius e Karl Lüdemann
- Estuda como os materiais foram organizados em narrativas maiores
- Foca na estrutura do evangelho como um todo
- Útil para entender a teologia narrativa

## 2.5 Crítica Canônica

### 2.5.1 Brevard Childs (1924-2007)
- O cânone é o contexto final da interpretação
- Não é o "original" mas o "texto recebido" que deve guiar a exegese
- Contra o historicismo: o texto canônico tem autoridade, não a reconstrução histórica

## 2.6 Leitura Social (Social-Scientific Criticism)

### 2.6.1 Abordagem antropológica
- Usa teoria social (honor-shame, patronage, kinship) para interpretar textos
- Ex: A parábola do Filho Pródigo (Lucas 15) é melhor compreendida no contexto de honra/paternalismo mediterrâneo
- Críticas: reducionismo sociológico, negligencia a teologia
  `,
  grego: [
    { termo: 'παροιμία', transliteracao: 'paroimía', significado: 'Parábola/Média — literalmente "diz ao lado". Não é apenas "comparação" mas história com significado oculto. Marcos usa μυστήριον (mistério) para as parábolas (4:11).', Strong: 3942 },
    { termo: 'ἐξουσία', transliteracao: 'exousía', significado: 'Autoridade/Poder — termo-chave na crítica de forma. Os milagres de Jesus são atos de exousia (autoridade delegada), não merely dinamismo (δύναμις).', Strong: 1849 },
  ],
  citacoes: [
    {
      autor: 'Ernst Käsemann',
      obra: 'The Testament of Jesus',
      ano: 1970,
      pagina: '15',
      editora: 'Fortress Press',
      local: 'Philadelphia',
      tradutor: 'Ger Krokel',
      citacao: 'A crítica histórica é a irrefutável reivindicação da razão contra toda forma de fanatismo, mesmo religioso. Ela é a proteção contra a manipulação ideológica das Escrituras.',
    },
  ],
  perguntas: [
    'Como a crítca de forma ajuda a entender a composição de Marcos? Quais são suas limitações?',
    'Se Q é hipotética, por que a maioria dos estudiosos aceita sua existência?',
    'Como a crítca canônica de Childs difere da crítca histórica? Há tensão entre elas?',
    'Acrítca social (honor-shame) enriquece ou empobrece a interpretação teológica?',
  ],
  bibliografia: [
    { autor: 'Luz, Ulrich', obra: 'Matthew 1-7: A Commentary', ano: 2007, editora: 'Fortress Press', local: 'Minneapolis', tipo: 'comentario', nivel: 'avancado' },
    { autor: 'Sanders, E.P.', obra: 'Jesus and Judaism', ano: 1985, editora: 'Fortress Press', local: 'Philadelphia', tipo: 'historia', nivel: 'avancado' },
    { autor: 'Bultmann, Rudolf', obra: 'Theology of the New Testament', ano: 1951, editora: 'Scribner\'s', local: 'New York', tipo: 'teologia', nivel: 'especializado' },
    { autor: 'Childs, Brevard S.', obra: 'The New Testament as Canon', ano: 1984, editora: 'Fortress Press', local: 'Philadelphia', tipo: 'teologia', nivel: 'avancado' },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO 3: HERMENÊUTICA TEOLÓGICA
// ═══════════════════════════════════════════════════════════════════════════

export const hermeneuticaModulo3: SecaoAcademica = {
  titulo: '3. Hermenêutica Teológica',
  subtitulo: 'Teologia da Interpretação e Aplicação',
  conteudo: `
## 3.1 A Crise Hermenêutica

### 3.1.1 O Problema Histórico
Como aplicar textos antigos (100-300 a.C. para AT, 50-100 d.C. para NT) a contextos contemporâneos? A "distância hermenêutica" (Schleiermacher) é o problema central da hermenêutica teológica.

### 3.1.2 Abordagens

**Abordagem Literal (Hermenêutica da Carta):**
- Texto significa o que diz, simplesmente
- Risco: anacronismo (ler categorias modernas no texto antigo)
- Defensores:一些 fundamentalistas

**Abordagem Alegórica (Clemente de Alexandria, Orígenes):**
- O texto tem sentido literal, moral e espiritual
- Orígenes via 3 sentidos: literal (corpo), moral (alma), espiritual (espírito)
- Risco: arbitrariedade (o intérprete projeta seu significado)

**Abordagem Histórico-Crítica (Schleiermacher, Dilthey):**
- Busca o sentido original do autor para sua audiência original
- "Compreender é pensar como o autor" (Schleiermacher)
- Risco: historicismo (o texto fica preso ao passado)

**Abordagem Canônica (Childs, Barr):**
- O texto canônico tem autoridade, não a reconstrução histórica
- O sentido da Escritura é determinado pelo contexto canônico
- Risco: negligenciar a história

## 3.2 A Proposta de Gadamer (1900-2002)

### 3.2.1 Fusão de Horizontes
Hans-Georg Gadamer (Verdade e Método, 1960) propôs que a compreensão é sempre uma "fusão de horizontes" (Horizontverschmelzung):
- O intérprete tem um "horizonte" (pré-compreensão, pré-conceitos)
- O texto tem outro horizonte (contexto histórico)
- A compreensão genuína é a fusão desses dois horizontes

### 3.2.2 Crítica a Gadamer
- A "fusão" pode ser manipuladora — o intérprete impõe seu horizonte ao texto
- Gadamer é excessivamente otimista sobre o diálogo entre passado e presente
- A crítica histórica (Bultmann, Ebeling) argumenta que precisamos "desconstruir" o horizonte do intérprete

## 3.3 A Hermenêutica de Bultmann (1884-1976)

### 3.3.1 Desmitologização
Bultmann argumentou que o NT contém "mito" (cosmologia antiga) que precisa ser "desmitologizado" — traduzido para a linguagem da existência humana:
- O mito da descida (katabasis) = a presença de Deus no mundo
- O mito da assunção (anabasis) = a ressurreição como evento existencial
- A cruz = o encontro do homem com Deus no Kerigma (proclamação)

### 3.3.2 Críticas a Bultmann
- A desmitologização é seletiva — por que preservar a cruz mas rejeitar a ressurreição corporal?
- Bultmann reduz o evento histórico ao significado existencial — "a fé não depende de fatos históricos"
- Isentou a Escritura de autoridade objetiva

## 3.4 Hermenêutica da Confissão (Confessional Hermeneutics)

### 3.4.1 A abordagem reformada
- A Escritura deve ser interpretada pela Escritura (analogia fidei)
- A tradição da igreja (creeds, confissões) guia a interpretação
- Não é "sem preconceitos" mas com preconceitos certos

### 3.4.2 Críticas
- Qual confissão? Reformada? Luterana? Católica?
- Pode tornar-se circular ("a Bíblia diz X porque我们的 confissão diz X")
  `,
  grego: [
    { termo: 'διερμηνεύω', transliteracao: 'diermēneúō', significado: 'Interpretar/Explicar — verbo composto: διά (através) + ἑρμηνεύω (interpretar). Paulo usa em 1 Coríntios 12:30 e 14:27 para glossolalia. A interpretação é dom espiritual, não apenas técnica.', Strong: 1329 },
  ],
  citacoes: [
    {
      autor: 'E.D. Hirsch Jr.',
      obra: 'Validity in Interpretation',
      ano: 1967,
      pagina: '8',
      editora: 'Yale University Press',
      local: 'New Haven',
      citacao: 'A validade da interpretação é determinada pelo significado pretendido pelo autor. O significado do texto é o que o autor quis dizer, não o que o leitor quer entender.',
    },
    {
      autor: 'Hans-Georg Gadamer',
      obra: 'Verdade e Método',
      ano: 1960,
      pagina: '358',
      editora: 'Vozes',
      local: 'Petrópolis',
      tradutor: 'Enos Austin Corrêa',
      edicao: '3ª ed.',
      citacao: 'A compreensão não é um ato subjetivo, mas um evento dentro da tradição. O texto não fala do passado, mas diz algo ao presente a partir do passado.',
    },
  ],
  perguntas: [
    'Compare as quatro abordagens hermenêuticas. Qual é mais adequada para a pregação?',
    'Como a proposta de Gadamer (fusão de horizontes) supera o historicismo de Schleiermacher?',
    'A desmitologização de Bultmann é consistente? Por que ou por que não?',
    'A hermenêutica confessional é circular? Como evitar o fundamentalismo?',
  ],
  bibliografia: [
    { autor: 'Thiselton, Anthony C.', obra: 'The New Hermeneutic of the New Testament', ano: 1980, editora: 'Fortress Press', local: 'Philadelphia', tipo: 'teologia', nivel: 'especializado' },
    { autor: 'Fowl, Stephen E.', obra: 'The New Literary Criticism and the New Testament', ano: 1998, editora: 'Trinity Press International', local: 'Harrisburg', tipo: 'linguistica', nivel: 'avancado' },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTAÇÃO DO CURSO COMPLETO
// ═══════════════════════════════════════════════════════════════════════════

import type { CursoRomeros } from './romanos_academico';

export const cursoHermenuticaAcademico: CursoRomeros = {
  id: 'hermenutica-academico',
  titulo: 'Hermenêutica Avançada: Crítica Textual e Interpretação Teológica',
  descricao: 'Métodos científicos de interpretação bíblica: crítica textual, histórico-crítica, hermenêutica teológica (Schleiermacher, Gadamer, Bultmann), leitura social e aplicações pastorais.',
  nivel: 'pos-graduacao',
  duracao: '14 semanas',
  instrutor: 'Prof. Dr. Sola Scriptura',
  prerequisitos: [
    'Grego koiné intermediário',
    'Hebraico bíblico intermediário',
    'Noções de história do NT',
  ],
  objetivos: [
    { nivel: 'Classificar', descricao: 'Classificar variantes textuais usando o sistema Aland-Black' },
    { nivel: 'Aplicar', descricao: 'Aplicar os princípios da crítica externa (lectio difficilior, lectio brevior)' },
    { nivel: 'Comparar', descricao: 'Comparar as abordagens hermenêuticas (histórico-crítica, teológica, canônica, social)' },
    { nivel: 'Avaliar', descricao: 'Avaliar criticamente a proposta de Gadamer sobre fusão de horizontes' },
  ],
  modulos: [hermeneuticaModulo1, hermeneuticaModulo2, hermeneuticaModulo3],
  bibliografiaGeral: [
    { autor: 'Aland, Kurt & Barbara', obra: 'The Text of the New Testament', ano: 1987, editora: 'Eerdmans', local: 'Grand Rapids', tipo: 'linguistica', nivel: 'avancado' },
    { autor: 'Metzger, Bruce M.', obra: 'The Text of the New Testament', ano: 1992, editora: 'Oxford University Press', local: 'New York', tipo: 'linguistica', nivel: 'avancado' },
    { autor: 'Gadamer, Hans-Georg', obra: 'Verdade e Método', ano: 1960, editora: 'Vozes', local: 'Petrópolis', tipo: 'teologia', nivel: 'especializado' },
    { autor: 'Thiselton, Anthony C.', obra: 'The New Hermeneutic of the New Testament', ano: 1980, editora: 'Fortress Press', local: 'Philadelphia', tipo: 'teologia', nivel: 'especializado' },
    { autor: 'Sanders, E.P.', obra: 'Jesus and Judaism', ano: 1985, editora: 'Fortress Press', local: 'Philadelphia', tipo: 'historia', nivel: 'avancado' },
    { autor: 'Childs, Brevard S.', obra: 'The New Testament as Canon', ano: 1984, editora: 'Fortress Press', local: 'Philadelphia', tipo: 'teologia', nivel: 'avancado' },
    { autor: 'Luz, Ulrich', obra: 'Matthew 1-7: A Commentary', ano: 2007, editora: 'Fortress Press', local: 'Minneapolis', tipo: 'comentario', nivel: 'avancado' },
  ],
};
