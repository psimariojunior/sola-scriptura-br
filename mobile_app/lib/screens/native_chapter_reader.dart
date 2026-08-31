import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../config/theme.dart';
import '../data/bible_books.dart';
import '../services/bible_offline_service.dart';

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
  static const _fontPref = 'ssb_reader_font';
  static const _creamPref = 'ssb_reader_cream';

  late String _translationId;
  late int _bookNumber;
  late int _chapter;
  late PageController _pageController;
  final Map<int, List<OfflineVerse>> _cache = {};
  final Set<int> _loading = {};
  bool _downloading = false;
  double _downloadProgress = 0;
  String? _error;
  double _fontSize = 21;
  bool _cream = false;

  Map<String, dynamic>? get _book => BibleBooks.getBookByNumber(_bookNumber);
  String get _bookName => _book?['name'] as String? ?? 'Livro $_bookNumber';
  int get _maxChapter => (_book?['chapters'] as int?) ?? _chapter;

  Color get _bg => _cream ? AppTheme.readingCreamBg : AppTheme.readingNightBg;
  Color get _fg => _cream ? AppTheme.readingCreamText : AppTheme.readingNightText;
  Color get _muted => _cream ? const Color(0xFF7A6A4E) : AppTheme.textMuted;
  Color get _gold => AppTheme.goldLight;

  @override
  void initState() {
    super.initState();
    _translationId = widget.translationId;
    _bookNumber = widget.bookNumber;
    _chapter = widget.chapterNumber;
    _pageController = PageController(initialPage: (_chapter - 1).clamp(0, 1000));
    _restorePrefs();
    _loadChapter(_chapter);
    unawaited(_prefetchNeighbors());
  }

  Future<void> _restorePrefs() async {
    final prefs = await SharedPreferences.getInstance();
    if (!mounted) return;
    setState(() {
      _fontSize = prefs.getDouble(_fontPref) ?? 21;
      _cream = prefs.getBool(_creamPref) ?? false;
    });
  }

  Future<void> _persistPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setDouble(_fontPref, _fontSize);
    await prefs.setBool(_creamPref, _cream);
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  Future<void> _loadChapter(int chapter) async {
    if (chapter < 1 || chapter > _maxChapter) return;
    if (_cache.containsKey(chapter) || _loading.contains(chapter)) return;
    _loading.add(chapter);
    try {
      final verses = await BibleOfflineService.instance.getChapterVerses(
        _translationId,
        _bookNumber,
        chapter,
      );
      if (!mounted) return;
      setState(() {
        _cache[chapter] = verses;
        if (chapter == _chapter && verses.isEmpty) {
          _error = null;
        }
      });
      if (verses.isNotEmpty && chapter == _chapter) {
        unawaited(BibleOfflineService.instance.recordReading(
          _bookNumber,
          chapter,
          translationId: _translationId,
        ));
      }
    } finally {
      _loading.remove(chapter);
    }
  }

  Future<void> _prefetchNeighbors() async {
    await _loadChapter(_chapter - 1);
    await _loadChapter(_chapter + 1);
  }

  Future<void> _downloadWholeBook() async {
    if (_downloading) return;
    setState(() {
      _downloading = true;
      _downloadProgress = 0;
      _error = null;
    });
    try {
      final saved = await BibleOfflineService.instance.downloadBook(
        _translationId,
        _bookNumber,
        onProgress: (p) {
          if (mounted) setState(() => _downloadProgress = p);
        },
      );
      if (!mounted) return;
      _cache.clear();
      await _loadChapter(_chapter);
      await _prefetchNeighbors();
      if (saved == 0) {
        setState(() {
          _error =
              'Não foi possível baixar $_bookName. Verifique a internet e tente de novo.';
        });
      }
    } catch (e) {
      if (!mounted) return;
      setState(() => _error = 'Falha no download: $e');
    } finally {
      if (mounted) setState(() => _downloading = false);
    }
  }

  void _onPageChanged(int index) {
    final next = index + 1;
    setState(() {
      _chapter = next;
      _error = null;
    });
    _loadChapter(next);
    unawaited(_prefetchNeighbors());
    HapticFeedback.selectionClick();
  }

  void _go(int delta) {
    final next = _chapter + delta;
    if (next < 1 || next > _maxChapter) return;
    _pageController.animateToPage(
      next - 1,
      duration: const Duration(milliseconds: 280),
      curve: Curves.easeOutCubic,
    );
  }

  void _onHeaderTap() {
    if (Navigator.of(context).canPop()) {
      Navigator.of(context).pop();
      return;
    }
    _showChapterSheet();
  }

  void _showChapterSheet() {
    showModalBottomSheet<void>(
      context: context,
      backgroundColor: AppTheme.bgMedium,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(18)),
      ),
      builder: (ctx) {
        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 12, 20, 20),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(
                    width: 36,
                    height: 4,
                    decoration: BoxDecoration(
                      color: Colors.white24,
                      borderRadius: BorderRadius.circular(4),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  _bookName,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                    fontFamily: 'serif',
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  'Toque no capítulo',
                  style: TextStyle(color: AppTheme.textMuted, fontSize: 13),
                ),
                const SizedBox(height: 14),
                ConstrainedBox(
                  constraints: BoxConstraints(
                    maxHeight: MediaQuery.of(ctx).size.height * 0.45,
                  ),
                  child: SingleChildScrollView(
                    child: Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: List.generate(_maxChapter, (i) {
                        final cap = i + 1;
                        final current = cap == _chapter;
                        return InkWell(
                          onTap: () {
                            Navigator.pop(ctx);
                            _pageController.jumpToPage(cap - 1);
                          },
                          child: Container(
                            width: 44,
                            height: 40,
                            alignment: Alignment.center,
                            decoration: BoxDecoration(
                              color: current
                                  ? AppTheme.goldPrimary
                                  : Colors.white.withValues(alpha: 0.06),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Text(
                              '$cap',
                              style: TextStyle(
                                color: current ? Colors.white : AppTheme.textSecondary,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                        );
                      }),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                if (Navigator.of(context).canPop())
                  TextButton(
                    onPressed: () {
                      Navigator.pop(ctx);
                      Navigator.of(context).pop();
                    },
                    child: const Text(
                      'Trocar livro ou tradução',
                      style: TextStyle(color: AppTheme.goldPrimary),
                    ),
                  ),
              ],
            ),
          ),
        );
      },
    );
  }

  void _showTranslationSheet() {
    showModalBottomSheet<void>(
      context: context,
      backgroundColor: AppTheme.bgMedium,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(18)),
      ),
      builder: (ctx) {
        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Tradução',
                  style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w600),
                ),
                const SizedBox(height: 12),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: BibleOfflineService.availableTranslations.map((t) {
                    final id = t['id']!;
                    final selected = id == _translationId;
                    return ChoiceChip(
                      label: Text(id),
                      selected: selected,
                      selectedColor: AppTheme.goldPrimary,
                      onSelected: (_) async {
                        Navigator.pop(ctx);
                        setState(() {
                          _translationId = id;
                          _cache.clear();
                        });
                        await _loadChapter(_chapter);
                        await _prefetchNeighbors();
                      },
                    );
                  }).toList(),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _bg,
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(),
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                onPageChanged: _onPageChanged,
                itemCount: _maxChapter,
                itemBuilder: (context, index) => _buildPage(index + 1),
              ),
            ),
            _buildNav(),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(4, 4, 8, 4),
      child: Row(
        children: [
          if (Navigator.of(context).canPop())
            IconButton(
              tooltip: 'Livros',
              icon: Icon(Icons.arrow_back_ios_new_rounded, color: _fg, size: 18),
              onPressed: () => Navigator.of(context).pop(),
            )
          else
            const SizedBox(width: 8),
          Expanded(
            child: InkWell(
              onTap: _onHeaderTap,
              borderRadius: BorderRadius.circular(10),
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 6),
                child: Row(
                  children: [
                    Flexible(
                      child: Text(
                        '$_bookName $_chapter',
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          color: _fg,
                          fontSize: 17,
                          fontWeight: FontWeight.w600,
                          fontFamily: 'serif',
                          letterSpacing: -0.2,
                        ),
                      ),
                    ),
                    const SizedBox(width: 4),
                    Icon(Icons.expand_more_rounded, color: _gold, size: 22),
                  ],
                ),
              ),
            ),
          ),
          InkWell(
            onTap: _showTranslationSheet,
            borderRadius: BorderRadius.circular(8),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
              child: Text(
                _translationId,
                style: TextStyle(
                  color: _gold,
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 0.6,
                ),
              ),
            ),
          ),
          IconButton(
            tooltip: _cream ? 'Noite' : 'Creme',
            icon: Icon(
              _cream ? Icons.dark_mode_outlined : Icons.wb_sunny_outlined,
              color: _muted,
              size: 20,
            ),
            onPressed: () {
              setState(() => _cream = !_cream);
              unawaited(_persistPrefs());
            },
          ),
          if (widget.onOpenWeb != null)
            TextButton(
              onPressed: () {
                final abbr = (_book?['abbr'] as String?) ?? 'gn';
                final path = '/biblia?livro=$abbr&capitulo=$_chapter';
                if (Navigator.of(context).canPop()) {
                  Navigator.of(context).pop();
                }
                widget.onOpenWeb!(path);
              },
              child: Text('Estudar', style: TextStyle(color: _gold, fontSize: 13)),
            ),
        ],
      ),
    );
  }

  Widget _buildPage(int chapter) {
    final verses = _cache[chapter];
    if (verses == null) {
      return const Center(child: CircularProgressIndicator(color: AppTheme.goldPrimary));
    }
    if (verses.isEmpty) {
      return _buildEmpty(chapter);
    }
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(28, 12, 28, 36),
      child: Column(
        children: [
          Text(
            _bookName.toUpperCase(),
            style: TextStyle(
              color: _muted,
              fontSize: 12,
              letterSpacing: 3.2,
              fontWeight: FontWeight.w600,
              fontFamily: 'serif',
            ),
          ),
          const SizedBox(height: 6),
          Text(
            '$chapter',
            style: TextStyle(
              color: _fg,
              fontSize: 52,
              height: 1.0,
              fontWeight: FontWeight.w500,
              fontFamily: 'serif',
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 14),
            child: Row(
              children: [
                Expanded(child: Divider(color: _gold.withValues(alpha: 0.28), height: 1)),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 10),
                  child: Icon(Icons.auto_awesome, size: 10, color: _gold.withValues(alpha: 0.7)),
                ),
                Expanded(child: Divider(color: _gold.withValues(alpha: 0.28), height: 1)),
              ],
            ),
          ),
          Text.rich(
            TextSpan(
              children: [
                for (final v in verses) ...[
                  WidgetSpan(
                    alignment: PlaceholderAlignment.top,
                    child: Padding(
                      padding: const EdgeInsets.only(right: 5, top: 1),
                      child: Text(
                        '${v.number}',
                        style: TextStyle(
                          color: _gold.withValues(alpha: 0.72),
                          fontSize: (_fontSize * 0.55).clamp(10, 14),
                          fontWeight: FontWeight.w600,
                          height: 1,
                          fontFeatures: const [FontFeature.tabularFigures()],
                        ),
                      ),
                    ),
                  ),
                  TextSpan(text: '${v.text} '),
                ],
              ],
            ),
            textAlign: TextAlign.justify,
            style: TextStyle(
              color: _fg,
              fontSize: _fontSize,
              height: 1.88,
              fontFamily: 'serif',
              fontWeight: FontWeight.w400,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEmpty(int chapter) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.menu_book_outlined, color: _muted, size: 48),
            const SizedBox(height: 16),
            Text(
              _error ?? 'Baixe $_bookName para ler sem internet',
              textAlign: TextAlign.center,
              style: TextStyle(color: _fg, fontSize: 17, height: 1.4, fontFamily: 'serif'),
            ),
            const SizedBox(height: 8),
            Text(
              'Capítulo $chapter · $_translationId',
              style: TextStyle(color: _muted, fontSize: 13),
            ),
            const SizedBox(height: 22),
            if (_downloading) ...[
              LinearProgressIndicator(
                value: _downloadProgress > 0 ? _downloadProgress : null,
                color: AppTheme.goldPrimary,
                backgroundColor: _muted.withValues(alpha: 0.2),
              ),
              const SizedBox(height: 8),
              Text(
                'Baixando ${(_downloadProgress * 100).clamp(0, 100).toStringAsFixed(0)}%',
                style: TextStyle(color: _muted, fontSize: 12),
              ),
            ] else
              SizedBox(
                width: double.infinity,
                height: 48,
                child: ElevatedButton.icon(
                  onPressed: _downloadWholeBook,
                  icon: const Icon(Icons.download_rounded, size: 18),
                  label: Text('Baixar $_bookName'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.goldPrimary,
                    foregroundColor: Colors.white,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildNav() {
    return SafeArea(
      top: false,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(8, 4, 8, 8),
        child: Row(
          children: [
            IconButton(
              tooltip: 'Capítulo anterior',
              onPressed: _chapter > 1 ? () => _go(-1) : null,
              icon: Icon(Icons.chevron_left_rounded, color: _chapter > 1 ? _gold : _muted.withValues(alpha: 0.35), size: 28),
            ),
            IconButton(
              tooltip: 'Diminuir fonte',
              onPressed: _fontSize <= 16
                  ? null
                  : () {
                      setState(() => _fontSize = (_fontSize - 1.5).clamp(16, 30));
                      unawaited(_persistPrefs());
                    },
              icon: Text('A−', style: TextStyle(color: _muted, fontSize: 13, fontWeight: FontWeight.w600)),
            ),
            Expanded(
              child: Text(
                '$_chapter / $_maxChapter',
                textAlign: TextAlign.center,
                style: TextStyle(color: _muted, fontSize: 12, letterSpacing: 0.4),
              ),
            ),
            IconButton(
              tooltip: 'Aumentar fonte',
              onPressed: _fontSize >= 30
                  ? null
                  : () {
                      setState(() => _fontSize = (_fontSize + 1.5).clamp(16, 30));
                      unawaited(_persistPrefs());
                    },
              icon: Text('A+', style: TextStyle(color: _muted, fontSize: 14, fontWeight: FontWeight.w700)),
            ),
            IconButton(
              tooltip: 'Próximo capítulo',
              onPressed: _chapter < _maxChapter ? () => _go(1) : null,
              icon: Icon(
                Icons.chevron_right_rounded,
                color: _chapter < _maxChapter ? _gold : _muted.withValues(alpha: 0.35),
                size: 28,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
