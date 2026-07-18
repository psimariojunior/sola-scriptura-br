import 'package:flutter/material.dart';

import '../../models/personagem.dart';
import '../../widgets/character_avatar.dart';

class PersonagemDetailScreen extends StatelessWidget {
  final Personagem personagem;

  const PersonagemDetailScreen({super.key, required this.personagem});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(personagem.nome),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header with avatar + name
            Center(
              child: Column(
                children: [
                  CharacterAvatar(
                    initials: _iniciais(personagem.nome),
                    testamento: personagem.testamento,
                    size: 80,
                  ),
                  const SizedBox(height: 12),
                  Text(
                    personagem.nome,
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
                      color: personagem.testamento == 'AT'
                          ? Colors.green.withOpacity(0.12)
                          : Colors.blue.withOpacity(0.12),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Text(
                      personagem.testamento == 'AT'
                          ? 'Antigo Testamento'
                          : 'Novo Testamento',
                      style: TextStyle(
                        fontSize: 12,
                        color: personagem.testamento == 'AT'
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

            // Meaning
            if (_significado() != null) ...[
              _buildSecao(context, 'Significado', _significado()!),
              const SizedBox(height: 16),
            ],

            // Summary
            _buildSecao(context, 'Resumo', personagem.resumo),
            const SizedBox(height: 16),

            // Timeline
            _buildSecaoTimeline(context),
            const SizedBox(height: 16),

            // Family tree
            _buildSecaoArvore(context),
            const SizedBox(height: 16),

            // Key events
            _buildSecaoEventos(context),
            const SizedBox(height: 16),

            // Locations
            _buildSecaoLocais(context),
            const SizedBox(height: 16),

            // Related doctrines
            _buildSecaoDoutrinas(context),
            const SizedBox(height: 16),

            // Cross-references
            _buildSecaoReferencias(context),
            const SizedBox(height: 16),

            // Related characters
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
      'abraao': 'אַבְרָהָם (Avraham)',
      'moises': 'מֹשֶׁה (Moshe)',
      'davi': 'דָּוִד (Dawid)',
      'daniel': 'דָּנִיֵּאל (Daniyyel)',
      'pedro': 'Πέτρος (Petros)',
      'paulo': 'Παῦλος (Paulos)',
      'maria-mae': 'מִרְיָם (Miryam)',
      'joao-batista': 'יוחנן (Yochanan)',
    };
    return scripts[personagem.slug];
  }

  String? _significado() {
    final Map<String, String> significados = {
      'abraao': 'Pai de multidões',
      'moises': 'Tirado das águas',
      'davi': 'Amado',
      'daniel': 'Deus é meu juiz',
      'pedro': 'Pedra, rocha',
      'paulo': 'Pequeno, humilde',
      'maria-mae': 'Amada, senhora',
      'joao-batista': 'Deus é misericordioso',
    };
    return significados[personagem.slug];
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
        ...personagem.referencias.map((ref) {
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
                testamento: personagem.testamento,
                size: 36,
              ),
              title: Text(nome),
              trailing: const Icon(Icons.chevron_right),
              onTap: () {},
            ),
          );
        }),
      ],
    );
  }

  List<String> _obterEventos() {
    final Map<String, List<String>> eventos = {
      'abraao': [
        'Chamado por Deus (Gn 12)',
        'Aliança com Deus (Gn 15)',
        'Sacrifício de Isaac (Gn 22)',
      ],
      'moises': [
        'Nascimento e salvação nas águas (Êx 2)',
        'Sarça ardente (Êx 3)',
        'Êxodo do Egito (Êx 14)',
        'Entrega da Lei no Sinai (Êx 20)',
      ],
      'davi': [
        'Ungido por Samuel (1 Sm 16)',
        'Vitória sobre Golias (1 Sm 17)',
        'Rei de Israel (2 Sm 5)',
        'Pecado e arrependimento (2 Sm 12)',
      ],
      'pedro': [
        'Chamado por Jesus (Mt 4)',
        'Confissão em Cesareia (Mt 16)',
        'Negação e restauração (Jo 21)',
        'Pentecostes (At 2)',
      ],
      'paulo': [
        'Conversão no caminho de Damasco (At 9)',
        'Primeira viagem missionária (At 13)',
        'Cartas aos churches',
        'Prisão e apelação a César (At 25)',
      ],
    };
    return eventos[personagem.slug] ?? ['Vida dedicada a Deus'];
  }

  Map<String, String> _obterFamilia() {
    final Map<String, Map<String, String>> familias = {
      'abraao': {
        'Pai': 'Térate',
        'Esposa': 'Sara',
        'Filho': 'Isaque',
      },
      'moises': {
        'Irmã': 'Miriam',
        'Irmão': 'Aarão',
        'Esposa': 'Zípora',
      },
      'davi': {
        'Pai': 'Jesse',
        'Filho': 'Salomão',
      },
      'pedro': {
        'Esposa': 'Citada em 1 Co 9:5',
      },
    };
    return familias[personagem.slug] ?? {};
  }

  List<String> _obterEventosPrincipais() {
    final Map<String, List<String>> eventos = {
      'abraao': [
        'Deixou Ur dos caldeus',
        'Separou-se de Ló',
        'Recebeu a promessa de um filho',
        'Circuncidou os seus',
      ],
      'moises': [
        'Criado na corte do Faraó',
        'Matou um egípcio',
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
    return eventos[personagem.slug] ?? [];
  }

  List<String> _obterLocais() {
    final Map<String, List<String>> locais = {
      'abraao': ['Ur', 'Canaã', 'Hebron', 'Monte Moria'],
      'moises': ['Egito', 'Monte Sinai', 'Deserto', 'Monte Nebo'],
      'davi': ['Belém', 'Jerusalém', 'Hebroém'],
      'pedro': ['Galileia', 'Jerusalém', 'Antioquia', 'Roma'],
      'paulo': ['Tarso', 'Damasco', 'Corinto', 'Efeso', 'Roma'],
    };
    return locais[personagem.slug] ?? [];
  }

  List<String> _obterDoutrinas() {
    final Map<String, List<String>> doutrinas = {
      'abraao': ['Aliança', 'Justificação pela fé', 'Promessa messiânica'],
      'moises': ['Lei', 'Redenção', 'Tipologia de Cristo'],
      'davi': ['Reinado messiânico', 'Aliança davídica', 'Arrependimento'],
      'pedro': ['Igreja', 'Pentecostes', 'Missões'],
      'paulo': ['Justificação', 'Graça', 'Mistério do evangelho'],
    };
    return doutrinas[personagem.slug] ?? [];
  }

  List<String> _obterRelacionados() {
    final Map<String, List<String>> rels = {
      'abraao': ['Isaque', 'Jacó', 'Sara', 'Lot'],
      'moises': ['Josué', 'Aarão', 'Miriam', 'Faraó'],
      'davi': ['Salomão', 'Samuel', ' Saul', 'Natã'],
      'pedro': ['Paulo', 'João', 'Tiago', 'André'],
      'paulo': ['Barnabé', 'Timóteo', 'Silas', 'Pedro'],
    };
    return rels[personagem.slug] ?? [];
  }
}
