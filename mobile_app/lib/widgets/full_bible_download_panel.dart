import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../data/bible_books.dart';
import '../services/bible_offline_service.dart';

class FullBibleDownloadPanel extends StatelessWidget {
  final String translationId;
  final Map<int, int> bookStatus;
  final bool busy;

  const FullBibleDownloadPanel({
    super.key,
    required this.translationId,
    required this.bookStatus,
    this.busy = false,
  });

  int get _chaptersGot {
    var n = 0;
    for (final book in BibleBooks.allBooks) {
      final max = book['chapters'] as int;
      final got = bookStatus[book['number'] as int] ?? 0;
      n += got > max ? max : got;
    }
    return n;
  }

  int get _booksGot {
    return BibleBooks.allBooks.where((b) {
      return (bookStatus[b['number'] as int] ?? 0) >= (b['chapters'] as int);
    }).length;
  }

  bool get _complete => _booksGot >= BibleBooks.allBooks.length;

  @override
  Widget build(BuildContext context) {
    final svc = BibleOfflineService.instance;
    return ValueListenableBuilder<BibleDownloadSnapshot?>(
      valueListenable: svc.jobNotifier,
      builder: (context, job, _) {
        final relevant = job != null &&
            job.translationId == translationId &&
            job.mode == BibleDownloadMode.all &&
            job.status != 'idle';
        final snapshot = relevant ? job : null;
        final local = BibleOfflineService.isLocalSiteTranslation(translationId);
        final bytes = BibleOfflineService.estimatedBytesFor(translationId);
        final sizeLabel = BibleOfflineService.formatBytes(bytes);
        final totalCh = BibleBooks.totalChapters;
        final got = snapshot?.chaptersDone ?? _chaptersGot;
        final books = snapshot?.booksDone ?? _booksGot;

        return Container(
          margin: const EdgeInsets.fromLTRB(16, 8, 16, 4),
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: AppTheme.goldPrimary.withValues(alpha: 0.08),
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: AppTheme.goldPrimary.withValues(alpha: 0.28)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                _complete
                    ? '$translationId completa no aparelho'
                    : 'Baixar $translationId completa',
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  fontFamily: 'serif',
                ),
              ),
              const SizedBox(height: 4),
              Text(
                local
                    ? '$sizeLabel · 66 livros · $totalCh capítulos. Texto do site (não depende da Midvash).'
                    : '$sizeLabel estimado · 66 livros · $totalCh capítulos. Esta versão usa a rede; NVI, ARC e ARA são as mais estáveis.',
                style: const TextStyle(color: AppTheme.textSecondary, fontSize: 12, height: 1.4),
              ),
              const SizedBox(height: 8),
              Text(
                '$books/66 livros · $got/$totalCh capítulos',
                style: const TextStyle(color: AppTheme.goldLight, fontSize: 12, fontWeight: FontWeight.w600),
              ),
              if (snapshot != null && snapshot.status != 'done') ...[
                const SizedBox(height: 10),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: snapshot.status == 'running' && snapshot.progress > 0
                        ? snapshot.progress
                        : snapshot.progress > 0
                            ? snapshot.progress
                            : null,
                    color: AppTheme.goldPrimary,
                    backgroundColor: Colors.white12,
                    minHeight: 5,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  snapshot.status == 'running'
                      ? 'Baixando ${snapshot.currentBook} · ${(snapshot.progress * 100).clamp(0, 100).toStringAsFixed(0)}%'
                      : snapshot.status == 'paused'
                          ? 'Pausado em ${snapshot.currentBook.isEmpty ? translationId : snapshot.currentBook}'
                          : snapshot.error ?? 'Erro no download',
                  style: TextStyle(
                    color: snapshot.status == 'error' ? const Color(0xFFFBBF24) : AppTheme.textMuted,
                    fontSize: 12,
                    height: 1.35,
                  ),
                ),
              ],
              const SizedBox(height: 12),
              _buildActions(context, snapshot, svc),
            ],
          ),
        );
      },
    );
  }

  Widget _buildActions(BuildContext context, BibleDownloadSnapshot? snapshot, BibleOfflineService svc) {
    if (_complete) {
      return const SizedBox.shrink();
    }
    final running = snapshot?.status == 'running' || (busy && snapshot == null);
    final paused = snapshot?.status == 'paused';
    final errored = snapshot?.status == 'error';

    if (running) {
      return SizedBox(
        width: double.infinity,
        height: 44,
        child: OutlinedButton.icon(
          onPressed: svc.pauseDownload,
          icon: const Icon(Icons.pause_rounded, size: 18),
          label: const Text('Pausar'),
          style: OutlinedButton.styleFrom(
            foregroundColor: AppTheme.goldPrimary,
            side: BorderSide(color: AppTheme.goldPrimary.withValues(alpha: 0.5)),
          ),
        ),
      );
    }

    if (paused || errored) {
      return Row(
        children: [
          Expanded(
            child: SizedBox(
              height: 44,
              child: ElevatedButton.icon(
                onPressed: () => svc.retryDownload(),
                icon: Icon(errored ? Icons.refresh_rounded : Icons.play_arrow_rounded, size: 18),
                label: Text(errored ? 'Tentar de novo' : 'Continuar'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.goldPrimary,
                  foregroundColor: Colors.white,
                ),
              ),
            ),
          ),
        ],
      );
    }

    return SizedBox(
      width: double.infinity,
      height: 48,
      child: ElevatedButton.icon(
        onPressed: busy ? null : () => svc.downloadAll(translationId),
        icon: const Icon(Icons.download_rounded, size: 18),
        label: Text('Baixar $translationId completa'),
        style: ElevatedButton.styleFrom(
          backgroundColor: AppTheme.goldPrimary,
          foregroundColor: Colors.white,
        ),
      ),
    );
  }
}
