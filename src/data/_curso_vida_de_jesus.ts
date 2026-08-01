import type { Curso } from './cursos';

export const CURSO_VIDA_DE_JESUS: Curso = {
  id: 'vida-de-jesus',
  título: 'Vida de Jesus: O Evangelho Harmonizado',
  descrição: 'Siga Jesus desde o nascimento até a ascensão, harmonizando os quatro evangelhos em uma narrativa contínua.',
  instrutor: 'Sola Scriptura',
  duração: '10 semanas',
  nível: 'iniciante',
  categoria: 'Estudo Bíblico',
  certificado: true,
  módulos: [
    {
      id: 'mod-jesus-nascimento',
      título: 'O Nascimento e Infância',
      descrição: 'Anunciação, nascimento, visitas, fuga para o Egito',
      ícone: '👶',
      aulas: [
        {
          id: 'aula-jesus-1-1',
          título: 'A Anunciação a Maria (Lucas 1:26-38)',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: '## A Anunciação a Maria\n\nO evento que mudou a história da humanidade: um anjo aparece a uma jovem de Nazaré e anuncia que ela será a mãe do Filho de Deus.\n\n### O contexto\n\nNazaré era uma cidade pequena e desprezada (João 1:46 — "Pode sair alguma coisa boa de Nazaré?"). Maria era uma jovem humilde, prometida a José, carpinteiro. Nada nela sugeria que seria escolhida para algo tão grandioso.\n\n### A mensagem\n\n"Não temas, Maria, porque achaste graça diante de Deus. Eis que conceberás no teu ventre, e darás à luz um filho, e lhe pôrás o nome de Jesus" (Lucas 1:30-31).\n\n**Os títulos do filho:**\n1. **Filho do Altíssimo** — divindade (1:32)\n2. **Herdeiro do trono de Davi** — messianismo (1:32)\n3. **Rei de Jacó** — cumprimento da aliança (1:33)\n4. **Filho de Deus** — natureza divina (1:35)\n\n### A pergunta de Maria\n\n"Como se fará isso, se não conheço homem?" (1:34). A pergunta não é de incredulidade — é de curiosidade legítima. Maria aceita a missão antes de entender o processo.\n\n### A resposta do anjo\n\n"O Espírito Santo virá sobre ti, e o poder do Altíssimo te cobrirá com a sua sombra; por isso o santo que de ti há de nascer será chamado Filho de Deus" (1:35). A concepção é virginal e sobrenatural — obra direta de Deus.\n\n### O fiat de Maria\n\n"Eis a serva do Senhor; faça-se em mim segundo a tua palavra" (1:38). Esta é uma das respostas mais corajosas e humildes da Bíblia. Maria arriscou sua reputação, seu casamento, sua vida. Ela não entendeu tudo — mas confiou em Deus.\n\n### Aplicação\n\nMaria nos ensina que Deus escolhe os humildes. A graça não depende de nossas capacidades, mas da nossa disponibilidade. "Faça-se em mim" é a oração mais poderosa que podemos oferecer.',
          versículosChave: [
            { ref: 'Lucas 1:30-31', texto: 'Não temas, Maria, porque achaste graça diante de Deus. Conceberás e darás à luz um filho.' },
            { ref: 'Lucas 1:35', texto: 'O Espírito Santo virá sobre ti, e o poder do Altíssimo te cobrirá.' },
            { ref: 'Lucas 1:38', texto: 'Eis a serva do Senhor; faça-se em mim segundo a tua palavra.' },
          ],
        },
        {
          id: 'aula-jesus-1-2',
          título: 'O Nascimento em Belém (Mateus 1-2, Lucas 2)',
          tipo: 'texto',
          duração: '14 min',
          conteúdo: '## O Nascimento em Belém\n\nO nascimento de Jesus é o evento mais importante da história. Deus se fez homem em um estábulo, em uma cidade pequena, para pastores humildes.\n\n### O censo de César Agostinho\n\n"Houve um decreto de César Agostinho, que ordenasse que se fizesse um recenseamento de todo o mundo" (Lucas 2:1). O decreto romano serviu ao propósito divino — José e Maria tiveram que viajar para Belém, cumprindo a profecia de Miqueias 5:2.\n\n### A busca de hospedagem\n\n"Não havia lugar para eles" (Lucas 2:7). O Rei dos reis nasceu onde não havia lugar para Ele. A rejeição de Jesus começou no nascimento.\n\n### O estábulo\n\nEla o enrolou em faixas, e o deitou num presépio (2:7). O presépio é o local onde os animais comiam — um local humilde e pobre. Deus escolhe a pobreza para se revelar.\n\n### Os pastores\n\n"Pastores estavam nessa região, guardando as suas ovelhas de noite" (2:8). Os pastores eram considerados impuros pelo sistema religioso — não podiam participar dos rituais do templo. Deus se revelou primeiro aos marginalizados.\n\n### O anúncio\n\n"Não temas, porque eis que vos dou novas de grande alegria, que será para todo o povo: Hoje, na cidade de Davi, vos nasceu um Salvador, que é o Cristo, o Senhor" (2:10-11).\n\n**Os títulos:**\n1. **Salvador** — redenção\n2. **Cristo** (ungido) — messias\n3. **Senhor** — soberania\n\n### A multidão dos anjos\n\n"Subitamente, houve com o anjo uma multidão da hoste celestial, louvando a Deus" (2:13). Os anjos não cantaram para os reis ou sacerdotes — cantaram para pastores.\n\n### Os sábios do oriente\n\nMateus 2:1-12 — magos do oriente seguem uma estrela para adorar o rei dos judeus. Herodes fica alarmado. Os sábios trazem ouro (realeza), incenso (divindade) e mirra (morte).\n\n### A fuga para o Egito\n\nDeus avisa José em sonho para fugir para o Egito (Mateus 2:13). O Deus que guia uma estrela também guia sonhos. Jesus passa pelo Egito, cumprindo "Do Egito chamei o meu filho" (Oséias 11:1).\n\n### Aplicação\n\nO nascimento de Jesus mostra que Deus está no controle da história. Decretos romanos, estrelas, sonhos — tudo coopera para o Seu plano. Nossa humildade não é obstáculo para Deus — é o terreno perfeito para a graça.',
          versículosChave: [
            { ref: 'Lucas 2:10-11', texto: 'Hoje vos nasceu um Salvador, que é o Cristo, o Senhor, na cidade de Davi.' },
            { ref: 'Lucas 2:7', texto: 'Deitou-o num presépio, porque não havia lugar para eles.' },
            { ref: 'Mateus 2:1', texto: 'Nascendo Jesus em Belém de Judéia.' },
          ],
        },
      ],
    },
    {
      id: 'mod-jesus-ministerio',
      título: 'Início do Ministério',
      descrição: 'Batismo, tentação, primeiros discípulos',
      ícone: '💧',
      aulas: [
        {
          id: 'aula-jesus-2-1',
          título: 'O Batismo de Jesus (Mateus 3:13-17)',
          tipo: 'texto',
          duração: '10 min',
          conteúdo: '## O Batismo de Jesus\n\nO batismo de Jesus é o início oficial do Seu ministério público. É um evento trinitário por excelência.\n\n### Por que Jesus foi batizado?\n\nJesus não tinha pecado para confessar (Hebreus 4:15). Por que, então, se batizou?\n\n1. **Identificação conosco**: Jesus se identifica com os pecadores, assumindo o lugar que seria nosso\n2. **Cumprimento da justiça**: "Convém que assim cumpramos toda a justiça" (3:15)\n3. **Início do ministério**: É a inauguração pública da Sua missão\n4. **Exemplo**: Nos ensina a obedecer, mesmo quando não entendemos completamente\n\n### A Trindade revelada\n\n"Batizando-se Jesus, saiu logo da água; e eis que se lhe abriram os céus, e viu o Espírito Santo descendo como pomba, e vindo sobre ele. E eis que uma voz dos céus dizia: Este é o meu Filho amado, em quem me comprazo" (3:16-17).\n\n1. **O Pai fala do alto** — aprovação\n2. **O Filho está na água** — obediência\n3. **O Espírito desce como pomba** — unção\n\nÉ a única vez que os três estão presentes simultaneamente de forma visível.\n\n### A voz do Pai\n\n"Este é o meu Filho amado, em quem me comprazo" (3:17). Antes de Jesus fazer qualquer coisa, o Pai declara Seu prazer. A identidade precede a atividade. Nós somos amados não pelo que fazemos, mas pelo que somos em Cristo.\n\n### Aplicação\n\nO batismo de Jesus nos lembra que:\n1. Deus é trinitário — Pai, Filho e Espírito\n2. Identificação com Cristo é o início da vida cristã\n3. A aprovação divina precede a nossa atividade\n4. A obediência é marcada pela presença do Espírito',
          versículosChave: [
            { ref: 'Mateus 3:16-17', texto: 'Viu o Espírito Santo descendo como pomba... Uma voz dos céus dizia: Este é o meu Filho amado.' },
            { ref: 'Mateus 3:15', texto: 'Convém que assim cumpramos toda a justiça.' },
          ],
        },
        {
          id: 'aula-jesus-2-2',
          título: 'A Tentação no Deserto (Mateus 4:1-11)',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: '## A Tentação no Deserto\n\nLogo após o batismo, Jesus é conduzido pelo Espírito ao deserto para ser tentado por Satanás. É o confronto direto entre o novo Adão e a serpente antiga.\n\n### O contexto\n\n"Jesus foi conduzido pelo Espírito ao deserto, para ser tentado pelo diabo" (4:1). É o Espírito quem conduz — a tentação faz parte do plano de Deus. Jesus passa 40 dias sem comer — fome extrema.\n\n### A primeira tentação: pedra em pão\n\n"Se és Filho de Deus, ordena que estas pedras se transformem em pães" (4:3). A tentação é:\n1. **Duvidar da filiação divina** — "Se és Filho..."\n2. **Usar o poder para si mesmo** — em vez de servir\n3. **Priorizar a necessidade física sobre a obediência**\n\nResposta: "Está escrito: Nem só de pão viverá o homem, mas de toda a palavra que sai da boca de Deus" (4:4). Jesus cita Deuteronômio 8:3.\n\n### A segunda tentação: salto do templo\n\n"Se és Filho de Deus, lança-te daqui abaixo" (4:6). A tentação é:\n1. **Testar Deus** — forçar uma intervenção\n2. **Exibir o poder divino** — espetáculo em vez de serviço\n3. **Buscar a aprovação dos homens** em vez da de Deus\n\nResposta: "Também está escrito: Não tentarás o Senhor teu Deus" (4:7). Jesus cita Deuteronômio 6:16.\n\n### A terceira tentação: reinos do mundo\n\n"Dar-te-ei todos estes reinos, se, prostrado, me adorares" (4:9). A tentação é:\n1. **Adorar a criatura em vez do Criador**\n2. **Alcançar o resultado sem a cruz**\n3. **Trocar a eternidade pelo temporal**\n\nResposta: "Afasta-te de mim, Satanás, porque está escrito: Ao Senhor teu Deus adorarás, e só a ele servirás" (4:10). Jesus cita Deuteronômio 6:13.\n\n### O padrão de vitória\n\n1. **Jesus usa a Escritura** — três vezes cita Deuteronômio\n2. **Jesus é direto** — não negocia com Satanás\n3. **Jesus depende do Pai** — não usa Seu poder próprio\n\n### Aplicação\n\nA tentação de Jesus mostra que:\n1. Ser tentado não é pecado — resistir é vitória\n2. A Bíblia é nossa arma contra o mal\n3. Satanás é astuto — usa verdadeiras necessidades para desviar\n4. A obediência ao Pai é mais importante que resultados',
          versículosChave: [
            { ref: 'Mateus 4:4', texto: 'Está escrito: Nem só de pão viverá o homem, mas de toda a palavra de Deus.' },
            { ref: 'Mateus 4:10', texto: 'Afasta-te de mim, Satanás, porque está escrito: Ao Senhor teu Deus adorarás.' },
            { ref: 'Mateus 4:11', texto: 'Então o diabo o deixou, e eis que os anjos vieram e o serviram.' },
          ],
        },
      ],
    },
    {
      id: 'mod-jesus-milagres',
      título: 'Milagres e Ensinos',
      descrição: 'Curas, prodígios, parábolas, sermão da montanha',
      ícone: '✨',
      aulas: [
        {
          id: 'aula-jesus-3-1',
          título: 'O Sermão da Montanha (Mateus 5-7)',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: '## O Sermão da Montanha\n\nO Sermão da Montanha é o discurso mais famoso de Jesus — o manifesto do Reino de Deus. É a ética do céu aplicada à terra.\n\n### As beatitudes\n\n"As bênçãos do Reino" (Mateus 5:3-12):\n\n1. **Pobres de espírito** — os que reconhecem sua necessidade de Deus\n2. **Os que choram** — os que lamentam o pecado\n3. **Os mansos** — os que não se impõem pela força\n4. **Os que têm fome e sede de justiça** — os que desejam a vontade de Deus\n5. **Misericordiosos** — os que perdoam\n6. **Os limpos de coração** — os que veem a Deus\n7. **Os que promovem a paz** — filhos de Deus\n8. **Os perseguidos** — por amor à justiça\n\n### A luz e o sal\n\n"Vós sois o sal da terra... vós sois a luz do mundo" (5:13-14). A igreja tem função preservadora (sal) e iluminadora (luz). Sem sal, a terra apodrece. Sem luz, as trevas dominam.\n\n### A lei cumprida\n\n"Não penseis que vim para destruir a lei ou os profetas; não vim para destruir, mas para cumprir" (5:17). Jesus não aboliu a lei — elevou-a ao padrão do coração:\n\n- Não matarás → Não odiarás\n- Não adulterarás ≠ Não cobiçarás\n\n### A oração do Pai Nosso\n\n"Quando orardes, não sejais como os hipócritas... vós, porém, quando orardes, entraí no vosso quarto, e, tendo fechado a porta, orai ao vosso Pai" (6:5-6). A oração cristã é:\n1. **Pessoal** — no quarto, com a porta fechada\n2. **Sincera** — sem palavras vãs\n3. **Confiente** — o Pai sabe o que precisamos\n\n### Não vos preocupeis\n\n"Não vos preocupeis, portanto, com o dia de amanhã" (6:34). A preocupação é a oração ao ídolo do futuro. Deus cuida das aves e dos lírios — quanto mais de nós!\n\n### A regra de ouro\n\n"Em tudo, portanto, quereis que os homens vos façam, assim também vós lhes façais" (7:12). A ética cristã é relacional — colocar os outros antes de nós.\n\n### Aplicação\n\nO Sermão da Montanha não é para desanimar — é para transformar. Vivemos em dependência do Pai, com alegria e mansidão. O Reino de Deus começa aqui, agora, no meio de nós.',
          versículosChave: [
            { ref: 'Mateus 5:3-4', texto: 'Bem-aventurados os pobres de espírito... os que choram.' },
            { ref: 'Mateus 5:14', texto: 'Vós sois a luz do mundo.' },
            { ref: 'Mateus 6:33', texto: 'Buscai primeiro o reino de Deus, e a sua justiça.' },
            { ref: 'Mateus 7:12', texto: 'Em tudo, quereis que os homens vos façam, assim também vós lhes façais.' },
          ],
        },
        {
          id: 'aula-jesus-3-2',
          título: 'Os Principais Milagres de Jesus',
          tipo: 'texto',
          duração: '14 min',
          conteúdo: '## Os Principais Milagres de Jesus\n\nOs milagres de Jesus não são apenas espetáculos — são sinais reveladores de quem Ele é. Cada milagre tem um significado teológico.\n\n### 1. Água em vinho (João 2:1-11)\n\nPrimeiro milagre em Caná. Transforma água em vinho de qualidade superior.\n\n**Significado**: Jesus é o autor da nova aliança. O vinho novo substitui a água velha da Lei. A abundância (6 potes de 20-30 litros) revela a graça superabundante.\n\n### 2. Curou o filho do oficial (João 4:46-54)\n\nJesus cura à distância, sem ir à casa.\n\n**Significado**: A fé não depende de presença física. A Palavra de Jesus tem poder em si mesma.\n\n### 3. Expulsão do espírito imundo (Marcos 1:23-26)\n\nJesus expulsa demônios com autoridade.\n\n**Significado**: O Reino de Deus invadiu o reino de Satanás. Jesus tem autoridade sobre todos os espíritos.\n\n### 4. Cura da sogra de Pedro (Marcos 1:30-31)\n\nJesus toca na mão dela e a febre desaparece.\n\n**Significado**: Jesus se importa com as necessidades cotidianas. Ele cura em detalhes.\n\n### 5. A tempestade acalmada (Marcos 4:35-41)\n\nJesus acalma o mar com uma palavra.\n\n**Significado**: Jesus é o Senhor da criação. \"Quem é este, que até os ventos e o mar lhe obedecem?\" (4:41).\n\n### 6. O endemoninhado Gadara (Marcos 5:1-20)\n\nJesus liberta um homem possesso por uma legião de demônios.\n\n**Significado**: Nenhum pecado é grande demais para a graça de Deus. O homem é restaurado e enviado para testemunhar.\n\n### 7. A filha de Jairo (Marcos 5:21-43)\n\nJesus ressuscita uma menina morta.\n\n**Significado**: Jesus tem poder sobre a morte. \"Não chores, porque não morreu, mas dorme\" (5:39).\n\n### 8. A mulher com fluxo de sangue (Marcos 5:25-34)\n\nUma mulher toca na orla de Jesus e é curada.\n\n**Significado**: A fé, mesmo que desesperada, alcança a graça de Deus. Jesus não é contaminado — Ele purifica.\n\n### 9. Os cinco pães e dois peixes (Mateus 14:15-21)\n\nJesus alimenta 5.000 pessoas com pouco.\n\n**Significado**: Jesus é o pão da vida. Ele supre nossas necessidades com abundância (12 cestos sobrando).\n\n### 10. Pedro anda sobre as águas (Mateus 14:22-33)\n\nPedro anda sobre a água, mas começa a afundar.\n\n**Significado**: A fé em Jesus nos sustenta sobre as circunstâncias. Quando olhamos para Jesus, andamos; quando olhamos para as ondas, afundamos.\n\n### Aplicação\n\nCada milagre é um convite: venha a Cristo. Ele é o autor da vida, da cura, da liberdade e da esperança. Os milagres não eram apenas para aquela época — o Deus de milagres é o mesmo ontem, hoje e sempre.',
          versículosChave: [
            { ref: 'João 20:30-31', texto: 'Muitos outros sinais fez Jesus... para que creiais que Jesus é o Cristo, o Filho de Deus.' },
            { ref: 'Marcos 4:41', texto: 'Quem é este, que até os ventos e o mar lhe obedecem?' },
            { ref: 'Mateus 14:36', texto: 'E rogavam-lhe que ao menos tocassem na orla da sua veste; e todos os que tocaram foram sãs.' },
          ],
        },
      ],
    },
    {
      id: 'mod-jesus-paixao',
      título: 'A Paixão e a Cruz',
      descrição: 'Última ceia, oração no getsêmani, julgamento, crucificação, morte',
      ícone: '✝️',
      aulas: [
        {
          id: 'aula-jesus-4-1',
          título: 'A Última Ceia e a Oração no Getsêmani',
          tipo: 'texto',
          duração: '14 min',
          conteúdo: '## A Última Ceia e a Oração no Getsêmani\n\nA Última Ceia é o clímax do ministério terreno de Jesus. Ele Institui a ceia, lava os pés dos discípulos e ora agonizante no Getsêmani.\n\n### A preparação\n\n"Quis Jesus, antes da festa da Páscoa, saber que a sua hora era já chegada" (João 13:1). Jesus tem plena consciência do que está por vir.\n\n### A lavagem dos pés\n\n"Jesus, sabendo que o Pai tudo pusera nas suas mãos... levantou-se da ceia, depôs as suas vestes, e tomando uma toalha, cingiu-se" (João 13:3-4).\n\nO Deus todo-poderoso se abaixa para lavar os pés dos seus discípulos. É a imagem máxima de serviço. "Se eu, o Senhor e o Mestre, lavei os vossos pés, também vós deveis lavar uns os pés uns dos outros" (13:14).\n\n### A Instituição da Ceia\n\n"Tomando Jesus o pão, abençoou-o e partiu-o e deu aos discipleus, dizendo: Tomai, comei; isto é o meu corpo. E, tomando o cálice, deu-lhes graças e deu-lhes, dizendo: Bebei todos dele; porque isto é o meu sangue" (Mateus 26:26-28).\n\nO pão e o vinho representam o corpo e o sangue de Cristo, dados pela redenção. "Fazei isto em memória de mim" (11:24).\n\n### A predição da traição\n\n"Em verdade vos digo que um de vós me há de trair" (Mateus 26:21). O drama — os discípulos perguntam "Sou eu?". Judas sai na escuridão (João 13:30).\n\n### A oração no Getsêmani\n\n"Meu Pai, se é possível, passa de mim este cálice; contudo, não seja como eu quero, mas como tu queras" (Mateus 26:39). A agonização de Jesus:\n\n1. **Angústia mortal** — "Começou a entristecer-se e a estar muito pesado" (26:37)\n2. **Sangue como gotas** — "O seu suor tornou-se como grandes gotas de sangue" (Lucas 22:44)\n3. **Solidão** — os discípulos dormem\n4. **Submissão** — "Não seja como eu quero, mas como tu queras"\n\n### A traição de Judas\n\n"Com quem derrei eu o ósculo, esse é; segurai-o" (26:48). O beijo de Judas é o maior ato de hipocrisia da história — um beijo de amor como instrumento de traição.\n\n### Aplicação\n\nA Última Ceia nos lembra que:\n1. Jesus serviu até o fim — o serviço não é opcional\n2. O pão e o vinho são memorial — fazemos em memória dEle\n3. A oração é necessária até na agonização\n4. A submissão à vontade de Deus é o ápice da fé',
          versículosChave: [
            { ref: 'Mateus 26:39', texto: 'Meu Pai, se é possível, passa de mim este cálice; contudo, não seja como eu quero.' },
            { ref: 'João 13:14', texto: 'Se eu lavei os vossos pés, também vós deveis lavar os pés uns dos outros.' },
            { ref: 'Mateus 26:26-28', texto: 'Tomai, comei; isto é o meu corpo... Bebei; isto é o meu sangue.' },
          ],
        },
        {
          id: 'aula-jesus-4-2',
          título: 'A Crucificação e a Morte',
          tipo: 'texto',
          duração: '15 min',
          conteúdo: '## A Crucificação e a Morte\n\nA crucificação de Jesus é o evento central da história. É onde a justiça e a graça de Deus se encontram.\n\n### O julgamento\n\nJesus é julgado por três tribunais:\n\n1. **Religioso**: Sinédrio (Caifás) — acusação: blasfêmia\n2. **Romano**: Pôncio Pilatos — acusação: sedição\n3. **Herculano**: Herodes — acusação: nada ( Lucas 23:9)\n\nPôncio Pilatos lava as mãos: "Estou inocente do sangue deste justo" (Mateus 27:24). A ironia — ele é responsável, mesmo tentando se isentar.\n\n### Os Sete Últimos Ditos da Cruz\n\n1. "Pai, perdoa-lhes, porque não sabem o que fazem" (Lucas 23:34)\n2. "Em verdade te digo: hoje estarás comigo no paraíso" (Lucas 23:43)\n3. "Mulher, eis o teu filho... Eis a tua mãe" (João 19:26-27)\n4. "Deus meu, Deus meu, por que me desamparaste?" (Mateus 27:46)\n5. "Tenho sede" (João 19:28)\n6. "Está consumado" (João 19:30)\n7. "Pai, nas tuas mãos entrego o meu espírito" (Lucas 23:46)\n\n### A escuridão\n\n"Houve trevas sobre toda a terra, desde a hora sexta até à hora nona" (Mateus 27:45). A escuridão durante 3 horas é sobrenatural — o Sol se esconde diante do sofrimento do Filho.\n\n### A morte\n\n"Jesus, clamando outra vez com grande voz, rendeu o espírito" (Mateus 27:50). Nota: Ele não foi morto — Ele entregou o espírito. Jesus teve controle total até o fim.\n\n### O véu do templo\n\n"E eis que o véu do templo se rasgou em dois, de cima até baixo" (Mateus 27:51). O véu separava o Santo dos Santos. Seu rasgar significa: o caminho para Deus está aberto. A mediação sacerdotal de Cristo é completa.\n\n### A ressurreição\n\n"Não está aqui, porque ressuscitou" (Mateus 28:6). A ressurreição é o atestado divino de que o sacrifício de Jesus foi aceito. Sem ressurreição, não há salvação (1 Coríntios 15:17).\n\n### Aplicação\n\nA cruz é o centro de tudo:\n- Justiça: Deus paga o pecado\n- Graça: Deus perdoa o pecador\n- Amor: Deus se entrega por nós\n- Vitória: O mal é derrotado\n\n"Na cruz, Deus estava reconciliando consigo o mundo" (2 Coríntios 5:19).',
          versículosChave: [
            { ref: 'Mateus 27:51', texto: 'O véu do templo se rasgou em dois, de cima até baixo.' },
            { ref: 'Lucas 23:46', texto: 'Pai, nas tuas mãos entrego o meu espírito.' },
            { ref: 'Mateus 28:5-6', texto: 'Não está aqui, porque ressuscitou, como disse.' },
            { ref: 'João 19:30', texto: 'Está consumado.' },
          ],
        },
      ],
    },
    {
      id: 'mod-jesus-ressurreicao',
      título: 'Ressurreição e Ascensão',
      descrição: 'Aparecimentos, comissão, ascensão',
      ícone: '🌟',
      aulas: [
        {
          id: 'aula-jesus-5-1',
          título: 'A Ressurreição e a Ascensão',
          tipo: 'texto',
          duração: '12 min',
          conteúdo: '## A Ressurreição e a Ascensão\n\nA ressurreição é o evento mais importante da história. Sem ela, o cristianismo não existe.\n\n### O túmulo vazio\n\nMaria Madalena vai ao túmulo e encontra a pedra removida (João 20:1). Pedro e João correm e encontram os panos de linho (20:6-7). O lenço da cabeça estava dobrado em lugar de lado — não haviaPressa, não havia roubo.\n\n### Aos poucos,Jesus se revela\n\n1. **Maria Madalena** — confunde com o jardineiro até Jesus chamar seu nome (João 20:16)\n2. **As mulheres** — correm com alegria (Mateus 28:8)\n3. **Pedro** — Jesus aparece pessoalmente (Lucas 24:34)\n4. **Os dois de Emaús** — Jesus anda e ensina as Escrituras (Lucas 24:13-35)\n5. **Os discípulos** — Jesus aparece e mostra as mãos e os pés (Lucas 24:36-43)\n6. **Tomé** — duvida, mas ao ver, crê: "Meu Senhor e meu Deus!" (João 20:24-29)\n\n### O corpo ressuscitado\n\nO corpo de Jesus era:\n- **Real**: Podia ser tocado (João 20:27)\n- **Comestível**: Comeu peixe (Lucas 24:42-43)\n- **Transmutável**: Apareceu em lugar fechado (João 20:19)\n- **Reconhecível**: Mostrou as marcas (João 20:20)\n\n### A comissão\n\n"Portanto, ide, fazei discípulos de todas as nações, batizando-os em nome do Pai, do Filho e do Espírito Santo, ensinando-os a guardar todas as coisas que vos tenho mandado" (Mateus 28:19-20).\n\nA comissão inclui:\n1. **Ir** — não ficar parado\n2. **Fazer discípulos** — não apenas convertidos\n3. **Batizar** — incorporação à igreja\n4. **Ensinar** — obediência a tudo\n5. **Promessa**: "Eu convosco sou todos os dias, até à consumação do século" (28:20)\n\n### A ascensão\n\n"Tendo dito isto, e他们 vendo, foi elevado para o céu, e uma nuvem o recebeu, impedindo os seus olhos de vê-lo" (Atos 1:9). A ascensão:\n\n1. **Preparação**: Jesus sobe ao céu para preparar lugar (João 14:2)\n2. **Intercessão**: Agora Jesus intercede por nós (Hebreus 7:25)\n3. **Envio**: O Espírito Santo é prometido (Atos 1:8)\n4. **Volta**: "Assim como o vistes ir, assim virá" (Atos 1:11)\n\n### Aplicação\n\nA ressurreição não é uma metáfora — é um fato histórico. É por ela que:\n1. Temos esperança de vida eterna\n2. Nossa fé tem fundamento\n3. O pecado foi derrotado\n4. A criação será restaurada\n\n"Se Cristo não ressuscitou, vã é a vossa fé" (1 Coríntios 15:17). Mas Ele ressuscitou — e isso muda tudo.',
          versículosChave: [
            { ref: 'Mateus 28:5-6', texto: 'Não está aqui, porque ressuscitou, como disse.' },
            { ref: 'João 20:29', texto: 'Porque me viste, creste; bem-aventurados os que não viram e creram.' },
            { ref: 'Atos 1:9', texto: 'Foi elevado para o céu, e uma nuvem o recebeu.' },
            { ref: '1 Coríntios 15:14', texto: 'Se Cristo não ressuscitou, vã é a nossa pregação, e vã é a vossa fé.' },
          ],
        },
      ],
    },
  ],
};
