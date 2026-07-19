import '../models/personagem.dart';

class PersonagensService {
  PersonagensService();

  List<Personagem> getPersonagens({String? testamento}) {
    if (testamento == null) return List.of(_personagens);
    final t = testamento.toUpperCase();
    return _personagens.where((p) => p.testamento == t).toList();
  }

  Personagem? getPersonagem(String slug) {
    for (final p in _personagens) {
      if (p.slug == slug) return p;
    }
    return null;
  }
}

const List<Personagem> _personagens = [
  Personagem(
    slug: 'abraao',
    nome: 'Abraão',
    resumo: 'Pai de todas as nações, chamado por Deus para deixar sua terra.',
    testamento: 'AT',
    referencias: ['Gênesis 12-25', 'Hebreus 11', 'Tiago 2:23'],
  ),
  Personagem(
    slug: 'moises',
    nome: 'Moisés',
    resumo: 'Libertador de Israel, legislador, profeta de Deus.',
    testamento: 'AT',
    referencias: ['Êxodo', 'Levítico', 'Números', 'Deuteronômio'],
  ),
  Personagem(
    slug: 'davi',
    nome: 'Davi',
    resumo: 'Rei de Israel, homem segundo o coração de Deus.',
    testamento: 'AT',
    referencias: ['1 Samuel 16-31', '2 Samuel', 'Salmos'],
  ),
  Personagem(
    slug: 'salomao',
    nome: 'Salomão',
    resumo: 'Filho de Davi, conhecido por sua sabedoria e construção do Templo.',
    testamento: 'AT',
    referencias: ['1 Reis 1-11', '2 Crônicas 1-9', 'Provérbios', 'Eclesiastes'],
  ),
  Personagem(
    slug: 'daniel',
    nome: 'Daniel',
    resumo: 'Profeta no cativeiro babilônico, fiel em meio à adversidade.',
    testamento: 'AT',
    referencias: ['Daniel 1-12', 'Ezequiel 14:14'],
  ),
  Personagem(
    slug: 'elias',
    nome: 'Elias',
    resumo: 'Profeta poderoso que desafiou o culto a Baal no Monte Carmelo.',
    testamento: 'AT',
    referencias: ['1 Reis 17-21', '2 Reis 1-2', 'Tiago 5:17'],
  ),
  Personagem(
    slug: 'isaias',
    nome: 'Isaías',
    resumo: 'Profeta messiânico, viu a glória de Deus e falou do Servo Sofredor.',
    testamento: 'AT',
    referencias: ['Isaías 1-66', '2 Reis 19-20'],
  ),
  Personagem(
    slug: 'jose-at',
    nome: 'José (Antigo Testamento)',
    resumo: 'Filho de Jacó, vendido pelos irmãos, tornou-se governador do Egito.',
    testamento: 'AT',
    referencias: ['Gênesis 37-50', 'Salmos 105:17-22'],
  ),
  Personagem(
    slug: 'rut',
    nome: 'Rute',
    resumo: 'Moabita que se uniu ao povo de Deus, ancestral de Davi e de Cristo.',
    testamento: 'AT',
    referencias: ['Rute 1-4', 'Mateus 1:5'],
  ),
  Personagem(
    slug: 'samuel',
    nome: 'Samuel',
    resumo: 'Último juiz de Israel, ungiu Saul e Davi como reis.',
    testamento: 'AT',
    referencias: ['1 Samuel 1-25', 'Salmos 99:6'],
  ),
  Personagem(
    slug: 'jesus',
    nome: 'Jesus Cristo',
    resumo: 'O Filho de Deus encarnado, Salvador do mundo, Messias prometido.',
    testamento: 'NT',
    referencias: ['Mateus', 'Marcos', 'Lucas', 'João', 'Atos'],
  ),
  Personagem(
    slug: 'maria-mae',
    nome: 'Maria',
    resumo: 'Mãe de Jesus, exemplo de fé e obediência ao chamado de Deus.',
    testamento: 'NT',
    referencias: ['Lucas 1-2', 'João 19:26-27'],
  ),
  Personagem(
    slug: 'joao-batista',
    nome: 'João Batista',
    resumo: 'Precursor de Cristo, batizou Jesus e anunciou o Reino de Deus.',
    testamento: 'NT',
    referencias: ['Mateus 3', 'Marcos 1', 'Lucas 1-3', 'João 1'],
  ),
  Personagem(
    slug: 'pedro',
    nome: 'Pedro',
    resumo: 'Apóstolo, líder da igreja primitiva, confessou que Jesus é o Cristo.',
    testamento: 'NT',
    referencias: ['Mateus 16', 'Atos 2', '1 Pedro', '2 Pedro'],
  ),
  Personagem(
    slug: 'paulo',
    nome: 'Paulo',
    resumo: 'Apóstolo das nações, autor de muitas epístolas, missionário incansável.',
    testamento: 'NT',
    referencias: ['Atos 9-28', 'Romanos', 'Efésios', 'Filipenses', '1 Coríntios'],
  ),
  Personagem(
    slug: 'joao-apocalipse',
    nome: 'João (Apóstolo)',
    resumo: 'O discípulo amado, autor do Evangelho, das Epístolas e do Apocalipse.',
    testamento: 'NT',
    referencias: ['João 1-21', '1 João', '2 João', '3 João', 'Apocalipse'],
  ),
  Personagem(
    slug: 'tiago',
    nome: 'Tiago',
    resumo: 'Irmão de Jesus, líder da igreja em Jerusalém, autor da epístola.',
    testamento: 'NT',
    referencias: ['Atos 15', 'Tiago 1-5', 'Gálatas 1:19'],
  ),
  Personagem(
    slug: 'estevao',
    nome: 'Estêvão',
    resumo: 'Primeiro mártir cristão, cheio do Espírito Santo e de fé.',
    testamento: 'NT',
    referencias: ['Atos 6-7'],
  ),
  Personagem(
    slug: 'barnabe',
    nome: 'Barnabé',
    resumo: 'Companheiro de Paulo nas viagens missionárias, chamado filho da consolação.',
    testamento: 'NT',
    referencias: ['Atos 4:36-37', 'Atos 9:27', 'Atos 11-15', 'Gálatas 2'],
  ),
  Personagem(
    slug: 'timoteo',
    nome: 'Timóteo',
    resumo: 'Jovem pastor, companheiro de Paulo, destinatário de duas epístolas.',
    testamento: 'NT',
    referencias: ['Atos 16-18', '1 Timóteo', '2 Timóteo', 'Filipenses 2:19-22'],
  ),
];
