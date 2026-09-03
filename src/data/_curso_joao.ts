import type { Curso } from './cursos';

export const CURSO_JOAO: Curso = {
  id: 'joao-verbo',
  título: 'João: O Evangelho da Vida Eterna',
  descrição: 'Um mergulho profundo no evangelho mais teológico do Novo Testamento — de O Logos à Ressurreição, com os maiores exegetas da história da igreja.',
  instrutor: 'Sola Scriptura',
  duração: '10 módulos · 10 aulas + avaliação',
  nível: 'avançado',
  categoria: 'Novo Testamento',
  certificado: true,
  módulos: [
    {
      id: 'joao-mod-1',
      título: 'Panorama do Evangelho de João',
      descrição: 'Contexto histórico, propósito, audiência e estrutura do quarto Evangelho',
      ícone: '📜',
      aulas: [
        {
          id: 'joao-1-1',
          título: 'Panorama do Evangelho de João',
          tipo: 'video',
          duração: '20 min',
          videoUrl: 'https://www.youtube.com/watch?v=G-POQCEqFXk',
          videoTítulo: 'Evangelho de João — Introdução | BibleProject Português',
          conteúdo: `## Panorama do Evangelho de João

O Evangelho de João ocupa uma posição singular no cânone neotestamentário. Enquanto Mateus, Marcos e Lucas — os chamados Evangelhos Sinóticos — compartilham uma estrutura narrativa semelhante e cobrem amplamente o ministério público de Jesus na Galileia, João oferece uma perspectiva radicalmente distinta: mais teológica, mais reflexiva e mais concentrada nos ensinamentos discursivos de Jesus em Jerusalém. Rudolf Bultmann, em sua monumental introdução ao quarto Evangelho, classificou João como o mais independente dos evangelhos, um escrito que opera com suas próprias categorias cristológicas e soteriológicas, distantes do esquema sinótico de narração-ensinamento-milagre.

### Contexto histórico e datação

A tradição da igreja primitiva, atestada por Irineu de Lyon (Adversus Haereses 3.1.1, c. 180 d.C.), atribui o Evangelho ao apóstolo João, filho de Zebedeu, o discípulo amado. Embora o texto jamais declare explicitamente essa autoria, várias pistas internas corroboram a tradição: o autor se apresenta como testemunha ocular (João 1:14, 19:35, 21:24), conhecimento detalhado da geografia palestina (poço de Jacó, lago de Tiberíades, piscina de Siloé), e familiaridade com as festas judaicas (Páscoa, Tabernáculos, Dedicacao).

A datação do evangelho varia significativamente entre os estudiosos. A maioria dos estudiosos críticos data João entre 90 e 100 d.C., presumindo que o autor escreveu após a destruição do Templo em 70 d.C. No entanto, Raymond Brown, em seu magistral comentário (The Gospel According to John, Anchor Bible, 1966-1970), argumenta que o núcleo da tradição joanine pode ser substancialmente anterior, possivelmente arraigado nos ensinamentos do próprio João antes de sua morte em Efeso (c. 95-100 d.C.). A ausência de referência à destruição do Templo e a menção de um Lago de Genesarés (João 5:2, em tempo presente) sugerem que pelo menos porções do texto foram compostas antes de 70 d.C.

### Audiência e propósito

O propósito do Evangelho de João é declarado explicitamente em dois versículos programáticos: João 20:31 — Mas estas foram escritas para que creiais que Jesus é o Cristo, o Filho de Deus, e para que, crendo, tenhais vida em seu nome — e João 15:11 — Estas coisas vos tenho dito para que a minha alegria esteja em vós, e a vossa alegria seja completa. O evangelho não é meramente uma biografia; é um escrito missiológico e pastoral, destinado a gerar e fortalecer a fé no leitor.

A audiência provável inclui tanto judeus quanto gregos. A familiaridade com as Escrituras hebraicas, as festas judaicas e a teologia monoteísta indica um público judeu-cristão. Ao mesmo tempo, a tradução de termos aramaicos (como Rabuni em 20:16, Siloé em 9:7), a ênfase na universalidade do plano redentor (10:16, 11:51-52, 12:32), e o uso de conceitos filosóficos gregos (Logos em 1:1, zōē em 3:16) sugerem uma audiência helenística. Leon Morris, em The Gospel According to John (NICNT, 1971), observa que João escreve para uma comunidade plural, mas com um objetivo unitário: que todos reconheçam em Jesus o Filho de Deus.

### Estrutura do evangelho

A estrutura do Evangelho de João é objeto de debate acadêmico significativo. A divisão mais tradicional, proposta por Raymond Brown, organiza o texto em duas grandes seções: o Livro dos Sinais (João 1-12) e o Livro da Glória (João 13-21). Essa divisão se apoia nos versículos programáticos de João 7:30 e 12:23, que marcam o término da hora de Jesus.

Outros estudiosos, como C.H. Dodd, propõem uma estrutura mais complexa, baseada em sinais e discursos entrelaçados. Dodd identifica sete sinais principais (transformação da água em vinho, cura do filho do oficial, cura do paralítico na piscina de Siloé, multiplicação dos pães, caminhada sobre as águas, cura do cego de nascença, ressurreição de Lázaro) que servem como espinha dorsal narrativa do primeiro livro.

Uma terceira abordagem, defendida por Barnabas Lindars (The Gospel of John, 1972), enfatiza a estrutura discursiva: os sete discursos de Jesus (3:1-21, 4:1-42, 6:35-59, 8:12-59, 10:1-18, 14:1-16:33, 17:1-26) formam o arcabouço teológico do evangelho, enquanto as narrativas servem como contexto para esses ensinamentos.

### Distinções dos sinóticos

As diferenças entre João e os Sinóticos são notáveis e teologicamente significativas. João omite a genealogia, o nascimento virginal, o batismo de Jesus, a tentação no deserto, a transfiguração, a instituição da Ceia, a oração no Getsêmani e a Ascensão — eventos centrais nos outros evangelhos. Em compensação, João inclui episódios ausentes nos Sinóticos: o discurso com Nicodemos, a mulher samaritana, a ressurreição de Lázaro, a lavagem dos pés, a oração sacerdotal e múltiplos discursos de despedida.

As datas das festas também diferem significativamente. Enquanto os Sinóticos sincronizam a crucificação com a Páscoa, João posiciona a crucificação no dia 14 de Nisan, exatamente quando os cordeiros pascalinos eram abatidos no Templo. Essa divergência cronológica gerou debates intensos entre estudiosos como John A.T. Robinson (Redating the New Testament, 1976), que argumenta pela historicidade da cronologia joanine, e Bultmann, que a considera uma construção teológica.

### A teologia joanine

A teologia do quarto Evangelho é profundamente cristocêntrica. Jesus não é apenas o Messias de Israel — é o Logos eterno, o Filho unigênito, o revelador do Pai. A cristologia joanine opera em dois níveis complementares: a descida (o Verbo que se faz carne, 1:14) e a ascensão (Jesus que retorna ao Pai, 17:5). Entre esses dois polos, toda a narrativa se desenrola como uma progressiva revelação da identidade divina.

O conceito de zōē aiōnios (vida eterna) permeia todo o evangelho. João não define a vida eterna como existência interminável — é conhecimento relacional: A vida eterna é que te conheçam a ti, o único Deus verdadeiro, e a Jesus Cristo, a quem enviaste (João 17:3). André Feuillet (Le Christ, Sagesse de Dieu, 1977) enfatiza que para João, a vida eterna começa agora, no relacionamento com Cristo, e se consuma na eternidade.

Neste curso, percorrereos os principais blocos temáticos do Evangelho de João: o Prólogo joanine, os sinais messiânicos, os discursos Eu sou, a Ceia e os discursos de despedida, a paixão e morte, a ressurreição, os grandes temas teológicos e a relação com os Sinóticos. Cada módulo será acompanhado de análise exegética, referência aos termos gregos originais e consulta aos maiores comentaristas da história da igreja.`,
          versículosChave: [
            { ref: 'João 20:31', texto: 'Mas estas foram escritas para que creiais que Jesus é o Cristo, o Filho de Deus, e para que, crendo, tenhais vida em seu nome.' },
            { ref: 'João 15:11', texto: 'Estas coisas vos tenho dito para que a minha alegria esteja em vós, e a vossa alegria seja completa.' },
            { ref: 'João 17:3', texto: 'A vida eterna é que te conheçam a ti, o único Deus verdadeiro, e a Jesus Cristo, a quem enviaste.' },
          ],
        },
      ],
    },
    {
      id: 'joao-mod-2',
      título: 'O Prólogo (Jo 1:1-18)',
      descrição: 'O Logos eterno, a encarnação, o testemunho de João Batista',
      ícone: '✨',
      aulas: [
        {
          id: 'joao-2-1',
          título: 'O Prólogo: O Logos eterno que se fez carne',
          tipo: 'texto',
          duração: '18 min',
          conteúdo: `## O Prólogo: O Logos eterno que se fez carne

João 1:1-18 é um dos textos teológicos mais densos e profundos de toda a Escritura Sagrada. O Prólogo joanine não é meramente uma introdução poética; é uma declaração cristológica que estabelece as bases para todo o restante do evangelho. Enquanto Mateus começa com genealogia (linhagem humana de Jesus) e Lucas com nascimento (acontecimento temporal), João inicia sua narrativa na eternidade, no próprio âmago da pré-existência divina. Como observou Leon Morris, "o Prólogo de João nos leva além do tempo, ao eterno, onde o Verbo já existia."

### O Verbo (Logos) na eternidade

As primeiras palavras — "No princípio era o Verbo" — ecoam deliberadamente Gênesis 1:1. No entanto, a escolha lexical do termo grego *Logos* não é arbitrária. Para o ouvinte judeu, *Logos* evocava a Sabedoria personificada de Provérbios 8, que estava ao lado de Deus na criação e participava ativamente na formação do mundo: "O Senhor me possuía no início de suas obras, antes de suas ações mais antigas. Fui estabelecida desde a eternidade, desde o princípio, antes que a terra existisse" (Provérbios 8:22-23). Para o ouvinte grego, *Logos* remetia ao princípio racional e ordenador do universo — a força cósmica que dava coerência à realidade visível, como Filo de Alexandria articulou em suas obras filosóficas.

João se apropria desse termo carregado de significado em ambas as tradições culturais e o transforma radicalmente: o *Logos* não é uma abstração filosófica nem uma força impessoal — é uma Pessoa, o Filho eterno de Deus. Essa identificação é sem precedentes na literatura judaica e grega. Como escreveu C.K. Barrett, em seu Kommentar zum Johannesevangelium (1978), "João não está fazendo teologia natural ou filosofia apocalíptica; está fazendo cristologia — a cristologia mais alta do Novo Testamento."

### As três afirmações do versículo 1:1

O versículo 1:1 contém três cláusulas que formam um triângulo cristológico perfeito: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus."

A primeira cláusula — "No princípio era o Verbo" — declara a eternidade do Logos. O verbo grego *ēn* (era) está no imperfeito, indicando existência contínua e ininterrupta. Não "no princípio o Verbo começou a existir", mas "era" — estava existindo desde sempre, sem início. Essa distinção é crucial: o Logos não é uma criatura, por mais elevada que seja. Como afirma o credo niceno, "de Deus, luz da luz, Deus verdadeiro de Deus verdadeiro, gerado, não feito, consubstancial ao Pai."

A segunda cláusula — "o Verbo estava com Deus" — declara a distinção de pessoas. A preposição grega *pros* (com, na direção de) indica muito mais que mera proximidade. É a mesma preposição usada em João 1:18 (que está no seio do Pai) e em 1 João 1:1. *Pros* denota relação face a face, intimidade pessoal perfeita. O Verbo não é idêntico ao Pai — está "com" o Pai em comunhão eterna e perfeita.

A terceira cláusula — "o Verbo era Deus" — declara a unidade de essência. A construção gramatical grega é significativa: *theos ēn ho logos*, com *theos* no nominativo absoluto (sem artigo definido), indicando predicado qualitativo. O Verbo não é "um deus" (seria *theos ēn*), nem "o Deus" (seria *ho theos ēn*), mas "era Deus" — possuindo toda a plenitude da divindade. Gramáticos como Daniel Wallace (Greek Grammar Beyond the Basics, 1996) confirmam que essa construção declara plena divindade sem qualquer qualificação.

### A participação na criação

"Nele estava a vida, e a vida era a luz dos homens" (João 1:4). O Logos não é apenas eterno — é o autor e sustentador de toda a existência. João 1:3 declara explicitamente: "Todas as coisas foram feitas por meio dele, e nada do que foi feito foi feito sem ele." Essa afirmação é radical: não existe nada na criação que não tenha tido origem no Verbo. A negativa dupla — "nada do que foi feito foi feito sem ele" — enfatiza a universalidade do ato criador.

Colossenses 1:15-17 confirma essa verdade: "Ele é a imagem do Deus invisível, o primogênito de toda a criação, porque nele foram criadas todas as coisas." Filipenses 2:5-8 complementa ao descrever o vazio que o Verbo deixou ao se encarnar: "Aniquilou a si mesmo, tomando a forma de servo, fazendo-se semelhante aos homens." A criação e a encarnação são dois momentos de uma mesma realidade: o Verbo dá existência a tudo e depois assume a existência que deu.

### A rejeição e a graça

O Prólogo joanine introduz também o tema da rejeição: "Veio para o que era seu, e os seus não o receberam" (João 1:11). A humanidade, que deveria reconhecer o seu Criador, preferiu as trevas. Essa rejeição não é um acidente da história — faz parte do drama cósmico da queda e da redenção. A graça divina se manifesta mesmo na incredulidade humana.

No entanto, a soberania de Deus não é frustrada: "A todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus" (João 1:12). A recepção de Cristo é o meio pelo qual o ser humano recupera sua identidade filial. A fé não é um mérito humano — é o canal da graça divina. A palavra grega *exousia* (poder, autoridade) indica que a filiação divina não é uma conquista humana, mas um dom soberano. Como explicou João Calvino em seu Comentário ao Evangelho de João (1553), "não é por origem natural nem por esforço humano que somos filhos de Deus, mas por pura bondade do Pai celestial, que nos adota pela fé em Cristo."

### A encarnação: Eskēnōsen — Deus plantou Sua tenda

"E o Verbo se fez carne e habitou entre nós, cheio de graça e de verdade" (João 1:14). A palavra grega *eskēnōsen* significa literalmente "plantou sua tenda", ecoando o tabernáculo do deserto onde a glória de Deus (*doxa*) habitava entre Israel (Êxodo 25:8-9, 40:34-38). A encarnação não é uma diminuição do Verbo — é uma união hipostática, a coexistência perfeita de duas naturezas em uma pessoa. O Verbo não deixou de ser Deus ao se tornar humano; assumiu a humanidade em si mesmo sem confusão, sem divisão, sem alteração.

O verbo "fez-se carne" (*geneto sarx*) usa o mesmo verbo do relato da criação em Gênesis. A encarnação é, portanto, um novo ato criador — Deus cria novamente, agora não apenas a humanidade em geral, mas a humanidade perfeita em Cristo. Hans Urs von Balthasar (Mysterium Paschale, 1970) observa que a encarnação é o ponto de inflexão da história: o Criador entra na criação para renová-la.

### Graça sobre graça

"Do seu recebemos todos, e graça sobre graça" (João 1:16). A graça de Deus em Jesus não se esgota — é sempre nova, sempre suficiente, sempre abundante. A expressão *charin anti charitos* pode ser traduzida como "graça em troca de graça" — cada experiência da graça de Deus abre espaço para uma nova. É um ciclo de dádiva e recepção que se perpetua na vida do crente.

### O testemunho de João Batista

"Veio um homem mandado por Deus, cujo nome era João. Este veio para testemunho, para que todos crevessem por ele" (João 1:6-7). O testemunho (*martyria*) é um tema joanine fundamental. João Batista não é a luz — é apenas a testemunha da luz. "Não era ele a luz, mas veio para testemunhar da luz" (João 1:8). A humildade do Batista é notável: aponta para Jesus e desaparece. É o modelo de todo testemunho cristão.`,
          versículosChave: [
            { ref: 'João 1:1', texto: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
            { ref: 'João 1:14', texto: 'E o Verbo se fez carne e habitou entre nós, cheio de graça e de verdade.' },
            { ref: 'João 1:12', texto: 'A todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus.' },
            { ref: 'João 1:18', texto: 'Deus, ninguém jamais o viu; o Filho unigênito, que está no seio do Pai, esse o fez conhecido.' },
          ],
        },
      ],
    },
    {
      id: 'joao-mod-3',
      título: 'Os Sinais Messiânicos (Jo 2-12)',
      descrição: 'Sete sinais reveladores — de Caná a Lázaro — cada um com significado teológico profundo',
      ícone: '🪔',
      aulas: [
        {
          id: 'joao-3-1',
          título: 'Os Sinais Messiânicos: De Caná a Lázaro',
          tipo: 'texto',
          duração: '18 min',
          conteúdo: `## Os Sinais Messiânicos: De Caná a Lázaro

O Evangelho de João é estruturado em torno de sete sinais milagrosos de Jesus, cada um escolhido cuidadosamente para revelar um aspecto específico de sua identidade messiânica. João não usa o termo "milagre" (*dynamis*) como os Sinóticos — emprega *sēmeion* (sinal), indicando que cada evento aponta para uma realidade teológica mais profunda. Como observou C.H. Dodd em seu estudo The Interpretation of the Fourth Gospel (1953), os sinais joanine não são meros prodígios; são revelações simbólicas que geram fé.

### 1. O primeiro sinal: Água em vinho (João 2:1-11)

O primeiro sinal ocorreu em Caná da Galileia, durante um casamento. Jesus transformou água em vinho — não qualquer vinho, mas o melhor, guardado até o final. O detalhe das seis talhas de pedra para purificação judaica é significativo: cada uma comportava de 60 a 90 litros, totalizando aproximadamente 400-500 litros de vinho. A abundância não é acidental — aponta para a superabundância da graça messiânica.

Nos profetas do Antigo Testamento, o vinho abundante é sinal da era messiânica: "Naquele dia, brotarão montes de Mosto" (Amós 9:13). A transformação da água em vinho revela que Jesus é o esposo messiânico que traz a alegria nova de Deus. A água da purificação ritual é substituída pelo vinho da graça definitiva. Santo Agostinho (Tractatus in Evangelium Joannis 9.6) vê nesse sinal uma prefiguração da transformação da velha aliança na nova: "A água dos judeus era a lei; o vinho de Cristo é o evangelho."

O versículo programático — "Manifestou a sua glória, e os seus discípulos creu­ram nele" (João 2:11) — estabelece o padrão de todos os sinais: revelação da glória divina → geração de fé.

### 2. A cura do filho do oficial (João 4:46-54)

O segundo sinal é a cura do filho de um funcionário real em Caná da Galileia. Diferente dos outros sinais, este ocorreu à distância — Jesus não estava presente quando o menino sarou. O sinal revela o poder da palavra de Jesus: basta uma declaração para que a cura aconteça. A fé do oficial aumentou quando viu a cura concreta: "o homem creu na palavra que Jesus lhe dissera" (João 4:50).

Jesus o rebateu: "Se não virdes sinais e prodígios, de maneira nenhuma crereis" (João 4:48). A fé que depende de evidências visuais é limitada; a fé que depende da Palavra é genuína. A expressão "funcionário real" (*basilikos*) sugere um empregado do rei Herodes Antipas — alguém da corte. O sinal é universal: alcança tanto judeus quanto gentios.

### 3. A cura do paralítico (João 5:1-15)

O terceiro sinal ocorreu na Piscina de Siloé (*Shiloach*, "enviado") em Jerusalém. Um homem paralítico esperava há 38 anos que alguém o movesse para a água quando um anjo agitava a superfície. Jesus o encontrou em sua doença crônica e perguntou: "Queres ficar sarado?" (João 5:6). A pergunta parece óbvia, mas revela a soberania divina: Deus não age contra a vontade humana.

A cura no sábado (João 5:9) provocou a perseguição religiosa. Jesus respondeu com uma declaração cristológica colossal: "O meu Pai até agora trabalha, e eu também trabalho" (João 5:17). Ao igualar seu trabalho ao do Pai, Jesus fez a afirmação de igualdade divina mais direta do Prólogo até aqui. Como observou Raymond Brown, "não há declaração anterior no NT que iguale mais diretamente a atividade de Jesus à do próprio Deus."

### 4. A multiplicação dos pães (João 6:1-15)

O quarto sinal — a multiplicação de cinco pães e dois peixes para alimentar 5.000 homens — é o único narrado em todos os quatro evangelhos. João o interpreta não como um prodígio de compaixão, mas como preparação para o discurso do Pão da Vida: "Eu sou o pão da vida; quem vem a mim não terá fome" (João 6:35). O sinal gera o discurso, e o discurso revela a verdade.

O contexto da Festa da Páscoa (João 6:4) não é acidental. Jesus é o verdadeiro Cordeiro Pascual, cujo corpo é dado para a vida do mundo. A alusão ao maná do deserto é explícita: "Vossos pais comeram o maná no deserto e morreram" (João 6:49). O maná era temporário; Jesus é o pão eterno. A provocação é deliberada — Jesus está afirmando que Ele é maior que Moisés.

### 5. A caminhada sobre as águas (João 6:16-21)

O quinto sinal é a caminhada de Jesus sobre as águas do mar da Galileia. A tempestade era violenta, os discípulos estavam assustados. Jesus caminhou sobre o mar e disse: "EU SOU, não temais" (João 6:20). A declaração *egō eimi* ecoa a revelação divina de Êxodo 3:14 ("Eu Sou o que Sou") e Isaías 41:10 ("Não temas, porque eu sou contigo").

Esse sinal revela o domínio de Jesus sobre as forças caóticas. Na simbologia judaica, o mar representa o caos primordial, as forças do mal e a separação entre Deus e o homem. Ao caminhar sobre as águas, Jesus demonstra que Ele transcende e controla tudo o que ameaça os seus discípulos. O episódio se assemelha ao Teófano do Antigo Testamento — uma manifestação da presença divina em meio à tempestade.

### 6. A cura do cego de nascença (João 9:1-41)

O sexto sinal é a cura de um homem cego desde o nascimento. A pergunta dos discípulos — "Rabi, quem pecou, este ou seus pais?" (João 9:2) — reflete a teologia retributiva predominante. Jesus a rejeita categoricamente: "Nem ele pecou nem seus pais; mas foi assim para que nele se manifestem as obras de Deus" (João 9:3). A doença não é punição — é oportunidade para a glória de Deus.

A cura se deu em duas etapas: Jesus fez lama com saliva e mandou o cego lavar-se no poço de Siloé. A dupla ação — criação e obediência — simboliza a recriação. O cego não apenas recuperou a visão física — ganhou visão espiritual. A progressão do conhecimento é notável: de curador → profeta → Senhor.

O contraste entre a cegueira física curada e a cegueira espiritual dos fariseus é devastador: "Para juízo vim a este mundo; para que os que não veem vejam, e os que vejam se façam cegos" (João 9:39). A cegueira espiritual é mais perigosa que a física porque se nega a si mesma. Bultmann (Das Evangelium des Johannes, 1941) observa que o sinal é uma alegoria do reconhecimento messiânico em dois estágios: primeiro cura física (fé parcial), depois iluminação espiritual (fé plena).

### 7. A ressurreição de Lázaro (João 11:1-44)

O sétimo e último sinal é o mais dramático: a ressurreição de Lázaro. Jesus recebe a notícia da doença de Lázaro e deliberadamente atrasa-se dois dias: "Esta doença não é para morte, mas para a glória de Deus" (João 11:4). O atraso divino não é negligência — é propósito.

Ao chegar a Betânia, Lázaro já havia morrido havia quatro dias. Marta confessou fé parcial: "Se tu estivesses aqui, não morreria meu irmão" (João 11:21). Jesus expande: "Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá" (João 11:25). A declaração não é sobre um evento futuro — é sobre uma Pessoa presente. A ressurreição não está confinada ao fim dos tempos; está disponível agora, em Cristo.

O versículo mais curto da Bíblia — "Jesus chorou" (João 11:35) — revela a humanidade compassiva do Filho de Deus. O Deus que dá vida é o mesmo que chora com quem perde. A emocionalidade de Jesus não é fraqueza — é encarnação perfeita.

A ressurreição de Lázaro é o clímax dos sinais e o estopim da paixão: "Que faremos, visto que este homem faz muitos sinais?" (João 11:47). Caifás profetizou sem saber: "Convém que morra um homem pelo povo" (João 11:50). A morte de Jesus é o preço da salvação de muitos.

### A progressão dos sinais

Os sete sinais formam uma progressão teológica: do visível (vinho) ao invisível (eternidade); do externo (cura) ao interno (ressurreição). Cada sinal gera uma crise: fé em alguns, incredulidade em outros. O paradoxo é intencional — os sinais não produzem convicção automática; exigem resposta de fé. Como observou Barrett, "os sinais são evidências, mas a evidência por si só não basta — é preciso fé para aceitá-los."`,
          versículosChave: [
            { ref: 'João 2:11', texto: 'Manifestou a sua glória, e os seus discípulos creu­ram nele.' },
            { ref: 'João 6:35', texto: 'Eu sou o pão da vida; quem vem a mim não terá fome.' },
            { ref: 'João 9:39', texto: 'Para juízo vim a este mundo.' },
            { ref: 'João 11:25', texto: 'Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá.' },
          ],
        },
      ],
    },
    {
      id: 'joao-mod-4',
      título: 'Os Discursos de Jesus',
      descrição: 'As declarações "Eu sou" — Pão da Vida, Luz do Mundo, Bom Pastor, Videira Verdadeira',
      ícone: '🌾',
      aulas: [
        {
          id: 'joao-4-1',
          título: 'Os Discursos de Jesus: As declarações "Eu sou"',
          tipo: 'texto',
          duração: '18 min',
          conteúdo: `## Os Discursos de Jesus: As declarações "Eu sou"

No Evangelho de João, Jesus faz sete declarações solenes introduzidas pela fórmula "Eu sou" (*egō eimi* em grego). Essas afirmações não são meras metáforas — são revelações deliberadas da identidade divina de Cristo. Cada uma delas está enraizada no Antigo Testamento e aponta para a plenitude da obra messiânica. A fórmula *egō eimi* ecoa a revelação de Deus a Moisés em Êxodo 3:14, e sua repetição no evangelho joanine constitui uma das declarações cristológicas mais altas do Novo Testamento.

### 1. Eu sou o Pão da Vida (João 6:35)

"Eu sou o pão da vida; quem vem a mim não terá fome, e quem crer em mim nunca terá sede" (João 6:35). Essa declaração foi proferida no dia seguinte à multiplicação dos pães, quando a multidão O procurava por causa do pão material. Jesus redireciona a busca: o verdadeiro alimento não é o que satisfaz o estômago, mas o que sustenta a alma.

A alusão ao maná do deserto (Êxodo 16) é explícita: "Vossos pais comeram o maná no deserto e morreram" (João 6:49). O maná era temporário — durava apenas um dia. Jesus é o pão que desceu do céu e dá vida eterna. A declaração é escandalosa porque implica que Jesus é maior que Moisés, maior que a tradição patriarcal, maior que tudo o que Israel considerava sagrado. A fé é o meio pelo qual recebemos esse alimento: "A obra de Deus é que creiais naquele que ele enviou" (João 6:29).

### 2. Eu sou a Luz do Mundo (João 8:12)

"Eu sou a luz do mundo; quem me segue não andará em trevas, mas terá a luz da vida" (João 8:12). Jesus declara isso durante a Festa dos Tabernáculos, quando grandes candelabros (*menorot*) iluminavam o Templo, lembrando a coluna de fogo que guiava Israel no deserto. No contexto da festa, Jesus está afirmando que Ele é a nova guia de Israel — superior à coluna de fogo, superior ao Templo, superior a toda a revelação anterior.

A declaração contrasta radicalmente com a escuridão espiritual dos líderes religiosos: "A luz resplandece nas trevas, e as trevas não prevaleceram contra ela" (João 1:5). Jesus não é uma luz entre muitas — é a fonte de toda luz espiritual. Sem Ele, a humanidade vagueia em escuridão existencial, incapaz de encontrar o caminho de volta ao Pai. Seguir a Jesus é sinônimo de receber essa luz; a recusa é escolher as trevas.

### 3. Eu sou a Porta (João 10:7, 9)

"Eu sou a porta; se alguém entrar por mim, será salvo" (João 10:9). A imagem do pastor e das ovelhas era familiar na cultura pastoral de Israel. A porta do redil controlava o acesso — todas as ovelhas entravam por um único ponto, e o pastor se deitava na abertura para protegê-las. Jesus declara ser o único caminho de acesso a Deus. Não há múltiplos caminhos, não há alternativas religiosas equivalentes. A exclusividade de Cristo não é arrogância — é a verdade revelada.

A porta também protege: quem entra por Cristo encontra segurança e pastoreio. As ovelhas que tentam pular o muro encontram o lobo. A porta é tanto proteção quanto acesso — uma verdade dupla que equilibra segurança e responsabilidade.

### 4. Eu sou o Bom Pastor (João 10:11, 14)

"Eu sou o bom pastor; o bom pastor dá a sua vida pelas ovelhas" (João 10:11). O contraste é direto: o mercenário foge quando vem o lobo, pois as ovelhas não são dele. O bom pastor conhece cada ovelha pelo nome, assim como o Pai O conhece. A relação é pessoal e recíproca — não impessoal e hierárquica.

A morte do Bom Pastor não é acidental — é voluntária: "Ninguém me tira a vida; eu a dou de mim mesmo. Tenho poder para a dar, e tenho poder para tornar a tomá-la" (João 10:18). O pastor judeu costumava se posicionar entre o rebanho e o perigo; Jesus faz mais — Ele toma o golpe em lugar das ovelhas. A morte de Jesus não é derrota — é sacrifício substitucional.

### 5. Eu sou a Ressurreição e a Vida (João 11:25)

"Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá" (João 11:25). Jesus não disse "eu dou a ressurreição" — disse "eu sou". A ressurreição não é apenas um evento futuro — é uma Pessoa presente. Marta confessou a fé em Israel: "Eu creio que ressuscitarás na ressurreição, no último dia" (João 11:24). Jesus expande: a ressurreição não está confinada ao fim dos tempos — está disponível agora, n'Ele.

A distinção entre "ainda que morra, viverá" e "se viver e crer, não morrerá jamais" abrange tanto a ressurreição futura quanto a vida eterna presente. A fé em Jesus transcende a morte — não é apenas esperança para o futuro, mas vida para o agora.

### 6. Eu sou o Caminho, a Verdade e a Vida (João 14:6)

"Eu sou o caminho, a verdade e a vida; ninguém vem ao Pai, senão por mim" (João 14:6). Três afirmações exclusivas que se complementam. O caminho indica a direção — Jesus é a estrada que leva ao Pai. A verdade revela a realidade — Jesus é a revelação definitiva de Deus. A vida é o destino — Jesus é a entrada na existência eterna. Não é uma das muitas verdades — é A Verdade. Não é um dos muitos caminhos — é O Caminho.

Essa declaração é a mais polêmica no contexto do relativismo pós-moderno. Enquanto outras religiões oferecem caminhos alternativos, Jesus declara exclusividade. Como observou Carson (The Gospel According to John, PNTC, 1991), "a declaração não é intolerância — é convite: há apenas um caminho porque há apenas um Deus, e Ele se revelou em Cristo."

### 7. Eu sou a Videira Verdadeira (João 15:1, 5)

"Eu sou a videira verdadeira, e o meu Pai é o lavrador" (João 15:1). A imagem da videira é ricamente agrícola. Israel era chamada videira no Antigo Testamento (Isaías 5, Salmos 80), mas falhou em produzir fruto: "Esperou que produzisse uvas, mas produziu uvas selvagens" (Isaías 5:4). Jesus é a videira perfeita que cumpre o que Israel não conseguiu.

"Sem mim nada podeis fazer" (João 15:5). A união com Cristo é vital — não meramente jurídica. O ramo não dá fruto por esforço próprio; dá fruto porque está conectado à fonte de vida. A oração, a obediência e o amor são frutos naturais dessa união vital. A videira não se une ao ramo pelo esforço do ramo — a união é obra do lavrador (Deus) que poda e cultiva.

### O padrão dos discursos

Todos os discursos "Eu sou" seguem um padrão: declaração → explicação → aplicação prática. Jesus não afirma títulos abstratos — Ele é. A realidade não é conceitual, é pessoal. Cada "Eu sou" é simultaneamente uma revelação de quem Jesus é e uma proposta de relação. A fé é a resposta ao chamado — não intelectual, mas existencial.

Os discursos também revelam a progressão da revelação cristológica. Do pão (sustento diário) à vida (eternidade), de algo tangível ao absoluto. Cada declaração vai além da anterior, revelando camadas mais profundas da identidade de Cristo. Como observou Raymond Brown, "os discursos 'Eu sou' são as pedras angulares da cristologia joanine — cada um carrega o peso de toda a tradição do Antigo Testamento e aponta para a plenitude da revelação divina em Cristo."`,
          versículosChave: [
            { ref: 'João 6:35', texto: 'Eu sou o pão da vida; quem vem a mim não terá fome.' },
            { ref: 'João 8:12', texto: 'Eu sou a luz do mundo; quem me segue não andará em trevas.' },
            { ref: 'João 10:11', texto: 'Eu sou o bom pastor; o bom pastor dá a sua vida pelas ovelhas.' },
            { ref: 'João 11:25', texto: 'Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá.' },
            { ref: 'João 14:6', texto: 'Eu sou o caminho, a verdade e a vida; ninguém vem ao Pai, senão por mim.' },
            { ref: 'João 15:1', texto: 'Eu sou a videira verdadeira, e o meu Pai é o lavrador.' },
          ],
        },
      ],
    },
    {
      id: 'joao-mod-5',
      título: 'A Ceia e os Discursos de Despedida (Jo 13-17)',
      descrição: 'Lavagem dos pés, Paráclito, oração sacerdotal — o coração joanine',
      ícone: '🫒',
      aulas: [
        {
          id: 'joao-5-1',
          título: 'A Ceia e os Discursos de Despedida (Jo 13-17)',
          tipo: 'texto',
          duração: '18 min',
          conteúdo: `## A Ceia e os Discursos de Despedida (Jo 13-17)

João 13-17 constitui a seção mais íntima e teologicamente densa de todo o Evangelho de João. Enquanto os Sinóticos dedicam poucos versículos à ceia pascal, João expande quase cinco capítulos para os últimos ensinamentos de Jesus antes da Sua paixão. Esse bloco — conhecido como "Discurso de Despedida" ou "Testamento de Jesus" — contém a lavagem dos pés, os discursos sobre o Paráclito, a videira, o amor, e culmina na oração sacerdotal (João 17). Como observou John A.T. Robinson, "João 13-17 é o coração pulsante do quarto Evangelho — aqui encontramos a Jesus mais perto dos seus discípulos e mais profundo em seus ensinamentos."

### A Lavagem dos Pés (João 13:1-17)

A lavagem dos pés é um ato surpreendente. Jesus, o Senhor e Mestre, se levanta da mesa, toma uma toalha e lava os pés dos discípulos — uma tarefa reservada aos escravos mais baixos. A cena é inesperada e provocadora: o Verbo eterno, o Criador do universo, se ajoelha diante de homens comuns.

A teologia da lavagem dos pés opera em três níveis. Em primeiro lugar, é um ato de humilhação voluntária: "Sabendo que o Pai tinha posto tudo nas suas mãos, e que saíra de Deus e ia para Deus, levanta-se da ceia, depõe as suas vestes e, tomando uma toalha, cinge-se com ela" (João 13:3-4). O vazio kenoático (Filipenses 2:6-8) se manifesta em gesto concreto. Em segundo lugar, é uma demonstração de serviço: "Se eu, Senhor e Mestre, vos lavei os pés, também vós deveis lavar uns os pés uns dos outros" (João 13:14). A autoridade se revela no serviço, não na posição. Em terceiro lugar, é uma purificação escatológica: "Se eu não vos lavar, não tereis parte comigo" (João 13:8). Pedro entendeu mal — a lavagem não é apenas exemplo moral; é necessidade espiritual.

A traição de Judas é introduzida com solenidade: "O que ia entregá-lo" (João 13:2). A ironia se mistura com a solenidade: Jesus sabia quem o trairia, mas mesmo assim lavou seus pés. A graça precede a traição.

### O Discurso de Despedida (João 14-16)

Jesus começa o discurso abordando a ansiedade dos discípulos: "Não se turbe o vosso coração; crdes em Deus, também em mim credes" (João 14:1). O imperativo não é emocional — é cognitivo: "deixai de se perturbar". A fé é o antídoto contra a ansiedade existencial.

"Na casa de meu Pai há muitas moradas" (João 14:2). A promessa não é apenas de um lugar — é de preparação pessoal. Jesus não está apenas indo à frente — está preparando um lugar para cada um. A imagem é de hospitalidade oriental: o anfitrião prepara tudo antes de convidar os hóspedes. O verbo *hetoimazō* (preparar) está no tempo presente — o preparo é contínuo e pessoal.

### A Promessa do Paráclito

"Eu rogarei ao Pai, e ele vos dará outro Consolador, para que fique convosco para sempre — o Espírito da verdade" (João 14:16-17). O termo grego *Paraklētos* é riquíssimo em significado. A palavra pode ser traduzida como Consolador (que traz conforto), Defensor (que advoga pela causa), Advogado (que representa em tribunal), ou Intérprete (que explica e ensina). É o mesmo nome dado ao próprio Jesus em 1 João 2:1: "Temos um Advogado junto do Pai, Jesus Cristo, o justo."

O Espírito Santo não é um substituto inferior — é outro da mesma natureza, que habitará nos crentes de forma interna e permanente: "Vós o conheceis, porque habita convosco e estará em vós" (João 14:17). A mudança é extraordinária: antes, Deus habitava no Templo; agora, habita no crente. A encarnação se repete — não em carne humana, mas na vida do crente.

"Mas o Consolador, o Espírito Santo, a quem o Pai enviará em meu nome, esse vos ensinará todas as coisas e vos fará lembrar de tudo o que eu vos disse" (João 14:26). O Espírito é o mestre interior que ilumina as Escrituras, recorda as palavras de Jesus e guia os discípulos em toda a verdade.

### A Videira e os Ramos (João 15:1-17)

"Eu sou a videira verdadeira, e o meu Pai é o lavrador" (João 15:1). A metáfora da videira revela a natureza da relação entre Cristo e os Seus. Não é uma relação de escravidão — é de união vital. O ramo não produz fruto por esforço próprio; produz porque está conectado à fonte de vida.

"Permanecei em mim, e eu permanecerei em vós" (João 15:4). A permanência é mútua e dinâmica. Não é passividade — é dependência ativa, alimentada pela oração, pela obediência e pelo amor. O verbo *menō* (permanecer) é um dos mais importantes do vocabulário joanine — aparece 40 vezes no evangelho. Permanecer em Cristo é a essência da vida cristã.

"Este é o meu mandamento: que vos ameis uns aos outros, assim como eu vos amei" (João 15:12). O amor cristão não é sentimentalismo — é sacrifício voluntário, imitando o modelo de Cristo. "Ninguém tem maior amor do que este: que um dê a vida pelos seus amigos" (João 15:13). O amor se prova na ação, não nas palavras.

### A Obra do Espírito (João 16:5-15)

"Eu vos digo a verdade: É para vosso proveito que eu vá" (João 16:7). Para os discípulos, isso soou como abandono. Mas Jesus explica: a ausência física permite a presença espiritual universal. O Espírito não estará limitado a um lugar — estará em todo crente, em todo tempo, em todo lugar.

"Quando ele vier, convencerá o mundo de pecado, de justiça e de juízo" (João 16:8-9). A obra do Espírito é tripla: convence de pecado (a necessidade de salvação, especialmente em relação à incredulidade), de justiça (a perfeição de Cristo, que vai ao Pai), e de juízo (a condenação do pecado, já julgado na cruz).

"Muitas coisas ainda tenho para vos dizer, mas vós não podeis suportá-las agora. Quando vier o Espírito da verdade, ele vos guiará a toda a verdade" (João 16:12-13). A revelação não terminou com a ascensão de Jesus — continua pelo Espírito, que guia os discípulos ao longo dos séculos.

### A Oração Sacerdotal (João 17)

João 17 é a oração mais longa registrada nas Escrituras — Jesus ora antes da paixão. Ela se divide em três partes: Jesus ora por Si mesmo (vv. 1-5), pelos discípulos (vv. 6-19) e por todos os crentes futuros (vv. 20-26).

"Pai, chegou a hora; glorifica o teu Filho, para que o Filho te glorifique a ti" (João 17:1). A glória pedida não é espetáculo — é a realização do plano eterno de redenção. A glorificação do Filho na cruz é a maior revelação da glória do Pai.

"Não rogo somente por estes, mas também por aqueles que hão de crer em mim pela palavra deles" (João 17:20). Jesus orou por você. Essa oração sacerdotal transcende o tempo — conecta cada crente com a intercessão eterna de Cristo. A unidade dos crentes é testemunho ao mundo: "Para que o mundo creia que me enviaste" (João 17:21).

A oração termina com a pedra angular da teologia joanine: "Eu lhes dei a glória que me deste, para que sejam um, como nós somos um" (João 17:22). A unidade dos crentes reflete a unidade do próprio Deus — é o testemunho supremo da realidade do evangelho. Como observou Schnackenburg (The Gospel According to St John, Vol. 3, 1982), "João 17 é o ponto mais alto da oração joanine — aqui o Verbo eterno se torna intercessor, e a unidade da igreja se enraíza na unidade trinitária."`,
          versículosChave: [
            { ref: 'João 14:16', texto: 'Eu rogarei ao Pai, e ele vos dará outro Consolador.' },
            { ref: 'João 14:26', texto: 'O Espírito Santo vos ensinará todas as coisas e vos fará lembrar de tudo.' },
            { ref: 'João 15:5', texto: 'Sem mim nada podeis fazer.' },
            { ref: 'João 17:20', texto: 'Não rogo somente por estes, mas também por aqueles que hão de crer em mim.' },
          ],
        },
      ],
    },
    {
      id: 'joao-mod-6',
      título: 'A Paixão e Morte (Jo 18-19)',
      descrição: 'Julgamento, crucificação, "Consumado é" — o Rei soberano na cruz',
      ícone: '✝️',
      aulas: [
        {
          id: 'joao-6-1',
          título: 'A Paixão e Morte de Jesus (Jo 18-19)',
          tipo: 'texto',
          duração: '18 min',
          conteúdo: `## A Paixão e Morte de Jesus (Jo 18-19)

João 18-19 narra os eventos que levaram Jesus da oração no Getsêmani à crucificação no Gólgota. Diferente dos outros sinóticos, João apresenta Jesus não como vítima passiva, mas como o Rei soberano que entrega a Sua vida voluntariamente. O julgamento de Jesus diante de Pilatos é um dos trechos mais dramáticos e teologicamente ricos de todo o evangelho.

### A prisão no Getsêmani

João 18:1-11: Jesus e os discípulos atravessaram o ribeiro de Cedrom e entraram num horto. Judas, o traidor, chegou com uma coorte de soldados e servos dos fariseus. "A quem buscais?" — "Jesus Nazareno." — "EU SOU" (João 18:5-6). O nome divino, pronunciado com autoridade, derrubou os soldados no chão. Essa cena é profundamente simbólica: diante do nome revelado a Moisés, toda a força humana cai prostrada. Jesus não precisou usar poder — bastou Sua palavra.

Pedro sacou a espada e cortou a orelha de Malco, servo do sumo sacerdote. Jesus o repreendeu: "Embainha a tua espada! Não haverei de beber o cálice que o Pai me deu?" (João 18:11). A prisão não foi um fracasso — foi a primeira etapa do cumprimento do plano eterno de redenção. O cálice da ira divina estava sendo preparado, e Jesus o beberia até as últimas gotas.

### A negação de Pedro

João 18:15-27: Pedro seguiu Jesus até o pátio do sumo sacerdote. Três vezes negou conhecê-Lo: "Não sou discípulo dele" (João 18:17, 25, 27). O galo cantou. Pedro lembrou das palavras de Jesus: "Antes que o galo cante, tu me hás de negar três vezes" (João 13:38). A negação de Pedro revela a fragilidade humana diante da tentação — mas também a misericórdia divina que restaura.

### Diante de Anás e Caifás

Jesus foi levado primeiro a Anás, sogro de Caifás (João 18:13). Anás interrogou Jesus sobre os Seus discípulos e ensinos. Jesus respondeu com dignidade: "Eu falei abertamente ao mundo; eu sempre ensinei na sinagoga e no templo, onde todos os judeus se reúnem; nada falei às escondidas" (João 18:20). Um dos servos deu um tapa em Jesus: "Assim respondes ao sumo sacerdote?" A paciência de Jesus diante da injustiça é exemplar.

### Diante de Pilatos

A cena diante de Pilatos é o cerne teológico da paixão joanine. Pilatos perguntou: "Tu és o Rei dos Judeus?" (João 18:33). A pergunta é política — mas a resposta de Jesus é transcendente: "O meu reino não é deste mundo. Se o meu reino fosse deste mundo, os meus servos pelejariam para que eu não fosse entregue aos judeus; mas o meu reino não é daqui" (João 18:36).

Pilatos três vezes declarou: "Não acho culpa neste homem" (João 18:38, 19:4, 19:6). A inocência de Jesus foi reconhecida mesmo pelo governador romano. No entanto, a multidão, manipulada pelos líderes religiosos, preferiu Barrabás — um criminoso — ao Salvador do mundo. A escolha entre Jesus e Barrabás é paradigmática: a humanidade sempre escolhe o pecado em vez da salvação.

### As últimas palavras da cruz

João 19 foca em três momentos cruciais. "Mulher, eis o teu filho. Filho, eis a tua mãe" (João 19:26-27). Mesmo na agonia da cruz, Jesus pensou nos outros. A entrega da mãe ao discípulo é um gesto simbólico: a nova família de Deus se forma na cruz, unida não pelo sangue, mas pela fé.

"Tenho sede" (João 19:28). A sede do Criador do universo é um dos paradoxos mais profundos da encarnação. O infinito experimenta a finitude. O eterno suporta o temporal. Isaías 53:3 profetizou: "Desprezado e rejeitado dos homens." A sede é a manifestação física do sofrimento espiritual.

"Está consumado!" (*Tetelestai* — João 19:30). A palavra grega significa "está pago", "está completo", "está perfeito". O verbo *teleoō* está no perfecto indicativo — *tetelestai* — uma forma verbal que indica ação passada com resultados presentes e permanentes. Não é apenas "acabou" — é "está consumado de uma vez por todas, para sempre". A obra da redenção não precisa ser repetida, complementada ou melhorada. Está perfeita.

### A lança e o sangue

"Um dos soldados lhe abriu o lado com uma lança, e logo saiu sangue e água" (João 19:34). O detalhe do sangue e água é teologicamente carregado. A água simboliza purificação e regeneração; o sangue simboliza expiação e redenção. João interpreta isso como testemunho ocular: "E o que o viu dá testemunho, e o seu testemunho é verdadeiro" (João 19:35). A dupla natureza da morte de Cristo é revelada: Ele é o Cordeiro que purifica e o Sacrifício que redime.

### A inscrição na cruz

A inscrição dizia: "Jesus Nazareno, o Rei dos Judeus" (João 19:19). Os sumos sacerdotes protestaram: "Não escrevas: O Rei dos Judeus, mas que ele se disse rei dos Judeus." Pilatos respondeu: "O que escrevi, escrevi" (João 19:22). A ironia é magnífica: o governador romano, sem saber, proclamou a verdade sobre Jesus — Ele é o Rei. A inscrição em três idiomas (hebraico, latim, grego) proclama a universalidade do Seu reino.

### O sepultamento

"Depois disto, José de Arimateia, que era discípulo de Jesus, porém oculto por medo dos judeus, pediu a Pilatos que lhe permitisse tirar o corpo de Jesus" (João 19:38). Nicodemos também ajudou, trazendo uma mistura de mirra e aloes, cerca de trinta quilos. O sepulcro novo de Jesus cumpre a profecia de Isaías 53:9: "Pôs a sua sepultura com os ímpios, mas com o rico haverá a sua sepultura." O Criador do universo recebeu um túmulo emprestado — mas não por muito tempo.`,
          versículosChave: [
            { ref: 'João 18:5-6', texto: 'EU SOU. E, dizendo isto, caíram por terra.' },
            { ref: 'João 18:36', texto: 'O meu reino não é deste mundo.' },
            { ref: 'João 19:22', texto: 'O que escrevi, escrevi.' },
            { ref: 'João 19:30', texto: 'Está consumado!' },
            { ref: 'João 19:34', texto: 'Um dos soldados lhe abriu o lado com uma lança, e logo saiu sangue e água.' },
          ],
        },
      ],
    },
    {
      id: 'joao-mod-7',
      título: 'A Ressurreição (Jo 20-21)',
      descrição: 'Tomé, comissão, restauração de Pedro — as provas e o significado da ressurreição',
      ícone: '🌅',
      aulas: [
        {
          id: 'joao-7-1',
          título: 'A Ressurreição: Provas, Tomé e a Restauração de Pedro',
          tipo: 'texto',
          duração: '18 min',
          conteúdo: `## A Ressurreição: Provas, Tomé e a Restauração de Pedro

João 20-21 narra o evento mais importante da história cristã: a ressurreição de Jesus dos mortos. Diferente dos outros evangelhos, João enfatiza não apenas o fato da ressurreição, mas as suas implicações teológicas e práticas. A narração joanine é cuidadosa, detalhada e profundamente pessoal.

### O túmulo vazio

"Maria Madalena foi ao túmulo de manhã cedo, sendo ainda escuro, e viu que a pedra fora tirada do túmulo" (João 20:1). Maria Madalena correu até Pedro e João: "Levaram o Senhor do túmulo, e não sabemos onde o puseram!" (João 20:2). Pedro e João correram até o túmulo. João chegou primeiro, olhou para dentro, viu os lençóis dobrados e o sudário de cabeça à parte. "Então entrou também o outro discípulo, que chegara primeiro ao túmulo, e viu e creu" (João 20:8). O que João viu? Um túmulo arrumado — não o caos de um roubo. O sudário dobrado separadamente indicava ordem e propósito.

### Maria encontra o Ressuscitado

"Jesus disse-lhe: Maria! E, virando-se ela, disse-lhe: Raboni! (que quer dizer Mestre)" (João 20:16). O reconhecimento veio pelo nome. Jesus a chamou pessoalmente, individualmente. Maria Madalena seria a primeira testemunha da ressurreição — um privilégio extraordinário numa cultura em que o testemunho de mulheres não era aceito nos tribunais. Deus escolheu as marginais para proclamar a notícia mais importante da história.

### Jesus aparece aos discípulos

"E, ditas estas coisas, mostrou-lhes as mãos e o lado. E os discípulos se alegraram, vendo o Senhor" (João 20:20). As marcas da crucificação não desapareceram — elas permanecem como lembretes eternos do sacrifício. O Cristo ressurreto é o mesmo Cristo crucificado.

"Disse-lhes Jesus outra vez: Paz a vós; como o Pai me enviou, também eu vos envio a vós. E, dizendo isto, soprou e disse-lhes: Recebei o Espírito Santo" (João 20:21-22). A comissão é duplicada: como o Pai enviou Jesus, Jesus envia os discípulos. O soprar do Espírito ecoa Gênesis 2:7, quando Deus soprou o fôlego de vida em Adão. Uma nova criação está começando.

### A fé de Tomé

Tomé, um dos doze, não estava presente na primeira aparição. Quando lhe contaram, disse: "Se eu não vir nele as marcas dos cravos, e meter o meu dedo no lugar dos cravos, e meter a minha mão no seu lado, de maneira nenhuma crerei" (João 20:25). Oito dias depois, Jesus apareceu novamente: "Chega aqui o teu dedo e vê as minhas mãos; e chega aqui a tua mão e mete-a no meu lado; e não seas incrédulo, mas crente" (João 20:27).

A resposta de Tomé é a confissão mais alta de toda a Escritura: "Meu Senhor e meu Deus!" (João 20:28). Tomé não disse "Rabi" ou "Messias" — disse "Senhor" (*kurios*, o título grego para YHWH) e "Deus" (*theos*). Nenhuma outra confissão nos evangelhos alcança essa altura teológica.

"Bem-aventurados os que não viram e creram" (João 20:29). Jesus abençoou a fé que não depende de evidências sensoriais — a fé baseada na Palavra. A fé é o meio pelo qual recebemos a salvação.

### A pesca dos 153 peixes

João 21:1-14: Jesus apareceu aos discípulos no mar da Galileia. Pedro, que voltou à pesca, passou a noite sem sucesso. "Lançai a rede à direita do barco, e achareis" (João 21:6). Lançaram e não conseguiam puxar pela quantidade de peixes — 153. João reconheceu: "É o Senhor!" Pedro mergulhou no mar para chegar primeiro.

O número 153 tem gerado muita especulação. Alguns veem simbolismo (153 = soma dos números de 1 a 17); outros veem alusão à profecia de Ezequiel 47:10 (peixes de muitas espécies). Independentemente do significado numérico, o número exato indica que o evento é histórico — um pescador conta seus peixes com precisão.

### A restauração de Pedro

A cena mais emotiva da ressurreição é a restauração de Pedro. Três vezes Jesus perguntou: "Simão, tu me amas?" — uma pergunta para cada negação. Três vezes Pedro respondeu: "Tu sabes que te amo." Três confissões anulam três negações.

"Apaascenta os meus cordeiros... Apascenta as minhas ovelhas... Apascenta as minhas ovelhas" (João 21:15-17). A restauração não é apenas perdão — é missão. Pedro é restabelecido como líder do rebanho. A nuance grega é significativa: na primeira pergunta, Jesus usa *agapaō* (amor sacrificial) e Pedro responde com *phileō* (amor fraternal); na terceira pergunta, Jesus usa *phileō*, descendendo ao nível de Pedro. A restauração é gentil, não coerciva.

"Quando envelheceres, estenderás as tuas mãos, e outro te cingirá e te levará para onde não queres" (João 21:18). Jesus profetizou a morte de Pedro — não para amedrontá-lo, mas para prepará-lo. "Segue-me" (João 21:19). O mesmo chamado do início. O discipulado começa e termina em seguimento.

### O propósito do evangelho

"Mas estas foram escritos para que creiais que Jesus é o Cristo, o Filho de Deus, e para que, crendo, tenhais vida em seu nome" (João 20:31). Todo o evangelho converge para esse objetivo: fé em Jesus como o Cristo, o Filho de Deus, que dá vida eterna. O testemunho do discípulo amado é o ponto culminante: "Este é o discípulo que testifica destas coisas e que as escreveu; e sabemos que o seu testemunho é verdadeiro" (João 21:24). Testemunho ocular — não lenda.

"Há também muitas outras coisas que Jesus fez; se viessem a ser escritas uma por uma, creio que nem no mundo inteiro caberiam os livros" (João 21:25). A riqueza da obra de Cristo é inesgotável. O que temos nos evangelhos é seleção inspirada — o suficiente para a fé, mas nunca exaustivo.`,
          versículosChave: [
            { ref: 'João 20:28', texto: 'Meu Senhor e meu Deus!' },
            { ref: 'João 20:29', texto: 'Bem-aventurados os que não viram e creram.' },
            { ref: 'João 20:31', texto: 'Estas foram escritas para que creiais que Jesus é o Cristo, o Filho de Deus.' },
            { ref: 'João 21:17', texto: 'Senhor, tu sabes tudo; tu bem sabes que te amo.' },
            { ref: 'João 21:19', texto: 'Segue-me.' },
          ],
        },
      ],
    },
    {
      id: 'joao-mod-8',
      título: 'Temas Teológicos de João',
      descrição: 'Vida eterna, verdade, luz/trevas, amor, testemunho — os pilares teológicos do quarto Evangelho',
      ícone: '🔑',
      aulas: [
        {
          id: 'joao-8-1',
          título: 'Temas Teológicos de João',
          tipo: 'texto',
          duração: '18 min',
          conteúdo: `## Temas Teológicos de João

O Evangelho de João é, de todos os livros do Novo Testamento, o mais saturado de teologia sistemática. Cada palavra, cada imagem, cada narrativa é filtrada através de categorias teológicas que formam um todo coerente e profundo. Neste módulo, exploraremos os grandes temas joanine: vida eterna, verdade, luz e trevas, amor, testemunho e a relação entre o alto e o baixo.

### 1. Vida Eterna (Zōē Aiōnios)

O conceito de vida eterna (*zōē aiōnios*) é o fio vermelho de todo o evangelho. A palavra *zōē* (vida) aparece 36 vezes no Evangelho de João — mais que em qualquer outro livro do Novo Testamento. João não define a vida eterna como duração interminável — é qualidade de existência, é conhecimento relacional: "A vida eterna é que te conheçam a ti, o único Deus verdadeiro, e a Jesus Cristo, a quem enviaste" (João 17:3).

A vida eterna começa agora, não apenas no céu. "Quem crê em mim já tem a vida eterna" (João 6:47). O verbo está no tempo presente — a posse é atual. A vida eterna não é uma recompensa futura para quem se comporta bem; é um dom presente para quem crê. É a qualidade de vida divina experimentada na relação com Cristo.

O contraste com a morte espiritual é radical. "Vinde para mim, vós todos que estais cansados e oprimidos, e eu vos aliviarei" (Mateus 11:28). A vida eterna é alívio, descanso, restauração. Não é merely sobrevivência — é florescimento. É a vida que Deus vive, compartilhada com a humanidade através de Cristo.

### 2. Verdade (Alētheia)

A verdade é outro tema dominante. A palavra *alētheia* (verdade) aparece 25 vezes no evangelho — uma proporção sem paralelos no Novo Testamento. "Conhecereis a verdade, e a verdade vos libertará" (João 8:32). A verdade joanine não é uma proposição abstrata — é uma Pessoa: "Eu sou a verdade" (João 14:6).

A verdade joanine contrasta radicalmente com a mentira. "Vós sois do vosso pai o diabo, e quereis satisfazer os desejos de vosso pai" (João 8:44). O diabo é chamado "mentiroso e pai da mentira". A verdade e a mentira formam um dualismo que estrutura toda a ética joanine. Não há neutralidade — ou se está na verdade ou se está na mentira.

A verdade joanine é libertadora. Não é um fardo — é um caminho. Não é uma sentença — é uma promessa. A verdade nos livra da escravidão do pecado, da ignorance, da morte. Como observou Carson, "a verdade de Jesus não é apenas intelectualmente correta — é existencialmente transformadora."

### 3. Luz e Trevas (Phōs skotos)

A dicotomia luz/trevas é uma das mais proeminentes no evangelho joanine. A luz (*phōs*) aparece 23 vezes; as trevas (*skotos*) 7 vezes. O Prólogo joanine estabelece o dualismo: "A luz resplandece nas trevas, e as trevas não prevaleceram contra ela" (João 1:5). A luz vence — mas as trevas resistem.

A luz é associada a Cristo e à vida: "Nele estava a vida, e a vida era a luz dos homens" (João 1:4). As trevas são associadas ao pecado e à morte: "Esta é a condenação: que a luz veio ao mundo, e os homens amaram mais as trevas do que a luz" (João 3:19). O problema não é falta de evidência — é amor pelo pecado.

Esse dualismo não é gnóstico — a carne não é má. A encarnação prova que a matéria pode ser santificada. A luz não rejeita a carne — aassume-a, transforma-a, glorifica-a. O dualismo joanine é ético e existencial, não ontológico.

### 4. Amor (Agapaō)

O amor é o mandamento supremo e a essência do relacionamento com Deus. "Deus é amor" (1 João 4:8) — a declaração mais concisa da teologia joanine. O verbo *agapaō* (amar) é usado 76 vezes no evangelho — uma quantidade extraordinária.

O amor joanine tem três direções. Primeiro, o amor de Deus pelo mundo: "Deus tanto amou o mundo que deu o seu Filho unigênito" (João 3:16). É um amor sacrificial, universal e iniciativo. Segundo, o amor de Jesus pelos seus: "Eu vos amei, assim como o Pai me amou" (João 15:9). É um amor que se prova na obediência e no sacrifício. Terceiro, o amor mútuo entre os discípulos: "Nisto conhecerão que sois meus discípulos, se tiverdes amor uns pelos outros" (João 13:35).

O amor joanine não é sentimentalismo — é ação. "Ninguém tem maior amor do que este: que um dê a vida pelos seus amigos" (João 15:13). O amor se prova no sacrifício, não nas palavras. A cruz é a manifestação suprema do amor divino.

### 5. Testemunho (Martyria)

O testemunho é um tema único no evangelho joanine. A palavra *martyria* (testemunho) aparece 14 vezes — mais que em qualquer outro livro do Novo Testamento. João opera com uma teologia tripla de testemunho: "Três são os que testificam no céu: o Pai, a Palavra e o Espírito Santo; e estes três são um. E três são os que testificam na terra: o Espírito, a água e o sangue; e estes três concordam" (1 João 5:7-8).

O testemunho joanine é múltiplo. João Batista testifica de Jesus (João 1:6-8, 15, 19-34). Os sinais testificam da identidade de Jesus (João 5:31-47). O Pai testifica do Filho (João 5:32, 37). As Escrituras testificam (João 5:39). O Espírito testifica (João 15:26). O testemunho é acumulativo — não depende de uma única fonte, mas de muitas convergindo para a mesma conclusão.

### 6. A Relação entre o Alto e o Baixo

O evangelho joanine opera com um dualismo vertical: o alto e o baixo, o céu e a terra, o divino e o humano. Jesus veio "do alto" (3:13, 6:62) e vai "para o alto" (20:17). A encarnação é a descida do alto ao baixo; a ascensão é a retorno do baixo ao alto.

Esse dualismo vertical não é gnóstico — não despreza o mundo. A carne de Jesus é real e necessária para a salvação. A água, o sangue, o pão e o vinho são sinais visíveis de realidades invisíveis. O dualismo joanine é uma forma de comunicar a transcendência de Deus dentro da imanência da experiência humana.

### 7. Conhecer a Deus

O conhecimento joanine não é intelectual — é relacional. "A vida eterna é que te conheçam a ti" (João 17:3). O verbo *ginōskō* (conhecer) implica experiência pessoal, não apenas informação. É o conhecimento que transforma, que muda, que regenera.

Jesus é o revelador do Pai: "Quem me vê vê o Pai" (João 14:9). A revelação não é abstrata — é encarnada. Não se conhece Deus por raciocínio filosófico ou meditação mística — se conhece Deus através de Jesus Cristo. Essa é a pedra angular do cristianismo joanine: a revelação é pessoal, concreta, histórica.

### Aplicação prática

Esses temas não são meramente acadêmicos — são transformadores. A vida eterna nos convida a viver em plenitude agora. A verdade nos liberta da escravidão. A luz nos guia na escuridão. O amor nos transforma em servos. O testemunho nos torna testemunhas. O conhecimento de Deus nos torna filhos. Que esses temas joanine sejam não apenas estudados, mas vividos.`,
          versículosChave: [
            { ref: 'João 17:3', texto: 'A vida eterna é que te conheçam a ti, o único Deus verdadeiro, e a Jesus Cristo, a quem enviaste.' },
            { ref: 'João 8:32', texto: 'Conhecereis a verdade, e a verdade vos libertará.' },
            { ref: 'João 1:5', texto: 'A luz resplandece nas trevas, e as trevas não prevaleceram contra ela.' },
            { ref: 'João 3:16', texto: 'Deus tanto amou o mundo que deu o seu Filho unigênito.' },
            { ref: 'João 13:35', texto: 'Nisto conhecerão que sois meus discípulos, se tiverdes amor uns pelos outros.' },
          ],
        },
      ],
    },
    {
      id: 'joao-mod-9',
      título: 'João e os Sinóticos',
      descrição: 'Comparação com Mateus, Marcos e Lucas — complementaridade e singularidade do quarto Evangelho',
      ícone: '⚖️',
      aulas: [
        {
          id: 'joao-9-1',
          título: 'João e os Sinóticos: Complementaridade e Singularidade',
          tipo: 'texto',
          duração: '18 min',
          conteúdo: `## João e os Sinóticos: Complementaridade e Singularidade

A relação entre o Evangelho de João e os Evangelhos Sinóticos (Mateus, Marcos e Lucas) é um dos temas mais estudados e debatidos na scholarship neotestamentária. João difere dos Sinóticos em estrutura, linguagem, cronologia, teologia e seleção de material. No entanto, as diferenças não indicam contradição — indicam complementaridade. Como observou D.A. Carson, "ler apenas um evangelho é como olhar o mundo por um único olho — a visão é plana. Ler os quatro é ter visão binocular — tridimensional."

### As diferenças estruturais

A diferença mais evidente é estrutural. Mateus, Marcos e Lucas compartilham uma estrutura narrativa semelhante: ministério na Galileia → viagem a Jerusalém → paixão e ressurreição. João rompe esse esquema. A maior parte do ministério de Jesus em João se passa em Jerusalém e na Judéia, não na Galileia. As festas judaicas (Páscoa, Tabernáculos, Dedicacao) substituem a sequência cronológica dos Sinóticos.

A cronologia é significativa. Enquanto os Sinóticos apresentam um ministério de aproximadamente um ano, João registra três ou quatro Páscoas, sugerindo um ministério de três anos. Essa divergência gerou debates intensos. John A.T. Robinson (Redating the New Testament, 1976) argumenta que a cronologia joanine é historicamente confiável, enquanto Bultmann a considera uma construção teológica.

### O conteúdo exclusivo de João

Cerca de 90% do material joanine é exclusivo — não aparece nos Sinóticos. Os discursos extensos de Jesus (3:1-21, 4:1-42, 6:35-59, 8:12-59, 10:1-18, 14:1-16:33, 17:1-26) não têm paralelo sinótico. Os sinais de Caná (2:1-11), a cura do filho do oficial (4:46-54), a caminhada sobre as águas (6:16-21) e a ressurreição de Lázaro (11:1-44) são exclusivos de João.

Por outro lado, João omite eventos centrais nos Sinóticos: a genealogia, o nascimento virginal, o batismo de Jesus, a tentação no deserto, a transfiguração, a instituição da Ceia, a oração no Getsêmani, a agonia na cruz, a escuridão sobre a terra, a Ascensão e a parábola do semeador.

### O "quarto Evangelho" como suplemento

A tradição da igreja primitiva tratou João como um evangelho complementar, não concorrente. Irineu de Lyon (Adversus Haereses 3.11.8, c. 180 d.C.) escreveu: "João, o discípulo do Senhor, que também se reclinou no peito de Jesus, publicou um evangelho durante sua permanência em Éfeso, na Ásia." A comunidade joanine em Éfeso já possuía os três evangelhos sinóticos — João escreveu para complementá-los, não para substituí-los.

A relação é como a de um mosaico: cada evangelho apresenta um ângulo diferente da mesma realidade. Mateus apresenta Jesus como o Messias de Israel. Marcos como o Servo sofredor. Lucas como o Salvador universal. João como o Logos eterno que se fez carne. Não são quatro versões da mesma história — são quatro meditações teológicas sobre o mesmo evento.

### A cronologia joanine e a Páscoa

Uma das divergências mais debatidas é a cronologia da paixão. Nos Sinóticos, a Última Ceia é a ceia pascal (15 de Nisan), e Jesus é crucificado no dia seguinte (15 de Nisan). Em João, a crucificação ocorre no dia 14 de Nisan, quando os cordeiros pascalinos eram abatidos no Templo.

Estudiosos como Harold Hoehner (Chronological Aspects of the Life of Christ, 1977) argumentam que a cronologia joanine é historicamente precisa: Jesus celebrou a ceia na noite do 13 de Nisan (uma ceia antecipada) e foi crucificado no 14 de Nisan, cumprindo simbolicamente o tipo do Cordeiro Pascual. Outros, como Colin Brown, preferem ver a divergência como reflexo de tradições distintas.

### A cristologia dos Sinóticos vs. João

A cristologia joanine é mais elevada e explícita que a sinótica. Enquanto os Sinóticos transmitem a identidade divina de Jesus implicitamente (através de narrativas, milagres e títulos), João a declara explicitamente. O Prólogo (1:1-18) é o texto cristológico mais alto do Novo Testamento. As declarações "Eu sou" não têm paralelo nos Sinóticos.

No entanto, a cristologia sinótica não é inferior — é diferente. Marcos registra a confissão de Pedro ("Tu és o Cristo", Marcos 8:29) e a história do servo sofredor. Mateus enfatiza as profecias cumpridas e o ensino ético. Lucas destacam a universalidade da salvação e o role do Espírito Santo. Cada evangelho contribui algo único para a retrato de Cristo.

### As paralelos e divergências específicas

A[resurreição de Lázaro (João 11) não tem paralelo nos Sinóticos, mas a ressurreição da filha de Jairo (Mateus 9:18-26, Marcos 5:21-43, Lucas 8:40-56) e a cura do servo do centurião (Mateus 8:5-13, Lucas 7:1-10) exploram temas similares de fé e poder sobre a morte.

A lavagem dos pés (João 13:1-17) substitui a instituição da Ceia nos Sinóticos. Enquanto os Sinóticos celebram a Eucaristia, João celebra o serviço humilde. Ambos apontam para o sacrifício de Cristo, mas por ângulos diferentes.

A oração no Getsêmani (Mateus 26:36-46, Marcos 14:32-42, Lucas 22:39-46) é substituída pela oração sacerdotal (João 17). Os Sinóticos mostram Jesus em agonía; João mostra Jesus em intercessão. Ambos revelam a humanidade de Cristo, mas por perspectivas complementares.

### A importância da leitura integrada

Ler apenas um evangelho é ter uma visão parcial. A leitura integrada dos quatro evangelhos revela a riqueza e a complexidade da pessoa e obra de Jesus. Cada evangelho ilumina aspectos que os outros deixam na sombra. Como observou Richard Hays (Echoes of Scripture in the Gospels, 2016), "os evangelhos não concorrem — conversam. E na conversa, revelam verdades que nenhum deles sozinho poderia comunicar."

A igreja primitiva reconheceu isso ao canonizar os quatro evangelhos, não apenas um. A diversidade é intencional — é um presente de Deus para a igreja. Que possamos receber esse presente com gratidão e estudar cada evangelho com reverência, reconhecendo que a plenitude da verdade sobre Cristo está distribuída em quatro testemunhas inspiradas.`,
          versículosChave: [
            { ref: 'João 20:31', texto: 'Estas foram escritas para que creiais que Jesus é o Cristo, o Filho de Deus.' },
            { ref: 'Mateus 16:16', texto: 'Tu és o Cristo, o Filho do Deus vivo.' },
            { ref: 'Lucas 24:27', texto: 'E começando por Moisés e por todos os profetas, explicou-lhes o que dele se achava em todas as Escrituras.' },
            { ref: 'João 21:25', texto: 'Há também muitas outras coisas que Jesus fez.' },
          ],
        },
      ],
    },
    {
      id: 'joao-mod-10',
      título: 'Avaliação Final',
      descrição: '12 perguntas que testam conhecimento exegetico real do Evangelho de João',
      ícone: '🏆',
      aulas: [
        {
          id: 'joao-quiz-final',
          título: 'Avaliação Final — João: O Evangelho da Vida Eterna',
          tipo: 'quiz',
          duração: '15 min',
          perguntas: [
            {
              id: 'joao-q1',
              pergunta: 'O termo grego "Logos" no Prólogo de João (1:1) ecoa qual tradição do Antigo Testamento?',
              opções: [
                'A sabedoria personificada de Provérbios 8',
                'O sacrifício do Cordeiro Pascal',
                'A lei dada no Sinai',
                'A profecia de Isaías sobre o Servo Sofredor',
              ],
              respostaCorreta: 0,
              explicação: 'O Logos evoca a Sabedoria personificada de Provérbios 8, que estava ao lado de Deus na criação. João transforma esse conceito: o Logos não é uma abstração — é uma Pessoa, o Filho eterno de Deus.',
            },
            {
              id: 'joao-q2',
              pergunta: 'A construção grega "theos ēn ho logos" no João 1:1 declara que:',
              opções: [
                'Jesus é um deus menor',
                'O Verbo era idêntico ao Pai em todos os aspectos',
                'O Verbo possuía plena divindade, sem qualificação',
                'O Verbo era apenas divino em sentido figurado',
              ],
              respostaCorreta: 2,
              explicação: 'A construção *theos ēn ho logos*, com *theos* no nominativo absoluto (sem artigo definido), indica predicado qualitativo — o Verbo possuía toda a plenitude da divindade. Gramáticos como Daniel Wallace confirmam essa interpretação.',
            },
            {
              id: 'joao-q3',
              pergunta: 'Qual palavra grega João usa para "encarnação" no versículo 1:14, e qual sua conexão com o Antigo Testamento?',
              opções: [
                'Dynamis — poder sobrenatural',
                'Eskēnōsen — plantou sua tenda, ecoando o Tabernáculo',
                'Kyrios — Senhor, ecoando o Tetragrama',
                'Sōtēr — Salvador, ecoando a redenção do Êxodo',
              ],
              respostaCorreta: 1,
              explicação: '*Eskēnōsen* significa literalmente "plantou sua tenda", ecoando o tabernáculo do deserto onde a glória de Deus (*doxa*) habitava entre Israel. A encarnação é o novo Tabernáculo: Deus conosco.',
            },
            {
              id: 'joao-q4',
              pergunta: 'O primeiro sinal de Jesus (água em vinho, João 2:1-11) revela que Ele é:',
              opções: [
                'O novo Moisés que liberta Israel',
                'O esposo messiânico que traz a alegria da era nova',
                'O sumo sacerdote que purifica o Templo',
                'O profeta queMultiplica alimentos',
              ],
              respostaCorreta: 1,
              explicação: 'A abundância de vinho (400-500 litros) alude às profecias messiânicas de vinho abundante (Amós 9:13). Jesus é o esposo messiânico que substitui a água da purificação ritual pelo vinho da graça definitiva.',
            },
            {
              id: 'joao-q5',
              pergunta: 'Na discussão com Nicodemos, Jesus usa a serpente de bronze (Números 21) como tipo de qual realidade?',
              opções: [
                'A necessidade de arrependimento nacional de Israel',
                'O julgamento final sobre os pecadores',
                'A necessidade do Filho do Homem ser "levantado" para salvação',
                'A vitória de Israel sobre os cananeus',
              ],
              respostaCorreta: 2,
              explicação: 'Assim como Moisés levantou a serpente no deserto para que quem olhasse vivesse, Jesus seria "levantado" na cruz para que quem crê tenha vida eterna. O tipo aponta para a morte substitucional de Cristo.',
            },
            {
              id: 'joao-q6',
              pergunta: 'Na mulher samaritana (João 4), Jesus declara "Eu o sou" (4:26). O que essa declaração significa no contexto joanine?',
              opções: [
                'Uma confirmação genérica de que Ele é profeta',
                'Uma declaração messiânica explícita usando o nome divino',
                'Uma identificação como anjo encarnado',
                'Uma afirmação de que Ele é igual a Moisés',
              ],
              respostaCorreta: 1,
              explicação: 'O *egō eimi* de João 4:26 é uma das declarações messiânicas mais diretas de Jesus. No contexto joanine, essa fórmula ecoa o nome divino de Êxodo 3:14 e antecipa as declarações "Eu sou" dos capítulos 6-15.',
            },
            {
              id: 'joao-q7',
              pergunta: 'No discurso do Pão da Vida (João 6), por que Jesus diz "se não comerdes a carne do Filho do Homem e não beberdes o seu sangue, não tereis vida"?',
              opções: [
                'Institui a Eucaristia como sacramento obrigatório',
                'Enfatiza a necessidade de fé total em Sua pessoa e obra sacrificais',
                'Comanda o canibalismo ritual como prática religiosa',
                'Declara que a salvação depende de obras humanas',
              ],
              respostaCorreta: 1,
              explicação: 'A linguagem é figurativa e escandalosa. "Comer a carne" e "beber o sangue" significa apropriar-se de Cristo por fé — receber Sua pessoa e Sua obra de forma total e pessoal. Muitos se afastaram porque não entenderam o sentido figurado.',
            },
            {
              id: 'joao-q8',
              pergunta: 'Na cura do cego de nascença (João 9), Jesus diz "Para juízo vim a este mundo" (9:39). O que isso significa?',
              opções: [
                'Jesus veio apenas para condenar os pecadores',
                'A cura é simultaneamente revelação: a fé ilumina, a incredulidade cega',
                'A cegueira física é pior que a cegueira espiritual',
                'Os fariseus foram condenados antes da cruz',
              ],
              respostaCorreta: 1,
              explicação: 'Jesus veio para julgamento no sentido de que Sua presença separa: os que creem recebem luz, os que rejeitam são cegados ainda mais. A mesma luz que revela condena quem a rejeita.',
            },
            {
              id: 'joao-q9',
              pergunta: 'O termo grego "Paraklētos" (João 14:16) pode ser traduzido como Consolador, Defensor ou Advogado. Qual a relevância desse título para a pneumatologia joanine?',
              opções: [
                'O Espírito Santo é apenas uma força impessoal',
                'O Espírito é outro da mesma natureza de Jesus, que advoga, ensina e consola internamente',
                'O Espírito Santo substitui Jesus de forma inferior',
                'O Paráclito é apenas um título profético do Antigo Testamento',
              ],
              respostaCorreta: 1,
              explicação: 'Paraklētos é o mesmo nome dado a Jesus em 1 João 2:1. O Espírito não é um substituto inferior — é outro da mesma natureza (*allos*, não *heteros*), que habita nos crentes de forma interna e permanente.',
            },
            {
              id: 'joao-q10',
              pergunta: 'Na oração sacerdotal (João 17:20), Jesus ora "por aqueles que hão de crer em mim". O que isso revela sobre a intercessão de Cristo?',
              opções: [
                'Jesus orou apenas pelos doze apóstolos',
                'A oração sacerdotal transcende o tempo — cada crente é objeto da intercessão eterna de Cristo',
                'A oração foi dirigida apenas à comunidade joanine do século I',
                'A intercessão de Cristo é limitada aos judeus-cristãos',
              ],
              respostaCorreta: 1,
              explicação: 'A oração de João 17 é o mais claro exemplo de intercessão sacerdotal de Cristo. Ao orar por "aqueles que hão de crer", Jesus conecta cada crente de todos os tempos com Sua mediação eterna diante do Pai.',
            },
            {
              id: 'joao-q11',
              pergunta: 'No contexto da paixão joanine, a palavra grega "Tetelestai" (19:30) é significativa porque:',
              opções: [
                'Indica que Jesus desistiu na cruz',
                'É um verbo no perfecto que indica ação completada com resultados permanentes — a obra da salvação está consumada',
                'Significa apenas "acabou" sem implicações teológicas',
                'É uma referência à destruição do Templo em 70 d.C.',
              ],
              respostaCorreta: 1,
              explicação: '*Tetelestai* (perfecto indicativo de *teleoō*) indica ação passada com resultados presentes e permanentes. A obra da redenção não precisa ser repetida — está consumada de uma vez por todas.',
            },
            {
              id: 'joao-q12',
              pergunta: 'A restauração de Pedro (João 21:15-17) usa nuances gregas diferentes entre *agapaō* e *phileō*. O que isso revela?',
              opções: [
                'Jesus e Pedro não falavam a mesma língua',
                'Jesus desce ao nível de Pedro: primeiro pede amor sacrificial, depois aceita amor fraternal como base para o ministério',
                'A distinção é irrelevante para o significado do texto',
                'Pedro nega amar Jesus na terceira pergunta',
              ],
              respostaCorreta: 1,
              explicação: 'Jesus usa *agapaō* (amor sacrificial) nas duas primeiras perguntas; Pedro responde com *phileō* (amor fraternal). Na terceira, Jesus usa *phileō*, descendo ao nível de Pedro. A restauração é gentil — aceita o que Pedro pode oferecer e o transforma em missão.',
            },
          ],
        },
      ],
    },
  ],
};
