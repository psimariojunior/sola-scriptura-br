import 'package:flutter/material.dart';

import '../../widgets/empty_state.dart';
import '../../widgets/sola_card.dart';

class _PlanoLeitura {
  final String nome;
  final String descricao;
  final int duracaoDias;
  final double progresso;
  final List<String> leiturasHoje;

  const _PlanoLeitura({
    required this.nome,
    required this.descricao,
    required this.duracaoDias,
    required this.progresso,
    required this.leiturasHoje,
  });
}

const _planos = [
  _PlanoLeitura(
    nome: 'Bíblia em 1 ano',
    descricao: 'Leia toda a Bíblia em 365 dias',
    duracaoDias: 365,
    progresso: 0.35,
    leiturasHoje: ['Gênesis 22', 'Mateus 5', 'Salmos 10'],
  ),
  _PlanoLeitura(
    nome: 'Novo Testamento em 30 dias',
    descricao: 'Leia todo o Novo Testamento em um mês',
    duracaoDias: 30,
    progresso: 0.60,
    leiturasHoje: ['Lucas 12', '1 Coríntios 4'],
  ),
  _PlanoLeitura(
    nome: 'Salmos e Provérbios',
    descricao: 'Leia um Salmo e um Provérbio por dia',
    duracaoDias: 31,
    progresso: 0.20,
    leiturasHoje: ['Salmos 119', 'Provérbios 27'],
  ),
  _PlanoLeitura(
    nome: 'Evangelhos em 30 dias',
    descricao: 'Matêus, Marcos, Lucas e João em 30 dias',
    duracaoDias: 30,
    progresso: 0.45,
    leiturasHoje: ['Mateus 20', 'Marcos 9'],
  ),
  _PlanoLeitura(
    nome: 'Antigo Testamento em 90 dias',
    descricao: 'Leia o Antigo Testamento em 3 meses',
    duracaoDias: 90,
    progresso: 0.15,
    leiturasHoje: ['Números 12', 'Juízes 3'],
  ),
  _PlanoLeitura(
    nome: 'Cartas Paulinas',
    descricao: 'Todas as cartas de Paulo em 14 dias',
    duracaoDias: 14,
    progresso: 0.80,
    leiturasHoje: ['Filemom', 'Efésios 6'],
  ),
];

class PlanosScreen extends StatelessWidget {
  const PlanosScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Planos de Leitura')),
      body: ListView.builder(
        padding: const EdgeInsets.all(12),
        itemCount: _planos.length,
        itemBuilder: (context, index) {
          final p = _planos[index];
          return SolaCard(
            margin: const EdgeInsets.only(bottom: 12),
            onTap: () => Navigator.of(context).push(MaterialPageRoute(
              builder: (_) => _PlanoDetalhe(plano: p),
            )),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        p.nome,
                        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                      ),
                    ),
                    Text(
                      '${(p.progresso * 100).round()}%',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  p.descricao,
                  style: TextStyle(
                    fontSize: 13,
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(height: 10),
                Row(
                  children: [
                    Icon(Icons.calendar_today, size: 14, color: Theme.of(context).colorScheme.onSurfaceVariant),
                    const SizedBox(width: 4),
                    Text('${p.duracaoDias} dias', style: const TextStyle(fontSize: 12)),
                    const Spacer(),
                    Icon(Icons.book, size: 14, color: Theme.of(context).colorScheme.onSurfaceVariant),
                    const SizedBox(width: 4),
                    Text('${p.leiturasHoje.length} leituras hoje', style: const TextStyle(fontSize: 12)),
                  ],
                ),
                const SizedBox(height: 10),
                LinearProgressIndicator(
                  value: p.progresso,
                  minHeight: 6,
                  borderRadius: BorderRadius.circular(3),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

class _PlanoDetalhe extends StatelessWidget {
  final _PlanoLeitura plano;

  const _PlanoDetalhe({required this.plano});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(plano.nome)),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    plano.descricao,
                    style: Theme.of(context).textTheme.bodyLarge,
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      _infoChip(Icons.calendar_today, '${plano.duracaoDias} dias'),
                      const SizedBox(width: 12),
                      _infoChip(Icons.trending_up, '${(plano.progresso * 100).round()}% concluído'),
                    ],
                  ),
                  const SizedBox(height: 12),
                  LinearProgressIndicator(value: plano.progresso, minHeight: 8),
                ],
              ),
            ),
          ),
          const SizedBox(height: 20),
          const Text(
            'Leituras de Hoje',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
          ),
          const SizedBox(height: 12),
          ...plano.leiturasHoje.map((leitura) => Card(
            margin: const EdgeInsets.only(bottom: 8),
            child: ListTile(
              leading: Icon(Icons.menu_book, color: Theme.of(context).colorScheme.primary),
              title: Text(leitura),
              trailing: const Icon(Icons.chevron_right),
            ),
          )),
          const SizedBox(height: 20),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: () {},
              icon: const Icon(Icons.play_arrow),
              label: Text(plano.progresso > 0 ? 'Continuar' : 'Iniciar plano'),
            ),
          ),
        ],
      ),
    );
  }

  Widget _infoChip(IconData icon, String label) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, size: 14, color: Colors.grey),
        const SizedBox(width: 4),
        Text(label, style: const TextStyle(fontSize: 12)),
      ],
    );
  }
}
