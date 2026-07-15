// Crítica textual: variantes manuscritas reais e bem documentadas.
// Base: UBS5/NA28 e tradição textual acadêmica. Conteúdo real, não fictício.

export interface VarianteTextual {
  livro: string;
  capitulo: number;
  versiculo: number;
  titulo: string;
  descricao: string;
  testemunhas: string;
  avaliacao: string;
}

export const variantesTextuais: VarianteTextual[] = [
  {
    livro: 'mt', capitulo: 16, versiculo: 2,
    titulo: 'O sinal de Jonas e o "fim do céu"',
    descricao: 'Os versículos 16:2b-3 ("E, chegando a tarde, dizeis: Estará bom tempo, porque o céu está vermelho...") estão ausentes em importante parte da tradição manuscrita.',
    testemunhas: 'Omitidos em ✱ B D W 33 e na maioria dos manuscritos alexandrinos e ocidentais; presentes no Texto Majoritário e na Vulgata.',
    avaliacao: 'Os editores modernos (UBS5, NA28) marcam como provavelmente não originais. Traduções como NVI e ARA o incluem entre colchetes ou notas.',
  },
  {
    livro: 'mt', capitulo: 17, versiculo: 21,
    titulo: 'A casta que só sai por oração e jejum',
    descricao: 'O versículo 17:21 ("Mas esta casta não sai senão por oração e jejum") aparece em poucos manuscritos tardios.',
    testemunhas: 'Ausente em ✱ B D 33; presente no Texto Majoritário e em alguns minusculos tardios.',
    avaliacao: 'Considerado provavelmente secundário, derivado de Mc 9:29. Omitido ou sinalizado nas versões críticas.',
  },
  {
    livro: 'mc', capitulo: 16, versiculo: 9,
    titulo: 'O final longo de Marcos (16:9-20)',
    descricao: 'A passagem de 16:9 a 20, com as aparições ressurretas e o mandato missionário, é o final mais conhecido de Marcos, mas não consta dos manuscritos mais antigos.',
    testemunhas: 'Ausente em ✱ (Sinaítico) e B (Vaticano); termina em 16:8. Presente em A C D e na maioria dos manuscritos bizantinos; existe também um "final curto" em alguns códices.',
    avaliacao: 'Quase certamente não original, mas antigo (séc. II). As versões modernas o conservam, marcando a lacuna com nota ou colchetes.',
  },
  {
    livro: 'mc', capitulo: 1, versiculo: 1,
    titulo: '"Filho de Deus" no título',
    descricao: 'O título "O princípio do evangelho de Jesus Cristo, Filho de Deus" perde a expressão "Filho de Deus" em alguns dos melhores manuscritos.',
    testemunhas: 'Ausente em ✱ B 304; presente em A C D W e na maioria dos manuscritos.',
    avaliacao: 'A frase "Filho de Deus" é omitida por alguns editores críticos como não original, embora bem atestada.',
  },
  {
    livro: 'jo', capitulo: 7, versiculo: 53,
    titulo: 'A pericope da adúltera (Jo 7:53-8:11)',
    descricao: 'A história da mulher surpreendida em adultério não consta dos manuscritos mais antigos e aparece em diferentes posições nos manuscritos.',
    testemunhas: 'Ausente em P66, P75, ✱, B, Tischendorf; presente após Jo 7:36, ou após Lc 21:38, ou em ambos, em tradições tardias.',
    avaliacao: 'Quase unanimemente considerada não-joanina na origem (embora possa ser tradicional). As versões a incluem com nota explicativa.',
  },
  {
    livro: 'jo', capitulo: 5, versiculo: 3,
    titulo: 'O anjo que agitava a água',
    descricao: 'Em Jo 5:3b-4 a descrição do anjo que "descendia e agitava a água" é secundária na tradição textual.',
    testemunhas: 'Ausente em P66, P75, ✱, B, C; presente na tradição bizantina.',
    avaliacao: 'Omitida nas edições críticas por falta de suporte antigo; explicada como glossa explicativa.',
  },
  {
    livro: '1jo', capitulo: 5, versiculo: 7,
    titulo: 'A cláusula joanina (Comma Johanneum)',
    descricao: 'A frase "Porque três são os que testificam no céu: o Pai, a Palavra e o Espírito Santo" (1Jo 5:7b) não consta de nenhum manuscrito grego antigo.',
    testemunhas: 'Ausente em todos os manuscritos gregos anteriores ao séc. XVI; presente na Vulgata latina tardia e em edições impressas a partir de Erasmo.',
    avaliacao: 'Unanimemente rejeitada como não original. O texto grego crítico em 1Jo 5:7-8 fala apenas de "três testemunhas: o Espírito, a água e o sangue".',
  },
  {
    livro: 'at', capitulo: 8, versiculo: 37,
    titulo: 'A confissão do eunuco etíope',
    descricao: 'O versículo 8:37 ("E Filipe disse: Se crês de todo o coração, podes...") é uma adição devocional tardia.',
    testemunhas: 'Ausente em ✱ B 33; presente em E C e na tradição bizantina, possivelmente derivada de uma fórmula batismal.',
    avaliacao: 'Omitida nas edições críticas. Reflexo de uma confissão batismal posterior inserida no texto.',
  },
  {
    livro: 'lc', capitulo: 22, versiculo: 43,
    titulo: 'A agonia de Jesus em Getsêmani',
    descricao: 'Os versículos 22:43-44 (suor como gotas de sangue e anjo que confortava) estão ausentes de alguns dos melhores manuscritos.',
    testemunhas: 'Ausentes em P69, D, alguns códices ocidentais; presentes em ✱ A B C e na tradição bizantina.',
    avaliacao: 'Divergência significativa; muitos editores mantêm o texto, mas reconhecem a fraqueza de atestação em alguns ramos.',
  },
  {
    livro: 'lc', capitulo: 23, versiculo: 34,
    titulo: '"Pai, perdoa-lhes" na cruz',
    descricao: 'A primeira palavra da cruz em Lucas ("Pai, perdoa-lhes, porque não sabem o que fazem") falta em alguns manuscritos importantes.',
    testemunhas: 'Ausente em D (CorbeiensIS) e em alguns patagones; presente em ✱ A B C e na maioria.',
    avaliacao: 'Provavelmente original, mas contestada por alguns críticos devido à ausência em D e paralelos.',
  },
  {
    livro: 'rm', capitulo: 16, versiculo: 7,
    titulo: 'Junia(s) — apóstolo ou não?',
    descricao: 'Em Rm 16:7, "saudai a Andrônico e a Júnia(s), meus parentes e companheiros de prisão, que são insignes entre os apóstolos". O nome é masculino (Junias) ou feminino (Junia)?',
    testemunhas: 'A grafia varia entre códices; a tradição mais antiga favorece a forma feminina "Junia".',
    avaliacao: 'Consenso acadêmico moderno: Junia, mulher apóstolo. A variação é de acento/nome, não de texto.',
  },
  {
    livro: '1co', capitulo: 14, versiculo: 34,
    titulo: 'O lugar do parágrafo sobre as mulheres',
    descricao: 'Em 1Co 14:34-35, a ordem das palavras sobre as mulheres no culto difere entre as tradições manuscritas (alguns colocam após 14:40).',
    testemunhas: 'A tradição "ocidental" (D F G) desloca o parágrafo para o final do capítulo.',
    avaliacao: 'A questão é de transposição, não de autenticidade; o texto é considerado paulino em ambas as ordens.',
  },
];

export function obterVariante(livro: string, capitulo: number, versiculo: number): VarianteTextual | undefined {
  return variantesTextuais.find(
    (v) => v.livro === livro && v.capitulo === capitulo && (v.versiculo === versiculo || v.versiculo === versiculo)
  );
}

export function obterVariantesPorLivro(livro: string): VarianteTextual[] {
  return variantesTextuais.filter((v) => v.livro === livro);
}
