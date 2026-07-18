import 'package:flutter/material.dart';

import '../../models/lexicon.dart';
import '../../services/lexicon_service.dart';
import '../../services/api_client.dart';
import '../../widgets/error_display.dart';

class PalavraDetailScreen extends StatefulWidget {
  final PalavraLexicon palavra;

  const PalavraDetailScreen({super.key, required this.palavra});

  @override
  State<PalavraDetailScreen> createState() => _PalavraDetailScreenState();
}

class _PalavraDetailScreenState extends State<PalavraDetailScreen> {
  late final LexiconService _lexiconService;
  PalavraLexicon? _palavraDetalhe;
  bool _isLoading = false;
  String? _erro;

  @override
  void initState() {
    super.initState();
    _lexiconService = LexiconService(ApiClient());
    _palavraDetalhe = widget.palavra;
    _carregarDetalhe();
  }

  Future<void> _carregarDetalhe() async {
    setState(() {
      _isLoading = true;
      _erro = null;
    });
    try {
      final detalhe = await _lexiconService.buscarPorStrong(widget.palavra.strong);
      if (mounted && detalhe != null) {
        setState(() {
          _palavraDetalhe = detalhe;
          _isLoading = false;
        });
      } else if (mounted) {
        setState(() => _isLoading = false);
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _erro = e.toString();
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final palavra = _palavraDetalhe ?? widget.palavra;

    return Scaffold(
      appBar: AppBar(
        title: Text(palavra.palavra),
        actions: [
          IconButton(
            icon: const Icon(Icons.share),
            tooltip: 'Compartilhar',
            onPressed: () {
              // Share placeholder
            },
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _erro != null
              ? ErrorDisplay(
                  message: _erro!,
                  onRetry: _carregarDetalhe,
                )
              : _buildContent(palavra, theme),
    );
  }

  Widget _buildContent(PalavraLexicon palavra, ThemeData theme) {
    return ListView(
      padding: const EdgeInsets.all(20),
      children: [
        _buildPalavraOriginal(palavra, theme),
        const SizedBox(height: 24),
        _buildTransliteracao(palavra, theme),
        const SizedBox(height: 16),
        _buildInfoChips(palavra, theme),
        const SizedBox(height: 24),
        _buildDefinicao(palavra, theme),
        const SizedBox(height: 24),
        _buildMorfologia(palavra, theme),
        const SizedBox(height: 24),
        _buildFrequencia(palavra, theme),
        const SizedBox(height: 24),
        _buildOcorrencias(palavra, theme),
        const SizedBox(height: 24),
        _buildPalavrasRelacionadas(palavra, theme),
      ],
    );
  }

  Widget _buildPalavraOriginal(PalavraLexicon palavra, ThemeData theme) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: theme.colorScheme.primaryContainer.withOpacity(0.3),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: [
          Text(
            palavra.palavra,
            style: const TextStyle(
              fontSize: 48,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
            decoration: BoxDecoration(
              color: theme.colorScheme.primary.withOpacity(0.12),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text(
              'Strong\'s ${palavra.strong}',
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w600,
                color: theme.colorScheme.primary,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTransliteracao(PalavraLexicon palavra, ThemeData theme) {
    if (palavra.transliteracao.isEmpty) return const SizedBox.shrink();
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(
          Icons.record_voice_over,
          size: 20,
          color: theme.colorScheme.onSurfaceVariant,
        ),
        const SizedBox(width: 8),
        Text(
          palavra.transliteracao,
          style: TextStyle(
            fontSize: 20,
            fontStyle: FontStyle.italic,
            color: theme.colorScheme.onSurfaceVariant,
          ),
        ),
      ],
    );
  }

  Widget _buildInfoChips(PalavraLexicon palavra, ThemeData theme) {
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      alignment: WrapAlignment.center,
      children: [
        _InfoChip(
          label: palavra.isGrego ? 'Grego' : 'Hebraico',
          color: palavra.isGrego ? Colors.blue : Colors.teal,
          icon: palavra.isGrego ? Icons.language : Icons.translate,
        ),
        _InfoChip(
          label: palavra.strong,
          color: theme.colorScheme.primary,
          icon: Icons.tag,
        ),
      ],
    );
  }

  Widget _buildDefinicao(PalavraLexicon palavra, ThemeData theme) {
    return _Section(
      title: 'Definicao',
      icon: Icons.description,
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Text(
            palavra.definicao.isNotEmpty
                ? palavra.definicao
                : 'Definicao nao disponivel.',
            style: const TextStyle(fontSize: 16, height: 1.6),
          ),
        ),
      ),
    );
  }

  Widget _buildMorfologia(PalavraLexicon palavra, ThemeData theme) {
    return _Section(
      title: 'Morfologia',
      icon: Icons.account_tree,
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              _MorfologiaRow(label: 'Tipo', valor: _tipoPalavra(palavra)),
              const Divider(),
              _MorfologiaRow(label: 'Genero', valor: _genero(palavra)),
              const Divider(),
              _MorfologiaRow(label: 'Numero', valor: _numero(palavra)),
              const Divider(),
              _MorfologiaRow(label: 'Pessoa', valor: _pessoa(palavra)),
            ],
          ),
        ),
      ),
    );
  }

  String _tipoPalavra(PalavraLexicon palavra) {
    final definicao = palavra.definicao.toLowerCase();
    if (definicao.contains('verb')) return 'Verbo';
    if (definicao.contains('noun') || definicao.contains('substantivo')) return 'Substantivo';
    if (definicao.contains('adj') || definicao.contains('adjectiv')) return 'Adjetivo';
    if (definicao.contains('adv') || definicao.contains('adverb')) return 'Adverbio';
    if (definicao.contains('prep') || definicao.contains('preposicao')) return 'Preposicao';
    if (definicao.contains('conj') || definicao.contains('conjuncao')) return 'Conjuncao';
    if (definicao.contains('pron') || definicao.contains('pronome')) return 'Pronome';
    if (definicao.contains('part') || definicao.contains('particula')) return 'Particula';
    return 'N/D';
  }

  String _genero(PalavraLexicon palavra) {
    final strong = palavra.strong;
    if (strong.startsWith('H')) {
      return 'Masculino / Feminino';
    }
    return 'Masculino / Feminino / Neutro';
  }

  String _numero(PalavraLexicon palavra) {
    return 'Singular / Plural';
  }

  String _pessoa(PalavraLexicon palavra) {
    return '1a / 2a / 3a pessoa';
  }

  Widget _buildFrequencia(PalavraLexicon palavra, ThemeData theme) {
    return _Section(
      title: 'Frequencia',
      icon: Icons.bar_chart,
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.analytics,
                size: 40,
                color: theme.colorScheme.primary,
              ),
              const SizedBox(width: 16),
              Column(
                children: [
                  Text(
                    'Detalhes de ocorrencia',
                    style: theme.textTheme.titleMedium,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Consulte as ocorrencias abaixo',
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildOcorrencias(PalavraLexicon palavra, ThemeData theme) {
    return _Section(
      title: 'Ocorrencias',
      icon: Icons.format_list_numbered,
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              ListTile(
                leading: const Icon(Icons.menu_book),
                title: const Text('Pesquisar versiculos'),
                subtitle: const Text(
                  'Encontre onde esta palavra aparece na Biblia',
                ),
                trailing: const Icon(Icons.chevron_right),
                onTap: () {
                  Navigator.of(context).pushNamed(
                    '/pesquisa',
                    arguments: palavra.palavra,
                  );
                },
                contentPadding: EdgeInsets.zero,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPalavrasRelacionadas(PalavraLexicon palavra, ThemeData theme) {
    return _Section(
      title: 'Palavras relacionadas',
      icon: Icons.device_hub,
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              ListTile(
                leading: const Icon(Icons.search),
                title: const Text('Buscar raiz hebraica/grega'),
                subtitle: Text(
                  'Procure por radicais da raiz ${palavra.strong}',
                ),
                trailing: const Icon(Icons.chevron_right),
                onTap: () {
                  Navigator.of(context).pushNamed(
                    '/lexicon',
                    arguments: palavra.strong,
                  );
                },
                contentPadding: EdgeInsets.zero,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _Section extends StatelessWidget {
  final String title;
  final IconData icon;
  final Widget child;

  const _Section({
    required this.title,
    required this.icon,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Icon(icon, size: 20, color: theme.colorScheme.primary),
            const SizedBox(width: 8),
            Text(
              title,
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        child,
      ],
    );
  }
}

class _InfoChip extends StatelessWidget {
  final String label;
  final Color color;
  final IconData icon;

  const _InfoChip({
    required this.label,
    required this.color,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: color.withOpacity(0.12),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 16, color: color),
          const SizedBox(width: 6),
          Text(
            label,
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: color,
            ),
          ),
        ],
      ),
    );
  }
}

class _MorfologiaRow extends StatelessWidget {
  final String label;
  final String valor;

  const _MorfologiaRow({required this.label, required this.valor});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(
              color: Theme.of(context).colorScheme.onSurfaceVariant,
            ),
          ),
          Text(
            valor,
            style: const TextStyle(fontWeight: FontWeight.w500),
          ),
        ],
      ),
    );
  }
}
