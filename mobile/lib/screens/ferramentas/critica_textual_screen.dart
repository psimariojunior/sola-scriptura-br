import 'package:flutter/material.dart';

import '../../models/livro.dart';
import '../../services/biblia_service.dart';
import '../../widgets/book_selector.dart';
import '../../widgets/empty_state.dart';

enum _NivelCerteza { certo, provavel, possivel }

class _Variante {
  final String referencia;
  final String textoRecebido;
  final String textoVariante;
  final String manuscrito;
  final _NivelCerteza certeza;
  final String? notas;

  const _Variante({
    required this.referencia,
    required this.textoRecebido,
    required this.textoVariante,
    required this.manuscrito,
    required this.certeza,
    this.notas,
  });
}

class CriticaTextualScreen extends StatefulWidget {
  const CriticaTextualScreen({super.key});

  @override
  State<CriticaTextualScreen> createState() => _CriticaTextualScreenState();
}

class _CriticaTextualScreenState extends State<CriticaTextualScreen> {
  Livro? _livro;
  int _capitulo = 1;
  int _versiculo = 1;
  List<_Variante> _variantes = [];
  bool _carregando = false;

  @override
  void initState() {
    super.initState();
    _livro = BibliaService.livros.first;
    _carregarVariantes();
  }

  Future<void> _carregarVariantes() async {
    setState(() => _carregando = true);
    await Future.delayed(const Duration(milliseconds: 600));

    final ref = '${_livro?.nome ?? ''} $_capitulo:$_versiculo';
    final variantes = [
      _Variante(
        referencia: ref,
        textoRecebido: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.',
        textoVariante: 'No princípio era o Deus, e o Deus estava com Deus.',
        manuscrito: 'Papiro P66 (~200 d.C.)',
        certeza: _NivelCerteza.provavel,
        notas: 'Omitissão do artigo definido antes de "Deus" em algumas tradições manuscritas.',
      ),
      _Variante(
        referencia: ref,
        textoRecebido: 'E o Verbo se fez carne, e habitou entre nós.',
        textoVariante: 'E o Verbo se fez carne, e habitou sobre nós.',
        manuscrito: 'Codex Sinaiticus (~350 d.C.)',
        certeza: _NivelCerteza.possivel,
        notas: 'Leitura variante entre "entre" (ἐν) e "sobre" (ἐπί).',
      ),
    ];

    if (mounted) {
      setState(() {
        _variantes = variantes;
        _carregando = false;
      });
    }
  }

  void _abrirLivros() async {
    final resultado = await Navigator.of(context).push<Livro>(
      MaterialPageRoute(
        builder: (_) => BookSelector(
          livroSelecionado: _livro?.abreviacao,
          onSelecionado: (l) => Navigator.of(context).pop(l),
        ),
      ),
    );
    if (resultado != null && mounted) {
      setState(() => _livro = resultado);
      _carregarVariantes();
    }
  }

