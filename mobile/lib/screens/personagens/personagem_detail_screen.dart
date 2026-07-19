import 'package:flutter/material.dart';

import '../../models/personagem.dart';
import '../../services/personagens_service.dart';
import '../../widgets/character_avatar.dart';

class PersonagemDetailScreen extends StatefulWidget {
  final Personagem personagem;

  const PersonagemDetailScreen({super.key, required this.personagem});

  factory PersonagemDetailScreen.fromSlug({Key? key, required String slug}) {
    final service = PersonagensService();
    final personagem = service.getPersonagem(slug) ??
        Personagem(
          slug: slug,
          nome: 'Personagem não encontrado',
          resumo: 'Personagem não encontrado.',
          testamento: 'AT',
        );
    return PersonagemDetailScreen(key: key, personagem: personagem);
  }

  @override
  State<PersonagemDetailScreen> createState() => _PersonagemDetailScreenState();
}

class _PersonagemDetailScreenState extends State<PersonagemDetailScreen> {
  late Personagem _personagem;

  @override
  void initState() {
    super.initState();
    _personagem = widget.personagem;
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(_personagem.nome),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Column(
                children: [
                  CharacterAvatar(
                    initials: _iniciais(_personagem.nome),
                    testamento: _personagem.testamento,
                    size: 80,
                  ),
                  const SizedBox(height: 12),
                  Text(
                    _personagem.nome,
                    style: theme.textTheme.headlineMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  if (_scriptOriginal() != null) ...[
                    const SizedBox(height: 4),
                    Text(
                      _scriptOriginal()!,
                      style: theme.textTheme.titleMedium?.copyWith(
                        color: theme.colorScheme.onSurfaceVariant,
                        fontStyle: FontStyle.italic,
                      ),
                    ),
                  ],
                  const SizedBox(height: 8),
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                    decoration: BoxDecoration(
                      color: _personagem.testamento == 'AT'
                          ? Colors.green.withValues(alpha: 0.12)
                          : Colors.blue.withValues(alpha: 0.12),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Text(
                      _personagem.testamento == 'AT'
                          ? 'Antigo Testamento'
                          : 'Novo Testamento',
                      style: TextStyle(
                        fontSize: 12,
                        color: _personagem.testamento == 'AT'
                            ? Colors.green[700]
                            : Colors.blue[700],
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            if (_significado() != null) ...[
              _buildSecao(context, 'Significado', _significado()!),
              const SizedBox(height: 16),
            ],

            _buildSecao(context, 'Resumo', _personagem.resumo),
            const SizedBox(height: 16),

            _buildSecaoTimeline(context),
            const SizedBox(height: 16),

            _buildSecaoArvore(context),
            const SizedBox(height: 16),

            _buildSecaoEventos(context),
            const SizedBox(height: 16),

            _buildSecaoLocais(context),
            const SizedBox(height: 16),

            _buildSecaoDoutrinas(context),
            const SizedBox(height: 16),

            _buildSecaoReferencias(context),
            const SizedBox(height: 16),

            _buildSecaoRelacionados(context),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  String _iniciais(String nome) {
    final partes = nome.split(' ');
    if (partes.length >= 2) {
      return '${partes.first[0]}${partes.last[0]}';
    }
    return nome.substring(0, nome.length.clamp(0, 2));
  }

  String? _scriptOriginal() {
    final Map<String, String> scripts = {
      'jesus': 'Ἰησοῦς (Iesous)',
      'abraao': 'אַבְרָהָם (Avraham)',
      'moises': 'מֹשֶׁה (Moshe)',
      'davi': 'דָּוִד (Dawid)',
      'daniel': 'דָּנִיֵּאל (Daniyyel)',
      'pedro': 'Πέτρος (Petros)',
      'paulo': 'Παῦλος (Paulos)',
      'maria-mae': 'מִרְיָם (Miryam)',
      'joao-batista': 'יוחנן (Yochanan)',
      'joao-apocalipse': 'Ἰωάννης (Ioannes)',
    };
    return scripts[_personagem.slug];
  }

  String? _significado() {
    final Map<String, String> significados = {
      'jesus': 'Deus é salvação',
      'abraao': 'Pai de multidões',
      'moises': 'Tirado das águas',
      'davi': 'Amado',
      'daniel': 'Deus é meu juiz',
      'pedro': 'Pedra, rocha',
      'paulo': 'Pequeno, humilde',
      'maria-mae': 'Amada, senhora',
      'joao-batista': 'Deus é misericordioso',
      'joao-apocalipse': 'Deus é gracioso',
    };
    return significados[_personagem.slug];
  }

  Widget _buildSecao(BuildContext context, String titulo, String conteudo) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          titulo,
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Text(conteudo, style: theme.textTheme.bodyMedium),
          ),
        ),
      ],
    );
  }

  Widget _buildSecaoTimeline(BuildContext context) {
    final theme = Theme.of(context);
    final eventos = _obterEventos();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Linha do Tempo',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        ...eventos.map((evento) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Column(
                children: [
                  Container(
                    width: 12,
                    height: 12,
                    decoration: BoxDecoration(
                      color: theme.colorScheme.primary,
                      shape: BoxShape.circle,
                    ),
                  ),
                  Container(
                    width: 2,
                    height: 30,
                    color: theme.dividerColor,
                  ),
                ],
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Text(
                    evento,
                    style: theme.textTheme.bodyMedium,
                  ),
                ),
              ),
            ],
          );
        }),
      ],
    );
  }

  Widget _buildSecaoArvore(BuildContext context) {
    final theme = Theme.of(context);
    final familia = _obterFamilia();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Árvore Familiar',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: familia.entries.map((entry) {
            return Chip(
              avatar: Icon(
                entry.key.contains('pai') || entry.key.contains('filho')
                    ? Icons.person
                    : Icons.person_outline,
                size: 18,
              ),
              label: Text('${entry.key}: ${entry.value}'),
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildSecaoEventos(BuildContext context) {
    final theme = Theme.of(context);
    final eventos = _obterEventosPrincipais();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Eventos Principais',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        ...eventos.map((evento) {
          return Card(
            margin: const EdgeInsets.only(bottom: 6),
            child: ListTile(
              dense: true,
              leading: Icon(
                Icons.star_outline,
                color: theme.colorScheme.primary,
              ),
              title: Text(evento),
            ),
          );
        }),
      ],
    );
  }

  Widget _buildSecaoLocais(BuildContext context) {
    final theme = Theme.of(context);
    final locais = _obterLocais();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Locais',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: locais.map((local) {
            return Chip(
              avatar: const Icon(Icons.location_on, size: 16),
              label: Text(local),
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildSecaoDoutrinas(BuildContext context) {
    final theme = Theme.of(context);
    final doutrinas = _obterDoutrinas();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Doutrinas Relacionadas',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: doutrinas.map((d) {
            return ActionChip(
              label: Text(d),
              onPressed: () {},
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildSecaoReferencias(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Referências',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        ..._personagem.referencias.map((ref) {
          return Card(
            margin: const EdgeInsets.only(bottom: 6),
            child: ListTile(
              dense: true,
              leading: Icon(
                Icons.auto_stories,
                size: 18,
                color: theme.colorScheme.primary,
              ),
              title: Text(ref),
              onTap: () {},
            ),
          );
        }),
      ],
    );
  }

  Widget _buildSecaoRelacionados(BuildContext context) {
    final theme = Theme.of(context);
    final relacionados = _obterRelacionados();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Personagens Relacionados',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        ...relacionados.map((nome) {
          return Card(
            margin: const EdgeInsets.only(bottom: 6),
            child: ListTile(
              leading: CharacterAvatar(
                initials: _iniciais(nome),
                testamento: _personagem.testamento,
                size: 36,
              ),
              title: Text(nome),
              trailing: const Icon(Icons.chevron_right),
              onTap: () {
                final service = PersonagensService();
                final p = service.getPersonagem(
                  nome.toLowerCase().replaceAll(' ', '-'),
                );
                if (p != null) {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) => PersonagemDetailScreen(personagem: p),
                    ),
                  );
                }
              },
            ),
          );
        }),
      ],
    );
  }

  List<String> _obterEventos() {
    final Map<String, List<String>> eventos = {
      'jesus': [
        'Nascimento em Belém (~4 a.C.)',
        'Batismo no Jordão (~27 d.C.)',
        'Início do Ministério',
        'Crucificação e Ressurreição (~30 d.C.)',
        'Ascensão ao Céu',
        'Derramamento do Espírito Santo em Pentecostes',
      ],
      'abraao': [
        'Chamado por Deus (Gn 12)',
        'Aliança com Deus (Gn 15)',
        'Circuncisão (Gn 17)',
        'Sacrifício de Isaac (Gn 22)',
        'Morte e sepultamento em Hebrom (Gn 25)',
      ],
      'moises': [
        'Nascimento e salvação nas águas (Êx 2)',
        'Sarça ardente (Êx 3)',
        'Dez pragas e Páscoa (Êx 7-12)',
        'Êxodo do Egito (Êx 14)',
        'Entrega da Lei no Sinai (Êx 20)',
        'Moisés no Monte Nebo (Dt 34)',
      ],
      'davi': [
        'Ungido por Samuel (1 Sm 16)',
        'Vitória sobre Golias (1 Sm 17)',
        'Rei de Judá e depois de Israel (2 Sm 5)',
        'Pecado e arrependimento (2 Sm 12)',
        'Preparação para a construção do Templo (1 Cr 22)',
      ],
      'pedro': [
        'Chamado por Jesus (Mt 4)',
        'Confissão em Cesareia (Mt 16)',
        'Negação e restauração (Jo 21)',
        'Pentecostes e início da Igreja (At 2)',
        'Conferência de Jerusalém (At 15)',
      ],
      'paulo': [
        'Conversão no caminho de Damasco (At 9)',
        'Primeira viagem missionária (At 13)',
        'Conferência de Jerusalém (At 15)',
        'Viagens missionárias pela Ásia e Europa (At 16-21)',
        'Prisão em Roma e martírio (~67 d.C.)',
      ],
    };
    return eventos[_personagem.slug] ?? ['Vida dedicada a Deus'];
  }

  Map<String, String> _obterFamilia() {
    final Map<String, Map<String, String>> familias = {
      'jesus': {
        'Mãe': 'Maria',
        'Pai (adotivo)': 'José',
        'Irmãos': 'Tiago, José, Simão, Judas',
      },
      'abraao': {
        'Pai': 'Térate',
        'Esposa': 'Sara',
        'Filho': 'Isaque',
        'Neto': 'Jacó',
      },
      'moises': {
        'Irmã': 'Miriã',
        'Irmão': 'Aarão',
        'Esposa': 'Zípora',
        'Filhos': 'Gerson e Eliézer',
      },
      'davi': {
        'Pai': 'Jessé',
        'Esposa': 'Mical, Abigail, Bate-Seba',
        'Filho': 'Salomão',
      },
      'pedro': {
        'Irmão': 'André',
        'Esposa': 'Citada em 1 Co 9:5',
      },
      'paulo': {
        'Mestre': 'Gamaliel',
        'Companheiro': 'Barnabé',
      },
    };
    return familias[_personagem.slug] ?? {};
  }

  List<String> _obterEventosPrincipais() {
    final Map<String, List<String>> eventos = {
      'jesus': [
        'Pregação do Reino',
        'Cura de enfermos e milagres',
        'Ensino das parábolas',
        'Instituição da Ceia do Senhor',
      ],
      'abraao': [
        'Deixou Ur dos caldeus',
        'Separou-se de Ló',
        'Recebeu a promessa de um filho',
        'Circuncidou os seus',
      ],
      'moises': [
        'Criado na corte do Faraó',
        'Matou um egípcio e fugiu',
        'Falou com Deus na sarça',
        'Partiu o mar vermelho',
        'Recebeu os Dez Mandamentos',
      ],
      'davi': [
        'Pastor de ovelhas',
        'Músico na corte de Saul',
        'Guerreiro vitorioso',
        'Rei unificador de Israel',
      ],
    };
    return eventos[_personagem.slug] ?? [];
  }

  List<String> _obterLocais() {
    final Map<String, List<String>> locais = {
      'jesus': ['Belém', 'Nazaré', 'Galileia', 'Jerusalém', 'Getsêmani', 'Gólgota'],
      'abraao': ['Ur', 'Canaã', 'Hebrom', 'Monte Moriá'],
      'moises': ['Egito', 'Monte Sinai', 'Deserto', 'Monte Nebo'],
      'davi': ['Belém', 'Jerusalém', 'Hebrom'],
      'pedro': ['Galileia', 'Jerusalém', 'Antioquia', 'Roma'],
      'paulo': ['Tarso', 'Damasco', 'Corinto', 'Éfeso', 'Roma'],
    };
    return locais[_personagem.slug] ?? [];
  }

  List<String> _obterDoutrinas() {
    final Map<String, List<String>> doutrinas = {
      'jesus': [
        'Cristologia',
        'Encarnação',
        'Expiação',
        'Ressurreição',
        'Segunda Vinda',
      ],
      'abraao': ['Aliança', 'Justificação pela fé', 'Promessa messiânica'],
      'moises': ['Lei', 'Redenção', 'Tipologia de Cristo'],
      'davi': ['Reinado messiânico', 'Aliança davídica', 'Arrependimento'],
      'pedro': ['Igreja', 'Pentecostes', 'Missões'],
      'paulo': ['Justificação', 'Graça', 'Mistério do evangelho'],
    };
    return doutrinas[_personagem.slug] ?? [];
  }

  List<String> _obterRelacionados() {
    final Map<String, List<String>> rels = {
      'jesus': ['Pedro', 'João (Apóstolo)', 'Moisés', 'Abraão', 'Davi'],
      'abraao': ['Isaque', 'Jacó', 'Sara', 'Lot'],
      'moises': ['Josué', 'Aarão', 'Miriã', 'Faraó'],
      'davi': ['Salomão', 'Samuel', 'Saul', 'Natã'],
      'pedro': ['Paulo', 'João (Apóstolo)', 'Tiago', 'André'],
      'paulo': ['Barnabé', 'Timóteo', 'Silas', 'Pedro'],
    };
    return rels[_personagem.slug] ?? [];
  }
}
