export interface VarianteTextual {
  id: string;
  referencia: string;
  pericope: string;
  tipo: 'adicao' | 'omissao' | 'mudanca' | 'transposicao';
  descricao: string;
  manuscritos: string[];
  evidenciaExterna: 'forte' | 'moderada' | 'fraca';
  recomendacaoNA28?: string;
  textoRecebido?: string;
  textoNestleAland?: string;
  notas?: string;
}

export const VARIANTES_TEXTUAIS: VarianteTextual[] = [
  {
    id: 'vt-001',
    referencia: 'mc:16:9-20',
    pericope: 'A Ressurreição e a Grande Comissão',
    tipo: 'adicao',
    descricao: 'O final de Marcos (versos 9-20) está ausente nos manuscritos mais antigos e melhores. Eusebio e Jerônimo mencionam que esta passagem não se encontrava na maioria dos exemplares gregos de sua época.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)', 'Alexandrino (02)'],
    evidenciaExterna: 'fraca',
    recomendacaoNA28: 'Os versos 9-20 são incluídos entre colchetes, indicando dúvida sobre a autenticidade.',
    textoRecebido: 'Mas, tendo ressuscitado cedo no primeiro dia da semana, apareceu primeiro a Maria Madalena, de quem tinha expulsado sete demônios.',
    notas: 'Alguns manuscritos posteriores (K-ℓ) contêm esta passagem. A versão curta termina em mc:16:8.'
  },
  {
    id: 'vt-002',
    referencia: 'jo:7:53-8:11',
    pericope: 'A Adúltera Perdoada',
    tipo: 'adicao',
    descricao: 'A história da mulher adúltera não se encontra nos manuscritos mais antigos de João. O texto pula de 7:52 diretamente para 8:12 em muitos testemunhos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)', 'Papiro 66', 'Papiro 75'],
    evidenciaExterna: 'fraca',
    recomendacaoNA28: 'O trecho está entre colchetes, com indicação de que sua localização original é incerta.',
    notas: 'A passagem aparece em diferentes locais em alguns manuscritos: após Jo 21:25, após Lc 21:38, ou em Jo 7:36.'
  },
  {
    id: 'vt-003',
    referencia: '1jo:5:7-8',
    pericope: 'A Trindade no Texto',
    tipo: 'adicao',
    descricao: 'A chamada "Comissão Trinitária" (Tres Testimonium) — "Pois três são os que testificam no céu: o Pai, a Palavra e o Espírito Santo; e estes três são um" — não aparece em nenhum manuscrito grego anterior ao século XVI.',
    manuscritos: ['Textus Receptus', 'Manuscritos latinos tardios'],
    evidenciaExterna: 'fraca',
    recomendacaoNA28: 'Estes versos são omitidos na edição NA28, considerados uma glossa posterior.',
    textoRecebido: 'Pois três são os que testificam no céu: o Pai, a Palavra e o Espírito Santo; e estes três são um. E três são os que testificam na terra: o espírito, a água e o sangue; e estes três concordam.',
    notas: 'A adição trinitária provavelmente entrou no texto latino a partir de uma nota marginal e só aparece em manuscritos latinos tardios.'
  },
  {
    id: 'vt-004',
    referencia: 'mt:17:21',
    pericope: 'A Fe na Oração',
    tipo: 'omissao',
    descricao: 'O versículo "Mas esta espécie não sai senão pela oração e pelo jejum" está ausente dos melhores manuscritos gregos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)', 'Alexandrino (02)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'O versículo 17:21 é omitido na edição NA28.',
    notas: 'O versículo foi provavelmente copiado de Mc 9:29 para Mt 17:21 por escribas.'
  },
  {
    id: 'vt-005',
    referencia: 'mc:11:26',
    pericope: 'O Perdão',
    tipo: 'omissao',
    descricao: 'O versículo "Mas, se vós não perdoardes, tampouco vosso Pai que está nos céus perdoará as vossas ofensas" está ausente dos manuscritos mais antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'O versículo é omitido na edição NA28.',
    notas: 'Foi provavelmente interpolado a partir de Mt 6:15.'
  },
  {
    id: 'vt-006',
    referencia: 'mt:18:11',
    pericope: 'A Perda e o Achado',
    tipo: 'omissao',
    descricao: 'O versículo "Porque o Filho do Homem veio salvar o que se havia perdido" está ausente dos manuscritos mais antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)', 'Alexandrino (02)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'O versículo é omitido na edição NA28.',
    notas: 'O versículo foi provavelmente copiado de Lc 19:10.'
  },
  {
    id: 'vt-007',
    referencia: 'lc:22:43-44',
    pericope: 'A Agonia no Getsêmani',
    tipo: 'omissao',
    descricao: 'Os versículos que descrevem o suor de sangue de Jesus e o anjo que o fortalece estão ausentes de alguns manuscritos importantes.',
    manuscritos: ['Alexandrino (02)', 'Vaticano (03) — omitidos em parte'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Os versículos são incluídos, mas com nota de que a evidência é dividida.',
    notas: 'Alguns estudiosos argumentam que foram omitidos por razões teológicas (docetismo), não por acaso de cópia.'
  },
  {
    id: 'vt-008',
    referencia: 'lc:23:34',
    pericope: 'O Perdão na Cruz',
    tipo: 'omissao',
    descricao: 'As palavras "Pai, perdoa-lhes, porque não sabem o que fazem" estão ausentes de alguns manuscritos antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03) — variantes'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'O versículo é incluído, mas com nota de divisão na evidência.',
    notas: 'Pode ter sido omitido por escribas que julgavam que os judeus deveriam saber o que faziam.'
  },
  {
    id: 'vt-009',
    referencia: 'jo:5:3b-4',
    pericope: 'A Piscina de Betesda',
    tipo: 'adicao',
    descricao: 'A explicação sobre o anjo que agitava a água da piscina está ausente dos manuscritos mais antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)', 'Alexandrino (02)'],
    evidenciaExterna: 'fraca',
    recomendacaoNA28: 'O versículo 4 é omitido na edição NA28.',
    notas: 'O versículo foi provavelmente adicionado como explicação marginal.'
  },
  {
    id: 'vt-010',
    referencia: 'at:8:37',
    pericope: 'O Batismo do Eunuco Etíope',
    tipo: 'omissao',
    descricao: 'O versículo com a confissão de fé do eunuco está ausente dos manuscritos mais antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'fraca',
    recomendacaoNA28: 'O versículo é omitido na edição NA28.',
    notas: 'Foi provavelmente adicionado como glossa litúrgica.'
  },
  {
    id: 'vt-011',
    referencia: 'rm:16:24',
    pericope: 'Saudações Finais',
    tipo: 'omissao',
    descricao: 'O versículo "A graça de nosso Senhor Jesus Cristo seja com todos. Amém." está ausente dos melhores manuscritos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'O versículo é omitido na edição NA28.',
    notas: 'A graça é uma fórmula de conclusão que pode ter sido adicionada de outras epístolas.'
  },
  {
    id: 'vt-012',
    referencia: '1co:14:34-35',
    pericope: 'O Silêncio das Mulheres',
    tipo: 'transposicao',
    descricao: 'A ordem de que as mulheres se calassem na assembleia pode ser uma interpolação ou ter posição original diferente.',
    manuscritos: ['Diversos manuscritos — posição variantes'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Os versículos são incluídos, mas com nota sobre a possibilidade de interpolação.',
    notas: 'Alguns manuscritos colocam estes versículos após 14:40. Pode ser uma instrução de origem paulina em outro contexto.'
  },
  {
    id: 'vt-013',
    referencia: 'ef:1:1',
    pericope: 'Saudação',
    tipo: 'omissao',
    descricao: 'A expressão "em Efeso" está ausente de algumas versões importantes do texto.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03) — variantes'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Incluído, mas com nota de dúvida.',
    notas: 'Pode indicar que a epístola era circular, destinada a várias igrejas.'
  },
  {
    id: 'vt-014',
    referencia: 'cl:1:14',
    pericope: 'Redenção',
    tipo: 'adicao',
    descricao: 'A frase "pelo seu sangue" após "redenção" está ausente dos manuscritos mais antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'A frase "pelo seu sangue" é omitida na NA28.',
    notas: 'A adição provavelmente veio de Ef 1:7.'
  },
  {
    id: 'vt-015',
    referencia: '1jo:5:7',
    pericope: 'Comissão Trinitária',
    tipo: 'adicao',
    descricao: 'Veja vt-003. A adição Trinitária é uma das variantes textuais mais conhecidas do NT.',
    manuscritos: ['Textus Receptus', 'Manuscritos latinos tardios'],
    evidenciaExterna: 'fraca',
    recomendacaoNA28: 'Omitido na NA28.',
    notas: 'Ausente em todos os manuscritos gregos antigos. Presente em 6-7 manuscritos gregos tardios (séc. XVI-XVII).'
  },
  {
    id: 'vt-016',
    referencia: 'mt:23:14',
    pericope: 'As Sete Maldições',
    tipo: 'omissao',
    descricao: 'O versículo sobre devorar casas de viúvas está ausente dos manuscritos mais antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'O versículo é omitido na NA28.',
    notas: 'Foi provavelmente interpolado de Mc 12:40 e Lc 20:47.'
  },
  {
    id: 'vt-017',
    referencia: 'mc:9:44',
    pericope: 'O Fogo do Inferno',
    tipo: 'omissao',
    descricao: 'Os versículos 44 e 46 (replicação do v. 42) estão ausentes dos melhores manuscritos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Os versículos 44 e 46 são omitidos na NA28.',
    notas: 'A repetição pode ter sido uma interpolação explicativa.'
  },
  {
    id: 'vt-018',
    referencia: 'jo:1:18',
    pericope: 'O Verbo Encarnado',
    tipo: 'mudanca',
    descricao: 'A variante entre "o unigênito Deus" (μονογενὴς θεός) e "o unigênito Filho" (ὁ μονογενὴς υἱός).',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)', 'Alexandrino (02)'],
    evidenciaExterna: 'forte',
    recomendacaoNA28: 'Lê "o unigênito Deus" (μονογενὴς θεός).',
    notas: 'O termo monogenés é debatido: pode significar "unigênito" ou "único".'
  },
  {
    id: 'vt-019',
    referencia: 'at:20:28',
    pericope: 'A Igreja de Deus',
    tipo: 'mudanca',
    descricao: 'A variante entre "a igreja de Deus" (θεοῦ) versus "a igreja do Senhor" (κυρίου) ou "a igreja do Senhor e Deus" (κυρίου καὶ θεοῦ).',
    manuscritos: ['Alexandrino (02)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Lê "a igreja de Deus".',
    notas: 'A leitura "Deus" é mais provável por causa da dificuldade do copista.'
  },
  {
    id: 'vt-020',
    referencia: 'rm:5:1',
    pericope: 'Justificação',
    tipo: 'mudanca',
    descricao: 'A variante entre "temos paz" (ἔχομεν) e "tenhamos paz" (σχῶμεν) — indicativo versus subjuntivo.',
    manuscritos: ['Diversos manuscritos'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Lê "temos" (indicativo).',
    notas: 'A leitura indicativa é mais difícil e, portanto, provavelmente original.'
  },
  {
    id: 'vt-021',
    referencia: 'hb:2:9',
    pericope: 'A Morte de Jesus',
    tipo: 'mudanca',
    descricao: 'A variante entre "pela graça de Deus" (χάριτι θεοῦ) e "sem Deus" (χωρὶς θεοῦ) — uma leitura muito diferente.',
    manuscritos: ['Alexandrino (02)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Lê "pela graça de Deus".',
    notas: 'A leitura "sem Deus" é tão surpreendente que provavelmente não foi inventada.'
  },
  {
    id: 'vt-022',
    referencia: 'mt:6:13',
    pericope: 'O Pai Nosso',
    tipo: 'adicao',
    descricao: 'A doxologia final "Pois teu é o reino, e o poder, e a glória, para sempre. Amém." está ausente dos manuscritos mais antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'A doxologia é omitida na NA28.',
    notas: 'A doxologia provavelmente veio da liturgia cristã primitiva.'
  },
  {
    id: 'vt-023',
    referencia: 'jo:19:14',
    pericope: 'A Sentença de Pilatos',
    tipo: 'mudanca',
    descricao: 'A variante entre "sexta" (ἕκτη) e "terceira" (τρίτη) — o horário em que Pilatos apresentou Jesus.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'forte',
    recomendacaoNA28: 'Lê "sexta hora".',
    notas: 'A divergência pode refletir diferentes tradições sobre o horário.'
  },
  {
    id: 'vt-024',
    referencia: 'lc:3:22',
    pericope: 'O Batismo de Jesus',
    tipo: 'mudanca',
    descricao: 'Uma variante rara onde a voz do céu diz "Tu és meu Filho amado; hoje te gerei" (Sl 2:7) em vez do relato canônico.',
    manuscritos: ['Codex Bezae (05)', 'Manuscritos latinos antigos'],
    evidenciaExterna: 'fraca',
    notas: 'A leitura citando o Sl 2:7 pode refletir uma tradição adopcionista.'
  },
  {
    id: 'vt-025',
    referencia: 'rm:9:5',
    pericope: 'Israel e Cristo',
    tipo: 'mudanca',
    descricao: 'A pontuação determina se Cristo é chamado "Deus sobre todas as coisas" ou se a frase é uma bênção separada.',
    manuscritos: ['Diversos manuscritos — pontuação variantes'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Inclui a declaração cristológica.',
    notas: 'A vírgula (ou sua ausência) muda completamente o significado teológico.'
  },
  {
    id: 'vt-026',
    referencia: '1co:11:24',
    pericope: 'A Ceia do Senhor',
    tipo: 'mudanca',
    descricao: 'A variante sobre a presença ou ausência de "partido/quebrado" (κλώμενον) após "que é por vós" — "isto é o meu corpo, que é partido por vós".',
    manuscritos: ['Alexandrino (02)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Lê "isto é o meu corpo, que é dado por vós".',
    notas: 'A questão é se Jesus disse "quebrado" ou não.'
  },
  {
    id: 'vt-027',
    referencia: 'ef:3:9',
    pericope: 'O Mistério Oculto',
    tipo: 'mudanca',
    descricao: 'A variante entre "comunhão do mistério" (κοινωνία) e "administração do mistério" (οἰκονομία).',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Lê "comunhão".',
    notas: 'As duas palavras são facilmente confundidas em manuscritos.'
  },
  {
    id: 'vt-028',
    referencia: 'cl:2:2',
    pericope: 'O Tesouro da Sabedoria',
    tipo: 'mudanca',
    descricao: 'A variante entre "o mistério de Deus, o Pai" (τοῦ θεοῦ πατρός) e "de Deus, em Cristo" (τοῦ θεοῦ ἐν Χριστῷ).',
    manuscritos: ['Alexandrino (02)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Lê "de Deus, o Pai, e de Cristo".',
    notas: 'Reflete uma tradição mais antiga sobre a relação Pai-Filho.'
  },
  {
    id: 'vt-029',
    referencia: '1jo:4:3',
    pericope: 'O Espírito da Mentira',
    tipo: 'mudanca',
    descricao: 'A variante entre "não confessou" (οὐχ ὡμολόγησεν) e "negou" (λέλυκεν) — "todo espírito que não confessou Jesus".',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'forte',
    recomendacaoNA28: 'Lê "não confessou".',
    notas: 'A leitura "não confessou" é mais provável por ser mais difícil.'
  },
  {
    id: 'vt-030',
    referencia: 'mt:24:36',
    pericope: 'Sobre o Dia e a Hora',
    tipo: 'mudanca',
    descricao: 'A variante entre "nem o Filho" (οὐδὲ ὁ υἱός) — omitido em alguns manuscritos. A frase está em Mc 13:32 mas pode não ser original em Mateus.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03) — variantes'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'A frase "nem o Filho" é incluída, mas com nota de dúvida.',
    notas: 'Pode ter sido omitido por razões cristológicas.'
  },
  {
    id: 'vt-031',
    referencia: 'jo:1:34',
    pericope: 'O Testemunho de João Batista',
    tipo: 'mudanca',
    descricao: 'A variante entre "Filho de Deus" (υἱὸς τοῦ θεοῦ) e "o Eleito de Deus" (ὁ ἐκλεκτὸς τοῦ θεοῦ) — uma leitura rara.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Lê "Filho de Deus".',
    notas: 'A leitura "eleito" é mais difícil e pode ser original.'
  },
  {
    id: 'vt-032',
    referencia: 'at:15:34',
    pericope: 'A Permanência de Judas e Silas',
    tipo: 'omissao',
    descricao: 'O versículo "Mas Judas ficou ali" está ausente dos manuscritos mais antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'O versículo é omitido na NA28.',
    notas: 'O versículo provavelmente foi adicionado para resolver uma dificuldade narrativa.'
  },
  {
    id: 'vt-033',
    referencia: 'rm:8:1',
    pericope: 'A Liberdade em Cristo',
    tipo: 'mudanca',
    descricao: 'A variante entre "nenhuma condenação" (οὐδὲν κατάκριμα) e "nenhuma condenação para aqueles que estão em Cristo Jesus" — a frase adicional pode ser uma interpolação.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Lê "nenhuma condenação".',
    notas: 'A leitura mais curta é mais provável por ser mais difícil.'
  },
  {
    id: 'vt-034',
    referencia: 'hb:10:34',
    pericope: 'Os Sofrimentos dos Cristãos',
    tipo: 'mudanca',
    descricao: 'A variante entre "vosso próprio" (τοῖς ἰδίοις) e "meus" (μου) — referindo-se aos pertences.',
    manuscritos: ['Alexandrino (02)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Lê "vosso próprio".',
    notas: 'A leitura "meus" pode refletir uma tradição mais antiga.'
  },
  {
    id: 'vt-035',
    referencia: 'mt:27:49',
    pericope: 'A Morte de Jesus',
    tipo: 'adicao',
    descricao: 'Uma nota que diz "E o soldado, ferindo-o com a lança, abriu seu lado, e saiu água e sangue" — pode ser uma interpolação de Jo 19:34.',
    manuscritos: ['Sinaitico (01)', 'Alexandrino (02)'],
    evidenciaExterna: 'fraca',
    notas: 'Esta variante aparece no Sinaitico em lugar diferente do relato de João.'
  },
  {
    id: 'vt-036',
    referencia: 'mc:1:1',
    pericope: 'O Início do Evangelho',
    tipo: 'omissao',
    descricao: 'Alguns manuscritos omitem "Filho de Deus" (υἱοῦ θεοῦ). O Sinaitico original lê apenas "Filho de Deus" sem "Jesus Cristo".',
    manuscritos: ['Sinaitico (01) — original', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Inclui "Filho de Deus", mas com nota de dúvida.',
    notas: 'A leitura mais curta ("Início do evangelho de Jesus Cristo") pode ser original.'
  },
  {
    id: 'vt-037',
    referencia: 'lc:22:19b-20',
    pericope: 'A Ceia do Senhor',
    tipo: 'adicao',
    descricao: 'A segunda parte da instituição da Ceia ("Isto é o meu corpo... este cálice é a nova aliança no meu sangue") está ausente do Dideque e de alguns manuscritos.',
    manuscritos: ['Dideque', 'Justino Mártir'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'O texto mais longo é incluído, mas a evidência é dividida.',
    notas: 'A versão curta pode refletir uma tradição mais antiga da Ceia.'
  },
  {
    id: 'vt-038',
    referencia: 'jo:5:3b-4',
    pericope: 'A Piscina de Betesda',
    tipo: 'adicao',
    descricao: 'A descrição do anjo que agitava a água da piscina está ausente dos manuscritos mais antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)', 'Papiro 66', 'Papiro 75'],
    evidenciaExterna: 'fraca',
    recomendacaoNA28: 'Os versos 3b-4 são omitidos na NA28.',
    notas: 'A adição explica por que os doentes esperavam na piscina.'
  },
  {
    id: 'vt-039',
    referencia: 'at:8:37',
    pericope: 'O Eunuco Etiópico',
    tipo: 'adicao',
    descricao: 'A confissão de fé do eunuco ("Creio que Jesus Cristo é o Filho de Deus") e a resposta de Filipe estão ausentes dos manuscritos mais antigos.',
    manuscritos: ['Códice de Beza (05)', 'Manuscritos latinos'],
    evidenciaExterna: 'fraca',
    recomendacaoNA28: 'O versículo é omitido na NA28, colocado em notas de rodapé.',
    notas: 'A confissão pode ter sido adicionada como fórmula batismal primitiva.'
  },
  {
    id: 'vt-040',
    referencia: 'mt:6:13',
    pericope: 'O Pai Nosso',
    tipo: 'adicao',
    descricao: 'A doxologia final ("Porque teu é o reino, e o poder, e a glória, para sempre. Amém") está ausente dos manuscritos mais antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)', 'Alexandrino (02)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'A doxologia é omitida no texto principal, aparecendo em notas.',
    notas: 'A doxologia provavelmente veio da liturgia cristã primitiva.'
  },
  {
    id: 'vt-041',
    referencia: 'rm:8:16',
    pericope: 'O Testemunho do Espírito',
    tipo: 'mudanca',
    descricao: 'A variante entre "o próprio Espírito testifica" (τὸ πνεῦμα αὐτὸ συμμαρτυρεῖ) e "o Espírito testifica conosco" (τῷ πνεύματι ἡμῶν).',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Lê "o próprio Espírito".',
    notas: 'A leitura "conosco" pode ser mais original por ser mais difícil.'
  },
  {
    id: 'vt-042',
    referencia: '1co:15:47',
    pericope: 'O Último Adão',
    tipo: 'mudanca',
    descricao: 'A variante entre "o primeiro homem, Adão" e "o primeiro homem" (sem o nome Adão) — o nome pode ser uma glossa explicativa.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Inclui "Adão", mas com nota.',
    notas: 'A leitura sem "Adão" é mais provável por ser mais difícil.'
  },
  {
    id: 'vt-043',
    referencia: '2co:4:14',
    pericope: 'A Ressurreição',
    tipo: 'mudanca',
    descricao: 'A variante entre "o Senhor Jesus" e "Jesus" — a adição "Senhor" pode ser uma glossa cristológica.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Lê "o Senhor Jesus".',
    notas: 'A leitura mais curta é mais provável.'
  },
  {
    id: 'vt-044',
    referencia: 'gl:1:8',
    pericope: 'O Outro Evangelho',
    tipo: 'mudanca',
    descricao: 'A variante entre "nós" (ἡμεῖς) e "um anjo do céu" (ἀγγέλος ἐξ οὐρανοῦ) — a ordem pode variar.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'forte',
    recomendacaoNA28: 'Lê "um anjo do céu" primeiro.',
    notas: 'A ordem "anjo... nós" é mais provável por ser mais difícil.'
  },
  {
    id: 'vt-045',
    referencia: 'ef:5:32',
    pericope: 'O Mistério do Matrimônio',
    tipo: 'mudanca',
    descricao: 'A variante entre "mistério" (μυστήριον) e "sacramento" (μυστήριον/sacramentum) — a tradução latina influenciou a teologia do sacramento.',
    manuscritos: ['Vulgata', 'Manuscritos latinos'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Lê "mistério" no grego.',
    notas: 'A tradução "sacramento" da Vulgata influenciou a teologia católica romana.'
  },
  {
    id: 'vt-046',
    referencia: '1tm:3:16',
    pericope: 'O Mistério da Piedade',
    tipo: 'mudanca',
    descricao: 'A variante entre "Deus" (θεός) e "isto" (ὅ) — "Deus se manifestou em carne" vs "isto se manifestou em carne".',
    manuscritos: ['Sinaitico (01) — original', 'Vaticano (03)'],
    evidenciaExterna: 'forte',
    recomendacaoNA28: 'Lê "isto" (ὅ), não "Deus".',
    notas: 'A leitura "Deus" provavelmente surgiu por confusão entre ΟΣ e ΘΣ em letras maiúsculas.'
  },
  {
    id: 'vt-047',
    referencia: 'hb:4:15',
    pericope: 'O Sumo Sacerdote Compassivo',
    tipo: 'mudanca',
    descricao: 'A variante entre "tentado em tudo como nós" e "tentado em todas as coisas como nós, porém sem pecado".',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Inclui "porém sem pecado".',
    notas: 'A adição "porém sem pecado" pode ser uma glossa anti-docética.'
  },
  {
    id: 'vt-048',
    referencia: '1jo:2:22-23',
    pericope: 'O Negador do Filho',
    tipo: 'adicao',
    descricao: 'O versículo 2:23 contém uma adição tardia: "Quem confessa o Filho tem o Pai também" — pode ser uma glossa.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'A segunda parte do v.23 está em notas.',
    notas: 'A adição pode ter sido inspirada em 1 João 2:23.'
  },
  {
    id: 'vt-049',
    referencia: 'mt:27:24',
    pericope: 'A Inocência de Pilatos',
    tipo: 'mudanca',
    descricao: 'A variante entre "inocente" (ἀθῷος) e "justo" (δίκαιος) — "Eu sou inocente deste sangue" vs "Eu sou justo".',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Lê "inocente".',
    notas: 'A leitura "justo" pode ser mais original.'
  },
  {
    id: 'vt-050',
    referencia: 'mc:15:34',
    pericope: 'O Grito da Cruz',
    tipo: 'mudanca',
    descricao: 'A variante na transcrição aramaica: "Eloi, Eloi, lama sabachthani" (meu Deus, meu Deus, por que me desamparaste?) — a grafia varia entre manuscritos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'forte',
    recomendacaoNA28: 'Lê "Eloi".',
    notas: 'Mateus 27:46 escreve "Eli" — a diferença reflete dialetos aramaicos.'
  },
  {
    id: 'vt-051',
    referencia: 'jo:1:14',
    pericope: 'O Verbo Encarnado',
    tipo: 'mudanca',
    descricao: 'A variante entre "cheio de graça e de verdade" (χάριτος καὶ ἀληθείας) e "cheio de graça e verdade" (sem a segunda preposição).',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)', 'Papiro 66'],
    evidenciaExterna: 'forte',
    recomendacaoNA28: 'Lê com a segunda preposição.',
    notas: 'A leitura mais curta pode ser original.'
  },
  {
    id: 'vt-052',
    referencia: 'ap:22:14',
    pericope: 'A Bênção Final',
    tipo: 'mudanca',
    descricao: 'A variante entre "lavam suas vestes" (πλύνοντες τὰς στολὰς αὐτῶν) e "têm direito à árvore da vida" (ἐπὶ τῷ ξύλῳ τῆς ζωῆς).',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Lê "lavam suas vestes".',
    notas: 'A leitura "árvore da vida" pode ser mais original.'
  },
  {
    id: 'vt-053',
    referencia: 'mt:13:35',
    pericope: 'Os Tesouros Escondidos',
    tipo: 'mudanca',
    descricao: 'A variante entre "o profeta" e "Isaías, o profeta" — Mateus pode ter atribuído falsamente o salmo a Isaías.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Lê "o profeta" (sem nome).',
    notas: 'Alguns manuscritos adicionam "Isaías" para corrigir a atribuição.'
  },
  {
    id: 'vt-054',
    referencia: 'lc:2:33',
    pericope: 'Simeão e a Criança',
    tipo: 'mudanca',
    descricao: 'A variante entre "o pai e a mãe" (ὁ πατὴρ καὶ ἡ μήτηρ) e "José e a mãe dele" — Lucas evita chamar José de "pai" de Jesus.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'forte',
    recomendacaoNA28: 'Lê "José e a mãe".',
    notas: 'A leitura "pai e mãe" pode ser mais original, mas foi alterada por razões cristológicas.'
  },
  {
    id: 'vt-055',
    referencia: 'jo:19:14',
    pericope: 'A Sentença de Pilatos',
    tipo: 'mudanca',
    descricao: 'A variante entre "sexta-feira" (παρασκευή) e "preparação" (ἡ παρασκευὴ τοῦ πάσχα) — João pode ter usado "preparação" em sentido técnico.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'forte',
    recomendacaoNA28: 'Lê "preparação do páscoa".',
    notas: 'A discordância sinóptica sobre o dia da crucificação pode ser resolvida por esta variante.'
  },
  {
    id: 'vt-056',
    referencia: 'mt:24:36',
    pericope: 'O Dia e a Hora',
    tipo: 'omissao',
    descricao: 'As palavras "nem o Filho" (οὐδὲ ὁ υἱός) sobre o conhecimento do dia do juízo estão ausentes de alguns manuscritos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)', 'Alexandrino (02)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Incluído, mas com nota de divisão.',
    notas: 'Alguns omitiram por razões cristológicas (o Filho deveria saber tudo).'
  },
  {
    id: 'vt-057',
    referencia: 'mc:9:44',
    pericope: 'O Fogo Inextinguível',
    tipo: 'omissao',
    descricao: 'Os versículos 9:44 e 46 repetem 9:48 e podem ter sido adicionados por escribas.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Omitidos na edição NA28.',
    notas: 'A repetição tripla (v.44, 46, 48) pode ser uma expandôncia homilética.'
  },
  {
    id: 'vt-058',
    referencia: 'jo:1:18',
    pericope: 'O Filho Unigênito',
    tipo: 'mudanca',
    descricao: 'A variante entre "Deus" (θεός) e "Filho" (υἱός) — o único que está no seio do Pai.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)', 'Alexandrino (02)'],
    evidenciaExterna: 'forte',
    recomendacaoNA28: 'Lê "Deus" (θεός).',
    notas: 'A leitura "Filho" pode ser uma harmonização com 3:16.'
  },
  {
    id: 'vt-059',
    referencia: 'ef:3:9',
    pericope: 'O Mistério Escondido',
    tipo: 'omissao',
    descricao: 'As palavras "em Cristo Jesus" (ἐν Χριστῷ Ἰησοῦ) estão ausentes de alguns manuscritos.',
    manuscritos: ['Alexandrino (02)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Omitido na edição NA28.',
    notas: 'Possível harmonização com outros passos paulinos.'
  },
  {
    id: 'vt-060',
    referencia: '1tm:3:16',
    pericope: 'O Mistério da Piedade',
    tipo: 'mudanca',
    descricao: 'A variante entre "Deus" (θεός) e "quem" (ὅς) — "Deus foi manifestado na carne".',
    manuscritos: ['Alexandrino (02)', 'Vaticano (03)'],
    evidenciaExterna: 'forte',
    recomendacaoNA28: 'Lê "quem" (ὅς).',
    notas: 'A leitura "Deus" é uma corrupção antiga por cambio de grafia (ΟΣ → ΘΣ).'
  },
  {
    id: 'vt-061',
    referencia: 'hb:2:9',
    pericope: 'O Sofrimento de Jesus',
    tipo: 'mudanca',
    descricao: 'A variante entre "exceto Jesus" (χωρὶς Ἰησοῦ) e "por graça de Deus" (χάριτι θεοῦ).',
    manuscritos: ['Alexandrino (02)', 'Vaticano (03)'],
    evidenciaExterna: 'forte',
    recomendacaoNA28: 'Lê "por graça de Deus".',
    notas: 'A leitura "exceto Jesus" pode refletir uma tradição interpretativa mais antiga.'
  },
  {
    id: 'vt-062',
    referencia: '1pe:5:10',
    pericope: 'A Graça Eterna',
    tipo: 'mudanca',
    descricao: 'A variante entre "Cristo" (Χριστοῦ) e "Jesus" (Ἰησοῦ) — a chamada de graça.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Lê "Cristo Jesus".',
    notas: 'A forma abreviada pode ser original, com expansão posterior.'
  },
  {
    id: 'vt-063',
    referencia: 'ap:1:8',
    pericope: 'Alfa e Ômega',
    tipo: 'mudanca',
    descricao: 'A atribuição das palavras "Alfa e Ômega" — é Deus (v.8) ou Cristo (v.11)?',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'No v.8, as palavras são de Deus; no v.11, omitidas por alguns.',
    notas: 'A atribuição ao Cristo glorificado é tema debatido na cristologia joanina.'
  },
  {
    id: 'vt-064',
    referencia: 'mt:5:22',
    pericope: 'A Raiva',
    tipo: 'mudanca',
    descricao: 'A variante entre "sem causa" (εἰκῆ) e a omissão — alguns manuscritos omitem a restrição.',
    manuscritos: ['Alexandrino (02)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Incluído "sem causa", mas com nota.',
    notas: 'A omissão pode ser original (leitura mais dura), com "sem causa" sendo uma suavização.'
  },
  {
    id: 'vt-065',
    referencia: 'mc:15:28',
    pericope: 'A Profecia de Isaías',
    tipo: 'omissao',
    descricao: 'O versículo "E foi cumprida a Escritura que diz: E foi contado com os transgressores" está ausente dos manuscritos mais antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: 'forte',
    recomendacaoNA28: 'O versículo é omitido na edição NA28.',
    notas: 'Interpolação de Isaías 53:12 no contexto da crucificação.'
  },
  {
    id: 'vt-066',
    referencia: 'jo:3:13',
    pericope: 'O Filho do Homem',
    tipo: 'omissao',
    descricao: 'As palavras "que está nos céus" (ὁ ὢν ἐν τῷ οὐρανῷ) estão ausentes de alguns manuscritos antigos.',
    manuscritos: ['Papiro 66', 'Sinaitico (01)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Incluído, mas com nota.',
    notas: 'Pode ser uma adição cristológica posterior para enfatizar a preexistência.'
  },
  {
    id: 'vt-067',
    referencia: 'rm:8:1',
    pericope: 'Sem Condenação',
    tipo: 'omissao',
    descricao: 'As palavras "em Cristo Jesus" (ἐν Χριστῷ Ἰησοῦ) e "depois do Espírito" estão em diferentes configurações.',
    manuscritos: ['Alexandrino (02)', 'Vaticano (03)'],
    evidenciaExterna: 'forte',
    recomendacaoNA28: 'Lê "em Cristo Jesus" após "condenados".',
    notas: 'A ordem das palavras varia significativamente entre as tradições.'
  },
  {
    id: 'vt-068',
    referencia: 'cl:1:14',
    pericope: 'O Sangue de Cristo',
    tipo: 'omissao',
    descricao: 'As palavras "pelo seu sangue" (διὰ τοῦ αἵματος αὐτοῦ) estão ausentes de alguns manuscritos.',
    manuscritos: ['Alexandrino (02)', 'Vaticano (03)'],
    evidenciaExterna: 'moderada',
    recomendacaoNA28: 'Omitido na edição NA28.',
    notas: 'Harmonização com Ef 1:7.'
  },
  {
    id: 'vt-069',
    referencia: '2co:5:17',
    pericope: 'A Nova Criatura',
    tipo: 'mudanca',
    descricao: 'A variante entre "quem está em Cristo" (τῷ ἐν Χριστῷ) e "quem é em Cristo".',
    manuscritos: ['Alexandrino (02)', 'Vaticano (03)'],
    evidenciaExterna: 'forte',
    recomendacaoNA28: 'Lê "se alguém está em Cristo".',
    notas: 'A construção grega varia entre participio e condicional.'
  },
  {
    id: 'vt-070',
    referencia: 'gl:3:1',
    pericope: 'A Cruz de Cristo',
    tipo: 'mudanca',
    descricao: 'A variante entre "provar" (πείθω) e "encantar" (ἐβάσκανε) — " quem vos fascinou para não obedeceis à verdade?"',
    manuscritos: ['Alexandrino (02)', 'Vaticano (03)'],
    evidenciaExterna: 'forte',
    recomendacaoNA28: 'Lê "provar".',
    notas: 'A palavra rara ἐβάskaine pode ser original (hapax legomenon).'
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
  return variantes.some(v => v.evidenciaExterna === 'fraca' || v.tipo === 'adicao' || v.tipo === 'omissao');
}
