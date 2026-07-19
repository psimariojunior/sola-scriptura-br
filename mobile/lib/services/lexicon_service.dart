import '../models/lexicon.dart';

class LexiconService {
  LexiconService();

  PalavraLexicon? getPalavra(String strong, String idioma) {
    final key = strong.toUpperCase();
    final list = idioma == 'grego' ? _grego : _hebraico;
    return list.firstWhere(
      (p) => p.strong == key,
      orElse: () => PalavraLexicon(
        strong: key,
        palavra: '',
        transliteracao: '',
        definicao: '',
        idioma: idioma,
      ),
    ).palavra.isEmpty
        ? null
        : list.firstWhere((p) => p.strong == key);
  }

  List<PalavraLexicon> buscar(String query, String idioma) {
    if (query.trim().isEmpty) {
      if (idioma == 'grego') return List.of(_grego);
      if (idioma == 'hebraico') return List.of(_hebraico);
      return [..._grego, ..._hebraico];
    }
    final q = query.toLowerCase();
    final source = idioma == 'grego'
        ? _grego
        : idioma == 'hebraico'
            ? _hebraico
            : [..._grego, ..._hebraico];
    return source.where((p) {
      return p.palavra.toLowerCase().contains(q) ||
          p.transliteracao.toLowerCase().contains(q) ||
          p.strong.toLowerCase().contains(q) ||
          p.definicao.toLowerCase().contains(q);
    }).toList();
  }
}

const List<PalavraLexicon> _grego = [
  PalavraLexicon(
    strong: 'G26',
    palavra: 'ἀγάπη',
    transliteracao: 'agape',
    definicao:
        'Amor incondicional, benevolente; o tipo de amor que Deus tem pela humanidade e que ordena aos crentes terem uns pelos outros.',
    idioma: 'grego',
  ),
  PalavraLexicon(
    strong: 'G2316',
    palavra: 'θεός',
    transliteracao: 'theos',
    definicao: 'Deus, divindade; o ser supremo, criador e soberano do universo.',
    idioma: 'grego',
  ),
  PalavraLexicon(
    strong: 'G5547',
    palavra: 'χριστός',
    transliteracao: 'christos',
    definicao:
        'Ungido; o Messias prometido, título aplicado a Jesus de Nazaré como o Cristo de Deus.',
    idioma: 'grego',
  ),
  PalavraLexicon(
    strong: 'G4151',
    palavra: 'πνεῦμα',
    transliteracao: 'pneuma',
    definicao:
        'Espírito, sopro, vento; designa o Espírito Santo, o espírito humano ou qualquer espírito.',
    idioma: 'grego',
  ),
  PalavraLexicon(
    strong: 'G3056',
    palavra: 'λόγος',
    transliteracao: 'logos',
    definicao:
        'Palavra, discurso, razão; no Evangelho de João, refere-se a Cristo como a Palavra eterna de Deus.',
    idioma: 'grego',
  ),
  PalavraLexicon(
    strong: 'G4102',
    palavra: 'πίστις',
    transliteracao: 'pistis',
    definicao:
        'Fé, confiança, convicção; a firme persuasion da verdade das coisas que Deus revelou.',
    idioma: 'grego',
  ),
  PalavraLexicon(
    strong: 'G1680',
    palavra: 'ἐλπίς',
    transliteracao: 'elpis',
    definicao: 'Esperança, expectativa confiante; confiança no cumprimento das promessas divinas.',
    idioma: 'grego',
  ),
  PalavraLexicon(
    strong: 'G5485',
    palavra: 'χάρις',
    transliteracao: 'charis',
    definicao:
        'Graça, favor imerecido; o favor de Deus concedido ao homem sem mérito humano.',
    idioma: 'grego',
  ),
  PalavraLexicon(
    strong: 'G266',
    palavra: 'ἁμαρτία',
    transliteracao: 'hamartia',
    definicao: 'Pecado, erro, transgressão; falhar em atingir o alvo moral de Deus.',
    idioma: 'grego',
  ),
  PalavraLexicon(
    strong: 'G4991',
    palavra: 'σωτηρία',
    transliteracao: 'soteria',
    definicao: 'Salvação, libertação; a obra de Deus ao resgatar a humanidade do pecado.',
    idioma: 'grego',
  ),
  PalavraLexicon(
    strong: 'G1343',
    palavra: 'δικαιοσύνη',
    transliteracao: 'dikaiosyne',
    definicao: 'Justiça, retidão; a condição de estar em conformidade com a vontade de Deus.',
    idioma: 'grego',
  ),
  PalavraLexicon(
    strong: 'G1242',
    palavra: 'διαθήκη',
    transliteracao: 'diatheke',
    definicao: 'Aliança, testamento; pacto solene entre Deus e o homem.',
    idioma: 'grego',
  ),
  PalavraLexicon(
    strong: 'G1997',
    palavra: 'ἐπιστρέφω',
    transliteracao: 'epistrepho',
    definicao: 'Converter-se, voltar; arrepender-se e voltar para Deus.',
    idioma: 'grego',
  ),
  PalavraLexicon(
    strong: 'G1818',
    palavra: 'ἐξαγοράζω',
    transliteracao: 'exagorazo',
    definicao: 'Resgatar, redimir; comprar de volta, libertar do cativeiro.',
    idioma: 'grego',
  ),
  PalavraLexicon(
    strong: 'G1391',
    palavra: 'δόξα',
    transliteracao: 'doxa',
    definicao:
        'Glória, honra, majestade; a manifestação da presença e natureza de Deus.',
    idioma: 'grego',
  ),
];

