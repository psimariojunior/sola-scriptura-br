import 'package:flutter/material.dart';

import '../../models/pesquisa.dart';
import '../../services/api_client.dart';
import '../../services/biblia_service.dart';
import '../../services/pesquisa_service.dart';
import '../../widgets/sola_card.dart';
import '../../widgets/sola_text_field.dart';
import '../../widgets/empty_state.dart';

class _ConcordanciaResultado {
  final String palavra;
  final int contagem;
  final List<String> referencias;

  const _ConcordanciaResultado({
    required this.palavra,
    required this.contagem,
    required this.referencias,
  });
}

class ConcordanciaScreen extends StatefulWidget {
  const ConcordanciaScreen({super.key});

  @override
  State<ConcordanciaScreen> createState() => _ConcordanciaScreenState();
}

class _ConcordanciaScreenState extends State<ConcordanciaScreen> {
  final _buscaController = TextEditingController();
  String? _filtroLivro;
  String _ordenarPor = 'frequencia';
  List<_ConcordanciaResultado> _resultados = [];
  bool _carregando = false;
  bool _buscou = false;

  @override
  void dispose() {
    _buscaController.dispose();
    super.dispose();
  }

  final PesquisaService _pesquisaService = PesquisaService(ApiClient());

  Future<void> _buscar() async {
    final texto = _buscaController.text.trim();
    if (texto.isEmpty) return;

    setState(() {
      _carregando = true;
      _buscou = true;
    });

    try {
      final resultadosApi = await _pesquisaService.pesquisarVersiculos(texto);

      final resultados = <_ConcordanciaResultado>[];
      for (final r in resultadosApi) {
        resultados.add(_ConcordanciaResultado(
          palavra: r.titulo,
          contagem: 1,
          referencias: [if (r.referencia != null) r.referencia!],
        ));
      }

      resultados.sort((a, b) => _ordenarPor == 'frequencia'
          ? b.contagem.compareTo(a.contagem)
          : a.palavra.compareTo(b.palavra));

      if (mounted) {
        setState(() {
          _resultados = resultados;
          _carregando = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _resultados = [];
          _carregando = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Concordância')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                SolaTextField(
                  controller: _buscaController,
                  label: 'Buscar palavra',
                  hint: 'Ex: amor, graça, fé',
                  prefixIcon: Icons.search,
                  onSubmitted: (_) => _buscar(),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: DropdownButtonFormField<String>(
                        initialValue: _filtroLivro,
                        decoration: const InputDecoration(
                          labelText: 'Filtrar por livro',
                          border: OutlineInputBorder(),
                          contentPadding: EdgeInsets.symmetric(horizontal: 12),
                          isDense: true,
                        ),
                        items: [
                          const DropdownMenuItem(value: null, child: Text('Todos')),
                          ...BibliaService.livros.map((l) =>
                              DropdownMenuItem(value: l.abreviacao, child: Text(l.nome))),
                        ],
                        onChanged: (v) => setState(() => _filtroLivro = v),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: DropdownButtonFormField<String>(
                        initialValue: _ordenarPor,
                        decoration: const InputDecoration(
                          labelText: 'Ordenar por',
                          border: OutlineInputBorder(),
                          contentPadding: EdgeInsets.symmetric(horizontal: 12),
                          isDense: true,
                        ),
                        items: const [
                          DropdownMenuItem(value: 'frequencia', child: Text('Frequência')),
                          DropdownMenuItem(value: 'alfabetica', child: Text('Alfabética')),
                        ],
                        onChanged: (v) => setState(() => _ordenarPor = v ?? 'frequencia'),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: _carregando ? null : _buscar,
                    icon: _carregando
                        ? const SizedBox(
                            width: 16,
                            height: 16,
                            child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                          )
                        : const Icon(Icons.search),
                    label: const Text('Buscar'),
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: _buildBody(),
          ),
        ],
      ),
    );
  }

  Widget _buildBody() {
    if (_carregando) {
      return const Center(child: CircularProgressIndicator());
    }

    if (!_buscou) {
      return const EmptyState(
        icon: Icons.search,
        title: 'Busque uma palavra',
        message: 'Digite uma palavra para buscar concordâncias em toda a Bíblia',
      );
    }

    if (_resultados.isEmpty) {
      return const EmptyState(
        icon: Icons.search_off,
        title: 'Nenhum resultado',
        message: 'Nenhuma concordância encontrada para esta palavra',
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.symmetric(horizontal: 8),
      itemCount: _resultados.length,
      itemBuilder: (context, index) {
        final r = _resultados[index];
        return SolaCard(
          onTap: () {},
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Expanded(
                    child: Text(
                      r.palavra,
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                      color: Theme.of(context).colorScheme.primaryContainer,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      '${r.contagem}',
                      style: TextStyle(
                        fontSize: 12,
                        color: Theme.of(context).colorScheme.primary,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Wrap(
                spacing: 6,
                runSpacing: 4,
                children: r.referencias.map((ref) {
                  return ActionChip(
                    label: Text(ref, style: const TextStyle(fontSize: 11)),
                    onPressed: () {},
                    materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                    visualDensity: VisualDensity.compact,
                  );
                }).toList(),
              ),
              if (r.contagem > r.referencias.length) ...[
                const SizedBox(height: 4),
                Text(
                  '+${r.contagem - r.referencias.length} outras referências',
                  style: TextStyle(
                    fontSize: 11,
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                  ),
                ),
              ],
            ],
          ),
        );
      },
    );
  }
}
