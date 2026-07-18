import 'package:flutter/material.dart';

import '../../models/teologia.dart';

class DoutrinaScreen extends StatelessWidget {
  final Doutrina doutrina;

  const DoutrinaScreen({super.key, required this.doutrina});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(doutrina.nome),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Category badge
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: theme.colorScheme.secondaryContainer,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Text(
                doutrina.categoria,
                style: theme.textTheme.labelSmall?.copyWith(
                  color: theme.colorScheme.onSecondaryContainer,
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Doctrine name
            Text(
              doutrina.nome,
              style: theme.textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),

            // Full description
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Text(
                  doutrina.descricao,
                  style: theme.textTheme.bodyLarge,
                ),
              ),
            ),
            const SizedBox(height: 24),

            // Key verses
            if (doutrina.versiculos.isNotEmpty) ...[
              Text(
                'Versículos-Chave',
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 8),
              ...doutrina.versiculos.map((v) => _buildVersiculoCard(context, v)),
              const SizedBox(height: 24),
            ],

            // Cross-references
            _buildSecaoReferenciasCruzadas(context),
            const SizedBox(height: 24),

            // Related doctrines
            _buildSecaoDoutrinasRelacionadas(context),
            const SizedBox(height: 24),

            // Historical context
            _buildSecaoContextoHistorico(context),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildVersiculoCard(BuildContext context, String versiculo) {
    final theme = Theme.of(context);
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: Icon(
          Icons.auto_stories,
          color: theme.colorScheme.primary,
        ),
        title: Text(
          versiculo,
          style: theme.textTheme.bodyMedium?.copyWith(
            fontWeight: FontWeight.w500,
          ),
        ),
        trailing: const Icon(Icons.chevron_right),
        onTap: () {
          // Navigate to Bible reader
        },
      ),
    );
  }

  Widget _buildSecaoReferenciasCruzadas(BuildContext context) {
    final theme = Theme.of(context);
    final referencias = _obterReferencias();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Referências Cruzadas',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        ...referencias.map((ref) {
          return Card(
            margin: const EdgeInsets.only(bottom: 6),
            child: ListTile(
              dense: true,
              leading: Icon(
                Icons.link,
                size: 18,
                color: theme.colorScheme.primary,
              ),
              title: Text(
                ref,
                style: theme.textTheme.bodyMedium,
              ),
              onTap: () {},
            ),
          );
        }),
      ],
    );
  }

  Widget _buildSecaoDoutrinasRelacionadas(BuildContext context) {
    final theme = Theme.of(context);
    final relacionadas = _obterRelacionadas();

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
          children: relacionadas.map((d) {
            return ActionChip(
              label: Text(d),
              onPressed: () {},
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildSecaoContextoHistorico(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Contexto Histórico',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Text(
              _obterContextoHistorico(),
              style: theme.textTheme.bodyMedium,
            ),
          ),
        ),
      ],
    );
  }

  List<String> _obterReferencias() {
    final Map<String, List<String>> refs = {
      'Trindade': ['Mateus 3:16-17', '2 Coríntios 13:14', '1 Pedro 1:2'],
      'Atributos de Deus': ['Salmos 139:1-6', 'Isaías 6:3', 'Apocalipse 4:8'],
      'Encarnação': ['Filipenses 2:5-11', 'Hebreus 1:1-3', 'Colossenses 1:15-20'],
      'Ressurreição': ['1 Coríntios 15:3-8', 'Atos 2:24', 'Romanos 1:4'],
      'Justificação': ['Gálatas 2:16', 'Tiago 2:14-26', 'Hebreus 11:6'],
      'Regeneração': ['João 3:5-8', 'Efésios 2:4-5', '1 Pedro 1:23'],
    };
    return refs[doutrina.nome] ?? [];
  }

  List<String> _obterRelacionadas() {
    final Map<String, List<String>> rel = {
      'Trindade': ['Cristologia', 'Pneumatologia', 'Teologia Própria'],
      'Atributos de Deus': ['Trindade', 'Soteriologia', 'Escatologia'],
      'Encarnação': ['Cristologia', 'Soteriologia', 'Hamartiologia'],
      'Ressurreição': ['Cristologia', 'Escatologia', 'Soteriologia'],
      'Justificação': ['Soteriologia', 'Hamartiologia', 'Cristologia'],
      'Regeneração': ['Soteriologia', 'Pneumatologia', 'Hamartiologia'],
    };
    return rel[doutrina.nome] ?? [];
  }

  String _obterContextoHistorico() {
    final Map<String, String> contextos = {
      'Trindade':
          'A doutrina da Trindade foi desenvolvida ao longo dos primeiros '
          'séculos da Igreja, em resposta a heresias como o arianismo. '
          'O Concílio de Niceia (325 d.C.) affirmou a divindade do Filho.',
      'Atributos de Deus':
          'Os atributos de Deus têm sido estudados desde os Pais da Igreja. '
          'Agostinho e Tomás de Aquino foram fundamentais na formulação '
          'teológica dos atributos divinos.',
      'Encarnação':
          'O Concílio de Calcedônia (451 d.C.) definiu que Cristo é '
          'verdadeiro Deus e verdadeiro homem, em duas naturezas inseparáveis.',
      'Ressurreição':
          'A ressurreição de Cristo é o centro da fé cristã desde o '
          'primeiro século. Paulo argumenta em 1 Coríntios 15 que sem '
          'a ressurreição, a fé seria vã.',
      'Justificação':
          'A doutrina da justificação foi central na Reforma Protestante. '
          'Lutero a chamou de "artigo pelo qual a igreja subsiste ou cai".',
      'Regeneração':
          'A regeneração é ato soberano de Deus pelo Espírito Santo, '
          'testemunhado desde o Antigo Testamento em Ezequiel 36:26-27.',
    };
    return contextos[doutrina.nome] ??
        'Esta doutrina tem raízes profundas na história da Igreja cristã, '
            'sendo desenvolvida através dos concílios ecumênicos e da '
            'tradição teológica ao longo dos séculos.';
  }
}
