import 'package:flutter/material.dart';

import '../../models/lexicon.dart';
import '../../services/lexicon_service.dart';
import '../../services/api_client.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/error_display.dart';
import '../../widgets/loading_shimmer.dart';
import '../../widgets/search_bar_widget.dart';
import 'palavra_detail_screen.dart';

class DicionarioScreen extends StatefulWidget {
  const DicionarioScreen({super.key});

  @override
  State<DicionarioScreen> createState() => _DicionarioScreenState();
}

class _DicionarioScreenState extends State<DicionarioScreen> {
  late final LexiconService _lexiconService;
  final TextEditingController _searchController = TextEditingController();

  List<PalavraLexicon> _todasPalavras = [];
  List<PalavraLexicon> _palavrasFiltradas = [];
  bool _isLoading = false;
  String? _erro;
  String? _filtroCategoria;
  String _idiomaFiltro = 'todos';

  static const _categorias = [
    SearchFilterChip(label: 'Todas', value: '', icon: Icons.all_inclusive),
    SearchFilterChip(label: 'Substantivos', value: 'noun', icon: Icons.abc),
    SearchFilterChip(label: 'Verbos', value: 'verb', icon: Icons.flash_on),
    SearchFilterChip(label: 'Adjetivos', value: 'adj', icon: Icons.star),
    SearchFilterChip(label: 'Adverbios', value: 'adv', icon: Icons.speed),
  ];

