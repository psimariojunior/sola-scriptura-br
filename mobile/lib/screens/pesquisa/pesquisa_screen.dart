import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../models/search_result.dart';
import '../../providers/pesquisa_provider.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/error_display.dart';
import '../../widgets/loading_shimmer.dart';
import 'result_card.dart';

class PesquisaScreen extends StatefulWidget {
  const PesquisaScreen({super.key});

  @override
  State<PesquisaScreen> createState() => _PesquisaScreenState();
}

class _PesquisaScreenState extends State<PesquisaScreen> {
  final TextEditingController _searchController = TextEditingController();
  final FocusNode _searchFocus = FocusNode();
  SearchResultType? _tipoFilter;
  String _sugestoesVisiveis = '';

  static const _tiposPesquisa = <_FilterOption>[
    _FilterOption(label: 'Tudo', value: null, icon: Icons.all_inclusive),
    _FilterOption(label: 'Versículos', value: SearchResultType.verse, icon: Icons.menu_book),
    _FilterOption(label: 'Palavras', value: SearchResultType.lexicon, icon: Icons.translate),
    _FilterOption(label: 'Comentários', value: SearchResultType.commentary, icon: Icons.comment),
    _FilterOption(label: 'Personagens', value: SearchResultType.character, icon: Icons.person),
    _FilterOption(label: 'Teologia', value: SearchResultType.theology, icon: Icons.account_balance),
    _FilterOption(label: 'Estudos', value: SearchResultType.study, icon: Icons.school),
  ];

  static const _sugestoes = [
    'Amor', 'Graça', 'Fé', 'Salvação', 'Reino de Deus',
    'Espírito Santo', 'Promessas', 'Oração', 'Aliança', 'Redenção',
  ];

  @override
  void initState() {
    super.initState();
    _searchController.addListener(_onTextChanged);
  }

  @override
  void dispose() {
    _searchController.removeListener(_onTextChanged);
    _searchController.dispose();
    _searchFocus.dispose();
    super.dispose();
  }

  void _onTextChanged() {
    final text = _searchController.text;
    if (text.isEmpty) {
      setState(() => _sugestoesVisiveis = '');
      return;
    }
    final provider = context.read<PesquisaProvider>();
    final sugs = provider.getSuggestions(text);
    if (mounted) {
      setState(() => _sugestoesVisiveis = sugs.isEmpty ? '' : sugs.first);
    }
  }

  void _pesquisar(String query) {
    if (query.trim().isEmpty) return;
    final provider = context.read<PesquisaProvider>();
    provider.setTipoFilter(_tipoFilter);
    provider.pesquisar(query);
    setState(() => _sugestoesVisiveis = '');
    _searchFocus.unfocus();
  }

  void _limparPesquisa() {
    _searchController.clear();
    context.read<PesquisaProvider>().limpar();
    setState(() {
      _tipoFilter = null;
      _sugestoesVisiveis = '';
    });
    _searchFocus.requestFocus();
  }