  void _abrirSeletorVersiculo() async {
    final resultado = await showModalBottomSheet<Map<String, int>>(
      context: context,
      builder: (context) => _SeletorVersiculo(
        livro: _livro,
        capituloInicial: _capitulo,
        versiculoInicial: _versiculo,
      ),
    );
    if (resultado != null && mounted) {
      setState(() {
        _capitulo = resultado['capitulo'] ?? _capitulo;
        _versiculo = resultado['versiculo'] ?? _versiculo;
      });
      _carregarVariantes();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Crítica Textual')),
      body: Column(
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16),
            color: Theme.of(context).colorScheme.primaryContainer.withOpacity(0.3),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      GestureDetector(
                        onTap: _abrirLivros,
                        child: Text(
                          _livro?.nome ?? 'Selecionar livro',
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                        ),
                      ),
                      const SizedBox(height: 4),
                      GestureDetector(
                        onTap: _abrirSeletorVersiculo,
                        child: Text(
                          'Cap $_capitulo:$_versiculo',
                          style: TextStyle(
                            fontSize: 14,
                            color: Theme.of(context).colorScheme.primary,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.edit),
                  onPressed: _abrirSeletorVersiculo,
                  tooltip: 'Selecionar versículo',
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

    if (_variantes.isEmpty) {
      return const EmptyState(
        icon: Icons.article_outlined,
        title: 'Nenhuma variante encontrada',
        message: 'Selecione um versículo para ver as variantes textuais',
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.all(8),
      itemCount: _variantes.length,
      itemBuilder: (context, index) {
        final v = _variantes[index];
        return Card(
          margin: const EdgeInsets.symmetric(vertical: 6),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    _badgeCerteza(v.certeza),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        v.referencia,
                        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                      ),
                    ),
                  ],
                ),
                const Divider(height: 20),
                _secao('Texto Recebido', v.textoRecebido, Colors.green),
                const SizedBox(height: 10),
                _secao('Variante', v.textoVariante, Colors.orange),
                const SizedBox(height: 10),
                Row(
                  children: [
                    Icon(Icons.science_outlined, size: 14, color: Theme.of(context).colorScheme.onSurfaceVariant),
                    const SizedBox(width: 4),
                    Expanded(
                      child: Text(
                        v.manuscrito,
                        style: TextStyle(fontSize: 12, color: Theme.of(context).colorScheme.onSurfaceVariant),
                      ),
                    ),
                  ],
                ),
                if (v.notas != null) ...[
                  const SizedBox(height: 10),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: Theme.of(context).colorScheme.surfaceVariant.withOpacity(0.5),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      v.notas!,
                      style: TextStyle(fontSize: 12, color: Theme.of(context).colorScheme.onSurfaceVariant),
                    ),
                  ),
                ],
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _secao(String titulo, String texto, Color cor) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          titulo,
          style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: cor),
        ),
        const SizedBox(height: 4),
        Text(texto, style: const TextStyle(fontSize: 14)),
      ],
    );
  }

  Widget _badgeCerteza(_NivelCerteza certeza) {
    Color cor;
    String texto;
    switch (certeza) {
      case _NivelCerteza.certo:
        cor = Colors.green;
        texto = 'Certo';
        break;
      case _NivelCerteza.provavel:
        cor = Colors.orange;
        texto = 'Provável';
        break;
      case _NivelCerteza.possivel:
        cor = Colors.red;
        texto = 'Possível';
        break;
    }
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        color: cor.withOpacity(0.15),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: cor.withOpacity(0.3)),
      ),
      child: Text(texto, style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: cor)),
    );
  }
}

class _SeletorVersiculo extends StatefulWidget {
  final Livro? livro;
  final int capituloInicial;
  final int versiculoInicial;

  const _SeletorVersiculo({
    required this.livro,
    required this.capituloInicial,
    required this.versiculoInicial,
  });

  @override
  State<_SeletorVersiculo> createState() => _SeletorVersiculoState();
}

class _SeletorVersiculoState extends State<_SeletorVersiculo> {
  late int _capitulo;
  late int _versiculo;

  @override
  void initState() {
    super.initState();
    _capitulo = widget.capituloInicial;
    _versiculo = widget.versiculoInicial;
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Selecionar versículo',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Capítulo', style: TextStyle(fontWeight: FontWeight.bold)),
                      const SizedBox(height: 8),
                      DropdownButtonFormField<int>(
                        value: _capitulo,
                        isExpanded: true,
                        decoration: const InputDecoration(border: OutlineInputBorder(), isDense: true),
                        items: List.generate(
                          widget.livro?.capitulos ?? 50,
                          (i) => DropdownMenuItem(value: i + 1, child: Text('${i + 1}')),
                        ),
                        onChanged: (v) => setState(() => _capitulo = v ?? 1),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Versículo', style: TextStyle(fontWeight: FontWeight.bold)),
                      const SizedBox(height: 8),
                      DropdownButtonFormField<int>(
                        value: _versiculo.clamp(1, 50),
                        isExpanded: true,
                        decoration: const InputDecoration(border: OutlineInputBorder(), isDense: true),
                        items: List.generate(
                          50,
                          (i) => DropdownMenuItem(value: i + 1, child: Text('${i + 1}')),
                        ),
                        onChanged: (v) => setState(() => _versiculo = v ?? 1),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () => Navigator.pop(context, {
                  'capitulo': _capitulo,
                  'versiculo': _versiculo,
                }),
                child: const Text('Confirmar'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
