import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../data/bible_books.dart';
import '../services/bible_offline_service.dart';
import 'native_bible_screen.dart';

class OfflineTranslationsScreen extends StatefulWidget {
  const OfflineTranslationsScreen({super.key});

  @override
  State<OfflineTranslationsScreen> createState() => _OfflineTranslationsScreenState();
}

class _OfflineTranslationsScreenState extends State<OfflineTranslationsScreen> {
  final BibleOfflineService _offlineService = BibleOfflineService.instance;
  String _selectedTranslation = 'ARC';
  Map<int, int> _bookStatus = {};
  bool _isLoading = true;
  bool _isDownloading = false;
  String? _downloadingBook;
  double _downloadProgress = 0;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    setState(() => _isLoading = true);
    try {
      final bookStatus = await _offlineService.getBookDownloadStatus(_selectedTranslation);
      if (mounted) {
        setState(() {
          _bookStatus = bookStatus;
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  Future<void> _downloadBook(int bookNumber, String bookName) async {
    setState(() {
      _isDownloading = true;
      _downloadingBook = bookName;
      _downloadProgress = 0;
    });

    try {
      await _offlineService.downloadBook(
        _selectedTranslation,
        bookNumber,
        onProgress: (progress) {
          if (mounted) setState(() => _downloadProgress = progress);
        },
      );

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('$bookName baixado!'),
            backgroundColor: AppTheme.goldPrimary,
            duration: const Duration(seconds: 1),
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Erro: $e'), backgroundColor: AppTheme.error),
        );
      }
    } finally {
      setState(() {
        _isDownloading = false;
        _downloadingBook = null;
        _downloadProgress = 0;
      });
      await _loadData();
    }
  }

  Future<void> _deleteBook(int bookNumber, String bookName) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.surfaceLight,
        title: Text('Remover $bookName?', style: const TextStyle(color: Colors.white)),
        content: const Text(
          'Todos os capítulos deste livro serão removidos.',
          style: TextStyle(color: Colors.white70),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Cancelar')),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Remover', style: TextStyle(color: AppTheme.error)),
          ),
        ],
      ),
    );

    if (confirm == true) {
      await _offlineService.deleteBook(_selectedTranslation, bookNumber);
      await _loadData();
    }
  }

  Future<void> _downloadTestament(bool isOld) async {
    final testamentName = isOld ? 'Antigo Testamento' : 'Novo Testamento';

    setState(() {
      _isDownloading = true;
      _downloadingBook = testamentName;
      _downloadProgress = 0;
    });

    try {
      await _offlineService.downloadTestament(
        _selectedTranslation,
        isOld,
        onProgress: (progress, bookName) {
          if (mounted) {
            setState(() {
              _downloadProgress = progress;
              _downloadingBook = '$testamentName — $bookName';
            });
          }
        },
      );

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('$testamentName baixado!'), backgroundColor: AppTheme.goldPrimary),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Erro: $e'), backgroundColor: AppTheme.error),
        );
      }
    } finally {
      setState(() {
        _isDownloading = false;
        _downloadingBook = null;
      });
      await _loadData();
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        backgroundColor: AppTheme.bgDark,
        body: Center(child: CircularProgressIndicator(color: AppTheme.goldPrimary)),
      );
    }

    return Scaffold(
      backgroundColor: AppTheme.bgDark,
      appBar: AppBar(
        backgroundColor: AppTheme.bgDark,
        title: const Text('Bíblia Offline', style: TextStyle(color: Colors.white, fontSize: 18)),
        iconTheme: const IconThemeData(color: AppTheme.goldPrimary),
        actions: [
          if (_isDownloading)
            Padding(
              padding: const EdgeInsets.only(right: 16),
              child: Center(
                child: Text(
                  '${(_downloadProgress * 100).toInt()}%',
                  style: const TextStyle(color: AppTheme.goldPrimary, fontWeight: FontWeight.bold),
                ),
              ),
            ),
        ],
      ),
      body: Column(
        children: [
          _buildTranslationSelector(),
          if (_isDownloading) _buildDownloadProgress(),
          _buildTestamentActions(),
          Expanded(child: _buildBooksGrid()),
        ],
      ),
    );
  }

  Widget _buildTranslationSelector() {
    return Container(
      height: 48,
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: BibleOfflineService.availableTranslations.length,
        itemBuilder: (context, index) {
          final t = BibleOfflineService.availableTranslations[index];
          final isSelected = t['id'] == _selectedTranslation;
          return Padding(
            padding: const EdgeInsets.only(right: 8),
            child: ChoiceChip(
              label: Text(t['abbreviation']!, style: TextStyle(
                color: isSelected ? Colors.white : AppTheme.textMuted,
                fontSize: 12,
                fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
              )),
              selected: isSelected,
              selectedColor: AppTheme.goldPrimary,
              backgroundColor: AppTheme.surfaceLight,
              onSelected: (selected) {
                if (selected) {
                  setState(() => _selectedTranslation = t['id']!);
                  _loadData();
                }
              },
            ),
          );
        },
      ),
    );
  }

  Widget _buildDownloadProgress() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.goldPrimary.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.goldPrimary.withValues(alpha: 0.3)),
      ),
      child: Column(
        children: [
          Row(
            children: [
              const SizedBox(
                width: 16,
                height: 16,
                child: CircularProgressIndicator(strokeWidth: 2, color: AppTheme.goldPrimary),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  _downloadingBook ?? 'Baixando...',
                  style: const TextStyle(color: Colors.white, fontSize: 13),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              Text(
                '${(_downloadProgress * 100).toInt()}%',
                style: const TextStyle(color: AppTheme.goldPrimary, fontWeight: FontWeight.bold, fontSize: 13),
              ),
            ],
          ),
          const SizedBox(height: 8),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: _downloadProgress,
              backgroundColor: Colors.white.withValues(alpha: 0.1),
              valueColor: const AlwaysStoppedAnimation<Color>(AppTheme.goldPrimary),
              minHeight: 4,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTestamentActions() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      child: Row(
        children: [
          Expanded(
            child: _buildTestamentButton('Antigo Testamento', true),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: _buildTestamentButton('Novo Testamento', false),
          ),
        ],
      ),
    );
  }

  Widget _buildTestamentButton(String label, bool isOld) {
    final books = isOld ? BibleBooks.oldTestament : BibleBooks.newTestament;
    final downloaded = books.where((b) {
      final count = _bookStatus[b['number'] as int] ?? 0;
      return count >= (b['chapters'] as int);
    }).length;
    final total = books.length;

    return GestureDetector(
      onTap: _isDownloading ? null : () => _downloadTestament(isOld),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 12),
        decoration: BoxDecoration(
          color: downloaded == total
              ? AppTheme.goldPrimary.withValues(alpha: 0.15)
              : AppTheme.surfaceLight,
          borderRadius: BorderRadius.circular(10),
          border: Border.all(
            color: downloaded == total
                ? AppTheme.goldPrimary.withValues(alpha: 0.3)
                : Colors.white.withValues(alpha: 0.05),
          ),
        ),
        child: Column(
          children: [
            Text(
              label,
              style: TextStyle(
                color: downloaded == total ? AppTheme.goldPrimary : Colors.white,
                fontSize: 11,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              '$downloaded/$total',
              style: TextStyle(
                color: downloaded == total ? AppTheme.goldPrimary : AppTheme.textMuted,
                fontSize: 10,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBooksGrid() {
    return CustomScrollView(
      slivers: [
        // AT books
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 4),
            child: Text(
              'ANTIGO TESTAMENTO',
              style: TextStyle(
                color: AppTheme.goldPrimary,
                fontSize: 11,
                fontWeight: FontWeight.bold,
                letterSpacing: 1,
              ),
            ),
          ),
        ),
        SliverPadding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          sliver: SliverGrid(
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 4,
              childAspectRatio: 0.85,
              crossAxisSpacing: 8,
              mainAxisSpacing: 8,
            ),
            delegate: SliverChildBuilderDelegate(
              (context, index) => _buildBookCard(BibleBooks.oldTestament[index]),
              childCount: BibleBooks.oldTestament.length,
            ),
          ),
        ),
        // NT books
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 4),
            child: Text(
              'NOVO TESTAMENTO',
              style: TextStyle(
                color: AppTheme.goldPrimary,
                fontSize: 11,
                fontWeight: FontWeight.bold,
                letterSpacing: 1,
              ),
            ),
          ),
        ),
        SliverPadding(
          padding: const EdgeInsets.fromLTRB(16, 0, 16, 32),
          sliver: SliverGrid(
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 4,
              childAspectRatio: 0.85,
              crossAxisSpacing: 8,
              mainAxisSpacing: 8,
            ),
            delegate: SliverChildBuilderDelegate(
              (context, index) => _buildBookCard(BibleBooks.newTestament[index]),
              childCount: BibleBooks.newTestament.length,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildBookCard(Map<String, dynamic> book) {
    final bookNumber = book['number'] as int;
    final bookName = book['name'] as String;
    final totalChapters = book['chapters'] as int;
    final downloadedChapters = _bookStatus[bookNumber] ?? 0;
    final isComplete = downloadedChapters >= totalChapters;
    final hasPartial = downloadedChapters > 0 && !isComplete;

    return GestureDetector(
      onTap: _isDownloading
          ? null
          : isComplete
              ? () => Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (_) => NativeBibleScreen(
                        translation: _selectedTranslation,
                        initialBook: bookNumber,
                      ),
                    ),
                  )
              : () => _downloadBook(bookNumber, bookName),
      onLongPress: isComplete ? () => _deleteBook(bookNumber, bookName) : null,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        decoration: BoxDecoration(
          color: isComplete
              ? AppTheme.goldPrimary.withValues(alpha: 0.15)
              : hasPartial
                  ? AppTheme.goldPrimary.withValues(alpha: 0.08)
                  : AppTheme.surfaceLight,
          borderRadius: BorderRadius.circular(10),
          border: Border.all(
            color: isComplete
                ? AppTheme.goldPrimary.withValues(alpha: 0.4)
                : hasPartial
                    ? AppTheme.goldPrimary.withValues(alpha: 0.2)
                    : Colors.white.withValues(alpha: 0.05),
            width: isComplete ? 1.5 : 0.5,
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (isComplete)
              Icon(Icons.check_circle, color: AppTheme.goldPrimary, size: 20)
            else if (hasPartial)
              SizedBox(
                width: 20,
                height: 20,
                child: CircularProgressIndicator(
                  value: downloadedChapters / totalChapters,
                  strokeWidth: 2,
                  color: AppTheme.goldPrimary,
                  backgroundColor: Colors.white.withValues(alpha: 0.1),
                ),
              )
            else
              Icon(Icons.cloud_download_outlined, color: AppTheme.textMuted, size: 20),
            const SizedBox(height: 6),
            Text(
              bookName,
              style: TextStyle(
                color: isComplete ? Colors.white : AppTheme.textSecondary,
                fontSize: 10,
                fontWeight: isComplete ? FontWeight.w600 : FontWeight.normal,
              ),
              textAlign: TextAlign.center,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            const SizedBox(height: 2),
            Text(
              '$downloadedChapters/$totalChapters',
              style: TextStyle(
                color: isComplete ? AppTheme.goldPrimary : AppTheme.textMuted,
                fontSize: 9,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