const List<PalavraLexicon> _hebraico = [
  PalavraLexicon(
    strong: 'H430',
    palavra: 'אֱלֹהִים',
    transliteracao: 'elohim',
    definicao:
        'Deus, divindade; o nome geral para Deus, enfatizando seu poder e juízo.',
    idioma: 'hebraico',
  ),
  PalavraLexicon(
    strong: 'H3068',
    palavra: 'יהוה',
    transliteracao: 'YHWH',
    definicao:
        'O nome próprio de Deus, o tetragrama sagrado; significa "Eu Sou O Que Sou".',
    idioma: 'hebraico',
  ),
  PalavraLexicon(
    strong: 'H1254',
    palavra: 'בָּרָא',
    transliteracao: 'bara',
    definicao:
        'Criar, produzir; usado exclusivamente para a criação divina, ex nihilo.',
    idioma: 'hebraico',
  ),
  PalavraLexicon(
    strong: 'H1285',
    palavra: 'בְּרִית',
    transliteracao: 'berith',
    definicao:
        'Aliança, pacto; acordo solene entre Deus e o homem ou entre povos.',
    idioma: 'hebraico',
  ),
  PalavraLexicon(
    strong: 'H7965',
    palavra: 'שָׁלוֹם',
    transliteracao: 'shalom',
    definicao:
        'Paz,完整性, plenitude; estado de harmonia, prosperidade e bem-estar completo.',
    idioma: 'hebraico',
  ),
  PalavraLexicon(
    strong: 'H2617',
    palavra: 'חֶסֶד',
    transliteracao: 'chesed',
    definicao:
        'Misericórdia, bondade leal, amor covenantal; a fidelidade de Deus à aliança.',
    idioma: 'hebraico',
  ),
  PalavraLexicon(
    strong: 'H6662',
    palavra: 'צֶדֶק',
    transliteracao: 'tsedeq',
    definicao: 'Justiça, retidão; a qualidade de ser justo e íntegro segundo Deus.',
    idioma: 'hebraico',
  ),
  PalavraLexicon(
    strong: 'H4941',
    palavra: 'מִשְׁפָּט',
    transliteracao: 'mishpat',
    definicao: 'Juízo, justiça, decisão; a aplicação da lei e da ordem divina.',
    idioma: 'hebraico',
  ),
  PalavraLexicon(
    strong: 'H8451',
    palavra: 'תּוֹרָה',
    transliteracao: 'torah',
    definicao: 'Lei, instrução, ensino; os preceitos de Deus que orientam o seu povo.',
    idioma: 'hebraico',
  ),
  PalavraLexicon(
    strong: 'H3117',
    palavra: 'יוֹם',
    transliteracao: 'yom',
    definicao: 'Dia, tempo; período de luz, ou unidade de tempo mais ampla.',
    idioma: 'hebraico',
  ),
  PalavraLexicon(
    strong: 'H1696',
    palavra: 'דָּבָר',
    transliteracao: 'davar',
    definicao: 'Palavra, assunto, coisa; comunicação, mandamento ou evento.',
    idioma: 'hebraico',
  ),
  PalavraLexicon(
    strong: 'H2254',
    palavra: 'חָכָם',
    transliteracao: 'chakam',
    definicao: 'Sábio, prudente; aquele que possui habilidade e discernimento divino.',
    idioma: 'hebraico',
  ),
  PalavraLexicon(
    strong: 'H5315',
    palavra: 'נֶפֶשׁ',
    transliteracao: 'nephesh',
    definicao:
        'Alma, ser, vida; o princípio vital do ser humano, frequentemente traduzido como alma.',
    idioma: 'hebraico',
  ),
  PalavraLexicon(
    strong: 'H7307',
    palavra: 'רוּחַ',
    transliteracao: 'ruach',
    definicao: 'Espírito, sopro, vento; o princípio imaterial do homem e de Deus.',
    idioma: 'hebraico',
  ),
  PalavraLexicon(
    strong: 'H3474',
    palavra: 'יִשְׂרָאֵל',
    transliteracao: 'Yisrael',
    definicao: 'Israel; aquele que luta com Deus, nome dado a Jacó e seu povo.',
    idioma: 'hebraico',
  ),
];
