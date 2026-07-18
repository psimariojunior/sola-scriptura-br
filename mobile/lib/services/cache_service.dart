import 'dart:convert';

import '../database/database_helper.dart';

class CacheService {
  static CacheService? _instance;
  final DatabaseHelper _db = DatabaseHelper();

  CacheService._();

  factory CacheService() {
    _instance ??= CacheService._();
    return _instance!;
  }

  // --- Versiculos (7 dias) ---
  Future<void> cacheVersiculos({
    required String livro,
    required int capitulo,
    required String traducao,
    required List<Map<String, dynamic>> versiculos,
  }) async {
    final now = DateTime.now().millisecondsSinceEpoch;
    final items = versiculos.map((v) {
      return {
        'livro': livro,
        'capitulo': capitulo,
        'versiculo': v['numero'] ?? v['verse'] ?? 0,
        'texto': v['texto'] ?? v['text'] ?? '',
        'traducao': traducao,
        'cached_at': now,
      };
    }).toList();
    await _db.insertBatch('versiculos', items);
  }

  Future<List<Map<String, dynamic>>> getCachedVersiculos({
    required String livro,
    required int capitulo,
    required String traducao,
  }) async {
    final cutoff = DateTime.now().millisecondsSinceEpoch - _sevenDays;
    final rows = await _db.query(
      'versiculos',
      where: 'livro = ? AND capitulo = ? AND traducao = ? AND cached_at > ?',
      whereArgs: [livro, capitulo, traducao, cutoff],
      orderBy: 'versiculo ASC',
    );
    return rows;
  }

  // --- Livros (30 dias) ---
  Future<void> cacheLivros(List<Map<String, dynamic>> livros) async {
    final now = DateTime.now().millisecondsSinceEpoch;
    final items = livros.map((l) => {
      ...l,
      'cached_at': now,
    }).toList();
    await _db.insertBatch('livros', items);
  }

  Future<List<Map<String, dynamic>>> getCachedLivros() async {
    final cutoff = DateTime.now().millisecondsSinceEpoch - _thirtyDays;
    return await _db.query(
      'livros',
      where: 'cached_at > ?',
      whereArgs: [cutoff],
      orderBy: 'ordem ASC',
    );
  }

  // --- Comentarios (7 dias) ---
  Future<void> cacheComentarios({
    required String referencia,
    required List<Map<String, dynamic>> comentarios,
  }) async {
    final now = DateTime.now().millisecondsSinceEpoch;
    final items = comentarios.map((c) => {
      'referencia': referencia,
      'autor': c['autor'] ?? c['author'] ?? '',
      'conteudo': c['texto'] ?? c['text'] ?? '',
      'fonte': c['fonte'] ?? c['source'],
      'cached_at': now,
    }).toList();
    await _db.insertBatch('comentarios', items);
  }

  Future<List<Map<String, dynamic>>> getCachedComentarios(String referencia) async {
    final cutoff = DateTime.now().millisecondsSinceEpoch - _sevenDays;
    return await _db.query(
      'comentarios',
      where: 'referencia = ? AND cached_at > ?',
      whereArgs: [referencia, cutoff],
    );
  }

  // --- Pesquisa (1 dia) ---
  Future<void> cachePesquisa(String query, List<Map<String, dynamic>> resultados) async {
    final now = DateTime.now().millisecondsSinceEpoch;
    final key = 'pesquisa:${query.toLowerCase().trim()}';
    final serialized = jsonEncode(resultados);
    await _db.insert('configuracoes', {
      'chave': 'cache_$key',
      'valor': serialized,
    });
    // Also store timestamp in historico_pesquisa
    await _db.insert('historico_pesquisa', {
      'query': query,
      'timestamp': now,
    });
  }

  Future<List<Map<String, dynamic>>?> getCachedPesquisa(String query) async {
    final key = 'pesquisa:${query.toLowerCase().trim()}';
    final rows = await _db.query(
      'configuracoes',
      where: 'chave = ?',
      whereArgs: ['cache_$key'],
    );
    if (rows.isEmpty) return null;
    try {
      final data = jsonDecode(rows.first['valor'] as String) as List;
      return List<Map<String, dynamic>>.from(data);
    } catch (_) {
      return null;
    }
  }

