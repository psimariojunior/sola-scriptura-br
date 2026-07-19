import 'package:flutter/material.dart';

import '../../models/lexicon.dart';
import '../../services/lexicon_service.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/search_bar_widget.dart';
import 'palavra_detail_screen.dart';

class DicionarioScreen extends StatefulWidget {
  const DicionarioScreen({super.key});

  @override
  State<DicionarioScreen> createState() => _DicionarioScreenState();
}

class _DicionarioScreenState extends State<DicionarioScreen> {
  final LexiconService _lexiconService = LexiconService();
  final TextEditingController _searchController = TextEditingController();

  List<PalavraLexicon> _todasPalavras = [];
  List<PalavraLexicon> _palavrasFiltradas = [];
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
    WidgetsBinding.instance.addPostFrameCallback((_) => _carregarPalavras());
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _carregarPalavras() {
    final result = _lexiconService.buscar('', 'todos');
    if (mounted) {
      setState(() {
        _todasPalavras = result;
        _aplicarFiltros();
      });
    }
  }

  void _aplicarFiltros() {
    final busca = _searchController.text.trim();
    final idioma = _idiomaFiltro;

    List<PalavraLexicon> resultado;
    if (busca.isEmpty) {
      resultado = _lexiconService.buscar('', idioma);
    } else {
      resultado = _lexiconService.buscar(busca, idioma);
    }

    if (idioma != 'todos') {
      resultado = resultado.where((p) {
        if (idioma == 'grego') return p.isGrego;
        if (idioma == 'hebraico') return p.isHebraico;
        return true;
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
          Expanded(child: _buildBody()),
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
    if (_palavrasFiltradas.isEmpty) {
      return const EmptyState(
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
              color: theme.colorScheme.primaryContainer.withValues(alpha: 0.3),
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
                          ? Colors.blue.withValues(alpha: 0.1)
                          : Colors.teal.withValues(alpha: 0.1),
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
        color: color.withValues(alpha: 0.1),
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
