import '../models/teologia.dart';
import '../models/teologia_categoria.dart';

class TeologiaService {
  TeologiaService();

  List<CategoriaTeologia> getCategorias() {
    return List.of(_categorias);
  }

  List<Doutrina> getDoutrinas(String categoria) {
    final todas = _todasDoutrinas;
    final filtradas = todas.where((d) => d.categoria == categoria).toList();
    if (filtradas.isNotEmpty) return filtradas;
    final c = _categorias.firstWhere(
      (c) => c.nome == categoria,
      orElse: () => _categorias.first,
    );
    return todas.where((d) => d.categoria == c.nome).toList();
  }
}

const List<CategoriaTeologia> _categorias = [
  CategoriaTeologia(
    id: 'teologia-propria',
    nome: 'Teologia Própria',
    descricao: 'O estudo de Deus: seus atributos, natureza e trindade.',
    corValue: 0xFFE53935,
    icone: 'account_tree',
    totalDoutrinas: 4,
  ),
  CategoriaTeologia(
    id: 'bibliologia',
    nome: 'Bibliologia',
    descricao: 'A doutrina das Escrituras: inspiração, autoridade e suficiência.',
    corValue: 0xFF8E24AA,
    icone: 'auto_stories',
    totalDoutrinas: 3,
  ),
  CategoriaTeologia(
    id: 'cristologia',
    nome: 'Cristologia',
    descricao: 'A pessoa e obra de Jesus Cristo.',
    corValue: 0xFF3949AB,
    icone: 'person',
    totalDoutrinas: 3,
  ),
  CategoriaTeologia(
    id: 'pneumatologia',
    nome: 'Pneumatologia',
    descricao: 'A doutrina do Espírito Santo.',
    corValue: 0xFF00ACC1,
    icone: 'air',
    totalDoutrinas: 2,
  ),
  CategoriaTeologia(
    id: 'soteriologia',
    nome: 'Soteriologia',
    descricao: 'A doutrina da salvação.',
    corValue: 0xFF43A047,
    icone: 'favorite',
    totalDoutrinas: 3,
  ),
  CategoriaTeologia(
    id: 'hamartiologia',
    nome: 'Hamartiologia',
    descricao: 'A doutrina do pecado.',
    corValue: 0xFFFF8F00,
    icone: 'warning_amber',
    totalDoutrinas: 2,
  ),
  CategoriaTeologia(
    id: 'eclesiologia',
    nome: 'Eclesiologia',
    descricao: 'A doutrina da igreja.',
    corValue: 0xFF6D4C41,
    icone: 'groups',
    totalDoutrinas: 2,
  ),
  CategoriaTeologia(
    id: 'angelologia',
    nome: 'Angelologia',
    descricao: 'A doutrina dos anjos.',
    corValue: 0xFF546E7A,
    icone: 'flutter_dash',
    totalDoutrinas: 2,
  ),
  CategoriaTeologia(
    id: 'demonologia',
    nome: 'Demonologia',
    descricao: 'A doutrina dos demônios e do mal espiritual.',
    corValue: 0xFF424242,
    icone: 'dangerous',
    totalDoutrinas: 2,
  ),
  CategoriaTeologia(
    id: 'escatologia',
    nome: 'Escatologia',
    descricao: 'A doutrina das últimas coisas.',
    corValue: 0xFF7B1FA2,
    icone: 'account_balance',
    totalDoutrinas: 3,
  ),
  CategoriaTeologia(
    id: 'antropologia',
    nome: 'Antropologia Bíblica',
    descricao: 'A doutrina do ser humano.',
    corValue: 0xFFC62828,
    icone: 'face',
    totalDoutrinas: 2,
  ),
  CategoriaTeologia(
    id: 'satanologia',
    nome: 'Satanologia',
    descricao: 'A doutrina de Satanás.',
    corValue: 0xFF37474F,
    icone: 'report_problem',
    totalDoutrinas: 2,
  ),
  CategoriaTeologia(
    id: 'covenantologia',
    nome: 'Covenantologia',
    descricao: 'A doutrina das alianças bíblicas.',
    corValue: 0xFF00695C,
    icone: 'handshake',
    totalDoutrinas: 3,
  ),
];

