import 'package:flutter/material.dart';

class EstudosScreen extends StatelessWidget {
  const EstudosScreen({super.key});

  static const List<_OpcaoEstudo> _opcoes = [
    _OpcaoEstudo(
      titulo: 'Teologia',
      descricao: 'Doutrinas e sistematica',
      icone: Icons.menu_book,
      cor: Color(0xFF6B4E3D),
    ),
    _OpcaoEstudo(
      titulo: 'Grego',
      descricao: 'Linguagem original do NT',
      icone: Icons.translate,
      cor: Color(0xFF4A6FA5),
    ),
    _OpcaoEstudo(
      titulo: 'Hebraico',
      descricao: 'Linguagem original do AT',
      icone: Icons.translate,
      cor: Color(0xFF8B5A3C),
    ),
    _OpcaoEstudo(
      titulo: 'Historia',
      descricao: 'Contexto historico biblico',
      icone: Icons.history_edu,
      cor: Color(0xFF7A5C3E),
    ),
    _OpcaoEstudo(
      titulo: 'Personagens',
      descricao: 'Figuras biblicas',
      icone: Icons.people,
      cor: Color(0xFF5D6D5C),
    ),
    _OpcaoEstudo(
      titulo: 'Cronologia',
      descricao: 'Linha do tempo biblica',
      icone: Icons.timeline,
      cor: Color(0xFFA6794A),
    ),
  ];

  void _abrir(BuildContext context, _OpcaoEstudo opcao) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('${opcao.titulo}: tela em desenvolvimento.')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Estudos')),
      body: GridView.builder(
        padding: const EdgeInsets.all(16),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          mainAxisSpacing: 14,
          crossAxisSpacing: 14,
          childAspectRatio: 1.0,
        ),
        itemCount: _opcoes.length,
        itemBuilder: (context, i) {
          final opcao = _opcoes[i];
          return Card(
            elevation: 1.5,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            child: InkWell(
              borderRadius: BorderRadius.circular(12),
              onTap: () => _abrir(context, opcao),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    CircleAvatar(
                      radius: 28,
                      backgroundColor: opcao.cor.withOpacity(0.15),
                      child: Icon(opcao.icone, color: opcao.cor, size: 28),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      opcao.titulo,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                        fontFamily: 'serif',
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      opcao.descricao,
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 12,
                        color: Theme.of(context).textTheme.bodySmall?.color,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}

class _OpcaoEstudo {
  final String titulo;
  final String descricao;
  final IconData icone;
  final Color cor;

  const _OpcaoEstudo({
    required this.titulo,
    required this.descricao,
    required this.icone,
    required this.cor,
  });
}
