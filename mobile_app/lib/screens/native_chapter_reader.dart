import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../data/bible_books.dart';
import '../services/bible_offline_service.dart';
import 'dart:async';

class NativeChapterReader extends StatefulWidget {
  final String translationId;
  final int bookNumber;
  final int chapterNumber;
  final void Function(String path)? onOpenWeb;

  const NativeChapterReader({
    super.key,
    required this.translationId,
    required this.bookNumber,
    required this.chapterNumber,
    this.onOpenWeb,
  });

  @override
  State<NativeChapterReader> createState() => _NativeChapterReaderState();
}

class _NativeChapterReaderState extends State<NativeChapterReader> {
  late int _chapter;
  List<OfflineVerse> _verses = [];
  bool _loading = true;
  String? _error;

  Map<String, dynamic>? get _book => BibleBooks.getBookByNumber(widget.bookNumber);
  String get _bookName => _book?['name'] as String? ?? 'Livro ${widget.bookNumber}';
  int get _maxChapter => (_book?['chapters'] as int?) ?? widget.chapterNumber;

  @override
  void initState() {
    super.initState();
    _chapter = widget.chapterNumber;
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final verses = await BibleOfflineService.instance.getChapterVerses(
        widget.translationId,
        widget.bookNumber,
        _chapter,
      );
      if (!mounted) return;
      setState(() {
        _verses = verses;
        _loading = false;
        if (verses.isEmpty) {
          _error = 'Este capítulo não está baixado. Abra Bíblia Offline e baixe $_bookName.';
        }
      });
      if (verses.isNotEmpty) {
        unawaited(BibleOfflineService.instance.recordReading(widget.bookNumber, _chapter));
      }
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = 'Não foi possível ler o capítulo: $e';
      });
    }
  }

  void _go(int delta) {
    final next = _chapter + delta;
    if (next < 1 || next > _maxChapter) return;
    setState(() => _chapter = next);
    _load();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.bgDark,
      appBar: AppBar(
        backgroundColor: AppTheme.bgDark,
        foregroundColor: AppTheme.textPrimary,
        title: Text(
          '$_bookName $_chapter',
          style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w600),
        ),
        actions: [
          if (widget.onOpenWeb != null)
            TextButton(
              onPressed: () {
                final abbr = (_book?['abbr'] as String?) ?? 'gn';
                final path = '/biblia?livro=$abbr&capitulo=$_chapter';
                Navigator.of(context).pop();
                widget.onOpenWeb!(path);
              },
              child: const Text('Estudar', style: TextStyle(color: AppTheme.goldPrimary, fontSize: 13)),
            ),
          Padding(
            padding: const EdgeInsets.only(right: 12),
            child: Center(
              child: Text(
                widget.translationId,
                style: const TextStyle(color: AppTheme.goldPrimary, fontSize: 12, fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: AppTheme.goldPrimary))
          : _error != null
              ? _buildError()
              : Column(
                  children: [
                    Expanded(child: _buildVerses()),
                    _buildNav(),
                  ],
                ),
    );
  }

  Widget _buildError() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.menu_book_outlined, color: AppTheme.textMuted, size: 48),
            const SizedBox(height: 16),
            Text(
              _error!,
              textAlign: TextAlign.center,
              style: const TextStyle(color: AppTheme.textSecondary, fontSize: 15, height: 1.4),
            ),
            const SizedBox(height: 20),
            TextButton(
              onPressed: () => Navigator.of(context).pushNamed('/offline-translations'),
              child: const Text('Baixar livros', style: TextStyle(color: AppTheme.goldPrimary)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildVerses() {
    return ListView.builder(
      padding: const EdgeInsets.fromLTRB(20, 8, 20, 24),
      itemCount: _verses.length,
      itemBuilder: (context, index) {
        final v = _verses[index];
        return Padding(
          padding: const EdgeInsets.only(bottom: 12),
          child: Text.rich(
            TextSpan(
              children: [
                TextSpan(
                  text: '${v.number}  ',
                  style: const TextStyle(
                    color: AppTheme.goldPrimary,
                    fontSize: 13,
                    fontWeight: FontWeight.w700,
                    height: 1.7,
                  ),
                ),
                TextSpan(
                  text: v.text,
                  style: const TextStyle(
                    color: AppTheme.textPrimary,
                    fontSize: 18,
                    height: 1.7,
                    fontFamily: 'serif',
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildNav() {
    return SafeArea(
      top: false,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 12),
        child: Row(
          children: [
            Expanded(
              child: OutlinedButton.icon(
                onPressed: _chapter > 1 ? () => _go(-1) : null,
                icon: const Icon(Icons.chevron_left, size: 18),
                label: const Text('Anterior'),
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppTheme.goldPrimary,
                  side: BorderSide(color: AppTheme.goldPrimary.withValues(alpha: 0.4)),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: Text(
                '$_chapter / $_maxChapter',
                style: const TextStyle(color: AppTheme.textMuted, fontSize: 12),
              ),
            ),
            Expanded(
              child: OutlinedButton.icon(
                onPressed: _chapter < _maxChapter ? () => _go(1) : null,
                iconAlignment: IconAlignment.end,
                icon: const Icon(Icons.chevron_right, size: 18),
                label: const Text('Próximo'),
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppTheme.goldPrimary,
                  side: BorderSide(color: AppTheme.goldPrimary.withValues(alpha: 0.4)),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
