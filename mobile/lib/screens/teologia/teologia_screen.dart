import 'package:flutter/material.dart';

import '../../widgets/category_card.dart';
import '../../widgets/empty_state.dart';
import 'categoria_screen.dart';

class TeologiaScreen extends StatefulWidget {
  const TeologiaScreen({super.key});

  @override
  State<TeologiaScreen> createState() => _TeologiaScreenState();
}

class _TeologiaScreenState extends State<TeologiaScreen> {
  String _busca = '';

  static const List<Map<String, dynamic>> _categorias = [
    {
      'nome': 'Teologia Própria',
      'icone': Icons.account_tree,
      'cor': Color(0xFFE53935),
      'versiculos': 45,
      'descricao': 'O estudo de Deus: seus atributos, natureza e trindade.',
    },
    {
      'nome': 'Bibliologia',
      'icone': Icons.auto_stories,
      'cor': Color(0xFF8E24AA),
      'versiculos': 32,
      'descricao': 'A doutrina das Escrituras: inspiração, autoridade e suficiência.',
    },
    {
      'nome': 'Cristologia',
      'icone': Icons.person,
      'cor': Color(0xFF3949AB),
      'versiculos': 58,
      'descricao': 'A pessoa e obra de Jesus Cristo.',
    },
    {
      'nome': 'Pneumatologia',
      'icone': Icons.air,
      'cor': Color(0xFF00ACC1),
      'versiculos': 28,
      'descricao': 'A doutrina do Espírito Santo.',
    },
    {
      'nome': 'Soteriologia',
      'icone': Icons.favorite,
      'cor': Color(0xFF43A047),
      'versiculos': 42,
      'descricao': 'A doutrina da salvação.',
    },
    {
      'nome': 'Hamartiologia',
      'icone': Icons.warning_amber,
      'cor': Color(0xFFFF8F00),
      'versiculos': 24,
      'descricao': 'A doutrina do pecado.',
    },
    {
      'nome': 'Eclesiologia',
      'icone': Icons.groups,
      'cor': Color(0xFF6D4C41),
      'versiculos': 36,
      'descricao': 'A doutrina da igreja.',
    },
    {
      'nome': 'Angelologia',
      'icone': Icons.flutter_dash,
      'cor': Color(0xFF546E7A),
      'versiculos': 18,
      'descricao': 'A doutrina dos anjos.',
    },
    {
      'nome': 'Demonologia',
      'icone': Icons.dangerous,
      'cor': Color(0xFF424242),
      'versiculos': 14,
      'descricao': 'A doutrina dos demônios e do mal espiritual.',
    },
    {
      'nome': 'Escatologia',
      'icone': Icons.skyline,
      'cor': Color(0xFF7B1FA2),
      'versiculos': 52,
      'descricao': 'A doutrina das últimas coisas.',
    },
    {
      'nome': 'Antropologia Bíblica',
      'icone': Icons.face,
      'cor': Color(0xFFC62828),
      'versiculos': 22,
      'descricao': 'A doutrina do ser humano.',
    },
    {
      'nome': 'Satanologia',
      'icone': Icons.report_problem,
      'cor': Color(0xFF37474F),
      'versiculos': 16,
      'descricao': 'A doutrina de Satanás.',
    },
    {
      'nome': 'Covenantologia',
      'icone': Icons.handshake,
      'cor': Color(0xFF00695C),
      'versiculos': 38,
      'descricao': 'A doutrina das alianças bíblicas.',
    },
  ];

  List<Map<String, dynamic>> get _categoriasFiltradas {
    if (_busca.isEmpty) return _categorias;
    final lower = _busca.toLowerCase();
    return _categorias.where((c) {
      return c['nome'].toString().toLowerCase().contains(lower) ||
          c['descricao'].toString().toLowerCase().contains(lower);
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
                    icon: Icons.category_outlined,
                    title: 'Nenhuma categoria encontrada',
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
                        icon: cat['icone'] as IconData,
                        title: cat['nome'] as String,
                        count: cat['versiculos'] as int,
                        color: cat['cor'] as Color,
                        onTap: () => _abrirCategoria(cat),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }

  void _abrirCategoria(Map<String, dynamic> categoria) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => CategoriaScreen(
          nome: categoria['nome'] as String,
          descricao: categoria['descricao'] as String,
          cor: categoria['cor'] as Color,
        ),
      ),
    );
  }
}
