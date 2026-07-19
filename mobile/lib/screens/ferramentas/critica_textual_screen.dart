import 'package:flutter/material.dart';

import '../../data/critica_textual_data.dart';
import '../../models/livro.dart';
import '../../services/biblia_service.dart';
import '../../services/critica_textual_service.dart';
import '../../widgets/book_selector.dart';
import '../../widgets/empty_state.dart';

class CriticaTextualScreen extends StatefulWidget {
  const CriticaTextualScreen({super.key});

  @override
  State<CriticaTextualScreen> createState() => _CriticaTextualScreenState();
}

class _CriticaTextualScreenState extends State<CriticaTextualScreen> {
  final CriticaTextualService _service = CriticaTextualService();
  Livro? _livro;
  int _capitulo = 1;
  int _versiculo = 1;
  List<VarianteTextual> _variantes = [];

  @override
  void initState() {
    super.initState();
    _livro = BibliaService.livros.first;
    _carregarVariantes();
  }

  void _carregarVariantes() {
    if (_livro == null) return;
    final result = _service.getVariantes(
      _livro!.abreviacao,
      _capitulo,
      _versiculo,
    );
    if (mounted) {
      setState(() => _variantes = result);
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
            color: Theme.of(context).colorScheme.primaryContainer.withValues(alpha: 0.3),
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
          Expanded(child: _buildBody()),
        ],
      ),
    );
  }

  Widget _buildBody() {
    if (_variantes.isEmpty) {
      return const EmptyState(
        icon: Icons.menu_book_outlined,
        title: 'Conteúdo não disponível',
        message: 'Não há variantes textuais conhecidas para esta passagem.',
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
                    _badgeCerteza(v.evidenciaExterna),
                    const SizedBox(width: 8),
                    _badgeTipo(v.tipo),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        _formatarReferencia(v.referencia),
                        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  v.pericope,
                  style: TextStyle(
                    fontSize: 12,
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                    fontStyle: FontStyle.italic,
                  ),
                ),
                const Divider(height: 20),
                Text(
                  v.descricao,
                  style: const TextStyle(fontSize: 14),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Icon(Icons.science_outlined, size: 14, color: Theme.of(context).colorScheme.onSurfaceVariant),
                    const SizedBox(width: 4),
                    Expanded(
                      child: Text(
                        v.manuscritos.join(', '),
                        style: TextStyle(fontSize: 12, color: Theme.of(context).colorScheme.onSurfaceVariant),
                      ),
                    ),
                  ],
                ),
                if (v.textoRecebido != null) ...[
                  const SizedBox(height: 10),
                  _secao('Texto Recebido', v.textoRecebido!, Colors.green),
                ],
                if (v.recomendacaoNA28 != null) ...[
                  const SizedBox(height: 10),
                  _secao('Recomendação NA28', v.recomendacaoNA28!, Colors.blue),
                ],
                if (v.notas != null) ...[
                  const SizedBox(height: 10),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: Theme.of(context).colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),
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

  String _formatarReferencia(String ref) {
    final parts = ref.split(':');
    if (parts.length >= 3) {
      final livro = _nomeLivro(parts[0]);
      return '$livro ${parts[1]}:${parts[2]}';
    }
    return ref;
  }

  String _nomeLivro(String abrev) {
    const nomes = {
      'gn': 'Gênesis', 'ex': 'Êxodo', 'lv': 'Levítico', 'nm': 'Números',
      'dt': 'Deuteronômio', 'js': 'Josué', 'jz': 'Juízes', 'rt': 'Rute',
      '1sm': '1 Samuel', '2sm': '2 Samuel', '1rs': '1 Reis', '2rs': '2 Reis',
      '1cr': '1 Crônicas', '2cr': '2 Crônicas', 'ed': 'Esdras', 'ne': 'Neemias',
      'et': 'Ester', 'jó': 'Jó', 'sl': 'Salmos', 'pv': 'Provérbios',
      'ec': 'Eclesiastes', 'ct': 'Cantares', 'is': 'Isaías', 'jr': 'Jeremias',
      'lm': 'Lamentações', 'ez': 'Ezequiel', 'dn': 'Daniel', 'os': 'Oseias',
      'jl': 'Joel', 'am': 'Amós', 'ob': 'Obadias', 'jn': 'Jonas',
      'mq': 'Miquéias', 'na': 'Naum', 'hc': 'Habacuque', 'sf': 'Sofonias',
      'ag': 'Ageu', 'zc': 'Zacarias', 'ml': 'Malaquias',
      'mt': 'Mateus', 'mc': 'Marcos', 'lc': 'Lucas', 'jo': 'João',
      'at': 'Atos', 'rm': 'Romanos', '1co': '1 Coríntios', '2co': '2 Coríntios',
      'gl': 'Gálatas', 'ef': 'Efésios', 'fp': 'Filipenses', 'cl': 'Colossenses',
      '1ts': '1 Tessalonicenses', '2ts': '2 Tessalonicenses',
      '1tm': '1 Timóteo', '2tm': '2 Timóteo', 'tt': 'Tito', 'fm': 'Filêmon',
      'hb': 'Hebreus', 'tg': 'Tiago', '1pe': '1 Pedro', '2pe': '2 Pedro',
      '1jo': '1 João', '2jo': '2 João', '3jo': '3 João', 'jd': 'Judas',
      'ap': 'Apocalipse',
    };
    return nomes[abrev] ?? abrev;
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

  Widget _badgeCerteza(NivelCerteza certeza) {
    Color cor;
    String texto;
    switch (certeza) {
      case NivelCerteza.forte:
        cor = Colors.green;
        texto = 'Forte';
        break;
      case NivelCerteza.moderada:
        cor = Colors.orange;
        texto = 'Moderada';
        break;
      case NivelCerteza.fraca:
        cor = Colors.red;
        texto = 'Fraca';
        break;
    }
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        color: cor.withValues(alpha: 0.15),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: cor.withValues(alpha: 0.3)),
      ),
      child: Text(texto, style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: cor)),
    );
  }

  Widget _badgeTipo(TipoVariante tipo) {
    Color cor;
    String texto;
    switch (tipo) {
      case TipoVariante.adicao:
        cor = Colors.blue;
        texto = 'Adição';
        break;
      case TipoVariante.omissao:
        cor = Colors.purple;
        texto = 'Omissão';
        break;
      case TipoVariante.mudanca:
        cor = Colors.teal;
        texto = 'Mudança';
        break;
      case TipoVariante.transposicao:
        cor = Colors.brown;
        texto = 'Transposição';
        break;
    }
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        color: cor.withValues(alpha: 0.15),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: cor.withValues(alpha: 0.3)),
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