const List<Doutrina> _todasDoutrinas = [
  // Teologia Própria
  Doutrina(
    id: 'trindade',
    nome: 'Trindade',
    categoria: 'Teologia Própria',
    descricao:
        'Deus é um só em essência, subsistindo em três pessoas distintas: Pai, Filho e Espírito Santo. Cada pessoa é plenamente Deus, e há um só Deus.',
    versiculos: ['Mateus 28:19', '2 Coríntios 13:14', '1 Pedro 1:2'],
  ),
  Doutrina(
    id: 'atributos-deus',
    nome: 'Atributos de Deus',
    categoria: 'Teologia Própria',
    descricao:
        'As características essenciais da natureza divina: onisciência, onipotência, onipresença, santidade, amor, justiça, misericórdia e eternidade.',
    versiculos: ['Êxodo 34:6', 'Salmos 139:1', 'Isaías 6:3'],
  ),
  Doutrina(
    id: 'soberania',
    nome: 'Soberania de Deus',
    categoria: 'Teologia Própria',
    descricao:
        'Deus é soberano sobre toda a criação e história. Nada acontece fora do seu controle e propósito, embora isso não negue a responsabilidade humana.',
    versiculos: ['Salmos 103:19', 'Daniel 4:35', 'Efésios 1:11'],
  ),
  Doutrina(
    id: 'providencia',
    nome: 'Providência',
    categoria: 'Teologia Própria',
    descricao:
        'Deus sustenta, governa e dirige todas as coisas para o cumprimento dos seus propósitos, cuidando especialmente dos seus filhos.',
    versiculos: ['Mateus 10:29-31', 'Romanos 8:28', 'Apocalipse 4:11'],
  ),
  // Bibliologia
  Doutrina(
    id: 'inspiracao',
    nome: 'Inspiração das Escrituras',
    categoria: 'Bibliologia',
    descricao:
        'A Bíblia é inspirada por Deus, de modo que os autores humanos escreveram sob a direção do Espírito Santo, sem perder suas personalidades.',
    versiculos: ['2 Timóteo 3:16', '2 Pedro 1:21', '2 Timóteo 3:15-17'],
  ),
  Doutrina(
    id: 'inerrancia',
    nome: 'Inerrância Bíblica',
    categoria: 'Bibliologia',
    descricao:
        'A Escritura, em seus manuscritos originais, é livre de erro em tudo o que afirma, seja em matéria de fé, história ou ciência.',
    versiculos: ['Salmos 12:6', 'Provérbios 30:5', 'João 17:17'],
  ),
  Doutrina(
    id: 'suficiencia',
    nome: 'Suficiência das Escrituras',
    categoria: 'Bibliologia',
    descricao:
        'A Bíblia é suficiente para nos ensinar tudo o que é necessário para a salvação e para a vida piedosa.',
    versiculos: ['Salmos 19:7', '2 Timóteo 3:16-17', '2 Pedro 1:3'],
  ),
  // Cristologia
  Doutrina(
    id: 'encarnacao',
    nome: 'Encarnação',
    categoria: 'Cristologia',
    descricao:
        'O Verbo se fez carne e habitou entre nós. Jesus Cristo é totalmente Deus e totalmente homem, em duas naturezas inseparáveis.',
    versiculos: ['João 1:14', 'Filipenses 2:5-8', 'Colossenses 1:15-20'],
  ),
  Doutrina(
    id: 'ressurreicao',
    nome: 'Ressurreição de Cristo',
    categoria: 'Cristologia',
    descricao:
        'Jesus ressuscitou corporalmente dos mortos no terceiro dia, vencendo a morte e o pecado, e é a garantia da ressurreição dos crentes.',
    versiculos: ['1 Coríntios 15:3-4', 'Mateus 28:5-6', 'Romanos 1:4'],
  ),
  Doutrina(
    id: 'expiacao',
    nome: 'Expiação Substitutiva',
    categoria: 'Cristologia',
    descricao:
        'Cristo morreu em nosso lugar, levando sobre si o pecado do seu povo, satisfazendo a justiça de Deus e reconciliando-nos com ele.',
    versiculos: ['Isaías 53:5', 'Romanos 3:25', '1 Pedro 3:18'],
  ),
  // Pneumatologia
  Doutrina(
    id: 'pessoa-espirito',
    nome: 'Pessoa do Espírito Santo',
    categoria: 'Pneumatologia',
    descricao:
        'O Espírito Santo é a terceira pessoa da Trindade, plenamente Deus, que habita em todo crente, capacitando-o para a vida cristã.',
    versiculos: ['Atos 5:3-4', 'João 14:26', '1 Coríntios 3:16'],
  ),
  Doutrina(
    id: 'fruto-espirito',
    nome: 'Fruto do Espírito',
    categoria: 'Pneumatologia',
    descricao:
        'O Espírito Santo produz no crente um caráter semelhante ao de Cristo, manifestando amor, alegria, paz, paciência e outras virtudes.',
    versiculos: ['Gálatas 5:22-23', 'Efésios 5:9', '2 Coríntios 3:18'],
  ),
  // Soteriologia
  Doutrina(
    id: 'justificacao',
    nome: 'Justificação pela Fé',
    categoria: 'Soteriologia',
    descricao:
        'O crente é declarado justo diante de Deus somente pela fé em Jesus Cristo, sem obras da lei. A justificação é ato de Deus, pela graça.',
    versiculos: ['Romanos 5:1', 'Efésios 2:8-9', 'Gálatas 2:16'],
  ),
  Doutrina(
    id: 'regeneracao',
    nome: 'Regeneração',
    categoria: 'Soteriologia',
    descricao:
        'O novo nascimento espiritual pelo Espírito Santo que transforma o coração do crente, dando-lhe nova vida e inclinando-o para Deus.',
    versiculos: ['João 3:3', 'Tito 3:5', 'Efésios 2:4-5'],
  ),
  Doutrina(
    id: 'santificacao',
    nome: 'Santificação',
    categoria: 'Soteriologia',
    descricao:
        'O processo contínuo pelo qual o crente é separado para Deus e tornado mais semelhante a Cristo, pelo poder do Espírito Santo.',
    versiculos: ['1 Tessalonicenses 4:3', 'Hebreus 12:14', '2 Coríntios 3:18'],
  ),
  // Hamartiologia
  Doutrina(
    id: 'pecado-original',
    nome: 'Pecado Original',
    categoria: 'Hamartiologia',
    descricao:
        'Por causa da queda de Adão, toda a humanidade nasce com natureza pecaminosa, inclinada ao mal e incapaz de salvar-se a si mesma.',
    versiculos: ['Romanos 5:12', 'Salmos 51:5', 'Efésios 2:1-3'],
  ),
  Doutrina(
    id: 'pecado-imputado',
    nome: 'Pecado Imputado',
    categoria: 'Hamartiologia',
    descricao:
        'A culpa do pecado de Adão é imputada a toda a humanidade, de modo que todos são considerados pecadores diante de Deus.',
    versiculos: ['Romanos 5:18-19', '1 Coríntios 15:22', 'Salmos 14:3'],
  ),
  // Eclesiologia
  Doutrina(
    id: 'natureza-igreja',
    nome: 'Natureza da Igreja',
    categoria: 'Eclesiologia',
    descricao:
        'A Igreja é o corpo de Cristo, composta por todos os verdadeiros crentes de todas as eras, chamados para a comunhão e missão.',
    versiculos: ['Efésios 1:22-23', '1 Coríntios 12:27', 'Colossenses 1:18'],
  ),
  Doutrina(
    id: 'sacramentos',
    nome: 'Sacramentos',
    categoria: 'Eclesiologia',
    descricao:
        'O batismo e a ceia do Senhor são ordenanças instituídas por Cristo, sinais visíveis da graça invisível e meios de proclamação do evangelho.',
    versiculos: ['Mateus 28:19', '1 Coríntios 11:23-26', 'Atos 2:38-42'],
  ),
  // Angelologia
  Doutrina(
    id: 'anjos',
    nome: 'Anjos',
    categoria: 'Angelologia',
    descricao:
        'Seres espirituais criados por Deus, que O servem e ministram aos herdeiros da salvação. Não recebem adoração.',
    versiculos: ['Hebreus 1:14', 'Salmos 103:20', 'Colossenses 1:16'],
  ),
  Doutrina(
    id: 'querubins',
    nome: 'Querubins e Serafins',
    categoria: 'Angelologia',
    descricao:
        'Ordens especiais de anjos que servem diante da presença de Deus, manifestando Sua santidade e glória.',
    versiculos: ['Isaías 6:1-3', 'Ezequiel 1:4-14', 'Apocalipse 4:6-8'],
  ),
  // Demonologia
  Doutrina(
    id: 'queda-demonios',
    nome: 'Queda dos Demônios',
    categoria: 'Demonologia',
    descricao:
        'Anjos que pecaram contra Deus foram expulsos do céu e se tornaram demônios, operando sob a autoridade de Satanás.',
    versiculos: ['2 Pedro 2:4', 'Judas 1:6', 'Apocalipse 12:7-9'],
  ),
  Doutrina(
    id: 'guerra-espiritual',
    nome: 'Guerra Espiritual',
    categoria: 'Demonologia',
    descricao:
        'Os crentes estão engajados numa batalha espiritual contra as forças do mal, vencida por Cristo e pela armadura de Deus.',
    versiculos: ['Efésios 6:10-18', '1 Pedro 5:8', '2 Coríntios 10:4'],
  ),
  // Escatologia
  Doutrina(
    id: 'segunda-vinda',
    nome: 'Segunda Vinda de Cristo',
    categoria: 'Escatologia',
    descricao:
        'Jesus Cristo voltará pessoalmente, visível e gloriosa, para julgar as nações, ressuscitar os mortos e estabelecer o Reino eterno.',
    versiculos: ['Atos 1:11', 'Apocalipse 1:7', 'Mateus 24:30'],
  ),
  Doutrina(
    id: 'ressurreicao-dos-mortos',
    nome: 'Ressurreição dos Mortos',
    categoria: 'Escatologia',
    descricao:
        'Todos os mortos ressuscitarão: os crentes para a vida eterna, e os ímpios para o juízo eterno.',
    versiculos: ['João 5:28-29', '1 Coríntios 15:51-52', 'Apocalipse 20:11-15'],
  ),
  Doutrina(
    id: 'novos-ceus-nova-terra',
    nome: 'Novos Céus e Nova Terra',
    categoria: 'Escatologia',
    descricao:
        'Deus criará novos céus e nova terra, onde habitará com seu povo para sempre. Não haverá mais morte, dor ou pranto.',
    versiculos: ['Apocalipse 21:1-4', '2 Pedro 3:13', 'Isaías 65:17'],
  ),
  // Antropologia
  Doutrina(
    id: 'criacao-homem',
    nome: 'Criação do Homem',
    categoria: 'Antropologia Bíblica',
    descricao:
        'O ser humano foi criado à imagem e semelhança de Deus, com corpo, alma e espírito. A imagem se refere à nossa capacidade racional, moral e relacional.',
    versiculos: ['Gênesis 1:26-27', 'Gênesis 2:7', 'Salmos 8:5'],
  ),
  Doutrina(
    id: 'queda-homem',
    nome: 'Queda do Homem',
    categoria: 'Antropologia Bíblica',
    descricao:
        'Adão pecou ao desobedecer a Deus, e com ele toda a humanidade caiu. O pecado entrou no mundo, trazendo morte espiritual e física.',
    versiculos: ['Gênesis 3:1-24', 'Romanos 5:12', '1 Coríntios 15:21-22'],
  ),
  // Satanologia
  Doutrina(
    id: 'pessoa-satanas',
    nome: 'Pessoa de Satanás',
    categoria: 'Satanologia',
    descricao:
        'Satanás é um ser pessoal, anjo caído, inimigo de Deus e dos crentes. Opera com malícia, mas está sob o controle soberano de Deus.',
    versiculos: ['Jó 1:6-12', '1 Pedro 5:8', 'Apocalipse 12:9-10'],
  ),
  Doutrina(
    id: 'estrategias-satanas',
    nome: 'Estratégias de Satanás',
    categoria: 'Satanologia',
    descricao:
        'Satanás usa engano, acusação, tentação e divisão para afastar os crentes de Deus. Sua derrota já foi assegurada por Cristo.',
    versiculos: ['2 Coríntios 11:14', 'Efésios 6:11', 'Apocalipse 12:11'],
  ),
  // Covenantologia
  Doutrina(
    id: 'pacto-graca',
    nome: 'Pacto da Graça',
    categoria: 'Covenantologia',
    descricao:
        'O pacto eterno entre Deus Pai, Filho e Espírito Santo para a salvação dos eleitos, cumprido em Cristo e aplicado pelo Espírito.',
    versiculos: ['Efésios 1:3-6', '2 Timóteo 1:9', 'Tito 1:2'],
  ),
  Doutrina(
    id: 'pacto-abraao',
    nome: 'Pacto Abraâmico',
    categoria: 'Covenantologia',
    descricao:
        'A aliança incondicional que Deus fez com Abraão, prometendo-lhe descendência, terra e bênção a todas as nações.',
    versiculos: ['Gênesis 12:1-3', 'Gênesis 15:1-21', 'Gálatas 3:15-18'],
  ),
  Doutrina(
    id: 'paco-novo',
    nome: 'Novo Pacto',
    categoria: 'Covenantologia',
    descricao:
        'O pacto profetizado por Jeremias, cumprido em Cristo, no qual Deus escreve a lei no coração dos crentes e perdoa seus pecados.',
    versiculos: ['Jeremias 31:31-34', 'Hebreus 8:6-13', 'Lucas 22:20'],
  ),
];
