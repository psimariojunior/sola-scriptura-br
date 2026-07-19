import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../models/study_note.dart';
import '../models/traducao.dart';
import '../models/versiculo.dart';
import '../services/bookmarks_service.dart';
import '../services/favorites_service.dart';
import '../services/highlights_service.dart';
import '../services/notes_service.dart';
import '../services/verse_share_service.dart';
import '../widgets/favorite_button.dart';
import '../widgets/highlight_button.dart';
import '../widgets/note_editor.dart';
import '../widgets/share_verse_sheet.dart';

class VerseSelectionToolbar extends StatefulWidget {
  final List<Versiculo> versiculos;
  final String livro;
  final int capitulo;
  final String traducao;
  final String? livroNome;
  final VoidCallback? onLimpar;
  final VoidCallback? onChanged;

  const VerseSelectionToolbar({
    super.key,
    required this.versiculos,
    required this.livro,
    required this.capitulo,
    this.traducao = 'arc',
    this.livroNome,
    this.onLimpar,
    this.onChanged,
  });

  @override
  State<VerseSelectionToolbar> createState() => _VerseSelectionToolbarState();
}

class _VerseSelectionToolbarState extends State<VerseSelectionToolbar>
    with SingleTickerProviderStateMixin {
  late AnimationController _animacaoController;
  late Animation<Offset> _animacaoSlide;
  late Animation<double> _animacaoOpacidade;

  final NotesService _notes = NotesService();
  final FavoritesService _favorites = FavoritesService();
  final BookmarksService _bookmarks = BookmarksService();
  final HighlightsService _highlights = HighlightsService();

  String? _currentHighlightColor;
  bool _isFavorite = false;

  @override
  void initState() {
    super.initState();
    _animacaoController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 250),
    );
    _animacaoSlide = Tween<Offset>(
      begin: const Offset(0, 1),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _animacaoController,
      curve: Curves.easeOutCubic,
    ));
    _animacaoOpacidade = Tween<double>(
      begin: 0,
      end: 1,
    ).animate(CurvedAnimation(
      parent: _animacaoController,
      curve: Curves.easeOut,
    ));
    _animacaoController.forward();
    _loadStatus();
  }

  @override
  void didUpdateWidget(VerseSelectionToolbar oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.versiculos.isNotEmpty && oldWidget.versiculos.isEmpty) {
      _animacaoController.forward(from: 0);
    }
    final oldFirst =
        oldWidget.versiculos.isNotEmpty ? oldWidget.versiculos.first.numero : 0;
    final newFirst = widget.versiculos.isNotEmpty
        ? widget.versiculos.first.numero
        : 0;
    if (oldFirst != newFirst) {
      _loadStatus();
    }
  }

  @override
  void dispose() {
    _animacaoController.dispose();
    super.dispose();
  }

  Future<void> _loadStatus() async {
    if (widget.versiculos.isEmpty) return;
    final primeiro = widget.versiculos.first;

    final highlight = await _highlights.getHighlightForVerse(
      livro: widget.livro,
      capitulo: widget.capitulo,
      versiculo: primeiro.numero,
      traducao: widget.traducao,
    );
    final fav = await _favorites.isFavorite(
      livro: widget.livro,
      capitulo: widget.capitulo,
      versiculo: primeiro.numero,
      traducao: widget.traducao,
    );

    if (!mounted) return;
    setState(() {
      _isFavorite = fav;
      _currentHighlightColor = highlight?.cor;
    });
  }

  void _copiarVersiculos() async {
    final shareable = _toShareable();
    final texto = shareable.versiculos.length == 1
        ? VerseShareService.formatShareText(
            livroNome: shareable.livroNome,
            capitulo: shareable.capitulo,
            versiculo: shareable.versiculos.first,
            traducaoAbrev: shareable.traducaoAbrev,
          )
        : VerseShareService.formatRangeText(
            livroNome: shareable.livroNome,
            capitulo: shareable.capitulo,
            versiculos: shareable.versiculos,
            traducaoAbrev: shareable.traducaoAbrev,
          );
    await VerseShareService.copyToClipboard(texto);
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          '${widget.versiculos.length} versiculo(s) copiado(s)!',
        ),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _compartilhar() {
    HapticFeedback.lightImpact();
    ShareVerseSheet.show(context, verse: _toShareable());
  }

  ShareableVerse _toShareable() {
    final traducaoAbrev =
        Traducoes.porId(widget.traducao)?.abreviacao ??
            widget.traducao.toUpperCase();
    return ShareableVerse(
      livroNome: widget.livroNome ?? widget.livro,
      livroAbreviacao: widget.livro,
      capitulo: widget.capitulo,
      versiculos: widget.versiculos,
      traducaoAbrev: traducaoAbrev,
    );
  }

  Future<void> _toggleHighlight(String corId) async {
    if (widget.versiculos.isEmpty) return;

    if (corId.isEmpty) {
      for (final v in widget.versiculos) {
        await _highlights.remove(
          livro: widget.livro,
          capitulo: widget.capitulo,
          versiculo: v.numero,
          traducao: widget.traducao,
        );
      }
      if (!mounted) return;
      setState(() => _currentHighlightColor = null);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Destaque removido')),
      );
      widget.onChanged?.call();
      return;
    }

    for (final v in widget.versiculos) {
      await _highlights.add(
        livro: widget.livro,
        capitulo: widget.capitulo,
        versiculo: v.numero,
        cor: corId,
        traducao: widget.traducao,
      );
    }

    if (!mounted) return;
    setState(() => _currentHighlightColor = corId);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          '${widget.versiculos.length} versiculo(s) destacado(s)',
        ),
      ),
    );
    widget.onChanged?.call();
  }

  Future<void> _toggleFavorito() async {
    if (widget.versiculos.isEmpty) return;
    final primeiro = widget.versiculos.first;

    if (_isFavorite) {
      await _favorites.remove(
        livro: widget.livro,
        capitulo: widget.capitulo,
        versiculo: primeiro.numero,
        traducao: widget.traducao,
      );
    } else {
      await _favorites.add(
        livro: widget.livro,
        capitulo: widget.capitulo,
        versiculo: primeiro.numero,
        traducao: widget.traducao,
      );
    }

    if (!mounted) return;
    setState(() => _isFavorite = !_isFavorite);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          _isFavorite ? 'Adicionado aos favoritos' : 'Removido dos favoritos',
        ),
      ),
    );
    widget.onChanged?.call();
  }

  Future<void> _adicionarNota() async {
    if (widget.versiculos.isEmpty) return;
    final primeiro = widget.versiculos.first;

    StudyNote? existing;
    final list = await _notes.getByReference(
      livro: widget.livro,
      capitulo: widget.capitulo,
      versiculo: primeiro.numero,
      traducao: widget.traducao,
    );
    if (list.isNotEmpty) existing = list.first;

    final texto = await showNoteEditor(
      context,
      livro: widget.livro,
      capitulo: widget.capitulo,
      versiculo: primeiro.numero,
      livroNome: widget.livroNome,
      existing: existing,
      traducao: widget.traducao,
    );
    if (texto == null || texto.isEmpty) return;

    if (existing != null) {
      await _notes.update(existing.id!, texto);
    } else {
      await _notes.add(
        livro: widget.livro,
        capitulo: widget.capitulo,
        versiculo: primeiro.numero,
        texto: texto,
        traducao: widget.traducao,
      );
    }

    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(existing != null ? 'Nota atualizada' : 'Nota salva'),
      ),
    );
    widget.onChanged?.call();
  }

  Future<void> _adicionarMarcador() async {
    if (widget.versiculos.isEmpty) return;
    final primeiro = widget.versiculos.first;

    final jaExiste = await _bookmarks.hasBookmark(
      livro: widget.livro,
      capitulo: widget.capitulo,
      versiculo: primeiro.numero,
    );

    if (jaExiste) {
      await _bookmarks.removeByReference(
        livro: widget.livro,
        capitulo: widget.capitulo,
        versiculo: primeiro.numero,
      );
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Marcador removido')),
      );
    } else {
      await _bookmarks.add(
        livro: widget.livro,
        capitulo: widget.capitulo,
        versiculo: primeiro.numero,
      );
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Marcador adicionado')),
      );
    }
    widget.onChanged?.call();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final quantidade = widget.versiculos.length;

    return SlideTransition(
      position: _animacaoSlide,
      child: FadeTransition(
        opacity: _animacaoOpacidade,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          decoration: BoxDecoration(
            color: theme.colorScheme.primaryContainer,
            border: Border(
              top: BorderSide(
                color: theme.colorScheme.primary.withValues(alpha: 0.3),
                width: 1,
              ),
            ),
          ),
          child: SafeArea(
            top: false,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Row(
                    children: [
                      Icon(
                        Icons.check_circle,
                        size: 18,
                        color: theme.colorScheme.primary,
                      ),
                      const SizedBox(width: 8),
                      Text(
                        '$quantidade versiculo${quantidade > 1 ? 's' : ''} selecionado${quantidade > 1 ? 's' : ''}',
                        style: TextStyle(
                          fontWeight: FontWeight.w600,
                          color: theme.colorScheme.primary,
                        ),
                      ),
                      const Spacer(),
                      TextButton.icon(
                        onPressed: widget.onLimpar,
                        icon: const Icon(Icons.close, size: 18),
                        label: const Text('Limpar'),
                      ),
                    ],
                  ),
                ),
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: [
                      HighlightButton(
                        currentColorId: _currentHighlightColor,
                        onColorSelected: _toggleHighlight,
                      ),
                      const SizedBox(width: 8),
                      FavoriteButton(
                        isFavorite: _isFavorite,
                        showLabel: true,
                        onTap: _toggleFavorito,
                      ),
                      const SizedBox(width: 8),
                      _buildActionChip(
                        context,
                        icon: Icons.note_add,
                        label: 'Nota',
                        onTap: _adicionarNota,
                      ),
                      const SizedBox(width: 8),
                      _buildActionChip(
                        context,
                        icon: Icons.bookmark_add_outlined,
                        label: 'Marcar',
                        onTap: _adicionarMarcador,
                      ),
                      const SizedBox(width: 8),
                      _buildActionChip(
                        context,
                        icon: Icons.share,
                        label: 'Compartilhar',
                        onTap: _compartilhar,
                      ),
                      const SizedBox(width: 8),
                      _buildActionChip(
                        context,
                        icon: Icons.copy,
                        label: 'Copiar',
                        onTap: _copiarVersiculos,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildActionChip(
    BuildContext context, {
    required IconData icon,
    required String label,
    required VoidCallback onTap,
  }) {
    final theme = Theme.of(context);

    return InkWell(
      onTap: () {
        HapticFeedback.lightImpact();
        onTap();
      },
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: theme.scaffoldBackgroundColor,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: theme.colorScheme.outline.withValues(alpha: 0.3),
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 16, color: theme.colorScheme.primary),
            const SizedBox(width: 6),
            Text(
              label,
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w500,
                color: theme.colorScheme.onSurface,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
