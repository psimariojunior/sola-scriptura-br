import '../models/estudo.dart';

class EstudosService {
  EstudosService();

  List<Estudo> getEstudos() {
    return List.of(_estudos);
  }

  Estudo? getEstudo(String id) {
    for (final e in _estudos) {
      if (e.slug == id || e.slug.contains(id)) return e;
    }
    return null;
  }
}

const List<Estudo> _estudos = [
  Estudo(
    slug: 'romanos',
    titulo: 'Romanos: O Evangelho da Graça',
    autor: 'Equipe Sola Scriptura',
    data: '2024',
    contexto:
        'A Epístola aos Romanos é a exposição mais completa de Paulo sobre o evangelho. Nela, o apóstolo estabelece que toda a humanidade é culpada diante de Deus, mas justificada pela fé em Jesus Cristo. A carta prepara o caminho para entendermos a justificação, santificação e a glória futura do crente.',
    versiculosChave: [
      'Romanos 1:16-17',
      'Romanos 3:23-24',
      'Romanos 5:1',
      'Romanos 8:28',
      'Romanos 12:1-2',
    ],
  ),
  Estudo(
    slug: 'genesis',
    titulo: 'Gênesis: A Criação e o Pacto',
    autor: 'Equipe Sola Scriptura',
    data: '2024',
    contexto:
        'Gênesis estabelece os fundamentos de toda a revelação bíblica: Deus criou o universo, o ser humano caiu em pecado, mas Deus prometeu redenção. A aliança com Abraão marca o início do plano redentor que culminará em Cristo.',
    versiculosChave: [
      'Gênesis 1:1',
      'Gênesis 1:27',
      'Gênesis 3:15',
      'Gênesis 12:1-3',
      'Gênesis 15:6',
    ],
  ),
  Estudo(
    slug: 'joao',
    titulo: 'João: O Verbo Encarnado',
    autor: 'Equipe Sola Scriptura',
    data: '2024',
    contexto:
        'O Evangelho de João apresenta Jesus como o Verbo eterno, Deus encarnado. Diferente dos evangelhos sinóticos, João seleciona sete sinais miraculosos para demonstrar a divindade de Cristo e convidar o leitor à fé.',
    versiculosChave: [
      'João 1:1',
      'João 1:14',
      'João 3:16',
      'João 14:6',
      'João 20:31',
    ],
  ),
  Estudo(
    slug: 'salmos',
    titulo: 'Salmos: A Oração do Coração',
    autor: 'Equipe Sola Scriptura',
    data: '2024',
    contexto:
        'O livro de Salmos é a coletânea de hinos e orações de Israel, abrangendo toda a gama de emoções humanas diante de Deus. Dos lamentos às ações de graças, os salmos ensinam a viver em comunhão com o Senhor em todas as circunstâncias.',
    versiculosChave: [
      'Salmos 1:1-2',
      'Salmos 23:1',
      'Salmos 51:10',
      'Salmos 119:105',
      'Salmos 139:1',
    ],
  ),
  Estudo(
    slug: 'apocalipse',
    titulo: 'Apocalipse: A Esperança Gloriosa',
    autor: 'Equipe Sola Scriptura',
    data: '2024',
    contexto:
        'O livro do Apocalipse revela a consumação da história da redenção. Cristo voltará, julgará as nações, e estabelecerá novos céus e nova terra. É um livro de esperança para os crentes perseguidos e de alerta para os orgulhosos.',
    versiculosChave: [
      'Apocalipse 1:7',
      'Apocalipse 21:1',
      'Apocalipse 21:4',
      'Apocalipse 22:13',
      'Apocalipse 22:20',
    ],
  ),
  Estudo(
    slug: 'efesios',
    titulo: 'Efésios: A Igreja, Corpo de Cristo',
    autor: 'Equipe Sola Scriptura',
    data: '2024',
    contexto:
        'A Epístola aos Efésios revela o mistério da igreja como corpo de Cristo e família de Deus. Paulo exorta os crentes a viverem à altura da sua chamada, em unidade, santidade e amor.',
    versiculosChave: [
      'Efésios 1:3-4',
      'Efésios 2:8-9',
      'Efésios 2:10',
      'Efésios 4:11-13',
      'Efésios 6:10-18',
    ],
  ),
  Estudo(
    slug: 'isaias',
    titulo: 'Isaías: O Profeta da Consolação',
    autor: 'Equipe Sola Scriptura',
    data: '2024',
    contexto:
        'Isaías é o profeta do AT que mais fala do Messias. Conhecido como o evangelista do AT, ele apresenta a vinda do Servo Sofredor, a salvação universal e a restauração final de Israel.',
    versiculosChave: [
      'Isaías 6:3',
      'Isaías 7:14',
      'Isaías 9:6',
      'Isaías 53:5',
      'Isaías 55:8',
    ],
  ),
  Estudo(
    slug: 'filipenses',
    titulo: 'Filipenses: Alegria no Sofrimento',
    autor: 'Equipe Sola Scriptura',
    data: '2024',
    contexto:
        'Paulo escreveu Filipenses da prisão, mas a carta transborda alegria. A chave é Cristo: conhecê-lo, ter comunhão com ele e segui-lo. A alegria cristã não depende das circunstâncias, mas da relação com o Senhor.',
    versiculosChave: [
      'Filipenses 1:6',
      'Filipenses 2:5-8',
      'Filipenses 3:10',
      'Filipenses 4:6-7',
      'Filipenses 4:13',
    ],
  ),
];
