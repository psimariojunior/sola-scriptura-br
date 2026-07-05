export interface Versiculo {
  numero: number;
  texto: string;
}

export interface Capitulo {
  numero: number;
  versiculos: Versiculo[];
}

export interface Livro {
  nome: string;
  abbreviacao: string;
  testamento: 'AT' | 'NT';
  totalCapitulos: number;
  capitulos: Capitulo[];
}

export const livros: Livro[] = [
  {
    nome: 'Gênesis', abbreviacao: 'gn', testamento: 'AT', totalCapitulos: 50,
    capitulos: [
      { numero: 1, versiculos: [
        { numero: 1, texto: 'No princípio criou Deus os céus e a terra.' },
        { numero: 2, texto: 'E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.' },
        { numero: 3, texto: 'E disse Deus: Haja luz; e houve luz.' },
        { numero: 4, texto: 'E viu Deus que a luz era boa; e fez Deus separação entre a luz e as trevas.' },
        { numero: 5, texto: 'E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, um dia.' },
      ]},
      { numero: 2, versiculos: [
        { numero: 1, texto: 'Assim foram criados os céus e a terra, e todo o exército deles.' },
        { numero: 2, texto: 'E Deus completou no dia sétimo a sua obra que fizera; e descansou no dia sétimo de toda a sua obra que fizera.' },
        { numero: 3, texto: 'E abençoou Deus o dia sétimo, e o santificou, porque nele descansou de toda a sua obra que Deus criara e fizera.' },
      ]},
    ],
  },
  {
    nome: 'Êxodo', abbreviacao: 'ex', testamento: 'AT', totalCapitulos: 40,
    capitulos: [
      { numero: 1, versiculos: [
        { numero: 1, texto: 'Estes são os nomes dos filhos de Israel que entraram no Egito com Jacó; cada um entrou com a sua casa:' },
        { numero: 2, texto: 'Rúben, Simeão, Levi e Judá,' },
        { numero: 3, texto: 'Issacar, Zebulom, Benjamim,' },
        { numero: 4, texto: 'Dã, Naftali, Gade e Aser.' },
      ]},
    ],
  },
  {
    nome: 'Salmos', abbreviacao: 'sl', testamento: 'AT', totalCapitulos: 150,
    capitulos: [
      { numero: 1, versiculos: [
        { numero: 1, texto: 'Bem-aventurado o homem que não andou no conselho dos ímpios, não esteve no caminho dos pecadores, e não se assentou na roda dos escarnecedores.' },
        { numero: 2, texto: 'Mas o seu deleite está na lei do SENHOR, e na sua lei medita de dia e de noite.' },
        { numero: 3, texto: 'Será como árvore plantada à beira das águas, que dá o seu fruto no seu tempo, e cujas folhas não murcham; e tudo o que faz lhe será próspero.' },
      ]},
      { numero: 23, versiculos: [
        { numero: 1, texto: 'O SENHOR é o meu pastor; nada me faltará.' },
        { numero: 2, texto: 'Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.' },
        { numero: 3, texto: 'Refrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome.' },
        { numero: 4, texto: 'Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.' },
        { numero: 5, texto: 'Preparas uma mesa perante mim na presença dos meus inimigos, unges a minha cabeça com óleo, o meu cálice transborda.' },
        { numero: 6, texto: 'Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na casa do SENHOR por longos dias.' },
      ]},
    ],
  },
  {
    nome: 'Provérbios', abbreviacao: 'pv', testamento: 'AT', totalCapitulos: 31,
    capitulos: [
      { numero: 1, versiculos: [
        { numero: 1, texto: 'Provérbios de Salomão, filho de Davi, rei de Israel:' },
        { numero: 2, texto: 'Para conhecer a sabedoria e a instrução; para perceber as palavras de entendimento;' },
        { numero: 3, texto: 'Para receber a instrução de prudente maneira, a justiça, e o juízo, e a equidade;' },
        { numero: 4, texto: 'Para dar aos simples prudência, ao menino conhecimento e discernimento.' },
        { numero: 5, texto: 'Ouve, o meu filho, a instrução de teu pai, e não rejeites a doutrina de tua mãe;' },
        { numero: 6, texto: 'Porque eles serão para a tua cabeça uma graciosas guirlanda, e colares para o teu pescoço.' },
      ]},
    ],
  },
  {
    nome: 'Isaías', abbreviacao: 'is', testamento: 'AT', totalCapitulos: 66,
    capitulos: [
      { numero: 53, versiculos: [
        { numero: 1, texto: 'Quem crê a nossa pregação? E a quem foi revelado o braço do SENHOR?' },
        { numero: 2, texto: 'Subiu ele perante ele como renovo, e como raiz de terra seca; não tinha formosura nele, nem pompa; e quando o vimos, não tinha aparelação que nos agradasse.' },
        { numero: 3, texto: ' desprezado e o mais rejeitado dos homens; homem de dores, e que sabe o que é padecer; e como um de quem os homens escondem a sua face; desprezado, e dele não fizemos caso.' },
        { numero: 4, texto: 'Certamente ele tomou sobre si as nossas doenças, e as nossas dores ele suportou; nós o reputámos por aflito, ferido de Deus e oprimido.' },
        { numero: 5, texto: 'Mas ele foi ferido pelas nossas transgressões, e moinado pelas nossas iniquidades; o castigo da nossa paz estava sobre ele, e pelas suas chagas sarávamos.' },
      ]},
    ],
  },
  {
    nome: 'João', abbreviacao: 'jo', testamento: 'NT', totalCapitulos: 21,
    capitulos: [
      { numero: 1, versiculos: [
        { numero: 1, texto: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
        { numero: 2, texto: 'Ele estava no princípio com Deus.' },
        { numero: 3, texto: 'Todas as coisas foram feitas por ele, e sem ele nada do que foi feito se fez.' },
        { numero: 4, texto: 'Nele estava a vida, e a vida era a luz dos homens.' },
        { numero: 5, texto: 'E a luz resplandece nas trevas, e as trevas não prevaleceram contra ela.' },
        { numero: 14, texto: 'E o Verbo se fez carne, e habitou entre nós (e vimos a sua glória, glória como de unigênito do Pai), cheio de graça e de verdade.' },
      ]},
      { numero: 3, versiculos: [
        { numero: 16, texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
      ]},
    ],
  },
  {
    nome: 'Romanos', abbreviacao: 'rm', testamento: 'NT', totalCapitulos: 16,
    capitulos: [
      { numero: 8, versiculos: [
        { numero: 28, texto: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.' },
        { numero: 29, texto: 'Porque os que dantes conheceu, também os predestinou para serem conformes à imagem de seu Filho, para que ele seja o primogênito entre muitos irmãos.' },
        { numero: 30, texto: 'E os que predestinou, a estes também chamou; e os que chamou, a estes também justificou; e os que justificou, a estes também glorificou.' },
      ]},
    ],
  },
  {
    nome: 'Efésios', abbreviacao: 'ef', testamento: 'NT', totalCapitulos: 6,
    capitulos: [
      { numero: 2, versiculos: [
        { numero: 8, texto: 'Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.' },
        { numero: 9, texto: 'Não vem das obras, para que ninguém se glorie.' },
        { numero: 10, texto: 'Porque somos feitura sua, criados em Cristo Jesus para boas obras, as quais Deus preparou para que andássemos nelas.' },
      ]},
    ],
  },
  {
    nome: 'Hebreus', abbreviacao: 'hb', testamento: 'NT', totalCapitulos: 13,
    capitulos: [
      { numero: 11, versiculos: [
        { numero: 1, texto: 'Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.' },
        { numero: 2, texto: 'Pois por ela os antigos alcançaram testemunho.' },
        { numero: 3, texto: 'Pela fé entendemos que os séculos foram criados pela palavra de Deus, de maneira que aquilo que se vê não foi feito do que era visível.' },
        { numero: 6, texto: 'E sem fé é impossível agradar-lhe; porque é necessário que quem se aproxima de Deus creia que ele existe, e que é galardoador dos que o buscam.' },
      ]},
    ],
  },
];

export interface PalavraOriginal {
  strong: string;
  palavra: string;
  transliteracao: string;
  definicao: string;
  idioma: 'grego' | 'hebraico';
  morfologia?: string;
}

export const palavrasOriginais: PalavraOriginal[] = [
  { strong: 'G3056', palavra: 'λόγος', transliteracao: 'logos', definicao: 'Palavra, razão, discurso. O Verbo divino.', idioma: 'grego', morfologia: 'Substantivo, masculino, nominativo, singular' },
  { strong: 'G26', palavra: 'ἀγάπη', transliteracao: 'agape', definicao: 'Amor incondicional, amor divino, amor sacrificial.', idioma: 'grego', morfologia: 'Substantivo, feminino, nominativo, singular' },
  { strong: 'G4102', palavra: 'πίστις', transliteracao: 'pistis', definicao: 'Fé, confiança, lealdade, fidelidade.', idioma: 'grego', morfologia: 'Substantivo, feminino, nominativo, singular' },
  { strong: 'G5485', palavra: 'χάρις', transliteracao: 'charis', definicao: 'Graça, favor, bondade, gratidão.', idioma: 'grego', morfologia: 'Substantivo, feminino, nominativo, singular' },
  { strong: 'G2316', palavra: 'θεός', transliteracao: 'theos', definicao: 'Deus, o Ser Supremo, Criador.', idioma: 'grego', morfologia: 'Substantivo, masculino, nominativo, singular' },
  { strong: 'G1680', palavra: 'ἐλπίς', transliteracao: 'elpis', definicao: 'Esperança, expectativa, confiança no futuro.', idioma: 'grego', morfologia: 'Substantivo, feminino, nominativo, singular' },
  { strong: 'H1254', palavra: 'בָּרָא', transliteracao: 'bara', definicao: 'Criar (ex nihilo). Usado exclusivamente para a criação divina.', idioma: 'hebraico', morfologia: 'Verbo, Qal, Perfecto, 3ª pessoa masculino singular' },
  { strong: 'H3068', palavra: 'יהוה', transliteracao: 'YHWH', definicao: 'O nome próprio de Deus, Senhor. O que é, o que era, o que será.', idioma: 'hebraico', morfologia: 'Substantivo próprio, masculino, singular' },
  { strong: 'H1288', palavra: 'בְּרִית', transliteracao: 'berit', definicao: 'Aliança, pacto, concordato. Relação covenantal entre Deus e o homem.', idioma: 'hebraico', morfologia: 'Substantivo, feminino, singular' },
  { strong: 'H8451', palavra: 'תּוֹרָה', transliteracao: 'torah', definicao: 'Lei, instrução, ensino. Os cinco livros de Moisés.', idioma: 'hebraico', morfologia: 'Substantivo, feminino, singular' },
  { strong: 'H3117', palavra: 'יוֹם', transliteracao: 'yom', definicao: 'Dia, período de tempo. Usado para os dias da criação.', idioma: 'hebraico', morfologia: 'Substantivo, masculino, singular' },
  { strong: 'H7225', palavra: 'רֵאשִׁית', transliteracao: 'reshit', definicao: 'Princípio, começo, origem. "No princípio..."', idioma: 'hebraico', morfologia: 'Substantivo, feminino, singular' },
];

export interface Doutrina {
  nome: string;
  slug: string;
  definicao: string;
  passagens: string[];
  categoria: string;
}

export const doutrinas: Doutrina[] = [
  { nome: 'Trindade', slug: 'trindade', definicao: 'Deus é um só em essência, mas existe em três pessoas distintas: Pai, Filho e Espírito Santo. Cada pessoa é plenamente Deus, mas há um único Deus.', passagens: ['Mt 28:19', '2 Co 13:14', '1 Pe 1:2'], categoria: 'Teísmo' },
  { nome: 'Encarnação', slug: 'encarnacao', definicao: 'O Verbo eterno de Deus se fez homem em Jesus Cristo, sendo verdadeiro Deus e verdadeiro homem, sem confusão de naturezas.', passagens: ['Jo 1:14', 'Fp 2:5-8', 'Hb 1:1-3'], categoria: 'Cristologia' },
  { nome: 'Expiação', slug: 'expiacao', definicao: 'A morte de Cristo na cruz foi sacrifício substitutivo pelos pecados da humanidade, satisfazendo a justiça de Deus.', passagens: ['Rm 3:23-25', '1 Co 15:3', '1 Pe 2:24'], categoria: 'Soteriologia' },
  { nome: 'Ressurreição', slug: 'ressurreicao', definicao: 'Cristo ressuscitou corporalmente ao terceiro dia, vencendo a morte e garantindo a ressurreição dos crentes.', passagens: ['1 Co 15:3-8', 'Rm 1:4', 'At 2:24'], categoria: 'Escatologia' },
  { nome: 'Graça', slug: 'graca', definicao: 'Favor imerecido de Deus, concedido gratuitamente aos pecadores para salvação e sanctificação.', passagens: ['Ef 2:8-9', 'Rm 5:15', 'Tt 2:11'], categoria: 'Soteriologia' },
  { nome: 'Justificação', slug: 'justificacao', definicao: 'Ato jurídico de Deus pelo qual o pecador é declarado justo diante da Lei, mediante a fé em Cristo.', passagens: ['Rm 3:24', 'Rm 5:1', 'Gl 2:16'], categoria: 'Soteriologia' },
  { nome: 'Regeneração', slug: 'regeneracao', definicao: 'A obra do Espírito Santo que produz nova vida espiritual no crente, tornando-o nova criatura.', passagens: ['Jo 3:3-6', 'Tt 3:5', '2 Co 5:17'], categoria: 'Soteriologia' },
  { nome: 'Escatologia', slug: 'escatologia', definicao: 'Estudo das últimas coisas: seconda vinda de Cristo, ressurreição, juízo final e eternidade.', passagens: ['1 Ts 4:16', 'Ap 21:1', 'Mt 25:31-46'], categoria: 'Escatologia' },
];

export interface PersonagemBiblico {
  nome: string;
  nomeHebraico?: string;
  nomeGrego?: string;
  significado: string;
  resumo: string;
  testamento: 'AT' | 'NT';
}

export const personagens: PersonagemBiblico[] = [
  { nome: 'Abraão', nomeHebraico: 'אַבְרָהָם (Avraham)', significado: 'Pai de multidões', resumo: 'Pai da fé. Chamado por Deus para sair de Ur e ir à terra de Canaã. Pai de Isaque. Teste de fé em Moria.', testamento: 'AT' },
  { nome: 'Moisés', nomeHebraico: 'מֹשֶׁה (Moshe)', significado: 'Tirado das águas', resumo: 'Libertador de Israel do Egito. Recebedor da Lei no Sinai. Líder do Êxodo. Não entrou na terra prometida.', testamento: 'AT' },
  { nome: 'Davi', nomeHebraico: 'דָּוִד (Dawid)', significado: 'Amado', resumo: 'Rei de Israel depois de Saul. Homem segundo o coração de Deus. Matou Golias. Pai de Salomão.', testamento: 'AT' },
  { nome: 'Salomão', nomeHebraico: 'שְׁלֹמֹה (Shlomo)', significado: 'Paz', resumo: 'Filho de Davi. Construiu o Templo. Sábio e rico. Escreveu Provérbios e Eclesiastes.', testamento: 'AT' },
  { nome: 'Pedro', nomeGrego: 'Πέτρος (Petros)', significado: 'Pedra, rocha', resumo: 'Apóstolo líder. Primeiro a confessar Cristo. Traiu Jesus mas foi restaurado. Pregou no Pentecostes.', testamento: 'NT' },
  { nome: 'Paulo', nomeGrego: 'Παῦλος (Paulos)', significado: 'Pequeno, humilde', resumo: 'Apóstolo dos gentios. Perseguiu a igreja antes da conversão. Escreveu 13 epístolas. Missioneiro incansável.', testamento: 'NT' },
  { nome: 'Maria', nomeHebraico: 'מִרְיָם (Miryam)', significado: 'Amargura, rebeldia', resumo: 'Mãe de Jesus. Concebeu pelo Espírito Santo. Presente na cruz e na ressurreição. Modelo de fé.', testamento: 'NT' },
  { nome: 'José', nomeHebraico: 'יוֹסֵף (Yosef)', significado: 'Ele acrescentará', resumo: 'Marido de Maria. Pai adotivo de Jesus. Carpinteiro. Justo e obediente a Deus.', testamento: 'NT' },
];

export interface EventoCronologia {
  ano: string;
  evento: string;
  referencia: string;
  tipo: 'criacao' | 'patriarca' | 'lei' | 'reis' | 'profeta' | 'exilio' | 'vinda' | 'igreja';
}

export const cronologia: EventoCronologia[] = [
  { ano: '~4000 a.C.', evento: 'Criação dos céus e da terra', referencia: 'Gn 1-2', tipo: 'criacao' },
  { ano: '~2500 a.C.', evento: 'Dilúvio universal', referencia: 'Gn 6-9', tipo: 'criacao' },
  { ano: '~2000 a.C.', evento: 'Chamado de Abraão', referencia: 'Gn 12', tipo: 'patriarca' },
  { ano: '~1800 a.C.', evento: 'José no Egito', referencia: 'Gn 37-50', tipo: 'patriarca' },
  { ano: '~1500 a.C.', evento: 'Êxodo e Lei no Sinai', referencia: 'Ex 1-20', tipo: 'lei' },
  { ano: '~1200 a.C.', evento: 'Conquista de Canaã sob Josué', referencia: 'Js 1-12', tipo: 'lei' },
  { ano: '~1020 a.C.', evento: 'Saul, primeiro rei de Israel', referencia: '1 Sm 10', tipo: 'reis' },
  { ano: '~1000 a.C.', evento: 'Davi rei de Israel', referencia: '2 Sm 5', tipo: 'reis' },
  { ano: '~960 a.C.', evento: 'Salomão e o Templo', referencia: '1 Rs 6', tipo: 'reis' },
  { ano: '~750 a.C.', evento: 'Isaías profetiza', referencia: 'Is 1', tipo: 'profeta' },
  { ano: '586 a.C.', evento: 'Destruição de Jerusalém e exílio', referencia: '2 Rs 25', tipo: 'exilio' },
  { ano: '~4 a.C.', evento: 'Nascimento de Jesus', referencia: 'Mt 1-2', tipo: 'vinda' },
  { ano: '~30 d.C.', evento: 'Crucificação e Ressurreição', referencia: 'Mc 14-16', tipo: 'vinda' },
  { ano: '~30 d.C.', evento: 'Pentecostes e início da igreja', referencia: 'At 2', tipo: 'igreja' },
  { ano: '~65 d.C.', evento: 'Martírio de Pedro e Paulo', referencia: 'Tradição', tipo: 'igreja' },
];
