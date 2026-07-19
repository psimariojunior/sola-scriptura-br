class CrossReferenceLocal {
  final String referencia;
  final String? texto;
  final String tipo;

  const CrossReferenceLocal({
    required this.referencia,
    this.texto,
    this.tipo = 'paralela',
  });
}

class CrossReferencesService {
  CrossReferencesService();

  List<CrossReferenceLocal> getReferencias(
    String livro,
    int capitulo,
    int versiculo,
  ) {
    final key = '$livro:$capitulo:$versiculo';
    final list = _refs[key] ?? _refs['default'] ?? [];
    return list
        .map((m) => CrossReferenceLocal(
              referencia: m['referencia']!,
              texto: m['texto'],
              tipo: m['tipo'] ?? 'paralela',
            ))
        .toList();
  }
}

const Map<String, List<Map<String, String?>>> _refs = {
  'default': [
    {
      'referencia': 'Salmos 119:105',
      'texto': 'Lâmpada para os meus pés é a tua palavra e luz para o meu caminho.',
      'tipo': 'paralela',
    },
    {
      'referencia': 'Josué 1:8',
      'texto': 'Não cesses de falar deste livro da lei; antes, medita nele dia e noite.',
      'tipo': 'tematica',
    },
  ],
  'gn:1:1': [
    {
      'referencia': 'João 1:1-3',
      'texto': 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.',
      'tipo': 'cumprimento',
    },
    {
      'referencia': 'Hebreus 11:3',
      'texto': 'Pela fé entendemos que os mundos foram criados pela palavra de Deus.',
      'tipo': 'paralela',
    },
    {
      'referencia': 'Salmos 33:6',
      'texto': 'Pela palavra do Senhor foram feitos os céus.',
      'tipo': 'paralela',
    },
    {
      'referencia': 'Apocalipse 4:11',
      'texto': 'Tu és digno, Senhor, de receber a glória, a honra e o poder.',
      'tipo': 'tematica',
    },
  ],
  'jo:3:16': [
    {
      'referencia': '1 João 4:9-10',
      'texto': 'Nisto se manifestou o amor de Deus para conosco: em que Deus enviou seu Filho unigênito ao mundo.',
      'tipo': 'paralela',
    },
    {
      'referencia': 'Romanos 5:8',
      'texto': 'Mas Deus prova o seu amor para conosco em que Cristo morreu por nós.',
      'tipo': 'paralela',
    },
    {
      'referencia': 'Efésios 2:4-5',
      'texto': 'Mas Deus, que é riquíssimo em misericórdia, pelo seu muito amor.',
      'tipo': 'paralela',
    },
    {
      'referencia': 'Tito 3:4-5',
      'texto': 'Mas, quando apareceu a bondade de Deus, nosso Salvador, e o seu amor para com os homens.',
      'tipo': 'paralela',
    },
  ],
  'rm:8:28': [
    {
      'referencia': 'Efésios 1:11',
      'texto': 'Nele fomos também feitos herança.',
      'tipo': 'paralela',
    },
    {
      'referencia': 'Jeremias 29:11',
      'texto': 'Eu é que sei os planos que tenho para vós.',
      'tipo': 'paralela',
    },
    {
      'referencia': 'Gênesis 50:20',
      'texto': 'Vós bem intentastes contra mim o mal, mas Deus o intentou para o bem.',
      'tipo': 'tematica',
    },
  ],
  'fp:4:13': [
    {
      'referencia': '2 Coríntios 12:9-10',
      'texto': 'A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza.',
      'tipo': 'paralela',
    },
    {
      'referencia': 'Isaías 41:10',
      'texto': 'Não temas, porque eu sou contigo.',
      'tipo': 'paralela',
    },
    {
      'referencia': 'Josué 1:9',
      'texto': 'Sê forte e corajoso; não pasmes, nem te espantes.',
      'tipo': 'tematica',
    },
  ],
  '1co:13:4': [
    {
      'referencia': '1 João 4:8',
      'texto': 'Deus é amor.',
      'tipo': 'paralela',
    },
    {
      'referencia': 'Gálatas 5:22-23',
      'texto': 'Mas o fruto do Espírito é amor, alegria, paz.',
      'tipo': 'tematica',
    },
    {
      'referencia': 'Colossenses 3:14',
      'texto': 'Acima de tudo, tende amor, que é o vínculo da perfeição.',
      'tipo': 'paralela',
    },
  ],
};
