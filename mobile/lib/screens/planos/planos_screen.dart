import 'package:flutter/material.dart';

import '../../widgets/sola_card.dart';

class _Plano {
  final String nome;
  final String descricao;
  final int duracaoDias;
  final String categoria;
  final double progresso;

  const _Plano({
    required this.nome,
    required this.descricao,
    required this.duracaoDias,
    required this.categoria,
    required this.progresso,
  });
}

const _planos = [
  _Plano(
    nome: 'Bíblia em 1 ano',
    descricao: 'Leia toda a Bíblia seguindo um plano diário estruturado.',
    duracaoDias: 365,
    categoria: 'Completo',
    progresso: 0.35,
  ),
  _Plano(
    nome: 'Novo Testamento em 30 dias',
    descricao: 'Foco nos Evangelhos e cartas apostólicas.',
    duracaoDias: 30,
    categoria: 'NT',
    progresso: 0.60,
  ),
  _Plano(
    nome: 'Antigo Testamento em 90 dias',
    descricao: 'Explore a história, poesia e profecias do AT.',
    duracaoDias: 90,
    categoria: 'AT',
    progresso: 0.15,
  ),
  _Plano(
    nome: 'Salmos e Provérbios',
    descricao: 'Sabedoria e adoração diária.',
    duracaoDias: 31,
    categoria: 'Poesia',
    progresso: 0.20,
  ),
  _Plano(
    nome: 'Evangelhos em 30 dias',
    descricao: 'Conheça a vida de Jesus nos quatro Evangelhos.',
    duracaoDias: 30,
    categoria: 'NT',
    progresso: 0.45,
  ),
  _Plano(
    nome: 'Cartas Paulinas',
    descricao: 'Todas as 13 cartas de Paulo em 14 dias.',
    duracaoDias: 14,
    categoria: 'NT',
    progresso: 0.80,
  ),
  _Plano(
    nome: 'Profecias do AT',
    descricao: 'Isaías, Jeremias, Ezequiel e Daniel.',
    duracaoDias: 45,
    categoria: 'AT',
    progresso: 0.10,
  ),
  _Plano(
    nome: 'Atos dos Apóstolos',
    descricao: 'A história da igreja primitiva em 28 dias.',
    duracaoDias: 28,
    categoria: 'NT',
    progresso: 0.0,
  ),
];

class PlanosLeituraScreen extends StatefulWidget {
  const PlanosLeituraScreen({super.key});

  @override
  State<PlanosLeituraScreen> createState() => _PlanosLeituraScreenState();
}

class _PlanosLeituraScreenState extends State<PlanosLeituraScreen> {
  String? _filtro;

  static const _duracoes = ['Todos', '14 dias', '30 dias', '90 dias', '365 dias'];

  List<_Plano> get _filtrados {
    if (_filtro == null || _filtro == 'Todos') return _planos;
    final dias = int.tryParse(_filtro!.replaceAll(RegExp(r'[^0-9]'), '')) ?? 0;
    return _planos.where((p) => p.duracaoDias == dias).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Planos de Leitura')),
      body: Column(
        children: [
          SizedBox(
            height: 56,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              itemCount: _duracoes.length,
              itemBuilder: (context, index) {
                final d = _duracoes[index];
                final selecionado = (_filtro == null && d == 'Todos') || _filtro == d;
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  child: ChoiceChip(
                    label: Text(d),
                    selected: selecionado,
                    onSelected: (_) => setState(() => _filtro = d == 'Todos' ? null : d),
                  ),
                );
              },
            ),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: _filtrados.length,
              itemBuilder: (context, index) {
                final p = _filtrados[index];
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
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: Theme.of(context).colorScheme.primaryContainer,
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Text(
                              '${p.duracaoDias} dias',
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.bold,
                                color: Theme.of(context).colorScheme.primary,
                              ),
                            ),
                          ),
                          const SizedBox(width: 8),
                          Text(
                            p.categoria,
                            style: TextStyle(
                              fontSize: 11,
                              color: Theme.of(context).colorScheme.onSurfaceVariant,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Text(
                        p.nome,
                        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                      ),
                      const SizedBox(height: 4),
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
                          Expanded(
                            child: LinearProgressIndicator(
                              value: p.progresso,
                              minHeight: 6,
                              borderRadius: BorderRadius.circular(3),
                            ),
                          ),
                          const SizedBox(width: 8),
                          Text(
                            '${(p.progresso * 100).round()}%',
                            style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _PlanoDetalhe extends StatelessWidget {
  final _Plano plano;

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
                  Text(plano.descricao, style: Theme.of(context).textTheme.bodyLarge),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      _info(Icons.calendar_today, '${plano.duracaoDias} dias'),
                      const SizedBox(width: 16),
                      _info(Icons.category, plano.categoria),
                    ],
                  ),
                  const SizedBox(height: 16),
                  LinearProgressIndicator(value: plano.progresso, minHeight: 8),
                  const SizedBox(height: 8),
                  Text(
                    '${(plano.progresso * 100).round()}% concluído',
                    style: TextStyle(color: Theme.of(context).colorScheme.onSurfaceVariant),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),
          Text(
            'Leituras Diárias',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          ...List.generate(plano.duracaoDias > 7 ? 7 : plano.duracaoDias, (i) {
            final concluido = i < (plano.duracaoDias * plano.progresso).toInt();
            return Card(
              margin: const EdgeInsets.only(bottom: 8),
              child: ListTile(
                leading: Icon(
                  concluido ? Icons.check_circle : Icons.radio_button_unchecked,
                  color: concluido ? Colors.green : Colors.grey,
                ),
                title: Text('Dia ${i + 1}'),
                trailing: const Icon(Icons.chevron_right),
              ),
            );
          }),
          if (plano.duracaoDias > 7) ...[
            const SizedBox(height: 8),
            Center(
              child: Text(
                '... e mais ${plano.duracaoDias - 7} dias',
                style: TextStyle(color: Theme.of(context).colorScheme.onSurfaceVariant),
              ),
            ),
          ],
          const SizedBox(height: 24),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: () {},
              icon: const Icon(Icons.play_arrow),
              label: Text(plano.progresso > 0 ? 'Continuar plano' : 'Iniciar plano'),
            ),
          ),
        ],
      ),
    );
  }

  Widget _info(IconData icon, String texto) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, size: 16, color: Colors.grey),
        const SizedBox(width: 4),
        Text(texto, style: const TextStyle(fontSize: 13)),
      ],
    );
  }
}
