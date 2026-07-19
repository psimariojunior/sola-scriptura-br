import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../models/favorite.dart';
import '../services/biblia_service.dart';
import '../services/favorites_service.dart';
import '../widgets/empty_state.dart';
import '../widgets/loading_shimmer.dart';

class FavoritesScreen extends StatefulWidget {
  const FavoritesScreen({super.key});

  @override
  State<FavoritesScreen> createState() => _FavoritesScreenState();
}

class _FavoritesScreenState extends State<FavoritesScreen> {
  final FavoritesService _service = FavoritesService();
  List<Favorite> _favoritos = [];
  bool _carregando = true;

  @override
  void initState() {
    super.initState();
    _carregar();
  }

  Future<void> _carregar() async {
    setState(() => _carregando = true);
    final list = await _service.getAll();
    if (!mounted) return;
    setState(() {
      _favoritos = list;
      _carregando = false;
    });
  }

  String _nomeLivro(String abrev) {
    for (final l in BibliaService.livros) {
      if (l.abreviacao == abrev) return l.nome;
    }
    return abrev;
  }

  Future<void> _remover(Favorite fav) async {
    await _service.remove(
      livro: fav.livro,
      capitulo: fav.capitulo,
      versiculo: fav.versiculo,
      traducao: fav.traducao,
    );
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Removido dos favoritos')),
    );
    _carregar();
  }

  Map<String, List<Favorite>> get _agrupadoPorLivro {
    final map = <String, List<Favorite>>{};
    for (final f in _favoritos) {
      map.putIfAbsent(f.livro, () => []).add(f);
    }
    return map;
  }

  void _abrir(Favorite fav) {
    context.push('/biblia/${fav.livro}/${fav.capitulo}');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Favoritos'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            tooltip: 'Atualizar',
            onPressed: _carregar,
          ),
        ],
      ),
      body: _buildBody(),
    );
  }

  Widget _buildBody() {
    if (_carregando) {
      return ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          CardShimmer(count: 6, height: 60),
        ],
      );
    }

    if (_favoritos.isEmpty) {
      return const EmptyState(
        icon: Icons.favorite_border,
        title: 'Nenhum favorito ainda',
        message:
            'Toque no icone de coracao na leitura da Biblia para favoritar versiculos.',
      );
    }

    final agrupado = _agrupadoPorLivro;
    final livros = agrupado.keys.toList();

    return RefreshIndicator(
      onRefresh: _carregar,
      child: ListView.builder(
        padding: const EdgeInsets.fromLTRB(12, 8, 12, 16),
        itemCount: livros.length,
        itemBuilder: (context, idx) {
          final livroAbrev = livros[idx];
          final versiculos = agrupado[livroAbrev]!;
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(8, 16, 8, 6),
                child: Text(
                  _nomeLivro(livroAbrev).toUpperCase(),
                  style: Theme.of(context).textTheme.labelMedium?.copyWith(
                        fontWeight: FontWeight.w700,
                        letterSpacing: 0.5,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                ),
              ),
              ...versiculos.map((f) => _buildFavTile(f)),
            ],
          );
        },
      ),
    );
  }

  Widget _buildFavTile(Favorite fav) {
    final theme = Theme.of(context);

    return Dismissible(
      key: ValueKey('fav-${fav.livro}-${fav.capitulo}-${fav.versiculo}'),
      direction: DismissDirection.endToStart,
      background: Container(
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.only(right: 24),
        margin: const EdgeInsets.symmetric(horizontal: 4, vertical: 4),
        decoration: BoxDecoration(
          color: theme.colorScheme.error,
          borderRadius: BorderRadius.circular(14),
        ),
        child: const Icon(Icons.delete, color: Colors.white),
      ),
      onDismissed: (_) => _remover(fav),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 4),
        child: Material(
          color: Colors.transparent,
          borderRadius: BorderRadius.circular(14),
          child: InkWell(
            onTap: () => _abrir(fav),
            borderRadius: BorderRadius.circular(14),
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: theme.colorScheme.surface,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(
                  color: theme.colorScheme.outline.withValues(alpha: 0.25),
                ),
              ),
              child: Row(
                children: [
                  Container(
                    width: 40,
                    height: 40,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      color:
                          theme.colorScheme.error.withValues(alpha: 0.12),
                      shape: BoxShape.circle,
                    ),
                    child: Icon(
                      Icons.favorite,
                      size: 20,
                      color: theme.colorScheme.error,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Capitulo ${fav.capitulo} : ${fav.versiculo}',
                          style: theme.textTheme.titleSmall?.copyWith(
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          'Traducao: ${fav.traducao.toUpperCase()}',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Icon(
                    Icons.chevron_right,
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