  @override
  void initState() {
    super.initState();
    _lexiconService = LexiconService(ApiClient());
    _carregarPalavras();
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  Future<void> _carregarPalavras() async {
    setState(() {
      _isLoading = true;
      _erro = null;
    });
    try {
      final gregas = await _lexiconService.buscarGrego('');
      final hebraicas = await _lexiconService.buscarHebraico('');
      if (mounted) {
        setState(() {
          _todasPalavras = [...gregas, ...hebraicas];
          _aplicarFiltros();
          _isLoading = false;
        });
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

  void _aplicarFiltros() {
    var resultado = List<PalavraLexicon>.from(_todasPalavras);

    if (_idiomaFiltro != 'todos') {
      resultado = resultado.where((p) {
        if (_idiomaFiltro == 'grego') return p.isGrego;
        if (_idiomaFiltro == 'hebraico') return p.isHebraico;
        return true;
      }).toList();
    }

    final busca = _searchController.text.toLowerCase();
    if (busca.isNotEmpty) {
      resultado = resultado.where((p) {
        return p.palavra.toLowerCase().contains(busca) ||
            p.transliteracao.toLowerCase().contains(busca) ||
            p.strong.toLowerCase().contains(busca) ||
            p.definicao.toLowerCase().contains(busca);
      }).toList();
    }

    resultado.sort((a, b) => a.palavra.compareTo(b.palavra));

    setState(() => _palavrasFiltradas = resultado);
  }

  void _abrirDetalhe(PalavraLexicon palavra) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => PalavraDetailScreen(palavra: palavra),
      ),
    );
  }

  Map<String, int> _contarPorCategoria() {
    final contagem = <String, int>{
      'total': _todasPalavras.length,
      'grego': 0,
      'hebraico': 0,
    };
    for (final p in _todasPalavras) {
      if (p.isGrego) contagem['grego'] = (contagem['grego'] ?? 0) + 1;
      if (p.isHebraico) contagem['hebraico'] = (contagem['hebraico'] ?? 0) + 1;
    }
    return contagem;
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final contagem = _contarPorCategoria();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Dicionario Biblico'),
      ),
      body: Column(
        children: [
          SearchBarWidget(
            hint: 'Buscar no dicionario...',
            controller: _searchController,
            autofocus: false,
            filters: _categorias,
            selectedFilter: _filtroCategoria,
            onFilterChanged: (value) {
              _filtroCategoria = value;
              _aplicarFiltros();
            },
            onChanged: (_) => _aplicarFiltros(),
            onClear: () {
              _aplicarFiltros();
            },
          ),
          _buildResumo(contagem, theme),
          Expanded(
            child: _buildBody(),
          ),
        ],
      ),
    );
  }

  Widget _buildResumo(Map<String, int> contagem, ThemeData theme) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        children: [
          _ResumoBadge(
            label: 'Total',
            count: contagem['total'] ?? 0,
            color: theme.colorScheme.primary,
          ),
          const SizedBox(width: 8),
          _ResumoBadge(
            label: 'Grego',
            count: contagem['grego'] ?? 0,
            color: Colors.blue,
          ),
          const SizedBox(width: 8),
          _ResumoBadge(
            label: 'Hebraico',
            count: contagem['hebraico'] ?? 0,
            color: Colors.teal,
          ),
          const Spacer(),
          DropdownButton<String>(
            value: _idiomaFiltro,
            underline: const SizedBox.shrink(),
            icon: const Icon(Icons.filter_list, size: 20),
            items: const [
              DropdownMenuItem(value: 'todos', child: Text('Todos')),
              DropdownMenuItem(value: 'grego', child: Text('Grego')),
              DropdownMenuItem(value: 'hebraico', child: Text('Hebraico')),
            ],
            onChanged: (value) {
              if (value != null) {
                _idiomaFiltro = value;
                _aplicarFiltros();
              }
            },
          ),
        ],
      ),
    );
  }

  Widget _buildBody() {
    if (_isLoading) {
      return const Padding(
        padding: EdgeInsets.all(16),
        child: LoadingShimmer(count: 10),
      );
    }

    if (_erro != null) {
      return ErrorDisplay(
        message: _erro!,
        onRetry: _carregarPalavras,
      );
    }

    if (_palavrasFiltradas.isEmpty) {
      return EmptyState(
        icon: Icons.menu_book_outlined,
        title: 'Nenhuma palavra encontrada',
        message: 'Tente buscar por outro termo',
      );
    }

    return _buildListaAlfabetica();
  }

  Widget _buildListaAlfabetica() {
    final theme = Theme.of(context);
    final agrupado = <String, List<PalavraLexicon>>{};

    for (final palavra in _palavrasFiltradas) {
      final letra = palavra.palavra.isNotEmpty
          ? palavra.palavra[0].toUpperCase()
          : '#';
      agrupado.putIfAbsent(letra, () => []).add(palavra);
    }

    final letras = agrupado.keys.toList()..sort();

    return CustomScrollView(
      slivers: [
        for (final letra in letras) ...[
          SliverToBoxAdapter(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
              color: theme.colorScheme.primaryContainer.withOpacity(0.3),
              child: Text(
                letra,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: theme.colorScheme.primary,
                ),
              ),
            ),
          ),
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                final palavra = agrupado[letra]![index];
                return ListTile(
                  leading: Container(
                    width: 40,
                    height: 40,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      color: palavra.isGrego
                          ? Colors.blue.withOpacity(0.1)
                          : Colors.teal.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      palavra.strong,
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.w600,
                        color: palavra.isGrego ? Colors.blue : Colors.teal,
                      ),
                    ),
                  ),
                  title: Text(
                    palavra.palavra,
                    style: const TextStyle(fontSize: 16),
                  ),
                  subtitle: Text(
                    palavra.transliteracao.isNotEmpty
                        ? palavra.transliteracao
                        : palavra.definicao,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(fontSize: 13),
                  ),
                  trailing: const Icon(Icons.chevron_right, size: 20),
                  onTap: () => _abrirDetalhe(palavra),
                );
              },
              childCount: agrupado[letra]!.length,
            ),
          ),
        ],
        const SliverToBoxAdapter(child: SizedBox(height: 80)),
      ],
    );
  }
}

class _ResumoBadge extends StatelessWidget {
  final String label;
  final int count;
  final Color color;

  const _ResumoBadge({
    required this.label,
    required this.count,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 8,
            height: 8,
            decoration: BoxDecoration(
              color: color,
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 6),
          Text(
            '$label ($count)',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w500,
              color: color,
            ),
          ),
        ],
      ),
    );
  }
}
