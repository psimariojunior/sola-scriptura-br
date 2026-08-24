import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../config/theme.dart';
import '../services/bible_offline_service.dart';

class NativeFavoritesScreen extends StatefulWidget {
  final Function(String verseRef)? onVerseTap;

  const NativeFavoritesScreen({super.key, this.onVerseTap});

  @override
  State<NativeFavoritesScreen> createState() => _NativeFavoritesScreenState();
}

class _NativeFavoritesScreenState extends State<NativeFavoritesScreen> {
  final BibleOfflineService _offlineService = BibleOfflineService.instance;
  List<Map<String, dynamic>> _favorites = [];
  bool _isLoading = true;
  String _filterColor = 'all';

  static const Map<String, Color> _colorMap = {
    '#A17A2C': AppTheme.goldPrimary,
    '#EF4444': Colors.red,
    '#3B82F6': Colors.blue,
    '#10B981': Colors.green,
    '#8B5CF6': Colors.purple,
    '#F59E0B': Colors.amber,
  };

  @override
  void initState() {
    super.initState();
    _loadFavorites();
  }

  Future<void> _loadFavorites() async {
    setState(() => _isLoading = true);
    try {
      final favorites = await _offlineService.getFavorites();
      if (mounted) {
        setState(() {
          _favorites = favorites;
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  Color _getColor(String? hexColor) {
    if (hexColor == null) return AppTheme.goldPrimary;
    return _colorMap[hexColor] ?? AppTheme.goldPrimary;
  }

  List<Map<String, dynamic>> get _filteredFavorites {
    if (_filterColor == 'all') return _favorites;
    return _favorites.where((f) => f['color'] == _filterColor).toList();
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Center(child: CircularProgressIndicator(color: AppTheme.goldPrimary));
    }

    return Column(
      children: [
        _buildHeader(),
        _buildColorFilter(),
        Expanded(
          child: _favorites.isEmpty
              ? _buildEmptyState()
              : _buildFavoritesList(),
        ),
      ],
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
      child: Row(
        children: [
          const Icon(Icons.favorite_rounded, color: AppTheme.goldPrimary, size: 24),
          const SizedBox(width: 10),
          Text(
            'Favoritos (${_favorites.length})',
            style: const TextStyle(
              color: Colors.white,
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildColorFilter() {
    return Container(
      height: 40,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: [
          _buildFilterChip('all', 'Todos', Colors.white),
          ..._colorMap.entries.map((e) => _buildFilterChip(e.key, '', e.value)),
        ],
      ),
    );
  }

  Widget _buildFilterChip(String value, String label, Color color) {
    final isSelected = _filterColor == value;
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: GestureDetector(
        onTap: () => setState(() => _filterColor = value),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          width: label.isEmpty ? 32 : null,
          height: 32,
          padding: EdgeInsets.symmetric(horizontal: label.isEmpty ? 0 : 12),
          decoration: BoxDecoration(
            color: isSelected ? color.withValues(alpha: 0.2) : Colors.white.withValues(alpha: 0.05),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: isSelected ? color : Colors.transparent,
              width: 1.5,
            ),
          ),
          child: label.isEmpty
              ? Center(
                  child: Container(
                    width: 14,
                    height: 14,
                    decoration: BoxDecoration(color: color, shape: BoxShape.circle),
                  ),
                )
              : Center(
                  child: Text(
                    label,
                    style: TextStyle(
                      color: isSelected ? color : AppTheme.textSecondary,
                      fontSize: 12,
                      fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                    ),
                  ),
                ),
        ),
      ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.favorite_border, color: AppTheme.textMuted, size: 64),
          const SizedBox(height: 16),
          Text(
            'Nenhum favorito ainda',
            style: TextStyle(color: AppTheme.textSecondary, fontSize: 16),
          ),
          const SizedBox(height: 8),
          Text(
            'Toque no ícone de coração\ndentro da Bíblia para salvar',
            textAlign: TextAlign.center,
            style: TextStyle(color: AppTheme.textMuted, fontSize: 13),
          ),
        ],
      ),
    );
  }

  Widget _buildFavoritesList() {
    final filtered = _filteredFavorites;
    return ListView.builder(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      itemCount: filtered.length,
      itemBuilder: (context, index) {
        final fav = filtered[index];
        return _buildFavoriteCard(fav);
      },
    );
  }

  Widget _buildFavoriteCard(Map<String, dynamic> fav) {
    final color = _getColor(fav['color']);
    return Dismissible(
      key: Key(fav['id']),
      direction: DismissDirection.endToStart,
      background: Container(
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.only(right: 20),
        margin: const EdgeInsets.only(bottom: 8),
        decoration: BoxDecoration(
          color: AppTheme.error,
          borderRadius: BorderRadius.circular(12),
        ),
        child: const Icon(Icons.delete_outline, color: Colors.white),
      ),
      onDismissed: (direction) async {
        await _offlineService.removeFavorite(fav['id']);
        await _loadFavorites();
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Removido dos favoritos')),
          );
        }
      },
      child: GestureDetector(
        onTap: () {
          widget.onVerseTap?.call(fav['reference']);
        },
        onLongPress: () {
          _showCopyDialog(fav);
        },
        child: Container(
          margin: const EdgeInsets.only(bottom: 8),
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.04),
            borderRadius: BorderRadius.circular(12),
            border: Border(
              left: BorderSide(color: color, width: 3),
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Icon(Icons.bookmark, color: color, size: 14),
                  const SizedBox(width: 6),
                  Text(
                    fav['reference'] ?? '',
                    style: TextStyle(
                      color: color,
                      fontSize: 13,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const Spacer(),
                  Text(
                    _formatDate(fav['created_at']),
                    style: TextStyle(color: AppTheme.textMuted, fontSize: 11),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                fav['text'] ?? '',
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 14,
                  height: 1.5,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showCopyDialog(Map<String, dynamic> fav) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppTheme.surfaceLight,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (context) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.copy, color: AppTheme.goldPrimary),
              title: const Text('Copiar texto', style: TextStyle(color: Colors.white)),
              onTap: () {
                Clipboard.setData(ClipboardData(text: '${fav['reference']}\n${fav['text']}'));
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Copiado!')),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.share, color: AppTheme.goldPrimary),
              title: const Text('Compartilhar', style: TextStyle(color: Colors.white)),
              onTap: () {
                Navigator.pop(context);
              },
            ),
            ListTile(
              leading: const Icon(Icons.delete_outline, color: Colors.red),
              title: const Text('Remover', style: TextStyle(color: Colors.red)),
              onTap: () async {
                Navigator.pop(context);
                await _offlineService.removeFavorite(fav['id']);
                await _loadFavorites();
              },
            ),
          ],
        ),
      ),
    );
  }

  String _formatDate(String? dateStr) {
    if (dateStr == null) return '';
    try {
      final date = DateTime.parse(dateStr);
      final now = DateTime.now();
      final diff = now.difference(date);
      if (diff.inDays == 0) return 'Hoje';
      if (diff.inDays == 1) return 'Ontem';
      if (diff.inDays < 7) return '${diff.inDays} dias atrás';
      return '${date.day}/${date.month}/${date.year}';
    } catch (e) {
      return '';
    }
  }
}
