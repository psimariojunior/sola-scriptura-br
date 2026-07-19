import 'package:flutter/material.dart';

import '../../models/estudo.dart';
import '../../models/livro.dart';
import '../../services/biblia_service.dart';
import '../../services/estudos_service.dart';
import '../../widgets/empty_state.dart';
import 'estudo_detail_screen.dart';
import 'manuais_screen.dart';

class EstudosScreen extends StatefulWidget {
  const EstudosScreen({super.key});

  @override
  State<EstudosScreen> createState() => _EstudosScreenState();
}

class _EstudosScreenState extends State<EstudosScreen>
    with SingleTickerProviderStateMixin {
  final EstudosService _service = EstudosService();
  late TabController _tabController;
  String _busca = '';
  List<Estudo> _estudos = [];
  List<Estudo> _estudosFiltrados = [];
  Map<String, bool> _progressoLeitura = {};

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _estudos = _service.getEstudos();
    _aplicarFiltro();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _aplicarFiltro() {
    if (_busca.isEmpty) {
      _estudosFiltrados = List.from(_estudos);
    } else {
      final lower = _busca.toLowerCase();
      _estudosFiltrados = _estudos.where((e) {
        return e.titulo.toLowerCase().contains(lower) ||
            e.autor.toLowerCase().contains(lower);
      }).toList();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Estudos'),
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Por Livro'),
            Tab(text: 'Manuais'),
            Tab(text: 'Salvos'),
          ],
        ),
      ),
      body: Column(
        children: [
          if (_tabController.index == 0) _buildBarraBusca(),
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildAbaLivros(),
                const ManuaisScreen(),
                _buildAbaSalvos(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBarraBusca() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
      child: TextField(
        decoration: InputDecoration(
          hintText: 'Buscar estudos...',
          prefixIcon: const Icon(Icons.search),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          contentPadding:
              const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        ),
        onChanged: (valor) {
          setState(() {
            _busca = valor;
            _aplicarFiltro();
          });
        },
      ),
    );
  }

  Widget _buildAbaLivros() {
    if (_estudosFiltrados.isEmpty) {
      return const EmptyState(
        icon: Icons.menu_book_outlined,
        title: 'Conteúdo não disponível',
        message: 'Tente buscar por outro termo.',
      );
    }
    return _buildGridLivros();
  }

  Widget _buildGridLivros() {
    final livros = BibliaService.livros;
    return GridView.builder(
      padding: const EdgeInsets.all(12),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 3,
        childAspectRatio: 1.8,
        crossAxisSpacing: 8,
        mainAxisSpacing: 8,
      ),
      itemCount: livros.length,
      itemBuilder: (context, index) {
        final livro = livros[index];
        final concluido = _progressoLeitura[livro.abreviacao] ?? false;
        return _buildCardLivro(livro, concluido);
      },
    );
  }

  Widget _buildCardLivro(Livro livro, bool concluido) {
    final theme = Theme.of(context);
    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: () => _abrirEstudoPorLivro(livro),
        child: Stack(
          children: [
            Padding(
              padding: const EdgeInsets.all(8),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    livro.abreviacao.toUpperCase(),
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 13,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    livro.nome,
                    style: const TextStyle(fontSize: 10),
                    textAlign: TextAlign.center,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
            if (concluido)
              Positioned(
                top: 4,
                right: 4,
                child: Icon(
                  Icons.check_circle,
                  size: 16,
                  color: theme.colorScheme.primary,
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildAbaSalvos() {
    if (_estudos.isEmpty) {
      return const EmptyState(
        icon: Icons.bookmark_border,
        title: 'Conteúdo não disponível',
        message: 'Salve seus estudos favoritos para acessar rapidamente.',
      );
    }
    return ListView.builder(
      padding: const EdgeInsets.symmetric(vertical: 8),
      itemCount: _estudos.length,
      itemBuilder: (context, index) {
        final estudo = _estudos[index];
        return Card(
          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
          child: ListTile(
            leading: CircleAvatar(
              backgroundColor:
                  Theme.of(context).colorScheme.primaryContainer,
              child: Icon(
                Icons.bookmark,
                color: Theme.of(context).colorScheme.primary,
              ),
            ),
            title: Text(estudo.titulo),
            subtitle: Text(estudo.autor),
            trailing: const Icon(Icons.chevron_right),
            onTap: () => Navigator.push(
              context,
              MaterialPageRoute(
                builder: (_) => EstudoDetailScreen(estudo: estudo),
              ),
            ),
          ),
        );
      },
    );
  }

  void _abrirEstudoPorLivro(Livro livro) {
    final estudo = _service.getEstudo(livro.slug) ??
        _service.getEstudo(livro.abreviacao) ??
        Estudo(
          slug: livro.slug,
          titulo: livro.nome,
          autor: 'Sola Scriptura',
          contexto: 'Estudo do livro de ${livro.nome}.',
        );
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => EstudoDetailScreen(estudo: estudo),
      ),
    );
  }
}
