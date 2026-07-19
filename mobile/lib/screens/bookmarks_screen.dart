import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../models/bookmark.dart';
import '../services/biblia_service.dart';
import '../services/bookmarks_service.dart';
import '../widgets/empty_state.dart';
import '../widgets/loading_shimmer.dart';

class BookmarksScreen extends StatefulWidget {
  const BookmarksScreen({super.key});

  @override
  State<BookmarksScreen> createState() => _BookmarksScreenState();
}

class _BookmarksScreenState extends State<BookmarksScreen> {
  final BookmarksService _service = BookmarksService();
  List<Bookmark> _bookmarks = [];
  bool _carregando = true;
  final _dateFormat = DateFormat("dd/MM/yyyy");

  @override
  void initState() {
    super.initState();
    _carregar();
  }

  Future<void> _carregar() async {
    setState(() => _carregando = true);
    final list = await _service.getAll();
    if (!mounted) return;
    setState(() {
      _bookmarks = list;
      _carregando = false;
    });
  }

  String _nomeLivro(String abrev) {
    for (final l in BibliaService.livros) {
      if (l.abreviacao == abrev) return l.nome;
    }
    return abrev;
  }

  Future<void> _remover(Bookmark b) async {
    await _service.remove(b.id!);
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Marcador removido')),
    );
    _carregar();
  }

  Future<void> _editarNota(Bookmark b) async {
    final controller = TextEditingController(text: b.nota ?? '');
    final result = await showDialog<String>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(
          'Marcador ${_nomeLivro(b.livro)} ${b.capitulo}:${b.versiculo}',
        ),
        content: TextField(
          controller: controller,
          maxLines: 3,
          decoration: const InputDecoration(
            hintText: 'Nota do marcador (opcional)',
            border: OutlineInputBorder(),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: const Text('Cancelar'),
          ),
          FilledButton(
            onPressed: () => Navigator.of(ctx).pop(controller.text.trim()),
            child: const Text('Salvar'),
          ),
        ],
      ),
    );
    if (result == null) return;
    await _service.updateNota(
      b.id!,
      result.isEmpty ? null : result,
    );
    if (!mounted) return;
    _carregar();
  }

  void _abrir(Bookmark b) {
    context.push('/biblia/${b.livro}/${b.capitulo}');
  }

  Map<String, List<Bookmark>> get _agrupadoPorLivro {
    final map = <String, List<Bookmark>>{};
    for (final b in _bookmarks) {
      map.putIfAbsent(b.livro, () => []).add(b);
    }
    return map;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Marcadores'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            tooltip: 'Atualizar',
            onPressed: _carregar,
          ),
        ],
      ),
      body: _buildBody(),
    );
  }

  Widget _buildBody() {
    if (_carregando) {
      return ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          CardShimmer(count: 5, height: 70),
        ],
      );
    }

    if (_bookmarks.isEmpty) {
      return const EmptyState(
        icon: Icons.bookmark_border,
        title: 'Nenhum marcador',
        message:
            'Adicione marcadores na leitura da Biblia para marcar versiculos importantes.',
      );
    }

    final agrupado = _agrupadoPorLivro;
    final livros = agrupado.keys.toList();

    return RefreshIndicator(
      onRefresh: _carregar,
      child: ListView.builder(
        padding: const EdgeInsets.fromLTRB(12, 8, 12, 16),
        itemCount: livros.length,
        itemBuilder: (context, idx) {
          final livroAbrev = livros[idx];
          final versiculos = agrupado[livroAbrev]!;
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
              ...versiculos.map((b) => _buildBookmarkTile(b)),
            ],
          );
        },
      ),
    );
  }

  Widget _buildBookmarkTile(Bookmark b) {
    final theme = Theme.of(context);
    final dateStr = _dateFormat.format(
      DateTime.fromMillisecondsSinceEpoch(b.createdAt),
    );

    return Dismissible(
      key: ValueKey('bookmark-${b.id}'),
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
      onDismissed: (_) => _remover(b),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 4),
        child: Material(
          color: Colors.transparent,
          borderRadius: BorderRadius.circular(14),
          child: InkWell(
            onTap: () => _abrir(b),
            borderRadius: BorderRadius.circular(14),
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: theme.colorScheme.surface,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(
                  color: theme.colorScheme.outline.withValues(alpha: 0.25),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(
                        Icons.bookmark,
                        size: 20,
                        color: theme.colorScheme.primary,
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Text(
                          'Capitulo ${b.capitulo} : ${b.versiculo}',
                          style: theme.textTheme.titleSmall?.copyWith(
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                      Text(
                        dateStr,
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: theme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                  if (b.nota != null && b.nota!.isNotEmpty) ...[
                    const SizedBox(height: 8),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: theme.colorScheme.surfaceContainerHighest
                            .withValues(alpha: 0.5),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Text(
                        b.nota!,
                        style: theme.textTheme.bodyMedium,
                      ),
                    ),
                  ],
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      TextButton.icon(
                        onPressed: () => _editarNota(b),
                        icon: const Icon(Icons.edit, size: 16),
                        label: const Text('Editar nota'),
                      ),
                    ],
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
