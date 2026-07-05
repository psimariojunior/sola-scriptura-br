export interface Personagem {
  id: string;
  nome: string;
  nomeOriginal: string;
  significadoNome: string;
  categoria: string;
  biografia: string;
  primeiraMencao: string;
  eventosPrincipais: string[];
  referencias: string[];
  citacoesChave?: string[];
  notasAdicionais?: string;
  parentes?: Record<string, string | undefined>;
}

export const PERSONAGENS: Personagem[] = [
  {
    id: "adao",
    nome: "Adão",
    nomeOriginal: "אדם",
    significadoNome: "Homem, terra, solo",
    categoria: "Figura do AT",
    biografia: "Adão foi o primeiro homem criado por Deus do pó da terra. Ele e sua esposa Eva foram colocados no Jardim do Éden, mas desobedeceram a Deus ao comer do fruto proibido, trazendo o pecado ao mundo. É considerado o pai da humanidade e antepassado de toda a raça humana.",
    primeiraMencao: "Gênesis 1:26-27",
    eventosPrincipais: [
      "Criação do pó da terra por Deus",
      "Colocado no Jardim do Éden para cultivá-lo",
      "Nomeação de todos os animais",
      "Queda ao comer do fruto proibido",
      "Expulsão do Jardim do Éden"
    ],
    referencias: ["Gênesis 1:26-5:5", "1 Crônicas 1:1", "Lucas 3:38", "Romanos 5:12-14"],
    citacoesChave: ["A mulher que me deste por companheira, ela me deu da árvore, e eu comi."],
    parentes: { pai: "Criado por Deus", conjugue: "Eva", filhos: "Caim, Abel, Sete" }
  },
  {
    id: "eva",
    nome: "Eva",
    nomeOriginal: "חוה",
    significadoNome: "Mãe de todos os viventes, vida",
    categoria: "Figura do AT",
    biografia: "Eva foi a primeira mulher, criada por Deus a partir da costela de Adão. Ela foi enganada pela serpente no Jardim do Éden e comeu do fruto proibido, dando também a Adão. Tornou-se mãe de Caim, Abel e Sete, entre outros filhos.",
    primeiraMencao: "Gênesis 2:21-22",
    eventosPrincipais: [
      "Criação a partir da costela de Adão",
      "Tentação pela serpente e queda",
      "Maternidade de Caim e Abel",
      "Nascimento de Sete após a morte de Abel"
    ],
    referencias: ["Gênesis 2:21-4:25", "2 Coríntios 11:3", "1 Timóteo 2:13-14"],
    parentes: { conjugue: "Adão", filhos: "Caim, Abel, Sete" }
  },
  {
    id: "caim",
    nome: "Caim",
    nomeOriginal: "קין",
    significadoNome: "Possessão, adquirido",
    categoria: "Figura do AT",
    biografia: "Caim foi o primogênito de Adão e Eva, um lavrador que matou seu irmão Abel por ciúmes. Tornou-se o primeiro homicida da história e foi amaldiçoado por Deus a ser fugitivo errante pela terra. Deus colocou um sinal nele para protegê-lo de ser morto.",
    primeiraMencao: "Gênesis 4:1",
    eventosPrincipais: [
      "Nascimento como primogênito de Adão e Eva",
      "Oferta rejeitada por Deus enquanto a de Abel foi aceita",
      "Assassinato de Abel por ciúmes",
      "Maldição e exílio para a terra de Node"
    ],
    referencias: ["Gênesis 4:1-24", "Hebreus 11:4", "1 João 3:12", "Judas 1:11"],
    citacoesChave: ["É maior a minha maldade que a que possa ser perdoada."],
    parentes: { pai: "Adão", mae: "Eva", irmaos: "Abel, Sete", filhos: "Enoque" }
  },
  {
    id: "abel",
    nome: "Abel",
    nomeOriginal: "הבל",
    significadoNome: "Vaidade, sopro, vapor",
    categoria: "Figura do AT",
    biografia: "Abel foi o segundo filho de Adão e Eva, um pastor de ovelhas cuja oferta foi aceita por Deus. Foi morto por seu irmão Caim por inveja. É mencionado no Novo Testamento como exemplo de justiça e fé.",
    primeiraMencao: "Gênesis 4:2",
    eventosPrincipais: [
      "Oferta de cordeiro aceita por Deus",
      "Assassinato por seu irmão Caim",
      "Sangue que clama a Deus da terra"
    ],
    referencias: ["Gênesis 4:2-10", "Mateus 23:35", "Hebreus 11:4", "Hebreus 12:24"],
    parentes: { pai: "Adão", mae: "Eva", irmaos: "Caim, Sete" }
  },
  {
    id: "sete",
    nome: "Sete",
    nomeOriginal: "שת",
    significadoNome: "Substituto, colocado, apontado",
    categoria: "Figura do AT",
    biografia: "Sete foi o terceiro filho de Adão e Eva, nascido após a morte de Abel como substituto. Através de sua linhagem nasceu Noé e posteriormente Abraão. Sua descendência é conhecida como os 'filhos de Deus' em contraste com os descendentes de Caim.",
    primeiraMencao: "Gênesis 4:25",
    eventosPrincipais: [
      "Nascimento como substituto de Abel",
      "Pai da linhagem piedosa",
      "Antepassado de Noé e Abraão"
    ],
    referencias: ["Gênesis 4:25-5:8", "1 Crônicas 1:1", "Lucas 3:38"],
    parentes: { pai: "Adão", mae: "Eva", irmaos: "Caim, Abel", filhos: "Enos" }
  },
  {
    id: "enoque",
    nome: "Enoque",
    nomeOriginal: "חנוך",
    significadoNome: "Dedicado, iniciado, consagrado",
    categoria: "Figura do AT",
    biografia: "Enoque foi um homem justo que andou com Deus e foi levado diretamente ao céu sem experimentar a morte. Ele é um dos dois homens na Bíblia que não morreram (junto com Elias). Profetizou sobre a vinda do Senhor com seus santos.",
    primeiraMencao: "Gênesis 5:18",
    eventosPrincipais: [
      "Andou com Deus por 300 anos",
      "Foi trasladado ao céu sem morrer",
      "Profetizou sobre o juízo vindouro"
    ],
    referencias: ["Gênesis 5:18-24", "Hebreus 11:5", "Judas 1:14-15"],
    citacoesChave: ["Eis que vem o Senhor com milhares de seus santos."],
    parentes: { pai: "Jarede", filhos: "Matusalém" }
  },
  {
    id: "matusalem",
    nome: "Matusalém",
    nomeOriginal: "מתושלח",
    significadoNome: "Homem do dardo, quando ele morrer virá",
    categoria: "Figura do AT",
    biografia: "Matusalém foi o filho de Enoque e pai de Lameque, conhecido como o homem que viveu mais tempo na história bíblica: 969 anos. Seu nome está associado à profecia de que o dilúvio viria após sua morte.",
    primeiraMencao: "Gênesis 5:21",
    eventosPrincipais: [
      "Viveu 969 anos, a maior longevidade registrada",
      "Filho de Enoque e pai de Lameque",
      "Morreu no ano do Dilúvio"
    ],
    referencias: ["Gênesis 5:21-27", "1 Crônicas 1:3", "Lucas 3:37"],
    parentes: { pai: "Enoque", filhos: "Lameque" }
  },
  {
    id: "noe",
    nome: "Noé",
    nomeOriginal: "נח",
    significadoNome: "Descanso, consolação",
    categoria: "Figura do AT",
    biografia: "Noé foi um homem justo e íntegro em sua geração que encontrou graça diante de Deus. Deus o instruiu a construir uma arca para salvar sua família e os animais do Dilúvio universal. Após o dilúvio, Deus estabeleceu uma aliança com ele simbolizada pelo arco-íris.",
    primeiraMencao: "Gênesis 5:28-29",
    eventosPrincipais: [
      "Construção da arca conforme instruções divinas",
      "Dilúvio universal que cobriu toda a terra",
      "Aliança de Deus com Noé e o arco-íris",
      "Embriaguez e nudez após o dilúvio"
    ],
    referencias: ["Gênesis 6:1-9:29", "Mateus 24:37-38", "Hebreus 11:7", "1 Pedro 3:20"],
    citacoesChave: ["Este nos consolará acerca de nossas obras e do trabalho de nossas mãos."],
    parentes: { pai: "Lameque", filhos: "Sem, Cam, Jafé" }
  },
  {
    id: "sem",
    nome: "Sem",
    nomeOriginal: "שם",
    significadoNome: "Nome, fama, renome",
    categoria: "Figura do AT",
    biografia: "Sem foi o filho primogênito de Noé que, junto com Jafé, cobriu a nudez do pai. Através de sua linhagem nasceram os povos semitas, incluindo Abraão e o povo de Israel. Viveu 600 anos e foi abençoado por Noé como herdeiro das promessas divinas.",
    primeiraMencao: "Gênesis 5:32",
    eventosPrincipais: [
      "Filho abençoado por Noé",
      "Cobriu a nudez do pai com Jafé",
      "Antepassado de Abraão e do povo hebreu"
    ],
    referencias: ["Gênesis 5:32", "Gênesis 9:18-27", "Gênesis 10:21-31", "Gênesis 11:10-26"],
    parentes: { pai: "Noé", mae: "Esposa de Noé", irmaos: "Cam, Jafé", filhos: "Elão, Assur, Arfaxade, Lude, Arã" }
  },
  {
    id: "cam",
    nome: "Cam",
    nomeOriginal: "חם",
    significadoNome: "Quente, queimado, moreno",
    categoria: "Figura do AT",
    biografia: "Cam foi o segundo filho de Noé que viu a nudez do pai embriagado e o contou a seus irmãos. Por este ato, seu filho Canaã foi amaldiçoado por Noé. É considerado o progenitor dos povos cananeus, egípcios e africanos.",
    primeiraMencao: "Gênesis 5:32",
    eventosPrincipais: [
      "Viu a nudez de Noé e contou aos irmãos",
      "Recebeu a maldição sobre seu filho Canaã",
      "Progenitor dos povos cananeus e egípcios"
    ],
    referencias: ["Gênesis 5:32", "Gênesis 9:18-25", "Gênesis 10:6-20"],
    parentes: { pai: "Noé", mae: "Esposa de Noé", irmaos: "Sem, Jafé", filhos: "Cuxe, Mizraim, Pute, Canaã" }
  },
  {
    id: "jafe",
    nome: "Jafé",
    nomeOriginal: "יפת",
    significadoNome: "Expansão, aberto, que Deus engrandeça",
    categoria: "Figura do AT",
    biografia: "Jafé foi o terceiro filho de Noé que, com Sem, cobriu a nudez do pai sem olhar. Recebeu a bênção de Noé de que Deus expandiria seu território e habitaria nas tendas de Sem. É considerado progenitor dos povos indo-europeus.",
    primeiraMencao: "Gênesis 5:32",
    eventosPrincipais: [
      "Cobriu a nudez de Noé com Sem sem olhar",
      "Abençoado com expansão e habitação nas tendas de Sem"
    ],
    referencias: ["Gênesis 5:32", "Gênesis 9:18-27", "Gênesis 10:2-5"],
    parentes: { pai: "Noé", mae: "Esposa de Noé", irmaos: "Sem, Cam", filhos: "Gomer, Magogue, Madai, Javã, Tubal, Meseque, Tiras" }
  },
  {
    id: "abraao",
    nome: "Abraão",
    nomeOriginal: "אברהם",
    significadoNome: "Pai de multidão (originalmente: Pai excelso)",
    categoria: "Patriarca",
    biografia: "Abraão é o patriarca do povo de Israel, chamado por Deus para deixar sua terra e ir para Canaã. Deus fez aliança com ele, prometendo-lhe descendência numerosa e terra. Sua fé foi provada quando Deus lhe pediu que sacrificasse seu filho Isaque. É considerado pai de todos os que creem.",
    primeiraMencao: "Gênesis 11:26",
    eventosPrincipais: [
      "Chamado de Deus para sair de Ur dos Caldeus",
      "Aliança com Deus e promessa de descendência",
      "Nascimento de Isaque na velhice",
      "Provação do sacrifício de Isaque no Moriá",
      "Sepultamento de Sara e compra da caverna de Macpela"
    ],
    referencias: ["Gênesis 12:1-25:11", "Romanos 4:1-25", "Hebreus 11:8-19", "Gálatas 3:6-9"],
    citacoesChave: ["Creu Abraão em Deus, e isso lhe foi imputado como justiça."],
    parentes: { pai: "Tera", irmaos: "Naor, Harã", conjugue: "Sara, Agar, Quetura", filhos: "Ismael, Isaque, Zinrã, Jocsã, Medã, Midiã, Isbaque, Suá" }
  },
  {
    id: "sara",
    nome: "Sara",
    nomeOriginal: "שרה",
    significadoNome: "Princesa, nobre",
    categoria: "Figura do AT",
    biografia: "Sara foi a esposa de Abraão e mãe de Isaque, inicialmente estéril até Deus milagrosamente lhe conceder um filho na velhice. Ela riu quando ouviu a promessa, mas depois se alegrou com o nascimento de Isaque. É lembrada como exemplo de fé e submissão no Novo Testamento.",
    primeiraMencao: "Gênesis 11:29",
    eventosPrincipais: [
      "Casamento com Abraão em Ur dos Caldeus",
      "Riso ao ouvir a promessa do filho",
      "Nascimento de Isaque aos 90 anos",
      "Expulsão de Agar e Ismael"
    ],
    referencias: ["Gênesis 11:29-23:19", "Hebreus 11:11", "1 Pedro 3:6"],
    parentes: { conjugue: "Abraão", filhos: "Isaque" }
  },
  {
    id: "isaque",
    nome: "Isaque",
    nomeOriginal: "יצחק",
    significadoNome: "Ele ri, riso",
    categoria: "Patriarca",
    biografia: "Isaque foi o filho prometido a Abraão e Sara, nascido milagrosamente na velhice de seus pais. Foi quase sacrificado por seu pai no Monte Moriá, mas Deus proveu um cordeiro substituto. Casou-se com Rebeca e gerou os gêmeos Esaú e Jacó. Viveu como pastor em Gerar e Berseba.",
    primeiraMencao: "Gênesis 17:19",
    eventosPrincipais: [
      "Nascimento milagroso na velhice de seus pais",
      "Quase sacrificado por Abraão no Monte Moriá",
      "Casamento com Rebeca",
      "Nascimento dos gêmeos Esaú e Jacó",
      "Abertura de poços em Gerar"
    ],
    referencias: ["Gênesis 21:1-35:29", "Romanos 9:7-9", "Hebreus 11:17-20"],
    parentes: { pai: "Abraão", mae: "Sara", irmaos: "Ismael (meio-irmão)", conjugue: "Rebeca", filhos: "Esaú, Jacó" }
  },
  {
    id: "rebeca",
    nome: "Rebeca",
    nomeOriginal: "רבקה",
    significadoNome: "Laço, corda, união",
    categoria: "Figura do AT",
    biografia: "Rebeca foi a esposa de Isaque, escolhida pelo servo de Abraão junto ao poço de Harã. Inicialmente estéril, concebeu os gêmeos Esaú e Jacó após oração. Ela ajudou Jacó a receber a bênção de Isaque no lugar de Esaú, cumprindo a profecia de que o mais velho serviria ao mais novo.",
    primeiraMencao: "Gênesis 22:23",
    eventosPrincipais: [
      "Escolhida como esposa para Isaque junto ao poço",
      "Concepção dos gêmeos após oração",
      "Plano para Jacó receber a bênção paterna"
    ],
    referencias: ["Gênesis 24:1-67", "Gênesis 25:21-28", "Gênesis 27:1-46", "Romanos 9:10-12"],
    parentes: { pai: "Betuel", irmaos: "Labão", conjugue: "Isaque", filhos: "Esaú, Jacó" }
  },
  {
    id: "jaco",
    nome: "Jacó",
    nomeOriginal: "יעקב",
    significadoNome: "Aquele que segura o calcanhar, suplantador",
    categoria: "Patriarca",
    biografia: "Jacó foi o filho gêmeo mais novo de Isaque e Rebeca, que recebeu a bênção paterna no lugar de Esaú. Teve um encontro com Deus em Betel e serviu a Labão por 14 anos para casar-se com Raquel e Lia. Seu nome foi mudado para Israel após lutar com Deus no vau de Jaboque.",
    primeiraMencao: "Gênesis 25:26",
    eventosPrincipais: [
      "Recebeu a bênção de Isaque no lugar de Esaú",
      "Sonho da escada de Jacó em Betel",
      "Serviu a Labão por Léia e Raquel",
      "Luta com o anjo no Jaboque e mudança de nome para Israel",
      "Reencontro com Esaú e reconciliação"
    ],
    referencias: ["Gênesis 25:21-35:29", "Gênesis 46:1-49:33", "Oséias 12:3-5", "Romanos 9:11-13"],
    citacoesChave: ["Não te deixarei ir se não me abençoares."],
    parentes: { pai: "Isaque", mae: "Rebeca", irmaos: "Esaú", conjugue: "Lia, Raquel, Bila, Zilpa", filhos: "Rúben, Simeão, Levi, Judá, Dã, Naftali, Gade, Aser, Issacar, Zebulom, José, Benjamim" }
  },
  {
    id: "raquel",
    nome: "Raquel",
    nomeOriginal: "רחל",
    significadoNome: "Ovelha, cordeira",
    categoria: "Figura do AT",
    biografia: "Raquel foi a esposa amada de Jacó, filha mais nova de Labão. Jacó serviu 14 anos para casar-se com ela, mas foi enganado por Labão que lhe deu Lia primeiro. Era estéril por muitos anos, mas Deus finalmente lhe concedeu José e Benjamim. Morreu ao dar à luz Benjamim.",
    primeiraMencao: "Gênesis 29:6",
    eventosPrincipais: [
      "Encontro com Jacó no poço de Harã",
      "Casamento com Jacó após 14 anos de serviço",
      "Disputa com Lia pela atenção de Jacó",
      "Nascimento de José após longa esterilidade",
      "Morte no parto de Benjamim"
    ],
    referencias: ["Gênesis 29:1-35:20", "Jeremias 31:15", "Mateus 2:18"],
    parentes: { pai: "Labão", irmaos: "Lia", conjugue: "Jacó", filhos: "José, Benjamim" }
  },
  {
    id: "lia",
    nome: "Lia",
    nomeOriginal: "לאה",
    significadoNome: "Vaca selvagem, cansada",
    categoria: "Figura do AT",
    biografia: "Lia foi a primeira esposa de Jacó, dada em casamento por seu pai Labão através de um engano. Embora não fosse tão amada quanto Raquel, Deus a abençoou com muitos filhos. Ela deu à luz seis dos doze filhos de Jacó: Rúben, Simeão, Levi, Judá, Issacar e Zebulom.",
    primeiraMencao: "Gênesis 29:16",
    eventosPrincipais: [
      "Casamento com Jacó por engano de Labão",
      "Nascimento de seis filhos e uma filha",
      "Compra de mandrágoras de Raquel"
    ],
    referencias: ["Gênesis 29:16-30:21", "Gênesis 34:1", "Rute 4:11"],
    parentes: { pai: "Labão", irmaos: "Raquel", conjugue: "Jacó", filhos: "Rúben, Simeão, Levi, Judá, Issacar, Zebulom, Diná" }
  },
  {
    id: "jose",
    nome: "José",
    nomeOriginal: "יוסף",
    significadoNome: "Ele acrescentará, acréscimo",
    categoria: "Líder",
    biografia: "José foi o filho favorito de Jacó e Raquel, vendido como escravo pelos próprios irmãos por inveja. No Egito, serviu na casa de Potifar e foi preso injustamente, mas Deus o exaltou a governador do Egito. Durante a fome, salvou sua família e trouxe os israelitas para viver no Egito.",
    primeiraMencao: "Gênesis 30:24",
    eventosPrincipais: [
      "Sonhos proféticos de liderança sobre sua família",
      "Vendido como escravo pelos irmãos ao Egito",
      "Servo na casa de Potifar e prisão injusta",
      "Interpretação dos sonhos de Faraó e promoção a governador",
      "Reencontro e reconciliação com seus irmãos"
    ],
    referencias: ["Gênesis 37:1-50:26", "Êxodo 1:5-8", "Hebreus 11:22", "Atos 7:9-14"],
    citacoesChave: ["Vós bem intentastes mal contra mim, porém Deus o tornou em bem."],
    parentes: { pai: "Jacó", mae: "Raquel", irmaos: "Rúben, Simeão, Levi, Judá, Dã, Naftali, Gade, Aser, Issacar, Zebulom, Benjamim", conjugue: "Asenate", filhos: "Manassés, Efraim" }
  },
  {
    id: "asenate",
    nome: "Asenate",
    nomeOriginal: "אסנת",
    significadoNome: "Pertencente a Neite (deusa egípcia)",
    categoria: "Figura do AT",
    biografia: "Asenate foi a esposa egípcia de José, filha de Potífera, sacerdote de Om. Faraó a deu em casamento a José quando ele se tornou governador do Egito. Ela deu à luz Manassés e Efraim, que se tornaram duas tribos de Israel.",
    primeiraMencao: "Gênesis 41:45",
    eventosPrincipais: [
      "Casamento com José arranjado por Faraó",
      "Maternidade de Manassés e Efraim"
    ],
    referencias: ["Gênesis 41:45-52", "Gênesis 46:20"],
    parentes: { pai: "Potífera", conjugue: "José", filhos: "Manassés, Efraim" }
  },
  {
    id: "manasses",
    nome: "Manassés",
    nomeOriginal: "מנשה",
    significadoNome: "Aquele que faz esquecer",
    categoria: "Figura do AT",
    biografia: "Manassés foi o primogênito de José e Asenate no Egito. Junto com seu irmão Efraim, foi adotado por Jacó como seus próprios filhos, recebendo direito de tribo. Jacó cruzou as mãos ao abençoá-los, dando a primazia a Efraim.",
    primeiraMencao: "Gênesis 41:51",
    eventosPrincipais: [
      "Nascimento no Egito como filho de José",
      "Adotado por Jacó como filho",
      "Recebeu bênção de Jacó com Efraim"
    ],
    referencias: ["Gênesis 41:51", "Gênesis 48:1-20", "Números 1:34-35", "Josué 17:1-18"],
    parentes: { pai: "José", mae: "Asenate", irmaos: "Efraim" }
  },
  {
    id: "efraim",
    nome: "Efraim",
    nomeOriginal: "אפרים",
    significadoNome: "Fruto dobrado, fértil",
    categoria: "Figura do AT",
    biografia: "Efraim foi o segundo filho de José e Asenate, que recebeu a bênção da primogenitura de Jacó quando este cruzou as mãos propositalmente. Sua tribo tornou-se a mais poderosa das dez tribos do norte, e seu nome frequentemente representa todo o Reino do Norte.",
    primeiraMencao: "Gênesis 41:52",
    eventosPrincipais: [
      "Nascimento no Egito",
      "Bênção preferencial de Jacó sobre Manassés",
      "Tornou-se a tribo líder do Reino do Norte"
    ],
    referencias: ["Gênesis 41:52", "Gênesis 48:1-20", "Oséias 4:17", "Oséias 11:3-8"],
    parentes: { pai: "José", mae: "Asenate", irmaos: "Manassés" }
  },
  {
    id: "juda",
    nome: "Judá",
    nomeOriginal: "יהודה",
    significadoNome: "Louvor, louvado",
    categoria: "Figura do AT",
    biografia: "Judá foi o quarto filho de Jacó e Lia, líder entre os irmãos que propôs vender José em vez de matá-lo. Ele garantiu a segurança de Benjamim no Egito e ofereceu-se como escravo no lugar dele. Dele descendeu Davi e Jesus Cristo, sendo a tribo real de Israel.",
    primeiraMencao: "Gênesis 29:35",
    eventosPrincipais: [
      "Nascimento como quarto filho de Lia",
      "Proposta de vender José em vez de matá-lo",
      "Relacionamento com Tamar e nascimento de Perez",
      "Garantia a Jacó pela segurança de Benjamim",
      "Oferta como escravo no lugar de Benjamim"
    ],
    referencias: ["Gênesis 29:35", "Gênesis 37:26-27", "Gênesis 38:1-30", "Gênesis 43:3-10", "Gênesis 44:18-34"],
    citacoesChave: ["Que lucro haverá em matar nosso irmão e esconder o seu sangue?"],
    parentes: { pai: "Jacó", mae: "Lia", irmaos: "Rúben, Simeão, Levi, Issacar, Zebulom, José, Benjamim", filhos: "Er, Onã, Selá, Perez, Zerá" }
  },
  {
    id: "levi",
    nome: "Levi",
    nomeOriginal: "לוי",
    significadoNome: "Unido, ligado",
    categoria: "Figura do AT",
    biografia: "Levi foi o terceiro filho de Jacó e Lia, pai da tribo sacerdotal de Israel. Ele e Simeão vingaram sua irmã Diná massacrando os homens de Siquém. A tribo de Levi foi escolhida por Deus para o serviço sacerdotal e não recebeu herança territorial, pois Deus era sua herança.",
    primeiraMencao: "Gênesis 29:34",
    eventosPrincipais: [
      "Vingança contra Siquém pela honra de Diná",
      "Tribo escolhida para o sacerdócio",
      "Sem herança territorial, Deus como herança"
    ],
    referencias: ["Gênesis 29:34", "Gênesis 34:25-31", "Números 3:5-13", "Deuteronômio 10:8-9"],
    parentes: { pai: "Jacó", mae: "Lia", irmaos: "Rúben, Simeão, Judá, Issacar, Zebulom, José, Benjamim", filhos: "Gérson, Coate, Merari" }
  },
  {
    id: "simeao",
    nome: "Simeão",
    nomeOriginal: "שמעון",
    significadoNome: "Ouvido, aquele que ouve",
    categoria: "Figura do AT",
    biografia: "Simeão foi o segundo filho de Jacó e Lia, conhecido por sua violência junto com Levi no massacre de Siquém. Jacó o amaldiçoou em seu leito de morte, dizendo que seria disperso em Israel. Sua tribo tornou-se pequena e foi absorvida por Judá.",
    primeiraMencao: "Gênesis 29:33",
    eventosPrincipais: [
      "Massacre de Siquém com Levi",
      "Refém de José no Egito para garantir a volta dos irmãos",
      "Maldição de Jacó sobre sua descendência"
    ],
    referencias: ["Gênesis 29:33", "Gênesis 34:25-31", "Gênesis 42:24", "Gênesis 49:5-7"],
    parentes: { pai: "Jacó", mae: "Lia", irmaos: "Rúben, Levi, Judá, Issacar, Zebulom, José, Benjamim" }
  },
  {
    id: "rubem",
    nome: "Rúben",
    nomeOriginal: "ראובן",
    significadoNome: "Eis um filho, vede um filho",
    categoria: "Figura do AT",
    biografia: "Rúben foi o primogênito de Jacó e Lia, que perdeu o direito de primogenitura por deitar-se com Bila, concubina de seu pai. Ele tentou salvar José quando os irmãos planejaram matá-lo, sugerindo que o jogassem numa cisterna. Sua tribo estabeleceu-se a leste do Jordão.",
    primeiraMencao: "Gênesis 29:32",
    eventosPrincipais: [
      "Primogênito de Jacó que perdeu a primogenitura",
      "Tentativa de salvar José da morte",
      "Oferta dos filhos como garantia por Benjamim"
    ],
    referencias: ["Gênesis 29:32", "Gênesis 35:22", "Gênesis 37:21-22", "Gênesis 42:37", "Gênesis 49:3-4"],
    parentes: { pai: "Jacó", mae: "Lia", irmaos: "Simeão, Levi, Judá, Issacar, Zebulom, José, Benjamim" }
  },
  {
    id: "benjamim",
    nome: "Benjamim",
    nomeOriginal: "בנימין",
    significadoNome: "Filho da mão direita, filho da felicidade",
    categoria: "Figura do AT",
    biografia: "Benjamim foi o filho mais novo de Jacó e Raquel, nascido próximo a Belém onde Raquel morreu no parto. Jacó o amava profundamente e relutou em enviá-lo ao Egito. Sua tribo foi a menor de Israel, mas produziu o primeiro rei Saul e o apóstolo Paulo.",
    primeiraMencao: "Gênesis 35:18",
    eventosPrincipais: [
      "Nascimento próximo a Belém com morte de Raquel",
      "Amado por Jacó como filho da velhice",
      "Viagem ao Egito e encontro com José"
    ],
    referencias: ["Gênesis 35:16-20", "Gênesis 42:1-38", "Gênesis 43:1-34", "Gênesis 45:14-15"],
    parentes: { pai: "Jacó", mae: "Raquel", irmaos: "José, Rúben, Simeão, Levi, Judá, Issacar, Zebulom" }
  },
  {
    id: "lo",
    nome: "Ló",
    nomeOriginal: "לוט",
    significadoNome: "Coberto, véu",
    categoria: "Figura do AT",
    biografia: "Ló foi o sobrinho de Abraão que o acompanhou de Ur a Canaã. Separou-se de Abraão por causa de disputas entre seus pastores e escolheu habitar na região de Sodoma. Durante a destruição das cidades, foi salvo pelos anjos, mas sua esposa olhou para trás e tornou-se uma estátua de sal.",
    primeiraMencao: "Gênesis 11:27",
    eventosPrincipais: [
      "Separação de Abraão e escolha da planície do Jordão",
      "Resgate por Abraão após ser capturado por reis",
      "Hospitalidade aos anjos em Sodoma",
      "Fuga de Sodoma antes da destruição",
      "Morte da esposa transformada em estátua de sal"
    ],
    referencias: ["Gênesis 11:27-14:16", "Gênesis 19:1-36", "2 Pedro 2:7-8", "Lucas 17:28-32"],
    parentes: { pai: "Harã", conjugue: "Esposa de Ló", filhos: "Moabe, Ben-Ami" }
  },
  {
    id: "agar",
    nome: "Agar",
    nomeOriginal: "הגר",
    significadoNome: "Fuga, estrangeira",
    categoria: "Figura do AT",
    biografia: "Agar foi a serva egípcia de Sara que se tornou concubina de Abraão quando Sara era estéril. Após engravidar, desprezou Sara e foi maltratada, fugindo para o deserto. Um anjo do Senhor a encontrou e ordenou que voltasse, prometendo-lhe uma grande descendência através de Ismael.",
    primeiraMencao: "Gênesis 16:1",
    eventosPrincipais: [
      "Tornou-se concubina de Abraão por iniciativa de Sara",
      "Fuga para o deserto e encontro com o anjo",
      "Nascimento de Ismael",
      "Expulsão definitiva com Ismael após o nascimento de Isaque"
    ],
    referencias: ["Gênesis 16:1-16", "Gênesis 21:9-21", "Gálatas 4:22-31"],
    parentes: { conjugue: "Abraão", filhos: "Ismael" }
  },
  {
    id: "ismael",
    nome: "Ismael",
    nomeOriginal: "ישמעאל",
    significadoNome: "Deus ouve, Deus ouvirá",
    categoria: "Figura do AT",
    biografia: "Ismael foi o primogênito de Abraão com Agar, cujo nome foi dado por um anjo que prometeu que ele seria um homem selvagem. Foi circuncidado aos 13 anos e expulso com sua mãe após o nascimento de Isaque. Tornou-se pai de doze príncipes e é considerado o ancestral dos povos árabes.",
    primeiraMencao: "Gênesis 16:11-12",
    eventosPrincipais: [
      "Nascimento como filho de Abraão e Agar",
      "Circuncisão aos 13 anos juntamente com Abraão",
      "Expulsão com Agar para o deserto de Berseba",
      "Proteção divina e promessa de grande nação",
      "Pai de doze príncipes"
    ],
    referencias: ["Gênesis 16:1-16", "Gênesis 17:18-26", "Gênesis 21:8-21", "Gênesis 25:12-18"],
    parentes: { pai: "Abraão", mae: "Agar", irmaos: "Isaque (meio-irmão)", filhos: "Nebaiote, Quedar, Adbeel, Mibsão, Misma, Dumá, Massá, Hadade, Tema, Jetur, Nafis, Quedemá" }
  },
  {
    id: "esau",
    nome: "Esaú",
    nomeOriginal: "עשו",
    significadoNome: "Peludo, cabeludo",
    categoria: "Figura do AT",
    biografia: "Esaú foi o filho primogênito de Isaque e Rebeca, irmão gêmeo de Jacó, um hábil caçador. Vendeu seu direito de primogenitura a Jacó por um prato de lentilhas e depois perdeu a bênção paterna. Apesar da rivalidade, reconciliou-se com Jacó anos depois. É considerado o ancestral dos edomitas.",
    primeiraMencao: "Gênesis 25:25",
    eventosPrincipais: [
      "Nascimento como primogênito de Isaque",
      "Venda da primogenitura por um prato de lentilhas",
      "Perda da bênção paterna para Jacó",
      "Casamento com mulheres hititas que desagradaram seus pais",
      "Reconciliação com Jacó"
    ],
    referencias: ["Gênesis 25:25-34", "Gênesis 27:1-46", "Gênesis 33:1-16", "Malaquias 1:2-3", "Romanos 9:13"],
    citacoesChave: ["Eis que vou morrer, para que me serve a primogenitura?"],
    parentes: { pai: "Isaque", mae: "Rebeca", irmaos: "Jacó", conjugue: "Ada, Aolibama, Basemate", filhos: "Elifaz, Reuel, Jeús, Jalão, Corá" }
  },
  {
    id: "jo",
    nome: "Jó",
    nomeOriginal: "איוב",
    significadoNome: "Onde está o pai? Ou perseguido",
    categoria: "Figura do AT",
    biografia: "Jó foi um homem justo e íntegro de Uz que perdeu tudo - filhos, riquezas e saúde - em provações permitidas por Deus para testar sua fé. Apesar dos conselhos de sua esposa e amigos, manteve sua integridade. No final, Deus restaurou sua sorte e o abençoou duplamente.",
    primeiraMencao: "Jó 1:1",
    eventosPrincipais: [
      "Perda de todos os filhos e bens em um dia",
      "Ferido com chagas malignas da cabeça aos pés",
      "Diálogos com Elifaz, Bildade e Zofar",
      "Manifestação de Deus do meio do redemoinho",
      "Restauração dupla de tudo que perdeu"
    ],
    referencias: ["Jó 1:1-42:17", "Ezequiel 14:14-20", "Tiago 5:11"],
    citacoesChave: ["Nu saí do ventre de minha mãe e nu tornarei para lá; o Senhor o deu e o Senhor o tomou; bendito seja o nome do Senhor."],
    parentes: { conjugue: "Esposa de Jó", filhos: "7 filhos, 3 filhas (primeiros); 7 filhos, 3 filhas (restaurados)" }
  },
  {
    id: "eli",
    nome: "Eliú",
    nomeOriginal: "אליהוא",
    significadoNome: "Ele é meu Deus, Deus é Ele",
    categoria: "Figura do AT",
    biografia: "Eliú foi o mais jovem dos quatro amigos de Jó, filho de Baraquel, o buzita. Ele se irritou com Jó por justificar-se mais a Deus do que a si mesmo e com os três amigos por não terem resposta. Ele discursou sobre a disciplina de Deus e a grandeza divina antes da manifestação do Senhor.",
    primeiraMencao: "Jó 32:2",
    eventosPrincipais: [
      "Irritação com Jó e seus três amigos",
      "Discursos sobre o sofrimento como disciplina divina",
      "Anúncio da tempestade que precedeu a fala de Deus"
    ],
    referencias: ["Jó 32:1-37:24"],
    parentes: { pai: "Baraquel" }
  },
  {
    id: "bildade",
    nome: "Bildade",
    nomeOriginal: "בלדד",
    significadoNome: "Filho de contenda, senhor da disputa",
    categoria: "Figura do AT",
    biografia: "Bildade, o suíta, foi um dos três amigos de Jó que veio consolá-lo em seu sofrimento. Ele argumentava que Deus é justo e que o sofrimento é consequência do pecado. Seus discursos enfatizavam a tradição e a sabedoria dos antepassados, mas foram reprovados por Deus ao final.",
    primeiraMencao: "Jó 2:11",
    eventosPrincipais: [
      "Visita a Jó com Elifaz e Zofar",
      "Discursos sobre a justiça retributiva de Deus",
      "Repreendido por Deus por não falar o que era reto"
    ],
    referencias: ["Jó 2:11", "Jó 8:1-22", "Jó 18:1-21", "Jó 25:1-6"]
  },
  {
    id: "zofar",
    nome: "Zofar",
    nomeOriginal: "צופר",
    significadoNome: "Pássaro, gorjeio, passarinhar",
    categoria: "Figura do AT",
    biografia: "Zofar, o naamatita, foi o terceiro amigo de Jó, o mais severo em suas acusações. Ele insistia que Jó merecia ainda mais sofrimento por seus pecados ocultos e que Deus castiga menos do que o merecido. Foi reprovado por Deus junto com os outros amigos.",
    primeiraMencao: "Jó 2:11",
    eventosPrincipais: [
      "Visita a Jó com Elifaz e Bildade",
      "Discursos mais severos acusando Jó de pecado oculto",
      "Repreendido por Deus"
    ],
    referencias: ["Jó 2:11", "Jó 11:1-20", "Jó 20:1-29"]
  },
  {
    id: "elifaz",
    nome: "Elifaz",
    nomeOriginal: "אליפז",
    significadoNome: "Meu Deus é ouro, Deus de força",
    categoria: "Figura do AT",
    biografia: "Elifaz, o temanita, foi o primeiro dos três amigos de Jó a falar, baseando seus argumentos em experiências visionárias. Ele insistia que o inocente não perece e que Jó estava sendo disciplinado por pecado. Foi o líder dos três e, ao final, Deus ordenou que oferecessem holocaustos.",
    primeiraMencao: "Jó 2:11",
    eventosPrincipais: [
      "Visita a Jó com seus dois amigos",
      "Primeiro discurso baseado em visão noturna",
      "Orientado por Deus a oferecer sacrifício"
    ],
    referencias: ["Jó 2:11", "Jó 4:1-5:27", "Jó 15:1-35", "Jó 22:1-30", "Jó 42:7-9"]
  },
  {
    id: "moises",
    nome: "Moisés",
    nomeOriginal: "משה",
    significadoNome: "Tirado das águas, filho",
    categoria: "Líder",
    biografia: "Moisés foi o maior líder e profeta do Antigo Testamento, escolhido por Deus para libertar Israel da escravidão no Egito. Recebeu os Dez Mandamentos no Monte Sinai e liderou o povo durante 40 anos no deserto. Escreveu os primeiros cinco livros da Bíblia (Torá) e é considerado o maior profeta de Israel.",
    primeiraMencao: "Êxodo 2:1-2",
    eventosPrincipais: [
      "Nascimento e salvação das águas do Nilo",
      "Fuga para Midiã e chamado na sarça ardente",
      "Dez pragas do Egito e libertação de Israel",
      "Abertura do Mar Vermelho",
      "Recepção dos Dez Mandamentos no Sinai"
    ],
    referencias: ["Êxodo 2:1-Deuteronômio 34:12", "Mateus 17:3", "Hebreus 11:23-29", "João 1:17"],
    citacoesChave: ["O Senhor é a minha força e o meu cântico; ele me foi por salvação."],
    parentes: { pai: "Anrão", mae: "Joquebede", irmaos: "Arão, Miriã", conjugue: "Zípora", filhos: "Gérson, Eliézer" }
  },
  {
    id: "arao",
    nome: "Arão",
    nomeOriginal: "אהרן",
    significadoNome: "Iluminado, montanha, elevado",
    categoria: "Sacerdote",
    biografia: "Arão foi o irmão mais velho de Moisés e o primeiro sumo sacerdote de Israel. Serviu como porta-voz de Moisés diante de Faraó por ser eloquente. Foi consagrado por Deus para o sacerdócio, mas também falhou ao fazer o bezerro de ouro enquanto Moisés estava no Sinai.",
    primeiraMencao: "Êxodo 4:14",
    eventosPrincipais: [
      "Porta-voz de Moisés diante de Faraó",
      "Participação nas pragas do Egito",
      "Fabricação do bezerro de ouro",
      "Consagração como sumo sacerdote"
    ],
    referencias: ["Êxodo 4:14-40:31", "Levítico 8:1-36", "Números 12:1-15", "Números 20:22-29", "Hebreus 5:4"],
    parentes: { pai: "Anrão", mae: "Joquebede", irmaos: "Moisés, Miriã", conjugue: "Elisabe", filhos: "Nadabe, Abiú, Eleazar, Itamar" }
  },
  {
    id: "miria",
    nome: "Miriã",
    nomeOriginal: "מרים",
    significadoNome: "Amada, rebelde, senhora",
    categoria: "Profetisa",
    biografia: "Miriã foi a irmã de Moisés e Arão, reconhecida como profetisa. Quando bebê, vigiou o cesto de Moisés no Nilo e sugeriu que sua mãe fosse sua ama. Liderou as mulheres em cântico após a travessia do Mar Vermelho. Mais tarde, foi ferida com lepra por contestar a liderança de Moisés.",
    primeiraMencao: "Êxodo 2:4",
    eventosPrincipais: [
      "Vigilância do cesto de Moisés no Nilo",
      "Liderança do cântico de vitória no Mar Vermelho",
      "Rebelião contra Moisés pela mulher etíope",
      "Castigo com lepra e cura pela oração de Moisés"
    ],
    referencias: ["Êxodo 2:4-8", "Êxodo 15:20-21", "Números 12:1-15", "Miqueias 6:4"],
    parentes: { pai: "Anrão", mae: "Joquebede", irmaos: "Moisés, Arão" }
  },
  {
    id: "josue",
    nome: "Josué",
    nomeOriginal: "יהושע",
    significadoNome: "O Senhor é salvação, Deus salva",
    categoria: "Líder",
    biografia: "Josué foi o auxiliar de Moisés que se tornou seu sucessor na liderança de Israel. Como um dos doze espias, apenas ele e Calebe trouxeram relatório positivo sobre a terra prometida. Liderou a conquista de Canaã, incluindo a batalha de Jericó, onde os muros caíram milagrosamente.",
    primeiraMencao: "Êxodo 17:9",
    eventosPrincipais: [
      "Líder militar contra Amaleque em Refidim",
      "Um dos doze espias que confiaram na promessa",
      "Sucessão de Moisés como líder de Israel",
      "Queda dos muros de Jericó",
      "Conquista e divisão da terra de Canaã"
    ],
    referencias: ["Êxodo 17:9-14", "Números 13:1-14:38", "Josué 1:1-24:33", "Hebreus 11:30"],
    citacoesChave: ["Eu e a minha casa serviremos ao Senhor."],
    parentes: { pai: "Num" }
  },
  {
    id: "calebe",
    nome: "Calebe",
    nomeOriginal: "כלב",
    significadoNome: "Cão, fiel, corajoso",
    categoria: "Herói",
    biografia: "Calebe foi um dos doze espias enviados a Canaã que, com Josué, incentivou o povo a confiar em Deus. Por sua fidelidade, foi o único da sua geração (com Josué) a entrar na terra prometida. Aos 85 anos, tomou a montanhosa de Hebrom como herança, expulsando os gigantes enaquins.",
    primeiraMencao: "Números 13:6",
    eventosPrincipais: [
      "Espionagem de Canaã com relatório de fé",
      "Sobrevivente dos 40 anos no deserto",
      "Conquista de Hebrom aos 85 anos"
    ],
    referencias: ["Números 13:6-14:30", "Josué 14:6-15", "Josué 15:13-19"],
    citacoesChave: ["Subamos animosamente e possuamos a terra, porque certamente prevaleceremos contra ela."],
    parentes: { pai: "Jefoné", filhos: "Iru, Elá, Naã, Acsa" }
  },
  {
    id: "fineias",
    nome: "Finéias",
    nomeOriginal: "פינחס",
    significadoNome: "Boca de bronze, boca de serpente",
    categoria: "Sacerdote",
    biografia: "Finéias foi o neto de Arão e filho de Eleazar, conhecido por seu zelo pela santidade de Deus. Ele matou um israelita e uma midianita que se uniram em imoralidade, fazendo cessar a praga que matou 24 mil pessoas. Deus fez aliança de paz com ele, garantindo o sacerdócio perpétuo.",
    primeiraMencao: "Êxodo 6:25",
    eventosPrincipais: [
      "Ação zelosa contra a imoralidade em Baal-Peor",
      "Cessação da praga que matou 24.000",
      "Liderança na guerra contra Midiã",
      "Aliança do sacerdócio perpétuo"
    ],
    referencias: ["Números 25:1-13", "Números 31:6-30", "Josué 22:13-34", "Salmos 106:30-31"],
    parentes: { pai: "Eleazar", avo: "Arão" }
  },
  {
    id: "balaao",
    nome: "Balaão",
    nomeOriginal: "בלעם",
    significadoNome: "Senhor do povo, devorador",
    categoria: "Figura do AT",
    biografia: "Balaão foi um profeta pagão contratado por Balaque, rei de Moabe, para amaldiçoar Israel. Deus o impediu de amaldiçoar e fez com que apenas bênçãos saíssem de sua boca. Sua jumenta falou milagrosamente para repreendê-lo. Mais tarde, foi morto por Israel.",
    primeiraMencao: "Números 22:5",
    eventosPrincipais: [
      "Chamado por Balaque para amaldiçoar Israel",
      "Jumenta que falou com voz humana",
      "Bênçãos proféticas sobre Israel",
      "Morte na guerra contra Midiã"
    ],
    referencias: ["Números 22:1-24:25", "Números 31:8", "2 Pedro 2:15", "Apocalipse 2:14"]
  },
  {
    id: "debora",
    nome: "Débora",
    nomeOriginal: "דבורה",
    significadoNome: "Abelha",
    categoria: "Profetisa",
    biografia: "Débora foi a única juíza de Israel, também profetisa, que julgava o povo debaixo da palmeira entre Ramá e Betel. Convocou Baraque para libertar Israel de Jabim, rei de Canaã, e profetizou que a honra da vitória caberia a uma mulher. Seu cântico de vitória é um dos mais antigos poemas hebraicos.",
    primeiraMencao: "Juízes 4:4",
    eventosPrincipais: [
      "Julgamento de Israel debaixo da palmeira de Débora",
      "Convocação de Baraque para guerra contra Sísera",
      "Profecia de que Jael mataria Sísera",
      "Cântico de Débora (Juízes 5)"
    ],
    referencias: ["Juízes 4:1-5:31", "Hebreus 11:32-34"],
    citacoesChave: ["Levanta-te, porque este é o dia em que o Senhor deu a Sísera na tua mão."],
    parentes: { conjugue: "Lapídote" }
  },
  {
    id: "baraque",
    nome: "Baraque",
    nomeOriginal: "ברק",
    significadoNome: "Relâmpago, raio",
    categoria: "Juiz",
    biografia: "Baraque foi o comandante militar convocado por Débora para libertar Israel da opressão de Jabim, rei de Canaã. Inicialmente hesitante, concordou em ir somente se Débora o acompanhasse. Derrotou Sísera e seu exército de 900 carros de ferro no rio Quisom.",
    primeiraMencao: "Juízes 4:6",
    eventosPrincipais: [
      "Convocação por Débora para liderar Israel",
      "Batalha contra Sísera no Monte Tabor",
      "Derrota do exército cananeu no rio Quisom"
    ],
    referencias: ["Juízes 4:1-5:31", "Hebreus 11:32"],
    parentes: { pai: "Abinoão" }
  },
  {
    id: "gideao",
    nome: "Gideão",
    nomeOriginal: "גדעון",
    significadoNome: "Cortador, derrubador, guerreiro",
    categoria: "Juiz",
    biografia: "Gideão foi um juiz de Israel chamado por Deus para libertar o povo dos midianitas. Inicialmente incrédulo, pediu sinais com o velo de lã. Com apenas 300 homens que lamberam água, derrotou o imenso exército midianita. Recusou ser rei, afirmando que só Deus reinaria sobre Israel.",
    primeiraMencao: "Juízes 6:11",
    eventosPrincipais: [
      "Chamado pelo anjo enquanto malhava trigo",
      "Sinais do velo de lã",
      "Redução do exército a 300 homens",
      "Derrota dos midianitas com jarras e tochas",
      "Recusa da realeza"
    ],
    referencias: ["Juízes 6:1-8:35", "Hebreus 11:32"],
    citacoesChave: ["Se o Senhor é conosco, por que nos sobreveio tudo isto?"],
    parentes: { pai: "Joás", filhos: "70 filhos, Abimeleque" }
  },
  {
    id: "abimeleque",
    nome: "Abimeleque",
    nomeOriginal: "אבימלך",
    significadoNome: "Meu pai é rei",
    categoria: "Juiz",
    biografia: "Abimeleque foi filho de Gideão com uma concubina que se proclamou rei após a morte do pai. Assassinou 69 de seus 70 irmãos sobre uma pedra, poupando apenas Jotão. Governou Israel por três anos e morreu quando uma mulher lançou uma pedra de moinho sobre sua cabeça em Tebes.",
    primeiraMencao: "Juízes 8:31",
    eventosPrincipais: [
      "Assassinato dos 70 irmãos para tomar o poder",
      "Proclamação como rei em Siquém",
      "Parábola de Jotão sobre as árvores",
      "Morte em Tebes por uma pedra de moinho"
    ],
    referencias: ["Juízes 8:31-9:57", "2 Samuel 11:21"],
    parentes: { pai: "Gideão", irmaos: "70 irmãos, Jotão" }
  },
  {
    id: "jefté",
    nome: "Jefté",
    nomeOriginal: "יפתח",
    significadoNome: "Ele abre, que Deus abra",
    categoria: "Juiz",
    biografia: "Jefté foi um juiz de Israel, filho de uma prostituta, rejeitado por seus irmãos. Quando os amonitas oprimiram Israel, os anciãos de Gileade o chamaram para liderar. Fez um voto precipitado ao Senhor de sacrificar o que primeiro saísse de sua casa se vencesse, resultando no sacrifício de sua única filha.",
    primeiraMencao: "Juízes 11:1",
    eventosPrincipais: [
      "Expulsão de casa pelos irmãos",
      "Liderança contra os amonitas",
      "Voto que resultou no sacrifício da filha",
      "Conflito com Efraim e uso de 'Sibolete'"
    ],
    referencias: ["Juízes 11:1-12:7", "Hebreus 11:32"],
    parentes: { pai: "Gileade", filha: "A filha de Jefté" }
  },
  {
    id: "sansao",
    nome: "Sansão",
    nomeOriginal: "שמשון",
    significadoNome: "Pequeno sol, solar",
    categoria: "Juiz",
    biografia: "Sansão foi o último dos grandes juízes de Israel, conhecido por sua força sobrenatural vinda do Espírito do Senhor. Era um nazireu consagrado desde o ventre, mas entregou-se a paixões que o levaram à ruína. Após ser traído por Dalila e cegado pelos filisteus, derrubou o templo de Dagom sobre eles.",
    primeiraMencao: "Juízes 13:24",
    eventosPrincipais: [
      "Anúncio de seu nascimento pelo anjo a Manoá",
      "Casamento com uma filisteia e enigma nas bodas",
      "Vitória sobre mil filisteus com queixada de jumento",
      "Traição de Dalila e captura pelos filisteus",
      "Derrubada do templo de Dagom"
    ],
    referencias: ["Juízes 13:1-16:31", "Hebreus 11:32"],
    citacoesChave: ["Morra eu com os filisteus!"],
    parentes: { pai: "Manoá" }
  },
  {
    id: "dalila",
    nome: "Dalila",
    nomeOriginal: "דלילה",
    significadoNome: "Delicada, pobre, pendurada",
    categoria: "Figura do AT",
    biografia: "Dalila foi a mulher filisteia que seduziu Sansão para descobrir o segredo de sua força. Subornada pelos príncipes filisteus, tentou três vezes amarrá-lo antes de finalmente descobrir que sua força estava no cabelo. Cortou o cabelo de Sansão enquanto dormia, entregando-o nas mãos dos filisteus.",
    primeiraMencao: "Juízes 16:4",
    eventosPrincipais: [
      "Sedução de Sansão para descobrir seu segredo",
      "Corte do cabelo de Sansão enquanto dormia",
      "Entrega de Sansão aos filisteus"
    ],
    referencias: ["Juízes 16:4-21"]
  },
  {
    id: "rute",
    nome: "Rute",
    nomeOriginal: "רות",
    significadoNome: "Amiga, companheira",
    categoria: "Figura do AT",
    biografia: "Rute foi uma moabita que se tornou bisavó do rei Davi por sua lealdade a Noemi. Após a morte de seu marido, recusou abandonar sua sogra e foi com ela a Belém. Casou-se com Boaz, seu parente remidor, e tornou-se mãe de Obede. É um exemplo notável de fé e devoção.",
    primeiraMencao: "Rute 1:4",
    eventosPrincipais: [
      "Decisão de acompanhar Noemi a Belém",
      "Colheita nos campos de Boaz",
      "Casamento com Boaz como parente remidor",
      "Nascimento de Obede, avô do rei Davi"
    ],
    referencias: ["Rute 1:1-4:22", "Mateus 1:5"],
    citacoesChave: ["Para onde quer que fores, irei eu, e onde quer que pousares, ali pousarei eu."],
    parentes: { conjugue: "Malom, Boaz", filhos: "Obede" }
  },
  {
    id: "noemi",
    nome: "Noemi",
    nomeOriginal: "נעמי",
    significadoNome: "Minha doçura, agradável",
    categoria: "Figura do AT",
    biografia: "Noemi foi uma israelita que emigrou para Moabe com seu marido e filhos durante uma fome. Lá perdeu o marido e ambos os filhos, ficando sozinha com suas noras. Voltou a Belém amargurada com Rute, e Deus restaurou sua alegria através do casamento de Rute com Boaz.",
    primeiraMencao: "Rute 1:2",
    eventosPrincipais: [
      "Emigração para Moabe durante a fome",
      "Viúva e perda dos dois filhos",
      "Retorno a Belém com Rute",
      "Alegria pelo casamento de Rute e nascimento de Obede"
    ],
    referencias: ["Rute 1:1-4:17"],
    citacoesChave: ["Não me chameis Noemi, chamai-me Mara, porque grande amargura me tem dado o Todo-Poderoso."],
    parentes: { conjugue: "Elimeleque", filhos: "Malom, Quiliom" }
  },
  {
    id: "boaz",
    nome: "Boaz",
    nomeOriginal: "בועז",
    significadoNome: "Nele há força, fortaleza",
    categoria: "Figura do AT",
    biografia: "Boaz foi um rico proprietário de terras em Belém, parente de Elimeleque, que se tornou o parente remidor de Rute. Conhecido por sua bondade e integridade, permitiu que Rute colhesse em seus campos e a protegeu. Casou-se com ela e tornou-se bisavô do rei Davi.",
    primeiraMencao: "Rute 2:1",
    eventosPrincipais: [
      "Permissão para Rute colher em seus campos",
      "Encontro noturno na eira",
      "Resgate da propriedade e casamento com Rute",
      "Nascimento de Obede"
    ],
    referencias: ["Rute 2:1-4:22", "Mateus 1:5", "1 Crônicas 2:11-12"],
    citacoesChave: ["O Senhor vos recompense o vosso feito, e vos seja concedido pleno galardão."],
    parentes: { pai: "Salmom", mae: "Raabe", conjugue: "Rute", filhos: "Obede" }
  },
  {
    id: "samuel",
    nome: "Samuel",
    nomeOriginal: "שמואל",
    significadoNome: "Nome de Deus, ouvido por Deus",
    categoria: "Profeta",
    biografia: "Samuel foi o último juiz de Israel e um grande profeta que ungiu os dois primeiros reis: Saul e Davi. Filho de Ana, que era estéril, foi consagrado ao Senhor desde criança e serviu no tabernáculo sob Eli. Liderou Israel em tempos de transição do período dos juízes para a monarquia.",
    primeiraMencao: "1 Samuel 1:20",
    eventosPrincipais: [
      "Nascimento em resposta à oração de Ana",
      "Chamado de Deus quando criança no tabernáculo",
      "Liderança sobre Israel como juiz e profeta",
      "Ungição de Saul como primeiro rei",
      "Repreensão a Saul e unção de Davi"
    ],
    referencias: ["1 Samuel 1:1-25:1", "1 Crônicas 6:27-28", "Jeremias 15:1", "Hebreus 11:32"],
    citacoesChave: ["Fala, Senhor, que o teu servo ouve."],
    parentes: { pai: "Elcana", mae: "Ana", filhos: "Joel, Abias" }
  },
  {
    id: "ana_oracao",
    nome: "Ana",
    nomeOriginal: "חנה",
    significadoNome: "Graça, favor, misericórdia",
    categoria: "Figura do AT",
    biografia: "Ana foi a mãe de Samuel, uma mulher estéril que orou fervorosamente por um filho no tabernáculo em Siló. Deus respondeu sua oração, e ela cumpriu seu voto dedicando Samuel ao serviço divino. Seu cântico de louvor é um dos mais belos poemas do AT e prenuncia o Magnificat de Maria.",
    primeiraMencao: "1 Samuel 1:2",
    eventosPrincipais: [
      "Oração fervorosa por um filho",
      "Voto de dedicar o filho ao Senhor",
      "Nascimento e desmame de Samuel",
      "Cântico de ações de graças"
    ],
    referencias: ["1 Samuel 1:1-2:21"],
    citacoesChave: ["O meu coração se alegra no Senhor, o meu poder está exaltado no Senhor."],
    parentes: { conjugue: "Elcana", filhos: "Samuel, e outros 3 filhos e 2 filhas" }
  },
  {
    id: "eli_sacerdote",
    nome: "Eli",
    nomeOriginal: "עלי",
    significadoNome: "Elevado, subido, meu Deus",
    categoria: "Sacerdote",
    biografia: "Eli foi o sumo sacerdote e juiz de Israel que serviu no tabernáculo em Siló. Criou Samuel desde criança, mas falhou em disciplinar seus filhos perversos Hofni e Finéias que profanavam o santuário. Recebeu a terrível profecia de que sua casa seria cortada, cumprida na batalha contra os filisteus.",
    primeiraMencao: "1 Samuel 1:3",
    eventosPrincipais: [
      "Bênção a Ana por seu filho Samuel",
      "Criação de Samuel no tabernáculo",
      "Profecia contra sua casa por causa de seus filhos",
      "Morte ao cair da cadeira ao saber da captura da arca"
    ],
    referencias: ["1 Samuel 1:3-4:18", "1 Reis 2:27"],
    parentes: { filhos: "Hofni, Finéias" }
  },
  {
    id: "saul",
    nome: "Saul",
    nomeOriginal: "שאול",
    significadoNome: "Pedido, desejado",
    categoria: "Rei",
    biografia: "Saul foi o primeiro rei de Israel, ungido por Samuel, filho de Quis, da tribo de Benjamim. Inicialmente humilde, tornou-se desobediente a Deus ao oferecer sacrifício indevidamente e poupar Agague. Rejeitado por Deus, foi atormentado por um espírito mau e morreu tragicamente em batalha contra os filisteus.",
    primeiraMencao: "1 Samuel 9:2",
    eventosPrincipais: [
      "Ungido por Samuel como primeiro rei",
      "Vitória sobre os amonitas em Jabes-Gileade",
      "Sacrifício indevido e rejeição por Deus",
      "Perseguição a Davi por ciúmes",
      "Morte no Monte Gilboa com seus filhos"
    ],
    referencias: ["1 Samuel 9:1-31:13", "1 Crônicas 10:1-14"],
    parentes: { pai: "Quis", conjugue: "Ainoã", filhos: "Jônatas, Abinadabe, Malquisua, Isbosete, Merabe, Mical" }
  },
  {
    id: "jonatas",
    nome: "Jônatas",
    nomeOriginal: "יהונתן",
    significadoNome: "Dado por Deus, presente de Deus",
    categoria: "Herói",
    biografia: "Jônatas foi o filho mais velho do rei Saul e herdeiro do trono, mas tornou-se amigo íntimo de Davi, reconhecendo-o como escolhido de Deus. Realizou um ataque heroico contra os filisteus com seu escudeiro. Foi morto junto com seu pai no Monte Gilboa, deixando Davi em profundo luto.",
    primeiraMencao: "1 Samuel 13:2",
    eventosPrincipais: [
      "Ataque heroico à guarnição filisteia com seu escudeiro",
      "Aliança de amizade com Davi",
      "Intercessão junto a Saul por Davi",
      "Morte no Monte Gilboa"
    ],
    referencias: ["1 Samuel 13:2-14:52", "1 Samuel 18:1-20:42", "1 Samuel 31:2", "2 Samuel 1:1-27"],
    citacoesChave: ["A alma de Jônatas se ligou à alma de Davi, e amou-o como à sua própria alma."],
    parentes: { pai: "Saul", filho: "Mefibosete" }
  },
  {
    id: "mical",
    nome: "Mical",
    nomeOriginal: "מיכל",
    significadoNome: "Quem é como Deus?",
    categoria: "Figura do AT",
    biografia: "Mical foi a filha do rei Saul que se apaixonou por Davi e se tornou sua primeira esposa. Ajudou Davi a escapar quando Saul intentou matá-lo. Mais tarde foi dada a Palti por Saul, mas Davi a resgatou. Desprezou Davi quando o viu dançando diante da arca, e por isso ficou estéril até a morte.",
    primeiraMencao: "1 Samuel 14:49",
    eventosPrincipais: [
      "Ajudou Davi a escapar de Saul pela janela",
      "Casamento com Palti após Saul dá-la a outro",
      "Resgate por Davi e retorno",
      "Repreensão a Davi pela dança diante da arca"
    ],
    referencias: ["1 Samuel 18:20-28", "1 Samuel 19:11-17", "2 Samuel 3:13-14", "2 Samuel 6:16-23"],
    citacoesChave: ["Quão honrado foi o rei de Israel, descobrindo-se hoje aos olhos das servas!"],
    parentes: { pai: "Saul", conjugue: "Davi, Palti" }
  },
  {
    id: "davi",
    nome: "Davi",
    nomeOriginal: "דוד",
    significadoNome: "Amado, querido",
    categoria: "Rei",
    biografia: "Davi foi o segundo rei de Israel, chamado de 'homem segundo o coração de Deus'. Pastor, músico e guerreiro, derrotou o gigante Golias quando ainda era jovem. Unificou Israel, conquistou Jerusalém e a estabeleceu como capital. Recebeu a aliança davídica de que seu trono seria eterno. Escreveu muitos Salmos.",
    primeiraMencao: "Rute 4:17",
    eventosPrincipais: [
      "Ungido por Samuel em Belém",
      "Derrota de Golias com funda e pedra",
      "Amizade com Jônatas e perseguição por Saul",
      "Reinado em Hebrom e depois em Jerusalém",
      "Adultério com Bate-Seba e arrependimento"
    ],
    referencias: ["1 Samuel 16:1-1 Reis 2:11", "1 Crônicas 10:1-29:30", "Mateus 1:1-6", "Atos 13:22"],
    citacoesChave: ["O Senhor é o meu pastor, nada me faltará."],
    parentes: { pai: "Jessé", irmaos: "Eliabe, Abinadabe, Samá", conjugue: "Mical, Ainoã, Abigail, Maaca, Bate-Seba", filhos: "Amnom, Absalão, Adonias, Salomão, Tamar" }
  },
  {
    id: "bate-seba",
    nome: "Bate-Seba",
    nomeOriginal: "בת-שבע",
    significadoNome: "Filha do juramento, filha da abundância",
    categoria: "Figura do AT",
    biografia: "Bate-Seba foi a mulher com quem Davi cometeu adultério e que se tornou sua esposa após Davi enviar seu marido Urias para a morte. Ela deu à luz Salomão, que sucedeu Davi no trono. Mais tarde, ajudou a garantir que Salomão se tornasse rei em vez de Adonias.",
    primeiraMencao: "2 Samuel 11:3",
    eventosPrincipais: [
      "Adultério com Davi enquanto Urias estava na guerra",
      "Morte de Urias na batalha",
      "Nascimento do primeiro filho que morreu",
      "Nascimento de Salomão",
      "Intercessão para Salomão suceder Davi"
    ],
    referencias: ["2 Samuel 11:1-12:25", "1 Reis 1:11-31", "Mateus 1:6"],
    parentes: { pai: "Eliã", conjugue: "Urias, Davi", filhos: "Salomão" }
  },
  {
    id: "absalao",
    nome: "Absalão",
    nomeOriginal: "אבשלום",
    significadoNome: "Pai de paz, paz do pai",
    categoria: "Figura do AT",
    biografia: "Absalão foi o terceiro filho de Davi, conhecido por sua beleza e longos cabelos. Vingou sua irmã Tamar matando Amnom e fugiu para Gesur. Liderou uma rebelião contra Davi que dividiu o reino, morrendo tragicamente quando seus cabelos ficaram presos num carvalho e Joabe o matou.",
    primeiraMencao: "2 Samuel 3:3",
    eventosPrincipais: [
      "Assassinato de Amnom por ter violado Tamar",
      "Exílio em Gesur e retorno a Jerusalém",
      "Rebelião contra o rei Davi",
      "Morte preso pelo cabelo num carvalho"
    ],
    referencias: ["2 Samuel 3:3", "2 Samuel 13:1-18:33"],
    citacoesChave: ["Quem me dera que eu fosse juiz na terra!"],
    parentes: { pai: "Davi", mae: "Maaca", filha: "Tamar" }
  },
  {
    id: "salomao",
    nome: "Salomão",
    nomeOriginal: "שלמה",
    significadoNome: "Pacífico, paz",
    categoria: "Rei",
    biografia: "Salomão foi o filho de Davi e Bate-Seba, o terceiro rei de Israel, famoso por sua sabedoria incomparável. Construiu o primeiro Templo em Jerusalém e escreveu Provérbios, Eclesiastes e Cantares. Seu reinado foi de grande riqueza e paz, mas seu coração se desviou por suas muitas esposas estrangeiras.",
    primeiraMencao: "2 Samuel 12:24",
    eventosPrincipais: [
      "Ungido rei por ordem de Davi",
      "Pedido de sabedoria a Deus em Gibeom",
      "Construção do Templo de Jerusalém",
      "Visita da rainha de Sabá",
      "Desvio para ídolos por influência de esposas estrangeiras"
    ],
    referencias: ["1 Reis 1:1-11:43", "Provérbios 1:1", "Eclesiastes 1:1", "Mateus 6:29"],
    citacoesChave: ["Dá, pois, a teu servo um coração entendido para julgar a teu povo."],
    parentes: { pai: "Davi", mae: "Bate-Seba", filhos: "Roboão" }
  },
  {
    id: "roboao",
    nome: "Roboão",
    nomeOriginal: "רחבעם",
    significadoNome: "Que engrandece o povo, ampliador do povo",
    categoria: "Rei",
    biografia: "Roboão foi filho de Salomão que se tornou rei após sua morte, mas sua insensatez causou a divisão do reino. Rejeitou o conselho dos anciãos e seguiu o conselho dos jovens, aumentando o jugo sobre o povo. Dez tribos se rebelaram formando o Reino do Norte sob Jeroboão, restando-lhe apenas Judá e Benjamim.",
    primeiraMencao: "1 Reis 11:43",
    eventosPrincipais: [
      "Sucessão ao trono de Salomão",
      "Rejeição do conselho dos anciãos",
      "Divisão do reino com Jeroboão",
      "Invasão de Sisaque"
    ],
    referencias: ["1 Reis 11:43-14:31", "2 Crônicas 10:1-12:16", "Mateus 1:7"],
    parentes: { pai: "Salomão", mae: "Naamá", filhos: "Abias" }
  },
  {
    id: "jeroboao",
    nome: "Jeroboão",
    nomeOriginal: "ירבעם",
    significadoNome: "O povo contende, o povo se multiplica",
    categoria: "Rei",
    biografia: "Jeroboão foi o primeiro rei do Reino do Norte (Israel), originalmente servo de Salomão. O profeta Aías predisse que ele governaria dez tribos. Após a divisão, estabeleceu bezerros de ouro em Dã e Betel para evitar que o povo fosse a Jerusalém, iniciando o pecado que caracterizou seu reinado.",
    primeiraMencao: "1 Reis 11:26",
    eventosPrincipais: [
      "Profecia de Aías sobre seu reinado",
      "Fuga para o Egito durante Salomão",
      "Liderança das tribos do norte na revolta",
      "Estabelecimento dos bezerros de ouro"
    ],
    referencias: ["1 Reis 11:26-14:20", "2 Crônicas 13:1-20"],
    parentes: { pai: "Nebate", mae: "Zerua", filhos: "Abias, Nadabe" }
  },
  {
    id: "elias",
    nome: "Elias",
    nomeOriginal: "אליהו",
    significadoNome: "O Senhor é meu Deus, Javé é Deus",
    categoria: "Profeta",
    biografia: "Elias foi um dos maiores profetas de Israel, conhecido por seus milagres e confronto com os profetas de Baal no Monte Carmelo. Foi alimentado por corvos e multiplicou a farinha da viúva de Sarepta. Foi levado ao céu num redemoinho com um carro de fogo. Apareceu com Moisés na transfiguração de Jesus.",
    primeiraMencao: "1 Reis 17:1",
    eventosPrincipais: [
      "Profecia de seca e sustento por corvos",
      "Multiplicação da farinha e azeite da viúva",
      "Confronto com os profetas de Baal no Carmelo",
      "Fuga de Jezabel e encontro com Deus no monte Horebe",
      "Ascensão ao céu num redemoinho"
    ],
    referencias: ["1 Reis 17:1-2 Reis 2:11", "Malaquias 4:5", "Mateus 17:3", "Tiago 5:17-18"],
    citacoesChave: ["Até quando coxeareis entre dois pensamentos? Se o Senhor é Deus, segui-o."]
  },
  {
    id: "eliseu",
    nome: "Eliseu",
    nomeOriginal: "אלישע",
    significadoNome: "Deus é salvação, Deus salva",
    categoria: "Profeta",
    biografia: "Eliseu foi o sucessor de Elias, ungido quando este lançou seu manto sobre ele. Realizou o dobro de milagres de seu mestre, incluindo a cura de Naamã da lepra, a multiplicação do azeite e a ressurreição do filho da sunamita. Serviu a Israel durante os reinados de Jorão, Jeú e Joás.",
    primeiraMencao: "1 Reis 19:16",
    eventosPrincipais: [
      "Chamado enquanto arava com 12 juntas de bois",
      "Multiplicação do azeite da viúva",
      "Ressurreição do filho da sunamita",
      "Cura de Naamã da lepra no Jordão",
      "Último milagre póstumo"
    ],
    referencias: ["1 Reis 19:16-21", "2 Reis 2:1-13:21", "Lucas 4:27"],
    parentes: { pai: "Safate" }
  },
  {
    id: "acabe",
    nome: "Acabe",
    nomeOriginal: "אחאב",
    significadoNome: "Irmão do pai",
    categoria: "Rei",
    biografia: "Acabe foi o sétimo rei do Reino do Norte, casado com Jezabel, que o influenciou a servir a Baal. Foi confrontado por Elias e tornou-se o rei mais perverso de Israel. Morreu em batalha em Ramote-Gileade, cumprindo a profecia de Elias, e seu sangue foi lambido pelos cães.",
    primeiraMencao: "1 Reis 16:29",
    eventosPrincipais: [
      "Casamento com Jezabel e introdução do culto a Baal",
      "Confronto com Elias no Monte Carmelo",
      "Vinha de Nabote e assassinato",
      "Morte profetizada em Ramote-Gileade"
    ],
    referencias: ["1 Reis 16:29-22:40", "Miqueias 6:16"],
    parentes: { pai: "Onri", conjugue: "Jezabel", filhos: "Acazias, Jorão, Atalia" }
  },
  {
    id: "jezabel",
    nome: "Jezabel",
    nomeOriginal: "איזבל",
    significadoNome: "Onde está o príncipe? Não exaltada",
    categoria: "Figura do AT",
    biografia: "Jezabel foi a rainha fenícia, esposa de Acabe, que promoveu agressivamente o culto a Baal e Aserá em Israel. Perseguiu e matou os profetas do Senhor, sendo confrontada por Elias. Profetizou-se que seria comida por cães, o que se cumpriu quando foi lançada da janela por eunucos.",
    primeiraMencao: "1 Reis 16:31",
    eventosPrincipais: [
      "Introdução do culto a Baal em Israel",
      "Perseguição aos profetas do Senhor",
      "Conspiração contra Nabote",
      "Morte lançada da janela e comida por cães"
    ],
    referencias: ["1 Reis 16:31", "1 Reis 18:4-19:2", "1 Reis 21:1-25", "2 Reis 9:30-37", "Apocalipse 2:20"],
    parentes: { pai: "Etbaal", conjugue: "Acabe", filhos: "Acazias, Jorão, Atalia" }
  },
  {
    id: "obadias",
    nome: "Obadias",
    nomeOriginal: "עבדיהו",
    significadoNome: "Servo do Senhor",
    categoria: "Figura do AT",
    biografia: "Obadias foi o mordomo do rei Acabe que temia profundamente ao Senhor. Escondeu 100 profetas do Senhor em cavernas, alimentando-os com pão e água, durante a perseguição de Jezabel. Encontrou-se com Elias no caminho e transmitiu a mensagem a Acabe.",
    primeiraMencao: "1 Reis 18:3",
    eventosPrincipais: [
      "Escondeu 100 profetas em cavernas",
      "Encontro com Elias anunciando sua presença a Acabe"
    ],
    referencias: ["1 Reis 18:3-16"]
  },
  {
    id: "naama",
    nome: "Naamã",
    nomeOriginal: "נעמן",
    significadoNome: "Agradável, formoso",
    categoria: "Figura do AT",
    biografia: "Naamã foi o comandante do exército da Síria que sofria de lepra. Seguindo o conselho de uma serva israelita cativa, foi a Eliseu para ser curado. Inicialmente indignado por Eliseu não sair para vê-lo, submeteu-se mergulhando sete vezes no Jordão e foi curado, declarando que só há Deus em Israel.",
    primeiraMencao: "2 Reis 5:1",
    eventosPrincipais: [
      "Lepra curada ao mergulhar no Jordão",
      "Indignação inicial pela instrução de Eliseu",
      "Confissão de que só há Deus em Israel"
    ],
    referencias: ["2 Reis 5:1-27", "Lucas 4:27"],
    citacoesChave: ["Eis que tenho conhecido que em toda a terra não há Deus senão em Israel."]
  },
  {
    id: "isaias",
    nome: "Isaías",
    nomeOriginal: "ישעיהו",
    significadoNome: "O Senhor é salvação",
    categoria: "Profeta",
    biografia: "Isaías foi um dos maiores profetas de Judá, filho de Amoz, que profetizou durante os reinados de Uzias, Jotão, Acaz e Ezequias. Suas profecias messiânicas detalhadas sobre o nascimento, sofrimento e glória do Messias são marcantes. Teve a visão da santidade de Deus no ano da morte do rei Uzias.",
    primeiraMencao: "Isaías 1:1",
    eventosPrincipais: [
      "Visão do Senhor no Trono no ano da morte de Uzias",
      "Profecias sobre o Messias (Emanuel, 7:14; 9:6; 53)",
      "Milagre da sombra retroceder no relógio de Acaz",
      "Confronto com o rei Ezequias sobre a visita babilônica"
    ],
    referencias: ["Isaías 1:1-66:24", "Mateus 3:3", "João 12:39-41", "Romanos 10:20-21"],
    citacoesChave: ["Eis-me aqui, envia-me a mim."],
    parentes: { pai: "Amoz", filhos: "Sear-Jasube, Maer-Salal-Hás-Baz" }
  },
  {
    id: "jeremias",
    nome: "Jeremias",
    nomeOriginal: "ירמיהו",
    significadoNome: "O Senhor exalta, o Senhor lança",
    categoria: "Profeta",
    biografia: "Jeremias foi o 'profeta chorão' que profetizou a queda de Jerusalém e o cativeiro babilônico. Chamado desde o ventre, enfrentou intensa perseguição, foi preso e lançado numa cisterna. Escreveu Lamentações e profetizou a Nova Aliança que Deus faria com Israel.",
    primeiraMencao: "Jeremias 1:1-2",
    eventosPrincipais: [
      "Chamado de Deus sendo ainda jovem",
      "Profecias da destruição de Jerusalém",
      "Preso e lançado na cisterna lamacenta",
      "Queda de Jerusalém e exílio",
      "Profecia da Nova Aliança (31:31-34)"
    ],
    referencias: ["Jeremias 1:1-52:34", "Lamentações 1:1-5:22", "Mateus 2:17", "Hebreus 8:8-12"],
    citacoesChave: ["Antes que te formasse no ventre te conheci, e antes que saísses da madre te santifiquei."],
    parentes: { pai: "Hilquias" }
  },
  {
    id: "ezequiel",
    nome: "Ezequiel",
    nomeOriginal: "יחזקאל",
    significadoNome: "Deus fortalece, fortalecido por Deus",
    categoria: "Profeta",
    biografia: "Ezequiel foi um sacerdote e profeta do exílio babilônico, chamado por Deus através de visões da glória divina. Profetizou por meio de sinais dramáticos e visões complexas, incluindo a visão dos ossos secos e do novo Templo. Ministrou aos exilados junto ao rio Quebar.",
    primeiraMencao: "Ezequiel 1:3",
    eventosPrincipais: [
      "Visão do trono de Deus com quatro seres viventes",
      "Comer o rolo do livro",
      "Visão dos ossos secos no vale",
      "Profecias contra as nações",
      "Visão do novo Templo"
    ],
    referencias: ["Ezequiel 1:1-48:35"],
    citacoesChave: ["E sabereis que eu sou o Senhor."],
    parentes: { pai: "Buzi" }
  },
  {
    id: "daniel",
    nome: "Daniel",
    nomeOriginal: "דניאל",
    significadoNome: "Deus é meu juiz",
    categoria: "Profeta",
    biografia: "Daniel foi um nobre judeu levado cativo para a Babilônia, onde serviu nos reinados de Nabucodonosor até Ciro. Conhecido por sua fidelidade a Deus, interpretou sonhos e visões proféticas. Foi lançado na cova dos leões por não cessar de orar a Deus, sendo milagrosamente preservado.",
    primeiraMencao: "Daniel 1:6",
    eventosPrincipais: [
      "Recusa da comida do rei e escolha de legumes e água",
      "Interpretação do sonho da estátua de Nabucodonosor",
      "Interpretação da escrita na parede",
      "Lançado na cova dos leões e preservado"
    ],
    referencias: ["Daniel 1:1-12:13", "Mateus 24:15", "Hebreus 11:33"],
    citacoesChave: ["O meu Deus enviou o seu anjo, e fechou a boca dos leões."]
  },
  {
    id: "hananias",
    nome: "Hananias",
    nomeOriginal: "חנניה",
    significadoNome: "O Senhor é gracioso",
    categoria: "Figura do AT",
    biografia: "Hananias (Sadraque) foi um dos três jovens hebreus levados cativos à Babilônia. Recusou-se a adorar a estátua de ouro de Nabucodonosor e foi lançado na fornalha ardente. O quarto homem como o Filho de Deus apareceu com eles no fogo, e não foram consumidos.",
    primeiraMencao: "Daniel 1:6-7",
    eventosPrincipais: [
      "Recusa de adorar a estátua de ouro",
      "Lançado na fornalha ardente",
      "Preservado milagrosamente com o quarto homem"
    ],
    referencias: ["Daniel 1:6-7", "Daniel 3:1-30"],
    citacoesChave: ["Eis que o nosso Deus a quem nós servimos pode nos livrar."]
  },
  {
    id: "misael",
    nome: "Misael",
    nomeOriginal: "מישאל",
    significadoNome: "Quem é como Deus?",
    categoria: "Figura do AT",
    biografia: "Misael (Mesaque) foi um dos três jovens hebreus que se recusou a adorar a imagem de ouro de Nabucodonosor. Junto com Sadraque e Abede-Nego, foi lançado na fornalha superaquecida, mas Deus os protegeu. Sua fé inabalável é um exemplo clássico de fidelidade.",
    primeiraMencao: "Daniel 1:6-7",
    eventosPrincipais: [
      "Resistência à idolatria babilônica",
      "Lançado na fornalha ardente",
      "Milagre da preservação no fogo"
    ],
    referencias: ["Daniel 1:6-7", "Daniel 3:1-30"]
  },
  {
    id: "azarias",
    nome: "Azarias",
    nomeOriginal: "עזריה",
    significadoNome: "Ajudado pelo Senhor",
    categoria: "Figura do AT",
    biografia: "Azarias (Abede-Nego) foi um dos três jovens hebreus que recusou adorar a imagem de Nabucodonosor. Foi lançado na fornalha, mas o fogo não teve poder sobre ele. O fogo não queimou seus cabelos nem suas roupas, demonstrando o poder do Deus verdadeiro.",
    primeiraMencao: "Daniel 1:6-7",
    eventosPrincipais: [
      "Recusa de adoração à estátua",
      "Preservação na fornalha ardente",
      "Promoção após o milagre"
    ],
    referencias: ["Daniel 1:6-7", "Daniel 3:1-30"]
  },
  {
    id: "ageu",
    nome: "Ageu",
    nomeOriginal: "חגי",
    significadoNome: "Festivo, festa do Senhor",
    categoria: "Profeta",
    biografia: "Ageu foi um profeta do período pós-exílio que encorajou os judeus a reconstruir o Templo em Jerusalém. Profetizou no segundo ano de Dario, motivando Zorobabel e Josué a retomar a obra paralisada. Suas profecias enfatizavam que a glória do novo Templo seria maior que a do antigo.",
    primeiraMencao: "Ageu 1:1",
    eventosPrincipais: [
      "Exortação à reconstrução do Templo",
      "Promessa de que a glória do novo Templo excederia a do antigo",
      "Profecia sobre Zorobabel como servo de Deus"
    ],
    referencias: ["Ageu 1:1-2:23", "Esdras 5:1", "Hebreus 12:26"],
    citacoesChave: ["É tempo para vós outros habitardes em casas apaineladas?!"]
  },
  {
    id: "zacarias_profeta",
    nome: "Zacarias",
    nomeOriginal: "זכריה",
    significadoNome: "O Senhor se lembra",
    categoria: "Profeta",
    biografia: "Zacarias foi um profeta do período pós-exílio que, com Ageu, incentivou a reconstrução do Templo. Suas visões noturnas em forma apocalíptica tratam da restauração de Israel e profecias messiânicas detalhadas. Suas profecias sobre o Messias são citadas no NT.",
    primeiraMencao: "Esdras 5:1",
    eventosPrincipais: [
      "Visões dos cavalos, candelabro, e mulheres",
      "Profecia da entrada triunfal do Messias",
      "Profecia das 30 moedas de prata",
      "Encorajamento à reconstrução do Templo"
    ],
    referencias: ["Zacarias 1:1-14:21", "Mateus 21:5", "Mateus 26:15", "Mateus 27:9"],
    parentes: { pai: "Baraquias" }
  },
  {
    id: "malaquias",
    nome: "Malaquias",
    nomeOriginal: "מלאכי",
    significadoNome: "Meu mensageiro",
    categoria: "Profeta",
    biografia: "Malaquias foi o último profeta do Antigo Testamento, que ministrou após o retorno do exílio. Confrontou a corrupção sacerdotal, os divórcios e os dízimos negados. Sua profecia sobre o mensageiro que prepararia o caminho do Senhor é cumprida em João Batista.",
    primeiraMencao: "Malaquias 1:1",
    eventosPrincipais: [
      "Repreensão aos sacerdotes por ofertas defeituosas",
      "Condenação dos divórcios e casamentos mistos",
      "Profecia de Elias que precederia o Messias"
    ],
    referencias: ["Malaquias 1:1-4:6", "Mateus 11:10", "Lucas 1:17"],
    citacoesChave: ["Eis que eu envio o meu mensageiro, que preparará o caminho diante de mim."]
  },
  {
    id: "oseias",
    nome: "Oséias",
    nomeOriginal: "הושע",
    significadoNome: "Salvação, livramento",
    categoria: "Profeta",
    biografia: "Oséias foi um profeta do Reino do Norte que Deus ordenou que se casasse com uma prostituta, Gomer, para simbolizar a infidelidade de Israel para com Deus. Seu livro retrata o amor persistente de Deus por Israel apesar de sua idolatria. É o primeiro dos profetas menores.",
    primeiraMencao: "Oséias 1:1",
    eventosPrincipais: [
      "Casamento simbólico com Gomer",
      "Nomes proféticos dos filhos: Jezreel, Lo-Ruama, Lo-Ami",
      "Profecias do juízo e restauração de Israel"
    ],
    referencias: ["Oséias 1:1-14:9", "Mateus 9:13", "Romanos 9:25-26"],
    citacoesChave: ["Porque desejo misericórdia, e não sacrifício."],
    parentes: { pai: "Beeri", conjugue: "Gomer", filhos: "Jezreel, Lo-Ruama, Lo-Ami" }
  },
  {
    id: "joel",
    nome: "Joel",
    nomeOriginal: "יואל",
    significadoNome: "O Senhor é Deus, Javé é Deus",
    categoria: "Profeta",
    biografia: "Joel foi um profeta de Judá que descreveu uma devastadora praga de gafanhotos como juízo divino e como figura do Dia do Senhor. Profetizou o derramamento do Espírito Santo sobre toda a carne, cumprido no Pentecostes no Novo Testamento.",
    primeiraMencao: "Joel 1:1",
    eventosPrincipais: [
      "Descrição da praga de gafanhotos",
      "Convocação ao arrependimento",
      "Profecia do derramamento do Espírito"
    ],
    referencias: ["Joel 1:1-3:21", "Atos 2:16-21", "Romanos 10:13"],
    citacoesChave: ["E acontecerá depois que derramarei o meu Espírito sobre toda a carne."],
    parentes: { pai: "Petuel" }
  },
  {
    id: "amos",
    nome: "Amós",
    nomeOriginal: "עמוס",
    significadoNome: "Carregado, fardo",
    categoria: "Profeta",
    biografia: "Amós foi um pastor e cultivador de sicômoros de Tecoa chamado por Deus para profetizar contra Israel. Denunciou a injustiça social e a opressão dos pobres em meio à prosperidade. Confrontou Amazias, o sacerdote de Betel, afirmando seu chamado divino.",
    primeiraMencao: "Amós 1:1",
    eventosPrincipais: [
      "Chamado de Deus enquanto pastor",
      "Denúncia da injustiça social em Israel",
      "Confronto com Amazias em Betel",
      "Visões de juízo: gafanhotos, fogo, prumo, frutos"
    ],
    referencias: ["Amós 1:1-9:15", "Atos 7:42-43"],
    citacoesChave: ["Corram o juízo como as águas, e a justiça como ribeiro impetuoso."]
  },
  {
    id: "obadias_profeta",
    nome: "Obadias",
    nomeOriginal: "עובדיה",
    significadoNome: "Servo do Senhor",
    categoria: "Profeta",
    biografia: "Obadias foi o profeta autor do menor livro do Antigo Testamento, com apenas 21 versículos. Profetizou contra Edom por sua hostilidade contra Israel quando Jerusalém foi atacada. Anunciou o juízo de Deus sobre Edom pela soberba e violência contra seus irmãos israelitas.",
    primeiraMencao: "Obadias 1:1",
    eventosPrincipais: [
      "Profecia contra Edom",
      "Anúncio do Dia do Senhor sobre as nações",
      "Promessa de restauração de Israel"
    ],
    referencias: ["Obadias 1:1-21"]
  },
  {
    id: "jonas_profeta",
    nome: "Jonas",
    nomeOriginal: "יונה",
    significadoNome: "Pomba",
    categoria: "Profeta",
    biografia: "Jonas foi um profeta que tentou fugir do chamado de Deus para pregar em Nínive, navegando para Társis. Durante a tempestade, foi lançado ao mar e engolido por um grande peixe. Após três dias no ventre do peixe, obedeceu e pregou, resultando no arrependimento de toda a cidade.",
    primeiraMencao: "2 Reis 14:25",
    eventosPrincipais: [
      "Fuga para Társis do chamado de Deus",
      "Tempestade e lançamento ao mar",
      "Engolido por grande peixe por três dias",
      "Arrependimento de Nínive após sua pregação",
      "Irritação de Jonas pela misericórdia de Deus"
    ],
    referencias: ["Jonas 1:1-4:11", "Mateus 12:39-41"],
    citacoesChave: ["A salvação vem do Senhor."],
    parentes: { pai: "Amitai" }
  },
  {
    id: "miqueias",
    nome: "Miqueias",
    nomeOriginal: "מיכה",
    significadoNome: "Quem é como o Senhor?",
    categoria: "Profeta",
    biografia: "Miqueias foi um profeta de Judá que profetizou contra a opressão dos pobres e a corrupção dos líderes. Sua profecia sobre Belém como local de nascimento do Messias é uma das mais conhecidas. Enfatizou que Deus requer justiça, misericórdia e humildade.",
    primeiraMencao: "Miqueias 1:1",
    eventosPrincipais: [
      "Denúncia da opressão dos pobres",
      "Profecia do nascimento do Messias em Belém",
      "Exortação ao que Deus requer: justiça, misericórdia, humildade"
    ],
    referencias: ["Miqueias 1:1-7:20", "Mateus 2:5-6", "João 7:42"],
    citacoesChave: ["Ele te declarou, ó homem, o que é bom; e que é que o Senhor pede de ti?"]
  },
  {
    id: "naum",
    nome: "Naum",
    nomeOriginal: "נחום",
    significadoNome: "Consolação, conforto",
    categoria: "Profeta",
    biografia: "Naum foi um profeta de Judá que profetizou a queda de Nínive, capital da Assíria, cem anos após a pregação de Jonas. Seu livro descreve vividamente o juízo de Deus contra a cidade cruel. Anuncia que Deus é tardio em irar-se, mas não inocenta o culpado.",
    primeiraMencao: "Naum 1:1",
    eventosPrincipais: [
      "Profecia da destruição de Nínive",
      "Descrição do poder e justiça de Deus"
    ],
    referencias: ["Naum 1:1-3:19"]
  },
  {
    id: "habacuque",
    nome: "Habacuque",
    nomeOriginal: "חבקוק",
    significadoNome: "Abraço, o que abraça",
    categoria: "Profeta",
    biografia: "Habacuque foi um profeta de Judá que questionou a Deus sobre por que os ímpios prosperam e Deus usa nações mais ímpias para julgar Israel. Sua resposta de que 'o justo viverá pela fé' é central no Novo Testamento. Encerra com uma bela oração de confiança em Deus.",
    primeiraMencao: "Habacuque 1:1",
    eventosPrincipais: [
      "Questionamento sobre a justiça de Deus",
      "Resposta divina sobre o justo viver pela fé",
      "Oração de confiança em Deus apesar da adversidade"
    ],
    referencias: ["Habacuque 1:1-3:19", "Romanos 1:17", "Gálatas 3:11", "Hebreus 10:38"],
    citacoesChave: ["O justo viverá pela sua fé."]
  },
  {
    id: "sofonias",
    nome: "Sofonias",
    nomeOriginal: "צפניה",
    significadoNome: "O Senhor escondeu, protetor",
    categoria: "Profeta",
    biografia: "Sofonias foi um profeta de Judá durante o reinado de Josias, que anunciou o Dia do Senhor como dia de juízo sobre Judá e as nações. Sua profecia sobre a restauração de Israel e o louvor das nações aponta para o reino messiânico. Influenciou a reforma religiosa de Josias.",
    primeiraMencao: "Sofonias 1:1",
    eventosPrincipais: [
      "Proclamação do Dia do Senhor",
      "Juízo sobre Judá, Filístia, Moabe, Amom, Etiópia e Assíria",
      "Promessa de restauração para os remanescentes"
    ],
    referencias: ["Sofonias 1:1-3:20"],
    parentes: { pai: "Cusi" }
  },
  {
    id: "ester",
    nome: "Ester",
    nomeOriginal: "אסתר",
    significadoNome: "Estrela, oculta",
    categoria: "Figura do AT",
    biografia: "Ester foi uma judia que se tornou rainha da Pérsia durante o reinado de Assuero (Xerxes). Quando Hamã tramou o extermínio dos judeus, Ester arriscou sua vida ao apresentar-se ao rei sem ser chamada. Seu plano frustrou o genocídio e salvou seu povo, resultando na festa de Purim.",
    primeiraMencao: "Ester 2:7",
    eventosPrincipais: [
      "Selecionada como rainha da Pérsia",
      "Jejum e oração antes de ir ao rei",
      "Banquete com o rei e Hamã",
      "Revelação do plano de Hamã e salvação dos judeus"
    ],
    referencias: ["Ester 1:1-10:3"],
    citacoesChave: ["Se perecer, pereci."],
    parentes: { pai: "Abiail", conjugue: "Assuero (Xerxes)" }
  },
  {
    id: "mardoqueu",
    nome: "Mardoqueu",
    nomeOriginal: "מרדכי",
    significadoNome: "Pequeno homem, consagrado a Marduque",
    categoria: "Figura do AT",
    biografia: "Mardoqueu foi um judeu da tribo de Benjamim que criou sua prima Ester como filha. Descobriu um complô para assassinar o rei Assuero e registrou-o nos anais. Recusou-se a se curvar a Hamã, desencadeando a crise que resultou na salvação dos judeus. Foi exaltado como segundo no reino.",
    primeiraMencao: "Ester 2:5",
    eventosPrincipais: [
      "Criação de Ester como filha",
      "Descoberta do complô para matar o rei",
      "Recusa de curvar-se a Hamã",
      "Exaltação no lugar de Hamã"
    ],
    referencias: ["Ester 2:5-10:3"],
    parentes: { pai: "Jair" }
  },
  {
    id: "hama",
    nome: "Hamã",
    nomeOriginal: "המן",
    significadoNome: "Magnífico, ilustre",
    categoria: "Figura do AT",
    biografia: "Hamã foi o primeiro-ministro do rei Assuero que conspirou para exterminar todos os judeus por ódio a Mardoqueu. Planejou enforcar Mardoqueu numa forca de 50 côvados, mas foi forçado a honrá-lo publicamente. Foi enforcado na própria forca que preparou para Mardoqueu.",
    primeiraMencao: "Ester 3:1",
    eventosPrincipais: [
      "Promoção por Assuero e ódio a Mardoqueu",
      "Plano de extermínio dos judeus",
      "Humilhado ao ter que honrar Mardoqueu",
      "Enforcado na própria forca"
    ],
    referencias: ["Ester 3:1-7:10"],
    parentes: { pai: "Hamedata", filhos: "10 filhos" }
  },
  {
    id: "neemias",
    nome: "Neemias",
    nomeOriginal: "נחמיה",
    significadoNome: "Consolado pelo Senhor",
    categoria: "Líder",
    biografia: "Neemias foi um judeu copeiro do rei Artaxerxes que liderou a reconstrução dos muros de Jerusalém. Com profunda oração e habilidade administrativa, motivou o povo a reconstruir em apenas 52 dias apesar da oposição. Também promoveu reformas sociais e religiosas após a conclusão.",
    primeiraMencao: "Neemias 1:1",
    eventosPrincipais: [
      "Oração e tristeza pela condição de Jerusalém",
      "Reconstrução dos muros em 52 dias",
      "Oposição de Sambalate, Tobias e Gesém",
      "Reformas sociais e religiosas"
    ],
    referencias: ["Neemias 1:1-13:31"],
    citacoesChave: ["A alegria do Senhor é a vossa força."],
    parentes: { pai: "Hacalias" }
  },
  {
    id: "esdras",
    nome: "Esdras",
    nomeOriginal: "עזרא",
    significadoNome: "Ajuda, auxílio",
    categoria: "Sacerdote",
    biografia: "Esdras foi um escriba e sacerdote que liderou o segundo grupo de exilados de volta a Jerusalém. Dedicou-se a estudar e ensinar a Lei do Senhor a Israel. Promoveu a reforma religiosa, incluindo a separação dos casamentos mistos, e leu publicamente a Lei diante do povo.",
    primeiraMencao: "Esdras 7:1",
    eventosPrincipais: [
      "Liderança do retorno a Jerusalém",
      "Leitura pública da Lei",
      "Reforma dos casamentos mistos",
      "Ensino da Torá ao povo"
    ],
    referencias: ["Esdras 7:1-10:44", "Neemias 8:1-18"],
    parentes: { pai: "Seraías" }
  },
  {
    id: "zorobabel",
    nome: "Zorobabel",
    nomeOriginal: "זרובבל",
    significadoNome: "Nascido na Babilônia, semente de Babel",
    categoria: "Líder",
    biografia: "Zorobabel foi o governador de Judá que liderou o primeiro retorno dos exilados da Babilônia e supervisionou a reconstrução do Templo. Descendente de Davi através de Salomão, é mencionado na genealogia de Jesus Cristo. Enfrentou oposição dos samaritanos na reconstrução.",
    primeiraMencao: "Esdras 2:2",
    eventosPrincipais: [
      "Liderança do primeiro retorno do exílio",
      "Reconstrução do Templo",
      "Oposição de Sambalate e Tobias",
      "Ancestral de Jesus Cristo"
    ],
    referencias: ["Esdras 2:2", "Esdras 3:1-13", "Ageu 1:1-2:23", "Zacarias 4:1-14", "Mateus 1:12-13"],
    parentes: { pai: "Sealtiel (ou Pedaías)", filhos: "Resa, Hananias" }
  },
  {
    id: "josue_sumo",
    nome: "Josué (sumo sacerdote)",
    nomeOriginal: "ישוע",
    significadoNome: "O Senhor é salvação",
    categoria: "Sacerdote",
    biografia: "Josué (Yeshua) foi o sumo sacerdote que retornou do exílio com Zorobabel para ajudar na reconstrução do Templo. Na visão de Zacarias, foi representado como um sacerdote com vestes sujas, simbolizando a purificação de Israel. Sua função sacerdotal foi crucial no restabelecimento do culto em Jerusalém.",
    primeiraMencao: "Ageu 1:1",
    eventosPrincipais: [
      "Reconstrução do Templo com Zorobabel",
      "Visão de Zacarias com vestes sujas purificadas",
      "Restabelecimento do sacerdócio"
    ],
    referencias: ["Ageu 1:1-2:4", "Zacarias 3:1-10", "Esdras 3:2-9"],
    parentes: { pai: "Jeozadaque" }
  },
  {
    id: "eclesiastes",
    nome: "Eclesiastes",
    nomeOriginal: "קהלת",
    significadoNome: "Pregador, convocador da assembleia",
    categoria: "Figura do AT",
    biografia: "Eclesiastes (Qoheleth) é tradicionalmente atribuído a Salomão como o sábio pregador que reflete sobre o sentido da vida. Sua mensagem central é que tudo é vaidade sob o sol, mas o temor a Deus é o dever do homem. Sua obra filosófica questiona o valor das atividades humanas sem Deus.",
    primeiraMencao: "Eclesiastes 1:1",
    eventosPrincipais: [
      "Reflexão sobre a vaidade da vida",
      "Exploração de prazer, sabedoria e trabalho",
      "Conclusão: temer a Deus e guardar seus mandamentos"
    ],
    referencias: ["Eclesiastes 1:1-12:14"],
    citacoesChave: ["Vaidade de vaidades, tudo é vaidade."]
  },
  {
    id: "jesus_cristo",
    nome: "Jesus Cristo",
    nomeOriginal: "ישוע המשיח",
    significadoNome: "O Senhor é salvação, o Ungido",
    categoria: "Figura do NT",
    biografia: "Jesus Cristo é o Filho de Deus, o Messias prometido no Antigo Testamento, nascido da virgem Maria em Belém. Viveu uma vida perfeita, realizou inúmeros milagres, ensinou sobre o Reino de Deus e chamou discípulos. Foi crucificado sob Pôncio Pilatos, ressuscitou ao terceiro dia e ascendeu ao céu, oferecendo salvação a toda a humanidade.",
    primeiraMencao: "Mateus 1:1",
    eventosPrincipais: [
      "Nascimento virginal em Belém",
      "Batismo por João Batista e tentação no deserto",
      "Sermão da Montanha e ensino do Reino",
      "Crucificação, morte e sepultamento",
      "Ressurreição ao terceiro dia e ascensão"
    ],
    referencias: ["Mateus 1:1-28:20", "Marcos 1:1-16:20", "Lucas 1:1-24:53", "João 1:1-21:25"],
    citacoesChave: ["Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito."],
    parentes: { mae: "Maria", pai_terreno: "José", irmaos: "Tiago, José, Simão, Judas" }
  },
  {
    id: "maria_mae",
    nome: "Maria (mãe de Jesus)",
    nomeOriginal: "מרים",
    significadoNome: "Amada, senhora",
    categoria: "Figura do NT",
    biografia: "Maria foi a jovem virgem de Nazaré escolhida por Deus para ser a mãe de Jesus. Concebeu pelo Espírito Santo e foi visitada pelo anjo Gabriel. Acompanhou Jesus durante seu ministério e esteve presente em sua crucificação. É lembrada como serva humilde e fiel de Deus.",
    primeiraMencao: "Mateus 1:16",
    eventosPrincipais: [
      "Anunciação do anjo Gabriel",
      "Visita a Isabel e Magnificat",
      "Nascimento de Jesus em Belém",
      "Apresentação no Templo",
      "Presença na crucificação e no Pentecostes"
    ],
    referencias: ["Mateus 1:16-2:23", "Lucas 1:26-56", "Lucas 2:1-52", "João 19:25-27", "Atos 1:14"],
    citacoesChave: ["A minha alma engrandece ao Senhor, e o meu espírito se alegra em Deus meu Salvador."],
    parentes: { conjugue: "José", filhos: "Jesus, Tiago, José, Simão, Judas" }
  },
  {
    id: "jose_terreno",
    nome: "José (pai terreno)",
    nomeOriginal: "יוסף",
    significadoNome: "Ele acrescentará",
    categoria: "Figura do NT",
    biografia: "José foi o carpinteiro de Nazaré, esposo de Maria e pai terreno de Jesus. Homem justo, planejou deixar Maria secretamente ao saber de sua gravidez, mas foi instruído por anjo em sonho. Protegeu Maria e Jesus, fugindo para o Egito e depois estabelecendo-se em Nazaré.",
    primeiraMencao: "Mateus 1:16",
    eventosPrincipais: [
      "Anúncio do anjo sobre o nascimento de Jesus",
      "Fuga para o Egito com Maria e o menino",
      "Retorno e estabelecimento em Nazaré",
      "Apresentação de Jesus no Templo"
    ],
    referencias: ["Mateus 1:18-2:23", "Lucas 2:1-52"],
    parentes: { conjugue: "Maria", filhos: "Jesus, Tiago, José, Simão, Judas" }
  },
  {
    id: "joao_batista",
    nome: "João Batista",
    nomeOriginal: "יוחנן המטביל",
    significadoNome: "Deus é gracioso, o que batiza",
    categoria: "Profeta",
    biografia: "João Batista foi o precursor do Messias, filho de Zacarias e Isabel. Pregava no deserto da Judeia chamando ao arrependimento e batizando no Jordão. Batizou Jesus e testemunhou que Ele é o Cordeiro de Deus. Foi preso por Herodes Antipas e decapitado por denunciar seu adultério.",
    primeiraMencao: "Mateus 3:1",
    eventosPrincipais: [
      "Pregador no deserto chamando ao arrependimento",
      "Batismo de Jesus no Jordão",
      "Testemunho de que Jesus é o Cordeiro de Deus",
      "Repreensão a Herodes por Herodias",
      "Morte por decapitação"
    ],
    referencias: ["Mateus 3:1-17", "Mateus 14:1-12", "Marcos 1:1-11", "João 1:19-34", "Lucas 1:57-80"],
    citacoesChave: ["Eis o Cordeiro de Deus, que tira o pecado do mundo."],
    parentes: { pai: "Zacarias", mae: "Isabel" }
  },
  {
    id: "isabel",
    nome: "Isabel",
    nomeOriginal: "אלישבע",
    significadoNome: "Deus é o seu juramento, Deus de abundância",
    categoria: "Figura do NT",
    biografia: "Isabel foi a esposa de Zacarias e mãe de João Batista, descendente de Arão e prima de Maria. Era idosa e estéril quando um anjo anunciou que conceberia um filho. Ficou cheia do Espírito Santo quando Maria a visitou, proclamando bênção sobre Maria e seu filho.",
    primeiraMencao: "Lucas 1:5",
    eventosPrincipais: [
      "Concepção milagrosa de João na velhice",
      "Visitação de Maria e saudação profética",
      "Nascimento de João Batista"
    ],
    referencias: ["Lucas 1:5-80"],
    citacoesChave: ["Bendita és tu entre as mulheres, e bendito o fruto do teu ventre!"],
    parentes: { conjugue: "Zacarias", filho: "João Batista" }
  },
  {
    id: "zacarias_pai_joao",
    nome: "Zacarias",
    nomeOriginal: "זכריה",
    significadoNome: "O Senhor se lembra",
    categoria: "Sacerdote",
    biografia: "Zacarias foi um sacerdote judeu, esposo de Isabel e pai de João Batista. Ficou mudo por não crer na promessa do anjo Gabriel sobre o nascimento de seu filho na velhice. Após o nascimento de João, recuperou a fala e profetizou o Benedictus sobre o papel de seu filho.",
    primeiraMencao: "Lucas 1:5",
    eventosPrincipais: [
      "Aparição do anjo Gabriel no Templo",
      "Mudez por incredulidade",
      "Nascimento de João e recuperação da fala",
      "Profecia do Benedictus"
    ],
    referencias: ["Lucas 1:5-80"],
    citacoesChave: ["Bendito seja o Senhor Deus de Israel, porque visitou e redimiu o seu povo."],
    parentes: { conjugue: "Isabel", filho: "João Batista" }
  },
  {
    id: "simeao_nt",
    nome: "Simeão",
    nomeOriginal: "שמעון",
    significadoNome: "Ouvido, aquele que ouve",
    categoria: "Figura do NT",
    biografia: "Simeão era um homem justo e piedoso em Jerusalém que esperava a consolação de Israel. O Espírito Santo lhe revelou que não morreria antes de ver o Messias. Quando Maria e José apresentaram Jesus no Templo, tomou o menino nos braços e louvou a Deus pelo cumprimento da promessa.",
    primeiraMencao: "Lucas 2:25",
    eventosPrincipais: [
      "Revelação do Espírito Santo sobre o Messias",
      "Apresentação de Jesus no Templo",
      "Cântico Nunc Dimittis",
      "Profecia sobre a espada que traspassaria Maria"
    ],
    referencias: ["Lucas 2:25-35"],
    citacoesChave: ["Agora, Senhor, despedes em paz o teu servo, segundo a tua palavra."]
  },
  {
    id: "ana_profetisa",
    nome: "Ana (profetisa)",
    nomeOriginal: "חנה",
    significadoNome: "Graça, favor",
    categoria: "Profetisa",
    biografia: "Ana foi uma profetisa idosa, filha de Fanuel, da tribo de Aser. Viveu no Templo servindo a Deus com jejuns e orações dia e noite. Esteve presente quando Maria e José apresentaram Jesus no Templo e deu graças a Deus, falando do menino a todos que esperavam a redenção em Jerusalém.",
    primeiraMencao: "Lucas 2:36",
    eventosPrincipais: [
      "Viúva que servia no Templo constantemente",
      "Reconhecimento de Jesus como o Messias",
      "Testemunho sobre o Redentor a todos"
    ],
    referencias: ["Lucas 2:36-38"],
    parentes: { pai: "Fanuel" }
  },
  {
    id: "pedro",
    nome: "Pedro",
    nomeOriginal: "Πέτρος (Petros)",
    significadoNome: "Rocha, pedra",
    categoria: "Apóstolo",
    biografia: "Pedro, originalmente chamado Simão, foi um pescador da Galileia chamado por Jesus para ser apóstolo. Tornou-se líder dos doze, andou sobre as águas e confessou Jesus como o Cristo. Negou Jesus três vezes, mas foi restaurado e tornou-se pregador no Pentecostes. Escreveu duas epístolas no NT.",
    primeiraMencao: "Mateus 4:18",
    eventosPrincipais: [
      "Chamado por Jesus enquanto pescava",
      "Confissão de que Jesus é o Cristo",
      "Andou sobre as águas ao encontro de Jesus",
      "Negação de Jesus e restauração",
      "Sermão no Pentecostes"
    ],
    referencias: ["Mateus 4:18-20", "Mateus 16:13-20", "Mateus 26:69-75", "Atos 2:1-41", "1 Pedro 1:1"],
    citacoesChave: ["Tu és o Cristo, o Filho do Deus vivo."],
    parentes: { pai: "Jonas", irmaos: "André" }
  },
  {
    id: "andre",
    nome: "André",
    nomeOriginal: "Ἀνδρέας",
    significadoNome: "Viril, corajoso, másculo",
    categoria: "Apóstolo",
    biografia: "André foi irmão de Pedro e também pescador, discípulo de João Batista antes de seguir Jesus. Foi o primeiro apóstolo chamado por Jesus e trouxe seu irmão Pedro a Cristo. Segundo a tradição, pregou na Grécia e foi crucificado numa cruz em forma de X.",
    primeiraMencao: "Mateus 4:18",
    eventosPrincipais: [
      "Discípulo de João Batista que seguiu Jesus",
      "Primeiro apóstolo chamado",
      "Apresentou Pedro a Jesus",
      "Anunciou a Jesus sobre os gregos que queriam vê-lo"
    ],
    referencias: ["Mateus 4:18-20", "Marcos 1:16-18", "João 1:35-42", "João 12:20-22"],
    parentes: { pai: "Jonas", irmaos: "Pedro" }
  },
  {
    id: "tiago_zebedeu",
    nome: "Tiago (filho de Zebedeu)",
    nomeOriginal: "Ἰάκωβος",
    significadoNome: "Suplantador, aquele que segura o calcanhar",
    categoria: "Apóstolo",
    biografia: "Tiago, filho de Zebedeu, foi um dos doze apóstolos e irmão de João. Jesus o chamou de 'Filho do Trovão' junto com seu irmão. Foi um dos três do círculo íntimo de Jesus (com Pedro e João). Foi o primeiro apóstolo a ser martirizado, morto à espada por Herodes Agripa I.",
    primeiraMencao: "Mateus 4:21",
    eventosPrincipais: [
      "Chamado por Jesus enquanto consertava redes",
      "Testemunha da transfiguração de Jesus",
      "Presente no Getsêmani",
      "Primeiro apóstolo martirizado"
    ],
    referencias: ["Mateus 4:21-22", "Mateus 17:1-8", "Atos 12:1-2"],
    parentes: { pai: "Zebedeu", mae: "Salomé", irmaos: "João (apóstolo)" }
  },
  {
    id: "joao_apostolo",
    nome: "João (apóstolo)",
    nomeOriginal: "Ἰωάννης",
    significadoNome: "Deus é gracioso",
    categoria: "Apóstolo",
    biografia: "João foi filho de Zebedeu, um dos doze apóstolos, conhecido como 'o discípulo a quem Jesus amava'. Escreveu o Evangelho de João, três epístolas e o Apocalipse. Esteve aos pés da cruz com Maria e foi o primeiro a crer na ressurreição ao ver o túmulo vazio.",
    primeiraMencao: "Mateus 4:21",
    eventosPrincipais: [
      "Chamado por Jesus com seu irmão Tiago",
      "Testemunha da transfiguração",
      "Aos pés da cruz com Maria",
      "Correu ao túmulo vazio na ressurreição",
      "Exílio em Patmos onde escreveu o Apocalipse"
    ],
    referencias: ["Mateus 4:21-22", "João 19:26-27", "João 20:1-10", "Apocalipse 1:1-22:21"],
    citacoesChave: ["Deus é amor."],
    parentes: { pai: "Zebedeu", mae: "Salomé", irmaos: "Tiago (filho de Zebedeu)" }
  },
  {
    id: "filipe",
    nome: "Filipe",
    nomeOriginal: "Φίλιππος",
    significadoNome: "Amigo de cavalos, que ama cavalos",
    categoria: "Apóstolo",
    biografia: "Filipe foi um dos doze apóstolos, natural de Betsaida, mesma cidade de Pedro e André. Foi chamado por Jesus diretamente e logo trouxe Natanael (Bartolomeu) a Jesus. Durante o ministério, Jesus testou sua fé perguntando onde comprar pão para a multidão.",
    primeiraMencao: "Mateus 10:3",
    eventosPrincipais: [
      "Chamado por Jesus em Betsaida",
      "Apresentou Natanael a Jesus",
      "Testado por Jesus antes da multiplicação dos pães",
      "Pediu a Jesus que mostrasse o Pai"
    ],
    referencias: ["Mateus 10:3", "João 1:43-48", "João 6:5-7", "João 14:8-9"],
    parentes: {}
  },
  {
    id: "bartolomeu",
    nome: "Bartolomeu (Natanael)",
    nomeOriginal: "Βαρθολομαῖος",
    significadoNome: "Filho de Tolmai",
    categoria: "Apóstolo",
    biografia: "Bartolomeu, também chamado Natanael, foi um dos doze apóstolos. Foi trazido a Jesus por Filipe, e Jesus o elogiou como 'israelita em quem não há dolo'. Estava presente na pesca milagrosa após a ressurreição. Segundo a tradição, pregou na Índia e Armênia.",
    primeiraMencao: "Mateus 10:3",
    eventosPrincipais: [
      "Apresentado a Jesus por Filipe",
      "Elogiado por Jesus como israelita sem dolo",
      "Testemunha da ressurreição"
    ],
    referencias: ["Mateus 10:3", "João 1:45-51", "João 21:2"],
    citacoesChave: ["Rabi, tu és o Filho de Deus; tu és o Rei de Israel!"],
    parentes: {}
  },
  {
    id: "tome",
    nome: "Tomé",
    nomeOriginal: "Θωμᾶς",
    significadoNome: "Gêmeo",
    categoria: "Apóstolo",
    biografia: "Tomé, também chamado Dídimo (gêmeo), foi um dos doze apóstolos conhecido por sua incredulidade inicial na ressurreição. Exigiu ver e tocar as marcas dos cravos para crer. Jesus apareceu e o convidou a tocar, e Tomé fez a mais alta confissão de fé. Segundo a tradição, evangelizou a Índia.",
    primeiraMencao: "Mateus 10:3",
    eventosPrincipais: [
      "Ausente quando Jesus apareceu aos discípulos",
      "Incredulidade e exigência de ver as marcas",
      "Confissão ao ver Jesus: 'Senhor meu e Deus meu!'",
      "Presente na pesca milagrosa"
    ],
    referencias: ["Mateus 10:3", "João 11:16", "João 14:5", "João 20:24-29", "João 21:2"],
    citacoesChave: ["Senhor meu, e Deus meu!"]
  },
  {
    id: "mateus",
    nome: "Mateus (Levi)",
    nomeOriginal: "Ματθαῖος",
    significadoNome: "Dádiva de Deus",
    categoria: "Apóstolo",
    biografia: "Mateus, também chamado Levi, foi um cobrador de impostos (publicano) chamado por Jesus para ser apóstolo. Deixou tudo para seguir Jesus e fez um grande banquete em sua casa. Escreveu o Evangelho de Mateus, o primeiro livro do Novo Testamento, dirigido principalmente aos judeus.",
    primeiraMencao: "Mateus 9:9",
    eventosPrincipais: [
      "Chamado por Jesus enquanto cobrava impostos",
      "Grande banquete em sua casa com publicanos",
      "Escrita do Evangelho de Mateus"
    ],
    referencias: ["Mateus 9:9-13", "Marcos 2:14-17", "Lucas 5:27-32"],
    parentes: { pai: "Alfeu" }
  },
  {
    id: "tiago_alfeu",
    nome: "Tiago (filho de Alfeu)",
    nomeOriginal: "Ἰάκωβος",
    significadoNome: "Suplantador",
    categoria: "Apóstolo",
    biografia: "Tiago, filho de Alfeu, foi um dos doze apóstolos, frequentemente chamado de Tiago Menor para distingui-lo de Tiago de Zebedeu. Pouco se sabe sobre ele nos Evangelhos. Alguns o identificam com Tiago, irmão de Jesus, que liderou a igreja em Jerusalém.",
    primeiraMencao: "Mateus 10:3",
    eventosPrincipais: [
      "Escolhido como um dos doze apóstolos",
      "Liderança na igreja de Jerusalém (se identificado com Tiago, irmão de Jesus)"
    ],
    referencias: ["Mateus 10:3", "Marcos 3:18", "Lucas 6:15", "Atos 15:13-21"],
    parentes: { pai: "Alfeu" }
  },
  {
    id: "tadeu",
    nome: "Tadeu (Judas)",
    nomeOriginal: "Θαδδαῖος",
    significadoNome: "Coração, corajoso",
    categoria: "Apóstolo",
    biografia: "Tadeu, também chamado Judas (filho de Tiago) ou Lebeu, foi um dos doze apóstolos. No Evangelho de João, perguntou a Jesus por que Ele se manifestaria apenas aos discípulos e não ao mundo. Escreveu a epístola de Judas no Novo Testamento.",
    primeiraMencao: "Mateus 10:3",
    eventosPrincipais: [
      "Escolhido como um dos doze apóstolos",
      "Pergunta a Jesus sobre a manifestação aos discípulos",
      "Escrita da epístola de Judas"
    ],
    referencias: ["Mateus 10:3", "Marcos 3:18", "João 14:22", "Judas 1:1-25"],
    parentes: { pai: "Tiago" }
  },
  {
    id: "simao_zelote",
    nome: "Simão (Zelote)",
    nomeOriginal: "Σίμων ὁ Ζηλωτής",
    significadoNome: "Ouvinte, o zeloso",
    categoria: "Apóstolo",
    biografia: "Simão, chamado Zelote ou Cananeu, foi um dos doze apóstolos. O epíteto 'Zelote' indica que possivelmente pertencia ao partido político-religioso dos zelotes, que se opunham ao domínio romano. Pouco mais se sabe sobre seu ministério posterior.",
    primeiraMencao: "Mateus 10:4",
    eventosPrincipais: [
      "Escolhido como um dos doze apóstolos",
      "Presente no Pentecostes"
    ],
    referencias: ["Mateus 10:4", "Marcos 3:18", "Lucas 6:15", "Atos 1:13"],
    parentes: {}
  },
  {
    id: "judas_iscariotes",
    nome: "Judas Iscariotes",
    nomeOriginal: "Ἰούδας Ἰσκαριώτης",
    significadoNome: "Judas, o homem de Queriote",
    categoria: "Apóstolo",
    biografia: "Judas Iscariotes foi um dos doze apóstolos que traiu Jesus por 30 moedas de prata. Era o tesoureiro do grupo e roubava da bolsa. Entregou Jesus aos líderes religiosos com um beijo no Getsêmani. Cheio de remorso, devolveu o dinheiro e se enforcou.",
    primeiraMencao: "Mateus 10:4",
    eventosPrincipais: [
      "Escolhido como apóstolo e tesoureiro",
      "Negociação da traição por 30 moedas de prata",
      "Traição com um beijo no Getsêmani",
      "Remorso, devolução do dinheiro e suicídio"
    ],
    referencias: ["Mateus 10:4", "Mateus 26:14-16", "Mateus 26:47-50", "Mateus 27:3-10", "Atos 1:16-20"],
    parentes: { pai: "Simão Iscariotes" }
  },
  {
    id: "matias",
    nome: "Matias",
    nomeOriginal: "Ματθίας",
    significadoNome: "Dádiva de Deus",
    categoria: "Apóstolo",
    biografia: "Matias foi escolhido por sorteio para substituir Judas Iscariotes como apóstolo após a ascensão de Jesus. Ele havia acompanhado Jesus desde o batismo de João até a ascensão. Sua escolha ocorreu no cenáculo em Jerusalém, antes do Pentecostes.",
    primeiraMencao: "Atos 1:23",
    eventosPrincipais: [
      "Testemunha do ministério de Jesus desde o batismo",
      "Escolhido por sorteio como apóstolo",
      "Presente no Pentecostes"
    ],
    referencias: ["Atos 1:15-26"]
  },
  {
    id: "paulo",
    nome: "Paulo",
    nomeOriginal: "Παῦλος (Saulos)",
    significadoNome: "Pequeno, humilde",
    categoria: "Apóstolo",
    biografia: "Paulo, originalmente Saulo de Tarso, foi um fariseu que perseguia a igreja antes de sua conversão no caminho de Damasco. Tornou-se o maior missionário cristão, escrevendo 13 epístolas do NT. Realizou três viagens missionárias, estabelecendo igrejas por todo o Mediterrâneo. Foi martirizado em Roma sob Nero.",
    primeiraMencao: "Atos 7:58",
    eventosPrincipais: [
      "Presença na morte de Estêvão",
      "Conversão no caminho de Damasco",
      "Cegueira e restauração por Ananias",
      "Três viagens missionárias",
      "Prisão em Roma e martírio"
    ],
    referencias: ["Atos 7:58-9:31", "Atos 13:1-28:31", "Romanos 1:1", "2 Coríntios 11:24-28", "Gálatas 1:11-24"],
    citacoesChave: ["Combati o bom combate, acabei a carreira, guardei a fé."],
    parentes: {}
  },
  {
    id: "barnabe",
    nome: "Barnabé",
    nomeOriginal: "Βαρνάβας",
    significadoNome: "Filho da consolação, filho do encorajamento",
    categoria: "Missionário",
    biografia: "Barnabé foi um levita de Chipre, companheiro de Paulo na primeira viagem missionária. Apresentou Paulo aos apóstolos em Jerusalém quando estes duvidavam dele. Conhecido como 'Filho da Consolação', foi um encorajador nato. Separou-se de Paulo por causa de João Marcos.",
    primeiraMencao: "Atos 4:36",
    eventosPrincipais: [
      "Vendeu seu campo e deu o dinheiro aos apóstolos",
      "Apresentou Paulo aos apóstolos",
      "Trabalhou em Antioquia com Paulo",
      "Primeira viagem missionária com Paulo",
      "Separação de Paulo por causa de João Marcos"
    ],
    referencias: ["Atos 4:36-37", "Atos 9:26-27", "Atos 11:22-26", "Atos 13:1-15:41", "Gálatas 2:1-13"]
  },
  {
    id: "silas",
    nome: "Silas",
    nomeOriginal: "Σίλας",
    significadoNome: "Silvestre, da floresta",
    categoria: "Missionário",
    biografia: "Silas foi um profeta e líder da igreja de Jerusalém, companheiro de Paulo na segunda viagem missionária. Foi preso com Paulo em Filipos e libertado por um terremoto. Era cidadão romano, o que o protegeu em certas situações. Coautor das cartas aos Tessalonicenses.",
    primeiraMencao: "Atos 15:22",
    eventosPrincipais: [
      "Escolhido para levar o decreto de Jerusalém",
      "Companheiro de Paulo na segunda viagem missionária",
      "Preso com Paulo em Filipos",
      "Libertado por terremoto"
    ],
    referencias: ["Atos 15:22-40", "Atos 16:19-40", "1 Tessalonicenses 1:1", "2 Tessalonicenses 1:1"]
  },
  {
    id: "timoteo",
    nome: "Timóteo",
    nomeOriginal: "Τιμόθεος",
    significadoNome: "Que honra a Deus, precioso para Deus",
    categoria: "Missionário",
    biografia: "Timóteo foi um jovem discípulo de Listra, filho de mãe judia e pai grego, que se tornou companheiro fiel de Paulo. Foi circuncidado por Paulo para evitar problemas com os judeus. Tornou-se pastor da igreja em Éfeso e recebeu duas cartas de Paulo (1 e 2 Timóteo).",
    primeiraMencao: "Atos 16:1",
    eventosPrincipais: [
      "Conhecido por Paulo em Listra",
      "Circuncidado por Paulo",
      "Acompanhou Paulo em viagens missionárias",
      "Enviado a Éfeso como pastor",
      "Recebeu as epístolas pastorais"
    ],
    referencias: ["Atos 16:1-5", "Filipenses 2:19-23", "1 Timóteo 1:1-6:21", "2 Timóteo 1:1-4:22"],
    parentes: { mae: "Eunice", avo: "Lóide" }
  },
  {
    id: "tito",
    nome: "Tito",
    nomeOriginal: "Τίτος",
    significadoNome: "Honrado",
    categoria: "Missionário",
    biografia: "Tito foi um companheiro grego de Paulo, não circuncidado, que o acompanhou ao Concílio de Jerusalém. Foi enviado a Corinto para resolver problemas na igreja. Mais tarde, foi deixado em Creta para organizar igrejas e recebeu a epístola pastoral de Paulo.",
    primeiraMencao: "Gálatas 2:1",
    eventosPrincipais: [
      "Presente no Concílio de Jerusalém",
      "Enviado a Corinto para resolver problemas",
      "Deixado em Creta para estabelecer liderança",
      "Recebeu a epístola de Tito"
    ],
    referencias: ["Gálatas 2:1-3", "2 Coríntios 7:6-16", "2 Coríntios 8:16-24", "Tito 1:1-3:15"]
  },
  {
    id: "lidia",
    nome: "Lídia",
    nomeOriginal: "Λυδία",
    significadoNome: "Mulher da Lídia, procedente da Lídia",
    categoria: "Figura do NT",
    biografia: "Lídia foi uma vendedora de púrpura da cidade de Tiatira, em Filipos, a primeira convertida ao cristianismo na Europa. Após ouvir Paulo pregar junto ao rio, seu coração foi aberto pelo Senhor. Ela e sua casa foram batizadas, e ela insistiu que Paulo e Silas ficassem em sua casa.",
    primeiraMencao: "Atos 16:14",
    eventosPrincipais: [
      "Conversão ao ouvir Paulo pregar em Filipos",
      "Batismo de sua casa",
      "Hospedagem de Paulo e Silas em sua casa"
    ],
    referencias: ["Atos 16:14-15", "Atos 16:40"]
  },
  {
    id: "priscila",
    nome: "Priscila",
    nomeOriginal: "Πρίσκιλλα",
    significadoNome: "Antiga, venerável",
    categoria: "Figura do NT",
    biografia: "Priscila foi uma judia cristã, esposa de Áquila, que trabalhava como fabricante de tendas. Junto com o marido, acompanhou Paulo de Corinto a Éfeso. Instruiu Apolo mais precisamente no caminho de Deus. Liderava uma igreja em sua casa e é sempre mencionada antes do marido.",
    primeiraMencao: "Atos 18:2",
    eventosPrincipais: [
      "Saída de Roma com Áquila pelo édito de Cláudio",
      "Trabalho com Paulo em Corinto",
      "Instrução de Apolo em Éfeso",
      "Liderança de igreja em sua casa"
    ],
    referencias: ["Atos 18:2-3", "Atos 18:26", "Romanos 16:3-5", "1 Coríntios 16:19"],
    parentes: { conjugue: "Áquila" }
  },
  {
    id: "aquila",
    nome: "Áquila",
    nomeOriginal: "Ἀκύλας",
    significadoNome: "Águia",
    categoria: "Figura do NT",
    biografia: "Áquila foi um judeu do Ponto, fabricante de tendas, esposo de Priscila. Trabalhou com Paulo em Corinto e o acompanhou a Éfeso. Junto com Priscila, explicou a Apolo o caminho de Deus mais precisamente. Liderou igrejas em sua casa em várias cidades.",
    primeiraMencao: "Atos 18:2",
    eventosPrincipais: [
      "Saída de Roma pelo édito de Cláudio",
      "Trabalho com Paulo em Corinto",
      "Instrução de Apolo com Priscila",
      "Liderança de igrejas em sua casa"
    ],
    referencias: ["Atos 18:2-3", "Atos 18:26", "Romanos 16:3-5", "1 Coríntios 16:19"],
    parentes: { conjugue: "Priscila" }
  },
  {
    id: "apolo",
    nome: "Apolo",
    nomeOriginal: "Ἀπολλώς",
    significadoNome: "Dado por Apolo (deus grego)",
    categoria: "Missionário",
    biografia: "Apolo foi um judeu de Alexandria, eloquente e poderoso nas Escrituras. Pregava com fervor, mas conhecia apenas o batismo de João. Priscila e Áquila o instruíram mais precisamente. Trabalhou em Corinto, e Paulo o menciona como regador da obra de Deus.",
    primeiraMencao: "Atos 18:24",
    eventosPrincipais: [
      "Pregador eloquente de Alexandria",
      "Instruído por Priscila e Áquila",
      "Trabalho em Corinto",
      "Mencionado por Paulo como regador"
    ],
    referencias: ["Atos 18:24-28", "1 Coríntios 1:12", "1 Coríntios 3:4-6", "Tito 3:13"]
  },
  {
    id: "lucas",
    nome: "Lucas",
    nomeOriginal: "Λουκᾶς",
    significadoNome: "Luminoso, o que ilumina",
    categoria: "Missionário",
    biografia: "Lucas foi um médico grego, companheiro fiel de Paulo e autor do Evangelho de Lucas e Atos dos Apóstolos. Acompanhou Paulo em parte de suas viagens missionárias, incluindo a viagem a Roma. É o único escritor gentio do NT e conhecido por sua precisão histórica.",
    primeiraMencao: "Colossenses 4:14",
    eventosPrincipais: [
      "Escrita do Evangelho de Lucas e Atos",
      "Companheiro de Paulo nas viagens",
      "Presente na prisão de Paulo em Roma",
      "Último companheiro de Paulo antes do martírio"
    ],
    referencias: ["Colossenses 4:14", "2 Timóteo 4:11", "Filemom 1:24", "Lucas 1:1-4", "Atos 1:1-2"],
    parentes: {}
  },
  {
    id: "marcos",
    nome: "Marcos",
    nomeOriginal: "Μάρκος",
    significadoNome: "Martelo",
    categoria: "Missionário",
    biografia: "João Marcos foi filho de Maria, em cuja casa a igreja se reunia em Jerusalém. Acompanhou Paulo e Barnabé na primeira viagem, mas os deixou, causando a separação entre eles. Mais tarde, foi restaurado e Paulo o considerou útil. Escreveu o Evangelho de Marcos segundo Pedro.",
    primeiraMencao: "Atos 12:12",
    eventosPrincipais: [
      "Casa de sua mãe como local de oração da igreja",
      "Abandono de Paulo e Barnabé na primeira viagem",
      "Causa da separação entre Paulo e Barnabé",
      "Restauração e utilidade para Paulo",
      "Escrita do Evangelho de Marcos"
    ],
    referencias: ["Atos 12:12", "Atos 13:5-13", "Atos 15:36-41", "2 Timóteo 4:11", "1 Pedro 5:13"],
    parentes: { mae: "Maria" }
  },
  {
    id: "estevao",
    nome: "Estêvão",
    nomeOriginal: "Στέφανος",
    significadoNome: "Coroa, coroado",
    categoria: "Figura do NT",
    biografia: "Estêvão foi um dos sete diáconos escolhidos pela igreja primitiva, cheio de fé e do Espírito Santo. Era conhecido por seus milagres e sabedoria. Foi acusado falsamente e apedrejado até a morte, tornando-se o primeiro mártir cristão. Seu discurso diante do Sinédrio é uma obra-prima da história bíblica.",
    primeiraMencao: "Atos 6:5",
    eventosPrincipais: [
      "Escolhido como um dos sete diáconos",
      "Realizava milagres entre o povo",
      "Discurso diante do Sinédrio",
      "Apedrejamento como primeiro mártir",
      "Paulo (Saulo) presente em sua morte"
    ],
    referencias: ["Atos 6:1-8:2", "Atos 22:20"],
    citacoesChave: ["Senhor, não lhes imputes este pecado."],
    parentes: {}
  },
  {
    id: "filipe_diacon",
    nome: "Filipe (diácono)",
    nomeOriginal: "Φίλιππος",
    significadoNome: "Amigo de cavalos",
    categoria: "Missionário",
    biografia: "Filipe foi um dos sete diáconos, diferente do apóstolo Filipe. Evangelizou em Samaria com grande poder e batizou o eunuco etíope no caminho de Gaza. Foi arrebatado pelo Espírito após o batismo do eunuco. Tinha quatro filhas profetisas.",
    primeiraMencao: "Atos 6:5",
    eventosPrincipais: [
      "Escolhido como um dos sete diáconos",
      "Evangelização de Samaria",
      "Encontro e batismo do eunuco etíope",
      "Arrebatado pelo Espírito após o batismo"
    ],
    referencias: ["Atos 6:5", "Atos 8:5-40", "Atos 21:8-9"]
  },
  {
    id: "cornelio",
    nome: "Cornélio",
    nomeOriginal: "Κορνήλιος",
    significadoNome: "Chifre, forte como chifre",
    categoria: "Figura do NT",
    biografia: "Cornélio foi um centurião romano em Cesareia, temente a Deus, que orava e dava esmolas. Teve uma visão de um anjo que o instruiu a chamar Pedro. Pedro foi a sua casa e pregou, e o Espírito Santo desceu sobre os gentios, marcando a abertura da igreja aos não-judeus.",
    primeiraMencao: "Atos 10:1",
    eventosPrincipais: [
      "Visão do anjo em Cesareia",
      "Envio de mensageiros a Pedro",
      "Visão de Pedro do lençol com animais",
      "Pregação de Pedro e descida do Espírito Santo",
      "Batismo dos primeiros gentios"
    ],
    referencias: ["Atos 10:1-11:18"]
  },
  {
    id: "dorcas",
    nome: "Dorcas (Tabita)",
    nomeOriginal: "Δορκάς (Ταβιθά)",
    significadoNome: "Gazela",
    categoria: "Figura do NT",
    biografia: "Dorcas, também chamada Tabita, era uma discípula em Jope conhecida por suas boas obras e caridade. Fazia túnicas e vestidos para os pobres. Adoeceu e morreu, mas Pedro foi chamado, orou sobre ela e a ressuscitou dos mortos. Muitos creram no Senhor por este milagre.",
    primeiraMencao: "Atos 9:36",
    eventosPrincipais: [
      "Conhecida por suas obras de caridade",
      "Morte e luto da igreja",
      "Ressurreição por Pedro"
    ],
    referencias: ["Atos 9:36-42"]
  },
  {
    id: "febe",
    nome: "Febe",
    nomeOriginal: "Φοίβη",
    significadoNome: "Pura, brilhante, radiante",
    categoria: "Figura do NT",
    biografia: "Febe foi uma diaconisa da igreja em Cencréia, porto de Corinto. Paulo a recomenda em Romanos 16 como 'nossa irmã' e 'servidora da igreja'. Provavelmente entregou e leu a carta aos Romanos. Paulo pede que a recebam no Senhor como é digno aos santos.",
    primeiraMencao: "Romanos 16:1",
    eventosPrincipais: [
      "Diaconisa em Cencréia",
      "Portadora da carta aos Romanos"
    ],
    referencias: ["Romanos 16:1-2"]
  },
  {
    id: "epafras",
    nome: "Epafras",
    nomeOriginal: "Ἐπαφρᾶς",
    significadoNome: "Amado, encantador, coberto de espuma",
    categoria: "Missionário",
    biografia: "Epafras foi um companheiro de Paulo, fundador da igreja em Colossos. Paulo o chama de 'servo de Jesus Cristo' e testemunha de seu grande zelo e orações pelos colossenses. Esteve preso com Paulo em Roma. É distinto de Epafrodito.",
    primeiraMencao: "Colossenses 1:7",
    eventosPrincipais: [
      "Fundador da igreja em Colossos",
      "Enviado a Paulo com notícias da igreja",
      "Preso com Paulo em Roma",
      "Oração fervorosa pelos colossenses"
    ],
    referencias: ["Colossenses 1:7-8", "Colossenses 4:12-13", "Filemom 1:23"]
  },
  {
    id: "onesimo",
    nome: "Onésimo",
    nomeOriginal: "Ὀνήσιμος",
    significadoNome: "Útil, proveitoso",
    categoria: "Figura do NT",
    biografia: "Onésimo foi um escravo que fugiu de seu senhor Filemom em Colossos e encontrou Paulo em Roma. Paulo o evangelizou e o enviou de volta a Filemom com a carta que leva seu nome. Paulo pede que Filemom o receba não como escravo, mas como irmão amado.",
    primeiraMencao: "Colossenses 4:9",
    eventosPrincipais: [
      "Fuga de Filemom em Colossos",
      "Encontro com Paulo em Roma",
      "Conversão ao cristianismo",
      "Enviado de volta com a carta de Filemom"
    ],
    referencias: ["Filemom 1:10-21", "Colossenses 4:9"]
  },
  {
    id: "filemom",
    nome: "Filemom",
    nomeOriginal: "Φιλήμων",
    significadoNome: "Amigável, bondoso, afeiçoado",
    categoria: "Figura do NT",
    biografia: "Filemom foi um cristão rico de Colossos, proprietário do escravo Onésimo. Paulo lhe escreveu uma carta pessoal pedindo que recebesse Onésimo de volta como irmão. Sua casa servia como local de reunião da igreja em Colossos. É o destinatário de uma das epístolas de Paulo.",
    primeiraMencao: "Filemom 1:1",
    eventosPrincipais: [
      "Líder da igreja em Colossos",
      "Recebeu a carta de Paulo sobre Onésimo",
      "Igreja reunida em sua casa"
    ],
    referencias: ["Filemom 1:1-25"]
  },
  {
    id: "demas",
    nome: "Demas",
    nomeOriginal: "Δημᾶς",
    significadoNome: "Popular, do povo",
    categoria: "Figura do NT",
    biografia: "Demas foi um companheiro de Paulo mencionado em três cartas. Inicialmente elogiado como cooperador, mas depois Paulo lamenta que Demas o abandonou por amor ao mundo. É um triste exemplo de alguém que começou bem, mas se desviou.",
    primeiraMencao: "Colossenses 4:14",
    eventosPrincipais: [
      "Companheiro de Paulo mencionado como cooperador",
      "Abandono de Paulo por amor ao presente mundo"
    ],
    referencias: ["Colossenses 4:14", "Filemom 1:24", "2 Timóteo 4:10"]
  },
  {
    id: "joao_marcos",
    nome: "João Marcos",
    nomeOriginal: "Ἰωάννης Μάρκος",
    significadoNome: "Deus é gracioso, martelo",
    categoria: "Missionário",
    biografia: "João Marcos (ver também Marcos) é o mesmo Marcos mencionado nos Evangelhos, filho de Maria de Jerusalém. Acompanhou Barnabé (seu primo) após a separação de Paulo. Foi restaurado e Paulo mais tarde o considerou útil para o ministério. Escreveu o Evangelho de Marcos.",
    primeiraMencao: "Atos 12:12",
    eventosPrincipais: [
      "Filho de Maria, casa de oração em Jerusalém",
      "Acompanhou Paulo e Barnabé",
      "Abandono em Perge",
      "Restauração e escrita do Evangelho"
    ],
    referencias: ["Atos 12:12", "Atos 13:5", "Atos 15:37-39", "Colossenses 4:10", "2 Timóteo 4:11"],
    parentes: { mae: "Maria", primo: "Barnabé" }
  },
  {
    id: "lazaro",
    nome: "Lázaro",
    nomeOriginal: "Λάζαρος",
    significadoNome: "Deus ajudou, Deus é socorro",
    categoria: "Figura do NT",
    biografia: "Lázaro foi o irmão de Marta e Maria de Betânia, amigo íntimo de Jesus. Quando adoeceu e morreu, Jesus esperou quatro dias antes de ir a Betânia. Jesus o ressuscitou dos mortos, um dos maiores milagres registrados. Muitos judeus creram em Jesus por causa deste milagre.",
    primeiraMencao: "João 11:1",
    eventosPrincipais: [
      "Doença e morte em Betânia",
      "Jesus espera quatro dias",
      "Ressurreição por Jesus",
      "Muitos judeus creem em Jesus"
    ],
    referencias: ["João 11:1-44", "João 12:1-11"]
  },
  {
    id: "marta",
    nome: "Marta",
    nomeOriginal: "Μάρθα",
    significadoNome: "Senhora, dona de casa",
    categoria: "Figura do NT",
    biografia: "Marta era irmã de Lázaro e Maria de Betânia, amiga de Jesus. Conhecida por sua hospitalidade e serviço, certa vez reclamou que Maria não a ajudava nos afazeres. Jesus a ensinou que Maria escolhera a melhor parte. Confessou que Jesus era o Cristo antes da ressurreição de Lázaro.",
    primeiraMencao: "Lucas 10:38",
    eventosPrincipais: [
      "Hospedagem de Jesus em Betânia",
      "Queixa sobre Maria não ajudar",
      "Confissão de fé na ressurreição",
      "Presença na ressurreição de Lázaro"
    ],
    referencias: ["Lucas 10:38-42", "João 11:1-45", "João 12:1-2"],
    citacoesChave: ["Eu creio que tu és o Cristo, o Filho de Deus."],
    parentes: { irmaos: "Lázaro, Maria de Betânia" }
  },
  {
    id: "maria_betania",
    nome: "Maria (de Betânia)",
    nomeOriginal: "Μαρία",
    significadoNome: "Amada, senhora",
    categoria: "Figura do NT",
    biografia: "Maria de Betânia era irmã de Marta e Lázaro, conhecida por seu profundo amor a Jesus. Sentou-se aos pés de Jesus ouvindo seus ensinamentos enquanto Marta servia. Ungiu Jesus com perfume caro de nardo puro, enxugando seus pés com seus cabelos. Jesus a defendeu dizendo que seria lembrada.",
    primeiraMencao: "Lucas 10:39",
    eventosPrincipais: [
      "Sentou-se aos pés de Jesus ouvindo",
      "Ungiu Jesus com nardo puro",
      "Defendida por Jesus de críticas"
    ],
    referencias: ["Lucas 10:38-42", "João 11:1-45", "João 12:1-8"],
    parentes: { irmaos: "Marta, Lázaro" }
  },
  {
    id: "nicodemos",
    nome: "Nicodemos",
    nomeOriginal: "Νικόδημος",
    significadoNome: "Vencedor do povo, conquistador",
    categoria: "Figura do NT",
    biografia: "Nicodemos foi um fariseu e membro do Sinédrio, mestre em Israel, que visitou Jesus à noite para aprender. Jesus lhe ensinou sobre o novo nascimento. Mais tarde, defendeu Jesus perante os fariseus. Após a crucificação, trouxe 100 libras de mirra e aloés para o sepultamento de Jesus.",
    primeiraMencao: "João 3:1",
    eventosPrincipais: [
      "Visita noturna a Jesus",
      "Ensino sobre o novo nascimento",
      "Defesa de Jesus no Sinédrio",
      "Sepultamento de Jesus com José de Arimateia"
    ],
    referencias: ["João 3:1-21", "João 7:50-51", "João 19:39-42"]
  },
  {
    id: "jose_arimateia",
    nome: "José de Arimateia",
    nomeOriginal: "Ἰωσὴφ",
    significadoNome: "Deus acrescenta",
    categoria: "Figura do NT",
    biografia: "José de Arimateia foi um membro rico e respeitado do Sinédrio, discípulo secreto de Jesus. Após a crucificação, corajosamente pediu a Pilatos o corpo de Jesus. Providenciou o sepultamento em seu próprio túmulo novo, escavado na rocha, envolvendo o corpo em linho fino.",
    primeiraMencao: "Mateus 27:57",
    eventosPrincipais: [
      "Pedido do corpo de Jesus a Pilatos",
      "Sepultamento de Jesus em seu túmulo novo",
      "Discípulo secreto que se revelou"
    ],
    referencias: ["Mateus 27:57-61", "Marcos 15:42-47", "Lucas 23:50-56", "João 19:38-42"]
  },
  {
    id: "gamaliel",
    nome: "Gamaliel",
    nomeOriginal: "Γαμαλιήλ",
    significadoNome: "Recompensa de Deus, benefício de Deus",
    categoria: "Figura do NT",
    biografia: "Gamaliel foi um fariseu e mestre da Lei, membro do Sinédrio, neto de Hilel. Era tão respeitado que era chamado de 'Rabão'. No Sinédrio, aconselhou moderação em relação aos apóstolos, argumentando que se o movimento fosse de Deus não poderia ser impedido. Paulo foi seu aluno.",
    primeiraMencao: "Atos 5:34",
    eventosPrincipais: [
      "Conselho ao Sinédrio sobre os apóstolos",
      "Mestre de Paulo (Saulo) antes de sua conversão"
    ],
    referencias: ["Atos 5:34-40", "Atos 22:3"]
  },
  {
    id: "herodes_grande",
    nome: "Herodes (o Grande)",
    nomeOriginal: "Ἡρῴδης",
    significadoNome: "Herói, descendente de herói",
    categoria: "Figura do NT",
    biografia: "Herodes, o Grande, foi rei da Judeia nomeado por Roma, conhecido por suas grandes construções, incluindo a expansão do Segundo Templo. Ao saber do nascimento do 'Rei dos Judeus', ordenou o massacre de todos os meninos em Belém com menos de dois anos. Morreu pouco depois do nascimento de Jesus.",
    primeiraMencao: "Mateus 2:1",
    eventosPrincipais: [
      "Rei da Judeia quando Jesus nasceu",
      "Visita dos magos do Oriente",
      "Massacre dos inocentes em Belém",
      "Morte e sucessão por seus filhos"
    ],
    referencias: ["Mateus 2:1-22", "Lucas 1:5"]
  },
  {
    id: "herodes_antipas",
    nome: "Herodes Antipas",
    nomeOriginal: "Ἡρῴδης Ἀντίπας",
    significadoNome: "Herói, contra todos",
    categoria: "Figura do NT",
    biografia: "Herodes Antipas foi filho de Herodes o Grande, tetrarca da Galileia e Pereia durante o ministério de Jesus. Decapitou João Batista por influência de Herodias. Jesus foi enviado a ele por Pilatos durante seu julgamento. Também mencionado como perseguidor da igreja primitiva.",
    primeiraMencao: "Mateus 14:1",
    eventosPrincipais: [
      "Decapitação de João Batista",
      "Jesus enviado a ele por Pilatos",
      "Perseguição à igreja primitiva"
    ],
    referencias: ["Mateus 14:1-12", "Lucas 23:6-12", "Atos 4:27", "Atos 12:1"]
  },
  {
    id: "pilatos",
    nome: "Pilatos",
    nomeOriginal: "Πόντιος Πιλᾶτος",
    significadoNome: "Armado com dardo, que porta lança",
    categoria: "Figura do NT",
    biografia: "Pôncio Pilatos foi o governador romano da Judeia que presidiu o julgamento de Jesus. Reconheceu a inocência de Jesus, mas cedeu à pressão da multidão e o condenou à crucificação. Lavou as mãos simbolicamente para demonstrar sua inocência. Mais tarde foi deposto e exilado.",
    primeiraMencao: "Mateus 27:2",
    eventosPrincipais: [
      "Julgamento de Jesus",
      "Reconhecimento da inocência de Jesus",
      "Lavagem das mãos",
      "Condenação à crucificação"
    ],
    referencias: ["Mateus 27:1-26", "Marcos 15:1-15", "Lucas 23:1-25", "João 18:28-19:22", "Atos 4:27"]
  },
  {
    id: "caifas",
    nome: "Caifás",
    nomeOriginal: "Καϊάφας",
    significadoNome: "Depressor, procurador",
    categoria: "Figura do NT",
    biografia: "Caifás foi o sumo sacerdote judeu durante o julgamento de Jesus (18-36 d.C.), genro de Anás. Presidiu o Sinédrio que condenou Jesus por blasfêmia. Profetizou inconscientemente que era melhor que um homem morresse pelo povo. Também julgou Pedro e João no Sinédrio.",
    primeiraMencao: "Mateus 26:3",
    eventosPrincipais: [
      "Julgamento de Jesus no Sinédrio",
      "Profecia sobre a morte de Jesus",
      "Perseguição à igreja primitiva"
    ],
    referencias: ["Mateus 26:3-68", "Mateus 27:1-2", "João 11:49-52", "Atos 4:6"]
  },
  {
    id: "anas",
    nome: "Anás",
    nomeOriginal: "Ἄννας",
    significadoNome: "Humilde, gracioso",
    categoria: "Figura do NT",
    biografia: "Anás foi sumo sacerdote deposto pelos romanos, mas ainda muito influente, sogro de Caifás. Jesus foi primeiro levado a ele após sua prisão para um interrogatório informal. Era poderoso na hierarquia sacerdotal e sua família controlava o cargo.",
    primeiraMencao: "Lucas 3:2",
    eventosPrincipais: [
      "Primeiro interrogatório de Jesus",
      "Sogro de Caifás",
      "Perseguição aos apóstolos"
    ],
    referencias: ["Lucas 3:2", "João 18:13-24", "Atos 4:6"]
  },
  {
    id: "centuriao_cafarnaum",
    nome: "Centurião de Cafarnaum",
    nomeOriginal: "Ἑκατόνταρχος",
    significadoNome: "Comandante de cem soldados",
    categoria: "Figura do NT",
    biografia: "O centurião de Cafarnaum foi um oficial romano que implorou a Jesus pela cura de seu servo paralítico. Demonstrou fé notável ao dizer que Jesus não precisava ir a sua casa, bastava uma palavra. Jesus elogiou sua fé como maior que a de Israel.",
    primeiraMencao: "Mateus 8:5",
    eventosPrincipais: [
      "Pedido de cura para seu servo",
      "Expressão de fé notável",
      "Servo curado à distância"
    ],
    referencias: ["Mateus 8:5-13", "Lucas 7:1-10"]
  },
  {
    id: "zaqueu",
    nome: "Zaqueu",
    nomeOriginal: "Ζακχαῖος",
    significadoNome: "Puro, inocente, justo",
    categoria: "Figura do NT",
    biografia: "Zaqueu foi um chefe dos publicanos (cobradores de impostos) em Jericó, homem rico mas de baixa estatura. Subiu num sicômoro para ver Jesus quando este passava. Jesus o chamou e foi à sua casa. Zaqueu se arrependeu, devolveu o que havia roubado e deu metade dos bens aos pobres.",
    primeiraMencao: "Lucas 19:2",
    eventosPrincipais: [
      "Subiu no sicômoro para ver Jesus",
      "Jesus o chamou e foi à sua casa",
      "Arrependimento e restituição"
    ],
    referencias: ["Lucas 19:1-10"],
    citacoesChave: ["Senhor, eu dou aos pobres metade dos meus bens."]
  },
  {
    id: "veronica",
    nome: "Verônica",
    nomeOriginal: "Βερονίκη",
    significadoNome: "Portadora da vitória, imagem verdadeira",
    categoria: "Figura do NT",
    biografia: "Verônica é tradicionalmente identificada como a mulher que sofria de hemorragia há doze anos e foi curada ao tocar a borda do manto de Jesus. Segundo a tradição posterior, ela ofereceu um pano a Jesus no caminho do Calvário, e seu rosto ficou milagrosamente impresso no pano.",
    primeiraMencao: "Mateus 9:20",
    eventosPrincipais: [
      "Sofria de hemorragia por 12 anos",
      "Toque na borda do manto de Jesus",
      "Cura imediata",
      "Elogiada por Jesus por sua fé"
    ],
    referencias: ["Mateus 9:20-22", "Marcos 5:25-34", "Lucas 8:43-48"]
  },
  {
    id: "barrabas",
    nome: "Barrabás",
    nomeOriginal: "Βαραββᾶς",
    significadoNome: "Filho do pai, filho de Abba",
    categoria: "Figura do NT",
    biografia: "Barrabás foi um prisioneiro notório, preso por insurreição e homicídio, libertado por Pilatos durante a Páscoa em vez de Jesus. Era um revolucionário judeu que havia cometido assassinato. A multidão escolheu sua libertação em vez de Jesus, cumprindo as Escrituras.",
    primeiraMencao: "Mateus 27:16",
    eventosPrincipais: [
      "Preso por insurreição e homicídio",
      "Libertado por Pilatos no lugar de Jesus",
      "Preferido pela multidão em vez de Jesus"
    ],
    referencias: ["Mateus 27:15-26", "Marcos 15:6-15", "Lucas 23:18-25", "João 18:39-40"]
  },
  {
    id: "dimas",
    nome: "Dimas (o ladrão)",
    nomeOriginal: "Δυσμᾶς",
    significadoNome: "Poente, ocaso",
    categoria: "Figura do NT",
    biografia: "Dimas foi um dos dois ladrões crucificados com Jesus, tradicionalmente chamado de 'o bom ladrão'. Enquanto o outro blasfemava, Dimas reconheceu sua própria culpa e a inocência de Jesus, pedindo que Jesus se lembrasse dele em seu Reino. Jesus lhe prometeu que estaria com Ele no Paraíso.",
    primeiraMencao: "Mateus 27:38",
    eventosPrincipais: [
      "Crucificado ao lado de Jesus",
      "Defesa de Jesus contra o outro ladrão",
      "Pedido para ser lembrado no Reino",
      "Promessa do Paraíso"
    ],
    referencias: ["Mateus 27:38-44", "Lucas 23:39-43"],
    citacoesChave: ["Senhor, lembra-te de mim, quando entrares no teu reino."]
  },
  {
    id: "simao_cirineu",
    nome: "Simão Cirineu",
    nomeOriginal: "Σίμων Κυρηναῖος",
    significadoNome: "Ouvinte, natural de Cirene",
    categoria: "Figura do NT",
    biografia: "Simão Cirineu foi um homem de Cirene (norte da África) que foi obrigado pelos soldados romanos a carregar a cruz de Jesus até o Gólgota. Vinha do campo quando foi forçado a ajudar. Era pai de Alexandre e Rufo, conhecidos na igreja primitiva.",
    primeiraMencao: "Mateus 27:32",
    eventosPrincipais: [
      "Forçado a carregar a cruz de Jesus",
      "Pai de Alexandre e Rufo, conhecidos na igreja"
    ],
    referencias: ["Mateus 27:32", "Marcos 15:21-22", "Lucas 23:26"]
  },
  {
    id: "jairo",
    nome: "Jairo",
    nomeOriginal: "Ἰάειρος",
    significadoNome: "Ele iluminará, que Deus ilumine",
    categoria: "Figura do NT",
    biografia: "Jairo foi um chefe da sinagoga cuja filha de doze anos estava à morte. Prostrou-se aos pés de Jesus implorando ajuda. No caminho, a mulher hemorrágica foi curada. Jesus ressuscitou sua filha, dizendo 'Talitá cumi' (menina, levanta-te).",
    primeiraMencao: "Marcos 5:22",
    eventosPrincipais: [
      "Súplica a Jesus pela filha moribunda",
      "Espera pela cura da mulher hemorrágica",
      "Ressurreição de sua filha"
    ],
    referencias: ["Marcos 5:21-43", "Mateus 9:18-26", "Lucas 8:40-56"]
  },
  {
    id: "maria_madalena",
    nome: "Maria Madalena",
    nomeOriginal: "Μαρία ἡ Μαγδαληνή",
    significadoNome: "Maria de Mágdala (torre)",
    categoria: "Figura do NT",
    biografia: "Maria Madalena foi uma seguidora fiel de Jesus, de quem Ele expulsou sete demônios. Acompanhou Jesus desde a Galileia e testemunhou sua crucificação. Foi a primeira pessoa a ver Jesus ressuscitado e recebeu a missão de anunciar a ressurreição aos apóstolos. É chamada de 'apóstola dos apóstolos'.",
    primeiraMencao: "Mateus 27:56",
    eventosPrincipais: [
      "Libertação de sete demônios por Jesus",
      "Testemunha da crucificação",
      "Visita ao túmulo no domingo de manhã",
      "Primeira a ver Jesus ressuscitado",
      "Anúncio da ressurreição aos apóstolos"
    ],
    referencias: ["Mateus 27:56-61", "Mateus 28:1-10", "Marcos 16:9-11", "Lucas 8:2", "João 20:1-18"],
    citacoesChave: ["Vi o Senhor!"]
  },
  {
    id: "joana",
    nome: "Joana",
    nomeOriginal: "Ἰωάννα",
    significadoNome: "Deus é gracioso",
    categoria: "Figura do NT",
    biografia: "Joana foi uma das mulheres que seguia e servia a Jesus com seus bens, esposa de Cuza, procurador de Herodes. Estava entre as mulheres que foram ao túmulo no domingo de manhã e encontraram o anjo. Anunciou a ressurreição aos apóstolos, mas não foi inicialmente crida.",
    primeiraMencao: "Lucas 8:3",
    eventosPrincipais: [
      "Servia a Jesus com seus bens",
      "Foi ao túmulo no domingo de manhã",
      "Anunciou a ressurreição aos apóstolos"
    ],
    referencias: ["Lucas 8:3", "Lucas 24:10"],
    parentes: { conjugue: "Cuza" }
  },
  {
    id: "susana",
    nome: "Susana",
    nomeOriginal: "Σουσάννα",
    significadoNome: "Lírio, rosa",
    categoria: "Figura do NT",
    biografia: "Susana foi uma das mulheres piedosas que acompanhavam Jesus e os apóstolos, servindo com seus próprios bens. É mencionada apenas uma vez na Bíblia, mas incluída entre as mulheres que foram libertas de espíritos malignos e enfermidades por Jesus.",
    primeiraMencao: "Lucas 8:3",
    eventosPrincipais: [
      "Servia a Jesus com seus bens",
      "Curada por Jesus"
    ],
    referencias: ["Lucas 8:3"]
  },
  {
    id: "salome",
    nome: "Salomé (mãe dos filhos de Zebedeu)",
    nomeOriginal: "Σαλώμη",
    significadoNome: "Pacificadora, a que recompensa",
    categoria: "Figura do NT",
    biografia: "Salomé foi a mãe dos apóstolos Tiago e João, esposa de Zebedeu. Pediu a Jesus que seus filhos se sentassem à sua direita e esquerda no Reino. Esteve presente na crucificação e foi ao túmulo no domingo de manhã para ungir o corpo de Jesus.",
    primeiraMencao: "Mateus 20:20",
    eventosPrincipais: [
      "Pedido especial por seus filhos Tiago e João",
      "Testemunha da crucificação",
      "Visita ao túmulo no domingo"
    ],
    referencias: ["Mateus 20:20-23", "Mateus 27:56", "Marcos 15:40", "Marcos 16:1"],
    parentes: { conjugue: "Zebedeu", filhos: "Tiago, João" }
  },
  {
    id: "cleopas",
    nome: "Cléopas",
    nomeOriginal: "Κλεόπας",
    significadoNome: "Glória do pai, de renomado pai",
    categoria: "Figura do NT",
    biografia: "Cléopas foi um dos dois discípulos no caminho de Emaús que encontraram Jesus ressuscitado sem reconhecê-lo. Conversaram com Ele sobre os eventos recentes em Jerusalém. Reconheceram Jesus no partir do pão, e Ele desapareceu. Correram de volta a Jerusalém para anunciar.",
    primeiraMencao: "Lucas 24:18",
    eventosPrincipais: [
      "Caminho de Emaús com Jesus sem reconhecê-lo",
      "Conversa sobre a crucificação",
      "Reconhecimento no partir do pão",
      "Retorno a Jerusalém para anunciar"
    ],
    referencias: ["Lucas 24:13-35"]
  },
  {
    id: "ananias_damasco",
    nome: "Ananias (de Damasco)",
    nomeOriginal: "Ἀνανίας",
    significadoNome: "O Senhor é gracioso",
    categoria: "Figura do NT",
    biografia: "Ananias foi um discípulo em Damasco que Deus enviou para curar a cegueira de Saulo (Paulo) após sua conversão. Inicialmente hesitou por causa da reputação de Saulo como perseguidor, mas obedeceu à visão do Senhor. Impôs as mãos sobre Paulo, que recuperou a visão e foi batizado.",
    primeiraMencao: "Atos 9:10",
    eventosPrincipais: [
      "Visão do Senhor para ir a Saulo",
      "Hesitação por medo de Saulo",
      "Imposição de mãos e cura de Paulo",
      "Batismo de Paulo"
    ],
    referencias: ["Atos 9:10-19", "Atos 22:12-16"]
  },
  {
    id: "safira",
    nome: "Safira",
    nomeOriginal: "Σάπφιρα",
    significadoNome: "Bela, safira",
    categoria: "Figura do NT",
    biografia: "Safira foi esposa de Ananias, que vendeu uma propriedade e reteve parte do preço, mentindo sobre o valor total. Pedro confrontou Safira separadamente, e ela mentiu também. Caiu morta aos pés de Pedro, assim como seu marido. Servem como exemplo de juízo divino sobre a hipocrisia.",
    primeiraMencao: "Atos 5:1",
    eventosPrincipais: [
      "Venda de propriedade e retenção do preço",
      "Mentira a Pedro sobre o valor",
      "Morte súbita como juízo divino"
    ],
    referencias: ["Atos 5:1-11"],
    parentes: { conjugue: "Ananias" }
  },
  {
    id: "alexandre_ferreiro",
    nome: "Alexandre (ferreiro)",
    nomeOriginal: "Ἀλέξανδρος",
    significadoNome: "Defensor dos homens, protetor",
    categoria: "Figura do NT",
    biografia: "Alexandre, o ferreiro (latoeiro), foi um oponente de Paulo que causou muitos males ao apóstolo. Paulo adverte Timóteo contra ele. Alguns o identificam com um Alexandre mencionado em Éfeso que foi porta-voz dos ourives na revolta contra Paulo.",
    primeiraMencao: "1 Timóteo 1:20",
    eventosPrincipais: [
      "Oposição a Paulo",
      "Advertência de Paulo a Timóteo"
    ],
    referencias: ["1 Timóteo 1:20", "2 Timóteo 4:14-15", "Atos 19:33"]
  },
  {
    id: "eutico",
    nome: "Êutico",
    nomeOriginal: "Εὔτυχος",
    significadoNome: "Afortunado, feliz, bem-sucedido",
    categoria: "Figura do NT",
    biografia: "Êutico foi um jovem de Trôade que caiu do terceiro andar enquanto Paulo pregava até meia-noite. Foi levantado morto, mas Paulo o abraçou e o ressuscitou. A igreja ficou grandemente consolada. Êutico significa 'afortunado', o que se provou verdadeiro!",
    primeiraMencao: "Atos 20:9",
    eventosPrincipais: [
      "Queda do terceiro andar durante o sermão de Paulo",
      "Ressurreição por Paulo",
      "Consolação da igreja"
    ],
    referencias: ["Atos 20:7-12"]
  },
  {
    id: "agabo",
    nome: "Ágabo",
    nomeOriginal: "Ἄγαβος",
    significadoNome: "Gafanhoto, festa",
    categoria: "Profeta",
    biografia: "Ágabo foi um profeta cristão de Jerusalém que profetizou sobre uma grande fome em todo o mundo, cumprida no reinado de Cláudio. Mais tarde, em Cesareia, profetizou que Paulo seria preso em Jerusalém usando o cinto de Paulo. Suas profecias eram precisas.",
    primeiraMencao: "Atos 11:28",
    eventosPrincipais: [
      "Profecia da grande fome sob Cláudio",
      "Profecia sobre a prisão de Paulo em Jerusalém"
    ],
    referencias: ["Atos 11:28", "Atos 21:10-14"]
  },
  {
    id: "sergio_paulo",
    nome: "Sérgio Paulo",
    nomeOriginal: "Σέργιος Παῦλος",
    significadoNome: "Servo, pequeno",
    categoria: "Figura do NT",
    biografia: "Sérgio Paulo foi o procônsul romano de Chipre que se converteu ao cristianismo. Homem prudente, chamou Paulo e Barnabé para ouvir a palavra. Quando o mago Elimas tentou impedir, Paulo o cegou temporariamente. Vendo o milagre, Sérgio Paulo creu.",
    primeiraMencao: "Atos 13:7",
    eventosPrincipais: [
      "Convocação de Paulo e Barnabé para pregar",
      "Confronto com o mago Elimas",
      "Conversão ao cristianismo"
    ],
    referencias: ["Atos 13:7-12"]
  },
  {
    id: "erasto",
    nome: "Erasto",
    nomeOriginal: "Ἔραστος",
    significadoNome: "Amado, amável",
    categoria: "Figura do NT",
    biografia: "Erasto foi um companheiro de Paulo, tesoureiro da cidade de Corinto. É mencionado como um dos que serviam a Paulo. Permaneceu em Corinto enquanto Timóteo foi enviado a outros lugares. Uma inscrição arqueológica confirma sua posição como edil em Corinto.",
    primeiraMencao: "Atos 19:22",
    eventosPrincipais: [
      "Companheiro de Paulo em Éfeso",
      "Tesoureiro de Corinto"
    ],
    referencias: ["Atos 19:22", "Romanos 16:23", "2 Timóteo 4:20"]
  },
  {
    id: "junias",
    nome: "Júnias",
    nomeOriginal: "Ἰουνιᾶς",
    significadoNome: "Jovem, da juventude",
    categoria: "Figura do NT",
    biografia: "Júnias foi um parente de Paulo e companheiro de prisão, mencionado entre os apóstolos. Paulo o descreve como 'notável entre os apóstolos' e que estava em Cristo antes dele. Alguns interpretam como Junia (feminino), sendo uma das poucas mulheres chamadas de apóstola.",
    primeiraMencao: "Romanos 16:7",
    eventosPrincipais: [
      "Parente e companheiro de prisão de Paulo",
      "Notável entre os apóstolos",
      "Convertido antes de Paulo"
    ],
    referencias: ["Romanos 16:7"]
  },
  {
    id: "andronico",
    nome: "Andrônico",
    nomeOriginal: "Ἀνδρόνικος",
    significadoNome: "Vencedor de homens, conquistador",
    categoria: "Figura do NT",
    biografia: "Andrônico foi um parente de Paulo e companheiro de prisão, mencionado junto com Júnias. Paulo os descreve como 'notáveis entre os apóstolos' e que estavam em Cristo antes dele. Eram provavelmente um casal ou irmãos que trabalhavam na obra missionária.",
    primeiraMencao: "Romanos 16:7",
    eventosPrincipais: [
      "Parente e companheiro de prisão de Paulo",
      "Notável entre os apóstolos",
      "Convertido antes de Paulo"
    ],
    referencias: ["Romanos 16:7"]
  }
];
