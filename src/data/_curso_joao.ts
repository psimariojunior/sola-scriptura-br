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
    {
      id: 'joao-mod-4',
      título: 'A Teologia de João',
      descrição: 'João 1, 6-10, 14-17: O Verbo eterno, os "Eu sou" e os discursos de despedida — a teologia profunda do quarto Evangelho',
      ícone: '📖',
      aulas: [
        {
          id: 'joao-4-1',
          título: 'O Prólogo joanine: O Verbo eterno que se fez carne',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## O Prólogo joanine: O Verbo eterno que se fez carne

João 1:1-18 constitui um dos textos teológicos mais densos e profundos de toda a Escritura Sagrada. Diferente dos outros evangelhos que começam com a vida terrena de Jesus, João inicia sua narrativa na eternidade, no próprio âmago da pré-existência divina. O prólogo joanine não é meramente uma introdução poética — é uma declaração cristológica que estabelece as bases para todo o restante do evangelho.

### O Verbo (Logos) na eternidade

As primeiras palavras do texto joanine ecoam deliberadamente o início de Gênesis: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus" (João 1:1). A escolha lexical do termo grego *Logos* não é arbitrária. Para o ouvinte judeu, *Logos* evocava a Sabedoria personificada de Provérbios 8, que estava ao lado de Deus na criação e participava ativamente na formação do mundo. Para o ouvinte grego, *Logos* remetia ao princípio racional e ordenador do universo, a força cósmica que dava coerência à realidade visível. João se apropria desse termo carregado de significado em ambas as tradições culturais e o transforma: o *Logos* não é uma abstração filosófica nem uma força impessoal — é uma Pessoa, o Filho eterno de Deus.

As três afirmações do versículo 1.1 formam um triângulo cristológico perfeito. "No princípio era o Verbo" estabelece a eternidade — não "no princípio o Verbo começou a existir", mas "era", com o verbo no tempo imperfeito grego, indicando existência contínua sem início. "O Verbo estava com Deus" declara a distinção de pessoas — o *pros* grego indica relación face a face, intimidade pessoal, não mera proximidade. "O Verbo era Deus" afirma a unidade de essência — não "era um deus", mas *theos ēn ho logos*, com *theos* no nominativo absoluto, indicando plena divindade.

### A participação na criação

"Nele estava a vida, e a vida era a luz dos homens" (João 1:4). O Verbo não é apenas eterno — é o autor e sustentador de toda a existência. João 1:3 declara explicitamente: "Todas as coisas foram feitas por meio dele, e nada do que foi feito foi feito sem ele." Essa afirmação é radical: não existe nada na criação que não tenha tido origem no Verbo. Colossenses 1:15-17 confirma essa verdade: "Ele é a imagem do Deus invisível, o primogênito de toda a criação, porque nele foram criadas todas as coisas que há nos céus e na terra, visíveis e invisíveis." Filipenses 2:5-8 complementa ao descrever o vazio que o Verbo deixou ao se encarnar, esvaziando-se a si mesmo, tomando a forma de servo.

### A rejeição e a graça

O prólogo joanine também introduz o tema da rejeição: "Veio para o que era seu, e os seus não o receberam" (João 1:11). A humanidade, que deveria reconhecer o seu Criador, preferiu as trevas. No entanto, a soberania de Deus não é frustrada pela incredulidade humana: "A todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus" (João 1:12). A recepção de Cristo é o meio pelo qual o ser humano recupera sua identidade filial. A fé não é um mérito humano — é o canal da graça divina.

### A encarnação: O véu da carne

"E o Verbo se fez carne e habitou entre nós, cheio de graça e de verdade" (João 1:14). A palavra grega *eskēnōsen* significa literalmente "plantou sua tenda", ecoando o tabernáculo do deserto onde a glória de Deus habitava entre Israel. A encarnação não é uma diminuição do Verbo — é uma união hipostática, a coexistência perfeita de duas naturezas em uma pessoa. O Verbo não deixou de ser Deus ao se tornar humano; assumiu a humanidade em si mesmo sem confusão, sem divisão, sem alteração. Essa é a base de toda a cristologia ortodoxa e o fundamento da salvação.

"Deus, ninguém jamais o viu; o Filho unigênito, que está no seio do Pai, esse o fez conhecido" (João 1:18). O Prólogo termina onde a revelação começa: o invisível se torna visível no Filho. João não escreveu apenas história — escreveu teologia. O prólogo é a chave que abre todas as portas do seu evangelho.`,
          versículosChave: [
            { ref: 'João 1:1', texto: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
            { ref: 'João 1:14', texto: 'E o Verbo se fez carne e habitou entre nós, cheio de graça e de verdade.' },
            { ref: 'João 1:18', texto: 'Deus, ninguém jamais o viu; o Filho unigênito, que está no seio do Pai, esse o fez conhecido.' },
            { ref: 'Colossenses 1:15-17', texto: 'Ele é a imagem do Deus invisível, o primogênito de toda a criação.' },
            { ref: 'Filipenses 2:5-8', texto: 'Aniquilou a si mesmo, tomando a forma de servo, fazendo-se semelhante aos homens.' },
          ],
        },
        {
          id: 'joao-4-2',
          título: 'Os sete "Eu sou" de Jesus: Revelação da divindade',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## Os sete "Eu sou" de Jesus: Revelação da divindade

No Evangelho de João, Jesus faz sete declarações solenes introduzidas pela fórmula "Eu sou" (*egō eimi* em grego). Essas afirmações não são meras metáforas — são revelações deliberadas da identidade divina de Cristo. Cada uma delas está enraizada no Antigo Testamento e aponta para a plenitude da obra messiânica. O estudo sistemático dessas declarações revela quem Jesus realmente é e o que Ele veio realizar.

### 1. Eu sou o Pão da Vida (João 6:35)

"Eu sou o pão da vida; quem vem a mim não terá fome, e quem crer em mim nunca terá sede" (João 6:35). Essa declaração foi proferida no dia seguinte à multiplicação dos pães, quando a multidão O procurava por causa do pão material. Jesus redireciona a busca: o verdadeiro alimento não é o que satisfaz o estômago, mas o que sustenta a alma. O pão remete ao maná do deserto (Êxodo 16), mas Jesus vai além: o maná alimentava temporariamente e os pais morreram; Ele é o pão que dá vida eterna. "Eu sou o pão vivo que desceu do céu" (João 6:51). A fé em Cristo é a nourritura espiritual que satisfaz a fome mais profunda da alma humana.

### 2. Eu sou a Luz do Mundo (João 8:12)

"Eu sou a luz do mundo; quem me segue não andará em trevas, mas terá a luz da vida" (João 8:12). Jesus declara isso durante a Festa dos Tabernáculos, quando grandes candelabros iluminavam o Templo, lembrando a coluna de fogo que guiava Israel no deserto. A luz é símbolo universal de verdade, pureza e presença divina. "A luz resplandece nas trevas, e as trevas não prevaleceram contra ela" (João 1:5). Jesus não é uma luz entre muitas — é a fonte de toda luz espiritual. Sem Ele, a humanidade vagueia em escuridão existencial, incapaz de encontrar o caminho de volta ao Pai.

### 3. Eu sou a Porta (João 10:7, 9)

"Eu sou a porta; se alguém entrar por mim, será salvo" (João 10:9). A imagem do pastor e das ovelhas era familiar na cultura pastoral de Israel. A porta do redil controlava o acesso — todas as ovelhas entravam por um único ponto. Jesus declara ser o único caminho de acesso a Deus. Não há múltiplos caminhos, não há alternativas religiosas equivalentes. "Ninguém vem ao Pai, senão por mim" (João 14:6). A exclusividade de Cristo não é arrogância — é a verdade revelada. A porta também protege: quem entra por Cristo encontra segurança e pastoreio.

### 4. Eu sou o Bom Pastor (João 10:11, 14)

"Eu sou o bom pastor; o bom pastor dá a sua vida pelas ovelhas" (João 10:11). O contraste é direto: o mercenário foge quando vem o lobo, pois as ovelhas não são dele. Jesus conhece cada ovelha pelo nome, assim como o Pai O conhece. A relação é pessoal e recíproca. A morte do Bom Pastor não é acidental — é voluntária: "Ninguém me tira a vida; eu a dou de mim mesmo. Tenho poder para a dar, e tenho poder para tornar a tomá-la" (João 10:18). O pastor judeu costumava se posicionar entre o rebanho e o perigo; Jesus faz mais — Ele toma o golpe em lugar das ovelhas.

### 5. Eu sou a Ressurreição e a Vida (João 11:25)

"Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá" (João 11:25). Jesus não disse "eu dou a ressurreição" — disse "eu sou". A ressurreição não é apenas um evento futuro — é uma Pessoa presente. Marta confessou a fé em Israel: "Eu creio que ressuscitarás na ressurreição, no último dia." Jesus expande: a ressurreição não está confinada ao fim dos tempos — está disponível agora, n'Ele. Essa declaração foi o prelúdio da ressurreição de Lázaro, o maior sinal do evangelho.

### 6. Eu sou o Caminho, a Verdade e a Vida (João 14:6)

"Eu sou o caminho, a verdade e a vida; ninguém vem ao Pai, senão por mim" (João 14:6). Três afirmações exclusivas que se complementam. O caminho indica a direção; a verdade revela a realidade; a vida é o destino. Não é uma das muitas verdades — é A Verdade. Não é um dos muitos caminhos — é O Caminho. Essa declaração é a mais polêmica no contexto do relativismo pós-moderno, mas continua sendo a afirmação mais clara sobre a exclusividade de Cristo.

### 7. Eu sou a Videira Verdadeira (João 15:1, 5)

"Eu sou a videira verdadeira, e o meu Pai é o lavrador" (João 15:1). A imagem da videira é ricamente agricultural. Israel era chamada videira no AT (Isaías 5, Salmos 80), mas falhou em produzir fruto. Jesus é a videira perfeita que cumpre o que Israel não conseguiu. "Sem mim nada podeis fazer" (João 15:5). A união com Cristo é vital — não meramente jurídica. O ramo não dá fruto por esforço próprio; dá fruto porque está conectado à fonte de vida. A oração, a obediência e o amor são frutos naturais dessa união vital.`,
          versículosChave: [
            { ref: 'João 6:35', texto: 'Eu sou o pão da vida; quem vem a mim não terá fome.' },
            { ref: 'João 8:12', texto: 'Eu sou a luz do mundo; quem me segue não andará em trevas.' },
            { ref: 'João 10:11', texto: 'Eu sou o bom pastor; o bom pastor dá a sua vida pelas ovelhas.' },
            { ref: 'João 11:25', texto: 'Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá.' },
            { ref: 'João 14:6', texto: 'Eu sou o caminho, a verdade e a vida; ninguém vem ao Pai, senão por mim.' },
            { ref: 'João 15:1', texto: 'Eu sou a videira verdadeira, e o meu Pai é o lavrador.' },
          ],
        },
        {
          id: 'joao-4-3',
          título: 'O Discurso de Despedida: João 14-17',
          tipo: 'texto',
          duração: '18 min',
          conteúdo: `## O Discurso de Despedida: João 14-17

João 14-17 contém os últimos ensinamentos de Jesus antes da Sua paixão e morte. São quatro capítulos de intensa intimidade teológica, onde o Verbo Encarnado prepara os Seus discípulos para a Sua ausência física e para a vinda do Espírito Santo. Esse discurso de despedida é considerado por muitos estudiosos como o coração do Evangelho de João e um dos trechos mais profundos de toda a Escritura.

### João 14: A preparação para a ausência

"Não se turbe o vosso coração; crdes em Deus, também em mim credes" (João 14:1). Jesus começa o discurso abordando a ansiedade dos discípulos. Eles estavam perplexos, com medo do que estava por vir. Jesus os convida à fé, não como sentimento, mas como confiança concreta no Seu plano soberano.

"Na casa de meu Pai há muitas moradas; se não fosse assim, eu vos teria dito" (João 14:2). A promessa não é apenas de um lugar — é de preparação pessoal. Jesus não está apenas indo à frente — está preparando um lugar para cada um. A imagem é de hospitalidade oriental: o anfitrião prepara tudo antes de convidar os hóspedes.

A declaração central é "Eu sou o caminho, a verdade e a vida" (João 14:6). Através de Filipe, que pediu "Mostra-nos o Pai", Jesus revela: "Quem me vê vê o Pai" (João 14:9). A revelação de Deus não é abstrata — é pessoal, encarnada em Cristo.

### A promessa do Espírito Santo

"Eu rogarei ao Pai, e ele vos dará outro Consolador, para que fique convosco para sempre — o Espírito da verdade" (João 14:16-17). O termo *Paraklētos* (Consolador, Defensor, Advogado) é riquíssimo. É o mesmo nome dado ao próprio Jesus em outras partes do NT (1 João 2:1). O Espírito Santo não é um substituto inferior — é outro da mesma natureza, que habitará nos crentes de forma interna e permanente.

"Mas o Consolador, o Espírito Santo, a quem o Pai enviará em meu nome, esse vos ensinará todas as coisas e vos fará lembrar de tudo o que eu vos disse" (João 14:26). O Espírito é o mestre interior que ilumina as Escrituras, recorda as palavras de Jesus e guia os discípulos em toda a verdade.

### João 15: A videira e os ramos

"Eu sou a videira verdadeira, e o meu Pai é o lavrador" (João 15:1). A metáfora da videira revela a natureza da relação entre Cristo e os Seus. Não é uma relação de escravidão — é de união vital. O ramo não produz fruto por esforço próprio; produz porque está conectado à fonte de vida.

"Permanecei em mim, e eu permanecerei em vós" (João 15:4). A permanência é mútua e dinâmica. Não é passividade — é dependência ativa, alimentada pela oração, pela obediência e pelo amor.

"Este é o meu mandamento: que vos ameis uns aos outros, assim como eu vos amei" (João 15:12). O amor cristão não é sentimentalismo — é sacrifício voluntário, imitando o modelo de Cristo. "Ninguém tem maior amor do que este: que um ponto a vida pelos seus amigos" (João 15:13). O amor se prova na ação, não nas palavras.

### João 16: A obra do Espírito

"Eu vos digo a verdade: É para vosso proveito que eu vá" (João 16:7). Para os discípulos, isso soou como abandono. Mas Jesus explica: a ausência física permite a presença espiritual universal. O Espírito não estará limitado a um lugar — estará em todo crente, em todo tempo, em todo lugar.

"Quando ele vier, convencerá o mundo de pecado, de justiça e de juízo" (João 16:8-9). A obra do Espírito é tripla: convence de pecado (a necessidade de salvação), de justiça (a perfeição de Cristo) e de juízo (a condenação do pecado). O Espírito não é apenas confortador — é também revelador da verdade.

"Muitas coisas ainda tenho para vos dizer, mas vós não podeis suportá-las agora. Quando vier o Espírito da verdade, ele vos guará a toda a verdade" (João 16:12-13). A revelação não terminou com a ascensão de Jesus — continua pelo Espírito, guia dos discípulos ao longo dos séculos.

### João 17: A oração sacerdotal

João 17 é a oração de Jesus antes da paixão — a mais longa oração registrada nas Escrituras. Ela se divide em três partes: Jesus ora por Si mesmo (vv. 1-5), pelos discípulos (vv. 6-19) e por todos os crentes futuros (vv. 20-26).

"Pai, chegou a hora; glorifica o teu Filho, para que o Filho te glorifique a ti" (João 17:1). A glória pedida não é espetáculo — é a realização do plano eterno de redenção. A glorificação do Filho na cruz é a maior revelação da glória do Pai.

"Não rogo somente por estes, mas também por aqueles que hão de crer em mim pela palavra deles" (João 17:20). Jesus orou por você. Essa oração sacerdotal transcende o tempo — conecta cada crente com a intercessão eterna de Cristo. A unidade dos crentes é testemunho ao mundo: "Para que o mundo creia que me enviaste" (João 17:21).

A oração termina com a pedra angular da teologia joanine: "Eu lhes dei a glória que me deste, para que sejam um, como nós somos um" (João 17:22). A unidade dos crentes reflete a unidade do próprio Deus — é o testemunho supremo da realidade do evangelho.`,
          versículosChave: [
            { ref: 'João 14:1-3', texto: 'Não se turbe o vosso corazón; crdes em Deus, também em mim credes.' },
            { ref: 'João 14:26', texto: 'O Espírito Santo vos ensinará todas as coisas e vos fará lembrar de tudo.' },
            { ref: 'João 16:7-15', texto: 'É para vosso proveito que eu vá; o Espírito vos guará a toda a verdade.' },
            { ref: 'João 17:1-26', texto: 'Pai, chegou a hora; glorifica o teu Filho.' },
          ],
        },
        {
          id: 'joao-quiz-4',
          título: 'Avaliação — A Teologia de João',
          tipo: 'quiz',
          duração: '12 min',
          perguntas: [
            {
              id: 'joao-q4-1',
              pergunta: 'O que significa o termo grego "Logos" no prólogo de João?',
              opções: ['Um anjo criado', 'A razão e palavra eterna de Deus', 'Uma força cósmica impessoal', 'O Espírito Santo'],
              respostaCorreta: 1,
              explicação: 'Logos significa "Verbo" ou "Palavra", mas também carrega o sentido de "Razão" e "Princípio". João o usa para identificar Jesus como o Verbo eterno, presente desde antes da criação.',
            },
            {
              id: 'joao-q4-2',
              pergunta: 'Qual é a primeira declaração "Eu sou" de Jesus no Evangelho de João?',
              opções: ['Eu sou a luz do mundo', 'Eu sou o pão da vida', 'Eu sou a porta', 'Eu sou o bom pastor'],
              respostaCorreta: 1,
              explicação: 'A primeira declaração "Eu sou" occurs in João 6:35, where Jesus declares: "Eu sou o pão da vida; quem vem a mim não terá fome."',
            },
            {
              id: 'joao-q4-3',
              pergunta: 'Quantas declarações "Eu sou" Jesus faz no Evangelho de João?',
              opções: ['Cinco', 'Seis', 'Sete', 'Oito'],
              respostaCorreta: 2,
              explicação: 'Jesus faz sete declarações "Eu sou" no evangelho de João: Pão da Vida, Luz do Mundo, Porta, Bom Pastor, Ressurreição e Vida, Caminho/Verdade/Vida, e Videira Verdadeira.',
            },
            {
              id: 'joao-q4-4',
              pergunta: 'O que o termo grego "Paraklētos" significa?',
              opções: ['Criador', 'Consolador / Defensor / Advogado', 'Profeta', 'Rei'],
              respostaCorreta: 1,
              explicação: 'Paraklētos é traduzido como Consolador, Defensor ou Advogado. É o nome dado ao Espírito Santo, que Jesus promete enviar aos discípulos.',
            },
            {
              id: 'joao-q4-5',
              pergunta: 'Por que Jesus disse que era "proveito" que Ele fosse embora?',
              opções: ['Porque Ele estava cansado', 'Porque o Espírito Santo seria enviado em Seu lugar', 'Porque os discípulos não precisavam mais Dele', 'Porque a obra estava completa na terra'],
              respostaCorreta: 1,
              explicação: 'Jesus explicou que a Sua ausência física permitiria a presença espiritual universal do Espírito Santo, que estaria em todo crente, em todo tempo.',
            },
            {
              id: 'joao-q4-6',
              pergunta: 'Em João 17, por quem Jesus orou?',
              opções: ['Apenas por Si mesmo', 'Por Si mesmo, pelos discípulos e pelos futuros crentes', 'Apenas por Pedro e João', 'Pela nação de Israel'],
              respostaCorreta: 1,
              explicação: 'A oração sacerdotal de João 17 abrange três grupos: Jesus ora por Si mesmo (vv. 1-5), pelos discípulos (vv. 6-19) e por todos os crentes futuros (vv. 20-26).',
            },
            {
              id: 'joao-q4-7',
              pergunta: 'Qual imagem Jesus usou para descrever a relação entre Ele e os discípulos?',
              opções: ['Rei e súditos', 'Mestre e alunos', 'Videira e ramos', 'Pai e filhos'],
              respostaCorreta: 2,
              explicação: 'Em João 15, Jesus usa a imagem da videira e dos ramos para descrever a união vital entre Ele e os Seus seguidores.',
            },
            {
              id: 'joao-q4-8',
              pergunta: 'O que significa "Eu sou" no contexto bíblico?',
              opções: ['Uma expressão de humildade', 'A declaração do nome divino de Deus', 'Uma identificação cultural', 'Uma fórmula de cortesia'],
              respostaCorreta: 1,
              explicação: 'A expressão "Eu sou" (egō eimi) é uma referência direta ao nome de Deus revelado a Moisés em Êxodo 3:14 — "Eu Sou o que Sou". Ao usar essa fórmula, Jesus está afirmando Sua divindade.',
            },
            {
              id: 'joao-q4-9',
              pergunta: 'Qual é o tema central do prólogo joanine?',
              opções: ['A genealogia de Jesus', 'A encarnação do Verbo eterno', 'A paixão e morte de Jesus', 'A ressurreição de Lázaro'],
              respostaCorreta: 1,
              explicação: 'O prólogo de João (1:1-18) apresenta a natureza pré-existente, eterna e divina do Verbo, que se encarnou em Jesus Cristo.',
            },
            {
              id: 'joao-q4-10',
              pergunta: 'Qual é o versículo que declara que "o Verbo era Deus"?',
              opções: ['João 1:14', 'João 1:1', 'João 1:12', 'João 1:18'],
              respostaCorreta: 1,
              explicação: 'João 1:1 declara: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus." Essa é a afirmação explícita da divindade do Verbo.',
            },
          ],
        },
      ],
    },
    {
      id: 'joao-mod-5',
      título: 'A Paixão e Ressurreição em João',
      descrição: 'João 18-21: A prisão, julgamento, crucificação, morte e ressurreição de Jesus — a consumação da obra redentora',
      ícone: '✝️',
      aulas: [
        {
          id: 'joao-5-1',
          título: 'A prisão e o julgamento de Jesus',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## A prisão e o julgamento de Jesus

João 18-19 narra os eventos que levaram Jesus da oração no Getsêmani à crucificação no Gólgota. Diferente dos outros sinóticos, João apresenta Jesus não como vítima passiva, mas como o Rei soberano que entrega a Sua vida voluntariamente. O julgamento de Jesus diante de Pilatos é um dos trechos mais dramáticos e teologicamente ricos de todo o evangelho.

### A prisão no Getsêmani

João 18:1-11: Jesus e os discípulos atravessaram o ribeiro de Cedrom e entraram num horto. Judas, o traidor, chegou com uma coorte de soldados e servos dos fariseus. "A quem buscais?" — "Jesus Nazareno." — "EU SOU" (João 18:5-6). O nome divino, pronunciado com autoridade, derrubou os soldados no chão. Essa cena é profundamente simbólica: diante do nome revelado a Moisés, toda a força humana cai prostrada. Jesus não precisou usar poder — bastou Sua palavra.

Pedro sacou a espada e cortou a orelha de Malco, servo do sumo sacerdote. Jesus o repreendeu: "Embainha a tua espada! Não haverei de beber o cálice que o Pai me deu?" (João 18:11). A prisão não foi um fracasso — foi a primeira etapa do cumprimento do plano eterno de redenção. O cálice da ira divina estava sendo preparado, e Jesus o beberia até as últimas gotas.

### A negação de Pedro

João 18:15-27: Pedro seguiu Jesus até o pátio do sumo sacerdote. Três vezes negou conhecê-Lo: "Não sou discípulo dele" (João 18:17, 25, 27). O galo cantou. Pedro lembrou das palavras de Jesus: "Antes que o galo cante, tu me hás de negar três vezes" (João 13:38). A negação de Pedro revela a fragilidade humana diante da tentação — mas também a misericórdia divina que restaura. João não registra o choro de Pedro aqui, mas sabemos pelos outros evangelhos que ele saiu e chorou amargamente.

### Diante de Anás e Caifás

Jesus foi levado primeiro a Anás, sogro de Caifás (João 18:13). Anás interrogou Jesus sobre os Seus discípulos e ensinos. Jesus respondeu com dignidade: "Eu falei abertamente ao mundo; eu sempre ensinei na sinagoga e no templo, onde todos os judeus se reúnem; nada falei às escondidas" (João 18:20). Um dos servos deu um tapa em Jesus: "Assim respondes ao sumo sacerdote?" A paciência de Jesus diante da injustiça é exemplar.

### Diante de Pilatos

A cena diante de Pilatos é o cerne teológico da paixão joanine. Pilatos perguntou: "Tu és o Rei dos Judeus?" (João 18:33). A pergunta é política — mas a resposta de Jesus é transcendente: "O meu reino não é deste mundo. Se o meu reino fosse deste mundo, os meus servos pelejariam para que eu não fosse entregue aos judeus; mas o meu reino não é daqui" (João 18:36).

Pilatos três vezes declarou: "Não acho culpa neste homem" (João 18:38, 19:4, 19:6). A inocência de Jesus foi reconhecida mesmo pelo governador romano. No entanto, a multidão, manipulada pelos líderes religiosos, preferiu Barrabás — um criminoso — ao Salvador do mundo. A escolha entre Jesus e Barrabás é paradigmática: a humanidade sempre escolhe o pecado em vez da salvação.

### A crucificação

João 19:16-30: Jesus foi crucificado. A inscrição colocada na cruz dizia: "Jesus Nazareno, o Rei dos Judeus" (João 19:19). Os sumos sacerdotes protestaram: "Não escrevas: O Rei dos Judeus, mas que ele se disse rei dos Judeus." Pilatos respondeu: "O que escrevi, escrevi" (João 19:22). A ironia é magnífica: o governador romano, sem saber, proclamou a verdade sobre Jesus — Ele é o Rei.

"Estando Jesus безопасн ali, para que se cumprisse a Escritura, disse: Tenho sede" (João 19:28). A sede do Criador do universo é um dos paradoxos mais profundos da encarnação. O infinito experimenta a finitude. O eterno suporta o temporal.

"Está consumado!" (*Tetelestai* — João 19:30). A palavra grega significa "está pago", "está completo", "está perfeito". A obra da salvação estava acabada. Não faltou nada — o preço foi integralmente pago. Jesus não foi derrotado na cruz — venceu. A cruz não é um fracasso — é o trono da vitória.`,
          versículosChave: [
            { ref: 'João 18:5-6', texto: 'EU SOU. E, dizendo isto, caíram por terra.' },
            { ref: 'João 18:36', texto: 'O meu reino não é deste mundo.' },
            { ref: 'João 19:22', texto: 'O que escrevi, escrevi.' },
            { ref: 'João 19:30', texto: 'Está consumado!' },
          ],
        },
        {
          id: 'joao-5-2',
          título: 'As últimas palavras da cruz e o sepultamento',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: `## As últimas palavras da cruz e o sepultamento

João 19 registra as últimas palavras de Jesus na cruz e o Seu sepultamento. Diferente dos outros evangelhos, João narra menos palavras da cruz, mas cada uma delas carrega peso teológico extraordinário. As últimas palavras de um moribundo são sempre significativas — as de Jesus são eternas.

### As palavras da cruz no Evangelho de João

Embora os quatro evangelhos juntos registrem sete palavras da cruz, João foca em três momentos cruciais:

**1. "Mulher, eis o teu filho. Filho, eis a tua mãe" (João 19:26-27)**

Jesus olhou para Maria, Sua mãe, e para o discípulo amado: "Mulher, eis o teu filho." Depois disse ao discípulo: "Eis a tua mãe." A partir daquele hora, o discípulo a recebeu em sua casa. Essa é a última intervenção de Jesus no cuidado humano — Ele providenciou para Sua própria mãe. Mesmo na agonia da cruz, Jesus pensou nos outros. A entrega da mãe ao discípulo é também um gesto simbólico: a nova família de Deus se forma na cruz, unida não pelo sangue, mas pela fé.

**2. "Tenho sede" (João 19:28)**

"Depois disso, sabendo Jesus que já tudo se havia cumprido, para que se cumprisse a Escritura, disse: Tenho sede." A sede de Jesus na cruz é um dos dados mais realistas da paixão. O Criador dos mares e oceanos experimenta a secura da água. A sede física aponta para algo mais profondo: a sede espiritual do Filho de Deus separado do Pai pelo pecado da humanidade. Isaías 53:3 profetizou: "Desprezado e rejeitado dos homens." A sede é a manifestação física do sofrimento espiritual.

**3. "Está consumado" (João 19:30)**

"E, inclinando a cabeça, entregou o espírito." O verbo grego *teleoō* (consumar, completar) está no perfecto indicativo — *tetelestai* — uma forma verbal que indica ação passada com resultados presentes e permanentes. Não é apenas "acabou" — é "está consumado de uma vez por todas, para sempre". A obra da redenção não precisa ser repetida, complementada ou melhorada. Está perfeita.

### A lança e o sangue

"Mas, vindo eles a Jesus, como o viram já morto, não lhe quebraram as pernas; mas um dos soldados lhe abriu o lado com uma lança, e logo saiu sangue e água" (João 19:33-34). O detalhe do sangue e água é teologicamente carregado. A água simboliza purificação e regeneração; o sangue simboliza expiação e redenção. João interpreta isso como testemunho ocular: "E o que o viu dá testemunho, e o seu testemunho é verdadeiro" (João 19:35). A dupla natureza da morte de Cristo é revelada: Ele é o Cordeiro que purifica e o Sacrifício que redime.

### O sepultamento

"Depois disto, José de Arimateia, que era discípulo de Jesus, porém oculto por medo dos judeus, pediu a Pilatos que lhe permitisse tirar o corpo de Jesus" (João 19:38). Nicodemos também ajudou, trazendo uma mistura de mirra e aloes, cerca de trinta quilos. Eles envolveram o corpo em lençóis com as especiarias, de acordo com o costume de sepultamento dos judeus.

"No lugar onde fora crucificado havia um horto, e no horto um sepulcro novo, em que ninguém fora ainda posto" (João 19:41). O sepulcro novo de Jesus cumpre a profecia de Isaías 53:9: "Pôs a sua sepultura com os ímpios, mas com o rico haverá a sua sepultura." O Criador do universo recebeu um túmulo emprestado — mas não por muito tempo.`,
          versículosChave: [
            { ref: 'João 19:26-27', texto: 'Mulher, eis o teu filho. Filho, eis a tua mãe.' },
            { ref: 'João 19:28', texto: 'Tenho sede.' },
            { ref: 'João 19:30', texto: 'Está consumado. E, inclinando a cabeça, entregou o espírito.' },
            { ref: 'João 19:34', texto: 'Um dos soldados lhe abriu o lado com uma lança, e logo saiu sangue e água.' },
          ],
        },
        {
          id: 'joao-5-3',
          título: 'A ressurreição: Provas e significado',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: `## A ressurreição: Provas e significado

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

O número 153 tem gerado muita especulação. Alguns veem simbolismo nos números (153 = soma dos números de 1 a 17); outros veem alusão à profecia de Ezequiel 47:10 (peixes de muitas espécies). independentemente do significado numérico, o número exato indica que o evento é histórico — um pescador conta seus peixes com precisão.

### A restauração de Pedro

A cena mais emotiva da ressurreição é a restauração de Pedro. Três vezes Jesus perguntou: "Simão, tu me amas?" — uma pergunta para cada negação. Três vezes Pedro respondeu: "Tu sabes que te amo." Três confissões anulam três negações.

"Apaascenta os meus cordeiros... Apascenta as minhas ovelhas... Apascenta as minhas ovelhas" (João 21:15-17). A restauração não é apenas perdão — é missão. Pedro é restabelecido como líder do rebanho.

"Quando envelheceres, estenderás as tuas mãos, e outro te cingirá e te levará para onde não queres" (João 21:18). Jesus profetizou a morte de Pedro — não para amedrontá-lo, mas para prepará-lo. "Segue-me" (João 21:19). O mesmo chamado do início. O discipulado começa e termina em seguimento.

### O propósito do evangelho

"Mas estas foram escritos para que creiais que Jesus é o Cristo, o Filho de Deus, e para que, crendo, tenhais vida em seu nome" (João 20:31). Todo o evangelho converge para esse objetivo: fé em Jesus como o Cristo, o Filho de Deus, que dá vida eterna.`,
          versículosChave: [
            { ref: 'João 20:28', texto: 'Meu Senhor e meu Deus!' },
            { ref: 'João 20:29', texto: 'Bem-aventurados os que não viram e creram.' },
            { ref: 'João 20:31', texto: 'Estas foram escritos para que creiais que Jesus é o Cristo, o Filho de Deus.' },
            { ref: 'João 21:17', texto: 'Senhor, tu sabes tudo; tu bem sabes que te amo.' },
            { ref: 'João 21:19', texto: 'Segue-me.' },
          ],
        },
        {
          id: 'joao-quiz-5',
          título: 'Avaliação — A Paixão e Ressurreição em João',
          tipo: 'quiz',
          duração: '12 min',
          perguntas: [
            {
              id: 'joao-q5-1',
              pergunta: 'O que Jesus disse quando os soldados vieram prendê-Lo no Getsêmani?',
              opções: ['Não me prendam', 'EU SOU', 'Onde está Judas?', 'Pai, perdoa-lhes'],
              respostaCorreta: 1,
              explicação: 'Jesus disse "EU SOU", usando o nome divino revelado a Moisés, e os soldados caíram por terra (João 18:5-6).',
            },
            {
              id: 'joao-q5-2',
              pergunta: 'Quantas vezes Pilatos declarou que não achava culpa em Jesus?',
              opções: ['Duas vezes', 'Três vezes', 'Quatro vezes', 'Uma vez'],
              respostaCorreta: 1,
              explicação: 'Pilatos declarou três vezes: "Não acho culpa neste homem" (João 18:38, 19:4, 19:6).',
            },
            {
              id: 'joao-q5-3',
              pergunta: 'O que significava a palavra grega "Tetelestai"?',
              opções: ['Meu Deus, por que me abandonaste?', 'Está consumado / Está pago', 'Pai, perdoa-lhes', 'Tenho sede'],
              respostaCorreta: 1,
              explicação: 'Tetelestai significa "está consumado" ou "está pago" — a obra da salvação foi completamente realizada na cruz.',
            },
            {
              id: 'joao-q5-4',
              pergunta: 'Quem foi a primeira pessoa a ver Jesus ressurreto?',
              opções: ['Pedro', 'João', 'Maria Madalena', 'Tomé'],
              respostaCorreta: 2,
              explicação: 'Maria Madalena foi a primeira testemunha da ressurreição (João 20:1-18).',
            },
            {
              id: 'joao-q5-5',
              pergunta: 'O que saiu do lado de Jesus quando o soldado O feriu?',
              opções: ['Ar e poeira', 'Sangue e água', 'Luz e fogo', 'Óleo e vinho'],
              respostaCorreta: 1,
              explicação: 'Um dos soldados abriu o lado de Jesus com uma lança, e saiu sangue e água (João 19:34), simbolizando purificação e redenção.',
            },
            {
              id: 'joao-q5-6',
              pergunta: 'Quantos peixeros foram pescados na pesca milagrosa?',
              opções: ['100', '120', '153', '200'],
              respostaCorreta: 2,
              explicação: 'Os discípulos pescaram 153 peixes grandes na pesca milagrosa registrada em João 21:11.',
            },
            {
              id: 'joao-q5-7',
              pergunta: 'Quantas vezes Jesus perguntou a Pedro "Tu me amas?"',
              opções: ['Uma vez', 'Duas vezes', 'Três vezes', 'Quatro vezes'],
              respostaCorreta: 2,
              explicação: 'Três vezes — uma para cada negação de Pedro. A restauração foi completa e específica.',
            },
            {
              id: 'joao-q5-8',
              pergunta: 'Qual foi a confissão de Tomé quando viu Jesus ressurreto?',
              opções: ['Tu és o Messias', 'Meu Senhor e meu Deus!', 'Tu és o Profeta', 'Tu és o Rei'],
              respostaCorreta: 1,
              explicação: '"Meu Senhor e meu Deus!" (João 20:28) é a confissão mais alta de divindade de Jesus em todo o Novo Testamento.',
            },
            {
              id: 'joao-q5-9',
              pergunta: 'Por que Pilatos escreveu a inscrição na cruz em hebraico, latim e grego?',
              opções: ['Por diversão', 'Para que todos pudessem ler', 'Para zombar de Jesus', 'Por ordem do imperador'],
              respostaCorreta: 1,
              explicação: 'Pilatos escreveu em três idiomas para que todos os presentes pudessem ler a inscrição: "Jesus Nazareno, o Rei dos Judeus" (João 19:19-20).',
            },
            {
              id: 'joao-q5-10',
              pergunta: 'Qual é o propósito declarado do Evangelho de João?',
              opções: ['Registrar a história de Jesus', 'Ensinar filosofia grega', 'Para que creiais que Jesus é o Cristo, o Filho de Deus', 'Condenar os pecadores'],
              respostaCorreta: 2,
              explicação: 'João 20:31 declara: "Estas foram escritos para que creiais que Jesus é o Cristo, o Filho de Deus, e para que, crendo, tenhais vida em seu nome."',
            },
          ],
        },
      ],
    },
  ],
};
