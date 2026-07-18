import 'package:flutter/material.dart';

import '../../models/estudo.dart';
import '../../models/livro.dart';
import '../../services/biblia_service.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/error_display.dart';
import '../../widgets/loading_shimmer.dart';
import 'estudo_detail_screen.dart';
import 'manuais_screen.dart';

class EstudosScreen extends StatefulWidget {
  const EstudosScreen({super.key});

  @override
  State<EstudosScreen> createState() => _EstudosScreenState();
}

class _EstudosScreenState extends State<EstudosScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  String _busca = '';
  bool _carregando = true;
  String? _erro;
  List<Estudo> _estudos = [];
  List<Estudo> _estudosFiltrados = [];
  Map<String, bool> _progressoLeitura = {};

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _carregarEstudos();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _carregarEstudos() async {
    setState(() {
      _carregando = true;
      _erro = null;
    });
    try {
      // Simulated data — in production, fetch from API
      await Future.delayed(const Duration(milliseconds: 400));
      _estudos = _gerarEstudosDemo();
      _aplicarFiltro();
      if (mounted) setState(() => _carregando = false);
    } catch (e) {
      if (mounted) {
        setState(() {
          _erro = e.toString();
          _carregando = false;
        });
      }
    }
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

  List<Estudo> _gerarEstudosDemo() {
    return const [
      Estudo(
        slug: 'genesis-criacao',
        titulo: 'Gênesis: A Criação',
        autor: 'Sola Scriptura',
        data: '2025-01-15',
        contexto:
            'O livro de Gênesis apresenta a narrativa da criação do mundo, da humanidade e do início da história de redenção de Deus.',
        versiculosChave: ['Gênesis 1:1', 'Gênesis 1:27', 'Gênesis 2:7'],
      ),
      Estudo(
        slug: 'romanos-justificacao',
        titulo: 'Romanos: Justificação pela Fé',
        autor: 'Sola Scriptura',
        data: '2025-02-10',
        contexto:
            'Romanos apresenta a doutrina da justificação pela fé, explicando como os pecadores são declarados justos diante de Deus.',
        versiculosChave: ['Romanos 3:23', 'Romanos 5:8', 'Romanos 8:1'],
      ),
      Estudo(
        slug: 'joao-divino',
        titulo: 'João: O Divino',
        autor: 'Sola Scriptura',
        data: '2025-03-05',
        contexto:
            'O evangelho de João apresenta Jesus como o Verbo divino, o Filho eterno de Deus encarnado.',
        versiculosChave: ['João 1:1', 'João 1:14', 'João 3:16'],
      ),
      Estudo(
        slug: 'efesios-armadura',
        titulo: 'Efésios: A Armadura de Deus',
        autor: 'Sola Scriptura',
        data: '2025-04-20',
        contexto:
            'Paulo descreve a armadura espiritual que o crente deve usar para resistir às astúcias do diabo.',
        versiculosChave: ['Efésios 6:10', 'Efésios 6:13', 'Efésios 6:17'],
      ),
      Estudo(
        slug: 'salmos-lamentacao',
        titulo: 'Salmos: Lamento e Esperança',
        autor: 'Sola Scriptura',
        data: '2025-05-12',
        contexto:
            'Os salmos de lamento mostram como o povo de Deus expressa dor e busca refúgio no Senhor.',
        versiculosChave: ['Salmos 22:1', 'Salmos 23:1', 'Salmos 42:1'],
      ),
      Estudo(
        slug: 'hebreus-sacerdocio',
        titulo: 'Hebreus: O Sacerdócio de Cristo',
        autor: 'Sola Scriptura',
        data: '2025-06-01',
        contexto:
            'A epístola aos Hebreus apresenta Jesus como o sumo sacerdote eterno according to a ordem de Melquisedeque.',
        versiculosChave: ['Hebreus 4:14', 'Hebreus 7:25', 'Hebreus 9:12'],
      ),
    ];
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
    if (_carregando) {
      return const LoadingShimmer(count: 6, height: 80);
    }
    if (_erro != null) {
      return ErrorDisplay(
        message: _erro!,
        onRetry: _carregarEstudos,
      );
    }
    if (_estudosFiltrados.isEmpty) {
      return const EmptyState(
        icon: Icons.menu_book_outlined,
        title: 'Nenhum estudo encontrado',
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
        title: 'Nenhum estudo salvo',
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
              backgroundColor: Theme.of(context)
                  .colorScheme
                  .primaryContainer,
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
    // Find matching study or create placeholder
    final estudo = _estudos.firstWhere(
      (e) => e.slug.contains(livro.slug),
      orElse: () => Estudo(
        slug: livro.slug,
        titulo: livro.nome,
        autor: 'Sola Scriptura',
        contexto: 'Estudo do livro de ${livro.nome}.',
      ),
    );
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => EstudoDetailScreen(estudo: estudo),
      ),
    );
  }
}
