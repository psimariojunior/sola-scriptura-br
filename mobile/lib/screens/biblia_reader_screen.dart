import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/highlight.dart';
import '../models/livro.dart';
import '../models/traducao.dart';
import '../models/versiculo.dart';
import '../providers/tema_provider.dart';
import '../services/biblia_service.dart';
import '../services/favorites_service.dart';
import '../services/highlights_service.dart';
import '../services/notes_service.dart';
import '../services/reading_history_service.dart';
import '../theme/app_theme.dart';
import '../widgets/book_selector.dart';
import '../widgets/chapter_grid.dart';
import '../widgets/highlight_button.dart';
import '../widgets/note_editor.dart';
import '../widgets/verse_card.dart';

class BibliaReaderScreen extends StatefulWidget {
  final String? livroInicial;
  final int? capituloInicial;

  const BibliaReaderScreen({
    super.key,
    this.livroInicial,
    this.capituloInicial,
  });

  @override
  State<BibliaReaderScreen> createState() => _BibliaReaderScreenState();
}

class _BibliaReaderScreenState extends State<BibliaReaderScreen> {
  Livro? _livro;
  int _capitulo = 1;
  String _traducao = Traducoes.lista.first.id;
  List<Versiculo> _versiculos = [];
  bool _carregando = true;
  String? _erro;

  final Map<int, Highlight> _highlightsCapitulo = {};
  final Set<int> _versiculosComNota = {};
  final Set<int> _versiculosFavoritados = {};

  final HighlightsService _highlightsService = HighlightsService();
  final NotesService _notesService = NotesService();
  final FavoritesService _favoritesService = FavoritesService();
  final ReadingHistoryService _readingHistory = ReadingHistoryService();

  @override
  void initState() {
    super.initState();
    _carregarDados();
  }

  void _carregarDados() {
    if (BibliaService.isInitialized && BibliaService.livros.isNotEmpty) {
      _selecionarLivroInicial();
      if (_livro == null) return;
      try {
        final slug = BibliaService.abrevParaMidvash[_livro!.abreviacao] ?? _livro!.slug;
        final textos = BibliaService.fetchCapitulo(_traducao, slug, _capitulo);
        final versos = List.generate(textos.length,
          (i) => Versiculo(numero: i + 1, texto: textos[i], livro: _livro!.abreviacao, capitulo: _capitulo, traducao: _traducao),
        );
        _versiculos = versos;
        _carregando = false;
        Future.microtask(() {
          _carregarDadosCapitulo();
          _readingHistory.salvarProgresso(livro: _livro!.abreviacao, capitulo: _capitulo);
        });
      } catch (e) {
        _erro = e.toString();
        _carregando = false;
      }
    }
  }

  void _selecionarLivroInicial() {
    if (BibliaService.livros.isEmpty) return;
    if (widget.livroInicial != null) {
      _livro = BibliaService.livros.firstWhere(
        (l) => l.abreviacao == widget.livroInicial,
        orElse: () => BibliaService.livros.first,
      );
    } else {
      _livro = BibliaService.livros.first;
    }
    _capitulo = widget.capituloInicial ?? 1;
  }