  // --- Favoritos (offline queue) ---
  Future<void> addFavorito(String versiculoRef, {String? nota}) async {
    await _db.insert('favoritos', {
      'versiculo_ref': versiculoRef,
      'nota': nota,
      'criado_em': DateTime.now().millisecondsSinceEpoch,
      'sincronizado': 0,
    });
  }

  Future<void> removeFavorito(String versiculoRef) async {
    await _db.delete(
      'favoritos',
      where: 'versiculo_ref = ?',
      whereArgs: [versiculoRef],
    );
  }

  Future<List<Map<String, dynamic>>> getFavoritosPendentes() async {
    return await _db.query(
      'favoritos',
      where: 'sincronizado = 0',
    );
  }

  Future<void> marcarFavoritoSincronizado(String versiculoRef) async {
    await _db.update(
      'favoritos',
      {'sincronizado': 1},
      where: 'versiculo_ref = ?',
      whereArgs: [versiculoRef],
    );
  }

  // --- Notas (offline queue) ---
  Future<void> addNota({
    required String versiculoRef,
    required String conteudo,
  }) async {
    final now = DateTime.now().millisecondsSinceEpoch;
    await _db.insert('notas', {
      'versiculo_ref': versiculoRef,
      'conteudo': conteudo,
      'criado_em': now,
      'atualizado_em': now,
      'sincronizado': 0,
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  Future<void> updateNota({
    required String versiculoRef,
    required String conteudo,
  }) async {
    await _db.update(
      'notas',
      {
        'conteudo': conteudo,
        'atualizado_em': DateTime.now().millisecondsSinceEpoch,
        'sincronizado': 0,
      },
      where: 'versiculo_ref = ?',
      whereArgs: [versiculoRef],
    );
  }

  Future<List<Map<String, dynamic>>> getNotasPendentes() async {
    return await _db.query(
      'notas',
      where: 'sincronizado = 0',
    );
  }

  Future<void> marcarNotaSincronizada(String versiculoRef) async {
    await _db.update(
      'notas',
      {'sincronizado': 1},
      where: 'versiculo_ref = ?',
      whereArgs: [versiculoRef],
    );
  }

  // --- Configuracoes ---
  Future<void> setPreferencia(String chave, String valor) async {
    await _db.insert('configuracoes', {
      'chave': chave,
      'valor': valor,
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  Future<String?> getPreferencia(String chave) async {
    final rows = await _db.query(
      'configuracoes',
      where: 'chave = ?',
      whereArgs: [chave],
    );
    if (rows.isEmpty) return null;
    return rows.first['valor'] as String?;
  }

  // --- Acoes pendentes (sync queue) ---
  Future<void> addAcaoPendente(String tipo, Map<String, dynamic> dados) async {
    await _db.insert('acoes_pendentes', {
      'tipo': tipo,
      'dados': jsonEncode(dados),
      'criado_em': DateTime.now().millisecondsSinceEpoch,
      'tentativas': 0,
    });
  }

  Future<List<Map<String, dynamic>>> getAcoesPendentes() async {
    return await _db.query(
      'acoes_pendentes',
      orderBy: 'criado_em ASC',
    );
  }

  Future<void> removeAcaoPendente(int id) async {
    await _db.delete('acoes_pendentes', where: 'id = ?', whereArgs: [id]);
  }

  Future<void> incrementarTentativa(int id) async {
    final rows = await _db.query(
      'acoes_pendentes',
      where: 'id = ?',
      whereArgs: [id],
    );
    if (rows.isNotEmpty) {
      final tentativas = (rows.first['tentativas'] as int? ?? 0) + 1;
      await _db.update(
        'acoes_pendentes',
        {'tentativas': tentativas},
        where: 'id = ?',
        whereArgs: [id],
      );
    }
  }

  // --- Limpeza ---
  Future<void> clearOldCache() async {
    await _db.clearOldCache('versiculos', olderThanMs: _sevenDays);
    await _db.clearOldCache('livros', olderThanMs: _thirtyDays);
    await _db.clearOldCache('historico_pesquisa', olderThanMs: _thirtyDays);
  }

  Future<void> clearAllCache() async {
    await _db.clearAllCache();
  }

  // Durations
  static const int _sevenDays = 7 * 24 * 60 * 60 * 1000;
  static const int _thirtyDays = 30 * 24 * 60 * 60 * 1000;
  static const int _oneDay = 24 * 60 * 60 * 1000;
}
