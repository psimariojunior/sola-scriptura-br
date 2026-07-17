export interface Eisou {
  id: string;
  titulo: string;
  referencia: string;
  livro: string;
  capitulo: number;
  versiculo: number;
  versiculoFim?: number;
  texto: string;
  significado: string;
  contexto: string;
  tema: string;
}

export const eisou: Eisou[] = [
  {
    id: 'eu-001',
    titulo: 'Eu Sou o Pão da Vida',
    referencia: 'João 6:35',
    livro: 'jo',
    capitulo: 6,
    versiculo: 35,
    texto: 'Disse-lhes Jesus: Eu sou o pão da vida; quem vem a mim jamais terá fome, e quem crê em mim jamais terá sede.',
    significado: 'Jesus se declara como a fonte de sustento espiritual eterno. Assim como o maná sustentou Israel no deserto, Cristo é o almo que satisfaz a fome da alma por toda a eternidade.',
    contexto: 'Dito após a multiplicação dos pães, quando a multidão o procurava por terem comido dos pães multiplicados. Jesus direciona o foco do alimento físico para o alimento espiritual.',
    tema: 'A expressão "Eu sou" (ἐγώ εἰμί) ecoa o nome de Deus no AT.',
  },
  {
    id: 'eu-002',
    titulo: 'Eu Sou a Luz do Mundo',
    referencia: 'João 8:12',
    livro: 'jo',
    capitulo: 8,
    versiculo: 12,
    texto: 'Tornou-lhes Jesus: Eu sou a luz do mundo; quem me segue não andará em trevas, mas terá a luz da vida.',
    significado: 'Jesus é a revelação divina que ilumina a escuridão do pecado e da ignorância. Ele é o guia seguro que conduz os seus ao conhecimento da verdade e à salvação.',
    contexto: 'Durante a festa dos tabernáculos, onde os candeeiros gigantes iluminavam o templo. Jesus se apresenta como a verdadeira luz que substitui todas as luzes simbólicas.',
    tema: 'Jesus usa a expressão "Eu sou" (ἐγώ εἰμί) em conexão com uma metáfora do AT (Is 42:6, 49:6).',
  },
  {
    id: 'eu-003',
    titulo: 'Eu Sou a Porta',
    referencia: 'João 10:7, 9',
    livro: 'jo',
    capitulo: 10,
    versiculo: 7,
    versiculoFim: 9,
    texto: 'Tornou-lhes Jesus outra vez: Em verdade, em verdade vos digo que Eu sou a porta das ovelhas... Eu sou a porta; quem entrar por mim será salvo.',
    significado: 'Jesus é o único caminho de acesso ao Pai e à salvação. Por Ele temos entrada no rebanho de Deus e encontramos pasto abundante.',
    contexto: 'No contexto da parábola do bom pastor, Jesus se diferencia dos ladrões e salteadores que entram pelo lado errado. Ele é tanto o portão de entrada quanto o pastor que cuida.',
    tema: 'A declaração "Eu sou" indica acesso exclusivo ao Pai. Cristo é a mediação única entre Deus e os homens (1 Tm 2:5).',
  },
  {
    id: 'eu-004',
    titulo: 'Eu Sou o Bom Pastor',
    referencia: 'João 10:11, 14',
    livro: 'jo',
    capitulo: 10,
    versiculo: 11,
    versiculoFim: 14,
    texto: 'Eu sou o bom pastor; o bom pastor dá a sua vida pelas ovelhas... Eu sou o bom pastor e conheço as minhas ovelhas, e as minhas me conhecem.',
    significado: 'Jesus cuida pessoalmente do seu povo, conhece cada um pelo nome e está disposto a sacrificar sua própria vida pela segurança do rebanho.',
    contexto: 'Contrastando com os mercenários que fogem do lobo, Jesus se apresenta como o pastor que permanece e defende até a morte. Referência a Ezequiel 34.',
    tema: 'Jesus é Deus como o bom pastor de Israel (Sl 23), mas agora encarnado e pronto a dar a sua vida.',
  },
  {
    id: 'eu-005',
    titulo: 'Eu Sou a Ressurreição e a Vida',
    referencia: 'João 11:25',
    livro: 'jo',
    capitulo: 11,
    versiculo: 25,
    texto: 'Disse-lhe Jesus: Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá.',
    significado: 'A morte não tem a última palavra para quem crê em Cristo. Ele mesmo é a fonte da vida eterna e vence a morte.',
    contexto: 'Dito a Marta antes da ressurreição de Lázaro, em meio ao luto e à dor da perda. Jesus revela que a ressurreição não é apenas um evento futuro, mas uma realidade presente nele.',
    tema: 'A mais forte declaração de poder sobre a morte. Jesus não apenas dá a vida — Ele é a vida.',
  },
  {
    id: 'eu-006',
    titulo: 'Eu Sou o Caminho, a Verdade e a Vida',
    referencia: 'João 14:6',
    livro: 'jo',
    capitulo: 14,
    versiculo: 6,
    texto: 'Disse-lhe Jesus: Eu sou o caminho, e a verdade, e a vida; ninguém vem ao Pai senão por mim.',
    significado: 'A exclusividade de Cristo como único caminho de salvação. Ele não é apenas um guia — Ele é o próprio caminho, a verdade absoluta e a fonte da vida.',
    contexto: 'No discurso de despedida, quando Tomé pergunta como ir ao lugar onde Jesus vai. A resposta elimina qualquer alternativa de salvação fora de Cristo.',
    tema: 'Declaração mais abrangente da identidade de Cristo. Ele é o caminho (mediação), a verdade (revelação) e a vida (salvação).',
  },
  {
    id: 'eu-007',
    titulo: 'Eu Sou a Videira',
    referencia: 'João 15:1, 5',
    livro: 'jo',
    capitulo: 15,
    versiculo: 1,
    versiculoFim: 5,
    texto: 'Eu sou a videira verdadeira, e meu Pai é o agricultor... Eu sou a videira, vós as cepas; quem permanece em mim, e eu nele, esse muito frutifica.',
    significado: 'A união vital com Cristo é condição indispensável para frutificar na vida cristã. Sem Ele nada podemos fazer.',
    contexto: 'Última parábola de Jesus antes da Paixão, dita no caminho para o Getsêmani. A metáfora da videira era conhecida no AT como símbolo de Israel (Is 5, Sl 80).',
    tema: 'Jesus se apresenta como a verdadeira videira de Israel — Ele cumpre e substitui a aliança que Israel quebrou.',
  },
  {
    id: 'eu-008',
    titulo: 'Eu Sou o Alfa e o Ômega',
    referencia: 'Apocalipse 22:13',
    livro: 'ap',
    capitulo: 22,
    versiculo: 13,
    texto: 'Eu sou o Alfa e o Ômega, o Princípio e o Fim, o Primeiro e o Derradeiro.',
    significado: 'Jesus declara ser o começo e o fim de todas as coisas, o Senhor absoluto da história e da criação. Nele tudo tem sua origem e seu desfecho.',
    contexto: 'Na conclusão do livro de Apocalipse, na voz daquele que vem logo. Afirmação da eternidade e soberania de Cristo sobre o tempo e a história.',
    tema: 'Cristo reivindica os títulos divinos do Deus de Israel (Is 44:6), mostrando sua eternidade e divindade.',
  },
];
