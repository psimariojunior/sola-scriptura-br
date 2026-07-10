import 'package:flutter/material.dart';
import '../main.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _indiceAtual = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _indiceAtual,
        children: const [
          _BibliaTab(),
          _EstudosTab(),
          _IaTab(),
          _ContaTab(),
        ],
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 20,
              offset: const Offset(0, -5),
            ),
          ],
        ),
        child: BottomNavigationBar(
          currentIndex: _indiceAtual,
          onTap: (i) => setState(() => _indiceAtual = i),
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.menu_book_outlined),
              activeIcon: Icon(Icons.menu_book),
              label: 'Bíblia',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.school_outlined),
              activeIcon: Icon(Icons.school),
              label: 'Estudos',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.auto_awesome_outlined),
              activeIcon: Icon(Icons.auto_awesome),
              label: 'IA',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person_outline),
              activeIcon: Icon(Icons.person),
              label: 'Conta',
            ),
          ],
        ),
      ),
    );
  }
}

class _BibliaTab extends StatelessWidget {
  const _BibliaTab();

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}

class _EstudosTab extends StatelessWidget {
  const _EstudosTab();

  static const Color _accent = Color(0xFFC9A96E);

  static const List<Map<String, dynamic>> _ferramentas = [
    {
      'titulo': 'Teologia',
      'descricao': 'Doutrinas e estudo sistemático',
      'icone': Icons.auto_stories_rounded,
      'cor': Color(0xFFC9A96E),
      'rota': '/teologia',
    },
    {
      'titulo': 'Exegese',
      'descricao': 'Análise bíblica aprofundada',
      'icone': Icons.search_rounded,
      'cor': Color(0xFF4A6FA5),
      'rota': '/exegese',
    },
    {
      'titulo': 'Cronologia',
      'descricao': 'Linha do tempo bíblica',
      'icone': Icons.timeline_rounded,
      'cor': Color(0xFF5D8A5D),
      'rota': '/cronologia',
    },
    {
      'titulo': 'Mapas',
      'descricao': 'Locais bíblicos interativos',
      'icone': Icons.map_rounded,
      'cor': Color(0xFFE07A4A),
      'rota': '/mapas',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Ferramentas',
              style: TextStyle(
                fontFamily: 'serif',
                fontSize: 28,
                fontWeight: FontWeight.w700,
                color: Colors.white,
                letterSpacing: -0.5,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              'Estudo bíblico aprofundado',
              style: TextStyle(
                fontFamily: 'serif',
                fontSize: 14,
                color: Colors.white.withOpacity(0.5),
              ),
            ),
            const SizedBox(height: 24),
            GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
                childAspectRatio: 1.5,
              ),
              itemCount: _ferramentas.length,
              itemBuilder: (context, index) {
                final f = _ferramentas[index];
                final cor = f['cor'] as Color;
                return Material(
                  color: const Color(0xFF1A1A2E),
                  borderRadius: BorderRadius.circular(14),
                  child: InkWell(
                    borderRadius: BorderRadius.circular(14),
                    onTap: () {
                      Navigator.pushNamed(context, f['rota'] as String);
                    },
                    child: Padding(
                      padding: const EdgeInsets.all(14),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Icon(
                            f['icone'] as IconData,
                            color: cor,
                            size: 24,
                          ),
                          const Spacer(),
                          Text(
                            f['titulo'] as String,
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            f['descricao'] as String,
                            style: TextStyle(
                              color: Colors.white.withOpacity(0.4),
                              fontSize: 11,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _IaTab extends StatelessWidget {
  const _IaTab();

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}

class _ContaTab extends StatelessWidget {
  const _ContaTab();

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
