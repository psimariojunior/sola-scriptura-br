import 'package:flutter/material.dart';

import '../../models/plano.dart';
import '../../services/planos_service.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/sola_card.dart';

class PlanosScreen extends StatefulWidget {
  const PlanosScreen({super.key});

  @override
  State<PlanosScreen> createState() => _PlanosScreenState();
}

class _PlanosScreenState extends State<PlanosScreen> {
  final PlanosService _service = PlanosService();
  List<PlanoLeitura> _planos = [];

  @override
  void initState() {
    super.initState();
    _planos = _service.getPlanos();
  }

  @override
  Widget build(BuildContext context) {
    if (_planos.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: const Text('Planos de Leitura')),
        body: const EmptyState(
          icon: Icons.menu_book_outlined,
          title: 'Conteúdo não disponível',
        ),
      );
    }
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
  final PlanoLeitura plano;

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
