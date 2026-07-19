enum NivelCerteza { forte, moderada, fraca }

enum TipoVariante { adicao, omissao, mudanca, transposicao }

class VarianteTextual {
  final String id;
  final String referencia;
  final String pericope;
  final TipoVariante tipo;
  final String descricao;
  final List<String> manuscritos;
  final NivelCerteza evidenciaExterna;
  final String? recomendacaoNA28;
  final String? textoRecebido;
  final String? notas;

  const VarianteTextual({
    required this.id,
    required this.referencia,
    required this.pericope,
    required this.tipo,
    required this.descricao,
    required this.manuscritos,
    required this.evidenciaExterna,
    this.recomendacaoNA28,
    this.textoRecebido,
    this.notas,
  });

  String get tipoLabel {
    switch (tipo) {
      case TipoVariante.adicao:
        return 'Adição';
      case TipoVariante.omissao:
        return 'Omissão';
      case TipoVariante.mudanca:
        return 'Mudança';
      case TipoVariante.transposicao:
        return 'Transposição';
    }
  }

  String get evidenciaLabel {
    switch (evidenciaExterna) {
      case NivelCerteza.forte:
        return 'Forte';
      case NivelCerteza.moderada:
        return 'Moderada';
      case NivelCerteza.fraca:
        return 'Fraca';
    }
  }
}

