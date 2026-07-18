import { obterComentarios } from '../comentarios';
import { obterEstudos } from '../estudosTeologicos';
import { notas } from './notas';
import { getCrossReferences } from '../crossReferences';
import { palavrasGregas } from '../lexicon/grego';
import { palavrasHebraicas } from '../lexicon/hebraico';
import { locaisBiblicos } from './locais';
import { doutrinas, personagens, cronologia } from '../biblia';

// ═══════════════════════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════════════════════

export type TipoRecurso =
  | 'comentario'
  | 'estudo'
  | 'nota'
  | 'cross-ref'
  | 'lexico'
  | 'mapa'
  | 'personagem'
  | 'doutrina'
  | 'cronologia'
  | 'pericope'
  | 'contexto-historico';

export type DadosRecurso =
  | RecursoComentario
  | RecursoEstudo
  | RecursoNota
  | RecursoCrossRef
  | RecursoLexico
  | RecursoMapa
  | RecursoPersonagem
  | RecursoDoutrina
  | RecursoCronologia
  | RecursoPericope
  | RecursoContextoHistorico;

export interface RecursoVersiculo {
  tipo: TipoRecurso;
  dados: DadosRecurso;
}

export interface RecursoComentario {
  tipo: 'comentario';
  autor: string;
  texto: string;
  tipoComentario:
    | 'teologico'
    | 'historico'
    | 'gramatical'
    | 'cultural'
    | 'aplicacao'
    | 'escatologico';
  periodo?: string;
}

export interface RecursoEstudo {
  tipo: 'estudo';
  tema: string;
  interpretes: Array<{
    nome: string;
    periodo: string;
    tradicao: string;
    visao: string;
    resumo: string;
    citacao?: string;
  }>;
}

export interface RecursoNota {
  tipo: 'nota';
  categoria: string;
  titulo: string;
  conteudo: string;
  referencias?: string[];
}

export interface RecursoCrossRef {
  tipo: 'cross-ref';
  refs: string[];
}

export interface RecursoLexico {
  tipo: 'lexico';
  strong: string;
  palavra: string;
  transliteracao: string;
  definicao: string;
  morfologia: string;
  idioma: 'grego' | 'hebraico';
}

export interface RecursoMapa {
  tipo: 'mapa';
  lugar: string;
  slug: string;
  lat: number;
  lng: number;
}

export interface RecursoPersonagem {
  tipo: 'personagem';
  slug: string;
  nome: string;
}

export interface RecursoDoutrina {
  tipo: 'doutrina';
  slug: string;
  nome: string;
  categoria: string;
}

export interface RecursoCronologia {
  tipo: 'cronologia';
  eventoId: number;
  ano: number;
  evento: string;
  tipoEvento: string;
}

export interface RecursoPericope {
  tipo: 'pericope';
  titulo: string;
  inicio: [number, number];
  fim: [number, number];
  genero: string;
  tema: string;
}

