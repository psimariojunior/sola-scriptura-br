import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../models/highlight.dart';
import '../services/biblia_service.dart';
import '../services/highlights_service.dart';
import '../widgets/empty_state.dart';
import '../widgets/loading_shimmer.dart';

class HighlightsScreen extends StatefulWidget {
  const HighlightsScreen({super.key});

  @override
  State<HighlightsScreen> createState() => _HighlightsScreenState();
}

class _HighlightsScreenState extends State<HighlightsScreen> {
  final HighlightsService _service = HighlightsService();
  List<Highlight> _all = [];
  bool _carregando = true;
  String? _filtroCor;
  String? _filtroLivro;

  @override
  void initState() {
    super.initState();
    _carregar();
  }

  Future<void> _carregar() async {
    setState(() => _carregando = true);
    final all = await _service.getAll();
    if (!mounted) return;
    setState(() {
      _all = all;
      _carregando = false;
    });
  }

  List<Highlight> get _filtrados {
    Iterable<Highlight> lista = _all;
    if (_filtroCor != null) {
      lista = lista.where((h) => h.cor == _filtroCor);
    }
    if (_filtroLivro != null) {
      lista = lista.where((h) => h.livro == _filtroLivro);
    }
    return lista.toList();
  }

  Map<String, List<Highlight>> get _agrupadoPorLivro {
    final map = <String, List<Highlight>>{};
    for (final h in _filtrados) {
      map.putIfAbsent(h.livro, () => []).add(h);
    }
    return map;
  }

  String _nomeLivro(String abrev) {
    for (final l in BibliaService.livros) {
      if (l.abreviacao == abrev) return l.nome;
    }
    return abrev;
  }

