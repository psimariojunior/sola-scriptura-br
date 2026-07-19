import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../data/devocionais_data.dart';
import '../../models/devocional.dart';
import '../../services/devocional_service.dart';

class DevocionalScreen extends StatefulWidget {
  final int? diaInicial;
  const DevocionalScreen({super.key, this.diaInicial});

  @override
  State<DevocionalScreen> createState() => _DevocionalScreenState();
}

class _DevocionalScreenState extends State<DevocionalScreen> {
  final _devocionalService = DevocionalService();
  final _notaController = TextEditingController();
  final _notasSalvas = <int, String>{};
  final _lidos = <int>{};

  bool _carregado = false;
  int? _diaSelecionado;
  bool _mostrarLista = false;

  @override
  void initState() {
    super.initState();
    _inicializar();
  }

  Future<void> _inicializar() async {
    final lidos = await _devocionalService.obterLidos();
    if (!mounted) return;
    setState(() {
      _lidos.addAll(lidos);
      _carregado = true;
      if (widget.diaInicial != null) {
        _diaSelecionado = widget.diaInicial;
      } else {
        _diaSelecionado = _devocionalService.obterHoje().dia;
      }
      _notaController.text = _notasSalvas[_diaSelecionado] ?? '';
    });
  }

  @override
  void dispose() {
    _notaController.dispose();
    super.dispose();
  }

  Devocional get _devocionalAtual {
    final dia = _diaSelecionado ?? _devocionalService.obterHoje().dia;
    return DevocionaisData.getByDia(dia);
  }

