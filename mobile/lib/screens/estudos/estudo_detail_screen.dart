import 'package:flutter/material.dart';
import 'package:share_plus/share_plus.dart';

import '../../models/estudo.dart';

class EstudoDetailScreen extends StatelessWidget {
  final Estudo estudo;

  const EstudoDetailScreen({super.key, required this.estudo});

  factory EstudoDetailScreen.fromSlug({Key? key, required String slug}) {
    final estudo = _estudos.firstWhere(
      (e) => e.slug == slug,
      orElse: () => const Estudo(
        slug: '',
        titulo: 'Estudo não encontrado',
        autor: '',
      ),
    );
    return EstudoDetailScreen(key: key, estudo: estudo);
  }

  static const List<Estudo> _estudos = [
    Estudo(
      slug: 'romanos',
      titulo: 'Romanos: O Evangelho da Graça',
      autor: 'Equipe Sola Scriptura',
      versiculosChave: ['Romanos 1:16-17', 'Romanos 3:23-24', 'Romanos 8:28'],
    ),
    Estudo(
      slug: 'genesis',
      titulo: 'Gênesis: A Criação e o Pacto',
      autor: 'Equipe Sola Scriptura',
      versiculosChave: ['Gênesis 1:1', 'Gênesis 12:1-3', 'Gênesis 15:6'],
    ),
    Estudo(
      slug: 'joao',
      titulo: 'João: O Verbo Encarnado',
      autor: 'Equipe Sola Scriptura',
      versiculosChave: ['João 1:1', 'João 3:16', 'João 14:6'],
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(estudo.titulo),
        actions: [
          IconButton(
            icon: const Icon(Icons.share),
            tooltip: 'Compartilhar',
            onPressed: () => _compartilhar(context),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Author + date
            Row(
              children: [
                Icon(Icons.person_outline,
                    size: 16, color: theme.colorScheme.onSurfaceVariant),
                const SizedBox(width: 4),
                Text(
                  estudo.autor,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                if (estudo.data != null) ...[
                  const SizedBox(width: 16),
                  Icon(Icons.calendar_today,
                      size: 14, color: theme.colorScheme.onSurfaceVariant),
                  const SizedBox(width: 4),
                  Text(
                    estudo.data!,
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ],
            ),
            const SizedBox(height: 16),

            // Genre tag
            if (estudo.contexto != null) ...[
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: theme.colorScheme.secondaryContainer,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Text(
                  'Estudo Bíblico',
                  style: theme.textTheme.labelSmall?.copyWith(
                    color: theme.colorScheme.onSecondaryContainer,
                  ),
                ),
              ),
              const SizedBox(height: 16),
            ],

            // Context paragraph
            if (estudo.contexto != null) ...[
              Text(
                'Contexto',
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                estudo.contexto!,
                style: theme.textTheme.bodyLarge,
              ),
              const SizedBox(height: 20),
            ],

            // Theme pills
            _buildTemasPills(context),
            const SizedBox(height: 20),

            // Key verses
            if (estudo.versiculosChave.isNotEmpty) ...[
              Text(
                'Versículos-Chave',
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 8),
              ...estudo.versiculosChave.map(
                (v) => _buildVersiculoChave(context, v),
              ),
              const SizedBox(height: 20),
            ],

            // Practical application
            _buildSecaoAplicacao(context),
            const SizedBox(height: 20),

            // Study questions
            _buildSecaoPerguntas(context),
            const SizedBox(height: 24),

            // Share button
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: () => _compartilhar(context),
                icon: const Icon(Icons.share),
                label: const Text('Compartilhar Estudo'),
              ),
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildTemasPills(BuildContext context) {
    final theme = Theme.of(context);
    final temas = _extrairTemas();

    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: temas.map((tema) {
        return Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
          decoration: BoxDecoration(
            color: theme.colorScheme.tertiaryContainer,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Text(
            tema,
            style: theme.textTheme.labelMedium?.copyWith(
              color: theme.colorScheme.onTertiaryContainer,
            ),
          ),
        );
      }).toList(),
    );
  }

  List<String> _extrairTemas() {
    final themes = <String>[];
    if (estudo.titulo.toLowerCase().contains('criação')) themes.add('Criação');
    if (estudo.titulo.toLowerCase().contains('justificação')) {
      themes.add('Salvação');
    }
    if (estudo.titulo.toLowerCase().contains('divino')) {
      themes.add('Cristologia');
    }
    if (estudo.titulo.toLowerCase().contains('armadura')) {
      themes.add('Vida Cristã');
    }
    if (estudo.titulo.toLowerCase().contains('lamento')) {
      themes.add('Salmos');
    }
    if (estudo.titulo.toLowerCase().contains('sacerdócio')) {
      themes.add('Sacerdócio');
    }
    if (themes.isEmpty) {
      themes.add('Geral');
    }
    return themes;
  }

  Widget _buildVersiculoChave(BuildContext context, String versiculo) {
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
          // Navigate to verse in Bible reader
        },
      ),
    );
  }

  Widget _buildSecaoAplicacao(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Aplicação Prática',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildItemAplicacao(
                  context,
                  Icons.lightbulb_outline,
                  'Reflexão',
                  'Como este estudo se aplica à sua vida diária?',
                ),
                const SizedBox(height: 12),
                _buildItemAplicacao(
                  context,
                  Icons.question_answer,
                  'Discussão',
                  'Compartilhe com seu grupo de estudo as principais lições.',
                ),
                const SizedBox(height: 12),
                _buildItemAplicacao(
                  context,
                  Icons.assignment,
                  'Ação',
                  'Escolha um versículo-chave para memorizar esta semana.',
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildItemAplicacao(
    BuildContext context,
    IconData icon,
    String titulo,
    String descricao,
  ) {
    final theme = Theme.of(context);
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(icon, size: 20, color: theme.colorScheme.primary),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                titulo,
                style: theme.textTheme.titleSmall?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                descricao,
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildSecaoPerguntas(BuildContext context) {
    final theme = Theme.of(context);
    final perguntas = _gerarPerguntas();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Perguntas de Estudo',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        ...perguntas.asMap().entries.map((entry) {
          return Card(
            margin: const EdgeInsets.only(bottom: 8),
            child: ExpansionTile(
              leading: CircleAvatar(
                radius: 14,
                backgroundColor: theme.colorScheme.primaryContainer,
                child: Text(
                  '${entry.key + 1}',
                  style: TextStyle(
                    fontSize: 12,
                    color: theme.colorScheme.primary,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              title: Text(
                entry.value,
                style: theme.textTheme.bodyMedium,
              ),
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                  child: Text(
                    'Reserve um tempo para meditar sobre esta pergunta. '
                    'Considere o contexto do estudo e como se aplica à sua vida.',
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ),
              ],
            ),
          );
        }),
      ],
    );
  }

  List<String> _gerarPerguntas() {
    return [
      'Qual é a mensagem central deste estudo?',
      'Como este texto se conecta com o resto das Escrituras?',
      'Que mudanças práticas este estudo traz para sua vida?',
      'Como você pode compartilhar essa lição com outros?',
    ];
  }

  void _compartilhar(BuildContext context) {
    final texto = '''
📚 Estudo: ${estudo.titulo}
✍️ Autor: ${estudo.autor}
${estudo.data != null ? '📅 Data: ${estudo.data}' : ''}

${estudo.contexto ?? ''}

Versículos-Chave:
${estudo.versiculosChave.map((v) => '• $v').join('\n')}

Compartilhado via Sola Scriptura BR
''';
    Share.share(texto);
  }
}
