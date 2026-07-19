import 'package:flutter/material.dart';

import '../../models/teologia_categoria.dart';
import '../../services/teologia_service.dart';
import '../../widgets/category_card.dart';
import '../../widgets/empty_state.dart';
import 'categoria_screen.dart';

class TeologiaScreen extends StatefulWidget {
  const TeologiaScreen({super.key});

  @override
  State<TeologiaScreen> createState() => _TeologiaScreenState();
}

class _TeologiaScreenState extends State<TeologiaScreen> {
  final TeologiaService _service = TeologiaService();
  String _busca = '';
  List<CategoriaTeologia> _categorias = [];

  static const _iconMap = <String, IconData>{
    'account_tree': Icons.account_tree,
    'auto_stories': Icons.auto_stories,
    'person': Icons.person,
    'air': Icons.air,
    'favorite': Icons.favorite,
    'warning_amber': Icons.warning_amber,
    'groups': Icons.groups,
    'flutter_dash': Icons.flutter_dash,
    'dangerous': Icons.dangerous,
    'account_balance': Icons.account_balance,
    'face': Icons.face,
    'report_problem': Icons.report_problem,
    'handshake': Icons.handshake,
    'book': Icons.book,
  };

  @override
  void initState() {
    super.initState();
    _categorias = _service.getCategorias();
  }

  List<CategoriaTeologia> get _categoriasFiltradas {
    if (_busca.isEmpty) return _categorias;
    final lower = _busca.toLowerCase();
    return _categorias.where((c) {
      return c.nome.toLowerCase().contains(lower) ||
          c.descricao.toLowerCase().contains(lower);
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Teologia'),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Buscar categorias...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                contentPadding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              ),
              onChanged: (valor) {
                setState(() => _busca = valor);
              },
            ),
          ),
          Expanded(
            child: _categoriasFiltradas.isEmpty
                ? const EmptyState(
                    icon: Icons.menu_book_outlined,
                    title: 'Conteúdo não disponível',
                    message: 'Tente buscar por outro termo.',
                  )
                : GridView.builder(
                    padding: const EdgeInsets.all(12),
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      childAspectRatio: 1.0,
                      crossAxisSpacing: 10,
                      mainAxisSpacing: 10,
                    ),
                    itemCount: _categoriasFiltradas.length,
                    itemBuilder: (context, index) {
                      final cat = _categoriasFiltradas[index];
                      return CategoryCard(
                        icon: _iconMap[cat.icone] ?? Icons.book,
                        title: cat.nome,
                        count: cat.totalDoutrinas,
                        color: Color(cat.corValue),
                        onTap: () => _abrirCategoria(cat),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }

  void _abrirCategoria(CategoriaTeologia categoria) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => CategoriaScreen(
          nome: categoria.nome,
          descricao: categoria.descricao,
          cor: Color(categoria.corValue),
        ),
      ),
    );
  }
}