const List<VarianteTextual> variantesData = [
  VarianteTextual(
    id: 'vt-001',
    referencia: 'mc:16:9-20',
    pericope: 'A Ressurreição e a Grande Comissão',
    tipo: TipoVariante.adicao,
    descricao: 'O final de Marcos (versos 9-20) está ausente nos manuscritos mais antigos e melhores. Eusébio e Jerônimo mencionam que esta passagem não se encontrava na maioria dos exemplares gregos de sua época.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)', 'Alexandrino (02)'],
    evidenciaExterna: NivelCerteza.fraca,
    recomendacaoNA28: 'Os versos 9-20 são incluídos entre colchetes, indicando dúvida sobre a autenticidade.',
    textoRecebido: 'Mas, tendo ressuscitado cedo no primeiro dia da semana, apareceu primeiro a Maria Madalena.',
    notas: 'Alguns manuscritos posteriores contêm esta passagem. A versão curta termina em mc:16:8.',
  ),
  VarianteTextual(
    id: 'vt-002',
    referencia: 'jo:7:53-8:11',
    pericope: 'A Adúltera Perdoada',
    tipo: TipoVariante.adicao,
    descricao: 'A história da mulher adúltera não se encontra nos manuscritos mais antigos de João. O texto pula de 7:52 diretamente para 8:12 em muitos testemunhos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)', 'Papiro 66', 'Papiro 75'],
    evidenciaExterna: NivelCerteza.fraca,
    recomendacaoNA28: 'O trecho está entre colchetes, com indicação de que sua localização original é incerta.',
    notas: 'A passagem aparece em diferentes locais em alguns manuscritos: após Jo 21:25, após Lc 21:38, ou em Jo 7:36.',
  ),
  VarianteTextual(
    id: 'vt-003',
    referencia: '1jo:5:7-8',
    pericope: 'A Trindade no Texto',
    tipo: TipoVariante.adicao,
    descricao: 'A chamada "Comissão Trinitária" (Comma Johanneum) — "Pois três são os que testificam no céu: o Pai, a Palavra e o Espírito Santo" — não aparece em nenhum manuscrito grego anterior ao século XVI.',
    manuscritos: ['Textus Receptus', 'Manuscritos latinos tardios'],
    evidenciaExterna: NivelCerteza.fraca,
    recomendacaoNA28: 'Estes versos são omitidos na edição NA28, considerados uma glossa posterior.',
    textoRecebido: 'Pois três são os que testificam no céu: o Pai, a Palavra e o Espírito Santo; e estes três são um.',
    notas: 'A adição trinitária provavelmente entrou no texto latino a partir de uma nota marginal.',
  ),
  VarianteTextual(
    id: 'vt-004',
    referencia: 'mt:17:21',
    pericope: 'A Fé na Oração',
    tipo: TipoVariante.omissao,
    descricao: 'O versículo "Mas esta espécie não sai senão pela oração e pelo jejum" está ausente dos melhores manuscritos gregos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)', 'Alexandrino (02)'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'O versículo 17:21 é omitido na edição NA28.',
    notas: 'O versículo foi provavelmente copiado de Mc 9:29.',
  ),
  VarianteTextual(
    id: 'vt-005',
    referencia: 'mc:11:26',
    pericope: 'O Perdão',
    tipo: TipoVariante.omissao,
    descricao: 'O versículo "Mas, se vós não perdoardes, tampouco vosso Pai perdoará" está ausente dos manuscritos mais antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'O versículo é omitido na edição NA28.',
    notas: 'Foi provavelmente interpolado a partir de Mt 6:15.',
  ),
  VarianteTextual(
    id: 'vt-006',
    referencia: 'mt:18:11',
    pericope: 'A Perda e o Achado',
    tipo: TipoVariante.omissao,
    descricao: 'O versículo "Porque o Filho do Homem veio salvar o que se havia perdido" está ausente dos manuscritos mais antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)', 'Alexandrino (02)'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'O versículo é omitido na edição NA28.',
    notas: 'Foi provavelmente copiado de Lc 19:10.',
  ),
  VarianteTextual(
    id: 'vt-007',
    referencia: 'lc:22:43-44',
    pericope: 'A Agonia no Getsêmani',
    tipo: TipoVariante.omissao,
    descricao: 'Os versículos que descrevem o suor de sangue de Jesus e o anjo que o fortalece estão ausentes de alguns manuscritos importantes.',
    manuscritos: ['Alexandrino (02)', 'Vaticano (03) — omitidos em parte'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'Os versículos são incluídos, mas com nota de que a evidência é dividida.',
    notas: 'Alguns estudiosos argumentam que foram omitidos por razões teológicas (docetismo).',
  ),
  VarianteTextual(
    id: 'vt-008',
    referencia: 'lc:23:34',
    pericope: 'O Perdão na Cruz',
    tipo: TipoVariante.omissao,
    descricao: 'As palavras "Pai, perdoa-lhes, porque não sabem o que fazem" estão ausentes de alguns manuscritos antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03) — variantes'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'O versículo é incluído, mas com nota de divisão na evidência.',
    notas: 'Pode ter sido omitido por escribas que julgavam que os judeus deveriam saber o que faziam.',
  ),
  VarianteTextual(
    id: 'vt-009',
    referencia: 'jo:5:3b-4',
    pericope: 'A Piscina de Betesda',
    tipo: TipoVariante.adicao,
    descricao: 'A explicação sobre o anjo que agitava a água da piscina está ausente dos manuscritos mais antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)', 'Alexandrino (02)'],
    evidenciaExterna: NivelCerteza.fraca,
    recomendacaoNA28: 'O versículo 4 é omitido na edição NA28.',
    notas: 'O versículo foi provavelmente adicionado como explicação marginal.',
  ),
  VarianteTextual(
    id: 'vt-010',
    referencia: 'at:8:37',
    pericope: 'O Batismo do Eunuco Etíope',
    tipo: TipoVariante.omissao,
    descricao: 'O versículo com a confissão de fé do eunuco está ausente dos manuscritos mais antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: NivelCerteza.fraca,
    recomendacaoNA28: 'O versículo é omitido na edição NA28.',
    notas: 'Foi provavelmente adicionado como glossa litúrgica.',
  ),
  VarianteTextual(
    id: 'vt-011',
    referencia: 'rm:16:24',
    pericope: 'Saudações Finais',
    tipo: TipoVariante.omissao,
    descricao: 'O versículo "A graça de nosso Senhor Jesus Cristo seja com todos. Amém." está ausente dos melhores manuscritos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'O versículo é omitido na edição NA28.',
    notas: 'A fórmula de graça pode ter sido adicionada de outras epístolas.',
  ),
  VarianteTextual(
    id: 'vt-012',
    referencia: '1co:14:34-35',
    pericope: 'O Silêncio das Mulheres',
    tipo: TipoVariante.transposicao,
    descricao: 'A ordem de que as mulheres se calassem na assembleia pode ser uma interpolação ou ter posição original diferente.',
    manuscritos: ['Diversos manuscritos — posição variantes'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'Os versículos são incluídos, mas com nota sobre a possibilidade de interpolação.',
    notas: 'Alguns manuscritos colocam estes versículos após 14:40.',
  ),
  VarianteTextual(
    id: 'vt-013',
    referencia: 'ef:1:1',
    pericope: 'Saudação',
    tipo: TipoVariante.omissao,
    descricao: 'A expressão "em Efeso" está ausente de algumas versões importantes do texto.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03) — variantes'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'Incluído, mas com nota de dúvida.',
    notas: 'Pode indicar que a epístola era circular, destinada a várias igrejas.',
  ),
  VarianteTextual(
    id: 'vt-014',
    referencia: 'cl:1:14',
    pericope: 'Redenção',
    tipo: TipoVariante.adicao,
    descricao: 'A frase "pelo seu sangue" após "redenção" está ausente dos manuscritos mais antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'A frase "pelo seu sangue" é omitida na NA28.',
    notas: 'A adição provavelmente veio de Ef 1:7.',
  ),
  VarianteTextual(
    id: 'vt-015',
    referencia: '1jo:5:7',
    pericope: 'Comissão Trinitária',
    tipo: TipoVariante.adicao,
    descricao: 'Veja vt-003. A adição Trinitária é uma das variantes textuais mais conhecidas do NT.',
    manuscritos: ['Textus Receptus', 'Manuscritos latinos tardios'],
    evidenciaExterna: NivelCerteza.fraca,
    recomendacaoNA28: 'Omitido na NA28.',
    notas: 'Ausente em todos os manuscritos gregos antigos. Presente em 6-7 manuscritos gregos tardios (séc. XVI-XVII).',
  ),
  VarianteTextual(
    id: 'vt-016',
    referencia: 'mt:23:14',
    pericope: 'As Sete Maldições',
    tipo: TipoVariante.omissao,
    descricao: 'O versículo sobre devorar casas de viúvas está ausente dos manuscritos mais antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'O versículo é omitido na NA28.',
    notas: 'Foi provavelmente interpolado de Mc 12:40 e Lc 20:47.',
  ),
  VarianteTextual(
    id: 'vt-017',
    referencia: 'mc:9:44',
    pericope: 'O Fogo do Inferno',
    tipo: TipoVariante.omissao,
    descricao: 'Os versículos 44 e 46 (replicação do v. 42) estão ausentes dos melhores manuscritos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'Os versículos 44 e 46 são omitidos na NA28.',
    notas: 'A repetição pode ter sido uma interpolação explicativa.',
  ),
  VarianteTextual(
    id: 'vt-018',
    referencia: 'jo:1:18',
    pericope: 'O Verbo Encarnado',
    tipo: TipoVariante.mudanca,
    descricao: 'A variante entre "o unigênito Deus" (μονογενὴς θεός) e "o unigênito Filho" (ὁ μονογενὴς υἱός).',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)', 'Alexandrino (02)'],
    evidenciaExterna: NivelCerteza.forte,
    recomendacaoNA28: 'Lê "o unigênito Deus" (μονογενὴς θεός).',
    notas: 'O termo monogenés é debatido: pode significar "unigênito" ou "único".',
  ),
  VarianteTextual(
    id: 'vt-019',
    referencia: 'at:20:28',
    pericope: 'A Igreja de Deus',
    tipo: TipoVariante.mudanca,
    descricao: 'A variante entre "a igreja de Deus" (θεοῦ) versus "a igreja do Senhor" (κυρίου).',
    manuscritos: ['Alexandrino (02)', 'Vaticano (03)'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'Lê "a igreja de Deus".',
    notas: 'A leitura "Deus" é mais provável por causa da dificuldade do copista.',
  ),
  VarianteTextual(
    id: 'vt-020',
    referencia: 'rm:5:1',
    pericope: 'Justificação',
    tipo: TipoVariante.mudanca,
    descricao: 'A variante entre "temos paz" (ἔχομεν) e "tenhamos paz" (σχῶμεν) — indicativo versus subjuntivo.',
    manuscritos: ['Diversos manuscritos'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'Lê "temos" (indicativo).',
    notas: 'A leitura indicativa é mais difícil e, portanto, provavelmente original.',
  ),
  VarianteTextual(
    id: 'vt-021',
    referencia: 'hb:2:9',
    pericope: 'A Morte de Jesus',
    tipo: TipoVariante.mudanca,
    descricao: 'A variante entre "pela graça de Deus" (χάριτι θεοῦ) e "sem Deus" (χωρὶς θεοῦ).',
    manuscritos: ['Alexandrino (02)', 'Vaticano (03)'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'Lê "pela graça de Deus".',
    notas: 'A leitura "sem Deus" é tão surpreendente que provavelmente não foi inventada.',
  ),
  VarianteTextual(
    id: 'vt-022',
    referencia: 'mt:6:13',
    pericope: 'O Pai Nosso',
    tipo: TipoVariante.adicao,
    descricao: 'A doxologia final "Pois teu é o reino, e o poder, e a glória, para sempre. Amém." está ausente dos manuscritos mais antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'A doxologia é omitida na NA28.',
    notas: 'A doxologia provavelmente veio da liturgia cristã primitiva.',
  ),
  VarianteTextual(
    id: 'vt-023',
    referencia: 'jo:19:14',
    pericope: 'A Sentença de Pilatos',
    tipo: TipoVariante.mudanca,
    descricao: 'A variante entre "sexta" (ἕκτη) e "terceira" (τρίτη) — o horário em que Pilatos apresentou Jesus.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: NivelCerteza.forte,
    recomendacaoNA28: 'Lê "sexta hora".',
    notas: 'A divergência pode refletir diferentes tradições sobre o horário.',
  ),
  VarianteTextual(
    id: 'vt-024',
    referencia: 'lc:3:22',
    pericope: 'O Batismo de Jesus',
    tipo: TipoVariante.mudanca,
    descricao: 'Uma variante rara onde a voz do céu diz "Tu és meu Filho amado; hoje te gerei" (Sl 2:7) em vez do relato canônico.',
    manuscritos: ['Codex Bezae (05)', 'Manuscritos latinos antigos'],
    evidenciaExterna: NivelCerteza.fraca,
    notas: 'A leitura citando o Sl 2:7 pode refletir uma tradição adopcionista.',
  ),
  VarianteTextual(
    id: 'vt-025',
    referencia: 'rm:9:5',
    pericope: 'Israel e Cristo',
    tipo: TipoVariante.mudanca,
    descricao: 'A pontuação determina se Cristo é chamado "Deus sobre todas as coisas" ou se a frase é uma bênção separada.',
    manuscritos: ['Diversos manuscritos — pontuação variantes'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'Inclui a declaração cristológica.',
    notas: 'A vírgula (ou sua ausência) muda completamente o significado teológico.',
  ),
  VarianteTextual(
    id: 'vt-026',
    referencia: '1co:11:24',
    pericope: 'A Ceia do Senhor',
    tipo: TipoVariante.mudanca,
    descricao: 'A variante sobre a presença ou ausência de "partido/quebrado" (κλώμενον) após "que é por vós".',
    manuscritos: ['Alexandrino (02)', 'Vaticano (03)'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'Lê "isto é o meu corpo, que é dado por vós".',
    notas: 'A questão é se Jesus disse "quebrado" ou não.',
  ),
  VarianteTextual(
    id: 'vt-027',
    referencia: 'ef:3:9',
    pericope: 'O Mistério Oculto',
    tipo: TipoVariante.mudanca,
    descricao: 'A variante entre "comunhão do mistério" (κοινωνία) e "administração do mistério" (οἰκονομία).',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'Lê "comunhão".',
    notas: 'As duas palavras são facilmente confundidas em manuscritos.',
  ),
  VarianteTextual(
    id: 'vt-028',
    referencia: 'cl:2:2',
    pericope: 'O Tesouro da Sabedoria',
    tipo: TipoVariante.mudanca,
    descricao: 'A variante entre "o mistério de Deus, o Pai" e "de Deus, em Cristo".',
    manuscritos: ['Alexandrino (02)', 'Vaticano (03)'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'Lê "de Deus, o Pai, e de Cristo".',
    notas: 'Reflete uma tradição mais antiga sobre a relação Pai-Filho.',
  ),
  VarianteTextual(
    id: 'vt-029',
    referencia: '1jo:4:3',
    pericope: 'O Espírito da Mentira',
    tipo: TipoVariante.mudanca,
    descricao: 'A variante entre "não confessou" (οὐχ ὡμολόγησεν) e "negou" (λέλυκεν).',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: NivelCerteza.forte,
    recomendacaoNA28: 'Lê "não confessou".',
    notas: 'A leitura "não confessou" é mais provável por ser mais difícil.',
  ),
  VarianteTextual(
    id: 'vt-030',
    referencia: 'mt:24:36',
    pericope: 'Sobre o Dia e a Hora',
    tipo: TipoVariante.mudanca,
    descricao: 'A variante entre "nem o Filho" (οὐδὲ ὁ υἱός) — omitido em alguns manuscritos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03) — variantes'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'A frase "nem o Filho" é incluída, mas com nota de dúvida.',
    notas: 'Pode ter sido omitido por razões cristológicas.',
  ),
  VarianteTextual(
    id: 'vt-031',
    referencia: 'jo:1:34',
    pericope: 'O Testemunho de João Batista',
    tipo: TipoVariante.mudanca,
    descricao: 'A variante entre "Filho de Deus" (υἱὸς τοῦ θεοῦ) e "o Eleito de Deus" (ὁ ἐκλεκτὸς τοῦ θεοῦ).',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'Lê "Filho de Deus".',
    notas: 'A leitura "eleito" é mais difícil e pode ser original.',
  ),
  VarianteTextual(
    id: 'vt-032',
    referencia: 'at:15:34',
    pericope: 'A Permanência de Judas e Silas',
    tipo: TipoVariante.omissao,
    descricao: 'O versículo "Mas Judas ficou ali" está ausente dos manuscritos mais antigos.',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'O versículo é omitido na NA28.',
    notas: 'O versículo provavelmente foi adicionado para resolver uma dificuldade narrativa.',
  ),
  VarianteTextual(
    id: 'vt-033',
    referencia: 'rm:8:1',
    pericope: 'A Liberdade em Cristo',
    tipo: TipoVariante.mudanca,
    descricao: 'A variante entre "nenhuma condenação" e "nenhuma condenação para aqueles que estão em Cristo Jesus".',
    manuscritos: ['Sinaitico (01)', 'Vaticano (03)'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'Lê "nenhuma condenação".',
    notas: 'A leitura mais curta é mais provável por ser mais difícil.',
  ),
  VarianteTextual(
    id: 'vt-034',
    referencia: 'hb:10:34',
    pericope: 'Os Sofrimentos dos Cristãos',
    tipo: TipoVariante.mudanca,
    descricao: 'A variante entre "vosso próprio" (τοῖς ἰδίοις) e "meus" (μου) — referindo-se aos pertences.',
    manuscritos: ['Alexandrino (02)', 'Vaticano (03)'],
    evidenciaExterna: NivelCerteza.moderada,
    recomendacaoNA28: 'Lê "vosso próprio".',
    notas: 'A leitura "meus" pode refletir uma tradição mais antiga.',
  ),
  VarianteTextual(
    id: 'vt-035',
    referencia: 'mt:27:49',
    pericope: 'A Morte de Jesus',
    tipo: TipoVariante.adicao,
    descricao: 'Uma nota que diz "E o soldado, ferindo-o com a lança, abriu seu lado" — pode ser uma interpolação de Jo 19:34.',
    manuscritos: ['Sinaitico (01)', 'Alexandrino (02)'],
    evidenciaExterna: NivelCerteza.fraca,
    notas: 'Esta variante aparece no Sinaitico em lugar diferente do relato de João.',
  ),
];

List<VarianteTextual> getVariantesPorLivro(String livro) {
  final prefixo = '${livro.toLowerCase()}:';
  return variantesData.where((v) => v.referencia.startsWith(prefixo)).toList();
}

List<VarianteTextual> getVariantesPorReferencia(String livro, int capitulo, int versiculo) {
  final ref = '${livro.toLowerCase()}:$capitulo:$versiculo';
  return variantesData.where((v) => v.referencia.contains(ref)).toList();
}
