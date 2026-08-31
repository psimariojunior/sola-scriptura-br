import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../data/bible_books.dart';
import '../services/bible_offline_service.dart';
import 'native_chapter_reader.dart';

class NativeBibleScreen extends StatefulWidget {
  final String? translation;
  final int? initialBook;
  final void Function(String path)? onOpenWeb;
  final bool autoOpenLast;

  const NativeBibleScreen({
    super.key,
    this.translation,
    this.initialBook,
    this.onOpenWeb,
    this.autoOpenLast = false,
  });

  @override
  State<NativeBibleScreen> createState() => _NativeBibleScreenState();
}

class _NativeBibleScreenState extends State<NativeBibleScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  late String _selectedTranslation;
  int? _selectedBook;
  Map<int, int> _status = {};
  Set<int> _selectedBookChapters = {};
  int? _downloadingBook;
  double _downloadProgress = 0;
  String? _downloadError;
  LastReading? _lastReading;
  bool _booting = true;
  bool _didAutoOpen = false;

  @override
  void initState() {
    super.initState();
    _selectedTranslation = widget.translation ?? 'NVI';
    _selectedBook = widget.initialBook;
    _tabController = TabController(length: 2, vsync: this);
    if (widget.initialBook != null && widget.initialBook! >= 40) {
      _tabController.index = 1;
    }
    _boot();
  }

  Future<void> _boot() async {
    await _loadStatus();
    final last = await BibleOfflineService.instance.getLastReading();
    if (!mounted) return;
    setState(() {
      _lastReading = last;
      if (last != null) _selectedTranslation = last.translationId;
      _booting = false;
    });
    if (widget.autoOpenLast && !_didAutoOpen && last != null) {
      _didAutoOpen = true;
      final verses = await BibleOfflineService.instance.getChapterVerses(
        last.translationId,
        last.bookNumber,
        last.chapterNumber,
      );
      if (!mounted) return;
      if (verses.isNotEmpty) {
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (mounted) _openChapter(last.bookNumber, last.chapterNumber, translation: last.translationId);
        });
      }
    }
  }

  Future<void> _loadStatus() async {
    final status = await BibleOfflineService.instance.getBookDownloadStatus(_selectedTranslation);
    if (mounted) setState(() => _status = status);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _openChapter(int bookNumber, int chapter, {String? translation}) {
    if (translation != null && translation != _selectedTranslation) {
      setState(() => _selectedTranslation = translation);
    }
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => NativeChapterReader(
          translationId: _selectedTranslation,
          bookNumber: bookNumber,
          chapterNumber: chapter,
          onOpenWeb: widget.onOpenWeb,
        ),
      ),
    ).then((_) {
      _loadStatus();
      BibleOfflineService.instance.getLastReading().then((last) {
        if (mounted) setState(() => _lastReading = last);
      });
      if (_selectedBook != null) {
        BibleOfflineService.instance
            .getDownloadedChapterNumbers(_selectedTranslation, _selectedBook!)
            .then((chapters) {
          if (mounted) setState(() => _selectedBookChapters = chapters);
        });
      }
    });
  }

  Future<void> _downloadBook(int bookNumber, String bookName) async {
    if (_downloadingBook != null) return;
    setState(() {
      _downloadingBook = bookNumber;
      _downloadProgress = 0;
      _downloadError = null;
    });
    try {
      final saved = await BibleOfflineService.instance.downloadBook(
        _selectedTranslation,
        bookNumber,
        onProgress: (p) {
          if (mounted) setState(() => _downloadProgress = p);
        },
      );
      if (!mounted) return;
      await _loadStatus();
      final chapters = await BibleOfflineService.instance.getDownloadedChapterNumbers(
        _selectedTranslation,
        bookNumber,
      );
      if (!mounted) return;
      setState(() {
        _selectedBookChapters = chapters;
        _downloadingBook = null;
        if (saved == 0) {
          _downloadError =
              'Não foi possível baixar $bookName. Verifique a internet. '
              'NVI, ARC e ARA costumam funcionar melhor — nem todas as traduções estão sempre disponíveis.';
        }
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _downloadingBook = null;
        _downloadError =
            'Falha ao baixar $bookName. Verifique a internet e tente de novo. '
            'NVI, ARC e ARA costumam funcionar melhor.';
      });
    }
  }

  Future<void> _selectBook(int number) async {
    if (_selectedBook == number) {
      setState(() {
        _selectedBook = null;
        _selectedBookChapters = {};
      });
      return;
    }
    final chapters = await BibleOfflineService.instance.getDownloadedChapterNumbers(
      _selectedTranslation,
      number,
    );
    if (!mounted) return;
    setState(() {
      _selectedBook = number;
      _selectedBookChapters = chapters;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_booting) {
      return const Scaffold(
        backgroundColor: AppTheme.bgDark,
        body: Center(child: CircularProgressIndicator(color: AppTheme.goldPrimary)),
      );
    }
    return Scaffold(
      backgroundColor: AppTheme.bgDark,
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(),
            _buildTranslationSelector(),
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 4, 16, 0),
              child: Text(
                'NVI, ARC e ARA costumam baixar melhor. Nem todas as 10 traduções estão sempre disponíveis.',
                style: TextStyle(color: AppTheme.textMuted, fontSize: 11, height: 1.35),
              ),
            ),
            _buildTabBar(),
            if (_downloadError != null)
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
                child: Text(
                  _downloadError!,
                  style: const TextStyle(color: Color(0xFFFBBF24), fontSize: 12, height: 1.4),
                ),
              ),
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  _buildBookList(BibleBooks.oldTestament),
                  _buildBookList(BibleBooks.newTestament),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
      child: Row(
        children: [
          if (Navigator.of(context).canPop())
            IconButton(
              icon: const Icon(Icons.arrow_back, color: Colors.white, size: 22),
              onPressed: () => Navigator.of(context).pop(),
            ),
          const Icon(Icons.menu_book_rounded, color: AppTheme.goldPrimary, size: 24),
          const SizedBox(width: 10),
          const Expanded(
            child: Text(
              'Bíblia',
              style: TextStyle(
                color: Colors.white,
                fontSize: 22,
                fontWeight: FontWeight.w600,
                fontFamily: 'serif',
              ),
            ),
          ),
          if (widget.onOpenWeb != null)
            TextButton(
              onPressed: () => widget.onOpenWeb!('/planos'),
              style: TextButton.styleFrom(
                padding: const EdgeInsets.symmetric(horizontal: 8),
                minimumSize: Size.zero,
                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
              ),
              child: const Text('Planos', style: TextStyle(color: AppTheme.goldPrimary, fontSize: 13)),
            ),
          if (widget.onOpenWeb != null)
            TextButton(
              onPressed: () => widget.onOpenWeb!('/biblia'),
              style: TextButton.styleFrom(
                padding: const EdgeInsets.symmetric(horizontal: 8),
                minimumSize: Size.zero,
                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
              ),
              child: const Text('Site', style: TextStyle(color: AppTheme.textSecondary, fontSize: 13)),
            ),
          TextButton(
            onPressed: () => Navigator.of(context).pushNamed('/offline-translations'),
            style: TextButton.styleFrom(
              padding: const EdgeInsets.symmetric(horizontal: 8),
              minimumSize: Size.zero,
              tapTargetSize: MaterialTapTargetSize.shrinkWrap,
            ),
            child: const Text('Baixar', style: TextStyle(color: AppTheme.textSecondary, fontSize: 13)),
          ),
        ],
      ),
    );
  }

  Widget _buildTranslationSelector() {
    final translations = BibleOfflineService.availableTranslations;
    return SizedBox(
      height: 40,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        itemCount: translations.length,
        itemBuilder: (context, index) {
          final t = translations[index]['id']!;
          final isSelected = t == _selectedTranslation;
          return Padding(
            padding: const EdgeInsets.only(right: 8),
            child: ChoiceChip(
              label: Text(t),
              selected: isSelected,
              selectedColor: AppTheme.goldPrimary,
              backgroundColor: Colors.white.withValues(alpha: 0.08),
              labelStyle: TextStyle(
                color: isSelected ? Colors.white : AppTheme.textSecondary,
                fontSize: 13,
                fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
              ),
              onSelected: (selected) {
                if (!selected) return;
                setState(() {
                  _selectedTranslation = t;
                  _selectedBookChapters = {};
                });
                _loadStatus();
                if (_selectedBook != null) {
                  BibleOfflineService.instance
                      .getDownloadedChapterNumbers(t, _selectedBook!)
                      .then((chapters) {
                    if (mounted) setState(() => _selectedBookChapters = chapters);
                  });
                }
              },
            ),
          );
        },
      ),
    );
  }

  Widget _buildTabBar() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(10),
      ),
      child: TabBar(
        controller: _tabController,
        indicator: BoxDecoration(
          color: AppTheme.goldPrimary,
          borderRadius: BorderRadius.circular(10),
        ),
        indicatorSize: TabBarIndicatorSize.tab,
        dividerColor: Colors.transparent,
        labelColor: Colors.white,
        unselectedLabelColor: AppTheme.textMuted,
        labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
        unselectedLabelStyle: const TextStyle(fontSize: 14),
        tabs: const [
          Tab(text: 'Antigo Testamento'),
          Tab(text: 'Novo Testamento'),
        ],
      ),
    );
  }

  Widget _buildBookList(List<Map<String, dynamic>> books) {
    final anyDownloaded = _status.values.any((c) => c > 0);
    final extra = (anyDownloaded ? 0 : 1) + (_lastReading != null ? 1 : 0);
    return ListView.builder(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      itemCount: books.length + extra,
      itemBuilder: (context, index) {
        var i = index;
        if (_lastReading != null) {
          if (i == 0) return _buildContinueCard();
          i -= 1;
        }
        if (!anyDownloaded) {
          if (i == 0) return _buildEmptyDownloadCard();
          i -= 1;
        }
        return _buildBookTile(books[i]);
      },
    );
  }

  Widget _buildContinueCard() {
    final last = _lastReading!;
    final book = BibleBooks.getBookByNumber(last.bookNumber);
    final name = book?['name'] as String? ?? 'Livro ${last.bookNumber}';
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () => _openChapter(last.bookNumber, last.chapterNumber, translation: last.translationId),
          borderRadius: BorderRadius.circular(14),
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  AppTheme.goldPrimary.withValues(alpha: 0.22),
                  AppTheme.goldPrimary.withValues(alpha: 0.08),
                ],
              ),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: AppTheme.goldPrimary.withValues(alpha: 0.35)),
            ),
            child: Row(
              children: [
                const Icon(Icons.auto_stories_rounded, color: AppTheme.goldPrimary, size: 28),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Continuar leitura',
                        style: TextStyle(
                          color: AppTheme.goldLight,
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                          letterSpacing: 1.1,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        '$name ${last.chapterNumber}',
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: FontWeight.w600,
                          fontFamily: 'serif',
                        ),
                      ),
                      Text(
                        last.translationId,
                        style: const TextStyle(color: AppTheme.textMuted, fontSize: 12),
                      ),
                    ],
                  ),
                ),
                const Icon(Icons.arrow_forward_ios_rounded, color: AppTheme.goldPrimary, size: 16),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildEmptyDownloadCard() {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: AppTheme.goldPrimary.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppTheme.goldPrimary.withValues(alpha: 0.28)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Baixe Gênesis para ler sem internet',
            style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w600, fontFamily: 'serif'),
          ),
          const SizedBox(height: 6),
          const Text(
            'Um livro de cada vez. NVI, ARC e ARA costumam baixar melhor — nem todas as 10 traduções estão sempre disponíveis.',
            style: TextStyle(color: AppTheme.textSecondary, fontSize: 13, height: 1.4),
          ),
          const SizedBox(height: 14),
          SizedBox(
            height: 48,
            width: double.infinity,
            child: _downloadingBook == 1
                ? Column(
                    children: [
                      LinearProgressIndicator(
                        value: _downloadProgress > 0 ? _downloadProgress : null,
                        color: AppTheme.goldPrimary,
                        backgroundColor: Colors.white12,
                      ),
                      const SizedBox(height: 6),
                      Text(
                        'Baixando Gênesis ${(_downloadProgress * 100).clamp(0, 100).toStringAsFixed(0)}%',
                        style: const TextStyle(color: AppTheme.textMuted, fontSize: 11),
                      ),
                    ],
                  )
                : ElevatedButton(
                    onPressed: _downloadingBook != null
                        ? null
                        : () async {
                            await _downloadBook(1, 'Gênesis');
                            if (!mounted) return;
                            final chapters = await BibleOfflineService.instance
                                .getDownloadedChapterNumbers(_selectedTranslation, 1);
                            if (chapters.contains(1)) {
                              _openChapter(1, 1);
                            }
                          },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.goldPrimary,
                      foregroundColor: Colors.white,
                    ),
                    child: const Text('Baixar Gênesis'),
                  ),
          ),
        ],
      ),
    );
  }

  Widget _buildBookTile(Map<String, dynamic> book) {
    final number = book['number'] as int;
    final name = book['name'] as String;
    final abbr = book['abbr'] as String;
    final chapters = book['chapters'] as int;
    final downloaded = _status[number] ?? 0;
    final isSelected = _selectedBook == number;
    final complete = downloaded >= chapters;

    return Padding(
      padding: const EdgeInsets.only(bottom: 4),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () => _selectBook(number),
          borderRadius: BorderRadius.circular(10),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
            decoration: BoxDecoration(
              color: isSelected ? AppTheme.goldPrimary.withValues(alpha: 0.1) : Colors.transparent,
              borderRadius: BorderRadius.circular(10),
              border: isSelected
                  ? Border.all(color: AppTheme.goldPrimary.withValues(alpha: 0.3))
                  : null,
            ),
            child: Column(
              children: [
                Row(
                  children: [
                    Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: complete
                            ? AppTheme.goldPrimary.withValues(alpha: 0.2)
                            : Colors.white.withValues(alpha: 0.05),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Center(
                        child: Text(
                          abbr.toUpperCase(),
                          style: TextStyle(
                            color: complete ? AppTheme.goldPrimary : AppTheme.textSecondary,
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            name,
                            style: TextStyle(
                              color: isSelected ? Colors.white : AppTheme.textPrimary,
                              fontSize: 15,
                              fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                            ),
                          ),
                          Text(
                            complete
                                ? '$chapters capítulos baixados'
                                : downloaded > 0
                                    ? '$downloaded/$chapters baixados'
                                    : '$chapters capítulos — não baixado',
                            style: const TextStyle(color: AppTheme.textMuted, fontSize: 12),
                          ),
                        ],
                      ),
                    ),
                    Icon(
                      isSelected ? Icons.keyboard_arrow_up : Icons.keyboard_arrow_right,
                      color: isSelected ? AppTheme.goldPrimary : AppTheme.textMuted,
                    ),
                  ],
                ),
                if (isSelected) ...[
                  const SizedBox(height: 12),
                  if (!complete)
                    Padding(
                      padding: const EdgeInsets.only(bottom: 12),
                      child: SizedBox(
                        width: double.infinity,
                        height: 44,
                        child: _downloadingBook == number
                            ? Column(
                                children: [
                                  LinearProgressIndicator(
                                    value: _downloadProgress > 0 ? _downloadProgress : null,
                                    color: AppTheme.goldPrimary,
                                    backgroundColor: Colors.white12,
                                  ),
                                  const SizedBox(height: 6),
                                  Text(
                                    'Baixando ${( _downloadProgress * 100).clamp(0, 100).toStringAsFixed(0)}%',
                                    style: const TextStyle(color: AppTheme.textMuted, fontSize: 11),
                                  ),
                                ],
                              )
                            : OutlinedButton.icon(
                                onPressed: _downloadingBook != null ? null : () => _downloadBook(number, name),
                                icon: const Icon(Icons.download_rounded, size: 18),
                                label: const Text('Baixar para ler offline'),
                                style: OutlinedButton.styleFrom(
                                  foregroundColor: AppTheme.goldPrimary,
                                  side: BorderSide(color: AppTheme.goldPrimary.withValues(alpha: 0.5)),
                                ),
                              ),
                      ),
                    ),
                  Wrap(
                    spacing: 6,
                    runSpacing: 6,
                    children: List.generate(chapters, (i) {
                      final cap = i + 1;
                      final has = _selectedBookChapters.contains(cap);
                      return InkWell(
                        onTap: () => _openChapter(number, cap),
                        child: Container(
                          width: 40,
                          height: 36,
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                            color: has
                                ? AppTheme.goldPrimary.withValues(alpha: 0.18)
                                : Colors.white.withValues(alpha: 0.05),
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(
                              color: has
                                  ? AppTheme.goldPrimary.withValues(alpha: 0.4)
                                  : Colors.white.withValues(alpha: 0.08),
                            ),
                          ),
                          child: Text(
                            '$cap',
                            style: TextStyle(
                              color: has ? AppTheme.goldPrimary : AppTheme.textMuted,
                              fontSize: 13,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      );
                    }),
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}
