// ═══════════════════════════════════════════════════════════════════════════
// TEOLOGIA SISTEMATIZADA — PERSPECTIVAS MÚLTIPLAS
// Nível: Seminário / Pós-graduação
// Conteúdo: Doutrinas fundamentais com desenvolvimento histórico,
//           perspectivas reformada, arminiana, católica, ortodoxa,
//           debate acadêmico contemporâneo, bibliografia completa
// ═══════════════════════════════════════════════════════════════════════════

import type { SecaoAcademica, PerspectivaTeologica, ReferenciaBibliografica } from './romanos_academico';

// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO 1: DEUS — TEOLOGIA PROPGA
// ═══════════════════════════════════════════════════════════════════════════

export const teologiaModulo1: SecaoAcademica = {
  titulo: '1. Deus: Natureza e Atributos',
  subtitulo: 'Teologia Própria com Perspectivas Multiculturais',
  conteudo: `
## 1.1 A Questão do Conhecido de Deus

### 1.1.1 Teísmo Clássico
A tradição ocidental (Agostinho, Anselmo, Tomás de Aquino) desenvolveu o conceito de "Deus simples" (simplicitas divina):
- Deus não tem partes — é idêntico a seus atributos
- Deus não tem potencialidade, apenas atualidade (ato puro)
- Todos os atributos são idênticos à essência divina

**Problema:** Isso cria dificuldades: como Deus pode ser misericordioso e justo ao mesmo tempo? No teísmo clássico, são a mesma coisa (misericórdia é justiça aplicada graciosamente).

### 1.1.2 Teísmo Processual (Whitehead, Hartshorne)
- Deus não é imutável no sentido clássico — ele muda em relação ao mundo
- Deus é "bifacial": natureza imutável + relações mutáveis
- O sofrimento humano afeta Deus (Deus sofre conosco)
- Críticas: minora a soberania divina, não reflete a Escritura claramente

### 1.1.3 O Deus Bíblico vs. Deus Filosófico
A tensão entre:
- O Deus abstrato dos filósofos (imutável, impassível, atemporal)
- O Deus pessoal da Escritura (que se ira, se arrepende, ama)

## 1.2 A Trindade

### 1.2.1 Desenvolvimento Histórico
| Século | Debate | Concílio | Resultado |
|--------|--------|----------|-----------|
| IV | Arianismo | Niceia (325) | Homoousios (mesma substância) |
| V | Nestorianismo | Éfeso (431) | Unidade de pessoa em Cristo |
| V | Monofisismo | Calcedônia (451) | Duas naturezas, uma pessoa |
| VII | Iconoclastia | Niceia II (787) | Legitimidade dos ícones |

### 1.2.2 Perspectivas Trinitárias

**Trinitarianismo Ocidental (Latino):**
- Processão: Filho do Pai, Espírito do Pai E do Filho (Filioque)
- Unidade de substância, distinção de pessoas
- Modelo: "Fonte" (Pai) → "Rio" (Filho) → "Mar" (Espírito)

**Trinitarianismo Oriental (Grego):**
- Processão: Filho do Pai, Espírito só do Pai (sem Filioque)
- Unidade de essência, distinção de energias (essência/energia)
- Modelo: "Sol" (essência) → "Raios" (pessoas/energias)

**Trinitarianismo Social (Perichoresis):**
- As três pessoas são relacionais — existem em pericorese (interpenetração)
- A unidade não é substantiva mas comunitária
- Risco: tri-teísmo (3 deuses)

### 1.2.3 O Debate Filioque
A cláusula Filioque ("e do Filho") foi adicionada ao Credo Niceno pela igreja ocidental (século IX), causando o Grande Cisma (1054):
- **Ocidente:** O Espírito procede do Pai E do Filho — justificativa: João 15:26; 16:7
- **Oriente:** O Espírito procede só do Pai — justificativa: João 15:26; tradição patrística

## 1.3 Atributos Divinos

### 1.3.1 Atributos Incomunicáveis
| Atributo | Definição | Debate |
|----------|-----------|--------|
| **Imutabilidade** (immutabilitas) | Deus não muda | Processual vs. Clássico |
| **Impassibilidade** | Deus não sofre | Teopatia (Moltmann) vs. Tradição |
| **Atemporalidade** | Deus está fora do tempo | Eternidade atemporal vs./temporal (Hick) |
| **Onisciência** | Deus sabe tudo | Open Theism (Swinburne) vs. Clássico |

### 1.3.2 Atributos Comunicáveis
| Atributo | Definição | Debate |
|----------|-----------|--------|
| **Bondade** (bonitas) | Deus é a fonte de todo bem | Theodiceia: como conciliar bondade com mal? |
| **Justiça** (iustitia) | Deus retribui proporcionalmente | Justiça retributiva vs. restaurativa |
| **Misericórdia** (misericordia) | Deus se compadece do sofredor | É "justiça aplicada graciosamente" (Aquino) ou attribute separado? |
| **Amor** (amor) | Deus ama incondicionalmente | Amor agápico vs. eros vs. philia |

### 1.3.3 O Debate sobre Impassibilidade

**Tradição Clássica (Agostinho, Aquino, Confissão de Westminster):**
- Deus não é afetado externamente
- A "ira" de Deus não é emoção mas justiça
- Impassibilidade = perfeição, não indiferença

**Teologia da Cruz (Moltmann, Soelle):**
- A cruz mostra que Deus sofre com a humanidade
- O Deus impassível é "divórcio entre o Deus vivo e o Deus moribundo" (Moltmann)
- A Paixão de Deus (The Passibility of God) — John Macquarrie

**Posição Intermediária (Bavinck, Berkhof):**
- Deus pode "experimentar" sofrimento sem ser "afetado" por ele
- Distinção entre emoções humanas (passions) e atributos divinos
  `,
  grego: [
    { termo: 'ἐγώ εἰμι', transliteracao: 'egṓ eimí', significado: 'Eu Sou — declaração divina em João 8:58. Não é apenas identidade pessoal ("eu sou Jesus") mas declaração ontológica ("eu sou o Ser"), ligada a Êxodo 3:14 (YHWH).', Strong: 1510 },
  ],
  citacoes: [
    {
      autor: 'Anselmo de Cantuária',
      obra: 'Proslogion',
      ano: 1078,
      editora: 'Edição Crítica',
      local: 'Oxford',
      citacao: 'Deus é aquilo do qual nada maior pode ser pensado (aliquid quo nihil maius cogitari possit).',
    },
    {
      autor: 'Jürgen Moltmann',
      obra: 'A Trindade e o Reino',
      ano: 1981,
      pagina: '28',
      editora: 'Vozes',
      local: 'Petrópolis',
      tradutor: 'Walter Ossamu Watanabe',
      citacao: 'O Deus sofredor é mais forte que o Deus impassível: o Deus que sofre é mais sensível que o Deus indiferente.',
    },
  ],
  perguntas: [
    'Como conciliar a imutabilidade divina (Hebreus 13:8) com textos que mostram Deus "mudando de ideia" (Gênesis 6:6)?',
    'O Filioque é uma adição legítima ao Credo? Argumente por uma das posições.',
    'A teologia processual é uma alternativa viável ao teísmo clássico? Por que ou por que não?',
    'A Trindade é racionalmente defensável? Como responder ao argumento de contradição (1 ≠ 3)?',
  ],
  bibliografia: [
    { autor: 'Bavinck, Herman', obra: 'Reformed Dogmatics', ano: 2008, editora: 'Baker Academic', local: 'Grand Rapids', tipo: 'teologia', nivel: 'avancado' },
    { autor: 'Wright, N.T.', obra: 'God in the Storm', ano: 1987, editora: 'Eerdmans', local: 'Grand Rapids', tipo: 'teologia', nivel: 'intermediario' },
    { autor: 'Turretin, Francis', obra: 'Institutes of Elenctic Theology', ano: 1688, editora: 'P&R Publishing', local: 'Phillipsburg', tipo: 'teologia', nivel: 'especializado' },
    { autor: 'Pannenberg, Wolfhart', obra: 'Systematic Theology', ano: 1991, editora: 'Eerdmans', local: 'Grand Rapids', tipo: 'teologia', nivel: 'especializado' },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO 2: SALVAÇÃO — SOTERIOLOGIA
// ═══════════════════════════════════════════════════════════════════════════

export const teologiaModulo2: SecaoAcademica = {
  titulo: '2. Salvação: Eleição, Graça e Liberdade Humana',
  subtitulo: 'O Debate mais Antigo da Teologia Cristã',
  conteudo: `
## 2.1 As Tradições Soteriológicas

### 2.1.1 Agostinianismo/Calvinismo
- **Eleição incondicional:** Deus escolhe quem será salvo antes da fundação do mundo (Efésios 1:4-5)
- **Depravação total:** O homem é incapaz de crer sem regeneração precedente
- **Graça irresistível:** A graça eficaz não pode ser rejeitada
- **Perseverança dos santos:** Os eleitos perseveram até o fim
- **Atonement limitado:** Cristo morreu pelos eleitos

**Base bíblica:** Romanos 9:10-23; Efésios 1:4-5; 2:8-9; João 6:44; 10:26-29

### 2.1.2 Arminianismo/Wesleyanismo
- **Eleição condicional:** Deus escolhe com base na presciência da fé
- **Graça preveniente:** A graça precede a decisão humana mas não a força
- **Resistência da graça:** O homem pode rejeitar a graça
- **Segurança condicional:** A salvação pode ser perdida
- **Atonement ilimitado:** Cristo morreu por todos

**Base bíblica:** João 3:16; 1 Timóteo 2:4; 2 Pedro 3:9; Hebreus 6:4-6; 10:26-29

### 2.1.3 Catolicismo Romano
- **Justificação como transformação:** Não é declaration mas infusion (graça santificante)
- **Sacramentos:** Batismo regenera, Eucaristia mantém a graça
- **Obra cooperativa:** O homem coopera com a graça (synergism)
- **Purgatório:** Purgação dos pecados depois da morte
- **Mérito:** O crente pode merecer graça (de condigno ou congruo)

**Base bíblica:** Tiago 2:24; Mateus 12:32; 1 Coríntios 3:12-15

### 2.1.4 Ortodoxia Oriental
- **Theosis (deificação):** O homem se torna "participante da natureza divina" (2 Pedro 1:4)
- **Energias/essência:** Deus comunicável (energias) vs. inacessível (essência)
- **Sinergismo:** Salvação é cooperação entre graça divina e liberdade humana
- **Sem Purgatório:** Mas há um estado intermediário (Aerial Tollhouses)

## 2.2 O Debate Contemporâneo

### 2.2.1 Calvinismo vs. Arminianismo na Academia

**Calvinistas contemporâneos:**
- John Piper: "Deus é mais satisfeito em nós do que nós em nós mesmos"
- R.C. Sproul: "A graça não é apenas necessária mas suficiente"
- Wayne Grudem: Teologia sistemática reformada

**Arminianos contemporâneos:**
- Roger Olson: "A graça de Deus é resistível"
- Ben Witherington III: "A presciência divina é o fundamento da eleição"
- Jack Cottrell: Teologia batista arminiana

**Nova Perspectiva (moderada):**
- N.T. Wright: "A eleição é corporativa (Israel), não individual"
- Michael Bird: "Justificação é o veredicto final antecipado"

### 2.2.2 O Open Theism
- Deus não sabe o futuro livre (Gregory Boyd, Clark Pinnock)
- Deus é onisciente no passado e presente, mas o futuro é aberto
- Críticas: minora a soberania divina, não reflete a Escritura claramente
- Defesas: respeita a liberdade humana, torna a oração genuína

### 2.2.3 A Questão do Inferno

**Eternidade do castigo (Calvinismo, Catolicismo):**
- Mateus 25:46 — "eterno" (aiōnios) = sem fim
- Agostinho: "O fogo do inferno é eterno quanto ao gênero, não quanto à duração"

**Aniquilaçãoismo:**
- Mateus 10:28 — "destruir" (apollymi) = aniquilar
- John Stott, Edward Fudge: os ímpios deixam de existir

**Universalismo (apokatastasis):**
- Orígenes: todas as criaturas serão restauradas
- 1 Timóteo 2:4 — Deus quer que todos sejam salvos
- Hans Urs von Balthasar: "Daremos o inferno como vazio"

## 2.3 A Questão Batismal

### 2.3.1 Batismo Regenerante vs. Simbólico

**Regenerante (Catolicismo, Luteranismo, Igreja Anglicana):**
- Batismo como meio de graça
- "Quem crer e for batizado será salvo" (Marcos 16:16)
- Acts 2:38 — "Batismo-se para remissão dos pecados"

**Simbólico (Batistas, Pentecostais, Igrejas de Cristo):**
- Batismo como público testemunho
- Fé precede o batismo (Atos 16:31)
- O ladrão na cruz (Lucas 23:43) não foi batizado
  `,
  grego: [
    { termo: 'ἐκλογή', transliteracao: 'eklogḗ', significado: 'Escolha/Eleição — termo-chave no debate calvinismo/arminianismo. Pode ser pessoal (Romanos 9) ou corporativa (Efésios 1:4 — "em Cristo").', Strong: 1589 },
    { termo: 'πρόθεσις', transliteracao: 'próthesis', significado: 'Propósito/Intenção —Efésios 1:11: "segundo o propósito daquele que faz todas as coisas conforme o conselho de sua vontade". Non "decreto" mas "intenção".', Strong: 4286 },
    { termo: 'χάρισμα', transliteracao: 'khárisma', significado: 'Dádiva/Graça — Romanos 6:23: "o dom de Deus é a vida eterna". Não é "salário" mas "presente", não é "merecido" mas "gratuito".', Strong: 5486 },
  ],
  perspectivas: [
    {
      nome: 'Calvinismo Reformado',
      tradicao: 'Reformada',
      representantes: 'John Calvin, John Owen, R.C. Sproul, John Piper, Wayne Grudem',
      argumento: 'A soberania de Deus é absoluta. A eleição é incondicional, a graça é irresistível, a perseverança é garantida. Romanos 9 é o texto central.',
      forcas: ['Coerência com a soberania divina', 'Respeito à totalidade bíblica'],
      fraquezas: ['Dificuldade com João 3:16 e 1 Timóteo 2:4', 'Tensão com a responsabilidade moral humana'],
    },
    {
      nome: 'Arminianismo Clássico',
      tradicao: 'Wesleyana',
      representantes: 'Jacob Arminius, John Wesley, Roger Olson, Ben Witherington III',
      argumento: 'A graça preveniente capacita, mas não força, a decisão humana. A eleição é condicional à presciência da fé. A perseverança pode ser perdida.',
      forcas: ['Faz justiça ao apelo universal do evangelho', 'Coerência com a responsabilidade humana'],
      fraquezas: ['Pode subestimar a soberania divina', 'Dificuldade com Romanos 9:10-23'],
    },
    {
      nome: 'Catolicismo Romano',
      tradicao: 'Católica',
      representantes: 'Tomás de Aquino, Concílio de Trento, Catecismo da Igreja Católica',
      argumento: 'A justificação é infusion (transformação), não declaration. Os sacramentos são meios de graça. O homem coopera com a graça (synergism).',
      forcas: ['Coerência com Tiago 2:24', 'Enfoque na transformação moral'],
      fraquezas: ['Risco de obras-mongering', 'Complexidade do sistema sacamental'],
    },
    {
      nome: 'Ortodoxia Oriental',
      tradicao: 'Ortodoxa',
      representantes: 'Atenágoras, C.S. Lewis, David Bentley Hart',
      argumento: 'A salvação é theosis (deificação), não apenas perdão. Deus se comunica por energias, não por essência. Sinergismo é o modelo.',
      forcas: ['Enfoque na transformação holística', 'Respeito ao mistério divino'],
      fraquezas: ['Terminologia obscura para ocidentais', 'Dificuldade de sistematização'],
    },
  ],
  citacoes: [
    {
      autor: 'John Owen',
      obra: 'The Death of Death in the Death of Christ',
      ano: 1647,
      editora: 'Banner of Truth',
      local: 'Edinburgh',
      citacao: 'A redenção de Cristo é eficaz — ela alcança seu propósito de libertar os eleitos do pecado e da morte.',
    },
  ],
  perguntas: [
    'Como Romanos 9:10-23 se compatibiliza com João 3:16? Resolva a tensão.',
    'A "justificação pela fé" (Romanos 3:28) é declaration (Lutero) ou transformation (Aquino)? Argumente.',
    'Qual é a posição mais coerente com o testemunho bíblico completo: calvinismo, arminianismo, catolicismo ou ortodoxia?',
    'O Open Theism é uma heresia ou uma alternativa legítima? Analise.',
  ],
  bibliografia: [
    { autor: 'Grudem, Wayne', obra: 'Systematic Theology', ano: 1994, editora: 'Zondervan', local: 'Grand Rapids', tipo: 'teologia', nivel: 'avancado' },
    { autor: 'Olsen, Roger', obra: 'Against Calvinism', ano: 2011, editora: 'Zondervan', local: 'Grand Rapids', tipo: 'teologia', nivel: 'intermediario' },
    { autor: 'Steele, D.N. & Thomas, C.C.', obra: 'The Five Points of Calvinism', ano: 1963, editora: 'P&R Publishing', local: 'Philadelphia', tipo: 'teologia', nivel: 'intermediario' },
    { autor: 'Pinnock, Clark', obra: 'The Grace of God and the Will of Man', ano: 1989, editora: 'Zondervan', local: 'Grand Rapids', tipo: 'teologia', nivel: 'avancado' },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO 3: ESGATOLOGIA
// ═══════════════════════════════════════════════════════════════════════════

export const teologiaModulo3: SecaoAcademica = {
  titulo: '3. Escatologia: As Últimas Coisas',
  subtitulo: 'Milenarismo, Juízo Final e Morte Eterna',
  conteudo: `
## 3.1 Posições Milenaristas

### 3.1.1 Premilenarismo Histórico
- Cristo retorna antes do milênio (Apocalipse 20:1-6)
- O milênio é um período literal de 1.000 anos
- Perseguição e apostasia precedem a Parusia
- Defensores: Igreja Primitiva (Papias, Justino), Hal Lindsey, John MacArthur

### 3.1.2 Premilenarismo Dispensacionalista
- Distinção entre Israel e Igreja (7 "dispensações")
- Arrebatamento secreto antes da tribulação (1 Tessalonicenses 4:16-17)
- Grande Tribulação de 7 anos (Daniel 9:27)
- Milênio literal em Jerusalém restaurada
- Defensores: John Nelson Darby, C.I. Scofield, Tim LaHaye, Charles Ryrie

### 3.1.3 Pós-milenarismo
- O milênio vem antes do retorno de Cristo
- O evangelho transformará o mundo gradualmente
- Progresso social e moral antes da Parusia
- Defensores: Jonathan Edwards, Charles Hodge, B.B. Warfield

### 3.1.4 Amilenarismo
- O "milênio" é simbólico do período entre Encarnação e Parusia
- Não há período literal de 1.000 anos
- O Reino de Deus já mas ainda não (in augurated eschatology)
- Defensores: Agostinho, Warfield, Anthony Hoekema, Kim Riddlebarger

## 3.2 O Juízo Final

### 3.2.1 Natureza do Juízo
- **Juízo geral:** Todos ressuscitarão para julgamento (Atos 17:31; Hebreus 9:27)
- **Juízo particular:** Cada um prestará contas (Romanos 14:12)
- **Juízo das nações:** Mateus 25:31-46 (ovelhas/cabras)

### 3.2.2 Base do Juízo
- **Obras:** Mateus 16:27; 25:31-46; Romanos 2:6; Apocalipse 20:12
- **Fé:** João 3:18; Romanos 8:1
- **Como conciliar?** A fé é demonstrada pelas obras (Tiago 2:14-26)

## 3.3 A Morte Eterna

### 3.3.1 Eternidade do Castigo (Maioria)
- Mateus 25:46 — "eterno" (aiōnios) = sem fim
- Apocalipse 20:10 — "tormentos dia e noite pelos séculos dos séculos"

### 3.3.2 Aniquilaçãoismo
- Mateus 10:28 — "destruir" (apollymi) = aniquilar
- João 3:16 — "pereça" (apollytai) = ser destruído
- Defensores: John Stott, Edward Fudge, Clark Pinnock

### 3.3.3 Universalismo
- Orígenes: todas as criaturas serão restauradas
- 1 Timóteo 2:4 — Deus quer que todos sejam salvos
- Hans Urs von Balthasar: "Daremos o inferno como vazio"

## 3.4 A Ressurreição

### 3.4.1 Ressurreição Corporal
- Jesus ressuscitou corporalmente (Lucas 24:39 — "tendo carne e osso")
- Os crentes ressuscitarão com corpos transformados (1 Coríntios 15:35-58)
- O corpo será "semente" que se transforma (1 Coríntios 15:36-38)

### 3.4.2 Natureza dos Corpos Ressurretos
- **Imortalidade:** "O corrompível se vestirá de incorrupção" (1 Coríntios 15:54)
- **Espiritualidade:** Não "corpo espiritual" como "fantasma" mas "dotado do Espírito"
- **Identidade pessoal:** O mesmo "eu" que morreu ressuscitará (1 Coríntios 15:42-44)
  `,
  grego: [
    { termo: 'χίλια ἔτη', transliteracao: 'khília étē', significado: 'Mil anos (Apocalipse 20:2-7) — a palavra é literal. O debate é se "mil" deve ser interpretado literal ou simbolicamente (amilenarismo vs. premilenarismo).', Strong: 5507 },
    { termo: 'ἀποκάστασις', transliteracao: 'apokatástasis', significado: 'Restauração/Universalismo — Atos 3:21. Orígenes usou para defender a restauração universal. A maioria dos pais da igreja rejeitou essa leitura.', Strong: 605 },
    { termo: 'αἰώνιος', transliteracao: 'aiṓnios', significado: 'Eterno/Sempiterno — adjetivo. Mateus 25:46: "eterno" para vida e tormento. O debate é se significa "sem fim" ou "da era vindoura".', Strong: 166 },
  ],
  citacoes: [
    {
      autor: 'George Eldon Ladd',
      obra: 'A Theology of the New Testament',
      ano: 1974,
      pagina: '549',
      editora: 'Eerdmans',
      local: 'Grand Rapids',
      edicao: 'Revised Edition',
      citacao: 'A escatologia do NT é não apenas futurista (ainda não) mas presente (já). O Reino de Deus já começou na pessoa e obra de Jesus, mas ainda se consumará na Parusia.',
    },
  ],
  perguntas: [
    'Compare as quatro posições milenaristas. Qual é mais fiel ao Apocalipse 20?',
    'Como conciliar juízo por obras (Mateus 25) com salvação pela fé (Efésios 2:8-9)?',
    'O aniquilaçãoismo é uma heresia? Analise argumentos bíblicos para e contra.',
    'Como a ressurreição corporal de Jesus se relaciona com a futura ressurreição dos crentes?',
  ],
  bibliografia: [
    { autor: 'Ladd, George Eldon', obra: 'A Theology of the New Testament', ano: 1974, editora: 'Eerdmans', local: 'Grand Rapids', tipo: 'teologia', nivel: 'avancado' },
    { autor: 'Hoekema, Anthony A.', obra: 'The Bible and the Future', ano: 1979, editora: 'Eerdmans', local: 'Grand Rapids', tipo: 'teologia', nivel: 'avancado' },
    { autor: 'Stott, John R.W.', obra: 'Evangelical Essentials', ano: 1988, editora: 'IVP', local: 'Downers Grove', tipo: 'teologia', nivel: 'intermediario' },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTAÇÃO DO CURSO COMPLETO
// ═══════════════════════════════════════════════════════════════════════════

import type { CursoRomeros } from './romanos_academico';

export const cursoTeologiaAcademico: CursoRomeros = {
  id: 'teologia-academico',
  titulo: 'Teologia Sistematizada: Doutrinas Fundamentais em Perspectivas Múltiplas',
  descricao: 'Análise acadêmica das grandes doutrinas cristãs: Trindade, eleição, salvação, escatologia. Cada doutrina apresentada com desenvolvimento histórico, perspectivas reformada/arminiana/católica/oriental, debate acadêmico contemporâneo e bibliografia completa.',
  nivel: 'pos-graduacao',
  duracao: '16 semanas',
  instrutor: 'Prof. Dr. Sola Scriptura',
  prerequisitos: [
    'Conhecimento de teologia sistemática básica',
    'História da igreja (patrística, medieval, Reforma)',
    'Leitura de textos originais (grego/latim) é desejável',
  ],
  objetivos: [
    { nivel: 'Articular', descricao: 'Articular as principais doutrinas cristãs com precisão terminológica' },
    { nivel: 'Comparar', descricao: 'Comparar as perspectivas reformada, arminiana, católica e oriental sobre cada doutrina' },
    { nivel: 'Avaliar', descricao: 'Avaliar criticamente o debate contemporâneo (Open Theism, Nova Perspectiva)' },
    { nivel: 'Citar', descricao: 'Citar fontes primárias (Confissões, Catecismos) e secundárias com precisão' },
  ],
  modulos: [teologiaModulo1, teologiaModulo2, teologiaModulo3],
  bibliografiaGeral: [
    { autor: 'Bavinck, Herman', obra: 'Reformed Dogmatics (4 vols.)', ano: 2008, editora: 'Baker Academic', local: 'Grand Rapids', tipo: 'teologia', nivel: 'especializado' },
    { autor: 'Grudem, Wayne', obra: 'Systematic Theology', ano: 1994, editora: 'Zondervan', local: 'Grand Rapids', tipo: 'teologia', nivel: 'avancado' },
    { autor: 'Pannenberg, Wolfhart', obra: 'Systematic Theology (3 vols.)', ano: 1991, editora: 'Eerdmans', local: 'Grand Rapids', tipo: 'teologia', nivel: 'especializado' },
    { autor: 'Letham, Robert', obra: 'Systematic Theology', ano: 2019, editora: 'Crossway', local: 'Wheaton', tipo: 'teologia', nivel: 'avancado' },
    { autor: 'Geisler, Norman', obra: 'Systematic Theology (3 vols.)', ano: 2002, editora: 'Bethany House', local: 'Minneapolis', tipo: 'teologia', nivel: 'avancado' },
    { autor: 'Olsen, Roger', obra: 'The Story of Christian Theology', ano: 1999, editora: 'IVP Academic', local: 'Downers Grove', tipo: 'historia', nivel: 'intermediario' },
    { autor: 'Kelly, J.N.D.', obra: 'Early Christian Doctrines', ano: 1958, editora: 'Harper & Row', local: 'New York', tipo: 'historia', nivel: 'intermediario' },
  ],
};
