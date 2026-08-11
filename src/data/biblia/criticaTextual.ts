export interface VarianteTextual {
  id: string;
  referencia: string;
  tipo: 'letras_similares' | 'adicao_omissao' | 'ordem_palavras' | 'substituicao_sinonimos' | 'teologica' | 'relato' | 'numerica' | 'pontuacao';
  variantes: {
    leitura: string;
    manuscritos: string[];
    classificacao: 'forte' | 'moderada' | 'fraca';
  }[];
  explicacao: string;
  versiculosAfetados: string[];
  pericope?: string;
  recomendacaoNA28?: string;
}

export const VARIANTES_TEXTUAIS: VarianteTextual[] = [
  {
    id: "vt-001",
    referencia: "mt:1:25",
    tipo: "letras_similares",
    variantes: [
      { leitura: "o primeiro filho (τὸν πρωτότοκον)", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "um filho (υἱόν)", manuscritos: ["Alexandrino (02)", "Beza (05)"], classificacao: "moderada" }
    ],
    explicacao: "Diferença entre artigo definido e indefinido.",
    versiculosAfetados: ["mt:1:25"],
    pericope: "O Nascimento de Jesus"
  },
  {
    id: "vt-002",
    referencia: "mt:5:22",
    tipo: "letras_similares",
    variantes: [
      { leitura: "sem causa (εἰκῆ)", manuscritos: ["Alexandrino (02)", "Vaticano (03)"], classificacao: "moderada" },
      { leitura: "omissão de 'sem causa'", manuscritos: ["Sinaitico (01)", "Beza (05)"], classificacao: "forte" }
    ],
    explicacao: "A adição 'sem causa' pode ser suavização. A leitura mais dura é provavelmente original.",
    versiculosAfetados: ["mt:5:22"],
    pericope: "A Raiva"
  },
  {
    id: "vt-003",
    referencia: "mt:6:1",
    tipo: "letras_similares",
    variantes: [
      { leitura: "diante dos homens", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "diante de vós mesmos", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Confusão por semelhança fonética em pronúncia tardia do grego.",
    versiculosAfetados: ["mt:6:1"],
    pericope: "Esmolas, Oração e Jejum"
  },
  {
    id: "vt-004",
    referencia: "mt:13:35",
    tipo: "letras_similares",
    variantes: [
      { leitura: "o profeta", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Isaías, o profeta", manuscritos: ["Alexandrino (02)", "Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "Mateus cita Sl 78:2 mas atribui a Isaías.",
    versiculosAfetados: ["mt:13:35"],
    pericope: "Os Tesouros Escondidos"
  },
  {
    id: "vt-005",
    referencia: "mt:19:16",
    tipo: "letras_similares",
    variantes: [
      { leitura: "Mestre, que farei de bom?", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Mestre, que farei para ter a vida eterna?", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Harmonização com Mc 10:17 e Lc 18:18.",
    versiculosAfetados: ["mt:19:16"],
    pericope: "O Rico Jovem"
  },
  {
    id: "vt-006",
    referencia: "mt:27:24",
    tipo: "letras_similares",
    variantes: [
      { leitura: "inocente (ἀθῷος)", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "justo (δίκαιος)", manuscritos: ["Alexandrino (02)", "Beza (05)"], classificacao: "moderada" }
    ],
    explicacao: "Confusão por semelhança de sentido.",
    versiculosAfetados: ["mt:27:24"],
    pericope: "A Inocência de Pilatos"
  },
  {
    id: "vt-007",
    referencia: "mc:1:41",
    tipo: "letras_similares",
    variantes: [
      { leitura: "compenetrou-se de compaixão", manuscritos: ["Sinaitico (01)", "Alexandrino (02)"], classificacao: "forte" },
      { leitura: "ficou irado", manuscritos: ["Beza (05)", "Manuscritos latinos antigos"], classificacao: "moderada" }
    ],
    explicacao: "A leitura 'ficou irado' é mais difícil e provavelmente original.",
    versiculosAfetados: ["mc:1:41"],
    pericope: "Jesus Cura um Leproso"
  },
  {
    id: "vt-008",
    referencia: "mc:7:26",
    tipo: "letras_similares",
    variantes: [
      { leitura: "fenícia de origem siria", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "cananeia", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Mateus 15:22 chama de 'cananeia'.",
    versiculosAfetados: ["mc:7:26"],
    pericope: "A Filha da Mulher Sidoniana"
  },
  {
    id: "vt-009",
    referencia: "mc:9:48",
    tipo: "letras_similares",
    variantes: [
      { leitura: "onde o verme deles não morre", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "onde o seu verme não morre", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Diferença entre pronome plural e singular.",
    versiculosAfetados: ["mc:9:48"],
    pericope: "O Fogo Inextinguível"
  },
  {
    id: "vt-010",
    referencia: "mc:12:30",
    tipo: "letras_similares",
    variantes: [
      { leitura: "com todo o teu coração", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "com todo o teu entendimento", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Mateus 22:37 usa 'entendimento' em vez de 'coração'.",
    versiculosAfetados: ["mc:12:30"],
    pericope: "O Grande Mandamento"
  },
  {
    id: "vt-011",
    referencia: "mc:13:33",
    tipo: "letras_similares",
    variantes: [
      { leitura: "vigiai e orai", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "vigiai", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Harmonização com Mc 14:38.",
    versiculosAfetados: ["mc:13:33"],
    pericope: "A Hora de Jesus"
  },
  {
    id: "vt-012",
    referencia: "lc:2:33",
    tipo: "letras_similares",
    variantes: [
      { leitura: "o pai e a mãe dele", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "José e a mãe dele", manuscritos: ["Alexandrino (02)", "Beza (05)"], classificacao: "moderada" }
    ],
    explicacao: "Lucas evita chamar José de 'pai' de Jesus.",
    versiculosAfetados: ["lc:2:33"],
    pericope: "Simeão e Ana no Templo"
  },
  {
    id: "vt-013",
    referencia: "lc:2:43",
    tipo: "letras_similares",
    variantes: [
      { leitura: "os pais", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "José e sua mãe", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Mesma tendência de Lucas evitar chamar José de pai.",
    versiculosAfetados: ["lc:2:43"],
    pericope: "Jesus no Templo"
  },
  {
    id: "vt-014",
    referencia: "lc:2:48",
    tipo: "letras_similares",
    variantes: [
      { leitura: "teu pai e eu", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "José e eu", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Maria chama José de 'pai' de Jesus.",
    versiculosAfetados: ["lc:2:48"],
    pericope: "Jesus no Templo"
  },
  {
    id: "vt-015",
    referencia: "lc:3:22",
    tipo: "letras_similares",
    variantes: [
      { leitura: "Tu és meu Filho amado; em ti me agrado", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Tu és meu Filho amado; hoje te gerei", manuscritos: ["Beza (05)", "Manuscritos latinos antigos"], classificacao: "fraca" }
    ],
    explicacao: "A leitura citando Sl 2:7 pode refletir tradição adopcionista.",
    versiculosAfetados: ["lc:3:22"],
    pericope: "O Batismo de Jesus"
  },
  {
    id: "vt-016",
    referencia: "lc:11:2-3",
    tipo: "letras_similares",
    variantes: [
      { leitura: "venha o teu reino; seja feita a tua vontade", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "venha o teu reino Santo", manuscritos: ["Beza (05)", "Manuscritos siríacos"], classificacao: "moderada" }
    ],
    explicacao: "A variante 'reino Santo' é harmonização com Didaquê 8:2.",
    versiculosAfetados: ["lc:11:2", "lc:11:3"],
    pericope: "O Pai Nosso"
  },
  {
    id: "vt-017",
    referencia: "lc:22:43-44",
    tipo: "letras_similares",
    variantes: [
      { leitura: "versículos incluídos", manuscritos: ["Alexandrino (02)", "Beza (05)"], classificacao: "forte" },
      { leitura: "versículos omitidos", manuscritos: ["Sinaitico (01)", "Vaticano (03)", "Papiro 75"], classificacao: "forte" }
    ],
    explicacao: "Evidência dividida. Podem ter sido omitidos por razões docéticas.",
    versiculosAfetados: ["lc:22:43", "lc:22:44"],
    pericope: "A Agonia no Getsêmani",
    recomendacaoNA28: "Incluídos com nota sobre evidência dividida."
  },
  {
    id: "vt-018",
    referencia: "lc:23:34",
    tipo: "letras_similares",
    variantes: [
      { leitura: "versículo incluído", manuscritos: ["Sinaitico (01)", "Alexandrino (02)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "versículo omitido", manuscritos: ["Beza (05)", "Manuscritos siríacos antigos"], classificacao: "moderada" }
    ],
    explicacao: "Alguns omitiram porque os judeus 'deveriam saber'.",
    versiculosAfetados: ["lc:23:34"],
    pericope: "A Crucificação"
  },
  {
    id: "vt-019",
    referencia: "jo:1:18",
    tipo: "letras_similares",
    variantes: [
      { leitura: "o unigênito Deus", manuscritos: ["Sinaitico (01)", "Vaticano (03)", "Papiro 66", "Papiro 75"], classificacao: "forte" },
      { leitura: "o unigênito Filho", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A leitura 'Deus' é mais difícil e provavelmente original.",
    versiculosAfetados: ["jo:1:18"],
    pericope: "O Verbo Encarnado",
    recomendacaoNA28: "Lê 'o unigênito Deus'."
  },
  {
    id: "vt-020",
    referencia: "jo:1:34",
    tipo: "letras_similares",
    variantes: [
      { leitura: "Filho de Deus", manuscritos: ["Sinaitico (01)", "Alexandrino (02)"], classificacao: "forte" },
      { leitura: "o Eleito de Deus", manuscritos: ["Vaticano (03)"], classificacao: "moderada" }
    ],
    explicacao: "A leitura 'eleito' é mais difícil mas 'Filho de Deus' tem melhor suporte.",
    versiculosAfetados: ["jo:1:34"],
    pericope: "O Testemunho de João Batista"
  },
  {
    id: "vt-021",
    referencia: "jo:3:13",
    tipo: "letras_similares",
    variantes: [
      { leitura: "que está nos céus", manuscritos: ["Alexandrino (02)", "Manuscritos posteriores"], classificacao: "forte" },
      { leitura: "omissão da frase", manuscritos: ["Papiro 66", "Sinaitico (01)"], classificacao: "moderada" }
    ],
    explicacao: "Pode ser adição cristológica para enfatizar a preexistência.",
    versiculosAfetados: ["jo:3:13"],
    pericope: "O Filho do Homem"
  },
  {
    id: "vt-022",
    referencia: "jo:19:14",
    tipo: "letras_similares",
    variantes: [
      { leitura: "sexta (ἕκτη)", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "terceira (τρίτη)", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Discordância sobre o horário.",
    versiculosAfetados: ["jo:19:14"],
    pericope: "A Sentença de Pilatos"
  },
  {
    id: "vt-023",
    referencia: "at:20:28",
    tipo: "letras_similares",
    variantes: [
      { leitura: "a igreja de Deus", manuscritos: ["Alexandrino (02)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "a igreja do Senhor", manuscritos: ["Manuscritos occidentais"], classificacao: "moderada" },
      { leitura: "a igreja do Senhor e Deus", manuscritos: ["Manuscritos posteriores"], classificacao: "fraca" }
    ],
    explicacao: "A leitura 'Deus' é mais provável por dificuldade do copista.",
    versiculosAfetados: ["at:20:28"],
    pericope: "A Igreja de Deus"
  },
  {
    id: "vt-024",
    referencia: "rm:5:1",
    tipo: "letras_similares",
    variantes: [
      { leitura: "temos paz (indicativo)", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "tenhamos paz (subjuntivo)", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A leitura indicativa é mais difícil e provavelmente original.",
    versiculosAfetados: ["rm:5:1"],
    pericope: "Justificação"
  },
  {
    id: "vt-025",
    referencia: "rm:8:1",
    tipo: "letras_similares",
    variantes: [
      { leitura: "nenhuma condenação", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "nenhuma condenação para aqueles em Cristo Jesus", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "A leitura mais curta é mais provável por ser mais difícil.",
    versiculosAfetados: ["rm:8:1"],
    pericope: "Liberdade em Cristo"
  },
  {
    id: "vt-026",
    referencia: "rm:9:5",
    tipo: "letras_similares",
    variantes: [
      { leitura: "Cristo, que é Deus sobre todas as coisas", manuscritos: ["Manuscritos gregos"], classificacao: "forte" },
      { leitura: "Cristo. Bendito o Deus eterno.", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "A pontuação muda completamente o significado teológico.",
    versiculosAfetados: ["rm:9:5"],
    pericope: "Israel e Cristo"
  },
  {
    id: "vt-027",
    referencia: "rm:16:24",
    tipo: "letras_similares",
    variantes: [
      { leitura: "versículo omitido", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "A graça de nosso Senhor Jesus Cristo seja com todos.", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "A fórmula de graça pode ter sido adicionada de outras epístolas.",
    versiculosAfetados: ["rm:16:24"],
    pericope: "Saudações Finais"
  },
  {
    id: "vt-028",
    referencia: "1co:11:24",
    tipo: "letras_similares",
    variantes: [
      { leitura: "isto é o meu corpo, que é dado por vós", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "isto é o meu corpo, que é partido por vós", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A questão é se Jesus disse 'quebrado' ou não.",
    versiculosAfetados: ["1co:11:24"],
    pericope: "A Ceia do Senhor"
  },
  {
    id: "vt-029",
    referencia: "1co:14:34-35",
    tipo: "letras_similares",
    variantes: [
      { leitura: "versículos incluídos na posição atual", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "versículos após 14:40", manuscritos: ["Alexandrino (02)", "Beza (05)"], classificacao: "moderada" }
    ],
    explicacao: "Alguns manuscritos colocam após 14:40.",
    versiculosAfetados: ["1co:14:34", "1co:14:35"],
    pericope: "O Silêncio das Mulheres"
  },
  {
    id: "vt-030",
    referencia: "1co:15:47",
    tipo: "letras_similares",
    variantes: [
      { leitura: "o primeiro homem, Adão, é terrenal", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o primeiro homem é terrenal", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "O nome 'Adão' pode ser glossa explicativa.",
    versiculosAfetados: ["1co:15:47"],
    pericope: "O Último Adão"
  },
  {
    id: "vt-031",
    referencia: "2co:4:14",
    tipo: "letras_similares",
    variantes: [
      { leitura: "o Senhor Jesus", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Jesus", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'Senhor' pode ser glossa cristológica.",
    versiculosAfetados: ["2co:4:14"],
    pericope: "A Ressurreição"
  },
  {
    id: "vt-032",
    referencia: "2co:5:17",
    tipo: "letras_similares",
    variantes: [
      { leitura: "se alguém está em Cristo", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "quem está em Cristo", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A construção grega varia entre participio e condicional.",
    versiculosAfetados: ["2co:5:17"],
    pericope: "A Nova Criatura"
  },
  {
    id: "vt-033",
    referencia: "gl:1:8",
    tipo: "letras_similares",
    variantes: [
      { leitura: "um anjo do céu primeiro, depois nós", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "nós primeiro, depois um anjo do céu", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A ordem 'anjo... nós' é mais provável por ser mais difícil.",
    versiculosAfetados: ["gl:1:8"],
    pericope: "O Outro Evangelho"
  },
  {
    id: "vt-034",
    referencia: "ef:1:1",
    tipo: "letras_similares",
    variantes: [
      { leitura: "em Efeso", manuscritos: ["Manuscritos posteriores"], classificacao: "forte" },
      { leitura: "omissão de 'em Efeso'", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "moderada" }
    ],
    explicacao: "Pode indicar que a epístola era circular.",
    versiculosAfetados: ["ef:1:1"],
    pericope: "Saudação"
  },
  {
    id: "vt-035",
    referencia: "ef:3:9",
    tipo: "letras_similares",
    variantes: [
      { leitura: "comunhão do mistério", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "administração do mistério", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "As duas palavras são facilmente confundidas em manuscritos gregos.",
    versiculosAfetados: ["ef:3:9"],
    pericope: "O Mistério Oculto"
  },
  {
    id: "vt-036",
    referencia: "cl:1:14",
    tipo: "letras_similares",
    variantes: [
      { leitura: "redenção, o perdão dos pecados", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "redenção pelo seu sangue, o perdão dos pecados", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "A frase 'pelo seu sangue' foi harmonizada de Ef 1:7.",
    versiculosAfetados: ["cl:1:14"],
    pericope: "Redenção"
  },
  {
    id: "vt-037",
    referencia: "cl:2:2",
    tipo: "letras_similares",
    variantes: [
      { leitura: "o mistério de Deus, o Pai, e de Cristo", manuscritos: ["Alexandrino (02)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o mistério de Deus, em Cristo", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "Reflete tradição mais antiga sobre relação Pai-Filho.",
    versiculosAfetados: ["cl:2:2"],
    pericope: "O Tesouro da Sabedoria"
  },
  {
    id: "vt-038",
    referencia: "hb:2:9",
    tipo: "letras_similares",
    variantes: [
      { leitura: "pela graça de Deus", manuscritos: ["Alexandrino (02)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "exceto Jesus", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "A leitura 'exceto Jesus' é tão surpreendente que provavelmente não foi inventada.",
    versiculosAfetados: ["hb:2:9"],
    pericope: "A Morte de Jesus"
  },
  {
    id: "vt-039",
    referencia: "hb:4:15",
    tipo: "letras_similares",
    variantes: [
      { leitura: "tentado em tudo como nós, porém sem pecado", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "tentado em tudo como nós", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'porém sem pecado' pode ser glossa anti-docética.",
    versiculosAfetados: ["hb:4:15"],
    pericope: "Sumo Sacerdote Compassivo"
  },
  {
    id: "vt-040",
    referencia: "hb:10:34",
    tipo: "letras_similares",
    variantes: [
      { leitura: "vosso próprio", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "meus", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A leitura 'meus' pode refletir tradição mais antiga.",
    versiculosAfetados: ["hb:10:34"],
    pericope: "Os Sofrimentos dos Cristãos"
  },
  {
    id: "vt-041",
    referencia: "1jo:2:23",
    tipo: "letras_similares",
    variantes: [
      { leitura: "versículo com segunda parte incluída", manuscritos: ["Manuscritos posteriores"], classificacao: "forte" },
      { leitura: "versículo sem a segunda parte", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "moderada" }
    ],
    explicacao: "A segunda parte pode ser glossa inspirada em 1 João 4:15.",
    versiculosAfetados: ["1jo:2:23"],
    pericope: "O Negador do Filho"
  },
  {
    id: "vt-042",
    referencia: "1jo:4:3",
    tipo: "letras_similares",
    variantes: [
      { leitura: "não confessou", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "negou/destruiu", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "A leitura 'não confessou' é mais difícil e provavelmente original.",
    versiculosAfetados: ["1jo:4:3"],
    pericope: "O Espírito da Mentira"
  },
  {
    id: "vt-043",
    referencia: "1jo:5:7",
    tipo: "letras_similares",
    variantes: [
      { leitura: "Comma Johanneum omitido", manuscritos: ["Sinaitico (01)", "Vaticano (03)", "Todos os gregos antigos"], classificacao: "forte" },
      { leitura: "Comma Johanneum incluído", manuscritos: ["Textus Receptus", "Manuscritos latinos tardios"], classificacao: "fraca" }
    ],
    explicacao: "A adição trinitária não aparece em nenhum grego anterior ao séc. XVI.",
    versiculosAfetados: ["1jo:5:7", "1jo:5:8"],
    pericope: "A Trindade no Texto",
    recomendacaoNA28: "Omitido na NA28."
  },
  {
    id: "vt-044",
    referencia: "1tm:3:16",
    tipo: "letras_similares",
    variantes: [
      { leitura: "isto se manifestou em carne", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Deus se manifestou em carne", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "Confusão entre ΟΣ e ΘΣ em uncinais gregos.",
    versiculosAfetados: ["1tm:3:16"],
    pericope: "O Mistério da Piedade",
    recomendacaoNA28: "Lê 'isto' (ὅ)."
  },
  {
    id: "vt-045",
    referencia: "1pe:5:10",
    tipo: "letras_similares",
    variantes: [
      { leitura: "Cristo Jesus", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Jesus", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A forma abreviada pode ser original.",
    versiculosAfetados: ["1pe:5:10"],
    pericope: "A Graça Eterna"
  },
  {
    id: "vt-046",
    referencia: "ap:1:8",
    tipo: "letras_similares",
    variantes: [
      { leitura: "Alfa e Ômega - dito por Deus", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Alfa e Ômega - dito por Cristo", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "No v.8 as palavras são de Deus; no v.11 omitidas por alguns.",
    versiculosAfetados: ["ap:1:8"],
    pericope: "Alfa e Ômega"
  },
  {
    id: "vt-047",
    referencia: "ap:22:14",
    tipo: "letras_similares",
    variantes: [
      { leitura: "lavam suas vestes", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "têm direito à árvore da vida", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "As duas leituras refletem teologias diferentes.",
    versiculosAfetados: ["ap:22:14"],
    pericope: "A Bênção Final"
  },
  {
    id: "vt-048",
    referencia: "mt:17:21",
    tipo: "letras_similares",
    variantes: [
      { leitura: "versículo omitido", manuscritos: ["Sinaitico (01)", "Vaticano (03)", "Alexandrino (02)"], classificacao: "forte" },
      { leitura: "Mas esta espécie não sai senão pela oração e pelo jejum", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "Copiado de Mc 9:29 para Mateus por escribas.",
    versiculosAfetados: ["mt:17:21"],
    pericope: "A Fé na Oração"
  },
  {
    id: "vt-049",
    referencia: "mc:9:44",
    tipo: "letras_similares",
    variantes: [
      { leitura: "versículos 44 e 46 omitidos", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "versículos incluídos", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "A repetição tripla pode ser expansão homilética.",
    versiculosAfetados: ["mc:9:44", "mc:9:46"],
    pericope: "O Fogo do Inferno",
    recomendacaoNA28: "Omitidos na NA28."
  },
  {
    id: "vt-050",
    referencia: "mt:6:13",
    tipo: "letras_similares",
    variantes: [
      { leitura: "doxologia omitida", manuscritos: ["Sinaitico (01)", "Vaticano (03)", "Alexandrino (02)"], classificacao: "forte" },
      { leitura: "Pois teu é o reino, e o poder, e a glória, para sempre.", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "A doxologia veio da liturgia cristã primitiva.",
    versiculosAfetados: ["mt:6:13"],
    pericope: "O Pai Nosso",
    recomendacaoNA28: "Doxologia omitida na NA28."
  },
  {
    id: "vt-051",
    referencia: "mc:16:9-20",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "versículos 9-20 incluídos", manuscritos: ["Manuscritos posteriores (K)"], classificacao: "moderada" },
      { leitura: "versículos 9-20 omitidos", manuscritos: ["Sinaitico (01)", "Vaticano (03)", "Alexandrino (02)"], classificacao: "forte" }
    ],
    explicacao: "O final de Marcos não se encontra nos manuscritos mais antigos.",
    versiculosAfetados: ["mc:16:9", "mc:16:10", "mc:16:11", "mc:16:12", "mc:16:13", "mc:16:14", "mc:16:15", "mc:16:16", "mc:16:17", "mc:16:18", "mc:16:19", "mc:16:20"],
    pericope: "A Ressurreição e a Grande Comissão",
    recomendacaoNA28: "Versos 9-20 entre colchetes."
  },
  {
    id: "vt-052",
    referencia: "jo:7:53-8:11",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "passagem da adúltera incluída", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" },
      { leitura: "passagem omitida", manuscritos: ["Sinaitico (01)", "Vaticano (03)", "Papiro 66", "Papiro 75"], classificacao: "forte" }
    ],
    explicacao: "A história da mulher adúltera não se encontra nos manuscritos mais antigos.",
    versiculosAfetados: ["jo:7:53", "jo:8:1", "jo:8:2", "jo:8:3", "jo:8:4", "jo:8:5", "jo:8:6", "jo:8:7", "jo:8:8", "jo:8:9", "jo:8:10", "jo:8:11"],
    pericope: "A Adúltera Perdoada",
    recomendacaoNA28: "O trecho entre colchetes."
  },
  {
    id: "vt-053",
    referencia: "jo:5:3b-4",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "versículo 4 omitido", manuscritos: ["Sinaitico (01)", "Vaticano (03)", "Papiro 66", "Papiro 75"], classificacao: "forte" },
      { leitura: "anjo agitava a água", manuscritos: ["Manuscritos posteriores"], classificacao: "fraca" }
    ],
    explicacao: "A explicação sobre o anjo é adição tardia explicativa.",
    versiculosAfetados: ["jo:5:3", "jo:5:4"],
    pericope: "A Piscina de Betesda",
    recomendacaoNA28: "Versículo 4 omitido na NA28."
  },
  {
    id: "vt-054",
    referencia: "at:8:37",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "versículo omitido", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "confissão de fé do eunuco", manuscritos: ["Códice de Beza (05)", "Manuscritos latinos"], classificacao: "fraca" }
    ],
    explicacao: "Fórmula batismal primitiva adicionada como glossa.",
    versiculosAfetados: ["at:8:37"],
    pericope: "O Batismo do Eunuco Etíope",
    recomendacaoNA28: "Versículo omitido na NA28."
  },
  {
    id: "vt-055",
    referencia: "mt:18:11",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "versículo omitido", manuscritos: ["Sinaitico (01)", "Vaticano (03)", "Alexandrino (02)"], classificacao: "forte" },
      { leitura: "Porque o Filho do Homem veio salvar o perdido", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "Copiado de Lc 19:10 por escribas.",
    versiculosAfetados: ["mt:18:11"],
    pericope: "A Perda e o Achado",
    recomendacaoNA28: "Versículo omitido na NA28."
  },
  {
    id: "vt-056",
    referencia: "mt:23:14",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "versículo omitido", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Ai de vós, escribas e fariseus...", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "Interpolado de Mc 12:40 e Lc 20:47.",
    versiculosAfetados: ["mt:23:14"],
    pericope: "As Sete Maldições",
    recomendacaoNA28: "Versículo omitido na NA28."
  },
  {
    id: "vt-057",
    referencia: "mc:11:26",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "versículo omitido", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Se vós não perdoardes...", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "Interpolado de Mt 6:15.",
    versiculosAfetados: ["mc:11:26"],
    pericope: "O Perdão",
    recomendacaoNA28: "Versículo omitido na NA28."
  },
  {
    id: "vt-058",
    referencia: "at:15:34",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "versículo omitido", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Mas Judas ficou ali", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "Versículo adicionado para resolver dificuldade narrativa.",
    versiculosAfetados: ["at:15:34"],
    pericope: "A Permanência de Judas",
    recomendacaoNA28: "Versículo omitido na NA28."
  },
  {
    id: "vt-059",
    referencia: "lc:22:19b-20",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "segunda parte da ceia incluída", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "versão curta", manuscritos: ["Didaquê", "Justino Mártir"], classificacao: "moderada" }
    ],
    explicacao: "A versão curta pode refletir tradição mais antiga da Ceia.",
    versiculosAfetados: ["lc:22:19", "lc:22:20"],
    pericope: "A Ceia do Senhor",
    recomendacaoNA28: "Texto mais longo incluído, evidência dividida."
  },
  {
    id: "vt-060",
    referencia: "mt:27:49b",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "versículo omitido no final", manuscritos: ["Sinaitico (01) original", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "O soldado feriu seu lado", manuscritos: ["Sinaitico (01) posterior", "Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Nota interpolada de Jo 19:34.",
    versiculosAfetados: ["mt:27:49"],
    pericope: "A Morte de Jesus"
  },
  {
    id: "vt-061",
    referencia: "mc:1:1",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "Início do evangelho de Jesus Cristo, Filho de Deus", manuscritos: ["Alexandrino (02)"], classificacao: "forte" },
      { leitura: "Início do evangelho de Jesus Cristo", manuscritos: ["Sinaitico (01) original"], classificacao: "moderada" }
    ],
    explicacao: "A leitura mais curta pode ser original.",
    versiculosAfetados: ["mc:1:1"],
    pericope: "O Início do Evangelho",
    recomendacaoNA28: "Inclui 'Filho de Deus' com nota."
  },
  {
    id: "vt-062",
    referencia: "jo:5:2",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "Betzata", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Betsaida", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Confusão entre dois nomes de locais diferentes.",
    versiculosAfetados: ["jo:5:2"],
    pericope: "A Piscina de Betesda"
  },
  {
    id: "vt-063",
    referencia: "at:7:45",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "Josué", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Jesus", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "A mesma palavra grega para Josué e Jesus.",
    versiculosAfetados: ["at:7:45"],
    pericope: "Estêvão: O Discurso"
  },
  {
    id: "vt-064",
    referencia: "rm:8:16",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "o próprio Espírito testifica", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o Espírito testifica conosco", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A leitura 'conosco' pode ser mais original.",
    versiculosAfetados: ["rm:8:16"],
    pericope: "O Testemunho do Espírito"
  },
  {
    id: "vt-065",
    referencia: "1jo:5:7-8",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "Comma Johanneum omitido", manuscritos: ["Todos os manuscritos gregos antigos"], classificacao: "forte" },
      { leitura: "Comma Johanneum incluído", manuscritos: ["6-7 manuscritos gregos tardios", "Textus Receptus"], classificacao: "fraca" }
    ],
    explicacao: "A mais conhecida interpolação do NT.",
    versiculosAfetados: ["1jo:5:7", "1jo:5:8"],
    pericope: "A Trindade no Texto",
    recomendacaoNA28: "Omitido na NA28."
  },
  {
    id: "vt-066",
    referencia: "mt:24:36",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "nem o Filho incluído", manuscritos: ["Sinaitico (01)", "Vaticano (03)", "Alexandrino (02)"], classificacao: "forte" },
      { leitura: "nem o Filho omitido", manuscritos: ["Alguns manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "Alguns omitiram por razões cristológicas.",
    versiculosAfetados: ["mt:24:36"],
    pericope: "O Dia e a Hora",
    recomendacaoNA28: "Incluído com nota."
  },
  {
    id: "vt-067",
    referencia: "ef:5:32",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "mistério", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "sacramento", manuscritos: ["Vulgata", "Manuscritos latinos"], classificacao: "moderada" }
    ],
    explicacao: "A tradução 'sacramento' da Vulgata influenciou a teologia.",
    versiculosAfetados: ["ef:5:32"],
    pericope: "O Mistério do Matrimônio"
  },
  {
    id: "vt-068",
    referencia: "mt:27:49a",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "primeira parte incluída", manuscritos: ["Alexandrino (02)"], classificacao: "forte" },
      { leitura: "primeira parte omitida", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" }
    ],
    explicacao: "Variantes na descrição da morte de Jesus.",
    versiculosAfetados: ["mt:27:49"],
    pericope: "A Morte de Jesus"
  },
  {
    id: "vt-069",
    referencia: "jo:19:14b",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "era sexta-feira da preparação", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "era preparação do páscoa; era como sexta-feira", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "João pode ter usado 'preparação' em sentido técnico.",
    versiculosAfetados: ["jo:19:14"],
    pericope: "A Sentença de Pilatos"
  },
  {
    id: "vt-070",
    referencia: "gl:3:17",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "cento e quarenta e três anos depois", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "cento e quarenta anos depois", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Diferença numérica no período entre Abraão e Moisés.",
    versiculosAfetados: ["gl:3:17"],
    pericope: "A Lei e a Promessa"
  },
  {
    id: "vt-071",
    referencia: "ap:22:19",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "livro da vida", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "livro deste livro", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Pode ser adição para reforçar a advertência final.",
    versiculosAfetados: ["ap:22:19"],
    pericope: "A Advertência Final"
  },
  {
    id: "vt-072",
    referencia: "mt:27:24",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "inocente deste sangue", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "justo deste sangue", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação que afeta a teologia da responsabilidade.",
    versiculosAfetados: ["mt:27:24"],
    pericope: "A Inocência de Pilatos"
  },
  {
    id: "vt-073",
    referencia: "at:19:35",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "a imagem que caiu do céu", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "a imagem do templo de Ártemis", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "Referência ao culto de Ártemis em Éfeso.",
    versiculosAfetados: ["at:19:35"],
    pericope: "O Tumulto em Éfeso"
  },
  {
    id: "vt-074",
    referencia: "lc:24:51",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "e foi arrebatado ao céu", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "versículo omitido", manuscritos: ["Alexandrino (02)", "Manuscritos siríacos"], classificacao: "moderada" }
    ],
    explicacao: "A ascensão pode ter sido adicionada para harmonizar com At 1:9.",
    versiculosAfetados: ["lc:24:51"],
    pericope: "A Ascensão"
  },
  {
    id: "vt-075",
    referencia: "jo:12:41",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "Isaías, quando viu a glória dele", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Isaías, quando viu a glória de Jesus", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "Clarificação cristológica.",
    versiculosAfetados: ["jo:12:41"],
    pericope: "A Cegueira de Israel"
  },
  {
    id: "vt-076",
    referencia: "at:12:25",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "de Jerusalém para Antioquia", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "de Antioquia para Jerusalém", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A direção da viagem varia entre manuscritos.",
    versiculosAfetados: ["at:12:25"],
    pericope: "Barnabé e Saulo"
  },
  {
    id: "vt-077",
    referencia: "1co:15:3",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "Cristo morreu pelos nossos pecados", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Cristo morreu por nossos pecados segundo as Escrituras", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição pode ser formulação catequética.",
    versiculosAfetados: ["1co:15:3"],
    pericope: "A Ressurreição de Cristo"
  },
  {
    id: "vt-078",
    referencia: "hb:7:3",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "sem pai, sem mãe, sem genealogia", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "sem pai, sem mãe", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A lista de características de Melquisedeque foi expandida.",
    versiculosAfetados: ["hb:7:3"],
    pericope: "Melquisedeque"
  },
  {
    id: "vt-079",
    referencia: "1jo:5:8",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "três são os que testificam na terra", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "três são os que testificam no céu e na terra", manuscritos: ["Textus Receptus"], classificacao: "fraca" }
    ],
    explicacao: "A divisão entre céu e terra é clara nos manuscritos antigos.",
    versiculosAfetados: ["1jo:5:8"],
    pericope: "A Trindade no Texto"
  },
  {
    id: "vt-080",
    referencia: "ap:13:18",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "666", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "616", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "616 pode refletir diferente sistema de gematria.",
    versiculosAfetados: ["ap:13:18"],
    pericope: "A Besta do Mar"
  },
  {
    id: "vt-081",
    referencia: "mt:26:65",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "rasgou as suas vestes", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "rasgou as suas vestes dizendo blasfêmia", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição pode ser explicativa.",
    versiculosAfetados: ["mt:26:65"],
    pericope: "Jesus Perante o Sinédrio"
  },
  {
    id: "vt-082",
    referencia: "mc:14:63",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "o sumo sacerdote rasgou as suas vestes", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "rasgou as suas vestes e disse blasfêmia", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Mesmo padrão de acréscimo explicativo.",
    versiculosAfetados: ["mc:14:63"],
    pericope: "Jesus Perante o Sinédrio"
  },
  {
    id: "vt-083",
    referencia: "mt:27:51",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "a cortina do templo se rasgou em dois", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "as cortinas do templo se rasgaram", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Singular vs plural da cortina do templo.",
    versiculosAfetados: ["mt:27:51"],
    pericope: "A Morte de Jesus"
  },
  {
    id: "vt-084",
    referencia: "mc:15:38",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "a cortina do templo se rasgou em dois", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "as cortinas do templo se rasgaram", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Mesma variação singular/plural em Marcos.",
    versiculosAfetados: ["mc:15:38"],
    pericope: "A Morte de Jesus"
  },
  {
    id: "vt-085",
    referencia: "jo:19:31",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "era a grande preparação", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "era a preparação do páscoa", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição de 'grande' pode ser explicativa.",
    versiculosAfetados: ["jo:19:31"],
    pericope: "O Sepultamento de Jesus"
  },
  {
    id: "vt-086",
    referencia: "lc:23:53",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "envolveu-o em um lençol", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "envolveu-o em linho", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre lençol e linho.",
    versiculosAfetados: ["lc:23:53"],
    pericope: "O Sepultamento de Jesus"
  },
  {
    id: "vt-087",
    referencia: "at:7:56",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "eis que vejo os céus abertos", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "eis que vejo os céus abertos, e o Filho do Homem", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição pode ser explicativa.",
    versiculosAfetados: ["at:7:56"],
    pericope: "A Visão de Estêvão"
  },
  {
    id: "vt-088",
    referencia: "rm:16:25-27",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "doxologia final incluída", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "doxologia omitida", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A doxologia pode ser adição litúrgica.",
    versiculosAfetados: ["rm:16:25", "rm:16:26", "rm:16:27"],
    pericope: "Doxologia Final"
  },
  {
    id: "vt-089",
    referencia: "jo:21:25",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "versículo incluído", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "versículo omitido", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Pode ser adição para indicar que o evangelho não está completo.",
    versiculosAfetados: ["jo:21:25"],
    pericope: "Epílogo de João"
  },
  {
    id: "vt-090",
    referencia: "jo:5:3a",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "descrição detalhada da multidão", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "descrição mais curta", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Detalhes sobre enfermos foram expandidos.",
    versiculosAfetados: ["jo:5:3"],
    pericope: "A Piscina de Betesda"
  },
  {
    id: "vt-091",
    referencia: "lc:24:12",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "versículo incluído", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "versículo omitido", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Pode ser harmonização com Jo 20:3-10.",
    versiculosAfetados: ["lc:24:12"],
    pericope: "A Ressurreição"
  },
  {
    id: "vt-092",
    referencia: "at:10:19",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "Pedro ainda pensava na visão", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Pedro pensava na visão", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'ainda' pode ser explicativa.",
    versiculosAfetados: ["at:10:19"],
    pericope: "A Visão de Pedro"
  },
  {
    id: "vt-093",
    referencia: "2co:12:2",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "fui arrebatado ao terceiro céu", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "fui arrebatado ao paraíso", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre 'terceiro céu' e 'paraíso'.",
    versiculosAfetados: ["2co:12:2"],
    pericope: "O Paraíso de Paulo"
  },
  {
    id: "vt-094",
    referencia: "hb:10:34",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "vós mesmos também padecestes", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "outros também padeceram", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre pronome 2ª e 3ª pessoa.",
    versiculosAfetados: ["hb:10:34"],
    pericope: "Os Sofrimentos dos Cristãos"
  },
  {
    id: "vt-095",
    referencia: "1jo:3:14",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "passamos da morte para a vida", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "passamos da morte para a vida porque amamos", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição explicativa pode não ser original.",
    versiculosAfetados: ["1jo:3:14"],
    pericope: "O Amor dos Irmãos"
  },
  {
    id: "vt-096",
    referencia: "ap:20:12",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "o livro da vida", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "um livro aberto", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre 'livro da vida' e 'livro aberto'.",
    versiculosAfetados: ["ap:20:12"],
    pericope: "O Julgamento"
  },
  {
    id: "vt-097",
    referencia: "ap:16:5",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "justo és tu, que és e que eras", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "justo és tu, Senhor, que és e que eras", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição de 'Senhor' pode ser litúrgica.",
    versiculosAfetados: ["ap:16:5"],
    pericope: "As Sete Taças"
  },
  {
    id: "vt-098",
    referencia: "mt:27:35",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "dividiram entre si as suas vestes", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "dividiram entre si as suas vestes e lançaram sortes", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição cita Salmo 22:18.",
    versiculosAfetados: ["mt:27:35"],
    pericope: "A Crucificação"
  },
  {
    id: "vt-099",
    referencia: "mc:15:24",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "repartiram entre si as suas vestes", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "lançando sortes", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na descrição da repartição das vestes.",
    versiculosAfetados: ["mc:15:24"],
    pericope: "A Crucificação"
  },
  {
    id: "vt-100",
    referencia: "jo:19:24",
    tipo: "adicao_omissao",
    variantes: [
      { leitura: "lançaram sortes sobre a minha túnica", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "lançaram sortes entre si sobre a minha túnica", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na descrição da partilha das vestes.",
    versiculosAfetados: ["jo:19:24"],
    pericope: "A Crucificação"
  },
  {
    id: "vt-101",
    referencia: "mt:1:25",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "não conheceu até que gerou o primeiro filho", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "não conheceu até que gerou um filho", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Ordem das palavras varia entre manuscritos.",
    versiculosAfetados: ["mt:1:25"],
    pericope: "O Nascimento de Jesus"
  },
  {
    id: "vt-102",
    referencia: "mc:3:16",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "pedro; e Tiago... e João", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "pedro, Tiago e João", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A ordem dos nomes dos doze apóstolos varia.",
    versiculosAfetados: ["mc:3:16"],
    pericope: "Os Doze Apóstolos"
  },
  {
    id: "vt-103",
    referencia: "mc:6:3",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "José, irmão de Tiago, e Judas e Simão?", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "José e Tiago e Judas e Simão?", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A ordem dos irmãos de Jesus varia.",
    versiculosAfetados: ["mc:6:3"],
    pericope: "Rejeição em Nazaré"
  },
  {
    id: "vt-104",
    referencia: "mc:9:38",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "um que não nos segue", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "um em teu nome", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Ordem das frases prepositivas invertida.",
    versiculosAfetados: ["mc:9:38"],
    pericope: "O Exorcista Não Seguidor"
  },
  {
    id: "vt-105",
    referencia: "lc:2:42",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "aos doze anos", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "com doze anos", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na preposição que indica idade.",
    versiculosAfetados: ["lc:2:42"],
    pericope: "Jesus no Templo"
  },
  {
    id: "vt-106",
    referencia: "jo:1:18",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "o unigênito Deus que está no seio do Pai", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o unigênito Filho que está no seio do Pai", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Ordem das palavras varia.",
    versiculosAfetados: ["jo:1:18"],
    pericope: "O Verbo Encarnado"
  },
  {
    id: "vt-107",
    referencia: "jo:3:13",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "o Filho do Homem que está nos céus", manuscritos: ["Sinaitico (01)", "Alexandrino (02)"], classificacao: "forte" },
      { leitura: "o Filho do Homem que desceu do céu", manuscritos: ["Manuscritos posteriores"], classificacao: "moderada" }
    ],
    explicacao: "Ordem das preposições varia.",
    versiculosAfetados: ["jo:3:13"],
    pericope: "O Filho do Homem"
  },
  {
    id: "vt-108",
    referencia: "jo:17:5",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "glorifica-me tu, Pai", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Pai, glorifica-me", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A inversão enfatiza o pedido.",
    versiculosAfetados: ["jo:17:5"],
    pericope: "A Grande Oração Sacerdotal"
  },
  {
    id: "vt-109",
    referencia: "rm:5:1",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "temos paz com Deus pela fé", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "paz temos com Deus pela fé", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A inversión enfatiza o estado de paz.",
    versiculosAfetados: ["rm:5:1"],
    pericope: "Justificação"
  },
  {
    id: "vt-110",
    referencia: "rm:8:28",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "todas as coisas cooperam para o bem", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "todas as coisas juntas cooperam", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na preposição de associação.",
    versiculosAfetados: ["rm:8:28"],
    pericope: "Todas as Coisas Cooperam"
  },
  {
    id: "vt-111",
    referencia: "1co:1:30",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "sabedoria, justiça, santificação e redenção", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "justiça, santificação e redenção", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A lista pode omitir 'sabedoria'.",
    versiculosAfetados: ["1co:1:30"],
    pericope: "Cristo é a Nossa Sabedoria"
  },
  {
    id: "vt-112",
    referencia: "2co:4:6",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "Deus, que disse que das trevas brilhasse a luz", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Deus, que dos céus brilhou em nossos corações", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Ordem das frases varia.",
    versiculosAfetados: ["2co:4:6"],
    pericope: "O Tesouro em Vasos de Barro"
  },
  {
    id: "vt-113",
    referencia: "gl:2:20",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "Cristo vive em mim", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "ele vive em mim", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na forma de referir a Cristo.",
    versiculosAfetados: ["gl:2:20"],
    pericope: "Vivo pela Fé"
  },
  {
    id: "vt-114",
    referencia: "ef:1:6",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "para louvor da glória da sua graça", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "para louvor da sua graça gloriosa", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Ordem dos adjetivos varia.",
    versiculosAfetados: ["ef:1:6"],
    pericope: "As Bênçãos Espirituais"
  },
  {
    id: "vt-115",
    referencia: "cl:1:16",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "foram criadas por ele e para ele", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "nele foram criadas e para ele", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação: 'por' vs 'nele'.",
    versiculosAfetados: ["cl:1:16"],
    pericope: "A Supremacia de Cristo"
  },
  {
    id: "vt-116",
    referencia: "hb:1:2",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "pelo qual fez também os séculos", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "pelo qual fez os mundos", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre αἰῶνας e κόσμους.",
    versiculosAfetados: ["hb:1:2"],
    pericope: "O Filho de Deus"
  },
  {
    id: "vt-117",
    referencia: "1jo:4:1",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "muitos falsos profetas", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "falsos profetas muitos", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Ordem entre adjetivo e substantivo varia.",
    versiculosAfetados: ["1jo:4:1"],
    pericope: "O Espírito da Mentira"
  },
  {
    id: "vt-118",
    referencia: "ap:1:5",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "Jesus Cristo, a testemunha fiel", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Jesus Cristo, a primeira testemunha", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre fiel e primeira.",
    versiculosAfetados: ["ap:1:5"],
    pericope: "Saudação Apocalíptica"
  },
  {
    id: "vt-119",
    referencia: "mt:11:25",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "Senhor do céu e da terra", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Pai do céu e da terra", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre Senhor e Pai.",
    versiculosAfetados: ["mt:11:25"],
    pericope: "A Oração de Jesus"
  },
  {
    id: "vt-120",
    referencia: "mc:1:1",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "Início do evangelho de Jesus Cristo, Filho de Deus", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Início do evangelho de Jesus Cristo", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Ordem das palavras varia significativamente.",
    versiculosAfetados: ["mc:1:1"],
    pericope: "O Início do Evangelho"
  },
  {
    id: "vt-121",
    referencia: "lc:1:46-47",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "minha alma glorifica ao Senhor e meu espírito se alegra", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "meu espírito glorifica e minha alma se alegra", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A ordem de alma/espírito varia no Magnificat.",
    versiculosAfetados: ["lc:1:46", "lc:1:47"],
    pericope: "O Magnificat"
  },
  {
    id: "vt-122",
    referencia: "jo:15:2",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "todo ramo que nele não der fruto ele tira", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "todo ramo que não der fruto ele tira", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A preposição 'nele' pode ser adição explicativa.",
    versiculosAfetados: ["jo:15:2"],
    pericope: "A Videira Verdadeira"
  },
  {
    id: "vt-123",
    referencia: "rm:3:25",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "pela fé no seu sangue", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "pela fé do seu sangue", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na preposição entre fé e sangue.",
    versiculosAfetados: ["rm:3:25"],
    pericope: "A Justificação pela Fé"
  },
  {
    id: "vt-124",
    referencia: "1co:8:6",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "um Deus, o Pai, de quem são todas as coisas", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "um Deus, o Pai, do qual são todas as coisas", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre preposições gregas.",
    versiculosAfetados: ["1co:8:6"],
    pericope: "Idolatria e Caridade"
  },
  {
    id: "vt-125",
    referencia: "hb:13:20",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "o Deus da paz", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o Deus de paz", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na preposição possessiva.",
    versiculosAfetados: ["hb:13:20"],
    pericope: "Bênção Final"
  },
  {
    id: "vt-126",
    referencia: "mt:25:1",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "então o reino dos céus será semelhante", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o reino dos céus é semelhante", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre tempo verbal futuro vs presente.",
    versiculosAfetados: ["mt:25:1"],
    pericope: "As Dez Virgens"
  },
  {
    id: "vt-127",
    referencia: "mc:10:45",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "dar a sua vida em resgate por muitos", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "dar a sua vida por muitos em resgate", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Ordem das frases prepositivas invertida.",
    versiculosAfetados: ["mc:10:45"],
    pericope: "O Filho do Homem"
  },
  {
    id: "vt-128",
    referencia: "jo:6:47",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "quem crê tem a vida eterna", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "quem crê em mim tem a vida eterna", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'em mim' pode ser harmonização.",
    versiculosAfetados: ["jo:6:47"],
    pericope: "O Pão da Vida"
  },
  {
    id: "vt-129",
    referencia: "2co:12:9",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "minha graça te basta", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "a graça te basta", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição do pronome 'minha' personaliza.",
    versiculosAfetados: ["2co:12:9"],
    pericope: "A Graça Suficiente"
  },
  {
    id: "vt-130",
    referencia: "1jo:2:2",
    tipo: "ordem_palavras",
    variantes: [
      { leitura: "e não somente pelos nossos, mas também pelos de todo o mundo", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "e não somente pelos nossos pecados, mas pelos de todo o mundo", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição de 'pecados' pode ser explicativa.",
    versiculosAfetados: ["1jo:2:2"],
    pericope: "O Advogado dos Nossos Pecados"
  },
  {
    id: "vt-131",
    referencia: "mt:1:21",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "ele salvará o seu povo dos seus pecados", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "ele salvará o seu povo", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'dos seus pecados' pode ser explicativa.",
    versiculosAfetados: ["mt:1:21"],
    pericope: "O Nascimento de Jesus"
  },
  {
    id: "vt-132",
    referencia: "mc:2:17",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "não vieram chamar justos, mas pecadores", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "não vim chamar justos, mas pecadores", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre 3ª pessoa (eles) e 1ª pessoa (eu).",
    versiculosAfetados: ["mc:2:17"],
    pericope: "Jesus Come com Pecadores"
  },
  {
    id: "vt-133",
    referencia: "lc:7:31",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "a quem se assemelham os homens desta geração", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "a quem se assemelham os homens da geração", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Ordem das palavras varia.",
    versiculosAfetados: ["lc:7:31"],
    pericope: "Duas Parábolas"
  },
  {
    id: "vt-134",
    referencia: "jo:1:14",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "vemos a sua glória", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "vimos a sua glória", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre 1ª pessoa do plural.",
    versiculosAfetados: ["jo:1:14"],
    pericope: "O Verbo Encarnado"
  },
  {
    id: "vt-135",
    referencia: "jo:10:30",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "eu e o Pai somos um", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "eu e o Pai um somos", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Ordem da cópula varia.",
    versiculosAfetados: ["jo:10:30"],
    pericope: "A Unidade com o Pai"
  },
  {
    id: "vt-136",
    referencia: "at:16:31",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "crê no Senhor Jesus e serás salvo", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "crê no Senhor Jesus Cristo e serás salvo", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição de 'Cristo' é explicativa.",
    versiculosAfetados: ["at:16:31"],
    pericope: "A Salvação da Família"
  },
  {
    id: "vt-137",
    referencia: "rm:3:28",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "o homem é justificado pela fé sem as obras", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o homem é justificado pela fé", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'sem as obras' pode ser explicativa.",
    versiculosAfetados: ["rm:3:28"],
    pericope: "Justificação pela Fé"
  },
  {
    id: "vt-138",
    referencia: "1co:11:24",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "isto é o meu corpo, que é partido por vós", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "isto é o meu corpo que é partido por vós", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A vírgula pode indicar interpretação.",
    versiculosAfetados: ["1co:11:24"],
    pericope: "A Ceia do Senhor"
  },
  {
    id: "vt-139",
    referencia: "2co:5:17",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "se alguém está em Cristo, nova criatura é", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "se alguém está em Cristo, é nova criatura", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Ordem das palavras varia.",
    versiculosAfetados: ["2co:5:17"],
    pericope: "Novas Criaturas"
  },
  {
    id: "vt-140",
    referencia: "gl:2:20",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "Cristo vive em mim", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "ele vive em mim", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na forma de referir a Cristo.",
    versiculosAfetados: ["gl:2:20"],
    pericope: "Vivo pela Fé"
  },
  {
    id: "vt-141",
    referencia: "cl:3:13",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "assim como Cristo vos perdoou", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "assim como o Senhor vos perdoou", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre Cristo e o Senhor.",
    versiculosAfetados: ["cl:3:13"],
    pericope: "A Vida Nova"
  },
  {
    id: "vt-142",
    referencia: "1ts:5:23",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "o Deus de paz vos sanctifique", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o Deus de paz vos santifique", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na grafia de santificar.",
    versiculosAfetados: ["1ts:5:23"],
    pericope: "Oração Final"
  },
  {
    id: "vt-143",
    referencia: "2ts:3:3",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "o Senhor é fiel", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o Senhor vos firme", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação significativa entre fiel e firme.",
    versiculosAfetados: ["2ts:3:3"],
    pericope: "Exortação Final"
  },
  {
    id: "vt-144",
    referencia: "1tm:6:10",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "a raiz de todos os males", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "a raiz de todos os males é a avareza", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'é a avareza' pode ser explicativa.",
    versiculosAfetados: ["1tm:6:10"],
    pericope: "O Amor ao Dinheiro"
  },
  {
    id: "vt-145",
    referencia: "2tm:2:12",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "se sofrermos, também reinaremos", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "se padecermos, também reinaremos", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre sofrer e padecer.",
    versiculosAfetados: ["2tm:2:12"],
    pericope: "Exortações Finais"
  },
  {
    id: "vt-146",
    referencia: "hb:4:12",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "a palavra de Deus é viva e eficaz", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "a palavra de Deus é viva e operante", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre eficaz e operante.",
    versiculosAfetados: ["hb:4:12"],
    pericope: "A Palavra de Deus"
  },
  {
    id: "vt-147",
    referencia: "1jo:4:8",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "Deus é amor", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Deus é o amor", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Artigo definido varia.",
    versiculosAfetados: ["1jo:4:8"],
    pericope: "O Amor de Deus"
  },
  {
    id: "vt-148",
    referencia: "ap:1:8",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "Eu sou o Alfa e o Ômega, o princípio e o fim", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Eu sou o Alfa e o Ômega, diz o Senhor Deus", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A identidade do falante é controversa.",
    versiculosAfetados: ["ap:1:8"],
    pericope: "Apresentação de Jesus"
  },
  {
    id: "vt-149",
    referencia: "mt:28:19",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "batizando-os em nome do Pai, do Filho e do Espírito Santo", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "batizando-os em nome do Pai e do Filho e do Espírito Santo", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Conjunção varia entre manuscritos.",
    versiculosAfetados: ["mt:28:19"],
    pericope: "A Grande Comissão"
  },
  {
    id: "vt-150",
    referencia: "jo:3:16",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "deu o seu Filho unigênito", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "deu o seu Filho", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição de 'unigênito' pode ser explicativa.",
    versiculosAfetados: ["jo:3:16"],
    pericope: "O Amor de Deus"
  },
  {
    id: "vt-151",
    referencia: "jo:1:12",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "deu-lhes o poder de serem feitos filhos de Deus", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "deu-lhes o direito de serem filhos de Deus", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre poder e direito.",
    versiculosAfetados: ["jo:1:12"],
    pericope: "Filhos de Deus"
  },
  {
    id: "vt-152",
    referencia: "rm:5:8",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "Cristo morreu por nós sendo nós ainda pecadores", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Cristo morreu por nós quando éramos ainda pecadores", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na partícula temporal.",
    versiculosAfetados: ["rm:5:8"],
    pericope: "Amor de Deus"
  },
  {
    id: "vt-153",
    referencia: "1co:15:4",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "ressuscitou ao terceiro dia", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "foi ressuscitado ao terceiro dia", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre voz ativa e passiva.",
    versiculosAfetados: ["1co:15:4"],
    pericope: "A Ressurreição de Cristo"
  },
  {
    id: "vt-154",
    referencia: "2co:12:9",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "a minha graça te basta", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "a graça te basta", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição do pronome possessivo personaliza.",
    versiculosAfetados: ["2co:12:9"],
    pericope: "A Graça Suficiente"
  },
  {
    id: "vt-155",
    referencia: "ef:2:8",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "pela graça sois salvos, por meio da fé", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "sois salvos pela graça por meio da fé", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Ordem de graça e fé varia.",
    versiculosAfetados: ["ef:2:8"],
    pericope: "Salvos pela Graça"
  },
  {
    id: "vt-156",
    referencia: "fl:4:13",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "Posso todas as coisas naquele que me fortalece", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Tudo posso naquele que me fortalece", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre todas as coisas e tudo.",
    versiculosAfetados: ["fl:4:13"],
    pericope: "A Fonte da Força"
  },
  {
    id: "vt-157",
    referencia: "cl:1:14",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "em quem temos a redenção pelo seu sangue", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "em quem temos a redenção, o perdão dos pecados", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação significativa na redenção.",
    versiculosAfetados: ["cl:1:14"],
    pericope: "A Supremacia de Cristo"
  },
  {
    id: "vt-158",
    referencia: "1ts:1:10",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "esperamos do céu o seu Filho", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "esperamos do céu o seu Filho Jesus", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição de 'Jesus' é explicativa.",
    versiculosAfetados: ["1ts:1:10"],
    pericope: "A Vida dos Tessalonicenses"
  },
  {
    id: "vt-159",
    referencia: "1tm:3:16",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "Deus se manifestou em carne", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o mistério da piedade se manifestou em carne", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação significativa: Deus vs mistério da piedade.",
    versiculosAfetados: ["1tm:3:16"],
    pericope: "O Mistério da Piedade"
  },
  {
    id: "vt-160",
    referencia: "hb:12:2",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "olhando para Jesus, autor e consumador da fé", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "olhando para Jesus, o autor e consumador da fé", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Artigo definido varia.",
    versiculosAfetados: ["hb:12:2"],
    pericope: "A Corrida da Fé"
  },
  {
    id: "vt-161",
    referencia: "mt:19:17",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "por que me chamas bom?", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "por que me chamas bom?", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na forma do verbo.",
    versiculosAfetados: ["mt:19:17"],
    pericope: "Os Mandamentos"
  },
  {
    id: "vt-162",
    referencia: "mc:8:35",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "quem quiser salvar a sua vida perdê-la-á", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "quem quiser salvar a sua vida perdê-la-á, mas quem perder a sua vida por mim e pelo evangelho salvá-la-á", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A segunda parte pode ser harmonização.",
    versiculosAfetados: ["mc:8:35"],
    pericope: "A Cruz e a Vida"
  },
  {
    id: "vt-163",
    referencia: "jo:8:32",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "conhecereis a verdade e a verdade vos libertará", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "conhecereis a verdade e a verdade vos libertará", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Mesmo texto com pequenas variações ortográficas.",
    versiculosAfetados: ["jo:8:32"],
    pericope: "A Verdade Liberta"
  },
  {
    id: "vt-164",
    referencia: "at:2:38",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "arrependei-vos e cada um de vós seja batizado", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "arrependei-vos, e cada um de vós seja batizado", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Pontuação varia entre manuscritos.",
    versiculosAfetados: ["at:2:38"],
    pericope: "O Pentecostes"
  },
  {
    id: "vt-165",
    referencia: "rm:6:23",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "o salário do pecado é a morte, mas o dom de Deus é a vida eterna", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o salário do pecado é a morte, mas o dom de Deus é a vida eterna em Cristo Jesus", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'em Cristo Jesus' pode ser explicativa.",
    versiculosAfetados: ["rm:6:23"],
    pericope: "Morte e Vida"
  },
  {
    id: "vt-166",
    referencia: "1co:13:13",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "agora permanecem a fé, a esperança e o amor", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "agora permanecem fé, esperança e amor", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Artigos definidos varia.",
    versiculosAfetados: ["1co:13:13"],
    pericope: "A Caridade"
  },
  {
    id: "vt-167",
    referencia: "gl:5:22",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "o fruto do Espírito é o amor", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o fruto do Espírito é amor", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Artigo definido varia.",
    versiculosAfetados: ["gl:5:22"],
    pericope: "O Fruto do Espírito"
  },
  {
    id: "vt-168",
    referencia: "hp:13:8",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "Jesus Cristo é o mesmo ontem e hoje e sempre", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Jesus Cristo, o mesmo ontem e hoje e sempre", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na estrutura da frase.",
    versiculosAfetados: ["hp:13:8"],
    pericope: "A Imutabilidade de Cristo"
  },
  {
    id: "vt-169",
    referencia: "1jo:5:7",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "três são os que testificam", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "três são os que testificam: o Espírito, e a água, e o sangue", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição pode ser explicativa.",
    versiculosAfetados: ["1jo:5:7"],
    pericope: "Os Três Testemunhos"
  },
  {
    id: "vt-170",
    referencia: "ap:22:20",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "Sim, venha depressa, Senhor Jesus", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Amém, vem, Senhor Jesus", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na exclamação final.",
    versiculosAfetados: ["ap:22:20"],
    pericope: "A Oração Final"
  },
  {
    id: "vt-171",
    referencia: "mt:27:49b",
    tipo: "teologica",
    variantes: [
      { leitura: "e lançando água e sangue", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "e um dos soldados traspassou o seu lado", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A menção de água e sangue teve significado cristológico.",
    versiculosAfetados: ["mt:27:49"],
    pericope: "A Morte de Jesus"
  },
  {
    id: "vt-172",
    referencia: "jo:1:34",
    tipo: "teologica",
    variantes: [
      { leitura: "o Filho de Deus", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o Eleito de Deus", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação cristológica significativa.",
    versiculosAfetados: ["jo:1:34"],
    pericope: "O Testemunho de João"
  },
  {
    id: "vt-173",
    referencia: "rm:9:5",
    tipo: "teologica",
    variantes: [
      { leitura: "Deus sobre todas as coisas seja para sempre louvado", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "que é Deus sobre todas as coisas", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Pontuação muda significado: louvor a Cristo vs. louvor a Deus.",
    versiculosAfetados: ["rm:9:5"],
    pericope: "O Lamento de Paulo"
  },
  {
    id: "vt-174",
    referencia: "1co:8:6",
    tipo: "teologica",
    variantes: [
      { leitura: "um só Deus, o Pai, de quem são todas as coisas", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "um só Deus, o Pai, do qual são todas as coisas", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na preposição: de vs. do qual.",
    versiculosAfetados: ["1co:8:6"],
    pericope: "Idolatria e Caridade"
  },
  {
    id: "vt-175",
    referencia: "fl:2:6",
    tipo: "teologica",
    variantes: [
      { leitura: "não teve por usurpação ser igual a Deus", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "não considerou roubo ser igual a Deus", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na tradução de harpagmos.",
    versiculosAfetados: ["fl:2:6"],
    pericope: "A Humilhação de Cristo"
  },
  {
    id: "vt-176",
    referencia: "cl:1:14",
    tipo: "teologica",
    variantes: [
      { leitura: "em quem temos a redenção pelo seu sangue", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "em quem temos a redenção, o perdão dos pecados", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'o perdão dos pecados' pode ser explicativa.",
    versiculosAfetados: ["cl:1:14"],
    pericope: "A Supremacia de Cristo"
  },
  {
    id: "vt-177",
    referencia: "1tm:3:16",
    tipo: "teologica",
    variantes: [
      { leitura: "Deus se manifestou em carne", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o mistério da piedade se manifestou em carne", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação significativa: Deus vs mistério.",
    versiculosAfetados: ["1tm:3:16"],
    pericope: "O Mistério da Piedade"
  },
  {
    id: "vt-178",
    referencia: "hb:1:8",
    tipo: "teologica",
    variantes: [
      { leitura: "o teu trono, ó Deus, é para todo sempre", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o teu trono, ó Deus, para todo sempre é um ceptro de retidão", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Pontuação muda significado cristológico.",
    versiculosAfetados: ["hb:1:8"],
    pericope: "O Filho de Deus"
  },
  {
    id: "vt-179",
    referencia: "1jo:5:20",
    tipo: "teologica",
    variantes: [
      { leitura: "este é o verdadeiro Deus e a vida eterna", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "este é o verdadeiro Deus", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Referência a Cristo ou a Deus Pai.",
    versiculosAfetados: ["1jo:5:20"],
    pericope: "A Vitória sobre os Ídolos"
  },
  {
    id: "vt-180",
    referencia: "ap:1:17",
    tipo: "teologica",
    variantes: [
      { leitura: "o primeiro e o último", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "eu sou o primeiro e o último", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição de 'eu sou' enfatiza identidade divina.",
    versiculosAfetados: ["ap:1:17"],
    pericope: "A Visão de João"
  },
  {
    id: "vt-181",
    referencia: "mt:1:16",
    tipo: "teologica",
    variantes: [
      { leitura: "Jacó gerou a José, marido de Maria", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Jacó gerou a José, a quem Maria foi desposada", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na genealogia de Jesus.",
    versiculosAfetados: ["mt:1:16"],
    pericope: "A Genealogia de Jesus"
  },
  {
    id: "vt-182",
    referencia: "mc:1:1",
    tipo: "teologica",
    variantes: [
      { leitura: "Início do evangelho de Jesus Cristo, Filho de Deus", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Início do evangelho de Jesus Cristo", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'Filho de Deus' é cristológica.",
    versiculosAfetados: ["mc:1:1"],
    pericope: "O Início do Evangelho"
  },
  {
    id: "vt-183",
    referencia: "lc:1:35",
    tipo: "teologica",
    variantes: [
      { leitura: "o poder do Altíssimo te cobrirá com a sua sombra", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o poder do Altíssimo te cobrirá", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição de 'com a sua sombra' é explicativa.",
    versiculosAfetados: ["lc:1:35"],
    pericope: "A Anunciação"
  },
  {
    id: "vt-184",
    referencia: "jo:1:1",
    tipo: "teologica",
    variantes: [
      { leitura: "o Verbo era Deus", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Deus era o Verbo", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Ordem enfatiza natureza divina do Logos.",
    versiculosAfetados: ["jo:1:1"],
    pericope: "O Verbo É Deus"
  },
  {
    id: "vt-185",
    referencia: "jo:1:14",
    tipo: "teologica",
    variantes: [
      { leitura: "vemos a sua glória", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "vimos a sua glória", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação no tempo verbal.",
    versiculosAfetados: ["jo:1:14"],
    pericope: "O Verbo Encarnado"
  },
  {
    id: "vt-186",
    referencia: "at:20:28",
    tipo: "teologica",
    variantes: [
      { leitura: "a igreja de Deus, que ele comprou com o seu próprio sangue", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "a igreja de Deus, que ele comprou com o sangue do seu Filho", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação cristológica significativa.",
    versiculosAfetados: ["at:20:28"],
    pericope: "A Igreja de Deus"
  },
  {
    id: "vt-187",
    referencia: "rm:1:3",
    tipo: "teologica",
    variantes: [
      { leitura: "nascido da semente de Davi segundo a carne", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "declarado Filho de Deus segundo o Espírito", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na formulação cristológica.",
    versiculosAfetados: ["rm:1:3"],
    pericope: "O Evangelho de Deus"
  },
  {
    id: "vt-188",
    referencia: "1co:15:3",
    tipo: "teologica",
    variantes: [
      { leitura: "Cristo morreu pelos nossos pecados segundo as Escrituras", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Cristo morreu por nossos pecados", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'segundo as Escrituras' é formulação catequética.",
    versiculosAfetados: ["1co:15:3"],
    pericope: "A Ressurreição de Cristo"
  },
  {
    id: "vt-189",
    referencia: "gl:4:7",
    tipo: "teologica",
    variantes: [
      { leitura: "não és mais servo, mas filho; e se és filho, também herdeiro", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "não és mais servo, mas filho; e se és filho, também herdeiro de Deus por Cristo", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'por Cristo' é explicativa.",
    versiculosAfetados: ["gl:4:7"],
    pericope: "Filhos e Herdeiros"
  },
  {
    id: "vt-190",
    referencia: "ef:1:7",
    tipo: "teologica",
    variantes: [
      { leitura: "em quem temos a redenção pelo seu sangue", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "em quem temos a redenção pelo seu sangue, o perdão dos pecados", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição explica o que é a redenção.",
    versiculosAfetados: ["ef:1:7"],
    pericope: "As Bênçãos Espirituais"
  },
  {
    id: "vt-191",
    referencia: "cl:1:20",
    tipo: "teologica",
    variantes: [
      { leitura: "pelo sangue da sua cruz", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "pela paz do sangue da sua cruz", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição de 'pela paz' é explicativa.",
    versiculosAfetados: ["cl:1:20"],
    pericope: "A Paz pela Cruz"
  },
  {
    id: "vt-192",
    referencia: "2co:5:19",
    tipo: "teologica",
    variantes: [
      { leitura: "Deus estava em Cristo reconciliando o mundo consigo mesmo", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Deus estava em Cristo reconciliando o mundo consigo mesmo, não imputando aos homens os seus pecados", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição pode ser formulação catequética.",
    versiculosAfetados: ["2co:5:19"],
    pericope: "Reconciliação"
  },
  {
    id: "vt-193",
    referencia: "fl:2:11",
    tipo: "teologica",
    variantes: [
      { leitura: "Jesus Cristo é Senhor, para glória de Deus Pai", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Jesus Cristo é Senhor", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A doxologia pode ser adição litúrgica.",
    versiculosAfetados: ["fl:2:11"],
    pericope: "Exortação à Humildade"
  },
  {
    id: "vt-194",
    referencia: "1tm:3:16",
    tipo: "teologica",
    variantes: [
      { leitura: "Deus se manifestou em carne", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o mistério da piedade se manifestou em carne", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação cristológica significativa.",
    versiculosAfetados: ["1tm:3:16"],
    pericope: "O Mistério da Piedade"
  },
  {
    id: "vt-195",
    referencia: "hb:1:3",
    tipo: "teologica",
    variantes: [
      { leitura: "sustentando todas as coisas pela palavra do seu poder", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "sustentando todas as coisas pela palavra do seu poder, fazendo a purificação dos pecados", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição pode ser formulação catequética.",
    versiculosAfetados: ["hb:1:3"],
    pericope: "O Filho de Deus"
  },
  {
    id: "vt-196",
    referencia: "1jo:3:8",
    tipo: "teologica",
    variantes: [
      { leitura: "para destruir as obras do diabo", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "para destruir as obras do diabo", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação ortográfica.",
    versiculosAfetados: ["1jo:3:8"],
    pericope: "O Filho de Deus"
  },
  {
    id: "vt-197",
    referencia: "1jo:4:2",
    tipo: "teologica",
    variantes: [
      { leitura: "todo espírito que confessa que Jesus Cristo veio em carne", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "todo espírito que confessa que Jesus Cristo veio em carne é de Deus", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'é de Deus' pode ser explicativa.",
    versiculosAfetados: ["1jo:4:2"],
    pericope: "O Espírito da Verdade"
  },
  {
    id: "vt-198",
    referencia: "ap:1:5",
    tipo: "teologica",
    variantes: [
      { leitura: "Jesus Cristo, a testemunha fiel", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Jesus Cristo, a primeira testemunha dos mortos", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre fiel e primeira testemunha.",
    versiculosAfetados: ["ap:1:5"],
    pericope: "Saudação Apocalíptica"
  },
  {
    id: "vt-199",
    referencia: "ap:5:6",
    tipo: "teologica",
    variantes: [
      { leitura: "um Cordeiro como tendo sido morto", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "um Cordeiro em pé como tendo sido morto", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na descrição do Cordeiro.",
    versiculosAfetados: ["ap:5:6"],
    pericope: "O Cordeiro e o Livro"
  },
  {
    id: "vt-200",
    referencia: "ap:19:13",
    tipo: "teologica",
    variantes: [
      { leitura: "e o seu nome é a Palavra de Deus", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "e o seu nome é chamado a Palavra de Deus", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre é e é chamado.",
    versiculosAfetados: ["ap:19:13"],
    pericope: "O Exército Celeste"
  },
  {
    id: "vt-201",
    referencia: "mt:16:28",
    tipo: "relato",
    variantes: [
      { leitura: "há alguns aqui presentes que não provarão a morte", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "há alguns aqui que não provarão a morte", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Referência à Transfiguração ou Parousia.",
    versiculosAfetados: ["mt:16:28"],
    pericope: "A Transfiguração"
  },
  {
    id: "vt-202",
    referencia: "mc:16:1-8",
    tipo: "relato",
    variantes: [
      { leitura: "terminou com medo", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "terminou com alegria", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "O original pode ter terminado com medo.",
    versiculosAfetados: ["mc:16:1", "mc:16:8"],
    pericope: "A Ressurreição"
  },
  {
    id: "vt-203",
    referencia: "lc:22:43-44",
    tipo: "relato",
    variantes: [
      { leitura: "versículos incluídos", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "versículos omitidos", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A suor de sangue pode ser harmonização com Hebreus.",
    versiculosAfetados: ["lc:22:43", "lc:22:44"],
    pericope: "A Oração no Getsêmani"
  },
  {
    id: "vt-204",
    referencia: "mc:1:2",
    tipo: "relato",
    variantes: [
      { leitura: "nos profetas", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "em Isaías, o profeta", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Isaías é mencionado especificamente, mas a citação combina Mal 3:1 e Is 40:3.",
    versiculosAfetados: ["mc:1:2"],
    pericope: "O Mensageiro do Senhor"
  },
  {
    id: "vt-205",
    referencia: "mc:2:26",
    tipo: "relato",
    variantes: [
      { leitura: "Abiatar, sumo sacerdote", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Abiatar, pai de Ahimeleque", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Erro factual: Abiatar era filho de Ahimeleque.",
    versiculosAfetados: ["mc:2:26"],
    pericope: "Os Discípulos Colhem Espigas"
  },
  {
    id: "vt-206",
    referencia: "mc:6:8",
    tipo: "relato",
    variantes: [
      { leitura: "apenas um bastão", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "nada além de um bastão", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na restrição.",
    versiculosAfetados: ["mc:6:8"],
    pericope: "Os Doze Apóstolos"
  },
  {
    id: "vt-207",
    referencia: "mc:10:46",
    tipo: "relato",
    variantes: [
      { leitura: "Bartimeu, filho de Timeu", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Bartimeu, filho de Timeu, um mendigo cego", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'um mendigo cego' é explicativa.",
    versiculosAfetados: ["mc:10:46"],
    pericope: "Bartimeu"
  },
  {
    id: "vt-208",
    referencia: "lc:3:22",
    tipo: "relato",
    variantes: [
      { leitura: "este é o meu Filho amado em quem me agrado", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "tu és o meu Filho amado em quem me agrado", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre 3ª e 2ª pessoa na voz do céu.",
    versiculosAfetados: ["lc:3:22"],
    pericope: "O Batismo de Jesus"
  },
  {
    id: "vt-209",
    referencia: "lc:4:44",
    tipo: "relato",
    variantes: [
      { leitura: "ele ensinava nas sinagogas da Judeia", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "ele ensinava nas sinagogas da Galileia", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação geográfica: Judeia vs Galileia.",
    versiculosAfetados: ["lc:4:44"],
    pericope: "Jesus Expulsa Demônios"
  },
  {
    id: "vt-210",
    referencia: "jo:1:18",
    tipo: "relato",
    variantes: [
      { leitura: "o unigênito Deus que está no seio do Pai", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o unigênito Filho que está no seio do Pai", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação cristológica significativa.",
    versiculosAfetados: ["jo:1:18"],
    pericope: "O Verbo Encarnado"
  },
  {
    id: "vt-211",
    referencia: "jo:5:1",
    tipo: "relato",
    variantes: [
      { leitura: "havia uma festa dos judeus", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "havia uma festa dos judeus e Jesus subiu a Jerusalém", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'e Jesus subiu a Jerusalém' é explicativa.",
    versiculosAfetados: ["jo:5:1"],
    pericope: "A Piscina de Betesda"
  },
  {
    id: "vt-212",
    referencia: "at:19:19",
    tipo: "relato",
    variantes: [
      { leitura: "cinquenta mil pratas de prata", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "cinco mil pratas de prata", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação numérica significativa.",
    versiculosAfetados: ["at:19:19"],
    pericope: "O Tumulto em Éfeso"
  },
  {
    id: "vt-213",
    referencia: "rm:5:1",
    tipo: "relato",
    variantes: [
      { leitura: "temos paz com Deus pela nossa fé", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "temos paz com Deus pela fé", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição de 'nossa' é explicativa.",
    versiculosAfetados: ["rm:5:1"],
    pericope: "Justificação"
  },
  {
    id: "vt-214",
    referencia: "1co:11:24",
    tipo: "relato",
    variantes: [
      { leitura: "isto é o meu corpo, que é partido por vós", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "isto é o meu corpo que é partido por vós; fazei isto em memória de mim", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição da instrução é explicativa.",
    versiculosAfetados: ["1co:11:24"],
    pericope: "A Ceia do Senhor"
  },
  {
    id: "vt-215",
    referencia: "2co:8:19",
    tipo: "relato",
    variantes: [
      { leitura: "não só conosco, mas também", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "não só conosco, mas também pelos irmãos", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'pelos irmãos' é explicativa.",
    versiculosAfetados: ["2co:8:19"],
    pericope: "A Oferta para os Santos"
  },
  {
    id: "vt-216",
    referencia: "gl:1:6",
    tipo: "relato",
    variantes: [
      { leitura: "outro evangelho", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "um evangelho diferente", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na descrição do falso evangelho.",
    versiculosAfetados: ["gl:1:6"],
    pericope: "Outro Evangelho"
  },
  {
    id: "vt-217",
    referencia: "hp:2:9",
    tipo: "relato",
    variantes: [
      { leitura: "ele se humilhou a si mesmo", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "ele se humilhou, tomando a forma de servo", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição da forma de servo é explicativa.",
    versiculosAfetados: ["hp:2:9"],
    pericope: "A Humilhação de Cristo"
  },
  {
    id: "vt-218",
    referencia: "cl:1:14",
    tipo: "relato",
    variantes: [
      { leitura: "em quem temos a redenção pelo seu sangue", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "em quem temos a redenção, o perdão dos pecados", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'o perdão dos pecados' é explicativa.",
    versiculosAfetados: ["cl:1:14"],
    pericope: "A Supremacia de Cristo"
  },
  {
    id: "vt-219",
    referencia: "1ts:2:19",
    tipo: "relato",
    variantes: [
      { leitura: "diante do Senhor Jesus na sua vinda", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "diante do Senhor Jesus", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'na sua vinda' é explicativa.",
    versiculosAfetados: ["1ts:2:19"],
    pericope: "A Nossa Alegria"
  },
  {
    id: "vt-220",
    referencia: "2ts:3:6",
    tipo: "relato",
    variantes: [
      { leitura: "não segundo a tradição que de nós receberam", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "não segundo a tradição que receberam", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'de nós' é explicativa.",
    versiculosAfetados: ["2ts:3:6"],
    pericope: "Exortação à Ordem"
  },
  {
    id: "vt-221",
    referencia: "1tm:6:5",
    tipo: "relato",
    variantes: [
      { leitura: "perversas contendas de homens de entendimento corrompido", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "perversas contendas de homens de entendimento corrupto e privados da verdade", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição explica o estado desses homens.",
    versiculosAfetados: ["1tm:6:5"],
    pericope: "O Amor ao Dinheiro"
  },
  {
    id: "vt-222",
    referencia: "2tm:2:18",
    tipo: "relato",
    variantes: [
      { leitura: "dizendo que a ressurreição já se deu", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "dizendo que a ressurreição já se deu e destroem a fé de alguns", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição explica o efeito da heresia.",
    versiculosAfetados: ["2tm:2:18"],
    pericope: "Advertências Contra Heresias"
  },
  {
    id: "vt-223",
    referencia: "tt:3:10",
    tipo: "relato",
    variantes: [
      { leitura: "rejeita o que é sectário", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "rejeita o herege", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre sectário e herege.",
    versiculosAfetados: ["tt:3:10"],
    pericope: "Exortações Finais"
  },
  {
    id: "vt-224",
    referencia: "hb:9:14",
    tipo: "relato",
    variantes: [
      { leitura: "com sangue próprio", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "com sangue de bodes e bezerros", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação significativa no sacrifício.",
    versiculosAfetados: ["hb:9:14"],
    pericope: "O Sangue de Cristo"
  },
  {
    id: "vt-225",
    referencia: "1jo:1:4",
    tipo: "relato",
    variantes: [
      { leitura: "a vossa alegria seja cheia", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "a nossa alegria seja cheia", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre vossa e nossa.",
    versiculosAfetados: ["1jo:1:4"],
    pericope: "A Luz e as Trevas"
  },
  {
    id: "vt-226",
    referencia: "ap:2:3",
    tipo: "relato",
    variantes: [
      { leitura: "suportaste e tens paciência", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "suportaste e não te cansaste", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na descrição da perseverança.",
    versiculosAfetados: ["ap:2:3"],
    pericope: "A Igreja em Éfeso"
  },
  {
    id: "vt-227",
    referencia: "ap:8:13",
    tipo: "relato",
    variantes: [
      { leitura: "um anjo que voava", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "um anjo voador", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na descrição do anjo.",
    versiculosAfetados: ["ap:8:13"],
    pericope: "A Quarta Trombeta"
  },
  {
    id: "vt-228",
    referencia: "ap:16:5",
    tipo: "relato",
    variantes: [
      { leitura: "justo és tu, que és e que eras", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "justo és tu, Senhor, que és e que eras", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição de 'Senhor' é explicativa.",
    versiculosAfetados: ["ap:16:5"],
    pericope: "As Sete Taças"
  },
  {
    id: "vt-229",
    referencia: "ap:20:9",
    tipo: "relato",
    variantes: [
      { leitura: "cercaram o acampamento dos santos e a cidade amada", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "cercaram o acampamento dos santos e a cidade amada", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Mesmo texto com pequenas variações.",
    versiculosAfetados: ["ap:20:9"],
    pericope: "O Milênio"
  },
  {
    id: "vt-230",
    referencia: "ap:21:1",
    tipo: "relato",
    variantes: [
      { leitura: "novos céus e uma nova terra", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "novos céus e nova terra", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Artigo definido varia.",
    versiculosAfetados: ["ap:21:1"],
    pericope: "A Nova Jerusalém"
  },
  {
    id: "vt-231",
    referencia: "ap:22:14",
    tipo: "relato",
    variantes: [
      { leitura: "bem-aventurados os que lavam as suas vestes", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "bem-aventurados os que cumprem os seus mandamentos", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação significativa: lavar vestes vs cumprir mandamentos.",
    versiculosAfetados: ["ap:22:14"],
    pericope: "A Água da Vida"
  },
  {
    id: "vt-232",
    referencia: "mt:27:66",
    tipo: "relato",
    variantes: [
      { leitura: "puseram soldados", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "puseram uma guarda de soldados", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição de 'guarda' é explicativa.",
    versiculosAfetados: ["mt:27:66"],
    pericope: "A Guarda do Túmulo"
  },
  {
    id: "vt-233",
    referencia: "mt:28:9",
    tipo: "relato",
    variantes: [
      { leitura: "Jesus encontrou-as", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Jesus encontrou-as no caminho", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'no caminho' é explicativa.",
    versiculosAfetados: ["mt:28:9"],
    pericope: "A Ressurreição"
  },
  {
    id: "vt-234",
    referencia: "mt:28:10",
    tipo: "relato",
    variantes: [
      { leitura: "ide dizer aos meus irmãos", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "ide dizer aos meus irmãos que vão à Galileia", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'que vão à Galileia' é explicativa.",
    versiculosAfetados: ["mt:28:10"],
    pericope: "A Ressurreição"
  },
  {
    id: "vt-235",
    referencia: "mc:15:39",
    tipo: "relato",
    variantes: [
      { leitura: "quando o centurião que estava defronte dele viu que assim expirou", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "quando o centurião viu que assim expirou", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'que estava defronte dele' é explicativa.",
    versiculosAfetados: ["mc:15:39"],
    pericope: "A Morte de Jesus"
  },
  {
    id: "vt-236",
    referencia: "lc:24:9",
    tipo: "relato",
    variantes: [
      { leitura: "partindo-se do túmulo", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "e saíram do túmulo", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na descrição da partida.",
    versiculosAfetados: ["lc:24:9"],
    pericope: "A Ressurreição"
  },
  {
    id: "vt-237",
    referencia: "lc:24:53",
    tipo: "relato",
    variantes: [
      { leitura: "louvando e bendizendo a Deus", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "louvando a Deus", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'bendizendo' é explicativa.",
    versiculosAfetados: ["lc:24:53"],
    pericope: "A Ascensão"
  },
  {
    id: "vt-238",
    referencia: "at:1:14",
    tipo: "relato",
    variantes: [
      { leitura: "todos estes eram unidos em oração e súplicas", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "todos estes eram unidos em oração", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'e súplicas' é explicativa.",
    versiculosAfetados: ["at:1:14"],
    pericope: "A Ascensão"
  },
  {
    id: "vt-239",
    referencia: "at:2:42",
    tipo: "relato",
    variantes: [
      { leitura: "ensino dos apóstolos", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "no ensino dos apóstolos", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A preposição 'no' varia.",
    versiculosAfetados: ["at:2:42"],
    pericope: "A Comunidade Primitiva"
  },
  {
    id: "vt-240",
    referencia: "at:2:46",
    tipo: "relato",
    variantes: [
      { leitura: "detempered em alegria e singeza de coração", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "de comum acordo no templo e partindo pão em casa", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação significativa na descrição da comunidade.",
    versiculosAfetados: ["at:2:46"],
    pericope: "A Comunidade Primitiva"
  },
  {
    id: "vt-241",
    referencia: "1co:10:8",
    tipo: "numerica",
    variantes: [
      { leitura: "vinte e três mil", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "trinta e cinco mil", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação numérica (LXX vs. MT de Números 25:9).",
    versiculosAfetados: ["1co:10:8"],
    pericope: "Exemplos da Desobediência"
  },
  {
    id: "vt-242",
    referencia: "at:7:14",
    tipo: "numerica",
    variantes: [
      { leitura: "setenta e cinco pessoas", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "setenta pessoas", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação numérica (LXX vs. MT de Gn 46:27).",
    versiculosAfetados: ["at:7:14"],
    pericope: "Estêvão: O Discurso"
  },
  {
    id: "vt-243",
    referencia: "mt:18:22",
    tipo: "numerica",
    variantes: [
      { leitura: "setenta vezes sete", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "setenta e sete vezes", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre expressões numéricas.",
    versiculosAfetados: ["mt:18:22"],
    pericope: "O Perdão Infinito"
  },
  {
    id: "vt-244",
    referencia: "mc:6:41",
    tipo: "numerica",
    variantes: [
      { leitura: "doze cestos", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "doze cestos do que sobrou", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'do que sobrou' é explicativa.",
    versiculosAfetados: ["mc:6:41"],
    pericope: "A Multiplicação dos Pães"
  },
  {
    id: "vt-245",
    referencia: "mc:8:19",
    tipo: "numerica",
    variantes: [
      { leitura: "quantos cestos do que sobrou destes levantastes?", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "quantos cestos do que sobroudestes levantastes?", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na pergunta sobre os cestos.",
    versiculosAfetados: ["mc:8:19"],
    pericope: "A Multiplicação dos Pães"
  },
  {
    id: "vt-246",
    referencia: "mc:15:28",
    tipo: "numerica",
    variantes: [
      { leitura: "e foi cumprida a Escritura que dizia: e foi contado com os transgressores", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "versículo omitido", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Versículo ausente em muitos manuscritos.",
    versiculosAfetados: ["mc:15:28"],
    pericope: "A Crucificação"
  },
  {
    id: "vt-247",
    referencia: "jo:4:54",
    tipo: "numerica",
    variantes: [
      { leitura: "segundo sinal", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "outro sinal", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre segundo e outro.",
    versiculosAfetados: ["jo:4:54"],
    pericope: "O Segundo Sinal"
  },
  {
    id: "vt-248",
    referencia: "at:13:33",
    tipo: "numerica",
    variantes: [
      { leitura: "no segundo salmo", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "no primeiro salmo", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na referência ao Salmo.",
    versiculosAfetados: ["at:13:33"],
    pericope: "O Discurso na Sinagoga"
  },
  {
    id: "vt-249",
    referencia: "1co:15:5",
    tipo: "numerica",
    variantes: [
      { leitura: "Cefas, depois dos doze", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Cefas, depois dos onze", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre doze e onze após a traição de Judas.",
    versiculosAfetados: ["1co:15:5"],
    pericope: "A Ressurreição de Cristo"
  },
  {
    id: "vt-250",
    referencia: "hb:7:2",
    tipo: "numerica",
    variantes: [
      { leitura: "deu-lhe o dízimo de tudo", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "deu-lhe o dízimo de tudo que possuía", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição de 'que possuía' é explicativa.",
    versiculosAfetados: ["hb:7:2"],
    pericope: "Melquisedeque"
  },
  {
    id: "vt-251",
    referencia: "ap:7:4",
    tipo: "numerica",
    variantes: [
      { leitura: "cento e quarenta e quatro mil", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "cento e quarenta e quatro mil de todas as tribos", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição de 'de todas as tribos' é explicativa.",
    versiculosAfetados: ["ap:7:4"],
    pericope: "Os 144.000"
  },
  {
    id: "vt-252",
    referencia: "ap:11:3",
    tipo: "numerica",
    variantes: [
      { leitura: "mil duzentos e sessenta dias", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "mil duzentos e sessenta dias (42 meses)", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição de '42 meses' é explicativa.",
    versiculosAfetados: ["ap:11:3"],
    pericope: "Os Dois Testemunhas"
  },
  {
    id: "vt-253",
    referencia: "ap:13:5",
    tipo: "numerica",
    variantes: [
      { leitura: "quarenta e dois meses", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "mil duzentos e sessenta dias", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre meses e dias.",
    versiculosAfetados: ["ap:13:5"],
    pericope: "A Besta do Mar"
  },
  {
    id: "vt-254",
    referencia: "ap:14:1",
    tipo: "numerica",
    variantes: [
      { leitura: "cento e quarenta e quatro mil", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "cento e quarenta e quatro mil que tinham o nome dele e o nome do Pai", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição é explicativa.",
    versiculosAfetados: ["ap:14:1"],
    pericope: "O Cordeiro no Monte Siom"
  },
  {
    id: "vt-255",
    referencia: "ap:21:17",
    tipo: "numerica",
    variantes: [
      { leitura: "cento e quarenta e quatro côvados", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "cento e quarenta e quatro côvados segundo a medida humana", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'segundo a medida humana' é explicativa.",
    versiculosAfetados: ["ap:21:17"],
    pericope: "A Nova Jerusalém"
  },
  {
    id: "vt-256",
    referencia: "ap:21:12",
    tipo: "numerica",
    variantes: [
      { leitura: "doze portas", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "doze portas, e nelas nomes dos doze filhos de Israel", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição é explicativa.",
    versiculosAfetados: ["ap:21:12"],
    pericope: "A Nova Jerusalém"
  },
  {
    id: "vt-257",
    referencia: "ap:21:13",
    tipo: "numerica",
    variantes: [
      { leitura: "doze portas", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "doze portas: três ao norte, três ao sul, três ao leste e três ao oeste", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição é explicativa.",
    versiculosAfetados: ["ap:21:13"],
    pericope: "A Nova Jerusalém"
  },
  {
    id: "vt-258",
    referencia: "ap:21:16",
    tipo: "numerica",
    variantes: [
      { leitura: "doze mil estádios", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "doze mil estádios em comprimento, largura e altura", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição é explicativa.",
    versiculosAfetados: ["ap:21:16"],
    pericope: "A Nova Jerusalém"
  },
  {
    id: "vt-259",
    referencia: "ap:22:2",
    tipo: "numerica",
    variantes: [
      { leitura: "doze frutos", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "doze frutos, produzindo seus frutos em cada mês", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição é explicativa.",
    versiculosAfetados: ["ap:22:2"],
    pericope: "O Rio da Água da Vida"
  },
  {
    id: "vt-260",
    referencia: "ap:7:5-8",
    tipo: "numerica",
    variantes: [
      { leitura: "doze mil de cada tribo", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "doze mil de cada tribo de Judá", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição de 'de Judá' é explicativa.",
    versiculosAfetados: ["ap:7:5", "ap:7:6", "ap:7:7", "ap:7:8"],
    pericope: "Os 144.000"
  },
  {
    id: "vt-261",
    referencia: "mt:27:51",
    tipo: "pontuacao",
    variantes: [
      { leitura: "a cortina do templo se rasgou em dois", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "as cortinas do templo se rasgaram de alto a baixo", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A pontuação muda o número de cortinas.",
    versiculosAfetados: ["mt:27:51"],
    pericope: "A Morte de Jesus"
  },
  {
    id: "vt-262",
    referencia: "jo:1:1",
    tipo: "pontuacao",
    variantes: [
      { leitura: "e o Verbo era Deus", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "e Deus era o Verbo", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A ordem enfatiza diferente aspecto da divindade.",
    versiculosAfetados: ["jo:1:1"],
    pericope: "O Verbo É Deus"
  },
  {
    id: "vt-263",
    referencia: "rm:9:5",
    tipo: "pontuacao",
    variantes: [
      { leitura: "Deus sobre todas as coisas seja para sempre louvado", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "que é Deus sobre todas as coisas", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Pontuação muda significado cristológico.",
    versiculosAfetados: ["rm:9:5"],
    pericope: "O Lamento de Paulo"
  },
  {
    id: "vt-264",
    referencia: "ef:5:32",
    tipo: "pontuacao",
    variantes: [
      { leitura: "mistério é grande; eu digo de Cristo e da igreja", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "mistério é grande: eu digo de Cristo e da igreja", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Ponto e vírgula vs dois-pontos.",
    versiculosAfetados: ["ef:5:32"],
    pericope: "O Mistério do Matrimônio"
  },
  {
    id: "vt-265",
    referencia: "hb:1:8",
    tipo: "pontuacao",
    variantes: [
      { leitura: "o teu trono, ó Deus, é para todo sempre", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o teu trono, ó Deus, para todo sempre é um ceptro de retidão", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Pontuação muda significado cristológico.",
    versiculosAfetados: ["hb:1:8"],
    pericope: "O Filho de Deus"
  },
  {
    id: "vt-266",
    referencia: "1jo:5:7-8",
    tipo: "pontuacao",
    variantes: [
      { leitura: "três são os que testificam no céu: o Pai, a Palavra e o Espírito Santo", manuscritos: ["Textus Receptus"], classificacao: "fraca" },
      { leitura: "três são os que testificam: o Espírito, e a água, e o sangue", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" }
    ],
    explicacao: "O Comma Johanneum é adição tardia.",
    versiculosAfetados: ["1jo:5:7", "1jo:5:8"],
    pericope: "Os Três Testemunhos"
  },
  {
    id: "vt-267",
    referencia: "mt:26:26",
    tipo: "pontuacao",
    variantes: [
      { leitura: "tomando o pão, abençoou-o e partiu-o e deu-lhes", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "tomando o pão, bendisse e partiu e deu-lhes", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na descrição da Ceia.",
    versiculosAfetados: ["mt:26:26"],
    pericope: "A Ceia do Senhor"
  },
  {
    id: "vt-268",
    referencia: "mc:14:22",
    tipo: "pontuacao",
    variantes: [
      { leitura: "tomando o pão, abençoou-o, partiu-o e deu-lhes", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "tomando o pão, bendisse e partiu-o e deu-lhes", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre abençoar e bendizer.",
    versiculosAfetados: ["mc:14:22"],
    pericope: "A Ceia do Senhor"
  },
  {
    id: "vt-269",
    referencia: "lc:22:19",
    tipo: "pontuacao",
    variantes: [
      { leitura: "tomando o pão, deu graças e partiu-o e deu-lhes", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "tomando o pão, deu graças e partiu e deu-lhes", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na ordem das ações.",
    versiculosAfetados: ["lc:22:19"],
    pericope: "A Ceia do Senhor"
  },
  {
    id: "vt-270",
    referencia: "1co:11:24",
    tipo: "pontuacao",
    variantes: [
      { leitura: "tomando o pão, deu graças e partiu-o e disse: tomai, comei", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "tomando o pão, deu graças e partiu e disse: tomai, comei", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na ordem das ações.",
    versiculosAfetados: ["1co:11:24"],
    pericope: "A Ceia do Senhor"
  },
  {
    id: "vt-271",
    referencia: "mt:1:25",
    tipo: "pontuacao",
    variantes: [
      { leitura: "não a conheceu até que gerou um filho", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "não a conheceu até que gerou o seu primogênito", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre um filho e o primogênito.",
    versiculosAfetados: ["mt:1:25"],
    pericope: "O Nascimento de Jesus"
  },
  {
    id: "vt-272",
    referencia: "mt:27:24",
    tipo: "pontuacao",
    variantes: [
      { leitura: "inocente deste sangue", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "justo deste sangue", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre inocente e justo.",
    versiculosAfetados: ["mt:27:24"],
    pericope: "A Inocência de Pilatos"
  },
  {
    id: "vt-273",
    referencia: "jo:19:14",
    tipo: "pontuacao",
    variantes: [
      { leitura: "era sexta-feira da preparação", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "era preparação do páscoa; era como sexta-feira", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Pontuação muda o significado.",
    versiculosAfetados: ["jo:19:14"],
    pericope: "A Sentença de Pilatos"
  },
  {
    id: "vt-274",
    referencia: "at:20:28",
    tipo: "pontuacao",
    variantes: [
      { leitura: "a igreja de Deus, que ele comprou com o seu próprio sangue", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "a igreja de Deus, que ele comprou com o sangue do seu Filho", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação cristológica.",
    versiculosAfetados: ["at:20:28"],
    pericope: "A Igreja de Deus"
  },
  {
    id: "vt-275",
    referencia: "rm:8:16",
    tipo: "pontuacao",
    variantes: [
      { leitura: "o próprio Espírito testifica conosco que somos filhos de Deus", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o Espírito testifica conosco que somos filhos de Deus", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição de 'próprio' é enfática.",
    versiculosAfetados: ["rm:8:16"],
    pericope: "O Testemunho do Espírito"
  },
  {
    id: "vt-276",
    referencia: "gl:3:17",
    tipo: "pontuacao",
    variantes: [
      { leitura: "cento e quarenta e três anos depois", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "cento e quarenta anos depois", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação numérica.",
    versiculosAfetados: ["gl:3:17"],
    pericope: "A Lei e a Promessa"
  },
  {
    id: "vt-277",
    referencia: "1tm:3:16",
    tipo: "pontuacao",
    variantes: [
      { leitura: "Deus se manifestou em carne", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o mistério da piedade se manifestou em carne", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação cristológica.",
    versiculosAfetados: ["1tm:3:16"],
    pericope: "O Mistério da Piedade"
  },
  {
    id: "vt-278",
    referencia: "hb:7:3",
    tipo: "pontuacao",
    variantes: [
      { leitura: "sem pai, sem mãe, sem genealogia", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "sem pai, sem mãe, sem genealogia, não tem princípio de dias nem fim de vida", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição é explicativa.",
    versiculosAfetados: ["hb:7:3"],
    pericope: "Melquisedeque"
  },
  {
    id: "vt-279",
    referencia: "ap:1:8",
    tipo: "pontuacao",
    variantes: [
      { leitura: "Eu sou o Alfa e o Ômega, o princípio e o fim", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Eu sou o Alfa e o Ômega, diz o Senhor Deus", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A identidade do falante varia.",
    versiculosAfetados: ["ap:1:8"],
    pericope: "Apresentação de Jesus"
  },
  {
    id: "vt-280",
    referencia: "ap:13:18",
    tipo: "pontuacao",
    variantes: [
      { leitura: "666", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "616", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "616 pode refletir diferente sistema de gematria.",
    versiculosAfetados: ["ap:13:18"],
    pericope: "A Besta do Mar"
  },
  {
    id: "vt-281",
    referencia: "mt:6:13",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "mas livra-nos do mal", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "mas livra-nos do mal. Porque teu é o reino, e o poder, e a glória, para sempre", manuscritos: ["Manuscritos posteriores"], classificacao: "fraca" }
    ],
    explicacao: "A doxologia final do Pai Nosso é adição tardia.",
    versiculosAfetados: ["mt:6:13"],
    pericope: "O Pai Nosso"
  },
  {
    id: "vt-282",
    referencia: "mc:16:8",
    tipo: "relato",
    variantes: [
      { leitura: "pois tinham medo", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "pois tinham medo de ninguém disseram nada a ninguém", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "O final abrupto de Marcos.",
    versiculosAfetados: ["mc:16:8"],
    pericope: "A Ressurreição"
  },
  {
    id: "vt-283",
    referencia: "jo:1:18",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "o unigênito Deus", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o unigênito Filho", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação cristológica: Deus vs Filho.",
    versiculosAfetados: ["jo:1:18"],
    pericope: "O Verbo Encarnado"
  },
  {
    id: "vt-284",
    referencia: "rm:1:17",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "a justiça de Deus se revela no evangelho", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "a justiça de Deus se revela de fé em fé", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na frase final.",
    versiculosAfetados: ["rm:1:17"],
    pericope: "O Evangelho e a Ira"
  },
  {
    id: "vt-285",
    referencia: "hb:1:1",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "muitas vezes e de muitas maneiras", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "muitas vezes e de muitos modos", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre maneiras e modos.",
    versiculosAfetados: ["hb:1:1"],
    pericope: "Deus Fala pelo Filho"
  },
  {
    id: "vt-286",
    referencia: "1jo:2:23",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "quem confessou o Filho tem o Pai também", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "quem confessou o Filho tem o Pai", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição de 'também' é explicativa.",
    versiculosAfetados: ["1jo:2:23"],
    pericope: "Anticristos"
  },
  {
    id: "vt-287",
    referencia: "ap:22:14",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "bem-aventurados os que lavam as suas vestes", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "bem-aventurados os que cumprem os seus mandamentos", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação significativa.",
    versiculosAfetados: ["ap:22:14"],
    pericope: "A Água da Vida"
  },
  {
    id: "vt-288",
    referencia: "mt:5:44",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "amai os vossos inimigos e orai pelos que vos perseguem", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "amai os vossos inimigos, bendizei os que vos amaldiçoam", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação no ensino sobre amor aos inimigos.",
    versiculosAfetados: ["mt:5:44"],
    pericope: "Amor aos Inimigos"
  },
  {
    id: "vt-289",
    referencia: "mc:12:30",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "todo o teu coração, toda a tua alma, todo o teu entendimento", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "todo o teu coração, toda a tua alma, todas as tuas forças", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre entendimento e forças.",
    versiculosAfetados: ["mc:12:30"],
    pericope: "O Primeiro Mandamento"
  },
  {
    id: "vt-290",
    referencia: "lc:11:2",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "venha o teu reino", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "venha o teu reino; seja feita a tua vontade", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição pode ser harmonização com Mt 6:10.",
    versiculosAfetados: ["lc:11:2"],
    pericope: "O Pai Nosso"
  },
  {
    id: "vt-291",
    referencia: "jo:14:16",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "outro Conselheiro", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "outro Paráclito", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na tradução do termo grego.",
    versiculosAfetados: ["jo:14:16"],
    pericope: "A Promessa do Espírito"
  },
  {
    id: "vt-292",
    referencia: "at:2:38",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "arrependei-vos e cada um de vós seja batizado", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "arrependei-vos para a remissão dos vossos pecados", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na fórmula batismal.",
    versiculosAfetados: ["at:2:38"],
    pericope: "O Pentecostes"
  },
  {
    id: "vt-293",
    referencia: "rm:3:25",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "pela fé no seu sangue", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "pela fé do seu sangue", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na preposição.",
    versiculosAfetados: ["rm:3:25"],
    pericope: "A Justificação pela Fé"
  },
  {
    id: "vt-294",
    referencia: "2co:5:17",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "se alguém está em Cristo, nova criatura é", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "se alguém está em Cristo, é nova criatura", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Ordem varia.",
    versiculosAfetados: ["2co:5:17"],
    pericope: "Novas Criaturas"
  },
  {
    id: "vt-295",
    referencia: "gl:5:1",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "para a liberdade Cristo nos libertou", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "para a liberdade foi Cristo libertou", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na voz verbal.",
    versiculosAfetados: ["gl:5:1"],
    pericope: "A Liberdade Cristã"
  },
  {
    id: "vt-296",
    referencia: "cl:3:17",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "fazei tudo em nome do Senhor Jesus", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "tudo o que fizerdes, fazei em nome do Senhor Jesus", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na frase.",
    versiculosAfetados: ["cl:3:17"],
    pericope: "Vida na Comunidade"
  },
  {
    id: "vt-297",
    referencia: "1ts:5:16",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "rejubilai sempre", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "sempre vos alegrai", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre rejubilar e alegrar.",
    versiculosAfetados: ["1ts:5:16"],
    pericope: "Exortações Finais"
  },
  {
    id: "vt-298",
    referencia: "1tm:6:10",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "a raiz de todos os males é a avareza", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "a raiz de todos os males", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição 'é a avareza' pode ser explicativa.",
    versiculosAfetados: ["1tm:6:10"],
    pericope: "O Amor ao Dinheiro"
  },
  {
    id: "vt-299",
    referencia: "hb:4:12",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "a palavra de Deus é viva e eficaz", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "a palavra de Deus é viva e operante", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre eficaz e operante.",
    versiculosAfetados: ["hb:4:12"],
    pericope: "A Palavra de Deus"
  },
  {
    id: "vt-300",
    referencia: "1jo:4:18",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "o amor perfeito expulsa o medo", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o amor perfeito lança fora o medo", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre expulsar e lançar fora.",
    versiculosAfetados: ["1jo:4:18"],
    pericope: "O Amor Perfeito"
  },
  {
    id: "vt-301",
    referencia: "ap:3:14",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "o princípio da criação de Deus", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o início da criação de Deus", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre princípio e início.",
    versiculosAfetados: ["ap:3:14"],
    pericope: "A Igreja em Laodiceia"
  },
  {
    id: "vt-302",
    referencia: "mt:26:64",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "vereis o Filho do Homem assentado à destra do poder", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "vereis o Filho do Homem assentado à destra da virtude de Deus", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre poder e virtude.",
    versiculosAfetados: ["mt:26:64"],
    pericope: "Jesus Perante o Sinédrio"
  },
  {
    id: "vt-303",
    referencia: "mc:14:62",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "assentado à destra do poder", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "assentado à destra da virtude", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Mesma variação em Marcos.",
    versiculosAfetados: ["mc:14:62"],
    pericope: "Jesus Perante o Sinédrio"
  },
  {
    id: "vt-304",
    referencia: "jo:6:63",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "o Espírito é o que vivifica", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "o Espírito é o que dá vida", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre vivificar e dar vida.",
    versiculosAfetados: ["jo:6:63"],
    pericope: "O Pão da Vida"
  },
  {
    id: "vt-305",
    referencia: "at:7:56",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "eis que vejo os céus abertos", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "eis que vejo os céus abertos, e o Filho do Homem", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição pode ser explicativa.",
    versiculosAfetados: ["at:7:56"],
    pericope: "A Visão de Estêvão"
  },
  {
    id: "vt-306",
    referencia: "rm:8:28",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "todas as coisas cooperam para o bem", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "todas as coisas juntas cooperam", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação na preposição.",
    versiculosAfetados: ["rm:8:28"],
    pericope: "Todas as Coisas Cooperam"
  },
  {
    id: "vt-307",
    referencia: "1co:2:9",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "nem ouviu, nem viu, nem entrou no coração", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "nem ouviu, nem viu, nem subiu ao coração", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre entrar e subir.",
    versiculosAfetados: ["1co:2:9"],
    pericope: "Os Desígnios de Deus"
  },
  {
    id: "vt-308",
    referencia: "2co:12:9",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "a minha graça te basta", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "a graça te basta", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "A adição do pronome personaliza.",
    versiculosAfetados: ["2co:12:9"],
    pericope: "A Graça Suficiente"
  },
  {
    id: "vt-309",
    referencia: "hp:2:8",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "se humilhou a si mesmo", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "se esvaziou a si mesmo", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Variação entre humilhar e esvaziar.",
    versiculosAfetados: ["hp:2:8"],
    pericope: "A Humilhação de Cristo"
  },
  {
    id: "vt-310",
    referencia: "1jo:4:8",
    tipo: "substituicao_sinonimos",
    variantes: [
      { leitura: "Deus é amor", manuscritos: ["Sinaitico (01)", "Vaticano (03)"], classificacao: "forte" },
      { leitura: "Deus é o amor", manuscritos: ["Alexandrino (02)"], classificacao: "moderada" }
    ],
    explicacao: "Artigo definido varia.",
    versiculosAfetados: ["1jo:4:8"],
    pericope: "O Amor de Deus"
  },
];

export function getVariantePorReferencia(ref: string): VarianteTextual[] {
  const refNormalizada = ref.toLowerCase().trim();
  return VARIANTES_TEXTUAIS.filter(v => v.referencia === refNormalizada);
}

export function getVariantePorLivro(livro: string): VarianteTextual[] {
  const livroNormalizado = livro.toLowerCase().trim();
  return VARIANTES_TEXTUAIS.filter(v => v.referencia.startsWith(livroNormalizado + ':'));
}

export function temVarianteSignificativa(ref: string): boolean {
  const variantes = getVariantePorReferencia(ref);
  return variantes.some(v => v.variantes.some(vr => vr.classificacao === 'fraca'));
}
