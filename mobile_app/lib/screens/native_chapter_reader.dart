import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../config/theme.dart';
import '../data/bible_books.dart';
import '../services/bible_offline_service.dart';

class NativeChapterReader extends StatefulWidget {
  final String translationId;
  final int bookNumber;
  final int chapterNumber;
  final int initialVerse;
  final void Function(String path)? onOpenWeb;

  const NativeChapterReader({
    super.key,
    required this.translationId,
    required this.bookNumber,
    required this.chapterNumber,
    this.initialVerse = 0,
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
  final Map<int, Set<int>> _favByChapter = {};
  final Map<String, GlobalKey> _verseKeys = {};
  final Set<int> _loading = {};
  bool _downloading = false;
  double _downloadProgress = 0;
  String? _error;
  double _fontSize = 21;
  bool _cream = false;

  FlutterTts? _tts;
  bool? _ttsReady;
  bool _speaking = false;
  bool _paused = false;
  bool _wantSpeak = false;
  int _speakIndex = 0;
  int? _speakingVerse;
  int _lastVerse = 0;
  int _ttsGen = 0;
  Timer? _versePersistTimer;

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
    _lastVerse = widget.initialVerse;
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
    _versePersistTimer?.cancel();
    _wantSpeak = false;
    _ttsGen++;
    unawaited(_tts?.stop());
    _pageController.dispose();
    super.dispose();
  }

  GlobalKey _verseKey(int chapter, int number) =>
      _verseKeys.putIfAbsent('$chapter:$number', () => GlobalKey());

  Future<void> _persistLastVerse(int verse) async {
    _lastVerse = verse;
    unawaited(BibleOfflineService.instance.updateLastVerse(verse));
  }

  void _schedulePersistVisibleVerse(int chapter) {
    _versePersistTimer?.cancel();
    _versePersistTimer = Timer(const Duration(milliseconds: 450), () {
      if (!mounted || chapter != _chapter) return;
      final verses = _cache[chapter];
      if (verses == null || verses.isEmpty) return;
      for (final v in verses) {
        final ctx = _verseKey(chapter, v.number).currentContext;
        if (ctx == null) continue;
        final box = ctx.findRenderObject();
        if (box is! RenderBox || !box.hasSize) continue;
        final y = box.localToGlobal(Offset.zero).dy;
        if (y >= 72 && y < 280) {
          _persistLastVerse(v.number);
          return;
        }
      }
    });
  }

  void _scrollToVerse(int chapter, int number) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      final ctx = _verseKey(chapter, number).currentContext;
      if (ctx == null) return;
      Scrollable.ensureVisible(
        ctx,
        alignment: 0.22,
        duration: const Duration(milliseconds: 280),
        curve: Curves.easeOutCubic,
      );
    });
  }

  Future<bool> _ensureTts() async {
    if (_ttsReady == true) return true;
    if (_ttsReady == false) return false;
    try {
      final tts = FlutterTts();
      _tts = tts;
      await tts.setLanguage('pt-BR');
      await tts.setSpeechRate(0.46);
      await tts.setPitch(1.0);
      await tts.setVolume(1.0);
      tts.setCompletionHandler(() {
        if (!mounted) return;
        _advanceTts();
      });
      tts.setErrorHandler((msg) {
        debugPrint('TTS error: $msg');
        if (mounted) unawaited(_onTtsFailed());
      });
      _ttsReady = true;
      return true;
    } catch (e) {
      debugPrint('TTS init: $e');
      _ttsReady = false;
      return false;
    }
  }

  Future<void> _onTtsFailed() async {
    _wantSpeak = false;
    _ttsGen++;
    await _tts?.stop();
    if (!mounted) return;
    setState(() {
      _speaking = false;
      _paused = false;
      _speakingVerse = null;
      _ttsReady = false;
    });
    _toast('Áudio nativo indisponível neste aparelho. Use o fone no topo para ouvir no site.');
  }

  Future<void> _togglePlay({int? fromVerse}) async {
    if (_speaking && !_paused) {
      _wantSpeak = false;
      _ttsGen++;
      await _tts?.stop();
      if (mounted) setState(() => _paused = true);
      return;
    }
    final verses = _cache[_chapter];
    if (verses == null || verses.isEmpty) {
      _toast('Baixe o capítulo para ouvir offline.');
      return;
    }
    final ok = await _ensureTts();
    if (!ok) {
      await _onTtsFailed();
      return;
    }
    if (fromVerse != null) {
      final idx = verses.indexWhere((v) => v.number == fromVerse);
      _speakIndex = idx >= 0 ? idx : 0;
    } else if (!_paused) {
      _speakIndex = 0;
    }
    _wantSpeak = true;
    _paused = false;
    setState(() => _speaking = true);
    await _speakAt(_speakIndex);
  }

  void _advanceTts() {
    if (!_wantSpeak || _paused) return;
    _speakIndex++;
    unawaited(_speakAt(_speakIndex));
  }

  Future<void> _speakAt(int index) async {
    final gen = ++_ttsGen;
    final verses = _cache[_chapter];
    if (verses == null || index < 0 || index >= verses.length) {
      if (!mounted) return;
      setState(() {
        _speaking = false;
        _paused = false;
        _speakingVerse = null;
        _wantSpeak = false;
      });
      return;
    }
    if (!_wantSpeak) return;
    final verse = verses[index];
    if (mounted) {
      setState(() {
        _speaking = true;
        _paused = false;
        _speakingVerse = verse.number;
        _speakIndex = index;
      });
    }
    _persistLastVerse(verse.number);
    _scrollToVerse(_chapter, verse.number);
    try {
      final result = await _tts?.speak(verse.text);
      if (gen != _ttsGen) return;
      if (result == 0 || result == false) {
        await _onTtsFailed();
      }
    } catch (_) {
      if (gen == _ttsGen) await _onTtsFailed();
    }
  }

  Future<void> _stopTts() async {
    _wantSpeak = false;
    _ttsGen++;
    await _tts?.stop();
    if (!mounted) return;
    setState(() {
      _speaking = false;
      _paused = false;
      _speakingVerse = null;
    });
  }

  Future<void> _loadChapter(int chapter) async {
    if (chapter < 1 || chapter > _maxChapter) return;
    if (_cache.containsKey(chapter) || _loading.contains(chapter)) {
      unawaited(_refreshFavorites(chapter));
      return;
    }
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
      unawaited(_refreshFavorites(chapter));
      if (verses.isNotEmpty && chapter == _chapter) {
        unawaited(BibleOfflineService.instance.recordReading(
          _bookNumber,
          chapter,
          translationId: _translationId,
          verseNumber: _lastVerse,
        ));
        if (_lastVerse > 1) {
          _scrollToVerse(chapter, _lastVerse);
          Future<void>.delayed(const Duration(milliseconds: 160), () {
            if (mounted && chapter == _chapter) _scrollToVerse(chapter, _lastVerse);
          });
        }
      }
    } finally {
      _loading.remove(chapter);
    }
  }

  Future<void> _refreshFavorites(int chapter) async {
    try {
      final nums = await BibleOfflineService.instance.getFavoriteVerseNumbers(
        translationId: _translationId,
        bookNumber: _bookNumber,
        chapterNumber: chapter,
      );
      if (!mounted) return;
      setState(() => _favByChapter[chapter] = nums);
    } catch (_) {}
  }

  Future<void> _prefetchNeighbors() async {
    await _loadChapter(_chapter - 1);
    await _loadChapter(_chapter + 1);
  }

  String _downloadFailMessage(String bookName) {
    return 'Não foi possível baixar $bookName. Verifique a internet e tente de novo. '
        'NVI, ARC e ARA costumam funcionar melhor — nem todas as traduções estão sempre disponíveis.';
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
        setState(() => _error = _downloadFailMessage(_bookName));
      } else if (saved < _maxChapter) {
        setState(() {
          _error =
              'Baixados $saved de $_maxChapter capítulos de $_bookName. '
              'Tente de novo para completar. Nem todas as traduções respondem sempre.';
        });
      }
    } catch (_) {
      if (!mounted) return;
      setState(() => _error = _downloadFailMessage(_bookName));
    } finally {
      if (mounted) setState(() => _downloading = false);
    }
  }

  void _onPageChanged(int index) {
    final next = index + 1;
    unawaited(_stopTts());
    setState(() {
      _chapter = next;
      _error = null;
      _lastVerse = 1;
      _speakIndex = 0;
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

  void _openSite(String path) {
    if (widget.onOpenWeb == null) return;
    if (Navigator.of(context).canPop()) {
      Navigator.of(context).pop();
    }
    widget.onOpenWeb!(path);
  }

  String get _sitePath {
    final abbr = (_book?['abbr'] as String?) ?? 'gn';
    return '/biblia?livro=$abbr&capitulo=$_chapter';
  }

  String get _guiaPath {
    final abbr = (_book?['abbr'] as String?) ?? 'gn';
    return '/guia?livro=$abbr&capitulo=$_chapter';
  }

  String _interlinearHref({int? verse}) {
    final abbr = (_book?['abbr'] as String?) ?? 'gn';
    final v = verse != null ? '&verso=$verse' : '';
    return '/biblia/interlinear?livro=$abbr&capitulo=$_chapter$v';
  }

  String get _interlinearPath => _interlinearHref();

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
                const SizedBox(height: 8),
                const Text(
                  'NVI, ARC e ARA costumam baixar melhor. Nem todas as 10 estão sempre disponíveis.',
                  style: TextStyle(color: AppTheme.textMuted, fontSize: 12, height: 1.35),
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
                        await _stopTts();
                        setState(() {
                          _translationId = id;
                          _cache.clear();
                          _favByChapter.clear();
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

  void _toast(String message) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message, style: const TextStyle(color: Colors.white, fontSize: 13)),
        backgroundColor: AppTheme.surfaceLight,
        behavior: SnackBarBehavior.floating,
        duration: const Duration(seconds: 2),
        margin: const EdgeInsets.all(16),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      ),
    );
  }

  Future<void> _onVerseTap(OfflineVerse verse, int chapter) async {
    HapticFeedback.selectionClick();
    unawaited(_persistLastVerse(verse.number));
    final favId = BibleOfflineService.instance.favoriteId(
      translationId: _translationId,
      bookNumber: _bookNumber,
      chapterNumber: chapter,
      verseNumber: verse.number,
    );
    final isFav = _favByChapter[chapter]?.contains(verse.number) ?? false;
    final ref = '$_bookName $chapter:${verse.number}';

    await showModalBottomSheet<void>(
      context: context,
      backgroundColor: AppTheme.bgMedium,
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
                const SizedBox(height: 14),
                Text(
                  ref,
                  style: const TextStyle(
                    color: AppTheme.goldLight,
                    fontSize: 13,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 0.4,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  verse.text,
                  maxLines: 4,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 15,
                    height: 1.45,
                    fontFamily: 'serif',
                  ),
                ),
                const SizedBox(height: 16),
                _VerseAction(
                  icon: Icons.play_circle_outline_rounded,
                  label: 'Ouvir a partir daqui',
                  onTap: () {
                    Navigator.pop(ctx);
                    unawaited(_togglePlay(fromVerse: verse.number));
                  },
                ),
                _VerseAction(
                  icon: isFav ? Icons.star_rounded : Icons.star_outline_rounded,
                  label: isFav ? 'Remover dos favoritos' : 'Favoritar',
                  onTap: () async {
                    Navigator.pop(ctx);
                    if (isFav) {
                      await BibleOfflineService.instance.removeFavorite(favId);
                      if (!mounted) return;
                      setState(() {
                        _favByChapter.putIfAbsent(chapter, () => <int>{}).remove(verse.number);
                      });
                      _toast('Removido dos favoritos');
                    } else {
                      await BibleOfflineService.instance.saveFavorite(
                        bookNumber: _bookNumber,
                        chapterNumber: chapter,
                        verseNumber: verse.number,
                        translationId: _translationId,
                        text: verse.text,
                        reference: ref,
                      );
                      if (!mounted) return;
                      setState(() {
                        _favByChapter.putIfAbsent(chapter, () => <int>{}).add(verse.number);
                      });
                      _toast('Salvo nos favoritos');
                    }
                  },
                ),
                _VerseAction(
                  icon: Icons.menu_book_outlined,
                  label: 'Ficha e guia deste capítulo',
                  onTap: () {
                    Navigator.pop(ctx);
                    _openSite(_guiaPath);
                  },
                ),
                _VerseAction(
                  icon: Icons.translate_outlined,
                  label: 'Ver no original',
                  onTap: () {
                    Navigator.pop(ctx);
                    _openSite(_interlinearHref(verse: verse.number));
                  },
                ),
                _VerseAction(
                  icon: Icons.copy_rounded,
                  label: 'Copiar',
                  onTap: () async {
                    Navigator.pop(ctx);
                    await Clipboard.setData(
                      ClipboardData(text: '$ref\n${verse.text}\n($_translationId)'),
                    );
                    _toast('Versículo copiado');
                  },
                ),
                _VerseAction(
                  icon: Icons.note_alt_outlined,
                  label: 'Nota',
                  onTap: () {
                    Navigator.pop(ctx);
                    _showNoteDialog(verse, chapter, ref);
                  },
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Future<void> _showNoteDialog(OfflineVerse verse, int chapter, String ref) async {
    final controller = TextEditingController();
    final saved = await showDialog<bool>(
      context: context,
      builder: (ctx) {
        return AlertDialog(
          backgroundColor: AppTheme.bgMedium,
          title: Text(
            'Nota · $ref',
            style: const TextStyle(color: Colors.white, fontSize: 16),
          ),
          content: TextField(
            controller: controller,
            autofocus: true,
            maxLines: 5,
            style: const TextStyle(color: Colors.white, fontSize: 15, height: 1.4),
            decoration: InputDecoration(
              hintText: 'Escreva sua anotação…',
              hintStyle: TextStyle(color: AppTheme.textMuted),
              filled: true,
              fillColor: Colors.white.withValues(alpha: 0.06),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: BorderSide.none,
              ),
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx, false),
              child: const Text('Cancelar'),
            ),
            TextButton(
              onPressed: () => Navigator.pop(ctx, true),
              child: const Text('Salvar', style: TextStyle(color: AppTheme.goldPrimary)),
            ),
          ],
        );
      },
    );
    final text = controller.text.trim();
    controller.dispose();
    if (saved != true || text.isEmpty) return;
    await BibleOfflineService.instance.saveNote(
      bookNumber: _bookNumber,
      chapterNumber: chapter,
      verseNumber: verse.number,
      translationId: _translationId,
      title: ref,
      content: text,
    );
    _toast('Nota salva');
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
      padding: const EdgeInsets.fromLTRB(4, 4, 4, 4),
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
            IconButton(
              tooltip: 'Estudar este capítulo',
              icon: Icon(Icons.auto_stories_outlined, color: _gold, size: 20),
              onPressed: () => _openSite(_guiaPath),
            ),
          if (widget.onOpenWeb != null)
            IconButton(
              tooltip: 'Interlinear (hebraico e grego)',
              icon: Icon(Icons.translate_outlined, color: _gold, size: 20),
              onPressed: () => _openSite(_interlinearPath),
            ),
          if (widget.onOpenWeb != null)
            IconButton(
              tooltip: 'Ouvir no site',
              icon: Icon(Icons.headphones_outlined, color: _muted, size: 20),
              onPressed: () => _openSite(_sitePath),
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
    final favs = _favByChapter[chapter] ?? const <int>{};
    return NotificationListener<ScrollNotification>(
      onNotification: (n) {
        if (n is ScrollUpdateNotification) {
          _schedulePersistVisibleVerse(chapter);
        }
        return false;
      },
      child: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(child: _buildChapterHeading(chapter)),
          SliverPadding(
            padding: const EdgeInsets.fromLTRB(16, 4, 18, 40),
            sliver: SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, i) => _buildVerseBlock(verses[i], chapter, favs.contains(verses[i].number)),
                childCount: verses.length,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildChapterHeading(int chapter) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 12, 24, 8),
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
          if (widget.onOpenWeb != null)
            Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: TextButton.icon(
                onPressed: () => _openSite(_guiaPath),
                icon: Icon(Icons.auto_stories_outlined, color: _gold, size: 18),
                label: Text(
                  'Ficha e guia deste capítulo',
                  style: TextStyle(color: _gold, fontSize: 13, fontWeight: FontWeight.w600),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildVerseBlock(OfflineVerse verse, int chapter, bool isFav) {
    final speaking = chapter == _chapter && _speakingVerse == verse.number;
    return Material(
      key: _verseKey(chapter, verse.number),
      color: Colors.transparent,
      child: InkWell(
        onTap: () => _onVerseTap(verse, chapter),
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.fromLTRB(8, 12, 8, 12),
          decoration: BoxDecoration(
            color: speaking
                ? _gold.withValues(alpha: _cream ? 0.20 : 0.16)
                : Colors.transparent,
            borderRadius: BorderRadius.circular(8),
            border: Border(
              bottom: BorderSide(color: _muted.withValues(alpha: 0.14), width: 0.5),
            ),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(
                width: 36,
                child: Padding(
                  padding: const EdgeInsets.only(top: 3),
                  child: Text(
                    '${verse.number}',
                    textAlign: TextAlign.right,
                    style: TextStyle(
                      color: _gold,
                      fontSize: (_fontSize * 0.72).clamp(13.0, 17.0),
                      fontWeight: FontWeight.w700,
                      height: 1.2,
                      fontFeatures: const [FontFeature.tabularFigures()],
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  verse.text,
                  textAlign: TextAlign.start,
                  style: TextStyle(
                    color: _fg,
                    fontSize: _fontSize,
                    height: 1.55,
                    fontFamily: 'serif',
                    fontWeight: speaking ? FontWeight.w600 : FontWeight.w400,
                  ),
                ),
              ),
              if (isFav)
                Padding(
                  padding: const EdgeInsets.only(left: 6, top: 4),
                  child: Icon(Icons.star_rounded, size: 14, color: _gold),
                ),
            ],
          ),
        ),
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
            const SizedBox(height: 6),
            Text(
              'NVI, ARC e ARA costumam funcionar melhor.',
              textAlign: TextAlign.center,
              style: TextStyle(color: _muted, fontSize: 12, height: 1.35),
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
            IconButton(
              tooltip: _speaking && !_paused ? 'Pausar' : 'Ouvir capítulo',
              onPressed: () => unawaited(_togglePlay()),
              icon: Icon(
                _speaking && !_paused ? Icons.pause_circle_filled_rounded : Icons.play_circle_filled_rounded,
                color: _gold,
                size: 36,
              ),
            ),
            Expanded(
              child: Text(
                _speaking && _speakingVerse != null
                    ? 'v. $_speakingVerse'
                    : '$_chapter / $_maxChapter',
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

class _VerseAction extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;

  const _VerseAction({
    required this.icon,
    required this.label,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: Icon(icon, color: AppTheme.goldPrimary, size: 22),
      title: Text(label, style: const TextStyle(color: Colors.white, fontSize: 16)),
      onTap: onTap,
    );
  }
}