  Future<void> _carregarCapitulo() async {
    if (_livro == null) return;
    try {
      final slug = BibliaService.abrevParaMidvash[_livro!.abreviacao] ??
          _livro!.slug;
      debugPrint('BIBLE: fetchCapitulo( $_traducao, $slug, $_capitulo)');
      final textos = List<String>.from(BibliaService.fetchCapitulo(
        _traducao,
        slug,
        _capitulo,
      ));
      debugPrint('BIBLE: fetched ${textos.length} verses');
      if (textos.isEmpty) {
        debugPrint('BIBLE: WARNING - empty chapter! Trying other translations');
        for (final alt in BibliaService.traducoesDisponiveis) {
          if (alt == _traducao) continue;
          final altTextos = BibliaService.fetchCapitulo(alt, slug, _capitulo);
          if (altTextos.isNotEmpty) {
            _traducao = alt;
            textos
              ..clear()
              ..addAll(altTextos);
            debugPrint('BIBLE: fallback to $alt, ${textos.length} verses');
            break;
          }
        }
      }
      final versos = <Versiculo>[];
      for (int i = 0; i < textos.length; i++) {
        versos.add(Versiculo(
          numero: i + 1,
          texto: textos[i],
          livro: _livro!.abreviacao,
          capitulo: _capitulo,
          traducao: _traducao,
        ));
      }
      if (mounted) {
        setState(() {
          _versiculos = versos;
          _erro = null;
          _highlightsCapitulo.clear();
          _versiculosComNota.clear();
          _versiculosFavoritados.clear();
        });
        _carregarDadosCapitulo();
      }
    } catch (e, stack) {
      debugPrint('BIBLE: ERROR loading chapter: $e\n$stack');
      if (mounted) {
        setState(() {
          _erro = e.toString();
        });
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Erro: ${e.toString()}'),
            backgroundColor: Theme.of(context).colorScheme.error,
          ),
        );
      }
    }
  }

  Future<void> _carregarDadosCapitulo() async {
    if (_livro == null) return;

    await _readingHistory.salvarProgresso(
      livro: _livro!.abreviacao,
      capitulo: _capitulo,
    );

    final highlights = await _highlightsService.getByChapter(
      livro: _livro!.abreviacao,
      capitulo: _capitulo,
      traducao: _traducao,
    );
    final notes = await _notesService.getByChapter(
      livro: _livro!.abreviacao,
      capitulo: _capitulo,
      traducao: _traducao,
    );
    final favorites = await _favoritesService.getByChapter(
      livro: _livro!.abreviacao,
      capitulo: _capitulo,
      traducao: _traducao,
    );

    if (!mounted) return;
    setState(() {
      _highlightsCapitulo.clear();
      for (final h in highlights) {
        _highlightsCapitulo[h.versiculo] = h;
      }
      _versiculosComNota
        ..clear()
        ..addAll(notes.map((n) => n.versiculo));
      _versiculosFavoritados
        ..clear()
        ..addAll(favorites.map((f) => f.versiculo));
    });
  }

  void _abrirLivros() async {
    final resultado = await Navigator.of(context).push<Livro>(
      MaterialPageRoute(builder: (_) => BookSelector(
        livroSelecionado: _livro?.abreviacao,
        onSelecionado: (l) => Navigator.of(context).pop(l),
      )),
    );
    if (resultado != null && mounted) {
      setState(() {
        _livro = resultado;
        _capitulo = 1;
      });
      _carregarCapitulo();
    }
  }

  void _abrirCapitulos() async {
    if (_livro == null) return;
    final resultado = await Navigator.of(context).push<int>(
      MaterialPageRoute(builder: (_) => Scaffold(
        appBar: AppBar(title: Text('Capítulos — ${_livro!.nome}')),
        body: ChapterGrid(
          total: _livro!.capitulos,
          capituloSelecionado: _capitulo,
          onSelecionado: (c) => Navigator.of(context).pop(c),
        ),
      )),
    );
    if (resultado != null && mounted) {
      setState(() {
        _capitulo = resultado;
      });
      _carregarCapitulo();
    }
  }

  void _trocarTraducao(String? nova) {
    if (nova == null || nova == _traducao) return;
    setState(() {
      _traducao = nova;
    });
    _carregarCapitulo();
  }

  void _trocarTema() async {
    final tema = Provider.of<TemaProvider>(context, listen: false);
    final opcoes = [
      AppTheme.light,
      AppTheme.dark,
      AppTheme.sepia,
      AppTheme.noturno,
    ];
    final escolhido = await showDialog<String>(
      context: context,
      builder: (context) => SimpleDialog(
        title: const Text('Tema'),
        children: opcoes
            .map((t) => SimpleDialogOption(
                  onPressed: () => Navigator.pop(context, t),
                  child: Text(_nomeTema(t)),
                ))
            .toList(),
      ),
    );
    if (escolhido != null) {
      await tema.setTema(escolhido);
    }
  }

  String _nomeTema(String t) {
    switch (t) {
      case AppTheme.dark:
        return 'Escuro';
      case AppTheme.sepia:
        return 'Sépia';
      case AppTheme.noturno:
        return 'Noturno';
      case AppTheme.light:
      default:
        return 'Claro';
    }
  }

  void _onVersiculoLongPress(Versiculo versiculo) {
    HapticFeedback.mediumImpact();
    _mostrarPopupAcoes(versiculo);
  }

  void _mostrarPopupAcoes(Versiculo versiculo) {
    final isFav = _versiculosFavoritados.contains(versiculo.numero);
    final highlight = _highlightsCapitulo[versiculo.numero];
    showModalBottomSheet(
      context: context,
      builder: (ctx) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 12, 20, 20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  width: 40, height: 4,
                  margin: const EdgeInsets.only(bottom: 16),
                  decoration: BoxDecoration(
                    color: Theme.of(ctx).colorScheme.outline.withValues(alpha: 0.3),
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              Text(
                '${_livro?.nome ?? ''} $_capitulo:${versiculo.numero}',
                style: Theme.of(ctx).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                versiculo.texto,
                maxLines: 3,
                overflow: TextOverflow.ellipsis,
                style: Theme.of(ctx).textTheme.bodyMedium?.copyWith(
                  fontStyle: FontStyle.italic,
                  color: Theme.of(ctx).colorScheme.onSurfaceVariant,
                ),
              ),
              const SizedBox(height: 20),
              _buildAcaoLinha(
                ctx,
                icon: Icons.format_color_fill,
                label: highlight != null ? 'Alterar destaque' : 'Destacar',
                onTap: () {
                  Navigator.of(ctx).pop();
                  _mostrarSeletorCor(versiculo);
                },
                trailing: highlight != null
                    ? Container(
                        width: 16, height: 16,
                        decoration: BoxDecoration(
                          color: highlight.colorData.color,
                          shape: BoxShape.circle,
                        ),
                      )
                    : null,
              ),
              _buildAcaoLinha(
                ctx,
                icon: Icons.note_add,
                label: 'Anotar',
                onTap: () {
                  Navigator.of(ctx).pop();
                  _abrirEditorNota(versiculo);
                },
              ),
              _buildAcaoLinha(
                ctx,
                icon: isFav ? Icons.favorite : Icons.favorite_border,
                label: isFav ? 'Remover dos favoritos' : 'Favoritar',
                onTap: () {
                  Navigator.of(ctx).pop();
                  _toggleFavorito(versiculo, isFav);
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildAcaoLinha(
    BuildContext ctx, {
    required IconData icon,
    required String label,
    required VoidCallback onTap,
    Widget? trailing,
  }) {
    final theme = Theme.of(ctx);
    return ListTile(
      leading: Icon(icon, color: theme.colorScheme.primary, size: 22),
      title: Text(label),
      trailing: trailing ?? Icon(
        Icons.chevron_right,
        color: theme.colorScheme.onSurface.withValues(alpha: 0.4),
        size: 20,
      ),
      onTap: onTap,
      contentPadding: EdgeInsets.zero,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
    );
  }

  void _mostrarSeletorCor(Versiculo versiculo) {
    showModalBottomSheet(
      context: context,
      builder: (ctx) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 12, 20, 20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  width: 40, height: 4,
                  margin: const EdgeInsets.only(bottom: 16),
                  decoration: BoxDecoration(
                    color: Theme.of(ctx).colorScheme.outline.withValues(alpha: 0.3),
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              Text('Cor do destaque', style: Theme.of(ctx).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
              const SizedBox(height: 16),
              HighlightColorPicker(
                selectedColorId: _highlightsCapitulo[versiculo.numero]?.cor,
                onColorSelected: (corId) {
                  Navigator.of(ctx).pop();
                  _aplicarDestaque(versiculo, corId);
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _aplicarDestaque(Versiculo versiculo, String corId) async {
    if (corId.isEmpty) {
      await _highlightsService.remove(
        livro: _livro!.abreviacao,
        capitulo: _capitulo,
        versiculo: versiculo.numero,
        traducao: _traducao,
      );
    } else {
      await _highlightsService.add(
        livro: _livro!.abreviacao,
        capitulo: _capitulo,
        versiculo: versiculo.numero,
        cor: corId,
        traducao: _traducao,
      );
    }
    await _carregarDadosCapitulo();
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(corId.isEmpty ? 'Destaque removido' : 'Versículo destacado'),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  Future<void> _abrirEditorNota(Versiculo versiculo) async {
    final existing = await _notesService.getNoteForVerse(
      livro: _livro!.abreviacao,
      capitulo: _capitulo,
      versiculo: versiculo.numero,
      traducao: _traducao,
    );
    final texto = await showNoteEditor(
      context,
      livro: _livro!.abreviacao,
      capitulo: _capitulo,
      versiculo: versiculo.numero,
      livroNome: _livro?.nome,
      existing: existing,
      traducao: _traducao,
    );
    if (texto == null || texto.isEmpty) return;
    if (existing != null) {
      await _notesService.update(existing.id!, texto);
    } else {
      await _notesService.add(
        livro: _livro!.abreviacao,
        capitulo: _capitulo,
        versiculo: versiculo.numero,
        texto: texto,
        traducao: _traducao,
      );
    }
    await _carregarDadosCapitulo();
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(existing != null ? 'Nota atualizada' : 'Nota salva'),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  Future<void> _toggleFavorito(Versiculo versiculo, bool isFav) async {
    if (isFav) {
      await _favoritesService.remove(
        livro: _livro!.abreviacao,
        capitulo: _capitulo,
        versiculo: versiculo.numero,
        traducao: _traducao,
      );
    } else {
      await _favoritesService.add(
        livro: _livro!.abreviacao,
        capitulo: _capitulo,
        versiculo: versiculo.numero,
        traducao: _traducao,
      );
    }
    await _carregarDadosCapitulo();
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(isFav ? 'Removido dos favoritos' : 'Adicionado aos favoritos'),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final traducaoNome = Traducoes.lista
        .firstWhere((t) => t.id == _traducao,
            orElse: () => Traducoes.lista.first)
        .nome;

    return Scaffold(
      appBar: AppBar(
        title: GestureDetector(
          onTap: _abrirLivros,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                _livro?.nome ?? 'Selecione um livro',
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                traducaoNome,
                style: const TextStyle(fontSize: 12),
              ),
            ],
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.palette),
            tooltip: 'Tema',
            onPressed: _trocarTema,
          ),
          PopupMenuButton<String>(
            onSelected: _trocarTraducao,
            itemBuilder: (context) => Traducoes.lista
                .where((t) => BibliaService.traducoesDisponiveis.contains(t.id))
                .map((t) => PopupMenuItem(
                      value: t.id,
                      child: Row(
                        children: [
                          Text(t.nome, style: const TextStyle(fontSize: 14)),
                          const Spacer(),
                          Text(t.abreviacao, style: TextStyle(fontSize: 11, color: Theme.of(context).colorScheme.onSurfaceVariant)),
                        ],
                      ),
                    ))
                .toList(),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: Row(
                children: [
                  Text(_traducao.toUpperCase()),
                  const Icon(Icons.arrow_drop_down),
                ],
              ),
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          InkWell(
            onTap: _abrirCapitulos,
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 16),
              color: Theme.of(context)
                  .colorScheme
                  .primaryContainer
                  .withValues(alpha: 0.3),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Capítulo $_capitulo',
                    style: const TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 15,
                    ),
                  ),
                  const Icon(Icons.expand_more),
                ],
              ),
            ),
          ),
          Expanded(
            child: _buildBody(),
          ),
        ],
      ),
      floatingActionButton: _livro != null
          ? FloatingActionButton(
              onPressed: _abrirLivros,
              tooltip: 'Livros',
              child: const Icon(Icons.menu_book),
            )
          : null,
    );
  }

  Widget _buildBody() {
    if (BibliaService.livros.isEmpty) {
      return const Center(child: CircularProgressIndicator());
    }
    if (_carregando) {
      return const Center(child: CircularProgressIndicator());
    }
    if (_erro != null && _versiculos.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Text(
            'Não foi possível carregar este capítulo.\n\n$_erro',
            textAlign: TextAlign.center,
          ),
        ),
      );
    }
    if (_versiculos.isEmpty) {
      return const Center(child: Text('Nenhum versículo.'));
    }
    return ListView.builder(
      padding: const EdgeInsets.symmetric(vertical: 8),
      itemCount: _versiculos.length,
      itemBuilder: (context, index) {
        final versiculo = _versiculos[index];
        return VerseCard(
          versiculo: versiculo,
          highlight: _highlightsCapitulo[versiculo.numero],
          temNota: _versiculosComNota.contains(versiculo.numero),
          onLongPress: () => _onVersiculoLongPress(versiculo),
        );
      },
    );
  }
}