  void _abrirLeitura(Devocional d) {
    final ref = _devocionalService.parseReferencia(d.referencia);
    if (ref != null) {
      context.push(ref.caminhoBiblia);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Não foi possível abrir: ${d.referencia}')),
      );
    }
  }

  Future<void> _alternarLido(Devocional d) async {
    if (_lidos.contains(d.dia)) {
      await _devocionalService.desmarcarLido(d.dia);
      setState(() => _lidos.remove(d.dia));
    } else {
      await _devocionalService.marcarLido(d.dia);
      setState(() => _lidos.add(d.dia));
    }
  }

  Future<void> _salvarNota() async {
    if (_notaController.text.trim().isEmpty) return;
    setState(() => _notasSalvas[_devocionalAtual.dia] = _notaController.text);
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Nota salva localmente!')),
    );
  }

  void _compartilhar() {
    final d = _devocionalAtual;
    showModalBottomSheet(
      context: context,
      builder: (context) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                'Compartilhar',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
              ),
              const SizedBox(height: 16),
              ListTile(
                leading: const Icon(Icons.share),
                title: const Text('Compartilhar devocional'),
                onTap: () => Navigator.pop(context),
              ),
              ListTile(
                leading: const Icon(Icons.copy),
                title: const Text('Copiar texto'),
                onTap: () => Navigator.pop(context),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (!_carregado) {
      return Scaffold(
        appBar: AppBar(title: const Text('Devocional')),
        body: const Center(child: CircularProgressIndicator()),
      );
    }

    if (_mostrarLista) {
      return _buildLista();
    }
    return _buildDetalhe();
  }

  Widget _buildDetalhe() {
    final d = _devocionalAtual;
    final lido = _lidos.contains(d.dia);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Devocional Diário'),
        leading: _mostrarLista
            ? null
            : IconButton(
                icon: const Icon(Icons.list),
                tooltip: 'Ver todos',
                onPressed: () => setState(() => _mostrarLista = true),
              ),
        actions: [
          IconButton(
            icon: const Icon(Icons.share),
            onPressed: _compartilhar,
            tooltip: 'Compartilhar',
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.primary.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  'Dia ${d.dia}',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                    color: Theme.of(context).colorScheme.primary,
                    letterSpacing: 0.4,
                  ),
                ),
              ),
              const Spacer(),
              if (lido)
                Row(
                  children: [
                    Icon(
                      Icons.check_circle,
                      size: 16,
                      color: Theme.of(context).colorScheme.primary,
                    ),
                    const SizedBox(width: 4),
                    Text(
                      'Lido',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                    ),
                  ],
                ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            d.titulo,
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 16),
          Material(
            color: Colors.transparent,
            borderRadius: BorderRadius.circular(14),
            child: InkWell(
              onTap: () => _abrirLeitura(d),
              borderRadius: BorderRadius.circular(14),
              child: Card(
                color: Theme.of(context).colorScheme.primaryContainer.withValues(alpha: 0.3),
                elevation: 0,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(
                            Icons.menu_book,
                            size: 18,
                            color: Theme.of(context).colorScheme.primary,
                          ),
                          const SizedBox(width: 6),
                          Text(
                            'Leitura Bíblica',
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                              letterSpacing: 0.4,
                              color: Theme.of(context).colorScheme.primary,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 6),
                      Text(
                        d.referencia,
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                          color: Theme.of(context).colorScheme.primary,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        d.textoReferencia,
                        style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                              fontStyle: FontStyle.italic,
                              height: 1.45,
                            ),
                      ),
                      const SizedBox(height: 8),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          Text(
                            'Toque para abrir',
                            style: TextStyle(
                              fontSize: 11,
                              color: Theme.of(context).colorScheme.primary,
                            ),
                          ),
                          const SizedBox(width: 4),
                          Icon(
                            Icons.arrow_forward,
                            size: 12,
                            color: Theme.of(context).colorScheme.primary,
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(height: 24),
          Row(
            children: [
              Container(
                width: 4,
                height: 18,
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.primary,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(width: 8),
              const Text(
                'Reflexão',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            d.reflexao,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(height: 1.6),
          ),
          const SizedBox(height: 24),
          Row(
            children: [
              Container(
                width: 4,
                height: 18,
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.primary,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(width: 8),
              const Text(
                'Oração',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.surfaceContainerHighest
                  .withValues(alpha: 0.4),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: Theme.of(context).colorScheme.outline.withValues(alpha: 0.2),
              ),
            ),
            child: Text(
              d.oracao,
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    height: 1.6,
                    fontStyle: FontStyle.italic,
                  ),
            ),
          ),
          const SizedBox(height: 24),
          Row(
            children: [
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () => _alternarLido(d),
                  icon: Icon(lido ? Icons.check_circle : Icons.bookmark_add_outlined),
                  label: Text(lido ? 'Lido' : 'Marcar como lido'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: lido
                        ? Theme.of(context).colorScheme.primary
                        : null,
                    minimumSize: const Size(0, 48),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          const Divider(),
          const SizedBox(height: 12),
          const Text(
            'Suas Anotações',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
          ),
          const SizedBox(height: 8),
          TextField(
            controller: _notaController,
            maxLines: 4,
            decoration: InputDecoration(
              hintText: 'Escreva suas reflexões pessoais...',
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              filled: true,
            ),
          ),
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: _salvarNota,
              icon: const Icon(Icons.save),
              label: const Text('Salvar anotação'),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLista() {
    final todos = _devocionalService.listarTodos();
    return Scaffold(
      appBar: AppBar(
        title: const Text('Devocionais'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => setState(() => _mostrarLista = false),
        ),
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: todos.length,
        separatorBuilder: (_, __) => const SizedBox(height: 8),
        itemBuilder: (context, index) {
          final d = todos[index];
          final lido = _lidos.contains(d.dia);
          final isHoje = d.dia == _devocionalService.obterHoje().dia;
          return Material(
            color: Colors.transparent,
            borderRadius: BorderRadius.circular(12),
            child: InkWell(
              borderRadius: BorderRadius.circular(12),
              onTap: () => setState(() {
                _diaSelecionado = d.dia;
                _notaController.text = _notasSalvas[d.dia] ?? '';
                _mostrarLista = false;
              }),
              child: Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.surface,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: isHoje
                        ? Theme.of(context).colorScheme.primary
                        : Theme.of(context).colorScheme.outline.withValues(alpha: 0.2),
                    width: isHoje ? 1.5 : 1,
                  ),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 44,
                      height: 44,
                      decoration: BoxDecoration(
                        color: lido
                            ? Theme.of(context).colorScheme.primary
                            : Theme.of(context).colorScheme.primary.withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Center(
                        child: lido
                            ? const Icon(Icons.check, color: Colors.white, size: 22)
                            : Text(
                                '${d.dia}',
                                style: TextStyle(
                                  fontWeight: FontWeight.w700,
                                  color: Theme.of(context).colorScheme.primary,
                                ),
                              ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            d.titulo,
                            style: const TextStyle(
                              fontWeight: FontWeight.w700,
                              fontSize: 14,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(height: 2),
                          Text(
                            d.referencia,
                            style: TextStyle(
                              fontSize: 12,
                              color: Theme.of(context).colorScheme.onSurfaceVariant,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                    if (isHoje)
                      Padding(
                        padding: const EdgeInsets.only(left: 8),
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            color: Theme.of(context).colorScheme.primary,
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: const Text(
                            'HOJE',
                            style: TextStyle(
                              fontSize: 9,
                              fontWeight: FontWeight.w700,
                              color: Colors.white,
                              letterSpacing: 0.5,
                            ),
                          ),
                        ),
                      ),
                    const Icon(Icons.chevron_right, size: 20),
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
