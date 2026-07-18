import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../models/pesquisa.dart';
import '../../providers/pesquisa_provider.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/error_display.dart';
import '../../widgets/loading_shimmer.dart';
import '../../widgets/search_bar_widget.dart';
import 'result_card.dart';

class PesquisaScreen extends StatefulWidget {
  const PesquisaScreen({super.key});

  @override
  State<PesquisaScreen> createState() => _PesquisaScreenState();
}

class _PesquisaScreenState extends State<PesquisaScreen> {
  final TextEditingController _searchController = TextEditingController();
  String? _tipoFilter;

  static const _tiposPesquisa = [
    SearchFilterChip(label: 'Tudo', value: '', icon: Icons.all_inclusive),
    SearchFilterChip(label: 'Versiculos', value: 'versiculo', icon: Icons.menu_book),
    SearchFilterChip(label: 'Palavras', value: 'lexicon', icon: Icons.translate),
    SearchFilterChip(label: 'Comentarios', value: 'comentario', icon: Icons.comment),
    SearchFilterChip(label: 'Estudos', value: 'estudo', icon: Icons.school),
  ];

  static const _sugestoes = [
    'Amor',
    'Graça',
    'Fé',
    'Salvação',
    'Reino de Deus',
    'Espírito Santo',
    'Promessas',
    'Oração',
  ];

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _pesquisar(String query) {
    if (query.trim().isEmpty) return;
    final provider = context.read<PesquisaProvider>();
    if (_tipoFilter != null && _tipoFilter!.isNotEmpty) {
      provider.pesquisarPorTipo(query, _tipoFilter!);
    } else {
      provider.pesquisar(query);
    }
  }

  void _limparPesquisa() {
    _searchController.clear();
    context.read<PesquisaProvider>().limpar();
    setState(() => _tipoFilter = null);
  }

  void _navegarParaResultado(ResultadoPesquisa resultado) {
    if (resultado.isVersiculo && resultado.referencia != null) {
      Navigator.of(context).pushNamed(
        '/biblia',
        arguments: resultado.referencia,
      );
    } else if (resultado.isEstudo && resultado.referencia != null) {
      Navigator.of(context).pushNamed('/estudos/${resultado.referencia}');
    } else if (resultado.isLexicon && resultado.referencia != null) {
      Navigator.of(context).pushNamed('/lexicon/${resultado.referencia}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Pesquisa'),
        actions: [
          Consumer<PesquisaProvider>(
            builder: (context, provider, _) {
              if (provider.query.isEmpty) return const SizedBox.shrink();
              return IconButton(
                icon: const Icon(Icons.clear_all),
                tooltip: 'Limpar',
                onPressed: _limparPesquisa,
              );
            },
          ),
        ],
      ),
      body: Column(
        children: [
          SearchBarWidget(
            controller: _searchController,
            hint: 'Pesquisar na Biblia, palavras, comentarios...',
            autofocus: true,
            filters: _tiposPesquisa,
            selectedFilter: _tipoFilter,
            onFilterChanged: (value) {
              setState(() => _tipoFilter = value);
              if (_searchController.text.isNotEmpty) {
                _pesquisar(_searchController.text);
              }
            },
            onSubmitted: _pesquisar,
          ),
          Expanded(
            child: Consumer<PesquisaProvider>(
              builder: (context, provider, _) {
                return _buildBody(provider);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBody(PesquisaProvider provider) {
    if (provider.isLoading) {
      return const Padding(
        padding: EdgeInsets.all(16),
        child: LoadingShimmer(count: 6),
      );
    }

    if (provider.error != null) {
      return ErrorDisplay(
        message: provider.error!,
        onRetry: () => _pesquisar(provider.query),
      );
    }

    if (provider.resultados.isNotEmpty) {
      return _buildResultados(provider.resultados);
    }

    if (provider.query.isNotEmpty) {
      return EmptyState(
        icon: Icons.search_off,
        title: 'Nenhum resultado',
        message: 'Nenhum resultado encontrado para "${provider.query}"',
      );
    }

    return _buildInitialContent(provider);
  }

  Widget _buildInitialContent(PesquisaProvider provider) {
    final theme = Theme.of(context);
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        if (provider.historico.isNotEmpty) ...[
          _buildSectionHeader('Pesquisas recentes', Icons.history),
          const SizedBox(height: 8),
          ...provider.historico.take(5).map(
                (item) => ListTile(
                  leading: const Icon(Icons.history, size: 20),
                  title: Text(item),
                  dense: true,
                  onTap: () {
                    _searchController.text = item;
                    _pesquisar(item);
                  },
                  trailing: IconButton(
                    icon: const Icon(Icons.north_west, size: 18),
                    onPressed: () {
                      _searchController.text = item;
                    },
                  ),
                ),
              ),
          const SizedBox(height: 16),
        ],
        _buildSectionHeader('Sugestoes de pesquisa', Icons.lightbulb_outline),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: _sugestoes.map((sugestao) {
            return ActionChip(
              label: Text(sugestao),
              onPressed: () {
                _searchController.text = sugestao;
                _pesquisar(sugestao);
              },
            );
          }).toList(),
        ),
        const SizedBox(height: 24),
        _buildSectionHeader('Dicas de pesquisa', Icons.tips_and_updates),
        const SizedBox(height: 8),
        _buildDicaCard(
          theme,
          Icons.menu_book,
          'Versiculos',
          'Pesquise por palavras-chave nos versiculos da Biblia',
        ),
        _buildDicaCard(
          theme,
          Icons.translate,
          'Léxico',
          'Busque palavras gregas ou hebraicas pelo significado',
        ),
        _buildDicaCard(
          theme,
          Icons.comment,
          'Comentarios',
          'Encontre comentarios de teologos sobre passagens',
        ),
        _buildDicaCard(
          theme,
          Icons.school,
          'Estudos',
          'Acesse estudos teologicos por tema ou livro',
        ),
      ],
    );
  }

  Widget _buildSectionHeader(String title, IconData icon) {
    final theme = Theme.of(context);
    return Row(
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
    );
  }

  Widget _buildDicaCard(
    ThemeData theme,
    IconData icon,
    String title,
    String subtitle,
  ) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: Icon(icon, color: theme.colorScheme.primary),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w500)),
        subtitle: Text(subtitle, style: const TextStyle(fontSize: 13)),
        dense: true,
      ),
    );
  }

  Widget _buildResultados(List<ResultadoPesquisa> resultados) {
    return ListView.separated(
      padding: const EdgeInsets.symmetric(vertical: 8),
      itemCount: resultados.length,
      separatorBuilder: (_, __) => const SizedBox(height: 2),
      itemBuilder: (context, index) {
        final resultado = resultados[index];
        return ResultCard(
          resultado: resultado,
          onTap: () => _navegarParaResultado(resultado),
        );
      },
    );
  }
}