  Future<void> _remover(Highlight h) async {
    await _service.remove(
      livro: h.livro,
      capitulo: h.capitulo,
      versiculo: h.versiculo,
      traducao: h.traducao,
    );
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Destaque removido')),
    );
    _carregar();
  }

  void _abrir(Highlight h) {
    context.push('/biblia/${h.livro}/${h.capitulo}');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Destaques'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _carregar,
            tooltip: 'Atualizar',
          ),
        ],
      ),
      body: Column(
        children: [
          _buildFiltros(),
          Expanded(child: _buildBody()),
        ],
      ),
    );
  }

  Widget _buildFiltros() {
    final theme = Theme.of(context);
    final livros = _all.map((h) => h.livro).toSet().toList()..sort();

    return Container(
      padding: const EdgeInsets.fromLTRB(12, 8, 12, 4),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  child: Text(
                    'Cores:',
                    style: theme.textTheme.labelMedium,
                  ),
                ),
                _buildFiltroCorChip(null, 'Todas'),
                for (final c in HighlightColor.all) ...[
                  const SizedBox(width: 6),
                  _buildFiltroCorChip(c.id, c.label),
                ],
              ],
            ),
          ),
          if (livros.length > 1)
            Padding(
              padding: const EdgeInsets.only(top: 8),
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 4),
                      child: Text(
                        'Livros:',
                        style: theme.textTheme.labelMedium,
                      ),
                    ),
                    _buildFiltroLivroChip(null, 'Todos'),
                    for (final l in livros) ...[
                      const SizedBox(width: 6),
                      _buildFiltroLivroChip(l, _nomeLivro(l)),
                    ],
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildFiltroCorChip(String? corId, String label) {
    final theme = Theme.of(context);
    final selected = _filtroCor == corId;
    final color = corId != null
        ? HighlightColor.fromId(corId).color
        : theme.colorScheme.primary;

    return FilterChip(
      label: Text(label),
      selected: selected,
      onSelected: (_) => setState(() => _filtroCor = corId),
      selectedColor: color.withValues(alpha: 0.25),
      checkmarkColor: color,
      labelStyle: TextStyle(
        color: selected ? color : theme.colorScheme.onSurface,
        fontWeight: selected ? FontWeight.w700 : FontWeight.w500,
        fontSize: 12,
      ),
      side: BorderSide(
        color: selected
            ? color
            : theme.colorScheme.outline.withValues(alpha: 0.3),
      ),
    );
  }

  Widget _buildFiltroLivroChip(String? livroId, String label) {
    final theme = Theme.of(context);
    final selected = _filtroLivro == livroId;
    return FilterChip(
      label: Text(label),
      selected: selected,
      onSelected: (_) => setState(() => _filtroLivro = livroId),
      selectedColor: theme.colorScheme.primary.withValues(alpha: 0.18),
      checkmarkColor: theme.colorScheme.primary,
      labelStyle: TextStyle(
        color: selected
            ? theme.colorScheme.primary
            : theme.colorScheme.onSurface,
        fontWeight: selected ? FontWeight.w700 : FontWeight.w500,
        fontSize: 12,
      ),
    );
  }

  Widget _buildBody() {
    if (_carregando) {
      return ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          CardShimmer(count: 5, height: 60),
        ],
      );
    }

    if (_all.isEmpty) {
      return const EmptyState(
        icon: Icons.format_color_fill,
        title: 'Nenhum destaque ainda',
        message:
            'Selecione um versiculo na leitura da Biblia e escolha uma cor para comecar.',
      );
    }

    final filtrados = _filtrados;
    if (filtrados.isEmpty) {
      return const EmptyState(
        icon: Icons.filter_alt_off,
        title: 'Nenhum destaque',
        message: 'Nenhum destaque corresponde aos filtros selecionados.',
      );
    }

    final agrupado = _agrupadoPorLivro;
    final chaves = agrupado.keys.toList();

    return RefreshIndicator(
      onRefresh: _carregar,
      child: ListView.builder(
        padding: const EdgeInsets.fromLTRB(12, 4, 12, 16),
        itemCount: chaves.length,
        itemBuilder: (context, idx) {
          final livroAbrev = chaves[idx];
          final highlights = agrupado[livroAbrev]!;
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(8, 16, 8, 6),
                child: Text(
                  _nomeLivro(livroAbrev).toUpperCase(),
                  style: Theme.of(context).textTheme.labelMedium?.copyWith(
                        fontWeight: FontWeight.w700,
                        letterSpacing: 0.5,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                ),
              ),
              ...highlights.map((h) => _buildHighlightTile(h)),
            ],
          );
        },
      ),
    );
  }

  Widget _buildHighlightTile(Highlight h) {
    final theme = Theme.of(context);
    final color = h.colorData;

    return Dismissible(
      key: ValueKey('highlight-${h.livro}-${h.capitulo}-${h.versiculo}'),
      direction: DismissDirection.endToStart,
      background: Container(
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.only(right: 24),
        margin: const EdgeInsets.symmetric(horizontal: 4, vertical: 4),
        decoration: BoxDecoration(
          color: theme.colorScheme.error,
          borderRadius: BorderRadius.circular(14),
        ),
        child: const Icon(Icons.delete, color: Colors.white),
      ),
      onDismissed: (_) => _remover(h),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 4),
        child: Material(
          color: Colors.transparent,
          borderRadius: BorderRadius.circular(14),
          child: InkWell(
            onTap: () => _abrir(h),
            borderRadius: BorderRadius.circular(14),
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: color.color.withValues(alpha: 0.18),
                borderRadius: BorderRadius.circular(14),
                border: Border(
                  left: BorderSide(color: color.color, width: 4),
                ),
              ),
              child: Row(
                children: [
                  Container(
                    width: 38,
                    height: 38,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      color: color.color,
                      shape: BoxShape.circle,
                    ),
                    child: Text(
                      '${h.versiculo}',
                      style: TextStyle(
                        fontWeight: FontWeight.w800,
                        color: color.onColor,
                        fontSize: 14,
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Capitulo ${h.capitulo} : ${h.versiculo}',
                          style: theme.textTheme.titleSmall?.copyWith(
                            color: color.onColor,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          'Traducao: ${h.traducao.toUpperCase()}',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: color.onColor.withValues(alpha: 0.7),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Icon(
                    Icons.chevron_right,
                    color: color.onColor.withValues(alpha: 0.5),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
