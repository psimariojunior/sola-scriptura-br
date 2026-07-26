import type { Curso } from './cursos';

export const CURSO_JOAO: Curso = {
  id: 'joao-verbo',
  título: 'João — O Verbo Encarnado',
  descrição: 'Um estudo profundo do Evangelho de João — o mais teológico dos quatro. Descubra quem Jesus é: o Verbo eterno que se fez carne, a Palavra de Deus encarnada, o Caminho, a Verdade e a Vida.',
  instrutor: 'Sola Scriptura',
  duração: '6 semanas',
  nível: 'intermediário',
  categoria: 'Novo Testamento',
  certificado: true,
  módulos: [
    {
      id: 'joao-mod-1',
      título: 'O Verbo e os Sinais',
      descrição: 'João 1-6: O prólogo, os primeiros discípulos e os sinais messiânicos',
      ícone: '✝️',
      aulas: [
        {
          id: 'joao-1-1',
          título: 'O Prólogo: No princípio era o Verbo',
          tipo: 'video',
          duração: '18 min',
          videoUrl: 'https://www.youtube.com/watch?v=G-POQCEqFXk',
          videoTítulo: 'Evangelho de João — Introdução | BibleProject Português',
          conteúdo: `## O Prólogo: No princípio era o Verbo

João 1:1-18 é um dos textos mais profundos de toda a Bíblia. O prólogo do Evangelho de João não começa com uma genealogia (como Mateus) nem com o nascimento (como Lucas) — começa antes da criação: "No princípio era o Verbo."

### "No princípio era o Verbo"

As primeiras palavras de João ecoam Gênesis 1:1: "No princípio, Deus criou os céus e a terra." João está nos dizendo que Jesus existia antes de tudo — Ele é eterno.

O termo grego *Logos* (Verbo) é extraordinariamente rico:
- **Palavra** — comunicação, revelação
- **Razão** — inteligência, propósito
- **Princípio** — origem, fundamento

Para os judeus, *Logos* evocava a sabedoria personificada de Provérbios 8. Para os gregos, era o princípio racional do universo. João usa um termo que ambas as culturas reconhecem, mas o preenche com significado cristão: o *Logos* é uma Pessoa.

### As afirmações sobre o Verbo

João faz sete afirmações sobre o Verbo nos primeiros versículos:

1. **"No princípio era o Verbo"** — eternidade
2. **"O Verbo estava com Deus"** — relacionamento (não é o mesmo que Deus Pai)
3. **"O Verbo era Deus"** — divindade plena
4. **"Todas as coisas foram feitas por ele"** — criador
5. **"Nele havia vida"** — fonte da vida
6. **"A vida era a luz dos homens"** — revelador
7. **"O Verbo se fez carne"** — encarnação

### "E o Verbo se fez carne"

"E o Verbo se fez carne e habitou entre nós, cheio de graça e de verdade" (João 1:14). O infinito se tornou finito. O eterno entrou no tempo. O Criador se tornou criatura.

A palavra grega *eskēnōsen* ("habitou") significa literalmente "armou sua tenda". É a mesma palavra usada na Septuaginta para o Tabernáculo. Jesus é o novo Tabernáculo: Deus conosco.

### A rejeição e a recepção

"Veio para o que era seu, e os seus não o receberam" (João 1:11). Mas "a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus" (João 1:12). A fé é o meio — receber Jesus é nascer de Deus.

### Graça sobre graça

"Do seu recebemos todos, e graça sobre graça" (João 1:16). A graça de Deus em Jesus não se esgota — é sempre nova, sempre suficiente, sempre abundante.`,
          versículosChave: [
            { ref: 'João 1:1', texto: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
            { ref: 'João 1:14', texto: 'E o Verbo se fez carne e habitou entre nós.' },
            { ref: 'João 1:12', texto: 'A todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus.' },
          ],
        },
        {
          id: 'joao-1-2',
          título: 'Os primeiros discípulos',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: `## Os primeiros discípulos

João 1:35-51 narra o chamado dos primeiros seguidores de Jesus. Diferente dos outros Evangelhos, João mostra um processo gradual de reconhecimento.

### João Batista aponta o Cordeiro

"Eis o Cordeiro de Deus!" (João 1:36). João Batista não aponta para si mesmo — aponta para Jesus. É o modelo de discipulado: apontar para Cristo.

### André e João: Os primeiros

André e outro discípulo seguiram Jesus. Quando perguntaram: "Rabi, onde moras?", Jesus convidou: "Vinde e vede." André buscou seu irmão Simão: "Achamos o Messias" (João 1:41).

### A mudança de nome

Jesus olhou para Simão e disse: "Tu serás chamado Cefas" (Pedro — "rocha"). Jesus não apenas chama — transforma identidades.

### Filipe e Natanael

Natanael foi cético: "De Nazaré pode sair alguma coisa boa?" Jesus o elogiou: "Eis aqui um verdadeiro israelita, em quem não há dolo" (João 1:47). Natanael confessou: "Rabi, tu és o Filho de Deus; tu és o Rei de Israel" (João 1:49).

Jesus prometeu: "Vereis o céu aberto e os anjos de Deus subindo e descindo sobre o Filho do Homem" (João 1:51). Jesus é a escada entre o céu e a terra.

### O padrão do discipulado

1. Alguém aponta para Jesus
2. Há um encontro pessoal — "Vinde e vede"
3. Há uma confissão — reconhecimento de quem Jesus é
4. Há transformação — mudança de identidade`,
          versículosChave: [
            { ref: 'João 1:36', texto: 'Eis o Cordeiro de Deus!' },
            { ref: 'João 1:41', texto: 'Achamos o Messias.' },
            { ref: 'João 1:49', texto: 'Rabi, tu és o Filho de Deus; tu és o Rei de Israel.' },
          ],
        },
        {
          id: 'joao-1-3',
          título: 'As bodas de Caná: O primeiro sinal',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: `## As bodas de Caná: O primeiro sinal

João 2:1-11 narra o primeiro "sinal" de Jesus. João usa "sinal" em vez de "milagre" — indicando significado teológico.

### O contexto

Havia um casamento em Caná da Galileia. O vinho acabou — vergonha grave na cultura judaica. Maria disse: "Não têm vinho" (João 2:3).

Jesus respondeu: "Ainda não é chegada a minha hora" (João 2:4). Mas Maria instruiu os servos: "Fazei tudo o que ele vos disser" (João 2:5).

### A transformação

Havia seis talhas de pedra para purificação (60-90 litros cada). Jesus mandou enchê-las de água e servir. O mestre-sala provou: "Guardaste até agora o bom vinho!" (João 2:10).

### O significado

- **O vinho novo substitui o velho** — a graça de Cristo substitui os rituais
- **Alegria messiânica** — os profetas descreviam a era messiânica com vinho abundante
- **Abundância** — 400-500 litros de vinho; a graça é superabundante
- **"Manifestou a sua glória"** — e os discípulos creram (João 2:11)

Maria não discutiu. Disse: "Fazei tudo o que ele vos disser." Essa é a postura da fé.`,
          versículosChave: [
            { ref: 'João 2:7', texto: 'Enchei de água estas talhas.' },
            { ref: 'João 2:11', texto: 'Manifestou a sua glória, e os seus discípulos creu­ram nele.' },
            { ref: 'João 2:5', texto: 'Fazei tudo o que ele vos disser.' },
          ],
        },
        {
          id: 'joao-1-4',
          título: 'Nicodemos: Nascer de novo',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## Nicodemos: Nascer de novo

João 3 contém o diálogo entre Jesus e Nicodemos — e o versículo mais conhecido do cristianismo.

### Quem era Nicodemos?

Nicodemos era fariseu e membro do Sinédrio. "Veio ter com Jesus de noite" (João 3:2).

### O diálogo

Jesus cortou direto: "Se alguém não nascer de novo, não pode ver o Reino de Deus" (João 3:3). Nicodemos ficou confuso — pensava em termos físicos.

Jesus explicou: "O que é nascido da carne é carne; e o que é nascido do Espírito é espírito" (João 3:6). O novo nascimento é espiritual, obra do Espírito Santo, necessário e misterioso.

### A serpente de bronze

Jesus conectou com Números 21: "Assim como Moisés levantou a serpente no deserto, assim importa que o Filho do Homem seja levantado" (João 3:14). A serpente era símbolo do pecado — Jesus "se fez pecado" por nós. Quem olha para Cristo é salvo.

### João 3:16 — O coração do evangelho

"Porque Deus tanto amou o mundo que deu o seu Filho unigênido, para que todo o que nele crê não pereça, mas tenha a vida eterna."

- **O amor de Deus** — a motivação
- **O dom do Filho** — o meio
- **A fé** — a resposta
- **A vida eterna** — o resultado

### Luz e trevas

"Esta é a condenação: que a luz veio ao mundo, e os homens amaram mais as trevas do que a luz" (João 3:19). O problema não é falta de evidência — é o amor pelo pecado.`,
          versículosChave: [
            { ref: 'João 3:3', texto: 'Se alguém não nascer de novo, não pode ver o Reino de Deus.' },
            { ref: 'João 3:16', texto: 'Porque Deus tanto amou o mundo que deu o seu Filho unigênito.' },
            { ref: 'João 3:19', texto: 'Os homens amaram mais as trevas do que a luz.' },
          ],
        },
        {
          id: 'joao-1-5',
          título: 'A mulher samaritana',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## A mulher samaritana

João 4 narra um encontro que quebrou barreiras: Jesus conversou com uma mulher samaritana no poço de Jacó.

### O encontro

"Era-lhe forçoso passar por Samaria" (João 4:4). Jesus não evitou Samaria — tinha um encontro marcado por Deus.

A mulher vinha ao meio-dia, sozinha, marginalizada. Jesus pediu água e quebrou três barreiras: étnica, de gênero e social.

### A água viva

"Se tu conheceras o dom de Deus... tu lhe pedirias, e ele te daria água viva" (João 4:10). A água viva satisfaz a sede mais profunda da alma.

### A verdade exposta

Jesus revelou: "Tiveste cinco maridos, e o que agora tens não é teu marido" (João 4:18). A mulher tinha história de fracasso — buscava amor onde não podia encontrá-lo.

### A verdadeira adoração

"Deus é Espírito; e importa que os seus adoradores o adorem em espírito e em verdade" (João 4:24). Revolução teológica: adoração não depende de lugar — depende de coração.

### O Messias revelado

"Eu o sou, eu que falo contigo" (João 4:26). Uma das declarações mais claras de Jesus sobre sua identidade messiânica.

A mulher deixou seu cântaro e foi missionária. Muitos samaritanos creram.`,
          versículosChave: [
            { ref: 'João 4:10', texto: 'Se tu conheceras o dom de Deus.' },
            { ref: 'João 4:24', texto: 'Deus é Espírito; e importa que os seus adoradores o adorem em espírito e em verdade.' },
            { ref: 'João 4:26', texto: 'Eu o sou, eu que falo contigo.' },
          ],
        },
        {
          id: 'joao-1-6',
          título: 'O pão da vida',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## O pão da vida

João 6 contém o Sermão do Pão da Vida. Após multiplicar pães para 5.000 pessoas, Jesus declara ser o Pão que desceu do céu.

### A multiplicação

João 6:1-15: 5.000 homens, cinco pães e dois peixes. Todos comeram e sobrou. Queriam fazer Jesus rei — mas Ele se retirou.

### O discurso

"Trabalhai, não pela comida que perece, mas pela comida que permanece para a vida eterna" (João 6:27). A multidão perguntou: "Que devemos fazer?" Jesus: "A obra de Deus é que creiais naquele que ele enviou" (João 6:29).

### "Eu sou o pão da vida"

"Eu sou o pão da vida; quem vem a mim não terá fome" (João 6:35). Jesus não apenas dá o pão — Ele é o pão.

### O escândalo

"Se não comerdes a carne do Filho do Homem e não beberdes o seu sangue, não tereis vida em vós mesmos" (João 6:53). Muitos se afastaram: "Duro é este discurso" (João 6:60).

### A confissão de Pedro

"Senhor, para quem iremos? Tu tens as palavras da vida eterna" (João 6:68). Pedro não entendeu tudo, mas sabia: não havia alternativa.`,
          versículosChave: [
            { ref: 'João 6:35', texto: 'Eu sou o pão da vida; quem vem a mim não terá fome.' },
            { ref: 'João 6:29', texto: 'A obra de Deus é que creiais naquele que ele enviou.' },
            { ref: 'João 6:68', texto: 'Senhor, para quem iremos? Tu tens as palavras da vida eterna.' },
          ],
        },
      ],
    },
    {
      id: 'joao-mod-2',
      título: 'Os Sinais e as Controvérsias',
      descrição: 'João 7-12: Ensinamentos, conflitos e sinais messiânicos',
      ícone: '👁️',
      aulas: [
        {
          id: 'joao-2-1',
          título: 'A mulher adúltera e a luz do mundo',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: `## A mulher adúltera e a luz do mundo

João 7:53-8:11: a mulher adúltera. João 8:12-30: Jesus como a Luz do Mundo.

### A mulher apanhada em adultério

Os escribas trouxeram uma mulher para testar Jesus. Ele se abaixou e escreveu no chão: "Quem de vós estiver sem pecado seja o primeiro que lhe atire pedra" (João 8:7).

Saíram todos, acusados pela consciência. Jesus: "Nem eu também te condeno; vai e não peças mais" (João 8:11). Graça e verdade: não condena, mas não ignora o pecado.

### A luz do mundo

"Eu sou a luz do mundo; quem me segue não andará em trevas" (João 8:12). Durante a Festa dos Tabernáculos, com candelabros iluminando o Templo, Jesus se declara a verdadeira luz.

### A verdade vos libertará

"Se permanecerdes na minha palavra, verdadeiramente sereis meus discípulos; e conhecereis a verdade, e a verdade vos libertará" (João 8:31-32). A liberdade vem de relacionamento com Jesus.

"Todo aquele que pratica o pecado é escravo do pecado" (João 8:34). A escravidão mais perigosa é espiritual.`,
          versículosChave: [
            { ref: 'João 8:7', texto: 'Quem de vós estiver sem pecado seja o primeiro que lhe atire pedra.' },
            { ref: 'João 8:12', texto: 'Eu sou a luz do mundo.' },
            { ref: 'João 8:32', texto: 'A verdade vos libertará.' },
          ],
        },
        {
          id: 'joao-2-2',
          título: 'O cego de nascença',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: `## O cego de nascença: Ver com novos olhos

João 9: a cura de um homem cego de nascença — uma história sobre luz e trevas.

### A pergunta errada

"Rabi, quem pecou, este ou seus pais?" (João 9:2). Jesus rejeitou: "Nem ele pecou nem seus pais; mas foi assim para que nele se manifestem as obras de Deus" (João 9:3).

### A cura

Jesus fez lama com saliva e mandou lavar no Siloé ("enviado"). O cego obedeceu e voltou vendo. Fé exige ação.

### O interrogatório

Os fariseus discutiam. O cego: "Se este não fosse de Deus, nada podia fazer" (João 9:33). Lógica impecável e irrefutável.

### A expulsão e o encontro

Expulsaram o homem. Jesus foi procurá-lo: "Crês tu no Filho de Deus?" O homem creu e se prostrou.

### A cegueira espiritual

"Para juízo vim a este mundo; para que os que não veem vejam, e os que vejam se façam cegos" (João 9:39). A cegueira mais perigosa é a que se nega a si mesma.`,
          versículosChave: [
            { ref: 'João 9:3', texto: 'Foi assim para que nele se manifestem as obras de Deus.' },
            { ref: 'João 9:25', texto: 'Uma coisa sei: eu era cego e agora vejo.' },
            { ref: 'João 9:39', texto: 'Para juízo vim a este mundo.' },
          ],
        },
        {
          id: 'joao-2-3',
          título: 'O Bom Pastor',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: `## O Bom Pastor

João 10: Jesus é o Bom Pastor — declaração de intimidade, sacrifício e soberania.

### A porta

"Eu sou a porta; se alguém entrar por mim, será salvo" (João 10:9). Jesus é o único acesso ao Reino.

### O Bom Pastor

"Eu sou o bom pastor; o bom pastor dá a sua vida pelas ovelhas" (João 10:11). O pastor conhece suas ovelhas e morre por elas. O mercenário foge.

### O rebanho unificado

"Tenho ainda outras ovelhas que não são deste aprisco" (João 10:16). O plano de Deus sempre foi universal — inclui todas as nações.

### A autoridade

"Ninguém me tira a vida; eu a dou de mim mesmo" (João 10:18). A morte de Jesus é sacrifício voluntário.

### "Eu e o Pai somos um"

"Eu e o Pai somos um" (João 10:30). Unidade de essência, natureza e propósito. Os judeus entenderam: Ele se igualava a Deus.`,
          versículosChave: [
            { ref: 'João 10:11', texto: 'Eu sou o bom pastor; o bom pastor dá a sua vida pelas ovelhas.' },
            { ref: 'João 10:9', texto: 'Eu sou a porta; se alguém entrar por mim, será salvo.' },
            { ref: 'João 10:30', texto: 'Eu e o Pai somos um.' },
          ],
        },
        {
          id: 'joao-2-4',
          título: 'A ressurreição de Lázaro',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## A ressurreição de Lázaro

João 11: o sinal mais dramático — a ressurreição de Lázaro, o clímax dos sinais.

### A doença e o atraso

"Lázaro, o teu amigo, está doente" (João 11:3). Jesus ficou dois dias onde estava. O atraso de Deus não é negligência — é propósito.

### "Eu sou a ressurreição e a vida"

Ao chegar, Marta: "Se tu estivesses aqui, não morreria meu irmão." Jesus: "Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá" (João 11:25).

Jesus não disse "eu dou a ressurreição" — disse "eu sou a ressurreição". A ressurreição é uma Pessoa.

### Jesus chora

"Jesus chorou" (João 11:35). O versículo mais curto da Bíblia é um dos mais profundos: Deus se comove com nossa dor.

### A ressurreição

"Lázaro, vem para fora!" (João 11:43). E Lázaro saiu, envolto em faixas. O poder sobre a morte é o fundamento da nossa fé.

### A decisão de matar Jesus

Caifás profetizou: "Convém que morra um homem pelo povo" (João 11:50). A morte de Lázaro precipitou a decisão de crucificar Jesus.`,
          versículosChave: [
            { ref: 'João 11:25', texto: 'Eu sou a ressurreição e a vida.' },
            { ref: 'João 11:35', texto: 'Jesus chorou.' },
            { ref: 'João 11:43', texto: 'Lázaro, vem para fora!' },
          ],
        },
        {
          id: 'joao-2-5',
          título: 'A unção em Betânia e a entrada triunfal',
          tipo: 'texto',
          duração: '10 min',
          conteúdo: `## A unção em Betânia e a entrada triunfal

João 12: dois eventos que preparam para a Paixão.

### A unção de Maria

Maria ungiu os pés de Jesus com nardo puro — valia um ano de salário. Judas protestou (hipocrisia — era ladrão). Jesus: "Deixa-a; para o dia da minha sepultura o guardou" (João 12:7).

Adoração verdadeira é extravagante — não calcula custos.

### A entrada triunfal

"Hosana! Bendito o que vem em nome do Senhor, o Rei de Israel!" (João 12:13). Jesus montou num jumento — cumprindo Zacarias 9:9. Um rei de paz, não de guerra.

### O grão de trigo

"Se o grão de trigo, caindo na terra, não morrer, fica ele só; mas, se morrer, produz muito fruto" (João 12:24). A morte de Jesus é o caminho para a vida de muitos.`,
          versículosChave: [
            { ref: 'João 12:24', texto: 'Se o grão de trigo, caindo na terra, não morrer, fica ele só.' },
            { ref: 'João 12:13', texto: 'Hosana! Bendito o que vem em nome do Senhor.' },
            { ref: 'João 12:7', texto: 'Deixa-a; para o dia da minha sepultura o guardou.' },
          ],
        },
        {
          id: 'joao-2-6',
          título: 'O discurso de despedida',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## O discurso de despedida

João 14-17: palavras íntimas na noite antes da morte.

### "Eu sou o caminho, a verdade e a vida"

"Eu sou o caminho, a verdade e a vida; ninguém vem ao Pai, senão por mim" (João 14:6). Três afirmações exclusivas — não há alternativa.

### O Consolador

"Eu rogarei ao Pai, e ele vos dará outro Consolador, para que fique convosco para sempre" (João 14:16). O Espírito Santo é outro Consolador, para sempre, o Espírito da verdade.

### A videira verdadeira

"Eu sou a videira verdadeira" (João 15:1). O ramo não pode dar fruto sem permanecer na videira. "Sem mim nada podeis fazer" (João 15:5).

### O amor como mandamento

"Este é o meu mandamento: que vos ameis uns aos outros, assim como eu vos amei" (João 15:12). O amor não é sugestão — é mandamento.

### A oração sacerdotal

João 17: Jesus ora por Si, pelos discípulos e por todos os crentes futuros. "Não rogo somente por estes, mas também por aqueles que hão de crer em mim" (João 17:20). Jesus orou por você.`,
          versículosChave: [
            { ref: 'João 14:6', texto: 'Eu sou o caminho, a verdade e a vida.' },
            { ref: 'João 15:5', texto: 'Sem mim nada podeis fazer.' },
            { ref: 'João 17:20', texto: 'Não rogo somente por estes, mas também por aqueles que hão de crer em mim.' },
          ],
        },
      ],
    },
    {
      id: 'joao-mod-3',
      título: 'A Paixão e a Glória',
      descrição: 'João 18-21: A prisão, julgamento, crucificação, ressurreição e restauração',
      ícone: '👑',
      aulas: [
        {
          id: 'joao-3-1',
          título: 'A prisão e o julgamento',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## A prisão e o julgamento

João 18-19: Jesus não é vítima — é o Rei que entrega Sua vida voluntariamente.

### A prisão

"A quem buscais?" — "Jesus Nazareno." — "EU SOU" (João 18:4-6). O nome divino derrubou os soldados. Jesus entregou-Se voluntariamente.

### Pedro nega

Três vezes: "Não sou discípulo dele" (João 18:17, 25, 27). O galo cantou. Pedro lembrou.

### Diante de Pilatos

"Tu és o Rei dos Judeus?" — "O meu reino não é deste mundo" (João 18:36). Pilatos três vezes: "Não acho culpa neste homem." Mas a multidão exigiu crucificação.

### A crucificação

"Está consumado" (*Tetelestai*) — "está pago", "está completo" (João 19:30). A obra da salvação estava acabada.

A inscrição: "Jesus Nazareno, o Rei dos Judeus." Pilatos: "O que escrevi, escrevi" (João 19:22).`,
          versículosChave: [
            { ref: 'João 18:36', texto: 'O meu reino não é deste mundo.' },
            { ref: 'João 19:30', texto: 'Está consumado.' },
            { ref: 'João 19:22', texto: 'O que escrevi, escrevi.' },
          ],
        },
        {
          id: 'joao-3-2',
          título: 'A ressurreição e a fé de Tomé',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: `## A ressurreição e a fé de Tomé

João 20: o evento mais importante da história — a ressurreição de Jesus.

### O túmulo vazio

Maria Madalena encontrou o túmulo aberto. Pedro e João viram os lençóis dobrados. "João viu e creu" (João 20:8).

### Maria encontra Jesus

Jesus chamou seu nome: "Maria!" Ela: "Raboni!" (João 20:16). Maria seria a primeira testemunha da ressurreição.

### Jesus aparece aos discípulos

"Paz a vós!" (João 20:19). Mostrou as mãos e o lado. Soprou: "Recebei o Espírito Santo" (João 20:22).

### A fé de Tomé

Tomé: "Se eu não vir... de maneira nenhuma crerei." Jesus convidou: "Chega aqui o teu dedo." Tomé: "Meu Senhor e meu Deus!" (João 20:28). A confissão mais profunda.

"Bem-aventurados os que não viram e creram" (João 20:29).

### O propósito

"Estes foram escritos para que creiais que Jesus é o Cristo, o Filho de Deus" (João 20:31).`,
          versículosChave: [
            { ref: 'João 20:28', texto: 'Meu Senhor e meu Deus!' },
            { ref: 'João 20:29', texto: 'Bem-aventurados os que não viram e creram.' },
            { ref: 'João 20:31', texto: 'Estes foram escritos para que creiais que Jesus é o Cristo.' },
          ],
        },
        {
          id: 'joao-3-3',
          título: 'A restauração de Pedro',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: `## A restauração de Pedro

João 21: o último encontro — e a restauração de Pedro.

### A pesca milagrosa

Pescaram a noite inteira e nada. Jesus na praia: "Lançai a rede à direita." 153 peixes. João: "É o Senhor!" Pedro lançou-se ao mar.

### O café da manhã

O Criador do universo servia café a Seus amigos. Intimidade.

### "Simão, tu me amas?"

Três perguntas — uma para cada negação:
1. "Tu me amas?" — "Apascenta os meus cordeiros."
2. "Tu me amas?" — "Apascenta as minhas ovelhas."
3. "Tu me amas?" — "Apascenta as minhas ovelhas."

Três negações, três confissões. Restauração completa.

### "Segue-me"

O mesmo chamado do início. A restauração leva de volta ao discipulado.

"Tu, segue-me" (João 21:22). Cada um tem seu caminho — não comparar.`,
          versículosChave: [
            { ref: 'João 21:17', texto: 'Senhor, tu sabes tudo; tu bem sabes que te amo.' },
            { ref: 'João 21:19', texto: 'Isto disse, significando com que morte havia de glorificar a Deus.' },
            { ref: 'João 21:22', texto: 'Tu, segue-me.' },
          ],
        },
        {
          id: 'joao-3-4',
          título: 'O testemunho do discípulo amado',
          tipo: 'texto',
          duração: '10 min',
          conteúdo: `## O testemunho do discípulo amado

João 21:24-25 encerra o Evangelho com uma nota pessoal.

### O testemunho

"Este é o discípulo que testifica destas coisas e que as escreveu; e sabemos que o seu testemunho é verdadeiro" (João 21:24). Testemunho ocular — não lenda.

### A riqueza inesgotável

"Há também muitas outras coisas que Jesus fez; se viessem a ser escritas uma por uma, creio que nem no mundo inteiro caberiam os livros" (João 21:25).

### O legado

João oferece uma perspectiva independente e profundamente teológica. Cada sinal foi escolhido para gerar fé.

### As sete declarações "Eu sou"

1. Eu sou o pão da vida
2. Eu sou a luz do mundo
3. Eu sou a porta
4. Eu sou o bom pastor
5. Eu sou a ressurreição e a vida
6. Eu sou o caminho, a verdade e a vida
7. Eu sou a videira verdadeira

### O propósito final

"Para que creiais que Jesus é o Cristo, o Filho de Deus e para que, crendo, tenhais vida em seu nome" (João 20:31). O Evangelho de João é um convite: "Vinde e vede."`,
          versículosChave: [
            { ref: 'João 21:25', texto: 'Há também muitas outras coisas que Jesus fez.' },
            { ref: 'João 20:31', texto: 'Estes foram escritos para que creiais.' },
            { ref: 'João 20:21', texto: 'Assim como o Pai me enviou, também eu vos envio a vós.' },
          ],
        },
        {
          id: 'joao-quiz-final',
          título: 'Avaliação Final — João',
          tipo: 'quiz',
          duração: '15 min',
          perguntas: [
            {
              id: 'joao-q1',
              pergunta: 'O que significa "Logos" em João 1:1?',
              opções: ['Lei', 'Verbo / Palavra / Razão', 'Profeta', 'Anjo'],
              respostaCorreta: 1,
              explicação: 'Logos significa "Verbo", "Palavra" ou "Razão". Identifica Jesus como o Verbo eterno de Deus.',
            },
            {
              id: 'joao-q2',
              pergunta: 'O que significa "E o Verbo se fez carne"?',
              opções: ['Jesus deixou de ser Deus', 'Jesus se tornou humano mantendo sua divindade', 'Jesus era apenas humano', 'Jesus era um anjo'],
              respostaCorreta: 1,
              explicação: 'A encarnação: Jesus, sendo Deus eterno, assumiu natureza humana — plenamente Deus e plenamente humano.',
            },
            {
              id: 'joao-q3',
              pergunta: 'Qual foi o primeiro sinal de Jesus no Evangelho de João?',
              opções: ['Cura de um paralítico', 'Água em vinho', 'Multiplicação dos pães', 'Cura de um cego'],
              respostaCorreta: 1,
              explicação: 'O primeiro sinal foi em Caná, onde Jesus transformou água em vinho (João 2:1-11).',
            },
            {
              id: 'joao-q4',
              pergunta: 'O que Jesus disse sobre nascer de novo?',
              opções: ['É opcional', 'É necessário para ver o Reino de Deus', 'Só para judeus', 'Não é mais necessário'],
              respostaCorreta: 1,
              explicação: '"Se alguém não nascer de novo, não pode ver o Reino de Deus" (João 3:3).',
            },
            {
              id: 'joao-q5',
              pergunta: 'Qual é o versículo mais conhecido da Bíblia?',
              opções: ['Gênesis 1:1', 'Salmo 23:1', 'João 3:16', 'Romanos 8:28'],
              respostaCorreta: 2,
              explicação: 'João 3:16: "Porque Deus tanto amou o mundo que deu o seu Filho unigênito..."',
            },
            {
              id: 'joao-q6',
              pergunta: 'O que Jesus declarou em João 10:30?',
              opções: ['O bom pastor', 'A porta', 'Um com o Pai', 'A luz do mundo'],
              respostaCorreta: 2,
              explicação: '"Eu e o Pai somos um" — afirmação explícita de divindade.',
            },
            {
              id: 'joao-q7',
              pergunta: 'Qual foi a confissão de Tomé?',
              opções: ['Tu és o Messias', 'Meu Senhor e meu Deus!', 'Tu és o Filho do Homem', 'Tu és o Profeta'],
              respostaCorreta: 1,
              explicação: '"Meu Senhor e meu Deus!" (João 20:28) — a confissão mais alta sobre Jesus.',
            },
            {
              id: 'joao-q8',
              pergunta: 'Quantas vezes Jesus perguntou a Pedro "Tu me amas?"',
              opções: ['Uma vez', 'Duas vezes', 'Três vezes', 'Quatro vezes'],
              respostaCorreta: 2,
              explicação: 'Três vezes — uma para cada negação. Restauração completa.',
            },
            {
              id: 'joao-q9',
              pergunta: 'O que significa "Tetelestai"?',
              opções: ['Meu Deus, meu Deus', 'Está consumado / Está pago', 'Pai, perdoa-lhes', 'Mulher, eis teu filho'],
              respostaCorreta: 1,
              explicação: '"Tetelestai" significa "está consumado" ou "está pago" — a obra da salvação completada.',
            },
            {
              id: 'joao-q10',
              pergunta: 'Qual é o propósito do Evangelho de João?',
              opções: ['Registrar história', 'Ensinar filosofia', 'Para que creiais que Jesus é o Cristo', 'Condenar pecadores'],
              respostaCorreta: 2,
              explicação: 'João 20:31: "Estes foram escritos para que creiais que Jesus é o Cristo, o Filho de Deus."',
            },
          ],
        },
      ],
    },
  ],
};