export interface RecursoContextoHistorico {
  tipo: 'contexto-historico';
  livro: string;
  autor: string;
  data: string;
  destinatarios: string;
  proposito: string;
  contexto: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTEXTO HISTÓRICO DOS LIVROS
// ═══════════════════════════════════════════════════════════════════════════════

const contextosHistoricos: Record<string, RecursoContextoHistorico> = {
  gn: {
    tipo: 'contexto-historico',
    livro: 'gn',
    autor: 'Moisés',
    data: '~1450-1410 a.C.',
    destinatarios: 'Israel',
    proposito: 'Registrar a origem de todas as coisas, a queda do homem, as alianças de Deus e as origens de Israel.',
    contexto: 'Escrito no deserto durante o Êxodo, retrata a história desde a criação até a morte de José no Egito.',
  },
  ex: {
    tipo: 'contexto-historico',
    livro: 'ex',
    autor: 'Moisés',
    data: '~1445-1406 a.C.',
    destinatarios: 'Israel',
    proposito: 'Narrar a libertação de Israel do Egito, a entrega da Lei e a construção do tabernáculo.',
    contexto: 'Continuação de Gênesis, escrito durante a peregrinação no deserto após o Êxodo.',
  },
  sl: {
    tipo: 'contexto-historico',
    livro: 'sl',
    autor: 'Vários autores (Davi, Salomão, Moisés, etc.)',
    data: '~1000-400 a.C.',
    destinatarios: 'Israel e a igreja',
    proposito: 'Livro de hinos de adoração, lamento, louvor e ensino para uso litúrgico e devocional.',
    contexto: 'Compilado ao longo de séculos, usado no templo e na sinagoga como manual de adoração.',
  },
  pv: {
    tipo: 'contexto-historico',
    livro: 'pv',
    autor: 'Salomão e outros sábios',
    data: '~970-680 a.C.',
    destinatarios: 'Jovens e todos que buscam sabedoria',
    proposito: 'Ensinamentos práticos de sabedoria para a vida diária, incluindo relações, trabalho e fé.',
    contexto: 'Coletânea de provérbios compilados durante o período monárquico de Israel.',
  },
  is: {
    tipo: 'contexto-historico',
    livro: 'is',
    autor: 'Isaías',
    data: '~740-680 a.C.',
    destinatarios: 'Judá e Israel',
    proposito: 'Profetizar sobre o juízo de Deus, a vinda do Messias e a restauração final.',
    contexto: 'Ministério durante os reinados de Uzias, Jotão, Acaz e Ezequias, período de ameaça assíria.',
  },
  jr: {
    tipo: 'contexto-historico',
    livro: 'jr',
    autor: 'Jeremias',
    data: '~627-586 a.C.',
    destinatarios: 'Judá',
    proposito: 'Chamar ao arrependimento, anunciar o juízo babilônico e profetizar a nova aliança.',
    contexto: 'Profeta durante a queda de Jerusalém, sofreu perseguição por sua mensagem impopular.',
  },
  dn: {
    tipo: 'contexto-historico',
    livro: 'dn',
    autor: 'Daniel',
    data: '~605-530 a.C.',
    destinatarios: 'Israel no exílio',
    proposito: 'Mostrar a soberania de Deus sobre todas as nações e profetizar sobre o reino messiânico.',
    contexto: 'Escrito durante o exílio babilônico, Daniel serve na corte real como sábio e intérprete de sonhos.',
  },
  mt: {
    tipo: 'contexto-historico',
    livro: 'mt',
    autor: 'Mateus',
    data: '~60-70 d.C.',
    destinatarios: 'Judeus convertidos',
    proposito: 'Apresentar Jesus como o Messias prometido, cumprindo as profecias do Antigo Testamento.',
    contexto: 'Evangelista, antigo cobrador de impostos, escreveu para judeus mostrando Jesus como o novo Moisés.',
  },
  mc: {
    tipo: 'contexto-historico',
    livro: 'mc',
    autor: 'Marcos',
    data: '~55-65 d.C.',
    destinatarios: 'Gentios (romanos)',
    proposito: 'Narrar o ministério de Jesus com foco em suas ações e milagres, enfatizando o serviço.',
    contexto: 'Evangelho mais curto, possivelmente baseado nos ensinos de Pedro. Escrito para romanos.',
  },
  lc: {
    tipo: 'contexto-historico',
    livro: 'lc',
    autor: 'Lucas',
    data: '~60-80 d.C.',
    destinatarios: 'Teófilo e gentios',
    proposito: 'Fornecer uma narrativa ordenada e detalhada da vida de Jesus com precisão histórica.',
    contexto: 'Médico e historiador, companion de Paulo, escreveu com método histórico rigoroso.',
  },
  jo: {
    tipo: 'contexto-historico',
    livro: 'jo',
    autor: 'João',
    data: '~85-95 d.C.',
    destinatarios: 'Todos os crentes',
    proposito: 'Que os leitores creiam que Jesus é o Cristo, o Filho de Deus, e tenham vida em seu nome.',
    contexto: 'Escrito por último entre os evangelhos, com foco cristológico na divindade de Jesus.',
  },
  at: {
    tipo: 'contexto-historico',
    livro: 'at',
    autor: 'Lucas',
    data: '~62-80 d.C.',
    destinatarios: 'Teófilo',
    proposito: 'Registrar a história da igreja primitiva, da ascensão de Cristo ao ministério de Paulo.',
    contexto: 'Continuação do Evangelho de Lucas, retratando a obra do Espírito Santo na expansão do cristianismo.',
  },
  rm: {
    tipo: 'contexto-historico',
    livro: 'rm',
    autor: 'Paulo',
    data: '~57 d.C.',
    destinatarios: 'Igreja em Roma',
    proposito: 'Apresentar systematicamente o evangelho da justificação pela fé e suas implicações práticas.',
    contexto: 'Escrito de Corinto antes de ir a Jerusalém, carta teológica mais extensa de Paulo.',
  },
  '1co': {
    tipo: 'contexto-historico',
    livro: '1co',
    autor: 'Paulo',
    data: '~53-55 d.C.',
    destinatarios: 'Igreja em Corinto',
    proposito: 'Corrigir problemas na igreja: divisões, imoralidade, questões doutrinárias e litúrgicas.',
    contexto: 'Igreja tumultuada com problemas morais e doutrinários, Paulo responde a relatos e perguntas.',
  },
  '2co': {
    tipo: 'contexto-historico',
    livro: '2co',
    autor: 'Paulo',
    data: '~55-56 d.C.',
    destinatarios: 'Igreja em Corinto',
    proposito: 'Defender seu ministério, expressar amor pela igreja e encorajar generosidade.',
    contexto: 'Carta pessoal e emotiva, após reconciliação com a igreja de Corinto.',
  },
  gl: {
    tipo: 'contexto-historico',
    livro: 'gl',
    autor: 'Paulo',
    data: '~48-49 d.C.',
    destinatarios: 'Igrejas da Galácia',
    proposito: 'Combater os judaizantes que exigiam obediência à Lei para a salvação.',
    contexto: 'Uma das primeiras cartas de Paulo, defesa apaixonada da justificação pela fé somente.',
  },
  ef: {
    tipo: 'contexto-historico',
    livro: 'ef',
    autor: 'Paulo',
    data: '~60-62 d.C.',
    destinatarios: 'Igreja em Éfeso',
    proposito: 'Ensinar sobre a riqueza da graça de Deus, a unidade da igreja e a vida cristã prática.',
    contexto: 'Escrito da prisão, carta circular destinada a múltiplas igrejas daÁsia Menor.',
  },
  fp: {
    tipo: 'contexto-historico',
    livro: 'fp',
    autor: 'Paulo',
    data: '~60-62 d.C.',
    destinatarios: 'Igreja em Filipos',
    proposito: 'Agradecer pela generosidade e encorajar na alegria e união em Cristo.',
    contexto: 'Carta de agradecimento escrita da prisão, mais pessoal e afetuosa de Paulo.',
  },
  cl: {
    tipo: 'contexto-historico',
    livro: 'cl',
    autor: 'Paulo',
    data: '~60-62 d.C.',
    destinatarios: 'Igreja em Colossos',
    proposito: 'Defender a plenitude de Cristo contra falsos ensinos e legalismo.',
    contexto: 'Resposta à heresia colossense que misturava cristianismo com filosofia e ascetismo.',
  },
  hb: {
    tipo: 'contexto-historico',
    livro: 'hb',
    autor: 'Desconhecido (possivelmente Paulo, Apolos ou Barnabé)',
    data: '~60-70 d.C.',
    destinatarios: 'Judeus convertidos em perigo de voltar ao judaísmo',
    proposito: 'Demonstrar a superioridade de Cristo sobre todo o sistema do Antigo Testamento.',
    contexto: 'Escrito antes da destruição do Templo em 70 d.C., para judeus tentados a abandonar a fé.',
  },
  tg: {
    tipo: 'contexto-historico',
    livro: 'tg',
    autor: 'Tiago, irmão de Jesus',
    data: '~45-50 d.C.',
    destinatarios: 'Cristãos judeus dispersos',
    proposito: 'Ensinar que fé genuína produz obras, com ênfase na ética cristã prática.',
    contexto: 'Uma das primeiras cartas cristãs, foco na ética e na autocrítica.',
  },
  '1pe': {
    tipo: 'contexto-historico',
    livro: '1pe',
    autor: 'Pedro',
    data: '~62-64 d.C.',
    destinatarios: 'Cristãos dispersos na Ásia Menor',
    proposito: 'Encorajar cristãos que sofrem perseguição, lembrando sua herança viva e esperança.',
    contexto: 'Escrito durante a perseguição de Nero, dirigido a gentios convertidos que sofriam.',
  },
  '1jo': {
    tipo: 'contexto-historico',
    livro: '1jo',
    autor: 'João',
    data: '~85-95 d.C.',
    destinatarios: 'Cristãos em geral',
    proposito: 'Combater o gnosticismo e confirmar a certeza da salvação em Cristo.',
    contexto: 'Carta pastoral contra falsos ensinos que negavam a encarnação de Cristo.',
  },
  ap: {
    tipo: 'contexto-historico',
    livro: 'ap',
    autor: 'João',
    data: '~95 d.C.',
    destinatarios: 'Sete igrejas da Ásia Menor',
    proposito: 'Revelar o triunfo final de Cristo e o cumprimento dos propósitos eternos de Deus.',
    contexto: 'Escrito no exílio em Patmos, apocalipse simbólico sobre as provações e vitórias da igreja.',
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// PERÍCOPES
// ═══════════════════════════════════════════════════════════════════════════════

const pericopes: RecursoPericope[] = [
  {
    tipo: 'pericope',
    titulo: 'A Criação',
    inicio: [1, 1],
    fim: [2, 3],
    genero: 'Narrativa',
    tema: 'Criação dos céus e da terra por Deus',
  },
  {
    tipo: 'pericope',
    titulo: 'Aqueda e suas consequências',
    inicio: [3, 1],
    fim: [3, 24],
    genero: 'Narrativa',
    tema: 'Queda do homem e expulsão do Éden',
  },
  {
    tipo: 'pericope',
    titulo: 'A aliança com Abraão',
    inicio: [12, 1],
    fim: [12, 3],
    genero: 'Narrativa',
    tema: 'Chamado e promessa de bênção universal',
  },
  {
    tipo: 'pericope',
    titulo: 'O sacrifício de Isaque',
    inicio: [22, 1],
    fim: [22, 19],
    genero: 'Narrativa',
    tema: 'Teste supremo da fé de Abraão',
  },
  {
    tipo: 'pericope',
    titulo: 'A sarça ardente',
    inicio: [3, 1],
    fim: [4, 17],
    genero: 'Narrativa',
    tema: 'Revelação do nome de Deus e chamado de Moisés',
  },
  {
    tipo: 'pericope',
    titulo: 'Os Dez Mandamentos',
    inicio: [20, 1],
    fim: [20, 17],
    genero: 'Lei',
    tema: 'Fundamento da lei moral de Deus',
  },
  {
    tipo: 'pericope',
    titulo: 'A Travessia do Mar Vermelho',
    inicio: [14, 1],
    fim: [15, 21],
    genero: 'Narrativa',
    tema: 'Libertação milagrosa de Israel do Egito',
  },
  {
    tipo: 'pericope',
    titulo: 'O Salmo 23',
    inicio: [23, 1],
    fim: [23, 6],
    genero: 'Salmo',
    tema: 'Deus como pastor que cuida do Seu povo',
  },
  {
    tipo: 'pericope',
    titulo: 'O Servo Sofredor',
    inicio: [52, 13],
    fim: [53, 12],
    genero: 'Profecia',
    tema: 'Profecia messiânica sobre o sofrimento e glória',
  },
  {
    tipo: 'pericope',
    titulo: 'As Bem-Aventuranças',
    inicio: [5, 3],
    fim: [5, 12],
    genero: 'Discurso',
    tema: 'O reino dos céus para os humildes',
  },
  {
    tipo: 'pericope',
    titulo: 'A Parábola do Filho Pródigo',
    inicio: [15, 11],
    fim: [15, 32],
    genero: 'Parábola',
    tema: 'A graça de Deus que busca o perdido',
  },
  {
    tipo: 'pericope',
    titulo: 'A Parábola do Bom Samaritano',
    inicio: [10, 25],
    fim: [10, 37],
    genero: 'Parábola',
    tema: 'O amor ao próximo sem fronteiras',
  },
  {
    tipo: 'pericope',
    titulo: 'A Ceia do Senhor',
    inicio: [26, 17],
    fim: [26, 30],
    genero: 'Narrativa',
    tema: 'Instituição da Eucaristia',
  },
  {
    tipo: 'pericope',
    titulo: 'A Paixão e Crucificação',
    inicio: [26, 36],
    fim: [27, 66],
    genero: 'Narrativa',
    tema: 'Sofrimento, morte e sepultamento de Jesus',
  },
  {
    tipo: 'pericope',
    titulo: 'A Ressurreição',
    inicio: [28, 1],
    fim: [28, 20],
    genero: 'Narrativa',
    tema: 'Vitória sobre a morte e a Grande Comissão',
  },
  {
    tipo: 'pericope',
    titulo: 'A Grande Comissão',
    inicio: [28, 16],
    fim: [28, 20],
    genero: 'Discurso',
    tema: 'Missão universal da igreja',
  },
  {
    tipo: 'pericope',
    titulo: 'O Prólogo de João',
    inicio: [1, 1],
    fim: [1, 18],
    genero: 'Prólogo',
    tema: 'A divindade e encarnação do Verbo',
  },
  {
    tipo: 'pericope',
    titulo: 'João 3:16-17',
    inicio: [3, 16],
    fim: [3, 17],
    genero: 'Discurso',
    tema: 'O amor de Deus e a salvação pela fé',
  },
  {
    tipo: 'pericope',
    titulo: 'O Bom Pastor',
    inicio: [10, 1],
    fim: [10, 18],
    genero: 'Discurso',
    tema: 'Cristo como o único caminho para a vida',
  },
  {
    tipo: 'pericope',
    titulo: 'A Última Ceia',
    inicio: [13, 1],
    fim: [17, 26],
    genero: 'Discurso',
    tema: 'Despedida de Jesus e oração sacerdotal',
  },
  {
    tipo: 'pericope',
    titulo: 'A Oração do Sumo Sacerdote',
    inicio: [17, 1],
    fim: [17, 26],
    genero: 'Oração',
    tema: 'Intercessão de Jesus pela igreja',
  },
  {
    tipo: 'pericope',
    titulo: 'A Paixão em João',
    inicio: [18, 1],
    fim: [19, 42],
    genero: 'Narrativa',
    tema: 'Julgamento, crucificação e morte de Jesus',
  },
  {
    tipo: 'pericope',
    titulo: 'A Ressurreição em João',
    inicio: [20, 1],
    fim: [20, 31],
    genero: 'Narrativa',
    tema: 'Túmulo vazio e aparições de Jesus ressuscitado',
  },
  {
    tipo: 'pericope',
    titulo: 'O Pentecostes',
    inicio: [2, 1],
    fim: [2, 47],
    genero: 'Narrativa',
    tema: 'Derramamento do Espírito Santo e início da igreja',
  },
  {
    tipo: 'pericope',
    titulo: 'A Justificação pela Fé',
    inicio: [3, 21],
    fim: [3, 31],
    genero: 'Discurso',
    tema: 'Justiça de Deus revelada no evangelho',
  },
  {
    tipo: 'pericope',
    titulo: 'O Amor Supremo',
    inicio: [13, 1],
    fim: [13, 13],
    genero: 'Discurso',
    tema: 'O mandamento do amor fraternal',
  },
  {
    tipo: 'pericope',
    titulo: 'A Ceia do Senhor em Paulo',
    inicio: [11, 23],
    fim: [11, 34],
    genero: 'Instrução',
    tema: 'Instituição e significado da Ceia',
  },
  {
    tipo: 'pericope',
    titulo: 'A Ressurreição dos Mortos',
    inicio: [15, 1],
    fim: [15, 58],
    genero: 'Discurso',
    tema: 'Fundamento da fé cristã: Cristo ressuscitou',
  },
  {
    tipo: 'pericope',
    titulo: 'O Hino do Amor',
    inicio: [13, 1],
    fim: [13, 13],
    genero: 'Hino',
    tema: 'A excelência suprema do amor',
  },
  {
    tipo: 'pericope',
    titulo: 'O Fruto do Espírito',
    inicio: [5, 22],
    fim: [5, 23],
    genero: 'Instrução',
    tema: 'Manifestações do caráter de Cristo no crente',
  },
  {
    tipo: 'pericope',
    titulo: 'A Armadura de Deus',
    inicio: [6, 10],
    fim: [6, 20],
    genero: 'Instrução',
    tema: 'Guerra espiritual e provisão divina',
  },
  {
    tipo: 'pericope',
    titulo: 'O Hino de Cristo',
    inicio: [2, 5],
    fim: [2, 11],
    genero: 'Hino',
    tema: 'Humilhação e exaltação de Cristo',
  },
  {
    tipo: 'pericope',
    titulo: 'A Paz de Deus',
    inicio: [4, 4],
    fim: [4, 9],
    genero: 'Instrução',
    tema: 'Antídoto para a ansiedade: oração e gratidão',
  },
  {
    tipo: 'pericope',
    titulo: 'A Videira e os Ramos',
    inicio: [15, 1],
    fim: [15, 17],
    genero: 'Discurso',
    tema: 'União vital com Cristo para frutificar',
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// ÍNDICES AUXILIARES
// ═══════════════════════════════════════════════════════════════════════════════

const livrosAbreviacoes: Record<string, string> = {
  gn: 'genesis', ex: 'exodo', lv: 'levitico', nm: 'numeros', dt: 'deuteronomio',
  js: 'josue', jz: 'juizes', rt: 'rute', '1sm': '1samuel', '2sm': '2samuel',
  '1rs': '1reis', '2rs': '2reis', '1cr': '1cronica', '2cr': '2cronica',
  ed: 'esdras', ne: 'neemias', et: 'ester', jb: 'jo', sl: 'salmos',
  pv: 'proverbios', ec: 'eclesiastes', ct: 'cantares', is: 'isaias',
  jr: 'jeremias', lm: 'lamentacoes', ez: 'ezequiel', dn: 'daniel',
  os: 'oseias', jl: 'joel', am: 'amos', ob: 'obadias', jn: 'jonas',
  mq: 'miqueias', na: 'naum', hc: 'habacuque', sf: 'sofonias',
  ag: 'ageu', zc: 'zacarias', ml: 'malaquias',
  mt: 'mateus', mc: 'marcos', lc: 'lucas', jo: 'joao', at: 'atos',
  rm: 'romanos', '1co': '1corintios', '2co': '2corintios', gl: 'galatas',
  ef: 'efesios', fp: 'filipenses', cl: 'colossenses', '1ts': '1tessalonicenses',
  '2ts': '2tessalonicenses', '1tm': '1timoteo', '2tm': '2timoteo', tt: 'tito',
  fm: 'filemom', hb: 'hebreus', tg: 'tiago', '1pe': '1pedro', '2pe': '2pedro',
  '1jo': '1joao', '2jo': '2joao', '3jo': '3joao', jd: 'judas', ap: 'apocalipse',
};

function normalizarPalavra(palavra: string): string {
  return palavra
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function referenciaContemVersiculo(
  referencia: string,
  livro: string,
  cap: number,
  ver: number,
): boolean {
  const lower = referencia.toLowerCase().trim();
  const abrevLower = livro.toLowerCase();
  if (!lower.includes(abrevLower)) return false;

  const idx = lower.indexOf(abrevLower);
  const resto = lower.slice(idx + abrevLower.length);

  const capVerMatch = resto.match(/(\d+):(\d+)/);
  if (capVerMatch) {
    const capRef = parseInt(capVerMatch[1], 10);
    const verRef = parseInt(capVerMatch[2], 10);
    return capRef === cap && verRef === ver;
  }

  const capOnlyMatch = resto.match(/(\d+)/);
  if (capOnlyMatch) {
    const capRef = parseInt(capOnlyMatch[1], 10);
    return capRef === cap;
  }

  return true;
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNÇÃO PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════════

export function getRecursosVersiculo(
  livro: string,
  capitulo: number,
  versiculo: number,
): RecursoVersiculo[] {
  const recursos: RecursoVersiculo[] = [];
  const livroLower = livro.toLowerCase();

  // 1. Comentários
  const comentarios = obterComentarios(livroLower, capitulo, versiculo);
  for (const c of comentarios) {
    recursos.push({
      tipo: 'comentario',
      dados: {
        tipo: 'comentario' as const,
        autor: c.autor,
        texto: c.texto,
        tipoComentario: c.tipo,
      } as RecursoComentario,
    });
  }

  // 2. Estudos teológicos
  const estudos = obterEstudos(livroLower, capitulo, versiculo);
  for (const e of estudos) {
    recursos.push({
      tipo: 'estudo',
      dados: {
        tipo: 'estudo' as const,
        tema: e.tema,
        interpretes: e.interpretacoes.map((i) => ({
          nome: i.teologo,
          periodo: i.periodo,
          tradicao: i.tradicao,
          visao: i.visao,
          resumo: i.resumo,
          citacao: i.citacao,
        })),
      } as RecursoEstudo,
    });
  }

  // 3. Notas
  const chaveNota = `${livroLower}:${capitulo}:${versiculo}`;
  const chaveNotaRange = notas[chaveNota];
  if (chaveNotaRange) {
    recursos.push({
      tipo: 'nota',
      dados: {
        tipo: 'nota' as const,
        categoria: chaveNotaRange.categoria,
        titulo: chaveNotaRange.titulo,
        conteudo: chaveNotaRange.conteudo,
        referencias: chaveNotaRange.referencia
          ? chaveNotaRange.referencia.split(';').map((r: string) => r.trim())
          : [],
      } as RecursoNota,
    });
  }

  // Verificar notas com range (ex: "gn:1:26-27")
  for (const [chave, nota] of Object.entries(notas)) {
    if (chave === chaveNota) continue;
    const rangeMatch = chave.match(/^(\w+):(\d+):(\d+)-(\d+)$/);
    if (rangeMatch) {
      const [, rLivro, rCapStr, rInicioStr, rFimStr] = rangeMatch;
      if (
        rLivro === livroLower &&
        parseInt(rCapStr, 10) === capitulo &&
        parseInt(rInicioStr, 10) <= versiculo &&
        parseInt(rFimStr, 10) >= versiculo
      ) {
        recursos.push({
          tipo: 'nota',
          dados: {
            tipo: 'nota' as const,
            categoria: nota.categoria,
            titulo: nota.titulo,
            conteudo: nota.conteudo,
            referencias: nota.referencia
              ? nota.referencia.split(';').map((r: string) => r.trim())
              : [],
          } as RecursoNota,
        });
      }
    }
  }

  // 4. Cross-references
  const crossRefs = getCrossReferences(livroLower, capitulo, versiculo);
  if (crossRefs.length > 0) {
    recursos.push({
      tipo: 'cross-ref',
      dados: {
        tipo: 'cross-ref' as const,
        refs: crossRefs,
      } as RecursoCrossRef,
    });
  }

  // 5. Léxico (palavras gregas e hebraicas associadas)
  // Palavras gregas relacionadas ao versículo
  const gregosRelevantes = palavrasGregas.filter((p) => {
    const nomeLower = normalizarPalavra(p.palavra);
    return referenciaContemVersiculo(
      `${livroLower}:${capitulo}:${versiculo}`,
      livroLower,
      capitulo,
      versiculo,
    );
  });
  for (const g of gregosRelevantes) {
    recursos.push({
      tipo: 'lexico',
      dados: {
        tipo: 'lexico' as const,
        strong: g.strong,
        palavra: g.palavra,
        transliteracao: g.transliteracao,
        definicao: g.definicao,
        morfologia: (g as any).morfologia || (g as any).morphologia || '',
        idioma: 'grego' as const,
      } as RecursoLexico,
    });
  }

  // Palavras hebraicas relacionadas ao versículo
  const hebraicosRelevantes = palavrasHebraicas.filter((p) => {
    return referenciaContemVersiculo(
      `${livroLower}:${capitulo}:${versiculo}`,
      livroLower,
      capitulo,
      versiculo,
    );
  });
  for (const h of hebraicosRelevantes) {
    recursos.push({
      tipo: 'lexico',
      dados: {
        tipo: 'lexico' as const,
        strong: h.strong,
        palavra: h.palavra,
        transliteracao: h.transliteracao,
        definicao: h.definicao,
        morfologia: h.morfologia || '',
        idioma: 'hebraico' as const,
      } as RecursoLexico,
    });
  }

  // 6. Locais bíblicos
  for (const local of locaisBiblicos) {
    if (
      local.referencias.some((ref) =>
        referenciaContemVersiculo(ref, livroLower, capitulo, versiculo),
      )
    ) {
      recursos.push({
        tipo: 'mapa',
        dados: {
          tipo: 'mapa' as const,
          lugar: local.nome,
          slug: local.id,
          lat: local.lat,
          lng: local.lng,
        } as RecursoMapa,
      });
    }
  }

  // 7. Personagens
  for (const personagem of personagens) {
    const nomeLower = normalizarPalavra(personagem.nome);
    // Verificar se o nome do personagem aparece em algum comentário ou nota
    const temRef =
      comentarios.some((c) =>
        normalizarPalavra(c.texto).includes(nomeLower),
      ) ||
      Object.values(notas).some(
        (n) =>
          normalizarPalavra(n.conteudo).includes(nomeLower) ||
          normalizarPalavra(n.titulo).includes(nomeLower),
      );

    if (temRef) {
      recursos.push({
        tipo: 'personagem',
        dados: {
          tipo: 'personagem' as const,
          slug: normalizarPalavra(personagem.nome).replace(/\s+/g, '-'),
          nome: personagem.nome,
        } as RecursoPersonagem,
      });
    }
  }

  // 8. Doutrinas
  for (const doutrina of doutrinas) {
    const temRef = doutrina.passagens.some((p) =>
      referenciaContemVersiculo(p, livroLower, capitulo, versiculo),
    );
    if (temRef) {
      recursos.push({
        tipo: 'doutrina',
        dados: {
          tipo: 'doutrina' as const,
          slug: doutrina.slug,
          nome: doutrina.nome,
          categoria: doutrina.categoria,
        } as RecursoDoutrina,
      });
    }
  }

  // 9. Cronologia
  const referenciaChave = `${livroLower}:${capitulo}:${versiculo}`;
  cronologia.forEach((evento, idx) => {
    if (evento.referencia.toLowerCase().includes(livroLower)) {
      recursos.push({
        tipo: 'cronologia',
        dados: {
          tipo: 'cronologia' as const,
          eventoId: idx,
          ano: parseInt(evento.ano.replace(/[^0-9-]/g, ''), 10) || 0,
          evento: evento.evento,
          tipoEvento: evento.tipo,
        } as RecursoCronologia,
      });
    }
  });

  // 10. Perícope
  for (const pericope of pericopes) {
    const [pInicioCap, pInicioVer] = pericope.inicio;
    const [pFimCap, pFimVer] = pericope.fim;

    const dentroDoRange =
      (capitulo > pInicioCap ||
        (capitulo === pInicioCap && versiculo >= pInicioVer)) &&
      (capitulo < pFimCap ||
        (capitulo === pFimCap && versiculo <= pFimVer));

    if (dentroDoRange) {
      recursos.push({
        tipo: 'pericope',
        dados: {
          tipo: 'pericope' as const,
          titulo: pericope.titulo,
          inicio: pericope.inicio,
          fim: pericope.fim,
          genero: pericope.genero,
          tema: pericope.tema,
        } as RecursoPericope,
      });
    }
  }

  // 11. Contexto histórico
  const contexto = contextosHistoricos[livroLower];
  if (contexto) {
    recursos.push({
      tipo: 'contexto-historico',
      dados: contexto,
    });
  }

  return recursos;
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNÇÕES AUXILIARES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Retorna todos os recursos disponíveis para um livro inteiro.
 */
export function getRecursosPorLivro(livro: string): RecursoVersiculo[] {
  const recursos: RecursoVersiculo[] = [];
  const livroLower = livro.toLowerCase();

  // Contexto histórico para o livro inteiro
  const contexto = contextosHistoricos[livroLower];
  if (contexto) {
    recursos.push({
      tipo: 'contexto-historico',
      dados: contexto,
    });
  }

  // Comentários de todas as passagens do livro
  const todosComentarios = comentariosPorLivro(livroLower);
  for (const c of todosComentarios) {
    recursos.push({
      tipo: 'comentario',
      dados: {
        tipo: 'comentario' as const,
        autor: c.autor,
        texto: c.texto,
        tipoComentario: c.tipo,
      } as RecursoComentario,
    });
  }

  // Estudos do livro
  const todosEstudos = estudosPorLivro(livroLower);
  for (const e of todosEstudos) {
    recursos.push({
      tipo: 'estudo',
      dados: {
        tipo: 'estudo' as const,
        tema: e.tema,
        interpretes: e.interpretacoes.map((i) => ({
          nome: i.teologo,
          periodo: i.periodo,
          tradicao: i.tradicao,
          visao: i.visao,
          resumo: i.resumo,
          citacao: i.citacao,
        })),
      } as RecursoEstudo,
    });
  }

  // Notas do livro
  for (const [chave, nota] of Object.entries(notas)) {
    if (chave.startsWith(`${livroLower}:`)) {
      recursos.push({
        tipo: 'nota',
        dados: {
          tipo: 'nota' as const,
          categoria: nota.categoria,
          titulo: nota.titulo,
          conteudo: nota.conteudo,
          referencias: nota.referencia
            ? nota.referencia.split(';').map((r: string) => r.trim())
            : [],
        } as RecursoNota,
      });
    }
  }

  // Locais do livro
  for (const local of locaisBiblicos) {
    if (local.referencias.some((ref) => ref.toLowerCase().startsWith(livroLower))) {
      recursos.push({
        tipo: 'mapa',
        dados: {
          tipo: 'mapa' as const,
          lugar: local.nome,
          slug: local.id,
          lat: local.lat,
          lng: local.lng,
        } as RecursoMapa,
      });
    }
  }

  // Personagens do livro
  const personagensLivro = personagens.filter((p) => {
    return todosComentarios.some((c) =>
      normalizarPalavra(c.texto).includes(normalizarPalavra(p.nome)),
    );
  });
  for (const p of personagensLivro) {
    recursos.push({
      tipo: 'personagem',
      dados: {
        tipo: 'personagem' as const,
        slug: normalizarPalavra(p.nome).replace(/\s+/g, '-'),
        nome: p.nome,
      } as RecursoPersonagem,
    });
  }

  // Doutrinas do livro
  for (const doutrina of doutrinas) {
    const temRef = doutrina.passagens.some((p) =>
      p.toLowerCase().startsWith(livroLower),
    );
    if (temRef) {
      recursos.push({
        tipo: 'doutrina',
        dados: {
          tipo: 'doutrina' as const,
          slug: doutrina.slug,
          nome: doutrina.nome,
          categoria: doutrina.categoria,
        } as RecursoDoutrina,
      });
    }
  }

  // Cronologia do livro
  cronologia.forEach((evento, idx) => {
    if (evento.referencia.toLowerCase().startsWith(livroLower)) {
      recursos.push({
        tipo: 'cronologia',
        dados: {
          tipo: 'cronologia' as const,
          eventoId: idx,
          ano: parseInt(evento.ano.replace(/[^0-9-]/g, ''), 10) || 0,
          evento: evento.evento,
          tipoEvento: evento.tipo,
        } as RecursoCronologia,
      });
    }
  });

  return recursos;
}

/**
 * Retorna os tipos de recursos disponíveis para um versículo específico.
 */
export function getTiposRecursoDisponiveis(
  livro: string,
  cap: number,
  ver: number,
): TipoRecurso[] {
  const recursos = getRecursosVersiculo(livro, cap, ver);
  const tipos = new Set<TipoRecurso>();
  for (const r of recursos) {
    tipos.add(r.tipo);
  }
  return [...tipos];
}

/**
 * Verifica se um versículo tem um tipo específico de recurso.
 */
export function temRecursoEspecifico(
  livro: string,
  cap: number,
  ver: number,
  tipo: TipoRecurso,
): boolean {
  const tipos = getTiposRecursoDisponiveis(livro, cap, ver);
  return tipos.includes(tipo);
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNÇÕES INTERNAS DE SUPORTE
// ═══════════════════════════════════════════════════════════════════════════════

import { obterTodosComentarios } from '../comentarios';
import { listarTodosEstudos } from '../estudosTeologicos';
import type { Comentario } from '../comentarios';
import type { EstudoVersiculo } from '../estudosTeologicos';

function comentariosPorLivro(livro: string): Comentario[] {
  return obterTodosComentarios().filter(
    (c) => c.livro.toLowerCase() === livro.toLowerCase(),
  );
}

function estudosPorLivro(livro: string): EstudoVersiculo[] {
  return listarTodosEstudos().filter(
    (e) => e.livro.toLowerCase() === livro.toLowerCase(),
  );
}