  void _navegarParaResultado(SearchResult resultado) {
    switch (resultado.tipo) {
      case SearchResultType.verse:
        if (resultado.referencia != null) {
          context.push('/biblia', extra: resultado.referencia);
        }
        break;
      case SearchResultType.commentary:
        if (resultado.referencia != null) {
          context.push('/comentarios/${resultado.referencia}');
        }
        break;
      case SearchResultType.lexicon:
        if (resultado.strong != null) {
          final lang = resultado.idioma == 'hebraico' ? 'hebraico' : 'grego';
          context.push('/idiomas/$lang/${resultado.strong}');
        }
        break;
      case SearchResultType.character:
        if (resultado.referencia != null) {
          context.push('/personagens/${resultado.referencia}');
        }
        break;
      case SearchResultType.theology:
        if (resultado.referencia != null) {
          final parts = resultado.referencia!.split('/');
          if (parts.length == 2) {
            context.push('/teologia/${parts[0]}/${parts[1]}');
          } else {
            context.push('/teologia/${resultado.referencia}');
          }
        }
        break;
      case SearchResultType.study:
        if (resultado.referencia != null) {
          context.push('/estudos/${resultado.referencia}');
        }
        break;
      case SearchResultType.introduction:
        if (resultado.referencia != null) {
          context.push('/introducoes/${resultado.referencia}');
        }
        break;
      case SearchResultType.textualCriticism:
        context.push('/critica-textual');
        break;
      case SearchResultType.chronology:
        context.push('/cronologia');
        break;
      case SearchResultType.pericope:
        context.push('/biblia');
        break;
      case SearchResultType.synoptic:
        context.push('/harmonia');
        break;
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
          _buildSearchBar(),
          if (_sugestoesVisiveis.isNotEmpty) _buildSugestoesAutocomplete(),
          _buildFilterChips(),
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

  Widget _buildSearchBar() {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
      child: TextField(
        controller: _searchController,
        focusNode: _searchFocus,
        autofocus: true,
        textInputAction: TextInputAction.search,
        decoration: InputDecoration(
          hintText: 'Pesquisar versículos, palavras, comentários...',
          prefixIcon: const Icon(Icons.search),
          suffixIcon: _searchController.text.isNotEmpty
              ? IconButton(
                  icon: const Icon(Icons.clear),
                  onPressed: _limparPesquisa,
                )
              : null,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          filled: true,
          fillColor: theme.colorScheme.surfaceContainerHigh,
          contentPadding: const EdgeInsets.symmetric(
            horizontal: 16,
            vertical: 14,
          ),
        ),
        onSubmitted: _pesquisar,
      ),
    );
  }

  Widget _buildSugestoesAutocomplete() {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 0),
      child: Material(
        color: theme.colorScheme.primaryContainer.withValues(alpha: 0.4),
        borderRadius: BorderRadius.circular(8),
        child: InkWell(
          borderRadius: BorderRadius.circular(8),
          onTap: () {
            _searchController.text = _sugestoesVisiveis;
            _searchController.selection = TextSelection.collapsed(
              offset: _sugestoesVisiveis.length,
            );
            setState(() => _sugestoesVisiveis = '');
          },
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            child: Row(
              children: [
                Icon(Icons.auto_awesome, size: 16, color: theme.colorScheme.primary),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    _sugestoesVisiveis,
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: theme.colorScheme.onPrimaryContainer,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
                Icon(
                  Icons.arrow_forward,
                  size: 16,
                  color: theme.colorScheme.onPrimaryContainer,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildFilterChips() {
    final theme = Theme.of(context);
    return SizedBox(
      height: 48,
      child: ListView.separated(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        scrollDirection: Axis.horizontal,
        itemCount: _tiposPesquisa.length,
        separatorBuilder: (_, __) => const SizedBox(width: 8),
        itemBuilder: (context, index) {
          final filter = _tiposPesquisa[index];
          final isSelected = _tipoFilter == filter.value;
          return FilterChip(
            label: Text(filter.label),
            selected: isSelected,
            onSelected: (selected) {
              setState(() => _tipoFilter = selected ? filter.value : null);
              if (_searchController.text.isNotEmpty) {
                _pesquisar(_searchController.text);
              }
            },
            avatar: Icon(filter.icon, size: 18),
            selectedColor: theme.colorScheme.primary,
            backgroundColor: theme.colorScheme.surfaceContainerHigh,
            labelStyle: TextStyle(
              color: isSelected
                  ? theme.colorScheme.onPrimary
                  : theme.colorScheme.onSurfaceVariant,
              fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
            ),
            showCheckmark: false,
          );
        },
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
      return _buildResultados(provider.resultados, provider.query);
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
        if (!provider.indexReady)
          _buildIndexStatus(theme)
        else if (provider.historico.isNotEmpty) ...[
          _buildSectionHeader('Pesquisas recentes', Icons.history, action: _buildLimparHistorico(provider)),
          const SizedBox(height: 8),
          ...provider.historico.map(
                (item) => ListTile(
                  leading: const Icon(Icons.history, size: 20),
                  title: Text(item),
                  dense: true,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  onTap: () {
                    _searchController.text = item;
                    _pesquisar(item);
                  },
                  trailing: IconButton(
                    icon: const Icon(Icons.north_west, size: 18),
                    onPressed: () {
                      _searchController.text = item;
                      _searchController.selection = TextSelection.collapsed(
                        offset: item.length,
                      );
                    },
                  ),
                ),
              ),
          const SizedBox(height: 16),
        ],
        _buildSectionHeader('Sugestões de pesquisa', Icons.lightbulb_outline),
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
        _buildSectionHeader('Categorias de pesquisa', Icons.category_outlined),
        const SizedBox(height: 8),
        _buildDicaCard(
          theme,
          Icons.menu_book,
          'Versículos',
          'Pesquise por palavras-chave em todas as 6 traduções da Bíblia',
        ),
        _buildDicaCard(
          theme,
          Icons.translate,
          'Léxico',
          'Busque palavras gregas e hebraicas pelo significado ou transliteração',
        ),
        _buildDicaCard(
          theme,
          Icons.comment,
          'Comentários',
          'Encontre comentários de teólogos sobre passagens bíblicas',
        ),
        _buildDicaCard(
          theme,
          Icons.person,
          'Personagens',
          'Pesquise por nomes de personagens bíblicos (Abraão, Moisés, Paulo...)',
        ),
        _buildDicaCard(
          theme,
          Icons.account_balance,
          'Teologia',
          'Acesse as 13 categorias de teologia sistemática',
        ),
        _buildDicaCard(
          theme,
          Icons.school,
          'Estudos',
          'Estudos teológicos versículo por versículo',
        ),
      ],
    );
  }

  Widget _buildIndexStatus(ThemeData theme) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: theme.colorScheme.surfaceContainerHigh,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        children: [
          SizedBox(
            width: 20,
            height: 20,
            child: CircularProgressIndicator(
              strokeWidth: 2,
              color: theme.colorScheme.primary,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              'Indexando conteúdo bíblico localmente...',
              style: theme.textTheme.bodyMedium,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLimparHistorico(PesquisaProvider provider) {
    return TextButton(
      onPressed: () => provider.limparHistorico(),
      child: const Text('Limpar', style: TextStyle(fontSize: 12)),
    );
  }

  Widget _buildSectionHeader(String title, IconData icon, {Widget? action}) {
    final theme = Theme.of(context);
    return Row(
      children: [
        Icon(icon, size: 20, color: theme.colorScheme.primary),
        const SizedBox(width: 8),
        Expanded(
          child: Text(
            title,
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        if (action != null) action,
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
      elevation: 0,
      color: theme.colorScheme.surfaceContainerLow,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      child: ListTile(
        leading: Icon(icon, color: theme.colorScheme.primary),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w500)),
        subtitle: Text(subtitle, style: const TextStyle(fontSize: 13)),
        dense: true,
      ),
    );
  }

  Widget _buildResultados(List<SearchResult> resultados, String query) {
    return ListView.separated(
      padding: const EdgeInsets.symmetric(vertical: 8),
      itemCount: resultados.length + 1,
      separatorBuilder: (_, index) {
        if (index == 0) {
          return Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
            child: _buildResumoResultados(resultados.length, query),
          );
        }
        return const SizedBox(height: 2);
      },
      itemBuilder: (context, index) {
        if (index == 0) return const SizedBox.shrink();
        final resultado = resultados[index - 1];
        return ResultCard(
          resultado: resultado,
          highlightQuery: query,
          onTap: () => _navegarParaResultado(resultado),
        );
      },
    );
  }

  Widget _buildResumoResultados(int count, String query) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: theme.colorScheme.primaryContainer.withValues(alpha: 0.3),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        children: [
          Icon(Icons.check_circle, size: 16, color: theme.colorScheme.primary),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              '$count resultado${count != 1 ? 's' : ''} para "$query"',
              style: theme.textTheme.bodySmall?.copyWith(
                color: theme.colorScheme.onPrimaryContainer,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _FilterOption {
  final String label;
  final SearchResultType? value;
  final IconData icon;

  const _FilterOption({
    required this.label,
    required this.value,
    required this.icon,
  });
}
