import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class _Ferramenta {
  final String rota;
  final IconData icone;
  final String nome;
  final String descricao;
  final Color cor;

  const _Ferramenta({
    required this.rota,
    required this.icone,
    required this.nome,
    required this.descricao,
    required this.cor,
  });
}

const _ferramentas = [
  _Ferramenta(
    rota: '/ferramentas/concordancia',
    icone: Icons.search,
    nome: 'Concordância',
    descricao: 'Busca por palavras em toda a Bíblia',
    cor: Colors.blue,
  ),
  _Ferramenta(
    rota: '/ferramentas/critica-textual',
    icone: Icons.article,
    nome: 'Crítica Textual',
    descricao: 'Variantes textuais e evidências manuscritas',
    cor: Colors.purple,
  ),
  _Ferramenta(
    rota: '/ferramentas/introducoes',
    icone: Icons.info_outline,
    nome: 'Introduções',
    descricao: 'Contexto histórico de cada livro',
    cor: Colors.teal,
  ),
  _Ferramenta(
    rota: '/ferramentas/parabolas',
    icone: Icons.auto_stories,
    nome: 'Parábolas',
    descricao: 'Parábolas de Jesus explicadas',
    cor: Colors.orange,
  ),
  _Ferramenta(
    rota: '/ferramentas/milagres',
    icone: Icons.auto_awesome,
    nome: 'Milagres',
    descricao: 'Milagres registrados nos Evangelhos',
    cor: Colors.green,
  ),
  _Ferramenta(
    rota: '/ferramentas/harmonia',
    icone: Icons.view_column,
    nome: 'Harmonia',
    descricao: 'Harmonia sinótica dos Evangelhos',
    cor: Colors.indigo,
  ),
  _Ferramenta(
    rota: '/ferramentas/comparar',
    icone: Icons.compare_arrows,
    nome: 'Comparar Traduções',
    descricao: 'Compare versículos em diferentes versões',
    cor: Colors.brown,
  ),
  _Ferramenta(
    rota: '/ferramentas/pericopes',
    icone: Icons.bookmark,
    nome: 'Pericopes',
    descricao: 'Divisões literárias da Bíblia',
    cor: Colors.cyan,
  ),
  _Ferramenta(
    rota: '/ferramentas/topicos',
    icone: Icons.topic,
    nome: 'Tópicos',
    descricao: 'Estudo por tópicos teológicos',
    cor: Colors.deepPurple,
  ),
  _Ferramenta(
    rota: '/ferramentas/literatura',
    icone: Icons.library_books,
    nome: 'Literatura',
    descricao: 'Gêneros literários bíblicos',
    cor: Colors.red,
  ),
  _Ferramenta(
    rota: '/ferramentas/sermoes',
    icone: Icons.campaign,
    nome: 'Sermões',
    descricao: 'Sermões e preleções',
    cor: Colors.amber,
  ),
];

class FerramentasScreen extends StatelessWidget {
  const FerramentasScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ferramentas'),
      ),
      body: GridView.builder(
        padding: const EdgeInsets.all(12),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          childAspectRatio: 1.1,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
        ),
        itemCount: _ferramentas.length,
        itemBuilder: (context, index) {
          final f = _ferramentas[index];
          return _FerramentaCard(ferramenta: f);
        },
      ),
    );
  }
}

class _FerramentaCard extends StatelessWidget {
  final _Ferramenta ferramenta;

  const _FerramentaCard({required this.ferramenta});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 1,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: InkWell(
        onTap: () => context.push(ferramenta.rota),
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: ferramenta.cor.withValues(alpha: 0.15),
                  shape: BoxShape.circle,
                ),
                child: Icon(ferramenta.icone, color: ferramenta.cor, size: 24),
              ),
              const SizedBox(height: 10),
              Text(
                ferramenta.nome,
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                textAlign: TextAlign.center,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 4),
              Text(
                ferramenta.descricao,
                style: TextStyle(fontSize: 11, color: Theme.of(context).colorScheme.onSurfaceVariant),
                textAlign: TextAlign.center,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
